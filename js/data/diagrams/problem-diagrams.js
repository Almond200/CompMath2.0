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

})();
