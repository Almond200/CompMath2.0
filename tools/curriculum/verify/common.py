"""Shared end of every chapter verification script (tools/curriculum/verify/<chapter>.py).

A chapter script recomputes each answer independently of the written solution and stores it in V
(item id -> sympy value, or a letter for a symbolic multiple-choice answer). It then calls
`finish(chapter_key, V, LETTER, KNOWN_KEY_ISSUES)`, which:
- checks that every answered item of the chapter has a verified value, and that the chapter's answer
  equals it under the app's own answer comparison (js/learn-answer.js);
- checks every contest problem against the stored live key: a letter key against LETTER[slug] =
  (letter, value of that choice), a value key against the verified value;
- reports, without failing, the keys listed in KNOWN_KEY_ISSUES (a stored key that the independent
  computation contradicts; the chapter uses the verified value and the owner is told).
"""
import json, re, subprocess, sys
from pathlib import Path
import sympy as sp

ROOT = Path(__file__).resolve().parents[3]

def _items(chapter_key):
    book, ch = chapter_key.split("/")
    a, b = ch.split(".")
    rel = f"./js/data/curriculum/{book}/{a.lower()}.{int(b):02d}.js"
    js = subprocess.run(["node", "-e", f"""
global.window = {{}}; require({json.dumps(rel)});
const c = window.MATH_CURRICULUM[{json.dumps(chapter_key)}];
const out = {{}}; for (const [id, it] of Object.entries(c.items)) out[id] = {{ kind: it.kind, choices: !!it.choices, proof: !!it.proof, answer: it.answer || null, slug: it.slug || null }};
console.log(JSON.stringify(out));"""], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(js.stdout)

def live_keys():
    keys = {}
    for f in ("answer-keys.js", "answer-keys-more.js"):
        for slug, v in re.findall(r'^\s*"([a-z0-9-]+)": "([^"]*)"', (ROOT / "js/data/problems" / f).read_text(), re.M): keys[slug] = v
    short = (ROOT / "js/data/problems/answer-keys-short.js").read_text(); short = short[short.index("\n  answers: {"):]
    for slug, body in re.findall(r'^\s*"([a-z0-9-]+)": \{(.*)\},?$', short, re.M):
        m = re.search(r'"answers": \[(.*?)\]', body)
        if m: keys[slug] = re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))
    return keys

def _same_all(pairs):
    """[(a, b)] -> [bool], using the app's own exact comparison, in one node process."""
    if not pairs: return []
    js = subprocess.run(["node", "-e", "const A=require('./js/learn-answer.js');const P=JSON.parse(process.argv[1]);"
                         "process.stdout.write(JSON.stringify(P.map(([a,b])=>{try{return A.same(a,b)}catch(e){return false}})))",
                         json.dumps([[str(a), str(b)] for a, b in pairs])], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(js.stdout)

def num(v):
    """A sympy value as a high-precision decimal string the answer comparison can read."""
    return str(sp.N(v, 15)) if not isinstance(v, str) else v

def finish(chapter_key, V, LETTER=None, KNOWN_KEY_ISSUES=None):
    LETTER = LETTER or {}; KNOWN_KEY_ISSUES = KNOWN_KEY_ISSUES or {}
    items, keys, errors = _items(chapter_key), live_keys(), []
    checks = []   # (kind, item id, a, b)
    for iid, it in items.items():
        if it["kind"] == "example" or it["proof"]: continue
        if not it["answer"]: errors.append(f"{iid}: no answer"); continue
        if iid not in V: errors.append(f"{iid}: no independent verification"); continue
        if it["choices"] or isinstance(V[iid], str) or re.fullmatch(r"[A-E]", it["answer"]):
            want = V[iid] if isinstance(V[iid], str) else LETTER.get(it["slug"], (None,))[0]
            if it["answer"] != want: errors.append(f"{iid}: chapter letter {it['answer']} != verified {want}")
        else:
            checks.append(("chapter", iid, it["answer"], num(V[iid])))
        slug = it["slug"]
        if not slug: continue
        live = keys.get(slug)
        if isinstance(live, list) and len(live) == 1: live = live[0]
        if slug in KNOWN_KEY_ISSUES:
            print(f"KEY ISSUE ({iid}, {slug}): {KNOWN_KEY_ISSUES[slug]}; live key {live!r}"); continue
        if live is None: errors.append(f"{iid}: {slug} has no live key"); continue
        if slug in LETTER:
            letter, val = LETTER[slug]
            if live != letter: errors.append(f"{iid}: live key {live} != {letter}")
            if not isinstance(V[iid], str) and sp.simplify(sp.nsimplify(V[iid]) - val) != 0: errors.append(f"{iid}: verified value disagrees with choice {letter}")
        elif re.fullmatch(r"[A-E]", it["answer"]):
            if live != it["answer"]: errors.append(f"{iid}: live key {live} != chapter letter {it['answer']}")
        else:
            for k in (live if isinstance(live, list) else [live]): checks.append(("live", iid, k, num(V[iid])))
    res = _same_all([(a, b) for _, _, a, b in checks])
    live_ok = {}
    for (kind, iid, a, b), ok in zip(checks, res):
        if kind == "chapter" and not ok: errors.append(f"{iid}: chapter answer {a} != verified {b}")
        if kind == "live": live_ok[iid] = live_ok.get(iid, False) or ok
    for iid, ok in live_ok.items():
        if not ok: errors.append(f"{iid}: no live key for {items[iid]['slug']} equals the verified value {num(V[iid])}")
    for e in errors: print("ERROR:", e)
    answered = sum(1 for i in items.values() if i["answer"])
    print(f"{chapter_key}: {len(V)} values verified; {answered} answered items; {'failed' if errors else 'passed'}")
    sys.exit(1 if errors else 0)
