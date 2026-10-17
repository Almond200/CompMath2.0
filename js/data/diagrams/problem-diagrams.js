// Figures drawn for problems whose statement prints none, keyed by problem slug
// ("1983-aime-4"). The problem page shows the figure under the statement, labelled as drawn
// for the app. Built with the geometry helpers (window.GEO_KIT, from geometry-diagrams.js,
// which loads first), every point constructed from the problem's own numbers, and each figure
// carries an `ok` self-check that prints MISMATCH in its caption when a number is wrong.
(function () {
  const PROB = window.MATH_PROBLEM_DIAGRAMS = window.MATH_PROBLEM_DIAGRAMS || {};
  const K = window.GEO_KIT;
  if (!K) return;
  const { add, sub, mul, lerp, mid, dist, norm, perp, away, rad, onC, lineInt, foot, circleLineInts,
    FNT, DIM, ACC, GLD, GRN, PUR, ORG, ACCS, GLDS, seg, dot, circ, pline, poly, txt, gapLabel,
    angleArc, rightAngle, ticksOn, segIn, subT, cap, wrap } = K;
  const MM = ok => ok ? "" : " MISMATCH";

  // ---- 3D: which edges of a polyhedron the viewer cannot see ----------------------------------
  // V: named 3D points, faces: lists of names (planar polygons), view: a direction pointing from
  // the solid toward the viewer (parallel projection). An edge is hidden when the ray from its
  // midpoint toward the viewer passes through a face the edge is not on.
  const v3 = { sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]] };
  function hiddenEdge(V, faces, view, e) {
    const M = [0, 1, 2].map(i => (V[e[0]][i] + V[e[1]][i]) / 2);
    return faces.some(f => {
      if (f.includes(e[0]) && f.includes(e[1])) return false;
      const P = f.map(n => V[n]), nrm = v3.cross(v3.sub(P[1], P[0]), v3.sub(P[2], P[0]));
      const den = v3.dot(nrm, view);
      if (Math.abs(den) < 1e-12) return false;
      const t = v3.dot(nrm, v3.sub(P[0], M)) / den;
      if (t < 1e-6) return false;
      const X = M.map((m, i) => m + t * view[i]);
      const drop = [0, 1, 2].reduce((b, i) => Math.abs(nrm[i]) > Math.abs(nrm[b]) ? i : b, 0);
      const k2 = q => [0, 1, 2].filter(i => i !== drop).map(i => q[i]);
      const pt = k2(X), pg = P.map(k2);
      let inside = false;
      for (let i = 0, j = pg.length - 1; i < pg.length; j = i++)
        if ((pg[i][1] > pt[1]) !== (pg[j][1] > pt[1]) && pt[0] < (pg[j][0] - pg[i][0]) * (pt[1] - pg[i][1]) / (pg[j][1] - pg[i][1]) + pg[i][0]) inside = !inside;
      return inside;
    });
  }
  // Every edge of the faces, drawn solid or dashed by hiddenEdge; Pj projects a 3D point.
  function solidEdges(V, faces, view, Pj, c = DIM, w = 2) {
    const seen = new Set(), out = [];
    faces.forEach(f => f.forEach((n, i) => {
      const m = f[(i + 1) % f.length], key = [n, m].sort().join("|");
      if (seen.has(key)) return; seen.add(key);
      out.push(seg(Pj(V[n]), Pj(V[m]), c, w, hiddenEdge(V, faces, view, [n, m]) ? "5 4" : ""));
    }));
    return out;
  }
  // A parallel projection from two screen axes for x and y and a vertical z, with the direction
  // toward the viewer that goes with it (perpendicular to both screen directions, from above).
  function projector(O, k, ex, ey) {
    const Pj = q => [O[0] + k * (ex[0] * q[0] + ey[0] * q[1]), O[1] + k * (ex[1] * q[0] + ey[1] * q[1] - q[2])];
    let view = v3.cross([ex[0], ey[0], 0], [ex[1], ey[1], -1]);
    if (view[2] < 0) view = view.map(x => -x);
    return { Pj, view };
  }

  // The outline of a sphere under a parallel projection Pj: the image of a ball is an ellipse,
  // with shape matrix M Mᵀ for the linear part M of Pj. Returned as a closed list of points.
  function sphereOutline(Pj, c, r, n = 72) {
    const o = Pj([0, 0, 0]), M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(e => sub(Pj(e), o));
    const a = M.reduce((t, m) => t + m[0] * m[0], 0), b = M.reduce((t, m) => t + m[0] * m[1], 0), d = M.reduce((t, m) => t + m[1] * m[1], 0);
    const tr = (a + d) / 2, q = Math.sqrt(((a - d) / 2) ** 2 + b * b), l1 = tr + q, l2 = tr - q;
    const th = Math.abs(b) < 1e-12 ? (a >= d ? 0 : Math.PI / 2) : Math.atan2(l1 - a, b);
    const C = Pj(c), u = [Math.cos(th), Math.sin(th)], v = [-u[1], u[0]];
    return Array.from({ length: n + 1 }, (_, i) => { const t = 2 * Math.PI * i / n;
      return add(C, add(mul(u, r * Math.sqrt(l1) * Math.cos(t)), mul(v, r * Math.sqrt(l2) * Math.sin(t)))); });
  }

  const ell = (c, rx, ry, col = FNT, w = 1.5, dash = "") =>
    `<ellipse cx="${c[0]}" cy="${c[1]}" rx="${rx}" ry="${ry}" fill="none" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

  // 2026 AIME I #3: the vertical cross-section through both centers. The radius-42 sphere is
  // drawn at the edge of the region, touching the dome; nothing past the setup is labelled.
  PROB["2026-aime-i-3"] = (() => {
    const k = 0.95, O = [215, 232], P = (x, y) => [O[0] + k * x, O[1] - k * y];
    const cx = Math.sqrt(158 * 158 - 42 * 42), S = P(cx, 42), T = P(cx * 200 / 158, 42 * 200 / 158);
    const ok = Math.abs(dist(O, T) - 200 * k) < 1e-9 && Math.abs(dist(S, T) - 42 * k) < 1e-9;
    return wrap(430, 262, [
      `<path d="M ${P(-200, 0).join(",")} A ${200 * k} ${200 * k} 0 0 1 ${P(200, 0).join(",")}" fill="${ACCS}" stroke="${ACC}" stroke-width="2"/>`,
      seg(P(-215, 0), P(215, 0), DIM, 2),
      circ(S, 42 * k, GLD, 2, GLDS), dot(S, GLD, 3.5), dot(O, DIM, 4), dot(P(cx, 0), GLD, 3.5),
      seg(O, P(-200 * Math.cos(rad(40)), 200 * Math.sin(rad(40))), DIM, 1.4, "5 4"),
      txt(add(mid(O, P(-200 * Math.cos(rad(40)), 200 * Math.sin(rad(40)))), [-10, -8]), "200", DIM, 13),
      seg(S, P(cx, 0), GLD, 1.4, "4 3"), txt(add(mid(S, P(cx, 0)), [-14, 4]), "42", GLD, 13),
      txt(add(P(cx, 0), [0, 18]), "P", GLD, 13), txt(add(O, [0, 18]), "O", DIM, 13),
      cap(430, 262, "The cross-section through the center O of the disk and the center of the small sphere: the hemisphere becomes a semicircle of radius 200, and the sphere of radius 42, resting on the disk above P, becomes a circle tangent to the base line. Drawn here at the farthest P, where it also touches the dome." + MM(ok))
    ]);
  })();

  // 1983 AIME #12: diameter AB, the perpendicular chord CD, and the right triangle O-H-C.
  PROB["1983-aime-12"] = (() => {
    const k = 4, O = [215, 160], R = 32.5 * k, H = [O[0] + 16.5 * k, O[1]];
    const C = [H[0], O[1] - 28 * k], D = [H[0], O[1] + 28 * k], A = [O[0] - R, O[1]], B = [O[0] + R, O[1]];
    const ok = Math.abs(dist(O, C) - R) < 1e-9 && Math.abs(dist(O, D) - R) < 1e-9;
    return wrap(430, 320, [
      circ(O, R, FNT, 1.6), seg(A, B, DIM, 2), seg(C, D, DIM, 2),
      poly([O, H, C], GLD, 1.8, GLDS), rightAngle(H, O, C, 10, GLD),
      ...[A, B, C, D, H, O].map(p => dot(p, DIM, 3.8)),
      txt(add(A, [-14, 5]), "A"), txt(add(B, [14, 5]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [0, 20]), "D"),
      txt(add(H, [12, 18]), "H"), txt(add(O, [-4, 18]), "O"),
      cap(430, 320, "AB is a diameter and CD a chord perpendicular to it at H. The radius OC, the half-chord HC and the distance OH make a right triangle (gold)." + MM(ok))
    ]);
  })();

  // 1985 AIME #2: the same right triangle (legs a and b) spun about each leg in turn.
  PROB["1985-aime-2"] = (() => {
    const k = 5.6, a = 24, b = 10, ry = 0.24;
    const A1 = [92, 40], B1 = [92, 40 + a * k], E1 = [92 + b * k, 40 + a * k];
    const A2 = [300, B1[1] - b * k], B2 = [300, B1[1]], E2 = [300 + a * k, B1[1]];
    const ok = Math.abs(dist(A1, E1) - dist(A2, E2)) < 1e-9;
    return wrap(450, 236, [
      ell(B1, b * k, b * k * ry), seg(A1, [B1[0] - b * k, B1[1]], DIM, 2), seg(A1, E1, DIM, 2),
      poly([A1, B1, E1], ACC, 2, ACCS), rightAngle(B1, A1, E1, 9, ACC),
      txt(add(mid(A1, B1), [-10, 4]), "a", ACC, 14, "end"), txt(add(mid(B1, E1), [0, 32]), "b", ACC, 14),
      ell(B2, a * k, a * k * ry), seg(A2, [B2[0] - a * k, B2[1]], DIM, 2), seg(A2, E2, DIM, 2),
      poly([A2, B2, E2], GLD, 2, GLDS), rightAngle(B2, A2, E2, 9, GLD),
      txt(add(mid(A2, B2), [-10, 4]), "b", GLD, 14, "end"), txt(add(mid(B2, E2), [0, 50]), "a", GLD, 14),
      cap(450, 236, "One right triangle with legs a and b. Spun about leg a (left) it sweeps a cone of height a and base radius b; spun about leg b (right) the roles swap." + MM(ok))
    ]);
  })();

  // 1991 AIME #12: rhombus PQRS inscribed in rectangle ABCD, drawn to the problem's numbers.
  PROB["1991-aime-12"] = (() => {
    const k = 6.6, w = 38.4 * k, h = 28.8 * k, A = [82, 38], B = [A[0] + w, A[1]], C = [A[0] + w, A[1] + h], D = [A[0], A[1] + h];
    const O = mid(A, C), P = [B[0] - 15 * k, B[1]], Q = [B[0], B[1] + 20 * k], R = sub(mul(O, 2), P), S = sub(mul(O, 2), Q);
    const ok = [dist(P, Q), dist(Q, R), dist(R, S), dist(S, P)].every(d => Math.abs(d - 25 * k) < 1e-9) &&
      Math.abs(dist(P, R) - 30 * k) < 1e-9 && Math.abs(dist(Q, S) - 40 * k) < 1e-9 && R[1] === C[1] && S[0] === A[0];
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), poly([P, Q, R, S], ACC, 2, ACCS),
      seg(P, R, ACC, 1.3, "5 4"), seg(Q, S, ACC, 1.3, "5 4"), dot(O, ACC, 3.5),
      ...[A, B, C, D, P, Q, R, S].map(p => dot(p, DIM, 3.5)),
      txt(add(A, [-10, -6]), "A"), txt(add(B, [10, -6]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [-10, 14]), "D"),
      txt(add(P, [0, -9]), "P"), txt(add(Q, [12, 4]), "Q"), txt(add(R, [0, 18]), "R"), txt(add(S, [-12, 4]), "S"),
      txt(add(mid(P, B), [0, -9]), "15", GLD, 12.5), txt(add(mid(B, Q), [16, 4]), "20", GLD, 12.5),
      cap(430, 270, "Rhombus PQRS with one vertex on each side of rectangle ABCD; PB = 15, BQ = 20, and the diagonals PR = 30 and QS = 40 cross at the center of both." + MM(ok))
    ]);
  })();

  // 1993 AIME #14: a rectangle inscribed in the 8 by 6 rectangle, and the circle its vertices
  // travel on when it turns about the common center.
  PROB["1993-aime-14"] = (() => {
    const k = 27, O = [215, 135], P = (x, y) => [O[0] + k * x, O[1] - k * y];
    const y = 1.2, x = Math.sqrt(y * y + 7), V = [P(4, y), P(-x, 3), P(-4, -y), P(x, -3)];
    const ok = Math.abs(dist(V[0], V[2]) - dist(V[1], V[3])) < 1e-9 && Math.abs((V[1][0] - V[0][0]) * (V[3][0] - V[0][0]) + (V[1][1] - V[0][1]) * (V[3][1] - V[0][1])) < 1e-6;
    return wrap(430, 270, [
      poly([P(-4, 3), P(4, 3), P(4, -3), P(-4, -3)], DIM, 2), circ(O, dist(O, V[0]), FNT, 1.2, "none", "5 4"),
      poly(V, ACC, 2, ACCS), dot(O, DIM, 3.5), ...V.map(p => dot(p, ACC, 3.5)),
      txt(add(mid(P(-4, -3), P(4, -3)), [0, 18]), "8", DIM, 13), txt(add(mid(P(4, 3), P(4, -3)), [14, 4]), "6", DIM, 13, "start"),
      cap(430, 270, "A rectangle (blue) inscribed in the 8 by 6 rectangle with one vertex on each side. Turning it about the shared center moves every vertex along the dashed circle, which is what decides whether it is stuck." + MM(ok))
    ]);
  })();

  // 1994 AIME #2: the circle of radius 20, the circle with diameter PQ = 10 tangent inside at P,
  // and the square hanging below the tangent at Q.
  PROB["1994-aime-2"] = (() => {
    const k = 5.8, O = [215, 140], s = (8 + Math.sqrt(304)) * k;
    const Pt = [O[0], O[1] - 20 * k], Q = [O[0], O[1] - 10 * k], c = [O[0], O[1] - 15 * k];
    const D = [O[0] - s / 2, Q[1]], C = [O[0] + s / 2, Q[1]], A = [D[0], Q[1] + s], B = [C[0], Q[1] + s];
    const ok = Math.abs(dist(O, A) - 20 * k) < 1e-6 && Math.abs(dist(O, B) - 20 * k) < 1e-6;
    return wrap(430, 280, [
      circ(O, 20 * k, FNT, 1.6), circ(c, 5 * k, GLD, 1.8), seg(Pt, Q, GLD, 1.6), seg(Q, O, FNT, 1.2, "4 3"),
      poly([A, B, C, D], ACC, 2, ACCS), dot(O, DIM, 3.5),
      ...[Pt, Q, A, B, C, D].map(p => dot(p, DIM, 3.5)),
      txt(add(Pt, [0, -8]), "P"), txt(add(Q, [10, 16]), "Q"), txt(add(O, [10, 4]), "O", DIM, 13, "start"),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      cap(430, 280, "The circle with diameter PQ = 10 touches the circle of radius 20 from inside at P. Square ABCD has A and B on the large circle and side CD tangent to the small circle at Q." + MM(ok))
    ]);
  })();

  // 1995 AIME #4: circles of radius 3 and 6 inside the circle of radius 9, and the chord that is
  // their common external tangent.
  PROB["1995-aime-4"] = (() => {
    const k = 13, O = [215, 135], Bc = [O[0] - 3 * k, O[1]], Ac = [O[0] + 6 * k, O[1]];
    const n = [1 / 3, Math.sqrt(8) / 3], h = n[0] * Ac[0] + n[1] * Ac[1] + 3 * k;
    const foot = sub(O, mul(n, (n[0] * O[0] + n[1] * O[1]) - h)), u = perp(n), half = Math.sqrt(81 * k * k - (h - n[0] * O[0] - n[1] * O[1]) ** 2);
    const E1 = add(foot, mul(u, half)), E2 = sub(foot, mul(u, half));
    const ok = Math.abs((h - n[0] * Bc[0] - n[1] * Bc[1]) - 6 * k) < 1e-9 && Math.abs(dist(O, E1) - 9 * k) < 1e-9;
    return wrap(430, 270, [
      circ(O, 9 * k, FNT, 1.6), circ(Bc, 6 * k, DIM, 1.8), circ(Ac, 3 * k, DIM, 1.8),
      seg(E1, E2, ACC, 2.2), dot(O, DIM, 3.5), dot(Ac, DIM, 3.5), dot(Bc, DIM, 3.5),
      seg(Bc, add(Bc, [-6 * k, 0]), FNT, 1.2, "4 3"), txt(add(Bc, [-3 * k, -6]), "6", DIM, 12.5),
      seg(Ac, add(Ac, [0, -3 * k]), FNT, 1.2, "4 3"), txt(add(Ac, [8, -1.5 * k + 4]), "3", DIM, 12.5, "start"),
      seg(O, add(O, [0, -9 * k]), FNT, 1.2, "4 3"), txt(add(O, [-8, -6 * k]), "9", DIM, 12.5, "end"),
      cap(430, 270, "Circles of radius 3 and 6 touch each other and touch the circle of radius 9 from inside. The blue chord of the big circle is a common external tangent of the two small ones." + MM(ok))
    ]);
  })();

  // 1997 AIME #4: four mutually externally tangent circles, radii 5, 5, 8 and the small one.
  PROB["1997-aime-4"] = (() => {
    const k = 11, M = [215, 248], r = 8 / 9, C1 = [M[0] - 5 * k, M[1]], C2 = [M[0] + 5 * k, M[1]];
    const C3 = [M[0], M[1] - 12 * k], C4 = [M[0], M[1] - (4 - r) * k];
    const ok = Math.abs(dist(C1, C3) - 13 * k) < 1e-9 && Math.abs(dist(C1, C4) - (5 + r) * k) < 1e-9 && Math.abs(dist(C3, C4) - (8 + r) * k) < 1e-9;
    return wrap(430, 318, [
      circ(C1, 5 * k, DIM, 1.8), circ(C2, 5 * k, DIM, 1.8), circ(C3, 8 * k, DIM, 1.8), circ(C4, r * k, GLD, 2, GLDS),
      txt(add(C1, [0, 5]), "5", DIM, 14), txt(add(C2, [0, 5]), "5", DIM, 14), txt(add(C3, [0, 5]), "8", DIM, 14),
      cap(430, 318, "Circles of radii 5, 5 and 8, each touching the other two from outside, and the small gold circle in the gap that touches all three." + MM(ok))
    ]);
  })();

  // 1998 AIME #10: a vertical cut through the ninth sphere and two opposite spheres of the ring.
  PROB["1998-aime-10"] = (() => {
    const k = 0.55, F0 = [215, 205], R = 100 / Math.sin(Math.PI / 8), r = R * R / 400;
    const P = (x, y) => [F0[0] + k * x, F0[1] - k * y], L = P(-R, 100), Rt = P(R, 100), N = P(0, r);
    const ok = Math.abs(dist(L, N) - (r + 100) * k) < 1e-9 && Math.abs(2 * R * Math.sin(Math.PI / 8) - 200) < 1e-9;
    return wrap(430, 222, [
      seg(P(-395, 0), P(395, 0), DIM, 2),
      circ(L, 100 * k, DIM, 1.8), circ(Rt, 100 * k, DIM, 1.8), circ(N, r * k, GLD, 2, GLDS),
      dot(L, DIM, 3), dot(Rt, DIM, 3), dot(N, GLD, 3),
      seg(L, add(L, [0, 100 * k]), FNT, 1.2, "4 3"), txt(add(L, [-6, 30]), "100", DIM, 12, "end"),
      cap(430, 222, "A vertical cut through the ninth sphere (gold) and two opposite spheres of the ring. The eight spheres of radius 100 sit on the floor with their centers at the corners of a regular octagon of side 200; the ninth also rests on the floor and touches all eight." + MM(ok))
    ]);
  })();

  // 2000 AIME II #8: right trapezoid with perpendicular diagonals, drawn to the problem's numbers.
  PROB["2000-aime-ii-8"] = (() => {
    const k = 11, B = [38, 44], C = [38, 44 + Math.sqrt(110) * k], A = [38 + Math.sqrt(11) * k, 44], D = [38 + 10 * Math.sqrt(11) * k, C[1]];
    const X = lineInt(A, C, B, D), dAC = sub(C, A), dBD = sub(D, B);
    const ok = Math.abs(dAC[0] * dBD[0] + dAC[1] * dBD[1]) < 1e-6 && Math.abs(dist(A, D) - Math.sqrt(1001) * k) < 1e-9;
    return wrap(430, 190, [
      poly([A, B, C, D], DIM, 2), seg(A, C, ACC, 1.8), seg(B, D, ACC, 1.8),
      rightAngle(B, A, C, 9), rightAngle(C, D, B, 9), rightAngle(X, A, B, 8, ACC),
      ...[A, B, C, D].map(p => dot(p, DIM, 3.5)),
      txt(add(A, [8, -6]), "A"), txt(add(B, [-10, -6]), "B"), txt(add(C, [-10, 14]), "C"), txt(add(D, [10, 14]), "D"),
      txt(add(mid(A, B), [0, -10]), "√11", GLD, 12.5), txt(add(mid(A, D), [16, -8]), "√1001", GLD, 12.5, "start"),
      cap(430, 190, "Trapezoid ABCD with leg BC perpendicular to both bases and the diagonals AC and BD perpendicular; AB = √11 and AD = √1001." + MM(ok))
    ]);
  })();

  // 2000 AIME II #12: the sphere, the plane of A, B, C cutting it in a circle, and the
  // perpendicular OD from the center to that plane.
  PROB["2000-aime-ii-12"] = (() => {
    const k = 6, O = [215, 128], beta = rad(42), Rs = 20, rc = 65 / 8, h = Math.sqrt(400 - rc * rc);
    const S = (x, y, z) => [O[0] + k * x, O[1] - k * (z * Math.cos(beta) + y * Math.sin(beta))];   // y recedes, z up
    const D = S(0, 0, -h), A3 = Math.asin(56 / 65), B3 = Math.asin(60 / 65);
    const on = t => [rc * Math.cos(t), rc * Math.sin(t), -h];
    const Bq = on(rad(-70)), Cq = on(rad(-70) + 2 * A3), Aq = on(rad(-70) + 2 * A3 + 2 * B3);
    const L = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const ok = Math.abs(L(Bq, Cq) - 14) < 1e-9 && Math.abs(L(Cq, Aq) - 15) < 1e-9 && Math.abs(L(Aq, Bq) - 13) < 1e-9 &&
      Math.abs(Math.hypot(...Aq) - 20) < 1e-9;
    const Pa = S(...Aq), Pb = S(...Bq), Pc = S(...Cq);
    return wrap(430, 262, [
      circ(O, Rs * k, FNT, 1.6),
      ell(D, rc * k, rc * k * Math.sin(beta), FNT, 1.3, "4 3"),
      poly([Pa, Pb, Pc], ACC, 2, ACCS), seg(O, D, GLD, 1.8, "5 4"), seg(O, Pa, DIM, 1.4),
      dot(O, DIM, 3.5), dot(D, GLD, 3.5), ...[Pa, Pb, Pc].map(q => dot(q, ACC, 3.5)),
      txt(add(O, [10, -6]), "O", DIM, 13, "start"), txt(add(D, [10, 4]), "D", GLD, 13, "start"),
      txt(add(Pa, [-12, 0]), "A", ACC), txt(add(Pb, [4, 17]), "B", ACC), txt(add(Pc, [12, 2]), "C", ACC),
      txt(add(mid(O, Pa), [-10, -2]), "20", DIM, 12.5, "end"),
      cap(430, 262, "A, B and C on the sphere of radius 20 about O. Their plane cuts the sphere in a circle (dashed), and D is the foot of the perpendicular from O to the plane; OD is the distance asked for." + MM(ok))
    ]);
  })();

  // 2002 AIME I #11: the cube, the face BCFG, and the beam's first leg from A to P.
  PROB["2002-aime-i-11"] = (() => {
    const { Pj, view } = projector([118, 238], 11.5, [1, 0], [0.62, -0.42]);
    // x along AB, y along BC, z up: A(0,0,0), B(12,0,0), C(12,12,0), D(0,12,0), G above B, F above C.
    const V = { A: [0, 0, 0], B: [12, 0, 0], C: [12, 12, 0], D: [0, 12, 0], G: [12, 0, 12], F: [12, 12, 12], H: [0, 0, 12], K: [0, 12, 12] };
    const faces = [["A", "B", "C", "D"], ["H", "G", "F", "K"], ["A", "B", "G", "H"], ["D", "C", "F", "K"], ["B", "C", "F", "G"], ["A", "D", "K", "H"]];
    const P3 = [12, 7, 5], P = Pj(P3), A = Pj(V.A);
    const ok = Math.abs(P3[1] - 7) < 1e-12 && Math.abs(P3[2] - 5) < 1e-12 && P3[0] === V.B[0];
    return wrap(430, 270, [
      poly(["B", "C", "F", "G"].map(n => Pj(V[n])), "none", 0, ACCS),
      ...solidEdges(V, faces, view, Pj),
      seg(A, P, GLD, 2.2), seg(P, Pj([12, 0, 5]), FNT, 1.3, "3 3"), seg(P, Pj([12, 7, 0]), FNT, 1.3, "3 3"),
      dot(P, GLD, 4), dot(A, DIM, 3.5),
      ...["A", "B", "C", "D", "G", "F"].map(n => txt(add(Pj(V[n]), n === "A" ? [-12, 10] : n === "B" ? [10, 12] : n === "C" ? [12, 6] : n === "D" ? [-12, 4] : n === "G" ? [10, -6] : [12, -6]), n)),
      txt(add(P, [10, -6]), "P", GLD, 13, "start"),
      txt(add(mid(P, Pj([12, 0, 5])), [0, 16]), "7", DIM, 12), txt(add(mid(P, Pj([12, 7, 0])), [10, 4]), "5", DIM, 12, "start"),
      cap(430, 270, "The cube with edge 12. The beam leaves A and first hits face BCFG (shaded) at P, which is 7 from edge BG and 5 from edge BC." + MM(ok))
    ]);
  })();

  // 2002 AIME I #15: the polyhedron drawn from its coordinates, with the hidden edges dashed.
  PROB["2002-aime-i-15"] = (() => {
    const g = -6 + Math.sqrt(19);
    const V = { A: [-6, -6, 0], B: [6, -6, 0], C: [6, 6, 0], D: [-6, 6, 0], E: [0, 2, 12], F: [3, g, 6], G: [-3, g, 6] };
    const faces = [["A", "B", "C", "D"], ["A", "B", "F", "G"], ["C", "D", "E"], ["A", "D", "E", "G"], ["B", "C", "E", "F"], ["E", "F", "G"]];
    const { Pj, view } = projector([205, 214], 13, [1, 0], [0.55, -0.32]);
    const L = (n, m) => Math.hypot(...[0, 1, 2].map(i => V[n][i] - V[m][i]));
    const ok = Math.abs(L("B", "F") - 8) < 1e-9 && Math.abs(L("A", "G") - 8) < 1e-9 && Math.abs(L("C", "E") - 14) < 1e-9 && Math.abs(L("F", "G") - 6) < 1e-9;
    const off = { A: [-10, 12], B: [10, 12], C: [12, 4], D: [-12, -2], E: [0, -10], F: [12, 2], G: [-12, 2] };
    return wrap(430, 262, [
      ...solidEdges(V, faces, view, Pj),
      ...Object.keys(V).map(n => dot(Pj(V[n]), DIM, 3.2)),
      ...Object.keys(V).map(n => txt(add(Pj(V[n]), off[n]), n)),
      cap(430, 262, "The polyhedron: square ABCD of side 12 at the bottom, trapezoid ABFG in front (GF = 6, AG = BF = 8), triangle CDE at the back (CE = DE = 14), and E at height 12 above the square." + MM(ok))
    ]);
  })();

  // 2003 AIME II #11: the right triangle, the point D over the midpoint M, and triangle CDM.
  PROB["2003-aime-ii-11"] = (() => {
    const k = 14.5, Q = (x, y) => [40 + k * x, 175 - k * y];
    const A = Q(0, 0), B = Q(25, 0), C = Q(49 / 25, 168 / 25), M = Q(12.5, 0), D = Q(12.5, Math.sqrt(225 - 156.25));
    const ok = Math.abs(dist(A, C) - 7 * k) < 1e-9 && Math.abs(dist(B, C) - 24 * k) < 1e-9 && Math.abs(dist(A, D) - 15 * k) < 1e-9;
    return wrap(430, 205, [
      poly([A, B, C], DIM, 2), seg(A, D, DIM, 1.6), seg(B, D, DIM, 1.6), poly([C, D, M], GLD, 1.8, GLDS),
      rightAngle(C, A, B, 9), ticksOn(A, M, 1), ticksOn(M, B, 1),
      ...[A, B, C, D, M].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-8, 14]), "A"), txt(add(B, [8, 14]), "B"), txt(add(C, [-4, -9]), "C"), txt(add(D, [0, -9]), "D"), txt(add(M, [0, 16]), "M"),
      txt(add(mid(A, C), [-10, 0]), "7", DIM, 12, "end"), txt(add(lerp(C, B, 0.74), [0, 15]), "24", DIM, 12),
      txt(add(mid(A, D), [-6, -8]), "15", DIM, 12), txt(add(mid(B, D), [8, -4]), "15", DIM, 12, "start"),
      cap(430, 205, "Right triangle ABC (right angle at C), M the midpoint of AB, and D on C's side of AB with AD = BD = 15. Triangle CDM is shaded." + MM(ok))
    ]);
  })();

  // 2004 AIME I #14: the view from above. The rope wraps part of the tower, then leaves along a
  // tangent to the unicorn U, which is 4 from the tower, so 12 from its center.
  PROB["2004-aime-i-14"] = (() => {
    const k = 9, O = [175, 120], U = [O[0] + 12 * k, O[1]];
    const th = Math.acos(8 / 12), T = [O[0] + 8 * k * Math.cos(th), O[1] - 8 * k * Math.sin(th)];
    const wrapAng = (8 * Math.sqrt(6) - 4 * Math.sqrt(5)) / 8, a0 = -th, a1 = a0 - wrapAng;
    const W = [O[0] + 8 * k * Math.cos(a1), O[1] + 8 * k * Math.sin(a1)];
    const ok = Math.abs((T[0] - O[0]) * (U[0] - T[0]) + (T[1] - O[1]) * (U[1] - T[1])) < 1e-6 && Math.abs(dist(T, U) - Math.sqrt(80) * k) < 1e-9;
    return wrap(430, 205, [
      circ(O, 8 * k, DIM, 2, "var(--bg-card)"),
      `<path d="M ${T.map(v => v.toFixed(1)).join(",")} A ${8 * k} ${8 * k} 0 0 0 ${W.map(v => v.toFixed(1)).join(",")}" fill="none" stroke="${GLD}" stroke-width="3"/>`,
      seg(T, U, GLD, 2.4), seg(O, T, FNT, 1.2, "4 3"), seg(O, [O[0] + 8 * k, O[1]], FNT, 1.2, "4 3"),
      seg([O[0] + 8 * k, O[1]], U, DIM, 1.2, "2 3"), rightAngle(T, O, U, 9),
      dot(O, DIM, 3.5), dot(U, GLD, 4), dot(W, GLD, 3.5), dot(T, DIM, 3),
      txt(add(U, [10, 4]), "U", GLD, 13, "start"), txt(add(W, [-10, -6]), "rope tied here", GLD, 11.5, "end"),
      txt(add(mid(O, T), [-12, -2]), "8", DIM, 12), txt(add(mid([O[0] + 8 * k, O[1]], U), [0, 16]), "4", DIM, 12),
      cap(430, 205, "The tower and rope seen from above. The rope (gold, 20 long in all) is tied at ground level, wraps part of the way round the tower of radius 8, and leaves it along a tangent to the unicorn U, 4 from the tower, where it is tied 4 above the ground." + MM(ok))
    ]);
  })();

  // An arc of the circle (center c, radius r) from point p to point q, inside the angle they make.
  const arcPQ = (c, r, p, q, col = FNT, w = 1.5, dash = "") => {
    const a1 = Math.atan2(p[1] - c[1], p[0] - c[0]), a2 = Math.atan2(q[1] - c[1], q[0] - c[0]);
    let da = a2 - a1; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    return `<path d="M ${p[0].toFixed(1)},${p[1].toFixed(1)} A ${r} ${r} 0 0 ${da > 0 ? 1 : 0} ${q[0].toFixed(1)},${q[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  };

  // 2004 AIME II #12: the isosceles trapezoid, the four corner circles (the parts inside it), and
  // the small circle touching all four.
  PROB["2004-aime-ii-12"] = (() => {
    const k = 38, h = 2 * Math.sqrt(6), Q = (x, y) => [215 + k * x, 222 - k * y];
    const A = Q(-3, 0), B = Q(3, 0), C = Q(2, h), D = Q(-2, h);
    const r = (-60 + 48 * Math.sqrt(3)) / 23, O = Q(0, Math.sqrt(r * r + 6 * r));
    const ok = Math.abs(dist(O, A) - (r + 3) * k) < 1e-9 && Math.abs(dist(O, D) - (r + 2) * k) < 1e-9 && Math.abs(dist(A, D) - 5 * k) < 1e-9;
    const toward = (P, T, len) => add(P, mul(norm(sub(T, P)), len));
    return wrap(430, 250, [
      poly([A, B, C, D], DIM, 2),
      arcPQ(A, 3 * k, toward(A, B, 3 * k), toward(A, D, 3 * k), ACC, 1.8), arcPQ(B, 3 * k, toward(B, A, 3 * k), toward(B, C, 3 * k), ACC, 1.8),
      arcPQ(C, 2 * k, toward(C, D, 2 * k), toward(C, B, 2 * k), GRN, 1.8), arcPQ(D, 2 * k, toward(D, C, 2 * k), toward(D, A, 2 * k), GRN, 1.8),
      circ(O, r * k, GLD, 2, GLDS),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(mid(A, B), [0, 18]), "6", DIM, 12.5), txt(add(mid(D, C), [0, -8]), "4", DIM, 12.5),
      txt(add(mid(A, D), [-12, 0]), "5", DIM, 12.5, "end"), txt(add(mid(B, C), [12, 0]), "5", DIM, 12.5, "start"),
      cap(430, 250, "Isosceles trapezoid ABCD with circles of radius 3 about A and B (blue) and radius 2 about C and D (green), drawn where they lie inside it. The gold circle touches all four." + MM(ok))
    ]);
  })();

  // 2005 AIME II #8: circles of radius 4 and 10 inside the circle of radius 14, centers in line,
  // and the chord that is their common external tangent.
  PROB["2005-aime-ii-8"] = (() => {
    const k = 8.8, O = [215, 138], C2 = [O[0] - 4 * k, O[1]], C1 = [O[0] + 10 * k, O[1]];
    const n = [6 / 14, Math.sqrt(1 - 36 / 196)], h = n[0] * C1[0] + n[1] * C1[1] + 4 * k;
    const dO = h - n[0] * O[0] - n[1] * O[1], foot = add(O, mul(n, dO)), u = perp(n), half = Math.sqrt(196 * k * k - dO * dO);
    const E1 = add(foot, mul(u, half)), E2 = sub(foot, mul(u, half));
    const ok = Math.abs((h - n[0] * C2[0] - n[1] * C2[1]) - 10 * k) < 1e-9 && Math.abs(dist(O, E1) - 14 * k) < 1e-9;
    return wrap(430, 276, [
      circ(O, 14 * k, FNT, 1.6), circ(C2, 10 * k, DIM, 1.8), circ(C1, 4 * k, DIM, 1.8),
      seg(E1, E2, ACC, 2.2), dot(O, DIM, 3.5), dot(C1, DIM, 3.5), dot(C2, DIM, 3.5),
      txt(add(C2, [0, 18]), subT("C", "2"), DIM, 13), txt(add(C1, [0, 18]), subT("C", "1"), DIM, 13),
      txt(add(O, [0, -110]), subT("C", "3"), DIM, 13),
      cap(430, 276, "C1 (radius 4) and C2 (radius 10) touch each other and touch C3 from inside, with all three centers on one line. The blue chord of C3 is a common external tangent of C1 and C2." + MM(ok))
    ]);
  })();

  // 2006 AIME I #1: the quadrilateral with its two right angles.
  PROB["2006-aime-i-1"] = (() => {
    const k = 7.2, Q = (x, y) => [78 + k * x, 222 - k * y];
    const u = [18 / Math.hypot(18, 21), 21 / Math.hypot(18, 21)];
    const B = Q(0, 0), A = Q(0, 18), C = Q(21, 0), D = Q(21 + 14 * u[0], 14 * u[1]);
    const ok = Math.abs((A[0] - C[0]) * (D[0] - C[0]) + (A[1] - C[1]) * (D[1] - C[1])) < 1e-6 && Math.abs(dist(C, D) - 14 * k) < 1e-9;
    return wrap(430, 250, [
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.5, "5 4"),
      rightAngle(B, A, C, 11), rightAngle(C, A, D, 11),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, -4]), "A"), txt(add(B, [-10, 12]), "B"), txt(add(C, [6, 16]), "C"), txt(add(D, [10, -4]), "D", DIM, 13, "start"),
      txt(add(mid(A, B), [-10, 4]), "18", DIM, 12.5, "end"), txt(add(mid(B, C), [0, 18]), "21", DIM, 12.5), txt(add(mid(C, D), [12, 6]), "14", DIM, 12.5, "start"),
      cap(430, 250, "Quadrilateral ABCD with a right angle at B and the diagonal AC perpendicular to CD." + MM(ok))
    ]);
  })();

  // 2006 AIME II #1: the equilateral hexagon with right angles at A and D.
  PROB["2006-aime-ii-1"] = (() => {
    const k = 108, c = Math.SQRT1_2, Q = (x, y) => [83 + k * (x + c), 130 - k * y];
    const A = Q(-c, 0), B = Q(0, c), C = Q(1, c), D = Q(1 + c, 0), E = Q(1, -c), F = Q(0, -c);
    const H = [A, B, C, D, E, F], sides = H.map((p, i) => dist(p, H[(i + 1) % 6]));
    const ok = sides.every(d => Math.abs(d - k) < 1e-9);
    return wrap(430, 260, [
      poly(H, DIM, 2), rightAngle(A, B, F, 12), rightAngle(D, C, E, 12),
      ...H.map((p, i) => ticksOn(p, H[(i + 1) % 6], 1)),
      ...H.map(p => dot(p, DIM, 3.5)),
      ...[["A", [-12, 4]], ["B", [-4, -9]], ["C", [4, -9]], ["D", [12, 4]], ["E", [4, 18]], ["F", [-4, 18]]].map(([n, o], i) => txt(add(H[i], o), n)),
      cap(430, 260, "Convex hexagon ABCDEF with six equal sides, right angles at A and D, and the other four angles equal." + MM(ok))
    ]);
  })();

  // 2006 AIME II #6: the unit square, the equilateral triangle AEF, and the small square at B.
  PROB["2006-aime-ii-6"] = (() => {
    const k = 230, Q = (x, y) => [100 + k * x, 262 - k * y], x = Math.sqrt(3) - 1, s = (3 - Math.sqrt(3)) / 6;
    const A = Q(0, 0), B = Q(1, 0), C = Q(1, 1), D = Q(0, 1), E = Q(1, 1 - x), F = Q(1 - x, 1);
    const S1 = Q(1 - s, 0), S2 = Q(1 - s, s), S3 = Q(1, s);
    const onAE = Math.abs((S2[0] - A[0]) * (E[1] - A[1]) - (S2[1] - A[1]) * (E[0] - A[0])) < 1e-6;
    const ok = onAE && Math.abs(dist(A, E) - dist(E, F)) < 1e-9 && Math.abs(dist(A, F) - dist(E, F)) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C, D], DIM, 2), poly([A, E, F], ACC, 2, ACCS), poly([B, S1, S2, S3], GLD, 2, GLDS),
      ...[A, B, C, D, E, F, S2].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(E, [12, 4]), "E", DIM, 13, "start"), txt(add(F, [0, -9]), "F"),
      cap(430, 290, "Square ABCD of side 1 with the equilateral triangle AEF (blue), and the smaller square (gold) with vertex B, sides parallel to ABCD, and its opposite vertex on AE." + MM(ok))
    ]);
  })();

  // 2008 AIME II #11: the isosceles triangle and the two circles on the base.
  PROB["2008-aime-ii-11"] = (() => {
    const k = 2.45, Q = (x, y) => [215 + k * x, 262 - k * y], rq = 44 - 6 * Math.sqrt(35);
    const A = Q(0, 96), B = Q(-28, 0), C = Q(28, 0), P = Q(28 - 64 / 3, 16), Qc = Q(-28 + 4 * rq / 3, rq);
    const dl = (X, Y, Z) => Math.abs((Z[0] - Y[0]) * (Y[1] - X[1]) - (Y[0] - X[0]) * (Z[1] - Y[1])) / dist(Y, Z);
    const ok = Math.abs(dist(A, B) - 100 * k) < 1e-9 && Math.abs(dl(P, A, C) - 16 * k) < 1e-6 && Math.abs(dl(Qc, A, B) - rq * k) < 1e-6 &&
      Math.abs(dist(P, Qc) - (16 + rq) * k) < 1e-6;
    return wrap(430, 282, [
      poly([A, B, C], DIM, 2), circ(P, 16 * k, ACC, 1.8, ACCS), circ(Qc, rq * k, GLD, 1.8, GLDS),
      dot(P, ACC, 3), dot(Qc, GLD, 3), ...[A, B, C].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [0, -9]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(P, [9, 5]), "P", ACC, 12, "start"), txt(add(Qc, [0, -rq * k - 7]), "Q", GLD, 12),
      txt(add(mid(A, C), [12, 0]), "100", DIM, 12.5, "start"), txt(add(mid(A, B), [-12, 0]), "100", DIM, 12.5, "end"), txt(add(mid(B, C), [0, 16]), "56", DIM, 12.5),
      cap(430, 282, "Triangle ABC with AB = AC = 100 and BC = 56. Circle P (radius 16) touches AC and BC; circle Q touches AB, BC and circle P, and lies inside the triangle." + MM(ok))
    ]);
  })();

  // 2009 AMC 12A #19: a regular pentagon and a regular heptagon of side 2, each between its
  // inscribed and circumscribed circles.
  PROB["2009-amc-12a-19"] = (() => {
    const k = 40, fig = (c, n) => {
      const R = 1 / Math.sin(Math.PI / n), rho = 1 / Math.tan(Math.PI / n);
      const V = [...Array(n)].map((_, i) => onC(c, R * k, -90 + 360 * i / n));
      return { R, rho, V, parts: [`<circle cx="${c[0]}" cy="${c[1]}" r="${(R * k).toFixed(1)}" fill="${ACCS}" stroke="${ACC}" stroke-width="1.6"/>`,
        circ(c, rho * k, ACC, 1.6, "var(--bg-card)"), poly(V, DIM, 2)] };
    };
    const P5 = fig([112, 112], 5), P7 = fig([312, 112], 7);
    const ok = Math.abs(dist(P5.V[0], P5.V[1]) - 2 * k) < 1e-9 && Math.abs(dist(P7.V[0], P7.V[1]) - 2 * k) < 1e-9;
    return wrap(430, 222, [
      ...P5.parts, ...P7.parts,
      txt([112, 216], "pentagon, area A", DIM, 12.5), txt([312, 216], "heptagon, area B", DIM, 12.5),
      cap(430, 222, "A regular pentagon and a regular heptagon, each of side 2, with the region between the inscribed and circumscribed circles shaded." + MM(ok))
    ]);
  })();

  // 2010 AIME I #8: the region, twelve unit squares with lower-left corners on x² + y² = 25.
  PROB["2010-aime-i-8"] = (() => {
    const k = 21, O = [200, 152], Q = (x, y) => [O[0] + k * x, O[1] - k * y];
    const pts = [];
    for (let x = -5; x <= 5; x++) for (let y = -5; y <= 5; y++) if (x * x + y * y === 25) pts.push([x, y]);
    const ok = pts.length === 12;
    return wrap(430, 290, [
      seg(Q(-6, 0), Q(7, 0), FNT, 1.2), seg(Q(0, -6), Q(0, 6.6), FNT, 1.2),
      circ(O, 5 * k, FNT, 1.2, "none", "4 4"),
      ...pts.map(([x, y]) => poly([Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], ACC, 1.6, ACCS)),
      ...pts.map(([x, y]) => dot(Q(x, y), ACC, 2.8)),
      txt(add(Q(7, 0), [-4, 16]), "x", DIM, 13), txt(add(Q(0, 6.6), [12, 6]), "y", DIM, 13),
      txt(add(Q(5, 0), [4, 16]), "5", DIM, 12), txt(add(Q(0, 5), [-10, 0]), "5", DIM, 12, "end"),
      cap(430, 290, "The region: a point is in it when its floors lie on the circle x² + y² = 25 (dashed), so it is the union of the unit squares whose lower-left corners are the twelve lattice points of that circle." + MM(ok))
    ]);
  })();

  // 2010 AIME II #14: the right triangle with P on the hypotenuse and the two marked angles.
  PROB["2010-aime-ii-14"] = (() => {
    const k = 84, Q = (x, y) => [215 + k * x, 140 - k * y], cx = 5 / (2 * Math.SQRT2), cy = Math.sqrt(4 - cx * cx);
    const A = Q(-2, 0), B = Q(2, 0), C = Q(cx, cy), P = Q(Math.SQRT2, 0);
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V)));
    const ok = Math.abs(ang(A, P, C) - 2 * ang(A, C, P)) < 1e-9 && Math.abs(dist(C, P) - k) < 1e-9 && Math.abs(ang(A, C, B) - Math.PI / 2) < 1e-9;
    return wrap(430, 172, [
      poly([A, B, C], DIM, 2), seg(C, P, ACC, 2), rightAngle(C, A, B, 9),
      angleArc(C, A, P, 34, GLD), angleArc(P, A, C, 22, PUR), angleArc(P, A, C, 27, PUR),
      ...[A, B, C, P].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(P, [0, 18]), "P"),
      txt(add(mid(A, B), [-40, 18]), "4", DIM, 12.5), txt(add(mid(C, P), [12, 6]), "1", ACC, 12.5, "start"),
      cap(430, 172, "Right triangle ABC (right angle at C, AB = 4) and P on AB with CP = 1. The double-arc angle APC is twice the gold angle ACP." + MM(ok))
    ]);
  })();

  // 2011 AIME I #2: the rectangle with BE parallel to DF and EF parallel to AB.
  PROB["2011-aime-i-2"] = (() => {
    const k = 24, Q = (x, y) => [70 + k * x, 262 - k * y], uy = -10 / 17, ux = -Math.sqrt(1 - uy * uy);
    const A = Q(0, 10), B = Q(12, 10), C = Q(12, 0), D = Q(0, 0), E = Q(12 + 9 * ux, 10 + 9 * uy), F = Q(-8 * ux, -8 * uy);
    const ok = Math.abs(E[1] - F[1]) < 1e-9 && Math.abs(dist(B, E) - 9 * k) < 1e-9 && Math.abs(dist(D, F) - 8 * k) < 1e-9;
    return wrap(430, 285, [
      poly([A, B, C, D], DIM, 2), seg(B, E, ACC, 2), seg(D, F, ACC, 2), seg(E, F, GLD, 2.2),
      ...[A, B, C, D, E, F].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, -6]), "A"), txt(add(B, [10, -6]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [-10, 14]), "D"),
      txt(add(E, [-10, 4]), "E", DIM, 13, "end"), txt(add(F, [10, 4]), "F", DIM, 13, "start"),
      txt(add(mid(B, E), [8, -8]), "9", ACC, 12.5), txt(add(mid(D, F), [-8, 10]), "8", ACC, 12.5),
      txt(add(mid(A, B), [0, -9]), "12", DIM, 12.5), txt(add(mid(B, C), [14, 4]), "10", DIM, 12.5, "start"),
      cap(430, 285, "Rectangle ABCD with BE = 9 and DF = 8 parallel, and EF parallel to AB." + MM(ok))
    ]);
  })();

  // 2011 AIME II #2: the square with BE = EF = FD.
  PROB["2011-aime-ii-2"] = (() => {
    const k = 210, Q = (x, y) => [110 + k * x, 250 - k * y];
    const A = Q(0, 0), B = Q(1, 0), C = Q(1, 1), D = Q(0, 1), E = Q(0, 1 / 3), F = Q(1, 2 / 3);
    const ok = Math.abs(dist(B, E) - dist(E, F)) < 1e-9 && Math.abs(dist(E, F) - dist(F, D)) < 1e-9;
    return wrap(430, 280, [
      poly([A, B, C, D], DIM, 2), pline([B, E, F, D], ACC, 2.2),
      ...[A, B, C, D, E, F].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(E, [-10, 4]), "E", DIM, 13, "end"), txt(add(F, [10, 4]), "F", DIM, 13, "start"),
      ...[[B, E, 1], [E, F, -1], [F, D, -1]].map(([P1, P2, sg]) => txt(add(mid(P1, P2), add(mul(perp(norm(sub(P2, P1))), 14 * sg), [0, 4])), "30", ACC, 12.5)),
      cap(430, 280, "Square ABCD with E on AD and F on BC such that the zigzag BE, EF, FD has three equal segments of length 30." + MM(ok))
    ]);
  })();

  // 2012 AIME II #4: the field and the three routes from the northeast corner to D.
  PROB["2012-aime-ii-4"] = (() => {
    const k = 56, L = 6, W = 1.4, c = 4.8, Q = (x, y) => [44 + k * x, 140 - k * y];
    const NE = Q(L, W), NW = Q(0, W), SW = Q(0, 0), SE = Q(L, 0), D = Q(L - c, 0), g = 5;
    const ok = Math.abs((2 * L + W - c) / 8.6 - Math.hypot(W, c) / 5) < 1e-9 && Math.abs((W + c) / 6.2 - Math.hypot(W, c) / 5) < 1e-9;
    return wrap(430, 200, [
      poly([NW, NE, SE, SW], FNT, 1.4, "rgba(127,127,127,0.06)"),
      pline([add(NE, [0, g]), add(NW, [g, g]), add(SW, [g, -g]), add(D, [0, -g])], GLD, 2.2),
      pline([add(NE, [-g, 0]), add(SE, [-g, -g]), add(D, [0, -g])], GRN, 2.2, "6 4"),
      seg(NE, D, ACC, 2.2), dot(NE, DIM, 4), dot(D, DIM, 4),
      txt(add(NE, [0, -9]), "start", DIM, 12), txt(add(D, [0, 17]), "D", DIM, 13),
      txt(add(NW, [70, -8]), "Ana 8.6 m/s", GLD, 12, "start"), txt(add(SE, [-8, 30]), "Bob 6.2 m/s", GRN, 12, "end"),
      txt(add(lerp(D, NE, 0.42), [0, -10]), "Cao 5 m/s", ACC, 12, "end"),
      cap(430, 200, "The field, its longer side running west. Ana (gold) rides west along the edge, Bob (green, dashed) south, and Cao (blue) straight across, all from the northeast corner and all reaching D at the same moment." + MM(ok))
    ]);
  })();

  // 2013 AIME I #7: the box and the triangle joining the centers of three faces at a corner.
  PROB["2013-aime-i-7"] = (() => {
    const h = 36 / 5, { Pj, view } = projector([118, 238], 13, [1, 0], [0.55, -0.35]);
    const V = { a: [0, 0, 0], b: [12, 0, 0], c: [12, 16, 0], d: [0, 16, 0], e: [0, 0, h], f: [12, 0, h], g: [12, 16, h], m: [0, 16, h] };
    const faces = [["a", "b", "c", "d"], ["e", "f", "g", "m"], ["a", "b", "f", "e"], ["d", "c", "g", "m"], ["b", "c", "g", "f"], ["a", "d", "m", "e"]];
    const X = [12, 8, h / 2], Y = [6, 0, h / 2], Z = [6, 8, h];
    const L3 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const ok = Math.abs(L3(X, Y) - 10) < 1e-9 && Math.abs(0.5 * L3(X, Y) * 6 - 30) < 1e-9 &&
      Math.abs(Math.sqrt(L3(Z, X) ** 2 - 36) + Math.sqrt(L3(Z, Y) ** 2 - 36) - 10) < 1e-9;
    return wrap(430, 262, [
      ...solidEdges(V, faces, view, Pj),
      poly([X, Y, Z].map(Pj), ACC, 2, ACCS), ...[X, Y, Z].map(q => dot(Pj(q), ACC, 3.5)),
      txt(add(mid(Pj(V.a), Pj(V.b)), [0, 18]), "12", DIM, 12.5), txt(add(mid(Pj(V.b), Pj(V.c)), [14, 8]), "16", DIM, 12.5, "start"),
      txt(add(mid(Pj(V.b), Pj(V.f)), [10, 4]), "height", DIM, 12, "start"),
      cap(430, 262, "The 12 by 16 box. The centers of the three faces that meet at one corner (front, right side and top) form the blue triangle, of area 30." + MM(ok))
    ]);
  })();

  // 2013 AIME II #8: the hexagon with sides 22, 22, 20, 22, 22, 20 in its circle.
  PROB["2013-aime-ii-8"] = (() => {
    const R = 5 + Math.sqrt(267), k = 5.4, O = [215, 132], sides = [22, 22, 20, 22, 22, 20];
    const angs = sides.map(c => 2 * Math.asin(c / (2 * R)));
    let t = -90 - angs[0] * 90 / Math.PI;
    const V = [];
    sides.forEach((c, i) => { V.push(onC(O, R * k, t)); t += angs[i] * 180 / Math.PI; });
    const ok = Math.abs(angs.reduce((a, b) => a + b, 0) - 2 * Math.PI) < 1e-9;
    return wrap(430, 262, [
      circ(O, R * k, FNT, 1.6), poly(V, DIM, 2), ...V.map(q => dot(q, DIM, 3.2)),
      ...sides.map((c, i) => { const M = mid(V[i], V[(i + 1) % 6]); return txt(add(M, mul(norm(sub(M, O)), -16)), String(c), c === 20 ? GLD : DIM, 12.5); }),
      cap(430, 262, "A hexagon inscribed in a circle with sides 22, 22, 20, 22, 22, 20 in order." + MM(ok))
    ]);
  })();

  // 2014 AIME I #15: the 3-4-5 triangle and circle ω through B meeting the sides at E, D, F, G.
  PROB["2014-aime-i-15"] = (() => {
    const k = 56, Q = (x, y) => [128 + k * x, 252 - k * y];
    // x along BC, y along BA; F and G are the points the conditions force (bisector foot, midpoint).
    const f = [12 / 7, 12 / 7], g = [2, 1.5];
    const det = 2 * (f[0] * g[1] - f[1] * g[0]), F2 = f[0] ** 2 + f[1] ** 2, G2 = g[0] ** 2 + g[1] ** 2;
    const o = [(F2 * g[1] - G2 * f[1]) / det, (G2 * f[0] - F2 * g[0]) / det], r = Math.hypot(o[0], o[1]);
    const e = [0, 2 * o[1]], d = [2 * o[0], 0];
    const L = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
    const ok = Math.abs(L(e, f) - L(d, f)) < 1e-9 && Math.abs(L(d, g) / L(e, g) - 0.75) < 1e-9 &&
      e[1] > 0 && e[1] < 3 && d[0] > 0 && d[0] < 4 && Math.abs(L(o, g) - r) < 1e-9;
    const [A, B, C, D, E, F, G] = [[0, 3], [0, 0], [4, 0], d, e, f, g].map(q => Q(...q));
    return wrap(430, 290, [
      circ(Q(...o), r * k, ACC, 1.8), poly([A, B, C], DIM, 2), rightAngle(B, A, C, 10),
      ...[A, B, C, D, E, F, G].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, -4]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(D, [0, 18]), "D"), txt(add(E, [-12, 4]), "E", DIM, 13, "end"),
      txt(add(F, [-6, -10]), "F", DIM, 13, "end"), txt(add(G, [8, -8]), "G", DIM, 13, "start"),
      txt(add(Q(...o), [-r * k * 0.25, r * k * 0.3]), "ω", ACC, 14),
      txt(add(mid(A, B), [-26, 0]), "3", DIM, 12.5), txt(add(mid(B, C), [40, 18]), "4", DIM, 12.5), txt(add(lerp(A, C, 0.25), [12, 6]), "5", DIM, 12.5),
      cap(430, 290, "Triangle ABC with AB = 3, BC = 4, CA = 5, and circle ω through B meeting AB again at E, BC at D and AC at F and G, with EF = DF and DG : EG = 3 : 4." + MM(ok))
    ]);
  })();

  // 2014 AIME II #8: circle C with diameter AB, circle D tangent inside at A, circle E on AB.
  PROB["2014-aime-ii-8"] = (() => {
    const k = 62, O = [215, 142], Q = (x, y) => [O[0] + k * x, O[1] - k * y];
    // r is the radius the conditions force; it is drawn, not labelled.
    const r = (4 * Math.sqrt(15) - 14) / 3, x = (3 + Math.sqrt(15)) * r - 2, cd = [3 * r - 2, 0], ce = [x, r];
    const L = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
    const ok = Math.abs(L(ce, [0, 0]) - (2 - r)) < 1e-9 && Math.abs(L(ce, cd) - 4 * r) < 1e-9;
    const A = Q(-2, 0), B = Q(2, 0);
    return wrap(430, 300, [
      circ(O, 2 * k, DIM, 2), circ(Q(...cd), 3 * r * k, ACC, 1.8), circ(Q(...ce), r * k, GLD, 1.8),
      seg(A, B, DIM, 1.6), seg(O, Q(Math.cos(2.3) * 2, Math.sin(2.3) * 2), FNT, 1.3, "4 3"),
      ...[A, B, O].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [10, 4]), "B", DIM, 13, "start"),
      txt(add(mid(O, Q(Math.cos(2.3) * 2, Math.sin(2.3) * 2)), [8, 10]), "2", DIM, 12.5),
      txt(Q(1.6, 1.6), "C", DIM, 14), txt(Q(...cd), "D", ACC, 14), txt(add(Q(...ce), [0, 5]), "E", GLD, 13),
      cap(430, 300, "Circle C of radius 2 with diameter AB. Circle D (blue) touches C inside at A; circle E (gold) touches C inside, D outside, and AB. The radius of D is three times that of E." + MM(ok))
    ]);
  })();

  // 2015 AIME II #4: the isosceles trapezoid, drawn to scale with common logarithms.
  PROB["2015-aime-ii-4"] = (() => {
    const lg = Math.log10, k = 150, b1 = lg(3), b2 = lg(192), h = lg(16), X0 = 44, Y0 = 228;
    const A = [X0, Y0], B = [X0 + k * b2, Y0], C = [X0 + k * (b2 + b1) / 2, Y0 - k * h], D = [X0 + k * (b2 - b1) / 2, Y0 - k * h];
    const ok = Math.abs(dist(A, D) - dist(B, C)) < 1e-9 && Math.abs(dist(C, D) - k * b1) < 1e-9 && Math.abs(dist(A, B) - k * b2) < 1e-9;
    const Hf = [D[0], Y0];
    return wrap(430, 290, [
      poly([A, B, C, D], DIM, 2), seg(D, Hf, ACC, 1.6, "5 4"), rightAngle(Hf, D, B, 9),
      txt(add(mid(C, D), [0, -10]), "log 3", DIM, 12.5), txt(add(mid(A, B), [0, 20]), "log 192", DIM, 12.5),
      txt(add(mid(D, Hf), [8, 4]), "log 16", ACC, 12.5, "start"),
      cap(430, 290, "The isosceles trapezoid with bases log 3 and log 192 and altitude log 16 (dashed), drawn to scale." + MM(ok))
    ]);
  })();

  // 2016 AIME I #4: the hexagonal prism and the pyramid on A and its three neighbours.
  PROB["2016-aime-i-4"] = (() => {
    const h = 6 * Math.sqrt(3), { Pj, view } = projector([215, 180], 8.6, [1, 0], [0.4, -0.72]);
    const V = {};
    for (let i = 0; i < 6; i++) {
      const t = Math.PI / 3 * i - Math.PI / 2;
      V["b" + i] = [12 * Math.cos(t), 12 * Math.sin(t), 0]; V["t" + i] = [12 * Math.cos(t), 12 * Math.sin(t), h];
    }
    const faces = [[0, 1, 2, 3, 4, 5].map(i => "b" + i), [0, 1, 2, 3, 4, 5].map(i => "t" + i),
      ...[0, 1, 2, 3, 4, 5].map(i => ["b" + i, "b" + (i + 1) % 6, "t" + (i + 1) % 6, "t" + i])];
    const A = V.b0, Bv = V.b1, Fv = V.b5, At = V.t0;
    const L3 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const ok = Math.abs(L3(A, Bv) - 12) < 1e-9 && Math.abs(L3(A, Fv) - 12) < 1e-9 && Math.abs(L3(A, At) - h) < 1e-9;
    const [a, b, f, t] = [A, Bv, Fv, At].map(Pj);
    return wrap(430, 300, [
      poly([b, f, t], "none", 0, ACCS),
      ...solidEdges(V, faces, view, Pj, FNT, 1.6),
      seg(a, b, ACC, 2), seg(a, f, ACC, 2), seg(a, t, ACC, 2), seg(b, f, ACC, 2), seg(b, t, ACC, 2), seg(f, t, ACC, 2),
      ...[a, b, f, t].map(q => dot(q, ACC, 3.5)),
      txt(add(a, [0, 18]), "A", ACC), txt(add(mid(a, b), [6, 16]), "12", DIM, 12.5), txt(add(mid(a, t), [-8, 4]), "h", DIM, 13, "end"),
      cap(430, 300, "The right prism on a regular hexagon of side 12, height h. The pyramid (blue) has apex A and its three neighbours; the shaded face is the one not containing A." + MM(ok))
    ]);
  })();

  // 2017 AIME I #4: the pyramid on the 20-20-24 base with three lateral edges of 25.
  PROB["2017-aime-i-4"] = (() => {
    const H = 25 * Math.sqrt(3) / 2, { Pj, view } = projector([215, 238], 7.4, [1, 0], [0.45, -0.42]);
    const V = { B: [-12, 0, 0], C: [12, 0, 0], A: [0, 16, 0], P: [0, 3.5, H] };
    const faces = [["A", "B", "C"], ["P", "B", "C"], ["P", "C", "A"], ["P", "A", "B"]];
    const L3 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    const ok = ["A", "B", "C"].every(n => Math.abs(L3(V[n], V.P) - 25) < 1e-9) && Math.abs(L3(V.A, V.B) - 20) < 1e-9 && Math.abs(L3(V.A, V.C) - 20) < 1e-9;
    const [b, c, a, pp] = ["B", "C", "A", "P"].map(n => Pj(V[n]));
    return wrap(430, 290, [
      ...solidEdges(V, faces, view, Pj), ...[a, b, c, pp].map(q => dot(q, DIM, 3.5)),
      txt(add(mid(b, c), [0, 18]), "24", DIM, 12.5), txt(add(mid(b, a), [-14, -2]), "20", DIM, 12.5, "end"), txt(add(mid(c, a), [14, 2]), "20", DIM, 12.5, "start"),
      txt(add(mid(pp, b), [-12, 0]), "25", ACC, 12.5, "end"), txt(add(mid(pp, c), [12, 0]), "25", ACC, 12.5, "start"), txt(add(lerp(pp, a, 0.4), [10, 0]), "25", ACC, 12.5, "start"),
      cap(430, 290, "The pyramid: a base triangle with sides 20, 20 and 24, and three edges of length 25 up to the fourth vertex." + MM(ok))
    ]);
  })();

  // 2017 AIME II #15: the tetrahedron with opposite edges 28, 44 and 52 equal in pairs.
  PROB["2017-aime-ii-15"] = (() => {
    // Built from its box (x = √1928, z = √776, depth y = √8) so the six edges come out exactly.
    const p = Math.sqrt(1928), q = Math.sqrt(776), r = Math.sqrt(8), { Pj, view } = projector([95, 230], 5.3, [1, 0], [0.9, -0.9]);
    const V = { A: [0, 0, 0], B: [p, 0, q], C: [p, r, 0], D: [0, r, q] };
    const faces = [["A", "B", "C"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"]];
    const L3 = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1], u[2] - w[2]);
    const want = { AD: 28, BC: 28, AC: 44, BD: 44, AB: 52, CD: 52 };
    const ok = Object.entries(want).every(([e, l]) => Math.abs(L3(V[e[0]], V[e[1]]) - l) < 1e-9);
    const P = n => Pj(V[n]);
    const lab = (e, d, anc = "middle") => txt(add(mid(P(e[0]), P(e[1])), d), String(want[e]), want[e] === 28 ? ACC : want[e] === 44 ? GLD : PUR, 12.5, anc);
    return wrap(430, 280, [
      ...solidEdges(V, faces, view, Pj), ...["A", "B", "C", "D"].map(n => dot(P(n), DIM, 3.5)),
      txt(add(P("A"), [-10, 14]), "A"), txt(add(P("B"), [10, -6]), "B"), txt(add(P("C"), [12, 10]), "C"), txt(add(P("D"), [-10, -8]), "D"),
      lab("AD", [-14, 0], "end"), lab("BC", [14, 4], "start"), lab("AC", [0, 16]), lab("BD", [0, -10]), lab("AB", [-18, -16]), lab("CD", [18, 14]),
      cap(430, 280, "Tetrahedron ABCD with AD = BC = 28, AC = BD = 44 and AB = CD = 52; each opposite pair has one color." + MM(ok))
    ]);
  })();

  // 2019 AIME II #1: the congruent triangles ABC and BAD on the same side of AB.
  PROB["2019-aime-ii-1"] = (() => {
    const k = 15.5, Q = (x, y) => [128 + k * x, 222 - k * y];
    const A = Q(0, 0), B = Q(9, 0), C = Q(15, 8), D = Q(-6, 8);
    const L = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1]) / k;
    const ok = Math.abs(L(B, C) - 10) < 1e-9 && Math.abs(L(C, A) - 17) < 1e-9 && Math.abs(L(A, D) - 10) < 1e-9 && Math.abs(L(D, B) - 17) < 1e-9;
    const X = lineInt(A, C, B, D);
    return wrap(430, 280, [
      poly([A, B, X], "none", 0, ACCS), poly([A, B, C], ACC, 2), poly([B, A, D], GLD, 2),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-4, 18]), "A"), txt(add(B, [4, 18]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(mid(A, B), [0, 18]), "9", DIM, 12.5), txt(add(mid(B, C), [14, 6]), "10", ACC, 12.5, "start"), txt(add(mid(A, D), [-14, 6]), "10", GLD, 12.5, "end"),
      txt(add(lerp(A, C, 0.72), [6, -10]), "17", ACC, 12.5), txt(add(lerp(B, D, 0.72), [-6, -10]), "17", GLD, 12.5),
      cap(430, 280, "Congruent triangles ABC (blue) and BAD (gold) on the same side of AB; their common region is shaded." + MM(ok))
    ]);
  })();

  // 2020 AIME I #6: the vertical cut through the centers of both holes.
  PROB["2020-aime-i-6"] = (() => {
    const r = Math.sqrt(160 / 13), h1 = Math.sqrt(r * r - 1), h2 = Math.sqrt(r * r - 4), k = 23, Q = (x, y) => [118 + k * x, 222 - k * y];
    const ok = Math.abs(Math.hypot(7, h1 - h2) - 2 * r) < 1e-9;
    const O1 = Q(0, h1), O2 = Q(7, h2);
    return wrap(430, 290, [
      seg(Q(-4.6, 0), Q(-1, 0), DIM, 3), seg(Q(1, 0), Q(5, 0), DIM, 3), seg(Q(9, 0), Q(11.6, 0), DIM, 3),
      circ(O1, r * k, ACC, 1.8), circ(O2, r * k, ACC, 1.8),
      seg(Q(0, -0.55), Q(-1, -0.55), FNT, 1.2), seg(Q(7, -0.55), Q(9, -0.55), FNT, 1.2), seg(Q(0, -1.5), Q(7, -1.5), FNT, 1.2, "4 3"),
      ...[Q(-1, 0), Q(1, 0), Q(5, 0), Q(9, 0)].map(q => dot(q, DIM, 2.8)), dot(O1, ACC, 3), dot(O2, ACC, 3),
      txt(add(Q(-0.5, -0.55), [0, 15]), "1", DIM, 12), txt(add(Q(8, -0.55), [0, 15]), "2", DIM, 12), txt(add(Q(3.5, -1.5), [0, 15]), "7", DIM, 12),
      cap(430, 290, "The cut through both hole centers: holes of radius 1 and 2 with centers 7 apart, and two equal spheres resting in them, tangent to each other." + MM(ok))
    ]);
  })();

  // 2021 AIME I #9: the isosceles trapezoid and the three distances from A.
  PROB["2021-aime-i-9"] = (() => {
    const s2 = Math.SQRT2, a = 4.5 * s2, c = 20.25 * s2, k = 9.6, Q = (x, y) => [70 + k * x, 238 - k * y];
    const A = Q(a, 18), B = Q(c - a, 18), C = Q(c, 0), D = Q(0, 0);
    const fBC = foot(A, B, C), fBD = foot(A, B, D), fCD = Q(a, 0);
    const ok = Math.abs(dist(A, fBC) / k - 15) < 1e-9 && Math.abs(dist(A, fBD) / k - 10) < 1e-9 && Math.abs(dist(A, fCD) / k - 18) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C, D], DIM, 2), seg(B, D, FNT, 1.5), seg(B, fBC, FNT, 1.2, "3 3"),
      seg(A, fCD, ACC, 1.6, "5 4"), seg(A, fBC, GLD, 1.6, "5 4"), seg(A, fBD, PUR, 1.6, "5 4"),
      rightAngle(fCD, A, C, 8), rightAngle(fBC, A, C, 8), rightAngle(fBD, A, D, 8),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-8, -8]), "A", DIM, 13, "end"), txt(add(B, [6, -8]), "B", DIM, 13, "start"), txt(add(C, [10, 14]), "C"), txt(add(D, [-10, 14]), "D"),
      txt(add(mid(A, fCD), [-8, 18]), "18", ACC, 12.5, "end"), txt(add(mid(A, fBC), [0, -10]), "15", GLD, 12.5), txt(add(mid(A, fBD), [10, 14]), "10", PUR, 12.5, "start"),
      cap(430, 290, "Isosceles trapezoid ABCD with AD = BC and AB shorter than CD. The distances from A to lines CD, BC (extended) and BD are 18, 15 and 10." + MM(ok))
    ]);
  })();

  // 2021 AIME II #10: the view along line ℓ, where the two planes look like lines from one point.
  PROB["2021-aime-ii-10"] = (() => {
    const s = 23 / Math.sqrt(1105), half = Math.asin(s), k = 2.55, L = [44, 140];
    const P2 = (d, t) => [L[0] + k * d * Math.cos(t), L[1] - k * d * Math.sin(t)];
    const big = P2(36 / s, 0), small = P2(13 / s, 0);
    const ok = Math.abs(Math.hypot(72 / 2, (36 - 13) / s) - 49) < 1e-9;
    return wrap(430, 300, [
      seg(L, P2(64, half), DIM, 2), seg(L, P2(64, -half), DIM, 2),
      circ(big, 36 * k, ACC, 1.8), circ(small, 13 * k, GLD, 1.8), dot(L, DIM, 4), dot(small, GLD, 2.6), dot(big, ACC, 2.6),
      txt(add(L, [-10, 4]), "ℓ", DIM, 14, "end"), txt(add(P2(64, half), [8, -4]), "P", DIM, 13, "start"), txt(add(P2(64, -half), [8, 12]), "Q", DIM, 13, "start"),
      txt(add(big, [0, 18]), "36", ACC, 12), txt(add(small, [0, 4]), "13", GLD, 12),
      cap(430, 300, "Looking along line ℓ, the planes P and Q are two lines from ℓ. Every sphere touches both; the two spheres of radius 36 sit one behind the other, and the sphere of radius 13 touches both of them." + MM(ok))
    ]);
  })();

  // 2022 AIME I #10: the three tangent spheres cut by one plane in congruent circles.
  PROB["2022-aime-i-10"] = (() => {
    const { Pj } = projector([92, 228], 4.3, [1, 0], [0.42, -0.3]);
    const b = Math.sqrt(560), cx = 356 / (2 * b), cy = Math.sqrt(756 - cx * cx), rr = Math.sqrt(105);
    const A3 = [0, 0, 0], B3 = [b, 0, 0], C3 = [cx, cy, 0], O = [[0, 0, 4], [b, 0, 8], [cx, cy, 16]], R = [11, 13, 19];
    const L3 = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1], u[2] - w[2]);
    const ok = Math.abs(L3(O[0], O[1]) - 24) < 1e-9 && Math.abs(L3(O[0], O[2]) - 30) < 1e-9 && Math.abs(L3(O[1], O[2]) - 32) < 1e-9 &&
      R.every((x, i) => Math.abs(x * x - O[i][2] ** 2 - 105) < 1e-9);
    const ring = c => Array.from({ length: 73 }, (_, i) => Pj([c[0] + rr * Math.cos(i * Math.PI / 36), c[1] + rr * Math.sin(i * Math.PI / 36), 0]));
    const [a, bb, c] = [A3, B3, C3].map(Pj);
    return wrap(430, 330, [
      poly([[-22, -18, 0], [48, -18, 0], [48, 44, 0], [-22, 44, 0]].map(Pj), FNT, 1.2, GLDS),
      ...O.map((o, i) => pline(sphereOutline(Pj, o, R[i]), i === 2 ? PUR : i === 1 ? GLD : ACC, 1.6)),
      ...[A3, B3, C3].map(q => pline(ring(q), DIM, 1.6)),
      ...[a, bb, c].map(q => dot(q, DIM, 3.2)),
      txt(add(a, [-10, 14]), "A"), txt(add(bb, [10, 14]), "B"), txt(add(c, [12, 12]), "C"),
      txt(add(Pj(O[0]), [-30, -26]), "11", ACC, 12), txt(add(Pj(O[1]), [36, -20]), "13", GLD, 12), txt(add(Pj(O[2]), [0, -60]), "19", PUR, 12),
      cap(430, 330, "Spheres of radii 11, 13 and 19, each touching the other two, cut by one plane in three congruent circles centered at A, B and C." + MM(ok))
    ]);
  })();

  // 2022 AIME II #3: the right square pyramid and the sphere through its five vertices.
  PROB["2022-aime-ii-3"] = (() => {
    const h = 4.5, R = 17 / 4, z0 = 0.25, { Pj, view } = projector([215, 186], 26, [1, 0], [0.42, -0.34]);
    const V = { a: [-3, -3, 0], b: [3, -3, 0], c: [3, 3, 0], d: [-3, 3, 0], p: [0, 0, h] };
    const faces = [["a", "b", "c", "d"], ["p", "a", "b"], ["p", "b", "c"], ["p", "c", "d"], ["p", "d", "a"]];
    const L3 = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1], u[2] - w[2]);
    const ok = Math.abs(36 * h / 3 - 54) < 1e-9 && Object.values(V).every(q => Math.abs(L3(q, [0, 0, z0]) - R) < 1e-9);
    return wrap(430, 300, [
      pline(sphereOutline(Pj, [0, 0, z0], R), ACC, 1.6),
      ...solidEdges(V, faces, view, Pj), ...Object.values(V).map(q => dot(Pj(q), DIM, 3.2)),
      txt(add(mid(Pj(V.a), Pj(V.b)), [0, 18]), "6", DIM, 12.5),
      cap(430, 300, "The right square pyramid with base side 6 and volume 54, and the sphere through all five of its vertices." + MM(ok))
    ]);
  })();

  // 2023 AMC 10A #17: the 30 by 28 rectangle with P on BC and Q on CD.
  PROB["2023-amc-10a-17"] = (() => {
    const k = 7.2, Q0 = (x, y) => [108 + k * x, 240 - k * y];
    const A = Q0(0, 0), B = Q0(30, 0), C = Q0(30, 28), D = Q0(0, 28), P = Q0(30, 16), Q = Q0(21, 28);
    const L = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1]) / k, isInt = x => Math.abs(x - Math.round(x)) < 1e-9;
    const ok = [[A, B], [B, P], [A, P], [P, C], [C, Q], [P, Q], [Q, D], [D, A], [A, Q]].every(([u, w]) => isInt(L(u, w)));
    return wrap(430, 280, [
      poly([A, B, C, D], DIM, 2), poly([A, P, Q], ACC, 2, ACCS),
      ...[A, B, C, D, P, Q].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(P, [10, 4]), "P", ACC, 13, "start"), txt(add(Q, [0, -10]), "Q", ACC, 13),
      txt(add(mid(A, B), [0, 18]), "30", DIM, 12.5), txt(add(mid(D, A), [-12, 4]), "28", DIM, 12.5, "end"),
      cap(430, 280, "Rectangle ABCD with AB = 30 and BC = 28, P on BC and Q on CD, with every side of triangles ABP, PCQ and QDA a whole number; triangle APQ is shaded." + MM(ok))
    ]);
  })();

  // 2024 AIME I #14: the tetrahedron with opposite edges √41, √80, √89 equal in pairs.
  PROB["2024-aime-i-14"] = (() => {
    // Built from its 4 × 5 × 8 box so that the six edges come out exactly (x = 4 deep, y = 5 across, z = 8 up).
    const { Pj, view } = projector([150, 248], 23, [0.55, -0.3], [1, 0]);
    const V = { A: [0, 0, 0], B: [4, 5, 0], C: [4, 0, 8], D: [0, 5, 8] };
    const faces = [["A", "B", "C"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"]];
    const L3 = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1], u[2] - w[2]);
    const want = { AB: 41, CD: 41, AC: 80, BD: 80, BC: 89, AD: 89 };
    const ok = Object.entries(want).every(([e, l]) => Math.abs(L3(V[e[0]], V[e[1]]) ** 2 - l) < 1e-9);
    const P = n => Pj(V[n]);
    const lab = (e, d, anc = "middle") => txt(add(mid(P(e[0]), P(e[1])), d), "√" + want[e], want[e] === 41 ? ACC : want[e] === 80 ? GLD : PUR, 12.5, anc);
    return wrap(430, 290, [
      ...solidEdges(V, faces, view, Pj), ...["A", "B", "C", "D"].map(n => dot(P(n), DIM, 3.5)),
      txt(add(P("A"), [-10, 14]), "A"), txt(add(P("B"), [12, 12]), "B"), txt(add(P("C"), [-10, -8]), "C"), txt(add(P("D"), [12, -6]), "D"),
      lab("AB", [0, 18]), lab("CD", [0, -10]), lab("AC", [-16, 0], "end"), lab("BD", [16, 4], "start"), lab("AD", [-22, -18]), lab("BC", [-3, 27]),
      cap(430, 290, "Tetrahedron ABCD with AB = CD = √41, AC = BD = √80 and BC = AD = √89; each opposite pair has one color." + MM(ok))
    ]);
  })();

  // 2024 AMC 12B #23: the right pyramid on a regular octagon of side 1, with AV perpendicular to DV.
  PROB["2024-amc-12b-23"] = (() => {
    const R = 1 / (2 * Math.sin(Math.PI / 8)), h = Math.sqrt((1 + Math.SQRT2) / 2), { Pj, view } = projector([215, 200], 92, [1, 0], [0.45, -0.42]);
    const names = "ABCDEFGH".split(""), V = { V: [0, 0, h] };
    names.forEach((n, i) => { const t = -Math.PI / 2 - Math.PI / 8 - Math.PI / 4 * i; V[n] = [R * Math.cos(t), R * Math.sin(t), 0]; });
    const faces = [names, ...names.map((n, i) => ["V", n, names[(i + 1) % 8]])];
    const sub3 = (u, w) => [u[0] - w[0], u[1] - w[1], u[2] - w[2]], dot3 = (u, w) => u[0] * w[0] + u[1] * w[1] + u[2] * w[2];
    const ok = Math.abs(dot3(sub3(V.A, V.V), sub3(V.D, V.V))) < 1e-9 && Math.abs(Math.hypot(...sub3(V.A, V.B)) - 1) < 1e-9;
    const P = n => Pj(V[n]);
    return wrap(430, 290, [
      ...solidEdges(V, faces, view, Pj, FNT, 1.5),
      seg(P("V"), P("A"), ACC, 2), seg(P("V"), P("D"), ACC, 2), seg(P("A"), P("D"), ACC, 1.4, "5 4"),
      ...[...names, "V"].map(n => dot(P(n), n === "V" || n === "A" || n === "D" ? ACC : DIM, 3.2)),
      ...names.map(n => txt(add(P(n), mul(norm(sub(P(n), Pj([0, 0, 0]))), 15)), n, DIM, 12.5)),
      txt(add(P("V"), [0, -10]), "V", ACC), txt(add(mid(P("E"), P("F")), mul(norm(sub(mid(P("E"), P("F")), Pj([0, 0, 0]))), 14)), "1", DIM, 12),
      cap(430, 290, "The right pyramid on regular octagon ABCDEFGH of side 1, with apex V above its center and AV perpendicular to DV (blue)." + MM(ok))
    ]);
  })();

  // 2025 AIME I #6: the isosceles trapezoid around a circle of radius 3.
  PROB["2025-aime-i-6"] = (() => {
    const k = 12.4, Q = (x, y) => [215 + k * x, 222 - k * y], d = 6 * Math.sqrt(3);
    const r1 = 12 - d, s1 = 12 + d;  // the two bases, r + s = 24 and r - s = ±12√3
    const A = Q(-s1 / 2, 0), B = Q(s1 / 2, 0), C = Q(r1 / 2, 6), D = Q(-r1 / 2, 6), O = Q(0, 3);
    const distL = (p, u, w) => Math.abs((w[0] - u[0]) * (u[1] - p[1]) - (u[0] - p[0]) * (w[1] - u[1])) / Math.hypot(w[0] - u[0], w[1] - u[1]) / k;
    const ok = Math.abs(distL(O, B, C) - 3) < 1e-9 && Math.abs((r1 + s1) / 2 * 6 - 72) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), circ(O, 3 * k, ACC, 1.8), seg(O, Q(0, 0), ACC, 1.4, "4 3"), dot(O, ACC, 3),
      txt(add(mid(O, Q(0, 0)), [8, 4]), "3", ACC, 12.5, "start"),
      txt(add(mid(A, B), [0, 18]), "s", DIM, 13), txt(add(mid(C, D), [0, -10]), "r", DIM, 13),
      cap(430, 270, "An isosceles trapezoid of area 72 with parallel sides r and s, around a circle of radius 3 that touches all four sides." + MM(ok))
    ]);
  })();

  // 2025 AMC 10A #23 and AMC 12A #16 (the same problem): the bisector of B and the altitude to AB.
  PROB["2025-amc-10a-23"] = PROB["2025-amc-12a-16"] = (() => {
    const k = 4.4, Q = (x, y) => [40 + k * x, 232 - k * y], cx = 35 / 2, cy = Math.sqrt(45 * 45 - cx * cx);
    const B = Q(0, 0), A = Q(80, 0), C = Q(cx, cy), D = Q(cx, 0);
    const W = add(B, mul(norm(add(norm(sub(A, B)), norm(sub(C, B)))), 300)), P = lineInt(B, W, C, D);
    const ok = Math.abs(dist(A, C) / k - 75) < 1e-9 && Math.abs(dist(B, C) / k - 45) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(C, D, ACC, 1.8), seg(B, lineInt(B, W, A, C), GLD, 1.8), rightAngle(D, C, A, 8),
      angleArc(B, A, P, 30, GLD), angleArc(B, P, C, 36, GLD),
      ...[A, B, C, D, P].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [10, 14]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(P, [10, -4]), "P", DIM, 13, "start"),
      txt(add(mid(A, B), [0, 18]), "80", DIM, 12.5), txt(add(mid(B, C), [-12, 0]), "45", DIM, 12.5, "end"), txt(add(mid(A, C), [12, -6]), "75", DIM, 12.5, "start"),
      cap(430, 270, "Triangle ABC with AB = 80, BC = 45 and CA = 75. The bisector of angle B (gold) meets the altitude from C to AB (blue) at P." + MM(ok))
    ]);
  })();

  // 2026 AIME II #3: the nonconvex pentagon with right angles at A and E and 45° angles at B and D.
  PROB["2026-aime-ii-3"] = (() => {
    const b = 29, k = 8.6, Q = (x, y) => [80 + k * x, 222 - k * y];  // AB = 29 is one allowed length
    const A = Q(0, 0), B = Q(b, 0), C = Q(b - 14, 14), D = Q(b - 8, 20), E = Q(0, 20);
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V))) * 180 / Math.PI;
    const ok = Math.abs(ang(A, B, C) - 45) < 1e-9 && Math.abs(ang(E, D, C) - 45) < 1e-9 && Math.abs(dist(B, C) / k - 14 * Math.SQRT2) < 1e-9 && dist(D, E) < dist(A, B);
    return wrap(430, 270, [
      poly([A, B, C, D, E], DIM, 2), rightAngle(A, B, E, 10), rightAngle(E, A, D, 10),
      angleArc(B, A, C, 30, GLD), angleArc(D, E, C, 30, GLD),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [-12, 4]), "C", DIM, 13, "end"), txt(add(D, [10, -6]), "D"), txt(add(E, [-10, -6]), "E"),
      txt(add(mid(A, E), [-12, 4]), "20", DIM, 12.5, "end"), txt(add(mid(B, C), [14, -4]), "14√2", DIM, 12.5, "start"),
      txt(add(B, [-40, -10]), "45°", GLD, 11.5), txt(add(D, [-38, 22]), "45°", GLD, 11.5),
      cap(430, 270, "The pentagon ABCDE: right angles at A and E, 45° angles at B and D, AE = 20 and BC = 14√2, with the reflex angle at C. Drawn with AB = 29." + MM(ok))
    ]);
  })();

  // 1994 AIME #15: the 30-60-90 triangle, a fold point P and the three creases.
  PROB["1994-aime-15"] = (() => {
    const k = 3.9, Q = (x, y) => [70 + k * x, 232 - k * y];
    const B = Q(0, 0), C = Q(36 * Math.sqrt(3), 0), A = Q(0, 36), P = Q(16, 12);
    const tri = [A, B, C], inDisk = (X, Y, Z) => dist(Z, mid(X, Y)) < dist(X, Y) / 2;
    const ok = Math.abs(dist(A, C) / k - 72) < 1e-9 && inDisk(A, B, P) && inDisk(B, C, P);
    const crease = V => {
      const M = mid(V, P), u = perp(norm(sub(V, P))), hits = [];
      tri.forEach((X, i) => { const Y = tri[(i + 1) % 3], H = lineInt(M, add(M, u), X, Y);
        if (H && Math.abs(dist(X, H) + dist(H, Y) - dist(X, Y)) < 1e-6) hits.push(H); });
      return seg(hits[0], hits[1], ACC, 1.8);
    };
    return wrap(430, 270, [
      poly(tri, DIM, 2), rightAngle(B, A, C, 10), ...[A, B, C].map(crease),
      ...[A, B, C].map(V => seg(V, P, FNT, 1.2, "3 3")),
      ...[A, B, C].map(q => dot(q, DIM, 3.5)), dot(P, GLD, 4),
      txt(add(A, [-10, -4]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(P, [10, 14]), "P", GLD, 13, "start"),
      txt(add(mid(A, B), [-12, 4]), "36", DIM, 12.5, "end"), txt(add(mid(A, C), [14, -8]), "72", DIM, 12.5, "start"),
      cap(430, 270, "Triangle ABC with AB = 36, AC = 72 and a right angle at B. Folding A, B and C onto P makes the three creases (blue); here they do not meet, so P is a fold point." + MM(ok))
    ]);
  })();

  // 1995 AIME #12: the square pyramid with equal lateral edges and a 45° angle AOB.
  PROB["1995-aime-12"] = (() => {
    const L = 1 / Math.sin(Math.PI / 8), h = Math.sqrt(L * L - 2), { Pj, view } = projector([215, 228], 52, [1, 0], [0.45, -0.36]);
    const V = { A: [-1, -1, 0], B: [1, -1, 0], C: [1, 1, 0], D: [-1, 1, 0], O: [0, 0, h] };
    const faces = [["A", "B", "C", "D"], ["O", "A", "B"], ["O", "B", "C"], ["O", "C", "D"], ["O", "D", "A"]];
    const s3 = (u, w) => [u[0] - w[0], u[1] - w[1], u[2] - w[2]], d3 = (u, w) => u[0] * w[0] + u[1] * w[1] + u[2] * w[2];
    const u = s3(V.A, V.O), w = s3(V.B, V.O), ok = Math.abs(Math.acos(d3(u, w) / Math.sqrt(d3(u, u) * d3(w, w))) - Math.PI / 4) < 1e-9;
    const P = n => Pj(V[n]);
    return wrap(430, 280, [
      poly(["O", "A", "B"].map(P), "none", 0, ACCS), poly(["O", "B", "C"].map(P), "none", 0, GLDS),
      ...solidEdges(V, faces, view, Pj), ...["A", "B", "C", "D", "O"].map(n => dot(P(n), DIM, 3.4)),
      angleArc(P("O"), P("A"), P("B"), 34, GLD),
      txt(add(P("A"), [-10, 14]), "A"), txt(add(P("B"), [10, 14]), "B"), txt(add(P("C"), [12, 2]), "C", DIM, 13, "start"), txt(add(P("D"), [-10, -6]), "D"), txt(add(P("O"), [0, -10]), "O"),
      txt(add(P("O"), [-4, 52]), "45°", GLD, 11.5),
      cap(430, 280, "Pyramid OABCD on square ABCD with OA = OB = OC = OD and angle AOB = 45°; θ is the dihedral angle between the shaded faces OAB and OBC." + MM(ok))
    ]);
  })();

  // 2004 AIME II #1: the chord perpendicular to a radius at its midpoint.
  PROB["2004-aime-ii-1"] = (() => {
    const r = 108, O = [215, 128], R0 = onC(O, r, 0), Mq = mid(O, R0), [X, Y] = [onC(O, r, -60), onC(O, r, 60)];
    const ok = Math.abs(dist(mid(X, Y), Mq)) < 1e-9 && Math.abs((X[0] - Y[0])) < 1e-9;
    return wrap(430, 270, [
      circ(O, r, DIM, 2), seg(O, R0, FNT, 1.5), seg(X, Y, ACC, 2.2), rightAngle(Mq, R0, Y, 8),
      ticksOn(O, Mq, 1), ticksOn(Mq, R0, 1), dot(O, DIM, 3.4), dot(Mq, DIM, 3), dot(R0, DIM, 3),
      cap(430, 270, "A chord (blue) perpendicular to a radius at the midpoint of the radius, cutting the circle into two regions." + MM(ok))
    ]);
  })();

  // 2005 AIME I #11: a semicircle inside the square of side 8 (one of many, not the largest).
  PROB["2005-aime-i-11"] = (() => {
    const k = 26, Q = (x, y) => [111 + k * x, 238 - k * y], c = [4.1, 3.3], rr = 2.9, t = 20 * Math.PI / 180;
    const arc = Array.from({ length: 49 }, (_, i) => { const a = t + Math.PI * i / 48; return [c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]; });
    const ok = arc.every(([x, y]) => x > 0 && x < 8 && y > 0 && y < 8);
    const e1 = [c[0] + rr * Math.cos(t), c[1] + rr * Math.sin(t)], e2 = [c[0] - rr * Math.cos(t), c[1] - rr * Math.sin(t)];
    return wrap(430, 270, [
      poly([Q(0, 0), Q(8, 0), Q(8, 8), Q(0, 8)], DIM, 2), pline(arc.map(p => Q(...p)), ACC, 2), seg(Q(...e1), Q(...e2), ACC, 2),
      txt(add(Q(4, 0), [0, 18]), "8", DIM, 12.5), txt(add(Q(...mid(e1, e2)), [8, 18]), "d", ACC, 13),
      cap(430, 270, "A semicircle with diameter d inside a square of side 8. The question asks how large d can be." + MM(ok))
    ]);
  })();

  // 2007 AIME II #11: the head-on view at the start, the big tube rolling toward the small one.
  PROB["2007-aime-ii-11"] = (() => {
    const k = 1.1, Q = (x, y) => [342 + k * x, 222 - k * y];
    const S = Q(0, 24), Bc = Q(-215, 72), ok = 215 > Math.sqrt(96 * 96 - 48 * 48);
    return wrap(430, 270, [
      seg(Q(-300, 0), Q(78, 0), DIM, 2.4), circ(Bc, 72 * k, ACC, 2), circ(S, 24 * k, GLD, 2),
      seg(Bc, Q(-215, 0), FNT, 1.3, "4 3"), seg(S, Q(0, 0), FNT, 1.3, "4 3"), dot(Bc, ACC, 3), dot(S, GLD, 3),
      txt(add(mid(Bc, Q(-215, 0)), [8, 4]), "72", ACC, 12.5, "start"), txt(add(mid(S, Q(0, 0)), [8, 4]), "24", GLD, 12.5, "start"),
      seg(Q(-125, 60), Q(-80, 60), DIM, 1.6), poly([Q(-80, 64), Q(-72, 60), Q(-80, 56)], DIM, 1.2, DIM),
      cap(430, 270, "Head-on view: the tube of radius 72 rolls to the right, over the fixed tube of radius 24, and on along the ground." + MM(ok))
    ]);
  })();

  // 2012 AIME I #12: the right triangle with the right angle at C trisected by CD and CE.
  PROB["2012-aime-i-12"] = (() => {
    const a = 4 * Math.sqrt(3), b = 11, k = 23, Q = (x, y) => [100 + k * x, 222 - k * y];
    const Cp = Q(0, 0), Bp = Q(b, 0), Ap = Q(0, a);
    const ray = deg => add(Cp, [Math.cos(deg * Math.PI / 180) * 600, -Math.sin(deg * Math.PI / 180) * 600]);
    const Dp = lineInt(Cp, ray(60), Ap, Bp), Ep = lineInt(Cp, ray(30), Ap, Bp);
    const ok = Math.abs(dist(Dp, Ep) / dist(Bp, Ep) - 8 / 15) < 1e-9;
    return wrap(430, 270, [
      poly([Ap, Bp, Cp], DIM, 2), seg(Cp, Dp, ACC, 1.8), seg(Cp, Ep, ACC, 1.8), rightAngle(Cp, Ap, Bp, 10),
      angleArc(Cp, Bp, Ep, 34, GLD), angleArc(Cp, Ep, Dp, 40, GLD), angleArc(Cp, Dp, Ap, 46, GLD),
      ...[Ap, Bp, Cp, Dp, Ep].map(q => dot(q, DIM, 3.4)),
      txt(add(Ap, [-10, -4]), "A"), txt(add(Bp, [10, 14]), "B"), txt(add(Cp, [-10, 14]), "C"), txt(add(Dp, [6, -8]), "D", DIM, 13, "start"), txt(add(Ep, [6, -8]), "E", DIM, 13, "start"),
      cap(430, 270, "Right triangle ABC with the right angle at C split into three equal angles by CD and CE, with DE : BE = 8 : 15." + MM(ok))
    ]);
  })();

  // 2014 AIME II #11: triangle RED, the midpoint M, C with RC ⟂ EM, and A on DE extended with CA = AR.
  PROB["2014-aime-ii-11"] = (() => {
    const k = 240, Q = (x, y) => [258 + k * x, 244 - k * y];
    const D = Q(0.5, 0), E = Q(-Math.sqrt(3) / 2, 0), R = Q(0, Math.sqrt(3) / 2), M = mid(R, D);
    const c = (6 * Math.sqrt(3) - 3) / 22, C = Q(c, 0), A = Q(-Math.sqrt(3) / 2 - (7 - 3 * Math.sqrt(3)) / 22, 0);
    const d2 = (u, w) => (u[0] * w[0] + u[1] * w[1]);
    const ok = Math.abs(d2(sub(C, R), sub(M, E))) < 1e-6 && Math.abs(dist(A, C) - dist(A, R)) < 1e-9 && Math.abs(dist(R, D) / k - 1) < 1e-9;
    return wrap(430, 290, [
      poly([R, E, D], DIM, 2), seg(A, E, DIM, 2), seg(E, M, ACC, 1.8), seg(R, C, GLD, 1.8), seg(A, R, FNT, 1.4, "4 3"),
      ...[R, E, D, M, C, A].map(q => dot(q, DIM, 3.4)), ticksOn(R, M, 1), ticksOn(M, D, 1),
      txt(add(R, [0, -10]), "R"), txt(add(E, [4, 18]), "E"), txt(add(D, [10, 14]), "D"), txt(add(M, [10, -4]), "M", DIM, 13, "start"),
      txt(add(C, [0, 18]), "C"), txt(add(A, [-8, 18]), "A"), txt(add(lerp(R, D, 0.25), [12, -2]), "1", DIM, 12.5, "start"),
      txt(add(R, [-12, 34]), "75°", DIM, 11.5), txt(add(E, [40, -8]), "45°", DIM, 11.5),
      cap(430, 290, "Triangle RED with RD = 1, angle R = 75° and angle E = 45°; M is the midpoint of RD, RC ⟂ EM (gold and blue), and A on DE extended has CA = AR." + MM(ok))
    ]);
  })();

  // 2014 AIME II #14: triangle ABC with the altitude AH, the bisector AD, the midpoint M, N and P.
  PROB["2014-aime-ii-14"] = (() => {
    const s2 = Math.SQRT2, ac = 10 * Math.sin(105 * Math.PI / 180) / Math.sin(Math.PI / 4), k = 21, Q = (x, y) => [70 + k * x, 252 - k * y];
    const C = Q(0, 0), B = Q(5 * s2, 0), A = Q(ac / s2, ac / s2), H = Q(ac / s2, 0), M = Q(5 * s2 / 2, 0);
    const D = Q(5 * s2 * ac / (10 + ac), 0), N = mid(H, M), P = lineInt(A, D, N, add(N, [0, -1]));
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V))) * 180 / Math.PI;
    const ok = Math.abs(dist(A, B) / k - 10) < 1e-9 && Math.abs(ang(B, A, C) - 30) < 1e-9 && Math.abs(ang(B, A, D) - ang(D, A, C)) < 1e-9;
    return wrap(430, 300, [
      seg(C, H, FNT, 1.4, "4 3"), poly([A, B, C], DIM, 2), seg(A, H, FNT, 1.5, "5 4"), seg(A, D, ACC, 1.8), seg(P, N, GLD, 1.6, "5 4"),
      rightAngle(H, A, C, 8), rightAngle(N, P, C, 8),
      ...[A, B, C, H, D, M, N, P].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [6, 18]), "B"), txt(add(C, [-10, 14]), "C"), txt(add(H, [8, 18]), "H"),
      txt(add(D, [0, 18]), "D"), txt(add(M, [0, 18]), "M"), txt(add(N, [0, 18]), "N"), txt(add(P, [-10, -2]), "P", DIM, 13, "end"),
      txt(add(mid(A, B), [7, 0]), "10", DIM, 12.5, "start"), txt(add(A, [-40, 28]), "30°", DIM, 11.5), txt(add(C, [36, -8]), "45°", DIM, 11.5),
      cap(430, 300, "Triangle ABC with AB = 10, angle A = 30° and angle C = 45°. On line BC: the foot H of the altitude, the foot D of the bisector, the midpoint M, and N midway between H and M, with P on AD above N." + MM(ok))
    ]);
  })();

  // 2014 AMC 10A #22: the 20 by 10 rectangle and E on CD with angle CBE = 15°.
  PROB["2014-amc-10a-22"] = (() => {
    const k = 15, Q = (x, y) => [65 + k * x, 222 - k * y], ce = 10 * Math.tan(Math.PI / 12);
    const A = Q(0, 0), B = Q(20, 0), C = Q(20, 10), D = Q(0, 10), E = Q(20 - ce, 10);
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V))) * 180 / Math.PI;
    const ok = Math.abs(ang(C, B, E) - 15) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), seg(B, E, ACC, 2), seg(A, E, GLD, 2, "6 4"), angleArc(B, E, C, 46, ACC),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3.5)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"), txt(add(E, [0, -10]), "E"),
      txt(add(mid(A, B), [0, 18]), "20", DIM, 12.5), txt(add(mid(B, C), [12, 4]), "10", DIM, 12.5, "start"), txt(add(B, [-12, -54]), "15°", ACC, 11.5),
      cap(430, 270, "Rectangle ABCD with AB = 20 and BC = 10, and E on CD with angle CBE = 15°. The question asks for AE (dashed)." + MM(ok))
    ]);
  })();

  // 2018 AIME I #8: the equiangular hexagon with AB = 6, BC = 8, CD = 10, DE = 12.
  PROB["2018-aime-i-8"] = (() => {
    const sides = [6, 8, 10, 12, 2, 16], k = 9.2, names = "ABCDEF".split("");
    let p = [112, 238]; const V = [];
    sides.forEach((L, i) => { V.push(p); const t = -60 * i * Math.PI / 180; p = add(p, [k * L * Math.cos(t), k * L * Math.sin(t)]); });
    const ok = Math.abs(p[0] - V[0][0]) < 1e-9 && Math.abs(p[1] - V[0][1]) < 1e-9;
    const O = V.reduce((a, b) => add(a, mul(b, 1 / 6)), [0, 0]);
    return wrap(430, 290, [
      poly(V, DIM, 2), ...V.map(q => dot(q, DIM, 3.4)),
      ...V.map((q, i) => txt(add(q, mul(norm(sub(q, O)), 15)), names[i], DIM, 13)),
      ...[0, 1, 2, 3].map(i => { const Mq = mid(V[i], V[i + 1]); return txt(add(Mq, mul(norm(sub(Mq, O)), -16)), String(sides[i]), DIM, 12.5); }),
      cap(430, 290, "The equiangular hexagon ABCDEF (every angle 120°) with AB = 6, BC = 8, CD = 10 and DE = 12." + MM(ok))
    ]);
  })();

  // 2018 AIME II #4: the equiangular octagon CAROLINE and the self-intersecting octagon CORNELIA.
  PROB["2018-aime-ii-4"] = (() => {
    const k = 64, Q = (x, y) => [262 + k * x, 228 - k * y];
    const pts = { C: [0, 0], A: [1, 1], R: [1, 2], O: [0, 3], L: [-1, 3], I: [-2, 2], N: [-2, 1], E: [-1, 0] };
    const P = n => Q(...pts[n]);
    const ok = Math.abs(dist(P("C"), P("A")) / k - Math.SQRT2) < 1e-9 && Math.abs(dist(P("A"), P("R")) / k - 1) < 1e-9;
    const tris = [[[0, 0], [0, 4 / 3], [1, 1]], [[0, 5 / 3], [0, 3], [1, 2]], [[-2, 1], [-1, 4 / 3], [-1, 0]], [[-1, 3], [-1, 5 / 3], [-2, 2]],
      [[0, 4 / 3], [0, 5 / 3], [-0.5, 1.5]], [[-1, 4 / 3], [-1, 5 / 3], [-0.5, 1.5]]];
    return wrap(430, 290, [
      ...tris.map(t => poly(t.map(q => Q(...q)), "none", 0, ACCS)),
      poly("CAROLINE".split("").map(P), FNT, 1.5, "none", "4 3"), poly("CORNELIA".split("").map(P), ACC, 2),
      ...Object.keys(pts).map(n => dot(P(n), DIM, 3.4)),
      ...Object.keys(pts).map(n => txt(add(P(n), mul(norm(sub(P(n), Q(-0.5, 1.5))), 15)), n, DIM, 13)),
      cap(430, 290, "The equiangular octagon CAROLINE (dashed), with sides √2 and 1 alternating, and the self-intersecting octagon CORNELIA (blue), which encloses six triangles (shaded)." + MM(ok))
    ]);
  })();

  // 2022 AMC 10A #5: the unit square with the equilateral hexagon APQCRS.
  PROB["2022-amc-10a-5"] = (() => {
    const s = 2 - Math.SQRT2, t = 1 - s, k = 200, Q = (x, y) => [115 + k * x, 238 - k * y];
    const A = Q(0, 0), B = Q(1, 0), C = Q(1, 1), D = Q(0, 1), P = Q(1 - t, 0), Qq = Q(1, t), R = Q(t, 1), Sq = Q(0, 1 - t);
    const hex = [A, P, Qq, C, R, Sq], L = hex.map((q, i) => dist(q, hex[(i + 1) % 6]));
    const ok = L.every(x => Math.abs(x - L[0]) < 1e-9);
    return wrap(430, 270, [
      poly([A, B, C, D], FNT, 1.5), poly(hex, ACC, 2, ACCS), ...hex.map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(P, [0, 18]), "P"), txt(add(Qq, [12, 4]), "Q", DIM, 13, "start"), txt(add(R, [0, -10]), "R"), txt(add(Sq, [-12, 4]), "S", DIM, 13, "end"),
      cap(430, 270, "Square ABCD of side 1 with P, Q, R, S on its sides so that the hexagon APQCRS (blue) has six equal sides." + MM(ok))
    ]);
  })();

  // 2009 AIME I #12: the 12-35-37 triangle, the altitude CD and the circle on it as diameter.
  PROB["2009-aime-i-12"] = (() => {
    const k = 8.4, Q = (x, y) => [92 + k * x, 222 - k * y];
    // AB along the x-axis; D = (AD, 0) with AD = 144/37 and CD = 420/37.
    const ad = 144 / 37, cd = 420 / 37, A = Q(0, 0), B = Q(37, 0), C = Q(ad, cd), D = Q(ad, 0), O = Q(ad, cd / 2);
    const ok = Math.abs(dist(A, C) / k - 12) < 1e-9 && Math.abs(dist(B, C) / k - 35) < 1e-9;
    // I: the tangents from A and B (other than AB) meet at I; its tangent length is 37/3.
    const z = 37 / 3, r = cd / 2, tA = 2 * Math.atan(r / ad), tB = 2 * Math.atan(r / (37 - ad));
    const I = lineInt(A, add(A, [Math.cos(tA), -Math.sin(tA)]), B, add(B, [-Math.cos(tB), -Math.sin(tB)]));
    const okI = Math.abs(dist(A, I) / k - (ad + z)) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(C, D, FNT, 1.5), circ(O, r * k, ACC, 1.8), rightAngle(D, A, C, 8),
      seg(A, I, GLD, 1.6, "5 4"), seg(B, I, GLD, 1.6, "5 4"),
      ...[A, B, C, D, I].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [-10, -2]), "C", DIM, 13, "end"), txt(add(D, [0, 18]), "D"), txt(add(I, [0, -10]), "I", GLD),
      txt(add(mid(A, C), [-12, 0]), "12", DIM, 12.5, "end"), txt(add(mid(B, C), [8, -10]), "35", DIM, 12.5, "start"), txt(add(O, [r * k + 6, 0]), "ω", ACC, 14, "start"),
      cap(430, 300, "Right triangle ABC with AC = 12, BC = 35 and altitude CD; ω has diameter CD, and AI and BI (dashed) are the other tangents from A and B." + MM(ok && okI))
    ]);
  })();

  // 2016 AIME II #5: the chain of altitude feet C₁, C₂, … toward B.
  PROB["2016-aime-ii-5"] = (() => {
    const k = 4.4, Q = (x, y) => [30 + k * x, 200 - k * y];
    // Drawn as the 13-84-85 triangle the problem forces, to true shape: C₀ = (0, 0), B = (84, 0), A = (0, 13).
    const C0 = Q(0, 0), B = Q(84, 0), A = Q(0, 13);
    const pts = [C0, foot(C0, A, B)];
    for (let n = 2; n <= 60; n++) pts.push(foot(pts[n - 1], pts[n - 2], B));
    const ok = Math.abs(dist(pts[0], pts[1]) / k - 13 * 84 / 85) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C0], DIM, 2), pline(pts, ACC, 1.2), ...pts.slice(0, 3).map(q => dot(q, ACC, 2.6)),
      txt(add(A, [-10, -4]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C0, [-12, 14]), subT("C", "0")), txt(add(pts[1], [-4, -12]), subT("C", "1")), txt(add(pts[2], [8, 18]), subT("C", "2")),
      cap(430, 270, "The right triangle ABC₀ and the zigzag C₀C₁C₂… (blue): each new point is the foot of the altitude in the previous small right triangle, closing in on B. Drawn as the triangle the condition forces." + MM(ok))
    ]);
  })();

  // 2019 AIME I #6: quadrilateral KLMN with MN ⟂ KM, KL ⟂ LN, and the perpendicular from L to KN.
  PROB["2019-aime-i-6"] = (() => {
    const k = 1.75, Q = (x, y) => [130 + k * x, 140 - k * y];
    const K = Q(0, 0), M = Q(98, 0), N = Q(98, 65);  // KM = 98 is what the problem forces
    const kn = Math.hypot(98, 65), t = Math.atan2(65, 98) - Math.acos(28 / kn), L = Q(28 * Math.cos(t), 28 * Math.sin(t));
    const P = foot(L, K, N), O = lineInt(L, P, K, M);
    const ok = Math.abs(dist(K, O) / k - 8) < 1e-6 && Math.abs(dist(M, N) / k - 65) < 1e-9 && Math.abs(dist(K, L) / k - 28) < 1e-9;
    return wrap(430, 300, [
      poly([K, L, M, N], DIM, 2), seg(K, M, FNT, 1.5), seg(L, N, FNT, 1.5), seg(L, P, ACC, 1.8, "5 4"),
      rightAngle(M, K, N, 8), rightAngle(L, K, N, 8), rightAngle(P, L, N, 7),
      ...[K, L, M, N, O, P].map(q => dot(q, DIM, 3.2)),
      txt(add(K, [-12, 4]), "K", DIM, 13, "end"), txt(add(L, [0, 18]), "L"), txt(add(M, [12, 12]), "M", DIM, 13, "start"), txt(add(N, [10, -4]), "N", DIM, 13, "start"),
      txt(add(O, [4, -10]), "O", ACC), txt(add(P, [-8, -8]), "P", ACC, 13, "end"),
      txt(add(mid(M, N), [12, 4]), "65", DIM, 12.5, "start"), txt(add(mid(K, L), [-12, 6]), "28", DIM, 12.5, "end"),
      cap(430, 300, "Quadrilateral KLMN with MN ⟂ KM, KL ⟂ LN, MN = 65 and KL = 28; the line through L perpendicular to KN (dashed) meets KM at O, with KO = 8." + MM(ok))
    ]);
  })();

  // 2004 AIME I #4: the square of side 2 and some segments of length 2 with ends on adjacent sides.
  PROB["2004-aime-i-4"] = (() => {
    const k = 100, Q = (x, y) => [115 + k * x, 238 - k * y], angs = [0.35, 0.8, 1.2];
    const segs = [];
    angs.forEach(t => { segs.push([[2 * Math.cos(t), 0], [0, 2 * Math.sin(t)]]); segs.push([[2, 2 - 2 * Math.cos(t)], [2 - 2 * Math.sin(t), 2]]); });
    const ok = segs.every(([u, w]) => Math.abs(Math.hypot(u[0] - w[0], u[1] - w[1]) - 2) < 1e-9);
    return wrap(430, 270, [
      poly([Q(0, 0), Q(2, 0), Q(2, 2), Q(0, 2)], DIM, 2),
      ...segs.map(([u, w]) => seg(Q(...u), Q(...w), ACC, 1.6)), ...segs.map(([u, w]) => dot(Q((u[0] + w[0]) / 2, (u[1] + w[1]) / 2), GLD, 3.4)),
      txt(add(Q(1, 0), [0, 18]), "2", DIM, 12.5), txt(add(Q(0, 1), [-12, 4]), "2", DIM, 12.5, "end"),
      cap(430, 270, "The square of side 2 and a few of the segments in S (blue): each has length 2 and ends on two adjacent sides. Their midpoints (gold) are what enclose the region." + MM(ok))
    ]);
  })();

  // 2008 AIME II #5: the trapezoid with base angles 37° and 53°, and the midpoints M and N.
  PROB["2008-aime-ii-5"] = (() => {
    const r = Math.PI / 180, k = 0.17, Q = (x, y) => [44 + k * x, 238 - k * y];
    // Legs extended meet at E with a right angle; A = (0, 0), D = (2008, 0), E above.
    const E = [2008 * Math.cos(37 * r) * Math.cos(37 * r), 2008 * Math.cos(37 * r) * Math.sin(37 * r)], f = (2008 - 1000) / 2008;
    const A = Q(0, 0), D = Q(2008, 0), B = Q(...E.map(v => v * f)), C = Q(2008 + (E[0] - 2008) * f, E[1] * f);
    const M = mid(B, C), N = mid(A, D);
    const ok = Math.abs(dist(B, C) / k - 1000) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), seg(M, N, ACC, 2), dot(M, ACC, 3.4), dot(N, ACC, 3.4), ...[A, B, C, D].map(q => dot(q, DIM, 3.4)),
      angleArc(A, D, B, 34, GLD), angleArc(D, C, A, 30, GLD),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [-10, -4]), "B"), txt(add(C, [10, -4]), "C"), txt(add(D, [10, 14]), "D"),
      txt(add(M, [0, -10]), "M", ACC), txt(add(N, [0, 18]), "N", ACC),
      txt(add(A, [52, -10]), "37°", GLD, 11.5), txt(add(D, [-46, -10]), "53°", GLD, 11.5),
      txt(add(mid(B, C), [-40, -10]), "1000", DIM, 12), txt(add(mid(A, D), [60, 18]), "2008", DIM, 12),
      cap(430, 270, "Trapezoid ABCD with BC ∥ AD, BC = 1000, AD = 2008, angle A = 37° and angle D = 53°; M and N are the midpoints of the bases." + MM(ok))
    ]);
  })();

  // 2024 AMC 12A #7: the isosceles right triangle with the points P₁, …, P₂₀₂₄ evenly spaced on AC.
  PROB["2024-amc-12a-7"] = (() => {
    const k = 150, Q = (x, y) => [215 + k * x, 222 - k * y];
    const A = Q(-1, 0), C = Q(1, 0), B = Q(0, -1 + 2);  // AC = 2 on the x-axis, B at height 1
    const ok = Math.abs(dist(A, B) / k - Math.SQRT2) < 1e-9;
    const ticks = Array.from({ length: 9 }, (_, i) => lerp(A, C, (i + 1) / 10));
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), rightAngle(B, A, C, 10), ...ticks.map(q => seg(B, q, ACC, 1.1)), ...ticks.map(q => dot(q, ACC, 2.8)),
      ...[A, B, C].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [0, -10]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(mid(A, B), [-14, 0]), "√2", DIM, 12.5, "end"), txt(add(mid(B, C), [14, 0]), "√2", DIM, 12.5, "start"),
      cap(430, 270, "Triangle ABC with the right angle at B and BA = BC = √2. The 2024 points cut AC into 2025 equal parts; nine evenly spaced vectors from B stand in for them here." + MM(ok))
    ]);
  })();

  // 2008 AIME I #10: the isosceles trapezoid with 60° base angles and diagonals 10√21.
  PROB["2008-aime-i-10"] = (() => {
    const r7 = Math.sqrt(7), k = 5.2, Q = (x, y) => [78 + k * x, 222 - k * y];
    // AD = 20√7 and CD = 10√7 are what the conditions force; E is not drawn (it is part of the answer).
    const ad = 20 * r7, cd = 10 * r7, h = cd * Math.sqrt(3) / 2;
    const A = Q(0, 0), D = Q(ad, 0), B = Q(cd / 2, h), C = Q(ad - cd / 2, h), F = Q(ad - cd / 2, 0);
    const ok = Math.abs(dist(A, C) / k - 10 * Math.sqrt(21)) < 1e-9 && Math.abs(dist(B, D) / k - 10 * Math.sqrt(21)) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.4), seg(B, D, FNT, 1.4), seg(C, F, ACC, 1.6, "5 4"), rightAngle(F, C, D, 8),
      angleArc(A, D, B, 26, GLD), angleArc(D, C, A, 26, GLD),
      ...[A, B, C, D, F].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [-8, -8]), "B"), txt(add(C, [8, -8]), "C"), txt(add(D, [10, 14]), "D"), txt(add(F, [0, 18]), "F", ACC),
      txt(add(A, [36, -8]), "60°", GLD, 11.5), txt(add(D, [-51, -9]), "60°", GLD, 11.5), txt(add(lerp(A, C, 0.3), [11, -19]), "10√21", DIM, 12),
      cap(430, 270, "Isosceles trapezoid ABCD with AD ∥ BC, angles of 60° at the longer base AD and diagonals 10√21; F is the foot of the altitude from C. The point E, 10√7 from A and 30√7 from D, is to be placed." + MM(ok))
    ]);
  })();

  // 2024 AMC 12B #20: one triangle with AB = 40, AC = 42 and the median x from A.
  PROB["2024-amc-12b-20"] = (() => {
    const t = 68 * Math.PI / 180, k = 5.2, Q = (x, y) => [60 + k * x, 240 - k * y];
    const A = Q(0, 0), B = Q(40, 0), C = Q(42 * Math.cos(t), 42 * Math.sin(t)), M = mid(B, C);
    const ok = Math.abs(dist(A, C) / k - 42) < 1e-9 && Math.abs(dist(A, B) / k - 40) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, M, ACC, 2), dot(M, ACC, 3.4), ...[A, B, C].map(q => dot(q, DIM, 3.4)), ticksOn(B, M, 1), ticksOn(M, C, 1),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"),
      txt(add(mid(A, B), [0, 18]), "40", DIM, 12.5), txt(add(mid(A, C), [-12, 0]), "42", DIM, 12.5, "end"), txt(add(mid(A, M), [10, 10]), "x", ACC, 13, "start"),
      cap(430, 270, "One of the triangles: AB = 40, AC = 42, and the median from A to the midpoint of BC has length x. The area depends on the angle at A." + MM(ok))
    ]);
  })();

  // 2001 AIME I #7: triangle ABC (21, 22, 20) and DE through the incenter, parallel to BC.
  PROB["2001-aime-i-7"] = (() => {
    const k = 11.5, y0 = 258, Q = (x, y) => [90 + k * x, y0 - k * y], ax = 357 / 40, ay = Math.sqrt(441 - ax * ax);
    const A = Q(ax, ay), B = Q(0, 0), C = Q(20, 0);
    const a = 20, b = 22, c = 21, I = mul(add(add(mul(A, a), mul(B, b)), mul(C, c)), 1 / (a + b + c));
    const D = lineInt(I, add(I, [1, 0]), A, B), E = lineInt(I, add(I, [1, 0]), A, C);
    const ok = Math.abs(dist(A, C) / k - 22) < 1e-9 && Math.abs(dist(A, B) / k - 21) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), seg(D, E, ACC, 2), circ(I, (y0 - I[1]), FNT, 1.3, "none", "4 3"),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3.4)), dot(I, ACC, 3.4),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [-10, 4]), "D", DIM, 13, "end"), txt(add(E, [10, 4]), "E", DIM, 13, "start"),
      txt(add(mid(A, B), [-12, 0]), "21", DIM, 12.5, "end"), txt(add(mid(A, C), [12, 0]), "22", DIM, 12.5, "start"), txt(add(mid(B, C), [0, 18]), "20", DIM, 12.5),
      cap(430, 290, "Triangle ABC with AB = 21, AC = 22 and BC = 20; DE (blue) is parallel to BC and passes through the center of the inscribed circle (dashed)." + MM(ok))
    ]);
  })();

  // 2001 AIME II #7: the 90-120-150 triangle, its incircle C₁, the tangents ST and UV.
  PROB["2001-aime-ii-7"] = (() => {
    const k = 1.75, Q = (x, y) => [100 + k * x, 238 - k * y];
    const P = Q(0, 0), R = Q(120, 0), Qv = Q(0, 90), S = Q(60, 0), T = Q(60, 45), U = Q(0, 60), V = Q(40, 60);
    const ok = Math.abs(dist(Qv, R) / k - 150) < 1e-9 && Math.abs(dist(T, R) / k - 75) < 1e-9 && Math.abs(dist(Qv, V) / k - 50) < 1e-9;
    return wrap(430, 290, [
      poly([P, R, Qv], DIM, 2), circ(Q(30, 30), 30 * k, ACC, 1.6), seg(S, T, GLD, 1.8), seg(U, V, GLD, 1.8),
      circ(Q(75, 15), 15 * k, ACC, 1.4, "none", "4 3"), circ(Q(10, 70), 10 * k, ACC, 1.4, "none", "4 3"),
      rightAngle(P, R, Qv, 9), ...[P, R, Qv, S, T, U, V].map(q => dot(q, DIM, 3.2)),
      txt(add(P, [-10, 14]), "P"), txt(add(R, [10, 14]), "R"), txt(add(Qv, [-10, -4]), "Q"), txt(add(S, [0, 18]), "S"), txt(add(T, [8, -6]), "T", DIM, 13, "start"),
      txt(add(U, [-12, 4]), "U", DIM, 13, "end"), txt(add(V, [8, -6]), "V", DIM, 13, "start"),
      txt(add(Q(30, 30), [0, 4]), subT("C", "1"), ACC, 13), txt(add(mid(P, S), [0, 18]), "120", DIM, 12), txt(add(mid(P, Qv), [-12, 4]), "90", DIM, 12, "end"),
      cap(430, 290, "Right triangle PQR (PQ = 90, PR = 120, QR = 150) with incircle C₁. ST ⟂ PR and UV ⟂ PQ touch C₁ (gold); C₂ and C₃ (dashed) are the incircles of RST and QUV." + MM(ok))
    ]);
  })();

  // 2001 AIME II #12: the first step, a regular tetrahedron with one outward tetrahedron on a face's midpoint triangle.
  PROB["2001-aime-ii-12"] = (() => {
    const { Pj, view } = projector([215, 168], 62, [1, 0], [0.42, -0.36]);
    const V = { a: [1, 1, 1], b: [1, -1, -1], c: [-1, 1, -1], d: [-1, -1, 1] };
    const faces = [["a", "b", "c"], ["a", "b", "d"], ["a", "c", "d"], ["b", "c", "d"]];
    const m3 = (u, w) => u.map((x, i) => (x + w[i]) / 2), L3 = (u, w) => Math.hypot(...u.map((x, i) => x - w[i]));
    // the visible face seen most edge-on, so the new tetrahedron stands out sideways
    const outN = f => { const g = [0, 1, 2].map(i => f.reduce((t, n) => t + V[n][i], 0) / 3), l = Math.hypot(...g); return g.map(x => x / l); };
    const vl = Math.hypot(...view), dv = f => outN(f).reduce((t, x, i) => t + x * view[i], 0) / vl;
    const fc = faces.filter(f => dv(f) > 0.05).sort((f1, f2) => dv(f1) - dv(f2))[0];
    const M1 = m3(V[fc[0]], V[fc[1]]), M2 = m3(V[fc[1]], V[fc[2]]), M3 = m3(V[fc[2]], V[fc[0]]), G = [0, 1, 2].map(i => (M1[i] + M2[i] + M3[i]) / 3);
    const nrm = outN(fc), e = L3(M1, M2), hgt = e * Math.sqrt(2 / 3), X = G.map((x, i) => x + hgt * nrm[i]);
    const ok = Math.abs(L3(X, M1) - e) < 1e-9 && Math.abs(L3(X, M2) - e) < 1e-9 && Math.abs(e - L3(V.a, V.b) / 2) < 1e-9;
    const [p1, p2, p3, px] = [M1, M2, M3, X].map(Pj);
    return wrap(430, 290, [
      ...solidEdges(V, faces, view, Pj), poly([p1, p2, p3], ACC, 1.6, ACCS), seg(px, p1, ACC, 1.8), seg(px, p2, ACC, 1.8), seg(px, p3, ACC, 1.8),
      ...[p1, p2, p3, px].map(q => dot(q, ACC, 3)),
      cap(430, 290, "One step of the construction: on the midpoint triangle of a face (shaded) an outward regular tetrahedron is built (blue). Doing this on every face of the regular tetrahedron of volume 1 gives the next polyhedron." + MM(ok))
    ]);
  })();

  // 2001 AIME II #13: quadrilateral ABCD with the two pairs of equal angles.
  PROB["2001-aime-ii-13"] = (() => {
    const ad = Math.sqrt(60), de = 1.6 * ad, dm = de / 2, bm = Math.sqrt(100 - dm * dm), k = 17, Q = (x, y) => [80 + k * x, 36 + k * y];
    const D = Q(0, 0), A = Q(ad, 0), Bp = Q(dm, bm), Ep = Q(de, 0), C = add(Bp, mul(sub(Bp, Ep), 0.6));
    const ang = (X, Vv, Y) => Math.acos(((X[0] - Vv[0]) * (Y[0] - Vv[0]) + (X[1] - Vv[1]) * (Y[1] - Vv[1])) / (dist(X, Vv) * dist(Y, Vv)));
    const ok = Math.abs(ang(Bp, A, D) - ang(A, D, C)) < 1e-9 && Math.abs(ang(A, Bp, D) - ang(Bp, C, D)) < 1e-9 && Math.abs(dist(A, Bp) / k - 8) < 1e-9 && Math.abs(dist(Bp, C) / k - 6) < 1e-9;
    return wrap(430, 290, [
      poly([A, Bp, C, D], DIM, 2), seg(Bp, D, FNT, 1.5), ...[A, Bp, C, D].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [8, -8]), "A", DIM, 13, "start"), txt(add(Bp, [12, 6]), "B", DIM, 13, "start"), txt(add(C, [-4, 18]), "C"), txt(add(D, [-12, -2]), "D", DIM, 13, "end"),
      txt(add(mid(A, Bp), [12, -2]), "8", DIM, 12.5, "start"), txt(add(mid(Bp, D), [8, -8]), "10", DIM, 12.5), txt(add(mid(Bp, C), [10, 10]), "6", DIM, 12.5, "start"),
      cap(430, 290, "Quadrilateral ABCD with angle BAD = angle ADC and angle ABD = angle BCD, AB = 8, BD = 10 and BC = 6." + MM(ok))
    ]);
  })();

  // 2001 AIME II #15: the cube of edge 8 and the tunnel through I, J, K parallel to the diagonal AE.
  PROB["2001-aime-ii-15"] = (() => {
    const { Pj, view } = projector([150, 246], 17, [1, 0], [0.56, -0.33]);
    const V = { E: [0, 0, 0], F: [8, 0, 0], G: [8, 8, 0], H: [0, 8, 0], C: [0, 0, 8], D: [8, 0, 8], A: [8, 8, 8], B: [0, 8, 8] };
    const faces = [["E", "F", "G", "H"], ["C", "D", "A", "B"], ["E", "F", "D", "C"], ["H", "G", "A", "B"], ["E", "H", "B", "C"], ["F", "G", "A", "D"]];
    const I3 = [2, 0, 0], J3 = [0, 2, 0], K3 = [0, 0, 2], out = q => q.map(x => x + 8 - Math.max(...q));
    const ok = [I3, J3, K3].every(q => Math.max(...out(q)) === 8) && Math.hypot(...V.A) === 8 * Math.sqrt(3);
    const [i, j, kk] = [I3, J3, K3].map(Pj);
    return wrap(430, 300, [
      ...solidEdges(V, faces, view, Pj, FNT, 1.5),
      poly([i, j, kk], ACC, 1.8), ...[I3, J3, K3].map(q => seg(Pj(q), Pj(out(q)), ACC, 1.5, "6 3")),
      ...[i, j, kk].map(q => dot(q, ACC, 3)), ...["E", "A", "F", "H", "C"].map(n => dot(Pj(V[n]), DIM, 3)),
      txt(add(Pj(V.E), [-10, 14]), "E"), txt(add(Pj(V.A), [10, -6]), "A"), txt(add(Pj(V.F), [10, 14]), "F"), txt(add(Pj(V.H), [10, 12]), "H"), txt(add(Pj(V.C), [-12, -2]), "C", DIM, 13, "end"),
      txt(add(i, [0, 18]), "I", ACC), txt(add(j, [12, 6]), "J", ACC), txt(add(kk, [-12, 4]), "K", ACC, 13, "end"),
      cap(430, 300, "The cube with EC = 8 and EI = EJ = EK = 2. The tunnel's walls contain IJ, JK and KI and run parallel to the diagonal AE; the dashed blue lines are the tunnel's edges." + MM(ok))
    ]);
  })();

  // 2002 AIME II #13: triangle ABC, the cevians AD and BE meeting at P, and PQ ∥ CA, PR ∥ CB.
  PROB["2002-aime-ii-13"] = (() => {
    const k = 42, Q0 = (x, y) => [68 + k * x, 238 - k * y], cx = 31 / 16, cy = Math.sqrt(16 - cx * cx);
    const A = Q0(0, 0), B = Q0(8, 0), C = Q0(cx, cy), D = add(C, mul(sub(B, C), 2 / 7)), E = add(C, mul(sub(A, C), 1 / 4));
    const P = lineInt(A, D, B, E), Qp = lineInt(P, add(P, sub(A, C)), A, B), R = lineInt(P, add(P, sub(B, C)), A, B);
    const ok = Math.abs(dist(B, C) / k - 7) < 1e-9 && Math.abs(dist(A, C) / k - 4) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), seg(A, D, FNT, 1.5), seg(B, E, FNT, 1.5), poly([P, Qp, R], ACC, 1.8, ACCS),
      ...[A, B, C, D, E, P, Qp, R].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [10, -4]), "D", DIM, 13, "start"), txt(add(E, [-10, -2]), "E", DIM, 13, "end"),
      txt(add(P, [0, -10]), "P", ACC), txt(add(Qp, [0, 18]), "Q", ACC), txt(add(R, [0, 18]), "R", ACC), txt(add(mid(A, B), [0, 18]), "8", DIM, 12.5),
      cap(430, 290, "Triangle ABC with AB = 8, D on BC (CD = 2, DB = 5), E on AC (CE = 1, EA = 3); AD and BE meet at P, and PQ ∥ CA, PR ∥ CB with Q and R on AB." + MM(ok))
    ]);
  })();

  // 2002 AIME II #14: the right triangle APM and the circle of radius 19 centered on AP.
  PROB["2002-aime-ii-14"] = (() => {
    const k = 4.3, Q = (x, y) => [100 + k * x, 196 - k * y];
    // AM = 38 and AP = 152/3 are what the conditions force; only the perimeter 152 is labelled.
    const A = Q(0, 0), P = Q(152 / 3, 0), M = Q(0, 38), O = Q(19, 0);
    const ok = Math.abs((dist(A, P) + dist(P, M) + dist(M, A)) / k - 152) < 1e-9 && Math.abs(dist(O, foot(O, P, M)) / k - 19) < 1e-9;
    return wrap(430, 300, [
      poly([A, P, M], DIM, 2), circ(O, 19 * k, ACC, 1.8), rightAngle(A, P, M, 9), seg(O, foot(O, P, M), ACC, 1.4, "4 3"), dot(O, ACC, 3.4),
      ...[A, P, M].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(P, [10, 14]), "P"), txt(add(M, [-10, -4]), "M"), txt(add(O, [0, 18]), "O", ACC), txt(add(mid(O, foot(O, P, M)), [10, 4]), "19", ACC, 12, "start"),
      cap(430, 300, "Triangle APM with a right angle at A and perimeter 152; the circle of radius 19 centered at O on AP touches AM and PM." + MM(ok))
    ]);
  })();

  // 2003 AIME II #4: a regular tetrahedron and the smaller tetrahedron on its four face centers.
  PROB["2003-aime-ii-4"] = (() => {
    const { Pj, view } = projector([215, 150], 70, [1, 0], [0.42, -0.36]);
    const V = { a: [1, 1, 1], b: [1, -1, -1], c: [-1, 1, -1], d: [-1, -1, 1] };
    const faces = [["a", "b", "c"], ["a", "b", "d"], ["a", "c", "d"], ["b", "c", "d"]];
    const cen = f => [0, 1, 2].map(i => f.reduce((t, n) => t + V[n][i], 0) / 3), Cs = faces.map(cen);
    const L3 = (u, w) => Math.hypot(...u.map((x, i) => x - w[i]));
    const ok = Math.abs(L3(Cs[0], Cs[1]) * 3 - L3(V.a, V.b)) < 1e-9;
    const pc = Cs.map(Pj), pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    return wrap(430, 290, [
      ...solidEdges(V, faces, view, Pj, FNT, 1.6), ...pairs.map(([x, y]) => seg(pc[x], pc[y], ACC, 1.6)), ...pc.map(q => dot(q, ACC, 3)),
      cap(430, 290, "A regular tetrahedron (gray) and the smaller tetrahedron (blue) whose vertices are the centers of its four faces." + MM(ok))
    ]);
  })();

  // 2004 AIME I #9: the 3-4-5 triangle and the 6-by-7 rectangle, before the cuts.
  PROB["2004-aime-i-9"] = (() => {
    const k = 26, T = [[30, 222], [30 + 4 * k, 222], [30, 222 - 3 * k]], R0 = [200, 222];
    const Rr = [R0, add(R0, [7 * k, 0]), add(R0, [7 * k, -6 * k]), add(R0, [0, -6 * k])];
    const ok = Math.abs(dist(T[1], T[2]) / k - 5) < 1e-9;
    return wrap(430, 270, [
      poly(T, DIM, 2), rightAngle(T[0], T[1], T[2], 9), poly(Rr, DIM, 2),
      txt(add(mid(T[0], T[1]), [0, 18]), "4", DIM, 12.5), txt(add(mid(T[0], T[2]), [-12, 4]), "3", DIM, 12.5, "end"), txt(add(mid(T[1], T[2]), [12, -4]), "5", DIM, 12.5, "start"),
      txt(add(mid(Rr[0], Rr[1]), [0, 18]), "7", DIM, 12.5), txt(add(mid(Rr[1], Rr[2]), [12, 4]), "6", DIM, 12.5, "start"),
      txt(add(T[2], [0, -10]), "ABC", DIM, 12), txt(add(Rr[3], [0, -10]), "DEFG", DIM, 12, "start"),
      cap(430, 270, "The 3-4-5 triangle ABC and the 6-by-7 rectangle DEFG. One segment cuts each into a triangle and a trapezoid, with the two triangles similar and the two trapezoids similar." + MM(ok))
    ]);
  })();

  // 2004 AIME I #10: the 15-by-36 rectangle, its diagonal AC and a circle of radius 1.
  PROB["2004-aime-i-10"] = (() => {
    const k = 10.4, Q = (x, y) => [28 + k * x, 216 - k * y];
    const A = Q(0, 0), B = Q(36, 0), C = Q(36, 15), D = Q(0, 15), O = Q(25, 4.5);
    const ok = 25 > 1 && 25 < 35 && 4.5 > 1 && 4.5 < 14;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), seg(A, C, ACC, 1.8), circ(O, k, GLD, 1.8), poly([Q(1, 1), Q(35, 1), Q(35, 14), Q(1, 14)], FNT, 1.2, "none", "4 3"),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(mid(A, B), [0, 18]), "36", DIM, 12.5), txt(add(mid(B, C), [12, 4]), "15", DIM, 12.5, "start"),
      cap(430, 270, "The 15-by-36 rectangle with diagonal AC and a circle of radius 1 (gold) placed inside it; its center can be anywhere in the dashed rectangle." + MM(ok))
    ]);
  })();

  // 2004 AIME I #11: the cone (height 4, radius 3) and a plane parallel to the base.
  PROB["2004-aime-i-11"] = (() => {
    const k = 52, Ax = [215, 40], base = 40 + 4 * k, cut = 40 + 2.2 * k, rb = 3 * k, rc = 3 * k * 2.2 / 4, sq = 0.28;
    const ok = Math.abs(rb / (base - 40) - 0.75) < 1e-9;
    return wrap(430, 300, [
      seg(Ax, [215 - rb, base], DIM, 2), seg(Ax, [215 + rb, base], DIM, 2),
      ell([215, base], rb, rb * sq, DIM, 2), ell([215, cut], rc, rc * sq, ACC, 1.8, "5 4"),
      seg([215, base], [215 + rb, base], FNT, 1.3, "4 3"), seg(Ax, [215, base], FNT, 1.3, "4 3"),
      txt([215 + rb / 2, base + 16], "3", DIM, 12.5), txt([205, (40 + base) / 2 + 30], "4", DIM, 12.5, "end"),
      txt([215 + rc + 10, cut], "cut", ACC, 12, "start"),
      cap(430, 300, "The painted cone of height 4 and base radius 3, cut by a plane parallel to the base (dashed) into a small cone 𝒞 and a frustum ℱ." + MM(ok))
    ]);
  })();

  // 2004 AIME II #13: the pentagon ABCDE with its three pairs of parallel lines.
  PROB["2004-aime-ii-13"] = (() => {
    const k = 17, Q = (x, y) => [200 + k * x, 262 - k * y], kk = 15 / 7;
    const B3 = [0, 0], A3 = [3, 0], C3 = [5 * Math.cos(2 * Math.PI / 3), 5 * Math.sin(2 * Math.PI / 3)], F3 = [A3[0] + C3[0], A3[1] + C3[1]];
    const D3 = F3.map((f, i) => f - kk * (A3[i] - f)), E3 = F3.map((f, i) => f - kk * (C3[i] - f));
    const [A, B, C, D, E] = [A3, B3, C3, D3, E3].map(q => Q(...q));
    const cr = (u, w) => (u[0] * w[1] - u[1] * w[0]);
    const ok = Math.abs(cr(sub(B, A), sub(E, C))) < 1e-6 && Math.abs(cr(sub(C, B), sub(D, A))) < 1e-6 && Math.abs(dist(D, E) / k - 15) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C, D, E].map(q => q), DIM, 2), seg(A, C, FNT, 1.4), seg(A, D, FNT, 1.4), seg(C, E, FNT, 1.4), poly([E, B, D], "none", 0, ACCS),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3.4)), angleArc(B, A, C, 16, GLD),
      txt(add(A, [10, 10]), "A", DIM, 13, "start"), txt(add(B, [0, 18]), "B"), txt(add(C, [-12, 2]), "C", DIM, 13, "end"), txt(add(D, [10, -4]), "D", DIM, 13, "start"), txt(add(E, [-10, -6]), "E", DIM, 13, "end"),
      txt(add(mid(A, B), [0, 18]), "3", DIM, 12.5), txt(add(mid(B, C), [-12, 2]), "5", DIM, 12.5, "end"), txt(add(mid(D, E), [0, -10]), "15", DIM, 12.5), txt(add(B, [16, -18]), "120°", GLD, 11),
      cap(430, 290, "Pentagon ABCDE with AB ∥ CE, BC ∥ AD and AC ∥ DE, angle ABC = 120°, AB = 3, BC = 5 and DE = 15; triangle EBD is shaded." + MM(ok))
    ]);
  })();

  // 2006 AIME II #12: the equilateral triangle in its circle, D and E on the extended sides, F and G.
  PROB["2006-aime-ii-12"] = (() => {
    const k = 17, Q = (x, y) => [24 + k * x, 140 - k * y], u = d => [Math.cos(d * Math.PI / 180), Math.sin(d * Math.PI / 180)];
    const A3 = [0, 0], B3 = mul(u(-30), 2 * Math.sqrt(3)), C3 = mul(u(30), 2 * Math.sqrt(3)), D3 = mul(u(-30), 13), E3 = mul(u(30), 11), F3 = add(D3, E3);
    const t = 2 * (F3[0] * 2) / (F3[0] ** 2 + F3[1] ** 2), G3 = mul(F3, t);  // second meeting of line AF with the circle (x − 2)² + y² = 4
    const [A, B, C, D, E, F, G, O] = [A3, B3, C3, D3, E3, F3, G3, [2, 0]].map(q => Q(...q));
    const ok = Math.abs(Math.hypot(G3[0] - 2, G3[1]) - 2) < 1e-9 && Math.abs(Math.hypot(B3[0] - 2, B3[1]) - 2) < 1e-9;
    return wrap(430, 290, [
      circ(O, 2 * k, DIM, 1.8), seg(A, D, DIM, 1.8), seg(A, E, DIM, 1.8), seg(B, C, DIM, 1.8), seg(D, F, FNT, 1.5, "5 4"), seg(E, F, FNT, 1.5, "5 4"), seg(A, F, ACC, 1.6),
      poly([C, B, G], "none", 0, ACCS), ...[A, B, C, D, E, F, G].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [0, 18]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [0, 18]), "D"), txt(add(E, [0, -10]), "E"),
      txt(add(F, [10, 4]), "F", DIM, 13, "start"), txt(add(G, [10, 4]), "G", ACC, 13, "start"),
      txt(add(mid(A, D), [-6, 18]), "13", DIM, 12.5), txt(add(mid(A, E), [-6, -10]), "11", DIM, 12.5),
      cap(430, 290, "Equilateral ABC in a circle of radius 2, AD = 13 along AB and AE = 11 along AC, the parallels through D and E (dashed) meeting at F, and G where AF meets the circle again; triangle CBG is shaded." + MM(ok))
    ]);
  })();

  // 2008 AIME I #2: square AIME and the isosceles triangle GEM on its side EM.
  PROB["2008-aime-i-2"] = (() => {
    const k = 8.4, Q = (x, y) => [215 + k * x, 252 - k * y];  // the altitude 25 is what the area forces
    const E = Q(-5, 0), M = Q(5, 0), I = Q(5, 10), A = Q(-5, 10), G = Q(0, 25), X = lineInt(G, E, A, I), Y = lineInt(G, M, A, I);
    const ok = Math.abs(((10 + dist(X, Y) / k) / 2) * 10 - 80) < 1e-9;
    return wrap(430, 290, [
      poly([E, X, Y, M], "none", 0, ACCS), poly([A, I, M, E], DIM, 2), poly([G, E, M], ACC, 2),
      ...[A, I, M, E, G].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(I, [10, 4]), "I", DIM, 13, "start"), txt(add(M, [10, 14]), "M"), txt(add(E, [-10, 14]), "E"), txt(add(G, [0, -10]), "G", ACC),
      txt(add(mid(E, M), [0, 18]), "10", DIM, 12.5),
      cap(430, 290, "Square AIME of side 10 and isosceles triangle GEM on base EM (blue); the region they share (shaded) has area 80." + MM(ok))
    ]);
  })();

  // 2008 AIME I #14: diameter AB, C beyond A, the tangent CT and the foot P from A.
  PROB["2008-aime-i-14"] = (() => {
    const k = 8, x = 24, Q = (a, b) => [330 + k * a, 160 - k * b];  // O at the origin, C at (−24, 0); one of many positions of C
    const O = Q(0, 0), A = Q(-9, 0), B = Q(9, 0), C = Q(-x, 0), th = Math.acos(9 / x), T = Q(-9 * Math.cos(th), 9 * Math.sin(th)), P = foot(A, C, T);
    const ok = Math.abs(dist(O, T) / k - 9) < 1e-9 && Math.abs((T[0] - O[0]) * (T[0] - C[0]) + (T[1] - O[1]) * (T[1] - C[1])) < 1e-6;
    return wrap(430, 270, [
      circ(O, 9 * k, DIM, 1.8), seg(C, B, DIM, 1.6), seg(C, add(T, mul(sub(T, C), 0.25)), ACC, 1.8), seg(A, P, GLD, 1.6, "5 4"), seg(B, P, GLD, 1.8), seg(O, T, FNT, 1.3, "4 3"),
      rightAngle(P, A, C, 7), rightAngle(T, O, C, 7), ...[O, A, B, C, T, P].map(q => dot(q, DIM, 3.2)),
      txt(add(C, [-10, 14]), "C"), txt(add(A, [-4, 18]), "A"), txt(add(B, [10, 14]), "B"), txt(add(O, [0, 18]), "O"), txt(add(T, [4, -10]), "T"), txt(add(P, [-6, -10]), "P", GLD),
      cap(430, 270, "Circle ω with diameter AB = 18, C on AB extended past A, the tangent CT (blue) and the foot P of the perpendicular from A; BP is gold. C can be anywhere on the ray." + MM(ok))
    ]);
  })();

  // 2009 AIME II #3: rectangle ABCD with AB = 100, E the midpoint of AD and AC ⟂ BE.
  PROB["2009-aime-ii-3"] = (() => {
    const ad = 100 * Math.SQRT2, k = 1.5, Q = (x, y) => [140 + k * x, 250 - k * y];  // AD = 100√2 is what the condition forces
    const A = Q(0, 0), B = Q(100, 0), C = Q(100, ad), D = Q(0, ad), E = Q(0, ad / 2);
    const ok = Math.abs((C[0] - A[0]) * (E[0] - B[0]) + (C[1] - A[1]) * (E[1] - B[1])) < 1e-6;
    const X = lineInt(A, C, B, E);
    return wrap(430, 290, [
      poly([A, B, C, D], DIM, 2), seg(A, C, ACC, 1.8), seg(B, E, GLD, 1.8), rightAngle(X, C, E, 8), ...[A, B, C, D, E].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"), txt(add(E, [-12, 4]), "E", DIM, 13, "end"),
      txt(add(mid(A, B), [0, 18]), "100", DIM, 12.5),
      cap(430, 290, "Rectangle ABCD with AB = 100 and E the midpoint of AD, with AC ⟂ BE." + MM(ok))
    ]);
  })();

  // 2010 AIME II #9: the regular hexagon, its side midpoints, the six segments and the small hexagon.
  PROB["2010-aime-ii-9"] = (() => {
    const O = [215, 132], R = 112, names = "ABCDEF".split(""), V = names.map((_, i) => onC(O, R, 180 + 60 * i)), Mds = V.map((v, i) => mid(v, V[(i + 1) % 6]));
    const segs = V.map((v, i) => [v, Mds[(i + 1) % 6]]);  // A to H (midpoint of BC), B to I, …
    const inner = segs.map((sg, i) => lineInt(sg[0], sg[1], segs[(i + 5) % 6][0], segs[(i + 5) % 6][1]));
    const side = dist(inner[0], inner[1]), ok = Math.abs(side / R - 4 / Math.sqrt(7) / 2) < 1e-9;
    const mnames = "GHIJKL".split("");
    return wrap(430, 290, [
      poly(inner, "none", 0, ACCS), poly(V, DIM, 2), ...segs.map(([p, q]) => seg(p, q, ACC, 1.4)),
      ...V.map(q => dot(q, DIM, 3.2)), ...Mds.map(q => dot(q, DIM, 2.6)),
      ...V.map((q, i) => txt(add(q, mul(norm(sub(q, O)), 15)), names[i], DIM, 13)), ...Mds.map((q, i) => txt(add(q, mul(norm(sub(q, O)), 14)), mnames[i], DIM, 11.5)),
      cap(430, 290, "Regular hexagon ABCDEF with side midpoints G to L. The segments AH, BI, CJ, DK, EL, FG (blue) bound the smaller regular hexagon (shaded)." + MM(ok))
    ]);
  })();

  // 2013 AIME I #13: triangle AB₀C₀ (12, 17, 25) and the nested similar triangles.
  PROB["2013-aime-i-13"] = (() => {
    const k = 15, Q = (x, y) => [28 + k * x, 220 - k * y], r = 336 / 625;
    const B0 = [9.6, 7.2], C0 = [25, 0], Bs = [B0], Cs = [C0];
    for (let n = 1; n <= 6; n++) { Bs.push(mul(Bs[n - 1], r)); Cs.push(mul(Cs[n - 1], r)); }
    const L = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1]);
    const ok = Math.abs(L(B0, C0) - 17) < 1e-9 && Math.abs(L(B0, [0, 0]) - 12) < 1e-9 && Math.abs(L(Cs[1], C0) - 289 / 25) < 1e-9;
    const P = q => Q(...q);
    return wrap(430, 290, [
      ...[1, 2, 3, 4, 5, 6].map(n => poly([P(Bs[n - 1]), P(Cs[n]), P(Bs[n])], "none", 0, ACCS)),
      poly([Q(0, 0), P(B0), P(C0)], DIM, 2), ...[1, 2, 3, 4].map(n => seg(P(Bs[n]), P(Cs[n]), FNT, 1.3)), ...[1, 2, 3, 4].map(n => seg(P(Bs[n - 1]), P(Cs[n]), FNT, 1.3)),
      dot(Q(0, 0), DIM, 3.4), dot(P(B0), DIM, 3.4), dot(P(C0), DIM, 3.4), dot(P(Bs[1]), DIM, 3), dot(P(Cs[1]), DIM, 3),
      txt(add(Q(0, 0), [-10, 14]), "A"), txt(add(P(B0), [0, -10]), subT("B", "0")), txt(add(P(C0), [10, 14]), subT("C", "0")), txt(add(P(Bs[1]), [-8, -8]), subT("B", "1"), DIM, 12, "end"), txt(add(P(Cs[1]), [0, 18]), subT("C", "1"), DIM, 12),
      txt(add(lerp(Q(0, 0), P(B0), 0.8), [-12, -2]), "12", DIM, 12.5, "end"), txt(add(mid(P(B0), P(C0)), [12, -4]), "17", DIM, 12.5, "start"),
      cap(430, 290, "Triangle AB₀C₀ with AB₀ = 12, B₀C₀ = 17 and C₀A = 25, and the points Bₙ, Cₙ closing in on A; the triangles Bₙ₋₁CₙBₙ are shaded." + MM(ok))
    ]);
  })();

  // 2013 AIME II #10: the circle of radius √13, the point A, the nearest point B and one line through A.
  PROB["2013-aime-ii-10"] = (() => {
    const r = Math.sqrt(13), k = 22, Q = (x, y) => [118 + k * x, 140 - k * y], a = 4 + r, tilt = 0.32;
    const O = Q(0, 0), A = Q(a, 0), B = Q(r, 0), dir = [-Math.cos(tilt), Math.sin(tilt)];
    const ints = circleLineInts(O, r * k, A, add(A, [dir[0], -dir[1]]));
    const ok = ints.length === 2 && Math.abs(dist(O, ints[0]) / k - r) < 1e-9;
    const [K, Lp] = ints;
    return wrap(430, 290, [
      circ(O, r * k, DIM, 1.8), seg(O, A, FNT, 1.4), seg(A, dist(A, K) > dist(A, Lp) ? K : Lp, ACC, 1.6), poly([B, K, Lp], "none", 0, ACCS), poly([B, K, Lp], GLD, 1.4),
      ...[O, A, B, K, Lp].map(q => dot(q, DIM, 3.2)),
      txt(add(O, [0, 18]), "O"), txt(add(A, [10, 14]), "A"), txt(add(B, [8, 16]), "B"), txt(add(K, [0, -10]), "K"), txt(add(Lp, [0, -10]), "L"),
      txt(add(mid(B, A), [0, 16]), "4", DIM, 12.5), txt(add(mid(O, B), [0, 16]), "√13", DIM, 12.5),
      cap(430, 290, "The circle of radius √13 about O, the point A at distance 4 + √13, the nearest point B, and one line through A meeting the circle at K and L; triangle BKL is shaded." + MM(ok))
    ]);
  })();

  // 2015 AIME II #7: triangle ABC (12, 25, 17) and a rectangle PQRS standing on BC.
  PROB["2015-aime-ii-7"] = (() => {
    const k = 15, Q0 = (x, y) => [28 + k * x, 232 - k * y], t = 3.2;
    const B = Q0(0, 0), C = Q0(25, 0), A = Q0(9.6, 7.2), P = lineInt(Q0(0, t), Q0(25, t), A, B), Qq = lineInt(Q0(0, t), Q0(25, t), A, C);
    const S = [P[0], B[1]], R = [Qq[0], B[1]];
    const ok = Math.abs(dist(A, B) / k - 12) < 1e-9 && Math.abs(dist(A, C) / k - 17) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), poly([P, Qq, R, S], ACC, 1.8, ACCS), ...[A, B, C, P, Qq, R, S].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(P, [-10, -4]), "P", DIM, 13, "end"), txt(add(Qq, [10, -4]), "Q", DIM, 13, "start"),
      txt(add(R, [0, 18]), "R"), txt(add(S, [0, 18]), "S"), txt(add(mid(P, Qq), [0, -8]), "w", ACC, 13),
      txt(add(lerp(A, B, 0.3), [-12, 0]), "12", DIM, 12.5, "end"), txt(add(lerp(A, C, 0.3), [12, -4]), "17", DIM, 12.5, "start"), txt(add(mid(B, C), [0, 18]), "25", DIM, 12.5),
      cap(430, 270, "Triangle ABC with AB = 12, BC = 25, CA = 17 and a rectangle PQRS with P on AB, Q on AC and R, S on BC; PQ = w." + MM(ok))
    ]);
  })();

  // 2015 AIME II #11: the circumcircle, O, the line through O perpendicular to OB, and P, Q.
  PROB["2015-aime-ii-11"] = (() => {
    // R = 3 and sin A = 2/3 are what BC = 4 and BQ = 4.5 force.
    const k = 38, O = [215, 150], r = 3 * k, aBC = 2 * Math.asin(2 / 3) * 180 / Math.PI, aAB = 2 * Math.asin(5 / 6) * 180 / Math.PI;
    const B = onC(O, r, 150), C = onC(O, r, 150 - aBC), A = onC(O, r, 150 + aAB), u = perp(norm(sub(B, O)));
    const P = lineInt(O, add(O, u), A, B), Qq = lineInt(O, add(O, u), B, C);
    const ok = Math.abs(dist(A, B) / k - 5) < 1e-9 && Math.abs(dist(B, C) / k - 4) < 1e-9 && Math.abs(dist(B, Qq) / k - 4.5) < 1e-9;
    return wrap(430, 300, [
      circ(O, r, FNT, 1.5), poly([A, B, C], DIM, 2), seg(B, Qq, DIM, 1.4, "4 3"), seg(O, B, FNT, 1.4), seg(P, Qq, ACC, 1.8), rightAngle(O, B, Qq, 8),
      ...[A, B, C, O, P, Qq].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-12, 4]), "B", DIM, 13, "end"), txt(add(C, [6, 16]), "C"), txt(add(O, [-4, 16]), "O"), txt(add(P, [-10, -6]), "P", ACC, 13, "end"), txt(add(Qq, [10, 4]), "Q", ACC, 13, "start"),
      cap(430, 300, "Acute triangle ABC (AB = 5, BC = 4) in its circumcircle with center O. The line through O perpendicular to OB (blue) meets AB at P and BC extended at Q, with BQ = 4.5." + MM(ok))
    ]);
  })();

  // 2016 AIME II #7: the three squares, ABCD, IJKL inscribed in it, and EFGH inscribed in IJKL.
  PROB["2016-aime-ii-7"] = (() => {
    const O = [215, 138], S = 220, th = 25 * Math.PI / 180, q = S / (Math.cos(th) + Math.sin(th)), e = q / (Math.cos(th) + Math.sin(th));
    const sq = (h, rot) => [0, 1, 2, 3].map(i => { const t = rot + Math.PI / 4 + i * Math.PI / 2; return add(O, [h / Math.SQRT2 * Math.cos(t), h / Math.SQRT2 * Math.sin(t)]); });
    const big = sq(S, 0), mid4 = sq(q, th), small = sq(e, 0);
    const ok = mid4.every(p => Math.abs(Math.max(Math.abs(p[0] - O[0]), Math.abs(p[1] - O[1])) - S / 2) < 1e-6) && small.every(p => true);
    return wrap(430, 290, [
      poly(big, DIM, 2), poly(mid4, ACC, 1.8), poly(small, GLD, 1.8),
      cap(430, 290, "Square ABCD (gray), the square IJKL with a vertex on each side of it (blue), and the square EFGH parallel to ABCD with its vertices on the sides of IJKL (gold), all with one center." + MM(ok))
    ]);
  })();

  // 2018 AIME I #4: the isosceles triangle with AD = DE = EC.
  PROB["2018-aime-i-4"] = (() => {
    const k = 17, Q = (x, y) => [215 + k * x, 240 - k * y], x = 250 / 39;  // AD is the length the condition forces
    const A = Q(0, 8), B = Q(-6, 0), C = Q(6, 0), D = lerp(A, B, x / 10), E = lerp(A, C, (10 - x) / 10);
    const ok = Math.abs(dist(D, E) / k - x) < 1e-9 && Math.abs(dist(E, C) / k - x) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(D, E, ACC, 2), ticksOn(A, D, 1, ACC), ticksOn(D, E, 1, ACC), ticksOn(E, C, 1, ACC),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [-12, 0]), "D", DIM, 13, "end"), txt(add(E, [12, 0]), "E", DIM, 13, "start"),
      txt(add(mid(B, C), [0, 18]), "12", DIM, 12.5),
      cap(430, 270, "Triangle ABC with AB = AC = 10 and BC = 12, D on AB and E on AC with AD = DE = EC (one tick each)." + MM(ok))
    ]);
  })();

  // 2018 AIME II #7: triangle ABC and a few of the parallels that cut it into equal areas.
  PROB["2018-aime-ii-7"] = (() => {
    const k = 23, Q = (x, y) => [100 + k * x, 250 - k * y], b = 5 * Math.sqrt(3);
    const ax = (81 + 75 - 144) / (2 * b), ay = Math.sqrt(81 - ax * ax);  // A is 9 from B and 12 from C
    const B = Q(0, 0), C = Q(b, 0), A = Q(ax, ay);
    const ok = Math.abs(dist(A, B) / k - 9) < 1e-9 && Math.abs(dist(A, C) / k - 12) < 1e-9;
    const cuts = [1, 2, 3, 4, 5, 6, 7].map(j => Math.sqrt(j / 8)).map(f => [lerp(A, B, f), lerp(A, C, f)]);
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), ...cuts.map(([u, w]) => seg(u, w, ACC, 1.4)), ...[A, B, C].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(mid(A, B), [-12, 0]), "9", DIM, 12.5, "end"), txt(add(mid(A, C), [12, 0]), "12", DIM, 12.5, "start"), txt(add(mid(B, C), [0, 18]), "5√3", DIM, 12.5),
      cap(430, 290, "Triangle ABC with AB = 9, BC = 5√3 and AC = 12, cut by segments parallel to BC into regions of equal area; eight regions stand in for the problem's 2450." + MM(ok))
    ]);
  })();

  // 2019 AIME II #7: triangle ABC and the three lines parallel to its sides.
  PROB["2019-aime-ii-7"] = (() => {
    const k = 1.1, Q = (x, y) => [100 + k * x, 220 - k * y], cx = (220 * 220 + 120 * 120 - 180 * 180) / 440, cy = Math.sqrt(120 * 120 - cx * cx);
    const B = Q(0, 0), C = Q(220, 0), A = Q(cx, cy);
    const lineAt = (V, X, Y, f) => [lerp(V, X, f), lerp(V, Y, f)];  // the segment cutting off the corner at V with ratio f
    const lA = lineAt(A, B, C, 1 / 4), lB = lineAt(B, C, A, 1 / 4), lC = lineAt(C, A, B, 1 / 8);
    const ok = Math.abs(dist(...lA) / k - 55) < 1e-9 && Math.abs(dist(...lB) / k - 45) < 1e-9 && Math.abs(dist(...lC) / k - 15) < 1e-9;
    const ext = ([u, w], a, b) => seg(add(u, mul(sub(u, w), a)), add(w, mul(sub(w, u), b)), FNT, 1.2, "4 3");
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), ext(lA, 0.6, 0.6), ext(lB, 0.5, 0.5), ext(lC, 1.4, 1.4),
      ...[lA, lB, lC].map(([u, w]) => seg(u, w, ACC, 2)), ...[A, B, C].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(mid(...lA), [0, 16]), "55", ACC, 12), txt(add(mid(...lB), [14, -2]), "45", ACC, 12, "start"), txt(add(mid(...lC), [-16, 0]), "15", ACC, 12, "end"),
      cap(430, 290, "Triangle ABC (AB = 120, BC = 220, AC = 180) and the lines parallel to BC, AC and AB whose pieces inside it (blue) have lengths 55, 45 and 15. The question is about the triangle these three lines (dashed) form." + MM(ok))
    ]);
  })();

  // 2022 AIME II #7: the circles of radii 6 and 24 and their three common tangents.
  PROB["2022-aime-ii-7"] = (() => {
    const k = 3.3, Q = (x, y) => [50 + k * x, 140 - k * y];
    const X = Q(0, 0), O1 = Q(10, 0), O2 = Q(40, 0), T = Q(16, 0), tn = 3 / 4;
    const U1 = Q(16, 12), U2 = Q(16, -12);
    const ok = Math.abs(dist(O1, foot(O1, X, U1)) / k - 6) < 1e-9 && Math.abs(dist(O2, foot(O2, X, U1)) / k - 24) < 1e-9;
    return wrap(430, 290, [
      poly([X, U1, U2], "none", 0, ACCS), circ(O1, 6 * k, ACC, 1.8), circ(O2, 24 * k, ACC, 1.8),
      seg(X, Q(84, 63), DIM, 1.6), seg(X, Q(84, -63), DIM, 1.6), seg(Q(16, -30), Q(16, 30), DIM, 1.6),
      dot(O1, ACC, 3), dot(O2, ACC, 3), dot(T, DIM, 3),
      txt(add(O1, [0, 14]), "6", ACC, 12), txt(add(O2, [0, 14]), "24", ACC, 12),
      cap(430, 290, "Circles of radii 6 and 24 touching externally, with their two external common tangents and the internal one; the triangle they bound is shaded." + MM(ok && tn === 0.75))
    ]);
  })();

  // 2023 AIME II #3: the isosceles right triangle and the point P with three equal angles.
  PROB["2023-aime-ii-3"] = (() => {
    const s5 = Math.sqrt(500), k = 9.4, Q = (x, y) => [118 + k * x, 250 - k * y];  // AC² = 500 and tan θ = 1/2 are what the conditions force
    const A = Q(0, 0), B = Q(s5, 0), C = Q(0, s5), P = Q(20 / Math.sqrt(5), 10 / Math.sqrt(5));
    const ang = (X, Vv, Y) => Math.acos(((X[0] - Vv[0]) * (Y[0] - Vv[0]) + (X[1] - Vv[1]) * (Y[1] - Vv[1])) / (dist(X, Vv) * dist(Y, Vv)));
    const ok = Math.abs(ang(P, A, B) - ang(P, B, C)) < 1e-9 && Math.abs(ang(P, B, C) - ang(P, C, A)) < 1e-9 && Math.abs(dist(A, P) / k - 10) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), rightAngle(A, B, C, 10), seg(A, P, ACC, 1.8), seg(B, P, FNT, 1.5), seg(C, P, FNT, 1.5),
      angleArc(A, B, P, 30, GLD), angleArc(B, C, P, 30, GLD), angleArc(C, A, P, 30, GLD), ...[A, B, C, P].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [-10, -4]), "C"), txt(add(P, [10, -6]), "P", DIM, 13, "start"), txt(add(mid(A, P), [2, 14]), "10", ACC, 12),
      cap(430, 290, "Isosceles right triangle ABC (right angle at A) and the point P inside it with angle PAB = angle PBC = angle PCA (gold); AP = 10." + MM(ok))
    ]);
  })();

  // 2024 AIME II #5: the triangle 200, 240, 300 on the lines AB, CD, EF, and the hexagon.
  PROB["2024-aime-ii-5"] = (() => {
    const a = 200, b = 240, c = 300, s = 80, k = 0.95;  // s is the side the problem forces
    const xz = a, cosX = (a * a + b * b - c * c) / (2 * a * b);
    const X3 = [0, 0], Z3 = [a, 0], Y3 = [b * cosX, b * Math.sqrt(1 - cosX * cosX)];
    const Q = q => [110 + k * q[0], 268 - k * q[1]], [X, Y, Z] = [X3, Y3, Z3].map(Q);
    const Bp = lerp(X, Z, s / c), Cp = lerp(X, Y, s / c), Dp = lerp(Y, X, s / a), Ep = lerp(Y, Z, s / a), Fp = lerp(Z, Y, s / b), Ap = lerp(Z, X, s / b);
    const hex = [Ap, Bp, Cp, Dp, Ep, Fp], Ls = hex.map((p, i) => dist(p, hex[(i + 1) % 6]) / k);
    const ok = Ls.every(x => Math.abs(x - s) < 1e-6);
    return wrap(430, 300, [
      poly([X, Y, Z], FNT, 1.5, "none", "5 4"), poly(hex, ACC, 2, ACCS), ...hex.map(q => dot(q, ACC, 3.2)),
      ...[["A", Ap, [4, 16]], ["B", Bp, [-4, 16]], ["C", Cp, [-12, 0]], ["D", Dp, [-12, 0]], ["E", Ep, [12, 0]], ["F", Fp, [12, 0]]].map(([n, p, d]) => txt(add(p, d), n, ACC, 13)),
      txt(add(mid(X, Z), [0, 18]), "200", DIM, 12), txt(add(mid(X, Y), [-14, 0]), "240", DIM, 12, "end"), txt(add(mid(Y, Z), [14, 0]), "300", DIM, 12, "start"),
      cap(430, 300, "The convex equilateral hexagon ABCDEF with opposite sides parallel, inside the triangle (dashed) formed by extending AB, CD and EF, with sides 200, 240 and 300." + MM(ok))
    ]);
  })();

  // 2011 AIME I #4: triangle ABC, the bisectors AL and BK, and the feet M and N from C.
  PROB["2011-aime-i-4"] = (() => {
    const k = 2.05, Q = (x, y) => [80 + k * x, 250 - k * y], ax = 16336 / 240, ay = Math.sqrt(125 * 125 - ax * ax);
    const B = Q(0, 0), C = Q(120, 0), A = Q(ax, ay);
    const L = lerp(B, C, 125 / (125 + 117)), K = lerp(A, C, 125 / (125 + 120)), M = foot(C, B, K), N = foot(C, A, L);
    const ok = Math.abs(dist(A, C) / k - 117) < 1e-9 && Math.abs(dist(M, N) / k - 56) < 1e-6;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), seg(A, L, FNT, 1.5), seg(B, K, FNT, 1.5), seg(C, M, ACC, 1.5, "5 4"), seg(C, N, ACC, 1.5, "5 4"), seg(M, N, GLD, 2),
      rightAngle(M, C, K, 7), rightAngle(N, C, L, 7), ...[A, B, C, K, L, M, N].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(L, [0, 18]), "L"), txt(add(K, [10, -4]), "K", DIM, 13, "start"),
      txt(add(M, [-10, -6]), "M", DIM, 13, "end"), txt(add(N, [-4, -10]), "N", DIM, 13, "end"),
      txt(add(mid(A, B), [-14, 0]), "125", DIM, 12, "end"), txt(add(lerp(A, C, 0.25), [12, 0]), "117", DIM, 12, "start"), txt(add(lerp(B, C, 0.25), [0, 18]), "120", DIM, 12),
      cap(430, 290, "Triangle ABC with AB = 125, AC = 117, BC = 120, the bisectors AL and BK, and the feet M and N of the perpendiculars from C to BK and AL; MN is gold." + MM(ok))
    ]);
  })();

  // 2002 AIME I #13: the medians AD and CE, and CE extended to F on the circumcircle.
  PROB["2002-aime-i-13"] = (() => {
    const k = 7.2, Q = (x, y) => [130 + k * x, 204 - k * y], cx = 90 / 48, cy = Math.sqrt(630 - cx * cx);  // BC² = 1116 and CA² = 630 from the medians
    const A = Q(0, 0), B = Q(24, 0), C = Q(cx, cy), D = mid(B, C), E = mid(A, B);
    const O = lineInt(mid(A, B), add(mid(A, B), perp(sub(B, A))), mid(A, C), add(mid(A, C), perp(sub(C, A)))), R = dist(O, A);
    const F = circleLineInts(O, R, C, E).sort((u, w) => dist(w, C) - dist(u, C))[0];
    const ok = Math.abs(dist(A, D) / k - 18) < 1e-9 && Math.abs(dist(C, E) / k - 27) < 1e-9;
    return wrap(430, 290, [
      circ(O, R, FNT, 1.5), poly([A, B, C], DIM, 2), seg(A, D, ACC, 1.6), seg(C, F, ACC, 1.6), poly([A, F, B], "none", 0, ACCS),
      ...[A, B, C, D, E, F].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-12, 4]), "A", DIM, 13, "end"), txt(add(B, [12, 4]), "B", DIM, 13, "start"), txt(add(C, [0, -10]), "C"), txt(add(D, [10, -4]), "D", DIM, 13, "start"),
      txt(add(E, [8, -8]), "E", DIM, 13, "start"), txt(add(F, [0, 18]), "F"), txt(add(mid(A, E), [0, -8]), "24", DIM, 12),
      cap(430, 290, "Triangle ABC with medians AD = 18 and CE = 27 and AB = 24; CE extended meets the circumcircle at F, and triangle AFB is shaded." + MM(ok))
    ]);
  })();

  // 2003 AIME II #6: the 13-14-15 triangle and its image under the half-turn about the centroid.
  PROB["2003-aime-ii-6"] = (() => {
    const k = 13, Q = (x, y) => [124 + k * x, 210 - k * y];
    const B = Q(0, 0), C = Q(14, 0), A = Q(5, 12), G = mul(add(add(A, B), C), 1 / 3), rot = P => sub(mul(G, 2), P);
    const [A2, B2, C2] = [A, B, C].map(rot);
    const ok = Math.abs(dist(A, B) / k - 13) < 1e-9 && Math.abs(dist(A, C) / k - 15) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2, ACCS), poly([A2, B2, C2], ACC, 2, ACCS), dot(G, GLD, 3.4), ...[A, B, C, A2, B2, C2].map(q => dot(q, DIM, 3)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(A2, [0, 18]), "A′", ACC), txt(add(B2, [10, -4]), "B′", ACC, 13, "start"), txt(add(C2, [-10, -4]), "C′", ACC, 13, "end"),
      txt(add(G, [8, 4]), "G", GLD, 13, "start"),
      cap(430, 290, "Triangle ABC with AB = 13, BC = 14, AC = 15 and its image A′B′C′ (blue) under a half-turn about the centroid G." + MM(ok))
    ]);
  })();

  // 2021 Fall AMC 10B #11: the hexagon in its circle and the six arcs reflected over its sides.
  PROB["2021-fall-amc-10b-11"] = (() => {
    const O = [215, 138], r = 110, V = [0, 1, 2, 3, 4, 5].map(i => onC(O, r, 60 * i));
    const arcPts = (i, refl) => Array.from({ length: 31 }, (_, j) => {
      const P = onC(O, r, 60 * i + 2 * j), M = mid(V[i], V[(i + 1) % 6]);
      if (!refl) return P;
      const d = norm(sub(V[(i + 1) % 6], V[i])), w = sub(P, M), along = mul(d, w[0] * d[0] + w[1] * d[1]);
      return add(M, sub(mul(along, 2), w));
    });
    const ok = Math.abs(dist(V[0], V[1]) - r) < 1e-9;
    const region = [].concat(...[0, 1, 2, 3, 4, 5].map(i => arcPts(i, true)));
    return wrap(430, 290, [
      poly(region, "none", 0, ACCS), circ(O, r, FNT, 1.4, "none", "4 3"), poly(V, DIM, 2),
      ...[0, 1, 2, 3, 4, 5].map(i => pline(arcPts(i, true), ACC, 1.8)), ...V.map(q => dot(q, DIM, 3)),
      txt(add(mid(V[4], V[5]), [0, -9]), "1", DIM, 12.5),
      cap(430, 290, "A regular hexagon of side 1 in its circle (dashed). Each arc cut off by a side is reflected over that side (blue); the region the six reflected arcs bound is shaded." + MM(ok))
    ]);
  })();

  // 1992 AIME #14: triangle ABC with the cevians AA′, BB′, CC′ through O.
  PROB["1992-aime-14"] = (() => {
    const A = [150, 40], B = [60, 240], C = [380, 240], O = [190, 165];
    const A1 = lineInt(A, O, B, C), B1 = lineInt(B, O, A, C), C1 = lineInt(C, O, A, B), ok = A1[1] > 239 && B1[0] > 150;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), seg(A, A1, ACC, 1.6), seg(B, B1, ACC, 1.6), seg(C, C1, ACC, 1.6), ...[A, B, C, A1, B1, C1, O].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(A1, [0, 18]), "A′"), txt(add(B1, [10, -4]), "B′", DIM, 13, "start"),
      txt(add(C1, [-10, -4]), "C′", DIM, 13, "end"), txt(add(O, [10, 12]), "O", ACC, 13, "start"),
      cap(430, 290, "Triangle ABC with A′, B′, C′ on its sides and the cevians AA′, BB′, CC′ (blue) meeting at O." + MM(ok))
    ]);
  })();

  // 1997 AIME #6: a regular n-gon, the equilateral triangle on A₁A₂ outside it, and the point B.
  PROB["1997-aime-6"] = (() => {
    const n = 12, O = [215, 118], r = 88, V = Array.from({ length: n }, (_, i) => onC(O, r, 90 + 360 * i / n));
    const A1 = V[0], A2 = V[1], An = V[n - 1], d = sub(A2, A1), Bp = add(mid(A1, A2), mul(perp(norm(d)), -Math.sqrt(3) / 2 * dist(A1, A2)));
    const Bq = dist(Bp, O) > dist(mid(A1, A2), O) ? Bp : add(mid(A1, A2), mul(perp(norm(d)), Math.sqrt(3) / 2 * dist(A1, A2)));
    const ok = Math.abs(dist(Bq, A1) - dist(A1, A2)) < 1e-9 && dist(Bq, O) > r;
    return wrap(430, 290, [
      poly(V, DIM, 2), poly([A1, A2, Bq], ACC, 1.8, ACCS), seg(An, A1, GLD, 2.2), seg(A1, Bq, GLD, 2.2, "6 4"),
      ...[A1, A2, An, Bq].map(q => dot(q, DIM, 3.4)),
      txt(add(A1, [0, -10]), subT("A", "1")), txt(add(A2, [-12, -4]), subT("A", "2"), DIM, 13, "end"), txt(add(An, [12, -4]), subT("A", "n"), DIM, 13, "start"), txt(add(Bq, [-8, -8]), "B", ACC, 13, "end"),
      cap(430, 290, "A regular n-gon (drawn with n = 12) and the equilateral triangle A₁A₂B outside it. The question is when Aₙ, A₁, B (gold) can be consecutive vertices of another regular polygon." + MM(ok))
    ]);
  })();

  // 2019 AIME II #13: the regular octagon in a circle of area 1 and the point P.
  PROB["2019-aime-ii-13"] = (() => {
    const O = [215, 142], r = 118, V = Array.from({ length: 8 }, (_, i) => onC(O, r, 112.5 + 45 * i)), P = add(O, [-14, 22]);
    const ok = Math.abs(dist(V[0], V[1]) - 2 * r * Math.sin(Math.PI / 8)) < 1e-9;
    const reg = (i, c) => [poly([P, V[i], V[(i + 1) % 8]], c, 1.6, c === ACC ? ACCS : GLDS)];
    return wrap(430, 300, [
      circ(O, r, DIM, 1.8), poly(V, FNT, 1.4), ...reg(0, ACC), ...reg(2, ACC), ...reg(5, GLD),
      ...V.map(q => dot(q, DIM, 3)), dot(P, DIM, 3.4),
      ...V.map((q, i) => txt(add(q, mul(norm(sub(q, O)), 15)), subT("A", String(i + 1)), DIM, 12.5)), txt(add(P, [8, 14]), "P", DIM, 13, "start"),
      cap(430, 300, "The regular octagon in a circle of area 1 and a point P inside. Each region bounded by P, two adjacent vertices and the arc between them is a triangle (shaded) plus a circular segment; the two blue ones have areas 1/7 and 1/9." + MM(ok))
    ]);
  })();

  // 2024 AMC 10A #14: the equilateral triangle on ℓ and the circle in the 120° angle at its vertex.
  PROB["2024-amc-10a-14"] = (() => {
    const k = 6.6, Q = (x, y) => [150 + k * x, 228 - k * y], sd = 16 * Math.sqrt(3);
    const V = Q(0, 0), W = Q(sd, 0), Ap = Q(sd / 2, 24), O = Q(-4 * Math.sqrt(3), 12), T1 = Q(-4 * Math.sqrt(3), 0), T2 = foot(O, V, Ap);
    const ok = Math.abs(dist(O, T2) / k - 12) < 1e-9 && Math.abs(dist(Ap, T1) - dist(Ap, T1)) < 1e-9;
    const arc = Array.from({ length: 21 }, (_, i) => { const a1 = Math.atan2(T1[1] - O[1], T1[0] - O[0]), a2 = Math.atan2(T2[1] - O[1], T2[0] - O[0]);
      let d = a2 - a1; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; const a = a1 + d * i / 20; return add(O, [12 * k * Math.cos(a), 12 * k * Math.sin(a)]); });
    return wrap(430, 270, [
      poly([V, ...arc], "none", 0, ACCS), seg(Q(-24, 0), Q(36, 0), DIM, 1.8), poly([V, W, Ap], DIM, 2), circ(O, 12 * k, ACC, 1.8),
      seg(Ap, Q(sd / 2, 0), FNT, 1.3, "4 3"), dot(O, ACC, 3),
      txt(add(Q(sd / 2, 12), [8, 0]), "24", DIM, 12.5, "start"), txt(add(mid(O, T1), [-8, 0]), "12", ACC, 12.5, "end"), txt(add(Q(34, 0), [0, 16]), "ℓ", DIM, 14),
      cap(430, 270, "An equilateral triangle of height 24 on line ℓ and a circle of radius 12 touching ℓ and the triangle; the region between them is shaded." + MM(ok))
    ]);
  })();

  // 1998 AIME #12: the equilateral triangle, its medial triangle DEF, and P, Q, R.
  PROB["1998-aime-12"] = (() => {
    const k = 105, Q0 = (x, y) => [110 + k * x, 250 - k * y], x = (Math.sqrt(5) - 1) / 2;
    const A = Q0(0, 0), B = Q0(2, 0), C = Q0(1, Math.sqrt(3)), D = mid(B, C), E = mid(C, A), F = mid(A, B);
    const Qq = lerp(E, F, x), Rr = lerp(F, D, x), Pp = lerp(D, E, x);
    const cr = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
    const ok = Math.abs(cr(C, Pp, Qq)) < 1e-6 && Math.abs(cr(A, Qq, Rr)) < 1e-6 && Math.abs(cr(B, Rr, Pp)) < 1e-6;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), poly([D, E, F], FNT, 1.5), seg(C, Qq, ACC, 1.4), seg(A, Rr, ACC, 1.4), seg(B, Pp, ACC, 1.4), poly([Pp, Qq, Rr], GLD, 1.8, GLDS),
      ...[A, B, C, D, E, F, Pp, Qq, Rr].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [10, -4]), "D", DIM, 13, "start"), txt(add(E, [-10, -4]), "E", DIM, 13, "end"), txt(add(F, [0, 18]), "F"),
      txt(add(Pp, [4, -10]), "P", GLD), txt(add(Qq, [-12, 4]), "Q", GLD, 13, "end"), txt(add(Rr, [10, 10]), "R", GLD, 13, "start"),
      cap(430, 290, "Equilateral ABC with midpoints D, E, F, and P on DE, Q on EF, R on FD such that P is on CQ, Q on AR and R on BP; triangle PQR is gold." + MM(ok))
    ]);
  })();

  // 2003 AIME I #10: the isosceles triangle with the 106° apex and the point M.
  PROB["2003-aime-i-10"] = (() => {
    const r = Math.PI / 180, C = [215, 60], L = 230, A = add(C, [-L * Math.sin(53 * r), L * Math.cos(53 * r)]), B = add(C, [L * Math.sin(53 * r), L * Math.cos(53 * r)]);
    const rotv = (v, d) => [v[0] * Math.cos(d * r) - v[1] * Math.sin(d * r), v[0] * Math.sin(d * r) + v[1] * Math.cos(d * r)];
    const M = lineInt(A, add(A, rotv(sub(C, A), 7)), C, add(C, rotv(sub(A, C), -23)));
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V))) / r;
    const ok = Math.abs(ang(M, A, C) - 7) < 1e-6 && Math.abs(ang(M, C, A) - 23) < 1e-6 && Math.abs(ang(A, C, B) - 106) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, M, ACC, 1.6), seg(C, M, ACC, 1.6), seg(B, M, FNT, 1.4, "5 4"), ...[A, B, C, M].map(q => dot(q, DIM, 3.4)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(M, [0, 18]), "M"),
      txt(add(C, [0, 30]), "106°", DIM, 11), txt(add(A, [44, -4]), "7°", ACC, 11), txt(add(C, [-11, 48]), "23°", ACC, 11),
      cap(430, 270, "Isosceles triangle ABC with AC = BC and angle ACB = 106°, and the point M with angle MAC = 7° and angle MCA = 23°." + MM(ok))
    ]);
  })();

  // 2005 AIME I #1: the ring of six circles inside the circle of radius 30.
  PROB["2005-aime-i-1"] = (() => {
    const O = [215, 140], k = 3.9, small = [0, 1, 2, 3, 4, 5].map(i => onC(O, 20 * k, 60 * i));
    const ok = Math.abs(dist(small[0], small[1]) - 20 * k) < 1e-9;
    return wrap(430, 290, [
      circ(O, 30 * k, DIM, 2, ACCS), ...small.map(c => circ(c, 10 * k, ACC, 1.8, "var(--bg, #fff)")), ...small.map(c => circ(c, 10 * k, ACC, 1.8)),
      seg(O, onC(O, 30 * k, -30), FNT, 1.3, "4 3"), txt(add(mid(O, onC(O, 30 * k, -30)), [4, -8]), "30", DIM, 12.5),
      cap(430, 290, "Six equal circles in a ring, each touching its two neighbours and the circle of radius 30; the region inside the big circle and outside the six is shaded." + MM(ok))
    ]);
  })();

  // 2007 AIME I #15: the equilateral triangle with D, E, F and the 60° angle at E.
  PROB["2007-aime-i-15"] = (() => {
    const x = (231 - 3 * Math.sqrt(989)) / 10, y = (5 * x - 66) / 3, k = 17, Q = (a, b) => [96 + k * a, 250 - k * b];  // the smaller of the two possible sides
    const A = Q(0, 0), B = Q(x, 0), C = Q(x / 2, x * Math.sqrt(3) / 2), F = lerp(A, B, 5 / x), D = lerp(C, B, 2 / x), E = lerp(A, C, y / x);
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V)));
    const ok = Math.abs(ang(D, E, F) - Math.PI / 3) < 1e-6;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), poly([D, E, F], ACC, 1.8, ACCS), angleArc(E, F, D, 18, GLD), ...[A, B, C, D, E, F].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [10, -2]), "D", DIM, 13, "start"), txt(add(E, [-10, -2]), "E", DIM, 13, "end"), txt(add(F, [0, 18]), "F"),
      txt(add(mid(A, F), [0, 18]), "5", DIM, 12.5), txt(add(mid(C, D), [10, -4]), "2", DIM, 12.5, "start"), txt(add(E, [20, -14]), "60°", GLD, 11, "start"),
      cap(430, 290, "Equilateral ABC with FA = 5, CD = 2 and E on CA so that angle DEF = 60°; triangle DEF (shaded) has area 14√3. Drawn with the smaller of the two possible sides." + MM(ok))
    ]);
  })();

  // 2010 AIME I #13: the semicircle on AB, the rectangle ABCD and the line ℓ through N, U, T.
  PROB["2010-aime-i-13"] = (() => {
    const h = Math.sqrt(13.5), k = 36, Q = (a, b) => [108 + k * a, 118 - k * b];  // in units of 42; AD = h is what the area ratio forces
    const A = Q(0, 0), B = Q(6, 0), Cc = Q(6, -h), D = Q(0, -h), O = Q(3, 0), N = Q(1.5, 1.5 * Math.sqrt(3)), U = Q(2, 0), T = Q(2 + h / (3 * Math.sqrt(3)), -h);
    const arc = Array.from({ length: 37 }, (_, i) => onC(O, 3 * k, 180 + 5 * i));
    const cr = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
    const ok = Math.abs(dist(A, N) / k - 3) < 1e-9 && Math.abs(cr(N, U, T)) < 1e-6;
    return wrap(430, 290, [
      pline(arc, DIM, 2), poly([A, B, Cc, D], DIM, 2), seg(add(N, mul(sub(N, T), 0.15)), add(T, mul(sub(T, N), 0.1)), ACC, 1.8),
      ...[A, B, Cc, D, N, U, T].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [10, 4]), "B", DIM, 13, "start"), txt(add(Cc, [10, 14]), "C"), txt(add(D, [-10, 14]), "D"),
      txt(add(N, [-10, -6]), "N", DIM, 13, "end"), txt(add(U, [8, 16]), "U"), txt(add(T, [10, 14]), "T"),
      txt(add(mid(A, U), [0, 16]), "84", DIM, 12), txt(add(mid(U, B), [0, 16]), "168", DIM, 12), txt(add(mid(A, N), [-12, 4]), "126", DIM, 12, "end"),
      cap(430, 290, "The semicircle on AB and the rectangle ABCD on the other side; line ℓ (blue) meets the semicircle at N, AB at U and CD at T, with AU = 84, AN = 126, UB = 168, and cuts the region in the ratio 1 : 2." + MM(ok))
    ]);
  })();

  // 2012 AIME I #13: three concentric circles and the largest equilateral triangle with a vertex on each.
  PROB["2012-aime-i-13"] = (() => {
    const k = 22, O = [205, 140], P = (rr, deg) => onC(O, rr * k, deg);
    const Cc = P(3, 0), B = P(4, -150), s = Math.sqrt(25 + 12 * Math.sqrt(3)) * k;
    const rot = (X, V, d) => { const a = d * Math.PI / 180, w = sub(X, V); return add(V, [w[0] * Math.cos(a) - w[1] * Math.sin(a), w[0] * Math.sin(a) + w[1] * Math.cos(a)]); };
    const cands = [rot(B, Cc, 60), rot(B, Cc, -60)], A = cands.sort((u, w) => Math.abs(dist(u, O) - 5 * k) - Math.abs(dist(w, O) - 5 * k))[0];
    const ok = Math.abs(dist(A, O) - 5 * k) < 1e-6 && Math.abs(dist(B, Cc) - s) < 1e-6;
    return wrap(430, 290, [
      ...[3, 4, 5].map(rr => circ(O, rr * k, FNT, 1.4)), poly([A, B, Cc], ACC, 2, ACCS), dot(O, DIM, 3), ...[A, B, Cc].map(q => dot(q, ACC, 3.2)),
      txt(add(O, [0, 16]), "O"), txt(add(onC(O, 3 * k, 100), [0, 0]), "3", DIM, 11), txt(add(onC(O, 4 * k, 100), [0, 0]), "4", DIM, 11), txt(add(onC(O, 5 * k, 100), [0, 0]), "5", DIM, 11),
      cap(430, 290, "Concentric circles of radii 3, 4 and 5 and an equilateral triangle with one vertex on each (blue), drawn in its largest position." + MM(ok))
    ]);
  })();

  // 2015 AIME I #4: the equilateral triangles on AB and BC and the midpoints M and N.
  PROB["2015-aime-i-4"] = (() => {
    const k = 13, Q = (a, b) => [85 + k * a, 230 - k * b], r3 = Math.sqrt(3);
    const A = Q(0, 0), B = Q(16, 0), C = Q(20, 0), D = Q(8, 8 * r3), E = Q(18, 2 * r3), M = mid(A, E), N = mid(C, D);
    const ok = Math.abs(dist(A, D) / k - 16) < 1e-9 && Math.abs(dist(B, E) / k - 4) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, D], DIM, 2), poly([B, C, E], DIM, 2), seg(A, E, FNT, 1.4), seg(C, D, FNT, 1.4), poly([B, M, N], ACC, 1.8, ACCS),
      ...[A, B, C, D, E, M, N].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [0, 18]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [0, -10]), "D"), txt(add(E, [10, -6]), "E", DIM, 13, "start"),
      txt(add(M, [0, 18]), "M", ACC), txt(add(N, [8, -8]), "N", ACC, 13, "start"), txt(add(mid(A, B), [0, 18]), "16", DIM, 12), txt(add(mid(B, C), [0, 18]), "4", DIM, 12),
      cap(430, 290, "B on AC with AB = 16 and BC = 4, equilateral triangles ABD and BCE on the same side, and M, N the midpoints of AE and CD; triangle BMN is shaded." + MM(ok))
    ]);
  })();

  // 2016 AIME II #14: the equilateral triangle with P above and Q below on the axis through its center.
  PROB["2016-aime-ii-14"] = (() => {
    const R = 200 * Math.sqrt(3), disc = Math.sqrt(900 * 900 - 4 * 120000), p = (900 + disc) / 2, q = (900 - disc) / 2;  // heights the conditions force
    const { Pj, view } = projector([215, 205], 0.2, [1, 0], [0.45, -0.3]);
    const V = { A: [R, 0, 0], B: [R * Math.cos(2 * Math.PI / 3), R * Math.sin(2 * Math.PI / 3), 0], C: [R * Math.cos(4 * Math.PI / 3), R * Math.sin(4 * Math.PI / 3), 0], P: [0, 0, p], Q: [0, 0, -q], O: [0, 0, (p - q) / 2] };
    const L3 = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1], u[2] - w[2]);
    const ok = ["A", "B", "C", "P", "Q"].every(n => Math.abs(L3(V[n], V.O) - 450) < 1e-6) && Math.abs(L3(V.A, V.B) - 600) < 1e-6;
    const P3 = n => Pj(V[n]);
    return wrap(430, 300, [
      poly(["A", "B", "C"].map(P3), DIM, 2, ACCS), seg(P3("P"), P3("Q"), FNT, 1.3, "4 3"),
      ...["A", "B", "C"].map(n => seg(P3("P"), P3(n), ACC, 1.3)), ...["A", "B", "C"].map(n => seg(P3("Q"), P3(n), GLD, 1.3)),
      ...["A", "B", "C", "P", "Q", "O"].map(n => dot(P3(n), DIM, 3)),
      txt(add(P3("A"), [12, 4]), "A", DIM, 13, "start"), txt(add(P3("B"), [-4, -10]), "B"), txt(add(P3("C"), [-12, 6]), "C", DIM, 13, "end"),
      txt(add(P3("P"), [0, -10]), "P", ACC), txt(add(P3("Q"), [0, 18]), "Q", GLD), txt(add(P3("O"), [10, -6]), "O", DIM, 13, "start"),
      cap(430, 300, "Equilateral ABC of side 600 with P above and Q below its plane, each equally far from A, B and C, the planes PAB and QAB at 120°; O is equally far from all five points." + MM(ok))
    ]);
  })();

  // 2022 AIME I #8: the circle of radius 18, its equilateral triangle, the three circles ω_A, ω_B, ω_C.
  PROB["2022-aime-i-8"] = (() => {
    const k = 5.6, O = [215, 145], V = [90, 210, 330].map(d => onC(O, 18 * k, d - 180)), Cs = [90, 210, 330].map(d => onC(O, 6 * k, d));
    const small = [90, 210, 330].map(d => onC(O, (Math.sqrt(117) - 3) * k, d));
    const ok = Math.abs(dist(small[0], Cs[1]) - 12 * k) < 1e-6 && Math.abs(dist(small[0], Cs[2]) - 12 * k) < 1e-6;
    return wrap(430, 300, [
      circ(O, 18 * k, DIM, 1.8), poly(V, DIM, 1.8), ...Cs.map(c => circ(c, 12 * k, ACC, 1.4)), poly(small, GLD, 1.8, GLDS), ...V.map(q => dot(q, DIM, 3)),
      txt(add(V[0], [0, -10]), "A"), txt(add(V[1], [-10, 12]), "B"), txt(add(V[2], [10, 12]), "C"),
      cap(430, 300, "Equilateral ABC in the circle ω of radius 18, and the three circles (blue), each touching two sides and ω. The smaller triangle on their inner meeting points is gold." + MM(ok))
    ]);
  })();

  // 2000 AIME II #6: a trapezoid whose bases differ by 100, its midline and the equal-area segment.
  PROB["2000-aime-ii-6"] = (() => {
    const b = 75, B = 175, h = 110, k = 1.65, Q = (x, y) => [70 + k * x, 238 - k * y];  // drawn with the bases the condition forces
    const A = Q(0, 0), Bp = Q(B, 0), C = Q(40 + b, h), D = Q(40, h), M1 = mid(A, D), M2 = mid(Bp, C);
    const xs = Math.sqrt((b * b + B * B) / 2), t = (B - xs) / (B - b), E1 = lerp(A, D, t), E2 = lerp(Bp, C, t);
    const ok = Math.abs(dist(E1, E2) / k - xs) < 1e-6 && Math.abs(B - b - 100) < 1e-12;
    return wrap(430, 290, [
      poly([A, Bp, C, D], DIM, 2), seg(M1, M2, ACC, 1.8, "5 4"), seg(E1, E2, GLD, 1.8),
      txt(add(mid(M1, M2), [0, -8]), "midline", ACC, 11.5), txt(add(mid(E1, E2), [0, 16]), "x", GLD, 13),
      cap(430, 290, "A trapezoid whose bases differ by 100. The midline (dashed) splits it in the ratio 2 : 3, and the segment x (gold), parallel to the bases, splits it into equal areas." + MM(ok))
    ]);
  })();

  // 2023 AMC 12B #11: one isosceles trapezoid with legs 1 and one base twice the other.
  PROB["2023-amc-12b-11"] = (() => {
    const x = 1.1, h = Math.sqrt(1 - x * x / 4), k = 120, Q = (a, b) => [215 + k * a, 210 - k * b];
    const A = Q(-x, 0), B = Q(x, 0), C = Q(x / 2, h), D = Q(-x / 2, h);
    const ok = Math.abs(dist(B, C) / k - 1) < 1e-9 && Math.abs(dist(A, B) - 2 * dist(C, D)) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C, D], ACC, 2, ACCS), txt(add(mid(B, C), [12, 0]), "1", DIM, 12.5, "start"), txt(add(mid(A, D), [-12, 0]), "1", DIM, 12.5, "end"),
      txt(add(mid(C, D), [0, -10]), "x", DIM, 13), txt(add(mid(A, B), [0, 18]), "2x", DIM, 13),
      cap(430, 270, "One isosceles trapezoid with legs 1 and bases x and 2x; the question asks which x gives the largest area." + MM(ok))
    ]);
  })();

  // 2022 AIME I #3: the isosceles trapezoid (500, 650, legs 333) and the bisector points P, Q.
  PROB["2022-aime-i-3"] = (() => {
    const k = 0.58, h = Math.sqrt(333 * 333 - 75 * 75), Q0 = (x, y) => [27 + k * x, 240 - k * y];
    const D = Q0(0, 0), C = Q0(650, 0), B = Q0(575, h), A = Q0(75, h);
    const bis = (V, X, Y) => add(V, add(norm(sub(X, V)), norm(sub(Y, V))));
    const P = lineInt(A, bis(A, B, D), D, bis(D, C, A)), Qq = lineInt(B, bis(B, A, C), C, bis(C, D, B));
    const ok = Math.abs(dist(P, Qq) / k - 242) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C, D], DIM, 2), seg(A, P, ACC, 1.5), seg(D, P, ACC, 1.5), seg(B, Qq, ACC, 1.5), seg(C, Qq, ACC, 1.5), seg(mid(A, D), mid(B, C), FNT, 1.2, "4 3"),
      ...[A, B, C, D, P, Qq].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-8, -8]), "A", DIM, 13, "end"), txt(add(B, [8, -8]), "B", DIM, 13, "start"), txt(add(C, [10, 14]), "C"), txt(add(D, [-10, 14]), "D"),
      txt(add(P, [0, -10]), "P", ACC), txt(add(Qq, [0, -10]), "Q", ACC),
      txt(add(mid(A, B), [0, -10]), "500", DIM, 12), txt(add(mid(D, C), [0, 18]), "650", DIM, 12), txt(add(mid(A, D), [-14, 0]), "333", DIM, 12, "end"),
      cap(430, 270, "Isosceles trapezoid with bases AB = 500 and CD = 650 and legs 333; the bisectors at A and D meet at P, those at B and C at Q." + MM(ok))
    ]);
  })();

  // 2021 AIME II #12: the quadrilateral with sides 5, 6, 9, 7 and area 30.
  PROB["2021-aime-ii-12"] = (() => {
    const her = (a, b, c) => { const s2 = (a + b + c) / 2; return Math.sqrt(Math.max(0, s2 * (s2 - a) * (s2 - b) * (s2 - c))); };
    let lo = 4, hi = 11;  // the diagonal AC that makes the area 30 (the area grows with AC on this range)
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (her(5, 6, m) + her(9, 7, m) < 30) lo = m; else hi = m; }
    const e = (lo + hi) / 2, k = 18, Q = (x, y) => [130 + k * x, 120 - k * y];
    const ax = (25 - 36 + e * e) / (2 * e), A = Q(0, 0), C = Q(e, 0), B = Q(ax, Math.sqrt(25 - ax * ax));
    const dx = (49 - 81 + e * e) / (2 * e), D = Q(dx, -Math.sqrt(49 - dx * dx));
    const ok = Math.abs(her(5, 6, e) + her(9, 7, e) - 30) < 1e-6 && Math.abs(dist(C, D) / k - 9) < 1e-6;
    return wrap(430, 290, [
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.4), seg(B, D, FNT, 1.4), angleArc(lineInt(A, C, B, D), C, B, 16, GLD),
      ...[A, B, C, D].map(q => dot(q, DIM, 3.2)),
      txt(add(mid(A, B), [-8, -6]), "5", DIM, 12.5, "end"), txt(add(mid(B, C), [8, -6]), "6", DIM, 12.5, "start"), txt(add(mid(C, D), [10, 6]), "9", DIM, 12.5, "start"), txt(add(mid(D, A), [-10, 6]), "7", DIM, 12.5, "end"),
      cap(430, 290, "A convex quadrilateral with sides 5, 6, 9, 7 in order and area 30; θ (gold) is the acute angle between its diagonals." + MM(ok))
    ]);
  })();

  // 1984 AIME #9: the tetrahedron with edge AB = 3, faces of area 15 and 12 meeting at 30°.
  PROB["1984-aime-9"] = (() => {
    const c30 = Math.cos(Math.PI / 6), s30 = 0.5, { Pj, view } = projector([110, 250], 25, [1, 0], [0.55, -0.42]);
    const V = { A: [0, 0, 0], B: [3, 0, 0], C: [1.5, 10, 0], D: [1, 8 * c30, 8 * s30] };
    const faces = [["A", "B", "C"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"]];
    const cr = (u, w) => [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], s3 = (u, w) => u.map((x, i) => x - w[i]);
    const ar = (a, b, c) => Math.hypot(...cr(s3(V[b], V[a]), s3(V[c], V[a]))) / 2;
    const ok = Math.abs(ar("A", "B", "C") - 15) < 1e-9 && Math.abs(ar("A", "B", "D") - 12) < 1e-9;
    const P = n => Pj(V[n]);
    return wrap(430, 290, [
      poly(["A", "B", "C"].map(P), "none", 0, ACCS), poly(["A", "B", "D"].map(P), "none", 0, GLDS), ...solidEdges(V, faces, view, Pj), ...["A", "B", "C", "D"].map(n => dot(P(n), DIM, 3.2)),
      txt(add(P("A"), [-10, 14]), "A"), txt(add(P("B"), [10, 14]), "B"), txt(add(P("C"), [10, -4]), "C", DIM, 13, "start"), txt(add(P("D"), [-10, -6]), "D", DIM, 13, "end"),
      txt(add(mid(P("A"), P("B")), [0, 18]), "3", DIM, 12.5),
      cap(430, 290, "Tetrahedron ABCD with AB = 3; face ABC (blue) has area 15, face ABD (gold) has area 12, and the two faces meet at 30°." + MM(ok))
    ]);
  })();

  // 1992 AIME #7: the tetrahedron with BC = 10, faces of area 120 and 80 meeting at 30°.
  PROB["1992-aime-7"] = (() => {
    const c30 = Math.cos(Math.PI / 6), { Pj, view } = projector([120, 255], 10, [1, 0], [0.55, -0.4]);
    const V = { B: [0, 0, 0], C: [10, 0, 0], A: [5, 24, 0], D: [4, 16 * c30, 8] };
    const faces = [["A", "B", "C"], ["B", "C", "D"], ["A", "B", "D"], ["A", "C", "D"]];
    const cr = (u, w) => [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], s3 = (u, w) => u.map((x, i) => x - w[i]);
    const ar = (a, b, c) => Math.hypot(...cr(s3(V[b], V[a]), s3(V[c], V[a]))) / 2;
    const ok = Math.abs(ar("A", "B", "C") - 120) < 1e-9 && Math.abs(ar("B", "C", "D") - 80) < 1e-9;
    const P = n => Pj(V[n]);
    return wrap(430, 290, [
      poly(["A", "B", "C"].map(P), "none", 0, ACCS), poly(["B", "C", "D"].map(P), "none", 0, GLDS), ...solidEdges(V, faces, view, Pj), ...["A", "B", "C", "D"].map(n => dot(P(n), DIM, 3.2)),
      txt(add(P("A"), [10, -4]), "A", DIM, 13, "start"), txt(add(P("B"), [-10, 14]), "B"), txt(add(P("C"), [10, 14]), "C"), txt(add(P("D"), [-10, -6]), "D", DIM, 13, "end"),
      txt(add(mid(P("B"), P("C")), [0, 18]), "10", DIM, 12.5),
      cap(430, 290, "Tetrahedron ABCD with BC = 10; face ABC (blue) has area 120, face BCD (gold) has area 80, and they meet at 30°." + MM(ok))
    ]);
  })();

  // 1988 AIME #7: triangle ABC and the altitude from A cutting BC into 3 and 17.
  PROB["1988-aime-7"] = (() => {
    const h = 11, k = 13, Q = (x, y) => [80 + k * x, 238 - k * y];  // h = 11 is the altitude the tangent forces
    const B = Q(0, 0), H = Q(3, 0), C = Q(20, 0), A = Q(3, h);
    const t = (3 / h + 17 / h) / (1 - 51 / (h * h)), ok = Math.abs(t - 22 / 7) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, H, ACC, 1.6, "5 4"), rightAngle(H, A, C, 8), angleArc(A, B, C, 26, GLD), ...[A, B, C, H].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(mid(B, H), [0, 18]), "3", DIM, 12.5), txt(add(mid(H, C), [0, 18]), "17", DIM, 12.5),
      cap(430, 270, "Triangle ABC with tan∠CAB = 22/7 (gold); the altitude from A (dashed) cuts BC into pieces 3 and 17." + MM(ok))
    ]);
  })();

  // 2023 AMC 12B #17: the 6-10-14 triangle with its 120° angle.
  PROB["2023-amc-12b-17"] = (() => {
    const k = 17, Q = (x, y) => [100 + k * x, 222 - k * y];  // drawn with the sides the condition forces
    const C = Q(0, 0), A = Q(10, 0), B = Q(6 * Math.cos(2 * Math.PI / 3), 6 * Math.sin(2 * Math.PI / 3));
    const ok = Math.abs(dist(A, B) / k - 14) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), angleArc(C, A, B, 22, GLD), ...[A, B, C].map(q => dot(q, DIM, 3.2)),
      txt(add(C, [0, 18]), "120°", GLD, 11.5), txt(add(mid(B, C), [-12, 0]), "6", DIM, 12.5, "end"),
      cap(430, 270, "A triangle with sides in arithmetic progression, the smallest 6, and an angle of 120°." + MM(ok))
    ]);
  })();

  // 2024 AMC 12A #20: the equilateral triangle with P on AB and Q on AC.
  PROB["2024-amc-12a-20"] = (() => {
    const k = 230, Q0 = (x, y) => [100 + k * x, 245 - k * y];
    const A = Q0(0, 0), B = Q0(1, 0), C = Q0(0.5, Math.sqrt(3) / 2), P = lerp(A, B, 0.62), Qq = lerp(A, C, 0.7);
    const ok = Math.abs(dist(A, B) - dist(B, C)) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), poly([A, P, Qq], ACC, 1.8, ACCS), ...[A, B, C, P, Qq].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(P, [0, 18]), "P"), txt(add(Qq, [-10, -4]), "Q", DIM, 13, "end"),
      cap(430, 270, "Equilateral triangle ABC with P chosen at random on AB and Q at random on AC; the question is when triangle APQ (shaded) has less than half the area." + MM(ok))
    ]);
  })();

  // 1997 AIME #15: the 10-by-11 rectangle and one equilateral triangle inside it.
  PROB["1997-aime-15"] = (() => {
    const k = 21, Q = (x, y) => [100 + k * x, 245 - k * y], s = 8.4, t = 12 * Math.PI / 180;
    const T = [Q(1.5, 1.2), Q(1.5 + s * Math.cos(t), 1.2 + s * Math.sin(t)), Q(1.5 + s * Math.cos(t + Math.PI / 3), 1.2 + s * Math.sin(t + Math.PI / 3))];
    const inside = T.every(([x, y]) => x >= 100 - 1e-9 && x <= 100 + 11 * k + 1e-9 && y <= 245 + 1e-9 && y >= 245 - 10 * k - 1e-9);
    return wrap(430, 270, [
      poly([Q(0, 0), Q(11, 0), Q(11, 10), Q(0, 10)], DIM, 2), poly(T, ACC, 1.8, ACCS),
      txt(add(Q(5.5, 0), [0, 18]), "11", DIM, 12.5), txt(add(Q(11, 5), [12, 4]), "10", DIM, 12.5, "start"),
      cap(430, 270, "The 10-by-11 rectangle and one equilateral triangle that fits inside it; the question asks for the largest such triangle." + MM(inside))
    ]);
  })();

  // 1999 AIME #14: the 13-14-15 triangle and the point P with three equal angles.
  PROB["1999-aime-14"] = (() => {
    const k = 17, Q = (x, y) => [95 + k * x, 245 - k * y], th = Math.atan(168 / 295);
    const B = Q(0, 0), C = Q(14, 0), A = Q(5, 12);
    const rotv = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    const P = lineInt(A, add(A, rotv(sub(B, A), -th)), B, add(B, rotv(sub(C, B), -th)));
    const ang = (X, V, Y) => Math.acos(((X[0] - V[0]) * (Y[0] - V[0]) + (X[1] - V[1]) * (Y[1] - V[1])) / (dist(X, V) * dist(Y, V)));
    const ok = Math.abs(ang(P, A, B) - th) < 1e-9 && Math.abs(ang(P, B, C) - th) < 1e-9 && Math.abs(ang(P, C, A) - th) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), ...[A, B, C].map(q => seg(q, P, ACC, 1.5)), angleArc(A, B, P, 30, GLD), angleArc(B, C, P, 30, GLD), angleArc(C, A, P, 30, GLD),
      ...[A, B, C, P].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(P, [6, 16]), "P", ACC, 13, "start"),
      txt(add(mid(A, B), [-12, 0]), "13", DIM, 12.5, "end"), txt(add(mid(B, C), [0, 18]), "14", DIM, 12.5), txt(add(mid(A, C), [12, 0]), "15", DIM, 12.5, "start"),
      cap(430, 270, "Triangle ABC with AB = 13, BC = 14, CA = 15 and the point P inside it with angles PAB, PBC and PCA equal (gold)." + MM(ok))
    ]);
  })();

  // 2001 AIME I #4: the triangle with angles 60° and 45° and the bisector AT = 24.
  PROB["2001-aime-i-4"] = (() => {
    const k = 8.5, Q = (x, y) => [65 + k * x, 238 - k * y], ab = 24 * Math.sin(75 * Math.PI / 180) / Math.sin(Math.PI / 4);
    const A = Q(0, 0), B = Q(ab, 0), C = Q(12, 12 * Math.sqrt(3)), T = lineInt(A, Q(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)), B, C);
    const ok = Math.abs(dist(A, T) / k - 24) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, T, ACC, 1.8), angleArc(A, B, C, 26, GLD), angleArc(B, C, A, 26, GLD), ...[A, B, C, T].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(T, [10, -4]), "T", DIM, 13, "start"),
      txt(add(mid(A, T), [0, -10]), "24", ACC, 12.5), txt(add(A, [40, -6]), "60°", GLD, 11), txt(add(B, [-40, -6]), "45°", GLD, 11),
      cap(430, 270, "Triangle ABC with angle A = 60° and angle B = 45°; the bisector of angle A (blue) meets BC at T, and AT = 24." + MM(ok))
    ]);
  })();

  // 2007 AIME I #12: the isosceles triangle and its copy rotated about A, with the common region.
  PROB["2007-aime-i-12"] = (() => {
    const k = 6.2, Q = (x, y) => [150 + k * x, 258 - k * y], r = Math.PI / 12, h = 10 * Math.tan(5 * Math.PI / 12);
    const rot = ([x, y]) => [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
    const A3 = [0, 0], B3 = [20, 0], C3 = [10, h], [A, B, C, B2, C2] = [A3, B3, C3, rot(B3), rot(C3)].map(q => Q(...q));
    const ok = Math.abs(C2[0] - A[0]) < 1e-9;
    const P1 = lineInt(A, B2, B, C), P2 = lineInt(B, C, B2, C2), P3 = lineInt(A, C, B2, C2);
    return wrap(430, 290, [
      poly([A, P1, P2, P3], "none", 0, ACCS), poly([A, B, C], DIM, 2), poly([A, B2, C2], ACC, 1.8), ...[A, B, C, B2, C2].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -4]), "C", DIM, 13, "start"), txt(add(B2, [10, -4]), "B′", ACC, 13, "start"), txt(add(C2, [-10, 0]), "C′", ACC, 13, "end"),
      txt(add(mid(A, B), [0, 18]), "20", DIM, 12.5),
      cap(430, 290, "Isosceles triangle ABC (AC = BC, angle A = 75°, AB = 20) and its image AB′C′ (blue) after the rotation about A that puts C′ on the y-axis; the common region is shaded." + MM(ok))
    ]);
  })();

  // 2013 AIME I #12: triangle PQR with the regular hexagon of side 1 inside it.
  PROB["2013-aime-i-12"] = (() => {
    const r3 = Math.sqrt(3), k = 66, Q0 = (x, y) => [90 + k * x, 252 - k * y], u = [0.5, r3 / 2];
    const Qv = Q0(0, 0), P = Q0(r3 + 1, 0), R = Q0((2 + r3) * u[0], (2 + r3) * u[1]);
    const H = [[2, 0], [1, 0], u, [1, r3], [2, r3], [2.5, r3 / 2]].map(q => Q0(...q));
    const cr = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    const ok = Math.abs(cr(P, R, H[5])) < 1e-6;
    return wrap(430, 290, [
      poly([P, Qv, R], DIM, 2), poly(H, ACC, 1.8, ACCS), ...H.map(q => dot(q, ACC, 3)), ...[P, Qv, R].map(q => dot(q, DIM, 3.4)),
      txt(add(P, [10, 14]), "P"), txt(add(Qv, [-10, 14]), "Q"), txt(add(R, [0, -10]), "R"),
      ...["A", "B", "C", "D", "E", "F"].map((n, i) => txt(add(H[i], i < 2 ? [0, 18] : i === 2 ? [-12, 0] : i === 5 ? [12, 0] : [0, -10]), n, ACC, 12.5, i === 2 ? "end" : i === 5 ? "start" : "middle")),
      cap(430, 290, "Triangle PQR with angle P = 75° and angle Q = 60°, and a regular hexagon of side 1 with AB on PQ, CD on QR and F on RP." + MM(ok))
    ]);
  })();

  // 2013 AIME II #5: the equilateral triangle with D and E trisecting BC.
  PROB["2013-aime-ii-5"] = (() => {
    const k = 78, Q = (x, y) => [98 + k * x, 245 - k * y];
    const B = Q(0, 0), C = Q(3, 0), A = Q(1.5, 1.5 * Math.sqrt(3)), D = Q(1, 0), E = Q(2, 0);
    const ok = Math.abs(dist(A, E) / k - Math.sqrt(7)) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, D, ACC, 1.6), seg(A, E, ACC, 1.6), angleArc(A, D, E, 40, GLD), ...[A, B, C, D, E].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [0, 18]), "D"), txt(add(E, [0, 18]), "E"),
      cap(430, 270, "Equilateral triangle ABC with D and E trisecting BC; the angle DAE is marked." + MM(ok))
    ]);
  })();

  // 2018 AIME I #13: triangle ABC (30, 32, 34), a point X on BC and the incenters of ABX and ACX.
  PROB["2018-aime-i-13"] = (() => {
    const k = 8, Q = (x, y) => [80 + k * x, 245 - k * y], A = Q(12, Math.sqrt(756)), B = Q(0, 0), C = Q(32, 0), X = Q(19, 0);
    const inc = (P1, P2, P3) => { const a = dist(P2, P3), b = dist(P1, P3), c = dist(P1, P2); return mul(add(add(mul(P1, a), mul(P2, b)), mul(P3, c)), 1 / (a + b + c)); };
    const I1 = inc(A, B, X), I2 = inc(A, C, X);
    const ok = Math.abs(dist(A, B) / k - 30) < 1e-9 && Math.abs(dist(A, C) / k - 34) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), seg(A, X, FNT, 1.5), poly([A, I1, I2], ACC, 1.8, ACCS), ...[A, B, C, X].map(q => dot(q, DIM, 3.2)), dot(I1, ACC, 3), dot(I2, ACC, 3),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(X, [0, 18]), "X"),
      txt(add(I1, [-8, 4]), subT("I", "1"), ACC, 12.5, "end"), txt(add(I2, [8, 4]), subT("I", "2"), ACC, 12.5, "start"),
      txt(add(mid(A, B), [-12, 0]), "30", DIM, 12.5, "end"), txt(add(mid(B, C), [0, 18]), "32", DIM, 12.5), txt(add(mid(A, C), [12, 0]), "34", DIM, 12.5, "start"),
      cap(430, 290, "Triangle ABC with AB = 30, BC = 32, AC = 34, a point X on BC, and the incenters I₁ and I₂ of ABX and ACX; triangle AI₁I₂ is shaded." + MM(ok))
    ]);
  })();

  // 2025 AIME II #12: the non-convex 11-gon, a fan of nine triangles at A₁.
  PROB["2025-aime-ii-12"] = (() => {
    const u = (9 * Math.sqrt(5) - 1) / 4, x = (u + Math.sqrt(u * u - 4 * 26 / 5)) / 2, y = 26 / (5 * x), th = Math.acos(12 / 13), k = 40;
    const O = [225, 150], V = [O];
    for (let i = 2; i <= 11; i++) { const r = i % 2 === 0 ? x : y, a = -(i - 2) * th; V.push(add(O, [k * r * Math.cos(a), k * r * Math.sin(a)])); }
    const per = V.reduce((t, p, i) => t + dist(p, V[(i + 1) % 11]), 0) / k, ok = Math.abs(per - 20) < 1e-6;
    return wrap(430, 300, [
      poly(V, DIM, 2, ACCS), ...V.slice(1).map(q => seg(O, q, FNT, 1.1)), ...V.map(q => dot(q, DIM, 2.8)),
      txt(add(O, [-6, 14]), subT("A", "1"), DIM, 12.5, "end"), txt(add(V[1], [10, 4]), subT("A", "2"), DIM, 12.5, "start"), txt(add(V[10], [-4, 12]), subT("A", "11"), DIM, 12.5, "end"),
      cap(430, 300, "The 11-gon: from A₁ the nine triangles AᵢA₁Aᵢ₊₁ each have area 1 and the same angle at A₁ (cos = 12/13); the perimeter is 20." + MM(ok))
    ]);
  })();

  // 2025 AIME II #14: the right triangle with BC = 38 and the points K and L.
  PROB["2025-aime-ii-14"] = (() => {
    const r3 = Math.sqrt(3), k = 7.4, Q = (x, y) => [120 + k * x, 240 - k * y];  // the shape the conditions force
    const A = Q(0, 0), B = Q(16 * r3, 0), C = Q(0, 26), K = Q(8 * r3, 2), L = Q(3 * r3, 13);
    const ok = [[A, K], [A, L], [B, K], [C, L], [K, L]].every(([p, q]) => Math.abs(dist(p, q) / k - 14) < 1e-9) && Math.abs(dist(B, C) / k - 38) < 1e-9;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), rightAngle(A, B, C, 9), poly([B, K, L, C], ACC, 1.8, ACCS), seg(A, K, FNT, 1.4), seg(A, L, FNT, 1.4),
      ...[A, B, C, K, L].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [-10, -4]), "C"), txt(add(K, [4, -10]), "K"), txt(add(L, [10, -4]), "L", DIM, 13, "start"),
      txt(add(mid(B, C), [14, -4]), "38", DIM, 12.5, "start"),
      cap(430, 290, "Right triangle ABC (right angle at A, BC = 38) with points K and L inside such that AK = AL = BK = CL = KL = 14; quadrilateral BKLC is shaded." + MM(ok))
    ]);
  })();

  // 1999 AIME #12: the triangle with incircle of radius 21 touching AB at P (AP = 23, PB = 27).
  PROB["1999-aime-12"] = (() => {
    const a = 27 + 122.5, b = 23 + 122.5, k = 1.45, Q = (x, y) => [180 + k * x, 252 - k * y];  // the third tangent length 122.5 is what the radius forces
    const cx = (b * b - a * a + 2500) / 100, cy = Math.sqrt(b * b - cx * cx), A = Q(0, 0), B = Q(50, 0), C = Q(cx, cy), P = Q(23, 0), I = Q(23, 21);
    const ok = Math.abs(dist(C, foot(C, A, B)) / k - cy) < 1e-9 && Math.abs(dist(I, foot(I, A, C)) / k - 21) < 1e-6;
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), circ(I, 21 * k, ACC, 1.6), dot(P, ACC, 3), ...[A, B, C].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(P, [0, 18]), "P", ACC),
      txt(add(mid(A, P), [0, 18]), "23", DIM, 12), txt(add(mid(P, B), [0, 18]), "27", DIM, 12),
      cap(430, 290, "Triangle ABC whose incircle, of radius 21, touches AB at P with AP = 23 and PB = 27." + MM(ok))
    ]);
  })();

  // 2005 AIME I #15: the triangle with AB = 20 whose incircle trisects the median from C.
  PROB["2005-aime-i-15"] = (() => {
    const a = 26, b = 10, c = 20, k = 9.5, Q = (x, y) => [118 + k * x, 228 - k * y];  // a and b are the sides the condition forces
    const cx = (b * b - a * a + c * c) / (2 * c), cy = Math.sqrt(b * b - cx * cx), A = Q(0, 0), B = Q(c, 0), C = Q(cx, cy), M = Q(10, 0);
    const s2 = (a + b + c) / 2, r = Math.sqrt((s2 - a) * (s2 - b) * (s2 - c) / s2), I = Q(s2 - a, r);
    const pts = circleLineInts(I, r * k, C, M), ok = pts.length === 2 && Math.abs(dist(C, M) - 3 * Math.min(...pts.map(q => dist(C, q)))) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), circ(I, r * k, ACC, 1.6), seg(C, M, GLD, 1.8), ...pts.map(q => dot(q, GLD, 3)), ticksOn(A, M, 1), ticksOn(M, B, 1),
      ...[A, B, C, M].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [-10, -4]), "C"), txt(add(mid(A, B), [30, 18]), "20", DIM, 12.5),
      cap(430, 270, "Triangle ABC with AB = 20 whose incircle cuts the median from C (gold) into three equal pieces." + MM(ok))
    ]);
  })();

  // 2007 AIME II #15: the 13-14-15 triangle with the three corner circles and ω, all of one radius.
  PROB["2007-aime-ii-15"] = (() => {
    const k = 18, Q = (x, y) => [90 + k * x, 252 - k * y], r = 260 / 129;
    const B = Q(0, 0), C = Q(14, 0), A = Q(5, 12), I = Q(6, 4), sc = (4 - r) / 4;
    const cen = [A, B, C].map(V => add(I, mul(sub(V, I), sc))), O = lineInt(mid(cen[0], cen[1]), add(mid(cen[0], cen[1]), perp(sub(cen[1], cen[0]))), mid(cen[1], cen[2]), add(mid(cen[1], cen[2]), perp(sub(cen[2], cen[1]))));
    const ok = cen.every(q => Math.abs(dist(q, O) - 2 * r * k) < 1e-6);
    return wrap(430, 290, [
      poly([A, B, C], DIM, 2), ...cen.map(q => circ(q, r * k, ACC, 1.6)), circ(O, r * k, GLD, 1.8),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"),
      txt(add(mid(A, B), [-12, 0]), "13", DIM, 12.5, "end"), txt(add(mid(B, C), [0, 18]), "14", DIM, 12.5), txt(add(mid(A, C), [12, 0]), "15", DIM, 12.5, "start"),
      cap(430, 290, "The 13-14-15 triangle with three equal circles (blue), each tangent to two sides, and a fourth circle ω of the same radius (gold) tangent to all three." + MM(ok))
    ]);
  })();

  // 2010 AIME II #12: the two isosceles triangles with bases in the ratio 8 : 7.
  PROB["2010-aime-ii-12"] = (() => {
    const k = 0.78, tri = (x0, base, leg) => { const h = Math.sqrt(leg * leg - base * base / 4); return [[x0, 238], [x0 + k * base, 238], [x0 + k * base / 2, 238 - k * h]]; };
    const T1 = tri(20, 240, 218), T2 = tri(230, 210, 233);  // the smallest triangles the conditions allow
    const ar = T => Math.abs((T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[2][0] - T[0][0]) * (T[1][1] - T[0][1])) / 2;
    const ok = Math.abs(ar(T1) - ar(T2)) < 1e-6 && 240 + 2 * 218 === 210 + 2 * 233;
    return wrap(430, 270, [
      poly(T1, ACC, 2, ACCS), poly(T2, GLD, 2, GLDS),
      txt(add(mid(T1[0], T1[1]), [0, 18]), "8 parts", ACC, 12), txt(add(mid(T2[0], T2[1]), [0, 18]), "7 parts", GLD, 12),
      cap(430, 270, "Two noncongruent isosceles triangles with integer sides, the same perimeter and the same area, whose bases are in the ratio 8 : 7." + MM(ok))
    ]);
  })();

  // 2011 AIME II #10: the circle of radius 25 and the crossing chords of lengths 30 and 14.
  PROB["2011-aime-ii-10"] = (() => {
    const k = 4.6, O = [215, 140], ph = Math.acos(832 / 960), Ep = add(O, [20 * k, 0]), Fp = add(O, [24 * k * Math.cos(ph), -24 * k * Math.sin(ph)]);
    const uA = [0, 1], uC = perp(norm(sub(Fp, O)));
    const A = add(Ep, mul(uA, 15 * k)), B = add(Ep, mul(uA, -15 * k)), C = add(Fp, mul(uC, 7 * k)), D = add(Fp, mul(uC, -7 * k)), P = lineInt(A, B, C, D);
    const ok = Math.abs(dist(Ep, Fp) / k - 12) < 1e-9 && Math.abs((dist(O, P) / k) ** 2 - 4050 / 7) < 1e-6;
    return wrap(430, 290, [
      circ(O, 25 * k, DIM, 1.8), seg(A, B, ACC, 1.8), seg(C, D, GLD, 1.8), seg(O, Ep, FNT, 1.3, "4 3"), seg(O, Fp, FNT, 1.3, "4 3"),
      ...[O, A, B, C, D, P, Ep, Fp].map(q => dot(q, DIM, 3)),
      txt(add(O, [-10, 4]), "O", DIM, 13, "end"), txt(add(A, [8, 10]), "A", ACC, 13, "start"), txt(add(B, [8, -4]), "B", ACC, 13, "start"), txt(add(C, [0, -10]), "C", GLD), txt(add(D, [-8, 12]), "D", GLD), txt(add(P, [10, 4]), "P", DIM, 13, "start"),
      cap(430, 290, "A circle of radius 25 about O with chords AB = 30 (blue) and CD = 14 (gold) crossing at P; the chords' midpoints (on the dashed radii) are 12 apart." + MM(ok))
    ]);
  })();

  // 2013 AIME II #13: the isosceles triangle with D on BC, CD = 3·BD, and E the midpoint of AD.
  PROB["2013-aime-ii-13"] = (() => {
    const p = Math.sqrt(7), h = 3, k = 46, Q = (x, y) => [215 + k * x, 220 - k * y];  // the shape the conditions force
    const A = Q(-p, 0), B = Q(p, 0), C = Q(0, h), D = lerp(B, C, 0.25), E = mid(A, D);
    const ok = Math.abs(dist(C, E) / k - Math.sqrt(7)) < 1e-9 && Math.abs(dist(B, E) / k - 3) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, D, FNT, 1.5), seg(C, E, ACC, 1.8), seg(B, E, GLD, 1.8), ...[A, B, C, D, E].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [10, -2]), "D", DIM, 13, "start"), txt(add(E, [0, 18]), "E"),
      txt(add(mid(C, E), [-10, 0]), "√7", ACC, 12, "end"), txt(add(mid(B, E), [0, 16]), "3", GLD, 12),
      cap(430, 270, "Triangle ABC with AC = BC, D on BC with CD = 3·BD, and E the midpoint of AD; CE = √7 and BE = 3." + MM(ok))
    ]);
  })();

  // 2025 AIME II #1: six points on a line and the point G.
  PROB["2025-aime-ii-1"] = (() => {
    const pos = { A: 0, B: 18, C: 26, D: 40, E: 57, F: 73 }, k = 5.2, Q = (x, y) => [24 + k * x, 238 - k * y];
    const gx = 26 + (40 * 40 - 30 * 30 + 14 * 14) / 28, G = Q(gx, Math.sqrt(1600 - (gx - 26) ** 2));
    const P = n => Q(pos[n], 0);
    const ok = pos.C - pos.A === 26 && pos.D - pos.B === 22 && pos.E - pos.C === 31 && pos.F - pos.D === 33 && pos.F === 73 && Math.abs(dist(P("C"), G) / k - 40) < 1e-9 && Math.abs(dist(P("D"), G) / k - 30) < 1e-9;
    return wrap(430, 270, [
      seg(P("A"), P("F"), DIM, 2), poly([P("B"), G, P("E")], "none", 0, ACCS), seg(P("C"), G, ACC, 1.6), seg(P("D"), G, ACC, 1.6), seg(P("B"), G, FNT, 1.3, "4 3"), seg(P("E"), G, FNT, 1.3, "4 3"),
      ...Object.keys(pos).map(n => dot(P(n), DIM, 3.2)), dot(G, DIM, 3.4), ...Object.keys(pos).map(n => txt(add(P(n), [0, 18]), n)), txt(add(G, [0, -10]), "G"),
      cap(430, 270, "Points A to F on a line with AC = 26, BD = 22, CE = 31, DF = 33, AF = 73, and G off the line with CG = 40, DG = 30; triangle BGE is shaded." + MM(ok))
    ]);
  })();

  // 2018 AMC 10A #24: AB = 50, AC = 10, area 120; the midsegment DE and the bisector AG.
  PROB["2018-amc-10a-24"] = (() => {
    const sA = 0.48, cA = Math.sqrt(1 - sA * sA), k = 7.2, Q = (x, y) => [30 + k * x, 200 - k * y];
    const A = Q(0, 0), B = Q(50, 0), C = Q(10 * cA, 10 * sA), D = mid(A, B), E = mid(A, C), G = lerp(B, C, 5 / 6), F = lineInt(A, G, D, E);
    const ok = Math.abs(0.5 * 50 * 10 * sA - 120) < 1e-9 && Math.abs(dist(A, F) - dist(F, G)) < 1e-6;
    return wrap(430, 250, [
      poly([F, D, B, G], "none", 0, ACCS), poly([A, B, C], DIM, 2), seg(D, E, FNT, 1.5), seg(A, G, ACC, 1.8), ...[A, B, C, D, E, F, G].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [0, 18]), "D"), txt(add(E, [-4, -10]), "E"), txt(add(F, [4, -10]), "F", ACC), txt(add(G, [8, -8]), "G", ACC, 13, "start"),
      cap(430, 250, "Triangle ABC with AB = 50, AC = 10 and area 120; D and E are midpoints, and the bisector of angle A meets DE at F and BC at G. Quadrilateral FDBG is shaded." + MM(ok))
    ]);
  })();

  // 2010 AIME I #15: triangle ABC (12, 13, 15) and M on AC with equal incircles in ABM and CBM.
  PROB["2010-aime-i-15"] = (() => {
    const k = 20, Q = (x, y) => [80 + k * x, 245 - k * y], bx = 200 / 30, by = Math.sqrt(144 - bx * bx);
    const A = Q(0, 0), C = Q(15, 0), B = Q(bx, by), M = Q(22 / 3, 0);
    const inc = (P1, P2, P3) => { const a = dist(P2, P3), b = dist(P1, P3), c = dist(P1, P2); return [mul(add(add(mul(P1, a), mul(P2, b)), mul(P3, c)), 1 / (a + b + c))]; };
    const [I1] = inc(A, B, M), [I2] = inc(C, B, M), r1 = 245 - I1[1], r2 = 245 - I2[1], ok = Math.abs(r1 - r2) < 1e-6 && Math.abs(dist(B, M) / k - 10) < 1e-6;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(B, M, ACC, 1.6), circ(I1, r1, GLD, 1.6), circ(I2, r2, GLD, 1.6), ...[A, B, C, M].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [0, -10]), "B"), txt(add(C, [10, 14]), "C"), txt(add(M, [0, 18]), "M", ACC),
      txt(add(mid(A, B), [-12, 0]), "12", DIM, 12.5, "end"), txt(add(mid(B, C), [12, 0]), "13", DIM, 12.5, "start"),
      cap(430, 270, "Triangle ABC with AB = 12, BC = 13, AC = 15 and M on AC chosen so that the incircles of ABM and CBM (gold) have equal radii." + MM(ok))
    ]);
  })();

  // 2020 AIME II #13: the pentagon with sides 5, 6, 6, 6, 7 around its inscribed circle.
  PROB["2020-aime-ii-13"] = (() => {
    const r = 4, t = [3, 2, 4, 2, 4], ph = t.map(x => Math.atan(x / r)), k = 21, O = [215, 145];  // r = 4 is what closes the angles
    const ang = [0]; for (let i = 1; i < 5; i++) ang.push(ang[i - 1] + ph[i - 1] + ph[i]);
    const V = ang.map((a, i) => add(O, [k * Math.hypot(t[i], r) * Math.cos(a - 1.2), k * Math.hypot(t[i], r) * Math.sin(a - 1.2)]));
    const total = ang[4] + ph[4] + ph[0], sides = V.map((p, i) => dist(p, V[(i + 1) % 5]) / k);
    const ok = Math.abs(total - 2 * Math.PI) < 1e-9 && [5, 6, 6, 6, 7].every((x, i) => Math.abs(sides[i] - x) < 1e-9);
    return wrap(430, 290, [
      poly(V, DIM, 2), circ(O, r * k, ACC, 1.6), ...V.map(q => dot(q, DIM, 3.2)),
      ...V.map((q, i) => txt(add(q, mul(norm(sub(q, O)), 15)), "ABCDE"[i], DIM, 13)),
      ...V.map((q, i) => { const Mq = mid(q, V[(i + 1) % 5]); return txt(add(Mq, mul(norm(sub(Mq, O)), 14)), String([5, 6, 6, 6, 7][i]), DIM, 12); }),
      cap(430, 290, "Convex pentagon ABCDE with AB = 5, BC = CD = DE = 6, EA = 7 and an inscribed circle (blue)." + MM(ok))
    ]);
  })();

  // 2026 AIME I #10: the 13-14-15 triangle, its rotation about the circumcenter, and the hexagon.
  PROB["2026-aime-i-10"] = (() => {
    const k = 12.5, Q = (x, y) => [150 + k * x, 188 - k * y];
    const A = Q(5, 12), B = Q(0, 0), C = Q(14, 0), A2 = Q(81 / 8, 93 / 8), B2 = Q(-43 / 40, 201 / 40), C2 = Q(81 / 8, -27 / 8), O = Q(7, 33 / 8);
    const ok = Math.abs(A2[0] - C2[0]) < 1e-9 && Math.abs(dist(O, A2) - dist(O, A)) < 1e-9;
    return wrap(430, 290, [
      poly([A, A2, C, C2, B, B2], "none", 0, ACCS), circ(O, 65 / 8 * k, FNT, 1.2, "none", "4 3"), poly([A, B, C], DIM, 2), poly([A2, B2, C2], ACC, 1.8),
      ...[A, B, C, A2, B2, C2].map(q => dot(q, DIM, 3)), dot(O, DIM, 2.6),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [-4, 16]), "C"), txt(add(A2, [10, -4]), "A′", ACC, 13, "start"), txt(add(B2, [-10, 0]), "B′", ACC, 13, "end"), txt(add(C2, [10, 10]), "C′", ACC, 13, "start"),
      cap(430, 290, "The 13-14-15 triangle ABC and its rotation A′B′C′ (blue) about the circumcenter with A′C′ ⟂ BC; the hexagon AA′CC′BB′ is shaded." + MM(ok))
    ]);
  })();

  // 2003 AIME II #7: the rhombus and the circumcircles of ABD (12.5) and ACD (25).
  PROB["2003-aime-ii-7"] = (() => {
    const k = 3.6, O = [215, 180], Q = (x, y) => [O[0] + k * x, O[1] - k * y];  // half-diagonals 20 and 10 are what the radii force
    const A = Q(-20, 0), C = Q(20, 0), B = Q(0, 10), D = Q(0, -10);
    const cc = (P1, P2, P3) => lineInt(mid(P1, P2), add(mid(P1, P2), perp(sub(P2, P1))), mid(P2, P3), add(mid(P2, P3), perp(sub(P3, P2))));
    const O1 = cc(A, B, D), O2 = cc(A, C, D), ok = Math.abs(dist(O1, A) / k - 12.5) < 1e-9 && Math.abs(dist(O2, A) / k - 25) < 1e-9;
    return wrap(430, 300, [
      circ(O1, 12.5 * k, ACC, 1.5), circ(O2, 25 * k, GLD, 1.5), poly([A, B, C, D], DIM, 2), ...[A, B, C, D].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [0, -10]), "B"), txt(add(C, [10, 4]), "C", DIM, 13, "start"), txt(add(D, [0, 18]), "D"),
      cap(430, 300, "Rhombus ABCD with the circumcircle of ABD (radius 12.5, blue) and of ACD (radius 25, gold)." + MM(ok))
    ]);
  })();

  // 2001 AIME I #9: triangle ABC (13, 15, 17) with D, E, F on its sides (one allowed choice of p, q, r).
  PROB["2001-aime-i-9"] = (() => {
    const p = (8 / 3 - Math.sqrt(64 / 9 - 24 * (4 / 9 - 2 / 5))) / 12, q = p, r = 2 / 3 - 2 * p;
    const k = 13, Q = (x, y) => [80 + k * x, 245 - k * y], ax = (169 - 289 + 225) / 30, A = Q(ax, Math.sqrt(169 - ax * ax)), B = Q(0, 0), C = Q(15, 0);
    const D = lerp(A, B, p), E = lerp(B, C, q), F = lerp(C, A, r);
    const ok = p > 0 && r > 0 && Math.abs(p * p + q * q + r * r - 0.4) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), poly([D, E, F], ACC, 1.8, ACCS), ...[A, B, C, D, E, F].map(q2 => dot(q2, DIM, 3)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [-12, 0]), "D", DIM, 13, "end"), txt(add(E, [0, 18]), "E"), txt(add(F, [12, 0]), "F", DIM, 13, "start"),
      cap(430, 270, "Triangle ABC with AB = 13, BC = 15, CA = 17 and D, E, F on its sides with AD = p·AB, BE = q·BC, CF = r·CA; drawn with one triple satisfying p + q + r = 2/3 and p² + q² + r² = 2/5." + MM(ok))
    ]);
  })();

  // 1996 AIME #13: triangle ABC, the median AE extended to D with angle ADB = 90°.
  PROB["1996-aime-13"] = (() => {
    const k = 44, Q = (x, y) => [70 + k * x, 220 - k * y], ab = Math.sqrt(30), ac = Math.sqrt(6), bc = Math.sqrt(15);
    const cx = (ab * ab + ac * ac - bc * bc) / (2 * ab), A = Q(0, 0), B = Q(ab, 0), C = Q(cx, Math.sqrt(ac * ac - cx * cx)), E = mid(B, C), D = foot(B, A, E);
    const ok = Math.abs(dist(A, D) / dist(A, E) - 27 / 19) < 1e-9;
    return wrap(430, 270, [
      poly([A, B, C], DIM, 2), seg(A, D, ACC, 1.6), seg(B, D, FNT, 1.4, "4 3"), rightAngle(D, A, B, 8), ...[A, B, C, D, E].map(q => dot(q, DIM, 3.2)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [8, -8]), "D", ACC, 13, "start"), txt(add(E, [-10, -6]), "E", DIM, 13, "end"),
      cap(430, 270, "Triangle ABC with AB = √30, AC = √6, BC = √15; the line AD through the midpoint E of BC, with angle ADB = 90°." + MM(ok))
    ]);
  })();

  // 1993 AIME #15: the altitude CH and the incircles of ACH and BCH touching CH at R and S.
  PROB["1993-aime-15"] = (() => {
    const c = 1995, b = 1994, a = 1993, k = 0.13, ah = (b * b - a * a + c * c) / (2 * c), h = Math.sqrt(b * b - ah * ah), Q = (x, y) => [85 + k * x, 262 - k * y];
    const A = Q(0, 0), B = Q(c, 0), C = Q(ah, h), H = Q(ah, 0);
    const r1 = (ah + h - b) / 2, r2 = (c - ah + h - a) / 2, I1 = Q(ah - r1, r1), I2 = Q(ah + r2, r2), R = Q(ah, r1), S = Q(ah, r2);
    const ok = Math.abs(Math.abs(r1 - r2) - 332 / 665) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(C, H, FNT, 1.5), rightAngle(H, A, C, 7), circ(I1, r1 * k, ACC, 1.5), circ(I2, r2 * k, GLD, 1.5), dot(R, ACC, 2.6), dot(S, GLD, 2.6),
      ...[A, B, C, H].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"), txt(add(H, [0, 18]), "H"), txt(add(R, [-6, -6]), "R", ACC, 12, "end"), txt(add(S, [6, 10]), "S", GLD, 12, "start"),
      cap(430, 300, "Triangle ABC (AB = 1995, AC = 1994, BC = 1993) with the altitude CH; the incircles of ACH and BCH touch CH at R and S, which are less than a unit apart." + MM(ok))
    ]);
  })();

  // ---- Law of Sines (practice pass, 2026-10-17) ----
  PROB["1996-aime-15"] = (() => {
    const t = rad(15), k = 235, Q = (x, y) => [108 + k * x, 190 - k * y];
    const ao = Math.sin(t) / Math.sin(rad(135)), o = [ao * Math.cos(2 * t), ao * Math.sin(2 * t)];
    const A = Q(0, 0), B = Q(1, 0), O = Q(...o), C = Q(2 * o[0], 2 * o[1]), D = Q(2 * o[0] - 1, 2 * o[1]);
    const ang = (V, P, R) => { const u = sub(P, V), v = sub(R, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; };
    const ok = Math.abs(ang(B, D, C) - 30) < 1e-9 && Math.abs(ang(B, D, A) - 15) < 1e-9 && Math.abs(ang(C, A, B) / ang(O, A, B) - 7 / 9) < 1e-9;
    return wrap(430, 250, [
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.6), seg(B, D, FNT, 1.6),
      angleArc(B, A, D, 46, ACC), angleArc(B, D, C, 34, GLD), angleArc(A, B, C, 50, GLD),
      ...[A, B, C, D, O].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-8, 5]), "D", DIM, 13, "end"), txt(add(O, [0, 20]), "O"),
      txt(add(B, [-58, -6]), "θ", ACC, 13), txt(add(B, [-34, -26]), "2θ", GLD, 13), txt(add(A, [62, -12]), "2θ", GLD, 13),
      cap(430, 250, "Parallelogram ABCD with diagonals meeting at O: angles CAB and DBC (gold) are each twice angle DBA (blue)." + MM(ok))
    ]);
  })();

  PROB["2000-aime-i-14"] = (() => {
    const k = 82, Q = (x, y) => [215 + k * x, 275 - k * y];
    const L = 1 / (2 * Math.sin(rad(10))), h = L * Math.cos(rad(10));   // AB = AC with BC = 1 and apex 20°
    const A = Q(0, h), B = Q(-0.5, 0), C = Q(0.5, 0), P = lerp(A, C, 1 / L), Qp = lerp(A, B, (L - 1) / L);
    const ok = Math.abs(dist(P, Qp) / k - 1) < 1e-9 && Math.abs(dist(A, P) / k - 1) < 1e-9 && Math.abs(dist(Qp, B) / k - 1) < 1e-9;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(P, Qp, ACC, 2),
      ticksOn(A, P, 1, ACC), ticksOn(P, Qp, 1, ACC), ticksOn(Qp, B, 1, ACC), ticksOn(B, C, 1, ACC),
      ...[A, B, C, P, Qp].map(q => dot(q, DIM, 3)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(P, [12, 4]), "P", DIM, 13, "start"), txt(add(Qp, [-12, 4]), "Q", DIM, 13, "end"),
      cap(430, 300, "Isosceles triangle ABC with angles B and C equal, and P on AC, Q on AB with AP = PQ = QB = BC (the four marked segments)." + MM(ok))
    ]);
  })();

  PROB["2005-aime-ii-14"] = (() => {
    const k = 22, Q = (x, y) => [50 + k * x, 270 - k * y];
    const B = Q(0, 0), C = Q(15, 0), A = Q(6.6, 11.2), D = Q(9, 0), E = Q(2535 / 463, 0);
    const ang = (V, P, R) => { const u = sub(P, V), v = sub(R, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))); };
    const ok = Math.abs(dist(A, B) / k - 13) < 1e-9 && Math.abs(dist(A, C) / k - 14) < 1e-9 && Math.abs(ang(A, B, E) - ang(A, C, D)) < 1e-9;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(A, D, ACC, 1.8), seg(A, E, GLD, 1.8),
      angleArc(A, B, E, 40, GLD), angleArc(A, D, C, 40, ACC),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3)),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [0, 18]), "D"), txt(add(E, [0, 18]), "E"),
      txt(add(mid(A, B), [-14, 0]), "13", DIM, 13, "end"), txt(add(mid(A, C), [14, 0]), "14", DIM, 13, "start"), txt(add(mid(D, C), [0, 18]), "6", DIM, 13),
      cap(430, 300, "Triangle ABC with AB = 13, BC = 15, CA = 14; D on BC with CD = 6, and E on BC with angle BAE (gold) equal to angle CAD (blue)." + MM(ok))
    ]);
  })();

  PROB["2011-aime-ii-13"] = (() => {
    const k = 9.5, Q = (x, y) => [158 + k * x, 240 - k * y], ap = Math.sqrt(72) + Math.sqrt(24);
    const A = Q(0, 0), B = Q(12, 0), C = Q(12, 12), D = Q(0, 12), P = Q(ap / Math.SQRT2, ap / Math.SQRT2);
    const O1 = K.circumcenterOf(A, B, P), O2 = K.circumcenterOf(C, D, P);
    const u = sub(O1, P), v = sub(O2, P), a = Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI;
    const ok = Math.abs(a - 120) < 1e-9;
    return wrap(430, 300, [
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.6),
      circ(O1, dist(O1, A), ACC, 1.4, "none", "5 4"), circ(O2, dist(O2, C), GLD, 1.4, "none", "5 4"),
      seg(P, O1, ACC, 1.8), seg(P, O2, GLD, 1.8), angleArc(P, O1, O2, 18, ORG),
      ...[A, B, C, D, P].map(q => dot(q, DIM, 3)), dot(O1, ACC, 3.5), dot(O2, GLD, 3.5),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"), txt(add(P, [-4, -12]), "P", DIM, 13, "end"),
      txt(add(O1, [12, 4]), "O₁", ACC, 13, "start"), txt(add(O2, [-12, 4]), "O₂", GLD, 13, "end"), txt(add(P, [-22, 8]), "120°", ORG, 12, "end"),
      cap(430, 300, "Square ABCD of side 12 with P on the diagonal AC, nearer C; O₁ and O₂ are the circumcenters of ABP and CDP (dashed circles), and angle O₁PO₂ is 120°." + MM(ok))
    ]);
  })();

  PROB["2016-aime-ii-10"] = (() => {
    // the circle through A and B, and C on it, solved numerically so that AS = 7 and BT = 5; ok checks it
    const kk = 2.360840969484, ph = 2.335848971156, R0 = Math.hypot(6.5, kk), k = 18, Q = (x, y) => [98 + k * x, 194 - k * y];
    const Om = [6.5, kk], Cm = [6.5 + R0 * Math.cos(ph), kk + R0 * Math.sin(ph)];
    const again = X => { const d = sub(X, Cm), w = sub(Cm, Om), t = -2 * (d[0] * w[0] + d[1] * w[1]) / (d[0] * d[0] + d[1] * d[1]); return add(Cm, mul(d, t)); };
    const Sm = again([4, 0]), Tm = again([7, 0]);
    const A = Q(0, 0), B = Q(13, 0), P = Q(4, 0), Qq = Q(7, 0), C = Q(...Cm), S = Q(...Sm), T = Q(...Tm), O = Q(...Om);
    const ok = Math.abs(dist(S, A) / k - 7) < 1e-6 && Math.abs(dist(T, B) / k - 5) < 1e-6 && Math.abs(dist(S, T) / k - 35 / 8) < 1e-6;
    return wrap(430, 300, [
      circ(O, R0 * k, FNT, 1.5), poly([A, B, C], DIM, 2), seg(C, S, ACC, 1.8), seg(C, T, GLD, 1.8),
      seg(A, S, DIM, 1.5, "5 4"), seg(B, T, DIM, 1.5, "5 4"),
      ...[A, B, C, P, Qq, S, T].map(q => dot(q, DIM, 3)),
      txt(add(A, [-12, 4]), "A", DIM, 13, "end"), txt(add(B, [12, 4]), "B", DIM, 13, "start"), txt(add(C, [-6, -10]), "C"),
      txt(add(P, [-8, -8]), "P"), txt(add(Qq, [8, -8]), "Q"), txt(add(S, [-6, 18]), "S"), txt(add(T, [8, 18]), "T"),
      txt(add(mid(A, P), [0, -8]), "4", DIM, 12), txt(add(mid(P, Qq), [0, -8]), "3", DIM, 12), txt(add(mid(Qq, B), [0, -8]), "6", DIM, 12),
      txt(add(mid(A, S), [-12, 0]), "7", DIM, 12, "end"), txt(add(mid(B, T), [12, 0]), "5", DIM, 12, "start"),
      cap(430, 300, "Triangle ABC in its circle, with P and Q on AB (AP = 4, PQ = 3, QB = 6); rays CP and CQ meet the circle again at S and T, with AS = 7 and BT = 5." + MM(ok))
    ]);
  })();

  PROB["2018-aime-ii-14"] = (() => {
    const a = 33 / 5, k = 34, Qf = (x, y) => [70 + k * x, 270 - k * y];
    const ax = (49 - 64 + a * a) / (2 * a);   // A over BC, with AB = 7 and AC = 8
    const Bm = [0, 0], Cm = [a, 0], Am = [ax, Math.sqrt(49 - ax * ax)];
    const Im = K.incenterOf(Am, Bm, Cm), r = Im[1], Xm = [Im[0], 0];
    const d = sub(Xm, Am), w = sub(Am, Im), dd = d[0] * d[0] + d[1] * d[1], bq = 2 * (d[0] * w[0] + d[1] * w[1]), cq = w[0] * w[0] + w[1] * w[1] - r * r;
    const Ym = add(Am, mul(d, (-bq - Math.sqrt(bq * bq - 4 * dd * cq)) / (2 * dd)));
    const Pm = lerp(Am, Bm, 3 / 7), Qm = lerp(Am, Cm, (168 / 59) / 8);
    const A = Qf(...Am), B = Qf(...Bm), C = Qf(...Cm), I = Qf(...Im), X = Qf(...Xm), Y = Qf(...Ym), P = Qf(...Pm), Q = Qf(...Qm);
    const F = foot(I, P, Q), ok = Math.abs(dist(I, F) - r * k) < 1e-6 && dist(F, Y) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), circ(I, r * k, ACC, 1.6), seg(A, X, FNT, 1.5), seg(P, Q, GLD, 2),
      ...[A, B, C, X, P, Q].map(q => dot(q, DIM, 3)), dot(Y, GLD, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(X, [0, 18]), "X"),
      txt(add(P, [-12, 2]), "P", DIM, 13, "end"), txt(add(Q, [12, 2]), "Q", DIM, 13, "start"), txt(add(Y, [10, -8]), "Y", GLD, 13, "start"), txt(add(I, [0, 30]), "ω", ACC, 13),
      txt(add(mid(A, P), [-12, 0]), "3", DIM, 12, "end"), txt(add(mid(P, B), [-12, 0]), "4", DIM, 12, "end"), txt(add(mid(A, C), [14, 0]), "8", DIM, 12, "start"),
      cap(430, 300, "The incircle ω of ABC touches BC at X, and AX meets ω again at Y; the tangent at Y meets AB at P and AC at Q, with AP = 3, PB = 4, AC = 8." + MM(ok))
    ]);
  })();

  PROB["2024-amc-12b-22"] = (() => {
    const t = rad(32), k = 260, Q = (x, y) => [80 + k * x, 250 - k * y];   // any triangle with B = 2A; c = AB = 1
    const bc = Math.sin(t) / Math.sin(3 * t), Cm = [1 - bc * Math.cos(2 * t), bc * Math.sin(2 * t)];
    const A = Q(0, 0), B = Q(1, 0), C = Q(...Cm);
    const ang = (V, P, R) => { const u = sub(P, V), v = sub(R, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))); };
    const ok = Math.abs(ang(B, A, C) - 2 * ang(A, B, C)) < 1e-9;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), angleArc(A, B, C, 44, ACC), angleArc(B, C, A, 34, GLD),
      ...[A, B, C].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [0, -10]), "C"),
      txt(add(A, [58, -12]), "θ", ACC, 13), txt(add(B, [-36, -24]), "2θ", GLD, 13),
      cap(430, 300, "A triangle with angle B (gold) twice angle A (blue); the sides are to be integers." + MM(ok))
    ]);
  })();

  // ---- Law of Cosines (practice pass, 2026-10-17) ----
  PROB["2024-amc-12a-19"] = (() => {
    const Dm = [0, 0], Am = [5, 0], Cm = [3 * Math.cos(rad(120)), 3 * Math.sin(rad(120))], Om = K.circumcenterOf(Am, Cm, Dm);
    const Bm = sub(mul(foot(Dm, Om, Cm), 2), Dm);   // CB = CD on the same circle: B is D reflected in line OC
    const k = 30, Q = (x, y) => [215 + k * (x - Om[0]), 148 - k * (y - Om[1])];
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), D = Q(...Dm), O = Q(...Om), R = dist(O, D);
    const ok = Math.abs(dist(A, C) / k - 7) < 1e-9 && Math.abs(dist(A, B) / k - 8) < 1e-9 && Math.abs(dist(B, C) / k - 3) < 1e-9;
    return wrap(430, 300, [
      circ(O, R, FNT, 1.5), poly([A, B, C, D], DIM, 2), angleArc(D, A, C, 22, ORG),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)),
      txt(add(away(A, O, 14), [0, 4]), "A"), txt(add(away(B, O, 14), [0, 4]), "B"), txt(add(away(C, O, 14), [0, 4]), "C"), txt(add(away(D, O, 14), [0, 4]), "D"),
      txt(add(D, [6, -28]), "120°", ORG, 12, "start"),
      txt(add(mid(D, A), [0, -8]), "5", DIM, 12), txt(add(mid(C, D), [10, 6]), "3", DIM, 12, "start"), txt(add(mid(B, C), [8, 12]), "3", DIM, 12, "start"),
      cap(430, 300, "Cyclic quadrilateral ABCD with BC = CD = 3, DA = 5, and angle CDA = 120°." + MM(ok))
    ]);
  })();

  PROB["2025-amc-12a-8"] = (() => {
    const Am = [0, 0], Bm = [9 * Math.cos(rad(-30)), 9 * Math.sin(rad(-30))], Dm = [24 * Math.cos(rad(30)), 24 * Math.sin(rad(30))];
    const Om = K.circumcenterOf(Am, Bm, Dm), k = 10.5, Q = (x, y) => [215 + k * (x - Om[0]), 148 - k * (y - Om[1])];
    const A = Q(...Am), B = Q(...Bm), D = Q(...Dm), O = K.circumcenterOf(A, B, D), R = dist(O, A);
    const Cc = (() => { const u = [1, 0], t = 2 * ((O[0] - A[0]) * u[0] + (O[1] - A[1]) * u[1]); return add(A, mul(u, t)); })();
    const aD = Math.atan2(D[1] - O[1], D[0] - O[0]), aA = Math.atan2(A[1] - O[1], A[0] - O[0]);
    let da = aA - aD; while (da > 0) da -= 2 * Math.PI;                 // arc D -> A not through B, C
    const E = onC(O, R, (aD + da / 2) * 180 / Math.PI), F = lineInt(A, Cc, B, D);
    const ang = (V, P, Rr) => { const u = sub(P, V), v = sub(Rr, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; };
    const ok = Math.abs(ang(E, B, Cc) - 30) < 1e-6 && Math.abs(ang(E, Cc, D) - 30) < 1e-6 && Math.abs(dist(B, F) / k - 63 / 11) < 1e-6;
    return wrap(430, 300, [
      circ(O, R, FNT, 1.5), poly([A, B, Cc, D, E], DIM, 2), seg(A, Cc, FNT, 1.5), seg(B, D, FNT, 1.5), seg(A, D, FNT, 1.5), seg(E, B, ACC, 1.5), seg(E, Cc, ACC, 1.5),
      angleArc(E, B, Cc, 40, ACC), angleArc(E, Cc, D, 50, GLD),
      ...[A, B, Cc, D, E, F].map(q => dot(q, DIM, 3)),
      txt(away(A, O, 14), "A"), txt(add(away(B, O, 14), [0, 6]), "B"), txt(add(away(Cc, O, 14), [0, 4]), "C"), txt(away(D, O, 14), "D"), txt(add(away(E, O, 14), [0, 4]), "E"),
      txt(add(F, [4, 18]), "F", DIM, 13, "start"),
      txt(add(mid(A, B), [-8, 14]), "9", DIM, 12, "end"), txt(add(mid(A, D), [-6, -8]), "24", DIM, 12, "end"),
      cap(430, 300, "Pentagon ABCDE in a circle with angles BEC and CED (blue and gold) both 30°; AB = 9, AD = 24, and the diagonals AC and BD cross at F." + MM(ok))
    ]);
  })();

  PROB["2026-aime-i-5"] = (() => {
    const th = Math.acos(29 / 36), k = 190, Q = (x, y) => [105 + k * x, 85 - k * y];
    const Am = [0, 0], Bm = [1, 0], rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    const Apm = add(Bm, rot(sub(Am, Bm), th)), Bpm = add(Apm, rot(sub(Bm, Apm), -th));
    const A = Q(...Am), B = Q(...Bm), Ap = Q(...Apm), Bp = Q(...Bpm);
    const ok = Math.abs(dist(A, Bp) / k - 4 / 3) < 1e-9 && Math.abs(dist(B, Ap) / k - 1) < 1e-9 && Math.abs(dist(Ap, Bp) / k - 1) < 1e-9;
    return wrap(430, 300, [
      seg(A, B, DIM, 2), seg(B, Ap, ACC, 2), seg(Ap, Bp, GLD, 2), seg(A, Bp, FNT, 1.5, "5 4"),
      angleArc(B, A, Ap, 30, ACC), angleArc(Ap, B, Bp, 30, GLD),
      ...[A, B, Ap, Bp].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(Ap, [-10, -8]), "A′"), txt(add(Bp, [10, -8]), "B′"),
      txt(add(B, [-40, 22]), "θ", ACC, 13), txt(add(Ap, [44, -10]), "θ", GLD, 13),
      txt(add(mid(A, B), [0, 18]), "1", DIM, 12), txt(add(lerp(A, Bp, 0.78), [6, -10]), "4/3", DIM, 12, "start"),
      cap(430, 300, "A is turned counterclockwise by θ about B to A′ (blue), then B is turned clockwise by θ about A′ to B′ (gold); AB = 1 and AB′ = 4/3." + MM(ok))
    ]);
  })();

  PROB["2026-aime-i-14"] = (() => {
    // sides found numerically so that the squares add to 308 and the diagonals' squares to 800; the last two close the pentagon
    const u = [0, 1, 2, 3, 4].map(i => [Math.cos(rad(72 * i)), Math.sin(rad(72 * i))]);
    const a = [6.77422, 7.92370, 8.53810];
    const r = [0, 1, 2].reduce((s, i) => add(s, mul(u[i], a[i])), [0, 0]), det = u[3][0] * u[4][1] - u[3][1] * u[4][0];
    a.push((-r[0] * u[4][1] + r[1] * u[4][0]) / det, (-u[3][0] * r[1] + u[3][1] * r[0]) / det);
    const k = 19, V = [[0, 0]]; for (let i = 0; i < 4; i++) V.push(add(V[i], mul(u[i], a[i])));
    const cx = V.reduce((s, p) => add(s, p), [0, 0]).map(z => z / 5), P = V.map(p => [215 + k * (p[0] - cx[0]), 150 - k * (p[1] - cx[1])]);
    const s2 = a.reduce((s, x) => s + x * x, 0), d2 = [0, 1, 2, 3, 4].reduce((s, i) => s + (dist(P[i], P[(i + 2) % 5]) / k) ** 2, 0);
    const ok = Math.abs(s2 - 308) < 0.01 && Math.abs(d2 - 800) < 0.01 && Math.abs(a.reduce((s, x) => s + x, 0) ** 2 - 676 * Math.sqrt(5)) < 0.05;
    const O = mul(P.reduce((s, p) => add(s, p), [0, 0]), 1 / 5);
    return wrap(430, 300, [
      ...[0, 1, 2, 3, 4].map(i => seg(P[i], P[(i + 2) % 5], FNT, 1.4, "5 4")),
      poly(P, DIM, 2),
      ...P.map((p, i) => angleArc(p, P[(i + 4) % 5], P[(i + 1) % 5], 16, ACC)),
      ...P.map(p => dot(p, DIM, 3)),
      ...[0, 1, 2, 3, 4].map(i => txt(add(away(mid(P[i], P[(i + 1) % 5]), O, 14), [0, 5]), "a" + "₁₂₃₄₅"[i], DIM, 13)),
      cap(430, 300, "An equiangular pentagon: every angle (blue) is 108°. The squares of the sides a₁, ..., a₅ add to 308, and the squares of the five dashed diagonals add to 800." + MM(ok))
    ]);
  })();

  PROB["1989-aime-10"] = (() => {
    const A = [80, 240], B = [360, 240], C = [150, 70];
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), angleArc(A, B, C, 30, ACC), angleArc(B, C, A, 34, ACC), angleArc(C, A, B, 26, GLD),
      ...[A, B, C].map(q => dot(q, DIM, 3)),
      txt(add(A, [42, -10]), "α", ACC, 13), txt(add(B, [-44, -8]), "β", ACC, 13), txt(add(C, [6, 40]), "γ", GLD, 13),
      txt(add(mid(B, C), [12, -6]), "a", DIM, 13, "start"), txt(add(mid(A, C), [-12, -4]), "b", DIM, 13, "end"), txt(add(mid(A, B), [0, 20]), "c", DIM, 13),
      cap(430, 300, "A triangle with sides a, b, c opposite the angles α, β, γ; the condition a² + b² = 1989c² makes c tiny next to a and b, so the real γ is a very small angle, and the figure shows only the labels.")
    ]);
  })();

  PROB["2003-aime-i-12"] = (() => {
    const cA = 7 / 9, sA = Math.sqrt(1 - cA * cA), k = 1.15, Q = (x, y) => [70 + k * x, 250 - k * y];
    const Am = [0, 0], Bm = [180, 0], Dm = [170 * cA, 170 * sA];       // AD = 170, so BC = 110 by the perimeter
    const dd = Math.hypot(Dm[0] - Bm[0], Dm[1] - Bm[1]), ex = sub(Dm, Bm).map(z => z / dd), x = (110 * 110 - 180 * 180 + dd * dd) / (2 * dd), h = Math.sqrt(110 * 110 - x * x);
    const Cm = add(add(Bm, mul(ex, x)), mul([ex[1], -ex[0]], h));
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), D = Q(...Dm);
    const ang = (V, P, R) => { const u = sub(P, V), v = sub(R, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))); };
    const ok = Math.abs(dist(C, D) / k - 180) < 1e-6 && Math.abs(ang(A, B, D) - ang(C, B, D)) < 1e-9 && Math.abs((dist(A, D) + dist(B, C)) / k - 280) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C, D], DIM, 2), angleArc(A, B, D, 28, ACC), angleArc(C, D, B, 28, ACC),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [12, -4]), "C"), txt(add(D, [-10, -8]), "D"),
      txt(add(mid(A, B), [0, 18]), "180", DIM, 12), txt(add(mid(C, D), [0, -10]), "180", DIM, 12),
      cap(430, 300, "Convex quadrilateral ABCD with AB = CD = 180, equal angles at A and C (blue), AD ≠ BC, and perimeter 640." + MM(ok))
    ]);
  })();

  PROB["2004-aime-ii-11"] = (() => {
    const k = 0.3, V = [215, 40], r = 600 * k, h = 200 * Math.sqrt(7) * k, L = [215 - r, 40 + h], R = [215 + r, 40 + h];
    const P1 = lerp(V, L, 125 / 800), P2 = lerp(V, R, 375 * Math.SQRT2 / 800);
    const ok = Math.abs(dist(V, L) / k - 800) < 1e-6;
    return wrap(430, 300, [
      `<ellipse cx="215" cy="${K.r1(40 + h)}" rx="${K.r1(r)}" ry="30" fill="none" stroke="${DIM}" stroke-width="2"/>`,
      seg(V, L, DIM, 2), seg(V, R, DIM, 2), seg(V, [215, 40 + h], FNT, 1.4, "5 4"), seg([215, 40 + h], R, FNT, 1.4, "5 4"),
      dot(V, DIM, 3), dot(P1, ACC, 4), dot(P2, GLD, 4),
      txt(add(V, [0, -10]), "V"), txt(add(P1, [-10, 0]), "125", ACC, 12, "end"), txt(add(P2, [10, 4]), "375√2", GLD, 12, "start"),
      txt(add(mid([215, 40 + h], R), [0, 16]), "600", DIM, 12), txt(add(mid(V, [215, 40 + h]), [8, 0]), "200√7", DIM, 12, "start"),
      cap(430, 300, "The cone (radius 600, height 200√7). The fly starts 125 from the vertex V (blue) and ends on the exactly opposite side, 375√2 from V (gold)." + MM(ok))
    ]);
  })();

  PROB["2005-aime-i-7"] = (() => {
    const s = 9 + Math.sqrt(141), k = 15, Q = (x, y) => [60 + k * x, 250 - k * y];
    const A = Q(0, 0), B = Q(s, 0), D = Q(10 * Math.cos(rad(60)), 10 * Math.sin(rad(60))), C = Q(s + 8 * Math.cos(rad(120)), 8 * Math.sin(rad(120)));
    const ok = Math.abs(dist(C, D) / k - 12) < 1e-9;
    return wrap(430, 300, [
      poly([A, B, C, D], DIM, 2), angleArc(A, B, D, 30, ACC), angleArc(B, C, A, 30, ACC),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, 14]), "A"), txt(add(B, [10, 14]), "B"), txt(add(C, [10, -6]), "C"), txt(add(D, [-10, -6]), "D"),
      txt(add(A, [40, -8]), "60°", ACC, 12, "start"), txt(add(B, [-40, -8]), "60°", ACC, 12, "end"),
      txt(add(mid(A, D), [-12, 0]), "10", DIM, 12, "end"), txt(add(mid(B, C), [12, 0]), "8", DIM, 12, "start"), txt(add(mid(C, D), [0, -10]), "12", DIM, 12),
      cap(430, 300, "Quadrilateral ABCD with BC = 8, CD = 12, AD = 10 and 60° angles at A and B." + MM(ok))
    ]);
  })();

  PROB["2009-aime-i-15"] = (() => {
    const k = 17, Q = (x, y) => [95 + k * x, 200 - k * y];
    const ax = (100 - 256 + 196) / 28, Bm = [0, 0], Cm = [14, 0], Am = [ax, Math.sqrt(100 - ax * ax)], Dm = [6, 0];   // AB = 10, CA = 16; D at BD = 6
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), D = Q(...Dm);
    const IB = K.incenterOf(A, B, D), IC = K.incenterOf(A, C, D), O1 = K.circumcenterOf(B, IB, D), O2 = K.circumcenterOf(C, IC, D);
    const P = sub(mul(foot(D, O1, O2), 2), D);                        // the second common point: D reflected in the line of centers
    const ang = (V, X, Y) => { const u = sub(X, V), v = sub(Y, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; };
    const ok = Math.abs(ang(P, B, C) - 150) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(A, D, DIM, 1.6),
      circ(O1, dist(O1, B), ACC, 1.3, "none", "5 4"), circ(O2, dist(O2, C), GLD, 1.3, "none", "5 4"),
      seg(B, P, FNT, 1.4), seg(C, P, FNT, 1.4),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)), dot(IB, ACC, 3.5), dot(IC, GLD, 3.5), dot(P, PUR, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [4, 18]), "D"),
      txt(add(IB, [-8, -6]), subT("I", "B"), ACC, 12, "end"), txt(add(IC, [8, -6]), subT("I", "C"), GLD, 12, "start"), txt(add(P, [0, 18]), "P", PUR, 13),
      cap(430, 300, "Triangle ABC (AB = 10, BC = 14, CA = 16) with D inside BC; the circles through B, I<sub>B</sub>, D and through C, I<sub>C</sub>, D (dashed) meet again at P." + MM(ok))
    ]);
  })();

  PROB["2012-aime-ii-13"] = (() => {
    const s = Math.sqrt(111), k = 13.5, A = [250, 115], th = Math.acos(211 / 222) * 180 / Math.PI;
    const at = deg => onC(A, s * k, -deg);                                  // angles measured counterclockwise on screen
    const B = at(-90 - 30), C = at(-90 + 30 - 60 + 60), b0 = -120;
    const Bp = at(b0), Cp = at(b0 + 60), D1 = at(b0 + th), D2 = at(b0 - th);
    const E = [at(b0 + th + 60), at(b0 + th - 60), at(b0 - th + 60), at(b0 - th - 60)];
    const ok = Math.abs(dist(Bp, D1) / k - Math.sqrt(11)) < 1e-9 && Math.abs(E.reduce((t, e) => t + (dist(Cp, e) / k) ** 2, 0) - 677) < 1e-6;
    return wrap(430, 300, [
      poly([A, Bp, Cp], DIM, 2.2),
      poly([A, D1, E[0]], ACC, 1.3, "none"), poly([A, D1, E[1]], ACC, 1.3, "none"), poly([A, D2, E[2]], GLD, 1.3, "none"), poly([A, D2, E[3]], GLD, 1.3, "none"),
      ...[A, Bp, Cp].map(q => dot(q, DIM, 3.5)), dot(D1, ACC, 3.5), dot(D2, GLD, 3.5), ...E.slice(0, 2).map(q => dot(q, ACC, 3)), ...E.slice(2).map(q => dot(q, GLD, 3)),
      txt(add(A, [8, -8]), "A", DIM, 13, "start"), txt(away(Bp, A, 13), "B"), txt(away(Cp, A, 13), "C"),
      txt(away(D1, A, 14), subT("D", "1"), ACC), txt(away(D2, A, 14), subT("D", "2"), GLD),
      ...E.map((e, i) => txt(add(away(e, A, 14), [0, 4]), subT("E", String(i + 1)), i < 2 ? ACC : GLD)),
      cap(430, 300, "Equilateral triangle ABC of side √111 (black) and the four triangles congruent to it at A, with BD₁ = BD₂ = √11." + MM(ok))
    ]);
  })();

  PROB["2012-aime-ii-15"] = (() => {
    const k = 26, Q = (x, y) => [124 + k * x, 168 - k * y];
    const ax = (25 - 9 + 49) / 14, Bm = [0, 0], Cm = [7, 0], Am = [ax, -Math.sqrt(25 - ax * ax)];
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), O = K.circumcenterOf(A, B, C), R = dist(O, A), D = Q(35 / 8, 0);
    const u = norm(sub(D, A)), w = sub(A, O), t = -2 * (u[0] * w[0] + u[1] * w[1]), E = add(A, mul(u, t));
    const G = mid(D, E), g = dist(D, E) / 2, Fx = sub(mul(foot(E, O, G), 2), E);   // F: E reflected in the line of centers OG
    const ok = Math.abs(dist(A, Fx) ** 2 / (k * k) - 900 / 19) < 1e-6 && Math.abs(dist(Fx, O) - R) < 1e-6;
    return wrap(430, 300, [
      circ(O, R, FNT, 1.5), circ(G, g, ACC, 1.4, "none", "5 4"), poly([A, B, C], DIM, 2), seg(A, E, DIM, 1.6), seg(A, Fx, GLD, 2),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3)), dot(Fx, GLD, 3.5),
      txt(add(A, [0, 18]), "A"), txt(add(B, [-12, 0]), "B", DIM, 13, "end"), txt(add(C, [12, 0]), "C", DIM, 13, "start"), txt(add(D, [10, 14]), "D", DIM, 13, "start"),
      txt(add(E, [-8, 22]), "E", DIM, 13, "end"), txt(away(Fx, O, 14), "F", GLD), txt(add(G, [g + 6, 0]), "γ", ACC, 13, "start"),
      cap(430, 300, "Triangle ABC (AB = 5, BC = 7, AC = 3) in its circle ω; the bisector from A meets BC at D and ω at E, and the circle γ on diameter DE (dashed) meets ω again at F." + MM(ok))
    ]);
  })();

  PROB["2018-aime-ii-12"] = (() => {
    const k = 13, Q = (x, y) => [55 + k * x, 210 - k * y];
    const Bm = [0, 0], Cm = [14, 0], Am = [6, 8];                          // the case where P is the midpoint of BD
    const dd = dist(Am, Cm), ex = sub(Am, Cm).map(z => z / dd), x = (100 - 260 + dd * dd) / (2 * dd), h = Math.sqrt(100 - x * x);
    const Dm = add(add(Cm, mul(ex, x)), mul([-ex[1], ex[0]], -h));
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), D = Q(...Dm), P = lineInt(A, C, B, D);
    const ar = (U, V, W) => Math.abs((V[0] - U[0]) * (W[1] - U[1]) - (W[0] - U[0]) * (V[1] - U[1])) / 2;
    const ok = Math.abs(dist(A, D) / k - 2 * Math.sqrt(65)) < 1e-9 && Math.abs(ar(A, P, B) + ar(C, P, D) - ar(B, P, C) - ar(A, P, D)) < 1e-6;
    return wrap(430, 300, [
      poly([A, P, B], "none", 0, ACCS), poly([C, P, D], "none", 0, ACCS), poly([B, P, C], "none", 0, GLDS), poly([A, P, D], "none", 0, GLDS),
      poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.5), seg(B, D, FNT, 1.5),
      ...[A, B, C, D, P].map(q => dot(q, DIM, 3)),
      txt(add(A, [-10, -6]), "A", DIM, 13, "end"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [8, -8]), "D", DIM, 13, "start"), txt(add(P, [0, 20]), "P"),
      txt(add(mid(A, B), [-14, 4]), "10", DIM, 12, "end"), txt(add(mid(B, C), [0, 18]), "14", DIM, 12), txt(add(mid(C, D), [14, 4]), "10", DIM, 12, "start"), txt(add(mid(A, D), [0, -10]), "2√65", DIM, 12),
      cap(430, 300, "Convex quadrilateral ABCD with AB = CD = 10, BC = 14, AD = 2√65; the blue triangles APB and CPD together have the same area as the gold BPC and APD." + MM(ok))
    ]);
  })();

  // Fit points given in math coordinates (y up) into the 430 x 300 frame, leaving `m` pixels of margin;
  // returns the map Q and its scale k, so lengths can be checked in the problem's own units.
  const fitQ = (pts, m = 40, W = 430, H = 270) => {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const k = Math.min((W - 2 * m) / (x1 - x0), (H - 2 * m) / (y1 - y0));
    const ox = (W - k * (x1 - x0)) / 2, oy = (H - k * (y1 - y0)) / 2;
    const Q = p => [ox + k * (p[0] - x0), oy + k * (y1 - p[1])];
    Q.k = k; return Q;
  };
  const circ3 = (P1, P2, P3) => { const O = K.circumcenterOf(P1, P2, P3); return [O, dist(O, P1)]; };
  const angAt = (V, P, R) => { const u = sub(P, V), v = sub(R, V); return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))); };

  PROB["2019-aime-i-13"] = (() => {
    const cx = 27 / 8, Am = [0, 0], Bm = [4, 0], Cm = [cx, Math.sqrt(36 - cx * cx)];
    const Dm = [4 + 5 * (1 + Math.SQRT2) / 4, 0], Em = [4 + (5 + 21 * Math.SQRT2) / 4, 0];
    const [O1m, r1m] = circ3(Am, Cm, Dm), [O2m, r2m] = circ3(Em, Bm, Cm), Fm = sub(mul(foot(Cm, O1m, O2m), 2), Cm);
    const Q = fitQ([Am, Em, Cm, Fm, [O1m[0], O1m[1] - r1m], [O2m[0], O2m[1] - r2m], [O2m[0], O2m[1] + r2m]], 22), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), D = Q(Dm), E = Q(Em), F = Q(Fm), O1 = Q(O1m), O2 = Q(O2m);
    const ok = Math.abs(dist(D, F) / k - 2) < 1e-9 && Math.abs(dist(E, F) / k - 7) < 1e-9;
    return wrap(430, 300, [
      circ(O1, r1m * k, ACC, 1.3, "none", "5 4"), circ(O2, r2m * k, GLD, 1.3, "none", "5 4"),
      seg(A, C, DIM, 2), seg(B, C, DIM, 2), seg(A, E, DIM, 2), seg(C, D, FNT, 1.3), seg(C, E, FNT, 1.3), seg(D, F, DIM, 1.6), seg(E, F, DIM, 1.6),
      ...[A, B, C, D, E].map(q => dot(q, DIM, 3)), dot(F, PUR, 3.5),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [0, -8]), "B"), txt(add(C, [0, -10]), "C"), txt(add(D, [0, -8]), "D"), txt(add(E, [10, 4]), "E", DIM, 13, "start"), txt(add(F, [0, 18]), "F", PUR),
      cap(430, 300, "Triangle ABC (AB = 4, BC = 5, CA = 6), with D and E on ray AB beyond B; the circles through A, C, D (blue) and E, B, C (gold) meet again at F, with DF = 2 and EF = 7." + MM(ok))
    ]);
  })();

  PROB["2019-aime-ii-11"] = (() => {
    const ax = (49 - 81 + 64) / 16, Bm = [0, 0], Cm = [8, 0], Am = [ax, Math.sqrt(49 - ax * ax)];
    // the center of a circle tangent to a line at A lies on the perpendicular there, equally far from A and the other point
    const ctr = (P, dir) => { const n = [-dir[1], dir[0]], t = ((P[0] - Am[0]) ** 2 + (P[1] - Am[1]) ** 2) / (2 * ((P[0] - Am[0]) * n[0] + (P[1] - Am[1]) * n[1])); return add(Am, mul(n, t)); };
    const O1m = ctr(Bm, norm(sub(Cm, Am))), O2m = ctr(Cm, norm(sub(Bm, Am))), Km = sub(mul(foot(Am, O1m, O2m), 2), Am);
    const r1m = dist(O1m, Am), r2m = dist(O2m, Am);
    const Q = fitQ([Bm, Cm, Am, [O1m[0] - r1m, O1m[1]], [O1m[0], O1m[1] + r1m], [O2m[0] + r2m, O2m[1]], [O2m[0], O2m[1] + r2m], [O1m[0], O1m[1] - r1m], [O2m[0], O2m[1] - r2m]], 18), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), Kp = Q(Km);
    const ok = Math.abs(dist(A, Kp) / k - 4.5) < 1e-9;
    return wrap(430, 300, [
      circ(Q(O1m), r1m * k, ACC, 1.3, "none", "5 4"), circ(Q(O2m), r2m * k, GLD, 1.3, "none", "5 4"),
      poly([A, B, C], DIM, 2), seg(A, Kp, PUR, 1.8),
      ...[A, B, C].map(q => dot(q, DIM, 3)), dot(Kp, PUR, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(Kp, [0, 18]), "K", PUR),
      txt(add(Q(O1m), [-r1m * k * 0.72, -r1m * k * 0.72]), subT("ω", "1"), ACC, 13), txt(add(Q(O2m), [r2m * k * 0.72, -r2m * k * 0.72]), subT("ω", "2"), GLD, 13),
      cap(430, 300, "Triangle ABC (AB = 7, BC = 8, CA = 9). ω₁ (blue) passes through B and touches AC at A; ω₂ (gold) passes through C and touches AB at A; they meet again at K." + MM(ok))
    ]);
  })();

  PROB["2019-aime-ii-15"] = (() => {
    const kc = 5 / Math.sqrt(56), sA = Math.sqrt(1 - kc * kc), b = Math.sqrt(1000) / kc, c = Math.sqrt(875) / kc;
    const Am = [0, 0], Bm = [c, 0], Cm = [b * kc, b * sA], Pm = [b * kc, 0], Qm = mul(Cm, c * kc / b);
    const [Om, R] = circ3(Am, Bm, Cm);
    const u = norm(sub(Qm, Pm)), w = sub(Pm, Om), pb = u[0] * w[0] + u[1] * w[1], disc = Math.sqrt(pb * pb - (w[0] * w[0] + w[1] * w[1] - R * R));
    const Xm = add(Pm, mul(u, -pb - disc)), Ym = add(Pm, mul(u, -pb + disc));
    const Q = fitQ([[Om[0] - R, Om[1]], [Om[0] + R, Om[1]], [Om[0], Om[1] - R], [Om[0], Om[1] + R]], 12), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), P = Q(Pm), Qq = Q(Qm), X = Q(Xm), Y = Q(Ym);
    const ok = Math.abs(dist(X, P) / k - 10) < 1e-6 && Math.abs(dist(P, Qq) / k - 25) < 1e-6 && Math.abs(dist(Qq, Y) / k - 15) < 1e-6;
    return wrap(430, 300, [
      circ(Q(Om), R * k, FNT, 1.5), poly([A, B, C], DIM, 2), seg(C, P, FNT, 1.3), seg(B, Qq, FNT, 1.3), seg(X, Y, ACC, 1.8),
      rightAngle(P, B, C, 7), rightAngle(Qq, C, B, 7),
      ...[A, B, C].map(q => dot(q, DIM, 3)), ...[P, Qq, X, Y].map(q => dot(q, ACC, 3)),
      txt(add(A, [-10, 6]), "A", DIM, 13, "end"), txt(add(B, [10, 6]), "B", DIM, 13, "start"), txt(add(C, [0, -10]), "C"),
      txt(add(P, [0, 18]), "P", ACC), txt(add(Qq, [-10, -4]), "Q", ACC, 13, "end"), txt(add(X, [-10, 8]), "X", ACC, 13, "end"), txt(add(Y, [10, -4]), "Y", ACC, 13, "start"),
      cap(430, 300, "Acute triangle ABC with P and Q the feet of the altitudes from C and B; line PQ meets the circumcircle at X and Y, with XP = 10, PQ = 25, QY = 15." + MM(ok))
    ]);
  })();

  PROB["2020-aime-i-13"] = (() => {
    const ax = (16 - 36 + 25) / 10, Bm = [0, 0], Cm = [5, 0], Am = [ax, Math.sqrt(16 - ax * ax)], Dm = [20 / 10, 0];   // BD = 5·4/10 = 2
    const Mm = mid(Am, Dm), dir = perp(sub(Dm, Am));
    const bis = (V, P, R) => add(V, add(norm(sub(P, V)), norm(sub(R, V))));
    const Em = lineInt(Mm, add(Mm, dir), Bm, bis(Bm, Am, Cm)), Fm = lineInt(Mm, add(Mm, dir), Cm, bis(Cm, Am, Bm));
    const Q = fitQ([Am, Bm, Cm, Em, Fm], 30), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), D = Q(Dm), E = Q(Em), F = Q(Fm), M = Q(Mm);
    const ar = Math.abs((Em[0] - Am[0]) * (Fm[1] - Am[1]) - (Fm[0] - Am[0]) * (Em[1] - Am[1])) / 2;
    const ok = Math.abs(ar - 15 * Math.sqrt(7) / 14) < 1e-9;
    return wrap(430, 300, [
      poly([A, E, F], "none", 0, GLDS), poly([A, B, C], DIM, 2), seg(A, D, DIM, 1.6), seg(E, F, ACC, 1.6), seg(B, E, FNT, 1.3), seg(C, F, FNT, 1.3),
      rightAngle(M, A, E, 7), poly([A, E, F], GLD, 1.6),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)), dot(E, ACC, 3.5), dot(F, ACC, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [0, 18]), "D"),
      txt(away(E, M, 14), "E", ACC), txt(away(F, M, 14), "F", ACC),
      cap(430, 300, "Triangle ABC (AB = 4, BC = 5, CA = 6) with the bisector AD; the perpendicular bisector of AD (blue) meets the bisectors from B and C at E and F, and triangle AEF is shaded." + MM(ok))
    ]);
  })();

  PROB["2020-aime-ii-15"] = (() => {
    const cA = 11 / 16, A0 = Math.acos(cA), dBC = Math.acos(85 / 88), Bang = (Math.PI - A0 + dBC) / 2, Cang = (Math.PI - A0 - dBC) / 2;
    const Bm = [0, 0], Cm = [22, 0], Am = lineInt(Bm, [Math.cos(Bang), Math.sin(Bang)], Cm, [22 - Math.cos(Cang), Math.sin(Cang)]);
    const Tm = [11, -Math.sqrt(256 - 121)], Xm = foot(Tm, Am, Bm), Ym = foot(Tm, Am, Cm);
    const Q = fitQ([Am, Bm, Cm, Tm, Xm, Ym], 26), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), T = Q(Tm), X = Q(Xm), Y = Q(Ym);
    const s2 = (P, R) => (dist(P, R) / k) ** 2, ok = Math.abs(s2(T, X) + s2(T, Y) + s2(X, Y) - 1143) < 1e-6 && Math.abs(s2(X, Y) - 717) < 1e-6;
    const [Om, R] = circ3(Am, Bm, Cm);
    return wrap(430, 300, [
      circ(Q(Om), R * k, FNT, 1.4), poly([A, B, C], DIM, 2), seg(T, B, ACC, 1.6), seg(T, C, ACC, 1.6),
      seg(X, B, FNT, 1.3, "4 3"), seg(Y, C, FNT, 1.3, "4 3"), seg(T, X, GLD, 1.6), seg(T, Y, GLD, 1.6), seg(X, Y, GLD, 1.6),
      rightAngle(X, T, A, 7), rightAngle(Y, T, A, 7),
      ...[A, B, C, T].map(q => dot(q, DIM, 3)), dot(X, GLD, 3), dot(Y, GLD, 3),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-12, 0]), "B", DIM, 13, "end"), txt(add(C, [12, 0]), "C", DIM, 13, "start"), txt(add(T, [0, 18]), "T"),
      txt(away(X, T, 12), "X", GLD), txt(away(Y, T, 12), "Y", GLD),
      cap(430, 300, "The tangents to the circumcircle at B and C meet at T (BT = CT = 16, BC = 22); X and Y are the feet of the perpendiculars from T to lines AB and AC." + MM(ok))
    ]);
  })();

  PROB["2021-aime-i-11"] = (() => {
    // cyclic quadrilateral with sides 4, 5, 6, 7: the diagonal AC from the cosine of angle B, using B + D = 180°
    const cB = (16 + 25 - 36 - 49) / (2 * (20 + 42)), ac = Math.sqrt(16 + 25 - 40 * cB);
    const Am = [0, 0], Cm = [ac, 0], ax = (16 - 25 + ac * ac) / (2 * ac), Bm = [ax, -Math.sqrt(16 - ax * ax)], dx = (49 - 36 + ac * ac) / (2 * ac), Dm = [dx, Math.sqrt(49 - dx * dx)];
    const A1m = foot(Am, Bm, Dm), C1m = foot(Cm, Bm, Dm), B1m = foot(Bm, Am, Cm), D1m = foot(Dm, Am, Cm);
    const [Om, R] = circ3(Am, Bm, Cm);
    const Q = fitQ([[Om[0] - R, Om[1]], [Om[0] + R, Om[1]], [Om[0], Om[1] - R], [Om[0], Om[1] + R]], 14), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), D = Q(Dm), A1 = Q(A1m), B1 = Q(B1m), C1 = Q(C1m), D1 = Q(D1m);
    const per = (dist(A1, B1) + dist(B1, C1) + dist(C1, D1) + dist(D1, A1)) / k;
    const ok = Math.abs(dist(C, D) / k - 6) < 1e-9 && Math.abs(per - 242 / 59) < 1e-9;
    return wrap(430, 300, [
      circ(Q(Om), R * k, FNT, 1.4), poly([A, B, C, D], DIM, 2), seg(A, C, FNT, 1.3), seg(B, D, FNT, 1.3),
      seg(A, A1, FNT, 1.1, "3 3"), seg(C, C1, FNT, 1.1, "3 3"), seg(B, B1, FNT, 1.1, "3 3"), seg(D, D1, FNT, 1.1, "3 3"),
      poly([A1, B1, C1, D1], ACC, 1.8, ACCS),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)), ...[A1, B1, C1, D1].map(q => dot(q, ACC, 2.6)),
      txt(add(A, [-10, 4]), "A", DIM, 13, "end"), txt(add(B, [0, 18]), "B"), txt(add(C, [10, 4]), "C", DIM, 13, "start"), txt(add(D, [10, 4]), "D", DIM, 13, "start"),
      cap(430, 300, "Cyclic quadrilateral ABCD (AB = 4, BC = 5, CD = 6, DA = 7). The feet A₁, C₁ on BD and B₁, D₁ on AC (dotted perpendiculars) form the small blue quadrilateral A₁B₁C₁D₁." + MM(ok))
    ]);
  })();

  PROB["2021-aime-ii-5"] = (() => {
    // the two triangles with sides 4 and 10 and the same area: the angle between them θ or 180° − θ
    const th = rad(55), k = 24, Q = (x, y) => [165 + k * x, 230 - k * y];
    const Bm = [0, 0], Cm = [10, 0], A1m = [4 * Math.cos(th), 4 * Math.sin(th)], A2m = [-4 * Math.cos(th), 4 * Math.sin(th)];
    const B = Q(...Bm), C = Q(...Cm), A1 = Q(...A1m), A2 = Q(...A2m);
    const ok = Math.abs(A1m[1] - A2m[1]) < 1e-12 && Math.abs(Math.hypot(...A2m) - 4) < 1e-12;
    return wrap(430, 300, [
      poly([B, C, A1], ACC, 2, ACCS), poly([B, C, A2], GLD, 2), seg(A2, A1, FNT, 1.3, "4 4"),
      angleArc(B, C, A1, 26, ACC), angleArc(B, C, A2, 40, GLD),
      ...[B, C, A1, A2].map(q => dot(q, DIM, 3)),
      txt(add(mid(B, C), [0, 18]), "10", DIM, 12), txt(add(mid(B, A1), [12, 6]), "4", ACC, 12, "start"), txt(add(mid(B, A2), [-12, 10]), "4", GLD, 12, "end"),
      txt(add(B, [30, -6]), "θ", ACC, 13, "start"), txt(add(B, [-2, -54]), "180° − θ", GLD, 12),
      cap(430, 300, "Two sides 4 and 10 with the angle θ (blue) or 180° − θ (gold) between them: the same height over the side 10, so the same area." + MM(ok))
    ]);
  })();

  PROB["2023-aime-i-12"] = (() => {
    const k = 5.1, Q = (x, y) => [75 + k * x, 270 - k * y], h = 55 * Math.sqrt(3) / 2;
    const Am = [27.5, h], Bm = [0, 0], Cm = [55, 0], Dm = lerp(Bm, Cm, 7 / 55), Em = lerp(Cm, Am, 30 / 55), Fm = lerp(Am, Bm, 40 / 55);
    // P: the point with cot θ = 1/(5√3) from each foot; from D it lies at height d along BC's normal with DX = d cot θ
    const ct = 1 / (5 * Math.sqrt(3)), Pm = [8 + 8 / 19, 0]; Pm[1] = (Pm[0] - 7) / ct;
    const A = Q(...Am), B = Q(...Bm), C = Q(...Cm), D = Q(...Dm), E = Q(...Em), F = Q(...Fm), P = Q(...Pm);
    const ok = Math.abs(Math.tan(angAt(E, A, P)) ** 2 - 75) < 1e-6 && Math.abs(Math.tan(angAt(F, B, P)) ** 2 - 75) < 1e-6 && Math.abs(Math.tan(angAt(D, C, P)) ** 2 - 75) < 1e-6;
    return wrap(430, 300, [
      poly([A, B, C], DIM, 2), seg(P, D, ACC, 1.6), seg(P, E, ACC, 1.6), seg(P, F, ACC, 1.6),
      angleArc(D, C, P, 18, GLD), angleArc(E, A, P, 18, GLD), angleArc(F, B, P, 18, GLD),
      ...[A, B, C, D, E, F].map(q => dot(q, DIM, 3)), dot(P, ACC, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-10, 14]), "B"), txt(add(C, [10, 14]), "C"), txt(add(D, [0, 18]), "D"),
      txt(add(E, [12, 0]), "E", DIM, 13, "start"), txt(add(F, [-12, 0]), "F", DIM, 13, "end"), txt(add(P, [-4, -10]), "P", ACC),
      cap(430, 300, "Equilateral triangle ABC of side 55 with BD = 7, CE = 30, AF = 40; the point P makes the three gold angles AEP, BFP, CDP equal." + MM(ok))
    ]);
  })();

  PROB["2024-aime-i-10"] = (() => {
    const ax = (25 - 100 + 81) / 18, Bm = [0, 0], Cm = [9, 0], Am = [ax, Math.sqrt(25 - ax * ax)];
    const [Om, R] = circ3(Am, Bm, Cm), Dm = [4.5, -Math.sqrt((225 / 22) ** 2 - 4.5 ** 2)];
    const u = norm(sub(Dm, Am)), Pm = add(Am, mul(u, 100 / 13));
    const Q = fitQ([[Om[0] - R, Om[1]], [Om[0] + R, Om[1]], [Om[0], Om[1] + R], Dm], 16), k = Q.k;
    const A = Q(Am), B = Q(Bm), C = Q(Cm), D = Q(Dm), P = Q(Pm);
    const ok = Math.abs(dist(Q(Om), P) / k - R) < 1e-9 && Math.abs(dist(Q(Om), B) / k - R) < 1e-9;
    return wrap(430, 300, [
      circ(Q(Om), R * k, FNT, 1.4), poly([A, B, C], DIM, 2), seg(B, D, ACC, 1.6), seg(C, D, ACC, 1.6), seg(A, D, GLD, 1.6),
      ...[A, B, C, D].map(q => dot(q, DIM, 3)), dot(P, GLD, 3.5),
      txt(add(A, [0, -10]), "A"), txt(add(B, [-12, 0]), "B", DIM, 13, "end"), txt(add(C, [12, 0]), "C", DIM, 13, "start"), txt(add(D, [0, 18]), "D"), txt(add(P, [12, 4]), "P", GLD, 13, "start"),
      cap(430, 300, "Triangle ABC (AB = 5, BC = 9, CA = 10) in its circle; the tangents at B and C meet at D, and AD meets the circle again at P." + MM(ok))
    ]);
  })();

})();
