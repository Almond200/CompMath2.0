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
  assert.equal(migrated.arena.session.round.items.length,1);
  assert.equal(await page.locator('.arena-set-nav .cn-nums a').count(),0);
  assert.equal(await page.getByRole('timer').count(),0);
  assert.equal(migrated.arena.session.round.deadline,null);
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
  assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-result'),'Incorrect');
  assert.equal(await page.locator('[data-practice-answer][aria-checked="true"]').innerText(),incorrect);
  assert(await page.getByRole('button',{name:'Next problem'}).isDisabled());
  await page.reload();
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  await page.locator(`[data-practice-answer="${correct}"]`).click();
  await page.getByRole('button',{name:'Submit answer',exact:true}).click();
  await page.locator('.arena-result-status[data-result="correct"]').waitFor();
  assert.equal(await page.getByText('I’ve seen this problem',{exact:true}).count(),0);
  assert.equal(await page.locator('.practice-question').getByText(/^Problem 1 of|Elo$/).count(),0);
  assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-result'),'Correct');
  assert(await page.locator('.arena-response .practice-answer').isVisible());
  assert.equal(await page.locator('.arena-response [aria-checked="true"]').innerText(),correct);
  assert.match(await page.locator('[data-placement-elo]').innerText(), /^Current estimated Elo: .*→/);
  assert.equal(await page.locator('.arena-st .statement-credit').count(),0);
  assert(await page.getByRole('button',{name:'Previous',exact:true}).isDisabled());
  for (let index=1; index<9; index++) {
    await page.getByRole('button',{name:'Next problem'}).click();
    await page.locator(`[data-problem-index="${index}"][aria-current="step"]`).waitFor();
    await page.getByRole('button',{name:'Give up',exact:true}).click();
    await page.getByRole('dialog').getByRole('button',{name:'Give up',exact:true}).click();
    await page.getByText('Incorrect',{exact:true}).waitFor();
  }
  const delivered = await page.evaluate(() => Arena.read());
  const identities = delivered.session.round.items.map(item => item.identity);
  assert.equal(new Set(identities).size,9);
  assert(!identities.includes(attempt.identity) && !identities.includes(canonical));
  assert(new Set(delivered.session.round.items.map(item => item.elo)).size >= 4);
  await page.getByRole('heading',{name:'Placement complete'}).waitFor();
  assert.equal(await page.locator('.practice-result-row').count(),10,'original result plus the remaining placement problems');
  assert.equal(await page.locator('.insight-cell').count(),10);
  const highest = page.locator('.insight-notes p').filter({hasText:'Highest-rated solve'}).getByRole('link');
  const highestHref = await highest.getAttribute('href');
  const highestSlug = await highest.getAttribute('data-problem-preview');
  assert.match(highestHref,/^#\/arena\/review\/placement\/\d+$/);
  await highest.click();
  await page.waitForURL(url => url.hash === highestHref);
  assert.equal(await page.locator('.arena-st').getAttribute('data-slug'),highestSlug);
  const resultsButton = page.locator('.practice-review-actions').getByRole('link',{name:'Results overview', exact:true});
  await resultsButton.click();
  await page.waitForURL(url => url.hash === '#/arena/review/placement');
  await page.locator('.practice-result-row').nth(1).click();
  await page.locator('.practice-explanation').waitFor();
  await page.locator('.arena-st .statement-credit').waitFor();
  assert(await page.getByRole('navigation',{name:'Review problems'}).isVisible());
  const marker = page.locator('.review-mistake');
  assert.equal(await marker.getAttribute('open'),null);
  await marker.locator('summary').click();
  const concept = marker.locator('[data-mistake-reason="concept"]');
  const starting = marker.locator('[data-mistake-reason="starting"]');
  const nextSteps = page.locator('.review-next');
  const resources = await nextSteps.innerText();
  await concept.click();
  await starting.click();
  await marker.locator('summary').filter({hasText:'2 selected'}).waitFor();
  assert.equal(await nextSteps.innerText(),resources,'labels only affect study evidence');
  const oldMark = await page.evaluate(async () => (await StudyStorage.readActivity('mistake'))[0]);
  await page.reload();
  await marker.locator('summary').filter({hasText:'2 selected'}).click();
  assert.equal(await concept.getAttribute('aria-pressed'),'true');
  assert.equal(await starting.getAttribute('aria-pressed'),'true');
  await concept.click();
  await marker.locator('summary').filter({hasText:'1 selected'}).waitFor();
  assert.equal(await starting.getAttribute('aria-pressed'),'true');
  await starting.click();
  await marker.locator('summary').filter({hasText:'Optional'}).waitFor();
  await page.evaluate(async mark => {
    await StudyStorage.restore(null, {version:1, events:[{...mark, at:mark.at - 1}]});
  },oldMark);
  assert.equal(await page.evaluate(async slug => (await LearningActivity.mistakesFor('arena','placement')).get(slug),nextProblem),undefined);
  await page.getByText('Arena overview',{exact:true}).click();
  const recommendations = page.locator('#arena-study');
  await recommendations.locator('.arena-study-row').first().waitFor();
  const filter = recommendations.getByRole('combobox',{name:'Study recommendation subject'});
  const period = page.getByRole('combobox',{name:'Overall rating trend period'});
  await period.selectOption('3');
  const viewport = page.viewportSize();
  for (const width of [viewport.width,375]) {
    await page.setViewportSize({width,height:viewport.height});
    for (const menu of [filter,period]) {
      assert(await menu.evaluate(select => {
        const style = getComputedStyle(select);
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const labelWidth = ctx.measureText(select.selectedOptions[0].textContent).width;
        const textArea = select.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        return labelWidth <= textArea + 1 && parseFloat(style.paddingInlineEnd) >= 32;
      }), 'the dropdown label has its own space beside the chevron');
    }
  }
  await page.setViewportSize(viewport);
  await filter.selectOption('alg');
  assert((await recommendations.locator('.arena-study-row').count()) <= 3);
  await filter.selectOption('all');
  assert.equal(await recommendations.locator('.arena-study-row').count(),3);
  const type = recommendations.getByRole('combobox',{name:'Recommendation type'});
  await type.selectOption('card');
  const cardRows = await recommendations.locator('.arena-study-row h4').allInnerTexts();
  assert(cardRows.length <= 3 && cardRows.every(text => /^(Formula|Method|Pattern) to revisit/.test(text)));
  await type.selectOption('topic');
  const topicRows = await recommendations.locator('.arena-study-row h4').allInnerTexts();
  assert(topicRows.length <= 3 && topicRows.every(text => /^Topic to revisit/.test(text)));
  await type.selectOption('all');
  const reasons = recommendations.locator('.arena-study-row p a');
  assert.match(await reasons.first().getAttribute('href'),/^#\/arena\/review\/placement\/\d+$/);
  assert.equal(await recommendations.getByRole('button',{name:/refresh/i}).count(),0);
  assert.equal(await recommendations.getByText('Recommendations updated',{exact:true}).count(),0);
  assert(await recommendations.getByText('Based on the problems you’ve worked on recently.').isVisible());
  const historyLink = page.locator('.arena-history-row a').first();
  await page.mouse.move(0,0);
  assert.equal(await historyLink.evaluate(link => getComputedStyle(link).textDecorationLine),'none');
  await historyLink.hover();
  assert.equal(await historyLink.evaluate(link => getComputedStyle(link).textDecorationLine),'underline');
  await page.mouse.move(0,0);
  await page.evaluate(() => {
    const history = LearningActivity.history;
    window.recommendationReads = 0;
    LearningActivity.history = (...args) => {
      window.recommendationReads++;
      return history(...args);
    };
  });
  await lab.evaluate(slug => LearningActivity.saveMistakes('arena','placement',slug,['concept']),nextProblem);
  await page.waitForFunction(() => window.recommendationReads > 0);
  assert.equal(await type.inputValue(),'all');
  assert.equal(await page.locator('#arena-start [name="focus"][value="mixed"]').count(),0);
  const subject = page.getByRole('button',{name:'Algebra',exact:true});
  assert.match(await subject.evaluate(el => getComputedStyle(el,'::before').content), /▸/);
  await subject.click();
  assert.equal(await subject.getAttribute('aria-expanded'),'true');
  assert(await page.locator('#arena-subject-alg').isVisible());
  assert.equal(await page.locator('#arena-subject-alg a[href^="#/practice"]').count(),0);
  await page.locator('label').filter({has:page.locator('[name="focus"][value="cp"]')}).click();
  assert.match(await page.locator('[data-arena-target]').innerText(), /^This contest would be around -?[\d,]+ Elo\.$/);
  await page.locator('label').filter({has:page.locator('[name="length"][value="2"]')}).click();
  await page.getByRole('button',{name:'Start rated session'}).click();
  await page.locator('.arena-st .prob-statement:not(:empty)').waitFor();
  const next = await page.evaluate(() => Arena.read());
  assert.equal(next.session.round.items.length,2);
  assert.match(await page.locator('.arena-set-nav h1').innerText(), /^Counting & Probability -?\d+$/);
  assert.equal(await page.locator('.arena-set-nav .cn-nums a').count(),2);
  await page.getByText('Arena overview',{exact:true}).click();
  await page.getByRole('link',{name:'Resume session'}).waitFor();
  const dashboardClock = page.locator('.arena-resume [role="timer"]');
  const left = await dashboardClock.innerText();
  await page.waitForFunction(before=>document.querySelector('.arena-resume [role="timer"]')?.textContent !== before,left);
  await page.getByRole('link',{name:'Resume session'}).click();
  await page.getByRole('timer').waitFor();
  assert.equal(await page.evaluate(async () => (await Arena.read()).session.round.deadline),next.session.round.deadline);
  const time = await page.getByRole('timer').innerText();
  const [min,sec] = time.split(':').map(Number);
  assert(min*60 + sec < next.session.round.limitMs / 1000);
  await page.locator('.arena-set-nav .cn-nums a').last().click();
  await page.locator(`.arena-st[data-slug="${next.session.round.items[1].slug}"] .prob-statement:not(:empty)`).waitFor();
  const ratedSlug = next.session.round.items[1].slug;
  const answers = await page.evaluate(slug => {
    const grade = PracticeSessions;
    const key = grade.exactKey(slug);
    const correct = String(key?.answers[0] ?? grade.officialKey(slug));
    const wrong = ['0','1','A','B','C','D','E'].find(candidate => {
      const test = {answers:{},status:'active'};
      return grade.answer(test,slug,candidate,!key && /^\d+$/.test(correct)) && grade.result(test,slug) === 'Incorrect' &&
        (document.getElementById('practice-answer') || Array.from(document.querySelectorAll('[data-practice-answer]')).some(b => b.dataset.practiceAnswer === candidate));
    });
    return {correct,wrong};
  },ratedSlug);
  const input = page.locator('#practice-answer');
  const enterRated = async value => {
    if (await input.count()) await input.fill(value);
    else {
      for (const letter of value) {
        const choice = page.locator(`[data-practice-answer="${letter}"]`);
        if (await choice.getAttribute('aria-checked') !== 'true') await choice.click();
      }
    }
    await page.getByRole('button',{name:'Submit answer',exact:true}).click();
  };
  assert(answers.wrong);
  await enterRated(answers.wrong);
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-result'),'Incorrect');
  await page.getByRole('link',{name:/^Problem 1,/}).click();
  const retryTile = page.getByRole('link',{name:/^Problem 2, Incorrect/});
  await retryTile.waitFor();
  const unhovered = await retryTile.evaluate(el => getComputedStyle(el).color);
  await retryTile.hover();
  const hovered = await retryTile.evaluate(el => getComputedStyle(el).color);
  assert.notEqual(unhovered,hovered);
  await retryTile.click();
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  await page.locator('[data-clear]').click();
  await enterRated(answers.correct);
  await page.locator('.arena-status[data-result="correct"]').waitFor();
  assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-result'),'Correct');
  if (await input.count()) {
    assert(await input.isVisible());
    assert.equal(await input.inputValue(),answers.correct);
    assert.equal(await input.getAttribute('readonly'),'');
  } else assert(await page.locator('[aria-label="Submitted answer"] [aria-checked="true"]').isVisible());

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

async function checkPoolAndSubmission(browser) {
  const page = await browser.newPage();
  const open = async hash => { await page.goto(base + '/' + hash); };
  await open('#/arena');
  await page.locator('#arena-start').waitFor();
  await page.evaluate(() => {
    const original = ArenaView.render;
    ArenaView.render = (context,route) => {
      window.savedArenaContext = context;
      return original(context,route);
    };
    location.hash = '#/settings';
  });
  const setting = page.getByRole('radiogroup',{name:'Arena problem pool'});
  await setting.waitFor();
  assert.equal(await setting.getByRole('radio',{name:'In-app statements'}).getAttribute('aria-checked'),'true');
  await page.evaluate(() => { location.hash = '#/arena'; });
  await page.waitForFunction(() => window.savedArenaContext);
  const strict = await page.evaluate(() => savedArenaContext.pool.map(p=>p.slug));
  await page.evaluate(() => { location.hash = '#/settings'; });
  await setting.getByRole('radio',{name:'Include external statements'}).click();
  await page.evaluate(() => { location.hash = '#/arena'; });
  await page.waitForFunction(() => savedArenaContext.allowExternal);
  const external = await page.evaluate(async original => {
    const strictSlugs = new Set(original);
    const entire = savedArenaContext.pool;
    if (entire.some(p => PracticeSessions.needsSelfCheck({},p.slug) ||
      !(PracticeSessions.officialKey(p.slug) || PracticeSessions.exactKey(p.slug)))) return null;
    const candidates = entire.filter(p => !strictSlugs.has(p.slug));
    for (const p of candidates) {
      if (await savedArenaContext.loadPrompt(p,true) === 'external')
        return {slug:p.slug, identity:p.identity, elo:p.elo, subjects:savedArenaContext.subjectsOf(p), external:true};
    }
    return null;
  },strict);
  assert(external,'The extended pool has auto-gradable problems with external statements.');
  const prepare = async (names, duration) => page.evaluate(async ({names,duration,external}) => {
    return Arena.change(state => {
      if (!state.events.length) state.events = Array.from({length:12}, (_,i) => ({session:'baseline', slug:'baseline-'+i,
        identity:'baseline-'+i, at:100+i, elo:1000, subjects:['geo'], outcome:i%2?'incorrect':'correct',answer:'A'}));
      Arena.start(state,'geo','matched',2);
      const items = names.map(slug => slug === external.slug ? external :
        {slug,identity:slug,elo:1000,subjects:['geo']});
      Arena.openRound(state,state.session.id,items);
      state.session.round.deadline = Date.now() + duration;
    });
  },{names,duration,external});
  const expired = await prepare([external.slug,'2018-amc-10a-1'],8000);
  await open('#/arena/session');
  await page.locator('.arena-play .practice-paper a').waitFor();
  await page.getByRole('link',{name:/^Problem 2,/}).click();
  await page.locator('[data-practice-answer="A"]').click();
  await page.getByText('Arena overview',{exact:true}).click();
  await page.evaluate(() => { location.hash = '#/settings'; });
  assert(await page.evaluate(async () => {
    const until = Date.now()+10000;
    while (Date.now() < until) {
      if ((await Arena.read()).session.closed) return true;
      await new Promise(resolve => setTimeout(resolve,100));
    }
    return false;
  }));
  await open('#/arena/review/' + expired.session.id);
  await page.getByText('Submitted when time ran out.',{exact:false}).waitFor();
  await page.locator('.practice-result-row').first().click();
  await page.locator('.practice-question .practice-paper a').waitFor();

  async function answerPage(slug) {
    await page.locator(`.arena-st[data-slug="${slug}"] .prob-statement:not(:empty)`).waitFor();
    const key = await page.evaluate(slug=>PracticeSessions.officialKey(slug),slug);
    await page.locator(`[data-practice-answer="${key}"]`).click();
    await page.getByRole('button',{name:'Submit answer'}).click();
  }
  for (const [slugs,manual] of [[['2018-amc-10a-3','2018-amc-10a-4'],false],[['2018-amc-10a-5','2018-amc-10a-6'],true]]) {
    const set = await prepare(slugs,120000);
    await open('#/arena/session');
    await answerPage(slugs[0]);
    await page.locator('.arena-status[data-result="correct"]').waitFor();
    await page.getByRole('link',{name:/^Problem 2,/}).click();
    await answerPage(slugs[1]);
    await page.getByText('Set complete. Submitting in three seconds…').waitFor();
    if (manual) await page.getByRole('button',{name:'Submit set'}).click();
    await page.waitForURL(url => url.hash === '#/arena/review/' + set.session.id);
    assert.equal(await page.getByRole('dialog').count(),0);
    await page.locator('.arena-rating-change').waitFor();
    assert.match(await page.locator('.practice-results-subtitle').innerText(),/^Geometry 1000 · 2 problems/);
    assert.match(await page.locator('.arena-rating-change').innerText(),/Geometry.*→.*Elo/);
    assert.equal(await page.locator('.practice-result-badge small').count(),0);
    await page.getByText('Arena overview',{exact:true}).click();
    await page.getByRole('heading',{name:'Contest history',exact:true}).waitFor();
    await page.locator('.arena-history-row a').first().waitFor();
    assert.match(await page.locator('.arena-history-row a').first().innerText(),/^Geometry 1000 /);
  }
  const retrySlug = '2018-amc-10a-7';
  const partial = await prepare([retrySlug,'2018-amc-10a-8'],120000);
  await open('#/arena/session');
  const key = await page.evaluate(slug => PracticeSessions.officialKey(slug),retrySlug);
  await page.locator('[data-practice-answer="' + (key === 'A' ? 'B' : 'A') + '"]').click();
  await page.getByRole('button',{name:'Submit answer'}).click();
  await page.getByText('First try was incorrect. You have one try left.').waitFor();
  await page.getByRole('button',{name:'Clear answer'}).click();
  await page.getByRole('button',{name:'Submit set'}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Submit set'}).click();
  await page.waitForURL(url => url.hash === '#/arena/review/' + partial.session.id);
  assert.match(await page.locator('.answer-breakdown-stats').innerText(), /0%\s+Accuracy on submitted answers\s+50%\s+Unanswered/);
  assert.match(await page.locator('.practice-result-row').first().innerText(), /No second answer submitted/);
  await page.close();
}

async function checkPlacementResume(browser) {
  const page = await browser.newPage();
  await page.goto(base + '/#/arena');
  await page.locator('#arena-start').waitFor();
  const initial = await page.evaluate(() => Arena.change(state => {
    Arena.start(state,'geo','matched',5);
    Arena.openRound(state,state.session.id,[{slug:'2018-amc-10a-1',identity:'2018-amc-10a-1',elo:950,subjects:['geo']}]);
    state.session.length = 12; // Restore a placement already open under the previous rules.
  }));
  await page.goto(base + '/#/arena/session');
  await page.getByText('Current estimated Elo: ?', {exact:true}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Submit set',exact:true}).count(),0);
  await page.locator('[data-practice-answer="B"]').click();
  await page.getByRole('button',{name:'Save and exit'}).click();
  await page.getByRole('link',{name:'Resume placement'}).click();
  await page.locator('[data-practice-answer="B"][aria-checked="true"]').waitFor();
  await page.getByRole('button',{name:'Submit answer'}).click();
  await page.locator('.arena-status[data-result="correct"]').waitFor();
  assert.match(await page.locator('[data-placement-elo]').innerText(), /^Current estimated Elo: [\d,]+$/);
  await page.getByRole('button',{name:'Save and exit'}).click();
  await page.getByText('1 of 10 placement problems completed').waitFor();
  const saved = await page.evaluate(() => Arena.read());
  assert.equal(saved.session.id,initial.session.id);
  assert.equal(saved.session.closed,false);
  assert.deepEqual(saved.events,[]);
  await page.reload();
  await page.getByRole('link',{name:'Resume placement'}).click();
  await page.locator('.arena-status[data-result="correct"]').waitFor();
  assert.equal(await page.locator('.arena-set-nav .cn-num').count(),10);
  await page.getByRole('button',{name:'Next problem'}).click();
  await page.getByRole('heading',{name:'Problem 2',exact:true}).waitFor();
  await page.close();
}

(async () => {
  const browser = await chromium.launch({...(process.env.CHROME ? {executablePath:process.env.CHROME} : {})});
  try { await check(browser); await checkPoolAndSubmission(browser); await checkPlacementResume(browser); }
  finally { await browser.close(); }
  console.log('Arena storage, retries, subject filters, review links, external statements and automatic submission passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
