#!/usr/bin/env python3
"""Figures for geometry-2/G2.2 (Power of a Point), drawn from exact coordinates.

Every figure is computed, not sketched: points are solved from the stated lengths, and each
figure asserts the relation it illustrates (equal products, tangency, collinearity) before it is
written. Output: js/data/curriculum/geometry-2/g2.02-figures.js (window.MATH_CURRICULUM_FIGURES).
Colours: strokes use currentColor; .fa (accent stroke) and .ff (accent fill) follow the theme.

usage: python3 tools/curriculum/figures/g2_02.py [--check]
"""
import math, json, sys
from pathlib import Path

OUT = Path(__file__).resolve().parents[3] / "js/data/curriculum/geometry-2/g2.02-figures.js"
EPS = 1e-9

class Fig:
    def __init__(self, name, title, w, h, scale, ox, oy):
        self.name, self.title, self.w, self.h, self.s, self.ox, self.oy = name, title, w, h, scale, ox, oy
        self.parts, self.labels, self.cap = [], [], ""
    def X(self, p): return (round(self.ox + p[0] * self.s, 2), round(self.oy - p[1] * self.s, 2))
    def circle(self, c, r, cls=""):
        x, y = self.X(c); self.parts.append(f'<circle cx="{x}" cy="{y}" r="{round(r*self.s,2)}" fill="none" stroke="currentColor" stroke-width="1.4" {cls}/>')
    def seg(self, a, b, cls="", dash=False, w=1.6):
        (x1, y1), (x2, y2) = self.X(a), self.X(b)
        self.parts.append(f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="currentColor" stroke-width="{w}"{" stroke-dasharray=\"5 4\"" if dash else ""} {cls}/>')
    def poly(self, pts, cls='class="ff"'):
        d = "M" + "L".join(f"{x} {y}" for x, y in map(self.X, pts)) + "Z"
        self.parts.append(f'<path d="{d}" stroke="none" {cls}/>')
    def dot(self, p, r=3.2):
        x, y = self.X(p); self.parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="currentColor"/>')
    def arcmark(self, v, a, b, r=0.55, cls='class="fa"', n=1):
        """Mark the angle at v between rays to a and b (the smaller one)."""
        t1, t2 = math.atan2(a[1]-v[1], a[0]-v[0]), math.atan2(b[1]-v[1], b[0]-v[0])
        d = (t2 - t1) % (2*math.pi)
        if d > math.pi: t1, t2, d = t2, t1, 2*math.pi - d
        for k in range(n):
            rr = r + 0.09*k
            pts = [self.X((v[0]+rr*math.cos(t1+d*i/24), v[1]+rr*math.sin(t1+d*i/24))) for i in range(25)]
            self.parts.append(f'<path d="M{"L".join(f"{x} {y}" for x,y in pts)}" fill="none" stroke="currentColor" stroke-width="1.6" {cls}/>')
    def right(self, v, a, b, size=0.35):
        ua = unit(sub(a, v)); ub = unit(sub(b, v))
        p1 = add(v, mul(ua, size)); p2 = add(p1, mul(ub, size)); p3 = add(v, mul(ub, size))
        self.parts.append(f'<path d="M{"L".join(f"{x} {y}" for x,y in map(self.X,[p1,p2,p3]))}" fill="none" stroke="currentColor" stroke-width="1.2"/>')
    def label(self, p, text, away=None, dist=0.42, size=18, italic=True, cls=""):
        """Place text at p, pushed `dist` (figure units) away from point `away` (or up)."""
        if away is not None:
            u = unit(sub(p, away)) if math.hypot(*sub(p, away)) > EPS else (0, 1)
            q = add(p, mul(u, dist))
        else: q = p
        x, y = self.X(q)
        self.labels.append((x, y + size*0.35, text, size, italic, cls))
    def text(self, x, y, text, size=14, anchor="middle"):
        self.labels.append((x, y, text, size, False, f'text-anchor="{anchor}"'))
    def svg(self):
        lab = []
        for x, y, t, size, it, cls in self.labels:
            anchor = '' if 'text-anchor' in cls else 'text-anchor="middle"'
            style = ' font-style="italic"' if it else ''
            lab.append(f'<text x="{round(x,2)}" y="{round(y,2)}" font-size="{size}"{style} {anchor} {cls}>{t}</text>')
        h = self.h - 30 if self.cap else self.h   # the caption is HTML, below the drawing
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {h}" role="img" aria-label="{self.title}">'
               f'<title>{self.title}</title>{"".join(self.parts)}<g fill="currentColor" font-family="inherit">{"".join(lab)}</g></svg>')
        return {"svg": svg, "caption": self.cap}

def sub(a, b): return (a[0]-b[0], a[1]-b[1])
def add(a, b): return (a[0]+b[0], a[1]+b[1])
def mul(a, k): return (a[0]*k, a[1]*k)
def unit(a): n = math.hypot(*a); return (a[0]/n, a[1]/n)
def dist(a, b): return math.hypot(a[0]-b[0], a[1]-b[1])
def on_circle(c, r, p): return abs(dist(c, p) - r) < 1e-7
def line_circle(p, u, c, r):
    """Parameters t with |p + t u - c| = r, u a unit vector; sorted."""
    w = sub(p, c); b = 2*(w[0]*u[0]+w[1]*u[1]); cc = w[0]**2+w[1]**2-r*r
    disc = b*b - 4*cc
    assert disc >= -1e-12
    s = math.sqrt(max(disc, 0)); return sorted([(-b-s)/2, (-b+s)/2])
def pt(p, u, t): return (p[0]+u[0]*t, p[1]+u[1]*t)
def deg(a): return (math.cos(math.radians(a)), math.sin(math.radians(a)))

FIGS = {}
def keep(f): FIGS[f.name] = f.svg()

# ---- opening: four chords through P, every product 21 (r = 5, OP = 2) ----
O = (0, 0); r = 5; P = (2, 0)
f = Fig("chords-table", "Four chords through the same point P; the two pieces of each multiply to 21", 560, 420, 34, 230, 205)
f.circle(O, r); f.dot(O); f.label(O, "O", (0.5, 1), 0.38)
rows = []
for cos_t, sgn in ((1, 1), (0.625, 1), (0.3125, 1), (0, 1)):
    th = math.acos(cos_t); u = (math.cos(th), math.sin(th))
    t0, t1 = line_circle(P, u, O, r)
    A, B = pt(P, u, t0), pt(P, u, t1)
    a, b = -t0, t1
    assert abs(a*b - 21) < 1e-9, (a, b)
    rows.append((a, b))
    f.seg(A, B, 'class="fa"' if cos_t == 1 else "")
    f.dot(A, 2.6); f.dot(B, 2.6)
f.dot(P); f.label(P, "P", (1.4, 1.0), 0.5)
# piece labels on the diameter
f.label((-1.5, 0), "7", (-1.5, 1), 0.32, 15, False); f.label((3.5, 0), "3", (3.5, 1), 0.32, 15, False)
f.text(470, 120, "pieces through P", 14); f.text(470, 150, "3 × 7 = 21", 15); f.text(470, 176, "3.5 × 6 = 21", 15)
f.text(470, 202, "4 × 5.25 = 21", 15); f.text(470, 228, "√21 × √21 = 21", 15)
f.cap = "Radius 5, OP = 2: every chord through P is cut into pieces with product 21."
keep(f)
OPEN_ROWS = rows

# ---- G2.2.1: inscribed angles on the same arc, and the central angle ----
f = Fig("same-arc", "Two inscribed angles on the same arc AB are equal; each is half the central angle AOB", 560, 380, 32, 280, 190)
O = (0, 0); r = 5
A, B = (5*math.cos(math.radians(-150)), 5*math.sin(math.radians(-150))), (5*math.cos(math.radians(-30)), 5*math.sin(math.radians(-30)))
C, D = (5*math.cos(math.radians(70)), 5*math.sin(math.radians(70))), (5*math.cos(math.radians(130)), 5*math.sin(math.radians(130)))
f.circle(O, r)
for X in (C, D):
    f.seg(X, A); f.seg(X, B)
f.seg(O, A, dash=True); f.seg(O, B, dash=True)
f.arcmark(C, A, B, 0.9); f.arcmark(D, A, B, 0.9); f.arcmark(O, A, B, 0.6, 'class="fa"', 2)
for X, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.dot(X); f.label(X, n, O, 0.45)
f.dot(O); f.label(O, "O", (0, -1), 0.5)
f.cap = "∠ACB = ∠ADB = ½ ∠AOB, because C and D lie on the same side of chord AB."
keep(f)

# ---- G2.2.2: crossing chords and the two similar triangles ----
f = Fig("crossing-chords", "Chords AB and CD cross at P; triangles PAC and PDB are similar", 560, 420, 34, 270, 190)
O = (0, 0); r = 5; P = (1.2, -0.8)
uA = unit((-1, 0.25)); uC = unit((-0.45, -1))
tA = line_circle(P, uA, O, r); tC = line_circle(P, uC, O, r)
A, B = pt(P, uA, tA[1]), pt(P, uA, tA[0])
C, D = pt(P, uC, tC[1]), pt(P, uC, tC[0])
assert abs(dist(P, A)*dist(P, B) - dist(P, C)*dist(P, D)) < 1e-9
f.circle(O, r); f.poly([P, A, C]); f.poly([P, D, B], 'class="ff ff2"')
f.seg(A, B); f.seg(C, D); f.seg(A, C, 'class="fa"'); f.seg(D, B, 'class="fa"')
f.arcmark(A, C, B, 0.7); f.arcmark(D, B, C, 0.7)
f.arcmark(C, A, D, 0.6, 'class="fa"', 2); f.arcmark(B, D, A, 0.6, 'class="fa"', 2)
for X, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.dot(X); f.label(X, n, O, 0.45)
f.dot(P); f.label(P, "P", (P[0]+0.3, P[1]+1), 0.5)
f.cap = "∠CAB = ∠CDB (both on arc CB) and ∠ACD = ∠ABD (both on arc AD)."
keep(f)

# ---- G2.2.2 worked example: a chord through a point on a diameter ----
f = Fig("diameter-point", "Through P, the diameter is cut into r − d and r + d; the shortest chord is perpendicular to OP", 560, 400, 13, 270, 190)
O = (0, 0); r = 13; d = 5; P = (d, 0)
f.circle(O, r); f.seg((-r, 0), (r, 0), 'class="fa"'); f.seg((d, -12), (d, 12))
f.right(P, (r, 0), (d, 12), 0.9)
f.dot(O); f.dot(P); f.dot((-r, 0)); f.dot((r, 0)); f.dot((d, 12)); f.dot((d, -12))
f.label(O, "O", (0, -1), 1.3); f.label(P, "P", (7, -2), 1.5)
f.label((-r, 0), "E", (0, 0), 1.2); f.label((r, 0), "F", (0, 0), 1.2)
f.label((d, 12), "G", (d, 0), 1.3); f.label((d, -12), "H", (d, 0), 1.3)
f.label((-6.5, 0), "PE = r + d = 18", (-6.5, 1), 1.1, 14, False); f.label((9, 0), "PF = 8", (9, 1), 1.1, 14, False)
f.label((d, 6), "12", (0, 6), 1.3, 14, False); f.label((d, -6), "12", (0, -6), 1.3, 14, False)
assert abs(12*12 - (r-d)*(r+d)) < EPS
f.cap = "r = 13, d = OP = 5: PE · PF = 18 · 8 = 144 = PG · PH = 12 · 12."
keep(f)

# ---- G2.2.3: a secant turning into a tangent ----
f = Fig("secant-to-tangent", "As the secant from P turns, its two intersection points close up into the point of tangency", 560, 380, 30, 200, 190)
O = (0, 0); r = 4; P = (9.5, 0); T_len = math.sqrt(9.5**2 - 16)
ang_t = math.asin(r / 9.5)
for frac, cls in ((0.35, ""), (0.7, ""), (1.0, 'class="fa"')):
    a = math.pi - ang_t*frac
    u = (math.cos(a), math.sin(a))
    ts = line_circle(P, u, O, r)
    if frac < 1:
        A, B = pt(P, u, ts[0]), pt(P, u, ts[1])
        f.seg(P, B, cls); f.dot(A, 2.6); f.dot(B, 2.6)
        assert abs(ts[0]*ts[1] - (9.5**2 - 16)) < 1e-9
    else:
        T = pt(P, u, ts[0]); f.seg(P, T, cls); f.dot(T); f.label(T, "T", O, 0.5)
        f.seg(O, T, dash=True); f.right(T, O, P, 0.4)
f.circle(O, r); f.dot(O); f.label(O, "O", (1, 1), 0.6); f.dot(P); f.label(P, "P", (0, 0), 0.55)
f.cap = "The product PA · PB stays at OP² − r² = 74.25; at the tangent it becomes PT²."
keep(f)

# ---- G2.2.3 proof: the perpendicular from the center ----
f = Fig("center-perpendicular", "Drop the perpendicular OM to the secant; M is the midpoint of AB", 560, 380, 30, 190, 210)
O = (0, 0); r = 4; P = (10, 0)
u = unit((-1, 0.22)); ts = line_circle(P, u, O, r)
A, B = pt(P, u, ts[0]), pt(P, u, ts[1])
M = pt(P, u, (ts[0]+ts[1])/2)
T = (r*r/10, math.sqrt(r*r - (r*r/10)**2))
f.circle(O, r); f.seg(P, B); f.seg(O, M, dash=True); f.right(M, O, P, 0.35)
f.seg(O, P, dash=True); f.seg(O, A, 'class="fa"'); f.seg(P, (T[0], -T[1]), 'class="fa"'); f.seg(O, (T[0], -T[1]), dash=True)
f.right((T[0], -T[1]), O, P, 0.35)
for X, n, aw in ((A, "A", O), (B, "B", O), (M, "M", (M[0]-0.3, M[1]-2)), (P, "P", (0, 0)), (O, "O", (1, 0)), ((T[0], -T[1]), "T", O)):
    f.dot(X); f.label(X, n, aw, 0.48)
assert abs(dist(P, A)*dist(P, B) - (100 - 16)) < 1e-9 and abs(dist(P, (T[0], -T[1]))**2 - 84) < 1e-9
f.cap = "PA · PB = PM² − MA² = (OP² − OM²) − (r² − OM²) = OP² − r² = PT²."
keep(f)

# ---- G2.2.4: two secants from an outside point ----
f = Fig("two-secants", "Secants PAB and PCD from an outside point; triangles PAD and PCB are similar", 560, 400, 30, 180, 200)
O = (0, 0); r = 4.2; P = (10, 0.6)
u1 = unit((-1, 0.33)); u2 = unit((-1, -0.28))
t1 = line_circle(P, u1, O, r); t2 = line_circle(P, u2, O, r)
A, B = pt(P, u1, t1[0]), pt(P, u1, t1[1]); C, D = pt(P, u2, t2[0]), pt(P, u2, t2[1])
assert abs(dist(P, A)*dist(P, B) - dist(P, C)*dist(P, D)) < 1e-9
f.circle(O, r); f.poly([P, A, D]); f.poly([P, C, B], 'class="ff ff2"')
f.seg(P, B); f.seg(P, D); f.seg(A, D, 'class="fa"'); f.seg(C, B, 'class="fa"')
f.arcmark(D, A, P, 0.75); f.arcmark(B, C, P, 0.75)
for X, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.dot(X); f.label(X, n, O, 0.48)
f.dot(P); f.label(P, "P", (0, 0), 0.55)
f.cap = "∠ADC = ∠ABC (both on arc AC), and the angle at P is shared."
keep(f)

# ---- G2.2.5: the line through the center, inside and outside ----
f = Fig("power-cases", "On the line through the center, the pieces from P are OP − r and OP + r (outside) or r − OP and r + OP (inside)", 560, 300, 24, 110, 140)
for cx, Pp, lab in ((0, (2.2, 0), "inside: PA · PB = r² − OP²"), (10, (16.2, 0), "outside: PA · PB = OP² − r²")):
    Oc = (cx, 0); f.circle(Oc, 3.6); f.seg((cx-3.6, 0), (max(cx+3.6, Pp[0]), 0)); f.dot(Oc); f.dot(Pp)
    f.dot((cx-3.6, 0), 2.6); f.dot((cx+3.6, 0), 2.6)
    f.label(Oc, "O", (cx, -1), 0.5); f.label(Pp, "P", (Pp[0], -1), 0.5)
    f.label((cx-3.6, 0), "A", (cx, 0), 0.5); f.label((cx+3.6, 0), "B", (cx, 0), 0.5)
    f.text(110 + cx*24 + (60 if cx else 0), 280, lab, 14)
keep(f)

# ---- G2.2.6: two points on one line (the two-equation configuration) ----
f2 = Fig("two-points", "Line XY crosses chords AB and CD at P and Q; each of P and Q gives one equation", 560, 262, 1, 0, 0)
f2.parts.append('<path d="M40 110L520 110" fill="none" stroke="currentColor" stroke-width="1.6"/>')
for x, n in ((40, "X"), (90, "P"), (430, "Q"), (520, "Y")):
    f2.parts.append(f'<circle cx="{x}" cy="110" r="3.2" fill="currentColor"/>'); f2.text(x, 92, n, 16)
f2.parts.append('<path d="M60 40L130 190" fill="none" stroke="currentColor" stroke-width="1.6" class="fa"/><path d="M400 190L470 40" fill="none" stroke="currentColor" stroke-width="1.6" class="fa"/>')
for x, y, n in ((60, 40, "A"), (130, 190, "B"), (400, 190, "C"), (470, 40, "D")): f2.text(x, y - 8 if y < 100 else y + 20, n, 16)
f2.text(65, 132, "x", 14); f2.text(260, 132, "27", 14); f2.text(475, 132, "y", 14)
f2.cap = "P: x(27 + y) = PA · PB.   Q: y(27 + x) = QC · QD.   (Schematic, not to scale.)"
FIGS[f2.name] = f2.svg()

# ---- G2.2.6 hidden circle: circle centered A through B, and the line BC ----
# a triangle with AB = 86, AC = 97, BC = 61, BX = 28, CX = 33
Bp = (0, 0); Cp = (61, 0)
# A from AB=86, AC=97
x = (86**2 - 97**2 + 61**2) / (2*61); y = math.sqrt(86**2 - x*x)
Ap = (x, y)
Xp = (28, 0)
assert abs(dist(Ap, Xp) - 86) < 1e-9 and abs(dist(Ap, Cp) - 97) < 1e-9
f = Fig("hidden-circle", "The circle centered A through B meets line BC again at X; C is outside it", 560, 340, 1.3, 200, 280)
f.circle(Ap, 86); f.seg(Bp, Cp, 'class="fa"'); f.seg(Ap, Bp); f.seg(Ap, Cp); f.seg(Ap, Xp, dash=True)
for X_, n, aw in ((Ap, "A", (Ap[0]+30, -50)), (Bp, "B", (Bp[0]+5, 30)), (Cp, "C", (Cp[0]-5, 30)), (Xp, "X", (Xp[0], 30))):
    f.dot(X_); f.label(X_, n, aw, 13)
f.label((Ap[0]/2, Ap[1]/2), "86", (Ap[0], 0), 12, 14, False); f.label(((Ap[0]+61)/2, Ap[1]/2), "97", (Ap[0], 0), 12, 14, False)
f.cap = "Power of C: CX · CB = CA² − AB² = 97² − 86² = 2013."
keep(f)

# ---- close: the converse question ----
f = Fig("converse", "If PA · PB = PC · PD, must A, B, C and D lie on one circle?", 560, 320, 26, 280, 140)
P = (0, 0); A = (-4.2, 1.2); B = (3.5, -1.0); C = (-1.2, 3.0); D = (1.0, -2.5)
# make PA*PB = PC*PD exactly by scaling D along PD
pa, pb, pc = dist(P, A), dist(P, B), dist(P, C)
D = mul(unit(D), pa*pb/pc)
assert abs(dist(P, A)*dist(P, B) - dist(P, C)*dist(P, D)) < 1e-9
f.seg(A, B); f.seg(C, D)
for X_, n in ((A, "A"), (B, "B"), (C, "C"), (D, "D")): f.dot(X_); f.label(X_, n, P, 0.45)
f.dot(P); f.label(P, "P", (1, 1.2), 0.45)
f.cap = "Equal products, no circle drawn: Chapter G2.3 proves that one always exists."
keep(f)

js = ("// Generated by tools/curriculum/figures/g2_02.py from exact coordinates; do not edit by hand.\n"
      "window.MATH_CURRICULUM_FIGURES = window.MATH_CURRICULUM_FIGURES || {};\n"
      f"window.MATH_CURRICULUM_FIGURES[\"geometry-2/G2.2\"] = {json.dumps(FIGS, ensure_ascii=False, indent=1)};\n")
if "--check" in sys.argv:
    ok = OUT.exists() and OUT.read_text(encoding="utf-8") == js
    print("figures", "up to date" if ok else "STALE"); sys.exit(0 if ok else 1)
OUT.write_text(js, encoding="utf-8"); print(len(FIGS), "figures written; opening rows", [tuple(round(v, 4) for v in r) for r in OPEN_ROWS])
