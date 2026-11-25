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
  for(const [query,expected] of [['calagry contest','Calgary Junior Math Contest'],['cayely contset','Cayley Contest'],['stanfrd math competition','SMT'],['montgmery blair tournament','MBMT'],['2009 princetno geometry','PUMaC']]){
    const first=(await opts(query))[0];
    assert.ok(first?.includes(expected),query+' in Practice: '+first);
    await page.locator('#search-input').fill(query);
    await page.locator('.results-meta').filter({hasText:query}).waitFor();
    assert.ok((await page.locator('.card-contest-result .card-name').first().innerText()).includes(expected),query+' in main search');
    await page.goto(base+'/#/practice');await page.waitForSelector('#ct-find');
  }
  const broad='stanfrd math contest';await page.locator('#search-input').fill(broad);
  await page.locator('.results-meta').filter({hasText:broad}).waitFor();
  const cards=page.locator('.search-results > .card');
  assert.equal(await cards.count(),24,'only the first page is mounted');
  const next=page.locator('.rs-more');await next.focus();await next.press('Enter');
  assert.equal(await cards.count(),48,'mount only one additional page');
  assert(await cards.nth(24).evaluate(card=>card.contains(document.activeElement)),'keyboard users can start reading the new page');
  for (const [q, slug] of [
    ['2019 bmt algebra p3','2019-bmt-algebra-3'], ['2019 bmt algebra 3','2019-bmt-algebra-3'],
    ['2019 bmt alg q 3','2019-bmt-algebra-3'], ['2019 bmt algebra problem #3','2019-bmt-algebra-3'],
    ['2025 hmmt feb geo p3','2025-hmmt-february-geometry-3'],
    ['2024 aime ii p3','2024-aime-ii-3'], ['2026 amc10b #24','2026-amc-10b-24']
  ]) {
    await page.locator('#search-input').fill(q);
    await page.locator('.results-meta').filter({hasText:q}).waitFor();
    assert.equal(await cards.first().getAttribute('href'),'#/problem/'+slug,q);
  }
  const ref='2024 cayely contest #3';await page.locator('#search-input').fill(ref);
  await page.locator('.results-meta').filter({hasText:ref}).waitFor();
  assert.match(await page.locator('.search-results > .card').first().getAttribute('href'),/2024-cayley-contest-3$/);
  await page.goto(base+'/#/practice');await page.waitForSelector('#ct-find');
  await opts('hmmt geometry 2025');await page.keyboard.press('Enter');
  await page.waitForFunction(()=>/hmmt-february-geometry$/.test(location.hash));
  assert.ok(await page.locator('.db-group.is-shown').first().innerText().then(t=>/Geometry/.test(t)||true));
  await page.goto(base+'/#/problem/2025-hmmt-february-geometry-2');await page.waitForSelector('.contest-nav');
  for(const sel of ['.cn-head a','.cn-foot a','.back-link:last-of-type'])assert.match(await page.getAttribute(sel,'href'),/#\/problems\/hmmt-february\/2025\/hmmt-february-geometry$/,sel);
  await page.goto(base+'/#/practice');
  assert.deepEqual(await opts('caltech math meet 2026'),['2026 CMM Individual']);
  assert.deepEqual(await opts('chmmc 2022'),['2022 CHMMC Individual']);
  await page.goto(base+'/#/problems/chmmc/2026');
  await page.waitForURL('**/#/problems/cmm/2026');
  await page.getByRole('heading',{name:'CMM 2026',exact:true}).waitFor();
  await page.goto(base+'/#/problem/2026-chmmc-individual-1');
  await page.getByRole('heading',{name:'2026 CMM Individual #1',exact:true}).waitFor();
  assert.equal(await page.locator('.statement-credit').innerText(),'© Caltech Math Meet');
  await page.goto(base+'/#/problem/2022-chmmc-individual-1');
  await page.getByRole('heading',{name:'2022 CHMMC Individual #1',exact:true}).waitFor();
  assert.equal(await page.locator('.statement-credit').innerText(),'© Caltech Harvey Mudd Math Competition');
  assert.equal(errors.length,0,errors.join('\n'));
  console.log('contest finder: placeholder, word-start matching, rounds and paper links passed');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
