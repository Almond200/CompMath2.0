// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-browse.cjs
// Problem-page Topic/Difficulty sections, the Contests buttons, Problems by topic and Problems by difficulty.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.COMPMATH_URL||'http://localhost:8765';
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||undefined,args:['--no-sandbox']});try{
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(t=>{localStorage.setItem('theme',t);localStorage.setItem('mq-strategy','shown');},theme);
 const fits=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow at '+page.url());
 const go=async h=>{await page.evaluate(h=>{location.hash=h},h);await page.waitForTimeout(250);};
 // Problem page: no chips under the heading; Topic tree, Difficulty chart, Brief solution in order.
 await page.goto(base+'/#/problem/2019-aime-i-4');await page.locator('.prob-chain').waitFor();
 const t=page.locator('.prob-chain .chain-toggle');if(await t.getAttribute('aria-expanded')==='false')await t.click();
 assert.equal(await page.locator('.detail > .ptype-row').count(),0);
 assert.deepEqual(await page.locator('.prob-chain .chain-study-h').allInnerTexts(),['Topic','Difficulty','Brief solution','Study a concept more']);
 assert.equal(await page.locator('.ptree-node.is-filed').count(),2);assert.equal(await page.locator('.ptree-group').count(),1,'shared beginning drawn once');
 // Each elbow's arrow tip is level with the middle of its box's first line (the box's padding
 // is a pixel heavier on top, so the middle is taken across both paddings). The stem is an SVG
 // stroke from the same left edge and of the same width as the elbow, starts at the row's top
 // and runs into the elbow (last row) or past the row's foot (the rows before it).
 const lis=await page.locator('.ptree-list li').all();
 for(const li of lis){const a=await li.locator(':scope > .ptree-elbow').boundingBox(),n=await li.locator(':scope > .ptree-node').boundingBox(),st=await li.locator(':scope > .ptree-stem').boundingBox(),row=await li.boundingBox();
  const line=await li.locator(':scope > .ptree-node').evaluate(el=>{const cs=getComputedStyle(el);return parseFloat(cs.borderTopWidth)+(parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom))/2+parseFloat(cs.lineHeight)/2;});
  assert(Math.abs((a.y+a.height/2)-(n.y+line))<0.75,'arrow level with its box');assert(a.x+a.width<=n.x+0.5,'arrow ends before its box');
  assert(Math.abs(st.x-a.x)<0.01&&Math.abs(st.y-row.y)<0.01,'stem starts at the row top, on the elbow\'s edge');
  const last=await li.evaluate(el=>!el.nextElementSibling);
  if(last)assert(st.y+st.height>a.y&&st.y+st.height<=a.y+2.01,'last stem ends inside the elbow');else assert(st.y+st.height>=row.y+row.height,'stem runs through to the next row');
  assert.deepEqual(await li.evaluate(el=>['.ptree-stem','.ptree-elbow'].map(q=>{const cs=getComputedStyle(el.querySelector(':scope > '+q));return cs.strokeWidth+' '+cs.stroke;})).then(x=>x[0]===x[1]),true,'one stroke for stem and elbow');
  assert.equal(await li.evaluate(el=>getComputedStyle(el,'::before').content),'none','no CSS-drawn stem');}
 assert(lis.length>=3);
 assert.equal(await page.locator('.elo-box .elo-num').innerText(),'2350');assert.match(await page.locator('.elo-note').innerText(),/of AIME problems/);assert.doesNotMatch(await page.locator('.prob-chain').innerText(),/LIVE/);
 assert.equal(await page.locator('.elo-box .elo-bar.is-cur').count(),1);
 await page.locator('[data-elo-fam="all"]').click();assert.match(await page.locator('.elo-note').innerText(),/of all problems/);assert.equal(await page.locator('[data-elo-fam][aria-pressed="true"]').count(),1);
 await fits();
 // A problem's topic box opens that topic.
 await page.locator('.ptree-node.is-filed').first().click();await page.locator('.browse-topics').waitFor();
 assert.match(page.url(),/#\/browse\/topics\/cp\./);assert.equal(await page.locator('.tt-row.is-cur').count(),1);assert.equal(await page.locator('.tt').isVisible(),width!==375,'the rail folds away on a phone');
 // Contests: two buttons, no icons, above the first contest row.
 await go('#/practice');const btns=page.locator('#pr-contests .ct-browse-btn');assert.deepEqual(await btns.allInnerTexts(),['Browse by topic','Browse by difficulty']);
 assert.equal(await btns.locator('svg').count(),0);assert((await btns.first().boundingBox()).height<=32);
 assert((await btns.first().boundingBox()).y<(await page.locator('#pr-contests .ct-row').first().boundingBox()).y);
 // Problems by topic: its own page, the tree rail, groups by contest.
 await btns.first().click();await page.locator('.browse-topics').waitFor();assert.equal(await page.locator('h2').innerText(),'Problems by topic');
 assert.equal(await page.locator('.br-switch').count(),0,'no toggle between the two pages');
 // The rail scrolls with the app's own scrollbar, not the browser's (no scrollbar-width override).
 assert.equal(await page.locator('.tt').evaluate(el=>getComputedStyle(el).scrollbarWidth),'auto');
 const rows=page.locator('.tt-row');assert.equal(await page.locator('.tt-list > li > .tt-row [aria-expanded="true"]').count(),4,'subjects open to their areas');
 const before=await rows.count();assert(before>=4+28);await page.locator('[data-tt="geo.tri"]').click();assert.equal(await page.locator('[data-tt="geo.tri"]').getAttribute('aria-expanded'),'true');assert(await rows.count()>before);
 assert.match(page.url(),/#\/browse\/topics$/,'opening a branch does not leave the page');
 await page.locator('.tt-name[href="#/browse/topics/geo.tri.special"]').click();await page.locator('.br-group').first().waitFor();
 assert.equal(await page.locator('h2').innerText(),'Special triangles');
 const heads=await page.locator('.br-group-h').evaluateAll(hs=>hs.map(h=>h.childNodes[1].textContent));assert.deepEqual(heads,['AMC 8','AMC 10','AMC 12','AIME']);
 const total=(await page.locator('.br-group-h .br-count').allInnerTexts()).reduce((n,s)=>n+parseInt(s),0);assert.match(await page.locator('.practice-panel-intro').innerText(),new RegExp('^'+total+' problems'));
 const elos=(await page.locator('.br-group').first().locator('.br-elo').allInnerTexts()).map(Number);assert.deepEqual(elos,[...elos].sort((a,b)=>a-b),'easiest first within a contest');
 await page.locator('[data-br-fam="AMC 8"]').click();assert.equal(await page.locator('[data-br-fam="AMC 8"]').getAttribute('aria-pressed'),'false');assert.equal(await page.locator('.br-group').count(),3);
 if(width===375){assert.equal(await page.locator('.tt').isVisible(),false);await page.locator('.tt-mobile-btn').click();assert.equal(await page.locator('.tt').isVisible(),true);}
 await fits();
 // Problems by difficulty: the contest switched off stays off, one stacked chart, groups by contest.
 await go('#/browse/difficulty');await page.locator('.elo-panel').waitFor();assert.equal(await page.locator('h2').innerText(),'Problems by difficulty');assert.doesNotMatch(await page.locator('.browse-page').innerText(),/LIVE/,'the ratings carry no source name');
 assert.equal(await page.locator('[data-br-fam="AMC 8"]').getAttribute('aria-pressed'),'false');await page.locator('[data-br-fam="AMC 8"]').click();
 assert.equal(await page.locator('.elo-panel .elo-bar').count(),18);assert.equal(await page.locator('.elo-bar[aria-current]').count(),1);
 await page.locator('.elo-bar[href$="/2600"]').click();await page.waitForFunction(()=>/2600/.test(document.querySelector('.br-band-h')?.textContent));assert.match(await page.locator('.br-band-h').innerText(),/^Rated 2600 to 2799$/);
 const shown=parseInt((await page.locator('.br-band .br-count').innerText()).replace(',',''));
 const expected=await page.evaluate(()=>Object.values(MATH_PROBLEM_RATINGS.ratings).filter(r=>r.elo>=2600&&r.elo<2800).length);assert.equal(shown,expected);
 const years=(await page.locator('.br-group').last().locator('.br-ref').allInnerTexts()).map(s=>+s.slice(0,4));assert.deepEqual(years,[...years].sort((a,b)=>b-a),'newest first within a contest');
 for(const f of ['AMC 8','AMC 10','AMC 12','HMMT February'])await page.locator(`[data-br-fam="${f}"]`).click();
 assert.deepEqual(await page.locator('.br-group-h').evaluateAll(hs=>hs.map(h=>h.childNodes[1].textContent)),['AIME']);
 await page.locator('[data-br-fam="AIME"]').click();assert.equal(await page.locator('[data-br-fam][aria-pressed="true"]').count(),5,'switching the last contest off restores all');
 const more=page.locator('[data-br-more]').first();if(await more.count()){const g=more.locator('xpath=..');const n=parseInt(await g.locator('.br-count').innerText());await more.click();assert.equal(await page.locator('.br-group').filter({has:page.locator('.br-count',{hasText:new RegExp('^'+n+' ')})}).first().locator('.br-row').count(),n);}
 await page.locator('.br-step').first().click();await page.waitForFunction(()=>/2400/.test(document.querySelector('.br-band-h')?.textContent));assert.match(await page.locator('.br-band-h').innerText(),/^Rated 2400 to 2599$/);
 await page.locator('.br-row').first().click();await page.locator('.prob-chain').waitFor();await page.goBack();await page.locator('.br-band-h').waitFor();
 assert.match(await page.locator('.back-link').first().innerText(),/Contests/);
 await fits();assert.equal(await page.locator('.katex-error').count(),0);assert.deepEqual(errors,[]);
 console.log(theme,width,'problem sections, arrow alignment, Contests buttons, topic rail and contest groups, difficulty chart and ranges: passed');await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
