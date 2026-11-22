#!/usr/bin/env node
// Checks the Special: commands (owner, 2026-11-22): Random/Problem's suggestions list every contest family with the
// count the command draws from and then the five difficulty levels; Contest, Topic and Book open the right pages;
// Statistics renders its tables with real counts, in both themes, without overflow at 375 px.
//   CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-commands.cjs
const assert = require('assert');
const { chromium } = require('playwright');
const URL = process.env.COMPMATH_URL || 'http://localhost:8765';
(async () => {
  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  for (const scheme of ['light', 'dark']) for (const width of [1100, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme });
    const errors = []; page.on('pageerror', e => errors.push(String(e)));
    const suggest = async q => {
      await page.goto(URL + '/#/'); await page.waitForTimeout(1200);
      await page.locator('header input').first().fill(q); await page.waitForTimeout(500);
      return page.locator('.cmd-suggest .cs-item').evaluateAll(a => a.map(x => x.innerText.replace(/\s*\n\s*/g, ' | ')));
    };
    let items = await suggest('special:random/problem/');
    const fams = items.length;
    assert.ok(items[0].startsWith('Special:Random/Problem/AMC 8'), 'families listed in Contests order: ' + items[0]);
    assert.ok(fams > 30, `every family offered (${fams})`);
    assert.match(items.find(i => i.startsWith('Special:Random/Problem/AMC 12 ')), /3,\d{3} problems/, 'AMC 12 counts AHSME too');
    items = await suggest('special:random/problem/AIME/');
    assert.deepEqual(items.map(i => i.split(' | ')[0].split('/').pop()), ['Very easy', 'Easy', 'Medium', 'Hard', 'Very hard']);
    items = await suggest('special:topic/power of');
    assert.ok(items[0].startsWith('Special:Topic/Power of a point'), items[0]);
    for (const [cmd, want] of [['contest/hmmt feb geom 2025', '#/problems/hmmt-february/2025/hmmt-february-geometry'],
      ['contest/amc10a 2023', '#/problems/amc-10/2023'], ['topic/power of a point', '#/browse/topics/geo.circ.power.pop'],
      ['book/aime geometry', '#/learn/aime-geometry']]) {
      await page.goto(URL + '/#/special/' + cmd); await page.waitForTimeout(2000);
      assert.ok(decodeURIComponent(new globalThis.URL(page.url()).hash).startsWith(want), `${cmd} -> ${page.url()}`);
    }
    await page.goto(URL + '/#/special/random/problem/AIME/hard'); await page.waitForTimeout(2000);
    assert.match(page.url(), /#\/problem\/\d{4}-aime/, 'random AIME problem');
    await page.goto(URL + '/#/special/statistics'); await page.waitForTimeout(3500);
    const heads = await page.locator('.special-page .st-head').allInnerTexts();
    assert.deepEqual(heads, ['Library', 'Problems', 'Contests', 'Topic tree', 'Learn', 'Connections', 'Figures and examples', 'You']);
    const rows = Object.fromEntries(await page.locator('.special-table tr').evaluateAll(a => a.map(r => [r.cells[0].innerText.trim(), r.cells[1].innerText.trim()])));
    const num = k => +String(rows[k] || '').split(' ')[0].replace(/,/g, '');
    const db = await page.evaluate(() => ({ n: window.MATH_PROBLEM_DB.length }));
    assert.equal(+rows['Practice problems'].replace(/,/g, ''), db.n);
    assert.equal(num('Contests'), fams, 'one suggestion per contest family');
    assert.ok(num('With an answer key for Practice sets') > 1000, 'answer keys loaded: ' + rows['With an answer key for Practice sets']);
    assert.ok(num('Textbooks') >= 13 && num('Topics') > 400, 'Learn and tree counts');
    assert.equal(await page.locator('.katex-error').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'no horizontal overflow');
    assert.deepEqual(errors, []);
    console.log(`${scheme} ${width} commands: Random/Problem suggestions, Contest, Topic, Book and Statistics passed`);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
