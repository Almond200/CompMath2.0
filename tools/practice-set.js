// The practice pass (PLAN 2.7a): rewrite problem entries by ref, keeping the one-line format.
// usage: node tools/practice-set.js edits.json   (edits: { "<ref>": { formulas, strategy, trick, trickFormulas } } ; null deletes a field)
const fs=require('fs');const P=require('path').join(__dirname,'..','js','data','problems','problem-db.js');
const edits=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
let lines=fs.readFileSync(P,'utf8').split('\n');
const ORDER=['ref','formulas','strategy','trick','trickFormulas'];
const q=s=>'"'+s.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
const ser=v=>Array.isArray(v)?'['+v.map(q).join(', ')+']':typeof v==='string'?q(v):JSON.stringify(v);
for(const ref of Object.keys(edits)){
  const i=lines.findIndex(l=>l.startsWith('  { ref: '+q(ref)+','));
  if(i<0){console.error('NOT FOUND',ref);process.exit(1);}
  const m=lines[i].match(/^  (\{.*\})(,?)\s*$/); const o=eval('('+m[1]+')');
  for(const [k,v] of Object.entries(edits[ref])){ if(v===null) delete o[k]; else o[k]=v; }
  for(const f of ['strategy','trick']) if(o[f] && /\\'/.test(o[f])) {console.error("escaped quote \\' in "+f,ref);process.exit(1);}
  if(o.strategy && /"|</.test(o.strategy)) {console.error('raw quote or < in',ref);process.exit(1);}
  if(o.trick && /"|</.test(o.trick)) {console.error('raw quote or < in trick',ref);process.exit(1);}
  const keys=[...ORDER.filter(k=>k in o),...Object.keys(o).filter(k=>!ORDER.includes(k))];
  lines[i]='  { '+keys.map(k=>k+': '+ser(o[k])).join(', ')+' }'+m[2];
  console.log('set',ref);
}
fs.writeFileSync(P,lines.join('\n'));
