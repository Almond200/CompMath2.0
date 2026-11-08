const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const M=require('../js/mock-contests.js'),P=require('../js/practice-sessions.js');
const c={window:{}};for(const f of ['problem-db.js','difficulty-ratings.js','answer-keys.js','mock-extras.js'])vm.runInNewContext(fs.readFileSync('js/data/problems/'+f,'utf8'),c);
global.MATH_ANSWER_KEYS=c.window.MATH_ANSWER_KEYS;global.MATH_MOCK_EXTRAS=c.window.MATH_MOCK_EXTRAS;
const slug=r=>r.toLowerCase().replace(/,?\s*problem\s+/,'-').replace(/[^a-z0-9]+/g,'-');
const problems=Array.from(c.window.MATH_PROBLEM_DB,p=>{const s=slug(p.ref),n=+p.ref.match(/Problem (\d+)$/)[1];return {...p,slug:s,num:n,year:+p.ref.slice(0,4),fam:/AJHSME|AMC 8/.test(p.ref)?'AMC 8':/AMC 10/.test(p.ref)?'AMC 10':/AMC 12/.test(p.ref)?'AMC 12':/AIME/.test(p.ref)?'AIME':'HMMT February',elo:c.window.MATH_PROBLEM_RATINGS.ratings[s].elo};});
const has=p=>c.window.MATH_ANSWER_KEYS.answers[p.slug]!=null||!!c.window.MATH_MOCK_EXTRAS[p.slug],voided=p=>!!c.window.MATH_ANSWER_KEYS.voided[p.slug];
const catalog=M.papers(problems,has);assert.equal(catalog.reduce((n,p)=>n+p.problems.length,0),Object.keys(c.window.MATH_ANSWER_KEYS.answers).length);
for(const paper of catalog){assert.equal(paper.problems.length,M.formats[paper.family].count);paper.problems.forEach((p,i)=>assert.equal(p.num,i+1));}
assert.deepEqual(M.monotone([1,4,2,5]),[1,3,3,5]);
// Additional sittings must not make one year outweigh another, and voids must not distort a slot.
const samplePaper=(year,elo,voidFirst=false)=>({family:'AMC 8',year,problems:Array.from({length:25},(_,i)=>({year,elo,voided:voidFirst&&i===0}))});
const model=M.curve([samplePaper(2026,1000),samplePaper(2025,2000),samplePaper(2025,2000),samplePaper(2025,4000,true),samplePaper(2016,9000)],'AMC 8',p=>p.voided);
assert.equal(model.startYear,2017);assert.equal(model.means[0],1500);assert.equal(model.means[1],(1000+8000/3)/2);
let n=0,cross=0,hmmt=0;let state=729;const rng=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296;};
for(const family of Object.keys(M.formats))for(let k=0;k<40;k++){
 const g=M.generate(problems,catalog,family,has,voided,rng);assert.equal(g.problems.length,M.formats[family].count);assert.equal(g.model.endYear-g.model.startYear,9);
 assert.equal(new Set(g.problems.map(M.identity)).size,g.problems.length);
 g.problems.forEach((p,i)=>{assert.ok(p.year<g.model.startYear||p.fam==='HMMT February');assert.ok(has(p)&&!voided(p));if(i)assert.ok(p.elo>=g.problems[i-1].elo);if(p.fam!==family)cross++;if(p.fam==='HMMT February')hmmt++;});
 for(let i=1;i<g.model.targets.length;i++)assert.ok(g.model.targets[i]>=g.model.targets[i-1]);
 const errors=g.problems.map((p,i)=>Math.abs(p.elo-g.model.targets[i]));assert.ok(Math.max(...errors)<350,JSON.stringify({family,errors}));n++;
}
assert.ok(cross>0);assert.ok(hmmt>0,'HMMT may be used despite its 2019 date');
// Timer freezes on every explicit pause/read, including pagehide snapshots, and only active time expires.
const s=P.createMock('Test',['x'],{family:'AMC 10',mode:'generated',durationMs:10000},1000);
assert.equal(P.timeLeft(s,2500),8500);P.pause(s,3000);assert.equal(P.timeLeft(s,900000),8000);P.resume(s,200000);assert.equal(P.timeLeft(s,201000),7000);
P.resume(s,201000);assert.equal(P.timeLeft(s,202000),6000,'redrawing an active set must not reset its timer');
let raw=null;const storage={getItem:()=>raw,setItem:(_,v)=>{raw=v;}};P.checkpoint(s,202000);P.save(storage,s);const restored=P.read(storage)[0];assert.equal(restored.status,'paused');assert.equal(restored.clock.deadline,null);assert.equal(P.timeLeft(restored,9999999),6000);
P.resume(restored,10000000);P.checkpoint(restored,10006000);assert.equal(restored.status,'finished');assert.equal(restored.timedOut,true);assert.equal(P.timeLeft(restored,10009000),0);assert.equal(P.answer(restored,'x','A',false,10007000),false);
const early=P.createMock('Early',['x'],{family:'AMC 8',durationMs:10000},1000);P.finish(early,4000);assert.equal(P.timeLeft(early,500000),7000);assert.equal(early.timedOut,undefined);
const exported=JSON.stringify([early]);assert.equal(P.read({getItem:()=>exported})[0].clock.remainingMs,7000);
assert.deepEqual(P.read({getItem:()=>JSON.stringify([{...early,clock:null},{...early,mock:{family:'Unknown'}}])}),[]);
// Exact-value responses are parsed as math, not evaluated as JavaScript.
const h='2019-hmmt-february-geometry-5',e=P.create('HMMT','Any',[h]);assert(P.answer(e,h,'(sqrt(2)-1)/2',false));assert.equal(P.result(e,h),'Correct');assert(P.answer(e,h,'(1+sqrt(2))/2',false));assert.equal(P.result(e,h),'Correct');assert(!P.answer(e,h,'alert(1)',false));assert(!P.answer(e,h,'1/0',false));
for(const [id,x] of Object.entries(c.window.MATH_MOCK_EXTRAS)){assert.ok(problems.some(p=>p.slug===id));for(const a of x.answers){const e=P.create('Extra','Any',[id]);assert(P.answer(e,id,a,false));assert.equal(P.result(e,id),'Correct');}}
const score=M.score({mock:{family:'AMC 10'},slugs:['a','b','c','d']},s=>({a:'Correct',b:'Incorrect',c:'Unanswered',d:'Voided'})[s]);assert.equal(score.points,13.5);assert.equal(score.max,24);
assert.equal(M.score({mock:{family:'AMC 8'},slugs:['a','b']},s=>s==='a'?'Correct':'Unanswered').points,1);
for(const [family,count,max,blank] of [['AMC 8',25,25,0],['AMC 10',25,150,37.5],['AMC 12',25,150,37.5],['AIME',15,15,0]]){
 const set={mock:{family},slugs:Array.from({length:count},(_,i)=>String(i))};
 assert.equal(M.score(set,()=> 'Correct').points,max);assert.equal(M.score(set,()=> 'Correct').max,max);
 assert.equal(M.score(set,()=> 'Unanswered').points,blank);assert.equal(M.score(set,()=> 'Incorrect').points,0);
}
console.log(`Mock contests: ${catalog.length} full papers, ${n} mixed-source generations, curve bounds, twins/uniqueness, HMMT keys, scoring, freeze/resume/reload and timeout passed (${cross} cross-contest picks, ${hmmt} HMMT picks).`);
