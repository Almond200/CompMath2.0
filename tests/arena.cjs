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
  const placementState = A.merge(null, null);
  A.start(placementState, 'mixed', 'matched', 5);
  const p = problem('placement-question');
  placementState.session.slot = {...p,draft:'A'};
  const id = placementState.session.id;
  A.placeAnswer(placementState, id, p, p.subjects, 'incorrect', 'A', false);
  assert.equal(placementState.session.slot.firstMiss, 'A');
  assert.equal(placementState.session.slot.draft, '');
  assert.equal(placementState.events.length, 0);
  assert.equal(A.placeAnswer(placementState, id, p, p.subjects, 'correct', 'B', false), false, 'stale first try cannot finish retry');
  A.placeAnswer(placementState, id, p, p.subjects, 'correct', 'B', true);
  assert.equal(placementState.events.length, 1);
  assert.equal(placementState.events[0].outcome, 'correct');
  assert.equal(placementState.events[0].firstMiss, 'A');

  const timed = A.merge(state, null);
  timed.session.closed = true;
  A.start(timed, 'geo', 'stretch', 5);
  const roundId = timed.session.id, now = Date.now();
  A.openRound(timed, roundId, [problem('amc10-original'), problem('one', 980), problem('two', 1800), problem('three', 2600), problem('four', 3100)], now);
  const round = timed.session.round;
  assert.deepEqual(round.items.map(i => i.slug), ['one','two','three','four']);
  assert.equal(round.limitMs, (2 + 5 + 7 + 9) * 60000);
  A.checkRoundAnswer(timed, roundId, 'three', {outcome:'correct', answer:'C'}, now);
  assert.equal(A.checkRoundAnswer(timed, roundId, 'three', {outcome:'incorrect', answer:'D'}, now), false);
  A.checkRoundAnswer(timed, roundId, 'one', {outcome:'seen', answer:''}, now);
  round.items[1].draft = 'B';
  assert.equal(timed.events.length, state.events.length, 'checking an answer does not change Elo before set submission');
  assert.equal(A.checkRoundAnswer(timed, roundId, 'four', {outcome:'correct', answer:'E'}, round.deadline), false);
  A.submitRound(timed, roundId, (_,answer) => answer && {outcome:'incorrect',answer}, round.deadline);
  assert.deepEqual(timed.events.slice(-4).map(e => [e.slug,e.outcome,e.answer,e.timedOut]),
    [['one','seen','',true],['two','incorrect','B',true],['three','correct','C',true],['four','unanswered','',true]]);
  assert.equal(A.submitRound(timed, roundId, () => null), false);
  assert.deepEqual(A.merge(timed, timed), timed, 'backup restores the complete scored set once');
  console.log('Arena placement, Elo, independent subjects, options, known problems, shared activity, recommendations and backup merging passed.');
}
checkHistory().catch(error => { console.error(error); process.exitCode = 1; });
