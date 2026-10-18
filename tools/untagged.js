// Step D (write-ups for every problem without one): list problems with a statement and no strategy,
// newest paper first, for one contest, with the twin entry in the other contest when the statement is identical.
// usage: node tools/untagged.js "AMC 10" [limit] [--full]
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data','problems');
vm.runInThisContext(fs.readFileSync(path.join(R,'problem-db.js'),'utf8'));
fs.readdirSync(path.join(R,'statements')).forEach(f=>vm.runInThisContext(fs.readFileSync(path.join(R,'statements',f),'utf8')));
const slug=r=>r.toLowerCase().replace(/,? problem /,'-').replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');
const contest=process.argv[2]||'AMC 10',lim=+(process.argv[3]||25),full=process.argv.includes('--full');
const S=window.MATH_STATEMENTS,DB=window.MATH_PROBLEM_DB;
const norm=s=>(s||'').replace(/\s+/g,' ').trim();
const key=p=>{const m=p.ref.match(/^(\d+)(?: (Spring|Fall))? (.*?), Problem (\d+)$/);return [+m[1],m[2]==='Fall'?1:0,m[3],+m[4]];};
const list=DB.filter(p=>!p.strategy&&p.ref.includes(contest)&&S[slug(p.ref)]).sort((a,b)=>{const x=key(a),y=key(b);return y[0]-x[0]||y[1]-x[1]||(x[2]<y[2]?-1:x[2]>y[2]?1:0)||x[3]-y[3];});
const byStmt={};DB.forEach(p=>{const s=S[slug(p.ref)];if(s){const k=norm(s.s);(byStmt[k]=byStmt[k]||[]).push(p.ref);}});
list.slice(0,lim).forEach(p=>{const s=S[slug(p.ref)],tw=(byStmt[norm(s.s)]||[]).filter(r=>r!==p.ref);
 console.log('### '+p.ref+'  ['+slug(p.ref)+']'+(tw.length?'  twin: '+tw.join('; '):'')+(p.formulas&&p.formulas.length?'  tags: '+p.formulas.join(','):''));
 if(full)console.log(s.s+'\n');});
console.error(list.length+' without a strategy');
