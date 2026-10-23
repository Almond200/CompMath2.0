#!/usr/bin/env python3
"""Bump ?v= in index.html for every file named, then sync the lab pages.

    python3 tools/bump-versions.py js/app.js css/styles.css ...
    python3 tools/bump-versions.py --changed      # every file git reports as changed

A version is a plain integer; each named file's goes up by one.
"""
import re, subprocess, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
files = sys.argv[1:]
if files == ["--changed"]:
    out = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout
    files = [l[3:].strip() for l in out.splitlines()]
html = open("index.html").read()
for f in files:
    pat = re.compile(r'(%s\?v=)(\d+)' % re.escape(f))
    if pat.search(html):
        html = pat.sub(lambda m: m.group(1) + str(int(m.group(2)) + 1), html)
        print("bumped", f)
open("index.html", "w").write(html)
subprocess.run([sys.executable, "tools/sync-lab-versions.py"])
