// Learn, AMC Geometry, chapter S9: advanced triangles and circles (CONVENTIONS §14). Part: Advanced topics.
// Triangle chords, cevian lengths, tangencies and triangle centers.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S9"] = {
  lessons: {
    "S9.1": {
      prereq: ["law-of-cosines", "inscribed-angle-theorem", "tangent-circles", "herons-formula"],
      cards: [],
      body: String.raw`A triangle can be studied through the circle passing through its vertices. Calling the circle's radius $R$, an angle of $30^\circ$ opposite a side of length five gives $5=2R\sin 30^\circ$, so $R=5$. This works because an angle at the circumference determines the length of the chord it subtends. The circle turns an angle condition into a length condition.

Inside a triangle, a different reduction uses segments drawn from the vertices to the opposite sides. A median is one such segment, with its endpoint at the midpoint. In a $6$-$8$-$10$ triangle, the midpoint of the hypotenuse is the circumcenter, so the median to that side also measures the circumradius, five. More general cevian lengths and intersections can be found from the side lengths or side ratios. We develop those methods first, then use chord lengths, tangent lengths and triangle centers to handle figures involving several triangles or circles.`,
      exercises: [
        { q: String.raw`In a triangle, the side opposite an angle of $30^\circ$ has length $5$. What is the circumradius?`, answer: "5",
          solution: String.raw`The side is a chord, and the arc it subtends at the center has measure $60^\circ$. The chord and the two radii make an equilateral triangle, so the radius equals the chord length five.` },
        { q: String.raw`What is the circumradius of the triangle with sides $13$, $14$ and $15$?`, answer: "65/8",
          solution: String.raw`The semiperimeter is twenty-one. Heron's formula gives area $\sqrt{21(21-13)(21-14)(21-15)}=84$. The area and chord formulas combine to give $R=abc/(4K)=13\cdot14\cdot15/(4\cdot84)=65/8$.` },
        { q: String.raw`A triangle has sides $6$, $8$ and $10$. How long is the median to the side of length $10$?`, answer: "5",
          solution: String.raw`Since $6^2+8^2=10^2$, the longest side is the hypotenuse of a right triangle. The hypotenuse is a diameter of the circumcircle. Its midpoint is therefore five units from the right-angle vertex, which is the length of the requested median.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 11",
        "2023 AMC 10A, Problem 13",
        "2004 AMC 10B, Problem 24"
      ]
    },
    "S9.2": {
      prereq: ["law-of-cosines", "trig-area", "inscribed-angle-theorem", "special-right-triangles"],
      cards: ["law-of-sines", "circumradius-area", "projection-formula", "pythagorean-identities", "common-angle-values", "reduction-identities"],
      body: String.raw`For triangle $ABC$ write $a=BC$, $b=CA$ and $c=AB$. The inscribed angle $A$ subtends one of the two arcs from $B$ to $C$, with arc measure $2A$. If this is the minor arc, bisect the isosceles triangle formed by the chord and the two radii to get $a=2R\sin A$. If it is the major arc, the same right triangle uses half the minor arc, $180^\circ-A$. Its sine is still $\sin A$, so the same chord formula holds. A diameter gives the intermediate case $A=90^\circ$ and $a=2R$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 283" role="img" aria-label="The same chord BC subtends an acute inscribed angle at A and its obtuse supplement at A′." style="width:100%;max-width:320px;height:auto"><title>The same chord BC subtends an acute inscribed angle at A and its obtuse supplement at A′.</title><circle cx="160" cy="148" r="102" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M76.446 89.495L243.554 89.495L160 148L76.446 89.495" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M76.446 89.495L133.6 246.524L243.554 89.495" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M76.446 89.495L160 46L243.554 89.495" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M160 148L160 89.495" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="133.6" cy="246.524" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="76.446" cy="89.495" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="243.554" cy="89.495" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="160" cy="46" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="160" cy="148" r="2.5" fill="currentColor" stroke="currentColor"/><text x="130.6" y="268.524" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="61.446" y="88.495" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="258.554" y="88.495" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="160" y="33" fill="currentColor" text-anchor="middle" font-size="17">A′</text><text x="160" y="168" fill="currentColor" text-anchor="middle" font-size="17">O</text></svg>

Applying the chord formula to each side gives the [[law-of-sines|law of sines]]
$$\frac a{\sin A}=\frac b{\sin B}=\frac c{\sin C}=2R.$$
For $A=45^\circ$, $B=60^\circ$ and $a=\sqrt2$, the ratio $a/\sin A$ is two, so $b=2\sin 60^\circ=\sqrt3$. With two angles and a side the triangle is determined. With two sides and an angle opposite one of them, solving for a sine can give supplementary candidate angles. Each candidate still has to leave a positive third angle.

The area $K$ is $ab\sin C/2$. Substituting $\sin C=c/(2R)$ gives the [[circumradius-area|circumradius formula]] $R=abc/(4K)$. For sides thirteen, fourteen and fifteen, Heron's formula with semiperimeter twenty-one gives $K=\sqrt{21\cdot8\cdot7\cdot6}=84$. The radius is then $65/8$.

Dropping the perpendicular from $A$ to the line $BC$ gives the [[projection-formula|projection formula]] $a=c\cos B+b\cos C$. The two terms are the signed distances from $B$ and $C$ toward the foot, measured along the base toward the other vertex. If the foot lies beyond $B$, the first projection is negative and the second extends beyond the base. Their signed sum is still $BC$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322 205" role="img" aria-label="The foot H lies beyond B, so the signed projections from B and C are −2 and 6." style="width:100%;max-width:322px;height:auto"><title>The foot H lies beyond B, so the signed projections from B and C are −2 and 6.</title><path d="M54 26L128 137L276 137Z" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/><path d="M54 26L54 137L128 137" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M54 127.75L63.25 127.75L63.25 137" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="54" cy="26" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="128" cy="137" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="276" cy="137" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="54" cy="137" r="2.5" fill="currentColor" stroke="currentColor"/><text x="43" y="29" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="128" y="159" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="276" y="159" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="54" y="159" fill="currentColor" text-anchor="middle" font-size="17">H</text><text x="161" y="189" fill="currentColor" text-anchor="middle" font-size="17">The projections are −2 and 6.</text></svg>

The [[common-angle-values|sine and cosine values]] of $30^\circ,45^\circ,60^\circ$ follow from the $30$-$60$-$90$ and $45$-$45$-$90$ side ratios. For other values, the [[pythagorean-identities|Pythagorean identity]] $\sin^2\theta+\cos^2\theta=1$ comes from the unit circle, and dividing by $\cos^2\theta$ gives $1+\tan^2\theta=\sec^2\theta$ when $\cos\theta\ne0$. For a triangle angle with $\cos\theta=3/5$, the sine is positive and has square $16/25$, so $\tan\theta=4/3$. Reflecting the point on the unit circle across its vertical axis gives the [[reduction-identities|supplementary-angle identities]] $\sin(180^\circ-\theta)=\sin\theta$ and $\cos(180^\circ-\theta)=-\cos\theta$. In a triangle these relate $A$ to $B+C$.`,
      related: [
        { card: "angle-addition", note: String.raw`the sines and cosines of sums, $\sin(B + C)$ (L12.2).` },
        { card: "chord-length", note: String.raw`a chord as $2R\sin\tfrac\theta2$ (S5.2).` },
        { card: "law-of-cosines", note: String.raw`the other law, for two sides and the angle between them (S4.6).` }
      ],
      exercises: [
        { q: String.raw`In triangle $ABC$, $A=45^\circ$, $B=60^\circ$ and $BC=\sqrt2$. How long is $CA$?`, answer: "sqrt(3)",
          solution: String.raw`Both sides lie on chords of the same circumcircle. The ratio $BC/\sin A$ is $\sqrt2/(\sqrt2/2)=2$. By the law of sines, $CA=2\sin60^\circ=\sqrt3$.` },
        { q: String.raw`A triangle has a side of length $7$ opposite an angle of $30^\circ$. What is its circumradius?`, answer: "7",
          solution: String.raw`The chord of length seven is $2R\sin30^\circ$, which equals $R$ because the sine is $1/2$. Hence $R=7$.` },
        { q: String.raw`An angle $\theta$ of a triangle has $\cos\theta=3/5$. What is $\tan\theta$?`, answer: "4/3",
          solution: String.raw`From the unit-circle identity, $\sin^2\theta=1-9/25=16/25$. A triangle angle lies strictly between $0^\circ$ and $180^\circ$, so its sine is positive. Thus $\sin\theta=4/5$ and $\tan\theta=(4/5)/(3/5)=4/3$.` },
        { q: String.raw`In triangle $ABC$, $\cos A=1/3$. What is $\cos(B+C)$?`, answer: "-1/3",
          solution: String.raw`Since $B+C=180^\circ-A$, the unit-circle points for $A$ and $B+C$ are reflections across the vertical axis. Their $x$-coordinates have opposite signs, giving $\cos(B+C)=-1/3$.` }
      ],
      problems: [
        "2019 AMC 12A, Problem 19",
        "2021 Fall AMC 12B, Problem 9",
        "2011 AMC 12B, Problem 20",
        "2004 AMC 10A, Problem 25",
        "2006 AMC 12A, Problem 15",
        "2010 AMC 12B, Problem 20",
        "2014 AMC 12B, Problem 21",
        "2021 Fall AMC 12B, Problem 13",
        "2025 AMC 10A, Problem 23",
        "2007 AMC 12A, Problem 24"
      ]
    },
    "S9.3": {
      prereq: ["law-of-cosines", "angle-bisector-theorem", "cevian-area-ratio", "midsegment-theorem", "equilateral-triangle-facts"],
      cards: ["stewarts-theorem", "angle-bisector-length", "apollonius-theorem", "cevas-theorem", "medial-triangle", "vivianis-theorem", "area-method"],
      body: String.raw`A cevian is a segment from a vertex to a point on the opposite side. Let $AD$ have length $d$, where $D$ is inside $BC$ and $BD=m$, $DC=n$. As usual, $a=m+n$, $b=CA$ and $c=AB$. If $\theta=\angle ADB$, then $\angle ADC=180^\circ-\theta$. The cosine laws at $D$ give
$$c^2=d^2+m^2-2dm\cos\theta,\qquad b^2=d^2+n^2+2dn\cos\theta.$$
Multiplying the first equation by $n$ and the second by $m$ cancels the cosine terms. The resulting [[stewarts-theorem|Stewart identity]] is $b^2m+c^2n=a(d^2+mn)$. When $b=c=5$ and $m=2,n=4$, the left side is $150$ and $d^2=25-8=17$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345 218" role="img" aria-label="A cevian AD divides the base into lengths m and n. The two angles at D along the base are supplementary." style="width:100%;max-width:345px;height:auto"><title>A cevian AD divides the base into lengths m and n. The two angles at D along the base are supplementary.</title><path d="M66 167L174 23L282 167Z" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.5"/><path d="M174 23L138 167" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="174" cy="23" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="66" cy="167" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="282" cy="167" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="138" cy="167" r="2.5" fill="currentColor" stroke="currentColor"/><text x="189" y="28" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="66" y="190" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="282" y="190" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="138" y="190" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="102" y="160" fill="currentColor" text-anchor="middle" font-size="17">m</text><text x="210" y="160" fill="currentColor" text-anchor="middle" font-size="17">n</text></svg>

For a median, $m=n=a/2$. Stewart's identity reduces to [[apollonius-theorem|Apollonius's median formula]], $d^2=(2b^2+2c^2-a^2)/4$. For an internal angle bisector the side ratio is $m:n=c:b$. Hence $m=ac/(b+c)$ and $n=ab/(b+c)$, so $b^2m+c^2n=abc$. This gives the [[angle-bisector-length|angle-bisector length]] $d^2=bc-mn$. For adjacent sides six and nine and opposite side ten, $m=4,n=6$ and $d^2=30$.

Concurrence is a separate question. Let $AD,BE,CF$ meet at an interior point $P$, with $D,E,F$ in the relative interiors of their respective sides. Triangles $ABD$ and $ADC$ have equal altitude to $BC$, so their area ratio is $BD:DC$. The same ratio holds for $PBD$ and $PDC$. Subtract the latter areas from the former to obtain $[ABP]:[ACP]=BD:DC$. Applying the same [[area-method|area comparison]] at the other vertices gives
$$\frac{AF}{FB}\frac{BD}{DC}\frac{CE}{EA}
=\frac{[ACP]}{[BCP]}\frac{[ABP]}{[ACP]}\frac{[BCP]}{[ABP]}=1.$$
Conversely, let $AD$ and $BE$ meet at $P$. The line $CP$ meets $AB$ at the unique point whose ratio $AF:FB$ makes the product one. Therefore if the three given ratios multiply to one, the given $F$ lies on $CP$. This proves [[cevas-theorem|Ceva's theorem]] for these internal cevians. Ratios two and three force the remaining ratio to be $1/6$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 222" role="img" aria-label="Cevians AD, BE and CF meet at P. The six small triangles compare areas along each side." style="width:100%;max-width:333px;height:auto"><title>Cevians AD, BE and CF meet at P. The six small triangles compare areas along each side.</title><path d="M166 24L35 190L296 190Z" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-width="1.5"/><path d="M166 24L35 190L180.111 153.111Z" fill="currentColor" fill-opacity="0.11" stroke="currentColor" stroke-width="1.5"/><path d="M166 24L184.143 190" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M35 190L252.667 134.667" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M296 190L87.4 123.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="166" cy="24" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="35" cy="190" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="296" cy="190" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="184.143" cy="190" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="252.667" cy="134.667" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="87.4" cy="123.6" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="180.111" cy="153.111" r="2.5" fill="currentColor" stroke="currentColor"/><text x="166" y="15" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="32" y="211" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="301" y="211" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="184.143" y="211" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="265.667" y="127.667" fill="currentColor" text-anchor="middle" font-size="17">E</text><text x="70.4" y="123.6" fill="currentColor" text-anchor="middle" font-size="17">F</text><text x="183.111" y="142.111" fill="currentColor" text-anchor="middle" font-size="17">P</text></svg>

Area also measures simpler subdivisions. The [[medial-triangle|medial triangle]] joins the three side midpoints. Each connecting segment is parallel to and half the length of the opposite side, so the new area is a quarter of the original. For any point inside $ABC$, the three triangles drawn to the sides have total area $K$. If the perpendicular distances to the side lines are $u,v,w$, this gives $au+bv+cw=2K$. In an equilateral triangle the side lengths cancel, proving [[vivianis-theorem|Viviani's theorem]] that $u+v+w$ equals the altitude. Even when a perpendicular foot falls outside a side segment, its distance to the side line is still the appropriate altitude.`,
      related: [
        { card: "mass-points", note: String.raw`the ratios on concurrent cevians found by balancing (S3.5).` },
        { card: "median-doubling", note: String.raw`a median handled by completing a parallelogram (S4.3).` },
        { card: "menelaus-theorem", note: String.raw`the companion product for a line cutting the three sides.` }
      ],
      exercises: [
        { q: String.raw`Triangle $ABC$ has $AB=AC=5$ and $BC=6$. Point $D$ on $BC$ has $BD=2$. What is $AD^2$?`, answer: "17",
          solution: String.raw`The altitude from $A$ in this isosceles triangle meets $BC$ at its midpoint $M$, three units from $B$. The altitude length is $\sqrt{5^2-3^2}=4$. Since $DM=3-2=1$, the right triangle $AMD$ gives $AD^2=4^2+1^2=17$.` },
        { q: String.raw`A triangle has sides $5$, $7$ and $8$. What is the square of the median to the side of length $8$?`, answer: "21",
          solution: String.raw`The median splits the side into two lengths of four. Applying Stewart's identity with equal parts gives $4(5^2+7^2)=8(d^2+16)$. Thus $d^2=(25+49)/2-16=21$.` },
        { q: String.raw`In triangle $ABC$, $AB=6$, $AC=9$ and $BC=10$. What is the square of the length of the internal bisector of angle $A$?`, answer: "30",
          solution: String.raw`The angle-bisector theorem splits $BC$ in the ratio $6:9$, giving parts four and six. The bisector version of Stewart's identity gives $d^2=AB\cdot AC-4\cdot6=54-24=30$.` },
        { q: String.raw`Internal cevians $AD$, $BE$, $CF$ of triangle $ABC$ meet at one point, with $AF/FB=2$ and $BD/DC=3$. What is $CE/EA$?`, answer: "1/6",
          solution: String.raw`For three concurrent internal cevians, those ratios along successive sides multiply to one by Ceva's theorem. Thus $2\cdot3\cdot CE/EA=1$ and the required ratio is $1/6$.` },
        { q: String.raw`A triangle has area $40$. What is the area of the triangle whose vertices are the midpoints of the original sides?`, answer: "10",
          solution: String.raw`The midpoint theorem makes each side of the medial triangle parallel to and half as long as one original side. The medial triangle is thus similar at length ratio $1/2$, and its area is $(1/2)^2\cdot40=10$.` }
      ],
      problems: [
        "2021 Spring AMC 12B, Problem 11",
        "2002 AMC 12B, Problem 23"
      ]
    },
    "S9.4": {
      prereq: ["cyclic-opposite-angles", "cyclic-equal-angles", "incircle-tangent-lengths", "herons-formula", "triangle-similarity"],
      cards: ["ptolemys-theorem", "brahmaguptas-formula", "pitots-theorem", "perp-to-angle-bisector"],
      body: String.raw`Let a convex cyclic quadrilateral $ABCD$ have side lengths $a,b,c,d$ in order and diagonals $p=AC$ and $q=BD$. To prove [[ptolemys-theorem|Ptolemy's theorem]], choose $X$ on $AC$ so $\angle ABX=\angle DBC$. Since $\angle BAC=\angle BDC$, triangles $ABX$ and $DBC$ are similar, giving $AX\cdot BD=AB\cdot DC$. Subtracting the equal angles at $B$ from $\angle ABC$ gives $\angle XBC=\angle ABD$. Also $\angle BCX=\angle BDA$, so triangles $XBC$ and $ABD$ are similar and $XC\cdot BD=BC\cdot AD$. Adding gives $pq=ac+bd$. For sides three, four, five and six, the diagonal product is $15+24=39$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317 274" role="img" aria-label="X is chosen on AC so that the angle ABX equals DBC. Two triangle similarities give the two terms of Ptolemy’s identity." style="width:100%;max-width:317px;height:auto"><title>X is chosen on AC so that the angle ABX equals DBC. Two triangle similarities give the two terms of Ptolemy’s identity.</title><circle cx="157" cy="138" r="108" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M59.119 183.643L84.734 57.74L235.986 64.344L245.468 199.946Z" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/><path d="M59.119 183.643L235.986 64.344" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M84.734 57.74L245.468 199.946" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M84.734 57.74L126.585 138.136" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="59.119" cy="183.643" r="3" fill="currentColor" stroke="currentColor"/><circle cx="84.734" cy="57.74" r="3" fill="currentColor" stroke="currentColor"/><circle cx="235.986" cy="64.344" r="3" fill="currentColor" stroke="currentColor"/><circle cx="245.468" cy="199.946" r="3" fill="currentColor" stroke="currentColor"/><circle cx="126.585" cy="138.136" r="3" fill="currentColor" stroke="currentColor"/><text x="46.119" y="199.643" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="74.734" y="48.74" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="247.986" y="56.344" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="259.468" y="211.946" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="119.585" y="159.136" fill="currentColor" text-anchor="middle" font-size="17">X</text></svg>

To find the area, use the two triangles along $AC$. Writing $B=\angle ABC$, the angle at $D$ is $180^\circ-B$. Thus $2K=(ab+cd)\sin B$. Both triangles have the same opposite side $AC$, so subtracting their cosine laws gives
$$2(ab+cd)\cos B=a^2+b^2-c^2-d^2.$$
Consequently $16K^2=4(ab+cd)^2-(a^2+b^2-c^2-d^2)^2$. The difference of squares factors into $((a+b)^2-(c-d)^2)((c+d)^2-(a-b)^2)$. With semiperimeter $s$, the four resulting linear factors are $2(s-a),2(s-b),2(s-c),2(s-d)$. This proves [[brahmaguptas-formula|Brahmagupta's formula]] $K=\sqrt{(s-a)(s-b)(s-c)(s-d)}$. For the same four sides, $s=9$ and $K=\sqrt{6\cdot5\cdot4\cdot3}=6\sqrt{10}$. The proof uses cyclicity through the supplementary angles at $B$ and $D$.

A quadrilateral circumscribed around an incircle satisfies a different identity. The two tangent segments starting at each vertex have equal lengths. Label the four tangent lengths by vertex. The sum of either pair of opposite sides counts each of these lengths once, so [[pitots-theorem|Pitot's theorem]] gives $AB+CD=BC+DA$. For $AB=7,BC=9,CD=8$, it gives $DA=6$. Connecting the incenter to the vertices splits the quadrilateral into triangles with common height equal to the inradius, so its area is the inradius times the semiperimeter.

Reflection can also turn an angle condition into a side difference. The [[perp-to-angle-bisector|perpendicular to an internal angle bisector]] through $B$ meets it at $P$. Reflect $B$ in the bisector to $B'$ on ray $AC$. Then $AB'=AB$, and $P$ is the midpoint of $BB'$. If $M$ is the midpoint of $BC$, the segment $PM$ joins two midpoints in $BB'C$. Thus $PM=|AC-AB|/2$, including zero when $B'=C$. In particular, $AB=6$ and $AC=10$ give $PM=2$.`,
      related: [
        { card: "cyclic-quadrilateral", note: String.raw`the angle facts that make four points cyclic (S5.3).` },
        { card: "isosceles-trapezoid", note: String.raw`Ptolemy for a trapezoid, $d^2 = \ell^2 + Bb$ (S6.3).` },
        { card: "inradius-area", note: String.raw`the area of a quadrilateral around a circle, $rs$ (S4.5).` }
      ],
      exercises: [
        { q: String.raw`A quadrilateral inscribed in a circle has sides $3$, $4$, $5$, $6$ in order. What is the product of its diagonals?`, answer: "39",
          solution: String.raw`Ptolemy's theorem pairs the opposite sides, so the diagonal product is $3\cdot5+4\cdot6=39$. The adjacency order determines which sides are opposite.` },
        { q: String.raw`What is the area of a cyclic quadrilateral with sides $3$, $4$, $5$, $6$ in order?`, answer: "6sqrt(10)",
          solution: String.raw`The semiperimeter is nine. Because the quadrilateral is cyclic, its opposite angles are supplementary and Brahmagupta's formula applies. Its area is $\sqrt{(9-3)(9-4)(9-5)(9-6)}=\sqrt{360}=6\sqrt{10}$.` },
        { q: String.raw`Quadrilateral $ABCD$ is tangent to an incircle, with $AB=7$, $BC=9$ and $CD=8$. How long is $DA$?`, answer: "6",
          solution: String.raw`From each vertex, the two tangent segments to the incircle have equal lengths. Summing opposite sides counts each of the four vertex tangent lengths once, so $AB+CD=BC+DA$. Thus $DA=7+8-9=6$.` },
        { q: String.raw`In triangle $ABC$, $AB=6$ and $AC=10$. The perpendicular from $B$ to the internal bisector of angle $A$ meets it at $P$, and $M$ is the midpoint of $BC$. How long is $PM$?`, answer: "2",
          solution: String.raw`Reflect $B$ in the bisector to $B'$ on ray $AC$. Then $AB'=6$ and $P$ is the midpoint of $BB'$. Since $AC=10$, the length $B'C$ is four. The segment $PM$ joins midpoints of two sides of $BB'C$, so its length is $B'C/2=2$.` }
      ],
      problems: [
        "2012 AMC 12A, Problem 16",
        "2013 AMC 10B, Problem 23",
        "2004 AMC 12B, Problem 19",
        "2011 AMC 12A, Problem 24",
        "2014 AMC 12B, Problem 24",
        "2008 AMC 12B, Problem 25"
      ]
    },
    "S9.5": {
      prereq: ["tangent-circles", "tangent-facts", "point-line-distance", "similar-figures-ratios"],
      cards: ["common-tangent-lengths", "tangency-condition", "descartes-circle-theorem", "homothety-monge"],
      body: String.raw`On a common tangent to two distinct circles, each radius to a point of contact is perpendicular to the tangent. Write $d$ for the center distance and $r_1,r_2$ for the radii. The component of the center displacement parallel to the tangent is the distance between the contact points. If the centers are on the same side of the line, its perpendicular component has magnitude $|r_1-r_2|$. If the centers are on opposite sides, that magnitude is $r_1+r_2$. The [[common-tangent-lengths|common tangent segment lengths]] therefore have squares $d^2-(r_1-r_2)^2$ and $d^2-(r_1+r_2)^2$, respectively.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 216" role="img" aria-label="On a same-side common tangent the radii give a difference in height. On a separating tangent they give a sum." style="width:100%;max-width:425px;height:auto"><title>On a same-side common tangent the radii give a difference in height. On a separating tangent they give a sum.</title><path d="M22 134L214 134" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="66" cy="110" r="24" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="162" cy="70" r="64" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M66 134L66 110L162 70L162 134" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M66 110L162 110" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M248 134L406 134" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="279" cy="102" r="32" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="343" cy="150" r="16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M279 134L279 102L343 150L343 134" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M279 102L343 102L343 134" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="66" cy="110" r="2" fill="currentColor" stroke="currentColor"/><circle cx="162" cy="70" r="2" fill="currentColor" stroke="currentColor"/><circle cx="66" cy="134" r="2" fill="currentColor" stroke="currentColor"/><circle cx="162" cy="134" r="2" fill="currentColor" stroke="currentColor"/><circle cx="279" cy="102" r="2" fill="currentColor" stroke="currentColor"/><circle cx="343" cy="150" r="2" fill="currentColor" stroke="currentColor"/><circle cx="279" cy="134" r="2" fill="currentColor" stroke="currentColor"/><circle cx="343" cy="134" r="2" fill="currentColor" stroke="currentColor"/><text x="117" y="198" fill="currentColor" text-anchor="middle" font-size="17">Same side</text><text x="328" y="198" fill="currentColor" text-anchor="middle" font-size="17">Separating</text></svg>

For either type, there are two tangent lines when $d$ exceeds the corresponding perpendicular component. Equality gives a single tangent with coinciding points of contact. If $d$ is smaller, that type has no common tangent. This assumes distinct centers. With radii three and eight at distance thirteen the same-side segment has length twelve. For opposite-side radii four and two at distance ten, the segment has length eight. At external contact, $d=r_1+r_2$, so the same-side segment simplifies to $2\sqrt{r_1r_2}$.

In coordinates, a [[tangency-condition|line tangent to a circle]] has perpendicular distance from the center equal to the radius. The same condition appears as a repeated root if a line equation is substituted into the circle equation. For $y=x+t$ and $x^2+y^2=8$, the distance condition is $|t|/\sqrt2=2\sqrt2$, giving $t=\pm4$.

Two nonparallel same-side tangents meet at a point on the line of centers, because each center lies on the same bisector ray of the tangent lines. The right triangles formed by the tangency radii give distances to the centers in ratio $r_1:r_2$. The scaling about the intersection with factor $r_2/r_1$ takes one circle to the other. This is a [[homothety-monge|homothety]]. The crossing tangents also give a center of scaling when they intersect, with the circles on opposite sides of that point and a negative factor. For equal radii the two same-side tangents are parallel.

[[descartes-circle-theorem|Descartes' circle theorem]] applies to four pairwise tangent circles. Use curvature $k=1/r$ for circles whose disks are disjoint in their interiors. If one circle encloses the other three, assign the enclosing circle curvature $k=-1/r$ and keep the other curvatures positive. The theorem says $(\sum k_i)^2=2\sum k_i^2$. Solving the quadratic in the fourth curvature gives
$$k_4=k_1+k_2+k_3\ pm\ 2\sqrt{k_1k_2+k_2k_3+k_3k_1}.$$
For curvatures $2,2,3$, the two values are $7+8=15$ and $7-8=-1$. The gap circle has radius $1/15$, and the enclosing circle has radius one. For a direct check, put the two radius-$1/2$ centers at $(\pm1/2,0)$ and the radius-$1/3$ center at $(0,2/3)$. The gap center $(0,4/15)$ is at distances $17/30$ and $2/5$ from the corresponding centers, equal to the sums of the radii.`,
      related: [
        { card: "triangle-of-centers", note: String.raw`joining the centers of touching circles (S5.6).` },
        { card: "quadratic-formula", note: String.raw`a zero discriminant, the double root that means tangency (L3.2).` },
        { card: "tangent-circle-packing", note: String.raw`several touching circles in a figure (S5.6).` }
      ],
      exercises: [
        { q: String.raw`Two circles of radii $3$ and $8$ have centers $13$ apart. How long is the segment between their points of contact with a common tangent that has both centers on the same side?`, answer: "12",
          solution: String.raw`Both contact radii are perpendicular to the tangent and point in the same direction from the centers. The perpendicular displacement between centers is $8-3=5$. The parallel displacement is the sought length, so the Pythagorean theorem gives $\sqrt{13^2-5^2}=12$.` },
        { q: String.raw`Two circles of radii $4$ and $2$ have centers $10$ apart. How long is the segment between their points of contact with a common tangent that separates the centers?`, answer: "8",
          solution: String.raw`Here the two centers lie on opposite sides of the tangent, so their perpendicular separation is $4+2=6$. Combining this with the center distance ten gives parallel displacement $\sqrt{10^2-6^2}=8$.` },
        { q: String.raw`Three circles of radii $1/2$, $1/2$ and $1/3$ touch each other externally. A small circle in the gap touches all three. What is its radius?`, answer: "1/15",
          solution: String.raw`The original curvatures are two, two and three, and Descartes' formula gives $k_4=7\pm2\sqrt{4+6+6}=7\pm8$. The curvature $-1$ belongs to the enclosing circle. The circle in the gap is externally tangent to each disk, so its curvature is positive, fifteen, and its radius is $1/15$.` },
        { q: String.raw`For what positive $t$ is the line $y=x+t$ tangent to the circle $x^2+y^2=8$?`, answer: "4",
          solution: String.raw`Write the line as $x-y+t=0$. Its distance from the center $(0,0)$ is $t/\sqrt2$ because $t$ is positive. A single contact occurs exactly when this equals the radius $2\sqrt2$, giving $t=4$.` }
      ],
      problems: [
        "2001 AMC 12, Problem 18",
        "2002 AMC 12A, Problem 18",
        "2015 AMC 12A, Problem 11",
        "2006 AMC 12A, Problem 19",
        "2007 AMC 12B, Problem 22",
        "2025 AMC 10A, Problem 22"
      ]
    },
    "S9.6": {
      prereq: ["law-of-sines", "inradius-area", "incircle-tangent-lengths"],
      cards: ["orthocenter-properties", "exradii", "orthic-triangle", "euler-distance-theorem"],
      body: String.raw`The [[orthocenter-properties|orthocenter]] $H$ is the intersection of the three altitude lines. Take the circumcenter $O$ as the vector origin, with vertex vectors $\mathbf a,\mathbf b,\mathbf c$ all of length $R$. The point with vector $\mathbf a+\mathbf b+\mathbf c$ lies on the altitude from $A$ because $(\mathbf b+\mathbf c)\cdot(\mathbf b-\mathbf c)=R^2-R^2=0$. The other two altitudes contain it by the same calculation. The centroid has vector $(\mathbf a+\mathbf b+\mathbf c)/3$, so it divides $OH$ in ratio $1:2$ from $O$. These centers lie on the Euler line in a nonequilateral triangle.

If $M$ is the midpoint of $BC$, then $\overrightarrow{AH}=2\overrightarrow{OM}$. The distance $OM$ is $R|\cos A|$ by the right triangle formed by $O,M$ and $B$ and the chord formula $BC=2R\sin A$. Hence $AH=2R|\cos A|$. For $R=5$ and $A=60^\circ$, the distance is five. If $A$ is obtuse the absolute value is essential. Reflecting $H$ across $BC$ gives another point of the circumcircle: modulo $180^\circ$, the directed angle from $HB$ to $HC$ is the negative of $\angle BAC$ by perpendicularity. Reflection reverses that directed angle. The resulting point therefore subtends the same chord angle as $A$. If the triangle is right, $H$ is its right-angle vertex. Reflection in either leg fixes $H$, and reflection in the hypotenuse preserves the circumcircle because the hypotenuse is a diameter.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 352" role="img" aria-label="In an obtuse triangle the orthocenter H is outside the triangle, and its reflection H′ in BC lies on the circumcircle." style="width:100%;max-width:300px;height:auto"><title>In an obtuse triangle the orthocenter H is outside the triangle, and its reflection H′ in BC lies on the circumcircle.</title><circle cx="150" cy="239" r="90" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M150 149L78 185L222 185Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/><path d="M150 41L150 329" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="150" cy="149" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="78" cy="185" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="222" cy="185" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="150" cy="41" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="150" cy="329" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="150" cy="239" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="150" cy="185" r="2.5" fill="currentColor" stroke="currentColor"/><text x="164" y="152" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="67" y="177" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="235" y="177" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="164" y="46" fill="currentColor" text-anchor="middle" font-size="17">H</text><text x="166" y="337" fill="currentColor" text-anchor="middle" font-size="17">H′</text><text x="165" y="244" fill="currentColor" text-anchor="middle" font-size="17">O</text><text x="164" y="203" fill="currentColor" text-anchor="middle" font-size="17">M</text></svg>

The [[orthic-triangle|orthic triangle]] joins the three altitude feet. In an acute triangle, the two feet on $AB$ and $AC$ lie on the circle with diameter $AH$, since their angles between the segments to $A$ and $H$ are right. Thus their separation is $AH\sin A=a\cos A$. Cyclically the other two lengths are $b\cos B$ and $c\cos C$. In a right triangle two altitude feet coincide with the right-angle vertex, so the orthic triangle is degenerate.

The [[exradii|excircle opposite $A$]] touches $BC$ and the extensions of $AB$ and $AC$. Its center $I_A$ lies on the internal bisector at $A$ and the exterior bisectors at the other vertices. The triangle area satisfies $[ABC]=[ABI_A]+[ACI_A]-[BCI_A]$. Taking each side as a base, the three heights are the same exradius $r_a$. Therefore $K=(b+c-a)r_a/2=(s-a)r_a$. A $3$-$4$-$5$ triangle has area six and semiperimeter six, so the exradius across the hypotenuse is six.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294 253" role="img" aria-label="The excircle opposite A touches BC and the extensions of AB and AC. The radii are perpendicular to those three lines." style="width:100%;max-width:294px;height:auto"><title>The excircle opposite A touches BC and the extensions of AB and AC. The radii are perpendicular to those three lines.</title><path d="M46 227L118 227L46 173Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/><path d="M118 227L163 227" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M46 173L46 110" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="154" cy="119" r="108" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M46 119L154 119L154 227" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M154 119L89.2 205.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="46" cy="227" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="118" cy="227" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="46" cy="173" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="154" cy="119" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="89.2" cy="205.4" r="2.5" fill="currentColor" stroke="currentColor"/><text x="32" y="235" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="118" y="247" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="31" y="178" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="171" y="114" fill="currentColor" text-anchor="middle" font-size="17">Iₐ</text></svg>

For the incenter $I$, extend $AI$ to meet the circumcircle again at $D$. Equal angles at $A$ give $DB=DC$. Also $\angle IBD=B/2+A/2$, since $\angle CBD=\angle CAD=A/2$. The exterior angle at $I$ in $AIB$ is $\angle DIB=A/2+B/2$. Thus $DI=DB=2R\sin(A/2)$. From the right triangle with hypotenuse $AI$ and perpendicular leg $r$ to a side, $AI=r/\sin(A/2)$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 325 339" role="img" aria-label="The internal bisector through A and I meets the circumcircle at D, with DI equal to DB." style="width:100%;max-width:325px;height:auto"><title>The internal bisector through A and I meets the circumcircle at D, with DI equal to DB.</title><circle cx="160" cy="169.875" r="138.125" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M126 36L41 240L279 240Z" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.5"/><path d="M126 36L160 308" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M41 240L143 172L160 308L41 240" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="126" cy="36" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="41" cy="240" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="279" cy="240" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="143" cy="172" r="2.5" fill="currentColor" stroke="currentColor"/><circle cx="160" cy="308" r="2.5" fill="currentColor" stroke="currentColor"/><text x="119" y="25" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="29" y="248" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="292" y="248" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="158" y="166" fill="currentColor" text-anchor="middle" font-size="17">I</text><text x="165" y="325" fill="currentColor" text-anchor="middle" font-size="17">D</text></svg>

The power of $I$ with respect to the circumcircle is $OI^2-R^2=-AI\cdot ID=-2Rr$. This proves the [[euler-distance-theorem|incenter–circumcenter distance]] $OI^2=R(R-2r)$. For $R=5$ and $r=2$, $OI=\sqrt5$. In particular $R\ge2r$. Equality forces $O=I$, so all three sides are chords at the same distance from the center. They therefore have the same length, giving an equilateral triangle.`,
      related: [
        { card: "triangle-center-angles", note: String.raw`the angles at the centers, $\angle BHC = 180^\circ - A$ (S5.6).` },
        { card: "centroid-division", note: String.raw`the centroid, which lies on the Euler line (S3.5).` },
        { card: "nine-point-circle", note: String.raw`the circle through the feet of the heights and the midpoints of the sides.` }
      ],
      exercises: [
        { q: String.raw`A triangle has circumradius $5$ and an angle $A=60^\circ$. How far is its orthocenter from vertex $A$?`, answer: "5",
          solution: String.raw`The vector from $A$ to the orthocenter is twice the vector from the circumcenter to the midpoint of the opposite chord. The latter distance is $R|\cos A|=5/2$, so the distance from $A$ to the orthocenter is five.` },
        { q: String.raw`A right triangle has sides $3$, $4$ and $5$. What is the radius of the excircle across the hypotenuse?`, answer: "6",
          solution: String.raw`The legs give area $3\cdot4/2=6$ and the semiperimeter is six. For the excircle opposite side $c=5$, the area relation is $K=(s-c)r_c$. Thus $r_c=6/(6-5)=6$.` },
        { q: String.raw`A triangle has circumradius $5$ and inradius $2$. What is the square of the distance between its circumcenter and incenter?`, answer: "5",
          solution: String.raw`Euler's distance formula gives $OI^2=R(R-2r)$. Substituting the circumradius and inradius gives $5(5-2\cdot2)=5$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 13",
        "2019 AMC 12A, Problem 25",
        "2022 AMC 12A, Problem 25"
      ]
    },
    "S9.7": {
      prereq: ["law-of-sines", "circumradius-area", "projection-formula", "pythagorean-identities", "common-angle-values", "reduction-identities", "stewarts-theorem", "angle-bisector-length", "apollonius-theorem", "cevas-theorem", "medial-triangle", "vivianis-theorem", "area-method", "ptolemys-theorem", "brahmaguptas-formula", "pitots-theorem", "perp-to-angle-bisector", "common-tangent-lengths", "tangency-condition", "descartes-circle-theorem", "homothety-monge", "orthocenter-properties", "exradii", "orthic-triangle", "euler-distance-theorem"],
      cards: [],
      body: String.raw`The [[law-of-sines|law of sines]] measures each side as a chord of the circumcircle. Combine it with the triangle area formula to get the [[circumradius-area|circumradius from the sides and area]]. A [[projection-formula|projection onto a side]] uses signed lengths. The [[common-angle-values|special-angle values]], [[pythagorean-identities|Pythagorean identities]] and [[reduction-identities|identities for supplementary angles]] supply the trigonometric values in these formulas.

For a cevian length, [[stewarts-theorem|Stewart's theorem]] combines two cosine laws. Its special cases give [[apollonius-theorem|median lengths]] and [[angle-bisector-length|internal bisector lengths]]. [[cevas-theorem|Ceva's theorem]] tests concurrence by a product of ratios, and the [[area-method|area method]] explains why the product cancels. The [[medial-triangle|medial triangle]] has one quarter of the original area. [[vivianis-theorem|Viviani's theorem]] uses the subdivision into triangles from an interior point to add the perpendicular distances to the sides.

In a cyclic quadrilateral, [[ptolemys-theorem|Ptolemy]] relates the diagonals to pairs of opposite sides, and [[brahmaguptas-formula|Brahmagupta]] gives area from the sides. For a quadrilateral with an incircle, [[pitots-theorem|Pitot]] counts the equal tangent segments at its vertices. A [[perp-to-angle-bisector|perpendicular to a bisector]] connects a point and its reflection.

For [[common-tangent-lengths|a common tangent]], the perpendicular component of the displacement between centers is a sum or a difference of radii. An individual [[tangency-condition|tangency equation]] can instead set a distance equal to a radius. [[descartes-circle-theorem|Descartes' theorem]] uses signed curvatures for four pairwise tangent circles, and [[homothety-monge|homothety]] relates circles by scaling from the intersection of their tangents.

The [[orthocenter-properties|orthocenter]] lies on the Euler line and its distance to a vertex uses the absolute value of that vertex angle's cosine. The [[orthic-triangle|orthic triangle]] is formed by the altitude feet. The [[exradii|exradii]] follow from triangle areas with a common altitude. The [[euler-distance-theorem|incenter–circumcenter distance]] follows from the power of the incenter.`,
      strategies: [
        String.raw`Use the law of sines to connect chord lengths and angles. When solving for an angle from its sine, test supplementary candidates.`,
        String.raw`For the length of a cevian, use Stewart's theorem, or its median and bisector cases.`,
        String.raw`For four points on a circle, try Ptolemy's theorem on the lengths.`,
        String.raw`Use equal tangent lengths around an incircle and supplementary opposite angles in a cyclic quadrilateral.`,
        String.raw`For a common tangent, slide it along a radius to make a right triangle.`,
        String.raw`Use signed curvatures for four pairwise tangent circles. Use an absolute value for the orthocenter distance at an obtuse angle.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the circumradius of an equilateral triangle with side $6$?`, answer: "2sqrt(3)",
        solution: String.raw`Each angle is $60^\circ$. Viewing each side as a chord gives $6=2R\sin60^\circ=R\sqrt3$, so $R=6/\sqrt3=2\sqrt3$.` },
      { q: String.raw`A cyclic quadrilateral has sides $7$, $15$, $20$, $24$ in that order. What is its area?`, answer: "234",
        solution: String.raw`Its semiperimeter is thirty-three. Brahmagupta's formula gives $K=\sqrt{26\cdot18\cdot13\cdot9}=\sqrt{54756}=234$. The same figure can be formed by joining the $7$-$24$-$25$ and $15$-$20$-$25$ right triangles on opposite sides of their shared hypotenuse, with areas eighty-four and one hundred fifty.` },
      { q: String.raw`A triangle has sides $6$, $8$ and $10$. What is the square of the median to the side of length $6$?`, answer: "73",
        solution: String.raw`By the converse of the Pythagorean theorem, the sides of lengths six and eight are perpendicular legs. The midpoint of the six-unit side is three units from the right-angle vertex. The median connects that midpoint to the opposite vertex, making a right triangle with legs three and eight, so its square is $9+64=73$.` },
      { q: String.raw`Let $A=30^\circ$, $BC=5$ and $CA=5\sqrt3$. There are two possible triangles up to congruence. What is the sum of their possible lengths $AB$?`, answer: "15",
        solution: String.raw`The common ratio of a side to the sine of its opposite angle is ten. Thus $\sin B=\sqrt3/2$, and both $B=60^\circ$ and $B=120^\circ$ leave a positive angle $C$. These give $C=90^\circ$ and $C=30^\circ$, with $AB=10\sin C$ equal to ten and five. The sum is fifteen.` },
      { q: String.raw`In triangle $ABC$, $A=(-2,3)$, $B=(0,0)$ and $C=(4,0)$. What is $AB\cos B+AC\cos C$?`, answer: "4",
        solution: String.raw`The altitude from $A$ lands at $(-2,0)$. The signed projection of $BA$ in the direction $BC$ is $-2$. The signed projection of $CA$ in the direction $CB$ is six. These are the two cosine terms, and they add to four.` },
      { q: String.raw`Internal cevians $AD$, $BE$, $CF$ are concurrent, with $AF/FB=3/2$, $BD/DC=4/3$ and $CA=15$. What is $CE$?`, answer: "5",
        solution: String.raw`The first two ratios multiply to two, so Ceva's theorem gives $CE/EA=1/2$. The segment $CA$ comprises three equal ratio parts, one of which is $CE$. Hence $CE=15/3=5$.` },
      { q: String.raw`Cyclic quadrilateral $ABCD$ has $AB=AD=5$ and $BC=CD=12$. What is $BD$?`, answer: "120/13",
        solution: String.raw`Triangles $ABC$ and $ADC$ are congruent by their three sides. Their angles at $B$ and $D$ are equal and, by cyclicity, supplementary, so each is a right angle. Then $AC=13$. By Ptolemy, $13\cdot BD=5\cdot12+5\cdot12=120$, giving $120/13$.` },
      { q: String.raw`Two circles of radii $6$ and $2$ have centers eight units apart. How many common tangent lines are there?`, answer: "3",
        solution: String.raw`The center distance exceeds the difference of the radii, so two common tangents keep both centers on the same side. The distance equals the sum of the radii, so the two disks touch externally. One additional tangent at their common point separates their centers. There are three tangent lines in all.` },
      { q: String.raw`A triangle has circumradius $9$ and angle $A=120^\circ$. What is the distance from $A$ to the orthocenter?`, answer: "9",
        solution: String.raw`The orthocenter displacement from $A$ is twice the displacement from the circumcenter to the midpoint of $BC$. Its length is $2R|\cos A|$. Since $\cos120^\circ=-1/2$, the distance is $2\cdot9\cdot 1/2=9$.` },
      { q: String.raw`A triangle has circumradius $10$. The distance from its circumcenter to its incenter is $\sqrt{20}$. What is its inradius?`, answer: "4",
        solution: String.raw`Put the squared distance into Euler's formula, $20=10(10-2r)$. Dividing by ten and solving gives $10-2r=2$, hence $r=4$.` }
    ],
    problems: [
      "2021 Spring AMC 12A, Problem 19",
      "2021 Fall AMC 12A, Problem 19",
      "2013 AMC 12B, Problem 24",
      "2024 AMC 12A, Problem 19",
      "2021 Spring AMC 12B, Problem 24"
    ]
  },
  challenge: {
    problems: [
      "2024 AMC 12B, Problem 22",
      "2021 Spring AMC 12A, Problem 24",
      "2003 AIME II, Problem 7",
      "2007 AIME II, Problem 3",
      "2013 AIME II, Problem 8"
    ]
  }
};
