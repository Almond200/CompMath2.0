import os, re, json, subprocess, urllib.request, concurrent.futures
from pathlib import Path
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
U = json.load(open(K + 'urls.json'))
db = json.loads(subprocess.check_output(['node', '-e', "global.window={};require('./js/data/problems/problem-db.js');console.log(JSON.stringify(window.MATH_PROBLEM_DB.map(p=>p.ref)))"], cwd=Path(__file__).resolve().parents[2]))
slug = lambda r: re.sub(r'^-+|-+$', '', re.sub(r'[^a-z0-9]+', '-', re.sub(r',?\s*problem\s+', '-', r.lower())))
want = {}
for r in db:
    m = re.match(r'(\d{4}) (Utah State Math Contest (Junior|Senior)|Columbus State Tournament), Problem (\d+)$', r)
    if m: want.setdefault((m.group(1), m.group(3) or 'C'), []).append(int(m.group(4)))
def fetch(url, path):
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r: open(path, 'wb').write(r.read())
    return subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True).stdout
def parse(t, nums, pat):
    # Walk the question numbers in order; each block's last answer pattern gives its letter.
    starts, pos = [], 0
    top = max(nums)
    for n in range(1, top + 1):
        m = re.compile(r'(?m)^\s*(?:Problem\s+)?%d\s*[.)](?!\d)' % n).search(t, pos)
        if not m: return None, n
        starts.append(m.start()); pos = m.end()
    starts.append(len(t))
    res = {}
    for n in nums:
        seg = t[starts[n - 1]:starts[n]]
        L = re.findall(pat, seg)
        if L: res[n] = L[-1].upper()
    return res, None
UT = r'(?i)correct\s+answer\s*:?[^\n]*?\(([a-e])\)'
CO = r'(?i)correct\s+answer\s+is\s*:?\s*\(?([a-f])\)'
jobs = []
for (y, kind), nums in want.items():
    if kind == 'C':
        f = U['COLUMBUS'].get(y)
        if f and len(f) > 1 and f[1]: jobs.append((y, kind, nums, 'https://www.columbusstate.edu/math/_docs/tournament/' + f[1], CO))
    else:
        f = U['UTAH'][y][kind]
        jobs.append((y, kind, nums, 'https://www.weber.edu/wsuimages/statemathcontest/Exams/' + f[1], UT))
def run(j):
    y, kind, nums, url, pat = j
    path = K + ('col/' if kind == 'C' else 'utah/') + y + kind + '.pdf'
    try: t = fetch(url, path)
    except Exception as e: return j, None, 'fetch ' + str(e)[:60]
    res, stop = parse(t, nums, pat)
    return j, res, stop
out, report = {}, []
with concurrent.futures.ThreadPoolExecutor(6) as ex:
    for j, res, err in ex.map(run, jobs):
        y, kind, nums = j[:3]
        if res is None: report.append((y, kind, 'stopped at', err)); continue
        miss = [n for n in nums if n not in res]
        for n, a in res.items():
            s = f'{y}-columbus-state-tournament-{n}' if kind == 'C' else f'{y}-utah-state-math-contest-{kind.lower()}-{n}'
            out[s] = a
        report.append((y, kind, len(res), 'of', len(nums), 'missing', miss[:12]))
json.dump(out, open(K + 'utcol.json', 'w'), indent=0)
print(len(out), 'keys')
for r in sorted(report): print(r)
