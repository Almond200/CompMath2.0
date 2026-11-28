#!/usr/bin/env python3
"""Figures for geometry-2/G2.2 (Power of a Point), drawn from exact coordinates with figlib.

Every figure is computed, not sketched: points are solved from the stated lengths, and each
figure asserts the relation it illustrates (equal products, tangency, concyclicity) before it is
written. Labels are placed by figlib's layout, which refuses any overlap. Roles, label sizes and
marks follow curriculum/AUTHORING-STANDARD.md §9.
Output: js/data/curriculum/geometry-2/g2.02-figures.js (window.MATH_CURRICULUM_FIGURES).

usage: python3 tools/curriculum/figures/g2_02.py [--check]
"""
import json, math, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from figlib import *  # noqa: F401,F403

OUT = Path(__file__).resolve().parents[3] / "js/data/curriculum/geometry-2/g2.02-figures.js"
FIGS = {}
def keep(f): FIGS[f.name] = f.svg()
def close(a, b, tol=1e-7): return abs(a - b) < tol

# ---------------------------------------------------------------- opening
# Four chords through P (radius 5, OP = 2); every product is 21. The table in the text names each
# chord by its endpoints, the first endpoint on the short piece.
O = (0, 0); r = 5; P = (2, 0)
f = Fig("chords-table", "Four chords AB, CD, EF and GH of a circle, all through the point P",
        "Radius $5$ and $OP=2$. Each chord is named by its endpoints; the table gives the two pieces each is cut into by $P$.",
        (-5.6, 6.4, -5.8, 5.8))
f.circle(O, r)
CHORDS = []
for cos_t, (n1, n2) in ((1, "AB"), (0.625, "CD"), (0.3125, "EF"), (0, "GH")):
    th = math.acos(cos_t); u = (math.cos(th), math.sin(th))
    t0, t1 = line_circle(P, u, O, r)
    X1, X2 = pt(P, u, t1), pt(P, u, t0)          # X1 on the short piece
    assert close(t1 * -t0, 21)
    CHORDS.append((n1 + n2, round(t1, 4), round(-t0, 4)))
    f.seg(X1, X2)
for cos_t, (n1, n2) in ((1, "AB"), (0.625, "CD"), (0.3125, "EF"), (0, "GH")):
    th = math.acos(cos_t); u = (math.cos(th), math.sin(th)); t0, t1 = line_circle(P, u, O, r)
    f.point(pt(P, u, t1), n1, O); f.point(pt(P, u, t0), n2, O)
f.point(O, "O", at=-120); f.point(P, "P", at=-60)
assert CHORDS == [("AB", 3.0, 7.0), ("CD", 3.5, 6.0), ("EF", 4.0, 5.25), ("GH", round(math.sqrt(21), 4), round(math.sqrt(21), 4))]
keep(f)

# ---------------------------------------------------------------- G2.2.1
# The inscribed angle theorem, the case with O inside angle ACB: the diameter CE splits it.
O = (0, 0); r = 5
A, B, C = mul(deg(150), r), mul(deg(25), r), mul(deg(268), r); E = mul(C, -1)
al = math.degrees(math.acos(dot(unit(sub(A, C)), unit(sub(O, C)))))
be = math.degrees(math.acos(dot(unit(sub(B, C)), unit(sub(O, C)))))
aoe = math.degrees(math.acos(dot(unit(sub(A, O)), unit(sub(E, O)))))
boe = math.degrees(math.acos(dot(unit(sub(B, O)), unit(sub(E, O)))))
assert close(aoe, 2 * al, 1e-9) and close(boe, 2 * be, 1e-9)
f = Fig("inscribed-proof", "The inscribed angle ACB and the central angle AOB, split by the diameter through C",
        "Dashed: the diameter $CE$, drawn for the proof. Triangles $OAC$ and $OBC$ are isosceles, so each base angle is repeated, and each exterior angle at $O$ is twice it.",
        (-5.9, 5.9, -5.9, 5.9))
f.circle(O, r)
f.seg(C, A); f.seg(C, B); f.seg(C, E, "aux"); f.seg(O, A, "key"); f.seg(O, B, "key")
f.angle(C, A, O, 1, 40); f.angle(A, C, O, 1, 30)
f.angle(C, O, B, 2, 52, "key2"); f.angle(B, O, C, 2, 30, "key2")
f.angle(O, A, E, 1, 24); f.angle(O, E, B, 2, 34, "key2")
f.angle_label(C, A, O, "α", 40); f.angle_label(A, C, O, "α", 30)
f.angle_label(C, O, B, "β", 52, 2); f.angle_label(B, O, C, "β", 30, 2)
f.angle_label(O, A, E, "2α", 24); f.angle_label(O, E, B, "2β", 34, 2)
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (E, "E")): f.point(X_, n, O)
f.point(O, "O", at=-20)
keep(f)

# Inscribed angles on the same arc: C and D on the same side of AB.
A, B = mul(deg(205), r), mul(deg(335), r); C, D = mul(deg(65), r), mul(deg(125), r)
th = math.degrees(math.acos(dot(unit(sub(A, C)), unit(sub(B, C)))))
th2 = math.degrees(math.acos(dot(unit(sub(A, D)), unit(sub(B, D)))))
cen = math.degrees(math.acos(dot(unit(A), unit(B))))
assert close(th, th2, 1e-9) and close(cen, 2 * th, 1e-9)
f = Fig("same-arc", "Inscribed angles ACB and ADB on the same arc are equal, and each is half the central angle AOB",
        "$C$ and $D$ lie on the same side of chord $AB$, so $\\angle ACB=\\angle ADB=\\theta$, half of the central angle $\\angle AOB=2\\theta$. Dashed: the radii $OA$ and $OB$.",
        (-5.9, 5.9, -5.6, 5.9))
f.circle(O, r)
for X_ in (C, D): f.seg(X_, A); f.seg(X_, B)
f.seg(A, B); f.seg(O, A, "aux"); f.seg(O, B, "aux")
f.angle(C, A, B, 1, 34); f.angle(D, A, B, 1, 34); f.angle(O, A, B, 1, 22, "key2")
f.angle_label(C, A, B, "θ", 34); f.angle_label(D, A, B, "θ", 34); f.angle_label(O, A, B, "2θ", 22)
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, O)
f.point(O, "O", at=90)
keep(f)

# ---------------------------------------------------------------- G2.2.2
O = (0, 0); r = 5; P = (1.2, -0.8)
uA = unit((-1, 0.25)); uC = unit((-0.45, -1))
tA = line_circle(P, uA, O, r); tC = line_circle(P, uC, O, r)
A, B = pt(P, uA, tA[1]), pt(P, uA, tA[0]); C, D = pt(P, uC, tC[1]), pt(P, uC, tC[0])
assert close(dist(P, A) * dist(P, B), dist(P, C) * dist(P, D))
f = Fig("crossing-chords", "Chords AB and CD cross at P; triangles PAC and PDB are similar",
        "Shaded: triangles $PAC$ and $PDB$. Equal marks show equal angles: $\\angle CAP=\\angle BDP$ (on arc $CB$) and $\\angle ACP=\\angle DBP$ (on arc $AD$).",
        (-5.6, 5.6, -5.7, 5.7))
f.poly([P, A, C], "ff"); f.poly([P, D, B], "ff2")
f.circle(O, r); f.seg(A, B); f.seg(C, D); f.seg(A, C, "key"); f.seg(D, B, "key2")
f.angle(A, C, P, 1, 30); f.angle(D, B, P, 1, 30, "key2")
f.angle(C, A, P, 2, 26); f.angle(B, D, P, 2, 26, "key2")
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, O)
f.point(P, "P", at=70)
keep(f)

# Example: radius 13, OP = 5; the diameter EF and the perpendicular chord GH through P.
O = (0, 0); r = 13; d = 5; P = (d, 0); E_, F_, G, H = (-r, 0), (r, 0), (d, 12), (d, -12)
assert on_circle(O, r, G) and on_circle(O, r, H) and (r + d) * (r - d) == 12 * 12 == 144
f = Fig("diameter-point", "Through P, the diameter EF and the chord GH perpendicular to OP",
        "Radius $13$ and $OP=5$: $PE\\cdot PF=18\\cdot 8=144=PG\\cdot PH=12\\cdot 12$.",
        (-14.5, 14.5, -14.2, 14.2))
f.circle(O, r); f.seg(E_, F_); f.seg(G, H, "key"); f.right(P, F_, G, 10)
f.ticks(P, G, 1, "key"); f.ticks(P, H, 1, "key")
for X_, n, at in ((E_, "E", 180), (F_, "F", 0), (G, "G", 90), (H, "H", -90)): f.point(X_, n, at=at)
f.point(O, "O", at=-90); f.point(P, "P", at=-135)
f.length(E_, O, "13", 1); f.length(O, P, "5", 1); f.length(P, F_, "8", 1)
f.length(P, G, "12", -1); f.length(P, H, "12", 1)
keep(f)

# ---------------------------------------------------------------- G2.2.3
O = (0, 0); r = 4; P = (9.5, 0); pw = 9.5 ** 2 - 16
ang_t = math.asin(r / 9.5)
f = Fig("secant-to-tangent", "As the secant from P turns, its two points A and B close up into the point of tangency T",
        "Three positions of a line through $P$. On each secant $PA\\cdot PB=OP^2-r^2$; at the tangent $A$ and $B$ have merged into $T$. Dashed: the radius $OT$.",
        (-4.6, 10.4, -4.6, 4.9))
f.circle(O, r)
for frac in (0.45, 1.0):
    a = math.pi - ang_t * frac; u = (math.cos(a), math.sin(a)); ts = line_circle(P, u, O, r)
    if frac < 1:
        A, B = pt(P, u, ts[0]), pt(P, u, ts[1]); assert close(ts[0] * ts[1], pw)
        f.seg(P, B); f.point(A, "A", at=-80); f.point(B, "B", O)
    else:
        T = pt(P, u, ts[0]); assert close(dist(P, T) ** 2, pw)
        f.seg(P, T, "key"); f.seg(O, T, "aux"); f.right(T, O, P, 9); f.point(T, "T", O)
f.seg(P, (-4, 0))
f.point((-4, 0), "", at=180); f.point((4, 0), "", at=-60)
f.point(O, "O", at=-90); f.point(P, "P", at=0)
keep(f)

# The proof from the center: OM is perpendicular to the secant, so M is the midpoint of AB.
O = (0, 0); r = 4; P = (10, 0)
u = unit((-1, 0.22)); ts = line_circle(P, u, O, r)
A, B = pt(P, u, ts[0]), pt(P, u, ts[1]); M = pt(P, u, (ts[0] + ts[1]) / 2)
T = (r * r / 10, -math.sqrt(r * r - (r * r / 10) ** 2))
assert close(dist(P, A) * dist(P, B), 100 - 16) and close(dist(P, T) ** 2, 84) and close(dist(M, A), dist(M, B))
f = Fig("center-perpendicular", "The perpendicular OM from the center to the secant PAB, and the tangent PT",
        "Dashed: $OM$, perpendicular to the secant, and $OP$ and $OT$. $M$ is the midpoint of $AB$ (equal ticks); $OA=OT=r$.",
        (-4.7, 10.6, -4.6, 4.7))
f.circle(O, r); f.seg(P, B); f.seg(O, M, "aux"); f.right(M, O, P, 9)
f.seg(O, P, "aux"); f.seg(O, A, "key"); f.seg(P, T, "key2"); f.seg(O, T, "aux"); f.right(T, O, P, 9)
f.ticks(M, A, 1); f.ticks(M, B, 1)
f.length(O, A, "r", -1, True)
for X_, n, aw in ((A, "A", O), (B, "B", O), (T, "T", O)): f.point(X_, n, aw)
f.point(M, "M", at=110); f.point(P, "P", at=0); f.point(O, "O", at=180)
keep(f)

# Example 1956 AHSME 14: tangent PA = 10 sqrt 3, secant P-B-C with BC = 20; PB = 10.
P = (0, 0); c = (20, 7); R = math.sqrt(100 + 49)
B, C = (10, 0), (30, 0)
A = max(circle_circle(P, math.sqrt(300), c, R), key=lambda q: q[1])
assert on_circle(c, R, B) and on_circle(c, R, C) and close(dot(sub(A, c), sub(A, P)), 0, 1e-6)
f = Fig("tangent-secant-example", "The tangent PA and the secant PBC from the point P",
        "$PA^2=PB\\cdot PC$, with $PB=x$ and $PC=x+20$.",
        (-1.5, 33.5, -6.5, 20.5))
f.circle(c, R); f.seg(P, C); f.seg(P, A, "key"); f.seg(c, A, "aux"); f.right(A, c, P, 9)
f.length(P, A, "10√3", 1); f.length(B, C, "20", -1); f.length(P, B, "x", -1, True)
f.point(P, "P", at=180); f.point(A, "A", c); f.point(B, "B", at=-90); f.point(C, "C", at=-20)
f.point(c, "O", at=0)
keep(f)

# Guided practice 2020 AMC 12B 10: unit square, incircle, AM meets the circle again at P.
A, B, C, D = (0, 0), (1, 0), (1, 1), (0, 1); w = (0.5, 0.5); M = (0.5, 1); N = (0.5, 0); P = (0.1, 0.2)
assert on_circle(w, 0.5, P) and close(dist(A, P) * dist(A, M), 0.25)
f = Fig("square-incircle", "Unit square ABCD with its inscribed circle; AM meets the circle again at P",
        "From $A$: the tangent $AN$ along $AB$, and the secant $APM$.",
        (-0.12, 1.12, -0.12, 1.12), width=400)
f.seg(A, B); f.seg(B, C); f.seg(C, D); f.seg(D, A); f.circle(w, 0.5)
f.seg(A, M, "key"); f.seg(A, N, "key2")
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, w)
f.point(M, "M", at=90); f.point(N, "N", at=-90); f.point(P, "P", at=150)
f.length(A, N, "½", -1)
keep(f)

# ---------------------------------------------------------------- G2.2.4
O = (0, 0); r = 4.2; P = (10, 0.6)
u1 = unit((-1, 0.33)); u2 = unit((-1, -0.28))
t1 = line_circle(P, u1, O, r); t2 = line_circle(P, u2, O, r)
A, B = pt(P, u1, t1[0]), pt(P, u1, t1[1]); C, D = pt(P, u2, t2[0]), pt(P, u2, t2[1])
assert close(dist(P, A) * dist(P, B), dist(P, C) * dist(P, D))
f = Fig("two-secants", "Secants PAB and PCD from an outside point; triangles PAD and PCB are similar",
        "Shaded: triangles $PAD$ and $PCB$. They share the angle at $P$, and $\\angle ADC=\\angle ABC$ (marked), both on arc $AC$.",
        (-4.8, 10.9, -4.8, 4.9))
f.poly([P, A, D], "ff"); f.poly([P, C, B], "ff2")
f.circle(O, r); f.seg(P, B); f.seg(P, D); f.seg(A, D, "key"); f.seg(C, B, "key2")
f.angle(D, A, P, 1, 30); f.angle(B, C, P, 1, 30, "key2")
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, O)
f.point(P, "P", at=0)
keep(f)

# Example: two secants, PA = 4, AB = 5, PC = 3; CD = 9.
P = (0, 0); u1, u2 = deg(14), deg(-16)
# the centre c satisfies c.u1 = 6.5 and c.u2 = 7.5 (the chords' midpoints), and |c|^2 - R^2 = 36
det = u1[0] * u2[1] - u1[1] * u2[0]
c = ((6.5 * u2[1] - 7.5 * u1[1]) / det, (7.5 * u1[0] - 6.5 * u2[0]) / det); R = math.sqrt(dot(c, c) - 36)
A, B, C, D = pt(P, u1, 4), pt(P, u1, 9), pt(P, u2, 3), pt(P, u2, 12)
assert all(on_circle(c, R, X_) for X_ in (A, B, C, D))
f = Fig("two-secants-example", "Two secants from P: PA = 4, AB = 5 and PC = 3",
        "The lengths that multiply are measured from $P$: $PA\\cdot PB=4\\cdot 9$ and $PC\\cdot PD=3\\cdot PD$.",
        (-0.8, c[0] + R + 0.5, c[1] - R - 0.5, c[1] + R + 0.6))
f.circle(c, R); f.seg(P, B); f.seg(P, D)
f.length(P, A, "4", 1); f.length(A, B, "5", -1); f.length(P, C, "3", -1); f.length(C, D, "?", -1)
f.point(P, "P", at=180); f.point(A, "A", c); f.point(B, "B", c); f.point(C, "C", c); f.point(D, "D", c)
keep(f)

# ---------------------------------------------------------------- G2.2.5
f = Fig("power-cases", "The line through the center, with P inside the circle and with P outside it",
        "On the line through $O$: inside, $PA=r-OP$ and $PB=r+OP$; outside, $PA=OP-r$ and $PB=OP+r$.",
        (-4.6, 21.6, -4.6, 4.2))
for cx, Pp in ((0, (2.0, 0)), (12.0, (20.4, 0))):
    Oc = (cx, 0); rr = 3.6
    f.circle(Oc, rr); f.seg((cx - rr, 0), (max(cx + rr, Pp[0]), 0))
    f.point(Oc, "O", at=-90); f.point(Pp, "P", at=90)
    # A is the nearer point to P, B the farther, in both cases
    f.point((cx - rr, 0), "B", at=180 if Pp[0] < cx + rr else 135)
    f.point((cx + rr, 0), "A", at=45)
    assert close(((cx + rr) - Pp[0]) * (Pp[0] - (cx - rr)) if Pp[0] < cx + rr else (Pp[0] - cx - rr) * (Pp[0] - cx + rr),
                 abs((Pp[0] - cx) ** 2 - rr * rr))
f.free(0.0 * f.s + f.ox, f.h - 8, "P inside", 17); f.free(12.0 * f.s + f.ox, f.h - 8, "P outside", 17)
keep(f)

# Example 2020 AMC 12B 12: diameter AB, radius 5 sqrt 2, BE = 2 sqrt 5, angle AEC = 45 degrees.
R = 5 * math.sqrt(2); O = (0, 0); A, B = (-R, 0), (R, 0); E_ = (R - 2 * math.sqrt(5), 0)
uC = deg(135); ts = line_circle(E_, uC, O, R); C, D = pt(E_, uC, ts[1]), pt(E_, uC, ts[0]); M = foot(O, C, D)
assert close(dist(C, E_) ** 2 + dist(D, E_) ** 2, 100)
f = Fig("chord-45", "Diameter AB and the chord CD through E at 45 degrees; OM is perpendicular to CD",
        "Dashed: $OM\\perp CD$, so $M$ is the midpoint of $CD$ and $OM=OE\\sin 45^\\circ$. The marked angle $\\angle BED$ equals $\\angle AEC=45^\\circ$ (vertical angles).",
        (-7.9, 7.9, -7.8, 7.8))
f.circle(O, R); f.seg(A, B); f.seg(C, D, "key"); f.seg(O, M, "aux"); f.right(M, O, C, 9)
f.angle(E_, B, D, 1, 26); f.angle_label(E_, B, D, "45°", 26)
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, O)
f.point(O, "O", at=-90); f.point(E_, "E", at=-60); f.point(M, "M", at=45)
f.length(E_, B, "2√5", 1)
keep(f)

# 1995 AHSME 26: its official diagram already shows the configuration, so no figure is drawn
# (AUTHORING-STANDARD §9, reuse before redrawing).

# ---------------------------------------------------------------- G2.2.6
# Example 2006 HMMT February Geometry 3, to scale: X, P, Q, Y on a line; AB through P, CD through Q.
X_, P, Q, Y = (0, 0), (1, 0), (28, 0), (31, 0); k = -9.0; c = (15.5, k); R = math.sqrt(15.5 ** 2 + k * k)
def chord(Pt, near, far):
    """Unit direction u with Pt + near*u and Pt - far*u on the circle, pointing upward."""
    w = sub(Pt, c); target = -(near - far) / 2          # u.w = -(t1 + t2)/2 with t1 = near, t2 = -far
    base = math.atan2(w[1], w[0]); off = math.acos(target / norm(w))
    for a in (base + off, base - off):
        u = (math.cos(a), math.sin(a))
        if u[1] > 0: return u
U1 = chord(P, 6, 5); U2 = chord(Q, 7, 12)
A, B = pt(P, U1, 6), pt(P, U1, -5); C, D = pt(Q, U2, 7), pt(Q, U2, -12)
assert all(on_circle(c, R, Z) for Z in (X_, Y, A, B, C, D))
f = Fig("two-points", "Line XY crosses chord AB at P and chord CD at Q",
        "Each of $P$ and $Q$ gives one equation: $XP\\cdot PY=PA\\cdot PB$ and $XQ\\cdot QY=QC\\cdot QD$.",
        (-3.4, 34.4, -28.0, 10.0))
f.circle(c, R); f.seg(X_, Y, "key"); f.seg(A, B); f.seg(C, D)
f.point(X_, "X", at=160); f.point(Y, "Y", at=20); f.point(P, "P", at=-30); f.point(Q, "Q", at=-150)
for Z, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(Z, n, c)
f.length(P, Q, "27", 1); f.length(Q, Y, "y", 1, True); f.length(X_, P, "x", 1, True)
f.length(A, P, "6", 1); f.length(P, B, "5", 1); f.length(C, Q, "7", -1); f.length(Q, D, "12", -1)
keep(f)

# 2013 AMC 10A 23 (in its solution): the circle centered A through B meets BC again at X.
Bp = (0, 0); Cp = (61, 0); x = (86 ** 2 - 97 ** 2 + 61 ** 2) / (2 * 61); Ap = (x, math.sqrt(86 ** 2 - x * x)); Xp = (28, 0)
assert close(dist(Ap, Xp), 86, 1e-9) and close(dist(Ap, Cp), 97, 1e-9)
f = Fig("hidden-circle", "The circle centered A through B meets line BC again at X; C is outside it",
        "Dashed: $AX=86$, a second radius. The power of $C$ is $CA^2-AB^2=CX\\cdot CB$.",
        (-80, 112, -14, 180))
f.circle(Ap, 86); f.seg(Bp, Cp, "key"); f.seg(Ap, Bp); f.seg(Ap, Cp); f.seg(Ap, Xp, "aux")
f.point(Ap, "A", at=90); f.point(Bp, "B", at=200); f.point(Cp, "C", at=-20); f.point(Xp, "X", at=-90)
f.length(Ap, Bp, "86", -1); f.length(Ap, Cp, "97", 1); f.length(Cp, Xp, "33", 1); f.length(Xp, Bp, "28", 1)
keep(f)

# Example: right triangle ACB (right angle at C), AC = 6, BC = 8; the circle on diameter BC.
C, B, A = (0, 0), (8, 0), (0, 6); w = (4, 0); D = foot(C, A, B)
assert on_circle(w, 4, D) and close(dist(A, D) * dist(A, B), 36)
f = Fig("hidden-tangent", "Right triangle ABC with the circle on diameter BC, meeting AB again at D",
        "$AC\\perp BC$ at $C$, an endpoint of a diameter, so $AC$ is tangent to the circle and $AC^2=AD\\cdot AB$.",
        (-1.5, 9.0, -4.6, 7.0))
f.circle(w, 4); f.seg(A, B); f.seg(B, C); f.seg(C, A, "key"); f.seg(C, D, "aux"); f.right(C, A, B, 10); f.right(D, C, A, 9)
f.point(A, "A", at=135); f.point(B, "B", at=-30); f.point(C, "C", at=-135); f.point(D, "D", at=45); f.point(w, "", at=-90)
f.length(C, A, "6", 1); f.length(C, B, "8", -1)
keep(f)

# ---------------------------------------------------------------- close
f = Fig("converse", "Segments AB and CD crossing at P with PA times PB equal to PC times PD, and no circle drawn",
        "Equal products, no circle drawn. Chapter G2.3 proves that one always exists.",
        (-5.4, 4.8, -4.4, 4.2))
P = (0, 0); A = (-4.2, 1.2); B = (3.5, -1.0); C = (-1.2, 3.0); D = (1.0, -2.5)
D = mul(unit(D), dist(P, A) * dist(P, B) / dist(P, C))
assert close(dist(P, A) * dist(P, B), dist(P, C) * dist(P, D))
f.seg(A, B); f.seg(C, D)
for Z, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(Z, n, P)
f.point(P, "P", at=25)
keep(f)

# ---------------------------------------------------------------- challenge solutions
# 2001 AIME II 6: square ABCD (side 2) inscribed in the circle; square EFGH on CD, s = 2/5.
s = 0.4; O = (0, 0); R = math.sqrt(2)
A, B, C, D = (-1, 1), (1, 1), (1, -1), (-1, -1)
E_, F_, G, H = (-s / 2, -1), (s / 2, -1), (s / 2, -1 - s), (-s / 2, -1 - s); K = (s / 2, 1 + s)
assert on_circle(O, R, G) and on_circle(O, R, H) and on_circle(O, R, K)
assert close(dist(F_, G) * dist(F_, K), dist(F_, C) * dist(F_, D))
f = Fig("squares-in-circle", "Square ABCD inscribed in a circle, and the small square EFGH between side CD and the circle",
        "Dashed: the chord $GK$ through $F$, perpendicular to $CD$. The power of $F$: $FG\\cdot FK=FC\\cdot FD$.",
        (-1.62, 1.62, -1.62, 1.62), width=460)
f.circle(O, R); f.seg(A, B); f.seg(B, C); f.seg(C, D); f.seg(D, A)
f.poly([E_, F_, G, H], "ff"); f.seg(E_, H, "key"); f.seg(H, G, "key"); f.seg(G, F_, "key"); f.seg(F_, K, "aux")
for Z, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(Z, n, O)
f.point(E_, "E", at=135); f.point(F_, "F", at=30); f.point(G, "G", at=-30); f.point(H, "H", at=-150); f.point(K, "K", at=60)
f.length(F_, C, "1 − s/2", 1); f.length(F_, G, "s", -1, True); f.length(F_, K, "2 + s", -1, True)
keep(f)

# 2024 HMMT February Geometry 3: the chord AD of Omega (radius 123), cut by omega (radius 61) at B, C.
# Drawn with the chord vertical and O to its left, so the figure is wide rather than tall.
h = math.sqrt(123 ** 2 - 21 ** 2); O = (0, 0)
A, B, C, D = (h, 21), (h, 14), (h, 0), (h, -21); w = mul(B, 0.5)
assert close(dist(O, B), 122) and on_circle(w, 61, O) and on_circle(w, 61, B) and on_circle(w, 61, C)
f = Fig("two-circles-chord", "The chord AD of the large circle, cut by the small circle at B and C",
        "Parts of $\\Omega$ (radius $123$, center $O$) and of $\\omega$ (radius $61$, through $O$). $OC\\perp AD$, so $OB$ is a diameter of $\\omega$.",
        (-8, 131, -44, 44), width=460, crop=True)
f.circle(O, 123); f.circle(w, 61); f.seg(A, D, "key"); f.seg(O, C, "aux"); f.seg(O, B, "aux"); f.right(C, O, D, 9)
f.point(O, "O", at=180); f.point(A, "A", at=0); f.point(B, "B", at=0); f.point(C, "C", at=0); f.point(D, "D", at=0)
f.length(A, B, "k", 1, True); f.length(B, C, "2k", 1, True); f.length(C, D, "3k", 1, True)
f.tag(pt(w, deg(-60), 61), "ω", at=-150); f.tag(mul(deg(14), 123), "Ω", at=150)
keep(f)

# 2024 AIME I 5, as a schematic. To scale, D and E are 3 units apart beside lengths of 184 and the
# circle's radius of 95, and their labels cannot be told apart. So this figure keeps the
# configuration exact (A, D, H, G concyclic, the same two lines through E) with changed proportions
# (DE = 30, AD = 40), and says so. The solution's numbers are the problem's.
e, L, a = 30, 184, 40
g = (-a + math.sqrt(a * a + 4 * e * (e + L))) / 2          # g(g + a) = e(e + L): the power of E
D = (0, 0); A = (0, a); B = (107, a); C = (107, 0); E_ = (e, 0); F_ = (e + L, 0); G = (e + L, -g); H = (e, -g)
c = (e + L / 2, a / 2); R = math.sqrt(dot(sub(A, c), sub(A, c)))
D2 = (2 * e + L, 0); H2 = (e, a + g)                         # reflections of D and H in the center's lines
assert all(on_circle(c, R, Z, 1e-9) for Z in (A, D, H, G, D2, H2)) and close(e * (e + L), g * (g + a))
f = Fig("rectangles-circle", "Rectangles ABCD and EFGH with A, D, H and G on one circle (not to scale)",
        "Not to scale: the proportions are changed so that the points near $D$ can be told apart. The two lines through $E$: line $DF$ meets the circle at $D$ and $D'$, and the line through $E$ perpendicular to it at $H$ and $H'$.",
        (-c[0] + c[0] - R - 6, c[0] + R + 6, c[1] - R - 6, c[1] + R + 6), width=440)
f.circle(c, R); f.seg(A, B); f.seg(B, C); f.seg(D, A); f.seg(H, G); f.seg(G, F_)
f.seg(D, D2, "key"); f.seg(H, H2, "key2")
f.point(A, "A", at=150); f.point(B, "B", at=60); f.point(C, "C", at=-60); f.point(D, "D", at=180); f.point(E_, "E", at=-40)
f.point(F_, "F", at=-60); f.point(G, "G", at=-30); f.point(H, "H", at=-150); f.point(D2, "D′", at=0); f.point(H2, "H′", at=90)
keep(f)

# ---------------------------------------------------------------- practice and challenge solutions (2026-11-28)
# 2015 HMMT November General 4: perpendicular chords AB and CD through P; OMPN is a rectangle.
P = (0, 0); A, B = (-6, 0), (12, 0); C, D = (0, 4), (0, -18); M, N = (3, 0), (0, -7); O = (3, -7)
assert all(close(dist(O, Z) ** 2, 130) for Z in (A, B, C, D))
f = Fig("perpendicular-chords", "Perpendicular chords AB and CD meeting at P, with the perpendiculars from the center",
        "Dashed: $OM$ and $ON$, perpendicular to the chords at their midpoints, so $OMPN$ is a rectangle.",
        (-9.0, 15.2, -19.6, 5.2), width=440)
f.circle(O, math.sqrt(130)); f.seg(A, B); f.seg(C, D); f.seg(O, M, "aux"); f.seg(O, N, "aux")
f.right(P, B, C, 9); f.right(M, O, B, 8); f.right(N, O, C, 8); f.seg(O, A, "key")
for Z, n, at in ((A, "A", 180), (B, "B", 0), (C, "C", 90), (D, "D", -90)): f.point(Z, n, at=at)
f.point(P, "P", at=135); f.point(M, "M", at=60); f.point(N, "N", at=180); f.point(O, "O", at=-30)
f.length(A, P, "6", 1); f.length(P, M, "3", 1); f.length(M, B, "9", 1); f.length(P, C, "4", -1); f.length(N, D, "11", 1)
keep(f)

# 1992 AHSME 27: secants PBA and PCD at 60 degrees; BD is perpendicular to PA, so AD is a diameter.
P = (0, 0); B, A = (8, 0), (18, 0); u = deg(60); C, D = pt(P, u, 9), pt(P, u, 16)
c = mul(add(A, D), 0.5); R = dist(c, A)
assert close(R * R, 73) and on_circle(c, R, B) and on_circle(c, R, C) and close(dot(sub(D, B), sub(A, B)), 0)
f = Fig("secants-60", "Secants PBA and PCD meeting at 60 degrees; BD is perpendicular to PA",
        "$PB\\cdot PA=PC\\cdot PD$ gives $PC=9$ and $PD=16$. Dashed: $BD\\perp PA$, so $AD$ is a diameter.",
        (-1.6, 22.4, -2.2, 16.4), width=440)
f.circle(c, R); f.seg(P, A); f.seg(P, D); f.seg(B, D, "aux"); f.right(B, A, D, 9); f.seg(A, D, "key")
f.angle(P, A, D, 1, 26); f.angle_label(P, A, D, "60°", 26)
f.point(P, "P", at=200); f.point(A, "A", at=-20); f.point(B, "B", at=-90); f.point(C, "C", at=150); f.point(D, "D", at=100)
f.length(P, B, "8", -1); f.length(B, A, "10", -1); f.length(C, D, "7", 1)
keep(f)

# 2008 HMMT February Geometry 6: angle A = 45 degrees, so angle BOC = 90 degrees; P on BC.
R = 4 * math.sqrt(2); O = (0, 0); B, C = mul(deg(225), R), mul(deg(315), R); A = mul(deg(110), R); P = lerp(B, C, 3 / 8)
assert close(dist(B, C), 8) and close(dist(O, P) ** 2, 17)
f = Fig("circumcenter-power", "Triangle ABC in its circumcircle, with the central angle BOC and the point P on BC",
        "$\\angle BOC=2\\angle BAC=90^\\circ$, so $R=4\\sqrt2$; then $PB\\cdot PC=R^2-OP^2$.",
        (-6.6, 6.6, -6.6, 6.6), width=420)
f.circle(O, R); f.seg(A, B); f.seg(A, C); f.seg(B, C); f.seg(O, B, "aux"); f.seg(O, C, "aux"); f.right(O, B, C, 9); f.seg(O, P, "key")
f.angle(A, B, C, 1, 30); f.angle_label(A, B, C, "45°", 30)
f.point(A, "A", O); f.point(B, "B", O); f.point(C, "C", O); f.point(O, "O", at=90); f.point(P, "P", at=-90)
f.length(B, P, "3", -1); f.length(P, C, "5", -1)
keep(f)

# 2019 MBMT Upper Geometry 6: equilateral ABC; the circle through A tangent to BC at T.
s = 7 + 2 * math.sqrt(111) / 3; u_ = (s + 1) / 2
B, C, A = (0, 0), (s, 0), (s / 2, s * math.sqrt(3) / 2); T = (u_, 0)
k = ((u_ - s / 2) ** 2 + (s * math.sqrt(3) / 2) ** 2) / (s * math.sqrt(3)); w = (u_, k)
E_ = lerp(A, B, 10 / s); F_ = lerp(A, C, 11 / s)
assert on_circle(w, k, A) and on_circle(w, k, E_) and on_circle(w, k, F_) and on_circle(w, k, T)
f = Fig("equilateral-tangent", "Equilateral triangle ABC with a circle through A tangent to BC at T",
        "From $B$: $BT^2=BE\\cdot BA$. From $C$: $CT^2=CF\\cdot CA$. And $BT+CT=BC$.",
        (-1.4, s + 1.4, -1.6, s * math.sqrt(3) / 2 + 1.4), width=420)
f.circle(w, k); f.seg(A, B); f.seg(B, C); f.seg(C, A)
f.point(A, "A", at=90); f.point(B, "B", at=210); f.point(C, "C", at=-30); f.point(T, "T", at=-90)
f.point(E_, "E", at=160); f.point(F_, "F", at=20)
f.length(A, E_, "10", 1); f.length(F_, A, "11", 1)
keep(f)

# 2014 HMMT February Geometry 2: the circle through P tangent to the line at T; TT' is a diameter.
T = (0, 0); P = (5, 12); r = 169 / 24; T2 = (0, 2 * r); H = (0, 12); w = (0, r)
assert on_circle(w, r, P) and close(dist(P, T), 13)
f = Fig("tangent-line-circle", "The circle through P tangent to the line at T, with the diameter TT' and the altitude PH",
        "Dashed: the diameter $TT'$ and the altitude $PH$. $\\angle TPT'=90^\\circ$, so $PT^2=TH\\cdot TT'$.",
        (-9.6, 9.6, -1.6, 15.0), width=400)
f.circle(w, r); f.seg((-9.2, 0), (9.2, 0)); f.seg(T, T2, "aux"); f.seg(P, H, "aux"); f.seg(P, T, "key"); f.seg(P, T2)
f.right(H, P, T, 8); f.right(P, T, T2, 8); f.right(T, (9, 0), T2, 8)
f.point(T, "T", at=-120); f.point(T2, "T′", at=90); f.point(P, "P", at=0); f.point(H, "H", at=180)
f.length(T, P, "13", -1); f.length(T, H, "12", 1); f.tag((-8.6, 0), "ℓ", at=90)
keep(f)

# 2026 HMMT February Geometry 4: the circle centered T through A, X and Y is tangent to AB at A.
A, B, C = (0, 0), (6, 0), (0, 6 * math.sqrt(3)); l = 7 / math.sqrt(3); T = (0, l)
X_, Y = lerp(B, C, 4 / 12), lerp(B, C, 9 / 12)
assert all(close(dist(T, Z), l) for Z in (A, X_, Y))
f = Fig("right-triangle-circle", "Right triangle ABC with the circle centered T on AC through A, X and Y",
        "The circle centered $T$ through $A$ is tangent to $AB$ at $A$. Dashed: the radii $TX$ and $TY$.",
        (-4.6, 7.8, -1.6, 11.4), width=400)
f.circle(T, l); f.seg(A, B); f.seg(B, C); f.seg(C, A); f.seg(A, B, "key"); f.seg(T, X_, "aux"); f.seg(T, Y, "aux"); f.right(A, B, C, 9)
f.point(A, "A", at=225); f.point(B, "B", at=-30); f.point(C, "C", at=90); f.point(T, "T", at=180); f.point(X_, "X", at=30); f.point(Y, "Y", at=30)
f.length(B, X_, "4", 1); f.length(X_, Y, "5", 1); f.length(Y, C, "3", 1)
keep(f)

# 2019 Duke Math Meet Individual 8, as a schematic: to scale the circles are hundreds of times larger
# than the heights 12 and 3. Exact configuration with PQ = 16 instead of 420 (heights kept).
MP_ = 8; MB = MP_ / 2; B = (math.sqrt(MB * MB - 9), 3); A = mul(B, 4); M = (0, 0); P, Q = (-MP_, 0), (MP_, 0)
k1 = (dot(sub(B, P), sub(B, P))) / 6; k2 = (dot(sub(B, Q), sub(B, Q))) / 6
w1, w2 = (P[0], k1), (Q[0], k2)
assert on_circle(w1, k1, A) and on_circle(w1, k1, B) and on_circle(w2, k2, A) and on_circle(w2, k2, B)
f = Fig("two-tangent-circles", "Two circles through A and B tangent to the x-axis at P and Q; line AB meets the axis at M",
        "Not to scale: here $PQ=16$, not $420$, so that both circles fit. $MP^2=MA\\cdot MB=MQ^2$, so $M$ is the midpoint of $PQ$.",
        (-30, 30, -4, 42), width=440)
f.circle(w1, k1); f.circle(w2, k2); f.seg((-29, 0), (29, 0)); f.seg(M, mul(A, 1.08), "key")
f.point(A, "A", at=0); f.point(B, "B", at=-10); f.point(M, "M", at=-90); f.point(P, "P", at=-90); f.point(Q, "Q", at=-90)
f.tag((-29, 0), "x", at=90)
keep(f)

# 2023 AIME II 9: two circles through P and Q, common tangent AB, and the parallel XY through P.
h = math.sqrt(15); P, X_, Y = (0, 0), (-10, 0), (14, 0); A, B = (-5, h), (7, h); M = (1, h)
c1 = (h * h - 25) / (2 * h); c2 = (h * h - 49) / (2 * h); w1, w2 = (-5, c1), (7, c2); r1, r2 = h - c1, h - c2
Q = add(M, mul(unit(sub(P, M)), 9))
assert all(on_circle(w1, r1, Z) for Z in (P, X_, A, Q)) and all(on_circle(w2, r2, Z) for Z in (P, Y, B, Q))
f = Fig("two-circles-trapezoid", "Circles through P and Q with common tangent AB and the parallel line XY through P",
        "Line $PQ$ meets $AB$ at its midpoint $M$. $A$ and $B$ lie above the midpoints of $PX$ and $PY$.",
        (-12, 16.4, -13.6, 5.6), width=440)
f.poly([X_, A, B, Y], "ff"); f.circle(w1, r1); f.circle(w2, r2); f.seg((-11, h), (15, h), "key"); f.seg(X_, Y)
f.seg(Q, M, "aux"); f.seg(A, (-5, 0), "aux"); f.seg(B, (7, 0), "aux")
f.point(A, "A", at=110); f.point(B, "B", at=70); f.point(M, "M", at=90); f.point(P, "P", at=-45); f.point(Q, "Q", at=-90)
f.point(X_, "X", at=200); f.point(Y, "Y", at=-20)
keep(f)

# 2022 AIME I 11: the parallelogram, its circle tangent to DA, AB and BC, and the diagonal AC.
r = 3 * math.sqrt(3); O = (0, 0); A, B, C = (-6, r), (-4.5, -r), (20, -r); D = add(A, sub(C, B))
K, M = (0, r), (0, -r); L = pt(A, unit(sub(B, A)), 6)
ts = line_circle(A, unit(sub(C, A)), O, r); P, Q = pt(A, unit(sub(C, A)), ts[0]), pt(A, unit(sub(C, A)), ts[1])
assert on_circle(O, r, L) and close(dist(B, L), 4.5) and close(ts[0], 3) and close(ts[1], 12) and close(dist(A, C), 28)
f = Fig("parallelogram-circle", "Parallelogram ABCD with the circle tangent to DA, AB and BC, cut by the diagonal AC at P and Q",
        "The tangency points $K$, $L$, $M$; $KM$ is a diameter, so the height of the parallelogram is $2r$.",
        (-8, 21.5, -7.6, 7.6), width=460)
f.circle(O, r); f.seg(A, B); f.seg(B, C); f.seg(C, D); f.seg(D, A); f.seg(A, C, "key"); f.seg(K, M, "aux")
f.point(A, "A", at=135); f.point(B, "B", at=225); f.point(C, "C", at=-30); f.point(D, "D", at=30)
f.point(K, "K", at=90); f.point(L, "L", at=180); f.point(M, "M", at=-90); f.point(P, "P", at=45); f.point(Q, "Q", at=-110)
f.length(A, P, "3", 1); f.length(P, Q, "9", -1); f.length(Q, C, "16", 1)
keep(f)

js = ("// Generated by tools/curriculum/figures/g2_02.py from exact coordinates; do not edit by hand.\n"
      "window.MATH_CURRICULUM_FIGURES = window.MATH_CURRICULUM_FIGURES || {};\n"
      f"window.MATH_CURRICULUM_FIGURES[\"geometry-2/G2.2\"] = {json.dumps(FIGS, ensure_ascii=False, indent=1)};\n")
if "--check" in sys.argv:
    ok = OUT.exists() and OUT.read_text(encoding="utf-8") == js
    print("figures", "up to date" if ok else "STALE"); sys.exit(0 if ok else 1)
OUT.write_text(js, encoding="utf-8"); print(len(FIGS), "figures written; opening chords", CHORDS)
