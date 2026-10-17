// The practice pass (PLAN 2.7a): every card of one data file that problems cite, in file order, with
// "n/kv" = n citations of which k are still VAGUE (same test as practice-scan.js).
// usage: node tools/practice-file.js number-theory.js
global.window=global;const fs=require('fs'),vm=require('vm'),R='/home/user/CompMath2.0/js/data/';
vm.runInThisContext(fs.readFileSync(R+'problems/problem-db.js','utf8'));
const f=process.argv[2];const src=fs.readFileSync(R+f,'utf8');const ids=[...src.matchAll(/id: "([^"]+)"/g)].map(m=>m[1]);
const V=/Carried through|requested value|relations to|to find the|to extract|to set up|combine with|The answer is \$[^$]*\$\.$/;
let tot=0,vg=0;const out=[];
for(const id of ids){const ps=window.MATH_PROBLEM_DB.filter(p=>(p.formulas||[]).concat(p.trickFormulas||[]).includes(id));if(!ps.length)continue;const v=ps.filter(p=>!p.strategy||V.test(p.strategy)).length;tot+=ps.length;vg+=v;out.push(id+':'+ps.length+(v?'/'+v+'v':''));}
console.log(out.join(' '));console.log('cards',out.length,'citations',tot,'vague',vg);
