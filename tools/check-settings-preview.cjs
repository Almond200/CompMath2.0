// Compare the rendered Settings control with Practice, and guard the reported
// raw-comparison/linked-prose regression through HTML parsing and KaTeX.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const url = process.env.COMPMATH_URL || 'http://localhost:8765';
const controlStyle = el => {
  const c = getComputedStyle(el);
  return { color: c.color, background: c.backgroundColor, radius: c.borderRadius,
    height: c.height, padding: c.padding, font: c.font, icon: el.querySelector('svg')?.outerHTML };
};
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
      await page.addInitScript(t => localStorage.setItem('theme', t), theme);
      await page.goto(`${url}/#/problem/2025-amc-10a-9`);
      await page.locator('.chain-toggle').waitFor();
      const actual = await page.locator('.chain-toggle').evaluate(controlStyle);
      await page.goto(`${url}/#/settings`);
      const preview = page.locator('[data-pv="problem"] .chain-toggle');
      await preview.waitFor({ state: 'attached' });
      assert.deepEqual(await preview.evaluate(controlStyle), actual, 'preview matches Practice control');
      for (const [key, space] of [['browse', 'formulas'], ['page', 'formulas'], ['subject', 'formulas'], ['problem', 'practice'], ['lesson', 'learn']]) {
        assert.equal(await page.locator(`[data-pv="${key}"] .pv-inner`).getAttribute('data-space'), space);
      }
      await page.goto(`${url}/#/learn/amc-geometry/s5/6`);
      await page.locator('.lp-body').waitFor();
      const para = page.locator('.lp-body p').filter({ hasText: 'Two such circles of radii' });
      assert.equal(await para.count(), 1);
      assert.match(await para.innerText(), /externally tangent with both centers on the same bisector ray/);
      assert.match(await para.innerText(), /successive radius ratio/);
      assert.equal(await para.locator('a[data-card="circle-in-angle"]').count(), 1);
      assert.equal(await page.locator('.katex-error').count(), 0);
      console.log(`${theme}: Settings control fidelity and complete tangent-circle math/prose passed`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
