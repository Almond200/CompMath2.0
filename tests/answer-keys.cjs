const fs = require('node:fs'), assert = require('node:assert/strict');
global.window = {};
require('../js/data/problems/answer-keys.js');
require('../js/data/problems/problem-db.js');
// The MAA papers: the top-level statement files and the AHSME (keyed from LIVE since 2026-11-22).
for (const d of ['', 'ahsme/']) for (const f of fs.readdirSync('js/data/problems/statements/' + d)) if (f.endsWith('.js')) require('../js/data/problems/statements/' + d + f);
const {answers,sources} = window.MATH_ANSWER_KEYS;
const statements = window.MATH_STATEMENTS;
assert.equal(Object.keys(answers).length,Object.keys(statements).length,'every available statement has a key');
for (const [slug,answer] of Object.entries(answers)) {
  assert(statements[slug],slug);
  assert.match(answer,slug.includes('-aime-') ? /^\d{1,3}$/ : /^[A-E]$/);
  // The 2026 AMC 10A and 12A were keyed by hand from Random Math's wiki before LIVE had it (each answer checked by computation).
  assert.match(sources[slug.replace(/-\d+$/,'')],/^https:\/\/(live\.poshenloh\.com\/past-contests\/|wiki\.randommath\.com\/amc1[02]\/2026\/part-a$)/);
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
// Voided problems keep their official letter and carry a note; practice sets skip them.
for (const slug of Object.keys(window.MATH_ANSWER_KEYS.voided || {})) { assert(answers[slug], slug); assert(statements[slug], slug); }
assert(window.MATH_ANSWER_KEYS.voided['2025-amc-12a-25']);
const practice = require('../js/practice-sessions.js');
require('../js/data/problems/answer-keys-more.js');
require('../js/data/problems/statements/utah/2012.js');
require('../js/data/problems/statements/utah/2013.js');
const utah = window.MATH_EXTRA_KEYS;
const utah2013 = 'DEDBBDDBDECCACCD AAEABCBDAABDEA'.replace(/ /g, '');
assert.equal(utah2013.length, 30);
for (const division of ['junior', 'senior']) {
  for (const [i, letter] of [...utah2013].entries()) {
    const slug = `2013-utah-state-math-contest-${division}-${i + 1}`;
    assert.match(statements[slug].s, new RegExp(`\\(${letter}\\)`, 'i'));
    assert.equal(utah.answers[slug], letter);
    assert(practice.allowsMultipleChoices(slug));
  }
}
function grade(slug, answer, result) {
  const set = practice.create('Official grading check', 'Any', [slug]);
  assert(practice.answer(set, slug, answer, false), slug + ' rejected ' + answer);
  assert.equal(practice.result(set, slug), result);
}
grade('2012-amc-12b-12', 'D', 'Correct');
grade('2012-amc-12b-12', 'E', 'Correct');
grade('2012-amc-12b-12', 'A', 'Incorrect');
require('../js/data/problems/statements/cemc/2005.js');
assert.match(statements['2005-fermat-contest-25'].s, /positive integer/);
grade('2005-fermat-contest-25', 'B', 'Correct');
grade('2005-fermat-contest-25', 'A', 'Incorrect');
require('../js/data/problems/statements/cemc/2021.js');
assert.match(statements['2021-pascal-contest-25'].s, /\(E\) \$22\$/);
grade('2021-pascal-contest-25', 'E', 'Correct');
require('../js/data/problems/statements/columbus/2009.js');
assert.match(statements['2009-columbus-state-tournament-17'].s, /\(E\) \$889\$/);
grade('2009-columbus-state-tournament-17', 'E', 'Correct');
for (const p of window.MATH_PROBLEM_DB) {
  if (/\bUKMT (?:JMC|IMC|SMC)\b|\bUtah State Math Contest\b|\bUMD HSMC Part I,/.test(p.ref)) {
    const slug = p.ref.toLowerCase().replace(', problem ', '-').replaceAll(' ', '-');
    if (/^2026-ukmt-smc-2[3-5]$/.test(slug)) assert.equal(utah.answers[slug], undefined, slug);
    else assert(utah.answers[slug] || utah.voided[slug], slug);
  }
}
grade('2014-utah-state-math-contest-junior-20', 'B', 'Correct');
grade('2014-utah-state-math-contest-junior-30', 'D', 'Correct');
grade('2014-utah-state-math-contest-senior-20', 'B', 'Correct');
grade('2014-utah-state-math-contest-senior-30', 'C', 'Correct');
grade('2016-utah-state-math-contest-junior-13', 'E', 'Correct');
grade('2015-ukmt-imc-2', 'E', 'Correct');
grade('2015-ukmt-imc-2', 'A', 'Incorrect');
grade('1997-umd-hsmc-part-i-25', 'C', 'Correct');
grade('1997-umd-hsmc-part-i-25', 'D', 'Correct');
grade('1998-umd-hsmc-part-i-11', 'E', 'Correct');
grade('1998-umd-hsmc-part-i-14', 'D', 'Correct');
grade('1999-umd-hsmc-part-i-25', 'C', 'Correct');
for (const slug of ['2011-umd-hsmc-part-i-18', '2018-umd-hsmc-part-i-7']) {
  const set = practice.create('Maryland full-credit question', 'Any', [slug]);
  assert.equal(practice.result(set, slug), 'Voided');
  assert(!practice.answer(set, slug, 'C', false));
}
assert(!practice.answer(practice.create('Single selection', 'Any', ['2012-amc-12b-12']), '2012-amc-12b-12', 'DE', false));
for (const [suffix, letters] of [['junior-2', 'AD'], ['senior-6', 'AB'], ['senior-23', 'ACD']]) {
  const slug = '2012-utah-state-math-contest-' + suffix;
  assert(!practice.allowsMultipleChoices(slug));
  for (const choice of letters) grade(slug, choice, 'Correct');
  grade(slug, 'E', 'Incorrect');
}
grade('2012-utah-state-math-contest-senior-8', 'B', 'Correct');
grade('2012-utah-state-math-contest-senior-28', 'E', 'Correct');
for (const [suffix, a, b] of [['junior-24', 'D', 'E'], ['junior-26', 'A', 'D'], ['senior-12', 'C', 'D']]) {
  const slug = '2013-utah-state-math-contest-' + suffix;
  for (const submitted of [a, b, b + a]) grade(slug, submitted, 'Correct');
  const distractor = [...'ABCDE'].find(letter => letter !== a && letter !== b);
  grade(slug, a + distractor, 'Incorrect');
}
grade('2013-utah-state-math-contest-junior-1', 'DE', 'Incorrect');
for (const n of [4, 13]) {
  const slug = '2012-utah-state-math-contest-senior-' + n;
  const set = practice.create('Utah withdrawal', 'Any', [slug]);
  assert.equal(practice.officialKey(slug), undefined);
  assert.equal(practice.result(set, slug), 'Voided');
  assert(!practice.answer(set, slug, 'C', false));
  assert(statements[slug]);
}
console.log(`${Object.keys(answers).length} answer keys: coverage, formats, source links and explicit strategy choices passed.`);
