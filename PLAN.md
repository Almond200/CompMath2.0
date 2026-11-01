# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". This file says what to do and in what order, and nothing else:
- how things are done: `CONVENTIONS.md` (§13 holds the rules that used to live here);
- what changed and when: the `README.md` changelog;
- approvals waiting on the owner: `QUESTIONS.md`;
- what each Learn book, chapter and lesson contains: `LEARN-OUTLINE.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state", add a README changelog entry, commit and push.

## Current state (updated 2026-11-01, nineteenth cloud chat, branch `claude/amazing-edison-3iloxy`)

- **Counts:** 765 cards (548 formulas, 169 methods, 48 patterns); 41 built-in lists; 4,675 problems, every one with a strategy, 4,229 citing at least one card; 4,665 with statements; 340 figures drawn for the app. Check with `$JSC tools/validate-problem-db.js`.
- **Reference and Practice:** finished (the earlier road ahead, steps A to I, R0, and the card renovation and proof pass). `QUESTIONS.md` has no card candidate open; the next is P54. Every problem is read and tagged, and every card has two practice problems.
- **On hold (owner, 2026-10-25):** Stage 5, moving the `lab/` pages (quiz, flashcards, formula web) into Practice (LQ9).
- **Learn, written:** nine books, all lessons written, every number computed.
  - **AIME track:** AIME Number Theory (N1 to N8), Algebra (A1 to A9), Counting & Probability (C1 to C9), Geometry (G1 to G9), and the AMC → AIME Bridge (B1 to B6).
  - **AMC track:** AMC Algebra (L1 to L14, second plan, done), Number Theory (M1 to M7 of the second plan, done), Counting & Probability (second plan R1 to R10: R1 written, the rest not yet), Geometry (S1 to S4, old). Chapters are marked Core or Core II, never AMC 10 or AMC 12.
  - **Lesson format (CONVENTIONS §14):** one flowing explanation with no subheadings, Related cards, the lesson's own problems with worked solutions, then Exercises (contest problems). The checks and the math keyboard were retired (the keyboard's code is kept unused).
- **The chapter structure is approved (owner, 2026-10-31, after the C5 pilot; CONVENTIONS §14):** X.1 Introduction as the chapter's opening page, the lessons, a Summary with Problem Solving Strategies, then Review Problems and Challenge Problems, numbered on from the Summary. C5 was the pilot (C5.1 Introduction, C5.2 to C5.7 lessons, C5.8 Summary, C5.9 Review Problems, C5.10 Challenge Problems). Step 2 below is under way: the whole AIME Counting & Probability book (C1 to C9) and AIME Number Theory (N1 to N8) and AIME Algebra (A1 to A9) and AIME Geometry (G1 to G9) are converted (eighteenth chat). Every other chapter still has the old overview page and chapter review.
- **The app's Learn surfaces:** the shelf of book covers; each book's contents (opening with Contents and Introduction and a How to Use This Book page); the book view (a chapter-tab rail whose tabs scrub through their pages, two title bars, Previous, Back to top, Next; on a phone a pinned row of previous, a chapter-and-page menu and next); the card drawer (a sheet on a phone, closed by swiping down); the AoPS-style problem list (Show Solution only once the box has text).
- **This chat's interface work, all done:** the home page redesigned; Settings regrouped, with defaults listed first, a forgiving search, and a preview of three screens at a time drawn by the pages' own code; list page tools; printing that typesets every card and hides screen-only controls; How this problem works with "+ Show" / "- Hide" and our own figures inside it; the phone layout (sticky top bar again, Reference menu, year picker, home order). The rules are in CONVENTIONS §13 and the README changelog has the detail.
- **A user's bug report, fixed (end of the seventeenth chat):** the three dialogs (Filters, Browse by tag, a space's "i") trap and return the keyboard focus, with `aria-modal` and `aria-pressed`; Import progress is all or nothing, with rollback and an accurate message; the answer parser caps ± signs; Quiz and Flashcards let a focused link or button handle Enter and Space and say when the browser is not saving; Flashcards' reset clears both directions, its empty session says why, its setup keeps the focus; the Formula Web's search picks a route's Start and End from the keyboard. Each finding was checked before it was fixed.
- **Labels and order (owner, eighteenth chat):** every Learn problem has a unique label (contest problems numbered on from a page's own problems; old reviews use N3.R.1), and lessons run our problems, solutions, then Exercises, while Review and Challenge Problems run our problems, contest problems, then solutions (owner, 2026-11-01; CONVENTIONS §14). Write new chapters to fit.
- **Lesson tags (owner, eighteenth chat):** every lesson of a converted chapter carries Core, Core II or Extension after its title in the outline (CONVENTIONS §14); give them as each chapter is converted.
- **Next action:** "The order of work" below: the quick changes are done (nineteenth chat); AMC Number Theory M6 and M7 are done; AMC Counting & Probability is being written (R1 to R4 done; R5 next, then R6 to R10), then AMC Geometry, then removing the Bridge.
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

### The order of work (owner, 2026-11-01)
1. **Quick changes (done, nineteenth chat):**
   - Page order: our problems, solutions, then contest problems (Exercises) on lessons and Introductions; on Review Problems and Challenge Problems only, our problems, contest problems, then solutions, so the problems sit together.
   - AIME books get part headings like the AMC books (Foundations, Core topics, Advanced topics, Beyond the AIME).
   - The contents page's "Contents and Introduction" gets the code C, like L1; the Contents link is not bold.
   - How to Use This Book becomes a real page in the book view (rail, header, title); the C tab's top three quarters are the contents, its bottom quarter How to Use This Book (owner, 2026-11-01), and it is a rounded square like the other tabs.
   - Lesson references in parentheses, such as "(L3.4)", are links to that lesson.
   - Book captions (roles) do not say "AMC 10 and 12".
   - Wording fixes from a reader: C5.1's string recursion needs its boundary case ($s_0 = 1$, decomposition for $n \ge 2$); L1.1 should say $\sqrt{x^2} = |x|$.
   - A Ptolemy key form for four points on a line.
   - **Study a concept more** (replaces L7): on a problem page, inside How this problem works, below the pattern, method and formula cards, a line "Study a concept more" with links named after the problem's cards, each going to the lesson that teaches that card (where one does). No "Practice more" link: anything worth practicing belongs in the textbook.
2. **The AMC books' second plan** (LEARN-OUTLINE.md, "The AMC books, second plan"): Algebra done; Number Theory done (M1 to M7); then Counting & Probability and Geometry, each written fresh chapter by chapter; then **remove the Bridge** (its section, files, id in `IDS`, cover).
3. **The olympiad books:** the draft is `drafts/olympiad-books.patch` (`git apply`; its edit to the chapter-letter class in `tools/build-learn-shelf.py` needs adjusting by hand).
4. **Practice: Create a contest (beta).** Under the Contests block on Practice, below A random problem: build a contest with a focus (subject, topic, contest, difficulty). Batches of exactly 3 problems; a time limit set by difficulty (about 30 to 45 minutes or less); one submission per problem; it ends when all three are answered or auto-submits when time runs out; then the problems can be reviewed and the result is saved under past contest results. The picker corrects for difficulty inflation across years. It will need finer problem tags later.
5. **Diagrams in the textbooks** (Venn diagrams for inclusion-exclusion, geometry figures, and so on), and **lessons in the main search**, ranked like problems: shown only on a very strong match, so they neither crowd the results nor never appear.
6. Proofreading every book: not started.

**On hold:** Stage 5 (the `lab/` quiz, flashcards and formula web into Practice), owner 2026-11-01: they lean toward memorizing facts, which the app is moving away from; leave them as they are.

**Later, only once the learning flow works:** personalized recommendations, adaptive mastery, AI-written feedback or problems, accounts or a server. Not planned now.

## Where things are

- Project: `/home/user/CompMath2.0` in the cloud session, on the branch the session names; on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and the gates in `tools/` (`./tools/gates.sh` runs them; the list is in `CLAUDE.md`).
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`) and https://competition-math-reference.vercel.app/.
- Helpers: `tools/learn-coverage.js` (the outline's coverage), `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/bump-versions.py --changed`, `tools/check-pages.js`, `tools/practice-scan.js`, `tools/show.js` (README, Structure).
- LIVE's concept tags are in `tools/live-cache/`. Use them as hints only.
- Plain writing goes ahead without asking. The owner is asked only about new cards, judgment calls in `QUESTIONS.md`, and real choices.
