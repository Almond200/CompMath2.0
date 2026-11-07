// Gate for the topic tree (Step T): the tree data, the card homes, and the problems' `tree` fields.
//   node tools/check-topic-tree.js
// The tree (js/data/topic-tree.js) must be a tree: unique ids, each extending its parent's, every
// parent present. Every card must be in topic-homes.js, with a home that is a real node; formulas and
// patterns must have one, a method may be null (general-purpose). A problem's `tree` (filled in by the
// tagging pass) must list one to three real nodes, none of them an ancestor of another, and the AMC 10
// and 12 twins of a problem (same year, same strategy) must agree. A problem without `tree` is not yet
// tagged and is only counted.
global.window = global;
const path = require("path"), ROOT = path.join(__dirname, "..");
for (const f of ["algebra", "counting", "geometry", "number-theory", "patterns", "new-cards"]) require(path.join(ROOT, "js/data", f + ".js"));
require(path.join(ROOT, "js/data/topic-tree.js"));
require(path.join(ROOT, "js/data/topic-homes.js"));
require(path.join(ROOT, "js/data/problems/problem-db.js"));
const bad = [];
const NODE = {};
for (const [id, name, parent] of window.MATH_TOPIC_TREE) {
  if (NODE[id]) bad.push(`node ${id}: listed twice`);
  if (!name) bad.push(`node ${id}: no name`);
  if (parent === null ? id.includes(".") : !(NODE[parent] && id.slice(0, id.lastIndexOf(".")) === parent)) bad.push(`node ${id}: parent ${parent} is missing or not its prefix`);
  NODE[id] = { name, parent };
}
const ancestors = id => { const out = []; for (let p = NODE[id] && NODE[id].parent; p; p = NODE[p].parent) out.push(p); return out; };
const KIND = {};
for (const s of window.MATH_SECTIONS) for (const ss of s.subsections || []) for (const f of ss.formulas || [])
  KIND[f.id] = s.id === "tools-methods" ? "method" : s.id === "tools-patterns" ? "pattern" : "formula";
const HOMES = window.MATH_TOPIC_HOMES;
for (const id of Object.keys(KIND)) {
  if (!(id in HOMES)) { bad.push(`card ${id}: no entry in topic-homes.js`); continue; }
  const h = HOMES[id];
  if (h === null) { if (KIND[id] !== "method") bad.push(`card ${id}: a ${KIND[id]} needs a home node`); }
  else if (!NODE[h]) bad.push(`card ${id}: home ${h} is not a node`);
}
for (const id of Object.keys(HOMES)) if (!KIND[id]) bad.push(`topic-homes.js: ${id} is not a card`);
let tagged = 0;
const twins = {};
for (const p of window.MATH_PROBLEM_DB) {
  if (p.tree === undefined) continue;
  tagged++;
  const t = p.tree;
  if (!Array.isArray(t) || t.length < 1 || t.length > 3) { bad.push(`${p.ref}: tree must list one to three nodes`); continue; }
  t.forEach(n => { if (!NODE[n]) bad.push(`${p.ref}: tree node ${n} does not exist`); });
  if (new Set(t).size !== t.length) bad.push(`${p.ref}: a tree node is listed twice`);
  t.forEach(n => ancestors(n).forEach(a => { if (t.includes(a)) bad.push(`${p.ref}: ${a} is an ancestor of ${n}; list only the more specific node`); }));
  const m = p.ref.match(/^(\d{4}(?: Fall| Spring)?) AMC 1[02][AB]?,/);
  if (m && p.strategy) {
    const key = m[1] + "|" + p.strategy, prev = twins[key];
    if (prev && prev.tree.slice().sort().join() !== t.slice().sort().join()) bad.push(`${p.ref}: tree differs from its twin ${prev.ref}`);
    else twins[key] = p;
  }
}
const homed = Object.values(HOMES).filter(h => h).length;
console.log(`topic tree: ${Object.keys(NODE).length} nodes | cards with a home: ${homed} of ${Object.keys(KIND).length} | problems tagged: ${tagged} of ${window.MATH_PROBLEM_DB.length}`);
bad.slice(0, 30).forEach(b => console.log("  " + b));
console.log(bad.length ? `FAIL - ${bad.length} topic-tree problem(s)` : "OK - the topic tree, card homes and problem tree tags are consistent");
process.exit(bad.length ? 1 : 0);
