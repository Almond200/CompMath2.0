#!/usr/bin/env python3
"""Geometry check for every diagram panel: nothing may fall off the canvas, and no two
text labels may overlap.

This exists because neither of the two checks the process already had could see the class of
bug it catches. `scan-conventions.py` asks whether a card *has* a diagram, not whether the
diagram is legible, and `tidyDiagram` only de-collides labels at render time. So a derived
point that lands outside the viewBox -- the external bisector foot at x = -406, the reflected
focus at y = 368 on a 330-tall canvas -- drew nothing and passed every gate silently.

Run:  python3 tools/check-diagrams.py     (exit 1 on any finding)
"""
import itertools, os, re, subprocess, sys, tempfile

JSC = os.environ.get("JSC", "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ["js/data/diagrams/geometry-diagrams.js", "js/data/diagrams/general-diagrams.js",
         "js/data/diagrams/problem-diagrams.js"]
# A file built on another file's helpers (window.GEO_KIT) loads that file first; only its own
# registry is checked, so the helper file's figures are not counted twice.
NEEDS = {"js/data/diagrams/problem-diagrams.js": "js/data/diagrams/geometry-diagrams.js"}

# Character-width factors for the sans stack, calibrated against getBBox() in the browser:
# "tangent at a" and "a - b" both measure ~0.47 x font-size per character. Two factors,
# because the two checks want to err in opposite directions -- a generous estimate turns a
# label that actually fits into a false alarm, while a tight one lets a near-collision pass.
CW_FIT = 0.50      # off-canvas: tight, so only a genuine overflow is reported
CW_HIT = 0.58      # overlap: generous, so near-misses still surface

# A drawn circle overflowing by up to this fraction of its own radius is a near-miss worth
# fixing; beyond it the circle is plainly larger than the frame on purpose. Today's data splits
# cleanly either side: the three real bugs are at 4%, 17% and 23%, the deliberate arc at 90%.
CIRCLE_SLICE = 0.25


def dump(rel):
    """Render every panel in one diagram file to SVG text via jsc."""
    # Three registries, one set of rules: the figures at the top of a card, an example's own
    # figures ({q, s}), and the figures placed inside a write-up at a {{figure:name}} marker.
    # The last two are newer, and a figure nobody checks is exactly how off-canvas points and
    # sliced circles used to ship.
    pre = ('load(%r);\nwindow.MATH_DIAGRAMS = {}; window.MATH_EXAMPLE_DIAGRAMS = {}; window.MATH_BODY_DIAGRAMS = {};\n'
           % os.path.join(ROOT, NEEDS[rel])) if rel in NEEDS else ''
    src = ('var window = {};\n' + pre + 'load(%r);\n'
           'function out(name, p) { if (typeof p === "string") { print("###" + name); print(p); } }\n'
           'var D = window.MATH_DIAGRAMS || {};\n'
           'Object.keys(D).forEach(function (k) {\n'
           '  var v = D[k]; if (!Array.isArray(v)) v = [v];\n'
           '  v.forEach(function (p, i) { out(k + "#" + i, p); });\n});\n'
           'var X = window.MATH_EXAMPLE_DIAGRAMS || {};\n'
           'Object.keys(X).forEach(function (k) { ["q", "s"].forEach(function (w) {\n'
           '  if (X[k][w]) out("example:" + k + "#" + w, X[k][w]); }); });\n'
           'var B = window.MATH_BODY_DIAGRAMS || {};\n'
           'Object.keys(B).forEach(function (k) { Object.keys(B[k]).forEach(function (n) {\n'
           '  out("body:" + k + "/" + n, B[k][n]); }); });\n'
           'var P = window.MATH_PROBLEM_DIAGRAMS || {};\n'
           'Object.keys(P).forEach(function (k) { out("problem:" + k, P[k]); });\n' % os.path.join(ROOT, rel))
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as fh:
        fh.write(src)
        tmp = fh.name
    try:
        res = subprocess.run([JSC, tmp], cwd=ROOT, capture_output=True, text=True)
    finally:
        os.unlink(tmp)
    # A diagram file that throws used to look exactly like a file with no diagrams in it:
    # stdout came back empty, this returned it, and the run reported OK on a smaller panel
    # count. One undefined colour constant silently removed all 27 figures in
    # general-diagrams.js from the app and every gate still passed. Never swallow it again.
    if res.returncode != 0 or res.stderr.strip():
        sys.exit("check-diagrams: %s failed to evaluate -- every figure in it is missing "
                 "from the app.\n%s" % (rel, res.stderr.strip()))
    return res.stdout


def boxes(svg, cw):
    """Bounding box per text label, honouring text-anchor (start/middle/end)."""
    out = []
    for m in re.finditer(r'<text x="(-?[\d.]+)" y="(-?[\d.]+)"[^>]*font-size="([\d.]+)"'
                         r'[^>]*text-anchor="(\w+)"[^>]*>(.*?)</text>', svg):
        x, y, fs, anchor = float(m.group(1)), float(m.group(2)), float(m.group(3)), m.group(4)
        label = re.sub(r"<[^>]+>", "", m.group(5))
        w = max(len(label), 1) * fs * cw
        x0 = x - w / 2 if anchor == "middle" else (x - w if anchor == "end" else x)
        out.append((label, x0, y - fs * 0.82, x0 + w, y + fs * 0.28))
    return out


def dupe_keys(rel):
    """Two `DIAGRAMS["id"] = ...` assignments for one id means the earlier one is dead code.
    Six keys had drifted into this state, and for median-to-hypotenuse the *discarded* copy was
    the correct one -- the surviving copy was the one whose circumcircle did not fit."""
    src = open(os.path.join(ROOT, rel), encoding="utf-8").read()
    seen, dupes = {}, []
    for m in re.finditer(r'^\s*DIAGRAMS\["([\w-]+)"\]\s*=', src, re.M):
        key = m.group(1)
        line = src.count("\n", 0, m.start()) + 1
        if key in seen:
            dupes.append("%s: DIAGRAMS[%r] is assigned twice (lines %d and %d) -- "
                         "the first is dead code" % (rel, key, seen[key], line))
        else:
            seen[key] = line
    return dupes



# Lines run to where they meet (CONVENTIONS, "Lines in figures run to where they meet"): a drawn
# line whose extension passes through a marker dot, with the dot a little way past its end and no
# collinear segment (such as the dashed continuation drawn by segIn) reaching it, stops short of a
# point that lies on it -- the Iran Lemma figure's bisector did. Panels read and kept on purpose:
LINE_GAP_ALLOW = {
    "angle-bisector-theorem#1",   # D lies on BC, which is drawn in full; the hit is the gold ray's direction
    "extend-sides-to-meet#1",     # the dotted diagonal ends at its vertex; B is on another line
    "reims-theorem#0",            # Q sits 5px from B on a different line
    # Coincidental collinearity, read on the contact sheets (2026-10-12): a vertex or center that
    # happens to lie on the extension of an unrelated segment.
    "chord-length#1", "sphere-formulas#0", "conic-sections#0", "cross-section-method#1",
    "extend-sides-to-meet#0", "hyperbola-properties#0", "parallel-line-similarity#0",
    "parallel-exterior-angles#0", "body:angle-bisector-theorem/reflect",
    "body:perp-to-angle-bisector/external", "brocards-theorem#0",
    "plane-cross-section#0",      # the hidden cube edge from the origin, extended backward, passes R on screen only
}
LINE_GAP = 4

def line_gaps(svg):
    lines = [tuple(map(float, m.groups())) for m in re.finditer(
        r'<line x1="(-?[\d.]+)" y1="(-?[\d.]+)" x2="(-?[\d.]+)" y2="(-?[\d.]+)"[^>]*stroke-width="([\d.]+)"', svg)]
    dots = [tuple(map(float, m.groups())) for m in re.finditer(
        r'<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)" fill="(?!none)[^"]*"/>', svg)]
    dots = [d for d in dots if d[2] <= 6]
    out = []
    for x1, y1, x2, y2, w in lines:
        L = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        if L < 25 or w < 1.3:
            continue
        ux, uy = (x2 - x1) / L, (y2 - y1) / L
        for cx, cy, _ in dots:
            t = (cx - x1) * ux + (cy - y1) * uy
            if abs((cx - x1) * uy - (cy - y1) * ux) > 1.5:
                continue
            beyond = -t if t < 0 else t - L
            if not (LINE_GAP < beyond < 2.0 * L):
                continue
            covered = False
            for a1, b1, a2, b2, _w in lines:
                if abs((a1 - x1) * uy - (b1 - y1) * ux) > 1.5 or abs((a2 - x1) * uy - (b2 - y1) * ux) > 1.5:
                    continue
                t1, t2 = (a1 - x1) * ux + (b1 - y1) * uy, (a2 - x1) * ux + (b2 - y1) * uy
                if min(t1, t2) - LINE_GAP <= t <= max(t1, t2) + LINE_GAP:
                    covered = True
                    break
            if not covered:
                out.append("a line stops %.0fpx short of the point (%.0f, %.0f) that lies on it" % (beyond, cx, cy))
    return out

def main():
    findings, panels = [], 0
    for rel in FILES:
        if os.path.exists(os.path.join(ROOT, rel)):
            findings.extend(dupe_keys(rel))
    for rel in FILES:
        if not os.path.exists(os.path.join(ROOT, rel)):
            continue
        for blk in re.split(r"###", dump(rel))[1:]:
            name, _, svg = blk.partition("\n")
            vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
            if not vb:
                continue
            panels += 1
            W, H = float(vb.group(1)), float(vb.group(2))
            for label, x0, y0, x1, y1 in boxes(svg, CW_FIT):
                if x0 < -1 or x1 > W + 1 or y0 < -1 or y1 > H + 1:
                    findings.append("%s: label %r at x[%.0f,%.0f] y[%.0f,%.0f] "
                                    "falls outside the %gx%g canvas" % (name, label, x0, x1, y0, y1, W, H))
            # A marker dot off the canvas means a *derived* point landed off it, which is
            # the real defect -- everything anchored to that point is invisible too.
            # Long lines are exempt: drawing a line past the frame is how an unbounded line
            # is rendered, and clipping it there is the intent.
            for m in re.finditer(r'<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"', svg):
                cx, cy, r = map(float, m.groups())
                # Test the CENTRE, not the centre plus a radius of slack. The old bound
                # `cy > H + r` let a dot sit a full radius past the edge, so a marker centred
                # at y = 342 on a 340-tall canvas -- entirely invisible -- passed the gate.
                # If the derived point is outside the viewBox the point is off-canvas, full
                # stop; a dot merely touching the edge is still legible and is not the defect
                # this is looking for.
                if r <= 8 and (cx < 0 or cx > W or cy < 0 or cy > H):
                    findings.append("%s: marker dot at (%.0f, %.0f) is off the %gx%g canvas"
                                    % (name, cx, cy, W, H))
                # A DRAWN circle (circumcircle, incircle) that misses fitting by a little is a
                # bug: it gets sliced flat by the frame and reads as a rendering fault. One that
                # is far bigger than the canvas is a deliberate arc -- four circumcircles of four
                # triangles really are huge -- so it is exempt for the same reason long lines are.
                # The r <= 8 branch above only ever saw marker dots, which is how a radius-166
                # circumcircle clipped at BOTH ends sat in median-to-hypotenuse without tripping
                # a single gate.
                elif r > 8:
                    out = max(-(cx - r), (cx + r) - W, -(cy - r), (cy + r) - H)
                    if 1 < out <= r * CIRCLE_SLICE:
                        findings.append("%s: circle r=%.0f at (%.0f, %.0f) overshoots the %gx%g "
                                        "canvas by %.0fpx (%.0f%% of r) -- it will be clipped flat"
                                        % (name, r, cx, cy, W, H, out, 100 * out / r))
            # Labels and captions are plain text, not TeX: a raw "d_b" or "e^(iθ)" shows its
            # underscore or caret to the reader. Subscripts go in a <tspan> (subT) inside the
            # figure, and <sub>/<sup> in the caption.
            shown = re.findall(r"<text[^>]*>(.*?)</text>", svg, re.S) + re.findall(r'<div class="diagram-cap">(.*?)</div>', svg, re.S)
            for t in shown:
                t = re.sub(r"<[^>]+>", "", t)
                m = re.search(r"\S_\S|\S\^[\w({]", t)
                if m:
                    findings.append("%s: raw TeX markup %r in the text %r" % (name, m.group(0), t[:60]))
            if name.strip() not in LINE_GAP_ALLOW:
                findings.extend("%s: %s" % (name, g) for g in line_gaps(svg))
            for (s1, a1, b1, c1, d1), (s2, a2, b2, c2, d2) in itertools.combinations(boxes(svg, CW_HIT), 2):
                if a1 < c2 and a2 < c1 and b1 < d2 and b2 < d1:
                    findings.append("%s: labels %r and %r overlap by %.0fx%.0f px"
                                    % (name, s1, s2, min(c1, c2) - max(a1, a2), min(d1, d2) - max(b1, b2)))

    for f in findings:
        print("  " + f)
    print("panels: %d | findings: %d" % (panels, len(findings)))
    print("OK - every panel fits its canvas and no labels collide" if not findings
          else "FAIL - see above")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
