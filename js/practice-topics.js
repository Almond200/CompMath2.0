// Tree-backed topic practice. Card names and keywords never determine membership.
(function (root) {
  'use strict';
  function label(name) {
    return name.replace(/\$/g, '').replace(/\\tfrac12\b/g, '½')
      .replace(/\\tfrac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)').replace(/\\sqrt\s*([a-z0-9])/gi, '√$1')
      .replace(/\\sum\b/g, '∑').replace(/\\sin\b/g, 'sin')
      .replace(/\\mid\b/g, '|').replace(/\\equiv\b/g, '≡').replace(/\\pm\b/g, '±');
  }
  const normalize = text => String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  function build(tree, problems, eligible = () => true, forTopic) {
    const nodes = new Map(tree.map(([id, name, parent]) => [id,
      { id, name, label: label(name), parent, children: [], path: [], candidates: [] }]));
    for (const n of nodes.values()) if (n.parent) nodes.get(n.parent).children.push(n.id);
    for (const n of nodes.values()) {
      let p = n;
      while (p) { n.path.unshift(p.label); p = nodes.get(p.parent); }
      n.breadcrumb = n.path.join(' › ');
    }
    const identity = p => p.identity || p.slug || p.ref;
    // Mixed is the first Practice choice and includes every eligible appearance.
    const mixed = { id: 'mixed', name: 'Mixed', label: 'Mixed', parent: null, children: [],
      path: ['Mixed'], breadcrumb: 'Mixed', candidates: problems.filter(eligible), mixed: true };
    if (forTopic) {
      for (const n of nodes.values()) n.candidates = forTopic(n.id).filter(eligible);
    } else {
      for (const p of mixed.candidates) {
        const seen = new Set();
        for (let id of p.tree || []) {
          while (nodes.has(id) && !seen.has(id)) {
            seen.add(id);
            const node = nodes.get(id);
            node.candidates.push(p);
            id = node.parent;
          }
        }
      }
    }
    nodes.set(mixed.id, mixed);
    const aliases = new Map();
    for (const n of nodes.values()) {
      Object.defineProperty(n, "problems", { get: () => unique(n.candidates) });
      for (const text of [n.label, n.name, n.breadcrumb]) {
        const key = normalize(text);
        if (!aliases.has(key)) aliases.set(key, new Set());
        aliases.get(key).add(n.id);
      }
    }
    const resolve = text => {
      const ids = aliases.get(normalize(text));
      return ids?.size === 1 ? nodes.get([...ids][0]) : null;
    };
    const roots = [mixed, ...[...nodes.values()].filter(n => !n.parent && !n.mixed)];
    function search(query, limit = 7) {
      const key = normalize(query);
      if (!key) return roots.slice(0, limit);
      const words = key.split(' ');
      return [...nodes.values()].map((n, order) => {
        const title = normalize(n.label), raw = normalize(n.name), path = normalize(n.breadcrumb + ' ' + n.name);
        const rank = title === key || raw === key ? 0 : title.startsWith(key) ? 1 :
          words.every(w => title.includes(w) || raw.includes(w)) ? 2 :
          words.every(w => path.includes(w)) ? (words.some(w => title.includes(w)) ? 3 : 4) : Infinity;
        return { n, rank, order };
      }).filter(r => Number.isFinite(r.rank)).sort((a, b) => a.rank - b.rank || a.order - b.order)
        .slice(0, limit).map(r => r.n);
    }
    // Filter contests before choosing the representative of a shared AMC 10/12 problem.
    // Otherwise switching AMC 10 off can incorrectly lose its still-selected AMC 12 twin.
    function unique(pool) {
      const chosen = new Map();
      for (const p of pool) if (!chosen.has(identity(p))) chosen.set(identity(p), p);
      return [...chosen.values()];
    }
    const select = (id, predicate = () => true) => unique((nodes.get(id)?.candidates || []).filter(predicate));
    return { nodes, roots, resolve, search, unique, select };
  }
  const api = { build, label };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeTopics = api;
})(typeof window === 'undefined' ? globalThis : window);
