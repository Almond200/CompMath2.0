// Print {contest: {year: {...files}}} from js/app.js constants, so key scripts can fetch the official files.
const fs = require('fs');
const src = fs.readFileSync('/home/user/CompMath2.0/js/app.js', 'utf8');
function grab(name) {
  const i = src.indexOf('const ' + name + ' =');
  let j = src.indexOf('{', i), depth = 0, k = j;
  for (; k < src.length; k++) { if (src[k] === '{') depth++; else if (src[k] === '}' && --depth === 0) break; }
  return eval('(' + src.slice(j, k + 1) + ')');
}
const out = { UMD_BASE: 'https://mathcomp.math.umd.edu/files/', UMD: grab('UMD_FILES'), UTAH: grab('UTAH_FILES'), COLUMBUS: grab('COLUMBUS_FILES') };
console.log(JSON.stringify(out));
