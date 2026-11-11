// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-practice-card.cjs
// Practice a card: the panel after Practice a contest, the kind chooser, the card search with
// counts, difficulty in Elo terms, and a generated set whose every problem cites the card.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const base=process.env.COMPMATH_URL||'http://localhost:8765',root=path.join(__dirname,'..');
global.window={};require(path.join(root,'js/data/problems/problem-db.js'));
const slug=ref=>ref.toLowerCase().replace(/,?\s*problem\s+/,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const cites=new Map(window.MATH_PROBLEM_DB.map(p=>[slug(p.ref),{cards:new Set([...(p.formulas||[]),...(p.trickFormulas||[])]),strategy:p.strategy,ref:p.ref}]));
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||undefined,args:['--no-sandbox']});try{
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
 const fits=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow at '+page.url());
 await page.goto(base+'/#/practice');const form=page.locator('#card-practice-form');await form.waitFor();
 const heads=await page.locator('.sh-section > h3').allInnerTexts();assert.equal(heads[heads.indexOf('Practice a contest')+1],'Practice a card','it follows Practice a contest');
 assert.deepEqual(await form.locator('[data-card-kind]').allInnerTexts(),['Formula','Method','Pattern']);assert.equal(await form.locator('[type="submit"]').isDisabled(),true);
 assert.match(await page.locator('#card-band-note').innerText(),/^Difficulty is measured inside the card you choose/);
 // With nothing typed the most used formulas are offered, most problems first.
 const input=page.locator('#card-practice-name'),opts=page.locator('#card-practice-options button');
 await input.click();assert.equal(await opts.count(),8);
 const counts=(await opts.locator('.practice-topic-context').allInnerTexts()).map(t=>parseInt(t));assert.deepEqual(counts,[...counts].sort((a,b)=>b-a));
 assert.equal(await opts.first().locator('.practice-topic-name').innerText(),'Pythagorean Theorem');
 // Typing narrows by name; the keyboard chooses.
 await input.fill('pyth');assert((await opts.allInnerTexts()).every(t=>/pyth/i.test(t)));await input.press('ArrowDown');await input.press('ArrowUp');await input.press('Enter');
 assert.equal(await input.inputValue(),'Pythagorean Theorem');assert.equal(await page.locator('#card-practice-options').isVisible(),false);
 const avail=parseInt(await page.locator('#card-practice-status').innerText());assert.equal(avail,counts[0]);assert.equal(await form.locator('[type="submit"]').isEnabled(),true);
 await page.locator('#card-band').fill('5');const note=await page.locator('#card-band-note').innerText();assert.match(note,/^Very hard for this card is an Elo rating of \d+ to \d+: one fifth of its problems/);
 const few=parseInt(await page.locator('#card-practice-status').innerText());assert(few<avail&&few>=Math.floor(avail/5));
 await page.locator('#card-band').fill('0');await page.locator('#card-count').fill('7');assert.equal(await page.locator('#card-count-value').innerText(),'7');
 // The set: seven problems, each citing the card, no shared AMC 10/12 problem twice, saved with the card's id.
 await form.locator('[type="submit"]').click();await page.waitForFunction(()=>/#\/practice\/set\//.test(location.hash));await page.locator('.practice-session-top').waitFor();
 assert.match(await page.locator('.practice-session-top h2').innerText(),/^Practice set · Pythagorean Theorem$/);
 const set=await page.evaluate(()=>JSON.parse(localStorage.getItem('mq-practice-sets')).find(s=>location.hash.endsWith(s.id)));
 assert.equal(set.cardId,'pythagorean-theorem');assert.equal(set.slugs.length,7);assert.equal(new Set(set.slugs).size,7);
 for(const s of set.slugs)assert(cites.get(s)?.cards.has('pythagorean-theorem'),s+' cites the card');
 assert.equal(new Set(set.slugs.map(s=>cites.get(s).ref.slice(0,4)+'|'+cites.get(s).strategy)).size,7,'no problem appears as both its AMC 10 and AMC 12 copy');
 await fits();
 // Methods and patterns have their own lists; a card with few problems caps the count.
 await page.goto(base+'/#/practice');await form.waitFor();await page.locator('[data-card-kind="method"]').click();assert.equal(await input.getAttribute('placeholder'),'Search a method...');
 await input.click();assert.equal(await opts.first().locator('.practice-topic-name').innerText(),'Casework');
 await page.locator('[data-card-kind="pattern"]').click();await input.click();assert(await opts.count()>0);const pat=await opts.first().locator('.practice-topic-name').innerText();await opts.first().click();
 assert.equal(await input.inputValue(),pat);assert.match(await page.locator('#card-practice-status').innerText(),/^\d+ matching problems? available\.$/);
 await page.locator('[data-card-kind="formula"]').click();await input.fill('hook');await opts.first().click();const n=parseInt(await page.locator('#card-practice-status').innerText());
 assert(n>=1&&n<30);assert.equal(await page.locator('#card-count').getAttribute('max'),String(n));
 await input.fill('zzzz');assert.equal(await page.locator('#card-practice-options').isVisible(),false);assert.equal(await page.locator('#card-practice-status').innerText(),'Choose a card from the suggestions.');assert.equal(await form.locator('[type="submit"]').isDisabled(),true);
 await fits();assert.equal(await page.locator('.katex-error').count(),0);assert.deepEqual(errors,[]);
 console.log(theme,width,'Practice a card: panel order, kinds, search, counts, difficulty note, generated set: passed');await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
