<!-- nav --> [Curriculum](README.md) · Preview plan

# Minimal plan: rendering the first chapter in a separate preview

**Status (2026-11-28): implemented for G2.2** on `claude/textbook-redesign`; checks in §5 are `tools/curriculum/check-preview.cjs`, `tools/curriculum/verify/g2_02.py`, `tools/curriculum/build-shelf.py --check` and `tools/curriculum/figures/g2_02.py --check`. One change from the plan: the preview has its own renderer and answer checking instead of reusing the live lesson renderer through a `LearnKit` object, so that no live handler, check or progress key is shared; it reuses only problem lookup, statement display and card names (`CURRICULUM_KIT` in `js/app.js`) and the pure `LearnAnswer` comparison. Bold in chapter text is written `__text__` because the convention gate forbids asterisk emphasis in data files.

**Goal.** Let the owner read G2.2 (Power of a Point) in the app, exactly as a learner would, before any further chapter is written. The live Learn experience, search, recommendations, the reference cards, the problem database, Practice and Arena are unchanged (D3, D12). Nothing here is implemented yet. The plan is the smallest change that renders one complete chapter and can grow into the full shelf without rework.

## 1. What is built

| Piece | File | Size | Notes |
|---|---|---|---|
| Preview shelf | `js/data/curriculum/shelf.js` | Generated | `window.MATH_CURRICULUM_SHELF`, built from `curriculum/data/index.json` by `tools/curriculum/build-shelf.py`: book IDs, chapter IDs, section IDs and titles, and a `written` flag. |
| First chapter | `js/data/curriculum/geometry-2/g2.02.js` | Hand-written | `window.MATH_CURRICULUM["geometry-2/G2.2"]`, in the shape in §2. |
| Preview module | `js/curriculum-preview.js` | New, about 300 lines | Owns the preview routes and the chapter layout. It is loaded **only** when a `#/preview` address is opened, so the normal start-up path does not change. |
| App hook | `js/app.js` | About 15 lines | (1) `#/preview…` addresses dispatch to the preview module. (2) A frozen object `window.LearnKit` exposes the existing lesson building blocks (`learnBodyHtml` prose rendering with KaTeX and `[[card]]` links, the check, exercise and solution components, and diagram rendering), so the preview reuses them rather than copying them. |
| Styles | `css/` (existing Learn styles) plus a few preview rules | Small | Same design language; no new visual system. |
| Versions | `index.html` inert template | — | New assets go in the inert on-demand template with `?v=` via `tools/bump-versions.py`. |

## 2. Chapter data shape

```js
window.MATH_CURRICULUM = window.MATH_CURRICULUM || {};
window.MATH_CURRICULUM["geometry-2/G2.2"] = {
  opening: { body: String.raw`...`, prereq: ["geometry-1/G1.7.4", "geometry-1/G1.7.2"] },
  sections: {
    "G2.2.1": { purpose: "recall", body: String.raw`...`, checks: [...], examples: [...], exercises: [...] },
    // ... G2.2.6, keyed by concept ID; titles come from the shelf
  },
  close: { body: String.raw`...`, cards: ["power-of-a-point", "tangent-facts", "chord-length"] },
  review: { exercises: [...], problems: [...] },     // our own problems, then archive slugs
  challenge: { problems: ["2001 AIME II, Problem 6", "..."] },
  placements: "curriculum/packets/G2.2.md"           // the source of every problem placement
};
```

- Bodies use the live lesson body format, so `LearnKit` renders them unchanged: paragraphs, `$…$`, `[[card]]` links, figures and subheadings.
- `examples` are worked examples with an optional `partial: true`. A partial example shows the setup and leaves the last step as a checkpoint whose answer is checked like a lesson check. This replaces hints: there is no hint text and no hint button (D4).
- Problem references are the same refs the live chapters use; answers come from the live keys.
- The opening and close are unnumbered pages; sections are numbered by concept ID (D4).

## 3. Routes

- `#/preview`: the new twelve-book shelf. Only G2.2 is linked; every other chapter shows "Not written yet".
- `#/preview/geometry-2/g2.2`: the chapter opening.
- `#/preview/geometry-2/g2.2/1` to `/6`: the concept sections.
- `#/preview/geometry-2/g2.2/close`, `/review` and `/challenge`: the close and the problem sets.

Nothing in the normal interface links to these routes. They are absent from the Learn landing page, the homepage, Special: commands, main search, book search, card pages, topic pages, recommendations and Statistics (D3). The owner opens them by typing or bookmarking the address. A small "Preview: not released" banner sits at the top of every preview page.

## 4. Progress

A separate store, `mq-learn2`, holds `read`, `checks` (keyed `geometry-2/G2.2.3#2`) and `problems` (by slug, read-only use of the shared slug space). It is added to `PROGRESS_KEYS` so Export and Import carry it. Nothing in the preview writes `mq-learn` or the shared activity history.

## 5. Validation before the owner reviews

1. `tools/curriculum/check-spec.py` and `build-curriculum.py --check --allow-edits` pass.
2. A new `tools/curriculum/check-chapter.cjs` checks the chapter data:
   - every section in the shelf has content;
   - every `[[card]]` is a real card;
   - every problem ref is in the database and matches its packet placement;
   - every check, exercise and partial example has an answer that parses, and a solution;
   - no hint fields exist.
3. Every number in the chapter is recomputed by script, and the record goes in the packet's §7.
4. All existing gates and regression suites pass unchanged, which shows the live experience is untouched.
5. Chromium, at 1280 and 375 px in light and dark: every preview page has 0 KaTeX errors and no overflow, and figures are inspected. A smoke check of the live Learn landing page, one live lesson, search and Practice shows no difference.

## 6. Order of work

1. Write the G2.2 manuscript from the packet: our own problems, the six sections, the close, Review and Challenge. **This is the only chapter written before the owner's review.**
2. Generate `shelf.js`, add the hook and `LearnKit`, write `curriculum-preview.js`, and add the progress store.
3. Write `check-chapter.cjs`, then run the validation in §5.
4. Open a pull request (not merged) whose description lists the preview addresses to open.

After the owner's review of G2.2 in the app, adjust the standard and the renderer, then continue with the other four pilots.
