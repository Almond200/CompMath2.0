import os, re, json, subprocess, urllib.request, concurrent.futures
D = '' + (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work')) + '/umd/'; os.makedirs(D, exist_ok=True)
U = json.load(open('' + (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work')) + '/urls.json'))
def get(y):
    f = U['UMD'][y]
    if len(f) < 2: return y, None
    path = D + y + '.pdf'
    if not os.path.exists(path):
        req = urllib.request.Request(U['UMD_BASE'] + f[1], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r: open(path, 'wb').write(r.read())
    t = subprocess.run(['pdftotext', path, '-'], capture_output=True, text=True).stdout
    return y, re.findall(r'(?i)answer\s+is\s*\(?([a-e])\)', t)
out, bad = {}, []
with concurrent.futures.ThreadPoolExecutor(6) as ex:
    for y, ans in ex.map(get, sorted(U['UMD'])):
        if ans is None: bad.append((y, 'no solutions')); continue
        if len(ans) != 25: bad.append((y, len(ans))); continue
        for i, a in enumerate(ans, 1): out[f'{y}-umd-hsmc-part-i-{i}'] = a.upper()
json.dump(out, open(D + 'keys.json', 'w'), indent=0)
print(len(out), 'keys; problems:', bad)
