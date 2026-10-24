// Step F: cards with fewer than two practice problems (linked contest problems + MATH_PROBLEMS exercises).
// usage: node tools/practice-gaps.js [--list]   (prints counts; --list prints "id | links | exercises | name" for cards under two)
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data');
for(const f of fs.readdirSync(R).filter(f=>f.endsWith('.js')))try{vm.runInThisContext(fs.readFileSync(path.join(R,f),'utf8'))}catch(e){}
for(const f of ['geometry-problems.js','extra-problems.js','problem-db.js'])vm.runInThisContext(fs.readFileSync(path.join(R,'problems',f),'utf8'));
const cards=[];const walk=o=>{if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object'){if(o.id&&o.importance&&o.name)cards.push(o);Object.values(o).forEach(walk)}};
for(const k of Object.keys(window))if(/^MATH_/.test(k)&&!/PROBLEM|STATEMENT|EXAMPLE/.test(k))walk(window[k]);
const seen=new Set(),C=cards.filter(c=>!seen.has(c.id)&&seen.add(c.id));
const links={};for(const p of window.MATH_PROBLEM_DB)for(const f of [...p.formulas,...(p.trickFormulas||[])])links[f]=(links[f]||0)+1;
const ex=id=>(window.MATH_PROBLEMS[id]||[]).length;
const short=C.filter(c=>(links[c.id]||0)+ex(c.id)<2);
console.log('cards',C.length,'| under two practice problems',short.length,'| none',short.filter(c=>!(links[c.id]||0)&&!ex(c.id)).length);
if(process.argv.includes('--list'))for(const c of short)console.log(c.id,'|',links[c.id]||0,'|',ex(c.id),'|',c.importance,'|',c.name);
