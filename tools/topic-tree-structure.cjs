// Stable ids identify nodes; only explicit parent links define their ancestry.
function ancestorIds(nodes, id) {
  const out = [], seen = new Set([id]);
  let parent = nodes.get(id)?.parent;
  while (parent != null && nodes.has(parent) && !seen.has(parent)) {
    out.push(parent);
    seen.add(parent);
    parent = nodes.get(parent).parent;
  }
  return out;
}

function inspectTree(tree) {
  const nodes = new Map(), bad = [], roots = ['alg', 'cp', 'geo', 'nt'];
  for (const [index, [id, name, parent]] of tree.entries()) {
    if (nodes.has(id)) bad.push(`node ${id}: listed twice`);
    if (typeof id !== 'string' || !/^[a-z]+(?:\.[a-z]+)*$/.test(id)) bad.push(`node ${id}: invalid id`);
    if (typeof name !== 'string' || !name.trim()) bad.push(`node ${id}: no name`);
    nodes.set(id, { id, name, parent, index });
  }
  for (const root of roots) if (nodes.get(root)?.parent !== null) bad.push(`subject ${root}: missing root`);
  for (const n of nodes.values()) {
    if (n.parent === null) {
      if (!roots.includes(n.id)) bad.push(`node ${n.id}: unknown subject root`);
      continue;
    }
    if (!nodes.has(n.parent)) { bad.push(`node ${n.id}: missing parent ${n.parent}`); continue; }
    if (nodes.get(n.parent).index >= n.index) bad.push(`node ${n.id}: parent must precede its child`);
    const seen = new Set([n.id]);
    let current = n, depth = 0;
    while (current.parent !== null && nodes.has(current.parent)) {
      if (seen.has(current.parent)) { bad.push(`node ${n.id}: parent cycle`); break; }
      seen.add(current.parent);
      current = nodes.get(current.parent);
      depth++;
    }
    if (current.parent === null && (typeof n.id !== 'string' || n.id.split('.')[0] !== current.id))
      bad.push(`node ${n.id}: outside its subject ${current.id}`);
    if (depth > 4) bad.push(`node ${n.id}: exceeds five levels`);
  }
  return { nodes, bad, ancestors: id => ancestorIds(nodes, id) };
}
module.exports = { ancestorIds, inspectTree };
