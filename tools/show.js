// Print problem statements and current entries: node tools/show.js 2022-amc-12a-21 2022-amc-12a-22 ...
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data','problems');
vm.runInThisContext(fs.readFileSync(path.join(R,'problem-db.js'),'utf8'));
fs.readdirSync(path.join(R,'statements')).forEach(f=>vm.runInThisContext(fs.readFileSync(path.join(R,'statements',f),'utf8')));
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const by={};window.MATH_PROBLEM_DB.forEach(p=>by[slug(p.ref)]=p);
for(const s of process.argv.slice(2)){const st=window.MATH_STATEMENTS[s];console.log('### '+s+(by[s]&&by[s].strategy?'  [written: '+by[s].formulas.join(',')+']':''));console.log(st?st.s:'(no statement)');console.log();}
