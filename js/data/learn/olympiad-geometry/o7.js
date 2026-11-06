// Learn, Olympiad Geometry, chapter O7: Projective geometry.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O7"] = {
  lessons: {
    "O7.1": {
      prereq: [], cards: [],
      body: String.raw`A straight road photographed from one end looks narrower in the distance. Its painted marks remain on a line, but their spacings change. Suppose four marks have coordinates $0,1,2,3$, and their coordinates in a second view are given by $f(t)=\frac{t}{t+1}$. The last two gaps shrink to $\frac16$ and $\frac1{12}$. Could you still identify a missing mark from the other three?

The first lesson constructs a number from four marks that both views share. The second uses incidence: which points lie on which lines. Six points on a conic, taken in the right order, can determine a line that is hard to spot by measuring angles. The final lesson returns to circles and distances. There the important decision is what a change of viewpoint is allowed to destroy. An arbitrary projective view can turn a circle into another conic, so it cannot by itself justify a claim about radii or volume.`,
      exercises: [
        { q: String.raw`Where does the midpoint of the interval $[0,2]$ go under $f$? Is it the midpoint of the image interval?`,
          solution: String.raw`Its image is $f(1)=\frac12$. The endpoints go to $0$ and $\frac23$, whose midpoint is $\frac13$. Thus midpoint information has been lost.` },
        { q: String.raw`Suppose two lines meet at $P$, and a third passes through $P$. Which feature survives a projective change of view even if $P$ goes to infinity?`,
          solution: String.raw`All three image lines contain the image of $P$. If it is a point at infinity they appear as three parallel lines in the ordinary plane. Concurrence is still an incidence statement in the projective plane.` }
      ]
    },
    "O7.2": {
      prereq: [], cards: ["cross-ratio", "harmonic-bundle", "pole-polar", "brocards-theorem"],
      related: [
        { card: "harmonic-quadrilateral", note: String.raw`a cyclic quadrilateral whose vertices have cross-ratio $-1$ on the circle (G9.5).` },
        { card: "power-of-a-point", note: String.raw`the tangent length behind the polar $x=\frac{R^2}{p}$ (S5.5).` },
        { card: "projective-transformations", note: String.raw`the maps under which cross-ratio is invariant (O1.4).` }
      ],
      body: String.raw`To locate a fourth mark, use directed coordinates $a,b,c,d$ on its line. The [[cross-ratio|cross-ratio]] in the order $(A,B;C,D)$ is $\frac{(c-a)(d-b)}{(c-b)(d-a)}$. For the four marks in the introduction it is $\frac43$. Why does it survive the new view? Under $f(t)=\frac{t}{t+1}$ a difference $u-v$ becomes $\frac{u-v}{(u+1)(v+1)}$. In the cross-ratio every endpoint occurs once above and once below the fraction bar, so all four extra factors cancel.

A particularly revealing value is $-1$. Put $A=-1$, $B=1$, $C=c$, $D=d$. Setting the cross-ratio to $-1$ gives $(c+1)(d-1)=-(c-1)(d+1)$, or $cd=1$. One interior point is paired with one exterior point. Draw the four rays from a point off the line to these marks: this is a [[harmonic-bundle|harmonic bundle]]. Intersect the rays with a different transversal and the new four marks are again harmonic, since the change of transversal is a projection.

Scale the same calculation to a circle of radius $R$ centered at the origin. Put an external point at $(p,0)$, with $p>R$. Its [[pole-polar|polar]] is $x=\frac{R^2}{p}$: at a contact point $T=(x,y)$ the radius $OT$ is perpendicular to $PT$, giving $x(x-p)+y^2=0$. The chord through the two contacts therefore cuts the diameter at the harmonic partner of $p$ with respect to $-R,R$. In a cyclic quadrilateral let $E=AB\cap CD$, $F=AD\cap BC$ and $G=AC\cap BD$, with all intersections finite and distinct. [[brocards-theorem|Brocard's theorem]] identifies $FG$ as the polar of $E$, and cyclically for the other pairs. Hence the circumcenter $O$ lies on all three altitudes of $EFG$. The right angles come from polarity with respect to this particular circle.`,
      exercises: [
        { q: String.raw`On a diameter the endpoints have coordinates $-6,6$. Find the harmonic partner of the point at $4$.`,
          answer: "9", solution: String.raw`Rescaling the unit calculation gives $cd=6^2$. Thus $d=\frac{36}{4}=9$, beyond the endpoint at $6$.` },
        { q: String.raw`The tangents from $(10,0)$ touch the circle $x^2+y^2=25$ at $U,V$. Find the length of $UV$.`,
          solution: String.raw`Both contacts have $x=\frac{25}{10}=\frac52$. Their ordinates are $\pm\sqrt{25-\frac{25}{4}}=\pm\frac{5\sqrt3}{2}$. The difference is $5\sqrt3$.` }
      ]
    },
    "O7.3": {
      prereq: [], cards: ["pascals-theorem", "brianchon-theorem", "pappus-hexagon", "desargues-theorem", "desargues-involution"],
      related: [
        { card: "pole-polar", note: String.raw`the duality that turns Pascal's theorem into Brianchon's (O7.2).` },
        { card: "projective-transformations", note: String.raw`a map that sends a chosen line to infinity before Pascal or Desargues is applied (O1.4).` },
        { card: "menelaus-theorem", note: String.raw`a metric route to the same collinearities (G5.5).` }
      ],
      body: String.raw`Six labeled points lie on one conic. You want to prove three intersections collinear, but which intersections? Write the six vertices in a cycle $A,B,C,D,E,F$. Pair each edge with the edge three places later. [[pascals-theorem|Pascal's theorem]] puts $AB\cap DE$, $BC\cap EF$ and $CD\cap FA$ on a line. You may change the order of the six vertices to fit the problem: the edges need not trace a convex hexagon. If two of the intersections are at infinity, the third is also there, yielding a third parallel pair.

Exchange points on the conic for tangent lines to it. The resulting hexagon has consecutive vertices at the intersections of neighboring tangents. The dual conclusion, [[brianchon-theorem|Brianchon's theorem]], makes the three lines joining opposite vertices concurrent. If the six original points lie three on each of two lines instead, interleave the two triples in the six-cycle. The resulting collinearity is [[pappus-hexagon|Pappus's theorem]]. Labeling the cycle first avoids confusing opposite sides with opposite vertices.

For two triangles there is a smaller incidence test. If $AA',BB',CC'$ concur, [[desargues-theorem|Desargues's theorem]] says that the intersections of corresponding sidelines are collinear; its converse recovers concurrence from the line. The [[desargues-involution|Desargues involution theorem]] answers a different question. Fix four base points and a transversal through none of them. Conics through the four points cut the transversal in pairs belonging to one involution, a projective map that undoes itself. To find the rule, start with reducible conics: for instance $AB$ together with $CD$. Their intersections with the transversal supply one pair without any curved construction. Two distinct pairs determine the involution in a nondegenerate configuration.`,
      exercises: [
        { q: String.raw`For an inscribed hexagon $ABCDEF$, suppose $AB\parallel DE$ and $BC\parallel EF$, with the two directions distinct. What does Pascal give about $CD$ and $FA$?`,
          solution: String.raw`The first two opposite-side intersections are distinct points at infinity. Their joining line is the line at infinity. The third intersection lies there too, so $CD\parallel FA$.` },
        { q: String.raw`Let $A,B,C$ lie on one line and $a,b,c$ on another. Find the Pappus point collinear with $Ab\cap aB$ and $Ac\cap aC$.`,
          solution: String.raw`Use the order $A,b,C,a,B,c$. The first opposite pair gives $Ab\cap aB$ and the third gives $Ca\cap cA$. The remaining pair is $bC$ and $Bc$, so the missing point is $bC\cap Bc$.` },
        { q: String.raw`On a transversal two pairs exchanged by a conic pencil are $(1,6)$ and $(2,3)$. Which point is paired with $4$?`,
          answer: "3/2", solution: String.raw`The projective map $t\mapsto\frac6t$ interchanges both pairs and is its own inverse. By uniqueness it is the pencil's involution. The partner is $\frac64=\frac32$.` }
      ]
    },
    "O7.4": {
      prereq: [], cards: ["complete-quadrilateral-miquel", "mobius-transformations", "descartes-sphere-theorem", "cayley-menger"],
      related: [
        { card: "miquels-theorem", note: String.raw`Miquel's theorem for one triangle, the source of each of the four circles.` },
        { card: "inversion-properties", note: String.raw`inversion, a Möbius map followed by a reflection (O1.3).` },
        { card: "descartes-circle-theorem", note: String.raw`the plane relation $(\sum k)^2=2\sum k^2$, with two in place of three (G2.6).` },
        { card: "regular-tetrahedron", note: String.raw`the edge-$2$ tetrahedron of the four unit-sphere centers (G8.2).` }
      ],
      body: String.raw`Four lines in general position determine four triangles, one for each omitted line. Each pair of triangle circumcircles shares a vertex, but those vertices are different. The [[complete-quadrilateral-miquel|Miquel point]] is their other common point in a generic configuration. Send it to infinity by the [[mobius-transformations|Möbius transformation]] $w=\frac1{z-m}$, where $m$ is its complex coordinate. Each of the four circles now appears as a line: a circle through the pole of the map goes to a generalized circle containing infinity. This straightens several circles at once. Distances in the new picture generally change.

For tangent spheres the distances themselves matter. Four mutually externally tangent unit spheres have centers forming a regular tetrahedron of edge $2$. A fifth sphere in the central gap is equally distant from those centers. The [[descartes-sphere-theorem|Soddy–Gosset theorem]] lets us find its radius without first constructing that tetrahedron. Write curvature as the reciprocal radius, using a negative sign for an enclosing sphere. The five curvatures satisfy $(4+k)^2=3(4+k^2)$ here. The roots are $2+\sqrt6$ and $2-\sqrt6$. The larger one belongs to the small sphere in the gap; the negative one describes an enclosing sphere.

For four centers with different radii, an edge between two externally tangent spheres has length $r_i+r_j$. This supplies six edge lengths, often with no easy altitude. The [[cayley-menger|Cayley–Menger determinant]] converts those six lengths into volume. Put their squares in a symmetric four-by-four distance matrix with zeros on the diagonal. Border it with a row and column of ones and put zero in the new corner. Its determinant is $288V^2$. Check any substitution by scaling: doubling every edge multiplies volume by eight and the determinant by sixty-four.`,
      exercises: [
        { q: String.raw`Under $w=\frac1z$, find the image of the circle $|z-1|=1$, including its point at infinity in the image.`,
          solution: String.raw`Away from $z=0$, substitution gives $|1-w|=|w|$. These are precisely the points equidistant from $0$ and $1$, the vertical line with real part $\frac12$. The original point $z=0$ supplies its point at infinity.` },
        { q: String.raw`If a tetrahedron has Cayley–Menger determinant $1152$, find its volume and the volume after every edge is tripled.`,
          solution: String.raw`Its squared volume is $\frac{1152}{288}=4$, so $V=2$. Tripling the lengths multiplies volume by $27$, giving $54$.` }
      ]
    },
    "O7.5": {
      prereq: ["cross-ratio", "harmonic-bundle", "pole-polar", "brocards-theorem", "pascals-theorem", "brianchon-theorem", "pappus-hexagon", "desargues-theorem", "desargues-involution", "complete-quadrilateral-miquel", "mobius-transformations", "descartes-sphere-theorem", "cayley-menger"], cards: [],
      body: String.raw`[[cross-ratio|The cross-ratio]] $\frac{(c-a)(d-b)}{(c-b)(d-a)}$ survives every projection; at the value $-1$ the four points form a [[harmonic-bundle|harmonic bundle]]. The [[pole-polar|polar]] of a point at distance $p$ from the center is the line at distance $\frac{R^2}{p}$, and [[brocards-theorem|Brocard's theorem]] makes $O$ the orthocenter of the diagonal triangle of a cyclic quadrilateral.

[[pascals-theorem|Pascal's theorem]] puts the three opposite-side intersections of a hexagon on a conic on one line; [[brianchon-theorem|Brianchon's theorem]] is its dual, and [[pappus-hexagon|Pappus's theorem]] its case for two lines. [[desargues-theorem|Desargues's theorem]] trades concurrence of $AA'$, $BB'$, $CC'$ for collinearity of corresponding side intersections, and [[desargues-involution|the Desargues involution theorem]] pairs the intersections of a pencil of conics with a line.

[[complete-quadrilateral-miquel|The Miquel point]] of four lines lies on the four triangle circumcircles, and a [[mobius-transformations|Möbius transformation]] with its pole there turns them into lines. The [[descartes-sphere-theorem|Soddy–Gosset theorem]] reads $\left(\sum k\right)^2=3\sum k^2$ for five mutually tangent spheres, and the [[cayley-menger|Cayley–Menger determinant]] equals $288V^2$.

For four marks on a line, label them in order and keep the directed differences until the final simplification. For points and lines around a conic, decide whether the objects lie on it or touch it, then label the six-cycle before taking intersections. The same drawing can support several six-cycles and several different conclusions.

Before changing coordinates, state what the map preserves. Projection preserves incidence and cross-ratio. A Möbius map carries generalized circles to generalized circles. When the requested answer is a radius or volume, return to the given metric data before computing it.`,
      strategies: ["Normalize two endpoints to opposite coordinates when testing harmonic division.", "Work backward from the desired Pascal line to an order of six vertices.", "Choose the pole of a Möbius map at a common point of circles to turn them into lines.", "Distinguish positive curvature in a gap from negative curvature for an enclosing sphere."]
    }
  },
  reviewProblems: { exercises: [
    { q: String.raw`In a cyclic complete quadrangle, take its diagonal points $E,F,G$ as in O7.2. If $O$ is the origin, $E=(5,0)$ and the radius is $3$, give the equation of $FG$.`,
      solution: String.raw`Brocard identifies $FG$ as the polar of $E$. Its equation is $5x=3^2$, or $x=\frac95$. In particular it is perpendicular to $OE$.` },
    { q: String.raw`Six tangents form the sides of a hexagon with consecutive vertices $P,Q,R,S,T,U$. If $PS$ and $QT$ meet at $X$, construct the line $RU$ using only $R$ and $X$, assumed distinct.`,
      solution: String.raw`The three opposite-vertex lines concur by Brianchon. Their common point is already $X$, so $RX$ is the required line.` },
    { q: String.raw`A dilation about $S$ carries triangle $ABC$ to $A'B'C'$ with factor $3$. Where is the Desargues line in a configuration with three distinct side directions?`,
      solution: String.raw`Corresponding sidelines are parallel, so each pair meets at its direction's point at infinity. The three points lie on the line at infinity, as expected from concurrence of $AA',BB',CC'$ at $S$.` }
  ], problems: [] },
  challenge: { exercises: [
    { q: String.raw`A projective map on a line interchanges $-1$ and $1$ and fixes $2$. Find its second fixed point and prove the pair of fixed points divides $-1,1$ harmonically.`,
      solution: String.raw`Write $f(t)=\frac{at+b}{ct+d}$. The endpoint conditions give $d=-a$ and $c=-b$. The fixed point equation is then $bt^2+2at+b=0$. Here $b\ne0$, since otherwise the map would be $t\mapsto-t$ and could not fix $2$. The roots have product $1$, so the second is $\frac12$. For endpoints $-1,1$ a pair is harmonic exactly when its coordinate product is $1$, as derived in O7.2.` },
    { q: String.raw`Recover the two radii from the four unit spheres of O7.4 using only Euclidean distances, and match them to the two signed curvatures.`,
      solution: String.raw`Use centers $(1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1)$, scaled by $\frac1{\sqrt2}$ so their pairwise distances are $2$. The origin is equidistant from all four, at distance $\rho=\sqrt{\frac32}$. For the gap sphere, external contact gives radius $\rho-1$; for the enclosing sphere, internal contact gives radius $\rho+1$. Since $\rho^2-1=\frac12$, the signed reciprocals are $\frac1{\rho-1}=2(\rho+1)=2+\sqrt6$ and $-\frac1{\rho+1}=-2(\rho-1)=2-\sqrt6$.` }
  ], problems: [] }
};
