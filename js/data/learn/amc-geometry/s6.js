// Learn, AMC Geometry, chapter S6: polygons and counting in figures (CONVENTIONS §14). Part: Core topics.
// Polygon decompositions, trapezoid sections and precise geometric counting models.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S6"] = {
  lessons: {
    "S6.1": {
      prereq: ["polygon-angle-sums", "equilateral-triangle-facts", "permutations-combinations"],
      cards: [],
      body: String.raw`A useful geometric decomposition can measure a region or count the objects inside it. A regular polygon splits into congruent triangles from its center. A trapezoid's parallel sections vary predictably with height. A grid rectangle is determined by its bounding lines, so its count comes from choices rather than from searching the picture by eye.

For a regular hexagon of side two, the six center triangles are equilateral, each of area $\sqrt3$, giving total area $6\sqrt3$. An octagon has twenty diagonals because each vertex has five nonneighboring partners and every diagonal has two endpoints. A two-by-two grid has nine rectangles whose sides lie along its drawn lines: choose two of the three vertical lines and two of the three horizontal ones.

These calculations depend on what the figure guarantees. Equal angles alone do not make a polygon regular. Equal trapezoid legs imply the usual symmetry only after the unequal bases are specified. A tilted square with lattice-point vertices is a different object from a square bounded by grid lines, and several diagonal pairs can cross at one point. The chapter develops the decompositions and the counting correspondences with these distinctions in place.`,
      exercises: [
        { q: String.raw`What is the area of a regular hexagon with side $2$?`, answer: "6sqrt(3)",
          solution: String.raw`The six center triangles each have two radii and a sixty-degree included angle, so they are equilateral with side two. Their individual areas are $\sqrt3\cdot2^2/4=\sqrt3$. The hexagon area is six times this, $6\sqrt3$.` },
        { q: String.raw`How many diagonals does an octagon have?`, answer: "20",
          solution: String.raw`At each of eight vertices, five other vertices are neither itself nor its two neighbors. This gives $8\cdot5$ endpoint choices, but each diagonal is counted at both of its ends. Dividing by two gives twenty. Equivalently, subtract eight edges from $\binom82=28$ vertex pairs.` },
        { q: String.raw`How many rectangles of any size, with sides along the grid lines, are there in a $2 \times 2$ grid of unit squares?`, answer: "9",
          solution: String.raw`There are three vertical and three horizontal grid lines. Choosing two of each determines exactly one rectangle with sides along those lines, and its sides recover the choices uniquely. Thus there are $\binom32^2=3\cdot3=9$ rectangles, including squares. Tilted shapes formed by joining lattice points are outside this model.` }
      ],
      problems: [
        "2015 AMC 8, Problem 2",
        "1998 AJHSME, Problem 4",
        "1997 AJHSME, Problem 17"
      ]
    },
    "S6.2": {
      prereq: ["equilateral-triangle-facts", "special-right-triangles", "polygon-angle-sums", "trig-area"],
      cards: ["regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "golden-ratio-pentagon"],
      body: String.raw`A regular polygon has equal sides and equal interior angles. Its center-to-vertex segments divide it into $n$ congruent isosceles triangles, each with central angle $360^\circ/n$. If the circumradius is $R$ and the side length is $s$, the perpendicular from the center to one side has length $a$, called the apothem. It bisects that side and the corresponding center triangle.

Each triangle has area $sa/2$, so adding over the perimeter $p=ns$ gives the [[regular-polygon-area|regular-polygon area]] $K=ap/2$. The sine area formula gives the same total as

$$K=\frac n2R^2\sin\frac{360^\circ}{n},\qquad R^2=a^2+\left(\frac s2\right)^2.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 425" role="img" aria-label="A regular polygon is divided into congruent center triangles" style="width:100%;max-width:520px;height:auto"><title>A regular polygon is divided into congruent center triangles</title><path d="M260 65L365.547 115.829L391.615 230.04L318.574 321.631L201.426 321.631L128.385 230.04L154.453 115.829Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M260 200L260 65L365.547 115.829Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M260 200L260 65" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L365.547 115.829" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L391.615 230.04" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L318.574 321.631" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L201.426 321.631" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L128.385 230.04" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L154.453 115.829" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M260 200L312.774 90.414" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M309.303 97.622L302.095 94.151L305.566 86.943" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="260" cy="200" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="279" y="224">O</text><text x="328" y="80">s</text><text x="271" y="128">R</text><text x="303" y="145">a</text><text x="260" y="385">K = n · sa/2 = ap/2.</text><text x="260" y="412">The apothem a is perpendicular to a side.</text></g></svg>

The right-triangle identity also shows that the annulus between the circumcircle and the incircle has area $\pi(R^2-a^2)=\pi s^2/4$, independent of $n$ when the side is fixed. If only the angles are equal, the center triangles need not be congruent and these regular-polygon formulas cannot be assumed.

For a [[regular-hexagon-area|regular hexagon]], each center angle is sixty degrees. Its isosceles center triangles are therefore equilateral, giving $R=s$, apothem $s\sqrt3/2$ and area $3\sqrt3\,s^2/2$. The three long diagonals are diameters of length $2s$. A short diagonal spans a 120-degree central angle, or two neighboring center triangles, and has length $s\sqrt3$ by the thirty-sixty-ninety ratio. These are the only two diagonal lengths. The triangle on alternate vertices has side $s\sqrt3$ and hence half the hexagon's area. Side four gives hexagon area $24\sqrt3$.

A [[regular-dodecagon|regular dodecagon]] instead has twelve thirty-degree center triangles. Each has area $R^2/4$, so the total is $3R^2$, equal to three for unit circumradius. Its central triangle halves into fifteen-seventy-five-ninety triangles. Using S4's side ratio gives $s=R(\sqrt6-\sqrt2)/2$, or $R=s(\sqrt6+\sqrt2)/2$. Consequently $K=3(2+\sqrt3)s^2$. Its interior angles are 150 degrees, and its chords are $2R\sin(15^\circ k)$ for vertices $k$ steps apart, by S5's chord construction.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 375" role="img" aria-label="Hexagon and dodecagon areas follow from their center fans" style="width:100%;max-width:520px;height:auto"><title>Hexagon and dodecagon areas follow from their center fans</title><path d="M135 80L217.272 127.5L217.272 222.5L135 270L52.728 222.5L52.728 127.5Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M135 175L135 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M135 175L217.272 127.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M135 175L217.272 222.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M135 175L135 270" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M135 175L52.728 222.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M135 175L52.728 127.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="135" cy="175" r="3" fill="currentColor"/><path d="M385 80L432.5 92.728L467.272 127.5L480 175L467.272 222.5L432.5 257.272L385 270L337.5 257.272L302.728 222.5L290 175L302.728 127.5L337.5 92.728Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M385 175L385 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L432.5 92.728" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L467.272 127.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L480 175" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L467.272 222.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L432.5 257.272" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L385 270" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L337.5 257.272" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L302.728 222.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L290 175" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L302.728 127.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M385 175L337.5 92.728" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="385" cy="175" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="135" y="306">Six equilateral triangles</text><text x="385" y="306">Twelve 30° triangles</text><text x="135" y="340">R = s; K = 3√3 s²/2</text><text x="385" y="340">K = 3R²</text></g></svg>

For a [[regular-octagon|regular octagon]], extend four alternating sides. They bound a square, and each removed corner is an isosceles right triangle with hypotenuse $s$ and legs $s/\sqrt2$. The square side is $(1+\sqrt2)s$, while the four removed areas total $s^2$. Therefore

$$K=(1+\sqrt2)^2s^2-s^2=2(1+\sqrt2)s^2.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 405" role="img" aria-label="A regular octagon is a square minus four equal right triangles" style="width:100%;max-width:520px;height:auto"><title>A regular octagon is a square minus four equal right triangles</title><path d="M150 70L367.279 70L367.279 287.279L150 287.279Z" fill="currentColor" fill-opacity=".02" stroke="currentColor" stroke-width="1.5"/><path d="M213.64 70L303.64 70L367.279 133.64L367.279 223.64L303.64 287.279L213.64 287.279L150 223.64L150 133.64Z" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="258.64" y="53">s = 2</text><text x="127" y="101.82">√2</text><text x="391.279" y="178.64">s</text><text x="260" y="341">Outer side (1 + √2)s; four removed corners total s².</text><text x="260" y="378">K = 2(1 + √2)s² = 8 + 8√2.</text></g></svg>

Side two gives area $8+8\sqrt2$. The width across parallel sides is $(1+\sqrt2)s$, twice the apothem. The center-to-side right triangle then gives $R=(s/2)\sqrt{4+2\sqrt2}$. The three diagonal lengths follow from the corresponding central angles: $s\sqrt{2+\sqrt2}$ across ninety degrees, $(1+\sqrt2)s$ across 135 degrees, and $2R$ across 180 degrees. In the corner-cut picture the middle one is also a full vertical width. Equal corner cuts alone give an equiangular octagon; regularity additionally requires the cut edges to equal the remaining square edges.

The [[golden-ratio-pentagon|regular pentagon]] has a different self-similarity. Let its side be $s$ and every diagonal $d$. In pentagon $ABCDE$, triangle $ACD$ has equal legs $AC=AD=d$ and base $CD=s$. Its apex angle is half the seventy-two-degree arc $CD$, hence thirty-six degrees, so its two base angles are seventy-two degrees.

Let diagonal $CE$ meet $AD$ at $T$. It bisects the seventy-two-degree angle at $C$, since the two intercepted side arcs are equal. Triangle $ACT$ has equal thirty-six-degree angles at $A,C$, so $AT=CT$. Triangle $CTD$ has angles thirty-six, seventy-two, seventy-two degrees, so $CT=CD=s$. Thus $AT=s$ and $TD=d-s$. Triangles $ACD$ and $CTD$ are similar in that order, giving

$$\frac ds=\frac{s}{d-s},\qquad d^2=sd+s^2.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 425" role="img" aria-label="A pentagon contains a smaller copy of its golden triangle" style="width:100%;max-width:520px;height:auto"><title>A pentagon contains a smaller copy of its golden triangle</title><path d="M260 75L388.393 168.283L339.351 319.217L180.649 319.217L131.607 168.283Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M260 75L339.351 319.217L180.649 319.217Z" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-width="1.5"/><path d="M339.351 319.217L131.607 168.283" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="210.958" cy="225.935" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="56">A</text><text x="406.393" y="171.283">B</text><text x="351.351" y="342.217">C</text><text x="167.649" y="342.217">D</text><text x="113.607" y="171.283">E</text><text x="193.958" y="232.935">T</text><text x="317" y="183">d</text><text x="260" y="343">s</text><text x="231" y="144">s</text><text x="281" y="300">s</text><text x="224" y="286">d − s</text><text x="260" y="386">CT = AT = CD = s; TD = d − s.</text><text x="260" y="413">Similarity gives d/s = s/(d − s).</text></g></svg>

The positive ratio is $d/s=\varphi=(1+\sqrt5)/2$, with $\varphi^2=\varphi+1$ and $1/\varphi=\varphi-1$. This proof uses similarity already established in the book; it does not require Ptolemy's later theorem. Symmetry gives an end piece $d-s$ at each end of a pentagram diagonal, leaving inner-pentagon side $d-2(d-s)=2s-d=s/\varphi^2$. Altitudes in the isosceles triangles also give $\cos36^\circ=d/(2s)=\varphi/2$ and $\cos72^\circ=s/(2d)=1/(2\varphi)$. Equal sides without equal angles would not justify the equal diagonals or these ratios.`,
      related: [
        { card: "circular-segment", note: String.raw`the regions between a regular polygon and its circle (S2.4).` },
        { card: "equiangular-polygon", note: String.raw`polygons with equal angles but unequal sides (S2.2).` },
        { card: "regular-octahedron", note: String.raw`regular hexagons and squares as cross sections of solids (S8.4).` }
      ],
      exercises: [
        { q: String.raw`What is the area of a regular hexagon with side $4$?`, answer: "24sqrt(3)",
          solution: String.raw`A regular hexagon splits into six equilateral triangles of side four. Each has area $\sqrt3\cdot4^2/4=4\sqrt3$, so the total is $24\sqrt3$. The regularity makes the center triangles equilateral; an arbitrary equiangular hexagon would require its side data as well.` },
        { q: String.raw`What is the area of a regular octagon with side $2$?`, answer: "8+8sqrt(2)",
          solution: String.raw`Complete the octagon to a square by restoring its four equal corner triangles. Their hypotenuses are two and their legs $\sqrt2$, so the surrounding square has side $2+2\sqrt2$ and area $12+8\sqrt2$. Each removed corner has area one. Subtracting four gives $8+8\sqrt2$.` },
        { q: String.raw`A regular dodecagon is inscribed in a circle of radius $1$. What is its area?`, answer: "3",
          solution: String.raw`The twelve center triangles have two radius-one sides with a thirty-degree included angle. The sine area formula gives each area $\tfrac12\sin30^\circ=1/4$. Their interiors are disjoint and cover the dodecagon, so the total area is three.` },
        { q: String.raw`A regular pentagon has side $1$. How long is each diagonal?`, answer: "(1+sqrt(5))/2",
          solution: String.raw`Let the common diagonal length be $d$, and use regular pentagon $ABCDE$. In the thirty-six-seventy-two-seventy-two triangle $ACD$, diagonal $CE$ meets $AD$ at $T$ and bisects the angle at $C$. The resulting isosceles triangles give $CT=AT=CD=1$, leaving $TD=d-1$. Similarity of $ACD$ and $CTD$ gives $d/1=1/(d-1)$, hence $d^2=d+1$. The positive length is $(1+\sqrt5)/2$; the other algebraic root is negative. This derivation uses similarity rather than a later Ptolemy theorem.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 17",
        "2001 AMC 10, Problem 20",
        "2011 AMC 10B, Problem 16",
        "2014 AMC 10A, Problem 12",
        "2013 AMC 10B, Problem 15",
        "2012 AMC 10A, Problem 18",
        "2003 AMC 10B, Problem 23",
        "2006 AMC 12B, Problem 16",
        "2015 AMC 10B, Problem 22",
        "2016 AMC 10B, Problem 23",
        "2020 AMC 12A, Problem 14"
      ]
    },
    "S6.3": {
      prereq: ["trapezoid-parallelogram-areas", "triangle-similarity", "pythagorean-theorem"],
      cards: ["trapezoid-special-segments", "isosceles-trapezoid"],
      body: String.raw`Parallel sections of a convex trapezoid have a linear dependence on height. Write its shorter base as $a$ and longer base as $b$, with $0\lt a\lt b$, and height $h$. If a section lies a fraction $t$ of the height down from the shorter base, similarity along the extended legs gives its length $x=a+(b-a)t$. The same relation follows by averaging the horizontal coordinates of the two leg points at that height, so an asymmetric trapezoid obeys it too.

At $t=1/2$ the section joins the leg midpoints and has length $(a+b)/2$. The diagonals select a different fraction. Their two base triangles are similar, with length ratio $a:b$, so each diagonal is divided in that ratio and their intersection $P$ is at height fraction $a/(a+b)$ below the short base. Substituting in the section relation gives $x=2ab/(a+b)$.

There is also a direct explanation of the two halves of this [[trapezoid-special-segments|special section]]. Take shorter base $AB=a$, longer base $DC=b$, and section $XPY$ through the diagonal crossing. In triangle $ADC$, $XP$ is parallel to $DC$ with scale $AP/AC=a/(a+b)$, so $XP=ab/(a+b)$. The other side is equal by the corresponding similarity. Thus $P$ bisects the section even when the trapezoid has no reflection symmetry.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 420" role="img" aria-label="Similar diagonal triangles locate the harmonic-mean section" style="width:100%;max-width:520px;height:auto"><title>Similar diagonal triangles locate the harmonic-mean section</title><path d="M180 100L300 100L360 300L80 300Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M180 100L300 100L234 160Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M80 300L360 300L234 160Z" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-width="1.5"/><path d="M180 100L360 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M300 100L80 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M150 160L318 160" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="234" cy="160" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="167" y="90">A</text><text x="313" y="90">B</text><text x="378" y="318">C</text><text x="62" y="318">D</text><text x="235" y="143">P</text><text x="133" y="165">X</text><text x="335" y="165">Y</text><text x="240" y="82">6</text><text x="220" y="325">14</text><text x="190" y="148">21/5</text><text x="283" y="148">21/5</text><text x="260" y="369">XY = 42/5; AP:PC = 3:7.</text><text x="260" y="396">The two base-triangle areas are in ratio 9:49.</text></g></svg>

For bases six and fourteen, the full section is $42/5$. The base triangles have length ratio $3:7$ and area ratio $9:49$. They do not occupy the whole trapezoid: the two lateral triangles must also be included in an area sum. Joining the midpoints of the diagonals produces yet another segment, parallel to the bases with length $(b-a)/2$. In coordinates with bases $(u,h),(u+a,h)$ and $(0,0),(b,0)$, their midpoint first coordinates differ by $(b-a)/2$, proving the claim. The leg-midpoint section has the average length instead, so the two midpoint constructions cannot be interchanged.

Two other conditions select parallel sections. Extending the legs to their common apex makes the triangles on bases $a,x,b$ similar. The upper and lower trapezoids are similar precisely when $a/x=x/b$, giving $x=\sqrt{ab}$. Sufficiency follows too: scaling from that apex sends the two boundary levels of the upper piece to those of the lower piece when $x^2=ab$.

For an equal-area split, the area above the section is proportional to $x^2-a^2$ and the area below to $b^2-x^2$. Their equality gives $x=\sqrt{(a^2+b^2)/2}$. The same result follows without extending the legs: the upper piece has height $h(x-a)/(b-a)$ and average base $(a+x)/2$, hence area $h(x^2-a^2)/(2(b-a))$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" role="img" aria-label="Four different geometric conditions select four parallel sections" style="width:100%;max-width:520px;height:auto"><title>Four different geometric conditions select four parallel sections</title><path d="M180 70L300 70L360 430L80 430Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M150 178L318 178" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="435" y="183">H = 42/5</text></g><path d="M140.436 212.432L323.739 212.432" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="435" y="217.432">G = 2√21</text></g><path d="M130 250L330 250" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="435" y="255">A = 10</text></g><path d="M120.371 284.665L335.777 284.665" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="435" y="289.665">Q = 2√29</text></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="240" y="51">6</text><text x="220" y="455">14</text><text x="260" y="494">From the short base: H ≤ G ≤ A ≤ Q.</text></g></svg>

The four lengths are the harmonic, geometric, arithmetic and quadratic means. They satisfy

$$\frac{2ab}{a+b}\lt\sqrt{ab}\lt\frac{a+b}{2}\lt\sqrt{\frac{a^2+b^2}{2}}\quad(a\ne b).$$

The first two comparisons reduce to $2\sqrt{ab}\lt a+b$, which is $(\sqrt a-\sqrt b)^2>0$; the last reduces to $(a-b)^2>0$. Section width increases from $a$ to $b$, so their order as lengths is also their order down the height. Equal bases would make a parallelogram, where every parallel section has the same width and its length alone cannot locate a particular cut.

For an [[isosceles-trapezoid|isosceles trapezoid]] with longer base $B>b$ and equal legs $\ell$, the unequal bases make the usual symmetry a consequence rather than an extra assumption. Put the long base from zero to $B$ and the short one from $u$ to $u+b$ at height $h$. Equal leg squares give $u^2+h^2=(B-u-b)^2+h^2$, so $u=(B-b)/2$. The two end right triangles are therefore congruent, with horizontal legs $(B-b)/2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="An isosceles trapezoid reduces to two right triangles" style="width:100%;max-width:520px;height:auto"><title>An isosceles trapezoid reduces to two right triangles</title><path d="M200 130L320 130L410 250L110 250Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M200 130L200 250" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M320 130L320 250" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M200 130L410 250" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M260 70L260 285" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M200 242L208 242L208 250" fill="none" stroke="currentColor" stroke-width="1"/><path d="M445 130L445 250" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="286" y="111">4</text><text x="154" y="275">3</text><text x="285" y="275">4</text><text x="366" y="275">3</text><text x="144" y="189">5</text><text x="370" y="180">5</text><text x="284" y="204">√65</text><text x="475" y="197">h = 4</text><text x="260" y="344">d² = h² + ((10 + 4)/2)² = 65.</text><text x="260" y="373">Equal legs and unequal bases force the symmetry.</text></g></svg>

It follows that $h^2=\ell^2-((B-b)/2)^2$. A diagonal spans horizontal distance $(B+b)/2$, so its square is $h^2+((B+b)/2)^2=\ell^2+Bb$. This derives the diagonal formula directly, without relying on a later cyclic-quadrilateral length theorem. Bases ten and four with legs five give height four, area 28 and diagonal $\sqrt{65}$. Existence requires $2\ell>B-b$; equality would flatten the trapezoid. Reflection gives equal base angles and equal diagonals, and the parallel-leg angle supplement then proves the opposite angles supplementary, placing the four vertices on a circle.`,
      related: [
        { card: "extend-sides-to-meet", note: String.raw`extending the legs to complete a triangle (S4.3).` },
        { card: "midsegment-theorem", note: String.raw`the triangle's midsegment, of which the trapezoid's is a relative (S3.3).` },
        { card: "ptolemys-theorem", note: String.raw`the diagonal of an isosceles trapezoid, as a cyclic quadrilateral (S9.4).` }
      ],
      exercises: [
        { q: String.raw`A convex trapezoid has parallel sides $6$ and $14$. How long is the segment parallel to them through the point where the diagonals cross, with its ends on the legs?`, answer: "42/5",
          solution: String.raw`The similar base triangles divide each diagonal in the ratio $6:14$. On each side of their intersection the parallel section has length $6\cdot14/(6+14)=21/5$ by a triangle similarity. Adding the two equal pieces gives $42/5$. The unequal bases and convexity ensure the crossing and the section lie inside the trapezoid.` },
        { q: String.raw`In a convex trapezoid with parallel bases six and fourteen, what is the ratio of the area of the triangle formed by the shorter base and the two diagonals to that of the triangle formed by the longer base and the diagonals?`, answer: "9/49",
          solution: String.raw`The two base triangles have equal vertical angles at the diagonal crossing and corresponding alternate angles from the parallel bases. They are therefore similar with short-to-long length ratio $6/14=3/7$. Areas scale as the square of that ratio, so the requested ratio is $9/49$. It compares the two base triangles rather than the entire trapezoid pieces.` },
        { q: String.raw`An isosceles trapezoid has bases $10$ and $4$ and legs $5$. How long is each diagonal?`, answer: "sqrt(65)",
          solution: String.raw`Equal legs and unequal bases put the shorter base centrally over the longer one. Dropping its endpoint heights leaves horizontal offsets $(10-4)/2=3$. Pythagoras with leg five gives height four. A diagonal spans horizontal distance $3+4=7$ and vertical distance four, so its length is $\sqrt{7^2+4^2}=\sqrt{65}$.` }
      ],
      problems: [
        "1999 AMC 8, Problem 14",
        "2005 AMC 10B, Problem 23",
        "2009 AMC 10B, Problem 24",
        "2022 AMC 10A, Problem 23",
        "2021 Fall AMC 12A, Problem 21"
      ]
    },
    "S6.4": {
      prereq: ["permutations-combinations", "casework-method"],
      cards: ["plane-regions", "handshakes-diagonals", "counting-shapes", "zonogon-minkowski", "rectangles-in-grid"],
      body: String.raw`A counting model begins by specifying what determines one object. Among $n$ distinct points, choosing two gives a segment. In a convex $n$-gon, removing its $n$ sides from the $\binom n2$ vertex pairs gives $n(n-3)/2$ diagonals. Choosing three gives a triangle only when the points are noncollinear. For eight points on a circle, every triple is noncollinear because a line meets the circle at most twice, so there are $\binom83=56$ triangles.

The [[handshakes-diagonals|same unordered-pair count]] gives handshakes and round-robin games: endpoints determine a pair, with no order and no repeated meeting. Four vertices of a convex polygon determine exactly one intersecting diagonal pair, namely the diagonals of their quadrilateral. Thus $\binom n4$ counts crossing pairs. It counts distinct crossing points only if no three diagonals concur. The three long diagonals of a regular hexagon create three pairs but only one central point. If $m$ diagonals share a point, their $\binom m2$ pairs contribute one point there, provided each pair really crosses internally.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="Three crossing diagonal pairs can share a single intersection point" style="width:100%;max-width:520px;height:auto"><title>Three crossing diagonal pairs can share a single intersection point</title><path d="M260 65L368.253 127.5L368.253 252.5L260 315L151.747 252.5L151.747 127.5Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M260 65L260 315" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M368.253 127.5L151.747 252.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M368.253 252.5L151.747 127.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="260" cy="190" r="3" fill="currentColor"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="276" y="225">P</text><text x="260" y="348">Three pairs of long diagonals share one point.</text><text x="260" y="375">Pair counts and distinct-point counts can differ.</text></g></svg>

For a complete rectangular grid of $m$ columns and $n$ rows of unit cells, an axis-aligned rectangle is fixed by two of the $m+1$ vertical lines and two of the $n+1$ horizontal lines. Every such choice gives exactly one rectangle, and its four boundary lines recover that choice. Consequently the [[rectangles-in-grid|rectangle count]] is $\binom{m+1}2\binom{n+1}2$, equal to sixty in a three-by-four grid. The same choice does not count a shape whose boundary includes a missing grid segment.

A square imposes equal horizontal and vertical spans. A side-$k$ square has $(m-k+1)(n-k+1)$ possible lower-left corners, so summing over $1\le k\le\min(m,n)$ counts all sizes. The four-by-four grid gives $16+9+4+1=30$. More generally, axis-aligned rectangles containing the cell in column $i$, row $j$ have $i$ left-boundary choices, $m-i+1$ right choices, $j$ bottom choices and $n-j+1$ top choices, giving their product. Cells are counted from the lower left, starting at one.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-label="Grid-line sides and arbitrary lattice vertices describe different shape counts" style="width:100%;max-width:520px;height:auto"><title>Grid-line sides and arbitrary lattice vertices describe different shape counts</title><path d="M60 90L60 230" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M60 90L200 90" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="60" cy="90" r="3" fill="currentColor"/><circle cx="60" cy="160" r="3" fill="currentColor"/><circle cx="60" cy="230" r="3" fill="currentColor"/><path d="M130 90L130 230" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M60 160L200 160" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="130" cy="90" r="3" fill="currentColor"/><circle cx="130" cy="160" r="3" fill="currentColor"/><circle cx="130" cy="230" r="3" fill="currentColor"/><path d="M200 90L200 230" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M60 230L200 230" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="200" cy="90" r="3" fill="currentColor"/><circle cx="200" cy="160" r="3" fill="currentColor"/><circle cx="200" cy="230" r="3" fill="currentColor"/><path d="M310 90L310 230" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 90L450 90" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="310" cy="90" r="3" fill="currentColor"/><circle cx="310" cy="160" r="3" fill="currentColor"/><circle cx="310" cy="230" r="3" fill="currentColor"/><path d="M380 90L380 230" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 160L450 160" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="380" cy="90" r="3" fill="currentColor"/><circle cx="380" cy="160" r="3" fill="currentColor"/><circle cx="380" cy="230" r="3" fill="currentColor"/><path d="M450 90L450 230" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><path d="M310 230L450 230" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="450" cy="90" r="3" fill="currentColor"/><circle cx="450" cy="160" r="3" fill="currentColor"/><circle cx="450" cy="230" r="3" fill="currentColor"/><path d="M60 90L200 90L200 160L60 160Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><path d="M380 90L450 160L380 230L310 160Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="130" y="279">Grid sides: 9 rectangles</text><text x="380" y="279">An extra tilted square</text><text x="260" y="328">The tilted square joins lattice points,</text><text x="260" y="354">but its sides are not drawn grid segments.</text></g></svg>

If arbitrary lattice-point vertices are allowed, tilted squares must be added. A tilted square has a unique side direction $(a,b)$ with positive integers $a,b$ in the first quadrant. Turning this side a quarter turn gives $(-b,a)$. Its axis-aligned bounding box has width and height $a+b$, so on an $N$-by-$N$ cell grid it has $(N-a-b+1)^2$ positions when $a+b\le N$. The unique first-quadrant direction and bounding-box corner prevent double counting. In a four-by-four grid the tilted contributions are $9$ for $(1,1)$, eight from $(1,2),(2,1)$ and three from $(1,3),(2,2),(3,1)$: twenty extra, or fifty squares in all.

This is the purpose of [[counting-shapes|organizing a shape count]] by size, direction or defining lines. If the question asks for noncongruent triangles, repeated placements with the same three side lengths count only once by SSS. If it asks for drawn triangles, every proposed boundary must be present. A line containing $k$ marked points contributes $\binom k3$ collinear triples to remove from an unrestricted triangle count. Each degenerate triple determines its one line, so distinct maximal lines do not cause duplicate subtraction.

Counting regions is an insertion problem. For $n$ lines, a new line meeting the previous arrangement at $k$ distinct points is cut into $k+1$ pieces. Each splits one old region, since regions of a line arrangement are convex intersections of half-planes. The $j$th line has at most $j-1$ such points, so the [[plane-regions|maximum line-region count]] is

$$1+1+2+\cdots+n=1+\frac{n(n+1)}2.$$

No parallel pair and no triple concurrence attain the bound. Such arrangements exist for every $n$; for example the lines $y=jx+j^2$, with distinct positive integers $j$, have different slopes, and the crossing of lines $i,j$ lies on a third line $k$ only if $(k-i)(k-j)=0$. Five lines therefore attain sixteen regions. Concurrency changes the count: three lines through one point make six regions, rather than the general-position seven.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" role="img" aria-label="Three general-position lines make seven regions but concurrency makes six" style="width:100%;max-width:520px;height:auto"><title>Three general-position lines make seven regions but concurrency makes six</title><path d="M30 60L250 60L250 310L30 310Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M270 60L490 60L490 310L270 310Z" fill="currentColor" fill-opacity=".0" stroke="currentColor" stroke-width="1.5"/><path d="M30 277.778L250 82.222" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M30 220L250 220" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M32.857 60L247.143 310" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M270 190L490 190" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M270 80L490 300" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M270 300L490 80" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="140" y="35">Three distinct crossings</text><text x="380" y="35">One triple crossing</text><text x="140" y="348">7 regions</text><text x="380" y="348">6 regions</text><text x="260" y="377">Count distinct cuts along each newly added line.</text></g></svg>

For an arbitrary arrangement of distinct lines, the exact count is $1+n+\sum_P(m_P-1)$, where $m_P$ is the number of lines through an intersection point $P$. At that point the second through the $m_P$th inserted lines each gain one distinct cut, so its contribution is $m_P-1$, rather than $\binom{m_P}2$. Parallel pairs contribute no point. This explains both the maximum and its concurrency corrections.

For circles, the first makes two regions. When every pair crosses twice and no three share a point, the $j$th circle has $2(j-1)$ distinct crossings and that many arcs. The old circle network is connected, and each arc adds a region. Summing gives $2+n(n-1)$ for $n\ge1$, hence fourteen for four circles. The bound is attainable: equal-radius circles with sufficiently close centers all cross pairwise, and small perturbations avoid triple intersections without losing those crossings.

Arbitrary mixtures need more care because a new curve can join previously separate boundary components. Two disjoint disks make three regions. A line through both centers produces four interior half-disks and two exterior regions, six altogether, even though the line has four circle crossings. Counting its five pieces as five new regions would be wrong. The simple insertion formulas above use the connected or line-only arrangement conditions that justify each split.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" role="img" aria-label="A line joining two separated circle boundaries needs a component correction" style="width:100%;max-width:520px;height:auto"><title>A line joining two separated circle boundaries needs a component correction</title><circle cx="180" cy="170" r="65" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><circle cx="340" cy="170" r="65" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/><path d="M50 170L470 170" fill="none" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="180" y="141">1</text><text x="180" y="211">2</text><text x="340" y="141">3</text><text x="340" y="211">4</text><text x="260" y="71">5</text><text x="260" y="269">6</text><text x="260" y="315">Four disk halves and two exterior regions: 6 in total.</text></g></svg>

Independent choices also describe a region swept by moving points. Let each point move independently along a fixed segment, and add their displacement vectors. Two nonparallel motions produce a parallelogram; three nonparallel directions can produce a hexagon. In general the [[zonogon-minkowski|sum of the segments]] is a convex polygon called a zonogon, provided at least two nonzero generators are nonparallel. Convexity follows because interpolating every slider between two allowed choices keeps every coefficient in its allowed interval. Replacing every coefficient $t_i$ by $1-t_i$ reflects the region in the point halfway along the sum of the generators, so the region is centrally symmetric.

To find a boundary in a chosen direction, put each slider at the endpoint farthest in that direction. Independence makes these individual choices maximize their sum. As the direction turns, one slider becomes free exactly when its segment is perpendicular to that direction; it then traces a boundary side of its full length. Every generator is used once in each direction around the boundary, with parallel ones merging into longer sides. Thus the perimeter is twice the sum of the generator lengths. If all generators are parallel the result is a segment, and an ordinary polygon perimeter requires a separate convention.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 450" role="img" aria-label="A sum of three segments tiles into three parallelograms" style="width:100%;max-width:520px;height:auto"><title>A sum of three segments tiles into three parallelograms</title><path d="M250 330L350 330L350 280L250 280Z" fill="currentColor" fill-opacity=".04" stroke="currentColor" stroke-width="1.5"/><path d="M250 280L350 280L200 80L100 80Z" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1.5"/><path d="M250 330L250 280L100 80L100 130Z" fill="currentColor" fill-opacity=".17" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="295" y="314">2</text><text x="223" y="196">8</text><text x="158" y="226">3</text><text x="300" y="353">length 2</text><text x="400" y="305">length 1</text><text x="280" y="142">length 5</text><text x="260" y="402">Area 2 + 8 + 3 = 13.</text><text x="260" y="430">Each generator appears twice on the boundary: P = 16.</text></g></svg>

Area has a related decomposition. Adding a segment of length $L$ to a convex region lengthens every slice parallel to it by $L$, over the region's perpendicular width. The added area is therefore $L$ times that width, as can also be seen by cutting the added strip into trapezoids. For a sum of earlier segments, the perpendicular width is the sum of their individual projection lengths. Inductively the total area is the sum of the parallelogram areas from all unordered generator pairs. For coordinate vectors $(x_i,y_i)$ these areas are $|x_i y_j-y_i x_j|$: for a nonzero first vector, divide that expression by its length to obtain the second vector's perpendicular height, then multiply back by the base length. Zero generators contribute no area.

For generators $(2,0)$, $(0,1)$ and $(-3,4)$, the lengths are two, one and five, so the perimeter is sixteen. Their three parallelogram areas are two, eight and three, giving total area thirteen, as the tiling shows. The coefficients must vary independently; imposing a relation among sliders can reduce the reachable set and invalidate this boundary and area calculation.`,
      related: [
        { card: "permutations-combinations", note: String.raw`the choices behind every count of segments and triangles (R1.4).` },
        { card: "pie", note: String.raw`removing shapes that do not fit, or overlaps (R3.5).` },
        { card: "moser-circle", note: String.raw`regions inside a circle cut by its chords (S10.6).` }
      ],
      exercises: [
        { q: String.raw`What is the largest number of regions into which $5$ lines can cut the plane?`, answer: "16",
          solution: String.raw`The first line adds one region, the second at most two, and so on: the fifth can meet the four earlier lines at four distinct points and is then cut into five pieces. Thus the upper bound is $1+1+2+3+4+5=16$. Choosing five lines with different slopes and no triple intersection attains every increment, so sixteen is the maximum.` },
        { q: String.raw`What is the largest number of regions into which $4$ circles can cut the plane?`, answer: "14",
          solution: String.raw`Start with one circle, giving two regions. Arrange every pair to cross twice with no triple intersection; then the second, third and fourth circles have respectively two, four and six distinct crossings and add that many regions. The total is $2+2+4+6=14$. Equal-radius circles with close centers and a small generic perturbation attain this arrangement, so the upper bound is achievable.` },
        { q: String.raw`How many rectangles with sides along the grid lines are there in a $3 \times 4$ grid of unit squares?`, answer: "60",
          solution: String.raw`The grid has four horizontal and five vertical boundary lines. Choose two horizontal lines in $\binom42=6$ ways and two vertical lines in $\binom52=10$ ways. Every pair of choices bounds one allowed rectangle, giving $6\cdot10=60$. This counts all sizes, including squares, with sides along the grid.` },
        { q: String.raw`How many squares of any size, with sides along the grid lines, are there in a $4 \times 4$ grid of unit squares?`, answer: "30",
          solution: String.raw`A side-$k$ square has $5-k$ possible horizontal and vertical positions, giving $(5-k)^2$ placements. For $k=1,2,3,4$, these are sixteen, nine, four and one. Their sum is thirty. The stated grid-side restriction excludes tilted lattice squares.` },
        { q: String.raw`How many triangles have their three corners among $8$ distinct points on a circle?`, answer: "56",
          solution: String.raw`A line can meet a nondegenerate circle in at most two points, so no three of the eight distinct marked points are collinear. Every unordered choice of three therefore gives one positive-area triangle. The count is $\binom83=8\cdot7\cdot6/(3\cdot2\cdot1)=56$. Different placements count separately even if some triangles are congruent.` }
      ],
      problems: [
        "2001 AMC 8, Problem 23",
        "2009 AMC 8, Problem 20",
        "2011 AMC 8, Problem 19",
        "2012 AMC 8, Problem 14",
        "2024 AMC 10A, Problem 6",
        "2002 AMC 10B, Problem 18",
        "2004 AMC 10A, Problem 16",
        "2011 AMC 12A, Problem 9",
        "2001 AMC 12, Problem 14",
        "2017 AMC 10A, Problem 23",
        "2023 AMC 10B, Problem 24"
      ]
    },
    "S6.5": {
      prereq: ["regular-polygon-area", "regular-hexagon-area", "regular-octagon", "regular-dodecagon", "golden-ratio-pentagon", "trapezoid-special-segments", "isosceles-trapezoid", "plane-regions", "handshakes-diagonals", "counting-shapes", "zonogon-minkowski", "rectangles-in-grid"],
      cards: [],
      body: String.raw`Regular polygons are measured by a center fan whose triangle shapes are fixed by equal angles and equal sides. Apothem and circumradius formulas express the same area in different given lengths. Hexagons reduce to equilateral triangles, octagons to a square with equal corner cuts, and dodecagons to thirty-degree center triangles. Similar triangles inside a pentagon derive the golden ratio before it is used.

A trapezoid's section width varies linearly with height. The leg midpoints, diagonal crossing, similar-piece split and equal-area split therefore select different means of the bases. Diagonal midpoints give the half-difference instead. Equal legs with unequal bases force symmetry, so perpendicular heights supply the isosceles trapezoid's area and diagonal lengths.

Geometric counting depends on the objects being counted. Vertex choices count triangles only after collinearity is excluded. Crossing diagonal pairs need not give different points. Grid-line rectangles, tilted lattice squares and congruence classes use different parameters. Region counts require the intersection and connectedness conditions that make each insertion a true split.

Continuous independent choices produce a sum of segments. Its boundary uses each generator twice and its area decomposes into pairwise parallelograms. As in the discrete counts, the description of the allowed choices comes before the formula.`,
      strategies: [
        String.raw`Cut a regular polygon into triangles from its center.`,
        String.raw`See a hexagon as equilateral triangles and an octagon as a square with its corners removed.`,
        String.raw`In a trapezoid, compare the similar triangles made by the diagonals.`,
        String.raw`Drop heights in an isosceles trapezoid to make two equal right triangles.`,
        String.raw`Count rectangles by choosing their bounding lines, and squares by their size.`,
        String.raw`Count regions by the pieces each new line or circle is cut into.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A regular hexagon is inscribed in a circle of radius $6$. What is its perimeter?`, answer: "36",
        solution: String.raw`The regular hexagon's center angles are sixty degrees, making its six center triangles equilateral. Its side length is therefore the circumradius six. Six such sides give perimeter $6\cdot6=36$.` },
      { q: String.raw`How many diagonals does a convex $12$-sided polygon have?`, answer: "54",
        solution: String.raw`The twelve vertices give $\binom{12}2=66$ unordered pairs. Twelve pairs are polygon sides; every other pair is a diagonal of the convex polygon. Subtracting gives $66-12=54$, equivalently $12(12-3)/2$.` },
      { q: String.raw`How many squares of any size, with sides along the grid lines, are there in a $3 \times 3$ grid of unit squares?`, answer: "14",
        solution: String.raw`A side-one square has nine placements, a side-two square has four, and the whole side-three square has one. These size classes are disjoint and include every square with sides on the grid. The total is $9+4+1=14$.` },
      { q: String.raw`All diagonals of a regular pentagon of side one are drawn. What is the side length of the small central pentagon?`, answer: "(3-sqrt(5))/2",
        solution: String.raw`The outer diagonal is $d=\varphi=(1+\sqrt5)/2$. Similar golden triangles give an end piece $d-1$ at each end of a diagonal, so the middle piece is $d-2(d-1)=2-d=(3-\sqrt5)/2$. These middle pieces form the central pentagon. The value is also $1/\varphi^2$, and is positive because $\varphi\lt2$.` },
      { q: String.raw`A convex trapezoid has parallel bases six and fourteen. A segment parallel to them, with endpoints on its legs, divides its area in half. What is its length?`, answer: "2sqrt(29)",
        solution: String.raw`If the section length is $x$, extending the legs produces similar apex triangles whose areas are proportional to the squares of their bases. The two trapezoid areas are therefore proportional to $x^2-6^2$ and $14^2-x^2$. Equating gives $2x^2=36+196=232$, so the positive length is $\sqrt{116}=2\sqrt{29}$. It lies between six and fourteen, as required.` },
      { q: String.raw`A convex trapezoid has parallel bases six and fourteen. How long is the segment joining the midpoints of its diagonals?`, answer: "4",
        solution: String.raw`Put the long base endpoints at $(0,0),(14,0)$ and the short base at $(u,h),(u+6,h)$. The diagonal midpoints are $((u+14)/2,h/2)$ and $((u+6)/2,h/2)$. They have the same height and horizontal separation $(14-6)/2=4$. The segment joining leg midpoints would instead have length ten.` },
      { q: String.raw`Three distinct circles all pass through the same two points. Into how many regions do their circumferences divide the plane?`, answer: "6",
        solution: String.raw`One circle makes two regions. Each further circle meets the old connected arrangement only at the same two points, which cut it into two arcs; the new arcs each split a region. The totals are two, four and six. Counting each circle pair's two intersections as new distinct points would overcount the shared crossings.` },
      { q: String.raw`How many squares have all four vertices among the lattice points $(i,j)$ with $0\le i,j\le4$, including tilted squares?`, answer: "50",
        solution: String.raw`The axis-aligned sizes contribute $16+9+4+1=30$. Each tilted square has a unique side vector $(a,b)$ with $a,b>0$, and a bounding box of side $a+b$. For $a+b=2$, vector $(1,1)$ gives nine positions. For sum three, $(1,2),(2,1)$ give four each. For sum four, $(1,3),(2,2),(3,1)$ give one each. These exhaust the fitting boxes, so the tilted count is $9+8+3=20$, making fifty in all.` },
      { q: String.raw`A point can be written as $u(3,0)+v(0,2)+w(-1,1)$, where $u,v,w$ vary independently in $[0,1]$. What is the area of the reachable region?`, answer: "11",
        solution: String.raw`The region is the sum of three segments. Its area is the sum of the parallelogram areas of their unordered generator pairs: $|3\cdot2-0\cdot0|=6$, $|3\cdot1-0\cdot(-1)|=3$ and $|0\cdot1-2\cdot(-1)|=2$. Thus the total is eleven. Independence is needed for the whole zonogon to be reachable.` },
      { q: String.raw`A four-column, five-row grid of unit cells has a marked cell in column two and row three, counted from the lower left. How many rectangles with grid-line sides contain that entire cell?`, answer: "54",
        solution: String.raw`There are two possible left boundaries and three possible right boundaries. The bottom boundary has three choices below the marked cell, and the top boundary three choices above it. These choices are independent and determine the rectangle uniquely, so the count is $2\cdot3\cdot3\cdot3=54$. Boundaries along the marked cell's edges are allowed.` }
    ],
    problems: [
      "2005 AMC 12A, Problem 25",
      "2007 AMC 12A, Problem 20",
      "2008 AMC 10A, Problem 25",
      "2009 AMC 12B, Problem 25",
      "2013 AMC 12B, Problem 16",
      "2023 AMC 10A, Problem 24"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 10B, Problem 25",
      "2019 AMC 12B, Problem 24",
      "2022 AMC 12A, Problem 13",
      "2022 AMC 12B, Problem 25",
      "1997 AIME, Problem 2"
    ]
  }
};
