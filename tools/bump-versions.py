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
if any(f.startswith("js/data/learn/") and f.endswith(".js") for f in files):
    summary = "js/data/learn-summary.js"
    before = open(summary, "rb").read() if os.path.exists(summary) else b""
    subprocess.run(["node", "tools/build-learn-summary.cjs"], check=True)
    with open(summary, "rb") as generated:
        if generated.read() != before and summary not in files:
            files.append(summary)
html = open("index.html").read()
catalog_sources = {
    "js/contest-sources.js", "tools/build-problem-catalog.cjs",
    "js/data/problems/problem-db.js", "js/data/problems/contest-papers.js",
    "js/data/problems/problem-aliases.json", "js/data/problems/difficulty-ratings.js",
    "js/data/topic-tree.js", "js/data/lesson-topics.js", "js/data/learn/shelf.js",
    "js/data/learn-summary.js",
}
for f in files:
    if f in {"js/data/problems/lesson-links.js", "js/data/problems/problem-catalog.js"} or f.startswith("js/data/problems/solutions/"):
        continue
    pat = re.compile(r'(%s\?v=)(\d+)' % re.escape(f))
    if pat.search(html):
        html = pat.sub(lambda m: m.group(1) + str(int(m.group(2)) + 1), html)
        print("bumped", f)
open("index.html", "w").write(html)
if catalog_sources.intersection(files):
    subprocess.run(["node", "tools/build-problem-catalog.cjs"], check=True)
subprocess.run([sys.executable, "tools/sync-lab-versions.py"])

ref = "reference/index.html"
css = re.search(r'css/styles\.css\?v=(\d+)', html)
if css:
    with open(ref) as f:
        old = f.read()
    updated = re.sub(r"(?<=css/styles.css\?v=)\d+", css[1], old)
    if updated != old:
        with open(ref, "w") as f:
            f.write(updated)
