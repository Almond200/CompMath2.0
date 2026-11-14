// Contest-list expansion is page-local; Settings can open the full lists by default.
const { chromium } = require('playwright'), assert = require('node:assert/strict');
const base = process.env.COMPMATH_URL || 'http://localhost:8765';
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
 try { for (const theme of ['light', 'dark']) for (const width of [1280, 375]) {
  const page = await browser.newPage({ viewport: { width, height: 950 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.setDefaultTimeout(15000);
  await page.addInitScript(t => localStorage.setItem('theme', t), theme);
  const go = async hash => { await page.goto(base + '/' + hash); await page.locator('main').waitFor(); };
  await go('#/f/pythagorean-theorem'); await page.locator('.contest-refs').waitFor();
  const practice = page.locator('.contest-refs');
  assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'false');
  await practice.locator('.fam-more-btn').click(); assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'true');
  await practice.locator('.prob-more').first().click(); assert.equal(await practice.locator('.prob-more').first().getAttribute('aria-expanded'), 'true');
  await go('#/f/law-of-cosines'); await page.locator('.contest-refs').waitFor();
  assert.equal(await page.locator('.contest-refs .fam-more-btn').getAttribute('aria-expanded'), 'false', 'next card resets contest expansion');
  await go('#/f/pythagorean-theorem'); await practice.waitFor();
  assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'false', 'returning does not restore expansion');
  assert.equal(await practice.locator('.probs-open').count(), 0);
  await go('#/settings'); await page.locator('[data-set="contestLists"][data-val="show"]').click();
  assert.equal(await page.locator('[data-set="contestLists"][data-val="show"]').getAttribute('aria-checked'), 'true');
  await go('#/f/pythagorean-theorem'); await practice.waitFor();
  assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'true');
  assert.equal(await practice.locator('.prob-more[aria-expanded="false"]').count(), 0);
  assert.equal(await practice.locator('.prob-extra').evaluateAll(xs => xs.every(x => getComputedStyle(x).display !== 'none')), true);
  await page.reload(); await practice.waitFor(); assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'true', 'preference survives reload');
  await go('#/practice'); await page.locator('#pr-contests').waitFor();
  const years = page.locator('#pr-contests .ct-years-more').first(); assert.equal(await years.getAttribute('aria-expanded'), 'true');
  await years.click(); assert.equal(await years.getAttribute('aria-expanded'), 'false', 'manual fold works on the current page');
  await go('#/f/law-of-cosines'); await page.locator('.contest-refs').waitFor();
  await go('#/practice'); await years.waitFor(); assert.equal(await years.getAttribute('aria-expanded'), 'true', 'new page applies expanded preference');
  await go('#/settings'); await page.locator('[data-set="contestLists"][data-val="click"]').click();
  await go('#/practice'); await years.waitFor(); assert.equal(await years.getAttribute('aria-expanded'), 'false');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); assert.deepEqual(errors, []);
  console.log(theme, width, 'default reset, card/statistics lists, persistent preference and year expansion passed'); await page.close();
 }} finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
