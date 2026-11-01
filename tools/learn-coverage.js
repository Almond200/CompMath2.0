// Coverage of LEARN-OUTLINE.md (PLAN step L2): checks that every card id in the outline exists, that no
// card is taught in two lessons (a "prereq" or "link" mention does not count), and how many AIME, AMC 12
// and AMC 10 problems have every cited card placed somewhere on the shelf. Lists the unplaced cards that
// AIME and AMC 12 problems cite, most cited first. A planning tool; the app does not use it.
// usage: node tools/learn-coverage.js [--all]   (--all also lists cards no problem cites)
global.window = global;
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.join(__dirname, '..'), R = path.join(ROOT, 'js/data/');
for (const f of ['algebra', 'geometry', 'number-theory', 'counting', 'patterns']) vm.runInThisContext(fs.readFileSync(R + f + '.js', 'utf8'));
vm.runInThisContext(fs.readFileSync(R + 'problems/problem-db.js', 'utf8'));
const cards = new Map();
for (const s of window.MATH_SECTIONS) for (const ss of s.subsections) for (const c of (ss.formulas || ss.items || [])) cards.set(c.id, c);
const txt = fs.readFileSync(path.join(ROOT, 'LEARN-OUTLINE.md'), 'utf8');
const placed = new Set(), taught = new Map(), bad = new Set();
for (const m of txt.matchAll(/`([a-z0-9-]+)`/g)) if (cards.has(m[1])) placed.add(m[1]);
for (const row of txt.split('\n').filter(l => /^\| [BANGCLMRSPEDKO]\d{1,2}\.\d{1,2} [^|]/.test(l))) {
  const lesson = row.split('|')[1].trim().split(' ')[0];
  for (const m of (/^\s*(Core II|Core|Extension)?\s*$/.test(row.split('|')[2]) ? row.split('|')[3] : row.split('|')[2]).matchAll(/(prereq (?:\*\(pattern\)\* )?)?`([a-z0-9-]+)`( link)?/g)) {
    if (!cards.has(m[2])) { bad.add(m[2]); continue; }
    if (m[1] || m[3]) continue;
    if (taught.has(m[2])) console.log(`taught twice: ${m[2]} (${taught.get(m[2])}, ${lesson})`);
    else taught.set(m[2], lesson);
  }
}
if (bad.size) console.log('unknown ids: ' + [...bad].join(', '));
console.log(`cards placed: ${placed.size} of ${cards.size}; taught in a lesson: ${taught.size}`);
const miss = new Map();
for (const [g, re] of [['AIME', /AIME/], ['AMC 12', /AMC 12/], ['AMC 10', /AMC 10/]]) {
  let n = 0, ok = 0;
  for (const p of window.MATH_PROBLEM_DB) {
    if (!re.test(p.ref) || !(p.formulas || []).length) continue;
    n++;
    const m = p.formulas.filter(c => !placed.has(c));
    if (!m.length) ok++;
    else if (g !== 'AMC 10') for (const c of m) miss.set(c, (miss.get(c) || 0) + 1);
  }
  console.log(`${g}: ${ok} of ${n} problems citing a card have every card placed`);
}
console.log('unplaced cards cited by AIME and AMC 12 problems:');
for (const [c, k] of [...miss].sort((a, b) => b[1] - a[1])) console.log(`  ${k}  ${c}  (${cards.get(c).tier}, ${cards.get(c).importance})`);
if (process.argv.includes('--all')) console.log('never placed: ' + [...cards.keys()].filter(c => !placed.has(c) && !miss.has(c)).join(' '));
