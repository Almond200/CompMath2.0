// Official-source round grouping and division separation for BMT and PUMaC.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm');
const context = {window:{}};
for (const file of ['problem-db.js','difficulty-ratings.js','contest-papers.js'])
  vm.runInNewContext(fs.readFileSync(`js/data/problems/${file}`,'utf8'),context);
const db=context.window.MATH_PROBLEM_DB, papers=context.window.MATH_CONTEST_PAPERS;
const slug=ref=>ref.replace(', Problem ',' ').toLowerCase().replaceAll(' ','-');
const families=new Map();
// The first six A questions recur as B questions 3–8 in these papers.
for(const subject of ['Algebra','Combinatorics','Geometry','Number Theory']) for(let n=1;n<=6;n++){
  const refs=[`2025 PUMaC Division A ${subject}, Problem ${n}`,`2025 PUMaC Division B ${subject}, Problem ${n+2}`];
  if(!db.some(p=>p.ref===refs[0]))continue;
  const metadata=refs.map(ref=>{
    const p=db.find(p=>p.ref===ref);assert(p,ref);
    return JSON.stringify([p.formulas,p.tree,context.window.MATH_PROBLEM_RATINGS.ratings[slug(ref)].elo]);
  });
  assert.equal(metadata[0],metadata[1],refs.join(' / '));
}
for(const [paper,source] of Object.entries(papers)) {
  const m=paper.match(/^(\d{4}) (BMT|PUMaC Division [AB]) (.+)$/);assert(m,paper);
  const ps=db.filter(p=>p.ref.startsWith(paper+', Problem '));assert(ps.length,paper);
  for(const p of ps) {
    assert.equal(p.strategy,'',p.ref);assert(p.tree.length>=1&&p.tree.length<=3,p.ref);
    assert(Number.isFinite(context.window.MATH_PROBLEM_RATINGS.ratings[slug(p.ref)].elo),p.ref);
  }
  assert.match(source.url,/^https:\/\//);assert.match(source.solUrl,/^https:\/\//);
  const key=m[2]+'|'+m[1];if(!families.has(key))families.set(key,[]);
  families.get(key).push({paper,source,round:m[3],ps});
}
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/chromium',args:['--no-sandbox']});
 try {
  for(const theme of ['light','dark'])for(const width of [1280,375]){
   const page=await browser.newPage({viewport:{width,height:950}}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(t=>localStorage.setItem('theme',t),theme);
   const base=process.env.COMPMATH_URL||'http://localhost:8898';
   await page.goto(base+'/#/practice');await page.locator('.ct-row').first().waitFor();
   for(const [key,rounds] of families){
    const [fam,year]=key.split('|'),familySlug=fam.toLowerCase().replaceAll(' ','-');
    assert.equal(await page.locator(`a.ct-name[href="#/problems/${familySlug}/${year}"]`).count(),1,fam+': own contest entry');
   }
   for(const [key,rounds] of families){
    const [fam,year]=key.split('|'),familySlug=fam.toLowerCase().replaceAll(' ','-');
    await page.goto(`${base}/#/problems/${familySlug}/${year}`);await page.locator('.ct-papers [role="tab"]').first().waitFor();
    assert.deepEqual(await page.locator('.ct-papers [role="tab"]').allInnerTexts(),rounds.map(x=>x.round).sort());
    for(const {paper,source,round,ps} of rounds){
     const paperSlug=paper.replace(/^\d{4} /,'').toLowerCase().replaceAll(' ','-');
     await page.goto(`${base}/#/problems/${familySlug}/${year}/${paperSlug}`);
     await page.locator('.db-group.is-shown .pp-tiles').waitFor();
     assert.equal(await page.locator('.db-group.is-shown .pp-tiles .br-row').count(),ps.length);
     assert(await page.locator('.db-group.is-shown .py-bar').count()<=1,'same-subject comparisons exclude other rounds');
     for(const p of [ps[0],ps.at(-1)]){
      await page.goto(`${base}/#/problem/${slug(p.ref)}`);
      const toggle=page.locator('.prob-chain .chain-toggle');await toggle.waitFor();
      if(await toggle.getAttribute('aria-expanded')==='false')await toggle.click();
      assert.deepEqual(await page.locator('.aops-btn').evaluateAll(xs=>xs.map(x=>x.href)),[source.url,source.solUrl]);
      assert.equal(await page.locator('.chain-strategy:not(.chain-official)').count(),0);
      assert(await page.locator('.ptree-node.is-filed').count()>0);
      assert.equal(await page.locator('.katex-error').count(),0);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      assert((await page.locator('h2').innerText()).includes(fam));
     }
    }
   }
   assert.deepEqual(errors,[]);await page.close();
   console.log(theme,width,'separate contest entries, subject tabs, source registry, ratings, filings and layout passed');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
