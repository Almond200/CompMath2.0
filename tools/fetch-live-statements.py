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
    m = re.match(r"(\d{4})\s+(AIME II|AIME I|AIME|AMC 10A|AMC 10B|AMC 12A|AMC 12B),\s*Problem\s+(\d+)$", ref)
    if not m: return None
    year, fam, n = m.group(1), m.group(2), int(m.group(3))
    if fam.startswith("AIME"): c, y = "aime", year + fam[4:].strip()
    else: c, y = fam[:3].lower() + fam[4:6], year + fam[-1]
    slug = "%s-%s-%d" % (year, re.sub(r"[^a-z0-9]+", "-", fam.lower()).strip("-"), n)
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

def tex(t):
    # \( \) and \[ \] are the delimiters; a doubled backslash before ( or [ is a line break, not one.
    t = re.sub(r"(?<!\\)\\\((.*?)(?<!\\)\\\)", lambda m: "$" + m.group(1).strip() + "$", t, flags=re.S)
    t = re.sub(r"(?<!\\)\\\[(.*?)(?<!\\)\\\]", lambda m: "$$" + m.group(1).strip() + "$$", t, flags=re.S)
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
    # Every number is padded to the width of "-1", so the columns, and the gaps between them, are even.
    "amc10/2025A/19.svg": r"$$\renewcommand{\arraystretch}{1.5}\begin{array}{ccccccccc} & & -1 & & \phantom{-}3 & & \phantom{-}1 & & \\ & -1 & & \phantom{-}2 & & \phantom{-}4 & & \phantom{-}1 & \\ -1 & & \phantom{-}1 & & \phantom{-}6 & & \phantom{-}5 & & \phantom{-}1 \end{array}$$",
}

def statement(q, c, y, n, figs):
    t = q["question"] or ""
    def img(m):
        src = m.group(1)
        rel = re.sub(r"^/(?:images/past-contests/)?", "", src)
        if rel in FIGURE_AS_TEX: return FIGURE_AS_TEX[rel]
        figs.append(src)
        return "@@fig:%s@@" % rel
    t = re.sub(r'<img[^>]*src="([^"]+)"[^>]*/?>', img, t)
    t = re.sub(r"<table.*?</table>", table, t, flags=re.S | re.I)
    t = re.sub(r"<br\s*/?>", "\n", t, flags=re.I)
    t = re.sub(r"</?(?:b|i|u|p|span|div|em|strong|center)[^>]*>", "", t, flags=re.I)
    t = html.unescape(t)
    t = tex(t).strip()
    ch = [(L, q.get(L.lower())) for L in "ABCDE"]
    if all(v for _, v in ch):
        t += "\n\n" + "  ".join("(%s) %s" % (L, tex(v).strip()) for L, v in ch)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.replace("${", "$ {")   # "${" would open a template substitution in the generated JS

def main():
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
        for slug, v in sorted(items.items()):
            lines.append('"%s": { s: String.raw`%s`, u: "%s" },' % (slug, v["s"], v["u"]))
        lines.append("});")
        open(os.path.join(outdir, "%s.js" % year), "w").write("\n".join(lines) + "\n")
    n = sum(len(v) for v in by_year.values())
    print("statements written: %d  missing: %d  problems: %d" % (n, len(missing), len(bad)))
    for r in missing[:20]: print("  missing:", r)
    for r in bad[:20]: print("  problem:", r)

if __name__ == "__main__":
    main()
