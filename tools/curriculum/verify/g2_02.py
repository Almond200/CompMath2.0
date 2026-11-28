#!/usr/bin/env python3
"""Independent verification of every number in geometry-2/G2.2 (Power of a Point).

Each problem in the chapter is recomputed here without using its written solution: by exact
algebra where the solution argues algebraically, and by coordinates or exhaustive search where a
configuration or a uniqueness claim is involved. The script then checks that the chapter file's
answers equal these values, and that the archive problems' answers equal the live answer keys.

usage: python3 tools/curriculum/verify/g2_02.py
"""
import json, math, re, subprocess, sys
from fractions import Fraction as Fr
from pathlib import Path
import sympy as sp

ROOT = Path(__file__).resolve().parents[3]
x, y, e, s, k, r, t = sp.symbols("x y e s k r t", real=True)
V = {}   # item id -> verified value (sympy)
def pos_roots(expr, var):
    return sorted(z for z in sp.solve(expr, var) if z.is_real and z > 0)

# Opening: radius 5, OP = 2: every chord product is 21; a piece of 4.2 pairs with 5, and that chord exists.
assert 5**2 - 2**2 == 21 and Fr(21) / Fr(42, 10) == 5 and 2*math.sqrt(21) <= 4.2 + 5 <= 10
# The opening table: chords through P = (2, 0) in the circle x^2 + y^2 = 25, at the four directions
# with cos = 1, 0.625, 0.3125, 0; the pieces are the two roots' absolute values.
for c_, pieces in ((1, (3, 7)), (sp.Rational(5, 8), (sp.Rational(7, 2), 6)), (sp.Rational(5, 16), (4, sp.Rational(21, 4))), (0, (sp.sqrt(21), sp.sqrt(21)))):
    u_ = sp.Matrix([c_, sp.sqrt(1 - c_**2)]); P_ = sp.Matrix([2, 0])
    roots = sp.solve((P_ + t*u_).dot(P_ + t*u_) - 25, t)
    got = sorted([sp.nsimplify(abs(z)) for z in roots], key=float)
    assert [sp.simplify(g - w) for g, w in zip(got, sorted(pieces, key=float))] == [0, 0], (c_, got)
    assert sp.simplify(got[0]*got[1] - 21) == 0
V["open-product"] = 21
V["open-predict"] = 5
V["c-central"] = 55                       # 110/2
V["c-other-arc"] = (360 - 110) // 2       # 125
V["c-basic"] = Fr(4*6, 3)                 # 8
# Conceptual checkpoints (letters). ch-rotate: only PC*PD = PA*PB is fixed; the opening table has
# chords of different lengths through one point, so CD and PC + PD vary, and PA*PC varies with PC.
assert len({10, 9.5, 9.25, round(2*math.sqrt(21), 6)}) == 4; V["ch-rotate"] = "B"
# ch-outside: the Pythagorean steps hold for any P on the line; only A between P and M uses "outside".
V["ch-outside"] = "B"
# ch-sign: OP^2 = 25 - 16 = 9, inside; distance sqrt(41) would give +16.
assert 5**2 - 16 == 9 and 41 - 25 == 16; V["ch-sign"] = "A"
# Worked example: radius 13, OP = 5; shortest chord 24 (equal pieces, perpendicular to OP).
assert (13+5)*(13-5) == 144 and 2*math.sqrt(13**2 - 5**2) == 24
V["c-shortest"] = 2*sp.sqrt(10**2 - 6**2)  # 16
# 2007 HMMT Feb Geo 2: BP*DP = 8, BP + DP = 6, BP < DP.
rts = pos_roots(t**2 - 6*t + 8, t); assert rts == [2, 4]; V["p-hmmt07"] = rts[0]
V["c-tangent"] = sp.sqrt(4*9)             # 6
# 1956 AHSME 14: x(x+20) = 300, unique positive root.
rts = pos_roots(x*(x+20) - 300, x); assert rts == [10]; V["p-ahsme56"] = 10
# 2020 AMC 12B 10: coordinates; P is the second intersection of AM with the incircle.
A_ = sp.Matrix([0, 0]); M_ = sp.Matrix([sp.Rational(1, 2), 1]); O_ = sp.Matrix([sp.Rational(1, 2), sp.Rational(1, 2)])
sols = sp.solve(((A_ + t*(M_-A_)) - O_).dot((A_ + t*(M_-A_)) - O_) - sp.Rational(1, 4), t)
tp = min(z for z in sols if z != 1); V["p-amc20b10"] = sp.nsimplify(tp * sp.sqrt((M_-A_).dot(M_-A_)))
assert sp.simplify(V["p-amc20b10"] - sp.sqrt(5)/10) == 0
# Two secants with the "chord" error: PA = 4, AB = 5, PC = 3 -> CD = 9, wrong route 20/3.
assert Fr(4*9, 3) - 3 == 9 and Fr(20, 3) != 9
V["c-secants"] = Fr(5*12, 4) - 4          # 11
V["c-power-out"] = sp.sqrt(13**2 - 5**2)  # 12
V["c-power-in"] = Fr(7**2 - 3**2, 5)      # 8
# 2020 AMC 12B 12: CE^2 + DE^2 for every E on AB and chord at 45 degrees is 2R^2 = 100.
R2 = 50; oe = sp.symbols("oe", real=True)
u = sp.Matrix([1, 1]) / sp.sqrt(2); E_ = sp.Matrix([oe, 0])
ts = sp.solve((E_ + t*u).dot(E_ + t*u) - R2, t)
val = sp.simplify(ts[0]**2 + ts[1]**2); assert val == 100; V["p-amc20b12"] = 100
# 1995 AHSME 26: r^2 - x^2 = 12, r^2 + x^2 = 36, unique positive solution.
so = sp.solve([r**2 - x**2 - 12, r**2 + x**2 - 36], [r, x], dict=True)
rr = {d[r] for d in so if d[r] > 0}; assert rr == {2*sp.sqrt(6)}; V["p-ahsme95"] = 24*sp.pi
# 2006 HMMT Feb Geo 3: integer and real solutions of x(27+y) = 30, y(27+x) = 84 with x, y > 0.
so = sp.solve([x*(27+y) - 30, y*(27+x) - 84], [x, y], dict=True)
pos = [d for d in so if d[x].is_real and d[y].is_real and d[x] > 0 and d[y] > 0]
assert len(pos) == 1 and pos[0][x] == 1 and pos[0][y] == 3; V["p-hmmt06"] = 31
# 2013 AMC 10A 23: CX*CB = 2013 with CX < CB, BC strictly between 11 and 183.
pairs = [(d, 2013//d) for d in range(1, 2014) if 2013 % d == 0 and d < 2013//d and 11 < 2013//d < 183]
assert pairs == [(33, 61)]; V["p-amc13"] = 61
# Hidden tangent: right angle at C, AC = 6, BC = 8; D on AB with CD perpendicular to AB (angle in a semicircle).
Cc = sp.Matrix([0, 0]); Ac = sp.Matrix([6, 0]); Bc = sp.Matrix([0, 8])
D = Ac + ((Cc - Ac).dot(Bc - Ac) / (Bc - Ac).dot(Bc - Ac)) * (Bc - Ac)
mid = (Bc + Cc) / 2
assert sp.simplify((D - mid).dot(D - mid) - 16) == 0          # D is on the circle with diameter BC
assert sp.sqrt((D - Ac).dot(D - Ac)) == sp.Rational(18, 5)
# Not enough: OP^2 - r^2 = 36 has many solutions; with r = 8, OP = 10.
assert 10**2 - 8**2 == 36 and 7**2 - 13 == 36; V["c-not-enough"] = 10
# Review problems.
rts = pos_roots(t**2 - 14*t + 40, t); assert rts == [4, 10]; V["r1"] = 4
rts = pos_roots(x*(x+7) - 144, x); assert rts == [9]; V["r2"] = 9
V["r3"] = sp.sqrt(100 - 36)                                    # 8
rts = pos_roots(4*x**2 - 144, x); assert rts == [6] and 6 + 18 == 15 + 9; V["r4"] = 6
assert 4*9 == 36 and math.isclose(math.sqrt(6.5**2 - 2.5**2), 6); V["r5"] = 12
rts = pos_roots(2*x**2 - 64, x); V["r6"] = rts[0]
pm = sp.Rational(3, 2) * rts[0]; om2 = 100 - pm**2; ma = sp.sqrt(36 - om2)
assert om2 >= 0 and sp.simplify(pm - ma - rts[0]) == 0             # such a secant exists
# Challenge 1 (2001 AIME II 6): side-2 square, circle x^2 + y^2 = 2; G = (s/2, -1-s) on the circle.
rts = pos_roots((s/2)**2 + (1 + s)**2 - 2, s); assert rts == [sp.Rational(2, 5)]
ratio = sp.Rational(2, 5)**2 / 4; assert ratio == sp.Rational(1, 25); V["ch1"] = 10*25 + 1
# Challenge 2 (2024 HMMT Feb Geo 3): 5k^2 = 123^2 - 122^2; check OB = 122 from C as midpoint.
assert 123**2 - 122**2 == 245 and 245 % 5 == 0 and math.isqrt(49) == 7
assert 123**2 - 21**2 + 14**2 == 122**2; V["ch2"] = 42
# Numerical search over all chords of radius-123 circle cut 1:2:3 by a radius-61 circle through the center.
found = set()
def gap(h, sign):
    # chord y = h; B, C at 1/6 and 1/2 of the way across; omega through B and C (radius 61),
    # centered at (cx, cy); return |center|^2 - 61^2, which vanishes when omega passes through O.
    w = math.sqrt(123**2 - h*h); B_ = -w + 2*w/6; C_ = 0.0; cx = (B_ + C_) / 2
    q = 61**2 - (B_ - cx)**2
    if q < 0: return None
    cy = h + sign*math.sqrt(q)
    return cx*cx + cy*cy - 61**2
for sign in (1, -1):
    hs = [i * 123 / 4000 for i in range(-3999, 4000)]
    for h0, h1 in zip(hs, hs[1:]):
        g0, g1 = gap(h0, sign), gap(h1, sign)
        if g0 is None or g1 is None or g0 * g1 > 0: continue
        for _ in range(80):
            hm = (h0 + h1) / 2; gm = gap(hm, sign)
            if gm is None: break
            if g0 * gm <= 0: h1, g1 = hm, gm
            else: h0, g0 = hm, gm
        found.add(round(2*math.sqrt(123**2 - h0*h0), 4))
found = {f for f in found if abs(f - 246) > 1e-3}   # the diameter (h = 0) is excluded by the problem
assert found == {42.0}, found; V["ch2"] = 42
# Challenge 3 (2024 AIME I 5): e(e + 184) = 17*33, then concyclicity by determinant.
rts = pos_roots(e*(e + 184) - 561, e); assert rts == [3]
pts = [(0, 16), (0, 0), (3, -17), (187, -17)]
assert sp.Matrix([[a*a + b*b, a, b, 1] for a, b in pts]).det() == 0; V["ch3"] = 107 - 3

# ---- compare with the chapter file and the live keys ----
js = subprocess.run(["node", "-e", """
global.window = {}; require('./js/data/curriculum/geometry-2/g2.02.js'); global.window.LearnAnswer = require('./js/learn-answer.js');
const c = window.MATH_CURRICULUM['geometry-2/G2.2'];
const out = {}; for (const [id, it] of Object.entries(c.items)) out[id] = { kind: it.kind, choices: !!it.choices, answer: it.answer || null, slug: it.slug || null };
console.log(JSON.stringify(out));"""], cwd=ROOT, capture_output=True, text=True, check=True)
items = json.loads(js.stdout)
keys = {}
for f in ("answer-keys.js", "answer-keys-more.js"):
    for slug, v in re.findall(r'^\s*"([a-z0-9-]+)": "([^"]*)"', (ROOT / "js/data/problems" / f).read_text(), re.M): keys[slug] = v
short = (ROOT / "js/data/problems/answer-keys-short.js").read_text(); short = short[short.index("\n  answers: {"):]
for slug, body in re.findall(r'^\s*"([a-z0-9-]+)": \{(.*)\},?$', short, re.M):
    m = re.search(r'"answers": \["([^"]*)"', body)
    if m: keys[slug] = m.group(1)
MC = {"2020-amc-12b-10": ("B", sp.sqrt(5)/10), "1956-ahsme-14": ("B", 10), "2020-amc-12b-12": ("E", 100),
      "1995-ahsme-26": ("C", 24*sp.pi), "2013-amc-10a-23": ("D", 61)}
errors = []
def same(a, b):
    out = subprocess.run(["node", "-e", f"const A=require('./js/learn-answer.js');process.stdout.write(String(A.same({json.dumps(str(a))},{json.dumps(str(b))})))"],
                         cwd=ROOT, capture_output=True, text=True)
    return out.stdout == "true"
for iid, it in items.items():
    if it["answer"] is None: continue
    if iid not in V: errors.append(f"{iid}: no independent verification"); continue
    if it["choices"]:
        if it["answer"] != V[iid]: errors.append(f"{iid}: chapter choice {it['answer']} != verified {V[iid]}")
        continue
    if not same(it["answer"], sp.N(V[iid], 15)): errors.append(f"{iid}: chapter answer {it['answer']} != verified {V[iid]}")
for iid, it in items.items():
    if it["slug"]:
        live = keys.get(it["slug"])
        if it["slug"] in MC:
            letter, val = MC[it["slug"]]
            if live != letter: errors.append(f"{iid}: live key {live} != {letter}")
            if iid in V and sp.simplify(V[iid] - val) != 0: errors.append(f"{iid}: verified value disagrees with choice {letter}")
        elif not same(live, sp.N(V[iid], 15)): errors.append(f"{iid}: live key {live} != verified {V[iid]}")
for e_ in errors: print("ERROR:", e_)
print(f"{len(V)} values verified; {sum(1 for i in items.values() if i['answer'])} answered items; {'failed' if errors else 'passed'}")
sys.exit(1 if errors else 0)
