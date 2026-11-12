// Check the backward archive lane against the official round names and PDF addresses.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.COMPMATH_URL || 'http://localhost:8898';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    for (const theme of ['light', 'dark']) for (const width of [1280, 375]) {
      const page = await browser.newPage({ viewport: { width, height: 950 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(theme => localStorage.setItem('theme', theme), theme);
      const roundYears = [[2018, 'Algebra and Number Theory', 'algnt'], [2017, 'Algebra and Number Theory', 'algnt'], [2016, 'Algebra', 'alg'], [2015, 'Algebra', 'alg'], [2014, 'Algebra', 'alg']];
      for (const [year, algebra, algebraFolder] of roundYears) {
        await page.goto(`${base}/#/problems/hmmt-february/${year}`);
        await page.locator('.ct-papers [role="tab"]').first().waitFor();
        assert.deepEqual(await page.locator('.ct-papers [role="tab"]').allInnerTexts(), [algebra.replace(' and ', ' & '), 'Combinatorics', 'Geometry']);
        assert.equal(await page.locator('.db-group.is-shown .pp-tiles .br-row').count(), 10);
        for (const [round, folder] of [[algebra, algebraFolder], ['Combinatorics', 'comb'], ['Geometry', 'geo']]) {
          for (const number of [1, 10]) {
            const ref = `${year} HMMT February ${round}, Problem ${number}`;
            const slug = ref.replace(', Problem ', ' ').toLowerCase().replaceAll(' ', '-');
            await page.goto(`${base}/#/problem/${slug}`);
            const toggle = page.locator('.prob-chain .chain-toggle');
            await toggle.waitFor();
            if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
            assert.deepEqual(await page.locator('.aops-btn').evaluateAll(xs => xs.map(x => x.getAttribute('href'))), [
              `https://hmmt-archive.s3.amazonaws.com/tournaments/${year}/feb/${folder}/problems.pdf`,
              `https://hmmt-archive.s3.amazonaws.com/tournaments/${year}/feb/${folder}/solutions.pdf`
            ]);
            assert.equal(await page.locator('.chain-strategy:not(.chain-official)').count(), 0);
            assert(await page.locator('.ptree-node.is-filed').count() >= 1);
            assert.match(await page.locator('.elo-box .elo-num').innerText(), /^\d+$/);
            assert.match(await page.locator('.chain-official-note').innerText(), new RegExp(`problem ${number}\\.$`));
            assert.equal(await page.locator('.katex-error').count(), 0);
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
          }
        }
      }
      assert.deepEqual(errors, []);
      console.log(theme, width, 'official archive folders, three paper tabs, source links, empty strategies, ratings, tree filings and layout: passed');
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
