const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

global.window = {};
const data = path.join(__dirname, '../js/data/problems');
require(path.join(data, 'problem-db.js'));
require(path.join(data, 'answer-keys.js'));
require(path.join(data, 'answer-keys-more.js'));
require(path.join(data, 'answer-keys-short.js'));
require(path.join(data, 'mock-extras.js'));
const practice = require('../js/practice-sessions.js');
const { answers, sources, voided, notes } = window.MATH_SHORT_ANSWER_KEYS;
const indexed = new Set(window.MATH_PROBLEM_DB.map(({ref}) =>
  ref.toLowerCase().replace(/,?\s*problem\s+/, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')));
assert.equal(indexed.size, window.MATH_PROBLEM_DB.length);
for (const slug of indexed) {
  assert(practice.voidReason(slug) || practice.officialKey(slug) || practice.exactKey(slug) ||
    practice.needsSelfCheck({}, slug), slug + ' needs a documented grading disposition');
}
for (const slug of [...Object.keys(answers), ...Object.keys(voided), ...Object.keys(notes)]) assert(indexed.has(slug), slug);
const statementDir = path.join(data, 'statements');
for (const dir of fs.readdirSync(statementDir, { withFileTypes: true }).filter(dir => dir.isDirectory())) {
  for (const file of fs.readdirSync(path.join(statementDir, dir.name)).filter(file => file.endsWith('.js'))) {
    require(path.join(statementDir, dir.name, file));
  }
}

const usedSources = new Set();
for (const [slug, key] of Object.entries(answers)) {
  const statement = window.MATH_STATEMENTS[slug];
  if (key.external) assert.equal(statement, undefined, slug + ' already has a local prompt');
  else {
    assert(statement, slug + ' needs a local prompt');
    assert(!/(?:^|\n)\([A-E]\)\s/.test(statement.s || statement), slug + ' has answer choices');
  }
  assert.equal(window.MATH_ANSWER_KEYS.answers[slug], undefined, slug);
  assert.equal(window.MATH_EXTRA_KEYS.answers[slug], undefined, slug);
  assert.equal(window.MATH_MOCK_EXTRAS[slug], undefined, slug);
  const paper = slug.replace(/-\d+$/, '');
  assert.match(sources[paper], /^https:\/\//, slug);
  usedSources.add(paper);
  assert([undefined, 'set', 'sequence', 'tuple', 'tuple-set', 'set-set', 'ratio-list', 'text', 'numeral', 'percent', 'complex', 'complex-set', 'interval', 'formal-log', 'polynomial', 'rational-function', 'quadratic-radical', 'exponential-function', 'factored-number', 'prime-factorization', 'symbolic-rational', 'symbolic-radical', 'symbolic-equation', 'polynomial-multiple', 'integer-polynomial-multiple', 'natural-exponential', 'inverse-tangent-formula'].includes(key.format), slug);
  if (['polynomial', 'rational-function', 'exponential-function'].includes(key.format)) assert.match(key.notation, /^[a-z]$/i, slug);
  if (Array.isArray(key.notation)) {
    assert.equal(key.format, 'tuple', slug);
    assert(key.notation.every(part => [null, 'letter', 'feet'].includes(part)), slug);
  }
  assert(key.answers.length, slug);
  for (const value of key.answers) check(slug, value, 'Correct');
}
for (const [slug, key] of Object.entries({ ...answers, ...window.MATH_MOCK_EXTRAS })) {
  if (!key.alternatives) continue;
  const separator = key.format === 'sequence' ? '; ' : ', ';
  const individual = key.format === 'set' ? key.answers.filter(answer => !answer.includes(',')) : key.answers;
  assert(individual.length > 1, slug);
  for (const first of individual) {
    for (const second of individual.filter(answer => answer !== first)) {
      check(slug, first + separator + second, 'Correct');
    }
  }
  const wrong = key.format === 'sequence' ? '0, 0' : '888888888';
  check(slug, individual[0] + separator + wrong, 'Incorrect');
}
assert.equal(usedSources.size, Object.keys(sources).length);

for (const [slug, reason] of Object.entries(voided)) {
  assert(reason, slug);
  assert.match(sources[slug.replace(/-\d+$/, '')], /^https:\/\//, slug);
  assert.equal(practice.exactKey(slug), undefined, slug);
  const set = practice.create('Voided question', 'Any', [slug]);
  assert.equal(practice.result(set, slug), 'Voided');
  assert.equal(practice.answer(set, slug, '90', false), false);
  set.answers[slug] = '90';
  set.selfCheck = { [slug]: true };
  practice.finish(set);
  assert.equal(practice.result(set, slug), 'Voided');
  assert.equal(practice.selfMark(set, slug, 'Correct'), false);
}
assert.match(voided['2015-mmaths-individual-7'], /degree-ten.*impractical/);

const hmmt2010 = Object.keys(window.MATH_STATEMENTS).filter(slug => /^2010-hmmt-february-/.test(slug));
assert.equal(hmmt2010.length, 30);
assert.deepEqual(hmmt2010.filter(slug => !practice.exactKey(slug)), ['2010-hmmt-february-combinatorics-8']);
assert(voided['2010-hmmt-february-combinatorics-8']);

function check(slug, value, verdict) {
  const set = practice.create('Short-answer check', 'Any', [slug]);
  assert(practice.answer(set, slug, value, false), slug + ' rejected ' + value);
  assert.equal(practice.result(set, slug), verdict, slug + ' with ' + value);
}

const set = '2014-hmmt-february-algebra-1';
check('2025-chmmc-individual-10', '6', 'Correct');
check('2025-chmmc-individual-10', '7', 'Incorrect');
assert.match(notes['2025-chmmc-individual-10'], /accepting 7.*6/);
const freeRecurrence = '2015-bmt-analysis-4';
const priorPractice = practice.create('Saved recurrence answer', 'Any', [freeRecurrence]);
priorPractice.answers[freeRecurrence] = '3';
practice.finish(priorPractice);
assert.equal(practice.result(priorPractice, freeRecurrence), 'Check yourself');
assert(practice.selfMark(priorPractice, freeRecurrence, 'Correct'));
assert.equal(practice.result(priorPractice, freeRecurrence), 'Correct');
assert.match(notes[freeRecurrence], /1 \+ 2a₄/);
check('2018-lehigh-math-contest-1', '20', 'Correct');
check('2018-lehigh-math-contest-1', '400', 'Incorrect');
check('2013-lehigh-math-contest-6', 'sqrt(2)', 'Correct');
check('2013-lehigh-math-contest-6', '2', 'Incorrect');
check('2020-lehigh-math-contest-7', 'sqrt(5)', 'Correct');
check('2020-lehigh-math-contest-36', 'sqrt(6)', 'Correct');
check('2019-lehigh-math-contest-12', '20 mph', 'Correct');
check('2011-calgary-junior-math-contest-2', '38 m²', 'Correct');
check('2022-girls-in-math-at-yale-individual-6', '10 ft/s', 'Correct');
check('2021-hmmt-november-theme-2', '19%', 'Correct');
check('2025-lehigh-math-contest-25', '3456891012151618', 'Correct');
check('2025-lehigh-math-contest-25', '03456891012151618', 'Incorrect');
for (const year of [2022, 2023, 2024, 2025]) {
  for (const contest of ['pascal', 'cayley', 'fermat']) {
    const paper = year + '-' + contest + '-contest';
    for (let number = 21; number <= 25; number++) {
      const slug = paper + '-' + number;
      assert.match(answers[slug].answers[0], /^\d{2}$/, slug);
      assert.equal(practice.officialKey(slug), undefined, slug);
    }
  }
}
check('2022-cayley-contest-25', '09', 'Correct');
check('2022-cayley-contest-25', '9', 'Correct');
for (const [number, value] of [[23, '129'], [24, '140'], [25, '528']]) {
  const slug = '2026-ukmt-smc-' + number;
  assert(answers[slug].external);
  check(slug, value, 'Correct');
}
for (const slug of ['2025-mbmt-lower-geometry-7', '2025-mbmt-upper-geometry-5']) {
  check(slug, '10', 'Correct');
  check(slug, 'sqrt(1360)', 'Correct');
  check(slug, '36', 'Incorrect');
}
assert.match(practice.exactTex('55 degrees', undefined, 'degrees'), /\\circ/);
check('1999-lehigh-math-contest-35', 'x_1=1/x_2', 'Correct');
check('2000-lehigh-math-contest-7', '2x+y=6', 'Correct');
check('2000-lehigh-math-contest-31', '166500', 'Correct');
check('2000-lehigh-math-contest-31', '1499500', 'Correct');
check('2001-lehigh-math-contest-20', 'A+B', 'Correct');
check('2001-lehigh-math-contest-33', '3(x^4-14x^2+9)', 'Correct');
check('2001-lehigh-math-contest-33', '(x^4-14x^2+9)/2', 'Incorrect');
check('2002-lehigh-math-contest-10', 'a=(b^2-c^2)/(2b)', 'Correct');
check('2002-lehigh-math-contest-22', 'x^2-8x/5-16/5', 'Correct');
check('2007-lehigh-math-contest-25', '(1+2c)^(1/2)', 'Correct');
check('2008-lehigh-math-contest-9', '101*101^3', 'Correct');
check('2008-lehigh-math-contest-9', '104060401', 'Incorrect');
check('2008-lehigh-math-contest-35', 'a₅', 'Correct');
check('2009-lehigh-math-contest-18', 'b=2e-d^2', 'Correct');
check('2010-lehigh-math-contest-4', '4% decrease', 'Correct');
check('2010-lehigh-math-contest-4', '4%', 'Correct');
check('2010-lehigh-math-contest-4', '4% increase', 'Incorrect');
check('2010-lehigh-math-contest-16', '8:4:2', 'Correct');
check('2015-lehigh-math-contest-38', '28:32:10', 'Correct');
check('2016-lehigh-math-contest-9', 'a=3/b', 'Correct');
check('2017-lehigh-math-contest-5', 'D,C,A', 'Correct');
check('2017-lehigh-math-contest-12', 'G < F < E', 'Correct');
check('2017-lehigh-math-contest-12', 'E,F,G', 'Incorrect');
check('2018-lehigh-math-contest-38', '{{283,2,281},{29,31,2}}', 'Correct');
check('2018-lehigh-math-contest-38', '{283,2,281}', 'Incorrect');
check('2019-lehigh-math-contest-5', 'x^2+y^2-2x-4y=20', 'Correct');
check('2019-lehigh-math-contest-5', 'x^2+y^2-2x-4y=25', 'Incorrect');
check('2014-lehigh-math-contest-23', '(b,3^2)', 'Correct');
check('2014-lehigh-math-contest-23', '(9,B)', 'Incorrect');
check('2015-lehigh-math-contest-34', '-1/2 <= x < 0 or 0 < x < 45/8', 'Correct');
check('2015-lehigh-math-contest-34', '[-1/2,45/8)', 'Incorrect');
check('2024-lehigh-math-contest-15', '(x+2y+5)/2', 'Correct');
check('2024-lehigh-math-contest-16', 'sin(18°)/(1+sin(18°))', 'Correct');
check('2026-lehigh-math-contest-24', '3*(3^2024-1)/4', 'Correct');
check('1998-hmmt-february-geometry-10', '3^3, h, 416/2 feet', 'Correct');
check('1998-hmmt-february-geometry-10', '(27,T,208)', 'Incorrect');
check('1998-hmmt-february-geometry-10', '(208,H,27)', 'Incorrect');
assert.equal(practice.exactTex('27, h, 208 ft', 'tuple', [null, 'letter', 'feet']), '\\left(27,\\ H,\\ 208\\right)');
check('2001-hmmt-february-geometry-2', '1/6', 'Correct');
check('2001-hmmt-february-geometry-2', '1/2', 'Correct');
check('2000-hmmt-february-geometry-4', 'ab-ab/4', 'Correct');
check('2000-hmmt-february-geometry-4', '3(a+b)/4', 'Incorrect');
check('2005-hmmt-february-geometry-7', 'sqrt(4z^2+4x^2+4y^2)/2', 'Correct');
check('2005-hmmt-february-geometry-7', '(z^2+y*y+x^2)^(1/2)', 'Correct');
check('2005-hmmt-february-geometry-7', '-sqrt(x^2+y^2+z^2)', 'Incorrect');
check('2009-hmmt-february-algebra-7', '(x^9900+2x^10000+x^10100)/4', 'Correct');
check('2009-hmmt-february-algebra-7', '(x^9900+2x^10000+x^10100)/2', 'Incorrect');
answers['symbolic-distribution-test'] = { format: 'symbolic-rational', notation: 'a,b,c,d', answers: ['(ab-ac)/d'] };
check('symbolic-distribution-test', 'a(b-c)/d', 'Correct');
delete answers['symbolic-distribution-test'];
check('2009-hmmt-february-geometry-7', '21sqrt(37/205)', 'Correct');
check('2009-hmmt-february-geometry-7', '6sqrt(37)/5', 'Correct');
check('2012-hmmt-february-algebra-1', '(2^4024+1)^(1/2)', 'Correct');
check('2012-hmmt-february-algebra-1', '2^2012*sqrt(1+4^(-2012))', 'Correct');
check('2012-hmmt-february-algebra-1', '2^2012', 'Incorrect');
check('2012-hmmt-february-algebra-6', '4/(sqrt(1+2^(-2009))+1)', 'Correct');
check('2012-hmmt-february-algebra-6', '2', 'Incorrect');
check('2012-hmmt-february-algebra-6', '2^1006*sqrt(2^2010+2)-2^2011+1/2^4024', 'Incorrect');
check('2011-hmmt-february-algebra-and-combinatorics-4', '2^n/2', 'Correct');
check('2011-hmmt-february-algebra-and-combinatorics-4', '(1/2)^(1-n)', 'Correct');
check('2011-hmmt-february-algebra-and-combinatorics-18', '(2-2^(1-n))/n', 'Correct');
check('2011-hmmt-february-algebra-and-combinatorics-18', '2/n', 'Incorrect');
for (const slug of ['2011-hmmt-february-algebra-and-combinatorics-2', '2011-hmmt-february-combinatorics-and-geometry-1']) {
  assert.equal(practice.voidReason(slug), undefined);
  check(slug, '2', 'Correct');
  check(slug, '2*(15!)^2', 'Correct');
  check(slug, '3', 'Incorrect');
}
check('2024-hmmt-november-theme-5', '198193', 'Correct');
check('2025-hmmt-november-theme-1', '79%', 'Correct');
check('2025-hmmt-november-theme-1', '$79\\%$', 'Correct');
check('2025-hmmt-november-theme-1', '0.79', 'Correct');
check('2025-hmmt-november-theme-1', '0.79%', 'Incorrect');
check('2025-hmmt-november-theme-5', '495*26!', 'Correct');
check('2018-hmmt-february-algebra-and-number-theory-8', '(2^2019-1)^1009*(2^2019-1)^1009', 'Correct');
check('2018-hmmt-february-algebra-and-number-theory-8', '((2^673-1)*(2^1346+2^673+1))^2018', 'Correct');
check('2018-hmmt-february-algebra-and-number-theory-8', '(2^2019-1)^2017', 'Incorrect');
check('2009-hmmt-february-combinatorics-10', '3^n-2^n-n*2^n+(n^2+n)/2', 'Correct');
check('2001-hmmt-february-advanced-topics-2', '-(-1)^n', 'Correct');
check('2001-hmmt-february-advanced-topics-2', '(-1)^n', 'Incorrect');
check('2017-hmmt-february-combinatorics-10', 'choose(85,50)-choose(85,51)', 'Correct');
check('2013-arml-local-individual-10', '21,5,14', 'Correct');
check('2013-arml-individual-2', '115', 'Correct');
check('2016-cmimc-computer-science-3', '2^13', 'Correct');
check('2016-cmimc-computer-science-3', '13', 'Correct');
check('2017-pumac-division-b-algebra-1', '27', 'Correct');
check('2017-pumac-division-b-algebra-1', '1', 'Correct');
check('2019-pumac-division-a-geometry-6', '4046', 'Correct');
check('2019-pumac-division-b-geometry-7', '4046', 'Correct');
check('2016-arml-individual-8', '(20, 5, 11)', 'Incorrect');
check('2017-mathcounts-national-sprint-25', 'sqrt(193)/2', 'Correct');
check('2017-mathcounts-national-sprint-25', 'sqrt(457)/2', 'Correct');
check('2012-mathcounts-national-sprint-22', '12 units', 'Correct');
check('2012-mathcounts-national-sprint-22', 'sqrt(1216)/3', 'Correct');
check('2012-mathcounts-national-sprint-22', '8sqrt(19)', 'Incorrect');
check('2015-mathcounts-national-sprint-17', '1100₃', 'Correct');
check('2015-mathcounts-national-sprint-17', '(001100)_{3}', 'Correct');
check('2017-cmimc-computer-science-3', '111101 (base 2)', 'Correct');
check('2017-cmimc-computer-science-3', '0b111101', 'Correct');
check('2017-mathcounts-national-sprint-8', '16₈', 'Correct');
check('2019-chmmc-individual-10', '10000.00010', 'Correct');
check('2019-chmmc-individual-10', '010000.000100_{\\phi}', 'Correct');
check('2019-chmmc-individual-10', '10000.00100φ', 'Incorrect');
const baseCheck = practice.create('Base check', 'Any', ['2017-cmimc-computer-science-3']);
assert(!practice.answer(baseCheck, '2017-cmimc-computer-science-3', '61', false));
assert(!practice.answer(baseCheck, '2017-cmimc-computer-science-3', '111101_3', false));
assert.equal(practice.exactTex('10000.00010 φ', 'numeral', 'base-phi'), '10000.00010_{\\phi}');
check('2024-hmmt-february-algebra-and-number-theory-1', '29', 'Correct');
check('2024-hmmt-february-algebra-and-number-theory-1', '-6', 'Correct');
check('2024-hmmt-february-algebra-and-number-theory-1', '-6,29', 'Correct');
check('2024-hmmt-february-algebra-and-number-theory-1', '29 or -6', 'Correct');
check('2024-hmmt-february-algebra-and-number-theory-1', '29,-6,0', 'Incorrect');
check('2008-pumac-division-a-algebra-5', 'n*H_n+H_n-n', 'Correct');
check('2008-pumac-division-b-algebra-8', '(1+n)*H_{n}-n', 'Correct');
check('2011-smt-algebra-4', 'exp(402.2pi)', 'Correct');
check('2011-smt-general-20', '((e^pi)^2011)^(1/5)', 'Correct');
check('2011-smt-general-20', 'e^(2010pi/5)', 'Incorrect');
check('2011-smt-geometry-6', 'pi/2+tan^{-1}(d)', 'Correct');
check('2011-smt-geometry-6', 'pi/2+atan(1/d)', 'Incorrect');
check('2011-smt-general-21', '(79pi+6-50x)/2', 'Correct');
check('2011-smt-general-21', '79pi/2+3/2-5x', 'Incorrect');
check('2014-smt-algebra-10', '1-x_{2014}/(3y_2014)', 'Correct');
check('2014-smt-algebra-10', '1+x_2014/(3y_2014)', 'Incorrect');
check('2006-hmmt-february-combinatorics-7', '4^(-n)-8^(-n)', 'Correct');
check('2006-hmmt-february-combinatorics-7', '4^(-n)', 'Incorrect');
check('2007-hmmt-february-algebra-8', 'log(2007)-log(2006)', 'Correct');
check('2007-hmmt-february-algebra-8', '(ln(2007)-ln(2006/2007)+ln(1/2006))/2', 'Correct');
check('2007-hmmt-february-algebra-8', 'log(2006/2007)', 'Incorrect');
check('2007-hmmt-february-algebra-8', '0.000498', 'Incorrect');
assert.match(practice.exactTex('\\log\\left(\\frac{2007}{2006}\\right)', 'formal-log'), /\\log/);
check('2023-mbmt-lower-number-theory-5', '∞', 'Correct');
check('2023-mbmt-lower-number-theory-5', '17', 'Incorrect');
check('2016-bmt-discrete-math-6', 'n*2^n-2^n+1', 'Correct');
check('2010-duke-math-meet-individual-1', '18.5 minutes', 'Correct');
check('2010-duke-math-meet-individual-6', '41*3*7*3*7', 'Correct');
check('2010-duke-math-meet-individual-6', '18081', 'Incorrect');
check('2010-duke-math-meet-individual-8', '2/2010', 'Correct');
check('2011-duke-math-meet-individual-1', '2*60 mins', 'Correct');
check('2011-duke-math-meet-individual-10', '1/(2+2/(sqrt(6)-sqrt(2)))', 'Correct');
check('2014-duke-math-meet-individual-9', '321', 'Correct');
check('2014-duke-math-meet-individual-9', '3', 'Incorrect');
check('2017-duke-math-meet-individual-3', 'choose(12,4)', 'Correct');
check('2017-duke-math-meet-individual-3', '715', 'Incorrect');
check('2017-duke-math-meet-individual-4', '144 degrees', 'Correct');
check('2018-duke-math-meet-individual-1', '2,-2,-4,-8', 'Correct');
assert.equal(sources['2017-duke-math-meet-individual'], 'https://dukemathmeet.org/2017/indiv_sol.pdf');
assert.match(window.MATH_SHORT_ANSWER_KEYS.notes['2017-duke-math-meet-individual-3'], /leading|zero/);
check('2025-mathcounts-national-sprint-4', 'SATURDAY', 'Correct');
check('2025-mathcounts-national-sprint-4', 'Sunday', 'Incorrect');
check('2025-mathcounts-national-target-6', '90.08%', 'Correct');
check('2025-mathcounts-national-target-6', '90.08', 'Correct');
check('2025-mathcounts-national-target-6', '0.9008', 'Incorrect');
check('2013-math-prize-for-girls-10', '236', 'Correct');
check('2017-math-prize-for-girls-19', '60,20,20,20,20,40,40,20,20,40,20,20,20', 'Correct');
check('2017-math-prize-for-girls-19', '20,60,20,20,40,20,20,40,40,20,20,20,20', 'Incorrect');
check('2023-math-prize-for-girls-10', '4083, 520, 3595', 'Correct');
check('2024-math-prize-for-girls-11', '2, 8, 6, 20', 'Incorrect');
check('2025-math-prize-for-girls-16', '6*3^298', 'Correct');
check('2025-math-prize-for-girls-16', 'sqrt(8/2)*3^299', 'Correct');
check('2025-math-prize-for-girls-16', '2*(pi-pi+1.000000000000000000000000000000000000000000000001)*3^299', 'Incorrect');
check('2025-math-prize-for-girls-16', '1.000000000000000000000000000000000000000000000001*2*3^299', 'Incorrect');
check('2019-duke-math-meet-individual-10', '1369657969', 'Correct');
check('2019-duke-math-meet-individual-10', '\\binom{2019}{3}', 'Correct');
check('2019-duke-math-meet-individual-10', 'choose(2019,3)+1', 'Incorrect');
check('2013-chmmc-individual-13', '-125', 'Correct');
check('2013-chmmc-individual-15', '144', 'Correct');
check('2014-chmmc-individual-3', '106', 'Incorrect');
check('2014-chmmc-individual-5', '2pi', 'Correct');
check('2016-chmmc-individual-14', 'tan(36°)', 'Correct');
check('2019-chmmc-individual-12', '2*2^2020-6', 'Correct');
check('2019-chmmc-individual-12', '2*2^2020-5', 'Incorrect');
check('2017-arml-individual-7', '-4(5+6i)', 'Correct');
check('2017-chmmc-individual-13', '(7-4i)^2', 'Correct');
check('2017-chmmc-individual-13', '(7+4i)^2', 'Incorrect');
check('2010-hmmt-february-algebra-4', '\\{i,-1,1,1/i\\}', 'Correct');
check('2010-hmmt-february-algebra-4', '1,-1,2i,-i', 'Incorrect');
check('2024-hmmt-february-algebra-and-number-theory-9', '0,±sqrt(-6)', 'Correct');
check('2024-hmmt-february-algebra-and-number-theory-9', 'sqrt(6)i,0', 'Incorrect');
check('2017-bmt-analysis-2', 'log_3(6),1', 'Correct');
check('2016-bmt-analysis-8', 'e*e', 'Correct');
check('2012-bmmt-individual-1', '4/9', 'Correct');
check('2012-bmmt-individual-1', '-9/4', 'Incorrect');
check('2013-bmmt-individual-18', '2012', 'Correct');
check('2013-bmmt-individual-18', '1858', 'Incorrect');
check('2013-bmt-geometry-4', '7776:1', 'Correct');
check('2013-bmt-geometry-4', '1/1296', 'Incorrect');
check('2013-bmt-discrete-math-5', '2^2013', 'Correct');
check('2018-bmt-geometry-10', '(4sqrt(7)-10)pi', 'Correct');
check('2019-bmt-discrete-math-2', '0.(18)', 'Correct');
check('2019-bmt-discrete-math-2', '0.\\overline{18}', 'Correct');
check('2019-bmt-discrete-math-2', '0.18', 'Incorrect');
check('2017-cmimc-computer-science-5', '7-1/13', 'Correct');
check('2017-cmimc-computer-science-5', '97/14', 'Incorrect');
check('2018-cmimc-combinatorics-6', '1/3', 'Incorrect');
check('2018-cmimc-combinatorics-6', '111*2^18/5^20', 'Incorrect');
check('2019-cmimc-combinatorics-and-computer-science-6', '25*2^99/(2^98-1)', 'Correct');
check('2019-cmimc-combinatorics-and-computer-science-6', '50', 'Correct');
check('2013-bmmt-individual-14', '145 inches', 'Correct');
check('2013-bmmt-individual-14', '145 cm', 'Incorrect');
check('2009-lehigh-math-contest-27', '184 sq in', 'Correct');
check('2009-lehigh-math-contest-27', '184 in^2', 'Correct');
check('2015-mmaths-individual-6', '15/4', 'Correct');
check('2015-mmaths-individual-6', '4-(500/999)^2', 'Correct');
check('2019-mmaths-individual-1', '3 hours', 'Correct');
check('2019-mmaths-individual-2', '300pi units squared', 'Correct');
check('2019-mmaths-individual-5', '35/6 lbs', 'Correct');
check('2009-duke-math-meet-individual-2', '1/n+1/n', 'Correct');
check('2009-duke-math-meet-individual-2', '2*n^-1', 'Correct');
check('2009-duke-math-meet-individual-2', '2/(n-n)', 'Incorrect');
check('2009-duke-math-meet-individual-2', '1/n', 'Incorrect');
check('2009-duke-math-meet-individual-3', '9 points', 'Correct');
check('2025-smt-algebra-8', '435°', 'Correct');
check('2025-smt-algebra-8', '435 deg', 'Correct');
check('2025-smt-algebra-8', '29pi/12 radians', 'Correct');
check('2025-smt-algebra-8', '435', 'Incorrect');
assert.equal(practice.exactTex('435°', undefined, 'angle'), '{435}^{\\circ}');
check('2015-bmmt-individual-6', '2+9+6+1', 'Correct');
check('2015-bmmt-individual-6', '17', 'Incorrect');
check('2018-bmmt-individual-13', '217pi/3 cubic inches', 'Correct');
check('2022-bmmt-individual-17', '5-3sqrt(2)', 'Correct');
check('2023-bmmt-individual-20', '1/sin(3pi/8)-1', 'Correct');
check('2026-bmmt-individual-7', '46 dollars', 'Correct');
check('2026-bmmt-individual-10', '0.84 miles per hour', 'Correct');
check('2026-bmmt-individual-17', '1:sqrt(3)', 'Correct');
check('2020-smt-general-18', '(673,3),(3,673)', 'Correct');
check('2020-smt-general-18', '(673,3)', 'Incorrect');
check('2015-bmt-analysis-9', '0', 'Correct');
const fibonacciProblem = '2020-cmimc-combinatorics-and-computer-science-8';
check(fibonacciProblem, '(100, F_104+1223)', 'Correct');
check(fibonacciProblem, '(100, F_{104}+1223)', 'Correct');
check(fibonacciProblem, '(100, F₁₀₄+1223)', 'Correct');
check(fibonacciProblem, '(100, 2427893228399975083676)', 'Correct');
check(fibonacciProblem, '(100, fib(106)-fib(105)+1223)', 'Correct');
check(fibonacciProblem, '(100, F_104)', 'Incorrect');
assert.match(practice.exactTex('(100,F_{104}+1223)', 'tuple', 'fibonacci'), /F_\{104\}\+1223/);
check(set, 'F_4', 'Incorrect');
check('2008-lehigh-math-contest-4', '38<=x<88', 'Correct');
check('2008-lehigh-math-contest-4', '88>x≥38', 'Correct');
check('2008-lehigh-math-contest-4', '[38,50] U (50,88)', 'Correct');
check('2008-lehigh-math-contest-4', '[38,50) U (50,88)', 'Incorrect');
check('2008-lehigh-math-contest-4', '[38,88]', 'Incorrect');
check('2022-bmt-algebra-4', '[2022/45,2023/45)', 'Correct');
check('2007-hmmt-february-algebra-6', 'r>3 or r<49/27', 'Correct');
check('2007-hmmt-february-algebra-6', '(3, inf) U (-infinity, 49/27]', 'Incorrect');
const intervalSet = practice.create('Interval validation', 'Any', ['2008-lehigh-math-contest-4']);
for (const input of ['[38, inf]', '[88,38)', '38<x>88', '3<x<']) {
  assert(!practice.answer(intervalSet, '2008-lehigh-math-contest-4', input, false), input);
}
assert.match(practice.exactTex('38 ≤ x < 88', 'interval'), /^\[38,/);
check('1999-lehigh-math-contest-26', '-3,-2,sqrt(-4)*(-1)', 'Correct');
check('2006-lehigh-math-contest-25', '0 ≤ k ≤ 1', 'Correct');
check('2006-lehigh-math-contest-25', '(0,1)', 'Incorrect');
check('2000-lehigh-math-contest-26', 'sqrt(6)/2,-sqrt(6)/2,±i/sqrt(2)', 'Correct');
check('2000-lehigh-math-contest-26', '±3/2,±i/sqrt(2)', 'Incorrect');
check('2002-lehigh-math-contest-5', 'b , c,a', 'Correct');
check('2003-lehigh-math-contest-11', '$40 loss', 'Correct');
check('2003-lehigh-math-contest-11', '40', 'Incorrect');
check('2003-lehigh-math-contest-24', '(4,25pi/12)', 'Correct');
check('2003-lehigh-math-contest-24', '(4,15°)', 'Correct');
check('2003-lehigh-math-contest-24', '(4,-345 deg)', 'Correct');
check('2003-lehigh-math-contest-24', '(4,15)', 'Incorrect');
check('2019-lehigh-math-contest-13', '15,5', 'Correct');
check('2019-lehigh-math-contest-13', '5', 'Incorrect');
check('2019-lehigh-math-contest-22', '4:6', 'Correct');
check('2019-lehigh-math-contest-22', '3:2', 'Incorrect');
check('1998-hmmt-february-algebra-8', '[-4.5,-2] U ((1-sqrt(5))/2,(1+sqrt(5))/2)', 'Incorrect');
check('2010-hmmt-february-geometry-6', 'sqrt(6)/4+sqrt(2)/4+2', 'Correct');
check('2014-hmmt-february-algebra-4', '-1 1/2', 'Correct');
check('2014-hmmt-february-algebra-4', '-(1+1/2)', 'Correct');
check('2014-hmmt-february-algebra-4', '-1 1/3', 'Incorrect');
const ternaryProblem = '2011-hmmt-february-algebra-and-combinatorics-19';
check(ternaryProblem, '(1000001100111222)_{3},2211100110000012₃', 'Correct');
check(ternaryProblem, '2211100110000012,1000001100111222', 'Incorrect');
assert.equal(practice.exactTex('1000001100111222, 2211100110000012', 'sequence', 'base-3'),
  '1000001100111222_{3},\\ 2211100110000012_{3}');
check('2015-hmmt-february-combinatorics-7', 'choose(4030,2014)/2^4030', 'Correct');
check('2016-mbmt-upper-algebra-4', '(8,4),(5,5),(3,9),(4,6)', 'Correct');
check('2016-mbmt-upper-algebra-4', '(4,8),(5,5),(3,9),(4,6)', 'Incorrect');
check('2018-mbmt-upper-algebra-5', '2,(15-sqrt(105))/4', 'Correct');
check('2018-mbmt-upper-algebra-5', '2', 'Incorrect');
check('2019-mbmt-upper-algebra-6', '3039!/(3039*1018!*2^1000)', 'Correct');
const alternativesProblem = '2017-pumac-division-a-algebra-6';
check(alternativesProblem, '2', 'Correct');
check(alternativesProblem, '3', 'Correct');
check(alternativesProblem, '4', 'Incorrect');
check(alternativesProblem, '2,3', 'Correct');
check(alternativesProblem, '2, 4', 'Incorrect');
check('2006-lehigh-math-contest-21', '2(135-B)', 'Correct');
check('2006-lehigh-math-contest-30', 'n(n+5)-3', 'Correct');
check('2006-lehigh-math-contest-30', 'n^2+5n-3.0000000001', 'Incorrect');
check('2021-smt-algebra-1', '63(x-1)+1', 'Correct');
check('2008-pumac-division-a-algebra-8', 'x(x^5+x^3+34x+36)', 'Correct');
check('2008-pumac-division-a-algebra-7', 'x^3(x-x^2-1)', 'Correct');
check('2008-pumac-division-b-geometry-1', '9% decrease', 'Correct');
check('2008-pumac-division-b-geometry-1', 'decreases by 9%', 'Correct');
check('2008-pumac-division-b-geometry-1', '9% increase', 'Incorrect');
check('2010-pumac-division-b-algebra-6', '0', 'Correct');
check('2010-pumac-division-b-algebra-6', '2400', 'Correct');
check('2013-pumac-division-a-algebra-8', '2!*4!', 'Correct');
check('2013-pumac-division-a-algebra-8', '192', 'Incorrect');
check('2013-pumac-division-a-geometry-6', '13*(13+84/13)', 'Correct');
check('2017-pumac-division-a-geometry-8', '16', 'Correct');
check('2017-pumac-division-a-geometry-8', '33', 'Incorrect');
const polynomialSet = practice.create('Polynomial validation', 'Any', ['2021-smt-algebra-1']);
for (const input of ['(63x-62)(x-1)/(x-1)', '63y-62', 'x^1000', '63x-62,0']) {
  assert(practice.answer(polynomialSet, '2021-smt-algebra-1', input, false), input);
  assert.equal(practice.result(polynomialSet, '2021-smt-algebra-1'), 'Incorrect', input);
}
assert.equal(practice.exactTex('n^2+5n-3', 'polynomial', 'n'), 'n^{2}+5n-3');
check('2022-hmmt-november-theme-2', '16\\sqrt[4]{3}', 'Correct');
check('2019-hmmt-february-algebra-and-number-theory-8', '4038!^2/(2019!^4*2^8076)', 'Correct');
check('2026-hmmt-november-theme-4', '1013*2027!/2027', 'Correct');
check('2026-hmmt-november-theme-4', '1013*2026!+1', 'Incorrect');
answers['factorial-test'] = { answers: ['202!'] };
check('factorial-test', '203!/203', 'Correct');
check('factorial-test', '1.000000000000000000000000000000000000000000000001*202!', 'Incorrect');
delete answers['factorial-test'];
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
check('2018-hmmt-february-combinatorics-2', '11,100,110', 'Correct');
check('2025-hmmt-february-algebra-and-number-theory-1', '102+1', 'Correct');
check('2025-hmmt-february-algebra-and-number-theory-1', '102.999999999', 'Incorrect');
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

answers['tiny-value'] = { answers: ['0.000000000001'] };
check('tiny-value', 'pi-pi', 'Incorrect');
check('tiny-value', 'pi+1/10^12-pi', 'Correct');
check('tiny-value', 'pi+2/10^12-pi', 'Incorrect');
check('tiny-value', 'sqrt(2)-sqrt(2)', 'Incorrect');
answers['exact-one'] = { answers: ['1'] };
check('exact-one', 'y=2x', 'Incorrect');
check('exact-one', '(x,F_4)', 'Incorrect');
assert.equal(practice.exactTex('y=2x'), 'y=2x');
assert.equal(practice.exactTex('A_{104}/z'), '\\frac{A_{104}}{z}');
check('exact-one', '(4096!)^4/(4096!)^4', 'Correct');
check('exact-one', '(3*(4096!)^4)/((4096!)^4*3)', 'Correct');
check('exact-one', 'pi*(1/pi)', 'Correct');
check('exact-one', 'sqrt(2)^2/2', 'Correct');
check('exact-one', 'sin(30°)+cos(pi/3)', 'Correct');
check('exact-one', 'pi-pi+1.000000000000000001', 'Incorrect');
const invalidSet = practice.create('Undefined expressions', 'Any', ['exact-one']);
for (const input of ['(pi-pi)/(pi-pi)', '(1/0)/(1/0)', '1/(1/0)', 'sqrt(-1)/sqrt(-1)', '0^0/0^0', 'tan(pi/2)/tan(pi/2)']) {
  assert(!practice.answer(invalidSet, 'exact-one', input, false), input);
}
answers['factored-power'] = { answers: ['2'] };
check('factored-power', '2^12000/2^11999', 'Correct');
check('factored-power', '(4096!)^4/(4096!)^4+1', 'Correct');
answers['irrational-sum'] = { answers: ['1+sqrt(2)'] };
check('irrational-sum', '(4096!)^4/(4096!)^4+sqrt(2)', 'Correct');
answers['complex-root'] = { format: 'complex', answers: ['(1+i)/sqrt(2)'] };
check('complex-root', 'sqrt(i)', 'Correct');
check('complex-root', '-sqrt(i)', 'Incorrect');
answers['complex-integer'] = { format: 'complex', answers: ['2+i'] };
check('complex-integer', 'sqrt(3+4i)', 'Correct');
check('complex-integer', 'sqrt(3-4i)', 'Incorrect');
check('complex-integer', '2+i^2025', 'Correct');
check('complex-integer', '2+(sqrt(i))^2', 'Correct');
for (const slug of ['tiny-value', 'exact-one', 'factored-power', 'irrational-sum', 'complex-root', 'complex-integer']) delete answers[slug];

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
