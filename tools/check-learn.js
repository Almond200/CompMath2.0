// The gate for the Learn chapter files (CONVENTIONS §14), run by tools/build-learn-shelf.py --check.
// Checks that every written lesson is on the shelf; that every card id is a card; that every [[link]]
// in a lesson's prose is one of its cards or the cards it assumes; that no card is taught in two
// lessons; that every problem ref is in the database and placed once on the whole shelf (an AMC 10/12
// twin pair counts as one problem); that every check's answer parses in the keyboard grammar; and that
// every {{check N}} names a check that exists, at most once.
// usage: node tools/check-learn.js
global.window = global;
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.join(__dirname, '..'), R = path.join(ROOT, 'js/data/');
const run = f => vm.runInThisContext(fs.readFileSync(f, 'utf8'), { filename: f });
for (const f of ['algebra', 'geometry', 'number-theory', 'counting', 'patterns', 'new-cards']) run(R + f + '.js');
run(R + 'problems/problem-db.js');
run(R + 'learn/shelf.js');
const Answer = require(path.join(ROOT, 'js/learn-answer.js'));
const cards = new Set();
for (const s of window.MATH_SECTIONS) for (const ss of s.subsections) for (const c of (ss.formulas || ss.items || [])) cards.add(c.id);
const refs = new Set(window.MATH_PROBLEM_DB.map(p => p.ref));

// Every chapter file under js/data/learn/<book>/, and the book each one belongs to.
const fileOf = {};
for (const b of fs.readdirSync(R + 'learn')) {
  const dir = R + 'learn/' + b;
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) { run(dir + '/' + f); fileOf[f.replace(/\.js$/, '').toUpperCase()] = b + '/' + f; }
}
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const errs = [];
const shelfChapter = {};
for (const b of window.MATH_LEARN_SHELF) for (const c of b.chapters) shelfChapter[c.code] = { b, c };
const learn = window.MATH_LEARN || {};
for (const code of Object.keys(fileOf)) if (!learn[code]) errs.push(`${fileOf[code]} does not fill MATH_LEARN["${code}"]`);

const taught = new Map(), placed = new Map();
const place = (ref, where) => {
  if (!refs.has(ref)) { errs.push(`${where}: ${ref} is not in the problem database`); return; }
  if (placed.has(ref)) errs.push(`${ref} is placed twice (${placed.get(ref)} and ${where})`);
  else placed.set(ref, where);
};
for (const [code, ch] of Object.entries(learn)) {
  const home = shelfChapter[code];
  if (!home) { errs.push(`chapter ${code} is not on the shelf`); continue; }
  const file = `${home.b.id}/${code.toLowerCase()}.js`;
  if (fileOf[code] !== file) errs.push(`chapter ${code} should be js/data/learn/${file}`);
  if (!index.includes(`js/data/learn/${file}?v=`)) errs.push(`index.html does not load js/data/learn/${file}`);
  for (const [lc, l] of Object.entries(ch.lessons || {})) {
    const at = `${lc}`;
    if (!home.c.lessons.some(x => x.code === lc)) errs.push(`${at} is not a lesson of ${code} on the shelf`);
    for (const k of ['prereq', 'cards']) for (const id of l[k] || []) if (!cards.has(id)) errs.push(`${at}: ${k} ${id} is not a card`);
    for (const id of l.cards || []) {
      if (taught.has(id)) errs.push(`${id} is taught in both ${taught.get(id)} and ${at}`);
      else taught.set(id, at);
    }
    const known = new Set([...(l.cards || []), ...(l.prereq || [])]);
    const body = String(l.body || '');
    if (!body.trim()) errs.push(`${at} has no prose`);
    for (const m of body.matchAll(/\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g)) {
      if (!cards.has(m[1])) errs.push(`${at}: [[${m[1]}]] is not a card`);
      else if (!known.has(m[1])) errs.push(`${at}: [[${m[1]}]] is linked but is not among the lesson's cards or prereq`);
    }
    if (/\*\*/.test(body)) errs.push(`${at}: bold (**) never renders`);
    const checks = l.checks || [], used = new Set();
    for (const m of body.matchAll(/^\s*\{\{check (\d+)\}\}\s*$/gm)) {
      const n = +m[1];
      if (!checks[n - 1]) errs.push(`${at}: {{check ${n}}} names no check`);
      if (used.has(n)) errs.push(`${at}: {{check ${n}}} is placed twice`);
      used.add(n);
    }
    if (/\{\{check(?! \d+\}\})/.test(body)) errs.push(`${at}: a {{check}} marker is malformed`);
    checks.forEach((c, i) => {
      if (!c.q || !c.why) errs.push(`${at} check ${i + 1}: needs a question and a why`);
      try { Answer.values(c.answer).forEach(v => { if (!isFinite(v)) throw new Error('not a finite value'); }); }
      catch (e) { errs.push(`${at} check ${i + 1}: the answer "${c.answer}" does not parse (${e.message})`); }
    });
    for (const ref of l.problems || []) place(ref, at);
  }
  for (const ref of ch.review || []) place(ref, `${code} review`);
}

// AMC 10/12 twins: the same problem printed on both papers counts once on the shelf.
const amc = [...placed.keys()].map(r => ({ r, m: r.match(/^(\d{4}(?: Fall| Spring)?) AMC (10|12)([AB]?), Problem (\d+)$/) })).filter(x => x.m);
const stmts = {};
for (const y of new Set(amc.map(x => x.m[1].slice(0, 4)))) {
  const f = R + 'problems/statements/' + y + '.js';
  if (fs.existsSync(f)) run(f);
}
const S = window.MATH_STATEMENTS || {};
const slug = r => r.toLowerCase().replace(/,? problem /, '-').replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
const norm = r => { const s = S[slug(r)]; return s ? (typeof s === 'string' ? s : s.s).replace(/\\[a-z]+/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase() : null; };
for (const a of amc) for (const b of amc) {
  if (a.m[2] !== '10' || b.m[2] !== '12' || a.m[1] !== b.m[1] || a.m[3] !== b.m[3]) continue;
  const x = norm(a.r), y = norm(b.r);
  if (x && x === y) errs.push(`${a.r} (${placed.get(a.r)}) and its twin ${b.r} (${placed.get(b.r)}) are both placed`);
}

if (errs.length) { errs.forEach(e => console.log('FAIL - ' + e)); process.exit(1); }
const lessons = Object.values(learn).reduce((n, c) => n + Object.keys(c.lessons || {}).length, 0);
console.log(`OK - Learn: ${Object.keys(learn).length} chapter file(s), ${lessons} written lesson(s), ${placed.size} problems placed once`);
