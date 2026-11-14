// Shared Elo-based sampling for random problems and topic practice.
(function (root) {
  'use strict';
  const levels = Object.freeze([
    { id: '', label: 'Any' },
    { id: 'very-easy', label: 'Very easy' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
    { id: 'very-hard', label: 'Very hard' }
  ].map(Object.freeze));
  function ratingFor(slug, data = root.MATH_PROBLEM_RATINGS) {
    const rating = data?.ratings?.[slug];
    return rating && Number.isFinite(rating.elo) ? rating : null;
  }
  function normalize(level) { return String(level || '').trim().toLowerCase().replace(/\s+/g, '-'); }
  // Recalculate equal-width Elo intervals from the fully filtered pool, not its ranks.
  // Integer boundaries are disjoint, cover the whole rating span and differ by at most 1 Elo.
  function ranges(pool) {
    let low = Infinity, high = -Infinity;
    for (const p of pool) if (Number.isFinite(p.elo)) {
      low = Math.min(low, p.elo); high = Math.max(high, p.elo);
    }
    if (!Number.isFinite(low)) return Array(5).fill(null);
    // A single rating has no relative difficulty spread. Keep it in Medium rather than
    // pretending that the same problems represent five different difficulty levels.
    if (low === high) return [null, null, { low, high }, null, null];
    const span = high - low + 1;
    return Array.from({ length: 5 }, (_, i) => {
      const start = Math.ceil(low + i * span / 5);
      const end = Math.ceil(low + (i + 1) * span / 5) - 1;
      return start <= end ? { low: start, high: end } : null;
    });
  }
  function range(pool, level) {
    return ranges(pool)[levels.findIndex(l => l.id === normalize(level)) - 1] || null;
  }
  function filter(pool, level) {
    const id = normalize(level);
    // Any includes every eligible entry, including a future entry without a rating.
    if (!id || id === 'any') return pool.slice();
    const band = range(pool, id);
    return band ? pool.filter(p => Number.isFinite(p.elo) && p.elo >= band.low && p.elo <= band.high) : [];
  }
  function describe(pool, level, scope = 'this selection') {
    const id = normalize(level), label = levels.find(l => l.id === id)?.label;
    const bands = ranges(pool), available = bands.filter(Boolean);
    if (!available.length) return 'No rated problems are available for this selection.';
    if (available.length === 1) {
      const rating = available[0].low;
      return `All matching problems have the same Elo rating of ${rating}. Choose Medium or Any.`;
    }
    const explanation = 'The five levels cover similar Elo intervals, recalculated for your selection.';
    if (!id || id === 'any') return explanation + ' Any includes every matching problem.';
    if (!label) return '';
    const band = range(pool, id);
    if (!band) return `${label} has no Elo interval in this selection. Choose another difficulty or Any.`;
    const empty = !pool.some(p => Number.isFinite(p.elo) && p.elo >= band.low && p.elo <= band.high);
    return `${label} in ${scope}: ${band.low}–${band.high} Elo. ${explanation}${empty ? ' No problems fall in this interval; choose another difficulty or Any.' : ''}`;
  }
  function pick(pool, level = '', random = Math.random) {
    const eligible = filter(pool, level);
    return eligible.length ? eligible[Math.floor(random() * eligible.length)] : null;
  }
  function order(pool) {
    const elo = p => Number.isFinite(p.elo) ? p.elo : Infinity;
    return pool.slice().sort((a, b) => elo(a) - elo(b) || String(a.slug).localeCompare(String(b.slug)));
  }
  const api = { levels, ratingFor, ranges, range, describe, filter, pick, order };
  if (typeof module !== 'undefined') module.exports = api;
  else root.ProblemDifficulty = api;
})(typeof window === 'undefined' ? globalThis : window);
