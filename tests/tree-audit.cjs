const assert = require('node:assert/strict');
const { census, report } = require('../tools/tree-audit.js');
const tree = [['cp', 'Counting', null], ['cp.a', 'A', 'cp'], ['cp.b', 'B', 'cp'], ['cp.c', 'C', 'cp']];
const p = (ref, strategy, tags = ['cp.a']) => ({ ref, strategy, tree: tags, formulas: ['card'] });
const problems = [
  p('2024 AMC 10A, Problem 1', 'shared'), p('2024 AMC 12A, Problem 1', 'shared'),
  p('2024 AMC 12B, Problem 1', 'shared'),
  p('2023 AMC 12A, Problem 1', 'shared'),
  p('2024 Fall AMC 12A, Problem 1', 'shared'),
  p('2024 AMC 8, Problem 1', 'shared', ['cp.a', 'cp.b']),
  p('2024 AMC 10A, Problem 2', 'repeated', ['cp.b']),
  p('2024 AMC 10A, Problem 3', 'repeated', ['cp.b']),
  p('2024 AMC 12A, Problem 3', 'repeated', ['cp.b']), // ambiguous strategy
  p('2024 AIME I, Problem 1', 'parent', ['cp']),
  { ref: 'unfiled', formulas: [] }
];
const { nodes } = census(tree, problems, { card: 'cp.c', general: null });
assert.equal(nodes.get('cp.a').problems.length, 6);
assert.equal(nodes.get('cp.a').distinct, 5);
assert.equal(nodes.get('cp.a').sole.length, 5);
assert.equal(nodes.get('cp.a').soleDistinct, 4);
assert.equal(nodes.get('cp.b').distinct, 4);
assert.equal(nodes.get('cp.c').distinct, 0);
assert.deepEqual(nodes.get('cp.c').homes, ['card']);
let output = [];
const log = console.log;
try {
  console.log = s => output.push(s);
  report(tree, problems, { card: 'cp.c' }, ['2024 AMC 8', '--census']);
} finally { console.log = log; }
const text = output.join('\n');
assert.match(text, /Filed problems in "2024 AMC 8": 1/);
assert.match(text, /cp.b \(B\): 4 raw, 4 distinct/);
assert.match(text, /cp.c \(C\): 0 raw, 0 distinct.*card homes: card/);
assert.match(text, /Internal nodes ranked/);
assert.match(text, /#\/f\/card/);
assert.match(text, /not failures/);
console.log('OK - audit counts, conservative twins, unused/thin leaves, homes and scoped reports');
