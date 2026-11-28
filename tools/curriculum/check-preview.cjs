// Browser checks for the new curriculum's preview (curriculum/PREVIEW-PLAN.md §5).
//   CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/curriculum/check-preview.cjs [shotsDir]
// 1. Every page of every written chapter at 1280 and 375 px, light and dark: no KaTeX errors, no raw "$", no
//    horizontal overflow, no page or console errors, every figure and archive statement present.
// 2. Checkpoints and problems: wrong and right answers, the solution only
//    after an attempt, persistence across reload, and no write to the live textbooks' "mq-learn".
// 3. Export carries "mq-learn2" and Import restores it.
// 4. Legacy regressions: the Learn page, a live lesson, search, Practice and the home page still
//    render without errors, and none of them links to #/preview.
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.env.COMPMATH_URL || "http://localhost:8765";
const SHOTS = process.argv[2] || null;
// The chapter's pages come from the specification's section list (js/data/curriculum/shelf.js).
global.window = {}; require("../../js/data/curriculum/shelf.js");
const SHELF = window.MATH_CURRICULUM_SHELF;
const CHAPTERS = SHELF.written.map(key => {
  const [bookId, chId] = key.split("/"), ch = SHELF.books.find(b => b.id === bookId).chapters.find(c => c.id === chId);
  const base = `#/preview/${bookId}/${chId.toLowerCase()}`, n = chId.split(".")[1];
  return { chId, n, pages: ["", ...ch.sections.map((_, i) => "/" + (i + 1)), "/close", "/review", "/challenge"].map(x => base + x),
    // AUTHORING-STANDARD §7: the only instructional labels, numbered by chapter.
    label: new RegExp(`^(?:(?:Example|Checkpoint|Practice Problem|Review Problem|Challenge Problem|Theorem|Corollary|Lemma|Definition|Figure) ${n}\\.\\d+\\.?|Recall)$`) };
});
const ONLY = process.env.CHAPTERS ? process.env.CHAPTERS.split(",") : null;   // e.g. CHAPTERS=G2.3,G2.4 to check some chapters only
const RUN = CHAPTERS.filter(c => !ONLY || ONLY.includes(c.chId));
const PAGES = [["#/preview", null], ...RUN.flatMap(c => c.pages.map(p => [p, c]))];
const fails = [];
const fail = m => { fails.push(m); console.log("FAIL", m); };

(async () => {
  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  // ---------- 1. rendering ----------
  const seen = {};   // "G2.3|Example 3.1" -> pages
  for (const width of [1280, 375]) for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.addInitScript(t => { try { localStorage.setItem("theme", t); } catch (e) {} }, theme);
    const pg = await ctx.newPage(); const errs = [];
    pg.on("pageerror", e => errs.push(e.message)); pg.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    for (const [p, chap] of PAGES) {
      await pg.goto(BASE + "/" + p); await pg.waitForSelector(".cp-root", { timeout: 20000 });
      await pg.waitForFunction(() => [...document.querySelectorAll("[data-cp-statement]")].every(e => !e.hidden), null, { timeout: 15000 }).catch(() => {});
      // Open every solution so that the figures and math inside them are checked too.
      await pg.evaluate(() => document.querySelectorAll(".cp-sol").forEach(e => { e.hidden = false; }));
      await pg.evaluate(() => window.renderMathInElement && document.querySelectorAll(".cp-sol").forEach(e => window.renderMathInElement(e, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false })));
      const r = await pg.evaluate(() => ({
        katex: document.querySelectorAll(".cp-root .katex-error").length,
        raw: [...document.querySelectorAll(".cp-root .lp-body p, .cp-root .lp-body li, .cp-root h1, .cp-root figcaption, .cp-root .cp-table td")].filter(e => /\$|\{\{|\[\[|__/.test(e.textContent)).map(e => e.textContent.slice(0, 50)),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        missing: [...document.querySelectorAll(".cp-root .prob-note")].filter(e => /Missing|\[[a-z]/.test(e.textContent)).length,
        hidden: [...document.querySelectorAll("[data-cp-statement]")].filter(e => e.hidden).length,
        labels: [...document.querySelectorAll(".cp-root .cp-k, .cp-root .lp-prob-n, .cp-root .cp-stmt-k, .cp-root .cp-fig-n")].map(e => e.textContent.trim()),
        smallest: Math.min(Infinity, ...[...document.querySelectorAll(".cp-fig svg text")].map(t => t.getBoundingClientRect().height).filter(h => h > 0)),
        wide: [...document.querySelectorAll(".cp-display")].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent.slice(0, 40)) }));
      const tag = `${width}/${theme} ${p}`;
      if (r.katex) fail(`${tag}: ${r.katex} KaTeX errors`);
      if (r.raw.length) fail(`${tag}: unrendered markup ${JSON.stringify(r.raw.slice(0, 3))}`);
      const bad = chap ? r.labels.filter(l => !chap.label.test(l)) : [];
      if (bad.length) fail(`${tag}: labels outside the standard vocabulary ${JSON.stringify(bad)}`);
      if (width === 375 && r.smallest < 11) fail(`${tag}: a figure label renders ${r.smallest.toFixed(1)} px tall on a phone`);
      if (chap) for (const l of r.labels) { if (l !== "Recall") { (seen[chap.chId + "|" + l] ||= new Set()).add(p); } }
      if (r.overflow) fail(`${tag}: horizontal overflow`);
      if (r.missing) fail(`${tag}: ${r.missing} missing figures or items`);
      if (r.hidden) fail(`${tag}: ${r.hidden} archive statements did not load`);
      if (r.wide.length) fail(`${tag}: display math wider than the column: ${JSON.stringify(r.wide)}`);
      if (SHOTS) await pg.screenshot({ path: `${SHOTS}/${width}-${theme}${p.replace(/[#/]+/g, "_")}.png`, fullPage: true });
    }
    if (errs.length) fail(`${width}/${theme}: page errors ${JSON.stringify(errs.slice(0, 3))}`);
    await ctx.close();
  }
  // Every label is used on one page only: numbering is unique through the chapter.
  for (const [l, pages] of Object.entries(seen)) if (pages.size > 1) fail(`label ${l} appears on ${[...pages].join(", ")}`);
  // Each chapter's counts (AUTHORING-STANDARD §11 gives the ranges; a chapter outside them says why in its packet).
  // G2.2, the approved prototype, is held to its ranges.
  for (const c of RUN) {
    const count = kind => Object.keys(seen).filter(l => l.startsWith(c.chId + "|" + kind + " ")).length;
    const kinds = ["Example", "Checkpoint", "Practice Problem", "Review Problem", "Challenge Problem"];
    if (c.chId === "G2.2") { const ranges = { "Practice Problem": [15, 20], "Review Problem": [12, 18], "Challenge Problem": [5, 8] };
      for (const [kind, [lo, hi]] of Object.entries(ranges)) if (count(kind) < lo || count(kind) > hi) fail(`G2.2: ${count(kind)} ${kind}s, outside ${lo}-${hi}`); }
    console.log(`${c.chId}: ${c.pages.length} pages; ` + kinds.map(k => `${count(k)} ${k}s`).join(", "));
  }
  console.log(`rendering checked: 2 widths x 2 themes x ${PAGES.length} pages`);

  // ---------- 2. interactions, persistence and isolation ----------
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  const pg = await ctx.newPage(); const errs = [];
  pg.on("pageerror", e => errs.push(e.message));
  await pg.goto(BASE + "/#/learn"); await pg.waitForTimeout(1500);
  await pg.evaluate(() => localStorage.setItem("mq-learn", JSON.stringify({ v: 1, read: { "L1.1": 1 }, checks: {}, problems: {} })));
  const legacyBefore = await pg.evaluate(() => localStorage.getItem("mq-learn"));
  const go = async h => { await pg.goto(BASE + "/" + h); await pg.waitForSelector(".cp-root", { timeout: 20000 }); await pg.waitForTimeout(800); };
  const answer = async (id, val) => { await pg.fill(`[data-cp-input="${id}"]`, val); await pg.press(`[data-cp-input="${id}"]`, "Enter"); await pg.waitForTimeout(200); };
  const state = id => pg.evaluate(id => {
    const res = document.querySelector(`[data-cp-result="${id}"]`), sol = document.querySelector(`[data-cp-sol="${id}"]`), btn = document.querySelector(`[data-cp-show="${id}"]`);
    return { cls: res.className, resHidden: res.hidden, solHidden: sol.hidden, showDisabled: btn.disabled, value: document.querySelector(`[data-cp-input="${id}"]`).value };
  }, id);
  await go("#/preview/geometry-2/g2.2/2");
  let s = await state("c-basic");
  if (!s.solHidden || !s.showDisabled) fail("the explanation is available before any attempt");
  await answer("c-basic", "7"); s = await state("c-basic");
  if (!/lc-wrong/.test(s.cls) || !s.solHidden || s.showDisabled) fail("a wrong answer is not marked, or the explanation opened by itself: " + JSON.stringify(s));
  await answer("c-basic", "8"); s = await state("c-basic");
  if (!/lc-right/.test(s.cls) || s.solHidden) fail("a right answer is not marked or its explanation is hidden: " + JSON.stringify(s));
  await answer("p-hmmt07", "2"); s = await state("p-hmmt07");
  if (!/lc-right/.test(s.cls) || s.solHidden) fail("the archive problem's answer is not accepted: " + JSON.stringify(s));
  await go("#/preview/geometry-2/g2.2/3");
  await answer("p-smt24", "√7/14"); s = await state("p-smt24");
  if (!/lc-right/.test(s.cls)) fail("the practice problem after the 2020 AMC 12B 10 example rejects √7/14");
  await answer("p-ahsme59", "c"); s = await state("p-ahsme59");
  if (!/lc-right/.test(s.cls)) fail("a multiple-choice letter answer (lower case) is not accepted");
  await answer("p-ahsme59", "D"); s = await state("p-ahsme59");
  if (!/lc-wrong/.test(s.cls)) fail("a wrong letter is accepted");
  await go("#/preview/geometry-2/g2.2/review");
  await answer("r6", "4sqrt(2)"); s = await state("r6");
  if (!/lc-right/.test(s.cls)) fail("review problem 6 rejects 4sqrt(2)");
  await pg.click('[data-cp-show="r1"]').catch(() => {});
  if (!(await state("r1")).solHidden) fail("a solution opened without an attempt");
  await go("#/preview/geometry-2/g2.2/2");
  s = await state("c-basic");
  if (s.value !== "8" || !/lc-right/.test(s.cls) || s.solHidden) fail("progress did not persist across reload: " + JSON.stringify(s));
  const stored = JSON.parse(await pg.evaluate(() => localStorage.getItem("mq-learn2")));
  if (!stored.checks["geometry-2/G2.2#c-basic"] || stored.checks["geometry-2/G2.2#c-basic"].ok !== true) fail("mq-learn2 lacks the checkpoint result");
  if (!stored.read["geometry-2/G2.2/2"]) fail("mq-learn2 lacks the page-read record");
  const legacyAfter = await pg.evaluate(() => localStorage.getItem("mq-learn"));
  if (legacyAfter !== legacyBefore) fail("the preview wrote to the live textbooks' mq-learn");
  // A shown solution can be hidden again, and stays hidden after a reload.
  await pg.click('[data-cp-show="c-basic"]'); s = await state("c-basic");
  if (!s.solHidden || await pg.textContent('[data-cp-show="c-basic"]') !== "Show Solution") fail("Hide Solution did not hide the solution");
  await go("#/preview/geometry-2/g2.2/2"); s = await state("c-basic");
  if (!s.solHidden) fail("a hidden solution reopened after reload");
  await pg.click('[data-cp-show="c-basic"]'); s = await state("c-basic");
  if (s.solHidden || await pg.textContent('[data-cp-show="c-basic"]') !== "Hide Solution") fail("Show Solution did not reopen the solution");
  // A conceptual checkpoint: a wrong choice is marked, the right one opens the solution.
  const pick = async (id, L) => { await pg.click(`[data-cp-pick="${id}"][data-choice="${L}"]`); await pg.waitForTimeout(200); };
  const cstate = id => pg.evaluate(id => ({ cls: document.querySelector(`[data-cp-result="${id}"]`).className, sol: document.querySelector(`[data-cp-sol="${id}"]`).hidden,
    wrong: [...document.querySelectorAll(`[data-cp-pick="${id}"].is-wrong`)].map(b => b.dataset.choice), right: [...document.querySelectorAll(`[data-cp-pick="${id}"].is-right`)].map(b => b.dataset.choice) }), id);
  await pick("ch-rotate", "A"); let c = await cstate("ch-rotate");
  if (!/lc-wrong/.test(c.cls) || !c.sol || c.wrong.join() !== "A") fail("a wrong choice is not marked: " + JSON.stringify(c));
  await pick("ch-rotate", "B"); c = await cstate("ch-rotate");
  if (!/lc-right/.test(c.cls) || c.sol || c.right.join() !== "B" || c.wrong.length) fail("the right choice is not marked: " + JSON.stringify(c));
  // A proof problem: Show Solution waits for a written attempt, and the text survives a reload.
  if (SHELF.written.includes("geometry-2/G2.3")) {
    await go("#/preview/geometry-2/g2.3/3");
    const dis = await pg.evaluate(() => document.querySelector('[data-cp-show="pp-trapezoid"]').disabled);
    if (!dis) fail("a proof's solution is available before anything is written");
    await pg.fill('[data-cp-proof="pp-trapezoid"]', "The base angles are equal."); await pg.waitForTimeout(600);
    await pg.click('[data-cp-show="pp-trapezoid"]'); await pg.waitForTimeout(200);
    if (await pg.evaluate(() => document.querySelector('[data-cp-sol="pp-trapezoid"]').hidden)) fail("a proof's solution did not open after writing");
    await go("#/preview/geometry-2/g2.3/3");
    const kept = await pg.evaluate(() => document.querySelector('[data-cp-proof="pp-trapezoid"]').value);
    if (kept !== "The base angles are equal.") fail("a written proof was not kept across reload: " + JSON.stringify(kept));
    await go("#/preview/geometry-2/g2.2/2");
  }
  // A cross-reference names its target and opens its page.
  // A statement is cited by its name, with its number as the link's title.
  const ref = await pg.evaluate(() => [...document.querySelectorAll(".cp-ref[title]")].map(a => [a.textContent, a.title]));
  if (!ref.some(([t, n]) => t === "intersecting chords theorem" && /^Theorem 2\.\d+$/.test(n))) fail("no named theorem reference on G2.2.2: " + JSON.stringify(ref));
  await go("#/preview/geometry-2/g2.2");
  const read = await pg.evaluate(() => document.querySelectorAll(".lb-chapter-page .cp-read").length);
  if (read < 1) fail("the chapter's contents shows no read marks");
  console.log("interactions, persistence and isolation checked");

  // ---------- 3. export and import ----------
  await pg.goto(BASE + "/#/settings"); await pg.waitForSelector(".progress-export", { timeout: 20000 });
  const [dl] = await Promise.all([pg.waitForEvent("download"), pg.click(".progress-export")]);
  const file = await dl.path(); const exported = JSON.parse(fs.readFileSync(file, "utf8"));
  const ex2 = exported.data && exported.data["mq-learn2"];
  const exObj = typeof ex2 === "string" ? JSON.parse(ex2) : ex2;
  if (!exObj || !exObj.checks || !exObj.checks["geometry-2/G2.2#c-basic"]) fail("Export does not carry mq-learn2");
  await pg.evaluate(() => localStorage.removeItem("mq-learn2"));
  await pg.setInputFiles(".progress-file", file);
  // The app asks first, in its own dialog; confirm, then the page reloads.
  await pg.waitForTimeout(500);
  const ok = pg.locator('[role="dialog"] button, dialog button, .modal button').filter({ hasText: /^Import$/ });
  await Promise.all([pg.waitForEvent("load", { timeout: 15000 }).catch(() => {}), ok.last().click()]);
  await pg.waitForTimeout(1500);
  const back = await pg.evaluate(() => localStorage.getItem("mq-learn2"));
  if (!back || !JSON.parse(back).checks["geometry-2/G2.2#c-basic"]) fail("Import did not restore mq-learn2");
  await go("#/preview/geometry-2/g2.2/2"); s = await state("c-basic");
  if (s.value !== "8") fail("the imported progress does not show on the page");
  console.log("export and import checked");

  // ---------- 4. legacy regressions ----------
  for (const h of ["#/learn", "#/learn/amc-geometry/s5/2", "#/practice", "#/", "#/f/power-of-a-point"]) {
    await pg.goto(BASE + "/" + h); await pg.waitForTimeout(2500);
    const r = await pg.evaluate(() => ({ preview: document.querySelectorAll('a[href^="#/preview"]').length, cp: document.querySelectorAll(".cp-root").length,
      katex: document.querySelectorAll(".katex-error").length, len: document.querySelector("#content, main")?.textContent.length || 0 }));
    if (r.preview || r.cp) fail(`${h}: links to or shows the preview`);
    if (r.len < 200) fail(`${h}: the page looks empty`);
  }
  await pg.goto(BASE + "/#/"); await pg.waitForTimeout(1500);
  const box = await pg.$("input[type=search], #search");
  if (box) {
    await box.fill("power of a point"); await pg.waitForTimeout(2000);
    const n = await pg.evaluate(() => document.querySelectorAll('a[href^="#/preview"]').length);
    if (n) fail("search results link to the preview");
  }
  if (errs.length) fail("page errors during interaction and legacy checks: " + JSON.stringify(errs.slice(0, 3)));
  console.log("legacy regressions checked");
  await browser.close();
  console.log(fails.length ? `${fails.length} failure(s)` : "ALL PREVIEW CHECKS PASSED");
  process.exit(fails.length ? 1 : 0);
})();
