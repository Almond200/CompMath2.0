// T3 review prompts, never taxonomy failures. Read statements before changing filings.
// node tools/tree-audit.js ["2009 AMC 8"] [--thin] [--census]
// Thin/census counts cover all filed papers, even with a paper prefix.
const path = require("node:path");

function census(tree, problems, homes) {
  const nodes = new Map(tree.map(([id, name, parent]) => [id, {
    id, name, parent, children: [], problems: [], sole: [], homes: []
  }]));
  for (const node of nodes.values()) if (node.parent) nodes.get(node.parent).children.push(node.id);
  for (const [card, home] of Object.entries(homes)) if (home && nodes.has(home)) nodes.get(home).homes.push(card);
  // Conservative estimate: only one AMC 10 and one AMC 12, same year,
  // season, paper letter and exact strategy. Reworded twins remain separate.
  const groups = new Map(), instance = new Map(problems.map(p => [p.ref, p.ref]));
  for (const p of problems) {
    const m = p.ref.match(/^(\d{4}(?: Fall| Spring)?) AMC (10|12)([AB]?),/);
    if (!m || !p.strategy) continue;
    const key = `${m[1]}|${m[3]}|${p.strategy}`;
    if (!groups.has(key)) groups.set(key, { ten: [], twelve: [] });
    groups.get(key)[m[2] === "10" ? "ten" : "twelve"].push(p);
  }
  for (const { ten, twelve } of groups.values()) if (ten.length === 1 && twelve.length === 1)
    instance.set(twelve[0].ref, ten[0].ref);
  for (const p of problems) for (const id of p.tree || []) {
    const node = nodes.get(id);
    if (!node) throw new Error(`${p.ref}: unknown tree node ${id}`);
    node.problems.push(p);
    if (p.tree.length === 1) node.sole.push(p);
  }
  for (const node of nodes.values()) {
    node.distinct = new Set(node.problems.map(p => instance.get(p.ref))).size;
    node.soleDistinct = new Set(node.sole.map(p => instance.get(p.ref))).size;
  }
  return { nodes, instance };
}

function report(tree, problems, homes, args) {
  const full = args.includes("--census"), showThin = full || args.includes("--thin");
  const prefix = args.find(a => !a.startsWith("--")) || "";
  const filed = problems.filter(p => p.tree && p.ref.startsWith(prefix));
  const { nodes, instance } = census(tree, problems, homes);
  const related = (a, b) => a === b || a.startsWith(b + ".") || b.startsWith(a + ".");
  const summary = n => `${n.id} (${n.name}): ${n.problems.length} raw, ${n.distinct} distinct; ${n.sole.length} sole-label (${n.soleDistinct} distinct)`;
  const samples = ps => {
    const seen = new Set();
    for (const p of ps) {
      const key = instance.get(p.ref);
      if (seen.has(key)) continue;
      seen.add(key);
      const cards = [...new Set([...(p.formulas || []), ...(p.trickFormulas || [])])];
      console.log(`      ${p.ref}; cards: ${cards.map(c => `${c} (#/f/${c})`).join(", ") || "none"}`);
      if (seen.size === 5) break;
    }
  };
  console.log(`Filed problems${prefix ? ` in "${prefix}"` : ""}: ${filed.length}\n`);
  console.log("1. Filed on a broad parent (a node with subtopics):");
  let broad = 0;
  for (const p of filed) for (const t of p.tree.filter(t => nodes.get(t).children.length)) {
    broad++; console.log(`   ${p.ref}: ${t} (${nodes.get(t).name})`);
  }
  if (!broad) console.log("   none");
  console.log("\n2. Terminal leaves below five distinct problems (all filed papers, including unused leaves):");
  const thin = [...nodes.values()].filter(n => !n.children.length && n.distinct < 5)
    .sort((a, b) => a.distinct - b.distinct || a.id.localeCompare(b.id));
  console.log(`   ${thin.length} leaves; ${thin.filter(n => !n.problems.length).length} unused. Counts are review prompts, not failures.`);
  if (showThin) for (const n of thin) {
    console.log(`   ${summary(n)}; card homes: ${n.homes.join(", ") || "none"}`);
    samples(n.problems);
  }
  else console.log("   List with --thin; --census also ranks parents and frequent leaves.");
  console.log("\n3. Main-route card homes not covered by the filing:");
  let uncovered = 0;
  for (const p of filed) {
    const missing = [...new Set((p.formulas || []).map(c => homes[c]).filter(Boolean))]
      .filter(h => !p.tree.some(t => related(t, h)));
    if (missing.length) {
      uncovered++;
      console.log(`   ${p.ref}: ${missing.map(h => `${h} (${nodes.get(h).name})`).join("; ")}`);
    }
  }
  if (!uncovered) console.log("   none");
  if (full) {
    console.log("\n4. Internal nodes ranked by direct assignments (all papers; first 20):");
    for (const n of [...nodes.values()].filter(n => n.children.length && n.problems.length)
      .sort((a, b) => b.problems.length - a.problems.length || a.id.localeCompare(b.id)).slice(0, 20)) {
      console.log(`   ${summary(n)}`); samples(n.problems);
    }
    console.log("\n5. Frequent leaves (at least 25 raw), ranked by sole-label proportion (first 20):");
    for (const n of [...nodes.values()].filter(n => !n.children.length && n.problems.length >= 25)
      .sort((a, b) => b.sole.length / b.problems.length - a.sole.length / a.problems.length || a.id.localeCompare(b.id)).slice(0, 20)) {
      console.log(`   ${summary(n)}; ${(100 * n.sole.length / n.problems.length).toFixed(1)}% sole-label`);
      samples(n.sole.length ? n.sole : n.problems);
    }
  }
  console.log("\nDistinct counts collapse recognized same-paper AMC 10/12 twins by exact strategy; reworded twins may remain separate.");
  console.log("These are prompts to read, not errors. A card home can be a tool used in passing; reading also catches central ideas with no cited card.");
}

if (require.main === module) {
  global.window = global;
  for (const f of ["topic-tree", "topic-homes", "problems/problem-db"]) require(path.join(__dirname, "../js/data", f + ".js"));
  report(window.MATH_TOPIC_TREE, window.MATH_PROBLEM_DB, window.MATH_TOPIC_HOMES, process.argv.slice(2));
}
module.exports = { census, report };
