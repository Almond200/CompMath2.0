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
  function build(tree, problems, eligible = () => true) {
    const nodes = new Map(tree.map(([id, name, parent]) => [id,
      { id, name, label: label(name), parent, children: [], path: [], problems: new Map() }]));
    for (const n of nodes.values()) if (n.parent) nodes.get(n.parent).children.push(n.id);
    for (const n of nodes.values()) {
      let p = n;
      while (p) { n.path.unshift(p.label); p = nodes.get(p.parent); }
      n.breadcrumb = n.path.join(' › ');
    }
    // Match the audit's conservative twin rule: exactly one 10/12 pair in the same
    // year, season and paper letter with an identical written strategy.
    const groups = new Map(), identity = new Map(problems.map(p => [p.ref, p.ref]));
    for (const p of problems) {
      const m = p.ref.match(/^(\d{4}(?: Fall| Spring)?) AMC (10|12)([AB]?),/);
      if (!m || !p.strategy) continue;
      const key = m[1] + '|' + m[3] + '|' + p.strategy;
      if (!groups.has(key)) groups.set(key, { ten: [], twelve: [] });
      groups.get(key)[m[2] === '10' ? 'ten' : 'twelve'].push(p);
    }
    for (const { ten, twelve } of groups.values()) if (ten.length === 1 && twelve.length === 1)
      identity.set(twelve[0].ref, ten[0].ref);
    // Mixed (owner, 2026-11-11): not a tree node, but the first Practice choice, drawing from
    // every eligible problem in every subject.
    const mixed = { id: 'mixed', name: 'Mixed', label: 'Mixed', parent: null, children: [],
      path: ['Mixed'], breadcrumb: 'Mixed', problems: new Map(), mixed: true };
    for (const p of problems) {
      if (!eligible(p)) continue;
      if (!mixed.problems.has(identity.get(p.ref))) mixed.problems.set(identity.get(p.ref), p);
      for (const id of p.tree || []) {
        let n = nodes.get(id);
        while (n) { if (!n.problems.has(identity.get(p.ref))) n.problems.set(identity.get(p.ref), p); n = nodes.get(n.parent); }
      }
    }
    nodes.set(mixed.id, mixed);
    const aliases = new Map();
    for (const n of nodes.values()) {
      n.problems = [...n.problems.values()];
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
    return { nodes, roots, resolve, search };
  }
  const api = { build, label };
  if (typeof module !== 'undefined') module.exports = api;
  else root.PracticeTopics = api;
})(typeof window === 'undefined' ? globalThis : window);
