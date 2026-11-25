// Run against a served checkout with COMPMATH_URL and optionally CHROME.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const base = (process.env.COMPMATH_URL || 'http://localhost:8765').replace(/\/$/, '');

async function check(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const oldProblem = '2018-amc-10a-1', nextProblem = '2018-amc-10a-2';
  const attempt = {session:'placement', slug:oldProblem, identity:oldProblem, subjects:['alg'],
    outcome:'correct', answer:'A', elo:1200, at:1000};
  const session = {id:'placement', updated:1500, focus:'mixed', pace:'matched', length:6,
    placement:true, closed:false, last:null, slot:{slug:nextProblem, identity:nextProblem, draft:'B'}};
  const oldArena = {version:1, events:[attempt], session};
  const lesson = {id:'lesson-open', source:'learn', type:'exposure', kind:'lesson', item:'S1.5', outcome:'opened', at:2000};
  const oldActivity = {version:1, events:[lesson]};
  await page.goto(base + '/#/settings');
  await page.waitForSelector('.progress-export');
  await page.evaluate(([arena, activity]) => {
    localStorage.setItem('mq-arena', JSON.stringify(arena));
    localStorage.setItem('mq-learning-activity', JSON.stringify(activity));
  }, [oldArena, oldActivity]);

  await page.goto(base + '/#/arena/session');
  await page.locator('.arena-st .prob-statement:not(:empty)').waitFor();
  assert.equal(await page.locator('.arena-st').getAttribute('data-slug'), nextProblem);
  assert.equal(await page.locator('[data-practice-answer][aria-checked="true"]').innerText(), 'B');
  assert.deepEqual(await page.evaluate(() => StudyStorage.snapshot()), {arena:oldArena, activity:oldActivity});
  assert.deepEqual(await page.evaluate(() => [localStorage.getItem('mq-arena'), localStorage.getItem('mq-learning-activity')]), [null,null]);

  await page.getByRole('button', {name:'Clear answer'}).click();
  await page.waitForFunction(async () => (await Arena.read()).session.slot.draft === '');
  await page.locator('[data-practice-answer="C"]').click();
  await page.waitForFunction(async () => (await Arena.read()).session.slot.draft === 'C');
  await page.reload();
  await page.locator('[data-practice-answer="C"][aria-checked="true"]').waitFor();
  assert.deepEqual(await page.evaluate(async () => (await Arena.read()).events), [attempt]);

  const lab = await context.newPage();
  await lab.goto(base + '/lab/quiz.html');
  await lab.evaluate(() => LearningActivity.record('quiz','attempt','vietas-quadratic','correct','card'));
  const snap = await page.evaluate(() => StudyStorage.snapshot());
  assert.equal(snap.activity.events.length, 2);
  assert(snap.activity.events.some(e => e.id === lesson.id));
  assert(snap.activity.events.some(e => e.source === 'quiz'));
  // An invalid activity import must also roll back the Arena writes in the same transaction.
  await assert.rejects(page.evaluate(arena => StudyStorage.restore(arena, {version:99,events:[]}),
    {version:1, events:[{...attempt, slug:'imported', identity:'imported'}], session:null}));
  assert.deepEqual(await page.evaluate(() => StudyStorage.snapshot()), snap);
  await page.evaluate(async snapshot => {
    await StudyStorage.restore(snapshot.arena, snapshot.activity);
    await StudyStorage.restore(snapshot.arena, snapshot.activity);
  }, snap);
  assert.deepEqual(await page.evaluate(() => StudyStorage.snapshot()), snap);
  await context.close();

  const fallback = await browser.newContext();
  await fallback.addInitScript(() => Object.defineProperty(window, 'indexedDB', {value:undefined}));
  const noDb = await fallback.newPage();
  await noDb.goto(base + '/#/arena');
  await noDb.click('#arena-start button');
  await noDb.locator('.arena-st .prob-statement:not(:empty)').waitFor();
  assert(await noDb.evaluate(() => !!JSON.parse(localStorage.getItem('mq-arena')).session.slot.slug));
  await fallback.close();
}

(async () => {
  const browser = await chromium.launch({...(process.env.CHROME ? {executablePath:process.env.CHROME} : {})});
  try { await check(browser); }
  finally { await browser.close(); }
  console.log('IndexedDB migration, draft resume, cross-page activity, atomic restore, repeated imports and legacy fallback passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
