// Competition Math Reference — navigation, rendering, tag-based search, filters, sorting.
(function () {
  const SECTIONS = window.MATH_SECTIONS || [];
  const uiIcon = window.AppIcons.svg;
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
  const STRATEGY_MODES = ["click", "show"];   // Click to show is the default (owner, 2026-10-31)
  // Figure captions on the browsing cards. A card's own page always shows them, since there
  // the caption is part of the explanation; on the card grid some readers want just the picture.
  const CAPTION_MODES = ["show", "hide"];
  // A card page can carry a Wikipedia-style column of page tools on the right (off by default).
  const TOOLS_MODES = ["off", "on"];
  // A card link in a lesson: open the card in the drawer beside the lesson, or go to its page.
  const LESSON_LINK_MODES = ["drawer", "card"];
  // How wide a lesson's explanation runs (owner, 2026-11-08): a 760px reading width, or the full column.
  const LESSON_WIDTHS = ["reading", "full"];
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
  const START_MODES = ["landing", "formulas"];
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
      strategy: P.strategyChosen ? pick(P.strategy, STRATEGY_MODES) : STRATEGY_MODES[0],
      strategyChosen: !!P.strategyChosen,
      captions: pick(P.captions, CAPTION_MODES),
      tools: pick(P.tools, TOOLS_MODES),
      lessonLinks: pick(P.lessonLinks, LESSON_LINK_MODES),
      lessonWidth: pick(P.lessonWidth, LESSON_WIDTHS),
      cols: pick(P.cols, ["regular", "spacious"]),
      scroll: pick(P.scroll, SCROLL_SPEEDS),
      start: P.start === "last" ? "formulas" : pick(P.start, START_MODES),  // "Where I left off" was removed (2026-10-23)
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
          tools: state.tools, strategy: state.strategy, strategyChosen: !!state.strategyChosen, lessonLinks: state.lessonLinks, lessonWidth: state.lessonWidth
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
    space: "formulas",           // formulas | methods | patterns | learn | practice: which space the page belongs to
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
    lessonLinks: _loaded.lessonLinks, // "drawer" | "card" — a lesson's card links open beside it or go to the card
    lessonWidth: _loaded.lessonWidth, // "reading" | "full" — a lesson's explanation at 760px or across the column
    strategy: _loaded.strategy,  // "show" | "click" — a problem page's strategy shown, or behind a button
    strategyChosen: _loaded.strategyChosen,
    cols: _loaded.cols,          // "regular" | "spacious" — how wide the cards in a grid are
    scroll: _loaded.scroll,      // "normal" | "slow" | "fast" — mouse-wheel and trackpad scroll speed
    start: _loaded.start,        // "landing" | "formulas" — where the app opens when no page is asked for
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
    formulas: { label: "Formulas", ask: "Theorems and identities", intro: "Facts, theorems, and identities to recall.", groupWord: "topics" },
    methods: { label: "Methods", ask: "Moves that make progress", intro: "Moves you can make to progress on a problem.", groupWord: "method groups" },
    patterns: { label: "Patterns", ask: "Problem shapes to recognize", intro: "Problem shapes to learn to recognize.", groupWord: "pattern families" }
  };
  const SPACES = {
    formulas: { label: "Formulas", ask: "Theorems and identities" },
    methods: { label: "Methods", ask: "Moves that make progress" },
    patterns: { label: "Patterns", ask: "Problem shapes to recognize" },
    learn: { label: "Learn", ask: "Textbooks, lesson by lesson" },
    practice: { label: "Practice", ask: "Real contest problems" }
  };
  // The space a page belongs to; search, settings and topic pages keep the current one.
  function spaceFor(route) {
    if (route.type === "space") return route.name;
    if (route.type === "formula") return bookOf(route.entry.section);
    if (["problems", "problem", "browse"].indexOf(route.type) !== -1) return "practice";
    if (["lists", "list", "learn"].indexOf(route.type) !== -1) return "learn";
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
    "rationalizing": ["sequences-series", "complex-numbers"],
    // "transformations" is about moving the plane (reflections, rotations, homotheties,
    // inversion). These cards matched it on a word used in another sense: an arithmetic
    // inversion, a count up to rotation, a reflected lattice path, a translated equation.
    "mobius-inversion": ["transformations"], "dirichlet-convolution": ["transformations"],
    "circular-permutations": ["transformations"], "necklace-formula": ["transformations"],
    "burnsides-lemma": ["transformations"], "ballot-problem": ["transformations"],
    "minkowski-inequality": ["transformations"], "conic-sections": ["transformations"]
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
      "erdos-szekeres", "extremal-principle", "handshake-lemma", "pigeonhole"
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
    // The problem database was folded into the Practice page; the lists overview now lives
    // under Learn (owner, 2026-10-31).
    else if (h === "#/problems") to = "#/practice";
    else if (h === "#/lists" || h === "#/learn/lists") to = "#/learn";
    // The By Contest lists were removed (owner, 2026-10-31): the study routes cover them.
    else if (/^#\/list\/contest-(amc8|amc10|amc12|aime)$/.test(h)) to = "#/learn";
    if (to) history.replaceState(null, "", to);
  }
  // Go to an address; when it is already the address, re-render instead (no hashchange fires).
  function goHash(h) {
    if (location.hash === h || (!h && !location.hash)) { render(); scrollForRoute(getRoute(), null); window.AppAccessibility.focusMain(); }
    else location.hash = h;
  }

  // A card merged into another keeps working at its old address, so bookmarks and shared
  // links land on the card that absorbed it.
  const MERGED_IDS = { "sp-substitution": "symmetric-polynomial-strategies", "picks-triangular-lattice": "picks-theorem-general", "hexagon-diagonals": "regular-hexagon-area", "cyclic-quad-diagonals": "ptolemy-second-theorem", "same-remainder": "subtract-equal-remainders", "ramsey-33": "pigeonhole" };
  function getRoute() {
    let m = location.hash.match(/^#\/f\/([\w-]+)$/);
    if (m && BY_ID[m[1]]) return { type: "formula", entry: BY_ID[m[1]] };
    if (m && BY_ID[MERGED_IDS[m[1]]]) return { type: "formula", entry: BY_ID[MERGED_IDS[m[1]]] };
    m = location.hash.match(/^#\/list\/([\w-]+)$/);
    if (m && anyList(m[1])) return { type: "list", listId: m[1] };
    if (/^#\/lists$/.test(location.hash)) return { type: "lists" };
    m = location.hash.match(/^#\/problems(?:\/([a-z0-9-]+)\/(\d{4})(?:\/([a-z0-9-]+))?)?$/);
    if (m) return { type: "problems", fam: m[1] || null, year: m[2] ? +m[2] : null, paper: m[3] || null };
    m = location.hash.match(/^#\/browse\/(topics|difficulty)(?:\/([\w.-]+)(?:\/(\d+))?)?$/);
    if (m) return m[1] === "topics" ? { type: "browse", kind: "topics", node: m[2] || null } : { type: "browse", kind: "difficulty", bin: m[3] ? +m[3] : /^\d+$/.test(m[2] || "") ? +m[2] : null };
    m = location.hash.match(/^#\/problem\/([\w-]+)$/);
    if (m && PROBLEM_BY_SLUG[m[1]]) return { type: "problem", slug: m[1] };
    // One tag page for every way in: a topic chip, a problem's type chip, the "Browse by Tag"
    // picker, and old #/topic/<id> addresses. #/tag/ takes one label or several joined by "+".
    m = location.hash.match(/^#\/topic\/([\w-]+)$/);
    if (m && TOPICS_BY_ID[m[1]]) return { type: "topic", labels: [TOPICS_BY_ID[m[1]].label] };
    m = location.hash.match(/^#\/tag\/(.+)$/);
    if (m) {
      let labels = [];
      try { labels = m[1].split("+").map(decodeURIComponent).filter(Boolean); } catch (e) {}
      if (labels.length) return { type: "topic", labels };
    }
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
    if (/^#\/practice\/set(?:\/[^/]+(?:\/review)?)?$/.test(location.hash)) return { type: "space", name: "practice", practiceSet: true };
    if (location.hash === "#/practice") return { type: "space", name: "practice" };
    if (location.hash === "#/learn") return { type: "space", name: "learn" };
    const lr = learnRoute(location.hash);
    if (lr) return lr;
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
    if (i === -1) l.ids.push(fid);
    else {
      l.ids.splice(i, 1);
      if (Array.isArray(l.groupedIds)) l.groupedIds = l.groupedIds.filter(id => id !== fid);
      for (const key of ["customSections", "customOff"]) {
        if (Array.isArray(l[key])) l[key].forEach(sec => { sec.ids = sec.ids.filter(id => id !== fid); });
      }
    }
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
    let title = (name || "").trim();
    if (!title) {
      const taken = new Set(lists.items.map(l => l.name));
      title = "Untitled list";
      let next = 2;
      while (taken.has(title)) title = "Untitled list " + next++;
    }
    lists.items.push({ id, name: title, ids: [] });
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
    return `<button class="star-btn${on ? " starred" : ""}" data-star="${id}" aria-label="Star for later" aria-pressed="${on}" title="${on ? "Starred" : "Star for later"}">${uiIcon(on ? "star" : "star-outline")}</button>`;
  }
  // Add-to-list opener: a plain "+".
  function addListBtnHtml(id) {
    return `<button class="addlist-btn" data-addlist="${id}" title="Add to a study list" aria-label="Add to a study list">${uiIcon("plus")}</button>`;
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

  // SVG glyphs: gold star for the built-in Starred list, a
  // small accent diamond for every other list.
  function listGlyph(l) {
    return l.id === "starred" ? `<span class="list-star">${uiIcon("star")}</span>` : `<span class="list-ico">${uiIcon("diamond")}</span>`;
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
      <form class="lm-new"><input type="text" placeholder="New list name&hellip;" aria-label="New list name" maxlength="40" autocomplete="off"><button type="submit" class="hp-btn hp-btn-soft">Create</button></form>`;
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
      b.classList.toggle("starred", on); b.innerHTML = uiIcon(on ? "star" : "star-outline");
      b.title = on ? "Starred" : "Star for later";
      b.setAttribute("aria-pressed", String(on));
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
      // Anywhere a formula NAME can appear needs to be on this list: thirty card names carry
      // LaTeX ("Powers of $x + 1/x$", "Trailing Zeros of $n!$"), and a surface left off here
      // shows the raw dollar signs instead of typesetting them (the link rows, the recent rows
      // and the Did-you-know footer were, until 2026-10-30).
      container.querySelectorAll(".book-search-option, .practice-explanation, .practice-topic-option, .lar-name, .card-desc, .card-name, .card-example, .detail-body, .key-forms, .related-item, .problem-q, .problem-sol, .strat-name, .prob-strategy, .prob-strategy-box, .trick-prose, .cp-head, .cp-desc, .wiki-list a, .dym-link, .card-lead, .lead-box, .contest-profile, .supp-math, .prob-chain, .lp-sol, .prob-think, .sp-chain, .tt-title, .tt-sample, .tt-blurb, .topic-blurb, .topic-step, .ix-cards, .ix-topic, .rc-name, .rs-box, .hw-example, .back-link, .prob-statement, .dyk-fact, .dyk-foot, .card-link, .rc-meta, .lb-shelf, .learn-h, .lb-lessons, .lb-chapters, .bk-bar-t, .bk-foot-t, .bk-ch-title, .bk-toc, .home-cotd, .lc-q, .lc-result, .lx-q, .lx-s, .lp-related, .lp-strategies, .ge, .list-section-title").forEach(el => {
        if (skip(el) || el.hasAttribute("data-description-formatted")) return;
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
      ? `<span class="card-crumb">${entry.section.title} ${uiIcon("chevron-right")} ${entry.subsection.title}</span>`
      : "";
    return `
      <article class="card card-${kindOf(f)}" data-id="${f.id}" id="f-${f.id}">
        <div class="card-head">
          <h4 class="card-name"><a href="#/f/${f.id}">${f.name}</a></h4>
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
        <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
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
  // Printing (owner, 2026-10-31): cards far down a page are typeset only as they come near the
  // screen, so before a print every card still waiting is typeset, or its math would print raw.
  // This runs for the browser's own Print as well as for a list's "Print this list".
  function prepareMathForPrint() {
    const waiting = [...$content.querySelectorAll('.card[data-math="0"]')];
    waiting.forEach(c => {
      c.dataset.math = "1";
      if (fitObserver) fitObserver.unobserve(c);
      renderMath(c);
    });
    if (waiting.length) fitBatch(waiting.flatMap(c => [...c.querySelectorAll(".formula-display[data-latex]")]));
  }
  window.addEventListener("beforeprint", prepareMathForPrint);
  if (window.matchMedia) {
    const pm = window.matchMedia("print");
    if (pm.addEventListener) pm.addEventListener("change", e => { if (e.matches) prepareMathForPrint(); });
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
  // Historical paper-position thirds, kept for the statistics page's chart.
  // Picker difficulty uses Elo rank within the selected pool, independently of these charts.
  let FAM_MAXNUM = null;
  // Where the problem sits in its paper, from near 0 (the first problem) to 1 (the last).
  function paperPos(p) {
    if (!FAM_MAXNUM) { FAM_MAXNUM = {}; PROBLEM_DB.forEach(q => { FAM_MAXNUM[q.fam] = Math.max(FAM_MAXNUM[q.fam] || 0, q.num); }); }
    return p.num / (FAM_LENGTH[p.fam] || FAM_MAXNUM[p.fam] || 25);
  }
  function paperPositionBand(p) {
    const r = paperPos(p);
    return r <= 1 / 3 ? "easy" : r <= 2 / 3 ? "medium" : "hard";
  }
  // An estimate of difficulty across contests, for putting a mixed list in rising order
  // (owner, 2026-10-31): the contest's level plus the place in its paper. The offsets say roughly
  // where each contest starts against the others (an early AIME problem is about as hard as a
  // late AMC 12 one); they order a list, they are not a rating.
  const FAM_LEVEL = { "AMC 8": 0, "AMC 10": 0.6, "AMC 12": 0.85, "AIME": 1.7, "HMMT November": 1.9, "ARML": 1.8, "SMT": 1.9, "HMMT February": 2.2, "HMMT": 2.2, "Putnam": 3 };
  function difficultyScore(p) { return (FAM_LEVEL[p.fam] != null ? FAM_LEVEL[p.fam] : 2) + paperPos(p); }
  // Contest profile (rebuilt 2026-11-11, now that every problem has a rating and a place in the
  // topic tree): a strip of headline figures, then label-and-value rows. Everything is computed
  // from the card's tagged problems except the authored Role sentence.
  const ordinal = n => { const t = n % 100, u = n % 10; return n + (t >= 11 && t <= 13 ? "th" : u === 1 ? "st" : u === 2 ? "nd" : u === 3 ? "rd" : "th"); };
  const quantile = (sorted, q) => { const i = (sorted.length - 1) * q, lo = Math.floor(i), hi = Math.min(sorted.length - 1, lo + 1); return Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo)); };
  // Five-year periods counted back from the latest paper, so the newest period is a full one.
  const PF_ERA = 5;
  let PF_LAST = 0;
  const eraOf = y => { PF_LAST = PF_LAST || Math.max(...PROBLEM_DB.map(p => p.year)); return PF_LAST - PF_ERA * Math.floor((PF_LAST - y) / PF_ERA) - PF_ERA + 1; };
  // What a card is measured against: every problem, by contest and by five-year period, every
  // rating in order, and how many problems each card of a kind has.
  let PF_CORPUS = null;
  function pfCorpus() {
    if (PF_CORPUS) return PF_CORPUS;
    const fam = {}, era = {}, elos = [], use = { formula: [], method: [], pattern: [] };
    PROBLEM_DB.forEach(p => {
      fam[p.fam] = (fam[p.fam] || 0) + 1;
      era[eraOf(p.year)] = (era[eraOf(p.year)] || 0) + 1;
      if (Number.isFinite(p.elo)) elos.push(p.elo);
    });
    elos.sort((x, y) => x - y);
    Object.keys(BY_ID).forEach(id => use[kindOf(BY_ID[id].formula)].push(problemCount(id)));
    return PF_CORPUS = { fam, era, elos, use, total: PROBLEM_DB.length };
  }
  const pfPct = x => !x ? "0%" : x >= 0.0995 ? Math.round(x * 100) + "%" : (x * 100 < 0.05 ? "<0.1" : (x * 100).toFixed(1)) + "%";
  // The parts of a profile that any set of problems has (a card's tagged problems, or a topic's):
  // the headline figures and the Contests, Difficulty and Over time rows. Each caller adds what
  // is its own (a card: its rank, its topics, its Role and neighbours; a topic: the cards its
  // problems use) and puts the rows in order.
  function profileParts(probs) {
    const N = probs.length, all = pfCorpus();
    const row = (label, value, block) => `<div class="pf-row${block ? " pf-block" : ""}"><span class="pf-k">${label}:</span><div class="pf-v">${value}</div></div>`;
    // A column heading with a shorter wording for a phone.
    const duo = (long, short) => `<span class="pf-long">${long}</span><span class="pf-short" aria-hidden="true">${short}</span>`;
    const stat = (big, small) => `<div class="pf-stat"><b>${big}</b><span>${small}</span></div>`;
    const dots = xs => xs.join(` <span class="pf-dot">&middot;</span> `);
    const out = { N, all, row, duo, stat, dots, few: N < 5, tiles: {}, rows: {} };
    if (!N) return out;
    const elos = probs.map(p => p.elo).filter(Number.isFinite).sort((x, y) => x - y);
    const med = elos.length ? quantile(elos, 0.5) : null;
    const years = probs.map(p => p.year), y0 = Math.min(...years), y1 = Math.max(...years);
    const few = out.few;
    out.tiles = {
      count: stat(N.toLocaleString("en-US"), N === 1 ? "problem" : "problems"),
      // One line per contest it appears in (owner, 2026-11-11): "1 in 22 AIME" says more than
      // one figure across contests of very different sizes. A contest with only a few papers
      // in the collection gets its plain count.
      share: `<div class="pf-stat pf-odds">${FAMILIES.map(x => [x, probs.filter(p => p.fam === x).length]).filter(x => x[1]).map(([x, n]) =>
        `<span class="pf-odd"><b>${all.fam[x] >= 100 ? `1 in ${Math.max(1, Math.round(all.fam[x] / n)).toLocaleString("en-US")}` : `${n} of ${all.fam[x]}`}</b>${escapeAttr(x)}</span>`).join("")}</div>`,
      med: med != null ? stat(med, elos.length === 1 ? "rating" : "median rating") : "",
      years: stat(y0 === y1 ? y0 : `${y0}&ndash;${y1}`, y0 === y1 ? "year seen" : "years seen")
    };

      // Contests: how many problems, what share of that contest's problems (the bar, since the
      // contests differ in size), and the question number it usually sits at.
      const fams = FAMILIES.map(x => ({ fam: x, ps: probs.filter(p => p.fam === x) })).filter(x => x.ps.length)
        .map(x => ({ ...x, share: x.ps.length / all.fam[x.fam], at: quantile(x.ps.map(p => p.num).sort((a, b) => a - b), 0.5) }));
      // A contest with only a few papers in the collection gets its count, not a share.
      const sized = x => all.fam[x.fam] >= 100;
      const shareMax = Math.max(0, ...fams.filter(sized).map(x => x.share));
      // A few problems are named in a line; shares and bars of one or two problems say nothing.
      if (few) out.rows.contests = row("Contests", dots(fams.map(x => `${famDot(x.fam)}${escapeAttr(x.fam)} <span class="pf-sub">${x.ps.map(p => "#" + p.num).join(", ")}</span>`)));
      else out.rows.contests = row("Contests", `<table class="pf-table"><thead><tr><th scope="col" aria-label="Contest"></th><th class="pf-meter-cell"></th><th scope="col">Problems</th><th scope="col">${duo("Of the contest", "Share")}</th><th scope="col">${duo("Typical question", "Typical #")}</th></tr></thead><tbody>${fams.map(x =>
        `<tr><th scope="row">${famDot(x.fam)}${escapeAttr(x.fam)}</th><td class="pf-meter-cell">${sized(x) ? `<span class="pf-meter"><i style="width:${Math.max(2, x.share / shareMax * 100).toFixed(1)}%;background:${famColor(x.fam)}"></i></span>` : ""}</td><td>${x.ps.length}</td><td>${sized(x) ? pfPct(x.share) : `${x.ps.length} of ${all.fam[x.fam]}`}</td><td>#${x.at}</td></tr>`).join("")}</tbody></table>`, true);

      // Difficulty: the ratings in words, then their spread, stacked by contest in the colours
      // of the rows above. A handful of ratings is listed, not charted.
      if (elos.length) {
        const below = all.elos.filter(e => e < med).length, harder = Math.round(below / all.elos.length * 100);
        const versus = `${elos.length === 1 ? "That is" : "The median is"} harder than ${harder}% of all problems.`;
        const list = xs => xs.length < 3 ? xs.join(" and ") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
        const words = elos.length >= 8
          ? `Median rating <b>${med}</b>. Half of its problems are rated ${quantile(elos, 0.25)} to ${quantile(elos, 0.75)}; the full range is ${elos[0]} to ${elos[elos.length - 1]}. ${versus}`
          : `Rated ${list(elos)}. ${versus}`;
        out.rows.difficulty = row("Difficulty", `<p class="pf-words">${words}</p>${elos.length >= 8
          ? `<div class="pf-plot">${eloChartHtml({ pool: probs, shown: fams.map(x => x.fam), mark: med, compact: true, focus: false })}</div>` : ""}`, elos.length >= 8);
      }

      // Over time: its share of each five-year period's problems (a share, because the periods
      // hold different numbers of problems). Too few problems make the bars noise.
      const eras = Object.keys(all.era).map(Number).sort((a, b) => a - b);
      if (N >= 30 && eras.length > 1) {
        const per = eras.map(e => { const n = probs.filter(p => eraOf(p.year) === e).length; return { e, n, share: n / all.era[e] }; });
        const eraMax = Math.max(...per.map(x => x.share));
        const span = e => `${String(e).slice(2)}&ndash;${String(e + PF_ERA - 1).slice(2)}`, last = eras[eras.length - 1];
        const recent = probs.filter(p => p.year >= last).length;
        out.rows.time = row("Over time", `<p class="pf-words">${per.some(x => !x.n) ? "Up to" : `Between ${pfPct(Math.min(...per.map(x => x.share)))} and`} ${pfPct(eraMax)} of ${per.some(x => !x.n) ? "a" : "each"} five-year period's problems. ${recent} of the ${N} are from ${last} on.</p>
          <div class="pf-eras" role="img" aria-label="Share of each five-year period's problems: ${per.map(x => `${x.e} to ${x.e + PF_ERA - 1}, ${pfPct(x.share)}`).join("; ")}">${per.map(x =>
          `<span class="pf-era" data-tip="${x.e}–${x.e + PF_ERA - 1}: ${x.n} problem${x.n === 1 ? "" : "s"}, ${pfPct(x.share)} of the period's"><span class="pf-era-bar"><i style="height:${x.n ? Math.max(4, x.share / eraMax * 100).toFixed(1) : 0}%"></i></span><span class="pf-era-l">${span(x.e)}</span></span>`).join("")}</div>`, true);
      }
    return out;
  }
  function contestProfileHtml(f, authored) {
    if (authored == null) return "";
    const probs = PROBLEMS_BY_CARD[f.id] || [];
    const k = kindOf(f), P = profileParts(probs), { N, all, row, duo, stat, dots, few } = P;
    const co = kind => {
      const c = {};
      probs.forEach(p => p.formulas.forEach(id => {
        if (id !== f.id && id !== TWIN_OF[f.id] && BY_ID[id] && kindOf(BY_ID[id].formula) === kind) c[id] = (c[id] || 0) + 1;
      }));
      return Object.keys(c).sort((a, b) => c[b] - c[a] || a.localeCompare(b)).slice(0, 4).map(id => [id, c[id]]);
    };
    const names = pairs => pairs.map(([id, n]) => `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a> <span class="pf-sub">${n}</span>`).join(` <span class="pf-dot">&middot;</span> `);
    const rows = [];
    let stats = "";
    if (N) {
      const rank = 1 + all.use[k].filter(n => n > N).length;
      stats = `<div class="pf-stats">${[P.tiles.count, P.tiles.share, stat(ordinal(rank), `most used of ${all.use[k].length} ${k}s`), P.tiles.med, P.tiles.years].join("")}</div>`;
      if (P.rows.contests) rows.push(P.rows.contests);
      if (P.rows.difficulty) rows.push(P.rows.difficulty);

      // Topics: the tree nodes its problems are filed under most often, each with its area.
      const nodes = {};
      probs.forEach(p => new Set(p.tree).forEach(id => { if (TOPIC_NODES.has(id)) nodes[id] = (nodes[id] || 0) + 1; }));
      const top = Object.keys(nodes).sort((a, b) => nodes[b] - nodes[a] || TOPIC_NODES.get(a).order - TOPIC_NODES.get(b).order).slice(0, 5);
      if (top.length && few) rows.push(row("Topics", dots(top.map(id => `<a href="${topicHash(id)}">${topicLabel(TOPIC_NODES.get(id))}</a>${N > 1 ? ` <span class="pf-sub">${nodes[id]}</span>` : ""}`))));
      else if (top.length) {
        const topMax = nodes[top[0]];
        rows.push(row("Topics", `<table class="pf-table pf-topics"><thead><tr><th scope="col" aria-label="Topic"></th><th class="pf-meter-cell"></th><th scope="col">Problems</th><th scope="col">${duo("Of its problems", "Share")}</th></tr></thead><tbody>${top.map(id => {
          const n = TOPIC_NODES.get(id), path = topicPath(id), area = path.length > 1 ? path[Math.min(1, path.length - 2)] : null;
          return `<tr><th scope="row"><a href="${topicHash(id)}" title="${escapeAttr(path.map(x => window.PracticeTopics.label(x.name)).join(" › "))}">${topicLabel(n)}</a>${area ? `<span class="pf-sub">${topicLabel(area)}</span>` : ""}</th><td class="pf-meter-cell"><span class="pf-meter"><i style="width:${Math.max(2, nodes[id] / topMax * 100).toFixed(1)}%"></i></span></td><td>${nodes[id]}</td><td>${pfPct(nodes[id] / N)}</td></tr>`;
        }).join("")}</tbody></table>`, true));
      }

      if (P.rows.time) rows.push(P.rows.time);
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
    // most often appear beside it, each with the number of problems they share. The hand-picked
    // "Related ..." sections are separate.
    const partners = k === "method" ? [["Common patterns", co("pattern")], ["Related Methods", co("method")]]
      : k === "formula" ? [["Common methods", co("method")]] : [["Related Patterns", co("pattern")]];
    partners.forEach(([label, pairs]) => { if (pairs.length) rows.push(row(label, names(pairs))); });
    if (!rows.length) return "";
    return `<div class="related contest-profile"><h4>Contest profile</h4>${stats}<div class="profile-rows">${rows.join("")}</div></div>`;
  }
  // A topic's profile (T6, 2026-11-11), on its Problems by topic page: the same figures and rows
  // for the problems filed under the topic and its subtopics, and in place of a card's Topics
  // row, the cards those problems cite most. It folds away, and stays folded while browsing.
  let topicProfileOpen = true;
  function topicProfileHtml(node, probs) {
    const P = profileParts(probs), { N, row, duo, dots, few } = P;
    if (!N) return "";
    const stats = `<div class="pf-stats tp-stats">${[P.tiles.count, P.tiles.share, P.tiles.med, P.tiles.years].join("")}</div>`;
    const rows = [P.rows.contests, P.rows.difficulty, P.rows.time].filter(Boolean);
    const cited = {};
    probs.forEach(p => new Set([...p.formulas, ...p.trickFormulas]).forEach(id => { if (BY_ID[id]) cited[id] = (cited[id] || 0) + 1; }));
    const top = Object.keys(cited).sort((x, y) => cited[y] - cited[x] || x.localeCompare(y)).slice(0, 6);
    const link = id => `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>`, kind = id => { const k = kindOf(BY_ID[id].formula); return k.charAt(0).toUpperCase() + k.slice(1); };
    if (top.length && few) rows.push(row("Cards", dots(top.map(id => `${link(id)} <span class="pf-sub">${cited[id]}</span>`))));
    else if (top.length) rows.push(row("Cards", `<table class="pf-table pf-topics tp-cards"><thead><tr><th scope="col" aria-label="Card"></th><th class="pf-meter-cell"></th><th scope="col">Problems</th><th scope="col">${duo("Of its problems", "Share")}</th></tr></thead><tbody>${top.map(id =>
      `<tr><th scope="row">${link(id)}<span class="pf-sub">${kind(id)}</span></th><td class="pf-meter-cell"><span class="pf-meter"><i style="width:${Math.max(2, cited[id] / cited[top[0]] * 100).toFixed(1)}%"></i></span></td><td>${cited[id]}</td><td>${pfPct(cited[id] / N)}</td></tr>`).join("")}</tbody></table>`, true));
    return `<section class="tp">${stats}<div class="pp-head"><h3 class="pp-h">Topic profile</h3><button type="button" class="hp-btn hp-btn-soft tp-toggle" data-tp-toggle aria-expanded="${topicProfileOpen}" aria-controls="tp-body">${topicProfileOpen ? "Hide" : "Show"}</button></div>
      <div class="contest-profile tp-body" id="tp-body"${topicProfileOpen ? "" : " hidden"}><div class="profile-rows">${rows.join("")}</div></div></section>`;
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

  // Back can revisit entries that Settings cannot edit. A reset token invalidates
  // their strategy overrides while preserving the user's other history state.
  let strategyResetToken = "";
  function currentStrategyToken() {
    try { strategyResetToken = localStorage.getItem("mq-strategy-reset") || strategyResetToken; } catch (e) {}
    return strategyResetToken;
  }
  function savedStrategy(key) {
    const entry = history.state;
    if (!entry) return undefined;
    const saved = entry.strategies?.[key];
    const token = currentStrategyToken();
    if (saved) return saved.token === token ? saved.open : false;
    const legacy = entry.solutions?.[key];
    return legacy !== undefined && token ? false : legacy;
  }
  function rememberSolution(key, open) {
    if (key.startsWith("problem-")) {
      const strategies = Object.assign({}, history.state?.strategies, { [key]: { token: currentStrategyToken(), open } });
      history.replaceState(Object.assign({}, history.state, { strategies }), "");
      return;
    }
    const solutions = Object.assign({}, history.state?.solutions, { [key]: open });
    history.replaceState(Object.assign({}, history.state, { solutions }), "");
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
        ${p.s ? `<button class="sol-toggle" data-target="sol-${f.id}-${i}">${history.state?.solutions?.[`sol-${f.id}-${i}`] ? "Hide" : "Show"} solution</button>
        <div class="problem-sol" id="sol-${f.id}-${i}" ${history.state?.solutions?.[`sol-${f.id}-${i}`] ? "" : "hidden"}><strong>Solution.</strong> ${p.s}${figHtml(p.figS)}</div>` : ""}
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
    "HMMT": "https://www.hmmt.org/www/archive/problems",
    "ARML": "https://www.arml.com/ARML/arml_2019/page/index.php?page_type=public&page=4",
    "SMT": "https://www.stanfordmathtournament.com/past-tests/problems"
  };
  // The button has to say where it goes: an HMMT link lands on a round's archive, not on a
  // per-problem page, and calling that "AoPS" would be simply false.
  function linkLabel(fam) { return ARCHIVE_URL[fam] ? "archive" : "AoPS"; }
  // HMMT publishes each round as two PDFs, the paper and its solutions. A reference names the
  // year, the tournament and the round, which is the whole address.
  const HMMT_CODE = { "Advanced Topics": "adv", "General": "gen", "Theme": "thm", "Algebra": "alg", "Algebra and Combinatorics": "algcomb", "Algebra and Geometry": "alggeo", "Combinatorics and Geometry": "combgeo", "Algebra and Number Theory": "algnt", "Combinatorics": "comb", "Geometry": "geo" };
  function hmmtPdf(ref, which) {
    const m = ref.match(/^(\d{4}) HMMT (February|November) (.+?),\s*Problem\s+\d+$/);
    return m && HMMT_CODE[m[3]] ? `https://hmmt-archive.s3.amazonaws.com/tournaments/${m[1]}/${m[2].slice(0, 3).toLowerCase()}/${HMMT_CODE[m[3]]}/${which}.pdf` : null;
  }
  // ARML publishes whole contests, not rounds: the 2009 to 2014 contests as one book, and
  // 2016 to 2019 as one booklet a year. A link opens the booklet at the Individual round's
  // problems or solutions (the PDF page, checked against the files on 2026-11-13).
  const ARML_FILES = "https://www.arml.com/ARML/arml_2019/public_contest_files/";
  const ARML_BOOK = "2009_2014_book/ARML_2009_2014.pdf";
  const ARML_PAGES = {
    2009: [ARML_BOOK, 39, 41], 2010: [ARML_BOOK, 79, 81], 2011: [ARML_BOOK, 129, 131], 2012: [ARML_BOOK, 174, 176],
    2013: [ARML_BOOK, 219, 221], 2014: [ARML_BOOK, 255, 258],
    2016: ["2016_contest_file/2016_Contest_Final_Version.pdf", 18, 20], 2017: ["2017_contest_file/2017_Contest_Final_Version.pdf", 20, 22],
    2018: ["2018_contest_file/2018_Contest_Final_Version.pdf", 20, 22], 2019: ["2019_contest_file/2019_Contest_Final_Version.pdf", 19, 21]
  };
  function armlPdf(ref, which) {
    const m = ref.match(/^(\d{4}) ARML Individual,\s*Problem\s+\d+$/), f = m && ARML_PAGES[m[1]];
    return f ? `${ARML_FILES}${f[0]}#page=${which === "solutions" ? f[2] : f[1]}` : null;
  }
  // SMT publishes each subject test as two PDFs, like HMMT: /pdfs/smt<year>/<subject>-problems.pdf
  // and -solutions.pdf. The Discrete test was Advanced from 2011 to 2014, and in 2021 two tests,
  // Combinatorics and Number Theory, replaced it.
  const SMT_CODE = { "Algebra": "algebra", "Advanced": "advanced", "Discrete": "discrete", "Combinatorics": "combo", "Number Theory": "nt", "Geometry": "geometry", "Calculus": "calculus" };
  function smtPdf(ref, which) {
    const m = ref.match(/^(\d{4}) SMT (.+?),\s*Problem\s+\d+$/);
    return m && SMT_CODE[m[2]] ? `https://www.stanfordmathtournament.com/pdfs/smt${m[1]}/${SMT_CODE[m[2]]}-${which}.pdf` : null;
  }
  // The official paper or solutions as a PDF, for the contests that publish them.
  const officialPdf = (ref, which) => hmmtPdf(ref, which) || armlPdf(ref, which) || smtPdf(ref, which);
  function aopsUrl(ref, fam) {
    if (fam && ARCHIVE_URL[fam]) return ARCHIVE_URL[fam];
    const m = ref.match(/^(.*),\s*Problem\s+(\d+)\s*$/);
    if (!m) return null;
    // Only the MAA families have per-problem wiki pages; building one for anything else
    // produces a URL that looks right and 404s.
    if (!/\b(AMC|AIME|AJHSME|AHSME)\b/i.test(m[1])) return null;
    // The wiki names the Spring 2021 papers "2021 AMC 10A", with no season; only the Fall ones carry one.
    const slug = m[1].trim().replace(/^(\d{4})\s+Spring\s+/i, "$1 ").replace(/\s+/g, "_") + "_Problems/Problem_" + m[2];
    return "https://artofproblemsolving.com/wiki/index.php/" + slug;
  }

  // ---------- Problem database (tags + link only) ----------
  function problemSlug(ref) {
    return ref.toLowerCase().replace(/,?\s*problem\s+/, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  // The display form of a reference. HMMT names are long ("2019 HMMT February Algebra and Number
  // Theory, Problem 3"), so the month and the round are shortened: "2019 HMMT Feb Alg & NT #3".
  // `refInGroup` drops the contest's own name as well, for a row under that contest's heading.
  const HMMT_ROUNDS = { "Advanced Topics": "Adv Topics", "General": "Gen", "Algebra and Combinatorics": "Alg & Combo", "Algebra and Geometry": "Alg & Geo", "Combinatorics and Geometry": "Combo & Geo", "Algebra and Number Theory": "Alg & NT", "Combinatorics": "Combo", "Geometry": "Geometry" };
  const shortRound = r => HMMT_ROUNDS[r] || r;
  function refShort(ref) {
    return ref.replace(/,\s*Problem\s+/, " #").replace(/\bHMMT (February|November) (.+?) #/, (_, m, r) => `HMMT ${m.slice(0, 3)} ${shortRound(r)} #`);
  }
  function refInGroup(ref) {
    const m = ref.match(/^(\d{4}) HMMT (?:February|November) (.+?),\s*Problem\s+(\d+)$/);
    return m ? `${m[1]} ${shortRound(m[2])} #${m[3]}` : refShort(ref);
  }
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
    else if (/AHSME/i.test(core)) fam = "AMC 12";           // the AMC 12's name until 1999 (owner, 2026-11-13)
    else if ((fm = core.match(/AMC\s*(8|10|12)/i))) fam = "AMC " + fm[1];
    else if (/Putnam/i.test(core)) fam = "Putnam";
    else if (/^ARML\b/i.test(core)) fam = "ARML";            // the Individual round only (owner, 2026-11-13)
    else if (/^SMT\b/i.test(core)) fam = "SMT";              // the subject tests (owner, 2026-11-13); the round stays in cname
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
  function stepChevron(dir) {
    return `<svg class="step-chevron" width="12" height="18" viewBox="0 0 12 18" aria-hidden="true" focusable="false"><path d="${dir < 0 ? 'M9 3L3 9L9 15' : 'M3 3L9 9L3 15'}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function famSlug(f) { return f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  // A paper within a year's page: "2025 AIME I" -> "aime-i", "2021 Fall AMC 10A" -> "fall-amc-10a".
  function paperSlug(cname) { return famSlug(String(cname).replace(/^\d{4}\s*/, "")); }
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
  const problemDifficulty = window.ProblemDifficulty;
  const PROBLEM_DB = (window.MATH_PROBLEM_DB || []).map(e => {
    const formulas = (e.formulas || []).filter(fid => BY_ID[fid]);
    const trickFormulas = (e.trickFormulas || []).filter(fid => BY_ID[fid]);
    const pr = parseRef(e.ref), slug = problemSlug(e.ref), rating = problemDifficulty.ratingFor(slug);
    return {
      ref: e.ref, slug, tree: e.tree || [], elo: rating ? rating.elo : null, eloSource: rating ? rating.source : null,
      url: e.url || officialPdf(e.ref, "problems") || aopsUrl(e.ref, pr.fam), urlLabel: linkLabel(pr.fam),
      // Where the official solution is, for a problem whose solution we link instead of write.
      // An AHSME problem has no solution of ours either (owner, 2026-11-13): its AoPS wiki page has them.
      solUrl: officialPdf(e.ref, "solutions") || (!e.strategy ? aopsUrl(e.ref, pr.fam) : null),
      solAops: !officialPdf(e.ref, "solutions") && !e.strategy && !!aopsUrl(e.ref, pr.fam),
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
  const FAM_ORDER = ["AMC 8", "AMC 10", "AMC 12", "AIME", "HMMT February", "HMMT November", "ARML", "SMT", "Putnam", "HMMT"];
  const FAMILIES = Object.keys(DB_TREE).sort((a, b) => {
    const ia = FAM_ORDER.indexOf(a), ib = FAM_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  const FAM_BY_SLUG = {}; FAMILIES.forEach(f => { FAM_BY_SLUG[famSlug(f)] = f; });
  const famCount = f => Object.keys(DB_TREE[f]).reduce((n, y) => n + DB_TREE[f][y].length, 0);
  // "Written" means the problem has its write-up (a strategy) in the app. A problem with only its text, or only its cards, is not counted.
  const famWritten = f => Object.keys(DB_TREE[f]).reduce((n, y) => n + DB_TREE[f][y].filter(p => p.strategy).length, 0);
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
        <h4>Practice problems</h4>
        <p class="practice-placeholder">No practice problems for this pattern yet.</p>
      </div>` : "";
    // Within each contest, newest year first, then earlier problems in the paper first (owner,
    // 2026-11-07; this replaces the 2026-10-31 order by place in the paper).
    const groups = {};
    probs.forEach(p => (groups[p.fam] = groups[p.fam] || []).push(p));
    Object.values(groups).forEach(g => g.sort((a, b) => b.year - a.year || a.num - b.num || a.ref.localeCompare(b.ref)));
    const fams = Object.keys(groups).sort((a, b) => {
      const ia = FAM_ORDER.indexOf(a), ib = FAM_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
    const body = fams.map(fam => {
      const hidden = groups[fam].length - PROB_GROUP_PREVIEW;
      const rows = groups[fam].map((p, i) => {
        return `<li class="prob-row${i >= PROB_GROUP_PREVIEW ? " prob-extra" : ""}">
         <a class="prob-open" href="#/problem/${p.slug}">${refShort(p.ref)}</a>
         ${p.url ? `<a class="ref-ext-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer" title="Open the source">${p.urlLabel} <span aria-hidden="true">${uiIcon("arrow-up-right")}</span></a>` : ""}
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
        <h4>Practice problems <span class="practice-note">${probs.length}</span></h4>
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
    // Math is typeset after HTML insertion. A literal comparison such as $r<R$
    // must remain text, or the browser can consume the rest of the paragraph as a tag.
    text = String(text || "").replace(/\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\\])*\$/g,
      math => math.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    if (text.indexOf("[[") === -1) return text;
    const link = (m, id, label) => {
      const e = BY_ID[id];
      if (!e) return redLink(id, label);
      return `<a class="card-link" href="#/f/${escapeAttr(id)}" data-card="${escapeAttr(id)}">${label || e.formula.name}</a>`;
    };
    // A label that is itself math ([[an-minus-bn|$a^n - b^n$]]) is linked first, whole: the split
    // on $...$ below would otherwise cut it in two and leave the brackets showing.
    text = String(text).replace(/\[\[([\w-]+)\|([^\]]*\$[^\]]*)\]\]/g, link);
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
    const problem = a.hash.startsWith("#/problem/") ? PROBLEM_BY_SLUG[a.hash.slice(10)] : null;
    const e = BY_ID[a.dataset.card || (a.hash.startsWith("#/f/") && a.hash.slice(4))];
    if ((!e && !problem) || cpFor === a) return;
    hideCardPreview();
    cpFor = a;
    let thumb = "", content;
    if (problem) {
      content = `<div class="cp-head">${escapeAttr(refShort(problem.ref))}</div>
        <div class="cp-desc">${escapeAttr(problem.subjects.map(id => SUBJECT_LABELS[id]).join(" · ") || problem.fam)}</div>`;
    } else {
      const f = e.formula;
      const kind = f.type === "method" ? `<span class="badge badge-method">METHOD</span>`
                 : f.type === "pattern" ? `<span class="badge badge-pattern">PATTERN</span>` : "";
      const desc = leadSentences(f.description, 200);
      const panels = (window.MATH_DIAGRAMS || {})[f.id];
      thumb = panels && panels[0]
        ? `<div class="cp-thumb">${String(panels[0]).replace(/<div class="diagram-cap">[\s\S]*?<\/div>/, "")}</div>`
        : "";
      content = `<div class="cp-head">${f.name}${kind}</div><div class="cp-desc">${desc}</div>
        <div class="cp-crumb">${escapeAttr(e.section.title)} ${uiIcon("chevron-right")} ${escapeAttr(e.subsection.title)}</div>`;
    }
    clearTimeout(cpHide);
    cpEl = document.createElement("div");
    cpEl.className = "card-preview";
    cpEl.addEventListener("mouseenter", () => clearTimeout(cpHide));
    cpEl.addEventListener("mouseleave", hideCardPreview);
    // The box is a second target for the same link, so reading the summary and deciding to
    // go there does not mean travelling back to the word.
    cpEl.addEventListener("click", event => {
      if (event.target.closest("a")) return;
      hideCardPreview();
      location.hash = a.hash;
      window.scrollTo({ top: 0 });
    });
    if (thumb) cpEl.classList.add("cp-has-thumb");
    if (problem) cpEl.classList.add("problem-preview");
    cpEl.innerHTML = thumb + content + '<span class="cp-arrow"></span>';
    document.body.appendChild(cpEl);
    // Typeset BEFORE measuring. Positioning above the word needs the final height, and KaTeX
    // (and the thumbnail's SVG) change it after the fact; measuring first is what left a gap
    // above the word, and only above, since the below branch pins the top edge instead.
    renderMath(cpEl);
    const place = () => {
      if (cpFor !== a) return;
      const desc = cpEl.querySelector(".problem-preview .cp-desc");
      if (desc) desc.classList.toggle("cp-scroll", desc.scrollHeight > desc.clientHeight + 6);
      positionFloat(cpEl, a, thumb ? 420 : 330, true, cpAt);
      // The arrow must point at the SAME fragment the box was placed against, or on a link
      // that wraps it aims at the union box's centre and misses the word entirely.
      const ar = fragmentUnder(a, cpAt), br = cpEl.getBoundingClientRect();
      const arrow = cpEl.querySelector(".cp-arrow");
      const target = cpAt ? cpAt.x : ar.left + ar.width / 2;
      arrow.style.left = Math.min(Math.max(target - br.left, 14), br.width - 14) + "px";
      cpEl.classList.toggle("cp-below", br.top > ar.top);
    };
    if (problem && MAA_RE.test(problem.ref)) loadStatements(problem.year).then(() => {
      if (cpFor !== a) return;
      const st = window.MATH_STATEMENTS?.[problem.slug];
      if (!st) return;
      const text = typeof st === "string" ? st : st.s;
      cpEl.querySelector(".cp-desc").textContent = text.split(/\n\(A\) /)[0].replace(/@@fig:[^@]+@@/g, "");
      renderMath(cpEl);
      place();
    });
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
  // A right-hand column on a card's page, as on Wikipedia: Tools (back to the top, links to the
  // special pages about this card, a permanent link, print, a random card), Page information (counted from
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
    const seg = (key, cur, opts) => `<div class="pt-seg" role="radiogroup" aria-label="${key === 'text' ? 'Text size' : 'Theme'}">${opts.map(([v, l]) => `<button type="button" role="radio" aria-checked="${v === cur ? "true" : "false"}" data-pt-set="${key}" data-val="${v}">${l}</button>`).join("")}</div>`;
    const row = (k, v) => `<div class="pt-info"><span>${k}</span><b>${v}</b></div>`;
    return `<aside class="page-tools" aria-label="Page tools"><div class="pt-inner">
        <section class="pt-block"><div class="pt-head">Tools</div>
          <button type="button" class="pt-act" data-pt="top">Back to top</button>
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
      if (act.dataset.pt === "top") window.scrollTo({ top: 0, behavior: window.AppAccessibility.scrollBehavior() });
      else if (act.dataset.pt === "print") window.print();
      else if (act.dataset.pt === "hide") { state.tools = "off"; saveSettings(); renderDetail(entry); }
      else if (act.dataset.pt === "permalink") {
        const url = location.href.split("#")[0] + "#/f/" + entry.formula.id;
        const done = () => toast("Link copied.");
        try { navigator.clipboard.writeText(url).then(done, () => toast(url)); } catch (err) { toast(url); }
      }
    });
  }

  // The card's write-up split into the parts the card page draws in their own places (Key forms,
  // When to use, Contest profile, Formulas it uses, Common traps, Methods and Formulas to Try),
  // so the card page and the preview in a lesson's drawer draw them the same way.
  function cardSections(entry) {
    const f = entry.formula;
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
    return { formsHtml, kind, converted, prof, supp, trapSec, trySec, whenSec, rest };
  }
  // The explanation of a card, in the card page's order and with its drawing of each section.
  function cardExplanationHtml(entry, sec) {
    const f = entry.formula, { formsHtml, kind, converted, supp, trapSec, trySec, whenSec, rest } = sec;
    return `${formsHtml}
        ${kind === "method" && converted ? whenToUseHtml(f, whenSec.text) : ""}
        ${rest && rest.trim() ? `<div class="detail-body">${detailBodyHtml(rest, f.id)}</div>` : ""}
        ${tryHtml(f, trySec.text)}
        ${kindLinksHtml(entry, supp.text)}
        ${trapSec.text ? `<div class="detail-body">${detailBodyHtml("## Common traps\n" + trapSec.text, f.id)}</div>` : ""}`;
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
    const sec = cardSections(entry);
    const { formsHtml, kind, converted, prof, supp, trapSec, trySec, whenSec, rest } = sec;
    state.landing = false;
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
            ? `<a class="back-link" href="#" data-back-search>${uiIcon("arrow-left")} Back to ${backFromSearch.adv
                ? "tag results"
                : `results for &ldquo;${escapeAttr(backFromSearch.query.trim())}&rdquo;`}</a>`
            : ""}
          ${backToLearnHtml("formula:" + f.id)}
          ${backFromCardProblem && backFromCardProblem.fid === f.id && PROBLEM_BY_SLUG[backFromCardProblem.slug]
            ? `<a class="back-link" href="#/problem/${backFromCardProblem.slug}">${uiIcon("arrow-left")} Back to ${escapeAttr(refShort(PROBLEM_BY_SLUG[backFromCardProblem.slug].ref))}</a>`
            : ""}
          ${backFromFormula && backFromFormula.fid === f.id && anyList(backFromFormula.listId)
            ? `<a class="back-link" href="#/list/${backFromFormula.listId}">${uiIcon("arrow-left")} Back to ${escapeAttr(anyList(backFromFormula.listId).name)}</a>`
            : ""}
          <a class="back-link" href="${sectionHash(entry.section.id, bySubject(entry.section) ? { sub: state.activeSub, cluster: state.activeCluster } : { topic: state.activeTopic })}" data-back-section>${uiIcon("arrow-left")} Back to ${bySubject(entry.section) ? (state.activeCluster != null ? entry.subsection.groups[state.activeCluster].title : pageTitle(entry.section, state.activeSub)) : entry.subsection.title}</a>
        </div>
        <p class="detail-crumb">${entry.section.title} ${uiIcon("chevron-right")} ${entry.subsection.title}</p>
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
        ${cardExplanationHtml(entry, sec)}
        ${(window.MATH_WIDGETS || {})[f.id] ? `<div class="interactive"><h4>Interactive</h4><div id="formula-widget"></div></div>` : ""}
        ${profileHtml}
        ${exHtml}
        ${problemsHtml}
        ${reverseLinksHtml(f)}
        ${connectedHtml(f)}
        ${cardLessonsHtml(f.id)}
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
    "Practice problems": "Real contest problems that use this card, by contest.",
    "Study this more": "Written lessons that teach this card.",
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
    // A few page tools under the sections (owner, 2026-10-31): back to the top, the list's link, print.
    const tools = state.tools === "on" ? `<div class="toc-head toc-tools-head">Page tools</div>
      <button type="button" class="toc-tool" data-list-tool="top">Back to top</button>
      <button type="button" class="toc-tool" data-list-tool="link">Copy link to this list</button>
      <button type="button" class="toc-tool" data-list-tool="print">Print this list</button>
      <button type="button" class="toc-tool pt-hide" data-list-tool="hide">Hide page tools</button>` : "";
    toc.innerHTML = items.length ? `<div class="toc-head">On this list</div>${items.join("")}${tools}` : "";
    toc.hidden = !items.length;
    markToc();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-list-tool]");
    if (!b) return;
    const what = b.dataset.listTool;
    if (what === "hide") {
      state.tools = "off";
      saveSettings();
      buildListToc();
      document.querySelector("#page-toc .toc-link")?.focus();
    } else if (what === "top") window.scrollTo({ top: 0, behavior: window.AppAccessibility.scrollBehavior() });
    else if (what === "print") { prepareMathForPrint(); window.print(); }
    else if (what === "link") {
      const url = location.href;
      const done = () => toast("Link copied");
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => toast("Copy failed"));
      else toast("Copy failed");
    }
  });
  document.addEventListener("click", e => {
    const t = e.target.closest(".chain-toggle");
    if (!t) return;
    const body = t.closest(".prob-chain").querySelector(".chain-body");
    if (!body) return;
    body.hidden = !body.hidden;
    if (t.dataset.solutionKey) rememberSolution(t.dataset.solutionKey, !body.hidden);
    t.setAttribute("aria-expanded", String(!body.hidden));
    t.innerHTML = body.hidden ? "+ Show" : "&minus; Hide";
    if (!body.hidden) { renderMath(body); fitBatch([...body.querySelectorAll(".formula-display[data-latex]")]); }
  });
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
  // The editor's sticky sidebar shrinks (and scrolls inside) rather than being pushed up past the top bar at the end of the page.
  function fitGeSide() {
    const side = document.querySelector(".ge-side"), main = document.querySelector(".ge-main");
    if (!side || !main || getComputedStyle(side).position !== "sticky") { if (side) side.style.maxHeight = ""; return; }
    const room = Math.min(window.innerHeight - 92, main.getBoundingClientRect().bottom - Math.max(76, side.getBoundingClientRect().top));
    side.style.maxHeight = Math.max(240, Math.floor(room)) + "px";
  }
  let tocTick = 0;
  window.addEventListener("scroll", () => { if (!tocTick) tocTick = requestAnimationFrame(() => { tocTick = 0; markToc(); markNavGroup(); fitGeSide(); }); }, { passive: true });
  window.addEventListener("resize", () => fitGeSide(), { passive: true });

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
        btns.innerHTML = `<button type="button" tabindex="-1" aria-label="increase">${uiIcon('triangle-up')}</button><button type="button" tabindex="-1" aria-label="decrease">${uiIcon('triangle-down')}</button>`;
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
    if (!shownIds.length) parts.push(`<div class="empty-state"><div class="big">${uiIcon("empty")}</div>No ${pageTitle(section, subIdx)} cards match the current filters.</div>`);
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
  // Every setting lists its default option first (owner, 2026-10-31); the defaults are the first
  // allowed value the settings loader falls back to.
  const SETTING_DEFAULTS = {
    theme: "light", density: DENSITIES[0], cols: "regular", text: TEXT_SIZES[0], lines: FORMULA_LINES[0], tags: "on",
    notation: NOTATIONS[0], diagrams: DIAGRAM_MODES[0], tools: TOOLS_MODES[0], scroll: SCROLL_SPEEDS[0], layout: LAYOUTS[0],
    order: ORDERS[0], start: START_MODES[0], lessonLinks: LESSON_LINK_MODES[0], lessonWidth: LESSON_WIDTHS[0], strategy: STRATEGY_MODES[0]
  };
  function settingRow(name, desc, key, current, options, pv) {
    const def = SETTING_DEFAULTS[key];
    if (def != null) options = options.slice().sort((a, b) => (b[0] === def) - (a[0] === def));
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
        <div class="set-find">
          <input type="search" class="set-find-input" placeholder="Search settings&hellip;" aria-label="Search settings" autocomplete="off" spellcheck="false">
          <div class="set-find-list" role="listbox" hidden></div>
        </div>
      </div>
      <div class="settings-page">
        <section class="set-panel">
          <h3 class="set-panel-title">Appearance</h3>
          ${settingRow("Theme", "Light or dark. Dark is easier at night.", "theme", theme, [["light", "Light"], ["dark", "Dark"]])}
          ${settingRow("Density", "How tightly the whole app is spaced: page margins, the gaps between cards and sections, and the padding inside panels. Spacious gives everything more room; Compact fits more on each screen. Neither changes text size or card size.", "density", state.density, [["comfortable", "Comfortable"], ["spacious", "Spacious"], ["compact", "Compact"]])}
          ${settingRow("Card size", "How big each card is while browsing. Large cards are wider, so fewer fit across.", "cols", state.cols, [["regular", "Regular"], ["spacious", "Large"]], "browse")}
          ${settingRow("Text size", "How big the prose and the formulas are, everywhere in the app. Each step up is about 20% larger.", "text", state.text, [["normal", "Normal"], ["large", "Large"], ["larger", "Larger"]], "browse page subject problem")}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Reading the math</h3>
          ${settingRow("Formula lines", "The most rows of a card's formulas to show while browsing, so the cards in a grid stay even. A card's own page always shows all of them. Card thumbnails are written with the most important formula first.", "lines", state.lines, [["1", "1"], ["2", "2"], ["3", "3"], ["all", "All"]], "browse")}
          ${settingRow("Keyword tags", "The tag chips on a card's page. Search uses them either way.", "tags", state.tags ? "on" : "off", [["on", "Show"], ["off", "Hide"]], "page")}
          ${settingRow("Notation", "Expanded writes out the first few terms instead of \u2211 or \u220f in formula boxes and key forms. Explanations keep sigma notation, where the index is usually the point.", "notation", state.notation, [["sigma", "Sigma"], ["expanded", "Expanded"]], "browse page")}
          ${settingRow("Figures on cards", "Figures always appear on a card's own page. On also shows each card's figure while browsing.", "diagrams", state.diagrams, [["none", "Off"], ["on", "On"]], "browse")}
          ${settingRow("Page tools", "Show page tools on card pages and in list sidebars, including links and printing.", "tools", state.tools, [["off", "Off"], ["on", "On"]], "page")}
          ${settingRow("Scroll speed", "How far a page moves for each turn of the mouse wheel or swipe on the trackpad. Normal leaves your browser's own scrolling as it is.", "scroll", state.scroll, [["slow", "Slow"], ["normal", "Normal"], ["fast", "Fast"]])}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Browsing</h3>
          ${settingRow("Subject pages", "Every card in a subject on one scrolling page, grouped by topic, or just the names, A to Z.", "layout", state.layout, [["cards", "Cards"], ["wiki", "A&ndash;Z index"]], "subject")}
          ${settingRow("Card order", "How cards are ordered on a subject page. Curated keeps the order the cards were written in; Most used puts first the cards that the most practice problems use.", "order", state.order, [["curated", "Curated"], ["problems", "Most used"]], "subject")}
          ${settingRow("When the app opens", "Where you land when you open the app without a link to a particular page. The front page shows the four spaces; Formulas goes straight in. The logo still takes you to the front page.", "start", state.start, [["landing", "Front page"], ["formulas", "Formulas"]])}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Learn</h3>
          ${settingRow("Card links in lessons", "What pressing a card's name in a lesson does.", "lessonLinks", state.lessonLinks, [["drawer", "Opens in the lesson"], ["card", "Opens its page"]], "lesson")}
          ${settingRow("Lesson text width", "How wide a lesson's explanation runs. Reading width keeps its lines to a comfortable length; Full width uses the whole column. Problems, solutions and exercises always use the whole column.", "lessonWidth", state.lessonWidth, [["reading", "Reading width"], ["full", "Full width"]], "lesson")}
        </section>
        <section class="set-panel">
          <h3 class="set-panel-title">Practice</h3>
          ${settingRow("Strategy", "On a problem's page, the strategy and the cards it uses. Click to show keeps them closed until you press Show, so you can try the problem first; Shown opens them at once. Either way, Show and Hide beside the heading open and close them.<br><button type='button' class='strategy-reset' data-reset-strategies>Reset opened strategies</button> Closes strategies you previously opened on problem pages.", "strategy", state.strategy, [["show", "Shown"], ["click", "Click to show"]], "problem")}
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
        <section class="set-panel" id="set-credits">
          <h3 class="set-panel-title">Credits and attribution</h3>
          <div class="set-row"><div class="set-text">
            <div class="set-name">Contest problem sources and license</div>
            <div class="set-desc">
              <p>AMC, AJHSME, AHSME and AIME problems are &copy; Mathematical Association of America, used under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. This credit applies to their statements and figures throughout the app, including textbooks, previews and practice sets.</p>
              <p>Most text, figures and answer keys come from <a href="https://live.poshenloh.com/past-contests" target="_blank" rel="noopener noreferrer">LIVE by Po-Shen Loh</a>. Some papers also use MAA PDF copies, the <a href="https://wiki.randommath.com/" target="_blank" rel="noopener noreferrer">Random Math wiki</a> and the <a href="https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions" target="_blank" rel="noopener noreferrer">Art of Problem Solving Wiki</a>, and some answer keys were checked against those published by <a href="https://www.thethinkacademy.com/" target="_blank" rel="noopener noreferrer">Think Academy</a>. Statements have been reformatted for display, including LaTeX and figure layout.</p>
              <p>Problems from the individual rounds of <a href="https://www.hmmt.org/www/archive/problems" target="_blank" rel="noopener noreferrer">HMMT February</a> (Algebra and Number Theory, Combinatorics, Geometry) and HMMT November (General, Theme) are listed by topic and difficulty. Their statements and solutions are not reproduced: each problem's page opens the round's official paper and its official solutions on the HMMT archive. Mock contests also use author-restated prompts from the <a href="https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/problems.pdf" target="_blank" rel="noopener noreferrer">2019 HMMT February Geometry paper</a>, with answer values checked against its <a href="https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/solutions.pdf" target="_blank" rel="noopener noreferrer">official solutions</a>. HMMT material is attributed separately; the MAA license above does not apply to it.</p>
              <p>Problems from the Individual round of <a href="https://www.arml.com/ARML/arml_2019/page/index.php?page_type=public&amp;page=4" target="_blank" rel="noopener noreferrer">ARML</a> (2009 to 2014 and 2016 to 2019, the years ARML has published) are listed the same way: their statements and solutions are not reproduced, and each problem's page opens ARML's official contest booklet at the round. ARML problems are &copy; American Regions Mathematics League; the MAA license above does not apply to them.</p>
              <p>Problems from the subject tests of the <a href="https://www.stanfordmathtournament.com/past-tests/problems" target="_blank" rel="noopener noreferrer">Stanford Math Tournament</a> (SMT: Algebra, Geometry, and Advanced, Discrete or in 2021 Combinatorics and Number Theory) are listed the same way: each problem's page opens SMT's official test and its official solutions; nothing is reproduced. SMT material is attributed to SMT; the MAA license above does not apply to it.</p>
            </div>
          </div></div>
        </section>
        <details class="set-panel set-lab">
          <summary class="set-panel-title">Experimental <span class="lab-tag">for fun</span></summary>
          <div class="set-body">
            <p class="settings-hint">Toys built on the same data, living outside the app in their own tab so they cannot disturb it. Nothing here is a real feature.</p>
            <div class="lab-row">
              <a class="lab-card" href="lab/formula-web.html" target="_blank" rel="noopener">
                <span class="lab-name">Formula Web ${uiIcon("arrow-right")}</span>
                <span class="lab-desc">Every card as a dot, clustered by subsection, with the hand-written cross-links drawn between them. Hover to isolate one card and its neighbours; click to open it.</span>
              </a>
              <a class="lab-card" href="lab/quiz.html" target="_blank" rel="noopener">
                <span class="lab-name">Quiz ${uiIcon("arrow-right")}</span>
                <span class="lab-desc">Pick a list and name the formula from its statement and figure, four choices at a time. Wrong answers come from the same subsection, so they are not giveaways.</span>
              </a>
              <a class="lab-card" href="lab/flashcards.html" target="_blank" rel="noopener">
                <span class="lab-name">Flashcards ${uiIcon("arrow-right")}</span>
                <span class="lab-desc">Spaced-repetition review of any section or study list: see a name and recall its formula, or the reverse. Cards you know come back less and less often; misses come back the same session.</span>
              </a>
              <a class="lab-card" href="lab/topic-tree.html" target="_blank" rel="noopener">
                <span class="lab-name">Topic tree ${uiIcon("arrow-right")}</span>
                <span class="lab-desc">Explore contest mathematics in four subject trees: Algebra, Counting &amp; Probability, Geometry and Number Theory, as an outline or a diagram.</span>
              </a>
            </div>
          </div>
        </details>
      </div>
      </div>
      <aside class="set-preview" aria-label="Preview"></aside>
      </div>`;
    if (getRoute().anchor === 'credits') setTimeout(() => $content.querySelector('#set-credits')?.scrollIntoView({block:'start'}), 0);
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
      if (e.target.closest("[data-reset-strategies]")) {
        strategyResetToken = String(Date.now());
        try { localStorage.setItem("mq-strategy-reset", strategyResetToken); } catch (err) { storageFailed(); }
        toast("Opened strategies reset");
        return;
      }
      const btn = e.target.closest("[data-set]");
      if (!btn) return;
      const key = btn.dataset.set, val = btn.dataset.val;
      if (key === "theme") { applyTheme(val); }
      else {
        const next = key === "tags" ? (val === "on") : val;
        if (state[key] === next) return;
        state[key] = next;
        if (key === "strategy") state.strategyChosen = true;
        applyLayout();
        saveSettings();
      }
      renderSettingsPage();
    });
    // Search settings (owner, 2026-10-31): each setting is found by its name, by the words people
    // actually use for it ("dark mode", "font size", "spoilers"), by its options, and then by its
    // description; one typo is forgiven, and filler words ("how do I change") are ignored.
    // Choosing a result scrolls to the setting and underlines its name for a moment.
    (() => {
      const box = $content.querySelector(".set-find-input"), list = $content.querySelector(".set-find-list");
      if (!box || !list) return;
      const ALSO = {
        theme: "dark mode, light mode, night mode, dark theme, light theme, mode, colors, colours, color scheme, black background, white background, appearance, eyes, contrast, night",
        density: "spacing, space, compact, spacious, padding, margins, crowded, cramped, roomy, whitespace, layout, tight, dense, gaps",
        cols: "card size, bigger cards, larger cards, smaller cards, card width, columns, grid, wide cards",
        text: "font size, font, fonts, bigger text, larger text, small text, text size, zoom, readability, letters, type size, words",
        lines: "formula rows, rows, how many lines, truncate, shorten cards, formulas on cards, lines",
        tags: "keywords, keyword, chips, labels on cards, tags, topics",
        notation: "sigma, summation, sum notation, product notation, expanded terms, sums, products, symbols",
        diagrams: "figures, figure, pictures, images, drawings, thumbnails, diagrams, graphics, illustrations",
        tools: "page tools, sidebar on the right, right column, wikipedia, print, printing, permanent link, permalink, what links here, tools",
        scroll: "scrolling, scroll, mouse wheel, wheel, trackpad, touchpad, scroll speed, too fast, too slow, speed",
        layout: "a to z, alphabetical, index, list of names, list view, subject pages, layout",
        order: "sort, sorting, ordering, order, popular, most used, curated, arrange, rank",
        start: "startup, start page, home page, homepage, landing page, open on, launch, default page, front page, first page, when it opens",
        lessonLinks: "lesson links, drawer, open cards beside, side panel, card links, links, preview, popup",
        lessonWidth: "lesson width, text width, line length, wide text, narrow text, full width, reading width, column, paragraphs, lesson text",
        strategy: "spoilers, spoiler, solution, solutions, reveal, answers, answer, hide the strategy, show the strategy, how this problem works, hints",
        "Export progress": "export data, export, save data, my data, data, backup, back up, save my progress, save, download, file, json, transfer, move to another browser, keep my lists, history, stars",
        "Import progress": "import data, import, load data, data, restore, upload, load a backup, file, json, transfer, from another browser, reset",
        commands: "commands, command, run, special random, random card, random problem, console, shortcuts"
      };
      const STOP = new Set("how do i to the a an my me of in for can change set setting settings make turn enable disable want where is are it this on off use get put way option options".split(" "));
      // Word endings fall away, so "exports" finds "export" and "printing" finds "print".
      const stem = w => w.length > 4 ? w.replace(/(ings?|ed|es|s)$/, "") : w;
      const words = t => t.toLowerCase().replace(/[^a-z0-9& ]+/g, " ").split(/\s+/).filter(Boolean).map(stem);
      const near = (a, b) => {   // one edit apart, for words of four letters or more
        if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
        let i = 0, j = 0, d = 0;
        while (i < a.length && j < b.length) { if (a[i] === b[j]) { i++; j++; continue; } if (++d > 1) return false; if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; } }
        return d + (a.length - i) + (b.length - j) <= 1;
      };
      const rows = [...$content.querySelectorAll(".settings-page .set-row")];
      const items = rows.map((r, i) => {
        const name = ((r.querySelector(".set-name") || {}).textContent || "").trim();
        const desc = ((r.querySelector(".set-desc") || {}).textContent || "").trim();
        const panel = r.closest(".set-panel"), group = panel ? ((panel.querySelector(".set-panel-title") || {}).textContent || "").replace(/for fun$/, "").trim() : "";
        const btn = r.querySelector("[data-set]"), key = btn ? btn.dataset.set : null;
        const opts = [...r.querySelectorAll("[data-set], .seg button")].map(b => b.textContent).join(" ");
        const also = ALSO[key] || ALSO[name] || "";
        r.dataset.findId = i;
        return { i, name, group, nameW: words(name), alsoW: words(also), phrases: also.toLowerCase().split(/\s*,\s*/), optW: words(opts), descW: words(desc + " " + group) };
      }).filter(it => it.name);
      // The Commands panel has no rows; it is found as one item, by its title.
      const cmd = $content.querySelector("#set-commands");
      if (cmd) {
        const i = rows.length;
        cmd.dataset.findId = i;
        items.push({ i, name: "Commands", group: "Commands", nameW: words("Commands"), alsoW: words(ALSO.commands), phrases: ALSO.commands.split(/\s*,\s*/),
          optW: [], descW: words(cmd.textContent.slice(0, 600)) });
      }
      // A setting is shown when most of the words are found, ranked by how many and how well:
      // its name first, then the everyday words for it, its options, and its description.
      const score = (it, q) => {
        const ws = words(q).filter(w => !STOP.has(w));
        if (!ws.length) return 0;
        const ql = ws.join(" ");
        let total = it.phrases.some(ph => { const p2 = words(ph).join(" "); return p2 && (p2 === ql || p2.startsWith(ql) || (" " + ql + " ").includes(" " + p2 + " ")); }) ? 30 : 0;
        if (words(it.name).join(" ").startsWith(ql)) total += 20;
        let found = 0, strong = false;
        for (const w of ws) {
          const pre = list => list.some(x => x === w) ? 2 : list.some(x => x.startsWith(w) || (w.length >= 5 && w.startsWith(x) && x.length >= 4)) ? 1.2 : list.some(x => near(w, x)) ? 0.8 : 0;
          const parts = [pre(it.nameW) * 6, pre(it.alsoW) * 5, pre(it.optW) * 3, pre(it.descW) * 1.2];
          const s = Math.max(...parts);
          if (s) { found++; total += s; if (Math.max(parts[0], parts[1], parts[2]) > 0) strong = true; }
        }
        if (!found || found * 2 < ws.length) return 0;
        if (!strong && !total) return 0;
        return total * (found / ws.length) + (strong ? 2 : 0);
      };
      let hits = [], cur = -1;
      const draw = () => {
        const q = box.value.trim();
        if (!q) { list.hidden = true; list.innerHTML = ""; return; }
        hits = items.map(it => ({ it, s: score(it, q) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 7).map(x => x.it);
        cur = hits.length ? 0 : -1;
        list.innerHTML = hits.length ? hits.map((it, k) => `<button type="button" class="set-find-opt${k === cur ? " is-cur" : ""}" role="option" data-find="${it.i}"><span class="set-find-name">${escapeAttr(it.name)}</span><span class="set-find-group">${escapeAttr(it.group)}</span></button>`).join("")
          : `<div class="set-find-none">No setting matches.</div>`;
        list.hidden = false;
      };
      const go = i => {
        const row = $content.querySelector(`[data-find-id="${i}"]`);
        list.hidden = true;
        if (!row) return;
        const lab = row.closest("details");
        if (lab) lab.open = true;
        const bar = document.querySelector(".topbar");
        const top = row.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - (window.innerHeight - row.offsetHeight) / 3;
        // The underline draws only once the page has stopped scrolling, so it is seen (owner, 2026-10-31).
        const mark = () => {
          row.classList.remove("set-found"); void row.offsetWidth; row.classList.add("set-found");
          setTimeout(() => row.classList.remove("set-found"), 2600);
        };
        const target = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
        window.scrollTo({ top: target, behavior: window.AppAccessibility.scrollBehavior() });
        let last = -1, still = 0, n = 0;
        const wait = () => {
          const y = window.scrollY;
          still = Math.abs(y - last) < 1 ? still + 1 : 0;
          last = y;
          if ((still >= 3 && (Math.abs(y - target) < 2 || n > 10)) || ++n > 120) { setTimeout(mark, 60); return; }
          requestAnimationFrame(wait);
        };
        requestAnimationFrame(wait);
      };
      box.addEventListener("input", draw);
      box.addEventListener("focus", draw);
      box.addEventListener("keydown", e => {
        if (list.hidden || !hits.length) { if (e.key === "Escape") box.blur(); return; }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          cur = (cur + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length;
          list.querySelectorAll(".set-find-opt").forEach((b, k) => b.classList.toggle("is-cur", k === cur));
        } else if (e.key === "Enter") { e.preventDefault(); go(hits[cur].i); box.blur(); }
        else if (e.key === "Escape") { list.hidden = true; }
      });
      list.addEventListener("mousedown", e => e.preventDefault());
      list.addEventListener("click", e => { const b = e.target.closest("[data-find]"); if (b) { go(+b.dataset.find); box.blur(); } });
      // The pointer moves the selection, so only one option is ever highlighted (owner, 2026-11-07).
      list.addEventListener("mousemove", e => {
        const b = e.target.closest(".set-find-opt"), opts = [...list.querySelectorAll(".set-find-opt")], k = opts.indexOf(b);
        if (k >= 0 && k !== cur) { cur = k; opts.forEach((o, j) => o.classList.toggle("is-cur", j === cur)); }
      });
      box.addEventListener("blur", () => setTimeout(() => { list.hidden = true; }, 120));
    })();
    // Pointing at a setting dims the preview screens it does not change.
    const $page = $content.querySelector(".settings-page"), $pv = $content.querySelector(".set-preview");
    $page.addEventListener("mouseover", e => {
      const row = e.target.closest(".set-row");
      if (row && row.dataset.pv) { $pv.dataset.focus = row.dataset.pv; if ($pv.pvReveal) $pv.pvReveal(row.dataset.pv); } else delete $pv.dataset.focus;
    });
    $page.addEventListener("mouseleave", () => { delete $pv.dataset.focus; });
  }

  // ---------- Export and import progress (Settings -> Your progress) ----------
  // Everything this browser keeps for the app, in one versioned JSON file. Version 1 holds each
  // localStorage key's value as parsed JSON (a plain string where the key holds one). An import
  // merges study lists, so a list built on this device is never lost to an older file, and
  // replaces the rest; then the page reloads to read it back.
  const PROGRESS_FORMAT = "competition-math-reference/progress", PROGRESS_VERSION = 1;
  const PROGRESS_KEYS = ["mq-settings", "mq-lists", "mq-recent", "theme", "mq-flashcards", "mq-flashcards-prefs", "mq-quiz-misses", "mq-learn", "mq-practice-sets"];
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
  // Returns a message for the reader; throws on a file that is not a progress file, or when the
  // browser will not store it. The import is all or nothing (a user's report, 2026-10-31): the
  // file is checked and every new value worked out first (lists merged on a copy), the current
  // values are kept, then everything is written; if any write fails, every key is put back as it
  // was, and the message says whether that worked.
  function importProgress(text) {
    const obj = JSON.parse(text);
    if (!obj || obj.format !== PROGRESS_FORMAT || !obj.data || typeof obj.data !== "object") throw new Error("This is not a progress file exported from this app.");
    if (!(obj.version >= 1 && obj.version <= PROGRESS_VERSION)) throw new Error("This file was made by a newer version of the app (format " + obj.version + ").");
    const d = obj.data;
    // 1. Stage every value to write.
    const staged = {};
    PROGRESS_KEYS.forEach(k => {
      if (!(k in d) || k === "mq-lists" || k === "mq-practice-sets" || d[k] == null) return;
      staged[k] = typeof d[k] === "string" ? d[k] : JSON.stringify(d[k]);
    });
    const inc = d["mq-lists"];
    if (inc && Array.isArray(inc.items)) {
      const merged = JSON.parse(JSON.stringify(lists));   // a copy: the lists in use stay as they are until the import succeeds
      inc.items.forEach(l => {
        if (!l || typeof l.id !== "string" || !Array.isArray(l.ids)) return;
        const ids = l.ids.filter(x => typeof x === "string");
        const mine = merged.items.find(m => m.id === l.id);
        // A list's grouping comes along: its custom sections (shown or set aside) and its
        // automatic grouping. A list already here keeps its own; one with none takes the file's
        // (owner, 2026-11-08), so restoring a backup onto a device with the list loses nothing.
        const sections = key => Array.isArray(l[key]) ? l[key].filter(sec => sec && Array.isArray(sec.ids)).map(sec => ({
          title: String(sec.title || "").slice(0, 80), note: String(sec.note || "").slice(0, 300),
          ids: sec.ids.filter(id => typeof id === "string" && ids.includes(id)) })) : null;
        const takeGrouping = item => {
          const has = key => Array.isArray(item[key]) && item[key].length;
          if (!has("customSections") && !has("customOff")) {
            for (const key of ["customSections", "customOff"]) { const v = sections(key); if (v) item[key] = v; }
          }
          if (!Array.isArray(item.groupedIds) && !has("customSections") && Array.isArray(l.groupedIds)) item.groupedIds = ids.filter(id => l.groupedIds.includes(id));
        };
        if (mine) {
          ids.forEach(id => { if (mine.ids.indexOf(id) === -1) mine.ids.push(id); });
          if (!mine.blurb && typeof l.blurb === "string" && !mine.builtin) mine.blurb = l.blurb;
          takeGrouping(mine);
        }
        else {
          const item = { id: l.id, name: String(l.name || "Imported list"), ids };
          if (typeof l.blurb === "string") item.blurb = l.blurb;
          takeGrouping(item);
          merged.items.push(item);
        }
      });
      staged["mq-lists"] = JSON.stringify(merged);
    }
    if (d["mq-practice-sets"] != null) {
      const incoming = practiceSessions.read({ getItem: () => JSON.stringify(d["mq-practice-sets"]) });
      const merged = new Map(practiceSessions.read(localStorage).map(s => [s.id, s]));
      for (const set of incoming) if (!merged.has(set.id) || set.updated > merged.get(set.id).updated) merged.set(set.id, set);
      staged["mq-practice-sets"] = JSON.stringify([...merged.values()]);
    }
    const keys = Object.keys(staged);
    if (!keys.length) throw new Error("This file holds no progress to import.");
    // 2. Keep what is there now.
    const before = {};
    try { keys.forEach(k => { before[k] = localStorage.getItem(k); }); }
    catch (e) { throw new Error("This browser is blocking storage, so nothing was imported. Your progress is unchanged."); }
    // 3. Write everything; on a failure, put every key back.
    try {
      keys.forEach(k => localStorage.setItem(k, staged[k]));
    } catch (e) {
      let restored = true;
      keys.forEach(k => {
        try { if (before[k] == null) localStorage.removeItem(k); else localStorage.setItem(k, before[k]); }
        catch (e2) { restored = false; }
      });
      throw new Error(restored
        ? "This browser's storage is full or blocked, so nothing was imported. Your progress is unchanged."
        : "The import stopped partway and your previous progress could not be fully put back. Export what you have now before trying again.");
    }
    return "Imported progress from " + (obj.exported ? String(obj.exported).slice(0, 10) : "the file") + ". Reloading\u2026";
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
      appConfirm({ title: "Import this file?", text: "Your lists keep their cards and gain the file's; your settings, theme, and flashcard progress are replaced.", ok: "Import" })
        .then(yes => { if (yes) return f.text(); file.value = ""; return null; })
        .then(t => {
        if (t == null) return;
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
  let pvStart = 0;   // the first preview screen shown, kept while Settings re-draws
  // Chosen so every setting changes something: several formula rows (Formula lines), a sigma
  // in the first row (Notation), and figures (Figures on cards).
  // No card here is also the card-page screen's card (owner, 2026-10-31: no screen repeats another).
  const PV_CARDS = ["altitude-hypotenuse", "stars-and-bars", "linear-recurrence", "power-of-a-point"];
  const PV_PAGE = "hockey-stick", PV_SUBJECT = "number-theory", PV_PROBLEM = "2025 AMC 10A, Problem 9";
  let pvResize = null;
  // A screen may be laid out wider than the others (the subject page carries the sidebar too),
  // keeping the same proportions, so all three frames are the same size.
  function pvScreen(key, label, inner, w) {
    const space = key === "problem" ? "practice" : key === "lesson" ? "learn" : "formulas";
    return `<figure class="pv-screen" data-pv="${key}"><div class="pv-frame"><div class="pv-inner" data-space="${space}" style="--space:var(--c-${space});--space-soft:var(--cs-${space})"${w ? ` data-w="${w}"` : ""}>${inner}</div></div><figcaption class="pv-label">${label}</figcaption></figure>`;
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
        <p class="detail-crumb">${entry.section.title} ${uiIcon("chevron-right")} ${entry.subsection.title}</p>
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
  // A lesson, for "Card links in lessons": with "Open beside the lesson" a card's preview sits
  // beside the text; with "Go to the card" the lesson keeps the whole width.
  function pvLessonHtml() {
    // The lesson page itself (its rail, title bars, heading and card rows), drawn by the page's
    // own code; with "Opens in the lesson" a card is open in the drawer beside it.
    const b = LEARN_SHELF.find(x => x.id === "aime-counting"), c = b && b.chapters.find(x => x.code === "C5");
    const l = c && c.lessons.find(x => x.code === "C5.2"), d = l && learnLessonData(c, l);
    if (!d) return "";
    return learnBookShellHtml(b, c, l, learnLessonMainHtml(b, c, l, d), state.lessonLinks === "drawer" ? learnDrawerInnerHtml("recursive-counting") : "");
  }

  function pvProblemHtml() {
    const p = PROBLEM_DB.find(x => x.ref === PV_PROBLEM);
    return p ? problemDetailHtml(p, true) : "";
  }

  // The subject page beside its sidebar, drawn with the sidebar's own markup, so density shows
  // in the navigation as well as in the page.
  function pvSidebarHtml(active) {
    const rows = SECTIONS.filter(sc => bookOf(sc) === "formulas").map(sc => `
      <div class="nav-section${sc.id === active ? " open" : ""}">
        <button class="nav-section-btn${sc.id === active ? " active" : ""}"><span>${sc.title}</span><span class="nav-count">${sectionCount(sc)}</span></button>
        <div class="nav-subs"><div class="nav-subs-inner">${sc.subsections.map((sub, i) => `<span class="nav-sub-link${sc.id === active && i === 0 ? " active" : ""}">${sub.title}</span>`).join("")}</div></div>
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
    // Three screens at a time, large enough to read, with an arrow on each side to step through
    // them (owner, 2026-10-31); pointing at a setting brings the screen it changes into view.
    aside.innerHTML = `<div class="pv-title">Preview</div>
      <button type="button" class="pv-nav pv-prev" aria-label="Earlier previews">${uiIcon("chevron-left")}</button>
      <div class="pv-track" inert>` +
      pvScreen("browse", "Cards while browsing", pvBrowseHtml()) +
      pvScreen("page", "A card&rsquo;s page", pvPageHtml()) +
      pvScreen("subject", "A subject page", pvSubjectHtml(), PV_W + 260) +
      pvScreen("problem", "A problem page", pvProblemHtml()) +
      pvScreen("lesson", "A lesson", pvLessonHtml(), PV_W + 260) +
      `</div>
      <button type="button" class="pv-nav pv-next" aria-label="More previews">${uiIcon("chevron-right")}</button>`;
    const SHOW = 3, screens = [...aside.querySelectorAll(".pv-screen")];
    let start = pvStart;
    const showFrom = k => {
      start = pvStart = Math.max(0, Math.min(screens.length - SHOW, k));
      screens.forEach((sc, i) => { sc.hidden = i < start || i >= start + SHOW; });
      aside.querySelector(".pv-prev").disabled = start === 0;
      aside.querySelector(".pv-next").disabled = start + SHOW >= screens.length;
    };
    aside.querySelector(".pv-prev").addEventListener("click", () => showFrom(start - 1));
    aside.querySelector(".pv-next").addEventListener("click", () => showFrom(start + 1));
    aside.pvReveal = keys => {
      const want = String(keys || "").split(/\s+/).filter(Boolean);
      if (!want.length || screens.some((sc, i) => !sc.hidden && want.includes(sc.dataset.pv))) return;
      const i = screens.findIndex(sc => want.includes(sc.dataset.pv));
      if (i >= 0) showFrom(i < start ? i : i - SHOW + 1);
    };
    showFrom(pvStart);   // a setting changed re-draws the page; the preview stays where it was
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
      const nScreens = Math.min(SHOW, frames.length);
      let fixed = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.rowGap || 0) * nScreens;
      fixed += aside.querySelector(".pv-title").offsetHeight;
      const label = aside.querySelector(".pv-screen:not([hidden]) .pv-label");
      fixed += nScreens * ((label ? label.offsetHeight : 17) + 5);
      // The screens and their two arrows form one block of a comfortable size at the right of
      // the window, and the dividing line sits midway between the settings and that block, so it
      // is close to neither (owner, 2026-10-31).
      const right = page ? page.getBoundingClientRect().right : 0;
      const vw = document.documentElement.clientWidth, EDGE = 28, ARROW = 30, GAP = 14, MIN_SPACE = 48;
      const room = vw - right - EDGE - 2 * (ARROW + GAP) - 2 * MIN_SPACE;
      let w = Math.min(520, (aside.clientHeight - fixed) / nScreens * PV_W / PV_H, room);
      w = Math.max(120, w);
      const blockLeft = vw - EDGE - (w + 2 * (ARROW + GAP));
      const line = Math.round((right + blockLeft) / 2);
      aside.style.setProperty("--pv-left", line + "px");
      aside.style.paddingLeft = (blockLeft - line + ARROW + GAP) + "px";
      aside.style.paddingRight = (EDGE + ARROW + GAP) + "px";
      aside.querySelector(".pv-prev").style.left = (blockLeft - line) + "px";
      aside.querySelector(".pv-next").style.right = EDGE + "px";
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
    fitBatch([...aside.querySelectorAll(".card .formula-display[data-latex], .lp-preview .formula-display[data-latex]")]);
    // The problem screen's statement and solution load as on the page itself.
    const pvp = PROBLEM_DB.find(x => x.ref === PV_PROBLEM);
    if (pvp) { if (MAA_RE.test(pvp.ref)) showStatement(pvp, ".pv-st"); if (SOLUTION_YEARS.has(String(pvp.year))) showSolution(pvp, ".pv-sol"); }
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
      parts.push(`<div class="empty-state"><div class="big">${uiIcon("empty")}</div>No ${pageTitle(section, only)} cards match the current filters.</div>`);
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
  // Only the AMC and AIME problems, whose statements are stored, so the panel can show the text itself.
  function dailyProblem() { return dayPick(PROBLEM_DB.filter(p => p.strategy && p.formulas.length >= 1 && MAA_RE.test(p.ref)), 7); }
  function dailyCard() {
    const pool = ALL.filter(e => (tierKey(e.formula) === "amc" || tierKey(e.formula) === "aime-early") && (window.MATH_EXAMPLES || {})[e.formula.id])
      .sort((a, b) => a.formula.id.localeCompare(b.formula.id));
    return dayPick(pool, 3);
  }
  // Problem of the day: try it first; the ideas it uses stay folded until asked for.
  function dailyProblemHtml() {
    const p = dailyProblem();
    if (!p) return "";
    // The panel opens the problem's page, except its tag chips, which open their tag pages (a link
    // inside an .hp-click panel keeps its own click). The statement is filled in once its year's file loads.
    return `<div class="hp-panel hp-daily hp-click" data-open="#/problem/${p.slug}" role="link" tabindex="0" aria-label="Open ${escapeAttr(refShort(p.ref))}">
        <div class="hp-label">Problem of the day</div>
        <div class="daily-title">${refShort(p.ref)}</div>
        <div class="daily-types">${p.types.slice(0, 4).map(t => `<a class="daily-type" href="${TOPICS_BY_ID[t.id] ? tagHash([TOPICS_BY_ID[t.id].label]) : "#/topic/" + t.id}">${escapeAttr(t.label)}</a>`).join("")}</div>
        <section class="prob-st daily-st" data-slug="${p.slug}" hidden>
          <div class="prob-statement"></div>

        </section>
        <p class="daily-note">Try it first, then open it for the ideas it uses and the strategy.</p>
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
      if (k[0] === "l" || k[0] === "b") {
        if (kinds && kinds.indexOf("lesson") === -1) return "";
        if (k[0] === "b") {
          const b = LEARN_SHELF.find(x => x.id === id);
          return b ? `<a class="rc-row" href="${learnHash(b)}"><span class="badge badge-lesson">BOOK</span><span class="rc-name">${escapeAttr(b.title)}</span><span class="rc-meta">Learn</span></a>` : "";
        }
        const at = learnLessonByCode(id);
        return at && learnLessonData(at.c, at.l) ? `<a class="rc-row" href="${learnHash(at.b, at.c, lessonNum(at.l))}"><span class="badge badge-lesson">LESSON</span><span class="rc-name">${at.l.code} ${escapeAttr(at.l.title)}</span><span class="rc-meta">${escapeAttr(at.b.title)}</span></a>` : "";
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
  // of their cards (or its opening sentence), as text only.
  // Pool keys: a card id for a card's own observation, "w:<n>" for the n-th written fact in
  // js/data/did-you-know.js (whose card must exist).
  function didYouKnowPool() {
    const ids = [];
    (window.MATH_BUILTIN_LISTS || []).filter(l => l.kind === "curiosity").forEach(l => l.sections.forEach(sec => sec.ids.forEach(id => { if (BY_ID[id] && ids.indexOf(id) < 0) ids.push(id); })));
    (window.MATH_DYK || []).forEach((d, i) => { if (BY_ID[d.card]) ids.push("w:" + i); });
    return ids;
  }
  function didYouKnowFact(id) {
    if (id.startsWith("w:")) return window.MATH_DYK[+id.slice(2)].fact;
    const body = (window.MATH_DETAILS || {})[id] || "";
    const m = body.match(/## Useful observations\n+- ([^\n]+)/);
    const raw = m ? m[1].replace(/ — .*$/, "") : leadSentences(BY_ID[id].formula.description, 240);
    return raw;
  }
  // One fact a day, the same all day (owner, 2026-10-31: fixed, with no "Another").
  function didYouKnowPick() { return dayPick(didYouKnowPool(), 11); }
  function didYouKnowHtml() {
    const key = didYouKnowPick();
    if (!key) return "";
    const id = key.startsWith("w:") ? window.MATH_DYK[+key.slice(2)].card : key;
    const f = BY_ID[id].formula;
    return `<section class="hp-panel dyk">
        <div class="hp-label">Did you know?</div>
        <p class="dyk-fact">${linkifyCards(didYouKnowFact(key))}</p>
        <div class="dyk-foot"><a href="#/f/${id}">From ${f.name} ${uiIcon("arrow-right")}</a></div>
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
    return `<section class="hp-panel hm-newest">
        <div class="hp-label">Newest cards</div>
        <div class="rc-list">${rows}</div>
        <a class="hp-link" href="${specialHref("NewCards", "All")}">Every new card, newest first ${uiIcon("arrow-right")}</a>
      </section>`;
  }
  // Practice at a glance: the main contests, how many problems each has and how many are
  // written up, with a way into the latest year.
  function practiceGlanceHtml() {
    const main = FAMILIES.filter(f => /^(AMC 8|AJHSME|AMC 10|AMC 12|AIME)$/.test(f));
    const rows = main.map(f => {
      const years = Object.keys(DB_TREE[f]).sort();
      const all = years.reduce((n, y) => n + DB_TREE[f][y].length, 0);
      const done = famWritten(f);
      const latest = years[years.length - 1];
      return `<a class="pg-row" href="#/problems/${famSlug(f)}/${latest}"><span class="pg-fam">${f}</span><span class="pg-n">${all.toLocaleString()} problems, ${years[0]}&ndash;${latest}</span><span class="pg-done">${done.toLocaleString()} written up</span></a>`;
    }).join("");
    return `<section class="hp-panel hm-glance">
        <div class="hm-h-row"><div class="hp-label">Practice at a glance</div><a class="hm-more hm-more-practice" href="#/practice">See all ${uiIcon("arrow-right")}</a></div>
        <div class="pg-list">${rows}</div>
      </section>`;
  }

  // The front page: what the app is, why it helps and how to use it, beside what helps today
  // (where you left off, the problem and card of the day, your library). The four spaces and
  // the search sit above both, so nothing needs a scroll to reach.
  function renderLanding() {
    shownIds = [];
    const count = kind => ALL.filter(e => e.kind === kind).length;
    const card = dailyCard();
    const starIds = liveIds(getList("starred"));
    const mine = lists.items.filter(l => l.id !== "starred");
    const nProblems = PROBLEM_DB.length.toLocaleString();   // every contest problem, HMMT included
    // Each space says in one line what it holds; the sidebar already lists every subject, so the
    // front page does not repeat the four spaces a third time.
    const SPACE_WHAT = {
      formulas: "Theorems and identities, each with why it holds, when it applies, and a worked example.",
      methods: "Moves that make progress, with when to reach for them and how to carry them out.",
      patterns: "Problem shapes worth recognizing on sight, and what to try when you see one.",
      learn: "Textbooks that teach the cards in order, with checks and contest problems, and the study lists.",
      practice: "Real AMC and AIME problems, linked to the patterns, methods, and formulas they use."
    };

    const tile = (sp, n) => `<a class="hs-tile" data-tint="${sp}" href="#/${sp}"><b>${SPACES[sp].label}</b><span class="hs-ask">${SPACES[sp].ask}</span><span class="hs-what">${SPACE_WHAT[sp]}</span><span class="hs-n">${n}</span></a>`;
    // The front page (owner, 2026-10-31, second version): the app's own top bar holds the
    // spaces and the search, so the page itself is dense, like a reference site's front page:
    // one strip of the spaces (Reference, holding Formulas, Methods and Patterns as the top bar
    // does since 2026-11-11, then Learn and Practice), then a main column and a rail of short sections divided by
    // hairlines rather than boxed.
    // Continue: the cards and problems opened lately. Lessons and books are left to Learn's own
    // "Recently opened" (owner, 2026-10-31: too many lessons crowded the home page).
    const recentCards = recentRowsHtml(6, ["formula", "method", "pattern", "problem"]);
    const bookRows = LEARN_SHELF.slice(0, 6).map(b => `<a class="hm-book" href="${learnHash(b)}">${bookCoverHtml(b, "s")}<span class="hm-book-t">${escapeAttr(b.title)}</span><span class="hm-book-n">${learnLessonsIn(b)} lessons</span></a>`).join("");
    $content.innerHTML = `
      <div class="home">
        <div class="hm-intro">
          <h1 class="hm-name">Competition Math Reference</h1>
          <p class="hm-sub">Formulas, methods, patterns, textbooks, and real contest problems for AMC 10/12, AIME, and olympiad, all linked to each other.</p>
        </div>
        <nav class="hm-spaces" aria-label="Spaces">
          <div class="hm-refcell">
            <span class="hm-ref-bar" aria-hidden="true">${["formulas", "methods", "patterns"].map(sp => `<i data-tint="${sp}"></i>`).join("")}</span>
            <span class="hm-ref-name">Reference</span>
            <span class="hm-space-ask">Every formula, method and pattern</span>
            <span class="hm-ref-links">${[["formulas", count("formula")], ["methods", count("method")], ["patterns", count("pattern")]].map(([sp, n]) =>
              `<a class="hm-ref-link" data-tint="${sp}" href="#/${sp}" title="${escapeAttr(SPACES[sp].ask)}"><b>${SPACES[sp].label}</b>${n}</a>`).join("")}</span>
          </div>${["learn", "practice"].map(sp => `
          <a class="hm-space" data-tint="${sp}" href="#/${sp}">
            <span class="hm-space-name">${SPACES[sp].label}</span>
            <span class="hm-space-ask">${SPACES[sp].ask}</span>
            <span class="hm-space-n">${{ learn: `${LEARN_SHELF.length} books`, practice: `${nProblems} problems` }[sp]}</span>
          </a>`).join("")}
        </nav>
        <div class="hm-cols">
          <div class="hm-main">
            <section class="hm-sec hm-continue">
              <h2 class="hm-h">Recently opened</h2>
              ${recentCards ? `<div class="rc-list">${recentCards}</div>` : `<p class="hp-empty">Cards and problems you open will appear here.</p>`}
            </section>
            ${dailyProblemHtml()}
            ${newestCardsHtml()}
            ${practiceGlanceHtml()}
          </div>
          <aside class="hm-rail">
            <section class="hm-sec hm-textbooks">
              <div class="hm-h-row"><h2 class="hm-h">Textbooks</h2><a class="hm-more" href="#/learn">See all ${uiIcon("arrow-right")}</a></div>
              <div class="hm-books">${bookRows}</div>
            </section>
            ${card ? `<section class="hm-sec hm-cotd hp-click" data-open="#/f/${card.formula.id}" role="link" tabindex="0" aria-label="Open ${escapeAttr(card.formula.name.replace(/\$/g, ""))}">
              <h2 class="hm-h">Card of the day</h2>
              <div class="rc-row">${kindBadgeHtml(card.formula)}<span class="rc-name">${card.formula.name}</span></div>
              <p class="home-cotd">${firstSentences(card.formula.description, 1)}</p>
            </section>` : ""}
            ${didYouKnowHtml()}
            <section class="hm-sec hm-library">
              <h2 class="hm-h">Your library</h2>
              ${starIds.length
                ? `<div class="rc-list">${starIds.slice(0, 4).map(id => `<a class="rc-row" href="#/f/${id}"><span class="rc-star">${uiIcon("star")}</span><span class="rc-name">${BY_ID[id].formula.name}</span></a>`).join("")}</div>
                   <a class="hp-link" href="#/list/starred">All ${starIds.length} starred ${uiIcon("arrow-right")}</a>`
                : `<p class="hp-empty">Use the star button ${uiIcon("star-outline")} on a card to keep it here.</p>`}
              <div class="hp-mine-foot">
                <a href="#/learn" data-list-new>Make a list</a>
                <a href="#/learn" data-goto="pr-study">Open a list</a>
              </div>
            </section>
          </aside>
        </div>
      </div>`;
    renderMath($content);
    const daily = dailyProblem();
    if (daily) showStatement(daily, ".daily-st");
    // The hero search waits for Search (or Enter), then hands off to the real search box: the
    // results page shows the header search again with the text in it, so typing continues
    // there.
    const box = document.getElementById("home-search");
    const handOff = v => {
      $search.value = v;
      $search.dispatchEvent(new Event("input", { bubbles: true }));
      $search.focus({ preventScroll: true });
      try { $search.setSelectionRange(v.length, v.length); } catch (e) {}
    };
    // A command typed here just runs (there is no header search or suggestion list on this page).
    const heroSearch = $content.querySelector(".home-search");
    if (heroSearch) heroSearch.addEventListener("submit", e => {
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
    learn: `Textbooks teach the cards in order: each lesson explains an idea, links the formulas, methods, and patterns it uses, and ends with problems of its own and contest problems. Lists gather cards by contest level or by theme, and your own lists keep the cards you choose.`,
    practice: `Real contest problems, each linked to the patterns, methods, and formulas it uses, with a strategy you can reveal.`
  };
  const KINDS_OF_SPACE = { formulas: ["formula"], methods: ["method"], patterns: ["pattern"], learn: ["lesson"], practice: ["problem"] };
  function spaceHeadHtml(name) {
    const recent = recentRowsHtml(6, KINDS_OF_SPACE[name]);
    return `<header class="space-home-head">
        <h2>${SPACES[name].label}</h2>
        <p class="sh-ask">${SPACES[name].ask}</p>
        <p class="sh-intro">${SPACE_INTROS[name]}</p>
      </header>
      ${recent ? `<div class="sh-recent"><span class="hp-label">Recently opened</span><div class="rc-chips">${recent}</div></div>` : ""}`;
  }
  // Shared five-level Elo rank selection, recalibrated after the contest/topic filter.
  const DIFFS = problemDifficulty.levels.map(level => level.id);
  function wireRandomPicker(root) {
    const box = root.querySelector(".rand-picker");
    if (!box) return;
    const go = box.querySelector(".rand-go"), range = box.querySelector("#rand-diff-range");
    let fam = "";
    const update = () => {
      const d = DIFFS[+range.value];
      const level = problemDifficulty.levels[+range.value].label;
      box.querySelector(".rand-diff-val").textContent = level;
      range.setAttribute("aria-valuetext", level);
      // What a level means in Elo terms (owner, 2026-11-11): the ratings it covers for the
      // chosen contest, drawn from the same pool and the same fifths the draw itself uses.
      const scope = fam ? `the ${fam} problems` : "all the problems";
      const elos = d ? problemDifficulty.filter(PROBLEM_DB.filter(p => !fam || p.fam === fam), d).map(p => p.elo) : [];
      box.querySelector(".rand-diff-note").textContent = elos.length
        ? `${level} is an Elo rating of ${Math.min(...elos)} to ${Math.max(...elos)}: one fifth of ${scope}, where a higher rating means a harder problem.`
        : `Difficulty goes by Elo rating: a higher rating means a harder problem. Each level is a fifth of ${scope}, from the lowest rated to the highest.`;
      go.href = "#/special/randomproblem" + (fam ? "/" + encodeURIComponent(fam) : "") + (d ? "/" + d : "");
    };
    box.querySelectorAll("[data-rand-fam]").forEach(b => b.addEventListener("click", () => {
      fam = b.dataset.randFam;
      box.querySelectorAll("[data-rand-fam]").forEach(x => x.setAttribute("aria-checked", x === b ? "true" : "false"));
      update();
    }));
    range.addEventListener("input", update);
    update();
  }
  const practiceSessions = window.PracticeSessions;
  const mockContests = window.MockContests;
  let mockClockInterval = 0, mockPaperCatalog = null;
  let practiceFinishConfirm = null;
  function cancelPracticeFinishConfirm() {
    practiceFinishConfirm?.abort();
    practiceFinishConfirm = null;
  }
  const isMock = set => set.kind === 'mock';
  const practiceSetLabel = set => isMock(set) && set.mock.mode === 'generated' ? 'Generated ' + set.mock.family : set.label;
  const hasMockAnswer = p => window.MATH_ANSWER_KEYS?.answers?.[p.slug] != null || !!window.MATH_MOCK_EXTRAS?.[p.slug];
  const isVoidedProblem = p => !!window.MATH_ANSWER_KEYS?.voided?.[p.slug];
  function mockPapers() { return mockPaperCatalog ||= mockContests.papers(PROBLEM_DB, hasMockAnswer); }
  function mockTime(ms) { const s=Math.ceil(Math.max(0,ms)/1000); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
  function mockScore(set) { return mockContests.score(set, slug=>practiceSessions.result(set,slug)); }
  function mockTimeSummary(set) {
    const used=set.clock.limitMs-practiceSessions.timeLeft(set);
    return `${set.timedOut ? 'Time limit reached · ' : ''}${mockTime(used)} used of ${mockTime(set.clock.limitMs)}`;
  }
  function startMockClock(set) {
    clearInterval(mockClockInterval); mockClockInterval=0;
    if(!isMock(set)||set.status==='finished')return;
    const tick=()=>{
      if(document.hidden||set.status==='paused')return;
      if(topicPracticeSet!==set||!location.hash.startsWith('#/practice/set/'+set.id)){clearInterval(mockClockInterval);return;}
      practiceSessions.checkpoint(set);
      if(set.status==='finished'){clearInterval(mockClockInterval);savePractice();toast('Time is up. Your mock has been graded.');renderTopicPracticeSet();return;}
      const el=$content.querySelector('.mock-clock-value'), box=$content.querySelector('.mock-clock');
      const left=practiceSessions.timeLeft(set);
      if(el)el.textContent=mockTime(left);
      if(box)box.classList.toggle('is-low',left<=5*60000);
    };
    tick();if(set.status!=='finished')mockClockInterval=setInterval(tick,1000);
  }
  function exactAnswerHtml(text) {
    if(!text)return '';
    try{return '$'+window.LearnAnswer.toTex(text)+'$';}catch(e){return escapeAttr(text);}
  }
  function mockPracticePanelHtml() {
    return `<section class="sh-section" id="pr-mock">
      <h3>Practice a contest</h3>
      <p class="practice-panel-intro">Take a past paper or build a mock from problems matched to recent contest difficulty. The timer pauses when you leave.</p>
      <form id="mock-contest-form"><fieldset aria-label="Mock contest options">
        <div class="rand-btns mock-modes" role="radiogroup" aria-label="Mock type">
          <button type="button" role="radio" aria-checked="true" data-mock-mode="paper">Past contest</button>
          <button type="button" role="radio" aria-checked="false" data-mock-mode="generated">Generate a mock</button>
        </div>
        <label class="mock-field-label">Contest</label>
        <div class="rand-btns" role="radiogroup" aria-label="Mock contest">${Object.keys(mockContests.formats).map((f,i)=>`<button type="button" role="radio" aria-checked="${i===0}" data-mock-family="${f}">${f}</button>`).join('')}</div>
        <div class="mock-paper-field">
          <label for="mock-paper-name">Year and paper</label>
          <div class="mock-paper-search"><input id="mock-paper-name" class="set-find-input" type="search" placeholder="Search a year or paper..." autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="mock-paper-options">
          <div id="mock-paper-options" class="set-find-list" role="listbox" aria-label="Past contests" hidden></div></div>
        </div>
        <p class="mock-generation-info" hidden>Uses older AMC and AIME problems, with HMMT also eligible. Each problem keeps its original answer format.</p>
        <p id="mock-contest-info" class="prob-note"></p><p id="mock-contest-status" role="status"></p>
        <button type="submit" class="hp-btn">Start mock</button>
      </fieldset></form>
    </section>`;
  }
  function wireMockPractice(root) {
    const form=root.querySelector('#mock-contest-form');if(!form)return;
    const input=form.querySelector('#mock-paper-name'), options=form.querySelector('#mock-paper-options');
    const status=form.querySelector('#mock-contest-status'), submit=form.querySelector('[type="submit"]'), info=form.querySelector('#mock-contest-info');
    const catalog=mockPapers();let family='AMC 8',mode='paper',active=-1,busy=false,choices=[];
    const currentPapers=()=>catalog.filter(g=>g.family===family);
    function close(){options.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');active=-1;}
    function highlight(){[...options.children].forEach((b,i)=>{b.classList.toggle('is-cur',i===active);b.setAttribute('aria-selected',String(i===active));});if(choices[active])input.setAttribute('aria-activedescendant','mock-paper-'+active);}
    function suggest(){
      const q=input.value.trim().toLowerCase();
      if(!q){choices=[];options.innerHTML='';close();return;}
      choices=currentPapers().filter(g=>g.label.toLowerCase().includes(q)).slice(0,8);
      options.innerHTML=choices.map((g,i)=>`<button type="button" class="set-find-opt" id="mock-paper-${i}" role="option" aria-selected="false">${escapeAttr(g.label)}</button>`).join('');
      active=choices.length?0:-1;options.hidden=!choices.length;input.setAttribute('aria-expanded',String(!options.hidden));highlight();
      [...options.children].forEach((b,i)=>{b.addEventListener('mousemove',()=>{active=i;highlight();});b.addEventListener('click',()=>{input.value=choices[i].label;update();input.focus();close();});});
    }
    function update(){
      const f=mockContests.formats[family],paper=currentPapers().find(g=>g.label.toLowerCase()===input.value.trim().toLowerCase());
      const model=mode==='generated'?mockContests.curve(catalog,family,isVoidedProblem):null;
      form.querySelector('.mock-paper-field').hidden=mode!=='paper';form.querySelector('.mock-generation-info').hidden=mode!=='generated';
      info.textContent=`${f.count} problems · ${f.minutes} minutes${model?' · Modeled on '+model.startYear+'–'+model.endYear:''}`;
      submit.textContent=mode==='paper'?'Start mock':'Generate mock';submit.disabled=busy||(mode==='paper'&&!paper);
      if(!busy)status.textContent='';
    }
    function setFamily(f){family=f;form.querySelectorAll('[data-mock-family]').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.mockFamily===f)));input.value='';choices=[];options.innerHTML='';close();update();}
    form.querySelectorAll('[data-mock-family]').forEach(b=>b.addEventListener('click',()=>setFamily(b.dataset.mockFamily)));
    form.querySelectorAll('[data-mock-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mockMode;form.querySelectorAll('[data-mock-mode]').forEach(x=>x.setAttribute('aria-checked',String(x===b)));close();update();}));
    input.addEventListener('focus',suggest);input.addEventListener('input',()=>{update();suggest();});
    input.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(options.hidden)suggest();else if(choices.length)active=(active+(e.key==='ArrowDown'?1:-1)+choices.length)%choices.length;highlight();}else if(e.key==='Enter'&&!options.hidden&&active>=0){e.preventDefault();options.children[active]?.click();}});
    form.addEventListener('focusout',e=>{if(!e.relatedTarget?.closest('.mock-paper-search'))close();});
    form.addEventListener('submit',async e=>{
      e.preventDefault();if(busy)return;
      const paper=currentPapers().find(g=>g.label.toLowerCase()===input.value.trim().toLowerCase());if(mode==='paper'&&!paper)return;
      busy=true;form.querySelector('fieldset').disabled=true;status.textContent='Loading mock problems...';
      try{
        const plan=mode==='paper'?{problems:paper.problems}:mockContests.generate(PROBLEM_DB,catalog,family,hasMockAnswer,isVoidedProblem);
        await Promise.all([...new Set(plan.problems.filter(p=>!window.MATH_MOCK_EXTRAS?.[p.slug]).map(p=>p.year))].map(loadStatements));
        if(!form.isConnected)return;
        if(plan.problems.some(p=>!window.MATH_STATEMENTS?.[p.slug]&&!window.MATH_MOCK_EXTRAS?.[p.slug]))throw Error('Some statements could not be loaded. Try again.');
        const label=mode==='paper'?paper.label:'Generated '+family;
        const mock={mode,family,durationMs:mockContests.formats[family].minutes*60000};
        if(plan.model){mock.modelStartYear=plan.model.startYear;mock.modelEndYear=plan.model.endYear;mock.targets=plan.model.targets;mock.hmmtException=true;}
        topicPracticeSet=practiceSessions.createMock(label,plan.problems.map(p=>p.slug),mock);savePractice();location.hash='#/practice/set/'+topicPracticeSet.id;
      }catch(err){status.textContent=err.message;}finally{busy=false;form.querySelector('fieldset').disabled=false;submit.disabled=false;}
    });
    // Arriving from a paper's "Mock this paper" button: its contest and paper are already
    // chosen, so Start mock is one press away.
    if (mockPreset && mockContests.formats[mockPreset.family] && catalog.some(g => g.label === mockPreset.label)) {
      setFamily(mockPreset.family); input.value = mockPreset.label; update();
      setTimeout(() => { if (submit.isConnected) submit.focus({ preventScroll: true }); }, 0);
    } else setFamily(family);
    mockPreset = null;
  }
  let mockPreset = null;
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-mock-preset]");
    if (a) mockPreset = { family: a.dataset.mockPresetFamily, label: a.dataset.mockPreset };
  }, true);
  let topicPracticeSet = null, practiceSaveTimer = 0, practiceSaveFailed = false;
  function schedulePracticeSave() { clearTimeout(practiceSaveTimer); practiceSaveTimer = setTimeout(savePractice, 120); }
  function savePractice() {
    clearTimeout(practiceSaveTimer);
    if (!topicPracticeSet) return;
    practiceSessions.checkpoint(topicPracticeSet);
    try { practiceSessions.save(localStorage, topicPracticeSet); practiceSaveFailed = false; }
    catch (err) { practiceSaveFailed = true; }
    const status = $content.querySelector('#practice-save-status');
    if (status) { status.hidden = !practiceSaveFailed; status.textContent = practiceSaveFailed ? 'Saving is unavailable in this browser. Keep this tab open to retain your set.' : ''; }
  }
  function pausePractice() {
    if (!topicPracticeSet) return;
    practiceSessions.pause(topicPracticeSet);
    savePractice();
  }
  window.addEventListener('pagehide', pausePractice);
  document.addEventListener('visibilitychange', () => {
    if (!topicPracticeSet || !location.hash.startsWith('#/practice/set/')) return;
    if (document.hidden) pausePractice();
    else if (topicPracticeSet.status !== 'finished') {
      practiceSessions.resume(topicPracticeSet);
      savePractice();startMockClock(topicPracticeSet);
    }
  });
  function pastPracticeHtml() {
    let sets;
    try { sets = practiceSessions.read(localStorage).sort((a,b) => b.updated - a.updated); }
    catch (err) { return '<section class="sh-section"><h3>Completed sets</h3><p>Saved sets could not be read in this browser.</p></section>'; }
    const group = (finished, title) => {
      const items = sets.filter(s => (s.status === 'finished') === finished);
      return `${items.length ? `<div class="pl-list practice-history-list" id="practice-history-${finished ? 'completed' : 'unfinished'}">${items.map(s => `<a class="pl-item" href="#/practice/set/${encodeURIComponent(s.id)}"><span>${escapeAttr(practiceSetLabel(s))}<small class="practice-history-meta">${isMock(s) ? 'Mock · ' : 'Practice · '}${s.slugs.length} problem${s.slugs.length === 1 ? '' : 's'} · ${new Date(s.created).toLocaleDateString()}</small></span><span class="pl-n">${finished ? (isMock(s) ? mockScore(s).points+'/'+mockScore(s).max+' points' : s.slugs.filter(id => practiceSessions.result(s,id) === 'Correct').length + '/' + s.slugs.length + ' correct') : s.slugs.filter(id => s.answers[id]).length + '/' + s.slugs.length + ' answered'}</span></a>`).join('')}</div><button type="button" class="ct-toggle practice-history-more" aria-controls="practice-history-${finished ? 'completed' : 'unfinished'}" aria-expanded="false" hidden>Show all</button>` : `<p class="prob-note">${finished ? 'No completed sets yet.' : 'No unfinished sets.'}</p>`}`;
    };
    return `<section class="sh-section" id="resume-practice-sets"><h3>Resume a set</h3>${group(false)}</section><section class="sh-section" id="past-practice-sets"><h3>Completed sets</h3>${group(true)}</section>`;
  }
  let practiceHistoryObserver;
  function wirePracticeHistory(root) {
    practiceHistoryObserver?.disconnect();
    const lists = [...root.querySelectorAll('.practice-history-list')];
    if (!lists.length) return;
    const update = () => {
      if (!lists[0].isConnected) { practiceHistoryObserver?.disconnect(); return; }
      lists.forEach(list => {
        const button = list.nextElementSibling;
        const columns = getComputedStyle(list).gridTemplateColumns.split(' ').filter(Boolean).length;
        const limit = Math.max(1, columns) * 2;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        [...list.children].forEach((item, i) => { item.hidden = !expanded && i >= limit; });
        button.hidden = list.children.length <= limit;
        button.textContent = expanded ? 'Show less' : 'Show all';
      });
    };
    lists.forEach(list => list.nextElementSibling.addEventListener('click', e => {
      const button = e.currentTarget;
      button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'));
      update();
    }));
    practiceHistoryObserver = new ResizeObserver(update);
    lists.forEach(list => practiceHistoryObserver.observe(list));
    update();
  }
  function practiceExplanationHtml(p) {
    if (!p) return '';
    const { chain, altIds, chainCol } = chainParts(p);
    return `<div class="practice-explanation"><h4>How this problem works</h4>${chainInnerHtml(p, chainCol, chain, altIds, solutionLinksHtml(p))}</div>`;
  }
  // Open in app and Open in AoPS under a solution's three columns (practice review, textbooks).
  function solutionLinksHtml(p) {
    const ext = p.url ? `<a class="aops-btn" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">${p.urlLabel === "archive" ? "Open in the archive" : "Open in AoPS"} ${uiIcon("arrow-up-right")}</a>` : "";
    return `<div class="practice-solution-links"><a class="aops-btn" href="#/problem/${p.slug}">Open in app</a>${ext}</div>`;
  }
  function practiceAnswerChoices(set, slug, finished) {
    return `<div class="rand-btns" role="radiogroup" aria-label="${finished ? 'Submitted answer' : 'Your answer'}">${['A','B','C','D','E'].map(a => `<button type="button" ${finished ? 'aria-disabled="true"' : `data-practice-answer="${a}"`} role="radio" aria-checked="${set.answers[slug] === a}">${a}</button>`).join('')}</div>`;
  }
  function renderPracticeResults(set) {
    const total = set.slugs.length;
    const counts = { Correct: 0, Incorrect: 0, Unanswered: 0, 'Answer unavailable': 0, Voided: 0 };
    set.slugs.forEach(slug => counts[practiceSessions.result(set, slug)]++);
    const reviewUrl = '#/practice/set/' + encodeURIComponent(set.id) + '/review';
    const mock = isMock(set), score = mock ? mockScore(set) : null;
    const stats = mock ? [[score.points+'/'+score.max,'Mock score'],[counts.Correct+'/'+total,'Correct'],[counts.Incorrect,'Incorrect'],[counts.Unanswered,'Unanswered']] : [[counts.Correct + '/' + total, 'Correct'], [Math.round(100 * counts.Correct / total) + '%', 'Score'], [counts.Incorrect, 'Incorrect'], [counts.Unanswered, 'Unanswered']];
    $content.innerHTML = `<div class="space-home practice-session practice-results">
      <a class="back-link" href="#/practice">${uiIcon("arrow-left")} Back to Practice</a>
      <section class="sh-section"><h2>${mock ? 'Mock complete' : 'Practice complete'}</h2><p class="practice-results-subtitle">${escapeAttr(practiceSetLabel(set))} · ${total} problem${total === 1 ? '' : 's'}${mock ? ' · '+(set.mock.mode==='paper'?'Past contest':'Generated mock') : ' · '+escapeAttr(set.difficulty)+' difficulty'}</p>
        ${mock ? `<p class="practice-results-meta">${mockTimeSummary(set)}</p>` : ''}
        <div class="practice-results-stats">${stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>
        ${counts['Answer unavailable'] ? `<p class="practice-results-meta">${counts['Answer unavailable']} awaiting an answer key</p>` : ''}
        ${counts.Voided ? `<p class="practice-results-meta">${counts.Voided} voided by the MAA${mock ? ', full credit awarded' : ', not graded'}</p>` : ''}
        <a class="hp-btn" href="${reviewUrl}">Review problems</a>
      </section>
      <section class="sh-section"><h3>Your results</h3><div class="practice-results-list">${set.slugs.map((slug, i) => {
        const p = PROBLEM_BY_SLUG[slug], result = practiceSessions.result(set, slug);
        return `<a class="practice-result-row" href="${reviewUrl}" data-result-index="${i}"><span><strong>Problem ${i + 1}${p ? ' · ' + escapeAttr(refShort(p.ref)) : ''}</strong><small>${set.answers[slug] ? 'Your answer: ' + escapeAttr(set.answers[slug]) : 'No answer submitted'}${set.marks[slug] ? ' · Marked for review' : ''}</small></span><span class="practice-result-badge" data-result="${result}">${result}</span></a>`;
      }).join('')}</div></section></div>`;
    $content.querySelectorAll('[data-result-index]').forEach(link => link.addEventListener('click', () => { set.current = +link.dataset.resultIndex; savePractice(); }));
  }
  function renderTopicPracticeSet() {
    cancelPracticeFinishConfirm();
    clearInterval(mockClockInterval);mockClockInterval=0;
    const id = location.hash.split('/')[3] || '';
    if (!topicPracticeSet || topicPracticeSet.id !== id) {
      try { topicPracticeSet = practiceSessions.read(localStorage).find(s => s.id === id); } catch (err) { topicPracticeSet = null; }
    }
    const set = topicPracticeSet;
    if (!set) {
      $content.innerHTML = `<div class="space-home"><a class="back-link" href="#/practice">${uiIcon('arrow-left')} Back to Practice</a><p>This practice set is not available on this device.</p></div>`;
      return;
    }
    if (!document.hidden) practiceSessions.resume(set);
    const mock = isMock(set);
    const finished = set.status === 'finished';
    if (finished && location.hash.split('/')[4] !== 'review') { renderPracticeResults(set); return; }
    const slug = set.slugs[set.current], p = PROBLEM_BY_SLUG[slug];
    const answered = set.slugs.filter(id => set.answers[id]).length;
    const outcome = practiceSessions.result(set, slug);
    const aime = p && /AIME/.test(p.fam), exact = !!window.MATH_MOCK_EXTRAS?.[slug];
    const correct = exact ? window.MATH_MOCK_EXTRAS[slug].answers.map(exactAnswerHtml).join(' or ') : escapeAttr(window.MATH_ANSWER_KEYS?.answers?.[slug] || '');
    const nav = set.slugs.map((id, i) => {
      const result = practiceSessions.result(set, id);
      const suffix = finished ? result : set.answers[id] ? 'Answered' : 'Unanswered';
      return `<button type="button" class="cn-num${i === set.current ? ' cn-here' : ''}${finished ? ' practice-reviewed' : ''}${!finished && set.answers[id] ? ' practice-answered' : ''}${set.marks[id] ? ' practice-marked' : ''}" data-result="${finished ? result : ''}" data-practice-index="${i}" aria-current="${i === set.current ? 'step' : 'false'}" aria-label="Problem ${i + 1}, ${suffix}${set.marks[id] ? ', marked for review' : ''}">${i + 1}</button>`;
    }).join('');
    shownIds = [];
    $content.innerHTML = `<div class="space-home practice-session">
      ${finished ? `<a class="back-link practice-back-results" href="#/practice/set/${encodeURIComponent(set.id)}">${uiIcon("arrow-left")} Back to Results overview</a>` : ''}
      <a class="back-link" href="#/practice">${uiIcon("arrow-left")} Back to Practice</a>
      <section class="sh-section">
        <div class="practice-session-top"><div><h2>${mock ? 'Mock set' : 'Practice set'} · ${escapeAttr(practiceSetLabel(set))}</h2><p>${set.slugs.length} problem${set.slugs.length === 1 ? '' : 's'}${mock ? ' · '+set.clock.limitMs/60000+' minutes' : ' · '+escapeAttr(set.difficulty)+' difficulty'}${finished ? ' · Review' : ''}</p></div>
          ${mock && !finished ? `<div class="mock-clock" role="timer" aria-label="Time remaining"><span>Time remaining</span><strong class="mock-clock-value">${mockTime(practiceSessions.timeLeft(set))}</strong></div>` : ''}</div>
        <nav class="cn-nums" aria-label="Practice problems">${nav}</nav>
        ${finished ? `<div class="practice-review-actions"><a class="hp-btn hp-btn-soft" href="#/practice/set/${encodeURIComponent(set.id)}">Results overview</a></div>` : ''}
        ${finished ? '' : `<div class="practice-session-actions"><span>${answered} of ${set.slugs.length} answered</span><div><a class="hp-btn hp-btn-soft" href="#/practice">Save and exit</a><button type="button" class="hp-btn" id="finish-practice">Finish and review</button></div></div>`}
        <p class="prob-note" id="practice-save-status" role="status"></p>
      </section>
      <section class="sh-section practice-question"><h3>Problem ${set.current + 1}${p && (!mock || finished) ? ' · ' + (finished ? `<a class="practice-prob-link" href="#/problem/${p.slug}">${escapeAttr(refShort(p.ref))}</a>` : escapeAttr(refShort(p.ref))) : ''}</h3>
        ${p ? `<div class="practice-set-st" data-slug="${p.slug}"><div class="prob-statement">Loading statement…</div></div>` : '<p>This problem is no longer available in the current database.</p>'}
        ${finished ? `</section><section class="sh-section practice-review detail"><h3>Your answer</h3>
          ${aime || exact ? (set.answers[slug] ? `<p class="practice-submitted">${exact ? exactAnswerHtml(set.answers[slug]) : escapeAttr(set.answers[slug])}</p>` : '') : practiceAnswerChoices(set, slug, true)}
          <p class="practice-result">${outcome}${correct && (outcome === 'Incorrect' || (mock && outcome === 'Unanswered')) ? ' · Correct answer: ' + correct : ''}</p>
          ${practiceExplanationHtml(p)}`
          : p ? `<div class="practice-answer"><h4>Your answer</h4>${aime || exact ? `<label for="practice-answer">${exact ? 'Exact value (fractions, sqrt, pi)' : 'Integer from 000 to 999'}</label><input id="practice-answer" type="text" inputmode="${exact ? 'text' : 'numeric'}" maxlength="${exact ? '120' : '3'}" autocomplete="off" value="${escapeAttr(set.answers[slug] || '')}"><p id="practice-answer-error" role="status"></p>` : practiceAnswerChoices(set, slug, false)}<button type="button" class="practice-answer-clear" id="clear-practice-answer"${set.answers[slug] ? '' : ' disabled'}>Clear answer</button><label class="practice-mark"><input type="checkbox" id="practice-mark" ${set.marks[slug] ? 'checked' : ''}> Mark for review</label></div>` : ''}
        <div class="practice-problem-nav"><button type="button" class="hp-btn hp-btn-soft" data-practice-index="${set.current - 1}" ${set.current === 0 ? 'disabled' : ''}>Previous</button><button type="button" class="hp-btn hp-btn-soft" data-practice-index="${set.current + 1}" ${set.current === set.slugs.length - 1 ? 'disabled' : ''}>Next</button></div>
      </section></div>`;
    const redraw = () => {
      const active = document.activeElement;
      const selector = active?.id ? '#' + active.id : active?.dataset.practiceAnswer ? `[data-practice-answer="${active.dataset.practiceAnswer}"]` : null;
      renderTopicPracticeSet();
      if (selector) $content.querySelector(selector)?.focus({preventScroll:true});
    };
    $content.querySelectorAll('[data-practice-index]').forEach(b => b.addEventListener('click', () => { set.current = +b.dataset.practiceIndex; savePractice(); redraw(); $content.querySelector('.practice-question h3').setAttribute('tabindex','-1'); $content.querySelector('.practice-question h3').focus({preventScroll:true}); }));
    $content.querySelector('#finish-practice')?.addEventListener('click', async () => {
      if (set.status === 'finished' || practiceFinishConfirm) return;
      const remaining = set.slugs.filter(id => !set.answers[id] && practiceSessions.result(set, id) !== 'Voided').length;
      if (remaining) {
        const controller = new AbortController();
        practiceFinishConfirm = controller;
        const confirmed = await appConfirm({
          title: `Finish with ${remaining} unanswered question${remaining === 1 ? '' : 's'}?`,
          text: 'Finishing submits this set and makes your answers read-only.',
          ok: 'Finish and review', signal: controller.signal
        });
        if (practiceFinishConfirm === controller) practiceFinishConfirm = null;
        if (!confirmed) return;
      }
      if (topicPracticeSet !== set || set.status === 'finished' || location.hash !== '#/practice/set/' + encodeURIComponent(set.id)) return;
      practiceSessions.finish(set); savePractice(); redraw();
      updatePageTitle(getRoute()); window.AppAccessibility.focusMain();
    });
    const answerChoices = $content.querySelectorAll('[data-practice-answer]');
    const clearAnswer = $content.querySelector('#clear-practice-answer');
    const answerInput = $content.querySelector('#practice-answer');
    // Mobile browsers can retarget a tap just outside a text field onto it.
    // Keep focus within its visible border, using the original pointer coordinates.
    answerInput?.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'touch') return;
      const r = answerInput.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.preventDefault();
    });
    const syncAnswerUI = () => {
      const value = set.answers[slug] || '';
      answerChoices.forEach(b => b.setAttribute('aria-checked', String(b.dataset.practiceAnswer === value)));
      if (clearAnswer) clearAnswer.disabled = !value && !answerInput?.value;
      const n = set.slugs.filter(id => set.answers[id]).length;
      $content.querySelector('.practice-session-actions > span').textContent = `${n} of ${set.slugs.length} answered`;
      const current = $content.querySelector('[aria-current="step"]');
      current.classList.toggle('practice-answered', !!value);
      current.setAttribute('aria-label', `Problem ${set.current + 1}, ${value ? 'Answered' : 'Unanswered'}${set.marks[slug] ? ', marked for review' : ''}`);
    };
    const updateChoice = value => {
      if (!practiceSessions.answer(set, slug, value, false)) { if(set.status==='finished'){savePractice();renderTopicPracticeSet();} return; }
      schedulePracticeSave();
      // Keep the controls mounted so double-click and keyboard clearing remain available.
      syncAnswerUI();
    };
    answerChoices.forEach(b => {
      b.addEventListener('click', () => { if (set.answers[slug] !== b.dataset.practiceAnswer) updateChoice(b.dataset.practiceAnswer); });
      b.addEventListener('dblclick', () => { if (set.answers[slug] === b.dataset.practiceAnswer) updateChoice(''); });
      b.addEventListener('keydown', e => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && set.answers[slug] === b.dataset.practiceAnswer) { e.preventDefault(); updateChoice(''); }
      });
    });
    $content.querySelector('#practice-answer')?.addEventListener('input', e => {
      const valid = practiceSessions.answer(set, slug, e.target.value, aime);
      if(set.status==='finished'){savePractice();renderTopicPracticeSet();return;}
      e.target.setAttribute('aria-invalid', String(!valid));
      $content.querySelector('#practice-answer-error').textContent = valid ? '' : (exact ? 'Use a number or an expression with fractions, sqrt and pi. This value has not been saved.' : 'Use an integer from 000 to 999. This value has not been saved.');
      if (valid) { schedulePracticeSave(); syncAnswerUI(); }
      else if (clearAnswer) clearAnswer.disabled = !e.target.value && !set.answers[slug];
    });
    clearAnswer?.addEventListener('click', () => {
      if (!practiceSessions.answer(set, slug, '', aime)) { if(set.status==='finished'){savePractice();renderTopicPracticeSet();} return; }
      if (answerInput) {
        answerInput.value = ''; answerInput.setAttribute('aria-invalid', 'false');
        $content.querySelector('#practice-answer-error').textContent = '';
      }
      schedulePracticeSave(); syncAnswerUI();
      (answerInput || answerChoices[0])?.focus({preventScroll:true});
    });
    $content.querySelector('#practice-mark')?.addEventListener('change', e => { set.marks[slug] = e.target.checked; schedulePracticeSave(); const current = $content.querySelector('[aria-current="step"]'); current.classList.toggle('practice-marked', e.target.checked); current.setAttribute('aria-label', `Problem ${set.current + 1}, ${set.answers[slug] ? 'Answered' : 'Unanswered'}${e.target.checked ? ', marked for review' : ''}`); });
    savePractice();
    if (p) showStatement(p, '.practice-set-st');
    renderMath($content);
    startMockClock(set);
  }
  let practiceTopicIndex;
  function wireTopicPractice(root) {
    const form = root.querySelector("#topic-practice-form");
    if (!form) return;
    const topic = form.elements.topic, count = form.elements.count;
    const suggestions = form.querySelector("#practice-topic-options");
    const status = root.querySelector("#topic-practice-status");
    const difficulty = form.elements.difficulty;
    let generating = false, selectedTopicId = null, activeTopic = -1;
    let desiredCount = count.valueAsNumber;
    const topics = practiceTopicIndex ||= window.PracticeTopics.build(window.MATH_TOPIC_TREE, PROBLEM_DB,
      p => hasMockAnswer(p) && !window.MATH_ANSWER_KEYS?.voided?.[p.slug]);
    const findTopic = () => {
      const selected = topics.nodes.get(selectedTopicId);
      return selected && topic.value === selected.label ? selected : topics.resolve(topic.value);
    };
    function update() {
      const choices = topics.search(topic.value);
      suggestions.innerHTML = choices.map((node,i) => {
        const size = problemDifficulty.filter(node.problems, DIFFS[difficulty.valueAsNumber]).length;
        const context = node.path.slice(0, -1).join(' › ');
        return `<button type="button" class="set-find-opt practice-topic-option${i === 0 ? ' is-cur' : ''}" role="option" id="practice-topic-${i}" data-topic-id="${node.id}" aria-selected="${i === 0}"><span class="practice-topic-name">${escapeAttr(node.label)}</span><span class="practice-topic-context">${escapeAttr(context)}${context ? ' · ' : ''}${size} problem${size === 1 ? '' : 's'}</span></button>`;
      }).join('');
      suggestions.querySelectorAll('button').forEach((b,i) => {
        b.addEventListener('click', () => { selectedTopicId = choices[i].id; topic.value = choices[i].label; topic.focus({preventScroll:true}); update(); closeTopics(); });
        // The pointer moves the selection, so only one option is ever highlighted (owner, 2026-11-07).
        b.addEventListener('mousemove', () => {
          if (activeTopic === i) return;
          activeTopic = i;
          suggestions.querySelectorAll('button').forEach((o,j) => { o.classList.toggle('is-cur', j === i); o.setAttribute('aria-selected', String(j === i)); });
          topic.setAttribute('aria-activedescendant', b.id);
        });
      });
      renderMath(suggestions);
      const match = findTopic(), pool = matchingProblems();
      count.max = match ? Math.max(1, Math.min(30, pool.length)) : 30;
      count.value = Math.min(desiredCount, Number(count.max));
      form.querySelector("#topic-count-value").textContent = count.value;
      form.querySelector("#topic-band-value").textContent = difficultyLabel();
      difficulty.setAttribute("aria-valuetext", difficultyLabel());
      // Here a level is measured inside the chosen topic, not across a contest (owner,
      // 2026-11-11: say so, since it works differently from the random picker).
      const level = difficulty.valueAsNumber ? difficultyLabel() : "", rated = level && match ? pool.map(p => p.elo).filter(Number.isFinite) : [];
      form.querySelector("#topic-band-note").textContent = rated.length
        ? `${level} in this topic is an Elo rating of ${Math.min(...rated)} to ${Math.max(...rated)}: one fifth of its problems, where a higher rating means a harder problem.`
        : level ? `${level} is one fifth of the chosen topic's problems by Elo rating, where a higher rating means a harder problem. Choose a topic to see the ratings it covers.`
        : "Difficulty is measured inside the topic you choose: each level is a fifth of that topic's problems by Elo rating, so Hard in an easy topic is rated lower than Hard in a difficult one.";
      status.textContent = match ? pool.length + " matching problem" + (pool.length === 1 ? "" : "s") + " available" + (match.children.length ? ", including subtopics." : ".")
        : topic.value.trim() ? "Choose a topic from the suggestions." : "";
      form.querySelector("button[type=submit]").disabled = generating || !pool.length;
    }
    function difficultyLabel() {
      return problemDifficulty.levels[difficulty.valueAsNumber].label;
    }
    function matchingProblems() {
      const match = findTopic(), band = DIFFS[difficulty.valueAsNumber];
      return match ? problemDifficulty.filter(match.problems, band) : [];
    }
    function closeTopics() { suggestions.hidden = true; topic.setAttribute('aria-expanded','false'); topic.removeAttribute('aria-activedescendant'); activeTopic = -1; }
    function openTopics() {
      suggestions.hidden = !suggestions.children.length;
      topic.setAttribute('aria-expanded', String(!suggestions.hidden));
      if (!suggestions.hidden && activeTopic < 0) activeTopic = 0;
      const options = [...suggestions.querySelectorAll('button')];
      options.forEach((b,i) => { b.classList.toggle('is-cur', i === activeTopic); b.setAttribute('aria-selected', String(i === activeTopic)); });
      if (options[activeTopic]) topic.setAttribute('aria-activedescendant', options[activeTopic].id);
    }
    topic.addEventListener('focus', () => { update(); openTopics(); });
    topic.addEventListener('keydown', e => {
      const options = [...suggestions.querySelectorAll('button')];
      if (e.key === 'Escape') { closeTopics(); e.preventDefault(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); openTopics(); if (!options.length) return;
        activeTopic = (activeTopic + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
        options.forEach((b,i) => { b.setAttribute('aria-selected',String(i === activeTopic)); b.classList.toggle('is-cur',i === activeTopic); });
        topic.setAttribute('aria-activedescendant',options[activeTopic].id); options[activeTopic].scrollIntoView({block:'nearest'});
      }
      if (e.key === 'Enter' && !suggestions.hidden && activeTopic >= 0) { e.preventDefault(); options[activeTopic]?.click(); }
    });
    form.addEventListener('focusout', e => { if (!e.relatedTarget?.closest('.practice-topic-search')) closeTopics(); });
    form.addEventListener('input', e => {
      if (e.target === topic) { selectedTopicId = null; activeTopic = -1; }
      if (e.target === count) desiredCount = count.valueAsNumber;
      update();
      if (e.target === topic) openTopics();
      else if (!suggestions.hidden) openTopics();
    });
    // Close on blur, including clicks outside the form; defer so a suggestion click can finish.
    topic.addEventListener('blur', () => setTimeout(() => { if (!form.querySelector('.practice-topic-search').contains(document.activeElement)) closeTopics(); }, 0));
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const pool = matchingProblems(), requested = count.valueAsNumber;
      if (generating || !pool.length || !Number.isSafeInteger(requested) || requested < 1) return;
      const match = findTopic(), label = match.label, level = difficultyLabel();
      const problems = [];
      generating = true;
      form.querySelector("fieldset").disabled = true;
      status.textContent = "Loading problem statements…";
      while (pool.length && problems.length < requested) {
        const batch = [];
        while (pool.length && batch.length < requested - problems.length) {
          const i = Math.floor(Math.random() * pool.length);
          batch.push(pool[i]);
          pool[i] = pool[pool.length - 1];
          pool.pop();
        }
        await Promise.all([...new Set(batch.filter(p => !window.MATH_MOCK_EXTRAS?.[p.slug]).map(p => p.year))].map(loadStatements));
        if (!form.isConnected) return;
        problems.push(...batch.filter(p => window.MATH_STATEMENTS?.[p.slug] || window.MATH_MOCK_EXTRAS?.[p.slug]));
      }
      generating = false;
      form.querySelector("fieldset").disabled = false;
      if (!problems.length) { status.textContent = "No statements could be loaded. Try again or choose another topic."; return; }
      topicPracticeSet = practiceSessions.create(label, level, problemDifficulty.order(problems).map(p => p.slug));
      topicPracticeSet.topicId = match.id;
      savePractice();
      location.hash = '#/practice/set/' + topicPracticeSet.id;
    });
    update();
  }
  // Practice a card (owner, 2026-11-11; it sits right after Practice a topic, its sibling, and
  // before Practice a contest): an untimed set from the contest problems that cite one
  // formula, method or pattern. It draws from the same eligible, twin-free pool as Practice a
  // topic (the Mixed pool) and builds the same kind of saved set; only the choice differs.
  function cardPracticePanelHtml() {
    return `<section class="sh-section" id="pr-card">
      <h3>Practice a card</h3>
      <p class="practice-panel-intro">Choose a formula, a method or a pattern to build an untimed set from the contest problems that use it.</p>
      <form id="card-practice-form" novalidate><fieldset aria-label="Card practice options">
        <div class="rand-btns" role="radiogroup" aria-label="Kind of card">${["formula", "method", "pattern"].map((k, i) =>
          `<button type="button" role="radio" aria-checked="${i === 0}" data-card-kind="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</button>`).join("")}</div>
        <label class="mock-field-label" for="card-practice-name">Card</label>
        <div class="practice-topic-search"><input id="card-practice-name" class="set-find-input" type="search" placeholder="Search a formula..." autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="card-practice-options" aria-describedby="card-practice-status">
        <div id="card-practice-options" class="set-find-list" role="listbox" aria-label="Cards" hidden></div></div>
        <div class="rand-diff"><label for="card-count">Questions</label>
          <input id="card-count" type="range" min="1" max="30" value="5"><output id="card-count-value" for="card-count">5</output></div>
        <div class="rand-diff"><label for="card-band">Difficulty</label>
          <input id="card-band" type="range" min="0" max="5" value="0"><output id="card-band-value" for="card-band">Any</output></div>
        <p class="rand-diff-note" id="card-band-note" aria-live="polite"></p>
        <p id="card-practice-status" role="status"></p>
        <button type="submit" class="hp-btn">Generate set</button>
      </fieldset></form>
    </section>`;
  }
  let cardPracticePools = null;
  function wireCardPractice(root) {
    const form = root.querySelector("#card-practice-form");
    if (!form) return;
    const input = form.querySelector("#card-practice-name"), options = form.querySelector("#card-practice-options");
    const count = form.querySelector("#card-count"), band = form.querySelector("#card-band"), status = form.querySelector("#card-practice-status"), submit = form.querySelector("[type=submit]");
    const plain = name => window.PracticeTopics.label(name);
    // Every card's eligible problems, each shared AMC 10/12 problem once.
    const pools = cardPracticePools ||= (() => {
      const topics = practiceTopicIndex ||= window.PracticeTopics.build(window.MATH_TOPIC_TREE, PROBLEM_DB,
        p => hasMockAnswer(p) && !window.MATH_ANSWER_KEYS?.voided?.[p.slug]);
      const eligible = new Set(topics.nodes.get("mixed").problems), by = {};
      Object.keys(PROBLEMS_BY_CARD).forEach(id => { const ps = PROBLEMS_BY_CARD[id].filter(p => eligible.has(p)); if (ps.length && BY_ID[id]) by[id] = ps; });
      return by;
    })();
    const cardsOf = k => Object.keys(pools).filter(id => kindOf(BY_ID[id].formula) === k).sort((a, b) => pools[b].length - pools[a].length || plain(BY_ID[a].formula.name).localeCompare(plain(BY_ID[b].formula.name)));
    let kind = "formula", chosen = null, active = -1, choices = [], desired = count.valueAsNumber, generating = false;
    const level = () => problemDifficulty.levels[band.valueAsNumber].label;
    const pool = () => chosen ? problemDifficulty.filter(pools[chosen], DIFFS[band.valueAsNumber]) : [];
    function close() { options.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); active = -1; }
    function highlight() {
      [...options.children].forEach((b, i) => { b.classList.toggle("is-cur", i === active); b.setAttribute("aria-selected", String(i === active)); });
      if (choices[active]) input.setAttribute("aria-activedescendant", "card-practice-" + active); else input.removeAttribute("aria-activedescendant");
    }
    // Nothing is offered until something is typed (owner, 2026-11-11); then the cards of the
    // kind whose names match, most used first.
    function suggest() {
      const q = input.value.trim().toLowerCase();
      if (!q || (chosen && plain(BY_ID[chosen].formula.name).toLowerCase() === q)) { choices = []; options.innerHTML = ""; close(); return; }
      choices = cardsOf(kind).filter(id => plain(BY_ID[id].formula.name).toLowerCase().includes(q)).slice(0, 8);
      options.innerHTML = choices.map((id, i) => { const n = problemDifficulty.filter(pools[id], DIFFS[band.valueAsNumber]).length;
        return `<button type="button" class="set-find-opt practice-topic-option" id="card-practice-${i}" role="option" aria-selected="false"><span class="practice-topic-name">${BY_ID[id].formula.name}</span><span class="practice-topic-context">${n} problem${n === 1 ? "" : "s"}</span></button>`; }).join("");
      [...options.children].forEach((b, i) => {
        b.addEventListener("mousemove", () => { if (active !== i) { active = i; highlight(); } });
        b.addEventListener("click", () => { chosen = choices[i]; input.value = plain(BY_ID[chosen].formula.name); update(); input.focus({ preventScroll: true }); close(); });
      });
      renderMath(options);
      active = choices.length ? 0 : -1; options.hidden = !choices.length; input.setAttribute("aria-expanded", String(!options.hidden)); highlight();
    }
    function update() {
      const ps = pool();
      count.max = chosen ? Math.max(1, Math.min(30, ps.length)) : 30;
      count.value = Math.min(desired, Number(count.max));
      form.querySelector("#card-count-value").textContent = count.value;
      form.querySelector("#card-band-value").textContent = level();
      band.setAttribute("aria-valuetext", level());
      const rated = band.valueAsNumber && chosen ? ps.map(p => p.elo).filter(Number.isFinite) : [];
      form.querySelector("#card-band-note").textContent = rated.length
        ? `${level()} for this card is an Elo rating of ${Math.min(...rated)} to ${Math.max(...rated)}: one fifth of its problems, where a higher rating means a harder problem.`
        : band.valueAsNumber ? `${level()} is one fifth of the chosen card's problems by Elo rating, where a higher rating means a harder problem. Choose a card to see the ratings it covers.`
        : "Difficulty is measured inside the card you choose: each level is a fifth of the problems that use it, by Elo rating.";
      status.textContent = chosen ? `${ps.length} matching problem${ps.length === 1 ? "" : "s"} available.` : input.value.trim() ? "Choose a card from the suggestions." : "";
      submit.disabled = generating || !ps.length;
    }
    form.querySelectorAll("[data-card-kind]").forEach(b => b.addEventListener("click", () => {
      kind = b.dataset.cardKind; chosen = null; input.value = ""; input.placeholder = `Search a ${kind}...`;
      form.querySelectorAll("[data-card-kind]").forEach(x => x.setAttribute("aria-checked", String(x === b)));
      close(); update();
    }));
    input.addEventListener("focus", suggest);
    input.addEventListener("input", () => { chosen = null; update(); suggest(); });
    input.addEventListener("keydown", e => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (options.hidden) suggest(); else if (choices.length) { active = (active + (e.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length; highlight(); options.children[active]?.scrollIntoView({ block: "nearest" }); }
      } else if (e.key === "Enter" && !options.hidden && active >= 0) { e.preventDefault(); options.children[active]?.click(); }
    });
    form.addEventListener("focusout", e => { if (!e.relatedTarget?.closest?.("#card-practice-form .practice-topic-search")) close(); });
    count.addEventListener("input", () => { desired = count.valueAsNumber; update(); });
    band.addEventListener("input", update);
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const ps = pool(), requested = count.valueAsNumber;
      if (generating || !chosen || !ps.length || !Number.isSafeInteger(requested) || requested < 1) return;
      const id = chosen, label = plain(BY_ID[id].formula.name), lv = level(), problems = [];
      generating = true; form.querySelector("fieldset").disabled = true; status.textContent = "Loading problem statements…";
      while (ps.length && problems.length < requested) {
        const batch = [];
        while (ps.length && batch.length < requested - problems.length) { const i = Math.floor(Math.random() * ps.length); batch.push(ps[i]); ps[i] = ps[ps.length - 1]; ps.pop(); }
        await Promise.all([...new Set(batch.filter(p => !window.MATH_MOCK_EXTRAS?.[p.slug]).map(p => p.year))].map(loadStatements));
        if (!form.isConnected) return;
        problems.push(...batch.filter(p => window.MATH_STATEMENTS?.[p.slug] || window.MATH_MOCK_EXTRAS?.[p.slug]));
      }
      generating = false; form.querySelector("fieldset").disabled = false;
      if (!problems.length) { status.textContent = "No statements could be loaded. Try again or choose another card."; return; }
      topicPracticeSet = practiceSessions.create(label, lv, problemDifficulty.order(problems).map(p => p.slug));
      topicPracticeSet.cardId = id;
      savePractice();
      location.hash = "#/practice/set/" + topicPracticeSet.id;
    });
    update();
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
      if (name === "learn") body += `
        ${learnShelfHtml()}
        <section class="sh-section" id="pr-study">
          <h3>Lists</h3>
          <p class="learn-note">Browse study lists by level and topic, or make your own collection of cards.</p>
          <div id="pr-lists">
            <h4 class="learn-sub pl-mine-h">Your lists <button type="button" class="pl-new-btn" id="lists-new" data-list-new aria-label="New list" title="New list">${uiIcon("plus")}</button></h4>
            <div class="pl-list pl-mine">
              <a class="pl-item" href="#/list/starred"><span>${uiIcon("star")} Starred</span><span class="pl-n">${liveCount(starred)}</span></a>
              ${mine.map(listLink).join("")}
            </div>
          </div>
          <h4 class="learn-sub">Study lists</h4>
          <div class="grid-scroll"><table class="cy-grid route-grid">
            <thead><tr><th></th>${subjects.map(x => `<th>${x}</th>`).join("")}</tr></thead>
            <tbody>${tiers.map(t => `<tr><th>${t === "AMC" ? "AMC 10/12" : t}</th>${subjects.map(x => {
              const l = route(t, x);
              return `<td>${l ? `<a href="#/list/${l.id}">${liveCount(l)} cards</a>` : `<span class="cy-none">&middot;</span>`}</td>`;
            }).join("")}</tr>`).join("")}</tbody>
          </table></div>
          <div class="route-cards">${subjects.map(x => `<div class="route-card"><div class="route-card-t">${x}</div><div class="route-card-links">${tiers.map(t => {
            const l = route(t, x);
            return l ? `<a href="#/list/${l.id}"><span>${t === "AMC" ? "AMC 10/12" : t}</span><span class="route-card-n">${liveCount(l)}</span></a>` : "";
          }).join("")}</div></div>`).join("")}</div>
          <p class="route-note">Each route builds on the one above it: the AIME route lists only what is new beyond the AMC 10/12 route, and the Olympiad route only what is new beyond the AIME, with a few cards repeated where a level uses the same card in a broader way.</p>
          <div class="pl-kinds">${LIST_KINDS.filter(([k]) => k !== "route").map(([k, label]) => {
            const ls = BUILTIN_LISTS.filter(l => l.kind === k);
            return ls.length ? `<div class="pl-kind"><div class="pl-kind-title">${label}</div><div class="pl-list">${ls.map(listLink).join("")}</div></div>` : "";
          }).join("")}</div>
        </section>`;
      else body += `
        <section class="sh-section rand-picker">
            <h3>Open a random problem</h3>
            <p class="practice-panel-intro">Try a past contest problem, with your choice of contest and difficulty.</p>
            <div class="rand-btns" role="radiogroup" aria-label="Contest">
              <button type="button" role="radio" aria-checked="true" data-rand-fam="">Any contest</button>
              ${fams.map(f => `<button type="button" role="radio" aria-checked="false" data-rand-fam="${escapeAttr(f)}">${escapeAttr(f)}</button>`).join("")}
            </div>
            <div class="rand-diff">
              <label for="rand-diff-range">Difficulty</label>
              <input type="range" id="rand-diff-range" min="0" max="5" step="1" value="0">
              <span class="rand-diff-val">Any</span>
            </div>
            <p class="rand-diff-note" aria-live="polite"></p>
            <a class="hp-btn rand-go" href="#/special/randomproblem">Open a random problem</a>
        </section>
        <section class="sh-section" id="pr-topic">
          <h3>Practice a topic</h3>
          <p class="practice-panel-intro">Choose a topic to build an untimed set. Broader topics include all their subtopics.</p>
          <form id="topic-practice-form" novalidate><fieldset aria-label="Practice set options">
            <label for="topic-name">Topic</label>
            <div class="practice-topic-search"><input id="topic-name" class="set-find-input" type="search" name="topic" placeholder="Search a topic..." required autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="practice-topic-options" aria-describedby="topic-practice-status">
            <div id="practice-topic-options" class="set-find-list" role="listbox" aria-label="Topics" hidden></div></div>
            <div class="rand-diff"><label for="topic-count">Questions</label>
              <input id="topic-count" type="range" name="count" min="1" max="30" value="5"><output id="topic-count-value" for="topic-count">5</output></div>
            <div class="rand-diff"><label for="topic-band">Difficulty</label>
              <input id="topic-band" type="range" name="difficulty" min="0" max="5" value="0"><output id="topic-band-value" for="topic-band">Any</output></div>
            <p class="rand-diff-note" id="topic-band-note" aria-live="polite"></p>
            <p id="topic-practice-status" role="status"></p>
            <button type="submit" class="hp-btn">Generate set</button>
          </fieldset></form>
        </section>
        ${cardPracticePanelHtml()}
        ${mockPracticePanelHtml()}
        <section class="sh-section" id="pr-contests">
          <h3>Contests</h3>
          <p class="practice-panel-intro">Browse past papers by contest and year.</p>
          <div class="ct-browse"><a class="ct-browse-btn" href="#/browse/topics">Browse by topic</a><a class="ct-browse-btn" href="#/browse/difficulty">Browse by difficulty</a></div>
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
        </section>`;
    }
    if (name === "practice") body += pastPracticeHtml();
    $content.innerHTML = `<div class="space-home">${body}</div>`;
    wireRandomPicker($content);
    wireTopicPractice($content);
    wireMockPractice($content);
    wireCardPractice($content);
    wirePracticeHistory($content);
    wireShelfMore($content);
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

  // ---------- Learn: books, chapters, lessons and reviews (PLAN step L5, CONVENTIONS §14) ----------
  // The shelf (js/data/learn/shelf.js) gives every book, chapter and lesson its code and title;
  // a written chapter is a file js/data/learn/<book>/<code>.js that fills window.MATH_LEARN[code]
  // with each lesson's prose, checks and problems, and the chapter's review. A lesson with no
  // entry there shows as "Not written yet".
  const LEARN_SHELF = window.MATH_LEARN_SHELF || [];
  const learnChapterData = c => (window.MATH_LEARN || {})[c.code] || null;
  const learnLessonData = (c, l) => { const d = learnChapterData(c); return d && d.lessons && d.lessons[l.code] || null; };
  const learnReview = c => { const d = learnChapterData(c); return d && Array.isArray(d.review) ? d.review : []; };
  // The chapter structure of the pilot (owner, 2026-10-31; C5 first): X.1 is the chapter's
  // Introduction and its opening page, the lessons follow, the last lesson is the Summary (with
  // Problem Solving Strategies), and two pages close the chapter: Review Problems (mostly
  // comprehension) and Challenge Problems (contest problems, or our own). A chapter whose first
  // lesson is not an Introduction keeps the old overview page and chapter review.
  const learnHasIntro = c => !!(c && c.lessons[0] && (c.lessons[0].title === "Introduction" || c.kind === "reference" && c.lessons[0].title === "Overview") && learnLessonData(c, c.lessons[0]));
  const LEARN_END = { review: "Review Problems", challenge: "Challenge Problems" };
  const learnEndSet = (c, kind) => {
    const d = learnChapterData(c), x = d && (kind === "review" ? d.reviewProblems : d.challenge);
    return x ? { exercises: x.exercises || [], problems: x.problems || [] } : null;
  };
  const learnEndCount = (c, kind) => { const x = learnEndSet(c, kind); return x ? x.exercises.length + x.problems.length : 0; };
  // Review Problems and Challenge Problems are numbered on from the Summary: C5.8 and C5.9 (owner, 2026-10-31).
  const learnEndCode = (c, kind) => c.code + "." + (c.lessons.length + (kind === "challenge" && learnEndCount(c, "review") ? 2 : 1));
  // #/learn/<book>, then /<code in lower case>, then /<lesson number> or /review.
  function learnHash(b, c, page) {
    if (c && String(page) === "1" && learnHasIntro(c)) page = null;
    return "#/learn/" + b.id + (c ? "/" + c.code.toLowerCase() + (page != null ? "/" + page : "") : "");
  }
  const lessonNum = l => l.code.split(".")[1];
  function learnRoute(hash) {
    const how = hash.match(/^#\/learn\/([\w-]+)\/how-to-use$/);
    if (how) {
      const book = LEARN_SHELF.find(b => b.id === how[1]);
      return book ? { type: "learn", book, chapter: null, lesson: null, howto: true, key: how[1] + "/how-to-use" } : null;
    }
    const m = hash.match(/^#\/learn\/([\w-]+)(?:\/([a-z]\d+)(?:\/(\d+|review|challenge))?)?$/);
    if (!m) return null;
    const book = LEARN_SHELF.find(b => b.id === m[1]);
    if (!book) return null;
    const chapter = m[2] ? book.chapters.find(c => c.code.toLowerCase() === m[2]) : null;
    if (m[2] && !chapter) return null;
    const end = m[3] === "review" || m[3] === "challenge" ? m[3] : null;
    if (end === "challenge" && !learnEndCount(chapter, "challenge")) return null;
    let lesson = m[3] && !end ? chapter.lessons.find(l => lessonNum(l) === m[3]) : null;
    if (m[3] && !end && !lesson) return null;
    // A chapter with an Introduction opens on it.
    if (chapter && !m[3] && learnHasIntro(chapter)) lesson = chapter.lessons[0];
    return { type: "learn", book, chapter, lesson, review: end === "review", challenge: end === "challenge", key: m.slice(1).filter(Boolean).join("/") };
  }
  const learnProblem = ref => PROBLEM_BY_SLUG[problemSlug(ref)] || null;

  // Progress lives in one localStorage key, "mq-learn", which Export and Import carry
  // (PROGRESS_KEYS). Reading a lesson, answering a check and working a problem are kept apart,
  // and a solution that was shown never counts as solved.
  let learnProg = null, learnProgOk = true;
  function learnProgress() {
    if (learnProg) return learnProg;
    let v = null;
    try { v = JSON.parse(localStorage.getItem("mq-learn") || "null"); } catch (e) { learnProgOk = false; }
    learnProg = v && typeof v === "object" ? v : { v: 1 };
    ["read", "checks", "problems"].forEach(k => { if (!learnProg[k] || typeof learnProg[k] !== "object") learnProg[k] = {}; });
    return learnProg;
  }
  // A value that could not be read is never overwritten, so a stored file this version does not
  // understand survives until the reader exports it.
  function saveLearn() {
    if (!learnProgOk) return;
    try { localStorage.setItem("mq-learn", JSON.stringify(learnProg)); } catch (e) { storageFailed(); }
  }

  const learnLevelSlug = lv => lv.toLowerCase().replace(/\s+/g, "");
  const learnLevelHtml = c => c.level ? `<span class="lb-level lb-${learnLevelSlug(c.level)}">${c.level}</span>` : "";

  // One line per lesson: its code and title, a link once it is written, and a tick once read.
  function learnLessonRow(b, c, l, current) {
    // A lesson's own importance (owner, 2026-10-31): the chapter's tag is the concept's overall
    // importance, and each lesson carries its own, except the Introduction and the Summary.
    const inner = `<span class="lb-code">${l.code}</span><span class="lb-title">${escapeAttr(l.title)}</span>${l.level ? learnLevelHtml(l) : ""}`;
    if (!learnLessonData(c, l)) return `<li class="lb-lesson">${inner}<span class="lb-soon">Not written yet</span></li>`;
    return `<li class="lb-lesson${current ? " is-current" : ""}"><a href="${learnHash(b, c, lessonNum(l))}"${current ? ` aria-current="page"` : ""}>${inner}</a></li>`;
  }
  function learnReviewRow(b, c, current) {
    if (learnHasIntro(c)) return ["review", "challenge"].map(k => {
      const n = learnEndCount(c, k);
      return n ? `<li class="lb-lesson lb-review-row"><a href="${learnHash(b, c, k)}"><span class="lb-code">${learnEndCode(c, k)}</span><span class="lb-title">${LEARN_END[k]}</span></a></li>` : "";
    }).join("");
    const n = learnReview(c).length;
    if (!n) return "";
    return `<li class="lb-lesson lb-review-row${current ? " is-current" : ""}"><a href="${learnHash(b, c, "review")}"${current ? ` aria-current="page"` : ""}><span class="lb-code">${c.code}</span><span class="lb-title">Chapter review</span></a></li>`;
  }

  // ---------- Book covers and the book view ----------
  // Each book has a cover: a coloured rectangle with its series, title, a drawn motif and its
  // size. The Learn page shows the five covers; pressing one opens the book, whose pages (the
  // contents, a chapter, a lesson, a review) share a sidebar holding the whole table of contents.
  const BOOK_MOTIFS = {
    // an arch from one bank to the other
    // a parabola on its axes
    "aime-algebra": `<path d="M8 70 H92 M50 92 V8" /><path d="M20 18 Q50 118 80 18" />`,
    // twelve residues round a clock
    "aime-number-theory": `<circle cx="50" cy="50" r="34" />${Array.from({ length: 12 }, (_, k) => `<circle cx="${(50 + 34 * Math.sin(k * Math.PI / 6)).toFixed(1)}" cy="${(50 - 34 * Math.cos(k * Math.PI / 6)).toFixed(1)}" r="${k % 3 ? 2.6 : 4.2}" class="mf" />`).join("")}<path d="M50 50 L50 24 M50 50 L68 60" />`,
    // a triangle in its circumcircle
    "aime-geometry": `<circle cx="50" cy="52" r="36" /><path d="M50 16 L19 70 L83 66 Z" /><path d="M50 16 L51 68" />`,
    // a function graph crossing its axes
    "amc-algebra": `<path d="M14 64 H86 M40 14 V86" class="mg" /><path d="M16 82 Q40 10 62 50 T86 30" />`,
    // a factor tree
    "amc-number-theory": `<path d="M50 20 L32 46 M50 20 L68 46 M68 46 L56 74 M68 46 L80 74" /><circle cx="50" cy="20" r="5" class="mf" /><circle cx="32" cy="48" r="5" class="mf" /><circle cx="68" cy="46" r="4" /><circle cx="56" cy="76" r="5" class="mf" /><circle cx="80" cy="76" r="5" class="mf" />`,
    // a die face
    "amc-counting": `<rect x="22" y="22" width="56" height="56" rx="10" />${[[36,36],[64,36],[50,50],[36,64],[64,64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" class="mf" />`).join("")}`,
    // a right triangle with a square on its hypotenuse corner
    "amc-geometry": `<path d="M20 78 H80 V30 Z" /><path d="M72 78 V70 H80" class="mg" /><circle cx="50" cy="54" r="12" />`,
    // a domino row falling: induction
    "olympiad-proofs": `${[20, 38, 56, 74].map((x, k) => `<rect x="${x}" y="${30 + k * 4}" width="8" height="40" rx="2" transform="rotate(${k === 3 ? 0 : -18} ${x + 4} 74)" />`).join("")}<path d="M12 78 H88" class="mg" />`,
    // the curves of y = x and y = x^2 between 0 and 1
    "olympiad-algebra": `<path d="M16 84 H84 M16 84 V16" class="mg" /><path d="M16 84 L84 16" /><path d="M16 84 Q50 84 84 16" />`,
    // a prime spiral of dots
    "olympiad-number-theory": `${[[50,50],[62,50],[62,38],[50,38],[38,38],[38,50],[38,62],[50,62],[62,62],[74,62],[74,50],[74,38],[74,26],[62,26]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${[1,2,4,6,10,12].includes(k) ? 4.5 : 2.2}" class="mf" />`).join("")}`,
    // a small graph: a 5-cycle with a star inside
    "olympiad-combinatorics": `${Array.from({ length: 5 }, (_, k) => [50 + 32 * Math.sin(2 * Math.PI * k / 5), 52 - 32 * Math.cos(2 * Math.PI * k / 5)]).map(([x, y], k, a) => `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${a[(k + 2) % 5][0].toFixed(1)} ${a[(k + 2) % 5][1].toFixed(1)}" /><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="mf" />`).join("")}`,
    // a triangle with its circumcircle and incircle
    "olympiad-geometry": `<circle cx="50" cy="50" r="36" /><path d="M50 14 L18 68 L82 68 Z" /><circle cx="50" cy="51" r="16" />`,
    // a lattice path on a grid
    "aime-counting": `${[14, 32, 50, 68, 86].map(v => `<path d="M14 ${v} H86 M${v} 14 V86" class="mg" />`).join("")}<path d="M14 86 H32 V68 H68 V32 H86 V14" />`
  };
  function bookParts(b) {
    const m = b.title.match(/^AIME (.+)$/);
    if (m) return { series: "AIME", name: m[1] };
    if (/^amc-/.test(b.id)) return { series: "AMC 10 & 12", name: b.title.replace(/^AMC /, "") };
    const o = b.title.match(/^Olympiad (.+)$/);
    if (o) return { series: "Olympiad", name: o[1] };
    return { series: "Foundations", name: b.title };
  }
  const learnWrittenIn = b => b.chapters.reduce((n, c) => n + (c.kind === "reference" ? 0 : c.lessons.filter(l => learnLessonData(c, l)).length), 0);
  const learnLessonsIn = b => b.chapters.reduce((n, c) => n + (c.kind === "reference" ? 0 : c.lessons.length), 0);
  function bookCoverHtml(b, size) {
    const { series, name } = bookParts(b);
    return `<span class="bk-cover bk-${b.id} bk-${size}" aria-hidden="true">
        <span class="bk-series">${escapeAttr(series)}</span>
        <span class="bk-name${/ & /.test(name) ? " bk-name-amp" : ""}${/\S{12,}/.test(name) ? " bk-name-long" : ""}">${escapeAttr(name).replace(/ &amp; /g, "\u00a0&amp; ")}</span>
        <svg class="bk-motif" viewBox="0 0 100 100">${BOOK_MOTIFS[b.id] || ""}</svg>
        ${size === "s" ? "" : `<span class="bk-size">${b.chapters.length} chapters &middot; ${learnLessonsIn(b)} lessons</span>`}
      </span>`;
  }
  // More than two rows of books fold away behind a "Show all" button (owner, 2026-10-31); the
  // number of columns comes from the grid itself, so the cut follows the screen width.
  let showAllBooks = false, shelfFit = null;
  function wireShelfMore(root) {
    const grid = root.querySelector(".bk-shelf-m"), btn = root.querySelector("#bk-more");
    shelfFit = null;
    if (!grid || !btn) return;
    const tiles = Array.from(grid.children);
    shelfFit = () => {
      if (!grid.isConnected) return;
      tiles.forEach(t => { t.hidden = false; });
      // Rows are counted from where the tiles actually sit; the button exists only past two rows.
      const tops = [...new Set(tiles.map(t => t.offsetTop))].sort((a, b) => a - b);
      const keep = tops.length > 2 ? tiles.filter(t => t.offsetTop <= tops[1]).length : tiles.length;
      const extra = tiles.length - keep;
      btn.hidden = extra <= 0;
      if (extra <= 0) { btn.textContent = ""; return; }
      if (!showAllBooks) tiles.slice(keep).forEach(t => { t.hidden = true; });
      btn.setAttribute("aria-expanded", String(showAllBooks));
      btn.textContent = showAllBooks ? "Show fewer textbooks" : "Show all textbooks (" + extra + " more)";
    };
    btn.addEventListener("click", () => { showAllBooks = !showAllBooks; shelfFit(); });
    requestAnimationFrame(shelfFit);
  }
  window.addEventListener("resize", () => { if (shelfFit) shelfFit(); });
  // The shelf on the Learn page (and, smaller, on the home page).
  function learnCoversHtml(size) {
    return `<div class="bk-shelf bk-shelf-${size}">${LEARN_SHELF.map(b => `
        <a class="bk-tile" href="${learnHash(b)}" aria-label="${escapeAttr(b.title)}">
          ${bookCoverHtml(b, size)}
          ${size === "s" ? "" : `<span class="bk-tile-role">${escapeAttr(b.role.charAt(0).toUpperCase() + b.role.slice(1))}.</span>`}
        </a>`).join("")}</div>`;
  }
  function learnShelfHtml() {
    return `<section class="sh-section" id="learn-books">
        <h3>Textbooks</h3>
        <p class="learn-note">Books from the AMC to the AIME and on to olympiads. Open one to see its chapters and lessons; each lesson teaches from the cards and ends with contest problems.</p>
        ${learnCoversHtml("m")}
        <button type="button" class="ct-toggle bk-more" id="bk-more" hidden></button>
      </section>`;
  }
  // Where to pick up: the lesson after the last one read, else the first written lesson.
  function learnLessonByCode(code) {
    for (const b of LEARN_SHELF) for (const c of b.chapters) for (const l of c.lessons) if (l.code === code) return { b, c, l };
    return null;
  }
  function learnContinue() {
    const prog = learnProgress();
    const all = [];
    LEARN_SHELF.forEach(b => b.chapters.filter(c => c.kind !== "reference").forEach(c => c.lessons.forEach(l => { if (learnLessonData(c, l)) all.push({ b, c, l }); })));
    if (!all.length) return null;
    // The lesson opened last, else the first written one (lessons are not marked read; owner,
    // 2026-10-31).
    const last = prog.last && learnLessonByCode(prog.last);
    if (last && last.c.kind !== "reference" && learnLessonData(last.c, last.l)) return Object.assign({ again: true }, last);
    return all[0];
  }

  // The book view (owner, 2026-10-31, modelled on the way an online textbook is read): a slim
  // rail of chapter tabs on the left (C for the contents, then each chapter's number; hovering a
  // tab names the chapter), two title bars over the page, the chapter's and the page's, each with
  // arrows to step back and forward, and Previous, Back to Top and Next at the bottom.
  // Every page of a book sits in one order: for each chapter, its overview, its lessons, then its
  // review. The arrows and the bottom links walk that order.
  function learnPages(b) {
    const out = [];
    b.chapters.forEach(c => {
      if (learnHasIntro(c)) {
        c.lessons.forEach(l => out.push({ c, l, page: lessonNum(l) }));
        ["review", "challenge"].forEach(k => { if (learnEndCount(c, k)) out.push({ c, page: k, end: k, review: k === "review" }); });
        return;
      }
      out.push({ c, page: null });
      c.lessons.forEach(l => out.push({ c, l, page: lessonNum(l) }));
      if (learnReview(c).length) out.push({ c, page: "review", review: true });
    });
    return out;
  }
  const learnPageLabel = x => x.label ? x.label : x.l ? `${x.l.code} ${escapeAttr(x.l.title)}` : x.end ? `${learnEndCode(x.c, x.end)} ${LEARN_END[x.end]}` : x.review ? `${x.c.code} Chapter Review` : `${x.c.code} Overview`;
  function learnArrow(href, dir, label) {
    const icon = uiIcon(dir < 0 ? "chevron-left" : "chevron-right");
    return href ? `<a class="bk-arrow" href="${href}" aria-label="${dir < 0 ? "Previous" : "Next"}: ${escapeAttr(label.replace(/<[^>]*>/g, ""))}" title="${escapeAttr(label.replace(/<[^>]*>/g, "").replace(/\$/g, ""))}">${icon}</a>`
      : `<span class="bk-arrow is-off" aria-hidden="true">${icon}</span>`;
  }
  // Each chapter tab is also a scrubber (owner, 2026-10-31, after the way an online textbook's
  // rail works): the tab is split by height into the chapter's pages (overview, lessons, review),
  // pointing or pressing at a height names that page, and a click or a release opens it. Every
  // tab is the same height, with no markers (owner, 2026-10-31).
  function learnRailHtml(b, c) {
    const pages = learnPages(b);
    const tab = ch => {
      const ps = pages.filter(x => x.c === ch), cur = ch === c;
      const tips = ps.map((x, i) => `<span class="bk-tip-p" data-i="${i}" hidden>${learnPageLabel(x)}</span>`).join("");
      const ticks = ps.map((x, i) => `<i data-href="${learnHash(b, x.c, x.page)}"></i>`).join("");
      return `<a class="bk-tab bk-scrub${cur ? " is-current" : ""}" href="${learnHash(b, ch)}"${cur ? ` aria-current="page"` : ""}><span class="bk-tab-n">${ch.code.slice(1)}</span><span class="bk-ticks" aria-hidden="true">${ticks}</span><span class="bk-tip"><span class="bk-tip-ch">${ch.code} ${escapeAttr(ch.title)}</span>${tips}</span></a>`;
    };
    return `<nav class="bk-rail" aria-label="Chapters">
        <a class="bk-tab bk-scrub${!c ? " is-current" : ""}" href="${learnHash(b)}"${!c ? ` aria-current="page"` : ""}><span class="bk-tab-n">C</span><span class="bk-ticks" aria-hidden="true"><i data-href="${learnHash(b)}" data-w="3"></i><i data-href="${learnHash(b)}/how-to-use" data-w="1"></i></span><span class="bk-tip"><span class="bk-tip-ch">Contents and Introduction</span><span class="bk-tip-p" data-i="0" hidden>Contents</span><span class="bk-tip-p" data-i="1" hidden>How to Use This Book</span></span></a>
        ${b.chapters.map(tab).join("")}
      </nav>`;
  }
  function wireLearnRail(root) {
    const rail = root.querySelector(".bk-rail");
    if (!rail) return;
    let live = null, press = null;
    const clear = () => {
      if (!live) return;
      live.tab.classList.remove("is-scrub");
      live.tab.querySelectorAll(".bk-tip-p").forEach(p => { p.hidden = true; });
      live.tab.href = live.home;
      live = null;
    };
    const pick = (x, y) => {
      const el = document.elementFromPoint(x, y), tab = el && el.closest(".bk-scrub");
      if (!tab || !rail.contains(tab)) { clear(); return; }
      const ticks = tab.querySelectorAll(".bk-ticks i");
      const r = tab.getBoundingClientRect();
      // A tick's share of the tab is its data-w (default 1): on the C tab, Contents takes three quarters
      // and How to Use This Book one quarter (owner, 2026-11-01).
      const ws = [...ticks].map(t => +t.dataset.w || 1), f = (y - r.top) / r.height * ws.reduce((a, w) => a + w, 0);
      let i = 0;
      for (let acc = ws[0]; i < ws.length - 1 && f >= acc; acc += ws[++i]);
      if (!live || live.tab !== tab) { clear(); live = { tab, home: tab.getAttribute("href") }; }
      if (live.i === i) return;
      live.i = i;
      tab.classList.add("is-scrub");
      tab.querySelectorAll(".bk-tip-p").forEach(p => { p.hidden = +p.dataset.i !== i; });
      tab.href = ticks[i].dataset.href;
    };
    rail.addEventListener("pointermove", e => { if (e.pointerType === "mouse" || press) pick(e.clientX, e.clientY); });
    rail.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") clear(); });
    // A press on a touch screen: the finger slides along the rail and the page under it opens on release.
    rail.addEventListener("pointerdown", e => {
      if (e.pointerType === "mouse") return;
      press = e.pointerId;
      try { rail.releasePointerCapture(e.pointerId); } catch (_) {}
      pick(e.clientX, e.clientY);
    });
    rail.addEventListener("pointerup", e => {
      if (press !== e.pointerId) return;
      press = null;
      const go = live && live.tab.getAttribute("href");
      clear();
      if (go) { e.preventDefault(); location.hash = go.replace(/^#/, ""); }
    });
    rail.addEventListener("pointercancel", () => { press = null; clear(); });
    rail.addEventListener("click", e => { if (e.pointerType && e.pointerType !== "mouse") e.preventDefault(); });
  }
  let bookSearchSerial = 0;
  function bookSearchHtml(place) {
    const id = 'book-search-' + place + '-' + (++bookSearchSerial);
    return `<div class="book-search set-find"><input class="set-find-input" type="search" placeholder="Search this book..." aria-label="Search this book" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${id}" autocomplete="off" spellcheck="false"><div class="set-find-list" id="${id}" role="listbox" hidden></div></div>`;
  }
  // Book search: one ranked list of chapters, single lessons, Index entries and glossary
  // terms, each result carrying its chapter `c` (a lesson's own chapter; for a glossary term,
  // the chapter where the index first locates it). An exact chapter title still ranks first.
  function bookSearchRanker(b) {
    const stop = new Set('a an the how to do i can find learn about chapter lesson book this with of in on for and or is are what does use using where me please want looking look understand explain help'.split(' ').map(normWord));
    const tokens = text => wordsOf(String(text).replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&')).filter(w => !stop.has(w));
    const cardText = d => (d?.cards || []).map(id => BY_ID[typeof id === 'string' ? id : id.id]?.formula).filter(Boolean)
      .map(f => f.name + ' ' + (f.keywords || []).join(' ')).join(' ');
    const index = (window.MATH_BOOK_INDEX || {})[b.id] || [];
    const indexFor = test => tokens(index.filter(e => e.lessons.some(test)).map(e => e.term + ' ' + e.aliases.join(' ')).join(' '));
    const entries = [];
    b.chapters.forEach(c => {
      const lessons = c.lessons.map(l => ({ l, d: learnLessonData(c, l) }));
      const ref = c.kind === 'reference';
      entries.push({ kind: 'chapter', c, phrase: tokens(c.title).join(' '), bonus: 100.5,
        fields: [[new Set(tokens(c.code + ' ' + c.title)), 12], [new Set(tokens(c.lessons.map(l => l.title).join(' '))), 8],
          [new Set(tokens(lessons.map(({ d }) => cardText(d)).join(' '))), 5], [new Set(indexFor(code => code.startsWith(c.code + '.'))), 0.8],
          [new Set(ref ? [] : tokens(lessons.map(({ d }) => d?.body || '').join(' '))), 1]] });
      lessons.forEach(({ l, d }) => {
        if (/^(Introduction|Summary)$/.test(l.title)) return;
        entries.push({ kind: 'lesson', c, l, phrase: tokens(l.title).join(' '), bonus: 95,
          fields: [[new Set(tokens(l.code + ' ' + l.title)), 12], [new Set(tokens(cardText(d))), 5],
            [new Set(indexFor(code => code === l.code)), 4], [new Set(ref ? [] : tokens(d?.body || '')), 1]] });
      });
    });
    // Glossary terms, read from the generated Glossary page: <dfn>Term</dfn>. Definition ...
    const notes = b.chapters.find(c => c.kind === 'reference');
    const glossaryLesson = notes && notes.lessons.find(l => l.title === 'Glossary');
    const glossaryBody = glossaryLesson && learnLessonData(notes, glossaryLesson)?.body || '';
    let dfnIndex = 0;
    for (const m of glossaryBody.matchAll(/<dfn>([^<]+)<\/dfn>\.?\s*([^\n]*)/g)) {
      const dfnAt = dfnIndex++;
      const term = m[1].replace(/&amp;/g, '&'), entry = index.find(e => e.term === term);
      const home = entry && b.chapters.find(c => c !== notes && entry.lessons.some(code => code.startsWith(c.code + '.')));
      const aliases = entry ? entry.aliases : [];
      const first = m[2].replace(/<[^>]*>/g, '').match(/^.*?[.!?](?=\s|$)/);
      entries.push({ kind: 'glossary', c: home || notes, l: glossaryLesson, term, dfnAt, snippet: (first ? first[0] : m[2]).slice(0, 160),
        phrase: tokens(term).join(' '), aliases, aliasPhrases: aliases.map(a => [...new Set(tokens(a))].join(' ')), bonus: 90,
        fields: [[new Set(tokens(term)), 11]] });
    }
    const indexLesson = notes && notes.lessons.find(l => l.title === 'Index');
    if (indexLesson) index.forEach((entry, indexAt) => {
      const aliases = entry.aliases || [];
      entries.push({ kind:'index', c:notes, l:indexLesson, term:entry.term, indexAt,
        snippet:`${entry.lessons.length} lesson reference${entry.lessons.length === 1 ? '' : 's'} in this book.`,
        phrase:tokens(entry.term).join(' '), aliases, aliasPhrases:aliases.map(a => [...new Set(tokens(a))].join(' ')), bonus:85,
        fields:[[new Set(tokens(entry.term)), 11]] });
    });
    const KIND_ORDER = { chapter: 0, lesson: 1, glossary: 2, index: 3 };
    const rank = query => {
      const chapterNumber = query.trim().match(/^(?:chapter\s*|([a-z]))?(\d+)$/i);
      if (chapterNumber) return entries.filter(e => e.kind === 'chapter' && +e.c.code.slice(1) === +chapterNumber[2] && (!chapterNumber[1] || e.c.code[0].toLowerCase() === chapterNumber[1].toLowerCase()));
      const lessonCode = query.trim().match(/^([a-z])(\d+)\.(\d+)$/i);
      if (lessonCode) return entries.filter(e => e.kind === 'lesson' && e.l.code.toLowerCase() === query.trim().toLowerCase());
      const q = [...new Set(tokens(query))];
      if (!q.length) return [];
      const joined = q.join(' ');
      const ranked = entries.map(entry => {
        let score = 0, matched = 0;
        q.forEach(token => {
          let best = 0;
          for (const [field, weight] of entry.fields) {
            for (const variant of expandToken(token)) {
              const factor = variant === token ? 1 : 0.7;
              if (field.has(variant)) best = Math.max(best, weight * factor);
              else if (variant.length >= 3 && [...field].some(w => w.startsWith(variant))) best = Math.max(best, weight * factor * 0.8);
              else if (variant === token && token.length >= 4 && [...field].some(w => fuzzy(w, token))) best = Math.max(best, weight * 0.5);
            }
          }
          if (best) matched++;
          score += best;
        });
        // Reference terms require every query word, or a complete alias match.
        const alias = (entry.kind === 'glossary' || entry.kind === 'index') && entry.phrase !== joined ? entry.aliases[entry.aliasPhrases.indexOf(joined)] : null;
        if (alias) { score = 11 * q.length; matched = q.length; }
        const exact = entry.phrase === joined || !!alias;
        return { ...entry, alias, score: score * matched / q.length + (exact ? entry.bonus : 0), matched };
      }).filter(e => e.kind === 'glossary' || e.kind === 'index' ? e.matched === q.length : e.matched >= Math.ceil(q.length * 0.6))
        .map((e, i) => ({ e, i })).sort((a, z) => z.e.score - a.e.score || KIND_ORDER[a.e.kind] - KIND_ORDER[z.e.kind] || a.i - z.i).map(x => x.e);
      // An Index entry is a route to the book's list of locations, below the first two direct results when available.
      const direct = ranked.filter(entry => entry.kind !== 'index').slice(0, 2);
      return [...direct, ...ranked.filter(entry => !direct.includes(entry))].slice(0, 8);
    };
    return rank;
  }
  // A page-local suggestion list stays open while its field scrolls out of view: it sits
  // under the sticky navigation (z-index 20 against 50), so scrolling back finds it still
  // there. It closes only when its field is no longer rendered. Shared by Settings, the
  // practice topics and both book fields.
  function dismissOccludedSearchSuggestions() {
    document.querySelectorAll('.set-find-list:not([hidden])').forEach(list => {
      const input = list.parentElement.querySelector('.set-find-input');
      if (!input) return;
      if (!input.getClientRects().length) {
        list.hidden = true;
        if (input.hasAttribute('aria-expanded')) input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
      }
    });
  }
  let searchVisibilityFrame = 0;
  const scheduleSearchVisibility = () => {
    if (!searchVisibilityFrame) searchVisibilityFrame = requestAnimationFrame(() => {
      searchVisibilityFrame = 0;
      dismissOccludedSearchSuggestions();
    });
  };
  window.addEventListener('scroll', scheduleSearchVisibility, { passive: true, capture: true });
  window.addEventListener('resize', scheduleSearchVisibility, { passive: true });
  window.visualViewport?.addEventListener('resize', scheduleSearchVisibility, { passive: true });
  window.visualViewport?.addEventListener('scroll', scheduleSearchVisibility, { passive: true });

  let pendingBookReference = null;
  // Target positions are generated alongside the reference pages, so mathematical terms work after KaTeX rendering.
  function showPendingBookReference() {
    const pending = pendingBookReference;
    if (!pending) return;
    if (location.hash !== pending.hash) { pendingBookReference = null; return; }
    const target = pending.kind === 'index' ? $content.querySelector('#book-index-' + pending.indexAt)
      : [...$content.querySelectorAll('dfn')][pending.dfnAt];
    if (!target) return;
    pendingBookReference = null;
    const block = target.closest('p') || target;
    block.tabIndex = -1;
    block.classList.add('bks-target');
    block.focus({ preventScroll:true });
    block.scrollIntoView({ block:'center', behavior:window.AppAccessibility.scrollBehavior() });
    block.classList.remove('bks-found');
    void block.offsetWidth;
    block.classList.add('bks-found');
    clearTimeout(block._bksTimer);
    block._bksTimer = setTimeout(() => block.classList.remove('bks-found'), 4800);
  }
  function wireBookSearch(root, b) {
    const rank = bookSearchRanker(b);
    root.querySelectorAll('.book-search').forEach(box => {
      const input = box.querySelector('input'), list = box.querySelector('[role="listbox"]');
      let results = [], active = 0;
      // A reference result opens its own entry; the Index contains all of that term's lesson locations.
      const go = r => {
        if (r.kind === 'glossary' || r.kind === 'index') {
          const hash = learnHash(b, b.chapters.find(c => c.kind === 'reference'), lessonNum(r.l));
          pendingBookReference = { kind:r.kind, term:r.term, dfnAt:r.dfnAt, indexAt:r.indexAt, hash };
          location.hash = hash;
          setTimeout(showPendingBookReference, 60);
        } else location.hash = r.kind === 'lesson' ? learnHash(b, r.c, lessonNum(r.l)) : learnHash(b, r.c);
      };
      const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); };
      const select = () => {
        [...list.querySelectorAll('[role="option"]')].forEach((el, i) => { el.classList.toggle('is-cur', i === active); el.setAttribute('aria-selected', String(i === active)); });
        if (results[active]) input.setAttribute('aria-activedescendant', list.id + '-' + active);
        else input.removeAttribute('aria-activedescendant');
      };
      const update = () => {
        // An empty field shows nothing, as in Settings (owner, 2026-11-06); only the Practice
        // topic picker offers defaults.
        if (!input.value.trim()) { results = []; close(); return; }
        results = rank(input.value); active = 0;
        const label = r => r.kind === 'glossary' || r.kind === 'index' ? `<span class="bks-main"><span>${escapeAttr(r.term)}</span><small class="bks-snip">${r.alias ? 'Matches &ldquo;' + escapeAttr(r.alias) + '&rdquo;. ' : ''}${escapeAttr(r.snippet)}</small></span><span class="set-find-group">${r.kind === 'index' ? 'Index' : 'Glossary'}</span>`
          : r.kind === 'lesson' ? `<span class="bks-main"><span>${escapeAttr(r.l.title)}</span><small class="bks-snip">${escapeAttr(r.c.title)}</small></span><span class="set-find-group">Lesson ${escapeAttr(r.l.code)}</span>`
          : `<span>${escapeAttr(r.c.title)}</span><span class="set-find-group">Chapter ${escapeAttr(r.c.code.slice(1))}</span>`;
        list.innerHTML = results.length ? results.map((r, i) => `<button type="button" class="set-find-opt book-search-option" role="option" id="${list.id}-${i}" aria-selected="${i === 0}">${label(r)}</button>`).join('') : '<div class="set-find-none">No matching chapters, lessons, index entries or glossary terms. Try another topic.</div>';
        list.querySelectorAll('button').forEach((button, i) => {
          button.addEventListener('click', () => { go(results[i]); close(); });
          // The pointer moves the selection, so only one option is ever highlighted.
          button.addEventListener('mousemove', () => { if (active !== i) { active = i; select(); } });
        });
        list.hidden = false; input.setAttribute('aria-expanded', 'true'); select(); renderMath(list);
      };
      input.addEventListener('input', update);
      input.addEventListener('focus', update);
      input.addEventListener('keydown', e => {
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); if (list.hidden) update();
          else if (results.length) active = (active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
          select();
        } else if (e.key === 'Enter' && !list.hidden && results[active]) { e.preventDefault(); go(results[active]); close(); }
      });
      box.addEventListener('focusout', () => setTimeout(() => { if (!box.contains(document.activeElement)) close(); }, 0));
    });
  }
  // cur: "book", "chapter", "review", "challenge", or the lesson.
  function learnBookShell(b, c, cur, main) {
    $content.innerHTML = learnBookShellHtml(b, c, cur, main);
    wireLearnRail($content);
    wireBookSearch($content, b);
    if (pendingBookReference) requestAnimationFrame(() => requestAnimationFrame(showPendingBookReference));
    const msel = $content.querySelector(".bk-mnav-sel");
    if (msel) msel.addEventListener("change", () => { location.hash = msel.value; });
    renderMath($content);
  }
  // The book view's markup, shared by the page and the Settings preview's lesson screen.
  function learnBookShellHtml(b, c, cur, main, drawerInner) {
    const pages = learnPages(b);
    const at = !c ? -1 : pages.findIndex(x => x.c === c && (cur === "chapter" ? x.page === null : cur === "review" ? x.review : cur === "challenge" ? x.end === "challenge" : x.l === cur));
    // The C pages (owner, 2026-11-01): Contents, then How to Use This Book, then chapter 1.
    const TOC = { hash: learnHash(b), label: "Contents" }, HOW = { hash: learnHash(b) + "/how-to-use", label: "How to Use This Book" };
    const howto = cur === "howto";
    const prev = howto ? TOC : at > 0 ? pages[at - 1] : at === 0 ? HOW : null;
    const next = at < 0 ? pages[0] : pages[at + 1] || null;
    const hashOf = x => x ? x.hash || learnHash(b, x.c, x.page) : "";
    const ci = c ? b.chapters.indexOf(c) : -1;
    const pc = ci > 0 ? b.chapters[ci - 1] : null, nc = c ? b.chapters[ci + 1] : b.chapters[0];
    // Each bar: a small label, the title, and the two arrows at its right.
    const bar = (cls, label, title, l, r) => `<div class="bk-bar ${cls}"><span class="bk-bar-k">${label}</span>${title}<span class="bk-arrows">${l}${r}</span></div>`;
    const bar1 = c
      ? bar("bk-bar1", `Chapter ${c.code.slice(1)}`, `<a class="bk-bar-t" href="${learnHash(b, c)}">${escapeAttr(c.title)}</a>`,
          learnArrow(pc ? learnHash(b, pc) : "", -1, pc ? pc.code + " " + pc.title : ""), learnArrow(nc ? learnHash(b, nc) : "", 1, nc ? nc.code + " " + nc.title : ""))
      : bar("bk-bar1", "Book", `<span class="bk-bar-t">${escapeAttr(b.title)}</span>`, "", "");
    const bar2 = c
      ? bar("bk-bar2", c.kind === "reference" ? "Section" : "Lesson", `<span class="bk-bar-t">${learnPageLabel(pages[at])}</span>`,
          learnArrow(hashOf(prev), -1, prev ? learnPageLabel(prev) : ""), learnArrow(hashOf(next), 1, next ? learnPageLabel(next) : ""))
      : bar("bk-bar2", "Introduction", `<span class="bk-bar-t">${howto ? HOW.label : TOC.label}</span>`, learnArrow(hashOf(prev), -1, prev ? learnPageLabel(prev) : ""), learnArrow(hashOf(next), 1, next ? learnPageLabel(next) : ""));
    // The bottom: three small plain links, the previous page, Back to top, and the next page
    // (owner, 2026-10-31: discreet, no cards).
    const footCard = (x, dir) => x ? `<a class="bk-foot-link bk-foot-${dir < 0 ? "prev" : "next"}" href="${hashOf(x)}" aria-label="${dir < 0 ? "Previous" : "Next"}: ${escapeAttr(learnPageLabel(x).replace(/<[^>]*>/g, ""))}">${dir < 0 ? `<span class="bk-foot-a">${uiIcon("chevron-left")}</span>` : ""}<span class="bk-foot-t">${learnPageLabel(x)}</span>${dir > 0 ? `<span class="bk-foot-a">${uiIcon("chevron-right")}</span>` : ""}</a>` : `<span></span>`;
    const foot = `<nav class="bk-foot">
        ${footCard(prev, -1)}
        <a class="bk-foot-top" href="#" data-bk-top>Back to top</a>
        ${footCard(next, 1)}
      </nav>`;
    // The phone's navigation (owner, 2026-10-31): no rail; the book and where the page sits, then
    // the previous page, a menu of every chapter and page, and the next page. Its row stays under
    // the top bar while reading.
    const plain = t => String(t).replace(/<[^>]*>/g, "").replace(/\$/g, "").replace(/\\[a-z]+/gi, "").replace(/[{}]/g, "");
    const here = at >= 0 ? pages[at] : null;
    const where = !c ? (howto ? HOW.label : TOC.label) : here && here.l ? `${c.kind === "reference" ? "Section" : "Lesson"} ${c.lessons.indexOf(here.l) + 1} of ${c.lessons.length}`
      : here && here.end ? LEARN_END[here.end] : here && here.review ? "Chapter review" : "Overview";
    const mnav = `<nav class="bk-mnav" aria-label="Chapters and lessons">
        <div class="bk-mnav-k"><span class="bk-mnav-book">${escapeAttr(b.title)}</span>${c ? ` &middot; Chapter ${c.code.slice(1)}` : ""} &middot; ${where}</div>
        <div class="bk-mnav-row">
          ${prev || c ? `<a class="bk-mnav-step" href="${prev ? hashOf(prev) : learnHash(b)}" aria-label="Previous page">${stepChevron(-1)}</a>` : `<span class="bk-mnav-step is-off" aria-hidden="true">${stepChevron(-1)}</span>`}
          <select class="bk-mnav-sel" aria-label="Go to a chapter or page">
            <option value="${learnHash(b)}"${!c && !howto ? " selected" : ""}>Contents</option>
            <option value="${HOW.hash}"${howto ? " selected" : ""}>How to Use This Book</option>
            ${b.chapters.map(ch => `<optgroup label="Chapter ${ch.code.slice(1)}: ${escapeAttr(plain(ch.title))}">${pages.filter(x => x.c === ch).map(x =>
              `<option value="${hashOf(x)}"${x === here ? " selected" : ""}>${escapeAttr(plain(learnPageLabel(x)))}</option>`).join("")}</optgroup>`).join("")}
          </select>
          ${next ? `<a class="bk-mnav-step" href="${hashOf(next)}" aria-label="Next page">${stepChevron(1)}</a>` : `<span class="bk-mnav-step is-off" aria-hidden="true">${stepChevron(1)}</span>`}
        </div>
      </nav>`;
    return `<div class="learn-page lesson-page bk-view bk-${b.id}">
        ${learnRailHtml(b, c)}
        <div class="bk-body">
          ${mnav}
          <div class="book-search-mobile">${bookSearchHtml("mobile")}</div>
          <header class="bk-bars">
            <a class="bk-bars-cover" href="${learnHash(b)}" aria-label="${escapeAttr(b.title)}: contents">${bookCoverHtml(b, "s")}</a>
            <div class="bk-bars-navigation">${bar1}${bar2}</div>
            ${bookSearchHtml("header")}
          </header>
          <div class="lp-grid${drawerInner ? " has-drawer" : ""}">
            <article class="lp-main">${main}${foot}</article>
            <aside class="lp-drawer" aria-label="Card"${drawerInner ? "" : " hidden"}>${drawerInner || ""}</aside>
          </div>
        </div>
      </div>`;
  }

  function renderLearnBook(b) {
    noteRecent("b:" + b.id);
    const start = (() => {
      const k = learnContinue();
      return k && k.b === b ? k : (() => { for (const c of b.chapters) for (const l of c.lessons) if (learnLessonData(c, l)) return { b, c, l }; return null; })();
    })();
    // The book's own page has no rail and no header (owner, 2026-10-31): the cover and a few
    // lines about the book, then its table of contents, each chapter a heading over its lessons.
    $content.innerHTML = `<div class="learn-page bk-contents bk-${b.id}">
        <div class="back-row"><a class="back-link" href="#/learn">${uiIcon("arrow-left")} Learn</a></div>
        <div class="bk-hero">
          ${bookCoverHtml(b, "l")}
          <div class="bk-hero-text">
            <h2 class="learn-h">${escapeAttr(b.title)}</h2>
            <p class="learn-note">${escapeAttr(b.role.charAt(0).toUpperCase() + b.role.slice(1))}.</p>
            ${bookSearchHtml("contents")}
            <p class="bk-stats">${b.chapters.length} chapters &middot; ${learnLessonsIn(b)} lessons</p>
            ${start ? `<a class="hp-btn bk-start" href="${learnHash(b, start.c, lessonNum(start.l))}">${start.again ? "Continue" : "Start"} with ${start.l.code} ${uiIcon("arrow-right")}</a>` : `<p class="learn-note">No lesson in this book is written yet.</p>`}
          </div>
        </div>
        <h3 class="bk-toc-h">Contents</h3>
        <ol class="bk-toc">
          <li class="bk-toc-ch bk-toc-intro">
            <div class="bk-toc-chh"><span class="lb-code">C</span><span class="bk-toc-t">Contents and Introduction</span></div>
            <ol class="lb-lessons">
              <li class="lb-lesson"><a href="${learnHash(b)}" aria-current="page"><span class="lb-title">Contents</span></a></li>
              <li class="lb-lesson"><a href="${learnHash(b)}/how-to-use"><span class="lb-title">How to Use This Book</span></a></li>
            </ol>
          </li>${b.chapters.map((c, i) => `${c.part && c.part !== (b.chapters[i - 1] || {}).part ? `
          <li class="bk-toc-part"><h4>${escapeAttr(c.part)}</h4></li>` : ""}
          <li class="bk-toc-ch">
            <a class="bk-toc-chh" href="${learnHash(b, c)}"><span class="lb-code">${c.code}</span><span class="bk-toc-t">${escapeAttr(c.title)}</span><span class="bk-toc-meta">${learnLevelHtml(c)}<span class="lb-n">${c.lessons.length} ${c.kind === "reference" ? "sections" : "lessons"}</span></span></a>
            <ol class="lb-lessons">${c.lessons.map(l => learnLessonRow(b, c, l, false)).join("")}${learnReviewRow(b, c, false)}</ol>
          </li>`).join("")}
        </ol>
      </div>`;
    wireBookSearch($content, b);
    renderMath($content);
  }

  // How to Use This Book (owner, 2026-10-31): the book's approach and how its parts work, linked
  // from the top of its contents.
  function renderLearnHowTo(b) {
    const amc = /^amc-/.test(b.id), aime = /^aime-/.test(b.id);
    const text = `This book teaches. The facts themselves live on the reference cards: each formula, method and pattern has one card, with its statement, its conditions, why it is true, and worked examples. A lesson does not copy a card. It explains how a few cards fit together, when to reach for them, and how they are used on real contest problems, and it links each card by name. Press a name to open the card beside the lesson, so you never lose your place. Settings can make the name open the card's own page instead.

## How a chapter is built
A chapter is a short run of lessons on one theme. Each lesson starts with the cards it teaches and the cards it assumes you know, then explains the idea in one piece, with worked examples. Related cards follow, each with a line on how it connects. Then come the lesson's own problems, with full worked solutions further down the page, and then Exercises: real contest problems that use the idea. An Introduction has Exercises too: they need only the chapter's first ideas, though they are not always easy to solve.

A chapter ends with problems that mix its lessons, without saying which idea each one needs. In the newer chapters, the first page is an Introduction that gives a short overview of the chapter's ideas, and the last lesson is a Summary with a list of problem solving strategies. Then come Review Problems, which mostly check that the ideas are understood, and Challenge Problems, which are harder.

## What the tags mean
Every chapter is tagged by how much it matters for ${amc ? "the AMC" : aime ? "the AIME" : "olympiad problem solving"}. ${learnLevelHtml({ level: "Core" })} chapters are needed for ${amc ? "the early and middle problems" : aime ? "the early AIME problems" : "the foundations of the subject"}. ${learnLevelHtml({ level: "Core II" })} chapters are needed for ${amc ? "the hard problems" : aime ? "the later AIME problems" : "more advanced problems"}. ${amc ? "A strong score needs both" : "A high score needs both"}. ${learnLevelHtml({ level: "Extension" })} chapters are optional, and nothing else in the book depends on them. A chapter's tag is the importance of its idea as a whole; each lesson carries its own tag as well, so a ${learnLevelHtml({ level: "Core" })} chapter can hold a ${learnLevelHtml({ level: "Core II" })} lesson on a harder corner of the idea.

## How to use it
Read the chapters in order if the subject is new to you. If it is not, start at any chapter: the cards it assumes are listed at the top of each lesson, and each one opens in a click.

Try every problem before you look at its solution. A contest problem's Show Solution works only once you have written something in its box, so the attempt comes first. The problems on a page run from easier to harder, and getting stuck on the last ones is expected.

Come back to the strategies. When a problem resists, the chapter's Summary and the lesson that matches its theme are the place to look, and the cards hold every formula in full.

The book remembers the last lesson you opened, in this browser, and the contents page offers to continue from it.`;
    learnBookShell(b, null, "howto", `
        <div class="book-eyebrow">${escapeAttr(b.title)} &middot; Contents and Introduction</div>
        <h2 class="learn-h"><span class="lb-code">C</span> How to Use This Book</h2>
        <div class="detail-body lp-body bk-howto">${detailBodyHtml(text, "howto:" + b.id)}</div>`);
    window.scrollTo({ top: 0 });
  }

  function renderLearnChapter(b, c) {
    learnBookShell(b, c, "chapter", `
        <div class="book-eyebrow">${escapeAttr(b.title)} &middot; Chapter ${c.code.slice(1)}</div>
        <h2 class="learn-h"><span class="lb-code">${c.code}</span> ${escapeAttr(c.title)} ${learnLevelHtml(c)}</h2>
        <ol class="lb-lessons lb-chapter-page">${c.lessons.map(l => learnLessonRow(b, c, l, false)).join("")}${learnReviewRow(b, c, false)}</ol>`);
  }

  // ---------- The math keyboard (LQ5) ----------
  // Unused since 2026-10-31: lessons now end with problems and worked solutions instead of checks
  // to answer (owner). The keyboard, its grammar (js/learn-answer.js) and the check code below are
  // kept, at the owner's word, in case answers are typed again later.
  // A keypad that pops up from the answer box when the box is pressed, and closes when the
  // student presses elsewhere, checks the answer, or presses Escape. The box holds the plain
  // answer (with √, π, × and ÷ as typed symbols), and the top of the pop-up shows it typeset as
  // it is built, so nothing is ever typed in LaTeX. On a phone the system keyboard stays closed
  // (inputmode="none"); on a computer the physical keys work too.
  const MK_KEYS = [
    ["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷", "Fraction (divide)"], ["(", "("], [")", ")"],
    ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×", "Times"], ["xⁿ", "^", "Power"], ["√", "√(", "Square root"],
    ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−", "Minus"], ["+", "+"], ["π", "π", "Pi"],
    ["0", "0"], [".", ".", "Decimal point"], [",", ", ", "Comma, for a list of answers"], ["←", "left", "Move left"], ["→", "right", "Move right"], ["⌫", "back", "Backspace"]
  ];
  // The stored form is the plain grammar: 3/4, 2sqrt(3), 7pi/2, -5, 4, 9.
  const mkPlain = s => s.replace(/√/g, "sqrt").replace(/∛/g, "cbrt").replace(/π/g, "pi").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").trim();
  // The box shows the symbols: typed sqrt, pi, *, / and - become √, π, ×, ÷ and −. LaTeX typed
  // by habit (anything with a backslash) is left as it is; the grammar reads it.
  const mkShow = s => /\\/.test(s) ? s : s.replace(/\*\*/g, "^").replace(/sqrt/gi, "√").replace(/cbrt/gi, "∛").replace(/pi/gi, "π")
    .replace(/[*·]/g, "×").replace(/\//g, "÷").replace(/[-–]/g, "−");
  function mathKeyboardHtml(value) {
    return `<div class="mk">
        <div class="mk-row">
          <input class="mk-input" type="text" inputmode="none" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Your answer" placeholder="Your answer" maxlength="120" value="${escapeAttr(mkShow(value || ""))}">
          <button type="button" class="mk-submit">Check</button>
        </div>
        <div class="mk-pop">
          <div class="mk-top"><div class="mk-preview" aria-live="polite"></div><button type="button" class="mk-key mk-clear" data-mk="clear">Clear</button></div>
          <div class="mk-keys">${MK_KEYS.map(([label, ins, name]) => `<button type="button" class="mk-key${/^\d$/.test(label) ? " mk-digit" : ""}${/^(back|left|right)$/.test(ins) ? " mk-edit" : ""}" data-mk="${escapeAttr(ins)}"${name ? ` aria-label="${name}" title="${name}"` : ""}>${ins === "left" ? uiIcon("arrow-left") : ins === "right" ? uiIcon("arrow-right") : ins === "back" ? uiIcon("backspace") : label}</button>`).join("")}</div>
          <p class="mk-hint">You can also type: sqrt(2), pi, 2^10, 3/4, and a comma between answers.</p>
        </div>
      </div>`;
  }
  // The typeset answer at the top of the pop-up; while the answer cannot be read yet, a short
  // note says why (an answer still being built, like "3+", just shows a dot).
  function mkPreview(box) {
    const input = box.querySelector(".mk-input"), out = box.querySelector(".mk-preview");
    const plain = mkPlain(input.value);
    out.classList.remove("mk-note");
    if (!plain) { out.textContent = ""; return; }
    try {
      const tex = window.LearnAnswer.toTex(window.LearnAnswer.closeOpen(plain));
      if (window.katex) window.katex.render(tex, out, { throwOnError: false, displayMode: false });
      else out.textContent = tex;
    } catch (e) {
      out.classList.add("mk-note");
      out.textContent = /^Something is missing after|stops too soon|needs a number after/.test(e.message) ? "…" : e.message;
    }
  }
  function mkPress(box, ins) {
    const input = box.querySelector(".mk-input");
    let v = input.value, a = input.selectionStart, z = input.selectionEnd;
    if (a == null) a = z = v.length;
    if (ins === "clear") { v = ""; a = z = 0; }
    else if (ins === "left") { a = z = Math.max(0, (a === z ? a - 1 : a)); }
    else if (ins === "right") { a = z = Math.min(v.length, (a === z ? z + 1 : z)); }
    else if (ins === "back") {
      if (a === z && a > 0) a -= /(√\(|∛\(|, )$/.test(v.slice(0, a)) ? 2 : 1;
      v = v.slice(0, a) + v.slice(z); z = a;
    } else { v = v.slice(0, a) + ins + v.slice(z); a = z = a + ins.length; }
    input.value = v;
    // The keys never take the focus (mousedown is cancelled), so the caret stays where the
    // student put it; the box is not focused here, which would open a phone's own keyboard.
    try { input.setSelectionRange(a, z); } catch (e) {}
    mkPreview(box);
  }
  // Typing on a keyboard: the symbols are put in as they are typed, keeping the caret in place.
  function mkTyped(input) {
    const a = input.selectionStart, v = input.value;
    if (a == null || /\\/.test(v)) return;
    const before = mkShow(v.slice(0, a)), after = mkShow(v.slice(a));
    if (before + after === v) return;
    input.value = before + after;
    try { input.setSelectionRange(before.length, before.length); } catch (e) {}
  }

  // A check (LQ5): typed with the keyboard, compared by value, then marked and explained in one
  // line. Nothing shows before an answer, since there are no hints.
  function learnCheckHtml(l, n, ch) {
    const key = l.code + "#" + n, saved = learnProgress().checks[key];
    return `<div class="lc-check" data-check="${escapeAttr(key)}" id="check-${n}">
        <div class="lc-q"><span class="lc-n">Check ${n}</span> ${ch.q}</div>
        ${mathKeyboardHtml(saved ? saved.a : "")}
        <div class="lc-result" hidden></div>
      </div>`;
  }
  function learnCheckResult(el, ch, ok) {
    const res = el.querySelector(".lc-result");
    res.hidden = false;
    res.className = "lc-result " + (ok ? "lc-right" : "lc-wrong");
    res.innerHTML = `<strong>${ok ? "Right." : "Not quite."}</strong> ${ch.why}`;
    renderMath(el);
  }

  // The AoPS-style problem list (LQ6): the statement, a box for the student's work, and Show
  // Solution, which works only once the box has text. The strategy and the card chain are always
  // hidden until then, whatever the Strategy setting says.
  // Every problem has a label that names it uniquely (owner, 2026-10-31): a page's contest problems
  // are numbered on from its own problems, so with three own problems the first contest problem
  // of C1.2 is Problem C1.2.4. The old chapter reviews use Problem N3.R.1, N3.R.2, ...
  function learnProblemsHtml(refs, name) {
    const prog = learnProgress().problems;
    name = name || (i => `${i + 1}.`);
    // Easiest first, harder after (owner, 2026-10-31), whatever order the file lists them in.
    const probs = refs.map(learnProblem).filter(Boolean).map((p, k) => ({ p, k }))
      .sort((x, y) => difficultyScore(x.p) - difficultyScore(y.p) || x.k - y.k).map(x => x.p);
    return `<ol class="lp-problems">${probs.map((p, i) => {
      const saved = prog[p.slug] || {};
      return `<li class="lp-prob" id="lp-${p.slug}" data-slug="${p.slug}">
          <div class="lp-prob-head"><span class="lp-prob-n">${name(i)}</span>${/\.$/.test(name(i)) ? "" : ` <span class="lp-prob-sep">&middot;</span>`} <a href="#/problem/${p.slug}">${escapeAttr(refShort(p.ref))}</a></div>
          ${MAA_RE.test(p.ref) ? `<section class="prob-st lp-st" data-slug="${p.slug}" hidden><div class="prob-statement"></div></section>`
            : p.url ? `<p class="prob-note"><a href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">Read the problem on ${p.urlLabel === "archive" ? "the official archive" : "AoPS"} ${uiIcon("arrow-up-right")}</a></p>` : ""}
          <div class="lp-work">
            <textarea class="lp-notes" rows="2" placeholder="Type your solution, notes and/or work here." aria-label="Your solution and notes for ${escapeAttr(refShort(p.ref))}">${escapeAttr(saved.notes || "")}</textarea>
            <button type="button" class="hp-btn lp-show"${(saved.notes || "").trim() ? "" : " disabled"}>Show Solution</button>
          </div>
          <div class="lp-sol" hidden></div>
        </li>`;
    }).join("")}</ol>`;
  }
  // A textbook problem's solution opens inside the problem's own box, like a practice set's
  // review (owner, 2026-11-08): a hairline, "Solution for Problem R5.5.4:" in italics, the
  // strategy and its three columns, Open in app and Open in AoPS, then Study a concept more.
  function learnSolutionHtml(p, label) {
    const { chain, altIds, chainCol } = chainParts(p);
    return `<p class="lp-sol-title">Solution for ${escapeAttr(label)}:</p>${chainInnerHtml(p, chainCol, chain, altIds, solutionLinksHtml(p))}`;
  }
  function showLearnSolution(li) {
    const p = PROBLEM_BY_SLUG[li.dataset.slug], sol = li.querySelector(".lp-sol");
    if (!p || !sol) return;
    const n = (li.querySelector(".lp-prob-n")?.textContent || "").trim().replace(/\.$/, "");
    sol.innerHTML = learnSolutionHtml(p, /^\d+$/.test(n) ? "Problem " + n : n || refShort(p.ref));
    sol.hidden = false;
    const btn = li.querySelector(".lp-show");
    if (btn) { btn.textContent = "Hide Solution"; btn.classList.add("is-open"); }
    renderMath(li);
  }

  // The lesson: its explanation all in one piece (the write-up format, §2), then its own problems,
  // then their worked solutions, each under the problem stated again (owner, 2026-10-31: practice to work through, not checks to pass;
  // no answer box and no marking). The contest problems follow in their own list.
  function learnBodyHtml(l, d) {
    const ex = d.exercises || [];
    // Related cards (owner, 2026-10-31): how the lesson connects to cards it does not teach in its
    // explanation, one line each, so the explanation itself never breaks off to talk about them.
    const related = (d.related || []).filter(r => BY_ID[r.card]);
    // The Summary's Problem Solving Strategies: a bulleted list under its own heading.
    const strat = Array.isArray(d.strategies) && d.strategies.length ? `<section class="lp-strategies"><h3 class="lp-h3">Problem Solving Strategies</h3>
        <ul>${d.strategies.map(t => `<li>${linkifyCards(t)}</li>`).join("")}</ul></section>` : "";
    return `<div class="detail-body lp-body">${linkLessonRefs(detailBodyHtml(notate(String(d.body || "")), "learn:" + l.code))}</div>
      ${strat}
      ${related.length ? `<h3 class="lp-h3">Related cards</h3>
        <ul class="lp-related">${related.map(r => `<li><a class="card-link" href="#/f/${r.card}" data-card="${r.card}">${BY_ID[r.card].formula.name}</a>: ${linkLessonRefs(linkifyCards(r.note))}</li>`).join("")}</ul>` : ""}
      ${learnExercisesHtml(ex, i => `Problem ${l.code}.${i + 1}`)}`;
  }
  // A page's contest problems and then the solutions of its own problems, labels numbered on.
  // Lessons run our problems, their solutions, then the contest problems (Exercises); Review and
  // Challenge Problems run our problems, the contest problems, then the solutions, so that the
  // problems sit together (owner, 2026-11-01).
  function learnTailHtml(code, ex, refs, heading, solutionsFirst) {
    const name = i => `Problem ${code}.${i + 1}`;
    const contest = refs.length ? `<h3 class="lp-h3">${heading}</h3>${learnProblemsHtml(refs, i => name(ex.length + i))}` : "";
    return solutionsFirst ? `${learnSolutionsHtml(ex, name)}${contest}` : `${contest}${learnSolutionsHtml(ex, name)}`;
  }
  // A lesson reference in parentheses, such as "(L3.4)", links to that lesson (owner, 2026-11-01).
  let LESSON_BY_CODE = null;
  function linkLessonRefs(html) {
    if (!LESSON_BY_CODE) {
      LESSON_BY_CODE = {};
      for (const b of LEARN_SHELF) for (const c of b.chapters) for (const l of c.lessons) LESSON_BY_CODE[l.code] = { b, c, l };
    }
    return String(html).replace(/\(([A-Z]\d{1,2}\.\d{1,2})\)/g, (m, code) => {
      const x = LESSON_BY_CODE[code];
      return x ? `(<a class="lp-ref" href="${learnHash(x.b, x.c, lessonNum(x.l))}">${code}</a>)` : m;
    });
  }
  // Our own problems, each with Jump to solution; the solutions and the contest problems follow (learnTailHtml).
  function learnExercisesHtml(ex, name) {
    return `${ex.length ? `<h3 class="lp-h3" id="lx-problems">Problems</h3>
        <ol class="lx-list">${ex.map((x, i) => `<li class="lx" id="lx-${i + 1}">
            <div class="lx-head"><span class="lx-n">${name(i)}</span><button type="button" class="lx-jump" data-lx-jump="lx-sol-${i + 1}">Jump to solution</button></div>
            <div class="lx-q">${x.q}</div></li>`).join("")}</ol>` : ""}`;
  }
  function learnSolutionsHtml(ex, name) {
    return `${ex.length ? `<h3 class="lp-h3" id="lx-solutions">Solutions</h3>
        <div class="lx-sols">${ex.map((x, i) => `<div class="lx-sol" id="lx-sol-${i + 1}">
            <div class="lx lx-again">
              <div class="lx-head"><span class="lx-n">${name(i)}</span><button type="button" class="lx-jump" data-lx-jump="lx-${i + 1}">Back to problem</button></div>
              <div class="lx-q">${x.q}</div>
            </div>
            <p class="lx-sol-h">Solution for ${name(i)}:</p>
            <div class="lx-s">${x.solution}</div></div>`).join("")}</div>` : ""}`;
  }

  // The card drawer: a card opened from a lesson shows beside it (below it on a phone), so the
  // student never leaves the page.
  // The drawer's contents for a card, shared by the drawer and the Settings preview.
  function learnDrawerInnerHtml(id) {
    const e = BY_ID[id];
    if (!e) return "";
    const f = e.formula, sec = cardSections(e);
    const fig = ((window.MATH_DIAGRAMS || {})[id] || [])[0];
    return `<div class="lp-drawer-head">
          <div class="card-meta">${kindBadgeHtml(f)}${impBadgeHtml(f)}</div>
          <button type="button" class="lp-drawer-close" aria-label="Close the card">${uiIcon("close")}</button>
        </div>
        <div class="detail lp-preview">
          <div class="lp-preview-title"><h3 class="card-name"><a class="lp-preview-name" href="#/f/${id}" title="Open the full card">${f.name}</a></h3><span class="detail-actions">${starBtnHtml(id)}${addListBtnHtml(id)}</span></div>
          ${f.latex ? `<div class="formula-display detail-formula" data-latex="${escapeAttr(latexFor(f))}"></div>` : ""}
          ${leadBoxHtml(f)}
          <p class="card-desc detail-summary">${linkifyCards(f.descriptionLinked || f.description)}</p>
          ${fig ? `<div class="diagram detail-diagram">${fig}</div>` : ""}
          ${cardExplanationHtml(e, sec)}
        </div>`;
  }
  function openLearnDrawer(id) {
    const e = BY_ID[id], drawer = $content.querySelector(".lp-drawer");
    if (!e || !drawer) return;
    // The preview: what the card is (kind, tier), its name (which opens the full card, where the
    // examples, practice problems and links stay), its formula at full width, the one-line
    // summary and the first figure, then the explanation drawn exactly as on the card page.
    drawer.innerHTML = learnDrawerInnerHtml(id);
    drawer.hidden = false;
    drawer.scrollTop = 0;
    drawer.style.transform = "";
    wireDrawerSwipe(drawer);
    $content.querySelector(".lp-grid").classList.add("has-drawer");
    renderMath(drawer);
    wireProofToggles(drawer);
    fitBatch([...drawer.querySelectorAll(".formula-display[data-latex]")]);
    // The drawer itself takes the focus (Escape closes it), so no focus ring lands on the ×.
    drawer.tabIndex = -1;
    drawer.focus({ preventScroll: true });
  }
  // On a phone the drawer is a sheet at the bottom of the screen: swiping it down closes it
  // (owner, 2026-10-31). The sheet follows the finger only while its content is scrolled to the
  // top, so scrolling inside a long card still works.
  function wireDrawerSwipe(drawer) {
    if (drawer.dataset.swipe) return;
    drawer.dataset.swipe = "1";
    let y0 = null, dy = 0, t0 = 0;
    const sheet = () => window.matchMedia("(max-width: 899px)").matches;
    drawer.addEventListener("touchstart", e => {
      if (!sheet() || drawer.scrollTop > 0 || e.touches.length !== 1) { y0 = null; return; }
      y0 = e.touches[0].clientY; dy = 0; t0 = Date.now();
    }, { passive: true });
    drawer.addEventListener("touchmove", e => {
      if (y0 == null) return;
      dy = e.touches[0].clientY - y0;
      if (dy <= 0) { drawer.style.transform = ""; drawer.classList.remove("is-dragging"); return; }
      e.preventDefault();
      drawer.classList.add("is-dragging");
      drawer.style.transform = `translateY(${dy}px)`;
    }, { passive: false });
    const end = () => {
      if (y0 == null) return;
      y0 = null;
      drawer.classList.remove("is-dragging");
      const fast = dy > 40 && dy / Math.max(1, Date.now() - t0) > 0.5;
      drawer.classList.add("is-settling");
      if (dy > Math.min(120, drawer.offsetHeight / 3) || fast) {
        drawer.style.transform = `translateY(${drawer.offsetHeight}px)`;
        setTimeout(() => { drawer.classList.remove("is-settling"); drawer.style.transform = ""; closeLearnDrawer(); }, 200);
      } else {
        drawer.style.transform = "";
        setTimeout(() => drawer.classList.remove("is-settling"), 200);
      }
      dy = 0;
    };
    drawer.addEventListener("touchend", end);
    drawer.addEventListener("touchcancel", end);
  }
  function closeLearnDrawer() {
    const drawer = $content.querySelector(".lp-drawer");
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    drawer.innerHTML = "";
    $content.querySelector(".lp-grid").classList.remove("has-drawer");
  }

  function learnCardChips(ids) {
    // Plain links, like every other card link in the lesson (owner, 2026-10-31).
    return ids.filter(id => BY_ID[id]).map(id => `<a class="card-link" href="#/f/${id}" data-card="${id}">${BY_ID[id].formula.name}</a>`).join(`<span class="lp-cards-sep">&middot;</span>`);
  }
  // A lesson or a review: the outline, the reading column and the drawer.
  // A written lesson's reading column, shared by the page and the Settings preview.
  function learnLessonMainHtml(b, c, l, d) {
    const opener = learnHasIntro(c) && l === c.lessons[0];
    return `${opener ? `<header class="ch-open">
          <span class="ch-open-n">${c.code.slice(1)}</span>
          <span class="ch-open-txt"><span class="ch-open-k">Chapter ${c.code.slice(1)} ${learnLevelHtml(c)}</span><span class="ch-open-t">${escapeAttr(c.title)}</span></span>
        </header>` : `<div class="book-eyebrow">Learn &middot; ${escapeAttr(b.title)} &middot; ${c.code}</div>`}
        <h2 class="learn-h"><span class="lb-code">${l.code}</span> ${escapeAttr(l.title)}${l.level ? ` ${learnLevelHtml(l)}` : ""}</h2>
        <div class="lp-cards">
          ${(d.cards || []).length ? `<div class="lp-cards-row"><span class="lp-cards-label">Teaches you about</span>${learnCardChips(d.cards)}</div>` : ""}
          ${(d.prereq || []).length ? `<div class="lp-cards-row"><span class="lp-cards-label">Assumes you know</span>${learnCardChips(d.prereq)}</div>` : ""}
        </div>
        ${learnBodyHtml(l, d)}
        ${learnTailHtml(l.code, d.exercises || [], d.problems || [], "Exercises", true)}`;
  }
  function renderLearnLesson(b, c, l, end) {
    const d = l ? learnLessonData(c, l) : null;
    const isReview = !l;
    let main;
    if (isReview && learnHasIntro(c)) {
      // Review Problems or Challenge Problems: our own problems first, then contest problems.
      const kind = end || "review", set = learnEndSet(c, kind) || { exercises: [], problems: [] };
      main = `<div class="book-eyebrow">Learn &middot; ${escapeAttr(b.title)} &middot; ${c.code}</div>
        <h2 class="learn-h"><span class="lb-code">${learnEndCode(c, kind)}</span> ${LEARN_END[kind]}</h2>
        <p class="learn-note">${kind === "review" ? "Problems that check the ideas of the whole chapter, mostly direct uses of them." : "Harder problems that combine the chapter's ideas, in rising order of difficulty."}</p>
        ${learnExercisesHtml(set.exercises || [], i => `Problem ${learnEndCode(c, kind)}.${i + 1}`)}
        ${learnTailHtml(learnEndCode(c, kind), set.exercises || [], set.problems || [], "Contest problems")}`;
    } else if (isReview) {
      main = `<div class="book-eyebrow">Learn &middot; ${escapeAttr(b.title)} &middot; ${c.code}</div>
        <h2 class="learn-h">${c.code} chapter review</h2>
        <p class="learn-note">Mixed problems from the whole chapter, in rising order of difficulty.</p>
        ${learnProblemsHtml(learnReview(c), i => `Problem ${c.code}.R.${i + 1}`)}`;
    } else if (!d) {
      main = `<div class="book-eyebrow">Learn &middot; ${escapeAttr(b.title)} &middot; ${c.code}</div>
        <h2 class="learn-h"><span class="lb-code">${l.code}</span> ${escapeAttr(l.title)}</h2>
        <p class="learn-note">This lesson is not written yet.</p>`;
    } else {
      // The Introduction opens the chapter: the chapter's number and title above the lesson's heading.
      main = learnLessonMainHtml(b, c, l, d);
    }
    learnBookShell(b, c, isReview ? (end || "review") : l, main);
    if (l && d && c.kind !== "reference") { noteRecent("l:" + l.code); const prog = learnProgress(); if (prog.last !== l.code) { prog.last = l.code; saveLearn(); } }
    $content.querySelectorAll(".lp-prob").forEach(li => {
      const p = PROBLEM_BY_SLUG[li.dataset.slug];
      const box = li.querySelector(".lp-notes");
      if (box && box.value) lpGrow(box);
      if (p && MAA_RE.test(p.ref)) showStatement(p, ".lp-st");
      const saved = learnProgress().problems[li.dataset.slug];
      if (saved && saved.shown && !saved.hidden && (saved.notes || "").trim()) showLearnSolution(li);
    });
  }

  function renderLearn(route) {
    if (route.howto) { renderLearnHowTo(route.book); return; }
    if (route.lesson || route.review || route.challenge) renderLearnLesson(route.book, route.chapter, route.lesson, route.challenge ? "challenge" : route.review ? "review" : null);
    else if (route.chapter) renderLearnChapter(route.book, route.chapter);
    else renderLearnBook(route.book);
  }

  // The lesson page's own events, delegated once on $content.
  let learnNotesTimer = 0;
  $content.addEventListener("click", e => {
    if (!e.target.closest(".lesson-page")) return;
    const key = e.target.closest(".mk-key");
    if (key) { mkPress(key.closest(".mk"), key.dataset.mk); return; }
    const submit = e.target.closest(".mk-submit");
    if (submit) { learnSubmitCheck(submit.closest(".lc-check")); return; }
    const show = e.target.closest(".lp-show");
    if (show) {
      const li = show.closest(".lp-prob"), notes = li.querySelector(".lp-notes").value;
      const prog = learnProgress();
      // A shown solution can be hidden again; "shown" keeps the fact that it was seen.
      if (show.classList.contains("is-open")) {
        li.querySelector(".lp-sol").hidden = true;
        show.textContent = "Show Solution"; show.classList.remove("is-open");
        prog.problems[li.dataset.slug] = Object.assign(prog.problems[li.dataset.slug] || {}, { notes, hidden: true });
        saveLearn();
        return;
      }
      if (!notes.trim()) return;
      prog.problems[li.dataset.slug] = { notes, shown: true };
      saveLearn();
      showLearnSolution(li);
      return;
    }
    if (e.target.closest(".lp-drawer-close")) { closeLearnDrawer(); return; }
    if (e.target.closest("[data-bk-top]")) { e.preventDefault(); window.scrollTo({ top: 0, behavior: window.AppAccessibility.scrollBehavior() }); return; }
    // A lesson problem's "Jump to solution", and the solution's "Back to problem". The address is a
    // route, so these scroll instead of using #fragments.
    const jump = e.target.closest("[data-lx-jump]");
    if (jump) {
      const to = document.getElementById(jump.dataset.lxJump), bar = document.querySelector(".topbar");
      // The top bar covers the page only where it stays put (it scrolls away on a phone).
      const cover = bar && !window.matchMedia("(max-width: 900px)").matches ? bar.offsetHeight : 0;
      if (to) window.scrollTo({ top: to.getBoundingClientRect().top + window.scrollY - cover - 16, behavior: window.AppAccessibility.scrollBehavior() });
      return;
    }
    // A card link in the lesson opens in the drawer instead of leaving the page.
    const link = e.target.closest(".lp-main .card-link[data-card], .lp-preview .card-link[data-card]");
    if (link && state.lessonLinks !== "card" && BY_ID[link.dataset.card] && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      e.stopImmediatePropagation();
      hideCardPreview();
      openLearnDrawer(link.dataset.card);
    }
  }, true);
  // The work box starts about two lines tall and grows with what is typed; it is never dragged.
  function lpGrow(t) {
    t.style.height = "auto";
    t.style.height = (t.scrollHeight + t.offsetHeight - t.clientHeight) + "px";
  }
  function learnSubmitCheck(el) {
    if (!el) return;
    const route = getRoute();
    const d = route.type === "learn" && route.lesson ? learnLessonData(route.chapter, route.lesson) : null;
    const n = +el.dataset.check.split("#")[1], ch = d && d.checks[n - 1];
    const typed = mkPlain(el.querySelector(".mk-input").value);
    if (!ch || !typed) return;
    const res = el.querySelector(".lc-result");
    try { window.LearnAnswer.parse(typed); }
    catch (err) {
      res.hidden = false; res.className = "lc-result lc-unread";
      res.textContent = "This answer cannot be read yet. " + err.message;
      return;
    }
    const ok = window.LearnAnswer.same(typed, ch.answer);
    learnProgress().checks[el.dataset.check] = { a: typed, ok };
    saveLearn();
    el.querySelector(".mk").classList.remove("is-open");
    el.querySelector(".mk-input").blur();
    learnCheckResult(el, ch, ok);
  }
  $content.addEventListener("input", e => {
    const input = e.target.closest(".lesson-page .mk-input");
    if (input) { if (!e.isComposing) mkTyped(input); mkPreview(input.closest(".mk")); return; }
    const notes = e.target.closest(".lesson-page .lp-notes");
    if (!notes) return;
    lpGrow(notes);
    const li = notes.closest(".lp-prob");
    const btn = li.querySelector(".lp-show");
    btn.disabled = !notes.value.trim() && !btn.classList.contains("is-open");
    clearTimeout(learnNotesTimer);
    learnNotesTimer = setTimeout(() => {
      const prog = learnProgress(), cur = prog.problems[li.dataset.slug] || {};
      if (!notes.value.trim() && !cur.shown) delete prog.problems[li.dataset.slug];
      else prog.problems[li.dataset.slug] = Object.assign(cur, { notes: notes.value });
      saveLearn();
    }, 400);
  });
  $content.addEventListener("keydown", e => {
    const input = e.target.closest(".lesson-page .mk-input");
    if (input && e.key === "Enter") { e.preventDefault(); learnSubmitCheck(input.closest(".lc-check")); }
    else if (input && e.key === "Escape") { input.closest(".mk").classList.remove("is-open"); input.blur(); }
    else if (e.key === "Escape" && e.target.closest(".lp-drawer")) closeLearnDrawer();
  });
  $content.addEventListener("mousedown", e => { if (e.target.closest(".lesson-page .mk-key")) e.preventDefault(); });
  // The keypad opens with its box and closes on a press anywhere outside it.
  function mkOpen(box) {
    $content.querySelectorAll(".mk.is-open").forEach(x => { if (x !== box) x.classList.remove("is-open"); });
    if (box) { box.classList.add("is-open"); mkPreview(box); }
  }
  $content.addEventListener("focusin", e => { const input = e.target.closest(".lesson-page .mk-input"); if (input) mkOpen(input.closest(".mk")); });
  $content.addEventListener("click", e => { const input = e.target.closest(".lesson-page .mk-input"); if (input) mkOpen(input.closest(".mk")); });
  document.addEventListener("pointerdown", e => { if (!e.target.closest(".mk")) mkOpen(null); });

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

  // Lessons in the main search (owner, 2026-11-06): first when the query says "lesson" or
  // "chapter", otherwise after the cards (renderSearchResults orders them); only very strong
  // matches either way, read off the
  // titles of lessons and chapters, never their prose. Every word of the query must match its
  // own word of the title: the word itself, the start of it, or (weighted lower) a synonym.
  // A one-word query finds only a title that is about that thing: one that starts with the
  // word ("Vieta: the sum and product of the roots", "Circles") or is only that word, never
  // every title that mentions it. At most three show. A lesson code ("C5.3")
  // finds that lesson. Introductions and Summaries are skipped.
  let LESSON_INDEX = null;
  const LESSON_STOP = new Set("a an the how to do i can find learn about chapter lesson book this with of in on for and or is are what does use using where me please want looking look understand explain help into from by its their".split(" ").map(normWord));
  function lessonIndex() {
    if (LESSON_INDEX) return LESSON_INDEX;
    const toks = t => wordsOf(String(t).replace(/\$[^$]*\$/g, " ")).filter(w => !LESSON_STOP.has(w));
    const entry = (b, c, l, title) => { const w = toks(title); return { b, c, l, title, words: [...new Set(w)], phrase: w.join(" ") }; };
    LESSON_INDEX = [];
    LEARN_SHELF.forEach(b => b.chapters.forEach(c => {
      if (learnChapterData(c)) LESSON_INDEX.push(entry(b, c, null, c.title));
      c.lessons.forEach(l => {
        if (!/^(Introduction|Summary)$/.test(l.title) && learnLessonData(c, l)) LESSON_INDEX.push(entry(b, c, l, l.title));
      });
    }));
    return LESSON_INDEX;
  }
  // Abbreviations read the way the card search reads them ("POP" is Power of a Point), so a
  // lesson or chapter is found by the same short names as its card (owner, 2026-11-07); the
  // query as typed is tried too, and the two lists are merged.
  function lessonMatches(q) {
    const words = String(q).split(/\s+/), expanded = words.map(w => ABBREV[w.toLowerCase()] || w).join(" ");
    if (expanded === String(q) || /^\s*[a-z]\d+\.\d+\s*$/i.test(q)) return lessonMatchesRaw(q);
    const seen = new Set(), out = [];
    [...lessonMatchesRaw(expanded), ...lessonMatchesRaw(q)].forEach(x => { if (!seen.has(x)) { seen.add(x); out.push(x); } });
    return out.slice(0, 4);
  }
  function lessonMatchesRaw(q) {
    const idx = lessonIndex(), code = q.trim().match(/^[a-z]\d+\.\d+$/i);
    if (code) return idx.filter(x => x.l && x.l.code.toLowerCase() === q.trim().toLowerCase()).slice(0, 1);
    const qt = [...new Set(wordsOf(q).filter(w => !LESSON_STOP.has(w)))];
    if (!qt.length || !qt.some(w => w.length >= 3)) return [];
    const hits = [];
    idx.forEach(x => {
      const free = new Set(x.words);
      let quality = 0;
      // Each query word takes its own title word: exact first, then a prefix, then a synonym.
      const take = (t, test, wgt) => { const w = [...free].find(test); if (w) { free.delete(w); quality += wgt; } return !!w; };
      const all = qt.every(t => take(t, w => w === t, 1) || take(t, w => t.length >= 4 && w.startsWith(t), 0.8)
        || (qt.length > 1 && take(t, w => expandToken(t).slice(1).includes(w), 0.5)));
      if (!all) return;
      const coverage = qt.length / x.words.length;
      // One word finds a title that starts with it, is only it, or contains it whole (5+ letters).
      if (qt.length === 1 ? !(coverage === 1 || x.words[0] === qt[0] || (qt[0].length >= 4 && x.words[0].startsWith(qt[0])) || (qt[0].length >= 5 && x.words.includes(qt[0]))) : coverage < 0.34) return;
      hits.push({ x, score: quality / qt.length + coverage + (x.phrase === qt.join(" ") ? 1 : 0) + (x.l ? 0 : 0.05) });
    });
    hits.sort((a, z) => z.score - a.score || a.x.title.length - z.x.title.length);
    return hits.slice(0, 4).map(h => h.x);
  }
  // A textbook named in full ("AMC Algebra", "aime geometry book") is a result of its own
  // (owner, 2026-11-07): every word of the title must be in the query.
  function bookMatches(q) {
    // "AMC 10", "AMC10", "amc 12" and "AMC 10/12" all mean the AMC books (owner, 2026-11-07).
    q = String(q).replace(/\bamc\s*-?\s*(10|12)(\s*\/\s*(10|12))?\b/gi, "amc");
    const qt = new Set(wordsOf(q).filter(w => !LESSON_STOP.has(w) && w !== normWord("textbook")));
    if (!qt.size) return [];
    return LEARN_SHELF.filter(b => {
      const bt = wordsOf(b.title).filter(w => !LESSON_STOP.has(w));
      return bt.length && bt.every(w => qt.has(w)) && [...qt].every(w => bt.includes(w));
    });
  }
  // Where the last of the first eight cards that match the query in their name sits: lessons
  // and chapters follow it, so a lesson neither outranks the cards named for the query nor sinks below loosely
  // related ones (owner, 2026-11-07).
  function strongCardCount(sorted, query) {
    const qt = wordsOf(query).filter(w => !LESSON_STOP.has(w));
    if (!qt.length) return 1;
    const xt = wordsOf(String(query).split(/\s+/).map(w => ABBREV[w.toLowerCase()] || w).join(" ")).filter(w => !LESSON_STOP.has(w));
    let n = 0;
    sorted.slice(0, 8).forEach((e, i) => {
      const nw = new Set(wordsOf(String(e.formula.name).replace(/\$[^$]*\$/g, " ")));
      const covers = toks => toks.every(t => nw.has(t) || [...nw].some(w => t.length >= 4 && w.startsWith(t)));
      if (covers(qt) || (xt.length && covers(xt))) n = i + 1;
    });
    return Math.max(1, n);
  }
  const learnCrumb = parts => `<span class="card-crumb">${parts.map(escapeAttr).join(" " + uiIcon("chevron-right") + " ")}</span>`;
  const capFirst = t => String(t || "").replace(/^./, ch => ch.toUpperCase());
  // The first paragraph of a lesson, for its result card (the card clamps it).
  const lessonLead = x => (String((learnLessonData(x.c, x.l || x.c.lessons[0]) || {}).body || "").split(/\n\s*\n/).find(t => t.trim() && !/^\{\{/.test(t.trim())) || "")
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1").replace(/\[\[([^\]]*)\]\]/g, "$1");   // [[slug|text]] reads as its text

  function renderSearchResults() {
    // "lesson" and "chapter" only steer lessons to the front; the rest of the search runs
    // without them, so "power of a point lesson" lists the same cards as "power of a point".
    const askLesson = /\b(lessons?|chapters?)\b/i.test(state.query) || /^\s*[a-z]\d+\.\d+\s*$/i.test(state.query);
    const query = askLesson ? (state.query.replace(/\b(lessons?|chapters?)\b/gi, " ").replace(/\s+/g, " ").trim() || state.query) : state.query;
    const { results, partial } = searchFormulas(query);
    const sorted = sortEntries(results);
    const queryTokens = wordsOf(spellOperators(query.toLowerCase()));
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
    let named = referencedProblems(query);
    if (named && !named.length) named = null;
    // "AMC 10/12 number theory" names a book, not problem 12 of the AMC 10.
    const bookHits = bookMatches(query);
    if (bookHits.length) named = null;
    const probs = named || problemMatches(query);
    const listHits = listMatches(query);
    const refy = !!named || /\b(19|20)\d\d\b|\b(aime|amc|hmmt|putnam|mathcounts)\b/i.test(query);
    // A reference that names a contest and a year but no problem number ("2025 AIME I",
    // "2023 amc10b") also gets the paper itself as a result, ahead of its problems, linking to
    // that paper on its contest page. "2025 AIME" names two papers and gets both.
    const ref = named && parseProblemQuery(query);
    const papers = [];
    if (ref && ref.fam && ref.year && !ref.num) named.forEach(p => {
      let g = papers.find(x => x.cname === p.cname);
      if (!g) papers.push(g = { cname: p.cname, fam: p.fam, year: p.year, problems: [] });
      g.problems.push(p);
    });
    papers.sort((a, b) => a.cname.localeCompare(b.cname));
    // Lessons lead only when the query asks for one (owner, 2026-11-06): "power of a point
    // lesson", "circles chapter", or a lesson code such as C5.3. Otherwise the same strong
    // matches are a secondary result, after the cards.
    const lessonHits = named ? [] : lessonMatches(query);
    const items = [];
    papers.forEach(c => items.push({ contest: c }));
    if (named) named.forEach(p => items.push({ problem: p }));
    listHits.filter(h => h.strong).forEach(h => items.push({ list: h.list }));
    bookHits.forEach(b => items.push({ book: b }));
    if (askLesson) lessonHits.forEach(x => items.push({ lesson: x }));
    if (refy && !named) probs.forEach(p => items.push({ problem: p }));
    // Lessons and chapters are a second tier: after the cards named for the query, ahead of
    // the rest of the cards (owner, 2026-11-07), unless the query asks for a lesson.
    const lessonAt = askLesson ? 0 : strongCardCount(sorted, query);
    sorted.forEach((e, i) => {
      if (i === lessonAt && !askLesson) lessonHits.forEach(x => items.push({ lesson: x }));
      items.push({ entry: e });
    });
    if (!askLesson && sorted.length <= lessonAt) lessonHits.forEach(x => items.push({ lesson: x }));
    if (!refy) probs.forEach(p => items.push({ problem: p }));
    listHits.filter(h => !h.strong).forEach(h => items.push({ list: h.list }));
    const n = { formula: 0, method: 0, pattern: 0 };
    sorted.forEach(e => n[e.kind]++);
    const counts = [[n.formula, "formula", "formulas"], [n.method, "method", "methods"], [n.pattern, "pattern", "patterns"],
      [bookHits.length, "book", "books"], [lessonHits.length, "lesson", "lessons"], [papers.length, "contest", "contests"], [probs.length, "problem", "problems"], [listHits.length, "study list", "study lists"]]
      .filter(c => c[0]).map(c => `${c[0]} ${c[0] === 1 ? c[1] : c[2]}`).join(" &middot; ");
    const total = items.length;
    const kindLabel = Object.fromEntries(LIST_KINDS);
    const PAGE = 24;
    const itemHtml = (it, i) => {
      const extra = i >= PAGE ? ` data-page="${Math.floor(i / PAGE)}" hidden` : "";
      if (it.entry) return cardHtml(it.entry, true, queryTokens).replace('<article class="card ', `<article${extra} class="card `);
      if (it.book) {
        // A book lists its first four teaching chapters, then how many more, then its line.
        const b = it.book, chs = b.chapters.filter(c => c.kind !== "reference");
        const rows = chs.slice(0, 4).map(c => `<div class="rs-line"><span class="rs-v">${escapeAttr(c.title)}</span><span class="rs-n">${escapeAttr(c.code)}</span></div>`).join("")
          + (chs.length > 4 ? `<div class="rs-line rs-more-line">+ ${chs.length - 4} more chapter${chs.length > 5 ? "s" : ""}</div>` : "");
        return `<a class="card card-result card-lesson-result" href="#/learn/${b.id}"${extra}>
            <div class="card-head"><h4 class="card-name">${escapeAttr(b.title)}</h4><span class="card-tags"><span class="badge badge-lesson">BOOK</span></span></div>
            <div class="card-meta">${learnCrumb(["Textbooks", b.title])}</div>
            <div class="rs-box">${rows}</div>
            <p class="card-desc">${escapeAttr(capFirst(b.role))}.</p>
            <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
          </a>`;
      }
      if (it.lesson) {
        const x = it.lesson;
        // A chapter lists up to four lessons and how many more; a lesson names its chapter and
        // counts its own problems and its contest exercises.
        let inner;
        if (x.l) {
          const d = learnLessonData(x.c, x.l) || {}, np = (d.exercises || []).length, ne = (d.problems || []).length;   // the data's exercises are our own problems; its problems are the contest Exercises
          inner = `<div class="rs-line"><span class="rs-k">Chapter</span><span class="rs-v">${escapeAttr(x.c.title)}</span></div>`
            + `<div class="rs-line"><span class="rs-k">Problems</span><span class="rs-v">${np}</span></div>`
            + `<div class="rs-line"><span class="rs-k">Exercises</span><span class="rs-v">${ne}</span></div>`;
        } else {
          const ls = x.c.lessons.filter(l => !/^(Introduction|Summary)$/.test(l.title));
          inner = ls.slice(0, 4).map(l => `<div class="rs-line"><span class="rs-v">${escapeAttr(l.title)}</span></div>`).join("")
            + (ls.length > 4 ? `<div class="rs-line rs-more-line">+ ${ls.length - 4} more lesson${ls.length > 5 ? "s" : ""}</div>` : "");
        }
        return `<a class="card card-result card-lesson-result" href="${x.l ? learnHash(x.b, x.c, lessonNum(x.l)) : learnHash(x.b, x.c)}"${extra}>
            <div class="card-head"><h4 class="card-name">${escapeAttr(x.title)}</h4><span class="card-tags"><span class="badge badge-lesson">${x.l ? "LESSON" : "CHAPTER"}</span></span></div>
            <div class="card-meta">${learnCrumb(x.l ? [x.b.title, "Chapter " + x.c.code.slice(1), x.l.code] : [x.b.title, "Chapter " + x.c.code.slice(1)])}</div>
            <div class="rs-box">${inner}</div>
            <p class="card-desc">${escapeAttr(lessonLead(x))}</p>
            <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
          </a>`;
      }
      if (it.contest) {
        const c = it.contest, subj = {};
        c.problems.forEach(p => p.subjects.forEach(sid => { subj[sid] = (subj[sid] || 0) + 1; }));
        const rows = Object.entries(subj).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 4);
        return `<a class="card card-result card-contest-result" href="#/problems/${famSlug(c.fam)}/${c.year}/${paperSlug(c.cname)}"${extra}>
            <div class="card-head"><h4 class="card-name">${escapeAttr(/^\d{4}\b/.test(c.cname) ? c.cname : c.year + " " + c.cname)}</h4><span class="card-tags"><span class="badge badge-contest">CONTEST</span></span></div>
            <div class="card-meta"><span class="level-range">${escapeAttr(c.fam)} &middot; ${c.problems.length} problem${c.problems.length === 1 ? "" : "s"}</span></div>
            ${rows.length ? `<div class="rs-box">${rows.map(([sid, k]) => `<div class="rs-line"><span class="rs-v">${escapeAttr(SUBJECT_LABELS[sid] || sid)}</span><span class="rs-n">${k}</span></div>`).join("")}</div>` : ""}
            <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
          </a>`;
      }
      if (it.problem) {
        const p = it.problem;
        return `<a class="card card-result card-problem-result" href="#/problem/${p.slug}"${extra}>
            <div class="card-head"><h4 class="card-name">${refShort(p.ref)}</h4><span class="card-tags"><span class="badge badge-problem">PROBLEM</span></span></div>
            <div class="card-meta"><span class="level-range">${escapeAttr(p.fam)} &middot; ${p.year}</span></div>
            <div class="rs-box">${[["pattern", "Pattern"], ["method", "Method"], ["formula", "Formulas"]].map(([k, label]) => {
              const ids = p.formulas.filter(id => BY_ID[id] && BY_ID[id].kind === k).slice(0, 3);
              return ids.length ? `<div class="rs-line"><span class="rs-k">${label}</span><span class="rs-v">${ids.map(id => BY_ID[id].formula.name).join(", ")}</span></div>` : "";
            }).join("")}</div>
            ${p.strategy ? `<p class="card-desc">${p.strategy}</p>` : ""}
            <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
          </a>`;
      }
      const l = it.list;
      return `<a class="card card-result card-list-result" href="#/list/${l.id}"${extra}>
          <div class="card-head"><h4 class="card-name">${escapeAttr(l.name)}</h4><span class="card-tags"><span class="badge badge-list">LIST</span></span></div>
          <div class="card-meta"><span class="level-range">${l.builtinSet ? (kindLabel[l.kind] || "Study list") : "Your list"} &middot; ${liveCount(l)} cards</span></div>
          ${(l.sections || []).length ? `<div class="rs-box">${l.sections.slice(0, 4).map(x => `<div class="rs-line"><span class="rs-v">${escapeAttr(x.title || l.name)}</span><span class="rs-n">${x.ids.length}</span></div>`).join("")}${l.sections.length > 4 ? `<div class="rs-line rs-more-line">+ ${l.sections.length - 4} more section${l.sections.length > 5 ? "s" : ""}</div>` : ""}</div>`
            : `<div class="rs-box">${liveIds(l).slice(0, 4).map(id => `<div class="rs-line"><span class="rs-v">${BY_ID[id].formula.name}</span></div>`).join("")}</div>`}
          ${l.blurb ? (l.builtinSet ? `<p class="card-desc">${escapeAttr(l.blurb)}</p>`
            : `<div class="card-desc" data-description-formatted>${listDescriptionHtml(l.blurb)}</div>`) : ""}
          <div class="more-hint">Open ${uiIcon("chevron-right")}</div>
        </a>`;
    };
    const parts = [];
    parts.push(`<p class="results-meta"><strong>${total}</strong> result${total === 1 ? "" : "s"} for &ldquo;<strong>${escapeAttr(state.query.trim())}</strong>&rdquo;${counts ? ` <span class="rm-kinds">${counts}</span>` : ""}${partialNote}</p>`);
    if (!total) {
      parts.push(`<div class="empty-state"><div class="big">${uiIcon("empty")}</div>No matches. Try broader keywords, such as &ldquo;area&rdquo;, &ldquo;mod&rdquo;, &ldquo;roots&rdquo;, or a contest like &ldquo;2024 AIME&rdquo;.</div>`);
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

  // Does this card carry the tag label `L`: one of its topics, one of its keywords, or a
  // curated tag group, matched exactly (a label that only appears inside a longer keyword does
  // not count, which kept "inversion" from collecting "mobius inversion").
  function entryHasTag(entry, L) {
    return entry.tagPhrases.indexOf(L) !== -1 ||
      entry.topics.some(t => t.label === L) ||
      (entry.groupTags || []).indexOf(L) !== -1;
  }
  const tagHash = labels => "#/tag/" + labels.map(encodeURIComponent).join("+");

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
  const advTagSelHtml = l => `<button class="filter-chip active adv-tag-sel" data-adv-tag-remove="${escapeAttr(l)}" aria-label="Remove tag ${escapeAttr(l)}">${escapeAttr(l)} <span class="adv-tag-x">${uiIcon("close")}</span></button>`;
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
      apply.textContent = empty ? "Select tags" : `Show ${n} card${n === 1 ? "" : "s"}`;
    }
  }

  // ---------- Advanced search modal ----------
  let advEl = null;
  let advDraft = null;
  function onAdvKey(e) { if (e.key === "Escape") closeAdvanced(); }
  function closeAdvanced(restore = true) {
    if (!advEl) return;
    const el = advEl;
    advEl = null;
    el.remove();
    releaseModal(el, restore);
    document.removeEventListener("keydown", onAdvKey, true);
  }
  function openAdvanced() {
    if (advEl) { closeAdvanced(); return; }
    // Opened from a tag page, the picker starts from that page's tags.
    const r = getRoute();
    advDraft = { tags: new Set(r.type === "topic" ? r.labels : []) };
    advEl = document.createElement("div");
    advEl.className = "modal-overlay";
    advEl.innerHTML = `
      <div class="modal adv-modal adv-tagmodal" role="dialog" aria-label="Browse formulas by tag">
        <div class="modal-head">
          <h3 tabindex="-1">Browse by Tag</h3>
          <button class="modal-close" aria-label="Close">${uiIcon("close")}</button>
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
    trapModal(advEl, ".modal-head h3");
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
      const labels = [...advDraft.tags];
      state.adv = null;
      state.query = ""; $search.value = "";
      closeAdvanced(false);   // a new page opens: the focus is not sent back to the button
      location.hash = tagHash(labels);
      window.scrollTo({ top: 0 });
    }
  }


  // ---------- Topic view: every formula tagged with a topic, across sections ----------
  // The tag page: every card carrying one tag, or any of several, across formulas, methods and
  // patterns, in the card order chosen in Settings; with several tags, cards matching more of
  // them come first. "Edit tags" reopens the picker with these tags selected.
  function renderTagPage(labels) {
    const order = new Map(browseOrder(ALL.slice()).map((e, i) => [e.formula.id, i]));
    const scored = tagMatches(labels).filter(x => passesFilter(x.entry.formula))
      .sort((a, b) => b.hits - a.hits || order.get(a.entry.formula.id) - order.get(b.entry.formula.id));
    const entries = scored.map(x => x.entry);
    shownIds = entries.map(e => e.formula.id);
    const cap = l => l.charAt(0).toUpperCase() + l.slice(1);
    const many = labels.length > 1;
    const parts = [`
      <div class="back-row"><a class="back-link" href="#" data-history-back>${uiIcon("arrow-left")} Back</a></div>
      <div class="section-header topic-header">
        <div class="book-eyebrow">${many ? "Tags" : "Tag"}</div>
        <h2>${escapeAttr(cap(labels.join(", ")))}</h2>
        <p class="topic-blurb">Every card tagged ${escapeAttr(labels.join(" or "))}, across formulas, methods, and patterns${many ? "; the cards matching the most of these tags come first" : ""}. <button class="adv-link" id="tag-edit">Edit tags</button></p>
      </div>`];
    if (!entries.length) {
      parts.push(`<div class="empty-state"><div class="big">${uiIcon("empty")}</div>No cards carry ${many ? "these tags" : "this tag"} at the current filters.</div>`);
    } else {
      parts.push(`<p class="results-hint"><strong>${entries.length}</strong> card${entries.length === 1 ? "" : "s"}.</p>`);
      parts.push(`<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
    const eb = document.getElementById("tag-edit"); if (eb) eb.addEventListener("click", openAdvanced);
  }

  // A single study list, opened from the Practice page.
  function renderListSurface(route) {
    if (route.type !== "list") { history.replaceState(null, "", "#/learn"); render(); return; }
    $content.innerHTML = `<div class="list-main">${listDetailHtml(route.listId)}</div>`;
    renderMath($content, true);
    if (groupEdit) geApplyFind();
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
            <span class="lar-plus">${uiIcon("plus")}</span>
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
          ${sec.ci != null
            ? (sec.rawNote ? `<p class="list-section-note">${listDescriptionHtml(sec.rawNote)}</p>` : "")
            : sec.looseOf ? `<p class="list-section-note">Cards not in any of your sections yet, new ones included. <button type="button" class="ge-inline" data-group-edit="${escapeAttr(sec.looseOf)}">Edit groups</button> to place them.</p>`
            : sec.note ? `<p class="list-section-note">${sec.note}</p>` : ""}
          ${cards}
        </div>`;
    }).join("");
  }

  function listDetailHtml(listId) {
    const userL = getList(listId);
    const l = userL || BUILTIN_BY_ID[listId];
    if (!l) { location.hash = "#/learn"; return ""; }
    const isBuiltin = !userL;
    const entries = l.ids.map(id => BY_ID[id]).filter(Boolean);
    shownIds = entries.map(e => e.formula.id);
    if (!isBuiltin && groupEdit && groupEdit.listId === l.id) return groupEditorHtml(l);
    const AUTO_MIN = 8;
    // Custom groups (owner, 2026-11-08): sections the reader makes by hand in the group editor.
    // They take precedence over the automatic grouping; Ungroup tucks them away in customOff,
    // so Custom group brings them back.
    const custom = !isBuiltin && Array.isArray(l.customSections) && l.customSections.some(sec => sec.ids.some(id => BY_ID[id] && l.ids.includes(id)));
    const canGroup = !isBuiltin && !custom && entries.length >= AUTO_MIN;
    const canCustom = !isBuiltin && entries.length >= 2;
    const grouped = canGroup && (l.builtin ? state.autoGroup : Array.isArray(l.groupedIds));
    let sections = l.sections, pending = [];
    if (custom) sections = customSectionView(l, shownIds);
    else if (grouped) {
      const snapshot = new Set(l.builtin ? shownIds : l.groupedIds);
      sections = autoSections(shownIds.filter(id => snapshot.has(id)));
      pending = shownIds.filter(id => !snapshot.has(id));
      if (pending.length) sections.push({ title: "New cards", ids: pending });
    }
    const groupAction = pending.length ? "Regroup" : grouped ? (l.builtin ? "Auto grouped" : "Ungroup") : "Auto group";
    const headTools = isBuiltin ? "" : `
      <div class="list-head-tools">
        ${canGroup ? `<button class="list-tool${grouped && !pending.length ? " on" : ""}" data-list-group="${l.id}" ${pending.length ? 'data-regroup title="Group newly added cards"' : `aria-pressed="${grouped}" title="Group the cards into sections automatically"`}>${groupAction}</button>` : ""}
        ${custom ? `<button class="list-tool on" data-group-edit="${l.id}" title="Change the sections you made">Edit groups</button>
          <button class="list-tool" data-group-off="${l.id}" title="Show the cards without sections; Custom group brings your sections back">Ungroup</button>`
          : canCustom ? `<button class="list-tool" data-group-edit="${l.id}" title="Make your own sections and drag cards into them">Custom group</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool" data-list-rename="${l.id}">Rename</button>`}
        <button class="list-tool" data-edit-description>Change description</button>
        <button class="list-tool" data-list-export="${l.id}" title="Save this list as a file">Export</button>
        ${l.builtin && entries.length ? `<button class="list-tool danger" data-list-clear="${l.id}">Clear</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool danger" data-list-delete="${l.id}">Delete list</button>`}
      </div>`;
    const tools = isBuiltin ? "" : `
      <div class="list-add" data-list-add="${l.id}">
        <input type="search" class="list-add-input" placeholder="Search cards to add&hellip;" autocomplete="off" aria-label="Search cards to add to this list">
        <div class="list-add-results" hidden></div>
      </div>`;
    const glyph = isBuiltin ? `<span class="list-ico">${uiIcon("diamond")}</span>` : `<span class="list-emoji">${listGlyph(l)}</span>`;
    const kindName = isBuiltin ? ((LIST_KINDS.find(([k]) => k === l.kind) || [null, "Study list"])[1]) : "Your list";
    return `
      <div class="detail">
        <div class="back-row"><a class="back-link" href="#/learn" data-goto="pr-study">${uiIcon("arrow-left")} Learn</a></div>
        <div class="section-header topic-header">
          <div class="book-eyebrow">Learn &middot; Lists</div>
          <div class="list-detail-head">
            <h2${isBuiltin || l.builtin ? "" : ` data-list-title="${l.id}" title="Click to rename"`}>${escapeAttr(l.name)}</h2>
            ${headTools}
          </div>
          ${!isBuiltin
            ? `<button type="button" class="topic-blurb list-description" data-description-formatted data-description="${escapeAttr(l.id)}" title="Change description">${listDescriptionHtml(l.blurb || "Click to add description")}</button>`
            : l.blurb ? `<p class="topic-blurb">${escapeAttr(l.blurb)}</p>` : ""}
        </div>
        ${tools}
        ${entries.length
          ? (isBuiltin || grouped || custom
              ? listSectionsHtml({ id: l.id, sections })
              : `<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`)
          : `<div class="empty-state"><div class="big">${glyph}</div>This list is empty. Press the &ldquo;+&rdquo; on any card to add it here, or the star to save it for later.</div>`}
      </div>`;
  }

  // ---------- Custom groups: the group editor (owner, 2026-11-08) ----------
  // A list's own sections, made by hand: a sidebar of sections (add, rename, reorder, delete,
  // and the tools), beside the sections themselves with the cards as chips. Cards move by
  // dragging (mouse or pen) onto a section or a section's row in the sidebar, or by selecting
  // them (a click or a tap) and pressing a section under "Move to". Every change is saved at
  // once and can be undone; Done closes the editor.
  // An app-styled confirmation in place of the browser's (owner's standing preference): a modal
  // card with a title, a line, Cancel and the action. Escape, Cancel or a click outside
  // declines; Cancel has the focus, so a stray Enter does nothing harmful. Resolves true or false.
  function appConfirm({ title, text, ok = "OK", danger = false, signal }) {
    return new Promise(resolve => {
      if (signal?.aborted) { resolve(false); return; }
      const d = document.createElement("dialog");
      d.className = "app-confirm";
      d.setAttribute("aria-labelledby", "app-confirm-t");
      d.innerHTML = `<form method="dialog">
          <h3 id="app-confirm-t">${escapeAttr(title)}</h3>
          ${text ? `<p>${escapeAttr(text)}</p>` : ""}
          <div class="app-confirm-actions">
            <button type="submit" value="cancel" class="hp-btn hp-btn-soft">Cancel</button>
            <button type="submit" value="ok" class="hp-btn${danger ? " app-confirm-danger" : ""}">${escapeAttr(ok)}</button>
          </div></form>`;
      document.body.appendChild(d);
      const abort = () => { if (d.open) d.close("cancel"); };
      signal?.addEventListener("abort", abort, { once:true });
      d.addEventListener("close", () => { signal?.removeEventListener("abort", abort); resolve(d.returnValue === "ok" && !signal?.aborted); d.remove(); }, { once: true });
      d.addEventListener("click", e => { if (e.target === d) d.close("cancel"); });
      d.showModal();
      d.querySelector('button[value="cancel"]').focus();
    });
  }
  let groupEdit = null;   // { listId, undo: [snapshots], redo: [snapshots], selected: Set, renaming: index }
  // The reorder grip: six dots.
  const GE_GRIP = `<svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">${[3, 8, 13].map(y => `<circle cx="2.5" cy="${y}" r="1.4"/><circle cx="7.5" cy="${y}" r="1.4"/>`).join("")}</svg>`;
  function customSectionView(l, shown) {
    const inList = new Set(shown), used = new Set();
    const out = (l.customSections || []).map((sec, i) => {
      const ids = sec.ids.filter(id => inList.has(id) && !used.has(id));
      ids.forEach(id => used.add(id));
      return { title: escapeAttr(sec.title || "Untitled section"), rawNote: sec.note || "", ci: i, ids };
    });
    const loose = shown.filter(id => !used.has(id));
    // Cards not placed yet, among them any added after the sections were made, wait here.
    if (loose.length) out.push({ title: "Not in a section", ids: loose, looseOf: l.id });
    return out;
  }
  function geList() { return groupEdit && getList(groupEdit.listId); }
  function geIds(l) { return l.ids.filter(id => BY_ID[id]); }
  function geLoose(l) {
    const used = new Set(l.customSections.flatMap(sec => sec.ids));
    return geIds(l).filter(id => !used.has(id));
  }
  // Undo and Redo keep the list's cards as well as its sections, since cards can be added and removed here.
  function geSnapshot(l) { return JSON.stringify({ ids: l.ids, sections: l.customSections }); }
  function geRestore(l, snap) { const o = JSON.parse(snap); l.ids = o.ids; l.customSections = o.sections; }
  function geChange(fn) {
    const l = geList(); if (!l) return;
    groupEdit.renaming = groupEdit.noting = null;
    const before = geSnapshot(l);
    fn(l);
    // A change that changes nothing (a card dropped where it was) leaves no Undo step.
    if (geSnapshot(l) !== before) {
      groupEdit.undo.push(before);
      groupEdit.redo = [];
      if (groupEdit.undo.length > 60) groupEdit.undo.shift();
      saveLists();
    }
    geRefresh();
  }
  function openGroupEditor(listId) {
    const l = getList(listId); if (!l) return;
    if (!Array.isArray(l.customSections) || !l.customSections.length) {
      const ids = geIds(l);
      let seed = Array.isArray(l.customOff) && l.customOff.length ? l.customOff : null;
      // Starting while the list is auto-grouped keeps those sections as the first draft.
      const auto = l.builtin ? state.autoGroup && ids.length >= 8 : Array.isArray(l.groupedIds);
      if (!seed && auto) seed = autoSections(ids).filter(sec => sec.title && sec.title !== "Also in this list")
        .map(sec => ({ title: sec.title, note: "", ids: sec.ids.slice() }));
      l.customSections = seed ? JSON.parse(JSON.stringify(seed)) : [];
      delete l.customOff;
      saveLists();
    }
    groupEdit = { listId, undo: [], redo: [], selected: new Set(), renaming: null, find: "", findAt: -1 };
    render();
    window.scrollTo({ top: 0 });
  }
  // Closing drops empty untitled sections; a list left with no card in any section is ungrouped.
  function geTidy(l) {
    if (!l || !Array.isArray(l.customSections)) return;
    l.customSections = l.customSections.filter(sec => sec.ids.length || (sec.title || "").trim());
    if (!l.customSections.some(sec => sec.ids.some(x => l.ids.includes(x)))) delete l.customSections;
    else if (!l.builtin) delete l.groupedIds;
    saveLists();
  }
  function closeGroupEditor() {
    const l = geList();
    groupEdit = null;
    geTidy(l);
    render();
  }
  function geChipHtml(id, sel) {
    const e = BY_ID[id]; if (!e) return "";
    const kind = kindOf(e.formula);
    return `<button type="button" class="ge-chip${sel.has(id) ? " is-sel" : ""}" data-ge-chip="${escapeAttr(id)}" aria-pressed="${sel.has(id)}">
        <span class="ge-chip-name">${e.formula.name}</span><span class="ge-chip-kind ge-k-${kind}">${kind}</span></button>`;
  }
  // Finding and adding cards (owner, 2026-11-08). One box: the list's cards that match are
  // outlined and the rest fade, Enter steps through them, and cards that are not in the list yet
  // are offered below it; adding one puts it under "Not in a section", selected, ready to move.
  function geFindWords() { return (groupEdit.find || "").toLowerCase().split(/\s+/).filter(Boolean); }
  function geFindMatches(l) {
    const words = geFindWords();
    if (!words.length) return [];
    return [...geLoose(l), ...l.customSections.flatMap(sec => sec.ids)].filter(id => {
      const e = BY_ID[id];
      if (!e || !l.ids.includes(id)) return false;
      // The name as shown (math marks dropped), so what is outlined is what you can see; a keyword
      // counts only when it is the whole query ("crt" finds the Chinese Remainder Theorem).
      const name = e.nameLower + " " + e.nameLower.replace(/[$\\{}^_]/g, "");
      const q = words.join(" ");
      return words.every(w => name.includes(w)) || (e.formula.keywords || []).some(k => k.toLowerCase() === q);
    });
  }
  function geApplyFind() {
    const l = geList(), box = $content.querySelector(".ge-find");
    if (!l || !box) return;
    const q = (groupEdit.find || "").trim(), matches = geFindMatches(l), set = new Set(matches);
    $content.querySelectorAll(".ge [data-ge-chip]").forEach(c => {
      const hit = set.has(c.dataset.geChip);
      c.classList.toggle("is-match", !!q && hit);
      c.classList.toggle("is-dim", !!q && !hit);
      c.classList.toggle("is-current", !!q && matches[groupEdit.findAt] === c.dataset.geChip);
    });
    const status = box.querySelector(".ge-find-status");
    status.innerHTML = !q ? "" : matches.length
      ? `<span>${matches.length} in this list${matches.length > 1 ? " &middot; Enter steps through them" : ""}</span><button type="button" class="ge-link" data-ge-act="select-matches">Select ${matches.length > 1 ? "these" : "it"}</button><button type="button" class="ge-link" data-ge-act="find-clear">Clear</button>`
      : `<span>None in this list</span><button type="button" class="ge-link" data-ge-act="find-clear">Clear</button>`;
    const res = box.querySelector(".ge-add-results");
    const inList = new Set(l.ids);
    const hits = q ? (searchFormulas(q).results || []).filter(e => !inList.has(e.formula.id)).slice(0, 4) : [];
    res.hidden = !hits.length;
    res.innerHTML = hits.length ? `<div class="ge-add-h">Add to this list</div>` + hits.map(e => `<button type="button" class="list-add-row" data-ge-add="${escapeAttr(e.formula.id)}">
        <span class="lar-plus">${uiIcon("plus")}</span><span class="lar-name">${e.formula.name}</span><span class="lar-crumb">${escapeAttr(e.section.title)}</span></button>`).join("") : "";
    if (hits.length) renderMath(box);
  }
  function geAddCard(id) {
    if (!BY_ID[id]) return;
    groupEdit.selected.clear();
    groupEdit.selected.add(id);
    geChange(l => { if (!l.ids.includes(id)) l.ids.push(id); });
    const chip = $content.querySelector(`[data-ge-chip="${CSS.escape(id)}"]`);
    if (chip) chip.classList.add("is-new");
    const fi = $content.querySelector(".ge-find-input");
    if (fi) { fi.focus({ preventScroll: true }); fi.setSelectionRange(fi.value.length, fi.value.length); }
  }
  document.addEventListener("input", e => {
    if (!groupEdit || !e.target.classList || !e.target.classList.contains("ge-find-input")) return;
    groupEdit.find = e.target.value;
    groupEdit.findAt = -1;
    geApplyFind();
  });
  document.addEventListener("keydown", e => {
    const t = e.target;
    if (!groupEdit || !t.classList || !t.classList.contains("ge-find-input")) return;
    const l = geList(); if (!l) return;
    if (e.key === "Escape") {
      e.preventDefault(); e.stopPropagation();
      if (t.value) { groupEdit.find = ""; groupEdit.findAt = -1; t.value = ""; geApplyFind(); } else t.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const matches = geFindMatches(l);
      if (matches.length) {
        groupEdit.findAt = (groupEdit.findAt + 1) % matches.length;
        geApplyFind();
        const c = $content.querySelector(`[data-ge-chip="${CSS.escape(matches[groupEdit.findAt])}"]`);
        if (c) c.scrollIntoView({ block: "center", behavior: window.AppAccessibility.scrollBehavior() });
      } else {
        // Nothing in the list matches: Enter adds the first card offered.
        const first = $content.querySelector(".ge-add-results [data-ge-add]");
        if (first) geAddCard(first.dataset.geAdd);
      }
    } else if (e.key === "ArrowDown") {
      const first = $content.querySelector(".ge-add-results [data-ge-add]");
      if (first) { e.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener("keydown", e => {
    const row = e.target.closest && e.target.closest(".ge-add-results [data-ge-add]");
    if (!row || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    e.preventDefault();
    const sib = e.key === "ArrowDown" ? row.nextElementSibling : row.previousElementSibling;
    if (sib && sib.matches("[data-ge-add]")) sib.focus();
    else if (e.key === "ArrowUp") $content.querySelector(".ge-find-input").focus();
  });
  function geZoneHtml(ids, key, sel) {
    return `<div class="ge-zone" data-ge-zone="${key}">${ids.length ? ids.map(id => geChipHtml(id, sel)).join("")
      : `<p class="ge-empty">${key === "loose" ? "Every card is in a section." : "Drag cards here, or select cards and press this section under Move to."}</p>`}</div>`;
  }
  function groupEditorHtml(l) {
    const sel = groupEdit.selected, secs = l.customSections, loose = geLoose(l);
    const inList = new Set(geIds(l));
    const ids = sec => sec.ids.filter(id => inList.has(id));
    // A button that would change nothing is shown disabled (owner, 2026-11-08).
    const nameOf = id => BY_ID[id] ? BY_ID[id].nameLower : id;
    const sorted = secs.every(sec => ids(sec).every((id, k, a) => !k || nameOf(a[k - 1]).localeCompare(nameOf(id)) <= 0));
    const autoNow = JSON.stringify(autoSections(geIds(l)).filter(sec => sec.title && sec.title !== "Also in this list").map(sec => [sec.title, sec.ids]));
    const autoSame = autoNow === JSON.stringify(secs.map(sec => [sec.title, ids(sec)]));
    const selIn = new Set([...sel].filter(id => secs.some(sec => sec.ids.includes(id))));
    const off = cond => cond ? " disabled" : "";
    const renameHere = (i, where) => groupEdit.renaming === i && (groupEdit.renameWhere || "side") === where;
    const rows = secs.map((sec, i) => renameHere(i, "side")
      ? `<div class="ge-row is-renaming"><input class="ge-rename" data-ge-rename="${i}" value="${escapeAttr(sec.title || "")}" aria-label="Section name" placeholder="Section name" maxlength="80"></div>`
      : `<div class="ge-row" data-ge-row="${i}">
          <button type="button" class="ge-row-name" data-ge-act="rename" data-i="${i}" title="Rename">${escapeAttr(sec.title || "Untitled section")}</button>
          <span class="ge-row-n">${ids(sec).length}</span>
          <span class="ge-row-tools">
            <button type="button" class="ge-ico ge-del" data-ge-act="delete" data-i="${i}" aria-label="Delete section" title="Delete section">${uiIcon("close")}</button>
            ${secs.length > 1 ? `<button type="button" class="ge-ico ge-handle" data-ge-handle="${i}" aria-label="Reorder ${escapeAttr(sec.title || "Untitled section")}: drag, or press the up and down arrows" title="Drag to reorder">${GE_GRIP}</button>` : ""}
          </span>
        </div>`).join("");
    const moveBar = sel.size ? `<div class="ge-movebar" role="region" aria-label="Move selected cards">
        <div class="ge-move-top"><span class="ge-move-n">${sel.size} selected</span><span class="ge-move-k">Move to</span>
          <div class="ge-move-pills">${secs.map((sec, i) => `<button type="button" class="ge-pill" data-ge-act="moveto" data-i="${i}" title="${escapeAttr(sec.title || "Untitled section")}"${off([...sel].every(id => sec.ids.includes(id)))}>${escapeAttr(sec.title || "Untitled section")}</button>`).join("")}</div></div>
        <div class="ge-move-actions">
          <button type="button" class="ge-pill ge-pill-new" data-ge-act="moveto-new" data-where="main">+ New section</button>
          <button type="button" class="ge-pill ge-pill-soft" data-ge-act="moveto-loose"${off(!selIn.size)}>Out of sections</button>
          <button type="button" class="ge-pill ge-pill-danger" data-ge-act="remove" title="Take the selected cards off this list (Undo brings them back)">Remove from list</button>
          <button type="button" class="ge-link" data-ge-act="deselect">Clear selection</button>
        </div>
      </div>` : "";
    return `<div class="ge" data-ge-list="${escapeAttr(l.id)}">
      <div class="back-row ge-back-row"><a class="back-link" href="#/list/${escapeAttr(l.id)}" data-ge-act="done">${uiIcon("arrow-left")} Back to list</a>
        <a class="back-link" href="#/learn" data-goto="pr-study">${uiIcon("arrow-left")} Learn</a></div>
      <div class="ge-head">
        <div><div class="book-eyebrow">Learn &middot; Lists &middot; Custom groups</div><h2${l.builtin ? "" : ` data-list-title="${escapeAttr(l.id)}" title="Click to rename"`}>${escapeAttr(l.name)}</h2></div>
        <button type="button" class="hp-btn ge-done" data-ge-act="done" title="Save your sections and close the editor">Save</button>
      </div>
      <div class="ge-body">
        <aside class="ge-side" aria-label="Sections">
          <div class="ge-side-h">Sections <span>${secs.length}</span></div>
          <div class="ge-rows">${rows || `<p class="ge-side-empty">No sections yet.</p>`}</div>
          <button type="button" class="ge-add" data-ge-act="new">+ New section</button>
          <div class="ge-side-h ge-tools-h">Tools</div>
          <div class="ge-undo-row">
            <button type="button" class="ge-tool" data-ge-act="undo" ${groupEdit.undo.length ? "" : "disabled"}>Undo</button>
            <button type="button" class="ge-tool" data-ge-act="redo" ${groupEdit.redo.length ? "" : "disabled"}>Redo</button>
          </div>
          <button type="button" class="ge-tool" data-ge-act="select-loose"${off(!loose.length || loose.every(id => sel.has(id)))}>Select the cards not in a section</button>
          <button type="button" class="ge-tool" data-ge-act="auto"${off(geIds(l).length < 2 || autoSame)}>Start from the automatic groups</button>
          <button type="button" class="ge-tool" data-ge-act="sort"${off(!secs.length || sorted)}>Sort each section A&ndash;Z</button>
          <button type="button" class="ge-tool" data-ge-act="drop-empty" ${secs.some(sec => !ids(sec).length) ? "" : "disabled"}>Remove empty sections</button>
          <button type="button" class="ge-tool ge-danger" data-ge-act="clear" ${secs.length ? "" : "disabled"}>Remove every section</button>
        </aside>
        <div class="ge-main">
          ${moveBar}
          <div class="ge-find">
            <input type="search" class="ge-find-input" placeholder="Find a card in this list, or add more cards&hellip;" value="${escapeAttr(groupEdit.find || "")}" aria-label="Find a card in this list, or add more cards" autocomplete="off" spellcheck="false">
            <div class="ge-find-status" role="status"></div>
            <div class="ge-add-results" hidden></div>
          </div>
          <section class="ge-sec ge-loose">
            <h3 class="ge-sec-h">Not in a section <span class="ge-sec-n">${loose.length}</span></h3>
            ${geZoneHtml(loose, "loose", sel)}
          </section>
          ${secs.map((sec, i) => `<section class="ge-sec" id="ge-sec-${i}">
            <h3 class="ge-sec-h">${renameHere(i, "main")
              ? `<input class="ge-rename ge-rename-main" data-ge-rename="${i}" value="${escapeAttr(sec.title || "")}" aria-label="Section name" placeholder="Section name" maxlength="80" size="${Math.max(8, (sec.title || "").length + 1)}">`
              : `<button type="button" class="ge-sec-name" data-ge-act="rename" data-where="main" data-i="${i}" title="Click to rename">${escapeAttr(sec.title || "Untitled section")}</button>`} <span class="ge-sec-n">${ids(sec).length}</span></h3>
            ${(sec.note || "").trim() || groupEdit.noting === i
              ? (groupEdit.noting === i
                ? `<textarea class="ge-note-input" data-ge-note="${i}" rows="1" maxlength="300" placeholder="Describe this section. Shift+Enter adds a line.">${escapeAttr(sec.note || "")}</textarea>`
                : `<button type="button" class="ge-note" data-ge-act="note" data-i="${i}" title="Change the description">${listDescriptionHtml(sec.note)}</button>`)
              : `<button type="button" class="ge-link ge-add-note" data-ge-act="note" data-i="${i}">+ Add a description</button>`}
            ${geZoneHtml(ids(sec), String(i), sel)}
          </section>`).join("")}
          <button type="button" class="ge-add ge-add-main" data-ge-act="new" data-where="main">+ New section</button>
        </div>
      </div>
    </div>`;
  }
  function geRefresh(focusSel) {
    const old = $content.querySelector(".ge"), l = geList();
    if (!old || !l) { render(); return; }
    const y = window.scrollY;
    const findHad = document.activeElement && document.activeElement.classList.contains("ge-find-input");
    old.outerHTML = groupEditorHtml(l);
    const box = $content.querySelector(".ge");
    geApplyFind();
    if (findHad && !focusSel) { const fi = box.querySelector(".ge-find-input"); fi.focus({ preventScroll: true }); fi.setSelectionRange(fi.value.length, fi.value.length); }
    renderMath(box.parentElement);   // the renderer looks inside its container, so pass the editor's parent
    window.scrollTo({ top: y });
    fitGeSide();
    const f = focusSel && box.querySelector(focusSel);
    if (f) {
      f.focus();
      if (f.select) {
        f.select();
        // Opened while a button is held: the release would select only part of the text, so
        // select it all again once the button comes up (owner, 2026-11-08).
        if (geDrag.buttons) document.addEventListener("pointerup", () => setTimeout(() => { if (document.activeElement === f) f.select(); }, 0), { capture: true, once: true });
      }
    }
  }
  // Move cards (in the order they show, when several) into a section before a given card (at
  // the end when none), or out of every section.
  function geMove(l, moving, target, beforeId) {
    const shown = [...geLoose(l), ...l.customSections.flatMap(sec => sec.ids)];
    moving = moving.slice().sort((a, b) => shown.indexOf(a) - shown.indexOf(b));
    const set = new Set(moving);
    l.customSections.forEach(sec => { sec.ids = sec.ids.filter(id => !set.has(id)); });
    if (target === "loose") return;
    const ids = l.customSections[target].ids;
    const at = beforeId != null && !set.has(beforeId) ? ids.indexOf(beforeId) : -1;
    ids.splice(at < 0 ? ids.length : at, 0, ...moving);
  }
  function geNewSection(l, ids) {
    const used = new Set(l.customSections.map(sec => sec.title));
    let n = l.customSections.length + 1, title = "Section " + n;
    while (used.has(title)) title = "Section " + (++n);
    l.customSections.push({ title, note: "", ids: [] });
    const i = l.customSections.length - 1;
    if (ids && ids.length) geMove(l, ids, i);
    groupEdit.renaming = i;
    return i;
  }
  function geAction(act, i) {
    const l = geList(); if (!l) return;
    const sel = groupEdit.selected;
    switch (act) {
      case "done": closeGroupEditor(); return;
      case "rename": groupEdit.renaming = i; geRefresh(`[data-ge-rename="${i}"]`); return;
      case "note": groupEdit.noting = i; geRefresh(`[data-ge-note="${i}"]`); return;
      case "deselect": sel.clear(); geRefresh(); return;
      case "select-loose": geLoose(l).forEach(id => sel.add(id)); geRefresh(); return;
      case "undo": case "redo": {
        const [from, to] = act === "undo" ? [groupEdit.undo, groupEdit.redo] : [groupEdit.redo, groupEdit.undo];
        const snap = from.pop();
        if (snap == null) return;
        to.push(geSnapshot(l));
        geRestore(l, snap);
        saveLists();
        groupEdit.renaming = groupEdit.noting = null;
        geRefresh(); return;
      }
      case "select-all": geIds(l).forEach(id => sel.add(id)); geRefresh(); return;
      case "select-matches": sel.clear(); geFindMatches(l).forEach(id => sel.add(id)); geRefresh(); return;
      case "find-clear": groupEdit.find = ""; groupEdit.findAt = -1; geRefresh(".ge-find-input"); return;
      case "remove": {
        const gone = new Set(sel);
        sel.clear();
        geChange(l2 => {
          l2.ids = l2.ids.filter(id => !gone.has(id));
          l2.customSections.forEach(sec => { sec.ids = sec.ids.filter(id => !gone.has(id)); });
        });
        return;
      }
      case "new": geChange(l2 => geNewSection(l2)); geRefresh(`[data-ge-rename="${l.customSections.length - 1}"]`); return;
      case "moveto-new": geChange(l2 => geNewSection(l2, [...sel])); sel.clear(); geRefresh(`[data-ge-rename="${l.customSections.length - 1}"]`); return;
      case "moveto": geChange(l2 => geMove(l2, [...sel], i)); sel.clear(); geRefresh(); return;
      case "moveto-loose": geChange(l2 => geMove(l2, [...sel], "loose")); sel.clear(); geRefresh(); return;
      case "up": case "down": {
        const j = act === "up" ? i - 1 : i + 1;
        if (j < 0 || j >= l.customSections.length) return;
        geChange(l2 => { const s = l2.customSections; [s[i], s[j]] = [s[j], s[i]]; });
        geRefresh(`[data-ge-handle="${j}"]`); return;
      }
      case "delete": geChange(l2 => l2.customSections.splice(i, 1)); return;
      case "sort": geChange(l2 => l2.customSections.forEach(sec => sec.ids.sort((a, b) =>
        (BY_ID[a] ? BY_ID[a].nameLower : a).localeCompare(BY_ID[b] ? BY_ID[b].nameLower : b)))); return;
      case "drop-empty": {
        const live = new Set(geIds(l));
        geChange(l2 => { l2.customSections = l2.customSections.filter(sec => sec.ids.some(id => live.has(id))); }); return;
      }
      case "clear": geChange(l2 => { l2.customSections = []; }); return;
      case "auto": geChange(l2 => {
        l2.customSections = autoSections(geIds(l2)).filter(sec => sec.title && sec.title !== "Also in this list")
          .map(sec => ({ title: sec.title, note: "", ids: sec.ids.slice() }));
      }); return;
    }
  }
  function geCommitRename(input, cancel) {
    const l = geList(), i = +input.dataset.geRename;
    if (!groupEdit || groupEdit.renaming !== i) return;
    const v = input.value.trim();
    groupEdit.renaming = null;
    if (!cancel && l && l.customSections[i] && v && v !== l.customSections[i].title) geChange(l2 => { l2.customSections[i].title = v; });
    else geRefresh();
  }
  function geCommitNote(input, cancel) {
    const l = geList(), i = +input.dataset.geNote;
    if (!groupEdit || groupEdit.noting !== i) return;
    const v = cleanDescription(input.value);
    groupEdit.noting = null;
    if (!cancel && l && l.customSections[i] && v !== (l.customSections[i].note || "")) geChange(l2 => { l2.customSections[i].note = v; });
    else geRefresh();
  }
  document.addEventListener("click", e => {
    if (!groupEdit) {
      const open = e.target.closest("[data-group-edit]");
      if (open) { openGroupEditor(open.dataset.groupEdit); return; }
      const off = e.target.closest("[data-group-off]");
      if (off) {
        const l = getList(off.dataset.groupOff);
        if (l && Array.isArray(l.customSections)) {
          appConfirm({ title: "Ungroup this list?", text: "The cards will be shown without sections. Your sections are saved, so pressing Custom group again brings them back.", ok: "Ungroup" })
            .then(yes => { if (yes && Array.isArray(l.customSections)) { l.customOff = l.customSections; delete l.customSections; saveLists(); render(); } });
        }
      }
      return;
    }
    if (!e.target.closest(".ge")) return;
    if (geDrag.suppressClick) { geDrag.suppressClick = false; e.preventDefault(); return; }
    const add = e.target.closest("[data-ge-add]");
    if (add) { e.preventDefault(); geAddCard(add.dataset.geAdd); return; }
    const b = e.target.closest("[data-ge-act]");
    if (b) {
      e.preventDefault();
      if (/^(rename|new|moveto-new)$/.test(b.dataset.geAct)) groupEdit.renameWhere = b.dataset.where || "side";
      geAction(b.dataset.geAct, b.dataset.i == null ? null : +b.dataset.i);
      return;
    }
    const chip = e.target.closest("[data-ge-chip]");
    if (chip) {
      // The usual selection rules: a click selects the card alone, Ctrl or Cmd adds or removes it,
      // Shift selects the run from the last card clicked. A tap, or Enter or Space on a focused
      // card, adds or removes it, since a phone and a keyboard have no modifier to hold.
      const id = chip.dataset.geChip, sel = groupEdit.selected;
      const order = [...$content.querySelectorAll(".ge [data-ge-chip]")].map(c => c.dataset.geChip);
      if (e.shiftKey && groupEdit.anchor && order.includes(groupEdit.anchor)) {
        const [a, z] = [order.indexOf(groupEdit.anchor), order.indexOf(id)].sort((x, y) => x - y);
        if (!(e.ctrlKey || e.metaKey)) sel.clear();
        order.slice(a, z + 1).forEach(x => sel.add(x));
      } else {
        if (e.ctrlKey || e.metaKey || e.detail === 0 || geDrag.lastPointer === "touch") { if (sel.has(id)) sel.delete(id); else sel.add(id); }
        else if (sel.size === 1 && sel.has(id)) sel.clear();
        else { sel.clear(); sel.add(id); }
        groupEdit.anchor = id;
      }
      geRefresh(`[data-ge-chip="${CSS.escape(id)}"]`);
      return;
    }
    // A click on empty space clears the selection.
    if (groupEdit.selected.size && !e.target.closest("button, a, input, textarea, .ge-movebar, [data-list-title]")) {
      groupEdit.selected.clear();
      geRefresh();
    }
  });
  document.addEventListener("keydown", e => {
    const r = e.target.closest && e.target.closest("[data-ge-rename], [data-ge-note]");
    const inEditor = groupEdit && $content.querySelector(".ge") && !(e.target.closest && e.target.closest("input, textarea, [contenteditable='true']"));
    // Escape anywhere else in the editor closes it, like Done.
    if (!r && e.key === "Escape" && inEditor) {
      if (groupEdit.selected.size) { groupEdit.selected.clear(); geRefresh(); } else closeGroupEditor();
      return;
    }
    // The grip reorders by keyboard too: up and down arrows move the section.
    const grip = e.target.closest && e.target.closest("[data-ge-handle]");
    if (grip && inEditor && (e.key === "ArrowUp" || e.key === "ArrowDown") && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault(); geAction(e.key === "ArrowUp" ? "up" : "down", +grip.dataset.geHandle); return;
    }
    // Keyboard shortcuts (owner, 2026-11-08). Text boxes keep the browser's own undo.
    if (!r && inEditor && !e.altKey) {
      const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
      let act = null;
      if (mod && k === "z") act = e.shiftKey ? "redo" : "undo";
      else if (mod && !e.shiftKey && k === "y") act = "redo";
      else if (mod && !e.shiftKey && k === "a") act = "select-all";
      else if (!mod && (e.key === "Delete" || e.key === "Backspace") && groupEdit.selected.size) act = "moveto-loose";
      if (act) { e.preventDefault(); geAction(act, null); return; }
    }
    if (!r) return;
    if (e.key === "Escape") { e.preventDefault(); r.dataset.cancel = "1"; r.blur(); }
    else if (e.key === "Enter" && !(r.dataset.geNote != null && e.shiftKey)) { e.preventDefault(); r.blur(); }
  });
  document.addEventListener("focusin", e => {
    const t = e.target;
    if (t.matches && t.matches(".ge-note-input")) { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }
  });
  // The in-place boxes grow with what is typed, like the list title.
  document.addEventListener("input", e => {
    const t = e.target;
    if (t.matches && t.matches(".ge-rename-main")) t.size = Math.max(8, t.value.length + 1);
    if (t.matches && t.matches(".ge-note-input")) { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }
  });
  document.addEventListener("focusout", e => {
    const t = e.target;
    if (!t || !t.dataset) return;
    if (t.dataset.geRename != null) geCommitRename(t, t.dataset.cancel === "1");
    else if (t.dataset.geNote != null) geCommitNote(t, t.dataset.cancel === "1");
  });
  // A sideways swipe over the Move to bar scrolls its sections and never reaches the browser,
  // which would otherwise take it as Back on a Mac trackpad (owner, 2026-11-08).
  document.addEventListener("wheel", e => {
    const bar = e.target.closest && e.target.closest(".ge-movebar");
    if (!bar || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    const pills = bar.querySelector(".ge-move-pills");
    if (pills) pills.scrollLeft += e.deltaX;
  }, { passive: false });
  // ---- Pointer interactions: dragging cards, reordering sections, selecting with a box ----
  const geDrag = { on: false, suppressClick: false, lastPointer: "mouse" };
  document.addEventListener("pointerdown", e => { geDrag.lastPointer = e.pointerType; geDrag.buttons = e.buttons; }, true);
  document.addEventListener("pointerup", e => { geDrag.buttons = e.buttons; }, true);
  // FLIP: note where every chip and row is, make a change, then slide each from its old place
  // to its new one, so the page is seen to make room rather than jump.
  function geFlip(change) {
    const els = [...$content.querySelectorAll(".ge [data-ge-chip], .ge-placeholder, .ge-rows [data-ge-row]")];
    const first = new Map(els.map(el => [el, el.getBoundingClientRect()]));
    change();
    for (const [el, a] of first) {
      if (!el.isConnected || el.offsetParent === null) continue;
      const b = el.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) continue;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.getBoundingClientRect();
      el.style.transition = "transform 170ms cubic-bezier(.2,.8,.2,1)";
      el.style.transform = "";
    }
  }
  // Where a chip sits in the layout, ignoring any slide still under way.
  function geLayoutRect(el) {
    const z = el.offsetParent.getBoundingClientRect();
    return { left: z.left + el.offsetLeft, top: z.top + el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
  }
  function geScroller() {
    const st = { y: 0, raf: 0 };
    const loop = () => {
      // Near an edge the page scrolls, faster the closer the pointer is (owner, 2026-11-08: up to
      // about 2,000 px a second, so dragging a card down a long list does not crawl).
      const edge = 90, y = st.y;
      const pull = y < edge ? -(edge - y) / edge : y > innerHeight - edge ? (y - innerHeight + edge) / edge : 0;
      const v = pull ? Math.sign(pull) * (6 + 30 * Math.min(1, Math.abs(pull))) : 0;
      if (v) window.scrollBy({ top: v, behavior: "instant" });   // instant: the page's smooth scrolling would restart each frame and crawl
      st.raf = requestAnimationFrame(loop);
    };
    st.start = () => { st.raf = requestAnimationFrame(loop); };
    st.stop = () => cancelAnimationFrame(st.raf);
    return st;
  }
  function geEndGesture() {
    geDrag.suppressClick = true;
    setTimeout(() => { geDrag.suppressClick = false; }, 0);
  }

  // Reordering sections by their grip, with mouse, pen or touch (owner, 2026-11-08): the row
  // follows the pointer the whole way, and each row it passes slides aside at once to show the
  // slot it would take. The arrow keys on a focused grip move it a place at a time.
  document.addEventListener("pointerdown", e => {
    if (!groupEdit || (e.pointerType === "mouse" && e.button !== 0)) return;
    const grip = e.target.closest("[data-ge-handle]");
    if (!grip || !grip.closest(".ge")) return;
    e.preventDefault();
    const rows = [...$content.querySelectorAll(".ge-rows [data-ge-row]")];
    const from = +grip.dataset.geHandle, row = rows[from];
    const step = rows.length > 1 ? rows[1].offsetTop - rows[0].offsetTop : row.offsetHeight;
    const centers = rows.map(r => r.offsetTop + r.offsetHeight / 2);
    const startY = e.clientY;
    let moved = false, to = from;
    const move = ev => {
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dy) < 3) return;
      if (!moved) {
        moved = true;
        row.classList.add("is-lifted");
        document.body.classList.add("ge-dragging");
        rows.forEach(r => { if (r !== row) r.style.transition = "transform 150ms cubic-bezier(.2,.8,.2,1)"; });
      }
      // Move the row with the pointer, letting it run half a row past either end of the list.
      const lo = -(from + 0.5) * step, hi = (rows.length - 1 - from + 0.5) * step;
      const y = Math.max(lo, Math.min(hi, dy));
      row.style.transform = `translateY(${y}px)`;
      const c = centers[from] + y;
      to = from;
      rows.forEach((r, k) => {
        let shift = 0;
        // A row gives way once the dragged row is halfway onto it.
        if (k > from && c > centers[k] - step / 2) { shift = -step; to++; }
        else if (k < from && c < centers[k] + step / 2) { shift = step; to--; }
        if (r !== row) r.style.transform = shift ? `translateY(${shift}px)` : "";
      });
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      document.body.classList.remove("ge-dragging");
      geEndGesture();
      if (!moved) { grip.focus(); return; }
      // Settle into the slot, then save the new order.
      row.style.transition = "transform 120ms ease";
      row.style.transform = `translateY(${(to - from) * step}px)`;
      setTimeout(() => {
        if (to !== from) geChange(l => { const [sec] = l.customSections.splice(from, 1); l.customSections.splice(to, 0, sec); });
        else geRefresh();
      }, 125);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  });

  // Dragging cards (mouse and pen; on touch a press scrolls the page and a tap selects). The
  // dragged cards leave their places, a gap of their size opens where they would land and the
  // other cards slide to make room; the card itself follows the pointer.
  document.addEventListener("pointerdown", e => {
    if (!groupEdit || e.button !== 0 || e.pointerType === "touch") return;
    const chip = e.target.closest("[data-ge-chip]");
    if (!chip || !chip.closest(".ge")) return;
    const id = chip.dataset.geChip;
    const moving = groupEdit.selected.has(id) ? [...groupEdit.selected] : [id];
    const sx = e.clientX, sy = e.clientY, scroll = geScroller();
    // Where on the card it was grabbed: the floating copy keeps that point under the pointer.
    const grab = chip.getBoundingClientRect(), ox = sx - grab.left, oy = sy - grab.top;
    let ghost = null, holder = null, target = null;
    const movingEls = () => [...$content.querySelectorAll(".ge [data-ge-chip]")].filter(c => moving.includes(c.dataset.geChip));
    const findTarget = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return null;
      const row = el.closest("[data-ge-row]");
      if (row) return { key: +row.dataset.geRow, row };
      const sec = el.closest(".ge-sec");
      const zone = sec ? sec.querySelector("[data-ge-zone]") : el.closest("[data-ge-zone]");
      if (!zone) return null;
      const key = zone.dataset.geZone === "loose" ? "loose" : +zone.dataset.geZone;
      if (key === "loose") return { key, zone, before: null };
      const chips = [...zone.querySelectorAll("[data-ge-chip]")].filter(c => !moving.includes(c.dataset.geChip));
      let before = null;
      for (const c of chips) {
        const r = geLayoutRect(c);
        if (y < r.top || (y <= r.top + r.height && x < r.left + r.width / 2)) { before = c; break; }
      }
      return { key, zone, before };
    };
    const place = t => {
      $content.querySelectorAll(".ge-over").forEach(x => x.classList.remove("ge-over"));
      if (t && t.row) t.row.classList.add("ge-over");
      if (t && t.zone) t.zone.classList.add("ge-over");
      // A gap only where the order matters: not in "Not in a section", nor in a section with no
      // other cards, where the highlight alone says where the cards will go (owner, 2026-11-08).
      const want = t && t.zone && t.key !== "loose"
        && [...t.zone.querySelectorAll("[data-ge-chip]")].some(c => !moving.includes(c.dataset.geChip)) ? t : null;
      if (!want && !holder.isConnected) return;
      if (want && holder.parentElement === want.zone && holder.nextElementSibling === want.before) return;
      geFlip(() => {
        if (!want) holder.remove();
        else want.zone.insertBefore(holder, want.before);
        $content.querySelectorAll(".ge-zone").forEach(z => {
          const empty = z.querySelector(".ge-empty");
          if (empty) empty.hidden = !!z.querySelector(".ge-placeholder");
        });
      });
    };
    const move = ev => {
      scroll.y = ev.clientY;
      if (!geDrag.on) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
        geDrag.on = true;
        document.body.classList.add("ge-dragging");
        // The floating copy is the card itself, at its own size, held where it was grabbed.
        ghost = chip.cloneNode(true);
        ghost.className = "ge-chip ge-ghost-chip";
        ghost.removeAttribute("data-ge-chip");
        ghost.style.width = grab.width + "px";
        if (moving.length > 1) ghost.insertAdjacentHTML("beforeend", `<span class="ge-ghost-n">${moving.length}</span>`);
        document.body.appendChild(ghost);
        holder = document.createElement("span");
        holder.className = "ge-placeholder";
        holder.style.width = (moving.length > 1 ? 150 : chip.offsetWidth) + "px";
        holder.style.height = chip.offsetHeight + "px";
        geFlip(() => {
          movingEls().forEach(c => { c.hidden = true; });
          chip.parentElement.insertBefore(holder, chip.nextElementSibling);
        });
        scroll.start();
      }
      ghost.style.transform = `translate(${ev.clientX - ox}px, ${ev.clientY - oy}px)`;
      target = findTarget(ev.clientX, ev.clientY);
      place(target);
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      if (!geDrag.on) return;
      geDrag.on = false;
      geEndGesture();
      scroll.stop();
      document.body.classList.remove("ge-dragging");
      if (ghost) ghost.remove();
      if (target) {
        const before = target.zone && holder.isConnected ? holder.nextElementSibling : null;
        const beforeId = before && before.dataset ? before.dataset.geChip : null;
        holder.remove();
        groupEdit.selected.clear();
        geChange(l => geMove(l, moving, target.key, beforeId));
      } else {
        geFlip(() => { holder.remove(); movingEls().forEach(c => { c.hidden = false; }); });
        $content.querySelectorAll(".ge-over").forEach(x => x.classList.remove("ge-over"));
      }
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  });

  // Selecting with a box: press on empty space and drag (mouse or pen). Cards the box touches
  // are selected; with Shift, Ctrl or Cmd held they are added to the selection.
  document.addEventListener("pointerdown", e => {
    if (!groupEdit || e.button !== 0 || e.pointerType === "touch") return;
    const ge = e.target.closest(".ge");
    // Not from the search area above "Not in a section": its text can be highlighted as usual
    // there (owner, 2026-11-08). From that heading down, a drag on empty space draws the box.
    if (!ge || !e.target.closest(".ge-main") || e.target.closest("button, a, input, textarea, [data-ge-chip], .ge-movebar, .ge-find")) return;
    const add = e.shiftKey || e.ctrlKey || e.metaKey;
    const keep = add ? new Set(groupEdit.selected) : new Set();
    const sx = e.clientX, sy = e.clientY + window.scrollY, scroll = geScroller();
    let band = null, x = e.clientX, y = e.clientY;
    const chips = [...$content.querySelectorAll(".ge [data-ge-chip]")];
    const update = () => {
      const top = Math.min(sy, y + window.scrollY), bottom = Math.max(sy, y + window.scrollY);
      const left = Math.min(sx, x), right = Math.max(sx, x);
      band.style.left = left + "px"; band.style.top = (top - window.scrollY) + "px";
      band.style.width = (right - left) + "px"; band.style.height = (bottom - top) + "px";
      for (const c of chips) {
        const r = c.getBoundingClientRect(), ct = r.top + window.scrollY, cb = r.bottom + window.scrollY;
        const hit = r.right > left && r.left < right && cb > top && ct < bottom;
        const on = hit || keep.has(c.dataset.geChip);
        c.classList.toggle("is-sel", on);
      }
    };
    const onScroll = () => { if (band) update(); };
    const move = ev => {
      x = ev.clientX; y = ev.clientY; scroll.y = y;
      if (!band) {
        if (Math.hypot(x - sx, y + window.scrollY - sy) < 5) return;
        band = document.createElement("div");
        band.className = "ge-band";
        document.body.appendChild(band);
        document.body.classList.add("ge-selecting");
        window.addEventListener("scroll", onScroll);
        scroll.start();
      }
      update();
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      if (!band) return;
      scroll.stop();
      window.removeEventListener("scroll", onScroll);
      band.remove();
      document.body.classList.remove("ge-selecting");
      geEndGesture();
      groupEdit.selected = new Set(chips.filter(c => c.classList.contains("is-sel")).map(c => c.dataset.geChip));
      geRefresh();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  });

  // Moving from one text box straight to another control takes one click (owner, 2026-11-08):
  // leaving a box saves it and redraws the page, which used to swallow the click, so the
  // control pressed is found again in the new page and pressed for the reader.
  const REPLAYABLE = "[data-ge-act], [data-ge-chip], button[data-description], [data-edit-description], h2[data-list-title], [data-list-rename], [data-group-edit], [data-group-off], [data-list-group], [data-list-delete], [data-list-clear]";
  document.addEventListener("pointerdown", e => {
    const a = document.activeElement;
    if (!a || !a.matches || !a.matches("[data-ge-rename], [data-ge-note], .list-description-editor, h2[contenteditable='true']")) return;
    const t = e.target.closest && e.target.closest(REPLAYABLE);
    if (!t || t === a || a.contains(t)) return;
    const sel = t.tagName.toLowerCase() + [...t.attributes].filter(x => x.name.startsWith("data-"))
      .map(x => `[${x.name}="${CSS.escape(x.value)}"]`).join("");
    const shift = e.shiftKey, mod = e.ctrlKey || e.metaKey;
    // Wait for the button to come up: a box opened while it is still down would take the
    // release as a drag and select only part of its text (owner, 2026-11-08).
    let landed = false;
    const mark = ev => { if (ev.isTrusted && t.contains(ev.target)) landed = true; };
    document.addEventListener("click", mark, true);
    const replay = () => {
      document.removeEventListener("click", mark, true);
      if (landed || t.isConnected) return;   // the click reached the control by itself
      const again = document.querySelector(sel);
      if (again) again.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, shiftKey: shift, ctrlKey: mod, detail: 1 }));
    };
    const onUp = () => { document.removeEventListener("pointercancel", onUp, true); setTimeout(replay, 0); };
    document.addEventListener("pointerup", onUp, { capture: true, once: true });
    document.addEventListener("pointercancel", onUp, { capture: true, once: true });
  }, true);

  // Parse only the small description format. Keep math opaque to emphasis and list parsing.
  function listDescriptionHtml(source) {
    const lines = [""];
    const parts = source.split(/(\\\[[\s\S]*?\\\]|(?<!\\)\$(?!\s)(?:\\.|[^$\n\\])+?(?<!\s)\$)/g);
    for (const [index, part] of parts.entries()) {
      if (index % 2 === 1) {
        const display = part.startsWith("\\[");
        lines[lines.length - 1] += katex.renderToString(display ? part.slice(2, -2) : part.slice(1, -1), {
          displayMode: display, throwOnError: false, trust: false
        });
      } else {
        part.split(/\r?\n/).forEach((line, i) => {
          if (i) lines.push("");
          lines[lines.length - 1] += escapeAttr(line)
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(?!\s)([^*]+)\*/g, "<em>$1</em>");
        });
      }
    }
    // Lists as Google Docs makes them (owner, 2026-11-08): a line "• text" is a bullet, two spaces
    // of indent per level nest it (at most one level deeper than the bullet before), a bullet may
    // be empty, and an indented line with no bullet continues the bullet above it on a new line.
    let html = "";
    const stack = [];   // the open lists, deepest last; each notes whether its last item is open
    const closeItem = () => { const top = stack[stack.length - 1]; if (top && top.open) { html += "</span>"; top.open = false; } };
    const closeList = () => { closeItem(); html += "</span>"; stack.pop(); };
    for (const line of lines) {
      const bullet = line.match(/^( *)[-*•◦▪](?: ([\s\S]*))?$/);
      if (bullet) {
        const level = Math.min(Math.floor(bullet[1].length / 2), stack.length, 2);
        if (level === stack.length) {
          html += `<span class="description-bullets" role="list" data-level="${level}">`;
          stack.push({ open: false });
        } else {
          while (stack.length - 1 > level) closeList();
          closeItem();
        }
        html += '<span role="listitem">' + ((bullet[2] || "").trim() ? bullet[2] : "&#8203;");
        stack[stack.length - 1].open = true;
        continue;
      }
      if (stack.length && stack[stack.length - 1].open && /^ {2,}\S/.test(line)) {
        html += "<br>" + line.trimStart();
        continue;
      }
      while (stack.length) closeList();
      html += '<span class="description-line">' + (line || "<br>") + "</span>";
    }
    while (stack.length) closeList();
    return html;
  }
  function editListDescription() {
    const button = $content.querySelector("button[data-description]");
    if (!button) return;
    const list = getList(button.dataset.description);
    const input = document.createElement("textarea");
    input.className = "topic-blurb list-description-editor";
    input.rows = 2;
    input.setAttribute("aria-label", "List description");
    input.placeholder = "Write a description. Shift+Enter adds a line.";
    input.value = list.blurb || "";
    button.replaceWith(input);
    const fit = () => {
      input.style.height = "auto";
      input.style.height = input.scrollHeight + "px";
    };
    fit();
    input.addEventListener("input", fit);
    input.focus();
    input.select();
    let cancelled = false;
    input.addEventListener("keydown", e => {
      if (e.isComposing || (e.key === "Enter" && e.shiftKey) || (e.key !== "Enter" && e.key !== "Escape")) return;
      e.preventDefault();
      cancelled = e.key === "Escape";
      input.blur();
      button.focus();
    });
    input.addEventListener("blur", () => {
      const value = cleanDescription(input.value);
      if (!cancelled && value !== (list.blurb || "")) {
        list.blurb = value;
        saveLists();
        button.innerHTML = listDescriptionHtml(value || "Click to add description");
        input.replaceWith(button);
        renderMath(button.parentElement);
      } else input.replaceWith(button);
    }, { once: true });

  }
  function renderListDetail(listId) { renderListSurface({ type: "list", listId }); }

  // Bullets as you type in the description boxes, as in Google Docs (owner, 2026-11-08):
  //   "* " or "- " at the start of a line starts a bullet;
  //   Enter on a bullet starts the next one (taking any text after the caret); on an empty bullet it
  //     moves the bullet out a level, or at the top level ends the list; outside a list it saves;
  //   Shift+Enter or Ctrl/Cmd+Enter breaks the line inside the same bullet, with no new bullet;
  //   Tab and Shift+Tab indent and outdent a bullet (three levels: • ◦ ▪);
  //   Backspace at the start of a bullet's text moves it out a level, or at the top level removes
  //     the bullet and keeps the text; at the start of a continued line it joins the line above.
  // Bullets may be empty. Math still waits until the box is closed.
  const BULLET_BOXES = ".list-description-editor, .ge-note-input";
  const BULLET_MARKS = ["•", "◦", "▪"];
  const bulletLine = (level, text = "") => " ".repeat(level * 2) + BULLET_MARKS[level] + " " + text;
  function cleanDescription(v) { return v.replace(/^\n+/, "").replace(/\s+$/, ""); }
  // The line holding the caret: where it starts and ends, and whether it is a bullet (its level and
  // where its text begins) or the continuation of one.
  function lineAt(v, at) {
    const start = v.lastIndexOf("\n", at - 1) + 1;
    let end = v.indexOf("\n", at); if (end < 0) end = v.length;
    const line = v.slice(start, end);
    const m = line.match(/^( *)([•◦▪])( ?)(.*)$/);
    if (m) {
      const level = Math.min(2, Math.floor(m[1].length / 2));
      return { start, end, line, kind: "bullet", level, textAt: start + m[1].length + 1 + m[3].length, text: m[4] };
    }
    const c = line.match(/^( {2,})(.*)$/);
    if (c && start > 0) {
      // A continued line belongs to the nearest bullet above it.
      for (let s2 = v.lastIndexOf("\n", start - 2) + 1, guard = 0; guard < 200; guard++) {
        const above = v.slice(s2, v.indexOf("\n", s2) < 0 ? v.length : v.indexOf("\n", s2));
        const bm = above.match(/^( *)[•◦▪]/);
        if (bm) return { start, end, line, kind: "cont", level: Math.min(2, Math.floor(bm[1].length / 2)), textAt: start + c[1].length, text: c[2] };
        if (!/^ {2,}/.test(above) || s2 === 0) break;
        s2 = v.lastIndexOf("\n", s2 - 2) + 1;
      }
    }
    return { start, end, line, kind: "plain", level: 0, textAt: start, text: line };
  }
  function setBoxText(t, value, caret) {
    t.value = value;
    t.setSelectionRange(caret, caret);
    t.dispatchEvent(new Event("input", { bubbles: true }));   // the box re-fits its height
  }
  // Rewrite one bullet line at a new level, keeping the caret on the same text.
  function relevel(t, L, level) {
    const v = t.value, at = t.selectionStart, head = bulletLine(level);
    setBoxText(t, v.slice(0, L.start) + head + L.text + v.slice(L.end), L.start + head.length + Math.max(0, at - L.textAt));
  }
  document.addEventListener("input", e => {
    const t = e.target;
    if (!t.matches || !t.matches(BULLET_BOXES) || e.inputType !== "insertText" || e.data !== " ") return;
    const at = t.selectionStart, start = t.value.lastIndexOf("\n", at - 1) + 1;
    const m = t.value.slice(start, at).match(/^( *)[*-] $/);
    if (!m) return;
    const level = Math.min(2, Math.floor(m[1].length / 2));
    const head = bulletLine(level);
    setBoxText(t, t.value.slice(0, start) + head + t.value.slice(at), start + head.length);
  });
  document.addEventListener("keydown", e => {
    const t = e.target;
    if (!t.matches || !t.matches(BULLET_BOXES) || e.isComposing || e.altKey) return;
    const v = t.value, at = t.selectionStart;
    const L = lineAt(v, at);
    const inList = L.kind !== "plain";
    const done = () => { e.preventDefault(); e.stopImmediatePropagation(); };
    if (e.key === "Enter" && (e.shiftKey || e.ctrlKey || e.metaKey)) {
      if (!inList) { if (e.ctrlKey || e.metaKey) { done(); setBoxText(t, v.slice(0, at) + "\n" + v.slice(t.selectionEnd), at + 1); } return; }
      done();
      const pad = "\n" + " ".repeat(L.level * 2 + 2);
      setBoxText(t, v.slice(0, at) + pad + v.slice(t.selectionEnd), at + pad.length);
    } else if (e.key === "Enter") {
      if (!inList) return;   // outside a list Enter saves, as before
      done();
      if (L.kind === "bullet" && !L.text.trim()) {
        if (L.level > 0) relevel(t, L, L.level - 1);
        else setBoxText(t, v.slice(0, L.start) + v.slice(L.end), L.start);       // end the list
        return;
      }
      const head = "\n" + bulletLine(L.level);
      const cut = Math.max(at, L.textAt);
      const left = cut > L.textAt ? v.slice(0, cut).replace(/ +$/, "") : v.slice(0, cut);
      setBoxText(t, left + head + v.slice(t.selectionEnd > cut ? t.selectionEnd : cut).replace(/^ +/, ""), left.length + head.length);
    } else if (e.key === "Tab" && L.kind === "bullet") {
      done();
      // As in Docs, a bullet goes at most one level deeper than the bullet above it, so the
      // indents typed are the levels the saved list shows.
      let above = -1;
      for (let at2 = L.start - 1; at2 > 0; ) {
        const P = lineAt(v, at2);
        if (P.kind === "bullet") { above = P.level; break; }
        if (P.kind !== "cont") break;
        at2 = P.start - 1;
      }
      const level = e.shiftKey ? L.level - 1 : L.level + 1;
      if (level >= 0 && level <= 2 && level <= above + 1) relevel(t, L, level);
    } else if (e.key === "Backspace" && at === t.selectionEnd && at === L.textAt) {
      if (L.kind === "bullet") {
        done();
        if (L.level > 0) relevel(t, L, L.level - 1);
        else setBoxText(t, v.slice(0, L.start) + L.text + v.slice(L.end), L.start);    // remove the bullet, keep the text
      } else if (L.kind === "cont") {
        done();
        const gap = v[L.start - 2] === " " || !L.text || L.start < 2 ? "" : " ";
        setBoxText(t, v.slice(0, L.start - 1) + gap + v.slice(L.textAt), L.start - 1 + gap.length);
      }
    }
  }, true);

  // ---------- Problem Database: competition/year navigator + per-problem detail ----------
  // A contest's papers in the order they were sat. A sitting is a year, except in 2021, when the
  // AMC 10 and 12 were held twice (spring, the contest moved from fall 2020, and fall): those
  // are two sittings, so "the contest before" a 2022 paper is fall 2021 and before fall 2021
  // it is spring 2021.
  const FAM_PAPERS = {};
  const sitOf = p => p.year * 10 + (/^Fall\b/i.test(p.cname) ? 2 : /^Spring\b/i.test(p.cname) ? 1 : 0);
  const sitLabel = s => { const y = Math.floor(s / 10), k = s % 10; return k === 2 ? `Fall ${y}` : k === 1 ? `Spring ${y}` : String(y); };
  const sitSpan = sits => sits.length === 1 ? sitLabel(sits[0]) : `${sitLabel(sits[0])}&ndash;${sitLabel(sits[sits.length - 1])}`;
  const paperKey = p => p.year + " " + p.cname;
  const primarySubject = p => { const id = p.tree.find(t => TOPIC_NODES.has(t)); return id ? topicPath(id)[0].id : null; };
  // An HMMT February paper is one round of the tournament, and the rounds differ in kind, so a
  // round is compared only with the same round in other years (owner, 2026-11-13): its "usual",
  // its rank and its years chart. The round was called Algebra until 2018 and Algebra and Number
  // Theory from 2019; they are one series. Other contests have one series per family.
  const roundOf = p => /^HMMT/.test(p.fam) ? p.cname.replace(/^HMMT \w+ /, "").replace(/^Algebra and Number Theory$/, "Algebra")
    // SMT's third subject was Advanced, then Discrete (Combinatorics and Number Theory in 2021): one series.
    : p.fam === "SMT" ? p.cname.replace(/^SMT /, "").replace(/^Advanced$/, "Discrete") : "";
  const roundSlug = slug => String(slug || "").replace(/algebra-and-number-theory$/, "algebra").replace(/^smt-advanced$/, "smt-discrete");
  function famPapers(fam, round = "") {
    const id = fam + "|" + round;
    if (FAM_PAPERS[id]) return FAM_PAPERS[id];
    const by = {};
    PROBLEM_DB.forEach(p => {
      if (p.fam !== fam || !Number.isFinite(p.elo) || roundOf(p) !== round) return;
      (by[paperKey(p)] = by[paperKey(p)] || { key: paperKey(p), sit: sitOf(p), year: p.year, cname: p.cname, ps: [] }).ps.push(p);
    });
    const papers = Object.values(by).sort((x, y) => x.sit - y.sit || x.cname.localeCompare(y.cname));
    papers.forEach(x => { x.desc = x.ps.map(p => p.elo).sort((u, v) => v - u); x.med = quantile(x.desc.slice().reverse(), 0.5); });
    return FAM_PAPERS[id] = papers;
  }
  // Which of two papers is harder: the higher median rating; on a tie (medians tie often), the
  // paper whose hardest problem is rated higher, then its second hardest, and so on down (owner,
  // 2026-11-11), so two papers share a rank only if every rating matches.
  function paperHarder(a, b) {
    if (a.med !== b.med) return a.med > b.med;
    for (let i = 0; i < Math.min(a.desc.length, b.desc.length); i++) if (a.desc[i] !== b.desc[i]) return a.desc[i] > b.desc[i];
    return false;
  }
  // What a set of papers says a paper usually looks like: the median rating at each question
  // number, the average number of problems filed first under each subject, and the median of
  // the papers' median ratings.
  function paperBaseline(papers) {
    const byNum = {}, subjects = {}, usual = {};
    papers.forEach(x => x.ps.forEach(p => {
      (byNum[p.num] = byNum[p.num] || []).push(p.elo);
      const sub = primarySubject(p);
      if (sub) subjects[sub] = (subjects[sub] || 0) + 1;
    }));
    Object.keys(byNum).forEach(n => { usual[n] = quantile(byNum[n].sort((x, y) => x - y), 0.5); });
    Object.keys(subjects).forEach(k => { subjects[k] /= papers.length; });
    return { count: papers.length, usual, subjects, med: quantile(papers.map(x => x.med).sort((x, y) => x - y), 0.5) };
  }
  // What the paper is compared with (owner, 2026-11-11: papers have grown harder, so the whole
  // record is not the fairest yardstick): every year, the five contests before it, the one
  // before it, or the other paper of its own sitting. The choice is kept while browsing.
  let paperBase = "recent";
  function paperBases(fam, ps) {
    const round = roundOf(ps[0]), series = round ? `${fam} ${round}` : fam;
    const papers = famPapers(fam, round), me = paperKey(ps[0]), sit = sitOf(ps[0]);
    const sits = [...new Set(papers.map(x => x.sit))], at = sits.indexOf(sit);
    const of = ss => papers.filter(x => ss.includes(x.sit));
    // The choices are named plainly ("Past 10 AMCs"; owner, 2026-11-11) and the exact years
    // are given in the line under the chart. "Past 10" is whole sittings, newest first, until
    // there are ten papers (five years of A and B papers, ten years of the AMC 8).
    const noun = /^AMC/.test(fam) ? "AMC" : /^AIME/.test(fam) ? "AIME" : "paper";
    const past = n => n === 1 ? `Last ${noun}` : `Past ${n} ${noun}s`, onPast = n => n === 1 ? `on the last ${noun}` : `on the past ${n} ${noun}s`;
    let recent = [];
    for (let i = at - 1; i >= 0 && of(recent).length < 10; i--) recent = [sits[i], ...recent];
    const prev = at > 0 ? [sits[at - 1]] : [], twins = papers.filter(x => x.sit === sit && x.key !== me);
    const nR = of(recent).length, nP = of(prev).length;
    return [
      papers.length >= 3 ? { id: "all", label: "All years", papers, than: "usual", key: `the usual rating at that question, over all ${papers.length} ${escapeAttr(series)} papers (${sitSpan([sits[0], sits[sits.length - 1]])})` } : null,
      nR > nP ? { id: "recent", label: past(nR), papers: of(recent), than: onPast(nR), key: `the usual rating at that question ${onPast(nR)} (${sitSpan(recent)})` } : null,
      nP ? { id: "prev", label: past(nP), papers: of(prev), than: onPast(nP), key: `the ${nP > 1 ? "usual " : ""}rating at that question ${onPast(nP)} (${sitLabel(prev[0])})` } : null,
      twins.length === 1 ? { id: "twin", label: escapeAttr(twins[0].cname.replace(/^(Spring|Fall) /, "")), papers: twins, than: `on the ${escapeAttr(twins[0].cname.replace(/^(Spring|Fall) /, ""))}`, key: `the rating at that question on the ${sitLabel(sit)} ${escapeAttr(twins[0].cname.replace(/^(Spring|Fall) /, ""))}` } : null
    ].filter(Boolean);
  }
  // One paper's page (owner, 2026-11-11): headline figures, the problems as plain tiles (a number
  // and a rating; the chips and solution text they used to carry are gone), then what the ratings
  // and tree filings say about the paper: its difficulty question by question and its subjects
  // against a chosen yardstick, the contest's median rating sitting by sitting, and its topics.
  function paperInfoHtml(fam, ps) {
    const rated = ps.filter(p => Number.isFinite(p.elo));
    const sec = (title, body, action = "") => `<section class="pp-sec">${action ? `<div class="pp-head"><h3 class="pp-h">${title}</h3>${action}</div>` : `<h3 class="pp-h">${title}</h3>`}${body}</section>`;
    // A complete paper with an answer key can be sat as a timed mock: the button opens
    // Practice a contest with this paper already chosen (owner, 2026-11-11).
    const mockable = mockPapers().find(g => g.label === paperKey(ps[0])), fmt = mockable && mockContests.formats[fam];
    const mock = fmt ? `<a class="hp-btn hp-btn-soft pp-mock" href="#/practice" data-goto="pr-mock" data-mock-preset="${escapeAttr(mockable.label)}" data-mock-preset-family="${escapeAttr(fam)}" title="${fmt.count} problems, ${fmt.minutes} minutes">Mock this paper</a>` : "";
    const tiles = `<div class="br-list pp-tiles">${ps.map(p => `<a class="br-row" href="#/problem/${p.slug}"><span class="br-ref">Problem ${p.num}</span>${Number.isFinite(p.elo) ? `<span class="br-elo">${p.elo}</span>` : ""}</a>`).join("")}</div>`;
    if (!rated.length) return sec("Problems", tiles, mock);
    const round = roundOf(ps[0]), series = round ? `${fam} ${round}` : fam;
    const papers = famPapers(fam, round), bases = paperBases(fam, ps);
    const base = bases.find(x => x.id === paperBase) || bases.find(x => x.id === "recent") || bases[0] || null, cmp = base ? paperBaseline(base.papers) : null;
    const elos = rated.map(p => p.elo).sort((x, y) => x - y), med = quantile(elos, 0.5);
    const hardest = rated.reduce((x, y) => y.elo > x.elo ? y : x);
    // The two ends of the paper: the opening questions everyone is meant to get and the closing
    // five that separate the top scores (the first ten and last five of a 25-question paper,
    // the first and last five of a shorter one).
    const last = Math.max(...ps.map(p => p.num)), ends = last >= 10 ? [[1, last >= 20 ? 10 : 5], [last - 4, last]] : [];
    const signed = d => `${d > 0 ? "+" : d < 0 ? "&minus;" : ""}${Math.abs(d)}`;
    const stat = (big, small, title = "") => `<div class="pf-stat"${title ? ` title="${title}"` : ""}><b>${big}</b><span>${small}</span></div>`;
    const recent = bases.find(x => x.id === "recent"), me = papers.find(x => x.key === paperKey(ps[0]));
    const stats = `<div class="pf-stats pp-stats">${[
      stat(ps.length, "problems"),
      stat(med, "median rating"),
      ...ends.map(([lo, hi]) => { const xs = rated.filter(p => p.num >= lo && p.num <= hi).map(p => p.elo).sort((x, y) => x - y); return xs.length ? stat(quantile(xs, 0.5), `median of questions ${lo}&ndash;${hi}`) : ""; }),
      recent ? stat(signed(med - paperBaseline(recent.papers).med), `median rating against the ${recent.label.toLowerCase().replace(/amc/, "AMC").replace(/aime/, "AIME")}`) : "",
      papers.length >= 3 && me ? stat(ordinal(1 + papers.filter(x => paperHarder(x, me)).length), `hardest of all ${papers.length} ${escapeAttr(series)} papers`, "By median rating. A tie goes to the paper with the harder hardest problem, then the harder second hardest, and so on.") : ""
    ].join("")}</div>`;
    const chips = bases.length > 1 ? `<div class="pp-base"><span class="br-kids-l">Compare with</span><div class="fam-chips" role="group" aria-label="Compare with">${bases.map(x =>
      `<button type="button" class="fam-chip" data-pp-base="${x.id}" aria-pressed="${x === base}">${x.label}</button>`).join("")}</div></div>` : "";

    // Difficulty by question: a bar per problem (it opens the problem), with a tick at the
    // yardstick's rating for that question number.
    const top = Math.ceil(Math.max(hardest.elo, ...(cmp ? rated.map(p => cmp.usual[p.num] || 0) : [0])) / 500) * 500;
    const lines = []; for (let y = 1000; y < top; y += 1000) lines.push(y);
    const bars = ps.map(p => {
      const u = cmp ? cmp.usual[p.num] : null;
      if (!Number.isFinite(p.elo)) return `<span class="pq-bar"><span class="pq-n">${p.num}</span></span>`;
      return `<a class="pq-bar" href="#/problem/${p.slug}" data-tip="Problem ${p.num}: rated ${p.elo}${u ? `; ${base.label}: ${u}` : ""}" aria-label="Problem ${p.num}, rated ${p.elo}${u ? `, against ${u}` : ""}"><span class="pq-col"><i style="height:${(p.elo / top * 100).toFixed(1)}%"></i>${u ? `<b style="bottom:${(u / top * 100).toFixed(1)}%"></b>` : ""}</span><span class="pq-n">${p.num}</span></a>`;
    }).join("");
    const off = cmp ? rated.filter(p => cmp.usual[p.num]).map(p => ({ p, d: p.elo - cmp.usual[p.num] })).filter(x => Math.abs(x.d) >= 300).sort((x, y) => Math.abs(y.d) - Math.abs(x.d)) : [];
    const listed = xs => { const t = xs.slice(0, 4).map(x => `<a href="#/problem/${x.p.slug}">#${x.p.num}</a> (${signed(x.d)})`); return t.length < 3 ? t.join(" and ") : `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}`; };
    const harder = off.filter(x => x.d > 0), easier = off.filter(x => x.d < 0);
    const versus = !cmp ? "" : !off.length ? `Every question is within 300 points of its rating ${base.than === "usual" ? "in the usual paper" : base.than}.`
      : [harder.length ? `Harder than ${base.than}: ${listed(harder)}.` : "", easier.length ? `Easier than ${base.than}: ${listed(easier)}.` : ""].filter(Boolean).join(" ");
    const curve = sec("Difficulty by question", `${chips}<div class="pq" style="--pq:${famColor(fam)}"><div class="pq-plot"><div class="pq-grid" aria-hidden="true">${lines.map(y => `<span class="pq-line" style="bottom:${(y / top * 100).toFixed(1)}%"><em>${y}</em></span>`).join("")}</div><div class="pq-bars${ps.length > 15 ? " pq-many" : ""}">${bars}</div></div></div>
      ${cmp ? `<p class="pp-note" style="--pq:${famColor(fam)}"><span class="pq-key"><i></i>this paper</span><span class="pq-key"><b></b>${base.key}</span></p><p class="pp-words">${versus}</p>` : ""}`);

    // Subjects: where the paper's problems are filed first, against the same yardstick.
    const bySub = {};
    rated.forEach(p => { const k = primarySubject(p); if (k) (bySub[k] = bySub[k] || []).push(p.elo); });
    const subs = TOPIC_ROOTS.filter(r => bySub[r.id] || (cmp && cmp.subjects[r.id])), subMax = Math.max(...subs.map(r => (bySub[r.id] || []).length));
    // A pie of the split beside the table (owner, 2026-11-11); each subject keeps one colour in
    // the pie, its dot and its bar, so the rows are the pie's legend.
    const total = subs.reduce((n, r) => n + (bySub[r.id] || []).length, 0);
    let turn = -Math.PI / 2;
    const slices = subs.filter(r => (bySub[r.id] || []).length).map(r => {
      const n = bySub[r.id].length, end = turn + 2 * Math.PI * n / total, at = t => `${(50 + 48 * Math.cos(t)).toFixed(2)},${(50 + 48 * Math.sin(t)).toFixed(2)}`;
      const shape = n === total ? `<circle cx="50" cy="50" r="48"` : `<path d="M50,50 L${at(turn)} A48,48 0 ${end - turn > Math.PI ? 1 : 0} 1 ${at(end)} Z"`;
      turn = end;
      return `${shape} style="fill:var(--subj-${r.id})"><title>${topicLabel(r)}: ${n} of ${total} (${Math.round(n / total * 100)}%)</title>${n === total ? "</circle>" : "</path>"}`;
    }).join("");
    const pie = `<svg class="pp-pie" viewBox="0 0 100 100" role="img" aria-label="Subjects: ${subs.map(r => `${topicLabel(r)} ${(bySub[r.id] || []).length}`).join(", ")}">${slices}</svg>`;
    const subjects = sec("Subjects", `<div class="pp-subjects">${pie}<table class="pf-table pp-table"><thead><tr><th scope="col" aria-label="Subject"></th><th class="pf-meter-cell"></th><th scope="col">Problems</th>${cmp ? `<th scope="col">${base.id === "all" ? "Usual" : base.label}</th>` : ""}<th scope="col"><span class="pf-long">Median rating</span><span class="pf-short" aria-hidden="true">Median</span></th></tr></thead><tbody>${subs.map(r => {
      const xs = (bySub[r.id] || []).sort((x, y) => x - y), u = cmp ? cmp.subjects[r.id] || 0 : 0;
      return `<tr><th scope="row"><i class="fam-dot" style="background:var(--subj-${r.id})"></i><a href="${topicHash(r.id)}">${topicLabel(r)}</a></th><td class="pf-meter-cell"><span class="pf-meter"><i style="width:${xs.length ? Math.max(2, xs.length / subMax * 100).toFixed(1) : 0}%;background:var(--subj-${r.id})"></i></span></td><td>${xs.length}</td>${cmp ? `<td>${Number.isInteger(u) ? u : u.toFixed(1)}</td>` : ""}<td>${xs.length ? quantile(xs, 0.5) : "&ndash;"}</td></tr>`;
    }).join("")}</tbody></table></div>`);

    // Over the years: the contest's median paper rating, sitting by sitting, with this paper's
    // sitting picked out. Each bar opens its year.
    const sits = [...new Set(papers.map(x => x.sit))], sit = sitOf(ps[0]);
    let years = "";
    if (sits.length >= 3) {
      const per = sits.map(s => { const xs = papers.filter(x => x.sit === s); return { s, year: xs[0].year, paper: round ? "/" + paperSlug(xs[0].cname) : "", n: xs.length, med: Math.round(xs.reduce((n, x) => n + x.med, 0) / xs.length) }; });
      // A sitting with two papers is one bar, both papers together; the page says so (owner,
      // 2026-11-11), since the page itself is about one of the two.
      const pair = papers.some(x => /[AB]$/.test(x.cname)) ? "A and B papers" : papers.some(x => /\bII$/.test(x.cname)) ? "I and II papers" : "", cur = per.find(x => x.s === sit);
      const both = n => n === 2 ? "both papers" : `its ${n} papers`;
      // The bars start from a labelled floor, not zero: a rise of a few hundred points is the
      // whole story here and would vanish on a scale from zero.
      const yTop = Math.ceil(Math.max(...per.map(x => x.med)) / 100) * 100, yLow = Math.max(0, Math.floor(Math.min(...per.map(x => x.med)) / 100) * 100 - 200);
      const mean = xs => Math.round(xs.reduce((n, x) => n + x.med, 0) / xs.length);
      const first = per.slice(0, Math.min(5, per.length >> 1)), last = per.slice(-first.length);
      const drift = mean(last) - mean(first);
      years = sec("Over the years", `<div class="py-plot"><span class="py-axis" aria-hidden="true"><em>${yTop}</em><em>${yLow}</em></span><div class="py" style="--pq:${famColor(fam)}">${per.map(x =>
        `<a class="py-bar${x.s === sit ? " is-cur" : ""}" href="#/problems/${famSlug(fam)}/${x.year}${x.paper}" data-tip="${sitLabel(x.s)}${x.n > 1 ? `, ${both(x.n)}` : ""}: median paper rating ${x.med}" aria-label="${sitLabel(x.s)}${x.n > 1 ? `, ${both(x.n)}` : ""}, median paper rating ${x.med}"${x.s === sit ? ' aria-current="true"' : ""}><span class="py-col"><i style="height:${((x.med - yLow) / (yTop - yLow) * 100).toFixed(1)}%"></i></span><span class="py-n">${String(x.year).slice(2)}${x.s % 10 === 2 ? "F" : x.s % 10 === 1 ? "S" : ""}</span></a>`).join("")}</div></div>
        <p class="pp-words">${pair ? `Each bar is one sitting of the contest, with its ${pair} taken together. ` : ""}The median ${escapeAttr(series)} paper was rated ${mean(first)} in ${sitSpan(first.map(x => x.s))} and ${mean(last)} in ${sitSpan(last.map(x => x.s))}: ${drift === 0 ? "no change" : `${Math.abs(drift)} points ${drift > 0 ? "harder" : "easier"}`}. ${cur.n > 1 ? `${sitLabel(sit)} averages ${cur.med} over ${both(cur.n)}; this paper is rated ${med}.` : `This paper is rated ${med}.`}</p>`);
    }

    // Topics: the areas (one level under a subject) the paper's problems fall in, most first.
    const areas = {};
    ps.forEach(p => new Set(p.tree.filter(t => TOPIC_NODES.has(t)).map(t => { const path = topicPath(t); return path[Math.min(1, path.length - 1)].id; })).forEach(id => { areas[id] = (areas[id] || 0) + 1; }));
    const areaIds = Object.keys(areas).sort((x, y) => areas[y] - areas[x] || TOPIC_NODES.get(x).order - TOPIC_NODES.get(y).order);
    const topics = areaIds.length ? sec("Topics", `<div class="br-kids pp-areas">${areaIds.map(id => `<a class="br-kid" href="${topicHash(id)}">${topicLabel(TOPIC_NODES.get(id))}<span class="br-count">${areas[id]}</span></a>`).join("")}</div>`) : "";
    return stats + sec("Problems", tiles, mock) + curve + subjects + years + topics;
  }
  // Choosing what to compare with redraws the page in place.
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-pp-base]");
    if (!b) return;
    paperBase = b.dataset.ppBase;
    const y = window.scrollY;
    renderProblems(getRoute());
    window.scrollTo(0, y);
    $content.querySelector(`.db-group.is-shown [data-pp-base="${paperBase}"]`)?.focus({ preventScroll: true });
  });
  // One sitting of one contest, opened from the Practice page: every year of that contest
  // one click away at the top, a toggle between the year's papers (at every width since
  // 2026-11-11; it began as the phone's), the chosen paper's page, and the neighbouring years
  // at the foot. Problems are searched from the main search box.
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
    // Advanced Topics occupies the counting slot in the historical subject-paper order.
    // This affects the tabs only; its difficulty series remains separate from Combinatorics.
    // SMT's Advanced test (2011 to 2014) sits where Discrete does later.
    const tabKey = gn => gn.replace(/Advanced Topics$/, "Combinatorics").replace(/^SMT Advanced$/, "SMT Discrete");
    const gnames = Object.keys(groups).sort((a, b) => seasonRank(a) - seasonRank(b) || tabKey(a).localeCompare(tabKey(b)));
    // #/problems/aime/2025/aime-i names one paper (a contest result in the search links there,
    // and the toggle writes it): the page opens on it.
    let shownG = gnames.findIndex(gn => paperSlug(gn) === route.paper);
    if (shownG < 0) shownG = Math.max(0, gnames.findIndex(gn => roundSlug(paperSlug(gn)) === roundSlug(route.paper)));
    const twoSittings = gnames.some(gn => /^Spring\b/i.test(gn)) && gnames.some(gn => /^Fall\b/i.test(gn));
    const body = gnames.map((gn, k) => {
      const ps = groups[gn].sort((a, b) => a.num - b.num);
      return `<div class="db-group${k === shownG ? " is-shown" : ""}" data-g="${k}"${gnames.length > 1 ? ` id="ct-paper-panel-${k}" role="tabpanel" aria-labelledby="ct-paper-tab-${k}"` : ""}>${paperInfoHtml(fam, ps)}</div>`;
    }).join("");
    const i = years.indexOf(year);
    const newer = years[i - 1], older = years[i + 1];
    // A step to another year keeps the paper being looked at (the same round of HMMT, the same
    // A or B paper), when that year has it; the year page falls back to its first paper.
    let curPaper = gnames.length > 1 ? paperSlug(gnames[shownG]) : "";
    const yhref = y => `#/problems/${famSlug(fam)}/${y}`, ystep = y => `${yhref(y)}${curPaper ? "/" + curPaper : ""}`;
    $content.innerHTML = `
      <div class="back-row"><a class="back-link" href="#/practice">${uiIcon("arrow-left")} Practice</a></div>
      <div class="section-header topic-header">
        <div class="book-eyebrow">Practice</div>
        <h2>${escapeAttr(fam)} <span class="db-main-year">${year}</span></h2>
      </div>
      <div class="ct-years ct-years-page">${years.map(y => `<a href="${yhref(y)}"${y === year ? ' aria-current="page"' : ""}>${y}</a>`).join("")}</div>
      <div class="ct-yearbar" aria-label="Year">
        ${older ? `<a class="ct-yb-step" href="${ystep(older)}" data-step-year="${older}" aria-label="${older}">${stepChevron(-1)}</a>` : `<span class="ct-yb-step is-off" aria-hidden="true">${stepChevron(-1)}</span>`}
        <select class="ct-yb-select" aria-label="Year">${years.map(y => `<option value="${y}"${y === year ? " selected" : ""}>${y}</option>`).join("")}</select>
        ${newer ? `<a class="ct-yb-step" href="${ystep(newer)}" data-step-year="${newer}" aria-label="${newer}">${stepChevron(1)}</a>` : `<span class="ct-yb-step is-off" aria-hidden="true">${stepChevron(1)}</span>`}
      </div>
      ${gnames.length > 1 ? `<div class="ct-papers" role="tablist" aria-label="Contest papers">${gnames.map((gn, k) => `<button type="button" role="tab" id="ct-paper-tab-${k}" aria-controls="ct-paper-panel-${k}" data-g="${k}" aria-selected="${k === shownG}">${escapeAttr(gn.replace(new RegExp("^" + year + "\\s*"), "").replace(/^(Spring|Fall) AMC /, "$1 ").replace(/^(?:HMMT (?:February|November)|SMT) /, "").replace(/ and /g, " & "))}</button>`).join("")}</div>${twoSittings ? `<p class="pp-twice">${escapeAttr(fam)} was held twice in 2021: in spring, the contest moved from fall 2020, and again in fall.</p>` : ""}` : ""}
      ${body}
      <nav class="topic-nav" aria-label="Neighbouring years">
        ${older ? `<a class="topic-step" href="${ystep(older)}" data-step-year="${older}"><span class="ts-dir">${uiIcon("arrow-left")} Earlier</span><span class="ts-name">${escapeAttr(fam)} ${older}</span></a>` : "<span></span>"}
        ${newer ? `<a class="topic-step topic-step-next" href="${ystep(newer)}" data-step-year="${newer}"><span class="ts-dir">Later ${uiIcon("arrow-right")}</span><span class="ts-name">${escapeAttr(fam)} ${newer}</span></a>` : ""}
      </nav>`;
    renderMath($content);
    // The phone's year bar is a menu; the paper toggle shows one paper at a time and writes
    // the paper into the address, so a reload or a shared link opens the same one.
    const sel = $content.querySelector(".ct-yb-select");
    if (sel) sel.addEventListener("change", () => { location.hash = ystep(+sel.value); });
    const tabs = $content.querySelector(".ct-papers");
    if (tabs) tabs.addEventListener("click", e => {
      const b = e.target.closest("[data-g]");
      if (!b) return;
      tabs.querySelectorAll("[data-g]").forEach(t => t.setAttribute("aria-selected", String(t === b)));
      $content.querySelectorAll(".db-group").forEach(g => g.classList.toggle("is-shown", g.dataset.g === b.dataset.g));
      curPaper = paperSlug(gnames[+b.dataset.g]);
      history.replaceState(history.state, "", `${yhref(year)}/${curPaper}`);
      $content.querySelectorAll("[data-step-year]").forEach(a => { a.href = ystep(+a.dataset.stepYear); });
      updatePageTitle(getRoute(), gnames[+b.dataset.g]);
    });
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
  // AMC/AIME statements use the shared credits in Settings > Credits and attribution.
  // Source metadata and copyright headers remain in the data files stored under
  // js/data/problems/statements/, loaded when a problem page opens, so the offline page stays
  // light and a missing file simply shows no statement. Other contests link out as before.
  const MAA_RE = /\b(AMC|AIME|AJHSME)\b/;
  // Bumped by tools/fetch-live-statements.py whenever the statement files change, so a browser that
  // cached an older file loads the new one.
  const STATEMENTS_V = 28;
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
  // `box` picks the section to fill: the problem page's own, or the home page's problem of the day.
  function showStatement(p, box = "#prob-st") {
    const extra=window.MATH_MOCK_EXTRAS?.[p.slug];
    (extra ? Promise.resolve(true) : loadStatements(p.year)).then(() => {
      const st = extra ? {s:extra.statement} : window.MATH_STATEMENTS && window.MATH_STATEMENTS[p.slug];
      const wrap = $content.querySelector(`${box}[data-slug="${p.slug}"]`);
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
      wrap.hidden = false;
      renderMath(wrap);
    });
  }
  // ---------- Topics and difficulty (owner, 2026-11-11) ----------
  // The topic tree (js/data/topic-tree.js) and the Elo ratings feed three places: the Topic and
  // Difficulty sections of How this problem works, and the two pages opened from Practice's
  // Contests panel, Problems by topic and Problems by difficulty. A problem files under one to
  // three tree nodes; a branch holds everything filed under it or below it.
  const TOPIC_NODES = new Map((window.MATH_TOPIC_TREE || []).map(([id, name, parent], order) =>
    [id, { id, name, parent, order, children: [] }]));
  TOPIC_NODES.forEach(n => { if (n.parent && TOPIC_NODES.has(n.parent)) TOPIC_NODES.get(n.parent).children.push(n.id); });
  const TOPIC_ROOTS = [...TOPIC_NODES.values()].filter(n => !n.parent);
  const topicPath = id => { const out = []; let n = TOPIC_NODES.get(id); while (n) { out.unshift(n); n = TOPIC_NODES.get(n.parent); } return out; };
  // A node's name as plain text (no LaTeX), for the dense tree rail and its labels.
  const topicLabel = n => escapeAttr(window.PracticeTopics.label(n.name));
  let TOPIC_PROBLEMS = null;
  function topicProblems(id) {
    if (!TOPIC_PROBLEMS) {
      TOPIC_PROBLEMS = new Map();
      for (const p of PROBLEM_DB) {
        const seen = new Set();
        for (const t of p.tree) for (const n of topicPath(t)) {
          if (seen.has(n.id)) continue;
          seen.add(n.id);
          if (!TOPIC_PROBLEMS.has(n.id)) TOPIC_PROBLEMS.set(n.id, []);
          TOPIC_PROBLEMS.get(n.id).push(p);
        }
      }
    }
    return TOPIC_PROBLEMS.get(id) || [];
  }
  const topicHash = id => "#/browse/topics/" + id;
  // A problem's topics as small trees, one per subject: each path runs from the subject down to
  // the node it is filed under, and paths that share a beginning share it on the page. The whole
  // connector is drawn in SVG at one stroke width: a stem down the list's left edge and an elbow
  // (corner and arrowhead together) that starts on it, so the two meet at the same thickness at
  // any zoom. (A CSS-drawn stem snaps to whole pixels and an SVG elbow does not.)
  const PTREE_ELBOW = `<svg class="ptree-stem" aria-hidden="true"><line x1=".75" y1="0" x2=".75" y2="100%"/></svg><svg class="ptree-elbow" viewBox="0 0 20 12" width="20" height="12" aria-hidden="true"><path d="M.75 0v2a4 4 0 0 0 4 4H18.5M14.5 2l4 4-4 4"/></svg>`;
  function topicTreeHtml(p) {
    const paths = p.tree.filter(id => TOPIC_NODES.has(id)).map(topicPath);
    if (!paths.length) return `<p class="chain-empty">Not filed yet.</p>`;
    const filed = new Set(p.tree);
    const trie = new Map();
    for (const path of paths) {
      let level = trie;
      for (const n of path) {
        if (!level.has(n.id)) level.set(n.id, { n, kids: new Map() });
        level = level.get(n.id).kids;
      }
    }
    const node = (n, root) => `<a class="ptree-node${root ? " ptree-root" : ""}${filed.has(n.id) ? " is-filed" : ""}" href="${topicHash(n.id)}">${n.name}</a>`;
    const branch = level => `<ul class="ptree-list">${[...level.values()].sort((a, b) => a.n.order - b.n.order).map(({ n, kids }) =>
      `<li>${PTREE_ELBOW}${node(n)}${kids.size ? branch(kids) : ""}</li>`).join("")}</ul>`;
    return `<div class="ptree">${[...trie.values()].sort((a, b) => a.n.order - b.n.order).map(root =>
      `<div class="ptree-group">${node(root.n, true)}${root.kids.size ? branch(root.kids) : ""}</div>`).join("")}</div>`;
  }
  // Difficulty: Elo ratings in bins of 200. Each contest has its own colour (the level tokens),
  // so one chart can stack every contest and still show which is which.
  const FAM_COLOR = { "AMC 8": "var(--level-mc)", "AMC 10": "var(--level-10)", "AMC 12": "var(--level-12)", "AIME": "var(--level-aime)", "HMMT November": "var(--level-hmmtn)", "ARML": "var(--level-arml)", "SMT": "var(--level-smt)" };
  const famColor = f => FAM_COLOR[f] || "var(--level-oly)";
  const RATED_FAMS = FAMILIES.filter(f => PROBLEM_DB.some(p => p.fam === f && Number.isFinite(p.elo)));
  // The scale ends at 3800 unless a problem is rated above that (owner, 2026-11-12: harder
  // contests than the AIME may be added); then it grows to the bin that holds the hardest one.
  const ELO_BIN = 200, ELO_LO = 200;
  const ELO_HI = Math.max(3800, ...PROBLEM_DB.filter(p => Number.isFinite(p.elo)).map(p => (Math.floor(p.elo / ELO_BIN) + 1) * ELO_BIN));
  const eloBins = () => Array.from({ length: (ELO_HI - ELO_LO) / ELO_BIN }, (_, i) => ELO_LO + i * ELO_BIN);
  const binOf = elo => Math.min(ELO_HI - ELO_BIN, Math.max(ELO_LO, Math.floor(elo / ELO_BIN) * ELO_BIN));
  const famDot = f => `<i class="fam-dot" style="background:${famColor(f)}"></i>`;
  // The chart: one bar per bin, stacked by contest, its height the bin's share of the tallest bin.
  // `shown` are the contests drawn, `active` those in colour (the rest stay as a grey backdrop);
  // `mark` is a rating drawn as a line, `selected` the bin whose problems are listed below. Every
  // bar links to its range on the difficulty page, unless `pool` is some other set of problems.
  function eloChartHtml({ pool = PROBLEM_DB, shown = RATED_FAMS, active = shown, mark = null, selected = null, compact = false, links = true, focus = true } = {}) {
    const bins = eloBins(), counts = new Map(bins.map(b => [b, {}]));
    for (const p of pool) if (Number.isFinite(p.elo) && shown.includes(p.fam)) { const c = counts.get(binOf(p.elo)); c[p.fam] = (c[p.fam] || 0) + 1; }
    const total = (b, fams) => fams.reduce((n, f) => n + (counts.get(b)[f] || 0), 0);
    const max = Math.max(1, ...bins.map(b => total(b, shown))), span = ELO_HI - ELO_LO;
    const order = [...shown.filter(f => active.includes(f)), ...shown.filter(f => !active.includes(f))];
    // `focus: false` draws every bar at full strength: a card's or a topic's chart marks its
    // median with the line, and no one bar is the subject.
    const cur = !links || !focus ? null : mark != null ? binOf(mark) : selected;
    const bars = bins.map(b => {
      const n = total(b, shown), on = total(b, active);
      const segs = order.filter(f => counts.get(b)[f]).map(f => `<i style="flex:${counts.get(b)[f]};background:${active.includes(f) ? famColor(f) : "var(--border)"}"></i>`).join("");
      const label = `${on} problem${on === 1 ? "" : "s"}`, col = `<span style="height:${n ? Math.max(1.5, n / max * 100).toFixed(1) : 0}%">${segs}</span>`;
      // The whole column answers the pointer, not only the drawn bar, so hovering it tints the
      // column and shows its range and count at once (`data-tip`, drawn by CSS; the browser's
      // own tooltip came late and lingered over the wrong column). A column with no problems
      // behaves the same, "0 problems" and all, and still opens its range (owner, 2026-11-11:
      // an empty stretch of the chart should not feel dead).
      const tip = `${b}–${b + ELO_BIN - 1}: ${label}`, here = `${on ? "" : " is-empty"}${cur === b ? " is-cur" : ""}"${selected === b ? ' aria-current="true"' : ""}`;
      if (!links) return `<span class="elo-bar${on ? "" : " is-empty"}" data-tip="${tip}">${col}</span>`;
      return `<a class="elo-bar${here} href="#/browse/difficulty/${b}" aria-label="${label} rated ${b} to ${b + ELO_BIN - 1}" data-tip="${tip}">${col}</a>`;
    }).join("");
    const line = mark != null ? `<span class="elo-mark" style="left:${((Math.min(ELO_HI, Math.max(ELO_LO, mark)) - ELO_LO) / span * 100).toFixed(2)}%"></span>` : "";
    const ticks = Array.from({ length: Math.floor((ELO_HI - ELO_BIN - ELO_LO) / 800) + 1 }, (_, i) => ELO_LO + 800 * i).map(t => `<span style="left:${((t - ELO_LO) / span * 100).toFixed(2)}%">${t}</span>`).join("");
    return `<div class="elo-chart${compact ? " is-compact" : ""}${cur != null ? " has-cur" : ""}"><div class="elo-bars">${bars}${line}</div><div class="elo-ticks" aria-hidden="true">${ticks}</div></div>`;
  }
  // On a problem page: the rating, where it sits among its own contest's problems, and that
  // contest's chart with a line at the rating. The chips compare it with another contest instead:
  // every contest that has rated problems, HMMT February included (owner, 2026-11-11), so a
  // contest added later gets its chip without a change here.
  const ratedIn = fam => PROBLEM_DB.filter(p => Number.isFinite(p.elo) && (!fam || p.fam === fam));
  function eloNote(elo, fam, manual) {
    const pool = ratedIn(fam), below = pool.filter(q => q.elo < elo).length;
    return `Harder than ${Math.round(below / Math.max(1, pool.length) * 100)}% of ${fam || "all"} problems${manual ? " (estimated)" : ""}`;
  }
  function difficultyHtml(p) {
    if (!Number.isFinite(p.elo)) return `<p class="chain-empty">Not rated yet.</p>`;
    const fam = RATED_FAMS.includes(p.fam) ? p.fam : null, manual = p.eloSource === "manual";
    return `<div class="elo-box" data-elo="${p.elo}"${manual ? " data-manual" : ""}>
      <p class="elo-head"><span class="elo-num">${p.elo}</span><span class="elo-note">${eloNote(p.elo, fam, manual)}</span></p>
      <div class="elo-plot">${eloChartHtml({ shown: fam ? [fam] : RATED_FAMS, mark: p.elo, compact: true })}</div>
      <div class="fam-chips" role="group" aria-label="Compare with">${[...RATED_FAMS, null].map(f =>
        `<button type="button" class="fam-chip" data-elo-fam="${f ? famSlug(f) : "all"}" aria-pressed="${f === fam}">${f ? famDot(f) : ""}${f || "All contests"}</button>`).join("")}</div>
    </div>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-elo-fam]");
    if (!b) return;
    const box = b.closest(".elo-box"), elo = +box.dataset.elo, fam = FAM_BY_SLUG[b.dataset.eloFam] || null;
    box.querySelector(".elo-plot").innerHTML = eloChartHtml({ shown: fam ? [fam] : RATED_FAMS, mark: elo, compact: true });
    box.querySelector(".elo-note").textContent = eloNote(elo, fam, box.hasAttribute("data-manual"));
    box.querySelectorAll("[data-elo-fam]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });

  // ---------- Problems by topic, Problems by difficulty ----------
  // Two separate pages (owner, 2026-11-11). Both list problems grouped by contest, and both carry
  // the same contest chips: a chip switches its contest off and on, on the chart and in the lists.
  const BROWSE_PAGE = 30;
  let browseOff = new Set();          // contests switched off, kept while moving between pages
  let browseKey = "", browseOpen = new Set();   // groups opened in full on the current page
  const browseBackHtml = () => `<div class="back-row"><a class="back-link" href="#/practice" data-goto="pr-contests">${uiIcon("arrow-left")} Contests</a></div>`;
  function famChipsHtml(problems) {
    const fams = FAMILIES.filter(f => problems.some(p => p.fam === f));
    return `<div class="fam-chips" role="group" aria-label="Contests shown">${fams.map(f =>
      `<button type="button" class="fam-chip" data-br-fam="${escapeAttr(f)}" aria-pressed="${!browseOff.has(f)}">${famDot(f)}${f}<span class="br-count">${problems.filter(p => p.fam === f).length.toLocaleString()}</span></button>`).join("")}</div>`;
  }
  function browseGroupsHtml(key, problems, sort) {
    if (browseKey !== key) { browseKey = key; browseOpen = new Set(); }
    const groups = FAMILIES.filter(f => !browseOff.has(f)).map(f => {
      const list = problems.filter(p => p.fam === f).sort(sort);
      if (!list.length) return "";
      const shown = browseOpen.has(f) ? list : list.slice(0, BROWSE_PAGE);
      return `<section class="br-group"><h3 class="br-group-h">${famDot(f)}${f}<span class="br-count">${list.length} problem${list.length === 1 ? "" : "s"}</span></h3>
        <div class="br-list">${shown.map(p => `<a class="br-row" href="#/problem/${p.slug}" title="${escapeAttr(refShort(p.ref))}"><span class="br-ref">${refInGroup(p.ref)}</span><span class="br-elo">${Number.isFinite(p.elo) ? p.elo : "–"}</span></a>`).join("")}</div>
        ${list.length > shown.length ? `<button type="button" class="ct-toggle" data-br-more="${escapeAttr(f)}">Show all ${list.length}</button>`
          : list.length > BROWSE_PAGE ? `<button type="button" class="ct-toggle" data-br-less="${escapeAttr(f)}">Show less</button>` : ""}</section>`;
    }).join("");
    return groups || `<p class="chain-empty">No problems here.</p>`;
  }
  const eloOf = p => Number.isFinite(p.elo) ? p.elo : 1e9;
  const byEasiest = (a, b) => eloOf(a) - eloOf(b) || b.year - a.year || a.ref.localeCompare(b.ref, undefined, { numeric: true });
  const byNewest = (a, b) => b.year - a.year || a.ref.localeCompare(b.ref, undefined, { numeric: true });
  // The topic tree as a rail: every branch opens and closes in place, and the page beside it shows
  // the chosen topic. Subjects start open to their areas; the path to the chosen topic is opened.
  let ttOpen = new Set(TOPIC_ROOTS.map(r => r.id));
  function topicRailHtml(sel) {
    const row = (n, d) => {
      const kids = n.children.length, open = kids && ttOpen.has(n.id);
      return `<li><div class="tt-row${n.id === sel ? " is-cur" : ""}" style="--d:${d}">${kids
        ? `<button type="button" class="tt-tw" data-tt="${n.id}" aria-expanded="${!!open}" aria-label="${open ? "Collapse" : "Expand"} ${topicLabel(n)}">${uiIcon("chevron-right")}</button>`
        : `<span class="tt-tw" aria-hidden="true"></span>`}<a class="tt-name" href="${topicHash(n.id)}"${n.id === sel ? ' aria-current="page"' : ""}>${topicLabel(n)}</a><span class="br-count">${topicProblems(n.id).length.toLocaleString()}</span></div>${open ? `<ul>${n.children.map(c => row(TOPIC_NODES.get(c), d + 1)).join("")}</ul>` : ""}</li>`;
    };
    return `<ul class="tt-list">${TOPIC_ROOTS.map(r => row(r, 0)).join("")}</ul>`;
  }
  document.addEventListener("click", e => {
    const fold = e.target.closest("[data-tp-toggle]");
    if (fold) {
      topicProfileOpen = !topicProfileOpen;
      const y = window.scrollY;
      renderBrowse(getRoute());
      window.scrollTo(0, y);
      $content.querySelector("[data-tp-toggle]")?.focus({ preventScroll: true });
      return;
    }
    const tw = e.target.closest("[data-tt]");
    if (tw) {
      const rail = tw.closest(".tt"), top = rail.scrollTop, id = tw.dataset.tt;
      ttOpen.has(id) ? ttOpen.delete(id) : ttOpen.add(id);
      rail.querySelector(".tt-body").innerHTML = topicRailHtml(rail.dataset.sel || null);
      rail.scrollTop = top;
      rail.querySelector(`[data-tt="${id}"]`)?.focus({ preventScroll: true });
      return;
    }
    const fam = e.target.closest("[data-br-fam]"), more = e.target.closest("[data-br-more]"), less = e.target.closest("[data-br-less]"), mob = e.target.closest(".tt-mobile-btn");
    if (mob) { const open = mob.closest(".browse-topics").classList.toggle("rail-open"); mob.setAttribute("aria-expanded", String(open)); return; }
    // Show less folds a contest's list back to its first rows and brings its heading into view,
    // since the button sat at the foot of a long list that has just gone.
    if (less) {
      const f = less.dataset.brLess;
      browseOpen.delete(f);
      renderBrowse(getRoute());
      const again = $content.querySelector(`[data-br-more="${CSS.escape(f)}"]`), head = again?.closest(".br-group")?.querySelector(".br-group-h");
      if (head) { const top = head.getBoundingClientRect().top; if (top < (document.querySelector(".topbar")?.offsetHeight || 0) + 8 || top > window.innerHeight) window.scrollTo({ top: window.scrollY + top - (document.querySelector(".topbar")?.offsetHeight || 0) - 14, behavior: "instant" }); }
      again?.focus({ preventScroll: true });
      return;
    }
    if (!fam && !more) return;
    if (fam) {
      const f = fam.dataset.brFam;
      browseOff.has(f) ? browseOff.delete(f) : browseOff.add(f);
      // Switching the last contest off would leave nothing: it brings them all back instead.
      if ([...fam.parentNode.querySelectorAll("[data-br-fam]")].every(b => browseOff.has(b.dataset.brFam))) browseOff = new Set();
    } else browseOpen.add(more.dataset.brMore);
    const y = window.scrollY, name = fam ? "data-br-fam" : null, value = fam && fam.dataset.brFam;
    renderBrowse(getRoute());
    window.scrollTo(0, y);
    if (name) $content.querySelector(`[${name}="${CSS.escape(value)}"]`)?.focus({ preventScroll: true });
    else if (more) $content.querySelector(`[data-br-less="${CSS.escape(more.dataset.brMore)}"]`)?.focus({ preventScroll: true });
  });
  function renderBrowse(route) {
    shownIds = [];
    const railTop = $content.querySelector(".tt")?.scrollTop ?? null;
    if (route.kind === "topics") {
      const node = (route.node && TOPIC_NODES.get(route.node)) || null;
      if (node) topicPath(node.id).forEach(n => { if (n.children.length) ttOpen.add(n.id); });
      let main;
      if (!node) {
        main = `<div class="detail-head"><h2 class="card-name">Problems by topic</h2></div>
          <p class="practice-panel-intro">Every problem is filed in one tree of topics, from a subject down to a specific kind of problem. Choose a topic to see its problems, grouped by contest.</p>
          <div class="br-subjects">${TOPIC_ROOTS.map(r => `<section class="br-subject"><h3><a href="${topicHash(r.id)}">${topicLabel(r)}</a><span class="br-count">${topicProblems(r.id).length.toLocaleString()} problems</span></h3>
            <ul>${r.children.map(c => TOPIC_NODES.get(c)).map(c => `<li><a href="${topicHash(c.id)}">${topicLabel(c)}</a><span class="br-count">${topicProblems(c.id).length}</span></li>`).join("")}</ul></section>`).join("")}</div>`;
      } else {
        const all = topicProblems(node.id), kids = node.children.map(c => TOPIC_NODES.get(c));
        const crumbs = [`<a href="#/browse/topics">Topics</a>`, ...topicPath(node.id).slice(0, -1).map(n => `<a href="${topicHash(n.id)}">${topicLabel(n)}</a>`)].join(` <span aria-hidden="true">›</span> `);
        main = `<div class="br-crumbs">${crumbs}</div>
          <div class="detail-head"><h2 class="card-name">${node.name}</h2></div>
          <p class="practice-panel-intro">${all.length.toLocaleString()} problem${all.length === 1 ? "" : "s"}${kids.length ? ", including its subtopics" : ""}. Each contest's problems run from easiest to hardest.</p>
          ${kids.length ? `<div class="br-kids"><span class="br-kids-l">Subtopics</span>${kids.map(c => `<a class="br-kid" href="${topicHash(c.id)}">${topicLabel(c)}<span class="br-count">${topicProblems(c.id).length}</span></a>`).join("")}</div>` : ""}
          ${topicProfileHtml(node, all)}
          <h3 class="pp-h tp-problems-h">Problems</h3>
          ${famChipsHtml(all)}
          ${browseGroupsHtml("t:" + node.id, all, byEasiest)}`;
      }
      $content.innerHTML = `<div class="detail browse-page">${browseBackHtml()}<div class="book-eyebrow prob-eyebrow">Practice</div>
        <div class="browse-topics${node ? "" : " is-index"}">
          <button type="button" class="ct-toggle tt-mobile-btn" aria-expanded="false">All topics</button>
          <nav class="tt" aria-label="Topics" data-sel="${node ? node.id : ""}"><div class="tt-h">Topics</div><div class="tt-body">${topicRailHtml(node && node.id)}</div></nav>
          <div class="browse-main">${main}</div>
        </div></div>`;
      const rail = $content.querySelector(".tt"), cur = rail.querySelector(".tt-row.is-cur");
      if (railTop != null) rail.scrollTop = railTop;
      if (cur) {
        // Keep the chosen topic in view inside the rail, without moving the page.
        const r = cur.getBoundingClientRect(), box = rail.getBoundingClientRect();
        if (r.top < box.top + 8 || r.bottom > box.bottom - 8) rail.scrollTop += r.top - box.top - box.height / 3;
      }
    } else {
      const rated = PROBLEM_DB.filter(p => Number.isFinite(p.elo));
      const active = RATED_FAMS.filter(f => !browseOff.has(f));
      const inBinN = b => rated.filter(p => binOf(p.elo) === b && active.includes(p.fam)).length;
      const filled = eloBins().filter(b => inBinN(b));
      // With no range chosen, the fullest one opens, so the page never starts empty.
      const bin = route.bin != null ? binOf(route.bin) : filled.slice().sort((a, b) => inBinN(b) - inBinN(a))[0] ?? ELO_LO;
      const inBin = rated.filter(p => binOf(p.elo) === bin);
      const prev = filled.filter(b => b < bin).pop(), next = filled.find(b => b > bin);
      const step = (b, dir, label) => b != null ? `<a class="br-step" href="#/browse/difficulty/${b}" aria-label="${label}: ${b} to ${b + ELO_BIN - 1}">${uiIcon("chevron-" + dir)}</a>` : `<span class="br-step is-off" aria-hidden="true">${uiIcon("chevron-" + dir)}</span>`;
      const shownN = inBin.filter(p => active.includes(p.fam)).length;
      $content.innerHTML = `<div class="detail browse-page">${browseBackHtml()}<div class="book-eyebrow prob-eyebrow">Practice</div>
        <div class="detail-head"><h2 class="card-name">Problems by difficulty</h2></div>
        <p class="practice-panel-intro">Every problem has an Elo rating: the higher the rating, the harder the problem. The chart shows how the ratings spread; choose a bar to list the problems in that range.</p>
        <section class="elo-panel">${famChipsHtml(rated)}${eloChartHtml({ active, selected: bin })}</section>
        <div class="br-band">${step(prev, "left", "Easier range")}<h3 class="br-band-h">Rated ${bin} to ${bin + ELO_BIN - 1}</h3>${step(next, "right", "Harder range")}<span class="br-count">${shownN.toLocaleString()} problem${shownN === 1 ? "" : "s"}</span></div>
        ${browseGroupsHtml("d:" + bin, inBin, byNewest)}</div>`;
    }
    renderMath($content);
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
  function showSolution(p, box = "#prob-sol") {
    loadSolutions(p.year).then(() => {
      const sol = window.MATH_SOLUTIONS && window.MATH_SOLUTIONS[p.slug];
      const wrap = $content.querySelector(`${box}[data-slug="${p.slug}"]`);
      if (!sol || !wrap) return;
      wrap.querySelector(".prob-solution-body").innerHTML = detailBodyHtml(sol, "sol:" + p.slug);
      wrap.hidden = false;
      renderMath(wrap);
    });
  }

  // The "How this problem works" box. With Settings -> Practice -> Strategy on "Click to show",
  // its contents wait behind a button so the reader can try the problem first.
  // A figure we drew for a problem printed without one is help a contestant would not have, so it
  // shows only here, with the solution: under the box's title, above the strategy (owner, 2026-10-31).
  function ownFigureHtml(p) {
    const fig = (window.MATH_PROBLEM_DIAGRAMS || {})[p.slug];
    return fig ? `<div class="diagram prob-own-figure">${fig}</div>` : "";
  }
  // How this problem works in sections (owner, 2026-11-11), each headed like Study a concept
  // more: Topic (where it sits in the topic tree), Difficulty (its Elo among its contest's),
  // Brief solution (the strategy and its cards), then Study a concept more.
  const chainSec = (title, body) => `<div class="chain-study chain-sec"><h4 class="chain-study-h">${title}</h4>${body}</div>`;
  function chainInnerHtml(p, chainCol, chain, altIds, afterChain = "") {
    return `<div class="chain-duo">${chainSec("Topic", topicTreeHtml(p))}${chainSec("Difficulty", difficultyHtml(p))}</div>
        ${chainSec("Brief solution", `${ownFigureHtml(p)}${p.strategy ? `<p class="chain-strategy">${p.strategy}</p>`
          // No solution of our own for these (owner, 2026-11-12): the contest's official one is a click away.
          : p.solUrl ? `<p class="chain-strategy chain-official"><a class="aops-btn" href="${escapeAttr(p.solUrl)}" target="_blank" rel="noopener noreferrer">${p.solAops ? "Open the solutions on AoPS" : "Open the official solution"} <span aria-hidden="true">${uiIcon("arrow-up-right")}</span></a><span class="chain-official-note">${p.solAops ? "The Art of Problem Solving wiki's page for this problem, with its solutions." : (p.fam === "ARML" ? `The contest's official booklet, open at the Individual round's solutions${p.num ? `; this is problem I-${p.num}` : ""}.` : `The round's official solutions, as one PDF${p.num ? `; this is problem ${p.num}` : ""}.`)}</span></p>` : ""}
        ${p.trick ? `<p class="chain-strategy chain-alt">${p.trick}</p>` : ""}
        <div class="chain-grid">
          ${chainCol("Pattern", chain.pattern, "Not classified yet")}
          ${chainCol("Method", chain.method, "Not classified yet")}
          ${chainCol("Formulas", chain.formula, "&mdash;")}
        </div>
        ${altIds.size ? `<p class="chain-alt-note">Dashed cards belong to the second route only.</p>` : ""}
        ${afterChain}`)}${studyMoreHtml(p, chain)}`;
  }
  // Study a concept more (owner, 2026-11-01): under the three columns, one link per card the
  // problem uses, to the lesson that teaches that card. An AIME problem prefers an AIME book's
  // lesson and any other problem an AMC book's; a card no lesson teaches gets no link.
  let LESSONS_BY_CARD = null;
  function lessonForCard(fid, aime) {
    const lessons = lessonsForCard(fid);
    return lessons.find(x => x.taught && x.b.id.startsWith(aime ? "aime-" : "amc-"))
      || lessons.find(x => x.taught && /^(amc|aime)-/.test(x.b.id)) || null;
  }
  function lessonsForCard(fid) {
    if (!LESSONS_BY_CARD) {
      LESSONS_BY_CARD = {};
      for (const b of LEARN_SHELF) {
        for (const c of b.chapters) for (const l of c.lessons) {
          const d = learnLessonData(c, l);
          if (!d) continue;
          const taught = new Set(d.cards || []);
          const ids = new Set([...taught, ...(d.related || []).map(r => r.card)]);
          for (const m of (d.body || "").matchAll(/\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g)) ids.add(m[1]);
          for (const id of ids) (LESSONS_BY_CARD[id] ||= []).push({ b, c, l, taught: taught.has(id) });
        }
      }
    }
    return LESSONS_BY_CARD[fid] || [];
  }
  function studyLessonLink({ b, c, l }) {
    return `<a class="chain-study-link" href="${learnHash(b, c, lessonNum(l))}">${escapeAttr(b.title)} · ${escapeAttr(l.title)} <span class="chain-study-l">${l.code}</span></a>`;
  }
  // Study this more on a card page (owner, 2026-11-07): only the lessons whose "Teaches you
  // about" row lists the card, not every lesson that links or relates to it, one per bullet.
  function cardLessonsHtml(fid) {
    const lessons = lessonsForCard(fid).filter(({ l, taught }) => taught && l.title !== "Summary");
    if (!lessons.length) return "";
    const items = lessons.map(x => `<li>${studyLessonLink(x)}</li>`);
    return `<div class="related"><h4>Study this more</h4><ul class="card-study-list">${items.join("")}</ul></div>`;
  }
  function studyMoreHtml(p, chain) {
    const aime = /AIME/.test(p.ref || p.cname || "");
    const ids = [...new Set([...chain.pattern, ...chain.method, ...chain.formula])];
    const route = getRoute();
    const current = route.type === "learn" && route.lesson
      ? learnHash(route.book, route.chapter, lessonNum(route.lesson)) : null;
    const lessons = ids.map(fid => lessonForCard(fid, aime)).filter(Boolean)
      .filter(({ b, c, l }) => learnHash(b, c, lessonNum(l)) !== current);
    const links = [...new Set(lessons.map(studyLessonLink))];
    return links.length ? `<div class="chain-study"><h4 class="chain-study-h">Study a concept more</h4><div class="chain-study-links">${links.join("")}</div></div>` : "";
  }
  // How this problem works: its tags split by kind into the chain Pattern -> Method ->
  // Formulas. A link nobody has classified yet is shown as missing, never invented.
  // The second good route's cards (the "Alternatively, ..." paragraph) sit in the same three
  // columns, outlined dashed, so both routes read as Pattern -> Method -> Formulas.
  function chainParts(p) {
    const chain = { pattern: [], method: [], formula: [] };
    p.formulas.forEach(fid => chain[kindOf(BY_ID[fid].formula)].push(fid));
    p.trickFormulas.forEach(fid => chain[kindOf(BY_ID[fid].formula)].push(fid));
    const altIds = new Set(p.trickFormulas);
    const chainChip = fid => `<a class="related-item${altIds.has(fid) ? " chain-alt-card" : ""}" href="#/f/${fid}">${BY_ID[fid].formula.name}</a>`;
    // One box: the strategy in a few sentences, then the three cards it connects side by side.
    const chainCol = (label, ids, empty) => `<div class="chain-col"><div class="chain-label">${label}</div><div class="chain-cards">${ids.length ? ids.map(chainChip).join("") : `<span class="chain-empty">${empty}</span>`}</div></div>`;
    return { chain, altIds, chainCol };
  }
  function chainBoxHtml(p, chainCol, chain, altIds, preview) {
    const inner = chainInnerHtml(p, chainCol, chain, altIds);
    // A small "+ Show" / "- Hide" beside the heading opens and closes the strategy, like the
    // new-list + (owner, 2026-10-31). Click to show starts it closed; Shown starts it open.
    const can = !!(p.strategy || p.solUrl || p.formulas.length);
    const key = "problem-" + p.slug;
    const open = (!preview ? savedStrategy(key) : undefined) ?? (state.strategy !== "click");
    const hide = can && !open;
    return `<div class="prob-chain"><div class="chain-head"><h4>How this problem works</h4>${can ? `<button type="button" class="chain-toggle" ${preview ? "" : `data-solution-key="${key}"`} aria-expanded="${!hide}">${uiIcon(hide ? "plus" : "minus")} ${hide ? "Show" : "Hide"}</button>` : ""}</div>
        <div class="chain-body"${hide ? " hidden" : ""}>${inner}</div>
      </div>`;
  }

  const backToLearnHtml = key => backFromLearn && backFromLearn.to === key
    ? `<a class="back-link" href="${backFromLearn.hash}" data-history-back>${uiIcon("arrow-left")} Back to ${escapeAttr(backFromLearn.label)}</a>` : "";
  // A problem page's markup, shared by the page itself and the Settings preview (pv), so the
  // preview shows exactly what the page does (owner, 2026-10-31). The preview has no journey to
  // go back along, and its statement and solution boxes carry classes instead of the page's ids.
  function problemDetailHtml(p, pv) {
    // The topic chips once under the heading are retired (owner, 2026-11-11): the Topic section
    // of How this problem works shows the problem's place in the topic tree instead.
    // How this problem works sits near the bottom of the page: the problem itself, and thinking
    // about it, come first.
    const { chain, altIds, chainCol } = chainParts(p);
    const chainHtml = chainBoxHtml(p, chainCol, chain, altIds, pv);
    // A geometry problem printed without a figure gets one drawn for the app
    // (js/data/diagrams/problem-diagrams.js), labelled as ours; it shows only inside How this
    // problem works (ownFigureHtml).
    return `
      <div class="detail">
        <div class="back-row">
          ${pv ? "" : backToLearnHtml("problem:" + p.slug)}
          ${!pv && backFromProblem && backFromProblem.slug === p.slug && BY_ID[backFromProblem.fid]
            ? `<a class="back-link" href="#/f/${backFromProblem.fid}">${uiIcon("arrow-left")} Back to ${escapeAttr(BY_ID[backFromProblem.fid].formula.name)}</a>`
            : ""}
          <a class="back-link" href="#/problems/${famSlug(p.fam)}/${p.year}">${uiIcon("arrow-left")} ${escapeAttr(p.fam)} ${p.year}</a>
        </div>
        <div class="book-eyebrow prob-eyebrow">Practice</div>
        <div class="detail-head">
          <h2 class="card-name">${refShort(p.ref)}</h2>
        </div>
        ${MAA_RE.test(p.ref) ? `<section class="prob-st${pv ? " pv-st" : ""}"${pv ? "" : ` id="prob-st"`} data-slug="${p.slug}" hidden>
          <div class="prob-statement"></div>

        </section>` : ""}
        <p class="prob-note">${p.urlLabel === "archive" ? (p.fam === "ARML" ? `The statement is in the contest's official booklet, open at the Individual round${p.num ? `; this is problem I-${p.num}` : ""}.` : `The statement is in the round's official paper, as one PDF${p.num ? `; this is problem ${p.num}` : ""}.`) : "Solutions live on the Art of Problem Solving wiki."}</p>
        ${p.url ? `<a class="aops-btn" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">${p.urlLabel === "archive" ? "Open the official paper" : "Open on AoPS"} <span aria-hidden="true">${uiIcon("arrow-up-right")}</span></a>` : ""}
        ${chainHtml}
        ${SOLUTION_YEARS.has(String(p.year)) ? `<section class="prob-chain prob-solution${pv ? " pv-sol" : ""}"${pv ? "" : ` id="prob-sol"`} data-slug="${p.slug}" hidden>
          <h4>Solution</h4>
          <div class="detail-body prob-solution-body"></div>
        </section>` : ""}
        ${contestNavHtml(p)}
      </div>`;
  }
  function renderProblemDetail(slug) {
    const p = PROBLEM_BY_SLUG[slug];
    if (!p) { location.hash = "#/practice"; return; }
    noteRecent("p:" + p.slug);
    shownIds = [];
    $content.innerHTML = problemDetailHtml(p, false);
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
  // A problem or card opened from a lesson or a review: one hop back to it. The link steps back
  // in history, so the lesson opens where the student was reading.
  let backFromLearn = null;     // { to: route key, hash, label }
  let prevRoute = null, prevRouteKey = null;

  function routeKey(r) {
    return r.type + ":" + (r.entry ? r.entry.formula.id
      : r.slug || r.listId || r.key || (r.labels ? r.labels.join("+") : "") || r.fam || (r.name ? r.name + "/" + r.arg : "")
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
    if ((route.type === "problem" || route.type === "formula") && prev && prev.type === "learn") {
      backFromLearn = { to: key, hash: learnHash(prev.book, prev.chapter, prev.lesson ? lessonNum(prev.lesson) : prev.challenge ? "challenge" : prev.review ? "review" : null),
        label: prev.lesson ? prev.lesson.code : prev.challenge ? prev.chapter.code + " challenge" : prev.review ? prev.chapter.code + " review" : prev.chapter.code };
    } else if (!backFromLearn || backFromLearn.to !== key) backFromLearn = null;
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
  // Filter the contest first, then rank its own Elo values. Any remains an unfiltered uniform draw.
  function randomProblemTo(arg) {
    const m = String(arg || "").match(/^(?:(.*?)\/)?(very[- ]easy|easy|medium|hard|very[- ]hard)$/i);
    const a = resolveContest(m ? (m[1] || "") : arg), band = m ? m[2].toLowerCase().replace(/ /g, "-") : "";
    const family = FAMILIES.find(f => normKey(f) === a);
    // Exact family matching also includes AJHSME in AMC 8; paper/year command arguments still work.
    const pool = PROBLEM_DB.filter(p => !a || (family ? p.fam === family : normKey(p.ref).includes(a)));
    const chosen = problemDifficulty.pick(pool, band);
    return chosen ? "#/problem/" + chosen.slug : null;
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
        PROBLEM_DB.forEach(p => { bands[paperPositionBand(p)]++; });
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
        (cmd.name === "RandomStarred" || /^starred$/i.test(route.arg || "")) ? `Your Starred list is empty. Use a card's star button ${uiIcon("star-outline")} first.` : "Nothing matches that."}</p>`);
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
      const m = base.match(/^(Fall )?(AMC 1[02]|AIME|HMMT February|HMMT November|HMMT|ARML|SMT)/);
      if (m && m[2] !== base) bump(m[2]);
      if (/^HMMT (February|November)/.test(base) && base !== "HMMT") bump("HMMT");
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
    if (t) t.scrollIntoView({ behavior: window.AppAccessibility.scrollBehavior(), block: "start" });
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
    cancelPracticeFinishConfirm();
    clearInterval(mockClockInterval);mockClockInterval=0;
    const route = getRoute();
    // Leaving a list closes its group editor, tidying the sections as Done would.
    if (groupEdit && !(route.type === "list" && route.listId === groupEdit.listId)) {
      const l = geList();
      groupEdit = null;
      geTidy(l);
    }
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
      renderTagPage(route.labels);
    } else if (route.type === "lists") {
      renderListSurface(route);
    } else if (route.type === "list") {
      renderListDetail(route.listId);
    } else if (route.type === "problems") {
      renderProblems(route);
    } else if (route.type === "problem") {
      renderProblemDetail(route.slug);
    } else if (route.type === "browse") {
      renderBrowse(route);
    } else if (route.type === "settings") {
      renderSettingsPage();
    } else if (route.type === "special") {
      renderSpecial(route);
    } else if (route.type === "space") {
      if (route.practiceSet) renderTopicPracticeSet();
      else renderSpaceHome(route.name);
    } else if (route.type === "learn") {
      renderLearn(route);
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
    const noSidebar = onLanding || searching || ["problems", "problem", "browse", "lists", "settings", "space", "learn"].indexOf(route.type) !== -1
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
    syncSidebarAvailability();
    updateGearActive();
    if (route.type === "list") buildListToc();
    else if (route.type !== "formula") clearPageToc();
    if (route.type === "list" && pendingRename === route.listId) { pendingRename = null; startListRename(route.listId); }
    // Showing or hiding the sidebar changes the card width, so the formulas are fitted again.
    fitCardFormulas($content);
    updatePageTitle(route);
  }

  function updatePageTitle(route, paper) {
    const brand = "Competition Math Reference";
    let label;
    if (route.type === "home" && state.query.trim()) label = "Search: " + state.query.trim();
    else if (route.type === "home" && state.landing) label = "";
    else if (route.type === "formula") label = route.entry.formula.name;
    else if (route.type === "problem") label = refShort(PROBLEM_BY_SLUG[route.slug].ref);
    else if (route.type === "problems") {
      const selected = $content.querySelector('.ct-papers [aria-selected="true"]');
      label = paper ? (/^\d{4}/.test(paper) ? paper : route.year + " " + paper) : (selected && (route.paper || selected.getClientRects().length) ? route.year + " " + selected.textContent : route.year + " " + (FAM_BY_SLUG[route.fam] || route.fam));
    } else if (route.type === "learn") label = [route.howto ? "How to Use This Book" : route.review ? "Review Problems" : route.challenge ? "Challenge Problems" : route.lesson ? route.lesson.code + " " + route.lesson.title : route.chapter?.title, route.book.title].filter(Boolean).join(" · ");
    else if (route.practiceSet && topicPracticeSet) label = [topicPracticeSet.status === 'finished' ? location.hash.endsWith('/review') ? 'Review' : 'Results' : null, isMock(topicPracticeSet) ? 'Mock set' : 'Practice set', practiceSetLabel(topicPracticeSet)].filter(Boolean).join(' · ');
    else label = $content.querySelector("h2")?.textContent || SPACES[state.space]?.label;
    label = String(label || "").replace(/<[^>]*>/g, "").replace(/\$/g, "").replace(/\\([a-z]+)/gi, "$1").replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
    document.title = label && label !== brand ? label + " — " + brand : brand;
  }

  // ---------- Sidebar ----------




  const LIST_KINDS = [["route", "Study Routes"], ["core", "Starting Points"],
                      ["configuration", "Configurations"], ["thinking", "Ways of Thinking"], ["curiosity", "Curiosities"]];

  function buildSidebar() {
    // Four groups, one per space, only the current space's shown: FORMULAS lists its subjects
    // with their topics, METHODS and PATTERNS list their subjects with their groups, and
    // PROBLEMS lists the practice surfaces.
    const order = ["formulas", "methods", "patterns", "learn", "practice"];
    const byGroup = new Map(order.map(g => [g, []]));
    SECTIONS.forEach(section => byGroup.get(groupOf(section)).push(section));
    // Practice links go to other surfaces, so they are plain links, not section rows (the
    // section-row click handling would read them as a section with no id).
    const practiceRows = `
      <a class="nav-practice-link" href="#/practice" data-goto="pr-contests" data-goto-center>Contests</a>
      <a class="nav-practice-link" href="#/special/randomproblem">A random problem</a>`;
    const learnRows = `
      <a class="nav-practice-link" href="#/learn" data-goto="learn-books">Textbooks</a>
      <a class="nav-practice-link" href="#/learn" data-goto="pr-study">Lists</a>`;
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
            `<a class="nav-sub-link" href="${escapeAttr(sectionHash(section.id, { sub:i, cluster:j }))}" data-section="${section.id}" data-sub="${i}" data-cluster="${j}">${g.title}</a>`).join("")}
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
            `<a class="nav-sub-link" href="${escapeAttr(sectionHash(section.id, { topic:i }))}" data-section="${section.id}" data-sub="${i}">${sub.title}</a>`).join("")}
        </div></div>
      </div>`;
    $sidebar.innerHTML = `<div id="formula-nav">` + order.map(group => `
      <div class="nav-group" data-group="${group}">
        <div class="nav-space-head">
          ${group === "practice" || group === "learn"
            ? `<a class="nsh-label" href="#/${group}" title="${group === "learn" ? "Textbooks, study lists, and your lists" : "Contests and random problems"}">${SPACES[group].label}</a>`
            : `<span class="nsh-label">${SPACES[group].label}</span><button type="button" class="nsh-info" data-info="${group}" aria-label="About ${SPACES[group].label}" aria-expanded="false">${uiIcon("info")}</button>`}
          <span class="nsh-ask">${SPACES[group].ask}</span>
        </div>
        <div class="nav-group-body"><div class="nav-group-inner">
          ${group === "practice" ? practiceRows : group === "learn" ? learnRows : ""}
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
      if (link && (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) return;
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
        e.preventDefault();
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
        a.tabIndex = -1;
        a.title = "No cards here match the current filters";
      } else {
        a.removeAttribute("aria-disabled");
        a.removeAttribute("tabindex");
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
      const expanded = isActive && state.navCollapsed !== el.dataset.section + ":" + (el.dataset.subject === undefined ? null : +el.dataset.subject);
      el.classList.toggle("open", expanded);
      const subs = el.querySelector(".nav-subs"), btn = el.querySelector(".nav-section-btn");
      if (subs) {
        subs.id = "nav-subs-" + el.dataset.section + "-" + (el.dataset.subject ?? "all");
        subs.inert = !expanded;
      }
      if (btn) {
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-expanded", String(expanded));
        if (subs) btn.setAttribute("aria-controls", subs.id);
      }
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
  // Focusing the search box must not move the page (owner, 2026-11-08). The box sits in the
  // sticky top bar, and Chrome, scrolling a newly focused box "into view", measures from the
  // bar's place in the page, so the page used to glide part of the way up on every click into
  // the box. A mouse click now focuses it without scrolling (the caret goes to the end, where
  // a query is edited); focus reached any other way (Tab, a tap) puts the page back at once.
  $search.addEventListener("mousedown", e => {
    if (e.button !== 0 || document.activeElement === $search || e.sourceCapabilities?.firesTouchEvents) return;
    e.preventDefault();
    $search.focus({ preventScroll: true });
    const n = $search.value.length;
    try { $search.setSelectionRange(n, n); } catch (err) {}
  });
  // The page's place before the box had focus: the glide starts before the focus event fires.
  let searchRestY = window.scrollY;
  window.addEventListener("scroll", () => { if (document.activeElement !== $search) searchRestY = window.scrollY; }, { passive: true });
  // A tap: focus on the finger's release, without the browser's scroll (allowed there, as the
  // tap is still the user's gesture).
  $search.addEventListener("touchend", e => {
    if (document.activeElement === $search || e.touches.length) return;
    e.preventDefault();
    $search.focus({ preventScroll: true });
    const n = $search.value.length;
    try { $search.setSelectionRange(n, n); } catch (err) {}
  }, { passive: false });
  // Any other way in (Tab): hold the page where it was for as long as the browser's glide lasts.
  $search.addEventListener("focus", () => {
    const y = searchRestY, until = performance.now() + 450;
    const hold = () => {
      if (document.activeElement !== $search || state.query.trim()) return;
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: "instant" });
      if (performance.now() < until) requestAnimationFrame(hold);
    };
    hold();
  });
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
    if (window.AppAccessibility.reducedMotion() || (e.deltaMode === 0 && Math.abs(e.deltaY) < 40)) {
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
      if (window.AppAccessibility.reducedMotion()) { scrollSet(a.el, a.to); wheelAnim = null; return; }
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
  function closeSpaceInfo(restore = true) {
    if (!infoEl) return;
    const el = infoEl;
    infoEl = null;
    el.remove();
    releaseModal(el, restore);
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
          <button class="modal-close" aria-label="Close">${uiIcon("close")}</button>
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
      const a = e.target.closest("a");
      // A link here is a fresh navigation: drop any search still in the box, or the page
      // would keep showing the results and the link would seem to do nothing.
      if (a && (state.query.trim() || state.adv)) {
        clearSearch();
        if (a.getAttribute("href") === location.hash) { e.preventDefault(); render(); }
      }
      // Following a link goes somewhere new, so the focus is not sent back to the "i".
      if (e.target === infoEl || e.target.closest(".modal-close") || a) closeSpaceInfo(!a);
    });
    renderMath(infoEl);
    trapModal(infoEl, ".modal-close");
  }
  document.addEventListener("click", e => {
    const btn = e.target.closest && e.target.closest(".nsh-info");
    if (btn) openSpaceInfo(btn.dataset.info);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSpaceInfo(); });
  window.addEventListener("hashchange", () => closeSpaceInfo(false));

  // Space switcher in the top bar: Learn and Practice open their own pages; the other spaces
  // open the subject last visited in them.
  const $spaceSwitch = document.getElementById("space-switch");
  // Formulas, Methods and Patterns sit behind one Reference menu at every width (owner,
  // 2026-11-11; on a narrow phone since 2026-10-31).
  const $refBtn = document.getElementById("space-ref-btn"), $refMenu = document.getElementById("space-ref-menu");
  const closeRefMenu = () => { if ($refMenu && !$refMenu.hidden) { $refMenu.hidden = true; $refBtn.setAttribute("aria-expanded", "false"); } };
  if ($refBtn && $refMenu) {
    $refBtn.addEventListener("click", e => {
      e.stopPropagation();
      $refMenu.hidden = !$refMenu.hidden;
      $refBtn.setAttribute("aria-expanded", String(!$refMenu.hidden));
    });
    document.addEventListener("click", e => { if (!e.target.closest(".space-ref")) closeRefMenu(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeRefMenu(); });
  }
  // A phone's search box gets a short placeholder; the long one would be cut off.
  (() => {
    const box = document.getElementById("search-input"), mq = window.matchMedia && window.matchMedia("(max-width: 760px)");
    if (!box || !mq) return;
    const long = box.getAttribute("placeholder");
    const fit = () => box.setAttribute("placeholder", mq.matches ? "Search\u2026" : long);
    fit();
    if (mq.addEventListener) mq.addEventListener("change", fit);
  })();
  if ($spaceSwitch) $spaceSwitch.addEventListener("click", e => {
    const b = e.target.closest("[data-space-go]");
    if (!b) return;
    closeRefMenu();
    clearSearch();
    closeDrawer();
    state.landing = false;
    const go = b.dataset.spaceGo;
    const to = go === "practice" || go === "learn" ? "#/" + go : spaceEntry(go);
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
  const drawerMedia = window.matchMedia('(max-width: 760px)');
  function syncSidebarAvailability() {
    const open = document.body.classList.contains('nav-open');
    $sidebar.inert = drawerMedia.matches && !open;
    $navToggle?.setAttribute('aria-expanded', String(open));
    $navToggle?.setAttribute('aria-label', open ? 'Close section menu' : 'Open section menu');
  }
  function drawerItems() {
    return [...$sidebar.querySelectorAll('a[href], button:not([disabled])')].filter(el => !el.closest('[inert]') && el.getClientRects().length);
  }
  function openDrawer() {
    document.body.classList.add("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = false;
    syncSidebarAvailability();
    drawerItems()[0]?.focus({ preventScroll:true });
  }
  function closeDrawer(restore = false) {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = true;
    syncSidebarAvailability();
    if (restore) $navToggle?.focus({ preventScroll:true });
  }
  drawerMedia.addEventListener('change', () => { if (!drawerMedia.matches) closeDrawer(); syncSidebarAvailability(); });
  if ($navToggle) $navToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) closeDrawer(true); else openDrawer();
  });
  if ($navBackdrop) $navBackdrop.addEventListener("click", () => closeDrawer(true));
  document.addEventListener("keydown", e => {
    if (!document.body.classList.contains('nav-open') || openModals.length) return;
    if (e.key === "Escape") { e.preventDefault(); closeDrawer(true); }
    else if (e.key === 'Tab') {
      const items = drawerItems(), at = items.indexOf(document.activeElement);
      if (!items.length) return;
      if ((e.shiftKey && at <= 0) || (!e.shiftKey && (at < 0 || at === items.length - 1))) {
        e.preventDefault(); items[e.shiftKey ? items.length - 1 : 0].focus();
      }
    }
  });

  // Lists → the Lists part of the Learn page.
  const $listsBtn = document.getElementById("lists-btn");
  if ($listsBtn) $listsBtn.addEventListener("click", () => {
    clearSearch();
    if (location.hash === "#/learn") render(); else location.hash = "#/learn";
    seekPart("pr-study");
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
    r.setAttribute("data-lesson-width", state.lessonWidth);
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

  // Links that open a page at one of its parts (the home page's "Make a list" goes to the new-list
  // box and "Open a list" to the Study lists section of the Learn page): once the page has
  // rendered, scroll the part into view, a text box centred with the cursor in it, a section
  // with its heading just under the top bar.
  document.addEventListener("click", e => {
    // Every link in the drawer's Learn and Practice groups closes the drawer (owner, 2026-10-31).
    if (e.target.closest("a.nav-practice-link")) closeDrawer();
    const a = e.target.closest("a[data-goto]");
    if (!a) return;
    closeDrawer();
    seekPart(a.getAttribute("data-goto"), a.hasAttribute("data-goto-center"));
  });
  function seekPart(id, center) {
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        if (center) {
          // Centred in the screen below the top bar (Practice's Contests link, owner, 2026-10-31).
          const bar = document.querySelector(".topbar"), barH = bar ? bar.offsetHeight : 0;
          const r = el.getBoundingClientRect(), room = window.innerHeight - barH;
          const top = r.top + window.scrollY - barH - Math.max(14, (room - r.height) / 2);
          window.scrollTo({ top: Math.max(0, top), behavior: window.AppAccessibility.scrollBehavior() });
        } else if (el.tagName === "INPUT") {
          (el.closest(".hp-panel") || el).scrollIntoView({ block: "center" });
          el.focus({ preventScroll: true });
        } else {
          const bar = document.querySelector(".topbar");
          window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 14), behavior: "instant" });
        }
      } else if (++tries < 40) setTimeout(seek, 25);
    };
    setTimeout(seek, 0);
  }

  // Settings → the preferences page.
  const $settingsBtn = document.getElementById("settings-btn");
  if ($settingsBtn) $settingsBtn.addEventListener("click", () => {
    clearSearch();
    if (getRoute().type === "settings") return;
    if (location.hash === "#/settings") render(); else location.hash = "#/settings";
    window.scrollTo({ top: 0 });
  });

  // ---------- Dialogs: focus goes in, stays in, and comes back ----------
  // Filters, Browse by tag and a space's "i" box are modal (a report, 2026-10-31): opening one
  // moves the keyboard focus into it, Tab and Shift+Tab cycle inside it, nothing behind it can be
  // reached (the "/" shortcut included), and closing it returns the focus to whatever opened it.
  const openModals = [];
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function trapModal(overlay, first) {
    const dlg = overlay.querySelector('[role="dialog"]') || overlay;
    dlg.setAttribute("aria-modal", "true");
    if (!dlg.hasAttribute("tabindex")) dlg.tabIndex = -1;
    const items = () => [...dlg.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length);
    const m = { overlay, dlg, opener: document.activeElement };
    m.onKey = e => {
      if (e.key !== "Tab" || openModals[openModals.length - 1] !== m) return;
      const f = items();
      if (!f.length) { e.preventDefault(); dlg.focus(); return; }
      const a = document.activeElement, i = f.indexOf(a);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && (i === -1 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
    };
    // Focus that lands behind the dialog (a click on the page through some gap, a script) is
    // brought back in.
    m.onFocusIn = e => {
      if (openModals[openModals.length - 1] !== m || dlg.contains(e.target)) return;
      const f = items();
      (f[0] || dlg).focus({ preventScroll: true });
    };
    document.addEventListener("keydown", m.onKey, true);
    document.addEventListener("focusin", m.onFocusIn, true);
    openModals.push(m);
    const start = (first && dlg.querySelector(first)) || items().find(el => !el.classList.contains("modal-close")) || items()[0] || dlg;
    start.focus({ preventScroll: true });
    return m;
  }
  function releaseModal(overlay, restore = true) {
    const k = openModals.findIndex(m => m.overlay === overlay);
    if (k < 0) return;
    const m = openModals.splice(k, 1)[0];
    document.removeEventListener("keydown", m.onKey, true);
    document.removeEventListener("focusin", m.onFocusIn, true);
    if (restore && m.opener && m.opener.isConnected && typeof m.opener.focus === "function") m.opener.focus({ preventScroll: true });
  }

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
    const el = settingsEl;
    settingsEl = null;
    el.remove();
    releaseModal(el);
    document.removeEventListener("keydown", onSettingsKey, true);
    updateGearActive();
  }
  function refreshSettingsControls() {
    if (!settingsEl) return;
    const af = state.filter;
    // Each chip says whether it is on to a screen reader as well as by its colour.
    settingsEl.querySelectorAll("[data-tier]").forEach(b => { const on = af.tiers.has(b.dataset.tier); b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
    settingsEl.querySelectorAll("[data-imp]").forEach(b => { const on = af.importances.has(b.dataset.imp); b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
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
      `<button type="button" class="filter-chip${set.has(k) ? " active" : ""}" aria-pressed="${set.has(k)}" data-${attr}="${k}">${names[k]} <span class="fc-count">${count[k] || 0}</span></button>`).join("");
    settingsEl = document.createElement("div");
    settingsEl.className = "modal-overlay";
    settingsEl.innerHTML = `
      <div class="modal settings-modal" role="dialog" aria-label="Filters">
        <div class="modal-head">
          <h3>Filters</h3>
          <button class="modal-close" aria-label="Close">${uiIcon("close")}</button>
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
    trapModal(settingsEl);
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
    if (e.key === "/" && !openModals.length && document.activeElement !== $search && !typingIn(document.activeElement)) {
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
  const hoverLinks = '.card-link, a.related-item[href^="#/f/"], a[href^="#/problem/"]';
  $content.addEventListener("mouseover", e => {
    const a = e.target.closest(hoverLinks);
    if (!a) return;
    clearTimeout(cpTimer); clearTimeout(cpHide);
    if (cpFor === a) return;
    const at = { x: e.clientX, y: e.clientY };
    cpTimer = setTimeout(() => { cpAt = at; showCardPreview(a); }, 400);
  });
  $content.addEventListener("mouseout", e => {
    const a = e.target.closest(hoverLinks);
    if (!a) return;
    if (e.relatedTarget && (a.contains(e.relatedTarget) || (cpEl && cpEl.contains(e.relatedTarget)))) return;
    scheduleHideCardPreview();
  });
  window.addEventListener("scroll", hideCardPreview, { passive: true });
  // Clicking the link navigates natively, so without these the box outlives the page it
  // belonged to and reappears at its old page coordinates in the corner of the new one.
  $content.addEventListener("click", e => { if (e.target.closest(hoverLinks)) hideCardPreview(); });
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
      rememberSolution(sol.dataset.target, !panel.hidden);
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
      render();
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
    if (topicChip) { location.hash = tagHash([TOPICS_BY_ID[topicChip.dataset.topic].label]); window.scrollTo({ top: 0 }); return; }
    const grp = e.target.closest("[data-list-group]");
    if (grp) {
      const list = getList(grp.dataset.listGroup);
      if (!list) return;
      const apply = () => {
        if (list.builtin) {
          state.autoGroup = !state.autoGroup;
          saveSettings();
        } else {
          if (Array.isArray(list.groupedIds) && !grp.hasAttribute("data-regroup")) delete list.groupedIds;
          else list.groupedIds = shownIds.slice();
          saveLists();
        }
        render();
      };
      // Automatic groups come back with one click, so ungrouping them asks nothing (owner,
      // 2026-11-08); only custom sections ask first.
      apply();
      return;
    }
    if (e.target.closest("[data-edit-description], button[data-description]")) { editListDescription(); return; }
    const exp = e.target.closest("[data-list-export]");
    if (exp) { const l = getList(exp.dataset.listExport); if (l) openListExport(l); return; }
    const rn = e.target.closest("[data-list-rename]") || e.target.closest("h2[data-list-title]:not([contenteditable='true'])");
    if (rn) { startListRename(rn.dataset.listRename || rn.dataset.listTitle); return; }
    const del = e.target.closest("[data-list-delete]");
    if (del) {
      const l = getList(del.dataset.listDelete);
      if (l) appConfirm({ title: `Delete the list “${l.name}”?`, text: "The formulas themselves are not affected.", ok: "Delete list", danger: true })
        .then(yes => { if (yes) { deleteList(l.id); location.hash = "#/learn"; } });
      return;
    }
    const clr = e.target.closest("[data-list-clear]");
    if (clr) {
      const l = getList(clr.dataset.listClear);
      if (l) appConfirm({ title: `Remove all ${liveCount(l)} formulas from “${l.name}”?`, text: "The formulas themselves are not affected.", ok: "Remove all", danger: true })
        .then(yes => {
          if (!yes) return;
          l.ids = [];
          for (const key of ["customSections", "customOff"]) if (Array.isArray(l[key])) l[key].forEach(sec => { sec.ids = []; });
          saveLists(); render();
        });
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

  // A new list (owner, 2026-10-31): one press makes "Untitled list" (numbered when that name is
  // taken) and opens it with its name ready to type over, instead of asking for a name first.
  let pendingRename = null;
  $content.addEventListener("click", e => {
    const nb = e.target.closest("[data-list-new]");
    if (!nb) return;
    e.preventDefault();
    e.stopPropagation();
    openNewListDialog();
  }, true);
  function makeBlankList() {
    const id = createList();
    pendingRename = id;
    location.hash = "#/list/" + id;
  }

  // ---------- Lists as files (owner, 2026-11-08) ----------
  // Export saves one list as a small JSON file holding everything about it: name, description,
  // cards in order, its sections and their descriptions, sections set aside by Ungroup, and its
  // automatic grouping. Import, from the + beside Your lists, makes a new list from such a file,
  // exactly as it was; an exported Starred comes in as an ordinary list named Starred, beside the
  // one you have. (Sharing lists by link would need a server; see PLAN.)
  const LIST_FILE_FORMAT = "compmath-list";
  function listFileData(l) {
    const out = { name: l.name, ids: l.ids.slice() };
    if (l.blurb) out.blurb = l.blurb;
    for (const key of ["customSections", "customOff"]) if (Array.isArray(l[key])) out[key] = JSON.parse(JSON.stringify(l[key]));
    if (l.builtin) { if (state.autoGroup) out.groupedIds = l.ids.slice(); }
    else if (Array.isArray(l.groupedIds)) out.groupedIds = l.groupedIds.slice();
    return { format: LIST_FILE_FORMAT, version: 1, exported: new Date().toISOString(), list: out };
  }
  function downloadListFile(l) {
    const blob = new Blob([JSON.stringify(listFileData(l), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (l.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "list") + ".list.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  // Read a list file; returns the new list's id, or throws with a message for the reader.
  function importListFile(text) {
    let d;
    try { d = JSON.parse(text); } catch (e) { throw new Error("That file is not a list file."); }
    const src = d && d.format === LIST_FILE_FORMAT && d.list ? d.list : null;
    if (!src || !Array.isArray(src.ids)) throw new Error("That file is not a list file. Export a list from its page to make one.");
    const ids = [...new Set(src.ids.filter(x => typeof x === "string"))];
    const sections = v => Array.isArray(v) ? v.filter(sec => sec && Array.isArray(sec.ids)).map(sec => ({
      title: String(sec.title || "").slice(0, 80), note: String(sec.note || "").slice(0, 2000),
      ids: sec.ids.filter(id => typeof id === "string" && ids.includes(id)) })) : null;
    const item = { id: "l_" + Math.random().toString(36).slice(2, 8), name: String(src.name || "Imported list").slice(0, 60).trim() || "Imported list", ids };
    if (typeof src.blurb === "string" && src.blurb.trim()) item.blurb = src.blurb.slice(0, 4000);
    for (const key of ["customSections", "customOff"]) { const v = sections(src[key]); if (v && v.length) item[key] = v; }
    if (Array.isArray(src.groupedIds) && !item.customSections) item.groupedIds = src.groupedIds.filter(id => ids.includes(id));
    lists.items.push(item);
    saveLists();
    return item.id;
  }
  // A small app dialog with free content (the confirmation's look), resolved by its buttons.
  function appDialog(html, wire) {
    const d = document.createElement("dialog");
    d.className = "app-confirm app-dialog";
    d.innerHTML = html;
    document.body.appendChild(d);
    d.addEventListener("close", () => d.remove(), { once: true });
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    wire(d);
    d.showModal();
    return d;
  }
  function openListExport(l) {
    appDialog(`<h3>Export &ldquo;${escapeAttr(l.name)}&rdquo;</h3>
      <p>Save this list as a file. Importing it, from the + beside Your lists on any device, brings back the list exactly: its cards, description, sections and their descriptions, including sections set aside by Ungroup.</p>
      <div class="app-confirm-actions"><button type="button" class="hp-btn hp-btn-soft" data-dlg="cancel">Cancel</button><button type="button" class="hp-btn" data-dlg="file">Download file</button></div>`, d => {
      d.addEventListener("click", e => {
        const b = e.target.closest("[data-dlg]"); if (!b) return;
        if (b.dataset.dlg === "file") { downloadListFile(l); toast("List saved as a file"); }
        d.close();
      });
      setTimeout(() => d.querySelector('[data-dlg="file"]').focus(), 0);
    });
  }
  function openNewListDialog() {
    appDialog(`<h3>New list</h3>
      <div class="nl-choices">
        <button type="button" class="nl-choice" data-dlg="blank"><strong>Start a new list</strong><span>An empty list to add cards to.</span></button>
        <button type="button" class="nl-choice" data-dlg="import"><strong>Import a list</strong><span>From a list file someone exported.</span></button>
      </div>
      <div class="nl-import" hidden>
        <label class="nl-drop" tabindex="0"><input type="file" accept="application/json,.json" hidden>
          <strong>Drop a list file here</strong><span>or click to choose one</span></label>
        <p class="nl-error" role="alert" hidden></p>
      </div>
      <div class="app-confirm-actions"><button type="button" class="hp-btn hp-btn-soft" data-dlg="cancel">Cancel</button></div>`, d => {
      const imp = d.querySelector(".nl-import"), drop = d.querySelector(".nl-drop"), input = drop.querySelector("input"), err = d.querySelector(".nl-error");
      const take = file => {
        if (!file) return;
        file.text().then(text => {
          try {
            const id = importListFile(text);
            d.close();
            location.hash = "#/list/" + id;
            toast("List imported");
          } catch (e2) { err.hidden = false; err.textContent = e2.message; }
        });
      };
      d.addEventListener("click", e => {
        const b = e.target.closest("[data-dlg]"); if (!b) return;
        if (b.dataset.dlg === "blank") { d.close(); makeBlankList(); }
        else if (b.dataset.dlg === "import") { d.querySelector(".nl-choices").hidden = true; imp.hidden = false; d.querySelector("h3").textContent = "Import a list"; drop.focus(); }
        else d.close();
      });
      drop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } });
      input.addEventListener("change", () => take(input.files && input.files[0]));
      drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("is-over"); });
      drop.addEventListener("dragleave", () => drop.classList.remove("is-over"));
      drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("is-over"); take(e.dataTransfer.files && e.dataTransfer.files[0]); });
      setTimeout(() => d.querySelector('[data-dlg="blank"]').focus(), 0);
    });
  }
  // Renaming happens in place: the list's title becomes editable with its text selected; Enter or
  // a click elsewhere keeps the new name, Escape keeps the old one.
  function startListRename(id) {
    const h = $content.querySelector(`h2[data-list-title="${id}"]`), l = getList(id);
    if (!h || !l) return;
    const old = l.name;
    h.contentEditable = "true";
    h.spellcheck = false;
    h.focus();
    const range = document.createRange(); range.selectNodeContents(h);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    let done = false;
    const finish = keep => {
      if (done) return; done = true;
      h.contentEditable = "false";
      const name = h.textContent.replace(/\s+/g, " ").trim().slice(0, 40);
      if (keep && name && name !== old) { renameList(id, name); render(); }
      else h.textContent = old;
    };
    h.addEventListener("keydown", ev => {
      if (ev.key === "Enter") { ev.preventDefault(); finish(true); h.blur(); }
      else if (ev.key === "Escape") { ev.preventDefault(); finish(false); h.blur(); }
    });
    h.addEventListener("blur", () => finish(true), { once: true });
  }

  window.addEventListener("hashchange", event => {
    if (topicPracticeSet && new URL(event.oldURL).hash.startsWith('#/practice/set/') && new URL(event.oldURL).hash !== location.hash) pausePractice();
    clearTimeout(scrollSaveTimer);
    legacyRedirect();
    const route = getRoute();
    render();
    window.AppAccessibility.focusMain();
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
    history.replaceState(null, "", spaceEntry("formulas"));
  }
  legacyRedirect();
  try { localStorage.removeItem("mq-last"); } catch (e) {}
  buildSidebar();
  render();
  window.AppAccessibility.init();
  scrollForRoute(getRoute(), null);

  // ---------- Debug / evaluation hook ----------
  // The search internals are otherwise sealed inside this IIFE, which meant every
  // relevance measurement so far was taken by hand-patching a temporary export in
  // and out of this file. tools/search-eval.html needs a stable, synchronous entry
  // point (the UI path is debounced, and a background tab throttles its timers),
  // so expose one — gated on ?debug=1 so nothing is added to the normal page.
  if (/[?&]debug=1\b/.test(location.search)) {
    // A search index built before the last few cards were added still loads, still answers,
    // and is quietly wrong. The book-search regression suite checks repository artifacts;
    // this debug check also catches an older hosted/cache copy. Poll until the lazy index reports in.
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
