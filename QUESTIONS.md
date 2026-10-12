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
