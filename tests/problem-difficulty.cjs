const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const D = require('../js/problem-difficulty.js');
const context = { window: {} };
for (const f of ['js/data/problems/problem-db.js', 'js/data/problems/difficulty-ratings.js']) {
  vm.runInNewContext(fs.readFileSync(f, 'utf8'), context, { filename: f });
}
const data = context.window.MATH_PROBLEM_RATINGS;
const slug = ref => ref.toLowerCase().replace(/,?\s*problem\s+/, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const problems = Array.from(context.window.MATH_PROBLEM_DB, p => ({ ...p, slug: slug(p.ref), ...D.ratingFor(slug(p.ref), data) }));
assert.equal(D.levels.length, 6, 'Any plus five real levels');
assert.equal(Object.keys(data.ratings).length, problems.length, 'every current problem has one rating');
assert.equal(data.meta.unrated.length, 0);
assert.equal(problems.filter(p => p.source === 'live').length, data.meta.liveCount);
assert.equal(problems.filter(p => p.source === 'manual').length, data.meta.manualCount);
for (const p of problems) assert.ok(Number.isFinite(p.elo) && p.elo >= 0 && p.elo <= 10000, p.ref);
for (const id of Object.keys(data.ratings)) assert.ok(problems.some(p => p.slug === id), 'no orphan rating: ' + id);
assert.equal(D.ratingFor('unknown', data), null);
// Published ratings are not silently replaced with paper-position estimates.
assert.equal(data.ratings['1988-ajhsme-1'].source, 'live');
// Shared 2026 AMC 10/12 questions have identical authored estimates.
const twins = [[2,1],[3,2],[4,3],[5,4],[7,5],[10,6],[15,10],[16,11],[21,16],[22,17],[24,20]];
for (const [a,b] of twins) assert.equal(data.ratings[`2026-amc-10a-${a}`].elo, data.ratings[`2026-amc-12a-${b}`].elo);
const manual = JSON.parse(fs.readFileSync('tools/manual-difficulty-ratings.json', 'utf8'));
assert.ok(manual.ratings['2026 AMC 10A, Problem 24'][0] < manual.ratings['2026 AMC 10A, Problem 23'][0]);
for (const [ref, [elo, reason]] of Object.entries(manual.ratings)) {
  assert.ok(reason.length > 10, 'manual estimates retain their reasoning');
  const r = data.ratings[slug(ref)];
  assert.ok(r);
  if (r.source === 'manual') assert.equal(r.elo, elo);
}
let cases = 0;
for (let n = 1; n <= 125; n++) {
  const pool = Array.from({ length:n }, (_, i) => ({ slug:String(i), elo:1000 + i * 7 })).reverse();
  const before = pool.slice(), ranges = D.ranges(pool);
  const bands = D.levels.slice(1).map(l => D.filter(pool, l.id));
  assert.deepEqual(pool, before, 'selection must not mutate its caller');
  assert.equal(new Set(bands.flat().map(p => p.slug)).size, n, 'cover every rated problem');
  assert.equal(bands.flat().length, n, 'no overlap or fallback across levels, including tiny pools');
  if (n > 1) {
    const widths = ranges.filter(Boolean).map(r => r.high - r.low + 1);
    assert.ok(Math.max(...widths) - Math.min(...widths) <= 1, 'similar Elo widths, not similar counts');
    assert.equal(ranges.filter(Boolean)[0].low, 1000);
    assert.equal(ranges.filter(Boolean).at(-1).high, 1000 + (n - 1) * 7);
  } else assert.equal(bands[2].length, 1, 'one rating has no relative spread; use Medium');
  cases++;
}
const tied = [500,600,600,600,600,700,800,900,1000,1100].map((elo,i)=>({slug:String(i),elo}));
for (const l of D.levels.slice(1)) {
  const band=D.filter(tied,l.id);
  if (band.some(p=>p.elo===600)) assert.equal(band.filter(p=>p.elo===600).length,4,'never split equal Elo values');
}
assert.equal(D.levels.slice(1).flatMap(l=>D.filter(tied,l.id)).length,tied.length,'ties belong to exactly one band');
assert.equal(D.filter([{elo:700},{elo:700}],'medium').length,2);
assert.equal(D.filter([{elo:700},{elo:700}],'very-hard').length,0,'do not invent relative difficulty for one rating');
const skewed=[...Array.from({length:90},(_,i)=>({slug:'low'+i,elo:500+i})),{slug:'top',elo:3500}];
assert.deepEqual(D.range(skewed,'very-hard'),{low:2901,high:3500});
assert.deepEqual(D.filter(skewed,'very-hard').map(p=>p.slug),['top'],'a long tail is split by Elo width rather than population');
assert.equal(D.filter(skewed,'medium').length,0,'gaps stay empty instead of silently drawing another range');
assert.match(D.describe(skewed,'medium'),/No problems fall in this interval/);
assert.deepEqual(D.range([{elo:1000},{elo:2000}],'hard'),{low:1601,high:1800},'recalibrate from the selected pool');
assert.match(D.describe([{elo:700}],'very-hard'),/same Elo rating.*Medium or Any/);
assert.equal(D.range([],'hard'),null);
const unrated = {slug:'future',elo:null};
const mixed = [...tied,unrated];
assert.deepEqual(D.filter(mixed,''),mixed,'Any has no hidden rating filter');
assert.equal(D.pick(mixed,'',()=>10/11),unrated,'Any can draw an unrated future problem');
for(let i=0;i<mixed.length;i++) assert.equal(D.pick(mixed,'',()=>(i+.5)/mixed.length),mixed[i],'Any is a uniform index draw');
assert.equal(D.filter(mixed,'bogus').length,0);
assert.equal(D.pick([],''),null);
assert.equal(D.filter([unrated],'very-hard').length,0);
// A high-rated early AIME question belongs to the hard end, regardless of its paper position.
const fixture=[{num:1,elo:3200},{num:15,elo:1400},{num:4,elo:2000},{num:8,elo:2300},{num:12,elo:2700}];
assert.equal(D.filter(fixture,'very-hard')[0].num,1);
assert.equal(D.filter(fixture,'very-easy')[0].num,15);
const toOrder = [{slug:'z',elo:2000},{slug:'b',elo:1000},{slug:'a',elo:1000},{slug:'future',elo:null}];
assert.deepEqual(D.order(toOrder).map(p=>p.slug),['a','b','z','future']);
assert.equal(toOrder[0].slug,'z','ordering a set must not mutate the sampling pool');
const amc8=problems.filter(p=>/AMC 8|AJHSME/.test(p.ref));
const aime=problems.filter(p=>/AIME/.test(p.ref));
const top8=D.filter(amc8,'very-hard'),topAime=D.filter(aime,'very-hard');
assert.ok(Math.max(...top8.map(p=>p.elo)) < Math.min(...topAime.map(p=>p.elo)), 'contest-relative hard ranges differ');
// HMMT February: whole rounds of ten, every problem rated; one round uses equal-width Elo intervals.
const hmmt=problems.filter(p=>/HMMT February/.test(p.ref));
assert.ok(hmmt.length>=30&&hmmt.length%10===0);assert.ok(hmmt.every(p=>Number.isFinite(p.elo)));
const hmmtGeo=hmmt.filter(p=>/^2019 HMMT February Geometry,/.test(p.ref));assert.equal(hmmtGeo.length,10);
assert.equal(D.levels.slice(1).flatMap(l=>D.filter(hmmtGeo,l.id)).length,10);
const geoWidths=D.ranges(hmmtGeo).map(r=>r.high-r.low+1);assert.ok(Math.max(...geoWidths)-Math.min(...geoWidths)<=1);
// Exercise the real importer on aliases and a later published replacement for a manual estimate.
require('node:child_process').execFileSync('python3', ['-c', `
import importlib.util
spec=importlib.util.spec_from_file_location('ratings','tools/import-live-ratings.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
for ref,key in [
 ('1988 AJHSME, Problem 1',('amc8','1988',1)),
 ('2021 Spring AMC 10A, Problem 7',('amc10','2021A',7)),
 ('2021 Fall AMC 10A, Problem 7',('amc10','2021C',7)),
 ('2021 Fall AMC 10B, Problem 7',('amc10','2021D',7)),
 ('2021 Fall AMC 12A, Problem 7',('amc12','2021C',7)),
 ('2021 Fall AMC 12B, Problem 7',('amc12','2021D',7)),
 ('1983 AIME, Problem 1',('aime','1983',1)),
 ('2026 AIME II, Problem 1',('aime','2026II',1))]: assert m.live_key(ref)==key,(ref,m.live_key(ref))
ref='2026 AMC 10A, Problem 1'
index={'bands':[{'slug':'600-800','start':600,'count':1}],'totalRated':1}
rows=[[{'contest':'amc10','year':'2026A','number':1,'elo':740}]]
text,meta=m.build(index,rows,{'ratings':{ref:[650,'author estimate']}},[ref],'2026-11-08')
assert meta['liveCount']==1 and meta['manualCount']==0 and '740' in text
assert m.props('<script id="__NEXT_DATA__">{"props":{"pageProps":{"test":1}}}</script>')=={'test':1}
try: m.build(index,rows,{'ratings':{'unknown':[650,'invalid reference']}},[ref],'2026-11-08')
except ValueError: pass
else: raise AssertionError('unknown manual reference accepted')
`], { stdio: 'pipe' });
console.log(`Problem difficulty: ${problems.length} ratings (${data.meta.liveCount} LIVE, ${data.meta.manualCount} manual), ${cases} pool sizes, ties, tiny topics, uniform Any, adaptive Elo widths, gaps, contextual recalibration and shared estimates passed.`);
