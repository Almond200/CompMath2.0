// The new curriculum's preview (curriculum/PREVIEW-PLAN.md): the twelve-book shelf and the
// chapters written so far, at #/preview addresses that nothing in the normal interface links to.
// Loaded on demand with the "preview" asset group. Its pages use the live books' own markup and
// styles (the rail, the header bars, the lesson body, the problem box), so a new chapter reads as
// a CompMath textbook page. It owns its answer checking and its storage ("mq-learn2"), so the live
// textbooks' progress is untouched. From the app it uses only the read-only services in `kit`.
//
// The editorial conventions it implements are in curriculum/AUTHORING-STANDARD.md §7–§9:
// - One vocabulary for every chapter: Example, Checkpoint, Practice Problem, Review Problem,
//   Challenge Problem. (There is no partly worked category: worked Examples are followed by
//   independent problems of rising difficulty; owner, 2026-11-28.) Each is numbered through the chapter, by kind, in reading
//   order ("Example 2.3" is the chapter's third example), and a contest source is shown apart
//   from the label.
// - Theorem, Corollary and Definition statements share one counter ("Theorem 2.1",
//   "Definition 2.4"); a result recalled from an earlier chapter is a "Recall" block, unnumbered.
// - Figures are numbered "Figure 2.n". {{ref:id}} cites any of these by its label.
// - The chapter's pages come from the specification's section list, however many there are.
(function (root) {
  "use strict";
  const STORE = "mq-learn2";
  let curPage = "", linkedHere = new Set();
  let kit = null, chapter = null, chapterKey = null, bound = false, labels = {}, pageOfRef = {}, names = {}, book = null, chap = null;

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

  // ---------- the chapter's pages, from the specification ----------
  // The opening, one page per specified section, the close, then the two problem sets.
  const pagesOf = ch => ["", ...ch.sections.map((s, i) => String(i + 1)), "close", "review", "challenge"];
  const isSection = page => /^\d+$/.test(page);
  const chapterNum = ch => ch.id.split(".")[1];
  const hashFor = (b, ch, page) => `#/preview/${b.id}/${ch.id.toLowerCase()}${page ? "/" + page : ""}`;
  function chapterData(b, ch) { return (root.MATH_CURRICULUM || {})[b.id + "/" + ch.id] || null; }
  function pageInfo(data, ch, page) {
    if (!data) return page === "" ? { code: ch.id, title: ch.title, body: null } : null;
    if (page === "") return { code: "", title: "Introduction", body: data.opening.body };
    if (isSection(page)) {
      const s = ch.sections[+page - 1];
      return s && data.sections[s.id] ? { code: s.id, title: s.title, body: data.sections[s.id].body } : null;
    }
    // The close and the two problem sets follow the last section, numbered on from it (owner, 2026-11-28).
    const after = k => `${ch.id}.${ch.sections.length + k}`;
    if (page === "close") return { code: after(1), title: "Summary and next steps", body: data.close.body };
    if (page === "review" || page === "challenge") return data[page] ? { code: after(page === "review" ? 2 : 3), title: data[page].title, items: data[page].items } : null;
    return null;
  }

  // ---------- labels: every item, statement and figure numbered in reading order ----------
  const KIND = { checkpoint: "Checkpoint", example: "Example", practice: "Practice Problem", review: "Review Problem", challenge: "Challenge Problem" };
  const STATEMENT = { theorem: "Theorem", corollary: "Corollary", definition: "Definition", lemma: "Lemma" };
  function buildLabels(b, ch, data) {
    labels = {}; pageOfRef = {}; names = {};
    const n = chapterNum(ch), count = {};
    const next = kind => (count[kind] = (count[kind] || 0) + 1);
    const visit = (src, page) => {
      const re = /\{\{item:([\w-]+)\}\}|\{\{fig:([\w-]+)\}\}|^:::(theorem|corollary|definition|lemma)\s+([\w-]+)\s*(?:\|([^|\n]*))?(?:\|([^\n]*))?/gm;
      let m;
      while ((m = re.exec(String(src || "")))) {
        if (m[1]) item(m[1], page, null);
        else if (m[2]) { if (!labels["fig:" + m[2]]) { labels["fig:" + m[2]] = `Figure ${n}.${next("fig")}`; pageOfRef["fig:" + m[2]] = page; } }
        else {
          labels[m[4]] = `${STATEMENT[m[3]]} ${n}.${next("statement")}`; pageOfRef[m[4]] = page;
          names[m[4]] = (m[6] || m[5] || "").trim() || labels[m[4]];
        }
      }
    };
    const item = (id, page, set) => {
      const it = data.items[id];
      if (!it || labels[id]) return;
      const kind = set || it.kind;
      labels[id] = `${KIND[kind] || "Problem"} ${n}.${next(kind)}`; pageOfRef[id] = page;
      ["q", "problem", "solution"].forEach(f => visit(it[f], page));
    };
    pagesOf(ch).forEach(page => {
      const info = pageInfo(data, ch, page);
      if (!info) return;
      if (info.items) info.items.forEach(id => item(id, page, page));
      else visit(info.body, page);
    });
  }
  function refHtml(id) {
    const label = labels[id];
    if (!label) return `[${esc(id)}]`;
    const anchor = "cp-" + id.replace(/^fig:/, "fig-");
    // A theorem, corollary, lemma or definition is cited by its name, with its number on hover;
    // items and figures by their label.
    const named = names[id];
    // A statement's name is a link only while the result is new (owner, 2026-11-28): at its first
    // mention on a page, on the statement's own page and the next two. After that the reader has
    // used it enough, and the name is plain text.
    if (named) {
      const order = pagesOf(chap), at = order.indexOf(curPage), home = order.indexOf(pageOfRef[id]);
      const fresh = isSection(curPage) || curPage === "" ? at - home <= 2 : false;
      if (!fresh || linkedHere.has(id)) return `<span class="cp-name">${inline(named)}</span>`;
      linkedHere.add(id);
    }
    return `<a class="cp-ref" href="${hashFor(book, chap, pageOfRef[id])}" data-cp-anchor="${anchor}"${named ? ` title="${esc(label)}"` : ""}>${named ? inline(named) : esc(label)}</a>`;
  }

  // ---------- text ----------
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Bold (__text__), card links, cross-references and section links apply outside math only.
  function inline(src) {
    // Inline math keeps the punctuation that follows it on the same line.
    // Bold may contain math ("__The power of $E$.__"), so it is converted before the text is split on math.
    const glued = esc(src).replace(/__([\s\S]+?)__/g, "<strong>$1</strong>")
      .replace(/(\$[^$]+\$)([.,;:!?)]+)/g, (m, math, punct) => `\u0001${math}${punct}\u0002`);
    return glued.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/).map((part, i) => {
      if (i % 2) return part;
      return part
        .replace(/\{\{ref:([\w:-]+)\}\}/g, (m, id) => refHtml(id))
        .replace(/\[\[([a-z0-9-]+)\]\]/g, (m, id) => {
          const name = kit && kit.cardName(id);
          return name ? `<a class="card-link" href="#/f/${id}" data-card="${id}">${esc(name)}</a>` : m;
        })
        // "Section G2.2.3" links to that section's page when it is in this chapter.
        .replace(/\bSection ([A-Z]\d\.\d+)\.(\d+)\b/g, (m, c, s) => chap && c === chap.id && chap.sections[+s - 1]
          ? `<a class="cp-ref" href="${hashFor(book, chap, s)}">Section ${c}.${s}</a>` : m);
    }).join("").replace(/\u0001/g, '<span class="cp-nw">').replace(/\u0002/g, "</span>");
  }
  function figure(name) {
    const f = (root.MATH_CURRICULUM_FIGURES || {})[chapterKey] || {};
    const fig = f[name];
    if (!fig) return `<p class="prob-note">[Missing figure: ${esc(name)}]</p>`;
    const label = labels["fig:" + name];
    return `<figure class="cp-fig body-figure" id="cp-fig-${name}">${fig.svg}<figcaption>${label ? `<span class="cp-fig-n">${esc(label)}.</span> ` : ""}${inline(fig.caption || "")}</figcaption></figure>`;
  }
  // Blocks are separated by blank lines; a ":::kind id | Title" ... ":::" fence is one block
  // (a numbered statement), whatever blank lines it holds.
  function blocks(src) {
    const out = [], lines = String(src || "").split("\n");
    let cur = [], fence = null;
    const flush = () => { if (cur.length) out.push({ text: cur.join("\n") }); cur = []; };
    for (const line of lines) {
      const t = line.trim();
      if (fence) {
        if (t === ":::") { out.push({ fence, text: cur.join("\n") }); cur = []; fence = null; }
        else cur.push(line);
        continue;
      }
      const m = t.match(/^:::(theorem|corollary|definition|lemma|recall)\b\s*([\w-]*)\s*(?:\|\s*([^|]*?))?\s*(?:\|.*)?$/);
      if (m) { flush(); fence = { kind: m[1], id: m[2], title: m[3] || "" }; continue; }
      if (!t) flush(); else cur.push(line);
    }
    flush();
    if (fence) out.push({ fence, text: cur.join("\n") });
    return out;
  }
  function statementHtml(f, inner) {
    const head = f.kind === "recall" ? `<strong class="cp-stmt-k">Recall</strong>` : `<strong class="cp-stmt-k">${esc(labels[f.id] || STATEMENT[f.kind])}</strong>`;
    return `<div class="cp-stmt cp-stmt-${f.kind}"${f.id ? ` id="cp-${f.id}"` : ""}><p class="cp-stmt-h">${head}${f.title ? ` <span class="cp-stmt-t">${f.kind === "recall" ? inline(f.title) : `(${inline(f.title)})`}</span>` : ""}</p>${inner}</div>`;
  }
  function text(src) {
    return blocks(src).map(({ text: t, fence }) => {
      if (fence) return statementHtml(fence, text(t));
      const b = t.trim();
      let m;
      if (b.startsWith("### ")) return `<h5 class="try-sub body-sub">${inline(b.slice(4))}</h5>`;
      if ((m = b.match(/^\{\{fig:([\w-]+)\}\}$/))) return figure(m[1]);
      if ((m = b.match(/^\{\{item:([\w-]+)\}\}$/))) return itemHtml(m[1]);
      if (b.startsWith("$$") && b.endsWith("$$")) return `<div class="cp-display">${esc(b)}</div>`;
      const ls = b.split("\n").map(l => l.trim());
      if (ls.every(l => l.startsWith("|"))) {
        // A table: the first row is the header. It scrolls sideways by itself on a narrow screen.
        const cells = l => l.replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => inline(c.trim()));
        const [head, ...rows] = ls.filter(l => !/^\|[\s|:-]+\|$/.test(l)).map(cells);
        return `<div class="cp-table-wrap"><table class="cp-table"><thead><tr>${head.map(c => `<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      }
      if (ls.every(l => l.startsWith("- "))) return `<ul class="cp-list">${ls.map(l => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
      if (ls.every(l => /^\d+\. /.test(l))) return `<ol class="cp-list cp-steps">${ls.map(l => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
      return `<p>${inline(ls.join(" "))}</p>`;
    }).join("");
  }

  // ---------- checkpoints, examples and problems ----------
  // A checkpoint sits in the running text with a faint rule at its left; an example is a
  // subheading over its problem and solution; Practice, Review and Challenge Problems use the
  // books' problem box. Every answer is checked the same way, and every solution
  // opens under a hairline and can be hidden again.
  const answerKey = id => chapterKey + "#" + id;
  const solveLabel = open => open ? "Hide Solution" : "Show Solution";
  function isOpen(saved) { return saved.open === true || (saved.ok === true && saved.open !== false); }
  const resultHtml = res => res === "right" ? "<strong>Correct.</strong>"
    : res === "wrong" ? "<strong>Not correct yet.</strong> Check your work and try again, or show the solution." : "";
  function answerBlock(id, it) {
    const saved = progress().checks[answerKey(id)] || {};
    const open = isOpen(saved), res = saved.ok === true ? "right" : saved.a && saved.ok === false ? "wrong" : "";
    const show = `<button type="button" class="hp-btn hp-btn-soft cp-show${open ? " is-open" : ""}" data-cp-show="${id}" aria-expanded="${open}"${saved.a || open ? "" : " disabled"}>${solveLabel(open)}</button>`;
    // A proof problem has no answer to check: the student writes the argument, and the solution
    // becomes available once something is written (as in the live books' problems).
    if (it.proof) {
      return `<div class="cp-work cp-work-proof">
          <textarea class="cp-proof" rows="3" data-cp-proof="${id}" aria-label="Your proof for ${esc(labels[id] || "this problem")}" placeholder="Write your proof here.">${esc(saved.a || "")}</textarea>
          <span class="cp-btns">${show}</span>
        </div>
      <div class="lp-sol cp-sol" data-cp-sol="${id}"${open ? "" : " hidden"}><p class="lp-sol-title">Solution:</p>${text(it.solution)}</div>`;
    }
    const work = it.choices
      ? `<div class="cp-choices" role="group" aria-label="${esc(labels[id] || "Choices")}">${it.choices.map((c, i) => {
          const L = String.fromCharCode(65 + i), picked = saved.a === L;
          return `<button type="button" class="cp-choice${picked ? (saved.ok ? " is-right" : " is-wrong") : ""}" data-cp-pick="${id}" data-choice="${L}" aria-pressed="${picked}"><span class="cp-choice-l">${L}</span><span class="cp-choice-t">${inline(c)}</span></button>`;
        }).join("")}</div><div class="cp-work cp-work-choice">${show}</div>`
      : `<div class="cp-work">
          <input class="cp-input" type="text" inputmode="text" autocomplete="off" spellcheck="false" data-cp-input="${id}" aria-label="Your answer to ${esc(labels[id] || "this problem")}" value="${esc(saved.a || "")}" placeholder="Your answer">
          <span class="cp-btns"><button type="button" class="hp-btn cp-go" data-cp-check="${id}">Check</button>${show}</span>
        </div>`;
    return `${work}
      <p class="lc-result${res ? " lc-" + res : ""}" data-cp-result="${id}" role="status"${res ? "" : " hidden"}>${resultHtml(res)}</p>
      <div class="lp-sol cp-sol" data-cp-sol="${id}"${open ? "" : " hidden"}><p class="lp-sol-title">Solution:</p>${text(it.solution)}</div>`;
  }
  // A contest problem's statement, from the archive, and its source apart from the label.
  function sourceHtml(it) {
    if (!it.slug) return "";
    const p = kit && kit.problem(it.slug);
    return `<span class="cp-src">${p ? `<a href="#/problem/${p.slug}">${esc(p.ref)}</a>` : esc(it.slug)}</span>`;
  }
  function givenHtml(it) {
    if (it.problem) return text(it.problem);
    if (!it.slug) return "";
    const p = kit && kit.problem(it.slug);
    if (p && p.hasStatement) return `<section class="prob-st lp-st" data-cp-statement="${esc(it.slug)}" hidden><div class="prob-statement"></div></section>`;
    if (p && p.url) return `<p class="prob-note" data-statement-fallback><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Read the problem on the official archive</a></p>`;
    return `<p class="prob-note">The statement is not available in the app.</p>`;
  }
  function itemHtml(id) {
    const it = chapter.items[id];
    if (!it) return `<p class="prob-note">[Missing item: ${esc(id)}]</p>`;
    const label = esc(labels[id] || KIND[it.kind] || "Problem");
    if (it.kind === "checkpoint") {
      return `<div class="cp-try" id="cp-${id}"><p class="cp-try-h"><strong class="cp-k">${label}</strong></p>${text(it.q)}${answerBlock(id, it)}</div>`;
    }
    if (it.kind === "example") {
      return `<div class="cp-ex" id="cp-${id}"><h5 class="try-sub body-sub cp-ex-h"><span class="cp-k">${label}</span>${it.title ? ` <span class="cp-ex-t">${inline(it.title)}</span>` : ""}</h5>
        ${it.slug ? `<p class="cp-from">${sourceHtml(it)}</p>` : ""}
        <div class="cp-given">${givenHtml(it)}</div>
        <p class="lp-sol-title">Solution:</p>${text(it.solution)}</div>`;
    }
    const head = `<div class="lp-prob-head cp-prob-head"><span class="lp-prob-n">${label}</span>${sourceHtml(it)}</div>`;
    const prompt = it.prompt ? `<p class="cp-prompt">${inline(it.prompt)}</p>` : "";
    return `<div class="lp-prob cp-prob" id="cp-${id}">${head}${givenHtml(it)}${prompt}${answerBlock(id, it)}</div>`;
  }

  // ---------- the book view, as the live books draw it ----------
  const PAGE_KIND = { "": "Introduction", close: "Summary", review: "Problems", challenge: "Problems" };
  // Every page of the book in reading order: a written chapter's pages, or an unwritten chapter's one page.
  function bookPages(b) {
    const out = [];
    b.chapters.forEach(ch => {
      const data = chapterData(b, ch);
      (data ? pagesOf(ch) : [""]).forEach(page => { const info = pageInfo(data, ch, page); if (info) out.push({ ch, page, info }); });
    });
    return out;
  }
  const pageLabel = x => x.info.body === null && !x.info.items ? `${x.ch.id} ${x.ch.title}` : x.info.code ? `${x.info.code} ${x.info.title}` : `${x.ch.id} ${x.info.title}`;
  const plain = t => String(t).replace(/\$/g, "").replace(/\\[a-z]+/gi, "").replace(/[{}]/g, "");
  function arrow(b, x, dir) {
    const icon = kit.icon(dir < 0 ? "chevron-left" : "chevron-right");
    if (!x) return `<span class="bk-arrow is-off" aria-hidden="true">${icon}</span>`;
    const label = x.page === undefined ? `${x.ch.id} ${x.ch.title}` : pageLabel(x);
    return `<a class="bk-arrow" href="${hashFor(b, x.ch, x.page || "")}" aria-label="${dir < 0 ? "Previous" : "Next"}: ${esc(plain(label))}" title="${esc(plain(label))}">${icon}</a>`;
  }
  function railHtml(b, ch, pages) {
    const tab = c => {
      const ps = pages.filter(x => x.ch === c), cur = c === ch;
      return `<a class="bk-tab bk-scrub${cur ? " is-current" : ""}" href="${hashFor(b, c, "")}"${cur ? ' aria-current="page"' : ""}><span class="bk-tab-n">${esc(chapterNum(c))}</span><span class="bk-ticks" aria-hidden="true">${ps.map(x => `<i data-href="${hashFor(b, c, x.page)}"></i>`).join("")}</span><span class="bk-tip"><span class="bk-tip-ch">${esc(c.id)} ${esc(c.title)}</span>${ps.length > 1 ? ps.map((x, i) => `<span class="bk-tip-p" data-i="${i}" hidden>${esc(pageLabel(x))}</span>`).join("") : ""}</span></a>`;
    };
    return `<nav class="bk-rail" aria-label="Chapters">
        <a class="bk-tab bk-scrub" href="#/preview"><span class="bk-tab-n">C</span><span class="bk-ticks" aria-hidden="true"><i data-href="#/preview"></i></span><span class="bk-tip"><span class="bk-tip-ch">All new books</span></span></a>
        ${b.chapters.map(tab).join("")}
      </nav>`;
  }
  function shellHtml(b, ch, page, main) {
    const pages = bookPages(b), at = pages.findIndex(x => x.ch === ch && x.page === page);
    const here = pages[at], prev = pages[at - 1] || null, next = pages[at + 1] || null;
    const ci = b.chapters.indexOf(ch), pc = b.chapters[ci - 1], nc = b.chapters[ci + 1];
    const bar = (cls, label, title, l, r) => `<div class="bk-bar ${cls}"><span class="bk-bar-k">${label}</span>${title}<span class="bk-arrows">${l}${r}</span></div>`;
    const num = chapterNum(ch), unwritten = here.info.body === null && !here.info.items;
    const bar1 = bar("bk-bar1", `Chapter ${num}`, `<a class="bk-bar-t" href="${hashFor(b, ch, "")}">${esc(ch.title)}</a>`,
      arrow(b, pc && { ch: pc }, -1), arrow(b, nc && { ch: nc }, 1));
    const kind = unwritten ? "Chapter" : isSection(page) ? "Section" : PAGE_KIND[page];
    const bar2 = bar("bk-bar2", kind, `<span class="bk-bar-t">${esc(pageLabel(here))}</span>`, arrow(b, prev, -1), arrow(b, next, 1));
    const foot = (x, dir) => x ? `<a class="bk-foot-link bk-foot-${dir < 0 ? "prev" : "next"}" href="${hashFor(b, x.ch, x.page)}" aria-label="${dir < 0 ? "Previous" : "Next"}: ${esc(plain(pageLabel(x)))}">${dir < 0 ? `<span class="bk-foot-a">${kit.icon("chevron-left")}</span>` : ""}<span class="bk-foot-t">${esc(pageLabel(x))}</span>${dir > 0 ? `<span class="bk-foot-a">${kit.icon("chevron-right")}</span>` : ""}</a>` : "<span></span>";
    const where = unwritten ? "Not written yet" : isSection(page) ? `Section ${page} of ${ch.sections.length}` : here.info.title;
    const step = (x, dir) => x ? `<a class="bk-mnav-step" href="${hashFor(b, x.ch, x.page)}" aria-label="${dir < 0 ? "Previous" : "Next"} page">${kit.chevron(dir)}</a>` : `<span class="bk-mnav-step is-off" aria-hidden="true">${kit.chevron(dir)}</span>`;
    const mnav = `<nav class="bk-mnav" aria-label="Chapters and sections">
        <div class="bk-mnav-k"><span class="bk-mnav-book">${esc(b.title)}</span> &middot; Chapter ${num} &middot; ${esc(where)}</div>
        <div class="bk-mnav-row">${step(prev, -1)}
          <select class="bk-mnav-sel" data-cp-go aria-label="Go to a chapter or page">
            <option value="#/preview">All new books</option>
            ${b.chapters.map(c => `<optgroup label="Chapter ${esc(chapterNum(c))}: ${esc(c.title)}">${pages.filter(x => x.ch === c).map(x => `<option value="${hashFor(b, c, x.page)}"${x === here ? " selected" : ""}>${esc(plain(pageLabel(x)))}</option>`).join("")}</optgroup>`).join("")}
          </select>${step(next, 1)}</div>
      </nav>`;
    return `<div class="learn-page lesson-page bk-view cp-root cp-${b.id.replace(/-\d$/, "")}" data-chapter="${esc(b.id + "/" + ch.id)}">
        ${railHtml(b, ch, pages)}
        <div class="bk-body">
          ${mnav}
          <header class="bk-bars cp-bars"><div class="bk-bars-navigation">${bar1}${bar2}</div></header>
          <div class="lp-grid">
            <article class="lp-main">${main}<nav class="bk-foot">${foot(prev, -1)}<a class="bk-foot-top" href="#" data-bk-top>Back to top</a>${foot(next, 1)}</nav></article>
            <aside class="lp-drawer" aria-label="Card" hidden></aside>
          </div>
        </div>
      </div>`;
  }
  const note = `<p class="cp-note">A preview of the new textbooks, not yet released. Progress here is kept apart from the current books. <a href="#/preview">All new books</a></p>`;

  function shelfHtml(shelf) {
    const written = new Set(shelf.written || []);
    const books = shelf.books.map(b => `
          <li class="bk-toc-part"><h4>${esc(b.title)}: ${esc(b.subtitle || "")}</h4></li>
          ${b.chapters.map(c => written.has(b.id + "/" + c.id)
            ? `<li class="bk-toc-ch"><a class="bk-toc-chh" href="#/preview/${b.id}/${c.id.toLowerCase()}"><span class="lb-code">${esc(c.id)}</span><span class="bk-toc-t">${esc(c.title)}</span><span class="bk-toc-meta"><span class="lb-n">${c.sections.length} sections</span></span></a></li>`
            : `<li class="bk-toc-ch cp-unwritten"><a class="bk-toc-chh" href="#/preview/${b.id}/${c.id.toLowerCase()}"><span class="lb-code">${esc(c.id)}</span><span class="bk-toc-t">${esc(c.title)}</span><span class="bk-toc-meta"><span class="lb-soon">Not written yet</span></span></a></li>`).join("")}`).join("");
    return `<div class="learn-page bk-contents cp-root cp-shelf">
        <div class="back-row"><a class="back-link" href="#/learn">${kit.icon("arrow-left")} Learn</a></div>
        <h1 class="learn-h">The new textbooks</h1>
        ${note}
        <p class="learn-note">Twelve books in four subjects, three volumes each. Written chapters open as lessons; the others list the sections they will have.</p>
        <ol class="bk-toc">${books}</ol>
      </div>`;
  }
  function mainHtml(b, ch, page, info) {
    const num = chapterNum(ch);
    if (info.body === null && !info.items) {
      return `${note}<h1 class="learn-h"><span class="lb-code">${esc(ch.id)}</span> ${esc(ch.title)}</h1>
        <p class="learn-note">This chapter is not written yet. Its sections will be:</p>
        <ol class="lb-lessons lb-chapter-page">${ch.sections.map(s => `<li class="lb-lesson"><span class="lb-code">${esc(s.id)}</span><span class="lb-title">${esc(s.title)}</span></li>`).join("")}</ol>`;
    }
    if (page === "") {
      const read = progress().read;
      const rows = pagesOf(ch).slice(1).map(pg => {
        const x = pageInfo(chapter, ch, pg); if (!x) return "";
        return `<li class="lb-lesson"><a href="${hashFor(b, ch, pg)}"><span class="lb-code">${esc(x.code || "")}</span><span class="lb-title">${esc(x.title)}</span>${read[chapterKey + "/" + pg] ? '<span class="lb-n cp-read">Read</span>' : ""}</a></li>`;
      }).join("");
      return `${note}<header class="ch-open"><span class="ch-open-n">${esc(num)}</span><span class="ch-open-txt"><span class="ch-open-k">Chapter ${esc(num)}</span><span class="ch-open-t">${esc(ch.title)}</span></span></header>
        <div class="detail-body lp-body">${text(info.body)}</div>
        <h3 class="lp-h3">In this chapter</h3>
        <ol class="lb-lessons lb-chapter-page">${rows}</ol>`;
    }
    if (info.items) {
      // Review Problems are mixed: nothing says which section or method a problem needs (owner, 2026-11-28).
      const lead = page === "review" ? "Problems from the whole chapter." : "Harder problems that combine the chapter's ideas, in rising order of difficulty.";
      return `${note}<h1 class="learn-h">${esc(info.title)}</h1><p class="learn-note">${lead}</p>
        <div class="detail-body lp-body">${info.items.map(itemHtml).join("")}</div>`;
    }
    return `${note}<h1 class="learn-h">${info.code ? `<span class="lb-code">${esc(info.code)}</span> ` : ""}${esc(info.title)}</h1>
      <div class="detail-body lp-body">${text(info.body)}</div>`;
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
  let pendingAnchor = null;
  function render($content, hash, appKit) {
    kit = appKit;
    ensureStyles();
    if (!bound) bind();
    reload();
    const shelf = root.MATH_CURRICULUM_SHELF || { books: [] };
    const m = hash.match(/^#\/preview(?:\/([a-z0-9-]+)\/([a-z]\d\.\d+)(?:\/(\d+|close|review|challenge))?)?\/?$/);
    book = m && m[1] && shelf.books.find(b => b.id === m[1]);
    chap = book && book.chapters.find(c => c.id.toLowerCase() === m[2]);
    if (!chap) { $content.innerHTML = shelfHtml(shelf); typeset($content); return; }
    chapterKey = book.id + "/" + chap.id;
    chapter = chapterData(book, chap);
    const page = m[3] || "";
    const info = pageInfo(chapter, chap, page);
    if (!info) { location.replace(hashFor(book, chap, "")); return; }
    if (chapter) buildLabels(book, chap, chapter);
    curPage = page; linkedHere = new Set();
    $content.innerHTML = shellHtml(book, chap, page, mainHtml(book, chap, page, info));
    const art = $content.querySelector(".cp-root");
    kit.wireRail(art);
    art.querySelectorAll("[data-cp-statement]").forEach(el => kit.fillStatement(el.dataset.cpStatement, el));
    typeset(art);
    if (chapter) { progress().read[chapterKey + "/" + (page || "intro")] = Date.now(); save(); }
    const target = pendingAnchor && document.getElementById(pendingAnchor);
    pendingAnchor = null;
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
  function typeset(el) {
    if (root.renderMathInElement) root.renderMathInElement(el, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
      throwOnError: false, ignoredClasses: ["prob-statement"]
    });
  }

  // ---------- events: delegated listeners, acting only inside .cp-root ----------
  function record(id, a, art) {
    const it = chapter && chapter.items[id]; if (!it) return;
    // A contest multiple-choice answer given as a letter is compared as a letter; any other answer
    // through the shared exact comparison.
    const ok = it.choices ? a === it.answer
      : /^[A-E]$/.test(it.answer) ? a.trim().replace(/^\(|\)$/g, "").toUpperCase() === it.answer
      : !!(root.LearnAnswer && root.LearnAnswer.same(a, it.answer));
    const key = answerKey(id);
    progress().checks[key] = Object.assign({}, progress().checks[key], { a, ok });
    const res = art.querySelector(`[data-cp-result="${id}"]`);
    res.hidden = false;
    res.className = "lc-result lc-" + (ok ? "right" : "wrong");
    res.innerHTML = resultHtml(ok ? "right" : "wrong");
    art.querySelector(`[data-cp-show="${id}"]`).disabled = false;
    art.querySelectorAll(`[data-cp-pick="${id}"]`).forEach(btn => {
      const picked = btn.dataset.choice === a;
      btn.classList.toggle("is-right", picked && ok); btn.classList.toggle("is-wrong", picked && !ok);
      btn.setAttribute("aria-pressed", String(picked));
    });
    if (ok) setOpen(id, art, true); else save();
  }
  function check(id, art) {
    const input = art.querySelector(`[data-cp-input="${id}"]`);
    const a = input.value.trim(); if (!a) { input.focus(); return; }
    record(id, a, art);
  }
  // Opens or closes a solution; the choice is remembered with the answer.
  function setOpen(id, art, open) {
    const sol = art.querySelector(`[data-cp-sol="${id}"]`), btn = art.querySelector(`[data-cp-show="${id}"]`);
    if (!sol) return;
    sol.hidden = !open;
    if (open) typeset(sol);
    if (btn) { btn.textContent = solveLabel(open); btn.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open)); }
    const key = answerKey(id);
    progress().checks[key] = Object.assign({}, progress().checks[key], { open });
    save();
  }
  function bind() {
    bound = true;
    document.addEventListener("click", e => {
      const art = e.target.closest && e.target.closest(".cp-root"); if (!art) return;
      const c = e.target.closest("[data-cp-check]"), s = e.target.closest("[data-cp-show]"), p = e.target.closest("[data-cp-pick]");
      const ref = e.target.closest("a[data-cp-anchor]");
      if (c) check(c.dataset.cpCheck, art);
      else if (p) record(p.dataset.cpPick, p.dataset.choice, art);
      else if (s && !s.disabled) setOpen(s.dataset.cpShow, art, !s.classList.contains("is-open"));
      else if (ref) {
        // A cross-reference on the same page scrolls to its target; on another page it opens there.
        const el = document.getElementById(ref.dataset.cpAnchor);
        if (el && ref.getAttribute("href") === location.hash) { e.preventDefault(); el.scrollIntoView({ block: "start", behavior: "smooth" }); }
        else pendingAnchor = ref.dataset.cpAnchor;
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;
      const inp = e.target.closest && e.target.closest("[data-cp-input]"); if (!inp) return;
      const art = inp.closest(".cp-root"); if (!art) return;
      e.preventDefault(); check(inp.dataset.cpInput, art);
    });
    // A proof's text is kept as it is typed; Show Solution is available once it is not empty.
    let proofTimer = 0;
    document.addEventListener("input", e => {
      const box = e.target.closest && e.target.closest(".cp-root [data-cp-proof]"); if (!box) return;
      const id = box.dataset.cpProof, art = box.closest(".cp-root"), btn = art.querySelector(`[data-cp-show="${id}"]`);
      if (btn && !btn.classList.contains("is-open")) btn.disabled = !box.value.trim();
      box.style.height = "auto"; box.style.height = box.scrollHeight + "px";
      clearTimeout(proofTimer);
      proofTimer = setTimeout(() => {
        const key = answerKey(id);
        progress().checks[key] = Object.assign({}, progress().checks[key], { a: box.value });
        save();
      }, 300);
    });
    document.addEventListener("change", e => {
      const sel = e.target.closest && e.target.closest(".cp-root [data-cp-go]");
      if (sel) location.hash = sel.value;
    });
  }

  root.CurriculumPreview = { render, STORE };
})(window);
