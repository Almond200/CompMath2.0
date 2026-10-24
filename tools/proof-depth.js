// Step E: how much proof each card carries ("Why it works" + "Full proof" in MATH_DETAILS).
// usage: node tools/proof-depth.js [--list [N]]   (prints counts; --list prints the N thinnest, highest importance first)
//        node tools/proof-depth.js --dense [N]   (unreviewed cards, fewest proof characters per Key form and observation first)
// A card is "thin" when its proof text (math stripped) is under 350 characters, or it has no "Why it works".
// Cards read in step E and judged complete (every Key form and observation argued) are listed in tools/proof-depth-reviewed.txt and skipped.
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');const R=path.join(__dirname,'..','js','data');
for(const f of fs.readdirSync(R).filter(f=>f.endsWith('.js')))try{vm.runInThisContext(fs.readFileSync(path.join(R,f),'utf8'))}catch(e){}
for(const f of fs.readdirSync(path.join(R,'details')))vm.runInThisContext(fs.readFileSync(path.join(R,'details',f),'utf8'));
const cards=[];const walk=o=>{if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object'){if(o.id&&o.importance&&o.name)cards.push(o);Object.values(o).forEach(walk)}};
for(const k of Object.keys(window))if(/^MATH_/.test(k)&&!/PROBLEM|STATEMENT|EXAMPLE|DETAILS/.test(k))walk(window[k]);
const seen=new Set(),C=cards.filter(c=>!seen.has(c.id)&&seen.add(c.id));
const REV=new Set(fs.readFileSync(path.join(__dirname,'proof-depth-reviewed.txt'),'utf8').split('\n').map(l=>l.split('#')[0].trim()).filter(Boolean));
const RANK={high:0,medium:1,low:2,lower:3,lowest:4};
const section=(t,h)=>{const m=t.match(new RegExp('^## '+h+'\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))','m'));return m?m[1]:null;};
const plain=s=>s.replace(/\$\$[\s\S]*?\$\$/g,' M ').replace(/\$[^$]*\$/g,' m ').replace(/\{\{[^}]*\}\}/g,'').replace(/\s+/g,' ').trim();
const rows=[];
for(const c of C){if(c.kind==='pattern'||c.type==='pattern')continue;const d=window.MATH_DETAILS[c.id];if(!d)continue;
  const why=section(d,'Why it works'),full=section(d,'Full proof');
  if(why===null&&full===null&&/^## (Distinguishing clues)/m.test(d))continue;
  const len=plain((why||'')+' '+(full||'')).length;
  rows.push({id:c.id,imp:c.importance,name:c.name,len,why:why!==null,full:full!==null});}
const thin=rows.filter(r=>(!r.why||r.len<350)&&!REV.has(r.id)).sort((a,b)=>(RANK[a.imp]-RANK[b.imp])||(a.len-b.len));
console.log('cards with a proof section',rows.length,'| thin (under 350 characters or no Why it works)',thin.length,'| no Why it works',rows.filter(r=>!r.why).length,'| reviewed',REV.size);
const j=process.argv.indexOf('--dense');if(j>=0){const cnt=(t,h)=>((section(t,h)||'').match(/^- /mg)||[]).length;
  const D=rows.filter(r=>!REV.has(r.id)).map(r=>{const d=window.MATH_DETAILS[r.id];const k=cnt(d,'Key forms')+0.5*cnt(d,'Useful observations');return [r.id,r.imp,r.len,k?Math.round(r.len/k):r.len];}).sort((a,b)=>a[3]-b[3]);
  console.log('unreviewed',D.length);for(const r of D.slice(0,+(process.argv[j+1]||D.length)))console.log(r.join(' | '));}
const i=process.argv.indexOf('--list');if(i>=0){const n=+(process.argv[i+1]||thin.length);for(const r of thin.slice(0,n))console.log(r.id,'|',r.imp,'|',r.len,'|',r.full?'full proof':'-','|',r.name);}
