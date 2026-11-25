// Rank archive text separately from routing and DOM rendering. Cache indexes on demand.
(function (root) {
  "use strict";
  // Extract the number separately from paper matching. Short forms count only in contest
  // context so a lesson code, a year, or a contest division keeps its original meaning.
  function numberedReference(text) {
    const marker = /(?:\b(?:problems?|prob|questions?|q|p|no|number|num)\s*[.#:]?\s*|#\s*)(\d{1,3})\b(?!\.\d)/i.exec(text);
    const tail = marker || /\s(\d{1,2})\s*$/.exec(text);
    if (!tail || Number(tail[1]) < 1) return null;
    return { num: Number(tail[1]), explicit: !!marker, paper: text.replace(tail[0], ' ').trim() };
  }
  function build(problems, cardName) {
    let records;
    const terms = new Map();
    function textIndex() {
      if (!records) records = problems.map(p => {
        const cards = p.formulas.map(cardName).join(" ").toLowerCase();
        const reference = `${p.ref} ${p.fam} ${p.year}`.toLowerCase();
        const text = [reference, p.strategy, p.types.map(t => t.label).join(" "), cards].join(" ").toLowerCase();
        return { cards, reference, text };
      });
      return records;
    }
    function weights(term) {
      if (!terms.has(term)) {
        const entries = textIndex();
        const scores = Uint8Array.from(entries, ({ cards, reference, text }) =>
          text.includes(term) ? 1 + 3 * cards.includes(term) + 3 * reference.includes(term) : 0);
        if (terms.size >= 64) terms.delete(terms.keys().next().value);
        terms.set(term, scores);
      }
      return terms.get(term);
    }
    function matches(tokens) {
      if (!tokens.length) return [];
      const columns = tokens.map(weights);
      const required = tokens.length >= 3 ? tokens.length - 1 : tokens.length;
      const hits = [];
      for (let i = 0; i < problems.length; i++) {
        let count = 0, weight = 0;
        for (const column of columns) {
          if (column[i]) { count++; weight += column[i]; }
        }
        if (count >= required) hits.push({ p: problems[i], score: count * 10 + weight });
      }
      return hits.sort((a, b) => b.score - a.score || b.p.year - a.p.year || a.p.ref.localeCompare(b.p.ref)).map(hit => hit.p);
    }
    function score(p, tokens) {
      // Reference queries only rank a particular paper, so leave the full text index cold.
      const cards = p.formulas.map(cardName).join(" ");
      const text = [p.ref, p.fam, p.year, p.strategy, p.types.map(t => t.label).join(" "), cards].join(" ").toLowerCase();
      return tokens.reduce((count, token) => count + Number(text.includes(token)), 0);
    }
    return { matches, score };
  }
  const api = { build, numberedReference };
  if (typeof module !== "undefined") module.exports = api;
  else root.ProblemSearch = api;
})(typeof window === "undefined" ? globalThis : window);
