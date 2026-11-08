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
  function filter(pool, level) {
    const id = normalize(level);
    // Any includes every eligible entry, including a future entry without a rating.
    if (!id || id === 'any') return pool.slice();
    const band = levels.findIndex(l => l.id === id) - 1;
    if (band < 0) return [];
    const rated = pool.filter(p => Number.isFinite(p.elo)).sort((a, b) => a.elo - b.elo);
    if (!rated.length) return [];
    // Rank quintiles differ by at most one before expanding tied boundaries.
    // For fewer than five problems, reuse a neighboring rank instead of returning an empty level.
    const first = Math.min(rated.length - 1, Math.floor(band * rated.length / 5));
    const last = Math.max(first, Math.floor((band + 1) * rated.length / 5) - 1);
    const low = rated[first].elo, high = rated[last].elo;
    // Keep ties whole: equally rated problems can appear in neighboring levels.
    return rated.filter(p => p.elo >= low && p.elo <= high);
  }
  function pick(pool, level = '', random = Math.random) {
    const eligible = filter(pool, level);
    return eligible.length ? eligible[Math.floor(random() * eligible.length)] : null;
  }
  function order(pool) {
    const elo = p => Number.isFinite(p.elo) ? p.elo : Infinity;
    return pool.slice().sort((a, b) => elo(a) - elo(b) || String(a.slug).localeCompare(String(b.slug)));
  }
  const api = { levels, ratingFor, filter, pick, order };
  if (typeof module !== 'undefined') module.exports = api;
  else root.ProblemDifficulty = api;
})(typeof window === 'undefined' ? globalThis : window);
