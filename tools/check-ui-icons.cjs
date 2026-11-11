// Served-browser checks: CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-ui-icons.cjs
const {chromium}=require(process.env.PLAYWRIGHT || 'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=(process.env.COMPMATH_URL || 'http://localhost:8765').replace(/\/$/,''),artifacts=process.env.UI_ARTIFACT_DIR;
if(artifacts)fs.mkdirSync(artifacts,{recursive:true});
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROME?{executablePath:process.env.CHROME}:{}),args:['--no-sandbox']});
 for(const theme of ['light','dark'])for(const width of [1280,375]){
  const p=await browser.newPage({viewport:{width,height:950},hasTouch:width===375,isMobile:width===375}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(15000);
  await p.addInitScript(t=>localStorage.setItem('theme',t),theme);
  await p.goto(base+'/#/formulas/geometry');await p.locator('.star-btn').first().waitFor();
  async function centered(control){
   await control.scrollIntoViewIfNeeded();await p.mouse.move(width-1,949);
   const measure=()=>control.evaluate(el=>{
    const r=el.getBoundingClientRect(),svg=el.querySelector('svg'),s=svg.getBoundingClientRect(),b=svg.getBBox();
    return {w:s.width,h:s.height,dx:s.x+s.width/2-r.x-r.width/2,dy:s.y+s.height/2-r.y-r.height/2,cx:b.x+b.width/2,cy:b.y+b.height/2};
   });
   const old=await measure();assert.ok(old.w>0&&old.h>0);
   assert.ok(Math.abs(old.dx)<.2&&Math.abs(old.dy)<.2,JSON.stringify(old));
   assert.ok(Math.abs(old.cx-12)<.11&&Math.abs(old.cy-12)<.11,'drawn bounds centered: '+JSON.stringify(old));
   for(const font of ['serif','monospace']){await control.evaluate((el,font)=>el.style.fontFamily=font,font);assert.deepEqual(await measure(),old,'font family cannot move the icon');}
   await control.evaluate(el=>el.style.removeProperty('font-family'));
  }
  if(width===375){
   await centered(p.locator('#nav-toggle'));
   await p.locator('#nav-toggle').click();assert.equal(await p.locator('#nav-toggle').getAttribute('aria-expanded'),'true');
   await p.keyboard.press('Escape');assert.equal(await p.locator('#nav-toggle').getAttribute('aria-expanded'),'false');
  }
  // Formulas, Methods and Patterns sit behind the one Reference menu at every width.
  assert.deepEqual(await p.locator('#space-switch > button, #space-switch > .space-ref > button').evaluateAll(xs=>xs.map(x=>x.textContent.trim())),['Reference','Learn','Practice']);
  await p.locator('#space-ref-btn').click();assert.equal(await p.locator('#space-ref-btn').getAttribute('aria-expanded'),'true');
  assert.deepEqual(await p.locator('#space-ref-menu button:visible').allInnerTexts(),['Formulas','Methods','Patterns']);
  await p.keyboard.press('Escape');assert.equal(await p.locator('#space-ref-menu').isVisible(),false);
  await p.locator('#space-ref-btn').click();await p.locator('#space-ref-menu [data-space-go="methods"]').click();
  await p.waitForFunction(()=>document.body.dataset.space==='methods');assert.equal(await p.locator('#space-ref-menu').isVisible(),false);
  assert.equal(await p.evaluate(()=>{const b=document.getElementById('space-ref-btn'),l=document.querySelector('[data-space-go="learn"]');return getComputedStyle(b).backgroundColor!==getComputedStyle(l).backgroundColor;}),true,'Reference is lit in a reference space');
  await p.locator('#space-ref-btn').click();await p.locator('#space-ref-menu [data-space-go="formulas"]').click();await p.waitForFunction(()=>document.body.dataset.space==='formulas');
  const star=p.locator('.star-btn').first();await centered(star);const id=await star.getAttribute('data-star');
  assert.equal(await star.locator('.ui-icon-star-outline').count(),1);await star.click();assert.equal(await star.getAttribute('aria-pressed'),'true');assert.equal(await star.locator('.ui-icon-star').count(),1);
  const add=p.locator('.addlist-btn').first();await centered(add);
  assert.ok(await add.evaluate(el=>Math.abs(el.getBoundingClientRect().width-el.getBoundingClientRect().height)<.1),'add-to-list button is square');
  await add.click();
  const newName=p.getByRole('textbox',{name:'New list name',exact:true});await newName.focus();
  assert.equal(await newName.evaluate(el=>getComputedStyle(el).outlineStyle),'none','compact popup field has no outer ring');
  const create=p.locator('.lm-new button');
  const normal=await create.evaluate(el=>{const c=getComputedStyle(el);return {bg:c.backgroundColor,color:c.color};});
  await create.hover();await p.waitForTimeout(180);
  assert.ok(await create.evaluate((el,normal)=>{const c=getComputedStyle(el),probe=document.createElement('span');probe.style.color='var(--accent)';document.body.append(probe);const accent=getComputedStyle(probe).color;probe.remove();return c.backgroundColor===normal.bg && c.color===accent && c.borderColor===accent && c.color!==normal.color;},normal),'Create keeps the soft background and gains blue hover feedback');
  if(artifacts)await p.locator('.listmenu').screenshot({path:path.join(artifacts,`list-popup-${theme}-${width}.png`)});

  const member=p.locator('.listmenu [data-lm-toggle="starred"]');assert.equal(await member.isChecked(),true);
  await member.uncheck();assert.equal(await star.getAttribute('aria-pressed'),'false');assert.equal(await star.locator('.ui-icon-star-outline').count(),1);
  await p.keyboard.press('Escape');
  for(const [name,expected] of [['','Untitled list'],['   ','Untitled list 2']]){
   await add.click();await newName.fill(name);await create.click();await p.locator('.listmenu').waitFor({state:'detached'});
   const made=await p.evaluate(name=>JSON.parse(localStorage.getItem('mq-lists')).items.find(l=>l.name===name),expected);
   assert.ok(made,'blank names get the next numbered default');assert.deepEqual(made.ids,[id],'the current card is added');
  }
  await star.click();await p.reload();await p.locator(`.star-btn[data-star="${id}"]`).waitFor();
  assert.equal(await p.locator(`.star-btn[data-star="${id}"] .ui-icon-star`).count(),1);
  await p.locator('[data-space-go="learn"]:visible').click();await p.locator('#pr-lists').waitFor();
  const starred=p.locator('#pr-lists a[href="#/list/starred"]');assert.equal(await starred.locator('.ui-icon-star').count(),1);await starred.click();await p.locator(`.star-btn[data-star="${id}"]`).waitFor();
  await p.locator('#adv-btn').click();await centered(p.locator('.adv-tagmodal .modal-close'));
  await p.locator('#adv-tag-search').fill('circle');await p.locator('[data-adv-tag="circles"]').click();
  assert.equal(await p.locator('[data-adv-tag-remove="circles"]').getAttribute('aria-label'),'Remove tag circles');
  await p.locator('[data-adv-tag-remove="circles"]').click();assert.equal(await p.locator('[data-adv-tag-remove="circles"]').count(),0);
  await p.locator('.adv-tagmodal .modal-close').click();assert.equal(await p.locator('.adv-tagmodal').count(),0);
  await p.goto(base+'/#/learn/amc-geometry/s5/5');await p.locator('.bk-foot-link').first().waitFor();
  const bookNext=p.locator('.bk-arrow:not(.is-off)').last();if(await bookNext.isVisible())await centered(bookNext);
  assert.ok(await p.locator('.bk-foot-a .ui-icon').count()>0);
  const next=p.locator('.bk-foot-next');const target=await next.getAttribute('href');await next.click();await p.waitForURL(u=>u.hash===target);
  await p.goto(base+'/#/problem/2018-amc-10a-1');await p.locator('.aops-btn .ui-icon-arrow-up-right').waitFor();
  assert.ok((await p.locator('.aops-btn').getAttribute('href')).startsWith('http'));
  assert.equal(await p.locator('.katex-error').count(),0);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.ok(!await p.locator('#content').innerText().then(s=>s.includes('${uiIcon')),'no literal template fragments');
  assert.deepEqual(errors,[]);
  if(artifacts){await p.goto(base+'/#/learn');await p.locator('#pr-lists').waitFor();await p.locator('#pr-lists').screenshot({path:path.join(artifacts,`lists-${theme}-${width}.png`)});await p.goto(base+'/#/formulas/geometry');await p.locator('.star-btn').first().waitFor();await p.screenshot({path:path.join(artifacts,`icons-${theme}-${width}.png`)});}
  console.log(theme,width,'centered/font-independent icons, star/menu synchronization and persistence, dialogs/tags, book links, source links: passed');await p.close();
 }
 // Experimental flashcard source-link and topic-tree disclosure icons use the same SVG shapes.
 const p=await browser.newPage();await p.goto(base+'/lab/flashcards.html');await p.locator('button').first().waitFor();
 assert.equal(await p.evaluate(()=>typeof window.AppIcons.svg),'function');
 await p.locator('#go').click();await p.locator('#flip').click();
 assert.equal(await p.locator('.open .ui-icon-arrow-up-right').count(),1);
 await p.goto(base+'/lab/quiz.html');assert.equal(await p.evaluate(()=>typeof window.AppIcons.svg),'function');
 await p.locator('#go').click();await p.locator('.opt').first().click();assert.equal(await p.locator('#after .ui-icon-chevron-right').count(),1);
 await p.goto(base+'/lab/topic-tree.html');await p.locator('details.node').first().waitFor();
 assert.ok((await p.locator('details.node > summary').first().evaluate(el=>getComputedStyle(el,'::before').maskImage)).includes('data:image/svg+xml'));
 assert.equal(await p.locator('a[href="../index.html#/settings"] .ui-icon-arrow-left').count(),1);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
