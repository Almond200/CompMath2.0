#!/usr/bin/env python3
"""Add a batch of new cards in one go (CONVENTIONS §1 to §6 and "New cards are registered").

    python3 tools/add-cards.py batch.py

`batch.py` defines BATCH = {"label": ..., "date": ..., "cards": [...]}, each card a dict:

    file      the data file the card object goes in (js/data/algebra.js, js/data/patterns.js, ...)
    before    the id of a card in the target subsection; the new card is inserted just before it,
              which keeps it inside that subsection (CONVENTIONS §6)
    obj       the card object's text, from "{" to "}", in one of the canonical field orders
    group     patterns.js only: the title of the group whose `ids` list gains the card, after `before`
              when `before` is in that list, else at the end
    details   the write-up (without the surrounding String.raw), appended to details_file
    details_file
    example   (q, s)
    kind      formula | method | pattern (the rewrite-register conversion)

The figure (geometry cards) and the route lists are added by hand: run tools/check-lists.py after,
and it names every route the card must join.
"""
import json, re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
ns = {}
exec(open(sys.argv[1]).read(), ns)
B = ns["BATCH"]

def card_start(src, cid):
    i = src.index('id: "%s"' % cid)
    return src.rindex("{", 0, i)

ids = []
for c in B["cards"]:
    cid = re.search(r'id: "([^"]+)"', c["obj"]).group(1)
    ids.append(cid)
    src = open(c["file"]).read()
    assert 'id: "%s"' % cid not in src, "exists: " + cid
    at = card_start(src, c["before"])
    line_start = src.rindex("\n", 0, at) + 1
    indent = src[line_start:at]
    obj = "\n".join((indent + l if k else l) if l.strip() else l for k, l in enumerate(c["obj"].strip().split("\n")))
    src = src[:at] + obj + ",\n" + indent + src[at:]
    if c.get("group"):
        m = re.search(r'\{ title: "%s", blurb: "[^"]*", ids: \[([^\]]*)\]' % re.escape(c["group"]), src)
        assert m, "group " + c["group"]
        lst = re.findall(r'"([^"]+)"', m.group(1))
        if c["before"] in lst: lst.insert(lst.index(c["before"]), cid)
        else: lst.append(cid)
        src = src[:m.start(1)] + ", ".join('"%s"' % x for x in lst) + src[m.end(1):]
    open(c["file"], "w").write(src)
    # the subsection check of CONVENTIONS §6
    subs = [(m.start(), m.group(1)) for m in re.finditer(r'title: "([^"]+)"', src)]
    owner = [t for pos, t in subs if pos < src.index('id: "%s"' % cid)][-1]
    print(cid, "->", c["file"], "/", owner)
    d = open(c["details_file"]).read().rstrip()
    assert '"%s": String.raw`' % cid not in d
    d += "\nObject.assign(window.MATH_DETAILS, {\n\"%s\": String.raw`\n%s\n`\n});\n" % (cid, c["details"].strip("\n"))
    open(c["details_file"], "w").write(d)
    q, s = c["example"]
    with open("js/data/examples-supplement.js", "a") as f:
        f.write('window.MATH_EXAMPLES["%s"] = { q: String.raw`%s`, s: String.raw`%s` };\n' % (cid, q, s))

reg = json.load(open("tools/rewrite-register.json"))
for c, cid in zip(B["cards"], ids):
    reg["conversion"][cid] = c["kind"]
    reg["ledger"][cid] = [["(new card)", "written directly in the %s template" % c["kind"]]]
json.dump(reg, open("tools/rewrite-register.json", "w"), indent=2, ensure_ascii=False)
open("tools/rewrite-register.json", "a").write("\n")

nc = open("js/data/new-cards.js").read().rstrip()
assert nc.endswith("];")
entry = '  { label: %s, date: "%s",\n    ids: [%s] }\n' % (json.dumps(B["label"]), B["date"], ", ".join('"%s"' % i for i in ids))
nc = nc[:-2].rstrip()
nc = nc + ",\n" + entry + "];\n"
open("js/data/new-cards.js", "w").write(nc)
print("registered", len(ids), "cards as", B["label"])
