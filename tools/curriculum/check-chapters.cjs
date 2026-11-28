// Static checks for every written chapter of the new curriculum (AUTHORING-STANDARD §7–§11).
//   node tools/curriculum/check-chapters.cjs
// For each chapter in js/data/curriculum/shelf.js `written`:
// - its sections are exactly the specification's, and every item is used exactly once (in the text or a
//   problem set), with no reference to a missing item;
// - item kinds and fields are valid: a checkpoint or practice problem has an answer (or is a proof with a
//   solution), choices have a letter answer, an example has a problem or a contest slug and a solution;
// - every contest slug exists in the problem database and is placed in the chapter's packet;
// - every {{ref:..}} and {{fig:..}} resolves, and every figure the data file defines is used;
// - every answered item is recomputed by the chapter's verification script (tools/curriculum/verify);
// - the text avoids retired labels and positional references ("the example above").
// It prints each chapter's counts. Exit code 1 on any error.
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
global.window = global;
require(path.join(ROOT, "js/data/curriculum/shelf.js"));
require(path.join(ROOT, "js/data/problems/problem-db.js"));
const slugOf = p => p.ref.replace(/,?\s*Problem\s+/i, "-").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const DB = new Set(MATH_PROBLEM_DB.map(slugOf));
// Statements, to find unrecorded twins: another archive problem with an identical statement.
const walk = d => fs.readdirSync(d).flatMap(n => { const p = path.join(d, n); return fs.statSync(p).isDirectory() ? walk(p) : [p]; });
for (const p of walk(path.join(ROOT, "js/data/problems/statements"))) if (p.endsWith(".js")) try { require(p); } catch (e) {}
const norm = s => String(s || "").replace(/@@[^@]*@@/g, "").replace(/\s+/g, " ").trim();
const SAME = {}; for (const [k, v] of Object.entries(window.MATH_STATEMENTS || {})) (SAME[norm(v.s)] ||= []).push(k);
const ALIAS = JSON.parse(fs.readFileSync(path.join(ROOT, "js/data/problems/problem-aliases.json"), "utf8"));
const errors = [];
const KINDS = new Set(["checkpoint", "example", "practice"]);
const BANNED = [[/Guided Practice|Try it|Finish this one|Worked example/, "a retired label"],
  [/\b(example|problem|checkpoint|figure|theorem|definition)s? (above|below)\b/i, "a positional reference (cite with {{ref:id}})"],
  [/\*\*|(^|[^\w$*])\*[^*\s][^*]*\*(?!\*)/, "asterisk emphasis (use __bold__)"]];
const fileOf = (book, id) => { const [a, b] = id.split("."); return path.join(ROOT, "js/data/curriculum", book, `${a.toLowerCase()}.${b.padStart(2, "0")}`); };
const summary = [];
for (const key of MATH_CURRICULUM_SHELF.written) {
  const [bookId, chId] = key.split("/");
  const book = MATH_CURRICULUM_SHELF.books.find(b => b.id === bookId), ch = book.chapters.find(c => c.id === chId);
  const base = fileOf(bookId, chId);
  require(base + ".js");
  const data = (window.MATH_CURRICULUM || {})[key];
  const err = m => errors.push(`${chId}: ${m}`);
  if (!data) { err("no data"); continue; }
  const figs = fs.existsSync(base + "-figures.js") ? (require(base + "-figures.js"), (window.MATH_CURRICULUM_FIGURES || {})[key] || {}) : {};
  // sections
  const want = ch.sections.map(s => s.id), have = Object.keys(data.sections || {});
  if (want.join() !== have.join()) err(`sections ${have.join(",")} do not match the specification ${want.join(",")}`);
  // texts and item uses
  const texts = [["opening", data.opening && data.opening.body], ...have.map(s => [s, data.sections[s].body]), ["close", data.close && data.close.body]];
  for (const [id, it] of Object.entries(data.items || {})) for (const f of ["q", "problem", "solution"]) if (it[f]) texts.push([id + "." + f, it[f]]);
  for (const c of it_choices(data)) texts.push(c);
  const uses = {};
  const use = (id, where) => { (uses[id] ||= []).push(where); };
  for (const [where, t] of texts) for (const m of String(t || "").matchAll(/\{\{item:([\w-]+)\}\}/g)) use(m[1], where);
  for (const set of ["review", "challenge"]) for (const id of (data[set] || {}).items || []) use(id, set);
  const items = data.items || {};
  for (const id of Object.keys(uses)) if (!items[id]) err(`item ${id} is used (${uses[id].join(", ")}) but not defined`);
  for (const id of Object.keys(items)) { const u = uses[id] || []; if (u.length !== 1) err(`item ${id} is used ${u.length} times${u.length ? " (" + u.join(", ") + ")" : ""}`); }
  // references
  const statements = new Set(), labelsUsed = new Set();
  for (const [, t] of texts) for (const m of String(t || "").matchAll(/^:::(theorem|corollary|definition|lemma)\s+([\w-]+)/gm)) statements.add(m[2]);
  const figsUsed = new Set();
  for (const [where, t] of texts) {
    for (const m of String(t || "").matchAll(/\{\{ref:([\w:-]+)\}\}/g)) {
      const r = m[1];
      if (r.startsWith("fig:") ? !figs[r.slice(4)] : !(items[r] || statements.has(r))) err(`${where}: {{ref:${r}}} does not resolve`);
    }
    for (const m of String(t || "").matchAll(/\{\{fig:([\w-]+)\}\}/g)) { if (!figs[m[1]]) err(`${where}: figure ${m[1]} is not defined`); figsUsed.add(m[1]); }
    for (const [re, what] of BANNED) if (re.test(String(t || "").replace(/\$[^$]*\$/g, ""))) err(`${where}: ${what}`);
  }
  for (const f of Object.keys(figs)) if (!figsUsed.has(f)) err(`figure ${f} is defined but not used`);
  // items
  const packetPath = path.join(ROOT, "curriculum/packets", chId + ".md");
  const packet = fs.existsSync(packetPath) ? fs.readFileSync(packetPath, "utf8") : "";
  const verifyPath = path.join(ROOT, "tools/curriculum/verify", chId.toLowerCase().replace(".", "_").replace(/_(\d)$/, "_0$1") + ".py");
  const verify = fs.existsSync(verifyPath) ? fs.readFileSync(verifyPath, "utf8") : "";
  if (!verify) err(`no verification script ${path.relative(ROOT, verifyPath)}`);
  const count = {};
  for (const [id, it] of Object.entries(items)) {
    if (!KINDS.has(it.kind)) { err(`${id}: unknown kind ${it.kind}`); continue; }
    const set = (data.review?.items || []).includes(id) ? "review" : (data.challenge?.items || []).includes(id) ? "challenge" : it.kind;
    count[set] = (count[set] || 0) + 1;
    if (!it.solution) err(`${id}: no solution`);
    if (it.kind === "example") { if (!it.problem && !it.slug) err(`${id}: an example needs a problem or a contest slug`); }
    else if (it.proof) { if (it.answer) err(`${id}: a proof problem has no answer`); count.proof = (count.proof || 0) + 1; }
    else {
      if (!it.answer) err(`${id}: no answer`);
      if (it.kind === "practice" && !it.problem && !it.slug) err(`${id}: a practice problem needs a problem or a contest slug`);
      if (it.kind === "checkpoint" && !it.q) err(`${id}: a checkpoint needs a question`);
      if (it.choices && !/^[A-Z]$/.test(it.answer) ) err(`${id}: a choice answer must be a letter`);
      if (it.choices && it.answer.charCodeAt(0) - 65 >= it.choices.length) err(`${id}: the answer letter is not among the choices`);
      if (verify && !new RegExp(`V\\["${id}"\\]`).test(verify)) err(`${id}: answer ${it.answer} is not recomputed in ${path.basename(verifyPath)}`);
    }
    if (it.slug) {
      if (!DB.has(it.slug)) err(`${id}: ${it.slug} is not in the problem database`);
      if (!packet.includes("`" + it.slug + "`")) err(`${id}: ${it.slug} is not placed in packets/${chId}.md`);
      // Twins (recorded aliases, or identical statements) must be named in the packet, so none is placed twice.
      const st = (window.MATH_STATEMENTS || {})[it.slug];
      const twins = new Set([...(st ? SAME[norm(st.s)] : []), ...Object.entries(ALIAS).filter(([k, v]) => v === it.slug).map(([k]) => k), ALIAS[it.slug]].filter(x => x && x !== it.slug));
      for (const t of twins) if (!packet.includes("`" + t + "`")) err(`${id}: twin ${t} of ${it.slug} is not named in packets/${chId}.md`);
    }
  }
  summary.push(`${chId}: ${Object.keys(items).length} items — ${["example", "checkpoint", "practice", "review", "challenge"].map(k => `${count[k] || 0} ${k}`).join(", ")}${count.proof ? `; ${count.proof} proofs` : ""}; ${Object.keys(figs).length} figures`);
}
function it_choices(data) {
  const out = [];
  for (const [id, it] of Object.entries(data.items || {})) (it.choices || []).forEach((c, i) => out.push([id + ".choice" + i, c]));
  return out;
}
summary.forEach(s => console.log(s));
errors.forEach(e => console.log("ERROR:", e));
console.log(errors.length ? `${errors.length} error(s)` : `curriculum chapters: ${summary.length} checked, passed`);
process.exit(errors.length ? 1 : 0);
