// Exercise the shared rich-text renderer before HTML parsing and KaTeX rendering.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('js/app.js','utf8'),start=src.indexOf('  function linkifyCards(text) {'),end=src.indexOf('\n  // Trim to whole sentences.',start);
const ctx={BY_ID:{circle:{formula:{name:'Circle'}}},escapeAttr:s=>s,redLink:(id)=>'broken:'+id};vm.createContext(ctx);vm.runInContext(src.slice(start,end),ctx);
const render=ctx.linkifyCards;
assert.equal(render('For $r<R$, keep the whole sentence.'),'For $r&lt;R$, keep the whole sentence.');
assert.equal(render('$$x<y\\quad y>z$$ followed by text.'),'$$x&lt;y\\quad y&gt;z$$ followed by text.');
assert.match(render('$r<R$ and [[circle|a circle]] after it.'),/\$r&lt;R\$ and <a[^>]+>a circle<\/a> after it\./);
assert.match(render('[[circle|$r<R$]]'),/<a[^>]+>\$r&lt;R\$<\/a>/);
assert.equal(render('<svg><path d="M0 0L1 1"/></svg>'),'<'+'svg><path d="M0 0L1 1"/></svg>');
assert.equal(render('$r\\lt R$'), '$r\\lt R$');
console.log('Card text: inline/display comparisons, linked math, following prose and embedded SVG preserved.');
