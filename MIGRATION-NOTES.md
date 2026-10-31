# Notes from the previous chat

The app moved here from an earlier conversation. These are that chat's answers (2026-10-16) to the questions this session asked about the app's history. The previous chat's memory reached back only to about 2026-10-11, and answers marked "unknown" were things only the owner knows. The rules among them are also folded into `CONVENTIONS.md`.

## 1. Statements and tags
- **LIVE access.**
  - `tools/fetch-live-statements.py` ran on the Mac with Python's `urllib`: a plain HTTPS GET of each LIVE page, a simple User-Agent, 1.5 s between requests, and no cookies, login, or API. It reads the JSON embedded in each page and pulls the SVG figures.
  - The raw pages are cached on the Mac in `~/aops-cache/live/`: 211 files, one per paper, such as `aime-1983.json`.
  - The cloud container's 403 came from its own proxy, not from LIVE. (Since 2026-10-23 LIVE is reachable from the cloud, and the concept tags of all 211 papers are cached in `tools/live-cache/`.)
- **Concept tags.** Each cached problem has a `concepts` field, a free-text string of tags separated by semicolons, such as `"logarithm; algebraic manipulation"`. There are 258 distinct strings and about 11,229 tags. The fetch script never imports them; they were used only for the gap table in `tools/live-missing.md`.
- **How the 1,365 problems were tagged:** unknown. Not every tag was checked against a solution: `tools/audit-problem-tags.py` exists because 2026 AIME I #5 carried `rotation-trick`, which its solution never uses.
- **About 3,100 problems were added from LIVE as text only**, on purpose, to be tagged later.
- **`trick` and `trickFormulas`:** unknown.
- **Fall 2021 AMC 12A and 12B:** never supplied. The gap is known and accepted (`tools/live-missing.md`); only 12B #23 has text. Fall 10A and 10B were imported from PDFs. (Update 2026-10-24: LIVE has Fall 12A and 12B as its 2021 AMC 12 C and D papers, and all 50 are imported; only Fall 10B #11 still comes from the AoPS Wiki.)

## 2. The cards' history
- **Order of cards:** known only from about 2026-10-11 (the formula conversion batches, cards N1 to N7, the shape reference cards, then the olympiad batch). The README changelog is the best record of earlier work.
- **Merged into another card** (the old link redirects):
  - Pick's Theorem on a Triangular Grid → Pick's Theorem on Any Lattice;
  - Diagonals of a Regular Hexagon → Regular Hexagon of Side s;
  - sp-substitution → symmetric-polynomial-strategies;
  - Cyclic Quadrilateral Diagonals → Ptolemy's Second Theorem;
  - Same Remainder (pattern) → Subtracting Equal Remainders (method).
- **Deleted:** An Isosceles Triangle, A Right Triangle, A Parallelogram, A Rhombus or Kite, A Rectangle or Square. Their facts went to the reference cards. There is no "Common Figures" group, and no pentagon, icosahedron, or dodecahedron pattern.
- **Removed for good:**
  - problem search and the in-app Ctrl/Cmd+F find;
  - the figures cheat-sheet;
  - proof-based competitions (for now);
  - hints in the UI, a label setting, and a level filter.
- **Tiers and importance:** whether the first tables were reviewed card by card is unknown. Since then, every new card's importance is judged on evidence and shown in a table before writing. The five-level scale was approved from `tools/importance-proposal.md`.
- **The `level` field stays** because `tools/check-lists.py` reads it to decide which study routes a card belongs in. Removing it means changing that check first.

## 3. Search
- **Rebuilding the index.** model2vec 0.9.0 distills `BAAI/bge-base-en-v1.5` into a 256-dimension word table, with numpy 2.4.6, tokenizers 0.22.2, and safetensors 0.8.0 on Python 3.11, in a separate environment:
  - setup: `python3 -m venv env && env/bin/pip install "model2vec[distill]"`;
  - the first run downloads the model from Hugging Face;
  - it works in a cloud container when Hugging Face and its CDN hosts are reachable (first done 2026-10-23: 161/187 top-1, 738 cards); otherwise build on the Mac and commit `search-vectors.*`.
- **The 187 labelled queries:** origin unknown.
- **Target:** at least 160 of 187 top-1. Last full run (2026-10-11): 162/187, top-3 97.3%, MRR 0.922. The older "170/185 warm" figure predates that chat's memory. (Latest, 2026-10-30: 160/187, MRR 0.910, over 759 cards.)

## 4. Style
- **Writing:**
  - paragraphs start with explanation, never with an example;
  - no bold or italic markdown in card text;
  - long explanations are broken up with centered display equations;
  - the Contest profile describes the card's role, with no numbers or worked examples;
  - every claim is proved or points to the card that proves it;
  - every number is checked by computation, and examples are never reused between cards;
  - one link per card, at first mention; named results keep their capitals;
  - the thumbnail and description stand alone (rule 17).
  - There is no em-dash budget or reading-level rule from the owner.
- **Figures:**
  - every figure shows the fact, never a bare shape;
  - figures go where a picture helps, especially in geometry, and none are decorative;
  - contact sheets were used to check them, and each carries a computed self-check;
  - thin strips may run up to 600 px wide;
  - over-packed formula boxes are disliked (the British Flag Theorem was the example);
  - dark mode should use much less pure white.
- **Users:** the owner is also preparing for the ACT. The competition targets are the owner's to fill in.

## 5. Running and publishing
- **Published** on GitHub Pages at https://almond200.github.io/CompMath2.0/, uploaded with GitHub Desktop. Locally it runs with `python3 -m http.server 8642` (`.claude/launch.json`). (Update 2026-10-30: the owner's browser shows the app at https://competition-math-reference.vercel.app/; which host is current is the owner's to confirm.)
- **When files change:**
  - bump `?v=` in `index.html`;
  - bump `STATEMENTS_V` when statement files change;
  - rebuild the search index after card changes (owner, 2026-10-25: once at the end of a step, not after each small edit).
- **MAA permission:** only the credit line is known (© MAA, CC BY-NC-SA 4.0, text and figures from LIVE by Po-Shen Loh).
- **`lab/` pages:** kept and checked by `tools/check-lab.sh`. Their future is decided in Stage 5 of `PLAN.md`, which the owner put on hold (2026-10-25).
- **Wishes not yet in the old plan:**
  - Done by now: the concept cards, the olympiad cards, the formula-box audit, the UI scan, the subject chip, the card-file scan.
  - Still open then: the practice expansion (section 2.7 of `PLAN.md`), and the four pattern/method twins flagged by the duplicate finder (`lte` and `lte-lemma`, and three others). (Update: the twins were answered on 2026-10-12, they stay; the practice expansion is done, every problem having a strategy by 2026-10-24 and every one read in the tag passes of 2026-10-25.)

## 6. Small things
- **The five `check-labels.py` far-move findings:** whether they were accepted on purpose is unknown. They are treated as the font baseline. (There are seven since 2026-10-24; `CLAUDE.md` records the baseline.)
- **Keywords narrowed** so a card stops outranking a more general one: no other cases are known.
- **Reversals:**
  - the problem search was built, shelved, then deleted;
  - the in-app find was added and removed the same day;
  - the "Common Figures" pattern cards were replaced by reference cards;
  - the MATHCOUNTS routes were removed.
