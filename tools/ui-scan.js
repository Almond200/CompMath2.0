/* UI scan: paste into the browser pane (or `eval(await (await fetch("tools/ui-scan.js")).text())`)
   with the dev server running. It defines, on window:
     __scan()            -> list of layout problems on the page now showing
     __sweep(hashes, label, wait)  -> visits each hash route, stores problems in __res[label]
     __cardIds()         -> every card id (formula, method, pattern)
     __bright(th)        -> text drawn in near-white (dark mode contrast audit), grouped by selector
   Problems reported: page-h-overflow (the page scrolls sideways), past-right (an element
   hangs off the right edge outside any scrolling box), clipped (overflow hidden cuts content),
   formula-scrolls (a display formula wider than its box; it scrolls, by design), katex-error,
   broken-img. Run it at an emulated width (resize_window) so innerWidth is real. */
window.__scan = function () {
  const out = [], vw = document.documentElement.clientWidth, de = document.documentElement;
  if (de.scrollWidth > vw + 1) out.push("page-h-overflow " + de.scrollWidth + ">" + vw);
  const root = document.querySelector("main") || document.body;
  const desc = e => { let s = e.tagName.toLowerCase(); if (e.id) s += "#" + e.id; if (e.className && typeof e.className === "string") s += "." + e.className.trim().split(/\s+/).slice(0, 2).join("."); return s; };
  const seen = new Set(), add = k => { if (!seen.has(k)) { seen.add(k); out.push(k); } };
  root.querySelectorAll("*").forEach(e => {
    if (e.closest("[hidden],.katex-mathml,svg") && e.tagName !== "svg") return;
    const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return;
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
    const inKatex = !!e.closest(".katex");
    if (r.right > vw + 2 && cs.position !== "fixed" && !inKatex) {
      let p = e.parentElement, scrolls = false;
      while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === "auto" || o === "scroll" || o === "hidden") { scrolls = true; break; } p = p.parentElement; }
      if (!scrolls) add("past-right " + desc(e) + " " + Math.round(r.right) + ">" + vw);
    }
    if (!inKatex && e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0 && /^(hidden|clip)$/.test(cs.overflowX)) add("clipped " + desc(e) + " " + e.scrollWidth + ">" + e.clientWidth);
    if (e.classList.contains("katex-display") && e.scrollWidth > e.clientWidth + 2) add("formula-scrolls " + desc(e.parentElement) + " " + e.scrollWidth + ">" + e.clientWidth);
  });
  const ke = document.querySelectorAll(".katex-error"); if (ke.length) out.push("katex-error x" + ke.length);
  const imgs = [...root.querySelectorAll("img")].filter(i => i.complete && !i.naturalWidth); if (imgs.length) out.push("broken-img x" + imgs.length);
  return out;
};
window.__cardIds = function () {
  const ids = [];
  (function walk(o) { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === "object") { if (o.id && (o.formulas || o.name || o.title || o.latex) && !o.subsections && !o.groups) ids.push(o.id); for (const k in o) if (typeof o[k] === "object") walk(o[k]); } })(window.MATH_SECTIONS);
  return [...new Set(ids)];
};
window.__sweep = async function (hashes, label, wait) {
  window.__res = window.__res || {}; window.__res[label] = window.__res[label] || {};
  for (const h of hashes) {
    location.hash = h; let last = -1, stable = 0;
    for (let i = 0; i < 20 && stable < 2; i++) { await new Promise(r => setTimeout(r, wait || 120)); const n = document.body.innerText.length; if (n === last) stable++; else { stable = 0; last = n; } }
    const s = __scan(); if (s.length) window.__res[label][h] = s;
  }
};
window.__bright = function (th) {
  th = th || 205; const m = {};
  document.querySelectorAll("body *").forEach(e => {
    if (e.closest(".katex,svg,[hidden]")) return;
    const t = [...e.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(" "); if (!t) return;
    const cs = getComputedStyle(e); if (cs.display === "none") return;
    const c = cs.color.match(/[\d.]+/g).map(Number); if ((c[0] + c[1] + c[2]) / 3 < th) return;
    const k = e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/).join(".") : "") + " " + cs.color;
    (m[k] = m[k] || { n: 0, ex: t.slice(0, 30) }).n++;
  });
  return m;
};
