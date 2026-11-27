#!/usr/bin/env python3
"""Split the frozen Master Curriculum import into the curriculum/ directory, and check it.

The owner's Master Curriculum and Development Roadmap (curriculum/source/master-roadmap.docx)
was converted once with pandoc to curriculum/source/master-roadmap.md, the frozen import. This
tool distributes every line of that import to exactly one file:

  curriculum/books/<book-id>/README.md          a volume's front matter and chapter table
  curriculum/books/<book-id>/<code>-<slug>.md   one file per chapter (136)
  curriculum/spec/*.md                          the roadmap, research, standards, audits, pilots

It rewrites the import's internal anchors (#a2-10, #twelve-book-shelf, ...) as relative links
and turns the plain-text headings of the audit and pilot sections into Markdown headings. It
adds nothing else to a split file except one navigation line at the top, marked
"<!-- nav -->". It also writes curriculum/data/index.json, the machine-readable list of books,
chapters and concept sections.

  python3 tools/curriculum/build-curriculum.py --force-resplit   # rebuild from the import (discards edits!)
  python3 tools/curriculum/build-curriculum.py --check   # verify; exit 1 on any discrepancy

--check confirms: 12 books, 136 chapters (one optional), 791 concept sections; every source
line lands in exactly one split file; each split file, with links, heading marks and nav lines
normalised away, is identical to its source lines; the index and the tracker list every chapter.
The split files have been edited under change control since 2026-11-27 (CR-1 onward,
curriculum/REVIEW-NOTES.md §4), so the routine check is --check --allow-edits, which keeps the
line-coverage and structural checks and skips the byte comparison. The index, the chapter
structure and the packets are checked by tools/curriculum/check-spec.py, which reads the edited
chapter files; it also regenerates curriculum/data/index.json (--write).
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CUR = ROOT / "curriculum"
SRC = CUR / "source" / "master-roadmap.md"

BOOKS = [  # (prefix, book id, short title) in shelf order
    ("A1", "algebra-1", "Algebra I"), ("A2", "algebra-2", "Algebra II"), ("A3", "algebra-3", "Algebra III"),
    ("G1", "geometry-1", "Geometry I"), ("G2", "geometry-2", "Geometry II"), ("G3", "geometry-3", "Geometry III"),
    ("N1", "number-theory-1", "Number Theory I"), ("N2", "number-theory-2", "Number Theory II"), ("N3", "number-theory-3", "Number Theory III"),
    ("C1", "combinatorics-1", "Combinatorics & Probability I"), ("C2", "combinatorics-2", "Combinatorics & Probability II"), ("C3", "combinatorics-3", "Combinatorics & Probability III"),
]
BOOK_BY_PREFIX = {p: (i, t) for p, i, t in BOOKS}
EXPECT = {"books": 12, "chapters": 136, "sections": 791}

# Supporting files: (file, title, list of (first heading text, inclusive) ... ) resolved below by
# the heading lines that open each block in the import.
SPEC_BLOCKS = [
    # file, title, start marker (exact line), end marker (exclusive, exact line) or None
    ("overview.md", "Overview: executive summary and how to use the specification", 0, "# Development roadmap — read this first"),
    ("roadmap.md", "Development roadmap, execution sequence and release gates", "# Development roadmap — read this first", "## Twelve-book shelf"),
    ("shelf-and-levels.md", "The twelve-book shelf, levels, Year 2 map and cross-subject bridges", "## Twelve-book shelf", "## Research-based gap audit"),
    ("research-audits.md", "Research-based gap audit, second-pass audit, contest stress test and refinements", "## Research-based gap audit", "# Algebra I — Algebraic Foundations and Problem Solving"),
    ("authoring-standards.md", "Implementation and editorial standards", "# Implementation and editorial standards", "# Archive-wide coverage and teaching validation"),
    ("coverage-audit.md", "Archive-wide coverage and teaching validation", "# Archive-wide coverage and teaching validation", "# Solution-level audit and teaching pilots"),
    ("solution-audit.md", "Solution-level audit of the 2026 AIME papers", "# Solution-level audit and teaching pilots", "5 \\| How to make a textbook feel like teaching"),
    ("teaching-pilots.md", "Teaching pilots and acceptance tests", "5 \\| How to make a textbook feel like teaching", "7 \\| Sources and reproducibility"),
    ("solution-audit.md", None, "7 \\| Sources and reproducibility", None),  # appended to solution-audit.md
]

# Plain-text headings in the audit and pilot sections (pandoc kept them as paragraphs).
PLAIN_H2 = re.compile(r"^[1-7] \\\| ")
PLAIN_H3 = re.compile(r"^(Pilot [A-D] \\\| |AIME I{1,2} \\#\d+ \\\| )")
PLAIN_H4 = {"Instructional evidence and decisions", "Preliminary findings", "Exact cover for I \\#15",
            "State model for II \\#14", "Volume-specific expectations", "Suggested in-app lesson behavior",
            "Next batch of chapter pilots", "What has and has not been established", "Check and discuss",
            "Solutions", "Practice with mixed data", "Solutions and reasoning"}
PLAIN_STEP = re.compile(r"^\d\\\. \S")  # "1\. What changes when someone catches up?"


def slug(s):
    s = s.lower().replace("&", "and").replace("’", "").replace("'", "")
    s = re.sub(r"\(.*?\)", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def parse(lines):
    """Return the books with chapters and sections, and the line ranges of every block."""
    books, chapter_re = [], re.compile(r"^## ((A|G|N|C)[1-3]\.\d+) — (.+)$")
    section_re = re.compile(r"^### ((?:A|G|N|C)[1-3]\.\d+\.\d+) (.+)$")
    vol_re = re.compile(r"^# (Algebra|Geometry|Number Theory|Combinatorics & Probability) (I{1,3}) — (.+)$")
    cur_book = cur_ch = None
    for n, line in enumerate(lines):
        m = vol_re.match(line)
        if m:
            prefix = {"Algebra": "A", "Geometry": "G", "Number Theory": "N", "Combinatorics & Probability": "C"}[m.group(1)] + str(len(m.group(2)))
            cur_book = {"prefix": prefix, "id": BOOK_BY_PREFIX[prefix][0], "title": line[2:], "start": n, "chapters": []}
            books.append(cur_book); cur_ch = None
            continue
        if line.startswith("# ") and cur_book:  # end of the books block
            cur_book = cur_ch = None
            continue
        m = chapter_re.match(line)
        if m and cur_book:
            assert m.group(1).startswith(cur_book["prefix"] + "."), line
            cur_ch = {"id": m.group(1), "title": m.group(3), "start": n, "sections": []}
            cur_book["chapters"].append(cur_ch)
            continue
        m = section_re.match(line)
        if m and cur_ch:
            assert m.group(1).startswith(cur_ch["id"] + "."), line
            cur_ch["sections"].append({"id": m.group(1), "title": m.group(2)})
    return books


def chapter_meta(lines, ch):
    body = lines[ch["start"]:ch["end"]]
    label = next((l.strip("*") for l in body[1:6] if l.startswith("**") and ("CHAPTER" in l or "ANCHOR" in l)), "")
    year2 = re.search(r"Original Lesson (\d+)", label)
    return {
        "basis": f"Year 2 L{year2.group(1)}" if year2 else "Proposed",
        "optional": "OPTIONAL" in label,
        "label": label,
        "teachingSequence": any(l.startswith("**Teaching sequence.**") for l in body),
        "secondPass": sum("Second-pass extension" in l for l in body),
        "auditRefinements": sorted(set(int(x) for l in body for x in re.findall(r"audit refinement (\d)", l))),
        "nextLink": next((re.search(r"\]\(#([a-z0-9-]+)\)", l).group(1) for l in body if l.startswith("**Next in this volume:**") or l.startswith("**Optional next chapter:**")), None),
    }


def ranges(lines, books):
    """Assign every line to a file. Returns {path: [(a, b), ...]} with half-open ranges."""
    out, end_of_books = {}, None
    starts = [b["start"] for b in books]
    for bi, b in enumerate(books):
        nxt = books[bi + 1]["start"] if bi + 1 < len(books) else next(i for i in range(b["start"] + 1, len(lines)) if lines[i].startswith("# "))
        b["end"] = nxt
        chs = b["chapters"]
        first = chs[0]["start"]
        out.setdefault(f"books/{b['id']}/README.md", []).append((b["start"], first))
        for ci, ch in enumerate(chs):
            ch["end"] = chs[ci + 1]["start"] if ci + 1 < len(chs) else nxt
            ch["file"] = f"books/{b['id']}/{ch['id'].split('.')[0]}.{int(ch['id'].split('.')[1]):02d}-{slug(ch['title'])}.md"
            out[ch["file"]] = [(ch["start"], ch["end"])]
        end_of_books = nxt
    def find(marker, after=0):
        if marker == 0: return 0
        for i in range(after, len(lines)):
            if lines[i] == marker or lines[i].startswith(marker): return i
        raise SystemExit(f"marker not found: {marker}")
    for f, _t, a, z in SPEC_BLOCKS:
        ia = find(a); iz = find(z, ia + 1) if z else len(lines)
        out.setdefault("spec/" + f, []).append((ia, iz))
    return out


def link_target(anchor, here, books_by_anchor, spec_anchor):
    if anchor in books_by_anchor: tgt = books_by_anchor[anchor]
    elif anchor in spec_anchor: tgt = spec_anchor[anchor]
    else: return None
    rel = Path(*([".."] * (len(Path(here).parts) - 1))) / tgt
    return rel.as_posix()


def transform(text_lines, here, books_by_anchor, spec_anchor, in_audit):
    res = []
    for line in text_lines:
        def sub(m):
            t = link_target(m.group(2), here, books_by_anchor, spec_anchor)
            return f"[{m.group(1)}]({t})" if t else m.group(0)
        line = re.sub(r"\[([^\]]+)\]\(#([A-Za-z0-9_-]+)\)", sub, line)
        line = line.replace('src="media/', 'src="' + "../" * (len(Path(here).parts) - 1) + 'media/')
        line = line.replace('<span id="acceptance_tests" class="anchor"></span>', '')
        if in_audit:
            if PLAIN_H2.match(line): line = "## " + line
            elif PLAIN_H3.match(line): line = "### " + line
            elif line in PLAIN_H4 or PLAIN_STEP.match(line): line = "#### " + line
        res.append(line)
    return res


def normalise(s):
    s = re.sub(r"<!-- nav -->.*\n?", "", s)
    s = re.sub(r"\]\([^)]*\)", "]()", s)
    s = re.sub(r'src="[^"]*media/', 'src="media/', s)
    s = s.replace('<span id="acceptance_tests" class="anchor"></span>', '')
    s = re.sub(r"(?m)^#{1,4} (?=(?:[1-7] \\\| |Pilot [A-D] \\\| |AIME I{1,2} \\#|\d\\\. |" + "|".join(re.escape(h) for h in PLAIN_H4) + "))", "", s)
    return s.strip("\n")


def build(check=False, allow_edits=False):
    lines = SRC.read_text(encoding="utf-8").split("\n")
    books = parse(lines)
    files = ranges(lines, books)
    errors = []
    nch = sum(len(b["chapters"]) for b in books); nsec = sum(len(c["sections"]) for b in books for c in b["chapters"])
    for k, v in (("books", len(books)), ("chapters", nch), ("sections", nsec)):
        if v != EXPECT[k]: errors.append(f"{k}: found {v}, expected {EXPECT[k]}")
    # Coverage: every line in exactly one file (blank lines included).
    owner = [None] * len(lines)
    for f, rs in files.items():
        for a, z in rs:
            for i in range(a, z):
                if owner[i] is not None: errors.append(f"line {i+1} in both {owner[i]} and {f}")
                owner[i] = f
    missing = [i + 1 for i, o in enumerate(owner) if o is None and lines[i].strip()]
    if missing: errors.append(f"{len(missing)} nonblank source lines unassigned, first {missing[:5]}")
    # Anchors.
    books_by_anchor = {}
    for b in books:
        books_by_anchor[b["prefix"].lower()] = f"books/{b['id']}/README.md"
        for ch in b["chapters"]: books_by_anchor[ch["id"].lower().replace(".", "-")] = ch["file"]
    spec_anchor = {"twelve-book-shelf": "spec/shelf-and-levels.md", "implementation-and-editorial-standards": "spec/authoring-standards.md",
                   "archive-wide-coverage-and-teaching-validation": "spec/coverage-audit.md",
                   "solution-level-audit-and-teaching-pilots": "spec/solution-audit.md", "acceptance_tests": "spec/teaching-pilots.md#6--acceptance-tests-and-the-next-authoring-batch"}
    for i, l in enumerate(lines):
        for a in re.findall(r"\]\(#([A-Za-z0-9_-]+)\)", l):
            if a not in books_by_anchor and a not in spec_anchor: errors.append(f"line {i+1}: unresolved anchor #{a}")
    # Chapter metadata and the "Next" chain.
    index = {"source": "curriculum/source/master-roadmap.docx", "books": []}
    for b in books:
        chs = []
        for ci, ch in enumerate(b["chapters"]):
            meta = chapter_meta(lines, ch)
            want = b["chapters"][ci + 1]["id"].lower().replace(".", "-") if ci + 1 < len(b["chapters"]) else None
            if meta["nextLink"] != want:
                errors.append(f"{ch['id']}: next link {meta['nextLink']} but next chapter {want}") if not (want and meta["nextLink"] is None) else None
            chs.append({"id": ch["id"], "title": ch["title"], "file": "curriculum/" + ch["file"], "sections": ch["sections"], **{k: v for k, v in meta.items() if k != "nextLink"}})
        index["books"].append({"prefix": b["prefix"], "id": b["id"], "title": b["title"], "file": f"curriculum/books/{b['id']}/README.md", "chapters": chs})
    # Write or compare.
    nav_titles = {f: t for f, t, *_ in SPEC_BLOCKS if t}
    for f, rs in files.items():
        here = f
        audit = f in ("spec/solution-audit.md", "spec/teaching-pilots.md")
        body = []
        for a, z in rs:
            body += transform(lines[a:z], here, books_by_anchor, spec_anchor, audit)
        up = "../" * (len(Path(here).parts) - 1)
        if f.startswith("books/") and not f.endswith("README.md"):
            bid = f.split("/")[1]; bt = BOOK_BY_PREFIX[next(p for p, i, _ in BOOKS if i == bid)][1]
            nav = f"<!-- nav --> [Curriculum]({up}README.md) · [{bt}](README.md) · [Tracker]({up}TRACKER.md)"
        elif f.startswith("books/"):
            nav = f"<!-- nav --> [Curriculum]({up}README.md) · [Tracker]({up}TRACKER.md)"
        else:
            nav = f"<!-- nav --> [Curriculum]({up}README.md) · {nav_titles.get(f.split('/')[-1], '')}"
        text = nav + "\n\n" + "\n".join(body).strip("\n") + "\n"
        path = CUR / f
        if check:
            if not path.exists(): errors.append(f"missing {f}"); continue
            if not allow_edits and normalise(path.read_text(encoding="utf-8")) != normalise("\n".join(lines[a] for a0, z0 in rs for a in range(a0, z0))):
                errors.append(f"{f} differs from its source lines")
        else:
            if path.exists() and not FORCE:
                raise SystemExit(f"refusing to overwrite {f}: the split files are now edited under change control "
                                 "(curriculum/REVIEW-NOTES.md §4). Rerun with --force-resplit only to rebuild from the import.")
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(text, encoding="utf-8")
    idx_path = CUR / "data" / "index.json"
    idx_text = json.dumps(index, ensure_ascii=False, indent=1) + "\n"
    if check:
        if not allow_edits and (not idx_path.exists() or idx_path.read_text(encoding="utf-8") != idx_text): errors.append("curriculum/data/index.json is stale")
        tracker = (CUR / "TRACKER.md").read_text(encoding="utf-8") if (CUR / "TRACKER.md").exists() else ""
        for b in books:
            for ch in b["chapters"]:
                if not re.search(r"^\| \[?" + re.escape(ch["id"]) + r"\b", tracker, re.M): errors.append(f"TRACKER.md has no row for {ch['id']}")
    elif FORCE:
        idx_path.parent.mkdir(parents=True, exist_ok=True); idx_path.write_text(idx_text, encoding="utf-8")
    return errors, books, index


FORCE = "--force-resplit" in sys.argv

if __name__ == "__main__":
    check = "--check" in sys.argv
    errs, books, index = build(check=check, allow_edits="--allow-edits" in sys.argv)
    n = sum(len(b["chapters"]) for b in books); s = sum(len(c["sections"]) for b in books for c in b["chapters"])
    for e in errs: print("ERROR:", e)
    print(f"{len(books)} books, {n} chapters, {s} concept sections; {'check' if check else 'build'} {'failed' if errs else 'passed'}")
    sys.exit(1 if errs else 0)
