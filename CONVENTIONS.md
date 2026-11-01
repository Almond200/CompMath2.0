# CONVENTIONS

Every rule here was measured against the cards of its day, and the count that proves it is quoted
(most against 557 cards in September 2026, some against 700 in October; there are 759 now (2026-10-30), and
`tools/scan-conventions.py` prints the current counts). If a rule has no number, it is not a rule. `CONTRIBUTING.md` holds the reasoning, the gap register and
the per-year retag notes; this file is the checklist you follow while actually adding a card.

Regenerate the numbers with `tools/scan-conventions.py`.

---

## 0. The model: four kinds

> Formulas tell you what is true; Methods tell you what you can do; Patterns tell you what you
> are looking at; Problems teach you to connect the three.

| Kind | Question | Scope | Test | Space |
|---|---|---|---|---|
| Formula | What is true? | one fact (theorem, identity, definition, standard result) | something you **remember** | Formulas |
| Method | What can I do? | one reusable move | something you **do**; still makes sense with every equation removed | Methods |
| Pattern | What am I looking at? | one recognizable configuration or situation, a hub | you can name it from the statement **before** solving, and it unlocks several facts or moves | Patterns |
| Problem | Can I use it? | one contest instance | it is a real problem | Practice |

**What earns each kind its card (agreed 2026-10-04).**

- **Method:** one move you can say as an instruction ("Reflect one endpoint across the line", "Add all the equations"), with a few steps. Anything that describes a single solving step is a method, even when it reads like a situation ("when you see X, do Y" with one obvious Y): X belongs in the method's When to use, with its lookalikes.
- **Pattern:** a recognizable configuration or situation named by what is in the statement, never by its solution ("Ellipse Tangent to a Line", "Quadrilateral Inscribed in a Circle", "Angle Bisector Extended to the Circumcircle", "A Term Far Down a Sequence"). Its card is a hub: the facts (formulas) that hold in the configuration, the moves (methods) it opens, and the clues and disguises that reveal it. A pattern earns a card only by disguise (it hides in several forms), choice (several methods could apply and the clues decide), or a toolkit (several facts hold in the configuration); otherwise it folds into its method.
- **Honesty over completeness:** a list is never padded. A method may use no formula, and a pattern's Formulas to try may say "No particular formula is needed" (the scanner accepts that sentence). A link names only a card that is actually used, never one that is merely related or proved by the method.
- **No red links:** when a card should exist, write it then; `placeholders` stays empty.
- **TRY in a pattern's box:** the pattern's top ideas, at most three, of either kind, in the optional `tryFirst` array; each must also appear under its Methods or Formulas to try (the scanner checks both). Without `tryFirst` the box shows the first three methods.
- **The thumbnail (the `latex` box of a method or pattern) states the key idea in general form, never an instance.** Symmetric Substitution shows $s = x + y,\ p = xy$, not the worked line $x^2 + y^2 = s^2 - 2p$; Digit Manipulation shows the place-value expansion, not one reversal identity. A second or third line is allowed only for a second distinct key idea the card covers (Normalization: $a + b + c = 1$ or $abc = 1$; Invariants and Monovariants; SFFT with and without a coefficient on $xy$). An extra line is never an example and never another formula for the same idea (the Ptolemy and power-of-a-point lines once added to Quadrilateral Inscribed in a Circle were removed for that reason). At most three lines, symbols over `\text`, written as one `\begin{gathered}...\end{gathered}` block; the card-face splitter leaves an environment whole, so separators inside it do not break it apart.
- **Depth: a card covers the full range of its idea, not only the famous case.** Symmetry Arguments gives $\frac{1 - P(A = B)}{2}$ as well as $\frac12$; SFFT covers $kxy + ax + by = c$; Forward-Backward Induction covers any forward jump whose sizes grow without bound, with doubling as the best-known case; Boxing a Tetrahedron covers the corner tetrahedron as well as the alternate-corner one.
- **Methods stand on their own.** A hyper-specific pattern may have a matching hyper-specific method when the move really is used only there. A general method is never written as if it belonged to one pattern: its name, box, thumbnail, and When to use describe the general move and name several settings, and the pattern it pairs with is one of those settings ("Turning Averages into Totals" also covers average speed, mixtures, and expected value). Names are scoped to the move's real reach: "Adding Groups of Equations", since sometimes only some equations are added.
- **Proof Methods** is a fifth Methods subsection (subject `proof`, write-ups in `js/data/details/proof-details.js`, which `index.html`, `scan-conventions.py`, and `validate-problem-db.js` load). It holds ways to structure a proof, induction and descent in their variants, and existence arguments; the extremal principle, invariants, double counting, bijections, and the probabilistic method stay under Counting & Probability and are named in the group blurb.

A pattern **suggests** methods and a method **uses** formulas (both written on the card); every
card **appears in** problems (derived from problem tags). A formula never says "when you see X, do
Y"; a method is never a formula with a process attached; a pattern never solves the problem; a
problem never teaches a theorem.

**Converting a card.** A card moves to its kind's template in `tools/rewrite-register.json`, under `conversion` (`formula`, `method`, `pattern`, `split` or `review`); a card not listed keeps the old template. `scan-conventions.py` then enforces the kind:

- a method needs `when`, `move` and `uses` (formula ids), plus a short `latex`, the gist at a glance: it is the browsing-card thumbnail and, on the method's own page, the formula box above the Overview box (When to use and Core move), as on a pattern page; a pattern needs `recognize` (2 to 5 signals) and `suggests` (method ids, or a planned id listed under `placeholders`); a formula carries none of these;
- each kind allows only its own `##` headings (formula: Key forms, Conditions, Why it works, Useful observations, Applications, Full proof, Contest profile; method: When to use, How, Why it works, Formulas it uses, Common traps, Full proof, Contest profile; pattern: Distinguishing clues, Methods and Formulas to Try, Common traps, Contest profile);
- a method's write-up opens with "## When to use", above How: the situations that call for the move, in more detail than the box's one line, including rules of thumb from experience. The app lists under it, as "Suggested by patterns", the patterns whose `suggests` name the method ("None yet" until one does);
- a method's "## Formulas it uses" is a list, one `- [[id]]: how it enters` bullet for each card in its `uses`, in the same order (the scanner checks both). Each line says what the formula does inside the move, so the reader is never left with a bare link. A fact that is not one of those formulas (how many rows a table has, why a construction reaches the bound) belongs in How or Why it works instead;
- a pattern's "## Methods and Formulas to Try" may open with prose (and a figure), then holds two lists, `### Methods to try` and `### Formulas to try`, one `- [[id]]: explanation` bullet per card. The methods are exactly the pattern's `suggests`, in the same order, so the box and the section never disagree; each explanation says how the move applies to this shape. The formulas must be formula cards. A planned method (a placeholder id) is written the same way and shows as a red link, as a missing article does on Wikipedia;
- it warns, without failing, on a method with more than six How steps or no `uses`, a pattern with more than four suggested methods, and a pattern tagged on fewer than two problems.

**Re-sorting a card between kinds.** Moving a card to another kind (a formula-like pattern to Formulas, a pattern that is really one move to Methods) moves its object between data files and keeps its id, so links, lists, problems and stars follow it. A card that is both a fact and a move is split into a formula card and a method card that `uses` it, the method keeping the old id (Inclusion-Exclusion: the formula `inclusion-exclusion` and the method `pie`). Merging two cards keeps the stronger id, carries over the other's keywords and examples, retags its problems, and rewrites every list and link to the kept id. The dropped id goes into `MERGED_IDS` in `js/app.js`, so its old address still opens the kept card (Symmetric Substitution into Rewriting in Elementary Symmetric Polynomials, 2026-10-04). A card that names a category rather than one move (Auxiliary Lines, The 3D Playbook) is not a card: its content becomes the group's blurb and its moves become their own cards. After any re-sort, run `check-lists.py` (route completeness), rebuild the search index, and check the eval still holds.

A problem may record `main`, the one tagged card that is its key idea, and `tools/validate-problem-db.js` checks it. The description of a method or pattern must not repeat its box: the box says when and what, the description says what the move or shape is and why it exists.

**Groups.** Each subject is divided into groups: topics for Formulas (the subsections), method
groups and pattern families for Methods and Patterns (`groups` in `patterns.js`). Every group has
a one-sentence `blurb` saying what the group is, written to the prose rules (no em dashes, no bold,
Oxford comma). The subject page shows each group under its heading with its blurb, and a group's
title is slugged into its address, so renaming one changes a bookmarkable URL.

---

## 1. The card

Exactly two field orders exist, and nothing else. Copy one of these.

**Subject file** (`geometry.js`, `algebra.js`, `number-theory.js`, `counting.js`) — 546 of 546 cards (2026-10-30):

```js
        {
          id: "kebab-case-id",
          name: "Title Case Name",
          latex: String.raw`...`,
          description: String.raw`...`,
          keywords: ["...", "...", "...", "..."],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
```

**`patterns.js`** — 213 of 213 cards. Same, plus `type` and `subject` immediately after `name`:

```js
          type: "method",       // or "pattern"
          subject: "counting",  // geometry | algebra | number-theory | counting
```

- `type` and `subject` appear on **213/213** `patterns.js` cards and on **0/546** subject-file cards (2026-10-30).
  Putting either in a subject file, or omitting either from `patterns.js`, is always wrong.
- `latex` uses `String.raw` on **759/759** cards. Use it even when there is no backslash.
- **never write a raw `<` followed by a letter inside `$...$`** — write `\lt`. Every one of these
  strings reaches the page through `innerHTML`, so the HTML parser sees `<j` as the start of a tag
  and eats everything up to the next `>` before KaTeX is ever called. This shipped once as
  `$\sum_{i<j} \lvert \vec v_i \times \vec v_j \rvert$` on `zonogon-minkowski`: the bullet lost its
  formula and the bullet after it was mangled too. `scan-conventions.py` checks every `String.raw`
  literal in the data files — descriptions, `latex`, write-ups and examples alike — and it looks
  only *inside* math spans, because matching across the gap between two formulas just flags the
  intentional `<br>` in examples.
- One card deviates: `periodic-sequences` in `patterns.js` orders its fields
  `id, type, subject, name, ...`. That card was corrected, so the corpus now has **no** exception:
  all 759 cards use one of the four canonical orders, the extra two being the same pair with an
  optional `latexPlain` after `latex` (85 cards carry one on 2026-10-30; see "Expanded notation" below).
  `tools/scan-conventions.py` names any card that is not in one of the two orders.
- Every card has a `latex` and a `description`. **0** cards omit either.

### Tiers

A card's `tier` says where it is **first needed**; later stages still use the earlier tricks.

| Tier | Meaning | Evidence |
|---|---|---|
| `AMC` | needed on AMC 10 or 12, problems 1 to 25 | tagged on an AMC problem, or an AMC 10/12 or MATHCOUNTS level tag |
| `AIME Early` | first needed at AIME problems 1 to 10 | tagged on AIME 1 to 10 and no AMC problem |
| `AIME Late` | first needed at AIME problems 11 to 15 | tagged only on AIME 11 to 15, or an AIME-level tool with no early use |
| `Olympiad` | beyond the AMC and AIME | no AMC or AIME problem needs it; olympiad level tags only |

- Judge a new card by the problems it would be tagged on and by the rubric, not by how hard it feels: a short fact can be AMC and a long method AIME Late.
- **Importance is judged inside the card's own subsection** (a formula topic; for methods and patterns, the subject), never globally, and never by tier: an important Olympiad formula is High, an unimportant AMC formula is Low. Five values: `high`, `medium`, `low` (roughly the top quarter, the middle half, the bottom quarter of the subsection), `lower`, and `lowest`. **Lower** is marginal use: something that might be needed once in ten years (Chebyshev's Sum Inequality). **Lowest** is for a card that is confidently never used on a contest and is in the app only for completeness or beauty (Cardano's Cubic Formula, Morley's Trisector Theorem). A card with even one tagged problem is Lower at the most, never Lowest, unless the owner decides otherwise by name. The first reviewed assignment is `tools/importance-proposal.md`; the Lowest level was added on 2026-10-10 and 21 cards moved down to it from Lower (the list is in the README changelog). This replaces the old pre-2026 `lowest` tier, which was retired and meant something else.
- Tier and importance are shown together as **one split oval**: the contest tier on the left, the importance (HIGH, MED, LOW, LOWER, LOWEST) on the right in a lighter tint of the same color. There is no setting to switch labels (removed 2026-10-10: two label systems were confusing).
- A card shows exactly one tag beside its kind, the split oval. The `level` array is not shown as text (no MATHCOUNTS / Olympiad wording beside the badge) and is no longer a filter; it remains in the data for Special:Browse and the lab. Nothing on a card may say the same thing twice.
- **The filter is one global filter** (contest tier and importance), stored under `mq-settings.filter`, applied identically to subject, group, and topic pages, the sidebar (counts and greyed links follow it), and a card listed in two subjects (`ALSO_LISTED_IN`). It is never per section.
- A subject page uses the chosen card order, Curated (file order, the default) or Most used (the cards the most practice problems use first). The By contest tier order was removed on 2026-10-23 at the owner's request; a stored "tier" reads back as Curated. Lists a reader curated, search results, and tag matches keep their own order.
- The reviewed assignment of every card, with its problem evidence, is `tools/tier-proposal.md`. A new card's tier goes in the card and, when the table is regenerated, in that file.
- `scan-conventions.py` fails on a card with a missing or unknown tier.

### Field values

| field | measured |
|---|---|
| `importance` | five values: `high`, `medium`, `low`, `lower`, `lowest`, judged within the card's subsection (see "Tiers"); shown in the split oval beside the tier |
| `tier` | the default label, one of `AMC`, `AIME Early`, `AIME Late`, `Olympiad` (see "Tiers" below); every card carries one, after `importance` and before `level` |
| `level` | drawn from `MATHCOUNTS` (147), `AMC10` (303), `AMC12` (412), `AIME` (516), `Olympiad` (287) on 2026-10-30. No other string appears |
| `keywords` | min 4, median 7, 90th percentile 9, max 18 (2026-10-30). Four is the floor — never ship fewer |
| `name` | median 25 chars, max 60. 66 names use ` & `, 44 carry a parenthetical like `(PIE)` (2026-10-30) |
| `description` | median 403 chars, 90th percentile 582, max 1046 (2026-10-30). Three to five sentences, to the intro standard below |

### The intro (`description`) standard

The description is the card's introduction. It is the first prose on the card's page, and its
**first two sentences are all the section grid and search results show** (`firstSentences` in
`js/app.js`), so those two must stand on their own. Adopted 2026-09-25, after a reader put it
exactly: the old intros read "like someone who knows what they are talking about but isn't doing
a good job of explaining it". Progress is tracked in `tools/rewrite-register.json`.

- **Sentence one defines the topic of the card** — what the object, result or method is — before
  any formula variant, use case or caveat. A term is defined ("Two integers are congruent modulo
  $m$ when they leave the same remainder"), a theorem is stated in words ("In a right triangle,
  the square of the hypotenuse equals the sum of the squares of the two legs"), a method says what
  it does ("Stars and bars counts the ways to split $n$ identical objects into $k$ labeled
  groups"). Never open with a list of variables ("For a cevian of length $d$ dividing side $a$
  into..."), a mnemonic, a fragment ("For nonnegative reals; equality iff all equal"), or the
  conditions under which something happens before saying what it is.
- **Sentence two says when you reach for it and what it buys you.**
- Then conditions, variants and symbol meanings, woven into sentences. Three to five in all.
- **Links are allowed, and the first mention gets one.** The card page linkifies its
  description; the grid, search results, previews and the search index read it as plain text.
  See Cross-links below for the first-mention and capitalization rules.
- **Search reads it.** Descriptions feed both search channels, so rebuild the index and run the
  eval after every batch. A specialisation's intro must not paraphrase the general card's
  defining phrase: "The line through the circumcenter and the orthocenter..." on
  `euler-line-parallel-side` took "line through the circumcenter centroid and orthocenter" off
  `euler-line-ratio`, and "the circle that touches $AD$, touches $BC$..." on `sawayama-thebault`
  took "radius of the circle touching all three sides" off `inradius-area`.

### Expanded notation

The notation setting has a sigma form and an expanded form, and the expanded form must never show
a sigma. Adopted 2026-09-27, after Cauchy-Schwarz still showed $\sum$ in its formula box with
Expanded selected: only 13 cards had a written-out twin, and the gate that should have caught the
rest matched `\sum\b`, which misses `\sum_`, so it saw 17 of the 93.

- **A `latex` containing `\sum` or `\prod` needs a `latexPlain`**, directly after it, with the
  terms written out: `a_1 b_1 + a_2 b_2 + \cdots + a_n b_n`, not a sigma with its index spelled
  differently. Every such card has one (83 of 83 on 2026-10-30).
- **A Key forms bullet with a sigma writes both forms**, `\alt{sigma form}{expanded form}`.
  `notate()` in `js/app.js` picks the side the reader chose, and `sigma_form()` in
  `tools/build-search-index.py` indexes the sigma side so search is unaffected.
- Body prose may keep sigma notation: rewriting every derivation would introduce more errors than
  it removes. The rule covers the formula box and Key forms, which is what the setting promises.
- **The sigma form appears once.** A `latex` holds the sigma form only; its written-out twin
  goes in `latexPlain`, never beside it in `latex` as well, or the Sigma setting shows the same
  sum twice. Hockey Stick, Vandermonde and the Binomial Theorem carried both from before the
  setting existed (fixed 2026-10-03). A written-out part that says something else (a definition
  such as $A_k = a_1 + \cdots + a_k$, an index range, a worked special case) stays in `latex`.
- `scan-conventions.py` fails on a sigma formula box with no sigma-free `latexPlain`, a formula
  box that shows a sum both as a sigma and written out (same left or right side), a Key forms
  bullet that still shows a sigma in the expanded form, and a malformed `\alt`.

### Headings, subheadings and labels

One format, so every page reads alike (Stanley, 2026-10-03):

- **Section headings** are the write-up's `##` headings, in sentence case ("Common traps",
  "Why it works"), each with its one-line note underneath. A heading Stanley named keeps his
  capitals ("Methods and Formulas to Try", "Practice Problems").
- **Subheadings** inside a section are `###` in the write-up, rendered as a short line of
  semibold, dimmed text in sentence case: "Methods to try", "Formulas to try".
- **Box labels** (a method's "When to use" and "Core move", a pattern's "Look for" and "Try")
  are small capitals in the box.
- **None of these ends in a colon.** The one exception is a row of label and value, where the
  colon separates the two: the Contest profile rows ("Difficulty:", "Role:"), which Stanley asked
  to have colons, and "Pattern family:".

### Naming

The id does **not** have to resemble the name — `pie` is "Principle of Inclusion-Exclusion (PIE)".
This is exactly why the duplicate check in §5 must search names, not ids.

---

## 2. The write-up — mandatory, in `js/data/details/<subject>-details.js`

**One write-up for every card (759 of 759 on 2026-10-30), no orphans, no card without one.**

The headings depend on the card's kind (counts as of 2026-10-30; the scan fails on a heading the kind does not allow):

```
formula (546)   ## Key forms, ## Conditions, ## Why it works, ## Useful observations,
                ## Applications, ## Contest profile, and optionally ## Full proof
method (167)    ## When to use, ## How, ## Why it works, ## Formulas it uses,
                ## Common traps, ## Contest profile, and optionally ## Full proof
pattern (46)    ## Distinguishing clues, ## Methods and Formulas to Try,
                ## Common traps, ## Contest profile
```

Key forms is optional on a formula card (on 542 of 546). `## Full proof` renders collapsed behind a "Show
full proof" button. "Pattern and method anatomy" at the end of this file says what each section holds.

- **Why it works explains; Full proof proves.** Open Why it works with the idea in one plain
  sentence, then the argument step by step at a strong AMC 12 reader's level, each step saying why
  it is allowed, in short paragraphs. No compressed gaps like "factors as a difference of squares,
  twice". A concrete instance (the divisors of $360$) is often the clearest way in.
- **Add a Full proof when Why it works is an outline or an instance** and a complete argument is
  within contest reach: the general expansion behind Vieta, unique factorization behind the
  divisor count, the determinant behind barycentric area ratios. Do not add one to a method or
  pattern with nothing to prove, and do not duplicate a Why it works that is already complete.
  Where the real proof is beyond contest level, say so in Why it works instead.

- Key forms lists the shapes a technique takes, not worked examples.
- **Each bullet leads with the maths, then ` — `, then the gloss:** `- $\frac{n!}{n} = (n-1)!$ — n rotations
  of a row give the same circular arrangement`. It does not lead with a bolded phrase; bold never
  renders, so `- **the division** — ...` reaches the reader as literal asterisks. The ` — ` here is a
  structural separator and does not count against the em-dash budget.

### Prose rules

- **No `**bold**` anywhere.** Markdown emphasis is never processed; it reaches the reader as literal
  asterisks. **0 of 759** write-ups contain `**`. This rule is unbroken — do not be the first.
- **Em dashes: median 0 per write-up, 90th percentile 4, and 392 write-ups use none (2026-10-30).** Prefer
  commas. A rewritten card uses none at all in its prose, description, example or figure
  captions; the renovation is steadily removing the rest. (The ` — ` separator in Key forms is
  structural and exempt.)
- **The Oxford comma, always**: "$7$, $11$, and $13$", "acute, right, or obtuse". Adopted
  2026-09-27; 303 series were corrected by hand review (a pattern cannot tell a series from a
  pair inside a longer phrase, so there is no gate: "a sum or difference" and "right and up"
  take no comma).
- **American spellings** in anything you write: `center`, `-ize`. 31 existing write-ups carry British
  forms; leave those alone rather than sweeping a file.
- **`### ` subheadings** may split a long section into named parts (First-Step Analysis splits How by the kind of question); they render like a pattern's "Methods to try" label. Only the `##` headings are fixed by the kind's template.
- **Tables** are a block of `| a | b |` lines, header row first and an optional `|---|---|` row under it; cells take math and [[links]]. Use one when a computation runs in rounds or cases (the step-by-step probability table on First-Step Analysis), and introduce it in prose so the page reads as an explanation, not a list of numbers.
- **Do not point at the page you are on.** A sentence never refers to its own section or card ("at the end of this section", "as below", "as the figure on this card shows", "(the last kind is handled below)"): the reader is already reading it, and the sections are in order. `scan-conventions.py` flags these phrases ("a sentence pointing at its own section or card").
- **Similarity and congruence tests are named without marks.** AA, SAS, and SSS are the names of both families; the card says in words which one it is about, rather than adding a `~` to some and not others.
- **A formula's Key forms hold facts about that formula only.** A fact that belongs to another card moves there (the equal base angles and cyclic test of the isosceles trapezoid left Consecutive Angles of a Trapezoid for the figure's own card).
- **Names say what the card is at a glance, including its setting.** A parenthesis in a name is for the technique's common label, as in "First-Step Analysis (States)" and "Counting Restricted Sequences (State Machines)".
- **A paragraph begins with explanation, never with an example.** Say what the idea is and why it holds, then bring in a case as part of the explanation (2026-10-10, Stanley).
- **Examples are not copied between cards.** Each worked example asks its own question and shows its own nuance. Two cards may use the same lengths (the 13-14-15 triangle, 3-4-5) when the questions differ, so that each example teaches what its own card is about; what is banned is the same question with the same numbers on two cards (amended 2026-10-12, Stanley: "it's ok if triangles in examples have the same lengths, just make sure that their nuances are different, not copied"). `scan-conventions.py` fails when two converted cards' triangle examples share three numbers and their questions are near-copies (word overlap of at least 0.45), and lists the pairs that share only the numbers.
- **Several forms in the thumbnail when the card has several case forms.** "Acute, Right, or Obtuse from the Sides" shows $c^2 < a^2 + b^2$, $c^2 = a^2 + b^2$, and $c^2 > a^2 + b^2$, each with its angle condition; an inequality shows its equality case; a result with a converse shows both directions. Forms are separated by `\qquad` and stack in one block. Check this on every card you convert.
- **Calculus is typeset properly:** the differential is upright and thin-spaced, `\int A(h)\,\mathrm{d}h`; `\lim`, `\sin`, `\log` always carry their backslash. `scan-conventions.py` flags an integral with a slanted or unspaced differential.
- **Math in a card name typesets everywhere the name appears**, back links included (`.back-link` is on the `renderMath` list).
- **No nested lists in a write-up.** The renderer does not support them, and an indented sub-list breaks the whole numbered list into one paragraph. Use a flat list, or a paragraph followed by a separate bullet list.
- **Never a raw `<` inside maths.** The write-up, the description and a problem `strategy` are all
  inserted as HTML before KaTeX runs, so `<` plus a letter opens a tag and the browser silently eats
  the rest of the line. Use `\lt` and `\gt`.

### Cross-links

Always `[[card-id|display text]]`, effectively never bare `[[card-id]]`. Measured on 2026-10-30: **1093 piped
links** (898 in write-ups, 195 in card fields), **0 bare in prose**; the list bullets of "Formulas it uses" and "Methods to try" use `- [[id]]: ...` by design. A bare link renders the
card's full Title Case name, which rarely fits a sentence.

- **Link the first mention, once.** Read the page in order: the description, then Key forms, Why
  it works, How to use it, On contests, Full proof. The first time another card is mentioned
  carries the link, and later mentions stay plain. Adopted 2026-09-27, when a reader found
  "Fermat's Little Theorem" unlinked in an intro and linked two paragraphs later, and
  capitalized differently each time. 212 links were moved to their first mention (154 of them into
  descriptions) and 52 repeat links removed. `scan-conventions.py` fails on a link placed after an
  earlier plain mention of the same card and on a card linked twice on one page. Exempt: a link
  whose text points at a card ("see that card"), which would point at nothing if unlinked, and a
  short list of pairs in the scan where the earlier words are a different sense ("the altitude"
  is not the altitude-to-the-hypotenuse result).
- **Linking never changes capitalization.** Write the phrase exactly as the sentence would have it
  unlinked. A named result is a proper name and keeps its capitals everywhere, linked or not: a
  theorem, lemma or "Law of ...", or a formula, identity, inequality, sums, principle or criterion
  named after a person, is written as its card titles it: "[[fermats-little-theorem|Fermat's
  Little Theorem]]", "the [[law-of-cosines|Law of Cosines]]", "[[vietas-general|Vieta's
  Formulas]]". A particle keeps its sentence case ("de Moivre"). Everything else is a common noun
  and is lowercase mid-sentence: "[[gcd-substitution|gcd substitution]]", "[[mass-points|mass
  points]]", "the [[euler-line-ratio|Euler line]]" (a person's name inside stays capitalized).
  417 lowercased named results were fixed; the scan derives the list of named results from the
  card names and fails on any written without its capitals.
- **Never put `$...$` inside a link's display text.** `linkifyCards` (`js/app.js`) splits the prose on
  `$...$` *before* it matches `[[...]]`, so a link whose label contains math is torn across two parts,
  the pattern never matches, and the raw `[[id|...]]` is printed to the reader. It fails silently: the
  validator passes, and `.card-link-broken` does not fire because no link was ever produced. Write
  `[[trig-area|the sine area formula]] $\tfrac12ab\sin C$`, never `[[trig-area|$\tfrac12ab\sin C$]]`.
  Three occurrences existed when this was found; a corpus check is one grep for `\[\[[^\]]*\$`.
- **No `*italics*` either.** Same reason as bold: markdown emphasis is not processed, so it reaches the
  reader as literal asterisks.
- **A description's links render on the card page only.** `js/app.js` keeps the linked text as
  `descriptionLinked` for `renderDetail` and replaces `description` with the plain text for every
  other use (grid, search, previews), `lab/lab-common.js` strips links for the lab pages, and
  `tools/build-search-index.py` indexes the plain text. Anything new that reads a description
  must read the plain one. (Until 2026-09-27 descriptions were never linkified and a link in one
  printed raw; the scan's old check for that is gone.)
- **Do not write a paragraph in order to hang a link on it.** Link where the sentence was going to
  mention the idea anyway. A sentence that exists only to list three neighbouring cards is padding;
  a sentence that says how this card differs from them is not.

The validator fails on an unresolvable target, which is the safety net for a renamed card. After adding a card run `python3 tools/build-cross-links.py --seed`
(the alias table is generated from card *names*, so a new or renamed card leaves it stale), then
`--report` and judge each candidate in context. Two classes of candidate are permanent false
positives and should be rejected every time they reappear:

- "extended Euclid" or "run symbolic Euclid" offered a link to `euclids-lemma`. Both mean the
  *algorithm*, not the lemma.
- the phrase "digit sums" offered a link to `digit-sum-carries`. In `divisibility-rules` and
  `repeating-decimals` it means $10 \equiv 1 \pmod 9$ or the digits of a repeating block, neither of
  which involves a carry; `divisibility-rules` is the card those mean (it absorbed `digit-sum-mod-9`).
- **a mathematician's name is not a card match.** "Brahmagupta's" in `cyclic-perpendicular-diagonals`
  means Brahmagupta's *theorem* (the perpendicular from the diagonal intersection bisects the opposite
  side), not `brahmaguptas-formula`, which is his area formula. Likewise "Pappus' chain" in `arbelos`
  is the chain of circles, not `pappus-centroid`, which is the solid-of-revolution theorem. Both
  reappear on every `--seed`, and both are rejections.
  The library now holds **three** distinct Pappus results — `pappus-centroid` (solids of
  revolution), Pappus' chain (a clause inside `arbelos`), and `pappus-hexagon` (the projective
  theorem) — so the bare alias "Pappus" is genuinely ambiguous and `build-cross-links.py` holds
  it back rather than guessing. That is the wanted behaviour: do not resolve it by hand.

---

## 3. The example — mandatory, in `js/data/examples-supplement.js`

**One example key for every card (759 of 759 on 2026-10-30). Zero cards lack one.**

Shape is `{ q, s }`: a clean question, and its solution behind a Show solution button. A printed card shows every solution, and hides the buttons, the AoPS links and the back links (owner, 2026-10-17).

```js
window.MATH_EXAMPLES["your-card-id"] = { q: String.raw`...`, s: String.raw`...` };
```

- **The file is not one object.** It is a long series of separate `Object.assign(...)` blocks
  followed by individual `window.MATH_EXAMPLES["id"] = {...};` statements. Appending before "the last
  `};`" drops your entry *inside the last example's object*, where it parses fine and silently never
  loads. Use the standalone-statement form above, appended at the end of the file.
- Never use a card's dead inline `example:` field. Those 143 fields were deleted for drifting.
- **The example uses the card's own method.** An example is there to show the card at work, so
  its solution must run through the card's idea, not a different route that happens to reach
  the answer. `tangency-condition` (Unique Solution ⟹ Tangency) shipped an example asking when a
  line "touches" a circle, so the step the card teaches, reading "exactly one solution" as a
  tangency, never happened. Its second version did make that step, on a shifted circle whose
  algebra buried it. It now asks when $x^2 + y^2 = 1$, $y = x + c$ has exactly one solution,
  reads that as tangency, and sets the distance from the origin to the line equal to $1$. Check
  this for every example you write or review, and prefer the simplest instance that still needs
  the method.
- **A legacy practice question never repeats the worked example.** The card page lists `MATH_EXAMPLES[id]` and then the older `MATH_PROBLEMS[id]` questions from `js/data/problems/geometry-problems.js` and `extra-problems.js`, numbered as further examples. A practice question that is the same exercise, with the same numbers or only new ones, read as two copies of one problem; 40 such repeats were removed on 2026-10-04. `tools/check-example-repeats.js` (run by `scan-conventions.py`) flags any pair with word overlap of at least 0.45, or the same numbers with overlap of at least 0.25; a pair read and kept because it exercises a different aspect goes on the scanner's `_REPEAT_OK` list.
- **Do not repeat a neighbour's worked numbers.** `gcd-lcm-product` already counts the pairs with
  $\gcd = 6$ and $\operatorname{lcm} = 210$, so `gcd-substitution`'s example uses a sum
  condition instead, which is the part of the substitution the other card does not show.

---

## 3b. Practice problems — mandatory, at least two per card (owner, 2026-10-25)

**Every card has at least two practice problems, and a new card has them before it is committed.** `node tools/practice-gaps.js --check` is a gate in `tools/gates.sh` and fails on any card under two (`--list` names them). A practice problem is either:

- **a linked contest problem**: a problem in `problem-db.js` that cites the card in `formulas` or `trickFormulas`. The tag goes on only where the problem's written route really uses the card (§11), never to give a new card its problems; a tag on a shared AMC 10/12 problem goes on both twins (`node tools/add-tag.js <card> "<ref>"`). The strategy names the card at the step that uses it; or
- **a supplementary exercise** in `js/data/problems/extra-problems.js` (`MATH_PROBLEMS[id]`), used only when no real contest route uses the card. It asks its own question, never repeats the worked example (§3) or a neighbour's numbers, and every number in it is checked by computation.

Search the whole archive for real routes first (`node tools/few-tags.js`, LIVE's concept hints, the card's keywords); exercises are the fallback, not the default.

## 4. The diagram — mandatory for geometry

**Every geometry card has a diagram (257 of 257 in `geometry.js` on 2026-10-30, and every geometry method in `patterns.js` too).** It is not a strong tendency, it is the rule: a
geometry card without a figure is incomplete. The count first reached 200/200 only after a card shipped
without one and had to be fixed, which is why `tools/scan-conventions.py` exits non-zero on any
geometry card missing a diagram.

Elsewhere it is the exception, reserved for configuration-heavy figures: `patterns.js` 103/213,
`algebra.js` 13/122, `counting.js` 8/82, `number-theory.js` 2/85 (2026-10-30). In-text figures are counted
separately: 210 placed on 182 cards, in every subject.

- **Figures inside the text.** A paragraph that is nothing but `{{figure:name}}` draws
  `BODY["card-id"]["name"]` at that point in the write-up. Use one wherever a paragraph describes
  something the reader would otherwise have to imagine: a construction, a labelled configuration,
  a before-and-after, a worked diagram (`barycentric-coordinates` marks two points on the sides,
  turns each cevian into an equation and solves for the crossing). Put it right after the paragraph
  it illustrates, never repeat the figure at the top of the card, and make the caption say what to
  look at. Label points with the values the text uses, vertex coordinates included. The scan fails
  on a marker that names no figure, a figure no text places, and a marker sharing its paragraph
  with prose. `EXAMPLE["card-id"] = { q, s }` is the same idea for an example's own figure: `q`
  shows only the given setup, `s` an optional construction inside the solution.
- **Keep paragraphs digestible.** One idea per paragraph, about 450 characters at most, and a
  multi-step derivation or the key equation goes on its own line as display math (`$$...$$`)
  instead of being threaded through a long sentence. A paragraph that walks through several steps
  is split at the step boundaries. `scan-conventions.py` reports rewritten-card paragraphs over the
  limit.
- **Never name a specific problem on a card.** On contests, the write-up, the example and the
  description describe problem types in general ("a cubic with no $x^2$ term", "two circles in a
  corner") and may quote the tag counts, but never cite "2024 AIME II Problem 4" or similar; the
  practice problems are listed under the card from `problem-db.js`, and that is where references
  live. `scan-conventions.py` fails on any card text that names one.
- **Keep each card in its lane.** A neighbouring card's result gets one sentence and a `[[link]]`,
  never a re-derivation, a displayed copy of its formula, or its picture. A construction or
  configuration is drawn and worked on the one card whose topic it is (the doubled median on
  Doubling a Median, the 13-14-15 altitude split on the 13-14-15 card), and every other card
  points there. Check the neighbours' figures before drawing a new one.
- **Break up runs of long paragraphs.** Two or three paragraphs of three or more lines in a row are
  hard to take in, so something visual should sit between them: on a geometry card, an in-text
  figure (`{{figure:name}}`) of the configuration the text describes; on any card, a centered
  display line with the key equation. Figures are for geometry. A non-geometry card gets one only
  when a picture explains more than a centered line would, never as decoration. One or two
  in-text figures per card is the norm, one for each distinct idea: a card covering two concepts
  (the acute and the obtuse case, the theorem and its converse) gets a figure for each.
- **Write to teach, not to list.** Each explanation should build understanding: say what the idea
  is, why each step follows, and how the pieces connect, instead of stating facts one after another.
  This is not a formal lesson, and most cards need far less than `barycentric-coordinates`, which
  is the fullest case. Add a figure wherever a picture makes the concept clearer, and not only in
  geometry: an area model for an algebraic identity, the grid of outcomes for a probability, a
  graph for an extremum, a tiling for an algorithm.
- Figures go through the diagram DSL in `js/data/diagrams/`, registered as
  `DIAGRAMS["card-id"] = [...]`. Geometry figures live in `geometry-diagrams.js`, everything else in
  `general-diagrams.js`.
- One canvas size for every panel on a card, and a `cap()` caption on every panel.
- **Nothing overlaps, and nothing falls off the canvas.** Run `python3 tools/check-diagrams.py`; it
  exits non-zero on any label outside its viewBox, any marker dot outside it, and any two labels
  whose boxes intersect. Then confirm on the rendered page that every panel has its caption.
- **No label touches a dot, a stroke or another label as rendered, and none relies on the tidy pass
  to rescue it.** Run `python3 tools/check-labels.py`. It renders every figure in headless Chrome
  through the app's own `tidyDiagram()` and measures real glyphs, which `check-diagrams.py` cannot:
  that gate reads the source with estimated widths and never saw the "1"s printed on the circle
  centres of the Soddy figure, or a vertex letter sitting on one of its own sides. It also fails a
  label the tidy pass had to carry more than 14px, since a label moved that far can end up naming
  the wrong point (a "Brianchon point" label once landed beside a tangency point); place it in the
  figure instead. `tools/label-audit.html#show` draws every offending figure with the label boxed.
  Two tools for crowded spots: `gapLabel(p, neighbours, ...)` puts a point's label in the widest
  gap between the lines leaving it, and in an in-text figure drawn on a grid, `plate(...)` prints
  an opaque patch in the page colour under a coordinate label so grid lines stop at its edge.
  (Plates only in `BODY` figures: card panels also sit on the white card, where the patch would show.)
- **Derive positions; do not hardcode one where the construction gives it.** This is the rule that
  the other checks could not enforce, and every instance of the bug below is the same mistake:
  a coordinate chosen by eye, or a derived point never checked against the frame.
    - The arbelos comparison circle sat at a hardcoded `[330, 118]` and landed *on top of* the
      figure. Both shapes are now placed from a computed gap.
    - `angle-bisector-length`'s external foot is at `t = b/(b-a)` along `AB`, so it runs to infinity
      as `a` approaches `b`. A near-isosceles triangle put it at `x = -406`. Sides must be clearly
      unequal -- 197 : 104 places it at 337.
    - `ellipse-tangent-line` reflects a focus to `2*yAx - F1.y`; with the line low in the frame that
      was `y = 368` on a 330-tall canvas, so the point and its label drew nothing.
    - `difference-of-squares` left 14px to the right of the figure for a 28px label.
  In each case the figure rendered, the page looked plausible, and every existing gate passed.
- A line drawn deliberately past the frame is *not* a violation -- that is how an unbounded line is
  rendered, and the clipping is the intent.
- **A diagram file that throws must fail the run, and used not to.** `check-diagrams.py` captured
  only `stdout` from `jsc`, so a file that raised at load looked exactly like a file with no
  diagrams in it: the count came back smaller and the run said OK. One undefined colour constant
  (`PNK`, which exists in `geometry-diagrams.js` but not in `general-diagrams.js`) silently removed
  **all 27 figures in that file** from the app while every gate passed. The checker now inspects
  the return code and stderr. Colour constants are per-file: check the one you are editing defines
  what you are about to use.
- **The marker-dot test checks the CENTRE, and used not to.** It read
  `cy > H + r`, giving a dot a full radius of slack past the edge -- so a marker centred at
  y = 342 on a 340-tall canvas, entirely invisible, passed the gate. Found when a derived point
  in `perpendicular-bisector-locus` landed off the bottom and `check-diagrams.py` said OK. The
  bound is now the viewBox itself; tightening it produced zero false positives across the other
  269 panels.
- **A drawn circle that nearly fits is a bug.** `check-diagrams.py`'s circle test was long gated on
  `r <= 8`, so it only ever saw marker dots: a radius-166 circumcircle sliced flat at BOTH ends of
  `median-to-hypotenuse` passed every gate for months. It now flags any circle overflowing by up to
  25% of its own radius. Beyond that the circle is plainly bigger than the frame on purpose -- four
  circumcircles of four triangles genuinely are -- and stays exempt. Today's data splits cleanly
  either side: the three real bugs sat at 4%, 17% and 23%, the deliberate arc at 90%.
- **When a figure claims points are collinear, the drawn line must span all of them.** Take the
  extremes along the line direction, never an arbitrary pair. `steiner-line` spanned `rs[0]` to
  `rs[2]` while the middle reflection lay *outside* that pair, so the third point rendered as a dot
  floating in empty space — a figure that visually contradicts its own caption while sitting
  0.02px from the line. **No gate covers this**, and two attempts to build one both reached a 100%
  false-positive rate: on 279 panels the "collinear but past the end" test flagged 41 legitimate
  cases, and restricting it to same-coloured dots still flagged 8, all of them lattice grids where
  collinear dots are the whole point. Check it by eye and by projecting the points onto the line.
- **Corner/apex pairing is easy to get backwards.** In `equiangular-hexagon-area` the apex where
  two extended sides meet is cut off by the side *between* them; pairing each apex with an adjacent
  side instead produced three non-equilateral slivers that looked fine on screen. Measure the
  triangles you draw.
- **An angle marker ends on its arms.** `angleArc` draws at the radius it is given and does not look at the arms, so a fixed radius on a short arm ran past the arm's end and the arc stopped in empty space (2023 AIME I #12: radius 18 on a 6 px arm), and a marker to a direction whose radius was never drawn floated the same way (`roots-of-unity`). `check-diagrams.py` now fails any angle arc (stroke width 1.8) whose ends are not within 1.5 px of a drawn segment or polygon edge. Fix it by drawing the arm, or a short ray past a short arm, or by taking a radius smaller than the arm. Circle arcs drawn with the helper (`arbelos`, `incircle-excircle-homothety`) are on the checker's `ARC_ALLOW` list.
- **Never assign `DIAGRAMS["id"]` twice.** Six keys had drifted into a second definition that
  silently replaced the first, and for `median-to-hypotenuse` the *discarded* copy was the correct
  one. The checker now fails on a repeated key.
- A vertex dot drawn with a filled circle of `r <= 7` is re-appended to the end of the SVG by
  `tidyDiagram` (`js/app.js`), so it will be hoisted in front of any face. Use a larger radius or an
  unfilled marker on projected solids.
- Add the id to `CARD_DIAGRAM_IDS` in `js/app.js` only if the figure should also show on the section
  list page, not just the detail page.

### 3D figures

Project real $(x,y,z)$ rather than hand-tuning a parallelogram; the helpers live at the top of
`geometry-diagrams.js`. `proj3(O, scale, axes)` gives a projector, `depth3` sorts front to back,
and `box3` returns a wireframe box with the hidden corner's edges already dashed. Two rules came
out of building the first two figures, and both were mistakes first:

- **Use `AX3_ISO` for anything round.** The default `AX3` foreshortens the two horizontal axes
  unequally (0.72 against 1.01), which visibly squashes a ring of spheres. Boxes are fine under it.
- **Solids need opaque fills, painted back to front.** Tangent spheres seen from an angle project
  to *overlapping* circles, which is correct; drawn translucent they read as interpenetrating
  rather than as one in front of another. Opaque fills plus a `depth3` sort fix it.

`angleArc(P, Q, R, radius, ...)` takes the **vertex first**. Passing the vertex second draws the arc
centered on the wrong point, far from where its label sits.

---

## 5. Before you write anything: does it already exist?

Two cards were duplicated this way before the check below was written down. Both times the search
that "proved" the gap was the thing at fault.

```bash
# search NAMES across every data file, including patterns.js. never pipe through head.
grep -rhoE 'name: "[^"]*"' js/data/*.js | grep -iE 'your|topic|words'
```

- **Never pipe a does-this-exist search through `head`.** `grep -riE 'inclusion' js/data/*.js | head -8`
  returned eight keyword hits from other files and cut off before `patterns.js`, which held
  `pie` — a card already tagged on about twenty problems.
- **Search names, not ids.** `pie` would not match a search for "inclusion".
- **Search every file, not the subsection you expect.** `weighted-average` states alligation outright
  but lives in algebra, not in the subsection named "Rates, Work & Mixtures", and was recorded as
  missing because only that subsection was checked.
- **A near-miss is not a duplicate.** `euclids-lemma` alongside `euclidean-algorithm`, or a formula
  card beside a method card that uses it, is the sanctioned "technique and facts" split. But then the
  two must not repeat each other's content: cross-link instead.

---

## 6. Inserting the card safely

Inserting after a card's closing `},` puts your card in the **next** subsection whenever the anchor
was last in its own, because the brace you matched closed the subsection. Insert **before** a card
that sits in the middle of the target subsection, then verify:

```python
subs = [(m.start(), m.group(1)) for m in re.finditer(r'title: "([^"]+)"', src)]
owner = [t for pos, t in subs if pos < src.index('id: "your-card"')][-1]
```

A related trap in the details and examples files: the last entry of an object has **no trailing
comma**, so appending after it produces `...\`` immediately followed by your `"id":` and the parse
fails with `Unexpected string literal`. Add the comma.

### Removing or merging a card safely

The same missing comma makes deletion dangerous, and this one fails silently. The details files
are a series of `Object.assign(window.MATH_DETAILS, {...})` blocks. Deleting an entry with a
pattern like `"old-id": String\.raw\`.*?\`,\n` works for an entry in the middle of a block, but
the last entry of a block ends in `` `\n}); `` with no comma, so the lazy match runs on through the
block's end and the next block's opening and stops at the end of the *following* entry. The file
still parses, so nothing complains. On 2026-09-27 the `digit-sum-mod-9` and `vp-factorial` merges
each took the next card's write-up this way (`recognition-numbers`, `gcd-substitution`); they were
caught only because the census read 554/556.

- Delete by exact span: find the entry's start, then its closing backtick with
  `s.index("`", start + len(head))`, and remove through the comma **if** one follows, otherwise
  through the backtick alone. Never let a pattern decide where the entry ends.
- Afterwards, check that every other card still has its write-up and example.
  `scan-conventions.py` now fails on a card with no write-up (`cards with no write-up: must stay
  0`); it used to report the count and pass.

---

## 7. Verify, in this order

**The handoff rule (2026-10-16).** After every major change, every finished step, and the start of every new step, update "Current state" at the top of `PLAN.md`, add a README changelog entry, and push. New chats start from that block (`CLAUDE.md` sends them there), so it must never be stale.

```bash
jsc js/data/<file>.js                    # a `window` ReferenceError means the parse SUCCEEDED
                                         # (no jsc? tools/jsc-node stands in for it under Node)
jsc tools/validate-problem-db.js         # 0 violations, and check the card count moved as intended
python3 tools/check-diagrams.py          # every panel fits its canvas, no labels collide
python3 tools/check-labels.py            # as rendered: no label on a dot, stroke or label, none moved far
python3 tools/scan-conventions.py        # the census above; fails on any rule marked "must stay 0"
python3 tools/check-lists.py             # list ids resolve, and every route is complete
python3 tools/check-topics.py            # every card carries a topic chip, and no title awards a wrong one
./tools/check-lab.sh                     # the inline script of each lab/ page still parses
python3 tools/check-statements.py        # every statement and figure resolves, no stray markup
python3 tools/find-duplicate-forms.py    # lists formulas stated twice (rule 17); a report, not a gate
python3 tools/build-cross-links.py --seed && python3 tools/build-cross-links.py --report
~/Downloads/competition-math-buildenv/bin/python tools/build-search-index.py   # on the Mac; in the cloud, the venv in §13
```

The search index is rebuilt once at the end of a step that changed cards, not after each card (owner, 2026-10-25). Latest run: 157/187 top-1, MRR 0.906, over 765 cards (2026-10-30, cloud index; 160/187 and 0.910 for the 759-card build that day).

- Bump `?v=` in `index.html` for **every** file you touched, including ones a build step regenerated
  (`search-glossary.js`). The exception is `search-vectors.{json,bin}`, which revalidate themselves.
- Confirm `window.MathSemantic.info().cards` equals the validator's card count before reading any
  search number. If they disagree, the browser is serving a cached data file.
- **Changing only the hash does not reload the document.** To see new data you must navigate to
  `index.html` itself, and a `?nocache=` parameter is the reliable way.
- Measure search with `tools/search-eval.html`, never by eye, and **always compare warm to warm**.
  A cold first run and a warm re-run differ by a point or two because the semantic index loads
  lazily; warm runs are reproducible to the query. Measured 2026-09-20 over 539 cards, the
  original 171 queries give **154 warm**, against a previously recorded warm **155**. The query
  set is now **185**, and the renovation's clearer intros have lifted it to **170/185 warm, MRR
  0.950** (2026-09-27, 556 cards; 172/187 with the two queries added for the 557th card and the
  linear-change-of-variables paraphrase). Two probe sets, `probe-queries.json` (64/78) and
  `probe2-queries.json` (48/77), are run alongside it after every batch to catch regressions
  the labelled set does not cover. Every point lost across this work was traced before
  being accepted, and one was not accepted -- see CONTRIBUTING for the card that had to have its
  keywords narrowed because it out-ranked the general card it specialises.
  Adding a card jostles neighbouring queries by a rank or two; what must not move is the top-1 count.
- On the rendered page: correct breadcrumb, all three write-up headings, the example block, 0
  `.katex-error`, 0 `.card-link-broken`, and no literal `**`.

---

## 8. Topic chips

Every card carries at least one topic chip, and each chip opens the tag page for its label (`#/tag/<label>`, drawn by `renderTagPage()` in `js/app.js`), the same page the Browse by Tag picker opens; old `#/topic/<id>` addresses land there too (2026-10-30). The chips
are derived, not authored: `topicsForCard` (`js/app.js`) runs `TOPIC_RULES` against the card's name,
its keywords, and **its subsection title**. That last ingredient is the one to understand before
adding a subsection or a rule.

- **A title is a weaker signal than a card's own words, and a compound title is weaker still.**
  "Divisor Functions & Totient" matched the modular-arithmetic rule on the word `totient` and put a
  modular chip on nine divisor cards; the Methods subsections are named by SUBJECT, so seventeen
  pure counting methods came out tagged `probability`. Thirty-eight cards carried a wrong chip.
  Two mechanisms fix that and both live next to the rules: tools titles are never fed in at all,
  and `TITLE_STOP` vetoes one topic on one subsection, but only when the card's own words do not
  independently earn it, so nothing correct is lost.
- **Prefer a topic to a subsection for anything that spans files.** `conics` has to reach
  `vertex-form` in algebra and `ellipse-tangent-line` in patterns; `linear-algebra` has to reach the
  six older cards that were already assuming determinants. A cross-file move would change those
  cards' `type` and force a search rebuild, so the cross-section topic is the right tool. Six exist
  for exactly this reason: `conics`, `linear-algebra`, `floors-abs`, `games`, `convexity`,
  `transformations`, alongside the older `trigonometry`, `recursion` and `generating-functions`.
- **Watch for a loose term matching inside a longer word.** `/factor/` matched `cofactor`,
  `factorial` and "scale factor"; `/similar/` put a `triangles` chip on "similar conics";
  a bare `/degree/` matched "second degree equation". Each is now spelled out.
- **A word used in another sense is vetoed per card** in `CARD_TOPIC_STOP` (`js/app.js`). On 2026-10-30 eight cards came off `transformations`, which they had matched on "inversion" (Möbius inversion, Dirichlet convolution), "rotation" or "reflection" used about counting (circular permutations, necklaces, Burnside's lemma, the ballot problem), "algebraic reflection" (Minkowski's inequality) and "translated" (conic sections).
- `tools/check-topics.py` fails on a card with no chip and on any known-bad (subsection, topic)
  pair. It **lifts `TOPIC_RULES`, `TITLE_STOP` and `topicsForCard` straight out of `js/app.js`**
  rather than restating them, so the gate cannot drift from the app. Run it after touching a rule,
  adding a subsection, or renaming one.

## 9. Built-in lists

`js/data/built-in-lists.js` opens by promising that a route is "every card carrying that level and
subject, so a route is complete by construction rather than a hand-picked sample". Nothing enforced
it, and the file is edited by hand, so **every card added to the library silently failed to join the
routes it qualified for**: 14 such gaps had accumulated across six cards before the check existed.
The failure is invisible in the UI -- the route just quietly omits a card the reader was promised.

- `tools/check-lists.py` now enforces it in both directions: a qualifying card missing from a route
  fails, and a non-qualifying card present in one fails too.
- **`tier: "AMC"` maps to two level tags, `AMC10` and `AMC12`.** Comparing the tier string against
  card levels directly reports all four AMC routes as 100% wrong. This is the single easiest thing
  to get wrong when touching that checker.
- A list that is *not* complete by construction must not be `kind: "route"`. "Olympiad Heavy
  Hitters" was tagged one while its own blurb read "Not a syllabus", and held 16 of 192 olympiad
  cards; it is now `kind: "thinking"`, and the four real olympiad routes carry the other 192.
- Sections of one card are reported as advisory, not fatal: that is a presentation call. 36 exist (2026-10-30).
- **A card listed twice in one list is now fatal too.** The route check collects ids into a set, so
  it could never see a duplicate. Moving `conic-sections` into a new Conics subsection and adding a
  Conics section to the two geometry routes left it in "Coordinates & Transformations" as well: it
  rendered twice, under two headings, and every gate passed. `check-lists.py` now reports the card
  and both sections holding it, and it covers curated lists as well as routes.

---

## 10. Touching persisted state

The app keeps six keys in `localStorage`: `mq-lists`, `mq-stars` (read once, to migrate old stars), `mq-settings`, `theme`,
`dykSeen` (the Did you know? entries shown lately, so a reload does not repeat one; a convenience, not exported) and
`mq-recent` (the last 30 cards and problems opened, as `"f:<id>"` / `"p:<slug>"`, for "Continue
where you left off"; a convenience only, so a failed write is silent). Settings → Your progress
exports these and the lab keys to one JSON file (`{ format: "competition-math-reference/progress",
version: 1, exported, data: { <key>: <parsed value> } }`) and imports it back. An import merges
lists (no card leaves a list) and replaces the other keys; a new key belongs in `PROGRESS_KEYS` in
`js/app.js`, and a change of shape bumps `PROGRESS_VERSION`, with the importer still reading the
older versions. The
lab pages keep their own (`mq-quiz-misses`, `mq-flashcards`, `mq-flashcards-prefs`), which the app
never reads. One rule governs all of them, and it exists because breaking it destroyed user data
twice.

- **Settings live under `prefs`.** `saveSettings()` writes `mq-settings` as `{ sections, prefs }`,
  so a lab page reading a setting must read `prefs.notation`, not `notation`. Flashcards read the
  top level at first and silently ignored the Expanded setting on every card.

- **Merge into stored state; never rebuild it from anything derived from the data files.** `BY_ID`
  and `SECTION_IDS` are both empty when a data script fails to load, so code that rebuilds storage
  from them turns a transient outage into permanent loss on the reader's next click. The full
  account, including the reproduction, is in CONTRIBUTING under "Persisted state must never be
  rebuilt from loaded data".
- **Filter for display, not for storage.** `liveCount()` / `liveIds()` exist so a count can ignore
  ids the library cannot currently resolve while the stored list keeps them.
- **A failed write must say so.** Both savers return a boolean and route failure through
  `storageFailed()`, which toasts once per session. `catch (e) {}` on a write path is how a reader
  loses a list without ever being told.

None of this is covered by a gate -- there is no way to assert it from a script. Test it by hand:
point one data file's `?v=` at a nonexistent path, click something, and confirm the stored lists
are untouched.

## 11. Tagging a problem

`{ ref, formulas, strategy }`, optionally `trick` and `trickFormulas`. The entry holds no statement. An AMC or AIME statement is fetched from LIVE by Po-Shen Loh into `js/data/problems/statements/<year>.js` by `tools/fetch-live-statements.py` (statements and answer choices only, never solutions or hints), keyed by the problem's slug, with its figures as SVG files under `js/data/problems/figures/`; the page prints it with the credit "Problem ..., © Mathematical Association of America, used under CC BY-NC-SA 4.0. Text and figures from LIVE by Po-Shen Loh." Never add a statement by hand and never import a solution. Imported displays are unwrapped: LIVE cuts long equations by hand for a phone, and the importer joins a cut that only continues the line above (`unwrap_display` in `tools/fetch-live-statements.py`), keeping real systems, cases, and matrices. `tools/check-statements.py` is the gate: every key a known problem, every figure an SVG that exists, the credit header present.

- `formulas` = the basic tools for the **appropriate** route, not the theoretical minimum. Everything
  reduces to similar triangles and Pythagoras; tagging that way tells a reader nothing.
- `trick` = a shortcut over a feasible standard route. The dividing line is **feasibility, not
  obscurity**: if the problem cannot reasonably be solved without a result, that result is a formula
  however obscure it is.
- Both trick fields are required together; the validator rejects prose without cards and cards
  without prose.
- **The trick is printed as the "Alternatively, ..." paragraph** under the strategy on the problem
  page, and it opens with those words (the validator requires it). Use it when a problem has two
  good routes, an intended one and a faster one; its cards sit in the chain columns with a dashed
  outline. (2026-10-16)
- **Tag the specific card, not the fact under it.** A step that is exactly a chord at a known
  distance from the center cites Length of a Chord, not the Pythagorean Theorem; a cone's volume
  cites Prism, Pyramid, Cylinder, Cone Volumes, not Cone Surface Area; two triangles shown similar
  by their angles cite Triangle Similarity Criteria. The Pythagorean Theorem is cited where a right
  triangle is set up and solved as a step of its own.
- **A geometry problem printed without a figure gets one**, in `js/data/diagrams/problem-diagrams.js`
  as `PROB["<slug>"]`, built with `window.GEO_KIT`. It shows the setup only (the given lengths and
  points, never a computed answer), carries an `ok` self-check, and the page labels it as drawn
  for the app. `check-statements.py` fails on a figure for a problem whose statement already has
  one. A problem given only in coordinates, or with nothing to picture but its answer, gets none.
  A solid is drawn from its real coordinates with `solidEdges`, which dashes the hidden edges.
  A sphere in such a figure is drawn with `sphereOutline` (its true outline under the oblique
  projection, an ellipse), never as a circle. A figure built from a length the conditions force
  (the answer shape) labels only the given numbers. (2026-10-17)
- A trick-only card still lists the problem among its practice problems, with the row rendered
  exactly like any other. The problem page is the only place a trick is labelled.
- **Order of work inside a card:** AMC 10 and AMC 12 problems first, then AMC 8, then HMMT, with
  AIME alongside the AMC 10/12 (Stanley, 2026-10-17).
- **AA similarity versus scaling.** Two triangles shown similar by their angles (parallel lines,
  a shared angle and a right angle) cite Triangle Similarity Criteria; Similar Figures is cited
  only where lengths, areas or volumes are scaled by a known ratio. A strategy states its
  intermediate values, never "Carried through, the answer is". (2026-10-17)
- **A problem no card honestly fits keeps `formulas: []`.** The validator reports it ("no card at all") instead of failing, the app still gives it a page that shows its chain as "Not classified yet", and `Special:Unclassified` lists it. Never tag a card a problem does not use to fill the gap (2011 AIME II #1 and 2013 AIME II #1 once carried Normalization, which neither uses).
- `strategy` is a double-quoted JS string: LaTeX backslashes doubled, no raw `"`, no raw `<`.
- **AMC 10 and AMC 12 share problems, often a whole run of them.** In 2024, AMC 10B #1-5 are the
  same five problems as AMC 12B #1-5, word for word. A shared problem gets **the same cards and the
  same route in both entries** — it is one problem with one best solution, so writing a different
  strategy for the 10 than for the 12 would mean one of them is not the best route. Copy the entry
  and change only the `ref`.
- Detect sharing by comparing the stored statements before writing, not after (`node tools/near-twins.js` lists AMC 12 problems whose statement nearly matches an AMC 10 one), and tag both with `node tools/add-tag.js`. `tools/scan-conventions.py`
  gates on the consequence: two entries with identical strategy text must carry identical `formulas`.

---

## 12. Connected formulas

`js/data/connected.js` gives a few broad cards a curated row of the cards that are part of the
same idea. It renders after Practice Problems as a row of blue card links, each opening the hover
preview, like the Used by methods row (owner, 2026-10-23; they were name chips before, and an
earlier version with a line of text under each name read as a different kind of section). It is
hand-written and means "these belong to this card". 18 hubs carry 96 links (2026-10-23).

- **Only broad cards get one**: a card whose topic is an umbrella over other cards
  (`auxiliary-lines` over the construction cards, `p-adic-valuation` over LTE, Legendre and
  Kummer, `telescoping` over its special forms). A specific result never gets one, and a hub lists
  the cards that are instances or direct parts of it, not every neighbour.
- Each entry is `{ id, note }`. The note says in one line how the card connects. It is not
  displayed; it is the editor's justification, and a link you cannot justify in one line does not
  belong.
- `tools/check-lists.py` fails on a hub or id that does not resolve, a hub listing itself, a
  repeated id, an empty note, and an em dash in a note.


## The Contest profile is a role, not an example (2026-10-10)

(This is the standing rule for the `Contest profile` heading allowed on every formula, method, and pattern card; see the template list near the top.)

The "Contest profile" line says in words how and where the card shows up in contests and what it
is usually paired with. It never carries a worked example: no quoted sample problem, no computed
value, no numbers-and-equals. A reader who wants an example has the Examples section. The gate in
`tools/scan-conventions.py` ("worked examples or formulas in a Contest profile") flags a quoted
phrase that contains a digit, a dollar sign, or starts with a task verb, and any formula that
contains an equals sign with a digit; 62 profiles were rewritten into plain description when it
was added.


## Every claim is proved, or points to the card that proves it (2026-10-10)

Stanley's note on Lucas' Theorem and Odd Entries in a Row of Pascal's Triangle: the cards were
"cool" but did not prove every idea they mentioned. The standard from now on: each Key form and
each named corollary has an argument in Why it works (a lemma, the steps, the conclusion), or it
is a cited theorem whose own card proves it. A long argument goes in a Full proof section. Short
paragraphs stay under 500 characters, so a proof is written as a sequence of short steps. The
proof-depth pass over every card was done in step E (finished 2026-10-25).

## Break up big paragraphs of explanation (2026-10-10)

A long explanation is never one block of prose with inline math. Put the key equation of each step on its own centered line (`$$...$$` as its own paragraph), add a figure where a picture helps (`{{figure:name}}`), and open a step with a plain lead-in ("Step 1, the lemma."; no markdown bold or italics, the scanner rejects them). Keep each paragraph under 500 characters. Applied first to Lucas' Theorem and Odd Entries in a Row of Pascal's Triangle; every new or rewritten card follows it, and the proof-depth pass (plan step E, finished 2026-10-25) applied it.

## Problem text and the Contests box (2026-10-11)

- **Every AMC and AIME problem has its text**, imported from LIVE by `tools/fetch-live-statements.py` (run with `--all` to find new sittings), even when it has no strategy or tags yet. A problem with no card is an entry `{ ref, formulas: [] }` and its page says "Not classified yet"; tagging it is a later, separate step and only ever uses existing cards.
- **The number beside a contest reads "N problems written"** and counts only problems that have a strategy in the app (since 2026-10-24; a problem with cards but no strategy is not counted), not those that have only their text. A contest still to come is listed in `js/data/problems/contests-planned.js`, is hidden until the reader presses Show unwritten contests, and carries no number. Proof-based competitions are not listed for now.
- **Answer choices are blocks.** Each `(A)` to `(E)` line renders as its own block with vertical padding so a fraction can never touch its neighbor; a choice that is a picture is marked `@@ci:file|height@@` and shown small beside its letter.
- **A statement LIVE lacks** is added by hand in `MANUAL_STATEMENTS` in the importer and credited to the source it came from, never to LIVE: Fall 2021 AMC 10B #11 (the AoPS Wiki), and the Fall 2021 AMC 10A and 10B papers typed from the owner's PDFs (`tools/manual_statements.py`, credited to the MAA). The Fall 2021 AMC 12A and 12B come from LIVE, filed there as its 2021 C and D papers.

## List kinds (2026-10-11)

Built-in lists have a `kind`: `route` (a complete syllabus for one tier and subject), `core` (Starting Points: every High-importance card of a subject, so it is regenerated, not hand-picked, when importances change), `configuration`, `thinking`, and `curiosity`. (A `contest` kind, By Contest, existed from 2026-10-25 to 2026-10-31; the owner removed it because the study routes already cover it, and its old addresses open Learn.) A card that belongs to no list is a gap: add it where it fits (the audit found 17, all proof methods).

## Study routes are additive (2026-10-11)

A route is a complete syllabus for one contest tier and one subject, but each is built on the one below it. A card belongs to the route of the lowest tier among its levels (AMC 10 or 12, then AIME, then Olympiad), so the AIME route lists only what is new beyond AMC and the Olympiad route only what is new beyond AIME. A card may repeat in a higher route only when `tools/route-repeats.json` names it, for a card whose use at that level is broader (the pigeonhole principle at AIME versus at an olympiad). `tools/check-lists.py` fails on a missing card and on an unnamed repeat. There is no MATHCOUNTS route.

## Figures are reference cards (2026-10-11)

A shape (a regular polygon of a given side, a cube, a tetrahedron, an equilateral triangle) is filed as a **formula card**, a reference of the facts that belong to the shape, in Polygons & Quadrilaterals or Solid Geometry (3D). It is not a pattern card: a shape is too broad for "what am I looking at" to tell you what to do. The basic facts of one shape live on one card, the general formulas (Quadrilateral Area from Diagonals, Regular Polygon Area, Polygon Angle Sums) stay separate, and no fact is stated on two cards: the other card links to the one that has it. A figure that does carry a real set of clues and moves, such as An Isosceles Trapezoid, stays a pattern.

## Formula lines (2026-10-11)

A browsing card shows at most as many rows of its formulas as the Formula lines setting allows (1, 2, 3, or All; default 1), so write a thumbnail with the most important formula first. A row is one form (forms are separated by `\qquad`) or one row of a `gathered` block. The card's own page always shows every form.

## Pattern and method anatomy (2026-10-11)

What a method card and a pattern card hold, section by section. The scanner reports the counts as warnings.

**A pattern card (a configuration you recognize).**
- The description opens with one plain sentence naming the situation ("This is the configuration of ...", "This is the problem where ..."), then says what is true of it and what the clues decide.
- *Distinguishing clues* is a list of at most five clues, one per bullet, with the disguises (a hidden circle, a hidden rotation) and one near-miss that looks like the pattern and is not ("Not this pattern: ..."). A pattern never contains the solution.
- *Methods and Formulas to Try* may open with the facts the figure carries (a few lines, one display), then lists at most four methods, each with one sentence saying how the move applies to this shape, and the formulas, each with the fact it contributes. `tryFirst` is the top three, in order of use.
- *Common traps*: at most four. *Contest profile*: a role, never an example (rule 13).
- The example does the plainest thing the pattern allows. A pattern that needs two examples is two cards.

**A method card (a move you make).**
- *When to use* names the situations, then the lookalikes where the move is the wrong one.
- *How* is at most six steps, one imperative sentence each, then one short illustration that is not the card's Example.
- *Why it works* says why the move is valid and where it stops being valid.
- *Formulas it uses* has one bullet per card in `uses`, in order. *Common traps*: at most four.
- The test: the move can be said without "and". A method that is two moves is split.

**Shared.** One idea per bullet, no paragraph over 500 characters, plain lead-ins, no bold or italics, links once at first mention.

## A card's thumbnail and description stand on their own (2026-10-11)
From Stanley's review of the cards. The thumbnail (the formula box) and the description must be readable without the write-up: every symbol in the thumbnail is defined there or in the description (not only in the write-up: a $P$ or an $E$ that only Key forms defines is a bug); a formula that needs a hypothesis states it beside the formula (with or without replacement, $ab > -1$, $N$ independent of the terms or a stopping time, $n \ge 2$, an absolute value on an area, which unit a count is in); two counts that could be confused (unit triangles versus cells) get their unit named; `\gg` and `\ll` mean "much greater" and are never used for "at least 2 apart" (write $k_i \ge k_{i+1} + 2$); and a title and its description spell a name the same way. **One fact, one home:** a formula appears on the card that owns it and nowhere else, as a thumbnail form, a Key form, or a description sentence; other cards point to it with one link. A keyword is listed once per card. Mechanical checks in `tools/scan-conventions.py`: a tab or other control character in any `js/data` file, and a repeated keyword inside a card, both fail. `tools/find-duplicate-forms.py` lists formulas on two or more thumbnails and thumbnail formulas repeated in the card's own description, as candidates for a person to judge.

## Lines in figures run to where they meet (2026-10-12)

From Stanley's review of the Iran Lemma figure, whose bisector and contact chord stopped short of the point $K$ they meet at. A line that passes through a labeled point of the figure is drawn all the way to that point: never cut short of it, and never run far past it. Where a line leaves the triangle (or the main shape) to reach the point, the part inside the shape is solid and the part outside is dashed (`"5 4"`), ending at the point; the helper `segIn(P, Q, shape, colour)` in `geometry-diagrams.js` draws exactly that. A midline or a midpoint carries equal-segment tick marks (`ticksOn(P, Q, n, colour)`: one tick for one pair of equal halves, two for the next), so a reader can see that the line joins midpoints without reading the caption. Ticks are for when nothing else shows it (Stanley, 2026-10-12): where the equal parts are already plain from color, labels, or the caption's numbers, use judgment and leave them off. `check-diagrams.py` enforces the first half mechanically: it fails when a drawn line stops short of a dot lying on its extension (reviewed exceptions sit in `LINE_GAP_ALLOW` with a reason). It also fails on raw TeX in figure text: a label or caption is plain text, so a subscript goes in a `<tspan>` (`subT(base, sub)`) inside the figure and in `<sub>`/`<sup>` in a caption, never `d_b` or `e^(iθ)`. A figure placed in a write-up is introduced by the text before it: the paragraph says what the picture is and why it belongs there (the zigzag on the exterior-angle card had no lead-in).

## New cards are registered (2026-10-12)

Every batch of new cards adds one entry to `js/data/new-cards.js` (a label, the date, and the ids in the order written) when it is written. `Special:NewCards` shows the latest batch with each card's kind, subject, and group, and `Special:NewCards/All` lists every batch, newest first, so the additions can be read through in the app. `tools/check-lists.py` fails on an id in a batch that is not a card.

**The new-card checklist (2026-10-25).** A card is finished only when all of these hold; the gates check the ones marked (gate).

1. Approved by the owner, in `QUESTIONS.md` or by asking for it directly (a candidate from practice goes in as the next P-number, at the top of the table; a card asked for directly is recorded there too).
2. The card object in its subject file or `patterns.js`, with every field of §1; written with `tools/add-cards.py`.
3. The write-up (§2) with the headings of its kind, and a Why it works that gives a complete proof (a formula: Key forms, Conditions, Why it works, Useful observations, Applications, Contest profile; a method: When to use, How, Why it works, Formulas it uses, Common traps, Contest profile; a pattern: Distinguishing clues, Methods and Formulas to Try, Common traps, Contest profile).
4. The worked example (§3), using the card's own method, every number checked by computation.
5. A diagram if it is a geometry card (§4), with a computed `ok` self-check (gate: `check-diagrams.py`).
6. A topic chip earned from its name, keywords or group (gate: `check-topics.py`).
7. At least two practice problems (§3b) (gate: `practice-gaps.js --check`).
8. Registered in `js/data/new-cards.js` and placed in every study route it belongs to (`tools/add-to-list.py`) (gate: `check-lists.py`).
9. `?v=` bumped (`python3 tools/bump-versions.py --changed`), every gate passing, then the README changelog, "Current state" and a push. The search index is rebuilt once at the end of a step, not after each card (owner, 2026-10-25).

## Rules recorded from the previous chat (2026-10-16)
See `MIGRATION-NOTES.md` for the full answers.
- **Figures:**
  - every figure shows the fact, never a bare shape;
  - a figure appears only where a picture helps, never as decoration;
  - each figure carries a computed `ok` self-check;
  - thin strips (a row of cards or numbers) may run up to 600 px wide.
- **Formula boxes** are not over-packed. The British Flag Theorem's old box was the example of too much.
- **Dark mode** uses as little pure white as possible.
- **Never re-add** problem search, the in-app find, hints in the UI, a label setting, a level filter, or proof-based competitions.
- **Merged cards** keep their old names as aliases (`tools/link-aliases.json`), so old links still resolve.

## 13. Rules moved here from PLAN.md (2026-10-31)

`PLAN.md` now holds only the steps ahead. These rules lived only there; each is still in force.

**The app's purpose.** It is explanatory, useful and helpful: each card explains why its fact or move works, has a figure wherever a picture helps, covers the idea with its real depth and breadth (missing cases, variants, converses, where it fails), and nothing in the app is redundant.

**Cards.**
- Every new card's tier and importance are judged on evidence (problem tags, how often the idea is used) and shown to the owner in a short table before it is written, never assigned by feel. Importance has five values: high, medium, low, lower (marginal, about once in ten years), lowest (never used; there for completeness or beauty).
- One idea per card. A card shows its kind and one split-oval tag (tier left, importance right), and level text is never repeated beside it.
- Calculus uses an upright, thin-spaced differential: `\int A(h)\,\mathrm{d}h`.
- Prose formula boxes are rewritten only after the owner approves the list; a box that cannot be shortened stays as it is.
- Things LIVE has that the app lacks are listed in `tools/live-missing.md` and wait for the owner's approval.

**Problems.**
- A problem page gets a strategy paragraph, plus "Alternatively, ..." when a second good route exists. Full written solutions are deferred (2026-10-16).
- Problem figures fit one 420 by 280 box (thin strips up to 600 px wide, §Rules recorded from the previous chat).
- The number beside a contest counts only problems with a strategy.
- The routine for one problem, all in one edit: re-solve it and check its statement and figures; tag the best route's specific cards (§11); write the strategy with its intermediate values and a written-out last step (AMC: name the choice letter); check every number, intermediate ones too, with a Python/sympy script (a fresh container needs `pip install sympy scipy`); draw a figure if §11 asks for one.
- Tools: `node tools/practice-scan.js <card>` lists a card's problems (VAGUE = unchecked, or a bare final answer); `node tools/practice-card.js <card>` prints them in full; `node tools/practice-file.js <file>` gives a card file's counts; `node tools/practice-set.js <edits.json>` writes entries (built from Python raw strings) and keeps every field it is not given.
- Citation decisions from the practice pass: a distance in space cites `distance-3d`; a 13-14-15 triangle cites `triangle-13-14-15`; a hexagonal row offset cites `equilateral-triangle-facts`; a fold cites `folded-paper`; a 45-45-90 diagonal cites `special-right-triangles`; grid distances cite `distance-midpoint`; lattice points on a circle cite `lattice-points-circle`; a product of chord pieces cites `power-of-a-point`; a dihedral angle cites `dihedral-angle`; an isosceles trapezoid cut by its altitudes cites the `isosceles-trapezoid` pattern; touching spheres cite `triangle-of-centers` (join the centers), with `cross-section-method` only where one plane holds the whole picture.
- A statement only about a triangle's angles or a trigonometric identity, with no construction, gets no figure (2013 AIME II #15, 2014 AIME II #12).
- Before drawing a figure, check `PROB["<slug>"]` does not exist (`check-statements.py` fails on a duplicate). A new helper used in `problem-diagrams.js` goes into its `GEO_KIT` import list (a missing `rotv` once made the whole file fail to load). `check-diagrams.py` fails when an `ok` self-check prints MISMATCH.

**Working safely.**
- Commit only after every gate passes: chain the commit after the gates with `&&`, never `;`.
- Never edit a source file with a slice-and-replace that is not checked afterwards (a mis-sliced edit to `js/app.js` once deleted a block). Check syntax (`node --check`, `new Function(text)` or `jsc`) after any large edit.
- Serve pages with `python3 -m http.server 8765`, started and killed by PID inside one command, after `curl -s -o /dev/null -w '%{http_code}' localhost:8765/` prints `000` (the port is free). Never `pkill -f http.server`, which kills the calling shell.
- `node tools/check-pages.js '#/f/<id>' ...` prints only light 1280 rows and FAIL rows, so no FAIL means all four modes passed.
- **The search index in a cloud chat:** test `curl -sI https://huggingface.co` and `curl -sI https://us.aws.cdn.hf.co` (the weights also come from `cas-server.xethub.hf.co`), then `python3 -m venv <scratchpad>/buildenv && <scratchpad>/buildenv/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu && <scratchpad>/buildenv/bin/pip install "model2vec[distill]==0.9.0"` (the CPU-only torch first: the default GPU build is several GB and stalled on 2026-10-30) and `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt <scratchpad>/buildenv/bin/python tools/build-search-index.py --backend model2vec`. Otherwise it is rebuilt on the Mac. Then the eval (`tools/search-eval.html`, at least 160/187) and `MathSemantic.info().cards` equal to the card count.


**Interface rules from the seventeenth chat (owner, 2026-10-31):**
- **The Settings preview is drawn by the pages' own code** (`problemDetailHtml`, `learnBookShellHtml`, `learnLessonMainHtml`, `learnDrawerInnerHtml`), so it can never drift from the pages. No screen repeats another's content.
- **Every setting lists its default option first.** `SETTING_DEFAULTS` holds the defaults, and they are the loader's fallbacks.
- **The settings search** finds a setting from its name, its everyday words (the `ALSO` map), its options and its description. A new setting gets its everyday words there.
- **Printing** typesets every card first (`prepareMathForPrint`). Anything that floats or only works on screen is hidden in `@media print`: toasts, menus, drawers, card buttons. A new floating control joins that list.
- **Our own problem figures** show only inside How this problem works, never with the statement, and with no "drawn for this app" note.
- **Wide screens and phones are separate.** A phone change sits inside a phone media query and never alters the wide layout. Sticky elements need `overflow-x: clip`, never `hidden`, on `html` and `body`.
- **Small action buttons** (the new-list +, Show / Hide) are solid tints that only brighten slightly on hover.
- **Dialogs are modal for the keyboard too.** A dialog opens with `trapModal(overlay, firstSelector)` and closes with `releaseModal(overlay, restore)`: the focus goes in, Tab stays inside, the "/" shortcut is off, and the focus returns to the opener, except after a link to a new page. A toggle chip carries `aria-pressed`.
- **Import is all or nothing.** `importProgress` stages every value (lists merged on a copy) and keeps the old ones. If any write fails, everything is put back, and the message says whether the rollback worked. A new stored key joins `PROGRESS_KEYS` and follows the same path.
- **The lab pages** (`lab/`): a page-wide key shortcut never takes Enter or Space from a focused link or button. A failed save shows a one-time notice instead of failing silently.

## 14. Learn: books, chapters, lessons and problem sets (PLAN step L3, 2026-10-31; revised through the seventeenth chat)

The rules for the Learn space. What each book, chapter and lesson holds is in `LEARN-OUTLINE.md`; the plan is `PLAN.md`; the owner's decisions are LQ1 to LQ10 in `QUESTIONS.md`.

**The shelf** (`js/data/learn/shelf.js`) is generated from `LEARN-OUTLINE.md` by `tools/build-learn-shelf.py`, and is never edited by hand.
- A book's parts are `#### Part: Foundations` headings (and so on) inside its `## Book:` section; each chapter after one carries that `part`, and the contents page shows the part as a heading.
- A lesson's tag is either `(Core)` after its title, or the second column of a four-column lesson table (`| L1.2 Exponents and radicals | Core | cards | count |`).
- Chapter codes may have two digits (L10, R10, S12).
- It holds the book ids, the chapter codes, titles and levels, and the lesson codes and titles.
- `gates.sh` fails when it drifts from the outline.
- A lesson's title is changed in the outline, then the shelf is rebuilt.

**Chapter files.** A written chapter is one file, `js/data/learn/<book-id>/<code>.js` (for example `aime-number-theory/n3.js`), loaded from `index.html`. It holds:

```js
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N3"] = {
  lessons: {
    "N3.1": {
      prereq: ["modular-basics"],   // cards assumed (links only)
      cards: ["cycle-hunting"],     // cards taught: the drawer offers them
      body: String.raw`...`,        // the lesson prose (format below)
      exercises: [{ q: String.raw`...`, answer: "3", solution: String.raw`...` }],   // the lesson's own problems
      problems: ["2003 AMC 10A, Problem 16", "..."]   // problem refs, in rising order
    }
  },
  review: ["2008 AMC 10A, Problem 24", "..."]
};
```

A chapter in the approved chapter structure (C5) has no `review`. Its first lesson is the Introduction and its last the Summary, which adds `strategies: [String.raw`...`, ...]` (the Problem Solving Strategies). The closing pages are `reviewProblems: { exercises: [...], problems: [...] }` and `challenge: { exercises: [...], problems: [...] }`. The gate (`tools/check-learn.js`) checks this shape.

The code and title of each lesson come from the shelf, never from this file. A chapter with no file shows its lessons as "Not written yet".

**The lesson prose** follows the write-up prose rules (§2). It is plain paragraphs, with:
- `$...$` and `$$...$$` for math;
- `[[card-id]]` for a card link (it opens in the drawer);
- nothing else: the explanation runs in one piece, and the lesson's problems follow it (the `{{check N}}` markers were retired 2026-10-31).

**A lesson's explanation is one flowing section of paragraphs, with no subheadings** (owner, 2026-10-31: headings cut the reasoning into disjointed pieces). The first paragraph summarizes the lesson: the kind of problem the idea answers (two or three concrete instances), the idea in a sentence, and what it buys. The paragraphs after it explain every nuance in order, each following from the one before, as accurately as is reasonable, and the last says when to reach for the idea and where the chapter goes next. Lesson text is set larger than a card's write-up (15.5px, in the main text colour), since a lesson is read straight through.

**Related cards** (owner, 2026-10-31). The explanation names a card only where the card is the very thing being explained (N3.1 says its listing routine is what [[cycle-hunting|finding the period]] means), and then as part of the sentence. Every other connection goes into the lesson's `related` list, `[{ card, note }]`, shown after the explanation under "Related cards" as one bullet each: the card, then how the lesson's content connects to it. The lesson's "Teaches you about" and "Assumes you know" rows are plain card links. A setting, Browsing → Card links in lessons, chooses whether a card link opens the card in the drawer beside the lesson (the default) or goes to the card's page.

A lesson never restates a card's content: it says why the idea is needed and how it connects, and links the card (one fact, one home). Every number is checked by computation before it is written.

**The lesson's problems and solutions** (owner, 2026-10-31, replacing the checks of LQ5). After the explanation come the lesson's own problems, numbered by lesson ("Problem N3.1.1"), each in its own card with "Jump to solution" (the solution has "Back to problem"), with no answer box and no marking, so they read as practice, not as a test to pass. Then comes "Solutions", a worked solution to each of our own problems, in order, each under the problem stated again in its card ("Solution for Problem N3.1.1:"), and last the contest problems, headed Exercises. That order (our problems, solutions, Exercises) holds on lessons and Introductions. Review Problems and Challenge Problems put the problems together instead: our problems, then the contest problems (headed Contest problems), then the solutions (owner, 2026-11-01).

**Every problem has a label** that names it uniquely (owner, 2026-10-31). A page's contest problems are numbered on from its own problems: if C1.2 has three problems of its own, its contest problems are Problem C1.2.4, C1.2.5, ..., shown as "Problem C1.2.4 · 2009 AIME I #1". Review and Challenge Problems are numbered from their page code (Problem C1.8.1). An old chapter review, with no page code, uses Problem N3.R.1, N3.R.2, .... The contest problems are numbered in the order they are shown, easiest first. Each exercise has `q`, `solution` (a worked solution, not one line), and `answer` (the final answer, kept in the keyboard grammar so it can be checked by script). Every number in a solution is computed.

The math keyboard and its grammar (`js/learn-answer.js`, described below as first built) are kept in the code but unused, at the owner's word, in case typed answers return:
- **Keys:** the digits, the decimal point, `+`, `−`, `×`, `÷`, `^`, `√`, `π`, brackets, a comma, ← and →, backspace, and Clear.
- **Typed forms accepted:** `sqrt(2)`, `sqrt 2`, `√2`, `pi`, `2**3`, `2²`, LaTeX, `x = 3`, `1,000`, "and"/"or" lists, and `±` as two answers; `1 1/2` is refused.
- **Comparison:** by value within $10^{-9}$ relative; a comma list as a set.

**Problem lists** (LQ6). A lesson's problems and a chapter's review are shown as an AoPS-style list. Each problem is a block with:
- its number and the problem's statement, with figures and credit, as on its problem page;
- a box: "Type your solution, notes and/or work here.";
- a Show Solution button.

The button is disabled until the box holds some non-blank text. Pressing it shows the strategy, any "Alternatively, ...", and the card chain. These are always hidden before that, whatever the Strategy setting says (the setting governs problem pages in Practice only). There is no Hint link. A link opens the problem's own page.

**Placement.** Each contest problem is listed in exactly one place on the shelf: one lesson's problems or one review. AMC 10/12 twins count as one problem. Other lessons may link to it in their prose. The gate checks this rule, and that every ref is a problem in the database.

**Addresses.**

| Page | Address |
|---|---|
| the Learn page | `#/learn` |
| a book | `#/learn/<book-id>` |
| How to Use This Book | `#/learn/<book-id>/how-to-use` |
| a chapter | `#/learn/<book-id>/<code>` (code in lower case, for example `#/learn/aime-number-theory/n3`); in the approved structure it shows the X.1 Introduction |
| a lesson | `#/learn/<book-id>/<code>/<n>` (`.../n3/1` is N3.1) |
| a chapter review, or Review Problems | `#/learn/<book-id>/<code>/review` |
| Challenge Problems | `#/learn/<book-id>/<code>/challenge` |

**The book view** (owner, 2026-10-31). The Learn page shows every book as a cover (folded past two rows behind "Show all textbooks") (a coloured rectangle with the series, the title, a drawn motif and the size; `BOOK_MOTIFS` in `js/app.js`). Pressing one opens the book's own page, which has no rail and no header: the cover with the book's line, its size and a Start or Continue button, then the table of contents, each chapter a heading (code, title, level, lessons written) over its lessons and review as links, chapters divided by hairlines (no boxes). The book's other pages follow an online textbook's structure, drawn in the app's own design language (rounded bordered cards, soft tints of the book's colour, pill buttons, hairlines; never solid colour bars and never a box inside a box):
- a rounded rail of tabs on the left: C for the contents, then each chapter's number, all one height with no markers; the current one tinted. Each chapter tab is a scrubber: its height is split into the chapter's pages, pointing or pressing at a height names that page in a small card, and a click or a release opens it;
- a header card attached to the top of the page (it scrolls away with the page; no sticky headers): the cover, then two rows, the chapter's ("Chapter 3") and the lesson's ("Lesson"), each with a small label and two arrow buttons;
- each problem in its first look: a rounded card with its number and contest reference, the statement as plain text (no box inside the card), then the work box with Show Solution to its right (under it on a phone), which becomes Hide Solution once shown; the box starts two lines tall, grows with its text, and cannot be dragged to resize;
- at the bottom, three small plain links (no cards, no background until hovered): ‹ the previous page, Back to top, the next page ›.

On a phone (760 px and narrower) there is no rail and no title bars: a line names the book and the place in it, and a row pinned under the top bar holds the previous page, a menu of every chapter and page, and the next page. The card drawer is a sheet at the bottom that closes when swiped down.

The pages run in one order through the book (each chapter's overview, its lessons, its review; in the approved structure, its Introduction, lessons, Summary, Review Problems and Challenge Problems), which the arrows and the bottom cards follow. A lesson's problems and a review are shown easiest first, by `difficultyScore` (the contest's level plus the place in its paper), whatever order the file lists them in.

The old list addresses are kept (§9).

**Progress** (LQ7) is one new `localStorage` key, `mq-learn`, in `PROGRESS_KEYS` (§10), so Export and Import carry it:

```js
{
  v: 1,
  checks:   { ... },   // from the retired checks; no longer written
  problems: { "<problem slug>": { notes: "<text>", shown: true, hidden: true } },   // hidden: shown, then hidden again
  last:     "<lesson code>"   // the lesson opened last: "Continue learning" on the home page and the book
}
```

- Importing it replaces the current value, like the other non-list keys.
- Attempting a problem keeps its notes. Lessons are not marked read (the owner removed the tick, 2026-10-31); a `read` field in an older file is ignored.
- A shown solution never counts as solved.

**The gate** is `python3 tools/build-learn-shelf.py --check`, which runs `node tools/check-learn.js` on the chapter files. It checks that:
- every card id in a chapter file is a card, and no card is taught (`cards`) in two lessons;
- every `[[link]]` in a lesson's prose is one of its `cards` or `prereq`, so the drawer and the lesson agree;
- each chapter file sits at its book's path and `index.html` loads it;
- every problem ref is in the database;
- no problem is placed twice, and no AMC 10/12 twin pair (the same statement on both papers) is placed as two;
- every lesson problem has a question and a worked solution, and its `answer` (when given) parses in the keyboard grammar;
- no `{{check}}` marker or `checks` field remains;
- each written lesson is on the shelf.

**Two tracks.** The four AMC books (AMC Algebra, Number Theory, Counting & Probability, Geometry; each covers the AMC 10 and AMC 12, its chapters marked Core, Core II or Extension, never AMC 10 or AMC 12) and the AIME books (with the Bridge) are separate tracks (owner's goal, 2026-10-31): a student uses one or the other, so the rules "a card is taught in one lesson" and "a problem is placed once" hold within each track. An AMC lesson may teach a card, or use a problem, that an AIME lesson also teaches or uses. Within a track, an AMC 10/12 twin pair still counts as one problem.

**Chapter structure (approved by the owner after the C5 pilot, 2026-10-31; every new or reworked chapter follows it).** A chapter opens with X.1 Introduction and closes with a Summary lesson, then two pages:
- **Level (owner, 2026-10-31).** The books are high level and not too easy. Basic is not easy: a basic problem uses only simple techniques but can be hard to solve.
- **Importance on every lesson (owner, 2026-10-31).** The chapter's tag (Core, Core II, Extension) is the importance of its idea as a whole; every lesson except the Introduction and the Summary carries its own tag, written in the outline after the lesson's title, "C3.3 Derangements and forbidden positions (Core II)", and shown beside the lesson in the contents and on its page. In the AIME books Core means the early AIME problems and Core II the later ones; a lesson's tag is chosen by judgment from how often, and how late, AIME problems use its cards.
- **No counts beside Review Problems and Challenge Problems** in the contents (owner, 2026-10-31).
- **X.1 Introduction** is the chapter's opening page (the chapter's address shows it). Its Exercises are contest problems that need only the chapter's first ideas, so they are basic but not easy (C5.1: 2023 AMC 10A #20, 2023 AIME II #10, 2026 AIME II #7). It shows the chapter's number and title, then the lesson heading. It gives a short, plain overview of the ideas the chapter teaches (what a recursion is, what a state is), with no motivating question and no deep use cases, then a few comprehension problems with worked solutions. It teaches no card.
- **The lessons** follow, numbered from X.2.
- **The Summary** is the last lesson. It recaps the concepts in a few paragraphs, then gives a bulleted list under the heading Problem Solving Strategies (the `strategies` field).
- **Numbering:** the two closing pages are numbered on from the Summary (C5.9 Review Problems, C5.10 Challenge Problems), and their own problems like a lesson's (Problem C5.9.1).
- **Review Problems** (`reviewProblems`) mostly test comprehension: our own problems first, then a few contest problems, then the worked solutions of our own problems.
- **Challenge Problems** (`challenge`) are harder: contest problems where enough fit, our own when too few do; the page shows our own first, then the contest problems, then the solutions, like Review Problems.
- **Order:** every list of problems runs from easiest to hardest. The contest lists are sorted by difficulty when drawn; our own problems are written in that order.

A chapter not yet moved to this structure keeps its overview page and its chapter review until it is reworked.


**How to Use This Book (owner, 2026-10-31).** Every book's contents open with "Contents and Introduction": Contents (the page itself) and How to Use This Book (`#/learn/<book>/how-to-use`). Its text is one per track, AMC or AIME; only the meaning of Core and Core II differs (AMC: early to middle problems, hard problems; AIME: early AIME problems, later AIME problems). A change to how the books work is written there too.

**Counts on the shelf.** Books and chapters show how many lessons they have, never "X of Y written".
