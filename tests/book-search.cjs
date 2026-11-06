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
