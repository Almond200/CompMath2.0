// Learn, AIME Geometry, chapter G1: triangle ratios, similarity and area (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G1"] = {
  lessons: {
    "G1.1": {
      prereq: ["triangle-similarity", "triangle-area-standard", "pythagorean-theorem"],
      cards: [],
      body: String.raw`This chapter measures triangles by ratios. Its tools are similar triangles from parallel lines, ratios of areas, the length formulas for cevians (Stewart's theorem, the angle bisector theorem, the median length), mass points, and the right-triangle constructions that create similar triangles where there were none.

Two triangles are similar when their angles match, and then all their lengths are in one ratio and their areas in its square. A line parallel to a side cuts off a similar triangle: if $DE \parallel BC$ with $AD = 2$ and $DB = 3$, then $\tfrac{DE}{BC} = \tfrac{2}{5}$, so $DE = 4$ when $BC = 10$.

Triangles with the same height have areas in the ratio of their bases, so a cevian divides a triangle's area in the ratio in which it divides the opposite side: if $BD : DC = 2 : 3$, triangle $ABD$ has $\tfrac25$ of the area. Comparing areas this way, often around a shared vertex, gives ratios of lengths in return.

A cevian's length follows from the sides by Stewart's theorem; the angle bisector divides the opposite side in the ratio of the adjacent sides, so with $AB = 6$, $AC = 9$ and $BC = 10$ it cuts $BC$ into $4$ and $6$; and the medians meet at the centroid, two thirds of the way along each. Mass points put weights at the vertices so that every cevian balances, which turns a figure full of ratios into arithmetic.

Last, the altitude to the hypotenuse of a right triangle creates two triangles similar to it, and extending sides to meet or doubling a median creates similar triangles in other figures.

The lessons take these ideas in turn: similar triangles and ratio chasing (G1.2), area ratios (G1.3), Stewart's theorem, bisectors and medians (G1.4), mass points (G1.5), and similarity in nested figures (G1.6). The Summary (G1.7) collects the strategies.`,
      exercises: [
        { q: String.raw`In triangle $ABC$, $D$ is on $AB$ and $E$ on $AC$ with $DE \parallel BC$. If $AD = 2$, $DB = 3$ and $BC = 10$, find $DE$.`, answer: "4",
          solution: String.raw`Triangle $ADE$ is similar to triangle $ABC$, since $DE \parallel BC$, with ratio $\tfrac{AD}{AB} = \tfrac{2}{5}$. So $DE = \tfrac25 \cdot 10 = 4$.` },
        { q: String.raw`Point $D$ lies on side $BC$ of triangle $ABC$ with $BD : DC = 2 : 3$. If the area of $ABC$ is $50$, find the area of $ABD$.`, answer: "20",
          solution: String.raw`Triangles $ABD$ and $ADC$ have the same height from $A$, so their areas are in the ratio of their bases, $2 : 3$. So $ABD$ has $\tfrac25$ of $50$, which is $20$.` },
        { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 9$ and $BC = 10$. The bisector of angle $A$ meets $BC$ at $D$. Find $BD$.`, answer: "4",
          solution: String.raw`By the angle bisector theorem, $\tfrac{BD}{DC} = \tfrac{AB}{AC} = \tfrac{6}{9} = \tfrac23$. So $BD = \tfrac25 \cdot 10 = 4$.` }
      ],
      problems: [
        "2008 AIME I, Problem 2",
        "2000 AIME II, Problem 8",
        "2025 AIME II, Problem 1"
      ]
    },
    "G1.2": {
      prereq: ["triangle-similarity", "similar-figures-ratios"],
      cards: ["parallel-line-similarity", "midsegment-theorem", "intercept-theorem", "nested-similar"],
      body: String.raw`Similar triangles are the most used tool in AIME geometry: a line parallel to one side cuts off a smaller copy of a triangle, two parallel bases of a trapezoid make the diagonals cut each other in their ratio, and a figure repeated inside itself shrinks by the same factor at every step. Nearly every length in such a problem is found by writing one or two ratios. The skill is to see, or to create, the pair of similar triangles that carries the unknown length.

A line parallel to one side of a triangle cuts the other two sides proportionally, and that is the [[intercept-theorem|intercept theorem]]: in triangle $ABC$ with $D$ on $AB$, $E$ on $AC$ and $DE \parallel BC$, $\tfrac{AD}{AB} = \tfrac{AE}{AC} = \tfrac{DE}{BC}$. With $AD = 3$, $DB = 5$ and $BC = 16$ the ratio is $\tfrac38$, so $DE = 6$. The special case $D$ and $E$ at midpoints is the [[midsegment-theorem|midsegment theorem]]: $DE$ is parallel to $BC$ and half as long. The three midsegments cut a triangle into four congruent copies at half scale, so the medial triangle of a triangle with sides $10$, $14$, $18$ has perimeter $21$ and a quarter of the area.

When no parallel line is drawn, [[parallel-line-similarity|drawing one]] creates the similar triangles. A line through a point parallel to a side turns a ratio on one segment into a ratio on another. In a trapezoid with bases $a$ and $b$, the diagonals cross at a point that divides each diagonal in the ratio $a : b$, because the two triangles on the bases are similar; the segment through that point parallel to the bases has length $\tfrac{2ab}{a + b}$, the harmonic mean, so with bases $6$ and $15$ it is $\tfrac{60}{7}$. Points that divide two sides in known ratios are compared by drawing a parallel through one of them and chasing the ratios along it.

A figure built from [[nested-similar|nested similar copies]], such as squares inscribed in squares or triangles cut by lines through an interior point parallel to the sides, has a fixed ratio from one copy to the next, so its lengths form a geometric sequence and its areas a geometric sequence with the squared ratio. When three lines through an interior point are parallel to the sides, they cut off three small triangles similar to the whole, and their scale factors add up in a way that a single equation captures: along each side, the pieces cut by the three triangles fill the side.

Look for parallel lines, draw one when needed, and write every unknown length as a ratio times a known one. The next lesson turns the same ratios into ratios of areas.`,
      related: [
        { card: "triangle-similarity", note: String.raw`the AA, SAS and SSS tests that justify each pair of similar triangles (B5.1).` },
        { card: "trapezoid-special-segments", note: String.raw`the harmonic-mean segment and the midline of a trapezoid (G7.2).` },
        { card: "geometric-series", note: String.raw`adding the lengths or areas of nested copies.` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $D$ is on $AB$ and $E$ on $AC$ with $DE \parallel BC$. If $AD = 3$, $DB = 5$ and $BC = 16$, find $DE$.`, answer: "6",
          solution: String.raw`Triangle $ADE$ is similar to $ABC$ with ratio $\tfrac{AD}{AB} = \tfrac{3}{8}$, so $DE = \tfrac38 \cdot 16 = 6$.` },
        { q: String.raw`A trapezoid has parallel sides $6$ and $15$. A segment parallel to them passes through the intersection of the diagonals and ends on the legs. Find its length.`, answer: "60/7",
          solution: String.raw`Call the bases $AB = 6$ and $DC = 15$, and let the diagonals meet at $P$, so $AP : PC = BP : PD = 6 : 15 = 2 : 5$. The segment meets $AD$ at $X$ and $BC$ at $Y$. In triangle $ADC$, $XP \parallel DC$ and $\tfrac{AP}{AC} = \tfrac27$, so $XP = \tfrac27 \cdot 15 = \tfrac{30}{7}$. In triangle $BCD$, $PY \parallel DC$ and $\tfrac{BP}{BD} = \tfrac27$, so $PY = \tfrac{30}{7}$. The segment is $\tfrac{60}{7}$, the harmonic mean $\tfrac{2 \cdot 6 \cdot 15}{6 + 15}$.` },
        { q: String.raw`A triangle has sides $10$, $14$ and $18$. Find the perimeter of the triangle whose vertices are the midpoints of its sides.`, answer: "21",
          solution: String.raw`Each side of the medial triangle is a midsegment, half of the parallel side, so its perimeter is half of $10 + 14 + 18 = 42$, that is $21$.` }
      ],
      problems: [
        "2013 AMC 12A, Problem 9",
        "2003 AMC 12B, Problem 14",
        "2011 AMC 12A, Problem 13",
        "2001 AMC 12, Problem 22",
        "2018 AMC 12B, Problem 20",
        "1984 AIME, Problem 3",
        "2021 AIME I, Problem 2",
        "2009 AIME II, Problem 3",
        "2006 AIME I, Problem 7",
        "1998 AIME, Problem 6",
        "2001 AIME I, Problem 7",
        "1986 AIME, Problem 9",
        "2018 AIME II, Problem 7"
      ]
    },
    "G1.3": {
      prereq: ["triangle-area-standard"],
      cards: ["same-base-area-ratio", "shared-angle-area-ratio", "cevian-area-ratio", "area-method"],
      body: String.raw`Areas of triangles that share a vertex, a base or an angle are in simple ratios, and many AIME problems give a figure cut into pieces with some areas known and ask for the rest. A triangle cut by cevians into six regions with four areas given, a quadrilateral split by a diagonal, points on two sides of a triangle at known fractions: each is solved by area ratios without computing any length.

Two triangles with the same height have areas in the ratio of their bases, and two with the same base have areas in the ratio of their heights. This [[same-base-area-ratio|same-base area ratio]] is the basic move: a diagonal of a quadrilateral splits the other diagonal in the ratio of the areas of the two triangles on either side of it, and a point moving parallel to a base keeps the area of the triangle constant. The same idea gives the [[cevian-area-ratio|area ratios from a cevian]]: if $D$ is on $BC$, then $\tfrac{[ABD]}{[ADC]} = \tfrac{BD}{DC}$, and the same ratio holds for any point $P$ on $AD$, $\tfrac{[ABP]}{[APC]} = \tfrac{BD}{DC}$.

Triangles that share an angle compare by the [[shared-angle-area-ratio|shared-angle ratio]]: if $X$ is on $AB$ and $Y$ on $AC$, then $\tfrac{[AXY]}{[ABC]} = \tfrac{AX \cdot AY}{AB \cdot AC}$, since both areas are $\tfrac12 \cdot$ (two sides) $\cdot \sin A$. With $AX = \tfrac25AB$ and $AY = \tfrac34AC$ the ratio is $\tfrac{3}{10}$. Chaining these ratios through a figure is the [[area-method|area method]]: in a triangle of area $60$ with $BD : DC = 1 : 2$ and $AE : EC = 3 : 1$, the triangle $ADC$ has $\tfrac23$ of the area, $40$, and $ADE$ has $\tfrac34$ of that, $30$.

For a triangle cut by three concurrent cevians into six pieces, label the unknown areas, and use the cevian ratio twice for each cevian: along $BD$, for instance, the two triangles on either side of $P$ with base on $AD$, and the two big triangles on either side of $BD$, are in the same ratio. Two such equations usually determine two unknowns. Lengths and areas can then be traded back and forth: an area ratio gives a length ratio, and a length ratio gives the next area.

Use area ratios whenever a figure is cut into triangles sharing vertices or angles, and keep track of which bases or heights are shared. The next lesson computes the lengths of cevians themselves.`,
      related: [
        { card: "trig-area", note: String.raw`$\tfrac12ab\sin C$, the reason shared angles give product ratios (G3.1).` },
        { card: "mass-points", note: String.raw`the same ratios along cevians, by weights instead of areas (G1.5).` },
        { card: "rouths-theorem", note: String.raw`the area of the triangle cut out by three cevians in known ratios (G1.5).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has area $60$. Point $D$ is on $BC$ with $BD : DC = 1 : 2$, and $E$ is on $AC$ with $AE : EC = 3 : 1$. Find the area of triangle $ADE$.`, answer: "30",
          solution: String.raw`$[ADC] = \tfrac{DC}{BC}[ABC] = \tfrac23 \cdot 60 = 40$. Triangles $ADE$ and $ADC$ share the vertex $D$ and have bases $AE$ and $AC$ on one line, so $[ADE] = \tfrac{AE}{AC}[ADC] = \tfrac34 \cdot 40 = 30$.` },
        { q: String.raw`Point $X$ is on side $AB$ of triangle $ABC$ with $AX = \tfrac25AB$, and $Y$ is on $AC$ with $AY = \tfrac34AC$. Find $\tfrac{[AXY]}{[ABC]}$.`, answer: "3/10",
          solution: String.raw`The triangles share the angle at $A$, so the ratio is $\tfrac{AX \cdot AY}{AB \cdot AC} = \tfrac25 \cdot \tfrac34 = \tfrac{3}{10}$.` }
      ],
      problems: [
        "2005 AMC 12A, Problem 15",
        "2009 AMC 12A, Problem 20",
        "2018 AMC 12A, Problem 18",
        "1985 AIME, Problem 6",
        "2001 AIME I, Problem 9",
        "2002 AIME I, Problem 10",
        "1992 AIME, Problem 14",
        "2025 AIME I, Problem 2"
      ]
    },
    "G1.4": {
      prereq: ["pythagorean-theorem"],
      cards: ["stewarts-theorem", "angle-bisector-theorem", "angle-bisector-length", "apollonius-theorem", "centroid-division"],
      body: String.raw`A cevian is a segment from a vertex of a triangle to a point on the opposite side, and the most important cevians, the median and the angle bisector, have lengths and division ratios given by short formulas. Problems ask for the length of a median from three sides, the ratio in which a bisector cuts the opposite side, or the sides of a triangle given information about its cevians. One general formula, Stewart's theorem, covers them all.

[[stewarts-theorem|Stewart's theorem]] gives the length $d$ of a cevian from $A$ to a point $D$ on $BC$ that splits it into $m = BD$ and $n = DC$: $b^2m + c^2n = a(d^2 + mn)$, with $a = BC$, $b = CA$, $c = AB$ (a mnemonic is "a man and his dad put a bomb in the sink": $man + dad = bmb + cnc$). It comes from the law of cosines applied to the two angles at $D$, which are supplementary. It is the tool whenever a cevian's foot is known and its length is wanted, or the reverse.

The median is the case $m = n = \tfrac a2$, which gives [[apollonius-theorem|Apollonius's theorem]], $b^2 + c^2 = 2m_a^2 + \tfrac{a^2}{2}$, or $m_a^2 = \tfrac{2b^2 + 2c^2 - a^2}{4}$. In a triangle with $AB = 5$, $AC = 7$ and $BC = 8$, the median from $A$ has $m_a^2 = \tfrac{50 + 98 - 64}{4} = 21$, so $m_a = \sqrt{21}$. The three medians meet at the centroid, which [[centroid-division|divides each median in the ratio $2 : 1$]] from the vertex, and the medians cut the triangle into six pieces of equal area.

The [[angle-bisector-theorem|angle bisector theorem]] says the bisector from $A$ divides $BC$ in the ratio of the adjacent sides: $\tfrac{BD}{DC} = \tfrac{AB}{AC}$. In the triangle above, $BD = 8 \cdot \tfrac{5}{12} = \tfrac{10}{3}$ and $DC = \tfrac{14}{3}$. Its [[angle-bisector-length|length]] then follows from Stewart, or from the formula $d^2 = bc\left(1 - \tfrac{a^2}{(b + c)^2}\right)$: here $d^2 = 35\left(1 - \tfrac{64}{144}\right) = \tfrac{175}{9}$, so $d = \tfrac{5\sqrt7}{3}$. The external bisector divides $BC$ externally in the same ratio. A condition such as "the point is equidistant from two sides" means the point is on a bisector, which is how the theorem enters problems that do not mention bisectors.

Use the angle bisector theorem for ratios on the opposite side, Stewart or Apollonius for lengths of cevians, and the centroid's $2 : 1$ ratio whenever medians meet. The next lesson finds ratios along several cevians at once.`,
      related: [
        { card: "law-of-cosines", note: String.raw`the source of Stewart's theorem, applied at the foot of the cevian (G3.1).` },
        { card: "median-doubling", note: String.raw`extending a median to a parallelogram, another route to Apollonius (G1.6).` },
        { card: "incenter-excenter-lemma", note: String.raw`where the angle bisector meets the circumcircle again (G5.1).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has $AB = 5$, $AC = 7$ and $BC = 8$. Find the length of the median from $A$.`, answer: "sqrt(21)",
          solution: String.raw`By Apollonius, $m_a^2 = \tfrac{2b^2 + 2c^2 - a^2}{4} = \tfrac{2 \cdot 49 + 2 \cdot 25 - 64}{4} = \tfrac{84}{4} = 21$, so $m_a = \sqrt{21}$.` },
        { q: String.raw`In the same triangle, find the length of the angle bisector from $A$.`, answer: "5sqrt(7)/3",
          solution: String.raw`The bisector meets $BC$ at $D$ with $BD : DC = 5 : 7$, so $BD = \tfrac{10}{3}$ and $DC = \tfrac{14}{3}$. Stewart: $AC^2 \cdot BD + AB^2 \cdot DC = BC(d^2 + BD \cdot DC)$, that is $49 \cdot \tfrac{10}{3} + 25 \cdot \tfrac{14}{3} = 8\left(d^2 + \tfrac{140}{9}\right)$. The left side is $\tfrac{840}{3} = 280$, so $d^2 = 35 - \tfrac{140}{9} = \tfrac{175}{9}$ and $d = \tfrac{5\sqrt7}{3}$.` }
      ],
      problems: [
        "2016 AMC 12A, Problem 12",
        "2000 AMC 12, Problem 17",
        "2000 AMC 12, Problem 19",
        "2018 AMC 12B, Problem 12",
        "2002 AMC 12B, Problem 23",
        "2008 AMC 12A, Problem 20",
        "2021 Spring AMC 12B, Problem 11",
        "1989 AIME, Problem 12",
        "2003 AIME I, Problem 7",
        "1992 AIME, Problem 9",
        "1983 AIME, Problem 14",
        "2010 AIME I, Problem 15"
      ]
    },
    "G1.5": {
      prereq: ["cevian-area-ratio", "centroid-division"],
      cards: ["mass-points", "cevian-ratio-sum", "rouths-theorem"],
      body: String.raw`When two or three cevians of a triangle cross, the ratios in which they cut each other are determined by the ratios on the sides, and the quickest way to find them is to treat the triangle as a lever. Problems give the division ratios on two sides and ask how the cevians divide each other, or give the pieces of cevians and ask for the area, or ask for the area of the small triangle that three cevians cut out.

[[mass-points|Mass points]] put weights at the vertices so that each point on a side is the balance point of its two endpoints: if $D$ is on $BC$ with $BD : DC = 2 : 1$, put mass $1$ at $B$ and $2$ at $C$, since the heavier mass sits closer to the balance point; then $D$ carries the total mass $3$. If $E$ is the midpoint of $AC$, the masses at $A$ and $C$ must be equal, so $A$ also gets $2$. The cevians $AD$ and $BE$ cross at the balance point of the whole system, which divides $AD$ in the ratio of the masses at its ends reversed: $AP : PD = 3 : 2$. The method needs only the side ratios, and when a mass must take two values, scale one assignment so they agree. For transversals that cross two cevians, split the mass at a vertex between the two sides it lies on.

Three concurrent cevians $AD$, $BE$, $CF$ meeting at $P$ satisfy the [[cevian-ratio-sum|cevian ratio sum]] $\tfrac{PD}{AD} + \tfrac{PE}{BE} + \tfrac{PF}{CF} = 1$, because each fraction is the share of the triangle's area in the small triangle on the opposite side, $\tfrac{[PBC]}{[ABC]}$ and so on. Given the pieces of the cevians, this equation and its companions determine the configuration.

[[rouths-theorem|Routh's theorem]] gives the area of the triangle formed by three cevians that do not meet at a point, from the ratios on the sides; the familiar special case is the cevians to the points one third of the way along each side, which cut out a triangle of area $\tfrac17$ of the whole. In a contest it is usually faster to find the needed ratios by mass points or area ratios than to remember the general formula, but the $\tfrac17$ case is worth knowing.

Use mass points whenever cevians cross and only ratios are known, and the cevian ratio sum when the cevians are concurrent and their pieces are given. The last lesson of the chapter collects the right-triangle and auxiliary-line figures.`,
      related: [
        { card: "cevas-theorem", note: String.raw`the condition for three cevians to meet, the product of side ratios equal to $1$ (G5.4).` },
        { card: "menelaus-theorem", note: String.raw`ratios along a transversal, the other classic route to the same answers (G5.4).` },
        { card: "barycentric-coordinates", note: String.raw`mass points made into coordinates (G9.1).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $D$ is on $BC$ with $BD : DC = 2 : 1$, and $E$ is the midpoint of $AC$. The cevians $AD$ and $BE$ meet at $P$. Find $\tfrac{AP}{PD}$.`, answer: "3/2",
          solution: String.raw`Put mass $1$ at $B$ and $2$ at $C$, so that $D$ balances $BC$ with mass $3$. Since $E$ is the midpoint of $AC$, $A$ also gets mass $2$. On $AD$ the masses are $2$ at $A$ and $3$ at $D$, so $AP : PD = 3 : 2$. (Coordinates confirm it: with $B = (0, 0)$, $C = (3, 0)$, $A = (0, 3)$ the lines meet at $\tfrac35$ of the way from $A$ to $D$.)` }
      ],
      problems: [
        "2018 AMC 12B, Problem 13",
        "2009 AIME I, Problem 4",
        "2009 AIME I, Problem 5",
        "1988 AIME, Problem 12",
        "2002 AIME II, Problem 13",
        "2003 AIME II, Problem 6",
        "1989 AIME, Problem 15"
      ]
    },
    "G1.6": {
      prereq: ["pythagorean-theorem", "triangle-similarity"],
      cards: ["altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling"],
      body: String.raw`A few auxiliary constructions create similar triangles where the figure does not show them: the altitude to the hypotenuse of a right triangle, the extension of the legs of a trapezoid or the sides of a quadrilateral until they meet, and the doubling of a median into a parallelogram. Each is a standard first move, and recognizing when to make it is most of the solution.

The [[altitude-hypotenuse|altitude to the hypotenuse]] of a right triangle cuts it into two triangles similar to the whole and to each other. With legs $a$ and $b$, hypotenuse $c$, altitude $h$ and hypotenuse pieces $p$ and $q$ (adjacent to $a$ and $b$), the similarities give $a^2 = pc$, $b^2 = qc$, $h^2 = pq$ and $h = \tfrac{ab}{c}$. A right triangle with legs $6$ and $8$ has altitude $\tfrac{48}{10} = \tfrac{24}{5}$, cutting the hypotenuse into $3.6$ and $6.4$. Seeing [[right-triangle-altitude|a right triangle with its altitude]] in a figure, for instance in a rectangle folded along a diagonal or in a semicircle with a perpendicular chord, is the signal to use these relations; the altitude-on-hypotenuse picture is also the geometric mean $h = \sqrt{pq}$.

[[extend-sides-to-meet|Extending two sides to meet]] completes a trapezoid, or any quadrilateral with a known angle sum at a side, into a triangle. The legs of a trapezoid meet at a point from which the two bases are similar cross-sections: with bases $4$ and $10$ and height $3$, the small triangle above the short base has height $h$ with $\tfrac{h}{h + 3} = \tfrac{4}{10}$, so $h = 2$. When two angles of a quadrilateral add to $90^\circ$, extending their sides creates a right angle at the meeting point; when they are $60^\circ$ each, it creates an equilateral triangle.

[[median-doubling|Doubling a median]] extends the median $AM$ of triangle $ABC$ past $M$ to $A'$ with $MA' = AM$, so that $ABA'C$ is a parallelogram. The new triangle $ABA'$ has sides $AB$, $AC$ and $2m_a$, which turns a question about a median into a question about a triangle with known sides, and it is the cleanest proof of Apollonius's theorem from the parallelogram law. It is the move to try when a median and two sides are given and the third side or the area is wanted.

When a figure has a right angle, a trapezoid, or a median, consider these constructions first. The Summary (G1.7) collects the chapter's strategies, and the problems after it mix all the ratio and similarity tools.`,
      related: [
        { card: "thales-theorem", note: String.raw`the right angle in a semicircle, which puts the altitude-on-hypotenuse picture into circle problems (G2.2).` },
        { card: "apollonius-theorem", note: String.raw`the median length that median doubling proves (G1.4).` },
        { card: "folded-paper", note: String.raw`folds that create right triangles with altitudes (G6.4).` }
      ],
      exercises: [
        { q: String.raw`A right triangle has legs $6$ and $8$. Find the length of the altitude to the hypotenuse.`, answer: "24/5",
          solution: String.raw`The hypotenuse is $10$, and twice the area is $6 \cdot 8 = 10h$, so $h = \tfrac{48}{10} = \tfrac{24}{5}$.` },
        { q: String.raw`A trapezoid has parallel sides $4$ and $10$ and height $3$. Its legs are extended to meet at a point $P$. Find the distance from $P$ to the shorter parallel side.`, answer: "2",
          solution: String.raw`The triangles cut off by the two parallel sides are similar with ratio $\tfrac{4}{10}$, so their heights from $P$ satisfy $\tfrac{h}{h + 3} = \tfrac25$. Then $5h = 2h + 6$ and $h = 2$.` }
      ],
      problems: [
        "2015 AMC 12B, Problem 11",
        "2003 AMC 12B, Problem 22",
        "2009 AMC 12B, Problem 16",
        "2024 AMC 12B, Problem 20",
        "1994 AIME, Problem 10",
        "2011 AIME I, Problem 2",
        "2011 AIME I, Problem 4",
        "2008 AIME II, Problem 5",
        "2019 AIME I, Problem 6",
        "2016 AIME II, Problem 5",
        "2001 AIME II, Problem 13"
      ]
    },
    "G1.7": {
      prereq: ["triangle-similarity", "parallel-line-similarity", "cevian-area-ratio", "stewarts-theorem", "angle-bisector-theorem", "apollonius-theorem", "centroid-division", "mass-points", "altitude-hypotenuse"],
      cards: [],
      body: String.raw`[[triangle-similarity|Similar triangles]] have their lengths in one ratio and their areas in its square, and [[parallel-line-similarity|a line parallel to a side]] makes them. Chasing a ratio through a chain of similar triangles finds a length the figure does not show.

[[cevian-area-ratio|A cevian]] divides the area in the ratio in which it divides the opposite side, since the two parts share a height; comparing areas around a shared vertex gives ratios of lengths in return.

[[stewarts-theorem|Stewart's theorem]] gives the length of any cevian. [[angle-bisector-theorem|The angle bisector]] divides the opposite side in the ratio of the adjacent sides; [[apollonius-theorem|Apollonius's theorem]] gives a median's length, and [[centroid-division|the centroid]] divides each median $2 : 1$. [[mass-points|Mass points]] turn a figure of cevians into weights that balance.

[[altitude-hypotenuse|The altitude to the hypotenuse]] creates two triangles similar to the whole right triangle, and extending sides to meet or doubling a median creates similar triangles elsewhere.`,
      strategies: [
        String.raw`Look for parallel lines; each one makes a pair of similar triangles.`,
        String.raw`Write every unknown length as a ratio of a known one, and chase the ratio through similar triangles.`,
        String.raw`For areas, use triangles that share a height or a vertex: their areas are in the ratio of their bases.`,
        String.raw`For a cevian's length, use Stewart's theorem, or the angle bisector or median formulas when they apply.`,
        String.raw`When several cevians cross, assign mass points and read the ratios off the masses.`,
        String.raw`In a right triangle, drop the altitude to the hypotenuse.`,
        String.raw`If no similar triangles appear, extend two sides to meet, or double a median.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Triangle $ABC$ has $AB = 13$, $BC = 14$ and $CA = 15$. Find the length of the median from $A$.`, answer: "2sqrt(37)",
        solution: String.raw`By Apollonius's theorem, $AB^2 + AC^2 = 2AM^2 + 2\left(\tfrac{BC}{2}\right)^2$, so $169 + 225 = 2AM^2 + 98$ and $AM^2 = 148$. So $AM = \sqrt{148} = 2\sqrt{37}$.` },
      { q: String.raw`A right triangle has legs $AB = 6$ and $AC = 8$. Find the length of the bisector of the right angle, from $A$ to $BC$.`, answer: "24sqrt(2)/7",
        solution: String.raw`The bisector meets $BC$ at $D$ with $BD : DC = 6 : 8$, so $BD = \tfrac37 \cdot 10 = \tfrac{30}{7}$. By the bisector length formula, $AD^2 = AB \cdot AC\left(1 - \tfrac{BC^2}{(AB + AC)^2}\right) = 48\left(1 - \tfrac{100}{196}\right) = \tfrac{1152}{49}$, so $AD = \tfrac{24\sqrt2}{7}$. (Areas give the same: the two triangles at $A$ have areas $\tfrac12 \cdot 6 \cdot \tfrac{AD}{\sqrt2}$ and $\tfrac12 \cdot 8 \cdot \tfrac{AD}{\sqrt2}$, adding to $24$.)` },
      { q: String.raw`In triangle $ABC$, $D$ is on $BC$ with $BD : DC = 1 : 2$, and $E$ is the midpoint of $AC$. Segments $AD$ and $BE$ meet at $P$. Find $\tfrac{AP}{PD}$.`, answer: "3",
        solution: String.raw`Assign masses so that each cevian balances. For $D$ on $BC$ with $BD : DC = 1 : 2$, put mass $2$ at $B$ and $1$ at $C$. For $E$ the midpoint of $AC$, $A$ gets the same mass as $C$, $1$. Then $D$ carries $2 + 1 = 3$, and $AP : PD = 3 : 1$.` },
      { q: String.raw`A right triangle has legs $3$ and $4$. Find the altitude to the hypotenuse.`, answer: "12/5",
        solution: String.raw`The area is $\tfrac12 \cdot 3 \cdot 4 = 6$, and also $\tfrac12 \cdot 5 \cdot h$. So $h = \tfrac{12}{5}$.` },
      { q: String.raw`Triangle $ABC$ has area $36$ and centroid $G$. Find the area of triangle $GBC$.`, answer: "12",
        solution: String.raw`The centroid is a third of the way from $BC$ to $A$ along the median, so the height of $GBC$ is a third of the height of $ABC$ on the same base. Its area is $\tfrac13 \cdot 36 = 12$.` },
      { q: String.raw`The midpoints of the sides of a convex quadrilateral of area $40$ are joined in order. Find the area of the quadrilateral they form.`, answer: "20",
        solution: String.raw`Call the quadrilateral $ABCD$. The corner triangle at $B$, cut off by the midpoints of $AB$ and $BC$, is similar to triangle $ABC$ with ratio $\tfrac12$, so its area is $\tfrac14[ABC]$; the corner at $D$ is $\tfrac14[ACD]$. Together they are $\tfrac14$ of the whole, $10$. In the same way, using the diagonal $BD$, the corners at $A$ and $C$ are another $10$. The inner parallelogram is what remains: $40 - 20 = 20$.` },
      { q: String.raw`Two similar triangles have corresponding sides in the ratio $2 : 3$. The smaller has area $20$. Find the area of the larger.`, answer: "45",
        solution: String.raw`Areas of similar figures are in the square of the ratio of lengths, $4 : 9$. So the larger has area $\tfrac94 \cdot 20 = 45$.` }
    ],
    problems: [
      "2015 AIME I, Problem 7",
      "2004 AIME I, Problem 9",
      "2012 AIME I, Problem 12"
    ]
  },
  challenge: {
    problems: [
      "2014 AIME II, Problem 11",
      "2019 AIME II, Problem 7",
      "2014 AIME I, Problem 13",
      "2023 AIME II, Problem 12",
      "1996 AIME, Problem 13"
    ]
  }
};
