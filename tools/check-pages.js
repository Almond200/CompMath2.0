// Browser check of a few pages: KaTeX errors, broken card links, literal ** and horizontal
// overflow, at 1280 and 375 px, light and dark. Needs `python3 -m http.server 8765` running.
//   node tools/check-pages.js '#/f/some-card' '#/problem/2025-amc-10a-9' ...
const { chromium } = require(process.env.PLAYWRIGHT || '/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const theme of ['light', 'dark']) for (const w of [1280, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    await ctx.addInitScript(t => { try { localStorage.setItem('theme', t); } catch (e) {} }, theme);
    const pg = await ctx.newPage(); const errs = [];
    pg.on('pageerror', e => errs.push(e.message));
    for (const h of process.argv.slice(2)) {
      await pg.goto('http://localhost:8765/index.html?n=' + Date.now() + h); await pg.waitForTimeout(1500);
      const r = await pg.evaluate(() => ({
        katex: document.querySelectorAll('.katex-error').length,
        broken: document.querySelectorAll('.card-link-broken').length,
        stars: /\*\*/.test(document.querySelector('#content, main, body').innerText),
        over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        title: (document.querySelector('.card-name') || {}).textContent }));
      const fail = r.katex || r.broken || r.stars || r.over > 1 || errs.length;
      if (fail) bad++;
      if (fail || w === 1280 && theme === 'light') console.log(fail ? 'FAIL' : 'ok  ', theme, w, h, JSON.stringify(r), errs.join(' | '));
      errs.length = 0;
    }
    await ctx.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
