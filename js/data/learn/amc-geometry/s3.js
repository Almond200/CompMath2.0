// Learn, AMC Geometry, chapter S3: similar triangles and area ratios (CONVENTIONS §14). Part: Core topics.
// Similarity and area ratios derived from corresponding parts, parallel constructions and weighted points.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S3"] = {
  lessons: {
    "S3.1": {
      prereq: ["parallel-exterior-angles", "triangle-area-standard"],
      cards: [],
      body: String.raw`Similarity connects angle information to length ratios. Two figures are similar when a uniform scaling, followed if necessary by a translation, rotation or reflection, takes one onto the other. Every length then changes by the same positive factor. A drawing of one triangle inside another does not itself establish this relationship; matching angles or proportional sides supply the reason.

Suppose a vertical six-foot person and a vertical tree cast shadows of lengths four and twenty on the same level ground at the same time. The sunlight has the same direction at both locations, so the two right triangles have a matching acute angle. Their corresponding heights and shadow lengths have equal ratios, giving tree height $20\cdot6/4=30$ feet. Sloping ground or differently tilted objects would require checking that same triangle model again.

Uniform scaling has a second consequence: if every length is multiplied by three, both base and height of a triangle are multiplied by three, so its area is multiplied by nine. Midpoints create a scale factor of one half, while cevians and angle bisectors create ratios that can be read through areas even when the pieces are not similar. The chapter develops these connections with the vertex correspondences and the constructions that justify them.`,
      exercises: [
        { q: String.raw`A person $6$ feet tall casts a shadow $4$ feet long. The person and a vertical tree stand on the same level ground. At the same time the tree casts a shadow $20$ feet long. How tall is the tree, in feet?`, answer: "30",
          solution: String.raw`The vertical person and tree meet the level ground at right angles, and the simultaneous sunlight gives equal acute angles at the shadow tips. Thus their triangles are AA-similar. Corresponding heights and shadow lengths satisfy $h/20=6/4$, so $h=30$ feet. The common ground and sunlight assumptions establish the model before the proportion is used.` },
        { q: String.raw`A figure is enlarged so that every length is multiplied by $3$. By what factor is its area multiplied?`, answer: "9",
          solution: String.raw`Uniform enlargement multiplies both a triangle's base and its perpendicular height by three. Its area is therefore multiplied by $3\cdot3=9$. A figure can be decomposed into such pieces, whose areas all acquire the same factor, so the full area also changes by nine. The length factor three is not the area factor.` },
        { q: String.raw`A triangle has a side of length $14$. How long is the segment joining the midpoints of the other two sides?`, answer: "7",
          solution: String.raw`The two midpoint-to-vertex ratios are both one half, and the included angle at their common vertex is unchanged. SAS similarity makes the smaller triangle similar to the whole at scale one half. The joining segment is therefore parallel to the third side and has half its length, $14/2=7$.` }
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
      body: String.raw`For similar triangles, corresponding angles are equal and corresponding sides are proportional. The correspondence is part of the statement: $\triangle ADE\sim\triangle ABC$ matches $A$ with $A$, $D$ with $B$ and $E$ with $C$. A side joining two matched vertices corresponds to the side joining their partners. Write one consistent order before forming ratios, especially when a smaller triangle is reflected or rotated in the diagram.

The [[triangle-similarity|similarity criteria]] follow by scaling and then using congruence. If two pairs of angles match (AA), the third pair also matches by the triangle sum. Scale one triangle so a corresponding side matches, and ASA makes the resulting triangles congruent. If two corresponding sides are proportional and their included angles agree (SAS similarity), scale to match those two sides and use SAS congruence. If all three corresponding sides are proportional (SSS similarity), the same scaling gives SSS congruence. Two proportional sides with an arbitrary nonincluded angle do not constitute one of these criteria.

Parallel lines often expose AA. If $D$ lies strictly between $A$ and $B$, $E$ strictly between $A$ and $C$, and $DE\parallel BC$, the angle at $A$ is common and alternate or corresponding angles match at $D,B$ and $E,C$. Thus

$$\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}.$$

With $AD=4$, $DB=2$ and $BC=12$, the whole side is $AB=6$, so the common ratio is $2/3$ and $DE=8$. The denominator is the complete corresponding side $AB$, not the leftover segment $DB$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 330" role="img" aria-label="Matching vertices give one common side ratio" style="width:100%;max-width:520px;height:auto"><title>Matching vertices give one common side ratio</title><path d="M193.333 95.311L100 235H436Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M193.333 95.311L131.111 188.437H355.111Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M232 184l6 4-6 4M232 231l6 4-6 4"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="193" y="76">A</text><text x="82" y="254">B</text><text x="452" y="254">C</text><text x="112" y="184">D</text><text x="372" y="184">E</text><text x="142" y="138">4</text><text x="95" y="211">2</text><text x="268" y="259">12</text><text x="275" y="174">8</text><text x="260" y="315">AD/AB = 4/6 = DE/BC = 8/12.</text></g></svg>

Right angles are another source of similarity, but one matching right angle alone is insufficient: every right triangle has one. Let $ABC$ be right at $A$, with $AB=6$, $AC=8$, $BC=10$, and drop $AH$ perpendicular to $BC$. Triangles $ABH$ and $CBA$ share the angle at $B$ and have right angles at $H$ and $A$, so $\triangle ABH\sim\triangle CBA$. In this order, $AB$ corresponds to $CB$ and $AH$ to $CA$. Therefore $h/8=6/10$, giving $h=24/5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 350" role="img" aria-label="The altitude to a hypotenuse makes similar right triangles" style="width:100%;max-width:520px;height:auto"><title>The altitude to a hypotenuse makes similar right triangles</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M100 80V260L340 80Z"/><path d="M100 80L186.4 195.2"/><path d="M100 92H112V80M181 188L173.8 193.4L179.2 200.6" stroke-width="1"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="82" y="91">A</text><text x="82" y="279">B</text><text x="359" y="85">C</text><text x="205" y="211">H</text><text x="80" y="190">6</text><text x="220" y="63">8</text><text x="245" y="185">10</text><text x="124" y="150">h</text><text x="260" y="315">△ABH ∼ △CBA: h/6 = 8/10.</text><text x="260" y="341">The height is h = 24/5.</text></g></svg>

The area check uses the same triangle with two bases: $\tfrac12\cdot6\cdot8=\tfrac12\cdot10h$. It gives the same height, but the similarity proof explains why the side proportions work. Writing the matching vertices protects against comparing a leg of one triangle with the wrong leg or hypotenuse of the other.

Uniformly [[similar-figures-ratios|similar figures]] have lengths, including perimeters, in ratio $k$. Every triangle in a triangulation has its base and height scaled by $k$, so its area scales by $k^2$; adding the pieces proves the same for a polygon. Circles have the same law from $\pi r^2$. Three-dimensional volume scales by $k^3$, because each of three perpendicular dimensions contributes one factor; slicing or decomposing gives the same result for more general solids.

Consequently triangles with areas sixteen and twenty-five have positive length ratio $4/5$, and perimeters twenty and twenty-five are consistent with that ratio. To recover a length ratio from an area ratio, take its positive square root; from a volume ratio, take a positive cube root. Doubling every edge of a cube multiplies volume by eight, whereas doubling only one dimension produces a different, generally nonsimilar solid. Equal angles in arbitrary polygons do not by themselves establish similarity: rectangles of different aspect ratios are an example.`,
      related: [
        { card: "altitude-hypotenuse", note: String.raw`the lengths that the altitude to the hypotenuse creates (S4.3).` },
        { card: "triangle-congruence", note: String.raw`the special case of ratio $1$ (S1.3).` },
        { card: "inscribed-angle-theorem", note: String.raw`equal angles in circles, a common source of similar triangles (S5.3).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, points $D$ on $AB$ and $E$ on $AC$ make $DE \parallel BC$. If $AD = 4$, $DB = 2$ and $BC = 12$, how long is $DE$?`, answer: "8",
          solution: String.raw`Because $DE\parallel BC$, corresponding angles at $D,B$ agree and the angle at $A$ is common, so $\triangle ADE\sim\triangle ABC$. The complete side $AB=AD+DB=6$. The common length factor is $AD/AB=4/6=2/3$, giving $DE=(2/3)BC=8$. Using $AD/DB$ would compare a piece with the leftover segment rather than with its corresponding full side.` },
        { q: String.raw`Two similar triangles have areas $16$ and $25$. The smaller has perimeter $20$. What is the perimeter of the larger?`, answer: "25",
          solution: String.raw`Let $k$ be the larger-to-smaller length factor. Similarity gives area factor $k^2=25/16$, hence the positive length factor is $k=5/4$. Every perimeter term scales by that same factor, so the larger perimeter is $20\cdot5/4=25$.` },
        { q: String.raw`A right triangle has legs $6$ and $8$. How long is the altitude to its hypotenuse?`, answer: "24/5",
          solution: String.raw`Name the right-angle vertex $A$, with $AB=6$, $AC=8$, and let the altitude meet $BC$ at $H$. Pythagoras gives $BC=10$. The triangles $ABH$ and $CBA$ are AA-similar, with $AB\leftrightarrow CB$ and $AH\leftrightarrow CA$. Hence $AH/8=6/10$, giving $AH=24/5$. A separate area calculation verifies $\tfrac12\cdot6\cdot8=24=\tfrac12\cdot10\cdot24/5$.` },
        { q: String.raw`Every edge of a cube is doubled. By what factor is its volume multiplied?`, answer: "8",
          solution: String.raw`If the old cube side is $s$, its volume is $s^3$. The new side is $2s$, so its volume is $(2s)^3=8s^3$. Every dimension is scaled, giving a volume factor of eight; the corresponding surface-area factor would be four.` }
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
      body: String.raw`A useful parallel is sometimes an auxiliary construction rather than a given line. Suppose a point $D$ on $AB$ specifies a ratio, and a related length on $AC$ is needed. Draw through $D$ the line parallel to $BC$, meeting $AC$ at $E$. This [[parallel-line-similarity|parallel construction]] creates AA-similar triangles $ADE$ and $ABC$, transferring $AD/AB$ to $AE/AC$ and $DE/BC$. The new line should connect the known ratio to the desired segment; its purpose is the resulting correspondence.

For interior points write $AD/AB=AE/AC=t$, where $0\lt t\lt1$. The leftover segments satisfy $DB=(1-t)AB$ and $EC=(1-t)AC$, so

$$\frac{AD}{DB}=\frac{AE}{EC}=\frac{t}{1-t}.$$

This is the [[intercept-theorem|intercept theorem]] in part-to-part form. Its converse needs the same interior-point order. If $AD/DB=AE/EC$, converting to part-to-whole ratios gives $AD/AB=AE/AC$. The parallel through $D$ meets $AC$ at a point with that same ratio, hence it is $E$, proving $DE\parallel BC$. Without the interior-point convention, unsigned lengths on extensions may lose information about directions.

For example, $AD:DB=3:2$ means $AD/AB=3/5$, not $3/2$. If $AE=6$, the same part-to-part ratio gives $AE:EC=3:2$, so $EC=4$ and $AC=10$. Several parallel lines cutting two transversals similarly give proportional corresponding intervals: measure the intersections along each transversal from a common meeting point and subtract the proportional distances. If the transversals are parallel rather than meeting, the strips can be cut into congruent translated pieces to give the same interval-ratio conclusion.

Midpoints make the scale factor especially simple, but their parallelism still needs proof. Let $D,E$ be the midpoints of $AB,AC$. The sides adjacent to the common angle at $A$ have equal ratios $AD/AB=AE/AC=1/2$. SAS similarity gives $\triangle ADE\sim\triangle ABC$, hence $DE=BC/2$ and the equal corresponding angles prove $DE\parallel BC$. This establishes the [[midsegment-theorem|midsegment theorem]] without assuming the desired parallel line first.

All three midsegments form the medial triangle. Each side is half a side of the original, so its perimeter is half, and its area one quarter. The four small triangles produced by the midsegments each have side lengths equal to half the three original side lengths, so SSS makes them congruent, possibly after reflection. A triangle of perimeter thirty therefore has medial perimeter fifteen.

The same construction explains the quadrilateral midpoint pattern. If $M,N,P,Q$ are the successive side midpoints of a quadrilateral $ABCD$, triangles $ABC$ and $CDA$ give $MN\parallel AC$ and $QP\parallel AC$, each of length $AC/2$. The other two sides follow $BD$ in the same way. Thus the midpoint figure is a parallelogram; it is not necessarily a rectangle or rhombus. The diagonals of the original figure decide those additional properties.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="Midsegments explain the midpoint parallelogram" style="width:100%;max-width:520px;height:auto"><title>Midsegments explain the midpoint parallelogram</title><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M100 100L380 70L440 270L70 300Z"/><path d="M100 100L440 270M380 70L70 300" stroke-dasharray="5 4" opacity=".5"/><path d="M240 85L410 170L255 285L85 200Z" stroke-width="1.8"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="86" y="97">A</text><text x="397" y="63">B</text><text x="455" y="283">C</text><text x="52" y="314">D</text><text x="240" y="68">M</text><text x="428" y="170">N</text><text x="255" y="310">P</text><text x="68" y="203">Q</text><text x="260" y="360">Midpoint sides follow the two diagonals.</text></g></svg>

Repeated constructions require the right scale at each step. Joining a square's side midpoints creates a square whose diagonal equals the previous side. Its side factor is $1/\sqrt2$ by Pythagoras, so its area factor is $1/2$. Starting with area sixteen, the successive areas are sixteen, eight, four and two; the fourth square is two because the original is counted as the first.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 420" role="img" aria-label="Midpoint squares halve area at every step" style="width:100%;max-width:520px;height:auto"><title>Midpoint squares halve area at every step</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M110 60H410V360H110Z"/><path d="M260 60L410 210L260 360L110 210Z"/><path d="M185 135H335V285H185Z"/><path d="M260 135L335 210L260 285L185 210Z"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="392" y="90">16</text><text x="260" y="91">8</text><text x="318" y="156">4</text><text x="260" y="216">2</text><text x="260" y="402">Outer square is first: areas 16, 8, 4, 2.</text></g></svg>

For [[nested-similar|nested similar figures]] with fixed length factor $0\lt k\lt1$, the $n$th area is $A_0k^{2n}$ when the original has index zero. The sum of the first $N$ listed areas is $A_0(1-k^{2N})/(1-k^2)$, and the infinite sum is $A_0/(1-k^2)$. These nested regions overlap, so that sum counts area with multiplicity; their union is just the outer region. By contrast, consecutive rings between nested boundaries have disjoint interiors and their areas telescope to the outer area as the inner figure shrinks away.`,
      related: [
        { card: "mass-points", note: String.raw`ratios along cevians without drawing parallels (S3.5).` },
        { card: "varignons-theorem", note: String.raw`the midpoint parallelogram of a quadrilateral (S10.5).` },
        { card: "geometric-series", note: String.raw`the total of the areas of nested figures.` }
      ],
      exercises: [
        { q: String.raw`A triangle has perimeter $30$. What is the perimeter of the triangle whose corners are the midpoints of its sides?`, answer: "15",
          solution: String.raw`Each new side joins two midpoints and is half the parallel original side. Adding all three half-lengths gives half the original perimeter, $30/2=15$. The new area would be a quarter of the original, but perimeter is a length measurement and uses the unsquared factor.` },
        { q: String.raw`In triangle $ABC$ a line parallel to $BC$ meets $AB$ at $D$ and $AC$ at $E$, with $\tfrac{AD}{DB} = \tfrac32$ and $AE = 6$. How long is $EC$?`, answer: "4",
          solution: String.raw`The given parallel makes the two side divisions proportional: $AD/DB=AE/EC=3/2$. Since $AE=6$, solving $6/EC=3/2$ gives $EC=4$. As a check, the part-to-whole ratios are $AD/AB=3/5$ and $AE/AC=6/(6+4)=3/5$.` },
        { q: String.raw`A square has area $16$. Joining the midpoints of its sides makes a second square, joining the second's midpoints a third, and so on. What is the area of the fourth square?`, answer: "2",
          solution: String.raw`A midpoint square has half the area of the previous square: its diagonal equals the previous side, so its side factor is $1/\sqrt2$ and area factor $1/2$. Counting the original as the first square gives areas sixteen, eight, four and two. Thus the fourth has area two, after three reductions.` }
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
      body: String.raw`Area ratios can preserve a useful relationship even when the triangles have different shapes. Write $[XYZ]$ for the ordinary, nonnegative area of triangle $XYZ$. The formula $[XYZ]=\tfrac12 bh$ lets either the base or the height cancel, provided the other factor is shared.

If $D$ is strictly inside side $BC$ of triangle $ABC$, triangles $ABD$ and $ACD$ have the same perpendicular height from $A$ to line $BC$. Thus their areas have ratio $BD:DC$. This [[cevian-area-ratio|cevian area ratio]] gives $[ABD]=12$ and $[ACD]=18$ when $[ABC]=30$ and $BD:DC=2:3$. The area of one piece is $2/5$ of the whole, not $2/3$; part-to-part and part-to-whole ratios answer different questions.

Conversely, triangles on the same positive base have areas in the ratio of their perpendicular heights. This [[same-base-area-ratio|common-base comparison]] can transfer a ratio along a sloping line. In a convex quadrilateral let diagonals $AC$ and $BD$ meet at $P$. The perpendicular distances of $A,C$ to line $BD$ are $AP\sin\theta$ and $CP\sin\theta$, using the angle between the diagonal lines. Therefore $[ABD]/[CBD]=AP/CP$. The triangles lie on opposite sides of the base, but their ordinary areas use positive distances; oriented signs are unnecessary for this ratio.

When two side fractions are involved, use two common-height steps. Let $X$ lie on $AB$ and $Y$ on $AC$. Triangles $ABY$ and $ABC$ share the height from $B$ to line $AC$, so $[ABY]/[ABC]=AY/AC$. Triangles $AXY$ and $ABY$ share the height from $Y$ to line $AB$, so $[AXY]/[ABY]=AX/AB$. Multiplying gives the [[shared-angle-area-ratio|shared-angle area ratio]]

$$\frac{[AXY]}{[ABC]}=\frac{AX}{AB}\frac{AY}{AC}.$$

For fractions one third and one half, the corner triangle has one sixth of the whole area, or five out of thirty. These unequal side fractions do not give similar triangles. Multiplying the two separate fractions is justified by the two height cancellations, rather than by squaring one guessed scale factor.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-label="A shared angle multiplies two independent side fractions" style="width:100%;max-width:520px;height:auto"><title>A shared angle multiplies two independent side fractions</title><path d="M90 60V300H450Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M90 60V140L270 180Z" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1.5"/><path d="M90 300L270 180" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="90" y="42">A</text><text x="73" y="320">B</text><text x="467" y="320">C</text><text x="73" y="143">X</text><text x="288" y="180">Y</text><text x="45" y="106">⅓ AB</text><text x="211" y="119">½ AC</text><text x="150" y="127">5</text><text x="260" y="354">Unequal side fractions: area ratio ⅓ · ½ = ⅙.</text></g></svg>

The trigonometric area formula gives the same product ratio whenever the included angles agree, since their sine factors cancel. Supplementary included angles also have the same sine and give the same ratio of positive areas. This version can handle extended rays, but an area subtraction for a containing region still requires checking which triangles overlap and which are outside.

The incenter supplies a different common-height construction. The internal angle bisectors of a triangle meet at $I$, the incenter. A point on an internal bisector is equally distant from its two side lines: dropping perpendiculars gives right triangles with common hypotenuse and matching acute angles. Intersecting two internal bisectors therefore gives equal distances to all three sides, and the point also lies on the third internal bisector. Denote that common perpendicular distance by $r$.

Joining $I$ to the vertices partitions the triangle into three pieces. Over sides $a=BC$, $b=CA$, $c=AB$, the areas are $ar/2$, $br/2$, $cr/2$. Hence the [[incenter-area-split|incenter area split]] is in ratio $a:b:c$, not necessarily into equal thirds. In the thirteen-fourteen-fifteen triangle of area eighty-four, the piece over side fourteen is $84\cdot14/42=28$. The other two areas are thirty and twenty-six.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" role="img" aria-label="Equal incenter distances make area proportional to side length" style="width:100%;max-width:520px;height:auto"><title>Equal incenter distances make area proportional to side length</title><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M200 79L110 295H362Z"/><path d="M200 79L218 223L110 295M218 223L362 295"/><path d="M218 223V295M218 223L151.538 195.308M218 223L275.6 179.8" stroke-dasharray="5 4"/><path d="M218 285H228V295"/></g><circle cx="218" cy="223" r="3" fill="currentColor"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="200" y="60">A</text><text x="92" y="314">B</text><text x="379" y="314">C</text><text x="206" y="245">I</text><text x="137" y="181">13</text><text x="301" y="181">15</text><text x="260" y="320">14</text><text x="164" y="234">26</text><text x="282" y="236">30</text><text x="262" y="279">28</text><text x="181" y="192">r</text><text x="256" y="184">r</text><text x="231" y="262">r</text><text x="260" y="367">Areas 26 : 28 : 30 follow bases 13 : 14 : 15.</text></g></svg>

Adding the three areas also gives $[ABC]=r(a+b+c)/2$, linking the inradius to the semiperimeter. Here $r=84/21=4$. The equal-distance property of the incenter is essential; an arbitrary interior point, or the centroid in a general triangle, does not have equal heights to all three sides.`,
      related: [
        { card: "trig-area", note: String.raw`the area $\tfrac12 ab\sin C$ behind the shared-angle ratio (S4.6).` },
        { card: "inradius-area", note: String.raw`the same split added up: area equals $r$ times half the perimeter (S4.5).` },
        { card: "area-by-pieces", note: String.raw`assembling the region asked for from the pieces (S1.4).` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has area $30$, and $D$ on $BC$ has $BD : DC = 2 : 3$. What is the area of triangle $ABD$?`, answer: "12",
          solution: String.raw`The two triangles $ABD$ and $ACD$ share the perpendicular height from $A$ to $BC$, so their areas have ratio $BD:DC=2:3$. The whole area thirty consists of five equal ratio-parts, and $ABD$ occupies two of them. Therefore $[ABD]=(2/5)30=12$.` },
        { q: String.raw`Triangle $ABC$ has area $30$. Point $X$ on $AB$ has $AX = \tfrac13 AB$, and $Y$ on $AC$ has $AY = \tfrac12 AC$. What is the area of triangle $AXY$?`, answer: "5",
          solution: String.raw`Compare through the intermediate triangle $ABY$. Its area is $AY/AC=1/2$ of $ABC$ because those triangles share a height to line $AC$. Then $AXY$ is $AX/AB=1/3$ of $ABY$, sharing its height to line $AB$. Multiplication gives $[AXY]/[ABC]=(1/3)(1/2)=1/6$, so the area is five. The two side fractions differ, so the small and large triangles are not being assumed similar.` },
        { q: String.raw`The diagonals of convex quadrilateral $ABCD$ meet at $P$ with $AP : PC = 1 : 2$. What is the ratio of the area of triangle $ABD$ to that of triangle $CBD$?`, answer: "1/2",
          solution: String.raw`Use the common base $BD$. The perpendicular distances of $A$ and $C$ to its line are proportional to $AP$ and $CP$, since these two segments lie on one diagonal through $P$ and make supplementary angles with the base line. Their sine factors are equal, so the height ratio is $AP:CP=1:2$. Canceling the common base in the area formula gives $[ABD]/[CBD]=1/2$.` },
        { q: String.raw`Triangle $ABC$ has sides $AB = 13$, $BC = 14$, $CA = 15$ and area $84$, and $I$ is its incenter. What is the area of triangle $BIC$?`, answer: "28",
          solution: String.raw`Drop perpendiculars from the incenter $I$ to all three sides; their lengths are the common inradius $r$. Thus $[BIC]:[CIA]:[AIB]=BC:CA:AB=14:15:13$. The sum of the side-ratio parts is forty-two, so $[BIC]=84\cdot14/42=28$. The equal heights, rather than similarity of these three triangles, justify the ratio.` }
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
      body: String.raw`A ratio obtained from angles can locate a point on a side, and a side ratio can then locate an intersection of cevians. The connection is clearest when each step states what is being divided and why the ratio applies.

Let the internal bisector of $\angle A$ meet $BC$ at $D$. The triangles $ABD$ and $ACD$ have area ratio $BD/DC$ from their common height to $BC$. Their heights from $D$ to lines $AB,AC$ are equal because $D$ lies on the internal bisector, so their area ratio is also $AB/AC$. Equating the two expressions proves the [[angle-bisector-theorem|angle bisector theorem]]

$$\frac{BD}{DC}=\frac{AB}{AC}.$$

With $AB=6$, $AC=9$, $BC=10$, the side split is $2:3$, so $BD=4$ and $DC=6$. The theorem does not say that the bisector is a median: it reaches the midpoint only when the adjacent sides are equal. It also concerns an angle bisector, not an altitude or an arbitrary segment from the same vertex.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 375" role="img" aria-label="An angle bisector divides the opposite side in the adjacent-side ratio" style="width:100%;max-width:520px;height:auto"><title>An angle bisector divides the opposite side in the adjacent-side ratio</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M182.5 120.019L100 280H400Z"/><path d="M182.5 120.019L220 280"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="182" y="99">A</text><text x="82" y="302">B</text><text x="419" y="302">C</text><text x="220" y="302">D</text><text x="126" y="200">6</text><text x="305" y="192">9</text><text x="160" y="306">4</text><text x="310" y="306">6</text><text x="178" y="166">α</text><text x="208" y="157">α</text><text x="260" y="355">BD : DC = AB : AC = 2 : 3.</text></g></svg>

Medians have a different symmetry. If $M=(B+C)/2$ is the midpoint of $BC$, the point $G=(A+B+C)/3$ can be written $G=A/3+2M/3$. Thus it lies two thirds of the way from $A$ to $M$, giving $AG:GM=2:1$. The same symmetric expression works for the other two medians, proving that all three meet at this one point. This establishes the [[centroid-division|centroid division]] and coordinate average together. A median of length twelve has vertex-to-centroid length eight, with four remaining to its midpoint.

The centroid's perpendicular height above any side is one third of the opposite vertex's height, because its coordinate is one third that vertex plus two thirds a point on the side line. So the three triangles joining $G$ to the original sides each have one third of the whole area. A midpoint divides each of those pieces in half, giving six equal small triangle areas. Equal areas do not imply the six triangles are congruent in an arbitrary triangle.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="The centroid divides medians two to one and makes six equal areas" style="width:100%;max-width:520px;height:auto"><title>The centroid divides medians two to one and makes six equal areas</title><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M220 60L90 290H430Z"/><path d="M220 60L260 290M90 290L325 175M430 290L155 175"/></g><circle cx="246.667" cy="213.333" r="3" fill="currentColor"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="220" y="40">A</text><text x="72" y="309">B</text><text x="448" y="309">C</text><text x="260" y="313">M</text><text x="342" y="174">N</text><text x="137" y="174">L</text><text x="226" y="190">G</text><text x="207" y="153">1</text><text x="264" y="153">1</text><text x="164" y="230">1</text><text x="199" y="268">1</text><text x="312" y="268">1</text><text x="334" y="230">1</text><text x="260" y="349">Each marked part is one sixth of the whole area.</text><text x="260" y="375">AG : GM = BG : GN = CG : GL = 2 : 1.</text></g></svg>

The same weighted-average idea works for unequal divisions and explains [[mass-points|mass points]]. For positive weights $m_B,m_C$ at $B,C$, the point

$$D=\frac{m_BB+m_CC}{m_B+m_C}$$

lies on $BC$ with $BD/DC=m_C/m_B$. Indeed, subtracting $B$ gives $D-B=(m_C/(m_B+m_C))(C-B)$, so its fraction of the complete segment is exactly known. Assign the combined weight $m_D=m_B+m_C$ to this point. Adding a positive weight $m_A$ at $A$ then gives

$$P=\frac{m_AA+m_BB+m_CC}{m_A+m_B+m_C}=\frac{m_AA+m_DD}{m_A+m_D}.$$

Therefore $P$ lies on $AD$ and $AP/PD=m_D/m_A$. If another side point $E$ is the weighted average of $A,C$ using those same vertex weights, regrouping the same numerator also puts $P$ on $BE$. No physical balancing assumption is needed: the coordinate identity proves that the two cevians have the same crossing point. Multiplying all weights by the same positive constant changes no point or ratio.

For example, let $D$ be the midpoint of $BC$ and let $AE:EC=2:1$. The midpoint requires $m_B=m_C$, while the second ratio requires $m_A:m_C=1:2$. Choose $m_A=1$, $m_B=m_C=2$. Then $m_D=4$, $m_E=3$ and the common point has $AP:PD=4:1$ and $BP:PE=3:2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" role="img" aria-label="Weighted vertex averages locate the same crossing point on two cevians" style="width:100%;max-width:520px;height:auto"><title>Weighted vertex averages locate the same crossing point on two cevians</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M220 60L90 290H430Z"/><path d="M220 60L260 290M90 290L360 213.333"/></g><circle cx="252" cy="244" r="3" fill="currentColor"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="220" y="38">A · 1</text><text x="76" y="315">B · 2</text><text x="448" y="315">C · 2</text><text x="260" y="315">D · 4</text><text x="387" y="205">E · 3</text><text x="236" y="236">P</text><text x="260" y="350">Masses A : B : C = 1 : 2 : 2.</text><text x="260" y="374">AP : PD = 4 : 1 and BP : PE = 3 : 2.</text></g></svg>

The weights on the three vertices must be consistent with every side ratio being used. Their sums belong at the side points, and segment ratios reverse the endpoint weights. Positive weights describe internal division and put the weighted point inside the triangle. External intersections require directed or signed ratios and are outside this positive-weight version. An arbitrary third cevian is not guaranteed to pass through the same point; its foot must have the ratio imposed by the same vertex weights. Choosing coordinates or drawing parallels can check the result when a mass assignment is uncertain.`,
      related: [
        { card: "angle-bisector-length", note: String.raw`the length of the bisector itself (S9.3).` },
        { card: "cevas-theorem", note: String.raw`when three cevians meet at one point (S9.3).` },
        { card: "section-formula", note: String.raw`the point dividing a segment in a ratio, in coordinates (S7.2).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 9$ and $BC = 10$. The bisector of angle $A$ meets $BC$ at $D$. How long is $BD$?`, answer: "4",
          solution: String.raw`The internal angle bisector divides $BC$ in the ratio of the adjacent sides: $BD:DC=AB:AC=6:9=2:3$. Since $BC=10$, two out of the five ratio-parts have length $BD=(2/5)10=4$. The remaining six gives $4:6=2:3$, checking both the ratio and the whole side.` },
        { q: String.raw`A median of a triangle has length $12$. How far is the centroid from the corner at which the median starts?`, answer: "8",
          solution: String.raw`The centroid divides a median in the ratio vertex-to-centroid to centroid-to-midpoint $2:1$. Thus the requested vertex-to-centroid distance is two thirds of the full median, $(2/3)12=8$. Four units remain to its midpoint, so the two distances add to twelve.` },
        { q: String.raw`In triangle $ABC$, $D$ is the midpoint of $BC$ and $E$ is on $AC$ with $AE : EC = 2 : 1$. Segments $AD$ and $BE$ meet at $P$. What is $\tfrac{AP}{PD}$?`, answer: "4",
          solution: String.raw`Let weights at $A,B,C$ be $m_A,m_B,m_C$. The ratio $AE:EC=2:1$ needs inverse endpoint weights $m_A:m_C=1:2$. The midpoint $D$ needs $m_B=m_C$, so choose $1,2,2$. The combined weight at $D$ is four. Regrouping the weighted point $P=(A+2B+2C)/5=(A+4D)/5$ shows that it lies four fifths of the way from $A$ to $D$. Consequently $AP/PD=(4/5)/(1/5)=4$.` },
        { q: String.raw`In triangle $ABC$, $D$ is the midpoint of $BC$ and $E$ lies on $AC$ with $AE:EC=2:1$. Segments $AD$ and $BE$ meet at $P$. What is $\tfrac{BP}{PE}$?`, answer: "3/2",
          solution: String.raw`Use consistent weights $m_A=1,m_B=2,m_C=2$. Point $E$ on $AC$ has combined weight $m_E=3$, and $P=(2B+3E)/5$. Therefore $BP=(3/5)BE$ and $PE=(2/5)BE$, so $BP/PE=3/2$. The ratio is inverse to the endpoint weights; using the weight ratio $2/3$ in the same direction would reverse the result.` }
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
      body: String.raw`A similarity argument begins with a justified correspondence. Matching angles, or proportional sides with the appropriate congruence-based criterion, produce one common positive length factor. Perimeters use that factor, areas its square, and volumes its cube; a partial change in dimensions need not preserve similarity.

Parallel constructions transfer ratios between sides, but distinguish a piece-to-piece ratio from a piece-to-whole ratio. Midsegment parallelism follows from SAS similarity, and the midpoint patterns of triangles and quadrilaterals follow from that theorem. Repeated constructions require a clear starting index. Sums of overlapping nested areas count with multiplicity, whereas disjoint rings describe an ordinary partition.

Area comparisons often work without similarity. A common height cancels when comparing bases; a common base cancels when comparing heights. Two side fractions about a shared angle multiply, even if they differ. The incenter's three equal perpendicular distances make its area pieces proportional to the side lengths.

An internal bisector turns its equal-distance property into the adjacent-side ratio. Medians instead meet at the coordinate average, two thirds of the way from each vertex, and divide the area into six equal parts. Consistent positive weights extend that average to general crossing cevians: side weights add, segment ratios reverse the endpoint weights, and regrouping one weighted sum proves the intersection ratios.`,
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
      { q: String.raw`A vertical $5$-foot stick casts a $3$-foot shadow while a vertical flagpole on the same level ground casts an $18$-foot shadow under the same sunlight. How tall is the flagpole, in feet?`, answer: "30",
        solution: String.raw`The vertical stick and flagpole, their shadows on the same level ground, and the common sunlight direction form AA-similar right triangles. The height-to-shadow ratio is $5/3$, so the flagpole height is $18\cdot5/3=30$ feet. Both heights and shadows are measured in feet, giving a consistent ratio.` },
      { q: String.raw`Two similar triangles have corresponding sides $4$ and $10$, respectively. What is the ratio of the first triangle's area to the second's?`, answer: "4/25",
        solution: String.raw`The first-to-second corresponding length ratio is $4/10=2/5$. Uniform similarity scales both a base and its height by that factor, so the first-to-second area ratio is $(2/5)^2=4/25$. Reversing the order would give the reciprocal; the requested ratio follows the given side order.` },
      { q: String.raw`A triangle has sides $5$, $6$ and $7$. The bisector of the angle between the sides $5$ and $7$ divides the side $6$ into two pieces. How long is the longer piece?`, answer: "7/2",
        solution: String.raw`The angle bisector divides the opposite side of length six in the ratio of its adjacent sides, $5:7$. The longer piece corresponds to side seven and occupies seven of twelve ratio-parts, so it has length $6\cdot7/12=7/2$. The shorter piece is $6\cdot5/12=5/2$, and the two sum to six.` },
      { q: String.raw`Triangles $ABC$ and $PQR$ are similar in the stated order. If $AB=6$, $BC=9$ and $PQ=10$, what is $QR$?`, answer: "15",
        solution: String.raw`The vertex order gives $A\leftrightarrow P$, $B\leftrightarrow Q$, $C\leftrightarrow R$. Thus $AB$ corresponds to $PQ$, and $BC$ to $QR$. The second-to-first scale factor is $10/6=5/3$, giving $QR=9\cdot5/3=15$.` },
      { q: String.raw`Points $D$ and $E$ lie strictly inside sides $AB$ and $AC$ of triangle $ABC$. If $AD=3$, $DB=2$, $AE=6$ and $EC=4$, what is $DE/BC$?`, answer: "3/5",
        solution: String.raw`The side divisions satisfy $AD/DB=3/2=6/4=AE/EC$. By the converse intercept theorem, $DE\parallel BC$. The resulting similar triangles have ratio $AD/AB=3/(3+2)=3/5$, so $DE/BC=3/5$. Parallelism was established from the data rather than assumed from the drawing.` },
      { q: String.raw`A square has area $16$, and each next square is formed by joining the previous square's side midpoints. What is the sum of the areas of all these squares, including the original, when each area is counted separately?`, answer: "32",
        solution: String.raw`The listed areas are $16,8,4,\ldots$, a geometric series with first term sixteen and ratio one half. Its infinite sum is $16/(1-1/2)=32$. The squares overlap, so this is a sum with multiplicity. Their union still has area sixteen; it is not the region measured by the requested sum.` },
      { q: String.raw`Point $I$ is the incenter of triangle $ABC$, and $[BIC]=8$, $[CIA]=10$, $[AIB]=6$. If $BC=8$, find $AB$.`, answer: "6",
        solution: String.raw`The three pieces share the same perpendicular height from the incenter to their respective sides. Thus $BC:CA:AB=8:10:6$. Since the given side $BC=8$ equals its ratio number eight, the length scale is one and $AB=6$. These are the sides of a $6$-$8$-$10$ triangle, whose area twenty-four equals $8+10+6$, checking consistency.` },
      { q: String.raw`In triangle $ABC$, points $D$ and $E$ lie on $BC$ and $AC$ with $BD:DC=3:2$ and $AE:EC=4:1$. If $AD$ and $BE$ meet at $P$, give $AP/PD$ and $BP/PE$, in that order.`, answer: "20/3,15/8",
        solution: String.raw`Inverse endpoint ratios require $m_B:m_C=2:3$ and $m_A:m_C=1:4$. A common choice is $m_A=3,m_B=8,m_C=12$. The side weights are $m_D=20$ and $m_E=15$. Therefore the crossing point divides $AD$ with $AP/PD=m_D/m_A=20/3$, and $BE$ with $BP/PE=m_E/m_B=15/8$. Both results use the same three vertex weights.` },
      { q: String.raw`Triangle $ABC$ has area $54$. Its medians meet at $G$, and $M$ is the midpoint of $BC$. What is the area of triangle $GMC$?`, answer: "9",
        solution: String.raw`The centroid's height above $BC$ is one third of the height from $A$, so $[GBC]=54/3=18$. The equal bases $BM=MC$ then split that triangle into two equal areas, giving $[GMC]=18/2=9$. This is one of the six equal-area pieces made by all three medians.` }
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
