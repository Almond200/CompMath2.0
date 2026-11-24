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
  function voidReason(slug) {
    return root.MATH_ANSWER_KEYS?.voided?.[slug] ?? root.MATH_SHORT_ANSWER_KEYS?.voided?.[slug];
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
  function tupleParts(text, notation) {
    const mixed = Array.isArray(notation);
    if (!mixed) {
      if (!text.startsWith('(') || !text.endsWith(')')) throw Error('Expected a parenthesized tuple');
      return splitExactList(text.slice(1, -1));
    }
    text = text.replace(/\$|\\(?:left|right)\b/g, '').trim();
    let parts = splitExactList(text);
    if (parts.length === 1 && text.startsWith('(') && text.endsWith(')')) parts = splitExactList(text.slice(1, -1));
    if (parts.length !== notation.length) throw Error('Unexpected number of tuple entries');
    return parts.map((part, i) => {
      if (notation[i] !== 'letter') return cleanExact(part, null, notation[i]);
      if (!/^[a-z]$/i.test(part)) throw Error('Expected one letter');
      return part.toUpperCase();
    });
  }
  function ternaryParts(text) {
    text = text.replace(/\$|\\(?:left|right)\b/g, '').replace(/\s+and\s+/gi, ',').trim();
    let parts = splitExactList(text);
    if (parts.length === 1 && text.startsWith('(') && text.endsWith(')')) parts = splitExactList(text.slice(1, -1));
    return parts.map(part => {
      const digits = /^(?:([0-2]+)|\(([0-2]+)\))(?:\s*(?:_(?:3|\{3\})|₃|\(base\s+3\)))?$/i.exec(part);
      if (!digits) throw Error('Use the digits 0, 1, and 2 for a base 3 value');
      return (digits[1] || digits[2]).replace(/^0+(?=\d)/, '');
    });
  }
  function symbolicTex(text) {
    if (text.length > 120) return null;
    try { return math.toSymbolicTex(text); } catch (err) { return null; }
  }
  function exactTex(text, format, notation) {
    const equation = text.includes('=');
    const display = equation && symbolicTex(text);
    if (display) return display;
    try {
      return formattedExactTex(text, format, notation);
    } catch (err) {
      const symbolic = !equation && symbolicTex(text);
      if (symbolic) return symbolic;
      throw err;
    }
  }
  function formattedExactTex(text, format, notation) {
    const percent = format === 'percent' && text.includes('%');
    const degrees = notation === 'angle' ? degreeExpression(text) : null;
    if (degrees != null) return '{' + math.toTex(degrees, true) + '}^{\\circ}';
    text = cleanExact(text, format, notation);
    if (notation === 'base-3') return ternaryParts(text).map(part => `${part}_{3}`).join(',\\ ');
    if (format === 'interval') {
      const parts = intervalParts(text);
      if (!parts.length) return '\\varnothing';
      return parts.map(part => {
        const lower = part.lower == null ? '-\\infty' : math.toTex(part.lower);
        const upper = part.upper == null ? '\\infty' : math.toTex(part.upper);
        return `${part.lowerClosed ? '[' : '('}${lower},\\ ${upper}${part.upperClosed ? ']' : ')'}`;
      }).join(' \\cup ');
    }
    if (format === 'sequence') return splitExactList(text).map(part => math.toTex(part)).join(',\\ ');
    if (format === 'polynomial' || format === 'rational-function') return math.toTex(text, true, false, notation);
    if (format === 'complex' || format === 'complex-set') return math.toTex(text, format === 'complex', true);
    if (format !== 'tuple' && format !== 'tuple-set') return math.toTex(text, format !== 'set') + (percent ? '\\%' : '');
    const tuples = format === 'tuple' ? [text] : splitExactList(text);
    return tuples.map(tuple => {
      const values = tupleParts(tuple, notation).map((part, i) =>
        Array.isArray(notation) && notation[i] === 'letter' ? part : math.toTex(part));
      return '\\left(' + values.join(',\\ ') + '\\right)';
    }).join(',\\ ');
  }
  function degreeExpression(text) {
    const match = /^(.*?)(?:\^\{\\circ\}|\^\\circ|[°∘◦]|\s+deg(?:rees?)?)$/i.exec(text.replace(/\$/g, '').trim());
    return match?.[1] ?? null;
  }
  const unitSuffix = {
    points: /\s*(?:points?|pts?\.?)\s*$/i,
    hours: /\s*(?:hours?|hrs?\.?)\s*$/i,
    inches: /\s*(?:inch(?:es)?|in\.?)\s*$/i,
    feet: /\s*(?:feet|foot|ft\.?)\s*$/i,
    pounds: /\s*(?:pounds?|lbs?\.?)\s*$/i,
    dollars: /\s*(?:dollars?|USD)\s*$/i,
    miles: /\s*(?:miles?|mi\.?)\s*$/i,
    mph: /\s*(?:mph|miles?\s+per\s+hour)\s*$/i,
    'radians-per-second': /\s*(?:rad(?:ians?)?\s*\/\s*s|radians?\s+per\s+second)\s*$/i,
    'square-inches': /\s*(?:square\s+inch(?:es)?|sq\.?\s*in\.?|in(?:\^2|²))\s*$/i,
    'cubic-inches': /\s*(?:cubic\s+inch(?:es)?|cu\.?\s*in\.?|in(?:\^3|³))\s*$/i,
    'square-units': /\s*(?:square\s+units?|units?\s+squared|units?(?:\^2|²))\s*$/i
  };
  function cleanExact(text, format, notation) {
    // A space between a whole number and a proper fraction is a mixed number.
    text = text.replace(/(?<![\w.])(\d+)\s+(\d+)\s*\/\s*(\d+)(?![\w./^]|\s+\d)/g,
      (mixed, whole, numerator, denominator) => BigInt(numerator) < BigInt(denominator)
        ? `(${whole}+${numerator}/${denominator})` : mixed);
    if (notation === 'profit') {
      const loss = /^(?:loss(?: of)?\s+(.+)|(.+?)\s+loss)$/i.exec(text.trim());
      if (loss) text = `-(${loss[1] || loss[2]})`;
    }
    if (Object.hasOwn(unitSuffix, notation)) text = text.replace(unitSuffix[notation], '');
    if (notation === 'repeating-decimal') {
      const recurring = /^([+-]?)(\d+)\.(\d*)(?:\((\d+)\)|\\overline\s*\{(\d+)\})$/.exec(text.replace(/\$/g, '').trim());
      if (recurring) {
        const [, sign, whole, prefix, inParens, overlined] = recurring;
        const repeat = inParens || overlined;
        const numerator = BigInt(whole + prefix + repeat) - BigInt(whole + prefix);
        const denominator = 10n ** BigInt(prefix.length) * (10n ** BigInt(repeat.length) - 1n);
        text = sign + numerator + '/' + denominator;
      }
    }
    if (notation === 'percent-change') {
      const change = /^(?:(increase|decrease)s?(?:\s+(?:by|of))?\s+(.+)|(.+?)\s+(increase|decrease))$/i.exec(text.trim());
      if (change) {
        const magnitude = (change[2] || change[3]).replace(/(?:\\?%)\s*$/, '');
        text = (change[1] || change[4]).toLowerCase() === 'decrease' ? `-(${magnitude})` : magnitude;
      }
    }
    if (notation === 'angle') {
      const degrees = degreeExpression(text);
      text = degrees != null ? '(' + degrees + ')*pi/180' : text.replace(/\s*rad(?:ians?)?\s*(?=\$?$)/i, '');
    }
    if (notation === 'polar') {
      const tuple = text.replace(/\$|\\(?:left|right)\b/g, '').trim();
      if (tuple.startsWith('(') && tuple.endsWith(')')) {
        const [radius, angle, ...extra] = splitExactList(tuple.slice(1, -1));
        const degrees = degreeExpression(angle || '');
        text = !extra.length && degrees != null ? `(${radius}, (${degrees})*pi/180)` : tuple;
      }
    }
    if (notation === 'ratio') {
      const terms = text.split(/:|\\colon\b/);
      if (terms.length === 2) text = `(${terms[0]})/(${terms[1]})`;
    }
    if (notation === 'fibonacci') {
      text = text.replace(/\bF\s*_\s*(?:\{\s*(\d+)\s*\}|(\d+))/gi, (_, braced, plain) => `fib(${braced || plain})`)
        .replace(/\bF([₀-₉]+)/g, (_, index) => `fib(${[...index].map(digit => digit.charCodeAt(0) - '₀'.charCodeAt(0)).join('')})`);
    }
    if (format === 'percent') text = text.replace(/(?:\\?%)\s*$/, '');
    text = text.replace(/\b(sin|cos|tan)\s*\(([^()]+?)(?:\^\{\\circ\}|[°∘◦]|\s+deg)\s*\)/gi, '$1(($2)*pi/180)');
    text = text.replace(/(?:\^\{\\circ\}|[°∘◦])/g, '');
    return ['set', 'tuple-set', 'complex-set'].includes(format)
      ? text.replace(/^\\?\{(.*?)\\?\}$/s, '$1').trim() : text;
  }
  function intervalParts(text) {
    text = text.replace(/\$|\\(?:left|right)\b/g, '').trim();
    if (/^(?:∅|\\(?:emptyset|varnothing)|empty(?: set)?|\{\})$/i.test(text)) return [];
    const parts = text.split(/\s*(?:∪|\\cup\b|\b(?:u|union|or)\b)\s*/i);
    if (parts.length > 24) throw Error('Too many intervals');
    return parts.map(part => {
      const range = { lower: null, upper: null, lowerClosed: false, upperClosed: false };
      const bracket = /^([[(])(.*)([)\]])$/.exec(part.trim());
      if (bracket) {
        const limits = splitExactList(bracket[2]);
        if (limits.length !== 2 || limits.some(limit => !limit)) throw Error('An interval needs two endpoints');
        [range.lower, range.upper] = limits;
        range.lowerClosed = bracket[1] === '[';
        range.upperClosed = bracket[3] === ']';
      } else {
        const expression = part.replace(/[≤≥]/g, symbol => symbol === '≤' ? '<=' : '>=')
          .replace(/\\(leq?|geq?)\b/g, (_, name) => name[0] === 'l' ? '<=' : '>=');
        const tokens = expression.split(/(<=|>=|<|>)/).map(token => token.trim());
        const variable = tokens.findIndex(token => /^[a-z](?:_\d+)?$/i.test(token));
        if ((tokens.length !== 3 && tokens.length !== 5) || variable < 0 || (tokens.length === 5 && variable !== 2)) {
          throw Error('Expected an interval or inequality');
        }
        for (let i = 1; i < tokens.length; i += 2) {
          if (variable !== i - 1 && variable !== i + 1) throw Error('Expected an inequality');
          const operand = tokens[variable === i - 1 ? i + 1 : i - 1], comparison = tokens[i];
          const upper = (comparison[0] === '<') === (variable === i - 1);
          const side = upper ? 'upper' : 'lower';
          if (!operand || range[side] != null) throw Error('Expected one endpoint on each side');
          range[side] = operand;
          range[side + 'Closed'] = comparison.length === 2;
        }
      }
      for (const side of ['lower', 'upper']) {
        const value = range[side];
        if (value == null) continue;
        const infinity = /^([+−-]?)(?:inf(?:inity)?|∞|\\infty)$/i.exec(value.trim());
        if (!infinity) continue;
        const negative = infinity[1] === '-' || infinity[1] === '−';
        if (range[side + 'Closed'] || negative !== (side === 'lower')) throw Error('Infinity needs an open endpoint');
        range[side] = null;
      }
      return range;
    });
  }
  function integerRoot(value, degree) {
    if (value < 0n) {
      if (degree === 2n) return null;
      const root = integerRoot(-value, degree);
      return root == null ? null : -root;
    }
    if (value < 2n) return value;
    let root = 1n << ((BigInt(value.toString(2).length) + degree - 1n) / degree);
    while (true) {
      const next = ((degree - 1n) * root + value / root ** (degree - 1n)) / degree;
      if (next >= root) return root ** degree === value ? root : null;
      root = next;
    }
  }
  function rationalRoot(numerator, denominator, degree) {
    const [a, b] = reduceFraction(numerator, denominator);
    const n = integerRoot(a, degree), d = integerRoot(b, degree);
    return n == null || d == null ? null : [n, d];
  }
  function reduceFraction(numerator, denominator) {
    if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
    if (denominator === 1n) return [numerator, denominator];
    if (numerator === 0n) return [0n, 1n];
    const magnitude = numerator < 0n ? -numerator : numerator;
    if ((denominator & (denominator - 1n)) === 0n) {
      const power = magnitude & -magnitude;
      const divisor = power < denominator ? power : denominator;
      return [numerator / divisor, denominator / divisor];
    }
    let divisor = magnitude, remainder = denominator;
    while (remainder) [divisor, remainder] = [remainder, divisor % remainder];
    return [numerator / divisor, denominator / divisor];
  }
  function ungroup(node) {
    while (node?.op === '()') node = node.a;
    return node;
  }
  function sameExpression(a, b) {
    a = ungroup(a);
    b = ungroup(b);
    if (!a || !b) return a === b;
    return a.op === b.op && a.v === b.v && sameExpression(a.a, b.a) && sameExpression(a.b, b.b);
  }
  const signOf = value => value < 0 ? -1 : value > 0 ? 1 : 0;
  const EXACT_FACTORIAL_LIMIT = 4096n, EXACT_POWER_LIMIT = 16384n, EXACT_BIT_LIMIT = 131072;
  const EAGER_REDUCTION_BITS = 16384;
  const integerValue = fraction => fraction && fraction[0] % fraction[1] === 0n ? fraction[0] / fraction[1] : null;
  // Prove that a term is defined before removing it. Integer powers can have a known
  // sign even when computing the full value would exceed the size budget.
  function knownSign(node) {
    node = ungroup(node);
    if (node.op === 'pi' || node.op === 'e') return 1;
    if (node.op === '!') {
      const input = integerValue(rational(node.a));
      return input != null && input >= 0n && input <= EXACT_FACTORIAL_LIMIT ? 1 : null;
    }
    if (node.op === 'neg' || node.op === 'sqrt' || node.op === 'cbrt') {
      const sign = knownSign(node.a);
      if (sign == null || (node.op === 'sqrt' && sign < 0)) return null;
      return node.op === 'neg' ? -sign : sign;
    }
    if (node.op === '*' || node.op === '/') {
      const a = knownSign(node.a), b = knownSign(node.b);
      return a == null || b == null || (node.op === '/' && b === 0) ? null : a * b;
    }
    if (node.op === '^') {
      const power = integerValue(rational(node.b)), base = knownSign(node.a);
      if (base != null && power != null) {
        if (power < -EXACT_POWER_LIMIT || power > EXACT_POWER_LIMIT || (base === 0 && power <= 0n)) return null;
        if (power === 0n || (base !== 0 && power % 2n === 0n)) return 1;
        return base;
      }
    }
    const fraction = rational(node);
    return fraction ? signOf(fraction[0]) : null;
  }
  function collectFactors(node, inverse, top, bottom) {
    node = ungroup(node);
    if (node.op === '*' || (node.op === '/' && (!inverse || knownSign(node.b)))) {
      collectFactors(node.a, inverse, top, bottom);
      collectFactors(node.b, node.op === '/' ? !inverse : inverse, top, bottom);
    } else (inverse ? bottom : top).push(node);
  }
  function cancelFactors(node) {
    const top = [], bottom = [];
    collectFactors(node, false, top, bottom);
    if (!bottom.length) return null;
    const remaining = top.filter(factor => {
      const index = bottom.findIndex(candidate => sameExpression(factor, candidate));
      if (index < 0 || !knownSign(factor)) return true;
      bottom.splice(index, 1);
      return false;
    });
    if (remaining.length === top.length) return null;
    const product = terms => terms.reduce((a, b) => a ? { op: '*', a, b } : b, null) || { op: 'num', v: '1' };
    const numerator = product(remaining);
    return bottom.length ? { op: '/', a: numerator, b: product(bottom) } : numerator;
  }
  function cancelPower(node) {
    const a = ungroup(node.a), b = ungroup(node.b);
    if (a.op !== '^' || b.op !== '^' || !sameExpression(a.a, b.a) || !knownSign(a.a)) return null;
    const left = integerValue(rational(a.b)), right = integerValue(rational(b.b));
    if (left == null || right == null) return null;
    if ([left, right].some(power => power < -EXACT_POWER_LIMIT || power > EXACT_POWER_LIMIT)) return null;
    const base = rational(a.a);
    return base && rationalOperation('^', base, [left - right, 1n]);
  }
  function collectTerms(node, negative = false) {
    node = ungroup(node);
    if (node.op === '+' || node.op === '-') return [
      ...collectTerms(node.a, negative), ...collectTerms(node.b, node.op === '-' ? !negative : negative)
    ];
    if (node.op === 'neg') return collectTerms(node.a, !negative);
    return [{ node, negative }];
  }
  function cancelTerms(node) {
    const terms = collectTerms(node), remaining = [];
    for (const term of terms) {
      const match = remaining.findIndex(other => other.negative !== term.negative && sameExpression(other.node, term.node));
      if (match < 0 || knownSign(term.node) == null) remaining.push(term);
      else remaining.splice(match, 1);
    }
    if (remaining.length === terms.length) return null;
    let sum = [0n, 1n];
    for (const term of remaining) {
      const value = rational(term.node);
      if (!value || !sum) return null;
      sum = rationalOperation(term.negative ? '-' : '+', sum, value);
    }
    return sum;
  }
  function piMultiple(node) {
    node = ungroup(node);
    if (node.op === 'pi') return [1n, 1n];
    if (!['neg', '+', '-', '*', '/'].includes(node.op)) return null;
    const a = piMultiple(node.a);
    if (node.op === 'neg') return a && [-a[0], a[1]];
    if (node.op === '+' || node.op === '-') {
      const b = piMultiple(node.b);
      return a && b && rationalOperation(node.op, a, b);
    }
    if (a) {
      const b = rational(node.b);
      return b && rationalOperation(node.op, a, b);
    }
    if (node.op !== '*') return null;
    const b = piMultiple(node.b), scale = rational(node.a);
    return b && scale && rationalOperation('*', b, scale);
  }
  const sineHalves = { 0: 0n, 2: 1n, 6: 2n, 10: 1n, 12: 0n, 14: -1n, 18: -2n, 22: -1n };
  const integerTangents = { 0: 0n, 3: 1n, 9: -1n, 12: 0n, 15: 1n, 21: -1n };
  function rationalTrig(node) {
    const multiple = piMultiple(node.a);
    if (!multiple) return rational(node.a)?.[0] === 0n ? [node.op === 'cos' ? 1n : 0n, 1n] : null;
    if ((12n * multiple[0]) % multiple[1]) return null;
    const turns = 12n * multiple[0] / multiple[1] + (node.op === 'cos' ? 6n : 0n);
    const phase = (turns % 24n + 24n) % 24n;
    if (node.op === 'tan') {
      if (phase === 6n || phase === 18n) throw Error('Tangent is undefined at this angle');
      return integerTangents[phase] == null ? null : [integerTangents[phase], 1n];
    }
    return sineHalves[phase] == null ? null : reduceFraction(sineHalves[phase], 2n);
  }
  // Compare rational expressions without rounding, including powers beyond Number's range.
  function rational(node) {
    node = ungroup(node);
    if (node.op === 'num') {
      const [whole, decimal = ''] = node.v.split('.');
      return reduceFraction(BigInt(whole + decimal), 10n ** BigInt(decimal.length));
    }
    if (node.op === 'pi' || node.op === 'e') return null;
    if (node.op === 'ln') {
      const input = rational(node.a);
      return input && input[0] === input[1] ? [0n, 1n] : null;
    }
    if (['sin', 'cos', 'tan'].includes(node.op)) return rationalTrig(node);
    if (node.op === '+' || node.op === '-') {
      const canceled = cancelTerms(node);
      if (canceled) return canceled;
    }
    if (node.op === '*' || node.op === '/') {
      const canceled = cancelFactors(node);
      if (canceled) return rational(canceled);
    }
    if (node.op === '/') {
      const power = cancelPower(node);
      if (power) return power;
    }
    const base = ungroup(node.a), other = ungroup(node.b);
    if (base.op === 'sqrt' || base.op === 'cbrt') {
      const degree = base.op === 'sqrt' ? 2n : 3n;
      const a = rational(base.a);
      if (a && (degree === 3n || a[0] >= 0n)) {
        if (node.op === '^' && other.op === 'num' && other.v === String(degree)) return a;
        if ((node.op === '*' || node.op === '/') && other.op === base.op) {
          const b = rational(other.a);
          if (b && (degree === 3n || b[0] >= 0n)) {
            const combined = rationalOperation(node.op, a, b);
            if (combined) return rationalRoot(...combined, degree);
          }
        }
      }
    }
    const left = rational(node.a);
    if (!left) return null;
    const [a, b] = left;
    if (node.op === 'neg') return [-a, b];
    if (node.op === 'fib') {
      if (a % b) return null;
      const value = math.fibonacci(a / b);
      return value == null ? null : [value, 1n];
    }
    if (node.op === 'sqrt' || node.op === 'cbrt') return rationalRoot(a, b, node.op === 'sqrt' ? 2n : 3n);
    if (node.op === '!') {
      const k = a / b;
      if (a % b || k < 0n || k > EXACT_FACTORIAL_LIMIT) return null;
      let result = 1n;
      for (let i = 2n; i <= k; i++) result *= i;
      return [result, 1n];
    }
    const right = rational(node.b);
    if (!right) return null;
    return rationalOperation(node.op, left, right);
  }
  function rationalOperation(op, [a, b], [c, d]) {
    let n, denominator;
    switch (op) {
      case '+': n = a * d + b * c; denominator = b * d; break;
      case '-': n = a * d - b * c; denominator = b * d; break;
      case '*': n = a * c; denominator = b * d; break;
      case '/': n = a * d; denominator = b * c; break;
      case 'choose': {
        if (a % b || c % d) return null;
        const count = math.binomial(a / b, c / d);
        return count == null ? null : [count, 1n];
      }
      case '^': {
        const exponent = c / d;
        const magnitude = exponent < 0n ? -exponent : exponent;
        if (c % d || magnitude > EXACT_POWER_LIMIT || (a === 0n && exponent <= 0n) ||
          BigInt(Math.max(a.toString(2).length, b.toString(2).length)) * magnitude > BigInt(EXACT_BIT_LIMIT)) return null;
        [n, denominator] = exponent < 0n ? [b ** magnitude, a ** magnitude] : [a ** magnitude, b ** magnitude];
        break;
      }
    }
    if (!denominator) return null;
    if (denominator < 0n) { n = -n; denominator = -denominator; }
    const sizes = [n.toString(2).length, denominator.toString(2).length];
    // Large in-budget fractions can stay unreduced and compare by cross-product.
    // Avoid a GCD over two full factorial products on each input event.
    if (Math.min(...sizes) > EAGER_REDUCTION_BITS && Math.max(...sizes) <= EXACT_BIT_LIMIT) return [n, denominator];
    const reduced = reduceFraction(n, denominator);
    return reduced.some(part => part.toString(2).length > EXACT_BIT_LIMIT) ? null : reduced;
  }
  function fractionValue([numerator, denominator]) {
    if (numerator === 0n) return 0;
    const sign = numerator < 0n ? -1 : 1;
    const magnitude = numerator < 0n ? -numerator : numerator;
    const numeratorShift = Math.max(0, magnitude.toString(2).length - 53);
    const denominatorShift = Math.max(0, denominator.toString(2).length - 53);
    return sign * (Number(magnitude >> BigInt(numeratorShift)) / Number(denominator >> BigInt(denominatorShift))) *
      2 ** (numeratorShift - denominatorShift);
  }
  function evaluatedValue(fraction, value) {
    if (!fraction && !Number.isFinite(value)) throw Error('Expected a finite number');
    return { fraction, value: fraction ? fractionValue(fraction) : value };
  }
  function evaluated(node) {
    const fraction = rational(node);
    return evaluatedValue(fraction, fraction ? 0 : math.value(node, child => evaluated(child).value));
  }
  const zero = { fraction: [0n, 1n], value: 0 }, one = { fraction: [1n, 1n], value: 1 };
  const two = { fraction: [2n, 1n], value: 2 };
  const isZero = ({ fraction, value }) => fraction ? fraction[0] === 0n : value === 0;
  const exactZero = ({ fraction }) => fraction?.[0] === 0n;
  const negateValue = ({ fraction, value }) => ({ fraction: fraction && [-fraction[0], fraction[1]], value: -value });
  function combineReal(op, a, b) {
    if (op === '/' && isZero(b)) throw Error('Division by zero');
    if (op === '+' && exactZero(a)) return b;
    if ((op === '+' || op === '-') && exactZero(b)) return a;
    if (((op === '*' || op === '/') && exactZero(a)) || (op === '*' && exactZero(b))) return zero;
    const fraction = a.fraction && b.fraction && rationalOperation(op, a.fraction, b.fraction);
    if (op === '+') return evaluatedValue(fraction, a.value + b.value);
    if (op === '-') return evaluatedValue(fraction, a.value - b.value);
    if (op === '*') return evaluatedValue(fraction, a.value * b.value);
    return evaluatedValue(fraction, a.value / b.value);
  }
  function multiplyComplex([a, b], [c, d]) {
    return [combineReal('-', combineReal('*', a, c), combineReal('*', b, d)),
      combineReal('+', combineReal('*', a, d), combineReal('*', b, c))];
  }
  function divideComplex(left, [c, d]) {
    const denominator = combineReal('+', combineReal('*', c, c), combineReal('*', d, d));
    if (isZero(denominator)) throw Error('Division by zero');
    return multiplyComplex(left, [c, negateValue(d)]).map(part => combineReal('/', part, denominator));
  }
  function complexPower(base, { fraction }) {
    if (!fraction || fraction[0] % fraction[1]) throw Error('Expected an integer power of a complex number');
    let exponent = fraction[0] / fraction[1];
    const [real, imaginary] = base.map(part => part.fraction);
    const rationalUnit = value => value && (value[0] === value[1] || value[0] === -value[1]);
    if ((real?.[0] === 0n && rationalUnit(imaginary)) || (imaginary?.[0] === 0n && rationalUnit(real))) exponent %= 4n;
    if (exponent < -64n || exponent > 64n) throw Error('Complex power is too large');
    let power = exponent < 0n ? divideComplex([one, zero], base) : base;
    let result = [one, zero];
    for (let k = exponent < 0n ? -exponent : exponent; k; k >>= 1n) {
      if (k & 1n) result = multiplyComplex(result, power);
      if (k > 1n) power = multiplyComplex(power, power);
    }
    return result;
  }
  function containsImaginary(node) {
    if (node.op === 'i' || (node.a && containsImaginary(node.a)) || (node.b && containsImaginary(node.b))) return true;
    if (node.op !== 'sqrt') return false;
    const { fraction, value } = evaluated(node.a);
    return fraction ? fraction[0] < 0n : value < 0;
  }
  function squareRoot({ fraction, value }) {
    return evaluatedValue(fraction && rationalRoot(...fraction, 2n), Math.sqrt(value));
  }
  function complexSquareRoot([a, b]) {
    const negativeReal = (a.fraction ? a.fraction[0] < 0n : a.value < 0);
    if (isZero(b)) return negativeReal ? [zero, squareRoot(negateValue(a))] : [squareRoot(a), zero];
    const square = combineReal('+', combineReal('*', a, a), combineReal('*', b, b)).fraction;
    const modulus = evaluatedValue(square && rationalRoot(...square, 2n), Math.hypot(a.value, b.value));
    const larger = squareRoot(combineReal('/', combineReal('+', modulus, negativeReal ? negateValue(a) : a), two));
    const divisor = combineReal('*', two, larger);
    if (!negativeReal) return [larger, combineReal('/', b, divisor)];
    const negativeImaginary = b.fraction ? b.fraction[0] < 0n : b.value < 0;
    const smaller = combineReal('/', negativeImaginary ? negateValue(b) : b, divisor);
    return [smaller, negativeImaginary ? negateValue(larger) : larger];
  }
  function complexParts(node) {
    if (!containsImaginary(node)) return [evaluated(node), zero];
    if (node.op === 'i') return [zero, one];
    const base = ungroup(node.a);
    if (node.op === '^' && base.op === 'sqrt' && sameExpression(node.b, { op: 'num', v: '2' })) return complexParts(base.a);
    const left = complexParts(node.a);
    if (node.op === '()') return left;
    if (node.op === 'neg') return left.map(negateValue);
    if (node.op === 'sqrt') return complexSquareRoot(left);
    if (!node.b || node.op === 'choose') throw Error('Expected a complex expression using i');
    const right = complexParts(node.b);
    if (node.op === '+') return left.map((part, index) => combineReal('+', part, right[index]));
    if (node.op === '-') return left.map((part, index) => combineReal('-', part, right[index]));
    if (node.op === '*') return multiplyComplex(left, right);
    if (node.op === '/') return divideComplex(left, right);
    if (node.op === '^' && isZero(right[1])) return complexPower(left, right[0]);
    throw Error('Expected a complex expression using i');
  }
  function exactScalar(text) {
    const nodes = math.parse(text);
    if (nodes.length !== 1) throw Error('Expected one number');
    return evaluated(nodes[0]);
  }
  function polarTuple(parts) {
    if (parts.length !== 2) throw Error('Expected a radius and an angle');
    const radius = exactScalar(parts[0]), nodes = math.parse(parts[1]);
    if (compareValues(radius, zero) < 0 || nodes.length !== 1) throw Error('Expected a nonnegative radius and one angle');
    const multiple = piMultiple(nodes[0]);
    if (multiple) {
      const [numerator, denominator] = multiple, period = 2n * denominator;
      const phase = (numerator % period + period) % period;
      return [radius, evaluatedValue(null, Math.PI * fractionValue([phase, denominator]))];
    }
    const angle = evaluated(nodes[0]).value, period = 2 * Math.PI;
    if (Math.abs(angle) > 1e6) throw Error('Angle is too large');
    const phase = angle % period;
    return [radius, evaluatedValue(null, phase < 0 ? phase + period : phase)];
  }
  function compareValues(a, b) {
    if (a.fraction && b.fraction) return signOf(a.fraction[0] * b.fraction[1] - b.fraction[0] * a.fraction[1]);
    return signOf(a.value - b.value);
  }
  function sortedIntervals(text) {
    const intervals = intervalParts(text).map(part => ({ ...part,
      lower: part.lower == null ? null : exactScalar(part.lower),
      upper: part.upper == null ? null : exactScalar(part.upper)
    })).filter(part => {
      if (!part.lower || !part.upper) return true;
      const order = compareValues(part.lower, part.upper);
      if (order > 0) throw Error('The lower endpoint must come first');
      return order < 0 || part.lowerClosed && part.upperClosed;
    });
    intervals.sort((a, b) => {
      if (!a.lower || !b.lower) return (a.lower != null) - (b.lower != null);
      return compareValues(a.lower, b.lower) || Number(b.lowerClosed) - Number(a.lowerClosed);
    });
    const merged = [];
    for (const part of intervals) {
      const last = merged.at(-1);
      if (!last) { merged.push(part); continue; }
      if (!last.upper) continue;
      const gap = part.lower ? compareValues(part.lower, last.upper) : -1;
      if (gap > 0 || (gap === 0 && !last.upperClosed && !part.lowerClosed)) {
        merged.push(part);
        continue;
      }
      const endOrder = part.upper ? compareValues(part.upper, last.upper) : 1;
      if (endOrder > 0) { last.upper = part.upper; last.upperClosed = part.upperClosed; }
      else if (endOrder === 0) last.upperClosed ||= part.upperClosed;
    }
    return merged;
  }
  function sameInterval(a, b) {
    const sameBound = (submitted, expected) => expected ? !!submitted && sameExactValue(submitted, expected) : submitted == null;
    return a.lowerClosed === b.lowerClosed && a.upperClosed === b.upperClosed &&
      sameBound(a.lower, b.lower) && sameBound(a.upper, b.upper);
  }
  const POLYNOMIAL_MAX_DEGREE = 32, POLYNOMIAL_MAX_COEFFICIENT_BITS = 4096;
  function polynomialCoefficient(fraction) {
    if (!fraction || fraction.some(part => part.toString(2).length > POLYNOMIAL_MAX_COEFFICIENT_BITS)) {
      throw Error('Expected a bounded rational coefficient');
    }
    return fraction;
  }
  function polynomialOperation(op, left, right) {
    return polynomialCoefficient(rationalOperation(op, left, right));
  }
  function trimPolynomial(coefficients) {
    while (coefficients.length > 1 && coefficients.at(-1)[0] === 0n) coefficients.pop();
    return coefficients;
  }
  function multiplyPolynomials(left, right) {
    const degree = left.length + right.length - 2;
    if (degree > POLYNOMIAL_MAX_DEGREE) throw Error('Polynomial degree is too large');
    const terms = Array(degree + 1).fill(zero.fraction);
    for (let i = 0; i < left.length; i++) {
      if (left[i][0] === 0n) continue;
      for (let j = 0; j < right.length; j++) {
        if (right[j][0] === 0n) continue;
        const product = polynomialOperation('*', left[i], right[j]);
        terms[i + j] = polynomialOperation('+', terms[i + j], product);
      }
    }
    return trimPolynomial(terms);
  }
  function polynomialPower(base, exponent) {
    if (exponent.length !== 1) throw Error('Expected a constant polynomial exponent');
    const [numerator, denominator] = exponent[0], integer = numerator / denominator;
    if (numerator % denominator || integer < 1n || integer > BigInt(POLYNOMIAL_MAX_DEGREE)) {
      throw Error('Expected a positive integer polynomial exponent');
    }
    let result = [one.fraction];
    for (let power = integer; power; power >>= 1n) {
      if (power & 1n) result = multiplyPolynomials(result, base);
      if (power > 1n) base = multiplyPolynomials(base, base);
    }
    return result;
  }
  function hasVariable(node) {
    return !!node && (node.op === 'variable' || hasVariable(node.a) || hasVariable(node.b));
  }
  function addPolynomials(op, left, right) {
    const terms = Array.from({ length: Math.max(left.length, right.length) }, (_, i) =>
      polynomialOperation(op, left[i] || zero.fraction, right[i] || zero.fraction));
    return trimPolynomial(terms);
  }
  function polynomial(node) {
    if (!hasVariable(node)) return [polynomialCoefficient(rational(node))];
    if (node.op === 'variable') return [zero.fraction, one.fraction];
    if (node.op === '()') return polynomial(node.a);
    if (node.op === 'neg') return polynomial(node.a).map(([a, b]) => [-a, b]);
    if (!['+', '-', '*', '/', '^'].includes(node.op)) throw Error('Expected a polynomial expression');
    const left = polynomial(node.a), right = polynomial(node.b);
    if (node.op === '*') return multiplyPolynomials(left, right);
    if (node.op === '^') return polynomialPower(left, right);
    if (node.op === '/') {
      if (right.length !== 1 || right[0][0] === 0n) throw Error('Expected a nonzero constant divisor');
      return left.map(term => polynomialOperation('/', term, right[0]));
    }
    return addPolynomials(node.op, left, right);
  }
  function polynomialQuotient(node) {
    const unit = [one.fraction];
    if (!hasVariable(node) || node.op === 'variable') return [polynomial(node), unit];
    if (node.op === '()') return polynomialQuotient(node.a);
    if (!['neg', '+', '-', '*', '/', '^'].includes(node.op)) throw Error('Expected a rational function');
    const [numerator, denominator] = polynomialQuotient(node.a);
    if (node.op === 'neg') return [numerator.map(([a, b]) => [-a, b]), denominator];
    if (node.op === '^') {
      const exponent = integerValue(rational(node.b));
      if (exponent == null) throw Error('Expected an integer exponent');
      if (!exponent) {
        if (!numerator.some(([value]) => value)) throw Error('Zero to the power zero');
        return [unit, unit];
      }
      const power = [[exponent < 0n ? -exponent : exponent, 1n]];
      const raised = [polynomialPower(numerator, power), polynomialPower(denominator, power)];
      if (exponent > 0n) return raised;
      if (!numerator.some(([value]) => value)) throw Error('Division by zero');
      return raised.reverse();
    }
    const [right, divisor] = polynomialQuotient(node.b);
    if (node.op === '/') {
      if (!right.some(([value]) => value)) throw Error('Division by zero');
      return [multiplyPolynomials(numerator, divisor), multiplyPolynomials(denominator, right)];
    }
    const commonDenominator = multiplyPolynomials(denominator, divisor);
    if (node.op === '*') return [multiplyPolynomials(numerator, right), commonDenominator];
    return [addPolynomials(node.op, multiplyPolynomials(numerator, divisor),
      multiplyPolynomials(right, denominator)), commonDenominator];
  }
  function exactValues(text, format, notation) {
    if (text.length > 120) throw Error('Answer is too long');
    text = cleanExact(text, format, notation);
    if (notation === 'base-3') return [ternaryParts(text).map(exactScalar)];
    if (format === 'interval') return sortedIntervals(text);
    if (format === 'polynomial' || format === 'rational-function') {
      const nodes = math.parse(text, true, false, notation);
      if (nodes.length !== 1) throw Error('Expected one expression');
      if (format === 'rational-function') return polynomialQuotient(nodes[0]);
      return [polynomial(nodes[0]).map(fraction => evaluatedValue(fraction, 0))];
    }
    if (format === 'complex' || format === 'complex-set') {
      const nodes = math.parse(text, format === 'complex', true);
      if (format === 'complex' && nodes.length !== 1) throw Error('Expected one complex number');
      return nodes.map(complexParts);
    }
    const tuple = part => {
      const parts = tupleParts(part, notation);
      return notation === 'polar' ? polarTuple(parts) : parts.map((value, i) =>
        Array.isArray(notation) && notation[i] === 'letter' ? value : exactScalar(value));
    };
    if (format === 'tuple') return [tuple(text)];
    if (format === 'tuple-set') return splitExactList(text).map(tuple);
    if (format === 'sequence') return [splitExactList(text).map(exactScalar)];
    if (format === 'set') {
      return math.parse(text, false).map(node => [evaluated(node)]);
    }
    return [[exactScalar(text)]];
  }
  function sameExactValue(a, b) {
    if (typeof a === 'string' || typeof b === 'string') return a === b;
    if (b.fraction) return !!a.fraction && a.fraction[0] * b.fraction[1] === b.fraction[0] * a.fraction[1];
    if (!Number.isFinite(a.value) || !Number.isFinite(b.value)) return false;
    const tolerance = Math.min(1e-7, 1e-9 * Math.abs(b.value));
    return Math.abs(a.value - b.value) <= tolerance;
  }
  function matchesExact(text, expected, format, notation) {
    try {
      const actual = exactValues(text, format, notation), remaining = exactValues(expected, format, notation);
      if (format === 'rational-function') {
        const left = multiplyPolynomials(actual[0], remaining[1]);
        const right = multiplyPolynomials(remaining[0], actual[1]);
        return left.length === right.length && left.every(([a, b], i) => a * right[i][1] === b * right[i][0]);
      }
      if (actual.length !== remaining.length) return false;
      if (format === 'interval') return actual.every((part, i) => sameInterval(part, remaining[i]));
      return actual.every(tuple => {
        const i = remaining.findIndex(key => key.length === tuple.length &&
          key.every((value, j) => sameExactValue(tuple[j], value)));
        if (i < 0) return false;
        remaining.splice(i, 1);
        return true;
      });
    } catch (err) { return false; }
  }
  const normalizeTextAnswer = value => String(value).normalize('NFKC').trim()
    .replace(/\s+/g, ' ').replace(/\s*([,<])\s*/g, '$1').toLowerCase();
  function aimeValue(text) {
    if (/^\d+$/.test(text)) return text.length <= 3 ? Number(text) : null;
    if (!text || text.length > 120) return null;
    try {
      const value = integerValue(exactScalar(cleanExact(text)).fraction);
      return value != null && value >= 0n && value <= 999n ? Number(value) : null;
    } catch (err) { return null; }
  }
  function answer(set, slug, value, aime, now = Date.now()) {
    if (set.kind === 'mock') checkpoint(set,now);
    if (set.status === 'finished' || voidReason(slug)) return false;
    const text = String(value).trim();
    // A problem read in its official paper (set.selfCheck) takes any short answer; the solver
    // checks it against the official solution at review.
    const exact = exactKey(slug);
    if (set.selfCheck?.[slug]) { if (text.length > 60) return false; }
    else if (exact?.format === 'text') { if (text.length > 120) return false; }
    else if (exact) {
      if (text) {
        try { exactValues(text, exact.format, exact.notation); }
        catch (err) { if (!symbolicTex(text)) return false; }
      }
    } else if (!(text === '' || (aime ? aimeValue(text) != null : (/-columbus-state-tournament-/.test(slug) ? /^[A-F]$/ : /^[A-E]$/).test(text)))) return false;
    set.answers[slug] = text;
    return true;
  }
  function result(set, slug) {
    if (voidReason(slug)) return 'Voided';
    if (!set.answers[slug]) return 'Unanswered';
    if (set.selfCheck?.[slug]) return set.self?.[slug] || 'Check yourself';
    const exact = exactKey(slug);
    if (exact?.format === 'text') return exact.answers.some(key => normalizeTextAnswer(key) === normalizeTextAnswer(set.answers[slug])) ? 'Correct' : 'Incorrect';
    if (exact) return exact.answers.some(key => matchesExact(set.answers[slug], key, exact.format, exact.notation)) ? 'Correct' : 'Incorrect';
    // LIVE's MAA keys, else the official letters of the other multiple-choice contests (answer-keys-more.js).
    const key = root.MATH_ANSWER_KEYS?.answers?.[slug] ?? root.MATH_EXTRA_KEYS?.answers?.[slug];
    if (key == null) return 'Answer unavailable';
    const actual = String(set.answers[slug]).trim();
    const same = /^\d+$/.test(key) ? aimeValue(actual) === Number(key) : actual.toUpperCase() === key;
    return same ? 'Correct' : 'Incorrect';
  }
  // After finishing, the solver marks a self-checked answer right or wrong (or clears the mark).
  function selfMark(set, slug, verdict) {
    if (set.status !== 'finished' || voidReason(slug) || !set.selfCheck?.[slug] || !set.answers[slug]) return false;
    if (!['Correct', 'Incorrect', null].includes(verdict)) return false;
    set.self = { ...(set.self || {}) };
    if (verdict) set.self[slug] = verdict; else delete set.self[slug];
    return true;
  }
  const api = { KEY, read, save, create, createMock, checkpoint, pause, resume, finish, timeLeft, exactKey, voidReason, exactTex, answer, result, selfMark };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeSessions = api;
})(typeof window === 'undefined' ? globalThis : window);
