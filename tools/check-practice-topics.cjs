// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8895 node tools/check-practice-topics.cjs
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.COMPMATH_URL||'http://localhost:8895',dir=process.env.UI_ARTIFACT_DIR;
if(dir)fs.mkdirSync(dir,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/chromium',args:['--no-sandbox']});try{
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:950},hasTouch:width===375,isMobile:width===375}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(theme=>{
  localStorage.setItem('theme',theme);
  if(!localStorage.getItem('mq-practice-sets'))localStorage.setItem('mq-practice-sets',JSON.stringify([{id:'legacy-topic',label:'Old keyword set',difficulty:'Any',slugs:['2018-amc-10a-1'],answers:{'2018-amc-10a-1':'A'},marks:{},current:0,status:'paused',created:1,updated:1}]));
 },theme);
 await page.goto(base+'/#/practice');const field=page.locator('#topic-name'),options=page.locator('#practice-topic-options'),submit=page.locator('#topic-practice-form button[type=submit]');
 const count=page.locator('#topic-count');
 async function select(query,id,keyboard=false){await field.fill(query);const option=page.locator(`[data-topic-id="${id}"]`);await option.waitFor();if(keyboard){assert.equal(await options.locator('button').first().getAttribute('data-topic-id'),id);await field.press('Enter');}else await option.click();assert.equal(await field.getAttribute('aria-expanded'),'false');}
 async function home(){await page.evaluate(()=>location.hash='#/practice');await field.waitFor();}
 const stored=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mq-practice-sets'))[0]);
 await field.focus();assert.deepEqual(await options.locator('button').evaluateAll(bs=>bs.map(b=>b.dataset.topicId)),['mixed','alg','cp','geo','nt']);assert.equal(await count.inputValue(),'5');
 await field.fill('Heron formula');assert.equal(await options.locator('button').count(),0);assert.equal(await submit.isDisabled(),true,'no card-keyword fallback');
 await select('casework','cp.basic.case.cases',true);assert.match(await page.locator('#topic-practice-status').innerText(),/^1 matching problem available/);assert.equal(await count.getAttribute('max'),'1');
 await submit.click();await page.locator('.practice-set-st').waitFor();let set=await stored();assert.deepEqual(set.slugs,['2019-aime-i-4']);assert.equal(set.topicId,'cp.basic.case.cases');assert(!set.clock);
 await home();await select('Triangles','geo.tri',true);assert.equal(await count.inputValue(),'5');assert.match(await page.locator('#topic-practice-status').innerText(),/including subtopics/);
 const pool=await page.evaluate(()=>{
  const ps=MATH_PROBLEM_DB.map(p=>({...p,slug:p.ref.replace(', Problem ',' ').toLowerCase().replaceAll(' ','-')}));
  const t=PracticeTopics.build(MATH_TOPIC_TREE,ps,p=>!MATH_ANSWER_KEYS.voided?.[p.slug]&&(MATH_ANSWER_KEYS.answers[p.slug]!=null||MATH_MOCK_EXTRAS[p.slug]));
  return t.nodes.get('geo.tri').problems.map(p=>p.slug);
 });
 assert.equal(await page.locator('#topic-practice-status').innerText(),pool.length+' matching problems available, including subtopics.');
 await page.locator('#topic-band').evaluate(el=>{el.value=3;el.dispatchEvent(new Event('input',{bubbles:true}))});
 const filtered=+(await page.locator('#topic-practice-status').innerText()).match(/^\d+/)[0];assert(filtered>0&&filtered<pool.length);
 await page.locator('#topic-band').evaluate(el=>{el.value=0;el.dispatchEvent(new Event('input',{bubbles:true}))});
 await count.evaluate(el=>{el.value=30;el.dispatchEvent(new Event('input',{bubbles:true}))});await submit.click();await page.locator('.practice-set-st').waitFor();set=await stored();
 assert.equal(set.topicId,'geo.tri');assert.equal(set.slugs.length,30);assert.equal(new Set(set.slugs).size,30);assert(set.slugs.every(s=>pool.includes(s)),'broad topic uses descendants only');
 const slugs=set.slugs;
 await page.reload();await page.locator('.practice-set-st').waitFor();assert.deepEqual((await stored()).slugs,slugs);assert.equal((await stored()).topicId,'geo.tri');
 await home();const legacy=page.locator('a[href="#/practice/set/legacy-topic"]');if(!await legacy.isVisible())await page.locator('#resume-practice-sets .practice-history-more').click();await legacy.click();await page.locator('.practice-set-st').waitFor();assert.match(await page.locator('.practice-session-top h2').innerText(),/Old keyword set/);assert.equal(await page.locator('[data-practice-answer="A"]').getAttribute('aria-checked'),'true','old sets remain resumable');
 await home();await select('Denesting','alg.eq.radical.denest');assert.equal(await field.inputValue(),'Denesting √(a+√b)');
 await field.fill('Triangles');await options.waitFor({state:'visible'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert((await options.locator('button').count())<=7);assert.equal(await options.locator('.practice-topic-context').count(),await options.locator('button').count());
 await page.keyboard.press('ArrowDown');assert.equal(await options.locator('[aria-selected="true"]').count(),1);await page.keyboard.press('Escape');assert.equal(await field.getAttribute('aria-expanded'),'false');
 await field.fill('similar');await options.waitFor({state:'visible'});const before=await options.innerText();await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));assert.equal(await options.isVisible(),true,'scroll keeps suggestions open');assert.equal(await options.innerText(),before);
 if(dir){await field.scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/topics-${theme}-${width}.png`});}
 // Force one exact-value HMMT entry through actual topic generation (not a mock).
 await select('Geometry','geo');await count.evaluate(el=>{el.value=1;el.dispatchEvent(new Event('input',{bubbles:true}))});
 const target=await page.evaluate(()=>{
  const ps=MATH_PROBLEM_DB.map(p=>({...p,slug:p.ref.replace(', Problem ',' ').toLowerCase().replaceAll(' ','-')}));
  const t=PracticeTopics.build(MATH_TOPIC_TREE,ps,p=>!MATH_ANSWER_KEYS.voided?.[p.slug]&&(MATH_ANSWER_KEYS.answers[p.slug]!=null||MATH_MOCK_EXTRAS[p.slug]));const pool=t.nodes.get('geo').problems;
  const at=pool.findIndex(p=>p.slug==='2019-hmmt-february-geometry-1');window.topicTestRandom=Math.random;Math.random=()=> (at+0.5)/pool.length;return pool[at].slug;
 });
 await submit.click();await page.locator(`.practice-set-st[data-slug="${target}"]`).waitFor();await page.evaluate(()=>Math.random=window.topicTestRandom);
 set=await stored();assert.equal(set.topicId,'geo');assert(!set.kind);await page.locator('#practice-answer').fill('120');await page.locator('#finish-practice').click();await page.locator('.practice-results').waitFor();assert.equal(await page.locator('[data-result="Correct"]').count(),1);
 assert.equal(await page.locator('.katex-error').count(),0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);
 console.log(theme,width,'tree-only choices, ancestor pools, counts/difficulty, rare topics, keyboard/scroll, saved/legacy sets and exact-value topic grading: passed');await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
