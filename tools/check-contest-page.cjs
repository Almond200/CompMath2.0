// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-contest-page.cjs
// A contest year's page: the paper toggle at every width, plain problem tiles (number and
// rating, no chips or solution text), and paper statistics that agree with figures computed
// here, separately, from the data files.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const base=process.env.COMPMATH_URL||'http://localhost:8765',root=path.join(__dirname,'..');
global.window={};
for(const f of ['problems/problem-db.js','problems/difficulty-ratings.js','topic-tree.js'])require(path.join(root,'js/data',f));
const slug=ref=>ref.toLowerCase().replace(/,?\s*problem\s+/,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const ratings=window.MATH_PROBLEM_RATINGS.ratings,parent=new Map(window.MATH_TOPIC_TREE.map(([id,,p])=>[id,p]));
const rootOf=id=>{while(parent.get(id))id=parent.get(id);return id;};
const db=window.MATH_PROBLEM_DB.map(p=>{const m=p.ref.match(/^(\d{4}) (.*), Problem (\d+)$/);return {paper:m[1]+' '+m[2],num:+m[3],elo:ratings[slug(p.ref)].elo,subject:rootOf(p.tree[0])};});
const med=xs=>{const s=[...xs].sort((a,b)=>a-b),i=(s.length-1)/2;return Math.round((s[Math.floor(i)]+s[Math.ceil(i)])/2);};
// Sittings in order: a year, except 2021's spring and fall AMC 10/12.
const sitOf=paper=>+paper.slice(0,4)*10+(/ Fall /.test(paper)?2:/ Spring /.test(paper)?1:0);
function expected(paper,family){
 const ps=db.filter(p=>p.paper===paper),fam=db.filter(p=>family.test(p.paper)),papers=[...new Set(fam.map(p=>p.paper))];
 const m=med(ps.map(p=>p.elo)),meds=papers.map(k=>med(fam.filter(p=>p.paper===k).map(p=>p.elo)));
 const lo=ps.reduce((a,b)=>b.elo<a.elo?b:a),hi=ps.reduce((a,b)=>b.elo>a.elo?b:a);
 // The yardsticks: every paper; whole earlier sittings, newest first, up to ten papers; the sitting before.
 const sits=[...new Set(papers.map(sitOf))].sort((a,b)=>a-b),at=sits.indexOf(sitOf(paper));
 let recent=[];for(let i=at-1;i>=0&&papers.filter(k=>recent.includes(sitOf(k))).length<10;i--)recent.push(sits[i]);
 const sets={all:papers,recent:papers.filter(k=>recent.includes(sitOf(k))),prev:at>0?papers.filter(k=>sitOf(k)===sits[at-1]):[]};
 const against=keys=>{const pool=fam.filter(p=>keys.includes(p.paper)),usual=n=>med(pool.filter(p=>p.num===n).map(p=>p.elo));
  const u=pool.filter(p=>p.subject==='alg').length/keys.length;
  return {count:keys.length,med:med(keys.map(k=>med(fam.filter(p=>p.paper===k).map(p=>p.elo)))),off:ps.filter(p=>Math.abs(p.elo-usual(p.num))>=300).map(p=>p.num).sort((a,b)=>a-b),algUsual:Number.isInteger(u)?String(u):u.toFixed(1)};};
 const perSit=sits.map(s=>{const ks=papers.filter(k=>sitOf(k)===s);return Math.round(ks.reduce((n,k)=>n+med(fam.filter(p=>p.paper===k).map(p=>p.elo)),0)/ks.length);});
 return {n:ps.length,med:m,rank:1+meds.filter(x=>x>m).length,papers:papers.length,lo,hi,elos:ps.sort((a,b)=>a.num-b.num).map(p=>p.elo),
  alg:ps.filter(p=>p.subject==='alg').length,sits:sits.length,sitMed:perSit[at],twin:papers.filter(k=>sitOf(k)===sitOf(paper)).length===2,
  all:against(sets.all),recent:sets.recent.length?against(sets.recent):null,prev:sets.prev.length?against(sets.prev):null};
}
const ord=n=>{const t=n%100,u=n%10;return n+(t>=11&&t<=13?'th':u===1?'st':u===2?'nd':u===3?'rd':'th');};
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||undefined,args:['--no-sandbox']});try{
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
 const fits=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow at '+page.url());
 const shown=()=>page.locator('.db-group.is-shown');
 const paperIs=async e=>{
  const g=shown();assert.equal(await page.locator('.db-group:visible').count(),1,'one paper at a time');
  const stats=await g.locator('.pf-stat').evaluateAll(xs=>xs.map(x=>[x.querySelector('b').textContent,x.querySelector('span').textContent]));
  assert.deepEqual(stats[0],[String(e.n),'problems']);assert.deepEqual(stats[1],[String(e.med),'median rating']);
  // The three medians sit together: the paper's, its opening questions', its closing five's.
  const open=e.n>=20?10:5,mid=(a,b)=>String(med(e.elos.slice(a-1,b)));
  assert.deepEqual(stats[2],[mid(1,open),`median of questions 1–${open}`]);assert.deepEqual(stats[3],[mid(e.n-4,e.n),`median of questions ${e.n-4}–${e.n}`]);
  const d=e.med-e.recent.med;assert.equal(stats[4][0],(d>0?'+':d<0?'−':'')+Math.abs(d));assert.match(stats[4][1],new RegExp('^against the past '+e.recent.count+' (AMC|AIME)s$'));
  assert.equal(stats[5][0],ord(e.rank));assert.match(stats[5][1],new RegExp('^hardest of all '+e.papers+' '));
  // Tiles: a number and a rating, nothing else.
  assert.deepEqual(await g.locator('.pp-tiles .br-row').allInnerTexts().then(x=>x.map(t=>t.replace(/\s+/g,' '))),e.elos.map((r,i)=>`Problem ${i+1} ${r}`));
  assert.equal(await g.locator('.ptype-chip, .ptype-row, .prob-strategy, .prob-card').count(),0,'no chips or solution text');
  // The chart: a bar per problem, opening it, with the usual rating marked.
  assert.equal(await g.locator('a.pq-bar').count(),e.n);assert.equal(await g.locator('.pq-col b').count(),e.n);
  assert.match(await g.locator('a.pq-bar').nth(2).getAttribute('href'),/^#\/problem\/[\w-]+-3$/);
  assert.match(await g.locator('a.pq-bar').nth(2).getAttribute('data-tip'),new RegExp('^Problem 3: rated '+e.elos[2]+'; '));assert.equal(await g.locator('.pq-bar[title], .py-bar[title]').count(),0);
  // Compare with: the past ten papers by default (papers have grown harder), every year, or the
  // sitting before; the marks, the sentence and the Subjects column follow the choice.
  const chips=g.locator('[data-pp-base]');assert.equal(await g.locator('[data-pp-base][aria-pressed="true"]').getAttribute('data-pp-base'),'recent');
  assert.equal(await chips.nth(0).innerText(),'All years');assert.match(await chips.nth(1).innerText(),new RegExp('^Past '+e.recent.count+' (AMC|AIME)s$'));
  assert.doesNotMatch((await chips.allInnerTexts()).join(' '),/\d{4}/,'the choices carry no years');assert.match(await g.locator('.pp-note').innerText(),/\(\w* ?\d{4}(–\w* ?\d{4})?\)/,'the years are in the line under the chart');
  for(const id of ['all','prev','recent']){
   await shown().locator(`[data-pp-base="${id}"]`).scrollIntoViewIfNeeded();const y0=await page.evaluate(()=>scrollY);await shown().locator(`[data-pp-base="${id}"]`).click();const b=e[id];
   assert.equal(await shown().locator('[data-pp-base][aria-pressed="true"]').getAttribute('data-pp-base'),id);assert.equal(await page.evaluate(()=>scrollY),y0,'the page stays put');
   const words=shown().locator('.pp-sec').filter({has:page.locator('.pq')}).locator('.pp-words');
   const said=(await words.locator('a').allInnerTexts()).map(t=>+t.slice(1)).sort((a,b)=>a-b);
   if(b.off.length<=4)assert.deepEqual(said,b.off,id+': questions 300 or more from the yardstick');
   if(!b.off.length)assert.match(await words.innerText(),/within 300 points/);
   const alg=shown().locator('.pp-table tbody tr').filter({hasText:'Algebra'}).locator('td');
   assert.equal(await alg.nth(1).innerText(),String(e.alg));assert.equal(await alg.nth(2).innerText(),b.algUsual);
  }
  const total=(await g.locator('.pp-table tbody td:nth-child(3)').allInnerTexts()).reduce((a,b)=>a+ +b,0);assert.equal(total,e.n,'subjects add up to the paper');
  // Over the years: a bar per sitting, this one picked out, with the drift in words.
  assert.equal(await g.locator('.py-bar').count(),e.sits);assert.equal(await g.locator('.py-bar.is-cur').count(),1);
  assert.match(await g.locator('.py-bar.is-cur').getAttribute('data-tip'),new RegExp('median paper rating '+e.sitMed+'$'));
  const yw=await g.locator('.pp-sec').filter({has:page.locator('.py')}).locator('.pp-words').innerText();
  assert.match(yw,/points (harder|easier)\./);assert.match(yw,new RegExp('his paper is rated '+e.med+'\\.$'));
  if(e.twin)assert.match(yw,new RegExp('^Each bar is one sitting of the contest, with its (A and B|I and II) papers taken together\\..* averages '+e.sitMed+' over both papers; this paper is rated '));
  assert.deepEqual(await g.locator('.pp-h').allInnerTexts(),['Problems','Difficulty by question','Subjects','Over the years','Topics']);
  assert(await g.locator('.pp-areas .br-kid').count()>0);
 };
 // Two papers in the year: the toggle switches without scrolling and writes the paper into the address.
 await page.goto(base+'/#/problems/amc-10/2025');await page.locator('.ct-papers').waitFor();
 const tabs=page.locator('.ct-papers [role="tab"]');assert.deepEqual(await tabs.allInnerTexts(),['AMC 10A','AMC 10B']);assert(await page.locator('.ct-papers').isVisible());
 await paperIs(expected('2025 AMC 10A',/ AMC 10[AB]?$/));
 await tabs.nth(1).scrollIntoViewIfNeeded();const y=await page.evaluate(()=>scrollY);await tabs.nth(1).click();assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true');
 assert.match(page.url(),/#\/problems\/amc-10\/2025\/amc-10b$/);assert.equal(await page.evaluate(()=>scrollY),y);assert.match(await page.title(),/2025 AMC 10B/);
 await paperIs(expected('2025 AMC 10B',/ AMC 10[AB]?$/));
 await page.reload();await page.locator('.ct-papers').waitFor();assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true','a reload keeps the paper');
 await fits();
 // A tile and a bar open the problem; a topic opens its page.
 await shown().locator('.pp-tiles .br-row').nth(4).click();await page.locator('.prob-chain').waitFor();assert.match(page.url(),/2025-amc-10b-5$/);await page.goBack();await page.locator('.ct-papers').waitFor();
 await shown().locator('.pp-areas .br-kid').first().click();await page.locator('.browse-topics').waitFor();
 // Mock this paper opens Practice a contest with the contest and the paper already chosen.
 await page.goBack();await page.locator('.ct-papers').waitFor();assert.equal(await page.locator('.ct-papers [aria-selected="true"]').innerText(),'AMC 10B');
 assert.equal(await shown().locator('.pp-mock').innerText(),'Mock this paper');await shown().locator('.pp-mock').click();await page.locator('#mock-contest-form').waitFor();
 assert.match(page.url(),/#\/practice$/);assert.equal(await page.locator('#mock-paper-name').inputValue(),'2025 AMC 10B');
 assert.equal(await page.locator('[data-mock-family][aria-checked="true"]').innerText(),'AMC 10');assert.equal(await page.locator('[data-mock-mode][aria-checked="true"]').innerText(),'Past contest');
 assert.equal(await page.locator('#mock-contest-form [type="submit"]').isEnabled(),true);assert.equal(await page.locator('#mock-contest-info').innerText(),'25 problems · 75 minutes');
 await page.waitForFunction(()=>document.activeElement?.textContent==='Start mock');await page.waitForFunction(()=>{const r=document.getElementById('pr-mock').getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});
 // Opened the ordinary way, the panel starts empty again.
 await page.goto(base+'/#/problems/amc-8/2024');await page.locator('.pp-tiles').waitFor();await page.goto(base+'/#/practice');await page.locator('#mock-contest-form').waitFor();assert.equal(await page.locator('#mock-paper-name').inputValue(),'');
 // The random picker says what a level means in Elo terms, for the contest chosen.
 const fifth=(fam,k)=>{const xs=db.filter(p=>fam.test(p.paper)).map(p=>p.elo).sort((a,b)=>a-b);return [xs[Math.floor(k*xs.length/5)],xs[Math.max(Math.floor(k*xs.length/5),Math.floor((k+1)*xs.length/5)-1)]];};
 assert.match(await page.locator('.rand-picker .rand-diff-note').innerText(),/^Difficulty goes by Elo rating: a higher rating means a harder problem\. Each level is a fifth of all the problems/);
 await page.locator('[data-rand-fam="AMC 10"]').click();await page.locator('#rand-diff-range').fill('4');const [lo,hi]=fifth(/ AMC 10[AB]?$/,3);
 assert.equal(await page.locator('.rand-picker .rand-diff-note').innerText(),`Hard is an Elo rating of ${lo} to ${hi}: one fifth of the AMC 10 problems, where a higher rating means a harder problem.`);
 // Practice a topic measures a level inside the chosen topic, and says so.
 assert.match(await page.locator('#topic-band-note').innerText(),/^Difficulty is measured inside the topic you choose/);
 await page.locator('#topic-band').fill('4');assert.match(await page.locator('#topic-band-note').innerText(),/^Hard is one fifth of the chosen topic's problems by Elo rating.*Choose a topic/);
 await page.locator('#practice-topic-name, [name="topic"]').first().fill('Geometry');await page.locator('.practice-topic-option').first().click();
 const tn=await page.locator('#topic-band-note').innerText();assert.match(tn,/^Hard in this topic is an Elo rating of \d+ to \d+: one fifth of its problems/);
 const [tlo,thi]=tn.match(/\d+/g).map(Number);assert(tlo<thi&&tlo>300&&thi<3800);
 await fits();
 // A linked paper opens on that paper; a year with one paper has no toggle.
 await page.goto(base+'/#/problems/aime/2019/aime-ii');await page.locator('.ct-papers').waitFor();assert.equal(await page.locator('.ct-papers [aria-selected="true"]').innerText(),'AIME II');
 await paperIs(expected('2019 AIME II',/ AIME( I| II)?$/));await fits();
 // 2021 had two AMC 10 sittings: four papers, a note, and "the one before" fall is spring.
 await page.goto(base+'/#/problems/amc-10/2021/fall-amc-10a');await page.locator('.ct-papers').waitFor();
 assert.deepEqual(await page.locator('.ct-papers [role="tab"]').allInnerTexts(),['Spring 10A','Spring 10B','Fall 10A','Fall 10B']);assert.equal(await page.locator('.ct-papers [aria-selected="true"]').innerText(),'Fall 10A');
 assert.match(await page.locator('.pp-twice').innerText(),/held twice in 2021/);
 await paperIs(expected('2021 Fall AMC 10A',/ AMC 10[AB]?$/));
 await shown().locator('[data-pp-base="prev"]').click();assert.match(await shown().locator('.pp-note').innerText(),/\(Spring 2021\)/);await shown().locator('[data-pp-base="recent"]').click();
 assert.equal(await shown().locator('.py-bar').filter({hasText:/^21[SF]$/}).count(),2);await fits();
 await page.goto(base+'/#/problems/amc-10/2022');await page.locator('.ct-papers').waitFor();await shown().locator('[data-pp-base="prev"]').click();
 assert.match(await shown().locator('.pp-note').innerText(),/\(Fall 2021\)/);await shown().locator('[data-pp-base="recent"]').click();
 await page.goto(base+'/#/problems/amc-8/2024');await page.locator('.pp-tiles').waitFor();assert.equal(await page.locator('.ct-papers').count(),0);
 await paperIs(expected('2024 AMC 8',/ (AMC 8|AJHSME)$/));await fits();
 // A choice that does not apply is not offered: the AMC 8 has no second paper, and a contest's
 // first year has nothing before it (one yardstick left, so no choices at all).
 assert.deepEqual(await shown().locator('[data-pp-base]').evaluateAll(xs=>xs.map(x=>x.dataset.ppBase)),['all','recent','prev']);
 await page.goto(base+'/#/problems/amc-10/2000');await page.locator('.pp-tiles').waitFor();assert.equal(await page.locator('[data-pp-base]').count(),0);assert.equal(await page.locator('.pq-col b').count(),25,'still marked against all years');
 await page.goto(base+'/#/problems/amc-10/2001');await page.locator('.pp-tiles').waitFor();assert.deepEqual(await shown().locator('[data-pp-base]').evaluateAll(xs=>xs.map(x=>x.dataset.ppBase)),['all','prev']);
 await page.goto(base+'/#/problems/hmmt-february/2019');await page.locator('.pp-tiles').waitFor();assert.equal(await page.locator('[data-pp-base], .py, .pq-col b, .pp-mock').count(),0,'no yardsticks and no mock format for HMMT');await fits();
 assert.equal(await page.locator('.katex-error').count(),0);assert.deepEqual(errors,[]);
 console.log(theme,width,'paper toggle, plain tiles, figures, compare-with choices, difficulty by question, subjects, years and 2021: passed');await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
