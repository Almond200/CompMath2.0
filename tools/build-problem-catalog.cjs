// Build the static catalog and solution files from the editorial sources.
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sources = require('../js/contest-sources.js');

const root = path.resolve(__dirname, '..');
global.window = {};
for (const file of ['problem-db', 'difficulty-ratings', 'contest-papers']) require(`../js/data/problems/${file}.js`);
require('../js/data/topic-tree.js');
require('../js/data/learn/shelf.js');
require('../js/data/learn-summary.js');
require('../js/data/lesson-topics.js');
const aliases = require('../js/data/problems/problem-aliases.json');
const db = window.MATH_PROBLEM_DB;
const ids = new Set(db.map(p => sources.problemSlug(p.ref)));
assert.equal(ids.size, db.length, 'Every contest appearance needs a unique slug');
for (const [from, to] of Object.entries(aliases)) {
  assert(ids.has(from) && ids.has(to), `Unknown problem in identity alias ${from} → ${to}`);
  assert(!Object.hasOwn(aliases, to), `Identity alias must point directly to a canonical slug: ${from} → ${to}`);
}

const families = [...sources.FAM_ORDER];
const splitCards = [["lte", "lte-lemma"], ["pie", "inclusion-exclusion"], ["homothety-monge", "monges-theorem"],
  ["symmetric-polynomial-strategies", "fundamental-theorem-symmetric"], ["inversion-properties", "inversion-facts"],
  ["lagrange-interpolation", "lagrange-interpolation-formula"]];
const parents = new Map(window.MATH_TOPIC_TREE.map(([id,,parent]) => [id, parent]));
const links = [], linkIds = new Map(), papers = [], paperIds = new Map();
const tags = [[]], tagIds = new Map([["[]", 0]]), sourcesOfRating = [null];
const byCard = new Map(), byTopic = new Map(), byPaper = new Map();
const prose = new Map();
const tagSet = ids => intern(tags, tagIds, ids || []);
const append = (index, key, row) => {
  if (!index.has(key)) index.set(key, []);
  index.get(key).push(row);
};
function intern(values, ids, value) {
  const key = JSON.stringify(value);
  if (!ids.has(key)) {
    ids.set(key, values.length);
    values.push(value);
  }
  return ids.get(key);
}
const rows = db.map((entry, i) => {
  const slug = sources.problemSlug(entry.ref);
  const ref = entry.ref.replace(/^(202[4-6]) CHMMC\b/, '$1 CMM');
  const { fam, year, cname, num } = sources.parseRef(ref);
  assert(num && year, `Invalid contest reference ${entry.ref}`);
  if (!families.includes(fam)) families.push(fam);
  const paper = intern(papers, paperIds, [families.indexOf(fam), year, cname]);
  append(byPaper, paper, i);
  const archive = window.MATH_CONTEST_PAPERS[entry.ref.replace(/,\s*Problem\s+\d+$/, '')];
  const fallback = sources.aopsUrl(entry.ref, fam);
  const url = entry.url || archive?.url || sources.officialPdf(entry.ref, 'problems') || fallback;
  const officialSolution = archive?.solUrl || sources.officialPdf(entry.ref, 'solutions');
  const urlLabel = sources.linkLabel(fam);
  const aopsSolution = !officialSolution && !entry.strategy && urlLabel === 'AoPS' && !!fallback;
  const source = intern(links, linkIds, [urlLabel === "AoPS" && url === fallback ? true : url, officialSolution || (aopsSolution ? true : null),
    archive?.solKind || null, !!archive?.mirror, aopsSolution, urlLabel]);
  const rating = window.MATH_PROBLEM_RATINGS.ratings[slug];
  for (const id of new Set([...(entry.formulas || []), ...(entry.trickFormulas || [])])) append(byCard, id, i);
  const topics = new Set();
  for (const id of entry.tree || []) {
    for (let parent = id; parent && !topics.has(parent); parent = parents.get(parent)) topics.add(parent);
  }
  for (const id of topics) append(byTopic, id, i);
  const hints = (entry.hints || []).filter(hint => typeof hint === 'string' && hint.trim());
  if (entry.strategy || entry.trick || hints.length) {
    const group = Math.floor(year / 10) * 10;
    if (!prose.has(group)) prose.set(group, {});
    prose.get(group)[slug] = [entry.strategy || '', entry.trick || '', hints];
  }
  const ratingSource = rating?.source ?? null;
  if (!sourcesOfRating.includes(ratingSource)) sourcesOfRating.push(ratingSource);
  const optional = [tagSet(entry.trickFormulas), entry.offtree || 0, entry.main || 0,
    tagSet(entry.types), tagSet(entry.subjects)];
  while (optional.length && !optional.at(-1)) optional.pop();
  return [paper, num, source, rating?.elo ?? null, sourcesOfRating.indexOf(ratingSource),
    tagSet(entry.formulas), tagSet(entry.tree), entry.strategy ? 1 : 0, ...optional];
});
const compare = new Intl.Collator('en-US').compare;
function byNewest(a, b) {
  return papers[rows[b][0]][1] - papers[rows[a][0]][1] || compare(db[a].ref, db[b].ref);
}
for (const positions of byCard.values()) positions.sort(byNewest);
for (const [a, b] of splitCards) {
  const both = [...new Set([...(byCard.get(a) || []), ...(byCard.get(b) || [])])].sort(byNewest);
  if (both.length) { byCard.set(a, both); byCard.set(b, both); }
}
for (const positions of byPaper.values()) positions.sort((a, b) => rows[a][1] - rows[b][1]);
const topicLessons = new Map(), cardLessons = new Map();
for (const book of window.MATH_LEARN_SHELF) for (const chapter of book.chapters) for (const lesson of chapter.lessons) {
  for (const topic of window.MATH_LESSON_TOPICS[lesson.code] || []) {
    if (parents.has(topic)) append(topicLessons, topic, lesson.code);
  }
  const summary = window.MATH_LEARN_SUMMARY[chapter.code]?.lessons[lesson.code];
  for (const id of summary?.cards || []) append(cardLessons, id, [lesson.code, true]);
  for (const id of summary?.mentioned || []) append(cardLessons, id, [lesson.code, false]);
}
const config = { families, papers, links, tags, rows, sourcesOfRating, aliases, splitCards, card: Object.fromEntries(byCard),
  topic: Object.fromEntries(byTopic), paper: Object.fromEntries(byPaper) };

const generated = '// Generated by tools/build-problem-catalog.cjs. Edit the source files and regenerate.\n';
const objectLines = object => "{\n" + Object.entries(object).map(([key, value]) =>
  JSON.stringify(key) + ": " + JSON.stringify(value)).join(",\n") + "\n}";
const files = {
  'problem-catalog.js': generated + 'window.MATH_PROBLEM_CATALOG = {\n' +
    Object.entries(config).map(([key, value]) => JSON.stringify(key) + ': ' +
      (key === 'rows' ? '[\n' + value.map(row => JSON.stringify(row)).join(',\n') + '\n]' : JSON.stringify(value))).join(',\n') + '\n};\n',
  'lesson-links.js': generated + `window.MATH_LESSON_LINKS = ${JSON.stringify({topic: Object.fromEntries(topicLessons), card: Object.fromEntries(cardLessons)})};\n`
};
// The URL version follows the content. Content editors only need to rerun this command.
const indexPath = path.join(root, 'index.html');
const originalHtml = fs.readFileSync(indexPath, 'utf8');
let html = originalHtml;
const hash = data => createHash('sha256').update(data).digest('hex').slice(0, 12);
const solutionScripts = [];
for (const [decade, solutions] of [...prose].sort(([a], [b]) => a - b)) {
  const file = `solutions/${decade}.js`;
  files[file] = generated + `Object.assign(window.MATH_PROBLEM_SOLUTIONS ||= {}, ${objectLines(solutions)});\n`;
  solutionScripts.push(`    <script data-group="solutions" data-decade="${decade}" src="js/data/problems/${file}?v=${hash(files[file])}"></script>`);
}
html = html.replace(/(<!-- start generated solution assets -->\n)[\s\S]*?(    <!-- end generated solution assets -->)/,
  (_, start, end) => start + solutionScripts.join('\n') + '\n' + end);
assert(html.includes(solutionScripts[0]), 'Missing solution asset markers in index.html');
const check = process.argv.includes('--check');
for (const [file, data] of Object.entries(files)) {
  const dest = path.join(root, 'js/data/problems', file);
  const version = hash(data);
  const pattern = new RegExp(`(src="js/data/problems/${file.replace('.', '\\.')}\\?v=)[^"]+`);
  assert(pattern.test(html), `Missing ${file} in index.html`);
  html = html.replace(pattern, (_, prefix) => prefix + version);
  if (check) assert.equal(fs.readFileSync(dest, 'utf8') === data, true, `Regenerate ${file} with node tools/build-problem-catalog.cjs`);
  else { fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, data); }
}
if (check) assert.equal(originalHtml === html, true, 'Regenerate catalog URL versions');
else fs.writeFileSync(indexPath, html);
console.log(`Problem catalog: ${rows.length} appearances, ${Object.keys(aliases).length} explicit aliases, ${[...prose.values()].reduce((total, group) => total + Object.keys(group).length, 0)} solution records.`);
