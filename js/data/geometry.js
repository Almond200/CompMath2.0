// Geometry formulas and theorems.
// latex/description/example strings use String.raw so LaTeX backslashes need no escaping.
// Optional fields: example (KaTeX-rendered prose, shown behind a toggle), diagram (inline SVG).
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "geometry",
  group: "formulas",
  title: "Geometry",
  blurb: "Triangles, circles, quadrilaterals, conics, coordinates, and 3D, from the Pythagorean Theorem to Casey's Theorem.",
  subsections: [
    {
      title: "Fundamentals",
      blurb: "The first tools of plane geometry: right triangles, similar figures, midsegments, and the ratios a cevian creates.",
      formulas: [
        {
          id: "pythagorean-theorem",
          name: "Pythagorean Theorem",
          latex: String.raw`a^2 + b^2 = c^2 \iff \angle C = 90^\circ`,
          description: String.raw`The Pythagorean Theorem says that in a right triangle the square of the hypotenuse equals the sum of the squares of the two legs, where $a$ and $b$ are the legs and $c$ is the hypotenuse, the side opposite the right angle $C$. Its converse holds as well, and more: $a^2 + b^2 - c^2$ is positive, zero, or negative exactly as the angle opposite $c$ is acute, right, or obtuse. The integer triples $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$ and $(7, 24, 25)$, with their multiples, are the most common instances.`,
          keywords: ["right triangle", "hypotenuse", "legs", "triples", "three four five triangle", "five twelve 13 triangle", "distance"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "special-right-triangles",
          name: "Special Right Triangles",
          latex: String.raw`45\text{-}45\text{-}90:\; 1 : 1 : \sqrt{2} \qquad 30\text{-}60\text{-}90:\; 1 : \sqrt{3} : 2`,
          description: String.raw`Two right triangles have side ratios worth knowing by heart: the 45-45-90 triangle has sides in the ratio $1 : 1 : \sqrt2$, and the 30-60-90 triangle has sides $1 : \sqrt3 : 2$, each listed opposite the angles in the order named. Knowing one side then gives the other two instantly, with no trigonometry. They are the standard way to turn a $30^\circ$, $45^\circ$, or $60^\circ$ angle into lengths: drop a perpendicular that creates one of these triangles. In the 30-60-90 triangle the hypotenuse is twice the short leg, and the long leg is $\sqrt3$ times the short leg.`,
          keywords: ["isosceles right", "half equilateral", "side ratios", "45", "30", "60"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "altitude-hypotenuse",
          name: "Altitude to the Hypotenuse (Geometric Mean Relations)",
          latex: String.raw`h = \frac{ab}{c}, \qquad h^2 = pq, \qquad a^2 = pc, \qquad b^2 = qc`,
          description: String.raw`Dropping the altitude from the right angle to the hypotenuse of a right triangle splits it into two smaller right triangles, both similar to the original. If the altitude $h$ cuts the hypotenuse $c$ into $p$, next to leg $a$, and $q$, next to leg $b$, then $h^2 = pq$, $a^2 = pc$, and $b^2 = qc$, and comparing areas gives $h = \frac{ab}{c}$. So $h$ is the geometric mean of $p$ and $q$, and each leg is the geometric mean of the hypotenuse and the piece next to it. Given any two of these lengths, the relations recover all the others.`,
          keywords: ["geometric mean", "altitude to hypotenuse", "similar triangles", "right triangle split"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "median-to-hypotenuse",
          name: "Median to the Hypotenuse",
          latex: String.raw`\text{right }\triangle:\quad m_{\text{hyp}} = \tfrac12\,\text{hyp} = R`,
          description: String.raw`In a right triangle, the median from the right angle to the hypotenuse is half the hypotenuse. Equivalently, the midpoint of the hypotenuse is the same distance from all three vertices, so it is the circumcenter and the hypotenuse is a diameter of the circumcircle: the median $m_{\text{hyp}}$ equals the circumradius $R$. The converse holds too: if the median to a side equals half that side, the angle opposite that side is a right angle.`,
          keywords: ["median to hypotenuse", "half the hypotenuse", "right triangle median", "midpoint of hypotenuse equidistant", "circumcenter is hypotenuse midpoint", "hypotenuse is a diameter", "thales", "R = c/2", "converse right angle"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "triangle-inequality",
          name: "Triangle Inequality",
          latex: String.raw`|a - b| < c < a + b, \qquad c = a + b \ \text{or}\ c = |a - b| \iff \text{the triangle is flat}`,
          description: String.raw`The triangle inequality says that in any triangle each side is shorter than the sum of the other two, and three lengths form a triangle exactly when all three such inequalities hold. For two known sides $a$ and $b$, the third side $c$ must satisfy $|a - b| \lt c \lt a + b$. When one inequality becomes an equality, the triangle collapses flat into a line segment. It is the check that decides which side lengths are possible, and in optimization problems the flat case is often where a maximum or minimum occurs.`,
          keywords: ["exists", "valid triangle", "side lengths", "degenerate"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "triangle-type-by-sides",
          name: "Acute, Right, or Obtuse from the Sides",
          latex: String.raw`c^2 < a^2 + b^2 \iff \angle C < 90^\circ, \qquad c^2 = a^2 + b^2 \iff \angle C = 90^\circ, \qquad c^2 > a^2 + b^2 \iff \angle C > 90^\circ`,
          description: String.raw`The sides alone decide whether a triangle is acute, right, or obtuse: the angle opposite side $c$ is acute, right, or obtuse exactly as $c^2$ is less than, equal to, or greater than $a^2 + b^2$. Only the longest side can face an angle of $90^\circ$ or more, so a triangle is acute exactly when the square of its longest side is less than the sum of the squares of the other two.`,
          keywords: ["acute triangle", "obtuse triangle", "right triangle test", "classify a triangle by its sides", "longest side squared", "triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "triangle-congruence",
          name: "Triangle Congruence Criteria",
          latex: String.raw`\text{SSS},\ \ \text{SAS},\ \ \text{ASA},\ \ \text{AAS},\ \ \text{HL} \qquad (\text{SSA can fail})`,
          description: String.raw`Two triangles are congruent, the same size and shape, when certain three of their parts match: three sides (SSS), two sides and the angle between them (SAS), two angles and the side between them (ASA), two angles and a side not between them (AAS), or, for right triangles, the hypotenuse and a leg (HL). Two sides and an angle not between them (SSA) can fit two different triangles, so it is not a criterion.`,
          keywords: ["congruent triangles", "sss", "sas", "asa", "aas", "hl hypotenuse leg", "ssa ambiguous case", "cpctc", "triangle congruence", "triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "triangle-similarity",
          name: "Triangle Similarity Criteria",
          latex: String.raw`\text{AA},\ \ \text{SAS},\ \ \text{SSS}, \qquad DE \parallel BC \Rightarrow \triangle ADE \sim \triangle ABC`,
          description: String.raw`Two triangles are [[similar-figures-ratios|similar]], the same shape at possibly different sizes, when two pairs of angles are equal (AA), when two pairs of sides are in the same ratio with equal angles between them (SAS), or when all three pairs of sides are in the same ratio (SSS). The most common source of similar triangles is a line parallel to one side, which cuts off a smaller copy of the whole triangle: $D$ on $AB$ and $E$ on $AC$ with $DE \parallel BC$.`,
          keywords: ["similar triangles", "aa similarity", "sas similarity", "sss similarity", "angle angle", "parallel line similar triangle", "triangle similarity test", "proportional sides", "triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "parallel-exterior-angles",
          name: "Parallel Lines & the Exterior Angle Theorem",
          latex: String.raw`\text{alternate angles equal}, \qquad \angle A + \angle B + \angle C = 180^\circ, \qquad \text{exterior} = \angle A + \angle B`,
          description: String.raw`A line crossing two parallel lines makes equal corresponding angles and equal alternate interior angles, and the two interior angles on the same side add up to $180^\circ$. Drawing a parallel through one vertex of a triangle turns these facts into the angle sum $180^\circ$ and the Exterior Angle Theorem: an exterior angle of a triangle, such as the one at $C$, equals the sum of the two interior angles that are not next to it.`,
          keywords: ["parallel lines", "transversal", "alternate interior angles", "corresponding angles", "co-interior angles", "exterior angle theorem", "triangle angle sum", "remote interior angles", "angles"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "trapezoid-consecutive-angles",
          name: "Consecutive Angles of a Trapezoid",
          latex: String.raw`AB \parallel DC \;\Rightarrow\; \angle A + \angle D = 180^\circ,\ \ \angle B + \angle C = 180^\circ`,
          description: String.raw`In a trapezoid $ABCD$ with bases $AB$ and $DC$, the two angles along each leg add up to $180^\circ$, because the leg is a transversal of the two parallel bases. So knowing one angle at each leg determines all four angles, and a quadrilateral in which two consecutive angles add to $180^\circ$ has the sides beyond them parallel.`,
          keywords: ["trapezoid angles", "consecutive angles of a trapezoid", "angles along a leg", "co-interior angles", "supplementary angles trapezoid", "isosceles trapezoid base angles", "cyclic trapezoid", "quadrilateral"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "parallel-by-angle-sum",
          name: "Proving Lines Parallel by Angle Sums",
          latex: String.raw`\angle 1 + \angle 2 = 180^\circ \text{ (same side, between the lines)} \;\Rightarrow\; \ell \parallel m`,
          description: String.raw`Two lines $\ell$ and $m$ cut by a transversal are parallel when the two interior angles $\angle1$ and $\angle2$ on the same side of the transversal add up to $180^\circ$, or equivalently when alternate angles or corresponding angles are equal. It is the converse of the angle facts for parallel lines, and in the language of [[directed-angles|directed angles]] it is the single statement that the two lines make the same angle with the transversal, modulo $180^\circ$.`,
          keywords: ["proving lines parallel", "converse of parallel lines", "co-interior angles sum to 180", "same side interior angles", "alternate angles equal so parallel", "test for parallel lines", "directed angles parallel", "angles"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "integer-triangles-perimeter",
          name: "Counting Integer-Sided Triangles by Perimeter",
          latex: String.raw`\begin{gathered} \#\{a\le b\le c,\ a+b+c=n,\ a+b>c\} \\ = \begin{cases}\operatorname{round}\!\left(\dfrac{n^2}{48}\right) & n\text{ even}\\[4pt] \operatorname{round}\!\left(\dfrac{(n+3)^2}{48}\right) & n\text{ odd}\end{cases} \end{gathered}`,
          description: String.raw`The number of noncongruent triangles with positive integer sides and perimeter $n$ (Alcuin's sequence), rounded to the nearest integer. It comes from counting triples $a\le b\le c$ with $a+b+c=n$ subject to the triangle inequality $a+b>c$ (equivalently $c\lt n/2$): fix the longest side $c$, count the valid $(a,b)$, and sum. Requiring all sides distinct or a particular shape adjusts the count the same way.`,
          keywords: ["integer sided triangles", "count triangles", "perimeter", "triangle inequality counting", "alcuin sequence", "how many triangles", "noncongruent triangles"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "perpendicular-bisector-locus",
          name: "Perpendicular Bisector as a Locus",
          latex: String.raw`PA = PB \iff P \text{ lies on the perpendicular bisector of } AB`,
          description: String.raw`The perpendicular bisector of a segment $AB$ is the line through its midpoint at right angles to it, and it is exactly the set of points equidistant from $A$ and $B$: every point on it has $PA = PB$, and every point with $PA = PB$ is on it. Because the converse holds, a condition like "the same distance from $A$ and $B$" can be replaced by a line. So the center of any circle through $A$ and $B$ lies on it, which is why the three side bisectors of a triangle meet at its circumcenter. And a fold that carries $A$ onto $B$ creases along it.`,
          keywords: ["perpendicular bisector", "equidistant from two points", "locus of equal distances", "center of a circle through two points", "circumcenter construction", "crease of a fold", "PA = PB", "reflection axis swapping two points"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "similar-figures-ratios",
          name: "Similar Figure Ratios",
          latex: String.raw`\frac{\ell_1}{\ell_2} = k, \qquad \frac{A_1}{A_2} = k^2, \qquad \frac{V_1}{V_2} = k^3`,
          description: String.raw`Two figures are similar when one is a scaled copy of the other, and if every length is multiplied by $k$, every area is multiplied by $k^2$ and every volume by $k^3$ (in the box, $\ell$, $A$ and $V$ are a matching length, area and volume of the two figures). That makes it the most-used idea in AMC geometry, because one matched pair of lengths fixes $k$ and then every length, area, and volume in the figure follows. In triangles, similarity usually comes from a line parallel to a side, from the [[altitude-hypotenuse|altitude to the hypotenuse]], or from two equal angles, the tests on [[triangle-similarity|Triangle Similarity Criteria]]. The powers hold for shapes of every kind, curved ones included.`,
          keywords: ["similarity", "scale factor", "area ratio", "volume ratio", "similar triangles", "length area volume"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "midsegment-theorem",
          name: "Midsegment Theorem",
          latex: String.raw`MN \parallel BC, \qquad MN = \tfrac{1}{2}BC`,
          description: String.raw`The Midsegment Theorem says that the segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long: in triangle $ABC$ with $M$ and $N$ the midpoints of $AB$ and $AC$, the midsegment $MN$ pairs with $BC$. So connecting midpoints produces parallel lines and half-lengths for free, which is often the missing similar-triangle setup. The three midsegments cut the triangle into four congruent triangles, each with a quarter of the area, and in a trapezoid the segment joining the midpoints of the legs is parallel to the bases and equal to their average.`,
          keywords: ["midpoint", "midline", "parallel", "half", "trapezoid median"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "intercept-theorem",
          name: "Intercept Theorem",
          latex: String.raw`DE \parallel BC \iff \frac{AD}{DB} = \frac{AE}{EC}`,
          description: String.raw`A line parallel to one side of a triangle cuts the other two sides proportionally (in triangle $ABC$, with $D$ on $AB$ and $E$ on $AC$) — and conversely, equal ratios force parallelism. More generally, three parallel lines cut any two transversals in equal ratios. The midsegment is the special case $AD = DB$.`,
          keywords: ["thales", "basic proportionality", "parallel cuts proportional", "transversals", "similar setup"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "centroid-division",
          name: "Centroid Divides Medians 2:1",
          latex: String.raw`AG : GM = 2 : 1, \qquad G = \frac{A+B+C}{3}`,
          description: String.raw`The centroid $G$ of a triangle $ABC$ is the point where its three medians meet; a median joins a vertex, such as $A$, to the midpoint $M$ of the opposite side. The centroid sits two thirds of the way along each median from the vertex, and in coordinates or vectors it is the plain average of the three vertices. The three medians also cut the triangle into six small triangles of equal area, which makes the centroid the standard shortcut in area-subdivision problems.`,
          keywords: ["median", "centroid", "center of mass", "two thirds", "equal areas"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "cevian-area-ratio",
          name: "Area Ratios from a Cevian",
          latex: String.raw`\frac{[ABD]}{[ACD]} = \frac{BD}{DC}`,
          description: String.raw`Area ratios from a cevian compare the two triangles a cevian cuts off: if $D$ lies on side $BC$ of triangle $ABC$, then $[ABD] : [ACD] = BD : DC$, because both triangles have the same height from $A$. It converts a ratio along a side into a ratio of areas and back, which is the first step of nearly every area-chasing problem. The bases need not be adjacent: any triangles with a common apex and bases on one line have areas in the ratio of their bases.`,
          keywords: ["cevian", "same height", "area chasing", "base ratio", "mass points"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cevian-ratio-sum",
          name: "Cevian Ratio Sum",
          latex: String.raw`\frac{PD}{AD} + \frac{PE}{BE} + \frac{PF}{CF} = 1, \qquad \frac{AP}{AD} + \frac{BP}{BE} + \frac{CP}{CF} = 2`,
          description: String.raw`Three cevians $AD$, $BE$, $CF$ of a triangle meet at an interior point $P$. Each short piece, from $P$ to a side, is the same fraction of its whole cevian as the triangle $P$ makes with that side is of the whole triangle, because the two triangles share a base and their heights are in that ratio. The three small triangles $PBC$, $PCA$, $PAB$ fill $ABC$, so the three fractions add up to one, and the long pieces, from a vertex to $P$, add up to two.`,
          keywords: ["cevian ratio sum", "gergonne ratio identity", "PD over AD", "three cevians through a point", "fractions of the cevians add to one", "vertex to P over the whole cevian", "concurrent cevians lengths", "segments from the vertices to P"],
          importance: "low",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "clock-angle",
          name: "Clock Angle Formula",
          latex: String.raw`\theta = \left| 30H - 5.5M \right|^\circ`,
          description: String.raw`Angle between the hands at $H$ hours $M$ minutes (take $360^\circ - \theta$ if over $180^\circ$). The minute hand moves $6^\circ$ per minute; the hour hand $0.5^\circ$ per minute.`,
          keywords: ["clock hands", "angle between hands", "time", "angle between clock hands", "hour and minute hand angle", "clock hands problem"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Polygons & Quadrilaterals",
      blurb: "Angle sums and areas of polygons, the regular hexagon and dodecagon, and the named theorems about quadrilaterals.",
      formulas: [
        {
          id: "polygon-angle-sums",
          name: "Polygon Angle Sums",
          latex: String.raw`\text{Interior sum} = 180^\circ(n-2), \quad \text{Exterior sum} = 360^\circ, \quad \#\text{diagonals} = \tfrac{n(n-3)}{2}`,
          description: String.raw`The interior angles of any polygon with $n$ sides add up to $180^\circ(n - 2)$, and its exterior angles, one at each vertex, always add up to $360^\circ$. So each interior angle of a regular $n$-gon is $\frac{180^\circ(n - 2)}{n}$ and each exterior angle is $\frac{360^\circ}{n}$. The exterior form is usually faster: a regular polygon with interior angles of $156^\circ$ has exterior angles of $24^\circ$, so it has $\frac{360}{24} = 15$ sides. An $n$-gon also has $\frac{n(n - 3)}{2}$ diagonals, because each vertex has a diagonal to every vertex except itself and its two neighbors.`,
          keywords: ["interior angles", "exterior angles", "regular polygon", "n-gon", "number of diagonals", "diagonals of a polygon", "diagonals"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "regular-polygon-area",
          name: "Regular Polygon Area",
          latex: String.raw`A = \tfrac{1}{2}ap = \tfrac{1}{2}nR^2\sin\tfrac{360^\circ}{n}`,
          description: String.raw`A regular polygon with $n$ sides of length $s$ has area $A = \frac12ap$, half its apothem $a$ times its perimeter $p = ns$, or in terms of its circumradius $R$, $A = \frac12nR^2\sin\frac{360^\circ}{n}$. The apothem is the distance from the center to a side, the radius of the inscribed circle. The octagon and the dodecagon, the two cases contests use most, have their own cards, linked below.`,
          keywords: ["apothem", "perimeter", "regular", "n-gon area"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "equilateral-triangle-facts",
          name: "Equilateral Triangle of Side $s$",
          latex: String.raw`h = \frac{s\sqrt{3}}{2}, \quad A = \frac{s^2\sqrt{3}}{4}, \quad R = \frac{s\sqrt{3}}{3}, \quad r = \frac{s\sqrt{3}}{6}`,
          description: String.raw`An equilateral triangle has three equal sides and three $60^\circ$ angles, and its side $s$ fixes everything: the height is $\frac{s\sqrt3}{2}$, the area is $\frac{s^2\sqrt3}{4}$, the circumradius is $\frac{s\sqrt3}{3}$, and the inradius is $\frac{s\sqrt3}{6}$. Its centroid, circumcenter, incenter, and orthocenter are one point, so the circumradius is twice the inradius and the height is their sum. Inscribed in a circle of radius $R$ the side is $R\sqrt3$, and drawn around a circle of radius $r$ it is $2r\sqrt3$.`,
          keywords: ["equilateral", "height", "area", "circumradius", "inradius", "inscribed in circle"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "equiangular-hexagon-area",
          name: "Area of an Equiangular Hexagon",
          latex: String.raw`A = \frac{\sqrt3}{4}\left[(a+b+c)^2 - a^2 - c^2 - e^2\right]`,
          description: String.raw`A hexagon with all six angles $120^\circ$ need not be regular: its sides $a, b, c, d, e, f$ in order satisfy only $a - d = e - b = c - f$. Extending sides $b$, $d$, and $f$ until they meet gives an equilateral triangle of side $a + b + c$, and the three corners cut off are equilateral of sides $a$, $c$, and $e$ — subtract them and the area follows.`,
          keywords: ["equiangular hexagon", "all angles 120 degrees", "hexagon area", "corner triangles cut off", "extend alternate sides"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "parallel-sided-hexagon",
          name: "Equilateral Hexagon with Opposite Sides Parallel",
          latex: String.raw`\frac1s = \frac1a + \frac1b + \frac1c`,
          description: String.raw`A convex hexagon $ABCDEF$ with all six sides $s$ and each pair of opposite sides parallel need not be regular. Extending the alternate sides $AB$, $CD$, $EF$ makes a triangle, and if its sides are $a$, $b$, $c$, then $\frac1s = \frac1a + \frac1b + \frac1c$. The three corners cut off are copies of that triangle scaled by $\frac sa$, $\frac sb$, $\frac sc$, and adding the pieces along one side gives the formula. An equilateral triangle, $a = b = c$, gives the regular hexagon, with $s = \frac a3$.`,
          keywords: ["equilateral hexagon", "opposite sides parallel", "hexagon with extended sides", "1/s = 1/a + 1/b + 1/c", "triangle from alternate sides", "centrally symmetric hexagon", "corner triangles similar", "extend alternate sides of a hexagon"],
          importance: "lower",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "regular-hexagon-area",
          name: "Regular Hexagon of Side $s$",
          latex: String.raw`A = \frac{3\sqrt3}{2}s^2 \qquad R = s \qquad \text{diagonals } s\sqrt3,\ 2s`,
          description: String.raw`A regular hexagon of side $s$ is six equilateral triangles of side $s$ meeting at its center, which gives everything about it at once. Its area is $\frac{3\sqrt3}{2}s^2$, its circumradius is $s$, its apothem is $\frac{s\sqrt3}{2}$, and it has only two diagonal lengths: the long ones, $2s$, pass through the center, and the short ones, $s\sqrt3$, skip one vertex. The triangle on alternate vertices is exactly half the hexagon, so regions inside it are best counted in small equilateral triangles.`,
          keywords: ["hexagon", "regular hexagon", "six equilateral triangles", "regular hexagon area", "area of a hexagon", "hexagon apothem", "hexagon diagonal", "regular hexagon diagonals", "long diagonal", "short diagonal", "diagonal of a hexagon", "opposite vertices hexagon", "s root 3", "two diagonal lengths"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
{
          id: "regular-dodecagon",
          name: "Regular Dodecagon of Side $s$",
          latex: String.raw`A = 3(2+\sqrt{3})\,s^2 = 6s^2 + 3\sqrt{3}\,s^2, \qquad A = 3R^2 \;\;(\text{circumradius } R)`,
          description: String.raw`The regular 12-gon dissects cleanly into 6 squares and 12 equilateral triangles, all of side $s$: at every $150^\circ$ interior angle a square ($90^\circ$) and a triangle ($60^\circ$) fit exactly, so $A = 6s^2 + 12\cdot\frac{\sqrt{3}}{4}s^2 = 3(2+\sqrt{3})s^2$. Inscribed in a circle of radius $R$ the area is exactly $3R^2$ (from $\tfrac12 nR^2\sin\tfrac{360^\circ}{n}$ with $n=12$), which is what makes dodecagon-in-a-circle problems so clean. Interior angle $150^\circ$; circumradius $R = \tfrac{s}{2}(\sqrt{6}+\sqrt{2})$.`,
          keywords: ["dodecagon", "regular dodecagon", "12-gon", "twelve-gon", "twelve sides", "six squares twelve triangles", "dodecagon area", "3R^2", "dodecagon dissection", "split dodecagon", "150 degrees"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "regular-octagon",
          name: "Regular Octagon of Side $s$",
          latex: String.raw`A = 2(1 + \sqrt2)s^2 \qquad \text{width} = (1 + \sqrt2)s \qquad R = \tfrac{s}{2}\sqrt{4 + 2\sqrt2}`,
          description: String.raw`A regular octagon of side $s$ is a square with its four corners cut off by right isosceles triangles, which is why a $\sqrt2$ runs through all of its lengths. Its width across two parallel sides is $(1 + \sqrt2)s$, its area is $2(1 + \sqrt2)s^2$, and its angles are $135^\circ$. Its vertices are also those of two squares turned by $45^\circ$ about one center, on its circumcircle, of radius $R$.`,
          keywords: ["regular octagon", "octagon", "stop sign", "square with corners cut off", "eight sides", "width of an octagon", "octagon area", "octagon diagonals", "135 degrees"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "ngon-vertex-distance-product",
          name: "Product of Distances to $n$-gon Vertices",
          latex: String.raw`\prod_{k=1}^{n} PV_k = 2R^n\left|\sin\tfrac{n\theta}{2}\right| \;\le\; 2R^n`,
          latexPlain: String.raw`PV_1 \cdot PV_2 \cdots PV_n = 2R^n\left|\sin\tfrac{n\theta}{2}\right| \;\le\; 2R^n`,
          description: String.raw`Let $P$ lie on the circumcircle (radius $R$) of a regular $n$-gon, at angular position $\theta$ measured from one vertex. Putting the vertices at $R\zeta^k$ with $\zeta = e^{2\pi i/n}$ and using $\prod_k (z - \zeta^k) = z^n - 1$, the product of the distances from $P$ to all $n$ vertices is $R^n\,|z^n - 1| = 2R^n\left|\sin\tfrac{n\theta}{2}\right|$. It therefore reaches its maximum $2R^n$ exactly when $P$ is the midpoint of an arc between two adjacent vertices (there $\tfrac{n\theta}{2}$ is an odd multiple of $\tfrac{\pi}{2}$), and it is $0$ when $P$ is a vertex. This is a different statement from the product of distances between one fixed vertex and the other $n-1$ vertices, which is always $nR^{n-1}$.`,
          keywords: ["product of distances", "regular polygon", "n-gon vertices", "circumcircle", "arc midpoint", "roots of unity", "maximize product", "point on circle", "chord products"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trapezoid-parallelogram-areas",
          name: "Quadrilateral Areas",
          latex: String.raw`A_{\text{trapezoid}} = \frac{(b_1+b_2)h}{2}, \quad A_{\text{rhomb/kite}} = \frac{d_1 d_2}{2}`,
          description: String.raw`These are the area formulas for trapezoids and for quadrilaterals with perpendicular diagonals: a trapezoid has the average of its two parallel sides times the distance between them, $\frac{(b_1 + b_2)h}{2}$, and a rhombus or kite has half the product of its diagonals, $\frac{d_1d_2}{2}$. The diagonal formula works for any quadrilateral whose diagonals are perpendicular, not only rhombi and kites. The parallelogram, with area base times height, has [[parallelogram-area|its own card]]. In a trapezoid the diagonals also cut out two similar triangles, in the ratio of the parallel sides, and that similarity is often the real key to a trapezoid problem.`,
          keywords: ["trapezoid", "rhombus", "kite", "diagonals", "perpendicular"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "parallelogram-area",
          name: "Parallelogram Area",
          latex: String.raw`A = bh \qquad A = ab\sin\theta`,
          description: String.raw`The area of a parallelogram is its base times its height, $bh$, where the height is the perpendicular distance between the two parallel sides used as bases, never the length of the slanted side. When two adjacent sides $a$ and $b$ meet at an angle $\theta$, the height over side $a$ is $b\sin\theta$, so the area is $ab\sin\theta$. Either of the two angles of the parallelogram can be used, since they are supplementary and have the same sine.`,
          keywords: ["parallelogram", "area of a parallelogram", "base times height", "ab sin theta", "sine area formula", "height of a parallelogram", "slanted side"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "parallelogram-vertices",
          name: "Parallelogram Vertices Using Vectors",
          latex: String.raw`A + C = B + D \iff D = A + C - B`,
          description: String.raw`In a parallelogram $ABCD$ the diagonals $AC$ and $BD$ bisect each other, so they have the same midpoint, and in vectors that is $A + C = B + D$. It turns finding a missing vertex into one subtraction, $D = A + C - B$, with coordinates $(x_A + x_C - x_B,\ y_A + y_C - y_B)$ in the plane and the same in space. Read the other way, four points with $A + C = B + D$ are the vertices of a parallelogram, which is flat only when they are collinear.`,
          keywords: ["parallelogram", "fourth vertex of a parallelogram", "missing vertex", "diagonals bisect each other", "vectors", "A + C = B + D", "coordinates of a parallelogram"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "trapezoid-special-segments",
          name: "The Four Mean Segments of a Trapezoid",
          latex: String.raw`\text{midsegment} = \frac{a+b}{2}, \quad \text{through diagonals} = \frac{2ab}{a+b}, \quad \text{similar split} = \sqrt{ab}, \quad \text{equal areas} = \sqrt{\tfrac{a^2+b^2}{2}}`,
          description: String.raw`The four mean segments of a trapezoid are the segments parallel to its bases $a$ and $b$ whose lengths are the four classical means of $a$ and $b$: the midsegment is the arithmetic mean $\frac{a + b}{2}$, the segment through the intersection of the diagonals is the harmonic mean $\frac{2ab}{a + b}$, the segment cutting it into two similar trapezoids is the geometric mean $\sqrt{ab}$, and the segment halving its area is the quadratic mean $\sqrt{\frac{a^2 + b^2}{2}}$. Recognizing which one a problem describes turns a similarity argument into a formula. They lie in the order HM $\le$ GM $\le$ AM $\le$ QM, from the short base toward the long one.`,
          keywords: ["trapezoid segment", "harmonic mean segment", "through diagonal intersection", "parallel to bases", "equal area segment"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "quadrilateral-diagonal-area",
          name: "Quadrilateral Area from Diagonals",
          latex: String.raw`A = \frac{1}{2} d_1 d_2 \sin\theta \;\le\; \frac{1}{2} d_1 d_2 \quad (\text{equality iff } d_1 \perp d_2)`,
          description: String.raw`The area of any quadrilateral is half the product of its diagonals times the sine of the angle between them, $A = \frac12d_1d_2\sin\theta$. It needs only the two diagonals and their angle, however irregular the sides, and it beats cutting the figure into pieces whenever those are known or easy to find. Since $\sin\theta \le 1$, the area is at most $\frac12d_1d_2$, with equality exactly when the diagonals are perpendicular, as in a rhombus or a kite.`,
          keywords: ["diagonals angle", "quadrilateral area", "sine", "area from diagonals", "half d1 d2 sine", "kite and rhombus area"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "diagonal-angle-from-sides",
          name: "Angle Between the Diagonals from the Sides",
          latex: String.raw`2d_1d_2\cos\theta = \left|a^2 + c^2 - b^2 - d^2\right|, \qquad \tan\theta = \frac{4K}{\left|a^2 + c^2 - b^2 - d^2\right|}`,
          description: String.raw`In a quadrilateral with sides $a$, $b$, $c$, $d$ in order and diagonals $d_1$, $d_2$ crossing at an angle $\theta$, the squares of one pair of opposite sides minus the squares of the other pair come to $2d_1d_2\cos\theta$, up to sign. Dividing it into the area $K = \frac12d_1d_2\sin\theta$ gives $\tan\theta$ from the four sides and the area alone, with neither diagonal found. The diagonals are perpendicular exactly when $a^2 + c^2 = b^2 + d^2$.`,
          keywords: ["angle between the diagonals", "diagonal angle from the sides", "a^2 + c^2 - b^2 - d^2", "squares of opposite sides", "perpendicular diagonals condition", "tangent of the angle between diagonals", "quadrilateral sides and area", "dot product of the diagonals"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "van-aubel",
          name: "Van Aubel's Theorem",
          latex: String.raw`\text{squares on the sides} \implies \text{opposite-center segments equal and } \perp`,
          description: String.raw`Erect a square outward on each side of any quadrilateral (even non-convex): the two segments connecting centers of opposite squares have equal length and are perpendicular. Proved neatly with complex numbers — each center is a $90^\circ$-rotation average of its side's endpoints. The triangle result with the same name, about the ratio along a cevian, is [[van-aubel-cevians|Van Aubel's Theorem for Cevians]].`,
          keywords: ["van aubel", "squares on sides", "equal perpendicular segments", "quadrilateral squares"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "bretschneiders-formula",
          name: "Bretschneider's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d) - abcd \cos^2\left(\frac{A+C}{2}\right)}`,
          description: String.raw`Area of any convex quadrilateral with sides $a, b, c, d$ and semiperimeter $s = \frac{a+b+c+d}2$, using one pair of opposite angles $A, C$. When cyclic, $A + C = 180^\circ$ kills the last term, recovering [[brahmaguptas-formula|Brahmagupta]].`,
          keywords: ["general quadrilateral area", "bretschneider", "brahmagupta generalization", "bretschneider formula"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-quadrilateral",
          name: "Euler's Quadrilateral Theorem",
          latex: String.raw`a^2 + b^2 + c^2 + d^2 = p^2 + q^2 + 4m^2 \qquad p^2 + q^2 = 2(a^2 + b^2) \ \text{(parallelogram)}`,
          description: String.raw`For any quadrilateral with sides $a, b, c, d$, diagonals $p, q$, and $m$ the distance between the midpoints of the diagonals, the sum of the squares of the sides is $p^2 + q^2 + 4m^2$. A parallelogram has $m = 0$, and then the identity is the parallelogram law, $p^2 + q^2 = 2(a^2 + b^2)$: the squares of the two diagonals add up to the squares of the four sides.`,
          keywords: ["parallelogram law", "diagonal midpoints", "generalization", "euler quadrilateral theorem", "diagonals and midpoint segment", "parallelogram law for quadrilaterals"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "varignons-theorem",
          name: "Varignon's Theorem",
          latex: String.raw`[\text{Varignon parallelogram}] = \frac{1}{2}[ABCD]`,
          description: String.raw`Connecting the midpoints of the sides of any quadrilateral yields a parallelogram whose area is half the original's, with sides parallel to the diagonals.`,
          keywords: ["varignon", "midpoints of a quadrilateral", "varignon parallelogram", "quadrilateral midpoint figure", "inner parallelogram", "half the area of the quadrilateral", "diagonals become sides", "works for a non-convex quadrilateral"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Triangle Areas & Radii",
      blurb: "Every way to find a triangle's area, and the inradius, circumradius, and exradii that come with it.",
      formulas: [
        {
          id: "triangle-area-standard",
          name: "Standard Triangle Area",
          latex: String.raw`A = \frac{1}{2} b h`,
          description: String.raw`The area $A$ of a triangle is half of its base $b$ times its height $h$, where the height is the distance from the third vertex to the line of the base, measured at a right angle. Any side can serve as the base, so choose the one whose height you know or can find. The formula also says that triangles with equal bases and equal heights have equal areas, however different they look, which is the idea behind most area-comparison arguments. In an obtuse triangle the height to a side next to the obtuse angle falls outside the triangle and is measured to the extended base.`,
          keywords: ["base", "height", "altitude", "area"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "trig-area",
          name: "Area of a Triangle Using Sine",
          latex: String.raw`A = \tfrac{1}{2} a b \sin C`,
          description: String.raw`The area $A$ of a triangle comes from two sides $a$ and $b$ and the angle $C$ between them: it is half their product times $\sin C$. It is the base-times-height formula with the height over side $a$ written as $b\sin C$, so two sides and the included angle are enough, with no height to find. The area is largest when $C = 90^\circ$, and it does not change when $C$ is replaced by its supplement, since $\sin C = \sin(180^\circ - C)$. That second fact makes it the engine behind area ratios for triangles that share an angle.`,
          keywords: ["sine", "included angle", "SAS", "area", "area of a triangle using sine", "area with sine", "half ab sin C", "two sides and the included angle", "area from two sides and the included angle"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "trig-area-circumradius",
          name: "Area from the Angles and the Circumradius",
          latex: String.raw`A = 2R^2 \sin A \sin B \sin C`,
          description: String.raw`This is the one area formula that needs no side length at all, only the three angles $A$, $B$, $C$ and the circumradius $R$. It comes from putting the [[law-of-sines|Law of Sines]], $a = 2R\sin A$ and $b = 2R\sin B$, into the [[trig-area|sine area formula]] $\frac12ab\sin C$. It suits a problem that hands you $R$ together with the angles, which is rare; its steadier role is as an identity that links the area, the circumradius, and the product of the sines.`,
          keywords: ["area from angles", "circumradius area", "2R^2 sin A sin B sin C", "all-angles area formula", "area without side lengths"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "max-rectangle-in-triangle",
          name: "Largest Rectangle in a Triangle",
          latex: String.raw`A_{\text{rectangle}}^{\max} = \tfrac{1}{2}\,[\triangle]`,
          description: String.raw`The largest rectangle inscribed in a triangle with one side on a chosen base has area exactly half the triangle's. Its top edge lies on the midline (half the height), so its width is half that base and its height half the altitude: $\frac{b}{2}\cdot\frac{h}{2}=\frac{bh}{4}=\frac12[\triangle]$. The one-half ratio is the same whichever side you build it on.`,
          keywords: ["inscribed rectangle", "largest rectangle in a triangle", "maximum area rectangle", "half the area", "rectangle in triangle", "midline rectangle", "optimization"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "herons-formula",
          name: "Heron's Formula",
          latex: String.raw`A = \sqrt{s(s-a)(s-b)(s-c)}`,
          description: String.raw`Heron's Formula gives the area $A$ of a triangle from its three side lengths $a$, $b$, $c$ alone, through the semiperimeter $s = \frac{a+b+c}{2}$ and the three differences $s - a$, $s - b$, $s - c$, which are the tangent lengths from the vertices to the incircle. No angle or height is needed. An expanded form, $16A^2 = 2a^2b^2 + 2b^2c^2 + 2c^2a^2 - a^4 - b^4 - c^4$, needs only the squares of the sides, which suits sides that are square roots.`,
          keywords: ["three sides", "semiperimeter", "SSS", "area", "heron expanded form", "area from sides without semiperimeter", "irrational side lengths", "16 A squared"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "inradius-area",
          name: "Inradius Formula",
          latex: String.raw`A = rs`,
          description: String.raw`The inradius $r$ of a triangle is the radius of its inscribed circle, the one circle inside the triangle tangent to all three sides, and the triangle's area is the inradius times the semiperimeter $s = \frac{a + b + c}{2}$ of the sides $a$, $b$, $c$. The same formula holds for any polygon that has an inscribed circle, with $s$ half its perimeter: the segments from the center to the vertices cut the polygon into triangles of height $r$, one on each side.`,
          keywords: ["inradius", "incircle", "semiperimeter", "inscribed circle", "circle tangent to all three sides", "area"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incenter-area-split",
          name: "Incenter Splits the Area by the Sides",
          latex: String.raw`[BIC] : [CIA] : [AIB] = a : b : c, \qquad [BIC] = \frac{a}{a+b+c}\,[ABC]`,
          description: String.raw`Join the incenter $I$ to the vertices and $\triangle ABC$ splits into three triangles $BIC$, $CIA$, $AIB$, each with its own side of $ABC$ as a base and the inradius $r$ as its height. So their areas are in the ratio of those sides, $a$, $b$, $c$, and each is its side's share of the perimeter times the whole area. Summing them recovers $[ABC] = rs$, and the same weights give the incenter's [[barycentric-coordinates|barycentric coordinates]] $(a : b : c)$.`,
          keywords: ["incenter area split", "join incenter to vertices", "three triangles proportional to sides", "areas a : b : c", "side fraction of perimeter", "area equals rs", "incenter barycentric a b c", "BIC CIA AIB"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "circumradius-area",
          name: "Circumradius Formula",
          latex: String.raw`A = \frac{abc}{4R}`,
          description: String.raw`The circumradius $R$ of a triangle is the radius of its circumscribed circle, the circle through all three vertices, and it ties the three sides $a$, $b$, $c$ to the area $A$: four times the area times $R$ is the product of the sides. Solved for $R$, it gives the circumradius from one area computation, and together with $A = rs$ for the inradius, one area computation gives both radii.`,
          keywords: ["circumradius", "circumcircle", "abc", "area"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "right-triangle-inradius",
          name: "Right Triangle Inradius and Circumradius",
          latex: String.raw`r = \frac{a + b - c}{2}, \qquad R = \frac{c}{2}, \qquad a + b = 2r + 2R`,
          description: String.raw`For a right triangle with legs $a, b$ and hypotenuse $c$, the inradius is $r = \frac{a + b - c}{2}$ and the circumradius is $R = \frac{c}{2}$, because by Thales the hypotenuse is a diameter of the circumcircle. Adding the two gives the memorable rearrangement $a + b = 2r + 2R$: in a right triangle the legs sum to twice the inradius plus twice the circumradius, which turns a question about $r$ and $R$ into one about the legs and back.`,
          keywords: ["right triangle", "inradius", "hypotenuse", "Thales", "circumradius", "a + b = 2r + 2R", "legs sum to 2r plus 2R"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incircle-tangent-lengths",
          name: "Incircle Tangent Lengths",
          latex: String.raw`AF = AE = s - a, \qquad BF = BD = s - b, \qquad CD = CE = s - c`,
          description: String.raw`The incircle of a triangle touches the sides at $D$ on $BC$, $E$ on $CA$, and $F$ on $AB$. The two tangent segments from each vertex are equal, and their common length is the semiperimeter minus the opposite side: $AE = AF = s - a$, $BD = BF = s - b$, and $CD = CE = s - c$. For the excircle opposite $A$, the tangent length from $A$ is $s$ itself.`,
          keywords: ["tangent lengths", "incircle touch points", "s minus a", "excircle", "semiperimeter"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "conway-circle",
          name: "The Conway Circle",
          latex: String.raw`\begin{gathered} \text{extend each side by the opposite side at both ends} \\ \implies 6 \text{ concyclic points} \end{gathered}, \quad \rho = \sqrt{r^2 + s^2}`,
          description: String.raw`At each vertex, extend both sides through it by the length of the side opposite that vertex. The six endpoints produced are concyclic, the center is the incenter $I$, and the radius $\rho$ comes from the inradius $r$ and the semiperimeter $s$. The construction looks arbitrary and the conclusion does not: each extension is arranged so that the tangent lengths from a vertex come out equal, which is what puts all six points the same distance from $I$.`,
          keywords: ["conway circle", "extend the sides by the opposite side", "six concyclic points", "centered at the incenter", "radius sqrt(r^2 + s^2)", "semiperimeter and inradius"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "incircle-excircle-touch",
          name: "Incircle & Excircle Touch Points",
          latex: String.raw`\text{on } BC:\ X_{\text{in}} = s - b \text{ from } B,\ \ X_{A} = s - c \text{ from } B,\ \ X_{\text{in}}X_{A} = |b - c|`,
          description: String.raw`With $s$ the semiperimeter, on side $BC$ the incircle touches at the point $X_{\text{in}}$, at distance $s - b$ from $B$ (so $s - c$ from $C$), while the $A$-excircle touches at $X_A$, at $s - c$ from $B$. The two contact points are therefore mirror images across the midpoint $M$ of $BC$, and the gap between them is $|b - c|$ — so $M$ is exactly the midpoint of the incircle and $A$-excircle touch points. A fast way to place both contact points, and the reason they coincide precisely when $b = c$.`,
          keywords: ["incircle excircle touch points", "symmetric about midpoint of BC", "distance b minus c apart", "contact point s - b", "excircle tangent point s - c", "midpoint of contact points", "touch point reflection"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "shared-angle-area-ratio",
          name: "Shared-Angle Area Ratio (Bird's Head Model)",
          latex: String.raw`\frac{[AXY]}{[ABC]} = \frac{AX \cdot AY}{AB \cdot AC} \qquad \text{whenever } \angle XAY = \angle BAC \;\text{ or }\; \angle XAY = 180^\circ - \angle BAC`,
          description: String.raw`Two triangles $AXY$ and $ABC$ that have an angle of the same size at $A$, or angles that add to $180^\circ$, have areas in the ratio of the products of the two sides around that angle. It works because each area is half the product of two sides times the sine of the angle between them, and the two sines are equal. That covers four figures: a small triangle cut off at a corner, a point on a side extended past the vertex (the bird's-head figure the model is named for), two triangles meeting at a crossing point, and equal angles anywhere at all.`,
          keywords: ["area ratio", "shared angle", "bird's head model", "birdhead model", "supplementary angle area ratio", "vertical angles area ratio", "equal angles area ratio", "product of fractions", "sub triangle", "two sides"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "squares-on-triangle-flanks",
          name: "Flank Triangles of the Squares on a Triangle",
          latex: String.raw`[\text{flank}] = [ABC] = K, \qquad \text{third side} = 2m_a = \sqrt{2b^2 + 2c^2 - a^2}, \qquad [\text{hexagon}] = a^2 + b^2 + c^2 + 4K`,
          description: String.raw`Erect a square outward on each side of a triangle $ABC$ of area $K$. The gap between the two squares at a vertex, say $A$, is a flank triangle whose sides are $b$ and $c$ with the angle $180^\circ - A$ between them, so its area is $\frac12bc\sin A = K$, the triangle's own. Its third side is twice the median $m_a$ of $ABC$ and is perpendicular to the line of that median. The six outer corners of the squares make a hexagon of area $a^2 + b^2 + c^2 + 4K$: the triangle, the three squares, and the three flanks.`,
          keywords: ["squares on the sides of a triangle", "flank triangle", "squares erected outward", "hexagon from three squares", "twice the median", "gap between the squares", "supplementary angle equal area", "outer vertices of squares"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "same-base-area-ratio",
          name: "Same-Base Area Ratio (Diagonal Split)",
          latex: String.raw`AC \cap BD = P \implies \frac{[ABD]}{[CBD]} = \frac{AP}{PC}`,
          description: String.raw`When two triangles share a base, their areas are in the ratio of their heights over that base. In a quadrilateral $ABCD$ whose diagonals cross at $P$, the triangles $ABD$ and $CBD$ share the base $BD$, and their heights are in the ratio $AP : PC$, so $\frac{[ABD]}{[CBD]} = \frac{AP}{PC}$. This turns a length ratio along one diagonal into an area ratio across the other, and back, which is the step behind the [[area-method|area method]] and many "in what ratio does this segment cut that one" questions.`,
          keywords: ["same base area ratio", "triangles common base", "diagonal splits area", "area ratio ap pc", "shared base", "ratio of heights", "diagonals intersection area", "diagonal split"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incircle-excircle-homothety",
          name: "Incircle to Excircle Homothety",
          latex: String.raw`\frac{r}{r_a} = \frac{s-a}{s}, \qquad A,\; D',\; E \ \text{collinear}`,
          description: String.raw`The dilation centered at $A$ that carries the incircle (radius $r$) to the $A$-excircle (radius $r_a$) has ratio $\frac{s}{s-a}$, with $s$ the semiperimeter and $a = BC$, since both circles sit in the same angle at $A$. Let the incircle touch $BC$ at $D$ and the $A$-excircle touch $BC$ at $E$. The dilation does not send $D$ to $E$: the tangent line $BC$ at $D$ goes to the parallel tangent of the excircle on the far side from $A$, so the point it sends to $E$ is $D'$, the point of the incircle diametrically opposite $D$, which is why $A$, $D'$, and $E$ are collinear.`,
          keywords: ["homothety", "incircle excircle", "Nagel", "touch point antipode", "collinear", "dilation at a vertex", "r over ra", "extouch"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "exradii",
          name: "Excircles & Exradii",
          latex: String.raw`r_a = \frac{K}{s - a} = s \tan\tfrac{A}{2}, \qquad \frac{1}{r} = \frac{1}{r_a} + \frac{1}{r_b} + \frac{1}{r_c}, \qquad r\, r_a r_b r_c = K^2, \qquad r_a = 4R\sin\tfrac A2\cos\tfrac B2\cos\tfrac C2`,
          description: String.raw`The excircle opposite $A$ touches side $a$ and the extensions of the other two sides; its radius $r_a$ satisfies $K = r_a(s-a)$, mirroring $K = rs$, where $K$ is the area, $s$ the semiperimeter, $r$ the inradius and $R$ the circumradius. The tangent length from $A$ to its excircle is exactly $s$. Also $r_a = s\tan\frac{A}{2}$ while $r = (s-a)\tan\frac{A}{2}$, and the three exradii sum to $r_a + r_b + r_c = 4R + r$. Dividing those two tangent expressions gives $\frac{r}{r_a} = \frac{s-a}{s}$, which is the ratio of the homothety at $A$ carrying the incircle to the $A$-excircle.`,
          keywords: ["excircle", "exradius", "exradius formula", "exradii", "s minus a", "escribed circle", "tangent length s", "ra", "r_a + r_b + r_c = 4R + r", "sum of exradii"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "triangle-half-angle-identities",
          name: "Triangle Half-Angle, R, r & s Identities",
          latex: String.raw`\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2 = \frac{r}{4R}, \qquad \cos\tfrac A2\cos\tfrac B2\cos\tfrac C2 = \frac{s}{4R}`,
          description: String.raw`These are the metric identities tying a triangle's angles $A$, $B$, $C$ to its inradius $r$, circumradius $R$, and semiperimeter $s$. The product of the three half-angle sines is a fixed fraction of $\frac rR$, and the product of the three half-angle cosines the same fraction of $\frac sR$; they are the workhorses, and the sums of the full angles' sines and cosines follow from them (those are on the card of identities for angles summing to $180^\circ$). The bridge from sides to angles is $\sin\frac A2 = \sqrt{\frac{(s-b)(s-c)}{bc}}$ and $\cos\frac A2 = \sqrt{\frac{s(s-a)}{bc}}$. Together they turn any "given $R$, $r$, $s$" configuration into algebra.`,
          keywords: ["half angle triangle", "sin half product r/4R", "cos half product s/4R", "r = 4R sin", "s = 4R cos", "sin A + sin B + sin C = s/R", "cos A + cos B + cos C = 1 + r/R", "area 2R^2 sin", "exradii sum 4R+r", "sin half angle sides", "inradius circumradius identities"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "triangle-sin2-sum-ratio",
          name: "Triangle Sine-Sum Ratio (2r/R)",
          latex: String.raw`\dfrac{\sin 2A+\sin 2B+\sin 2C}{\sin A+\sin B+\sin C} = \dfrac{2r}{R}`,
          description: String.raw`In any triangle with angles $A$, $B$, $C$, inradius $r$ and circumradius $R$, this ratio collapses to $\frac{2r}{R}$: the numerator is $\sin 2A+\sin 2B+\sin 2C = 4\sin A\sin B\sin C$ and the denominator is $\sin A+\sin B+\sin C = 4\cos\frac A2\cos\frac B2\cos\frac C2$, so the quotient equals $8\sin\frac A2\sin\frac B2\sin\frac C2 = 8\cdot\frac{r}{4R} = \frac{2r}{R}$.`,
          keywords: ["sin2A sum over sinA sum", "2r/R ratio", "double angle sine sum", "triangle sine sum ratio", "4 sin A sin B sin C"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "half-angle-tangent-identity",
          name: "Half-Angle Tangent Identity",
          latex: String.raw`\tan\tfrac A2\tan\tfrac B2 + \tan\tfrac B2\tan\tfrac C2 + \tan\tfrac C2\tan\tfrac A2 = 1, \qquad \tan\tfrac A2 = \frac{r}{s-a}`,
          description: String.raw`For any triangle with angles $A$, $B$, $C$, the products of the half-angle tangents taken two at a time add up to $1$. It follows from $\frac A2 + \frac B2 + \frac C2 = 90^\circ$: the tangent of $\frac{A+B}{2}$ is the cotangent of $\frac C2$, and clearing denominators gives the symmetric relation. Each half-angle tangent is the inradius $r$ over the tangent length $s - a$ from its vertex, where $s$ is the semiperimeter, so the identity is a clean way to eliminate angles in problems given in terms of $r$ and $s$.`,
          keywords: ["half angle tangent identity", "tan half products sum to 1", "sum of tan half angles", "triangle tangent identity", "tan(A/2)tan(B/2)"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Advanced Triangle Theorems",
      blurb: "The laws of sines and cosines, cevians and the ratios they cut, and the classic named triangle theorems.",
      formulas: [
        {
          id: "law-of-sines",
          name: "Extended Law of Sines",
          latex: String.raw`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R`,
          description: String.raw`In any triangle with sides $a$, $b$, $c$ opposite the angles $A$, $B$, $C$, each side divided by the sine of the angle opposite it gives the same number, and that number is $2R$, the diameter of the circumscribed circle. It converts between angles and sides whenever a side and its opposite angle are known, and two angles with one side determine the whole triangle. The $2R$ form ties the triangle to its circumcircle, so every chord of a circle has length $2R$ times the sine of any [[inscribed-angle-theorem|inscribed angle]] standing on it.`,
          keywords: ["law of sines", "circumradius", "opposite angle", "2R"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-of-cosines",
          name: "Law of Cosines",
          latex: String.raw`c^2 = a^2 + b^2 - 2ab \cos C, \qquad \cos C = \frac{a^2 + b^2 - c^2}{2ab}`,
          description: String.raw`In any triangle with sides $a$, $b$, $c$ and the angle $C$ opposite $c$, the square of $c$ is the sum of the squares of the other two sides, minus a correction $2ab\cos C$ that depends on the angle between them. It converts between sides and angles in both directions: the third side from two sides and the included angle, or any angle from all three sides, in the solved form. When $C = 90^\circ$ the correction is zero and it becomes the [[pythagorean-theorem|Pythagorean Theorem]]; an acute $C$ makes $c^2$ smaller than $a^2 + b^2$, an obtuse one larger.`,
          keywords: ["law of cosines", "SAS", "SSS", "angle from sides"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-cosines-60-120",
          name: "Law of Cosines at 60° and 120°",
          latex: String.raw`C = 60^\circ: \; c^2 = a^2 + b^2 - ab, \qquad C = 120^\circ: \; c^2 = a^2 + b^2 + ab`,
          description: String.raw`At $60^\circ$ and $120^\circ$ the Law of Cosines loses its awkward cosine: since $\cos 60^\circ = \frac12$ and $\cos 120^\circ = -\frac12$, the side $c$ opposite the angle satisfies $c^2 = a^2 + b^2 - ab$ or $c^2 = a^2 + b^2 + ab$. These two forms appear whenever a figure has an equilateral triangle, a regular hexagon, or three segments meeting at $120^\circ$. Triangles with such an angle and simple sides, like $3$-$5$-$7$ at $120^\circ$, are collected on the card of [[law-of-cosines-special-triangles|special triangles from the Law of Cosines]].`,
          keywords: ["60 degrees", "120 degrees", "3 5 7", "eisenstein triple"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-of-cosines-special-triangles",
          name: "Special Triangles from the Law of Cosines",
          latex: String.raw`120^\circ:\ (1, 2) \to \sqrt7,\ \ (3, 5) \to 7,\ \ (7, 8) \to 13 \qquad 60^\circ:\ (2, 3) \to \sqrt7,\ \ (3, 8) \to 7,\ \ (5, 8) \to 7 \qquad 135^\circ:\ (1, \sqrt2) \to \sqrt5 \qquad 150^\circ:\ (1, \sqrt3) \to \sqrt7`,
          description: String.raw`These are the triangles that the [[law-of-cosines|Law of Cosines]] turns into nice numbers: a $60^\circ$, $120^\circ$, $135^\circ$, or $150^\circ$ angle between two simple sides gives a simple third side, listed here as the two sides around the angle and the side opposite it. The ones worth recognizing on sight are $1$-$2$-$\sqrt7$ and $3$-$5$-$7$ with a $120^\circ$ angle, $2$-$3$-$\sqrt7$, $3$-$7$-$8$ and $5$-$7$-$8$ with a $60^\circ$ angle, and $7$-$8$-$13$ with $120^\circ$; in each, the special angle is opposite the $\sqrt7$, $7$, or $13$. Recognizing one saves the computation, and it usually means an equilateral triangle, a regular hexagon, or a $120^\circ$ configuration is hiding in the figure.`,
          keywords: ["special triangles", "law of cosines triangles", "120 degree triangle", "60 degree triangle", "eisenstein triples", "135 degree triangle", "150 degree triangle", "one two root seven triangle", "two root seven", "three five seven triangle", "seven eight 13 triangle", "five seven eight triangle", "three seven eight triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-theorem",
          name: "Angle Bisector Theorem",
          latex: String.raw`\frac{AB}{AC} = \frac{BD}{DC} \quad \text{(internal)}, \qquad \frac{AB}{AC} = \frac{BD'}{D'C} \quad \text{(external)}`,
          description: String.raw`The Angle Bisector Theorem says that the bisector of an angle of a triangle divides the opposite side in the ratio of the two sides that form the angle: if the bisector from $A$ meets $BC$ at $D$, then $\frac{BD}{DC} = \frac{AB}{AC}$. It turns the word "bisector" straight into a length ratio, so $BD = \frac{ac}{b + c}$ and $DC = \frac{ab}{b + c}$ in standard notation. The external bisector at $A$ meets line $BC$ at a point $D'$ outside the side and divides it externally in the same ratio.`,
          keywords: ["angle bisector", "ratio", "opposite side", "adjacent sides", "external angle bisector", "external bisector theorem", "divides externally", "external division"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-length",
          name: "Length of an Angle Bisector",
          latex: String.raw`d^2 = ab - mn \quad \text{(internal)}, \qquad d'^2 = m'n' - ab \quad \text{(external)}`,
          description: String.raw`The bisector of angle $C$ has length $d$, where $a, b$ are the two sides meeting at $C$ and $m, n$ are the segments it cuts the opposite side $AB$ into; equivalently $d = \tfrac{2ab\cos(C/2)}{a+b}$. The external bisector reverses the subtraction: with $m', n'$ the distances from its foot $D'$ to $A$ and $B$, $d'^2 = m'n' - ab$, or $d' = \tfrac{2ab\sin(C/2)}{|a-b|}$. That denominator is the catch — when $a = b$ the external bisector runs parallel to $AB$ and no such length exists.`,
          keywords: ["angle bisector length", "cevian", "segments", "length of an angle bisector", "angle bisector cevian length", "bisector length formula", "external bisector length", "external angle bisector"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "altitude-bisector-angle",
          name: "Altitude, Bisector & Circumdiameter",
          latex: String.raw`\angle(\text{altitude}, \text{bisector}) = \dfrac{|B - C|}{2}, \qquad \text{$A$-altitude and } AO \text{ are isogonal}`,
          description: String.raw`From a vertex, the altitude and the line to the circumcenter $O$ are reflections across the angle bisector — they are isogonal. So the $A$-bisector bisects the angle between the $A$-altitude and $AO$, and the angle between the altitude and the bisector is exactly $\dfrac{|B - C|}{2}$. It is also why the orthocenter and circumcenter are isogonal conjugates.`,
          keywords: ["altitude and bisector angle", "|B - C| / 2", "altitude circumdiameter isogonal", "altitude AO reflection over bisector", "angle between altitude and angle bisector", "O H isogonal conjugates"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "stewarts-theorem",
          name: "Stewart's Theorem",
          latex: String.raw`b^2 m + c^2 n = a(d^2 + mn)`,
          description: String.raw`Stewart's Theorem gives the length of a cevian, a segment from a vertex of a triangle to a point on the opposite side, in terms of the sides and where the cevian lands. Here the cevian from $A$ has length $d$ and divides $BC = a$ into $BD = m$ and $DC = n$, with $b = CA$ and $c = AB$; each side squared is weighted by the piece of $BC$ farther from it. The usual mnemonic reads it as "a man and his dad put a bomb in the sink," $man + dad = bmb + cnc$, with $m$ the piece next to $c$ and $n$ the piece next to $b$.`,
          keywords: ["cevian length", "stewart", "man dad bomb sink", "stewarts theorem", "cevian length formula", "a man and his dad put a bomb in the sink"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cevas-theorem",
          name: "Ceva's Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1`,
          description: String.raw`Ceva's Theorem says that cevians $AD$, $BE$, and $CF$ of triangle $ABC$, with $D$, $E$, $F$ on the sides $BC$, $CA$, $AB$, pass through one point exactly when the three ratios in which they cut the sides multiply to $1$, the ratios taken in order around the triangle. It is the test for three cevians being concurrent and, read the other way, gives the third ratio from the other two. The [[trig-ceva|trigonometric form]] uses the sines of the angles the cevians make at the vertices, and Menelaus' Theorem is its counterpart for a transversal.`,
          keywords: ["concurrent", "cevians", "product of ratios", "cevas theorem", "cevian concurrency", "trig form of ceva"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "menelaus-theorem",
          name: "Menelaus' Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1 \ \text{(unsigned)}, \qquad \frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = -1 \ \text{(directed)}`,
          description: String.raw`Menelaus' Theorem says that a line meeting the lines $BC$, $CA$, $AB$ of triangle $ABC$ at $D$, $E$, $F$ satisfies $\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$ with unsigned lengths, or $-1$ with directed ones, and the converse holds. It is the collinearity partner of [[cevas-theorem|Ceva's Theorem]], which has the same product for concurrent cevians.`,
          keywords: ["transversal", "collinear", "directed segments", "menelaus theorem", "transversal ratio product", "collinearity test"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME"]
        },
        {
          id: "apollonius-theorem",
          name: "Apollonius's Theorem",
          latex: String.raw`b^2 + c^2 = 2\left(m_a^2 + \left(\frac{a}{2}\right)^2\right), \qquad m_a^2 + m_b^2 + m_c^2 = \frac{3}{4}(a^2 + b^2 + c^2), \qquad m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}`,
          description: String.raw`Apollonius's Theorem gives the length of a median from the three sides: $m_a$ is the median from $A$ to the midpoint of side $a = BC$, and $b$, $c$ are the other two sides. It is [[stewarts-theorem|Stewart's Theorem]] for a cevian that lands at the midpoint, and it is the same identity as the parallelogram law, since [[median-doubling|doubling the median]] completes a parallelogram with sides $b$ and $c$ and diagonals $a$ and $2m_a$. Adding the three versions relates the sum of the squared medians to the sum of the squared sides.`,
          keywords: ["median length", "apollonius", "stewart special case", "apollonius theorem", "length of a median", "median length formula"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "median-triangle-area",
          name: "Triangle Area from Its Medians",
          latex: String.raw`[ABC] = \frac{4}{3}\,[\text{triangle with sides } m_a, m_b, m_c]`,
          description: String.raw`The three medians of any triangle are themselves the sides of a triangle, and the original triangle's area is $\frac43$ of that median triangle's area. The median triangle's area comes from [[herons-formula|Heron's Formula]].`,
          keywords: ["medians form triangle", "area from medians", "four thirds", "triangle formed by the medians", "area of the median triangle", "three quarters area"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "rouths-theorem",
          name: "Routh's Theorem",
          latex: String.raw`\frac{[\triangle]}{[ABC]} = \frac{(xyz-1)^2}{(xy+y+1)(yz+z+1)(zx+x+1)}`,
          description: String.raw`Routh's Theorem gives the area of the triangle formed by three cevians $AD$, $BE$, $CF$ of $\triangle ABC$ in terms of the ratios in which they cut the sides, $x = \frac{DC}{BD}$, $y = \frac{EA}{CE}$, $z = \frac{FB}{AF}$, all taken in the same direction around the triangle. For the cevians that cut each side in the ratio $2 : 1$ the inner triangle is $\frac17$ of $\triangle ABC$.`,
          keywords: ["cevian triangle", "one seventh", "area ratio", "routh"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "van-aubel-cevians",
          name: "Van Aubel's Theorem for Cevians",
          latex: String.raw`\frac{AP}{PD} = \frac{AF}{FB} + \frac{AE}{EC}`,
          description: String.raw`Three cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet at a point $P$ inside it, with $D$ on $BC$, $E$ on $CA$, and $F$ on $AB$. The theorem splits the cevian from $A$ by the ratios on the two sides through $A$: the ratio in which $P$ divides $AD$ is the sum of the ratios in which $F$ and $E$ divide $AB$ and $AC$, each measured from $A$. It is a different result from the [[van-aubel|Van Aubel's Theorem]] about squares on a quadrilateral, which shares the name. Read with [[cevas-theorem|Ceva's Theorem]], it gives every ratio along the three cevians from two of the side ratios.`,
          keywords: ["van aubel cevians", "van aubel triangle", "ratio along a cevian", "AP over PD", "sum of side ratios", "concurrent cevians ratio", "cevian division ratio", "point of concurrency splits the cevian"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "vivianis-theorem",
          name: "Viviani's Theorem",
          latex: String.raw`d_1 + d_2 + d_3 = h, \qquad a\,d_a + b\,d_b + c\,d_c = 2[ABC]`,
          description: String.raw`For any point $P$ inside an equilateral triangle the perpendicular distances $d_1$, $d_2$, $d_3$ to the three sides sum to the altitude $h$, by splitting into three triangles and comparing areas. Two extensions matter more than the statement itself. Counting a distance as negative when $P$ lies beyond that side makes the sum equal $h$ for every point of the plane, not just interior ones. And the same area decomposition on any triangle, with $d_a$ the distance from $P$ to side $a$ and so on, gives the weighted form in the box, of which Viviani is the case $a=b=c$.`,
          keywords: ["equilateral", "distances to sides", "constant sum", "altitude", "signed distances", "point outside the triangle", "weighted sum of distances", "viviani general triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "trig-ceva",
          name: "Trigonometric Ceva",
          latex: String.raw`\frac{\sin\angle BAD}{\sin\angle DAC} \cdot \frac{\sin\angle CBE}{\sin\angle EBA} \cdot \frac{\sin\angle ACF}{\sin\angle FCB} = 1`,
          description: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent exactly when the product of the sine ratios of the angles they cut at the three vertices equals $1$. It is the angle-based twin of [[cevas-theorem|Ceva's Theorem]], for figures that give angles rather than side ratios.`,
          keywords: ["trig ceva", "sine ratios", "concurrent cevians", "angle version"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "erdos-mordell",
          name: "Erdős–Mordell Inequality",
          latex: String.raw`PA + PB + PC \ge 2(d_a + d_b + d_c), \qquad \text{equality} \iff \triangle ABC \text{ equilateral and } P \text{ its center}`,
          description: String.raw`For any interior point $P$ of triangle $ABC$: the distances to the vertices total at least twice the perpendicular distances $d_a$, $d_b$, $d_c$ to the sides $BC$, $CA$, $AB$, with equality only for the center of an equilateral triangle. A sharp, memorable bound linking the two natural distance triples.`,
          keywords: ["erdos mordell", "interior point", "distance inequality", "vertices versus sides"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ratio-lemma",
          name: "The Ratio Lemma",
          latex: String.raw`\frac{BD}{DC} = \frac{AB}{AC} \cdot \frac{\sin \angle BAD}{\sin \angle DAC}`,
          description: String.raw`For any cevian $AD$ of triangle $ABC$, with $D$ on $BC$: the split of the opposite side is the side ratio times the sine ratio of the split angle. Bisector ($\sin$ ratio $= 1$) gives the [[angle-bisector-theorem|Angle Bisector Theorem]]; median ($BD = DC$) gives the sine relation for medians; applied to all three cevians it proves trig [[cevas-theorem|Ceva]].`,
          keywords: ["ratio lemma", "cevian split", "sine ratio", "generalized bisector", "generalized angle bisector"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "law-of-tangents",
          name: "Law of Tangents",
          latex: String.raw`\frac{a - b}{a + b} = \frac{\tan\frac{A-B}{2}}{\tan\frac{A+B}{2}}`,
          description: String.raw`Relates the sum and difference of two sides to the half-sum and half-difference of their opposite angles (note $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$). Derived from the Law of Sines plus sum-to-product. Occasionally the fastest route when a problem gives $a \pm b$ and angle information.`,
          keywords: ["law of tangents", "sum and difference of sides", "half angles", "tangent rule for triangles", "tangent half angle side rule"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "napoleons-theorem",
          name: "Napoleon's Theorem",
          latex: String.raw`\text{centers of equilateral triangles on the sides form an equilateral triangle}`,
          description: String.raw`Erect equilateral triangles outward (or all inward) on the sides of any triangle: their centers always form an equilateral triangle. The outer Napoleon triangle has area $\frac{\sqrt3}{24}(a^2+b^2+c^2) + \frac{[ABC]}{2}$; outer minus inner area equals $[ABC]$.`,
          keywords: ["napoleon", "equilateral centers", "erected triangles", "outer inner"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cotangent-rule",
          name: "The Cotangent Rule",
          latex: String.raw`\cot A = \frac{b^2 + c^2 - a^2}{4K}, \qquad \cot A + \cot B = \frac{c^2}{2K}`,
          description: String.raw`For a triangle with sides $a$, $b$, $c$ opposite $A$, $B$, $C$ and area $K$, one line from the [[law-of-cosines|Law of Cosines]] and the [[trig-area|sine area formula]] together: $\cos A = \frac{b^2+c^2-a^2}{2bc}$ divided by $\sin A = \frac{2K}{bc}$ leaves the $bc$ cancelled and $4K$ underneath. It is the standard way any cotangent of a triangle angle collapses to side lengths, and the corollary is the one that usually finishes the problem, since adding two of them cancels everything but the third side.`,
          keywords: ["cotangent rule", "cot A in terms of sides", "cot A = (b^2+c^2-a^2)/4K", "sum of two cotangents", "cotangent to side lengths", "trig to algebra in a triangle"],
          importance: "low",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "projection-formula",
          name: "Projection Formula",
          latex: String.raw`a = b\cos C + c\cos B, \qquad b = c\cos A + a\cos C, \qquad c = a\cos B + b\cos A`,
          description: String.raw`Each side is the sum of the projections of the other two onto it — drop the altitude from a vertex and read off the two pieces of the opposite side. Cheap and often overlooked, it sits right next to the Law of Cosines (adding the three, or eliminating cosines, recovers it) and instantly relates a side to the adjacent angles.`,
          keywords: ["projection formula", "a = b cos C + c cos B", "side as projections", "foot of altitude", "law of cosines neighbor"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "mollweides-formula",
          name: "Mollweide's Formula",
          latex: String.raw`\frac{a+b}{c} = \frac{\cos\frac{A-B}{2}}{\sin\frac{C}{2}}, \qquad \frac{a-b}{c} = \frac{\sin\frac{A-B}{2}}{\cos\frac{C}{2}}`,
          description: String.raw`A pair of triangle identities using all three sides and all three angles at once — which makes them the standard check on a solved triangle (an error in any part breaks the equation). Dividing the two recovers the [[law-of-tangents|Law of Tangents]]; they follow from the Law of Sines plus sum-to-product.`,
          keywords: ["mollweide formula", "check triangle solution", "a plus b over c", "law of tangents", "all sides and angles"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "morleys-theorem",
          name: "Morley's Trisector Theorem",
          latex: String.raw`\text{adjacent angle trisectors meet in an equilateral triangle}, \qquad \text{side} = 8R\sin\tfrac A3\sin\tfrac B3\sin\tfrac C3`,
          description: String.raw`Trisect all three angles of any triangle; the intersection points of adjacent trisectors always form an equilateral triangle, the Morley triangle, whose side the box gives in terms of the circumradius $R$. A famously surprising result (angle trisection rarely behaves), proved cleanly by working backward from an equilateral triangle with trigonometric angle-chasing. Beautiful, but essentially never a problem-solving tool.`,
          keywords: ["morley theorem", "angle trisectors", "morley triangle", "equilateral from trisectors", "surprising"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "perpendicularity-lemma",
          name: "Perpendicularity Lemma",
          latex: String.raw`AB \perp CD \iff AC^2 - AD^2 = BC^2 - BD^2, \qquad AC \perp BD \iff AB^2 + CD^2 = BC^2 + DA^2`,
          description: String.raw`Perpendicularity can be tested with lengths alone. For four points $A, B, C, D$ with $A \ne B$ and $C \ne D$, the lines $AB$ and $CD$ are perpendicular exactly when $AC^2 - AD^2 = BC^2 - BD^2$: the difference of the squared distances from $A$ to the two points $C$ and $D$ equals the same difference from $B$. Applied to a quadrilateral $ABCD$ it says the diagonals are perpendicular exactly when the squares of one pair of opposite sides add up to the squares of the other pair. It holds in the plane and in space, and it is the step that turns "these two lines are perpendicular" into an equation that can be added, subtracted, and chained.`,
          keywords: ["perpendicularity lemma", "perpendicular by lengths", "AC^2 - AD^2 = BC^2 - BD^2", "perpendicular diagonals", "sum of squares of opposite sides", "difference of squared distances", "orthodiagonal quadrilateral", "perpendicular lines test"],
          importance: "medium",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "weitzenbock-inequality",
          name: "Weitzenböck and Hadwiger–Finsler Inequalities",
          latex: String.raw`\begin{gathered} a^2 + b^2 + c^2 \ge 4\sqrt3\,K \\ a^2 + b^2 + c^2 \ge 4\sqrt3\,K + (a - b)^2 + (b - c)^2 + (c - a)^2 \end{gathered}`,
          description: String.raw`Weitzenböck's Inequality bounds the area $K$ of a triangle with sides $a$, $b$, $c$ by the squares of its sides, with equality only for an equilateral triangle. The Hadwiger–Finsler Inequality on the second line sharpens it by the squared differences of the sides, so the gap measures how far the triangle is from equilateral. Read the other way, among triangles with a fixed sum of squared sides the equilateral one has the largest area.`,
          keywords: ["weitzenbock inequality", "weitzenböck", "hadwiger finsler", "sum of squares of sides and area", "a^2+b^2+c^2 >= 4 sqrt 3 area", "largest area for a fixed sum of squares", "equilateral maximizes area"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "steiner-lehmus",
          name: "Steiner–Lehmus Theorem",
          latex: String.raw`t_b = t_c \implies b = c, \qquad b > c \iff t_b < t_c`,
          description: String.raw`In a triangle with sides $a$, $b$, $c$ opposite $A$, $B$, $C$, let $t_b$ and $t_c$ be the lengths of the internal angle bisectors from $B$ and $C$, each measured to the opposite side. A triangle with two equal internal bisectors is isosceles: the converse of the easy fact that an isosceles triangle has them, and famous for resisting a direct proof. The sharper form says the bisector drawn to the longer side is the shorter one. With the [[angle-bisector-length|bisector length formula]] both come from one factorization.`,
          keywords: ["steiner lehmus", "equal angle bisectors", "two equal bisectors isosceles", "compare angle bisector lengths", "larger angle shorter bisector"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Olympiad Triangle Lemmas",
      blurb: "The named lemmas olympiad solutions quote about a triangle: its incircle and excircles, the orthocenter and a median, isogonal lines, and perpendiculars to the sides.",
      formulas: [
        {
          id: "incenter-excenter-lemma",
          name: "Incenter–Excenter Lemma (Fact 5)",
          latex: String.raw`M = \text{arc midpoint of } BC \implies MB = MC = MI = MI_A, \qquad MB = 2R\sin\tfrac A2`,
          description: String.raw`The midpoint $M$ of arc $BC$ (not containing $A$) is equidistant from $B$, $C$, the incenter $I$, and the $A$-excenter $I_A$ — so $B, C, I, I_A$ lie on a circle centered at $M$, of radius $2R\sin\frac A2$ with $R$ the circumradius. Proof: angle chase shows $\angle MBI = \angle MIB = \frac{A+B}{2}$. Also $AI = \frac{r}{\sin(A/2)}$, with $r$ the inradius, and $A$, $I$, $M$ are collinear (the bisector passes through the arc midpoint).`,
          keywords: ["incenter excenter", "fact 5", "arc midpoint", "equidistant", "bisector through arc midpoint", "AI = r / sin(A/2)", "distance from incenter to vertex", "B C I I_A concyclic"],
          importance: "high",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "iran-lemma",
          name: "Iran Lemma",
          latex: String.raw`K = BI \cap EF \implies CK \perp BI, \qquad K \text{ lies on the midline parallel to } AB`,
          description: String.raw`Let the incircle of triangle $ABC$, with incenter $I$, touch $CA$ at $E$ and $AB$ at $F$, and let the angle bisector $BI$ meet the contact chord $EF$ at $K$. Then $K$ is also the foot of the perpendicular from $C$ to $BI$, and it lies on the midline of the triangle parallel to $AB$, the segment joining the midpoints of $CA$ and $CB$. So three lines meet at $K$ at once: the bisector, the contact chord, and the midline. In particular $\angle BKC = 90^\circ$, which gives $BK = BC\cos\frac B2$ and $CK = BC\sin\frac B2$. The lemma ties the incircle to the midpoints of the sides, which is why it turns up whenever a problem mixes the two.`,
          keywords: ["iran lemma", "angle bisector contact chord", "foot of perpendicular from C to BI", "incircle touch chord and bisector", "BI EF midline", "right angle at K", "incircle midline lemma", "incircle chord meets bisector"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "steiner-ratio-theorem",
          name: "Steiner's Ratio Theorem for Isogonal Cevians",
          latex: String.raw`\angle BAD = \angle EAC \implies \frac{BD}{DC} \cdot \frac{BE}{EC} = \frac{AB^2}{AC^2}`,
          description: String.raw`Two cevians $AD$ and $AE$ of triangle $ABC$, with $D$ and $E$ on side $BC$, are isogonal when each is the reflection of the other in the bisector of angle $A$, that is, when $\angle BAD = \angle EAC$. Steiner's theorem says that the two ratios in which they cut $BC$ multiply to the square of the ratio of the adjacent sides, $\frac{BD}{DC} \cdot \frac{BE}{EC} = \frac{AB^2}{AC^2}$, and the converse holds: two points of side $BC$ whose ratios multiply to $\frac{AB^2}{AC^2}$ are the feet of isogonal cevians. It is the [[ratio-lemma|Ratio Lemma]] applied to both cevians at once, where the sines cancel because the two cevians cut the angle at $A$ into the same two pieces in opposite order.`,
          keywords: ["steiner ratio theorem", "steiner theorem isogonal", "isogonal cevians", "product of ratios on the opposite side", "BD/DC times BE/EC", "square of the side ratio", "isogonal feet", "reflection in the angle bisector"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "isogonal-line-lemma",
          name: "Isogonal Line Lemma",
          latex: String.raw`\begin{gathered} \angle BAX = \angle YAC,\ \ P = BX \cap CY,\ \ Q = BY \cap CX \\ \implies \angle BAP = \angle QAC \end{gathered}`,
          description: String.raw`Let $X$ and $Y$ be points on two lines through vertex $A$ of triangle $ABC$ that are isogonal, mirror images in the bisector of angle $A$, so that $\angle BAX = \angle YAC$. Cross the lines from the other two vertices: $P$ is where $BX$ meets $CY$, and $Q$ is where $BY$ meets $CX$. Then $AP$ and $AQ$ are isogonal too, $\angle BAP = \angle QAC$. A pair of isogonal lines through $A$ therefore produces a second pair from any two points on them, and when $X$ and $Y$ are [[isogonal-conjugate|isogonal conjugates]] the new points $P$ and $Q$ are isogonal conjugates as well. The proof is a short computation with [[trig-ceva|Trigonometric Ceva]].`,
          keywords: ["isogonal line lemma", "isogonal lines lemma", "crossing lines from B and C", "BX meets CY", "pair of isogonal lines", "isogonal conjugate pairs", "reflection in the bisector", "equal angles at A"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "humpty-queue-points",
          name: "Humpty and Queue Points",
          latex: String.raw`HX \perp AM,\ \ X \in (BHC),\ \ MX \cdot MA = MB^2, \qquad Q = MH \cap (ABC),\ \ \angle AQH = 90^\circ`,
          description: String.raw`Two points that the orthocenter $H$ of triangle $ABC$ and the midpoint $M$ of $BC$ produce together. The $A$-Humpty point $X$ is the foot of the perpendicular from $H$ to the median $AM$; it lies on the circle through $B$, $H$, and $C$, satisfies $MX \cdot MA = MB^2$, and sees the two sides in the ratio $XB : XC = AB : AC$. The $A$-Queue point $Q$ is the second point where line $MH$ meets the circumcircle $(ABC)$, the first being the antipode of $A$; it satisfies $\angle AQH = 90^\circ$, so it lies on the circle with diameter $AH$. Both points turn a median and an orthocenter into a circle, which is what olympiad configurations with $H$ and $M$ need.`,
          keywords: ["humpty point", "queue point", "foot of perpendicular from H to the median", "circle BHC", "MX times MA equals MB squared", "line MH meets the circumcircle", "angle AQH right angle", "orthocenter and midpoint"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "dumpty-point",
          name: "The Dumpty Point",
          latex: String.raw`\begin{gathered} D = \text{midpoint of } AK,\ \ D \in (BOC) \\ \triangle DBA \sim \triangle DAC,\ \ DA^2 = DB \cdot DC \end{gathered}`,
          description: String.raw`The companion of the [[humpty-queue-points|Humpty point]], living on the symmedian instead of the median. The [[symmedian-lemoine|symmedian]] from $A$ of triangle $ABC$ meets the circumcircle again at $K$, and the $A$-Dumpty point $D$ is the midpoint of the chord $AK$; $O$ is the circumcenter. The point lies on the circle through $B$, $O$, and $C$, it is the center of the spiral similarity that carries $B$ to $A$ and $A$ to $C$, and the circles through $A$ and $B$ tangent to $AC$, and through $A$ and $C$ tangent to $AB$, both pass through it. Each of these descriptions turns the symmedian into a circle, which is how olympiad solutions use it.`,
          keywords: ["dumpty point", "midpoint of the symmedian chord", "symmedian chord", "circle BOC", "spiral similarity center B to A and A to C", "DA squared equals DB times DC", "humpty companion", "tangents at B and C"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "shooting-lemma",
          name: "Shooting Lemma",
          latex: String.raw`T,\ D,\ M \text{ collinear}, \qquad MD \cdot MT = MB^2 = MC^2`,
          description: String.raw`A circle $\omega$ inside a circle $\Gamma$ touches $\Gamma$ at $T$ and touches a chord $BC$ of $\Gamma$ at $D$. Let $M$ be the midpoint of the arc $BC$ on the other side of $BC$ from $\omega$, the arc that does not contain $T$. The lemma "shoots" a line from $T$ through $D$ and says it hits $\Gamma$ exactly at $M$; the power of $M$ with respect to $\omega$ then equals $MB^2$, the same for every circle tangent to $BC$ and to $\Gamma$ on that side. It is the step behind the [[sawayama-thebault|Sawayama–Thébault Theorem]] and many problems about circles inscribed in a circular segment.`,
          keywords: ["shooting lemma", "circle tangent to a chord and the circumcircle", "line TD through the arc midpoint", "MD times MT equals MB squared", "homothety at the tangency point", "circle in a circular segment", "arc midpoint power", "tangent circle and chord"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "carnots-perpendicularity-theorem",
          name: "Carnot's Perpendicularity Theorem",
          latex: String.raw`\begin{gathered} \text{perpendiculars at } D, E, F \text{ concur} \\ \iff BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2 = 0 \end{gathered}`,
          description: String.raw`Take one point on each side line of a triangle $ABC$: $D$ on $BC$, $E$ on $CA$, $F$ on $AB$, anywhere on the lines, inside the sides or beyond them. Draw the perpendicular to each side line at its point. The three perpendiculars pass through a single point if and only if $BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2 = 0$. The sum goes once around the triangle, and each term is the difference of the squares of the two pieces that a point cuts its side into. It turns "three lines meet" into one equation in lengths, which is why the perpendicular bisectors, the altitudes, and the perpendiculars at the incircle's touch points are all seen to concur at once. It is a different theorem from the one about distances from the circumcenter that shares the name.`,
          keywords: ["carnot perpendicularity", "concurrent perpendiculars", "perpendiculars to the sides concur", "alternating sum of squares", "BD^2 - DC^2 + CE^2 - EA^2 + AF^2 - FB^2", "perpendiculars from points on the sides", "carnot concurrency criterion", "perpendicular concurrency criterion"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Derived Triangles & Conjugates",
      blurb: "Triangles built from a given one (pedal, orthic, medial, contact, and excentral) and the conjugate points that pair its centers.",
      formulas: [
        {
          id: "pedal-triangle",
          name: "Pedal Triangle & Its Area",
          latex: String.raw`[\text{pedal of }P] = \frac{\lvert R^2 - OP^2\rvert}{4R^2}\,[ABC], \qquad OP = R \iff \text{feet collinear}`,
          description: String.raw`Drop perpendiculars from a point $P$ to the three sides of triangle $ABC$ and their feet form the pedal triangle of $P$. Its area depends only on the distance from $P$ to the circumcenter $O$, measured against the circumradius $R$, so it collapses to a line exactly when $OP = R$, that is, when $P$ is on the circumcircle: the degenerate pedal triangle is the [[simson-line|Simson line]]. The pedal triangle of the incenter is the [[contact-triangle|contact triangle]], and of the circumcenter is the [[medial-triangle|medial triangle]].`,
          keywords: ["pedal triangle", "feet of perpendiculars", "pedal area formula", "simson line degenerate", "R^2 minus OP^2", "contact triangle", "orthic triangle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "anticomplementary-triangle",
          name: "Anticomplementary Triangle",
          latex: String.raw`R' = 2R, \qquad [A'B'C'] = 4[ABC], \qquad O' = H, \qquad N' = O, \qquad H' = 2O - H`,
          description: String.raw`The triangle $A'B'C'$ that has $ABC$ for its [[medial-triangle|medial triangle]], obtained by the homothety at the centroid with ratio $-2$; primes mark its own circumradius $R'$ and centers $O'$, $N'$, $H'$, against $R$, $O$, $N$, $H$ (circumradius, circumcenter, nine-point center, orthocenter) of $ABC$. Sides are parallel to the original and twice as long, so the circumradius doubles and the area quadruples. The centers shuffle in a way worth knowing: the circumcenter of $A'B'C'$ is the orthocenter of $ABC$, its nine-point center is the circumcenter of $ABC$, and its orthocenter is the reflection of $H$ over $O$, the de Longchamps point.`,
          keywords: ["anticomplementary triangle", "antimedial triangle", "twice the size about the centroid", "homothety at the centroid ratio -2", "circumcenter is the orthocenter", "de longchamps point", "circumradius doubles"],
          importance: "high",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "orthic-triangle",
          name: "Orthic Triangle",
          latex: String.raw`\text{acute } \triangle ABC: \quad \text{sides } a\cos A,\, b\cos B,\, c\cos C, \qquad \text{perimeter} = \frac{2[ABC]}{R} = 4R\sin A\sin B\sin C, \qquad [\text{orthic}] = 2\cos A\cos B\cos C\,[ABC]`,
          description: String.raw`The triangle formed by the three altitude feet, equivalently the pedal triangle of the orthocenter $H$; $R$ is the circumradius of $ABC$. In an acute triangle its angles are $\pi-2A,\ \pi-2B,\ \pi-2C$, its sides are $a\cos A,\ b\cos B,\ c\cos C$, and $H$ is its incenter, so the altitudes of $ABC$ bisect its angles.`,
          keywords: ["orthic triangle", "feet of altitudes", "pedal of orthocenter", "fagnano problem", "minimum perimeter inscribed triangle", "nine point circle", "antiparallel sides", "H is incenter of orthic", "angles pi - 2A", "orthic perimeter", "a cos A + b cos B + c cos C", "2[ABC]/R", "4R sin A sin B sin C", "orthic area 2 cos A cos B cos C", "reflection of orthocenter on circumcircle"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "medial-triangle",
          name: "Medial Triangle",
          latex: String.raw`\triangle_{\text{med}} \sim \triangle ABC \ \big(\text{ratio } \tfrac12\big), \qquad [\triangle_{\text{med}}] = \tfrac14 [ABC], \qquad \text{perimeter} = s = \tfrac{a+b+c}{2}, \qquad R_{\text{med}} = \tfrac R2`,
          description: String.raw`Joining the side midpoints gives the medial triangle $\triangle_{\text{med}}$ (circumradius $R_{\text{med}}$, against $R$ for $ABC$): similar to $ABC$ with ratio $\frac12$ — quarter the area, half the perimeter ($= s$), sides parallel to $ABC$'s — splitting $ABC$ into four congruent triangles. The [[homothety-monge|homothety]] at the centroid $G$ with ratio $-\frac12$ maps $ABC$ onto it (they share $G$). Its circumcircle is the [[nine-point-circle|nine-point circle]] (so its circumcenter is the nine-point center $N$), its incircle is the Spieker circle, and its orthocenter is the circumcenter $O$ of $ABC$ — so the medial triangle's own Euler-line facts translate straight back into $ABC$'s centers.`,
          keywords: ["medial triangle", "midpoint triangle", "midpoints of sides", "similar ratio one half", "quarter area", "half perimeter", "four congruent triangles", "homothety centroid -1/2", "spieker circle", "spieker point", "nine point circle", "orthocenter is O"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "contact-triangle",
          name: "Contact (Intouch) Triangle",
          latex: String.raw`\text{tangent lengths } s-a,\, s-b,\, s-c, \qquad \text{angles } 90^\circ - \tfrac A2, \ 90^\circ - \tfrac B2, \ 90^\circ - \tfrac C2, \qquad [\text{contact}] = \frac{r}{2R}\,[ABC]`,
          description: String.raw`The contact (intouch) triangle has the three incircle touch points as vertices; $s$ is the semiperimeter, $r$ the inradius and $R$ the circumradius of $ABC$. The tangent length from each vertex of $ABC$ is $s-a$, $s-b$, or $s-c$, the triangle is inscribed in the incircle so its circumradius is $r$, its angles are $90^\circ - \frac A2$, $90^\circ - \frac B2$, $90^\circ - \frac C2$, and its area is $\frac{r}{2R}[ABC]$. The segments from each vertex of $ABC$ to the opposite touch point concur at the [[gergonne-nagel-points|Gergonne point]].`,
          keywords: ["contact triangle", "intouch triangle", "incircle touch points", "tangent lengths s minus a", "gergonne point", "extouch triangle", "nagel point", "inscribed in incircle", "contact triangle area", "angles pi/2 - A/2"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "excentral-triangle",
          name: "Excentral Triangle",
          latex: String.raw`I = \text{orthocenter of } I_AI_BI_C, \qquad \text{sides } 4R\cos\tfrac A2, \qquad R_{\text{ex}} = 2R`,
          description: String.raw`The excentral triangle $I_AI_BI_C$ has the three excenters as vertices, with circumradius $R_{\text{ex}}$; $R$ and $r$ are the circumradius and inradius of $ABC$. The incenter $I$ of $ABC$ is its orthocenter, and $ABC$ is exactly its [[orthic-triangle|orthic triangle]] (the altitude feet of $I_AI_BI_C$ are $A, B, C$). Its angles are $\frac{\pi}{2}-\frac A2$, its sides are $4R\cos\frac A2, 4R\cos\frac B2, 4R\cos\frac C2$, its circumradius is $2R$, and its area is $\frac{2R}{r}[ABC]$. Best of all, the [[nine-point-circle|nine-point circle]] of the excentral triangle is the circumcircle of $ABC$ — so $A, B, C$ and the arc midpoints all lie on it. Recognizing this collapses a tangle of incenter/excenter conditions into a single orthocentric configuration.`,
          keywords: ["excentral triangle", "three excenters", "incenter is orthocenter", "ABC is orthic triangle", "circumradius 2R", "excenter configuration", "arc midpoints", "excentral sides 4R cos", "excentral area 2R/r"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "isogonal-conjugate",
          name: "Isogonal Conjugate",
          latex: String.raw`\text{reflect } AP, BP, CP \text{ in the angle bisectors} \implies \text{they concur at } P^*, \qquad (x : y : z) \mapsto \left(\tfrac{a^2}{x} : \tfrac{b^2}{y} : \tfrac{c^2}{z}\right)`,
          description: String.raw`Reflect the cevians $AP$, $BP$, $CP$ across the angle bisectors at $A$, $B$, $C$: the three reflected lines always concur, at the isogonal conjugate $P^*$. The classic pairs are the circumcenter $O$ and the orthocenter $H$, the centroid $G$ and the [[lemoine-point|symmedian (Lemoine) point]] $K$, the incenter (its own conjugate), and the Fermat points and the isodynamic points. $P$ and $P^*$ share a pedal circle. In [[barycentric-coordinates|barycentric coordinates]] $(x : y : z)$, with sides $a$, $b$, $c$, the map is the one in the box.`,
          keywords: ["isogonal conjugate", "reflect cevian over bisector", "O and H conjugate", "symmedian point", "incenter self conjugate", "isodynamic", "common pedal circle"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "isotomic-conjugate",
          name: "Isotomic Conjugate",
          latex: String.raw`\begin{gathered} \text{reflect each cevian foot over the side's midpoint} \\ \implies \text{new cevians concur at } P^* \end{gathered}, \qquad (x : y : z) \mapsto \left(\tfrac1x : \tfrac1y : \tfrac1z\right)`,
          description: String.raw`The isotomic conjugate reflects each cevian's foot on a side over that side's midpoint: the three new cevians concur at $P^*$. The centroid is its own isotomic conjugate, and the Gergonne and [[gergonne-nagel-points|Nagel points]] form an isotomic pair. It pairs with isogonal conjugation to generate the standard identities among triangle centers, and in [[barycentric-coordinates|barycentric coordinates]] it is $(x : y : z) \mapsto (1/x : 1/y : 1/z)$.`,
          keywords: ["isotomic conjugate", "reflect foot over midpoint", "centroid self conjugate", "gergonne nagel pair", "barycentric reciprocal", "triangle center"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "cevian-nest",
          name: "Cevian Nest Theorem",
          latex: String.raw`AD,\ BE,\ CF \text{ concur},\ \ DX,\ EY,\ FZ \text{ concur} \implies AX,\ BY,\ CZ \text{ concur}`,
          description: String.raw`Take a triangle $ABC$ and the cevian triangle $DEF$ of a point $P$, so $D$, $E$, $F$ lie on $BC$, $CA$, $AB$ and $AD$, $BE$, $CF$ meet at $P$. Inside it take the cevian triangle $XYZ$ of a point $Q$ with respect to $DEF$, with $X$, $Y$, $Z$ on $EF$, $FD$, $DE$. In such a nest of three triangles, the outer one and the innermost one are in perspective. The proof is [[cevas-theorem|Ceva's Theorem]] twice, joined by one area ratio.`,
          keywords: ["cevian nest", "cevian nest theorem", "cevian triangle of a cevian triangle", "nested cevian triangles", "triangles in perspective", "ceva twice"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Triangle Centers & the Euler Line",
      blurb: "Where the centers of a triangle sit, how far apart they are, and the lines and circles that pass through them.",
      formulas: [
        {
          id: "euler-line-ratio",
          name: "The Euler Line",
          latex: String.raw`HG = 2\,GO, \qquad \vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}, \qquad OH^2 = 9R^2 - (a^2+b^2+c^2) = R^2\left(1 - 8\cos A\cos B\cos C\right)`,
          description: String.raw`The orthocenter $H$, centroid $G$, and circumcenter $O$ of any triangle lie on one line, the Euler line, with the centroid one third of the way from $O$ to $H$. With $O$ as the origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$. The squared distance $OH^2$ depends only on the circumradius $R$ and the sides $a$, $b$, $c$ (or the angles $A$, $B$, $C$).`,
          keywords: ["orthocenter", "centroid", "circumcenter", "collinear", "euler line", "HG : GO = 2 : 1", "HG = 2 GO", "nine-point center lies on euler line"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-line-parallel-side",
          name: "Euler Line Parallel to a Side",
          latex: String.raw`OH \parallel BC \iff \tan B \tan C = 3, \qquad OH \parallel BC \iff AH = 2\,HD \iff \cos A = 2\cos B\cos C`,
          description: String.raw`The [[euler-line-ratio|Euler line]] $OH$ runs parallel to $BC$ exactly when $O$ and $H$ stand at the same height above that side. One of those heights is free: the circumcenter's distance to $BC$ is always half of $AH$, so the condition forces $HD = \frac{1}{2}AH$, with $D$ the foot of the altitude from $A$, and the orthocenter cuts the $A$-altitude in the ratio $2 : 1$ from the vertex. In angles that is $\tan B \tan C = 3$. More generally $AH : HD = (\tan B \tan C - 1) : 1$, so the parallel case is simply the one where that ratio equals $2$.`,
          keywords: ["euler line parallel to a side", "OH parallel to BC", "euler line parallel to the base", "tan B tan C = 3", "orthocenter two thirds down the altitude", "cos A = 2 cos B cos C", "AH = 2 HD"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-distance-theorem",
          name: "Euler's Distance Formula",
          latex: String.raw`OI^2 = R(R - 2r), \qquad R \ge 2r \ \text{(equality iff equilateral)}`,
          description: String.raw`Distance between the circumcenter $O$ and the incenter $I$, in terms of the circumradius $R$ and the inradius $r$. Implies Euler's Inequality $R \ge 2r$ — the circumradius is always at least twice the inradius, with equality only for equilateral triangles.`,
          keywords: ["circumcenter incenter distance", "euler inequality", "R 2r", "circumcenter to incenter", "circumradius versus inradius", "ratio of circumradius to inradius"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "nine-point-circle",
          name: "The Nine-Point Circle",
          latex: String.raw`R_9 = \frac R2, \qquad N = \text{midpoint of } OH, \qquad \begin{gathered} \text{nine points: three midpoints, three feet,} \\ \text{three midpoints of } HA, HB, HC \end{gathered}`,
          description: String.raw`Passes through the 3 side midpoints, 3 feet of the altitudes, and 3 midpoints from the orthocenter $H$ to each vertex. Its center $N$ is the midpoint of segment $OH$ on the [[euler-line-ratio|Euler line]], with $O$ the circumcenter, and its radius $R_9$ is half the circumradius $R$.`,
          keywords: ["nine point", "midpoints", "altitude feet", "half circumradius", "euler line", "nine-point center = midpoint of OH", "radius R/2", "passes through midpoints of AH BH CH"],
          importance: "high",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "carnots-theorem",
          name: "Carnot's Theorem (Distances to the Sides)",
          latex: String.raw`d_1 + d_2 + d_3 = R + r, \qquad d_a = R\cos A`,
          description: String.raw`The signed perpendicular distances $d_1$, $d_2$, $d_3$ from the circumcenter to the three sides sum to $R + r$, the circumradius plus the inradius (a distance is negative if the circumcenter is on the far side of that side, i.e. in obtuse triangles); the distance to side $a = BC$ is $d_a$.`,
          keywords: ["circumcenter distances", "R plus r", "signed distances", "carnot theorem", "signed distances from circumcenter", "sum of distances to sides"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "simson-line",
          name: "The Simson Line",
          latex: String.raw`P \in \text{circumcircle} \iff \text{the three perpendicular feet are collinear}, \qquad \text{the Simson line bisects } PH`,
          description: String.raw`Drop perpendiculars from a point $P$ on the circumcircle of $\triangle ABC$ to the three (extended) sides: the three feet are always collinear, and the line bisects the segment from $P$ to the orthocenter $H$.`,
          keywords: ["circumcircle point", "perpendicular feet", "collinear", "simson"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "steiner-line",
          name: "The Steiner Line",
          latex: String.raw`\begin{gathered} P \in \odot(ABC) \implies \text{reflections of } P \text{ in the sides} \\ \text{are collinear, through } H \end{gathered}`,
          description: String.raw`Reflect a point $P$ of the circumcircle in each of the three sidelines and the three images land on one line, the Steiner line of $P$, which passes through the orthocenter $H$. It is the [[simson-line|Simson line]] of the same point blown up by a factor of $2$ from $P$, since a reflection is twice the foot of the perpendicular, so the two results are one result at two scales.`,
          keywords: ["steiner line", "reflections of a point on the circumcircle", "collinear reflections", "passes through the orthocenter", "twice the simson line", "point on the circumcircle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "brocard-angle",
          name: "The Brocard Angle",
          latex: String.raw`\cot \omega = \cot A + \cot B + \cot C`,
          description: String.raw`The angle $\omega$ at which cevians from each vertex to the Brocard point meet the sides. Also $\csc^2\omega = \csc^2 A + \csc^2 B + \csc^2 C$, and always $\omega \le 30^\circ$.`,
          keywords: ["brocard point", "cotangent sum", "special angle", "brocard angle", "cotangent of the brocard angle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "symmedian-lemoine",
          name: "Symmedians",
          latex: String.raw`\text{symmedian} = \text{median reflected over the bisector}, \qquad BE : EC = c^2 : b^2`,
          description: String.raw`The symmedian from $A$ is the median reflected over the angle bisector at $A$, and reflecting swaps the two adjacent sides, so the median's even split becomes $BE : EC = c^2 : b^2$, where the symmedian meets $BC$ at $E$ and $b = CA$, $c = AB$. Equivalently it is the locus of points whose distances to $AB$ and $AC$ are in ratio $c : b$, where the bisector is the locus of equal distances and the median the locus of ratio $b : c$. Test an unknown cevian by dropping perpendiculars from $B$ and $C$ onto it: equal means median, ratio $c^2 : b^2$ means symmedian.`,
          keywords: ["symmedian", "reflected median", "squares of sides", "isogonal to the median", "distances proportional to sides", "antiparallel", "perpendiculars to a cevian", "BE:EC = c^2:b^2"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "orthocenter-properties",
          name: "Orthocenter Reflections & Distances",
          latex: String.raw`AH = 2R\cos A, \qquad AH^2 + BC^2 = 4R^2, \qquad \vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}`,
          description: String.raw`The orthocenter $H$ of a triangle, where its altitudes meet, has two reflections that land on the circumcircle: its reflection over a side, and its reflection over the midpoint of a side, which is the point opposite the far vertex. From these come the standard distances, with $R$ the circumradius and $O$ the circumcenter: $AH = 2R\cos A$, twice the distance $R\cos A$ from $O$ to side $BC$. The first reflection also shows that the circle through $H$, $B$, and $C$ is the mirror image of the circumcircle, with the same radius.`,
          keywords: ["orthocenter", "reflection over side", "2R cos A", "antipode", "circumcircle image", "distance from circumcenter to side", "R cos A", "AH = 2R cos A", "reflection of H over midpoint is antipode"],
          importance: "high",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "fermat-point",
          name: "Fermat Point (Torricelli Point)",
          latex: String.raw`\min_X\,(XA + XB + XC) \text{ at } \angle AXB = \angle BXC = \angle CXA = 120^\circ, \qquad \text{valid when every angle of } \triangle ABC < 120^\circ`,
          description: String.raw`The point minimizing the total distance to the vertices sees every side at $120^\circ$; construct it by erecting equilateral triangles outward on the sides and connecting each new vertex to the opposite original vertex (the three lines concur there). If an angle is $\ge 120^\circ$, the minimizer is that vertex. The rotation trick computes the minimal sum: it equals the length of one straight segment after a $60^\circ$ rotation.`,
          keywords: ["fermat point", "torricelli", "minimize distance sum", "120 degrees", "equilateral construction"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "center-distance-formulas",
          name: "Distances Between Triangle Centers",
          latex: String.raw`OH^2 = 9R^2 - (a^2+b^2+c^2), \qquad OG^2 = R^2 - \tfrac{1}{9}(a^2+b^2+c^2), \qquad R^2 - OI^2 = 2Rr`,
          description: String.raw`The Euler-line distances between the circumcenter $O$, orthocenter $H$, centroid $G$ and incenter $I$, in terms of the sides $a$, $b$, $c$, the circumradius $R$ and the inradius $r$: $OH$ from the vector identity $\vec{OH} = \vec{OA}+\vec{OB}+\vec{OC}$, and $OG = \frac{OH}{3}$. The last is the power of the incenter with respect to the circumcircle (equivalent to Euler's $OI^2 = R(R-2r)$). Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$.`,
          keywords: ["OH distance", "OG distance", "euler line length", "power of incenter", "center distances", "OH^2 = 9R^2 - (a^2+b^2+c^2)", "OH^2 = R^2(1 - 8 cos A cos B cos C)", "OI^2 = R^2 - 2Rr", "OG in terms of side lengths", "distance orthocenter circumcenter"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "feuerbach-theorem",
          name: "Feuerbach's Theorem",
          latex: String.raw`NI = \frac{R}{2} - r, \qquad NI_A = \frac{R}{2} + r_A`,
          description: String.raw`The [[nine-point-circle|nine-point circle]] (center $N$, radius $\frac R2$ with $R$ the circumradius) is internally tangent to the incircle (center $I$, radius $r$) and externally tangent to all three excircles (the $A$-excircle has center $I_A$ and radius $r_A$): the distances between centers are exactly the radius differences and sums. The tangency point with the incircle (the Feuerbach point) is a named point of the triangle.`,
          keywords: ["feuerbach", "nine point tangent incircle", "R/2 minus r", "tangent excircles"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "leibniz-formula",
          name: "Leibniz Point-Mass Formula",
          latex: String.raw`PA^2 + PB^2 + PC^2 = 3\,PG^2 + \frac{a^2 + b^2 + c^2}{3}`,
          description: String.raw`For any point $P$ and centroid $G$: the sum of squared distances to the vertices splits into a point-dependent part ($3PG^2$) and a triangle constant ($\sum GA^2 = \frac{1}{3}\sum a^2$). Immediate corollary: the centroid minimizes $PA^2 + PB^2 + PC^2$.`,
          keywords: ["sum of squared distances", "centroid minimizes", "leibniz", "point mass", "GA^2 + GB^2 + GC^2 = (a^2+b^2+c^2)/3", "squared distances from centroid to vertices"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "triangle-center-angles",
          name: "Angles at the Triangle Centers",
          latex: String.raw`\angle BOC = 2A, \quad \angle BIC = 90^\circ + \tfrac{A}{2}, \quad \angle BI_AC = 90^\circ - \tfrac{A}{2}, \quad \angle BHC = 180^\circ - A`,
          description: String.raw`All four angles are subtended by the same side $BC$, seen from four different centers, and $A$ throughout means the triangle's angle at vertex $A$. The circumcenter $O$ sees the central angle, double the inscribed angle. The incenter $I$ sees $BC$ at more than a right angle, which comes from the two half-angle bisectors at $B$ and $C$. The $A$-excenter $I_A$, the center of the circle touching $BC$ and the extensions of the other two sides, sees it at the incenter's supplement. The orthocenter $H$ sees it at the supplement of $A$. The figures show $O$ and $I$ on the first panel and $H$ and $I_A$ on the second, since the excenter lies well outside the triangle.`,
          keywords: ["angle BIC", "angle BOC", "angle BHC", "angle B I_A C", "incenter angle", "excenter angle 90 - A/2", "circumcenter central angle", "orthocenter angle", "90 plus half A"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "orthocentric-system",
          name: "Orthocentric System",
          latex: String.raw`\{A,B,C,H\}:\ \text{each is the orthocenter of the other three}`,
          description: String.raw`A triangle together with its orthocenter, $\{A, B, C, H\}$, forms an orthocentric system: any one of the four points is the orthocenter of the triangle on the other three, so $H$ and the vertices play interchangeable roles. All four triangles $ABC$, $HBC$, $HCA$, $HAB$ share a single common [[nine-point-circle|nine-point circle]], and their four circumcircles are congruent: each has the circumradius $R$ of $ABC$, because $\odot(HBC)$ is exactly the reflection of $\odot(ABC)$ across $BC$. (Their four circumcenters form a second orthocentric system, congruent to the first.)`,
          keywords: ["orthocentric system", "orthocenter of the other three", "four points orthocentric", "shared nine-point circle", "congruent circumcircles radius R", "reflection of circumcircle over side", "H and vertices symmetric"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lemoine-point",
          name: "The Lemoine Point (Symmedian Point)",
          latex: String.raw`K = (a^2 : b^2 : c^2), \qquad d_a : d_b : d_c = a : b : c`,
          description: String.raw`The three [[symmedian-lemoine|symmedians]] concur at the Lemoine point $K$, the [[isogonal-conjugate|isogonal conjugate]] of the centroid. Its distances $d_a$, $d_b$, $d_c$ to the three sides are proportional to the side lengths $a, b, c$, and it is the unique point of the plane minimizing the sum of the squares of those distances. It is also the centroid of its own [[pedal-triangle|pedal triangle]], which is the cleanest route to that minimization.`,
          keywords: ["lemoine point", "symmedian point", "grebe point", "K point", "isogonal conjugate of the centroid", "minimize sum of squared distances to the sides", "pedal triangle centroid", "a^2 : b^2 : c^2", "concurrent symmedians"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "spieker-point",
          name: "The Spieker Point & Spieker Circle",
          latex: String.raw`S = (b+c : c+a : a+b), \qquad r_S = \tfrac{r}{2}, \qquad I,\; G,\; S,\; N \text{ collinear}`,
          description: String.raw`The Spieker point $S$ is the incenter of the [[medial-triangle|medial triangle]], and equivalently the centroid of the triangle's perimeter, meaning the balance point of three uniform rods along the sides. That is not the centroid of the triangle's area, which is $G$; the distinction is the usual confusion. Its circle, the Spieker circle, is the incircle of the medial triangle and has radius $r_S$, half the inradius $r$. It sits on the Nagel line through $I$, $G$, and the [[gergonne-nagel-points|Nagel point]] $N$, exactly at the midpoint of $IN$.`,
          keywords: ["spieker point", "spieker center", "spieker circle", "incenter of the medial triangle", "centroid of the perimeter", "nagel line", "midpoint of IN", "cleaver", "triangle center"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "perimeter-cleavers",
          name: "Splitting Lines (Cleavers)",
          latex: String.raw`MX \parallel CD, \qquad AX = \tfrac{a + b}{2} \;\; (a \le b)`,
          description: String.raw`A cleaver, or splitting line, of a triangle goes through the midpoint of a side and cuts the perimeter in half. The one through the midpoint $M$ of $AB$ ends at a point $X$ on the longer of the other two sides, at distance $\frac{a + b}2$ from the vertex it shares with $AB$ (here $a = BC$, $b = CA$), and it is parallel to the bisector $CD$ of the opposite angle $C$. The three cleavers bisect the angles of the [[medial-triangle|medial triangle]], so they meet at its incenter, the [[spieker-point|Spieker point]], and two of them cross at the same angle as the bisectors they are parallel to.`,
          keywords: ["cleaver", "splitting line", "line halving the perimeter", "perimeter bisector through a midpoint", "parallel to the angle bisector", "cleavers concur", "splitting lines meet at an angle"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "gergonne-nagel-points",
          name: "Gergonne & Nagel Points",
          latex: String.raw`\text{cevians to the incircle (or excircle) touch points concur}`,
          description: String.raw`Two more triangle centers from concurrent cevians. The Gergonne point is where the cevians to the incircle's touch points meet, by Ceva's Theorem. The Nagel point $N$ uses the points where the excircles touch the sides, the $A$-excircle touching $BC$ at $X'$ with $BX' = s-c$ and $CX' = s-b$ ($s$ the semiperimeter), and the cevians again concur; the Nagel point, centroid $G$, and incenter $I$ are collinear on the Nagel line with $NG = 2\,GI$.`,
          keywords: ["gergonne point", "nagel point", "incircle touch cevians", "excircle touch points", "nagel line", "triangle center concurrency"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Circles",
      blurb: "Arcs, chords, tangents, and inscribed angles, plus power of a point and the radical axis.",
      formulas: [
        {
          id: "circle-basics",
          name: "Circle Area, Circumference, Arcs & Sectors",
          latex: String.raw`C = 2\pi r, \quad A = \pi r^2, \quad \text{arc} = r\theta, \quad \text{sector} = \tfrac12 r^2\theta`,
          description: String.raw`A circle of radius $r$ has circumference $2\pi r$ and area $\pi r^2$, and a central angle $\theta$ cuts off the fraction $\frac{\theta}{2\pi}$ of both, which gives arc length $r\theta$ and sector area $\frac12r^2\theta$ with $\theta$ in radians. In degrees the same fraction is $\frac{\theta}{360^\circ}$. The ring between two circles of radii $R \gt r$, an annulus, has area $\pi(R^2 - r^2)$.`,
          keywords: ["circumference", "area of a circle", "sector", "arc length", "annulus", "radians"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "circular-segment",
          name: "Circular Segment & Lens Areas",
          latex: String.raw`A_{\text{segment}} = \frac{1}{2} r^2 (\theta - \sin\theta)`,
          description: String.raw`A circular segment is the region between a chord of a circle and the arc it cuts off, and its area is the sector minus the triangle: $\frac12r^2(\theta - \sin\theta)$, with $\theta$ the central angle in radians. The overlap of two circles, a lens, is two segments glued along their common chord, so the same formula handles it.`,
          keywords: ["segment area", "chord region", "lens", "overlap of circles", "sector minus triangle", "shaded region"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "power-of-a-point",
          name: "Power of a Point",
          latex: String.raw`\operatorname{pow}(P) = OP^2 - r^2 \quad\Longrightarrow\quad \overline{PA} \cdot \overline{PB} = \overline{PC} \cdot \overline{PD} = PT^2`,
          description: String.raw`The power of a point $P$ with respect to a circle with center $O$ and radius $r$ is the number $OP^2 - r^2$, and every line through $P$ that meets the circle at $X$ and $Y$ has $PX \cdot PY$ equal to it, taken with a minus sign when $P$ is inside. So the product does not depend on which line you draw: for lines meeting the circle at $A, B$ and at $C, D$, and a tangent touching it at $T$, the box's three products agree. The three familiar equal-product rules, for two chords, two secants, or a secant and a tangent, are one fact seen in three configurations. The power is negative inside the circle, zero on it, and positive outside, and the tangent length from an outside point is its square root.`,
          keywords: ["intersecting chords", "secant", "tangent", "PT squared", "power", "independent of the line", "OP squared minus r squared", "equal products"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "chord-length",
          name: "Length of a Chord",
          latex: String.raw`\text{chord} = 2R\sin\frac{\theta}{2} = 2\sqrt{R^2 - d^2}`,
          description: String.raw`A chord is a segment joining two points of a circle, and its length is fixed by the radius $R$ together with either the central angle $\theta$ it subtends or its distance $d$ from the center. Both forms come from the right triangle formed by the center, the chord's midpoint, and one endpoint. The diagonals of a regular $n$-gon inscribed in a circle of radius $R$ are chords too: the one joining vertices $k$ steps apart has length $2R\sin\frac{k\pi}{n}$.`,
          keywords: ["chord", "central angle", "distance from center", "regular polygon diagonal", "diagonal length ngon"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "equal-chords-arcs",
          name: "Equal Chords, Arcs & Distances",
          latex: String.raw`\text{equal chords} \iff \text{equal arcs} \iff \text{equidistant from the center}, \qquad \ell = 2\sqrt{R^2 - d^2}`,
          description: String.raw`In one circle of radius $R$ (or two congruent circles) these three conditions are all equivalent, where a chord of length $\ell$ lies at distance $d$ from the center: two chords have equal length, they cut off equal arcs, and they lie at equal distance from the center. Two workhorse consequences: the perpendicular from the center to a chord bisects both the chord and its arc, and of two unequal chords the longer one lies closer to the center — so the diameter, at distance $0$, is the longest chord. Read the first consequence backwards and it locates the center: the perpendicular bisector of any chord passes through it, which is why intersecting the perpendicular bisectors of two chords finds a circumcenter.`,
          keywords: ["equal chords", "equal arcs", "equidistant from center", "congruent chords", "chord distance from center", "perpendicular from center bisects chord", "longer chord closer to center", "diameter longest chord"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "inscribed-angle-theorem",
          name: "Inscribed Angle Theorem",
          latex: String.raw`\angle \text{inscribed} = \frac{1}{2} \angle \text{central} = \frac{1}{2}\,\text{arc}`,
          description: String.raw`An inscribed angle is an angle whose vertex lies on a circle and whose sides are chords, and the Inscribed Angle Theorem says it equals half the central angle on the same arc, that is, half the arc it cuts off. So all inscribed angles standing on one arc are equal, and an angle inscribed in a semicircle is a right angle, which is Thales' Theorem.`,
          keywords: ["inscribed angle", "intercepted arc", "semicircle", "same arc equal angles"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "thales-theorem",
          name: "Thales' Theorem",
          latex: String.raw`AB \text{ a diameter} \iff \angle ACB = 90^\circ \quad (C \ne A, B \text{ on the circle})`,
          description: String.raw`Thales' Theorem says that an angle inscribed in a semicircle is a right angle: if $AB$ is a diameter of a circle and $C$ is any other point on the circle, then $\angle ACB = 90^\circ$. The converse holds too: if $\angle ACB = 90^\circ$, then $C$ lies on the circle with diameter $AB$. The converse is the half that does the work on contests, because it turns a right angle into a circle, and with the circle come [[inscribed-angle-theorem|inscribed angles]], cyclic quadrilaterals, and [[power-of-a-point|power of a point]]. Read forwards, it also puts the circumcenter of a right triangle at the midpoint of its hypotenuse.`,
          keywords: ["thales", "thales theorem", "angle in a semicircle", "semicircle right angle", "diameter subtends a right angle", "right angle locus", "circle on a diameter"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "angle-chord-secant",
          name: "Angles from Chords, Secants, Tangents",
          latex: String.raw`\text{inside: } \tfrac12(\text{arc}_1 + \text{arc}_2), \qquad \text{outside: } \tfrac12(\text{far arc} - \text{near arc})`,
          description: String.raw`The angle between two lines that meet a circle is fixed by the arcs they cut off. Two chords crossing inside the circle make an angle equal to half the sum of the two intercepted arcs, and two secants, two tangents, or a secant and a tangent meeting outside make an angle equal to half the difference of the far and near arcs. A vertex on the circle gives half the single arc, the [[inscribed-angle-theorem|Inscribed Angle Theorem]].`,
          keywords: ["two chords", "two secants", "arc sum", "arc difference", "vertex outside"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "tangent-facts",
          name: "Tangent Line Facts",
          latex: String.raw`OT \perp \ell, \qquad PA = PB = \sqrt{OP^2 - r^2}`,
          description: String.raw`A tangent $\ell$ to a circle with center $O$ and radius $r$ is a line that touches it at exactly one point $T$, and at that point the tangent is perpendicular to the radius $OT$. The two tangent segments $PA$ and $PB$ drawn to the circle from a point $P$ outside it have equal length. The angle between a tangent and a chord at the touch point is half the arc it cuts off, just like an [[inscribed-angle-theorem|inscribed angle]].`,
          keywords: ["tangent perpendicular radius", "equal tangents", "tangent chord angle", "tangent to a circle", "radius perpendicular to tangent", "two equal tangents"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "tangent-chord-angle",
          name: "Tangent–Chord Angle (Alternate Segment)",
          latex: String.raw`\angle(\ell, TA) = \tfrac12\,\overset{\frown}{TA} = \angle TBA`,
          description: String.raw`The tangent–chord angle is the angle between the tangent $\ell$ to a circle at a point $T$ and a chord $TA$, and it equals half the arc $TA$ that it cuts off. So it equals every [[inscribed-angle-theorem|inscribed angle]] standing on that arc from the other side, such as $\angle TBA$ for $B$ on the far arc, which is why the result is also called the alternate segment theorem.`,
          keywords: ["tangent chord angle", "alternate segment theorem", "tangent to circumcircle", "inscribed angle", "intercepted arc", "tangent antiparallel to opposite side", "tangent at a vertex"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "two-tangents-angle",
          name: "Angle Between Two Tangents",
          latex: String.raw`\angle APB = 180^\circ - \angle AOB = \tfrac{1}{2}\left(\text{arc}_{\text{far}} - \text{arc}_{\text{near}}\right)`,
          description: String.raw`From an external point $P$ the two tangents to a circle with center $O$ touch it at $A, B$: the angle between them and the central angle $\angle AOB$ are supplementary. The tangent lengths are equal ($PA = PB$) and each radius meets its tangent at a right angle, so $PAOB$ is a right kite and $OP$ bisects $\angle APB$.`,
          keywords: ["two tangents", "external point", "angle between tangents", "supplementary central angle", "tangent kite", "circumscribed angle"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "butterfly-theorem",
          name: "The Butterfly Theorem",
          latex: String.raw`MX = MY`,
          description: String.raw`Let $M$ be the midpoint of chord $PQ$. Draw chords $AB$ and $CD$ through $M$; then $AD$ and $BC$ cut $PQ$ at points $X, Y$ equidistant from $M$.`,
          keywords: ["chord midpoint", "butterfly", "symmetric intersections", "butterfly theorem", "midpoint of a chord", "butterfly configuration circle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "archimedes-broken-chord",
          name: "Archimedes' Broken Chord Theorem",
          latex: String.raw`AB \lt BC \implies AB + BF = FC`,
          description: String.raw`Three points $A$, $B$, $C$ on a circle make a "broken chord", the path $A \to B \to C$, here with $AB \lt BC$. Let $M$ be the midpoint of the arc $AC$ that contains $B$, and $F$ the foot of the perpendicular from $M$ to the longer piece $BC$. Then $F$ cuts the broken chord in half: the path from $A$ through $B$ to $F$ is as long as $FC$. It turns a sum of two chords into a single segment, which is how it computes $BF = \frac{BC - AB}{2}$ and lengths from the arc midpoint.`,
          keywords: ["archimedes broken chord", "broken chord theorem", "foot from the arc midpoint", "bisects the broken chord", "AB plus BF equals FC", "midpoint of arc ABC", "perpendicular from arc midpoint to the longer chord", "two chords from one point"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "inversion-facts",
          name: "Properties of Inversion",
          latex: String.raw`OP \cdot OP^* = r^2, \qquad P^*Q^* = \frac{r^2 \cdot PQ}{OP \cdot OQ}`,
          description: String.raw`Inversion in the circle with center $O$ and radius $r$ sends each point $P \ne O$ to the point $P^*$ on ray $OP$ with $OP \cdot OP^* = r^2$. It swaps the inside and the outside of the circle, fixes the circle itself, and maps lines and circles to lines and circles: a line not through $O$ becomes a circle through $O$, and a circle not through $O$ becomes another such circle. Angles between curves are preserved, so tangent curves stay tangent.`,
          keywords: ["inversion", "inverse point", "circle of inversion", "inversion distance formula", "lines to circles", "OP times OP star"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "radical-axis",
          name: "Radical Axis & Radical Center",
          latex: String.raw`\{P : \operatorname{pow}(P, \omega_1) = \operatorname{pow}(P, \omega_2)\} = \text{a line} \perp O_1O_2`,
          description: String.raw`The radical axis of two circles $\omega_1$ and $\omega_2$, with centers $O_1$ and $O_2$, is the set of points with equal [[power-of-a-point|power]] with respect to both, and it is a straight line perpendicular to the line through their centers. Every point on it has equal tangent lengths to the two circles, and when the circles meet it is their common chord, found by subtracting the two circle equations without locating the intersection points. For three circles whose centers are not on one line, the three radical axes meet at one point, the radical center.`,
          keywords: ["radical axis", "radical center", "equal power", "subtract circle equations", "common chord", "perpendicular to line of centers", "equal tangent lengths", "concurrency"],
          importance: "medium",
          tier: "AMC",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "power-of-a-point-linearity",
          name: "Linearity of Power of a Point",
          latex: String.raw`f(P) = \operatorname{pow}(P, \omega_1) - \operatorname{pow}(P, \omega_2) = 2\,O_1O_2 \cdot d(P, \ell), \qquad f\big(tX + (1 - t)Y\big) = t\,f(X) + (1 - t)\,f(Y)`,
          description: String.raw`For two circles $\omega_1$ and $\omega_2$ with different centers $O_1$ and $O_2$, the difference $f(P)$ of the [[power-of-a-point|powers of a point]] $P$ with respect to them is a linear function of $P$, although each power on its own is quadratic. Its zero set is the [[radical-axis|radical axis]] $\ell$, and it is proportional to the signed distance $d(P, \ell)$, positive on the side of $O_2$, with the factor $2\,O_1O_2$. Being linear, $f$ takes the weighted average of its values at a weighted average of points, such as the point $tX + (1 - t)Y$ of the segment $XY$. That turns many statements about two circles into statements about one straight line.`,
          keywords: ["linearity of power of a point", "difference of powers is linear", "power difference", "linear function of the point", "distance to the radical axis", "weighted average of powers", "coaxal circles", "pencil of circles"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "common-chord-length",
          name: "Common Chord of Two Circles",
          latex: String.raw`\text{chord} = 2\sqrt{R^2 - d_1^{\,2}},\qquad d_1 = \frac{d^2 + R^2 - r^2}{2d}`,
          description: String.raw`Two circles of radii $R$ and $r$ whose centers are a distance $d$ apart (with $|R-r|\lt d\lt R+r$, so they cross) share a common chord that lies on the [[radical-axis|radical axis]], perpendicular to the line of centers. Its distance $d_1$ from the center of the $R$-circle comes from dropping a perpendicular to the chord and equating the two right-triangle expressions for the half-chord; the half-chord is then one leg of a right triangle with hypotenuse $R$. Measuring from the other center gives the same chord with $d_2 = d - d_1$.`,
          keywords: ["common chord", "two intersecting circles", "radical axis", "chord length", "circle intersection", "length of common chord"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "miquels-theorem",
          name: "Miquel's Theorem",
          latex: String.raw`\odot(AEF), \; \odot(BFD), \; \odot(CDE) \text{ meet at one point}`,
          description: String.raw`Pick any points $D, E, F$ on sides $BC$, $CA$, $AB$: the three circles each through a vertex and its two adjacent chosen points always share a common point — the Miquel point. Proved by one round of cyclic-quadrilateral angle chasing; the configuration underlies many "three circles" contest setups.`,
          keywords: ["miquel point", "three circles", "concurrent circles", "points on sides"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "apollonius-circle",
          name: "Apollonius Circle",
          latex: String.raw`\{\, P : PA / PB = k \,\} \text{ is a circle} \quad (k \ne 1), \qquad \text{diameter endpoints divide } AB \text{ internally and externally in ratio } k`,
          description: String.raw`The locus of points whose distances to two fixed points $A, B$ have a constant ratio $k \ne 1$ is a circle — the Apollonius circle. Its diameter runs between the two points that cut $AB$ in the ratio $k$: one inside the segment, one outside. (When $k = 1$ the locus degenerates to the perpendicular bisector.) Distinct from [[apollonius-theorem|Apollonius's Theorem]] (the median-length relation) despite the shared name. It's the standard model for "$PA = k\cdot PB$" constraints and the isogonal/symmedian circle configurations.`,
          keywords: ["apollonius circle", "locus constant ratio", "distance ratio", "PA/PB constant", "internal external division", "isodynamic"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "reims-theorem",
          name: "Reim's Theorem",
          latex: String.raw`\begin{gathered} A, P, C \text{ and } B, Q, D \text{ collinear},\ \ ABPQ \text{ cyclic} \\ \implies \bigl(CDPQ \text{ cyclic} \iff AB \parallel CD\bigr) \end{gathered}`,
          description: String.raw`Two circles meet at $P$ and $Q$. A line through $P$ meets them again at $A$ (first circle) and $C$ (second), and a line through $Q$ meets them again at $B$ and $D$. Then $AB \parallel CD$. Conversely, if $A, B, P, Q$ are concyclic and $CD \parallel AB$, then $C, D, P, Q$ are concyclic. It turns "these lines are parallel" into "these points are concyclic" and back in an angle chase, and works best with [[directed-angles|directed angles]].`,
          keywords: ["reim theorem", "reims theorem", "two circles parallel chords", "concyclic from parallel", "antiparallel", "angle chasing lemma"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "orthogonal-circles",
          name: "Orthogonal Circles",
          latex: String.raw`\omega_1 \perp \omega_2 \iff O_1O_2^2 = r_1^2 + r_2^2 \iff \operatorname{pow}(O_1, \omega_2) = r_1^2`,
          description: String.raw`Two circles $\omega_1$ and $\omega_2$, with centers $O_1$ and $O_2$ and radii $r_1$ and $r_2$, are orthogonal when they cross at right angles: at each crossing point the radius of one circle is tangent to the other. The test is a right triangle on the two radii and the line of centers, and it reads as a [[power-of-a-point|power of a point]] statement, where $\operatorname{pow}(O_1, \omega_2)$ is the power of the center $O_1$ with respect to $\omega_2$. The circles orthogonal to a circle are exactly the ones that [[inversion-facts|inversion]] in it maps to themselves, which is why they appear whenever an inversion is used.`,
          keywords: ["orthogonal circles", "circles meeting at right angles", "perpendicular circles", "d^2 = r1^2 + r2^2", "circle fixed by inversion", "circle through a point and its inverse", "tangent length equals radius"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Tangent Circles & Chains",
      blurb: "Circles touching circles: Descartes' theorem, the arbelos, circles in a corner, and common tangents.",
      formulas: [
        {
          id: "descartes-circle-theorem",
          name: "Descartes' Circle Theorem",
          latex: String.raw`(k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2)`,
          description: String.raw`Descartes' Circle Theorem relates the curvatures $k_1, \ldots, k_4$ of four mutually [[tangent-circles|tangent circles]], where a circle of radius $r$ has curvature $k = \frac1r$: the square of their sum is twice the sum of their squares. It finds the fourth circle from three in one line, where center distances would take a page, and solving the quadratic gives both circles that fit, the small one in the gap and the large one around. A circle that encloses the others gets negative curvature, and a straight line counts as a circle of curvature $0$.`,
          keywords: ["four tangent circles", "curvature", "kissing circles", "apollonian"],
          importance: "medium",
          tier: "AMC",
          level: ["AIME"]
        },
        {
          id: "arbelos",
          name: "The Arbelos",
          latex: String.raw`[\text{arbelos}] = \tfrac{\pi}{4}\,BD^2, \qquad BD = 2\sqrt{ab}, \qquad r_{\text{twin}} = \frac{ab}{a+b}`,
          description: String.raw`Put $B$ on a segment $AC$, and let $a$ and $b$ be the radii of the two small semicircles, on the diameters $AB = 2a$ and $BC = 2b$. Cut them out of the semicircle on $AC$, all on the same side. The leftover region's area is exactly that of the circle whose diameter is $BD$, where $D$ is the point of the big semicircle straight above $B$, and Archimedes' two circles squeezed against that perpendicular, one in each lobe, turn out to have the same radius $\frac{ab}{a+b}$.`,
          keywords: ["arbelos", "shoemaker's knife", "Archimedes twin circles", "semicircles", "three semicircles", "twin circles equal radii"],
          importance: "lowest",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "corner-circle-chain",
          name: "Circles Inscribed in a Corner",
          latex: String.raw`r_k = d_k\sin\theta, \qquad \frac{r_{k+1}}{r_k} = \frac{1+\sin\theta}{1-\sin\theta}, \qquad \frac{1}{\sqrt{r_3}} = \frac{1}{\sqrt{r_1}} + \frac{1}{\sqrt{r_2}}`,
          description: String.raw`A circle tangent to both sides of an angle has its center on the bisector, at distance $d = r/\sin\theta$ from the vertex, where $2\theta$ is the angle; the $k$-th circle of a chain has radius $r_k$ and center distance $d_k$. Chaining tangent circles into the corner therefore multiplies the radius by a fixed factor each step, so the radii form a geometric progression. The last relation is the flat case: three mutually tangent circles all touching one line, with $r_3$ the small one in the gap between the circles of radii $r_1$ and $r_2$.`,
          keywords: ["inscribed in an angle", "tangent to two lines", "sangaku", "chain of tangent circles", "geometric progression of radii", "corner circles", "circles in a wedge"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "sawayama-thebault",
          name: "The Sawayama–Thébault Lemma",
          latex: String.raw`\omega \text{ tangent to } AD,\ BC,\ \odot(ABC) \implies I \in \text{chord of contact of } \omega`,
          description: String.raw`Take any cevian $AD$ of a triangle, and a circle $\omega$ inscribed in one of the two curved regions cut off by $AD$, $BC$, and the circumcircle. The line joining its two tangency points with $AD$ and $BC$ passes through the incenter $I$ — whatever the cevian was. It is the reason a configuration with a circle wedged into a cevian is usually an incenter problem in disguise, and it specializes to the mixtilinear case when the cevian is a side.`,
          keywords: ["sawayama lemma", "thebault theorem", "curvilinear incircle", "circle wedged against a cevian", "chord of contact through the incenter", "circle inscribed between a cevian and the circumcircle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "monges-theorem",
          name: "Monge's Theorem",
          latex: String.raw`E_{12},\ E_{23},\ E_{13}\ \text{(external centers of similitude) are collinear}`,
          description: String.raw`Monge's Theorem says that for three circles of different radii, the three external centers of similitude, $E_{12}$, $E_{23}$, $E_{13}$, one for each pair of circles, lie on a line. The external center of two circles is the point where their common external tangents meet, from which one circle is a scaled copy of the other. The same holds for one external center and two internal ones.`,
          keywords: ["monge", "centers of similitude", "external tangents meet", "three circles collinear", "homothety centers"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "caseys-theorem",
          name: "Casey's Theorem",
          latex: String.raw`t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}`,
          description: String.raw`Generalized [[ptolemys-theorem|Ptolemy]]: for four circles tangent to a fifth circle (all internally or all externally), where $t_{ij}$ is the external tangent length between circles $i, j$. Points count as radius-0 circles.`,
          keywords: ["generalized ptolemy", "tangent circles", "tangent lengths", "casey theorem", "tangent lengths between circles"],
          importance: "lower",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "tangent-circles",
          name: "Tangent Circles & the Line of Centers",
          latex: String.raw`d = R + r \ \text{(external)}, \qquad d = |R - r| \ \text{(internal)}`,
          description: String.raw`Two circles are tangent when they touch at exactly one point, and that point always lies on the line through their centers, so the distance $d$ between the centers is fixed by the radii $R$ and $r$ alone, as the box shows for touching from outside and from inside. The same quantity classifies every other position: $d \gt R + r$ separate, $|R - r| \lt d \lt R + r$ crossing, $d \lt |R - r|$ nested. All of it carries over to spheres.`,
          keywords: ["tangent circles", "externally tangent", "internally tangent", "distance between centers", "line of centers", "circle packing", "touching circles", "tangency point collinear", "two circles tangent"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "mixtilinear-incircle",
          name: "Mixtilinear Incircle",
          latex: String.raw`AE = AF = \frac{bc}{s}, \qquad I = \text{midpoint of } EF, \qquad T,\, I,\, M_A \text{ collinear}`,
          description: String.raw`The $A$-mixtilinear incircle touches $AB$ at $E$, $AC$ at $F$, and the circumcircle internally at $T$. The incenter $I$ is the midpoint of $EF$, the points $T$, $I$, and the midpoint $M_A$ of arc $BAC$ are collinear, and the tangent length $AE = AF$ comes from the sides $b = CA$, $c = AB$ and the semiperimeter $s$. The [[homothety-monge|homothety]] at $T$ carries the mixtilinear incircle to the circumcircle, which is where the collinearities come from. A recurring configuration in olympiad geometry.`,
          keywords: ["mixtilinear incircle", "tangent to two sides and circumcircle", "tangency point collinear incenter", "arc midpoint", "olympiad configuration", "homothety incircle circumcircle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "common-tangent-lengths",
          name: "Common Tangents Between Two Circles",
          latex: String.raw`t_{\text{ext}} = \sqrt{d^2 - (r_1 - r_2)^2}, \qquad t_{\text{int}} = \sqrt{d^2 - (r_1 + r_2)^2}, \qquad t = 2\sqrt{r_1 r_2} \;\;(\text{tangent circles})`,
          description: String.raw`A common tangent of two circles is a line tangent to both, and the length of its segment between the points of contact comes from one right triangle: $t = \sqrt{d^2 - (r_1 - r_2)^2}$ for an external tangent, which keeps both circles on one side, and $t = \sqrt{d^2 - (r_1 + r_2)^2}$ for an internal tangent, which passes between them. Here $d$ is the distance between the centers and $r_1$, $r_2$ are the radii. When the two circles touch, the external tangent segment is $2\sqrt{r_1r_2}$, the fact behind every chain of [[tangent-circles|tangent circles]].`,
          keywords: ["external tangent", "internal tangent", "two circles", "distance between centers", "2 sqrt r1 r2", "tangent circle chain"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Cyclic & Tangential Quadrilaterals",
      blurb: "When four points lie on a circle, how to prove it, and what follows, from Ptolemy to Brahmagupta to Pitot.",
      formulas: [
        {
          id: "cyclic-opposite-angles",
          name: "Cyclic Quadrilateral Opposite Angles",
          latex: String.raw`A + C = 180^\circ, \qquad B + D = 180^\circ`,
          description: String.raw`A cyclic quadrilateral is one whose four vertices lie on a circle, and a quadrilateral is cyclic exactly when its opposite angles are supplementary, $\angle A + \angle C = \angle B + \angle D = 180^\circ$. Equivalently, an exterior angle equals the interior angle at the opposite vertex.`,
          keywords: ["cyclic", "supplementary", "inscribed quadrilateral", "test", "exterior angle equals opposite interior angle", "exterior angle of a cyclic quadrilateral", "produced side"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cyclic-equal-angles",
          name: "Equal Angles in a Cyclic Quadrilateral",
          latex: String.raw`\angle BAC = \angle BDC, \quad \angle ABD = \angle ACD, \quad PA \cdot PC = PB \cdot PD \;\; (P = AC \cap BD)`,
          description: String.raw`In a cyclic quadrilateral $ABCD$ the two diagonals split the four corner angles into eight, and they fall into four equal pairs, because each side is seen at the same angle from the two vertices not on it: $\angle BAC = \angle BDC$, $\angle CAD = \angle CBD$, $\angle ABD = \angle ACD$, and $\angle ADB = \angle ACB$. The pattern also runs backwards: one equal pair, with both angles on the same side of the common segment, proves the four points lie on a circle.`,
          keywords: ["equal angles cyclic quadrilateral", "angles in the same segment", "angles on the same arc", "angles subtending the same chord", "cyclic quadrilateral diagonals angles", "bowtie angles", "cyclic quadrilateral similar triangles", "equal angles prove concyclic", "cyclic quadrilateral angle chase", "inscribed angles same chord"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "concyclicity-tests",
          name: "Tests for a Cyclic Quadrilateral",
          latex: String.raw`A + C = 180^\circ \qquad \iff\; \angle ACB = \angle ADB \qquad \iff\; PA \cdot PC = PB \cdot PD \qquad \iff\; AC \cdot BD = AB \cdot CD + BC \cdot AD`,
          description: String.raw`Four ways to prove four points lie on one circle, all equivalences rather than one-way implications, and all written here for $ABCD$ taken in order around the circle. Supplementary opposite angles is the usual one. Equal angles subtending the same segment works when no quadrilateral is drawn — but only for vertices on the same side of that segment; from opposite sides the angles come out supplementary instead, which is the same statement wearing a disguise. With $P$ the point where the diagonals cross, the [[power-of-a-point|power of a point]] converse turns the whole thing into one length equation; the same test works from an external point, where two secants give $PA \cdot PB = PC \cdot PD$. [[ptolemys-inequality|Ptolemy]] is the metric test: $AC \cdot BD \le AB \cdot CD + BC \cdot AD$ always, with equality exactly when the four points are concyclic in that order. A fifth, for a point against a triangle: $P$ lies on the circumcircle of $ABC$ precisely when the feet of the perpendiculars from $P$ to the three sides are collinear.`,
          keywords: ["prove four points are concyclic", "concyclicity test", "cyclic quadrilateral test", "show points lie on a circle", "power of a point converse", "ptolemy equality test", "simson line test", "same segment equal angles", "opposite angles supplementary", "is it cyclic"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "ptolemys-theorem",
          name: "Ptolemy's Theorem",
          latex: String.raw`ac + bd = pq`,
          description: String.raw`Ptolemy's Theorem says that in a cyclic quadrilateral, one whose four vertices lie on a circle, the product of the diagonals equals the sum of the products of the two pairs of opposite sides: with sides $a$, $b$, $c$, $d$ in order and diagonals $p$ and $q$, $pq = ac + bd$. It relates all six distances among four points on a circle without any angles, and for four points not on a circle the product $pq$ is less than $ac + bd$, which is [[ptolemys-inequality|Ptolemy's Inequality]].`,
          keywords: ["ptolemy", "cyclic quadrilateral", "diagonals", "opposite sides"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "ptolemy-second-theorem",
          name: "Ptolemy's Second Theorem",
          latex: String.raw`\frac{p}{q} = \frac{ad + bc}{ab + cd}, \qquad p^2 = \frac{(ac + bd)(ad + bc)}{ab + cd}, \qquad q^2 = \frac{(ac + bd)(ab + cd)}{ad + bc}`,
          description: String.raw`For a cyclic quadrilateral $ABCD$ with sides $a = AB$, $b = BC$, $c = CD$, $d = DA$ in order and diagonals $p = AC$, $q = BD$: where [[ptolemys-theorem|Ptolemy's Theorem]] gives the product $pq = ac + bd$, this gives the ratio $p / q$, so the two together determine each diagonal separately from the four sides alone, with no angles. In the ratio, the numerator belongs to $AC$ and collects the products of the two sides meeting at $A$ and of the two sides meeting at $C$, the endpoints of $AC$; the denominator does the same at $B$ and $D$, the endpoints of $BD$. That is the pattern to remember rather than the letters.`,
          keywords: ["ptolemy second theorem", "ratio of the diagonals", "diagonal ratio cyclic quadrilateral", "both diagonals from the sides", "cyclic quadrilateral diagonals", "diagonal from sides", "second ptolemy", "explicit diagonals cyclic quadrilateral"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "japanese-theorem",
          name: "The Japanese Theorem",
          latex: String.raw`\begin{gathered} ABCD \text{ cyclic} \implies \text{incenters of } ABC, BCD, CDA, DAB \\ \text{form a rectangle} \end{gathered}`,
          description: String.raw`Cut a cyclic quadrilateral by a diagonal, take the incenters of the two triangles, then do it again with the other diagonal: the four incenters are the vertices of a rectangle. Nothing about the quadrilateral beyond being cyclic is needed — the sides may be wildly unequal and the rectangle still appears, which is what makes it memorable. The sides of that rectangle are parallel to the angle bisectors of the two diagonals.`,
          keywords: ["japanese theorem", "incenters form a rectangle", "cyclic quadrilateral incenters", "four triangles from the diagonals", "rectangle of incenters"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "brahmaguptas-formula",
          name: "Brahmagupta's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d)}`,
          description: String.raw`Area $A$ of a cyclic quadrilateral with sides $a$, $b$, $c$, $d$ and semiperimeter $s$. [[herons-formula|Heron's Formula]] is the degenerate case $d = 0$. The circumradius that goes with it, from the same four sides and this area, is on [[cyclic-quad-radius|the circumradius card]].`,
          keywords: ["cyclic quadrilateral area", "semiperimeter", "brahmagupta", "brahmagupta formula", "area from four sides"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "poncelet-closure",
          name: "Bicentric Polygons & Poncelet Closure",
          latex: String.raw`\text{triangle: } d^2 = R^2 - 2Rr, \qquad \text{quadrilateral: } \frac{1}{(R-d)^2} + \frac{1}{(R+d)^2} = \frac{1}{r^2}`,
          description: String.raw`A polygon inscribed in one circle and circumscribed about another is bicentric, and that is a strong condition on the two circles alone: with $R$ and $r$ the radii of the outer and inner circles and $d$ the distance between their centers, a triangle forces Euler's relation and a quadrilateral forces Fuss's. Poncelet's closure theorem is the striking part — if even one such $n$-gon exists for a given pair of circles, then every point of the outer circle is a vertex of one, so the polygon can be rotated continuously and will still close up.`,
          keywords: ["bicentric polygon", "poncelet closure", "poncelet porism", "chapple theorem", "fuss theorem", "inscribed and circumscribed circles", "closes for every starting point", "d squared equals R squared minus 2Rr"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "pitots-theorem",
          name: "Pitot's Theorem",
          latex: String.raw`AB + CD = BC + AD`,
          description: String.raw`A quadrilateral is tangential (has an inscribed circle) if and only if the sums of opposite sides are equal.`,
          keywords: ["tangential", "inscribed circle", "opposite sides equal", "pitot theorem", "tangential quadrilateral", "sums of opposite sides equal"],
          importance: "medium",
          tier: "AMC",
          level: ["AIME"]
        },
        {
          id: "ptolemys-inequality",
          name: "Ptolemy's Inequality",
          latex: String.raw`AB \cdot CD + BC \cdot DA \ge AC \cdot BD, \qquad \text{equality} \iff ABCD \text{ is cyclic}`,
          description: String.raw`Holds for any four points in the plane; equality iff $ABCD$ is cyclic in that order (reducing to Ptolemy's Theorem).`,
          keywords: ["four points", "inequality", "equality cyclic", "ptolemy inequality", "ptolemys inequality", "noncyclic quadrilateral bound"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ptolemy-equilateral",
          name: "Ptolemy on an Equilateral Triangle",
          latex: String.raw`PA = PB + PC`,
          description: String.raw`If $P$ lies on arc $BC$ of the circumcircle of equilateral $\triangle ABC$, the distance to the far vertex equals the sum of the distances to the near two — a classic AIME shortcut.`,
          keywords: ["equilateral", "circumcircle point", "distance sum", "pompeiu"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "cyclic-perpendicular-diagonals",
          name: "Cyclic Quadrilateral with Perpendicular Diagonals",
          latex: String.raw`a^2 + c^2 = b^2 + d^2 = 4R^2`,
          description: String.raw`For a cyclic quadrilateral with sides $a$, $b$, $c$, $d$ in order, circumradius $R$ and perpendicular diagonals, opposite sides pair up: because perpendicular diagonals force the two arcs they cut off to be supplementary, each pair of opposite sides has squares summing to the squared diameter. The diagonals' intersection is also the anticenter, so the perpendicular dropped from it to any side, extended, bisects the opposite side — Brahmagupta's theorem.`,
          keywords: ["perpendicular diagonals", "orthodiagonal", "cyclic quadrilateral", "anticenter", "Brahmagupta theorem", "maltitude", "opposite sides squared", "4R squared"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cyclic-quad-radius",
          name: "Circumradius of a Cyclic Quadrilateral",
          latex: String.raw`R = \frac{1}{4K}\sqrt{(ab+cd)(ac+bd)(ad+bc)}`,
          description: String.raw`With $K$ the area (from [[brahmaguptas-formula|Brahmagupta]]): the circumradius $R$ of a cyclic quadrilateral in terms of its four sides $a$, $b$, $c$, $d$ alone. The three paired products are the same ones appearing in [[ptolemys-theorem|Ptolemy]] ($ac + bd = pq$) and the diagonal-length formulas.`,
          keywords: ["circumradius cyclic quadrilateral", "parameshvara", "four sides", "brahmagupta companion"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "newtons-line",
          name: "Newton–Gauss Line",
          latex: String.raw`\text{complete quadrilateral} \implies \text{its 3 diagonal midpoints are collinear}`,
          description: String.raw`In a complete quadrilateral, the midpoints of its three diagonals are collinear — the Newton–Gauss line. The classical special case (Newton's line): in a quadrilateral with an inscribed circle, the incenter also lies on the line through the midpoints of the two diagonals. A tidy collinearity that appears in quadrilateral configuration problems.`,
          keywords: ["newton line", "newton gauss line", "diagonal midpoints collinear", "complete quadrilateral", "tangential incenter midpoints"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Coordinate & Grid Geometry",
      blurb: "Lines, distances, and areas in coordinates, with the shoelace formula and Pick's theorem on every kind of grid.",
      formulas: [
        {
          id: "distance-midpoint",
          name: "Distance, Midpoint, Slope",
          latex: String.raw`d = \sqrt{(\Delta x)^2 + (\Delta y)^2}, \quad M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right), \quad m = \frac{\Delta y}{\Delta x}`,
          description: String.raw`The distance formula, the midpoint formula, and slope are the three basic measurements between two points in the coordinate plane. The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, which is the [[pythagorean-theorem|Pythagorean Theorem]] on the horizontal and vertical gaps. The midpoint averages the coordinates, and the slope $\frac{y_2 - y_1}{x_2 - x_1}$ is rise over run; two lines are perpendicular when their slopes multiply to $-1$. More generally, the point dividing the segment from $P_1$ to $P_2$ in the ratio $k : 1$ is $\frac{P_1 + kP_2}{1 + k}$.`,
          keywords: ["distance formula", "distance between two points", "midpoint", "slope", "perpendicular", "section formula"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "line-forms",
          name: "Forms of a Line",
          latex: String.raw`y = mx + b, \qquad y - y_1 = m(x - x_1), \qquad Ax + By = C, \qquad \frac{x}{a} + \frac{y}{b} = 1`,
          description: String.raw`A line in the plane can be written in four standard forms: slope-intercept, with slope $m$ and $y$-intercept $b$; point-slope, through a point $(x_1, y_1)$; standard form, with coefficients $A$, $B$, $C$; and intercept form, with $x$-intercept $a$ and $y$-intercept $b$. They are the same relation rearranged, each convenient for a different given: a slope and a point, two intercepts, or integer coefficients. In standard form the slope is $-\frac AB$, and the vector $(A, B)$ is perpendicular to the line.`,
          keywords: ["slope intercept form", "point slope form", "standard form", "intercept form", "equation of a line", "y = mx + b", "Ax + By = C", "line through two points", "convert between forms", "normal vector of a line"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "angle-between-lines",
          name: "Angle Between Two Lines",
          latex: String.raw`\tan\theta = \left| \frac{m_1 - m_2}{1 + m_1 m_2} \right|`,
          description: String.raw`The acute angle between lines of slopes $m_1, m_2$ — the tangent subtraction formula in coordinate clothing (each slope is the tangent of the line's inclination). The denominator vanishing recovers perpendicularity ($m_1 m_2 = -1$ makes the angle $90^\circ$).`,
          keywords: ["angle between lines", "slopes", "tangent difference", "acute angle", "inclination"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "angle-bisectors-of-lines",
          name: "Angle Bisectors of Two Lines",
          latex: String.raw`\frac{a_1x + b_1y + c_1}{\sqrt{a_1^2 + b_1^2}} = \pm\frac{a_2x + b_2y + c_2}{\sqrt{a_2^2 + b_2^2}}, \qquad y = 0,\ y = mx:\ \ m' = \frac{\sqrt{1 + m^2} - 1}{m}`,
          description: String.raw`Two crossing lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$ have two angle bisectors, perpendicular to each other, and they are the points at equal distance from both lines. Dividing each equation by the length of its normal vector makes both sides signed distances, and the two signs give the two bisectors. When one line is the $x$-axis and the other has slope $m$, the bisector of the angle between them has slope $m'$, the tangent of half the angle. A slope from a Pythagorean triple, such as $\frac34$, has a rational bisector, here $\frac13$.`,
          keywords: ["angle bisector of two lines", "bisector slope", "equation of angle bisector", "slope of the bisector", "equidistant from two lines", "half angle slope", "3/4 and 1/3", "incenter coordinates"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "shoelace-formula",
          name: "Shoelace Formula",
          latex: String.raw`A = \frac{1}{2} \left| \sum_{i=1}^{n} (x_i y_{i+1} - y_i x_{i+1}) \right|`,
          latexPlain: String.raw`A = \frac{1}{2} \left| (x_1 y_2 - y_1 x_2) + (x_2 y_3 - y_2 x_3) + \cdots + (x_n y_1 - y_n x_1) \right|`,
          description: String.raw`The shoelace formula gives the area of a polygon from the coordinates of its vertices, listed in order around the boundary: $A = \frac12\left|\sum (x_iy_{i+1} - y_ix_{i+1})\right|$, where the last vertex is followed by the first. It is the standard area tool once a figure has coordinates, and it needs no heights, angles, or cutting into pieces. Write the vertices in a column, repeat the first one at the bottom, add the products down to the right, subtract the products down to the left, and halve. The vertices can go either way around, since the absolute value fixes the sign, but they must go around in order.`,
          keywords: ["polygon area", "vertices", "coordinates", "shoelace", "surveyor"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "picks-theorem",
          name: "Pick's Theorem",
          latex: String.raw`A = I + \frac{B}{2} - 1`,
          description: String.raw`Area of a lattice polygon: $I$ interior lattice points, $B$ boundary lattice points. A segment between lattice points $(0,0)$ and $(a,b)$ passes through $\gcd(a,b) - 1$ interior lattice points.`,
          keywords: ["lattice points", "grid", "interior", "boundary", "gcd"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "picks-theorem-general",
          name: "Pick's Theorem on Any Lattice",
          latex: String.raw`A = d\left(I + \frac{B}{2} - 1\right)`,
          description: String.raw`Pick's count works on every lattice, not just the square one. If the lattice is generated by $\vec u$ and $\vec v$, its fundamental parallelogram has area $d = |\vec u \times \vec v|$, and a polygon $A$ with vertices in the lattice, $I$ lattice points inside it and $B$ on its boundary, has $d$ times the square-grid area. The affine map that scales the square grid's basis vectors into $\vec u$ and $\vec v$ multiplies every area by $d$ and matches lattice points one-for-one, so the ordinary statement transfers unchanged. On the triangular grid, with area counted in unit triangles, it reads $A = 2I + B - 2$, worked out in the explanation below.`,
          keywords: ["any lattice", "fundamental domain", "skewed grid", "affine image of the integer lattice", "basis determinant", "triangular grid", "isometric grid", "isometric paper", "unit triangles", "Pick on a non-square grid", "2I + B - 2"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "picks-hexagonal-grid",
          name: "Hexagonal Grids and Pick's Theorem",
          latex: String.raw`\text{centers: } A = 2I + B - 2 \;(\text{unit: center-lattice triangle}), \qquad \text{honeycomb: no law}`,
          description: String.raw`Two different point sets get called hexagonal, and only one of them obeys a Pick law. The centers of the cells of a hexagonal tiling form a triangular lattice, so the [[picks-theorem-general|triangular-grid form]] applies to them, with the area counted in unit triangles of that lattice. A cell of side $s$ has area $\frac{3\sqrt3}{2}s^2$, which is two unit triangles of $\frac{3\sqrt3}{4}s^2$ each, so an area of $k$ cells is $2k$ unit triangles, the unit in which $2I + B - 2$ counts for a polygon with its corners at cell centers. The corners of the tiling — the honeycomb — are not a lattice at all, and no formula in $I$ and $B$ alone can give the area there.`,
          keywords: ["hexagonal grid", "honeycomb", "hex cells", "hexagonal tiling area", "why Pick fails"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "picks-with-holes",
          name: "Pick's Theorem with Holes",
          latex: String.raw`A = I + \frac{B}{2} + h - 1`,
          description: String.raw`For a lattice region with $h$ holes, each hole adds $1$. Count $B$ over every boundary curve, the outer one and all the hole boundaries, and count $I$ only over points strictly inside the region — a point on a hole's edge is a boundary point, not an interior one. Equivalently $A = I + \frac{B}{2} - \chi$ where $\chi = 1 - h$ is the Euler characteristic, which is the form that keeps working as the region gets stranger.`,
          keywords: ["holes", "lattice region with a hole punched out", "region with a hole removed", "euler characteristic", "multiply connected"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "point-line-distance",
          name: "Point-to-Line Distance",
          latex: String.raw`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`,
          description: String.raw`The distance from a point $(x_0, y_0)$ to the line $Ax + By + C = 0$ is $\frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$, the length of the perpendicular from the point to the line. Put the line in that form first, with everything on one side. Without the absolute value, the sign of $Ax_0 + By_0 + C$ tells which side of the line the point is on, so two points are on opposite sides exactly when their values have opposite signs. The formula turns tangency into arithmetic: a circle touches a line exactly when the distance from its center to the line equals its radius.`,
          keywords: ["distance to line", "perpendicular distance", "foot", "point to line distance", "distance from a point to a line", "which side of a line"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "parallel-lines-distance",
          name: "Distance Between Parallel Lines",
          latex: String.raw`d = \frac{\lvert c_1 - c_2\rvert}{\sqrt{a^2 + b^2}} \quad \text{for } ax + by + c_1 = 0 \text{ and } ax + by + c_2 = 0`,
          description: String.raw`Two parallel lines stay the same distance apart everywhere, so the distance between them is the length of any segment that joins them at right angles, and it can be read straight from their equations. Written with the same coefficients of $x$ and $y$, $ax + by + c_1 = 0$ and $ax + by + c_2 = 0$ are parallel and the distance is $\frac{\lvert c_1 - c_2\rvert}{\sqrt{a^2 + b^2}}$. The step that matters is matching the coefficients first, since an equation multiplied through by a constant describes the same line with a different constant term. Planes work the same way with one more term under the root, and lines that are not parallel meet, so their distance is $0$.`,
          keywords: ["distance between parallel lines", "parallel lines", "distance between two lines", "parallel planes", "strip width", "common perpendicular", "distance between lines"],
          importance: "lower",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "circle-equation",
          name: "Equation of a Circle",
          latex: String.raw`(x - h)^2 + (y - k)^2 = r^2`,
          description: String.raw`The equation of a circle with center $(h, k)$ and radius $r$ says that every point $(x, y)$ on it is at distance $r$ from the center, the distance formula squared. Expanded, it becomes $x^2 + y^2 + Dx + Ey + F = 0$, and completing the square turns that back into center-radius form, with center $\left(-\frac D2, -\frac E2\right)$. The expanded form describes a real circle exactly when $D^2 + E^2 \gt 4F$.`,
          keywords: ["circle equation", "center radius", "complete the square", "equation of a circle", "standard form of a circle", "find center and radius"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "polar-coordinates",
          name: "Polar Coordinates",
          latex: String.raw`x = r\cos\theta, \quad y = r\sin\theta \qquad r^2 = x^2 + y^2, \quad \tan\theta = \frac{y}{x}`,
          description: String.raw`Polar coordinates locate a point by its distance $r$ from the origin and its angle $\theta$ from the positive $x$-axis, and they convert to rectangular coordinates by $x = r\cos\theta$ and $y = r\sin\theta$, with $r^2 = x^2 + y^2$. They make circles about or through the origin, rotations, and anything built from $\sqrt{x^2 + y^2}$ simple: $r = 2\cos\theta$ is the circle $(x - 1)^2 + y^2 = 1$. Areas are not scaled evenly, since the small cell between radii $r$ and $r + \Delta r$ and angles $\theta$ and $\theta + \Delta\theta$ has area about $r\,\Delta r\,\Delta\theta$, larger far from the origin.`,
          keywords: ["polar coordinates", "r and theta", "convert polar to rectangular", "x = r cos theta", "polar equation of a circle", "polar graph", "rose curve", "area in polar coordinates", "jacobian r dr dtheta", "distance and angle from the origin"],
          importance: "low",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "british-flag-theorem",
          name: "British Flag Theorem",
          latex: String.raw`PA^2 + PC^2 = PB^2 + PD^2, \qquad \begin{gathered} \text{box } ABCDEFGH:\;\; PA^2 + PG^2 = PB^2 + PH^2 \\ = PC^2 + PE^2 = PD^2 + PF^2 \end{gathered}`,
          description: String.raw`For any point $P$ and rectangle $ABCD$: the sums of squared distances to opposite corners are equal, and it holds even if $P$ is outside the rectangle or off its plane. A rectangular box carries the stronger statement, since the sums to all four pairs of diagonally opposite vertices agree; the same coordinate argument gives $2PA^2 + PG^2 = PB^2 + PD^2 + PE^2$, the form contest problems actually use. Here the box is $ABCD$ below and $EFGH$ above, with $E, F, G, H$ over $A, B, C, D$, so $B$, $D$, $E$ are the three neighbors of $A$ and $G$ is the vertex opposite it.`,
          keywords: ["rectangle", "distances to corners", "squares", "any point", "british flag in 3d", "rectangular box", "diagonally opposite vertices", "sum of squared distances"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "incenter-coordinates",
          name: "Center Coordinates as Weighted Averages",
          latex: String.raw`G = \frac{A + B + C}{3}, \qquad I = \frac{aA + bB + cC}{a + b + c}`,
          description: String.raw`The centroid $G$ averages the vertices; the incenter $I$ is the side-length-weighted average, each vertex weighted by the side opposite it ($a = BC$, $b = CA$, $c = AB$). A point with masses $m_A, m_B, m_C$ sits at $\frac{m_AA + m_BB + m_CC}{m_A+m_B+m_C}$, so [[mass-points|mass points]] and coordinates are unified. The $A$-excenter swaps one sign: $\frac{-aA + bB + cC}{-a+b+c}$.`,
          keywords: ["incenter coordinates", "barycentric", "weighted average", "centroid average", "excenter coordinates"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "section-formula",
          name: "Section Formula",
          latex: String.raw`P = \left( \frac{m x_2 + n x_1}{m + n}, \; \frac{m y_2 + n y_1}{m + n} \right) \quad (AP : PB = m : n)`,
          description: String.raw`The point dividing $A(x_1, y_1)$ to $B(x_2, y_2)$ internally in ratio $m : n$ is the weighted average leaning toward $B$. The midpoint is the case $m = n$. External division (the point lies beyond the segment) just flips the sign of $n$: $\frac{m x_2 - n x_1}{m - n}$.`,
          keywords: ["section formula", "divide segment ratio", "internal division", "external division", "weighted point", "dividing a segment"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Conics",
      blurb: "Ellipses, parabolas, and hyperbolas: their foci, eccentricity, and reflective property, and how to tell them apart.",
      formulas: [
        {
          id: "conic-sections",
          name: "Conic Sections",
          latex: String.raw`\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 - b^2), \qquad \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 + b^2), \qquad x^2 = 4py`,
          description: String.raw`The conic sections are the [[ellipse-properties|ellipse]], the [[parabola-focus-directrix|parabola]], and the [[hyperbola-properties|hyperbola]], the curves a plane cuts from a double cone, and each is also a distance locus: the ellipse keeps a constant sum of distances to two foci, the hyperbola a constant difference, and the parabola an equal distance to a focus and a line. In standard position they are the three equations in the box, where $c$ is the distance from the center to a focus and $p$ the distance from the parabola's vertex to its focus. Centered at $(h, k)$ instead, each is the same equation with $x - h$ in place of $x$ and $y - k$ in place of $y$.`,
          keywords: ["ellipse", "hyperbola", "parabola", "focus", "directrix", "asymptotes", "foci", "standard form", "conic", "distance locus", "which conic is it", "sum or difference of distances", "translated conic", "center (h, k)"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "ellipse-properties",
          name: "Ellipse Properties",
          latex: String.raw`\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\ \ (a > b), \qquad PF_1 + PF_2 = 2a, \qquad c^2 = a^2 - b^2, \qquad [\text{ellipse}] = \pi ab`,
          description: String.raw`The locus of points $P$ whose distances to the foci $F_1$, $F_2$ at $(\pm c, 0)$ sum to $2a$. The semi-major axis $a$ is half that constant sum, $b$ is the semi-minor axis, and $c$ is the focal distance from the center; evaluating the locus at the end of the minor axis gives $a^2 = b^2 + c^2$ directly. The area $\pi ab$ is the circle's $\pi r^2$ with the two radii separated, which is what an affine stretch of a circle does to it.`,
          keywords: ["ellipse", "sum of distances to two foci", "semi-major axis", "semi-minor axis", "a squared equals b squared plus c squared", "area pi a b", "foci of an ellipse", "constant focal sum", "latus rectum"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "hyperbola-properties",
          name: "Hyperbola Properties",
          latex: String.raw`\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \qquad \lvert PF_1 - PF_2 \rvert = 2a, \qquad c^2 = a^2 + b^2, \qquad y = \pm\frac{b}{a}x`,
          description: String.raw`Same construction with a difference of the distances from $P$ to the foci $F_1$, $F_2$ at $(\pm c, 0)$ instead of a sum, which is why $c$ now exceeds $a$ and the sign in the $c$-relation flips. The asymptotes are the lines the branches approach: drop the $1$ from the equation and it factors into exactly those two lines, so their slopes $\pm b/a$ control every direction the curve can eventually take. Rotating the rectangular case $a = b$ by $45^\circ$ turns it into $xy = k$, the reciprocal graph.`,
          keywords: ["hyperbola", "difference of distances", "asymptotes of a hyperbola", "slope b over a", "c squared equals a squared plus b squared", "rectangular hyperbola", "xy = k", "branches", "conjugate axis", "latus rectum"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-perpendicular-radii",
          name: "Perpendicular Radii of a Central Conic",
          latex: String.raw`\frac{x^2}{a^2} \pm \frac{y^2}{b^2} = 1, \; OA \perp OB: \qquad \frac{1}{OA^2} + \frac{1}{OB^2} = \frac{1}{a^2} \pm \frac{1}{b^2}`,
          description: String.raw`Take two points $A$ and $B$ on an ellipse or hyperbola centered at $O$ with $OA \perp OB$. The sum of the reciprocal squares of the two radii does not depend on where the right angle is turned: it is $\frac1{a^2} + \frac1{b^2}$ for the ellipse and $\frac1{a^2} - \frac1{b^2}$ for the hyperbola. So the chord $AB$ always stays the same distance from the center, tangent to one fixed circle, and one radius growing forces the other down toward a limit.`,
          keywords: ["perpendicular radii", "perpendicular diameters of an ellipse", "reciprocal squares of radii", "rhombus inscribed in a hyperbola", "polar equation of a conic", "chord tangent to a fixed circle", "orthogonal radii"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "parabola-focus-directrix",
          name: "Parabola Focus & Directrix",
          latex: String.raw`x^2 = 4py: \quad \text{focus } (0, p), \quad \text{directrix } y = -p, \quad \text{latus rectum} = \lvert 4p \rvert, \qquad y = ax^2 \implies p = \frac{1}{4a}`,
          description: String.raw`Every point is equidistant from the focus and the directrix, which is the definition the coordinate form encodes. The latus rectum, the focal chord perpendicular to the axis, has length $\lvert 4p \rvert$, so the coefficient in $x^2 = 4py$ is that chord read off directly. Going the other way, a parabola handed to you as $y = ax^2 + bx + c$ has $p = \frac{1}{4a}$, measured from its vertex along the axis of symmetry.`,
          keywords: ["parabola", "focus and directrix", "equidistant from a point and a line", "latus rectum", "focal chord", "x squared equals 4py", "p equals 1 over 4a", "axis of symmetry"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "eccentricity",
          name: "Eccentricity & the Focus-Directrix Definition",
          latex: String.raw`e = \frac{c}{a} = \frac{PF}{\operatorname{dist}(P, \ell)}, \qquad e = 0 \text{ circle},\ \ 0 \lt e \lt 1 \text{ ellipse},\ \ e = 1 \text{ parabola},\ \ e \gt 1 \text{ hyperbola}`,
          description: String.raw`One number that names the shape and unifies all three curves (for an ellipse or hyperbola, $c$ is the distance from the center to a focus and $a$ the semi-axis through the foci): fix a focus $F$ and a directrix $\ell$, and the locus with $PF = e \cdot \operatorname{dist}(P, \ell)$ is an ellipse, a parabola, or a hyperbola according as $e$ is below, equal to, or above $1$. Because $e$ is a ratio of two lengths, it is unchanged by scaling, so two conics of the same type are similar exactly when their eccentricities agree, and every parabola is similar to every other.`,
          keywords: ["eccentricity", "e equals c over a", "focus directrix definition", "how round is the conic", "similar conics", "eccentricity classifies the conic", "all parabolas are similar", "directrix ratio"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-classification",
          name: "Classifying a General Second-Degree Equation",
          latex: String.raw`Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0, \qquad B^2 - 4AC \lt 0 \text{ ellipse},\ \ = 0 \text{ parabola},\ \ \gt 0 \text{ hyperbola}`,
          description: String.raw`The sign of $B^2 - 4AC$ decides the type, and it survives both rotation and translation, so you can classify without putting the curve into standard form. A nonzero $B$ only means the axes are tilted, and rotating by $\theta$ with $\cot 2\theta = \frac{A - C}{B}$ removes it. Each case has degenerate members, where the plane cuts the cone through its apex: a point or nothing at all, one line or a pair of parallel lines, and two crossing lines respectively.`,
          keywords: ["classify a conic", "B squared minus 4AC", "discriminant of a conic", "xy term", "rotate the axes", "degenerate conic", "pair of lines", "second degree equation"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-reflective-property",
          name: "The Reflective Property of the Conics",
          latex: String.raw`\text{ellipse: } F_1 \to F_2, \qquad \text{parabola: } F \to \text{parallel to the axis}, \qquad \text{hyperbola: } \text{toward } F_2 \to \text{away from } F_1`,
          description: String.raw`The tangent at a point makes equal angles with the two focal radii (to the foci $F_1$ and $F_2$, or to the single focus $F$ of a parabola), so a ray from one focus of an ellipse reflects to the other, and on a parabola, whose second focus is at infinity, a ray from the focus leaves parallel to the axis. This is a statement about tangency, and its usual contest form is an optimization: the tangent line is where a sum of focal distances is least, because every other point of that line lies on a larger member of the same family.`,
          keywords: ["reflective property", "focal property", "ray from one focus to the other", "parabolic mirror", "tangent makes equal angles", "whispering gallery", "tangent minimizes focal sum", "equal angles with focal radii"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-tangent-lines",
          name: "Tangent Lines to Conics",
          latex: String.raw`\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = 1, \qquad y = mx + k \text{ tangent} \iff k^2 = a^2m^2 + b^2`,
          description: String.raw`A tangent line to a conic can be written down directly, in two ways. The tangent at a known point $(x_0, y_0)$ of $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ is $\frac{xx_0}{a^2} + \frac{yy_0}{b^2} = 1$, and a line of known slope, $y = mx + k$, touches the same ellipse exactly when $k^2 = a^2m^2 + b^2$. The [[hyperbola-properties|hyperbola]] and the [[parabola-focus-directrix|parabola]] have the same two forms with small changes.`,
          keywords: ["tangent line to an ellipse", "tangent to a hyperbola", "tangent to a parabola", "tangency condition conic", "k squared equals a squared m squared plus b squared", "x x0 over a squared", "line touches the ellipse", "conic", "ellipse"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-parametric",
          name: "Parametric Forms of Conics",
          latex: String.raw`(a\cos t,\ b\sin t), \qquad (a\sec t,\ b\tan t), \qquad (2pt,\ pt^2)`,
          description: String.raw`Each conic in standard position can be traced by one parameter: the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ by $(a\cos t, b\sin t)$, the hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ by $(a\sec t, b\tan t)$, and the parabola $x^2 = 4py$ by $(2pt, pt^2)$. One variable then describes every point of the curve, which turns questions about points on a conic into questions about a single angle or number.`,
          keywords: ["parametric equations of an ellipse", "a cos t b sin t", "parametrize a conic", "eccentric angle", "parametric parabola 2pt pt^2", "a sec t b tan t", "maximum on an ellipse", "conic", "ellipse"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "focal-radii",
          name: "Focal Radii of the Conics",
          latex: String.raw`PF_1 = a + ex,\ \ PF_2 = a - ex, \qquad PF_{1,2} = \lvert ex \pm a \rvert, \qquad PF = y + p`,
          description: String.raw`A focal radius is the distance from a point of a conic to a focus, and on each conic it is a linear expression in one coordinate. On the [[ellipse-properties|ellipse]] $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ with foci $(\mp c, 0)$ and eccentricity $e = \frac ca$, the two focal radii are $a + ex$ and $a - ex$; on the hyperbola they are $\lvert ex + a\rvert$ and $\lvert ex - a\rvert$; and on the parabola $x^2 = 4py$ the distance to the focus is $y + p$.`,
          keywords: ["focal radius", "focal distance", "distance to the focus", "a plus ex", "a minus ex", "PF = y + p", "latus rectum", "focal chord", "conic", "ellipse"],
          importance: "low",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "parabolic-segment-area",
          name: "Area of a Parabolic Segment",
          latex: String.raw`[\text{segment}] = \tfrac43\,[\triangle], \qquad \text{area} = \frac{\lvert a\rvert (x_2 - x_1)^3}{6}`,
          description: String.raw`A chord of a parabola cuts off a region, a parabolic segment, whose area is $\frac43$ of the triangle with the same base and its third vertex on the parabola where the tangent is parallel to the chord. In coordinates, the region between $y = ax^2 + bx + c$ and a line that crosses it at $x_1$ and $x_2$ has area $\frac{\lvert a\rvert (x_2 - x_1)^3}{6}$, which depends only on the leading coefficient and the width.`,
          keywords: ["parabolic segment", "archimedes quadrature of the parabola", "area between a parabola and a line", "four thirds of the triangle", "area between two parabolas", "a (x2 - x1)^3 / 6", "parabola", "conic"],
          importance: "low",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Transformations in the Coordinate Plane",
      blurb: "Reflecting, rotating, and composing moves of the plane, written as formulas and matrices.",
      formulas: [
        {
          id: "reflection-coordinates",
          name: "Reflecting a Point over a Line",
          latex: String.raw`P' = P - \frac{2(ax_0 + by_0 + c)}{a^2 + b^2}\,(a, b)`,
          description: String.raw`Reflecting a point over a line sends it to its mirror image: the point on the other side at the same distance, with the line as the [[perpendicular-bisector-locus|perpendicular bisector]] of the segment joining the two. For the line $ax + by + c = 0$, the image $P'$ of $P = (x_0, y_0)$ is a step from $P$ along the normal $(a, b)$ of twice the signed distance to the line. The common mirrors have instant answers: over the $x$-axis $(x, -y)$, over the $y$-axis $(-x, y)$, over $y = x$ the swap $(y, x)$, over $y = -x$ the point $(-y, -x)$, and over $x = k$ the point $(2k - x, y)$.`,
          keywords: ["reflect point", "reflection over line", "mirror image", "over y equals x", "normal direction"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "rotation-reflection-matrices",
          name: "Rotation & Reflection Matrices",
          latex: String.raw`R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}, \qquad F_\alpha = \begin{pmatrix} \cos 2\alpha & \sin 2\alpha \\ \sin 2\alpha & -\cos 2\alpha \end{pmatrix}`,
          description: String.raw`$R_\theta$ turns the plane about the origin and $F_\alpha$ reflects it in the line through the origin at angle $\alpha$; both send a point to a matrix times its coordinate column. Their determinants tell them apart, $+1$ for a rotation and $-1$ for a reflection, and composing is just multiplying, so $R_\alpha R_\beta = R_{\alpha+\beta}$ and $F_\beta F_\alpha = R_{2(\beta-\alpha)}$. Matrices about other centers are the same maps conjugated by a translation.`,
          keywords: ["rotation matrix", "reflection matrix", "cos sin matrix", "composing rotations", "two reflections make a rotation", "determinant plus or minus one", "orthogonal matrix", "transformation in coordinates"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "reflection-composition",
          name: "Composing Two Reflections",
          latex: String.raw`\text{reflect in } \ell_1, \text{ then } \ell_2: \quad \text{rotation by } 2\theta \text{ about } \ell_1 \cap \ell_2, \qquad \ell_1 \parallel \ell_2 : \ \text{translation by } 2d`,
          description: String.raw`Two reflections never leave another reflection behind. When the mirrors $\ell_1$ and $\ell_2$ meet at angle $\theta$ the composite is a rotation through $2\theta$ about their intersection; when they are parallel at distance $d$ it is a translation by $2d$ across them. Order matters, since swapping the mirrors reverses the turn.`,
          keywords: ["composition of reflections", "two reflections make a rotation", "rotation by twice the angle", "double reflection", "composing isometries", "reflect then reflect", "mirror pair"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "axis-stretch-area",
          name: "Stretching One Axis Scales Area",
          latex: String.raw`(x, y) \mapsto (x, ky) \implies \text{every area} \times |k|, \qquad (x, y) \mapsto (px, qy) \implies \text{every area} \times |pq|, \qquad \frac{[S']}{[T']} = \frac{[S]}{[T]}`,
          description: String.raw`Stretching a figure by a factor $k$ along one axis, with the other coordinate left alone, multiplies every length parallel to that axis by $k$ and so multiplies the area of every region by exactly $k$, whatever its shape. Because every region is scaled by the same factor, ratios of areas stay the same (regions $S$ and $T$ become $S'$ and $T'$), and that is why an ellipse has area $\pi ab$ (a circle of radius $a$ stretched by $\frac ba$) and why an area-ratio question about an ellipse can be answered on a circle.`,
          keywords: ["stretch one axis", "scale area linearly", "ellipse area from circle", "area ratios preserved", "non-uniform scaling", "squash a circle into an ellipse", "elongate a shape", "ellipsoid volume", "inscribed triangle in ellipse", "affine stretch"],
          importance: "high",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "gliding-principle",
          name: "The Gliding Principle",
          latex: String.raw`\triangle ABC \overset{+}{\sim} \triangle A'B'C',\ \ \frac{AP}{AA'} = \frac{BQ}{BB'} = \frac{CR}{CC'} \;\Rightarrow\; \triangle PQR \overset{+}{\sim} \triangle ABC`,
          description: String.raw`The Gliding Principle says that if two figures are directly similar, with the same orientation, then the points dividing the segments between corresponding points in one fixed ratio form a third figure directly similar to both, or else all coincide. Its moving-point form says that if two points glide along lines at constant velocities, any point dividing the segment between them in a fixed ratio also glides along a line at constant velocity.`,
          keywords: ["gliding principle", "directly similar figures", "points dividing corresponding segments", "midpoints of corresponding segments", "spiral similarity", "moving points constant velocity", "linear motion of midpoint", "olympiad geometry"],
          importance: "low",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "rotation-90",
          name: "Rotating a Point",
          latex: String.raw`(x, y) \xrightarrow{90^\circ \text{ ccw}} (-y, x), \qquad (x,y) \xrightarrow{\theta} (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta)`,
          description: String.raw`Rotating a point about the origin by an angle $\theta$ counterclockwise sends $(x, y)$ to $(x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta)$, and for a quarter turn this is simply $(x, y) \to (-y, x)$. To rotate about another point, measure from that point instead: subtract its coordinates, rotate, and add them back. In [[complex-basics|complex numbers]] the same rotation is multiplication by $e^{i\theta}$, or by $i$ for $90^\circ$. The quarter-turn form is the quick way to find the other vertices of a square from one side.`,
          keywords: ["rotation", "transformation", "90 degrees", "counterclockwise"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Combinatorial & Convex Geometry",
      blurb: "Facts about many points and convex sets, where counting and position meet.",
      formulas: [
        {
          id: "convex-position",
          name: "Points in Convex Position",
          latex: String.raw`\text{any 5 points in general position contain 4 in convex position}`,
          description: String.raw`The convex hull is the smallest convex polygon enclosing a point set; points are "in convex position" if they're all hull vertices. The Erdős–Szekeres (Happy Ending) theorem: for each $n$ there's a least number $\mathrm{ES}(n)$ of points in general position guaranteeing a convex $n$-gon — $\mathrm{ES}(4) = 5$, $\mathrm{ES}(5) = 9$, and $\mathrm{ES}(n) = 2^{n-2}+1$ is conjectured. The [[pigeonhole|pigeonhole]] proof classifies points by the hull structure.`,
          keywords: ["convex position", "convex hull", "happy ending problem", "erdos szekeres geometric", "convex polygon points", "general position"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "sylvester-gallai",
          name: "Sylvester–Gallai Theorem",
          latex: String.raw`\text{finite points, not all collinear} \Rightarrow \text{some line hits exactly two}`,
          description: String.raw`Any finite set of points that isn't entirely on one line has an "ordinary line" — one containing exactly two of the points. The slick proof takes the closest point–line pair and shows a third point on the line would give a closer pair, a contradiction (the extremal principle in action). A famous existence result; its dual concerns arrangements of lines.`,
          keywords: ["sylvester gallai", "ordinary line", "not all collinear", "two points line", "extremal principle geometry"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "hellys-theorem",
          name: "Helly's Theorem",
          latex: String.raw`\text{convex sets in } \mathbb{R}^d:\ \text{every } d{+}1 \text{ meet} \Rightarrow \text{all meet}, \qquad \text{plane: every } 3 \Rightarrow \text{all}`,
          description: String.raw`For a finite family of convex sets in the plane, if every three have a common point then all of them do (in $\mathbb{R}^d$, replace three by $d+1$). It reduces a global intersection question to checking small subfamilies — the standard tool for "a single point/line meets all of these" problems and piercing arguments. Convexity is essential.`,
          keywords: ["helly theorem", "convex sets intersection", "every three intersect", "common point", "piercing", "d plus one"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "minkowski-lattice",
          name: "Minkowski's Lattice Point Theorem",
          latex: String.raw`\text{symmetric convex, area} > 4 \implies \text{a nonzero lattice point inside}`,
          description: String.raw`A convex region symmetric about the origin with area exceeding $4$ must contain a lattice point other than the origin (volume $> 2^d$ in $d$ dimensions). The proof tiles the plane by the integer lattice and applies pigeonhole to overlaps. The geometry-of-numbers bridge to number theory — it proves the two-squares theorem and bounds for Diophantine approximation.`,
          keywords: ["minkowski lattice theorem", "geometry of numbers", "centrally symmetric convex", "lattice point", "area greater than 4", "two squares proof"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Solid Geometry (3D)",
      blurb: "Volumes and surface areas of solids, regular polyhedra and tetrahedra, and Euler's formula for faces, edges, and vertices.",
      formulas: [
        {
          id: "eulers-polyhedron-formula",
          name: "Euler's Polyhedron Formula",
          latex: String.raw`V - E + F = 2`,
          description: String.raw`For any convex polyhedron with $V$ vertices, $E$ edges and $F$ faces: vertices minus edges plus faces equals 2. Also holds for connected planar graphs.`,
          keywords: ["polyhedron", "vertices edges faces", "euler characteristic", "planar graph"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "prism-pyramid-volumes",
          name: "Prism, Pyramid, Cylinder, Cone Volumes",
          latex: String.raw`V_{\text{prism/cyl}} = Bh, \qquad V_{\text{pyramid/cone}} = \frac{1}{3} Bh`,
          description: String.raw`A prism or cylinder has volume equal to its base area times its height, $V = Bh$, and a pyramid or cone with the same base and height has exactly a third of that, $V = \frac13Bh$. The height is always the perpendicular distance from the base plane to the top face or apex, so a slanted solid has the same volume as an upright one. Any face of a pyramid can serve as its base, which is what turns volume into a tool: computing one volume in two ways gives a distance that is hard to find directly.`,
          keywords: ["volume", "base area", "one third", "cylinder", "cone", "pyramid"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "cube",
          name: "Cube of Side $s$",
          latex: String.raw`d_{\text{face}} = s\sqrt2 \qquad d_{\text{space}} = s\sqrt3 \qquad R = \tfrac{s\sqrt3}{2},\ r = \tfrac{s}{2}`,
          description: String.raw`A cube of edge $s$ has face diagonals $s\sqrt2$, space diagonals $s\sqrt3$, volume $s^3$, and surface area $6s^2$. Its three spheres are the insphere of radius $r$, touching the faces, the midsphere of radius $\frac{s\sqrt2}{2}$, touching the edges, and the circumsphere of radius $R$, through the vertices. The angles between its diagonals are fixed, a plane through the three vertices next to one vertex cuts off a corner of volume $\frac{s^3}{6}$, and a plane through the center perpendicular to a space diagonal cuts it in a regular hexagon.`,
          keywords: ["cube", "unit cube", "space diagonal", "face diagonal", "section of a cube", "hexagon in a cube", "cube spheres", "corner of a cube", "angle between diagonals of a cube"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sphere-formulas",
          name: "Sphere",
          latex: String.raw`SA = 4\pi r^2, \qquad V = \frac43\pi r^3, \qquad V_{\text{cap}} = \frac{\pi h^2(3r - h)}{3}, \qquad A_{\text{zone}} = 2\pi rh`,
          description: String.raw`Surface area and volume of a sphere of radius $r$. Spherical cap of height $h$: volume $\frac{\pi h^2(3r-h)}{3}$, curved (zone) area $2\pi r h$ — strikingly, only the height matters.`,
          keywords: ["sphere", "surface area", "volume", "ball", "spherical cap", "zone"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "descartes-sphere-theorem",
          name: "Soddy–Gosset Theorem (3D Descartes)",
          latex: String.raw`(k_1 + k_2 + k_3 + k_4 + k_5)^2 = 3\left(k_1^2 + k_2^2 + k_3^2 + k_4^2 + k_5^2\right)`,
          description: String.raw`The three-dimensional analogue of the [[descartes-circle-theorem|Descartes Circle Theorem]]: five mutually tangent spheres with curvatures $k_i = 1/r_i$ satisfy $\left(\sum k_i\right)^2 = 3\sum k_i^2$. The sign conventions match the 2D case — a sphere that encloses the others contributes a negative curvature, and a flat plane counts as $0$. Given four mutually tangent spheres, solving the quadratic for the fifth gives the two "filling" spheres $k_5 = \tfrac12\left(\sum_{i=1}^{4} k_i\right) \pm \tfrac{\sqrt3}{2}\sqrt{\left(\sum_{i=1}^{4} k_i\right)^2 - 2\sum_{i=1}^{4} k_i^2}$. In general the Soddy–Gosset Theorem in $n$ dimensions reads $\left(\sum_{i=1}^{n+2} k_i\right)^2 = n\sum k_i^2$ — the circle theorem is the $n = 2$ case, this is $n = 3$.`,
          keywords: ["soddy", "gosset", "five spheres", "3d descartes", "descartes sphere", "sphere curvature", "kissing spheres", "mutually tangent spheres", "bend", "apollonian"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cone-formulas",
          name: "Cone Surface Area",
          latex: String.raw`\ell = \sqrt{r^2 + h^2}, \qquad A_{\text{lateral}} = \pi r\ell, \qquad SA = \pi r\ell + \pi r^2, \qquad \theta_{\text{sector}} = \frac{2\pi r}{\ell}`,
          description: String.raw`A cone with base radius $r$, height $h$ and slant height $\ell = \sqrt{r^2 + h^2}$ has lateral surface area $\pi r\ell$ and total surface area $\pi r\ell + \pi r^2$. The lateral area uses the slant height, the distance from the tip to the edge of the base, not the height. Unrolled, the lateral surface is a sector of a circle of radius $\ell$ whose arc is the base's circumference $2\pi r$, and that flat picture is what problems about paths on a cone, or cones rolled from paper, really use.`,
          keywords: ["cone", "slant height", "lateral area", "unroll", "sector"],
          importance: "high",
          tier: "AMC",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "projected-area-cosine",
          name: "Area Under Orthogonal Projection",
          latex: String.raw`[\text{shadow}] = [\text{original}] \cdot \cos\theta \qquad\Longleftrightarrow\qquad [\text{slanted section}] = \frac{[\text{shadow}]}{\cos\theta}`,
          description: String.raw`Project a plane region orthogonally onto another plane and every area is multiplied by $\cos\theta$, where $\theta$ is the dihedral angle between the two planes. One direction is fixed and one is squashed by $\cos\theta$, so the factor is the same for every region and ratios of areas survive. Read backwards it is the useful form: a slanted cross-section equals its shadow divided by $\cos\theta$, which computes an awkward tilted area from an easy flat one.`,
          keywords: ["projected area", "area times cosine", "shadow of a region", "slanted cross-section", "dihedral angle", "area of an oblique section", "divide by cos theta", "orthogonal projection area"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "cavalieris-principle",
          name: "Cavalieri's Principle",
          latex: String.raw`\text{equal cross-sections at every height} \Rightarrow \text{equal volumes}`,
          description: String.raw`Two solids that every horizontal plane slices into cross-sections of equal area have the same volume — whatever their shapes. This is why an oblique prism or cylinder keeps $V = Bh$ (shear it upright, no slice changes), and it delivers the sphere's volume by comparing it to a cylinder with a cone removed.`,
          keywords: ["cavalieri", "cross section", "equal slices equal volume", "oblique prism", "shear"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "frustum-volume",
          name: "Volume of a Frustum",
          latex: String.raw`V = \frac{1}{3}h\left(A_1 + A_2 + \sqrt{A_1 A_2}\right)`,
          description: String.raw`A truncated pyramid or cone with parallel base areas $A_1, A_2$ and height $h$ between them.`,
          keywords: ["frustum", "truncated cone", "truncated pyramid", "frustum volume formula", "truncated cone volume", "truncated pyramid volume"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "de-guas-theorem",
          name: "De Gua's Theorem",
          latex: String.raw`A_0^2 = A_1^2 + A_2^2 + A_3^2, \qquad \frac{1}{h^2} = \frac{1}{a^2} + \frac{1}{b^2} + \frac{1}{c^2}`,
          description: String.raw`De Gua's Theorem is the Pythagorean Theorem one dimension up. Take a tetrahedron with a right-angled corner, three edges of lengths $a$, $b$, $c$ meeting at one vertex at right angles, as when a plane slices the corner off a box. With $A_1$, $A_2$, $A_3$ the areas of the three right-angled faces and $A_0$ the area of the face opposite the corner, the square of $A_0$ is the sum of the other three squares. The height $h$ from the corner to that opposite face obeys the three-dimensional form of the altitude relation in a right triangle, in reciprocal squares.`,
          keywords: ["tetrahedron", "right corner", "face areas", "3d pythagorean"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "regular-tetrahedron",
          name: "Regular Tetrahedron of Side $s$",
          latex: String.raw`h = \frac{s\sqrt{6}}{3}, \qquad V = \frac{s^3\sqrt{2}}{12}, \qquad SA = s^2\sqrt{3}`,
          description: String.raw`A regular tetrahedron has four equilateral faces and six equal edges $s$. Its height is $\frac{s\sqrt6}{3}$, its volume is $\frac{s^3\sqrt2}{12}$, and its surface area is $s^2\sqrt3$. The center is a quarter of the way up from each face, so the circumradius $\frac{s\sqrt6}{4}$ is three times the inradius $\frac{s\sqrt6}{12}$, and the dihedral angle is $\arccos\frac13 \approx 70.5^\circ$. Most of this comes from one picture: the alternate vertices of a cube of edge $e$ are a regular tetrahedron of edge $e\sqrt2$.`,
          keywords: ["tetrahedron", "regular tetrahedron", "platonic", "volume", "height", "circumradius", "dihedral angle", "inradius", "R = 3r", "dihedral arccos 1/3", "tetrahedron in a cube", "opposite edges perpendicular", "four equal spheres"],
          importance: "low",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "regular-octahedron",
          name: "Regular Octahedron of Side $s$",
          latex: String.raw`V = \frac{s^3\sqrt{2}}{3}, \qquad SA = 2s^2\sqrt{3}, \qquad R = \frac{s\sqrt{2}}{2}, \quad r = \frac{s\sqrt{6}}{6}`,
          description: String.raw`A regular octahedron of edge $s$ has eight equilateral faces, six vertices, and twelve edges; $R$ and $r$ are the radii of the spheres through its vertices and touching its faces. A plane through four vertices cuts it into two congruent square pyramids with base side $s$ and height $\frac{s}{\sqrt2}$, which gives its volume $\frac{s^3\sqrt2}{3}$, exactly four regular tetrahedra of the same edge. It is the dual of the cube: its vertices are the centers of a cube's faces, so a cube of edge $e$ holds an octahedron of edge $\frac{e\sqrt2}{2}$ and volume $\frac{e^3}{6}$.`,
          keywords: ["octahedron", "regular octahedron", "eight faces", "two square pyramids", "split octahedron", "dual of cube", "platonic solid", "octahedron volume", "octahedron surface area"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "dodecahedron-icosahedron",
          name: "Regular Dodecahedron & Icosahedron",
          latex: String.raw`\begin{gathered} \text{dodecahedron: } V = 20,\ E = 30,\ F = 12 \text{ pentagons} \\ \text{icosahedron: } V = 12,\ E = 30,\ F = 20 \text{ triangles} \end{gathered}`,
          description: String.raw`The two Platonic solids built on the regular pentagon, with $V$ vertices, $E$ edges, and $F$ faces. The dodecahedron has three pentagons at each vertex and the icosahedron five triangles. They are duals: the centers of the faces of one are the vertices of the other, which swaps the vertex and face counts and keeps the $30$ edges. Both are full of the [[golden-ratio-pentagon|golden ratio]] $\varphi$, which places their vertices in coordinates.`,
          keywords: ["dodecahedron", "icosahedron", "regular dodecahedron", "regular icosahedron", "platonic solid", "20 vertices", "12 pentagonal faces", "20 triangular faces", "golden rectangles", "dual polyhedra", "icosahedron vertex distances"],
          importance: "low",
          tier: "AMC",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cayley-menger",
          name: "Cayley–Menger Determinant",
          latex: String.raw`288\,V^2 = \det\begin{pmatrix} 0 & 1 & 1 & 1 & 1 \\ 1 & 0 & a^2 & b^2 & c^2 \\ 1 & a^2 & 0 & d^2 & e^2 \\ 1 & b^2 & d^2 & 0 & f^2 \\ 1 & c^2 & e^2 & f^2 & 0 \end{pmatrix}`,
          description: String.raw`The 3D [[herons-formula|Heron's Formula]]: the volume of any tetrahedron from its six edge lengths alone, no coordinates needed. Here $a, b, c$ are the edges from one vertex ($P_1P_2$, $P_1P_3$, $P_1P_4$) and $d, e, f$ the remaining three edges ($P_2P_3$, $P_2P_4$, $P_3P_4$). One size down, the $4 \times 4$ bordered determinant of a triangle's three squared sides equals $-16[\triangle]^2$, Heron's Formula again with a sign flip.`,
          keywords: ["cayley menger", "volume from edge lengths", "tetrahedron volume", "3d heron", "determinant", "det", "six edges"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "isosceles-tetrahedron",
          name: "Isosceles Tetrahedron",
          latex: String.raw`a^2 = p^2 + q^2,\ \ b^2 = q^2 + r^2,\ \ c^2 = p^2 + r^2, \qquad V = \frac{pqr}{3}`,
          description: String.raw`An isosceles tetrahedron is one whose three pairs of opposite edges are equal, with lengths $a$, $b$, $c$, and it always fits inside a rectangular box $p \times q \times r$ with its six edges as face diagonals. That turns an awkward solid into a box: its volume is $\frac{pqr}{3}$, the box minus four corner pyramids. All four faces are congruent acute triangles, and its circumcenter, incenter, and centroid coincide at the center of the box.`,
          keywords: ["isosceles tetrahedron", "opposite edges equal", "box embedding", "congruent faces", "disphenoid"],
          importance: "medium",
          tier: "AMC",
          level: ["AIME"]
        },
        {
          id: "tetrahedron-centroid",
          name: "Tetrahedron Centroid & Medians",
          latex: String.raw`G = \frac{A + B + C + D}{4}, \qquad AG : GM_A = 3 : 1`,
          description: String.raw`The centroid is the average of the four vertices. Each median (a vertex to the centroid $M_A$ of the opposite face) passes through $G$, which splits it $3:1$ from the vertex. The three bimedians — segments joining midpoints of opposite edges — also meet at $G$ and bisect each other there.`,
          keywords: ["tetrahedron centroid", "medians", "3 to 1 ratio", "bimedian", "center of mass", "opposite edge midpoints"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "insphere-radius",
          name: "Insphere Radius of a Polyhedron",
          latex: String.raw`V = \frac{1}{3} r S \quad\Longrightarrow\quad r = \frac{3V}{S}`,
          description: String.raw`The insphere of a polyhedron is a sphere tangent to every face, and its radius $r$ comes from the volume $V$ and the total surface area $S$: cutting the solid into pyramids from the center, one on each face, each of height $r$, gives the volume as a third of $r$ times the area. The formula holds whenever some point is the same [[point-plane-distance|distance from every face]], which is how problems usually phrase it. It is the three-dimensional twin of $r = \frac As$ for the incircle of a triangle.`,
          keywords: ["inscribed sphere", "insphere", "3v over s", "distance to faces", "isosceles tetrahedron"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "pappus-centroid",
          name: "Pappus's Centroid Theorems",
          latex: String.raw`V = 2\pi d \cdot A, \qquad S = 2\pi d \cdot L, \qquad \text{torus: } V = 2\pi^2 R r^2, \; S = 4\pi^2 R r`,
          description: String.raw`Revolve a plane region about an external axis in its plane: the solid's volume is the area $A$ times the distance the region's centroid travels, $2\pi d$. Revolve a plane curve instead and its surface area is the arc length $L$ times $2\pi d$. So the whole problem reduces to finding a centroid. For a torus (revolve a disk of radius $r$ whose center is $R$ from the axis) this gives $V = 2\pi R \cdot \pi r^2 = 2\pi^2 R r^2$ and $S = 2\pi R \cdot 2\pi r = 4\pi^2 R r$ instantly.`,
          keywords: ["pappus", "centroid theorem", "solid of revolution", "volume of revolution", "surface of revolution", "torus volume", "torus surface"],
          importance: "low",
          tier: "AIME Early",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Vectors & Coordinates in Space",
      blurb: "Distances, planes, and projections in three dimensions, with the dot and cross products.",
      formulas: [
        {
          id: "distance-3d",
          name: "Distance in Three Dimensions",
          latex: String.raw`d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}, \quad M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}, \frac{z_1+z_2}{2}\right)`,
          description: String.raw`One [[pythagorean-theorem|Pythagorean]] step per axis, so every planar coordinate identity survives unchanged: the midpoint still averages coordinatewise, and the point dividing $P_1P_2$ in ratio $k:1$ is still $\frac{P_1 + kP_2}{1+k}$. Fixing $d = r$ turns the formula into the sphere $(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$.`,
          keywords: ["distance in 3d", "distance in space", "three dimensional distance", "distance between two points in space", "midpoint in space", "sphere equation", "xyz coordinates", "space coordinates"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "space-diagonal",
          name: "Space Diagonal of a Rectangular Prism",
          latex: String.raw`d = \sqrt{\ell^2 + w^2 + h^2}`,
          description: String.raw`The space diagonal of a rectangular box with edges $\ell$, $w$, $h$ is the segment $d$ joining two opposite corners through the inside, and its length is the [[pythagorean-theorem|Pythagorean Theorem]] used twice: once across a face, then up the third edge. For a cube of side $s$ it is $s\sqrt3$, against a face diagonal of $s\sqrt2$. It also works backwards: a box whose three face diagonals are $p$, $q$, and $r$ has space diagonal $\sqrt{\frac{p^2 + q^2 + r^2}{2}}$.`,
          keywords: ["box", "diagonal", "3d distance", "cube"],
          importance: "high",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "cross-product-area",
          name: "Vector Cross Product",
          latex: String.raw`[\triangle] = \frac{1}{2}\left|\vec{u} \times \vec{v}\right|, \qquad V_{\text{tetrahedron}} = \frac{1}{6}\left|\vec{u} \cdot (\vec{v} \times \vec{w})\right|`,
          description: String.raw`With $\vec u, \vec v, \vec w$ the edge vectors from one vertex, the cross product and the triple product give areas and volumes at once. They are the fastest route to areas and volumes of coordinate-defined triangles and tetrahedra in three dimensions, and the big sibling of the [[shoelace-formula|shoelace formula]].`,
          keywords: ["cross product", "triple product", "3d coordinates", "tetrahedron volume", "determinant"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        },
        {
          id: "gram-determinant-volume",
          name: "Volume from Dot Products (Gram Determinant)",
          latex: String.raw`V^2 = \det\begin{pmatrix} u\cdot u & u\cdot v & u\cdot w \\ u\cdot v & v\cdot v & v\cdot w \\ u\cdot w & v\cdot w & w\cdot w \end{pmatrix}`,
          description: String.raw`A parallelepiped spanned by the edge vectors $u$, $v$, $w$ from one vertex has its volume squared equal to the determinant of the table of their [[vector-dot-product|dot products]]. So the volume needs only the edge lengths and the angles between the edges, with no coordinates. A tetrahedron on the same three edges has a sixth of it. When all three edges have length $\ell$ and meet pairwise at the angle $\theta$, it becomes $V = \ell^3\sqrt{1 - 3\cos^2\theta + 2\cos^3\theta}$.`,
          keywords: ["gram determinant", "volume from edge lengths and angles", "parallelepiped volume", "table of dot products", "volume squared", "tetrahedron from three edges at a vertex", "rhombohedron"],
          importance: "lower",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "plane-intercept-form",
          name: "Equation of a Plane from Its Intercepts",
          latex: String.raw`\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1 \quad\Longleftrightarrow\quad bc\,x + ca\,y + ab\,z = abc`,
          description: String.raw`The intercept form is the equation of the plane that meets the coordinate axes at $(a, 0, 0)$, $(0, b, 0)$, and $(0, 0, c)$, for nonzero intercepts $a$, $b$, $c$. Clearing denominators gives the standard form, with normal vector $(bc, ca, ab)$. It is the quickest way to write a cutting plane, and the tetrahedron it cuts from the first octant has volume $\frac{abc}{6}$.`,
          keywords: ["plane from three intercepts", "intercept form of a plane", "equation of a plane", "x/a + y/b + z/c = 1", "normal vector of a plane", "tetrahedron cut from octant", "plane through three points on the axes"],
          importance: "medium",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "point-plane-distance",
          name: "Point-to-Plane Distance",
          latex: String.raw`d = \frac{|ax_0 + by_0 + cz_0 + d_0|}{\sqrt{a^2 + b^2 + c^2}}`,
          description: String.raw`The distance from a point $(x_0, y_0, z_0)$ to the plane $ax + by + cz + d_0 = 0$ is $\frac{|ax_0 + by_0 + cz_0 + d_0|}{\sqrt{a^2 + b^2 + c^2}}$, the length of the perpendicular from the point to the plane, with $(a, b, c)$ the plane's normal vector. When the plane is a face of a solid, the distance is also the height of a pyramid, $\frac{3V}{A}$ for a pyramid of volume $V$ on that face of area $A$, which is often faster than finding the plane's equation.`,
          keywords: ["distance to plane", "normal vector", "3d distance", "plane equation", "solid geometry"],
          importance: "high",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "vector-projection",
          name: "Projecting One Vector onto Another",
          latex: String.raw`\operatorname{proj}_{\vec v} \vec u = \frac{\vec u \cdot \vec v}{\vec v \cdot \vec v}\, \vec v, \qquad \lvert \operatorname{proj}_{\vec v} \vec u \rvert = \frac{\lvert \vec u \cdot \vec v \rvert}{\lvert \vec v \rvert} = \lvert \vec u \rvert \lvert \cos\theta \rvert`,
          description: String.raw`Splits $\vec u$ into the part along $\vec v$ and the part perpendicular to it, with $\theta$ the angle between the two vectors, and the perpendicular leftover $\vec u - \operatorname{proj}_{\vec v}\vec u$ is the shortest vector from the line to the tip of $\vec u$. That second reading is what makes it a distance tool: the [[point-line-distance|distance from a point to a line]] or a plane is the length of exactly this leftover. The scalar $\vec u \cdot \vec v / \lvert\vec v\rvert$ is the signed shadow length, negative when the angle is obtuse.`,
          keywords: ["vector projection", "component along a vector", "perpendicular component", "shadow of a vector", "scalar projection", "distance from a point to a line", "orthogonal decomposition", "u dot v over v"],
          importance: "low",
          tier: "AIME Late",
          level: ["AMC12", "AIME"]
        },
        {
          id: "skew-lines-distance",
          name: "Distance Between Skew Lines",
          latex: String.raw`d = \frac{\left| (P_2 - P_1) \cdot (\vec{d_1} \times \vec{d_2}) \right|}{\left| \vec{d_1} \times \vec{d_2} \right|}`,
          description: String.raw`For lines through $P_1, P_2$ with direction vectors $\vec{d_1}, \vec{d_2}$: project the connecting vector onto the common perpendicular direction $\vec{d_1} \times \vec{d_2}$. Equivalent volume route: a tetrahedron with edge $AB$ on one line and edge $CD$ on the other, the lines meeting at angle $\theta$, has $V = \frac16 \cdot AB \cdot CD \cdot d \sin\theta$, so $d = \frac{6V}{AB \cdot CD \cdot \sin\theta}$.`,
          keywords: ["skew lines", "common perpendicular", "cross product distance", "3d lines"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME"]
        },
        {
          id: "vector-dot-product",
          name: "Dot Product",
          latex: String.raw`\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2 = |\vec{u}|\,|\vec{v}| \cos\theta`,
          description: String.raw`For $\vec u = (u_1, u_2)$ and $\vec v = (v_1, v_2)$ meeting at the angle $\theta$, it measures alignment: positive for an acute angle, exactly $0$ when $\vec{u} \perp \vec{v}$, negative for obtuse. Gives the angle via $\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$ and the scalar projection of $\vec{u}$ onto $\vec{v}$ as $\frac{\vec{u} \cdot \vec{v}}{|\vec{v}|}$.`,
          keywords: ["dot product", "scalar product", "angle between vectors", "perpendicular zero", "projection"],
          importance: "medium",
          tier: "AIME Early",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Ratios & Constants to Memorize",
      blurb: "Exact lengths and ratios that come up often enough to know by heart.",
      formulas: [
{
          id: "15-75-90-triangle",
          name: "15-75-90 Triangle Ratio",
          latex: String.raw`(\sqrt{6}-\sqrt{2}) : (\sqrt{6}+\sqrt{2}) : 4`,
          description: String.raw`Side ratios opposite $15^\circ$, $75^\circ$, $90^\circ$. Comes from $\sin 15^\circ = \frac{\sqrt{6}-\sqrt{2}}{4}$.`,
          keywords: ["15 degrees", "75 degrees", "side ratio", "sin 15"],
          importance: "medium",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "triangle-13-14-15",
          name: "The 13-14-15 Triangle",
          latex: String.raw`13\text{-}14\text{-}15:\quad s = 21,\ [ABC] = 84,\ r = 4,\ R = \tfrac{65}{8}`,
          description: String.raw`The altitude to the side of length $14$ is exactly $12$ and lands $5$ along it, cutting the triangle into a $5$-$12$-$13$ and a $9$-$12$-$15$ right triangle. That split is why every quantity in it comes out rational ($s$ in the box is the semiperimeter): area $84$, inradius $4$, circumradius $\tfrac{65}{8}$, exradii $\tfrac{21}{2}, 12, 14$, and even $\cos$ of the angles opposite $13$ and $15$ are $\tfrac{3}{5}$ and $\tfrac{5}{13}$. Problem setters use it whenever they want a scalene triangle with clean numbers, so spotting the side triple is often the entire first step.`,
          keywords: ["13-14-15", "13 14 15 triangle", "heronian triangle", "integer sides integer area", "area 84", "5-12-13 and 9-12-15", "consecutive integer sides", "altitude 12", "inradius 4", "circumradius 65/8", "nice triangle"],
          importance: "medium",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "golden-ratio-pentagon",
          name: "Golden Ratio & the Regular Pentagon",
          latex: String.raw`\varphi = \frac{1+\sqrt{5}}{2}, \qquad \frac{\text{diagonal}}{\text{side}} = \varphi, \qquad \varphi^n = F_n\varphi + F_{n-1}`,
          description: String.raw`The golden ratio $\varphi \approx 1.618$ is the ratio of a diagonal to a side in a regular pentagon, and it is the positive root of $\varphi^2 = \varphi + 1$. That equation reduces every power of $\varphi$ to a linear expression whose coefficients are consecutive Fibonacci numbers $F_n$. It also gives exact values at the pentagon's angles: $\cos 36^\circ = \frac\varphi2 = \frac{1 + \sqrt5}{4}$ and $\sin 18^\circ = \frac{\varphi - 1}{2} = \frac{\sqrt5 - 1}{4}$.`,
          keywords: ["golden ratio", "pentagon", "diagonal", "36 degrees", "phi"],
          importance: "high",
          tier: "AMC",
          level: ["AMC12", "AIME"]
        },
        {
          id: "inscribed-square",
          name: "Square Inscribed in a Triangle",
          latex: String.raw`x = \frac{ah}{a + h}`,
          description: String.raw`Side $x$ of the square sitting on the base $a$ of a triangle with height $h$ to that base. Proof: the small triangle above the square is similar to the whole, $\frac{h - x}{h} = \frac{x}{a}$.`,
          keywords: ["square in triangle", "inscribed square", "similar triangles", "square inscribed in a triangle", "largest inscribed square", "square inside a triangle"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "isoperimetric-facts",
          name: "Isoperimetric Facts",
          latex: String.raw`A \le \frac{P^2}{4\pi} \text{ (circle)}, \qquad A_{\text{rect}} \le \frac{P^2}{16} \text{ (square)}, \qquad A_{\triangle} \le \frac{P^2}{12\sqrt{3}} \text{ (equilateral)}`,
          description: String.raw`For a fixed perimeter $P$, the area $A$ is maximized by the most symmetric shape: the square among rectangles ($xy \le \left(\frac{x+y}{2}\right)^2$), the equilateral among triangles (by AM-GM on [[herons-formula|Heron]]), the regular $n$-gon among $n$-gons, and the circle overall. For fixed side lengths, the cyclic polygon maximizes area.`,
          keywords: ["maximize area", "fixed perimeter", "isoperimetric", "square best rectangle", "regular maximizes", "maximization"],
          importance: "low",
          tier: "AMC",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Projective Geometry & Cross-Ratio",
      blurb: "Collinearity and concurrence theorems (Pascal, Desargues, and Brianchon) and the cross-ratio they preserve.",
      formulas: [
        {
          id: "brianchon-theorem",
          name: "Brianchon's Theorem",
          latex: String.raw`\text{hexagon tangent to a conic} \implies AD,\; BE,\; CF \text{ concur}`,
          description: String.raw`The projective dual of [[pascals-theorem|Pascal's Theorem]]: if a hexagon $ABCDEF$ is circumscribed about a conic (every side tangent to it), its three main diagonals $AD$, $BE$, $CF$ pass through one point. Pascal turns "six points on a conic" into a collinearity; Brianchon turns "six tangent lines" into a concurrency — the identical statement with points and lines swapped. Letting tangency points merge degenerates it into concurrency facts for circumscribed pentagons and quadrilaterals, and it yields the Gergonne point from a triangle's incircle.`,
          keywords: ["brianchon", "tangent hexagon", "dual of pascal", "diagonals concurrent", "circumscribed conic", "projective", "gergonne point"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "pascals-theorem",
          name: "Pascal's Theorem",
          latex: String.raw`AB \cap DE, \;\; BC \cap EF, \;\; CD \cap FA \;\text{ are collinear}`,
          description: String.raw`Inscribe any hexagon $ABCDEF$ in a circle (self-intersecting allowed): the three intersection points of opposite sides lie on one line — the Pascal line. The dual, [[brianchon-theorem|Brianchon's Theorem]]: a hexagon circumscribed about a circle has its three main diagonals concurrent. Degenerate versions (letting adjacent vertices merge so a side becomes a tangent line) are the contest-useful forms.`,
          keywords: ["pascal line", "hexagon in circle", "brianchon", "collinear intersections", "projective"],
          importance: "medium",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "pappus-hexagon",
          name: "Pappus's Hexagon Theorem",
          latex: String.raw`\begin{gathered} A, B, C \in \ell,\ D, E, F \in m \\ \implies AE \cap BD,\ AF \cap CD,\ BF \cap CE \text{ collinear} \end{gathered}`,
          description: String.raw`Put three points $A$, $B$, $C$ on one line $\ell$ and three $D$, $E$, $F$ on another line $m$, join them crosswise, and the three crossing points line up. It is [[pascals-theorem|Pascal's Theorem]] with the conic degenerated into a pair of lines, which is the cleanest way to remember both: six points on a conic give a Pascal line, and a pair of lines is a conic. Purely projective, so it survives any projection and needs no measurement at all — distinct from [[pappus-centroid|Pappus's Centroid Theorems]], which are about solids of revolution.`,
          keywords: ["pappus hexagon theorem", "pappus line", "three points on each of two lines", "crosswise intersections collinear", "degenerate pascal", "projective collinearity"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "desargues-theorem",
          name: "Desargues's Theorem",
          latex: String.raw`\text{perspective from a point} \iff \text{perspective from a line}`,
          description: String.raw`Triangles $ABC$ and $A'B'C'$ are perspective from a point when $AA'$, $BB'$, $CC'$ concur, and perspective from a line when the three points $AB\cap A'B'$, $BC\cap B'C'$, $CA\cap C'A'$ are collinear (the axis of perspectivity). Desargues: either condition implies the other. It trades a concurrency for a collinearity and back — the two things projective problems keep asking for — and its converse proves concurrency by producing the axis.`,
          keywords: ["desargues", "perspective from point", "perspective from line", "axis of perspectivity", "concurrency", "collinearity", "projective duality", "two triangles"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "desargues-involution",
          name: "Desargues Involution Theorem and Its Dual",
          latex: String.raw`\begin{gathered} \text{conics through } A, B, C, D \text{ cut } \ell \text{ in pairs of one involution:} \\ (AB, CD),\ (AC, BD),\ (AD, BC) \end{gathered}, \qquad \alpha\,tt' + \beta\,(t + t') + \gamma = 0`,
          description: String.raw`An involution on a line $\ell$ is a pairing of its points that swaps the two members of each pair; in a coordinate $t$ along $\ell$, a pair $t, t'$ satisfies one fixed bilinear relation with coefficients $\alpha$, $\beta$, $\gamma$, and two pairs determine it. The Desargues Involution Theorem says that for four points $A$, $B$, $C$, $D$ and a line $\ell$ through none of them, every conic through the four points meets $\ell$ in a pair of one fixed involution. The three line pairs through the points are conics too, so the points where $\ell$ meets $AB$ and $CD$, $AC$ and $BD$, $AD$ and $BC$ are pairs of it. The dual, DDIT, does the same for the lines through a point $P$: for a conic tangent to four lines, the two tangents from $P$ and the lines from $P$ to each pair of opposite vertices are pairs of one involution. A circle meeting $\ell$ supplies a pair, so the theorem turns circle problems into a computation on one line.`,
          keywords: ["desargues involution theorem", "dual desargues involution", "DDIT", "DIT", "involution on a line", "pencil of conics", "conics through four points", "generalized butterfly"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "mobius-transformations",
          name: "Möbius Transformations",
          latex: String.raw`f(z) = \frac{az + b}{cz + d}, \quad ad - bc \ne 0 \qquad \text{cross-ratio and the family of lines-and-circles are preserved}`,
          description: String.raw`The maps of the extended complex plane built from one fraction. Every one is a composition of translations, rotations, scalings, and the single inversion $z \mapsto \frac1z$, which is why the whole family sends lines and circles to lines and circles, treating a line as a circle through $\infty$. They preserve angles and the [[cross-ratio|cross-ratio]], three points can be sent to any other three in exactly one way, and $c = 0$ recovers the affine maps $z \mapsto \alpha z + \beta$.`,
          keywords: ["mobius transformation", "möbius", "linear fractional transformation", "(az+b)/(cz+d)", "extended complex plane", "circles to circles", "conformal", "cross ratio preserved", "three points determine it", "riemann sphere", "inversion as a map"],
          importance: "lowest",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "pole-polar",
          name: "Pole, Polar & Harmonic Division",
          latex: String.raw`\text{polar of } P = \text{chord of contact } AB \qquad (X, Y;\, P, Q) = -1`,
          description: String.raw`The polar of a point $P$ with respect to a circle packages all of $P$'s tangent–secant data into one line: when $P$ is outside, its polar is the chord of contact $AB$ joining the two tangency points. Duality (La Hire): $P$ lies on the polar of $Q$ iff $Q$ lies on the polar of $P$ — so "these three points are collinear / these three lines concur" collapses to a one-line pole–polar statement. Every secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ yields the harmonic bundle $(X, Y; P, Q) = -1$, which is exactly what a tangents-and-secants figure produces, trivializing problems that would otherwise be pages of trig.`,
          keywords: ["pole polar", "polar line", "chord of contact", "harmonic division", "harmonic conjugate", "cross ratio", "la hire", "projective geometry"],
          importance: "medium",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "cross-ratio",
          name: "Cross-Ratio",
          latex: String.raw`(A, B; C, D) = \frac{AC}{BC} \Big/ \frac{AD}{BD} = \frac{AC \cdot BD}{BC \cdot AD}`,
          description: String.raw`The cross-ratio of four collinear points is the single number preserved by every projection and perspectivity — the fundamental invariant of projective geometry. It is also unchanged when the four points are replaced by four concurrent lines (angular cross-ratio), is preserved by inversion, and is the same for four concyclic points seen from any fifth point of the circle. Since projection destroys lengths and angles but never the cross-ratio, chasing points through several projections reduces to holding one quantity fixed. The value $-1$ is the harmonic case.`,
          keywords: ["cross ratio", "projective invariant", "four collinear points", "preserved by projection", "anharmonic ratio", "pencil of lines", "concyclic cross ratio"],
          importance: "high",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "harmonic-bundle",
          name: "Harmonic Bundles & Conjugates",
          latex: String.raw`(A, B; C, D) = -1 \iff \frac{AC}{CB} = \frac{AD}{DB}\;\text{(one internal, one external)}`,
          description: String.raw`A harmonic bundle is the [[cross-ratio|cross-ratio]] $-1$ case: $C$ and $D$ are harmonic conjugates with respect to $A, B$, dividing $AB$ internally and externally in the same ratio. They are everywhere in olympiad configurations: two tangents and any secant from an external point cut a harmonic bundle with the polar; the internal and external bisectors from a vertex meet the opposite side at harmonic conjugates; a complete quadrilateral induces harmonic bundles on its diagonals. Midpoint criterion: if $M$ is the midpoint of $AB$ then $(A,B;C,D) = -1 \iff MA^2 = MC\cdot MD$.`,
          keywords: ["harmonic bundle", "harmonic conjugate", "cross ratio -1", "harmonic division", "internal external bisector", "polar", "complete quadrilateral", "harmonic range"],
          importance: "medium",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "harmonic-quadrilateral",
          name: "Harmonic Quadrilaterals & the Symmedian in a Circle",
          latex: String.raw`\frac{BD}{CD} = \frac{AB}{AC} \iff AD \text{ is the } A\text{-symmedian}, \qquad \frac{BE}{CE} = \left(\frac{AB}{AC}\right)^{2} \;\; (E = AD \cap BC)`,
          description: String.raw`The tangents to the circumcircle at $B$ and $C$ meet at the pole $X$ of $BC$, and $AX$ is the $A$-symmedian. Extending it to meet the circle again at $D$ makes $ABDC$ a harmonic quadrilateral, meaning $AB \cdot CD = AC \cdot BD$. The engine is a pair of similar triangles: $XB = XC$ as tangent lengths and $XB^2 = XA \cdot XD$ by [[power-of-a-point|power of a point]], so $\triangle XBA \sim \triangle XDB$ and $\triangle XCA \sim \triangle XDC$. Both proportions run in both directions, so either one is a test for the symmedian rather than just a consequence of it.`,
          keywords: ["harmonic quadrilateral", "symmedian in a circle", "tangents meet on the symmedian", "pole of BC", "BD/CD = AB/AC", "similar triangles from tangents", "power of a point symmedian", "AB*CD = AC*BD", "second intersection of the symmedian"],
          importance: "low",
          tier: "AIME Late",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "complete-quadrilateral-miquel",
          name: "Miquel Point of a Complete Quadrilateral",
          latex: String.raw`\text{the 4 circumcircles of a complete quadrilateral meet at one point } M`,
          description: String.raw`Four lines in general position make six intersection points and four triangles, one per choice of three lines. The circumcircles of those four triangles all pass through a single point $M$, the Miquel point.`,
          keywords: ["complete quadrilateral", "miquel point", "four circumcircles", "spiral similarity center", "four lines", "newton gauss line", "concyclic circumcenters", "miquel"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        },
        {
          id: "brocards-theorem",
          name: "Brocard's Theorem",
          latex: String.raw`O \text{ is the orthocenter of } \triangle EFG, \qquad EF^2 = EO^2 + FO^2 - 2R^2`,
          description: String.raw`In a cyclic quadrilateral $ABCD$ with circumcenter $O$ and circumradius $R$, let $E = AB \cap CD$, $F = AD \cap BC$, and $G = AC \cap BD$. Then $O$ is the orthocenter of triangle $EFG$: each of the three points is the pole of the line through the other two, so $OE \perp FG$, $OF \perp EG$, and $OG \perp EF$. It also gives the length $EF^2 = EA \cdot EB + FA \cdot FD$.`,
          keywords: ["brocard theorem", "diagonal triangle", "self polar triangle", "cyclic quadrilateral orthocenter", "circumcenter is orthocenter", "opposite sides and diagonals", "poles of the diagonal points", "conjugate points", "complete quadrilateral inscribed in a circle"],
          importance: "lower",
          tier: "Olympiad",
          level: ["Olympiad"]
        }
      ]
    }
  ]
});
