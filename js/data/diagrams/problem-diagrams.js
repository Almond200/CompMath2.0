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

})();
