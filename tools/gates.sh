#!/bin/sh
# Every gate in CLAUDE.md, in order; stops at the first failure.
export JSC=${JSC:-$PWD/tools/jsc-node} CHROME=${CHROME:-/opt/pw-browsers/chromium-1243/chrome-linux/chrome}
set -e
python3 tools/scan-conventions.py > /tmp/gate-scan.txt || { tail -30 /tmp/gate-scan.txt; exit 1; }
python3 tools/check-topics.py > /tmp/gate-topics.txt || { tail /tmp/gate-topics.txt; exit 1; }
python3 tools/check-lists.py > /tmp/gate-lists.txt || { tail /tmp/gate-lists.txt; exit 1; }
python3 tools/build-learn-shelf.py --check || exit 1   # the Learn shelf matches LEARN-OUTLINE.md
python3 tools/build-topic-tree.py --check || exit 1   # js/data/topic-tree.js matches TOPIC-TREE.md
node tools/check-topic-tree.js > /tmp/gate-tree.txt || { cat /tmp/gate-tree.txt; exit 1; }   # tree, card homes, problem tree tags
node tests/topic-tree-structure.cjs || exit 1   # moved stable ids, ancestry and malformed trees
node tests/practice-topics.cjs || exit 1          # tree-only practice pools, twins and eligibility
node tools/practice-gaps.js --check > /tmp/gate-practice.txt || { cat /tmp/gate-practice.txt; exit 1; }   # every card has two practice problems
python3 tools/check-diagrams.py > /tmp/gate-diag.txt || { tail -20 /tmp/gate-diag.txt; exit 1; }
python3 tools/check-statements.py > /tmp/gate-stmt.txt || { tail -20 /tmp/gate-stmt.txt; exit 1; }   # not piped: a pipe would hide its exit code
tail -2 /tmp/gate-stmt.txt && ./tools/check-lab.sh > /dev/null
$JSC tools/validate-problem-db.js > /tmp/gate-db.txt 2>&1; tail -2 /tmp/gate-db.txt | cut -c1-300; grep -q '^OK' /tmp/gate-db.txt || { grep -i violation /tmp/gate-db.txt | head; exit 1; }
echo ALL GATES PASSED
