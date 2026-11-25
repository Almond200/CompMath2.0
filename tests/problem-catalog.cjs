const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
global.window = {};
const data = '../js/data/problems/';
for (const file of ['problem-db', 'contest-papers', 'difficulty-ratings', 'problem-catalog']) require(data + file);
const { open } = require('../js/problem-catalog');
const sources = require('../js/contest-sources');
const aliases = require(data + 'problem-aliases.json');
const catalog = open(window.MATH_PROBLEM_CATALOG, ({ types }) => types, ({ subjects }) => subjects, 200);
assert.equal(catalog.problems.length, window.MATH_PROBLEM_DB.length);
assert.equal(catalog.problems[0].strategy, '', 'the catalog opens before solution assets');
for (const file of fs.readdirSync(path.join(__dirname, data, 'solutions'))) require(data + 'solutions/' + file);
for (const [i, entry] of window.MATH_PROBLEM_DB.entries()) {
  const p = catalog.problems[i], slug = sources.problemSlug(entry.ref);
  const rating = window.MATH_PROBLEM_RATINGS.ratings[slug];
  const archive = window.MATH_CONTEST_PAPERS[entry.ref.replace(/,\s*Problem\s+\d+$/, '')];
  const fallback = sources.aopsUrl(entry.ref, p.fam);
  assert.equal(p.slug, slug, entry.ref);
  assert.equal(catalog.bySlug[slug], p);
  assert.equal(p.identity, aliases[slug] || slug);
  assert.equal(p.elo, rating?.elo ?? null);
  assert.equal(p.eloSource, rating?.source ?? null);
  assert.equal(p.strategy, entry.strategy || '');
  assert.equal(p.trick, entry.trick || '');
  assert.equal(p.url, entry.url || archive?.url || sources.officialPdf(entry.ref, 'problems') || fallback, entry.ref);
  assert.equal(p.solUrl, archive?.solUrl || sources.officialPdf(entry.ref, 'solutions') ||
    (!entry.strategy && sources.linkLabel(p.fam) === 'AoPS' ? fallback : null), entry.ref);
  assert.deepEqual(p.formulas, entry.formulas || []);
  assert.deepEqual(p.trickFormulas, entry.trickFormulas || []);
  assert.deepEqual(p.tree, entry.tree || []);
  assert.equal(catalog.byPaper[p.year + ' ' + p.cname].find(q => q.num === p.num), p);
}
assert.equal(catalog.bySlug['2021-amc-10a-1'], catalog.bySlug['2021-spring-amc-10a-1']);
assert.equal(catalog.bySlug['2026-cmm-individual-1'], catalog.bySlug['2026-chmmc-individual-1']);
assert.equal(catalog.bySlug['2026-amc-12b-19'].identity, catalog.bySlug['2026-amc-10b-24'].identity);
assert.equal(new Set(catalog.forTopic('geo').map(p => p.slug)).size, catalog.forTopic('geo').length);
assert.equal(catalog.forTopic('missing').length, 0);
console.log('Problem catalog: all appearance IDs, archive URLs, ratings, tags and solution shards match the sources.');
