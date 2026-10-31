# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". This file says what to do and in what order, and nothing else:
- how things are done: `CONVENTIONS.md` (§13 holds the rules that used to live here);
- what changed and when: the `README.md` changelog;
- approvals waiting on the owner: `QUESTIONS.md`;
- what each Learn book, chapter and lesson contains: `LEARN-OUTLINE.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state", add a README changelog entry, commit and push.

## Current state (updated 2026-10-31, eighteenth cloud chat, branch `claude/amazing-edison-3iloxy`)

- **Counts:** 765 cards (548 formulas, 169 methods, 48 patterns); 41 built-in lists; 4,675 problems, every one with a strategy, 4,229 citing at least one card; 4,665 with statements; 340 figures drawn for the app. Check with `$JSC tools/validate-problem-db.js`.
- **Reference and Practice:** finished (the earlier road ahead, steps A to I, R0, and the card renovation and proof pass). `QUESTIONS.md` has no card candidate open; the next is P54. Every problem is read and tagged, and every card has two practice problems.
- **On hold (owner, 2026-10-25):** Stage 5, moving the `lab/` pages (quiz, flashcards, formula web) into Practice (LQ9).
- **Learn, written:** nine books, all lessons written, every number computed.
  - **AIME track:** AIME Number Theory (N1 to N8), Algebra (A1 to A9), Counting & Probability (C1 to C9), Geometry (G1 to G9), and the AMC → AIME Bridge (B1 to B6).
  - **AMC track:** AMC Algebra (L1 to L8), Number Theory (M1 to M3), Counting & Probability (R1 to R3), Geometry (S1 to S4). Chapters are marked Core or Core II, never AMC 10 or AMC 12.
  - **Lesson format (CONVENTIONS §14):** one flowing explanation with no subheadings, Related cards, the lesson's own problems with worked solutions, then Exercises (contest problems). The checks and the math keyboard were retired (the keyboard's code is kept unused).
- **The chapter structure is approved (owner, 2026-10-31, after the C5 pilot; CONVENTIONS §14):** X.1 Introduction as the chapter's opening page, the lessons, a Summary with Problem Solving Strategies, then Review Problems and Challenge Problems, numbered on from the Summary. C5 was the pilot (C5.1 Introduction, C5.2 to C5.7 lessons, C5.8 Summary, C5.9 Review Problems, C5.10 Challenge Problems). Step 2 below is under way: the whole AIME Counting & Probability book (C1 to C9) and AIME Number Theory (N1 to N8) and AIME Algebra (A1 to A9) and AIME Geometry (G1 to G9) are converted (eighteenth chat). Every other chapter still has the old overview page and chapter review.
- **The app's Learn surfaces:** the shelf of book covers; each book's contents (opening with Contents and Introduction and a How to Use This Book page); the book view (a chapter-tab rail whose tabs scrub through their pages, two title bars, Previous, Back to top, Next; on a phone a pinned row of previous, a chapter-and-page menu and next); the card drawer (a sheet on a phone, closed by swiping down); the AoPS-style problem list (Show Solution only once the box has text).
- **This chat's interface work, all done:** the home page redesigned; Settings regrouped, with defaults listed first, a forgiving search, and a preview of three screens at a time drawn by the pages' own code; list page tools; printing that typesets every card and hides screen-only controls; How this problem works with "+ Show" / "- Hide" and our own figures inside it; the phone layout (sticky top bar again, Reference menu, year picker, home order). The rules are in CONVENTIONS §13 and the README changelog has the detail.
- **A user's bug report, fixed (end of the seventeenth chat):** the three dialogs (Filters, Browse by tag, a space's "i") trap and return the keyboard focus, with `aria-modal` and `aria-pressed`; Import progress is all or nothing, with rollback and an accurate message; the answer parser caps ± signs; Quiz and Flashcards let a focused link or button handle Enter and Space and say when the browser is not saving; Flashcards' reset clears both directions, its empty session says why, its setup keeps the focus; the Formula Web's search picks a route's Start and End from the keyboard. Each finding was checked before it was fixed.
- **Labels and order (owner, eighteenth chat):** every Learn problem has a unique label (contest problems numbered on from a page's own problems; old reviews use N3.R.1), and every page runs our problems, contest problems, then solutions (CONVENTIONS §14). Write new chapters to fit.
- **Lesson tags (owner, eighteenth chat):** every lesson of a converted chapter carries Core, Core II or Extension after its title in the outline (CONVENTIONS §14); give them as each chapter is converted.
- **Next action (eighteenth chat):** step 2, the AIME chapters in the approved structure, chapter by chapter, starting with the AIME Counting & Probability book. Done: the AIME Counting & Probability book, C1 to C9. Done also: AIME Number Theory, N1 to N8. Done also: AIME Algebra, A1 to A9. Step 2 is done (the Bridge was skipped: step 1 removes it). Next: step 1.2, AMC Number Theory M2 to M7 (AMC Algebra is complete; M1 written; the old AMC Number Theory chapters are deleted), then Counting & Probability and Geometry, then remove the Bridge (step 1.3). The Bridge is skipped: step 1 removes it. Step 1 (the AMC books' second plan) follows unless the owner reorders.
- **For the owner to try now:** C5 as the model chapter (`#/learn/aime-counting/c5`), How to Use This Book from any book's contents, Settings with its preview and search, and the app on a phone.

## The road ahead: the Learn track

The model (the owner's blueprint, "Learn + Practice for Competition Math Reference"): **Reference** (the cards) stores the mathematics, **Learn** organizes how a student acquires it, and **Practice** is for solving problems on your own.

**Limits every step keeps (standing preferences):**
- no problem search, no in-app find, no hints, no level filter;
- one fact, one home: a lesson connects ideas and points to cards, and never restates a card;
- every number checked by computation;
- a lesson problem is chosen because its written route uses the lesson's cards, never because of tags alone or LIVE's concepts.

### Done (2026-10-31; the README changelog has the detail)
- **L0 to L4:** the plan trimmed; the owner's decisions (LQ1 to LQ10 in `QUESTIONS.md`); the shelf outline (`LEARN-OUTLINE.md`); the content model and addresses (CONVENTIONS §14); the Learn button and the Lists move.
- **L5, the shell:** routes `#/learn/<book>`, `.../how-to-use`, `.../<chapter>`, `.../<n>`, `.../review`, `.../challenge`; the gate `tools/check-learn.js` (run by `build-learn-shelf.py --check`, in `gates.sh`); progress in `mq-learn`, carried by Export and Import.
- **L6 and L9, the writing:** every planned book written. The owner's later decisions replaced parts of the first design: LQ5's typed checks and math keyboard were dropped for problems with worked solutions; the lesson standard became one flowing explanation; the chapter structure above replaced the overview page and chapter review.
- **L10, the home page:** redesigned twice; done.

### 1. The AMC books' second plan (planned; LEARN-OUTLINE.md, "The AMC books, second plan")
The Bridge merged into four AMC books, each running Foundations, Core topics, Advanced topics, Toward the AIME, with Core, Core II or Extension on every chapter and every lesson, and every chapter in the approved chapter structure. Its implementation list, in order:
1. Tooling: parts and lesson tags in `build-learn-shelf.py`, two-digit chapter numbers, the contents page showing parts and lesson tags.
2. The books in turn, starting with Algebra, each written fresh chapter by chapter.
3. The Bridge removed once the last book replaces it.

### 2. The AIME chapters in the approved structure: done (eighteenth chat)
Every chapter of the four AIME books has an X.1 Introduction, a Summary with strategies, Review Problems and Challenge Problems, and a tag on every lesson; cross-references were renumbered. The Bridge was not converted, since step 1 removes it.

### 3. Still open from the first plan
- At the end of a chapter, a "Practice more" link into Practice; on a problem page, "Study this in Learn" where a lesson covers the problem's key card (L7; not built).
- The olympiad books: paused; the draft is `drafts/olympiad-books.patch` (`git apply`; its edit to the chapter-letter class in `tools/build-learn-shelf.py` needs adjusting by hand).
- Proofreading every book: not started.
- Stage 5, the `lab/` pages into Practice: on hold (LQ9).

**Later, only once the learning flow works:** personalized recommendations, adaptive mastery, AI-written feedback or problems, accounts or a server. Not planned now.

## Where things are

- Project: `/home/user/CompMath2.0` in the cloud session, on the branch the session names; on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and the gates in `tools/` (`./tools/gates.sh` runs them; the list is in `CLAUDE.md`).
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`) and https://competition-math-reference.vercel.app/.
- Helpers: `tools/learn-coverage.js` (the outline's coverage), `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/bump-versions.py --changed`, `tools/check-pages.js`, `tools/practice-scan.js`, `tools/show.js` (README, Structure).
- LIVE's concept tags are in `tools/live-cache/`. Use them as hints only.
- Plain writing goes ahead without asking. The owner is asked only about new cards, judgment calls in `QUESTIONS.md`, and real choices.
