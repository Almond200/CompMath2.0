const assert = require('node:assert/strict');
const P = require('../js/practice-sessions.js');
global.MATH_ANSWER_KEYS = { answers: { amc: 'C', aime: '7', missing: undefined } };
let raw = null;
const storage = { getItem: () => raw, setItem: (_, value) => { raw = value; } };
const s = P.create('Geometry', 'Any', ['amc', 'aime'], 1000);
assert(!('stopwatch' in s));
assert(P.answer(s, 'amc', 'C', false));
assert(!P.answer(s, 'amc', 'F', false));
// Columbus State papers have six choices, A to F (2026-11-22).
{ const c=P.create('Columbus',null,['2015-columbus-state-tournament-3']); assert(P.answer(c,'2015-columbus-state-tournament-3','F',false)); };
assert(P.answer(s, 'aime', '007', true));
for (const invalid of ['1000','-1','1.2','0007','999+1','sqrt(2)','7,7']) assert(!P.answer(s, 'aime', invalid, true));
assert.equal(P.result(s, 'amc'), 'Correct');
assert.equal(P.result(s, 'aime'), 'Correct', 'leading zeros compare numerically');
assert(P.answer(s, 'aime', '3!+1', true));
assert.equal(P.result(s, 'aime'), 'Correct', 'a keypad expression can evaluate to the required integer');
assert(P.answer(s, 'aime', '007', true));
P.answer(s, 'amc', 'D', false);
assert.equal(P.result(s, 'amc'), 'Incorrect');
P.answer(s, 'amc', '', false);
assert.equal(P.result(s, 'amc'), 'Unanswered');
// A voided problem is never graded, answered or not.
global.MATH_ANSWER_KEYS.voided = { aime: 'voided' };
assert.equal(P.result(s, 'aime'), 'Voided');
delete global.MATH_ANSWER_KEYS.voided;
assert.equal(P.result(s, 'aime'), 'Correct');
for(let i=0;i<200;i++){ assert(P.answer(s,'amc','C',false)); assert(P.answer(s,'amc','',false)); }
P.answer(s,'amc','C',false);
s.current = 1; s.marks.aime = true;
P.save(storage, s);
let loaded = P.read(storage)[0];
assert.equal(loaded.answers.aime, '007');assert.equal(loaded.current, 1);assert.equal(loaded.marks.aime, true);
assert.equal(loaded.status, 'paused');
P.finish(s, 10000);P.save(storage,s);
assert(!P.answer(s,'amc','A',false));
assert.equal(P.read(storage)[0].status,'finished');
const old = {...s, stopwatch:true,elapsed:123000,runningSince:100,reviews:{amc:'revisit'}};
raw=JSON.stringify([old]);loaded=P.read(storage)[0];
assert(!('stopwatch' in loaded));assert(!('elapsed' in loaded));
assert.equal(P.result(loaded,'amc'),'Correct','old self-check cannot override key');
loaded.answers.missing='A';assert.equal(P.result(loaded,'missing'),'Answer unavailable');
assert.throws(()=>P.save({getItem:()=>'{bad',setItem(){assert.fail();}},s));
assert.throws(()=>P.save({getItem:()=>'[]',setItem(){throw Error('quota');}},s));

global.MATH_MOCK_EXTRAS = { radical: { answers: ['79507'] }, numbers: { format: 'set', answers: ['1,234'] } };
const typed = P.create('Typed answers', 'Any', ['radical', 'numbers']);
for (const input of ['sqrt(6,321,363,049)', 'sqrt(6, 321, 363, 049)', '\\sqrt{6,321,363,049}']) {
  assert.equal(P.exactTex(input), '\\sqrt{6{,}321{,}363{,}049}');
  assert(P.answer(typed, 'radical', input, false));
  assert.equal(P.result(typed, 'radical'), 'Correct');
}
assert.equal(P.exactTex('6,321,363,049'), '6{,}321{,}363{,}049');
assert.equal(P.exactTex('1,234', 'set'), '1,\\ 234');
assert.equal(P.exactTex('(1,234)', 'tuple'), '\\left(1,\\ 234\\right)');
assert.equal(P.exactTex('4, sqrt(6,321,363,049)', 'sequence'), '4,\\ \\sqrt{6{,}321{,}363{,}049}');
assert.equal(P.exactTex('choose(12,345)+1,000'), '\\binom{12}{345}+1{,}000');
assert(P.answer(typed, 'numbers', '234,1', false));
assert.equal(P.result(typed, 'numbers'), 'Correct');
console.log('Practice sessions: automatic grades, leading zeros, rapid edits, persistence, legacy migration and storage failures passed.');
