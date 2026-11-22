import os, re, subprocess, json, urllib.request, concurrent.futures
D = '' + (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work')) + '/cemc/'
os.makedirs(D, exist_ok=True)
def url(y, c):
    folder = '2026' if (y == 2024 and c == 'Pascal') else str(y)
    return f'https://cemc.uwaterloo.ca/sites/default/files/documents/{folder}/{y}{c}Solution.pdf'
def get(job):
    y, c = job
    path = f'{D}{y}{c}.pdf'
    if not os.path.exists(path):
        req = urllib.request.Request(url(y, c), headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r:
            open(path, 'wb').write(r.read())
    t = subprocess.run(['pdftotext', '-layout', path, '-'], capture_output=True, text=True).stdout
    ans = re.findall(r'(?i)Answer:\s*\(?([A-E]|\d{1,4})\)?', t)
    return y, c, ans
out, bad = {}, []
jobs = [(y, c) for y in range(1998, 2026) for c in ('Pascal', 'Cayley', 'Fermat')]
with concurrent.futures.ThreadPoolExecutor(6) as ex:
    for y, c, ans in ex.map(get, jobs):
        if len(ans) != 25:
            bad.append((y, c, len(ans), ans))
            continue
        for i, a in enumerate(ans, 1):
            out[f'{y}-{c.lower()}-contest-{i}'] = a
json.dump(out, open(D + 'keys.json', 'w'), indent=0)
print(len(out), 'keys;', len(bad), 'papers with a count other than 25')
for b in bad: print(b[:3], b[3][:30])
