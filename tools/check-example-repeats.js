// Prints, one JSON line each, every legacy practice question (MATH_PROBLEMS, from
// js/data/problems/geometry-problems.js and extra-problems.js) that repeats the card's own
// worked example (MATH_EXAMPLES). The card page lists both, so a repeat showed as
// "Example 1" and "Example 2" of the same problem. Run by scan-conventions.py, which keeps
// an allowlist of pairs read and kept on purpose because they exercise a different aspect.
//
// Similarity: Jaccard overlap of the question words (maths commands dropped) of at least
// 0.45, or the same multiset of numbers with an overlap of at least 0.25.
var window = {}; var document = {};
load("js/data/examples-supplement.js");
load("js/data/problems/geometry-problems.js");
load("js/data/problems/extra-problems.js");
var E = window.MATH_EXAMPLES || {}, P = window.MATH_PROBLEMS || {};
function toks(t) {
  return String(t).toLowerCase().replace(/\\[a-z]+/g, " ").replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/).filter(function (w) { return w.length > 2 || /\d/.test(w); });
}
function nums(t) { return (String(t).match(/\d+(\.\d+)?/g) || []).sort().join(","); }
Object.keys(P).forEach(function (id) {
  var ex = E[id]; if (!ex) return;
  var exs = Array.isArray(ex) ? ex : [ex];
  P[id].forEach(function (p) {
    exs.forEach(function (e) {
      var A = {}, B = {}, inter = 0, uni = 0, w;
      toks(p.q).forEach(function (x) { A[x] = 1; });
      toks(e.q).forEach(function (x) { B[x] = 1; });
      for (w in A) { uni++; if (B[w]) inter++; }
      for (w in B) if (!A[w]) uni++;
      var j = inter / Math.max(1, uni);
      if (j >= 0.45 || (nums(p.q) && nums(p.q) === nums(e.q) && j >= 0.25))
        print(JSON.stringify({ id: id, j: Math.round(j * 100) / 100, q: p.q.slice(0, 80) }));
    });
  });
});
