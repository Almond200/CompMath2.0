// Step D: AMC 12 problems without a write-up whose statement resembles a written AMC 10 problem.
// Score = shared 6-letter runs of the normalized statements (commands and punctuation removed), so
// reworded or re-typeset twins are found too (the old 50-character prefix test missed 2019 AMC 12B #4, #5, #20).
// Prints pairs scoring over 0.5; 1.00 is word for word. Check the answer choices before copying.
// usage: node tools/near-twins.js [year-filter, e.g. "2022 AMC 12A"]
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data','problems');
vm.runInThisContext(fs.readFileSync(path.join(R,'problem-db.js'),'utf8'));
fs.readdirSync(path.join(R,'statements')).forEach(f=>vm.runInThisContext(fs.readFileSync(path.join(R,'statements',f),'utf8')));
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const S=window.MATH_STATEMENTS,DB=window.MATH_PROBLEM_DB,f=process.argv[2]||'AMC 12';
const norm=s=>s.replace(/\\[a-z]+/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
const grams=s=>{const g=new Set();for(let i=0;i<s.length-5;i++)g.add(s.slice(i,i+6));return g;};
const done=DB.filter(p=>p.strategy&&/AMC 10/.test(p.ref)&&S[slug(p.ref)]).map(p=>({ref:p.ref,g:grams(norm(S[slug(p.ref)].s))}));
DB.filter(p=>!p.strategy&&p.ref.includes(f)).forEach(p=>{const st=S[slug(p.ref)];if(!st)return;const g=grams(norm(st.s));let best=null,bs=0;
 for(const d of done){let c=0;for(const x of g)if(d.g.has(x))c++;const sc=c/Math.max(g.size,d.g.size);if(sc>bs){bs=sc;best=d.ref;}}
 if(bs>0.5)console.log(p.ref,'~',best,bs.toFixed(2));});
