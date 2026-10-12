# Questions for Stanley

**Answered 2026-10-12:**
- Questions 1 and 2: the twins stay, because a card like LTE is both the formula and the method.
- Question 2: the 39 descriptions define their symbols without restating the thumbnail formula, unless they add something; the paragraph may carry more explanation instead.
- Question 3: approved; the subsection goes right after Advanced Triangle Theorems, not at the bottom.

These are being carried out.

Things found while working through PLAN.md that are style or judgement calls rather than verified errors. Verified errors are fixed straight away and recorded in the README; everything here waits for your word. Newest at the bottom of each section.

## Duplicates and style (rule 17)
1. **Method/formula twins** that `tools/find-duplicate-forms.py` finds: the same formula on both cards' thumbnails. They may be deliberate, since a method can quote the formula it uses. Keep them as they are, or move the formula to one card and point from the other?
   - `lte` and `lte-lemma`: $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$
   - `poly-divisible-linear` and `reduce-divisibility-constant`: $n + a \mid P(n) \iff n + a \mid P(-a)$
   - `cycle-hunting` and `periodic-sequences`: $a_{n+T} = a_n \implies \dots$
   - `area-method` and `cevian-area-ratio`: $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$
2. **39 cards whose description restates a formula from their own thumbnail**, usually while defining its symbols (for example Heron's Formula, the Law of Sines, Stewart's Theorem, Binet's Formula, Expected Value). Rule 17 wants the symbols defined, so restating can be the clearest way to do that. Should they stay, or should each description define the symbols without repeating the formula? (`python3 tools/find-duplicate-forms.py` lists all 39.)

## New Geometry subsection: Olympiad Triangle Lemmas (2.4g)
3. The proposed members, to be moved there (ids unchanged):
   - Iran Lemma
   - Carnot's Perpendicularity Theorem
   - Steiner's Ratio Theorem for Isogonal Cevians
   - Isogonal Line Lemma
   - Humpty and Queue Points
   - the Incenter–Excenter Lemma (now in Triangle Centers & the Euler Line)

   The Perpendicularity Lemma and Linearity of Power of a Point stay where they are, because they are general tools. OK to move these, or change the list?

## Candidate new cards from the card-file scan (2.4c; waiting for your yes)
Each was checked against every card's name, keywords, and description, and none exists. The tier and importance are proposals (rule 12). The evidence is how often the idea appears in solutions at that level, because no practice problem is tagged with these cards yet. Answer per row: yes, no, or a different rating.

| # | Card | Kind, subject / subsection | Tier, importance | Why it is missing / what it adds |
|---|---|---|---|---|
| 1 | Shooting Lemma | formula, geometry / Olympiad Triangle Lemmas | Olympiad, low | A circle tangent internally to the circumcircle at $T$ and to chord $BC$ at $D$: line $TD$ passes through the midpoint $M$ of the arc, and $MB^2 = MD \cdot MT$. Quoted in mixtilinear and Sawayama–Thébault problems; today it only appears inside those proofs. |
| 2 | The Dumpty Point | formula, geometry / Olympiad Triangle Lemmas | Olympiad, lower | The companion of the Humpty point on the symmedian: the center of the spiral similarity sending $AB$ to $CA$, the midpoint of the symmedian chord, on circle $(BOC)$. Pairs with Humpty and Queue. |
| 3 | $\sqrt{bc}$ Inversion | method, geometry / Transformations & Inversion | Olympiad, low | Inversion at $A$ with radius $\sqrt{bc}$ followed by reflection in the bisector swaps $B$ and $C$, and sends the circumcircle to line $BC$. A standard olympiad move with no card yet. |
| 4 | Van Aubel's Cevian Theorem | formula, geometry / Advanced Triangle Theorems | AIME Late, low | For concurrent cevians through $P$: $\frac{AP}{PD} = \frac{AF}{FB} + \frac{AE}{EC}$. The existing Van Aubel card is the theorem about squares on a quadrilateral, so this one has no home. |
| 5 | Archimedes' Broken Chord Theorem | formula, geometry / Circles | AIME Late, lower | The foot of the perpendicular from the arc midpoint bisects the broken chord $AB + BC$. Appears in a few AIME and olympiad problems; currently absent. |
| 6 | Nesbitt's Inequality | formula, algebra / Inequalities | AIME Late, low | $\frac{a}{b+c} + \frac{b}{c+a} + \frac{c}{a+b} \ge \frac32$. Mentioned only as an example on the Hölder card; it is the most-quoted named three-variable inequality. |
| 7 | Injectivity and Surjectivity in Functional Equations | method, algebra / Working with Functions | Olympiad, medium | The first move in most olympiad functional equations: prove the function is injective or surjective, then cancel or substitute. No card covers it; Functional Equation Substitution covers plugging in values only. |
| 8 | Cyclotomic Polynomials | formula, number theory / Special Numbers & Sequences | Olympiad, low | $x^n - 1 = \prod_{d \mid n}\Phi_d(x)$, irreducibility, and prime divisors of $\Phi_n(a)$ being $\equiv 1 \pmod n$ (or dividing $n$). Mentioned on the Eisenstein card only. |
| 9 | Gambler's Ruin | formula, counting / Probability | AIME Early, low | $P(\text{reach } N \text{ from } k) = \frac{k}{N}$ for a fair walk, and $\frac{1 - (q/p)^k}{1 - (q/p)^N}$ otherwise. It appears in AIME problems; today it is only a sentence on First-Step Analysis. |
| 10 | Strategy Stealing and Symmetry Strategies | method, counting / Existence Arguments | AIME Early, low | Games won by mirroring the opponent or by showing the second player cannot win. Sprague–Grundy covers impartial game values but not these two moves. |
| 11 | Erdős–Ko–Rado Theorem | formula, counting / Symmetry, Partitions & Posets | Olympiad, lower | The largest family of pairwise-intersecting $k$-subsets of an $n$-set, $n \ge 2k$, has $\binom{n-1}{k-1}$ members. Completes the extremal-set trio with Sperner and Dilworth. |
| 12 | Tiling a Board | pattern, counting / Strings & Sequences with a Rule (or a new Tilings group) | AMC, low | Dominoes, trominoes, or tiles covering a board. The coloring, recursion, and transfer-matrix methods exist, but no pattern card says "this is a tiling problem" and points to them. |

Not proposed (already covered): the radical center (on Radical Axis), tangents meeting on the symmedian (on Harmonic Quadrilaterals), Vieta jumping, Schur, SOS, LTE variants, Hensel, orders, primitive roots, quadratic reciprocity, the extremal principle, double counting, the probabilistic method, and generating functions.
