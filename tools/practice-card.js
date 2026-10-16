// The practice pass (PLAN 2.7a): every problem that cites a card, with its statement, tags,
// strategy and trick, in the order the card page lists them.
// usage: node tools/practice-card.js <card-id> [--short]
const fs=require('fs'),path=require('path'),vm=require('vm');
const R=path.join(__dirname,'..','js','data')+'/';
global.window=global;
const load=f=>vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
['geometry.js','algebra.js','counting.js','number-theory.js','patterns.js'].forEach(f=>{try{load(R+f)}catch(e){}});
fs.readdirSync(R+'problems/statements').forEach(f=>load(R+'problems/statements/'+f));
load(R+'problems/problem-db.js');
const names={};(window.MATH_SECTIONS||[]).forEach(s=>s.subsections.forEach(ss=>(ss.formulas||[]).forEach(c=>names[c.id]=c.name)));
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const id=process.argv[2];
const ps=window.MATH_PROBLEM_DB.filter(p=>(p.formulas||[]).includes(id)||(p.trickFormulas||[]).includes(id));
console.log(id, names[id], ps.length+' problems\n');
ps.forEach(p=>{const s=window.MATH_STATEMENTS[slug(p.ref)];
 console.log('### '+p.ref+'  ['+slug(p.ref)+']');
 console.log('tags: '+p.formulas.join(', ')+(p.trickFormulas?'  | trick: '+p.trickFormulas.join(', '):''));
 if(process.argv[3]!=='--short'){console.log('STMT: '+(s?s.s:'(none)'));
 console.log('STRAT: '+(p.strategy||'(none)'));if(p.trick)console.log('TRICK: '+p.trick);}
 console.log();});
