# Tree-only Practice a topic

2026-11-10. The owner requested replacing the existing topic options with the tree first, deferring method-based practice. This implements that scoped T4 step. The tree itself is unchanged: 457 nodes, including the existing narrow Casework and Complementary counting branches. T4b/T5 labels, T6 contest profiles, technique targets and textbooks are not part of this change.

## Behavior

- Practice a topic keeps its existing searchable suggestions, Questions slider, difficulty slider and untimed sessions. The empty field offers the four subjects. Search finds subject, area, topic and subtopic names, including parent context; suggestions show the path and available count, with at most seven matches and no internal scrollbar.
- Every option is a tree node, identified by its stable id. Card names, card keywords and the old non-tree Mixed option no longer populate this picker. Duplicate node names remain distinct through their paths and selected ids. Mathematical names have readable text in the input.
- A node's pool is the union of problems filed directly there and anywhere below it. Membership follows explicit parent links, never dotted-id prefixes or a card's subject/home. A cofiled problem appears once in a branch. Recognized exact-strategy AMC 10/12 twins are collapsed only for an unambiguous same-year/season/paper-letter pair, matching the audit; reworded twins remain the recorded limitation.
- New sets need an answer provider and exclude MAA-voided entries. Existing MAA/AJHSME statements and the ten already-attributed HMMT exact-value prompts are supported. Difficulty filtering applies after forming and deduplicating the selected node's pool. Sampling and ascending-Elo ordering remain as before.
- Counts reflect the actual eligible difficulty-filtered pool. A small topic lowers the Questions maximum instead of adding unrelated problems or repeating entries. The user's requested size is restored, within the available maximum, when they switch back to a larger pool. An unrecognized/ambiguous typed label needs a suggestion choice; it never falls back to a card keyword.
- New records save the node's `topicId` alongside the readable label and stable problem slugs. Previously saved keyword-based sets still resume and grade from their existing slugs. No saved set is regenerated or reclassified.

## Implementation and validation

`js/practice-topics.js` builds the runtime index from `js/data/topic-tree.js` and the problem `tree` fields. `index.html` loads both before the app. `js/app.js` wires the existing picker to this index; the data, cards, tree ids and problem-page chips are unchanged.

`node tests/practice-topics.cjs`, now in the repository gates, checks every real tree pool against the audit oracle, explicit ancestry with moved ids, direct/descendant unions, cofilings, strict/ambiguous twins, eligibility, all ten exact-value prompts, duplicate-name resolution, every node's search reachability, math labels and saved ids. The five existing app Node suites and card-text checks pass.

`CHROME=/usr/bin/chromium COMPMATH_URL=http://localhost:8895 node tools/check-practice-topics.cjs` covers both themes at 1280/375px: tree-only options, root/branch/leaf selection, counts and difficulty, one-problem Casework generation, thirty-problem triangle generation, keyboard selection/Escape, persistent suggestions on scroll, reloading new sets, resuming old sets and generating/grading an untimed HMMT exact-value topic question. No page/KaTeX errors or horizontal overflow. Desktop and mobile screenshots were inspected.

The existing Practice action checks pass all four viewport/theme combinations, and all 36 accessibility scenarios pass. Full repository gates pass. Latest main is integrated additively before handoff; textbooks stay at 37/103 revised chapters.
