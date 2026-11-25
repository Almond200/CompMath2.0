// Deterministic coverage for ratings, canonical history and offline backup merges.
const assert = require('node:assert/strict');
const A = require('../js/arena');
const catalog = require('../js/problem-catalog');
global.ProblemCatalog = catalog;
global.MATH_PROBLEM_CATALOG = { aliases: { 'amc12-twin': 'amc10-original' } };
const state = A.merge(null, null);
A.start(state, 'geo', 'stretch', 3);
const session = state.session.id;
assert.deepEqual([state.session.focus, state.session.pace, state.session.length], ['mixed','matched',6]);
const problem = (slug, elo = 1500, subjects = ['geo']) => ({ slug, identity: A.canonical(slug), elo, subjects });
function attempt(p, outcome, subjects = p.subjects) {
  state.session.slot = { slug: p.slug, identity: p.identity, draft: '' };
  return A.finishProblem(state, session, p, subjects, outcome, outcome === 'seen' ? '' : 'A');
}
attempt(problem('amc12-twin'), 'seen');
assert.equal(A.remaining(state), 6);
assert.equal(A.ratings(state.events).overall.count, 0);
assert.equal(attempt(problem('amc10-original'), 'correct'), false);
for (let i = 0; i < 6; i++) attempt(problem('math-' + i, 1500 + i * 100), i % 2 ? 'incorrect' : 'correct', ['geo','nt','geo']);
const stats = A.ratings(state.events);
assert.equal(stats.overall.wins, 3);
assert.equal(stats.subjects.get('geo').count, 6);
assert.equal(stats.subjects.get('nt').count, 6);
assert.equal(stats.subjects.has('alg'), false);
assert.equal(A.remaining(state), 0);
assert.equal(A.finishProblem(state, session, problem('math-5'), ['geo'], 'correct','A'), false);
const gain = (elo, outcome) => A.ratings([...state.events, { outcome, subjects:['alg'], elo }]).points.at(-1).delta;
assert(gain(2200,'correct') > gain(1200,'correct'));
assert(gain(1200,'incorrect') < gain(2200,'incorrect'));
for (const outcome of ['correct','incorrect']) {
  const r = A.ratings(state.events.slice(1).map(e => ({ ...e, outcome }))).overall.rating;
  assert(Number.isFinite(r) && (outcome === 'correct' ? r > 1800 : r < 1500));
}
state.session.closed = true;
A.start(state, 'geo','stretch',3);
assert.equal(state.session.placement, false);
const target = stats.subjects.get('geo').rating + 180;
const pool = [problem('near',target,['alg']), problem('far',target-300), problem('amc12-twin',target), problem('fit',target+2)];
const pick = (seen, s = state.session) => A.choose(pool, new Set(seen), stats, s, p => p.subjects, () => 0);
assert.equal(pick(['amc10-original']).slug,'fit');
assert.equal(pick(pool.map(p=>p.identity)),null);
assert.equal(A.merge(state,state).events.length,7);
const twin = {...state.events[0], identity:'amc10-original',slug:'amc10-original', outcome:'correct', answer:'B'};
const other = {version:1, session:null, events:[twin]};
assert.deepEqual(A.merge(other,state).events,A.merge(state,other).events);
assert.equal(A.merge(state,other).events.filter(e=>e.slug.includes('amc')).length,1);
assert.equal(A.merge(state,other).events.find(e=>e.slug.includes('amc')).outcome,'correct');
assert.throws(()=>A.merge(state,{version:2,events:[]}));
assert.throws(()=>A.merge(state,{version:1,events:[{slug:'bad'}]}));
async function checkHistory() {
  const sharedActivity = require('../js/learning-activity');
  const history = await sharedActivity.history({storage:{getItem:k=>k===A.KEY?JSON.stringify(state):null}, arena:A, canonical:A.canonical});
  assert.equal(history.filter(e=>e.type==='attempt').length,6);
  assert.equal(history.find(e=>e.outcome==='seen').canonicalId,'amc10-original');
  const recs = A.recommendations([...history,
    {kind:'problem',canonicalId:'math-1',item:'duplicate',at:Date.now()+1,outcome:'correct'},
    {kind:'problem',canonicalId:'blank',item:'blank',at:0,outcome:'unanswered'}],
    id => ({tree: [id==='duplicate' ? 'alg.rates' : 'geo.length']}));
  assert.deepEqual(recs.map(r=>[r.id,r.attempts,r.misses]),[['geo.length',5,2]]);
  console.log('Arena placement, Elo, independent subjects, options, known problems, shared activity, recommendations and backup merging passed.');
}
checkHistory().catch(error => { console.error(error); process.exitCode = 1; });
