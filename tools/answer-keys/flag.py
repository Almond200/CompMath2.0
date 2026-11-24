import re, json, subprocess, sys
from pathlib import Path
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
R = Path(__file__).resolve().parents[2]
contest, keyfile, folder, sol = sys.argv[1:5]   # e.g. columbus columbus.json col '{y}C'
st = json.loads(subprocess.check_output(['node', '-e', "global.window={};const fs=require('fs');for(const f of fs.readdirSync('js/data/problems/statements/%s'))require('./js/data/problems/statements/%s/'+f);console.log(JSON.stringify(window.MATH_STATEMENTS))" % (contest, contest)], cwd=R))
keys = json.load(open(K + keyfile))
def choices(s):
    return {m.group(1).upper(): m.group(2) for m in re.finditer(r'\(([A-Fa-f])\)\s*(.*?)(?=\s*\([A-Fa-f]\)\s|$)', s, re.S)}
def num(c):
    c = re.sub(r'[\s$]|\\[,!;]', '', c)
    m = re.fullmatch(r'-?\d+(?:\.\d+)?', c.replace('{,}', '').replace(',', ''))
    return m.group(0) if m else None
texts = {}
def seg(slug):
    y = slug[:4]; n = int(slug.rsplit('-', 1)[1])
    kind = 'Junior' if '-junior-' in slug else 'Senior' if '-senior-' in slug else ''
    f = K + folder + '/' + sol.format(y=y, kind=kind) + '.pdf'
    if f not in texts:
        try: texts[f] = subprocess.run(['pdftotext', '-layout', f, '-'], capture_output=True, text=True).stdout
        except Exception: texts[f] = ''
    t = texts[f]
    ms = list(re.finditer(r'(?m)^\s*%d\s*[.)](?!\d)' % n, t))
    if not ms: return ''
    m = ms[-1]
    nxt = re.compile(r'(?m)^\s*%d\s*[.)](?!\d)' % (n + 1)).search(t, m.end())
    return t[m.start(): nxt.start() if nxt else m.start() + 3000]
flags = []
for slug, k in sorted(keys.items()):
    ch = choices(st.get(slug, {}).get('s', ''))
    vals = {L: num(c) for L, c in ch.items()}
    if not all(vals.values()) or len(set(vals.values())) < len(vals): continue
    s = seg(slug)
    if not s: continue
    present = [L for L, v in vals.items() if re.search(r'(?<![\d.])%s(?![\d])' % re.escape(v), s)]
    last = None
    for L, v in vals.items():
        for m in re.finditer(r'(?<![\d.])%s(?![\d])' % re.escape(v), s):
            if last is None or m.start() >= last[1]: last = (L, m.start())
    if len(present) == 1 and present[0] != k:
        flags.append((slug, k, present[0], vals, 'only'))
    elif last and last[0] != k and k in present:
        flags.append((slug, k, last[0], vals, 'last'))
    elif last and k not in present:
        flags.append((slug, k, last[0], vals, 'key value absent'))
print(len(flags), 'flags of', len(keys))
for f in flags: print(f[4], f[0], 'key', f[1], 'text ->', f[2], f[3])
