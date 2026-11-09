// Rebuild each book's back matter from its substantive lesson references.
// Chapter codes in the outline remain stable; no problem tags or topic-tree data are read.
const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({window: {}});
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), context);
for (const f of ['geometry', 'algebra', 'number-theory', 'counting', 'patterns']) run(`js/data/${f}.js`);
run('js/data/learn/shelf.js');
const cards = new Map(context.window.MATH_SECTIONS.flatMap(s => s.subsections.flatMap(s => s.formulas || [])).map(f => [f.id, f]));
// Precise glossary statements where a card's introductory description omits a domain detail.
const glossaryDefinitions = {
 'inverse-trig-identities': String.raw`Inverse trigonometric functions select one angle from a specified interval. For inputs in $[-1,1]$, $\arcsin$ returns an angle in $[-\pi/2,\pi/2]$ and $\arccos$ returns one in $[0,\pi]$. For every real input, $\arctan$ returns an angle in the open interval $(-\pi/2,\pi/2)$. Thus $\arcsin u+\arccos u=\pi/2$ for $u\in[-1,1]$. An inverse-tangent sum must be placed in its actual angle range after applying the tangent addition formula; if its denominator vanishes, determine the angle directly instead of dividing by zero.`
};
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const plainLinks = s => String(s).replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, label) => label || cards.get(id)?.name || id);
const basics = [
 ['Variable', 'A letter representing a number that may be unknown or may vary.'],
 ['Expression', 'Numbers and variables combined by operations; unlike an equation, an expression does not assert an equality.'],
 ['Equation', 'A statement that two expressions have the same value. A solution makes that statement true.'],
 ['Exponent', 'The number in a power that records repeated multiplication for positive integer powers, extended consistently to zero, negative and fractional powers where defined.'],
 ['Coefficient', 'The factor multiplying a specified power of a variable in a polynomial.'],
 ['Domain', 'The set of inputs for which a function or expression is defined.'],
 // A root of an equation is a different idea from a square, cube or nth root of a number (found by
 // Codex, owner 2026-11-07), so those phrases, and primitive roots modulo n, never count toward Root.
 ['Root', 'An input at which a polynomial or function has value zero.', /\b(?:square|cube|fourth|fifth|sixth|nth|n-th|kth|k-th|principal|primitive)\s+roots?\b|\$[^$]*\$\s*-?(?:th|st|nd|rd)\s+roots?\b/gi],
 ['Square root', 'For a nonnegative number $x$, the nonnegative number $\\sqrt x$ whose square is $x$. A positive number has two numbers whose square it is, $\\pm\\sqrt x$, and $\\sqrt x$ names the nonnegative one.'],
 ['Congruence', 'An equality of remainders modulo a positive integer; two integers are congruent when their difference is divisible by the modulus.'],
 ['Sample space', 'The set of possible outcomes of a random experiment. Probabilities by counting require equally likely elementary outcomes.'],
 ['Invariant', 'A quantity or property unchanged by every allowed operation.'],
 ['Bijection', 'A correspondence pairing each element of one set with exactly one element of another set, with every element paired.'],
 ['Cevian', 'A segment or line from a vertex of a triangle to a point on the opposite side or its extension.'],
 ['Locus', 'The set of all points satisfying a stated geometric condition.'],
 ['Tangent', 'For a circle, a line meeting the circle at one point, perpendicular to the radius there.'],
 ['Induction', 'A proof that establishes a starting case and shows that the truth of one case implies the next.'],
 ['Counterexample', 'An example satisfying a claim\'s hypotheses but contradicting its conclusion, which disproves the claim.']
];
let changed = 0;
for (const book of context.window.MATH_LEARN_SHELF) {
 const chapters = book.chapters.filter(c => c.title !== 'End-of-book Notes');
 for (const c of chapters) run(`js/data/learn/${book.id}/${c.code.toLowerCase()}.js`);
 const code = chapters[0].code[0] + (Math.max(...chapters.map(c => +c.code.slice(1))) + 1);
 const terms = new Map();
 const add = (term, definition, lesson, aliases = []) => {
  if (!term || !definition) return;
  const key = plainLinks(term).toLocaleLowerCase('en');
  if (!terms.has(key)) terms.set(key, {term: plainLinks(term), definition: plainLinks(definition), lessons: [], aliases: [...aliases]});
  const entry = terms.get(key);
  if (!entry.lessons.includes(lesson)) entry.lessons.push(lesson);
 };
 for (const c of chapters) for (const l of c.lessons) {
  if (['Introduction', 'Summary'].includes(l.title)) continue;
  const d = context.window.MATH_LEARN[c.code].lessons[l.code];
  const ids = new Set([...(d.cards || []), ...(d.prereq || []), ...(d.related || []).map(r => r.card), ...[...String(d.body).matchAll(/\[\[([\w-]+)/g)].map(m => m[1])]);
  for (const id of ids) { const f = cards.get(id); if (f) add(f.name, glossaryDefinitions[id] || f.description, l.code, f.keywords || []); }
  const prose = String(d.body).replace(/<[^>]*>/g, ' ');
  for (const [term, definition, exclude] of basics) if (new RegExp('\\b' + term + '(?:s)?\\b', 'i').test(exclude ? prose.replace(exclude, ' ') : prose)) add(term, definition, l.code);
 }
 const entries = [...terms.values()].sort((a,b) => a.term.localeCompare(b.term, 'en', {sensitivity: 'base'}));
 const link = lc => {const c = chapters.find(c => c.lessons.some(l => l.code === lc)); const l = c.lessons.find(l => l.code === lc); return `<a href="#/learn/${book.id}/${c.code.toLowerCase()}/${lc.split('.')[1]}">${esc(lc)} ${esc(l.title)}</a>`;};
 const index = 'The index points to lessons that teach, assume or explicitly connect each idea. Choose a lesson to return to its explanation.\n\n' + entries.map((e, i) => `<span class="book-index-entry" id="book-index-${i}">${esc(e.term)}: ${e.lessons.map(link).join('; ')}.</span>`).join('\n\n');
 const glossary = 'Use these definitions to recall vocabulary, then return to the indexed lessons for the reasoning and worked examples. Named results and methods use the descriptions from the reference cards.\n\n' + entries.map(e => `<dfn>${esc(e.term)}</dfn>. ${e.definition}`).join('\n\n');
 const credits = `${book.title} is written for Competition Math Reference. Its lesson explanations and original exercises are written for this project. The reference cards hold the full statements and conditions of named results; a name in the index is a route back to the lessons that use it, rather than a claim of original discovery.\n\nContest exercises are credited to their original competitions. AMC and AIME statements and figures are copyright the Mathematical Association of America, used under CC BY-NC-SA 4.0. Most are imported from LIVE by Po-Shen Loh; some retain PDF, Art of Problem Solving Wiki or Random Math provenance. Answer-key checks also use Think Academy where recorded. Per-paper provenance remains in the problem data. Settings → Credits and attribution has the source links and license details.\n\nFor further reading, the <a href="https://artofproblemsolving.com/wiki/index.php/Main_Page" target="_blank" rel="noopener noreferrer">Art of Problem Solving Wiki</a> provides mathematical articles and additional contest solutions. This is a further-reading recommendation; it does not imply that the lesson prose was copied from that source. Mathematics is rendered with the vendored KaTeX library; its license and notices are retained in vendor/katex.\n\nThis book's index and glossary reflect its current lessons. Their entries are maintained with the chapter content; they are navigation and reference aids, not a replacement for reading the explanations.`;
 const overview = `These notes close ${book.title} with three reference sections. Return to them when you want to locate an explanation, recall a definition, or check the book's sources.\n\nThe <a href="#/learn/${book.id}/${code.toLowerCase()}/2">Index</a> links key terms to the lessons that teach or use them. The <a href="#/learn/${book.id}/${code.toLowerCase()}/3">Glossary</a> gives definitions and descriptions of those ideas. <a href="#/learn/${book.id}/${code.toLowerCase()}/4">References and Credits</a> records the writing and contest sources, attribution, and further reading.\n\nSearch this book lists matching lessons, glossary definitions and Index entries. Choose an Index result to see all the lessons listed for that term in this book, then follow a lesson link to its explanation and worked examples.`;
 const data = {lessons: Object.fromEntries([overview, index, glossary, credits].map((body,i) => [`${code}.${i+1}`, {prereq: [], cards: [], body}]))};
 const output = `// Generated by tools/build-book-notes.cjs; definitions come from the book's reference cards.\nwindow.MATH_LEARN = window.MATH_LEARN || {};\nwindow.MATH_LEARN[${JSON.stringify(code)}] = ${JSON.stringify(data, null, 2)};\nwindow.MATH_BOOK_INDEX = window.MATH_BOOK_INDEX || {};\nwindow.MATH_BOOK_INDEX[${JSON.stringify(book.id)}] = ${JSON.stringify(entries.map(({term,lessons,aliases}) => ({term,lessons,aliases})), null, 2)};\n`;
 const dest = path.join(root, `js/data/learn/${book.id}/${code.toLowerCase()}.js`);
 if (process.argv.includes('--check')) {if (!fs.existsSync(dest) || fs.readFileSync(dest,'utf8') !== output) {console.error('Stale book notes:', book.id); process.exitCode = 1;}}
 else if (!fs.existsSync(dest) || fs.readFileSync(dest,'utf8') !== output) {fs.writeFileSync(dest, output); changed++;}
 console.log(`${book.id}: ${entries.length} indexed terms, ${code}`);
}
if (!process.argv.includes('--check')) console.log(`${changed} notes chapters updated.`);
