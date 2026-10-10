// Prints {id: question} for every worked example, as one JSON line. Run by scan-conventions.py
// (the shared-numbers gate): jsc tools/dump-examples.js
var window = { MATH_EXAMPLES: {} };
load('js/data/examples-supplement.js');
var out = {};
for (var k in window.MATH_EXAMPLES) { var e = window.MATH_EXAMPLES[k]; out[k] = Array.isArray(e) ? e.map(function (x) { return x.q; }).join(" ") : e.q; }
print(JSON.stringify(out));
