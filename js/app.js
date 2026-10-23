// Competition Math Reference — navigation, rendering, tag-based search, filters, sorting.
(function () {
  const SECTIONS = window.MATH_SECTIONS || [];
  const LEVELS = ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"];
  const LEVEL_LABELS = {
    MATHCOUNTS: "MATHCOUNTS",
    AMC10: "AMC 10",
    AMC12: "AMC 12",
    AIME: "AIME",
    Olympiad: "Olympiad"
  };

  // Query-token synonyms expanded before matching against tags.
  const SYNONYMS = {
    pie: ["inclusion", "exclusion"],
    gcf: ["gcd"],
    hcf: ["gcd"],
    mod: ["modular", "modulus", "remainder"],
    prob: ["probability"],
    perm: ["permutation"],
    combo: ["combination"],
    ev: ["expected", "value"],
    quad: ["quadratic", "quadrilateral"],
    tri: ["triangle"],
    ineq: ["inequality"],
    seq: ["sequence"],
    nt: ["number", "theory"],
    circ: ["circle", "circumradius"],
    // words people type vs. words the entries use
    height: ["altitude"],
    altitude: ["height"],
    mean: ["average"],
    average: ["mean"],
    avg: ["average", "mean"],
    middle: ["midpoint", "median"],
    center: ["centroid", "circumcenter", "incenter"],
    corner: ["vertex"],
    connect: ["join", "joining", "joins"],
    join: ["connect", "connecting"],
    edge: ["side"],
    leg: ["side", "right"],
    count: ["number", "counting"],
    number: ["count"],
    way: ["count", "choose", "arrangements"],
    choose: ["combination", "binomial"],
    pick: ["choose", "combination"],
    arrange: ["permutation", "arrangement"],
    remainder: ["mod", "modular"],
    divisible: ["divides", "divisibility"],
    divisor: ["factor"],
    factor: ["divisor", "factorization"],
    zero: ["root"],
    solution: ["root", "solutions"],
    biggest: ["maximum"],
    largest: ["maximum"],
    max: ["maximum"],
    maximize: ["maximum"],
    smallest: ["minimum"],
    min: ["minimum"],
    minimize: ["minimum"],
    shortest: ["minimum", "distance"],
    distance: ["length"],
    length: ["distance"],
    speed: ["rate"],
    velocity: ["speed", "rate"],
    chance: ["probability"],
    select: ["choose", "combination"],
    row: ["line", "adjacent"],
    sqrt: ["square", "root", "radical"],
    radical: ["root"],
    sum: ["series", "total"],
    total: ["sum"],
    product: ["multiply", "prod"],
    split: ["divides", "ratio", "bisector"],
    cut: ["divide", "regions"],
    piece: ["region", "parts"],
    region: ["pieces"],
    inscribed: ["incircle", "cyclic"],
    circumscribed: ["circumcircle", "tangential"],
    shoestring: ["shoelace"],
    flip: ["coin"],
    die: ["dice"],
    spinner: ["random"],
    slope: ["line", "angle"],
    perp: ["perpendicular"],
    perpendicular: ["altitude", "normal"],
    intersect: ["intersection", "concurrent"],
    touching: ["tangent", "tangency"],
    touch: ["tangent", "tangency"],
    // recursion & sequences
    recursion: ["recurrence", "recursive", "sequence"],
    recursive: ["recurrence", "recursion"],
    recurse: ["recurrence", "recursion"],
    recurrence: ["recursion", "recursive", "sequence"],
    iterate: ["recurrence", "sequence", "iteration"],
    iterative: ["recurrence", "iteration"],
    iteration: ["recurrence", "sequence"],
    recursively: ["recurrence", "sequence"],
    term: ["sequence", "series"],
    nth: ["general", "term", "formula"],
    closedform: ["recurrence", "explicit"],
    fib: ["fibonacci", "recurrence"],
    fibonacci: ["recurrence", "binet"],
    // algebra
    poly: ["polynomial"],
    root: ["zero", "solution"],
    roots: ["zeros", "solutions"],
    solve: ["solution", "root"],
    factorise: ["factor", "factorization"],
    factorize: ["factor", "factorization"],
    expand: ["expansion", "binomial"],
    expansion: ["binomial", "expand"],
    coefficient: ["coefficients", "binomial"],
    log: ["logarithm"],
    logarithm: ["log"],
    exponent: ["power", "exponential"],
    exponential: ["exponent", "power"],
    power: ["exponent", "powers"],
    inequalities: ["inequality"],
    absolute: ["modulus", "absolutevalue"],
    complex: ["imaginary", "argand"],
    imaginary: ["complex"],
    // trig
    trig: ["trigonometry", "trigonometric"],
    trigonometry: ["trig", "sine", "cosine", "tangent"],
    sine: ["sin"],
    cosine: ["cos"],
    // geometry
    pythag: ["pythagorean", "pythagoras"],
    pythagoras: ["pythagorean"],
    pythagorean: ["pythagoras", "hypotenuse"],
    hypotenuse: ["right", "pythagorean"],
    triangle: ["triangular"],
    quadrilateral: ["quad", "cyclic"],
    polygon: ["sides", "regular"],
    hexagon: ["polygon", "regular"],
    pentagon: ["polygon", "regular"],
    diagonal: ["diagonals"],
    circle: ["circular", "arc", "chord"],
    arc: ["circle", "sector"],
    sector: ["circle", "arc"],
    reflect: ["reflection", "mirror"],
    reflection: ["reflect", "mirror", "transformation"],
    rotate: ["rotation", "transformation"],
    rotation: ["rotate", "transformation"],
    transformation: ["reflection", "rotation", "translation"],
    coordinate: ["coordinates", "cartesian"],
    coordinates: ["coordinate"],
    vector: ["vectors", "dot", "cross"],
    // number theory
    modulo: ["modular", "mod", "congruence"],
    congruence: ["modular", "mod"],
    congruent: ["modular", "mod"],
    prime: ["primes", "primality"],
    primes: ["prime"],
    coprime: ["relatively", "gcd", "totient"],
    totient: ["euler", "phi", "coprime"],
    phi: ["totient", "euler"],
    residue: ["modular", "remainder"],
    diophantine: ["integer", "solutions"],
    // counting / probability
    combinatorics: ["counting", "combination"],
    permutations: ["permutation", "arrangement"],
    combinations: ["combination", "binomial"],
    factorial: ["permutation", "combination"],
    expectation: ["expected", "value"],
    probabilities: ["probability"],
    // shapes of answers
    area: ["areas"],
    perimeter: ["circumference"],
    circumference: ["perimeter", "circle"],
    volume: ["solid"],
    ratio: ["proportion", "proportional"],
    proportion: ["ratio", "proportional"]
  };

  // Competition abbreviations → full phrase, so "PoP", "FTA", "CRT", ... resolve.
  const ABBREV = {
    pop: "power of a point",
    fta: "fundamental theorem of algebra",
    crt: "chinese remainder theorem",
    lte: "lifting the exponent",
    flt: "fermat little theorem",
    rrt: "rational root theorem",
    sfft: "simon favorite factoring trick",
    amgm: "am gm inequality",
    cs: "cauchy schwarz inequality",
    pie: "inclusion exclusion"
  };

  // Grammar words dropped from queries before scoring — they carry no signal
  // and would otherwise sink descriptive searches into "partial match" mode.
  const STOPWORDS = new Set([
    "the", "an", "of", "to", "in", "on", "for", "and", "or", "is", "are", "be",
    "was", "it", "its", "as", "by", "at", "we", "you", "my", "me", "do", "does",
    "can", "could", "should", "would", "will", "how", "what", "which", "that",
    "this", "these", "those", "there", "then", "than", "when", "where", "who",
    "why", "not", "no", "if", "into", "onto", "from", "with", "within",
    "between", "about", "over", "under", "each", "every", "all", "any", "some",
    "such", "other", "using", "use", "used", "get", "gets", "find", "finding",
    "given", "relationship", "something", "thing"
  ]);

  // Importance tiers, most-used first. Filtered per section via the settings popup.
  const IMP_TIERS = ["high", "medium", "low", "lower", "lowest"];
  // Contest tiers, the default label: the first stage where a card is needed. AMC is AMC 10/12
  // problems 1 to 25, AIME Early first matters at AIME 1 to 10, AIME Late at AIME 11 to 15, and
  // Olympiad is beyond both. Later stages still use the earlier tricks; the tier says where a
  // card first matters. Importance (High, Medium, Low, Lower, Lowest) is how much a card matters inside its own subsection, whatever its tier; the two share one tag.
  const TIER_KEYS = ["amc", "aime-early", "aime-late", "olympiad"];
  const TIER_RANK = { "amc": 0, "aime-early": 1, "aime-late": 2, "olympiad": 3 };
  const tierKey = f => String(f.tier || "").toLowerCase().replace(/\s+/g, "-");
  // How a section page is laid out. "cards" is the full card grid under subsection headings;
  // "wiki" is a bare A-Z index of names, which drops subsections because the alphabet groups
  // instead. Chosen on the Settings page.
  const LAYOUTS = ["cards", "wiki"];
  // Card-face figures: "none" (the default) or "on" (every card that has a figure), drawn
  // across the card's width. A third mode, "curated" (a hand-picked set of cards), was removed
  // on 2026-10-12; a stored "curated" reads back as "on". Density and tags are booleans in spirit but kept as words so the
  // stored value reads back plainly. Notation picks the expanded form where a card offers
  // one — see latexFor().
  const DIAGRAM_MODES = ["none", "on"];
  const DENSITIES = ["comfortable", "compact", "spacious"];
  const NOTATIONS = ["sigma", "expanded"];
  const TEXT_SIZES = ["normal", "large", "larger"];
  // How many rows of a card's formulas a browsing card shows: 1, 2, 3, or all of them. A card's
  // own page always shows every form.
  const FORMULA_LINES = ["1", "2", "3", "all"];
  // Card order on a section page. "curated" is file order, which is how the cards were written up; "problems" puts the cards the practice problems actually use first, and only
  // falls back to the (subjective) importance tier for the cards no problem uses yet.
  const ORDERS = ["curated", "problems"];
  // A problem page's strategy and card chain: shown at once, or behind a button so the reader
  // can try the problem first (Settings -> Practice).
  const STRATEGY_MODES = ["show", "click"];
  // Figure captions on the browsing cards. A card's own page always shows them, since there
  // the caption is part of the explanation; on the card grid some readers want just the picture.
  const CAPTION_MODES = ["show", "hide"];
  // A card page can carry a Wikipedia-style column of page tools on the right (off by default).
  const TOOLS_MODES = ["off", "on"];
  const SECTION_IDS = SECTIONS.map(s => s.id);

  // Every write to localStorage can fail -- Safari private browsing refuses outright, and
  // any browser refuses at quota. Both writers used to swallow that, so a reader could
  // build a thirty-card list, close the tab and find it gone, having been told nothing at
  // any point. Say it once per session: repeating it on every click would be worse than
  // silence. Declared as a function so the hoisting lets the savers above call it, and the
  // toast is looked up lazily because it is defined further down.
  let storageWarned = false;
  function storageFailed() {
    if (!storageWarned) {
      storageWarned = true;
      try {
        toast("This browser is blocking storage &mdash; lists and settings will not be saved.");
      } catch (e) { /* toast not ready yet; the return value still tells the caller */ }
    }
    return false;
  }

  // Scroll speed: how far one turn of the wheel (or swipe of a trackpad) moves a page. Normal
  // leaves the browser's own scrolling alone; the others scale each wheel step.
  const SCROLL_SPEEDS = ["normal", "slow", "fast"];
  // Where the app opens: the front page, the Formulas space, or the page the reader last had open.
  const START_MODES = ["landing", "formulas", "last"];
  const SCROLL_FACTOR = { normal: 1, slow: 0.6, fast: 1.6 };
  // One filter for the whole app: contest tier and importance (persisted).
  function loadSettings() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem("mq-settings") || "null"); } catch (e) {}
    const F = (s && s.filter) || {};
    const keep = (arr, allowed) => {
      const k = Array.isArray(arr) ? arr.filter(x => allowed.indexOf(x) !== -1) : [];
      return new Set(k.length ? k : allowed);
    };
    const filter = { tiers: keep(F.tiers, TIER_KEYS), importances: keep(F.importances, IMP_TIERS) };
    // "Lowest" arrived after "Lower": a saved filter that shows Lower shows Lowest too, so the
    // cards moved down a step do not vanish for people who had everything switched on.
    if (Array.isArray(F.importances) && F.importances.indexOf("lower") !== -1 && F.importances.indexOf("lowest") === -1) filter.importances.add("lowest");
    // Preferences live alongside the filter in the same store. Theme is the one
    // exception: it keeps its own localStorage key because the pre-paint script in index.html
    // has to read it before this file is even parsed.
    const P = (s && s.prefs) || {};
    const pick = (v, allowed) => allowed.indexOf(v) !== -1 ? v : allowed[0];
    return {
      filter,
      layout: pick(P.layout, LAYOUTS),
      diagrams: pick(P.diagrams === "thumb" || P.diagrams === "curated" || P.diagrams === "all" ? "on" : P.diagrams, DIAGRAM_MODES),
      density: pick(P.density, DENSITIES),
      notation: pick(P.notation, NOTATIONS),
      text: pick(P.text, TEXT_SIZES),
      lines: pick(P.lines, FORMULA_LINES),
      order: pick(P.order, ORDERS),
      strategy: pick(P.strategy, STRATEGY_MODES),
      captions: pick(P.captions, CAPTION_MODES),
      tools: pick(P.tools, TOOLS_MODES),
      cols: pick(P.cols, ["regular", "spacious"]),
      scroll: pick(P.scroll, SCROLL_SPEEDS),
      start: pick(P.start, START_MODES),
      tags: P.tags === false ? false : true,
      autoGroup: P.autoGroup === false ? false : true
    };
  }
  function saveSettings() {
    try {
      const out = {
        filter: { tiers: [...state.filter.tiers], importances: [...state.filter.importances] },
        prefs: {
          layout: state.layout, diagrams: state.diagrams,
          density: state.density, notation: state.notation,
          text: state.text, lines: state.lines, tags: state.tags, autoGroup: state.autoGroup,
          order: state.order, captions: state.captions, cols: state.cols, scroll: state.scroll, start: state.start,
          tools: state.tools, strategy: state.strategy
        }
      };
      localStorage.setItem("mq-settings", JSON.stringify(out));
      return true;
    } catch (e) { return storageFailed(); }
  }
  const _loaded = loadSettings();

  const state = {
    query: "",
    filter: _loaded.filter,      // the one filter: { tiers:Set, importances:Set }
    activeSectionId: SECTIONS.length ? SECTIONS[0].id : null,
    adv: null,                   // advanced search: { sections:Set, subs:Set, topics:Set, desc:string } or null
    openGroup: null,             // sidebar: explicitly opened group, or null to follow the active section
    navCollapsed: null,          // sidebar: "sectionId:subject" of the open subject the reader folded away
    activeSub: null,             // Methods/Patterns: the one subject shown (index into subsections), or null for all
    landing: !location.hash || location.hash === "#",  // the home page, until a section is chosen
    space: "formulas",           // formulas | methods | patterns | practice: which space the page belongs to
    activeTopic: null,           // Formulas: the one topic (subsection index) shown, or null for the topic tiles
    activeCluster: null,         // Methods/Patterns: the one group of the subject shown, or null for its group tiles
    layout: _loaded.layout,      // "cards" or "wiki" — how a section page is drawn
    diagrams: _loaded.diagrams,  // "none" | "on" — figures on the card face
    density: _loaded.density,    // "comfortable" | "spacious" | "compact"
    notation: _loaded.notation,  // "sigma" | "expanded"
    text: _loaded.text,          // "normal" | "large"
    lines: _loaded.lines,        // "1" | "2" | "3" | "all" -- rows of a card's formulas shown while browsing
    order: _loaded.order,        // "tier" | "curated" | "problems" — card order on section pages (tier, then importance)
    captions: _loaded.captions,  // "show" | "hide" — figure captions on the browsing cards
    tools: _loaded.tools,        // "off" | "on" — the page tools column on card pages
    strategy: _loaded.strategy,  // "show" | "click" — a problem page's strategy shown, or behind a button
    cols: _loaded.cols,          // "regular" | "spacious" — how wide the cards in a grid are
    scroll: _loaded.scroll,      // "normal" | "slow" | "fast" — mouse-wheel and trackpad scroll speed
    start: _loaded.start,        // "landing" | "formulas" | "last" — where the app opens when no page is asked for
    tags: _loaded.tags,          // keyword chips on the card face
    autoGroup: _loaded.autoGroup // group a saved list into sections instead of one flat run
  };
  // Four spaces, one per kind, switched from the top bar, each with its own sidebar and tint:
  // FORMULAS (what is true), METHODS (what you can do), PATTERNS (what you are looking at) and
  // PRACTICE (can you use it: the problem database, single problems and study lists). Methods and
  // Patterns are one data section apiece in patterns.js (group "tools", subjects as
  // subsections, groups inside each subject); their sidebar rows are those subjects.
  const bySubject = section => !!section && section.group === "tools";
  const bookOf = section => !bySubject(section) ? "formulas" : section.id === "tools-methods" ? "methods" : "patterns";
  const groupOf = bookOf;
  const BOOKS = {
    formulas: { label: "Formulas", ask: "What is true?", intro: "Facts, theorems, and identities to recall.", groupWord: "topics" },
    methods: { label: "Methods", ask: "What can I do?", intro: "Moves you can make to progress on a problem.", groupWord: "method groups" },
    patterns: { label: "Patterns", ask: "What am I looking at?", intro: "Problem shapes to learn to recognize.", groupWord: "pattern families" }
  };
  const SPACES = {
    formulas: { label: "Formulas", ask: "What is true?" },
    methods: { label: "Methods", ask: "What can I do?" },
    patterns: { label: "Patterns", ask: "What am I looking at?" },
    practice: { label: "Practice", ask: "Can I use it?" }
  };
  // The space a page belongs to; search, settings and topic pages keep the current one.
  function spaceFor(route) {
    if (route.type === "space") return route.name;
    if (route.type === "formula") return bookOf(route.entry.section);
    if (["problems", "problem", "lists", "list"].indexOf(route.type) !== -1) return "practice";
    if (route.type === "home" && !state.landing && !state.query.trim() && !state.adv) {
      return bookOf(SECTIONS.find(x => x.id === state.activeSectionId));
    }
    return null;
  }
  // "Geometry Methods" for one subject of a book split by subject ("Proof Methods" stays as is),
  // else the section's title.
  // A formula subject is its own section, so its page reads "Geometry Formulas" to match.
  const pageTitle = (section, subIdx) =>
    bySubject(section) && subIdx != null && section.subsections[subIdx]
      ? (section.subsections[subIdx].title.endsWith(section.title) ? section.subsections[subIdx].title : `${section.subsections[subIdx].title} ${section.title}`)
      : bookOf(section) === "formulas" ? `${section.title} Formulas` : section.title;
  // The group standing open right now. An explicit click on a group header wins;
  // otherwise it is simply the book the active section lives in.
  // The sidebar shows only the current space's group.
  function openGroupId() {
    return SPACES[state.space] ? state.space : "formulas";
  }
  function activeFilter() {
    return state.filter;
  }

  const $sidebar = document.getElementById("sidebar");
  const $content = document.getElementById("content");
  const $search = document.getElementById("search-input");

  // ---------- Search index ----------

  // Collapse a doubled final consonant left behind by -ing/-ed stripping
  // ("cutt"->"cut", "runn"->"run"), so gerunds/past tenses reach their root.
  function deDouble(s) {
    if (s.length > 2 && s[s.length - 1] === s[s.length - 2] && "bdglmnprt".indexOf(s[s.length - 1]) !== -1) return s.slice(0, -1);
    return s;
  }

  function normWord(w) {
    // Accents fold to their plain letters first: "Erdős" used to lose its "ő" outright and
    // become "erd", which never met the keyword "erdos" (likewise Möbius, Bézout, Hölder).
    w = w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    // "-es" is only a real plural ending after a sibilant ("boxes", "matches",
    // "classes"); elsewhere the "e" belongs to the stem, and stripping it turned
    // "volumes" into "volum" and "circles" into "circl" — so those never matched
    // the singular the reader actually typed.
    if (w.length > 3 && /(?:ss|x|z|ch|sh)es$/.test(w)) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
    else if (w.length > 5 && w.endsWith("ing")) w = deDouble(w.slice(0, -3));   // "cutting"->"cut", "counting"->"count"
    else if (w.length > 4 && w.endsWith("ed")) w = deDouble(w.slice(0, -2));    // "solved"->"solv", "nested"->"nest"
    return w;
  }

  function wordsOf(text) {
    return text.split(/[\s,;:\-–—'’().\/]+/).map(normWord).filter(w => w.length > 1);
  }

  // Queries only. "tan(a+b)" used to tokenize to ["tan", "ab"]: the brackets are separators
  // but "+" is not, so "a+b" survived into normWord, which strips non-alphanumerics and
  // fused it into the junk token "ab". Nothing distinctive reached the ranker. The card
  // keywords already spell the operator out ("sin a plus b", "cos a plus b"), so spelling it
  // out on the query side too makes the two meet -- and doing it here rather than in wordsOf
  // keeps it off the index, where every "+" in a LaTeX field would flood "plus" with
  // occurrences and destroy its IDF.
  const QUERY_NUMWORD = { "2": "two", "3": "three", "4": "four", "5": "five", "6": "six",
                    "7": "seven", "8": "eight", "9": "nine", "10": "ten", "12": "twelve" };
  function spellOperators(q) {
    // "+" never occurs inside a word, so it can always be spelled out. "-" can (cross-ratio,
    // power-of-a-point), so it is only spelled when it joins two SINGLE characters, which is
    // the "a-b" / "x-y" shape and never a hyphenated term.
    //
    // Small standalone numerals are spelled out too, because wordsOf drops any token of length
    // one: "5 spheres tangent" reached the ranker as just "spheres tangent", so the query lost
    // the very word that identifies the card ("five spheres" is a keyword on the Soddy-Gosset
    // card) and the generic "tangent" decided the ranking instead. The numeral is KEPT beside
    // the word rather than replaced, so a two-digit token like "12" still matches cards that
    // write the digits. Query-side only, for the same reason "plus" is: spelling numerals on
    // the index side would flood those words with LaTeX occurrences and destroy their IDF.
    return q.replace(/\+/g, " plus ")
            .replace(/(?<![\w-])([a-z0-9])\s*-\s*([a-z0-9])(?![\w-])/g, "$1 minus $2")
            .replace(/(?<![\w.^-])(\d{1,2})(?![\w.^])/g,
                     (m, d) => QUERY_NUMWORD[d] ? d + " " + QUERY_NUMWORD[d] : m);
  }

  // Index-side tokenization keeps both the raw word and its stem, so queries
  // like "exradius" match "exradii" and vice versa.
  function indexWordsOf(text) {
    const out = [];
    text.split(/[\s,;:\-–—'’().\/]+/).forEach(w => {
      const raw = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (raw.length > 1) {
        out.push(raw);
        const st = normWord(w);
        if (st !== raw && st.length > 1) out.push(st);
      }
    });
    return out;
  }

  // Tokenize the LaTeX itself so symbol-flavored queries like "4R" or "abc"
  // hit the formulas that contain them. Commands (\frac, \sqrt) are dropped;
  // what survives is the letters and numbers the user actually sees.
  function latexTokens(tex) {
    return (tex || "")
      .replace(/\\[a-zA-Z]+/g, " ")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length >= 2 && w.length <= 10);
  }

  // ---------- Math-shape matching ----------
  // Lets a typed formula ("2sqrtab", "b^2-4ac", "n(n+1)/2") find the entry even
  // when the variable letters differ, by comparing normalized formula shapes.

  const MATH_FNS = ["arcsin", "arccos", "arctan", "sqrt", "sin", "cos", "tan", "cot", "sec", "csc",
    "log", "ln", "gcd", "lcm", "min", "max", "binom", "sum", "prod", "pi",
    "theta", "alpha", "beta", "gamma", "phi", "varphi", "omega", "lambda", "mu", "sigma", "tau"];

  // LaTeX → compact form: \frac{a}{b} → (a)/(b), \sqrt → sqrt, commands dropped,
  // braces/spaces/^/_ stripped. "t = 2\sqrt{r_1 r_2}" → "t=2sqrtr1r2".
  function latexToCompact(tex) {
    let s = tex;
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg|displaystyle|quad|qquad|cdot|times)\b/g, "");
    s = s.replace(/\\[,;!]/g, "");
    s = s.replace(/\\text\{[^{}]*\}/g, " ");
    s = s.replace(/\\operatorname\{([^{}]*)\}/g, "$1");
    for (let i = 0; i < 8; i++) {
      const t = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\sqrt\[[^\]]*\]/g, " sqrt");
    s = s.replace(new RegExp("\\\\(" + MATH_FNS.join("|") + ")\\b", "g"), " $1 ");
    s = s.replace(/\\[a-zA-Z]+/g, " ");
    return s.toLowerCase().replace(/[{}_\s\\^]/g, "").replace(/[^a-z0-9+\-/()=.]/g, "");
  }

  // Compact → skeleton: each variable (letter + optional subscript digits)
  // becomes "x", so 2sqrtr1r2 and 2sqrtab both read "2sqrtxx".
  function skeletonOf(compact) {
    let out = "", i = 0;
    while (i < compact.length) {
      const ch = compact[i];
      if (/[a-z]/.test(ch)) {
        let fn = null;
        for (const f of MATH_FNS) if (compact.startsWith(f, i)) { fn = f; break; }
        if (fn) { out += fn; i += fn.length; continue; }
        i++;
        while (i < compact.length && /[0-9]/.test(compact[i])) i++;
        out += "x";
      } else {
        out += ch;
        i++;
      }
    }
    return out;
  }

  // Matchable fragments of a latex string: the whole compact form plus each
  // "="/comma-separated piece. Each fragment keeps a paren-less canonical form
  // (cn) — \frac conversion inserts parens the user would never type — and a
  // variable-blind skeleton (s).
  function mathFragments(tex) {
    const frags = [];
    const seen = new Set();
    const push = c => {
      c = c.replace(/^[(]+|[)]+$/g, "");
      if (c.length < 3 || seen.has(c)) return;
      seen.add(c);
      const cn = c.replace(/[()]/g, "");
      frags.push({ cn, s: skeletonOf(cn) });
    };
    const compact = latexToCompact(tex);
    compact.split(/[=,;]/).forEach(push);
    push(compact);
    return frags;
  }

  // The query's math forms, or null when the query doesn't look like a formula
  // (needs a digit, an operator, or "sqrt" — plain words stay in word search).
  function queryMathForms(rawQuery) {
    const qc = rawQuery.toLowerCase().replace(/\s+/g, "").replace(/[\^{}_\\]/g, "")
      .replace(/[^a-z0-9+\-/()=.]/g, "");
    if (qc.length < 3) return null;
    if (!/[0-9+\-/()=]/.test(qc) && qc.indexOf("sqrt") === -1) return null;
    const qcn = qc.replace(/[()=]/g, "");
    return { qcn, qs: skeletonOf(qcn) };
  }

  function mathMatchScore(entry, mf) {
    if (!mf) return 0;
    let best = 0;
    for (const f of entry.mathFrags) {
      if (f.cn === mf.qcn) best = Math.max(best, 60);
      else if (mf.qcn.length >= 4 && (f.cn.includes(mf.qcn) || mf.qcn.includes(f.cn))) best = Math.max(best, 34);
      if (f.s === mf.qs && mf.qs.length >= 4) best = Math.max(best, 30);
      else if (mf.qs.length >= 5 && (f.s.includes(mf.qs) || mf.qs.includes(f.s))) best = Math.max(best, 16);
    }
    return best;
  }

  // ---------- Topics (derived tags for filtering & bulk study-list building) ----------
  // Every formula is auto-tagged with the topics its name / keywords / subsection
  // match. Topics drive the clickable "#topic" chips and the topic dimension of the
  // study-list builder, so "add everything about circles" is one action.
  const TOPIC_RULES = [
    // Geometry
    { id: "triangles", label: "triangles", sec: ["geometry"], re: /triangl|cevian|incircle|incenter|circumcenter|centroid|orthocenter|median|altitude|angle bisector|law of (sines|cosines)|heron|stewart|ceva|menelaus|euler line|inradius|circumradius|exradi|similar triangl|similar figure|similarity|proportional|intercept|thales|midsegment/ },
    { id: "circles", label: "circles", sec: ["geometry"], re: /circle|circular|circum|chord|arc|tangent|inscribed|cyclic|incircle|circumcircle|radical|power of a point|secant|ptolemy|inversion/ },
    { id: "quadrilaterals", label: "quadrilaterals", sec: ["geometry"], re: /quadrilateral|trapezoid|parallelogram|rectangle|rhombus|brahmagupta|pitot|bretschneider|varignon|\bkite\b/ },
    { id: "polygons", label: "polygons", sec: ["geometry"], re: /polygon|pentagon|hexagon|octagon|decagon|n-gon|apothem/ },
    { id: "solid-geometry", label: "3D geometry", sec: ["geometry"], re: /sphere|\bcone\b|cylinder|tetrahedron|prism|pyramid|volume|surface area|dihedral|\bsolid\b|octahedron|\bcube\b|frustum|skew/ },
    { id: "coordinate-geometry", label: "coordinates", sec: ["geometry"], re: /coordinate|shoelace|distance formula|\bslope\b|lattice|pick|section formula|vector|dot product|cross product|barycentric/ },
    { id: "angles", label: "angles", sec: ["geometry"], re: /\bangle|inscribed|degree measure|\d+\s*degree|bisector|directed/ },
    // Algebra
    { id: "polynomials", label: "polynomials", sec: ["algebra"], re: /polynomial|vieta|factoriz|factor theorem|factoring|factored|factor pair|quadratic|discriminant|remainder theorem|rational root|symmetric function|newton|conjugate root|descartes|palindrom/ },
    { id: "sequences-series", label: "sequences & series", sec: ["algebra"], re: /sequence|series|arithmetic|geometric|telescop|recurrence|fibonacci|progression|summation|partial sum/ },
    { id: "inequalities", label: "inequalities", sec: ["algebra"], re: /inequalit|am.?gm|cauchy|schwarz|jensen|rearrangement|bernoulli|muirhead|maclaurin|smoothing|tangent line trick|trivial inequality|power mean|normalization/ },
    { id: "exponents-logs", label: "exponents & logs", sec: ["algebra"], re: /logarithm|\blog\b|exponent|power law/ },
    { id: "complex-numbers", label: "complex numbers", sec: ["algebra"], re: /complex|imaginary|argand|de moivre|root of unity|roots of unity|conjugate|\bcis\b/ },
    { id: "trigonometry", label: "trigonometry", re: /trig|sine|cosine|tangent ratio|angle addition|double angle|half angle|product.to.sum|sum.to.product|law of (sines|cosines)|\bsin\b|\bcos\b|\btan\b|pythagorean identity|common-angle/ },
    { id: "radicals", label: "radicals", sec: ["algebra"], re: /radical|square root|denest|\bsurd\b|nested radical/ },
    { id: "rates", label: "rates & work", sec: ["algebra"], re: /\brate\b|work rate|mixture|\bspeed\b|average speed|weighted average/ },
    { id: "statistics", label: "statistics & percents", sec: ["algebra"], re: /statistic|\bmedian\b|\bmode\b|percent/ },
    { id: "functions", label: "functions", sec: ["algebra"], re: /functional equation|\bfunction\b|composition|involution/ },
    // Number Theory
    { id: "primes", label: "primes", sec: ["number-theory"], re: /prime|factoriz|sieve|valuation|legendre|factorial|wilson/ },
    { id: "modular-arithmetic", label: "modular arithmetic", sec: ["number-theory"], re: /\bmod|congru|residue|fermat|euler|totient|\border\b|primitive root|chinese remainder|\bcrt\b|quadratic residue|lifting the exponent/ },
    { id: "divisors", label: "divisors", sec: ["number-theory"], re: /divisor|totient|\btau\b|sigma|multiplicative|number of divisors|sum of divisors/ },
    { id: "gcd", label: "gcd & divisibility", sec: ["number-theory"], re: /\bgcd\b|\blcm\b|divisib|bezout|euclid|coprime/ },
    { id: "diophantine", label: "diophantine", sec: ["number-theory"], re: /diophantine|\bpell\b|pythagorean triple|frobenius|chicken mcnugget|sum of two squares|vieta jumping|\bcoin\b/ },
    { id: "digits", label: "digits & bases", sec: ["number-theory"], re: /digit|\bbase\b|decimal|repunit|repeating/ },
    // Counting
    { id: "combinatorics", label: "combinatorics", sec: ["counting"], re: /combination|combinatori|permutation|binomial|choose|factorial|arrangement|counting|hockey stick|vandermonde|multinomial|catalan/ },
    { id: "probability", label: "probability", sec: ["counting"], re: /probab|expected|random|\bodds\b|variance|distribution|\bbayes\b/ },
    { id: "expected-value", label: "expected value", sec: ["counting"], re: /expected value|expectation|linearity of expectation/ },
    { id: "recursion", label: "recursion", re: /recursi|recurrence|fibonacci|catalan/ },
    { id: "generating-functions", label: "generating functions", re: /generating function/ },
    { id: "stars-bars", label: "stars & bars", sec: ["counting"], re: /stars and bars|distribut|partition|balls|boxes|composition/ },
    { id: "pigeonhole", label: "pigeonhole", re: /pigeonhole|double counting|handshake/ },
    { id: "graph-theory", label: "graphs", sec: ["counting"], re: /\bgraph|vertex|vertices|\bedge|euler.{0,3}formula|planar|region|\btree\b|degree sum/ },
    // Cross-section topics. These carry no `sec` on purpose: each names a cluster
    // the taxonomy splits across several files, which is the case for topics over
    // subsections -- `conics` has to reach vertex-form in algebra and
    // ellipse-tangent-line in patterns, and `linear-algebra` has to reach the six
    // older cards that were quietly assuming determinants and matrix powers.
    { id: "conics", label: "conics", re: /conic|ellipse|hyperbol|parabola|eccentricit|directrix|latus rectum|asymptote|focal/ },
    { id: "linear-algebra", label: "matrices & determinants", re: /matri|determinant|eigen|cofactor|cramer|linear system|row operation|sarrus/ },
    { id: "floors-abs", label: "floors & absolute value", re: /floor function|\bfloor\b|fractional part|ceiling|absolute value|\bhermite\b|beatty|continued fraction|farey|mediant/ },
    { id: "games", label: "games", re: /\bnim\b|sprague|grundy|losing position|winning position|take-away|turn-based|first player|combinatorial game/ },
    { id: "convexity", label: "convexity", re: /convex hull|convex position|\bconvex\b|helly|sylvester.gallai|general position/ },
    { id: "transformations", label: "transformations", re: /reflect|rotation|rotate|homothet|dilation|spiral similarity|affine|isometr|\binversion\b|translat/ }
  ];
  const TOPICS_BY_ID = {};
  TOPIC_RULES.forEach(t => { TOPICS_BY_ID[t.id] = t; });
  // "methods" is a virtual topic keyed off the card type, not a pattern.
  const METHODS_TOPIC = { id: "methods", label: "methods" };
  TOPICS_BY_ID.methods = METHODS_TOPIC;

  // A subsection's TITLE is part of the haystack, which is mostly what you want:
  // "Graph Theory" earns its cards the graphs chip without every card spelling it
  // out. But a title is a weaker signal than a card's own words, and two classes of
  // title were awarding topics that are simply wrong for the cards underneath them.
  //
  //   1. The Methods and Patterns subsections are named by SUBJECT -- "Geometry",
  //      "Counting & Probability" -- so seventeen pure counting methods were coming
  //      out tagged `probability`. Subject names are not topics, which is the same
  //      rule autoSections already follows further down this file.
  //   2. A compound title applies only to part of its own contents. "Divisor
  //      Functions & Totient" matched the modular-arithmetic rule on "totient" and
  //      put a modular chip on nine divisor cards.
  //
  // So: never feed a tools title, and let TITLE_STOP veto a specific topic on a
  // specific subsection -- but only when the card's OWN words do not also earn it,
  // so a card that genuinely belongs keeps its chip. `tools/check-topics.py` lifts
  // TOPIC_RULES, TITLE_STOP and topicsForCard straight out of this file and fails on
  // any of these pairs reappearing, so the rules and the gate cannot drift apart.
  const TITLE_STOP = {
    "Divisor Functions & Totient": ["modular-arithmetic"],
    "Floors, Radicals & Absolute Value": ["radicals"],
    "Symmetry, Partitions & Posets": ["stars-bars"],
    "Stars & Bars / Distributions": ["probability"]
  };
  // A card's own words can still over-reach: a keyword that names a use, not the
  // topic. Rationalizing lists "telescoping" and "conjugate", which awarded it the
  // sequences and complex-numbers chips, and a problem page shows every chip of
  // every card it cites. CARD_TOPIC_STOP vetoes a topic for one card by id; add a
  // card here when the practice pass finds a problem page with a wrong chip.
  const CARD_TOPIC_STOP = {
    "rationalizing": ["sequences-series", "complex-numbers"]
  };

  function topicsForCard(f, sub, section, subjectId) {
    const own = (f.name + " " + f.keywords.join(" ")).toLowerCase();
    const hay = section.group === "tools" ? own : own + " " + sub.title.toLowerCase();
    const stop = TITLE_STOP[sub.title] || [];
    const cardStop = CARD_TOPIC_STOP[f.id] || [];
    const out = TOPIC_RULES.filter(t => {
      if (cardStop.indexOf(t.id) !== -1) return false;
      if (t.sec && t.sec.indexOf(subjectId) === -1) return false;
      if (!t.re || !t.re.test(hay)) return false;
      if (stop.indexOf(t.id) !== -1 && !t.re.test(own)) return false;
      return true;
    });
    return f.type === "method" ? out.concat(METHODS_TOPIC) : out;
  }

  // General concept tags added to cards that clearly involve them but didn't spell
  // them out in keywords — so browsing a tag like "incenter" surfaces every card
  // about it. Merged into keywords at build time, so search, the tag browser, and
  // the on-card tag chips all pick them up.
  const EXTRA_TAGS = {
    "law-of-sines": ["circumcircle", "circumradius"],
    "median-to-hypotenuse": ["circumcircle", "circumradius"],
    "medial-triangle": ["nine-point circle", "centroid", "circumcircle"],
    "orthic-triangle": ["nine-point circle", "circumradius"],
    "excentral-triangle": ["circumcircle", "nine-point circle"],
    "contact-triangle": ["incircle", "incenter", "concurrent"],
    "symmedian-lemoine": ["circumcircle", "reflection"],
    "center-distance-formulas": ["circumcenter", "circumcircle"],
    "isogonal-conjugate": ["orthocenter", "circumcenter", "incenter"],
    "altitude-bisector-angle": ["circumcenter", "orthocenter"],
    "orthocentric-system": ["circumcenter"],
    "nine-point-circle": ["orthocenter"],
    "gergonne-nagel-points": ["incenter", "concurrent"],
    "angle-bisector-theorem": ["incenter"],
    "triangle-center-angles": ["angle bisector"],
    "feuerbach-theorem": ["nine-point circle", "incircle"],
    "tangent-facts": ["tangent line"],
    "apollonius-circle": ["perpendicular bisector"],
    "regular-polygon-area": ["circumradius"],
    "centroid-division": ["midpoint"],
    "section-formula": ["midpoint"],
    "isotomic-conjugate": ["cevian"],
    "pedal-triangle": ["circumcircle"],
    "barycentric-coordinates": ["collinear", "concurrent"],
    "coordinate-bash": ["collinear"],
    "area-method": ["collinear"],
    "complex-bash": ["collinear", "concurrent"],
    "pole-polar": ["collinear"],
    "directed-angles": ["concyclic", "collinear"]
  };

  // Broad, curated tags for building study lists: one label covering a whole family of
  // cards, so "triangle centers" can be selected in advanced search and turned into a list
  // in one move. Deliberately NOT merged into f.keywords the way EXTRA_TAGS is, because
  // keywords render as chips on the card face and the face is already at its six-chip cap.
  // These live in entry.groupTags and reach only search, the advanced picker, and filtering.
  const TAG_GROUPS = {
    "transformations & symmetry": [
      "reflection-coordinates", "reflection-composition", "rotation-90",
      "rotation-reflection-matrices", "rotation-center", "rotation-trick",
      "spiral-similarity", "homothety-monge", "affine-transformations",
      "inversion-properties", "reflect-across-the-line", "perpendicular-bisector-locus"
    ],
    "conics": [
      "conic-sections", "ellipse-properties", "hyperbola-properties", "parabola-focus-directrix",
      "eccentricity", "conic-classification", "conic-reflective-property", "ellipse-tangent-line",
      "circle-equation", "vertex-form", "completing-the-square"
    ],
    "matrices & determinants": [
      "determinant-basics", "determinant-geometric", "cofactor-expansion", "matrix-multiplication",
      "cramers-rule", "eigenvalues-characteristic", "add-all-equations",
      "rotation-reflection-matrices", "cayley-menger", "matrix-tree-theorem", "lgv-lemma",
      "transfer-matrix-method", "shoelace-formula", "cross-product-area", "vector-dot-product",
      "vector-projection"
    ],
    "triangle centers": [
      "euler-line-ratio", "euler-distance-theorem", "nine-point-circle", "simson-line",
      "symmedian-lemoine", "lemoine-point", "spieker-point", "gergonne-nagel-points",
      "incenter-excenter-lemma", "orthocenter-properties", "fermat-point", "feuerbach-theorem",
      "center-distance-formulas", "triangle-center-angles", "orthocentric-system",
      "brocard-angle", "carnots-theorem", "leibniz-formula", "incenter-coordinates",
      "medial-triangle", "orthic-triangle", "excentral-triangle", "contact-triangle",
      "euler-line-parallel-side", "rotation-center",
      "isogonal-conjugate", "isotomic-conjugate", "pedal-triangle", "centroid-division"
    ],
    "circle theorems": [
      "power-of-a-point", "ptolemys-theorem", "inscribed-angle-theorem", "tangent-chord-angle",
      "angle-chord-secant", "tangent-facts", "two-tangents-angle", "common-tangent-lengths",
      "radical-axis", "butterfly-theorem", "miquels-theorem", "harmonic-quadrilateral",
      "ptolemy-second-theorem", "circle-equation", "circular-segment", "brahmaguptas-formula",
      "pitots-theorem", "descartes-circle-theorem", "caseys-theorem", "mixtilinear-incircle",
      "tangent-circles"
    ],
    "triangle areas": [
      "herons-formula", "trig-area", "triangle-area-standard", "shoelace-formula",
      "inradius-area", "circumradius-area", "exradii", "shared-angle-area-ratio",
      "cevian-area-ratio", "rouths-theorem", "area-method", "picks-theorem"
    ],
    "counting basics": [
      "permutations-combinations", "circular-permutations", "stars-and-bars", "pie",
      "complementary-counting", "counting-blocks", "constructive-counting", "casework-method",
      "bijection-method", "surjections", "multinomial-theorem", "handshakes-diagonals"
    ],
    "modular arithmetic": [
      "fermats-little-theorem", "eulers-totient", "crt", "multiplicative-order",
      "modular-inverse", "squares-mod-small", "wilsons-theorem", "lte",
      "hensel-lifting", "periodic-sequences", "choose-modulus", "divisibility-rules"
    ],
    "inequalities": [
      "am-gm", "cauchy-schwarz", "jensens-inequality", "power-mean-inequality",
      "rearrangement", "chebyshev-sum-inequality", "holders-inequality", "minkowski-inequality",
      "muirheads-inequality", "schurs-inequality", "maclaurin-inequality", "karamata-inequality",
      "bernoulli-inequality", "trivial-inequality", "sos-method", "smoothing-method",
      "tangent-line-trick", "normalization", "abs-triangle-inequality"
    ],
    "polynomial roots": [
      "vietas-general", "newtons-sums", "rational-root-theorem", "factor-remainder-theorem",
      "symmetric-polynomial-strategies", "root-transformations", "palindromic-polynomials",
      "lagrange-interpolation", "subtract-and-factor", "coefficient-extraction",
      "eisenstein-criterion", "conjugate-root-theorems", "descartes-rule-signs"
    ],
    "sequences": [
      "arithmetic-series", "geometric-series", "telescoping", "linear-recurrence",
      "first-order-recurrence", "finite-differences", "periodic-sequences", "power-sums",
      "double-summation", "recursive-counting", "catalan-numbers", "recursive-counting"
    ],
    "expected value": [
      "expected-value", "indicator-variables", "states-recursion-prob", "binomial-probability",
      "geometric-distribution", "basic-probability", "symmetry-probability",
      "geometric-probability", "bayes-theorem", "probability-generating-functions"
    ],
    "3d geometry": [
      "prism-pyramid-volumes", "sphere-formulas", "cone-formulas", "frustum-volume",
      "space-diagonal", "regular-tetrahedron", "regular-octahedron", "eulers-polyhedron-formula",
      "de-guas-theorem", "cayley-menger", "isosceles-tetrahedron", "tetrahedron-centroid",
      "point-plane-distance", "plane-intercept-form", "skew-lines-distance", "solid-tactics",
      "cross-section-method", "unfold-the-surface", "cavalieris-principle", "pappus-centroid",
      "insphere-radius", "descartes-sphere-theorem", "cross-product-area"
    ],
    "binomial coefficients": [
      "alternating-squared-binomials", "binomial-row-sums", "committee-chair", "hockey-stick",
      "multinomial-theorem", "pascal-parity", "pascals-identity", "vandermonde",
      "weighted-binomial-sums"
    ],
    "complex numbers": [
      "complex-basics", "de-moivre", "eulers-formula", "roots-of-unity",
      "roots-unity-distance-product"
    ],
    "coordinate geometry": [
      "angle-between-lines", "british-flag-theorem", "circle-equation", "conic-sections",
      "distance-midpoint", "incenter-coordinates", "line-forms", "picks-theorem",
      "point-line-distance", "reflection-coordinates", "rotation-90", "section-formula",
      "shoelace-formula", "vector-dot-product"
    ],
    "cyclic quadrilaterals": [
      "brahmaguptas-formula", "bretschneiders-formula", "cyclic-opposite-angles",
      "ptolemy-second-theorem", "cyclic-quad-radius", "euler-quadrilateral", "newtons-line",
      "pascals-theorem", "pitots-theorem", "ptolemy-equilateral", "ptolemys-inequality",
      "ptolemys-theorem", "van-aubel", "varignons-theorem"
    ],
    "digits and bases": [
      "base-conversion", "digit-count", "repeating-decimals", "terminating-decimals"
    ],
    "diophantine": [
      "cauchy-davenport", "chevalley-warning", "chicken-mcnugget", "difference-of-squares-rep",
      "erdos-ginzburg-ziv", "factor-pair-counting", "pell-equation", "pythagorean-triples",
      "sum-of-three-squares", "sum-of-two-squares", "thues-lemma"
    ],
    "divisor functions": [
      "coprime-residue-sum", "dirichlet-convolution", "eulers-totient", "lcm-pair-counting",
      "mobius-inversion", "multiplicative-functions", "number-of-divisors",
      "perfect-square-divisors", "product-of-divisors", "sigma-parity", "sum-of-divisors",
      "totient-divisor-sum"
    ],
    "floors and radicals": [
      "absolute-value-rules", "abs-value-relations", "abs-value-graphing", "floor-basics",
      "hermite-identity", "ramanujan-nested-radical", "rationalizing"
    ],
    "graph theory": [
      "cayleys-formula", "eulerian-paths", "graph-coloring", "halls-marriage", "konigs-theorem",
      "lgv-lemma", "matrix-tree-theorem", "planar-graph-bound", "plane-regions",
      "turans-theorem"
    ],
    "logarithms": [
      "change-of-base", "exponent-laws", "log-rules", "log-swap-identity"
    ],
    "pigeonhole and extremal": [
      "erdos-szekeres", "extremal-principle", "handshake-lemma", "pigeonhole", "ramsey-33"
    ],
    "primes and factorials": [
      "bertrands-postulate", "consecutive-product-factorial", "floor-multiples",
      "kummers-theorem", "legendres-formula", "lucas-theorem", "p-adic-valuation",
      "prime-divides-binomial", "primes-6k", "trailing-zeros"
    ],
    "trigonometry": [
      "angle-addition", "arctan-telescoping", "common-angle-values",
      "cosecant-cotangent-square-sums", "cot-tan-telescoping", "double-angle",
      "even-power-sin-cos-sums", "evenly-spaced-angle-products", "half-angle",
      "inverse-trig-identities", "product-sum", "pythagorean-identities", "reduction-identities",
      "sin-cos-ap-sum", "special-trig-values", "triangle-angle-identities",
      "triangle-square-identities", "trig-telescoping-product", "triple-angle"
    ]
  };
  const GROUPS_BY_ID = {};
  Object.keys(TAG_GROUPS).forEach(label => {
    TAG_GROUPS[label].forEach(id => (GROUPS_BY_ID[id] = GROUPS_BY_ID[id] || []).push(label));
  });

  // ---------- Concept index ----------
  // A card's formula says "R" and "r"; a reader looking for it types
  // "circumradius" and "inradius". Those words sit in the name or tags of only a
  // handful of the cards that actually relate the two, and single letters are
  // dropped from the LaTeX index, so a question asked in words could never reach
  // a formula written in symbols. These rules read each card's LaTeX and emit the
  // English names of the quantities it contains, plus a word for how they are
  // combined — reaching the formulas themselves rather than their labels, which
  // is something no amount of extra tagging can do.
  //
  // Precision matters more than recall here: a wrong concept pollutes every
  // query using that word, so single letters are gated by section (an "r" in
  // number theory is not an inradius) and ambiguous ones are matched only in a
  // context that pins the meaning down.
  const CONCEPT_RULES = [
    // --- geometry ---
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])R(?![A-Za-z_])/, w: ["circumradius", "circumcircle", "circumscribed"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])r(?![A-Za-z_])/, w: ["inradius", "incircle", "inscribed"] },
    { sec: "geometry", re: /r_\{?[abcA-C]/, w: ["exradius", "excircle"] },
    { sec: "geometry", re: /s\s*-\s*[abc]\b|s\(s|=\s*rs\b|\brs\b/, w: ["semiperimeter"] },
    // "rs" is the inradius times the semiperimeter, but the r is glued to the s
    // and so escapes the single-letter rule above.
    { sec: "geometry", re: /\brs\b/, w: ["inradius", "semiperimeter", "area"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\])A\s*=|\[[A-Z]{3}\]|\\text\{Area\}/, w: ["area"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])h(?![A-Za-z_])/, w: ["height", "altitude"] },
    { sec: "geometry", re: /m_\{?[abc]/, w: ["median"] },
    { sec: "geometry", re: /\\pi/, w: ["circle", "pi"] },
    { sec: "geometry", re: /\^\\circ|\\angle/, w: ["angle", "degrees"] },
    { sec: "geometry", re: /\\sin|\\cos|\\tan/, w: ["trigonometry"] },
    // --- number theory ---
    { re: /\\varphi|\\phi/, w: ["totient", "coprime", "euler"] },
    { re: /\\sigma/, w: ["sum of divisors"] },
    { re: /\\tau\b|d\(n\)/, w: ["number of divisors", "divisor count"] },
    { re: /\\gcd/, w: ["gcd", "greatest common divisor"] },
    { re: /\\operatorname\{lcm\}|\\text\{lcm\}|\\mathrm\{lcm\}/, w: ["lcm", "least common multiple"] },
    { re: /\\pmod|\\equiv|\\bmod/, w: ["modular", "congruence", "remainder"] },
    { re: /\\lfloor|\\lceil/, w: ["floor", "ceiling", "rounding"] },
    { re: /v_p|v_\{p\}/, w: ["valuation", "exponent of a prime"] },
    { re: /!\s*(?:$|[^=])|n!/, w: ["factorial"] },
    { re: /\\binom|\\dbinom|\\tbinom/, w: ["binomial coefficient", "choose", "combination"] },
    // --- algebra ---
    { re: /e_\{?[1-9nk]/, w: ["elementary symmetric", "symmetric sums"] },
    { re: /p_\{?[1-9nk]/, w: ["power sum"] },
    { re: /\\log|\\ln/, w: ["logarithm"] },
    { re: /\\sqrt/, w: ["radical", "square root"] },
    { re: /\\overline|\\bar\{z\}|\\text\{Im\}|\\text\{Re\}|\bi\b/, w: ["complex"] },
    // --- how the pieces are combined (structural) ---
    { re: /\\le\b|\\ge\b|\\leq|\\geq|\\lt\b|\\gt\b/, w: ["inequality", "bound"] },
    { re: /\\prod/, w: ["product"] },
    { re: /\\sum/, w: ["sum"] }
  ];

  // Words for the shape of the statement, added only when the card really does
  // tie two named quantities together — "ratio" on every card with a fraction
  // would be noise, but on a card relating R to r it is exactly the way a reader
  // describes what they are looking for.
  function conceptsOf(f, sectionId) {
    const tex = f.latex || "";
    const out = new Set();
    let named = 0;
    for (const rule of CONCEPT_RULES) {
      if (rule.sec && rule.sec !== sectionId) continue;
      if (!rule.re.test(tex)) continue;
      rule.w.forEach(w => indexWordsOf(w).forEach(x => out.add(x)));
      named++;
    }
    if (named >= 2) {
      // "the ratio between R and r" is how a reader describes any card tying the
      // two together, not only one literally written as a fraction — and since
      // every query token must land somewhere for a card to survive, a missing
      // "ratio" would drop exactly the cards being looked for. It is a common
      // word, so rarity weighting leaves it almost no influence on the ordering.
      out.add("ratio");
      if (/\\d?frac|\\tfrac|\\dfrac|\//.test(tex)) out.add("quotient");
      if (/=/.test(tex)) ["relationship", "relation"].forEach(w => indexWordsOf(w).forEach(x => out.add(x)));
    }
    return out;
  }

  // Definition words for every glossary term appearing in a card's authored
  // fields. Deliberately does NOT read the detail body: a term mentioned once in
  // passing deep in an essay is not what the card is about.
  const GLOSSARY = window.MATH_GLOSSARY || {};
  const GLOSS_WORDS = new Map();
  Object.keys(GLOSSARY).forEach(k => GLOSS_WORDS.set(k, indexWordsOf(GLOSSARY[k])));
  function glossOf() {
    const out = new Set();
    for (let i = 0; i < arguments.length; i++) {
      const set = arguments[i];
      if (!set) continue;
      for (const w of set) {
        const def = GLOSS_WORDS.get(w);
        if (def) for (const d of def) out.add(d);
      }
    }
    return out;
  }

  // Say a formula out loud. Readers routinely search for the thing they can only
  // pronounce -- "two pi r", "four thirds pi r cubed", "a squared plus b squared
  // equals c squared", "n times n plus one over two" -- but a formula lives only in
  // the card's LaTeX, which the text index strips. Rendering it into the words a
  // person would actually say gives those queries something to match, and feeds the
  // bigram index -- which is in fact the ONLY place it earns anything. Indexing these
  // words as their own field was measured and dropped: it moved nothing on its own and
  // cost a point on the probe set. The value is entirely in pairs like "two pi" and
  // "pi r", which are highly distinctive even though every word in them is common.
  const NUMWORD = ["zero", "one", "two", "three", "four", "five", "six",
                   "seven", "eight", "nine", "ten"];
  const ORDINAL = { 2: "halves", 3: "thirds", 4: "fourths", 5: "fifths", 6: "sixths",
                    8: "eighths" };
  function spokenLatex(tex) {
    if (!tex) return "";
    let t = String(tex);
    t = t.replace(/\\(?:d|t)?frac\s*\{(\d+)\}\s*\{(\d+)\}/g, (m, a, b) =>
      ORDINAL[+b] ? " " + (NUMWORD[+a] || a) + " " + ORDINAL[+b] + " " : " " + a + " over " + b + " ");
    t = t.replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " $1 over $2 ");
    t = t.replace(/\\binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " $1 choose $2 ");
    t = t.replace(/\\sqrt\s*\{([^{}]*)\}/g, " square root of $1 ");
    t = t.replace(/\^\s*\{?2\}?/g, " squared ").replace(/\^\s*\{?3\}?/g, " cubed ");
    t = t.replace(/\^\s*\{?([a-z0-9]+)\}?/g, " to the $1 ");
    t = t.replace(/_\s*\{?([a-z0-9]+)\}?/g, " $1 ");
    t = t.replace(/\\sum/g, " sum of ").replace(/\\prod/g, " product of ");
    t = t.replace(/\\(?:cdot|times)/g, " times ").replace(/\\div/g, " divided by ");
    t = t.replace(/\\pmod\s*\{?([^{}\s]*)\}?/g, " mod $1 ");
    t = t.replace(/\\equiv/g, " congruent to ").replace(/\\approx/g, " approximately ");
    t = t.replace(/\\l[et]q?\b/g, " less than or equal ").replace(/\\g[et]q?\b/g, " greater than or equal ");
    t = t.replace(/\\(pi|theta|alpha|beta|gamma|phi|varphi|lambda|mu|sigma|omega|delta)\b/g, " $1 ");
    t = t.replace(/\\(sin|cos|tan|cot|sec|csc|log|ln|gcd|lcm|min|max|det)\b/g, " $1 ");
    t = t.replace(/\\text\s*\{([^{}]*)\}/g, " $1 ");
    t = t.replace(/\\[a-zA-Z]+/g, " ");                       // drop remaining commands
    t = t.replace(/=/g, " equals ").replace(/\+/g, " plus ").replace(/-/g, " minus ");
    t = t.replace(/\b(\d)\b/g, (m, d) => " " + NUMWORD[+d] + " ");   // small digits
    return t.replace(/[{}\\$&]/g, " ").replace(/\s+/g, " ").trim();
  }

  // Adjacent normalized word pairs, stopwords removed first so "area of a triangle"
  // yields "area triangle" and matches a card that writes "triangle area".
  function bigramsOf() {
    const out = new Set();
    for (let i = 0; i < arguments.length; i++) {
      const txt = arguments[i];
      if (!txt) continue;
      for (const chunk of String(txt).split(/[.;:,()]/)) {
        const ws = wordsOf(chunk.toLowerCase()).filter(t => !STOPWORDS.has(t));
        for (let k = 0; k + 1 < ws.length; k++) out.add(ws[k] + " " + ws[k + 1]);
      }
    }
    return out;
  }

  // A handful of cards are algebraic trigonometric identities that merely happen to be stated
  // about a triangle. They stay filed in Geometry, but a reader browsing Algebra's trig
  // identities should meet them too. This is listing, not duplication: the same formula
  // OBJECT is pushed into the second subsection and the build below keeps only its first
  // occurrence, so there is one entry, one id and one write-up to maintain. Geometry loads
  // before Algebra, so the canonical section -- the breadcrumb and the "Back to" link --
  // remains Geometry.
  const ALSO_LISTED_IN = {
    algebra: {
      "Trigonometric Identities": [
        "trig-area", "trig-area-circumradius", "triangle-half-angle-identities",
        "half-angle-tangent-identity", "triangle-sin2-sum-ratio"
      ]
    }
  };
  (() => {
    const src = {};
    SECTIONS.forEach(s => s.subsections.forEach(sub => sub.formulas.forEach(f => {
      if (!src[f.id]) src[f.id] = f;
    })));
    Object.keys(ALSO_LISTED_IN).forEach(secId => {
      const sec = SECTIONS.find(s => s.id === secId);
      if (!sec) return;
      Object.keys(ALSO_LISTED_IN[secId]).forEach(title => {
        const sub = sec.subsections.find(x => x.title === title);
        if (!sub) return;
        ALSO_LISTED_IN[secId][title].forEach(id => {
          const f = src[id];
          if (f && sub.formulas.indexOf(f) === -1) sub.formulas.push(f);
        });
      });
    });
  })();

  const ALL = [];
  // A description may carry [[id|text]] links: a card is linked at its first mention on the
  // page, and that is often in the intro. Only the card's own page shows them (descriptionLinked);
  // the grid, search, previews and the search index all read the plain text.
  const unlinkText = s => String(s || "").replace(/\[\[([\w-]+)(?:\|([^\]]*))?\]\]/g, (m, id, label) => label || id);
  const BY_ID = {};
  SECTIONS.forEach(section => {
    section.subsections.forEach(sub => {
      sub.formulas.forEach(f => {
        if (BY_ID[f.id]) return;      // a mirrored listing, already entered under its own section
        if (f.descriptionLinked == null) { f.descriptionLinked = f.description; f.description = unlinkText(f.description); }
        const entry = { formula: f, section, subsection: sub };
        entry.kind = f.type === "method" || f.type === "pattern" ? f.type : "formula";
        if (EXTRA_TAGS[f.id]) f.keywords = f.keywords.concat(EXTRA_TAGS[f.id].filter(k => f.keywords.indexOf(k) === -1));
        entry.nameWords = new Set(indexWordsOf(f.name));
        entry.tagWords = new Set(f.keywords.flatMap(indexWordsOf));
        entry.groupTags = GROUPS_BY_ID[f.id] || [];
        entry.groupWords = new Set(entry.groupTags.flatMap(indexWordsOf));
        entry.tagPhrases = f.keywords.map(k => k.toLowerCase());
        entry.ctxWords = new Set(indexWordsOf(sub.title + " " + section.title));
        entry.descWords = new Set(indexWordsOf([f.description, f.when || "", f.move || "", (f.recognize || []).join(" ")].join(" ")));
        entry.latexWords = new Set(latexTokens(f.latex));
        // Pattern cards live in their own sections but still belong to a subject, and
        // both the concept rules and the topic rules below are gated on subject.
        const subjectId = f.subject || section.id;
        entry.conceptWords = conceptsOf(f, subjectId);
        // Plain-English definitions of any domain term this card uses, from the
        // generated glossary. Lets a reader's wording ("bases of the altitudes")
        // reach a card written in jargon ("altitude feet") without tagging that
        // card, since one glossary entry serves every card using the term.
        entry.glossWords = glossOf(entry.nameWords, entry.tagWords, entry.descWords);
        // Adjacent word pairs from everything authored, plus the glossary gloss.
        // Single words like "area", "triangle", "side" and "three" sit on hundreds of
        // cards, so a query built entirely from them ("the area of a triangle if I
        // know all three sides") gives BM25 nothing to separate Heron from any other
        // triangle card. The PAIR "three sides" is rare, and pairs are what carry the
        // intent in a plainly-worded question.
        entry.bigrams = bigramsOf(f.name, f.keywords.join(" "), f.description,
                                  Array.from(entry.glossWords).join(" "),
                                  spokenLatex(f.latex));
        // The extended write-up: by far the largest description of what a card
        // means, and the only place most paraphrases of it appear ("the midpoints
        // halve every side"). Weak evidence per word, so it is scored lowest, but
        // it is what lets a plainly-worded question reach the right card.
        entry.bodyWords = new Set(indexWordsOf(
          ((window.MATH_DETAILS || {})[f.id] || "").replace(/\$[^$]*\$/g, " ").replace(/^##\s*/gm, "")
            // Index what the reader sees. Without this a [[card-id|display]] link feeds the
            // target's *id* into this card's body words, which it never displays.
            .replace(/\[\[([\w-]+)(?:\|([^\]]*))?\]\]/g, (m, id, label) => label || id.replace(/-/g, " "))
        ));
        entry.mathFrags = mathFragments(f.latex || "");
        entry.nameLower = f.name.toLowerCase();
        entry.topics = topicsForCard(f, sub, section, subjectId);
        ALL.push(entry);
        BY_ID[f.id] = entry;
      });
    });
  });
  // ---------- Term rarity (IDF) ----------
  // How many entries contain each indexed word. A formula reference is full of
  // words like "triangle", "area" or "number" that sit on hundreds of cards and
  // say almost nothing about intent, while "sine", "stewart" or "frobenius" pin
  // the answer down to a handful. With flat per-field weights three common words
  // outvote the one rare word carrying the query — which is why adding more tags
  // stopped helping: every extra shared tag makes the common words heavier.
  // Weighting each token by how rare it is fixes that at the root and keeps
  // working as the library grows, without touching a single card's tags.
  const DF = new Map();
  ALL.forEach(e => {
    const seen = new Set();
    [e.nameWords, e.tagWords, e.ctxWords, e.latexWords, e.descWords]
      .forEach(set => { for (const w of set) seen.add(w); });
    seen.forEach(w => DF.set(w, (DF.get(w) || 0) + 1));
  });
  const DOC_N = ALL.length || 1;
  // Average field sizes, so a card carrying twenty keywords doesn't outrank a
  // tightly-tagged one just by having more surface area to hit.
  // ---------- BM25F field model ----------
  // Every field here is a word SET, so within-field term frequency is 0 or 1: the
  // ranking signal is which fields a term lands in and how rare that term is.
  // `w` is the field's boost; `b` is BM25's length parameter applied per field, as
  // BM25F prescribes.
  //
  // The b values are deliberately gentle. The previous scorer divided each tag hit
  // by a factor spanning 0.4-1.8, which meant a card with 15 well-chosen keywords
  // had every hit discounted 2.6x against a card with 4 - punishing exactly the
  // cards that document themselves properly. (Medial Triangle carries both
  // "midpoint triangle" and "midpoints of sides" yet lost to Varignon on
  // "connecting midpoints of the sides" for precisely this reason.) At b = 0.35 a
  // card with twice the average keyword count is discounted about 23%, which is
  // the honest correction for "more keywords means more chances to be hit".
  const FIELDS = [
    { key: "nameWords",    w: 9.0, b: 0.55 },
    { key: "tagWords",     w: 5.0, b: 0.35 },
    { key: "conceptWords", w: 2.2, b: 0.20 },
    { key: "latexWords",   w: 2.0, b: 0.20 },
    { key: "descWords",    w: 2.5, b: 0.35 },
    { key: "ctxWords",     w: 1.2, b: 0.10 },
    { key: "bodyWords",    w: 0.5, b: 0.55 },
    { key: "glossWords",   w: 0.8, b: 0.30 },
    { key: "groupWords",   w: 1.0, b: 0.30 }
  ];
  // BM25 saturation. Deliberately large: in classic BM25, `tf` is how many TIMES a
  // term occurs, and saturation encodes "the fifth occurrence tells you little".
  // Here every field is a SET, so the pseudo-tf carries no frequency at all — it
  // is purely which fields matched. A small k1 therefore squashes the one signal
  // that matters: at k1 = 1.6 a hit in the card's NAME scored only 2.2x a hit
  // buried in its prose, and "nine point circle" lost to Medial Triangle. A large
  // k1 keeps the response near-linear in field importance while still damping a
  // term that happens to land in every field at once.
  let K1 = 8;
  const COVERAGE_MIN = 0.70;            // share of query IDF a card must explain
  // K1 / CORROB / SCALE and the field boosts above were grid-searched against
  // tools/eval-queries.json (148 labelled queries). Result vs the previous
  // hand-tuned scorer: top-1 129 -> 134, top-3 136 -> 143, MRR 0.902 -> 0.937,
  // with name and jargon queries both staying at 100%. Re-run tools/search-eval.html
  // after touching any of them.
  FIELDS.forEach(f => {
    f.avg = Math.max(1, ALL.reduce((n, e) => n + (e[f.key] ? e[f.key].size : 0), 0) / DOC_N);
  });
  // Per-entry, per-field length divisor, computed once at startup.
  ALL.forEach(e => {
    e.fieldNorm = FIELDS.map(f => {
      const size = e[f.key] ? e[f.key].size : 0;
      return 1 - f.b + f.b * (size / f.avg);
    });
  });
  const IDF_BASE = Math.log(1 + DOC_N / 40) || 1;      // a word on ~40 cards weighs 1.0
  // Frequencies for the derived fields (concepts and detail bodies) are kept in
  // their own table: the weights above are calibrated on the authored fields, and
  // folding hundreds of thousands of prose words into them would shift every
  // existing score.
  const AUX_DF = new Map();
  ALL.forEach(e => {
    const seen = new Set();
    [e.conceptWords, e.bodyWords, e.glossWords, e.groupWords].forEach(set => { if (set) for (const w of set) seen.add(w); });
    seen.forEach(w => AUX_DF.set(w, (AUX_DF.get(w) || 0) + 1));
  });
  // ---------- Spelling correction ----------
  // A mistyped word appears on zero cards, so `inCorpus` used to drop it from the
  // query entirely — before any fuzzy matching could run. That is why "stewert
  // theorem" returned nothing about Stewart: the only surviving token was
  // "theorem". Correcting an unknown token to its nearest real corpus word first
  // is both the fix and the right place for the logic, since it repairs the query
  // once instead of asking every card to tolerate the typo separately.
  //
  // Bucketed by first letter because `fuzzy` already requires the initials to
  // agree, so a lookup only scans a fraction of the vocabulary.
  const VOCAB_BY_INITIAL = new Map();
  (function () {
    const seen = new Set();
    const add = w => {
      if (w.length < 4 || seen.has(w)) return;
      seen.add(w);
      const k = w[0];
      if (!VOCAB_BY_INITIAL.has(k)) VOCAB_BY_INITIAL.set(k, []);
      VOCAB_BY_INITIAL.get(k).push(w);
    };
    DF.forEach((_, w) => add(w));
    AUX_DF.forEach((_, w) => add(w));
  })();

  // Nearest real word to a typo, or null. This is the standard noisy-channel
  // choice: fewest edits first, and among equally close candidates the one that
  // appears on the MOST cards. Preferring the rarest instead looks appealing but
  // is backwards — "triangel" then resolves to some obscure near-neighbour rather
  // than to "triangle", and the query is worse off than before it was corrected.
  function correctToken(tok) {
    if (tok.length < 4) return null;
    const bucket = VOCAB_BY_INITIAL.get(tok[0]);
    if (!bucket) return null;
    let best = null, bestDf = -1, bestDist = 99;
    for (const w of bucket) {
      if (!fuzzy(w, tok)) continue;
      const d = levBounded(w, tok, 3);
      const df = (DF.get(w) || 0) + (AUX_DF.get(w) || 0);
      if (d < bestDist || (d === bestDist && df > bestDf)) { bestDist = d; bestDf = df; best = w; }
    }
    return best;
  }

  // Bigrams get their own frequency table. They are far rarer than single words, so
  // their IDF is naturally high; without a table of their own that rarity would be
  // read against the unigram calibration and every pair would look equally decisive.
  const BG_DF = new Map();
  ALL.forEach(e => { for (const b of e.bigrams) BG_DF.set(b, (BG_DF.get(b) || 0) + 1); });
  const BG_MAX = Math.log(1 + DOC_N / 2) || 1;
  function bigramIdf(bg) {
    const df = BG_DF.get(bg);
    if (!df) return 0;
    return Math.min(1, Math.log(1 + DOC_N / (1 + df)) / BG_MAX);
  }

  const IDF_CACHE = new Map();
  function idfOf(word) {
    let v = IDF_CACHE.get(word);
    if (v !== undefined) return v;
    const df = DF.get(word);
    if (df) v = Math.log(1 + DOC_N / (1 + df)) / IDF_BASE;
    else {
      const aux = AUX_DF.get(word);
      // A word that appears nowhere in the library at all cannot tell two cards
      // apart, so it must not be treated as the distinctive one. "made" sits on
      // zero cards, yet counting it as rare was enough to sink every result for
      // "area of triangle made by connecting midpoints".
      v = aux ? Math.log(1 + DOC_N / (1 + aux)) / IDF_BASE : 0.3;
    }
    v = Math.max(0.3, Math.min(2.6, v));
    IDF_CACHE.set(word, v);
    return v;
  }
  function inCorpus(word) { return DF.has(word) || AUX_DF.has(word); }

  function entriesForTopic(topicId) {
    return ALL.filter(e => e.topics.some(t => t.id === topicId));
  }

  // Subject and group pages have real addresses, so Back, Forward and bookmarks work:
  //   #/formulas/geometry                   a Formulas subject (its topic tiles)
  //   #/formulas/geometry/circles           one topic of it
  //   #/methods/algebra                     a Methods (or Patterns) subject (its group tiles)
  //   #/methods/algebra/substitutions       one method group, or one pattern family
  // The address is the source of truth for which section is showing; render() reads it.
  // The first version of these addresses lived under #/reference and #/solving;
  // legacyRedirect() rewrites those in place.
  const slugOf = t => String(t).toLowerCase().replace(/&/g, "and").replace(/\$[^$]*\$/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  function sectionHash(secId, opts) {
    const o = opts || {};
    const sec = SECTIONS.find(x => x.id === secId);
    if (!sec) return "";
    if (!bySubject(sec)) {
      const t = o.topic != null && sec.subsections[o.topic] ? "/" + slugOf(sec.subsections[o.topic].title) : "";
      return "#/formulas/" + sec.id + t;
    }
    const sub = sec.subsections[o.sub != null ? o.sub : 0];
    const g = o.cluster != null && sub.groups && sub.groups[o.cluster] ? "/" + slugOf(sub.groups[o.cluster].title) : "";
    return "#/" + bookOf(sec) + "/" + slugOf(sub.title) + g;
  }
  // Formulas, Methods and Patterns have no main page of their own: the space's address opens
  // the subject last visited there (Geometry the first time). What a main page used to say,
  // the space's question and its recently opened cards, is behind the "i" beside its name in
  // the sidebar.
  const lastSubject = {};
  function spaceEntry(name) {
    if (lastSubject[name]) return lastSubject[name];
    const sec = SECTIONS.find(x => bookOf(x) === name);
    return sec ? sectionHash(sec.id, { sub: 0 }) : "#/practice";
  }
  function legacyRedirect() {
    const h = location.hash;
    let to = null, m;
    if (h === "#/reference") to = spaceEntry("formulas");
    else if (h === "#/solving") to = spaceEntry("methods");
    else if ((m = h.match(/^#\/(formulas|methods|patterns)$/))) to = spaceEntry(m[1]);
    else if ((m = h.match(/^#\/reference\/(.+)$/))) to = "#/formulas/" + m[1];
    else if ((m = h.match(/^#\/solving\/(methods|patterns)\/(.+)$/))) to = "#/" + m[1] + "/" + m[2];
    // The lists overview and the problem database were folded into the Practice page.
    else if (h === "#/lists" || h === "#/problems") to = "#/practice";
    if (to) history.replaceState(null, "", to);
  }
  // Go to an address; when it is already the address, re-render instead (no hashchange fires).
  function goHash(h) {
    if (location.hash === h || (!h && !location.hash)) { render(); scrollForRoute(getRoute(), null); }
    else location.hash = h;
  }

  // A card merged into another keeps working at its old address, so bookmarks and shared
  // links land on the card that absorbed it.
  const MERGED_IDS = { "sp-substitution": "symmetric-polynomial-strategies", "picks-triangular-lattice": "picks-theorem-general", "hexagon-diagonals": "regular-hexagon-area", "cyclic-quad-diagonals": "ptolemy-second-theorem", "same-remainder": "subtract-equal-remainders" };
  function getRoute() {
    let m = location.hash.match(/^#\/f\/([\w-]+)$/);
    if (m && BY_ID[m[1]]) return { type: "formula", entry: BY_ID[m[1]] };
    if (m && BY_ID[MERGED_IDS[m[1]]]) return { type: "formula", entry: BY_ID[MERGED_IDS[m[1]]] };
    m = location.hash.match(/^#\/list\/([\w-]+)$/);
    if (m && anyList(m[1])) return { type: "list", listId: m[1] };
    if (/^#\/lists$/.test(location.hash)) return { type: "lists" };
    m = location.hash.match(/^#\/problems(?:\/([a-z0-9-]+)\/(\d{4}))?$/);
    if (m) return { type: "problems", fam: m[1] || null, year: m[2] ? +m[2] : null };
    m = location.hash.match(/^#\/problem\/([\w-]+)$/);
    if (m && PROBLEM_BY_SLUG[m[1]]) return { type: "problem", slug: m[1] };
    m = location.hash.match(/^#\/topic\/([\w-]+)$/);
    if (m && TOPICS_BY_ID[m[1]]) return { type: "topic", topicId: m[1] };
    m = location.hash.match(/^#\/settings(?:\/(commands))?$/);
    if (m) return { type: "settings", anchor: m[1] || null };
    m = location.hash.match(/^#\/formulas\/([\w-]+)(?:\/([\w-]+))?$/);
    if (m) {
      const sec = SECTIONS.find(x => x.id === m[1] && !bySubject(x));
      if (sec) {
        const t = m[2] ? sec.subsections.findIndex(sb => slugOf(sb.title) === m[2]) : -1;
        return { type: "home", section: { id: sec.id, topic: t >= 0 ? t : null, sub: null, cluster: null } };
      }
    }
    m = location.hash.match(/^#\/(methods|patterns)\/([\w-]+)(?:\/([\w-]+))?$/);
    if (m) {
      const sec = SECTIONS.find(x => x.id === "tools-" + m[1]);
      const i = sec ? sec.subsections.findIndex(sb => slugOf(sb.title) === m[2]) : -1;
      if (i >= 0) {
        const gs = sec.subsections[i].groups || [];
        const g = m[3] ? gs.findIndex(x => slugOf(x.title) === m[3]) : -1;
        return { type: "home", section: { id: sec.id, sub: i, topic: null, cluster: g >= 0 ? g : null } };
      }
    }
    if (location.hash === "#/practice") return { type: "space", name: "practice" };
    m = location.hash.match(/^#\/special\/([^/]+)(?:\/(.*))?$/);
    if (m) return { type: "special", name: m[1].toLowerCase(), arg: decodeURIComponent(m[2] || "") };
    return { type: "home" };
  }

  // Each history entry remembers where the reader was on it, so Back and Forward return there,
  // while a fresh click always opens at the top. The position lives in history.state (written
  // with replaceState, debounced): a new entry starts with no state, a revisited one has it.
  // Besides the pixel offset it saves an anchor: the element with an id at the top of the view
  // and how far below the top it sat. A page laid out again on Back can come out a few pixels
  // taller or shorter above that point (math and figures render lazily), so restoring the raw
  // offset left the page shifted; restoring the anchor puts the same card back in the same place.
  let scrollSaveTimer = 0;
  function scrollAnchor() {
    const bar = document.querySelector(".topbar");
    const yTop = (bar ? bar.getBoundingClientRect().bottom : 0) + 8;
    const box = $content.getBoundingClientRect();
    let el = document.elementFromPoint(box.left + Math.min(box.width / 2, 260), yTop);
    while (el && el !== $content && !el.id) el = el.parentElement;
    if (!el || el === $content || !$content.contains(el)) {
      // Nothing with an id under that point: take the first element with an id that is still
      // on screen below the bar.
      el = [...$content.querySelectorAll("[id]")].find(e => e.getBoundingClientRect().bottom > yTop) || null;
      if (!el) return null;
    }
    return { a: el.id, o: el.getBoundingClientRect().top };
  }
  window.addEventListener("scroll", () => {
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(() => {
      try { history.replaceState(Object.assign({}, history.state, { y: window.scrollY }, scrollAnchor() || { a: null }), ""); } catch (e) {}
    }, 150);
  }, { passive: true });
  function openFormula(id) {
    location.hash = "#/f/" + id;
  }

  // ---------- Study lists (named collections, persisted per-browser) ----------
  // One data structure holds every list; "starred" is a built-in list so the
  // one-click star and the named study lists share the same storage. Older
  // installs kept a bare "mq-stars" array — migrate it into the Starred list.
  let lists;
  function loadLists() {
    try { lists = JSON.parse(localStorage.getItem("mq-lists") || "null"); } catch (e) { lists = null; }
    if (!lists || !Array.isArray(lists.items)) {
      let migrated = [];
      try { migrated = JSON.parse(localStorage.getItem("mq-stars") || "[]"); } catch (e) { migrated = []; }
      lists = { items: [{ id: "starred", name: "Starred", ids: migrated, builtin: true }] };
      saveLists();
    }
    if (!lists.items.some(l => l.id === "starred")) {
      lists.items.unshift({ id: "starred", name: "Starred", ids: [], builtin: true });
    }
    // DO NOT prune ids against BY_ID here, however tempting it looks. This used to read
    //     lists.items.forEach(l => { l.ids = l.ids.filter(id => BY_ID[id]); });
    // to drop ids left behind by a renamed card. But BY_ID is built from the data files,
    // and `SECTIONS` is `[]` if any of them failed to load, so a single mistyped `?v=` or a
    // half-populated cache emptied every saved list in memory -- and the next saveLists(),
    // one star-click away, wrote that emptiness to storage permanently. Reproduced: with
    // number-theory.js missing, a five-card list dropped to two, and restoring the file did
    // not bring them back.
    //
    // Nothing needs the prune. Every render path already skips ids that do not resolve
    // (`.map(id => BY_ID[id]).filter(Boolean)`), so an id the library cannot currently see
    // is invisible rather than broken, and it reappears intact when the data does.
  }
  function saveLists() {
    try { localStorage.setItem("mq-lists", JSON.stringify(lists)); return true; }
    catch (e) { return storageFailed(); }
  }
  function getList(id) { return lists.items.find(l => l.id === id); }
  function inList(listId, fid) { const l = getList(listId); return !!l && l.ids.indexOf(fid) !== -1; }
  function listCountFor(fid) { return lists.items.reduce((n, l) => n + (l.ids.indexOf(fid) !== -1 ? 1 : 0), 0); }
  function toggleMembership(listId, fid) {
    const l = getList(listId); if (!l) return;
    const i = l.ids.indexOf(fid);
    if (i === -1) l.ids.push(fid); else l.ids.splice(i, 1);
    saveLists();
  }
  function addManyToList(listId, fids) {
    const l = getList(listId); if (!l) return 0;
    let n = 0;
    fids.forEach(f => { if (BY_ID[f] && l.ids.indexOf(f) === -1) { l.ids.push(f); n++; } });
    saveLists();
    return n;
  }
  function createList(name) {
    const id = "l_" + Math.random().toString(36).slice(2, 8);
    lists.items.push({ id, name: (name || "").trim() || "Untitled list", ids: [] });
    saveLists();
    return id;
  }
  function renameList(id, name) { const l = getList(id); if (l && name.trim()) { l.name = name.trim(); saveLists(); } }
  function deleteList(id) { const l = getList(id); if (l && !l.builtin) { lists.items = lists.items.filter(x => x.id !== id); saveLists(); } }

  loadLists();

  // Curated built-in study sets (read-only). These are cross-cutting sets, so they
  // keep the deliberate file order (contest tiers, then methods, then curiosities)
  // rather than being grouped by subject. Unknown ids are dropped at load.
  // `sections` is the source of truth in built-in-lists.js; `ids` is flattened from it here
  // so every downstream consumer (anyList, listPreview, the user-list copy flow) keeps working
  // against a plain array and nothing is duplicated in the data file. A list written the old
  // way, with a bare `ids`, still loads.
  const BUILTIN_LISTS = (window.MATH_BUILTIN_LISTS || [])
    .map((l, i) => {
      const secs = (l.sections || [{ title: "", note: "", ids: l.ids || [] }])
        .map(sec => ({ title: sec.title || "", note: sec.note || "", ids: (sec.ids || []).filter(id => BY_ID[id]) }))
        .filter(sec => sec.ids.length);
      return { id: l.id, name: l.name, subject: l.subject, kind: l.kind || "route", tier: l.tier || "",
               blurb: l.blurb || "", sections: secs,
               ids: secs.reduce((a, sec) => a.concat(sec.ids), []), builtinSet: true, _i: i };
    })
    .filter(l => liveCount(l))
    .sort((a, b) => a._i - b._i);
  const BUILTIN_BY_ID = {};
  BUILTIN_LISTS.forEach(l => { BUILTIN_BY_ID[l.id] = l; });
  function anyList(id) { return getList(id) || BUILTIN_BY_ID[id]; }
  // Displayed counts use the ids the library can currently resolve, while storage keeps
  // every id the reader put there. The two differ only while a data file is missing, and
  // that is exactly when the stored ids must not be touched -- see loadLists().
  function liveIds(l) { return (l && l.ids ? l.ids : []).filter(id => BY_ID[id]); }
  function liveCount(l) { return liveIds(l).length; }

  function starBtnHtml(id) {
    const on = inList("starred", id);
    return `<button class="star-btn${on ? " starred" : ""}" data-star="${id}" title="${on ? "Starred" : "Star for later"}">${on ? "★" : "☆"}</button>`;
  }
  // Add-to-list opener: a plain "+".
  function addListBtnHtml(id) {
    return `<button class="addlist-btn" data-addlist="${id}" title="Add to a study list" aria-label="Add to a study list">+</button>`;
  }
  function refreshAddListButtons() { /* the button is a static "+"; nothing to refresh */ }

  // ---------- Add-to-list popover + toast ----------
  let menuEl = null;
  function closeListMenu() {
    if (!menuEl) return;
    menuEl.remove();
    menuEl = null;
    document.removeEventListener("mousedown", onDocDown, true);
    document.removeEventListener("keydown", onMenuKey, true);
  }
  function onDocDown(e) {
    if (menuEl && !menuEl.contains(e.target) && !e.target.closest("[data-addlist],[data-bulkadd]")) closeListMenu();
  }
  function onMenuKey(e) { if (e.key === "Escape") closeListMenu(); }

  // Plain text glyphs, never emoji: gold star for the built-in Starred list, a
  // small accent diamond for every other list.
  function listGlyph(l) {
    return l.id === "starred" ? `<span class="list-star">&#9733;</span>` : `<span class="list-ico">&#9670;</span>`;
  }
  // Add-to-list popover for one formula: membership checkboxes + create-new.
  // (Bulk selections create their own new list instead of piling into an existing one.)
  function openListMenu(anchor, fid) {
    const wasOpen = menuEl && menuEl._anchor === anchor;
    closeListMenu();
    if (wasOpen) return;   // a second click on the same opener closes it
    const rows = lists.items.map(l =>
      `<li><label class="lm-row"><input type="checkbox" data-lm-toggle="${l.id}"${inList(l.id, fid) ? " checked" : ""}><span class="lm-emoji">${listGlyph(l)}</span><span class="lm-name">${escapeAttr(l.name)}</span></label></li>`
    ).join("");
    menuEl = document.createElement("div");
    menuEl.className = "listmenu";
    menuEl._anchor = anchor; menuEl._fid = fid;
    menuEl.innerHTML = `
      <div class="lm-title">Add to study list</div>
      <ul class="lm-list">${rows}</ul>
      <form class="lm-new"><input type="text" placeholder="New list name&hellip;" maxlength="40" autocomplete="off"><button type="submit">Create</button></form>`;
    document.body.appendChild(menuEl);
    positionMenu(menuEl, anchor);
    menuEl.addEventListener("change", onMenuChange);
    menuEl.addEventListener("submit", onMenuSubmit);
    setTimeout(() => {
      document.addEventListener("mousedown", onDocDown, true);
      document.addEventListener("keydown", onMenuKey, true);
    }, 0);
  }
  function positionMenu(el, anchor) { positionFloat(el, anchor, 244); }
  // Clamps on both axes. `preferAbove` puts the box over the anchor, which is what a hover
  // preview wants so it never covers the text you are still reading; it falls back to below
  // when there is no room up there. The add-to-list menu keeps the opposite preference.
  // `at` is the pointer position, when the caller has one. An inline link that wraps across
  // two lines has a bounding box spanning BOTH fragments — tall, and starting at the first
  // line's left edge — so anchoring to it put the box up and to the side of the word the
  // reader was actually pointing at. getClientRects() gives one rect per line fragment, so
  // the fragment under the pointer is used instead.
  function fragmentUnder(anchor, at) {
    const rects = [...anchor.getClientRects()];
    if (rects.length < 2 || !at) return anchor.getBoundingClientRect();
    const hit = rects.find(r => at.y >= r.top - 1 && at.y <= r.bottom + 1
                             && at.x >= r.left - 1 && at.x <= r.right + 1);
    if (hit) return hit;
    return rects.reduce((best, r) => {
      const d = Math.abs((r.top + r.bottom) / 2 - at.y);
      return d < best.d ? { d, r } : best;
    }, { d: Infinity, r: rects[0] }).r;
  }

  function positionFloat(el, anchor, w, preferAbove, at) {
    const r = fragmentUnder(anchor, at);
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    el.style.width = w + "px";
    let left = (at ? at.x - w / 2 : r.left) + window.scrollX;
    if (left + w > window.scrollX + vw - 8) left = window.scrollX + vw - w - 8;
    el.style.left = Math.max(8 + window.scrollX, left) + "px";
    const h = el.offsetHeight || 160;
    const fitsAbove = r.top - 6 - h >= 8;
    const fitsBelow = r.bottom + 6 + h <= vh - 8;
    const above = preferAbove ? (fitsAbove || !fitsBelow) : !fitsBelow && fitsAbove;
    el.style.top = (above ? Math.max(8 + window.scrollY, r.top + window.scrollY - h - 6)
                          : r.bottom + window.scrollY + 6) + "px";
  }
  function syncStarButtons(fid) {
    const on = inList("starred", fid);
    document.querySelectorAll(`.star-btn[data-star="${fid}"]`).forEach(b => {
      b.classList.toggle("starred", on); b.textContent = on ? "★" : "☆";
      b.title = on ? "Starred" : "Star for later";
    });
  }
  function onMenuChange(e) {
    const cb = e.target.closest("[data-lm-toggle]");
    if (!cb || !menuEl) return;
    const fid = menuEl._fid;
    toggleMembership(cb.dataset.lmToggle, fid);   // toggle = can never add twice
    refreshAddListButtons(fid);
    syncStarButtons(fid);
  }
  function onMenuSubmit(e) {
    e.preventDefault();
    if (!menuEl) return;
    const inp = menuEl.querySelector(".lm-new input");
    const name = inp ? inp.value.trim() : "";
    if (!name) { if (inp) inp.focus(); return; }
    const fid = menuEl._fid;
    const id = createList(name);
    const l = getList(id);
    addManyToList(id, [fid]);
    refreshAddListButtons(fid);
    toast(`Created ${listGlyph(l)} ${escapeAttr(l.name)} &middot; added 1`);
    closeListMenu();
    const rt = getRoute();
    if (rt.type === "list" || rt.type === "lists") render();
  }

  let toastTimer = null;
  function toast(msg) {
    let t = document.getElementById("mq-toast");
    if (!t) { t = document.createElement("div"); t.id = "mq-toast"; t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  function stripHash() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  function sectionCount(section) {
    return section.subsections.reduce((n, sub) => n + sub.formulas.length, 0);
  }

  // How many cards of a subsection, or of one cluster inside it, survive that section's
  // filters. The sidebar greys out a link whose count is 0 and ignores clicks on it: the
  // subsection is not rendered at all then, so there is nowhere for the click to go.
  function navLinkCount(sectionId, subIdx, clusterIdx) {
    const section = SECTIONS.find(s => s.id === sectionId);
    const sub = section && section.subsections[subIdx];
    if (!sub) return 0;
    const ids = clusterIdx === undefined || !sub.groups
      ? sub.formulas.map(f => f.id)
      : (sub.groups[clusterIdx] || { ids: [] }).ids;
    return ids.filter(id => BY_ID[id] && passesFilter(BY_ID[id].formula)).length;
  }
  const navLinkArgs = a =>
    [a.dataset.section, +a.dataset.sub, a.dataset.cluster === undefined ? undefined : +a.dataset.cluster];

  // Ranks for ordering: the contest tier first, then importance inside the tier.
  const IMP_RANK = { high: 0, medium: 1, low: 2, lower: 3, lowest: 4 };
  const tierRank = f => TIER_RANK[tierKey(f)] !== undefined ? TIER_RANK[tierKey(f)] : 9;
  const impRank = f => IMP_RANK[f.importance] !== undefined ? IMP_RANK[f.importance] : 9;
  const labelRank = f => tierRank(f) * 10 + impRank(f);
  // The one gate every card list goes through. The filter is global, not per section, so a card
  // listed in two subjects (ALSO_LISTED_IN) is judged the same way in both.
  function passesFilter(f) {
    const af = state.filter;
    return af.tiers.has(tierKey(f)) && af.importances.has(f.importance);
  }
  const filterActive = () => state.filter.tiers.size < TIER_KEYS.length
    || state.filter.importances.size < IMP_TIERS.length;

  // ---------- Search ----------

  // BM25F pseudo term-frequency for one token against one card.
  //
  // Exact hits count fully; prefix, substring and edit-distance hits count for
  // less. Field contributions combine as STRONGEST + a fraction of the rest.
  //
  // Textbook BM25F sums the fields, but that is only sound when each field
  // contributes a real term count. With binary word sets, plain summing lets a
  // card that mentions a word in five weak fields outscore the card that has it
  // in its NAME — measured: "nine point circle" returned Medial Triangle first
  // and the Nine-Point Circle third. The previous scorer avoided this by taking
  // only the max field, which threw away corroboration instead. Taking the max
  // plus a discounted remainder keeps the field hierarchy intact while still
  // letting agreement across fields break ties.
  //
  // Also returns the indexed word that actually matched, so rarity is taken from
  // what matched rather than what was typed: "circum" against "circumradius"
  // should inherit how rare "circumradius" is.
  const EXACT = 1, PREFIX = 0.6, SUBSTR = 0.4, FUZZ = 0.5;
  let CORROB = 0.15;                    // credit given to fields beyond the strongest
  // BM25 returns a score per token bounded by that token's IDF (about 0.3-2.6), so
  // a whole query totals roughly 1-8. The whole-query bonuses below (exact name,
  // tag phrase) and mathMatchScore were calibrated against the previous scorer,
  // whose per-token scores ran 4-51. Left unscaled, any bonus that fired buried
  // everything else and any card without one was ranked on near-flat noise —
  // which is how "factor x^4 + 4" stopped returning its own card. Scaling the
  // token sum back into the original range keeps every one of those constants
  // meaningful instead of re-tuning them all.
  let SCALE = 70;

  function fieldTf(entry, tok) {
    let sum = 0, max = 0, best = null, bestScore = 0, exact = false;
    const add = (c, w, matched) => {
      sum += c;
      if (c > max) max = c;
      if (w > bestScore) { bestScore = w; best = matched; }
    };
    for (let i = 0; i < FIELDS.length; i++) {
      const set = entry[FIELDS[i].key];
      if (set && set.has(tok)) {
        exact = true;
        add(FIELDS[i].w * EXACT / entry.fieldNorm[i], FIELDS[i].w, tok);
      }
    }
    if (exact) return { tf: max + CORROB * (sum - max), word: best };
    if (tok.length < 3) return { tf: 0, word: tok };
    // Nothing matched exactly, so fall back to the looser matchers — but only on
    // the authored fields. Scanning the detail body word by word for every query
    // token would dominate the cost of a query, for the weakest evidence there is.
    for (let i = 0; i < FIELDS.length; i++) {
      const f = FIELDS[i];
      if (f.key === "bodyWords") continue;
      const set = entry[f.key];
      if (!set || !set.size) continue;
      let q = 0, matched = null;
      for (const w of set) if (w.startsWith(tok)) { q = PREFIX; matched = w; break; }
      if (!q) for (const w of set) {
        if (w.length > tok.length && w.indexOf(tok) !== -1) { q = SUBSTR; matched = w; break; }
      }
      if (!q && tok.length >= 4) for (const w of set) if (fuzzy(w, tok)) { q = FUZZ; matched = w; break; }
      if (!q) continue;
      add(f.w * q / entry.fieldNorm[i], f.w * q, matched);
    }
    return { tf: max + CORROB * (sum - max), word: best || tok };
  }

  // Levenshtein distance with an early-exit cap (returns cap+1 once exceeded).
  // Edit distance where swapping two adjacent letters counts as ONE edit (optimal string
  // alignment), since that is the commonest typing slip there is. Plain Levenshtein charged
  // it two, so "descrate" sat as far from "descarte" as from "describe", the tie went to the
  // commoner word, and the search for Descartes' theorem found nothing about Descartes.
  function levBounded(a, b, cap) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > cap) return cap + 1;
    let pp = null, prev = [], prevBest = 0; for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= n; j++) {
        const c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
        if (pp && j > 1 && a.charCodeAt(i - 1) === b.charCodeAt(j - 2) && a.charCodeAt(i - 2) === b.charCodeAt(j - 1))
          cur[j] = Math.min(cur[j], pp[j - 2] + 1);
        if (cur[j] < best) best = cur[j];
      }
      // A transposition reaches back two rows, so give up only once two rows in a row
      // are past the cap.
      if (best > cap && prevBest > cap) return cap + 1;
      pp = prev; prev = cur; prevBest = best;
    }
    return prev[n];
  }

  // Typo tolerance: the first letter must agree and the edit budget scales with
  // word length (short words get 1 edit, long words up to 3), so "stewert"→
  // "stewart", "recurrance"→"recurrence", "triangel"→"triangle" and
  // "bretschinder"→"bretschneider" all match without pulling in unrelated words.
  function fuzzy(a, b) {
    if (a.length < 4 || b.length < 4) return false;
    if (a[0] !== b[0]) return false;
    const longest = Math.max(a.length, b.length);
    if (longest < 8 && a.slice(0, 2) !== b.slice(0, 2)) return false;   // short words: share a 2-char prefix
    const cap = longest >= 9 ? 3 : longest >= 6 ? 2 : 1;
    return levBounded(a, b, cap) <= cap;
  }

  function expandToken(tok) {
    return SYNONYMS[tok] ? [tok, ...SYNONYMS[tok].map(normWord)] : [tok];
  }

  // Grid-searched against tools/eval-queries.json AND a separate 78-query probe set
  // written by imagining how a reader would describe a theorem without knowing its
  // name. Phrase matching was the single biggest win of the whole rebuild:
  // eval top-1 144 -> 152, probe top-1 49 -> 53. Both channels had been failing on
  // plainly-worded questions because every individual word in them is common; the
  // word PAIR is what carries the intent.
  let BIGRAM_W = 50;
  // A match through a synonym counts for less than the word itself. At full weight a bare
  // "pick" found Harmonic Addition (Linear Combination) through pick -> combination and ranked
  // it above Pick's Theorem, whose name IS the word; dropping the synonym instead lost
  // "how many ways to pick 3 people from 10" entirely. Discounting keeps both readings.
  // Measured 2026-09-25 (eval top-1 / MRR; probe 1; probe 2):
  //   1.0  164/185 0.926   50/78   46/77      0.75  167/185 0.937   51/78   47/77
  //   0.6  168/185 0.939   50/78   46/77      0.5   167/185 0.937   48/78   47/77
  // 0.6 wins the eval by one query but gives it back on both probe sets, which is what
  // fitting the list looks like; 0.7-0.8 is the plateau, and 0.75 sits in its middle.
  let SYN_W = 0.75;

  function scoreEntry(entry, queryLower, tokens, mathForms, queryBigrams) {
    let total = 0;
    // Coverage replaces the old weak-link penalty AND the dead-word slack rule
    // with a single number: what share of the query's *information* this card
    // accounts for, measured in IDF rather than in word count. Failing to match
    // "triangle" costs almost nothing; failing to match "frobenius" is fatal.
    // That is the same intent the two old heuristics had, without them being able
    // to compound into each other unpredictably.
    let covered = 0, demand = 0;

    for (const tok of tokens) {
      let bestTf = 0, bestWord = tok;
      for (const t of expandToken(tok)) {
        const r = fieldTf(entry, t);
        const tf = t === tok ? r.tf : r.tf * SYN_W;
        if (tf > bestTf) { bestTf = tf; bestWord = r.word; }
      }
      const idf = idfOf(bestTf > 0 ? bestWord : tok);
      demand += idf;
      if (bestTf > 0) {
        covered += idf;
        total += SCALE * idf * bestTf / (K1 + bestTf);   // BM25 saturation
      }
    }
    const coverage = demand > 0 ? covered / demand : 0;
    // Prefer cards that explain more of the query, but as a smooth factor rather
    // than the old hard strict/loose pool split. That split discarded every
    // partial match the moment any single card cleared the bar, which is how
    // "reflect a point to shorten a path" fell from rank 1 to off the list.
    total *= 0.25 + 0.75 * coverage;

    // Phrase bonus. Each shared adjacent pair is weighted by how rare that pair is,
    // so "three sides" earns real credit while "of the" earns none. This is what
    // separates a card from its topical neighbours when every individual word in the
    // query is common.
    if (queryBigrams && queryBigrams.length) {
      let bg = 0;
      for (const b of queryBigrams) if (entry.bigrams.has(b)) bg += bigramIdf(b);
      total += BIGRAM_W * bg;
    }

    // Whole-query bonuses: exact name, name containing the query, exact tag phrase.
    if (entry.nameLower === queryLower) total += 80;
    else if (entry.nameLower.includes(queryLower) && queryLower.length >= 4) {
      // Scale by how much of the name the query actually covers. A flat bonus made
      // every card whose name merely CONTAINS the word tie with the card the word
      // names: searching "telescoping" put Arctangent Addition & Telescoping above
      // Telescoping Sums, and "circle area" put Inradius Formula above Circle Basics.
      // Covering most of the name is strong evidence; being one word of four is not.
      total += 30 * (queryLower.length / entry.nameLower.length);
    }
    if (entry.tagPhrases.includes(queryLower)) total += 40;

    // Typed-formula match against the entry's own math.
    const mScore = mathMatchScore(entry, mathForms);
    total += mScore;

    return { total, matchedAll: coverage >= COVERAGE_MIN || mScore >= 30, coverage };
  }

  // RRF constants. K damps the difference between adjacent ranks (60 is the
  // standard choice); the two weights set how much say each channel has.
  // Each channel has its own rank-decay constant, though both measured best at 60.
  // Shrinking RRF_K_SEM lets the semantic side rescue a card the lexical channel
  // buried, which sounds right and does lift the `hard` group (12 -> 16 at K = 12),
  // but it costs more than it gains: `paraphrase` fell 48 -> 41 and top-1 dropped.
  // Kept as a separate knob because the two channels genuinely could want
  // different decay, but do not lower it without re-running the eval.
  let RRF_K = 60, RRF_K_SEM = 60, RRF_LEX = 1.0, RRF_SEM = 0.30,
      RRF_MARGIN = 0.25, RRF_MIN_TOKENS = 3, RRF_SIM_LO = 0.35, RRF_SIM_HI = 0.55;


  // opts.only: a Set of card ids to restrict the answer to, applied to the ranked pool
  // rather than to the corpus. Scoring stays corpus-wide — IDF and field-length norms are
  // only meaningful against the whole library — but the trim and the cap then apply to what
  // survives, so searching inside a 141-card list is not silently cut off by the global
  // top-60 before the filter ever runs.
  function searchFormulas(rawQuery, opts) {
    let raw = rawQuery.trim();
    if (ABBREV[raw.toLowerCase()]) raw = ABBREV[raw.toLowerCase()];   // whole query is an abbreviation
    const queryLower = spellOperators(raw.toLowerCase());
    let tokens = wordsOf(queryLower).filter(t => !STOPWORDS.has(t));
    if (!tokens.length) tokens = wordsOf(queryLower);
    // expand any abbreviation that appears as its own token (mixed queries)
    tokens = tokens.flatMap(t => ABBREV[t] ? wordsOf(ABBREV[t]).filter(w => !STOPWORDS.has(w)) : [t]);
    // A token that appears on no card anywhere cannot narrow anything down; all
    // it can do is stop every card from matching the whole query. Filler like
    // "made" or "basically" is exactly this, and long plainly-worded questions
    // are full of it. (Kept if it would empty the query, so a search for a word
    // the library simply lacks still reports honestly rather than silently
    // searching for something else.)
    // Repair typos before pruning: an unknown token gets one chance to resolve to
    // a real corpus word. Only then are the still-unknown ones (genuine filler
    // like "made" or "basically") dropped, since a word on no card cannot narrow
    // anything down and would otherwise stop every card from covering the query.
    tokens = tokens.map(t => {
      if (inCorpus(t)) return t;
      return correctToken(t) || t;
    });
    // The semantic channel wants the words the lexical one is about to throw away:
    // "connecting" sits on no card, so inCorpus drops it, yet it is precisely the
    // word that should reach a card saying "joining the side midpoints".
    const semanticTokens = tokens.slice();
    const meaningful = tokens.filter(inCorpus);
    if (meaningful.length) tokens = meaningful;
    const mathForms = queryMathForms(rawQuery);
    if (!tokens.length && !mathForms) return { results: [], partial: false };
    // Query phrases, built the same way the index was so the two line up.
    const queryBigrams = Array.from(bigramsOf(queryLower));

    const scored = [];
    let anyFull = false;
    // A text search is global: it ignores the per-section level/importance
    // filters, which are local to each of the four category pages, not to search.
    for (const entry of ALL) {
      const { total, matchedAll } = scoreEntry(entry, queryLower, tokens, mathForms, queryBigrams);
      if (total <= 0) continue;
      if (matchedAll) anyFull = true;
      scored.push({ entry, score: total });
    }

    // Prefer entries matching every keyword; fall back to partial matches.
    // Ties break toward higher-importance formulas, then names.
    const cmp = (a, b) => b.score - a.score ||
      labelRank(a.entry.formula) - labelRank(b.entry.formula) ||
      a.entry.formula.name.localeCompare(b.entry.formula.name);
    let pool = scored;
    pool.sort(cmp);

    // ---------- Reciprocal Rank Fusion ----------
    // Combine the lexical and semantic rankings by RANK, not by score. The two
    // produce numbers on unrelated scales, and normalizing them against each other
    // is fragile — a query where one channel happens to score large would swamp
    // the other. RRF sidesteps calibration entirely: each channel contributes
    // w/(K + rank), so a card the lexical side already ranks first cannot be
    // displaced by a semantic guess, while a card only the semantic side knows
    // about can still climb into view. That is what lets semantics be added
    // without putting the existing behaviour at risk.
    const SEM = window.MathSemantic;
    if (SEM && SEM.ready() && semanticTokens.length) {
      const sem = SEM.rank(semanticTokens, 40);
      if (sem && sem.length) {
        // Gate the semantic channel on how sure the lexical one is.
        //
        // Measured on the eval set, the two channels are not equals: lexical gets
        // 134/148 top-1, semantic 100/148. Blending them everywhere therefore lets
        // the weaker one disturb answers the stronger one already had right —
        // "triangle inequality" fell from 1st to 4th, "denesting radicals" to 9th.
        // But on queries where lexical is merely guessing, semantics is exactly
        // what is needed: it is what finally puts Medial Triangle first for
        // "area of triangle formed by connecting midpoints of the sides".
        //
        // The relative gap between the top two lexical scores separates those two
        // situations. A decisive winner (exact name match, a rare term) leads by a
        // wide margin and is left alone; a flat top means the lexical channel has
        // no real opinion, so semantics gets its full say.
        // Query length is the second signal. A one- or two-word query is nearly
        // always a name or a piece of contest shorthand ("denesting radicals",
        // "triangle inequality"), where the lexical channel is authoritative and
        // there is no paraphrase to bridge. Long, plainly-worded questions are the
        // opposite. Every casualty of ungated fusion was a short query; every
        // beneficiary was a long one.
        const s1 = pool.length ? pool[0].score : 0;
        const s2 = pool.length > 1 ? pool[1].score : 0;
        const margin = s1 > 0 ? (s1 - s2) / s1 : 0;
        // Third signal, and the only calibrated one available: the semantic
        // channel's own top cosine. BM25 scores mean nothing in absolute terms,
        // but a cosine does — around 0.6 the match is genuinely close, around 0.3
        // it is noise. So let the semantic side speak up when it is actually sure
        // and stand down when it is guessing, instead of always contributing the
        // same fixed share.
        const sim = sem[0].score;
        const conf = Math.max(0, Math.min(1, (sim - RRF_SIM_LO) / (RRF_SIM_HI - RRF_SIM_LO)));
        const semW = semanticTokens.length < RRF_MIN_TOKENS
          ? 0
          : RRF_SEM * conf * (1 - Math.min(1, margin / RRF_MARGIN));
        const fused = new Map();
        for (let i = 0; i < pool.length; i++) {
          fused.set(pool[i].entry.formula.id,
            { entry: pool[i].entry, score: RRF_LEX / (RRF_K + i + 1) });
        }
        for (let i = 0; i < sem.length; i++) {
          const bump = semW / (RRF_K_SEM + i + 1);
          const hit = fused.get(sem[i].id);
          if (hit) hit.score += bump;
          else if (BY_ID[sem[i].id]) fused.set(sem[i].id, { entry: BY_ID[sem[i].id], score: bump });
        }
        pool = Array.from(fused.values());
        pool.sort(cmp);
      }
    } else if (SEM && SEM.status() === "idle") {
      SEM.load();          // warm it for the next keystroke; this query stays lexical
    }
    // Trim the weak tail: keep the clearly-relevant matches (always at least the
    // top handful), then drop entries scoring far below the leader so a growing
    // library doesn't bury the answer under near-misses.
    const only = opts && opts.only;
    const topScore = pool.length ? pool[0].score : 0;
    // A scoped search measures relevance against the whole library, and keeps no floor.
    // Judging against the best card that happens to be in this list instead would mean a
    // geometry term searched inside a number-theory list still returned its six least-bad
    // cards; against the library, nothing there clears the bar and the answer is honestly
    // empty. The unscoped path is untouched — its floor is what guarantees a search for a
    // word the library barely knows still shows its nearest misses.
    let kept;
    if (only) {
      // Two gates, because one is not enough. Against the library (0.3 of the global best)
      // so a term the list knows nothing about returns nothing at all. Then against the best
      // card actually in the list, because once the semantic channel is warm the fused scores
      // bunch up and the library gate alone let 44 of a 62-card list through — the same as
      // showing the list. The cap is the backstop.
      const inScope = pool.filter(r => only.has(r.entry.formula.id) && r.score >= topScore * 0.3);
      const best = inScope.length ? inScope[0].score : 0;
      kept = inScope.filter(r => r.score >= best * 0.75).slice(0, 20);
    } else {
      kept = pool.filter((r, i) => i < 6 || r.score >= topScore * 0.3);
    }
    return {
      results: kept.slice(0, 60).map(r => r.entry),
      partial: !anyFull && pool.length > 0
    };
  }

  // ---------- Sorting ----------

  // The "Show" dropdown filters by importance tier rather than reordering;
  // curated order (or search relevance) is always preserved.
  function sortEntries(entries) {
    return entries;
  }

  // ---------- "Most practice problems" order (Settings -> Card order) ----------
  // The count is the number the card page lists under its problems, trick uses included.
  function problemCount(id) { return (PROBLEMS_BY_CARD[id] || []).length; }
  // Section and topic pages only. This is deliberately NOT sortEntries(), which also runs on
  // search results: reordering those by problem count would throw away their relevance order.
  // Used cards first, most-used first; the importance tier only decides ties and the cards no
  // problem uses yet, which is the one place the subjective ranking is still all we have.
  function browseOrder(entries) {
    if (state.order !== "problems") return entries;
    return entries.map((e, i) => ({ e, i, n: problemCount(e.formula.id) }))
      .sort((a, b) => b.n - a.n || impRank(a.e.formula) - impRank(b.e.formula) || a.i - b.i)
      .map(x => x.e);
  }

  // ---------- Rendering ----------

  // Split a multi-formula latex string into its separate formulas.
  // Separators: any "\qquad", or "\quad" directly after a comma/semicolon. A separator
  // inside a \begin{..}..\end{..} block belongs to that block (a multi-line thumbnail is
  // one gathered environment), so environments are set aside before splitting.
  function splitLatexParts(latex) {
    const envs = [];
    let held = latex, prev;
    do {
      prev = held;
      held = held.replace(/\\begin\{(\w+\*?)\}(?:(?!\\begin\{)[\s\S])*?\\end\{\1\}/g, m => "\u0002" + (envs.push(m) - 1) + "\u0003");
    } while (held !== prev);
    const restore = t => { let r = t, q; do { q = r; r = r.replace(/\u0002(\d+)\u0003/g, (_, i) => envs[+i]); } while (r !== q); return r; };
    return held
      .split(/\s*(?:[,;]\s*\\q?quad|\\qquad)\s*/)
      .map(p => restore(p).trim())
      .filter(Boolean);
  }

  // Stack a multi-formula string into rows instead of one long row (for display).
  function toDisplayLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}" + parts.join(" \\\\[0.55em] ") + "\\end{gathered}";
  }

  // The exact LaTeX the reader sees, formatted for the clipboard: single-formula
  // cards copy as-is; multi-formula cards copy the same stacked `gathered`
  // environment that's rendered, with real newlines for readability.
  function toCopyLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}\n" + parts.join(" \\\\[0.55em]\n") + "\n\\end{gathered}";
  }

  // `lazyCards`: on a long page (a subject, a long study list) the cards' math is typeset only
  // as each card nears the screen, by the same observer that fits card formulas. Typeset math
  // is most of such a page's elements (48,000 of 54,000 on Geometry), and laying all of it out
  // up front is what made those pages slow.
  function renderMath(container, lazyCards) {
    if (lazyCards) container.querySelectorAll(".cards > .card").forEach(c => { c.dataset.math = "0"; });
    const skip = el => lazyCards && el.closest('.card[data-math="0"]');
    container.querySelectorAll(".formula-display[data-latex]").forEach(el => {
      if (skip(el)) return;
      try {
        katex.render(toDisplayLatex(el.dataset.latex), el, { throwOnError: false, displayMode: true });
      } catch (err) {
        el.textContent = el.dataset.latex;
      }
    });
    if (window.renderMathInElement) {
      // Anywhere a formula NAME can appear needs to be on this list: eight card names carry
      // LaTeX ("Powers of $x + 1/x$", "Primes Are $6k \\pm 1$"), and a surface left off here
      // shows the raw dollar signs instead of typesetting them.
      container.querySelectorAll(".card-desc, .card-name, .card-example, .detail-body, .key-forms, .related-item, .problem-q, .problem-sol, .strat-name, .prob-strategy, .prob-strategy-box, .trick-prose, .cp-head, .cp-desc, .wiki-list a, .dym-link, .card-lead, .lead-box, .contest-profile, .supp-math, .prob-chain, .prob-think, .sp-chain, .tt-title, .tt-sample, .tt-blurb, .topic-blurb, .topic-step, .ix-cards, .ix-topic, .rc-name, .rs-box, .hw-example, .back-link, .prob-statement, .dyk-fact").forEach(el => {
        if (skip(el)) return;
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      });
    }
    bindMathPunctuation(container);
    tidyDiagrams(container);
    requestAnimationFrame(() => fitInlineMath(container));
    // Card formulas are fitted once, at the end of render(), after the layout settles.
  }
  // Inline math wider than its line, on a phone or at a larger text size. Math held to its
  // punctuation first gets its own line breaks back; math that still overflows (a long root or
  // a \text{} run, which KaTeX cannot break) scrolls sideways on its own instead of running off
  // the page. Only math that overflows is touched, so ordinary lines keep their layout.
  function fitInlineMath(container) {
    if (!container || !container.querySelectorAll) return;
    const over = el => {
      const blk = el.parentElement && el.parentElement.closest("p, li, td, div, section");
      return blk && el.getBoundingClientRect().right > blk.getBoundingClientRect().right + 1;
    };
    container.querySelectorAll(".math-glue.loose, .math-wide").forEach(el => el.classList.remove("loose", "math-wide"));
    container.querySelectorAll(".katex:not(.katex-display .katex):not(.katex .katex)").forEach(k => {
      if (k.closest(".formula-display") || !over(k)) return;
      const glue = k.closest(".math-glue");
      if (glue) { glue.classList.add("loose"); if (!over(k)) return; }
      k.classList.add("math-wide");
    });
  }
  // Punctuation stays with the math it touches, as a word keeps its comma: ", so" after $D$
  // could otherwise wrap alone to the start of the next line, and an opening bracket could hang
  // at the end of one. The math and its touching punctuation go into one unbreakable span.
  function bindMathPunctuation(container) {
    container.querySelectorAll(".katex:not(.katex-display .katex)").forEach(k => {
      if (k.closest(".katex-display") || k.closest(".math-glue")) return;
      // A long formula keeps its own line breaks; only short math is held to its punctuation.
      if ((k.querySelector(".katex-mathml annotation") || k).textContent.length > 40) return;
      // auto-render wraps each formula in a plain <span>; the punctuation sits beside that.
      const par = k.parentElement;
      const box = par && par.tagName === "SPAN" && !par.className && par.childNodes.length === 1 ? par : k;
      const next = box.nextSibling, prev = box.previousSibling;
      const after = next && next.nodeType === 3 ? next.nodeValue.match(/^[,.;:!?)\]’”'"]+/) : null;
      const before = prev && prev.nodeType === 3 ? prev.nodeValue.match(/[(\[“‘]+$/) : null;
      if (!after && !before) return;
      const glue = document.createElement("span");
      glue.className = "math-glue";
      box.parentNode.insertBefore(glue, box);
      if (before) { prev.nodeValue = prev.nodeValue.slice(0, -before[0].length); glue.appendChild(document.createTextNode(before[0])); }
      glue.appendChild(box);
      if (after) { next.nodeValue = next.nodeValue.slice(after[0].length); glue.appendChild(document.createTextNode(after[0])); }
    });
  }

  // ---------- Diagram legibility pass ----------
  // Computed SVG figures are geometrically exact but can crowd: point dots
  // hidden under strokes and (in dense figures) labels overlapping each other.
  // This runs once per render and, without touching the geometry, raises dots
  // and labels above the lines, then nudges apart labels that actually overlap.
  function tidyDiagrams(container) {
    // The hover preview's thumbnail is the same figure, so it gets the same pass; without it
    // the preview showed the labels where they were drawn, not where the card page puts them.
    container.querySelectorAll(".diagram svg, .cp-thumb svg").forEach(svg => {
      try {
        tidyDiagram(svg);
        centerDiagram(svg);
        // Only the at-a-glance figures on the scrolling card list get cropped. Detail pages
        // have room to breathe; the card list is where an over-tall canvas costs real scroll.
        if (svg.closest(".card-glance")) cropDiagramHeight(svg);
        // A preview has a fixed box: crop to the drawing on both sides so it fills the box.
        if (svg.closest(".cp-thumb")) fitDiagramToContent(svg);
      } catch (e) { /* getBBox can throw if the svg isn't laid out */ }
    });
  }

  // Crop the viewBox to the drawing itself, with a small margin, on all four sides. Used for
  // the hover preview, where many figures drawn on a roomy canvas otherwise filled only half
  // of the box.
  function fitDiagramToContent(svg) {
    const vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
    const bb = svg.getBBox();
    if (vb.length !== 4 || !vb.every(isFinite) || !bb || !(bb.width > 20) || !(bb.height > 20)) return;
    // Only inside the original canvas: a figure may draw past its edge (a large circle the
    // page clips), and that part was never meant to be seen.
    const pad = 10;
    const x0 = Math.max(vb[0], bb.x - pad), y0 = Math.max(vb[1], bb.y - pad);
    const x1 = Math.min(vb[0] + vb[2], bb.x + bb.width + pad), y1 = Math.min(vb[1] + vb[3], bb.y + bb.height + pad);
    if (x1 - x0 > 20 && y1 - y0 > 20) svg.setAttribute("viewBox", [x0, y0, x1 - x0, y1 - y0].map(v => v.toFixed(1)).join(" "));
  }

  // Shift the viewBox sideways so the drawing sits in the middle of its canvas. Only x moves:
  // the width, and so the scale, is untouched. Figures composed with a wide label column on
  // one side otherwise read as pushed off to the right inside their centered frame.
  function centerDiagram(svg) {
    const vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
    if (vb.length !== 4 || !vb.every(isFinite)) return;
    const bb = svg.getBBox();
    if (!bb || !isFinite(bb.width) || bb.width <= 0 || bb.width >= vb[2]) return;
    const x = bb.x + bb.width / 2 - vb[2] / 2;
    if (Math.abs(x - vb[0]) > 4) svg.setAttribute("viewBox", x.toFixed(1) + " " + vb[1] + " " + vb[2] + " " + vb[3]);
  }

  // Trim the empty band above and below the drawing. Only the vertical extent of the
  // viewBox changes: x and width are left alone, so the horizontal scale, and therefore the
  // rendered size of the figure itself, is untouched. Several diagrams were composed on a
  // canvas far taller than their content (AM-GM used 57% of its height on nothing), which
  // read as a large empty box around a small picture. Runs after tidyDiagram so that labels
  // it has just moved are inside the measured bounds.
  function cropDiagramHeight(svg) {
    const vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
    if (vb.length !== 4 || !vb.every(isFinite)) return;
    const bb = svg.getBBox();
    if (!bb || !isFinite(bb.height) || bb.height <= 0) return;
    const pad = 12;                                   // room for stroke width and descenders
    const top = Math.max(vb[1], bb.y - pad);
    const bottom = Math.min(vb[1] + vb[3], bb.y + bb.height + pad);
    const h = bottom - top;
    if (h > 20 && h < vb[3] - 6) svg.setAttribute("viewBox", vb[0] + " " + top.toFixed(1) + " " + vb[2] + " " + h.toFixed(1));
  }

  function tidyDiagram(svg) {
    const texts = [...svg.querySelectorAll("text")];
    if (!texts.length) return;

    // raise point dots (small filled circles) above the lines, then labels on top
    svg.querySelectorAll("circle").forEach(c => {
      const r = parseFloat(c.getAttribute("r") || "0");
      const fill = (c.getAttribute("fill") || "").toLowerCase();
      if (r > 0 && r <= 7 && fill && fill !== "none") svg.appendChild(c);
    });
    texts.forEach(t => svg.appendChild(t));

    // (3) push apart labels that genuinely overlap (SVG y-down coordinates)
    const badges = [...svg.querySelectorAll("circle")].map(c => ({
      cx: +c.getAttribute("cx"), cy: +c.getAttribute("cy"), r: parseFloat(c.getAttribute("r") || "0"),
      fill: (c.getAttribute("fill") || "").toLowerCase()
      // A mass-point weight badge is a small disk filled in the card colour. The
      // old test — any filled circle of radius 9 or more — also caught the main
      // circles of a figure, so every label inside one was flung out to its rim,
      // stacking three labels on the same spot in Apollonius, inversion and
      // Descartes.
    })).filter(c => c.r >= 9 && c.r <= 15 && /bg-card/.test(c.fill));
    const L = texts.map(t => {
      const b = t.getBBox();
      const o = { t, w: b.width, h: b.height, x: b.x + b.width / 2, y: b.y + b.height / 2, dx: 0, dy: 0 };
      o.fixed = /^\d+$/.test((t.textContent || "").trim()) &&
        badges.some(c => Math.hypot(o.x - c.cx, o.y - c.cy) < c.r * 0.7);   // a weight centered in a badge — leave put
      return o;
    }).filter(o => o.w > 0);
    // Relax every overlapping pair at once, pushing both halves apart. Moving one
    // label at a time could not untangle a three-way pile-up: each fix recreated
    // an overlap with the label handled just before it.
    function separateLabels() {
      for (let it = 0; it < 30; it++) {
        let worst = 0;
        for (let i = 0; i < L.length; i++) {
          for (let j = i + 1; j < L.length; j++) {
            const a = L[i], b = L[j];
            if (a.fixed && b.fixed) continue;
            const ox = (a.w + b.w) / 2 + 2 - Math.abs((a.x + a.dx) - (b.x + b.dx));
            const oy = (a.h + b.h) / 2 - Math.abs((a.y + a.dy) - (b.y + b.dy));
            if (ox <= 0 || oy <= Math.min(a.h, b.h) * 0.35) continue;
            worst = Math.max(worst, oy);
            let vx = (a.x + a.dx) - (b.x + b.dx), vy = (a.y + a.dy) - (b.y + b.dy);
            if (!vx && !vy) { vx = (i % 2) ? 1 : -1; vy = 1; }
            const n = Math.hypot(vx, vy) || 1;
            const step = Math.min(oy, Math.min(a.h, b.h) * 0.55) * 0.6;
            const wa = b.fixed ? 1 : 0.5, wb = a.fixed ? 1 : 0.5;
            if (!a.fixed) { a.dx += vx / n * step * (wa * 2); a.dy += vy / n * step * (wa * 2); }
            if (!b.fixed) { b.dx -= vx / n * step * (wb * 2); b.dy -= vy / n * step * (wb * 2); }
          }
        }
        if (worst === 0) break;
      }
    }

    // (4) push labels off any line drawn through them. Label-vs-label was already
    // handled above, but a segment running under a label cut straight through the
    // glyphs, which is the more common and more damaging collision.
    // Every drawn outline, not just <line>. Only straight segments were considered before,
    // which left 40% of the collisions untouched: a label could sit squarely on a triangle
    // edge (<polygon>), a circle, or an arc and nothing would move it. Curved and polygonal
    // outlines are flattened into short segments so the same push-off maths applies.
    const segs = [];
    // Paint order, so a stroke can be recognised as hidden: a grid line drawn under an opaque
    // node circle does not cross the number printed in that node, however close the two are.
    // Treating it as visible shoved every node number in the grid-path figures off-centre.
    const order = new Map([...svg.querySelectorAll("*")].map((el, i) => [el, i]));
    const opaque = el => {
      const f = (el.getAttribute("fill") || "").trim().toLowerCase();
      if (!f || f === "none" || f === "transparent" || /rgba|hsla/.test(f)) return false;
      const fo = el.getAttribute("fill-opacity"), op = el.getAttribute("opacity");
      return !(fo && +fo < 0.95) && !(op && +op < 0.95);
    };
    const covers = [];
    svg.querySelectorAll("circle, rect").forEach(el => {
      if (!opaque(el)) return;
      const ord = order.get(el);
      if (el.tagName.toLowerCase() === "circle") {
        const r = parseFloat(el.getAttribute("r") || "0");
        if (r > 7) covers.push({ ord, inside: (x, y) => Math.hypot(x - +el.getAttribute("cx"), y - +el.getAttribute("cy")) <= r - 1 });
      } else {
        const x = +el.getAttribute("x"), y = +el.getAttribute("y"), w = +el.getAttribute("width"), h = +el.getAttribute("height");
        covers.push({ ord, inside: (px, py) => px >= x - 1 && px <= x + w + 1 && py >= y - 1 && py <= y + h + 1 });
      }
    });
    // Is this stroke painted over by an opaque shape wherever it could meet box b?
    const hiddenIn = (sg, b) => covers.some(c => c.ord > sg.ord &&
      c.inside(b[0], b[1]) && c.inside(b[2], b[1]) && c.inside(b[0], b[3]) && c.inside(b[2], b[3]));
    // `vertex` marks a real endpoint of a drawn segment. A label sitting near one is
    // usually labelling that very point, so the push-off below leaves it alone. Samples taken
    // along a flattened curve have no such meaning: every one of their endpoints is near the
    // label, which silently exempted whole circles from the pass.
    // A stroke at 10% opacity or less (the barely-there coordinate grids) cannot cut a glyph.
    const invisible = el => { const m = (el.getAttribute("stroke") || "").match(/rgba\([^)]*,\s*([\d.]+)\)/); return !!m && +m[1] <= 0.1; };
    const addSeg = (p, q, vertex, el) => {
      if (invisible(el)) return;
      if (isFinite(p[0]) && isFinite(p[1]) && isFinite(q[0]) && isFinite(q[1]) &&
          (p[0] !== q[0] || p[1] !== q[1])) segs.push({ p, q, vertex: !!vertex, el, ord: order.get(el) });
    };
    svg.querySelectorAll("line").forEach(l =>
      addSeg([+l.getAttribute("x1"), +l.getAttribute("y1")], [+l.getAttribute("x2"), +l.getAttribute("y2")], true, l));
    svg.querySelectorAll("polygon, polyline").forEach(el => {
      if ((el.getAttribute("stroke") || "").toLowerCase() === "none") return;
      const pts = (el.getAttribute("points") || "").trim().split(/\s+/)
        .map(t => t.split(",").map(Number)).filter(p => p.length === 2 && p.every(isFinite));
      for (let k = 0; k + 1 < pts.length; k++) addSeg(pts[k], pts[k + 1], true, el);
      if (el.tagName.toLowerCase() === "polygon" && pts.length > 2) addSeg(pts[pts.length - 1], pts[0], true, el);
    });
    svg.querySelectorAll("rect").forEach(el => {
      const st = (el.getAttribute("stroke") || "none").toLowerCase();
      if (st === "none") return;
      const x = +el.getAttribute("x"), y = +el.getAttribute("y"), w = +el.getAttribute("width"), h = +el.getAttribute("height");
      const c = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
      for (let k = 0; k < 4; k++) addSeg(c[k], c[(k + 1) % 4], true, el);
    });
    // Curves and circle outlines: sample the path into a polyline. Filled shapes are skipped,
    // since a label sitting on a shaded region is fine; it is the stroke that cuts glyphs.
    svg.querySelectorAll("path, circle, ellipse").forEach(el => {
      const fill = (el.getAttribute("fill") || "none").toLowerCase();
      const stroke = (el.getAttribute("stroke") || "").toLowerCase();
      if (el.tagName.toLowerCase() !== "path" && fill !== "none" && fill !== "") return;
      if (stroke === "none") return;
      let len = 0;
      try { len = el.getTotalLength ? el.getTotalLength() : 0; } catch (e) { return; }
      if (!len || !isFinite(len)) return;
      const n = Math.max(8, Math.min(160, Math.round(len / 6)));
      let prev = null;
      for (let k = 0; k <= n; k++) {
        let pt;
        try { pt = el.getPointAtLength(len * k / n); } catch (e) { return; }
        const cur = [pt.x, pt.y];
        if (prev) addSeg(prev, cur, false, el);
        prev = cur;
      }
    });
    // Smallest move that takes box b off segment pq, or null when they do not touch. Separating
    // axes: x, y and the segment's normal. The old test compared the distance to the nearest
    // point of the segment against the box's reach in that direction, which is only right for
    // points straight above or beside the label; a wide label with a line off to one side
    // diagonally "hit" a line nowhere near its glyphs and was thrown 50 to 100px across the
    // figure (the periodic-sequence arc, the vertex-form parabola, the product-to-sum rays).
    function satPush(b, p, q) {
      const ox1 = Math.max(p[0], q[0]) - b[0], ox2 = b[2] - Math.min(p[0], q[0]);
      const oy1 = Math.max(p[1], q[1]) - b[1], oy2 = b[3] - Math.min(p[1], q[1]);
      if (ox1 <= 0 || ox2 <= 0 || oy1 <= 0 || oy2 <= 0) return null;
      let vx = q[1] - p[1], vy = p[0] - q[0];
      const n = Math.hypot(vx, vy); if (!n) return null; vx /= n; vy /= n;
      const hw = (b[2] - b[0]) / 2, hh = (b[3] - b[1]) / 2, cx = b[0] + hw, cy = b[1] + hh;
      const dn = (cx - p[0]) * vx + (cy - p[1]) * vy, on = Math.abs(vx) * hw + Math.abs(vy) * hh - Math.abs(dn);
      if (on <= 0) return null;
      const sg = dn >= 0 ? 1 : -1;
      return [[1, 0, ox1], [-1, 0, ox2], [0, 1, oy1], [0, -1, oy2], [sg * vx, sg * vy, on]]
        .reduce((m, c) => (c[2] < m[2] ? c : m));
    }
    function clearLines() {
      if (!segs.length) return;
      for (const o of L) {
        if (o.fixed) continue;
        for (let it = 0; it < 4; it++) {
          const cx = o.x + o.dx, cy = o.y + o.dy;
          // The glyphs plus a small margin, not the em box: the em box carries empty ascent and
          // descent bands, and a line through those is not touching the label at all.
          const hw = o.w / 2 + 1, hh = o.h * 0.3 + 2;
          const box = [cx - hw, cy - hh, cx + hw, cy + hh];
          let best = null;
          for (const sg of segs) {
            if (hiddenIn(sg, box)) continue;
            if (sg.vertex) {
              const near = Math.min(Math.hypot(sg.p[0] - cx, sg.p[1] - cy),
                                    Math.hypot(sg.q[0] - cx, sg.q[1] - cy));
              if (near < Math.max(20, o.h * 1.6)) continue;   // it is labelling that endpoint
            }
            const push = satPush(box, sg.p, sg.q);
            if (push && (!best || push[2] > best[2])) best = push;
          }
          if (!best) break;
          o.dx += best[0] * (best[2] + 0.5); o.dy += best[1] * (best[2] + 0.5);
        }
      }
    }

    // The two passes can undo one another (clearing a line can shove a label onto
    // its neighbour), so alternate them. Label-on-label is the worse defect —
    // overlapping glyphs are unreadable, while a line grazing a label is only
    // untidy — so the separation pass runs last and gets the final say.
    // Clamp inside the loop, not after it: capping a label's travel at the very
    // end could drop it back on top of a neighbour the separation pass had just
    // resolved.
    function capMoves() {
      L.forEach(o => {
        const cap = o.h * 2.6, d = Math.hypot(o.dx, o.dy);
        if (d > cap) { o.dx *= cap / d; o.dy *= cap / d; }
      });
    }
    for (let round = 0; round < 4; round++) { clearLines(); capMoves(); separateLabels(); }
    capMoves(); separateLabels();

    // (5) Anything still printed on a stroke, a marker dot or another label is re-placed
    // around the point it labels. The passes above only nudge, and they deliberately ignore
    // the segments that end at a label's own vertex, so a vertex letter could sit squarely on
    // one of its own sides, and a label could sit on its own dot (the "1"s on the circle
    // centres in the Soddy figure, O1 on its centre in Monge). Candidate spots ring the
    // anchor, and the nearest one in angle that is clear wins; a label with no nearby point
    // searches outward from where it was drawn instead. Nothing is moved unless the new spot
    // is strictly cleaner, so every label that was already legible stays exactly where its
    // figure put it.
    const dots = [...svg.querySelectorAll("circle")].map(c => ({
      x: +c.getAttribute("cx"), y: +c.getAttribute("cy"), r: parseFloat(c.getAttribute("r") || "0"),
      fill: (c.getAttribute("fill") || "none").toLowerCase()
    })).filter(d => d.r > 0 && d.r <= 7 && d.fill !== "none" && !/rgba\(255,\s*255,\s*255/.test(d.fill));
    const ends = segs.filter(sg => sg.vertex).flatMap(sg => [sg.p, sg.q]);
    const glyph = (o, cx, cy, pad) => {
      const hw = o.w / 2 - 0.8 + pad, hh = o.h * 0.3 + pad;
      return [cx - hw, cy - hh, cx + hw, cy + hh];
    };
    const segHits = (b, p, q) => {
      let t0 = 0, t1 = 1; const dx = q[0] - p[0], dy = q[1] - p[1];
      for (const [pp, qq] of [[-dx, p[0] - b[0]], [dx, b[2] - p[0]], [-dy, p[1] - b[1]], [dy, b[3] - p[1]]]) {
        if (pp === 0) { if (qq < 0) return false; continue; }
        const r = qq / pp;
        if (pp < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
      }
      return true;
    };
    const boxGap = (b, x, y) => Math.hypot(Math.max(b[0] - x, 0, x - b[2]), Math.max(b[1] - y, 0, y - b[3]));
    const vbx = (svg.getAttribute("viewBox") || "0 0 400 300").split(/\s+/).map(Number);
    function clutter(o, cx, cy, pad) {
      const b = glyph(o, cx, cy, pad);
      let n = 0;
      const crossed = new Set();
      for (const sg of segs) if (!crossed.has(sg.el) && segHits(b, sg.p, sg.q) && !hiddenIn(sg, b)) crossed.add(sg.el);
      n += crossed.size;
      for (const d of dots) if (boxGap(b, d.x, d.y) < d.r) n++;
      for (const q of L) if (q !== o) {
        const c = glyph(q, q.x + q.dx, q.y + q.dy, 0);
        if (b[0] < c[2] && c[0] < b[2] && b[1] < c[3] && c[1] < b[3]) n += 1.5;
      }
      if (b[0] < vbx[0] || b[2] > vbx[0] + vbx[2] || b[1] < vbx[1] || b[3] > vbx[1] + vbx[3]) n += 3;
      return n;
    }
    for (const o of L) {
      if (o.fixed) continue;
      const cx = o.x + o.dx, cy = o.y + o.dy;
      if (clutter(o, cx, cy, -1) === 0) continue;
      const now = clutter(o, cx, cy, 1);
      const hw = o.w / 2, hh = o.h * 0.3, reach = Math.max(hw, hh) + 16;
      let anchor = null, ar = 0, best = null;
      for (const d of dots) { const g = Math.hypot(d.x - cx, d.y - cy); if (g < reach && (!anchor || g < anchor.g)) { anchor = { x: d.x, y: d.y, g }; ar = d.r; } }
      if (!anchor) for (const p of ends) { const g = Math.hypot(p[0] - cx, p[1] - cy); if (g < reach && (!anchor || g < anchor.g)) { anchor = { x: p[0], y: p[1], g }; ar = 0; } }
      const consider = (x, y, pen) => {
        const sc = clutter(o, x, y, 1);
        if (!best || sc + pen < best.sc + best.pen) best = { x, y, sc, pen };
      };
      if (anchor) {
        const a0 = Math.atan2(cy - anchor.y, cx - anchor.x);
        for (let k = 0; k < 24; k++) {
          const a = k * Math.PI / 12, ux = Math.cos(a), uy = Math.sin(a);
          let dev = Math.abs(a - a0) % (2 * Math.PI); if (dev > Math.PI) dev = 2 * Math.PI - dev;
          const d0 = Math.abs(ux) * (hw + 1.5) + Math.abs(uy) * (hh + 1.5) + ar + 2.5;
          for (const extra of [0, 5, 10]) consider(anchor.x + ux * (d0 + extra), anchor.y + uy * (d0 + extra), dev * 0.17 + extra * 0.01);
        }
      } else {
        for (let rr = 3; rr <= o.h * 2.6; rr += 3)
          for (let k = 0; k < 16; k++) consider(cx + rr * Math.cos(k * Math.PI / 8), cy + rr * Math.sin(k * Math.PI / 8), rr * 0.02);
      }
      if (best && best.sc < now) { o.dx = best.x - o.x; o.dy = best.y - o.y; }
    }

    const vb = (svg.getAttribute("viewBox") || "0 0 400 300").split(/\s+/).map(Number);
    const ctr = [(vb[2] || 400) / 2, (vb[3] || 300) / 2];
    L.forEach(o => {
      // keep letter labels off weight-badge disks (badges sit outside the figure,
      // so push the label inward, toward the figure's center, until it clears)
      if (!o.fixed) {
        for (const c of badges) {
          if (Math.hypot(o.x + o.dx - c.cx, o.y + o.dy - c.cy) < c.r + o.h * 0.35) {
            let ix = ctr[0] - c.cx, iy = ctr[1] - c.cy; const n = Math.hypot(ix, iy) || 1;
            o.dx = c.cx + ix / n * (c.r + o.h * 0.6) - o.x;
            o.dy = c.cy + iy / n * (c.r + o.h * 0.6) - o.y;
          }
        }
      }
      if (Math.abs(o.dx) > 0.5 || Math.abs(o.dy) > 0.5) {
        const x = parseFloat(o.t.getAttribute("x") || "0"), y = parseFloat(o.t.getAttribute("y") || "0");
        o.t.setAttribute("x", (x + o.dx).toFixed(1));
        o.t.setAttribute("y", (y + o.dy).toFixed(1));
      }
    });
  }

  // Importance means how much a card matters inside its own subsection, whatever its contest tier.
  const IMPORTANCE_LABELS = {
    high: ["HIGH", "High importance: central to its subsection"],
    medium: ["MED", "Medium importance: builds on the core of its subsection"],
    low: ["LOW", "Low importance: useful now and then within its subsection"],
    lower: ["LOWER", "Lower importance: marginal use, needed perhaps once in ten years"],
    lowest: ["LOWEST", "Lowest importance: never expected on a contest; here for completeness or beauty"]
  };

  function badgeHtml(f) {
    const kind = f.type === "method" ? `<span class="badge badge-method">METHOD</span>`
              : f.type === "pattern" ? `<span class="badge badge-pattern">PATTERN</span>`
              : `<span class="badge badge-formula">FORMULA</span>`;
    return kind + f.level.map(l => `<span class="badge badge-${l}">${LEVEL_LABELS[l]}</span>`).join("");
  }

  const TIER_LABELS = {
    "amc": ["AMC", "AMC: needed for AMC 10 and 12 problems 1 to 25"],
    "aime-early": ["AIME-E", "AIME Early: first needed at AIME problems 1 to 10"],
    "aime-late": ["AIME-L", "AIME Late: first needed at AIME problems 11 to 15"],
    "olympiad": ["OLYMPIAD", "Olympiad: beyond the AMC and AIME"]
  };
  // One split oval beside the title: the left half is the contest tier, the right half is the
  // card's importance within its subsection.
  function impBadgeHtml(f) {
    const t = tierKey(f), tl = TIER_LABELS[t], il = IMPORTANCE_LABELS[f.importance];
    if (!tl) return "";
    return `<span class="tagpill tagpill-${t}" title="${tl[1]}${il ? "; " + il[1] : ""}">` +
      `<span class="tp-tier">${tl[0]}</span>${il ? `<span class="tp-imp tp-imp-${f.importance}">${il[0]}</span>` : ""}</span>`;
  }

  function tagRowHtml(f, queryTokens, topics) {
    const tchips = (topics || []).map(t =>
      `<span class="topic-chip" data-topic="${escapeAttr(t.id)}" title="Browse everything tagged &ldquo;${escapeAttr(t.label)}&rdquo;">${escapeAttr(t.label)}</span>`);
    const tags = f.keywords.slice(0, 6).map(k => {
      const hit = queryTokens && queryTokens.some(tok =>
        wordsOf(k).some(w => w === tok || (tok.length >= 3 && w.startsWith(tok))));
      return `<span class="tag${hit ? " tag-hit" : ""}" data-tag="${escapeAttr(k)}">${escapeAttr(k)}</span>`;
    });
    return `<div class="tag-row">${tchips.join("")}${tags.join("")}</div>`;
  }

  // The kind badge alone; the contest tier (or importance) is the card's one other tag.
  function kindBadgeHtml(f) {
    const k = kindOf(f);
    return `<span class="badge badge-${k}">${k.toUpperCase()}</span>`;
  }

  // A browsing card stays calm: name, kind and contest tier, the formula (or a method's When /
  // Core move, a pattern's Recognize / Try), the summary. Star, add and copy show on hover;
  // importance and keyword tags live on the card's own page.
  function cardHtml(entry, showCrumb, queryTokens) {
    const f = entry.formula;
    const crumb = showCrumb
      ? `<span class="card-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</span>`
      : "";
    return `
      <article class="card card-${kindOf(f)}" data-id="${f.id}" id="f-${f.id}">
        <div class="card-head">
          <h4 class="card-name">${f.name}</h4>
          <span class="card-tags">${kindBadgeHtml(f)}${impBadgeHtml(f)}</span>
          <span class="card-actions">
            ${starBtnHtml(f.id)}
            ${addListBtnHtml(f.id)}
          </span>
        </div>
        ${crumb ? `<div class="card-meta">${crumb}</div>` : ""}
        ${f.placeholder ? `<p class="card-planned">Planned card</p>` : isConverted(f) && !f.latex ? cardLeadHtml(f) : cardFormulaHtml(f)}
        <p class="card-desc">${firstSentences(f.description, GRID_SENTENCES)}</p>
        ${extraHtml(f)}
        <div class="more-hint">Open &rsaquo;</div>
      </article>`;
  }

  // A browsing card shows at most as many rows of its formulas as the Formula lines setting
  // allows (1, 2, 3, or all), so the cards in a grid stay about the same height. A row is one
  // form, or one row of a thumbnail that is stacked in a gathered block; the rest are on the
  // card's own page.
  function formulaRows(latex) {
    const rows = [];
    splitLatexParts(latex).forEach(p => {
      const m = p.match(/^\\begin\{gathered\}([\s\S]*)\\end\{gathered\}$/);
      if (m && !/\\begin/.test(m[1])) rows.push(...m[1].split(/\\\\(?:\[[^\]]*\])?/).map(t => t.trim()).filter(Boolean));
      else rows.push(p);
    });
    return rows;
  }
  function cardFormulaHtml(f) {
    const rows = formulaRows(latexFor(f) || "");
    const n = state.lines === "all" ? rows.length : Math.min(+state.lines || 1, rows.length);
    const shown = rows.slice(0, n), more = rows.length - n;
    const latex = shown.length > 1 ? "\\begin{gathered}" + shown.join(" \\\\[0.55em] ") + "\\end{gathered}" : (shown[0] || "");
    return `<div class="formula-display"${n > 1 ? ' data-full="1"' : ""} data-latex="${escapeAttr(latex)}"></div>` +
      (more > 0 ? `<div class="more-forms">+ ${more} more line${more > 1 ? "s" : ""} on its page</div>` : "");
  }
  // A long formula is scaled down to fit its card, never scrolled, and a tall one to a fixed
  // height. When even that would make it too small to read, it keeps a readable size and
  // scrolls sideways.
  // Run after every render of cards, after the math fonts load, and on resize.
  const CARD_FORMULA_MAX_H = 104, CARD_FORMULA_MIN = 0.72;
  // Measured in batches (clear every scale, read every card, write every scale, then check):
  // fitting one card at a time forced a fresh layout per card and made a 200-card subject
  // take seconds to open. The rare card still too wide is fitted on its own afterwards.
  // Fit a batch of formula boxes in a fixed number of layout passes: clear, read, write;
  // the few still too wide get a scrollbar. Fitting card by card forced a fresh layout of the
  // whole page per card.
  function fitBatch(els) {
    if (!els.length) return;
    els.forEach(el => {
      el.classList.remove("fd-scroll");
      const k = el.querySelector(".katex");
      if (k) k.style.fontSize = "";
    });
    // The box's own padding does not scale with the formula, so it comes off both widths.
    const cs = getComputedStyle(els[0]);
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const measure = list => list.map(el => {
      const k = el.querySelector(".katex"), w = el.clientWidth - pad;
      if (!k || w <= 0) return null;
      const d = el.querySelector(".katex-display") || k;
      // A full formula on a large card may be as tall as it needs; only its width is fitted.
      const wide = (el.scrollWidth - pad) / w;
      return { el, k, over: el.dataset.full ? wide : Math.max(wide, d.offsetHeight / CARD_FORMULA_MAX_H) };
    }).filter(x => x && x.over > 1.002);
    const scaleAll = items => items.forEach(x => {
      x.scale = Math.max(0.55, 0.96 / x.over);
      x.k.style.fontSize = (1.18 * x.scale).toFixed(3) + "em";
    });
    const first = measure(els);
    scaleAll(first);
    // A formula that would have to shrink below a readable size stays at that size and gets a
    // horizontal scrollbar instead of being cut short. Thumbnails are written to fit, so this
    // is a fallback.
    first.filter(x => x.scale < CARD_FORMULA_MIN && !x.el.dataset.full).forEach(x => {
      x.k.style.fontSize = (1.18 * CARD_FORMULA_MIN).toFixed(3) + "em";
      x.el.classList.add("fd-scroll");
    });
  }
  // Cards are fitted as they come near the screen, so a subject of two hundred cards opens
  // without measuring the ones far below.
  let fitObserver = null;
  function fitCardFormulas(container) {
    const cards = container.querySelectorAll(".cards > .card");
    if (!("IntersectionObserver" in window)) {
      container.querySelectorAll('.card[data-math="0"]').forEach(c => { c.dataset.math = "1"; renderMath(c); });
      fitBatch([...container.querySelectorAll(".card .formula-display[data-latex]")]);
      return;
    }
    if (!fitObserver) fitObserver = new IntersectionObserver(entries => {
      const els = [];
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        fitObserver.unobserve(en.target);
        if (en.target.dataset.math === "0") { en.target.dataset.math = "1"; renderMath(en.target); }
        en.target.querySelectorAll(".formula-display[data-latex]").forEach(el => els.push(el));
      });
      fitBatch(els);
    }, { rootMargin: "600px 0px" });
    if (container === $content) fitObserver.disconnect();
    cards.forEach(c => fitObserver.observe(c));
  }
  let fitTimer = 0;
  window.addEventListener("resize", () => { clearTimeout(fitTimer); fitTimer = setTimeout(() => { fitCardFormulas($content); fitInlineMath($content); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitCardFormulas($content));

  // Cards preview only the diagram; examples and questions live on the detail
  // page. With figures on, every card that has a figure borrows its first detail
  // diagram at a reduced size on the card face. There is one
  // diagram source now: a handful of cards used to carry raw SVG in a `diagram:`
  // field, which skipped the caption and crop passes and drew outside its own
  // viewBox, so it was migrated into MATH_DIAGRAMS and the field removed.
  function extraHtml(f) {
    if (state.diagrams === "none") return "";
    const glance = ((window.MATH_DIAGRAMS || {})[f.id] || [])[0];
    if (!glance) return "";
    return `
      <div class="card-extra card-thumb">
        <div class="diagram card-glance">${glance}</div>
      </div>`;
  }

  // ---------- Four kinds: formula, method, pattern (and problem) ----------
  // Formulas tell you what is true; methods tell you what you can do; patterns tell you what
  // you are looking at; problems teach you to connect the three. A pattern SUGGESTS methods
  // and a method USES formulas (both authored on the card, `suggests` and `uses`); a problem
  // practices all three through its tags. A method counts as converted once it has `move`,
  // a pattern once it has `recognize`; an unconverted card renders exactly as before, so the
  // conversion runs in batches.
  const kindOf = f => f.type === "method" || f.type === "pattern" ? f.type : "formula";
  const isConverted = f => kindOf(f) === "method" ? !!f.move
    : kindOf(f) === "pattern" ? Array.isArray(f.recognize) && f.recognize.length > 0 : false;
  // A planned card a pattern already points to (`suggests` may name a method that is not
  // written yet): shown by its id as plain text until the card exists.
  const plannedName = id => { const t = id.replace(/-/g, " "); return t.charAt(0).toUpperCase() + t.slice(1); };
  // A card that is planned but not written yet shows as a red link, as a missing article does
  // on Wikipedia: the name is there to be read, and the color says there is no page behind it.
  const redLink = (id, label) => `<span class="red-link" title="No card yet: &ldquo;${escapeAttr(plannedName(id))}&rdquo; is planned">${escapeAttr(label || plannedName(id))}</span>`;
  const USED_BY = {}, SUGGESTED_BY = {};
  Object.keys(BY_ID).forEach(id => {
    const f = BY_ID[id].formula;
    (f.uses || []).forEach(t => (USED_BY[t] = USED_BY[t] || []).push(id));
    (f.suggests || []).forEach(t => (SUGGESTED_BY[t] = SUGGESTED_BY[t] || []).push(id));
  });
  const cardChip = id => BY_ID[id]
    ? `<a class="related-item" href="#/f/${id}">${BY_ID[id].formula.name}</a>`
    : `<span class="related-item related-planned">${redLink(id)}</span>`;
  const chipRow = (title, ids, cls) => ids.length
    ? `<div class="related kind-row${cls ? " " + cls : ""}"><h4>${title}</h4><div class="related-grid">${ids.map(cardChip).join("")}</div></div>`
    : "";
  // A row of plain blue card links, separated by dots: hovering one opens the card preview.
  const cardLinkList = ids => `<p class="link-row">${ids.map(id => BY_ID[id]
    ? `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>`
    : redLink(id)).join(` <span class="pf-dot">&middot;</span> `)}</p>`;
  const linkRow = (title, ids) => ids.length
    ? `<div class="related kind-row"><h4>${title}</h4>${cardLinkList(ids)}</div>`
    : "";
  // The pattern family a pattern sits in: the cluster heading of its subject in patterns.js.
  function familyOf(entry) {
    const g = (entry.subsection.groups || []).find(x => x.ids.indexOf(entry.formula.id) !== -1);
    return g ? g.title : "";
  }

  // The opening box. A method leads with WHEN TO USE and CORE MOVE instead of an equation; a
  // pattern leads with RECOGNIZE (its clues) and TRY (the methods it suggests, as links: the
  // pattern says what to try and the method explains how).
  function leadBoxHtml(f) {
    if (!isConverted(f)) return "";
    if (kindOf(f) === "method") {
      return `<div class="lead-box lead-method">
          <div class="lead-title">Overview</div>
          <div class="lead-row"><div class="lead-label">When to use</div><div class="lead-text">${f.when || ""}</div></div>
          <div class="lead-row"><div class="lead-label">Core move</div><div class="lead-text">${f.move}</div></div>
        </div>`;
    }
    // TRY holds the pattern's top ideas, at most three, of either kind: `tryFirst` when the card
    // names them, otherwise its first three methods. Each carries a small kind label.
    const tries = tryList(f).map(id => BY_ID[id]
      ? `<li><a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a> <span class="try-kind">${kindOf(BY_ID[id].formula)}</span></li>`
      : `<li>${redLink(id)}</li>`).join("");
    return `<div class="lead-box lead-pattern">
        <div class="lead-title">Overview</div>
        <div class="lead-row"><div class="lead-label">Look for</div><ul class="lead-signals">${f.recognize.map(x => `<li>${x}</li>`).join("")}</ul></div>
        ${tries ? `<div class="lead-row"><div class="lead-label">Try</div><ul class="lead-try">${tries}</ul></div>` : ""}
      </div>`;
  }
  function tryList(f) { return (f.tryFirst && f.tryFirst.length ? f.tryFirst : (f.suggests || [])).slice(0, 3); }
  // The same lead in two lines on the browsing card, in place of the formula.
  function cardLeadHtml(f) {
    if (kindOf(f) === "method") {
      return `<div class="card-lead">
          ${f.when ? `<p><span class="lead-label">When</span> ${f.when}</p>` : ""}
          <p><span class="lead-label">Core move</span> ${f.move}</p>
        </div>`;
    }
    const names = tryList(f).map(id => BY_ID[id] ? BY_ID[id].formula.name : plannedName(id)).join(", ");
    return `<div class="card-lead">
        <p><span class="lead-label">Look for</span> ${f.recognize.slice(0, 2).join("; ")}</p>
        ${names ? `<p><span class="lead-label">Try</span> ${names}</p>` : ""}
      </div>`;
  }

  // Pull one "## Title" section out of a write-up: { text, rest }.
  function pullSection(body, title) {
    if (!body) return { text: null, rest: body };
    const re = new RegExp("(^|\\n)## " + title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)");
    const m = body.match(re);
    if (!m) return { text: null, rest: body };
    return { text: m[2].trim(), rest: body.slice(0, m.index) + body.slice(m.index + m[0].length) };
  }

  // Links that follow the card's kind. A method lists the formulas it USES and its supporting
  // mathematics (equations as evidence, not identity); a pattern lists the formulas its
  // methods reach and its pattern family.
  function kindLinksHtml(entry, suppText) {
    const f = entry.formula, k = kindOf(f);
    if (!isConverted(f)) return "";
    if (k === "method") {
      // The formulas a reader needs to know to use the move: one bullet per card in `uses`, in
      // that order, each with the authored line from "## Formulas it uses" ("- [[id]]: how it
      // enters"), as a pattern lists its formulas to try.
      // Shown even when empty ("None yet"), so every converted method has the same sections.
      const uses = f.uses || [];
      const notes = {};
      String(suppText || "").split("\n").forEach(l => { const r = l.trim().match(/^- \[\[([\w-]+)(?:\|[^\]]*)?\]\]:?\s*(.*)$/); if (r) notes[r[1]] = r[2]; });
      const name = id => BY_ID[id] ? `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>` : redLink(id);
      const items = uses.map(id => `<li><span class="try-name">${name(id)}</span>${notes[id] ? `: ${linkifyCards(notes[id])}` : ""}</li>`).join("");
      return `<div class="detail-body uses-block try-block"><h4>Formulas it uses</h4>
          ${items ? `<ul class="detail-list try-list">${items}</ul>` : `<p class="related-empty">None yet.</p>`}
        </div>`;
    }
    const fam = familyOf(entry);
    return fam ? `<p class="family-note">Pattern family: <strong>${escapeAttr(fam)}</strong></p>` : "";
  }
  // A converted method's "When to use": the situations in more detail, then the patterns that
  // suggest it, as a list; "None yet" until a pattern names it.
  function whenToUseHtml(f, text) {
    const pats = SUGGESTED_BY[f.id] || [];
    const items = pats.filter(id => BY_ID[id]).map(id => `<li><a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>${(BY_ID[id].formula.recognize || [])[0] ? `: ${BY_ID[id].formula.recognize[0]}` : ""}</li>`).join("");
    return `<div class="detail-body try-block"><h4>When to use</h4>
        ${text && text.trim() ? detailBodyHtml(text, f.id) : ""}
        <h5 class="try-sub">Suggested by patterns</h5>
        ${items ? `<ul class="detail-list try-list">${items}</ul>` : `<p class="related-empty">None yet.</p>`}
      </div>`;
  }
  // A pattern's "Methods and Formulas to Try": the methods are exactly the ones in its box
  // (`suggests`, in that order), each with the explanation authored as "- [[id]]: ..." under
  // "### Methods to try"; the formulas are the bullets under "### Formulas to try". Any prose
  // before the first "###" introduces both lists.
  function tryHtml(f, text) {
    if (kindOf(f) !== "pattern" || !isConverted(f)) return "";
    const parts = String(text || "").split(/\n?^### /m);
    const intro = parts[0].trim(), subs = {};
    parts.slice(1).forEach(p => { const nl = p.indexOf("\n"); subs[(nl < 0 ? p : p.slice(0, nl)).trim().toLowerCase()] = nl < 0 ? "" : p.slice(nl + 1); });
    const notes = src => {
      const m = {};
      String(src || "").split("\n").forEach(l => { const r = l.trim().match(/^- \[\[([\w-]+)(?:\|[^\]]*)?\]\]:?\s*(.*)$/); if (r) m[r[1]] = r[2]; });
      return m;
    };
    const mNotes = notes(subs["methods to try"]), fNotes = notes(subs["formulas to try"]);
    const name = id => BY_ID[id] ? `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>` : redLink(id);
    const li = (id, note) => `<li><span class="try-name">${name(id)}</span>${note ? `: ${linkifyCards(note)}` : ""}</li>`;
    const methods = (f.suggests || []).map(id => li(id, mNotes[id])).join("");
    const formulas = Object.keys(fNotes).map(id => li(id, fNotes[id])).join("");
    if (!methods && !formulas && !intro) return "";
    return `<div class="detail-body try-block"><h4>Methods and Formulas to Try</h4>
        ${intro ? detailBodyHtml(intro, f.id) : ""}
        ${methods ? `<h5 class="try-sub">Methods to try</h5><ul class="detail-list try-list">${methods}</ul>` : ""}
        ${formulas ? `<h5 class="try-sub">Formulas to try</h5><ul class="detail-list try-list">${formulas}</ul>` : ""}
      </div>`;
  }
  // The other end of each link: a formula shows the methods that use it, a method the
  // patterns that suggest it.
  function reverseLinksHtml(f) {
    const k = kindOf(f);
    if (k === "formula") return linkRow("Used by methods", USED_BY[f.id] || []);
    // A converted method lists these under "When to use" instead.
    if (k === "method") return isConverted(f) ? "" : linkRow("Suggested by patterns", SUGGESTED_BY[f.id] || []);
    return "";
  }

  // Contest profile: what the problem corpus says about this card, kind by kind. One authored
  // sentence (the "## Contest profile" section; it never names a problem) over computed
  // counts. Only converted cards carry one; the others keep their "On contests" prose.
  // How hard a problem is, read from where it sits in its paper: the first third of the
  // numbers is easy, the middle third medium, the last third hard. Shared by the random-problem
  // picker and the contest profile.
  let FAM_MAXNUM = null;
  function difficultyBand(p) {
    if (!FAM_MAXNUM) { FAM_MAXNUM = {}; PROBLEM_DB.forEach(q => { FAM_MAXNUM[q.fam] = Math.max(FAM_MAXNUM[q.fam] || 0, q.num); }); }
    const r = p.num / (FAM_LENGTH[p.fam] || FAM_MAXNUM[p.fam] || 25);
    return r <= 1 / 3 ? "easy" : r <= 2 / 3 ? "medium" : "hard";
  }
  // A small pie of how a card's problems split across contests.
  function pieSvg(parts) {
    const total = parts.reduce((t, x) => t + x[1], 0);
    if (!total) return "";
    const R = 48, C = 50;
    const tip = ([name, n]) => `data-pct="${escapeAttr(name)}: ${Math.round(100 * n / total)}% (${n} of ${total})"`;
    let body;
    if (parts.length === 1) body = `<circle class="pf-c0" cx="${C}" cy="${C}" r="${R}" ${tip(parts[0])}/>`;
    else {
      let a = -Math.PI / 2;
      body = parts.map((part, i) => {
        const b = a + 2 * Math.PI * part[1] / total;
        const x1 = C + R * Math.cos(a), y1 = C + R * Math.sin(a), x2 = C + R * Math.cos(b), y2 = C + R * Math.sin(b);
        const d = `M${C},${C} L${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 ${b - a > Math.PI ? 1 : 0} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
        a = b;
        return `<path class="pf-c${i % 5}" d="${d}" ${tip(part)}/>`;
      }).join("");
    }
    return `<span class="pf-pie-wrap"><svg class="pf-pie" viewBox="0 0 100 100" aria-hidden="true">${body}</svg><span class="pf-tip" hidden></span></span>`;
  }
  // Hovering a slice shows its contest and share next to the cursor.
  document.addEventListener("mousemove", e => {
    const slice = e.target.closest && e.target.closest(".pf-pie [data-pct]");
    document.querySelectorAll(".pf-tip").forEach(t => { if (!slice || !t.parentElement.contains(slice)) t.hidden = true; });
    if (!slice) return;
    const wrap = slice.closest(".pf-pie-wrap"), tip = wrap.querySelector(".pf-tip"), box = wrap.getBoundingClientRect();
    tip.textContent = slice.dataset.pct;
    tip.hidden = false;
    tip.style.left = (e.clientX - box.left + 14) + "px";
    tip.style.top = (e.clientY - box.top - 10) + "px";
  });

  // Where a card's problems sit in their papers, in five steps from the first problems to the
  // last: a line rising to the right means the card turns up in the harder problems.
  function positionLineSvg(probs) {
    if (!FAM_MAXNUM) difficultyBand(probs[0]);
    const bins = [0, 0, 0, 0, 0];
    probs.forEach(p => {
      const len = FAM_LENGTH[p.fam] || FAM_MAXNUM[p.fam] || 25;
      bins[Math.min(4, Math.floor((p.num - 1) / len * 5))]++;
    });
    const W = 260, H = 80, L = 8, T = 8, B = 22, max = Math.max(1, ...bins);
    const pts = bins.map((n, i) => [L + i * (W - 2 * L) / 4, T + (H - T - B) * (1 - n / max)]);
    const line = pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
    return `<svg class="pf-line" viewBox="0 0 ${W} ${H}" role="img" aria-label="Problems by position in the paper, early to late: ${bins.join(", ")}">
        <line class="pf-axis" x1="${L}" y1="${H - B}" x2="${W - L}" y2="${H - B}"/>
        <polyline class="pf-path" points="${line}"/>
        ${pts.map((p, i) => `<circle class="pf-pt" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3"><title>${bins[i]}</title></circle>`).join("")}
        <text class="pf-ax-label" x="${L}" y="${H - 4}">Early problems</text>
        <text class="pf-ax-label" x="${W - L}" y="${H - 4}" text-anchor="end">Late problems</text>
      </svg>`;
  }
  function contestProfileHtml(f, authored) {
    if (authored == null) return "";
    const probs = PROBLEMS_BY_CARD[f.id] || [];
    const k = kindOf(f);
    const co = kind => {
      const c = {};
      probs.forEach(p => p.formulas.forEach(id => {
        if (id !== f.id && id !== TWIN_OF[f.id] && BY_ID[id] && kindOf(BY_ID[id].formula) === kind) c[id] = (c[id] || 0) + 1;
      }));
      return Object.keys(c).sort((a, b) => c[b] - c[a] || a.localeCompare(b)).slice(0, 4);
    };
    const names = ids => ids.map(id => `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>`).join(` <span class="pf-dot">&middot;</span> `);
    const row = (label, value) => `<div class="pf-row"><span class="pf-k">${label}:</span><span class="pf-v">${value}</span></div>`;
    const rows = [];
    if (probs.length) {
      rows.push(row("Problems", `${probs.length} tagged`));
      const bands = { easy: 0, medium: 0, hard: 0 };
      probs.forEach(p => { bands[difficultyBand(p)]++; });
      const famCounts = FAMILIES.map(x => [x, probs.filter(p => p.fam === x).length]).filter(x => x[1]);
      const famMax = Math.max(...famCounts.map(x => x[1]));
      rows.push(row("Contests", `<div class="pf-chart">${pieSvg(famCounts)}<div class="pf-bars">${famCounts.map(([x, n], i) =>
        `<div class="pf-bar-row"><span class="pf-bar-name"><i class="pf-sw pf-c${i % 5}"></i>${escapeAttr(x)}</span><span class="pf-bar-track"><span class="pf-bar pf-c${i % 5}" style="width:${Math.max(2, Math.round(100 * n / famMax))}%"></span></span><span class="pf-bar-n">${n}</span></div>`).join("")}</div></div>`));
      rows.push(row("Difficulty", `<div class="pf-chart"><div>${["easy", "medium", "hard"].map(b =>
        `<span class="pf-band pf-${b}${bands[b] ? "" : " pf-zero"}">${b.charAt(0).toUpperCase() + b.slice(1)}: ${bands[b]}</span>`).join("")}</div>${positionLineSvg(probs)}</div>`));
    }
    // Role: the authored sentence, plus how often the card is the problem's recorded main idea.
    // A formula is never said to solve a problem, only to be its central idea.
    const withMain = probs.filter(p => p.main);
    const mainTxt = withMain.length
      ? ` ${k === "formula" ? "The main idea" : k === "method" ? "The primary move" : "The problem's main shape"} in ${withMain.filter(p => p.main === f.id || p.main === TWIN_OF[f.id]).length} of the ${withMain.length} problem${withMain.length === 1 ? "" : "s"} where one is recorded.`
      : "";
    if (authored || mainTxt) rows.push(row("Role", `${authored ? linkifyCards(authored) : ""}${mainTxt}`));
    // A pattern's methods are listed under "Methods and Formulas to Try", so its profile does not
    // repeat them.
    // Statistical neighbours from the tagged problems (the section note says so): a method's
    // "Related Methods" and a pattern's "Related Patterns" are the cards of the same kind that
    // most often appear beside it. The hand-picked "Related ..." sections are separate.
    const partners = k === "method" ? [["Common patterns", co("pattern")], ["Related Methods", co("method")]]
      : k === "formula" ? [["Common methods", co("method")]] : [["Related Patterns", co("pattern")]];
    partners.forEach(([label, ids]) => { if (ids.length) rows.push(row(label, names(ids))); });
    if (!rows.length) return "";
    return `<div class="related contest-profile"><h4>Contest profile</h4><div class="profile-rows">${rows.join("")}</div></div>`;
  }

  // Connected formulas (js/data/connected.js): on a few broad cards, the cards that are part of
  // the same idea. Curated, where Related is computed, but drawn exactly like Related: a row of
  // name chips. Each entry's note records why it belongs; it is for editors and is not shown.
  // Shown on every card, hand-picked ones only, so it says "None yet" until some are chosen;
  // the statistical neighbours are in the contest profile.
  function connectedHtml(f) {
    const list = ((window.MATH_CONNECTED || {})[f.id] || []).filter(c => BY_ID[c.id]);
    const title = { formula: "Related formulas", method: "Related methods", pattern: "Related patterns" }[kindOf(f)];
    return `<div class="connected"><h4>${title}</h4>${list.length ? cardLinkList(list.map(c => c.id)) : `<p class="related-empty">None yet.</p>`}</div>`;
  }

  function practiceHtml(f) {
    // Uniform format: numbered examples, each a question with a hidden solution (a printed page
    // shows every solution; see @media print in styles.css).
    // MATH_EXAMPLES holds { q, s } pairs; legacy inline strings are a fallback.
    const items = [];
    const lead = (window.MATH_EXAMPLES || {})[f.id];
    // An example's own figure: `q` shows the given setup under the question and must not give
    // the answer away; the optional `s` sits inside the solution for a construction.
    const exFig = (window.MATH_EXAMPLE_DIAGRAMS || {})[f.id] || {};
    const figHtml = svg => svg ? `<div class="diagram example-figure">${svg}</div>` : "";
    if (lead && lead.q) items.push(Object.assign({}, lead, { figQ: exFig.q, figS: exFig.s }));
    else if (f.example) items.push({ q: f.example, s: null });
    ((window.MATH_PROBLEMS || {})[f.id] || []).forEach(p => items.push(p));
    if (!items.length) return "";
    const blocks = items.map((p, i) => `
      <div class="problem">
        <p class="problem-q"><strong>Example ${i + 1}.</strong> ${p.q}</p>
        ${figHtml(p.figQ)}
        ${p.s ? `<button class="sol-toggle" data-target="sol-${f.id}-${i}">Show solution</button>
        <div class="problem-sol" id="sol-${f.id}-${i}" hidden><strong>Solution.</strong> ${p.s}${figHtml(p.figS)}</div>` : ""}
      </div>`);
    return `<div class="practice"><h4>Examples</h4>${blocks.join("")}</div>`;
  }

  // A contest reference like "2007 AIME II, Problem 15" maps deterministically
  // to its Art of Problem Solving wiki page, where the full solution lives.
  // "1997 AIME, Problem 1"      -> .../1997_AIME_Problems/Problem_1
  // "2021 Fall AMC 12B, Prob 23"-> .../2021_Fall_AMC_12B_Problems/Problem_23
  // Where a problem links out to. The AoPS wiki has a page per problem for the MAA contests
  // and only those; other tournaments publish their own archives, by round rather than by
  // problem. So the family decides, and an entry may override with its own `url`.
  const ARCHIVE_URL = {
    "HMMT February": "https://www.hmmt.org/www/archive/problems",
    "HMMT November": "https://www.hmmt.org/www/archive/problems",
    "HMMT": "https://www.hmmt.org/www/archive/problems"
  };
  // The button has to say where it goes: an HMMT link lands on a round's archive, not on a
  // per-problem page, and calling that "AoPS" would be simply false.
  function linkLabel(fam) { return ARCHIVE_URL[fam] ? "archive" : "AoPS"; }
  function aopsUrl(ref, fam) {
    if (fam && ARCHIVE_URL[fam]) return ARCHIVE_URL[fam];
    const m = ref.match(/^(.*),\s*Problem\s+(\d+)\s*$/);
    if (!m) return null;
    // Only the MAA families have per-problem wiki pages; building one for anything else
    // produces a URL that looks right and 404s.
    if (!/\b(AMC|AIME|AJHSME)\b/i.test(m[1])) return null;
    // The wiki names the Spring 2021 papers "2021 AMC 10A", with no season; only the Fall ones carry one.
    const slug = m[1].trim().replace(/^(\d{4})\s+Spring\s+/i, "$1 ").replace(/\s+/g, "_") + "_Problems/Problem_" + m[2];
    return "https://artofproblemsolving.com/wiki/index.php/" + slug;
  }

  // ---------- Problem database (tags + link only) ----------
  function problemSlug(ref) {
    return ref.toLowerCase().replace(/,?\s*problem\s+/, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function refShort(ref) { return ref.replace(/,\s*Problem\s+/, " #"); }
  function yearOf(ref) { const m = ref.match(/^(\d{4})/); return m ? +m[1] : 0; }
  // Parse a ref into { year, cname (contest incl. A/B/I/II/season), fam (family), num }.
  function parseRef(ref) {
    const m = ref.match(/^(\d{4})\s+(.*?),\s*Problem\s+(\d+)$/);
    if (!m) return { year: 0, cname: ref, fam: ref, num: 0 };
    const year = +m[1], cname = m[2].trim(), num = +m[3];
    const core = cname.replace(/^(Fall|Spring)\s+/i, "");
    let fam, fm;
    if (/AIME/i.test(core)) fam = "AIME";
    else if (/AJHSME/i.test(core)) fam = "AMC 8";           // the AMC 8's name until 1998
    else if ((fm = core.match(/AMC\s*(8|10|12)/i))) fam = "AMC " + fm[1];
    else if (/Putnam/i.test(core)) fam = "Putnam";
    // HMMT runs two tournaments a year of quite different difficulty, so they are separate
    // families rather than one pile. The round (Algebra, Combinatorics, Guts, Team) stays in
    // `cname`, which dbMainHtml already uses as the heading within a year.
    else if (/HMMT/i.test(core)) {
      const season = core.match(/\b(February|November)\b/i);
      fam = season ? "HMMT " + season[1][0].toUpperCase() + season[1].slice(1).toLowerCase() : "HMMT";
    }
    else fam = core.replace(/\s*[AB]$|\s*I{1,3}$/, "").trim() || core;
    return { year, cname, fam, num };
  }
  function famSlug(f) { return f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  // Types for a problem: manual `types` (topic ids) unioned with the topics carried
  // by its tagged formulas, so type filtering works even before any manual tagging.
  function problemTypes(entry) {
    const seen = {}, out = [];
    const push = t => { if (t && !seen[t.id]) { seen[t.id] = 1; out.push(t); } };
    (entry.types || []).forEach(id => push(TOPICS_BY_ID[id]));
    (entry.formulas || []).forEach(fid => { const e = BY_ID[fid]; if (e) e.topics.forEach(push); });
    return out;
  }
  // The subject chip (plan 2.5a): which of the four contest subjects a problem belongs to,
  // shown first under its title. It is derived, never typed by hand, apart from a `subjects`
  // override an entry may carry: first the subjects of the problem's tagged cards (Counting &
  // Probability shows as Combinatorics, and the proof-method cards carry no subject), then the
  // round of a paper that names its subject (HMMT Algebra, Geometry, ...). A problem with nothing
  // to go on shows no chip until it is tagged; the chip is never a guess.
  const SUBJECT_LABELS = { algebra: "Algebra", counting: "Combinatorics", geometry: "Geometry", "number-theory": "Number Theory" };
  const SUBJECT_ORDER = ["algebra", "counting", "geometry", "number-theory"];
  function cardSubject(fid) {
    const e = BY_ID[fid];
    if (!e) return "";
    const s = e.formula.subject || e.section.id;
    return SUBJECT_LABELS[s] ? s : "";
  }
  function problemSubjects(entry, formulas, cname) {
    if (Array.isArray(entry.subjects) && entry.subjects.length) return entry.subjects.filter(s => SUBJECT_LABELS[s]);
    const n = {};
    formulas.forEach(fid => { const s = cardSubject(fid); if (s) n[s] = (n[s] || 0) + 1; });
    let out = Object.keys(n);
    if (!out.length && cname) {
      const c = cname.toLowerCase();
      [["algebra", "algebra"], ["combinatorics", "counting"], ["geometry", "geometry"], ["number theory", "number-theory"]]
        .forEach(([w, s]) => { if (c.indexOf(w) !== -1) out.push(s); });
    }
    // The subject most of the tags belong to comes first, so a geometry problem that borrows
    // one algebra card reads "Geometry · Algebra".
    return out.sort((a, b) => (n[b] || 0) - (n[a] || 0) || SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b));
  }
  const subjectChips = p => p.subjects.map(s => `<span class="ptype-chip subject-chip">${SUBJECT_LABELS[s]}</span>`).join("");
  const PROBLEM_DB = (window.MATH_PROBLEM_DB || []).map(e => {
    const formulas = (e.formulas || []).filter(fid => BY_ID[fid]);
    const trickFormulas = (e.trickFormulas || []).filter(fid => BY_ID[fid]);
    const pr = parseRef(e.ref);
    return {
      ref: e.ref, slug: problemSlug(e.ref),
      url: e.url || aopsUrl(e.ref, pr.fam), urlLabel: linkLabel(pr.fam),
      formulas, trickFormulas, types: problemTypes(e), subjects: problemSubjects(e, formulas, pr.cname), strategy: e.strategy || "",
      trick: e.trick || "",
      // Hints we write (revealed one at a time before the strategy) and the card that is the
      // problem's central idea. `main` must be one of its own tags; the validator enforces it.
      hints: (e.hints || []).filter(h => typeof h === "string" && h.trim()),
      main: e.main && BY_ID[e.main] && (formulas.indexOf(e.main) !== -1 || trickFormulas.indexOf(e.main) !== -1) ? e.main : "",
      year: pr.year, cname: pr.cname, fam: pr.fam, num: pr.num,
      // No card honestly fits yet: the problem still gets its page, showing its chain as
      // "not classified yet", rather than being tagged with something it does not use.
      untagged: !(e.formulas || []).length
    };
  }).filter(p => p.formulas.length || p.untagged);
  const PROBLEM_BY_SLUG = {};
  // Problems by tagged card. Since the four-kind model a tag can be a formula, a method or a
  // pattern, so this is keyed by card, not by formula (it was PROBLEMS_BY_FORMULA).
  const PROBLEMS_BY_CARD = {};
  PROBLEM_DB.forEach(p => {
    PROBLEM_BY_SLUG[p.slug] = p;
    // The 2021 Spring papers were first filed without the season ("2021 AMC 10A"); an old link or star still opens them.
    if (/^2021-spring-amc-/.test(p.slug)) PROBLEM_BY_SLUG[p.slug.replace("-spring-", "-")] = p;
    p.formulas.forEach(fid => (PROBLEMS_BY_CARD[fid] = PROBLEMS_BY_CARD[fid] || []).push(p));
    // A card the trick route uses still lists the problem, which is the point of tagging
    // tricks at all: the obscure cards are exactly the ones a main route never reaches
    // for, so this is the only way they ever acquire a worked use. The row looks the same
    // either way; the problem page is where the trick is labelled.
    p.trickFormulas.forEach(fid => {
      if (p.formulas.indexOf(fid) >= 0) return;
      (PROBLEMS_BY_CARD[fid] = PROBLEMS_BY_CARD[fid] || []).push(p);
    });
  });
  // A card split into a formula and a method (the fact and the move) is one idea seen two ways,
  // so the two halves share their practice problems: a problem tagged with either shows on both.
  // Problems were tagged before the splits, almost always on the method's id.
  const SPLIT_TWINS = [["lte", "lte-lemma"], ["pie", "inclusion-exclusion"], ["homothety-monge", "monges-theorem"],
    ["symmetric-polynomial-strategies", "fundamental-theorem-symmetric"], ["inversion-properties", "inversion-facts"],
    ["lagrange-interpolation", "lagrange-interpolation-formula"]];
  const TWIN_OF = {};
  SPLIT_TWINS.forEach(([a, b]) => {
    if (!BY_ID[a] || !BY_ID[b]) return;
    TWIN_OF[a] = b; TWIN_OF[b] = a;
    const both = [...new Set([...(PROBLEMS_BY_CARD[a] || []), ...(PROBLEMS_BY_CARD[b] || [])])];
    if (both.length) { PROBLEMS_BY_CARD[a] = both; PROBLEMS_BY_CARD[b] = both.slice(); }
  });
  Object.keys(PROBLEMS_BY_CARD).forEach(fid => PROBLEMS_BY_CARD[fid].sort((a, b) => b.year - a.year || a.ref.localeCompare(b.ref)));

  // One sitting (e.g. "2026 AIME I") → its problems in number order. The Database tree keys on
  // family and year, which merges AIME I with AIME II; the footer navigator has to stay inside
  // a single paper, so it needs its own index.
  const CONTEST_TREE = {};
  const contestKey = p => p.year + " " + p.cname;
  PROBLEM_DB.forEach(p => (CONTEST_TREE[contestKey(p)] = CONTEST_TREE[contestKey(p)] || []).push(p));
  Object.keys(CONTEST_TREE).forEach(k => CONTEST_TREE[k].sort((a, b) => a.num - b.num));
  // How many problems the paper actually has, so the strip can show which are not yet tagged
  // rather than implying the paper is as short as our coverage.
  const FAM_LENGTH = { "AIME": 15, "AMC 8": 25, "AMC 10": 25, "AMC 12": 25 };

  // Competition → year → problems tree for the Database sidebar navigator.
  const DB_TREE = {};
  PROBLEM_DB.forEach(p => { (DB_TREE[p.fam] = DB_TREE[p.fam] || {}); (DB_TREE[p.fam][p.year] = DB_TREE[p.fam][p.year] || []).push(p); });
  const FAM_ORDER = ["AMC 8", "AMC 10", "AMC 12", "AIME", "HMMT February", "HMMT November", "Putnam", "HMMT"];
  const FAMILIES = Object.keys(DB_TREE).sort((a, b) => {
    const ia = FAM_ORDER.indexOf(a), ib = FAM_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  const FAM_BY_SLUG = {}; FAMILIES.forEach(f => { FAM_BY_SLUG[famSlug(f)] = f; });
  const famCount = f => Object.keys(DB_TREE[f]).reduce((n, y) => n + DB_TREE[f][y].length, 0);
  // "Written" means the problem has its solution in the app: a strategy or its cards. A problem that only has its text is not counted.
  const famWritten = f => Object.keys(DB_TREE[f]).reduce((n, y) => n + DB_TREE[f][y].filter(p => p.strategy || p.formulas.length).length, 0);
  // Whether the Practice page lists the contests still to come (hidden until asked for).
  let showUnwritten = false;
  const DEFAULT_FAM = FAMILIES.slice().sort((a, b) => famCount(b) - famCount(a))[0] || null;

  // Contest problems that use this formula, grouped by contest (AMC 8 up through AIME and the
  // harder families, the Database's order) and newest first within each. The busiest cards carry
  // dozens of problems, and one long list mixing every contest made it hard to find, say, the
  // AMC 10 ones. Each group shows its first few rows, so every contest stays visible, and has
  // its own button for the rest, so opening the AMC 10 problems does not also unroll 60 AIME ones.
  const PROB_GROUP_PREVIEW = 3;

  function contestHtml(f) {
    const probs = PROBLEMS_BY_CARD[f.id] || [];
    // Every pattern is meant to have practice problems; until a pattern has its own, the section
    // is still shown, empty, so the place for them is visible.
    if (!probs.length) return kindOf(f) === "pattern" ? `
      <div class="practice contest-refs practice-empty">
        <h4>Practice Problems</h4>
        <p class="practice-placeholder">No practice problems for this pattern yet.</p>
      </div>` : "";
    const groups = {};
    probs.forEach(p => (groups[p.fam] = groups[p.fam] || []).push(p));
    const fams = Object.keys(groups).sort((a, b) => {
      const ia = FAM_ORDER.indexOf(a), ib = FAM_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
    const body = fams.map(fam => {
      const hidden = groups[fam].length - PROB_GROUP_PREVIEW;
      const rows = groups[fam].map((p, i) => {
        return `<li class="prob-row${i >= PROB_GROUP_PREVIEW ? " prob-extra" : ""}">
         <a class="prob-open" href="#/problem/${p.slug}">${refShort(p.ref)}</a>
         ${p.url ? `<a class="ref-ext-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer" title="Open the source">${p.urlLabel} <span aria-hidden="true">&#8599;</span></a>` : ""}
       </li>`;
      }).join("");
      return `<div class="prob-group" data-fam="${escapeAttr(fam)}">
          <div class="prob-group-head">${fam} <span class="practice-note">${groups[fam].length}</span></div>
          <ul class="prob-list">${rows}</ul>
          ${hidden > 0 ? `<button type="button" class="show-more-btn prob-more" aria-expanded="false">Show ${hidden} more ${fam}</button>` : ""}
        </div>`;
    }).join("");
    return `
      <div class="practice contest-refs">
        <h4>Practice Problems <span class="practice-note">${probs.length}</span></h4>
        ${body}
      </div>`;
  }

  // ---------- Asymptote export ----------
  // The geometry figures are exact computed SVG; this reconstructs equivalent
  // Asymptote so a reader can drop the figure into AoPS/Overleaf and tweak it.
  // SVG is y-down, Asymptote is y-up, so every y flips through the viewBox
  // height. Stroke/fill colors are resolved (through CSS vars) and carried over;
  // fonts are sized proportionally (as in the SVG) and labels de-overlapped so
  // Asymptote's fixed-size text does not collide the way the SVG's scaled text
  // never does.
  function svgToAsy(svg) {
    const vb = (svg.getAttribute("viewBox") || "0 0 300 300").split(/\s+/).map(Number);
    const W = vb[2] || 300, H = vb[3] || 300;
    const u = Math.round((300 / W) * 1000) / 1000;   // pt per SVG unit (~300pt figure)
    const r1 = v => Math.round(v * 10) / 10;
    const c3 = v => Math.round(v * 1000) / 1000;
    const fx = x => r1(+x), fy = y => r1(H - +y);
    const P = (x, y) => `(${fx(x)},${fy(y)})`;
    const nums = s => (s.match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
    const rootStyle = getComputedStyle(document.documentElement);
    const out = [];

    // ----- color: resolve a stroke/fill (possibly a CSS var) to an asy pen -----
    function rawColor(el, prop) {
      let c = getComputedStyle(el)[prop];
      if (!c || /var\(/.test(c)) {
        let raw = el.getAttribute(prop) || c || "";
        const vm = raw.match(/var\((--[\w-]+)\)/);
        if (vm) raw = rootStyle.getPropertyValue(vm[1]).trim();
        c = raw;
      }
      return c;
    }
    function parseColor(c) {
      c = (c || "").trim();
      let m = c.match(/rgba?\(([^)]+)\)/);
      if (m) { const p = m[1].split(",").map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length >= 4 ? p[3] : 1 }; }
      m = c.match(/^#([0-9a-f]{3})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }; }
      m = c.match(/^#([0-9a-f]{6})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
      return null;
    }
    // { expr:"rgb(..)"|"" (""=black default), a:alpha, none:true if invisible }
    function pen(el, prop) {
      const col = parseColor(rawColor(el, prop));
      if (!col || col.a === 0) return { expr: "", a: 0, none: true };
      const black = col.r === 0 && col.g === 0 && col.b === 0;
      return { expr: black ? "" : `rgb(${c3(col.r / 255)},${c3(col.g / 255)},${c3(col.b / 255)})`, a: col.a, none: false };
    }
    const dashed = el => el.getAttribute("stroke-dasharray") ? "dashed" : "";
    function strokeSuffix(el) {
      const s = pen(el, "stroke"), parts = [s.expr, dashed(el)].filter(Boolean);
      return parts.length ? ", " + parts.join("+") : "";
    }
    // a fillable shape: fill / draw / filldraw depending on which are visible
    function shape(pathStr, el, canFill) {
      const s = pen(el, "stroke"), f = pen(el, "fill");
      const strokeVisible = !s.none, fillVisible = canFill && !f.none;
      const strokePen = [s.expr, dashed(el)].filter(Boolean).join("+");
      const fillPen = fillVisible ? (f.expr || "black") + (f.a < 1 ? `+opacity(${c3(f.a)})` : "") : "";
      if (fillVisible && strokeVisible) return `filldraw(${pathStr}, ${fillPen}, ${strokePen || "black"});`;
      if (fillVisible) return `fill(${pathStr}, ${fillPen});`;
      if (strokeVisible) return strokePen ? `draw(${pathStr}, ${strokePen});` : `draw(${pathStr});`;
      return null;
    }

    // ----- label text -> LaTeX so Asymptote can typeset it -----
    // Unicode sub/superscripts become _{..}/^{..}; degree signs are dropped;
    // other math glyphs map to LaTeX macros; anything unmapped is dropped so it
    // can never break the compile.
    const SUB = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-","ₐ":"a","ᵢ":"i","ⱼ":"j","ₖ":"k","ₘ":"m","ₙ":"n","ₚ":"p" };
    const SUP = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n" };
    const SYM = {
      "−":"-", "·":" \\cdot ", "×":" \\times ", "√":"\\sqrt ", "′":"'", "″":"''",
      "½":"1/2", "⅓":"1/3", "⅔":"2/3", "¼":"1/4", "¾":"3/4", "⁄":"/",
      "θ":"\\theta ", "π":"\\pi ", "α":"\\alpha ", "β":"\\beta ", "γ":"\\gamma ",
      "φ":"\\varphi ", "ω":"\\omega ", "Δ":"\\Delta ", "Ω":"\\Omega ", "Σ":"\\Sigma ",
      "ℓ":"\\ell ", "∠":"\\angle ", "⊥":"\\perp ", "∥":"\\parallel ", "∩":"\\cap ",
      "∪":"\\cup ", "△":"\\triangle ", "⇒":"\\Rightarrow ", "⟺":"\\iff ", "→":"\\to ",
      "≥":"\\ge ", "≤":"\\le ", "≈":"\\approx ", "≠":"\\ne ", "—":"-", "–":"-"
    };
    function mathText(s) {
      let o = "", i = 0;
      while (i < s.length) {
        const ch = s[i];
        if (ch === "°" || ch === "​") { i++; continue; }               // drop degree / zero-width
        if (SUB[ch]) { let g = ""; while (i < s.length && SUB[s[i]]) g += SUB[s[i++]]; o += g.length > 1 ? `_{${g}}` : `_${g}`; continue; }
        if (SUP[ch]) { let g = ""; while (i < s.length && SUP[s[i]]) g += SUP[s[i++]]; o += g.length > 1 ? `^{${g}}` : `^${g}`; continue; }
        if (SYM[ch]) { o += SYM[ch]; i++; continue; }
        if (ch.charCodeAt(0) > 127) { i++; continue; }                      // drop anything else non-ASCII
        o += ch; i++;
      }
      return o.replace(/"/g, "").replace(/\s+/g, " ").trim();
    }

    // SVG arc (equal radii, no rotation) -> asy arc(center, r, a1, a2) minor arc.
    function arcCmd(S, E, r, la, sw) {
      const [x1, y1] = S, [x2, y2] = E;
      const hx = (x2 - x1) / 2, hy = (y2 - y1) / 2, d2 = hx * hx + hy * hy;
      let R = r; if (d2 > R * R) R = Math.sqrt(d2);
      const h = Math.sqrt(Math.max(0, R * R - d2));
      let ux = -hy, uy = hx; const ul = Math.hypot(ux, uy) || 1; ux /= ul; uy /= ul;
      const sign = (la !== sw) ? 1 : -1;
      const cx = (x1 + x2) / 2 + sign * h * ux, cy = (y1 + y2) / 2 + sign * h * uy;
      const cX = fx(cx), cY = fy(cy);
      let a1 = Math.atan2(fy(y1) - cY, fx(x1) - cX) * 180 / Math.PI;
      let a2 = Math.atan2(fy(y2) - cY, fx(x2) - cX) * 180 / Math.PI;
      while (a2 - a1 > 180) a2 -= 360;
      while (a1 - a2 > 180) a2 += 360;
      return `arc((${cX},${cY}), ${r1(R)}, ${r1(Math.min(a1, a2))}, ${r1(Math.max(a1, a2))})`;
    }

    function pathCmds(d, suffix) {
      const t = d.match(/[MLAZmlaz]|-?\d*\.?\d+/g) || [];
      let i = 0, cur = null, start = null, run = [];
      const flush = () => { if (run.length >= 2) out.push(`draw(${run.join("--")}${suffix});`); run = []; };
      while (i < t.length) {
        const c = t[i++];
        if (c === "M" || c === "m") { flush(); const x = +t[i++], y = +t[i++]; cur = [x, y]; start = [x, y]; run = [P(x, y)]; }
        else if (c === "L" || c === "l") { const x = +t[i++], y = +t[i++]; cur = [x, y]; run.push(P(x, y)); }
        else if (c === "A" || c === "a") {
          const rr = +t[i++]; i++; i++; const la = +t[i++], sw = +t[i++], x = +t[i++], y = +t[i++];
          flush(); out.push(`draw(${arcCmd(cur, [x, y], rr, la, sw)}${suffix});`); cur = [x, y]; run = [P(x, y)];
        } else if (c === "Z" || c === "z") { if (start) run.push(P(start[0], start[1])); flush(); cur = start; }
      }
      flush();
    }

    const labels = [];
    svg.querySelectorAll("line,polyline,polygon,rect,circle,ellipse,path,text").forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag === "line") {
        out.push(`draw(${P(el.getAttribute("x1"), el.getAttribute("y1"))}--${P(el.getAttribute("x2"), el.getAttribute("y2"))}${strokeSuffix(el)});`);
      } else if (tag === "polyline" || tag === "polygon") {
        const n = nums(el.getAttribute("points")), pts = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push(P(n[i], n[i + 1]));
        if (pts.length < 2) return;
        if (tag === "polyline") out.push(`draw(${pts.join("--")}${strokeSuffix(el)});`);
        else { const st = shape(`${pts.join("--")}--cycle`, el, true); if (st) out.push(st); }
      } else if (tag === "rect") {
        const x = +el.getAttribute("x"), y = +el.getAttribute("y"), w = +el.getAttribute("width"), h = +el.getAttribute("height");
        const st = shape(`${P(x, y)}--${P(x + w, y)}--${P(x + w, y + h)}--${P(x, y + h)}--cycle`, el, true);
        if (st) out.push(st);
      } else if (tag === "circle") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), r = +el.getAttribute("r");
        const f = pen(el, "fill");
        if (!f.none && r <= 6) out.push(`dot(${P(cx, cy)}${f.expr ? ", " + f.expr : ""});`);
        else { const st = shape(`shift(${P(cx, cy)})*scale(${r1(r)})*unitcircle`, el, true); if (st) out.push(st); }
      } else if (tag === "ellipse") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), rx = +el.getAttribute("rx"), ry = +el.getAttribute("ry");
        const st = shape(`shift(${P(cx, cy)})*scale(${r1(rx)},${r1(ry)})*unitcircle`, el, true);
        if (st) out.push(st);
      } else if (tag === "path") {
        pathCmds(el.getAttribute("d") || "", strokeSuffix(el));
      } else if (tag === "text") {
        const text = mathText((el.textContent || "").trim());
        if (!text) return;
        labels.push({
          x: +el.getAttribute("x"), y: H - +el.getAttribute("y"),
          fs: parseFloat(el.getAttribute("font-size")) || 13,
          pen: pen(el, "fill").expr, text
        });
      }
    });

    // Estimated label boxes, then nudge overlapping labels apart. The SVG never
    // overlaps because its text scales with the drawing; Asymptote's text does
    // not, so equal figures can collide — separate them in figure space.
    labels.forEach(L => {
      const vis = (L.text.replace(/\\[a-zA-Z]+/g, "x").replace(/[\\^_{}]/g, "")) || "x";
      L.w = vis.length * L.fs * 0.6; L.h = L.fs;
    });
    for (let i = 0; i < labels.length; i++) {
      const a = labels[i];
      for (let iter = 0; iter < 16; iter++) {
        let hit = false;
        for (let j = 0; j < labels.length; j++) {
          if (j === i) continue;
          const b = labels[j];
          const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x), oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);
          if (ox > 0.5 && oy > 0.5) {
            hit = true;
            let dx = a.x - b.x, dy = a.y - b.y;
            if (!dx && !dy) dy = 1;
            const Ln = Math.hypot(dx, dy) || 1, step = a.fs * 0.4;
            a.x += dx / Ln * step; a.y += dy / Ln * step;
          }
        }
        if (!hit) break;
      }
    }
    labels.forEach(L => {
      const size = `fontsize(${r1(L.fs * u)}pt)`;
      out.push(`label("$${L.text}$", (${r1(L.x)},${r1(L.y)}), ${L.pen ? `${L.pen}+${size}` : size});`);
    });

    return `// Asymptote for this figure - generated by Competition Math Reference.\n`
      + `// Coordinates are exact; paste into an Asymptote-enabled editor (e.g. AoPS).\n`
      + `unitsize(${u}pt);\ndefaultpen(fontsize(${r1(13 * u)}pt));\n\n` + out.join("\n") + "\n";
  }

  // ---------- Detail pages ----------

  // Pull a "## Key forms" block (older cards may still say "Key ideas" or
  // "Key formulas") out of a detail body so it can render as its own subsection
  // just under the description. Key forms is for METHOD cards only: it lists the
  // common shapes the method is applied in. Formula cards have their formulas
  // enumerated in the big box already, so they carry no such block. Each item may
  // carry a small explanation after " — ", shown on its own line beneath the
  // formula. Returns { formsHtml, rest }.
  function splitKeyForms(body) {
    if (!body) return { formsHtml: () => "", rest: "" };
    const blocks = body.split(/\n\s*\n/);
    let formLines = null;
    const rest = [];
    for (const block of blocks) {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (formLines === null && lines.length && /^##\s+key\s+(ideas?|form(s|ulas?))\s*$/i.test(lines[0].trim())) {
        formLines = lines.slice(1);
      } else {
        rest.push(block);
      }
    }
    if (formLines === null) return { formsHtml: () => "", rest: body };
    const items = formLines.map(l => l.trim()).filter(l => l.startsWith("- ")).map(l => l.slice(2).trim());
    if (!items.length) return { formsHtml: () => "", rest: body };
    const li = items.map(it => {
      const idx = it.indexOf(" — ");
      return idx !== -1
        ? `<li>${linkifyCards(it.slice(0, idx))}<span class="kf-note">${linkifyCards(it.slice(idx + 3))}</span></li>`
        : `<li>${linkifyCards(it)}</li>`;
    }).join("");
    return {
      formsHtml: heading => `<div class="key-forms"><h4>${heading}</h4><ul class="detail-list">${li}</ul></div>`,
      rest: rest.join("\n\n")
    };
  }

  // Details are plain text blocks separated by blank lines; a block may start
  // with a "## Heading" line — only that first line is the heading, the rest
  // of the block is an ordinary paragraph.
  // ---------- Card cross-links ----------
  // Wiki-style [[card-id]] or [[card-id|display text]] inside a write-up. Only the terms a
  // reader plausibly does not know should be linked; linking every word that happens to have
  // a card is the failure mode. Splitting on $...$ first means a bracket inside math is
  // never touched, and an unresolvable id renders visibly broken so it is caught in review
  // rather than silently dropping the text.
  function linkifyCards(text) {
    if (!text || text.indexOf("[[") === -1) return text;
    return String(text).split(/(\$[^$]*\$)/).map((part, i) => {
      if (i % 2) return part;
      return part.replace(/\[\[([\w-]+)(?:\|([^\]]*))?\]\]/g, (m, id, label) => {
        const e = BY_ID[id];
        if (!e) return redLink(id, label);
        return `<a class="card-link" href="#/f/${escapeAttr(id)}" data-card="${escapeAttr(id)}">${label || e.formula.name}</a>`;
      });
    }).join("");
  }

  // Trim to whole sentences. The old fixed-length cut sliced bulky opening paragraphs
  // mid-clause, and splitting naively on "." would also break inside $...$ and after an
  // abbreviation, so sentence ends are only taken outside math and when followed by a
  // capital. At least one sentence always survives, however long it is.
  // Sentence ends, as offsets into the text: only outside $...$, and only where a capital or
  // an opening bracket follows, so "e.g. the" and "$3.5$" never count.
  function sentenceMarks(src) {
    const parts = src.split(/(\$[^$]*\$)/);
    let flat = "", marks = [];
    parts.forEach((p, i) => {
      if (i % 2) { flat += p; return; }
      for (let k = 0; k < p.length; k++) {
        flat += p[k];
        if (/[.!?]/.test(p[k]) && /^\s+[A-Z(]/.test(p.slice(k + 1, k + 3) + "X")) marks.push(flat.length);
      }
    });
    return { flat, marks };
  }

  // The card face in the section grid and in search results shows only the opening of the
  // intro (clamped to four lines); the card's own page shows all of it. The intro is written so
  // that its first two sentences already say what the result is and when to reach for it; a
  // third is taken so the four lines are filled where the first two are short.
  const GRID_SENTENCES = 3;
  function firstSentences(text, n) {
    const src = String(text || "").trim();
    const { flat, marks } = sentenceMarks(src);
    return marks.length >= n ? flat.slice(0, marks[n - 1]).trim() : src;
  }

  function leadSentences(text, budget) {
    const src = String(text || "").trim();
    if (src.length <= budget) return src;
    const { flat, marks } = sentenceMarks(src);
    if (!marks.length) return src.slice(0, budget).replace(/\s+\S*$/, "");
    let cut = marks[0];
    for (const m of marks) { if (m <= budget) cut = m; else break; }
    const out = flat.slice(0, cut).trim();
    return out;
  }

  // Hover preview, the way a wiki shows a lead paragraph. Delayed so that sweeping the
  // pointer across a paragraph of links does not flash a stack of cards.
  let cpEl = null, cpTimer = 0, cpHide = 0, cpFor = null;
  function hideCardPreview() {
    clearTimeout(cpTimer); clearTimeout(cpHide);
    if (cpEl) { cpEl.remove(); cpEl = null; cpFor = null; }
  }
  // Leaving the link does not dismiss immediately: the pointer needs a moment to cross the
  // gap into the preview, and entering the preview cancels the pending hide outright.
  function scheduleHideCardPreview() {
    clearTimeout(cpTimer); clearTimeout(cpHide);
    cpHide = setTimeout(hideCardPreview, 260);
  }
  // Where the pointer was when the hover began, so the box can be placed against the line
  // fragment the reader is actually on rather than the link's whole bounding box.
  let cpAt = null;

  function showCardPreview(a) {
    const e = BY_ID[a.dataset.card];
    if (!e || cpFor === a) return;
    hideCardPreview();
    cpFor = a;
    const f = e.formula;
    const kind = f.type === "method" ? `<span class="badge badge-method">METHOD</span>`
               : f.type === "pattern" ? `<span class="badge badge-pattern">PATTERN</span>` : "";
    const desc = leadSentences(f.description, 200);
    const panels = (window.MATH_DIAGRAMS || {})[f.id];
    const thumb = panels && panels[0]
      ? `<div class="cp-thumb">${String(panels[0]).replace(/<div class="diagram-cap">[\s\S]*?<\/div>/, "")}</div>`
      : "";
    clearTimeout(cpHide);
    cpEl = document.createElement("div");
    cpEl.className = "card-preview";
    cpEl.addEventListener("mouseenter", () => clearTimeout(cpHide));
    cpEl.addEventListener("mouseleave", hideCardPreview);
    // The box is a second target for the same link, so reading the summary and deciding to
    // go there does not mean travelling back to the word.
    cpEl.addEventListener("click", () => {
      const id = a.dataset.card;
      hideCardPreview();
      location.hash = "#/f/" + id;
      window.scrollTo({ top: 0 });
    });
    if (thumb) cpEl.classList.add("cp-has-thumb");
    cpEl.innerHTML = thumb +
      `<div class="cp-head">${f.name}${kind}</div><div class="cp-desc">${desc}</div>` +
      `<div class="cp-crumb">${escapeAttr(e.section.title)} &rsaquo; ${escapeAttr(e.subsection.title)}</div>` +
      `<span class="cp-arrow"></span>`;
    document.body.appendChild(cpEl);
    // Typeset BEFORE measuring. Positioning above the word needs the final height, and KaTeX
    // (and the thumbnail's SVG) change it after the fact; measuring first is what left a gap
    // above the word, and only above, since the below branch pins the top edge instead.
    renderMath(cpEl);
    const place = () => {
      if (!cpEl) return;
      positionFloat(cpEl, a, thumb ? 420 : 330, true, cpAt);
      // The arrow must point at the SAME fragment the box was placed against, or on a link
      // that wraps it aims at the union box's centre and misses the word entirely.
      const ar = fragmentUnder(a, cpAt), br = cpEl.getBoundingClientRect();
      const arrow = cpEl.querySelector(".cp-arrow");
      const target = cpAt ? cpAt.x : ar.left + ar.width / 2;
      arrow.style.left = Math.min(Math.max(target - br.left, 14), br.width - 14) + "px";
      cpEl.classList.toggle("cp-below", br.top > ar.top);
    };
    place();
    requestAnimationFrame(place);          // the thumbnail's SVG can resolve a frame later
  }

  // A block that is nothing but "{{figure:name}}" draws MATH_BODY_DIAGRAMS[card][name] at that
  // point in the text, so a paragraph describing a construction can sit right above its
  // picture instead of the reader scrolling back to the one figure at the top of the card.
  // The markers are checked by tools/scan-conventions.py: every one must resolve and every
  // registered figure must be used, so a typo cannot silently drop a figure.
  const FIGURE_MARK = /^\{\{figure:([\w-]+)\}\}$/;
  function bodyFigureHtml(fid, name) {
    const svg = ((window.MATH_BODY_DIAGRAMS || {})[fid] || {})[name];
    return svg ? `<div class="diagram body-figure">${svg}</div>` : "";
  }

  function detailBodyHtml(body, fid) {
    // Render the remaining lines of a block: an enumerated list when every line
    // starts with "- ", otherwise a paragraph. Enables explicit formula lists.
    const chunk = lines => {
      const items = lines.map(l => l.trim()).filter(Boolean);
      if (!items.length) return "";
      if (items.every(l => l.startsWith("- "))) {
        return `<ul class="detail-list">${items.map(l => `<li>${linkifyCards(l.slice(2).trim())}</li>`).join("")}</ul>`;
      }
      // "| a | b |" on every line: a table. The first row is the header, a "|---|" row under it
      // is skipped, and every cell is ordinary card text, so math and [[links]] work inside it.
      if (items.length >= 2 && items.every(l => l.startsWith("|"))) {
        const cells = l => l.replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
        const rows = items.filter(l => !/^\|[\s:|-]+\|$/.test(l)).map(cells);
        const head = rows.shift();
        return `<div class="detail-table-wrap"><table class="detail-table"><thead><tr>${head.map(c => `<th>${linkifyCards(c)}</th>`).join("")}</tr></thead>` +
          `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${linkifyCards(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      }
      // "1. ...", "2. ..." on every line: the numbered steps of a method's "## How".
      if (items.every(l => /^\d+\.\s/.test(l))) {
        return `<ol class="detail-list detail-steps">${items.map(l => `<li>${linkifyCards(l.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
      }
      return `<p>${linkifyCards(items.join(" "))}</p>`;
    };
    // A "## Full proof" section is rendered collapsed behind a button. Some
    // results (the mean chain, Newton's inequalities) have a derivation worth
    // keeping in full, but printing it inline would bury the short explanation
    // most readers came for.
    let inProof = false;
    const out = body.split(/\n\s*\n/).map(block => {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (!lines.length) return "";
      let html = "";
      if (lines[0].trim().startsWith("## ")) {
        const title = lines.shift().trim().slice(3).trim();
        const isProof = /^full proof$/i.test(title);
        if (inProof && !isProof) { html += "</div></div>"; inProof = false; }
        if (isProof) {
          inProof = true;
          html += `<div class="full-proof"><button type="button" class="show-more-btn proof-toggle" aria-expanded="false">Show full proof</button><div class="proof-body">`;
        } else {
          html += `<h4>${title}</h4>`;
        }
      }
      // A "### " line is a subheading inside a section, styled like the pattern's
      // "Methods to try" / "Formulas to try" labels (First-Step Analysis splits How by question).
      if (lines.length && lines[0].trim().startsWith("### ")) html += `<h5 class="try-sub body-sub">${linkifyCards(lines.shift().trim().slice(4).trim())}</h5>`;
      if (!lines.some(l => l.trim())) return html;
      const only = lines.map(l => l.trim()).filter(Boolean);
      if (only.length === 1 && FIGURE_MARK.test(only[0])) {
        return html + bodyFigureHtml(fid, only[0].match(FIGURE_MARK)[1]);
      }
      return html + chunk(lines);
    }).join("");
    return out + (inProof ? "</div></div>" : "");
  }

  // Recently opened cards and problems, newest first, for "Continue" on the front page. Kept
  // in this browser only. Stored keys are never pruned against the loaded data (a card that
  // fails to load must not be forgotten); the display filters them instead.
  const RECENT_KEY = "mq-recent";
  function readRecent() {
    try { const v = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); return Array.isArray(v) ? v.filter(x => typeof x === "string") : []; }
    catch (e) { return []; }
  }
  function noteRecent(key) {
    try {
      const v = readRecent().filter(x => x !== key);
      v.unshift(key);
      localStorage.setItem(RECENT_KEY, JSON.stringify(v.slice(0, 30)));
    } catch (e) { /* a convenience only: a blocked or full storage just means no history */ }
  }

  // One line for each calculator-style widget saying what it shows and what to try. Added under
  // the widget's title when the widget has no explanation of its own (2026-10-16 audit).
  const WIDGET_INTROS = {
      "roots-of-unity": "The n-th roots of unity are n equally spaced points on the unit circle, starting at 1. Change n and they stay the corners of a regular polygon; for n ≥ 2 they add to 0.",
      "vietas-general": "Type a polynomial's coefficients, highest power first. The tool finds every root, real and complex, and checks Vieta's relations: the sums and products of the roots against the coefficients.",
      "pascals-identity": "Each entry is the sum of the two above it. Color the triangle by value, or by remainder modulo 2, 3, or 5 to see its patterns, such as Sierpiński's triangle modulo 2.",
      "multiplicative-order": "Powers of a modulo m repeat in a cycle. The tool lists a, a², a³, … modulo m until the cycle closes; when a and m are coprime, its length is the order of a.",
      "euclidean-algorithm": "Each step replaces the larger number by its remainder on division by the smaller. The tool runs the steps for a and b, then works back up to integers x and y with ax + by = gcd(a, b).",
      "chicken-mcnugget": "Which totals can be made from a's and b's? The reachable totals are marked; when gcd(a, b) = 1, the largest total that cannot be made is ab − a − b.",
      "vertex-form": "Type a function of x and an interval to graph it. Try a quadratic in vertex form, a(x − h)² + k, and change h and k to move the vertex.",
      "base-conversion": "Type a number, the base it is written in, and the base to convert it to. Bases run from 2 to 36, with digits 0–9 and then A–Z.",
      "quadratic-formula": "Set a, b, and c to plot y = ax² + bx + c. The discriminant b² − 4ac decides whether the parabola crosses the x-axis twice, touches it, or misses it; the roots and the vertex are shown.",
      "am-gm": "Lengths a and b lie end to end along a diameter. The radius is their arithmetic mean, and the half-chord at the point where they meet is their geometric mean: never longer than the radius, and equal only when a = b.",
      "geometric-series": "Set the first term a, the ratio r, and the number of terms n. The tool adds the first n terms; for |r| < 1 the partial sums close in on a/(1 − r).",
      "binomial-theorem": "Pick n to expand (x + y)ⁿ. The coefficients are row n of Pascal's triangle, the binomial coefficients C(n, k).",
      "de-moivre": "Enter z and the highest power. Plotting z, z², z³, … shows the moduli multiplying and the angles adding, which is De Moivre's formula.",
      "finite-differences": "Type a sequence. Each row is the differences of the row above; a polynomial sequence of degree d reaches a constant row after d steps, and the tool runs the table forward to extend it.",
      "grid-paths": "Count the paths from the bottom-left corner to the top-right corner that move only right or up: C(w + h, w) for a w × h grid. New path draws one of them.",
      "reflection-principle": "A path that touches the barrier is reflected after its first touch. The reflection pairs these bad paths with all paths to the mirror image of the endpoint, which is how they are counted.",
      "permutations-combinations": "Pick n and k. P(n, k) counts ordered choices of k things from n, and C(n, k) unordered ones; they differ by the k! orders of each choice.",
      "stars-and-bars": "Put n identical items into k bins by laying out n stars and k − 1 bars: every arrangement is one distribution, so there are C(n + k − 1, k − 1) of them.",
      "catalan-numbers": "Pick n to compute the Catalan number Cₙ = C(2n, n)/(n + 1). It counts strings of n balanced pairs of parentheses, lattice paths that never cross the diagonal, and many other families.",
      "binomial-probability": "Set the number of trials n and the chance of success p. Each bar is the probability of exactly k successes, and the bars peak near the mean np.",
      "handshakes-diagonals": "Join every pair of n points: C(n, 2) segments. Of these, n are sides of the polygon and the other n(n − 3)/2 are diagonals.",
      "number-of-divisors": "Type n to factor it. The number of divisors and their sum both come from the exponents in the factorization.",
      "eulers-totient": "Type n to factor it and find φ(n), how many of 1, …, n are coprime to n: n times (1 − 1/p) for each prime p dividing n.",
      "pythagorean-triples": "Pick m > n > 0. Euclid's formula gives the triple (m² − n², 2mn, m² + n²), which is primitive exactly when m and n are coprime and not both odd.",
      "fermats-little-theorem": "Pick a and a prime p. The tool computes a raised to the power p − 1 modulo p, which is 1 whenever p does not divide a.",
      "legendres-formula": "Pick n and a prime p. The exponent of p in n! is ⌊n/p⌋ + ⌊n/p²⌋ + ⋯: one for each multiple of p, one more for each multiple of p², and so on.",
      "crt": "Two congruences with coprime moduli have exactly one solution modulo the product of the moduli. The tool finds it, or says when the two congruences contradict each other.",
      "regular-polygon-area": "Pick the number of sides and the side length. The area is half the perimeter times the apothem, the distance from the center to a side.",
      "polygon-angle-sums": "Pick n. The interior angles of an n-gon add to (n − 2) · 180°, from cutting it into n − 2 triangles; in a regular n-gon each angle is that sum divided by n.",
      "clock-angle": "Set a time. The minute hand moves 6° a minute and the hour hand 0.5° a minute, so the angle between them is the difference of their positions.",
      "repeating-decimals": "Type a fraction. The tool divides it out and marks where the decimal starts to repeat and how long the repeating block is.",
      "divisibility-rules": "Type a whole number to test it against every divisibility rule at once, with the reason each rule gives.",
      "sum-of-divisors": "Type n. Its factorization gives σ(n), the sum of its divisors, d(n), how many there are, and the product of all of them, which is n raised to d(n)/2.",
      "average-speed": "Two legs of the same distance at different speeds. The average speed is the harmonic mean of the two speeds, less than their ordinary average whenever they differ.",
      "power-sums": "Pick n to see 1 + 2 + ⋯ + n, the sum of the first n squares, and the sum of the first n cubes, each from its closed form.",
      "bayes-theorem": "Set how common a condition is and how accurate the test is. The tool shows the chance that a positive result is a true positive, which is often far lower than the test's accuracy.",
      "modular-inverse": "Pick a and m. The inverse of a modulo m is the x with ax ≡ 1 (mod m); it exists exactly when gcd(a, m) = 1, and the extended Euclidean algorithm finds it.",
      "complex-basics": "Drag z around the plane. Its conjugate z̄ is its mirror image in the real axis, and the caption follows both as you move.",
      "ramsey-33": "Six people, each pair either friends (blue) or strangers (red). However the pairs are colored, some three people are all friends or all strangers: Random coloring tries a new one, and Next triangle finds such a trio."
  };
  function addWidgetIntro(host, id) {
    const text = WIDGET_INTROS[id];
    if (!host || !text || host.querySelector(".tool-intro, .geo-hint, .ac-intro")) return;
    const title = host.querySelector(".tool-title, .geo-title");
    const p = document.createElement("p");
    p.className = "tool-intro";
    p.textContent = text;
    if (title) title.insertAdjacentElement("afterend", p); else host.prepend(p);
  }

  // ---------- Page tools (a setting) ----------
  // A right-hand column on a card's page, as on Wikipedia: Tools (links to the special pages
  // about this card, a permanent link, print, a random card), Page information (counted from
  // the data), and Appearance (text size, page width, and theme, the same settings as the
  // Settings page, so the two stay in step).
  // The column itself runs the full height of the page and carries the divider; only its
  // contents stick, so the line reaches the top bar and does not jump when the page bounces.
  function pageToolsHtml(entry) {
    const f = entry.formula, id = f.id;
    const body = (window.MATH_DETAILS || {})[id] || "";
    const plain = (f.description + " " + body).replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, " ").replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1");
    const words = (plain.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
    const sections = (body.match(/^## /gm) || []).length;
    const figures = ((window.MATH_DIAGRAMS || {})[id] || []).length + Object.keys((window.MATH_BODY_DIAGRAMS || {})[id] || {}).length;
    const examples = ((window.MATH_EXAMPLES || {})[id] ? 1 : 0) + (((window.MATH_PROBLEMS || {})[id]) || []).length;
    const linksOut = new Set(((f.description + " " + body).match(/\[\[([a-z0-9-]+)/g) || []).map(x => x.slice(2))).size;
    const linksIn = (getBacklinks()[id] || []).length;
    const probs = (PROBLEMS_BY_CARD[id] || []).length;
    const batch = (window.NEW_CARD_BATCHES || []).find(b => b.ids.indexOf(id) !== -1);
    const tl = TIER_LABELS[tierKey(f)], il = IMPORTANCE_LABELS[f.importance];
    const kindName = { formula: "Formula", method: "Method", pattern: "Pattern" }[kindOf(f)];
    const seg = (key, cur, opts) => `<div class="pt-seg" role="radiogroup">${opts.map(([v, l]) => `<button type="button" role="radio" aria-checked="${v === cur ? "true" : "false"}" data-pt-set="${key}" data-val="${v}">${l}</button>`).join("")}</div>`;
    const row = (k, v) => `<div class="pt-info"><span>${k}</span><b>${v}</b></div>`;
    return `<aside class="page-tools" aria-label="Page tools"><div class="pt-inner">
        <section class="pt-block"><div class="pt-head">Tools</div>
          <a href="${specialHref("WhatLinksHere", id)}">What links here <span class="pt-n">${linksIn}</span></a>
          <a href="${specialHref("ProblemsUsing", id)}">Problems using this card <span class="pt-n">${probs}</span></a>
          <button type="button" class="pt-act" data-pt="permalink">Copy a permanent link</button>
          <button type="button" class="pt-act" data-pt="print">Print this page</button>
          <a href="#/special/random">Random card</a>
          <button type="button" class="pt-act pt-hide" data-pt="hide">Hide page tools</button>
        </section>
        <section class="pt-block"><div class="pt-head">Page information</div>
          ${row("Id", `<code>${id}</code>`)}
          ${row("Kind", kindName)}
          ${row("Subject", escapeAttr(entry.section.title))}
          ${tl ? row("Tier", tl[0]) : ""}
          ${il ? row("Importance", il[0]) : ""}
          ${row("Write-up", `${words.toLocaleString()} words, ${sections} section${sections === 1 ? "" : "s"}`)}
          ${row("Figures", figures)}
          ${row("Examples", examples)}
          ${row("Links out / in", `${linksOut} / ${linksIn}`)}
          ${batch ? row("Added", escapeAttr(batch.date)) : ""}
        </section>
        <section class="pt-block"><div class="pt-head">Appearance</div>
          <div class="pt-label">Text</div>${seg("text", state.text, [["normal", "Normal"], ["large", "Large"], ["larger", "Larger"]])}
          <div class="pt-label">Theme</div>${seg("theme", currentTheme(), [["light", "Light"], ["dark", "Dark"]])}
        </section>
      </div></aside>`;
  }
  function wirePageTools(root, entry) {
    const aside = root.querySelector(".page-tools");
    if (!aside) return;
    aside.addEventListener("click", e => {
      const set = e.target.closest("[data-pt-set]");
      if (set) {
        const key = set.dataset.ptSet, val = set.dataset.val;
        if (key === "theme") applyTheme(val);
        else { state[key] = val; applyLayout(); saveSettings(); }
        set.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", b === set ? "true" : "false"));
        return;
      }
      const act = e.target.closest("[data-pt]");
      if (!act) return;
      if (act.dataset.pt === "print") window.print();
      else if (act.dataset.pt === "hide") { state.tools = "off"; saveSettings(); renderDetail(entry); }
      else if (act.dataset.pt === "permalink") {
        const url = location.href.split("#")[0] + "#/f/" + entry.formula.id;
        const done = () => toast("Link copied.");
        try { navigator.clipboard.writeText(url).then(done, () => toast(url)); } catch (err) { toast(url); }
      }
    });
  }

  function renderDetail(entry) {
    const f = entry.formula;
    noteRecent("f:" + f.id);
    state.activeSectionId = entry.section.id;
    state.activeSub = bySubject(entry.section) ? entry.section.subsections.indexOf(entry.subsection) : null;
    state.activeTopic = bySubject(entry.section) ? null : entry.section.subsections.indexOf(entry.subsection);
    const ownGroup = bySubject(entry.section) && entry.subsection.groups ? entry.subsection.groups.findIndex(g => g.ids.indexOf(f.id) !== -1) : -1;
    state.activeCluster = ownGroup >= 0 ? ownGroup : null;
    state.openGroup = null;
    const body = notate((window.MATH_DETAILS || {})[f.id]);
    // Any card that actually carries a "## Key forms" block renders it. This began as a
    // method-only feature on the reasoning that a formula card already lists its formulas in
    // the big box, but that is only true when the card has ONE formula: results with named
    // variants (Cauchy-Schwarz and its Titu/Engel form, the QM-AM-GM-HM chain) need somewhere
    // to enumerate them. splitKeyForms already returns the body untouched when there is no
    // block, so a card without one is unaffected and nothing can be silently stripped.
    const split = splitKeyForms(body);
    // Patterns will read "Recognize it" (what tips you off that you are looking at this
    // problem) once those blocks are rewritten; until then the existing content really is
    // key forms, so it keeps the honest heading.
    const formsHtml = split.formsHtml("Key forms");
    const kind = kindOf(f), converted = isConverted(f);
    state.landing = false;
    // The authored contest-profile sentence and a method's supporting mathematics render in
    // their own places on the page, so they are lifted out of the running write-up.
    const prof = pullSection(split.rest, "Contest profile");
    const supp = kind === "method" ? pullSection(prof.rest, "Formulas it uses") : { text: null, rest: prof.rest };
    // On a converted method or pattern, Common traps closes the explanation, after the Uses,
    // Supporting mathematics and family blocks that are drawn from the card's fields.
    const trapSec = converted ? pullSection(supp.rest, "Common traps") : { text: null, rest: supp.rest };
    const trySec = kind === "pattern" && converted ? pullSection(trapSec.rest, "Methods and Formulas to Try") : { text: null, rest: trapSec.rest };
    // A converted method's "When to use" opens the write-up, and lists under it the patterns
    // that suggest the move (computed from their `suggests`).
    const whenSec = kind === "method" && converted ? pullSection(trySec.rest, "When to use") : { text: null, rest: trySec.rest };
    const rest = whenSec.rest;
    const hasDiagram = !!((window.MATH_DIAGRAMS || {})[f.id] || []).length;
    const exHtml = practiceHtml(f);
    const profileHtml = contestProfileHtml(f, prof.text), problemsHtml = contestHtml(f);
    // Not geometry-only: plenty of algebra and counting cards carry a computed figure,
    // and the Asymptote export works off the rendered SVG regardless of subject.
    const asyBtn = hasDiagram
      ? `<button class="copy-btn copy-asy-btn" title="Copy Asymptote code for the figure">Copy Asymptote</button>`
      : "";
    const withTools = state.tools === "on";
    $content.innerHTML = `${withTools ? `<div class="detail-with-tools">` : ""}
      <div class="detail">
        <div class="back-row">
          ${backFromSearch
            ? `<a class="back-link" href="#" data-back-search>&larr; Back to ${backFromSearch.adv
                ? "tag results"
                : `results for &ldquo;${escapeAttr(backFromSearch.query.trim())}&rdquo;`}</a>`
            : ""}
          ${backFromCardProblem && backFromCardProblem.fid === f.id && PROBLEM_BY_SLUG[backFromCardProblem.slug]
            ? `<a class="back-link" href="#/problem/${backFromCardProblem.slug}">&larr; Back to ${escapeAttr(refShort(PROBLEM_BY_SLUG[backFromCardProblem.slug].ref))}</a>`
            : ""}
          ${backFromFormula && backFromFormula.fid === f.id && anyList(backFromFormula.listId)
            ? `<a class="back-link" href="#/list/${backFromFormula.listId}">&larr; Back to ${escapeAttr(anyList(backFromFormula.listId).name)}</a>`
            : ""}
          <a class="back-link" href="${sectionHash(entry.section.id, bySubject(entry.section) ? { sub: state.activeSub, cluster: state.activeCluster } : { topic: state.activeTopic })}" data-back-section>&larr; Back to ${bySubject(entry.section) ? (state.activeCluster != null ? entry.subsection.groups[state.activeCluster].title : pageTitle(entry.section, state.activeSub)) : entry.subsection.title}</a>
        </div>
        <p class="detail-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</p>
        <div class="detail-head">
          <h2 class="card-name">${f.name}</h2>
          <div class="card-meta detail-meta">${kindBadgeHtml(f)}${impBadgeHtml(f)}</div>
          <span class="detail-actions">
            ${starBtnHtml(f.id)}
            ${addListBtnHtml(f.id)}
            ${f.latex ? `<button class="copy-btn" data-latex="${escapeAttr(latexFor(f))}" title="Copy the LaTeX">Copy LaTeX</button>` : ""}
            ${asyBtn}
          </span>
        </div>
        ${f.latex ? `<div class="formula-display detail-formula" data-latex="${escapeAttr(latexFor(f))}"></div>` : ""}
        ${leadBoxHtml(f)}
        <p class="card-desc detail-summary">${linkifyCards(f.descriptionLinked || f.description)}</p>
        ${f.placeholder ? `<div class="planned-note">This card is planned. Its full write-up, figure, and worked example are still to come; the summary above is the idea in one sentence.</div>` : ""}
        ${(() => {
          // Every figure on the card sits in one row of panels, right under the summary.
          const panels = (window.MATH_DIAGRAMS || {})[f.id] || [];
          if (!panels.length) return "";
          const inner = panels.map(d => `<div class="diagram detail-diagram">${d}</div>`).join("");
          return `<div class="detail-diagrams dd-${Math.min(panels.length, 3)}">${inner}</div>`;
        })()}
        ${formsHtml}
        ${kind === "method" && converted ? whenToUseHtml(f, whenSec.text) : ""}
        ${rest && rest.trim() ? `<div class="detail-body">${detailBodyHtml(rest, f.id)}</div>` : ""}
        ${tryHtml(f, trySec.text)}
        ${kindLinksHtml(entry, supp.text)}
        ${trapSec.text ? `<div class="detail-body">${detailBodyHtml("## Common traps\n" + trapSec.text, f.id)}</div>` : ""}
        ${(window.MATH_WIDGETS || {})[f.id] ? `<div class="interactive"><h4>Interactive</h4><div id="formula-widget"></div></div>` : ""}
        ${profileHtml}
        ${exHtml}
        ${problemsHtml}
        ${reverseLinksHtml(f)}
        ${connectedHtml(f)}
        <div class="related"><h4>Tags</h4>${tagRowHtml(f, null, entry.topics)}</div>
      </div>${withTools ? pageToolsHtml(entry) + "</div>" : ""}`;
    renderMath($content);
    if (withTools) wirePageTools($content, entry);
    var wdg = (window.MATH_WIDGETS || {})[f.id];
    if (wdg) { try { wdg.mount(document.getElementById("formula-widget")); addWidgetIntro(document.getElementById("formula-widget"), f.id); } catch (e) { if (window.console) console.warn("widget error:", f.id, e); } }
    try { decorateNumberInputs(document.getElementById("formula-widget")); } catch (e) {}
    wireProblemToggle($content);
    wireProofToggles($content);
    buildPageToc();
  }

  // ---------- "On this page": a card page's sections, listed under the sidebar ----------
  // Each section heading gets an anchor and a one-line note on what the section is for, and
  // the sidebar lists the sections so the page can be read like an article and jumped around.
  const SECTION_NOTES = {
    "Key forms": "The shapes the result takes, and when each one applies.",
    "Conditions": "When the result holds, and what breaks it.",
    "Why it works": "Why it is true, in a form you can rebuild yourself.",
    "Useful observations": "Consequences and special cases worth knowing.",
    "Applications": "Where the fact naturally comes up.",
    "Full proof": "A complete proof, for when the sketch is not enough.",
    "How to use it": "How the result is put to work on problems.",
    "On contests": "How it tends to show up in contest problems.",
    "How": "The move, step by step.",
    "When it's worth trying": "Rules of thumb from experience, not theorems.",
    "Common traps": "The mistakes that most often undo it.",
    "Distinguishing clues": "What separates this shape from look-alikes.",
    "Methods and Formulas to Try": "The moves in the box above, why each fits this shape, and the facts they lean on.",
    "Formulas it uses": "The formulas you need to know to use this move, and how each one enters.",
    "Used by methods": "Methods that name it as a formula.",
    "Suggested by patterns": "Problem shapes in which this move is worth trying.",
    "When to use": "The situations that call for this move, and the patterns that point to it.",
    "Interactive": "Move the pieces and watch the result hold.",
    "Examples": "Worked examples that use this card.",
    "Contest profile": "What the tagged contest problems say about this card. (Statistically generated)",
    "Practice Problems": "Real contest problems that use this card, by contest.",
    "Related formulas": "Hand-picked cards that are part of the same idea.",
    "Related methods": "Hand-picked cards that are part of the same idea.",
    "Related patterns": "Hand-picked cards that are part of the same idea.",
    "Tags": "The keywords that search uses for this card."
  };
  function buildPageToc() {
    const toc = document.getElementById("page-toc");
    if (!toc) return;
    const items = [];
    $content.querySelectorAll(".detail h4").forEach(h => {
      if (h.closest(".problem, .prob-row, .card")) return;
      const title = h.childNodes.length ? [...h.childNodes].filter(n => n.nodeType === 3 || !n.classList || !n.classList.contains("practice-note")).map(n => n.textContent).join("").trim() : h.textContent.trim();
      if (!title) return;
      const id = "sec-" + slugOf(title);
      h.id = id;
      const note = SECTION_NOTES[title];
      if (note && !(h.nextElementSibling && h.nextElementSibling.classList.contains("sec-note"))) {
        h.insertAdjacentHTML("afterend", `<p class="sec-note">${note}</p>`);
      }
      items.push(`<a class="toc-link" href="#${id}" data-toc="${id}">${escapeAttr(title)}</a>`);
    });
    tocPinned = null;
    toc.innerHTML = items.length ? `<div class="toc-head">On this page</div>${items.join("")}` : "";
    toc.hidden = !items.length;
    markToc();
  }
  // A list page's sections in the same panel, each with its count of cards.
  function buildListToc() {
    const toc = document.getElementById("page-toc");
    if (!toc) return;
    const items = [...$content.querySelectorAll(".list-section[id]")].map(sec => {
      const t = sec.querySelector(".list-section-title"), n = sec.querySelectorAll(".cards > .card").length;
      return `<a class="toc-link toc-counted" href="#${sec.id}" data-toc="${sec.id}"><span class="toc-t">${t ? t.innerHTML : ""}</span><span class="toc-n">${n}</span></a>`;
    });
    tocPinned = null;
    toc.innerHTML = items.length ? `<div class="toc-head">On this list</div>${items.join("")}` : "";
    toc.hidden = !items.length;
    markToc();
  }
  function clearPageToc() {
    const toc = document.getElementById("page-toc");
    if (toc) { toc.innerHTML = ""; toc.hidden = true; }
  }
  // The section being read is the last heading that has passed under the top bar.
  // A clicked section stays marked until the reader scrolls by hand. The last sections of a
  // page can never scroll up to the marking line, so without this a click on "Examples" or
  // "Tags" near the bottom left an earlier section marked.
  let tocPinned = null;
  // True right after a group link is clicked, until the reader scrolls by hand (markNavGroup).
  let groupPinned = false;
  const unpinToc = () => { groupPinned = false; if (tocPinned) { tocPinned = null; markToc(); } };
  window.addEventListener("wheel", unpinToc, { passive: true });
  // The page-tools panel sticks just under the top bar, whose height changes with the text size
  // and the density; --topbar-h follows it so the panel never slides under the bar or gaps.
  (() => {
    const bar = document.querySelector(".topbar");
    if (!bar || !window.ResizeObserver) return;
    new ResizeObserver(() => { if (bar.offsetHeight) document.documentElement.style.setProperty("--topbar-h", bar.offsetHeight + "px"); }).observe(bar);
  })();
  window.addEventListener("touchmove", unpinToc, { passive: true });
  window.addEventListener("keydown", e => { if (/^(Arrow(Up|Down)|Page(Up|Down)|Home|End| )$/.test(e.key)) unpinToc(); });
  function markToc() {
    const toc = document.getElementById("page-toc");
    if (!toc || toc.hidden) return;
    if (tocPinned && toc.querySelector(`[data-toc="${tocPinned}"]`)) {
      toc.querySelectorAll("[data-toc]").forEach(a => a.classList.toggle("active", a.dataset.toc === tocPinned));
      return;
    }
    const bar = document.querySelector(".topbar");
    const line = (bar ? bar.offsetHeight : 0) + 24;
    let cur = null;
    toc.querySelectorAll("[data-toc]").forEach(a => {
      const h = document.getElementById(a.dataset.toc);
      if (h && h.getBoundingClientRect().top <= line) cur = a.dataset.toc;
    });
    if (!cur) { const first = toc.querySelector("[data-toc]"); cur = first && first.dataset.toc; }
    toc.querySelectorAll("[data-toc]").forEach(a => a.classList.toggle("active", a.dataset.toc === cur));
  }
  // (The panels use data-open, not data-href: the command-suggestion handler below claims every
  // [data-href] on the page and cancels the click, which broke the AoPS link inside the panel.)
  // A section link scrolls to its heading, just under the top bar. It must not touch the
  // address: the hash is the route.
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-toc]");
    if (!a) return;
    e.preventDefault();
    const h = document.getElementById(a.dataset.toc);
    if (!h) return;
    const bar = document.querySelector(".topbar");
    window.scrollTo({ top: Math.max(0, h.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 14), behavior: "instant" });
    tocPinned = a.dataset.toc;
    markToc();
    closeDrawer();
  });
  document.addEventListener("click", e => {
    const panel = e.target.closest(".hp-click");
    if (!panel || e.target.closest("a, button, summary, input")) return;
    location.hash = panel.dataset.open;
  });
  document.addEventListener("keydown", e => {
    const panel = e.target.closest && e.target.closest(".hp-click");
    if (panel && e.target === panel && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); location.hash = panel.dataset.open; }
  });
  // A subject page (Formulas topics, Methods groups, Patterns families) is one long scrolling page,
  // and a sidebar link only scrolls to a heading, so the sidebar must follow the scroll: the group
  // whose heading has passed under the top bar is the one marked. The address follows too, through
  // replaceState, so a refresh or a Back to this page returns to the same group without adding
  // history entries.
  function markNavGroup() {
    if (getRoute().type !== "home" || state.landing || state.query.trim() || state.adv) return;
    const sec = SECTIONS.find(x => x.id === state.activeSectionId);
    if (!sec) return;
    const bySub = bySubject(sec);
    if (bySub && state.activeSub == null) return;
    const groups = [...document.querySelectorAll('section.grp[id^="grp-' + sec.id + "-" + (bySub ? state.activeSub : "x") + '-"]')];
    if (!groups.length) return;
    const bar = document.querySelector(".topbar");
    const line = (bar ? bar.offsetHeight : 0) + 24;
    const was = bySub ? state.activeCluster : state.activeTopic;
    let cur = null;
    groups.forEach(g => { if (g.getBoundingClientRect().top <= line) cur = +g.id.split("-").pop(); });
    if (cur === null) cur = +groups[0].id.split("-").pop();   // above the first heading: the first group
    // At the very bottom the last groups can never reach the line. Keep a group the reader chose
    // while its heading is still on screen; otherwise mark the last group.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      const chosen = groups.find(g => +g.id.split("-").pop() === was);
      if (groupPinned && chosen && chosen.getBoundingClientRect().top < window.innerHeight) return;
      cur = +groups[groups.length - 1].id.split("-").pop();
    }
    if (cur === was) return;
    if (bySub) state.activeCluster = cur; else state.activeTopic = cur;
    updateNavActive();
    const want = sectionHash(sec.id, bySub ? { sub: state.activeSub, cluster: cur } : { topic: cur });
    if (location.hash !== want) history.replaceState(history.state, "", want);
  }
  let tocTick = 0;
  window.addEventListener("scroll", () => { if (!tocTick) tocTick = requestAnimationFrame(() => { tocTick = 0; markToc(); markNavGroup(); }); }, { passive: true });

  // Replace the browser's default (light) number-input spinner with themed ▲▼ arrows
  // that sit inside the field, so they match the dark UI instead of standing out.
  function decorateNumberInputs(root) {
    if (!root) return;
    var inputs = root.querySelectorAll('input[type="number"]:not([data-stepped])');
    for (var i = 0; i < inputs.length; i++) {
      (function (inp) {
        inp.setAttribute("data-stepped", "1");
        var wrap = document.createElement("span");
        wrap.className = "num-stepper";
        inp.parentNode.insertBefore(wrap, inp);
        wrap.appendChild(inp);
        var btns = document.createElement("span");
        btns.className = "num-btns";
        btns.innerHTML = '<button type="button" tabindex="-1" aria-label="increase">▲</button><button type="button" tabindex="-1" aria-label="decrease">▼</button>';
        wrap.appendChild(btns);
        function step(dir) {
          var st = parseFloat(inp.step) || 1, v = parseFloat(inp.value);
          if (isNaN(v)) v = 0;
          v = Math.round((v + dir * st) * 1e9) / 1e9;
          if (inp.min !== "" && v < parseFloat(inp.min)) v = parseFloat(inp.min);
          if (inp.max !== "" && v > parseFloat(inp.max)) v = parseFloat(inp.max);
          inp.value = v;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
          inp.dispatchEvent(new Event("change", { bubbles: true }));
        }
        btns.children[0].addEventListener("click", function () { step(1); });
        btns.children[1].addEventListener("click", function () { step(-1); });
      })(inputs[i]);
    }
  }

  function wireProofToggles(root) {
    (root || document).querySelectorAll(".proof-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const box = btn.closest(".full-proof");
        const open = box.classList.toggle("proof-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "Hide full proof" : "Show full proof";
      });
    });
  }

  function wireProblemToggle(root) {
    (root || document).querySelectorAll(".prob-more").forEach(btn => btn.addEventListener("click", () => {
      const box = btn.closest(".prob-group");
      const open = box.classList.toggle("probs-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open
        ? "Show fewer"
        : `Show ${box.querySelectorAll(".prob-extra").length} more ${box.dataset.fam}`;
    }));
  }

  function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  // Ids of the formulas in the current list-style view (used for the empty check).
  let shownIds = [];

  // A subject's title and blurb. The space's name and question are already at the top of the
  // sidebar beside it, so they are not repeated here. Formulas keep their subject blurb; a Methods or
  // Patterns subject page carries the book's own one-line intro.
  function sectionHeaderHtml(section, only) {
    const b = BOOKS[bookOf(section)];
    return `
      <div class="section-header">
        <h2>${pageTitle(section, only)}</h2>
        <p>${bySubject(section) ? b.intro : section.blurb}</p>
      </div>`;
  }

  // Every subject opens on its groups as tiles: a Formulas subject's topics, a Methods subject's
  // method groups, a Patterns subject's pattern families. A tile opens a short page with just
  // that group's cards, under its own title and one-line blurb, with the neighbouring groups a
  // step away. Every link lands on a page of its own, never partway down a long one.
  const topicEntries = sub => browseOrder(sortEntries(sub.formulas.filter(passesFilter).map(f => BY_ID[f.id])));
  function subjectGroups(section, subIdx) {
    if (!bySubject(section)) return section.subsections.map((sub, i) => ({
      title: sub.title, blurb: sub.blurb || "", total: sub.formulas.length,
      entries: topicEntries(sub), href: sectionHash(section.id, { topic: i })
    }));
    const sub = section.subsections[subIdx];
    if (!sub || !sub.groups) return [];
    return sub.groups.map((g, j) => ({
      title: g.title, blurb: g.blurb || "", total: g.ids.length,
      entries: browseOrder(g.ids.map(id => BY_ID[id]).filter(e => e && passesFilter(e.formula))),
      href: sectionHash(section.id, { sub: subIdx, cluster: j })
    }));
  }
  // A subject is one scrolling page: every group under its own heading and one-line blurb.
  // The sidebar's group links and a group's address land on its heading.
  const groupAnchor = (secId, subIdx, i) => `grp-${secId}-${subIdx == null ? "x" : subIdx}-${i}`;
  function renderSubjectScroll(section, subIdx, groups) {
    shownIds = [];
    const parts = [sectionHeaderHtml(section, bySubject(section) ? subIdx : null)];
    groups.forEach((g, i) => {
      if (!g.entries.length) return;
      g.entries.forEach(e => shownIds.push(e.formula.id));
      parts.push(`
        <section class="subsection grp" id="${groupAnchor(section.id, subIdx, i)}">
          <h3 class="grp-title">${g.title}<span class="grp-n">${g.entries.length}</span></h3>
          ${g.blurb ? `<p class="grp-blurb">${g.blurb}</p>` : ""}
          <div class="cards">${g.entries.map(e => cardHtml(e, false, null)).join("")}</div>
        </section>`);
    });
    if (!shownIds.length) parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No ${pageTitle(section, subIdx)} cards match the current filters.</div>`);
    $content.innerHTML = parts.join("");
    renderMath($content, true);
  }
  // Where a fresh visit to an address should land: a group's heading, else the top. A
  // revisited history entry passes the position it was left at instead.
  function scrollForRoute(route, saved, st) {
    if (saved != null) {
      // Back or Forward: put the saved anchor back where it was, and again once fonts and
      // lazily rendered math have settled, unless the reader has scrolled in between.
      const anchor = st && st.a ? document.getElementById(st.a) : null;
      const place = () => {
        const top = anchor && document.body.contains(anchor) ? anchor.getBoundingClientRect().top + window.scrollY - st.o : saved;
        window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        return window.scrollY;
      };
      // The reader's own scrolling is detected from input events, not from scrollY: the browser's
      // scroll anchoring also moves scrollY when content above changes, and that must be undone.
      let done = false;
      place();
      const again = () => { if (!done) place(); };
      // Re-place on every frame while the page settles (math, fonts, a problem statement loading),
      // so a layout change is corrected in the frame it happens; stop after a moment or at the
      // reader's first input.
      const stop = () => { if (done) return; done = true; ["wheel", "touchstart", "keydown", "mousedown"].forEach(t => window.removeEventListener(t, stop, true)); };
      ["wheel", "touchstart", "keydown", "mousedown"].forEach(t => window.addEventListener(t, stop, true));
      const t0 = performance.now();
      const tick = () => { again(); if (!done && performance.now() - t0 < 1500) requestAnimationFrame(tick); else stop(); };
      requestAnimationFrame(tick);
      return;
    }
    const sc = route.section;
    const gi = sc ? (sc.cluster != null ? sc.cluster : sc.topic) : null;
    const el = gi != null ? document.getElementById(groupAnchor(sc.id, sc.sub, gi)) : null;
    if (!el) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    // The heading sits just under the top bar. Fonts and figures can still shift the page
    // after this, so it is placed again once they settle, unless the reader has scrolled.
    const place = () => {
      const bar = document.querySelector(".topbar");
      const top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      return window.scrollY;
    };
    const y = place();
    const again = () => { if (document.body.contains(el) && Math.abs(window.scrollY - y) < 4) place(); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
    setTimeout(again, 250);
  }

  function renderSection(section) {
    if (state.layout === "wiki") { renderSectionWiki(section); return; }
    const subIdx = bySubject(section) ? (state.activeSub != null ? state.activeSub : 0) : null;
    const groups = subjectGroups(section, subIdx);
    renderSubjectScroll(section, subIdx, groups);
  }

  // ---------- Settings page ----------
  // A real page rather than a modal, because preferences here change how the whole app reads
  // and there needs to be room for more of them later. The filters stay
  // behind the toolbar funnel, since they change what is listed rather than how the app reads.
  // One setting per row: its name and what it does on the left, a segmented control on the
  // right. Rows sit in panels by kind: how the app looks, how the math reads, how browsing
  // behaves, then commands and the experimental toys.
  function settingRow(name, desc, key, current, options, pv) {
    return `
      <div class="set-row"${pv ? ` data-pv="${pv}"` : ""}>
        <div class="set-text"><div class="set-name">${name}</div><div class="set-desc">${desc}</div></div>
        <div class="seg" role="radiogroup" aria-label="${escapeAttr(name)}">${options.map(([val, label]) =>
          `<button type="button" role="radio" aria-checked="${val === current ? "true" : "false"}" data-set="${key}" data-val="${val}">${label}</button>`).join("")}</div>
      </div>`;
  }

  function renderSettingsPage() {
    shownIds = [];
    const theme = currentTheme();
    $content.innerHTML = `
      <div class="settings-layout">
      <div class="settings-main">
      <div class="section-header settings-head">
        <h2>Settings</h2>
        <p>Preferences are saved in this browser.</p>
      </div>
      <div class="settings-page">
        <section class="set-panel">
          <h3 class="set-panel-title">Appearance</h3>
          ${settingRow("Theme", "Light or dark. Dark is easier at night.", "theme", theme, [["light", "Light"], ["dark", "Dark"]])}
          ${settingRow("Density", "How tightly the whole app is spaced: page margins, the gaps between cards and sections, and the padding inside panels. Spacious gives everything more room; Compact fits more on each screen. Neither changes text size or card size.", "density", state.density, [["comfortable", "Comfortable"], ["spacious", "Spacious"], ["compact", "Compact"]])}
          ${settingRow("Card size", "How big each card is while browsing. Large cards are wider, so fewer fit across.", "cols", state.cols, [["regular", "Regular"], ["spacious", "Large"]], "browse")}
          ${settingRow("Formula lines", "The most rows of a card's formulas to show while browsing, so the cards in a grid stay even. A card's own page always shows all of them. Card thumbnails are written with the most important formula first.", "lines", state.lines, [["1", "1"], ["2", "2"], ["3", "3"], ["all", "All"]], "browse")}
          ${settingRow("Text size", "How big the prose and the formulas are, everywhere in the app. Each step up is about 20% larger.", "text", state.text, [["normal", "Normal"], ["large", "Large"], ["larger", "Larger"]], "browse page subject problem")}
          ${settingRow("Keyword tags", "The tag chips on a card's page. Search uses them either way.", "tags", state.tags ? "on" : "off", [["on", "Show"], ["off", "Hide"]], "page")}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Reading the math</h3>
          ${settingRow("Notation", "Expanded writes out the first few terms instead of \u2211 or \u220f in formula boxes and key forms. Explanations keep sigma notation, where the index is usually the point.", "notation", state.notation, [["sigma", "Sigma"], ["expanded", "Expanded"]], "browse page")}
          ${settingRow("Figures on cards", "Figures always appear on a card's own page. On also shows each card's figure while browsing.", "diagrams", state.diagrams, [["none", "Off"], ["on", "On"]], "browse")}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Browsing</h3>
          ${settingRow("Subject pages", "Every card in a subject on one scrolling page, grouped by topic, or just the names, A to Z.", "layout", state.layout, [["cards", "Cards"], ["wiki", "A&ndash;Z index"]], "subject")}
          ${settingRow("Card order", "How cards are ordered on a subject page. Curated keeps the order the cards were written in; Most used puts first the cards that the most practice problems use.", "order", state.order, [["curated", "Curated"], ["problems", "Most used"]], "subject")}
          ${settingRow("Scroll speed", "How far a page moves for each turn of the mouse wheel or swipe on the trackpad. Normal leaves your browser's own scrolling as it is.", "scroll", state.scroll, [["slow", "Slow"], ["normal", "Normal"], ["fast", "Fast"]])}
          ${settingRow("When the app opens", "Where you land when you open the app without a link to a particular page. The front page shows the four spaces; Formulas goes straight in, and Where I left off returns to the last page you had open. The logo still takes you to the front page.", "start", state.start, [["landing", "Front page"], ["formulas", "Formulas"], ["last", "Where I left off"]])}
          ${settingRow("Page tools", "A column on the right of a card's page, as on Wikipedia: what links to the card, the problems that use it, a permanent link, printing, facts about the page, and quick appearance controls (text size and theme).", "tools", state.tools, [["off", "Off"], ["on", "On"]], "page")}
          <div class="set-row set-row-note">
            <div class="set-text"><div class="set-name">Filters</div><div class="set-desc">The contest-tier and importance filters apply everywhere cards are listed, and are set behind the funnel in the top bar.</div></div>
          </div>
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Practice</h3>
          ${settingRow("Strategy", "On a problem's page, the strategy and the cards it uses. Shown puts them under the problem at once; Click to show keeps them behind a button, so you can try the problem first.", "strategy", state.strategy, [["show", "Shown"], ["click", "Click to show"]], "problem")}
        </section>
        <section class="set-panel" id="set-commands">
          <h3 class="set-panel-title">Commands</h3>
          <div class="set-body">
            <form class="command-box" autocomplete="off">
              <input type="text" class="command-input" placeholder="Special:Random" aria-label="Run a command" spellcheck="false">
              <button type="submit" class="command-run">Run</button>
            </form>
            <p class="settings-hint command-msg" hidden></p>
            <p class="settings-hint">Commands also run from the search box: type one and press Enter. Arguments follow a slash and combine in any order, as in Special:Random/Formula/Geometry/Medium.</p>
            <button type="button" class="show-more-btn command-toggle" aria-expanded="false">Show all commands</button>
            <div class="command-all" hidden>${commandListHtml()}</div>
          </div>
        </section>
        <section class="set-panel" id="set-progress">
          <h3 class="set-panel-title">Your progress</h3>
          <div class="set-row">
            <div class="set-text"><div class="set-name">Export progress</div><div class="set-desc">Save your lists, stars, settings, theme, recently opened pages, and flashcard and quiz progress as one file (versioned JSON), to keep as a backup or to move to another browser.</div></div>
            <div class="seg"><button type="button" class="progress-export">Export</button></div>
          </div>
          <div class="set-row">
            <div class="set-text"><div class="set-name">Import progress</div><div class="set-desc">Load a file made by Export. Lists are merged into the ones you have (no card is removed from a list); settings, theme, and flashcard progress are replaced by the file's.</div></div>
            <div class="seg"><button type="button" class="progress-import">Import</button><input type="file" class="progress-file" accept="application/json,.json" hidden></div>
          </div>
          <p class="settings-hint progress-msg" hidden></p>
        </section>
        <details class="set-panel set-lab">
          <summary class="set-panel-title">Experimental <span class="lab-tag">for fun</span></summary>
          <div class="set-body">
            <p class="settings-hint">Toys built on the same data, living outside the app in their own tab so they cannot disturb it. Nothing here is a real feature.</p>
            <div class="lab-row">
              <a class="lab-card" href="lab/formula-web.html" target="_blank" rel="noopener">
                <span class="lab-name">Formula Web &rarr;</span>
                <span class="lab-desc">Every card as a dot, clustered by subsection, with the hand-written cross-links drawn between them. Hover to isolate one card and its neighbours; click to open it.</span>
              </a>
              <a class="lab-card" href="lab/quiz.html" target="_blank" rel="noopener">
                <span class="lab-name">Quiz &rarr;</span>
                <span class="lab-desc">Pick a list and name the formula from its statement and figure, four choices at a time. Wrong answers come from the same subsection, so they are not giveaways.</span>
              </a>
              <a class="lab-card" href="lab/flashcards.html" target="_blank" rel="noopener">
                <span class="lab-name">Flashcards &rarr;</span>
                <span class="lab-desc">Spaced-repetition review of any section or study list: see a name and recall its formula, or the reverse. Cards you know come back less and less often; misses come back the same session.</span>
              </a>
            </div>
          </div>
        </details>
      </div>
      </div>
      <aside class="set-preview" aria-label="Preview" inert></aside>
      </div>`;
    fillSettingsPreview();
    const $cmdToggle = $content.querySelector(".command-toggle");
    if ($cmdToggle) $cmdToggle.addEventListener("click", () => {
      const box = $content.querySelector(".command-all"), open = box.hidden;
      box.hidden = !open;
      $cmdToggle.setAttribute("aria-expanded", open ? "true" : "false");
      $cmdToggle.textContent = open ? "Hide commands" : "Show all commands";
    });
    // #/settings/commands, the "All commands" link on every special page: open the list and
    // bring the Commands group into view. Deferred to after the router's hashchange handler (a
    // timer, not a frame: frames are paused in a background tab).
    if (getRoute().anchor === "commands") {
      if ($cmdToggle && $content.querySelector(".command-all").hidden) $cmdToggle.click();
      const grp = $content.querySelector(".command-box");
      if (grp) setTimeout(() => grp.closest(".set-panel").scrollIntoView({ block: "start", behavior: "instant" }), 0);
    }
    wireProgressPanel();
    const $cmdForm = $content.querySelector(".command-box");
    if ($cmdForm) $cmdForm.addEventListener("submit", e => {
      e.preventDefault();
      const text = $cmdForm.querySelector("input").value;
      if (!text.trim()) return;
      if (!runCommand(/^\s*special:/i.test(text) ? text : "Special:" + text)) {
        const msg = $content.querySelector(".command-msg");
        msg.hidden = false;
        msg.textContent = "No such command. Here are the ones that exist.";
        const box = $content.querySelector(".command-all");
        if (box && box.hidden && $cmdToggle) $cmdToggle.click();
      }
    });
    $content.querySelector(".settings-page").addEventListener("click", e => {
      const btn = e.target.closest("[data-set]");
      if (!btn) return;
      const key = btn.dataset.set, val = btn.dataset.val;
      if (key === "theme") { applyTheme(val); }
      else {
        const next = key === "tags" ? (val === "on") : val;
        if (state[key] === next) return;
        state[key] = next;
        applyLayout();
        saveSettings();
      }
      renderSettingsPage();
    });
    // Pointing at a setting dims the preview screens it does not change.
    const $page = $content.querySelector(".settings-page"), $pv = $content.querySelector(".set-preview");
    $page.addEventListener("mouseover", e => {
      const row = e.target.closest(".set-row");
      if (row && row.dataset.pv) $pv.dataset.focus = row.dataset.pv; else delete $pv.dataset.focus;
    });
    $page.addEventListener("mouseleave", () => { delete $pv.dataset.focus; });
  }

  // ---------- Export and import progress (Settings -> Your progress) ----------
  // Everything this browser keeps for the app, in one versioned JSON file. Version 1 holds each
  // localStorage key's value as parsed JSON (a plain string where the key holds one). An import
  // merges study lists, so a list built on this device is never lost to an older file, and
  // replaces the rest; then the page reloads to read it back.
  const PROGRESS_FORMAT = "competition-math-reference/progress", PROGRESS_VERSION = 1;
  const PROGRESS_KEYS = ["mq-settings", "mq-lists", "mq-recent", "mq-last", "theme", "mq-flashcards", "mq-flashcards-prefs", "mq-quiz-misses"];
  function exportProgress() {
    const data = {};
    PROGRESS_KEYS.forEach(k => {
      let raw = null;
      try { raw = localStorage.getItem(k); } catch (e) {}
      if (raw == null) return;
      try { data[k] = JSON.parse(raw); } catch (e) { data[k] = raw; }
    });
    const out = { format: PROGRESS_FORMAT, version: PROGRESS_VERSION, exported: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "compmath-progress-" + out.exported.slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  // Returns a message for the reader; throws on a file that is not a progress file.
  function importProgress(text) {
    const obj = JSON.parse(text);
    if (!obj || obj.format !== PROGRESS_FORMAT || typeof obj.data !== "object") throw new Error("This is not a progress file exported from this app.");
    if (!(obj.version >= 1 && obj.version <= PROGRESS_VERSION)) throw new Error("This file was made by a newer version of the app (format " + obj.version + ").");
    const d = obj.data;
    PROGRESS_KEYS.forEach(k => {
      if (!(k in d) || k === "mq-lists") return;
      localStorage.setItem(k, typeof d[k] === "string" ? d[k] : JSON.stringify(d[k]));
    });
    const inc = d["mq-lists"];
    if (inc && Array.isArray(inc.items)) {
      inc.items.forEach(l => {
        if (!l || typeof l.id !== "string" || !Array.isArray(l.ids)) return;
        const mine = getList(l.id);
        if (mine) l.ids.forEach(id => { if (mine.ids.indexOf(id) === -1) mine.ids.push(id); });
        else lists.items.push({ id: l.id, name: String(l.name || "Imported list"), ids: l.ids.filter(x => typeof x === "string") });
      });
      if (!saveLists()) throw new Error("This browser is blocking storage, so nothing could be saved.");
    }
    return "Imported progress from " + (obj.exported ? obj.exported.slice(0, 10) : "the file") + ". Reloading\u2026";
  }
  function wireProgressPanel() {
    const ex = $content.querySelector(".progress-export"), im = $content.querySelector(".progress-import");
    const file = $content.querySelector(".progress-file"), msg = $content.querySelector(".progress-msg");
    if (!ex || !im) return;
    const say = t => { msg.hidden = false; msg.textContent = t; };
    ex.addEventListener("click", () => { try { exportProgress(); say("Exported."); } catch (e) { say("Export failed: " + e.message); } });
    im.addEventListener("click", () => file.click());
    file.addEventListener("change", () => {
      const f = file.files && file.files[0];
      if (!f) return;
      if (!confirm("Import this file? Your lists keep their cards and gain the file's; your settings, theme, and flashcard progress are replaced.")) { file.value = ""; return; }
      f.text().then(t => {
        try { say(importProgress(t)); setTimeout(() => location.reload(), 800); }
        catch (e) { say(e instanceof SyntaxError ? "That file is not valid JSON." : e.message); }
        file.value = "";
      });
    });
  }

  // ---------- Settings preview ----------
  // Beside the settings, when the window is wide enough, three small screens drawn with the
  // real card and page markup, so every setting shows its effect as it is changed: cards while
  // browsing, a card's own page, and a subject page. Each is laid out at a laptop's content
  // width and scaled down to fit, so card size changes how many cards fit across exactly as
  // it does in the app.
  const PV_W = 1100, PV_H = 640, PV_MEDIA = "(min-width: 1280px)";
  // Chosen so every setting changes something: several formula rows (Formula lines), a sigma
  // in the first row (Notation), and figures (Figures on cards).
  const PV_CARDS = ["altitude-hypotenuse", "hockey-stick", "linear-recurrence", "power-of-a-point"];
  const PV_PAGE = "hockey-stick", PV_SUBJECT = "number-theory", PV_PROBLEM = "2025 AMC 10A, Problem 9";
  let pvResize = null;
  // A screen may be laid out wider than the others (the subject page carries the sidebar too),
  // keeping the same proportions, so all three frames are the same size.
  function pvScreen(key, label, inner, w) {
    return `<figure class="pv-screen" data-pv="${key}"><div class="pv-frame"><div class="pv-inner"${w ? ` data-w="${w}"` : ""}>${inner}</div></div><figcaption class="pv-label">${label}</figcaption></figure>`;
  }
  function pvBrowseHtml() {
    const cards = PV_CARDS.map(id => BY_ID[id]).filter(Boolean);
    return `<div class="cards">${cards.map(e => cardHtml(e, true, null)).join("")}</div>`;
  }
  function pvPageHtml() {
    const entry = BY_ID[PV_PAGE];
    if (!entry) return "";
    const f = entry.formula, split = splitKeyForms(notate((window.MATH_DETAILS || {})[f.id]));
    const rest = pullSection(split.rest, "Contest profile").rest;
    const page = `<div class="detail">
        <p class="detail-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</p>
        <div class="detail-head"><h2 class="card-name">${f.name}</h2><div class="card-meta detail-meta">${kindBadgeHtml(f)}${impBadgeHtml(f)}</div></div>
        ${f.latex ? `<div class="formula-display detail-formula" data-latex="${escapeAttr(latexFor(f))}"></div>` : ""}
        <p class="card-desc detail-summary">${f.description}</p>
        ${split.formsHtml("Key forms")}
        ${rest && rest.trim() ? `<div class="detail-body">${detailBodyHtml(rest, f.id)}</div>` : ""}
      </div>
      ${state.tags ? `<div class="pv-foot detail"><div class="detail-body"><h4>Tags</h4></div>${tagRowHtml(f, null, [])}</div>` : ""}`;
    return state.tools === "on" ? `<div class="detail-with-tools"><div>${page}</div>${pageToolsHtml(entry)}</div>` : page;
  }
  // A problem page's "How this problem works" box, as the Practice setting shows it.
  function pvProblemHtml() {
    const p = PROBLEM_DB.find(x => x.ref === PV_PROBLEM);
    if (!p) return "";
    const chain = { pattern: [], method: [], formula: [] };
    p.formulas.forEach(fid => BY_ID[fid] && chain[kindOf(BY_ID[fid].formula)].push(fid));
    const chip = fid => `<a class="related-item">${BY_ID[fid].formula.name}</a>`;
    const col = (label, ids, empty) => `<div class="chain-col"><div class="chain-label">${label}</div><div class="chain-cards">${ids.length ? ids.map(chip).join("") : `<span class="chain-empty">${empty}</span>`}</div></div>`;
    return `<div class="detail"><div class="book-eyebrow prob-eyebrow">Practice</div>
        <div class="detail-head"><h2 class="card-name">${refShort(p.ref)}</h2></div>
        <p class="prob-statement">Let $f(x) = 100x^3 - 300x^2 + 200x$. For how many real numbers $a$ does the graph of $y = f(x - a)$ pass through the point $(1, 25)$?</p>
        ${chainBoxHtml(p, col, chain, new Set())}</div>`;
  }
  // The subject page beside its sidebar, drawn with the sidebar's own markup, so density shows
  // in the navigation as well as in the page.
  function pvSidebarHtml(active) {
    const rows = SECTIONS.filter(sc => bookOf(sc) === "formulas").map(sc => `
      <div class="nav-section${sc.id === active ? " open" : ""}">
        <button class="nav-section-btn${sc.id === active ? " active" : ""}"><span>${sc.title}</span><span class="nav-count">${sectionCount(sc)}</span></button>
        <div class="nav-subs"><div class="nav-subs-inner">${sc.subsections.map((sub, i) => `<a class="nav-sub-link${sc.id === active && i === 0 ? " active" : ""}">${sub.title}</a>`).join("")}</div></div>
      </div>`).join("");
    return `<div class="sidebar pv-side"><div class="nav-group open" data-group="formulas">
        <div class="nav-space-head"><span class="nsh-label">${SPACES.formulas.label}</span><span class="nsh-info">i</span><span class="nsh-ask">${SPACES.formulas.ask}</span></div>
        <div class="nav-group-body"><div class="nav-group-inner">${rows}</div></div>
      </div></div>`;
  }
  function pvSubjectHtml() {
    return `<div class="pv-shell">${pvSidebarHtml(PV_SUBJECT)}<div class="pv-main">${pvSubjectBody()}</div></div>`;
  }
  function pvSubjectBody() {
    const section = SECTIONS.find(sc => sc.id === PV_SUBJECT);
    if (!section) return "";
    const head = `<div class="section-header"><h2>${section.title}</h2><p>${section.blurb || ""}</p></div>`;
    if (state.layout === "wiki") {
      const names = [];
      section.subsections.forEach(sub => sub.formulas.forEach(f => names.push(f)));
      names.sort((a, b) => a.name.localeCompare(b.name));
      const buckets = new Map();
      names.slice(0, 40).forEach(f => { const k = alphaKey(f.name); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(f); });
      return head + [...buckets].map(([k, fs]) => `<section class="wiki-letter"><h3>${k}</h3><ul class="wiki-list">${fs.map(f => `<li><a>${f.name}</a></li>`).join("")}</ul></section>`).join("");
    }
    return head + subjectGroups(section, null).slice(0, 2).map(g => `
      <section class="subsection grp"><h3 class="grp-title">${g.title}<span class="grp-n">${g.entries.length}</span></h3>
        ${g.blurb ? `<p class="grp-blurb">${g.blurb}</p>` : ""}
        <div class="cards">${g.entries.slice(0, 4).map(e => cardHtml(e, false, null)).join("")}</div></section>`).join("");
  }
  function fillSettingsPreview() {
    const aside = $content.querySelector(".set-preview");
    if (!aside || !window.matchMedia(PV_MEDIA).matches) return;
    aside.innerHTML = `<div class="pv-title">Preview</div>` +
      pvScreen("browse", "Cards while browsing", pvBrowseHtml()) +
      pvScreen("page", "A card&rsquo;s page", pvPageHtml()) +
      pvScreen("subject", "A subject page", pvSubjectHtml(), PV_W + 260) +
      pvScreen("problem", "A problem page", pvProblemHtml());
    renderMath(aside);
    // Lay the panel out from what is left of the window right of the settings: the screens are
    // as large as three of them fit in the panel's height (and the space allows), and the
    // dividing line sits midway between the settings and the screens, which sit midway between
    // the line and the window's edge. The panel starts below the top bar.
    const scale = () => {
      if (!aside.isConnected) return;
      const bar = document.querySelector(".topbar"), page = $content.querySelector(".settings-page");
      aside.style.setProperty("--pv-top", (bar ? bar.getBoundingClientRect().bottom : 0) + "px");
      const frames = [...aside.querySelectorAll(".pv-frame")];
      const cs = getComputedStyle(aside);
      const nScreens = frames.length;
      let fixed = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.rowGap || 0) * nScreens;
      fixed += aside.querySelector(".pv-title").offsetHeight;
      aside.querySelectorAll(".pv-label").forEach(l => { fixed += l.offsetHeight + 5; });
      const right = page ? page.getBoundingClientRect().right : 0;
      const region = document.documentElement.clientWidth - right;
      let w = Math.min(560, (aside.clientHeight - fixed) / nScreens * PV_W / PV_H, region - 48);
      w = Math.max(120, w);
      const gap = Math.max(16, (region - w) / 3);
      aside.style.setProperty("--pv-left", (right + gap) + "px");
      aside.style.paddingLeft = aside.style.paddingRight = gap + "px";
      frames.forEach(fr => {
        const inner = fr.firstElementChild, iw = +inner.dataset.w || PV_W;
        fr.style.width = w + "px";
        fr.style.height = (w * PV_H / PV_W) + "px";
        inner.style.width = iw + "px";
        inner.style.height = (iw * PV_H / PV_W) + "px";
        inner.style.transform = `scale(${w / iw})`;
      });
    };
    scale();
    fitBatch([...aside.querySelectorAll(".card .formula-display[data-latex]")]);
    if (pvResize) window.removeEventListener("resize", pvResize);
    pvResize = scale;
    window.addEventListener("resize", pvResize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scale);
  }
  // Widening the window past the breakpoint fills the preview in.
  window.matchMedia(PV_MEDIA).addEventListener("change", e => {
    if (e.matches && getRoute().type === "settings") fillSettingsPreview();
  });

  // ---------- Wiki layout ----------
  // The bucket a formula name sorts into. Names are display strings, so a few carry LaTeX or
  // start with a digit: "$a^3 + b^3 + c^3 - 3abc$" belongs under A once the markup is stripped,
  // while "15-75-90 Triangle Ratio" and "3D Tangency via Cross-Sections" have no letter to
  // offer and collect under "#".
  function alphaKey(name) {
    const bare = String(name).replace(/[$\\{}]/g, "").replace(/^[^A-Za-z0-9]+/, "");
    const c = bare.charAt(0).toUpperCase();
    return /[A-Z]/.test(c) ? c : "#";
  }

  function renderSectionWiki(section) {
    shownIds = [];
    const buckets = new Map();
    const only = bySubject(section) ? state.activeSub : null;
    section.subsections.forEach((sub, i) => {
      if (only != null && i !== only) return;
      sortEntries(sub.formulas.filter(passesFilter).map(f => BY_ID[f.id])).forEach(e => {
        shownIds.push(e.formula.id);
        const k = alphaKey(e.formula.name);
        if (!buckets.has(k)) buckets.set(k, []);
        buckets.get(k).push(e);
      });
    });
    const parts = [sectionHeaderHtml(section, only)];
    if (!shownIds.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No ${pageTitle(section, only)} cards match the current filters.</div>`);
      $content.innerHTML = parts.join("");
      renderMath($content);
      return;
    }
    // "#" first, then A-Z. Within a letter, by name, so the index reads as an index. A row of
    // letters at the top jumps to each heading, as on Special:AllPages.
    const keys = [...buckets.keys()].sort((a, b) =>
      a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b));
    const anchorOf = k => `alpha-${section.id}-${k === "#" ? "num" : k}`;
    parts.push(`<nav class="letter-jump wiki-jump" aria-label="Jump to a letter">${keys.map(k => `<button type="button" data-jump="${anchorOf(k)}">${k}</button>`).join("")}</nav>`);
    keys.forEach(k => {
      const rows = buckets.get(k)
        .slice()
        .sort((a, b) => a.formula.name.localeCompare(b.formula.name))
        .map(e => `<li><a href="#/f/${e.formula.id}">${e.formula.name}</a></li>`).join("");
      parts.push(`
        <section class="wiki-letter" id="alpha-${section.id}-${k === "#" ? "num" : k}">
          <h3>${k}</h3>
          <ul class="wiki-list">${rows}</ul>
        </section>`);
    });
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // ---------- Home page and space pages ----------
  // Shared pieces. The daily picks change once a day and are the same for every reader: the
  // day number is hashed so neighbouring days land far apart in the lists.
  const dayNumber = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); };
  const dayPick = (arr, salt) => arr.length ? arr[Math.abs(Math.imul(dayNumber() + salt, 2654435761)) % arr.length] : null;
  function dailyProblem() { return dayPick(PROBLEM_DB.filter(p => p.strategy && p.formulas.length >= 1), 7); }
  function dailyCard() {
    const pool = ALL.filter(e => (tierKey(e.formula) === "amc" || tierKey(e.formula) === "aime-early") && (window.MATH_EXAMPLES || {})[e.formula.id])
      .sort((a, b) => a.formula.id.localeCompare(b.formula.id));
    return dayPick(pool, 3);
  }
  // Problem of the day: try it first; the ideas it uses stay folded until asked for.
  function dailyProblemHtml() {
    const p = dailyProblem();
    if (!p) return "";
    // The whole panel opens the problem's page; only the link out to the statement differs.
    return `<div class="hp-panel hp-daily hp-click" data-open="#/problem/${p.slug}" role="link" tabindex="0" aria-label="Open ${escapeAttr(refShort(p.ref))}">
        <div class="hp-label">Problem of the day</div>
        <div class="daily-title">${refShort(p.ref)}</div>
        <div class="daily-types">${p.types.slice(0, 4).map(t => `<span class="daily-type">${escapeAttr(t.label)}</span>`).join("")}</div>
        <p class="daily-note">Try it first, then open it for the ideas it uses and the strategy.</p>
        ${p.url ? `<div class="daily-actions"><a class="hp-btn" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">Read it on ${p.urlLabel === "archive" ? "the archive" : "AoPS"} &#8599;</a></div>` : ""}
      </div>`;
  }
  function recentRowsHtml(limit, kinds) {
    const rows = readRecent().map(k => {
      const id = k.slice(2);
      if (k[0] === "f" && BY_ID[id]) {
        if (kinds && kinds.indexOf(BY_ID[id].kind) === -1) return "";
        const e = BY_ID[id];
        return `<a class="rc-row" href="#/f/${id}">${kindBadgeHtml(e.formula)}<span class="rc-name">${e.formula.name}</span><span class="rc-meta">${bySubject(e.section) ? pageTitle(e.section, e.section.subsections.indexOf(e.subsection)) : e.section.title}</span></a>`;
      }
      if (k[0] === "p" && PROBLEM_BY_SLUG[id]) {
        if (kinds && kinds.indexOf("problem") === -1) return "";
        const p = PROBLEM_BY_SLUG[id];
        return `<a class="rc-row" href="#/problem/${id}"><span class="badge badge-problem">PROBLEM</span><span class="rc-name">${refShort(p.ref)}</span><span class="rc-meta">${p.formulas[0] && BY_ID[p.formulas[0]] ? BY_ID[p.formulas[0]].formula.name : ""}</span></a>`;
      }
      return "";
    }).filter(Boolean).slice(0, limit);
    return rows.join("");
  }
  const LOGO_HTML = `<span class="brand-sigma" aria-hidden="true">&Sigma;</span>`;

  // ---------- Front-page panels ----------
  // Did you know: a striking fact from the curiosity lists, the first Useful observation of one
  // of their cards (or its opening sentence), chosen by the day and cycled by "Another".
  function didYouKnowPool() {
    const ids = [];
    (window.MATH_BUILTIN_LISTS || []).filter(l => l.kind === "curiosity").forEach(l => l.sections.forEach(sec => sec.ids.forEach(id => { if (BY_ID[id] && ids.indexOf(id) < 0) ids.push(id); })));
    return ids;
  }
  function didYouKnowFact(id) {
    const body = (window.MATH_DETAILS || {})[id] || "";
    const m = body.match(/## Useful observations\n+- ([^\n]+)/);
    const raw = m ? m[1].replace(/ — .*$/, "") : leadSentences(BY_ID[id].formula.description, 240);
    return raw;
  }
  function didYouKnowHtml(offset) {
    const pool = didYouKnowPool();
    if (!pool.length) return "";
    const day = Math.floor(Date.now() / 864e5);
    const id = pool[((day + offset) % pool.length + pool.length) % pool.length];
    const f = BY_ID[id].formula;
    return `<section class="hp-panel dyk" data-offset="${offset}">
        <div class="hp-label">Did you know?</div>
        <p class="dyk-fact">${linkifyCards(didYouKnowFact(id))}</p>
        <div class="dyk-foot"><a href="#/f/${id}">From ${f.name} &rarr;</a><button type="button" class="hp-link dyk-next">Another</button></div>
      </section>`;
  }
  // Newest cards: the latest batch recorded for Special:NewCards.
  function newestCardsHtml() {
    // The six most recent cards, newest batch first, across batches.
    const ids = [];
    (window.NEW_CARD_BATCHES || []).slice().reverse().forEach(b => b.ids.slice().reverse().forEach(id => { if (BY_ID[id] && ids.length < 6) ids.push(id); }));
    if (!ids.length) return "";
    const rows = ids.map(id => {
      const e = BY_ID[id];
      return `<a class="rc-row" href="#/f/${id}">${kindBadgeHtml(e.formula)}<span class="rc-name">${e.formula.name}</span><span class="rc-meta">${bySubject(e.section) ? pageTitle(e.section, e.section.subsections.indexOf(e.subsection)) : e.section.title}</span></a>`;
    }).join("");
    return `<section class="hp-panel">
        <div class="hp-label">Newest cards</div>
        <div class="rc-list">${rows}</div>
        <a class="hp-link" href="${specialHref("NewCards", "All")}">Every new card, newest first &rarr;</a>
      </section>`;
  }
  // Practice at a glance: the main contests, how many problems each has and how many are
  // written up, with a way into the latest year.
  function practiceGlanceHtml() {
    const main = FAMILIES.filter(f => /^(AMC 8|AJHSME|AMC 10|AMC 12|AIME)$/.test(f));
    const rows = main.map(f => {
      const years = Object.keys(DB_TREE[f]).sort();
      const all = years.reduce((n, y) => n + DB_TREE[f][y].length, 0);
      const done = PROBLEM_DB.filter(p => p.fam === f && (p.strategy || p.formulas.length)).length;
      const latest = years[years.length - 1];
      return `<a class="pg-row" href="#/problems/${famSlug(f)}/${latest}"><span class="pg-fam">${f}</span><span class="pg-n">${all.toLocaleString()} problems, ${years[0]}&ndash;${latest}</span><span class="pg-done">${done.toLocaleString()} written up</span></a>`;
    }).join("");
    return `<section class="hp-panel">
        <div class="hp-label">Practice at a glance</div>
        <div class="pg-list">${rows}</div>
        <div class="hp-mine-foot"><a href="#/special/randomproblem">A random problem</a><a href="#/practice">Every contest and year</a></div>
      </section>`;
  }

  // The front page: what the app is, why it helps and how to use it, beside what helps today
  // (where you left off, the problem and card of the day, your library). The four spaces and
  // the search sit above both, so nothing needs a scroll to reach.
  function renderLanding() {
    shownIds = [];
    const count = kind => ALL.filter(e => e.kind === kind).length;
    const recent = recentRowsHtml(6);
    const card = dailyCard();
    const starIds = liveIds(getList("starred"));
    const mine = lists.items.filter(l => l.id !== "starred");
    const nProblems = PROBLEM_DB.filter(p => p.strategy || p.formulas.length).length.toLocaleString();   // problems with their solution written
    // Each space says in one line what it holds; the sidebar already lists every subject, so the
    // front page does not repeat the four spaces a third time.
    const SPACE_WHAT = {
      formulas: "Theorems and identities, each with why it holds, when it applies, and a worked example.",
      methods: "Moves that make progress, with when to reach for them and how to carry them out.",
      patterns: "Problem shapes worth recognizing on sight, and what to try when you see one.",
      practice: "Real AMC and AIME problems, linked to the patterns, methods, and formulas they use."
    };
    const tile = (sp, n) => `<a class="hs-tile" data-tint="${sp}" href="#/${sp}"><b>${SPACES[sp].label}</b><span class="hs-ask">${SPACES[sp].ask}</span><span class="hs-what">${SPACE_WHAT[sp]}</span><span class="hs-n">${n}</span></a>`;
    $content.innerHTML = `
      <div class="hub">
        <header class="hub-head">
          <a class="hub-gear" href="#/settings" title="Settings" aria-label="Settings">&#9881;</a>
          <div class="hub-brand">${LOGO_HTML}<div><div class="hub-name">Competition Math Reference</div>
            <div class="hub-sub">Formulas, methods, patterns, and real contest problems for AMC 10/12, AIME, and olympiad, all linked to each other.</div></div></div>
          <form class="home-search" role="search">
            <input id="home-search" type="search" placeholder="Search formulas, methods, patterns, and problems" autocomplete="off" aria-label="Search the reference">
            <button type="submit">Search</button>
          </form>
        </header>
        <nav class="hub-spaces" aria-label="Spaces">
          ${tile("formulas", `${count("formula")} formulas`)}${tile("methods", `${count("method")} methods`)}${tile("patterns", `${count("pattern")} patterns`)}${tile("practice", `${nProblems} problems written`)}
        </nav>
        <div class="hub-main">
          <div class="hub-col">
            ${didYouKnowHtml(0)}
            ${newestCardsHtml()}
            ${practiceGlanceHtml()}
          </div>
          <aside class="hub-side">
            <section class="hp-panel">
              <div class="hp-label">Continue where you left off</div>
              ${recent ? `<div class="rc-list">${recent}</div>`
                : `<p class="hp-empty">Cards and problems you open will appear here, so you can pick up where you left off.</p>`}
            </section>
            ${dailyProblemHtml()}
            ${card ? `<section class="hp-panel hp-click" data-open="#/f/${card.formula.id}" role="link" tabindex="0" aria-label="Open ${escapeAttr(card.formula.name.replace(/\$/g, ""))}">
              <div class="hp-label">Card of the day</div>
              <div class="rc-row">${kindBadgeHtml(card.formula)}<span class="rc-name">${card.formula.name}</span><span class="rc-meta">${card.section.title}</span></div>
            </section>` : ""}
            <section class="hp-panel">
              <div class="hp-label">Your library</div>
              ${starIds.length
                ? `<div class="rc-list">${starIds.slice(0, 4).map(id => `<a class="rc-row" href="#/f/${id}"><span class="rc-star">&#9733;</span><span class="rc-name">${BY_ID[id].formula.name}</span></a>`).join("")}</div>
                   <a class="hp-link" href="#/list/starred">All ${starIds.length} starred &rarr;</a>`
                : `<p class="hp-empty">Star any card with &#9734; to keep it here.</p>`}
              <div class="hp-mine-foot">
                <a href="#/practice" data-goto="lists-new-name">Make a list</a>
                <a href="#/practice" data-goto="pr-lists">Open a list</a>
              </div>
            </section>
          </aside>
        </div>
        <footer class="hub-foot"></footer>
      </div>`;
    renderMath($content);
    // The hero search waits for Search (or Enter), then hands off to the real search box: the
    // results page shows the header search again with the text in it, so typing continues
    // there.
    // "Another" swaps in the next fact without re-rendering the page.
    $content.addEventListener("click", e => {
      const btn = e.target.closest(".dyk-next");
      if (!btn) return;
      const panel = btn.closest(".dyk");
      const tmp = document.createElement("div");
      tmp.innerHTML = didYouKnowHtml(+panel.dataset.offset + 1);
      const next = tmp.firstElementChild;
      panel.replaceWith(next);
      renderMath(next);
    });
    const box = document.getElementById("home-search");
    const handOff = v => {
      $search.value = v;
      $search.dispatchEvent(new Event("input", { bubbles: true }));
      $search.focus({ preventScroll: true });
      try { $search.setSelectionRange(v.length, v.length); } catch (e) {}
    };
    // A command typed here just runs (there is no header search or suggestion list on this page).
    $content.querySelector(".home-search").addEventListener("submit", e => {
      e.preventDefault();
      const v = box.value.trim();
      if (!v) return;
      if (/^special:/i.test(v) && runCommand(v)) return;
      handOff(box.value);
    });
  }

  // ---------- Space main pages: #/formulas, #/methods, #/patterns, #/practice ----------
  // Each says in two sentences how its kind fits the app, then gives a way into everything in
  // it: every subject and group (and, for Methods and Patterns, every card by name).
  // Formulas list their topics rather than four hundred card names.
  const SPACE_INTROS = {
    formulas: `Formulas are the facts: theorems, identities, and standard results, each with why it holds and worked examples. <a href="#/methods">Methods</a> rely on them, and every card lists the <a href="#/practice">contest problems</a> where it appears.`,
    methods: `Methods are the moves you make once you are inside a problem. Each one names the <a href="#/formulas">formulas</a> it relies on, and <a href="#/patterns">patterns</a> tell you when it is worth trying.`,
    patterns: `Patterns are the problem shapes worth recognizing before you start. Each one points to the <a href="#/methods">methods</a> worth trying, and those lead to the <a href="#/formulas">formulas</a> they use.`,
    practice: `Real contest problems, each linked to the patterns, methods, and formulas it uses, with a strategy you can reveal. Study lists gather cards by contest level or by theme.`
  };
  const KINDS_OF_SPACE = { formulas: ["formula"], methods: ["method"], patterns: ["pattern"], practice: ["problem"] };
  function spaceHeadHtml(name) {
    const recent = recentRowsHtml(6, KINDS_OF_SPACE[name]);
    return `<header class="space-home-head">
        <h2>${SPACES[name].label}</h2>
        <p class="sh-ask">${SPACES[name].ask}</p>
        <p class="sh-intro">${SPACE_INTROS[name]}</p>
      </header>
      ${recent ? `<div class="sh-recent"><span class="hp-label">Recently opened</span><div class="rc-chips">${recent}</div></div>` : ""}`;
  }
  // The random-problem picker: choose a contest (or any), and optionally how hard, by where a
  // problem sits in its paper (the first third is easy, the last third hard).
  const DIFFS = ["", "easy", "medium", "hard"];
  function wireRandomPicker(root) {
    const box = root.querySelector(".rand-picker");
    if (!box) return;
    const go = box.querySelector(".rand-go"), range = box.querySelector("#rand-diff-range");
    let fam = "";
    const update = () => {
      const d = DIFFS[+range.value];
      box.querySelector(".rand-diff-val").textContent = d ? d.charAt(0).toUpperCase() + d.slice(1) : "Any";
      go.href = "#/special/randomproblem" + (fam ? "/" + encodeURIComponent(fam) : "") + (d ? "/" + d : "");
    };
    box.querySelectorAll("[data-rand-fam]").forEach(b => b.addEventListener("click", () => {
      fam = b.dataset.randFam;
      box.querySelectorAll("[data-rand-fam]").forEach(x => x.setAttribute("aria-checked", x === b ? "true" : "false"));
      update();
    }));
    range.addEventListener("input", update);
  }
  function renderSpaceHome(name) {
    shownIds = [];
    let body = spaceHeadHtml(name);
    {
      const fams = FAMILIES.slice();
      const routes = BUILTIN_LISTS.filter(l => l.kind === "route");
      const tiers = ["AMC", "AIME", "Olympiad"];
      const subjects = ["Geometry", "Algebra", "Number Theory", "Counting & Probability"];
      const route = (t, sbj) => routes.find(l => l.tier === t && l.subject === sbj);
      const starred = getList("starred");
      const mine = lists.items.filter(l => l.id !== "starred");
      const yearsOf = f => Object.keys(DB_TREE[f]).map(Number).sort((x, y) => y - x);
      const listLink = l => `<a class="pl-item" href="#/list/${l.id}"><span>${escapeAttr(l.name)}</span><span class="pl-n">${liveCount(l)}</span></a>`;
      body += `
        <div class="pr-top">
          <section class="hp-panel rand-picker">
            <div class="hp-label">A random problem</div>
            <div class="rand-btns" role="radiogroup" aria-label="Contest">
              <button type="button" role="radio" aria-checked="true" data-rand-fam="">Any contest</button>
              ${fams.map(f => `<button type="button" role="radio" aria-checked="false" data-rand-fam="${escapeAttr(f)}">${escapeAttr(f)}</button>`).join("")}
            </div>
            <div class="rand-diff">
              <label for="rand-diff-range">Difficulty</label>
              <input type="range" id="rand-diff-range" min="0" max="3" step="1" value="0">
              <span class="rand-diff-val">Any</span>
            </div>
            <a class="hp-btn rand-go" href="#/special/randomproblem">Open a random problem &rarr;</a>
          </section>
          <section class="hp-panel" id="pr-lists">
            <div class="hp-label">Your lists</div>
            <div class="pl-list">
              <a class="pl-item" href="#/list/starred"><span>&#9733; Starred</span><span class="pl-n">${liveCount(starred)}</span></a>
              ${mine.map(listLink).join("")}
            </div>
            <form class="lists-new pl-new" id="lists-new-form">
              <input type="text" id="lists-new-name" placeholder="Name a new list&hellip;" maxlength="40" autocomplete="off">
              <button type="submit">Create</button>
            </form>
          </section>
        </div>
        <section class="sh-section">
          <h3>Contests</h3>
          <div class="ct-list">${fams.map(f => `
            <div class="ct-row">
              <a class="ct-name" href="#/problems/${famSlug(f)}/${yearsOf(f)[0]}">${f}<span class="ct-n">${famWritten(f).toLocaleString()} problem${famWritten(f) === 1 ? "" : "s"} written</span></a>
              <div class="ct-years">${yearsOf(f).map(y => `<a href="#/problems/${famSlug(f)}/${y}">${y}</a>`).join("")}</div>
            </div>`).join("")}
            ${(() => {
              const planned = (window.MATH_PLANNED_CONTESTS || []).filter(c => !fams.includes(c.name));
              if (!planned.length) return "";
              // Contests still to come stay out of sight until asked for, so the list shows only what works.
              return `<div class="ct-planned-box" id="ct-planned-box"${showUnwritten ? "" : " hidden"}>${planned.map(c => `
            <div class="ct-row ct-planned" aria-disabled="true">
              <div class="ct-name">${escapeAttr(c.name)}<span class="ct-n">Coming soon</span></div>
              <div class="ct-note">${escapeAttr(c.host)}. ${escapeAttr(c.note)}</div>
            </div>`).join("")}</div>
            <button type="button" class="ct-toggle" id="ct-unwritten" aria-expanded="${showUnwritten}">${showUnwritten ? "Hide unwritten contests" : "Show unwritten contests (" + planned.length + ")"}</button>`;
            })()}
          </div>
        </section>
        <section class="sh-section">
          <h3>Study lists</h3>
          <div class="grid-scroll"><table class="cy-grid route-grid">
            <thead><tr><th></th>${subjects.map(x => `<th>${x}</th>`).join("")}</tr></thead>
            <tbody>${tiers.map(t => `<tr><th>${t === "AMC" ? "AMC 10/12" : t}</th>${subjects.map(x => {
              const l = route(t, x);
              return `<td>${l ? `<a href="#/list/${l.id}">${liveCount(l)} cards</a>` : `<span class="cy-none">&middot;</span>`}</td>`;
            }).join("")}</tr>`).join("")}</tbody>
          </table></div>
          <p class="route-note">Each route builds on the one above it: the AIME route lists only what is new beyond the AMC 10/12 route, and the Olympiad route only what is new beyond the AIME, with a few cards repeated where a level uses the same card in a broader way.</p>
          <div class="pl-kinds">${LIST_KINDS.filter(([k]) => k !== "route").map(([k, label]) => {
            const ls = BUILTIN_LISTS.filter(l => l.kind === k);
            return ls.length ? `<div class="pl-kind"><div class="pl-kind-title">${label}</div><div class="pl-list">${ls.map(listLink).join("")}</div></div>` : "";
          }).join("")}</div>
        </section>`;
    }
    $content.innerHTML = `<div class="space-home">${body}</div>`;
    wireRandomPicker($content);
    const unrel = $content.querySelector("#ct-unwritten");
    if (unrel) unrel.addEventListener("click", () => {
      showUnwritten = !showUnwritten;
      const box = $content.querySelector("#ct-planned-box");
      box.hidden = !showUnwritten;
      unrel.setAttribute("aria-expanded", String(showUnwritten));
      unrel.textContent = showUnwritten ? "Hide unwritten contests" : "Show unwritten contests (" + box.children.length + ")";
    });
    renderMath($content);
  }

  // Study lists that match a search, built-in and the reader's own, by name, level, subject,
  // blurb and section titles. Generic words ("formulas", "list", "study") are ignored, so
  // "mathcounts formulas" finds the MATHCOUNTS routes. A hit is strong when every remaining
  // word is in the list's name, level, subject or kind.
  function listMatches(q) {
    const stop = /^(the|of|and|a|an|in|on|to|for|formula|formulas|card|cards|list|lists|study|studies|route|routes|all)$/;
    const toks = wordsOf(q.toLowerCase()).filter(t => t.length >= 2 && !stop.test(t));
    if (!toks.length) return [];
    const kindLabel = Object.fromEntries(LIST_KINDS);
    const hits = [];
    BUILTIN_LISTS.concat(lists.items).forEach(l => {
      if (!liveCount(l)) return;
      const head = [l.name, l.tier || "", l.subject || "", kindLabel[l.kind] || ""].join(" ").toLowerCase().replace(/amc ?(10|12)/g, "amc$1 amc");
      const hay = head + " " + [l.blurb || "", (l.sections || []).map(x => x.title).join(" ")].join(" ").toLowerCase();
      const inHead = toks.filter(t => head.indexOf(t) !== -1).length;
      const inHay = toks.filter(t => hay.indexOf(t) !== -1).length;
      if (inHay < toks.length) return;
      hits.push({ list: l, strong: inHead === toks.length, score: inHead * 10 + inHay });
    });
    hits.sort((a, b) => b.score - a.score || (a.list._i || 0) - (b.list._i || 0));
    return hits;
  }

  // Problems that match a search. A problem is read through its reference (contest, year,
  // number), its strategy and hints, the names of its cards and its topics. Every query word
  // must match, or all but one when the query is three words or longer; matches in card names
  // and in the reference count most.
  // The searchable text of a problem, built once: its card names, its reference, and all of it.
  function problemText(p) {
    if (!p._names) {
      p._names = p.formulas.map(id => BY_ID[id].formula.name).join(" ").toLowerCase();
      p._refl = (p.ref + " " + p.fam + " " + p.year).toLowerCase();
      p._hay = [p._refl, p.strategy, p.types.map(t => t.label).join(" "), p._names].join(" ").toLowerCase();
    }
    return p._hay;
  }
  function problemMatches(q) {
    const toks = wordsOf(q.toLowerCase()).filter(t => t.length >= 2 && !/^(the|of|and|a|an|in|on|to|for)$/.test(t));
    if (!toks.length) return [];
    const need = toks.length >= 3 ? toks.length - 1 : toks.length;
    const hits = [];
    PROBLEM_DB.forEach(p => {
      problemText(p);
      let n = 0, w = 0;
      toks.forEach(t => {
        if (p._hay.indexOf(t) === -1) return;
        n++;
        w += (p._names.indexOf(t) !== -1 ? 3 : 0) + (p._refl.indexOf(t) !== -1 ? 3 : 0) + 1;
      });
      if (n >= need) hits.push({ p, score: n * 10 + w });
    });
    hits.sort((a, b) => b.score - a.score || b.p.year - a.p.year || a.p.ref.localeCompare(b.p.ref));
    return hits.map(h => h.p);
  }

  // A query that names a problem by its reference, in any order and spelling: "amc10 a2025
  // problem 1", "2025 AMC 10A #1", "aime ii 2019 p 15", "2024 aime 1 problem 3". Letters and
  // digits glued together are split first ("amc10" -> "amc 10", "a2025" -> "a 2025"), then the
  // contest, its version (A or B, I or II, Fall), the year and the problem number are read off.
  // Returns null unless at least two of contest, year and number are named, so an ordinary
  // query ("area of a triangle", "2 circles") is never read as a reference.
  function parseProblemQuery(q) {
    const t = String(q).toLowerCase()
      .replace(/([a-z])(\d)/g, "$1 $2").replace(/(\d)([a-z])/g, "$1 $2")
      .split(/[\s,#.:;()\/-]+/).filter(Boolean);
    const out = { fam: null, ver: null, year: null, num: null, fall: false, rest: [] };
    const NUMWORD = /^(problem|problems|prob|p|no|number|num|q|question)$/;
    for (let i = 0; i < t.length; i++) {
      const w = t[i], nx = t[i + 1];
      if (/^(19[5-9]\d|20\d\d)$/.test(w) && !out.year) { out.year = +w; continue; }
      if (w === "amc" && /^(8|10|12)$/.test(nx || "")) { out.fam = "AMC " + nx; i++; continue; }
      if (w === "aime") {
        out.fam = "AIME";
        // A version right after "aime": i / ii, or 1 / 2 when another number follows or it
        // is followed by a problem word ("aime 2 problem 5", "2024 aime 1 #3").
        if (nx === "i" || nx === "ii") { out.ver = nx.toUpperCase(); i++; }
        else if ((nx === "1" || nx === "2") && (t.slice(i + 2).some(x => /^\d{1,2}$/.test(x)) || NUMWORD.test(t[i + 2] || ""))) { out.ver = nx === "1" ? "I" : "II"; i++; }
        continue;
      }
      if (w === "hmmt") { out.fam = "HMMT"; continue; }
      if (w === "putnam") { out.fam = "Putnam"; continue; }
      if (w === "fall") { out.fall = true; continue; }
      if (NUMWORD.test(w) && /^\d{1,2}$/.test(nx || "")) { out.num = +nx; i++; continue; }
      if ((w === "a" || w === "b") && (out.fam || "").startsWith("AMC") === true && !out.ver) { out.ver = w.toUpperCase(); continue; }
      if ((w === "a" || w === "b") && !out.ver && t.some(x => x === "amc")) { out.ver = w.toUpperCase(); continue; }
      if (NUMWORD.test(w)) continue;
      if (/^\d{1,2}$/.test(w) && !out.num && +w >= 1 && +w <= 30) { out.num = +w; continue; }
      out.rest.push(w);
    }
    const named = [out.fam, out.year, out.num].filter(x => x != null).length;
    return named >= 2 ? out : null;
  }
  // The problems a parsed reference names, newest first; any leftover words ("2025 aime
  // geometry") then rank them by how many of those words each problem's text carries.
  function referencedProblems(q) {
    const r = parseProblemQuery(q);
    if (!r) return null;
    const hits = PROBLEM_DB.filter(p => {
      if (r.year && p.year !== r.year) return false;
      if (r.num && p.num !== r.num) return false;
      if (r.fam && !(p.fam === r.fam || (r.fam === "HMMT" && p.fam.startsWith("HMMT")))) return false;
      if (r.fall && !/^Fall\b/i.test(p.cname)) return false;
      if (r.ver) {
        const v = p.cname.match(/AMC\s*\d+\s*([AB])$/i) || p.cname.match(/AIME\s+(I{1,2})$/i);
        if (v && v[1].toUpperCase() !== r.ver) return false;
      }
      return true;
    });
    const rest = r.rest.filter(w => w.length >= 3 && !/^(the|and|for|amc|contest)$/.test(w));
    const score = p => rest.reduce((n, w) => n + (problemText(p).indexOf(w) !== -1 ? 1 : 0), 0);
    return hits.sort((a, b) => score(b) - score(a) || b.year - a.year || a.cname.localeCompare(b.cname) || a.num - b.num);
  }

  function renderSearchResults() {
    const { results, partial } = searchFormulas(state.query);
    const sorted = sortEntries(results);
    const queryTokens = wordsOf(spellOperators(state.query.toLowerCase()));
    const partialNote = partial
      ? ` <em>(no formula matched every keyword &mdash; showing closest matches)</em>`
      : "";
    shownIds = sorted.map(e => e.formula.id);
    // Everything is searched (formulas, methods, patterns, problems and study lists) and shown
    // as one list in order of relevance, each result labelled with its kind. The card search
    // ranks the cards; a study list that the query names outright leads; problems lead when
    // the query names a contest or a year, and otherwise follow the cards.
    // A query that names a problem by reference puts those problems first, ahead of anything
    // else; the word matches then follow in their usual place without repeating them.
    // When it names problems that exist, the loose word matches are left out: "2024 aime 1
    // problem 3" would otherwise pull in every problem whose text says "problem".
    let named = referencedProblems(state.query);
    if (named && !named.length) named = null;
    const probs = named || problemMatches(state.query);
    const listHits = listMatches(state.query);
    const refy = !!named || /\b(19|20)\d\d\b|\b(aime|amc|hmmt|putnam|mathcounts)\b/i.test(state.query);
    const items = [];
    if (named) named.forEach(p => items.push({ problem: p }));
    listHits.filter(h => h.strong).forEach(h => items.push({ list: h.list }));
    if (refy && !named) probs.forEach(p => items.push({ problem: p }));
    sorted.forEach(e => items.push({ entry: e }));
    if (!refy) probs.forEach(p => items.push({ problem: p }));
    listHits.filter(h => !h.strong).forEach(h => items.push({ list: h.list }));
    const n = { formula: 0, method: 0, pattern: 0 };
    sorted.forEach(e => n[e.kind]++);
    const counts = [[n.formula, "formula", "formulas"], [n.method, "method", "methods"], [n.pattern, "pattern", "patterns"],
      [probs.length, "problem", "problems"], [listHits.length, "study list", "study lists"]]
      .filter(c => c[0]).map(c => `${c[0]} ${c[0] === 1 ? c[1] : c[2]}`).join(" &middot; ");
    const total = items.length;
    const kindLabel = Object.fromEntries(LIST_KINDS);
    const PAGE = 24;
    const itemHtml = (it, i) => {
      const extra = i >= PAGE ? ` data-page="${Math.floor(i / PAGE)}" hidden` : "";
      if (it.entry) return cardHtml(it.entry, true, queryTokens).replace('<article class="card ', `<article${extra} class="card `);
      if (it.problem) {
        const p = it.problem;
        return `<a class="card card-result card-problem-result" href="#/problem/${p.slug}"${extra}>
            <div class="card-head"><h4 class="card-name">${refShort(p.ref)}</h4></div>
            <div class="card-meta"><span class="badge badge-problem">PROBLEM</span><span class="level-range">${escapeAttr(p.fam)} &middot; ${p.year}</span></div>
            <div class="rs-box">${[["pattern", "Pattern"], ["method", "Method"], ["formula", "Formulas"]].map(([k, label]) => {
              const ids = p.formulas.filter(id => BY_ID[id] && BY_ID[id].kind === k).slice(0, 3);
              return ids.length ? `<div class="rs-line"><span class="rs-k">${label}</span><span class="rs-v">${ids.map(id => BY_ID[id].formula.name).join(", ")}</span></div>` : "";
            }).join("")}</div>
            ${p.strategy ? `<p class="card-desc">${p.strategy}</p>` : ""}
          </a>`;
      }
      const l = it.list;
      return `<a class="card card-result card-list-result" href="#/list/${l.id}"${extra}>
          <div class="card-head"><h4 class="card-name">${escapeAttr(l.name)}</h4></div>
          <div class="card-meta"><span class="badge badge-list">LIST</span><span class="level-range">${l.builtinSet ? (kindLabel[l.kind] || "Study list") : "Your list"} &middot; ${liveCount(l)} cards</span></div>
          ${(l.sections || []).length ? `<div class="rs-box">${l.sections.slice(0, 4).map(x => `<div class="rs-line"><span class="rs-v">${escapeAttr(x.title || l.name)}</span><span class="rs-n">${x.ids.length}</span></div>`).join("")}${l.sections.length > 4 ? `<div class="rs-line rs-more-line">+ ${l.sections.length - 4} more section${l.sections.length > 5 ? "s" : ""}</div>` : ""}</div>`
            : `<div class="rs-box">${liveIds(l).slice(0, 4).map(id => `<div class="rs-line"><span class="rs-v">${BY_ID[id].formula.name}</span></div>`).join("")}</div>`}
          ${l.blurb ? `<p class="card-desc">${escapeAttr(l.blurb)}</p>` : ""}
        </a>`;
    };
    const parts = [];
    parts.push(`<p class="results-meta"><strong>${total}</strong> result${total === 1 ? "" : "s"} for &ldquo;<strong>${escapeAttr(state.query.trim())}</strong>&rdquo;${counts ? ` <span class="rm-kinds">${counts}</span>` : ""}${partialNote}</p>`);
    if (!total) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No matches. Try broader keywords, such as &ldquo;area&rdquo;, &ldquo;mod&rdquo;, &ldquo;roots&rdquo;, or a contest like &ldquo;2024 AIME&rdquo;.</div>`);
    } else {
      parts.push(`<div class="cards search-results">${items.map(itemHtml).join("")}</div>`);
      if (total > PAGE) parts.push(`<button type="button" class="show-more-btn rs-more">Show more results</button>`);
    }
    $content.innerHTML = parts.join("");
    let page = 0;
    const moreBtn = $content.querySelector(".rs-more");
    if (moreBtn) moreBtn.addEventListener("click", () => {
      page++;
      $content.querySelectorAll(`.search-results > [data-page="${page}"]`).forEach(el => { el.hidden = false; });
      if (!$content.querySelector(".search-results > [hidden]")) moreBtn.remove();
      fitCardFormulas($content);
    });
    renderMath($content);
  }

  // ---------- Advanced search: browse by tag ----------
  // A precise tag picker. Choose one or more tags and see every formula that carries
  // them, ranked by how many of the chosen tags each one matches. It complements the
  // main search bar (which handles free text) rather than duplicating it.

  // Does this card carry the tag label `L` (a raw keyword or a topic label)?
  function entryHasTag(entry, L) {
    return entry.tagPhrases.indexOf(L) !== -1 ||
      entry.topics.some(t => t.label === L) ||
      (entry.groupTags || []).indexOf(L) !== -1 ||
      entry.tagPhrases.some(p => p.indexOf(L) !== -1);
  }

  // Entries carrying at least one of the given tag labels, ranked by hit count
  // (cards matching more of the chosen tags come first), then importance, then name.
  function tagMatches(tags) {
    const scored = [];
    for (const entry of ALL) {
      let hits = 0;
      for (const L of tags) if (entryHasTag(entry, L)) hits++;
      if (hits) scored.push({ entry, hits });
    }
    scored.sort((a, b) => b.hits - a.hits ||
      labelRank(a.entry.formula) - labelRank(b.entry.formula) ||
      a.entry.formula.name.localeCompare(b.entry.formula.name));
    return scored;
  }

  function renderAdvancedResults() {
    const adv = state.adv || {};
    const tags = adv.tags ? [...adv.tags] : [];
    shownIds = [];
    const parts = [];
    parts.push(`<p class="results-meta adv-meta"><strong>Tagged</strong> ${tags.length ? escapeAttr(tags.join(", ")) : "&mdash;"} <span class="adv-actions"><button class="adv-link" id="adv-edit">Edit tags</button><button class="adv-link" id="adv-clear">Clear</button></span></p>`);
    if (!tags.length) {
      parts.push(`<div class="empty-state"><div class="big">&#9906;</div>Pick one or more tags to see every card that carries them.</div>`);
    } else {
      const scored = tagMatches(tags);
      shownIds = scored.map(x => x.entry.formula.id);
      if (!scored.length) {
        parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No cards carry ${tags.length === 1 ? "that tag" : "those tags"}.</div>`);
      } else {
        parts.push(`<p class="results-hint"><strong>${scored.length}</strong> card${scored.length === 1 ? "" : "s"}${tags.length > 1 ? " &mdash; the ones matching the most tags come first" : ""}.</p>`);
        parts.push(`<div class="cards">${scored.map(x => cardHtml(x.entry, true, null)).join("")}</div>`);
      }
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
    const eb = document.getElementById("adv-edit"); if (eb) eb.addEventListener("click", openAdvanced);
    const cb = document.getElementById("adv-clear"); if (cb) cb.addEventListener("click", () => { state.adv = null; render(); window.scrollTo({ top: 0 }); });
  }

  // Tag universe for the advanced-search tag picker: every keyword and topic label
  // that appears on any card, weighted by the importance of the cards carrying it,
  // so the most consequential tags surface first.
  const TAG_W = { "amc": 5, "aime-early": 4, "aime-late": 3, "olympiad": 2 };
  let ALL_TAGS_CACHE = null;
  function allTags() {
    if (ALL_TAGS_CACHE) return ALL_TAGS_CACHE;
    const m = new Map();
    const add = (label, w, kind) => {
      const key = String(label).toLowerCase().trim();
      if (!key) return;
      const e = m.get(key) || { label: key, weight: 0, kind: kind };
      e.weight += w;
      if (kind === "topic") e.kind = "topic";
      m.set(key, e);
    };
    for (const entry of ALL) {
      const w = TAG_W[tierKey(entry.formula)] || 1;
      entry.formula.keywords.forEach(k => add(k, w, "tag"));
      entry.topics.forEach(t => add(t.label, w + 2, "topic"));
      // Curated groups sort above raw keywords, since building a list is what they are for.
      (entry.groupTags || []).forEach(g => add(g, w + 4, "group"));
    }
    ALL_TAGS_CACHE = [...m.values()];
    return ALL_TAGS_CACHE;
  }
  function suggestTags(q, selected, limit) {
    q = (q || "").toLowerCase().trim();
    const pool = allTags().filter(t => !selected.has(t.label));
    let cand;
    if (!q) {
      cand = pool.slice();
      cand.sort((a, b) => b.weight - a.weight || a.label.localeCompare(b.label));
    } else {
      cand = pool.filter(t => t.label.indexOf(q) !== -1);
      cand.sort((a, b) =>
        (a.label.startsWith(q) ? 0 : 1) - (b.label.startsWith(q) ? 0 : 1) ||
        b.weight - a.weight || a.label.localeCompare(b.label));
    }
    return cand.slice(0, limit || 12);
  }
  const advTagChipHtml = t => `<button class="adv-tag-chip${t.kind === "topic" ? " adv-tag-topic" : t.kind === "group" ? " adv-tag-group" : ""}" data-adv-tag="${escapeAttr(t.label)}">${escapeAttr(t.label)}</button>`;
  const advTagSelHtml = l => `<button class="filter-chip active adv-tag-sel" data-adv-tag-remove="${escapeAttr(l)}">${escapeAttr(l)} <span class="adv-tag-x">&times;</span></button>`;
  // How many cards carry at least one of the currently-drafted tags.
  function advTagCount() {
    const tags = [...advDraft.tags];
    if (!tags.length) return 0;
    let n = 0;
    for (const entry of ALL) { for (const L of tags) { if (entryHasTag(entry, L)) { n++; break; } } }
    return n;
  }
  // Re-render the picker: selected chips, the (scroll-isolated) tag grid, and the
  // apply button's live match count. No floating dropdown — the grid is the surface.
  function refreshAdvTags() {
    if (!advEl) return;
    const inp = advEl.querySelector("#adv-tag-search");
    const grid = advEl.querySelector("#adv-tag-grid");
    const sel = advEl.querySelector("#adv-tag-selected");
    const selWrap = advEl.querySelector("#adv-selected-wrap");
    const label = advEl.querySelector("#adv-grid-label");
    const q = inp ? inp.value.trim() : "";
    if (sel) sel.innerHTML = advDraft.tags.size ? [...advDraft.tags].map(advTagSelHtml).join("") : "";
    if (selWrap) selWrap.hidden = advDraft.tags.size === 0;
    if (label) label.textContent = q ? "Matching tags" : "Popular tags";
    if (grid) {
      const opts = suggestTags(q, advDraft.tags, 160);
      grid.innerHTML = opts.length ? opts.map(advTagChipHtml).join("") : `<div class="adv-tag-empty">No matching tags.</div>`;
    }
    const apply = advEl.querySelector("#adv-apply");
    if (apply) {
      const empty = advDraft.tags.size === 0;
      apply.disabled = empty;
      const n = advTagCount();
      apply.textContent = empty ? "Select tags" : `Show ${n} formula${n === 1 ? "" : "s"}`;
    }
  }

  // ---------- Advanced search modal ----------
  let advEl = null;
  let advDraft = null;
  function onAdvKey(e) { if (e.key === "Escape") closeAdvanced(); }
  function closeAdvanced() {
    if (!advEl) return;
    advEl.remove(); advEl = null;
    document.removeEventListener("keydown", onAdvKey, true);
  }
  function openAdvanced() {
    if (advEl) { closeAdvanced(); return; }
    const src = state.adv || {};
    advDraft = { tags: new Set(src.tags || []) };
    advEl = document.createElement("div");
    advEl.className = "modal-overlay";
    advEl.innerHTML = `
      <div class="modal adv-modal adv-tagmodal" role="dialog" aria-label="Browse formulas by tag">
        <div class="modal-head">
          <h3>Browse by Tag</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="adv-tagpick">
          <input class="adv-tag-search" id="adv-tag-search" type="search" placeholder="Search tags&hellip; (e.g. &ldquo;circle&rdquo;, &ldquo;modular&rdquo;, &ldquo;recursion&rdquo;)" aria-label="Search tags" autocomplete="off">
          <div class="adv-selected-wrap" id="adv-selected-wrap" hidden>
            <div class="adv-pick-label">Selected</div>
            <div class="adv-tag-selected" id="adv-tag-selected"></div>
          </div>
          <div class="adv-pick-label" id="adv-grid-label">Popular tags</div>
          <div class="adv-tag-grid" id="adv-tag-grid"></div>
        </div>
        <div class="settings-actions adv-modal-actions">
          <button class="settings-reset" id="adv-reset">Clear</button>
          <button class="adv-apply" id="adv-apply" disabled>Select tags</button>
        </div>
      </div>`;
    document.body.appendChild(advEl);
    advEl.addEventListener("click", onAdvClick);
    const tf = advEl.querySelector("#adv-tag-search");
    if (tf) {
      tf.addEventListener("input", refreshAdvTags);
      tf.addEventListener("keydown", e => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const first = suggestTags(tf.value, advDraft.tags, 1)[0];
        if (first) { advDraft.tags.add(first.label); tf.value = ""; refreshAdvTags(); }
      });
    }
    refreshAdvTags();
    if (tf) setTimeout(() => tf.focus(), 0);
    setTimeout(() => document.addEventListener("keydown", onAdvKey, true), 0);
  }
  function onAdvClick(e) {
    if (e.target === advEl || e.target.closest(".modal-close")) { closeAdvanced(); return; }
    const tagOpt = e.target.closest("[data-adv-tag]");
    if (tagOpt) { advDraft.tags.add(tagOpt.dataset.advTag); refreshAdvTags(); return; }
    const tagRem = e.target.closest("[data-adv-tag-remove]");
    if (tagRem) { advDraft.tags.delete(tagRem.dataset.advTagRemove); refreshAdvTags(); return; }
    if (e.target.closest("#adv-reset")) {
      advDraft.tags.clear();
      const ts = advEl.querySelector("#adv-tag-search"); if (ts) ts.value = "";
      refreshAdvTags();
      return;
    }
    if (e.target.closest("#adv-apply")) {
      if (!advDraft.tags.size) return;
      state.adv = { tags: advDraft.tags };
      state.query = ""; $search.value = "";
      stripHash();
      closeAdvanced();
      render();
      window.scrollTo({ top: 0 });
    }
  }


  // ---------- Topic view: every formula tagged with a topic, across sections ----------
  function renderTopic(topicId) {
    const topic = TOPICS_BY_ID[topicId];
    const entries = browseOrder(entriesForTopic(topicId).filter(e => passesFilter(e.formula)));
    shownIds = entries.map(e => e.formula.id);
    const parts = [`
      <div class="back-row"><a class="back-link" href="#" data-history-back>&larr; Back</a></div>
      <div class="section-header topic-header">
        <div class="book-eyebrow">Tag</div>
        <h2>${escapeAttr(topic.label.charAt(0).toUpperCase() + topic.label.slice(1))}</h2>
        <p class="topic-blurb">Every card tagged ${escapeAttr(topic.label)}, across formulas, methods, and patterns.</p>
      </div>`];
    if (!entries.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No cards match this topic at the current filters.</div>`);
    } else {
      parts.push(`<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // A single study list, opened from the Practice page.
  function renderListSurface(route) {
    if (route.type !== "list") { history.replaceState(null, "", "#/practice"); render(); return; }
    $content.innerHTML = `<div class="list-main">${listDetailHtml(route.listId)}</div>`;
    renderMath($content, true);
  }

  // Adding a card to a list used to be possible only from the card's own "+" button, which
  // meant building a list from its own page was impossible. This searches the same index the
  // top bar does and toggles membership through the same path the "+" menu uses.
  function renderListAddResults(box, listId, q) {
    const results = box.querySelector(".list-add-results");
    const query = (q || "").trim();
    if (!query) { results.hidden = true; results.innerHTML = ""; return; }
    const l = getList(listId);
    const inThisList = id => !!l && l.ids.indexOf(id) !== -1;
    // Anything already added drops out of the results rather than sitting there with a tick,
    // so the next candidate moves up and a run of additions needs no re-reading.
    const all = (searchFormulas(query).results || []).filter(e => !inThisList(e.formula.id));
    const hits = all.slice(0, 8);
    results.hidden = false;
    results.innerHTML = hits.length
      ? hits.map(e => `<button class="list-add-row" data-list-add-id="${escapeAttr(e.formula.id)}">
            <span class="lar-plus">+</span>
            <span class="lar-name">${e.formula.name}</span>
            <span class="lar-crumb">${escapeAttr(e.section.title)}</span>
          </button>`).join("")
      : `<div class="list-add-empty">${(searchFormulas(query).results || []).length
            ? "Everything matching that is already in this list."
            : "No formula matches that."}</div>`;
    renderMath(results);
  }

  // A route is only navigable if it is broken up, so a built-in list renders its sections
  // with a heading and a note each. Same shape as clusterBody for subsection clusters: a
  // section whose cards all failed to resolve is dropped rather than left as a bare heading,
  // and an untitled section (the single-section lists) just renders its cards.
  // ---------- auto-sections for saved lists ----------
  // A built-in list arrives pre-sectioned; a saved one is a flat array, so a 40-card collection
  // renders as one undifferentiated wall. Rather than invent headings, this matches against the
  // ones already written by hand, from three vocabularies in order of how well they read:
  //   1. the 160 section headings across the built-in lists -- task-oriented, and they carry a
  //      note, so a matched section explains itself
  //   2. the 23 curated TAG_GROUPS families ("triangle centers", "modular arithmetic")
  //   3. the library's own subsections, as the specific-but-plain fallback
  // Subject names are deliberately NOT a fallback. Grouping the leftovers under "Geometry" or
  // "Number Theory" told the reader nothing they could not see from the cards themselves.
  const GENERIC_TITLES = new Set(SECTIONS.map(x => x.title));
  const titleCase = str => str.replace(/\b[a-z]/g, c => c.toUpperCase()).replace(/\bAnd\b/g, "&");

  const SECTION_VOCAB = (() => {
    const out = [];
    // Each section stays its OWN candidate. Merging same-titled sections across tiers was the
    // first attempt and made matches worse: "Triangles: Sides, Areas & Radii" merged to ~40 ids
    // and out-scored the 5-card "Cevians & Ratios" for a list whose cevian cards it barely
    // described. Small, specific candidates are the point.
    BUILTIN_LISTS.forEach(l => (l.sections || []).forEach(sec => {
      if (sec.title && sec.ids.length >= 2) {
        out.push({ title: sec.title, note: sec.note || "", ids: new Set(sec.ids) });
      }
    }));
    Object.keys(TAG_GROUPS).forEach(label => {
      const ids = TAG_GROUPS[label].filter(id => BY_ID[id]);
      if (ids.length >= 2) out.push({ title: titleCase(label), note: "", ids: new Set(ids) });
    });
    SECTIONS.forEach(sec => (sec.subsections || []).forEach(sub => {
      if (GENERIC_TITLES.has(sub.title)) return;
      const ids = (sub.formulas || []).map(f => f.id);
      if (ids.length >= 2) out.push({ title: sub.title, note: "", ids: new Set(ids) });
    }));
    return out;
  })();

  function homeSubsection(id) {
    const e = BY_ID[id];
    return e ? e.subsection.title : "";
  }

  // Greedy set cover. The score is |hit|^2 / |candidate| rather than plain |hit|: a 37-card
  // route section overlapping six of your cards would otherwise win on raw count while saying
  // almost nothing about them, so the denominator demands the heading actually be ABOUT the
  // cards it collects. Two passes -- a heading earning three of your cards is worth more than
  // one earning two, so every three-card match is taken before any two-card one is considered.
  function autoSections(ids) {
    const remaining = new Set(ids);
    const out = [], usedTitles = new Set();
    [3, 2].forEach(minHit => {
      for (;;) {
        if (remaining.size < minHit) return;
        let best = null;
        for (const cand of SECTION_VOCAB) {
          if (usedTitles.has(cand.title)) continue;    // the same heading twice reads as a bug
          let hit = 0;
          for (const id of remaining) if (cand.ids.has(id)) hit++;
          if (hit < minHit) continue;
          const score = (hit * hit) / cand.ids.size;
          if (!best || score > best.score) best = { cand, score };
        }
        if (!best) break;
        usedTitles.add(best.cand.title);
        const picked = ids.filter(id => remaining.has(id) && best.cand.ids.has(id));
        picked.forEach(id => remaining.delete(id));
        out.push({ title: best.cand.title, note: best.cand.note, ids: picked });
      }
    });
    const loose = ids.filter(id => remaining.has(id));
    if (loose.length) out.push({ title: out.length ? "Also in this list" : "", note: "", ids: loose });
    return out;
  }

  function listSectionsHtml(l) {
    return (l.sections || []).map((sec, j) => {
      const entries = sec.ids.map(id => BY_ID[id]).filter(Boolean);
      if (!entries.length) return "";
      const cards = `<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`;
      if (!sec.title) return cards;
      return `
        <div class="list-section" id="ls-${l.id}-${j}">
          <h3 class="list-section-title">${sec.title}</h3>
          ${sec.note ? `<p class="list-section-note">${sec.note}</p>` : ""}
          ${cards}
        </div>`;
    }).join("");
  }

  function listDetailHtml(listId) {
    const userL = getList(listId);
    const l = userL || BUILTIN_BY_ID[listId];
    if (!l) { location.hash = "#/practice"; return ""; }
    const isBuiltin = !userL;
    const entries = l.ids.map(id => BY_ID[id]).filter(Boolean);
    shownIds = entries.map(e => e.formula.id);
    // The three buttons used to sit in a row directly above the cards, which put Clear and
    // Delete list one slip away from the formula you were reading. They move to the top right
    // of the header instead, leaving the builder below as just the add field.
    const AUTO_MIN = 8;
    const canGroup = !isBuiltin && entries.length >= AUTO_MIN;
    const grouped = canGroup && state.autoGroup;
    const headTools = isBuiltin ? "" : `
      <div class="list-head-tools">
        ${canGroup ? `<button class="list-tool${grouped ? " on" : ""}" data-list-group="1" title="${grouped ? "Showing sections matched from the built-in lists" : "Group this list into sections"}">${grouped ? "Grouped" : "Group"}</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool" data-list-rename="${l.id}">Rename</button>`}
        ${entries.length ? `<button class="list-tool danger" data-list-clear="${l.id}">Clear</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool danger" data-list-delete="${l.id}">Delete list</button>`}
      </div>`;
    const tools = isBuiltin ? "" : `
      <div class="list-add" data-list-add="${l.id}">
        <input type="search" class="list-add-input" placeholder="Search cards to add&hellip;" autocomplete="off" aria-label="Search cards to add to this list">
        <div class="list-add-results" hidden></div>
      </div>`;
    const glyph = isBuiltin ? `<span class="list-ico">&#9670;</span>` : `<span class="list-emoji">${listGlyph(l)}</span>`;
    const kindName = isBuiltin ? ((LIST_KINDS.find(([k]) => k === l.kind) || [null, "Study list"])[1]) : "Your list";
    return `
      <div class="detail">
        <div class="back-row"><a class="back-link" href="#/practice">&larr; Practice</a></div>
        <div class="section-header topic-header">
          <div class="book-eyebrow">Practice</div>
          <div class="list-detail-head">
            <h2>${escapeAttr(l.name)}</h2>
            ${headTools}
          </div>
          ${isBuiltin && l.blurb ? `<p class="topic-blurb">${escapeAttr(l.blurb)}</p>` : ""}
        </div>
        ${tools}
        ${entries.length
          ? (isBuiltin || grouped
              ? listSectionsHtml(isBuiltin ? l : { id: l.id, sections: autoSections(shownIds) })
              : `<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`)
          : `<div class="empty-state"><div class="big">${glyph}</div>This list is empty. Press the &ldquo;+&rdquo; on any card to add it here, or the star to save it for later.</div>`}
      </div>`;
  }
  function renderListDetail(listId) { renderListSurface({ type: "list", listId }); }

  // ---------- Problem Database: competition/year navigator + per-problem detail ----------
  function problemRowHtml(p, compact) {
    const typeChips = p.types.slice(0, 4).map(t => `<span class="ptype-chip">${escapeAttr(t.label)}</span>`).join("");
    const label = compact ? ("Problem " + p.num) : refShort(p.ref);
    return `
      <a class="prob-card" href="#/problem/${p.slug}">
        <div class="prob-card-top">
          <span class="prob-ref">${label}</span>
          <span class="prob-formula-count">${p.formulas.length} formula${p.formulas.length === 1 ? "" : "s"}</span>
        </div>
        ${typeChips || p.subjects.length ? `<div class="ptype-row">${subjectChips(p)}${typeChips}</div>` : ""}
        ${p.strategy ? `<div class="prob-strategy">${p.strategy}</div>` : ""}
      </a>`;
  }
  // One sitting of one contest, opened from the Practice page: every year of that contest
  // one click away at the top, the problems grouped by paper, and the neighbouring years at
  // the foot. Problems are searched from the main search box.
  function renderProblems(route) {
    shownIds = [];
    const fam = route && route.fam && FAM_BY_SLUG[route.fam] ? FAM_BY_SLUG[route.fam] : null;
    if (!fam || !DB_TREE[fam]) { history.replaceState(null, "", "#/practice"); render(); return; }
    const years = Object.keys(DB_TREE[fam]).map(Number).sort((a, b) => b - a);
    const year = route.year && DB_TREE[fam][route.year] ? route.year : years[0];
    const groups = {};
    DB_TREE[fam][year].forEach(p => { (groups[p.cname] = groups[p.cname] || []).push(p); });
    // Spring before Fall within a year (2021 had both), then A before B.
    const seasonRank = gn => /^Spring\b/i.test(gn) ? 0 : /^Fall\b/i.test(gn) ? 1 : 0;
    const body = Object.keys(groups).sort((a, b) => seasonRank(a) - seasonRank(b) || a.localeCompare(b)).map(gn => {
      const ps = groups[gn].sort((a, b) => a.num - b.num);
      return `<div class="db-group"><h3 class="db-group-title">${escapeAttr(gn)}</h3><div class="prob-grid">${ps.map(p => problemRowHtml(p, true)).join("")}</div></div>`;
    }).join("");
    const i = years.indexOf(year);
    const newer = years[i - 1], older = years[i + 1];
    const yhref = y => `#/problems/${famSlug(fam)}/${y}`;
    $content.innerHTML = `
      <div class="back-row"><a class="back-link" href="#/practice">&larr; Practice</a></div>
      <div class="section-header topic-header">
        <div class="book-eyebrow">Practice</div>
        <h2>${escapeAttr(fam)} <span class="db-main-year">${year}</span></h2>
      </div>
      <div class="ct-years ct-years-page">${years.map(y => `<a href="${yhref(y)}"${y === year ? ' aria-current="page"' : ""}>${y}</a>`).join("")}</div>
      ${body}
      <nav class="topic-nav" aria-label="Neighbouring years">
        ${older ? `<a class="topic-step" href="${yhref(older)}"><span class="ts-dir">&larr; Earlier</span><span class="ts-name">${escapeAttr(fam)} ${older}</span></a>` : "<span></span>"}
        ${newer ? `<a class="topic-step topic-step-next" href="${yhref(newer)}"><span class="ts-dir">Later &rarr;</span><span class="ts-name">${escapeAttr(fam)} ${newer}</span></a>` : ""}
      </nav>`;
    renderMath($content);
  }
  // The AoPS "See also" box, rebuilt against our own data: the sitting, previous and next,
  // and every problem number in the paper. Numbers we have not tagged are shown but inert, so
  // the strip doubles as a coverage map instead of hiding the gaps.
  function contestNavHtml(p) {
    const sibs = CONTEST_TREE[contestKey(p)] || [];
    if (!sibs.length) return "";
    const i = sibs.findIndex(q => q.slug === p.slug);
    const prev = i > 0 ? sibs[i - 1] : null;
    const next = i >= 0 && i < sibs.length - 1 ? sibs[i + 1] : null;
    const bySlot = {}; sibs.forEach(q => { bySlot[q.num] = q; });
    const total = Math.max(FAM_LENGTH[p.fam] || 0, sibs[sibs.length - 1].num);
    const cells = [];
    for (let k = 1; k <= total; k++) {
      const q = bySlot[k];
      cells.push(q
        ? `<a class="cn-num${q.slug === p.slug ? " cn-here" : ""}" href="#/problem/${q.slug}"${q.slug === p.slug ? ' aria-current="true"' : ""}>${k}</a>`
        : `<span class="cn-num cn-missing" title="Not yet in the database">${k}</span>`);
    }
    const side = (label, q) => q
      ? `<a class="cn-side" href="#/problem/${q.slug}"><span class="cn-side-label">${label}</span><span class="cn-side-ref">Problem ${q.num}</span></a>`
      : `<span class="cn-side cn-side-off"><span class="cn-side-label">${label}</span><span class="cn-side-ref">&mdash;</span></span>`;
    const famHref = `#/problems/${famSlug(p.fam)}/${p.year}`;
    return `
      <nav class="contest-nav" aria-label="Other problems in this contest">
        <div class="cn-head"><a href="${famHref}">${escapeAttr(p.year + " " + p.cname)}</a></div>
        <div class="cn-sides">${side("Preceded by", prev)}${side("Followed by", next)}</div>
        <div class="cn-nums">${cells.join("")}</div>
        <div class="cn-foot"><a href="#/problems/${famSlug(p.fam)}/${p.year}">All ${escapeAttr(p.fam)} problems</a></div>
      </nav>`;
  }

  // ---------- Problem statements ----------
  // The statement of an AMC or AIME problem, shown on its page, with the credit the MAA asked for
  // (CC BY-NC-SA). The text comes from the AoPS wiki and is stored one file per year under
  // js/data/problems/statements/, loaded when a problem page opens, so the offline page stays
  // light and a missing file simply shows no statement. Other contests link out as before.
  const MAA_RE = /\b(AMC|AIME|AJHSME)\b/;
  // Bumped by tools/fetch-live-statements.py whenever the statement files change, so a browser that
  // cached an older file loads the new one.
  const STATEMENTS_V = 18;
  const statementLoads = {};
  function loadStatements(year) {
    if (!statementLoads[year]) {
      statementLoads[year] = new Promise(res => {
        const sc = document.createElement("script");
        sc.src = `js/data/problems/statements/${year}.js?v=${STATEMENTS_V}`;
        sc.onload = () => res(true);
        sc.onerror = () => res(false);
        document.head.appendChild(sc);
      });
    }
    return statementLoads[year];
  }
  function showStatement(p) {
    loadStatements(p.year).then(() => {
      const st = window.MATH_STATEMENTS && window.MATH_STATEMENTS[p.slug];
      const wrap = $content.querySelector(`#prob-st[data-slug="${p.slug}"]`);
      if (!st || !wrap) return;
      const body = wrap.querySelector(".prob-statement");
      body.textContent = "";
      // A figure sits in the text as @@fig:<path>@@ and is an SVG file beside the statements.
      (typeof st === "string" ? st : st.s).split(/@@fig:([^@]+)@@/).forEach((part, i) => {
        if (i % 2) {
          const img = new Image();
          img.className = "prob-figure"; img.alt = "Figure for the problem";
          // The SVGs come at the size of a printed page figure, which reads small on screen:
          // draw them at one consistent size.
          img.addEventListener("load", () => {
            const nw = img.naturalWidth, nh = img.naturalHeight;
            if (!nw || !nh) return;
            // The same size for every figure, whatever the file: scale it (up or down) to fit a 420 by 280 box.
            let k = Math.min(420 / nw, 280 / nh);
            // A thin strip (a row of numbered cards) would shrink to unreadable digits, so it may run wider.
            if (nh * k < 60) k = Math.min(600 / nw, 60 / nh);
            img.style.width = Math.round(nw * k) + "px";
          });
          img.src = "js/data/problems/figures/" + part + "?v=" + STATEMENTS_V;
          body.appendChild(img);
        } else if (part) {
          // Each answer choice on its own line is its own block, so a tall fraction cannot run
          // into the choice above or below it.
          part.split(/\n(?=\([A-E]\) )/).forEach(piece => {
            if (/^\([A-E]\) /.test(piece)) {
              const d = document.createElement("div");
              d.className = "prob-choice";
              // A choice that is a picture is marked @@ci:<file>|<height>@@ and sits small beside its letter.
              piece.replace(/\n+$/, "").split(/@@ci:([^|@]+)\|?([^@]*)@@/).forEach((bit, k, arr) => {
                if (k % 3 === 1) {
                  const im = new Image();
                  im.className = "prob-choice-img"; im.alt = "Answer choice";
                  im.style.maxHeight = arr[k + 1] || "4rem";
                  im.src = "js/data/problems/figures/" + bit + "?v=" + STATEMENTS_V;
                  d.appendChild(im);
                } else if (k % 3 === 0 && bit) d.appendChild(document.createTextNode(bit));
              });
              body.appendChild(d);
            } else body.appendChild(document.createTextNode(piece));
          });
        }
      });
      wrap.querySelector(".prob-credit").innerHTML = statementCreditHtml(p, st.u);
      wrap.hidden = false;
      renderMath(wrap);
    });
  }
  // The credit the MAA asked for (CC BY-NC-SA), and the source of the text.
  function statementCreditHtml(p, src) {
    return `Problem ${escapeAttr(refShort(p.ref))}, &copy; Mathematical Association of America, used under ` +
      `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. ` +
      (/^pdf:/.test(src || "")
        ? `Text and figures from the ${/10a$/.test(src) ? "MAA's official solutions booklet for the Fall 2021 AMC 10A" : "Fall 2021 AMC 10B paper"}, a PDF copy.`
      : /artofproblemsolving\.com/.test(src || "")
        ? `Text from the <a href="${escapeAttr(src)}" target="_blank" rel="noopener noreferrer">Art of Problem Solving Wiki</a>.`
        : `Text and figures from <a href="${escapeAttr(src || "https://live.poshenloh.com/past-contests")}" target="_blank" rel="noopener noreferrer">LIVE by Po-Shen Loh</a>.`);
  }

  // ---------- Written solutions ----------
  // A complete solution, written for the app and checked by computation, sits below "How this
  // problem works". The solutions are stored one file per year under js/data/problems/solutions/
  // and loaded when a problem page opens, like the statements. A file may also register figures
  // as MATH_BODY_DIAGRAMS["sol:<slug>"], placed in the text with the {{figure:name}} marker the
  // write-ups use. SOLUTION_YEARS lists the files that exist (tools/check-solutions.py keeps it
  // in step), so a year with none makes no request.
  const SOLUTION_YEARS = new Set([]);
  const SOLUTIONS_V = 1;
  const solutionLoads = {};
  function loadSolutions(year) {
    if (!solutionLoads[year]) {
      solutionLoads[year] = new Promise(res => {
        const sc = document.createElement("script");
        sc.src = `js/data/problems/solutions/${year}.js?v=${SOLUTIONS_V}`;
        sc.onload = () => res(true);
        sc.onerror = () => res(false);
        document.head.appendChild(sc);
      });
    }
    return solutionLoads[year];
  }
  function showSolution(p) {
    loadSolutions(p.year).then(() => {
      const sol = window.MATH_SOLUTIONS && window.MATH_SOLUTIONS[p.slug];
      const wrap = $content.querySelector(`#prob-sol[data-slug="${p.slug}"]`);
      if (!sol || !wrap) return;
      wrap.querySelector(".prob-solution-body").innerHTML = detailBodyHtml(sol, "sol:" + p.slug);
      wrap.hidden = false;
      renderMath(wrap);
    });
  }

  // The "How this problem works" box. With Settings -> Practice -> Strategy on "Click to show",
  // its contents wait behind a button so the reader can try the problem first.
  function chainBoxHtml(p, chainCol, chain, altIds) {
    const inner = `${p.strategy ? `<p class="chain-strategy">${p.strategy}</p>` : ""}
        ${p.trick ? `<p class="chain-strategy chain-alt">${p.trick}</p>` : ""}
        <div class="chain-grid">
          ${chainCol("Pattern", chain.pattern, "Not classified yet")}
          ${chainCol("Method", chain.method, "Not classified yet")}
          ${chainCol("Formulas", chain.formula, "&mdash;")}
        </div>
        ${altIds.size ? `<p class="chain-alt-note">Dashed cards belong to the second route only.</p>` : ""}`;
    const hide = state.strategy === "click" && (p.strategy || p.formulas.length);
    return `<div class="prob-chain"><h4>How this problem works</h4>
        ${hide ? `<button type="button" class="show-more-btn chain-reveal" onclick="this.nextElementSibling.hidden=false;this.remove()">Show the strategy</button><div class="chain-hidden" hidden>${inner}</div>` : inner}
      </div>`;
  }

  function renderProblemDetail(slug) {
    const p = PROBLEM_BY_SLUG[slug];
    if (!p) { location.hash = "#/practice"; return; }
    noteRecent("p:" + p.slug);
    shownIds = [];
    const types = p.types.map(t => `<a class="ptype-chip" href="#/topic/${t.id}">${escapeAttr(t.label)}</a>`).join("");
    // How this problem works: its tags split by kind into the chain Pattern -> Method ->
    // Formulas. A link nobody has classified yet is shown as missing, never invented. It sits
    // near the bottom of the page: the problem itself, and thinking about it, come first.
    // The second good route's cards (the "Alternatively, ..." paragraph) sit in the same three
    // columns, outlined dashed, so both routes read as Pattern -> Method -> Formulas.
    const chain = { pattern: [], method: [], formula: [] };
    p.formulas.forEach(fid => chain[kindOf(BY_ID[fid].formula)].push(fid));
    p.trickFormulas.forEach(fid => chain[kindOf(BY_ID[fid].formula)].push(fid));
    const altIds = new Set(p.trickFormulas);
    const chainChip = fid => `<a class="related-item${altIds.has(fid) ? " chain-alt-card" : ""}" href="#/f/${fid}">${BY_ID[fid].formula.name}</a>`;
    // One box, always open: the strategy in a few sentences, then the three cards it connects
    // side by side. No hints and no staged reveals: the page explains how the problem works.
    const chainCol = (label, ids, empty) => `<div class="chain-col"><div class="chain-label">${label}</div><div class="chain-cards">${ids.length ? ids.map(chainChip).join("") : `<span class="chain-empty">${empty}</span>`}</div></div>`;
    const chainHtml = chainBoxHtml(p, chainCol, chain, altIds);
    // A geometry problem printed without a figure gets one drawn for the app
    // (js/data/diagrams/problem-diagrams.js), labelled as ours so it is never taken for the MAA's.
    const ownFig = (window.MATH_PROBLEM_DIAGRAMS || {})[p.slug];
    const ownFigHtml = ownFig ? `<div class="diagram prob-own-figure">${ownFig}<div class="prob-own-note">Diagram drawn for this app, not part of the original problem.</div></div>` : "";
    $content.innerHTML = `
      <div class="detail">
        <div class="back-row">
          ${backFromProblem && backFromProblem.slug === p.slug && BY_ID[backFromProblem.fid]
            ? `<a class="back-link" href="#/f/${backFromProblem.fid}">&larr; Back to ${escapeAttr(BY_ID[backFromProblem.fid].formula.name)}</a>`
            : ""}
          <a class="back-link" href="#/problems/${famSlug(p.fam)}/${p.year}">&larr; ${escapeAttr(p.fam)} ${p.year}</a>
        </div>
        <div class="book-eyebrow prob-eyebrow">Practice</div>
        <div class="detail-head">
          <h2 class="card-name">${refShort(p.ref)}</h2>
        </div>
        ${types || p.subjects.length ? `<div class="ptype-row">${subjectChips(p)}${types}</div>` : ""}
        ${MAA_RE.test(p.ref) ? `<section class="prob-st" id="prob-st" data-slug="${p.slug}" hidden>
          <div class="prob-statement"></div>
          <p class="prob-credit"></p>
        </section>` : ""}
        ${ownFigHtml}
        <p class="prob-note">${p.urlLabel === "archive" ? "The full statement and the official solutions live on the contest's own archive, as a PDF for the whole round." : "Solutions live on the Art of Problem Solving wiki."}</p>
        ${p.url ? `<a class="aops-btn" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">Open on ${p.urlLabel === "archive" ? "the official archive" : "AoPS"} <span aria-hidden="true">&#8599;</span></a>` : ""}
        ${chainHtml}
        ${SOLUTION_YEARS.has(String(p.year)) ? `<section class="prob-chain prob-solution" id="prob-sol" data-slug="${p.slug}" hidden>
          <h4>Solution</h4>
          <div class="detail-body prob-solution-body"></div>
        </section>` : ""}
        ${contestNavHtml(p)}
      </div>`;
    renderMath($content);
    if (MAA_RE.test(p.ref)) showStatement(p);
    if (SOLUTION_YEARS.has(String(p.year))) showSolution(p);
  }


  // ---------- One step of provenance ----------
  // Arriving at a problem straight from a formula, or at a formula straight from a list,
  // earns a second back link to exactly that page. Deliberately one hop and no more: it is
  // a breadcrumb for the jump you just made, not a history stack. Any other navigation
  // clears it, so going to a second problem and returning leaves no stale link behind.
  // Held in memory only — a reloaded page has no journey to remember.
  let backFromProblem = null;   // { slug, fid }
  let backFromFormula = null;   // { fid, listId }
  // A card opened straight from a problem page: one hop back to that problem.
  let backFromCardProblem = null; // { fid, slug }
  // A card opened from search results. Unlike the two above this one is not a single hop: it
  // lasts as long as you stay among the cards and problems you reached from those results,
  // because the query is still sitting in the search box and "take me back to it" stays a
  // fair offer. Any other navigation calls clearSearch(), which drops it.
  let backFromSearch = null;    // { query, adv }
  let prevRoute = null, prevRouteKey = null;

  function routeKey(r) {
    return r.type + ":" + (r.entry ? r.entry.formula.id
      : r.slug || r.listId || r.topicId || r.fam || (r.name ? r.name + "/" + r.arg : "")
      || (r.section ? [r.section.id, r.section.topic, r.section.sub].join("/") : ""));
  }
  function trackOrigin(route) {
    const key = routeKey(route);
    // Checked before the early return below: emptying the search box by hand re-renders the
    // same "home" route without going through clearSearch(), and would otherwise leave a
    // "Back to results" link pointing at a search that no longer exists.
    if (route.type === "home" && !(state.query.trim() || state.adv)) backFromSearch = null;
    // A re-render of the page you are already on is not a journey.
    if (key === prevRouteKey) return;
    const prev = prevRoute;
    prevRoute = route; prevRouteKey = key;
    if (route.type === "formula" || route.type === "problem") {
      if (prev && prev.type === "home" && (state.query.trim() || state.adv)) {
        backFromSearch = { query: state.query, adv: state.adv };
      }
    } else if (route.type !== "home") {
      backFromSearch = null;
    }
    if (route.type === "problem") {
      // Arriving back at a problem from the card you opened from it needs no "Back to <card>"
      // link: the card is one click away exactly where you opened it.
      const cameBack = prev && prev.type === "formula" && backFromCardProblem
        && backFromCardProblem.fid === prev.entry.formula.id && backFromCardProblem.slug === route.slug;
      backFromProblem = (prev && prev.type === "formula" && !cameBack)
        ? { slug: route.slug, fid: prev.entry.formula.id } : null;
    } else if (route.type === "formula") {
      backFromFormula = (prev && prev.type === "list")
        ? { fid: route.entry.formula.id, listId: prev.listId } : null;
      backFromCardProblem = (prev && prev.type === "problem")
        ? { fid: route.entry.formula.id, slug: prev.slug } : null;
    }
  }

  // ---------- Special pages ----------
  // Wikipedia-style commands. Type "Special:Random" in the search box or the box on the Settings
  // page and press Enter, or open #/special/random directly. A command either jumps somewhere
  // (a random card, a search) or is a page of its own (every card A to Z, what links here).
  // Names match case-insensitively and ignore spaces, so "special:random problem" works too.
  const pickOne = arr => arr[Math.floor(Math.random() * arr.length)];
  const plainName = n => (n || "").replace(/\$[^$]*\$/g, m => m.replace(/[\\${}^_]/g, "")).toLowerCase();
  function sectionMatches(e, arg) {
    const a = arg.toLowerCase().replace(/[^a-z]/g, "");
    const t = (e.section.title + " " + e.section.id).toLowerCase().replace(/[^a-z ]/g, "");
    return t.split(" ").some(w => w && w.startsWith(a)) || t.replace(/ /g, "").startsWith(a) ||
      ((e.formula.subject || "").replace(/-/g, "").startsWith(a));
  }
  // A card from a typed name or id: the exact id, then an exact name, then a name containing it.
  function cardFromArg(arg) {
    const a = (arg || "").trim().toLowerCase();
    if (!a) return null;
    if (BY_ID[a]) return BY_ID[a];
    return ALL.find(e => plainName(e.formula.name) === a) || ALL.find(e => plainName(e.formula.name).includes(a)) || null;
  }
  // Incoming [[links]], computed once: id -> ids of the cards whose write-ups link to it.
  let backlinks = null;
  function getBacklinks() {
    if (backlinks) return backlinks;
    backlinks = {};
    const D = window.MATH_DETAILS || {};
    Object.keys(D).forEach(src => {
      const seen = new Set();
      for (const m of String(D[src]).matchAll(/\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g)) {
        const to = m[1];
        if (to === src || seen.has(to) || !BY_ID[to]) continue;
        seen.add(to);
        (backlinks[to] = backlinks[to] || []).push(src);
      }
    });
    return backlinks;
  }
  const specialHref = (name, arg) => "#/special/" + name.toLowerCase() + (arg ? "/" + encodeURIComponent(arg) : "");
  const cardLinks = entries => `<ul class="wiki-list">${entries
    .slice().sort((a, b) => plainName(a.formula.name).localeCompare(plainName(b.formula.name)))
    .map(e => `<li><a href="#/f/${e.formula.id}">${e.formula.name}</a></li>`).join("")}</ul>`;
  // A long list is laid out like the wiki index: one heading per letter, "#" first, with a row
  // of letters at the top that jumps to each heading.
  const cardIndex = entries => {
    const buckets = new Map();
    entries.forEach(e => { const k = alphaKey(e.formula.name); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(e); });
    const keys = [...buckets.keys()].sort((a, b) => a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b));
    return `<nav class="letter-jump">${keys.map(k => `<button type="button" data-jump="special-${k === "#" ? "num" : k}">${k}</button>`).join("")}</nav>` +
      keys.map(k => `<section class="wiki-letter" id="special-${k === "#" ? "num" : k}"><h3>${k}</h3>${cardLinks(buckets.get(k))}</section>`).join("");
  };
  // Filters typed after Browse or Random, in any order, separated by "/" or spaces: a kind
  // (formula, method, pattern), a subject (geometry, algebra, number theory, counting, proof),
  // a contest tier (AMC, AIME Early, AIME Late, Olympiad), a level tag (MATHCOUNTS, AMC 10, AMC 12,
  // AIME) or an importance within its subsection (high, medium, low, lower, lowest).
  const FILTER_WORDS = {
    kind: { formula: "formula", formulas: "formula", method: "method", methods: "method", pattern: "pattern", patterns: "pattern" },
    subject: { geometry: "geometry", geo: "geometry", algebra: "algebra", alg: "algebra", numbertheory: "number-theory", nt: "number-theory",
      counting: "counting", countingprobability: "counting", probability: "counting", combinatorics: "counting", proof: "proof", proofs: "proof", proofmethods: "proof" },
    tier: { amc: "amc", aimeearly: "aime-early", early: "aime-early", aimelate: "aime-late", late: "aime-late", olympiad: "olympiad", oly: "olympiad" },
    importance: { high: "high", medium: "medium", med: "medium", low: "low", lower: "lower", lowest: "lowest" }
  };
  const SUBJECT_NAMES = { geometry: "Geometry", algebra: "Algebra", "number-theory": "Number Theory", counting: "Counting & Probability", proof: "Proof" };
  const subjectOf = e => e.formula.subject || e.section.id;
  function parseFilters(arg) {
    const f = { unknown: [] };
    const key = w => w.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]/g, "");
    const take = w => {
      const k = key(w);
      if (!k) return true;
      for (const dim of Object.keys(FILTER_WORDS)) if (FILTER_WORDS[dim][k]) { f[dim] = FILTER_WORDS[dim][k]; return true; }
      return false;
    };
    String(arg || "").split("/").forEach(part => {
      // "Number Theory" and "AMC 10" are one filter; "method geometry" is two.
      if (take(part)) return;
      const words = part.trim().split(/\s+/);
      for (let i = 0; i < words.length; i++) {
        if (i + 1 < words.length && take(words[i] + words[i + 1])) { i++; continue; }
        if (!take(words[i])) f.unknown.push(words[i]);
      }
    });
    return f;
  }
  const passesFilters = (e, f) => (!f.kind || e.kind === f.kind) && (!f.subject || subjectOf(e) === f.subject) &&
    (!f.tier || tierKey(e.formula) === f.tier) && (!f.importance || e.formula.importance === f.importance);
  function filterTitle(f) {
    const kind = f.kind ? f.kind.charAt(0).toUpperCase() + f.kind.slice(1) + "s" : "Cards";
    const TIER_NAMES = { "amc": "AMC", "aime-early": "AIME Early", "aime-late": "AIME Late", "olympiad": "Olympiad" };
    return [f.tier ? TIER_NAMES[f.tier] : "", f.importance ? f.importance.charAt(0).toUpperCase() + f.importance.slice(1) + "-importance" : "",
      f.subject ? SUBJECT_NAMES[f.subject] : "", f.subject || f.importance || f.tier ? kind.toLowerCase() : kind].filter(Boolean).join(" ");
  }
  const filterHelp = `<p class="special-note">Combine any of these, in any order, separated by slashes: a kind (Formula, Method, Pattern), a subject (Geometry, Algebra, Number Theory, Counting, Proof), a contest tier (AMC, AIME Early, AIME Late, Olympiad), or an importance within its subsection (High, Medium, Low, Lower, Lowest). For example, Special:Browse/Method/Geometry or Special:Browse/Pattern/AIME Late.</p>`;
  const problemLinks = probs => `<ul class="wiki-list">${probs.slice().sort((a, b) => b.year - a.year || a.ref.localeCompare(b.ref, undefined, { numeric: true }))
    .map(p => `<li><a href="#/problem/${p.slug}">${refShort(p.ref)}</a></li>`).join("")}</ul>`;
  // A random practice problem, optionally from one contest and difficulty (AIME, AIME/hard, hard).
  function randomProblemTo(arg) {
    const m = String(arg || "").match(/^(?:(.*?)\/)?(easy|medium|hard)$/i);
    const a = resolveContest(m ? (m[1] || "") : arg), band = m ? m[2].toLowerCase() : "";
    const pool = PROBLEM_DB.filter(p => (!a || normKey(p.ref).includes(a)) && (!band || difficultyBand(p) === band));
    return pool.length ? "#/problem/" + pickOne(pool).slug : null;
  }
  function randomStarredTo() {
    const l = lists.items.find(x => x.id === "starred");
    const ids = (l ? l.ids : []).filter(id => BY_ID[id]);
    return ids.length ? "#/f/" + pickOne(ids) : null;
  }
  const COMMANDS = [
    { name: "Random", arg: "filters", example: "Special:Random/Method/Geometry",
      desc: "Open a random card. Add a kind, subject, contest tier, or importance to narrow it, in any order; or add Problem (and a contest) for a random practice problem, or Starred for a random starred card.",
      go: arg => {
        // Special:Random/Problem[/contest[/difficulty]] and Special:Random/Starred reach the problem
        // database and the Starred list through the same command.
        const sp = String(arg || "").match(/^(problem|starred)(?:\/(.*))?$/i);
        if (sp) return sp[1].toLowerCase() === "problem" ? randomProblemTo(sp[2] || "") : randomStarredTo();
        const f = parseFilters(arg);
        // Anything the filters do not recognize falls back to the older section match.
        const pool = !arg ? ALL : f.unknown.length ? ALL.filter(e => sectionMatches(e, arg)) : ALL.filter(e => passesFilters(e, f));
        return pool.length ? "#/f/" + pickOne(pool).formula.id : null; } },
    { name: "Browse", arg: "filters", example: "Special:Browse/Pattern/Geometry",
      desc: "Every card of one kind, subject, contest tier, or importance, A to Z. Combine filters in any order.",
      page: arg => {
        const f = parseFilters(arg);
        if (!arg) return { title: "Browse", body: filterHelp };
        const hits = ALL.filter(e => passesFilters(e, f));
        const unknown = f.unknown.length ? `<p class="special-note">Not a filter, so ignored: <b>${escapeAttr(f.unknown.join(", "))}</b>.</p>` : "";
        return { title: filterTitle(f),
          body: unknown + `<p class="special-note">${hits.length} card${hits.length === 1 ? "" : "s"}.</p>` + (hits.length > 40 ? cardIndex(hits) : hits.length ? cardLinks(browseOrder(hits)) : filterHelp) };
      } },
    { name: "RandomProblem", hidden: true, arg: "contest", example: "Special:Random/Problem/AIME",
      desc: "Open a random practice problem, optionally from one contest.",
      go: arg => randomProblemTo(arg) },
    { name: "RandomStarred", hidden: true, example: "Special:Random/Starred",
      desc: "Open a random card from your Starred list.",
      go: () => randomStarredTo() },
    { name: "WhatLinksHere", arg: "card", example: "Special:WhatLinksHere/Ceva's Theorem",
      desc: "Every card whose explanation links to a given card.",
      page: arg => {
        const e = cardFromArg(arg);
        if (!e) return { title: "What links here", body: `<p class="special-note">No card matches <b>${escapeAttr(arg || "")}</b>. Give a card's name or id, as in Special:WhatLinksHere/Ceva's Theorem.</p>` };
        const from = (getBacklinks()[e.formula.id] || []).map(id => BY_ID[id]);
        return { title: `What links to ${e.formula.name}`,
          body: `<p class="special-note">${from.length} card${from.length === 1 ? "" : "s"} link to <a href="#/f/${e.formula.id}">${e.formula.name}</a> in their explanations.</p>` + (from.length ? cardLinks(from) : "") };
      } },
    { name: "ProblemsUsing", arg: "card", example: "Special:ProblemsUsing/Power of a Point",
      desc: "Every practice problem tagged with a given card.",
      page: arg => {
        const e = cardFromArg(arg);
        if (!e) return { title: "Problems using a card", body: `<p class="special-note">No card matches <b>${escapeAttr(arg || "")}</b>. Give a card's name or id, as in Special:ProblemsUsing/Power of a Point.</p>` };
        const probs = PROBLEMS_BY_CARD[e.formula.id] || [];
        return { title: `Problems using ${e.formula.name}`,
          body: `<p class="special-note">${probs.length} problem${probs.length === 1 ? " is" : "s are"} tagged with <a href="#/f/${e.formula.id}">${e.formula.name}</a>.</p>` + (probs.length ? problemLinks(probs) : "") };
      } },
    { name: "Unclassified", example: "Special:Unclassified",
      desc: "Practice problems still waiting for a pattern, a method, or any card at all.",
      page: () => {
        const kinds = p => new Set(p.formulas.map(id => BY_ID[id].kind));
        const none = PROBLEM_DB.filter(p => !p.formulas.length);
        const noMethod = PROBLEM_DB.filter(p => p.formulas.length && !kinds(p).has("method")).length;
        const noPattern = PROBLEM_DB.filter(p => p.formulas.length && !kinds(p).has("pattern")).length;
        return { title: "Unclassified problems",
          body: `<p class="special-note">Problems are classified only where a card honestly fits, so these gaps are flagged rather than filled. ${noMethod} tagged problems have no method yet, and ${noPattern} have no pattern.</p>` +
            `<h3 class="st-head">No card fits yet (${none.length})</h3>` + (none.length ? problemLinks(none) : `<p class="special-note">None.</p>`) };
      } },
    { name: "Recent", example: "Special:Recent",
      desc: "The cards and problems you opened most recently in this browser.",
      page: () => {
        const rows = recentRowsHtml(30);
        return { title: "Recently opened", body: rows ? `<div class="recent-list special-recent">${rows}</div>` : `<p class="special-note">Nothing opened yet in this browser.</p>` };
      } },
    { name: "NewCards", example: "Special:NewCards",
      desc: "The cards added in the latest batch of new cards, in the order they were written. Special:NewCards/All lists every batch, newest first.",
      page: arg => {
        const batches = (window.NEW_CARD_BATCHES || []).slice().reverse();
        if (!batches.length) return { title: "New cards", body: `<p class="special-note">No batches recorded yet.</p>` };
        const all = /^all$/i.test(String(arg || "").trim());
        const rows = b => `<ul class="wiki-list newcards-list">${b.ids.map(id => BY_ID[MERGED_IDS[id] || id]).filter(Boolean).map(e =>
          `<li><span><a href="#/f/${e.formula.id}">${e.formula.name}</a> <span class="newcards-meta">${e.kind.charAt(0).toUpperCase() + e.kind.slice(1)} &middot; ${SUBJECT_NAMES[subjectOf(e)] || ""} &middot; ${e.subsection.title}</span></span></li>`).join("")}</ul>`;
        const block = b => `<h3 class="st-head">${escapeAttr(b.label)} (${b.date}, ${b.ids.length} card${b.ids.length === 1 ? "" : "s"})</h3>` + rows(b);
        return all
          ? { title: "New cards, every batch", body: `<p class="special-note">${batches.length} batch${batches.length === 1 ? "" : "es"}, newest first.</p>` + batches.map(block).join("") }
          : { title: "New cards", body: `<p class="special-note">The latest batch. <a href="${specialHref("NewCards", "All")}">Every batch</a>.</p>` + block(batches[0]) };
      } },
    { name: "AllPages", example: "Special:AllPages",
      desc: "Every card in the library, A to Z.",
      page: () => ({ title: "All pages", body: `<p class="special-note">${ALL.length} cards, A to Z.</p>` + cardIndex(ALL) }) },
    { name: "LonelyPages", example: "Special:LonelyPages",
      desc: "Cards that no other card's explanation links to.",
      page: () => { const bl = getBacklinks(); const lonely = ALL.filter(e => !(bl[e.formula.id] || []).length);
        return { title: "Lonely pages", body: `<p class="special-note">${lonely.length} of ${ALL.length} cards have no incoming links.</p>` + cardIndex(lonely) }; } },
    { name: "Statistics", example: "Special:Statistics",
      desc: "Counts of cards, problems, connections, figures and your own use.",
      page: () => {
        const row = (k, v) => `<tr><td>${k}</td><td>${v}</td></tr>`;
        const sub = (k, v) => row("&nbsp;&nbsp;&nbsp;" + k, v);
        const pct = (n, d) => d ? ` <span class="st-pct">(${Math.round(100 * n / d)}%)</span>` : "";
        const table = (title, rows) => `<h3 class="st-head">${title}</h3><table class="special-table">${rows}</table>`;
        const byKind = k => ALL.filter(e => e.kind === k);
        const fs = byKind("formula"), ms = byKind("method"), ps = byKind("pattern");
        // The library: the four kinds, and how far the four-kind rewrite has got.
        const subjects = SECTIONS.filter(sec => bookOf(sec) === "formulas").map(sec => sub(sec.title, ALL.filter(e => e.section === sec).length)).join("");
        const conv = [...ms, ...ps].filter(e => isConverted(e.formula)).length;
        const library = row("Cards", ALL.length) + row("Formulas", fs.length) + subjects +
          row("Methods", ms.length) + row("Patterns", ps.length) +
          row("Methods and patterns in the new template", `${conv} of ${ms.length + ps.length}` + pct(conv, ms.length + ps.length));
        // Problems: by contest and difficulty, and how fully each is classified.
        const bands = { easy: 0, medium: 0, hard: 0 };
        PROBLEM_DB.forEach(p => { bands[difficultyBand(p)]++; });
        const chainOf = p => { const k = new Set(p.formulas.map(id => BY_ID[id].kind)); return k; };
        const full = PROBLEM_DB.filter(p => { const k = chainOf(p); return k.has("pattern") && k.has("method") && k.has("formula"); }).length;
        const withMethod = PROBLEM_DB.filter(p => chainOf(p).has("method")).length;
        const withMain = PROBLEM_DB.filter(p => p.main).length, withStrategy = PROBLEM_DB.filter(p => p.strategy).length;
        const tags = PROBLEM_DB.reduce((n, p) => n + p.formulas.length, 0);
        const N = PROBLEM_DB.length;
        const problems = row("Practice problems", N) + FAMILIES.map(f => sub(f, famCount(f))).join("") +
          row("By difficulty (where they sit in the paper)", "") + ["easy", "medium", "hard"].map(b => sub(b.charAt(0).toUpperCase() + b.slice(1), bands[b])).join("") +
          row("With a strategy to reveal", withStrategy + pct(withStrategy, N)) +
          row("With a method tagged", withMethod + pct(withMethod, N)) +
          row("With the full chain (pattern, method and formula)", full + pct(full, N)) +
          row("With the main idea recorded", withMain + pct(withMain, N)) +
          row("Cards tagged per problem, on average", (tags / Math.max(1, N)).toFixed(1));
        // Connections: the hand-written links between kinds, the write-up links, and coverage.
        const bl = getBacklinks(), links = Object.values(bl).reduce((n, x) => n + x.length, 0);
        const suggests = ps.reduce((n, e) => n + (e.formula.suggests || []).length, 0);
        const planned = new Set(); ps.forEach(e => (e.formula.suggests || []).forEach(id => { if (!BY_ID[id]) planned.add(id); }));
        const uses = ms.reduce((n, e) => n + (e.formula.uses || []).length, 0);
        const used = ALL.filter(e => (PROBLEMS_BY_CARD[e.formula.id] || []).length).length;
        const lonely = ALL.filter(e => !(bl[e.formula.id] || []).length).length;
        const top = ALL.slice().sort((x, y) => (PROBLEMS_BY_CARD[y.formula.id] || []).length - (PROBLEMS_BY_CARD[x.formula.id] || []).length).slice(0, 5)
          .map(e => sub(`<a href="#/f/${e.formula.id}">${e.formula.name}</a>`, (PROBLEMS_BY_CARD[e.formula.id] || []).length)).join("");
        const connections = row("Patterns pointing to methods (suggests)", suggests) +
          row("Planned methods not written yet (red links)", planned.size) +
          row("Methods pointing to formulas (uses)", uses) +
          row("Links inside explanations", links) +
          row("Cards no explanation links to", `<a href="${specialHref("LonelyPages")}">${lonely}</a>`) +
          row("Cards used by at least one problem", used + pct(used, ALL.length)) +
          row("Most practiced cards", "") + top;
        // Figures and worked examples.
        const panels = Object.keys(window.MATH_DIAGRAMS || {}).length;
        const body = Object.values(window.MATH_BODY_DIAGRAMS || {}).reduce((n, o) => n + Object.keys(o).length, 0);
        const examples = ALL.filter(e => (window.MATH_EXAMPLES || {})[e.formula.id]).length;
        const media = row("Cards with a figure", panels + pct(panels, ALL.length)) + row("Figures inside explanations", body) +
          row("Cards with a worked example", examples + pct(examples, ALL.length)) + row("Built-in study lists", BUILTIN_LISTS.length);
        // The reader's own use, from this browser.
        const starred = liveIds(getList("starred")).length, mine = lists.items.filter(l => l.id !== "starred").length;
        const you = row("Starred cards", starred) + row("Your lists", mine) + row("Recently opened (kept)", readRecent().length);
        return { title: "Statistics", body: table("Library", library) + table("Problems", problems) + table("Connections", connections) +
          table("Figures and examples", media) + table("You", you) };
      } },
    { name: "Search", arg: "query", example: "Special:Search/angle bisector",
      desc: "Search for the rest of the command.",
      search: arg => arg },
  ];
  function parseCommand(text) {
    const t = String(text || "").trim().replace(/^special:\s*/i, "");
    const slash = t.indexOf("/");
    const name = (slash < 0 ? t : t.slice(0, slash)).replace(/\s+/g, "").toLowerCase();
    const arg = slash < 0 ? "" : t.slice(slash + 1).trim();
    return { cmd: COMMANDS.find(c => c.name.toLowerCase() === name), name, arg };
  }
  // Runs a typed command; false when there is no such command, so the caller can say so.
  function runCommand(text) {
    const { cmd, arg } = parseCommand(text);
    if (!cmd) return false;
    hideSuggest();
    if (cmd.search) {
      clearSearch();
      state.query = $search.value = cmd.search(arg);
      stripHash(); render(); window.scrollTo({ top: 0 });
      return true;
    }
    clearSearch();
    location.hash = specialHref(cmd.name, arg);
    return true;
  }
  function renderSpecial(route) {
    shownIds = [];
    const cmd = COMMANDS.find(c => c.name.toLowerCase() === route.name);
    if (cmd && cmd.go) {
      const to = cmd.go(route.arg);
      // replace, not push: Back should return to where the command was typed, not re-roll it
      if (to) { location.replace(to); return; }
      $content.innerHTML = specialShell("Nothing to open", `<p class="special-note">${
        (cmd.name === "RandomStarred" || /^starred$/i.test(route.arg || "")) ? "Your Starred list is empty. Star a card with &#9734; first." : "Nothing matches that."}</p>`);
      return;
    }
    if (cmd && cmd.page) {
      const p = cmd.page(route.arg);
      $content.innerHTML = specialShell(p.title, p.body);
      renderMath($content);
      return;
    }
    $content.innerHTML = specialShell("Unknown command", `<p class="special-note">There is no command called <b>Special:${escapeAttr(route.name)}</b>.</p>` + commandListHtml());
  }
  function specialShell(title, body) {
    return `<div class="section-header topic-header"><div class="book-eyebrow">Special page</div><h2>${title}</h2><p class="topic-blurb"><a href="#/settings/commands">All commands</a> are in Settings.</p></div>
      <div class="special-page">${body}</div>`;
  }
  function commandListHtml() {
    return `<ul class="command-list">${COMMANDS.filter(c => !c.hidden).map(c => `
      <li><button type="button" class="command-chip" data-command="${escapeAttr(c.example)}">${c.example}</button>
        <span class="command-desc">${c.desc}</span></li>`).join("")}</ul>`;
  }
  // While a command is being typed in the search box, list the commands it could be instead of
  // searching the cards for the word "special".
  // ---- suggestions while typing a command, the way Wikipedia's search box offers pages ----
  const normKey = t => String(t || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  // How well a typed fragment matches a candidate: a prefix beats a substring beats a near miss,
  // and a near miss allows about one slip per five letters ("hmmtfebuary" still finds
  // HMMT February).
  function suggestScore(typed, cand) {
    const t = normKey(typed), c = normKey(cand);
    if (!t) return 1;
    if (c.startsWith(t)) return 4 - c.length / 1000;
    if (c.includes(t)) return 3 - c.length / 1000;
    const cap = Math.max(1, Math.floor(t.length / 5));
    let best = 99;
    for (let len = Math.max(1, t.length - cap); len <= Math.min(c.length, t.length + cap); len++)
      best = Math.min(best, levBounded(t, c.slice(0, len), cap));
    return best <= cap ? 2 - best / 10 - c.length / 1000 : 0;
  }
  const rankBy = (typed, items, key, n) => items.map(x => ({ x, s: suggestScore(typed, key(x)) }))
    .filter(o => o.s > 0).sort((a, b) => b.s - a.s).slice(0, n).map(o => o.x);
  // Contest names drawn from the problem references: families ("AIME", "AMC 12"), exact contests
  // ("AIME II", "HMMT February Geometry") and, when a year is typed, single sittings.
  let contestNames = null;
  function getContests() {
    if (contestNames) return contestNames;
    const counts = new Map(), bump = (k, n = 1) => counts.set(k, (counts.get(k) || 0) + n);
    PROBLEM_DB.forEach(p => {
      const sitting = p.ref.replace(/,?\s*Problem.*$/, "").trim();
      const base = sitting.replace(/\b(19|20)\d\d\b/, "").replace(/\s+/g, " ").trim();
      bump(sitting); bump(base);
      const m = base.match(/^(Fall )?(AMC 1[02]|AIME|HMMT February|HMMT)/);
      if (m && m[2] !== base) bump(m[2]);
      if (/^HMMT February/.test(base) && base !== "HMMT") bump("HMMT");
    });
    contestNames = [...counts.entries()].map(([name, n]) => ({ name, n }));
    return contestNames;
  }
  // "AIME 2" is how people type AIME II.
  const romanAime = t => String(t || "").replace(/\baime\s*([12])\b/i, (m, d) => "AIME " + (d === "1" ? "I" : "II"));
  function resolveContest(arg) {
    arg = romanAime(arg);
    const a = normKey(arg);
    if (!a) return "";
    if (PROBLEM_DB.some(p => normKey(p.ref).includes(a))) return a;
    const best = rankBy(arg, getContests(), c => c.name, 1)[0];
    return best ? normKey(best.name) : a;
  }
  // Suggestions for one command's argument: [{ text, note }] where text is the full command.
  function argSuggestions(cmd, arg) {
    const full = v => "Special:" + cmd.name + "/" + v;
    if (cmd.name === "Random") {
      const pm = arg.match(/^problem\/(.*)$/i);
      if (pm) return argSuggestions({ name: "RandomProblem" }, pm[1]).map(it => ({ ...it, text: it.text.replace("Special:RandomProblem/", "Special:Random/Problem/") }));
    }
    if (cmd.name === "Random" || cmd.name === "Browse") {
      // The filters already chosen stay; the last piece is the one being typed.
      const cut = arg.lastIndexOf("/"), done = cut < 0 ? "" : arg.slice(0, cut + 1), typing = arg.slice(cut + 1);
      const chosen = parseFilters(done);
      const opts = [["kind", ["Formula", "Method", "Pattern"]], ["subject", ["Geometry", "Algebra", "Number Theory", "Counting", "Proof"]],
        ["tier", ["AMC", "AIME Early", "AIME Late", "Olympiad"]],
        ["importance", ["High", "Medium", "Low", "Lower", "Lowest"]]]
        .filter(([dim]) => !chosen[dim]).flatMap(([dim, vals]) => vals.map(v => ({ v, dim })));
      const ranked = typing.trim() ? rankBy(typing, opts, o => o.v, 10) : opts.slice(0, 20);
      const out = ranked.map(o => {
        const f = parseFilters(done + o.v), n = ALL.filter(e => passesFilters(e, f)).length;
        return { text: full(done + o.v), note: `${filterTitle(f)}: ${n} card${n === 1 ? "" : "s"}` };
      });
      // Random also reaches the practice problems and the Starred list.
      if (cmd.name === "Random" && !done) {
        const starred = (lists.items.find(x => x.id === "starred") || { ids: [] }).ids.filter(id => BY_ID[id]).length;
        [["Problem", `a random practice problem (${PROBLEM_DB.length} in all); add a contest after the slash, as in Special:Random/Problem/AIME`],
         ["Starred", `a random card from your Starred list (${starred})`]].forEach(([v, note]) => {
          if (!typing.trim() || suggestScore(typing, v) > 0) out.push({ text: full(v), note });
        });
        if (!typing.trim()) out.unshift(...out.splice(out.length - 2, 2));
      }
      return out;
    }
    if (cmd.name === "ProblemsUsing") {
      return rankBy(arg, ALL.filter(e => problemCount(e.formula.id)), e => plainName(e.formula.name), 8).map(e => ({ text: full(plainName(e.formula.name) === e.formula.name.toLowerCase() ? e.formula.name : e.formula.id), note: `${problemCount(e.formula.id)} problem${problemCount(e.formula.id) === 1 ? "" : "s"}` }));
    }
    if (cmd.name === "RandomProblem") {
      arg = romanAime(arg);
      const pool = getContests().filter(c => /\d/.test(arg) || !/\b(19|20)\d\d\b/.test(c.name));
      return rankBy(arg, pool, c => c.name, 8).map(c => ({ text: full(c.name), note: `${c.n} problem${c.n === 1 ? "" : "s"}` }));
    }
    if (cmd.name === "WhatLinksHere") {
      return rankBy(arg, ALL, e => plainName(e.formula.name), 8).map(e => ({ text: full(plainName(e.formula.name) === e.formula.name.toLowerCase() ? e.formula.name : e.formula.id), note: e.section.title }));
    }
    if (cmd.name === "Search" && arg.trim()) {
      const hits = searchFormulas(arg).results.slice(0, 6);
      return [{ text: full(arg), note: "search for it" }].concat(hits.map(e => ({ text: "#/f/" + e.formula.id, label: e.formula.name, note: e.section.title })));
    }
    return [];
  }
  // The suggestions for what is typed after "Special:": matching commands, or once a command is
  // chosen, its arguments. [{ text, label?, note }]; text is a command, or a #/ route for a card.
  function commandSuggestions(query) {
    const t = String(query).trim().replace(/^special:\s*/i, "");
    const slash = t.indexOf("/");
    const typedName = (slash < 0 ? t : t.slice(0, slash)).replace(/\s+/g, "");
    const arg = slash < 0 ? "" : t.slice(slash + 1);
    const exact = COMMANDS.find(c => c.name.toLowerCase() === typedName.toLowerCase());
    const cmd = exact || (slash >= 0 ? rankBy(typedName, COMMANDS, c => c.name, 1)[0] : null);
    if (cmd && slash >= 0) {
      const items = argSuggestions(cmd, arg);
      return items.length ? items : [{ text: "Special:" + cmd.name + (arg ? "/" + arg : ""), note: cmd.desc }];
    }
    // A command typed in full lists itself and then what can follow the slash.
    if (exact && exact.arg && slash < 0) {
      const more = argSuggestions(exact, "");
      if (more.length) return [{ text: "Special:" + exact.name, note: exact.desc }].concat(more.slice(0, 14));
    }
    const shown = COMMANDS.filter(c => !c.hidden);
    const items = rankBy(typedName, shown, c => c.name, shown.length)
      .map(c => ({ text: "Special:" + c.name, note: c.desc + (c.example ? ` For example ${c.example}.` : "") }));
    return items.length ? items : shown.map(c => ({ text: "Special:" + c.name, note: c.desc }));
  }
  // A dropdown under the search box, like Wikipedia's: it lists the suggestions while a command
  // is being typed and closes when the reader clicks anywhere else. The page underneath is left
  // alone, so typing a command never throws away what was on screen.
  const $suggest = document.createElement("div");
  $suggest.className = "cmd-suggest";
  $suggest.hidden = true;
  $suggest.setAttribute("role", "listbox");
  $search.parentElement.appendChild($suggest);
  function showSuggest(items) {
    $suggest.innerHTML = items.map((it, i) => `<button type="button" role="option" class="cs-item${i === 0 ? " is-active" : ""}" ${
      it.text.startsWith("#/") ? `data-href="${escapeAttr(it.text)}"` : `data-command="${escapeAttr(it.text)}"`}>
      <span class="cs-title">${it.label || escapeAttr(it.text)}</span><span class="cs-desc">${it.note || ""}</span></button>`).join("");
    $suggest.hidden = !items.length;
    if (window.renderMathInElement) renderMathInElement($suggest, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
  }
  function hideSuggest() { $suggest.hidden = true; }
  function moveSuggestion(step) {
    const rows = [...$suggest.querySelectorAll(".cs-item")];
    if (!rows.length || $suggest.hidden) return;
    let i = rows.findIndex(r => r.classList.contains("is-active"));
    rows.forEach(r => r.classList.remove("is-active"));
    i = (i + step + rows.length) % rows.length;
    rows[i].classList.add("is-active");
    rows[i].scrollIntoView({ block: "nearest" });
  }
  function activeSuggestion() { return $suggest.hidden ? null : $suggest.querySelector(".cs-item.is-active"); }
  // Keep focus in the box while a row is pressed, so the click lands before the box blurs.
  $suggest.addEventListener("mousedown", e => e.preventDefault());
  document.addEventListener("mousedown", e => { if (!$search.parentElement.contains(e.target)) hideSuggest(); });
  $search.addEventListener("focus", () => { if (/^\s*special:/i.test($search.value)) showSuggest(commandSuggestions($search.value)); });
  document.addEventListener("click", e => {
    const h = e.target.closest("[data-href]");
    if (!h) return;
    e.preventDefault();
    clearSearch();
    hideSuggest();
    location.hash = h.dataset.href;
  });
  // Letter row on a special page: scroll to the heading. Anchors would change the hash, which
  // is the router.
  document.addEventListener("click", e => {
    const j = e.target.closest("[data-jump]");
    if (!j) return;
    const t = document.getElementById(j.dataset.jump);
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  // Any command chip, anywhere, runs its example.
  document.addEventListener("click", e => {
    const chip = e.target.closest("[data-command]");
    if (!chip) return;
    e.preventDefault();
    hideSuggest();
    runCommand(chip.dataset.command);
  });

  function render() {
    const route = getRoute();
    if (route.type === "home") {
      state.landing = !route.section;
      if (route.section) {
        state.activeSectionId = route.section.id;
        state.activeSub = route.section.sub;
        state.activeTopic = route.section.topic;
        state.activeCluster = route.section.cluster;
        if (state.navCollapsed !== route.section.id + ":" + route.section.sub) state.navCollapsed = null;
        const sec = SECTIONS.find(x => x.id === route.section.id);
        if (sec) lastSubject[bookOf(sec)] = sectionHash(sec.id, bySubject(sec) ? { sub: route.section.sub } : {});
      }
    }
    trackOrigin(route);
    const sp = spaceFor(route);
    if (sp) state.space = sp;
    const section = SECTIONS.find(s => s.id === state.activeSectionId) || SECTIONS[0];
    closeListMenu();
    if (route.type === "formula") {
      renderDetail(route.entry);
    } else if (route.type === "topic") {
      renderTopic(route.topicId);
    } else if (route.type === "lists") {
      renderListSurface(route);
    } else if (route.type === "list") {
      renderListDetail(route.listId);
    } else if (route.type === "problems") {
      renderProblems(route);
    } else if (route.type === "problem") {
      renderProblemDetail(route.slug);
    } else if (route.type === "settings") {
      renderSettingsPage();
    } else if (route.type === "special") {
      renderSpecial(route);
    } else if (route.type === "space") {
      renderSpaceHome(route.name);
    } else if (state.adv) {
      renderAdvancedResults();
    } else if (state.query.trim()) {
      renderSearchResults();
    } else if (state.landing) {
      renderLanding();
    } else {
      if (section) renderSection(section);
    }
    // The one filter applies wherever cards are listed by subject, group, or topic, so its button
    // shows on those pages and hides during search, tag, list, and card views, which it does not touch.
    const filtersApply = (route.type === "home" && !state.query.trim() && !state.adv && !state.landing) || route.type === "topic";
    const filtersBtn = document.getElementById("filters-btn");
    if (filtersBtn) filtersBtn.style.display = filtersApply ? "" : "none";
    // The section sidebar is meaningless on the Database and Lists surfaces —
    // drop it there and let the content run full width (desktop only; on mobile it
    // stays the hamburger drawer).
    // The home page is its own front door: no sidebar and no header search.
    const onLanding = route.type === "home" && state.landing && !state.query.trim() && !state.adv;
    document.body.classList.toggle("is-landing", onLanding);
    // index.html hides the top bar before the first paint when the page opens on the front
    // page, so it never flashes; from here on body.is-landing decides.
    document.documentElement.classList.remove("pre-landing");
    // Settings belongs to no space: it highlights none and takes a neutral tint.
    // Search results belong to no space either: they span all four kinds, so they get the whole
    // width and no sidebar.
    const searching = (route.type === "home" && (!!state.query.trim() || !!state.adv)) || route.type === "topic" || route.type === "special";
    document.body.dataset.space = onLanding ? "home" : route.type === "settings" || searching ? "none" : state.space;
    // A list page's sidebar holds only the list's sections, under "On this list", drawn in the
    // same panel as a card's "On this page", so the section being read is marked the same way.
    const noSidebar = onLanding || searching || ["problems", "problem", "lists", "settings", "space"].indexOf(route.type) !== -1
      || (route.type === "list" && !$content.querySelector(".list-section[id]"));
    const $tree = document.getElementById("formula-nav");
    if ($tree) $tree.hidden = route.type === "list";
    const $layout = document.querySelector(".layout");
    if ($layout) $layout.classList.toggle("no-sidebar", noSidebar);
    // The Lists surfaces get category navigation instead of the formula tree. Both live in
    // #sidebar at once and only visibility is toggled: buildSidebar() runs once at startup
    // and owns the delegated click listener, so rebuilding it per route would attach a
    // duplicate listener every time.
    updateNavActive();
    updateGearActive();
    if (route.type === "list") buildListToc();
    else if (route.type !== "formula") clearPageToc();
    // Showing or hiding the sidebar changes the card width, so the formulas are fitted again.
    fitCardFormulas($content);
  }

  // ---------- Sidebar ----------




  const LIST_KINDS = [["route", "Study Routes"], ["core", "Starting Points"], ["configuration", "Configurations"],
                      ["thinking", "Ways of Thinking"], ["curiosity", "Curiosities"]];

  function buildSidebar() {
    // Four groups, one per space, only the current space's shown: FORMULAS lists its subjects
    // with their topics, METHODS and PATTERNS list their subjects with their groups, and
    // PROBLEMS lists the practice surfaces.
    const order = ["formulas", "methods", "patterns", "practice"];
    const byGroup = new Map(order.map(g => [g, []]));
    SECTIONS.forEach(section => byGroup.get(groupOf(section)).push(section));
    // Practice links go to other surfaces, so they are plain links, not section rows (the
    // section-row click handling would read them as a section with no id).
    const practiceRows = `
      <a class="nav-practice-link" href="#/practice">Contests and study lists</a>
      <a class="nav-practice-link" href="#/special/randomproblem">A random problem</a>`;
    // A Methods or Patterns subject row opens onto its groups, as a Formulas subject row opens
    // onto its topics.
    const subjectRows = section => section.subsections.map((sub, i) => `
      <div class="nav-section" data-section="${section.id}" data-subject="${i}">
        <button class="nav-section-btn" data-section="${section.id}" data-subject="${i}">
          <span>${sub.title}</span>
          <span class="nav-count">${sub.formulas.length}</span>
        </button>
        <div class="nav-subs"><div class="nav-subs-inner">
          ${(sub.groups || []).map((g, j) =>
            `<a class="nav-sub-link" data-section="${section.id}" data-sub="${i}" data-cluster="${j}">${g.title}</a>`).join("")}
        </div></div>
      </div>`).join("");
    const formulaRows = section => `
      <div class="nav-section" data-section="${section.id}">
        <button class="nav-section-btn" data-section="${section.id}">
          <span>${section.title}</span>
          <span class="nav-count">${sectionCount(section)}</span>
        </button>
        <div class="nav-subs"><div class="nav-subs-inner">
          ${section.subsections.map((sub, i) =>
            `<a class="nav-sub-link" data-section="${section.id}" data-sub="${i}">${sub.title}</a>`).join("")}
        </div></div>
      </div>`;
    $sidebar.innerHTML = `<div id="formula-nav">` + order.map(group => `
      <div class="nav-group" data-group="${group}">
        <div class="nav-space-head">
          ${group === "practice"
            ? `<a class="nsh-label" href="#/practice" title="Contests, study lists, and your lists">${SPACES[group].label}</a>`
            : `<span class="nsh-label">${SPACES[group].label}</span><button type="button" class="nsh-info" data-info="${group}" aria-label="About ${SPACES[group].label}" aria-expanded="false">i</button>`}
          <span class="nsh-ask">${SPACES[group].ask}</span>
        </div>
        <div class="nav-group-body"><div class="nav-group-inner">
          ${group === "practice" ? practiceRows : ""}
          ${byGroup.get(group).map(section => bySubject(section) ? subjectRows(section) : formulaRows(section)).join("")}
        </div></div>
      </div>`).join("") + `</div><nav class="page-toc" id="page-toc" aria-label="On this page" hidden></nav>`;

    $sidebar.addEventListener("click", e => {
      // The list nav emits the same nav-* classes so the two trees look identical, so it
      // must claim its own clicks before the formula branches below see them.
      const groupBtn = e.target.closest(".nav-group-btn");
      if (groupBtn) {
        // Exactly one book is open at a time: choosing one opens it and folds the other.
        state.openGroup = groupBtn.dataset.group;
        updateNavActive();
        return;
      }
      const btn = e.target.closest(".nav-section-btn");
      const link = e.target.closest(".nav-sub-link") || e.target.closest(".nav-cluster-link");
      // In the mobile drawer, the first tap on a section opens it (revealing its
      // sub-subjects) and keeps the drawer up; tapping that same (already-open)
      // section again takes you to its main page and closes the drawer. A
      // sub-subject tap always jumps there and closes.
      // A subsection the filters have emptied is not on the page, so its link does nothing.
      if (link && navLinkCount(...navLinkArgs(link)) === 0) { e.preventDefault(); return; }
      if (link) closeDrawer();
      if (btn) {
        const secId = btn.dataset.section;
        const subj = btn.dataset.subject === undefined ? null : +btn.dataset.subject;
        const onSection = getRoute().type === "home" && !state.query.trim();
        const alreadyOpen = document.body.classList.contains("nav-open") && onSection
          && state.activeSectionId === secId && state.activeSub === subj;
        if (alreadyOpen) { closeDrawer(); window.scrollTo({ top: 0 }); return; }
        // On desktop, the header of the subject you are in folds its list away (and unfolds it
        // again), so the other subjects are easier to reach; another subject's header opens it.
        const key = secId + ":" + subj;
        if (onSection && state.activeSectionId === secId && state.activeSub === subj && !document.body.classList.contains("nav-open")) {
          state.navCollapsed = state.navCollapsed === key ? null : key;
          updateNavActive();
          return;
        }
        state.navCollapsed = null;
        clearSearch();
        state.openGroup = null;
        goHash(sectionHash(secId, { sub: subj }));
      } else if (link) {
        clearSearch();
        const linkSec = SECTIONS.find(x => x.id === link.dataset.section);
        const cl = link.dataset.cluster === undefined ? null : +link.dataset.cluster;
        groupPinned = cl != null;
        goHash(bySubject(linkSec)
          ? sectionHash(linkSec.id, { sub: +link.dataset.sub, cluster: cl })
          : sectionHash(linkSec.id, { topic: +link.dataset.sub }));
      }
    });
  }

  function updateNavActive() {
    // Scoped to #formula-nav: #list-nav now emits the same classes, and this function owns
    // only the formula tree. The null guards are belt and braces on top of that.
    const tree = document.getElementById("formula-nav");
    if (!tree) return;
    const onHome = getRoute().type === "home";
    const open = openGroupId();
    tree.querySelectorAll(".nav-group").forEach(el => {
      const mine = el.dataset.group === open;
      el.classList.toggle("open", mine);
      el.hidden = !mine;
      const btn = el.querySelector(".nav-group-btn");
      if (btn) btn.setAttribute("aria-expanded", mine ? "true" : "false");
    });
    tree.querySelectorAll(".nav-sub-link, .nav-cluster-link").forEach(a => {
      a.classList.toggle("active", onHome && !state.landing && !state.query.trim() && !state.adv
        && a.dataset.section === state.activeSectionId
        && (a.dataset.cluster === undefined
          ? +a.dataset.sub === state.activeTopic
          : +a.dataset.sub === state.activeSub && +a.dataset.cluster === state.activeCluster));
      const empty = navLinkCount(...navLinkArgs(a)) === 0;
      a.classList.toggle("nav-empty", empty);
      if (empty) {
        a.setAttribute("aria-disabled", "true");
        a.title = "No cards here match the current filters";
      } else {
        a.removeAttribute("aria-disabled");
        a.removeAttribute("title");
      }
    });
    // Keep the marked link on screen inside the sidebar itself (never moving the page).
    const mark = tree.querySelector(".nav-sub-link.active, .nav-cluster-link.active");
    if (mark && $sidebar.scrollHeight > $sidebar.clientHeight) {
      const sr = $sidebar.getBoundingClientRect(), mr = mark.getBoundingClientRect();
      if (mr.top < sr.top + 40) $sidebar.scrollTop -= (sr.top + 40 - mr.top);
      else if (mr.bottom > sr.bottom - 40) $sidebar.scrollTop += (mr.bottom - sr.bottom + 40);
    }
    tree.querySelectorAll(".nav-section").forEach(el => {
      const isActive = onHome && !state.query.trim() && !state.adv && !state.landing
                       && el.dataset.section === state.activeSectionId
                       && (el.dataset.subject === undefined || +el.dataset.subject === state.activeSub);
      el.classList.toggle("open", isActive && state.navCollapsed !== el.dataset.section + ":" + (el.dataset.subject === undefined ? null : +el.dataset.subject));
      const btn = el.querySelector(".nav-section-btn");
      if (btn) btn.classList.toggle("active", isActive);
    });
    // The counts beside subjects follow the filter: with none set they are the totals.
    tree.querySelectorAll(".nav-section-btn").forEach(btn => {
      const c = btn.querySelector(".nav-count"), sec = SECTIONS.find(x => x.id === btn.dataset.section);
      if (!c || !sec) return;
      const cards = btn.dataset.subject !== undefined
        ? sec.subsections[+btn.dataset.subject].formulas
        : [].concat(...sec.subsections.map(sub => sub.formulas));
      c.textContent = filterActive() ? cards.filter(passesFilter).length : cards.length;
    });
  }

  function clearSearch() {
    state.query = "";
    $search.value = "";
    state.adv = null;
    backFromSearch = null;
  }

  // ---------- Events ----------

  let searchTimer = null;
  // Starting a search remembers the page it was started from, and emptying the box returns
  // there with its scroll position, instead of falling through to the front page.
  let preSearch = null;
  function applySearchQuery(value) {
    const was = state.query.trim(), now = value.trim();
    if (!was && now && !state.adv) preSearch = { hash: location.hash, y: window.scrollY, landing: state.landing };
    state.query = value;
    if (now) {
      state.adv = null;
      if (!getRoute().section) stripHash();
      render();
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const back = preSearch; preSearch = null;
    if (back && was) {
      state.landing = back.landing;
      history.replaceState(null, "", location.pathname + location.search + back.hash);
      render();
      // The page lays out its math lazily, so restore the position once it has rendered.
      const restore = () => window.scrollTo({ top: back.y, behavior: "instant" });
      restore(); setTimeout(restore, 0); setTimeout(restore, 150);
      return;
    }
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  $search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    if (/^\s*special:/i.test($search.value)) { showSuggest(commandSuggestions($search.value)); return; }
    hideSuggest();
    searchTimer = setTimeout(() => {
      applySearchQuery($search.value);
    }, 120);
  });

  // Enter in the search box just commits the query and leaves the field (blurs);
  // it stays on the results list rather than jumping into the top hit.
  $search.addEventListener("keydown", e => {
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !$suggest.hidden) {
      e.preventDefault();
      moveSuggestion(e.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (e.key === "Escape" && !$suggest.hidden) { hideSuggest(); return; }
    if (e.key !== "Enter") return;
    e.preventDefault();
    clearTimeout(searchTimer);
    if (/^\s*special:/i.test($search.value)) {
      const act = activeSuggestion();
      if (act) { act.click(); $search.blur(); return; }
      if (runCommand($search.value)) { hideSuggest(); $search.blur(); return; }
      showSuggest(commandSuggestions($search.value));
      return;
    }
    applySearchQuery($search.value);
    $search.blur();
  });

  // Scroll speed. Each wheel step is scaled and applied to the innermost box that can still
  // scroll that way (a sidebar, a dialog), else the page. Small steps, a trackpad's, are applied
  // at once, as they already arrive many times a second; a mouse wheel's large notches glide to
  // their target so the page does not jump. Pinch-zoom (ctrl+wheel) and sideways scrolling are
  // left to the browser.
  let wheelAnim = null;
  // A box that contains its scrolling (overscroll-behavior, as dropdowns and dialogs do) keeps
  // the step even at its end, so the page behind it does not move.
  function scrollerFor(target, dy) {
    for (let el = target instanceof Element ? target : null; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
      const cs = getComputedStyle(el);
      if (el.scrollHeight <= el.clientHeight + 1 || !/(auto|scroll)/.test(cs.overflowY)) continue;
      const atTop = el.scrollTop <= 0, atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (!(dy < 0 && atTop) && !(dy > 0 && atEnd)) return el;
      if (cs.overscrollBehaviorY && cs.overscrollBehaviorY !== "auto") return el;
    }
    return null;
  }
  const scrollPos = el => el ? el.scrollTop : window.scrollY;
  const scrollMax = el => el ? el.scrollHeight - el.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
  // Instant, not the page's CSS smooth scrolling: the glide below is its own animation.
  const scrollSet = (el, y) => { if (el) el.scrollTo({ top: y, behavior: "instant" }); else window.scrollTo({ top: y, behavior: "instant" }); };
  document.addEventListener("wheel", e => {
    const k = SCROLL_FACTOR[state.scroll] || 1;
    if (k === 1 || e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1) * k;
    const el = scrollerFor(e.target, dy);
    e.preventDefault();
    const clampTo = y => Math.max(0, Math.min(scrollMax(el), y));
    if (e.deltaMode === 0 && Math.abs(e.deltaY) < 40) {
      if (wheelAnim) { cancelAnimationFrame(wheelAnim.raf); wheelAnim = null; }
      scrollSet(el, clampTo(scrollPos(el) + dy));
      return;
    }
    // A glide in progress keeps its target and adds to it; otherwise start from where the page is.
    if (!wheelAnim || wheelAnim.el !== el) wheelAnim = { el, to: scrollPos(el), raf: 0 };
    wheelAnim.to = clampTo(wheelAnim.to + dy);
    if (wheelAnim.raf) return;
    const step = () => {
      const a = wheelAnim;
      if (!a) return;
      const cur = scrollPos(a.el), diff = a.to - cur;
      if (Math.abs(diff) < 2) { scrollSet(a.el, a.to); wheelAnim = null; return; }
      scrollSet(a.el, cur + diff * 0.28);
      // Stop if something else holds the page still (its end, or the reader dragging the bar).
      if (Math.abs(scrollPos(a.el) - cur) < 0.5) { wheelAnim = null; return; }
      a.raf = requestAnimationFrame(step);
    };
    wheelAnim.raf = requestAnimationFrame(step);
  }, { passive: false });

  // The "i" beside a space's name in the sidebar: what the space is for and what was recently
  // opened in it, in a centered dialog like Filters. It closes on the backdrop, the close
  // button, Escape, or opening anything in it.
  let infoEl = null;
  function closeSpaceInfo() {
    if (!infoEl) return;
    infoEl.remove();
    infoEl = null;
  }
  function openSpaceInfo(name) {
    closeSpaceInfo();
    const recent = recentRowsHtml(6, KINDS_OF_SPACE[name]);
    infoEl = document.createElement("div");
    infoEl.className = "modal-overlay";
    infoEl.innerHTML = `
      <div class="modal info-modal" role="dialog" aria-label="About ${SPACES[name].label}" data-tint="${name}">
        <div class="modal-head">
          <h3>${SPACES[name].label}</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="info-body">
          <p class="info-ask">${SPACES[name].ask}</p>
          <p class="info-intro">${SPACE_INTROS[name]}</p>
          <div class="info-label">Recently opened</div>
          ${recent ? `<div class="rc-list info-recent">${recent}</div>` : `<p class="hp-empty">Nothing opened here yet.</p>`}
        </div>
      </div>`;
    document.body.appendChild(infoEl);
    infoEl.addEventListener("click", e => {
      if (e.target === infoEl || e.target.closest(".modal-close") || e.target.closest("a")) closeSpaceInfo();
    });
    renderMath(infoEl);
    const x = infoEl.querySelector(".modal-close");
    if (x) x.focus();
  }
  document.addEventListener("click", e => {
    const btn = e.target.closest && e.target.closest(".nsh-info");
    if (btn) openSpaceInfo(btn.dataset.info);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSpaceInfo(); });
  window.addEventListener("hashchange", closeSpaceInfo);

  // Space switcher in the top bar: Practice opens its own page; the other spaces open the
  // subject last visited in them.
  const $spaceSwitch = document.getElementById("space-switch");
  if ($spaceSwitch) $spaceSwitch.addEventListener("click", e => {
    const b = e.target.closest("[data-space-go]");
    if (!b) return;
    clearSearch();
    closeDrawer();
    state.landing = false;
    const to = b.dataset.spaceGo === "practice" ? "#/practice" : spaceEntry(b.dataset.spaceGo);
    if (location.hash === to) render(); else location.hash = to;
    window.scrollTo({ top: 0 });
  });

  // Brand → back to the start (top of the first section).
  const $brand = document.getElementById("brand-home");
  if ($brand) $brand.addEventListener("click", () => {
    clearSearch();
    state.openGroup = null;
    goHash("");   // the logo returns to the front page
  });

  // Mobile section drawer: the hamburger slides the sidebar in over a backdrop.
  const $navToggle = document.getElementById("nav-toggle");
  const $navBackdrop = document.getElementById("nav-backdrop");
  function openDrawer() {
    document.body.classList.add("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = false;
  }
  function closeDrawer() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = true;
  }
  if ($navToggle) $navToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) closeDrawer(); else openDrawer();
  });
  if ($navBackdrop) $navBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  // Lists → the study-lists overview.
  const $listsBtn = document.getElementById("lists-btn");
  if ($listsBtn) $listsBtn.addEventListener("click", () => {
    clearSearch();
    if (getRoute().type === "lists") return;
    if (location.hash === "#/lists") render(); else location.hash = "#/lists";
    window.scrollTo({ top: 0 });
  });

  // Database → the problem-database browse page.
  const $dbBtn = document.getElementById("db-btn");
  if ($dbBtn) $dbBtn.addEventListener("click", () => {
    clearSearch();
    if (getRoute().type === "problems") return;
    if (location.hash === "#/problems") render(); else location.hash = "#/problems";
    window.scrollTo({ top: 0 });
  });

  // Light / dark theme (persisted; default dark), now chosen on the Settings page rather than
  // by a lone topbar toggle. The early inline script in index.html applies the saved choice
  // before paint to avoid a flash, which is why this keeps its own localStorage key instead of
  // joining mq-settings — that store is parsed far too late to help.
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(v) {
    const next = v === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  }

  // The sidebar is built once at startup and owns a delegated listener, so wiki mode cannot
  // rebuild it. A root attribute lets CSS fold the subsection lists away instead.
  function applyLayout() {
    const r = document.documentElement;
    r.setAttribute("data-layout", state.layout);
    r.setAttribute("data-density", state.density);
    r.setAttribute("data-text", state.text);
    r.setAttribute("data-tags", state.tags ? "on" : "off");
    r.setAttribute("data-captions", state.captions);
    r.setAttribute("data-cols", state.cols);
  }

  // The latex a card shows. A card may carry latexPlain, the same statement written out
  // instead of in sigma notation; only some do, and the rest simply keep their own form.
  function latexFor(f) {
    return (state.notation === "expanded" && f.latexPlain) ? f.latexPlain : f.latex;
  }

  // The same choice inside a write-up. Key forms write a sum both ways as
  // \alt{sigma form}{expanded form}, and this keeps the branch the reader asked for before
  // KaTeX ever sees the text, so the page holds one form, not a visible one and a hidden one,
  // and a copied formula is the one on screen. Braces escaped as \{ \} (set braces) are
  // not grouping braces and are skipped when matching.
  function notate(text) {
    if (!text || text.indexOf("\\alt{") < 0) return text;
    const pick = state.notation === "expanded" ? 1 : 0;
    let out = "", i = 0;
    for (;;) {
      const j = text.indexOf("\\alt{", i);
      if (j < 0) return out + text.slice(i);
      out += text.slice(i, j);
      const groups = [];
      let k = j + 4;
      while (groups.length < 2 && text[k] === "{") {
        let depth = 0;
        const st = k;
        for (; k < text.length; k++) {
          if (text[k - 1] === "\\") continue;
          if (text[k] === "{") depth++;
          else if (text[k] === "}" && --depth === 0) break;
        }
        groups.push(text.slice(st + 1, k));
        k++;
      }
      if (groups.length < 2) { out += "\\alt"; i = j + 4; continue; }
      out += groups[pick];
      i = k;
    }
  }
  applyLayout();

  // Links that open a page at one of its parts (the home page's "Make a list" and "Open a list"
  // go to the lists on the Practice page): once the page has rendered, scroll the part into view
  // and put the cursor in it when it is a text box.
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-goto]");
    if (!a) return;
    const id = a.getAttribute("data-goto");
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        (el.closest(".hp-panel") || el).scrollIntoView({ block: "center" });
        if (el.tagName === "INPUT") el.focus({ preventScroll: true });
      } else if (++tries < 40) setTimeout(seek, 25);
    };
    setTimeout(seek, 0);
  });

  // Settings → the preferences page.
  const $settingsBtn = document.getElementById("settings-btn");
  if ($settingsBtn) $settingsBtn.addEventListener("click", () => {
    clearSearch();
    if (getRoute().type === "settings") return;
    if (location.hash === "#/settings") render(); else location.hash = "#/settings";
    window.scrollTo({ top: 0 });
  });

  // ---------- Filters popup ----------
  // One filter for the whole app: contest tier, importance within the subsection, and contest
  // level. The counts show how many cards each chip belongs to across the whole reference.
  function filterCounts() {
    const c = { tiers: {}, importances: {} };
    TIER_KEYS.forEach(k => { c.tiers[k] = 0; });
    IMP_TIERS.forEach(k => { c.importances[k] = 0; });
    ALL.forEach(e => {
      const t = tierKey(e.formula), i = e.formula.importance;
      if (t in c.tiers) c.tiers[t]++;
      if (i in c.importances) c.importances[i]++;
    });
    return c;
  }
  function updateGearActive() {
    const g = document.getElementById("filters-btn");
    if (g) g.classList.toggle("has-filters", filterActive());
  }
  let settingsEl = null;
  function onSettingsKey(e) { if (e.key === "Escape") closeSettings(); }
  function closeSettings() {
    if (!settingsEl) return;
    settingsEl.remove(); settingsEl = null;
    document.removeEventListener("keydown", onSettingsKey, true);
    updateGearActive();
  }
  function refreshSettingsControls() {
    if (!settingsEl) return;
    const af = state.filter;
    settingsEl.querySelectorAll("[data-tier]").forEach(b => b.classList.toggle("active", af.tiers.has(b.dataset.tier)));
    settingsEl.querySelectorAll("[data-imp]").forEach(b => b.classList.toggle("active", af.importances.has(b.dataset.imp)));
  }
  function afterFilterChange() {
    saveSettings(); updateGearActive(); render(); refreshSettingsControls();
  }
  function openSettings() {
    if (settingsEl) { closeSettings(); return; }
    const counts = filterCounts();
    const af = state.filter;
    const TIER_NAMES = { "amc": "AMC", "aime-early": "AIME Early", "aime-late": "AIME Late", "olympiad": "Olympiad" };
    const IMP_NAMES = { high: "High", medium: "Medium", low: "Low", lower: "Lower", lowest: "Lowest" };
    const chips = (keys, names, set, attr, count) => keys.map(k =>
      `<button class="filter-chip${set.has(k) ? " active" : ""}" data-${attr}="${k}">${names[k]} <span class="fc-count">${count[k] || 0}</span></button>`).join("");
    settingsEl = document.createElement("div");
    settingsEl.className = "modal-overlay";
    settingsEl.innerHTML = `
      <div class="modal settings-modal" role="dialog" aria-label="Filters">
        <div class="modal-head">
          <h3>Filters</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="settings-body">
          <div class="settings-group">
            <div class="settings-group-title">Contest tier</div>
            <div class="filter-chips" id="s-tiers">${chips(TIER_KEYS, TIER_NAMES, af.tiers, "tier", counts.tiers)}</div>
          </div>
          <div class="settings-group">
            <div class="settings-group-title">Importance within its subsection</div>
            <div class="filter-chips" id="s-imps">${chips(IMP_TIERS, IMP_NAMES, af.importances, "imp", counts.importances)}</div>
            <p class="settings-hint">Filters apply everywhere cards are listed by subject, group, or topic, and the sidebar counts follow them. At least one choice in each row stays on.</p>
          </div>
          <div class="settings-actions"><button class="settings-reset" id="s-reset">Reset filters</button></div>
        </div>
      </div>`;
    document.body.appendChild(settingsEl);
    settingsEl.addEventListener("click", onSettingsClick);
    setTimeout(() => document.addEventListener("keydown", onSettingsKey, true), 0);
  }
  function onSettingsClick(e) {
    if (e.target === settingsEl || e.target.closest(".modal-close")) { closeSettings(); return; }
    const af = state.filter;
    const flip = (set, k) => {
      if (set.has(k)) { if (set.size > 1) set.delete(k); } else set.add(k);
      afterFilterChange();
    };
    const tc = e.target.closest("[data-tier]");
    if (tc) { flip(af.tiers, tc.dataset.tier); return; }
    const ic = e.target.closest("[data-imp]");
    if (ic) { flip(af.importances, ic.dataset.imp); return; }
    if (e.target.closest("#s-reset")) {
      af.tiers = new Set(TIER_KEYS); af.importances = new Set(IMP_TIERS);
      afterFilterChange(); return;
    }
  }
  const $filters = document.getElementById("filters-btn");
  if ($filters) $filters.addEventListener("click", openSettings);
  const $adv = document.getElementById("adv-btn");
  if ($adv) $adv.addEventListener("click", openAdvanced);
  updateGearActive();

  // "/" jumps to search, except while typing in any other field: a widget that takes fractions
  // like 7/2 would otherwise lose the keystroke and the focus.
  const typingIn = el => !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== $search && !typingIn(document.activeElement)) {
      e.preventDefault();
      // When the box is already on screen (the sticky top bar on a wide window), a plain focus()
      // still scrolled the page up by the scroll padding, so the page is told not to move. On a
      // narrow screen the bar scrolls away with the page, and then the box is brought into view.
      const r = $search.getBoundingClientRect();
      // The bar is at the top of the page, so going to the very top shows it; scrolling to just
      // short of the top let the cards above, still being typeset, push the page back down.
      if (r.top < 0 || r.bottom > innerHeight) window.scrollTo(0, 0);
      $search.focus({ preventScroll: true });
      $search.select();
    } else if (e.key === "Escape" && document.activeElement === $search) {
      clearSearch();
      render();
      $search.blur();
    }
  });

  // Hover previews for [[card links]]. mouseenter does not bubble, so delegate on
  // mouseover/mouseout and gate on which element the pointer actually crossed into.
  $content.addEventListener("mouseover", e => {
    const a = e.target.closest(".card-link");
    if (!a) return;
    clearTimeout(cpTimer); clearTimeout(cpHide);
    if (cpFor === a) return;
    const at = { x: e.clientX, y: e.clientY };
    cpTimer = setTimeout(() => { cpAt = at; showCardPreview(a); }, 400);
  });
  $content.addEventListener("mouseout", e => {
    const a = e.target.closest(".card-link");
    if (!a) return;
    if (e.relatedTarget && (a.contains(e.relatedTarget) || (cpEl && cpEl.contains(e.relatedTarget)))) return;
    scheduleHideCardPreview();
  });
  window.addEventListener("scroll", hideCardPreview, { passive: true });
  // Clicking the link navigates natively, so without these the box outlives the page it
  // belonged to and reappears at its old page coordinates in the corner of the new one.
  $content.addEventListener("click", e => { if (e.target.closest(".card-link")) hideCardPreview(); });
  window.addEventListener("hashchange", hideCardPreview);

  // navigator.clipboard is a secure-context API: it is undefined on a plain-http origin,
  // which is exactly what a classroom or LAN server is. Both copy buttons used to call it
  // with a bare .then(), so on such a deployment the click threw a TypeError and the reader
  // saw nothing at all. Try the modern API, fall back to the old textarea trick, and only
  // then admit defeat -- and say so out loud rather than failing silently.
  function copyText(str) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(str).catch(() => legacyCopy(str));
    }
    return legacyCopy(str);
  }
  function legacyCopy(str) {
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = str;
      // Off-screen rather than hidden: display:none cannot be selected.
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-1000px;left:-1000px;opacity:0";
      document.body.appendChild(ta);
      try {
        ta.select();
        document.execCommand("copy") ? resolve() : reject(new Error("execCommand refused"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }
  // Shared success/failure handling so both buttons behave the same way.
  function copyInto(btn, str, label) {
    copyText(str).then(() => {
      btn.textContent = "copied!";
      btn.classList.add("copied");
      setTimeout(() => { btn.textContent = label; btn.classList.remove("copied"); }, 1200);
    }).catch(() => {
      toast("Couldn't copy &mdash; this browser blocks clipboard access here.");
    });
  }

  $content.addEventListener("click", e => {
    if (e.target.closest("[data-history-back]")) { e.preventDefault(); history.back(); return; }
    // Home page: a book or subject opens its section page.
    const go = e.target.closest("[data-go-section]");
    if (go) {
      e.preventDefault();
      clearSearch();
      const num = v => v === undefined ? null : +v;
      goHash(sectionHash(go.dataset.goSection, { sub: num(go.dataset.goSub), topic: num(go.dataset.goTopic), cluster: num(go.dataset.goCluster) }));
      return;
    }
    const asyBtn = e.target.closest(".copy-asy-btn");
    if (asyBtn) {
      const svgs = [...$content.querySelectorAll(".detail .diagram svg")];
      if (svgs.length) {
        // Several figures go over as one paste, but a reader has to see where one ends and
        // the next begins, so they are fenced rather than merely concatenated.
        const asy = svgs.length === 1 ? svgToAsy(svgs[0]) : svgs.map((g, i) =>
          `// ---------- figure ${i + 1} of ${svgs.length} ----------\n${svgToAsy(g)}`
        ).join("\n\n");
        copyInto(asyBtn, asy, "Copy Asymptote");
      }
      return;
    }
    const btn = e.target.closest(".copy-btn");
    if (btn) {
      copyInto(btn, toCopyLatex(btn.dataset.latex), "Copy LaTeX");
      return;
    }
    const starBtn = e.target.closest(".star-btn");
    if (starBtn) {
      const id = starBtn.dataset.star;
      toggleMembership("starred", id);
      const route = getRoute();
      if (route.type === "list" || route.type === "lists") {
        render();
      } else {
        syncStarButtons(id);
        refreshAddListButtons(id);
      }
      return;
    }
    const sol = e.target.closest(".sol-toggle");
    if (sol) {
      const panel = document.getElementById(sol.dataset.target);
      panel.hidden = !panel.hidden;
      sol.textContent = panel.hidden ? "Show solution" : "Hide solution";
      return;
    }
    const lmore = e.target.closest(".list-more");
    if (lmore) {
      const grid = document.getElementById(lmore.dataset.target);
      const collapsed = grid.classList.toggle("is-collapsed");
      lmore.textContent = collapsed ? lmore.dataset.more : lmore.dataset.less;
      lmore.setAttribute("aria-expanded", collapsed ? "false" : "true");
      return;
    }
    const tag = e.target.closest(".tag");
    if (tag) {
      $search.value = tag.dataset.tag;
      state.query = tag.dataset.tag;
      stripHash();
      render();
      window.scrollTo({ top: 0 });
      return;
    }
    const addlistBtn = e.target.closest(".addlist-btn");
    if (addlistBtn) { openListMenu(addlistBtn, addlistBtn.dataset.addlist); return; }
    const addRow = e.target.closest("[data-list-add-id]");
    if (addRow) {
      const box = addRow.closest("[data-list-add]");
      const listId = box.dataset.listAdd, fid = addRow.dataset.listAddId;
      toggleMembership(listId, fid);
      const q = box.querySelector(".list-add-input").value;
      // Re-render the list so the count and the card grid pick the change up, then put the
      // search box back the way it was so several cards can be added in one go.
      renderListDetail(listId);
      const box2 = $content.querySelector("[data-list-add]");
      if (box2) {
        const input = box2.querySelector(".list-add-input");
        input.value = q;
        renderListAddResults(box2, listId, q);
        input.focus();
      }
      return;
    }
    const topicChip = e.target.closest(".topic-chip");
    if (topicChip) { location.hash = "#/topic/" + topicChip.dataset.topic; window.scrollTo({ top: 0 }); return; }
    const grp = e.target.closest("[data-list-group]");
    if (grp) { state.autoGroup = !state.autoGroup; saveSettings(); render(); return; }
    const rn = e.target.closest("[data-list-rename]");
    if (rn) {
      const l = getList(rn.dataset.listRename);
      if (l) { const name = prompt("Rename list:", l.name); if (name && name.trim()) { renameList(l.id, name); render(); } }
      return;
    }
    const del = e.target.closest("[data-list-delete]");
    if (del) {
      const l = getList(del.dataset.listDelete);
      if (l && confirm(`Delete the list “${l.name}”? The formulas themselves are not affected.`)) { deleteList(l.id); location.hash = "#/practice"; }
      return;
    }
    const clr = e.target.closest("[data-list-clear]");
    if (clr) {
      const l = getList(clr.dataset.listClear);
      if (l && confirm(`Remove all ${liveCount(l)} formulas from “${l.name}”?`)) { l.ids = []; saveLists(); render(); }
      return;
    }
    // Both back links go to "#", which renders search results whenever a query is live. So
    // each sets up what "#" should show before the link navigates: the search one puts the
    // saved query back (the box may have been edited since), the section one clears it --
    // which it never used to, so after a search "Back to Geometry" landed on the results.
    if (e.target.closest("[data-back-search]") && backFromSearch) {
      state.query = backFromSearch.query; $search.value = backFromSearch.query;
      state.adv = backFromSearch.adv;
    } else if (e.target.closest("[data-back-section]")) {
      clearSearch();
      state.landing = false;
    }
    if (e.target.closest("a")) return; // let real links (related items, back link) navigate
    const card = e.target.closest(".card[data-id]");
    if (card) {
      openFormula(card.dataset.id);
    }
  });

  let listAddTimer = 0;
  $content.addEventListener("input", e => {
    const box = e.target.closest("[data-list-add]");
    if (!box) return;
    clearTimeout(listAddTimer);
    const q = e.target.value;
    listAddTimer = setTimeout(() => renderListAddResults(box, box.dataset.listAdd, q), 140);
  });

  $content.addEventListener("submit", e => {
    const nf = e.target.closest("#lists-new-form");
    if (nf) {
      e.preventDefault();
      const inp = document.getElementById("lists-new-name");
      const name = inp ? inp.value.trim() : "";
      if (!name) { if (inp) inp.focus(); return; }
      location.hash = "#/list/" + createList(name);
    }
  });

  window.addEventListener("hashchange", () => {
    clearTimeout(scrollSaveTimer);
    legacyRedirect();
    try { if (/^#\/(?!settings)/.test(location.hash)) localStorage.setItem("mq-last", location.hash); } catch (e) {}
    const route = getRoute();
    render();
    // A revisited entry (Back or Forward) returns to where the reader was on it; a fresh click
    // opens at the top. #/settings/commands scrolls to its own anchor (renderSettingsPage).
    if (!(route.type === "settings" && route.anchor)) scrollForRoute(route, history.state && typeof history.state.y === "number" ? history.state.y : null, history.state);
  });

  // ---------- Init ----------

  // We manage scroll position ourselves (see hashchange), so stop the browser
  // from also restoring scroll on back/forward and fighting us.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // Opening the bare address can skip the front page (Settings: "When the app opens").
  if ((!location.hash || location.hash === "#") && state.start !== "landing") {
    let to = null;
    if (state.start === "last") { try { to = localStorage.getItem("mq-last"); } catch (e) {} }
    if (!to || !/^#\/(?!settings)/.test(to)) to = spaceEntry("formulas");
    history.replaceState(null, "", to);
  }
  legacyRedirect();
  try { if (/^#\/(?!settings)/.test(location.hash)) localStorage.setItem("mq-last", location.hash); } catch (e) {}
  buildSidebar();
  render();
  scrollForRoute(getRoute(), null);

  // ---------- Debug / evaluation hook ----------
  // The search internals are otherwise sealed inside this IIFE, which meant every
  // relevance measurement so far was taken by hand-patching a temporary export in
  // and out of this file. tools/search-eval.html needs a stable, synchronous entry
  // point (the UI path is debounced, and a background tab throttles its timers),
  // so expose one — gated on ?debug=1 so nothing is added to the normal page.
  if (/[?&]debug=1\b/.test(location.search)) {
    // A search index built before the last few cards were added still loads, still answers,
    // and is quietly wrong -- CONVENTIONS makes checking it a manual step, which is exactly
    // the kind of step that gets skipped. Poll until the lazy index reports in, then say so.
    (function watchIndexFreshness(tries) {
      const SEMI = window.MathSemantic;
      const info = SEMI && SEMI.info ? SEMI.info() : null;
      // info() reports {state} while the index is idle, loading or failed, and the full
      // description -- with no `state` key -- once it is ready. Keep polling through both
      // "idle" (nothing has triggered the lazy fetch yet) and "loading"; checking only for
      // "loading" compared an undefined card count and warned about a healthy index.
      if (!info || info.state === "idle" || info.state === "loading") {
        if (tries > 0) setTimeout(() => watchIndexFreshness(tries - 1), 500);
        return;
      }
      if (info.state === "failed") {
        console.warn("[search] semantic index failed to load - results are lexical-only.");
      } else if (info.cards !== ALL.length) {
        console.warn("[search] STALE INDEX: vectors cover " + info.cards +
                     " cards but the library has " + ALL.length +
                     ". Rebuild with tools/build-search-index.py before trusting any score.");
      }
    })(20);

    window.__mathSearch = {
      searchFormulas,
      entries: ALL,
      byId: BY_ID,
      scoreEntry,
      bigramsOf,
      spokenLatex,
      idfOf,
      // Grid-search support: override K1 / COVERAGE weighting / field boosts and
      // recompute the cached per-field length divisors, without reloading.
      fields: FIELDS,
      semantic: function () { return window.MathSemantic; },
      tune(cfg) {
        if (cfg.k1 != null) K1 = cfg.k1;
        if (cfg.corrob != null) CORROB = cfg.corrob;
        if (cfg.scale != null) SCALE = cfg.scale;
        if (cfg.synW != null) SYN_W = cfg.synW;
        if (cfg.rrfK != null) RRF_K = cfg.rrfK;
        if (cfg.rrfKSem != null) RRF_K_SEM = cfg.rrfKSem;
        if (cfg.rrfLex != null) RRF_LEX = cfg.rrfLex;
        if (cfg.rrfSem != null) RRF_SEM = cfg.rrfSem;
        if (cfg.rrfMargin != null) RRF_MARGIN = cfg.rrfMargin;
        if (cfg.rrfMinTokens != null) RRF_MIN_TOKENS = cfg.rrfMinTokens;
        if (cfg.rrfSimLo != null) RRF_SIM_LO = cfg.rrfSimLo;
        if (cfg.rrfSimHi != null) RRF_SIM_HI = cfg.rrfSimHi;
        if (cfg.bigramW != null) BIGRAM_W = cfg.bigramW;
        if (cfg.w) FIELDS.forEach(f => { if (cfg.w[f.key] != null) f.w = cfg.w[f.key]; });
        if (cfg.b) FIELDS.forEach(f => { if (cfg.b[f.key] != null) f.b = cfg.b[f.key]; });
        ALL.forEach(e => {
          e.fieldNorm = FIELDS.map(f => {
            const size = e[f.key] ? e[f.key].size : 0;
            return 1 - f.b + f.b * (size / f.avg);
          });
        });
        return { k1: K1, fields: FIELDS.map(f => ({ key: f.key, w: f.w, b: f.b })) };
      },
      // Rank of a card id for a query, 1-based; 0 when it does not appear.
      rankOf(query, id) {
        const r = searchFormulas(query).results || [];
        for (let i = 0; i < r.length; i++) {
          const e = r[i].entry || r[i];
          if ((e.formula ? e.formula.id : e.id) === id) return i + 1;
        }
        return 0;
      },
      topIds(query, n) {
        return (searchFormulas(query).results || []).slice(0, n || 10)
          .map(r => { const e = r.entry || r; return e.formula ? e.formula.id : e.id; });
      }
    };
  }
})();
