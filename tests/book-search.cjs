const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('js/app.js', 'utf8');
const extract = name => {
  const start = source.indexOf('  function ' + name + '(');
  assert(start >= 0, name);
  return source.slice(start, source.indexOf('\n  }', start) + 4);
};
const synonymsStart = source.indexOf('  const SYNONYMS =');
const synonyms = source.slice(synonymsStart, source.indexOf('\n  };', synonymsStart) + 5);
const context = vm.createContext({ window: {}, BY_ID: {}, learnLessonData: (c,l) => context.window.MATH_LEARN?.[c.code]?.lessons?.[l.code] });
const dataFiles = [...fs.readFileSync('index.html','utf8').matchAll(/src="(js\/data\/(?:learn\/[^"]+|geometry.js|algebra.js|number-theory.js|counting.js|patterns.js))\?v=/g)].map(m=>m[1]);
for (const path of dataFiles) vm.runInContext(fs.readFileSync(path, 'utf8'),context);
for (const section of context.window.MATH_SECTIONS || []) for (const subsection of section.subsections || []) for (const formula of subsection.formulas || []) context.BY_ID[formula.id] = {formula};
// New cards must ship with all three semantic-index artifacts, rather than silently falling back to lexical search.
const vectorHeader=JSON.parse(fs.readFileSync('js/data/search-vectors.json','utf8'));
assert.deepEqual(vectorHeader.ids.slice().sort(),Object.keys(context.BY_ID).sort(),'semantic index must cover the current card corpus');
const vectorBytes=fs.readFileSync('js/data/search-vectors.bin');
assert.equal(vectorBytes.length,(vectorHeader.words.length+vectorHeader.ids.length*vectorHeader.vectorsPerCard)*vectorHeader.dims,'vector binary/header sizes agree');
const fallback={window:{}};vm.runInNewContext(fs.readFileSync('js/data/search-vectors.js','utf8'),fallback);
assert.deepEqual(JSON.parse(JSON.stringify(fallback.window.MATH_SEARCH_VECTORS.header)),vectorHeader,'script fallback/header agree');
assert.ok(Buffer.from(fallback.window.MATH_SEARCH_VECTORS.bin,'base64').equals(vectorBytes),'script fallback/binary agree');
console.log(`Search artifacts: ${vectorHeader.ids.length} current cards; JSON, binary and script fallback agree.`);
vm.runInContext(synonyms + ['deDouble','normWord','wordsOf','levBounded','fuzzy','expandToken','bookSearchRanker'].map(extract).join('\n'),context);
const book = context.window.MATH_LEARN_SHELF.find(b=>b.id==='amc-counting');
const rank = context.bookSearchRanker(book);
assert.equal(rank('permutatons')[0].c.code,'R1','small typo');
assert.equal(rank('probab')[0].c.code,'R2','prefix');
assert.equal(rank('how to choose a committee')[0].c.code,'R1','natural-language query');
assert.equal(rank('chapter 2')[0].c.code,'R2','chapter number');
assert.equal(rank('R2')[0].c.code,'R2','chapter code');
assert.equal(rank('S2').length,0,'foreign chapter code must not become a local chapter');
assert.equal(rank('chapter 99').length,0,'unknown chapter');
assert.equal(rank('please help me with permutations')[0].c.code,'R1','conversational filler');
assert.equal(rank('zzzzqqqq').length,0,'no irrelevant fallback');
assert(rank('').length<=7);
assert(rank('count').every(e=>book.chapters.includes(e.c)),'book-scoped results');
console.log('Book search: typos, prefixes, natural language, chapter numbers, empty results and scope passed.');

const failures = []; let chapters = 0, lessons = 0;
for (const book of context.window.MATH_LEARN_SHELF) {
  const rank = context.bookSearchRanker(book);
  for (const c of book.chapters) {
    chapters++;
    if (rank(c.title)[0]?.c !== c) failures.push([book.id, c.code, c.title, rank(c.title)[0]?.c.code]);
    for (const l of c.lessons) {
      if (['Introduction', 'Summary'].includes(l.title)) continue;
      lessons++;
      if (!rank(l.title).some(e=>e.c===c)) failures.push([book.id,c.code,l.title,'lesson absent']);
    }
  }
}
console.log('All-book audit:', context.window.MATH_LEARN_SHELF.length, 'books,', chapters, 'chapter titles,', lessons, 'lesson titles; ranking failures:', JSON.stringify(failures));

assert.equal(failures.length,0,'every chapter title ranks first and every lesson title returns its chapter');

let indexTargets = 0;
for (const book of context.window.MATH_LEARN_SHELF) {
  const notes = book.chapters.filter(c => c.title === 'End-of-book Notes');
  assert.equal(notes.length, 1, book.id + ': exactly one notes chapter');
  assert.equal(notes[0].kind, 'reference', book.id + ': notes are reference sections');
  assert.equal(notes[0].level, undefined, book.id + ': notes have no difficulty badge');
  assert(notes[0].lessons.every(l => !l.level), book.id + ': reference sections have no difficulty badges');
  assert.deepEqual(Array.from(notes[0].lessons, l => l.title), ['Overview', 'Index', 'Glossary', 'References and Credits']);
  assert.deepEqual(Array.from(notes[0].lessons, l => l.code), [1,2,3,4].map(n => notes[0].code + '.' + n));
  const entries = context.window.MATH_BOOK_INDEX[book.id];
  assert(entries.length > 0, book.id + ': nonempty index');
  if (book.id === 'amc-number-theory') {
    // A square root (primality testing up to sqrt n) is not a root of an equation (found by Codex, 2026-11-07).
    const at = t => (entries.find(e => e.term === t) || {lessons: []}).lessons;
    assert(at('Square root').includes('M1.2'), 'M1.2 is indexed under Square root');
    assert(!at('Root').includes('M1.2'), 'M1.2 is not indexed under Root');
  }
  const overview = context.learnLessonData(notes[0], notes[0].lessons[0]).body;
  for (const n of [2,3,4]) assert(overview.includes(`#/learn/${book.id}/${notes[0].code.toLowerCase()}/${n}`), 'overview links to numbered reference sections');
  const index = context.learnLessonData(notes[0], notes[0].lessons.find(l => l.title === 'Index')).body;
  const glossary = context.learnLessonData(notes[0], notes[0].lessons.find(l => l.title === 'Glossary')).body;
  for (const entry of entries) {
    assert(entry.lessons.length, entry.term + ': has a location');
    for (const code of entry.lessons) {
      assert(book.chapters.some(c => c !== notes[0] && c.lessons.some(l => l.code === code)), book.id + ': local target ' + code);
      indexTargets++;
    }
  }
  for (const match of index.matchAll(/href="#\/learn\/([^/]+)\/([a-z]\d+)\/(\d+)"/g)) {
    assert.equal(match[1], book.id, 'index stays inside its book');
    assert(book.chapters.some(c => c.code.toLowerCase() === match[2] && c.lessons.some(l => l.code === c.code + '.' + match[3])), 'index URL resolves');
  }
  assert(glossary.includes('<dfn>'), 'glossary marks its definitions');
  // A typed vocabulary term finds the chapter with its explanation, not only the back matter.
  for (const term of ['Variable', 'Sample space', 'Cevian', 'Counterexample']) {
    const entry = entries.find(e => e.term === term);
    if (entry) assert(context.bookSearchRanker(book)(term).some(e => entry.lessons.some(code => code.startsWith(e.c.code + '.'))), book.id + ': searchable ' + term);
  }
}
console.log('Book notes:', indexTargets, 'lesson locations checked across all 13 books.');

const countStart = source.indexOf('  const learnLessonsIn =');
vm.runInContext(source.slice(countStart, source.indexOf('\n', countStart)), context);
assert.equal(vm.runInContext('window.MATH_LEARN_SHELF.reduce((n,b) => n + learnLessonsIn(b), 0)', context), 593,
  'reference sections must not inflate the teaching-lesson total');
