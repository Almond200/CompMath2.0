// Topic-tree audit for the tagging pass (PLAN.md, "The tagging pass (T3)"; an outside review, 2026-11-07).
//   node tools/tree-audit.js            all filed problems
//   node tools/tree-audit.js "2024 AMC 10A"   one paper (any ref prefix); add --thin to list section 2
// Prints review prompts, never errors:
//   1. problems filed on a node that has subtopics (a broad parent): a missing subtype, or a fine filing;
//   2. nodes with few filed problems (under the archetype rule's five), once enough problems are filed;
//   3. problems whose cards have a home node that no filed node covers (neither the node nor an ancestor
//      or descendant of it): a topic the route relies on that the filing may have left out.
// Each prompt is read against the problem's statement and strategy before anything changes.
const path = require("path"), fs = require("fs");
const ROOT = path.join(__dirname, "..");
global.window = global;
const load = f => { eval(fs.readFileSync(path.join(ROOT, f), "utf8")); };
load("js/data/topic-tree.js"); load("js/data/topic-homes.js"); load("js/data/problems/problem-db.js");
const TREE = window.MATH_TOPIC_TREE, HOMES = window.MATH_TOPIC_HOMES;
const NAME = {}, KIDS = {};
TREE.forEach(([id, name, parent]) => { NAME[id] = name; if (parent) (KIDS[parent] = KIDS[parent] || []).push(id); });
const args = process.argv.slice(2), showThin = args.includes("--thin"), prefix = args.find(a => a !== "--thin") || "";
const filed = window.MATH_PROBLEM_DB.filter(p => p.tree && p.ref.startsWith(prefix));
const related = (a, b) => a === b || a.startsWith(b + ".") || b.startsWith(a + ".");

console.log(`Filed problems${prefix ? ` in "${prefix}"` : ""}: ${filed.length}\n`);

console.log("1. Filed on a broad parent (a node with subtopics):");
let n1 = 0;
filed.forEach(p => p.tree.filter(t => KIDS[t]).forEach(t => { n1++; console.log(`   ${p.ref}: ${t} (${NAME[t]})`); }));
if (!n1) console.log("   none");

const count = {};
window.MATH_PROBLEM_DB.filter(p => p.tree).forEach(p => p.tree.forEach(t => { count[t] = (count[t] || 0) + 1; }));
console.log("\n2. Nodes with one or two filed problems (all papers; meaningful once many papers are filed):");
const thin = Object.entries(count).filter(([, k]) => k <= 2).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
console.log(!thin.length ? "   none" : showThin ? "   " + thin.map(([t, k]) => `${t} ${k}`).join(", ") : `   ${thin.length} nodes (list them with --thin)`);

console.log("\n3. Card homes not covered by the filing (a topic the route may rely on):");
let n3 = 0;
filed.forEach(p => {
  const homes = [...new Set([...(p.formulas || [])].map(c => HOMES[c]).filter(Boolean))];
  const missing = homes.filter(h => !p.tree.some(t => related(t, h)));
  if (missing.length) { n3++; console.log(`   ${p.ref}: ${missing.map(h => `${h} (${NAME[h]})`).join("; ")}`); }
});
if (!n3) console.log("   none");
console.log("\nThese are prompts to read, not errors: most uncovered homes are tools the route uses in passing.");
console.log("Section 3 only sees topics that a cited card points to: a central idea with no card (symmetry in a count done by casework) is caught by reading.");
