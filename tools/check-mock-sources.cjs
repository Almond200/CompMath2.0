// Generated mocks keep their format separate from the selected question sources.
const { chromium } = require('playwright'), assert = require('node:assert/strict');
const base = process.env.COMPMATH_URL || 'http://localhost:8765';
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
 try { for (const theme of ['light', 'dark']) for (const width of [1280, 375]) {
  const page = await browser.newPage({ viewport: { width, height: 950 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(t => localStorage.setItem('theme', t), theme);
  await page.goto(base + '/#/practice');
  const form = page.locator('#mock-contest-form'), submit = form.locator('[type="submit"]');
  await form.waitFor(); assert.equal(await form.locator('.mock-source-field').isVisible(), false);
  await form.locator('[data-mock-mode="generated"]').click();
  assert.match(await form.locator('#mock-contest-info').innerText(), /25 problems · 40 minutes · Modeled on 2022–2026/);
  await form.locator('.mock-source-field summary').click();
  await form.locator('[data-mock-source-all="off"]').click();
  assert.equal(await submit.isDisabled(), true); assert.match(await form.locator('#mock-contest-status').innerText(), /^0 eligible questions/);
  // Metadata-only sources use the established official-paper/self-check flow.
  await form.locator('[data-mock-source="PUMaC Division B"]').click();
  assert.equal(await submit.isEnabled(), true); assert.match(await form.locator('#mock-contest-status').innerText(), /closest available questions/);
  await page.locator('#pr-topic .pr-fams summary').click();
  await page.locator('#pr-topic [data-pr-all="off"]').click();
  assert.equal(await form.locator('[data-mock-source="PUMaC Division B"]').getAttribute('aria-pressed'), 'true', 'concept contest changes do not replace the mock chooser');
  assert.equal(await form.locator('[data-mock-source][aria-pressed="true"]').count(), 1);

  await form.locator('[data-mock-family="AMC 10"]').click();
  assert.match(await form.locator('#mock-contest-info').innerText(), /25 problems · 75 minutes/);
  assert.equal(await form.locator('[data-mock-source][aria-pressed="true"]').count(), 1, 'format changes preserve source selection');
  // Reload preserves the independent source chooser without changing topic/card contests.
  await page.reload(); await form.waitFor(); await form.locator('[data-mock-mode="generated"]').click();
  await form.locator('.mock-source-field summary').click();
  assert.equal(await form.locator('[data-mock-source][aria-pressed="true"]').count(), 1);
  assert.equal(await form.locator('[data-mock-source="PUMaC Division B"]').getAttribute('aria-pressed'), 'true');
  await form.locator('[data-mock-family="AMC 10"]').click();
  await submit.click(); await page.locator('.practice-paper').waitFor();
  const set = await page.evaluate(() => JSON.parse(localStorage.getItem('mq-practice-sets')).find(s => location.hash.endsWith(s.id)));
  assert.equal(set.mock.family, 'AMC 10'); assert.equal(set.slugs.length, 25); assert.equal(set.clock.limitMs, 75 * 60000);
  assert(set.slugs.every(s => s.includes('pumac-division-b-'))); assert.equal(new Set(set.slugs).size, 25);
  assert.equal(Object.keys(set.selfCheck).length, 25); assert.deepEqual(set.mock.usedSources, ['PUMaC Division B']);
  await page.locator('#practice-answer').fill('test answer');
  await page.locator('#finish-practice').click(); await page.locator('dialog.app-confirm [value="ok"]').click();
  await page.locator('.practice-results').waitFor(); assert.match(await page.locator('.practice-results-stats').innerText(), /Score so far/);
  assert.match(await page.locator('.practice-results-meta').allInnerTexts().then(xs => xs.join(' ')), /1 to check against the official solution/);
  await page.locator('.practice-result-row').first().click(); await page.locator('[data-self="Correct"]').click();
  await page.locator('.practice-back-results').click(); await page.locator('.practice-results').waitFor();
  assert.match(await page.locator('.practice-results-stats').innerText(), /42\/150/);
  assert.equal(await page.locator('.katex-error').count(), 0); assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  assert.deepEqual(errors, []); console.log(theme, width, 'source chooser, persistence, strict selection, format, timer and self-checked score passed');
  await page.close();
 }} finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
