// Local practice records contain stable problem IDs, never copies of the problem corpus.
(function (root) {
  'use strict';
  const KEY = 'mq-practice-sets';
  const math = typeof module !== 'undefined' ? require('./learn-answer.js') : root.LearnAnswer;
  function read(storage) {
    const value = JSON.parse(storage.getItem(KEY) || '[]');
    if (!Array.isArray(value)) throw new Error('Invalid practice history');
    return value.filter(s => s && typeof s.id === 'string' && typeof s.label === 'string' &&
      Array.isArray(s.slugs) && s.slugs.length && s.slugs.every(x => typeof x === 'string'))
      .map(s => {
        const { stopwatch, elapsed, runningSince, reviews, ...record } = s;
        if (record.kind === 'mock' && (!record.clock || !['AMC 8','AMC 10','AMC 12','AIME'].includes(record.mock?.family))) return null;
        if (record.kind === 'mock' && record.clock) {
          const limit = Number(record.clock.limitMs);
          if (!(limit > 0 && Number.isFinite(limit))) return null;
          record.clock = { limitMs:limit, remainingMs:Math.max(0, Math.min(limit, Number(record.clock.remainingMs) || 0)), deadline:null };
        }
        return { ...record, answers: s.answers || {}, marks: s.marks || {},
          current: Number.isInteger(s.current) && s.current >= 0 && s.current < s.slugs.length ? s.current : 0,
          status: s.status === 'finished' ? 'finished' : 'paused' };
      }).filter(Boolean);
  }
  function save(storage, set) {
    const records = read(storage), i = records.findIndex(s => s.id === set.id);
    const snapshot = { ...set };
    if (i < 0) records.unshift(snapshot); else records[i] = snapshot;
    storage.setItem(KEY, JSON.stringify(records));
  }
  function create(label, difficulty, slugs, now = Date.now()) {
    return { id: now.toString(36) + '-' + Math.random().toString(36).slice(2, 9), label, difficulty,
      slugs, answers: {}, marks: {}, current: 0, status: 'active',
      created: now, updated: now };
  }
  function createMock(label, slugs, mock, now = Date.now()) {
    const set = create(label, 'Mock', slugs, now), limitMs = mock.durationMs;
    if (!(limitMs > 0 && Number.isFinite(limitMs))) throw Error('Invalid mock duration');
    set.kind = 'mock'; set.mock = { ...mock };
    set.clock = { limitMs, remainingMs:limitMs, deadline:now+limitMs };
    return set;
  }
  function timeLeft(set, now = Date.now()) {
    if (set.kind !== 'mock' || !set.clock) return null;
    return Math.max(0, set.status === 'active' && Number.isFinite(set.clock.deadline)
      ? set.clock.deadline-now : set.clock.remainingMs);
  }
  function checkpoint(set, now = Date.now()) {
    delete set.stopwatch; delete set.elapsed; delete set.runningSince;
    if (set.kind === 'mock' && set.clock && set.status !== 'finished') {
      const deadline = set.clock.deadline;
      set.clock.remainingMs = timeLeft(set, now);
      if (set.clock.remainingMs === 0) {
        set.status = 'finished'; set.timedOut = true; set.finishedAt = Number.isFinite(deadline) ? deadline : now;
        set.clock.deadline = null;
      }
    }
    set.updated = now;
  }
  function pause(set, now = Date.now()) {
    checkpoint(set, now);
    if (set.status !== 'finished') { set.status = 'paused'; if (set.clock) set.clock.deadline = null; }
  }
  function resume(set, now = Date.now()) {
    if (set.status === 'finished') return;
    if (set.kind === 'mock' && set.clock) {
      if (set.status === 'active' && Number.isFinite(set.clock.deadline)) checkpoint(set,now);
      if (set.status === 'finished') return;
      set.clock.deadline = now + set.clock.remainingMs;
    }
    set.status = 'active';
  }
  function finish(set, now = Date.now()) {
    checkpoint(set, now);
    if (set.status !== 'finished') set.finishedAt = now;
    if (set.clock) set.clock.deadline = null;
    set.status = 'finished';
  }
  function answer(set, slug, value, aime, now = Date.now()) {
    if (set.kind === 'mock') checkpoint(set,now);
    if (set.status === 'finished') return false;
    const text = String(value).trim();
    // A problem read in its official paper (set.selfCheck) takes any short answer; the solver
    // checks it against the official solution at review.
    if (set.selfCheck?.[slug]) { if (text.length > 60) return false; }
    else if (root.MATH_MOCK_EXTRAS?.[slug]) {
      if (text) { try { const v=math.values(text); if(text.length>120 || v.length!==1 || !Number.isFinite(v[0])) return false; } catch(e) { return false; } }
    } else if (!(text === '' || (aime ? /^\d{1,3}$/.test(text) : /^[A-E]$/.test(text)))) return false;
    set.answers[slug] = text;
    return true;
  }
  function result(set, slug) {
    // A problem the MAA voided is never graded (MATH_ANSWER_KEYS.voided), answered or not.
    if (root.MATH_ANSWER_KEYS?.voided?.[slug]) return 'Voided';
    if (!set.answers[slug]) return 'Unanswered';
    if (set.selfCheck?.[slug]) return set.self?.[slug] || 'Check yourself';
    const extra = root.MATH_MOCK_EXTRAS?.[slug];
    if (extra) return extra.answers.some(key => math.same(set.answers[slug],key)) ? 'Correct' : 'Incorrect';
    const key = root.MATH_ANSWER_KEYS?.answers?.[slug];
    if (key == null) return 'Answer unavailable';
    const actual = String(set.answers[slug]).trim();
    const same = /^\d+$/.test(key) ? /^\d{1,3}$/.test(actual) && Number(actual) === Number(key) : actual.toUpperCase() === key;
    return same ? 'Correct' : 'Incorrect';
  }
  // After finishing, the solver marks a self-checked answer right or wrong (or clears the mark).
  function selfMark(set, slug, verdict) {
    if (set.status !== 'finished' || !set.selfCheck?.[slug] || !set.answers[slug]) return false;
    if (!['Correct', 'Incorrect', null].includes(verdict)) return false;
    set.self = { ...(set.self || {}) };
    if (verdict) set.self[slug] = verdict; else delete set.self[slug];
    return true;
  }
  const api = { KEY, read, save, create, createMock, checkpoint, pause, resume, finish, timeLeft, answer, result, selfMark };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeSessions = api;
})(typeof window === 'undefined' ? globalThis : window);
