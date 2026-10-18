// 2.7c (every symbol defined on its own card): print each card's thumbnail and description, in file order.
// usage: node tools/card-text.js geometry.js 75 100
global.window=global;const fs=require('fs'),vm=require('vm'),path=require('path');
vm.runInThisContext(fs.readFileSync(path.join(__dirname,'..','js','data',process.argv[2]),'utf8'));
const out=[];(window.MATH_SECTIONS||[]).forEach(s=>s.subsections.forEach(ss=>(ss.formulas||[]).forEach(c=>out.push(c))));
const a=+(process.argv[3]||0),b=+(process.argv[4]||out.length);
out.slice(a,b).forEach((c,i)=>console.log(`#${a+i} ${c.id} | ${c.name}\n  L: ${c.latex}\n  D: ${c.description}\n`));
console.error('cards in file: '+out.length);
