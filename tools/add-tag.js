// Add a card to problems' formulas (and to every entry sharing the same strategy, the AMC 10/12 twin).
// usage: node tools/add-tag.js <card-id> "<ref>" ["<ref>" ...] [--first]   (--first puts the card first)
global.window=global;const fs=require('fs'),path=require('path');const P=path.join(__dirname,'..','js','data','problems','problem-db.js');
const args=process.argv.slice(2),first=args.includes('--first'),[id,...refs]=args.filter(a=>a!=='--first');
let lines=fs.readFileSync(P,'utf8').split('\n');
const q=s=>'"'+s.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
const parse=l=>{const m=l.match(/^  (\{.*\})(,?)\s*$/);return m?{o:eval('('+m[1]+')'),c:m[2]}:null;};
const strat=new Set();
refs.forEach(r=>{const i=lines.findIndex(l=>l.startsWith('  { ref: '+q(r)+','));if(i<0){console.error('NOT FOUND',r);process.exit(1);}const o=parse(lines[i]).o;if(o.strategy)strat.add(o.strategy);else strat.add('REF:'+r);});
lines=lines.map(l=>{const p=parse(l);if(!p||!p.o.ref)return l;const o=p.o;
  if(!(strat.has(o.strategy)||strat.has('REF:'+o.ref)))return l;
  if(o.formulas.includes(id)||(o.trickFormulas||[]).includes(id))return l;
  o.formulas=first?[id,...o.formulas]:[...o.formulas,id];console.log('tagged',o.ref);
  const ORDER=['ref','formulas','strategy','trick','trickFormulas'];const ser=v=>Array.isArray(v)?'['+v.map(q).join(', ')+']':typeof v==='string'?q(v):JSON.stringify(v);
  const keys=[...ORDER.filter(k=>k in o),...Object.keys(o).filter(k=>!ORDER.includes(k))];
  return '  { '+keys.map(k=>k+': '+ser(o[k])).join(', ')+' }'+p.c;});
fs.writeFileSync(P,lines.join('\n'));
