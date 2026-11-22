import os, re, json, subprocess
D = '' + (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work')) + '/umd/'
U = json.load(open('' + (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work')) + '/urls.json'))
st = json.loads(subprocess.check_output(['node', '-e', "global.window={};const fs=require('fs');for(const f of fs.readdirSync('js/data/problems/statements/umd'))require('./js/data/problems/statements/umd/'+f);console.log(JSON.stringify(window.MATH_STATEMENTS))"], cwd='/home/user/CompMath2.0'))
def choices(s):
    out = {}
    for m in re.finditer(r'\(([A-E])\)\s*(.*?)(?=\s*\([A-E]\)\s|$)', s, re.S):
        out[m.group(1)] = m.group(2)
    return out
def norm(x):
    x = re.sub(r'\\(?:dfrac|tfrac)', r'\\frac', x)
    x = re.sub(r'[\s$,{}\\]|\\text|\.$', '', x)
    return x.lower()
def segments(t):
    segs, pos = {}, 0
    starts = []
    for n in range(1, 26):
        m = re.compile(r'(?m)^\s*(?:Problem\s+)?%d\.(?!\d)' % n).search(t, pos)
        if not m: return None
        starts.append(m.start()); pos = m.end()
    starts.append(len(t))
    return [t[starts[i]:starts[i + 1]] for i in range(25)]
out, report = {}, {}
for y in sorted(U['UMD']):
    path = D + y + '.pdf'
    if not os.path.exists(path): report[y] = 'no file'; continue
    t = subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True).stdout
    segs = segments(t)
    if not segs: report[y] = 'could not split'; continue
    got, miss = 0, []
    for n, seg in enumerate(segs, 1):
        slug = f'{y}-umd-hsmc-part-i-{n}'
        L = re.findall(r'(?i)answer(?:\s+is)?\s*:?\s*\(?([a-e])\)?(?=[.,;)]|\s*$|\s*\n)', seg)
        if L:
            out[slug] = L[-1].upper(); got += 1; continue
        v = re.search(r'(?i)answer:?\s*([^\n]*?)\.(?:\s|$)', seg)
        ch = choices(st.get(slug, {}).get('s', ''))
        if v and ch:
            hits = [k for k, c in ch.items() if norm(c) == norm(v.group(1))]
            if len(hits) == 1:
                out[slug] = hits[0]; got += 1; continue
        miss.append(n)
    report[y] = (got, miss)
json.dump(out, open(D + 'keys.json', 'w'), indent=0)
print(len(out), 'keys')
for y, r in report.items(): print(y, r)
