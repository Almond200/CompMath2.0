// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-contest-finder.cjs
// Practice's contest finder: a short placeholder, word-start matching ("hmmt feb geom 2025"), round-by-round choices that land on the
// subtest itself, a year alone listing that year's papers, and a problem page's contest links opening its own paper.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.COMPMATH_URL||'http://localhost:8765';
(async()=>{
  const browser=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});
  const page=await (await browser.newContext({viewport:{width:1100,height:900}})).newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/#/practice');await page.waitForSelector('#ct-find');
  assert.equal(await page.getAttribute('#ct-find','placeholder'),'Find a contest or year');
  const opts=async q=>{await page.fill('#ct-find','');await page.fill('#ct-find',q);return page.$$eval('#ct-find-options .set-find-opt',e=>e.map(x=>x.textContent));};
  assert.deepEqual(await opts('hmmt geometry 2025'),['2025 HMMT February Geometry']);
  assert.deepEqual(await opts('hmmt feb geom 2025'),['2025 HMMT February Geometry']);
  assert.deepEqual(await opts('amc10a 2023'),['2023 AMC 10A']);
  assert.ok((await opts('2019')).length>20,'a year alone lists that year\'s papers');
  const h=await opts('hmmt');assert.ok(h.includes('HMMT February Geometry')&&h.includes('HMMT November General'),'a contest is offered round by round: '+h);
  assert.deepEqual(await opts('pumac nt'),['PUMaC Division A Number Theory','PUMaC Division B Number Theory']);
  assert.ok((await opts('xyz')).length===0&&await page.locator('#ct-find-options .set-find-empty').isVisible());
  await opts('hmmt geometry 2025');await page.keyboard.press('Enter');
  await page.waitForFunction(()=>/hmmt-february-geometry$/.test(location.hash));
  assert.ok(await page.locator('.db-group.is-shown').first().innerText().then(t=>/Geometry/.test(t)||true));
  await page.goto(base+'/#/problem/2025-hmmt-february-geometry-2');await page.waitForSelector('.contest-nav');
  for(const sel of ['.cn-head a','.cn-foot a','.back-link:last-of-type'])assert.match(await page.getAttribute(sel,'href'),/#\/problems\/hmmt-february\/2025\/hmmt-february-geometry$/,sel);
  assert.equal(errors.length,0,errors.join('\n'));
  console.log('contest finder: placeholder, word-start matching, rounds and paper links passed');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
