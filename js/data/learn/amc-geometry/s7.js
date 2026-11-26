// Learn, AMC Geometry, chapter S7: coordinates and transformations (CONVENTIONS §14). Part: Core topics.
// Coordinate measurements, lattice area and distance-preserving transformations.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S7"] = {
  lessons: {
    "S7.1": {
      prereq: ["distance-midpoint", "line-forms", "circle-basics"],
      cards: [],
      body: String.raw`Placing one side of a triangle along the $x$-axis makes its length a difference of $x$-coordinates and its height the absolute value of the third vertex's $y$-coordinate. For $A=(0,0)$, $B=(4,0)$ and $C=(1,3)$, that gives area $\frac12\cdot4\cdot3=6$. Translating or rotating the axes preserves all distances, so the same placement is available for any triangle once a base is chosen.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 202" role="img" aria-label="The triangle has horizontal base 4 and perpendicular height 3." style="width:100%;max-width:282px;height:auto"><title>The triangle has horizontal base 4 and perpendicular height 3.</title><path d="M18 162L260 162L254 158" fill="none" stroke="currentColor" stroke-width="1"/><path d="M260 162L254 166" fill="none" stroke="currentColor" stroke-width="1"/><path d="M82 182L82 19L78 25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M82 19L86 25" fill="none" stroke="currentColor" stroke-width="1"/><text x="268" y="154" fill="currentColor" text-anchor="middle" font-size="17">x</text><text x="70" y="22" fill="currentColor" text-anchor="middle" font-size="17">y</text><path d="M82 162L226 162L118 54Z" fill="currentColor" fill-opacity="0.09" stroke="currentColor" stroke-width="1.5"/><path d="M118 54L118 162" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M118 153.36L126.64 153.36L126.64 162" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="82" cy="162" r="3" fill="currentColor" stroke="currentColor"/><circle cx="226" cy="162" r="3" fill="currentColor" stroke="currentColor"/><circle cx="118" cy="54" r="3" fill="currentColor" stroke="currentColor"/><text x="69" y="183" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="227" y="183" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="118" y="43" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="137" y="133" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="154" y="183" fill="currentColor" text-anchor="middle" font-size="17">4</text></svg>

If the line carrying the base is tilted, the height is the length of a perpendicular to that line. A circle can be described by a related distance condition. The equation $(x-3)^2+(y+4)^2=25$ says that a point $(x,y)$ lies exactly five units from $(3,-4)$, by the Pythagorean theorem. Describing a shape or a constraint by an equation lets us combine it with a second condition, such as requiring the point to lie on the $x$-axis as well.

We first develop measurements and distance conditions for fixed figures. Then we use coordinates to move a figure without changing its shape. A reflection, for example, can turn a shortest path that bends at an obstacle into a straight segment whose length is easy to compute.`,
      exercises: [
        { q: String.raw`What is the area of the triangle with corners $(0,0)$, $(4,0)$ and $(1,3)$?`, answer: "6",
          solution: String.raw`The first two corners form a horizontal base of length four. The perpendicular from $(1,3)$ reaches that line at $(1,0)$, so its length is three. The triangle's area is $\frac12\cdot4\cdot3=6$.` },
        { q: String.raw`How far is the point $(1,2)$ from the line $3x+4y=1$?`, answer: "2",
          solution: String.raw`The normal direction $(3,4)$ is perpendicular to the line. A point reached by moving along it has coordinates $(1-3t,2-4t)$. Substitution gives $11-25t=1$, so $t=2/5$. This move reaches the line perpendicularly, and its length is $(2/5)\sqrt{3^2+4^2}=2$.` },
        { q: String.raw`What is the radius of the circle $x^2+y^2-6x+8y=0$?`, answer: "5",
          solution: String.raw`Completing the squares gives $(x-3)^2-9+(y+4)^2-16=0$. Thus every point on the circle has squared distance $25$ from $(3,-4)$. Its radius is $5$.` }
      ],
      problems: [
        "2005 AMC 8, Problem 3",
        "2019 AMC 8, Problem 6",
        "2000 AMC 8, Problem 18"
      ]
    },
    "S7.2": {
      prereq: ["distance-midpoint", "line-forms", "similar-figures-ratios"],
      cards: ["section-formula", "angle-between-lines", "parallel-lines-distance", "point-line-distance"],
      body: String.raw`What matters when locating a point on a segment is how far it has traveled as a fraction of the whole segment. If $P$ divides $AB$ internally in the ratio $AP:PB=m:n$ with $m,n>0$, then $P-A=\frac{m}{m+n}(B-A)$, with the same fraction applied to each coordinate. Rearranging gives the [[section-formula|section formula]]
$$P=\frac{nA+mB}{m+n}.$$
For $A=(1,2)$, $B=(7,11)$ and ratio $1:2$, one third of the displacement $(6,9)$ is $(2,3)$, so $P=(3,5)$. The same displacement equation works for a point on the extended line by allowing the fraction to be below zero or above one.

The slope of a nonvertical line is the tangent of the angle it makes with the positive $x$-direction. Applying the tangent difference formula and taking the absolute value gives the [[angle-between-lines|smaller angle between lines]] with slopes $m_1,m_2$:
$$\tan\theta=\left|\frac{m_2-m_1}{1+m_1m_2}\right|.$$
For slopes $\frac12$ and $3$, both the numerator and denominator have magnitude $\frac52$, giving $45^\circ$. If $m_1m_2=-1$, the lines are perpendicular and the tangent is undefined. If exactly one line is vertical, find the other line's smaller angle with the horizontal and subtract it from $90^\circ$. Parallel lines have angle zero.

A line in the form $ax+by+c=0$ has normal direction $(a,b)$, perpendicular to its direction $(b,-a)$. From $P=(x_0,y_0)$, move along the normal to the foot $H=P-t(a,b)$. Substitution into the line equation gives $t(a^2+b^2)=ax_0+by_0+c$. The [[point-line-distance|distance to the line]] is the length of that displacement:
$$PH=|t|\sqrt{a^2+b^2}=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}.$$
For $P=(2,3)$ and $5x-12y+13=0$, the expression at $P$ is $-13$ and the normal has length $13$. The foot is reached by adding $(5,-12)/13$ to $P$, a move of length one.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 193" role="img" aria-label="The distance is measured along the normal from P to its foot H." style="width:100%;max-width:410px;height:auto"><title>The distance is measured along the normal from P to its foot H.</title><path d="M120.385 169.923L392.138 56.692" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M273 37L297.615 96.077" fill="none" stroke="currentColor" stroke-width="2"/><path d="M308.249 91.646L303.818 81.012L293.185 85.443" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="273" cy="37" r="3" fill="currentColor" stroke="currentColor"/><circle cx="297.615" cy="96.077" r="3" fill="currentColor" stroke="currentColor"/><text x="263" y="42" fill="currentColor" text-anchor="end" font-size="17">P</text><text x="309.615" y="119.077" fill="currentColor" text-anchor="middle" font-size="17">H</text><text x="262" y="71.538" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="111" y="124" fill="currentColor" text-anchor="middle" font-size="17">5x − 12y + 13 = 0</text></svg>

The same computation gives the [[parallel-lines-distance|distance between parallel lines]]. Write their equations with matching coefficients, $ax+by=c_1$ and $ax+by=c_2$. Every point on the first makes the second line's expression equal to $c_1-c_2$. Thus the distance is constant and equals $|c_1-c_2|/\sqrt{a^2+b^2}$. In particular, $3x+4y=5$ and $3x+4y=20$ are three units apart.`,
      related: [
        { card: "mass-points", note: String.raw`the same weighted average of the ends, as masses (S3.5).` },
        { card: "angle-addition", note: String.raw`the formula for $\tan(\alpha - \beta)$ behind the angle between lines (L12.2).` },
        { card: "tangent-lines-from-point", note: String.raw`tangent lines found by setting the distance to the center equal to the radius (S7.3).` }
      ],
      exercises: [
        { q: String.raw`Point $P$ lies on the segment from $A=(1,2)$ to $B=(7,11)$ with $AP:PB=1:2$. What is the sum of the coordinates of $P$?`, answer: "8",
          solution: String.raw`Since $AB$ has three ratio parts and $AP$ has one, take one third of the displacement $(6,9)$ from $A$ to $B$. Adding $(2,3)$ to $A$ gives $P=(3,5)$, with coordinate sum $8$.` },
        { q: String.raw`What is the acute angle between lines of slopes $\tfrac12$ and $3$, in degrees?`, answer: "45",
          solution: String.raw`If the inclinations from the horizontal are $\alpha$ and $\beta$, their tangents are $\frac12$ and $3$. The tangent difference formula gives $\tan(\beta-\alpha)=(3-\frac12)/(1+3\cdot\frac12)=1$. Both inclinations are acute, so their positive difference is the acute angle $45^\circ$.` },
        { q: String.raw`How far apart are the lines $3x+4y=5$ and $3x+4y=20$?`, answer: "3",
          solution: String.raw`Moving one unit in the normal direction $(3,4)/5$ increases $3x+4y$ by $(3^2+4^2)/5=5$. To go perpendicularly from the first line to the second, the expression must increase by $20-5=15$. The distance is $15/5=3$.` },
        { q: String.raw`How far is the point $(2,3)$ from the line $5x-12y+13=0$?`, answer: "1",
          solution: String.raw`At the given point, the line expression is $10-36+13=-13$. Moving one unit in the normal direction $(5,-12)/13$ increases it by $(25+144)/13=13$. That move reaches the line perpendicularly, so the distance is one.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 10",
        "2009 AMC 10B, Problem 12",
        "2020 AMC 12B, Problem 7",
        "2005 AMC 12B, Problem 14",
        "2009 AMC 12B, Problem 9",
        "2007 AMC 12A, Problem 19",
        "2006 AMC 12A, Problem 22",
        "2018 AMC 12A, Problem 17"
      ]
    },
    "S7.3": {
      prereq: ["distance-midpoint", "point-line-distance", "tangent-facts"],
      cards: ["circle-equation", "tangent-lines-from-point", "angle-bisectors-of-lines", "perpendicular-bisector-locus", "bisector-closer-region"],
      body: String.raw`A locus is the set of all points satisfying a stated condition. The [[circle-equation|equation of a circle]] with center $(h,k)$ and radius $r>0$ comes from squaring the distance condition:
$$(x-h)^2+(y-k)^2=r^2.$$
Conversely, completing the squares in $x^2+y^2+Dx+Ey+F=0$ puts it in this form. The constant on the right must be positive for a circle, zero for a single point, and negative for an empty locus. For $x^2+y^2-4x+6y-12=0$, the completed equation is $(x-2)^2+(y+3)^2=25$, so the center is $(2,-3)$ and the radius is five.

A tangent meets a circle in one point. Let the perpendicular foot from the center to a line be $H$ and its distance from the center be $d$. A point on the line lies on the circle exactly when its distance from $H$ has square $r^2-d^2$, by the Pythagorean theorem. Thus the line has two intersections if $d<r$, one if $d=r$, and none if $d>r$. This gives an equation for the [[tangent-lines-from-point|tangents through a given point]]. For the circle $(x-5)^2+y^2=9$, a nonvertical line through the origin has form $y=mx$. Its distance from $(5,0)$ is $|5m|/\sqrt{1+m^2}$. Setting that equal to three gives $25m^2=9(1+m^2)$, so $m=\pm\frac34$. The vertical candidate $x=0$ is five units from the center, so the two slopes account for all tangents. Each tangent segment has length four, by the right triangle with radius three and hypotenuse five.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353 310" role="img" aria-label="Two tangents from O meet the radii at right angles, making two 3–4–5 triangles." style="width:100%;max-width:353px;height:auto"><title>Two tangents from O meet the radii at right angles, making two 3–4–5 triangles.</title><circle cx="207" cy="155" r="93" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M151.2 80.6L52 155L151.2 229.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M151.2 80.6L207 155L151.2 229.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M52 155L207 155" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M143.016 86.738L149.154 94.922L157.338 88.784" fill="none" stroke="currentColor" stroke-width="1"/><path d="M143.016 223.262L149.154 215.078L157.338 221.216" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="52" cy="155" r="3" fill="currentColor" stroke="currentColor"/><circle cx="207" cy="155" r="3" fill="currentColor" stroke="currentColor"/><circle cx="151.2" cy="80.6" r="3" fill="currentColor" stroke="currentColor"/><circle cx="151.2" cy="229.4" r="3" fill="currentColor" stroke="currentColor"/><text x="35" y="161" fill="currentColor" text-anchor="middle" font-size="17">O</text><text x="222" y="161" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="143" y="67" fill="currentColor" text-anchor="middle" font-size="17">T₁</text><text x="143" y="251" fill="currentColor" text-anchor="middle" font-size="17">T₂</text><text x="113" y="98" fill="currentColor" text-anchor="middle" font-size="17">4</text><text x="113" y="221" fill="currentColor" text-anchor="middle" font-size="17">4</text><text x="188" y="111" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="188" y="210" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="132" y="175" fill="currentColor" text-anchor="middle" font-size="17">5</text></svg>

Equating two point distances and squaring makes the quadratic terms cancel. With endpoints $(0,0)$ and $(4,2)$ the equation is $x^2+y^2=(x-4)^2+(y-2)^2$, which reduces to $2x+y=5$. This is the [[perpendicular-bisector-locus|perpendicular bisector]], because it passes through the midpoint $(2,1)$ and has slope $-2$, perpendicular to the segment's slope $\frac12$. On the two sides of that line, the sign of the difference of the squared distances determines which endpoint is nearer.

For distances to two intersecting lines, equate the absolute values of their line expressions after each is divided by its normal length. Equal absolute values give two linear equations, one for equal signed expressions and one for opposite signed expressions. These are the two [[angle-bisectors-of-lines|angle bisectors]] because a point on either is at equal perpendicular distances from the two lines. For $y=0$ and $4x-3y=0$, the equation is $|y|=|4x-3y|/5$, giving $y=x/2$ and $y=-2x$. The first lies inside the acute first-quadrant sector.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 235" role="img" aria-label="The horizontal line and y = 4x/3 have perpendicular bisectors of their two angles." style="width:100%;max-width:390px;height:auto"><title>The horizontal line and y = 4x/3 have perpendicular bisectors of their two angles.</title><path d="M28.5 117L361.5 117" fill="none" stroke="currentColor" stroke-width="2"/><path d="M115.45 223.067L274.55 10.933" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32.2 198.4L357.8 35.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M143.2 13.4L246.8 220.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="195" cy="117" r="3" fill="currentColor" stroke="currentColor"/><text x="349" y="106" fill="currentColor" text-anchor="middle" font-size="17">y = 0</text><text x="322" y="22" fill="currentColor" text-anchor="middle" font-size="17">y = 4x/3</text><text x="341" y="66" fill="currentColor" text-anchor="middle" font-size="17">y = x/2</text><text x="284" y="217" fill="currentColor" text-anchor="middle" font-size="17">y = −2x</text></svg>

Inside a triangle $ABC$, the bisector of $\angle A$ meets $BC$ at $D$. It separates the [[bisector-closer-region|points nearer line $AB$ from those nearer line $AC$]]. A point on the $AB$ side has smaller perpendicular distance to $AB$, as one can check at $B$. The two small triangles have the same altitude from $A$ to $BC$, so their areas are in ratio $BD:DC=AB:AC$ by the angle-bisector theorem. The area ratio uses the triangular boundary $BC$. The distance comparison itself applies throughout the angle.`,
      related: [
        { card: "radical-axis", note: String.raw`the line from subtracting two circles' equations (S5.5).` },
        { card: "angle-bisector-theorem", note: String.raw`the bisector dividing the opposite side in the ratio of the sides (S3.5).` },
        { card: "conic-sections", note: String.raw`loci defined by distances that are not equal: ellipses, parabolas, hyperbolas (S10.2).` }
      ],
      exercises: [
        { q: String.raw`What is the radius of the circle $x^2+y^2-4x+6y-12=0$?`, answer: "5",
          solution: String.raw`Move the constant to the right and add $4$ and $9$ to complete the squares. Then $(x-2)^2+(y+3)^2=25$. The equation describes all points at distance five from $(2,-3)$.` },
        { q: String.raw`Two lines through the origin are tangent to the circle $(x-5)^2+y^2=9$. What is the positive slope?`, answer: "3/4",
          solution: String.raw`A line of positive slope has form $mx-y=0$ with $m>0$. At tangency, the distance from the center $(5,0)$ to the line must equal the radius. This gives $5m/\sqrt{1+m^2}=3$. Both sides are positive, so squaring is reversible and gives $16m^2=9$. The positive slope is $3/4$.` },
        { q: String.raw`The points equally far from $(0,0)$ and $(4,2)$ form a line. What is its $y$-intercept?`, answer: "5",
          solution: String.raw`Square the two distances to get $x^2+y^2=(x-4)^2+(y-2)^2$. The quadratic terms cancel and leave $8x+4y=20$. Setting $x=0$ gives the $y$-intercept $5$.` },
        { q: String.raw`What is the slope of the line through the origin that bisects the acute angle between the positive $x$-axis and the first-quadrant ray of $y=\tfrac43x$?`, answer: "1/2",
          solution: String.raw`Inside this angle, a point $(x,y)$ has $y>0$ and $4x-3y>0$. Its distances to the two lines are $y$ and $(4x-3y)/5$. Set these equal to obtain $8y=4x$, so the bisector has slope $1/2$.` }
      ],
      problems: [
        "2018 AMC 10A, Problem 21",
        "2003 AMC 12A, Problem 17",
        "2012 AMC 12B, Problem 10",
        "2012 AMC 12A, Problem 12",
        "2011 AMC 10B, Problem 20",
        "2015 AMC 10B, Problem 19",
        "2021 Spring AMC 10A, Problem 19",
        "2025 AMC 10A, Problem 20",
        "2021 Fall AMC 12A, Problem 13"
      ]
    },
    "S7.4": {
      prereq: ["triangle-area-standard", "area-by-pieces", "distance-midpoint"],
      cards: ["shoelace-formula", "picks-theorem", "coordinate-bash"],
      body: String.raw`Suppose a simple polygon has vertices $(x_i,y_i)$ in boundary order. Consider walking counterclockwise along its edges. Under an edge, the signed trapezoid contribution using the $x$-axis is $-\frac12(y_i+y_{i+1})(x_{i+1}-x_i)$. In each vertical strip the walk goes right along the lower edge of each interior interval and left along its upper edge. This signed sum gives the total height inside the polygon, even when the interior in the strip has several intervals. Edges parallel to the $y$-axis have zero width. Adding the contributions makes the terms $x_i y_i$ cancel around the closed polygon and leaves the [[shoelace-formula|shoelace area]]
$$A=\frac12\left|\sum_i(x_i y_{i+1}-x_{i+1}y_i)\right|.$$
The final vertex is paired with the first. Reversing the walk reverses the sign, and a self-crossing walk can have cancelling regions. For $(1,1),(5,2),(4,6),(0,4)$ in order, the contributions to twice the area are $-3,22,16,-4$, totaling $31$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346 292" role="img" aria-label="The quadrilateral has 14 interior lattice points and 5 boundary lattice points." style="width:100%;max-width:346px;height:auto"><title>The quadrilateral has 14 interior lattice points and 5 boundary lattice points.</title><path d="M98 216L238 181L203 41L63 111Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/><circle cx="98" cy="181" r="2" fill="currentColor" stroke="currentColor"/><circle cx="98" cy="146" r="2" fill="currentColor" stroke="currentColor"/><circle cx="98" cy="111" r="2" fill="currentColor" stroke="currentColor"/><circle cx="133" cy="181" r="2" fill="currentColor" stroke="currentColor"/><circle cx="133" cy="146" r="2" fill="currentColor" stroke="currentColor"/><circle cx="133" cy="111" r="2" fill="currentColor" stroke="currentColor"/><circle cx="168" cy="181" r="2" fill="currentColor" stroke="currentColor"/><circle cx="168" cy="146" r="2" fill="currentColor" stroke="currentColor"/><circle cx="168" cy="111" r="2" fill="currentColor" stroke="currentColor"/><circle cx="168" cy="76" r="2" fill="currentColor" stroke="currentColor"/><circle cx="203" cy="181" r="2" fill="currentColor" stroke="currentColor"/><circle cx="203" cy="146" r="2" fill="currentColor" stroke="currentColor"/><circle cx="203" cy="111" r="2" fill="currentColor" stroke="currentColor"/><circle cx="203" cy="76" r="2" fill="currentColor" stroke="currentColor"/><circle cx="98" cy="216" r="4" fill="currentColor" stroke="currentColor"/><circle cx="238" cy="181" r="4" fill="currentColor" stroke="currentColor"/><circle cx="203" cy="41" r="4" fill="currentColor" stroke="currentColor"/><circle cx="63" cy="111" r="4" fill="currentColor" stroke="currentColor"/><circle cx="133" cy="76" r="4" fill="currentColor" stroke="currentColor"/><text x="98" y="240" fill="currentColor" text-anchor="middle" font-size="17">(1, 1)</text><text x="247" y="204" fill="currentColor" text-anchor="end" font-size="17">(5, 2)</text><text x="203" y="28" fill="currentColor" text-anchor="middle" font-size="17">(4, 6)</text><text x="50" y="117" fill="currentColor" text-anchor="end" font-size="17">(0, 4)</text><text x="127" y="59" fill="currentColor" text-anchor="middle" font-size="17">(2, 5)</text></svg>

A lattice point has two integer coordinates. A segment with displacement $(a,b)\ne(0,0)$ has $g+1$ lattice points including its ends, where $g=\gcd(|a|,|b|)$. Its shortest positive lattice step is $(a/g,b/g)$: once these two components are coprime, multiplying both by the same fraction gives two integers only when that multiplier is an integer. Around a polygon we sum the values of $g$ over the edges, counting each shared vertex once.

For a simple lattice polygon with no holes, [[picks-theorem|Pick's theorem]] gives $A=I+B/2-1$, where $I$ counts strictly interior lattice points and $B$ counts boundary lattice points. In the pictured quadrilateral, the edge from $(4,6)$ to $(0,4)$ has displacement $(-4,-2)$ and one extra boundary point, $(2,5)$. Each other edge has coprime coordinate differences. Thus $B=5$, and the area $31/2$ gives $I=14$.

To see why the formula holds, triangulate the polygon using all its lattice points as vertices. Start with diagonals between polygon vertices, then subdivide the triangles at every remaining lattice point. Each small triangle has area $1/2$. Indeed, one of its edges has a primitive step, meaning that its two coordinate differences are coprime. Bézout's identity (M5.2) gives a change to integer coordinates of equal area in which this edge joins $(0,0)$ to $(1,0)$ and the third vertex is $(u,d)$ with $d>0$. The change has determinant $\pm1$ and an integer inverse, so it preserves the lattice. If $d>1$, the section at height one runs from $u/d$ to $u/d+(d-1)/d$. This interval contains an integer because its left endpoint is an integer multiple of $1/d$. The resulting point would be a lattice point other than a vertex of the small triangle, a contradiction. So $d=1$.

If the triangulation has $T$ triangles and $E$ edges, then $3T=2E-B$, since every interior edge is counted twice and every boundary edge once. Also $(I+B)-E+T=1$: before triangulating, the boundary cycle has as many vertices as edges and encloses one face. Each added diagonal creates one edge and one face. A point inside a triangle splits it into three, adding one vertex, three edges and two faces. A point inside an existing edge splits that edge and each neighboring triangle, adding one vertex and one more net edge than face. Eliminating $E$ gives $T=2I+B-2$. Multiplying by the area $1/2$ of each small triangle gives Pick's formula.

The placement of axes can simplify the equations before we apply either area method. For a [[coordinate-bash|coordinate solution]] in a square of side two, place consecutive vertices at $A=(0,0)$, $B=(2,0)$, $C=(2,2)$ and $D=(0,2)$. The line from $A$ to the midpoint of $CD$ is $y=2x$, and diagonal $BD$ is $x+y=2$. Their intersection $P=(2/3,4/3)$ gives triangle $ABP$ height $4/3$ above base $AB$. The area is $4/3$. Placing $AB$ along an axis made both the intersection and the height available from the same two equations.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265 229" role="img" aria-label="Positioning the square on the axes makes the height of triangle ABP the y-coordinate of P." style="width:100%;max-width:265px;height:auto"><title>Positioning the square on the axes makes the height of triangle ABP the y-coordinate of P.</title><path d="M18 184L243 184L237 180" fill="none" stroke="currentColor" stroke-width="1"/><path d="M243 184L237 188" fill="none" stroke="currentColor" stroke-width="1"/><path d="M74 209L74 19L70 25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M74 19L78 25" fill="none" stroke="currentColor" stroke-width="1"/><text x="251" y="176" fill="currentColor" text-anchor="middle" font-size="17">x</text><text x="62" y="22" fill="currentColor" text-anchor="middle" font-size="17">y</text><path d="M74 184L166 184L166 92L74 92Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M74 184L166 184L104.667 122.667Z" fill="currentColor" fill-opacity="0.11" stroke="currentColor" stroke-width="1.5"/><path d="M74 184L120 92" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M166 184L74 92" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M104.667 122.667L104.667 184" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="74" cy="184" r="3" fill="currentColor" stroke="currentColor"/><circle cx="166" cy="184" r="3" fill="currentColor" stroke="currentColor"/><circle cx="166" cy="92" r="3" fill="currentColor" stroke="currentColor"/><circle cx="74" cy="92" r="3" fill="currentColor" stroke="currentColor"/><circle cx="120" cy="92" r="3" fill="currentColor" stroke="currentColor"/><circle cx="104.667" cy="122.667" r="3" fill="currentColor" stroke="currentColor"/><text x="59" y="201" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="166" y="208" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="182" y="97" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="59" y="97" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="120" y="79" fill="currentColor" text-anchor="middle" font-size="17">M</text><text x="121.667" y="132.667" fill="currentColor" text-anchor="middle" font-size="17">P</text></svg>`,
      related: [
        { card: "lattice-points-gcd", note: String.raw`the lattice points on a segment, $\gcd + 1$ (S10.3).` },
        { card: "determinant-geometric", note: String.raw`the shoelace sum as a determinant (S10.3).` },
        { card: "point-line-distance", note: String.raw`heights in coordinates (S7.2).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the quadrilateral with corners $(1,1)$, $(5,2)$, $(4,6)$ and $(0,4)$, in that order?`, answer: "31/2",
          solution: String.raw`Compute the signed contribution from each directed edge, including the edge back to the first vertex. The four terms $x_i y_{i+1}-x_{i+1}y_i$ are $2-5=-3$, $30-8=22$, $16-0=16$ and $0-4=-4$. Their sum is $31$, so the area is $31/2$.` },
        { q: String.raw`A simple polygon with lattice-point corners and no holes contains $10$ strictly interior lattice points and $8$ boundary lattice points. What is its area?`, answer: "13",
          solution: String.raw`These counts are $I=10$ and $B=8$. Pick's theorem assigns one unit of area per interior point and half a unit per boundary point, with the final subtraction of one for the polygon. Thus $A=10+8/2-1=13$.` },
        { q: String.raw`Square $ABCD$ has side $2$, and $M$ is the midpoint of $CD$. Segments $AM$ and $BD$ meet at $P$. What is the area of triangle $ABP$?`, answer: "4/3",
          solution: String.raw`Place $A=(0,0)$, $B=(2,0)$, $C=(2,2)$ and $D=(0,2)$, so $M=(1,2)$. Line $AM$ is $y=2x$, and $BD$ is $x+y=2$. Solving gives $P=(2/3,4/3)$, which lies on both segments. The distance from $P$ to the base on the $x$-axis is $4/3$, and the area is $\frac12\cdot2\cdot\frac43=\frac43$.` }
      ],
      problems: [
        "1996 AJHSME, Problem 22",
        "2002 AMC 8, Problem 15",
        "2004 AMC 8, Problem 14",
        "2007 AMC 8, Problem 23",
        "2015 AMC 8, Problem 19",
        "2019 AMC 10A, Problem 7",
        "2006 AMC 10A, Problem 17",
        "2007 AMC 10A, Problem 18",
        "2013 AMC 10A, Problem 16",
        "2012 AMC 10A, Problem 15",
        "2003 AMC 10A, Problem 22"
      ]
    },
    "S7.5": {
      prereq: ["distance-midpoint", "point-line-distance", "pythagorean-theorem"],
      cards: ["reflection-coordinates", "rotation-90", "composing-transformations", "reflect-across-the-line", "folded-paper"],
      body: String.raw`A rotation or reflection is an isometry, a move that preserves distances. A [[rotation-90|counterclockwise quarter turn]] about the origin takes the unit $x$-direction to the unit $y$-direction and the unit $y$-direction to the negative $x$-direction. So the displacement $(x,y)$ becomes $(-y,x)$. For example, $(3,1)$ becomes $(-1,3)$. A second quarter turn gives the half-turn rule $(-x,-y)$. For a turn by any angle $\theta$, the two unit directions become $(\cos\theta,\sin\theta)$ and $(-\sin\theta,\cos\theta)$, giving the image $(x\cos\theta-y\sin\theta,x\sin\theta+y\cos\theta)$. For a center other than the origin, apply the rule to the displacement from that center and then add the center back.

A [[reflection-coordinates|reflection across a line]] fixes every point on the line and reverses perpendicular displacements. If $P=(x_0,y_0)$ and $H$ is its perpendicular foot on $ax+by+c=0$, the image is $P'=2H-P$, because $H$ is the midpoint of $PP'$. The calculation for the perpendicular foot (S7.2) gives
$$P'=P-\frac{2(ax_0+by_0+c)}{a^2+b^2}(a,b).$$
For $P=(4,1)$ and $y=x+1$, the line has expression $x-y+1$, equal to four at $P$. The image is $(4,1)-4(1,-1)=(0,5)$. Specializing to the axes gives $(x,-y)$ or $(-x,y)$, and reflecting over $y=x$ swaps the coordinates.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281 266" role="img" aria-label="Reflection in y = x + 1 exchanges P and P′ with the foot H halfway between them." style="width:100%;max-width:281px;height:auto"><title>Reflection in y = x + 1 exchanges P and P′ with the foot H halfway between them.</title><path d="M18 232L259 232L253 228" fill="none" stroke="currentColor" stroke-width="1"/><path d="M259 232L253 236" fill="none" stroke="currentColor" stroke-width="1"/><path d="M53 246L53 19L49 25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M53 19L57 25" fill="none" stroke="currentColor" stroke-width="1"/><text x="267" y="224" fill="currentColor" text-anchor="middle" font-size="17">x</text><text x="41" y="22" fill="currentColor" text-anchor="middle" font-size="17">y</text><path d="M30.25 219.75L215.75 34.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M193 197L53 57" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M130 134L137 127L130 120" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="53" cy="57" r="3" fill="currentColor" stroke="currentColor"/><circle cx="123" cy="127" r="3" fill="currentColor" stroke="currentColor"/><circle cx="193" cy="197" r="3" fill="currentColor" stroke="currentColor"/><text x="40" y="49" fill="currentColor" text-anchor="middle" font-size="17">P′</text><text x="129" y="150" fill="currentColor" text-anchor="middle" font-size="17">H</text><text x="207" y="202" fill="currentColor" text-anchor="middle" font-size="17">P</text><text x="217" y="98" fill="currentColor" text-anchor="middle" font-size="17">y = x + 1</text></svg>

When we [[composing-transformations|compose two reflections]] in intersecting lines, their intersection stays fixed. Measured from that point, an initial direction $\phi$ reflects in the first line of direction $\alpha$ to $2\alpha-\phi$. Reflection in the second line of direction $\beta$ sends that to $\phi+2(\beta-\alpha)$. The distance to the intersection stays fixed, so this is a rotation by twice the directed angle from the first line to the second. The order matters. For parallel lines, use a coordinate perpendicular to both. Reflecting successively across the coordinate values $u$ and $v$ adds $2(v-u)$ to that coordinate, leaving the parallel coordinate unchanged. This gives a translation.

A reflection also changes how a constrained path is drawn. Let $A=(0,1)$ and $B=(4,2)$ and require the path to touch the $x$-axis at $X$. For the [[reflect-across-the-line|reflection method]], reflect $A$ to $A'=(0,-1)$. Then $AX= A'X$, so $AX+XB=A'X+XB\ge A'B=5$. The straight segment $A'B$ crosses the axis at $(4/3,0)$, so equality is attainable. If the contact is restricted to a segment of the axis, check whether that crossing lies in the allowed segment.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 235" role="img" aria-label="The reflected segment A′B crosses the axis at X and has the same length as AX plus XB." style="width:100%;max-width:333px;height:auto"><title>The reflected segment A′B crosses the axis at X and has the same length as AX plus XB.</title><path d="M18 153L311 153L305 149" fill="none" stroke="currentColor" stroke-width="1"/><path d="M311 153L305 157" fill="none" stroke="currentColor" stroke-width="1"/><path d="M58 215L58 19L54 25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M58 19L62 25" fill="none" stroke="currentColor" stroke-width="1"/><text x="319" y="145" fill="currentColor" text-anchor="middle" font-size="17">x</text><text x="46" y="22" fill="currentColor" text-anchor="middle" font-size="17">y</text><path d="M58 102L126 153L262 51" fill="none" stroke="currentColor" stroke-width="2"/><path d="M58 204L126 153" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="58" cy="102" r="3" fill="currentColor" stroke="currentColor"/><circle cx="126" cy="153" r="3" fill="currentColor" stroke="currentColor"/><circle cx="262" cy="51" r="3" fill="currentColor" stroke="currentColor"/><circle cx="58" cy="204" r="3" fill="currentColor" stroke="currentColor"/><text x="43" y="107" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="136" y="177" fill="currentColor" text-anchor="middle" font-size="17">X</text><text x="279" y="56" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="42" y="209" fill="currentColor" text-anchor="middle" font-size="17">A′</text></svg>

In a [[folded-paper|paper fold]] the landing point is the reflection of its original position in the crease. Consequently each point of the crease is equidistant from the two. In a square $ABCD$ of side eight, fold $A$ to the midpoint $M$ of $BC$, and let $P$ be where the crease meets $AB$. With $PB=x$, we have $PA=8-x$ and $PM^2=x^2+4^2$. Equating the squares cancels $x^2$ and gives $x=3$. This lies on the side, so the calculated intersection is part of the crease on the sheet.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 252" role="img" aria-label="On the crease PQ, P is the same distance from A and from its reflection M." style="width:100%;max-width:298px;height:auto"><title>On the crease PQ, P is the same distance from A and from its reflection M.</title><path d="M52 207L228 207L228 31L52 31Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M162 207L74 31" fill="none" stroke="currentColor" stroke-width="2"/><path d="M52 207L228 119" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M162 207L228 119" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="52" cy="207" r="3" fill="currentColor" stroke="currentColor"/><circle cx="228" cy="207" r="3" fill="currentColor" stroke="currentColor"/><circle cx="228" cy="31" r="3" fill="currentColor" stroke="currentColor"/><circle cx="52" cy="31" r="3" fill="currentColor" stroke="currentColor"/><circle cx="228" cy="119" r="3" fill="currentColor" stroke="currentColor"/><circle cx="162" cy="207" r="3" fill="currentColor" stroke="currentColor"/><circle cx="74" cy="31" r="3" fill="currentColor" stroke="currentColor"/><text x="52" y="229" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="228" y="229" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="243" y="36" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="37" y="36" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="246" y="124" fill="currentColor" text-anchor="middle" font-size="17">M</text><text x="162" y="229" fill="currentColor" text-anchor="middle" font-size="17">P</text><text x="74" y="19" fill="currentColor" text-anchor="middle" font-size="17">Q</text></svg>`,
      related: [
        { card: "rotation-reflection-matrices", note: String.raw`the same moves as matrices (S10.4).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the crease as the points equally far from a point and its image (S7.3).` },
        { card: "rotation-trick", note: String.raw`a rotation that brings three given distances together (S10.4).` }
      ],
      exercises: [
        { q: String.raw`The point $(3,1)$ is rotated $90^\circ$ counterclockwise about the origin. What is the sum of the coordinates of its image?`, answer: "2",
          solution: String.raw`The displacement of three in the positive $x$-direction turns into three in the positive $y$-direction. The displacement of one in the positive $y$-direction turns into one in the negative $x$-direction. The image is $(-1,3)$ and the sum is $2$.` },
        { q: String.raw`The point $(4,1)$ is reflected over the line $y=x+1$. What is the sum of the coordinates of its image?`, answer: "5",
          solution: String.raw`The perpendicular through $(4,1)$ has slope $-1$ and equation $y=5-x$. It meets the mirror at $(2,3)$. That point is the midpoint between $(4,1)$ and its image, so the reflected point is $2(2,3)-(4,1)=(0,5)$. Its coordinates sum to five.` },
        { q: String.raw`What is the length of the shortest path from $(0,1)$ to a point on the $x$-axis and then to $(4,2)$?`, answer: "5",
          solution: String.raw`Reflect the first endpoint to $(0,-1)$. Every possible contact point on the axis is just as far from the reflected point as from the original endpoint. The triangle inequality now bounds the path below by the straight distance $\sqrt{4^2+3^2}=5$. The straight segment rises from $y=-1$ to $y=2$, so its axis crossing supplies an eligible contact and attains this bound.` },
        { q: String.raw`Square $ABCD$ has side $8$, and $M$ is the midpoint of $BC$. The square is folded so that $A$ lands on $M$. The crease meets $AB$ at $P$. How long is $PB$?`, answer: "3",
          solution: String.raw`The crease is the perpendicular bisector of $AM$, so $PA=PM$. With $PB=x$, we have $PA=8-x$ and $PM^2=x^2+4^2$ by the right angle at $B$. Thus $(8-x)^2=x^2+16$, so $64-16x=16$ and $x=3$. The point is on $AB$ because $0<3<8$.` }
      ],
      problems: [
        "1991 AJHSME, Problem 16",
        "2001 AMC 8, Problem 16",
        "2025 AMC 8, Problem 10",
        "2019 AMC 10B, Problem 5",
        "2015 AMC 10B, Problem 8",
        "2003 AMC 12A, Problem 9",
        "2004 AMC 12B, Problem 9",
        "2014 AMC 10A, Problem 18",
        "2016 AMC 10A, Problem 16",
        "2018 AMC 10A, Problem 13",
        "2018 AMC 10B, Problem 15",
        "2021 Spring AMC 12A, Problem 11",
        "2014 AMC 12A, Problem 20",
        "2020 AMC 12A, Problem 20"
      ]
    },
    "S7.6": {
      prereq: ["polygon-angle-sums", "prism-pyramid-volumes"],
      cards: ["figure-symmetries", "fit-copies"],
      body: String.raw`A [[figure-symmetries|symmetry of a figure]] is a move that carries the figure onto itself. A regular $n$-gon has $n$ rotations about its center by multiples of $360^\circ/n$, including the identity. A rotation must send one chosen vertex to a vertex, and each of the $n$ possible images determines exactly one rotation. Once that vertex moves, the remaining vertices follow in their original circular order.

A reflection must also send the chosen vertex to a vertex, but it reverses their circular order. Each of the $n$ choices again determines a symmetry. Its axis passes through the center because the reflection preserves the polygon's circumcircle and fixes its center. For odd $n$, an axis joins a vertex and the midpoint of the opposite side. For even $n$, half the axes join opposite vertices and half join opposite side midpoints. The regular hexagon has three axes of each kind, and the square has four rotations, by $0^\circ$, $90^\circ$, $180^\circ$ and $270^\circ$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383 174" role="img" aria-label="A regular hexagon has axes through opposite vertices and axes through opposite side midpoints." style="width:100%;max-width:383px;height:auto"><title>A regular hexagon has axes through opposite vertices and axes through opposite side midpoints.</title><path d="M165 87L131 28.11L63 28.11L29 87L63 145.89L131 145.89Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M180 87L14 87" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/><circle cx="97" cy="87" r="2" fill="currentColor" stroke="currentColor"/><path d="M354 87L320 28.11L252 28.11L218 87L252 145.89L320 145.89Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M357.88 45.5L214.12 128.5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"/><circle cx="286" cy="87" r="2" fill="currentColor" stroke="currentColor"/><text x="97" y="166" fill="currentColor" text-anchor="middle" font-size="17">Opposite vertices</text><text x="286" y="166" fill="currentColor" text-anchor="middle" font-size="17">Opposite side midpoints</text></svg>

Symmetry can also explain why pieces have equal measure. To [[fit-copies|find the size of a piece by fitting copies together]], the copies must cover the whole region and their interiors must be disjoint. A square diagonal gives the simplest example. It divides the square into two triangles that are mirror images, so each has half the area.

The argument extends to volume. In a cube with $0\le x,y,z\le3$, take the vertex $(0,0,0)$ as the apex and the three opposite faces $x=3$, $y=3$ and $z=3$ as bases. The pyramid on the face $x=3$ consists of points where $x\ge y$ and $x\ge z$. At coordinate $x=t$, its section is a square with $0\le y,z\le t$, because the section is a scaled copy of the base. The three pyramids fill the cube since every point has a largest coordinate, and their interiors are disjoint since ties occur only on the shared boundary. Permuting coordinates takes any pyramid to either of the others. Each therefore has volume $27/3=9$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366 277" role="img" aria-label="The three opposite faces are the bases of three congruent pyramids with the same hidden apex O." style="width:100%;max-width:366px;height:auto"><title>The three opposite faces are the bases of three congruent pyramids with the same hidden apex O.</title><path d="M263 216L183 258L183 160L263 118Z" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.5"/><path d="M103 216L183 258L183 160L103 118Z" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.5"/><path d="M183 76L263 118L183 160L103 118Z" fill="currentColor" fill-opacity="0.02" stroke="currentColor" stroke-width="1.5"/><path d="M263 216L183 174L103 216" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M183 76L183 174L183 160" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="183" cy="174" r="3" fill="currentColor" stroke="currentColor"/><text x="198" y="202" fill="currentColor" text-anchor="middle" font-size="17">O</text><text x="228" y="224" fill="currentColor" text-anchor="middle" font-size="17">x = 3</text><text x="138" y="224" fill="currentColor" text-anchor="middle" font-size="17">y = 3</text><text x="211" y="112" fill="currentColor" text-anchor="middle" font-size="17">z = 3</text></svg>`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting colorings up to the symmetries of a figure (R8.2).` },
        { card: "wlog-symmetry", note: String.raw`letting a symmetry choose one case (R7.6).` },
        { card: "prism-pyramid-volumes", note: String.raw`the pyramid's volume, which the three copies confirm (S8.2).` }
      ],
      exercises: [
        { q: String.raw`How many lines of symmetry does a regular hexagon have?`, answer: "6",
          solution: String.raw`A reflection axis passes through the center. If it passes through a vertex, it passes through the opposite vertex as well, giving three axes. If it passes through a side midpoint, it also passes through the opposite side midpoint, giving three more. These are the only possibilities because a reflection sends vertex pairs to vertex pairs and reverses their order. The total is six.` },
        { q: String.raw`How many distinct rotations, including the identity, carry a square onto itself?`, answer: "4",
          solution: String.raw`A rotation carrying the square onto itself also fixes its center, the intersection of the diagonals. Once the image of one vertex is specified, the rotation about the center is determined. All four vertices are possible images, giving $0^\circ$, $90^\circ$, $180^\circ$ and $270^\circ$.` },
        { q: String.raw`A cube of side $3$ is cut into three congruent pyramids that share a corner of the cube. What is the volume of each?`, answer: "9",
          solution: String.raw`The three pyramids have equal volumes and their interiors are disjoint. Since they fill a cube of volume $3^3=27$, each has volume $27/3=9$. Equivalently, in the construction with each opposite face as a base, the base area is nine and the perpendicular height is three, giving $\frac13\cdot9\cdot3=9$.` }
      ],
      problems: [
        "1989 AJHSME, Problem 11",
        "2010 AMC 8, Problem 6",
        "2017 AMC 10B, Problem 6",
        "2003 AMC 12B, Problem 10"
      ]
    },
    "S7.7": {
      prereq: ["section-formula", "angle-between-lines", "parallel-lines-distance", "point-line-distance", "circle-equation", "tangent-lines-from-point", "angle-bisectors-of-lines", "perpendicular-bisector-locus", "bisector-closer-region", "shoelace-formula", "picks-theorem", "coordinate-bash", "reflection-coordinates", "rotation-90", "composing-transformations", "reflect-across-the-line", "folded-paper", "figure-symmetries", "fit-copies"],
      cards: [],
      body: String.raw`Choose axes along a convenient side or symmetry line. The [[section-formula|section formula]] locates a point by a fraction of one displacement, and the [[angle-between-lines|angle between lines]] follows from the difference of their inclinations. To find the [[point-line-distance|distance to a line]], move along its normal. The same distance is fixed [[parallel-lines-distance|between parallel lines]] once their equations have matching coefficients.

A [[circle-equation|circle equation]] fixes the distance from a center. For [[tangent-lines-from-point|tangents through a point]], find the lines through the point whose distance from the center equals the radius. An equality of distances gives a [[perpendicular-bisector-locus|perpendicular bisector]] for two points or [[angle-bisectors-of-lines|two angle bisectors]] for intersecting lines. Comparing the distances then identifies [[bisector-closer-region|which region is closer]] to each point or line.

In a [[coordinate-bash|coordinate solution]], placing a base along an axis makes the corresponding height a coordinate. For an arbitrary simple polygon, the [[shoelace-formula|shoelace formula]] uses an ordered walk along its boundary. [[picks-theorem|Pick's theorem]] uses interior and boundary counts when the vertices lie on the integer lattice. For a lattice polygon, one method can supply the area and the other the count of interior lattice points. The greatest common divisors of the edge displacements give the boundary count.

A [[rotation-90|rotation]] or [[reflection-coordinates|reflection]] preserves all distances. [[composing-transformations|Composing reflections]] produces a rotation or translation, depending on whether the mirror lines intersect. Reflection puts a [[folded-paper|fold]] on a perpendicular bisector and can [[reflect-across-the-line|turn a broken path into a straight segment]] if the crossing is permitted. To count a regular polygon's [[figure-symmetries|symmetries]], track the image of one vertex and the order of the others. To [[fit-copies|divide a whole into equal parts]], identify a move that exchanges them and show that they cover the whole without sharing interior points.`,
      strategies: [
        String.raw`Place a figure with a corner at the origin and its sides along the axes.`,
        String.raw`Make the coefficients match before measuring between parallel lines.`,
        String.raw`Complete the squares to find a circle's center and radius.`,
        String.raw`For tangents through a point, set the distance from the center equal to the radius and check the vertical line separately.`,
        String.raw`Walk the boundary in order for the shoelace sum. For a lattice polygon, sum the edge displacement gcds to count boundary points.`,
        String.raw`For a shortest path touching a line, reflect one endpoint and check that the straight path crosses where contact is allowed.`,
        String.raw`Treat a fold as a reflection: the crease is a perpendicular bisector.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How far is the origin from the line $3x+4y=10$?`, answer: "2",
        solution: String.raw`The perpendicular through the origin has direction $(3,4)$. Its point $(3t,4t)$ lies on the line when $9t+16t=10$, so $t=2/5$. The distance to that point is $(2/5)\sqrt{3^2+4^2}=2$.` },
      { q: String.raw`What is the area of the quadrilateral with corners $(0,0)$, $(6,0)$, $(6,4)$ and $(2,4)$, in that order?`, answer: "20",
        solution: String.raw`The bottom and top sides are horizontal of lengths six and four. Their vertical separation is four, so the trapezoid area is $\frac{6+4}{2}\cdot4=20$. The closing edge contributes zero in the shoelace sum because it meets the origin, and the two nonzero contributions are $6\cdot4=24$ and $6\cdot4-2\cdot4=16$. Half their sum gives the same area.` },
      { q: String.raw`The point $(2,0)$ is rotated $90^\circ$ counterclockwise about the origin twice. What is the $x$-coordinate of its image?`, answer: "-2",
        solution: String.raw`The first turn sends $(2,0)$ to $(0,2)$. The second sends it to $(-2,0)$. Together they make a half turn and the resulting $x$-coordinate is $-2$.` },
      { q: String.raw`How far apart are the lines $6x-8y=12$ and $-3x+4y=-31$?`, answer: "5",
        solution: String.raw`The first equation becomes $3x-4y=6$ after division by two, and the second becomes $3x-4y=31$ after multiplication by $-1$. The line expressions now use the same normal of length five. The change in the constant is $25$, so the perpendicular distance is $25/5=5$.` },
      { q: String.raw`Two lines through the origin are tangent to $(x-4)^2+(y-3)^2=16$. One is vertical. What is the slope of the other?`, answer: "-7/24",
        solution: String.raw`The line $x=0$ is four units from the center $(4,3)$, so it is tangent. For a nonvertical candidate $y=mx$, tangency gives $|4m-3|/\sqrt{1+m^2}=4$. Squaring yields $16m^2-24m+9=16+16m^2$, so $m=-7/24$. Squaring was reversible because both distances are nonnegative, so this is the other tangent.` },
      { q: String.raw`In the triangle with $A=(0,0)$, $B=(6,0)$ and $C=(0,8)$, what is the area of the region closer to line $AB$ than to line $AC$?`, answer: "72/7",
        solution: String.raw`The bisector of the right angle at $A$ separates the two distance regions. If it meets $BC$ at $D$, the region on the $AB$ side is triangle $ABD$ except for the bisector itself. The triangles on either side have the same altitude to $BC$, and $BD:DC=AB:AC=6:8=3:4$. Triangle $ABD$ therefore has $3/7$ of the whole area $24$, which is $72/7$.` },
      { q: String.raw`How many lattice points are strictly inside the triangle with corners $(0,0)$, $(6,0)$ and $(0,4)$?`, answer: "7",
        solution: String.raw`The area is $6\cdot4/2=12$. The three edge displacements contribute $\gcd(6,0)=6$, $\gcd(6,4)=2$ and $\gcd(0,4)=4$ to the boundary count, so $B=12$. Pick's theorem gives $I=12-12/2+1=7$.` },
      { q: String.raw`Point $(5,3)$ is rotated $90^\circ$ counterclockwise about $(2,1)$. What is the sum of the coordinates of the image?`, answer: "4",
        solution: String.raw`Subtract the center to get displacement $(3,2)$. A counterclockwise quarter turn makes it $(-2,3)$. Add back the center $(2,1)$ to get $(0,4)$, whose coordinates sum to four.` },
      { q: String.raw`Point $(-1,1)$ is reflected first in $y=2$ and then in $y=5$. What is the final $y$-coordinate?`, answer: "7",
        solution: String.raw`A reflection in $y=c$ takes $y$ to $2c-y$, since $c$ is halfway between the two heights. The first reflection changes $1$ to $4-1=3$. The second changes $3$ to $10-3=7$. The combined move increases the height by six, twice the separation of the lines.` },
      { q: String.raw`A regular pentagon has a vertex $V$. How many symmetries, including the identity, fix $V$?`, answer: "2",
        solution: String.raw`A rotation of the pentagon that fixes $V$ must have angle $0^\circ$ modulo $360^\circ$. A reflection that fixes $V$ must have an axis through $V$ and the center, and this line passes through the opposite side's midpoint and really is a symmetry. Thus there are two moves that fix $V$.` }
    ],
    problems: [
      "2008 AMC 8, Problem 23",
      "2013 AMC 10A, Problem 18",
      "2000 AMC 10, Problem 16",
      "2014 AMC 10A, Problem 16",
      "2016 AMC 10B, Problem 19",
      "2022 AMC 10B, Problem 16",
      "2024 AMC 10A, Problem 13"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 10B, Problem 21",
      "2017 AMC 12A, Problem 16",
      "2019 AMC 12A, Problem 22",
      "2015 AIME I, Problem 4",
      "2011 AIME I, Problem 3"
    ]
  }
};
