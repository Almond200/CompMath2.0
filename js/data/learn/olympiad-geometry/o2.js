// Learn, Olympiad Geometry, chapter O2: triangle theorems (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O2"] = {
  lessons: {
    "O2.1": {
      prereq: ["law-of-sines", "law-of-cosines", "herons-formula", "trig-area"],
      cards: [],
      body: String.raw`The triangle has more exact relations than the laws of sines and cosines. This chapter collects the classical ones olympiads use: the law of tangents and Mollweide's formulas, which relate side differences to angle differences; Weitzenböck's and the Erdős-Mordell inequalities; the perpendicularity lemma and Carnot's theorem, which turn right angles into equations of squared lengths; and two famous theorems, Steiner-Lehmus and Morley.

In the triangle with sides $a = 7$, $b = 5$, $c = 6$, the ratio $\tfrac{a - b}{a + b} = \tfrac16$ equals $\tfrac{\tan\frac{A - B}{2}}{\tan\frac{A + B}{2}}$, by the law of tangents. The $3$-$4$-$5$ triangle has $a^2 + b^2 + c^2 = 50$ and area $6$, and $50 \ge 4\sqrt3 \cdot 6 \approx 41.6$, as Weitzenböck's inequality requires. And two segments $AB$ and $CD$ are perpendicular exactly when $AC^2 - AD^2 = BC^2 - BD^2$.

The lessons are classical triangle formulas (O2.2), and perpendicularity and equal bisectors (O2.3). The Summary (O2.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Check Weitzenböck's inequality $a^2 + b^2 + c^2 \ge 4\sqrt3 K$ for the $3$-$4$-$5$ triangle.`,
          solution: String.raw`$a^2 + b^2 + c^2 = 9 + 16 + 25 = 50$, and $K = 6$, so $4\sqrt3 K = 24\sqrt3 \approx 41.57$. Indeed $50 \gt 41.57$.` },
        { q: String.raw`For an equilateral triangle of side $2$ and its center $P$, check the Erdős-Mordell inequality $PA + PB + PC \ge 2(d_a + d_b + d_c)$, where $d_a$, $d_b$, $d_c$ are the distances from $P$ to the sides.`,
          solution: String.raw`The circumradius is $\tfrac{2}{\sqrt3}$ and the inradius $\tfrac{1}{\sqrt3}$, so $PA + PB + PC = \tfrac{6}{\sqrt3}$ and $2(d_a + d_b + d_c) = 2 \cdot \tfrac{3}{\sqrt3} = \tfrac{6}{\sqrt3}$. Equality holds, as it does exactly for the center of an equilateral triangle.` }
      ],
      problems: []
    },
    "O2.2": {
      prereq: ["law-of-sines", "herons-formula", "product-sum"],
      cards: ["law-of-tangents", "mollweides-formula", "weitzenbock-inequality", "erdos-mordell"],
      body: String.raw`How are $\tfrac{a - b}{a + b}$ and the angles related? Why is $a^2 + b^2 + c^2 \ge 4\sqrt3 K$ for every triangle, with equality only for the equilateral one? Why are the distances from a point to the corners at least twice its distances to the sides? Two formulas and two inequalities.

[[law-of-tangents|The law of tangents]] says $\tfrac{a - b}{a + b} = \tfrac{\tan\frac{A - B}{2}}{\tan\frac{A + B}{2}}$. It follows from the law of sines, $\tfrac{a - b}{a + b} = \tfrac{\sin A - \sin B}{\sin A + \sin B}$, and the sum-to-product formulas. [[mollweides-formula|Mollweide's formulas]], $\tfrac{a + b}{c} = \tfrac{\cos\frac{A - B}{2}}{\sin\frac C2}$ and $\tfrac{a - b}{c} = \tfrac{\sin\frac{A - B}{2}}{\cos\frac C2}$, come the same way and involve all six parts, so they check a solved triangle. These formulas matter when a problem gives a difference of sides or of angles.

[[weitzenbock-inequality|Weitzenböck's inequality]] $a^2 + b^2 + c^2 \ge 4\sqrt3 K$ follows from Heron's formula in the form $16K^2 = 2(a^2b^2 + b^2c^2 + c^2a^2) - (a^4 + b^4 + c^4)$: the inequality squared is $(a^2 + b^2 + c^2)^2 \ge 48K^2$, which rearranges to $4(a^4 + b^4 + c^4) \ge 4(a^2b^2 + b^2c^2 + c^2a^2)$, true by $x^2 + y^2 + z^2 \ge xy + yz + zx$. The Hadwiger-Finsler inequality strengthens it by adding $(a - b)^2 + (b - c)^2 + (c - a)^2$ on the right.

[[erdos-mordell|The Erdős-Mordell inequality]] says that for a point $P$ inside a triangle, $PA + PB + PC \ge 2(d_a + d_b + d_c)$, with equality only at the center of an equilateral triangle. Its proof reflects $P$ and projects: from the area of the quadrilateral formed by $A$, $P$ and the feet of the perpendiculars, $a \cdot PA \ge b\,d_c + c\,d_b$ (after a reflection in the bisector of angle $A$), and adding the three such inequalities with AM-GM, $\tfrac bc + \tfrac cb \ge 2$, gives the result.

Convert side ratios to angles with the law of sines and sum-to-product, prove a symmetric triangle inequality through Heron's formula, and compare distances by projections. The next lesson turns to perpendicular lines.`,
      related: [
        { card: "product-sum", note: String.raw`the sum-to-product formulas behind the law of tangents.` },
        { card: "isoperimetric-facts", note: String.raw`the equilateral triangle as the extreme case (S10.6).` },
        { card: "law-of-sines", note: String.raw`the source of both formulas (S9.2).` }
      ],
      exercises: [
        { q: String.raw`Prove the law of tangents: $\tfrac{a - b}{a + b} = \tfrac{\tan\frac{A - B}{2}}{\tan\frac{A + B}{2}}$.`,
          solution: String.raw`By the law of sines, $a = 2R\sin A$ and $b = 2R\sin B$, so $\tfrac{a - b}{a + b} = \tfrac{\sin A - \sin B}{\sin A + \sin B} = \tfrac{2\cos\frac{A + B}{2}\sin\frac{A - B}{2}}{2\sin\frac{A + B}{2}\cos\frac{A - B}{2}} = \tfrac{\tan\frac{A - B}{2}}{\tan\frac{A + B}{2}}$.` },
        { q: String.raw`Prove Weitzenböck's inequality $a^2 + b^2 + c^2 \ge 4\sqrt3 K$.`,
          solution: String.raw`Heron's formula gives $16K^2 = 2(a^2b^2 + b^2c^2 + c^2a^2) - (a^4 + b^4 + c^4)$. The claim is equivalent to $(a^2 + b^2 + c^2)^2 \ge 48K^2 = 6(a^2b^2 + b^2c^2 + c^2a^2) - 3(a^4 + b^4 + c^4)$, that is, $4(a^4 + b^4 + c^4) \ge 4(a^2b^2 + b^2c^2 + c^2a^2)$, which is $x^2 + y^2 + z^2 \ge xy + yz + zx$ for $x = a^2$, $y = b^2$, $z = c^2$. Equality needs $a = b = c$.` },
        { q: String.raw`For the triangle with sides $a = 7$, $b = 5$, $c = 6$, check the law of tangents numerically.`,
          solution: String.raw`$\tfrac{a - b}{a + b} = \tfrac{2}{12} = \tfrac16$. From the law of cosines, $\cos A = \tfrac{25 + 36 - 49}{60} = \tfrac15$ and $\cos B = \tfrac{49 + 36 - 25}{84} = \tfrac57$, so $A \approx 78.46^\circ$ and $B \approx 44.42^\circ$. Then $\tfrac{\tan 17.02^\circ}{\tan 61.44^\circ} \approx \tfrac{0.3062}{1.8371} \approx 0.1667$, which is $\tfrac16$.` }
      ],
      problems: []
    },
    "O2.3": {
      prereq: ["vector-dot-product", "angle-bisector-length", "law-of-sines"],
      cards: ["perpendicularity-lemma", "carnots-perpendicularity-theorem", "steiner-lehmus", "morleys-theorem"],
      body: String.raw`How can a right angle be tested with lengths alone? Why do the three altitudes of a triangle meet? If two angle bisectors of a triangle are equal, must the triangle be isosceles? What do the angle trisectors of any triangle make? Four theorems about special lines.

[[perpendicularity-lemma|The perpendicularity lemma]] says $AB \perp CD$ exactly when $AC^2 - AD^2 = BC^2 - BD^2$. In vectors, $AC^2 - AD^2 = (C - A)^2 - (D - A)^2 = (C - D) \cdot (C + D - 2A)$, and subtracting the same expression with $B$ for $A$ leaves $2(C - D) \cdot (B - A)$, which is $0$ exactly when the lines are perpendicular. It turns a right angle into an equation in squared lengths, which suits figures where lengths are known. A special case: the diagonals of a quadrilateral are perpendicular exactly when the sums of squares of opposite sides are equal.

[[carnots-perpendicularity-theorem|Carnot's theorem]] says that the perpendiculars to the sides $BC$, $CA$, $AB$ at points $D$, $E$, $F$ meet at one point exactly when $BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2 = 0$. For the feet of the altitudes, $BD^2 - DC^2 = c^2 - b^2$ (both equal the difference of the squares of the altitude's hypotenuses), and the three such terms add to $0$, so the altitudes concur. For the midpoints all terms vanish, so the perpendicular bisectors concur.

[[steiner-lehmus|The Steiner-Lehmus theorem]] says that a triangle with two equal angle bisectors is isosceles; more strongly, the bisector to the longer side is the shorter: $b \gt c$ implies $t_b \lt t_c$. It is surprisingly hard to prove directly, and the standard proofs are by contradiction, comparing two triangles with a common side. [[morleys-theorem|Morley's theorem]] says that the adjacent angle trisectors of any triangle meet at the corners of an equilateral triangle, of side $8R\sin\tfrac A3\sin\tfrac B3\sin\tfrac C3$; it is a result to recognize, proved by building the equilateral triangle first and working outward (a phantom-point argument).

Test perpendicularity with differences of squares, test concurrence of perpendiculars with Carnot's sum, and compare bisectors through their length formula. The Summary follows.`,
      related: [
        { card: "vector-dot-product", note: String.raw`the dot product behind the perpendicularity lemma (S10.4).` },
        { card: "angle-bisector-length", note: String.raw`the length formula used for Steiner-Lehmus (S9.3).` },
        { card: "phantom-point", note: String.raw`the method behind Morley's theorem (O1.2).` }
      ],
      exercises: [
        { q: String.raw`Prove that $AB \perp CD$ if and only if $AC^2 - AD^2 = BC^2 - BD^2$.`,
          solution: String.raw`With vectors, $AC^2 - AD^2 = |C - A|^2 - |D - A|^2 = |C|^2 - |D|^2 - 2A \cdot (C - D)$, and similarly $BC^2 - BD^2 = |C|^2 - |D|^2 - 2B \cdot (C - D)$. Their difference is $2(B - A) \cdot (C - D)$, which is $0$ exactly when $AB \perp CD$.` },
        { q: String.raw`Prove that the diagonals of a quadrilateral $ABCD$ are perpendicular if and only if $AB^2 + CD^2 = BC^2 + DA^2$.`,
          solution: String.raw`By the perpendicularity lemma with the segments $AC$ and $BD$: $AC \perp BD$ iff $AB^2 - AD^2 = CB^2 - CD^2$, which rearranges to $AB^2 + CD^2 = BC^2 + DA^2$.` },
        { q: String.raw`Use Carnot's theorem to prove that the three altitudes of a triangle meet at one point.`,
          solution: String.raw`Let $D$, $E$, $F$ be the feet of the altitudes from $A$, $B$, $C$. In the right triangles $ABD$ and $ACD$, $BD^2 = c^2 - AD^2$ and $DC^2 = b^2 - AD^2$, so $BD^2 - DC^2 = c^2 - b^2$. Likewise $CE^2 - EA^2 = a^2 - c^2$ and $AF^2 - FB^2 = b^2 - a^2$. The sum is $0$, so by Carnot's theorem the perpendiculars to the sides at $D$, $E$, $F$, the altitudes, concur.` }
      ],
      problems: []
    },
    "O2.4": {
      prereq: ["law-of-tangents", "mollweides-formula", "weitzenbock-inequality", "erdos-mordell", "perpendicularity-lemma", "carnots-perpendicularity-theorem", "steiner-lehmus", "morleys-theorem"],
      cards: [],
      body: String.raw`[[law-of-tangents|The law of tangents]] and [[mollweides-formula|Mollweide's formulas]] relate side differences to angle differences; [[weitzenbock-inequality|Weitzenböck's inequality]] bounds the area by the squared sides; [[erdos-mordell|Erdős-Mordell]] compares distances to corners and to sides.

[[perpendicularity-lemma|The perpendicularity lemma]] tests a right angle by squared lengths, [[carnots-perpendicularity-theorem|Carnot's theorem]] tests concurrence of perpendiculars, [[steiner-lehmus|Steiner-Lehmus]] makes equal bisectors force an isosceles triangle, and [[morleys-theorem|Morley's theorem]] makes the trisectors meet in an equilateral triangle.`,
      strategies: [
        String.raw`When a problem gives a difference of sides or angles, use the law of tangents or Mollweide.`,
        String.raw`Prove a symmetric inequality between sides and area through Heron's formula in squared form.`,
        String.raw`Test perpendicularity by a difference of squares rather than by slopes or angles.`,
        String.raw`For three perpendiculars to the sides, check Carnot's alternating sum.`,
        String.raw`Recognize Morley and Steiner-Lehmus; prove them only when the problem asks.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A quadrilateral has sides $AB = 5$, $BC = 6$, $CD = 7$ and perpendicular diagonals. Find $DA$.`, answer: "sqrt(38)",
        solution: String.raw`Perpendicular diagonals mean $AB^2 + CD^2 = BC^2 + DA^2$: $25 + 49 = 36 + DA^2$, so $DA^2 = 38$ and $DA = \sqrt{38}$.` },
      { q: String.raw`Prove that the perpendicular bisectors of the sides of a triangle meet at one point, using Carnot's theorem.`,
        solution: String.raw`At the midpoints, $BD = DC$, $CE = EA$, $AF = FB$, so every term of $BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2$ is $0$, and the perpendiculars concur.` },
      { q: String.raw`For which triangles is $a^2 + b^2 + c^2 = 4\sqrt3 K$?`,
        solution: String.raw`Only equilateral ones: in the proof of Weitzenböck's inequality, equality requires $a^2 = b^2 = c^2$. For an equilateral triangle of side $s$, $3s^2 = 4\sqrt3 \cdot \tfrac{\sqrt3}{4}s^2$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove the Hadwiger-Finsler inequality $a^2 + b^2 + c^2 \ge 4\sqrt3 K + (a - b)^2 + (b - c)^2 + (c - a)^2$.`,
        solution: String.raw`The claim is $2(ab + bc + ca) - (a^2 + b^2 + c^2) \ge 4\sqrt3 K$. With $x = s - a$, $y = s - b$, $z = s - c$ (positive, and $a = y + z$ and so on), the left side is $4(xy + yz + zx)$ and Heron gives $K = \sqrt{(x + y + z)xyz}$. So it suffices that $(xy + yz + zx)^2 \ge 3xyz(x + y + z)$, which is $u^2 + v^2 + w^2 \ge uv + vw + wu$ for $u = xy$, $v = yz$, $w = zx$.` },
      { q: String.raw`Prove that if two angle bisectors of a triangle are equal, the triangle is isosceles (the Steiner-Lehmus theorem), using the formula $t_c^2 = ab\left(1 - \tfrac{c^2}{(a + b)^2}\right)$.`,
        solution: String.raw`With $t_b^2 = ac\left(1 - \tfrac{b^2}{(a + c)^2}\right)$ and $t_c^2 = ab\left(1 - \tfrac{c^2}{(a + b)^2}\right)$, suppose $b \gt c$. Then $ac \lt ab$, and $\tfrac{b}{a + c} \gt \tfrac{c}{a + b}$ (cross-multiply: $b(a + b) \gt c(a + c)$), so $1 - \tfrac{b^2}{(a + c)^2} \lt 1 - \tfrac{c^2}{(a + b)^2}$. Both factors of $t_b^2$ are smaller, so $t_b \lt t_c$. Likewise $b \lt c$ gives $t_b \gt t_c$. So $t_b = t_c$ forces $b = c$.` },
      { q: String.raw`Prove that the altitudes of a triangle concur using the perpendicularity lemma: let $H$ be the intersection of the altitudes from $A$ and $B$, and show $CH \perp AB$.`,
        solution: String.raw`$AH \perp BC$ gives $AB^2 - AC^2 = HB^2 - HC^2$, and $BH \perp CA$ gives $BC^2 - BA^2 = HC^2 - HA^2$. Adding, $BC^2 - AC^2 = HB^2 - HA^2$, that is, $CB^2 - CA^2 = HB^2 - HA^2$, which by the lemma says $CH \perp AB$.` }
    ],
    problems: []
  }
};
