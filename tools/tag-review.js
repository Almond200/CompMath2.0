// T3 helper: print a paper's problems for the tagging pass (PLAN.md, "The tagging pass (T3)").
//   node tools/tag-review.js "2026 AMC 10A" [first] [last]
// Shows each problem's statement, strategy, card tags and their home nodes (proposals only:
// read the problem before filing it), and its current `tree`.
const path = require("path"), fs = require("fs");
const ROOT = path.join(__dirname, "..");
global.window = global;
const load = f => { eval(fs.readFileSync(path.join(ROOT, f), "utf8")); };
load("js/data/topic-tree.js"); load("js/data/topic-homes.js"); load("js/data/problems/problem-db.js");
const year = (process.argv[2] || "").split(" ")[0];
const sf = `js/data/problems/statements/${year}.js`;
if (fs.existsSync(path.join(ROOT, sf))) load(sf);
const TREE = window.MATH_TOPIC_TREE || [], HOMES = window.MATH_TOPIC_HOMES || {};
const NAME = {}; TREE.forEach(([id, n]) => NAME[id] = n);
const ST = window.MATH_STATEMENTS || {};
const paper = process.argv[2], lo = +(process.argv[3] || 1), hi = +(process.argv[4] || 99);
const slug = ref => ref.replace(/, Problem /, " ").toLowerCase().replace(/ /g, "-");
window.MATH_PROBLEM_DB.filter(p => p.ref.startsWith(paper + ", Problem ")).forEach(p => {
  const n = +p.ref.split("Problem ")[1]; if (n < lo || n > hi) return;
  const e = ST[slug(p.ref)], st = e && (e.s || e);
  console.log(`\n=== ${p.ref}`);
  console.log("STATEMENT:", st ? st : "(none)");
  console.log("STRATEGY:", p.strategy);
  const show = ids => ids.map(c => `${c} -> ${HOMES[c] === undefined ? "?" : HOMES[c]}`).join("; ");
  console.log("CARDS:", show(p.formulas || []));
  if (p.trick) { console.log("TRICK:", p.trick); console.log("TRICK CARDS:", show(p.trickFormulas || [])); }
  if (p.tree) console.log("TREE:", p.tree.map(t => `${t} (${NAME[t] || "MISSING"})`).join("; "));
});
