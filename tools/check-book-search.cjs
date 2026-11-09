// Served-browser checks: COMPMATH_URL=http://localhost:8765 CHROME=/path/to/chromium node tools/check-book-search.cjs
const {chromium}=require(process.env.PLAYWRIGHT || 'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=(process.env.COMPMATH_URL || 'http://localhost:8765').replace(/\/$/, '');
const artifacts=process.env.UI_ARTIFACT_DIR;if(artifacts)fs.mkdirSync(artifacts,{recursive:true});
(async()=>{
const browser=await chromium.launch({...(process.env.CHROME ? {executablePath:process.env.CHROME} : {}),args:['--no-sandbox']});
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:950},hasTouch:width===375,isMobile:width===375});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
 await page.clock.install();
 await page.goto(base+'/#/learn/amc-geometry');
 async function search(query,kind,keyboard=false){
  const input=page.locator('.book-search input:visible').first();await input.fill(query);
  assert.equal(await input.evaluate(el=>getComputedStyle(el).outlineStyle),'none','book search keeps a single focus border');
  const list=input.locator('..').locator('[role=listbox]');await list.waitFor({state:'visible'});
  const opts=list.locator('[role=option]');const kinds=await opts.locator('.set-find-group').allTextContents();
  const at=kinds.indexOf(kind);assert.ok(at>=0,query+' '+kind+' '+kinds);
  if(kind==='Index')assert.ok(at>=2,'Index follows direct results');
  if(keyboard){for(let i=0;i<at;i++)await input.press('ArrowDown');await input.press('Enter');}
  else await opts.nth(at).click();
  await page.locator('.bks-found').waitFor();
 }
 await search('power of a point','Index',true);
 await page.waitForTimeout(1700);
 assert.ok(page.url().endsWith('/s13/2'));
 const found=page.locator('.bks-found');
 assert.ok((await found.innerText()).startsWith('Power of a Point:'));
 assert.equal(await found.evaluate(el=>el===document.activeElement),true);
 const expected=await page.evaluate(()=>window.MATH_BOOK_INDEX['amc-geometry'].find(e=>e.term==='Power of a Point').lessons.length);
 assert.equal(await found.locator('a').count(),expected);
 let rect=await found.boundingBox();assert.ok(rect.y>90 && rect.y<850,JSON.stringify(rect));
 if(artifacts)await page.screenshot({path:path.join(artifacts,`index-${theme}-${width}.png`)});
 const target=await found.locator('a').first().getAttribute('href');
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),target);
 await page.keyboard.press('Enter');await page.waitForURL(u=>u.hash===target);
 await page.goBack();await page.waitForURL(u=>u.hash.endsWith('/s13/2'));
 await search('power of a point','Index');await page.waitForTimeout(1700);
 rect=await found.boundingBox();assert.ok(rect.y>90 && rect.y<850,JSON.stringify(rect));
 await page.clock.fastForward(5000);assert.equal(await found.count(),0);assert.equal(await page.locator('.bks-target:focus').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
 await search('power of a point','Glossary');assert.ok(page.url().endsWith('/s13/3'));
 assert.equal(await page.locator('.bks-found dfn').innerText(),'Power of a Point');
 await page.emulateMedia({reducedMotion:'reduce'});
 await search('power of a point','Index');
 const band=await page.locator('.bks-found').evaluate(el=>({animation:getComputedStyle(el,'::before').animationName,bg:getComputedStyle(el,'::before').backgroundColor}));
 assert.equal(band.animation,'none');assert.notEqual(band.bg,'rgba(0, 0, 0, 0)');
 await page.clock.fastForward(5000);assert.equal(await page.locator('.bks-found').count(),0);
 await page.goto(base+'/#/learn/amc-number-theory');
 const mathTerm=await page.evaluate(()=>window.MATH_BOOK_INDEX['amc-number-theory'].find(e=>e.term.includes('adic')).term);
 await search(mathTerm,'Index');assert.equal(await page.locator('.bks-found .book-index-entry').count(),1);
 assert.ok((await page.locator('.bks-found').innerText()).includes('adic'));
 await search(mathTerm,'Glossary');assert.ok((await page.locator('.bks-found dfn').innerText()).includes('adic'));
 assert.equal(await page.locator('.katex-error').count(),0);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);
 console.log(theme,width,'Index/Glossary priority, keyboard jump/focus, all lesson links, Back/repeat, fade, reduced motion, math terms: passed');
 await page.close();
}
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
