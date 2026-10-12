// New cards, batch by batch, oldest first, for Special:NewCards (CONVENTIONS, "New cards are
// registered"). Every batch of new cards adds one entry here when it is written, so the latest
// additions can be read through in the app. `ids` are card ids in the order they were written;
// tools/check-lists.py fails on an id that is not a card.
window.NEW_CARD_BATCHES = [
  { label: "Olympiad geometry, batch 1", date: "2026-10-11",
    ids: ["perpendicularity-lemma", "carnots-perpendicularity-theorem", "iran-lemma"] },
  { label: "Olympiad geometry, batch 2", date: "2026-10-12",
    ids: ["steiner-ratio-theorem", "isogonal-line-lemma", "power-of-a-point-linearity"] },
  { label: "Olympiad geometry, batch 3", date: "2026-10-12",
    ids: ["humpty-queue-points", "desargues-involution"] },
  { label: "Concepts from LIVE (AMC)", date: "2026-10-12",
    ids: ["defined-operation", "truth-tellers-logic", "organized-listing", "simulate-the-process", "coins-and-prices", "drawing-without-replacement"] },
  { label: "Card-file scan, batch 1: olympiad geometry", date: "2026-10-12",
    ids: ["shooting-lemma", "dumpty-point", "sqrt-bc-inversion"] },
  { label: "Card-file scan, batch 2: AIME geometry and Nesbitt", date: "2026-10-12",
    ids: ["van-aubel-cevians", "archimedes-broken-chord", "nesbitt-inequality"] },
  { label: "Card-file scan, batch 3: functions, cyclotomics, random walks", date: "2026-10-12",
    ids: ["injectivity-surjectivity", "cyclotomic-polynomials", "gamblers-ruin"] },
  { label: "Card-file scan, batch 4: games, set families, tilings", date: "2026-10-12",
    ids: ["strategy-stealing", "erdos-ko-rado", "tiling-a-board"] }
];
