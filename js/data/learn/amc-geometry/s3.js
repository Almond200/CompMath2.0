// Learn, AMC Geometry, chapter S3: similar triangles and area ratios (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S3"] = {
  lessons: {
    "S3.1": {
      prereq: ["parallel-exterior-angles", "triangle-area-standard"],
      cards: [],
      body: String.raw`Two figures are similar when one is a scaled copy of the other: the same angles, with every length multiplied by the same factor. Similarity is the main tool of AMC geometry after the Pythagorean theorem, because it turns equal angles, which are easy to find, into equal ratios of lengths, which are what the problems ask for. This chapter also compares areas, which follow from lengths in the same way.

A person $6$ feet tall casts a shadow $4$ feet long while a tree casts one of $20$ feet. The sun's rays make the same angle with the ground for both, so the person and the tree, each with its shadow, form similar right triangles, and the tree is $6 \cdot \tfrac{20}{4} = 30$ feet tall. Scaling a figure by $3$ multiplies its lengths by $3$ but its area by $9$, since area is length times length. And the segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long: half of $14$ is $7$.

The lessons take these ideas in turn: similar triangles (S3.2), parallel lines and midsegments (S3.3), ratios of areas (S3.4), and angle bisectors, medians and mass points (S3.5). The Summary (S3.6) collects the strategies.`,
      exercises: [
        { q: String.raw`A person $6$ feet tall casts a shadow $4$ feet long. At the same time a tree casts a shadow $20$ feet long. How tall is the tree, in feet?`, answer: "30",
          solution: String.raw`The sun's rays meet the ground at the same angle, so each object and its shadow form similar right triangles. The ratio of height to shadow is $\tfrac64$ for both, so the tree is $20 \cdot \tfrac64 = 30$ feet.` },
        { q: String.raw`A figure is enlarged so that every length is multiplied by $3$. By what factor is its area multiplied?`, answer: "9",
          solution: String.raw`Area is a product of two lengths, each multiplied by $3$, so the area is multiplied by $3^2 = 9$.` },
        { q: String.raw`A triangle has a side of length $14$. How long is the segment joining the midpoints of the other two sides?`, answer: "7",
          solution: String.raw`The segment joining the midpoints of two sides is parallel to the third side and half as long: $7$.` }
      ],
      problems: [
        "2002 AMC 8, Problem 13",
        "2017 AMC 8, Problem 16",
        "2018 AMC 8, Problem 20"
      ]
    },
    "S3.2": {
      prereq: ["parallel-exterior-angles", "angle-chasing", "pythagorean-theorem"],
      cards: ["triangle-similarity", "similar-figures-ratios"],
      body: String.raw`In triangle $ABC$ a line parallel to $BC$ cuts off a smaller triangle: how long is the cut? Two similar triangles have areas $16$ and $25$: how do their perimeters compare? How long is the altitude to the hypotenuse of a $6$-$8$-$10$ triangle? Each is a question about two triangles of the same shape.

[[triangle-similarity|Two triangles are similar]] when their angles match, and then all their corresponding sides are in one ratio. Two equal angles are enough (AA), since the third is then equal too; two sides in proportion with the angle between them equal (SAS), or all three sides in proportion (SSS), also suffice. Most similar triangles in contest figures come from a shared angle and a pair of parallel lines, or from right angles. In triangle $ABC$, if $D$ on $AB$ and $E$ on $AC$ make $DE \parallel BC$, the triangles $ADE$ and $ABC$ share the angle at $A$ and have equal angles at $D$ and $B$, so they are similar. With $AD = 4$, $DB = 2$ and $BC = 12$, the ratio is $\tfrac{AD}{AB} = \tfrac46$, and $DE = \tfrac23 \cdot 12 = 8$.

The work is in matching the corners. Write the similarity with the equal angles in the same order, $\triangle ADE \sim \triangle ABC$, and read the ratios off by position: $\tfrac{AD}{AB} = \tfrac{AE}{AC} = \tfrac{DE}{BC}$. In a right triangle, the altitude to the hypotenuse makes two smaller triangles, each similar to the whole, since each shares an acute angle with it. In the $6$-$8$-$10$ triangle the altitude $h$ satisfies $\tfrac h6 = \tfrac 8{10}$, so $h = \tfrac{24}{5}$; the area, $\tfrac12 \cdot 6 \cdot 8 = \tfrac12 \cdot 10 \cdot h$, gives the same.

[[similar-figures-ratios|Similar figures]] of any shape, in the ratio $k$, have lengths in the ratio $k$, areas in the ratio $k^2$, and volumes in the ratio $k^3$. Triangles with areas $16$ and $25$ have $k^2 = \tfrac{16}{25}$, so $k = \tfrac45$, and a smaller perimeter of $20$ goes with a larger one of $25$. Doubling every edge of a cube multiplies its volume by $8$. A common error is to scale an area by $k$ instead of $k^2$.

Find two equal angles, write the similarity with its corners in order, read the ratios by position, and square or cube the ratio for areas and volumes. The next lesson uses parallel lines to make similar triangles on purpose.`,
      related: [
        { card: "altitude-hypotenuse", note: String.raw`the lengths that the altitude to the hypotenuse creates (S4.3).` },
        { card: "triangle-congruence", note: String.raw`the special case of ratio $1$ (S1.3).` },
        { card: "inscribed-angle-theorem", note: String.raw`equal angles in circles, a common source of similar triangles (S5.3).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, points $D$ on $AB$ and $E$ on $AC$ make $DE \parallel BC$. If $AD = 4$, $DB = 2$ and $BC = 12$, how long is $DE$?`, answer: "8",
          solution: String.raw`The triangles $ADE$ and $ABC$ share the angle at $A$, and $\angle ADE = \angle ABC$ since $DE \parallel BC$, so they are similar with ratio $\tfrac{AD}{AB} = \tfrac46 = \tfrac23$. So $DE = \tfrac23 \cdot 12 = 8$.` },
        { q: String.raw`Two similar triangles have areas $16$ and $25$. The smaller has perimeter $20$. What is the perimeter of the larger?`, answer: "25",
          solution: String.raw`The areas are in the ratio $k^2 = \tfrac{25}{16}$, so the lengths are in the ratio $k = \tfrac54$. The larger perimeter is $20 \cdot \tfrac54 = 25$.` },
        { q: String.raw`A right triangle has legs $6$ and $8$. How long is the altitude to its hypotenuse?`, answer: "24/5",
          solution: String.raw`The hypotenuse is $10$. The altitude cuts off a triangle similar to the whole, with the altitude $h$ opposite the same angle as the leg $8$ in the whole and the leg $6$ as its hypotenuse: $\tfrac h6 = \tfrac8{10}$, so $h = \tfrac{24}{5}$. Check by area: $\tfrac12 \cdot 6 \cdot 8 = 24 = \tfrac12 \cdot 10 \cdot \tfrac{24}{5}$.` },
        { q: String.raw`Every edge of a cube is doubled. By what factor is its volume multiplied?`, answer: "8",
          solution: String.raw`The new cube is similar to the old with ratio $2$, so the volume is multiplied by $2^3 = 8$.` }
      ],
      problems: [
        "1994 AJHSME, Problem 16",
        "2023 AMC 8, Problem 19",
        "2008 AMC 10B, Problem 7",
        "2015 AMC 10A, Problem 9",
        "2011 AMC 10B, Problem 9",
        "2010 AMC 10A, Problem 12",
        "2018 AMC 10A, Problem 9",
        "2013 AMC 10A, Problem 12",
        "2016 AMC 10B, Problem 10",
        "2009 AMC 10B, Problem 18",
        "2002 AMC 10A, Problem 20"
      ]
    },
    "S3.3": {
      prereq: ["triangle-similarity", "similar-figures-ratios"],
      cards: ["parallel-line-similarity", "midsegment-theorem", "intercept-theorem", "nested-similar"],
      body: String.raw`The midpoints of the sides of a triangle with perimeter $30$ are joined: what is the perimeter of the new triangle? A line parallel to one side cuts the other two sides: how are the pieces related? A square's midpoints are joined to make a smaller square, again and again: how fast does the area shrink? Parallel lines make similar triangles, and where there are none, drawing one helps.

[[parallel-line-similarity|Drawing a parallel line]] is a construction. When a figure has a ratio along one line but the question is about another, a line drawn through a key point parallel to a side creates similar triangles that carry the ratio across. It is often the step that turns a hard ratio problem into two easy ones: the parallel through a point on one cevian makes the ratios on another cevian readable.

[[midsegment-theorem|The midsegment]] joining the midpoints of two sides of a triangle is parallel to the third side and half as long, since it cuts off a triangle similar to the whole with ratio $\tfrac12$. So the three midsegments form a triangle with half the perimeter, $15$, and a quarter of the area, and they cut the triangle into four congruent copies of it. The midpoints of the sides of any quadrilateral form a parallelogram, since two of its sides are both parallel to one diagonal.

[[intercept-theorem|The intercept theorem]] reads the same similarity as a statement about pieces: a line cutting sides $AB$ and $AC$ at $D$ and $E$ is parallel to $BC$ exactly when $\tfrac{AD}{DB} = \tfrac{AE}{EC}$. With $\tfrac{AD}{DB} = \tfrac32$ and $AE = 6$, $EC = 4$. It holds for any number of parallel lines cutting two transversals: they cut both in the same ratios. [[nested-similar|Nested similar figures]], each inside the last with the same ratio, shrink their areas by $k^2$ at every step. Joining a square's midpoints gives a square of half the area, so from area $16$ the next squares are $8$, $4$, $2$; the total area of all of them is a geometric series.

Draw a parallel to make similar triangles where a ratio must be moved, halve with midsegments, and multiply by $k^2$ at each step of a nested figure. The next lesson compares areas without similar triangles.`,
      related: [
        { card: "mass-points", note: String.raw`ratios along cevians without drawing parallels (S3.5).` },
        { card: "varignons-theorem", note: String.raw`the midpoint parallelogram of a quadrilateral (S10.5).` },
        { card: "geometric-series", note: String.raw`the total of the areas of nested figures.` }
      ],
      exercises: [
        { q: String.raw`A triangle has perimeter $30$. What is the perimeter of the triangle whose corners are the midpoints of its sides?`, answer: "15",
          solution: String.raw`Each side of the new triangle is a midsegment, half of the side it is parallel to. So its perimeter is half of $30$: $15$.` },
        { q: String.raw`In triangle $ABC$ a line parallel to $BC$ meets $AB$ at $D$ and $AC$ at $E$, with $\tfrac{AD}{DB} = \tfrac32$ and $AE = 6$. How long is $EC$?`, answer: "4",
          solution: String.raw`A parallel to $BC$ cuts $AB$ and $AC$ in the same ratio, so $\tfrac{AE}{EC} = \tfrac32$, and $EC = 6 \cdot \tfrac23 = 4$.` },
        { q: String.raw`A square has area $16$. Joining the midpoints of its sides makes a second square, joining the second's midpoints a third, and so on. What is the area of the fourth square?`, answer: "2",
          solution: String.raw`Joining the midpoints of a square's sides cuts off four corner triangles that together make half the square, so each new square has half the area of the last: $16, 8, 4, 2$.` }
      ],
      problems: [
        "2000 AMC 10, Problem 5",
        "2005 AMC 10B, Problem 7",
        "2008 AMC 10A, Problem 20",
        "2011 AMC 12A, Problem 13",
        "2012 AMC 10B, Problem 19",
        "2012 AMC 10A, Problem 21"
      ]
    },
    "S3.4": {
      prereq: ["triangle-area-standard", "similar-figures-ratios"],
      cards: ["same-base-area-ratio", "shared-angle-area-ratio", "cevian-area-ratio", "incenter-area-split"],
      body: String.raw`A point divides a side of a triangle in the ratio $2 : 3$: how is the area divided? Points one third and one half of the way along two sides cut off a corner: what fraction of the area is it? The diagonals of a quadrilateral cross: how do the four pieces compare? Ratios of areas often need no lengths at all.

[[cevian-area-ratio|A cevian]], a segment from a corner to the opposite side, splits a triangle into two triangles with the same height, so their areas are in the ratio of their bases: if $D$ on $BC$ has $BD : DC = 2 : 3$ and the whole area is $30$, then $[ABD] = 12$ and $[ACD] = 18$ (square brackets mean area). [[same-base-area-ratio|Two triangles on the same base]] have areas in the ratio of their heights, and when the diagonals of a quadrilateral $ABCD$ cross at $P$, the heights of $ABD$ and $CBD$ over $BD$ are in the ratio $AP : PC$. So $\tfrac{[ABD]}{[CBD]} = \tfrac{AP}{PC}$, and with $AP : PC = 1 : 2$ the ratio is $\tfrac12$. These two facts are behind most area chases: move the ratio along a line, then read it as an area ratio.

[[shared-angle-area-ratio|Triangles sharing an angle]] have areas in the ratio of the products of the sides along it: $\tfrac{[AXY]}{[ABC]} = \tfrac{AX \cdot AY}{AB \cdot AC}$ for $X$ on $AB$ and $Y$ on $AC$. With $AX = \tfrac13 AB$ and $AY = \tfrac12 AC$, the corner triangle is $\tfrac16$ of the whole, $5$ out of $30$. It follows from two cevian steps, or from the area $\tfrac12 ab\sin C$. The same ratio holds when the angles are supplementary, as when one triangle is on the other side of $A$.

[[incenter-area-split|The incenter]], where the angle bisectors meet, is the same distance $r$ from all three sides, so the lines from it to the corners cut the triangle into three triangles with height $r$ over the sides $a$, $b$, $c$. Their areas are in the ratio $a : b : c$: in the $13$-$14$-$15$ triangle of area $84$, the piece over the side $14$ has area $84 \cdot \tfrac{14}{42} = 28$.

Read a ratio on a side as a ratio of areas with the same height, multiply the two side ratios for a corner triangle, and split by the incenter in the ratio of the sides. The next lesson finds the ratios on the sides.`,
      related: [
        { card: "trig-area", note: String.raw`the area $\tfrac12 ab\sin C$ behind the shared-angle ratio (S4.6).` },
        { card: "inradius-area", note: String.raw`the same split added up: area equals $r$ times half the perimeter (S4.5).` },
        { card: "area-by-pieces", note: String.raw`assembling the region asked for from the pieces (S1.4).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has area $30$, and $D$ on $BC$ has $BD : DC = 2 : 3$. What is the area of triangle $ABD$?`, answer: "12",
          solution: String.raw`Triangles $ABD$ and $ACD$ have the same height from $A$, so their areas are in the ratio $2 : 3$ of their bases. So $[ABD] = \tfrac25 \cdot 30 = 12$.` },
        { q: String.raw`Triangle $ABC$ has area $30$. Point $X$ on $AB$ has $AX = \tfrac13 AB$, and $Y$ on $AC$ has $AY = \tfrac12 AC$. What is the area of triangle $AXY$?`, answer: "5",
          solution: String.raw`Triangles sharing the angle at $A$ have areas in the ratio of the products of the sides along it: $\tfrac{[AXY]}{[ABC]} = \tfrac13 \cdot \tfrac12 = \tfrac16$. So $[AXY] = 5$.` },
        { q: String.raw`The diagonals of quadrilateral $ABCD$ meet at $P$ with $AP : PC = 1 : 2$. What is the ratio of the area of triangle $ABD$ to that of triangle $CBD$?`, answer: "1/2",
          solution: String.raw`The two triangles share the base $BD$, and their heights over it are in the ratio of $AP$ to $PC$, since $A$ and $C$ lie on a line through $P$ on $BD$. So the ratio is $\tfrac12$.` },
        { q: String.raw`Triangle $ABC$ has sides $AB = 13$, $BC = 14$, $CA = 15$ and area $84$, and $I$ is its incenter. What is the area of triangle $BIC$?`, answer: "28",
          solution: String.raw`The incenter is the same distance $r$ from each side, so $[BIC] : [CIA] : [AIB] = 14 : 15 : 13$. So $[BIC] = 84 \cdot \tfrac{14}{42} = 28$.` }
      ],
      problems: [
        "2005 AMC 12A, Problem 15",
        "2004 AMC 10B, Problem 18",
        "2012 AMC 12A, Problem 10",
        "2009 AMC 12A, Problem 14",
        "2017 AMC 10B, Problem 19"
      ]
    },
    "S3.5": {
      prereq: ["triangle-similarity", "cevian-area-ratio"],
      cards: ["angle-bisector-theorem", "centroid-division", "mass-points"],
      body: String.raw`The bisector of angle $A$ in a triangle with $AB = 6$ and $AC = 9$ meets $BC$, of length $10$: where? Where do the medians of a triangle cross? Two cevians cross inside a triangle: in what ratios do they cut each other? Three tools give the ratios on the sides and on the cevians.

[[angle-bisector-theorem|The angle bisector theorem]] says that the bisector from $A$ divides $BC$ in the ratio of the sides beside it: $\tfrac{BD}{DC} = \tfrac{AB}{AC}$. With $6$ and $9$, $BD : DC = 2 : 3$, so $BD = 4$ and $DC = 6$. The reason is an area ratio: the triangles $ABD$ and $ACD$ have areas in the ratio $BD : DC$ (same height from $A$), and also in the ratio $AB : AC$ (same height from $D$, which is equally far from both sides of the angle).

[[centroid-division|The medians]] of a triangle, the segments from each corner to the midpoint of the opposite side, meet at one point, the centroid $G$, which is two thirds of the way along each median from the corner: $AG : GM = 2 : 1$. A median of length $12$ has $AG = 8$. In coordinates the centroid is the average of the corners, $\tfrac{A + B + C}{3}$, and the three medians cut the triangle into six small triangles of equal area.

[[mass-points|Mass points]] find the ratios in which any two cevians cut each other. Put masses on the corners so that each cevian's foot is the balance point of the two corners it lies between: $m_B \cdot BD = m_C \cdot DC$. The foot gets the sum of the masses, and the crossing point balances each cevian. Let $D$ be the midpoint of $BC$ and $E$ on $AC$ with $AE : EC = 2 : 1$. Balancing $E$ needs $m_A : m_C = 1 : 2$, and balancing $D$ needs $m_B = m_C$, so take $m_A = 1$, $m_B = m_C = 2$. Then $m_D = 4$ and $m_E = 3$, and the crossing point $P$ divides $AD$ in the ratio $AP : PD = m_D : m_A = 4 : 1$ and $BE$ in the ratio $BP : PE = m_E : m_B = 3 : 2$. The same answers come from drawing a parallel (S3.3) or from coordinates, more slowly.

Split a side in the ratio of the adjacent sides for a bisector, take two thirds of a median for the centroid, and balance masses for crossing cevians. The Summary follows.`,
      related: [
        { card: "angle-bisector-length", note: String.raw`the length of the bisector itself (S9.3).` },
        { card: "cevas-theorem", note: String.raw`when three cevians meet at one point (S9.3).` },
        { card: "section-formula", note: String.raw`the point dividing a segment in a ratio, in coordinates (S7.2).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 9$ and $BC = 10$. The bisector of angle $A$ meets $BC$ at $D$. How long is $BD$?`, answer: "4",
          solution: String.raw`By the angle bisector theorem, $BD : DC = AB : AC = 6 : 9 = 2 : 3$. So $BD = \tfrac25 \cdot 10 = 4$.` },
        { q: String.raw`A median of a triangle has length $12$. How far is the centroid from the corner at which the median starts?`, answer: "8",
          solution: String.raw`The centroid is two thirds of the way along each median from the corner: $\tfrac23 \cdot 12 = 8$.` },
        { q: String.raw`In triangle $ABC$, $D$ is the midpoint of $BC$ and $E$ is on $AC$ with $AE : EC = 2 : 1$. Segments $AD$ and $BE$ meet at $P$. What is $\tfrac{AP}{PD}$?`, answer: "4",
          solution: String.raw`Balance $E$: $m_A \cdot AE = m_C \cdot EC$, so $m_A : m_C = 1 : 2$; take $m_A = 1$, $m_C = 2$. Balance $D$: $m_B = m_C = 2$, so $m_D = 4$. On $AD$, $P$ balances $A$ and $D$: $AP : PD = m_D : m_A = 4 : 1$. (Coordinates confirm it.)` },
        { q: String.raw`In the same triangle, what is $\tfrac{BP}{PE}$?`, answer: "3/2",
          solution: String.raw`The mass at $E$ is $m_A + m_C = 3$, and $P$ balances $B$ (mass $2$) and $E$ (mass $3$), so $BP : PE = 3 : 2$.` }
      ],
      problems: [
        "2020 AMC 10A, Problem 12",
        "2010 AMC 10A, Problem 16",
        "2009 AMC 10B, Problem 20",
        "2018 AMC 10B, Problem 12",
        "2016 AMC 12A, Problem 12",
        "2000 AMC 12, Problem 17",
        "2022 AMC 10A, Problem 13"
      ]
    },
    "S3.6": {
      prereq: ["triangle-similarity", "similar-figures-ratios", "parallel-line-similarity", "midsegment-theorem", "intercept-theorem", "nested-similar", "same-base-area-ratio", "shared-angle-area-ratio", "cevian-area-ratio", "incenter-area-split", "angle-bisector-theorem", "centroid-division", "mass-points"],
      cards: [],
      body: String.raw`[[triangle-similarity|Similar triangles]] come from two equal angles; [[similar-figures-ratios|similar figures]] have lengths, areas and volumes in the ratios $k$, $k^2$, $k^3$.

[[parallel-line-similarity|A parallel line]] makes similar triangles where they are needed; [[midsegment-theorem|a midsegment]] is half the third side; [[intercept-theorem|parallels]] cut transversals in equal ratios; and [[nested-similar|nested figures]] shrink by $k^2$ at each step.

[[cevian-area-ratio|A cevian]] splits the area in the ratio of the base, [[same-base-area-ratio|a common base]] in the ratio of the heights, [[shared-angle-area-ratio|a shared angle]] in the product of the side ratios, and [[incenter-area-split|the incenter]] in the ratio of the sides.

[[angle-bisector-theorem|An angle bisector]] divides the opposite side in the ratio of the adjacent sides, [[centroid-division|the centroid]] lies two thirds along each median, and [[mass-points|mass points]] balance the corners to give the ratios on crossing cevians.`,
      strategies: [
        String.raw`Look for two equal angles, from parallels, a shared angle or right angles, to find similar triangles.`,
        String.raw`Write a similarity with its corners in matching order before reading off ratios.`,
        String.raw`Square the ratio for areas and cube it for volumes.`,
        String.raw`Draw a parallel line to carry a ratio from one segment to another.`,
        String.raw`Compare the areas of triangles with the same height by their bases.`,
        String.raw`For crossing cevians, put masses on the corners.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A $5$-foot stick casts a $3$-foot shadow while a flagpole casts an $18$-foot shadow. How tall is the flagpole, in feet?`, answer: "30",
        solution: String.raw`The stick and the pole with their shadows make similar right triangles, so the pole is $18 \cdot \tfrac53 = 30$ feet.` },
      { q: String.raw`Two similar triangles have corresponding sides $4$ and $10$. What is the ratio of their areas?`, answer: "4/25",
        solution: String.raw`The ratio of lengths is $\tfrac{4}{10} = \tfrac25$, so the ratio of areas is $\left(\tfrac25\right)^2 = \tfrac{4}{25}$.` },
      { q: String.raw`A triangle has sides $5$, $6$ and $7$. The bisector of the angle between the sides $5$ and $7$ divides the side $6$ into two pieces. How long is the longer piece?`, answer: "7/2",
        solution: String.raw`The pieces are in the ratio $5 : 7$ and add to $6$, so they are $\tfrac52$ and $\tfrac72$. The longer is $\tfrac72$.` }
    ],
    problems: [
      "2023 AMC 8, Problem 24",
      "2006 AMC 10B, Problem 15",
      "2021 Spring AMC 10A, Problem 12",
      "2003 AMC 10B, Problem 20",
      "2007 AMC 10B, Problem 21",
      "2016 AMC 10A, Problem 19",
      "2018 AMC 12B, Problem 20",
      "2000 AMC 12, Problem 19"
    ]
  },
  challenge: {
    problems: [
      "2018 AMC 10A, Problem 24",
      "2016 AMC 12B, Problem 17",
      "2018 AMC 12B, Problem 13",
      "1985 AIME, Problem 6",
      "2009 AIME I, Problem 5"
    ]
  }
};
