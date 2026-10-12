// A stand-in for macOS JavaScriptCore's `jsc` shell, for machines without it (Linux, the
// cloud sessions). The gates run small scripts that call jsc's load(path) and print(...);
// this defines those (and read, readFile, quit) and runs the script, so `JSC=tools/jsc-node` works the same way.
//   node tools/jsc-node.js script.js
const fs = require("fs"), vm = require("vm"), path = require("path");
globalThis.print = (...a) => console.log(a.join(" "));
globalThis.read = f => fs.readFileSync(path.resolve(f), "utf8");
globalThis.readFile = globalThis.read;
globalThis.quit = c => process.exit(c || 0);
globalThis.load = f => vm.runInThisContext(fs.readFileSync(path.resolve(f), "utf8"), { filename: f });
const file = process.argv[2];
if (!file) { console.error("usage: node tools/jsc-node.js script.js"); process.exit(2); }
try { globalThis.load(file); } catch (e) { console.log(String(e && e.stack || e)); process.exit(3); }
