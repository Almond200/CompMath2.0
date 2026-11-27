<!-- nav --> [Curriculum](README.md) · Authoring standard

# Authoring standard for the new textbooks

Adopted 2026-11-27 under the owner's decisions D4, D5, D6, D9 and D11 (REVIEW-NOTES.md §3). It governs the twelve new books only; CONVENTIONS §14 continues to govern the 13 live books. Where this file and the specification (`spec/authoring-standards.md`, `spec/teaching-pilots.md`) differ, this file wins, because it records the owner's decisions on the specification's proposals.

**The central priority.** Each chapter is a genuine teaching resource, not an explanatory encyclopedia. A learner who reads it in order should meet a question they understand, see why familiar tools are not enough, discover and justify the new idea, use it, see where it stops working, and be able to choose it later without being told. Explain how an approach is *found*, not only how it is executed.

## 1. The chapter

A chapter has an unnumbered opening, its numbered concept sections, an unnumbered close, and its problem sets.

- **Opening (unnumbered).** One short scene that makes the chapter's question felt: a problem the learner can attempt with what they already know, and a sign that something is missing. It names the prerequisites the chapter assumes, as links to their curriculum IDs (for example "uses G1.7.4, the inscribed angle theorem"). It never opens with a list of theorems or reference cards.
- **Concept sections, numbered exactly as the specification numbers them** (G2.2.1, G2.2.2, …). The section number is the concept ID; nothing is inserted before section 1 or between sections. A section the specification marks optional or extension is labelled *Optional* and nothing later depends on it.
- **Close (unnumbered).** What the learner can now do, the decisions that signal when to use the chapter's ideas, and where the ideas go next. The reference cards for the chapter appear here as recaps, each with one line on what it summarises.
- **Problem sets.** *Review* (comprehension and direct use, mostly our own problems), *Challenge* (harder, mostly archive problems) and, in Volume III, *Mixed* (unlabelled). Delayed revisits of earlier chapters are placed in later chapters' sets, not here.

Chapter introductions and summaries are never numbered, so concept IDs never shift (D4).

## 2. The concept section

Each section has a single purpose recorded in its packet: a new idea, an extension, a contrast, a synthesis, or an independent application (D11). A section that consolidates earlier ones does not repeat their definitions or derivations; it cites them and does new work with them.

A new-idea section usually moves through these stages. They are a progression, not visible headings; never label them with generic names such as "Exploration", "Warm-up" or "Concept 1" (owner, 2026-11-27).

1. **Ask.** Start from a concrete question or a small case the learner can try. Let a prediction or a first attempt happen before anything is revealed.
2. **Develop.** Find the idea from the case: a table, a diagram, a construction or a computation that exposes the pattern. Give the reason the pattern must hold, then state the result with all of its conditions. Derive it; never assert a result the chapter uses without proof or a precise citation.
3. **Show it working.** At least two worked examples with different structures. Each says *why* this approach was chosen and what in the problem signalled it, and at least one shows a natural alternative and why it is longer or fails.
4. **Fade.** A partly worked example (the setup is given, the learner finishes it), then a close independent problem. This replaces hints: the product has no hint buttons and no hint text (standing preference; D4).
5. **Contrast.** A nearby problem where the method fails or needs a new condition, and what changed.
6. **Check.** Short checkpoints that test the definition, the hypotheses and the edge cases, answered before any worked solution is visible.

**Headings.** Meaningful subheadings are allowed where they help, and should be descriptive mathematical phrases such as "When the point is outside the circle" or "Why the product does not depend on the line". Do not impose the same headings on every section (D4).

**Prose.** Short paragraphs; one idea per paragraph. Every claim is proved, computed or cited. Every number is checked by computation. Diagrams follow CONVENTIONS §4 and the label checks. Reference cards are never needed to follow the argument; they appear after the idea, as recaps (D4).

## 3. Problems

- **Placement (D6).** Each contest problem has one primary placement in the new shelf, recorded by its canonical identity (`js/data/problems/problem-aliases.json`; AMC 10/12 twins and the other recorded duplicates count once, and known unrecorded duplicates such as PUMaC A/B twins are named in the packet). A Volume III transfer placement of the same problem is allowed only with a written justification. Independent-transfer and delayed-revisit tasks prefer fresh problems.
- **Cards (D6).** Each reference card has one primary teaching placement in the new shelf. Later chapters may revisit it only to teach a new capability, and say which.
- **Roles.** Every problem in a packet has a role: motivating, direct check, worked, partly worked, independent, contrast, transfer, or delayed revisit, and a placement (section, Review, Challenge or Mixed).
- **Verification.** Every placed problem's answer is recomputed independently of its stored strategy before it is placed; the packet records the check. A problem whose statement is not shown in the app is placed only with its source link.
- **Own problems.** Our own problems fill roles the archive cannot (motivating questions, checkpoints, contrasts). They are written fresh: never adapted from the Think Academy materials or any other copyrighted source.

## 4. Volumes

- **Volume I.** Build the model before any formula; explain quantities in words; fluency with exact arithmetic.
- **Volume II.** Derive the tools, establish their conditions, compare representations, use them in non-routine problems from a recognisable family.
- **Volume III.** Remove method labels gradually; compare at least two strategies when it teaches something; ask for the first useful step; require verification of the exact answer.

There are no Core or Core II labels; volumes establish the progression (D5). Optional and enrichment material is marked as such. A2.22 is deferred and nothing in the core requires it; no differential or integral calculus is taught (D8).

## 5. Sources

The specification is the canonical plan. The Think Academy Year 2 lessons (supplied by the owner, copyrighted) are used only as a guide to sequence and structure: never copy, paraphrase or adapt their text, exercises, examples or figures, and never commit them (YEAR2-SOURCES.md). Contest statements come from the archive with its existing credits. End-of-book Notes (Index, Glossary, References and Credits) are generated for each new book (D9).

## 6. Acceptance

A chapter reaches S5 in TRACKER.md only when: every section's purpose in the packet is met; the prerequisite check passes (no later concept is required without a bridge or an optional label); every number and answer is verified; it reads sequentially as a student without opening a card; and the acceptance gates in `spec/teaching-pilots.md` §6 (prerequisite check, first-step diagnostic, faded guidance, misconception contrast, exact-answer verification, delayed transfer) are satisfied.
