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
        if (record.kind === 'mock') {
          const known = ['AMC 8','AMC 10','AMC 12','AIME'].includes(record.mock?.family);
          const past = record.mock?.mode === 'paper' && typeof record.mock.family === 'string' && record.mock.family;
          if (!known && !past) return null;
          if (!record.clock && (!past || record.mock.durationMs !== null)) return null;
        }
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
    set.kind = 'mock'; set.mock = { ...mock };
    if (mock.mode === 'paper' && limitMs === null) return set;
    if (!(limitMs > 0 && Number.isFinite(limitMs))) throw Error('Invalid mock duration');
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
  function exactKey(slug) {
    return root.MATH_MOCK_EXTRAS?.[slug] ?? root.MATH_SHORT_ANSWER_KEYS?.answers?.[slug];
  }
  // Top-level commas separate entries. Commas inside parentheses belong to a tuple
  // or to its component expressions, so do not split those until parsing the tuple.
  function splitExactList(text) {
    let depth = 0, start = 0;
    const parts = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '(') depth++;
      if (text[i] === ')') depth--;
      if (depth < 0) throw Error('Unmatched parenthesis');
      if (!depth && text[i] === ',') { parts.push(text.slice(start, i)); start = i + 1; }
    }
    if (depth) throw Error('Unmatched parenthesis');
    return [...parts, text.slice(start)].map(part => part.trim());
  }
  function exactTex(text, format) {
    text = cleanExact(text, format);
    if (format !== 'tuple' && format !== 'tuple-set') return math.toTex(text);
    const tuples = format === 'tuple' ? [text] : splitExactList(text);
    return tuples.map(tuple => {
      if (!tuple.startsWith('(') || !tuple.endsWith(')')) throw Error('Expected a parenthesized tuple');
      const values = splitExactList(tuple.slice(1, -1)).map(math.toTex);
      return '\\left(' + values.join(',\\ ') + '\\right)';
    }).join(',\\ ');
  }
  function cleanExact(text, format) {
    text = text.replace(/(?:\^\{\\circ\}|[°∘◦])/g, '');
    return format === 'set' || format === 'tuple-set'
      ? text.replace(/^\{(.*)\}$/s, '$1').trim() : text;
  }
  // Compare rational expressions without rounding, including powers beyond Number's range.
  function rational(node) {
    if (node.op === 'num') {
      const [whole, decimal = ''] = node.v.split('.');
      return [BigInt(whole + decimal), 10n ** BigInt(decimal.length)];
    }
    if (['pi', 'sqrt', 'cbrt'].includes(node.op)) return null;
    const left = rational(node.a);
    if (!left) return null;
    const [a, b] = left;
    if (node.op === '()') return left;
    if (node.op === 'neg') return [-a, b];
    if (node.op === '!') {
      const k = a / b;
      if (a % b || k < 0n || k > 170n) return null;
      let result = 1n;
      for (let i = 2n; i <= k; i++) result *= i;
      return [result, 1n];
    }
    const right = rational(node.b);
    if (!right) return null;
    const [c, d] = right;
    let n, denominator;
    switch (node.op) {
      case '+': n = a * d + b * c; denominator = b * d; break;
      case '-': n = a * d - b * c; denominator = b * d; break;
      case '*': n = a * c; denominator = b * d; break;
      case '/': n = a * d; denominator = b * c; break;
      case '^': {
        const exponent = c / d;
        const magnitude = exponent < 0n ? -exponent : exponent;
        if (c % d || magnitude > 4096n ||
          BigInt(Math.max(a.toString(2).length, b.toString(2).length)) * magnitude > 16384n) return null;
        [n, denominator] = exponent < 0n ? [b ** magnitude, a ** magnitude] : [a ** magnitude, b ** magnitude];
        break;
      }
    }
    if (!denominator || n.toString(2).length > 16384 || denominator.toString(2).length > 16384) return null;
    return [n, denominator];
  }
  function exactValues(text, format) {
    if (text.length > 120) throw Error('Answer is too long');
    text = cleanExact(text, format);
    const evaluated = node => {
      const fraction = rational(node), value = math.value(node);
      if (!fraction && !Number.isFinite(value)) throw Error('Expected a finite number');
      return { fraction, value };
    };
    const scalar = value => {
      const nodes = math.parse(value);
      if (nodes.length !== 1) throw Error('Expected one number');
      return evaluated(nodes[0]);
    };
    const tuple = part => {
      if (!part.startsWith('(') || !part.endsWith(')')) throw Error('Expected a parenthesized tuple');
      return splitExactList(part.slice(1, -1)).map(scalar);
    };
    if (format === 'tuple') return [tuple(text)];
    if (format === 'tuple-set') return splitExactList(text).map(tuple);
    if (format === 'set') {
      return math.parse(text).map(node => [evaluated(node)]);
    }
    return [[scalar(text)]];
  }
  function sameExactValue(a, b) {
    if (a.fraction && b.fraction) return a.fraction[0] * b.fraction[1] === a.fraction[1] * b.fraction[0];
    return Math.abs(a.value - b.value) <= Math.min(1e-7, 1e-9 * Math.max(1, Math.abs(b.value)));
  }
  function matchesExact(text, expected, format) {
    try {
      const actual = exactValues(text, format), remaining = exactValues(expected, format);
      if (actual.length !== remaining.length) return false;
      return actual.every(tuple => {
        const i = remaining.findIndex(key => key.length === tuple.length &&
          key.every((value, j) => sameExactValue(tuple[j], value)));
        if (i < 0) return false;
        remaining.splice(i, 1);
        return true;
      });
    } catch (err) { return false; }
  }
  function answer(set, slug, value, aime, now = Date.now()) {
    if (set.kind === 'mock') checkpoint(set,now);
    if (set.status === 'finished') return false;
    const text = String(value).trim();
    // A problem read in its official paper (set.selfCheck) takes any short answer; the solver
    // checks it against the official solution at review.
    const exact = exactKey(slug);
    if (set.selfCheck?.[slug]) { if (text.length > 60) return false; }
    else if (exact) {
      if (text) { try { exactValues(text, exact.format); } catch (err) { return false; } }
    } else if (!(text === '' || (aime ? /^\d{1,3}$/.test(text) : (/-columbus-state-tournament-/.test(slug) ? /^[A-F]$/ : /^[A-E]$/).test(text)))) return false;
    set.answers[slug] = text;
    return true;
  }
  function result(set, slug) {
    // A problem the MAA voided is never graded (MATH_ANSWER_KEYS.voided), answered or not.
    if (root.MATH_ANSWER_KEYS?.voided?.[slug]) return 'Voided';
    if (!set.answers[slug]) return 'Unanswered';
    if (set.selfCheck?.[slug]) return set.self?.[slug] || 'Check yourself';
    const extra = root.MATH_MOCK_EXTRAS?.[slug];
    if (extra) return extra.answers.some(key => math.same(set.answers[slug], key)) ? 'Correct' : 'Incorrect';
    const exact = exactKey(slug);
    if (exact) return exact.answers.some(key => matchesExact(set.answers[slug], key, exact.format)) ? 'Correct' : 'Incorrect';
    // LIVE's MAA keys, else the official letters of the other multiple-choice contests (answer-keys-more.js).
    const key = root.MATH_ANSWER_KEYS?.answers?.[slug] ?? root.MATH_EXTRA_KEYS?.answers?.[slug];
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
  const api = { KEY, read, save, create, createMock, checkpoint, pause, resume, finish, timeLeft, exactKey, exactTex, answer, result, selfMark };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeSessions = api;
})(typeof window === 'undefined' ? globalThis : window);
