// Validate js/data/problems/problem-db.js. Run from repo root with jsc:
//   jsc tools/validate-problem-db.js
// Checks: every `formulas` id is a real card; every `types` id is a real topic;
// `d` (if present) in [1,10]; `ref` is AoPS-URL parseable; no duplicate refs.
var window = {};
var SECTIONS = [];
function defineSection(s) { SECTIONS.push(s); }
window.MATH_SECTIONS = SECTIONS;
load('js/data/geometry.js'); load('js/data/algebra.js');
load('js/data/number-theory.js'); load('js/data/counting.js');
load('js/data/patterns.js');
var CARDS = {}, DESCS = {}, KIND = {};
SECTIONS.forEach(function (s) { (s.subsections || []).forEach(function (sub) { (sub.formulas || []).forEach(function (f) {
  CARDS[f.id] = 1; DESCS[f.id] = f.description || "";
  KIND[f.id] = f.type === "method" || f.type === "pattern" ? f.type : "formula";
}); }); });

// Topic ids: pull from app.js (TOPIC_RULES entries look like `id: "x", label: "y"`).
var TOPICS = {};
var appSrc = read('js/app.js');
var re = /id:\s*"([a-z0-9-]+)",\s*label:\s*"/g, m;
while ((m = re.exec(appSrc))) TOPICS[m[1]] = 1;

load('js/data/problems/problem-db.js');
var DB = window.MATH_PROBLEM_DB || [];
var refRe = /^\d{4}\s+.*?,\s*Problem\s+\d+$/;
var errors = [], seen = {}, untagged = [];
DB.forEach(function (e, i) {
  var at = "[" + i + "] " + (e.ref || "(no ref)");
  if (!e.ref || !refRe.test(e.ref)) errors.push(at + ": ref not AoPS-parseable");
  if (seen[e.ref]) errors.push(at + ": duplicate ref"); seen[e.ref] = 1;
  // A problem no card honestly fits keeps an empty list: it is reported below, never forced
  // onto a card. Only a missing list is a mistake.
  if (!e.formulas) errors.push(at + ": no formulas array");
  else if (!e.formulas.length) untagged.push(e.ref);
  (e.formulas || []).forEach(function (f) { if (!CARDS[f]) errors.push(at + ": unknown formula id '" + f + "'"); });
  // The trick route is optional, but a half-filled one is always a mistake: prose with no
  // cards leaves the idea untagged, and cards with no prose put a problem on a card page
  // with nothing explaining why it is there.
  (e.trickFormulas || []).forEach(function (f) { if (!CARDS[f]) errors.push(at + ": unknown trickFormulas id '" + f + "'"); });
  if (e.trick && !(e.trickFormulas || []).length) errors.push(at + ": trick prose with no trickFormulas");
  if ((e.trickFormulas || []).length && !e.trick) errors.push(at + ": trickFormulas with no trick prose");
  (e.trickFormulas || []).forEach(function (f) {
    if ((e.formulas || []).indexOf(f) >= 0) errors.push(at + ": '" + f + "' is in both formulas and trickFormulas");
  });
  (e.types || []).forEach(function (t) { if (!TOPICS[t]) errors.push(at + ": unknown type id '" + t + "'"); });
  // Hints are revealed one at a time before the strategy: one to three short strings.
  if (e.hints != null) {
    if (!Array.isArray(e.hints) || !e.hints.length || e.hints.length > 3) errors.push(at + ": hints must be an array of one to three strings");
    else e.hints.forEach(function (h, k) { if (typeof h !== "string" || !h.trim()) errors.push(at + ": hint " + (k + 1) + " is empty or not a string"); });
  }
  // `main` names the problem's key idea, and must be one of its own tagged cards.
  if (e.main != null) {
    if (!CARDS[e.main]) errors.push(at + ": main '" + e.main + "' is not a card");
    else if ((e.formulas || []).indexOf(e.main) < 0 && (e.trickFormulas || []).indexOf(e.main) < 0)
      errors.push(at + ": main '" + e.main + "' is not one of the problem's own tagged cards");
  }
  if (e.d != null && (typeof e.d !== "number" || e.d < 1 || e.d > 10)) errors.push(at + ": d out of range");
});
// Every [[card-id]] cross-link in a write-up must resolve, or a renamed card leaves a
// dead link that nothing else would catch.
var DETAILS = {};
["geometry", "algebra", "number-theory", "counting", "proof"].forEach(function (s) {
  try { load("js/data/details/" + s + "-details.js"); } catch (e) {}
});
DETAILS = window.MATH_DETAILS || {};
var linkErrors = [], linkCount = 0;
// Descriptions carry links too (a card is linked at its first mention on the page).
Object.keys(DETAILS).concat(Object.keys(DESCS).map(function (k) { return "desc:" + k; })).forEach(function (cid) {
  var text = cid.indexOf("desc:") === 0 ? DESCS[cid.slice(5)] : DETAILS[cid];
  var re2 = /\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g, mm;
  while ((mm = re2.exec(text))) {
    linkCount++;
    if (!CARDS[mm[1]]) linkErrors.push(cid + " -> [[" + mm[1] + "]]");
  }
});
print("card cross-links: " + linkCount + " | dangling: " + (linkErrors.length ? linkErrors.join(", ") : "none"));

// A strategy is written as a plain "..." JS string, so a LaTeX command needs its backslash
// DOUBLED in the source. Written singly, the escape is consumed before KaTeX ever sees it:
// \f becomes a formfeed, \t a tab, \b a backspace, and \c \g \p \s \m \a \l just lose the
// backslash. The damage is invisible in the source and only shows as mangled maths on the
// page, so it is checked here. Control characters are the tell.
var latexErrors = [];
DB.forEach(function (e) {
  [["strategy", e.strategy], ["trick", e.trick]].concat((e.hints || []).map(function (h, k) { return ["hint " + (k + 1), h]; })).forEach(function (pair) {
  var field = pair[0], text = pair[1];
  if (!text) return;
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text)) {
    latexErrors.push(e.ref + ": control character in " + field + " (un-escaped LaTeX backslash)");
  }
  // a lone "$...$" span that contains a letter-run with no backslash where one is expected
  var m = text.match(/\$[^$]*\$/g) || [];
  m.forEach(function (span) {
    if (/(?:^|[^\\a-zA-Z])(?:frac|sqrt|cdot|pmod|bmod|equiv|angle|triangle|varphi|mathrm|mathbb|tfrac|circ|times|prod|sum|leq|geq)(?![a-zA-Z])/.test(span)) {
      latexErrors.push(e.ref + ": LaTeX command missing its backslash in " + span.slice(0, 40));
    }
    // A raw "<" followed by a letter is parsed as the START OF AN HTML TAG, because the
    // strategy is inserted as HTML before KaTeX runs. The browser then silently swallows
    // everything up to the next ">", so the sentence renders cut off halfway and the
    // source looks perfectly fine. "\sum_{i<j}" is the case that got through. House
    // convention is \lt / \gt inside maths -- enforced here, not left to review.
    if (/<[A-Za-z/]/.test(span)) {
      latexErrors.push(e.ref + ": raw '<' inside maths is read as an HTML tag and eats the "
        + "rest of the line -- use \\lt: " + span.slice(0, 44));
    }
  });
  });
});
if (latexErrors.length) { errors = errors.concat(latexErrors); }

var withTrick = DB.filter(function (e) { return e.trick; }).length;
// How complete the Pattern -> Method -> Formula chain is. Reported, never an error: an
// incomplete chain is shown honestly on the page rather than filled with a forced guess.
var chain = { pattern: 0, method: 0, formula: 0, all: 0 }, withHints = 0, withMain = 0, wantMain = 0;
DB.forEach(function (e) {
  var has = {};
  (e.formulas || []).forEach(function (f) { if (KIND[f]) has[KIND[f]] = 1; });
  ["pattern", "method", "formula"].forEach(function (k) { if (has[k]) chain[k]++; });
  if (has.pattern && has.method && has.formula) chain.all++;
  if (e.hints && e.hints.length) withHints++;
  if (e.main) withMain++;
  else if ((e.formulas || []).length + (e.trickFormulas || []).length >= 4) wantMain++;
});
print("chain: pattern " + chain.pattern + " | method " + chain.method + " | formula " + chain.formula + " | complete " + chain.all +
  " of " + DB.length + " | hints " + withHints + " | main " + withMain + " (warning: " + wantMain + " problems with 4+ cards and no main)");
print("unclassified (flagged for review, never invented): no pattern " + (DB.length - chain.pattern) +
  " | no method " + (DB.length - chain.method) + " | no formula " + (DB.length - chain.formula) +
  " | no card at all " + untagged.length + (untagged.length ? " (" + untagged.join("; ") + ")" : ""));
print("problems: " + DB.length + " | cards: " + Object.keys(CARDS).length + " | topics: " + Object.keys(TOPICS).length + " | tricks: " + withTrick);
if (errors.length) { print("VIOLATIONS (" + errors.length + "):"); errors.slice(0, 50).forEach(print); }
else print("OK — 0 violations");
