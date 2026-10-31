// The answer grammar of the Learn math keyboard (CONVENTIONS §14). An answer is a plain
// expression such as 3/4, 2sqrt(3), 7pi/2, -5 or a comma list such as 4, 9. It is read into a
// small tree, which gives its value (answers are compared by value) and its typeset form (the
// box shows the answer typeset as it is built, so the student never types LaTeX).
// The browser reads window.LearnAnswer; tools/check-learn.js loads the same file in Node.
(function (root) {
  "use strict";
  // Tokens: numbers, pi, sqrt, + - * / ^ ( ) and the comma. "×" and "÷" are accepted as typed.
  function tokens(src) {
    const out = [];
    const s = String(src).replace(/[×·]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/π/g, "pi").replace(/√/g, "sqrt");
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (num) { out.push({ t: "num", v: num[1] }); i += num[1].length; continue; }
      if (s.startsWith("pi", i)) { out.push({ t: "pi" }); i += 2; continue; }
      if (s.startsWith("sqrt", i)) { out.push({ t: "sqrt" }); i += 4; continue; }
      if ("+-*/^(),".indexOf(c) !== -1) { out.push({ t: c }); i++; continue; }
      throw new Error("The answer has a character the keyboard does not type: " + c);
    }
    return out;
  }

  // expr := term (("+" | "-") term)*
  // term := unary (("*" | "/" | nothing) unary)*      (nothing: 2sqrt(3), 7pi, 2(3))
  // unary := "-" unary | power
  // power := atom ("^" unary)?
  // atom := number | pi | sqrt atom | "(" expr ")"
  function parseOne(toks) {
    let k = 0;
    const peek = () => toks[k] && toks[k].t;
    const eat = t => { if (peek() !== t) throw new Error("Expected " + t); k++; };
    const startsAtom = () => ["num", "pi", "sqrt", "("].indexOf(peek()) !== -1;
    function expr() {
      let a = term();
      while (peek() === "+" || peek() === "-") { const op = toks[k++].t; a = { op, a, b: term() }; }
      return a;
    }
    function term() {
      let a = unary();
      for (;;) {
        if (peek() === "*" || peek() === "/") { const op = toks[k++].t; a = { op, a, b: unary() }; }
        else if (startsAtom()) a = { op: "*", a, b: power(), implicit: true };
        else return a;
      }
    }
    function unary() { if (peek() === "-") { k++; return { op: "neg", a: unary() }; } return power(); }
    function power() {
      const a = atom();
      if (peek() === "^") { k++; return { op: "^", a, b: unary() }; }
      return a;
    }
    function atom() {
      const t = peek();
      if (t === "num") return { op: "num", v: toks[k++].v };
      if (t === "pi") { k++; return { op: "pi" }; }
      if (t === "sqrt") { k++; return { op: "sqrt", a: atom() }; }
      if (t === "(") { k++; const e = expr(); eat(")"); return { op: "()", a: e }; }
      throw new Error(t ? "Unexpected " + t : "The answer stops too soon");
    }
    const e = expr();
    if (k !== toks.length) throw new Error("Unexpected " + toks[k].t);
    return e;
  }

  // A list of expressions, split at the commas.
  function parse(src) {
    const toks = tokens(src), parts = [[]];
    toks.forEach(t => { if (t.t === ",") parts.push([]); else parts[parts.length - 1].push(t); });
    if (!toks.length) throw new Error("The answer is empty");
    return parts.map(parseOne);
  }

  function value(n) {
    switch (n.op) {
      case "num": return parseFloat(n.v);
      case "pi": return Math.PI;
      case "sqrt": return Math.sqrt(value(n.a));
      case "()": return value(n.a);
      case "neg": return -value(n.a);
      case "+": return value(n.a) + value(n.b);
      case "-": return value(n.a) - value(n.b);
      case "*": return value(n.a) * value(n.b);
      case "/": return value(n.a) / value(n.b);
      case "^": return Math.pow(value(n.a), value(n.b));
    }
    return NaN;
  }

  // The typeset form. A quotient is drawn as a fraction, so its own brackets are dropped.
  const bare = n => n.op === "()" ? n.a : n;
  function tex(n) {
    switch (n.op) {
      case "num": return n.v;
      case "pi": return "\\pi";
      case "sqrt": return "\\sqrt{" + tex(bare(n.a)) + "}";
      case "()": return "\\left(" + tex(n.a) + "\\right)";
      case "neg": return "-" + tex(n.a);
      case "+": return tex(n.a) + "+" + tex(n.b);
      case "-": return tex(n.a) + "-" + tex(n.b);
      case "*": {
        // 2pi and 2sqrt(3) need no sign; two numbers side by side do.
        const right = tex(n.b);
        return tex(n.a) + (n.implicit && !/^\d|^\./.test(right) ? "" : n.implicit ? "\\cdot " : "\\times ") + right;
      }
      case "/": return "\\frac{" + tex(bare(n.a)) + "}{" + tex(bare(n.b)) + "}";
      case "^": return (/^(num|pi|\(\))$/.test(n.a.op) ? tex(n.a) : "{" + tex(n.a) + "}") + "^{" + tex(bare(n.b)) + "}";
    }
    return "";
  }
  function toTex(src) { return parse(src).map(tex).join(",\\ "); }

  // Close the brackets a student has opened but not yet closed, so the box can typeset an
  // answer while it is being built.
  function closeOpen(src) {
    const s = String(src);
    let depth = 0;
    for (const c of s) { if (c === "(") depth++; else if (c === ")" && depth > 0) depth--; }
    return s + ")".repeat(depth);
  }

  // Two answers agree when their values agree (within 1e-9 relative); a list is compared as
  // a set, so "9, 4" matches "4, 9" and "6/8" matches "3/4".
  function values(src) { return parse(src).map(value).sort((x, y) => x - y); }
  function same(a, b) {
    let x, y;
    try { x = values(a); y = values(b); } catch (e) { return false; }
    if (x.length !== y.length) return false;
    return x.every((v, i) => isFinite(v) && isFinite(y[i]) && Math.abs(v - y[i]) <= 1e-9 * Math.max(1, Math.abs(v), Math.abs(y[i])));
  }

  const api = { parse, values, toTex, closeOpen, same };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.LearnAnswer = api;
})(typeof window !== "undefined" ? window : this);
