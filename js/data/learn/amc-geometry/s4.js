// Learn, AMC Geometry, chapter S4: right, equilateral and general triangles (CONVENTIONS §14). Part: Core topics.
// Right-triangle constructions, equilateral symmetry and general-triangle formulas, with explicit feasibility conditions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S4"] = {
  lessons: {
    "S4.1": {
      prereq: ["pythagorean-theorem", "special-right-triangles", "triangle-similarity"],
      cards: [],
      body: String.raw`A triangle's special structure can turn a general calculation into a short one. A right angle supplies perpendicular legs and a distinguished hypotenuse; equal sides supply symmetry; three known sides determine both area and angles. The useful extra segment is often a median, an altitude or a radius that exposes one of these relationships.

For a right triangle with hypotenuse ten, its midpoint is five from every vertex, so the median from the right angle has length five. In an equilateral triangle of side four, the altitude divides the base in half and has length $\sqrt{4^2-2^2}=2\sqrt3$. For unequal sides five and eight meeting at $60^\circ$, a perpendicular projection accounts for the angle correction in the third side, giving length seven.

The chapter derives these relationships rather than treating them as unrelated special values. Similar triangles explain the altitude pieces, a doubled median creates a parallelogram, and triangle area connects inradii, Heron's formula and trigonometry. A construction also has geometric conditions: a midpoint must really be a midpoint, and a square supported on a chosen base must fit inside the triangle.`,
      exercises: [
        { q: String.raw`A right triangle has hypotenuse $10$. How long is the median from the right angle to the hypotenuse?`, answer: "5",
          solution: String.raw`The midpoint of a right triangle's hypotenuse is equally distant from all three vertices. For example, put the right-angle vertex at $(0,0)$ and the others at $(a,0),(0,b)$; the midpoint $(a/2,b/2)$ is at distance $\sqrt{a^2+b^2}/2$ from each. With hypotenuse ten this distance is five, which is the required median length.` },
        { q: String.raw`What is the height of an equilateral triangle with side $4$?`, answer: "2sqrt(3)",
          solution: String.raw`The apex median of an equilateral triangle is also an altitude and bisects the base. One of the resulting right triangles has hypotenuse four and base two, so the altitude is $\sqrt{4^2-2^2}=\sqrt{12}=2\sqrt3$.` },
        { q: String.raw`Two sides of a triangle are $5$ and $8$, and the angle between them is $60^\circ$. How long is the third side?`, answer: "7",
          solution: String.raw`The known angle is included between sides five and eight, so the cosine law applies as $c^2=5^2+8^2-2\cdot5\cdot8\cos60^\circ=25+64-40=49$. The required length is the positive square root, seven. It satisfies the triangle inequality $|8-5|\lt7\lt8+5$.` }
      ],
      problems: [
        "2000 AMC 8, Problem 15",
        "2007 AMC 8, Problem 12",
        "2016 AMC 8, Problem 25"
      ]
    },
    "S4.2": {
      prereq: ["pythagorean-theorem", "special-right-triangles", "circle-basics"],
      cards: ["15-75-90-triangle", "median-to-hypotenuse", "right-triangle-inradius"],
      body: String.raw`The midpoint of a right triangle's hypotenuse is an especially useful auxiliary point. Put the right-angle vertex at $A=(0,0)$ and the other vertices at $B=(a,0)$, $C=(0,b)$. The midpoint is $M=(a/2,b/2)$. Its distance to each vertex has square $(a^2+b^2)/4=c^2/4$, where $c=BC$. Thus $AM=BM=CM=c/2$, proving the [[median-to-hypotenuse|median-to-hypotenuse theorem]] directly from Pythagoras and midpoint coordinates.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 400" role="img" aria-label="The hypotenuse midpoint is equally distant from all three vertices" style="width:100%;max-width:520px;height:auto"><title>The hypotenuse midpoint is equally distant from all three vertices</title><circle cx="230" cy="180" r="150" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><path d="M110 90L110 270L350 90Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M110 90L230 180" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="230" cy="180" r="3" fill="currentColor"/><path d="M110 100L120 100L120 90" fill="none" stroke="currentColor" stroke-width="1"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="92" y="90">A</text><text x="92" y="287">B</text><text x="368" y="90">C</text><text x="247" y="196">M</text><text x="90" y="194">6</text><text x="230" y="73">8</text><text x="165" y="117">5</text><text x="170" y="245">5</text><text x="311" y="147">5</text><text x="260" y="372">AM = BM = CM = c/2 = 5.</text></g></svg>

It follows that $M$ is the circumcenter, the center of the circle through the three vertices, and the circumradius is $R=c/2$. The median also divides the triangle into two isosceles triangles, making equal-angle information available. For legs nine and twelve, the hypotenuse is fifteen and the median length is $15/2$.

The converse needs the midpoint hypothesis. Suppose $M$ is the midpoint of $BC$ and $AM=BC/2$. Then $AM=BM=CM$. The two isosceles triangles give $\angle BAM=\angle ABM$ and $\angle MAC=\angle ACM$, so $\angle A=\angle B+\angle C$. Together with the triangle angle sum, this forces $\angle A=90^\circ$. An arbitrary point equally distant from three vertices is only a circumcenter; its existence does not make a general triangle right-angled.

The inscribed circle supplies another useful center. In a right triangle with its legs on the positive axes, the incenter is $(r,r)$, since its perpendicular distance to each leg is the inradius $r$. The radii to the two leg tangencies and the right-angle vertex form a square. The remaining tangent segments from each acute vertex are equal: the two right triangles formed by those radii have common hypotenuse and equal radius legs, so HL makes them congruent. Adding the leg lengths consequently gives $a+b=2r+c$, hence the [[right-triangle-inradius|right-triangle inradius]]

$$r=\frac{a+b-c}{2}.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" role="img" aria-label="The incircle touches each side at a perpendicular radius" style="width:100%;max-width:520px;height:auto"><title>The incircle touches each side at a perpendicular radius</title><path d="M110 300L374 300L110 190Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><circle cx="154" cy="256" r="44" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><path d="M154 256L154 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M154 256L110 256" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M154 256L170.923 215.385" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M154 292L162 292L162 300" fill="none" stroke="currentColor" stroke-width="1"/><path d="M118 256L118 248L110 248" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="154" cy="256" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="92" y="319">A</text><text x="392" y="319">B</text><text x="92" y="183">C</text><text x="167" y="245">I</text><text x="91" y="231">5</text><text x="242" y="323">12</text><text x="271" y="225">13</text><text x="260" y="367">For legs 5 and 12, r = (5 + 12 − 13)/2 = 2.</text></g></svg>

For legs five and twelve, $c=13$ and $r=2$. The area identity $K=rs$ from the incenter split gives the independent expression $r=ab/(a+b+c)$, because $K=ab/2$ and $s=(a+b+c)/2$. These two forms agree since $(a+b-c)(a+b+c)=2ab$ by Pythagoras. Together with $R=c/2$, they give $a+b=2r+2R$.

A less common angle pattern can also be built from familiar ones. Construct an isosceles triangle with $AB=AC=4$ and apex angle $30^\circ$. Drop the perpendicular from $C$ to line $AB$ at $T$. The $30^\circ$-$60^\circ$-$90^\circ$ triangle gives $AT=2\sqrt3$ and $CT=2$, so

$$BC^2=(4-2\sqrt3)^2+2^2=32-16\sqrt3.$$

The apex altitude $AH$ bisects $BC$ and the $30^\circ$ angle. Hence $BH^2=BC^2/4=8-4\sqrt3=(\sqrt6-\sqrt2)^2$, and $AH^2=16-BH^2=8+4\sqrt3=(\sqrt6+\sqrt2)^2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="Bisecting the apex of a thirty-degree isosceles triangle" style="width:100%;max-width:520px;height:auto"><title>Bisecting the apex of a thirty-degree isosceles triangle</title><path d="M110 280L430 280L387.128 120Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M110 280L408.564 200" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M387.128 120L387.128 280" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M400.837 202.071L402.907 209.798L410.635 207.727" fill="none" stroke="currentColor" stroke-width="1"/><path d="M387.128 272L379.128 272L379.128 280" fill="none" stroke="currentColor" stroke-width="1"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="92" y="297">A</text><text x="447" y="298">B</text><text x="387.128" y="102">C</text><text x="427" y="199">H</text><text x="387.128" y="302">T</text><text x="260" y="267">15°</text><text x="258" y="222">15°</text><text x="228" y="190">4</text><text x="270" y="304">4</text><text x="449" y="252">75°</text><text x="260" y="357">AH = √6 + √2, BH = √6 − √2.</text><text x="260" y="380">Both right triangles have hypotenuse 4.</text></g></svg>

Thus a [[15-75-90-triangle|$15^\circ$-$75^\circ$-$90^\circ$ triangle]] has opposite sides in ratio $(\sqrt6-\sqrt2):(\sqrt6+\sqrt2):4$. The shorter leg faces $15^\circ$. With hypotenuse four, the area is $\tfrac12(\sqrt6-\sqrt2)(\sqrt6+\sqrt2)=2$. Scaling gives area $c^2/8$ for hypotenuse $c$. The tangent of an acute angle is the opposite leg divided by the adjacent leg. Here that ratio simplifies to $\tan15^\circ=2-\sqrt3$, a useful value when a perpendicular exposes a fifteen-degree angle.`,
      related: [
        { card: "thales-theorem", note: String.raw`the right angle on a diameter, behind the median fact (S5.3).` },
        { card: "incircle-tangent-lengths", note: String.raw`the tangent lengths in any triangle, $s - a$ and so on (S5.6).` },
        { card: "common-angle-values", note: String.raw`the sines and cosines of $15^\circ$ and $75^\circ$ (S9.2).` }
      ],
      exercises: [
        { q: String.raw`A right triangle has legs $5$ and $12$. What is the radius of its inscribed circle?`, answer: "2",
          solution: String.raw`Pythagoras gives hypotenuse $\sqrt{5^2+12^2}=13$. The right-triangle inradius formula then gives $r=(5+12-13)/2=2$. Independently, the area is thirty and semiperimeter fifteen, so the equal-height incenter partition gives $r=K/s=30/15=2$.` },
        { q: String.raw`A right triangle has legs $9$ and $12$. How far is the midpoint of the hypotenuse from the corner with the right angle?`, answer: "15/2",
          solution: String.raw`The hypotenuse has length $\sqrt{9^2+12^2}=15$. Its midpoint is the circumcenter of the right triangle, at distance half the hypotenuse from every vertex. Hence the distance from the right-angle vertex is $15/2$. The midpoint condition is what permits this conclusion.` },
        { q: String.raw`A right triangle has a $15^\circ$ angle and hypotenuse $4$. What is its area?`, answer: "2",
          solution: String.raw`For hypotenuse four, the legs opposite $15^\circ$ and $75^\circ$ are $\sqrt6-\sqrt2$ and $\sqrt6+\sqrt2$, as derived by bisecting a thirty-degree isosceles triangle. Their product is $6-2=4$, so the area is half that product, two. More generally, scaling this figure gives $K=c^2/8$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 21",
        "2024 AMC 12A, Problem 7",
        "2017 AMC 10B, Problem 21",
        "2014 AMC 10A, Problem 22",
        "2004 AMC 10B, Problem 22"
      ]
    },
    "S4.3": {
      prereq: ["pythagorean-theorem", "triangle-similarity"],
      cards: ["altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling"],
      body: String.raw`An altitude to a hypotenuse carries more information than an arbitrary height because all three triangles in the configuration are similar. Let $ABC$ be right at $A$, with $AH\perp BC$, $BH=p>0$, $HC=q>0$ and $BC=c=p+q$. Write $AB=a$, $AC=b$, $AH=h$.

The small triangles $ABH$ and $CAH$ are similar in the stated order. Their corresponding leg ratios give $p/h=h/q$, hence $h^2=pq$. Comparing $ABH$ with $CBA$ gives $a/c=p/a$, so $a^2=pc$. The other half gives $b^2=qc$. These [[altitude-hypotenuse|hypotenuse-altitude identities]] are consequences of the angle correspondence, not additional hypotheses about the foot.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="Hypotenuse pieces give the geometric-mean height" style="width:100%;max-width:520px;height:auto"><title>Hypotenuse pieces give the geometric-mean height</title><path d="M180 160L100 280L360 280Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M180 160L180 280" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M175.008 167.488L182.496 172.481L187.488 164.992" fill="none" stroke="currentColor" stroke-width="1"/><path d="M180 271L189 271L189 280" fill="none" stroke="currentColor" stroke-width="1"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="180" y="142">A</text><text x="82" y="299">B</text><text x="378" y="299">C</text><text x="180" y="302">H</text><text x="140" y="307">p = 4</text><text x="270" y="307">q = 9</text><text x="205" y="226">h = 6</text><text x="123" y="209">√52</text><text x="294" y="212">√117</text><text x="260" y="351">c = p + q = 13; h² = pq = 36.</text><text x="260" y="376">AB² = pc = 52 and AC² = qc = 117.</text></g></svg>

If the two pieces are four and nine, the height is six and the full hypotenuse thirteen. If they are nine and sixteen, the hypotenuse is twenty-five and the legs are fifteen and twenty. The area calculation $ab/2=ch/2$ also gives $h=ab/c$. The [[right-triangle-altitude|right triangle with its altitude drawn]] is therefore a configuration to recognize as three similar triangles; the labels of the nearby hypotenuse pieces decide which leg uses which product.

Extending sides is a different way to create a useful triangle. In a convex trapezoid with unequal parallel bases, the two leg lines meet beyond the shorter base. Extending them restores a large triangle and a smaller, similar triangle cut off by the shorter base. With bases six and ten at distance four, let the apex-to-longer-base distance be $H$. The smaller height is $H-4$, so $6/10=(H-4)/H$ and $H=10$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 465" role="img" aria-label="Extending the legs completes two similar triangles" style="width:100%;max-width:520px;height:auto"><title>Extending the legs completes two similar triangles</title><path d="M260 60L100 360" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 60L400 360" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M164 240L100 360L400 360L344 240Z" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5"/><path d="M445 60L445 360" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M75 240L75 360" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="42">O</text><text x="148" y="236">D</text><text x="360" y="236">E</text><text x="80" y="380">B</text><text x="419" y="380">C</text><text x="254" y="263">6</text><text x="260" y="386">10</text><text x="478" y="216">H = 10</text><text x="55" y="306">4</text><text x="260" y="432">6/10 = (H − 4)/H gives H = 10.</text></g></svg>

The construction of [[extend-sides-to-meet|extending sides to meet]] uses the lines, not just the original segments; the apex can be well outside the figure. It also requires the chosen lines to be nonparallel. A parallelogram's legs do not produce a finite apex by extension. Establish the point order before subtracting heights, since a drawing can put an intersection on the unexpected side of a region.

A median can be brought into a triangle of known sides by doubling it. Let $M$ be the midpoint of $BC$, and extend $AM$ to $A'$ with $MA'=AM$. In quadrilateral $ABA'C$, diagonals $AA'$ and $BC$ bisect each other at $M$, so it is a parallelogram. Thus $BA'=AC$, and triangle $ABA'$ has side lengths $AB$, $AC$ and $2AM$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 490" role="img" aria-label="Doubling a median makes the diagonals of a parallelogram" style="width:100%;max-width:520px;height:auto"><title>Doubling a median makes the diagonals of a parallelogram</title><path d="M210 90L100 250L310 410L420 250Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M210 90L100 250L310 410Z" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5"/><path d="M100 250L420 250" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M210 90L310 410" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="260" cy="250" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="210" y="70">A</text><text x="80" y="261">B</text><text x="440" y="261">C</text><text x="310" y="435">A′</text><text x="281" y="246">M</text><text x="145" y="164">AB</text><text x="338" y="157">AC</text><text x="191" y="352">AC</text><text x="212" y="179">m</text><text x="305" y="311">m</text><text x="260" y="470">AM = MA′, BA′ = AC, AA′ = 2m.</text></g></svg>

This [[median-doubling|doubled-median construction]] is reversible. Its triangle has the same area as $ABC$, since each is half of the same parallelogram. It also gives the exact possible range for a median of a triangle with adjacent sides $u,v$:

$$|u-v|\lt2m\lt u+v.$$

For $u=6,v=10$, this is $2\lt m\lt8$. The endpoints are flat limiting triangles and are not attained by nondegenerate triangles. The construction lets triangle inequalities or a cosine relation be applied to the median without first quoting a separate median-length formula.`,
      related: [
        { card: "apollonius-theorem", note: String.raw`the length of a median from the three sides (S9.3).` },
        { card: "parallelogram-vertices", note: String.raw`the parallelogram whose diagonals bisect each other (S2.3).` },
        { card: "trapezoid-special-segments", note: String.raw`more segments in a trapezoid (S6.3).` }
      ],
      exercises: [
        { q: String.raw`The altitude from the right angle of a right triangle cuts the hypotenuse into pieces of lengths $4$ and $9$. How long is the altitude?`, answer: "6",
          solution: String.raw`The two smaller right triangles formed by the altitude are similar. Their corresponding leg ratios give $4/h=h/9$, hence $h^2=4\cdot9=36$. An altitude length is positive, so $h=6$. This product identity uses the altitude from the right angle to the hypotenuse, not an arbitrary cevian.` },
        { q: String.raw`The altitude from the right angle cuts the hypotenuse into pieces $9$ and $16$. How long is the shorter leg?`, answer: "15",
          solution: String.raw`The full hypotenuse is $c=9+16=25$. Similarity gives the square of the leg adjacent to the length-nine piece as $9c=225$, and the other leg square as $16c=400$. Thus the shorter leg is fifteen. The lengths fifteen, twenty and twenty-five also check Pythagoras.` },
        { q: String.raw`A convex trapezoid has parallel sides $6$ and $10$, which are $4$ apart. Its legs are extended until they meet. How far is the meeting point from the longer parallel side?`, answer: "10",
          solution: String.raw`The extended nonparallel leg lines meet beyond the shorter base. If the perpendicular distance to the longer base is $H$, the distance to the shorter is $H-4$. The two triangles are similar, so $(H-4)/H=6/10=3/5$. Solving gives $5H-20=3H$, hence $H=10$. The smaller height six differs from the larger by the given four.` }
      ],
      problems: [
        "2002 AMC 10A, Problem 13",
        "2009 AMC 10A, Problem 10",
        "2014 AMC 10A, Problem 9",
        "2015 AMC 10B, Problem 13",
        "2009 AMC 10A, Problem 17",
        "2018 AMC 10A, Problem 16",
        "2009 AMC 12B, Problem 16",
        "2003 AMC 12B, Problem 22",
        "2024 AMC 12B, Problem 20"
      ]
    },
    "S4.4": {
      prereq: ["special-right-triangles", "triangle-similarity"],
      cards: ["equilateral-triangle-facts", "point-in-equilateral", "inscribed-square"],
      body: String.raw`An equilateral triangle is fixed up to congruence by its side length $s$. Its apex median is also an altitude and angle bisector, so it makes two $30^\circ$-$60^\circ$-$90^\circ$ triangles. Therefore $h=s\sqrt3/2$ and $K=sh/2=s^2\sqrt3/4$.

The same symmetry makes each median a perpendicular bisector and an angle bisector. Their common point is consequently both circumcenter and incenter, as well as the centroid. The centroid divides an altitude in ratio $2:1$, so the circumradius is $R=2h/3=s\sqrt3/3$ and the inradius is $r=h/3=s\sqrt3/6$. For side six the values are $h=3\sqrt3$, $K=9\sqrt3$, $R=2\sqrt3$ and $r=\sqrt3$. These [[equilateral-triangle-facts|equilateral relationships]] give $R=2r$; this equality is special to the equilateral triangle, not a formula for arbitrary triangles.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 475" role="img" aria-label="Equilateral symmetry makes all triangle centers coincide" style="width:100%;max-width:520px;height:auto"><title>Equilateral symmetry makes all triangle centers coincide</title><circle cx="260" cy="233.205" r="173.205" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><circle cx="260" cy="233.205" r="86.603" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><path d="M260 60L110 319.808L410 319.808Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M260 60L260 319.808" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 310.808L269 310.808L269 319.808" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="260" cy="233.205" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="42">A</text><text x="94" y="337.808">B</text><text x="426" y="337.808">C</text><text x="245" y="237.205">I</text><text x="278" y="125">R</text><text x="278" y="281">r</text><text x="260" y="347">6</text><text x="260" y="454">h = 3√3, r = √3, R = 2√3.</text></g></svg>

If an equilateral triangle is inscribed in a circle of radius $R$, solving the radius relation gives side $R\sqrt3$. Conversely, its area determines the positive side length and hence both radii. Keeping side, altitude and radius distinct avoids using the wrong length scale in a circle or area calculation.

A [[point-in-equilateral|point inside an equilateral triangle]] has another useful constant sum. Join the point $P$ to the vertices and drop perpendiculars to the three side lines, of lengths $d_1,d_2,d_3$. The three pieces fill the original triangle and each has a side of length $s$ as base. Thus $K=s(d_1+d_2+d_3)/2$. Comparing with $K=sh/2$ gives $d_1+d_2+d_3=h$. The distances need not be equal; their sum is independent of the interior point.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 395" role="img" aria-label="Distances to the three equilateral sides add to the altitude" style="width:100%;max-width:520px;height:auto"><title>Distances to the three equilateral sides add to the altitude</title><path d="M260 60L121.436 300L398.564 300Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M283.094 260L260 60" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M283.094 260L121.436 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M283.094 260L398.564 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M283.094 260L179.171 200" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M283.094 260L352.376 220" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M283.094 260L283.094 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M283.094 292L291.094 292L291.094 300" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="283.094" cy="260" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="42">A</text><text x="104.436" y="319">B</text><text x="415.564" y="319">C</text><text x="266" y="282">P</text><text x="223" y="219">3</text><text x="328" y="224">2</text><text x="300" y="287">1</text><text x="260" y="365">Distances 1 + 2 + 3 = 6 give the altitude.</text></g></svg>

For distances one, two and three, the altitude is six and the side is $2\cdot6/\sqrt3=4\sqrt3$. The interior-point condition ensures the three area pieces add without overlap or signs. Ordinary positive distances from an exterior point need not have the same sum.

Distances to vertices call for a different construction. Rotate $P$ through $60^\circ$ about vertex $A$ in the direction taking $B$ to $C$, and call the image $P'$. Rotation gives $AP'=AP$ and $CP'=BP$. Since $\angle PAP'=60^\circ$, triangle $APP'$ is equilateral and $PP'=AP$. Therefore triangle $PP'C$ has side lengths equal to the three original vertex distances $AP,BP,CP$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 410" role="img" aria-label="A sixty-degree rotation puts the three vertex distances in one triangle" style="width:100%;max-width:520px;height:auto"><title>A sixty-degree rotation puts the three vertex distances in one triangle</title><path d="M130 300L430 300L280 40.192Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M130 300L230 250L136.699 188.397Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M230 250L430 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M230 250L280 40.192" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M136.699 188.397L280 40.192" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="230" cy="250" r="3" fill="currentColor"/><circle cx="136.699" cy="188.397" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="113" y="320">A</text><text x="447" y="320">B</text><text x="280" y="23">C</text><text x="241" y="269">P</text><text x="117" y="185">P′</text><text x="178" y="260">x</text><text x="160" y="227">x</text><text x="341" y="265">y</text><text x="198" y="100">y</text><text x="277" y="154">z</text><text x="260" y="359">A 60° rotation takes B to C and P to P′.</text><text x="260" y="389">AP = PP′, BP = CP′: triangle PP′C uses x, y, z.</text></g></svg>

This puts three separated measurements into one triangle. If their squares satisfy a Pythagorean relation, the new triangle has a proved right angle; otherwise its three sides permit an angle or area calculation. The auxiliary triangle can lie partly outside $ABC$, which is harmless because rotation preserves the lengths used. The distance-to-sides sum and the vertex-distance rotation solve different kinds of data and should not be interchanged.

A square supported on a triangle's base uses similarity instead of equilateral symmetry. Let the base have length $a$ and altitude $h$, and assume the perpendicular foot from the apex lies on that base segment. A horizontal cross-section at height $y$ has width $a(1-y/h)$, and under this foot condition its projection remains within the base. For an [[inscribed-square|inscribed square]] of side $x$, the top edge has width $x$ at height $x$, so

$$\frac{x}{a}=\frac{h-x}{h},\qquad x=\frac{ah}{a+h}.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 410" role="img" aria-label="Similarity determines a square supported on a suitable triangle base" style="width:100%;max-width:520px;height:auto"><title>Similarity determines a square supported on a suitable triangle base</title><path d="M210 160L110 310L410 310Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M176.667 310L276.667 310L276.667 210L176.667 210Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><path d="M80 160L80 310" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="210" y="141">A</text><text x="93" y="329">B</text><text x="428" y="329">C</text><text x="60" y="240">6</text><text x="260" y="337">12</text><text x="294" y="268">x</text><text x="226" y="296">x</text><text x="260" y="388">x/12 = (6 − x)/6, so x = 4.</text></g></svg>

Base twelve and height six give square side four. In a right triangle, the square sharing the right-angle vertex has $x=ab/(a+b)$ for legs $a,b$. A square with a side on the hypotenuse instead uses base $c$ and altitude $ab/c$, giving $x=abc/(c^2+ab)$. These are different placements, not competing formulas for the same square.

The feasibility condition matters for an obtuse triangle: a parallel cross-section may overrun an endpoint of the chosen base. A square with both lower corners on that base and both upper corners on the other two sides then need not exist. S4.5 examines how the same issue affects a maximal rectangle.`,
      related: [
        { card: "vivianis-theorem", note: String.raw`the sum of the distances to the sides, as a named theorem (S9.3).` },
        { card: "rotation-trick", note: String.raw`the $60^\circ$ rotation for distances to the corners (S10.4).` },
        { card: "regular-hexagon-area", note: String.raw`a regular hexagon as six equilateral triangles (S6.2).` }
      ],
      exercises: [
        { q: String.raw`An equilateral triangle has side $6$. What is the radius of the circle through its corners?`, answer: "2sqrt(3)",
          solution: String.raw`For side six the altitude is $\sqrt{6^2-3^2}=3\sqrt3$. In an equilateral triangle the median is also a perpendicular bisector, so the centroid is the circumcenter. It is two thirds of the altitude from a vertex, giving circumradius $(2/3)3\sqrt3=2\sqrt3$.` },
        { q: String.raw`A point inside an equilateral triangle is at distances $1$, $2$ and $3$ from its three sides. What is the side of the triangle?`, answer: "4sqrt(3)",
          solution: String.raw`Join the interior point to the three vertices. The three resulting areas have the same side length $s$ as base and the respective heights one, two and three, so their sum is $s(1+2+3)/2$. This equals the whole area $sh/2$, giving altitude $h=6$. Since $h=s\sqrt3/2$, the side is $s=12/\sqrt3=4\sqrt3$. The area partition requires the point to be inside.` },
        { q: String.raw`A triangle has base $12$ and height $6$, with its altitude foot on that base segment. A square stands on the base with its top corners on the other two sides. What is the side of the square?`, answer: "4",
          solution: String.raw`Let the square side be $x$. Its top edge lies at height $x$ and is parallel to the base, so the small triangle above it is similar to the whole. Therefore $x/12=(6-x)/6$. Multiplying gives $x=12-2x$, hence $x=4$. The altitude-foot condition ensures the square's lower side lies within the chosen base, rather than projecting past an endpoint.` }
      ],
      problems: [
        "2012 AMC 8, Problem 23",
        "2007 AMC 10B, Problem 7",
        "2019 AMC 10B, Problem 8",
        "2014 AMC 10B, Problem 13",
        "2003 AMC 12A, Problem 14",
        "2012 AMC 10B, Problem 16",
        "2015 AMC 10A, Problem 17",
        "2004 AMC 10A, Problem 20",
        "2017 AMC 10A, Problem 21"
      ]
    },
    "S4.5": {
      prereq: ["triangle-area-standard", "shared-leg-pythagoras"],
      cards: ["herons-formula", "triangle-13-14-15", "inradius-area", "max-rectangle-in-triangle"],
      body: String.raw`Three positive side lengths determine a nondegenerate triangle only when the strict triangle inequalities hold. Once they do, SSS fixes the area. Heron's formula expresses that area without first finding an angle or an altitude. With semiperimeter $s=(a+b+c)/2$, it is

$$K=\sqrt{s(s-a)(s-b)(s-c)}.$$

Each factor $s-a$, $s-b$, $s-c$ is positive exactly under the triangle inequalities. A zero factor describes a flat limiting triangle rather than a positive-area one; a negative product must not be interpreted as the area of an invalid side specification.

The [[herons-formula|formula can be derived]] using the signed projection already used for shared heights. Place a side of length $c$ on the horizontal axis and put the third vertex at $(x,h)$ with adjacent side lengths $b,a$. Then $b^2=x^2+h^2$, $a^2=(c-x)^2+h^2$, so $x=(b^2+c^2-a^2)/(2c)$ and $K=ch/2$. Eliminating $x,h$ gives

$$16K^2=4b^2c^2-(b^2+c^2-a^2)^2=((b+c)^2-a^2)(a^2-(b-c)^2).$$

Factoring the last two expressions gives $(a+b+c)(-a+b+c)(a-b+c)(a+b-c)=16s(s-a)(s-b)(s-c)$. The positive square root produces Heron's formula. The projection can be outside the base because its square enters the calculation; the side-existence conditions still have to hold.

For sides seven, eight and nine, $s=12$ and $K^2=12\cdot5\cdot4\cdot3=720$, so $K=12\sqrt5$. A perpendicular to the side eight independently splits it into two and six, with height $\sqrt{7^2-2^2}=3\sqrt5$ and area $\tfrac12\cdot8\cdot3\sqrt5=12\sqrt5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 395" role="img" aria-label="Heron area agrees with a shared-height construction" style="width:100%;max-width:520px;height:auto"><title>Heron area agrees with a shared-height construction</title><path d="M156 112.17L100 300L324 300Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M156 112.17L156 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M156 292L164 292L164 300" fill="none" stroke="currentColor" stroke-width="1"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="156" y="93.17">A</text><text x="82" y="318">B</text><text x="342" y="318">C</text><text x="156" y="321">H</text><text x="112" y="202">7</text><text x="255" y="200">9</text><text x="128" y="316">2</text><text x="240" y="316">6</text><text x="190" y="215">3√5</text><text x="260" y="372">s = 12; K² = 12 · 5 · 4 · 3 = 720.</text></g></svg>

The [[triangle-13-14-15|thirteen-fourteen-fifteen triangle]] has a particularly simple decomposition. With the side fourteen as base, the altitude foot lies five from the endpoint adjacent to side thirteen. The height is twelve, making a five-twelve-thirteen triangle and a nine-twelve-fifteen triangle. Thus $K=84$, $s=21$ and $r=K/s=4$.

Its circumradius can also be checked without assuming a radius formula. Put the base endpoints at $(0,0),(14,0)$ and the apex at $(5,12)$. A center equidistant from the base endpoints has first coordinate seven. Equating its squared distances to the apex and to $(0,0)$ gives second coordinate $33/8$. Therefore $R^2=7^2+(33/8)^2=4225/64$, so $R=65/8$. Recognizing the triangle is useful because the decomposition supplies the values with a reason, rather than replacing their justification.

For every triangle, the [[inradius-area|area-inradius relation]] $K=rs$ follows by joining the incenter to the vertices: the three pieces have common perpendicular height $r$ over the three sides. With sides five, five and six, the altitude is four, so $K=12$ and $s=8$, giving $r=3/2$. The same decomposition proves $K=rs$ for a convex tangential polygon, meaning a polygon with an interior circle tangent to every side; an arbitrary polygon with a circle merely lying inside it does not satisfy that conclusion.

A base-height area model also solves a common optimization. Assume a triangle's altitude foot lies on its chosen base of length $b$. A rectangle supported on that base, with its top corners on the other two sides, has height $y=th$ and width $b(1-t)$, where $0\lt t\lt1$. Its area is $bh\,t(1-t)$. Completing the square gives $t(1-t)=1/4-(t-1/2)^2\le1/4$. Equality occurs at $t=1/2$, when the rectangle has width $b/2$ and height $h/2$. Hence this [[max-rectangle-in-triangle|maximum supported rectangle]] has area $bh/4$, half the triangle area.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 445" role="img" aria-label="The maximal supported rectangle reaches the midline" style="width:100%;max-width:520px;height:auto"><title>The maximal supported rectangle reaches the midline</title><path d="M260 60L100 300L420 300Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M180 300L340 300L340 180L180 180Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><path d="M445 180L445 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M100 346L420 346" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="41">A</text><text x="82" y="319">B</text><text x="438" y="319">C</text><text x="260" y="322">b/2</text><text x="470" y="246">y = h/2</text><text x="260" y="369">b</text><text x="260" y="423">Width b/2, height h/2: rectangle area bh/4.</text></g></svg>

This is an attained maximum under the stated placement and foot condition. It must not be asserted for every chosen base of an obtuse triangle. For example, let $A=(0,0)$, $B=(12,0)$, $C=(18,6)$ and use $AB$ as the base. At height $y$, the triangle's horizontal cross-section runs from $x=3y$ to $x=12+y$. A base-supported rectangle must also project within $0\le x\le12$, so its usable width is at most $12-3y$, not the full cross-section width $12-2y$.

Its area is at most $y(12-3y)=12-3(y-2)^2$, giving maximum twelve at height two and width six. The original triangle has area thirty-six, whose half is eighteen. The maximizing rectangle's upper-right corner is inside the triangle, not on the other sloping side; a four-contact rectangle of that specified orientation does not exist here.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 405" role="img" aria-label="An exterior altitude changes the chosen-base rectangle problem" style="width:100%;max-width:520px;height:auto"><title>An exterior altitude changes the chosen-base rectangle problem</title><path d="M70 300L310 300L430 180Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M190 300L310 300L310 260L190 260Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><path d="M430 180L430 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 300L450 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M190 260L350 260" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="54" y="319">A</text><text x="310" y="320">B</text><text x="448" y="179">C</text><text x="250" y="324">6</text><text x="388" y="279">y = 2</text><text x="190" y="344">base 12</text><text x="453" y="241">h = 6</text><text x="260" y="374">An obtuse base: maximum rectangle area is 12,</text><text x="260" y="397">less than half the triangle area, 18.</text></g></svg>

One can choose a base with an internal altitude foot, for example a longest side, to use the half-area construction. When a particular base is imposed, check that the proposed square or rectangle actually fits before applying a cross-section formula as an attained extremum.`,
      related: [
        { card: "incircle-tangent-lengths", note: String.raw`the tangent lengths $s - a$, $s - b$, $s - c$ inside Heron's formula (S5.6).` },
        { card: "circumradius-area", note: String.raw`the circumradius from the sides and the area, $R = \tfrac{abc}{4A}$ (S9.2).` },
        { card: "incenter-area-split", note: String.raw`the three pieces of the inradius formula, in the ratio of the sides (S3.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of a triangle with sides $13$, $14$ and $15$?`, answer: "84",
          solution: String.raw`The side lengths satisfy the strict triangle inequalities and have semiperimeter $s=21$. Heron's formula gives $K^2=21\cdot(21-13)(21-14)(21-15)=21\cdot8\cdot7\cdot6=7056$. Thus the positive area is eighty-four. The height twelve over base fourteen independently gives $K=14\cdot12/2=84$.` },
        { q: String.raw`What is the radius of the circle inscribed in a triangle with sides $5$, $5$ and $6$?`, answer: "3/2",
          solution: String.raw`The height to the base six bisects it because the other sides are equal. Each half has hypotenuse five and horizontal leg three, so the height is four. Hence area $K=6\cdot4/2=12$ and semiperimeter $s=(5+5+6)/2=8$. The incenter-area identity gives $r=K/s=12/8=3/2$.` },
        { q: String.raw`What is the area of a triangle with sides $7$, $8$ and $9$?`, answer: "12sqrt(5)",
          solution: String.raw`The strict triangle inequalities hold, and $s=(7+8+9)/2=12$. Heron's formula gives $K=\sqrt{12\cdot5\cdot4\cdot3}=\sqrt{720}=12\sqrt5$. As a check, the altitude to side eight has length $3\sqrt5$, giving the same area $8\cdot3\sqrt5/2$.` },
        { q: String.raw`A triangle has area $30$. Choose a base whose altitude foot lies on the base segment. What is the largest area of a rectangle with one side on that base and its other two corners on the other two sides?`, answer: "15",
          solution: String.raw`For a base of length $b$ and altitude $h$ whose foot is on the base, a supported rectangle at height $th$ has width $b(1-t)$. Its area is $bh\,t(1-t)$, and $t(1-t)=1/4-(t-1/2)^2\le1/4$. Equality at $t=1/2$ is geometrically feasible, so the largest rectangle has area $bh/4$, half the triangle area. For area thirty the answer is fifteen. The base-placement condition prevents applying this equality to an overhanging cross-section.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 21",
        "2012 AMC 12B, Problem 20",
        "2012 AMC 12A, Problem 18",
        "2008 AMC 12B, Problem 18",
        "2008 AMC 12A, Problem 20"
      ]
    },
    "S4.6": {
      prereq: ["pythagorean-theorem", "triangle-type-by-sides", "special-right-triangles"],
      cards: ["law-of-cosines", "law-cosines-60-120", "law-of-cosines-special-triangles", "trig-area"],
      body: String.raw`The correction to Pythagoras in a general triangle comes from the signed projection of one side onto another. Let $CA=b>0$, $CB=a>0$, and let their included angle be $C$, strictly between zero and $180^\circ$. Put $C=(0,0)$, $A=(b,0)$ and $B=(x,h)$ with $h>0$. The projection coordinate $x$ is positive for an acute angle and negative for an obtuse angle.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-label="Signed projections give the cosine law for acute and obtuse angles" style="width:100%;max-width:520px;height:auto"><title>Signed projections give the cosine law for acute and obtuse angles</title><path d="M55 200L215 200L125 80Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M365 200L475 200L310 80Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M125 80L125 200" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 80L310 200" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 200L365 200" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M125 192L133 192L133 200" fill="none" stroke="currentColor" stroke-width="1"/><path d="M310 192L318 192L318 200" fill="none" stroke="currentColor" stroke-width="1"/><path d="M55 230L125 230" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M310 230L365 230" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M55 280L215 280" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M365 280L475 280" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="135" y="28">Acute: x &gt; 0</text><text x="390" y="28">Obtuse: x &lt; 0</text><text x="125" y="63">B(x,h)</text><text x="310" y="63">B(x,h)</text><text x="41" y="218">C</text><text x="230" y="218">A</text><text x="380" y="218">C</text><text x="491" y="218">A</text><text x="73" y="140">a</text><text x="185" y="125">c</text><text x="347" y="125">a</text><text x="410" y="125">c</text><text x="141" y="151">h</text><text x="294" y="151">h</text><text x="90" y="252">x</text><text x="337" y="252">x</text><text x="135" y="302">b</text><text x="420" y="302">b</text><text x="260" y="345">a² = x² + h²; c² = (b − x)² + h².</text></g></svg>

Pythagoras gives $a^2=x^2+h^2$ and $c^2=(b-x)^2+h^2$ for $c=AB$. The angle ratios are $x=a\cos C$ and $h=a\sin C$, with cosine using the signed projection and sine the positive height. Expanding the second distance and substituting the first proves the [[law-of-cosines|law of cosines]]

$$c^2=a^2+b^2-2ab\cos C.$$

At $90^\circ$, cosine is zero and the law reduces to Pythagoras. A positive cosine shortens the opposite side relative to the right-angle benchmark, and a negative cosine lengthens it. Conversely, for valid side lengths, $\cos C=(a^2+b^2-c^2)/(2ab)$ determines the interior angle uniquely in $(0^\circ,180^\circ)$. For the angle opposite thirteen in a thirteen-fourteen-fifteen triangle, the cosine is $(14^2+15^2-13^2)/(2\cdot14\cdot15)=3/5$.

The special-right-triangle ratios give $\cos60^\circ=1/2$ and $\cos120^\circ=-1/2$. Therefore the [[law-cosines-60-120|sixty- and one-hundred-twenty-degree forms]] are $c^2=a^2+b^2-ab$ and $c^2=a^2+b^2+ab$, respectively. Sides five and eight enclosing $60^\circ$ give $c^2=25+64-40=49$, hence $c=7$. Sides seven, eight and thirteen give cosine $(49+64-169)/(2\cdot7\cdot8)=-1/2$ at the largest angle, so it is $120^\circ$.

Some [[law-of-cosines-special-triangles|integer-sided examples]] are convenient checks: three-five-seven and seven-eight-thirteen have $120^\circ$ opposite the largest side. Three-seven-eight and five-seven-eight have $60^\circ$ opposite side seven, since $3^2+8^2-3\cdot8=49$ and $5^2+8^2-5\cdot8=49$. Sorting the numbers alone does not identify which side faces a stated acute angle. The ordinary triangle inequalities must still be checked before using an inverse angle formula.

The same projection supplies an area instead of a side. With base $b$ and height $h=a\sin C$, the [[trig-area|sine area formula]] is $K=ab\sin C/2$. Sides eight and ten at $30^\circ$ give area twenty; sides seven and eight at $60^\circ$ give $14\sqrt3$. The formula also works for an obtuse included angle because its positive sine is the height ratio to the extended base line.

An angle and its supplement have the same sine, so they give equal areas for two fixed adjacent side lengths. They generally give different third sides because their cosines have opposite signs. For example, sides five and eight give third side seven at $60^\circ$, but $\sqrt{129}$ at $120^\circ$, while both areas are $10\sqrt3$. Thus equal area and two matching sides need not establish congruence. Conversely the area is at most $ab/2$ for those fixed sides, attained exactly when the included angle is right.`,
      related: [
        { card: "law-of-sines", note: String.raw`sides in proportion to the sines of the opposite angles (S9.2).` },
        { card: "stewarts-theorem", note: String.raw`a cevian's length, from the law of cosines used twice (S9.3).` },
        { card: "parallelogram-area", note: String.raw`the same sine formula for a parallelogram, $ab\sin\theta$ (S2.3).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $7$, $8$ and $13$. What is its largest angle, in degrees?`, answer: "120",
          solution: String.raw`The largest angle faces side thirteen. The cosine law gives its cosine as $(7^2+8^2-13^2)/(2\cdot7\cdot8)=(49+64-169)/112=-1/2$. The unique interior angle with that cosine is $120^\circ$. The side lengths do form a triangle since $7+8>13$.` },
        { q: String.raw`In the triangle with sides $13$, $14$ and $15$, what is the cosine of the angle opposite the side $13$?`, answer: "3/5",
          solution: String.raw`The angle opposite side thirteen is included between the sides fourteen and fifteen. The cosine law therefore gives $(14^2+15^2-13^2)/(2\cdot14\cdot15)=(196+225-169)/420=252/420=3/5$. Using thirteen as an adjacent side would calculate a different angle.` },
        { q: String.raw`Two sides of a triangle are $8$ and $10$, and the angle between them is $30^\circ$. What is its area?`, answer: "20",
          solution: String.raw`The specified angle is included between sides eight and ten. The perpendicular height relative to side ten is $8\sin30^\circ=4$, so the area is $10\cdot4/2=20$. Equivalently, $K=\tfrac12\cdot8\cdot10\cdot\tfrac12$.` },
        { q: String.raw`Two sides of a triangle are $7$ and $8$, and the angle between them is $60^\circ$. What is its area?`, answer: "14sqrt(3)",
          solution: String.raw`Use the sine area formula with the two sides enclosing the known angle: $K=\tfrac12\cdot7\cdot8\sin60^\circ=28\cdot\sqrt3/2=14\sqrt3$. The two given side lengths alone would not fix an area without that included angle.` }
      ],
      problems: [
        "2005 AMC 10B, Problem 14",
        "2014 AMC 10A, Problem 13",
        "2015 AMC 10A, Problem 19",
        "2021 Fall AMC 10B, Problem 18",
        "2009 AMC 12A, Problem 13",
        "2013 AMC 12A, Problem 12",
        "2021 Spring AMC 10B, Problem 20",
        "2022 AMC 12B, Problem 10",
        "2023 AMC 12B, Problem 17"
      ]
    },
    "S4.7": {
      prereq: ["15-75-90-triangle", "median-to-hypotenuse", "right-triangle-inradius", "altitude-hypotenuse", "right-triangle-altitude", "extend-sides-to-meet", "median-doubling", "equilateral-triangle-facts", "point-in-equilateral", "inscribed-square", "herons-formula", "triangle-13-14-15", "inradius-area", "max-rectangle-in-triangle", "law-of-cosines", "law-cosines-60-120", "law-of-cosines-special-triangles", "trig-area"],
      cards: [],
      body: String.raw`Right-triangle calculations become more powerful when the auxiliary point or segment is specified precisely. The midpoint of the hypotenuse gives three equal radii; the converse requires that midpoint, not just any circumcenter. Incircle tangencies and area give equivalent right-triangle inradius formulas. An altitude to the hypotenuse creates three similar triangles and geometric-mean identities.

Extending nonparallel side lines can restore a triangle cut by a parallel, while doubling a median creates a parallelogram and a triangle with sides $u,v,2m$. Both constructions depend on point order and nondegeneracy. Flat boundary arrangements can bound a range without belonging to it.

Equilateral symmetry unifies the centroid, incenter and circumcenter. Interior distances to side lines add to the altitude by an area partition; vertex distances can instead be brought together by a sixty-degree rotation. Squares and rectangles supported on a chosen base require a fitting cross-section, so an exterior altitude foot cannot be ignored.

Heron's formula follows by eliminating a signed altitude projection and factoring the resulting area expression. The incenter split gives $K=rs$. A maximal supported rectangle reaches half the triangle's area under the appropriate foot condition, while an imposed obtuse base can have a smaller maximum. The cosine law and sine area formula express the same projection as side and area information, distinguishing the equal sines and opposite cosines of supplementary angles.`,
      strategies: [
        String.raw`In a right triangle, look at the midpoint of the hypotenuse: it is equally far from all three corners.`,
        String.raw`Draw the altitude to the hypotenuse and use the three similar triangles.`,
        String.raw`Extend the legs of a trapezoid, or two sides of a quadrilateral, until they meet.`,
        String.raw`Recognize $13$-$14$-$15$, $3$-$5$-$7$ and $7$-$8$-$13$ before computing.`,
        String.raw`For an inradius, divide the area by the semiperimeter.`,
        String.raw`With two sides and the angle between them, use the law of cosines for the third side and $\tfrac12 ab\sin C$ for the area.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the radius of the circle inscribed in a triangle with sides $6$, $8$ and $10$?`, answer: "2",
        solution: String.raw`Since $6^2+8^2=10^2$, the triangle is right. Its inradius is $(6+8-10)/2=2$. The area is twenty-four and semiperimeter twelve, so $K/s=2$ gives the same radius without relying solely on recognition of the right-triangle formula.` },
      { q: String.raw`An equilateral triangle has perimeter $18$. What is its area?`, answer: "9sqrt(3)",
        solution: String.raw`The equilateral side is $18/3=6$. Its altitude is $3\sqrt3$, so the area is $6\cdot3\sqrt3/2=9\sqrt3$. The perimeter must first be converted to a side length; substituting eighteen into the side-area formula would use the wrong scale.` },
      { q: String.raw`Two sides of a triangle are $4$ and $6$, and the angle between them is $120^\circ$. How long is the third side?`, answer: "2sqrt(19)",
        solution: String.raw`The cosine of the included $120^\circ$ angle is $-1/2$, so the third side satisfies $c^2=4^2+6^2-2\cdot4\cdot6(-1/2)=16+36+24=76$. Taking the positive square root and extracting the square factor gives $c=\sqrt{76}=2\sqrt{19}$. It lies strictly between the other sides' difference two and sum ten.` },
      { q: String.raw`In triangle $ABC$, $BC=10$, $M$ is the midpoint of $BC$ and $AM=5$. What is $\angle BAC$, in degrees?`, answer: "90",
        solution: String.raw`The midpoint gives $BM=CM=5=AM$. Thus $ABM$ and $ACM$ are isosceles, giving $\angle BAM=\angle B$ and $\angle MAC=\angle C$. Adding shows $\angle A=\angle B+\angle C$. Since all three angles total $180^\circ$, $2\angle A=180^\circ$ and $\angle A=90^\circ$.` },
      { q: String.raw`A nondegenerate triangle has two sides of lengths $6$ and $10$. Its median from their common vertex has integer length. How many median lengths are possible?`, answer: "5",
        solution: String.raw`Doubling that median makes a triangle with side lengths six, ten and $2m$. The strict triangle inequalities give $|10-6|\lt2m\lt10+6$, or $2\lt m\lt8$. The integer lengths are three, four, five, six and seven. The doubled-median construction is reversible, so every one is realized; the excluded endpoints would flatten the triangle.` },
      { q: String.raw`Triangle $ABC$ has $AB=6$, $AC=10$ and median $AM=5$ to side $BC$. What is its area?`, answer: "3sqrt(91)",
        solution: String.raw`Extend $AM$ equally beyond $M$ to $A'$. The parallelogram $ABA'C$ gives $BA'=AC=10$ and $AA'=2AM=10$. Triangle $ABA'$ has the same area as $ABC$ and sides six, ten and ten. Heron's formula with semiperimeter thirteen gives $K=\sqrt{13\cdot7\cdot3\cdot3}=3\sqrt{91}$.` },
      { q: String.raw`A triangle has vertices $(0,0)$, $(12,0)$ and $(18,6)$. A rectangle lies inside the triangle with its bottom side on the segment from $(0,0)$ to $(12,0)$ and its sides parallel to the coordinate axes. What is the greatest possible rectangle area?`, answer: "12",
        solution: String.raw`At height $y$, the triangle's horizontal interval is $[3y,12+y]$. The rectangle must also project inside the bottom segment $[0,12]$, so its width is at most $12-3y$, with $0\le y\le4$. Its area is at most $y(12-3y)=12-3(y-2)^2\le12$. Equality is attained by corners $(6,0),(12,0),(12,2),(6,2)$. The area is smaller than half the triangle's thirty-six because the altitude foot lies beyond the chosen base.` },
      { q: String.raw`Two noncongruent triangles have sides of lengths $3$ and $5$ and have equal areas. The third side of the first triangle is $7$. What is the third side of the second?`, answer: "sqrt(19)",
        solution: String.raw`The cosine of the first included angle is $(3^2+5^2-7^2)/(2\cdot3\cdot5)=-1/2$, so it is $120^\circ$. Equal positive areas require equal sines of the included angles. Noncongruence excludes the same angle, leaving its supplement $60^\circ$. The second third-side square is $3^2+5^2-3\cdot5=19$, giving length $\sqrt{19}$. It satisfies the strict triangle inequalities.` },
      { q: String.raw`A $15^\circ$-$75^\circ$-$90^\circ$ triangle has area $18$. What is its hypotenuse?`, answer: "12",
        solution: String.raw`For hypotenuse four the legs are $\sqrt6-\sqrt2$ and $\sqrt6+\sqrt2$, giving area two. Scaling to hypotenuse $c$ multiplies area by $(c/4)^2$, so $K=c^2/8$. Setting $18=c^2/8$ gives $c^2=144$ and the positive hypotenuse $c=12$.` }
    ],
    problems: [
      "2003 AMC 10A, Problem 17",
      "2003 AMC 12A, Problem 11",
      "2007 AMC 10B, Problem 17",
      "2013 AMC 12A, Problem 11",
      "2008 AMC 12B, Problem 13",
      "2006 AMC 12A, Problem 17",
      "2010 AMC 12B, Problem 22"
    ]
  },
  challenge: {
    problems: [
      "2021 Fall AMC 12A, Problem 14",
      "2025 AMC 12B, Problem 21",
      "2018 AIME I, Problem 4",
      "2019 AIME I, Problem 3"
    ]
  }
};
