const fs = require('node:fs'), assert = require('node:assert/strict');
global.window = {};
require('../js/data/problems/answer-keys.js');
require('../js/data/problems/problem-db.js');
for (const f of fs.readdirSync('js/data/problems/statements')) if (f.endsWith('.js')) require('../js/data/problems/statements/' + f);
const {answers,sources} = window.MATH_ANSWER_KEYS;
const statements = window.MATH_STATEMENTS;
assert.equal(Object.keys(answers).length,Object.keys(statements).length,'every available statement has a key');
for (const [slug,answer] of Object.entries(answers)) {
  assert(statements[slug],slug);
  assert.match(answer,slug.includes('-aime-') ? /^\d{1,3}$/ : /^[A-E]$/);
  assert.match(sources[slug.replace(/-\d+$/,'')],/^https:\/\/live\.poshenloh\.com\/past-contests\//);
}
// Known answers include the two strategy discrepancies found during import.
assert.equal(answers['2020-amc-10b-1'],'D');
assert.equal(answers['1993-ajhsme-5'],'C');
assert.equal(answers['2021-fall-amc-12a-24'],'E');
assert.equal(answers['2021-fall-amc-10b-15'],'D');
for(const p of window.MATH_PROBLEM_DB){
  const slug=p.ref.toLowerCase().replace(', problem ','-').replace(/[^a-z0-9]+/g,'-');
  const explicit=[...(p.strategy||'').matchAll(/choice\s*\(?([A-E])\)?/g)];
  if(answers[slug] && explicit.length) assert.equal(answers[slug],explicit.at(-1)[1],p.ref);
}
console.log(`${Object.keys(answers).length} answer keys: coverage, formats, source links and explicit strategy choices passed.`);
