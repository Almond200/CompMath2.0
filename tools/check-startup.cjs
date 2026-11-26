// COMPMATH_URL=http://localhost:8688 CHROME=/usr/bin/chromium node tools/check-startup.cjs
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

const base = (process.env.COMPMATH_URL || 'http://localhost:8688').replace(/\/$/, '');
const chapterPath = /^\/js\/data\/learn\/[^/]+\//;
const problemIndex = '/js/data/problems/problem-catalog.js';

async function verifyFallback(page) {
  await page.goto(base + '/');
  assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), 'Competition Math Reference');
  assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /competition math/i);
  await page.getByRole('link', { name: 'Read the formula reference' }).click();
  await page.getByRole('heading', { name: 'Competition Math Formula Sheet', level: 1 }).waitFor();
  assert.equal(await page.locator('main section').count(), 4);
  assert.equal(await page.locator('script').count(), 0);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  try {
    const mobile = { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true };
    const slowStartup = await browser.newPage(mobile);
    await slowStartup.addInitScript(() => {
      localStorage.setItem('mq-settings', JSON.stringify({prefs:{start:'formulas'}}));
    });
    let resumeStartup;
    const heldApp = new Promise(resolve => { resumeStartup = resolve; });
    await slowStartup.route('**/js/app.js?*', async route => {
      await heldApp;
      await route.continue();
    });
    try {
      await slowStartup.goto(base + '/', { waitUntil: 'commit' });
      const fallback = slowStartup.locator('.static-home');
      await fallback.waitFor({ state: 'attached' });
      assert.equal(await fallback.isVisible(), false, 'fallback stays hidden while the app is loading');
    } finally {
      resumeStartup();
    }
    const homepage = slowStartup.locator('.home:not(.static-home)');
    await homepage.getByRole('heading', {name:'Continue studying'}).waitFor();
    await homepage.getByRole('link', {name:'Get rated', exact:true}).waitFor();
    assert.equal(await homepage.getByRole('link', {name:'Current homepage'}).count(), 0);
    assert.equal(new URL(slowStartup.url()).hash, '', 'a saved startup preference no longer overrides home');
    await slowStartup.goto(base + '/#/settings');
    await slowStartup.locator('.settings-head').waitFor();
    assert.equal(await slowStartup.getByRole('radiogroup', {name:'When the app opens'}).count(), 0);
    await slowStartup.close();

    const noJavaScript = await browser.newPage({ ...mobile, javaScriptEnabled: false });
    await verifyFallback(noJavaScript);
    await noJavaScript.close();

    const failedStartup = await browser.newPage(mobile);
    await failedStartup.route('**/js/app.js?*', route => route.abort());
    await verifyFallback(failedStartup);
    await failedStartup.close();

    for (const viewport of [{ viewport: { width: 1280, height: 900 } }, mobile]) {
      const page = await browser.newPage(viewport);
      const requested = [], errors = [];
      page.on('request', request => requested.push(new URL(request.url()).pathname));
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '/#/formulas/geometry');
      await page.getByRole('heading', { name: 'Geometry Formulas', level: 1 }).waitFor();
      assert.equal(await page.getByRole('link', { name: 'Competition Math Reference home' }).count(), 1);
      assert.equal(await page.locator('#brand-home :is(h1,h2,div,p)').count(), 0);
      assert.equal(requested.filter(path => chapterPath.test(path)).length, 0);
      assert.equal(requested.includes(problemIndex), false);

      // A cold card opens while the catalog is still in flight, keeping the reference layout.
      let resumeCatalog;
      const heldCatalog = new Promise(resolve => { resumeCatalog = resolve; });
      await page.route('**/js/data/problems/problem-catalog.js?*', async route => {
        await heldCatalog;
        await route.continue();
      });
      let previousTocLink;
      try {
        await page.locator('main .card-name a[href="#/f/pythagorean-theorem"]').click();
        await page.getByRole('heading', { name: 'Pythagorean Theorem', level: 1 }).waitFor();
        assert.equal(await page.locator('.layout.no-sidebar').count(), 0);
        assert.equal(await page.locator('.route-status, .contest-profile').count(), 0);
        if (viewport.viewport.width === 1280) {
          const link = page.locator('#page-toc .toc-link').first();
          previousTocLink = await link.getAttribute('data-toc');
          await link.focus();
        }
      } finally {
        resumeCatalog();
      }
      await page.locator('.contest-profile').waitFor();
      await page.locator('.contest-refs .prob-open').first().waitFor();
      assert.equal(await page.locator('#page-toc [data-toc="sec-practice-problems"]').count(), 1);
      if (previousTocLink) assert.equal(await page.locator('#page-toc .toc-link:focus').getAttribute('data-toc'), previousTocLink);

      await page.goto(base + '/#/learn/aime-counting');
      await page.getByRole('heading', { name: 'AIME Counting & Probability', level: 1 }).waitFor();
      assert.equal(await page.locator('a[href="#/learn/aime-counting/c5/challenge"]').count(), 1);
      assert.equal(requested.filter(path => chapterPath.test(path)).length, 0);

      // Fail the first chapter request and verify that retry uses the same URL and renders the lesson.
      const chapterRequest = '**/js/data/learn/aime-counting/c5.js?*';
      await page.route(chapterRequest, route => route.abort(), { times: 1 });
      await page.goto(base + '/#/learn/aime-counting/c5/2');
      await page.getByRole('heading', { name: 'Content could not load' }).waitFor();
      await page.getByRole('button', { name: 'Try again' }).click();
      await page.locator('.lp-body').waitFor();
      assert.deepEqual([...new Set(requested.filter(path => chapterPath.test(path)))], ['/js/data/learn/aime-counting/c5.js']);

      await page.goto(base + '/#/problem/1998-pascal-contest-3');
      await page.locator('#prob-st img').waitFor();
      assert.equal(await page.getByRole('link', { name: 'Open in archive', exact: true }).count(), 1);
      assert.equal(requested.filter(path => path === problemIndex).length, 1);
      assert.deepEqual(errors, []);
      await page.close();
    }
    console.log('Verified blank startup, HTML fallback, startup failure, on-demand requests, immediate card navigation, chapter retry, and problem links at desktop and phone widths.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
