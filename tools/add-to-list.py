#!/usr/bin/env python3
"""Add card ids to a section of a built-in list, and keep the blurb's "N cards across M sections" true.

    python3 tools/add-to-list.py <list-id> "<section title>" id1 id2 ...
"""
import re, sys, os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = "js/data/built-in-lists.js"
lid, title, ids = sys.argv[1], sys.argv[2], sys.argv[3:]
s = open(P).read()
start = s.index('{ id: "%s"' % lid)
nxt = s.find("\n  { id: ", start + 5)
end = nxt if nxt > 0 else len(s)
block = s[start:end]
m = re.search(r'\{ title: "%s",.*?ids: \[([^\]]*)\]' % re.escape(title), block, re.S)
assert m, "no section " + title
cur = re.findall(r'"([^"]+)"', m.group(1))
cur += [i for i in ids if i not in cur]
block = block[:m.start(1)] + ", ".join('"%s"' % i for i in cur) + block[m.end(1):]
n = sum(len(re.findall(r'"([^"]+)"', x)) for x in re.findall(r'ids: \[([^\]]*)\]', block))
k = len(re.findall(r'\{ title: "', block))
block = re.sub(r'\d+ cards across \d+ sections', "%d cards across %d sections" % (n, k), block, count=1)
s = s[:start] + block + s[end:]
open(P, "w").write(s)
print(lid, "/", title, "->", len(cur), "ids;", n, "cards in", k, "sections")
