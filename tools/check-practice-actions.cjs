// Served UI checks: CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-practice-actions.cjs
const{chromium}=require(process.env.PLAYWRIGHT || 'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=(process.env.COMPMATH_URL||'http://localhost:8765').replace(/\/$/,''),dir=process.env.UI_ARTIFACT_DIR;if(dir)fs.mkdirSync(dir,{recursive:true});
(async()=>{const b=await chromium.launch({...(process.env.CHROME?{executablePath:process.env.CHROME}:{}),args:['--no-sandbox']});
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const p=await b.newPage({viewport:{width,height:950},hasTouch:width===375,isMobile:width===375}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(15000);await p.addInitScript(t=>localStorage.setItem('theme',t),theme);await p.clock.install();await p.goto(base+'/#/practice');await p.locator('#pr-topic').waitFor();
 async function set(slugs,mock=false,duration=60000){const id=await p.evaluate(({slugs,mock,duration})=>{const P=window.PracticeSessions,s=mock?P.createMock('Generated AMC 10',slugs,{mode:'generated',family:'AMC 10',durationMs:duration}):P.create('Action check','Any',slugs);P.save(localStorage,s);location.hash='#/practice/set/'+s.id;return s.id;},{slugs,mock,duration});await p.waitForURL(u=>u.hash==='#/practice/set/'+id);await p.locator('.practice-set-st[data-slug="'+slugs[0]+'"]').waitFor();await p.locator('#finish-practice').waitFor();return id;}
 const stored=id=>p.evaluate(id=>JSON.parse(localStorage.getItem('mq-practice-sets')).find(s=>s.id===id),id);
 const id=await set(['2018-amc-10a-1','2018-amc-10a-2']);const clear=p.locator('#clear-practice-answer');assert.equal(await clear.isDisabled(),true);
 await p.locator('[data-practice-answer="C"]').click();assert.equal(await clear.isEnabled(),true);await clear.click();assert.equal(await clear.isDisabled(),true);assert.equal(await p.locator('[data-practice-answer][aria-checked="true"]').count(),0);assert.match(await p.locator('[aria-current="step"]').getAttribute('aria-label'),/Unanswered/);
 await p.clock.fastForward(1000);assert.equal((await stored(id)).answers['2018-amc-10a-1'],'');
 await p.locator('#finish-practice').click();const dialog=p.locator('dialog.app-confirm');await dialog.waitFor();assert.match(await dialog.innerText(),/2 unanswered questions/);assert.equal(await p.evaluate(()=>document.activeElement.value),'cancel');assert.notEqual((await stored(id)).status,'finished');
 if(dir)await p.screenshot({path:path.join(dir,`finish-${theme}-${width}.png`)});
 await dialog.locator('[value="cancel"]').click();await dialog.waitFor({state:'detached'});assert.equal(await dialog.count(),0);assert.equal(await p.evaluate(()=>document.activeElement.id),'finish-practice');
 await p.locator('[data-practice-answer="A"]').click();await p.locator('#finish-practice').click();assert.match(await dialog.innerText(),/1 unanswered question\?/);await p.keyboard.press('Escape');await dialog.waitFor({state:'detached'});assert.equal(await dialog.count(),0);assert.notEqual((await stored(id)).status,'finished');
 await p.locator('.practice-problem-nav [data-practice-index="1"]').click();await p.locator('[data-practice-answer="B"]').click();await p.locator('#finish-practice').click();await p.locator('.practice-results').waitFor();assert.equal(await dialog.count(),0,'fully answered submits in one click');assert.equal((await stored(id)).status,'finished');
 await p.locator('[data-result-index="0"]').click();await p.locator('.practice-review').waitFor();assert.equal(await clear.count(),0,'review cannot clear an answer');
 const partial=await set(['2018-amc-10a-1','2018-amc-10a-2']);await p.locator('[data-practice-answer="A"]').click();await p.locator('#finish-practice').click();await dialog.locator('[value="ok"]').click();await p.locator('.practice-results').waitFor();assert.equal((await stored(partial)).status,'finished');assert.equal(await p.locator('[data-result-index]').count(),2);
 for(const slug of ['2018-aime-i-1','2019-hmmt-february-geometry-1']){
  const numeric=await set([slug],slug.includes('hmmt'));const input=p.locator('#practice-answer');
  await input.scrollIntoViewIfNeeded();
  const r=await input.boundingBox();
  for(const [x,y] of [[r.x-4,r.y+r.height/2],[r.x+r.width+4,r.y+r.height/2],[r.x+r.width/2,r.y-4],[r.x+r.width/2,r.y+r.height+4],[r.x+r.width-5,r.y-15]]){
   await input.evaluate(el=>el.blur());
   if(width===375)await p.touchscreen.tap(x,y);else await p.mouse.click(x,y);
   assert.equal(await input.evaluate(el=>el===document.activeElement),false,'space outside the answer border/label must not focus the input');
  }
  if(width===375)await p.touchscreen.tap(r.x+r.width/2,r.y+r.height/2);else await input.click();
  assert.equal(await input.evaluate(el=>el===document.activeElement),true,'inside the answer border still focuses normally');
  await input.fill('12');assert.ok(await input.evaluate(el=>{const c=getComputedStyle(el),probe=document.createElement('span');probe.style.color='var(--accent)';document.body.append(probe);const blue=getComputedStyle(probe).color;probe.remove();return c.outlineStyle==='none' && c.borderWidth==='1px' && c.borderColor===blue && c.boxShadow==='none';}), 'answer input uses one blue border, like search, without an inset or outer ring');assert.equal(await clear.isEnabled(),true);await clear.click();assert.equal(await input.inputValue(),'');assert.equal(await input.getAttribute('aria-invalid'),'false');await p.clock.fastForward(1000);assert.equal((await stored(numeric)).answers[slug],'');
  await input.fill('bad');assert.equal(await input.getAttribute('aria-invalid'),'true');assert.equal(await clear.isEnabled(),true);await clear.click();assert.equal(await input.inputValue(),'');assert.equal(await p.locator('#practice-answer-error').innerText(),'');
  if(dir)await p.screenshot({path:path.join(dir,`clear-${slug.includes('hmmt')?'exact':'aime'}-${theme}-${width}.png`)});
 }
 const timed=await set(['2018-amc-10a-1'],true,60000);await p.locator('#finish-practice').click();await dialog.waitFor();await p.clock.fastForward(61000);await p.locator('.practice-results').waitFor();await dialog.waitFor({state:'detached'});assert.equal(await dialog.count(),0,'expiry dismisses stale manual confirmation');assert.equal((await stored(timed)).timedOut,true);
 const left=await set(['2018-amc-10a-1']);await p.locator('#finish-practice').click();await dialog.waitFor();await p.evaluate(()=>location.hash='#/practice');await p.locator('#pr-topic').waitFor();await dialog.waitFor({state:'detached'});assert.equal(await dialog.count(),0,'leaving the route dismisses the confirmation');assert.notEqual((await stored(left)).status,'finished');
 const voided=await set(['2018-amc-10a-1','2025-amc-12a-25']);await p.locator('[data-practice-answer="A"]').click();await p.locator('#finish-practice').click();await p.locator('.practice-results').waitFor();assert.equal(await dialog.count(),0,'voided questions do not require an answer');assert.equal((await stored(voided)).status,'finished');
 assert.equal(await p.locator('.katex-error').count(),0);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);console.log(theme,width,'clear/persistence/invalid input, cancel/Escape, partial confirmation, one-click complete/voided, locked review, timeout and route cleanup: passed');await p.close();
}await b.close()})().catch(e=>{console.error(e);process.exit(1)});
