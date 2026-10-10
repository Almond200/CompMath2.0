#!/usr/bin/env python3
"""Gate for the problem statements in js/data/problems/statements/<year>.js.

Every key must be a problem in problem-db.js, every figure a statement mentions must exist as an
SVG file, no statement may hold a raw `<` plus a letter outside maths or an odd number of `$`, and
the files must carry the MAA credit header. Run from the repo root."""
import glob, json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
titles = json.load(open(os.path.join(ROOT, "tools", "aops-titles.json")))
slugs = set()
for it in titles:
    m = re.match(r"(\d{4})\s+(.*?),\s*Problem\s+(\d+)$", it["ref"])
    slugs.add("%s-%s-%s" % (m.group(1), re.sub(r"[^a-z0-9]+", "-", m.group(2).lower()).strip("-"), m.group(3)))
bad, n, figs, nofig = [], 0, 0, 0
for f in sorted(glob.glob(os.path.join(ROOT, "js/data/problems/statements/*.js"))):
    src = open(f, encoding="utf-8").read()
    if "CC BY-NC-SA" not in src.split("window.")[0]: bad.append("%s: missing credit header" % os.path.basename(f))
    for m in re.finditer(r'^"([a-z0-9-]+)": \{ s: String\.raw`(.*?)`, u: "([^"]*)" \},$', src, re.S | re.M):
        slug, s, u = m.groups(); n += 1
        s = s.replace("\\$", "")   # an escaped dollar sign is not a delimiter
        if slug not in slugs: bad.append("%s: not a problem in the database" % slug)
        if s.replace("$$", "").count("$") % 2: bad.append("%s: unbalanced $" % slug)
        if re.search(r"<[A-Za-z/]", re.sub(r"\$[^$]*\$", "", s)): bad.append("%s: raw tag outside maths" % slug)
        if not u.startswith("https://live.poshenloh.com/"): bad.append("%s: source link missing" % slug)
        for fig in re.findall(r"@@fig:([^@]+)@@", s):
            figs += 1
            p = os.path.join(ROOT, "js/data/problems/figures", fig)
            if not os.path.exists(p) or not open(p, encoding="utf-8", errors="replace").read(200).lstrip().startswith(("<?xml", "<svg")):
                bad.append("%s: figure %s missing or not an SVG" % (slug, fig)); nofig += 1
print("statements: %d | of %d problems | figures: %d" % (n, len(slugs), figs))
for b in bad[:25]: print("  " + b)
print("OK - every statement is a known problem with its credit and figures" if not bad else "FAILURES ABOVE")
sys.exit(1 if bad else 0)
