#!/usr/bin/env python3
"""Figures for geometry-2/G2.3 (Cyclic Quadrilaterals I), drawn with figlib from exact coordinates.
Each figure asserts the relation it illustrates. Output: js/data/curriculum/geometry-2/g2.03-figures.js.

usage: python3 tools/curriculum/figures/g2_03.py [--check]
"""
import json, math, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from figlib import *  # noqa: F401,F403

KEY = "geometry-2/G2.3"
OUT = Path(__file__).resolve().parents[3] / "js/data/curriculum/geometry-2/g2.03-figures.js"
FIGS = {}
def keep(f): FIGS[f.name] = f.svg()
def close(a, b, tol=1e-7): return abs(a - b) < tol
def angle_at(v, a, b): return math.degrees(math.acos(dot(unit(sub(a, v)), unit(sub(b, v)))))
def circum(a, b, c):
    d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]))
    ux = ((a[0]**2 + a[1]**2) * (b[1] - c[1]) + (b[0]**2 + b[1]**2) * (c[1] - a[1]) + (c[0]**2 + c[1]**2) * (a[1] - b[1])) / d
    uy = ((a[0]**2 + a[1]**2) * (c[0] - b[0]) + (b[0]**2 + b[1]**2) * (a[0] - c[0]) + (c[0]**2 + c[1]**2) * (b[0] - a[0])) / d
    return (ux, uy), dist((ux, uy), a)

# Three points and the two perpendicular bisectors meeting at the circumcenter.
A, B, C = (-4.2, -1.6), (3.6, -2.4), (1.2, 3.4)
O, R = circum(A, B, C)
mAB, mBC = lerp(A, B, .5), lerp(B, C, .5)
assert close(dist(O, A), dist(O, C))
f = Fig("three-points", "Three points and the perpendicular bisectors of two of the segments, meeting at the center of the circle",
        "Dashed: the perpendicular bisectors of $AB$ and $BC$. Their common point $O$ is equally far from $A$, $B$ and $C$.",
        (-5.8, 5.8, -5.4, 5.8), width=420)
f.circle(O, R); f.seg(A, B); f.seg(B, C)
for m_, (p, q) in ((mAB, (A, B)), (mBC, (B, C))):
    u = unit(perp(sub(q, p))); f.seg(pt(m_, u, -2.6), pt(m_, u, 4.6) if m_ == mAB else pt(m_, u, 4.2), "aux")
    f.right(m_, q, pt(m_, u, 1), 8)
f.point(A, "A", O); f.point(B, "B", O); f.point(C, "C", O); f.point(O, "O", at=200)
keep(f)

# A right angle at C on AB puts C on the circle with diameter AB; D likewise.
A, B = (-4, 0), (4, 0); M = (0, 0); C = mul(deg(118), 4); D = mul(deg(-50), 4)
assert close(angle_at(C, A, B), 90) and close(angle_at(D, A, B), 90)
f = Fig("right-angle", "Two right angles standing on the segment AB, with both vertices on the circle with diameter AB",
        "$\\angle ACB=\\angle ADB=90^\\circ$, so $C$ and $D$ are on the circle with diameter $AB$ and center $M$. Dashed: $MC=MA=MB$.",
        (-4.9, 4.9, -4.9, 4.9), width=380)
f.circle(M, 4); f.seg(A, B, "key"); f.seg(A, C); f.seg(C, B); f.seg(A, D); f.seg(D, B); f.seg(M, C, "aux")
f.right(C, A, B, 9); f.right(D, A, B, 9)
f.point(A, "A", at=180); f.point(B, "B", at=0); f.point(C, "C", M); f.point(D, "D", M); f.point(M, "M", at=-90)
keep(f)

# Opposite angles: the two angles stand on the two arcs BD that make up the circle.
O = (0, 0); r = 4; A, B, C, D = mul(deg(200), r), mul(deg(275), r), mul(deg(10), r), mul(deg(115), r)
assert close(angle_at(A, B, D) + angle_at(C, B, D), 180)
f = Fig("opposite", "A cyclic quadrilateral ABCD; the angles at A and C stand on the two arcs BD",
        "$\\angle A$ stands on arc $BCD$ and $\\angle C$ on arc $DAB$; together the arcs are the whole circle, so $\\angle A+\\angle C=180^\\circ$.",
        (-4.9, 4.9, -4.9, 4.9), width=380)
f.circle(O, r); f.seg(A, B); f.seg(B, C); f.seg(C, D); f.seg(D, A); f.seg(B, D, "aux")
f.angle(A, B, D, 1, 30); f.angle(C, B, D, 2, 26, "key2")
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.point(X_, n, O)
keep(f)

# The equal-angle test: D inside the circle through A, B, C sees AB under a larger angle than D'.
O = (0, 0); r = 4; A, B, C = mul(deg(210), r), mul(deg(330), r), mul(deg(70), r)
D2 = mul(deg(115), r); D = lerp(A, D2, 0.7)
assert angle_at(D, A, B) > angle_at(D2, A, B) and close(angle_at(D2, A, B), angle_at(C, A, B))
f = Fig("equal-angle-test", "If D were inside the circle through A, B and C, it would see AB under a larger angle than the point D' of the circle",
        "$D$ inside the circle: $\\angle ADB$ is an exterior angle of triangle $DD'B$, so it is larger than $\\angle AD'B=\\angle ACB$.",
        (-4.9, 4.9, -4.9, 4.9), width=380)
f.circle(O, r); f.seg(A, B); f.seg(C, A); f.seg(C, B); f.seg(A, D2, "aux"); f.seg(D2, B, "aux"); f.seg(D, B, "key")
f.angle(C, A, B, 1, 26); f.angle(D2, A, B, 1, 26); f.angle(D, A, B, 2, 22, "key")
f.point(A, "A", O); f.point(B, "B", O); f.point(C, "C", O); f.point(D2, "D′", O); f.point(D, "D", at=-20)
keep(f)

# The altitudes: B, C, E, F on the circle with diameter BC; A, E, H, F on the circle with diameter AH.
A, B, C = (0.8, 5.2), (-3.6, 0), (4.4, 0)
E = foot(B, A, C); F = foot(C, A, B); H = (A[0], (A[0] - B[0]) * (C[0] - A[0]) / A[1])
assert close(dot(sub(H, B), sub(C, A)), 0) and close(dot(sub(H, C), sub(B, A)), 0)
w1, r1 = mul(add(B, C), .5), dist(B, C) / 2; w2, r2 = mul(add(A, H), .5), dist(A, H) / 2
assert on_circle(w1, r1, E) and on_circle(w1, r1, F) and on_circle(w2, r2, E) and on_circle(w2, r2, F)
f = Fig("altitudes", "Triangle ABC with altitudes BE and CF meeting at H, and the two circles through the feet",
        "Dashed: the circle on diameter $BC$ (through $E$ and $F$) and the circle on diameter $AH$ (through $E$ and $F$).",
        (-4.6, 5.4, -4.4, 6.0), width=400)
f.seg(A, B); f.seg(B, C); f.seg(C, A); f.seg(B, E, "key"); f.seg(C, F, "key")
f.circle(w1, r1, "aux"); f.circle(w2, r2, "aux"); f.right(E, B, C, 8); f.right(F, C, B, 8)
f.point(A, "A", at=90); f.point(B, "B", at=200); f.point(C, "C", at=-20); f.point(E, "E", at=40); f.point(F, "F", at=150); f.point(H, "H", at=-90)
keep(f)

# Brahmagupta: perpendicular diagonals; the perpendicular from P to BC bisects AD.
P = (0, 0); A, C = (-3.0, 0), (5.0, 0); B, D = (0, -2.6), (0, 3.0 * 5.0 / 2.6)
O, R = circum(A, B, C)
assert on_circle(O, R, D, 1e-9)
K = foot(P, B, C); u = unit(sub(P, K)); t = (lambda: None)
# the line from K through P meets AD at M
den = (u[0] * (D[1] - A[1]) - u[1] * (D[0] - A[0]))
s_ = ((A[0] - P[0]) * (D[1] - A[1]) - (A[1] - P[1]) * (D[0] - A[0])) / den
M = pt(P, u, s_)
assert close(dist(M, A), dist(M, D)) and close(dist(M, A) + dist(M, D), dist(A, D))
f = Fig("brahmagupta", "A cyclic quadrilateral with perpendicular diagonals; the perpendicular from P to BC passes through the midpoint M of AD",
        "$AC\\perp BD$ at $P$. The line through $P$ perpendicular to $BC$ meets $AD$ at its midpoint $M$; $MA=MP=MD$.",
        (-4.4, 6.6, -3.6, 7.2), width=380)
f.circle(O, R); f.seg(A, C); f.seg(B, D); f.seg(A, B); f.seg(B, C); f.seg(C, D); f.seg(D, A)
f.seg(K, M, "key"); f.right(P, C, D, 8); f.right(K, C, P, 8); f.ticks(A, M, 1, "key"); f.ticks(M, D, 1, "key")
f.point(A, "A", at=180); f.point(B, "B", at=-90); f.point(C, "C", at=0); f.point(D, "D", at=90)
f.point(P, "P", at=-135); f.point(K, "K", at=-30); f.point(M, "M", at=150)
keep(f)

js = ("// Generated by tools/curriculum/figures/g2_03.py from exact coordinates; do not edit by hand.\n"
      "window.MATH_CURRICULUM_FIGURES = window.MATH_CURRICULUM_FIGURES || {};\n"
      f"window.MATH_CURRICULUM_FIGURES[\"{KEY}\"] = {json.dumps(FIGS, ensure_ascii=False, indent=1)};\n")
if "--check" in sys.argv:
    ok = OUT.exists() and OUT.read_text(encoding="utf-8") == js
    print("figures", "up to date" if ok else "STALE"); sys.exit(0 if ok else 1)
OUT.write_text(js, encoding="utf-8"); print(len(FIGS), "figures written")
