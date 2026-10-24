# Competition Math Reference: status and plan

**A new chat starts here.** Read "Current state", then "The road ahead". How things are done is in `CONVENTIONS.md`; what changed and when is in the `README.md` changelog; approvals waiting on the owner are in `QUESTIONS.md`.

**The handoff rule.** After every major change, every finished step, and the start of every new step: update "Current state" below, add a README changelog entry, commit and push. Credits can run out at any moment, so this block must always say exactly where the work stands and what the next action is.

## Current state (updated 2026-10-23, tenth cloud chat)

- **Counts:** 742 cards (539 formulas, 159 methods, 44 patterns), 37 lists. 4,675 problems, 4,616 with statements, 3,059 with strategies, 282 figures drawn for the app. Check with `$JSC tools/validate-problem-db.js` and `python3 tools/check-statements.py`.
- **Done this chat (2026-10-23):**
  - Settings: Card order is Curated or Most used; Formula lines and Keyword tags are under Reading the math; a Practice panel (Strategy: Shown or Click to show); Your progress (Export and Import of a versioned JSON file); a preview that shows every previewable setting, with a fourth problem-page screen.
  - Used by methods, Suggested by patterns and Related formulas are blue links with the hover preview. Practice lists AMC 8, AMC 10, AMC 12, AIME.
  - 23 new cards: Popoviciu, Vornicu–Schur, Cohn, Gauss–Lucas, Mason–Stothers, the rotated-line angle, spheres tangent to two planes, Lester, Droz-Farny, the anti-Steiner point, Kruskal–Katona, the pattern A Quadratic That Must Be a Perfect Square, and the eleven approved P16 to P26 (composing transformations, matrix powers, dimension arguments, trig series with $e^{i\theta}$, Independent Events, estimating, palindromes, counting shapes, fencepost counting, reading graphs, derivatives). Ramsey $R(3,3)$ removed (owner); its address opens the Pigeonhole Principle.
  - (2026-10-24) The search index was rebuilt again for 742 cards: 161/187 top-1, MRR 0.917.
  - The semantic search index is rebuilt in the cloud (Hugging Face reachable after the owner allowed its CDN hosts): 161/187 top-1, MRR 0.917, 738 cards.
  - Step D: 2022 AMC 12A and 12B, 2021 Spring AMC 12A and 12B, and 2020 AMC 12A finished, with figures. Brute-force checks must cover the whole range: on 2020 AMC 12A #21 a search capped at $10^6$ missed answers up to $1.8\times10^7$.
  - The markdown review the owner asked for is done: README, CONVENTIONS, PLAN, CONTRIBUTING, MIGRATION-NOTES and CLAUDE brought up to date; QUESTIONS has nothing open.
- **Settings (2026-10-24):** "Where I left off" removed from When the app opens (owner).
- **Next action:** R0 is done (errors fixed, two strategies, four method cards, the $r$th success, the Checking Your Work list). Resume D: 2022 AMC 12A and 12B, 2021 Spring AMC 12A and 12B, and 2020 AMC 12A are finished, 2020 AMC 12B, 2019 AMC 12A and 12B too; 2018 to 2008 AMC 12 are done; 2007 to 2002 AMC 12 are done; 2001 AMC 12 is begun; P27 waits in `QUESTIONS.md`. Continue with `node tools/untagged.js "AMC 12" 10 --full`. `node tools/near-twins.js` now finds reworded twins (6-letter-run score; 20 older ones are waiting, e.g. 2002 AMC 12A #1 = 10A #10): copy each when its paper comes up, running `node tools/near-twins.js "<paper>"` first; then the AMC 8. After both, the owner wants an error check of every existing tag (2025 AMC 10A #9 carried Cardano's formula), then LIVE-tag-guided labelling.
- **Nothing is open in `QUESTIONS.md`.** A new card candidate starts a table there as P27; the problem cites the nearest card meanwhile.
- **LIVE concept tags** for all 211 papers are in `tools/live-cache/<contest>-<year>.json` as `{n, concepts}`; hints only, never a source of tags.
- **Helpers:** `tools/gates.sh`, `tools/bump-versions.py --changed`, `tools/add-cards.py`, `tools/add-to-list.py`, `tools/add-tag.js`, `tools/check-pages.js`, `tools/near-twins.js`, `tools/show.js` (README, Structure).

## The road ahead, in order

**R0. Owner requests of 2026-10-24 (do first, in this order; tick each off here as it is done).**
1. ✅ (done 2026-10-24) *Verify, then fix, the reported card errors* (each claim checked by computation before editing; one fact, one home; the summary must agree with the write-up): Wald's identity (needs i.i.d. integrable $X_i$, $N$ a stopping time, $E[N]\lt\infty$; counterexample $X_i=B$, $N=1+B$); Basic Probability ("equally likely" applies only to the counting formula, not to union and complement); LGV box (identity matching beside the determinant); regions rule (a circle with $k\gt0$ crossings adds $k$ regions; no triple points); variance addition (independence sufficient, zero covariance enough); Graph Coloring (bipartite iff $\chi\le2$; Brooks needs connected); Fencepost (both ends with a short last gap: $\lceil L/d\rceil+1$; "8 Mondays"); Sprague–Grundy reverse statement; Cauchy worked example (positivity alone does not force $c^x$; use $f(1)^2=f(2)$); Matrix–Tree eigenvalue form needs connected; Vieta root gap ($\sqrt{\lvert\Delta\rvert}/\lvert a\rvert$ or real roots only); Menelaus unsigned converse; first-order recurrence classification ($r=-1$, $a_0=L$, $r=1,d=0$); Euler line parallel to a side (acute only, or directed heights); focal radii ($PF=\lvert y+p\rvert$; hyperbola latus rectum $c^2/a-a$); affine combinations of circle powers (real only when $r_t^2\ge0$); Lester explanation (Kiepert hyperbola claim, the second Fermat point near $60^\circ$).
2. ✅ (done 2026-10-24) *Strategies:* 2002 AIME I #3 (finish the subtraction: $36-8-3=25$), 2025 AMC 10B #21 (show the four classes and why the list is complete). "Why it works" that only quotes a result (Soddy–Gosset, Kruskal–Katona) is labelled as quoted, with a specific reference.
3. ✅ (done 2026-10-24) *New method cards the owner asked for* (owner's drafts; reshape as needed, no example copied between cards): Transforming Equations Without Losing Solutions (equivalent vs one-way steps, the zero case, sign restrictions, substitution ranges, parameters; holds the radical-equation routine: isolate, record signs, square, check, $\sqrt{x+2}=x$); Polynomial Long and Synthetic Division ($P=DQ+R$); Locating Quadratic Roots Without Solving (discriminant, Vieta, vertex, endpoint signs); Directed Lengths and Sign Checks (Menelaus vs the midpoints, an altitude foot on an extension, the power of an interior point). Add Waiting for the $r$th Success (negative binomial, $r/p$, trials vs failures) inside the existing waiting-for-success card, not as a new card. Link each from the cards that need it; a link supplements the correct conditions on those cards, never replaces them.
4. ✅ (2026-10-24: Checking Your Work added, and every curated list reviewed against the cards added since 2026-10-12; repeat after each new card batch with the check in the README entry of that date) *Lists:* keep `js/data/built-in-lists.js` current as cards are added, and add new lists where a theme now has enough cards (owner: the app keeps growing).
Then back to D (2020 AMC 12B next).

**F. Card renovation (owner, 2026-10-24; after D, D2, D3, merged with E).** Aim for two practice problems on every card (286 cards had neither a supplementary exercise nor a linked problem on 2026-10-24), alongside the full proofs of E.

**A. 2.7c: every symbol defined on its own card** (done 2026-10-18). Go through every card once, in file order, and make sure each variable a reader could find confusing is defined on the card itself: in the thumbnail, the description or the Key forms (the Arbelos card's $a$, $b$, $D$ are the model). Define symbols without restating a thumbnail formula in the description (`tools/find-duplicate-forms.py` should stay at its one known line, `parallel-sided-hexagon`). Commit every 25 to 30 cards.

**B. 2.4e-ii: prose formula boxes on card faces** (done 2026-10-18). Measure the boxes that are written as prose rather than formulas, propose rewrites in `QUESTIONS.md`, and apply them after the owner approves. A box that cannot be shortened stays as it is.

**C. The card-file re-check (general issues)** (done 2026-10-18). One more pass over the five card files and their write-ups for anything wrong: facts stated on two cards (one fact, one home), stale links, wrong importance or tier, examples that no longer fit, formatting that drifted from CONVENTIONS.

**D. Write-ups for every practice problem that has none (2.7b).** On 2026-10-23, 1,567 problems had no strategy: every AMC 10 and AIME problem is written, and 567 AMC 12, 650 AMC 8 and 350 AJHSME remain (`node tools/untagged.js "<contest>" 1` prints the count). Work through them by contest: **AMC 10 first, then AMC 12, then AMC 8**, newest paper first within each, with the per-problem routine below (tags for the best route, a strategy paragraph, an "Alternatively, ..." paragraph when a second good route exists, a figure for a geometry problem printed without one, every number checked by script). AMC 10 and AMC 12 share many problems: a shared problem gets the same entry in both. While doing this, check each tagged card's `topics` list (the chips on a problem page come from it): a card whose topics over-reach is fixed then by adding it to `CARD_TOPIC_STOP` in `js/app.js` (Rationalizing is the first entry: it no longer awards sequences or complex numbers). Commit every 8 to 10 problems. When the three contests are done, **stop and report to the owner** before going on.

**D2. The error check (owner, 2026-10-23).** After the AMC 12 and AMC 8, re-read every existing tag for errors like Cardano's formula on 2025 AMC 10A #9: a card the route does not use, a Lowest-importance card on an AMC problem, a strategy that names no card it tags. `tools/audit-problem-tags.py` is the starting point.

**D3. LIVE-guided labelling (owner, 2026-10-23).** Use LIVE's concept tags (`tools/live-cache/`) as hints to find problems a card should cite, and put any concept no card holds into `QUESTIONS.md` for approval. Tags still come from solving the problem.

**E. Stage R: proof depth.** Add more to the proofs: every card's "Why it works" gets a complete argument (lemma, steps, conclusion) wherever it is now a sketch or missing (rule 14; the P29 to P31 cards are format only and wait for this).

**Later (not scheduled):** Stage 5, moving the flashcards and the experimental features into Practice; per-contest lists, once enough problems are tagged.

## How the practice work is done

**Per problem, everything in one edit** (CONVENTIONS §11 has the full rules):
1. Re-solve it. Check the statement and its figures.
2. Tag the pattern, method and formulas of the best route, the specific card rather than the fact under it; name each card at the step that uses it, except a trivial fact such as the area of a circle (owner, 2026-10-17). Drop any tag the best route does not use.
3. Write the strategy, stating intermediate values and ending with the final step written out (never a bare "The answer is $x$."; for AMC problems name the choice letter). Add `trick`/`trickFormulas` ("Alternatively, ...") when a second good route exists.
4. Check every number, intermediate ones too, with a Python/sympy script (a fresh cloud container needs `pip install sympy scipy` first).
5. Draw a figure in `js/data/diagrams/problem-diagrams.js` for a geometry problem printed without one (setup only, an `ok` self-check, `MM(ok)` in the caption; 3D solids with `projector` and `solidEdges`).

**Tools.** `node tools/practice-scan.js <card>` lists a card's problems (VAGUE = still unchecked, or a strategy ending in a bare answer); `node tools/practice-card.js <card>` prints them in full; `node tools/practice-file.js <file>` gives a card file's counts; `node tools/card-text.js <file> <from> <to>` prints cards' thumbnails and descriptions (for step A). Write entries with `node tools/practice-set.js edits.json`, building the JSON from Python raw strings; no raw `<` (use `\lt`). Every batch: the gates (CLAUDE.md list), a browser check of the touched pages (`#/problem/<slug>` or `#/f/<id>`), bump `?v=` in `index.html` for each touched file and run `tools/sync-lab-versions.py`, update "Current state" and the README changelog, commit and push.

**Order inside a set of problems:** AMC 10 and AMC 12 first, then AMC 8, then HMMT, with AIME alongside the AMC 10/12 (owner, 2026-10-17).

**Decisions made in the practice pass (keep applying them):**
- commit only after every gate passes: chain the commit after the gates with `&&`, never `;` (a figure file that failed to load was committed once that way and fixed at once);
- a statement that is only about a triangle's angles or a trigonometric identity, with no construction, gets no figure (2013 AIME II #15, 2014 AIME II #12);
- a chord at a distance from the center cites `chord-length`, not `pythagorean-theorem`;
- AA similarity cites `triangle-similarity`; `similar-figures-ratios` is for scaling lengths, areas and volumes;
- a distance between points in space cites `distance-3d`; a 13-14-15 triangle cites `triangle-13-14-15`; a hexagonal row offset cites `equilateral-triangle-facts`;
- a problem given only in coordinates (2002 AIME II #2) or with nothing to picture beyond its answer gets no figure; 3D figures use `solidEdges` in `problem-diagrams.js`, which dashes hidden edges by ray casting;
- a fold cites the `folded-paper` pattern; a 45-45-90 diagonal cites `special-right-triangles`; grid distances cite `distance-midpoint`;
- lattice points on a circle cite `lattice-points-circle` (2000 AIME II #11 too); a product of chord pieces cites `power-of-a-point` (2010 AIME II #14 needs no Pythagoras);
- a strategy never holds a raw `<`: write `\lt`;
- verify every intermediate value written in a strategy, not just the answer (a wrong quadratic in 2004 AIME II #12 was caught this way);
- a dihedral angle cites the `dihedral-angle` method; an isosceles trapezoid cut by its altitudes cites the `isosceles-trapezoid` pattern; corner triangles similar by angles cite `triangle-similarity`, with `similar-figures-ratios` only for the area scaling;
- spheres in space that touch cite `triangle-of-centers` too (join the centers); `cross-section-method` only where one plane through an axis or the centers holds the whole picture; a sphere's outline in a 3D figure is drawn with `sphereOutline`, not a circle;
- before drawing a figure, check `PROB["<slug>"]` does not exist already (`check-statements.py` fails on a duplicate);
- `check-diagrams.py` fails when a figure's `ok` self-check prints MISMATCH (added 2026-10-18, after a figure with wrong leg lengths passed every gate);
- a cone's volume cites `prism-pyramid-volumes` (since 2026-10-18 `cone-formulas` no longer states it);
- a new helper used in `problem-diagrams.js` must be added to its `GEO_KIT` import list at the top (a missing `rotv` made the whole file fail to load on 2026-10-23; `check-diagrams.py` caught it);
- a card is tagged only where the route really uses it: the rotated-line card is not on 2023 AMC 10B #7, whose $35^\circ$ still needs the isosceles triangle (2026-10-23);
- a tag added to a shared AMC 10/12 problem goes on both twins (`node tools/add-tag.js <card> "<ref>"` does it).

## Blockers and caveats
- LIVE (`live.poshenloh.com`) is reachable from the cloud since 2026-10-23; the concept tags are in `tools/live-cache/`.
- The semantic search index is rebuilt in a cloud chat (it worked on 2026-10-23, once the owner allowed Hugging Face's CDN hosts): `python3 -m venv <scratchpad>/buildenv && <scratchpad>/buildenv/bin/pip install "model2vec[distill]==0.9.0"` (a few minutes), then `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt <scratchpad>/buildenv/bin/python tools/build-search-index.py --backend model2vec`. Test first with `curl -sI https://huggingface.co` and `curl -sI https://us.aws.cdn.hf.co` (the weights are served from `us.aws.cdn.hf.co` and the Xet hosts `cas-server.xethub.hf.co`; on 2026-10-23 those were refused while huggingface.co answered). Otherwise it is rebuilt on the Mac (`tools/build-search-index.py`; model2vec 0.9.0 distilling `BAAI/bge-base-en-v1.5`, 256 dimensions). The newest ~150 cards are found by lexical search only until then.


## Where things are

- Project: the clone `/home/user/CompMath2.0` in the cloud session, on the branch the session names (this chat: `claude/wizardly-lamport-8sfh7g`; before it `claude/serene-mayer-g7qu52`, `claude/hopeful-archimedes-eys74q`, `claude/intelligent-dirac-017xa3`, `claude/youthful-feynman-3uar1y`, `claude/zealous-keller-4gb8cj`, `claude/zen-wozniak-agipdc`, earlier: `claude/epic-curie-8tpif0`, `claude/inspiring-curie-svp5pr`); on the Mac, `~/Downloads/competition-math-reference`.
- Code and data: a static JS site with `js/app.js`, `css/styles.css`, data in `js/data/`, write-ups in `js/data/details/`, and gates in `tools/`.
- Published: https://almond200.github.io/CompMath2.0/ (repo `Almond200/CompMath2.0`). Served locally with `python3 -m http.server 8642`.
- Upload: GitHub Desktop on the Mac, or `git add -A && git commit && git push` here.
- Most steps are plain writing and go ahead without asking. The owner is asked only for new-card approval, judgment calls listed in `QUESTIONS.md`, and real choices.


---

## The philosophy

> **Formulas tell you what is true. Methods tell you what you can do. Patterns tell you what you are looking at. Problems teach you to connect the three.**
> Recognize → Choose → Use → Solve, that is, **Pattern → Method → Formula → Problem**.

| Kind | Question it answers | One card is | Test |
|---|---|---|---|
| **Formula** | What is true? | one fact (theorem, identity, definition, standard result) | something you **remember**; reads as reference with every example removed |
| **Method** | What can I do? | one reusable move | something you **do**; still makes sense with every equation removed |
| **Pattern** | What am I looking at? | one recurring problem archetype | you can say "this is a ___ problem" **before** solving it |
| **Problem** | Can I use it? | one contest problem | it is a real problem; its page shows Pattern → Method → Formulas |

How they connect: a pattern **suggests** methods, a method **uses** formulas, and problems are the evidence for all three (derived from problem tags). Every link is shown from both ends.

**What does not belong where:**
- A formula page never says "when you see X, do Y" (that is method content). Applications is one descriptive line.
- A method is never several unrelated techniques, and never a formula with a process attached.
- A pattern never contains the solution and never re-explains a method. It names clues and points to methods.
- A problem page shows the three connecting; it never teaches a theorem.

**The app's purpose:** it must be **explanatory, useful, and helpful**.
- Each card explains why the fact or move works, in teaching prose.
- It has a figure wherever a picture helps.
- It covers the idea with the depth and breadth it really has.
- Nothing redundant appears anywhere in the app (Stanley: "I don't want redundant things in this app").

### Standing rules for every card and every change
1. **Paragraphs begin with explanation, never with an example.** An example may be woven into the explanation after it has started.
2. **Explanatory first:** say what the thing is, why it holds, and when it matters. One idea per card; no card tries to be several things at once.
3. **Depth and breadth review:** while converting a card, check it for missing cases, variants, converses, and the places where it fails. Add them (Key forms, Useful observations, Full proof).
4. **Several forms per thumbnail when the card has several case forms.** Forms are separated by `\qquad` and stack in one `gathered` block.
5. **Diagrams where they help, and no diagram that shows less than the fact** (no bare triangle). Every geometry figure is rendered to a contact sheet and redrawn if weak. Figures carry `ok` self-checks.
6. **One tag, no redundancy:** a card shows its kind and one split-oval tag (tier left, importance right). Level text is never repeated beside it.
7. **Every number is verified by computation** before it is written. **Examples are never copied between cards.**
   - Two examples may use the same lengths (the 13-14-15 triangle, 3-4-5), as long as they ask a different question and show a different nuance.
   - A copied question with the same numbers is what is banned. *Amended 2026-10-12.*
   - The gate in `scan-conventions.py` fails only on shared numbers plus a near-copy question.
8. **Math typesets everywhere a card name appears.** Calculus uses an upright, thin-spaced differential, `\int A(h)\,\mathrm{d}h`.
9. **Mark every change in the markdown files:** a dated README changelog entry, CONVENTIONS updated wherever a rule changes, and memory (and this plan) updated.
10. A general method is never written as if it belonged to one pattern. A hyper-specific pattern may have a matching hyper-specific method.
11. **Nothing already established breaks:** every step ends with all gates at 0, a browser check, and a backup. Here the backup is a commit and push to the branch; on Stanley's Mac it is the rsync copy.
12. **Every new card gets an importance (and tier) judged on evidence:** problem tags and how often the idea is used. It is proposed to Stanley in a short table before the card is written, never assigned by feel. (N1 to N7 were approved and are written.)
13. **The Contest profile is a role, not an example.**
    - It says in words how the card shows up in contests and what it pairs with.
    - It never holds a worked example, a quoted sample problem, or a computed value (gate in `scan-conventions.py`).
    - Inline links follow the words: named results capitalized, one link per card at its first mention.
14. **Every claim a card makes is proved, or points to the card that proves it.** A Key form or a named corollary with no proof in Why it works is a gap; fill it with a complete argument (lemma, steps, conclusion). (The P29 to P31 cards are format only; their proofs wait for step R.)
15. **Break up big paragraphs of explanation** with centered display equations (own paragraph) and figures where they help. Use plain lead-ins ("Step 1, ..."), no markdown bold or italics.
16. **Importance has five values:** high, medium, low, lower (marginal use, once in ten years), lowest (confidently never used; completeness or beauty only).
17. **A card's thumbnail and description stand on their own** (from Stanley's reviews of 2026-10-11):
    - Every symbol in the thumbnail is defined there or in the description, not only in the write-up.
    - A formula that needs a hypothesis states it beside the formula (replacement or not, $ab > -1$, $N$ independent, $n \ge 2$, absolute value for an area).
    - Units are named when two counts could be confused.
    - No `\gg` or `\ll` for "at least 2 apart".
    - No keyword is repeated inside one card. No fact is stated in both the thumbnail and the description of the same card, or on two cards. (The keyword-repeat and tab gates are in `scan-conventions.py`; the rule is in CONVENTIONS.)
18. **Lines in figures run to where they meet, and extensions are dashed** *(new, 2026-10-12)*.
    - A line that passes through a point of the figure is drawn all the way to that point, never cut short and never far past it.
    - The part inside the triangle (or the main shape) is solid; the part extended outside is dashed, ending at the point it reaches.
    - A midline or a midpoint carries equal-segment tick marks so the reader can see what it is.
19. **Every batch of new cards is registered for `Special:NewCards`** *(new, 2026-10-12)*. Add it to `js/data/new-cards.js`, so the latest additions can be reviewed in the app.

---

## Decisions already made (do not reopen)
- Problem pages get a strategy paragraph, plus an "Alternatively, ..." paragraph when a second good route exists, with both routes' cards tagged. Full written solutions are deferred (2026-10-16). Geometry problems without a statement figure get a diagram.
- Tags come from solving each problem. LIVE's concepts are hints only, never a source of tags or text.
- Prose formula boxes are rewritten only after Stanley approves the list; a box that cannot be shortened stays as it is.
- Four kinds, four spaces (Formulas, Methods, Patterns, Practice). No hints in the UI. The problem box shows Pattern, Method, Formulas side by side.
- Contest tiers (AMC / AIME Early / AIME Late / Olympiad) go together with importance (High / Medium / Low / Lower / Lowest). Importance is judged inside the card's own subsection and shown with the tier as one split oval. No label setting; no level filter.
- One global filter; the sidebar counts follow it.
- **Problem statements and credits:**
  - Statements come from LIVE by Po-Shen Loh, credited to the MAA under CC BY-NC-SA, statements and figures only.
  - The two 2021 Fall AMC problems already in the app (10B #11, 12B #23) are credited to the AoPS Wiki.
  - The Fall 2021 AMC 10A and 10B problems imported from Stanley's PDFs are credited to the MAA AMC.
  - The AoPS Wiki cannot be fetched (Cloudflare).
  - Problem figures fit one 420 by 280 box.
- The number beside a contest counts only problems with text. Contests still to come are hidden until Show unwritten contests is pressed. No proof-based competitions for now.
- Examples are never copied between cards (same lengths allowed when the nuance differs). Paragraphs begin with explanation.
- Shapes are filed as **reference formula cards** (Polygons & Quadrilaterals, Solid Geometry (3D), Ratios & Constants to Memorize), not as pattern cards. There is no "Common Figures" pattern group. One fact, one home.
- Things in LIVE that the app lacks are listed in `tools/live-missing.md` and **wait for Stanley's approval**.
- Problem search and the in-app find are deleted for good; never add either back.
- The new-cards command is `Special:NewCards` (`Special:Recent` keeps meaning "recently opened").

## Housekeeping after every step
- **Gates:**
  - `scan-conventions.py`, `check-topics.py`, `check-lists.py`, `check-labels.py`, `check-diagrams.py`, `check-statements.py`;
  - `sh tools/check-lab.sh`;
  - `tools/validate-problem-db.js` (jsc, or here the Node shim);
  - the card-search eval after content or tag changes.
- **Search index:** rebuild it with `tools/build-search-index.py` after card changes: in the cloud with the venv in Blockers, on the Mac with the `~/Downloads/competition-math-buildenv` python. Then run the eval (`tools/search-eval.html`, at least 160/187) and confirm `MathSemantic.info().cards` is the card count.
- **Versions:** bump `?v=` on every touched asset (`python3 tools/bump-versions.py --changed` here; `conv/bump.py` on the Mac), and bump `STATEMENTS_V` when statement files change.
- **Gates in one command:** `./tools/gates.sh` (all but `check-labels.py`, which takes minutes; run it after figure changes).
- **Browser check** of every touched page: 0 KaTeX errors, no overflow, light and dark (`node tools/check-pages.js '#/f/<id>' ...`).
- **Markdown:** README changelog entry, CONVENTIONS where a rule changes, CONTRIBUTING where the workflow changes, the memory files, and this plan (`PLAN.md`).
- **Backup:** commit and `git push -u origin <the session's branch>` here. On the Mac, `rsync` to `~/Documents/CompMath-backup/` (done by `conv/gates.sh`).
- **Never** edit a source file with a slice-and-replace that was not checked afterwards. On 2026-10-11 a mis-sliced edit to `js/app.js` deleted a block. Check syntax (`node --check`, `new Function(text)`, or `jsc`) after any large edit.

---

# Appendix: finished work

The full record is the README changelog; this is the summary of what each step delivered.

## Finished steps, by date

**Earlier (2026-10-11)**
- [x] Formula conversion: 480 of 486 formula cards. Three keep the old template on purpose (Stanley: fine as they are): Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians.
- [x] Brocard's Theorem; the five-level importance scale (Lowest: Cardano, Morley, Ramsey $R(3,3)$); landing-page settings and command suggestions.
- [x] Problem text for every AMC 8, AMC 10, AMC 12, and AIME problem from LIVE, with:
  - every display fix;
  - the Contests box (planned contests hidden behind Show unwritten contests);
  - GitHub upload instructions.
- [x] Study lists: 8 new lists, additive AIME and Olympiad routes, MATHCOUNTS routes removed, the Functions & Symmetry list.
- [x] New cards N1 to N7:
  - Vector Bashing;
  - Distance Between Parallel Lines (its form moved off Point-to-Line Distance);
  - Writing a Function's Symmetry as an Equation;
  - Odd and Even Functions;
  - Properties of Inverse Functions;
  - Tangent Lines from a Point;
  - Minimizing a Slope.

  Each has a verified example, a figure, a route placement, aliases, and connected-formula rows where natural.
- [x] Pick's Theorem on a Triangular Grid merged into Pick's Theorem on Any Lattice, as a worked example in its explanation (the old id redirects).
- [x] The 2021 Spring/Fall AMC split. Spring is renamed; Fall A and B are added as sittings with all 25 numbers. Fall 2021 AMC 10A and 10B text and figures were imported from Stanley's PDFs (`tools/manual_statements.py`; credit to the MAA, source a PDF copy).
- [x] **Figure audit (2.3):** all 853 problem figures checked.
  - That is 710 statement figures and 144 choice pictures, checked on contact sheets and by a load test.
  - None was wrong, cropped, or blank.
  - One fix: thin strips may run up to 600 px wide.
  - The old LIVE PNGs are soft because the sources are low resolution.
- [x] **Methods and patterns rewrite (2.2):**
  - The anatomy is written into CONVENTIONS, with 3 pilots.
  - All 30 patterns and 135 methods were audited, with no splits.
  - Both of Stanley's approvals are given (the Same Remainder merge, the six LIVE-concept cards). They are scheduled in 2.4b.
  - The practice-problem scan found no other recurring missing idea.
- [x] Dark mode softening (Stanley's list of 9 items, plus item 10). Dark-only tokens `--text-head` and `--text-table`; light mode is unchanged. Stanley: dark mode is done (`css/styles.css` v248).
- [x] **UI scan, first pass:**
  - All 656 card pages at 1280 light and at 375; 201 other routes at 375; popups at 375.
  - Four phone overflows fixed (the Descartes sphere key form, the arctan example, the mass-points hint, the table wrapper).
  - `tools/ui-scan.js` is kept as the reusable scanner.
- [x] The 13-14-15 card fixed (four literal tabs became `\tfrac`), with a scanner gate so a tab in any `js/data` file fails.
- [x] Problem search deleted and the in-app Ctrl/Cmd+F find removed (Stanley: never add either back).
- [x] Figure reference cards (2A): shapes filed as reference formula cards (table below). The Formula lines setting was added (Settings: 1, 2, 3, All; default 1).
- [x] Inradius Formula: a new figure showing the idea for polygons (a pentagon around a circle, cut into five triangles of height $r$).
- [x] Loose ends:
  - Brocard's Theorem and the Lowest and Lower moves are in `tools/importance-proposal.md`.
  - The new cards have connected-formula rows.
  - The Cavalieri bullet is fine (Stanley).
  - The figures cheat-sheet list is **dropped** (not wanted).

**2.4d content-error fixes (Stanley's review lists, 26 items)**
- [x] Rows 1 to 26: every claim was checked against the card text and, where it is arithmetic, by computation. Fixes include:
  - the British Flag 3D form;
  - the Ptolemy mnemonic, with **Cyclic Quadrilateral Diagonals merged into Ptolemy's Second Theorem**;
  - Cayley-Menger;
  - the Isosceles Tetrahedron keyword;
  - the hexagonal Pick unit;
  - undefined $P$ and $E$, and Reim's collinearity;
  - the Brahmagupta / circumradius split;
  - regular-polygon-area pointers;
  - keyword dedupes on 8 cards, with a new scanner gate;
  - order statistics with and without replacement;
  - the squared binomial sum wording;
  - the twelvefold way's third column;
  - $n \ge 2$ for the max product;
  - the Zsigmondy spelling;
  - Wald's hypothesis;
  - arctangent's $ab > -1$;
  - the absolute value for the determinant area;
  - Bertrand's one form;
  - the Eisenstein norm;
  - Zeckendorf without `\gg`;
  - $a^n + b^n$ for odd $n$;
  - the triangle-angle-identities companions;
  - one home for the sine product.
- [x] `tools/find-duplicate-forms.py` written. Its two plain duplicates are fixed:
  - the cotangent identity now lives on `triangle-angle-identities`, with a pointer from `cotangent-rule`;
  - Brahmagupta-Fibonacci is gone from the `lagranges-identity` thumbnail, `latexPlain`, and Key forms.
- [x] CONVENTIONS section "A card's thumbnail and description stand on their own" (rule 17).

**2.4b new cards, batch 1**
- [x] Perpendicularity Lemma, Carnot's Perpendicularity Theorem, Iran Lemma. The old Carnot card is renamed "Carnot's Theorem (Distances to the Sides)", with its id and links unchanged and the old name kept as an alias.

**2026-10-12 (this session; details in the README changelog)**
- [x] **2.0** Gates run on Linux (`tools/jsc-node`, `JSC`/`CHROME` variables); `PLAN.md` in the repo; Iran Lemma figure redrawn (rule 18); the exterior-angle zigzag lead-in; `Special:NewCards` (rule 19); rule 7 amended (same lengths allowed when the nuance differs).
- [x] **2.4d** All 26 review rows fixed; plain duplicates at 0; the twins stay (Stanley: LTE is both a formula and a method).
- [x] **2.4b** All approved new cards (Perpendicularity Lemma through the six LIVE-concept cards), the Same Remainder merge.
- [x] **2.4g** The Olympiad Triangle Lemmas subsection, placed after Advanced Triangle Theorems.
- [x] **2.4c** Scan of the five card files: findings fixed, 47 descriptions rewritten to define symbols without restating the box, and all 12 approved candidate cards written (Shooting Lemma, Dumpty Point, √bc Inversion, Van Aubel for Cevians, Broken Chord, Nesbitt, Injectivity/Surjectivity, Cyclotomic Polynomials, Gambler's Ruin, Strategy Stealing, Erdős–Ko–Rado, Tiling a Board).
- [x] **2.4f** Figure line audit: two new gates (line gaps, raw TeX in figure text), all 584 panels reviewed, wrong figures fixed (Poncelet, domino board, Desargues, Miquel).
- [x] **2.4e** Formula-box audit on the detail page, approved by Stanley: nine crowded boxes trimmed into Key forms, 22 wide boxes broken at natural points, four dangling colons fixed.
- [x] **2.5a** Subject chip on problem pages and contest lists, derived from the tagged cards (1,365 problems). The LIVE-concept source waits for LIVE access.
- [x] **2.4** Whole-app UI scan finished: the three statement KaTeX errors fixed at the importer and gated; inline maths that overflowed on a phone fitted after rendering; every sweep at 375, 768, 1280, and 1920, light, dark, and Larger, in both layouts, and over all 4,616 statements, now reports nothing.
- [x] **2.1** Content and consistency scan: stale README, CONVENTIONS, and app wording fixed; three old-layout write-ups converted; 19 of the 20 candidate cards approved (not Perfect Numbers), written in four batches.

**2026-10-12 to 2026-10-16**
- [x] **2.1** Content and consistency scan, the 20 gap-scan cards in four batches, and Cutting a Solid with a Plane (700 cards).
- [x] **2.4** UI scan finished, the "/" fix, and the empty Practice Problems section on patterns.

### How the figure reference cards were sorted out (2026-10-11)
| Where | Cards |
|---|---|
| Polygons & Quadrilaterals (formulas) | Regular Hexagon of Side $s$ (absorbed Diagonals of a Regular Hexagon), Regular Octagon of Side $s$ (new), Regular Dodecagon of Side $s$ (chord table added), Equilateral Triangle of Side $s$ (moved from Ratios & Constants), Parallelogram Area (new: height form and sine form), Parallelogram Vertices Using Vectors (new: $A + C = B + D$), Quadrilateral Areas (parallelogram form removed, rhombus inradius added), Euler's Quadrilateral Theorem (second line and an explanation for the parallelogram law) |
| Solid Geometry (3D) | Cube of Side $s$ (new), Regular Tetrahedron of Side $s$ and Regular Octahedron of Side $s$ (rewritten as references, no overlap) |
| Triangle Areas & Radii | Right Triangle Inradius and Circumradius (renamed; $R = \frac c2$ lives here and Median to the Hypotenuse links to it) |
| Ratios & Constants to Memorize | Golden Ratio & the Regular Pentagon, Isosceles Tetrahedron, Tetrahedron Centroid & Medians stay as they are |
| Patterns | An Isosceles Trapezoid (Polygon Configurations); the Right Triangle with the Altitude to the Hypotenuse thumbnail shows $h^2 = pq$, $a^2 = pc$, $b^2 = qc$, $h = \frac{ab}{c}$ |
| Deleted | An Isosceles Triangle, A Right Triangle, A Parallelogram, A Rhombus or Kite, A Rectangle or Square (their facts were restored onto the cards above); no "Common Figures" group; no pentagon, icosahedron, or dodecahedron pattern |

**Known gaps (listed in `tools/live-missing.md`):**
- AMC 8 2021 is not on LIVE.
- LIVE has no Fall 2021 AMC. Fall 10A and 10B were imported from Stanley's PDFs; Fall 12A and 12B have no text except 12B #23.
- HMMT February Geometry shows 10 linked problems with no text.

---

## Steps 2.1 to 2.6 of the 2026-10-16 plan (all done)

### 2.1 Handoff system
- [x] This file restructured with "Current state" at the top; `CLAUDE.md`; the handoff rule in CONVENTIONS §7 and the README.
- [x] The old chat's answers recorded in `MIGRATION-NOTES.md` and folded in here and in CONVENTIONS.

### 2.2 Small fixes and one new card
- [x] Vieta Jumping moves from Number Theory methods to Proof Methods (it is fundamentally a proof method).
- [x] New card: Angle Bisectors of Two Lines. It gives the bisector equation and the slope rules: the x-axis and slope $\frac34$ give $\frac13$, and the other Pythagorean-triple pairs.
- [x] Hover previews:
  - find why the preview figure sometimes differs from the card's figure;
  - make the figure fill about three quarters of the box height.
- [x] Pythagoras widget: the vertices drag freely, with the squares allowed to leave the frame; the widget gets smaller.
- [x] Lab pages (quiz, flashcards, formula web) load the data files with the same `?v=` as `index.html`, so new cards appear; a gate checks it.

### 2.3 Home page (done 2026-10-16)
Remove the third repetition of the four spaces ("How the four fit together" and "Jump to"). Give each of the four tiles a line more of explanation. Use the space for things that are not repeated elsewhere: Problem of the day, Continue where you left off, Did you know, Newest cards, and a small practice summary.

### 2.4 Page tools panel (a setting) (done 2026-10-16)
A Wikipedia-style right-hand column on card pages:
- **Tools:** What links here, Problems using this card, Related cards, Permanent link, Print, Random card.
- **Page information:** id, kind, tier, importance, size of the write-up, counts of figures, examples, and links in and out, and the NewCards batch.
- **Appearance:** text size, page width, and theme.

It is off by default and turned on in Settings.

### 2.5 Angle-chasing game (done 2026-10-16)
On the Angle Chasing card: a random cyclic quadrilateral configuration with equal chords and one given angle. The reader marks every angle equal to it, presses Check, and sees the reason for each.

### 2.6 Interactives audit, then drag-the-triangle widgets (done 2026-10-16)
- **The audit:** every widget in `js/geo-interactive.js` and `js/math-tools.js` has a title naming the fact, a line saying what to drag and what stays true, labels on every point and quantity, live values, sensible limits, and no errors.
- **The new widgets:** olympiad lemmas with a draggable triangle, such as Incenter–Excenter, Iran, Humpty, Dumpty, Shooting, Broken Chord, Perpendicularity, Isogonal Conjugate, and Miquel.


## Verification records of earlier steps
- Every change passes the gates in section 3. It is checked in the browser at 375, 768, 1280, and 1920 px, in light and dark, and in all three densities. Here that is headless Chromium on a `python3 -m http.server`, with screenshots viewed.
- **2.0:**
  - `#/f/iran-lemma` shows the ticks and the solid-to-dashed switch at side CA, with all three lines ending at K and no MISMATCH.
  - `#/f/parallel-exterior-angles` reads with its new lead-in.
  - `#/special/newcards` and `#/special/newcards/All` list batch 1, and typing `Special:New` suggests the command.
  - The relaxed example gate still fails on a planted copied question.
- **Figure reference cards (2A):**
  - every deleted or merged id still opens (redirect) or is gone from every list, link, tag, alias, and register entry;
  - no fact appears on two cards (spot-check by searching each key formula);
  - every touched card renders with 0 KaTeX errors;
  - the Formula lines setting changes the card thumbnails live and survives a reload in 1, 2, 3, and All.
- **2.4b:** each new card renders (0 KaTeX errors, no overflow), its example is numerically verified, its figure's `ok` holds, the search eval is at least 160/187, and it is listed in `Special:NewCards`.
- **2.4g:** the new subsection appears in the sidebar and on the Geometry page with its blurb, and every moved card opens by its old id. `check-topics.py` and `check-lists.py` are at 0, and the routes still hold every card.
- **2.4c:** the findings list and the candidate-card table go to Stanley before any fix. Every fixed formula is re-verified by computation.
- **2.4f:** the new line gate is at 0 (allowlist reviewed), and the contact sheets are re-rendered after the fixes.
- **C:** Stanley approves the concept mapping and the `live-missing.md` table first; validators at 0; existing tags unchanged.


## Since the redesign (the four spaces and the new front page)
- **The redesign itself:**
  - every card is one of four kinds, in four spaces switched from the top bar (Formulas blue, Methods teal, Patterns amber, Practice purple);
  - a front page with search, the four spaces, the Pattern → Method → Formula → Problem chain, jump links, and the card and problem of the day;
  - subject pages as one scrolling page with group headings;
  - the sidebar as three books;
  - Wikipedia-style `Special:` pages and commands;
  - connected-formula rows.
- **Formula cards:**
  - about 480 of 486 converted to the new template in batches P5 to P31 and G1 to G8, each with Key forms, Conditions, Why it works, a fresh verified example, and figures where they help;
  - Lucas and Odd Entries in Pascal's Triangle proved in full steps;
  - 62 contest profiles rewritten as roles.
- **Patterns and methods:** a fixed anatomy written into CONVENTIONS, three pilots, and all 30 patterns and 135 methods audited.
- **New cards:**
  - Brocard's Theorem;
  - the Functions cluster (Odd and Even Functions, Inverse Functions, Symmetry as an Equation);
  - N1 to N7;
  - the shape reference cards (octagon, cube, parallelogram area and vertices, and others);
  - the first Olympiad batch (Perpendicularity Lemma, Carnot's Perpendicularity Theorem, Iran Lemma).
- **Merges:** Pick on a Triangular Grid, Diagonals of a Regular Hexagon, Cyclic Quadrilateral Diagonals into Ptolemy's Second Theorem.
- **Content review:** Stanley's 26-item review fixed after computing each claim, with new gates for repeated keywords and tab characters, and a duplicate-formula finder.
- **Tags and lists:**
  - one split-oval tag (tier plus a five-level importance, with Lowest added);
  - every card's importance reassigned on evidence;
  - one global filter;
  - additive AMC, AIME, and Olympiad routes (MATHCOUNTS removed);
  - 39 study lists, including Starting Points, the Trigonometry Sheet, the Modular Toolkit, the Inequalities Ladder, Proof Methods, and Functions & Symmetry.
- **Practice:**
  - statements and figures for every AMC 8/10/12 and AIME problem LIVE publishes (about 4,600), with the MAA credit, display fixes, and versioned statement files;
  - the 2021 Spring/Fall split, and Fall 10A/10B typed from Stanley's PDFs;
  - the Contests box with unwritten contests hidden;
  - random problems by contest and difficulty;
  - all 853 problem figures audited.
- **App and settings:**
  - density, card size, Formula lines, text size (with Larger), scroll speed, "When the app opens", notation (expanded sums), keyword chips, figures on card faces, and the live preview panel;
  - dark mode softened in several passes;
  - KaTeX vendored for offline use;
  - the sidebar follows scrolling;
  - back links typeset math.
- **Quality tooling:** `ui-scan.js`, `check-labels.py`, `check-diagrams.py`, `check-statements.py`, `find-duplicate-forms.py`, the scanner gates, and the search eval.
- **Removed at Stanley's request:** problem search, in-app find, the MATHCOUNTS routes, the Common Figures pattern group, the computed Related row, and the Card labels setting.
