const assert = require('node:assert/strict');
const { build, label } = require('../js/practice-topics.js');
const tree = [['geo', 'Geometry', null], ['geo.tri', 'Triangles', 'geo'],
  ['geo.old.sim', 'Similar triangles', 'geo.tri'], ['geo.old.parallel', 'Parallel cuts', 'geo.old.sim'],
  ['geo.circ', 'Circles', 'geo'], ['geo.circ.sim', 'Similar triangles', 'geo.circ']];
const problems = [
  { ref:'2024 AMC 10A, Problem 1', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2024 AMC 12A, Problem 2', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2024 AIME I, Problem 1', tree:['geo.tri'] },
  { ref:'2024 AIME I, Problem 2', tree:['geo.old.parallel','geo.circ.sim'] },
  { ref:'2024 AMC 10B, Problem 1', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2024 AMC 12B, Problem 2', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2021 Spring AMC 10A, Problem 1', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2021 Fall AMC 12A, Problem 1', strategy:'shared', tree:['geo.old.parallel'] },
  { ref:'2024 AIME I, Problem 3', formulas:['parallel'], tree:['geo.circ.sim'] },
  { ref:'2024 AIME I, Problem 4', tree:['geo.old.parallel'], voided:true },
  { ref:'2024 AIME I, Problem 5', tree:['geo.old.parallel'], noAnswer:true }
];
const index = build(tree, problems, p => !p.voided && !p.noAnswer);
assert.equal(index.nodes.get('geo.old.parallel').problems.length, 5);
assert.equal(index.nodes.get('geo.tri').problems.length, 6, 'include direct parent and all descendants');
assert.equal(index.nodes.get('geo').problems.length, 7, 'cofiling below one subject counts once');
assert.equal(index.nodes.get('geo.circ').problems.length, 2);
assert.deepEqual(index.nodes.get('geo.old.parallel').path, ['Geometry','Triangles','Similar triangles','Parallel cuts']);
assert.equal(index.resolve('Similar triangles'), null, 'ambiguous names require a choice');
assert.equal(index.resolve('Geometry › Triangles › Similar triangles').id, 'geo.old.sim');
assert.equal(index.search('similar triangles')[0].label, 'Similar triangles');
assert.equal(index.search('geometry parallel')[0].id, 'geo.old.parallel');
assert.deepEqual(index.search('').map(n => n.id), ['mixed', 'geo']);
assert.equal(index.resolve('Mixed').id, 'mixed');
assert.equal(index.nodes.get('mixed').problems.length, 7, 'Mixed draws every eligible problem once');
assert.equal(index.resolve('Heron formula'), null, 'card labels are not topic options');
assert.equal(label(String.raw`Denesting $\sqrt{a+\sqrt b}$`), 'Denesting √(a+√b)');
const ambiguous = build(tree, [
  {ref:'2024 AMC 10A, Problem 1',strategy:'same',tree:['geo.tri']},
  {ref:'2024 AMC 10A, Problem 2',strategy:'same',tree:['geo.tri']},
  {ref:'2024 AMC 12A, Problem 3',strategy:'same',tree:['geo.tri']}
]);
assert.equal(ambiguous.nodes.get('geo').problems.length, 3, 'do not guess when a twin group is ambiguous');
// Verify every real branch against the existing audit oracle and answer providers.
global.window = global;
for (const f of ['topic-tree','topic-homes','problems/problem-db','problems/answer-keys','problems/mock-extras']) require('../js/data/'+f);
const slug = p => p.ref.replace(', Problem ', ' ').toLowerCase().replaceAll(' ', '-');
const eligible = p => !MATH_ANSWER_KEYS.voided?.[slug(p)] &&
  (MATH_ANSWER_KEYS.answers[slug(p)] != null || !!MATH_MOCK_EXTRAS[slug(p)]);
const real = build(MATH_TOPIC_TREE, MATH_PROBLEM_DB, eligible);
const {nodes,instance} = require('../tools/tree-audit').census(MATH_TOPIC_TREE, MATH_PROBLEM_DB, MATH_TOPIC_HOMES);
for (const n of nodes.values()) {
  const ids = new Set([n.id]);
  for (const id of ids) for (const child of nodes.get(id).children) ids.add(child);
  const expected = new Set(MATH_PROBLEM_DB.filter(p => eligible(p) && p.tree.some(t => ids.has(t))).map(p => instance.get(p.ref)));
  assert.deepEqual(new Set(real.nodes.get(n.id).problems.map(p => instance.get(p.ref))), expected, n.id);
  assert(!/[$\\]/.test(real.nodes.get(n.id).label), 'readable input label: '+n.id);
  assert(real.search(real.nodes.get(n.id).label).some(hit => hit.id === n.id), 'every node is reachable: '+n.id);
}
assert.equal(real.nodes.get('geo').problems.filter(p => /HMMT/.test(p.ref)).length, 10);
const P = require('../js/practice-sessions');let data='[]';
const storage={getItem:()=>data,setItem:(_,s)=>{data=s}};
const set = P.create('Similar triangles','Any',['example']);set.topicId='geo.old.sim';P.save(storage,set);
assert.equal(P.read(storage)[0].topicId,'geo.old.sim');
console.log('Practice topics: all tree pools, explicit ancestry, conservative twins, eligibility, exact-value sources, search and saved topic IDs passed.');
