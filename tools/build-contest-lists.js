// The "By Contest" study lists: for each contest, every card that at least MIN of its problems
// use, by subject, most used first. Built from the problem tags (formulas and trickFormulas),
// so rerun it after a tagging batch: the block it writes at the end of built-in-lists.js is
// replaced whole, and check-lists.py then checks the stated counts.
// usage: node tools/build-contest-lists.js [--check]   (--check exits 1 if the block is stale)
global.window = global;
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = path.join(__dirname, '..', 'js', 'data');
for (const f of fs.readdirSync(R).filter(f => f.endsWith('.js') && f !== 'built-in-lists.js'))
  try { vm.runInThisContext(fs.readFileSync(path.join(R, f), 'utf8')); } catch (e) {}
vm.runInThisContext(fs.readFileSync(path.join(R, 'problems', 'problem-db.js'), 'utf8'));

const MIN = 5;
const CONTESTS = [
  { id: 'contest-amc8', fam: 'AMC 8', name: 'What the AMC 8 Uses', who: 'AMC 8 and AJHSME' },
  { id: 'contest-amc10', fam: 'AMC 10', name: 'What the AMC 10 Uses', who: 'AMC 10' },
  { id: 'contest-amc12', fam: 'AMC 12', name: 'What the AMC 12 Uses', who: 'AMC 12' },
  { id: 'contest-aime', fam: 'AIME', name: 'What the AIME Uses', who: 'AIME' },
];
// Same families as parseRef() in js/app.js.
function famOf(ref) {
  const core = ref.replace(/^\d{4}\s+/, '').replace(/,.*$/, '').replace(/^(Fall|Spring)\s+/i, '');
  if (/AIME/i.test(core)) return 'AIME';
  if (/AJHSME/i.test(core)) return 'AMC 8';
  const m = core.match(/AMC\s*(8|10|12)/i);
  return m ? 'AMC ' + m[1] : null;
}
// A card's subject: its section for a formula, its own subject field for a method or pattern.
const SUBJECTS = [['geometry', 'Geometry'], ['algebra', 'Algebra'], ['number-theory', 'Number Theory'],
                  ['counting', 'Counting & Probability'], ['proof', 'Problem Solving']];
const subjOf = {}, nameOf = {};
for (const s of window.MATH_SECTIONS)
  for (const ss of s.subsections)
    for (const f of ss.formulas) { subjOf[f.id] = s.group === 'formulas' ? s.id : f.subject; nameOf[f.id] = f.name; }

const uses = {}, total = {};
for (const p of window.MATH_PROBLEM_DB) {
  const fam = famOf(p.ref);
  if (!fam) continue;
  total[fam] = (total[fam] || 0) + 1;
  const u = uses[fam] = uses[fam] || {};
  for (const id of new Set([...(p.formulas || []), ...(p.trickFormulas || [])]))
    if (subjOf[id]) u[id] = (u[id] || 0) + 1;
}

const q = s => JSON.stringify(s);
let out = '  // ---- By contest: written by tools/build-contest-lists.js from the problem tags; do not edit by hand ----\n';
for (const c of CONTESTS) {
  const u = uses[c.fam] || {};
  const ids = Object.keys(u).filter(id => u[id] >= MIN)
    .sort((a, b) => u[b] - u[a] || nameOf[a].localeCompare(nameOf[b]));
  const secs = SUBJECTS.map(([k, title]) => ({ title, ids: ids.filter(id => subjOf[id] === k) })).filter(s => s.ids.length);
  out += `  { id: ${q(c.id)}, name: ${q(c.name)}, kind: "contest", subject: "Contests",\n`;
  out += `    blurb: ${q(`Every card that at least ${MIN} of the ${total[c.fam].toLocaleString('en-US')} ${c.who} problems here use in their strategies, by subject, most used first: ${ids.length} cards across ${secs.length} sections.`)},\n`;
  out += '    sections: [\n';
  for (const s of secs) {
    const hi = u[s.ids[0]], lo = u[s.ids[s.ids.length - 1]];
    const note = hi === lo ? `Each used in ${hi} problems.` : `Used in ${hi} problems down to ${lo}.`;
    out += `      { title: ${q(s.title)},\n        note: ${q(note)},\n        ids: [${s.ids.map(q).join(', ')}] },\n`;
  }
  out += '    ] },\n';
}

const file = path.join(R, 'built-in-lists.js');
const src = fs.readFileSync(file, 'utf8');
const mark = src.indexOf('  // ---- By contest:');
const end = src.lastIndexOf('];');
const next = (mark >= 0 ? src.slice(0, mark) : src.slice(0, end)) + out + src.slice(end);
if (process.argv.includes('--check')) {
  if (next !== src) { console.log('FAIL - the By Contest lists are stale: run node tools/build-contest-lists.js'); process.exit(1); }
  console.log('OK - the By Contest lists match the problem tags');
} else {
  fs.writeFileSync(file, next);
  for (const c of CONTESTS) console.log(c.name, Object.values(uses[c.fam]).filter(n => n >= MIN).length, 'cards');
}
