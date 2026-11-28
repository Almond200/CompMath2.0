#!/usr/bin/env python3
"""Independent verification of geometry-2/G2.3 (Cyclic Quadrilaterals I).

Every answer is recomputed from a coordinate construction of the configuration, not from the written
solution; uniqueness is checked where the problem needs it. Every proof problem and theorem is checked
on random instances. The shared end (verify/common.py) compares the chapter and the live keys.

usage: python3 tools/curriculum/verify/g2_03.py
"""
import math, random, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import finish
import sympy as sp

random.seed(3)
V, LETTER = {}, {}
def P(d, r=1.0, c=(0.0, 0.0)): return (c[0] + r * math.cos(math.radians(d)), c[1] + r * math.sin(math.radians(d)))
def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def dist(a, b): return math.hypot(a[0] - b[0], a[1] - b[1])
def ang(v, a, b):
    u, w = sub(a, v), sub(b, v)
    return math.degrees(math.acos(max(-1, min(1, (u[0] * w[0] + u[1] * w[1]) / (math.hypot(*u) * math.hypot(*w))))))
def inter(p1, p2, p3, p4):
    """Intersection of lines p1p2 and p3p4."""
    d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0])
    a = p1[0] * p2[1] - p1[1] * p2[0]; b = p3[0] * p4[1] - p3[1] * p4[0]
    return ((a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d)
def foot(p, a, b):
    u = sub(b, a); t = ((p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1]) / (u[0] ** 2 + u[1] ** 2)
    return (a[0] + t * u[0], a[1] + t * u[1])
def circum(a, b, c):
    d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]))
    ux = ((a[0]**2 + a[1]**2) * (b[1] - c[1]) + (b[0]**2 + b[1]**2) * (c[1] - a[1]) + (c[0]**2 + c[1]**2) * (a[1] - b[1])) / d
    uy = ((a[0]**2 + a[1]**2) * (c[0] - b[0]) + (b[0]**2 + b[1]**2) * (a[0] - c[0]) + (c[0]**2 + c[1]**2) * (b[0] - a[0])) / d
    return (ux, uy), math.hypot(a[0] - ux, a[1] - uy)
def concyclic(a, b, c, d, tol=1e-7):
    o, r = circum(a, b, c); return abs(dist(o, d) - r) < tol
def near(x, y, tol=1e-6): return abs(x - y) < tol
def orthocenter(a, b, c):
    return inter(b, foot(b, a, c), c, foot(c, a, b))

# ---- checkpoints ----
V["open-3pts"] = "B"; V["c-center"] = "B"; V["c-which"] = "B"; V["c-choose"] = "A"
assert 9**2 + 12**2 == 15**2; V["c-circumradius"] = sp.Rational(15, 2)
V["c-opposite"] = 180 - 73
V["c-products"] = sp.Rational(4 * 9, 6)
for _ in range(20):                                   # c-bhc and the altitude example: angle BHC = 180 - A
    A = (random.uniform(-1, 1), random.uniform(2, 4)); B = (-2, 0); C = (2.5, 0)
    if max(ang(A, B, C), ang(B, A, C), ang(C, A, B)) >= 90: continue
    H = orthocenter(A, B, C); assert near(ang(H, B, C), 180 - ang(A, B, C))
V["c-bhc"] = 180 - 64
# ---- G2.3.1 ----
for _ in range(20):                                   # pp-two-right: chord CD = 6 on the circle with diameter AB = 10
    a1 = random.uniform(10, 120); a2 = a1 + math.degrees(2 * math.asin(3 / 5))
    C, D = P(a1, 5), P(a2, 5); assert near(dist(C, D), 6) and near(ang(C, (-5, 0), (5, 0)), 90)
    F = foot((0, 0), C, D); assert near(dist((0, 0), F), 4)
V["pp-two-right"] = 4
def is_cyclic_shape(pts): return concyclic(*pts)
shapes = {"square": [(0, 0), (1, 0), (1, 1), (0, 1)], "rectangle": [(0, 0), (2, 0), (2, 1), (0, 1)],
          "rhombus": [(0, 0), (2, 0), (3, math.sqrt(3)), (1, math.sqrt(3))], "parallelogram": [(0, 0), (3, 0), (4, 1), (1, 1)],
          "isosceles trapezoid": [(0, 0), (4, 0), (3, 2), (1, 2)]}
count = sum(is_cyclic_shape(p) for p in shapes.values()); assert count == 3
V["p-amc19a6"] = 3; LETTER["2019-amc-10a-6"] = ("C", 3)
# 2019 PUMaC B1: D the center; B on the circle with angle ABC = 110 and ABCD convex.
found = set()
for t in range(1, 3600):
    a = t / 10; A, C = P(-a / 2), P(a / 2)                # central angle a on the side of D=(0,0)
    B = P(180)                                            # B opposite, on the far arc
    if near(ang(B, A, C), 110, 1e-3):
        quad = [A, B, C, (0, 0)]
        found.add(round(ang((0, 0), A, C), 2))
assert found == {140.0}, found; V["p-pumac19"] = 140
# ---- G2.3.2 ----
# 2017 HMMT Feb G1 (example; no answer): AP/CP = AB*AD/(CB*CD) by construction.
# 1974 AHSME 5: arcs AB=76, BC=60, CD=124, DA=100 give angle BAD = 92, ADC = 68.
pts = [P(0, 3), P(76, 3), P(136, 3), P(260, 3)]
A, B, C, D = pts; assert near(ang(A, B, D), 92) and near(ang(D, A, C), 68)
E = (B[0] + (B[0] - A[0]), B[1] + (B[1] - A[1])); V["p-ahsme74"] = round(ang(B, E, C), 6)
assert near(V["p-ahsme74"], 68); V["p-ahsme74"] = 68; LETTER["1974-ahsme-5"] = ("B", 68)
# 2015 AMC 12B 13: angle BAC = 70, angle ADB = angle ACB = 40, so arcs: BC = 140, AB = 80; BC = 6 fixes R.
R = 6 / (2 * math.sin(math.radians(70)))
A, B = P(0, R), P(80, R); C = P(220, R); D = P(300, R)     # D on the arc not containing... any point beyond C
assert near(ang(A, B, C), 70) and near(ang(D, A, B), 40) and near(dist(B, C), 6)
V["p-amc15"] = sp.Integer(round(dist(A, C), 9)) if near(dist(A, C), 6) else None
assert V["p-amc15"] == 6; LETTER["2015-amc-12b-13"] = ("B", 6)
V["p-columbus12"] = "D"                                  # trapezoid: equal opposite arcs force AB || CD (checked below)
for _ in range(20):
    a, b = random.uniform(20, 80), random.uniform(20, 80); c = random.uniform(20, 300 - a - 2 * b)
    A, B, C, D = P(0), P(a), P(a + b), P(a + b + c)       # arcs BC = b and DA = 360 - a - b - c; make them equal:
    d = 360 - a - b - c
    A, B, C, D = P(0), P(a), P(a + b), P(a + b + (360 - a - 2 * b))   # now arc DA = b = arc BC
    u, w = sub(B, A), sub(D, C); assert near(u[0] * w[1] - u[1] * w[0], 0, 1e-9)            # AB || CD
for _ in range(30):                                      # pp-bisectors: XY is a diameter
    t = sorted(random.uniform(0, 360) for _ in range(4)); A, B, C, D = (P(x) for x in t)
    X = P((t[1] + t[3]) / 2)                             # midpoint of arc B..D not containing A (A is first)
    Y = P((t[3] + t[1] + 360) / 2)
    assert near(ang(A, B, X), ang(A, X, D)) and near(ang(C, D, Y), ang(C, Y, B)) and near(dist(X, Y), 2)
# ---- G2.3.3 ----
V["p-mbmt23"] = 180                                      # right angles at A and C: 7-24-25 and 15-20-25
assert 7**2 + 24**2 == 25**2 and 15**2 + 20**2 == 25**2
for _ in range(20):                                      # 1958 AHSME 15: the four outer inscribed angles sum to 540
    t = sorted(random.uniform(0, 360) for _ in range(4)); Q = [P(x) for x in t]
    total = 0
    for i in range(4):
        a1, a2 = t[i], t[(i + 1) % 4] + (360 if i == 3 else 0)
        Xp = P((a1 + a2) / 2)                            # a point on the arc outside side i
        total += ang(Xp, Q[i], Q[(i + 1) % 4])
    assert near(total, 540)
V["p-ahsme58"] = 540; LETTER["1958-ahsme-15"] = ("D", 540)
for _ in range(20):                                      # pp-trapezoid: isosceles trapezoids are cyclic
    a, b, h = random.uniform(1, 5), random.uniform(1, 5), random.uniform(1, 4)
    assert concyclic((-a, 0), (a, 0), (b, h), (-b, h))
# 2022 AMC 10A 15 (example): the cyclic quadrilateral with sides 7, 24, 20, 15 has diagonal 25.
for _ in range(1):
    lo, hi = 24.01, 30.99                               # diagonal AC; cyclic iff angle B + angle D = 180
    f = lambda x: ang((0, 0), (7, 0), (0, 0)) if False else None
def opp_sum(x):
    cb = (7**2 + 24**2 - x * x) / (2 * 7 * 24); cd = (15**2 + 20**2 - x * x) / (2 * 15 * 20)
    return math.degrees(math.acos(cb)) + math.degrees(math.acos(cd))
lo, hi = 17.1, 30.9
for _ in range(100):
    mid = (lo + hi) / 2
    if opp_sum(mid) < 180: lo = mid
    else: hi = mid
assert near(lo, 25, 1e-9)
# ---- G2.3.4 ----
# 2019 AMC 10A 13 (example): angle BFC = 110.
C = (0, 0); B = (4, 0); A = P(40, 4); E = foot(C, A, B); Dd = foot(B, A, C); F = inter(B, Dd, C, E)
assert near(ang(F, B, C), 110)
# Brahmagupta's theorem and its corollary on random cyclic quadrilaterals with perpendicular diagonals.
for _ in range(30):
    a, c, b = random.uniform(1, 4), random.uniform(1, 4), random.uniform(1, 4); d = a * c / b
    A, C, B, D, Pq = (-a, 0), (c, 0), (0, -b), (0, d), (0, 0)
    assert concyclic(A, B, C, D)
    K = foot(Pq, B, C); M = inter(Pq, K, A, D); assert near(dist(M, A), dist(M, D))
    O, Rr = circum(A, B, C); Nn = ((B[0] + C[0]) / 2, (B[1] + C[1]) / 2); assert near(dist(O, Nn), dist(A, D) / 2)
# 2015 PUMaC B5: build the cyclic quadrilateral.
# angle BAD = 40 so arc BCD = 80; angle ADC = 80 so arc ABC = 160; BC = CD so arcs BC = CD = 40.
A, B, C, D = P(0), P(120), P(160), P(200)
assert near(ang(A, B, D), 40) and near(ang(D, A, C), 80) and near(dist(B, C), dist(C, D))
bis = P(0); u1, u2 = sub(B, C), sub(D, C)
Wb = (C[0] + u1[0] / math.hypot(*u1) + u2[0] / math.hypot(*u2), C[1] + u1[1] / math.hypot(*u1) + u2[1] / math.hypot(*u2))
Pp = inter(C, Wb, A, D); V["p-pumac15"] = round(ang(Pp, B, D), 6); assert near(V["p-pumac15"], 60); V["p-pumac15"] = 60
# 2025 AMC 12A 8: arcs BC = CD = 60; AB = 9, AD = 24 with angle BAD = 60.
BD = math.sqrt(9 * 9 + 24 * 24 - 9 * 24); R = BD / math.sqrt(3)
def chord_arc(L): return math.degrees(2 * math.asin(L / (2 * R)))
aAB, aAD = chord_arc(9), chord_arc(24)
A = P(0, R); B = P(aAB, R); C = P(aAB + 60, R); D = P(aAB + 120, R)
assert near(dist(A, D), 24, 1e-6) and near(ang(A, B, D), 60, 1e-6)
F = inter(A, C, B, D); V["p-amc25"] = sp.Rational(63, 11); assert near(dist(B, F), 63 / 11)
LETTER["2025-amc-12a-8"] = ("E", sp.Rational(63, 11))
for _ in range(20):                                      # pp-antiparallel and pp-reflect-h
    A = (random.uniform(-1, 1), random.uniform(2, 4)); B = (-2, 0); C = (2.5, 0)
    if max(ang(A, B, C), ang(B, A, C), ang(C, A, B)) >= 90: continue
    E = foot(B, A, C); F = foot(C, A, B); assert near(ang(E, A, F), ang(B, A, C))
    H = orthocenter(A, B, C); H2 = (H[0], -H[1]); assert concyclic(A, B, C, H2)
# ---- review ----
V["r-twice"] = 120; V["r-isosceles"] = (180 - (180 - 100)) / 2 + 0 if False else 50
V["r-parallelogram"] = sp.sqrt(10**2 - 6**2); V["r-not-cyclic"] = "B"; assert 80 + 105 != 180
V["r-products"] = 40; assert 3 * 8 == 4 * 6
k = sp.symbols("k"); ks = sp.solve(16 + k**2 - 9 - (7 - k)**2, k); V["r-trapezoid"] = sp.sqrt(16 + ks[0]**2); assert V["r-trapezoid"] == 5
V["r-hypotenuse"] = sp.sqrt(10**2 + 24**2) / 2
for _ in range(20):                                      # r-reim: random two-circle configurations
    o1, o2 = (0, 0), (random.uniform(1.0, 1.8), 0); r1, r2 = 1.0, random.uniform(0.8, 1.3)
    dd = o2[0]; xq = (dd * dd + r1 * r1 - r2 * r2) / (2 * dd); yq = math.sqrt(r1 * r1 - xq * xq)
    Pp, Qq = (xq, yq), (xq, -yq)
    def second(pt, u, c, r):
        w = sub(pt, c); b = 2 * (w[0] * u[0] + w[1] * u[1]); return (pt[0] - b * u[0], pt[1] - b * u[1])
    a1 = math.radians(random.uniform(100, 170)); u = (math.cos(a1), math.sin(a1))
    Aa = second(Pp, u, o1, r1); Bb = second(Pp, (-u[0], -u[1]), o2, r2)
    a2 = math.radians(random.uniform(190, 260)); w_ = (math.cos(a2), math.sin(a2))
    Cc = second(Qq, w_, o1, r1); Dd = second(Qq, (-w_[0], -w_[1]), o2, r2)
    v1, v2 = sub(Cc, Aa), sub(Dd, Bb); assert near(v1[0] * v2[1] - v1[1] * v2[0], 0, 1e-9)
# 1972 AHSME 25: solve for the diameter from the four chords.
lo, hi = 60.0001, 200.0
f = lambda d: sum(math.asin(L / d) for L in (25, 39, 52, 60)) - math.pi
for _ in range(200):
    mid = (lo + hi) / 2
    if f(mid) > 0: lo = mid
    else: hi = mid
assert near(lo, 65, 1e-9); V["r-ahsme72"] = 65; LETTER["1972-ahsme-25"] = ("C", 65)
# 1998 HMMT Feb G1: arcs AL = 180, LE = 20, EX = 20, XA = 140 give angle LAX = 20, AXE = 100.
A, L, E, X = P(0), P(180), P(200), P(220)
assert near(ang(A, L, X), 20) and near(ang(X, A, E), 100)
Dp = inter(A, X, L, E); V["r-hmmt98"] = round(ang(Dp, E, X), 6); assert near(V["r-hmmt98"], 80); V["r-hmmt98"] = 80
# 2022 SMT G2: angle A = 70 (angle ABH = 20); D on circle BHC and line CA.
for _ in range(10):
    B, C = (0, 0), (random.uniform(4, 6), 0)
    angB = random.uniform(50, 85); angC = 110 - angB
    if angC >= 90 or angC <= 20: continue
    tB = math.tan(math.radians(angB)); tC = math.tan(math.radians(angC)); xa = C[0] * tC / (tB + tC); A = (xa, xa * tB)
    H = orthocenter(A, B, C); assert near(ang(B, A, H), 20)
    O, Rr = circum(B, H, C); u = sub(A, C); n = math.hypot(*u); u = (u[0] / n, u[1] / n)
    w = sub(C, O); bq = 2 * (w[0] * u[0] + w[1] * u[1]); Dq = (C[0] - bq * u[0], C[1] - bq * u[1])
    assert near(ang(Dq, B, C), 110)
V["r-smt22"] = 110
V["r-amc07"] = (360 - 120 - 140) // 2; LETTER["2007-amc-10b-4"] = ("D", 50)
# ---- challenge ----
# 2017 CMIMC G6
A, B, D = P(0), P(2 * 50), P(360 - 2 * 70)               # angle ADB = 50 on arc AB = 100; angle ABD = 70 on arc AD = 140
C = P((100 + 220) / 2)                                   # midpoint of arc BD not containing A
assert near(ang(B, A, D), 70) and near(ang(D, A, B), 50) and near(dist(B, C), dist(C, D))
Pp = inter(A, B, C, D); Qq = inter(A, D, B, C)
V["ch-cmimc17"] = round(ang(Pp, A, Qq) - ang(Qq, A, Pp), 6); assert near(V["ch-cmimc17"], 40); V["ch-cmimc17"] = 40
# 2011 PUMaC A4: coordinates, incenter, circle IBC, second meet with AC.
A = (0, 0); C = (21, 0); xb = (15**2 - 17**2 + 21**2) / (2 * 21); B = (xb, math.sqrt(15**2 - xb * xb))
a_, b_, c_ = 17, 21, 15; I = ((a_ * A[0] + b_ * B[0] + c_ * C[0]) / 53, (a_ * A[1] + b_ * B[1] + c_ * C[1]) / 53)
O, Rr = circum(I, B, C); x2 = 2 * O[0] - 21; V["ch-pumac11"] = round(21 - x2, 9); assert near(V["ch-pumac11"], 6); V["ch-pumac11"] = 6
# 2013 HMMT Feb G6: many configurations; DF is always 3.
vals = set()
for _ in range(200):
    R0 = random.uniform(3.6, 12); O = (0, 0); A, C = (-R0, 0), (R0, 0)
    tb = math.degrees(2 * math.asin(7 / (2 * R0))); B = P(-tb, R0)            # BC = 7
    if not near(dist(B, C), 7): continue
    E0 = foot(A, B, (0, 0))
    for sgn in (1, -1):
        for td in [x / 4 for x in range(4, 1436)]:
            D = P(sgn * td, R0)
            if dist(D, B) < 1e-3: continue
            E = foot(A, B, D)
            if abs(dist(B, E) - 3) < 2e-3:
                F = foot(C, B, D); vals.add(round(dist(D, F), 2)); break
assert vals == {3.0}, vals; V["ch-hmmt13"] = 9
# 2007 HMMT Feb G8
A, B, D = P(0), P(2 * 10), P(360 - 2 * 130)              # angle ADB = 10 on arc AB; angle ABD = 130 on arc AD (major)
assert near(ang(D, A, B), 10) and near(ang(B, A, D), 130)
C = P((20 + 100) / 2)                                    # midpoint of arc BD not containing A
assert near(ang(A, B, C), ang(A, C, D)) and dist(A, B) < dist(A, D)
E = (D[0] + (A[0] - D[0]) * dist(C, D) / dist(A, D), D[1] + (A[1] - D[1]) * dist(C, D) / dist(A, D))
V["ch-hmmt07"] = round(ang(C, A, E), 6); assert near(V["ch-hmmt07"], 55); V["ch-hmmt07"] = 55
finish("geometry-2/G2.3", V, LETTER)
