#!/usr/bin/env python3
"""Fetch AMC and AIME problem statements (and their figures) from LIVE by Po-Shen Loh.

    python3 tools/fetch-live-statements.py [--limit N] [--delay SECONDS]

live.poshenloh.com/past-contests publishes every AMC and AIME problem "with official permission of
the Mathematical Association of America", as plain LaTeX inside each page's embedded JSON, with the
figures as SVG files. This reads that, for exactly the problems in js/data/problems/problem-db.js
(tools/aops-titles.json is the list), and writes:

  js/data/problems/statements/<year>.js   { slug: { s: statement, u: LIVE page } }
  js/data/problems/figures/<contest>/<year>/<n>.svg

Only the statement and the answer choices are taken: never the solutions, hints, or LIVE's concept
tags. Pages are cached under ~/aops-cache/live/ and fetched one every 1.5 seconds. The problem page
credits the MAA (CC BY-NC-SA 4.0) and LIVE.
"""
import json, os, re, sys, time, html, urllib.request, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import choice_layout

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.expanduser("~/aops-cache/live")
os.makedirs(CACHE, exist_ok=True)
UA = "competition-math-reference (personal, non-commercial study app)"
BASE = "https://live.poshenloh.com"
delay = 1.5
limit = None
if "--delay" in sys.argv: delay = float(sys.argv[sys.argv.index("--delay") + 1])
if "--limit" in sys.argv: limit = int(sys.argv[sys.argv.index("--limit") + 1])

def get(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")

def contest_key(ref):
    """'2019 AMC 12A, Problem 17' -> ('amc12', '2019A', 17, slug)"""
    m = re.match(r"(\d{4})\s+(?:Spring\s+)?(AIME II|AIME I|AIME|AMC 10A|AMC 10B|AMC 12A|AMC 12B|AMC 10|AMC 12|AMC 8|AJHSME),\s*Problem\s+(\d+)$", ref)
    if not m: return None
    year, fam, n = m.group(1), m.group(2), int(m.group(3))
    if fam.startswith("AIME"): c, y = "aime", year + fam[4:].strip()
    elif fam in ("AMC 8", "AJHSME"): c, y = "amc8", year       # the AJHSME (1985 to 1998) became the AMC 8
    elif fam in ("AMC 10", "AMC 12"): c, y = fam[:3].lower() + fam[4:6], year   # 2000 and 2001 were single sittings, no A or B
    else: c, y = fam[:3].lower() + fam[4:6], year + fam[-1]
    spring = "spring-" if re.match(r"\d{4}\s+Spring\s", ref) else ""
    slug = "%s-%s%s-%d" % (year, spring, re.sub(r"[^a-z0-9]+", "-", fam.lower()).strip("-"), n)
    return c, y, n, slug

def page_questions(c, y):
    f = os.path.join(CACHE, "%s-%s.json" % (c, y))
    if os.path.exists(f): return json.load(open(f))
    page = get("%s/past-contests/%s/%s" % (BASE, c, y))
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', page, re.S)
    qs = json.loads(m.group(1))["props"]["pageProps"]["baseQuestions"]
    keep = [{k: q.get(k) for k in ("question", "a", "b", "c", "d", "e", "concepts")} for q in qs]   # concepts: kept in the cache only, to find practice problems for cards
    json.dump(keep, open(f, "w"))
    time.sleep(delay)
    return keep

# LIVE writes its displayed equations for a narrow phone screen: a long one is cut by hand into
# lines with \\ inside aligned or gathered, and the continuation lines are indented with \quad {}.
# On a wide page those cuts look arbitrary, so a cut that only continues the previous line is joined
# back into one line; breaks between separate equations (a system, cases, a matrix) stay.
_CONT = re.compile(r"^(?:\{\}|[+\-=<>]|\\(?:cdot|cdots|ldots|times|le|ge|leq|geq|lt|gt|ne|neq|equiv|pm|mp|approx)\b)")
_ENDS_OP = re.compile(r"(?:[=+\-<>]|\\(?:cdot|times|le|ge|leq|geq|ne|neq|equiv|pm|approx))\s*$")

def split_top(body):
    """Split on \\\\ that are not inside a nested \\begin ... \\end."""
    out, depth, cur, i = [], 0, "", 0
    while i < len(body):
        if body.startswith("\\begin{", i): depth += 1
        elif body.startswith("\\end{", i): depth -= 1
        if depth == 0 and body.startswith("\\\\", i):
            out.append(cur); cur = ""; i += 2
            if body[i:i + 1] == "[":                      # \\[1em] style spacing
                j = body.find("]", i); i = j + 1 if j > 0 else i
            continue
        cur += body[i]; i += 1
    out.append(cur)
    return out

def unwrap_display(body):
    m = re.fullmatch(r"\s*\\begin\{(aligned|gathered)\}(.*)\\end\{\1\}\s*", body, re.S)
    if not m: return re.sub(r"\\(?:small|scriptsize|footnotesize)\b\s*", "", body)
    lines = [l.strip() for l in split_top(m.group(2)) if l.strip()]
    plain = lambda l: re.sub(r"^[&\s]*(?:\\q?quad\s*)*[&\s]*", "", l)
    merged = [lines[0]]
    for l in lines[1:]:
        nxt = plain(l)
        prev = merged[-1].rstrip("& ").rstrip()
        listy = prev.endswith(",") and not re.search(r"[=<>]|\\(?:le|ge|leq|geq)\b", prev + nxt) and "&" not in prev
        indented = bool(re.match(r"^[&\s]*\\q?quad\b", l))      # LIVE indents a continuation line with \\quad
        if _CONT.match(nxt) or _ENDS_OP.search(prev) or listy or indented:
            merged[-1] = prev + " " + re.sub(r"^\{\}\s*", "", nxt)
        else:
            merged.append(l)
    if len(merged) == 1:
        one = re.sub(r"\\small\b|\\scriptsize\b", "", merged[0]).replace("&", " ")
        one = re.sub(r"\s+", " ", one).strip()
        return re.sub(r"\\cdots\s*\\cdot\b", r"\\cdots", one)
    out = "\\begin{%s}%s\\end{%s}" % (m.group(1), " \\\\ ".join(merged), m.group(1))
    return re.sub(r"\\(?:small|scriptsize|footnotesize)\b\s*", "", out)

def tex(t):
    # \( \) and \[ \] are the delimiters; a doubled backslash before ( or [ is a line break, not one.
    # LIVE sometimes shrinks a formula with \tiny or \small, which renders it unreadably small here.
    t = re.sub(r"\\(?:tiny|scriptsize|footnotesize|small)\b\s*", "", t)
    # A dollar sign for money is written bare before the maths ("$\(1500\)"): make it part of the maths, and
    # escape any other bare dollar sign, so it is never mistaken for a delimiter.
    t = re.sub(r"(?<!\\)\$\s*\\\((.*?)(?<!\\)\\\)", lambda m: "$\\$" + m.group(1).strip() + "$", t, flags=re.S)
    t = re.sub(r"(?<!\\)\\\((.*?)(?<!\\)\\\)", lambda m: "$" + m.group(1).strip() + "$", t, flags=re.S)
    t = re.sub(r"(?<!\\)\\\[(.*?)(?<!\\)\\\]", lambda m: "$$" + unwrap_display(m.group(1)) + "$$", t, flags=re.S)
    return t

def table(m):
    """An HTML table of the statement as a LaTeX array: cells with maths keep it, other text goes in \\text."""
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", m.group(0), re.S | re.I)
    out = []
    for r in rows:
        cells = []
        for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S | re.I):
            c = re.sub(r"<br\s*/?>", " ", c, flags=re.I)
            parts = re.split(r"\\\((.*?)\\\)", c.strip(), flags=re.S)
            cells.append("".join(("\\text{%s}" % re.sub(r"\s+", " ", x) if x.strip() else "") if i % 2 == 0 else x.strip() + " " for i, x in enumerate(parts)).strip())
        out.append(" & ".join(cells))
    cols = max((len(r.split(" & ")) for r in out), default=1)
    return "$$\\begin{array}{|%s|}\\hline %s \\\\ \\hline \\end{array}$$" % ("c" * cols, " \\\\ \\hline ".join(out))


# A figure that is only numbers or words is better as typeset maths than as a picture, which comes
# out small and cramped. Each entry replaces the figure with LaTeX of the same content.
FIGURE_AS_TEX = {
    "amc10/2024B/19.svg": r"$$\begin{array}{|l|c|c|c|c|} \hline & \text{zero} & \text{exactly one} & \text{exactly two} & \text{more than two} \\ \hline \text{zero slope} & ? & ? & ? & ? \\ \hline \text{nonzero rational slope} & ? & ? & ? & ? \\ \hline \text{irrational slope} & ? & ? & ? & ? \\ \hline \end{array}$$",
    # Every number is padded to the width of "-1", so the columns, and the gaps between them, are even.
    "amc10/2025A/19.svg": r"$$\begin{array}{ccccccccc} & & -1 & & \phantom{-}3 & & \phantom{-}1 & & \\[0.6em] & -1 & & \phantom{-}2 & & \phantom{-}4 & & \phantom{-}1 & \\[0.6em] -1 & & \phantom{-}1 & & \phantom{-}6 & & \phantom{-}5 & & \phantom{-}1 \end{array}$$",
}

# Statements LIVE does not carry, taken from the AoPS Wiki (2021 Fall AMC): written into the year file on every run.
MANUAL_STATEMENTS = {
    "2021-fall-amc-10b-11": {"s": r"""A regular hexagon of side length $1$ is inscribed in a circle. Each minor arc of the circle determined by a side of the hexagon is reflected over that side. What is the area of the region bounded by these $6$ reflected arcs?

(A) $\frac{5\sqrt{3}}{2} - \pi$  (B) $3\sqrt{3}-\pi$  (C) $4\sqrt{3}-\frac{3\pi}{2}$  (D) $\pi - \frac{\sqrt{3}}{2}$  (E) $\frac{\pi + \sqrt{3}}{2}$""", "u": "https://artofproblemsolving.com/wiki/index.php/2021_Fall_AMC_10B_Problems/Problem_11"},
    "2021-fall-amc-12b-23": {"s": r"""What is the average number of pairs of consecutive integers in a randomly selected subset of $5$ distinct integers chosen from the set $\{ 1, 2, 3, \ldots, 30\}$? (For example the set $\{1, 17, 18, 19, 30\}$ has $2$ pairs of consecutive integers.)

(A) $\frac{2}{3}$  (B) $\frac{29}{36}$  (C) $\frac{5}{6}$  (D) $\frac{29}{30}$  (E) $1$""", "u": "https://artofproblemsolving.com/wiki/index.php/2021_Fall_AMC_12B_Problems/Problem_23"},
}

# The Fall 2021 AMC 10A and 10B problems typed in from the PDFs Stanley supplied (tools/manual_statements.py).
sys.path.insert(0, os.path.join(ROOT, "tools"))
from manual_statements import FALL_2021_PDF
MANUAL_STATEMENTS.update({k: {"s": v[1], "u": v[0]} for k, v in FALL_2021_PDF.items()})

# A figure Stanley replaced by hand: the statement points at the file kept in figures/ instead of LIVE's.
FIGURE_FILE_OVERRIDE = {"amc10/2024B/25.svg": "amc10/2024B/25.png"}

def statement(q, c, y, n, figs):
    t = q["question"] or ""
    def img(m):
        src = m.group(1)
        rel = re.sub(r"^/(?:images/past-contests/)?", "", src)
        if rel in FIGURE_AS_TEX: return FIGURE_AS_TEX[rel]
        if rel in FIGURE_FILE_OVERRIDE: return "@@fig:%s@@" % FIGURE_FILE_OVERRIDE[rel]
        figs.append(src)
        return "@@fig:%s@@" % rel
    t = re.sub(r'<img[^>]*src="([^"]+)"[^>]*/?>', img, t)
    t = re.sub(r"<table.*?</table>", table, t, flags=re.S | re.I)
    t = re.sub(r"<br\s*/?>", "\n", t, flags=re.I)
    # Subscripts and superscripts around maths ("CO<sub>\(2\)</sub>") become part of the maths; list items become bullet lines.
    t = re.sub(r"<(sub|sup)>\s*(?:\\\()?(.*?)(?:\\\))?\s*</\1>", lambda m: "\\(%s{%s}\\)" % ("_" if m.group(1) == "sub" else "^", m.group(2).strip()), t, flags=re.S | re.I)
    t = re.sub(r"\s*<li[^>]*>\s*", "\n\u2022 ", t, flags=re.I)
    t = re.sub(r"</li>|</?[ou]l[^>]*>", "", t, flags=re.I)
    t = re.sub(r"</?(?:b|i|u|p|span|div|em|strong|center)[^>]*>", "", t, flags=re.I)
    t = html.unescape(t)
    t = tex(t).strip()
    ch = [(L, q.get(L.lower())) for L in "ABCDE"]
    def chimg(v):
        # An answer choice that is a picture: kept small, beside its letter, at the height LIVE gave it.
        def one(m):
            rel = re.sub(r"^/(?:images/past-contests/)?", "", m.group(1))
            figs.append(m.group(1))
            h = re.search(r"max-height:\s*([0-9.]+rem)", m.group(0))
            return "@@ci:%s|%s@@" % (rel, h.group(1) if h else "4rem")
        return re.sub(r'<img[^>]*src="([^"]+)"[^>]*/?>', one, v)
    ch = [(L, chimg(v) if v else v) for L, v in ch]
    if all(v for _, v in ch):
        t += "\n\n" + "  ".join("(%s) %s" % (L, tex(v).strip()) for L, v in ch)
    t = choice_layout.layout(t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    # A displayed equation is a block with its own margins; blank lines around it would double the gap.
    t = re.sub(r"[ \t]*\n*[ \t]*(\$\$.*?\$\$)[ \t]*\n*[ \t]*", lambda m: m.group(1), t, flags=re.S)
    return t.replace("${", "$ {")   # "${" would open a template substitution in the generated JS

def discover():
    """--all: find every AMC 8 (and AJHSME), AMC 10, and AMC 12 sitting LIVE publishes, and add the problems the
    database lacks as text-only entries ({ ref, formulas: [] }): the statement is the point, the tags come later.
    Sittings LIVE does not have are listed, never skipped silently."""
    tp = os.path.join(ROOT, "tools", "aops-titles.json")
    refs = json.load(open(tp)); have = {r["ref"] for r in refs}
    sittings = [("amc8", str(y), "%d AMC 8" % y if y >= 1999 else "%d AJHSME" % y) for y in range(1985, 2026)]
    for y in range(2000, 2026):
        if y < 2002:      # the first two years each had one AMC 10 and one AMC 12 sitting, no A and B
            sittings += [("amc10", str(y), "%d AMC 10" % y), ("amc12", str(y), "%d AMC 12" % y)]
            continue
        for ab in "AB":
            sp = "Spring " if y == 2021 else ""     # 2021 had a Spring and a Fall AMC 10 and 12, each with an A and a B test; LIVE has the Spring ones
            sittings += [("amc10", "%d%s" % (y, ab), "%d %sAMC 10%s" % (y, sp, ab)), ("amc12", "%d%s" % (y, ab), "%d %sAMC 12%s" % (y, sp, ab))]
    added, lacking = [], []
    for c, y, name in sittings:
        try: qs = page_questions(c, y)
        except Exception as e:
            lacking.append("%s/%s (%s)" % (c, y, name)); continue
        for n in range(1, len(qs) + 1):
            ref = "%s, Problem %d" % (name, n)
            if ref in have: continue
            have.add(ref); added.append(ref)
            refs.append({"ref": ref, "title": "%s_Problems/Problem_%d" % (name.replace(" Spring", "").replace(" ", "_"), n)})
    json.dump(refs, open(tp, "w"), indent=1, ensure_ascii=False)
    dbp = os.path.join(ROOT, "js", "data", "problems", "problem-db.js")
    db = open(dbp, encoding="utf-8").read()
    new = [r for r in added if '"%s"' % r not in db]
    if new:
        k = db.rstrip().rfind("];")
        block = "\n  // ---- Text-only entries: every other AMC 8, AMC 10, and AMC 12 problem LIVE publishes. Statement now, tags later.\n" + "".join('  { ref: "%s", formulas: [] },\n' % r for r in new)
        open(dbp, "w", encoding="utf-8").write(db[:k] + block.lstrip("\n") + db[k:])
    print("problems added to the database: %d  | sittings LIVE lacks: %d" % (len(new), len(lacking)))
    for l in lacking: print("  lacks:", l)
    return lacking

def main():
    if "--all" in sys.argv: discover()
    refs = json.load(open(os.path.join(ROOT, "tools", "aops-titles.json")))
    todo = collections.defaultdict(list)
    for it in refs:
        k = contest_key(it["ref"])
        if k: todo[(k[0], k[1])].append((k[2], k[3], it["ref"]))
    keys = sorted(todo)
    if limit: keys = keys[:limit]
    by_year = collections.defaultdict(dict)
    missing, bad = [], []
    for ci, (c, y) in enumerate(keys):
        try:
            qs = page_questions(c, y)
        except Exception as e:
            missing.append("%s/%s: %s" % (c, y, e)); continue
        print("%d/%d %s/%s (%d questions)" % (ci + 1, len(keys), c, y, len(qs)), flush=True)
        for n, slug, ref in todo[(c, y)]:
            if n > len(qs): missing.append(ref); continue
            figs = []
            s = statement(qs[n - 1], c, y, n, figs)
            if not s or "`" in s or "${" in s: bad.append(ref); continue
            for src in figs:
                rel = re.sub(r"^/(?:images/past-contests/)?", "", src)
                dst = os.path.join(ROOT, "js", "data", "problems", "figures", rel)
                if not os.path.exists(dst):
                    os.makedirs(os.path.dirname(dst), exist_ok=True)
                    try:
                        data = get(BASE + "/images/past-contests/" + rel, binary=True)
                        open(dst, "wb").write(data); time.sleep(0.4)
                    except Exception as e:
                        bad.append("%s figure %s: %s" % (ref, rel, e))
            by_year[slug[:4]][slug] = {"s": s, "u": "%s/past-contests/%s/%s" % (BASE, c, y)}
    outdir = os.path.join(ROOT, "js", "data", "problems", "statements")
    os.makedirs(outdir, exist_ok=True)
    for year, items in sorted(by_year.items()):
        lines = ["// Statements of AMC and AIME problems of %s, from LIVE by Po-Shen Loh (live.poshenloh.com), which publishes them" % year,
                 "// with the permission of the Mathematical Association of America. Problems (c) MAA, CC BY-NC-SA 4.0.",
                 "// Generated by tools/fetch-live-statements.py.",
                 "window.MATH_STATEMENTS = window.MATH_STATEMENTS || {};", "Object.assign(window.MATH_STATEMENTS, {"]
        items.update({k: {"s": choice_layout.layout(v["s"]), "u": v["u"]} for k, v in MANUAL_STATEMENTS.items() if k[:4] == year})
        for slug, v in sorted(items.items()):
            lines.append('"%s": { s: String.raw`%s`, u: "%s" },' % (slug, v["s"], v["u"]))
        lines.append("});")
        open(os.path.join(outdir, "%s.js" % year), "w").write("\n".join(lines) + "\n")
    # A browser may have cached an older statement file: bump the version the page asks for.
    app = os.path.join(ROOT, "js", "app.js"); src = open(app, encoding="utf-8").read()
    m = re.search(r"const STATEMENTS_V = (\d+);", src)
    if m:
        open(app, "w", encoding="utf-8").write(src.replace(m.group(0), "const STATEMENTS_V = %d;" % (int(m.group(1)) + 1), 1))
    n = sum(len(v) for v in by_year.values())
    print("statements written: %d  missing: %d  problems: %d" % (n, len(missing), len(bad)))
    for r in missing[:20]: print("  missing:", r)
    for r in bad[:20]: print("  problem:", r)

if __name__ == "__main__":
    main()
