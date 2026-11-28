"""Shared drawing library for the new curriculum's figures (curriculum/AUTHORING-STANDARD.md §9).

Every figure is computed from exact coordinates, never sketched, and follows one visual standard:

- Roles. `given` (solid, the text's colour) is what the problem states; `aux` (dashed, muted) is a
  construction the solution adds; `key` (the book's colour, heavier) is the relationship the figure
  is about; `key2` (a second colour) is its partner, such as the second of two similar triangles.
  Fills `ff` and `ff2` shade the two partners.
- Labels. Points are italic capitals; lengths and angle values are upright. A label is never placed
  by hand: `point`, `length` and `angle_label` give a preferred side, and the layout tries nearby
  positions until the label's box is clear of every other label, dot, line and arc, and inside the
  drawing. A figure whose labels cannot all be placed fails to build.
- Size. Figures are at most 460 units wide, with point labels at 24 units and lengths at 20, so on
  a 375 px phone (about 330 px of figure) a point label is about 17 px and a length about 14 px.
- Marks. Equal angles carry the same number of arcs; a right angle is a square; equal lengths carry
  the same number of ticks.
"""
import math

EPS = 1e-9
W = 460
POINT_SIZE, LENGTH_SIZE = 24, 20

def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def mul(a, k): return (a[0] * k, a[1] * k)
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def norm(a): return math.hypot(*a)
def unit(a): n = norm(a); return (a[0] / n, a[1] / n)
def dist(a, b): return norm(sub(a, b))
def perp(a): return (-a[1], a[0])
def lerp(a, b, t): return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
def deg(a): return (math.cos(math.radians(a)), math.sin(math.radians(a)))
def on_circle(c, r, p, tol=1e-7): return abs(dist(c, p) - r) < tol
def line_circle(p, u, c, r):
    """Parameters t with |p + t u - c| = r, for a unit vector u; sorted ascending."""
    w = sub(p, c); b = 2 * dot(w, u); cc = dot(w, w) - r * r
    disc = b * b - 4 * cc
    assert disc >= -1e-9, "line misses the circle"
    s = math.sqrt(max(disc, 0)); return sorted([(-b - s) / 2, (-b + s) / 2])
def pt(p, u, t): return (p[0] + u[0] * t, p[1] + u[1] * t)
def foot(p, a, b):
    u = unit(sub(b, a)); return pt(a, u, dot(sub(p, a), u))
def circle_circle(c1, r1, c2, r2):
    d = dist(c1, c2); a = (r1 * r1 - r2 * r2 + d * d) / (2 * d); h = math.sqrt(max(r1 * r1 - a * a, 0))
    u = unit(sub(c2, c1)); m = pt(c1, u, a); v = perp(u)
    return pt(m, v, h), pt(m, v, -h)

def text_width(t, size):
    """Approximate rendered width of a label, in figure units."""
    w = 0
    for ch in t:
        if ch in "ilI1.,:;|'′ ": w += 0.32
        elif ch in "√·×−=+": w += 0.62
        elif ch in "MWmw": w += 0.86
        else: w += 0.6
    return w * size

class Fig:
    def __init__(self, name, title, caption, box, width=W, pad=24):
        """box = (xmin, xmax, ymin, ymax) in the figure's own coordinates."""
        self.name, self.title, self.caption = name, title, caption
        xmin, xmax, ymin, ymax = box
        self.s = (width - 2 * pad) / (xmax - xmin)
        self.w = width; self.h = round((ymax - ymin) * self.s + 2 * pad)
        self.ox = pad - xmin * self.s; self.oy = pad + ymax * self.s
        self.parts, self.fills, self.labels = [], [], []
        self.segs, self.arcs, self.dots, self.boxes = [], [], [], []
        self.pending = []

    # ---- coordinates ----
    def X(self, p): return (self.ox + p[0] * self.s, self.oy - p[1] * self.s)
    @staticmethod
    def f(v): return f"{v:.2f}".rstrip("0").rstrip(".")

    # ---- drawing ----
    STYLE = {
        "given": 'stroke="currentColor" stroke-width="1.6"',
        "aux": 'stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" class="fx"',
        "key": 'stroke="currentColor" stroke-width="2.4" class="fa"',
        "key2": 'stroke="currentColor" stroke-width="2.4" class="fb"',
    }
    def seg(self, a, b, role="given"):
        (x1, y1), (x2, y2) = self.X(a), self.X(b)
        self.parts.append(f'<path d="M{self.f(x1)} {self.f(y1)}L{self.f(x2)} {self.f(y2)}" fill="none" {self.STYLE[role]}/>')
        self.segs.append(((x1, y1), (x2, y2)))
    def circle(self, c, r, role="given"):
        x, y = self.X(c)
        self.parts.append(f'<circle cx="{self.f(x)}" cy="{self.f(y)}" r="{self.f(r * self.s)}" fill="none" {self.STYLE[role]}/>')
        self.arcs.append(((x, y), r * self.s, 0, 2 * math.pi))
    def poly(self, pts, fill="ff"):
        d = "M" + "L".join(f"{self.f(x)} {self.f(y)}" for x, y in map(self.X, pts)) + "Z"
        self.fills.append(f'<path d="{d}" stroke="none" class="{fill}"/>')
    def dot(self, p, r=3.4):
        x, y = self.X(p)
        self.parts.append(f'<circle cx="{self.f(x)}" cy="{self.f(y)}" r="{r}" fill="currentColor" stroke="none"/>')
        self.dots.append((x, y, r))
    def _angles(self, v, a, b):
        t1 = math.atan2(a[1] - v[1], a[0] - v[0]); t2 = math.atan2(b[1] - v[1], b[0] - v[0])
        d = (t2 - t1) % (2 * math.pi)
        if d > math.pi: t1, d = t2, 2 * math.pi - d
        return t1, d
    def angle(self, v, a, b, n=1, r=26, role="key"):
        """Mark the (smaller) angle a-v-b with n arcs of radius r (in svg units)."""
        t1, d = self._angles(v, a, b); vx, vy = self.X(v)
        for k in range(n):
            rr = r + 5 * k
            pts = [(vx + rr * math.cos(t1 + d * i / 24), vy - rr * math.sin(t1 + d * i / 24)) for i in range(25)]
            cls = {"key": ' class="fa"', "key2": ' class="fb"'}.get(role, "")
            self.parts.append(f'<path d="M{"L".join(f"{self.f(x)} {self.f(y)}" for x, y in pts)}" fill="none" stroke="currentColor" stroke-width="1.6"{cls}/>')
            self.arcs.append(((vx, vy), rr, t1, d))
    def angle_label(self, v, a, b, text, r=26, n=1):
        t1, d = self._angles(v, a, b); mid = t1 + d / 2
        self.pending.append(("angle", (v, mid, r + 5 * (n - 1)), text, LENGTH_SIZE, False))
    def right(self, v, a, b, size=11):
        ua = unit(sub(a, v)); ub = unit(sub(b, v)); k = size / self.s
        p1 = pt(v, ua, k); p2 = pt(p1, ub, k); p3 = pt(v, ub, k)
        d = "M" + "L".join(f"{self.f(x)} {self.f(y)}" for x, y in map(self.X, [p1, p2, p3]))
        self.parts.append(f'<path d="{d}" fill="none" stroke="currentColor" stroke-width="1.3"/>')
        for q, r_ in ((p1, p2), (p2, p3)): self.segs.append((self.X(q), self.X(r_)))
    def ticks(self, a, b, n=1, role="given"):
        m = lerp(a, b, 0.5); u = unit(sub(b, a)); v = perp(u); h = 6 / self.s; g = 4 / self.s
        for k in range(n):
            c = pt(m, u, (k - (n - 1) / 2) * g)
            self.seg(pt(c, v, -h), pt(c, v, h), role)
    def free(self, x, y, text, size=LENGTH_SIZE, anchor="middle"):
        """Fixed text at svg coordinates (a legend line); still checked for collisions."""
        w = text_width(text, size); x0 = x - w / 2 if anchor == "middle" else x
        self.boxes.append((x0, y - size * 0.78, x0 + w, y + size * 0.22))
        self.labels.append(f'<text x="{self.f(x)}" y="{self.f(y)}" font-size="{size}" text-anchor="{anchor}">{text}</text>')

    # ---- labels ----
    def point(self, p, name, toward=None, at=None):
        """Dot and label a point. The label prefers the direction away from `toward`, or the angle `at`."""
        self.dot(p)
        if not name: return
        if at is not None: pref = math.radians(at)
        elif toward is not None and dist(p, toward) > EPS:
            u = unit(sub(p, toward)); pref = math.atan2(u[1], u[0])
        else: pref = math.pi / 2
        self.pending.append(("point", (p, pref), name, POINT_SIZE, True))
    def tag(self, p, text, toward=None, at=None):
        """A label for a point that is already drawn (no dot)."""
        pref = math.radians(at) if at is not None else (math.atan2(*reversed(unit(sub(p, toward)))) if toward is not None else math.pi / 2)
        self.pending.append(("point", (p, pref), text, POINT_SIZE, True))
    def length(self, a, b, text, side=1, italic=False):
        """Label the segment ab at its middle, preferring the side `side` (+1 left of a->b)."""
        self.pending.append(("length", (a, b, side), text, LENGTH_SIZE, italic))

    def _box_free(self, box, ignore_dots=()):
        x0, y0, x1, y1 = box
        if x0 < 2 or y0 < 2 or x1 > self.w - 2 or y1 > self.h - 2: return False
        m = 2.5
        for b in self.boxes:
            if x0 < b[2] + m and x1 > b[0] - m and y0 < b[3] + m and y1 > b[1] - m: return False
        for (x, y, r) in self.dots:
            cx = min(max(x, x0), x1); cy = min(max(y, y0), y1)
            if math.hypot(x - cx, y - cy) < r + 3: return False
        def inside(px, py): return x0 - 2 <= px <= x1 + 2 and y0 - 2 <= py <= y1 + 2
        for (p, q) in self.segs:
            n = max(8, int(math.hypot(q[0] - p[0], q[1] - p[1]) / 3))
            for i in range(n + 1):
                t = i / n
                if inside(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t): return False
        for (c, r, t1, d) in self.arcs:
            n = max(12, int(r * d / 3))
            for i in range(n + 1):
                a = t1 + d * i / n
                if inside(c[0] + r * math.cos(a), c[1] - r * math.sin(a)): return False
        return True
    def _place(self, kind, geo, text, size):
        w = text_width(text, size); h = size * 0.86
        def box_at(cx, cy): return (cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2)
        cands = []
        if kind in ("point", "angle"):
            if kind == "point":
                p, pref = geo; px, py = self.X(p); radii = (8, 13, 19, 26)
            else:
                v, pref, r = geo; px, py = self.X(v); radii = (r + 9, r + 15, r + 22)
            offsets = [0]
            for k in range(1, 9): offsets += [k * math.pi / 8, -k * math.pi / 8]
            for rad in radii:
                for o in offsets:
                    a = pref + o; ux, uy = math.cos(a), -math.sin(a)
                    # push the box so its nearest edge, not its centre, is `rad` from the point
                    cx = px + ux * (rad + abs(ux) * w / 2); cy = py + uy * (rad + abs(uy) * h / 2)
                    cands.append(box_at(cx, cy))
        else:
            a, b, side = geo; (ax, ay), (bx, by) = self.X(a), self.X(b)
            L = math.hypot(bx - ax, by - ay); ux, uy = (bx - ax) / L, (by - ay) / L
            nx, ny = uy, -ux  # svg y is down: this is "left" of a->b in figure coordinates
            for s_ in (side, -side):
                for off in (7, 11, 16, 22):
                    for along in (0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.15, 0.85, -0.1, 1.1):
                        mx, my = ax + (bx - ax) * along, ay + (by - ay) * along
                        cx = mx + s_ * nx * (off + abs(nx) * w / 2 + abs(ny) * h / 2)
                        cy = my + s_ * ny * (off + abs(nx) * w / 2 + abs(ny) * h / 2)
                        cands.append(box_at(cx, cy))
        for bx_ in cands:
            if self._box_free(bx_): return bx_
        raise AssertionError(f"{self.name}: no clear place for label {text!r}")
    def svg(self):
        lab = []
        for kind, geo, text, size, italic in self.pending:
            b = self._place(kind, geo, text, size)
            self.boxes.append(b)
            cx = (b[0] + b[2]) / 2; base = b[3] - size * 0.2
            style = ' font-style="italic"' if italic else ''
            lab.append(f'<text x="{self.f(cx)}" y="{self.f(base)}" font-size="{size}"{style} text-anchor="middle">{text}</text>')
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" role="img" aria-label="{self.title}">'
               f'<title>{self.title}</title>{"".join(self.fills)}{"".join(self.parts)}'
               f'<g fill="currentColor" font-family="inherit" class="fl">{"".join(lab + self.labels)}</g></svg>')
        return {"svg": svg, "caption": self.caption}
