"""Lay out a problem's answer choices: short ones stay on one line, long ones go one per line.

Used by tools/fetch-live-statements.py when it writes a statement, and run on the saved statement
files by `python3 tools/choice_layout.py` (idempotent). A run of choices is "long" when any one of
them is longer than LONG characters of visible text (math delimiters and spaces not counted)."""
import glob, io, os, re, sys

LONG = 30
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RUN = re.compile(r"\(A\) .*?\(B\) .*?\(C\) .*?\(D\) .*?\(E\) .*\Z", re.S)

def layout(s):
    m = None
    for m in RUN.finditer(s): pass
    if not m: return s
    run = m.group(0)
    # The last "(A)" that begins a full A-E run; anything before it is the question itself.
    k = run.rfind("(A) ")
    while k > 0 and not RUN.match(run[k:]): k = run.rfind("(A) ", 0, k)
    start = m.start() + max(k, 0)
    head, run = s[:start], s[start:]
    cuts = [0]
    for L in "BCDE":
        i = run.find("(%s) " % L, cuts[-1] + 1)
        if i < 0: return s
        cuts.append(i)
    parts = [run[a:b] for a, b in zip(cuts, cuts[1:] + [len(run)])]
    parts = [re.sub(r"\s+", " ", p.replace(" ", " ")).strip() for p in parts]
    visible = lambda p: len(re.sub(r"[$\s]", "", p[4:]))
    long = max(visible(p) for p in parts) > LONG
    return head + ("\n".join(parts) if long else "  ".join(parts))

def main():
    changed = 0
    for f in sorted(glob.glob(os.path.join(ROOT, "js/data/problems/statements/*.js"))):
        src = io.open(f, encoding="utf-8").read()
        def one(m):
            return m.group(1) + layout(m.group(2)) + m.group(3)
        out = re.sub(r'(^"[a-z0-9-]+": \{ s: String\.raw`)(.*?)(`, u:)', one, src, flags=re.S | re.M)
        if out != src:
            io.open(f, "w", encoding="utf-8").write(out); changed += 1
    print("files changed:", changed)

if __name__ == "__main__":
    main()
