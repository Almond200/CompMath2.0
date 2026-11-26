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
  const practice = page.locator('.contest-refs');
  const profileOdds = page.locator('.pf-odds');
  for (const [id, count] of [['lagrange-roots-mod-p', 3], ['dirichlet-convolution', 4]]) {
    await go('#/f/' + id); await profileOdds.waitFor(); await practice.waitFor();
    for (const [section, row] of [[profileOdds, '.pf-odd'], [practice, '.prob-group']]) {
      const rows = section.locator(row);
      assert.equal(await rows.count(), count);
      assert.equal(await section.locator(row + ':visible').count(), 3);
      assert.doesNotMatch(await section.locator(row + ':visible').first().innerText(), /AMC|AIME/);
      const more = section.locator('.fam-more-btn');
      if (count === 3) assert.equal(await more.count(), 0);
      else {
        assert.equal(await more.innerText(), 'Show 1 more contest');
        await more.click();
        assert.equal(await section.locator(row + ':visible').count(), 4);
        await more.click();
        assert.equal(await section.locator(row + ':visible').count(), 3);
      }
    }
  }
  await go('#/f/pythagorean-theorem'); await practice.waitFor();
  assert.equal(await practice.locator('.prob-group:visible').count(), 3);
  assert.equal(await profileOdds.locator('.pf-odd:visible').count(), 3);
  assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'false');
  await practice.locator('.fam-more-btn').click(); assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'true');
  const odds = page.locator('[data-fam-list="profile-odds"]'), table = page.locator('[data-fam-list="profile-contests"]');
  assert.equal(await odds.getAttribute('aria-expanded'), 'false'); assert.equal(await table.getAttribute('aria-expanded'), 'false');
  await table.click(); assert.equal(await table.getAttribute('aria-expanded'), 'true');
  assert.equal(await odds.getAttribute('aria-expanded'), 'false'); assert.equal(await practice.locator('.fam-more-btn').getAttribute('aria-expanded'), 'true');
  await odds.click(); assert.equal(await table.getAttribute('aria-expanded'), 'true');

  const firstGroup=practice.locator('.prob-group').filter({has:page.locator('.prob-more')}).first();
  assert.equal(await firstGroup.locator('.prob-row').count(),3,'only the visible rows are mounted');
  await practice.locator('.prob-more').first().click();
  assert(await firstGroup.locator('.prob-row').count()>3,'expanding mounts the remaining rows'); assert.equal(await practice.locator('.prob-more').first().getAttribute('aria-expanded'), 'true');
  await table.click(); assert.equal(await table.getAttribute('aria-expanded'), 'false');
  assert.equal(await odds.getAttribute('aria-expanded'), 'true');
  assert.equal(await practice.locator('.prob-more').first().getAttribute('aria-expanded'), 'true', 'another section does not reset this problem group');

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
  assert.equal(await page.locator('#pr-random').count(),0);
  // Every contest group is visible as a heading and starts collapsed.
  assert.equal(await page.locator('#pr-contests [data-fam-list="contest-years"]').count(), 0);
  assert.equal(await page.locator('#pr-contests .ct-group').count() >= 4, true);
  assert.equal(await page.locator('#pr-contests .ct-group[open]').count(), 0);
  const maa = page.locator('#ct-group-maa');
  await page.getByRole('button', {name: 'Expand all', exact: true}).waitFor();
  await maa.locator('summary').click();
  await page.getByRole('button', {name: 'Collapse all', exact: true}).waitFor();
  assert.equal(await maa.evaluate(group => group.open), true);

  const years = maa.locator('.ct-years-more').first(); assert.equal(await years.getAttribute('aria-expanded'), 'true');
  await years.click(); assert.equal(await years.getAttribute('aria-expanded'), 'false', 'manual fold works on the current page');
  await go('#/f/law-of-cosines'); await page.locator('.contest-refs').waitFor();
  await go('#/practice'); await years.waitFor(); assert.equal(await years.getAttribute('aria-expanded'), 'true', 'new page applies expanded preference');
  await go('#/settings'); await page.locator('[data-set="contestLists"][data-val="click"]').click();
  await go('#/practice'); await years.waitFor(); assert.equal(await years.getAttribute('aria-expanded'), 'false');
  await go('#/browse/difficulty/3600');
  assert.equal(await page.locator('[data-br-fam="PUMaC Division B"]:visible').count(),0,'extra chips start folded');
  const right=page.locator('.br-step[aria-label^="Harder range"]'); assert.equal(await right.count(),1,'can go beyond the former AIME ceiling with folded chips');
  await right.click(); await page.waitForFunction(()=>!document.querySelector('.br-band-h')?.textContent.includes('3600'));
  const nextBand=await page.locator('.br-band-h').innerText(); assert.match(nextBand,/Rated (3800|4000|4200|4400)/);
  const foldedCount=await page.locator('.br-band > .br-count').innerText();
  await page.locator('[data-fam-list="browse-contests"]').click();
  assert.equal(await page.locator('.br-band > .br-count').innerText(),foldedCount,'expanding the chip row does not change selected data');
  await go('#/browse/difficulty/1200'); if(await page.locator('[data-fam-list="browse-contests"]').getAttribute('aria-expanded')==='false')await page.locator('[data-fam-list="browse-contests"]').click();
  await page.locator('[data-br-fam="AMC 8"]').click();
  await page.locator('.elo-bar[href$="/1400"]').click(); await page.waitForFunction(()=>document.querySelector('.br-band-h')?.textContent.includes('1400'));
  assert.equal(await page.locator('[data-fam-list="browse-contests"]').getAttribute('aria-expanded'), 'true', 'rating-bar selection keeps the contest chooser expanded');
  assert.equal(await page.locator('[data-br-fam="PUMaC Division B"]').count(), 1);
  assert.equal(await page.locator('[data-br-fam="AMC 8"]').getAttribute('aria-pressed'), 'false');
  assert.equal(await page.locator('[data-br-fam="AMC 10"]').getAttribute('aria-pressed'), 'true');
  await page.locator('.br-step').first().click(); await page.waitForFunction(()=>!document.querySelector('.br-band-h')?.textContent.includes('1400'));
  assert.equal(await page.locator('[data-fam-list="browse-contests"]').getAttribute('aria-expanded'), 'true', 'next/previous range also preserves the chooser');
  await go('#/browse/topics/geo.tri'); await page.locator('[data-fam-list="browse-contests"]').click();
  await page.evaluate(()=>location.hash='#/browse/topics/geo.circ'); await page.waitForFunction(()=>document.querySelector('h1')?.textContent==='Circles');
  assert.equal(await page.locator('[data-fam-list="browse-contests"]').getAttribute('aria-expanded'), 'true', 'topic navigation preserves the chooser within topics');
  assert.equal(await page.locator('[data-br-fam="AMC 8"]').getAttribute('aria-pressed'), 'false', 'filter choice persists too');
  await go('#/practice'); await go('#/browse/difficulty/1200'); await page.locator('[data-fam-list="browse-contests"]').waitFor();
  assert.equal(await page.locator('[data-fam-list="browse-contests"]').getAttribute('aria-expanded'), 'false', 'leaving the browsing area still resets expansion');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); assert.deepEqual(errors, []);
  console.log(theme, width, 'default reset, card/statistics lists, persistent preference and year expansion passed'); await page.close();
 }} finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
