import os, re, json, subprocess
from pathlib import Path
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
R = Path(__file__).resolve().parents[2]
st = json.loads(subprocess.check_output(['node', '-e', "global.window={};const fs=require('fs');for(const f of fs.readdirSync('js/data/problems/statements/columbus'))require('./js/data/problems/statements/columbus/'+f);console.log(JSON.stringify(window.MATH_STATEMENTS))"], cwd=R))
db = json.loads(subprocess.check_output(['node', '-e', "global.window={};require('./js/data/problems/problem-db.js');console.log(JSON.stringify(window.MATH_PROBLEM_DB.map(p=>p.ref)))"], cwd=R))
want = {}
for r in db:
    m = re.match(r'(\d{4}) Columbus State Tournament, Problem (\d+)$', r)
    if m: want.setdefault(m.group(1), []).append(int(m.group(2)))
# A letter: "(b)" in any case, or a capital "B" followed by ")", ".", or the end of the line.
LET = re.compile(r'(?:answer\s+is|answer\s*:|ANSWER|answer\s+is\s+choice)\s*(?:\(([a-fA-F])\)|([A-F])(?=\)|\.|[ \t]*(?:\n|$)|[ \t]+\S))', re.I)
VAL = re.compile(r'(?i)answer\s+is\s*:?\s*([^\s.,;]+)')
def choices(s):
    return {m.group(1).upper(): m.group(2) for m in re.finditer(r'\(([A-Fa-f])\)\s*(.*?)(?=\s*\([A-Fa-f]\)\s|$)', s, re.S)}
def norm(x):
    x = re.sub(r'\\(?:d|t)frac', r'\\frac', x or '')
    return re.sub(r'[\s$,{}\\]|\\text|[.;]$', '', x).lower()
def split(t, top):
    starts, pos = [], 0
    for n in range(1, top + 1):
        m = re.compile(r'(?m)^\s*%d\s*[.)](?!\d)' % n).search(t, pos)
        if not m: return None
        starts.append(m.start()); pos = m.end()
    starts.append(len(t))
    return {n: t[starts[n - 1]:starts[n]] for n in range(1, top + 1)}
out, report = {}, []
for y, nums in sorted(want.items()):
    path = K + f'col/{y}C.pdf'
    if not os.path.exists(path): report.append((y, 'no file')); continue
    t = subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True).stdout.replace('​', '')
    res = {}
    if 'ANSWER KEY' in t:   # a table of question numbers and letters
        for n, a in re.findall(r'(?m)(?:^|\s)(\d{1,2})\s*[.)]?\s+([A-F])(?=\s|$)', t[t.index('ANSWER KEY'):]):
            if int(n) in nums and int(n) not in res: res[int(n)] = a
    if len(res) < len(nums) // 2:
        best = {}
        for start in [0] + [m.start() for m in re.finditer(r'(?i)solutions?', t)][:3]:
            segs = split(t[start:], max(nums))
            if not segs: continue
            cur = {}
            for n, seg in segs.items():
                L = LET.findall(seg)
                if L:
                    a, b = L[-1]; cur[n] = (a or b).upper(); continue
                v = VAL.findall(seg)
                ch = choices(st.get(f'{y}-columbus-state-tournament-{n}', {}).get('s', ''))
                if v and ch:
                    hits = [k for k, c in ch.items() if norm(c) == norm(v[-1])]
                    if len(hits) == 1: cur[n] = hits[0]
            if len(cur) > len(best): best = cur
        res = best
    for n in nums:
        if n in res: out[f'{y}-columbus-state-tournament-{n}'] = res[n]
    report.append((y, sum(n in res for n in nums), 'of', len(nums)))
json.dump(out, open(K + 'columbus.json', 'w'), indent=0)
print(len(out), 'keys')
for r in report: print(r)
