// Print {contest: {year: {...files}}} from js/app.js constants, so key scripts can fetch the official files.
const fs = require('fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const src = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
function grab(name) {
  const i = src.indexOf('const ' + name + ' =');
  let j = src.indexOf('{', i), depth = 0, k = j;
  for (; k < src.length; k++) { if (src[k] === '{') depth++; else if (src[k] === '}' && --depth === 0) break; }
  return eval('(' + src.slice(j, k + 1) + ')');
}
global.window = {};
require(path.join(root, 'js/data/problems/problem-db.js'));
const ukmt = Object.fromEntries([...new Set(window.MATH_PROBLEM_DB
  .map(({ref}) => ref.match(/^(\d{4}) UKMT ([SIJ]MC), Problem \d+$/)?.[0].split(',')[0])
  .filter(Boolean))].map(paper => {
    const [year,,round] = paper.split(' ');
    return [paper.toLowerCase().replaceAll(' ', '-'), grab('UKMT_' + round + '_FILES')[year]];
}));
const out = { UMD_BASE: 'https://mathcomp.math.umd.edu/files/', UMD: grab('UMD_FILES'), UTAH: grab('UTAH_FILES'), COLUMBUS: grab('COLUMBUS_FILES'), UKMT: ukmt };
console.log(JSON.stringify(out));
