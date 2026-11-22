// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-mock-settings.cjs
// Practice a contest, Generate a mock: No trigonometry (AMC 8 and 10 only), No calculus, and the closed-by-default
// More settings panel (contest and subject variety, difficulty, statements only). Checks that the options show where
// they belong, shrink the pool, are saved with the set, and that a generated paper obeys them, in both themes at
// desktop and mobile sizes.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.COMPMATH_URL||'http://localhost:8765';
(async()=>{
  const browser=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});
  for(const theme of ['light','dark'])for(const width of [1100,375]){
    const page=await (await browser.newContext({viewport:{width,height:1000},colorScheme:theme})).newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
    await page.goto(base+'/#/practice');await page.waitForSelector('#mock-contest-form');
    const visible=s=>page.locator(s).isVisible();
    // Past-contest mode shows none of the generated-mock settings.
    for(const s of ['#mock-no-trig','#mock-no-calc','#mock-statements','.mock-advanced-field'])assert.equal(await visible(s),false,s+' hidden for a past contest');
    await page.click('[data-mock-mode="generated"]');
    await page.click('[data-mock-family="AMC 10"]');
    assert.equal(await visible('#mock-no-trig'),true);assert.equal(await visible('#mock-no-calc'),true);
    assert.equal(await visible('#mock-statements'),true,'statements-only sits with the checkboxes, outside More settings');
    assert.equal(await page.locator('.mock-advanced-field details').evaluate(d=>d.open),false,'More settings starts closed');
    const pool=async()=>+(await page.locator('#mock-contest-status').innerText()).match(/^([\d,]+)/)[1].replace(/,/g,'');
    const all=await pool();
    await page.check('#mock-no-calc');const noCalc=await pool();assert.ok(noCalc<all,'No calculus removes problems');
    await page.check('#mock-no-trig');const noTrig=await pool();assert.ok(noTrig<noCalc,'No trigonometry removes problems');
    await page.click('[data-mock-family="AMC 12"]');
    assert.equal(await visible('#mock-no-trig'),false,'no trig option only for AMC 8 and 10');assert.equal(await visible('#mock-no-calc'),true);
    await page.click('[data-mock-family="AIME"]');assert.equal(await visible('#mock-no-trig'),false);
    await page.click('[data-mock-family="AMC 10"]');
    await page.click('.mock-advanced-field summary');
    await page.click('[data-mock-adv="contestVariety"][data-value="balanced"]');
    await page.click('[data-mock-adv="subjectVariety"][data-value="balanced"]');
    await page.click('[data-mock-adv="difficulty"][data-value="300"]');
    await page.check('#mock-statements');
    assert.match(await page.locator('.mock-advanced-field .pr-fams-sum').innerText(),/3 changed/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal overflow');
    await page.click('#mock-contest-form [type=submit]');await page.waitForURL(/#\/practice\/set\//,{timeout:30000});
    const set=await page.evaluate(()=>{const s=window.PracticeSessions.read(localStorage);return s[s.length-1]||s[0];});
    assert.equal(set.slugs.length,25);
    assert.deepEqual({...set.mock.options},{noTrig:true,noCalc:true,contestVariety:'balanced',subjectVariety:'balanced',statementsOnly:true,difficulty:300});
    // Every problem of the set passes the chosen filters.
    const bad=await page.evaluate(slugs=>{
      const db=new Map(window.MATH_PROBLEM_DB.map(e=>[e.ref.toLowerCase().replace(/,?\s*problem\s+/,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''),e]));
      return slugs.filter(s=>{const e=db.get(s);return !e||e.offtree==='calculus'||(e.tree||[]).some(id=>/^(alg\.trig|geo\.tri\.trig)(\.|$)/.test(id));});
    },set.slugs);
    assert.deepEqual(bad,[],'no calculus or trigonometry problem was drawn');
    assert.equal(errors.length,0,errors.join('\n'));
    console.log(theme,width,'mock settings: placement, closed panel, pool counts, saved options and filtered paper passed');
    await page.context().close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
