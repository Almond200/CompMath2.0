// Check the backward archive lane against the official round names and PDF addresses.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.COMPMATH_URL || 'http://localhost:8898';
// The 2011 mixed papers reuse 27 questions across 60 paper references.
// Preserve those paper references while requiring shared questions to agree.
const fs = require('node:fs'), vm = require('node:vm');
const context = { window: {} };
for (const file of ['problem-db.js', 'difficulty-ratings.js'])
  vm.runInNewContext(fs.readFileSync(`js/data/problems/${file}`, 'utf8'), context);
const shared = [
  ['Algebra and Combinatorics', Array.from({length:20}, (_, i) => i + 1)],
  ['Algebra and Geometry', [1,3,4,21,5,6,7,8,9,22,11,23,13,24,15,25,17,26,19,27]],
  ['Combinatorics and Geometry', [2,3,1,4,21,6,8,10,22,12,23,14,24,16,15,25,18,26,20,27]]
];
const groups = new Map();
for (const [round, ids] of shared) for (const [i, id] of ids.entries()) {
  const ref = `2011 HMMT February ${round}, Problem ${i + 1}`;
  const problem = context.window.MATH_PROBLEM_DB.find(p => p.ref === ref);
  assert(problem, ref);
  const slug = ref.replace(', Problem ', ' ').toLowerCase().replaceAll(' ', '-');
  const metadata = JSON.stringify([problem.formulas, problem.tree, context.window.MATH_PROBLEM_RATINGS.ratings[slug].elo]);
  if (groups.has(id)) assert.equal(metadata, groups.get(id), ref + ': shared question metadata');
  else groups.set(id, metadata);
}
assert.equal(groups.size, 27);

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    for (const theme of ['light', 'dark']) for (const width of [1280, 375]) {
      const page = await browser.newPage({ viewport: { width, height: 950 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(theme => localStorage.setItem('theme', theme), theme);
      const roundYears = [[2018, 'Algebra and Number Theory', 'algnt'], [2017, 'Algebra and Number Theory', 'algnt'], [2016, 'Algebra', 'alg'], [2015, 'Algebra', 'alg'], [2014, 'Algebra', 'alg'], [2013, 'Algebra', 'alg'], [2012, 'Algebra', 'alg'], [2010, 'Algebra', 'alg'], [2009, 'Algebra', 'alg'], [2008, 'Algebra', 'alg'], [2007, 'Algebra', 'alg'], [2006, 'Algebra', 'alg'], [2005, 'Algebra', 'alg'], [2004, 'Algebra', 'alg'], [2003, 'Algebra', 'alg'], [2002, 'Algebra', 'alg']];
      const mixedRounds = [['Algebra and Combinatorics', 'algcomb'], ['Algebra and Geometry', 'alggeo'], ['Combinatorics and Geometry', 'combgeo']];
      roundYears.push([2011]);
      for (const [year, algebra, algebraFolder] of roundYears) {
        if (process.env.HMMT_YEARS && !process.env.HMMT_YEARS.split(',').map(Number).includes(year)) continue;
        const counting = year <= 2002 ? ['Advanced Topics', 'adv'] : ['Combinatorics', 'comb'];
        const rounds = year === 2011 ? mixedRounds : [[algebra, algebraFolder], counting, ['Geometry', 'geo']];
        const count = year === 2011 ? 20 : 10;
        await page.goto(`${base}/#/problems/hmmt-february/${year}`);
        await page.locator('.ct-papers [role="tab"]').first().waitFor();
        assert.deepEqual(await page.locator('.ct-papers [role="tab"]').allInnerTexts(), rounds.map(([round]) => round.replaceAll(' and ', ' & ')));
        assert.equal(await page.locator('.db-group.is-shown .pp-tiles .br-row').count(), count);
        for (const [round, folder] of rounds) {
          const numbers = year === 2010 && round === 'Algebra' ? [1, 2, count] : year === 2018 && round === 'Geometry' ? [1, 6, count] : [1, count];
          for (const number of numbers) {
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
