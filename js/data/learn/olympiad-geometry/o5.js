// Learn, Olympiad Geometry, chapter O5: Centers and lines of the triangle.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O5"] = {
  lessons: {
    "O5.1": {
      prereq: ["nine-point-circle"], cards: [],
      body: String.raw`A surveyor wants a station $P$ near three landmarks $A,B,C$. Suppose the cost is $PA^2+PB^2+PC^2$. The circumcenter makes the three terms equal, but does that make their sum small? Take $A=(0,0)$, $B=(6,0)$ and $C=(0,6)$. The circumcenter is $(3,3)$, halfway along the hypotenuse. Each squared distance is $18$, giving a cost of $54$. Move to the centroid $(2,2)$ and the costs become $8,20,20$. The total drops to $48$.

The clue is what happens to the sum when $P$ moves, rather than what any one distance does. O5.2 measures that change exactly. It also asks what changes if the landmarks become three rods along the boundary or three lines from which we measure perpendicular distances. O5.3 turns to constructions where a line, circle or angle identifies the point we need.`,
      exercises: [
        { q: String.raw`In the survey example move from the centroid to $(3,2)$. Find the change in total cost.`, answer: "3",
          solution: String.raw`The three squared distances are $13,13,25$. Their sum is $51$, an increase of $3$ even though the station has moved closer to $B$.` },
        { q: String.raw`A triangle is made from three rods of the same material and thickness. Which point represents each rod when locating their combined balance point, and what weight should it receive?`,
          solution: String.raw`A uniform rod balances at its midpoint. Its mass is proportional to its length, so weight each midpoint by the length of its side. Equal weights would model three rods of equal mass.` }
      ]
    },
    "O5.2": {
      prereq: ["nine-point-circle"], cards: ["carnots-theorem", "feuerbach-theorem", "leibniz-formula", "spieker-point"],
      body: String.raw`What if we move a station twice as far from the centroid $G$? Use $G$ as origin and denote the position vectors of the vertices by $u,v,w$. Their sum is zero. In expanding $|p-u|^2+|p-v|^2+|p-w|^2$, the three cross terms therefore cancel. The cost exceeds its value at $G$ by exactly $3|p|^2$. Doubling the distance multiplies this excess by four. This cancellation is the reason for the [[leibniz-formula|Leibniz formula]]. It also turns a prescribed total cost into a circle centered at $G$.

For the rod problem, start with a different triangle. The midpoints of $BC,CA,AB$ form the medial triangle. Opposite these midpoints its sides have lengths $\frac{a}{2},\frac{b}{2},\frac{c}{2}$, respectively, where $a=BC$, $b=CA$, $c=AB$. The incenter of any triangle weights its vertices in proportion to the opposite side lengths: the three subtriangles have the same altitude, the inradius. Here those weights are exactly the three rod masses. Their balance point is the [[spieker-point|Spieker point]]. This also explains why the inradius of the medial triangle is $\frac{r}{2}$: it is a half-scale copy of $ABC$.

Now let $O$ be the circumcenter and measure its distance to each sideline, positive on the side containing the opposite vertex. For $BC$ the result is $R\cos A$: the perpendicular from $O$ bisects the chord, and when $A$ is obtuse the center is across the chord from $A$. [[carnots-theorem|Carnot's theorem]] adds these three signed distances to give $R+r$. In the right triangle of the introduction they are $0,3,3$, which predicts $r=6-3\sqrt2$. This agrees with the area divided by the semiperimeter.

A distance between two centers may instead encode tangency. Let $N$ denote the nine-point center, with radius $\frac{R}{2}$, and $I$ the incenter. [[feuerbach-theorem|Feuerbach's theorem]] gives $NI=\frac{R}{2}-r$. For a nonequilateral triangle this is internal tangency: the contact point lies on the ray from $N$ through $I$, beyond $I$. For an excenter the distance is the sum of the radii, so the contact point is between the centers. In the equilateral case the incircle and nine-point circle coincide.`,
      exercises: [
        { q: String.raw`In the survey example, describe every station whose total cost is $60$.`,
          solution: String.raw`At $G$ the cost is $48$. Thus $3PG^2=12$ and $PG=2$. Every point of the circle of radius $2$ centered at $(2,2)$ works, since the formula depends only on $PG$.` },
        { q: String.raw`In a triangle of sides $13,14,15$ the altitude to the side of length $14$ is $12$. Find the distance between its incenter and nine-point center.`, answer: "1/16",
          solution: String.raw`The area is $84$ and the semiperimeter is $21$, giving $r=4$. From $R=\frac{abc}{4K}$ we get $R=\frac{65}{8}$. Feuerbach gives $NI=\frac{65}{16}-4=\frac{1}{16}$. The two centers are close but distinct.` }
      ]
    },
    "O5.3": {
      prereq: ["simson-line"], cards: ["steiner-line", "anti-steiner-point", "brocard-angle", "droz-farny", "lester-circle", "van-aubel"],
      body: String.raw`A problem gives three reflected points and asks for a straight line. Before chasing angles, halve the picture. If $P$ is on the circumcircle, the perpendicular feet from $P$ to the three sidelines lie on its Simson line. Each foot is halfway from $P$ to its reflection. Dilation about $P$ by a factor of two takes the feet to the three reflections, giving the [[steiner-line|Steiner line]], which passes through the orthocenter $H$. If the problem supplies a line through $H$ first, reverse the reflections. The reflected lines meet on the circumcircle at its [[anti-steiner-point|anti-Steiner point]]. This gives a construction from two of the lines and a prediction for the third.

A second midpoint configuration starts with two perpendicular lines through $H$. Each sideline meets both, cutting off a pair of intercepts. The [[droz-farny|Droz-Farny theorem]] puts the midpoints of the three pairs on one line when the intersections are finite. Make the given perpendicular lines the coordinate axes. A side with intercepts $(m,0)$ and $(0,n)$ contributes $(\frac{m}{2},\frac{n}{2})$. The challenge uses this observation to prove the collinearity.

A repeated angle calls for a different measurement. At a Brocard point $P$, one cyclic choice of angles gives $\angle PAB=\angle PBC=\angle PCA=\omega$. To compute the [[brocard-angle|Brocard angle]], use $\cot\omega=\cot A+\cot B+\cot C$. If lengths are given, each term is already accessible: $\cot A=\frac{b^2+c^2-a^2}{4K}$ by the cosine and area formulas. Adding gives $\cot\omega=\frac{a^2+b^2+c^2}{4K}$, with $K$ the area.

Look at which shapes a construction adds to the original figure. Equilateral triangles drawn on the sides lead to the two Fermat points. In a scalene triangle [[lester-circle|Lester's circle]] contains both along with $O$ and $N$. If three distinct points on that circle are known, an angle subtended by their chord can locate the fourth. Squares drawn outward on the sides of a convex quadrilateral instead give four square centers. [[van-aubel|Van Aubel's theorem]] pairs the opposite centers: one joining segment is a quarter-turn of the other as a vector, up to sign. The square itself supplies the quarter-turn. The review asks you to use that information when just one of the joining vectors is given.`,
      exercises: [
        { q: String.raw`Two reflections of a circumcircle point $P$ in the sidelines are $10$ units apart. How far apart are the corresponding perpendicular feet?`, answer: "5",
          solution: String.raw`The feet are midpoints of the two segments from $P$ to its reflections. They form a midsegment of the resulting triangle, of length $\frac{10}{2}=5$.` },
        { q: String.raw`Find $\tan\omega$ in a triangle of side lengths $5,12,13$.`, answer: "60/169",
          solution: String.raw`The triangle is right, with area $30$. Thus $\tan\omega=\frac{4K}{a^2+b^2+c^2}=\frac{120}{25+144+169}=\frac{60}{169}$.` }
      ]
    },
    "O5.4": {
      prereq: [], cards: [],
      body: String.raw`The choice of center follows from the quantity the problem preserves. Squared distances to the vertices have a sum controlled by distance to the centroid. Weights on whole sides move the balance point to the incenter of the medial triangle. A difference or sum of circle radii gives a test for tangency once you know the distance between the centers.

For collinearity, first identify what has been reflected or bisected. Three reflections of one circumcircle point lead back to its perpendicular feet. Three midpoints cut off by two perpendicular lines through the orthocenter lead instead to a common pair of coordinate axes.`,
      strategies: ["Choose the centroid as origin when the same squared-distance term occurs for every vertex.", "Mark the sign of each circumcenter distance before adding the distances.", "Write down the centers and both radii before choosing internal or external tangency.", "For a line defined by three midpoints, inspect the endpoints before calculating slopes."]
    }
  },
  reviewProblems: { exercises: [
    { q: String.raw`Let $A=(0,0)$, $B=(8,0)$ and $C=(0,6)$. Find the balance point of the triangle's perimeter.`,
      solution: String.raw`The midpoint $(4,0)$ carries weight $8$, $(0,3)$ carries weight $6$, and $(4,3)$ carries weight $10$. Divide their weighted sum by $24$. The balance point is $(\frac{72}{24},\frac{48}{24})=(3,2)$.` },
    { q: String.raw`For two opposite square centers in Van Aubel's construction the joining vector is $(6,-2)$. What are the possibilities for the other joining vector if its orientation is unspecified?`,
      solution: String.raw`Rotating $(x,y)$ through a positive right angle gives $(-y,x)$, hence $(2,6)$. Reversing the orientation gives $(-2,-6)$. Both have squared length $40$ and zero dot product with $(6,-2)$.` },
    { q: String.raw`In Lester's configuration suppose $F_1$ and $F_2$ lie on opposite sides of $ON$, and $\angle OF_1N=74^\circ$. Find $\angle OF_2N$.`, answer: "106",
      solution: String.raw`The common circle makes the two angles opposite angles of a cyclic quadrilateral: they subtend chord $ON$ from opposite segments. Their sum is $180^\circ$, giving $106^\circ$.` }
  ], problems: [] },
  challenge: { exercises: [
    { q: String.raw`Using the centroid identity, prove $OG^2=R^2-\frac{a^2+b^2+c^2}{9}$. Deduce that among triangles with fixed circumradius the equilateral triangle maximizes the sum of squared side lengths.`,
      solution: String.raw`Put $P=O$ in Leibniz's formula. The left side is $3R^2$, so division by three gives the identity. Consequently $a^2+b^2+c^2\le 9R^2$, with equality precisely when $O=G$. In that case each median passes through the circumcenter and its side midpoint. For a side whose midpoint differs from $O$, that median is the perpendicular bisector. At most one side can be a diameter, so at least two such bisectors are medians, forcing all three sides equal. Conversely an equilateral triangle has $O=G$ and attains the bound.` },
    { q: String.raw`Prove the Droz-Farny collinearity when the intercepts are finite and the vertices have nonzero coordinates in the chosen axes. Take $H$ as origin and the given perpendicular lines as axes.`,
      solution: String.raw`Write $A=(u_1,v_1)$, $B=(u_2,v_2)$ and $C=(u_3,v_3)$. Since $HA$ is perpendicular to $BC$, the dot products $A\cdot B$ and $A\cdot C$ agree. Cycling shows all three pairwise dot products equal some $k$. The line $BC$ therefore has equation $u_1x+v_1y=k$. Its intercept midpoint is $M_1=(\frac{k}{2u_1},\frac{k}{2v_1})$, and similarly for $M_2,M_3$. If $k=0$ the midpoints coincide. Otherwise the slope of $M_1M_2$ equals $\frac{v_2-v_1}{u_2-u_1}\frac{u_1u_2}{v_1v_2}$. The first factor is the slope of $AB$, namely $-\frac{u_3}{v_3}$ because $AB\perp HC$. The resulting slope $-\frac{u_1u_2u_3}{v_1v_2v_3}$ is symmetric, so $M_2M_3$ has the same slope. The three points are collinear.` }
  ], problems: [] }
};
