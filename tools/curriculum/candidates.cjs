// List archive problems that could be placed in a new-curriculum chapter, for packet planning.
//   node tools/curriculum/candidates.cjs --tree geo.circ.cyclic,geo.circ.inscribed --cards ptolemys-theorem
//        [--min 1200] [--max 2600] [--all] [--json out.json]
// A problem matches if one of its topic-tree filings starts with a --tree prefix or it cites one of the
// --cards. Problems already placed in any packet (curriculum/packets/*.md, rows and recorded twins)
// are left out, and AMC 10/12 twins are folded into one identity (problem-aliases.json). Each row shows
// the rating, the stored key, whether the statement (and a figure) is in the app, and the statement's
// opening. Without --all, problems with no statement in the app are left out.
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const arg = (k, d = "") => { const i = process.argv.indexOf("--" + k); return i > 0 ? process.argv[i + 1] : d; };
const has = k => process.argv.includes("--" + k);
global.window = global;
for (const f of ["topic-tree", "problems/problem-db", "problems/difficulty-ratings"]) require(path.join(ROOT, "js/data", f));
const walk = d => fs.readdirSync(d).flatMap(n => { const p = path.join(d, n); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
for (const p of walk(path.join(ROOT, "js/data/problems/statements"))) if (p.endsWith(".js")) try { require(p); } catch (e) {}
const P = path.join(ROOT, "js/data/problems");
const keys = {};
for (const f of ["answer-keys.js", "answer-keys-more.js"]) for (const m of fs.readFileSync(path.join(P, f), "utf8").matchAll(/^\s*"([a-z0-9-]+)": "([^"]*)"/gm)) keys[m[1]] = m[2];
const short = fs.readFileSync(path.join(P, "answer-keys-short.js"), "utf8"); const si = short.indexOf("\n  answers: {");
for (const m of short.slice(si).matchAll(/^\s*"([a-z0-9-]+)": \{(.*)\},?$/gm)) { const a = m[2].match(/"answers": \[(.*?)\]/); if (a) keys[m[1]] = a[1].replace(/"/g, ""); }
const alias = JSON.parse(fs.readFileSync(path.join(P, "problem-aliases.json"), "utf8"));
const canon = s => alias[s] || s;
const placed = new Set();
for (const f of fs.readdirSync(path.join(ROOT, "curriculum/packets"))) {
  const t = fs.readFileSync(path.join(ROOT, "curriculum/packets", f), "utf8");
  for (const m of t.matchAll(/`(\d{4}-[a-z0-9-]+)`/g)) placed.add(canon(m[1]));
}
const slug = p => p.ref.replace(/,?\s*Problem\s+/i, "-").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const trees = arg("tree").split(",").filter(Boolean), cards = new Set(arg("cards").split(",").filter(Boolean));
const lo = +arg("min", 0), hi = +arg("max", 99999), R = MATH_PROBLEM_RATINGS.ratings;
const seen = new Set(), rows = [];
for (const p of MATH_PROBLEM_DB) {
  const s = slug(p), id = canon(s);
  if (seen.has(id) || placed.has(id)) continue;
  const byTree = (p.tree || []).some(t => trees.some(x => t === x || t.startsWith(x + ".")));
  const byCard = [p.main, ...(p.formulas || [])].some(c => cards.has(c));
  if (!byTree && !byCard) continue;
  const st = MATH_STATEMENTS[s], elo = (R[s] || {}).elo || 0;
  if (elo < lo || elo >= hi || (!st && !has("all"))) continue;
  seen.add(id);
  const text = st ? String(st.s) : "";
  rows.push({ slug: s, elo, key: keys[s] ?? "", fig: /@@fig:|<svg/.test(text), tree: (p.tree || []).join(","), cards: [p.main, ...(p.formulas || [])].filter(Boolean).join(","),
    text: text.replace(/@@fig:[^@]*@@/g, "[FIG]").replace(/<svg[\s\S]*?<\/svg>/g, "[SVG]").replace(/\s+/g, " ") });
}
rows.sort((a, b) => a.elo - b.elo);
if (arg("json")) fs.writeFileSync(arg("json"), JSON.stringify(rows, null, 1));
for (const r of rows) console.log(`${r.elo} ${r.slug} [${r.key}]${r.fig ? " FIG" : ""} ${r.tree} | ${r.cards}\n   ${r.text.slice(0, +arg("chars", 300))}`);
console.log(`${rows.length} candidates (placed problems and twins excluded)`);
