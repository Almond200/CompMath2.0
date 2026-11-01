// Learn, Olympiad Geometry, chapter O6: Circles.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O6"] = {
  lessons: {
    "O6.1": {
      prereq: ["power-of-a-point"], cards: [],
      body: String.raw`Two circles cross a road. A surveyor walks along it looking for a point with equal powers to both circles. Must the surveyor solve a quadratic? Put the first center at $(0,0)$ with radius $3$ and the second at $(6,0)$ with radius $5$. The powers of $(x,y)$ are $x^2+y^2-9$ and $(x-6)^2+y^2-25$. Subtraction leaves $12x-20$. Every point of the vertical line $x=\frac53$ has equal powers, even though only two points on it belong to both circles.

The first lesson uses this cancellation to locate lines in circle diagrams. The second replaces an angle chase among tangent circles with lengths of common tangents. The third asks how cutting a cyclic quadrilateral into triangles can reveal a rectangle of centers. In each case begin by marking precisely what is given: incidence, tangency, or both.`,
      exercises: [
        { q: String.raw`On the road $y=0$ in the example, is the equal-power point inside both circles, outside both, or on both?`,
          solution: String.raw`Its power to the first circle is $\frac{25}{9}-9=-\frac{56}{9}$. The powers agree, so both are negative and the point is inside both circles.` },
        { q: String.raw`At two ends of a segment the differences of powers are $-8$ and $4$. In what ratio does the equal-power point divide the segment?`,
          solution: String.raw`The squared terms cancel, so the difference varies uniformly along the segment. Reaching zero uses $8$ of the total change of $12$, or two thirds of the journey. The division ratio is $2:1$.` }
      ]
    },
    "O6.2": {
      prereq: ["power-of-a-point", "radical-axis"], cards: ["power-of-a-point-linearity", "orthogonal-circles", "reims-theorem", "butterfly-theorem"],
      body: String.raw`The road calculation works in any direction. For centers $U,V$ and radii $r,s$, the difference $PU^2-r^2-(PV^2-s^2)$ is affine in $P$: its value at the midpoint of a segment is the average of its endpoint values. This is [[power-of-a-point-linearity|linearity of the difference of powers]]. It lets you prove that a midpoint lies on a radical axis by finding opposite endpoint values.

There is also a geometric meaning to a prescribed nonzero power. Draw a circle centered at $P$ with radius $t$ through a point $X$ of the circle $(U,r)$. If the circles meet at right angles then $PX\perp UX$, so $PU^2-r^2=t^2$. Conversely this equation makes the radii perpendicular at an intersection. Thus points of positive equal power are exactly the possible centers of circles [[orthogonal-circles|orthogonal]] to both given circles, with radius the square root of that power.

Angles become more economical when the two circles already meet at $P,Q$. Draw lines $APC$ and $BQD$, with $A,B$ on one circle and $C,D$ on the other. In directed angles modulo $180^\circ$, $\angle ABQ=\angle APQ=\angle CPQ=\angle CDQ$. The lines $BQ,DQ$ coincide, so $AB\parallel CD$. This is [[reims-theorem|Reim's theorem]]. Compare the [[butterfly-theorem|butterfly theorem]]: there the two crossing chords belong to one circle, and the crucial extra condition is that their crossing point bisects a third chord. The cross joins then cut the third chord's line at equal distances on opposite sides of its midpoint. Check the midpoint before invoking that symmetry.`,
      exercises: [
        { q: String.raw`Two centers are $13$ apart. A circle of radius $5$ about one center is orthogonal to a circle about the other. Find the second radius.`, answer: "12",
          solution: String.raw`The radii to an intersection meet at a right angle. Thus the unknown radius has square $13^2-5^2=144$, giving $12$.` },
        { q: String.raw`In a butterfly configuration the bisected chord runs from coordinate $2$ to $18$. One cross join cuts its line at $7$. Where does the other cut it?`, answer: "13",
          solution: String.raw`The midpoint has coordinate $10$. Reflection in that midpoint sends $7$ to $10+(10-7)=13$.` }
      ]
    },
    "O6.3": {
      prereq: ["ptolemys-theorem"], cards: ["caseys-theorem", "mixtilinear-incircle", "sawayama-thebault"],
      body: String.raw`On a common external tangent to circles of radii $r_i,r_j$, the contact points need not be as far apart as the centers. Drop radii to the tangent. The line of centers has components $t_{ij}$ along the tangent and $r_i-r_j$ perpendicular to it, so $t_{ij}^2=d_{ij}^2-(r_i-r_j)^2$. This is the length that enters [[caseys-theorem|Casey's theorem]]. For four circles internally tangent to one circle in cyclic order, $t_{12}t_{34}+t_{14}t_{23}=t_{13}t_{24}$. Shrink the four radii to zero and the relation becomes Ptolemy's relation for four points.

When a circle touches two sides of an angle, draw the line joining its contact points $E,F$. Reflection in the bisector exchanges the contacts, so their chord has its midpoint on the bisector. For the [[mixtilinear-incircle|mixtilinear incircle]] at $A$, internal tangency to the circumcircle pins that midpoint down to the triangle's incenter $I$. For example, triangle $AEI$ is right at $I$ since $AI\perp EF$. Its hypotenuse is the tangent length $AE$, giving $AE=\frac{AI}{\cos\left(\frac A2\right)}$.

Move the wedge from vertex $A$ to the foot $D$ of an internal cevian $AD$. A circle in the corresponding curvilinear region touches $AD$, $BC$ and the circumcircle internally. The [[sawayama-thebault|Sawayama–Thébault lemma]] puts $I$ on the line joining the two straight-side contacts. Now $I$ need not bisect the chord: the symmetry axis belongs to the angle at $D$. This incidence gives a construction of the second contact from the first.`,
      exercises: [
        { q: String.raw`Circles of radii $8$ and $3$ have centers $13$ apart. Find their external common tangent length between contacts.`, answer: "12",
          solution: String.raw`The perpendicular component is $8-3=5$, so $t=\sqrt{13^2-5^2}=12$.` },
        { q: String.raw`In the cevian configuration, suppose the contact with $BC$ is $X$ and $X\ne I$. How can the contact with $AD$ be recovered without locating the circle's center?`,
          solution: String.raw`Draw $XI$ and intersect it with $AD$. The contact chord passes through $I$ and $X$ by the lemma, so its other endpoint must be this intersection.` }
      ]
    },
    "O6.4": {
      prereq: [], cards: ["japanese-theorem", "poncelet-closure", "newtons-line"],
      body: String.raw`Draw both diagonals of a convex cyclic quadrilateral $ABCD$. Each choice of three vertices gives a triangle and hence an incenter. The [[japanese-theorem|Japanese theorem]] puts those four incenters at the corners of a rectangle. To see how one side of that rectangle is oriented, compare the incenters of $ABC$ and $ABD$. Both are equidistant from the line $AB$ and their respective other sides; their heights above $AB$ are the two inradii. When the inradii agree, their joining line is parallel to $AB$. A rectangle $ABCD$ gives a particularly accessible case, because the four constituent right triangles are congruent.

Next suppose one quadrilateral has both a circumcircle and an incircle. Pick a point on the outer circle, draw a tangent to the inner circle, and continue from its next intersection with the outer circle, always taking the forward tangent. [[poncelet-closure|Poncelet closure]] says that if this walk closes in four steps for one starting point, it does so for every starting point on that outer circle. The two circles must stay fixed throughout the walk.

A quadrilateral with an incircle alone already has a useful line. Mark the midpoints of its two diagonals. When they are distinct, [[newtons-line|Newton's line]] through them contains the incenter. It can locate an unknown center by intersecting that line with an angle bisector. The challenge proves this collinearity by subtracting areas, so a circumcircle never enters the argument.`,
      exercises: [
        { q: String.raw`For the rectangle with corners $(0,0),(8,0),(8,6),(0,6)$, find the side lengths of the rectangle of incenters.`,
          solution: String.raw`Each right triangle has inradius $\frac{6+8-10}{2}=2$. Its incenter lies two units from both legs meeting at its right angle. The four coordinates have $x=2$ or $6$ and $y=2$ or $4$, so the sides are $4$ and $2$.` },
        { q: String.raw`Does closure in four steps for a given pair of circles guarantee closure in four steps if the inner radius is changed?`,
          solution: String.raw`No. For concentric circles a square inscribed in the outer circle has distance $R\cos45^\circ$ from the center to every side. Changing that inner radius changes the central step angle and, for a generic new radius, four steps no longer make a full turn.` }
      ]
    },
    "O6.5": {
      prereq: [], cards: [],
      body: String.raw`Subtract powers to obtain a line, and prescribe a positive common power to obtain an orthogonal circle. In a tangent configuration, identify whether a requested length joins centers or contacts before applying a metric relation. For a quadrilateral, classify its circles before drawing extra lines: an outer circle gives the rectangle of incenters, an inner circle gives Newton's line, and a fixed pair permits the closure argument.`,
      strategies: ["Test equal power at two points to identify a radical axis.", "Label circles in their order of contact before writing Casey's relation.", "Use a line of contact points to locate the incenter when the circle is wedged against two lines.", "Ask what stays fixed when a vertex moves around a circumcircle."]
    }
  },
  reviewProblems: { exercises: [
    { q: String.raw`Two circles have centers $(-3,0)$ and $(3,0)$, both of radius $5$. Find the centers of circles of radius $3$ orthogonal to both.`,
      solution: String.raw`Equal distances to the two centers put the new center at $(0,y)$. Orthogonality requires $9+y^2=25+9$, so $y=\pm5$. Each choice gives intersecting circles because $|5-3|<\sqrt{34}<5+3$.` },
    { q: String.raw`Four small circles touch a larger circle internally in cyclic order. Suppose $t_{12}=t_{34}=3$, $t_{23}=t_{14}=4$, and $t_{13}=5$. Find $t_{24}$.`, answer: "5",
      solution: String.raw`Casey's relation gives $5t_{24}=3^2+4^2=25$. Hence $t_{24}=5$. These data are realized by equal small circles centered at the corners of a $3$ by $4$ rectangle, all internally tangent to a concentric outer circle.` }
  ], problems: [] },
  challenge: { exercises: [
    { q: String.raw`Let two nonconcentric circles intersect in distinct points $P,Q$. For which points $X$ on line $PQ$ is there a circle centered at $X$ orthogonal to both given circles? Express its radius using $XP,XQ$.`,
      solution: String.raw`The two powers agree on $PQ$. Outside segment $PQ$ this common power is $XP\cdot XQ>0$. Take radius $\sqrt{XP\cdot XQ}$; for each old radius $r$ the squared distance between centers is the sum of the squared radii, giving orthogonal intersections. Inside the segment the power is negative; at either endpoint it is zero. Neither gives a circle of positive radius.` },
    { q: String.raw`Prove Newton's incenter collinearity for a convex tangential quadrilateral whose diagonal midpoints are distinct.`,
      solution: String.raw`For an interior point $X$, subtract the areas on one opposite pair of sides from those on the other: $f(X)=[XAB]+[XCD]-[XBC]-[XDA]$. Extend the areas as signed areas, positive on the interior. Each is affine in $X$, by base times signed height. On $AC$, the endpoint values are $[ACD]-[ABC]$ at $A$ and its negative at $C$ (using $[ACD]$ and $[ABC]$ for ordinary positive areas). Thus $f$ vanishes at the midpoint of $AC$. The same argument on $BD$ gives the other midpoint. The zero set is a line unless $f$ is identically zero. In that exceptional case $f(A)=f(C)=0$ forces $ABCD$ to have equal areas on the two sides of $AC$, and $f(B)=0$ gives the analogous equality on $BD$. Each diagonal then bisects the other, contrary to the distinct midpoints. Finally, at the incenter $I$ all four heights equal the inradius $r$. Thus $f(I)=\frac r2(AB+CD-BC-DA)=0$, since equal tangents from each vertex give $AB+CD=BC+DA$. Hence $I$ lies on the midpoint line.` }
  ], problems: [] }
};
