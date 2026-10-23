// Step D: AMC 12 problems without a write-up whose statement nearly matches a written AMC 10 problem
// (a 50-character prefix after removing spaces, quotes and \dfrac). Check the answer choices before copying.
// usage: node tools/near-twins.js [year-filter, e.g. "2022 AMC 12A"]
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data','problems');
vm.runInThisContext(fs.readFileSync(path.join(R,'problem-db.js'),'utf8'));
fs.readdirSync(path.join(R,'statements')).forEach(f=>vm.runInThisContext(fs.readFileSync(path.join(R,'statements',f),'utf8')));
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const S=window.MATH_STATEMENTS,DB=window.MATH_PROBLEM_DB,f=process.argv[2]||'AMC 12';
const key=p=>{const s=S[slug(p.ref)];return s?s.s.replace(/\\dfrac/g,'\\frac').replace(/[\s"'`]/g,'').slice(0,50):null;};
const done={};DB.filter(p=>p.strategy&&/AMC 10/.test(p.ref)).forEach(p=>{const k=key(p);if(k)(done[k]=done[k]||[]).push(p.ref);});
DB.filter(p=>!p.strategy&&p.ref.includes(f)).forEach(p=>{const k=key(p);if(k&&done[k])console.log(p.ref,'~',done[k].join('; '));});
