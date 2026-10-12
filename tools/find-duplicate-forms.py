#!/usr/bin/env python3
"""List formulas that are stated more than once: on two or more cards' thumbnails, or in a card's
own thumbnail and description. Rule 17 (one fact, one home): the fact belongs on the card that
owns it; the other cards point to it. This only finds candidates; a person decides which card
owns the fact (a shared Key form that is a deliberate contrast is fine).

Run from the repo root:  python3 tools/find-duplicate-forms.py [--min-len 14]
"""
import io, re, sys, collections
sys.argv_saved = sys.argv
MINLEN = 14
if "--min-len" in sys.argv: MINLEN = int(sys.argv[sys.argv.index("--min-len") + 1])

def cards():
    s = {}
    import importlib.util, os
    spec = importlib.util.spec_from_file_location("sc_cards", os.path.join(os.path.dirname(__file__), "scan-conventions.py"))
    # reuse the brace matcher without running the scanner: copy its function
    src = io.open(os.path.join(os.path.dirname(__file__), "scan-conventions.py"), encoding="utf-8").read()
    ns = {"io": io, "re": re}
    exec(src[src.index("def cards_of"):src.index("\n\n\n", src.index("def cards_of"))], ns)
    out = []
    for fam in ["geometry", "algebra", "number-theory", "counting", "patterns"]:
        out += ns["cards_of"](fam)
    return out

def field(blk, name):
    m = re.search(r"\n\s+" + name + r": String\.raw`(.*?)`", blk, re.S)
    return m.group(1) if m else ""

def norm(f):
    f = re.sub(r"\\(left|right|big|Big|bigl|bigr|displaystyle|,|;|!|:|quad|qquad)\b|\\[,;!:]", "", f)
    f = f.replace("\\dfrac", "\\frac").replace("\\tfrac", "\\frac").replace("\\dbinom", "\\binom")
    f = re.sub(r"\\text\{[^}]*\}", "", f)
    return re.sub(r"\s+", "", f)

def chunks(latex):
    for part in re.split(r"\\qquad|\\quad|\\\\|\;\s*\;", latex):
        for q in re.split(r",\s*(?=[^{}]*(?:\\[a-z]+|[A-Za-z]).*=)", part):
            n = norm(q)
            if len(n) >= MINLEN and ("=" in n or "\\iff" in n or "\\implies" in n): yield n

cs = cards()
where = collections.defaultdict(set)
for c in cs:
    for ch in chunks(field(c["blk"], "latex")): where[ch].add(c["id"])
print("== the same formula on two or more cards' thumbnails ==")
n = 0
for ch, ids in sorted(where.items(), key=lambda kv: -len(kv[1])):
    if len(ids) > 1:
        n += 1; print("  %s\n      %s" % (", ".join(sorted(ids)), ch[:120]))
print("  (%d)" % n)
print("\n== a formula in a card's thumbnail repeated in its own description ==")
m = 0
for c in cs:
    desc = field(c["blk"], "description")
    dmath = [norm(x) for x in re.findall(r"\$([^$]+)\$", desc)]
    for ch in set(chunks(field(c["blk"], "latex"))):
        if any(ch == d or (len(ch) >= MINLEN and ch in d) for d in dmath):
            m += 1; print("  %s: %s" % (c["id"], ch[:110]))
print("  (%d)" % m)
