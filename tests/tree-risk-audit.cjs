const assert = require('node:assert/strict');
const { riskAudit } = require('../tools/tree-risk-audit.cjs');
// The moved leaf retains its former spelling: ancestry must follow parents.
const tree = [['cp', 'Counting', null], ['cp.area', 'Area', 'cp'],
  ['cp.old.a', 'A', 'cp.area'], ['cp.area.b', 'B', 'cp.area'], ['cp.other', 'Other', 'cp']];
const pair = ['cp.old.a', 'cp.area.b'];
const problems = [
  { ref: '2024 AMC 10A, Problem 1', strategy: 'shared', tree: pair },
  { ref: '2024 AMC 12A, Problem 1', strategy: 'shared', tree: pair },
  { ref: '2024 AIME I, Problem 1', tree: pair },
  { ref: '2024 AIME I, Problem 2', tree: pair },
  { ref: '2024 AIME I, Problem 3', tree: ['cp.area'] },
  { ref: '2024 AIME I, Problem 4', tree: ['cp.other'] }
];
const r = riskAudit(tree, problems, { a: 'cp.old.a', b: 'cp.area.b', parent: 'cp.area', method: null });
assert.deepEqual(r.totals, { raw: 6, distinct: 5, nodes: 5, leaves: 3, thinLeaves: 3, unusedLeaves: 0,
  thinProblemRaw: 5, thinProblemDistinct: 4, thinHomes: 2,
  parentProblemRaw: 1, parentProblemDistinct: 1, parentAssignments: 1 });
assert.equal(r.areas.find(n => n.id === 'cp.area').distinct, 4);
assert.equal(r.areas.find(n => n.id === 'cp.area').homes, 3);
assert.equal(r.cofilings.length, 1);
assert.equal(r.cofilings[0].shared, 3);
assert.equal(r.cofilings[0].smallerPoolShare, 1);
assert.deepEqual(r.labelCounts, { 1: 2, 2: 4 });
assert.deepEqual(r.rawContestFamilies, { 'AMC 10/12': 2, AIME: 4 });
const empty = riskAudit([...tree, ['cp.empty', 'Empty', 'cp.area']], [], { a: 'cp.empty' });
assert.equal(empty.totals.unusedLeaves, 4);
assert.equal(empty.totals.thinHomes, 1);
assert.deepEqual(empty.cofilings, []);
assert.equal(empty.capacity.leaves.median, 0);
assert.equal(empty.capacity.internalTopics.median, null);
// Practice capacity is the union below a chosen node, with twins counted once.
// The leaf's old id spelling must neither add a level nor change its subject.
const nested = [['nt', 'Number theory', null], ['nt.area', 'Area', 'nt'],
  ['nt.topic', 'Topic', 'nt.area'], ['nt.old.deep.name', 'A', 'nt.topic'], ['nt.b', 'B', 'nt.topic']];
const capacity = riskAudit(nested, [
  { ref: '2024 AMC 10A, Problem 1', strategy: 'same', tree: ['nt.old.deep.name', 'nt.b'] },
  { ref: '2024 AMC 12A, Problem 1', strategy: 'same', tree: ['nt.old.deep.name', 'nt.b'] },
  { ref: '2024 AMC 8, Problem 1', tree: ['nt.old.deep.name'] },
  { ref: '2024 AIME I, Problem 1', tree: ['nt.topic'] }
], {}).capacity;
assert.deepEqual(capacity.leafDepths, { 4: 2 });
assert.equal(capacity.leaves.median, 1.5);
assert.equal(capacity.internalTopics.min, 3); // not 4 raw entries or 4 assignments
assert.equal(capacity.byContestFamily['AMC 8/AJHSME'].empty, 1);
assert.equal(capacity.byContestFamily['AMC 10/12'].max, 1);
assert.equal(capacity.bySubject.nt.oneToFour, 2);
console.log('OK - risk/capacity census uses parent links, twin-aware unions, family pools and distinct card homes');
