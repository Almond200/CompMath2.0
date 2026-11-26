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
  function normalize(src, symbolic) {
    let s = String(src).trim().replace(/\$/g, "");
    s = s.replace(/^[a-z]\s*=\s*/i, "").replace(/=\s*$/, "");
    s = s.replace(/\\left|\\right|\\[,;!:]|\\displaystyle/g, "");
    // LaTeX, innermost first, so nested fractions and roots come out right.
    for (let k = 0; k < 8; k++) {
      const t = s.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "(($1)/($2))")
        .replace(/\\[dt]?frac\s*(\d)\s*(\d)/g, "($1/$2)")
        .replace(/\\[dt]?binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "choose($1, $2)")
        .replace(/\\sqrt\s*\[([1-9]\d*)\]\s*\{([^{}]*)\}/g, (_, degree, base) =>
          degree === "3" ? `cbrt(${base})` : `((${base})^(1/${degree}))`)
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\(?:mathrm|text)\s*\{\s*i\s*\}|ⅈ/g, "i");
    s = s.replace(/\\(pi|sqrt|ln|exp|sin|cos|tan|arctan)\b/g, "$1").replace(/\\(?:cdot|times)\b/g, "*").replace(/\\div\b/g, "/").replace(/\\pm\b/g, "±");
    s = s.replace(/\batan(?=\s*\()/gi, "arctan")
      .replace(/\btan\s*\^\s*(?:[-−]1|\{[-−]1\}|\([-−]1\))\s*(?=\()/gi, "arctan");
    s = s.replace(/(?:\\)?\blog\s*_?\s*(?:\{(\d+)\}|(\d+))\s*\(([^()]*)\)/gi,
      (_, bracedBase, base, input) => `(ln(${input})/ln(${bracedBase || base}))`);
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, m => "^(" + [...m].map(c => SUP[c]).join("") + ")");
    s = s.replace(/\*\*/g, "^").replace(/[×·∙⋅]/g, "*").replace(/[÷∕]/g, "/").replace(/[−–—]/g, "-")
      .replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/∛/g, "cbrt").replace(/[[{]/g, "(").replace(/[\]}]/g, ")");
    if (!symbolic) s = s.toLowerCase();
    s = s.replace(/\s+(?:and|or)\s+/gi, ", ").replace(/\bsquare\s*root\s*(?:of)?\b/gi, "sqrt");
    return s;
  }

  // Tokens: numbers, pi, sqrt, cbrt, + - * / ^ ! ( ) and the comma.
  function tokens(src, groupThousands = true, allowImaginary, variable, symbolic) {
    const out = [], groups = [];
    const s = normalize(src, symbolic);
    const variableToken = variable?.toLowerCase();
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const rest = s.slice(i);
      // A scalar bracket can contain spaced thousands separators. Lists, symbolic tuples
      // and choose(n, k) still use commas to separate their entries.
      const grouped = groups.length
        ? groups.at(-1) && /^\d{1,3}(?:,\s*\d{3})+(?:\.\d*)?(?![\d.]|,\s*\d)/.exec(rest)
        : groupThousands && /^\d{1,3}(?:,\d{3})+(?:\.\d*)?(?![\d.]|,\d)/.exec(rest);
      const num = grouped || /^(\d+\.?\d*|\.\d+)/.exec(rest);
      if (num) {
        // "1 1/2" would silently read as 1 × 1/2; better to ask.
        if (out.length && out[out.length - 1].t === "num") throw new Error("Two numbers stand side by side: put a sign or a bracket between them.");
        const digits = num[0];
        const token = { t: "num", v: digits.replace(/[,\s]/g, "") };
        if (grouped) token.display = digits.replace(/,\s*/g, "{,}");
        out.push(token); i += digits.length; continue;
      }
      if (s.startsWith("pi", i)) { out.push({ t: "pi" }); i += 2; continue; }
      if (s.startsWith("sqrt", i)) { out.push({ t: "sqrt" }); i += 4; continue; }
      if (s.startsWith("cbrt", i)) { out.push({ t: "cbrt" }); i += 4; continue; }
      if (s.startsWith("choose", i)) { out.push({ t: "choose" }); i += 6; continue; }
      const fn = /^(ln|exp|arctan|sin|cos|tan|fib)/.exec(s.slice(i));
      if (fn) { out.push({ t: fn[1] }); i += fn[1].length; continue; }
      if (c === variableToken) { out.push({ t: "variable", v: variable }); i++; continue; }
      if (c === "e" && !/[\d_₀-₉]/.test(s[i + 1] || "")) { out.push({ t: "e" }); i++; continue; }
      if (allowImaginary && c === "i") { out.push({ t: "i" }); i++; continue; }
      if (symbolic) {
        if (/^inf(?:inity)?\b/i.test(s.slice(i))) throw new Error("Use infinity in an interval");
        const symbol = /^([A-Za-z\p{Script=Greek}])(?:_(?:\(([A-Za-z0-9]+)\)|(\d+|[A-Za-z]))|([₀-₉]+))?/u.exec(s.slice(i));
        if (symbol) {
          const [, letter, braced, plain, unicode] = symbol;
          const index = braced || plain || (unicode && [...unicode].map(digit => digit.charCodeAt(0) - '₀'.charCodeAt(0)).join(''));
          out.push({ t: "variable", v: index ? `${letter}_{${index}}` : letter });
          i += symbol[0].length; continue;
        }
      }
      if ("+-*/^!(),±".indexOf(c) !== -1) {
        if (c === "(") {
          const previous = out.at(-1)?.t;
          groups.push(previous !== "choose" && (!symbolic || groupThousands || unaryFunctions.includes(previous)));
        }
        if (c === ")") groups.pop();
        out.push({ t: c }); i++; continue;
      }
      throw new Error(`"${c}" is not part of an answer: use digits, + − × ÷ ^, √, π and brackets.`);
    }
    return out;
  }
  const SHOW = { "*": "×", "/": "÷", "-": "−", sqrt: "√", cbrt: "∛", pi: "π" };
  const sym = t => SHOW[t.t] || t.v || t.t;
  const functions = { ln: Math.log, exp: Math.exp, arctan: Math.atan, sin: Math.sin, cos: Math.cos, tan: Math.tan };
  const unaryFunctions = ["sqrt", "cbrt", "fib", ...Object.keys(functions)];
  const atomTokens = ["num", "variable", "pi", "e", "choose", "(", ...unaryFunctions];

  // expr := term (("+" | "-") term)*
  // term := unary (("*" | "/" | nothing) unary)*      (nothing: 2sqrt(3), 7pi, 2(3))
  // unary := "-" unary | power
  // power := atom "!"? ("^" unary)?
  // atom := number | pi | sqrt atom | cbrt atom | "(" expr ")" | choose "(" expr "," expr ")"
  function parseOne(toks, symbolic) {
    let k = 0;
    const peek = () => toks[k] && toks[k].t;
    const eat = t => { if (peek() !== t) throw new Error("A bracket is not closed."); k++; };
    const startsAtom = () => peek() === "i" || atomTokens.includes(peek());
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
      let a = atom();
      if (peek() === "!") { k++; a = { op: "!", a }; }
      if (peek() === "^") { k++; return { op: "^", a, b: unary() }; }
      return a;
    }
    function atom() {
      const t = peek();
      if (t === "num" || t === "variable") {
        const { v, display } = toks[k++];
        return display ? { op: t, v, display } : { op: t, v };
      }
      if (t === "pi" || t === "e" || t === "i") { k++; return { op: t }; }
      if (unaryFunctions.includes(t)) { k++; if (!peek()) throw new Error(`${sym({ t })} needs a number after it.`); return { op: t, a: atom() }; }
      if (t === "choose") {
        k++;
        eat("(");
        const a = expr();
        eat(",");
        const b = expr();
        eat(")");
        return { op: "choose", a, b };
      }
      if (t === "(") {
        k++;
        if (peek() === ")") throw new Error("A pair of brackets is empty.");
        const first = expr();
        if (symbolic && peek() === ",") {
          const items = [first];
          while (peek() === ",") { k++; items.push(expr()); }
          eat(")");
          return { op: "tuple", items };
        }
        eat(")");
        return { op: "()", a: first };
      }
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
  function parse(src, groupThousands, allowImaginary = false, variable, symbolic = false) {
    const toks = tokens(src, groupThousands, allowImaginary, variable, symbolic), parts = [[]];
    if (!toks.length) throw new Error("The answer is empty.");
    let depth = 0;
    for (const token of toks) {
      if (token.t === "(") depth++;
      if (token.t === ")") depth--;
      if (token.t === "," && depth === 0) parts.push([]);
      else parts[parts.length - 1].push(token);
    }
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
    return parts.flatMap(expandPm).map(part => parseOne(part, symbolic));
  }

  function binomial(n, k) {
    if (n < 0n || n.toString(2).length > 64 || k < 0n) return null;
    if (k > n) return 0n;
    const count = k < n - k ? k : n - k;
    if (count > 2048n) return null;
    let result = 1n;
    for (let i = 1n; i <= count; i++) result = result * (n - count + i) / i;
    return result;
  }

  function fibonacci(index) {
    if (index < 0n || index > 16384n) return null;
    let a = 0n, b = 1n;
    for (const bit of index.toString(2)) {
      const even = a * (2n * b - a), odd = a * a + b * b;
      [a, b] = bit === "0" ? [even, odd] : [odd, even + odd];
    }
    return a;
  }

  function value(n, childValue = value) {
    if (Object.hasOwn(functions, n.op)) return functions[n.op](childValue(n.a));
    switch (n.op) {
      case "num": return parseFloat(n.v);
      case "pi": return Math.PI;
      case "e": return Math.E;
      case "sqrt": return Math.sqrt(childValue(n.a));
      case "cbrt": return Math.cbrt(childValue(n.a));
      case "fib": {
        const index = childValue(n.a);
        return Number.isSafeInteger(index) ? Number(fibonacci(BigInt(index)) ?? NaN) : NaN;
      }
      case "choose": {
        const a = childValue(n.a), b = childValue(n.b);
        if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) return NaN;
        return Number(binomial(BigInt(a), BigInt(b)) ?? NaN);
      }
      case "()": return childValue(n.a);
      case "neg": return -childValue(n.a);
      case "!": {
        const k = childValue(n.a);
        if (!Number.isInteger(k) || k < 0 || k > 170) return NaN;
        let result = 1;
        for (let i = 2; i <= k; i++) result *= i;
        return result;
      }
      case "+": return childValue(n.a) + childValue(n.b);
      case "-": return childValue(n.a) - childValue(n.b);
      case "*": return childValue(n.a) * childValue(n.b);
      case "/": return childValue(n.a) / childValue(n.b);
      case "^": {
        const a = childValue(n.a), b = childValue(n.b);
        return a === 0 && b === 0 ? NaN : Math.pow(a, b);
      }
    }
    return NaN;
  }

  // The typeset form. A quotient is drawn as a fraction, so its own brackets are dropped.
  const bare = n => n.op === "()" ? n.a : n;
  function tex(n) {
    if (Object.hasOwn(functions, n.op)) return "\\" + n.op + "\\left(" + tex(bare(n.a)) + "\\right)";
    switch (n.op) {
      case "num": return n.display || n.v;
      case "variable": return n.v;
      case "pi": return "\\pi";
      case "e": return "e";
      case "i": return "i";
      case "sqrt": return "\\sqrt{" + tex(bare(n.a)) + "}";
      case "cbrt": return "\\sqrt[3]{" + tex(bare(n.a)) + "}";
      case "fib": return "F_{" + tex(bare(n.a)) + "}";
      case "choose": return "\\binom{" + tex(bare(n.a)) + "}{" + tex(bare(n.b)) + "}";
      case "tuple": return "\\left(" + n.items.map(tex).join(",\\ ") + "\\right)";
      // Brackets around a single number, root or fraction are only grouping: drawn without them.
      case "()": return /^(num|pi|sqrt|cbrt|\/|\(\))$/.test(n.a.op) ? tex(n.a) : "\\left(" + tex(n.a) + "\\right)";
      case "neg": return "-" + tex(n.a);
      case "!": return tex(n.a) + "!";
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
      case "^": return (n.a.op === "()" ? "\\left(" + tex(n.a.a) + "\\right)" : /^(num|variable|pi)$/.test(n.a.op) ? tex(n.a) : "{" + tex(n.a) + "}") + "^{" + tex(bare(n.b)) + "}";
    }
    return "";
  }
  function toTex(src, groupThousands, allowImaginary, variable) { return parse(src, groupThousands, allowImaginary, variable).map(tex).join(",\\ "); }
  function hasVariable(node) {
    return !!node && (node.op === "variable" || hasVariable(node.a) || hasVariable(node.b) || node.items?.some(hasVariable));
  }
  // Practice can save and display symbolic work even when its answer key expects a number.
  function toSymbolicTex(src) {
    const sides = src.split("=").map(side => parse(side, false, false, undefined, true));
    if (!sides.some(side => side.some(hasVariable))) throw new Error("Expected a variable");
    if (sides.length > 1 && sides.some(side => side.length !== 1)) throw new Error("Expected an expression on each side");
    return sides.map(side => side.map(tex).join(",\\ ")).join("=");
  }

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
  function values(src) { return parse(src).map(node => value(node)).sort((x, y) => x - y); }
  function same(a, b) {
    let x, y;
    try { x = values(a); y = values(b); } catch (e) { return false; }
    if (x.length !== y.length) return false;
    return x.every((v, i) => isFinite(v) && isFinite(y[i]) && Math.abs(v - y[i]) <= 1e-9 * Math.max(1, Math.abs(v), Math.abs(y[i])));
  }

  const api = { parse, value, values, toTex, toSymbolicTex, closeOpen, same, binomial, fibonacci };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.LearnAnswer = api;
})(typeof window !== "undefined" ? window : this);
