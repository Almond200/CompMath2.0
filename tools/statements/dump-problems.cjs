// Writes the problem list the statement tools need: slug, ref, family, round, year, number, paper url.
//   (python3 -m http.server 8765 &) ; node tools/statements/dump-problems.cjs SMT BMT ARML "ARML Local" > $STATEMENTS_WORK/probs.json
// Reads the app itself (the problem database loads on demand since 2026-11-20), so slugs and urls are the app's own.
const { chromium } = require('playwright');
(async () => {
  const FAMS = process.argv.slice(2);
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.route(/js\/app\.js/, async r => {
    const res = await r.fetch(); const t = await res.text();
    await r.fulfill({ response: res, body: t.replace('const hasProblemStatement =', 'window.__X = () => ({ PROBLEM_DB, loadProblems }); const hasProblemStatement =') });
  });
  await pg.goto(process.env.COMPMATH_URL || 'http://localhost:8765/'); await pg.waitForFunction(() => window.__X);
  const out = await pg.evaluate(async fams => {
    await window.__X().loadProblems();
    return window.__X().PROBLEM_DB.filter(p => fams.includes(p.fam)).map(p => ({ slug: p.slug, ref: p.ref, fam: p.fam, cname: p.cname, year: p.year, num: p.num, url: p.url, solUrl: p.solUrl }));
  }, FAMS);
  console.log(JSON.stringify(out)); await b.close();
})();
