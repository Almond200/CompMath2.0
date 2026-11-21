#!/usr/bin/env python3
"""Build js/data/problems/statements/<dir>/<year>.js from the hand-checked spec files.

    python3 tools/statements/build.py smt|bmt|arml|cmimc|chmmc|duke|mmaths|gmay|umd|lehigh|utah|columbus|mbmt|calgary|pumac

Spec: tools/statements/spec/<dir>/<year>.txt, blocks "=== <slug tail>" (the slug without
"<year>-<prefix>-", e.g. "algebra-3", "general-12", "individual-7", "local-individual-2"),
each followed by the statement: LaTeX in $...$ and $$...$$, blank lines between paragraphs,
"• " bullets. A figure is written @@fig:NAME@@: NAME is the PNG the extractor cropped
(e.g. smt2025_geometry-7.png) in WORK/figs/<dir>/; it is copied to
js/data/problems/figures/<dir>/<year>/<NAME without the "smt2025_" prefix>. If the work
folder is gone, figures already copied into the repository are kept.

The problem list (slug, ref, family, paper url) comes from WORK/probs.json, written by
tools/statements/dump-problems.cjs. WORK defaults to $STATEMENTS_WORK or /tmp/statements-work.
Statements are reproduced with the organizers' permission (owner, 2026-11-20).
"""
import sys, os, re, json, glob, shutil
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SPEC = os.path.join(ROOT, "tools", "statements", "spec")
WORK = os.environ.get("STATEMENTS_WORK", "/tmp/statements-work")
d = sys.argv[1]
probs = {p["slug"]: p for p in json.load(open(os.path.join(WORK, "probs.json")))}
# dir -> (families in the database, full name, source line); the credit and link rules are in tools/check-statements.py
DIRS = {
    "smt": (("SMT",), "Stanford Math Tournament", "the official Stanford Math Tournament papers"),
    "bmt": (("BMT",), "Berkeley Math Tournament", "the official Berkeley Math Tournament papers"),
    "arml": (("ARML", "ARML Local"), "American Regions Mathematics League", "the official ARML contest books"),
    "cmimc": (("CMIMC",), "Carnegie Mellon Informatics and Mathematics Competition", "the official CMIMC tests"),
    "chmmc": (("CHMMC",), "Caltech Harvey Mudd Math Competition", "the official CHMMC papers"),
    "duke": (("Duke Math Meet",), "Duke Math Meet", "the official Duke Math Meet papers"),
    "mmaths": (("MMATHS",), "Yale Math Competitions", "the official MMATHS papers"),
    "gmay": (("Girls in Math at Yale",), "Yale Math Competitions", "the official Girls in Math at Yale papers"),
    "umd": (("UMD HSMC",), "University of Maryland High School Mathematics Competition", "the official UMD HSMC papers"),
    "lehigh": (("Lehigh",), "Lehigh University High School Math Contest", "the official Lehigh contest papers"),
    "utah": (("Utah State Math Contest",), "Utah State Math Contest", "the official Utah State Math Contest exams"),
    "columbus": (("Columbus State Tournament",), "Columbus State Invitational Mathematics Tournament", "the official Columbus State tournament tests"),
    "mbmt": (("MBMT Lower", "MBMT Upper"), "Montgomery Blair Math Tournament", "the official MBMT rounds"),
    "calgary": (("Calgary Junior Math Contest",), "University of Calgary Junior Mathematics Contest", "the official Calgary Junior Math Contest papers"),
    "pumac": (("PUMaC Division A", "PUMaC Division B"), "Princeton University Mathematics Competition", "the official PUMaC papers"),
}
FAM, NAME, SOURCE = DIRS[d]
# the slug word where it is not the folder name (slug = year-word-tail)
SLUG_WORD = {"gmay": "girls-in-math-at-yale"}
total = 0
for spec in sorted(glob.glob(os.path.join(SPEC, d, "*.txt"))):
    year = os.path.basename(spec)[:4]
    blocks = re.split(r"^=== (\S+)\s*$", open(spec, encoding="utf-8").read(), flags=re.M)[1:]
    out = []
    for tail, body in zip(blocks[::2], blocks[1::2]):
        slug = f"{year}-{SLUG_WORD.get(d, d)}-{tail}"
        if slug not in probs: sys.exit(f"{spec}: {slug} is not in the database")
        p = probs[slug]
        def fig(m):
            name = m.group(1)
            short = re.sub(r"^[a-z]+\d{4}_", "", name)
            dst = os.path.join(ROOT, "js/data/problems/figures", d, year, short)
            src = os.path.join(WORK, "figs", d, name)
            if os.path.exists(src):
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copyfile(src, dst)
            elif not os.path.exists(dst):
                sys.exit(f"{slug}: missing figure {src}")
            return f"@@fig:{d}/{year}/{short}@@"
        s = re.sub(r"@@fig:([^@/]+)@@", fig, body.strip())
        if "`" in s: sys.exit(f"{slug}: backtick in statement")
        url = p["url"] if d == "arml" else p["url"].split("#")[0]
        out.append(f'"{slug}": {{ s: String.raw`{s}`, u: "{url}" }},')
    js = (f"// Problems and diagrams © {year} {NAME}. Reproduced with permission from the {NAME}.\n"
          f"// Source: {SOURCE}. Built by tools/statements/build.py from tools/statements/spec/{d}/{year}.txt.\n"
          "Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {\n" + "\n".join(out) + "\n});\n")
    dst = os.path.join(ROOT, "js/data/problems/statements", d, f"{year}.js")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "w", encoding="utf-8").write(js)
    total += len(out)
    print(year, len(out))
want = [s for s, p in probs.items() if p["fam"] in FAM]
print("total", total, "of", len(want))
