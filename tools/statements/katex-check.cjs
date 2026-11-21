// usage: node katexcheck.cjs file.js... : renders every $..$ and $$..$$ with KaTeX, reports errors
const katex = require(require('path').join(__dirname, '..', '..', 'vendor', 'katex', 'katex.min.js'));
global.window = {};
let bad = 0, n = 0;
for (const f of process.argv.slice(2)) {
  window.MATH_STATEMENTS = {};
  eval(require('fs').readFileSync(f, 'utf8'));
  for (const [slug, v] of Object.entries(window.MATH_STATEMENTS)) {
    const s = (typeof v === 'string' ? v : v.s).replace(/\\\$/g, '');
    const re = /\$\$([\s\S]*?)\$\$|\$([^$]*)\$/g; let m;
    while ((m = re.exec(s))) {
      n++;
      try { katex.renderToString(m[1] ?? m[2], { throwOnError: true, displayMode: !!m[1] }); }
      catch (e) { bad++; console.log(slug, '|', (m[1] ?? m[2]).slice(0, 80), '|', e.message.slice(0, 90)); }
    }
  }
}
console.log('formulas', n, 'errors', bad);
