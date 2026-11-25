// Print {contest: {year: {...files}}} from contest sources, so key scripts can fetch the official files.
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const sources = require('../../js/contest-sources.js');
global.window = {};
require(path.join(root, 'js/data/problems/problem-db.js'));
const ukmt = Object.fromEntries([...new Set(window.MATH_PROBLEM_DB
  .map(({ref}) => ref.match(/^(\d{4}) UKMT ([SIJ]MC), Problem \d+$/)?.[0].split(',')[0])
  .filter(Boolean))].map(paper => {
    const [year,,round] = paper.split(' ');
    return [paper.toLowerCase().replaceAll(' ', '-'), sources['UKMT_' + round + '_FILES'][year]];
}));
const out = { UMD_BASE: 'https://mathcomp.math.umd.edu/files/', UMD: sources.UMD_FILES, UTAH: sources.UTAH_FILES, COLUMBUS: sources.COLUMBUS_FILES, UKMT: ukmt };
console.log(JSON.stringify(out));
