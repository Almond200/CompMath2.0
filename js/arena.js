// Arena history is the source of truth. Replaying signed outcomes against the saved
// difficulty also makes backups from two devices mergeable without adding their Elo.
(function (root) {
  'use strict';
  const KEY = 'mq-arena', BASE = 1500;
  const PLACEMENT_SIZE = 12, SUBJECT_PROVISIONAL = 6;
  const SUBJECTS = ['alg','cp','geo','nt'];
  // Questions near the estimate are most informative. The outer pairs cover a broad starting range.
  const PLACEMENT_OFFSETS = [0,-350,350,0,-200,200,0,-100,100,0,-70,70];
  const PACES = { warmup: -50, matched: 50, stretch: 100 };
  const LENGTHS = [2, 3, 5];
  const canonical = id => root.ProblemCatalog?.canonicalId(root.MATH_PROBLEM_CATALOG, id) || id;
  const validId = id => typeof id === 'string' && /^[a-z0-9][a-z0-9.-]{0,180}$/i.test(id);
  const blank = () => ({ version: 1, events: [], session: null });
  const validPace = pace => Object.hasOwn(PACES, pace);
  const outcomes = ['correct', 'incorrect', 'seen', 'unanswered'];
  const resultScore = event => event.outcome === 'correct' ? (event.firstMiss ? 0.5 : 1) : 0;
  const answered = event => event.outcome === 'correct' || event.outcome === 'incorrect';
  const optionalFlag = value => value == null || typeof value === 'boolean';
  const optionalText = value => value == null || typeof value === 'string';
  const validDraft = slot => validId(slot.slug) && validId(slot.identity) && typeof slot.draft === 'string' && optionalText(slot.firstMiss);
  function validRound(round, placement) {
    const validIndex = round.index == null || (Number.isInteger(round.index) && round.index >= 0 && round.index < round.items?.length);
    const validClock = (placement && round.deadline === null && round.limitMs === 0) ||
      (Number.isFinite(round.deadline) && Number.isFinite(round.limitMs) && round.limitMs > 0);
    return validIndex && validClock && (round.submitAt == null || Number.isFinite(round.submitAt)) &&
      Array.isArray(round.items) && round.items.length > 0 && round.items.every(item =>
        item && validDraft(item) && Number.isFinite(item.elo) && Array.isArray(item.subjects) &&
        item.subjects.every(validId) && optionalFlag(item.external) && (item.outcome == null || outcomes.includes(item.outcome)));
  }
  function validate(state) {
    const s = state.session;
    if (state.version !== 1 || !Array.isArray(state.events) || !state.events.every(e =>
      e && validId(e.slug) && validId(e.identity) && validId(e.session) && Number.isFinite(e.at) &&
      Number.isFinite(e.elo) && Array.isArray(e.subjects) && e.subjects.every(validId) &&
      outcomes.includes(e.outcome) && typeof e.answer === 'string' && optionalText(e.firstMiss) &&
      optionalText(e.invalidDraft) && (e.focus == null || validId(e.focus)) && optionalFlag(e.external) && (e.limitMs == null || Number.isFinite(e.limitMs))) ||
      (s != null && !(validId(s.id) && Number.isFinite(s.updated) && validId(s.focus) &&
        validPace(s.pace) && [...LENGTHS, 6, 10, PLACEMENT_SIZE].includes(s.length) && typeof s.placement === 'boolean' &&
        typeof s.closed === 'boolean' && (!s.last || validId(s.last)) &&
        (!s.slot || validDraft(s.slot)) && (!s.round || validRound(s.round,s.placement))))) {
      throw Error('This Arena record could not be read.');
    }
    return state;
  }
  const legacyRead = (storage = root.localStorage) => validate(JSON.parse(storage.getItem(KEY) || 'null') ?? blank());
  async function read(storage) {
    if (!storage && root.StudyStorage?.enabled) return root.StudyStorage.readArena();
    return legacyRead(storage);
  }
  function merge(a, b) {
    const own = validate(a ?? blank()), other = validate(b ?? blank());
    const unique = new Map();
    for (const event of [...own.events, ...other.events].sort((x, y) => x.at - y.at || x.session.localeCompare(y.session))) {
      const id = canonical(event.identity);
      const existing = unique.get(id);
      if (!existing || (!answered(existing) && answered(event)) ||
          (existing.outcome === 'seen' && event.outcome === 'unanswered')) unique.set(id,event);
    }
    const events = [...unique.values()].sort((x, y) => x.at - y.at || x.identity.localeCompare(y.identity));
    const latest = [own.session, other.session].filter(Boolean).sort((x, y) => y.updated - x.updated || x.id.localeCompare(y.id))[0];
    const session = latest ? { ...latest } : null;
    if (session?.slot && unique.has(canonical(session.slot.identity))) session.slot = null;
    if (session?.round?.items.every(item => unique.has(canonical(item.identity)))) session.closed = true;
    return { version: 1, events, session };
  }
  // Serialize read/modify/write across open tabs. Mutations still run synchronously
  // against freshly read storage when Web Locks are unavailable (e.g. file URLs).
  function change(update) {
    if (root.StudyStorage?.enabled) return root.StudyStorage.changeArena(update);
    function commit() {
      const state = legacyRead();
      if (update(state) !== false) {
        if (state.session) state.session.updated = Math.max(Date.now(), state.session.updated + 1);
        root.localStorage.setItem(KEY, JSON.stringify(state));
      }
      return state;
    }
    return root.navigator?.locks ? root.navigator.locks.request(KEY, commit) : Promise.resolve().then(commit);
  }
  function editDraft(session, id, slug, draft, retry) {
    if (session?.id !== id || session.closed) return false;
    const round = session.round;
    if (round && (!remainingMs(session) || session.placement && round.items[placementIndex(round)]?.slug !== slug)) return false;
    const slot = round ? round.items.find(item => item.slug === slug) : session.slot;
    if (slot?.slug !== slug || slot.outcome || !!slot.firstMiss !== retry || slot.draft === draft) return false;
    slot.draft = draft;
    return true;
  }
  function saveDraft(id, slug, draft, retry = false) {
    const update = session => editDraft(session, id, slug, draft, retry);
    if (root.StudyStorage?.enabled) return root.StudyStorage.editArenaSession(update);
    return change(state => update(state.session));
  }
  function start(state, focus, pace, length) {
    if (state.session && !state.session.closed || !validId(focus) || !validPace(pace) || !LENGTHS.includes(length)) return false;
    const placement = !ratings(state.events).baseline;
    if (!placement && !SUBJECTS.includes(focus)) return false;
    state.session = { id: root.crypto?.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2),
      updated: Date.now(), focus: placement ? 'mixed' : focus, pace: placement ? 'matched' : pace,
      length: placement ? PLACEMENT_SIZE : length, placement, closed: false, slot: null, last: null };
  }
  function remaining(state) {
    const s = state.session;
    if (!s) return 0;
    return Math.max(0, s.length - state.events.filter(e => e.outcome !== 'seen' && e.session === s.id).length);
  }
  function remainingMs(session, now = Date.now()) {
    return session.placement ? Infinity : Math.max(0, session.round.deadline - now);
  }
  function roundComplete(session) {
    const round = session?.round;
    return !!round?.items.length && (!round.adaptive || round.items.length >= session.length) &&
      round.items.every(item => item.outcome);
  }
  function submissionAt(session) {
    const deadline = session.placement ? Infinity : session.round.deadline;
    if (!roundComplete(session)) return deadline;
    return Math.min(deadline, session.round.submitAt ?? session.updated + 3000);
  }
  function problemMinutes(elo) {
    if (elo < 1000) return 2;
    if (elo < 1600) return 3;
    if (elo < 2200) return 5;
    if (elo < 2800) return 7;
    return 9;
  }
  function roundItem(problem, saved) {
    return {slug:problem.slug, identity:canonical(problem.identity), elo:problem.elo, subjects:problem.subjects,
      draft:saved?.draft || '', ...(saved?.firstMiss ? {firstMiss:saved.firstMiss} : {}),
      ...(problem.external ? {external:true} : {})};
  }
  function placementIndex(round) {
    const pending = round.items.findIndex(item => !item.outcome);
    return round.index ?? (pending < 0 ? round.items.length - 1 : pending);
  }
  function placementStats(state) {
    const items = state.session.round?.items || [];
    return ratings([...state.events, ...items.filter(answered).map(item => ({
      ...item, session:state.session.id, placement:true
    }))], state.session.id);
  }
  function openRound(state, id, problems, now = Date.now()) {
    const s = state.session;
    if (s?.id !== id || s.closed || s.round || !problems.length || s.placement && problems.length !== 1) return false;
    const used = new Set(state.events.map(e => canonical(e.identity)));
    const items = [];
    for (const p of problems) {
      const identity = canonical(p.identity);
      if (used.has(identity)) continue;
      used.add(identity);
      items.push(roundItem(p, s.slot?.slug === p.slug ? s.slot : null));
    }
    if (!items.length) return false;
    const limitMs = s.placement ? 0 : items.reduce((sum,item) => sum + problemMinutes(item.elo) * 60000,0);
    s.round = {items, limitMs, deadline:limitMs ? now + limitMs : null, ...(s.placement ? {adaptive:true,index:0} : {})};
    if (s.placement) s.length = PLACEMENT_SIZE;
    s.slot = null;
    s.last = null;
  }
  function advancePlacement(state, id, index, problem, now = Date.now()) {
    const s = state.session, round = s?.round;
    if (s?.id !== id || s.closed || !s.placement || !round || !remainingMs(s,now) ||
        placementIndex(round) !== index || !round.items[index]?.outcome) return false;
    if (!round.adaptive) {
      const pending = round.items.findIndex(item => !item.outcome);
      if (pending < 0) return false;
      round.index = pending;
      return true;
    }
    if (!problem || round.items.length >= PLACEMENT_SIZE) return false;
    const identity = canonical(problem.identity);
    if (round.items.some(item => canonical(item.identity) === identity) ||
        state.events.some(e => canonical(e.identity) === identity)) return false;
    round.index = round.items.length;
    round.items.push(roundItem(problem));
  }
  function checkRoundAnswer(state, id, slug, result, now = Date.now(), retry = false) {
    const s = state.session;
    if (s?.id !== id || s.closed || !s.round || !remainingMs(s, now)) return false;
    const item = s.round.items.find(item => item.slug === slug);
    if (!item || item.outcome || !!item.firstMiss !== retry || s.placement && s.round.items[placementIndex(s.round)] !== item) return false;
    if (s.placement) s.round.index = placementIndex(s.round);
    if (result.outcome === 'incorrect' && result.answer && !retry) {
      item.firstMiss = result.answer;
      item.draft = result.answer;
      return;
    }
    Object.assign(item, {outcome:result.outcome, draft:result.answer});
    if (roundComplete(s)) s.round.submitAt = now + 3000;
  }
  function submitRound(state, id, judge, now = Date.now()) {
    const s = state.session;
    if (s?.id !== id || s.closed || !s.round) return false;
    const previous = new Set(state.events.map(e => canonical(e.identity)));
    const timedOut = !remainingMs(s, now);
    for (const item of s.round.items) {
      if (previous.has(canonical(item.identity))) continue;
      const result = item.outcome ? {outcome:item.outcome, answer:item.draft} :
        (item.draft !== item.firstMiss && judge(item.slug, item.draft)) || (item.firstMiss ? {outcome:'incorrect', answer:''} : {outcome:'unanswered', answer:''});
      addEvent(state, item, item.subjects, result.outcome, result.answer, {
        limitMs:s.placement ? 0 : s.round.limitMs, timedOut, ...(s.placement ? {} : {focus:s.focus}),
        ...(item.external ? {external:true} : {}), ...(s.placement ? {placement:true} : {}),
        ...(item.firstMiss ? {firstMiss:item.firstMiss} : {}), ...(result.outcome === 'unanswered' && item.draft ? {invalidDraft:item.draft} : {})
      }, timedOut ? s.round.deadline : now);
    }
    s.closed = true;
  }
  function placeAnswer(state, id, problem, subjects, outcome, answer, retry) {
    const s = state.session;
    if (s?.id !== id || s.closed || s.slot?.slug !== problem.slug || !!s.slot.firstMiss !== retry) return false;
    if (s.placement && outcome === 'incorrect' && answer && !retry) {
      s.slot.firstMiss = answer;
      s.slot.draft = '';
      return;
    }
    return finishProblem(state, id, problem, subjects, outcome, answer);
  }
  function addEvent(state, problem, subjects, outcome, answer, extra, now = Date.now()) {
    state.events.push({session:state.session.id, identity:canonical(problem.identity), slug:problem.slug, elo:problem.elo,
      subjects:[...new Set(subjects)], outcome, answer, at:Math.max(now, (state.events.at(-1)?.at ?? 0) + 1), ...extra});
  }
  function finishProblem(state, sessionId, problem, subjects, outcome, answer) {
    const s = state.session;
    if (!['correct', 'incorrect', 'seen'].includes(outcome) || !s || s.id !== sessionId || s.closed || s.round || !remaining(state) || s.slot?.slug !== problem.slug ||
        state.events.some(e => canonical(e.identity) === canonical(problem.identity))) return false;
    addEvent(state, problem, subjects, outcome, answer, s.placement ?
      {placement:true, ...(s.slot.firstMiss ? {firstMiss:s.slot.firstMiss} : {})} : {});
    s.slot = null;
    s.last = outcome === 'seen' ? null : problem.slug;
    s.closed = !remaining(state);
  }
  const expected = (rating, elo) => 1 / (1 + 10 ** ((elo - rating) / 400));
  const track = (rating = BASE) => ({rating, count:0, wins:0});
  function estimate(evidence) {
    const scale = Math.LN10 / 400, variance = 600 ** 2;
    // At the endpoints the prior dominates even when every answer has the same outcome.
    const span = variance * scale * evidence.length;
    let low = BASE - span, high = BASE + span;
    while (high - low > 0.125) {
      const rating = (low + high) / 2;
      const score = evidence.reduce((sum, e) => sum + resultScore(e) - expected(rating,e.elo), 0);
      if (scale * score > (rating - BASE) / variance) low = rating;
      else high = rating;
    }
    return Math.round((low + high) / 2);
  }
  function update(t, event, k) {
    const win = Number(event.outcome === 'correct');
    t.count++;
    t.wins += win;
    if (k) t.rating = Math.round(t.rating + k * (resultScore(event) - expected(t.rating,event.elo)));
  }
  function ratings(events, incompleteId) {
    const overall = track(), subjects = new Map(), points = [], evidence = [];
    const attemptedSets = new Set(events.filter(answered).map(event => event.session));
    const placementEvidence = event => answered(event) ||
      (event.placement && event.outcome === 'unanswered' && attemptedSets.has(event.session));
    const ends = new Map();
    events.forEach((event, i) => { if (placementEvidence(event)) ends.set(event.session,i); });
    let baseline = null;
    events.forEach((event, i) => {
      if (event.outcome === 'seen') return;
      const before = overall.rating;
      const calibration = !baseline, subjectChanges = [];
      if (calibration) {
        if (!placementEvidence(event)) return;
        evidence.push(event);
        update(overall,event);
        const rating = estimate(evidence);
        overall.rating = rating;
        for (const id of event.subjects) {
          if (!subjects.has(id)) subjects.set(id,track());
          update(subjects.get(id),event);
        }
        if (ends.get(event.session) === i && event.session !== incompleteId && evidence.length >= PLACEMENT_SIZE) {
          baseline = {rating,event};
          for (const id of SUBJECTS) subjects.set(id,track(rating));
        }
      } else {
        update(overall,event);
        for (const id of event.subjects) {
          if (!subjects.has(id)) subjects.set(id,track(baseline.rating));
          const subject = subjects.get(id);
          const before = subject.rating;
          update(subject,event,subject.count < 18 ? 64 : 40);
          subjectChanges.push({id,before,after:subject.rating});
        }
        const lowest = SUBJECTS.map(id => subjects.get(id).rating).sort((a,b) => a-b).slice(0,3);
        overall.rating = Math.round(lowest.reduce((sum,rating) => sum + rating,0) / lowest.length);
      }
      points.push({event, rating:overall.rating, delta:overall.rating-before, calibration, subjectChanges});
    });
    return {overall, subjects, points, baseline};
  }
  function targetRating(stats, focus, pace) {
    const rating = stats.subjects.get(focus)?.rating ?? stats.overall.rating;
    return pace === 'warmup' ? Math.ceil(rating / 50) * 50 + PACES.warmup :
      Math.floor(rating / 50) * 50 + PACES[pace];
  }
  function choose(pool, seen, stats, session, subjectsOf, random = Math.random, picked = []) {
    const {focus, pace, placement} = session;
    const center = placement ? stats.overall.rating : targetRating(stats,focus,pace);
    const remaining = Math.max(1, session.length - picked.length);
    const gap = picked.reduce((sum,p) => sum + center - p.elo,0);
    const target = placement ? center + (PLACEMENT_OFFSETS[picked.length] || 0) :
      center + Math.max(-100, Math.min(100,gap / remaining));
    let best = null, bestDistance = Infinity, bestInRange = false;
    for (const p of pool) {
      if (seen.has(canonical(p.identity))) continue;
      const subjects = subjectsOf(p);
      if (focus !== 'mixed' && !subjects.includes(focus)) continue;
      const inRange = placement || Math.abs(p.elo - center) <= 100;
      if (bestInRange && !inRange) continue;
      const coverage = subjects.length ? Math.min(...subjects.map(id => stats.subjects.get(id)?.count || 0)) : 0;
      const penalty = focus === 'mixed' ? Math.min(coverage, 5) * (placement ? 35 : 4) : 0;
      const distance = Math.abs(p.elo - target) + penalty + random() * (placement ? 25 : 10);
      if (inRange && !bestInRange || distance < bestDistance) {
        best = p; bestDistance = distance; bestInRange = inRange;
      }
    }
    return best;
  }
  function recommendations(history, lookup, now = Date.now()) {
    const latest = new Map();
    for (const e of history) {
      if (e.kind === 'problem' && ['correct', 'incorrect'].includes(e.outcome))
        latest.set(e.canonicalId || e.item, e);
    }
    const rows = new Map();
    const recent = [...latest.values()].sort((a, b) => b.at - a.at).slice(0, 60);
    for (const e of recent) {
      const weight = 0.5 ** (Math.max(0,now-e.at) / (30 * 86400000));
      const p = lookup(e.item);
      if (!p) continue;
      for (const id of new Set(p.tree)) {
        if (!rows.has(id)) rows.set(id, { id, attempts: 0, misses: 0, recentAttempts: 0, recentMisses: 0, examples: [] });
        const row = rows.get(id);
        row.attempts++;
        row.recentAttempts += weight;
        if (e.outcome === 'incorrect' || e.retry) {
          if (e.outcome === 'incorrect') row.misses++;
          row.recentMisses += weight * (e.outcome === 'incorrect' ? 1 : 0.5);
          row.missedSlug ||= e.item;
          if (row.examples.length < 3) row.examples.push(e);
        }
      }
    }
    const score = r => r.recentMisses / (r.recentAttempts + 2);
    return [...rows.values()].filter(r => r.examples.length).sort((a, b) => score(b) - score(a) || b.misses - a.misses);
  }
  const api = { KEY, PLACEMENT_SIZE, SUBJECT_PROVISIONAL, PACES, LENGTHS, canonical, read, merge, change, saveDraft, start, remaining, remainingMs, roundComplete, submissionAt, openRound, placementIndex, placementStats, advancePlacement, checkRoundAnswer, submitRound, placeAnswer, finishProblem, problemMinutes, ratings, targetRating, choose, recommendations };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Arena = api;
})(typeof window === 'undefined' ? globalThis : window);
