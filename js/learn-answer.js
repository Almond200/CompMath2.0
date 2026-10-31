// The answer grammar of the Learn math keyboard (CONVENTIONS §14). An answer is a plain
// expression such as 3/4, 2sqrt(3), 7pi/2, -5 or a comma list such as 4, 9. It is read into a
// small tree, which gives its value (answers are compared by value) and its typeset form (the
// box shows the answer typeset as it is built, so the student never types LaTeX).
// The browser reads window.LearnAnswer; tools/check-learn.js loads the same file in Node.
(function (root) {
  "use strict";
  // What a student might reasonably type is first brought to the plain grammar: sqrt(2), sqrt 2,
  // √2, pi, π, 2**3, 2², ×, ÷, ·, the Unicode minus, square and curly brackets, LaTeX such as
  // \frac{3}{4} or \sqrt{3}, a leading "x = ", 1,000 as one thousand, and "and" or "or"
  // between the items of a list.
  const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
  function normalize(src) {
    let s = String(src).trim().replace(/\$/g, "");
    s = s.replace(/^[a-z]\s*=\s*/i, "").replace(/=\s*$/, "");
    s = s.replace(/\\left|\\right|\\[,;!:]|\\displaystyle/g, "");
    // LaTeX, innermost first, so nested fractions and roots come out right.
    for (let k = 0; k < 8; k++) {
      const t = s.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "(($1)/($2))")
        .replace(/\\[dt]?frac\s*(\d)\s*(\d)/g, "($1/$2)")
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\pi\b/g, "pi").replace(/\\(?:cdot|times)\b/g, "*").replace(/\\div\b/g, "/").replace(/\\pm\b/g, "±").replace(/\\sqrt\b/g, "sqrt");
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, m => "^(" + [...m].map(c => SUP[c]).join("") + ")");
    s = s.replace(/\*\*/g, "^").replace(/[×·∙⋅]/g, "*").replace(/[÷∕]/g, "/").replace(/[−–—]/g, "-")
      .replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/∛/g, "cbrt").replace(/[[{]/g, "(").replace(/[\]}]/g, ")");
    s = s.toLowerCase().replace(/\s+(?:and|or)\s+/g, ", ").replace(/\bsquare\s*root\s*(?:of)?\b/g, "sqrt");
    // 1,000 and 12,345,678 are numbers; "4,9" and "4, 9" stay lists.
    for (let k = 0; k < 4; k++) s = s.replace(/(\d),(\d{3})(?![\d,]?\d)/g, "$1$2");
    return s;
  }

  // Tokens: numbers, pi, sqrt, cbrt, + - * / ^ ( ) and the comma.
  function tokens(src) {
    const out = [];
    const s = normalize(src);
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (num) {
        // "1 1/2" would silently read as 1 × 1/2; better to ask.
        if (out.length && out[out.length - 1].t === "num") throw new Error("Two numbers stand side by side: put a sign or a bracket between them.");
        out.push({ t: "num", v: num[1] }); i += num[1].length; continue;
      }
      if (s.startsWith("pi", i)) { out.push({ t: "pi" }); i += 2; continue; }
      if (s.startsWith("sqrt", i)) { out.push({ t: "sqrt" }); i += 4; continue; }
      if (s.startsWith("cbrt", i)) { out.push({ t: "cbrt" }); i += 4; continue; }
      if ("+-*/^(),±".indexOf(c) !== -1) { out.push({ t: c }); i++; continue; }
      throw new Error(`"${c}" is not part of an answer: use digits, + − × ÷ ^, √, π and brackets.`);
    }
    return out;
  }
  const SHOW = { "*": "×", "/": "÷", "-": "−", sqrt: "√", cbrt: "∛", pi: "π" };
  const sym = t => SHOW[t.t] || (t.t === "num" ? t.v : t.t);

  // expr := term (("+" | "-") term)*
  // term := unary (("*" | "/" | nothing) unary)*      (nothing: 2sqrt(3), 7pi, 2(3))
  // unary := "-" unary | power
  // power := atom ("^" unary)?
  // atom := number | pi | sqrt atom | cbrt atom | "(" expr ")"
  function parseOne(toks) {
    let k = 0;
    const peek = () => toks[k] && toks[k].t;
    const eat = t => { if (peek() !== t) throw new Error("A bracket is not closed."); k++; };
    const startsAtom = () => ["num", "pi", "sqrt", "cbrt", "("].indexOf(peek()) !== -1;
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
    function unary() {
      if (peek() === "-") { k++; return { op: "neg", a: unary() }; }
      if (peek() === "+") { k++; return unary(); }
      return power();
    }
    function power() {
      const a = atom();
      if (peek() === "^") { k++; return { op: "^", a, b: unary() }; }
      return a;
    }
    function atom() {
      const t = peek();
      if (t === "num") return { op: "num", v: toks[k++].v };
      if (t === "pi") { k++; return { op: "pi" }; }
      if (t === "sqrt" || t === "cbrt") { k++; if (!peek()) throw new Error(`${sym({ t })} needs a number after it.`); return { op: t, a: atom() }; }
      if (t === "(") { k++; if (peek() === ")") throw new Error("A pair of brackets is empty."); const e = expr(); eat(")"); return { op: "()", a: e }; }
      if (!t) throw new Error(k ? `Something is missing after "${sym(toks[k - 1])}".` : "The answer is empty.");
      throw new Error(k ? `Something is missing between "${sym(toks[k - 1])}" and "${sym(toks[k])}".` : `The answer cannot start with "${sym(toks[k])}".`);
    }
    const e = expr();
    if (k !== toks.length) throw new Error(toks[k].t === ")" ? "There is a ) with no ( before it." : `There is an extra "${sym(toks[k])}".`);
    return e;
  }

  // A list of expressions, split at the commas. An item with ± stands for two: 2±√3 is the
  // list 2+√3, 2−√3.
  function expandPm(part) {
    const i = part.findIndex(t => t.t === "±");
    if (i < 0) return [part];
    return [...expandPm([...part.slice(0, i), { t: "+" }, ...part.slice(i + 1)]), ...expandPm([...part.slice(0, i), { t: "-" }, ...part.slice(i + 1)])];
  }
  function parse(src) {
    const toks = tokens(src), parts = [[]];
    if (!toks.length) throw new Error("The answer is empty.");
    toks.forEach(t => { if (t.t === ",") parts.push([]); else parts[parts.length - 1].push(t); });
    if (parts.some(p => !p.length)) throw new Error("The list has an empty item: check the commas.");
    // Each ± doubles the answers, so the count is capped before any are built (a report,
    // 2026-10-31: sixteen ± signs made 65,536 answers and stalled the preview).
    const PM_MAX = 3, ANSWERS_MAX = 24;
    let total = 0;
    parts.forEach(p => {
      const n = p.filter(t => t.t === "±").length;
      if (n > PM_MAX) throw new Error(`An answer can have at most ${PM_MAX} ± signs.`);
      total += 2 ** n;
    });
    if (total > ANSWERS_MAX) throw new Error(`The answer stands for more than ${ANSWERS_MAX} values; list fewer.`);
    return parts.flatMap(expandPm).map(parseOne);
  }

  function value(n) {
    switch (n.op) {
      case "num": return parseFloat(n.v);
      case "pi": return Math.PI;
      case "sqrt": return Math.sqrt(value(n.a));
      case "cbrt": return Math.cbrt(value(n.a));
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
      case "cbrt": return "\\sqrt[3]{" + tex(bare(n.a)) + "}";
      // Brackets around a single number, root or fraction are only grouping: drawn without them.
      case "()": return /^(num|pi|sqrt|cbrt|\/|\(\))$/.test(n.a.op) ? tex(n.a) : "\\left(" + tex(n.a) + "\\right)";
      case "neg": return "-" + tex(n.a);
      case "+": return tex(n.a) + "+" + tex(n.b);
      case "-": return tex(n.a) + "-" + tex(n.b);
      case "*": {
        // 2pi and 2sqrt(3) need no sign. Two numbers side by side do, and so does a number
        // before a fraction: 2(3/4) drawn as 2 3/4 would read as the mixed number.
        const right = tex(n.b), r = bare(n.b);
        const sign = !n.implicit ? "\\times " : /^\d|^\./.test(right) || r.op === "/" ? "\\cdot " : "";
        return tex(n.a) + sign + right;
      }
      case "/": return "\\frac{" + tex(bare(n.a)) + "}{" + tex(bare(n.b)) + "}";
      case "^": return (n.a.op === "()" ? "\\left(" + tex(n.a.a) + "\\right)" : /^(num|pi)$/.test(n.a.op) ? tex(n.a) : "{" + tex(n.a) + "}") + "^{" + tex(bare(n.b)) + "}";
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

  const api = { parse, values, toTex, closeOpen, same, normalize };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.LearnAnswer = api;
})(typeof window !== "undefined" ? window : this);
