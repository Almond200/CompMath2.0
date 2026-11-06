// Local practice records contain stable problem IDs, never copies of the problem corpus.
(function (root) {
  'use strict';
  const KEY = 'mq-practice-sets';
  function read(storage) {
    const value = JSON.parse(storage.getItem(KEY) || '[]');
    if (!Array.isArray(value)) throw new Error('Invalid practice history');
    return value.filter(s => s && typeof s.id === 'string' && typeof s.label === 'string' &&
      Array.isArray(s.slugs) && s.slugs.length && s.slugs.every(x => typeof x === 'string'))
      .map(s => {
        const { stopwatch, elapsed, runningSince, reviews, ...record } = s;
        return { ...record, answers: s.answers || {}, marks: s.marks || {},
          current: Number.isInteger(s.current) && s.current >= 0 && s.current < s.slugs.length ? s.current : 0,
          status: s.status === 'finished' ? 'finished' : 'paused' };
      });
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
  function checkpoint(set, now = Date.now()) {
    delete set.stopwatch; delete set.elapsed; delete set.runningSince;
    set.updated = now;
  }
  function pause(set, now = Date.now()) {
    checkpoint(set, now);
    if (set.status !== 'finished') set.status = 'paused';
  }
  function finish(set, now = Date.now()) { pause(set, now); set.status = 'finished'; }
  function answer(set, slug, value, aime) {
    if (set.status === 'finished') return false;
    const text = String(value).trim();
    if (!(text === '' || (aime ? /^\d{1,3}$/.test(text) : /^[A-E]$/.test(text)))) return false;
    set.answers[slug] = text;
    return true;
  }
  function result(set, slug) {
    if (!set.answers[slug]) return 'Unanswered';
    const key = root.MATH_ANSWER_KEYS?.answers?.[slug];
    if (key == null) return 'Answer unavailable';
    const actual = String(set.answers[slug]).trim();
    const same = /^\d+$/.test(key) ? /^\d{1,3}$/.test(actual) && Number(actual) === Number(key) : actual.toUpperCase() === key;
    return same ? 'Correct' : 'Incorrect';
  }
  const api = { KEY, read, save, create, checkpoint, pause, finish, answer, result };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeSessions = api;
})(typeof window === 'undefined' ? globalThis : window);
