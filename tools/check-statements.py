#!/usr/bin/env python3
"""Check that shipped problem statements use known references, credited sources and valid figures."""
import glob, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import choice_layout
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
titles = json.load(open(os.path.join(ROOT, "tools", "aops-titles.json")))
slugs = set()
for it in titles:
    m = re.match(r"(\d{4})\s+(.*?),\s*Problem\s+(\d+)$", it["ref"])
    slugs.add("%s-%s-%s" % (m.group(1), re.sub(r"[^a-z0-9]+", "-", m.group(2).lower()).strip("-"), m.group(3)))
db_slugs = set()
for ref in re.findall(r'\bref: "([^"]+)"', open(os.path.join(ROOT, "js/data/problems/problem-db.js"), encoding="utf-8").read()):
    m = re.fullmatch(r"(\d{4})\s+(.*?),\s*Problem\s+(\d+)", ref)
    if m:
        db_slugs.add("%s-%s-%s" % (m.group(1), re.sub(r"[^a-z0-9]+", "-", m.group(2).lower()).strip("-"), m.group(3)))
bad, n, figs, nofig = [], 0, 0, 0
withfig, seen = set(), set()
statement_dir = os.path.join(ROOT, "js/data/problems/statements")
for f in sorted(glob.glob(os.path.join(statement_dir, "**", "*.js"), recursive=True)):
    src = open(f, encoding="utf-8").read()
    source = os.path.dirname(os.path.relpath(f, statement_dir))
    if source not in ("", "hmmt", "cemc"):
        bad.append(f"{f}: unknown publisher directory")
        continue
    credit = {"": "CC BY-NC-SA", "hmmt": "Reproduced with permission from HMMT", "cemc": "CC BY-NC 4.0"}[source]
    if credit not in src.split("window.")[0]: bad.append(f"{f}: missing credit header")
    for m in re.finditer(r'^"([a-z0-9-]+)": \{ s: String\.raw`(.*?)`, u: "([^"]*)" \},$', src, re.S | re.M):
        slug, s, u = m.groups(); n += 1
        if slug in seen: bad.append(f"{slug}: duplicate statement")
        seen.add(slug)
        s = s.replace("\\$", "")   # an escaped dollar sign is not a delimiter
        if slug not in (db_slugs if source else slugs): bad.append(f"{slug}: not a problem in the database")
        if s.replace("$$", "").count("$") % 2: bad.append(f"{slug}: unbalanced $")
        if re.search(r"<[A-Za-z/]", re.sub(r"\$[^$]*\$", "", s)): bad.append(f"{slug}: raw tag outside maths")
        if re.search(r"&(?:lt|gt|amp|nbsp|quot|#\d+);", s): bad.append(f"{slug}: an HTML entity was not decoded")
        if source == "hmmt":
            match = re.fullmatch(r"(\d{4})-hmmt-february-(algebra-and-number-theory|combinatorics|geometry)-\d+", slug)
            rounds = {"algebra-and-number-theory": "algnt", "combinatorics": "comb", "geometry": "geo"}
            if not match or u != f"https://hmmt-archive.s3.amazonaws.com/tournaments/{match[1]}/feb/{rounds[match[2]]}/problems.pdf":
                bad.append(f"{slug}: does not link its official HMMT paper")
        elif source == "cemc":
            match = re.fullmatch(r"(\d{4})-(pascal|cayley|fermat)-contest-\d+", slug)
            if not match or u != f"https://cemc.uwaterloo.ca/sites/default/files/documents/{match[1]}/{match[1]}{match[2].title()}Contest.html":
                bad.append(f"{slug}: does not link its official CEMC paper")
        elif not u.startswith(("https://live.poshenloh.com/", "https://artofproblemsolving.com/wiki/", "pdf:fall-2021-amc-10", "https://wiki.randommath.com/amc10/2026/part-a/", "https://wiki.randommath.com/amc12/2026/part-a/")):
            bad.append(f"{slug}: source link missing")
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
            withfig.add(slug)
            figs += 1
            p = os.path.join(ROOT, "js/data/problems/figures", fig)
            head = open(p, "rb").read(200) if os.path.exists(p) else b""
            ok = head.lstrip().startswith((b"<?xml", b"<svg")) or head.startswith(b"\x89PNG\r\n\x1a\n")
            if not os.path.exists(p) or not ok:
                bad.append("%s: figure %s missing or not an SVG or PNG" % (slug, fig)); nofig += 1
# A figure drawn for the app (js/data/diagrams/problem-diagrams.js) belongs to a known problem whose
# statement prints no figure of its own: two pictures of one problem would be redundant.
own = re.findall(r'PROB\["([^"]+)"\] =', open(os.path.join(ROOT, "js/data/diagrams/problem-diagrams.js"), encoding="utf-8").read())
# The title catalog covers MAA papers only. App-drawn figures may also illustrate
# separately attributed mock prompts, but must still belong to the actual database.
for m in re.finditer(r"'([a-z0-9-]+)':\s*\{\s*statement:String\.raw`(.*?)`", open(os.path.join(ROOT, "js/data/problems/mock-extras.js"), encoding="utf-8").read(), re.S):
    if "@@fig:" in m.group(2): withfig.add(m.group(1))
for slug in own:
    if slug not in db_slugs: bad.append("problem diagram %s: not a problem in the database" % slug)
    if slug in withfig: bad.append("problem diagram %s: the statement already has a figure" % slug)
if len(own) != len(set(own)): bad.append("a problem diagram is registered twice")
print("statements: %d | of %d problems | figures: %d | drawn for the app: %d" % (n, len(db_slugs), figs, len(own)))
for b in bad[:25]: print("  " + b)
print("OK - every statement is a known problem with its credit and figures" if not bad else "FAILURES ABOVE")
sys.exit(1 if bad else 0)
