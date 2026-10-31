// Learn, AMC Geometry, chapter S3: geometry, triangles and circles for the AMC 12 (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S3"] = {
  lessons: {
    "S3.1": {
      prereq: ["angle-bisector-theorem", "cevian-area-ratio", "law-of-cosines"],
      cards: ["area-method", "stewarts-theorem", "angle-bisector-length", "apollonius-theorem", "cevas-theorem", "medial-triangle", "median-triangle-area", "vivianis-theorem"],
      body: String.raw`The AMC 12 measures cevians, not just the ratios they make: the length of a median or bisector, when three cevians meet, and the areas of the triangles they form.

[[stewarts-theorem|Stewart's theorem]] $b^2m + c^2n = a(d^2 + mn)$ gives the length $d$ of a cevian that cuts side $a$ into $m$ and $n$. For a median it is [[apollonius-theorem|Apollonius's theorem]], $m_a^2 = \tfrac{2b^2 + 2c^2 - a^2}{4}$: with $b = 7$, $c = 9$, $a = 8$ the median is $\sqrt{49} = 7$. The [[angle-bisector-length|bisector length]] is $\sqrt{bc\left(1 - \tfrac{a^2}{(b + c)^2}\right)}$.

[[cevas-theorem|Ceva's theorem]]: cevians $AD$, $BE$, $CF$ are concurrent exactly when $\tfrac{BD}{DC} \cdot \tfrac{CE}{EA} \cdot \tfrac{AF}{FB} = 1$; with the first two ratios $3$ and $2$, the third must be $\tfrac16$. The [[area-method|area method]] chains ratios of areas through a figure to find lengths.

The [[medial-triangle|medial triangle]] of midpoints has a quarter of the area: $21$ for a triangle of area $84$. The [[median-triangle-area|triangle formed by the medians]] has $\tfrac34$ of the area. [[vivianis-theorem|Viviani's theorem]]: in an equilateral triangle the distances from any interior point to the sides add to the height.

Measure cevians with Stewart, test concurrence with Ceva, and use the standard area fractions. The next lesson treats cyclic quadrilaterals and incircles.`,
      related: [
        { card: "mass-points", note: String.raw`ratios along cevians by weights (S1.2).` },
        { card: "median-doubling", note: String.raw`another route to the median length (S1.3).` },
        { card: "menelaus-theorem", note: String.raw`ratios along a transversal (G5.5).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has $BC = 8$, $CA = 7$, $AB = 9$. Find the length of the median from $A$.`, answer: "7",
          solution: String.raw`$m_a^2 = \tfrac{2 \cdot 49 + 2 \cdot 81 - 64}{4} = \tfrac{196}{4} = 49$, so $m_a = 7$.` },
        { q: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent with $\tfrac{BD}{DC} = 3$ and $\tfrac{CE}{EA} = 2$. Find $\tfrac{AF}{FB}$.`, answer: "1/6",
          solution: String.raw`By Ceva the product of the three ratios is $1$, so $\tfrac{AF}{FB} = \tfrac{1}{6}$.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 17",
        "2021 Spring AMC 12B, Problem 11",
        "2008 AMC 12A, Problem 20",
        "2002 AMC 12B, Problem 23",
        "2007 AIME II, Problem 3",
        "2020 AIME I, Problem 13"
      ]
    },
    "S3.2": {
      prereq: ["cyclic-opposite-angles", "incircle-tangent-lengths", "herons-formula"],
      cards: ["concyclicity-tests", "ptolemys-theorem", "brahmaguptas-formula", "incircle-excircle-touch", "perp-to-angle-bisector", "angle-bisector-circumcircle"],
      body: String.raw`Cyclic quadrilaterals have a length relation and an area formula, and incircles and excircles touch the sides at predictable points. These facts decide a large share of harder AMC 12 circle problems.

[[concyclicity-tests|Four points are concyclic]] when opposite angles of their quadrilateral add to $180^\circ$, when a side subtends equal angles at the other two points, or when crossing segments satisfy the power-of-a-point equality. Finding such a quadrilateral unlocks its equal angles.

[[ptolemys-theorem|Ptolemy's theorem]]: in a cyclic quadrilateral the product of the diagonals equals the sum of the products of opposite sides. [[brahmaguptas-formula|Brahmagupta's formula]] gives its area $\sqrt{(s - a)(s - b)(s - c)(s - d)}$: sides $3$, $4$, $5$, $6$ give $\sqrt{6 \cdot 5 \cdot 4 \cdot 3} = 6\sqrt{10}$.

The [[incircle-excircle-touch|incircle and excircle]] touch side $BC$ at points symmetric about its midpoint, $|b - c|$ apart: $2$ apart in the triangle with $b = 15$, $c = 13$. The [[angle-bisector-circumcircle|bisector from $A$ meets the circumcircle]] at the midpoint of arc $BC$, equidistant from $B$, $C$ and the incenter. A [[perp-to-angle-bisector|perpendicular to an angle bisector]] creates an isosceles triangle, so its foot lies on a midline.

Look for concyclic points, use Ptolemy and Brahmagupta on them, and place touch points by tangent lengths. The next lesson treats circles that touch.`,
      related: [
        { card: "power-of-a-point", note: String.raw`the length test for concyclic points (S1.4).` },
        { card: "inradius-area", note: String.raw`$K = rs$ (S1.5).` },
        { card: "incenter-excenter-lemma", note: String.raw`the arc midpoint in detail (G5.2).` }
      ],
      exercises: [
        { q: String.raw`A cyclic quadrilateral has sides $3$, $4$, $5$, $6$. Find its area.`, answer: "6sqrt(10)",
          solution: String.raw`$s = 9$, and Brahmagupta gives $\sqrt{6 \cdot 5 \cdot 4 \cdot 3} = \sqrt{360} = 6\sqrt{10}$.` },
        { q: String.raw`In triangle $ABC$ with $AB = 13$, $BC = 14$, $CA = 15$, how far apart are the points where the incircle and the excircle opposite $A$ touch $BC$?`, answer: "2",
          solution: String.raw`The incircle touches $BC$ at distance $s - b = 6$ from $B$, the excircle at $s - c = 8$ from $B$; they are $2 = |b - c|$ apart.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 13",
        "2012 AMC 12A, Problem 16",
        "2004 AMC 10B, Problem 24",
        "2024 AMC 12A, Problem 19",
        "2014 AMC 12B, Problem 24",
        "2013 AIME II, Problem 8",
        "2001 AIME I, Problem 13"
      ]
    },
    "S3.3": {
      prereq: ["tangent-circles", "tangent-facts"],
      cards: ["common-tangent-lengths", "tangency-condition"],
      body: String.raw`Two circles have up to four common tangents, and their lengths come from one right triangle. Tangency in coordinates is a condition on a single equation.

A [[common-tangent-lengths|common tangent]] of circles with radii $R$ and $r$ and centers $d$ apart has length $\sqrt{d^2 - (R - r)^2}$ between its points of contact if external, and $\sqrt{d^2 - (R + r)^2}$ if internal. For radii $2$ and $7$ with centers $13$ apart, the external tangent is $12$ and the internal one $\sqrt{88} = 2\sqrt{22}$. The number of common tangents is $4$, $3$, $2$, $1$ or $0$ as the circles are separate, externally tangent, crossing, internally tangent or nested.

The [[tangency-condition|tangency condition]] in coordinates: a line touches a curve when their intersection equation has exactly one solution, a double root, so its discriminant is zero; a line touches a circle when its distance from the center equals the radius.

Draw the radii to the points of contact and find the right triangle, or set a discriminant to zero. The last lesson of the chapter treats trigonometry in triangles.`,
      related: [
        { card: "triangle-of-centers", note: String.raw`joining centers of tangent circles (S1.5).` },
        { card: "tangency-equation", note: String.raw`writing tangency in coordinates (S4.2).` },
        { card: "homothety-monge", note: String.raw`where common tangents meet (G6.5).` }
      ],
      exercises: [
        { q: String.raw`Circles of radii $2$ and $7$ have centers $13$ apart. Find the length of a common internal tangent between its points of contact.`, answer: "2sqrt(22)",
          solution: String.raw`$\sqrt{13^2 - (2 + 7)^2} = \sqrt{169 - 81} = \sqrt{88} = 2\sqrt{22}$.` }
      ],
      problems: [
        "2015 AMC 12A, Problem 11",
        "2002 AMC 12A, Problem 18",
        "2001 AMC 12, Problem 18",
        "2025 AIME I, Problem 8",
        "2024 AIME II, Problem 12"
      ]
    },
    "S3.4": {
      prereq: ["law-of-sines", "law-of-cosines"],
      cards: ["circumradius-area", "projection-formula", "trig-bash", "altitude-bisector-angle"],
      body: String.raw`On the AMC 12, trigonometry is often the fastest route through a triangle: the circumradius comes from the sides and area, projections place feet of altitudes, and a systematic computation from angles finishes figures that resist synthetic ideas.

The [[circumradius-area|circumradius]] satisfies $R = \tfrac{abc}{4K}$ and $a = 2R\sin A$: a side of $10$ opposite $30^\circ$ means $R = 10$. The [[projection-formula|projection formula]] $a = b\cos C + c\cos B$ locates the foot of the altitude from $A$ at distance $c\cos B$ from $B$.

[[trig-bash|Trigonometric bashing]] names one length, finds the others with the law of sines and cosines, and simplifies at the end; it is slow but certain. The [[altitude-bisector-angle|altitude-bisector relation]] says the altitude and the circumradius from a vertex make equal angles with the two sides, so the angle between them is $|B - C|$.

Use $R = \tfrac{abc}{4K}$ for circumradii, projections for feet, and bash when nothing else appears. The next chapter treats coordinates, transformations and space.`,
      related: [
        { card: "herons-formula", note: String.raw`the area in the circumradius formula (S1.6).` },
        { card: "angle-addition", note: String.raw`simplifying the expressions a bash produces (L7.1).` },
        { card: "triangle-center-angles", note: String.raw`angles at the circumcenter (S1.5).` }
      ],
      exercises: [
        { q: String.raw`In a triangle, the side opposite a $30^\circ$ angle is $10$. Find the circumradius.`, answer: "10",
          solution: String.raw`$a = 2R\sin A$ gives $10 = 2R \cdot \tfrac12$, so $R = 10$.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 11",
        "2025 AMC 12A, Problem 16",
        "2011 AMC 12B, Problem 20",
        "2003 AIME II, Problem 7",
        "2000 AIME II, Problem 12"
      ]
    }
  }
};
