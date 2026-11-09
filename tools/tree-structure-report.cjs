// Read-only structural census for TREE-REVIEW.md. Counts use descendant unions,
// not sums of leaf populations. No filing is inferred or changed here.
// node tools/tree-structure-report.cjs > /tmp/tree-structure.json
const path = require('node:path');
const { census } = require('./tree-audit.js');
global.window = global;
for (const file of ['topic-tree', 'topic-homes', 'problems/problem-db'])
  require(path.join(__dirname, '../js/data', file + '.js'));
const problems = window.MATH_PROBLEM_DB;
const { nodes, instance } = census(window.MATH_TOPIC_TREE, problems, window.MATH_TOPIC_HOMES);

function descendants(ids) {
  const out = new Set(ids);
  for (const id of out) {
    if (!nodes.has(id)) throw new Error('Unknown review node: ' + id);
    for (const child of nodes.get(id).children) out.add(child);
  }
  return out;
}
function pool(include, exclude = []) {
  const ids = descendants(include);
  for (const id of descendants(exclude)) ids.delete(id);
  const entries = problems.filter(p => p.tree.some(id => ids.has(id)));
  return {
    include, exclude, nodes: ids.size,
    leaves: [...ids].filter(id => !nodes.get(id).children.length).length,
    raw: entries.length,
    distinct: new Set(entries.map(p => instance.get(p.ref))).size,
    homes: [...ids].reduce((sum, id) => sum + nodes.get(id).homes.length, 0)
  };
}
const rows = [...nodes.values()].map(n => ({
  id: n.id, name: n.name, parent: n.parent, direct: n.problems.length,
  children: n.children.length, ...pool([n.id])
}));
// These are review groupings of CURRENT filings, not proposed ids or migrations.
const groups = [
  ['Arithmetic and proportional reasoning', ['alg.word.compute', 'alg.word.ratio', 'alg.word.units.convert']],
  ['Rates, time and everyday quantities', ['alg.word.rates', 'alg.word.everyday', 'alg.word.units.calendar']],
  ['Data and averages', ['alg.word.stats']],
  ['Choices, arrangements and distributions', ['cp.basic', 'cp.tech.stars', 'cp.tech.sym', 'cp.tech.bij', 'cp.struct.words', 'cp.struct.seat', 'cp.struct.part']],
  ['Paths, graphs and boards', ['cp.graph.basic', 'cp.graph.tour', 'cp.struct.paths', 'cp.struct.tile', 'cp.struct.catalan']],
  ['Sets and coefficient counts', ['cp.binom', 'cp.tech.pie', 'cp.tech.gf']],
  ['Probability and expectation', ['cp.prob', 'cp.exp']],
  ['Logic, games and bounds', ['cp.logic', 'cp.graph.sets']],
  ['Divisibility, primes and divisors', ['nt.div', 'nt.divisor', 'nt.prime']],
  ['Right triangles', ['geo.basic.pyth', 'geo.tri.special.right'], ['geo.basic.pyth.fold']],
  ['Isosceles triangles', ['geo.basic.angle.isosceles', 'geo.tri.special.isos']],
  ['Counting with rotations and reflections', ['cp.tech.sym']],
  ['Polynomial values and interpolation', ['alg.poly.remainder.values', 'alg.poly.construct.interp']]
].map(([name, include, exclude]) => ({ name, ...pool(include, exclude) }));
const leaves = rows.filter(n => !n.children);
function coverage(root, destinations) {
  const source = descendants([root]);
  const covered = descendants(destinations.flatMap(p => p.include));
  return {
    root,
    uncoveredProblems: problems.filter(p => p.tree.some(id => source.has(id)) &&
      !p.tree.some(id => covered.has(id))).map(p => p.ref),
    uncoveredCardHomes: Object.entries(window.MATH_TOPIC_HOMES)
      .filter(([, id]) => source.has(id) && !covered.has(id)).map(([card]) => card)
  };
}
console.log(JSON.stringify({
  note: 'Distinct collapses recognized exact-strategy AMC 10/12 twins only. Cross-filed branch counts do not add. Proposed pools still contain filings that need reading.',
  totals: { raw: problems.length, distinct: new Set(instance.values()).size,
    nodes: nodes.size, internal: rows.length - leaves.length, leaves: leaves.length,
    thinLeaves: leaves.filter(n => n.distinct < 5).length,
    unusedLeaves: leaves.filter(n => !n.raw).length },
  subjects: rows.filter(n => !n.parent),
  areas: rows.filter(n => n.parent && !nodes.get(n.parent).parent),
  largestLeaves: leaves.slice().sort((a, b) => b.distinct - a.distinct || a.id.localeCompare(b.id)).slice(0, 20),
  thinLeaves: leaves.filter(n => n.distinct < 5).sort((a, b) => a.distinct - b.distinct || a.id.localeCompare(b.id)),
  proposedPools: groups,
  destinationCoverage: [coverage('alg.word', groups.slice(0, 3)), coverage('cp', groups.slice(3, 8))]
}, null, 2));
