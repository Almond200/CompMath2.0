// Learn, AMC Geometry, chapter S10: analytic geometry (CONVENTIONS §14). Part: Advanced topics.
// Distance conditions, coordinate measurements, and changes of representation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S10"] = {
  lessons: {
    "S10.1": {
      prereq: ["circle-equation", "distance-midpoint", "coordinate-bash", "midsegment-theorem"],
      cards: [],
      body: String.raw`Coordinates are useful when the condition is easier to express than the figure is to draw. For instance, a question might specify all points equally distant from $(0,2)$ and the line $y=-2$. The two distances are $\sqrt{x^2+(y-2)^2}$ and $|y+2|$. Squaring and canceling the matching $y^2$ terms gives $x^2=8y$. This one equation finds the point with any specified $x$-coordinate and makes it possible to look for intersections with lines.

A condition on the sum of two distances leads instead to an ellipse. Its standard equation $\tfrac{x^2}{25}+\tfrac{y^2}{9}=1$ gives the intercepts $(\pm5,0)$ and $(0,\pm3)$. At $(0,3)$, the distances to the two foci $(\pm c,0)$ are equal, and their sum must be the same as at $(5,0)$, namely $10$. Hence each distance from $(0,3)$ is $5$, which puts the foci $2\sqrt{5^2-3^2}=8$ apart. The distance condition is useful for finding the foci, while the equation makes the intercepts immediate.

For segments already given in coordinates, the displacement vectors keep just the information needed to compare lengths and angles. For example, $(1,2)$ and $(3,4)$ have dot product $1\cdot3+2\cdot4=11$. Its positive sign decides that the angle is acute before we calculate its value. The determinant similarly gives the area spanned by a pair of vectors without finding a height.

Sometimes a coordinate calculation can be avoided once the structure is visible. A quadrilateral whose side midpoints are marked suggests drawing its diagonals. The midpoint segments are then parallel to the diagonals, and each corner triangle occupies one quarter of the triangle of which it is a part. For a convex quadrilateral, the four corners account for half the area, leaving the midpoint parallelogram with the other half. This gives area $15$ from an original area of $30$ with no coordinates to choose. The lessons that follow use distance, direction, and decomposition to decide which representation will shorten a problem.`,
      exercises: [
        { q: String.raw`How far apart are the foci of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{9} = 1$?`, answer: "8",
          solution: String.raw`With $a = 5$ and $b = 3$, $c^2 = a^2 - b^2 = 16$, so the foci are $(\pm 4, 0)$, $8$ apart.` },
        { q: String.raw`What is the dot product of $(1, 2)$ and $(3, 4)$?`, answer: "11",
          solution: String.raw`Multiply matching coordinates and add: $1 \cdot 3 + 2 \cdot 4 = 11$.` },
        { q: String.raw`A convex quadrilateral has area $30$. What is the area of the parallelogram whose corners are the midpoints of its sides?`, answer: "15",
          solution: String.raw`Each corner triangle cut off by the parallelogram is a quarter of a triangle formed by a diagonal, and the four corners together make half the quadrilateral. So the parallelogram has half the area: $15$.` }
      ],
      problems: [
        "2006 AMC 8, Problem 5",
        "2022 AMC 8, Problem 4",
        "2019 AMC 10B, Problem 10"
      ]
    },
    "S10.2": {
      prereq: ["circle-equation", "distance-midpoint", "point-line-distance", "tangency-condition"],
      cards: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity", "parabolic-segment-area"],
      body: String.raw`A distance condition can stay simple even when its equation looks complicated. If a point must be as far from a fixed point as from a fixed line, keep those distances until you have chosen coordinates aligned with the line. If the sum or absolute difference of two point distances is fixed, put the two fixed points on one axis. These coordinate choices lead to [[conic-sections|the three conic sections]] and make their equations much easier to use.

For [[parabola-focus-directrix|a parabola]], choose focus $(0,p)$ and directrix $y=-p$, where $p\ne0$. Equating squared distances gives

$$x^2+(y-p)^2=(y+p)^2,\qquad x^2=4py.$$

Both distances are nonnegative, so the equation also implies the original equality. For $y=x^2/8$ we have $p=2$, and the equation locates the focus at $(0,2)$. This form also works backward: if a problem gives the focus and directrix, their midpoint marks the vertex and their separation gives $2|p|$. Once the equation is available, one can find intersections by substitution rather than comparing square roots.

For [[ellipse-properties|an ellipse]], the distances $d_L,d_R$ from $(x,y)$ to $(-c,0)$ and $(c,0)$ add to $2a$, where $a\gt c\ge0$. Subtracting their squares cancels the $y^2$ terms and gives $d_L^2-d_R^2=4cx$. Factoring as $(d_L+d_R)(d_L-d_R)$ therefore gives $d_R=a-cx/a$. Substitute into $d_R^2=(x-c)^2+y^2$ and simplify to obtain $x^2/a^2+y^2/b^2=1$, where $b^2=a^2-c^2$. On the resulting ellipse, $|x|\le a$, so both reconstructed distances $a\pm cx/a$ are positive and the sum condition follows. The right triangle from a focus to $(0,b)$ gives the same relation $a^2=b^2+c^2$ directly.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 275" role="img" aria-labelledby="s102-ellipse-title s102-ellipse-desc" style="width:100%;max-width:520px;height:auto">
<title id="s102-ellipse-title">The two equal distances at the top of an ellipse</title><desc id="s102-ellipse-desc">An ellipse centered at the origin has horizontal semiaxis five and vertical semiaxis three. Its foci at negative four and positive four form two right triangles with the point zero comma three. Both hypotenuses are five.</desc>
<g stroke="currentColor" fill="none"><ellipse cx="260" cy="142" rx="150" ry="90" stroke-width="2"/><path d="M87 142H433M260 38V244" opacity=".35"/><path d="M140 142L260 52 380 142" stroke-width="1.8"/><path d="M248 142v-12h12"/></g>
<g fill="currentColor"><circle cx="140" cy="142" r="4"/><circle cx="380" cy="142" r="4"/><circle cx="260" cy="52" r="4"/><g text-anchor="middle" font-size="17"><text x="260" y="27">(0, 3)</text><text x="183" y="88">5</text><text x="337" y="88">5</text><text x="276" y="118">3</text><text x="200" y="134">4</text><text x="140" y="168">F₁</text><text x="380" y="168">F₂</text><text x="260" y="266">The focus distances add to 10.</text></g></g></svg>

This distinction suggests shortcuts. If a problem gives the foci and asks for a perimeter through a point on the ellipse, the two focus distances already total $2a$. If it asks for area, the equation helps more. The ellipse $x^2/25+y^2/16=1$ is a circle of radius $5$ compressed vertically by $4/5$. Its area is therefore $20\pi$, and its foci are three units from the center because $25-16=9$.

For a [[hyperbola-properties|hyperbola]], the absolute difference of $d_L$ and $d_R$ equals $2a$, with $c\gt a\gt0$. On the right branch $d_L-d_R=2a$, so the same difference-of-squares identity gives $d_L+d_R=2cx/a$ and $d_R=cx/a-a$. Squaring again gives $x^2/a^2-y^2/b^2=1$, now with $b^2=c^2-a^2$. The equations are reversible on $x\ge a$ and the left branch follows by reflection. In the equation $x^2/9-y^2/16=1$, the foci have $c=5$. Its asymptotes are $y=\pm(4/3)x$: for example, on the upper right branch $y=(4/3)\sqrt{x^2-9}$, and the difference from $(4/3)x$ tends to zero since $x-\sqrt{x^2-9}=9/(x+\sqrt{x^2-9})$.

A problem that gives a single focus and line with a fixed distance ratio is asking for [[eccentricity|eccentricity]]. For a horizontal ellipse with $c\gt0$, the calculation $d_R=a-cx/a$ also says $d_R=(c/a)(a^2/c-x)$, so the line $x=a^2/c$ is its right directrix. The hyperbola calculation gives $d_R=(c/a)|x-a^2/c|$ after reflecting the formula to the left branch. Thus $e=c/a$ is below one for a noncircular ellipse and above one for a hyperbola. The parabola has $e=1$. When an equation arrives with extra linear terms, complete squares first to find its center or vertex. Degenerate equations are possible, so check whether the resulting equation describes real points and whether it factors into lines.

A [[conic-tangent-lines|tangent line]] can be found without locating its contact point in advance. For $y=mx+k$ and $x^2/a^2+y^2/b^2=1$, substitution and clearing denominators gives

$$(b^2+a^2m^2)x^2+2a^2mkx+a^2(k^2-b^2)=0.$$

This is a quadratic since $b\gt0$. The two intersections merge at a repeated root, equivalent to $k^2=a^2m^2+b^2$. For example, $y=x+k$ touches $x^2/4+y^2=1$ when $k=\pm\sqrt5$. The condition specifies the two offsets at once. Vertical tangent lines are $x=\pm a$ and do not enter the slope formula. For other conics, check that the substitution stays quadratic before interpreting a single solution as a double root.

The area cut from a parabola by a chord suggests a different use of the equation. On $y=ax^2+bx+c$, the vertical gap between the curve and its chord from $x=u$ to $x=v$ is $|a|(x-u)(v-x)$ for $u\le x\le v$. This product shows where the gap is greatest, at the midpoint. Join that point on the curve to the chord endpoints. The triangle has area $|a|(v-u)^3/8$, since its determinant is the horizontal chord width times the maximum vertical gap.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 309" role="img" aria-labelledby="s102-chord-title s102-chord-desc" style="width:100%;max-width:500px;height:auto">
<title id="s102-chord-title">A triangle inside a parabolic segment</title><desc id="s102-chord-desc">The parabola y equals x squared is cut by the horizontal chord y equals four. The chord endpoints and the vertex make a triangle. The two remaining curved regions each have half the original horizontal width.</desc>
<g stroke="currentColor" fill="none"><path d="M165 75H335M250 242V48" opacity=".32"/><path d="M178 75H322L250 219Z" fill="currentColor" fill-opacity=".12" stroke-width="1.7"/><path d="M171 46Q250 392 329 46" stroke-width="2"/><path d="M250 75V219" stroke-dasharray="5 4" opacity=".65"/></g>
<g fill="currentColor"><circle cx="178" cy="75" r="4"/><circle cx="322" cy="75" r="4"/><circle cx="250" cy="219" r="4"/><g font-size="17" text-anchor="middle"><text x="250" y="35">Chord y = 4</text><text x="135" y="80">(−2, 4)</text><text x="365" y="80">(2, 4)</text><text x="250" y="263">The first triangle has area 8.</text><text x="250" y="290">The two remaining regions have half-width chords.</text></g></g></svg>

Each of the two remaining regions has half the original horizontal width, so its analogous triangle has one eighth the area. Repeating the construction adds a geometric series with ratio $1/4$. The remaining area tends to zero since even the enclosing rectangles have total area bounded by a constant times $1/4^n$ after $n$ splits. This yields [[parabolic-segment-area|the area of a parabolic segment]] as $4/3$ of the first triangle. For $y=x^2$ and $y=4$ the endpoints have $x=\pm2$, the triangle has area $8$, and the curved region has area $32/3$.`,
      related: [
        { card: "linear-change-of-variables", note: String.raw`an ellipse as a circle stretched along one axis (S10.4).` },
        { card: "completing-the-square", note: String.raw`moving a second-degree equation into standard form.` },
        { card: "reflect-across-the-line", note: String.raw`the reflection property behind a focus (S7.5).` }
      ],
      exercises: [
        { q: String.raw`What is the $y$-coordinate of the focus of the parabola $y = \tfrac{x^2}{8}$?`, answer: "2",
          solution: String.raw`Write it as $x^2 = 8y = 4py$ with $p = 2$. The focus is $(0, p) = (0, 2)$.` },
        { q: String.raw`What is the area of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$?`, answer: "20pi",
          solution: String.raw`The area is $\pi ab = \pi \cdot 5 \cdot 4 = 20\pi$: the circle of radius $5$ squeezed vertically by the factor $\tfrac45$.` },
        { q: String.raw`What is the eccentricity of the ellipse $\tfrac{x^2}{25} + \tfrac{y^2}{16} = 1$?`, answer: "3/5",
          solution: String.raw`$c = \sqrt{25 - 16} = 3$, so $e = \tfrac ca = \tfrac35$.` },
        { q: String.raw`What is the positive slope of an asymptote of the hyperbola $\tfrac{x^2}{9} - \tfrac{y^2}{16} = 1$?`, answer: "4/3",
          solution: String.raw`The asymptotes are $y = \pm\tfrac ba x$ with $a = 3$, $b = 4$: slope $\tfrac43$.` },
        { q: String.raw`What is the area of the region between the parabola $y = x^2$ and the line $y = 4$?`, answer: "32/3",
          solution: String.raw`The chord runs from $x = -2$ to $x = 2$. The area is $\tfrac{|a|(x_2 - x_1)^3}{6} = \tfrac{64}{6} = \tfrac{32}{3}$; or $\tfrac43$ of the triangle with corners $(-2, 4)$, $(2, 4)$, $(0, 0)$, of area $8$.` },
        { q: String.raw`For what positive $k$ is the line $y = x + k$ tangent to the ellipse $\tfrac{x^2}{4} + y^2 = 1$?`, answer: "sqrt(5)",
          solution: String.raw`Substituting, $\tfrac{x^2}{4} + (x + k)^2 = 1$, that is, $\tfrac54 x^2 + 2kx + k^2 - 1 = 0$, which has a double root when $4k^2 - 5(k^2 - 1) = 0$, so $k^2 = 5$: the condition $k^2 = a^2m^2 + b^2 = 4 + 1$.` }
      ],
      problems: [
        "2025 SMT Geometry, Problem 6",
        "2006 AMC 12B, Problem 21",
        "2015 AMC 12A, Problem 21",
        "2011 AMC 12B, Problem 14",
        "2021 Spring AMC 12A, Problem 20",
        "2021 Spring AMC 12A, Problem 21",
        "2013 AMC 12B, Problem 21",
        "2025 AMC 12A, Problem 14"
      ]
    },
    "S10.3": {
      prereq: ["shoelace-formula", "common-angle-values", "point-line-distance"],
      cards: ["polar-coordinates", "tangency-equation", "determinant-geometric", "lattice-points-gcd"],
      body: String.raw`Choose coordinates by asking which quantities the problem already gives. When the data specify a distance from a point and a direction, [[polar-coordinates|polar coordinates]] keep those numbers visible. Choose that point as the origin. A displacement of length $r\ge0$ in direction $\theta$ has components $x=r\cos\theta$ and $y=r\sin\theta$. For $r=2$ and $\theta=60^\circ$ they are $(1,\sqrt3)$. Constant $r$ gives a circle and constant $\theta$ gives a ray. To represent an entire line through the origin using nonnegative radii, use both opposite directions. Rotations about the origin add to the angle and leave $r$ alone, which is useful when several points have equal radii.

If the data already give endpoints, vectors can measure area without first looking for an angle. The [[determinant-geometric|determinant]] of $\vec u=(u_1,u_2)$ and $\vec v=(v_1,v_2)$ is

$$\det(\vec u,\vec v)=u_1v_2-u_2v_1.$$

For $\vec u\ne0$, the vector $(-u_2,u_1)$ is perpendicular to $\vec u$ and has the same length. Dividing it by $|\vec u|$ gives a unit normal. The height of $\vec v$ above the line along $\vec u$ is the absolute value of its component along that normal. Multiplying that height by $|\vec u|$ gives $|u_1v_2-u_2v_1|$, the parallelogram area. The sign records the side of the oriented line on which $\vec v$ lies. Divide the absolute value by two for a triangle. With displacements $(3,1)$ and $(1,4)$, the determinant is $12-1=11$, so the triangle area is $11/2$. Moving the origin to one of the three vertices is enough to apply this to any coordinate triangle.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 332" role="img" aria-labelledby="s103-det-title s103-det-desc" style="width:100%;max-width:500px;height:auto">
<title id="s103-det-title">Coordinate vectors span a triangle and a parallelogram</title><desc id="s103-det-desc">Vectors from the origin reach three comma one and one comma four. Their sum is four comma five, the opposite corner of the parallelogram. A diagonal divides it into two equal triangles.</desc>
<g stroke="currentColor" fill="none"><path d="M114 264H395M136 284V36" opacity=".33"/><path d="M136 264L268 220 180 88Z" fill="currentColor" fill-opacity=".09" stroke-width="2"/><path d="M268 220L312 44 180 88" stroke-dasharray="5 4" opacity=".66"/></g>
<g fill="currentColor"><circle cx="136" cy="264" r="4"/><circle cx="268" cy="220" r="4"/><circle cx="180" cy="88" r="4"/><circle cx="312" cy="44" r="4"/><g font-size="17"><text x="112" y="282">O</text><text x="278" y="226">(3, 1)</text><text x="189" y="76">(1, 4)</text><text x="322" y="49">(4, 5)</text><text x="250" y="312" text-anchor="middle">The triangle has half the parallelogram’s area.</text></g></g></svg>

Integral coordinates offer another shortcut: if a problem asks how many times a straight segment hits a grid point, reduce the slope. Let $g=\gcd(|a|,|b|)$ for a nonzero displacement $(a,b)$ between lattice points. The step $(a/g,b/g)$ has coprime components. An integer point on the supporting line must occur at an integer multiple of that step: a fractional multiple in lowest terms would require its denominator to divide both coprime components. Therefore [[lattice-points-gcd|the lattice points on the segment]] occur at multiples $0,1,\ldots,g$, with $g-1$ strictly inside. The displacement $(12,18)$ reduces to $(2,3)$ and has five interior lattice points.

This count answers a different-looking question about the grid cells touched by a diagonal. A diagonal of an $m\times n$ rectangle starts inside one cell and enters a new one at each of the $m-1$ vertical and $n-1$ horizontal interior grid lines it crosses. At each of its $g-1$ interior grid points it crosses one of each line at the same instant, so the count is $1+(m-1)+(n-1)-(g-1)=m+n-g$. For $4\times6$, the double crossing at $(2,3)$ gives $8$ cells. Here the gcd counts overlap between two lists of crossing events.

A condition that a circle just touches a line suggests measuring the distance from its center to the line. Both the contact point and the slope may be unknown, but the distance must be the radius. This turns [[tangency-equation|the tangency condition]] into one equation in the unknown. For the circle with center $(0,2)$ and radius $1$, a line $y=mx$ through the origin is tangent when $2/\sqrt{1+m^2}=1$, giving $m=\pm\sqrt3$. The line $x=0$ passes through the center, so the slope calculation misses no tangents through the origin. If the curve is given by a quadratic equation and a point-to-line distance has no comparable meaning, test for a repeated root as in (S10.2).

Two distance conditions can guide a construction as well. Suppose a circle of radius $2$ must touch the $x$-axis and pass through $(1,2)$. Its center must lie on $y=2$ or $y=-2$ to meet the tangency condition. Passing through the given point requires the center to lie on the circle of radius $2$ about $(1,2)$. Draw those loci and take their intersections. The lower line is four units from $(1,2)$ and gives no intersection. The upper line goes through $(1,2)$ and yields centers $(-1,2)$ and $(3,2)$. Each intersection guarantees both conditions, so there is no separate check for a missed solution.`,
      related: [
        { card: "picks-theorem", note: String.raw`the area of a lattice polygon from its lattice points (S7.4).` },
        { card: "complex-basics", note: String.raw`polar form for complex numbers (L13).` },
        { card: "tangency-condition", note: String.raw`the same condition, as a fact about lines and circles (S9.5).` }
      ],
      exercises: [
        { q: String.raw`A point has polar coordinates $r = 2$, $\theta = 60^\circ$. What is its $x$-coordinate?`, answer: "1",
          solution: String.raw`$x = r\cos\theta = 2 \cdot \tfrac12 = 1$ (and $y = 2 \cdot \tfrac{\sqrt3}{2} = \sqrt3$).` },
        { q: String.raw`What is the area of the triangle with corners $(0, 0)$, $(3, 1)$ and $(1, 4)$?`, answer: "11/2",
          solution: String.raw`Half the determinant of the two vectors from the origin: $\tfrac12|3 \cdot 4 - 1 \cdot 1| = \tfrac{11}{2}$.` },
        { q: String.raw`How many lattice points lie strictly between $(0, 0)$ and $(12, 18)$ on the segment joining them?`, answer: "5",
          solution: String.raw`$\gcd(12, 18) = 6$, so the lattice points on the segment are $k(2, 3)$ for $k = 0, \ldots, 6$, and $5$ lie strictly between the ends.` },
        { q: String.raw`A diagonal of a $4 \times 6$ rectangle of unit squares passes through the inside of how many squares?`, answer: "8",
          solution: String.raw`It crosses $3$ inner horizontal and $5$ inner vertical lines, entering a new square each time, except at the lattice point $(2, 3)$ on it where it crosses two lines at once. So $1 + 3 + 5 - 1 = 8 = 4 + 6 - \gcd(4, 6)$.` },
        { q: String.raw`How many circles of radius $3$ touch the $x$-axis and pass through $(2,6)$?`, answer: "1",
          solution: String.raw`The center lies on $y=3$ or $y=-3$ and must be three units from $(2,6)$. The upper line is exactly three units away, so only its perpendicular foot $(2,3)$ is a center. The lower line is nine units away and supplies none.` }
      ],
      problems: [
        "2019 ARML Individual, Problem 2",
        "2024 AMC 8, Problem 23",
        "2019 AMC 10A, Problem 10",
        "2005 AMC 12A, Problem 12",
        "2024 AMC 10B, Problem 19",
        "2009 AMC 12B, Problem 22"
      ]
    },
    "S10.4": {
      prereq: ["rotation-90", "reflection-coordinates", "composing-transformations", "law-of-cosines"],
      cards: ["vector-dot-product", "vector-projection", "reflection-composition", "rotation-reflection-matrices", "rotation-trick", "rotation-center", "linear-change-of-variables"],
      body: String.raw`A vector records a displacement, so its components do not depend on where it is drawn. That is useful when a problem asks for the angle between segments with different starting points: translate their displacement vectors to a common origin. For nonzero vectors $\vec u,\vec v$ with angle $\theta$ between them, the law of cosines applied to their tips gives

$$|\vec u-\vec v|^2=|\vec u|^2+|\vec v|^2-2|\vec u||\vec v|\cos\theta.$$

Expanding the left side in components shows that [[vector-dot-product|the dot product]] $u_1v_1+u_2v_2$ equals $|\vec u||\vec v|\cos\theta$. Use its sign if only the type of angle matters, or divide by the lengths if the angle itself is needed. For $\vec u=(1,0)$ and $\vec v=(1,1)$, the cosine is $1/\sqrt2$, so the angle is $45^\circ$.

If a problem needs just the amount of a displacement in one direction, calculating the angle is extra work. Divide $\vec u\cdot\vec v$ by $|\vec v|$ to get the signed component of $\vec u$ along the nonzero direction $\vec v$. It is positive along $\vec v$ and negative against it. Multiplying by the unit direction $\vec v/|\vec v|$ gives [[vector-projection|the projection vector]]. The length of the projection of $(2,3)$ along $(3,4)$ is $|(2,3)\cdot(3,4)|/5=18/5$. A projection on the normal to a line instead gives a perpendicular distance, which links this calculation to tangency.

When the givens describe reflections, an angle calculation can replace several coordinate calculations. If two mirror lines meet, measure directions about their intersection. A reflection in a line making angle $\alpha$ with the horizontal sends a ray of angle $t$ to $2\alpha-t$. Reflecting next in a line at angle $\beta$ gives $2\beta-(2\alpha-t)=t+2(\beta-\alpha)$. Thus [[reflection-composition|the two reflections compose]] to a rotation about the intersection. Changing their order reverses the rotation. For parallel mirrors, the components along the mirrors remain unchanged. The perpendicular coordinate is sent by $s\mapsto 2d_1-s$ and then by $s\mapsto 2d_2-s$, so the net move adds $2(d_2-d_1)$ in the common normal direction.

If a prompt specifies a rotation in coordinates and asks where several points move, [[rotation-reflection-matrices|the rotation matrix]] makes the repeated step systematic. The unit basis vectors rotate to $(\cos\theta,\sin\theta)$ and $(-\sin\theta,\cos\theta)$, and those are the columns of the matrix. The new coordinates of $(x,y)$ are their linear combination with coefficients $x,y$. For a rotation about a different center, first subtract the center and add it back after rotating. If the point images are given and the [[rotation-center|center of the rotation]] is unknown, two perpendicular bisectors are often quicker. Each joins candidate centers that are equidistant from a point and its image. Use two distinct bisectors, and check the angle if it was also specified.

A figure with equal sides and an angle of $60^\circ$ suggests using a rotation to turn lengths that begin at different vertices into sides of a single triangle. Let $P$ be inside equilateral triangle $ABC$ with $PA=3$, $PB=4$ and $PC=5$. Rotate about $B$ through the $60^\circ$ that sends $C$ to $A$, and call the image of $P$ the point $P'$. Then $AP'=CP=5$. Also $BP=BP'=4$ and $\angle PBP'=60^\circ$, so $BPP'$ is equilateral and $PP'=4$. The three lengths now form the $3$–$4$–$5$ triangle $APP'$, with its right angle at $P$. Since $A$ and $P'$ are on the same side of line $BP$ and $\angle BPP'=60^\circ$, it follows that $\angle APB=150^\circ$. This is the [[rotation-trick|rotation trick]]: the equal sides and known angle suggest the move that assembles the given lengths.

Sometimes the goal is an area and the region already comes with its own coordinates. In the inequalities $|x+y|\le1$ and $|x-y|\le1$, the expressions that repeat are $u=x+y$ and $v=x-y$. They are worth naming because the region in $(u,v)$ is the square $[-1,1]\times[-1,1]$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" role="img" aria-labelledby="s104-map-title s104-map-desc" style="width:100%;max-width:520px;height:auto">
<title id="s104-map-title">A diamond becomes an axis-aligned square</title><desc id="s104-map-desc">In x and y, the region is the diamond with vertices at unit distances along the axes. Setting u to x plus y and v to x minus y takes it to the square whose u and v run from negative one to positive one.</desc>
<g stroke="currentColor" fill="none"><path d="M40 142h190m-95-95v190M290 142h190m-95-95v190" opacity=".28"/><path d="M135 62l80 80-80 80-80-80Z" fill="currentColor" fill-opacity=".1" stroke-width="2"/><path d="M305 62h160v160H305Z" fill="currentColor" fill-opacity=".1" stroke-width="2"/><path d="M242 142h34m-8-6 8 6-8 6" stroke-width="1.7"/></g>
<g fill="currentColor" font-size="16" text-anchor="middle"><text x="135" y="28">Original x and y</text><text x="385" y="28">New u and v</text><text x="135" y="269">Area 2</text><text x="385" y="269">Area 4</text><text x="226" y="163">x</text><text x="112" y="54">y</text><text x="482" y="165">u</text><text x="370" y="53">v</text></g></svg>

For an invertible [[linear-change-of-variables|linear change of variables]], the absolute determinant measures the scale factor for area. The unit square is sent to a parallelogram on the two matrix columns, whose area equals that determinant. Equivalently, applying the map to two vectors multiplies their determinant by the matrix determinant, so every triangle and every polygon assembled from triangles scales the same way. Here the factor from $(x,y)$ to $(u,v)$ is $2$. The new area is $4$, making the original area $2$. The simplification comes from choosing new variables already isolated in the inequalities, then accounting for the change in area.`,
      related: [
        { card: "point-in-equilateral", note: String.raw`the configurations of a point inside an equilateral triangle (S4.4).` },
        { card: "determinant-geometric", note: String.raw`the area factor $|ad - bc|$ as a determinant (S10.3).` },
        { card: "perpendicular-bisector-locus", note: String.raw`the bisectors that locate a rotation's center (S7.3).` }
      ],
      exercises: [
        { q: String.raw`What is the angle between the vectors $(1, 0)$ and $(1, 1)$, in degrees?`, answer: "45",
          solution: String.raw`$\cos\theta = \tfrac{(1, 0) \cdot (1, 1)}{1 \cdot \sqrt2} = \tfrac{1}{\sqrt2}$, so $\theta = 45^\circ$.` },
        { q: String.raw`How long is the projection of $(2, 3)$ onto the direction of $(3, 4)$?`, answer: "18/5",
          solution: String.raw`$\tfrac{(2, 3) \cdot (3, 4)}{|(3, 4)|} = \tfrac{6 + 12}{5} = \tfrac{18}{5}$.` },
        { q: String.raw`The plane is reflected over a line and then over a second line through the same point at an angle of $30^\circ$ to the first. By how many degrees is the plane rotated in all?`, answer: "60",
          solution: String.raw`Two reflections over lines meeting at an angle $\theta$ make a rotation by $2\theta$ about the meeting point: $60^\circ$.` },
        { q: String.raw`A point $P$ inside an equilateral triangle $ABC$ has $PA = 3$, $PB = 4$ and $PC = 5$. What is $\angle APB$, in degrees?`, answer: "150",
          solution: String.raw`Rotate about $B$ by $60^\circ$ taking $C$ to $A$, and let $P$ go to $P'$. Then $BPP'$ is equilateral, so $PP' = 4$ and $\angle BPP' = 60^\circ$, and $AP' = CP = 5$. Triangle $APP'$ has sides $3, 4, 5$, so $\angle APP' = 90^\circ$, and $\angle APB = 90^\circ + 60^\circ = 150^\circ$.` },
        { q: String.raw`What is the area of the region $|x + y| \le 1$, $|x - y| \le 1$?`, answer: "2",
          solution: String.raw`With $u = x + y$ and $v = x - y$, the region is the square $|u| \le 1$, $|v| \le 1$ of area $4$. The change multiplies areas by $|1 \cdot (-1) - 1 \cdot 1| = 2$, so the original area is $\tfrac42 = 2$. (It is a square with corners $(\pm1, 0)$, $(0, \pm1)$.)` }
      ],
      problems: [
        "2019 SMT General, Problem 17",
        "2022 AMC 10A, Problem 18",
        "2021 Fall AMC 10B, Problem 17",
        "2006 AMC 10B, Problem 20",
        "2023 AMC 10A, Problem 19",
        "2025 AMC 10B, Problem 9",
        "2007 AMC 12A, Problem 13",
        "2008 AMC 12A, Problem 14",
        "2008 AMC 12B, Problem 17",
        "2020 AMC 10B, Problem 23",
        "2006 AMC 12B, Problem 23",
        "2018 AMC 12B, Problem 23"
      ]
    },
    "S10.5": {
      prereq: ["midsegment-theorem", "pythagorean-theorem", "equiangular-polygon", "equilateral-triangle-facts"],
      cards: ["british-flag-theorem", "varignons-theorem", "equiangular-hexagon-area"],
      body: String.raw`A useful coordinate choice can make mixed terms cancel. Put the vertices of a rectangle at $(0,0)$, $(w,0)$, $(w,h)$ and $(0,h)$ in order. For $P=(x,y)$, the two squared distances to the first pair of opposite corners add to $x^2+(w-x)^2+y^2+(h-y)^2$. The other opposite pair gives the same four terms. This is [[british-flag-theorem|the British flag theorem]], $PA^2+PC^2=PB^2+PD^2$. The proof also covers points outside the rectangle. For a point off the plane at height $z$, each squared distance gains the same term $z^2$.

The cue for this theorem is a rectangle and distances measured from one point to several corners. The formula eliminates the unknown coordinates of the point and even the dimensions of the rectangle. If $PA=3$, $PB=4$ and $PC=5$, then $PD^2=3^2+5^2-4^2=18$, giving $PD=3\sqrt2$. Pair lengths by opposite vertices before writing the equation.

Midpoints inside a quadrilateral suggest using its diagonals as references. If $M,N,P,Q$ are the consecutive side midpoints of $ABCD$, then $MN$ and $PQ$ are each parallel to $AC$ and have length $AC/2$. Likewise $NP$ and $QM$ are parallel to $BD$ and have length $BD/2$. These are triangle midsegments. Thus [[varignons-theorem|the midpoint quadrilateral]] is a parallelogram, and its perimeter is the sum of the original diagonal lengths. For diagonals of lengths $6$ and $8$, the perimeter is $14$, regardless of the quadrilateral's side lengths.

The same construction makes the area accessible. In a convex quadrilateral, draw $AC$ to find the areas cut off at $B$ and $D$: each corner triangle has one quarter of its triangle's area. They total one quarter of the quadrilateral. Drawing $BD$ does the same for the corners at $A$ and $C$. The midpoint parallelogram therefore has half the original area. This is useful even when the diagonals themselves are unknown, for instance when a problem iterates the midpoint construction and asks how the area changes.

In a convex [[equiangular-hexagon-area|equiangular hexagon]], each interior angle is $120^\circ$ because the exterior turns are equal. The lines along every other side make the directions of an equilateral triangle. If the successive side lengths are $a,b,c,d,e,f$, extend sides $b,d,f$. At the two ends of each omitted side, the extensions form an equilateral corner triangle whose side is $a$, $c$ or $e$. In particular the extended side along $b$ has length $a+b+c$. This construction replaces a six-sided area calculation with four equilateral triangles.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 461" role="img" aria-labelledby="s105-hex-title s105-hex-desc" style="width:100%;max-width:520px;height:auto">
<title id="s105-hex-title">An equiangular hexagon cuts three corners off a triangle</title><desc id="s105-hex-desc">The hexagon has consecutive side lengths three, one, four, two, two, and three. Extending alternate sides produces an equilateral triangle of side eight. The three corner triangles have side lengths three, four, and two.</desc>
<g stroke="currentColor" fill="none"><path d="M80 390H432L256 85.16Z" stroke-dasharray="5 4" opacity=".55" stroke-width="1.7"/><path d="M146 275.68L212 390H256L344 237.58 300 161.37H212Z" fill="currentColor" fill-opacity=".1" stroke-width="2"/></g>
<g fill="currentColor" font-size="18" text-anchor="middle"><text x="256" y="39">Extend alternate sides to meet.</text><text x="158" y="343">3</text><text x="234" y="417">1</text><text x="315" y="329">4</text><text x="347" y="197">2</text><text x="256" y="141">2</text><text x="166" y="202">3</text><text x="256" y="447">Large triangle side: 3 + 1 + 4 = 8</text></g></svg>

Thus the area is

$$\frac{\sqrt3}{4}\bigl((a+b+c)^2-a^2-c^2-e^2\bigr).$$

The same large triangle has side lengths $c+d+e$ and $e+f+a$, so those sums must all agree. This gives a way to infer missing sides as well as area. For $(a,b,c,d,e,f)=(3,1,4,2,2,3)$, all three sums are $8$. The desired area is $(64-9-16-4)\sqrt3/4=35\sqrt3/4$.`,
      related: [
        { card: "coordinate-bash", note: String.raw`the coordinate proof of the British flag theorem (S7.4).` },
        { card: "quadrilateral-diagonal-area", note: String.raw`a quadrilateral's area from its diagonals (S2.3).` },
        { card: "equiangular-polygon", note: String.raw`the side relations of an equiangular polygon (S2.2).` }
      ],
      exercises: [
        { q: String.raw`A point $P$ inside rectangle $ABCD$ has $PA = 3$, $PB = 4$ and $PC = 5$. What is $PD^2$?`, answer: "18",
          solution: String.raw`By the British flag theorem, $PA^2 + PC^2 = PB^2 + PD^2$: $9 + 25 = 16 + PD^2$, so $PD^2 = 18$.` },
        { q: String.raw`A quadrilateral has diagonals of lengths $6$ and $8$. What is the perimeter of the parallelogram whose corners are the midpoints of its sides?`, answer: "14",
          solution: String.raw`Each side of that parallelogram is a midsegment of a triangle formed by a diagonal, so it is half that diagonal: two sides of $3$ and two of $4$, perimeter $14$.` },
        { q: String.raw`What is the area of the equiangular hexagon with sides $3, 1, 4, 2, 2, 3$ in order?`, answer: "35sqrt(3)/4",
          solution: String.raw`Extending sides $b$, $d$, $f$ makes an equilateral triangle of side $3 + 1 + 4 = 8$, with corner triangles of sides $3$, $4$ and $2$ cut off. So the area is $\tfrac{\sqrt3}{4}(64 - 9 - 16 - 4) = \tfrac{35\sqrt3}{4}$; the shoelace formula on the corners confirms it.` }
      ],
      problems: [
        "2025 SMT Geometry, Problem 8",
        "2022 AMC 8, Problem 18",
        "2008 AMC 10A, Problem 10",
        "2001 AMC 12, Problem 20",
        "2021 Spring AMC 12B, Problem 14",
        "2021 Spring AMC 10A, Problem 21",
        "2010 AMC 10A, Problem 19"
      ]
    },
    "S10.6": {
      prereq: ["circle-basics", "handshakes-diagonals", "am-gm", "herons-formula", "plane-regions"],
      cards: ["steiner-neighborhood", "isoperimetric-facts"],
      body: String.raw`The word “within” in a distance problem usually asks for a region, and it matters what the distance is measured from. If the condition is distance at most $r$ from a whole filled convex polygon, the [[steiner-neighborhood|neighborhood]] includes the polygon. Each outside point has a closest point on an edge or a vertex. Points closest to the interior of an edge form a strip of width $r$. Points closest to a vertex form a circular sector whose angle is the exterior turn there. The turns sum to $360^\circ$, so the sectors together have the area of a disk of radius $r$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-labelledby="s106-buffer-title s106-buffer-desc" style="width:100%;max-width:520px;height:auto">
<title id="s106-buffer-title">Strips and quarter circles around a rectangle</title><desc id="s106-buffer-desc">A rectangle four units wide and three units high is surrounded by four strips of width one and four quarter disks of radius one. The four quarter disks together make a disk.</desc>
<g stroke="currentColor"><rect x="140" y="20" width="240" height="200" rx="40" fill="currentColor" fill-opacity=".1" stroke-width="2"/><rect x="180" y="60" width="160" height="120" fill="currentColor" fill-opacity=".11" stroke-width="2"/><path d="M140 60h40m0-40v40m160-40v40m0 0h40m0 120h-40m0 0v40m-160 0v-40m0 0h-40" fill="none" opacity=".7"/></g>
<g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="125">Original rectangle</text><text x="260" y="45">Strip of width 1</text><text x="260" y="254">Four strips follow the four sides.</text><text x="260" y="278">The four corner pieces make a disk.</text></g></svg>

The area is therefore $A+Pr+\pi r^2$, where $A$ is the polygon's area and $P$ its perimeter. For a $3\times4$ rectangle and $r=1$, this yields $12+14+\pi=26+\pi$. This is especially useful when a geometric probability question describes a moving point that may come within a given distance of a shape. If the distance is from only a segment, the two endpoint pieces are semicircles. If the polygon is concave or the distance is from the boundary alone, the same strip and sector formula does not apply directly: pieces can overlap or interior points may fall outside the allowed region.

When a figure is subdivided by chords, calculating areas is unnecessary if the goal is the number of regions. Add the chords one at a time. A new chord with $k$ distinct intersections with earlier chords in the disk's interior is split into $k+1$ pieces, and each piece cuts one region in two. Each interior crossing is counted when the later of its two chords is drawn. When no three chords meet inside the circle, each choice of four points in circular order gives exactly one crossing, from the two diagonals of their quadrilateral. The number of regions is consequently $1+\binom n2+\binom n4$. For $n=7$ it is $1+21+35=57$. If three or more chords meet at one point, count distinct intersections along each new chord instead. The choice of drawing order does not change the final number.

A fixed perimeter and a request for the largest area suggest an inequality. For a rectangle with sides $u,v$ and perimeter $P=2(u+v)$, the area $uv$ is at most $(u+v)^2/4=P^2/16$ by AM–GM. Equality requires $u=v$. For triangles, fix the semiperimeter $s=P/2$. Heron's formula gives $A^2=s(s-a)(s-b)(s-c)$, and the three factors $s-a,s-b,s-c$ sum to $s$. Their product is at most $(s/3)^3$, so $A\le s^2/(3\sqrt3)=P^2/(12\sqrt3)$, with equality at an equilateral triangle. A triangle of perimeter $12$ thus has area at most $4\sqrt3$.

The [[isoperimetric-facts|isoperimetric inequality]] for a general simple closed boundary gives $A\le P^2/(4\pi)$, with equality for a circle. The rectangle and triangle arguments use their own area formulas. When a prompt specifies a family of shapes, use a bound that can be attained in that family. If it adds more constraints, check whether equality remains possible before claiming that the bound is the maximum.`,
      related: [
        { card: "plane-regions", note: String.raw`regions cut by lines and circles in the plane (S6.4).` },
        { card: "am-gm", note: String.raw`bounding the area of rectangles and triangles with fixed perimeter (L8).` },
        { card: "geometric-probability", note: String.raw`neighborhoods as the regions of a probability (R6.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the set of points within distance $1$ of a $3 \times 4$ rectangle (the rectangle included)?`, answer: "26+pi",
          solution: String.raw`The rectangle has area $12$. The strips of width $1$ along its sides add $1 \cdot (3 + 4 + 3 + 4) = 14$, and the four quarter disks at the corners make one disk of area $\pi$. In all $26 + \pi$.` },
        { q: String.raw`Seven points on a circle are joined by all their chords, no three meeting at one point inside. Into how many regions is the disk cut?`, answer: "57",
          solution: String.raw`$1 + \binom72 + \binom74 = 1 + 21 + 35 = 57$: one region to start, one more for each chord, and one more for each crossing.` },
        { q: String.raw`What is the largest possible area of a triangle with perimeter $12$?`, answer: "4sqrt(3)",
          solution: String.raw`For a fixed perimeter the equilateral triangle has the most area. With side $4$, its area is $\tfrac{\sqrt3}{4} \cdot 16 = 4\sqrt3$.` }
      ],
      problems: [
        "2021 HMMT February Geometry, Problem 2",
        "2000 AMC 10, Problem 18",
        "2008 AMC 10A, Problem 17",
        "2021 Fall AMC 10A, Problem 19",
        "2020 AMC 10B, Problem 20",
        "2021 Spring AMC 10B, Problem 23",
        "2004 AMC 12A, Problem 24"
      ]
    },
    "S10.7": {
      prereq: ["conic-sections", "parabola-focus-directrix", "ellipse-properties", "hyperbola-properties", "conic-tangent-lines", "eccentricity", "parabolic-segment-area", "polar-coordinates", "tangency-equation", "determinant-geometric", "lattice-points-gcd", "vector-dot-product", "vector-projection", "reflection-composition", "rotation-reflection-matrices", "rotation-trick", "rotation-center", "linear-change-of-variables", "british-flag-theorem", "varignons-theorem", "equiangular-hexagon-area", "plane-regions", "steiner-neighborhood", "isoperimetric-facts"],
      cards: [],
      body: String.raw`Conditions on distances suggest starting with a locus. The same distance to a point and a line gives a parabola. A fixed sum of two point distances gives an ellipse, and a fixed absolute difference gives a hyperbola. Choose the axis using the given focus or foci. For line intersections, use the equation and look for a repeated root when tangency is required. For lengths to foci, return to the original distance condition. The chord of a parabola suggests using the area of its inscribed triangle.

A given length and bearing are already polar coordinates. Points with integer coordinates suggest reducing a displacement by its gcd when counting crossings or lattice points. When a pair of coordinate displacements is given, use their dot product for the angle and the absolute determinant for the area. The projection records the component needed along one direction and discards the perpendicular component.

Successive reflections suggest measuring the net change in direction or perpendicular displacement. Equal sides with a known angle suggest a rotation that brings separated lengths together. Repeated linear expressions in area bounds suggest new coordinates that make the boundaries simple, with the absolute determinant accounting for the change of area.

For distances from a point to the corners of a rectangle, pair opposite vertices to eliminate the point's coordinates. For the midpoint quadrilateral, draw the diagonals so the midpoint segments become triangle midsegments. Extend alternate sides of an equiangular hexagon to fit it inside an equilateral triangle.

A distance from a filled convex polygon suggests separating the added region into strips and sectors. A number of regions cut out by chords suggests adding the chords in order and counting intersections rather than measuring the pieces. For fixed-perimeter problems, use an area formula or inequality for the specified family and check whether its equality case meets every constraint.`,
      strategies: [
        String.raw`Complete the squares to put a conic in standard form, then read $a$, $b$ and $c$.`,
        String.raw`Use the focus property: sums for an ellipse, differences for a hyperbola, equal distances for a parabola.`,
        String.raw`Use the dot product for an angle and a determinant for an area.`,
        String.raw`When three distances from a point are given, rotate the figure to bring two of them together.`,
        String.raw`Change variables to turn a slanted region into a square, and divide by the area factor.`,
        String.raw`For the points near a figure, add its area, its perimeter times the distance, and a circle.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`An ellipse has foci $(\pm 4, 0)$ and the distances from any point on it to the foci add to $10$. What is its area?`, answer: "15pi",
        solution: String.raw`$2a = 10$ gives $a = 5$, and $c = 4$ gives $b = \sqrt{25 - 16} = 3$. The area is $\pi ab = 15\pi$.` },
      { q: String.raw`How many lattice points lie on the segment from $(0, 0)$ to $(6, 9)$, the ends included?`, answer: "4",
        solution: String.raw`$\gcd(6, 9) = 3$, so the lattice points are $k(2, 3)$ for $k = 0, 1, 2, 3$: four of them.` },
      { q: String.raw`For what $k$ are the vectors $(2, k)$ and $(3, -6)$ perpendicular?`, answer: "1",
        solution: String.raw`Perpendicular vectors have dot product $0$: $6 - 6k = 0$, so $k = 1$.` },
      { q: String.raw`Find the positive value of $k$ for which $y=2x+k$ is tangent to $x^2/9+y^2/4=1$.`, answer: "2sqrt(10)",
        solution: String.raw`The unknown is the line's offset, so substitute $y=2x+k$ and require the resulting quadratic to have a repeated root. For $a=3$, $b=2$ and slope $m=2$, this gives $k^2=a^2m^2+b^2=40$. The positive offset is $2\sqrt{10}$.` },
      { q: String.raw`Find the area of the region satisfying $|2x+y|\le2$ and $|x-y|\le3$.`, answer: "8",
        solution: String.raw`Each bound isolates a linear expression. Let $u=2x+y$ and $v=x-y$. The new rectangle has side lengths $4$ and $6$, and the map from the original variables multiplies area by $|2(-1)-1(1)|=3$. The original area is $24/3=8$.` },
      { q: String.raw`What is the area of the points within distance $2$ of a line segment of length $6$?`, answer: "24+4pi",
        solution: String.raw`Points whose nearest point is in the interior of the segment lie in a rectangle of length $6$ and total width $4$. Beyond each endpoint is a semicircle of radius $2$. Adding the rectangle and the two halves gives $24+4\pi$.` },
      { q: String.raw`Start with a convex quadrilateral of area $96$ and replace it by its midpoint parallelogram three times. Find the final area.`, answer: "12",
        solution: String.raw`Whenever all four side midpoints are joined, the diagonals split the proof into two pairs of equal-scale corner triangles. They account for half the old area, so half remains. Three repetitions leave $96/2^3=12$.` }
    ],
    problems: [
      "2007 AMC 12B, Problem 25",
      "2014 AMC 12A, Problem 25",
      "2007 AIME II, Problem 5",
      "1996 AIME, Problem 14"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 12A, Problem 24",
      "2025 AMC 12B, Problem 25",
      "2012 AIME I, Problem 13",
      "2021 AIME I, Problem 6",
      "2024 AIME I, Problem 9"
    ]
  }
};
