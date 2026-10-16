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

})();
