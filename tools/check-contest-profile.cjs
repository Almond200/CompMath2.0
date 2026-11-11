// CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8765 node tools/check-contest-profile.cjs
// A card's Contest profile: the headline figures, contest table, rating spread, topics and
// periods agree with figures computed here, separately, from the data files.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const base=process.env.COMPMATH_URL||'http://localhost:8765',root=path.join(__dirname,'..');
global.window={};
require(path.join(root,'js/data/problems/problem-db.js'));require(path.join(root,'js/data/problems/difficulty-ratings.js'));require(path.join(root,'js/data/topic-tree.js'));
const slug=ref=>ref.toLowerCase().replace(/,?\s*problem\s+/,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const ratings=window.MATH_PROBLEM_RATINGS.ratings,db=window.MATH_PROBLEM_DB.map(p=>({...p,elo:(ratings[slug(p.ref)]||{}).elo,year:+p.ref.slice(0,4),num:+p.ref.match(/(\d+)$/)[1]}));
assert(db.every(p=>Number.isFinite(p.elo)&&p.year>1900&&p.num>0),'every problem has a rating, a year and a number');
const q=(xs,f)=>{const s=[...xs].sort((a,b)=>a-b),i=(s.length-1)*f,lo=Math.floor(i),hi=Math.ceil(i);return Math.round(s[lo]+(s[hi]-s[lo])*(i-lo));};
const pct=x=>!x?'0%':x>=0.0995?Math.round(x*100)+'%':(x*100).toFixed(1)+'%';
function expected(id){
 const ps=db.filter(p=>(p.formulas||[]).includes(id)||(p.trickFormulas||[]).includes(id)),elos=ps.map(p=>p.elo),med=q(elos,.5);
 const aime=p=>/ AIME\b/.test(p.ref),nodes={};ps.forEach(p=>new Set(p.tree).forEach(t=>nodes[t]=(nodes[t]||0)+1));
 const last=Math.max(...db.map(p=>p.year));
 return {n:ps.length,oneIn:Math.round(db.length/ps.length),med,q1:q(elos,.25),q3:q(elos,.75),min:Math.min(...elos),max:Math.max(...elos),
  harder:Math.round(db.filter(p=>p.elo<med).length/db.length*100),years:[Math.min(...ps.map(p=>p.year)),Math.max(...ps.map(p=>p.year))],
  aime:ps.filter(aime).length,aimeShare:pct(ps.filter(aime).length/db.filter(aime).length),aimeAt:q(ps.filter(aime).map(p=>p.num),.5),
  top:Math.max(...Object.values(nodes)),recent:ps.filter(p=>p.year>last-5).length,last:last-4};
}
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||undefined,args:['--no-sandbox']});try{
for(const theme of ['light','dark'])for(const width of [1280,375]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
 const fits=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow at '+page.url());
 const open=async id=>{await page.goto(base+'/#/f/'+id);await page.locator('.contest-profile').waitFor();return page.locator('.contest-profile');};
 const rowOf=(pf,label)=>pf.locator('.pf-row').filter({has:page.locator('.pf-k',{hasText:new RegExp('^'+label+':$')})});
 // A much-used formula: every part of the profile.
 for(const id of ['pythagorean-theorem','casework-method']){
  const pf=await open(id),e=expected(id);
  const stats=await pf.locator('.pf-stat').evaluateAll(xs=>xs.map(x=>[x.querySelector('b').textContent,x.querySelector('span').textContent]));
  assert.equal(stats.length,5);assert.deepEqual(stats[0],[String(e.n),'problems']);assert.deepEqual(stats[1],['1 in '+e.oneIn,'of all problems']);
  assert.match(stats[2][0],/^\d+(st|nd|rd|th)$/);assert.match(stats[2][1],/^most used of \d+ (formula|method|pattern)s$/);
  assert.deepEqual(stats[3],[String(e.med),'median rating']);assert.deepEqual(stats[4],[e.years.join('–'),'years seen']);
  assert.deepEqual(await pf.locator('.pf-k').allInnerTexts().then(x=>x.slice(0,4)),['Contests:','Difficulty:','Topics:','Over time:']);
  const contests=rowOf(pf,'Contests'),aime=contests.locator('tbody tr').filter({hasText:'AIME'}).locator('td');
  assert.equal(await aime.nth(1).innerText(),String(e.aime));assert.equal(await aime.nth(2).innerText(),e.aimeShare);assert.equal(await aime.nth(3).innerText(),'#'+e.aimeAt);
  const counted=await contests.locator('tbody tr td:nth-child(3)').allInnerTexts();assert.equal(counted.reduce((a,b)=>a+ +b,0),e.n,'the contests add up to the problems');
  const words=await rowOf(pf,'Difficulty').locator('.pf-words').innerText();
  assert.equal(words,`Median rating ${e.med}. Half of its problems are rated ${e.q1} to ${e.q3}; the full range is ${e.min} to ${e.max}. The median is harder than ${e.harder}% of all problems.`);
  const chart=rowOf(pf,'Difficulty').locator('.elo-chart');assert.equal(await chart.locator('.elo-bar').count(),18);assert.equal(await chart.locator('a').count(),0,'a card\'s chart does not link to the full ranges');assert.equal(await chart.locator('.elo-mark').count(),1);
  const topics=rowOf(pf,'Topics');assert.equal(await topics.locator('tbody tr').count(),5);assert.equal(await topics.locator('tbody tr').first().locator('td').nth(1).innerText(),String(e.top));
  const tn=(await topics.locator('tbody tr td:nth-child(3)').allInnerTexts()).map(Number);assert.deepEqual(tn,[...tn].sort((a,b)=>b-a),'most used topic first');
  const time=rowOf(pf,'Over time');assert.match(await time.locator('.pf-words').innerText(),new RegExp(`${e.recent} of the ${e.n} are from ${e.last} on\\.$`));
  assert(await time.locator('.pf-era').count()>=8);
  if(width===1280)assert(await contests.locator('.pf-meter').first().isVisible());else assert.equal(await contests.locator('.pf-meter').first().isVisible(),false,'no bars on a phone');
  assert.doesNotMatch(await pf.innerText(),/LIVE/);await fits();
 }
 // A topic opens its Problems by topic page.
 const href=await page.locator('.pf-topics tbody a').first().getAttribute('href');assert.match(href,/^#\/browse\/topics\/[\w.-]+$/);
 await page.locator('.pf-topics tbody a').first().click();await page.locator('.browse-topics').waitFor();await page.goBack();await page.locator('.contest-profile').waitFor();
 // A card with a handful of problems: figures and a line each, no tables, chart or periods.
 const few=await open('partitions'),fe=expected('partitions');assert(fe.n>0&&fe.n<5);
 assert.equal(await few.locator('.pf-stat b').first().innerText(),String(fe.n));assert.equal(await few.locator('table, .elo-chart, .pf-eras').count(),0);
 assert.match(await rowOf(few,'Difficulty').innerText(),/Rated \d+( and \d+)?\./);assert(await rowOf(few,'Topics').locator('a').count()>0);
 // Between the two: tables and a chart, but too few problems for periods to mean anything.
 const mid=await open('ptolemys-theorem'),me=expected('ptolemys-theorem');assert(me.n>=8&&me.n<30);
 assert.equal(await mid.locator('table').count(),2);assert.equal(await mid.locator('.elo-chart').count(),1);assert.equal(await mid.locator('.pf-eras').count(),0);
 // A topic's profile on its Problems by topic page (T6): the same figures and rows for the
 // problems filed under the topic and its subtopics, and the cards they cite most.
 for(const id of ['geo.tri.special','alg']){
  const kids=new Set([id]);for(let grew=true;grew;){grew=false;for(const [k,,par] of window.MATH_TOPIC_TREE)if(par&&kids.has(par)&&!kids.has(k)){kids.add(k);grew=true;}}
  const ps=db.filter(p=>(p.tree||[]).some(t=>kids.has(t))),elos=ps.map(p=>p.elo),med=q(elos,.5),cited={};
  ps.forEach(p=>new Set([...(p.formulas||[]),...(p.trickFormulas||[])]).forEach(c=>cited[c]=(cited[c]||0)+1));
  await page.goto(base+'/#/browse/topics/'+id);const tp=page.locator('.tp');await tp.waitFor();
  const stats=await tp.locator('.pf-stat').evaluateAll(xs=>xs.map(x=>[x.querySelector('b').textContent,x.querySelector('span').textContent]));
  assert.deepEqual(stats,[[ps.length.toLocaleString('en-US'),'problems'],['1 in '+Math.round(db.length/ps.length),'of all problems'],[String(med),'median rating'],[Math.min(...ps.map(p=>p.year))+'–'+Math.max(...ps.map(p=>p.year)),'years seen']]);
  assert.deepEqual(await tp.locator('.pf-k').allInnerTexts(),['Contests:','Difficulty:','Over time:','Cards:']);
  assert.equal(await rowOf(tp,'Difficulty').locator('.pf-words').innerText(),`Median rating ${med}. Half of its problems are rated ${q(elos,.25)} to ${q(elos,.75)}; the full range is ${Math.min(...elos)} to ${Math.max(...elos)}. The median is harder than ${Math.round(db.filter(p=>p.elo<med).length/db.length*100)}% of all problems.`);
  const aimeN=ps.filter(p=>/ AIME\b/.test(p.ref)).length;assert.equal(await rowOf(tp,'Contests').locator('tbody tr').filter({hasText:'AIME'}).locator('td').nth(1).innerText(),String(aimeN));
  const cards=rowOf(tp,'Cards').locator('tbody tr');assert.equal(await cards.count(),6);assert.equal(await cards.first().locator('td').nth(1).innerText(),String(Math.max(...Object.values(cited))));
  assert.match(await cards.first().locator('a').getAttribute('href'),/^#\/f\/[\w-]+$/);assert.equal(await rowOf(tp,'Difficulty').locator('.elo-chart a').count(),0);
  // It folds away and stays folded on the next topic; the problems keep their own heading below it.
  assert.deepEqual(await page.locator('.browse-main .pp-h').allInnerTexts(),['Topic profile','Problems']);
  const fold=page.locator('[data-tp-toggle]');assert.equal(await fold.innerText(),'Hide');await fold.click();assert.equal(await page.locator('.tp-body').isVisible(),false);assert.equal(await fold.innerText(),'Show');assert.equal(await fold.getAttribute('aria-expanded'),'false');
  assert.equal(await tp.locator('.pf-stat').count(),4,'the figures stay');await fold.click();assert.equal(await page.locator('.tp-body').isVisible(),true);
  assert(await page.locator('.br-group').count()>0);await fits();
 }
 await fits();assert.equal(await page.locator('.katex-error').count(),0);assert.deepEqual(errors,[]);
 console.log(theme,width,'card and topic profiles: figures, contests, ratings, topics, periods and cards: passed');await page.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
