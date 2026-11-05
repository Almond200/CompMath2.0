# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". This file says what to do and in what order, and nothing else:
- how things are done: `CONVENTIONS.md` (§13 holds the rules that used to live here);
- what changed and when: [the project changelog](CHANGELOG.md);
- approvals waiting on the owner: `QUESTIONS.md`;
- what each Learn book, chapter and lesson contains: `LEARN-OUTLINE.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state", add an entry to `CHANGELOG.md`, commit and push.

## Current state (updated 2026-11-04, branch `codex/work`; olympiad lessons are written from scratch, so read a finished chapter such as `olympiad-proofs/p3.js` as the model, and check every inequality numerically)

- **Practice sets:** a searchable topic picker generates locally saved sessions with one problem at a time, AMC A–E choices (double-click a selected choice to deselect) or an AIME integer field, review flags and automatic saving. Past practice sets appears below Contests. Practice headings use compact description spacing, and the numbered navigation uses centered, rounded buttons, with underlines for answered problems and translucent green/red review results. Both Back to Practice and Save and exit pause and save; Finish and review submits directly. Review uses the same navigator and preserves answers, strategies and study links. Results are self-checked: the corpus has no structured answer keys or full written solutions, so automatic grading remains a data task. The optional stopwatch is off by default in Settings and records only active time. Progress export/import includes saved sets, merging by ID and latest update.
- **Custom lists:** descriptions and LaTeX in add-card previews are available. Grouping is opt-in per list. New cards wait for Regroup. List and card pages share the Page tools setting.
- **Counts:** 765 cards (548 formulas, 169 methods, 48 patterns); 41 built-in lists; 4,675 problems, every one with a strategy, 4,229 citing at least one card; 4,665 with statements; 340 figures drawn for the app. Check with `$JSC tools/validate-problem-db.js`.
- **Reference and Practice:** finished (the earlier road ahead, steps A to I, R0, and the card renovation and proof pass). `QUESTIONS.md` has no card candidate open; the next is P54. Every problem is read and tagged, and every card has two practice problems.
- **On hold (owner, 2026-10-25):** Stage 5, moving the `lab/` pages (quiz, flashcards, formula web) into Practice (LQ9).
- **Learn, written:** all eight AMC and AIME books and four Olympiad books are complete; the Bridge was removed (2026-11-01), its lessons merged into the AMC books.
  - **AIME track:** AIME Number Theory (N1 to N8), Algebra (A1 to A9), Counting & Probability (C1 to C9), Geometry (G1 to G9). The Bridge (B1 to B6) is removed.
  - **AMC track:** AMC Algebra (L1 to L14, second plan, done), Number Theory (M1 to M7 of the second plan, done), Counting & Probability (second plan R1 to R10, done), Geometry (second plan S1 to S12, done). Chapters are marked Core or Core II, never AMC 10 or AMC 12, and no chapter or lesson title names the AMC 10 or AMC 12 (owner, 2026-11-01: "advanced", not "for the AMC 12").
  - **Olympiad track:** Proofs, Algebra, Number Theory and Combinatorics are complete. Geometry is complete through O7, Projective geometry.
  - **Lesson format (CONVENTIONS §14):** one flowing explanation with no subheadings, Related cards, the lesson's own problems with worked solutions, then Exercises (contest problems). The checks and the math keyboard were retired (the keyboard's code is kept unused).
- **The chapter structure is approved (owner, 2026-10-31, after the C5 pilot; CONVENTIONS §14):** X.1 Introduction as the chapter's opening page, the lessons, a Summary with Problem Solving Strategies, then Review Problems and Challenge Problems, numbered on from the Summary. C5 was the pilot (C5.1 Introduction, C5.2 to C5.7 lessons, C5.8 Summary, C5.9 Review Problems, C5.10 Challenge Problems). Step 2 below is under way: the whole AIME Counting & Probability book (C1 to C9) and AIME Number Theory (N1 to N8) and AIME Algebra (A1 to A9) and AIME Geometry (G1 to G9) are converted (eighteenth chat). Every other chapter still has the old overview page and chapter review.
- **The app's Learn surfaces:** the shelf of book covers; each book's contents (opening with Contents and Introduction and a How to Use This Book page); the book view (a chapter-tab rail whose tabs scrub through their pages, two title bars, Previous, Back to top, Next; on a phone a pinned row of previous, a chapter-and-page menu and next); the card drawer (a sheet on a phone, closed by swiping down); the AoPS-style problem list (Show Solution only once the box has text).
- **This chat's interface work, all done:** the home page redesigned; Settings regrouped, with defaults listed first, a forgiving search, and a preview of three screens at a time drawn by the pages' own code; list page tools; printing that typesets every card and hides screen-only controls; How this problem works with "+ Show" / "- Hide" and our own figures inside it; the phone layout (sticky top bar again, Reference menu, year picker, home order). The rules are in CONVENTIONS §13 and `CHANGELOG.md` has the detail.
- **A user's bug report, fixed (end of the seventeenth chat):** the three dialogs (Filters, Browse by tag, a space's "i") trap and return the keyboard focus, with `aria-modal` and `aria-pressed`; Import progress is all or nothing, with rollback and an accurate message; the answer parser caps ± signs; Quiz and Flashcards let a focused link or button handle Enter and Space and say when the browser is not saving; Flashcards' reset clears both directions, its empty session says why, its setup keeps the focus; the Formula Web's search picks a route's Start and End from the keyboard. Each finding was checked before it was fixed.
- **Labels and order (owner, eighteenth chat):** every Learn problem has a unique label (contest problems numbered on from a page's own problems; old reviews use N3.R.1), and lessons run our problems, solutions, then Exercises, while Review and Challenge Problems run our problems, contest problems, then solutions (owner, 2026-11-01; CONVENTIONS §14). Write new chapters to fit.
- **Lesson tags (owner, eighteenth chat):** every lesson of a converted chapter carries Core, Core II or Extension after its title in the outline (CONVENTIONS §14); give them as each chapter is converted.
- **Next action:** audit the books for mathematical accuracy, explanatory diagrams and current documentation.
- **For the owner to try now:** C5 as the model chapter (`#/learn/aime-counting/c5`), How to Use This Book from any book's contents, Settings with its preview and search, and the app on a phone.

## The road ahead: the Learn track

The model (the owner's blueprint, "Learn + Practice for Competition Math Reference"): **Reference** (the cards) stores the mathematics, **Learn** organizes how a student acquires it, and **Practice** is for solving problems on your own.

**Limits every step keeps (standing preferences):**
- no problem search, no in-app find, no hints, no level filter;
- one fact, one home: a lesson connects ideas and points to cards, and never restates a card;
- every number checked by computation;
- a lesson problem is chosen because its written route uses the lesson's cards, never because of tags alone or LIVE's concepts.

### Done (2026-10-31; `CHANGELOG.md` has the detail)
- **L0 to L4:** the plan trimmed; the owner's decisions (LQ1 to LQ10 in `QUESTIONS.md`); the shelf outline (`LEARN-OUTLINE.md`); the content model and addresses (CONVENTIONS §14); the Learn button and the Lists move.
- **L5, the shell:** routes `#/learn/<book>`, `.../how-to-use`, `.../<chapter>`, `.../<n>`, `.../review`, `.../challenge`; the gate `tools/check-learn.js` (run by `build-learn-shelf.py --check`, in `gates.sh`); progress in `mq-learn`, carried by Export and Import.
- **L6 and L9, the writing:** every planned book written. The owner's later decisions replaced parts of the first design: LQ5's typed checks and math keyboard were dropped for problems with worked solutions; the lesson standard became one flowing explanation; the chapter structure above replaced the overview page and chapter review.
- **L10, the home page:** redesigned twice; done.

### The order of work

1. **Complete the content.** Finish the textbooks, review the mathematics and worked solutions, and reconcile the outline, status notes and documentation with the app. Add diagrams where they explain a construction, reveal why a step works or make a relationship easier to see.
2. **Polish the experience.** Review search, navigation, readability and mobile usability across Learn, Formulas, Methods, Patterns and Practice. Follow real study paths between spaces, including a reader returning to an open solution or following a card to its lesson.
3. **Consider small study features.** Practice a topic now has locally saved sessions and a problem-by-problem review interface, with an optional stopwatch. Add verified structured answer keys before introducing automatic grading. Remaining possibilities include reviewing study history and sharing lists. Practice sets should help readers choose and work through problems at their own pace. Competitive contests, rankings and account systems are outside this roadmap.

The lab migration remains on hold. Lessons in search belong to the search review in phase two.

## Where things are

- Project: `/home/user/CompMath2.0` in the cloud session, on the branch the session names; on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and the gates in `tools/` (`./tools/gates.sh` runs them; the list is in `CLAUDE.md`).
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`) and https://competition-math-reference.vercel.app/.
- Helpers: `tools/learn-coverage.js` (the outline's coverage), `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/bump-versions.py --changed`, `tools/check-pages.js`, `tools/practice-scan.js`, `tools/show.js` (README, Structure).
- LIVE's concept tags are in `tools/live-cache/`. Use them as hints only.
- Plain writing goes ahead without asking. The owner is asked only about new cards, judgment calls in `QUESTIONS.md`, and real choices.
