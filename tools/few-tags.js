// The tag pass (owner, 2026-10-25): problems that cite fewer than MIN cards, newest paper first,
// with their tags, strategy and LIVE's concept hint, for reading in batches. A card is added
// (tools/add-tag.js) only where the written route uses it; a concept several problems need and
// no card holds goes into QUESTIONS.md as a candidate.
// usage: node tools/few-tags.js "<contest>" [from] [count] [--min 2] [--skip "<contest>"] [--count]
//   <contest> is matched against the ref ("AMC 10", "AIME", "AMC 8", "AJHSME"); --count prints only totals;
//   --skip "AMC 10" hides twins already read there (same strategy text).
global.window = global;
const fs = require('fs'), vm = require('vm'), path = require('path');
vm.runInThisContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'data', 'problems', 'problem-db.js'), 'utf8'));
const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
const MIN = +(opt('--min') || 2), skip = opt('--skip'), countOnly = args.includes('--count');
const [contest = 'AMC 10', from = '0', count = '40'] = args.filter(a => a !== '--count');

// LIVE concepts by ref (the same file-to-ref mapping as tools/live-gaps.js).
const live = {};
const LC = path.join(__dirname, 'live-cache');
for (const f of fs.readdirSync(LC)) {
  const m = f.match(/^(amc8|amc10|amc12|aime)-(\d{4})([A-Z]|I{1,2})?\.json$/);
  if (!m) continue;
  const [, c, year, suf = ''] = m;
  for (const q of JSON.parse(fs.readFileSync(path.join(LC, f), 'utf8'))) {
    let ref;
    if (c === 'amc8') ref = year + (+year < 1999 ? ' AJHSME' : ' AMC 8');
    else if (c === 'aime') ref = year + ' AIME' + (suf ? ' ' + suf : '');
    else {
      const k = c === 'amc10' ? 'AMC 10' : 'AMC 12';
      if (year === '2021' && 'CD'.includes(suf) && suf) ref = '2021 Fall ' + k + (suf === 'C' ? 'A' : 'B');
      else ref = year + (year === '2021' && suf ? ' Spring' : '') + ' ' + k + (suf.length === 1 && 'AB'.includes(suf) ? suf : '');
    }
    live[ref + ', Problem ' + q.n] = q.concepts || '';
  }
}
const key = r => { const m = r.match(/^(\d+)(?: (Spring|Fall))? (.*?), Problem (\d+)$/); return m ? [+m[1], m[2] === 'Fall' ? 1 : 0, m[3], +m[4]] : [0, 0, r, 0]; };
const tagsOf = p => [...new Set([...(p.formulas || []), ...(p.trickFormulas || [])])];
const seen = new Set(skip ? window.MATH_PROBLEM_DB.filter(p => p.ref.includes(skip) && p.strategy).map(p => p.strategy) : []);
const list = window.MATH_PROBLEM_DB.filter(p => p.ref.includes(contest) && tagsOf(p).length < MIN && !seen.has(p.strategy))
  .sort((a, b) => { const x = key(a.ref), y = key(b.ref); return y[0] - x[0] || y[1] - x[1] || (x[2] < y[2] ? -1 : x[2] > y[2] ? 1 : 0) || x[3] - y[3]; });
if (countOnly) { console.log(list.length + ' ' + contest + ' problems cite fewer than ' + MIN + ' cards'); process.exit(0); }
for (const p of list.slice(+from, +from + +count)) {
  console.log('### ' + p.ref + ' | ' + (tagsOf(p).join(', ') || '(none)') + ' | LIVE: ' + (live[p.ref] || '-'));
  console.log((p.strategy || '').replace(/\s+/g, ' ') + (p.trick ? ' || ' + p.trick.replace(/\s+/g, ' ') : ''));
}
console.error(list.length + ' ' + contest + ' problems cite fewer than ' + MIN + ' cards; showed ' + from + ' to ' + Math.min(list.length, +from + +count));
