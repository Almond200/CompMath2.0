// Read-only review signals, not automatic misfiling or deletion decisions.
// node tools/tree-risk-audit.cjs > /tmp/tree-risk-audit.json
const { census } = require('./tree-audit.js');

function riskAudit(tree, problems, homes) {
  const { nodes, instance } = census(tree, problems, homes);
  const unique = entries => new Set(entries.map(p => instance.get(p.ref))).size;
  const descendants = id => {
    const ids = new Set([id]);
    for (const t of ids) for (const child of nodes.get(t).children) ids.add(child);
    return ids;
  };
  const rows = [...nodes.values()].map(n => {
    const ids = descendants(n.id);
    const entries = problems.filter(p => (p.tree || []).some(id => ids.has(id)));
    const leaves = [...ids].map(id => nodes.get(id)).filter(n => !n.children.length);
    return {
      id: n.id, name: n.name, parent: n.parent, children: n.children.length,
      raw: entries.length, distinct: unique(entries),
      directRaw: n.problems.length, directDistinct: n.distinct,
      soleDistinct: n.soleDistinct,
      leaves: leaves.length, thinLeaves: leaves.filter(n => n.distinct < 5).length,
      homes: [...ids].reduce((sum, id) => sum + nodes.get(id).homes.length, 0),
      sampleRefs: [...new Set(n.problems.map(p => instance.get(p.ref)))].slice(0, 5)
    };
  });
  const leaves = rows.filter(n => !n.children);
  const thin = leaves.filter(n => n.distinct < 5);
  const thinIds = new Set(thin.map(n => n.id));
  const thinEntries = problems.filter(p => (p.tree || []).some(id => thinIds.has(id)));
  const parentEntries = problems.filter(p => (p.tree || []).some(id => nodes.get(id).children.length));
  const pairs = new Map();
  for (const p of problems) {
    const tags = [...new Set(p.tree || [])].sort();
    for (let i = 0; i < tags.length; i++) for (let j = i + 1; j < tags.length; j++) {
      const key = tags[i] + '|' + tags[j];
      if (!pairs.has(key)) pairs.set(key, new Set());
      pairs.get(key).add(instance.get(p.ref));
    }
  }
  const cofilings = [...pairs].map(([key, refs]) => {
    const [a, b] = key.split('|'), aSize = nodes.get(a).distinct, bSize = nodes.get(b).distinct;
    return { a, b, shared: refs.size, aSize, bSize,
      smallerPoolShare: refs.size / Math.min(aSize, bSize), sampleRefs: [...refs].slice(0, 5) };
  }).filter(p => p.shared >= 3).sort((a, b) => b.smallerPoolShare - a.smallerPoolShare || b.shared - a.shared || a.a.localeCompare(b.a));
  const rawContestFamilies = {}, labelCounts = {};
  for (const p of problems) {
    const family = /AJHSME|AMC 8,/.test(p.ref) ? 'AMC 8/AJHSME' : /AMC 1[02]/.test(p.ref) ? 'AMC 10/12' :
      /AIME/.test(p.ref) ? 'AIME' : /HMMT/.test(p.ref) ? 'HMMT' : 'Other';
    rawContestFamilies[family] = (rawContestFamilies[family] || 0) + 1;
    const count = (p.tree || []).length;
    labelCounts[count] = (labelCounts[count] || 0) + 1;
  }
  return {
    note: 'Distinct collapses recognized exact-strategy AMC 10/12 twins only. Branch counts are descendant unions. Cofiling uses direct labels and does not establish redundancy; thin leaves do not establish irrelevance.',
    totals: { raw: problems.length, distinct: unique(problems), nodes: nodes.size, leaves: leaves.length,
      thinLeaves: thin.length, unusedLeaves: thin.filter(n => !n.raw).length,
      thinProblemRaw: thinEntries.length, thinProblemDistinct: unique(thinEntries),
      thinHomes: thin.reduce((sum, n) => sum + n.homes, 0),
      parentProblemRaw: parentEntries.length, parentProblemDistinct: unique(parentEntries),
      parentAssignments: rows.filter(n => n.children).reduce((sum, n) => sum + n.directRaw, 0) },
    rawContestFamilies, labelCounts,
    subjects: rows.filter(n => !n.parent),
    areas: rows.filter(n => n.parent && nodes.get(n.parent).parent === null),
    parentFilings: rows.filter(n => n.children && n.directRaw).sort((a, b) => b.directDistinct - a.directDistinct || a.id.localeCompare(b.id)),
    thinLeaves: thin.sort((a, b) => a.distinct - b.distinct || a.id.localeCompare(b.id)),
    unaryBranches: rows.filter(n => n.children === 1),
    largestLeaves: leaves.sort((a, b) => b.distinct - a.distinct || a.id.localeCompare(b.id)).slice(0, 20),
    cofilings
  };
}
if (require.main === module) {
  global.window = global;
  for (const file of ['topic-tree', 'topic-homes', 'problems/problem-db']) require('../js/data/' + file + '.js');
  console.log(JSON.stringify(riskAudit(window.MATH_TOPIC_TREE, window.MATH_PROBLEM_DB, window.MATH_TOPIC_HOMES), null, 2));
}
module.exports = { riskAudit };
