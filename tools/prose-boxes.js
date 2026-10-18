// 2.4e-ii: list cards whose formula box (latex) is mostly prose, by the share of its characters inside \text{...}.
// usage: node tools/prose-boxes.js [minShare]
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');
const R=path.join(__dirname,'..','js','data');
['geometry.js','algebra.js','number-theory.js','counting.js','patterns.js'].forEach(f=>{try{vm.runInThisContext(fs.readFileSync(path.join(R,f),'utf8'))}catch(e){}});
const min=+(process.argv[2]||0.5),rows=[];
(window.MATH_SECTIONS||[]).forEach(s=>s.subsections.forEach(ss=>(ss.formulas||[]).forEach(c=>{
  const L=c.latex||'';let t=0;const re=/\\text\{((?:[^{}]|\{[^{}]*\})*)\}/g;let m;while((m=re.exec(L)))t+=m[1].length;
  const share=L.length?t/L.replace(/\\[a-z]+|[{}\s]/gi,'').length:0;
  if(share>=min)rows.push([share,c.id,c.type||'formula',L]);
})));
rows.sort((a,b)=>b[0]-a[0]);rows.forEach(r=>console.log(r[0].toFixed(2)+'  '+r[1]+' ('+r[2]+')\n      '+r[3]));
console.error(rows.length+' boxes');
