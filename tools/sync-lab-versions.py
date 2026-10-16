#!/usr/bin/env python3
"""Give every script and stylesheet a lab page loads from the app (../js/..., ../css/...,
../vendor/...) the same ?v= that index.html gives it. Without a version, a browser keeps serving
an old copy of a data file, and the lab pages then miss cards added since.

  python3 tools/sync-lab-versions.py           # rewrite the lab pages
  python3 tools/sync-lab-versions.py --check   # exit 1 if any lab page is out of step
"""
import io, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
index = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
ver = dict(re.findall(r'(?:src|href)="((?:js|css|vendor)/[^"?]+)\?v=([^"]+)"', index))
check = "--check" in sys.argv
bad = []
for name in sorted(os.listdir(os.path.join(ROOT, "lab"))):
    if not name.endswith(".html"):
        continue
    p = os.path.join(ROOT, "lab", name)
    s = io.open(p, encoding="utf-8").read()
    def fix(m):
        attr, path, old = m.group(1), m.group(2), m.group(3)
        v = ver.get(path)
        if v is None:
            return m.group(0)
        if old != v:
            bad.append("%s: %s has %s, index.html has %s" % (name, path, old or "no version", v))
        return '%s="../%s?v=%s"' % (attr, path, v)
    t = re.sub(r'(src|href)="\.\./((?:js|css|vendor)/[^"?]+)(?:\?v=([^"]+))?"', fix, s)
    if t != s and not check:
        io.open(p, "w", encoding="utf-8").write(t)
for b in bad[:30]:
    print("  " + b)
if check:
    print("OK - every lab page loads the same versions as index.html" if not bad else "FAIL - lab versions out of step (run tools/sync-lab-versions.py)")
    sys.exit(1 if bad else 0)
print("updated %d references" % len(bad))
