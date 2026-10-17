// The practice pass (PLAN 2.7a): one line per problem citing a card: VAGUE when the strategy still says
// "Carried through" or only names relations, and whether the problem has a figure (statement or app-drawn).
// usage: node tools/practice-scan.js <card-id> [--full]
global.window=global;const fs=require('fs'),vm=require('vm'),R='/home/user/CompMath2.0/js/data/';
vm.runInThisContext(fs.readFileSync(R+'problems/problem-db.js','utf8'));
fs.readdirSync(R+'problems/statements').forEach(f=>vm.runInThisContext(fs.readFileSync(R+'problems/statements/'+f,'utf8')));
const pd=fs.readFileSync(R+'diagrams/problem-diagrams.js','utf8');
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const id=process.argv[2], full=process.argv[3]==='--full';
const V=/Carried through|requested value|relations to|to find the|to extract|to set up|combine with|The answer is \$[^$]*\$\.$/;
window.MATH_PROBLEM_DB.filter(p=>(p.formulas||[]).concat(p.trickFormulas||[]).includes(id)).forEach(p=>{
 const s=slug(p.ref),st=window.MATH_STATEMENTS[s];
 const fig=st&&/@@fig/.test(st.s)?'stmtfig':pd.includes('PROB["'+s+'"]')?'appfig':'NOFIG';
 const vague=V.test(p.strategy||'')||!p.strategy;
 console.log((vague?'VAGUE ':'ok    ')+fig.padEnd(8)+String((p.strategy||'').length).padStart(5)+'  '+p.ref+'  ['+p.formulas.join(',')+']');
 if(full&&vague){console.log('   S: '+(st?st.s.replace(/\n+/g,' '):'none'));console.log('   T: '+p.strategy+(p.trick?'\n   TR: '+p.trick:''));}
});
