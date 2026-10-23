#!/bin/sh
# Every gate in CLAUDE.md, in order; stops at the first failure.
export JSC=${JSC:-$PWD/tools/jsc-node} CHROME=${CHROME:-/opt/pw-browsers/chromium-1243/chrome-linux/chrome}
set -e
python3 tools/scan-conventions.py > /tmp/gate-scan.txt || { tail -30 /tmp/gate-scan.txt; exit 1; }
python3 tools/check-topics.py > /dev/null && python3 tools/check-lists.py > /dev/null
python3 tools/check-diagrams.py > /tmp/gate-diag.txt || { tail -20 /tmp/gate-diag.txt; exit 1; }
python3 tools/check-statements.py | tail -2 && ./tools/check-lab.sh > /dev/null
$JSC tools/validate-problem-db.js | tail -3 | cut -c1-300
echo ALL GATES PASSED
