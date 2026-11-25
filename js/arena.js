// Arena history is the source of truth. Replaying signed outcomes against the saved
// difficulty also makes backups from two devices mergeable without adding their Elo.
(function (root) {
  'use strict';
  const KEY = 'mq-arena', PLACEMENT = 6, BASE = 1500;
  const PACES = { warmup: -180, matched: 0, stretch: 180 };
  const LENGTHS = [2, 3, 5];
  const canonical = id => root.ProblemCatalog?.canonicalId(root.MATH_PROBLEM_CATALOG, id) || id;
  const validId = id => typeof id === 'string' && /^[a-z0-9][a-z0-9.-]{0,180}$/i.test(id);
  const blank = () => ({ version: 1, events: [], session: null });
  const validPace = pace => Object.hasOwn(PACES, pace);
  const outcomes = ['correct', 'incorrect', 'seen', 'unanswered'];
  const optionalText = value => value == null || typeof value === 'string';
  const validDraft = slot => validId(slot.slug) && validId(slot.identity) && typeof slot.draft === 'string' && optionalText(slot.firstMiss);
  function validRound(round) {
    return Number.isFinite(round.deadline) && Number.isFinite(round.limitMs) && round.limitMs > 0 &&
      Array.isArray(round.items) && round.items.length > 0 && round.items.every(item =>
        item && validDraft(item) && Number.isFinite(item.elo) && Array.isArray(item.subjects) &&
        item.subjects.every(validId) && (item.outcome == null || outcomes.includes(item.outcome)));
  }
  function validate(state) {
    const s = state.session;
    if (state.version !== 1 || !Array.isArray(state.events) || !state.events.every(e =>
      e && validId(e.slug) && validId(e.identity) && validId(e.session) && Number.isFinite(e.at) &&
      Number.isFinite(e.elo) && Array.isArray(e.subjects) && e.subjects.every(validId) &&
      outcomes.includes(e.outcome) && typeof e.answer === 'string' && optionalText(e.firstMiss) &&
      optionalText(e.invalidDraft) && (e.limitMs == null || Number.isFinite(e.limitMs))) ||
      (s != null && !(validId(s.id) && Number.isFinite(s.updated) && validId(s.focus) &&
        validPace(s.pace) && [...LENGTHS, PLACEMENT, 10].includes(s.length) && typeof s.placement === 'boolean' &&
        typeof s.closed === 'boolean' && (!s.last || validId(s.last)) &&
        (!s.slot || validDraft(s.slot)) && (!s.round || validRound(s.round))))) {
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
      if (!unique.has(id) || (unique.get(id).outcome === 'seen' && event.outcome !== 'seen')) unique.set(id, event);
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
    if (round && Date.now() >= round.deadline) return false;
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
    const placement = state.events.filter(e => e.outcome !== 'seen').length < PLACEMENT;
    state.session = { id: root.crypto?.randomUUID?.() || Date.now().toString(36) + '-' + Math.random().toString(36).slice(2),
      updated: Date.now(), focus: placement ? 'mixed' : focus, pace: placement ? 'matched' : pace,
      length: placement ? PLACEMENT : length, placement, closed: false, slot: null, last: null };
  }
  function remaining(state) {
    const s = state.session;
    if (!s) return 0;
    return Math.max(0, s.length - state.events.filter(e => e.outcome !== 'seen' && (s.placement || e.session === s.id)).length);
  }
  function remainingMs(session, now = Date.now()) {
    return Math.max(0, session.round.deadline - now);
  }
  function problemMinutes(elo) {
    if (elo < 1000) return 2;
    if (elo < 1600) return 3;
    if (elo < 2200) return 5;
    if (elo < 2800) return 7;
    return 9;
  }
  function openRound(state, id, problems, now = Date.now()) {
    const s = state.session;
    if (s?.id !== id || s.placement || s.closed || s.round || !problems.length) return false;
    const used = new Set(state.events.map(e => canonical(e.identity)));
    const items = [];
    for (const p of problems) {
      const identity = canonical(p.identity);
      if (used.has(identity)) continue;
      used.add(identity);
      items.push({slug:p.slug, identity, elo:p.elo, subjects:p.subjects, draft:s.slot?.slug === p.slug ? s.slot.draft : ''});
    }
    if (!items.length) return false;
    const limitMs = items.reduce((sum, item) => sum + problemMinutes(item.elo) * 60000, 0);
    s.round = {items, limitMs, deadline:now + limitMs};
    s.slot = null;
    s.last = null;
  }
  function checkRoundAnswer(state, id, slug, result, now = Date.now()) {
    const s = state.session;
    if (s?.id !== id || s.closed || !s.round || !remainingMs(s, now)) return false;
    const item = s.round.items.find(item => item.slug === slug);
    if (!item || item.outcome) return false;
    Object.assign(item, {outcome:result.outcome, draft:result.answer});
  }
  function submitRound(state, id, judge, now = Date.now()) {
    const s = state.session;
    if (s?.id !== id || s.closed || !s.round) return false;
    const previous = new Set(state.events.map(e => canonical(e.identity)));
    const timedOut = !remainingMs(s, now);
    for (const item of s.round.items) {
      if (previous.has(canonical(item.identity))) continue;
      const result = item.outcome ? {outcome:item.outcome, answer:item.draft} :
        judge(item.slug, item.draft) || {outcome:'unanswered', answer:''};
      addEvent(state, item, item.subjects, result.outcome, result.answer, {
        limitMs:s.round.limitMs, timedOut, ...(result.outcome === 'unanswered' && item.draft ? {invalidDraft:item.draft} : {})
      }, Math.min(now, s.round.deadline));
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
  function track() { return { rating: BASE, count: 0, wins: 0, placement: [] }; }
  function update(t, event) {
    const win = Number(event.outcome === 'correct');
    t.count++;
    t.wins += win;
    if (t.count <= PLACEMENT) {
      // A broad normal prior gives a finite placement even for six wins or six losses.
      t.placement.push(event);
      let low = 100, high = 5000;
      for (let i = 0; i < 18; i++) {
        const r = (low + high) / 2;
        const score = t.placement.reduce((sum, e) => sum + Number(e.outcome === 'correct') - expected(r, e.elo), 0);
        if (score * Math.LN10 / 400 > (r - BASE) / (600 ** 2)) low = r; else high = r;
      }
      t.rating = Math.round((low + high) / 2);
    } else {
      const k = t.count <= 24 ? 64 : 40;
      t.rating = Math.max(100, Math.round(t.rating + k * (win - expected(t.rating, event.elo))));
    }
  }
  function ratings(events) {
    const overall = track(), subjects = new Map(), points = [];
    for (const e of events) {
      if (e.outcome === 'seen') continue;
      const before = overall.rating;
      update(overall, e);
      for (const id of e.subjects) {
        if (!subjects.has(id)) subjects.set(id, track());
        update(subjects.get(id), e);
      }
      points.push({ event: e, rating: overall.rating, delta: overall.rating - before });
    }
    return { overall, subjects, points };
  }
  function targetRating(stats, focus, pace) {
    return (stats.subjects.get(focus)?.rating ?? stats.overall.rating) + PACES[pace];
  }
  function choose(pool, seen, stats, session, subjectsOf, random = Math.random) {
    const { focus, pace, placement } = session;
    const target = targetRating(stats, focus, pace);
    let best = null, bestDistance = Infinity;
    for (const p of pool) {
      if (seen.has(canonical(p.identity))) continue;
      const subjects = subjectsOf(p);
      if (focus !== 'mixed' && !subjects.includes(focus)) continue;
      // With mixed problems, rotate coverage when difficulties are comparable.
      const coverage = subjects.length ? Math.min(...subjects.map(id => stats.subjects.get(id)?.count || 0)) : 0;
      const penalty = focus === 'mixed' ? Math.min(coverage, 5) * (placement ? 70 : 15) : 0;
      const distance = Math.abs(p.elo - target) + penalty + random() * 100;
      if (distance < bestDistance) { best = p; bestDistance = distance; }
    }
    return best;
  }
  function recommendations(history, lookup) {
    const latest = new Map();
    for (const e of history) {
      if (e.kind === 'problem' && ['correct', 'incorrect'].includes(e.outcome))
        latest.set(e.canonicalId || e.item, e);
    }
    const rows = new Map();
    const recent = [...latest.values()].sort((a, b) => b.at - a.at).slice(0, 60);
    for (const e of recent) {
      const p = lookup(e.item);
      if (!p) continue;
      for (const id of new Set(p.tree)) {
        if (!rows.has(id)) rows.set(id, { id, attempts: 0, misses: 0 });
        const row = rows.get(id);
        row.attempts++;
        if (e.outcome === 'incorrect') {
          row.misses++;
          row.missedSlug ||= e.item;
        }
      }
    }
    const score = r => r.misses / (r.attempts + 2);
    return [...rows.values()].filter(r => r.misses).sort((a, b) => score(b) - score(a) || b.misses - a.misses);
  }
  const api = { KEY, PLACEMENT, PACES, LENGTHS, canonical, read, merge, change, saveDraft, start, remaining, remainingMs, openRound, checkRoundAnswer, submitRound, placeAnswer, finishProblem, problemMinutes, ratings, targetRating, choose, recommendations };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Arena = api;
})(typeof window === 'undefined' ? globalThis : window);
