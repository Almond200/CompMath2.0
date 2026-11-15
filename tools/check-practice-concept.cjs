// One concept panel, with a sliding, keyboard-operable Topics/Cards switch.
const { chromium } = require('playwright'), assert = require('node:assert/strict');
const base = process.env.COMPMATH_URL || 'http://localhost:8765';
(async () => { const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
 try { for (const theme of ['light','dark']) for (const width of [1280,375]) {
  const page = await browser.newPage({viewport:{width,height:950}}), errors=[];
  page.on('pageerror',e=>errors.push(e.message)); await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
  await page.goto(base+'/#/practice'); await page.locator('#pr-concept').waitFor();
  assert.equal(await page.locator('#pr-concept > h3').innerText(),'Practice a concept');
  assert.equal(await page.locator('#pr-topic').isVisible(),true); assert.equal(await page.locator('#pr-card').isVisible(),false);
  const tabs=page.locator('.concept-switch [role="tab"]'); assert.equal(await tabs.count(),2);
  await page.locator('#topic-name').fill('Triangles'); await page.locator('[data-topic-id="geo.tri"]').click();
  await page.locator('#topic-band').fill('4'); await page.locator('#topic-count').fill('3');
  await page.locator('#concept-card-tab').click(); assert.equal(await page.locator('#pr-topic').isVisible(),false); assert.equal(await page.locator('#pr-card').isVisible(),true);
  await page.locator('#card-practice-name').fill('pyth'); await page.locator('#card-practice-options button').first().click();
  const cardStatus=await page.locator('#card-practice-status').innerText();
  await page.locator('#concept-card-tab').press('ArrowLeft'); assert.equal(await page.locator('#topic-name').inputValue(),'Triangles');
  assert.equal(await page.locator('#topic-band').inputValue(),'4'); assert.equal(await page.locator('#topic-count').inputValue(),'3');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'concept-topic-tab');
  await page.locator('#concept-topic-tab').press('End'); assert.equal(await page.locator('#card-practice-name').inputValue(),'Pythagorean Theorem');
  assert.equal(await page.locator('#card-practice-status').innerText(),cardStatus);
  assert.equal(await page.locator('.concept-switch [aria-selected="true"]').count(),1);
  assert.equal(await page.locator('#concept-card-tab').getAttribute('tabindex'),'0'); assert.equal(await page.locator('#concept-topic-tab').getAttribute('tabindex'),'-1');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert((await page.locator('.concept-switch').evaluate(el=>parseFloat(getComputedStyle(el,'::before').transitionDuration)))<0.001);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)); assert.deepEqual(errors,[]);
  console.log(theme,width,'one panel, slide switch, keyboard, retained choices and reduced motion passed'); await page.close();
 }} finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
