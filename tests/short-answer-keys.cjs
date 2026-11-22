const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

global.window = {};
const data = path.join(__dirname, '../js/data/problems');
require(path.join(data, 'answer-keys.js'));
require(path.join(data, 'answer-keys-more.js'));
require(path.join(data, 'answer-keys-short.js'));
require(path.join(data, 'mock-extras.js'));
const practice = require('../js/practice-sessions.js');
const { answers, sources } = window.MATH_SHORT_ANSWER_KEYS;
const statementDir = path.join(data, 'statements');
for (const dir of fs.readdirSync(statementDir, { withFileTypes: true }).filter(dir => dir.isDirectory())) {
  for (const file of fs.readdirSync(path.join(statementDir, dir.name)).filter(file => file.endsWith('.js'))) {
    require(path.join(statementDir, dir.name, file));
  }
}

const usedSources = new Set();
for (const [slug, key] of Object.entries(answers)) {
  const statement = window.MATH_STATEMENTS[slug];
  assert(statement, slug + ' needs a local prompt');
  assert(!/(?:^|\n)\([A-E]\)\s/.test(statement.s || statement), slug + ' has answer choices');
  assert.equal(window.MATH_ANSWER_KEYS.answers[slug], undefined, slug);
  assert.equal(window.MATH_EXTRA_KEYS.answers[slug], undefined, slug);
  assert.equal(window.MATH_MOCK_EXTRAS[slug], undefined, slug);
  const paper = slug.replace(/-\d+$/, '');
  assert.match(sources[paper], /^https:\/\//, slug);
  usedSources.add(paper);
  assert([undefined, 'set', 'tuple', 'tuple-set'].includes(key.format), slug);
  assert(key.answers.length, slug);
  for (const value of key.answers) check(slug, value, 'Correct');
}
assert.equal(usedSources.size, Object.keys(sources).length);

function check(slug, value, verdict) {
  const set = practice.create('Short-answer check', 'Any', [slug]);
  assert(practice.answer(set, slug, value, false), slug + ' rejected ' + value);
  assert.equal(practice.result(set, slug), verdict, slug + ' with ' + value);
}

const set = '2014-hmmt-february-algebra-1';
check(set, '6, 4', 'Correct');
check(set, '4', 'Incorrect');
check(set, '4, 6, 7', 'Incorrect');
check(set, '4, 4', 'Incorrect');
check('2025-hmmt-february-algebra-and-number-theory-10', '(-1±sqrt(17))/2', 'Correct');
check('2018-hmmt-february-geometry-2', '(9, 7)', 'Incorrect');
check('2011-hmmt-november-general-1', '(3, 2/6), (1, 3)', 'Correct');
check('2011-hmmt-november-general-1', '(1, 3), (1/3, 3)', 'Incorrect');
check('2017-hmmt-february-algebra-and-number-theory-4', '(2, 4^1008*2), (1, 1)', 'Correct');
check('2017-hmmt-february-algebra-and-number-theory-4', '(2, 2^2017+1), (1, 1)', 'Incorrect');
check('1999-hmmt-february-algebra-4', '0.5, 2/8', 'Correct');
check('2025-hmmt-february-algebra-and-number-theory-7', '9sqrt(23)/23', 'Correct');
check('2025-hmmt-february-algebra-and-number-theory-3', '0.001736111111', 'Incorrect');
check('2025-hmmt-february-combinatorics-7', '2^24*26!*2', 'Correct');
check('2025-hmmt-february-combinatorics-7', '2^25*26!+1', 'Incorrect');
check('2019-hmmt-february-geometry-5', '(sqrt(2)+1)/2', 'Correct');
check('2019-hmmt-february-geometry-5', '(sqrt(2)-1)/2', 'Correct');
answers['radical-test'] = { answers: ['(sqrt(6)+sqrt(2))/4'] };
check('radical-test', 'sqrt6/4+sqrt2/4', 'Correct');
check('radical-test', '(sqrt(6)+sqrt(2))/5', 'Incorrect');
delete answers['radical-test'];

const pilot = practice.createMock('2025 HMMT February Algebra and Number Theory', [set],
  { mode: 'paper', family: 'HMMT February', durationMs: null });
const restored = practice.read({ getItem: () => JSON.stringify([pilot]) })[0];
assert.equal(restored.status, 'paused');
assert.equal(practice.timeLeft(restored), null);
practice.resume(restored);
assert(practice.answer(restored, set, '6, 4', false));
practice.finish(restored);
assert.equal(practice.result(restored, set), 'Correct');

const legacy = practice.create('Saved self-check', 'Any', [set]);
legacy.selfCheck = { [set]: true };
assert(practice.answer(legacy, set, '4, 6', false));
practice.finish(legacy);
assert.equal(practice.result(legacy, set), 'Check yourself');
assert(practice.selfMark(legacy, set, 'Correct'));
assert.equal(practice.result(legacy, set), 'Correct');

console.log(`${Object.keys(answers).length} short-answer keys from ${usedSources.size} papers passed coverage, parsing, grading and saved-set checks.`);
