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
  const previouslyOpened = {id:'archive-open', source:'archive', type:'exposure', kind:'problem',
    item:'2026-amc-12b-19', outcome:'opened', at:3000};
  const oldActivity = {version:1, events:[lesson,previouslyOpened]};
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
  const migrated = await page.evaluate(() => StudyStorage.snapshot());
  assert.deepEqual(migrated.arena.events, oldArena.events);
  assert.deepEqual(migrated.activity.events.sort((a,b) => a.at-b.at), oldActivity.events);
  const canonical = await page.evaluate(slug => Arena.canonical(slug),previouslyOpened.item);
  assert(!migrated.arena.session.round.items.some(item => item.identity === canonical));
  assert(!migrated.arena.session.round.items.some(item => item.identity === attempt.identity));
  assert.equal(new Set(migrated.arena.session.round.items.map(item => item.identity)).size,12);
  assert(new Set(migrated.arena.session.round.items.map(item => item.elo)).size >= 4);
  assert.equal(migrated.arena.session.round.items.length,12);
  assert.equal(migrated.arena.session.round.items[0].slug,nextProblem);
  assert.deepEqual(await page.evaluate(() => [localStorage.getItem('mq-arena'), localStorage.getItem('mq-learning-activity')]), [null,null]);

  await page.getByRole('button', {name:'Clear answer'}).click();
  await page.waitForFunction(async () => (await Arena.read()).session.round.items[0].draft === '');
  await page.locator('[data-practice-answer="C"]').click();
  await page.waitForFunction(async () => (await Arena.read()).session.round.items[0].draft === 'C');
  await page.reload();
  await page.locator('[data-practice-answer="C"][aria-checked="true"]').waitFor();
  assert.deepEqual(await page.evaluate(async () => (await Arena.read()).events), [attempt]);

  const lab = await context.newPage();
  await lab.goto(base + '/lab/quiz.html');
  await lab.evaluate(() => LearningActivity.record('quiz','attempt','vietas-quadratic','correct','card'));
  const snap = await page.evaluate(() => StudyStorage.snapshot());
  assert.equal(snap.activity.events.length, 3);
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
  const correct = await page.evaluate(slug => PracticeSessions.officialKey(slug),nextProblem);
  const incorrect = correct === 'A' ? 'B' : 'A';
  await page.locator(`[data-practice-answer="${incorrect}"]`).click();
  await page.getByRole('button',{name:'Submit answer',exact:true}).click();
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  await page.reload();
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  await page.locator(`[data-practice-answer="${correct}"]`).click();
  await page.getByRole('button',{name:'Submit answer',exact:true}).click();
  await page.locator('.arena-result-status[data-result="correct"]').waitFor();
  assert.equal(await page.getByText('I’ve seen this problem',{exact:true}).count(),0);
  assert.equal(await page.locator('.practice-question').getByText(/^Problem 1 of|Elo$/).count(),0);
  await page.getByRole('button',{name:'Submit set',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Submit set',exact:true}).click();
  await page.getByRole('heading',{name:'Placement complete'}).waitFor();
  assert.equal(await page.locator('.practice-result-row').count(),13,'original result plus the current placement set');
  assert.equal(await page.locator('.insight-cell').count(),13);
  await page.locator('.practice-result-row').nth(1).click();
  await page.locator('.practice-explanation').waitFor();
  assert(await page.getByRole('navigation',{name:'Review problems'}).isVisible());
  await page.getByText('Arena overview',{exact:true}).click();
  const subject = page.getByRole('button',{name:'Algebra',exact:true});
  await subject.click();
  assert.equal(await subject.getAttribute('aria-expanded'),'true');
  assert(await page.locator('#arena-subject-alg').isVisible());
  await page.locator('label').filter({has:page.locator('[name="focus"][value="cp"]')}).click();
  assert.match(await page.locator('[data-arena-target]').innerText(), /Counting & Probability/);
  await page.locator('label').filter({has:page.locator('[name="length"][value="2"]')}).click();
  await page.getByRole('button',{name:'Start rated session'}).click();
  await page.locator('.arena-st .prob-statement:not(:empty)').waitFor();
  const next = await page.evaluate(() => Arena.read());
  assert.equal(next.session.round.items.length,2);
  const completed = new Set(next.events.map(event => event.identity));
  assert(!next.session.round.items.some(item => completed.has(item.identity) || item.identity === canonical));
  await context.close();

  const credits = await browser.newPage();
  await credits.goto(base + '/#/problem/2010-amc-8-13');
  await credits.locator('.statement-credit').waitFor();
  assert.equal(await credits.getByText('© Mathematical Association of America',{exact:true}).filter({visible:true}).count(),1);
  await credits.close();

  const fallback = await browser.newContext();
  await fallback.addInitScript(() => Object.defineProperty(window, 'indexedDB', {value:undefined}));
  const noDb = await fallback.newPage();
  await noDb.goto(base + '/#/arena');
  await noDb.click('#arena-start button');
  await noDb.locator('.arena-st .prob-statement:not(:empty)').waitFor();
  assert(await noDb.evaluate(() => !!JSON.parse(localStorage.getItem('mq-arena')).session.round.items[0].slug));
  await fallback.close();
}

(async () => {
  const browser = await chromium.launch({...(process.env.CHROME ? {executablePath:process.env.CHROME} : {})});
  try { await check(browser); }
  finally { await browser.close(); }
  console.log('IndexedDB migration, draft resume, cross-page activity, atomic restore, repeated imports and legacy fallback passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
