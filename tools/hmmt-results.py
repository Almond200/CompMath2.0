#!/usr/bin/env python3
"""Rate HMMT February and November problems from the official results (Step H, owner, 2026-11-13).

HMMT publishes, for each February tournament from 2010 on, an extended results file listing
every student's score on every problem of every individual round. This tool reads those files,
keeps only per-problem solve counts (never a name), and sets each HMMT problem's rating from the
share of students who solved it:

    rating = 2030 + 295 * ln((n - s + 1/2) / (s + 1/2)),  rounded to the nearest 10

where s students out of the n who sat the round (solved at least one of its problems) solved it.
The two constants were fitted once, on 2026-11-13, to the 265 author estimates of 2010 to 2020
problems solved by at least three students, so the scale stays the collection's own: half the
room solving gives 2030, one in six 2500, one in sixty about 3220, and a problem nobody solved
about 4100, above the hardest AIME problems. They are fixed here so that every year is rated by
the same rule; refitting would let each batch drift. Rounds without published results (2009
and earlier) and the 2011 two-subject papers keep their author estimates.

HMMT November's General and Theme rounds use the same form with their own constants,
1330 + 230 * ln(...), fitted once to 40 author estimates of 2011 and 2012 (correlation 0.97): the
November room is weaker, and an unsolved November problem rates about 2950, not 4100. November
2013 (totals only), 2020 (no extended results) and the newest round before its results appear
keep author estimates.

    python3 tools/hmmt-results.py            # download (cached), write counts, update ratings
    python3 tools/hmmt-results.py --check    # fail if the ratings file disagrees with the counts
    python3 tools/import-live-ratings.py     # then regenerate the app's ratings file

Counts are written to tools/hmmt-solve-rates.json with the address of each results file.
"""
import argparse, html, json, math, os, re, sys, tempfile, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANUAL = os.path.join(ROOT, 'tools', 'manual-difficulty-ratings.json')
COUNTS = os.path.join(ROOT, 'tools', 'hmmt-solve-rates.json')
A, B = 2030, 295
# The November room is weaker and more spread out than the February one, so the same share of
# solvers means an easier problem: November has its own two constants, fitted once (2026-11-13)
# to 40 author estimates of the 2011 and 2012 General and Theme problems (correlation 0.97).
A_NOV, B_NOV = 1330, 230
YEARS = [y for y in range(2010, 2027) if y != 2011]
YEARS_NOV = [y for y in range(2011, 2027) if y != 2020]
NAMES = {'alg': ['Algebra and Number Theory', 'Algebra'], 'comb': ['Combinatorics'], 'geo': ['Geometry'],
         'nov-gen': ['General'], 'nov-thm': ['Theme']}
MONTH = {'alg': 'February', 'comb': 'February', 'geo': 'February', 'nov-gen': 'November', 'nov-thm': 'November'}
NUM = re.compile(r'^(-|\d+(\.\d+)?)$')


def url(year, month='feb'):
    htm = year > 2016 if month == 'feb' else year > 2015
    return 'https://hmmt-archive.s3.amazonaws.com/tournaments/%d/%s/results/long.%s' % (year, month, 'htm' if htm else 'txt')


def fetch(year, cache, month='feb'):
    path = os.path.join(cache, ('long%d' if month == 'feb' else 'nov%d') % year)
    if not os.path.exists(path):
        os.makedirs(cache, exist_ok=True)
        try:
            with urllib.request.urlopen(url(year, month), timeout=120) as r:
                body = r.read()
        except urllib.error.HTTPError:
            return ''    # not published (yet): the round keeps its estimate
        open(path, 'wb').write(body)
    text = open(path, encoding='utf-8', errors='ignore').read()
    if '<' in text and re.search(r'</?(html|pre|table|div|br)\b', text, re.I):
        text = re.sub(r'<script.*?</script>', '', text, flags=re.S)
        text = html.unescape(re.sub(r'</?[a-zA-Z!][^<>]*>', '', text))
    return text


def section(line):
    l = re.sub(r'[=\-]+', '', line.strip().lower()).strip()
    if re.fullmatch(r'algebra( and number theory)?( (subject )?(test|round))?', l): return 'alg'
    if re.fullmatch(r'combinatorics( (subject )?(test|round))?', l): return 'comb'
    if re.fullmatch(r'geometry( (subject )?(test|round))?', l): return 'geo'
    if re.fullmatch(r'general( (test|round))?', l): return 'nov-gen'
    if re.fullmatch(r'theme( (test|round))?', l): return 'nov-thm'
    # Any other heading (Calculus, Sweeps, Team A Test, Overall ...) ends the round's table.
    if re.fullmatch(r'[a-z][a-z /&()-]{2,48}', l): return 'stop'
    return None


def counts(text, month='feb'):
    """Solve counts per round: a student counts as sitting a round once they solved one of its
    problems, since the files list every student in every round."""
    cur, rows = None, {k: [] for k in NAMES if MONTH[k][:3].lower() == month}
    for line in text.split('\n'):
        s = section(line)
        if s:
            cur = s if s in rows else None
            continue
        if not cur:
            continue
        if '|' in line:
            parts = line.split('|')
            toks = parts[1].split() if len(parts) >= 3 else []
        else:
            run, best = [], []
            for tk in line.split():
                if NUM.match(tk): run.append(tk)
                else:
                    best, run = (run if len(run) > len(best) else best), []
            best = run if len(run) > len(best) else best
            toks = best[-10:] if len(best) >= 12 else []
        if len(toks) != 10 or not all(NUM.match(x) for x in toks):
            continue
        r = [1 if x != '-' and float(x) > 0 else 0 for x in toks]
        if sum(r):
            rows[cur].append(r)
    return {k: {'n': len(v), 'solved': [sum(x[i] for x in v) for i in range(10)]} for k, v in rows.items() if v}


def rating(s, n, a=A, b=B):
    return int(round((a + b * math.log((n - s + 0.5) / (s + 0.5))) / 10) * 10)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--cache', default=os.path.join(tempfile.gettempdir(), 'compmath-hmmt-results'))
    ap.add_argument('--check', action='store_true')
    args = ap.parse_args()
    if args.check:
        data = json.load(open(COUNTS))['rounds']
    else:
        data = {}
        for y in YEARS:
            for k, v in counts(fetch(y, args.cache)).items():
                data['%d %s' % (y, k)] = dict(v, source=url(y))
        for y in YEARS_NOV:
            for k, v in counts(fetch(y, args.cache, 'nov'), 'nov').items():
                data['%d %s' % (y, k)] = dict(v, source=url(y, 'nov'))
        json.dump({'description': 'Per-problem solve counts from the official HMMT February extended results; no names are kept. Written by tools/hmmt-results.py.',
                   'rounds': data}, open(COUNTS, 'w'), indent=1)
    manual = json.load(open(MANUAL))
    # Every HMMT problem in the collection is rated, a newly added one included.
    db = set(re.findall(r'ref: "([^"]*HMMT (?:February|November)[^"]*)"', open(os.path.join(ROOT, 'js', 'data', 'problems', 'problem-db.js')).read()))
    changed, wrong, matched = 0, [], 0
    for key, v in sorted(data.items()):
        year, rnd = key.split()
        for i, s in enumerate(v['solved']):
            for nm in NAMES[rnd]:
                ref = '%s HMMT %s %s, Problem %d' % (year, MONTH[rnd], nm, i + 1)
                if ref not in manual['ratings'] and ref not in db:
                    continue
                matched += 1
                want = [rating(s, v['n'], *((A_NOV, B_NOV) if MONTH[rnd] == 'November' else (A, B))), 'Official results: %d of the %d students who sat the round solved it.' % (s, v['n'])]
                if manual['ratings'].get(ref) != want:
                    wrong.append(ref)
                    manual['ratings'][ref] = want
                    changed += 1
    if args.check:
        if wrong:
            sys.exit('HMMT ratings disagree with the official results for %d problems, e.g. %s' % (len(wrong), wrong[0]))
        print('HMMT ratings: %d problems match their official solve rates.' % matched)
        return
    raw = open(MANUAL).read()
    json.dump(manual, open(MANUAL, 'w'), indent=2 if raw.startswith('{\n  "') else None, ensure_ascii=False)
    open(MANUAL, 'a').write('\n')
    print('HMMT results: %d rounds counted; %d problems in the collection rated from them, %d changed.' % (len(data), matched, changed))


if __name__ == '__main__':
    main()
