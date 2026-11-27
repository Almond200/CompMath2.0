// Browser checks for the new curriculum's preview (curriculum/PREVIEW-PLAN.md §5).
//   CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/curriculum/check-preview.cjs [shotsDir]
// 1. Every page of G2.2 at 1280 and 375 px, light and dark: no KaTeX errors, no raw "$", no
//    horizontal overflow, no page or console errors, every figure and archive statement present.
// 2. Checkpoints, problems and partly worked examples: wrong and right answers, the solution only
//    after an attempt, persistence across reload, and no write to the live textbooks' "mq-learn".
// 3. Export carries "mq-learn2" and Import restores it.
// 4. Legacy regressions: the Learn page, a live lesson, search, Practice and the home page still
//    render without errors, and none of them links to #/preview.
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.env.COMPMATH_URL || "http://localhost:8765";
const SHOTS = process.argv[2] || null;
const PAGES = ["", "/1", "/2", "/3", "/4", "/5", "/6", "/close", "/review", "/challenge"];
const fails = [];
const fail = m => { fails.push(m); console.log("FAIL", m); };

(async () => {
  const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  // ---------- 1. rendering ----------
  for (const width of [1280, 375]) for (const theme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.addInitScript(t => { try { localStorage.setItem("theme", t); } catch (e) {} }, theme);
    const pg = await ctx.newPage(); const errs = [];
    pg.on("pageerror", e => errs.push(e.message)); pg.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    for (const p of ["#/preview", ...PAGES.map(x => "#/preview/geometry-2/g2.2" + x)]) {
      await pg.goto(BASE + "/" + p); await pg.waitForSelector(".cp-root", { timeout: 20000 });
      await pg.waitForFunction(() => [...document.querySelectorAll(".cp-statement")].every(e => !e.hidden), null, { timeout: 15000 }).catch(() => {});
      const r = await pg.evaluate(() => ({
        katex: document.querySelectorAll(".cp-root .katex-error").length,
        raw: [...document.querySelectorAll(".cp-root .cp-text p, .cp-root .cp-text li, .cp-root h1")].filter(e => /\$/.test(e.textContent)).length,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        missing: [...document.querySelectorAll(".cp-root .cp-soon")].filter(e => /Missing/.test(e.textContent)).length,
        hidden: [...document.querySelectorAll(".cp-statement")].filter(e => e.hidden).length,
        theme: document.documentElement.dataset.theme || "",
        figs: document.querySelectorAll(".cp-fig svg").length,
        wide: [...document.querySelectorAll(".cp-display")].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent.slice(0, 40)) }));
      const tag = `${width}/${theme} ${p}`;
      if (r.katex) fail(`${tag}: ${r.katex} KaTeX errors`);
      if (r.raw) fail(`${tag}: ${r.raw} blocks show a raw $`);
      if (r.overflow) fail(`${tag}: horizontal overflow`);
      if (r.missing) fail(`${tag}: ${r.missing} missing figures or items`);
      if (r.hidden) fail(`${tag}: ${r.hidden} archive statements did not load`);
      if (r.wide.length) fail(`${tag}: display math wider than the column: ${JSON.stringify(r.wide)}`);
      if (SHOTS) await pg.screenshot({ path: `${SHOTS}/${width}-${theme}${p.replace(/[#/]+/g, "_")}.png`, fullPage: true });
    }
    if (errs.length) fail(`${width}/${theme}: page errors ${JSON.stringify(errs.slice(0, 3))}`);
    await ctx.close();
  }
  console.log("rendering checked: 2 widths x 2 themes x 11 pages");

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
  if (!/is-wrong/.test(s.cls) || !s.solHidden || s.showDisabled) fail("a wrong answer is not marked, or the explanation opened by itself: " + JSON.stringify(s));
  await answer("c-basic", "8"); s = await state("c-basic");
  if (!/is-right/.test(s.cls) || s.solHidden) fail("a right answer is not marked or its explanation is hidden: " + JSON.stringify(s));
  await answer("p-hmmt07", "2"); s = await state("p-hmmt07");
  if (!/is-right/.test(s.cls) || s.solHidden) fail("the archive problem's answer is not accepted: " + JSON.stringify(s));
  await go("#/preview/geometry-2/g2.2/3");
  await answer("p-amc20b10", "√5/10"); s = await state("p-amc20b10");
  if (!/is-right/.test(s.cls)) fail("the partly worked example rejects √5/10");
  await go("#/preview/geometry-2/g2.2/review");
  await answer("r6", "4sqrt(2)"); s = await state("r6");
  if (!/is-right/.test(s.cls)) fail("review problem 6 rejects 4sqrt(2)");
  await pg.click('[data-cp-show="r1"]').catch(() => {});
  if (!(await state("r1")).solHidden) fail("a solution opened without an attempt");
  await go("#/preview/geometry-2/g2.2/2");
  s = await state("c-basic");
  if (s.value !== "8" || !/is-right/.test(s.cls) || s.solHidden) fail("progress did not persist across reload: " + JSON.stringify(s));
  const stored = JSON.parse(await pg.evaluate(() => localStorage.getItem("mq-learn2")));
  if (!stored.checks["geometry-2/G2.2#c-basic"] || stored.checks["geometry-2/G2.2#c-basic"].ok !== true) fail("mq-learn2 lacks the checkpoint result");
  if (!stored.read["geometry-2/G2.2/2"]) fail("mq-learn2 lacks the page-read record");
  const legacyAfter = await pg.evaluate(() => localStorage.getItem("mq-learn"));
  if (legacyAfter !== legacyBefore) fail("the preview wrote to the live textbooks' mq-learn");
  const tocRead = await pg.evaluate(() => [...document.querySelectorAll(".cp-toc .cp-done")].length);
  if (tocRead < 1) fail("the chapter contents shows no read marks");
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
