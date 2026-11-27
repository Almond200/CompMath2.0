#!/usr/bin/env python3
"""Check the curriculum specification, the chapter tracker and the authoring packets.

Reads the chapter files under curriculum/books/ as they now stand (they are edited under change
control; tools/curriculum/build-curriculum.py only verifies the original import). Checks:

  * 12 books, 136 chapters, 791 concept sections; file names match chapter IDs; sections are
    numbered 1, 2, 3, ... within each chapter;
  * every "Next in this volume" link points to the following chapter's file;
  * every curriculum ID cited in the books, spec, packets and authoring standard exists
    (a chapter like G2.7 or a section like G2.7.4);
  * deferred chapters (A2.22) are cited by no packet;
  * TRACKER.md has one row per chapter with a known stage;
  * every packet problem row names a real problem, its Key column matches the live answer key,
    its placement is a section of the packet's chapter or "forward → <existing ID>", and no
    canonical problem identity is placed twice across all packets (AMC 10/12 twins via
    js/data/problems/problem-aliases.json; other twins declared in the packet as
    "Twin `slug` is not placed again");
  * curriculum/data/index.json matches the chapter files (rewrite it with --write).

usage: python3 tools/curriculum/check-spec.py [--write]
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CUR = ROOT / "curriculum"
P = ROOT / "js" / "data" / "problems"
ID = re.compile(r"(?<![\w.])([AGNC][1-3])\.(\d{1,2})(?:\.(\d{1,2}))?(?![\d])")
STAGES = {"S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "Deferred"}
errors = []
def err(m): errors.append(m)

# ---------- chapters ----------
books = []
for bdir in sorted((CUR / "books").iterdir()):
    readme = (bdir / "README.md").read_text(encoding="utf-8")
    m = re.search(r"^# (.+)$", readme, re.M)
    chapters = []
    for f in sorted(bdir.glob("*.md")):
        if f.name == "README.md": continue
        t = f.read_text(encoding="utf-8")
        h = re.search(r"^## ((?:A|G|N|C)[1-3]\.\d+) — (.+)$", t, re.M)
        if not h: err(f"{f}: no chapter heading"); continue
        cid, title = h.group(1), h.group(2)
        want = f"{cid.split('.')[0]}.{int(cid.split('.')[1]):02d}-"
        if not f.name.startswith(want): err(f"{f.name}: file name does not match {cid}")
        secs = [{"id": s.group(1), "title": s.group(2)} for s in re.finditer(r"^### ((?:A|G|N|C)[1-3]\.\d+\.\d+) (.+)$", t, re.M)]
        for i, s in enumerate(secs, 1):
            if s["id"] != f"{cid}.{i}": err(f"{cid}: section {i} is numbered {s['id']}")
        label = next((l.strip("*") for l in t.split("\n")[3:8] if l.startswith("**") and ("CHAPTER" in l or "ANCHOR" in l)), "")
        y2 = re.search(r"Original Lesson (\d+)", label)
        nxt = re.search(r"^\*\*Next in this volume:\*\* \[[^\]]+\]\(([^)]+)\)", t, re.M)
        chapters.append({"id": cid, "title": title, "file": f"curriculum/books/{bdir.name}/{f.name}", "sections": secs,
                         "basis": f"Year 2 L{y2.group(1)}" if y2 else "Proposed",
                         "status": "deferred" if "**Status: deferred" in t else ("optional" if "OPTIONAL" in label else "core"),
                         "_next": nxt.group(1) if nxt else None, "_text": t})
    chapters.sort(key=lambda c: int(c["id"].split(".")[1]))
    books.append({"prefix": chapters[0]["id"].split(".")[0] if chapters else "?", "id": bdir.name, "title": m.group(1) if m else bdir.name,
                  "file": f"curriculum/books/{bdir.name}/README.md", "chapters": chapters})
order = {"A": 0, "G": 1, "N": 2, "C": 3}
books.sort(key=lambda b: (order[b["prefix"][0]], b["prefix"]))
nb, nc, ns = len(books), sum(len(b["chapters"]) for b in books), sum(len(c["sections"]) for b in books for c in b["chapters"])
for k, v, want in (("books", nb, 12), ("chapters", nc, 136), ("sections", ns, 791)):
    if v != want: err(f"{k}: {v}, expected {want}")
chap = {c["id"]: c for b in books for c in b["chapters"]}
sect = {s["id"] for c in chap.values() for s in c["sections"]}
for b in books:
    for i, c in enumerate(b["chapters"]):
        nxt = b["chapters"][i + 1] if i + 1 < len(b["chapters"]) else None
        if c["_next"] and (not nxt or Path(c["_next"]).name != Path(nxt["file"]).name):
            err(f"{c['id']}: 'Next in this volume' points to {c['_next']}, not the following chapter")
        if nxt and not c["_next"] and nxt["status"] == "core":
            err(f"{c['id']}: no 'Next in this volume' link to {nxt['id']}")

# ---------- cross-references ----------
scan = list((CUR / "books").glob("*/*.md")) + list((CUR / "spec").glob("*.md")) + list((CUR / "packets").glob("*.md")) + [CUR / "AUTHORING-STANDARD.md"]
for f in scan:
    if not f.exists(): continue
    for n, line in enumerate(f.read_text(encoding="utf-8").split("\n"), 1):
        line = re.sub(r"\]\([^)]*\)", "]()", line)  # link targets hold zero-padded file names
        for m in ID.finditer(line):
            ref = m.group(0)
            ok = ref in sect if m.group(3) else ref in chap
            if not ok: err(f"{f.relative_to(ROOT)}:{n}: unknown curriculum ID {ref}")

# ---------- tracker ----------
tracker = (CUR / "TRACKER.md").read_text(encoding="utf-8")
rows = {m.group(1): m.group(2).strip() for m in re.finditer(r"^\| \[((?:A|G|N|C)[1-3]\.\d+)\]\([^)]*\) \|[^|]*\|[^|]*\|[^|]*\| ([^|]+) \|", tracker, re.M)}
for cid, c in chap.items():
    if cid not in rows: err(f"TRACKER.md: no row for {cid}")
    elif rows[cid].split(" ")[0] not in STAGES: err(f"TRACKER.md: {cid} has unknown stage {rows[cid]!r}")
    elif c["status"] == "deferred" and not rows[cid].startswith("Deferred"): err(f"TRACKER.md: {cid} is deferred but its stage is {rows[cid]!r}")

# ---------- problems: database, keys, aliases ----------
def slug(ref): return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", re.sub(r",?\s*problem\s+", "-", ref.lower())))
db = {slug(r) for r in re.findall(r'\bref: "([^"]+)"', (P / "problem-db.js").read_text(encoding="utf-8"))}
keys = {}
for f in ("answer-keys.js", "answer-keys-more.js"):
    for s, v in re.findall(r'^\s*"([a-z0-9-]+)": "([^"]*)"', (P / f).read_text(encoding="utf-8"), re.M): keys[s] = [v]
short = (P / "answer-keys-short.js").read_text(encoding="utf-8")
short = short[short.index("\n  answers: {"):]
for s, body in re.findall(r'^\s*"([a-z0-9-]+)": \{(.*)\},?$', short, re.M):
    a = re.search(r'"answers": \[([^\]]*)\]', body)
    if a: keys[s] = re.findall(r'"((?:[^"\\]|\\.)*)"', a.group(1))
alias = json.loads((P / "problem-aliases.json").read_text(encoding="utf-8"))
canon = lambda s: alias.get(s, s)

placed = {}
for pk in sorted((CUR / "packets").glob("*.md")):
    t = pk.read_text(encoding="utf-8"); cid = pk.stem
    if cid not in chap: err(f"{pk.name}: no chapter {cid}"); continue
    if "A2.22" in t: err(f"{pk.name}: cites the deferred chapter A2.22")
    for row in re.finditer(r"^\| ([PF]\d+) \| `([a-z0-9-]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$", t, re.M):
        rid, s, role, place, key, check = (x.strip() for x in row.groups())
        if s not in db: err(f"{pk.name} {rid}: {s} is not in the problem database"); continue
        live = keys.get(s)
        if live is None: err(f"{pk.name} {rid}: {s} has no live answer key")
        elif key not in live: err(f"{pk.name} {rid}: Key {key!r} does not match the live key {live}")
        tw = re.findall(r"Twin `([a-z0-9-]+)`", check)
        for x in tw:
            if x not in db: err(f"{pk.name} {rid}: twin {x} is not in the problem database")
        ident = canon(s)
        for x in tw + [s]:
            k = canon(x)
            if k in placed and placed[k] != (pk.name, rid): err(f"{pk.name} {rid}: {x} is already placed as {placed[k]}")
            placed[k] = (pk.name, rid)
        if place.startswith("forward"):
            tgt = place.split("→")[-1].strip()
            if tgt not in chap and tgt not in sect: err(f"{pk.name} {rid}: forward target {tgt} does not exist")
            if tgt == cid or tgt.startswith(cid + "."): err(f"{pk.name} {rid}: forward placement into its own chapter")
        elif place not in ("Opening", "Close", "Review", "Challenge", "Mixed") and not place.startswith(cid + ".") and not place.startswith(cid + " "):
            first = place.split()[0]
            if first != cid and not first.startswith(cid + "."): err(f"{pk.name} {rid}: placement {place!r} is not in {cid}")
            elif first not in sect and first != cid: err(f"{pk.name} {rid}: placement {first} does not exist")
        elif place.startswith(cid + ".") and place.split()[0] not in sect: err(f"{pk.name} {rid}: placement {place.split()[0]} does not exist")

# ---------- index ----------
index = {"source": "curriculum/source/master-roadmap.docx", "note": "Generated by tools/curriculum/check-spec.py --write from the chapter files.",
         "books": [{"prefix": b["prefix"], "id": b["id"], "title": b["title"], "file": b["file"],
                    "chapters": [{k: v for k, v in c.items() if not k.startswith("_")} for c in b["chapters"]]} for b in books]}
text = json.dumps(index, ensure_ascii=False, indent=1) + "\n"
ip = CUR / "data" / "index.json"
if "--write" in sys.argv: ip.write_text(text, encoding="utf-8")
elif ip.read_text(encoding="utf-8") != text: err("curriculum/data/index.json is stale (run with --write)")

for e in errors: print("ERROR:", e)
npk = len(list((CUR / "packets").glob("*.md")))
print(f"{nb} books, {nc} chapters, {ns} sections; {npk} packets, {len(placed)} problem identities placed; {'failed' if errors else 'passed'}")
sys.exit(1 if errors else 0)
