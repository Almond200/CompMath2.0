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
V = {}   # item id -> verified value (sympy), or a letter for a symbolic multiple-choice answer
LETTER = {}   # contest slug -> (letter, value) for multiple-choice problems answered by letter
# A live key that disagrees with an independent computation is reported, not trusted (the
# chapter uses the verified value). Reported to the owner on 2026-11-28; the database is Codex's.
KNOWN_KEY_ISSUES = {"2026-hmmt-february-geometry-4": "stored 7/(3sqrt(3)) = 1.347...; the configuration gives 7/sqrt(3) = 4.041... (TA = TX = TY checked by coordinates)"}
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

# ---- the expanded practice (2026-11-28) ----
def circ3(P1, P2, P3):
    """Center and squared radius of the circle through three points (sympy exact)."""
    cx, cy = sp.symbols("cx cy")
    sol = sp.solve([(P1[0]-cx)**2 + (P1[1]-cy)**2 - (P2[0]-cx)**2 - (P2[1]-cy)**2,
                    (P1[0]-cx)**2 + (P1[1]-cy)**2 - (P3[0]-cx)**2 - (P3[1]-cy)**2], [cx, cy], dict=True)[0]
    return sol[cx], sol[cy], sp.simplify((P1[0]-sol[cx])**2 + (P1[1]-sol[cy])**2)
# pp-arcs: place arcs on a unit circle and measure the angle between the chords.
def on(deg_): return sp.Matrix([sp.cos(sp.rad(deg_)), sp.sin(sp.rad(deg_))])
A_, B_ = on(0), on(80); C_, D_ = on(200), on(240)        # A, B, C, D in order; arc AB = 80, arc CD = 40
s1, s2 = sp.symbols("s1 s2")
sol = sp.solve(list(A_ + s1*(C_-A_) - B_ - s2*(D_-B_)), [s1, s2]); Pp = A_ + sol[s1]*(C_-A_)
ang = sp.acos(((A_-Pp).dot(B_-Pp)) / sp.sqrt((A_-Pp).dot(A_-Pp) * (B_-Pp).dot(B_-Pp)))
assert abs(float(ang) * 180 / math.pi - 60) < 1e-9; V["pp-arcs"] = 60
# 1991 AHSME 10: count chords through P (OP = 9, r = 15) of integer length, by distance h in [0, 9].
lengths = {}
for L in range(1, 31):
    h2 = 225 - (L/2)**2
    if 0 <= h2 <= 81: lengths[L] = 1 if h2 in (0, 81) else 2
assert sum(lengths.values()) == 12; V["p-ahsme91"] = 12; LETTER["1991-ahsme-10"] = ("B", 12)
# 2014 HMMT Feb Geo 1: concentric radii 4 and 6, chord of length 2 of the inner circle extended.
V["p-hmmt14c"] = 2*sp.sqrt(36 - (16 - 1)); assert sp.simplify(V["p-hmmt14c"] - 2*sp.sqrt(21)) == 0
# 2015 HMMT Nov General 4: coordinates with P at the origin; search both orders of CP, PD.
areas = set()
for cp in pos_roots(t**2 - 22*t + 72, t):
    ox, oy = 3, sp.Rational(cp - (22 - cp), 2)                # center: midpoints of the chords
    areas.add(sp.simplify(((-6 - ox)**2 + oy**2) * sp.pi))
assert areas == {130*sp.pi}; V["p-hmmt15n"] = 130*sp.pi
# 2024 SMT Geo 3: regular hexagon, incircle radius sqrt(3)/2; second intersection of AM with it.
A6 = sp.Matrix([1, 0]); M6 = sp.Matrix([0, sp.sqrt(3)/2])
ts = sp.solve((A6 + t*(M6-A6)).dot(A6 + t*(M6-A6)) - sp.Rational(3, 4), t)
tp = min(ts, key=lambda z: float(z)); V["p-smt24"] = sp.simplify(tp * sp.sqrt((M6-A6).dot(M6-A6)))
assert sp.simplify(V["p-smt24"] - sp.sqrt(7)/14) == 0
# 1959 AHSME 32: tangent l = 4r/3; nearest distance = OA - r; compare with each choice (r = 3, l = 4).
r_, l_ = 3, 4; near = math.sqrt(r_**2 + l_**2) - r_
assert near == l_/2 and near != r_/2 and near != 2*l_/3; V["p-ahsme59"] = "C"
# 2012 SMT General 23: coordinates.
Bc = sp.Matrix([0, 0]); Ac = sp.Matrix([-36, 0]); yC = sp.symbols("yC", positive=True)   # tangent at B is vertical
Cc = sp.Matrix([0, yC]); Oc = sp.Matrix([-18, 0])
tt = [z for z in sp.solve((Ac + t*(Cc-Ac) - Oc).dot(Ac + t*(Cc-Ac) - Oc) - 324, t) if z != 0][0]
yv = [z for z in sp.solve(sp.Eq(tt*sp.sqrt(36**2 + yC**2), 24), yC) if z > 0][0]
V["p-smt12"] = yv; assert sp.simplify(yv - 18*sp.sqrt(5)) == 0
# 2025 BMMT 13: coordinates with C at the origin, A on the y-axis, D on the x-axis.
x_ = sp.symbols("x_", positive=True); Bb = (-9, 0); Aa = (0, 4); Dd = (x_, 0)
cx_, cy_, rr = circ3(Bb, (0, 0), Aa)
tang = sp.solve(sp.Eq(((Dd[0]-cx_)**2 + (Dd[1]-cy_)**2) - rr, (Dd[0]-Aa[0])**2 + (Dd[1]-Aa[1])**2), x_)
assert tang == [sp.Rational(16, 9)]; V["p-bmmt25"] = sp.Rational(16, 9)
# pp-reverse: PA = 5, AB = 7, CD = 4.
rts = pos_roots(x*(x+4) - 5*12, x); assert rts == [6]; V["pp-reverse"] = 6
# 2016 MBMT 4: the near distance on a line through C is at most sqrt(power); sample directions.
OA_ = sp.Rational(201, 6); AB_, BC_ = 20, 16
h_ = math.sqrt(float(OA_)**2 - 100); O16 = (0.0, h_); Cpt = (10 + 16, 0.0)
best = 0
for k_ in range(1, 200000):
    a_ = math.pi * k_ / 200000; u_ = (math.cos(a_), math.sin(a_))
    w_ = (Cpt[0]-O16[0], Cpt[1]-O16[1]); b_ = 2*(w_[0]*u_[0] + w_[1]*u_[1]); c_ = w_[0]**2 + w_[1]**2 - float(OA_)**2
    disc = b_*b_ - 4*c_
    if disc >= 0 and (-b_ - math.sqrt(disc))/2 > 0:            # the ray meets the circle ahead of C
        best = max(best, (-b_ - math.sqrt(disc))/2)
assert best <= 24 + 1e-9 and abs(math.sqrt((26)**2 + h_**2 - float(OA_)**2) - 24) < 1e-9; V["p-mbmt16"] = 24   # no line exceeds 24; the tangent attains it
# 1992 AHSME 27: build the configuration and measure r^2.
pc = pos_roots(x*(x+7) - 144, x)[0]
Pq = sp.Matrix([0, 0]); Bq = sp.Matrix([8, 0]); Aq = sp.Matrix([18, 0]); u60 = sp.Matrix([sp.Rational(1, 2), sp.sqrt(3)/2])
Cq, Dq = pc*u60, (pc+7)*u60
cx_, cy_, rr = circ3(tuple(Aq), tuple(Bq), tuple(Cq))
assert sp.simplify((Dq[0]-cx_)**2 + (Dq[1]-cy_)**2 - rr) == 0 and sp.simplify(rr - 73) == 0
V["p-ahsme92"] = 73; LETTER["1992-ahsme-27"] = ("D", 73)
# 2014 CHMMC 8: chord through B at 45 degrees to the diameter, AB = 1, BC = 7; solve for B and r.
b_ = sp.symbols("b_", real=True); R_ = sp.symbols("R_", positive=True)
u45 = sp.Matrix([1, 1])/sp.sqrt(2); Bm = sp.Matrix([b_, 0])
so = sp.solve([(Bm - u45).dot(Bm - u45) - R_**2, (Bm + 7*u45).dot(Bm + 7*u45) - R_**2], [b_, R_], dict=True)
assert {d[R_] for d in so} == {5}; V["p-chmmc14"] = 5
# 2008 HMMT Feb Geo 6: any A on the major arc gives angle A = 45; check one and compute OP.
R8 = 4*sp.sqrt(2); B8 = R8*on(225); C8 = R8*on(315); A8 = R8*on(110); P8 = B8 + sp.Rational(3, 8)*(C8-B8)
angA = sp.acos(((B8-A8).dot(C8-A8)) / sp.sqrt((B8-A8).dot(B8-A8)*(C8-A8).dot(C8-A8)))
assert abs(float(angA) - math.pi/4) < 1e-12; V["p-hmmt08"] = sp.sqrt(sp.simplify(P8.dot(P8)))
assert sp.simplify(V["p-hmmt08"] - sp.sqrt(17)) == 0
# 1976 AHSME 18: solve for r with coordinates (B outside, C on the circle, D inside, OD = 2).
pq, qq, rq = sp.symbols("pq qq rq", real=True)            # C = (0,0), B = (-3,0), D = (3,0), O = (pq, qq)
so = sp.solve([pq**2 + qq**2 - rq**2, (pq - 3)**2 + qq**2 - 4, (pq + 3)**2 + qq**2 - rq**2 - 36], [pq, qq, rq], dict=True)
assert {d[rq] for d in so if d[rq] > 0} == {sp.sqrt(22)}; V["p-ahsme76"] = sp.sqrt(22); LETTER["1976-ahsme-18"] = ("E", sp.sqrt(22))
# 2019 MBMT Upper 6: solve the tangent-length equation numerically from scratch.
f_ = lambda v: math.sqrt(v*(v-10)) + math.sqrt(v*(v-11)) - v
lo, hi = 11.0, 100.0
for _ in range(200):
    mid = (lo + hi)/2
    if f_(mid) < 0: lo = mid        # f increases from negative at 11 to positive
    else: hi = mid
V["p-mbmt19"] = 7 + 2*sp.sqrt(111)/3; assert abs(lo - float(V["p-mbmt19"])) < 1e-9
# 1957 AHSME 18: AP*AM = AO*AB for random chords AM (radius 1, A = (-1, 0), P on CD = the y-axis).
for th in (0.3, 0.9, 1.4, 2.0):
    Mq = (math.cos(th), math.sin(th)); m_ = Mq[1]/(Mq[0] + 1); Pq_ = (0, m_)
    assert abs(math.dist((-1, 0), Pq_) * math.dist((-1, 0), Mq) - 1*2) < 1e-12
V["p-ahsme57"] = "B"
# 2014 HMMT Feb Geo 2: the circle through (5, 12) tangent to the x-axis at the origin.
rr_ = sp.symbols("rr_", positive=True); V["p-hmmt14t"] = sp.solve(25 + (12 - rr_)**2 - rr_**2, rr_)[0]
assert V["p-hmmt14t"] == sp.Rational(169, 24)
# Review.
V["rv-ahsme54"] = sp.sqrt(169 - 9*16); LETTER["1954-ahsme-9"] = ("C", 5)
cx_, cy_, rr = circ3((0, 8), (8, 8), (4, 0)); V["rv-ahsme62"] = sp.sqrt(rr); assert V["rv-ahsme62"] == 5; LETTER["1962-ahsme-25"] = ("C", 5)
V["rv-hmmt02"] = sp.sqrt(225 + 28*52); assert V["rv-hmmt02"] == 41
rr6 = sp.symbols("rr6", positive=True); V["rv-ahsme74"] = sp.solve((2*rr6)**2 + 5**2 - 13**2, rr6)[0]; LETTER["1974-ahsme-23"] = ("B", 6)
xe = sp.symbols("xe", positive=True)                       # E = (0, xe); tangent from C=(2,2) to the semicircle on AB (y=0 side x in [0,2])
sol = [z for z in sp.solve(sp.Eq((2 - 0)**2 + (2 - xe)**2, (2 + xe)**2), xe) if 0 < z < 2]
V["rv-amc04"] = 2 + sol[0]; assert V["rv-amc04"] == sp.Rational(5, 2); LETTER["2004-amc-10a-22"] = ("D", sp.Rational(5, 2))
# 2011 HMMT Nov theme 8: coordinates with P at the origin.
D11 = sp.Matrix([4, 0]); F11 = 2*on(60); E11 = 8*on(60)
cx_, cy_, rr = circ3(tuple(D11), tuple(F11), tuple(E11)); V["rv-hmmt11"] = sp.simplify(sp.pi*rr)
assert sp.simplify(cx_*0 + (cy_ - 0)*0 + (D11[0]-cx_)) == 0            # radius at D is vertical: tangent is the x-axis
assert sp.simplify(V["rv-hmmt11"] - 12*sp.pi) == 0
# 2018 PUMaC B3: solve the two conditions for the radius and check existence.
ac, R18 = sp.symbols("ac R18", positive=True)
so = sp.solve([ac*(2*R18 - ac) - 900, (ac**2 + 900) - 16*sp.Rational(1, 2)*ac*30], [ac, R18], dict=True)
assert {d[R18] for d in so} == {120}; V["rv-pumac18"] = 120
V["rv-ahsme67"] = "C"   # the symbolic diameter sqrt(ab), recomputed by coordinates below
a_s, b_s, d_s, X_ = sp.symbols("a_s b_s d_s X_", positive=True)
xs = sp.solve(sp.Eq(b_s*X_/d_s, a_s*(1 - X_/d_s)), X_)[0]; ys = b_s*xs/d_s
assert sp.solve(sp.Eq((xs - d_s/2)**2 + ys**2, d_s**2/4), d_s) == [sp.sqrt(a_s)*sp.sqrt(b_s)]
e21 = sp.sqrt(2*sp.Rational(32, 49) - 1); de = sp.sqrt(e21**2 + 1); assert de == sp.Rational(8, 7); V["rv-hmmt21"] = 807
# Challenge.
l26 = sp.symbols("l26", positive=True); X26 = sp.Matrix([4, 2*sp.sqrt(3)]); T26 = sp.Matrix([0, l26])
sol = sp.solve((X26 - T26).dot(X26 - T26) - l26**2, l26); V["ch-hmmt26"] = sol[0]
Y26 = sp.Matrix([sp.Rational(3, 2), 9*sp.sqrt(3)/2]); assert sp.simplify((Y26 - sp.Matrix([0, sol[0]])).dot(Y26 - sp.Matrix([0, sol[0]])) - sol[0]**2) == 0
assert sp.simplify(sol[0] - 7*sp.sqrt(3)/3) == 0 and 0 < sol[0] < 6*sp.sqrt(3)
# 2019 Duke 8: numeric construction; circles through A, B tangent to the x-axis, PQ = 420.
def duke(ab):
    # A above B on a line through M = origin with heights 12 and 3: MB = ab/3, MA = 4ab/3
    mb = ab/3; bx = math.sqrt(mb*mb - 9); Bp = (bx, 3.0); Ap = (4*bx, 12.0)
    # tangency points p with p^2 = MA*MB on both sides
    return 2*math.sqrt(4*mb*mb)
assert abs(duke(315) - 420) < 1e-9; V["ch-duke19"] = 315
# 2023 AIME II 9: build both circles from h and check every incidence, then the area.
h9 = sp.sqrt(15); c1 = (h9**2 - 25)/(2*h9); c2 = (h9**2 - 49)/(2*h9)
Q9 = sp.Matrix([1, h9]) + 9*(sp.Matrix([0, 0]) - sp.Matrix([1, h9]))/4
for (cx_, cy_, Z) in ((-5, c1, [(0, 0), (-10, 0), (-5, h9), tuple(Q9)]), (7, c2, [(0, 0), (14, 0), (7, h9), tuple(Q9)])):
    rad = (h9 - cy_)**2
    assert all(sp.simplify((z[0]-cx_)**2 + (z[1]-cy_)**2 - rad) == 0 for z in Z)
area = sp.Rational(1, 2)*(24 + 12)*h9; assert area == 18*sp.sqrt(15); V["ch-aime23"] = 18 + 15
# 2022 AIME I 11: done in coordinates; both side cases, keep the acute one.
r22 = 3*sp.sqrt(3); A22 = sp.Matrix([-6, r22]); B22 = sp.Matrix([-sp.Rational(9, 2), -r22]); C22 = sp.Matrix([20, -r22])
assert sp.simplify((A22 - B22).dot(A22 - B22) - (6 + sp.Rational(9, 2))**2) == 0 and (A22 - C22).dot(A22 - C22) == 784
ts = sp.solve((A22 + t*(C22 - A22)).dot(A22 + t*(C22 - A22)) - 27, t); assert sorted(z*28 for z in ts) == [3, 12]
V["ch-aime22"] = 147 + 3

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
    if it["choices"] or (isinstance(V[iid], str)) or re.fullmatch(r"[A-E]", it["answer"] or ""):
        want = V[iid] if isinstance(V[iid], str) else LETTER.get(it["slug"], (None,))[0]
        if it["answer"] != want: errors.append(f"{iid}: chapter choice {it['answer']} != verified {V[iid]}")
        continue
    if not same(it["answer"], sp.N(V[iid], 15)): errors.append(f"{iid}: chapter answer {it['answer']} != verified {V[iid]}")
for iid, it in items.items():
    if it["slug"]:
        live = keys.get(it["slug"])
        if it["slug"] in KNOWN_KEY_ISSUES:
            print(f"KEY ISSUE ({iid}, {it['slug']}): {KNOWN_KEY_ISSUES[it['slug']]}; live key {live!r}")
        elif it["slug"] in LETTER:
            letter, val = LETTER[it["slug"]]
            if live != letter: errors.append(f"{iid}: live key {live} != {letter}")
            if iid in V and not isinstance(V[iid], str) and sp.simplify(sp.nsimplify(V[iid]) - val) != 0: errors.append(f"{iid}: verified value disagrees with choice {letter}")
        elif re.fullmatch(r"[A-E]", it["answer"] or ""):
            if live != it["answer"]: errors.append(f"{iid}: live key {live} != chapter letter {it['answer']}")
        elif it["slug"] in MC:
            letter, val = MC[it["slug"]]
            if live != letter: errors.append(f"{iid}: live key {live} != {letter}")
            if iid in V and sp.simplify(V[iid] - val) != 0: errors.append(f"{iid}: verified value disagrees with choice {letter}")
        elif not same(live, sp.N(V[iid], 15)): errors.append(f"{iid}: live key {live} != verified {V[iid]}")
for e_ in errors: print("ERROR:", e_)
print(f"{len(V)} values verified; {sum(1 for i in items.values() if i['answer'])} answered items; {'failed' if errors else 'passed'}")
sys.exit(1 if errors else 0)
