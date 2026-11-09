const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { inspectTree } = require('../tools/topic-tree-structure.cjs');
const { report } = require('../tools/tree-audit.js');
const roots = [['alg', 'Algebra', null], ['cp', 'Counting', null], ['geo', 'Geometry', null], ['nt', 'Numbers', null]];
const tree = [...roots, ['cp.new', 'New area', 'cp'], ['cp.old', 'Old area', 'cp'],
  ['cp.old.topic', 'Moved topic', 'cp.new'], ['cp.old.topic.leaf', 'Leaf', 'cp.old.topic']];
const checked = inspectTree(tree);
assert.deepEqual(checked.bad, []);
assert.deepEqual(checked.ancestors('cp.old.topic.leaf'), ['cp.old.topic', 'cp.new', 'cp']);
assert(!checked.ancestors('cp.old.topic.leaf').includes('cp.old'));
const withLast = row => [...tree.slice(0, -1), row];
assert.match(inspectTree(withLast(['cp.old.topic.leaf', 'Leaf', 'cp.missing'])).bad.join(), /missing parent/);
assert.match(inspectTree([...tree, ['cp.new', 'Duplicate', 'cp']]).bad.join(), /listed twice/);
assert.match(inspectTree(withLast(['cp.old.topic.leaf', 'Leaf', 'geo'])).bad.join(), /outside its subject/);
const cycle = [...roots, ['cp.a', 'A', 'cp.b'], ['cp.b', 'B', 'cp.a']];
assert.match(inspectTree(cycle).bad.join(), /parent cycle/);
assert.equal(inspectTree(cycle).ancestors('cp.a').length, 1); // invalid data cannot hang the gate
assert.match(inspectTree([...tree, ['cp.deep', 'Deep', 'cp.old.topic.leaf'], ['cp.deeper', 'Too deep', 'cp.deep']]).bad.join(), /five levels/);
assert.match(inspectTree(tree.filter(([id]) => id !== 'alg')).bad.join(), /missing root/);
assert.match(inspectTree([...tree, ['other', 'Other', null]]).bad.join(), /unknown subject/);

// Audit card coverage must follow the new parent, not the old id spelling.
const output = [], log = console.log;
try {
  console.log = line => output.push(line);
  report(tree, [
    { ref: 'covered', tree: ['cp.old.topic.leaf'], formulas: ['new-home'] },
    { ref: 'uncovered', tree: ['cp.old.topic.leaf'], formulas: ['old-home'] }
  ], { 'new-home': 'cp.new', 'old-home': 'cp.old' }, []);
} finally { console.log = log; }
assert(!output.some(line => line.startsWith('   covered:')));
assert(output.some(line => line.startsWith('   uncovered: cp.old')));

// Run the real filing gate against a small injected corpus. A new parent plus
// its moved leaf is redundant; the old prefix node plus that leaf is not.
function filingGate(tags) {
  let status;
  const sandbox = { __dirname: path.join(__dirname, '../tools'),
    MATH_SECTIONS: [], MATH_TOPIC_HOMES: {}, MATH_TOPIC_TREE: tree,
    MATH_PROBLEM_DB: [{ ref: 'fixture', tree: tags }],
    console: { log() {} }, process: { exit(code) { status = code; } },
    require(id) {
      if (id === 'path') return path;
      if (id === './topic-tree-structure.cjs') return require('../tools/topic-tree-structure.cjs');
      assert(id.includes(path.join('js', 'data')), id);
    }
  };
  sandbox.global = sandbox;
  require('node:vm').runInNewContext(require('node:fs').readFileSync(
    path.join(__dirname, '../tools/check-topic-tree.js'), 'utf8'), sandbox);
  return status;
}
assert.equal(filingGate(['cp.new', 'cp.old.topic.leaf']), 1);
assert.equal(filingGate(['cp.old', 'cp.old.topic.leaf']), 0);

// Exercise the Markdown builder too: indentation is authoritative, even when
// the former prefix node still exists elsewhere in the tree.
function build(body) {
  const text = '## The four trees\n### Algebra `[alg]`\n### Counting `[cp]`\n' + body +
    '\n### Geometry `[geo]`\n### Numbers `[nt]`\n## End\n';
  const result = spawnSync('python3', ['-c',
    'import importlib.util,json,sys; s=importlib.util.spec_from_file_location("builder","tools/build-topic-tree.py"); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); print(json.dumps(m.parse_text(sys.stdin.read())))'],
  { cwd: path.join(__dirname, '..'), input: text, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}
const [built, errors] = build('- New `[cp.new]`\n  - Moved `[cp.old.topic]`\n- Old `[cp.old]`');
assert.deepEqual(errors, []);
assert.equal(built.find(n => n.id === 'cp.old.topic').parent, 'cp.new');
assert.match(build('- New `[cp.new]`\n    - Skipped level `[cp.old.topic]`')[1].join(), /missing parent/);
assert.match(build('- New `[cp.new]`\n   - Odd indent `[cp.old.topic]`')[1].join(), /pairs of spaces/);
assert.match(build('- Foreign `[geo.topic]`')[1].join(), /outside its subject/);
assert.match(build('- A `[cp.a]`\n- Duplicate `[cp.a]`')[1].join(), /used twice/);
console.log('OK - stable-id moves, actual ancestry, cycles, subjects, depth, audit coverage and Markdown parentage');
