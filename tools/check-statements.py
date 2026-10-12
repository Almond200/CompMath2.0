#!/usr/bin/env python3
"""Gate for the problem statements in js/data/problems/statements/<year>.js.

Every key must be a problem in problem-db.js, every figure a statement mentions must exist as an
SVG file, no statement may hold a raw `<` plus a letter outside maths or an odd number of `$`, and
the files must carry the MAA credit header. Run from the repo root."""
import glob, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import choice_layout
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
        # The two 2021 Fall AMC problems LIVE lacks are credited to the AoPS Wiki instead.
        if not u.startswith(("https://live.poshenloh.com/", "https://artofproblemsolving.com/wiki/", "pdf:fall-2021-amc-10")): bad.append("%s: source link missing" % slug)
        # A size command (\\tiny, \\small ...) shrinks a formula to near-unreadable size on screen.
        if re.search(r"\\(?:tiny|scriptsize|footnotesize|small)\b", s): bad.append("%s: a size command shrinks the maths" % slug)
        # Long answer choices go one per line; a run of long ones left inline wraps into a paragraph.
        if choice_layout.layout(s) != s: bad.append("%s: long answer choices are not one per line" % slug)
        # LIVE cuts long equations by hand for a phone screen; the importer joins those cuts. A cut that
        # only continues the line above (it starts with {}, \\quad, or an operator) must not survive.
        for disp in re.findall(r"\$\$(.*?)\$\$", s, re.S):
            if re.match(r"\s*\\begin\{(aligned|gathered)\}", disp):
                for line in re.split(r"\\\\", disp)[1:]:
                    if re.match(r"^[&\s]*(?:\\q?quad\b|\{\}|[+\-=<>]|\\(?:cdot|cdots|times)\b)", line):
                        bad.append("%s: an equation still has a hand-cut continuation line" % slug); break
        for fig in re.findall(r"@@fig:([^@]+)@@", s):
            figs += 1
            p = os.path.join(ROOT, "js/data/problems/figures", fig)
            head = open(p, "rb").read(200) if os.path.exists(p) else b""
            ok = head.lstrip().startswith((b"<?xml", b"<svg")) or head.startswith(b"\x89PNG\r\n\x1a\n")
            if not os.path.exists(p) or not ok:
                bad.append("%s: figure %s missing or not an SVG or PNG" % (slug, fig)); nofig += 1
print("statements: %d | of %d problems | figures: %d" % (n, len(slugs), figs))
for b in bad[:25]: print("  " + b)
print("OK - every statement is a known problem with its credit and figures" if not bad else "FAILURES ABOVE")
sys.exit(1 if bad else 0)
