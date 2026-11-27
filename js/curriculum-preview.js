// The new curriculum's preview (curriculum/PREVIEW-PLAN.md): the twelve-book shelf and the
// chapters written so far, at #/preview addresses that nothing in the normal interface links to.
// Loaded on demand with the "preview" asset group. It owns its rendering, its answer checking and
// its storage ("mq-learn2"), so the live textbooks' pages, handlers and progress are untouched.
// From the app it uses only the read-only services in `kit` (problem lookup, statements, card
// names) and the shared LearnAnswer comparison (js/learn-answer.js).
(function (root) {
  "use strict";
  const STORE = "mq-learn2";
  const PAGES = ["", "1", "2", "3", "4", "5", "6", "close", "review", "challenge"];
  let kit = null, chapter = null, chapterKey = null, bound = false;

  // ---------- storage: one key, never overwritten if it cannot be read ----------
  let prog = null, progOk = true;
  function progress() {
    if (prog) return prog;
    let v = null;
    try { v = JSON.parse(localStorage.getItem(STORE) || "null"); } catch (e) { progOk = false; }
    prog = v && typeof v === "object" ? v : { v: 1 };
    ["read", "checks"].forEach(k => { if (!prog[k] || typeof prog[k] !== "object") prog[k] = {}; });
    return prog;
  }
  function save() {
    if (!progOk) return;
    try { localStorage.setItem(STORE, JSON.stringify(prog)); } catch (e) { if (kit) kit.storageFailed(); }
  }
  // An import (Settings) replaces the stored value; read it afresh on the next render.
  function reload() { prog = null; progOk = true; }

  // ---------- text ----------
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Bold (__text__) and card links apply outside math only; math is left for KaTeX.
  function inline(src) {
    // Inline math keeps the punctuation that follows it on the same line.
    const glued = esc(src).replace(/(\$[^$]+\$)([.,;:!?)]+)/g, (m, math, punct) => `\u0001${math}${punct}\u0002`);
    return glued.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/).map((part, i) => {
      if (i % 2) return part;
      return part
        .replace(/__([^_]+)__/g, "<strong>$1</strong>")
        .replace(/\[\[([a-z0-9-]+)\]\]/g, (m, id) => {
          const name = kit && kit.cardName(id);
          return name ? `<a class="card-link" href="#/f/${id}">${esc(name)}</a>` : m;
        });
    }).join("").replace(/\u0001/g, '<span class="cp-nw">').replace(/\u0002/g, "</span>");
  }
  function figure(name) {
    const f = (root.MATH_CURRICULUM_FIGURES || {})[chapterKey] || {};
    const fig = f[name];
    if (!fig) return `<p class="cp-soon">[Missing figure: ${esc(name)}]</p>`;
    const svg = typeof fig === "string" ? fig : fig.svg, cap = typeof fig === "string" ? "" : fig.caption;
    return `<figure class="cp-fig">${svg}${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
  }
  function text(src) {
    return String(src || "").split(/\n\s*\n/).map(block => {
      const b = block.trim();
      if (!b) return "";
      let m;
      if (b.startsWith("### ")) return `<h3>${inline(b.slice(4))}</h3>`;
      if ((m = b.match(/^\{\{fig:([\w-]+)\}\}$/))) return figure(m[1]);
      if ((m = b.match(/^\{\{item:([\w-]+)\}\}$/))) return itemHtml(m[1]);
      if (b.startsWith("$$") && b.endsWith("$$")) return `<div class="cp-display">${esc(b)}</div>`;
      const lines = b.split("\n").map(l => l.trim());
      if (lines.every(l => l.startsWith("- "))) return `<ul>${lines.map(l => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
      return `<p>${inline(lines.join(" "))}</p>`;
    }).join("");
  }

  // ---------- checkpoints, examples and problems ----------
  const answerKey = id => chapterKey + "#" + id;
  function answerBlock(id, it, label) {
    const saved = progress().checks[answerKey(id)] || {};
    const solved = saved.ok === true;
    return `<div class="cp-answer">
        <input type="text" inputmode="text" autocomplete="off" spellcheck="false" data-cp-input="${id}" aria-label="${esc(label || "Your answer")}" value="${esc(saved.a || "")}" placeholder="Your answer">
        <button type="button" class="cp-btn" data-cp-check="${id}">Check</button>
        <button type="button" class="cp-btn cp-btn-soft" data-cp-show="${id}"${saved.a ? "" : " disabled"}>${it.type === "check" ? "Show explanation" : "Show solution"}</button>
      </div>
      <div class="cp-result${solved ? " is-right" : ""}" data-cp-result="${id}"${solved ? "" : " hidden"}>${solved ? "<strong>Right.</strong>" : ""}</div>
      <div class="cp-sol" data-cp-sol="${id}"${solved ? "" : " hidden"}>${solutionHtml(id, it)}</div>`;
  }
  function solutionHtml(id, it) {
    if (it.type === "check") return `<div class="cp-text">${text(it.why)}</div>`;
    return `<p class="cp-sol-h">Solution</p><div class="cp-text">${text(it.solution)}</div>`;
  }
  function sourceHtml(it) {
    const p = kit && kit.problem(it.slug);
    if (!p) return `<span class="cp-box-src">${esc(it.slug)}</span>`;
    return `<span class="cp-box-src"><a href="#/problem/${p.slug}">${esc(p.short)}</a></span>`;
  }
  function statementHtml(it) {
    const p = kit && kit.problem(it.slug);
    if (p && p.hasStatement) return `<section class="cp-statement prob-st" data-cp-statement="${esc(it.slug)}" hidden><div class="prob-statement"></div></section>`;
    if (p && p.url) return `<p data-statement-fallback><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Read the problem on the official archive</a></p>`;
    return `<p class="cp-soon">The statement is not available in the app.</p>`;
  }
  function itemHtml(id) {
    const it = chapter.items[id];
    if (!it) return `<p class="cp-soon">[Missing item: ${esc(id)}]</p>`;
    if (it.type === "check") {
      return `<div class="cp-box cp-check" id="cp-${id}"><div class="cp-box-h"><span class="cp-tag">Checkpoint</span></div>
        <div class="cp-text cp-q">${text(it.q)}</div>${answerBlock(id, it)}</div>`;
    }
    if (it.type === "example") {
      return `<div class="cp-box" id="cp-${id}"><div class="cp-box-h"><span class="cp-tag">Example</span><span class="cp-box-title">${inline(it.title)}</span></div>
        <div class="cp-text">${text(it.body)}</div></div>`;
    }
    if (it.type === "exercise") {
      return `<div class="cp-box" id="cp-${id}"><div class="cp-box-h"><span class="cp-tag">Problem</span></div>
        <div class="cp-text cp-q">${text(it.q)}</div>${answerBlock(id, it)}</div>`;
    }
    if (it.type === "archive") {
      const head = `<div class="cp-box-h"><span class="cp-tag">${esc(it.role)}</span>${sourceHtml(it)}</div>${statementHtml(it)}`;
      if (it.worked) return `<div class="cp-box" id="cp-${id}">${head}<p class="cp-sol-h">Solution</p><div class="cp-text">${text(it.solution)}</div></div>`;
      const partial = it.partial ? `<div class="cp-partial cp-text">${text(it.partial)}</div>` : "";
      const prompt = it.prompt ? `<p class="cp-q">${esc(it.prompt)}</p>` : "";
      return `<div class="cp-box" id="cp-${id}">${head}${partial}${prompt}${answerBlock(id, it, it.prompt)}</div>`;
    }
    return "";
  }

  // ---------- pages ----------
  const SECTION_PAGES = ["1", "2", "3", "4", "5", "6"];
  function pageInfo(book, ch, page) {
    const secs = ch.sections;
    if (page === "") return { code: "", title: "Introduction", body: chapter.opening.body };
    if (SECTION_PAGES.includes(page)) { const s = secs[+page - 1]; return { code: s.id, title: s.title, body: chapter.sections[s.id].body }; }
    if (page === "close") return { code: "", title: "Summary and next steps", body: chapter.close.body };
    if (page === "review" || page === "challenge") {
      const set = chapter[page];
      return { code: "", title: set.title, body: set.items.map(id => `{{item:${id}}}`).join("\n\n") };
    }
    return null;
  }
  const hashFor = (book, ch, page) => `#/preview/${book.id}/${ch.id.toLowerCase()}${page ? "/" + page : ""}`;
  function tocHtml(book, ch, cur) {
    const read = progress().read;
    const rows = PAGES.map(pg => {
      const info = pageInfo(book, ch, pg); if (!info) return "";
      const key = chapterKey + "/" + (pg || "intro");
      return `<li><a href="${hashFor(book, ch, pg)}"${pg === cur ? ' aria-current="page"' : ""}><span class="cp-n">${esc(info.code)}</span><span>${esc(info.title)}</span>${read[key] ? '<span class="cp-done" aria-label="Read">Read</span>' : ""}</a></li>`;
    }).join("");
    return `<details class="cp-toc-wrap"${cur === "" ? " open" : ""}><summary>Chapter contents</summary><ol class="cp-toc">${rows}</ol></details>`;
  }
  function pagerHtml(book, ch, cur) {
    const i = PAGES.indexOf(cur);
    const link = (pg, cls, label) => { const info = pageInfo(book, ch, pg); return `<a class="${cls}" href="${hashFor(book, ch, pg)}"><small>${label}</small>${esc((info.code ? info.code + " " : "") + info.title)}</a>`; };
    return `<nav class="cp-pager" aria-label="Chapter pages">${i > 0 ? link(PAGES[i - 1], "cp-prev", "Previous") : "<span></span>"}${i < PAGES.length - 1 ? link(PAGES[i + 1], "cp-next", "Next") : "<span></span>"}</nav>`;
  }
  const banner = `<p class="cp-banner"><strong>Preview</strong> The new curriculum, not yet released. Progress here is stored separately from the current textbooks. <a href="#/preview">All books</a></p>`;

  function shelfHtml(shelf) {
    const written = new Set(shelf.written || []);
    const books = shelf.books.map(b => {
      const done = b.chapters.filter(c => written.has(b.id + "/" + c.id));
      return `<section class="cp-book"><h2>${esc(b.title)}</h2><p>${b.chapters.length} chapters · ${b.chapters.reduce((n, c) => n + c.sections.length, 0)} concept sections</p>
        <ul>${done.length ? done.map(c => `<li><a href="#/preview/${b.id}/${c.id.toLowerCase()}">${esc(c.id)} ${esc(c.title)}</a></li>`).join("") : '<li class="cp-soon">No chapter written yet</li>'}</ul></section>`;
    }).join("");
    return `<div class="cp-root">${banner}<h1>The new textbooks</h1><p class="cp-sub">Twelve books in four subjects, three volumes each. Only the chapters listed with links are written.</p><div class="cp-shelf">${books}</div></div>`;
  }

  // The stylesheet sits in index.html's inert template (so versioning tools see it) and is
  // attached the first time a preview page renders.
  function ensureStyles() {
    if (document.querySelector("link[data-preview-css-live]")) return;
    const tpl = document.getElementById("on-demand-scripts");
    const src = tpl && tpl.content.querySelector("link[data-preview-css]");
    if (!src) return;
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = src.getAttribute("href"); link.dataset.previewCssLive = "";
    document.head.appendChild(link);
  }
  function render($content, hash, appKit) {
    kit = appKit;
    ensureStyles();
    if (!bound) bind();
    reload();
    const shelf = root.MATH_CURRICULUM_SHELF || { books: [] };
    const m = hash.match(/^#\/preview(?:\/([a-z0-9-]+)\/([a-z]\d\.\d+)(?:\/(\d+|close|review|challenge))?)?\/?$/);
    if (!m || !m[1]) { $content.innerHTML = shelfHtml(shelf); return; }
    const book = shelf.books.find(b => b.id === m[1]);
    const ch = book && book.chapters.find(c => c.id.toLowerCase() === m[2]);
    chapterKey = book && ch ? book.id + "/" + ch.id : null;
    chapter = chapterKey ? (root.MATH_CURRICULUM || {})[chapterKey] : null;
    const page = m[3] || "";
    const info = chapter && pageInfo(book, ch, page);
    if (!info) {
      $content.innerHTML = `<div class="cp-root">${banner}<h1>Not written yet</h1><p class="cp-sub">This page of the new curriculum has not been written. <a href="#/preview">Back to all books</a></p></div>`;
      return;
    }
    const heading = page === "" ? `<span class="cp-code">${esc(ch.id)}</span> ${esc(chapter.title)}` : `${info.code ? `<span class="cp-code">${esc(info.code)}</span> ` : ""}${esc(info.title)}`;
    $content.innerHTML = `<article class="cp-root" data-chapter="${esc(chapterKey)}">${banner}
      <p class="cp-crumbs"><a href="#/preview">New textbooks</a> · ${esc(book.title)} · <a href="${hashFor(book, ch, "")}">${esc(ch.id)} ${esc(chapter.title)}</a></p>
      <h1>${heading}</h1>
      ${tocHtml(book, ch, page)}
      <div class="cp-text">${text(info.body)}</div>
      ${pagerHtml(book, ch, page)}
    </article>`;
    const art = $content.querySelector(".cp-root");
    art.querySelectorAll("[data-cp-statement]").forEach(el => kit.fillStatement(el.dataset.cpStatement, el));
    typeset(art);
    progress().read[chapterKey + "/" + (page || "intro")] = Date.now();
    save();
  }
  function typeset(el) {
    if (root.renderMathInElement) root.renderMathInElement(el, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
      throwOnError: false, ignoredClasses: ["prob-statement"]
    });
  }

  // ---------- events: one delegated listener, acting only inside .cp-root ----------
  function check(id, art) {
    const it = chapter && chapter.items[id]; if (!it) return;
    const input = art.querySelector(`[data-cp-input="${id}"]`), res = art.querySelector(`[data-cp-result="${id}"]`);
    const a = input.value.trim(); if (!a) { input.focus(); return; }
    const ok = !!(root.LearnAnswer && root.LearnAnswer.same(a, it.answer));
    progress().checks[answerKey(id)] = { a, ok }; save();
    res.hidden = false;
    res.className = "cp-result " + (ok ? "is-right" : "is-wrong");
    res.innerHTML = ok ? "<strong>Right.</strong>" : "<strong>Not quite.</strong> Check the setup and try again, or open the " + (it.type === "check" ? "explanation." : "solution.");
    art.querySelector(`[data-cp-show="${id}"]`).disabled = false;
    if (ok) show(id, art);
  }
  function show(id, art) {
    const sol = art.querySelector(`[data-cp-sol="${id}"]`);
    if (sol && sol.hidden) { sol.hidden = false; typeset(sol); }
  }
  function bind() {
    bound = true;
    document.addEventListener("click", e => {
      const art = e.target.closest && e.target.closest(".cp-root"); if (!art) return;
      const c = e.target.closest("[data-cp-check]"), s = e.target.closest("[data-cp-show]");
      if (c) check(c.dataset.cpCheck, art);
      else if (s && !s.disabled) show(s.dataset.cpShow, art);
    });
    document.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;
      const inp = e.target.closest && e.target.closest("[data-cp-input]"); if (!inp) return;
      const art = inp.closest(".cp-root"); if (!art) return;
      e.preventDefault(); check(inp.dataset.cpInput, art);
    });
  }

  root.CurriculumPreview = { render, STORE };
})(window);
