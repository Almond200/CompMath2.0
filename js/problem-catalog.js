// Decode the build output once and keep the same record across all views.
(function (root) {
  "use strict";
  function canonicalId(data, slug) {
    // Convert historical URLs to stored appearances before applying shared-problem aliases.
    const stable = slug.replace(/^(2024|2025|2026)-cmm-/, "$1-chmmc-")
      .replace(/^2021-amc-(10|12)([ab])-/, "2021-spring-amc-$1$2-");
    return data?.aliases[stable] || stable;
  }
  function open(data, typesFor, subjectsFor, eloBin) {
    const bySlug = {}, byPaper = {}, byFamily = {}, familySlugs = {};
    const typesByTags = new Map(), subjectsByTags = new Map();
    const problems = data.rows.map(row => {
      const [paper, num, source, elo, ratingSource, cards, topics, written,
        extraCards = 0, offTree = 0, mainCard = 0, manualTypes = 0, manualSubjects = 0] = row;
      const [family, year, cname] = data.papers[paper];
      const fam = data.families[family], ref = `${year} ${cname}, Problem ${num}`;
      const archiveName = fam === "CMM" ? cname.replace(/^CMM\b/, "CHMMC") : cname;
      const slug = `${year} ${archiveName} ${num}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const formulas = data.tags[cards], tree = data.tags[topics], trickFormulas = data.tags[extraCards];
      const [paperUrl, solutionUrl, solKind, sourceMirror, solAops, urlLabel] = data.links[source];
      const wiki = paperUrl === true || solutionUrl === true
        ? `https://artofproblemsolving.com/wiki/index.php/${year}_${cname.replace(/^Spring /, "").replace(/\s+/g, "_")}_Problems/Problem_${num}`
        : null;
      const url = paperUrl === true ? wiki : paperUrl, solUrl = solutionUrl === true ? wiki : solutionUrl;
      const typesKey = `${cards}/${manualTypes}`, subjectKey = `${cards}/${manualSubjects}/${paper}`;
      if (!typesByTags.has(typesKey)) typesByTags.set(typesKey, typesFor({ types: data.tags[manualTypes], formulas }));
      if (!subjectsByTags.has(subjectKey)) subjectsByTags.set(subjectKey, subjectsFor({ subjects: data.tags[manualSubjects] }, formulas, cname));
      const problem = {
        ref, slug, year, cname, fam, num, url, solUrl, solKind, sourceMirror, solAops, urlLabel,
        elo, eloSource: data.sourcesOfRating[ratingSource], tree, offtree: offTree || "",
        formulas, trickFormulas, main: mainCard || "", hasStrategy: !!written,
        types: typesByTags.get(typesKey), subjects: subjectsByTags.get(subjectKey),
        identity: canonicalId(data, slug), untagged: !formulas.length,
        get strategy() { return root.MATH_PROBLEM_SOLUTIONS?.[slug]?.[0] || ""; },
        get trick() { return root.MATH_PROBLEM_SOLUTIONS?.[slug]?.[1] || ""; },
        get hints() { return root.MATH_PROBLEM_SOLUTIONS?.[slug]?.[2] || []; }
      };
      bySlug[slug] = problem;
      // Historical addresses and saved sets continue to refer to their original appearance.
      if (fam === "CMM") bySlug[slug.replace("-chmmc-", "-cmm-")] = problem;
      if (slug.startsWith("2021-spring-amc-")) bySlug[slug.replace("-spring-", "-")] = problem;
      return problem;
    });
    const resolve = indexes => indexes.map(i => problems[i]);
    for (const [key, indexes] of Object.entries(data.paper)) {
      const [family, year, cname] = data.papers[key], name = data.families[family];
      byPaper[`${year} ${cname}`] = resolve(indexes);
      const years = byFamily[name] ||= {};
      (years[year] ||= []).push(...byPaper[`${year} ${cname}`]);
    }
    const families = data.families.filter(name => byFamily[name]);
    for (const name of families) familySlugs[name.toLowerCase().replace(/[^a-z0-9]+/g, "-")] = name;
    let eloLow = 200, eloHigh = 3800;
    const rated = new Set();
    for (const { elo, fam } of problems) if (Number.isFinite(elo)) {
      rated.add(fam);
      eloLow = Math.min(eloLow, Math.floor(elo / eloBin) * eloBin);
      eloHigh = Math.max(eloHigh, (Math.floor(elo / eloBin) + 1) * eloBin);
    }
    return {
      problems, bySlug, byPaper, byFamily, familySlugs, families, eloLow, eloHigh,
      ratedFamilies: families.filter(name => rated.has(name)),
      byCard: Object.fromEntries(Object.entries(data.card).map(([id, indexes]) => [id, resolve(indexes)])),
      forTopic: id => data.topic[id] ? resolve(data.topic[id]) : [],
      splitCards: data.splitCards
    };
  }
  const api = { open, canonicalId };
  if (typeof module !== "undefined") module.exports = api;
  else root.ProblemCatalog = api;
})(typeof window === "undefined" ? globalThis : window);
