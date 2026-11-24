import os, re, json, subprocess
from pathlib import Path
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
ROOT = Path(__file__).resolve().parents[2]
st = json.loads(subprocess.check_output(['node', '-e', "global.window={};const fs=require('fs');for(const f of fs.readdirSync('js/data/problems/statements/utah'))require('./js/data/problems/statements/utah/'+f);console.log(JSON.stringify(window.MATH_STATEMENTS))"], cwd=ROOT))
db = json.loads(subprocess.check_output(['node', '-e', "global.window={};require('./js/data/problems/problem-db.js');console.log(JSON.stringify(window.MATH_PROBLEM_DB.map(p=>p.ref)))"], cwd=ROOT))
want = {}
for r in db:
    m = re.match(r'(\d{4}) Utah State Math Contest (Junior|Senior), Problem (\d+)$', r)
    if m: want.setdefault((m.group(1), m.group(2)), []).append(int(m.group(3)))
LET1 = re.compile(r'(?im)(?:correct\s+answer\s*:?\s*[^\n()]{0,20}?\(?|solution\s*:?\s*\(|^\s*\d+\s*\.\s*\(|answer\s*:?\s*\()([a-e])\)\s*([^\n]{0,40})')
LET2 = re.compile(r'(?im)(?:the\s+answer\s+is|correct\s+answer\s*:)\s*\(?([a-e])\)?(?=[.)]|[ \t]*$)()')
class _L:
    def findall(self, seg):
        return LET1.findall(seg) or LET2.findall(seg)
LET = _L()
# Solution sections that state a value or conclusion instead of a consistently formatted letter.
reviewed = {
    ('2011', 'Junior'): {3: 'E', 5: 'B'},
    ('2016', 'Junior'): {12: 'A', 13: 'B', 31: 'B', 33: 'A', 35: 'E', 37: 'E', 38: 'C'},
    ('2016', 'Senior'): {11: 'A', 30: 'B', 32: 'A', 34: 'D', 37: 'C'},
    ('2017', 'Junior'): {3: 'C'},
    ('2018', 'Junior'): {37: 'C'},
    ('2020', 'Junior'): {20: 'C'},
    ('2020', 'Senior'): {33: 'B'},
}
def choice_text(s, letter):
    m = re.search(r'\(%s\)\s*(.*?)(?=\s*\([a-eA-E]\)\s|$)' % letter, s, re.S | re.I)
    return m.group(1) if m else None
def norm(x):
    x = re.sub(r'\\(?:d|t)frac', r'\\frac', x or '')
    return re.sub(r'[\s$,{}\\]|\\text|[.;]$', '', x).lower()
def split(t, top):
    starts, pos = [], 0
    for n in range(1, top + 1):
        m = re.compile(r'(?m)^\s*%d\s*\.(?!\d)' % n).search(t, pos)
        if not m: return None
        starts.append(m.start()); pos = m.end()
    starts.append(len(t))
    return {n: t[starts[n - 1]:starts[n]] for n in range(1, top + 1)}
out, report, checks = {}, [], [0, 0]
for (y, kind), nums in sorted(want.items()):
    path = K + f'utah/{y}{kind}.pdf'
    if not os.path.exists(path): report.append((y, kind, 'no file')); continue
    t = subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True).stdout.replace('\u200b', '')
    res = {}
    if y == '2013':  # The official results use the same numbered key for both papers.
        for numbers, letters in re.findall(r'(?m)^\s*Question\s+([0-9 \t]+)\s*\n\s*Correct\s+([A-E \t]+)\s*$', t):
            questions, choices = numbers.split(), letters.split()
            if len(questions) == len(choices): res.update((int(n), a) for n, a in zip(questions, choices))
        if sorted(res) != list(range(1, 31)): res = {}
    elif y == '2014':  # Junior and Senior columns each end with #30, mislabeled #20.
        rows = re.findall(r'(?m)^\s*(\d+)\s+([A-E])\s+(\d+)\s+([A-E])\s+(\d+)\s+([A-E])\s+(\d+)\s+([A-E])\s*$', t)
        numbered = [(n, n + 15, n, n + 15) for n in range(1, 15)] + [(15, 20, 15, 20)]
        if [tuple(int(row[i]) for i in (0, 2, 4, 6)) for row in rows] == numbered:
            offset = 0 if kind == 'Junior' else 4
            for n, row in enumerate(rows, 1):
                res[n], res[n + 15] = row[offset + 1], row[offset + 3]
    elif y == '2019':
        letters = re.findall(r'(?im)^[ \t]*Correct Answer:[ \t]*\([ \t]*([A-E])[ \t]*\)', t.replace('\f', '\n'))
        if len(letters) == len(nums) == 40:
            res = dict(enumerate(map(str.upper, letters), 1))
    else:
        best = {}
        for start in [0] + [m.start() for m in re.finditer(r'(?i)solutions', t)]:
            segs = split(t[start:], max(nums))
            if not segs: continue
            cur = {}
            for n, seg in segs.items():
                L = LET.findall(seg)
                if L: cur[n] = L[0]
            if len(cur) > len(best): best = cur
        for n, (letter, val) in best.items():
            res[n] = letter.upper()
            ct = choice_text(st.get(f'{y}-utah-state-math-contest-{kind.lower()}-{n}', {}).get('s', ''), letter)
            if ct and val.strip():
                v, c = norm(val.split('  ')[0]), norm(ct)
                if v and c:
                    checks[0 if (v.startswith(c[:6]) or c.startswith(v[:6])) else 1] += 1
    res.update(reviewed.get((y, kind), {}))
    miss = [n for n in nums if n not in res]
    for n in nums:
        if n in res: out[f'{y}-utah-state-math-contest-{kind.lower()}-{n}'] = res[n]
    report.append((y, kind, len(nums) - len(miss), 'of', len(nums), miss[:10]))
json.dump(out, open(K + 'utah.json', 'w'), indent=0)
print(len(out), 'keys; value checks agree/disagree', checks)
for r in report: print(r)
