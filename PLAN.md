# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". This file says what to do and in what order, and nothing else:
- how things are done: `CONVENTIONS.md` (§13 holds the rules that used to live here);
- what changed and when: the `README.md` changelog;
- approvals waiting on the owner: `QUESTIONS.md`;
- what each Learn book, chapter and lesson contains: `LEARN-OUTLINE.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state", add a README changelog entry, commit and push.

## Current state (updated 2026-10-31, sixteenth cloud chat, branch `claude/funny-keller-pvi190`)

- **Counts:** 765 cards (548 formulas, 169 methods, 48 patterns); 41 built-in lists; 4,675 problems, every one with a strategy, 4,229 citing at least one card; 4,665 with statements; 340 figures drawn for the app. Check with `$JSC tools/validate-problem-db.js`.
- **Finished:** the whole earlier road ahead (steps A to I, R0, and the card renovation and proof pass). `QUESTIONS.md` has no card candidate open; the next is P54 (P53, the sign of a permutation, was written 2026-10-30). Every problem has been read and tagged, and every card has two practice problems. The README changelog is the record. Both hosts are current (2026-10-30).
- **On hold (owner, 2026-10-25):** Stage 5, moving the `lab/` pages (quiz, flashcards, formula web) into Practice. It stays on hold until the owner has tried the pilot (LQ9).
- **Now:** the Learn track below. Step L0 is done (this file trimmed, the owner's blueprint turned into steps). L1 is done: the owner answered LQ1 to LQ10 (2026-10-31, `QUESTIONS.md`). L2 (the outline) is started in `LEARN-OUTLINE.md`: the shelf is a draft, and the pilot chapter (Modular Exponent Cycles) has its lessons and candidate problems.
- **Next action:** continue L2: read the strategies of the pilot chapter's candidate problems, then outline the rest of AIME Number Theory. **No app file changes until the owner says so (2026-10-31).**

## The road ahead: the Learn track (owner, 2026-10-31)

The source is the owner's blueprint, "Learn + Practice for Competition Math Reference" (revised). Its model: **Reference** (the cards) stores the mathematics, **Learn** organizes how a student acquires it, and **Practice** is for solving problems on your own. Learn has two parts: **Textbooks** (books, then chapters, then lessons) and **Lists** (the existing study lists, moved out of Practice). Lessons link the canonical cards and problems and never copy them. Exercises come from where they sit, not from separate modes: a short check right after an idea, harder problems at the end of each lesson, and a mixed set at the end of each chapter.

**The owner's order:** plan most of the books and lessons before anything is written or built. The home page waits until a few things are working (LQ2).

**Limits the blueprint must keep (standing preferences):**
- no problem search, no in-app find, no hints, no level filter (Lists keep their kinds, with no new filter);
- one fact, one home: a lesson's prose connects ideas and points to cards, and never restates a card;
- every number checked by computation;
- a lesson problem is chosen because its written route uses the lesson's cards, never because of tags alone or LIVE's concepts;
- feedback on a check comes only after the student answers, so it is not a hint.

### L0. Trim the plan (done 2026-10-31)
Finished-work history deleted (the README changelog has it). Rules that lived only here moved to CONVENTIONS §13. The blueprint turned into steps L1 to L10.

### L1. Owner decisions (done 2026-10-31; answers in `QUESTIONS.md`, LQ1 to LQ10)
- **LQ1, top bar:** Learn is a top-bar button between Patterns and Practice: Formulas, Methods, Patterns, Learn, Practice.
- **LQ2, home page:** left for later.
- **LQ3, Lists:** the study lists move to Learn → Lists, and Practice keeps a one-line link.
- **LQ4, shelf:** the five books.
- **LQ5, checks:** typed answers, entered with the app's own math keyboard.
- **LQ6, problem sets:** shown in an AoPS-style list, with Show Solution working only once something is written.
- **LQ7, progress:** saved in the existing Export and Import file.
- **LQ8 and LQ9:** the defaults for now; both are revisited when the owner tries the pilot.
- **LQ10, trial:** the owner tries it.

### L2. The shelf outline: planning only, no app files (started 2026-10-31)
Write `LEARN-OUTLINE.md`, book by book.
- **For a book:** its audience, what it assumes, and its chapters.
- **For a chapter:** the goal, 3 to 6 lessons, and a chapter-end set of contest problems that mixes the lessons and names no method.
- **For a lesson:**
  - the opening question;
  - the cards it assumes and the 1 to 3 cards it teaches (real ids);
  - the worked example (a contest problem or an authored one, its numbers checked);
  - 1 to 3 ideas for checks during the lesson;
  - 3 to 5 lesson-end problems.

Order of work:
1. The pilot chapter, Modular Exponent Cycles, in full. It is the model for the rest, so the owner approves it first.
2. The rest of the AIME Number Theory book.
3. The other books one at a time, with the owner reviewing each.

How problems are chosen:
- Find candidates with `node tools/practice-scan.js <card>` and `node tools/practice-card.js <card>`.
- Keep one only after reading its strategy and finding that the route uses the lesson's idea.
- One contest problem has one place on the shelf.
- AMC 10/12 twins count as one problem.

An idea that no card holds goes into `QUESTIONS.md` as the next P-number. Commit after each book.

### L3. The content model and addresses: a written spec, not built
Add a "Learn" section to CONVENTIONS. It covers:
- **Data:** one file per book in `js/data/learn/`. A book holds chapters, and each chapter holds `lessons` and `chapterProblems`. Each lesson holds its `prereqCards`, `cards`, `intro`, `example`, `checks` (authored, each with an answer in the keyboard's form and a short why), and `lessonProblems`.
- **Addresses:** `#/learn`, `#/learn/lists`, `#/learn/<book>`, `#/learn/<book>/<chapter>`, `#/learn/<book>/<chapter>/<lesson>`, and `#/learn/<book>/<chapter>/review`. `#/list/<id>` keeps working.
- **Answers:**
  - the set of keys on the math keyboard;
  - how an answer is stored (a plain expression such as `3/4`, `2sqrt(3)` or `7pi/2`);
  - how two answers are compared: by value, so $\frac{6}{8}$ and $\frac34$ both count. The rule for which unsimplified forms are accepted goes to the owner with the spec.
- **Progress:** a new `localStorage` key, saved in the existing Export and Import file with a version bump (CONVENTIONS §10). It holds the lessons read, the checks answered, the problems attempted, and the notes typed in each problem box. A viewed solution never counts as solved.
- **A gate,** `tools/check-learn.py`, which checks that:
  - every card, problem and list id resolves;
  - no problem appears twice on the shelf;
  - each lesson's cards were taught earlier or are listed among the cards it assumes;
  - every check has an answer the keyboard can type, and the answer parses;
  - the outline file and the data file agree.

  It joins `gates.sh`.

The owner approves the spec.

### L4. Learn navigation and the Lists move (build; after L3)
- A Learn button in the top bar, between Patterns and Practice. Its colour is new, green unless the owner says otherwise.
- A Learn page with Textbooks and Lists.
- The Study lists section moves there from Practice, and Practice keeps a one-line link to it.
- Every list keeps its id, name, contents and order, and old links and bookmarks still open.
- Back links: "Return to list" and "Return to lesson".
- Acceptance: no list disappears, `check-lists.py` passes, and every old address opens.

### L5. The textbook shell
- The library, book, chapter and lesson pages.
- A lesson page has a chapter outline, the reading column, and a card drawer that shows a card without leaving the lesson. On a phone the outline and drawer collapse.
- "Back to lesson" and "Practice more" keep the student's place.
- **The math keyboard:** a small on-screen keypad under an answer box, with digits, the operations, a fraction, a square root, powers, $\pi$, brackets and a minus sign. It shows the typeset answer as the student builds it, so nothing is ever typed in LaTeX. It must work on a phone.
- **The problem list:** in the style of an AoPS problem page, every problem is a block with:
  - its number and statement;
  - a box to "type your solution, notes and/or work here";
  - a Show Solution button.

  Show Solution stays disabled until the box has some text. It then shows the strategy and the card chain. These are always hidden before that, whatever Settings says about Strategy. There is no Hint link.
- Acceptance: one prototype lesson reads end to end with 0 KaTeX errors, no overflow at 375 px, light and dark; the keyboard works by touch and by mouse.

### L6. The pilot chapter written
- Modular Exponent Cycles, from the approved outline: the lessons' prose, worked examples, checks, lesson-end problems, and the chapter review.
- Every number checked by script.

### L7. Checks, problem sets and the two-way handoff
- Checks during a lesson, answered with the math keyboard, each checked by value and followed by one line of why.
- Lesson-end and chapter-end problems in the problem list from L5 (LQ6). Notes typed in the boxes are saved with progress (LQ7).
- At the end of a chapter, a "Practice more" link into Practice.
- On a problem page, "Study this in Learn" where a lesson covers the problem's key card.
- A missed review problem points back to the lesson or card it needs.
- One problem database: no new modes and no copied problems.

### L8. The owner tries the pilot
The owner tries it (LQ10). Then settle the sizes and the one-place rule (LQ8) and Stage 5 (LQ9) again, and revise the lesson template and the outline of the other books from what the owner finds.

### L9. Write the rest of the shelf
Write chapter by chapter from the approved outline. Commit each chapter, about every 25 problems placed, as the standing preference asks. Rebuild the search index at the end of the step if lessons become searchable (to be decided with L3).

### L10. The home page (later; owner, 2026-10-31)
The front page matters little for now, and it is settled once a few things are working (LQ2). Then, show the owner two or three mock-ups as screenshots, for example a Learn tile and a "Continue learning" panel, and which current panels stay. Nothing on the home page changes before the owner chooses.

**Later, only once the learning flow works (the blueprint's "wait" column):** personalized recommendations; adaptive mastery scores; AI-written feedback or problems; accounts or a server; whole books generated automatically. None of these is planned now.

## Where things are

- Project: `/home/user/CompMath2.0` in the cloud session, on the branch the session names; on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and the gates in `tools/` (`./tools/gates.sh` runs them; the list is in `CLAUDE.md`).
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`) and https://competition-math-reference.vercel.app/.
- Helpers: `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/bump-versions.py --changed`, `tools/check-pages.js`, `tools/practice-scan.js`, `tools/show.js` (README, Structure).
- LIVE's concept tags are in `tools/live-cache/`. Use them as hints only.
- Plain writing goes ahead without asking. The owner is asked only about new cards, judgment calls in `QUESTIONS.md`, and real choices.
