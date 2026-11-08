// Learn, AMC Geometry, chapter S1: angles, triangles and area (CONVENTIONS §14). Part: Foundations.
// Connected foundations, with geometric proofs, explicit boundary conditions and computed illustrations.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S1"] = {
  lessons: {
    "S1.1": {
      prereq: [],
      cards: [],
      body: String.raw`A geometric figure carries several kinds of information. Angles describe how rays meet, lengths measure distances, and area measures the region enclosed. A drawing helps keep these relationships visible, but a measured-looking angle or an apparently equal pair of sides is not a hypothesis. An equality must be given or established by a geometric argument.

The first relationships connect these measurements. A triangle's interior angles total $180^\circ$, so angles of $50^\circ$ and $60^\circ$ leave $70^\circ$. Its side lengths must satisfy strict triangle inequalities: the direct route between two vertices is shorter than a route through a third vertex off that line. Area depends on a base and its perpendicular height, not on a sloping side; a base of ten and height seven give area $\tfrac12\cdot10\cdot7=35$ square units.

A right angle makes lengths especially accessible. For legs six and eight, the square of the hypotenuse is $6^2+8^2=100$, so its length is ten. Dropping a perpendicular often creates the right triangles needed for this calculation while also supplying a height for an area. The chapter develops the angle rules first, then the restrictions and congruence of triangles, before connecting area to these right-triangle constructions. Each diagram records the relationships used in the accompanying reasoning.`,
      exercises: [
        { q: String.raw`Two angles of a triangle measure $50^\circ$ and $60^\circ$. What is the third angle, in degrees?`, answer: "70",
          solution: String.raw`The three interior angles total $180^\circ$, as shown by drawing a parallel through one vertex. Subtracting the two given angles leaves $180^\circ-50^\circ-60^\circ=70^\circ$. This positive remaining angle is the third interior angle, rather than its exterior supplement.` },
        { q: String.raw`A right triangle has legs $6$ and $8$. How long is its hypotenuse?`, answer: "10",
          solution: String.raw`The legs meet at the right angle, so the unknown side is the hypotenuse. The Pythagorean equation is $c^2=6^2+8^2=36+64=100$. A length is positive, giving $c=10$. Substitution checks $6^2+8^2=10^2$.` },
        { q: String.raw`A triangle has a base of $10$ and a height of $7$ to that base. What is its area?`, answer: "35",
          solution: String.raw`The specified height is perpendicular to the line of the chosen base, so the triangle area is $\tfrac12 bh=\tfrac12\cdot10\cdot7=35$. The answer is in square units; multiplying the base by a sloping side instead would not generally give this area.` }
      ],
      problems: [
        "1999 AMC 8, Problem 2",
        "2016 AMC 8, Problem 2",
        "2015 AMC 8, Problem 8"
      ]
    },
    "S1.2": {
      prereq: [],
      cards: ["parallel-exterior-angles", "parallel-by-angle-sum", "angle-chasing", "clock-angle", "trapezoid-consecutive-angles"],
      body: String.raw`An angle is determined by two rays with a common endpoint. In degree measure, one full turn is $360^\circ$, a straight angle is $180^\circ$ and a right angle is $90^\circ$. Adjacent angles whose outside rays form a line therefore add to $180^\circ$. When two lines cross, each of a pair of opposite angles is supplementary to the same adjacent angle, so those opposite, or vertical, angles are equal. These local equalities let an angle calculation pass through an intersection.

A transversal is a line crossing two other lines at distinct points. If those two lines are parallel, corresponding angles occupy matching positions and are equal. Vertical-angle equality then gives equal alternate interior and alternate exterior angles. Adjacent supplements give the other possibility: the interior angles on the same side of the transversal add to $180^\circ$. Thus one $65^\circ$ angle in this configuration determines four angles of $65^\circ$ and four of $115^\circ$ at the two intersections. The reference result on [[parallel-exterior-angles|angles made by parallel lines]] collects these equalities; the position of each angle determines which equality to use.

The implication also works backward, but it must be used as a separate justification. Through a point on one of the lines, draw the unique parallel to the other. Its corresponding and alternate angles have the values just described. If the original line makes that same angle in the same position, it has the same direction and is that parallel. Equivalently, supplementary same-side interior angles give equal alternate angles by subtracting from $180^\circ$. These are the angle conditions for [[parallel-by-angle-sum|proving lines parallel]]. Merely seeing two equal angles elsewhere in the figure does not establish parallelism.

A useful auxiliary line now proves the triangle angle sum. Through vertex $A$ of triangle $ABC$, draw a line parallel to $BC$. The base angles transfer to the two angles beside $\angle A$ along that line, and the three together form a straight angle.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-label="A parallel through a triangle vertex transfers the base angles" style="width:100%;max-width:520px;height:auto"><title>A parallel through a triangle vertex transfers the base angles</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M45 70H480" stroke-dasharray="6 4"/><path d="M95 240L230 70L435 240Z"/><path d="M75 240H480"/><path d="M450 65l7 5-7 5M450 235l7 5-7 5"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="230" y="48">A</text><text x="80" y="260">B</text><text x="447" y="260">C</text><text x="174" y="94">α</text><text x="233" y="112">γ</text><text x="294" y="94">β</text><text x="129" y="226">α</text><text x="390" y="226">β</text><text x="260" y="285">At A, α + γ + β forms a straight angle.</text></g></svg>

Consequently $\angle A+\angle B+\angle C=180^\circ$. Extending one side of the triangle makes an exterior angle supplementary to the interior angle at that vertex. Subtracting that interior angle from the triangle sum shows that the exterior angle equals the sum of the two remote interior angles. If those remote angles are $40^\circ$ and $75^\circ$, the exterior angle is $115^\circ$, and the interior angle beside it is $65^\circ$. In a trapezoid the parallel bases provide another direct application: each leg is a transversal, so its two endpoint interior angles are supplementary. The [[trapezoid-consecutive-angles|consecutive-angle rule]] applies along each leg, not across a diagonal or arbitrarily between the two bases.

An angle chase combines these local rules while keeping track of which rays bound each angle. Suppose $AB=AC$, $\angle BAC=40^\circ$, and $D$ is strictly between $A$ and $C$ with $BD=BC$. Equal sides of an isosceles triangle face equal angles, a fact proved using congruence in S1.3. Thus the base angles of $ABC$ are both $70^\circ$. In triangle $BDC$, the equal sides are $BD$ and $BC$, so the equal angles are the ones at $D$ and $C$, both $70^\circ$. Its angle at $B$ is $40^\circ$. Since ray $BD$ lies inside $\angle ABC$, subtracting gives $\angle ABD=70^\circ-40^\circ=30^\circ$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 385" role="img" aria-label="Two isosceles triangles carry the angle through the figure" style="width:100%;max-width:520px;height:auto"><title>Two isosceles triangles carry the angle through the figure</title><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M260 50L170 297.273L350 297.273Z"/><path d="M170 297.273L307.888 181.571"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="32">A</text><text x="153" y="321">B</text><text x="368" y="321">C</text><text x="327" y="178">D</text><text x="260" y="105">40°</text><text x="222" y="225">30°</text><text x="224" y="283">40°</text><text x="321" y="276">70°</text><text x="305" y="219">70°</text><text x="260" y="351">AB = AC and BD = BC.</text><text x="260" y="375">The 70° angle at B splits into 30° and 40°.</text></g></svg>

Writing the reasons alongside the angle values is what makes [[angle-chasing|angle chasing]] a proof: a straight-angle sum, a parallel transfer, an isosceles equality or a triangle sum justifies each step. Point order matters when adding or subtracting angles. An unknown can be called $x$ and carried through the same equations; an angle need not be determined individually for a sum involving it to be fixed.

The same degree bookkeeping applies when the rays move. On a standard clock the minute hand makes one turn in sixty minutes, so its speed is $6^\circ$ per minute. The hour hand makes one turn in twelve hours, so its speed is $0.5^\circ$ per minute. Measure both clockwise from twelve. At $H$ hours and $M$ minutes, with $H\in\{0,\ldots,11\}$, $0\le M\lt60$ and twelve represented by $H=0$, their positions are $30H+0.5M$ and $6M$. Their absolute difference is $d=|30H-5.5M|$, with $0\le d\lt360^\circ$. The smaller [[clock-angle|clock angle]] is $\min(d,360^\circ-d)$. At $3{:}30$ the positions are $105^\circ$ and $180^\circ$, giving $75^\circ$. At $11{:}50$ they are $355^\circ$ and $300^\circ$, giving $55^\circ$. Treating the hour hand as fixed on its hour mark would lose its continuous motion.`,
      related: [
        { card: "polygon-angle-sums", note: String.raw`the angle sum of any polygon, built from triangles (S2.2).` },
        { card: "inscribed-angle-theorem", note: String.raw`the angle rule for circles that angle chasing uses most (S5.3).` },
        { card: "triangle-similarity", note: String.raw`triangles with equal angles, found by chasing (S3.2).` }
      ],
      exercises: [
        { q: String.raw`A transversal crosses two parallel lines. One of its interior angles is $65^\circ$. What is the other interior angle on the same side of the transversal, in degrees?`, answer: "115",
          solution: String.raw`These are interior angles on the same side of a transversal of parallel lines, so they are supplementary. If the requested angle is $x$, then $65^\circ+x=180^\circ$, giving $x=115^\circ$. Corresponding or alternate angles would instead be equal; identifying the positions determines which rule applies.` },
        { q: String.raw`A triangle has angles of $40^\circ$ and $75^\circ$. What is the exterior angle at its third corner, in degrees?`, answer: "115",
          solution: String.raw`The third interior angle is $180^\circ-40^\circ-75^\circ=65^\circ$. The exterior angle adjacent to it is its supplement, $180^\circ-65^\circ=115^\circ$. Equivalently, the exterior-angle theorem directly gives the sum of the two remote interior angles, $40^\circ+75^\circ=115^\circ$.` },
        { q: String.raw`In triangle $ABC$, $AB = AC$ and $\angle A = 40^\circ$. Point $D$ lies strictly between $A$ and $C$ with $BD = BC$. What is $\angle ABD$, in degrees?`, answer: "30",
          solution: String.raw`Because $AB=AC$, the base angles at $B$ and $C$ are equal and together total $140^\circ$, so each is $70^\circ$. Since $D$ lies strictly between $A$ and $C$, ray $CD$ is ray $CA$, giving $\angle BCD=70^\circ$. In triangle $BDC$, $BD=BC$ makes the opposite angles at $C$ and $D$ equal, so $\angle BDC=70^\circ$ and $\angle DBC=40^\circ$. Ray $BD$ is inside the angle at $B$, hence $\angle ABD=70^\circ-40^\circ=30^\circ$.` },
        { q: String.raw`What is the smaller angle between the hands of a clock at $3{:}30$, in degrees?`, answer: "75",
          solution: String.raw`Measure the hands clockwise from twelve. At thirty minutes, the minute hand is at $6\cdot30=180^\circ$. The hour hand has moved $0.5\cdot30=15^\circ$ past three, so its position is $90^\circ+15^\circ=105^\circ$. Their difference is $75^\circ$; since it is below $180^\circ$, it is already the smaller angle. Keeping the hour hand at $90^\circ$ would ignore its motion.` }
      ],
      problems: [
        "1994 AJHSME, Problem 7",
        "1995 AJHSME, Problem 13",
        "1997 AJHSME, Problem 12",
        "2003 AMC 8, Problem 20",
        "2000 AMC 8, Problem 24",
        "2014 AMC 8, Problem 9",
        "2023 AMC 10B, Problem 7",
        "2007 AMC 10A, Problem 8"
      ]
    },
    "S1.3": {
      prereq: ["parallel-exterior-angles"],
      cards: ["triangle-inequality", "triangle-type-by-sides", "triangle-congruence"],
      body: String.raw`A triangle consists of three noncollinear vertices and their joining segments. Its side lengths are positive, and its interior angles lie strictly between $0^\circ$ and $180^\circ$. These nondegeneracy conditions explain why side restrictions are strict rather than weak inequalities.

For side lengths $a,b,c$, the straight route between two vertices is shorter than the broken route through the third, giving $a\lt b+c$, $b\lt c+a$ and $c\lt a+b$. Conversely, two segments of lengths $a$ and $b$ joined at a hinge have endpoint distance ranging continuously from $|a-b|$ to $a+b$ as the included angle opens from zero to a straight angle. Every distance strictly between the endpoints gives a nondegenerate triangle. Thus the [[triangle-inequality|triangle inequalities]] are both necessary and sufficient. With two sides fixed, the full restriction on the third is

$$|a-b|\lt c\lt a+b.$$

For sides five and nine this gives $4\lt c\lt14$, so an integer third side can be any of $5,\ldots,13$, nine values. Neither endpoint is allowed: equality puts the vertices on one line. With all three positive lengths given, only the largest needs testing against the sum of the other two, since its being largest makes the remaining two inequalities automatic. A perimeter may approach a boundary without attaining it. For example, sides five and nineteen allow the perimeter to approach forty-eight from below; there is no triangle in that family whose perimeter is exactly forty-eight.

The same straight-versus-broken-path argument says that a side of a nondegenerate quadrilateral is shorter than the other three combined. A diagonal can also give two triangle inequalities at once: if it borders triangles with side pairs $(5,9)$ and $(5,17)$, its length $d$ satisfies $4\lt d\lt14$ and $12\lt d\lt22$. The intersection is $12\lt d\lt14$, so an integer diagonal must be thirteen. Obtaining the individual ranges and then intersecting them keeps every restriction in view.

Side lengths also determine whether the largest angle is acute, right or obtuse. The Pythagorean relation, developed in S1.5, gives the right-angle benchmark $c^2=a^2+b^2$. One can see the direction of the comparison by putting the angle being tested at $C$, with $CA=b$ on a horizontal ray. Let the perpendicular projection of $B$ onto line $CA$ have signed coordinate $x$ measured from $C$ toward $A$, and let its perpendicular distance be $h$. Then $BC^2=x^2+h^2=a^2$ and $AB^2=(b-x)^2+h^2=c^2$, so

$$c^2=a^2+b^2-2bx.$$

The angle at $C$ is acute, right or obtuse exactly when $x$ is positive, zero or negative. Hence its opposite side satisfies $c^2\lt a^2+b^2$, $c^2=a^2+b^2$ or $c^2\gt a^2+b^2$, respectively. To classify the entire triangle, apply this [[triangle-type-by-sides|comparison of squares]] to its largest side; no smaller side can face a larger angle. First check that a triangle actually exists: $1,2,4$ does not describe an obtuse triangle even though the largest square exceeds the other two squares.

For $6,7,10$, the triangle inequality holds and $100\gt36+49$, so the triangle is obtuse. When the variable side can become largest, the test must change with it. For an acute triangle with sides $7,10,x$, the triangle inequality gives $3\lt x\lt17$. If $x\le10$, the largest-side test is $100\lt49+x^2$, giving integer $x\ge8$. If $x\gt10$, it is $x^2\lt149$, giving integer $x\le12$. Thus the full list is $8,9,10,11,12$.

Once a triangle exists, enough matching data can fix its shape and size. Two triangles are congruent if one can be moved, rotated or reflected onto the other so that corresponding vertices coincide. The order in $\triangle ABC\cong\triangle DEF$ specifies $A\leftrightarrow D$, $B\leftrightarrow E$, $C\leftrightarrow F$; corresponding parts, rather than whichever parts happen to be drawn nearby, are equal.

The standard [[triangle-congruence|congruence criteria]] describe data that force this match. With three sides (SSS), align one side; the third vertex is an intersection of two circles with fixed radii, whose two possible positions are reflections across that side. With two sides and their included angle (SAS), the angle fixes the second ray and its side length fixes the third vertex. Two angles and their included side (ASA) fix two rays from the side's endpoints and hence their intersection. Two angles and a different corresponding side (AAS) first determine the third angle from $180^\circ$, reducing to ASA. For right triangles, a matching hypotenuse and leg (HL) determine the remaining positive leg by Pythagoras, reducing to SSS. Three matching angles alone determine no size: scaling every side preserves the angles.

Two sides and a nonincluded angle, called SSA, do not guarantee congruence. Fix $\angle A=30^\circ$, $AC=10$ and $BC=6$. The perpendicular distance from $C$ to line $AB$ is five, since it is halfway up a side of length ten at $30^\circ$; S1.5 derives this special-triangle ratio. A circle centered at $C$ with radius six cuts the positive ray $AB$ twice. Either intersection can be $B$, giving different third-side lengths and therefore noncongruent triangles.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-label="SSA can give two triangles with the same given data" style="width:100%;max-width:520px;height:auto"><title>SSA can give two triangles with the same given data</title><circle cx="260.526" cy="176" r="132" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity=".6"/><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M70 286H465M70 286L260.526 176L187.560 286M260.526 176L333.491 286"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="53" y="303">A</text><text x="265" y="156">C</text><text x="187.560" y="309">B₁</text><text x="333.491" y="309">B₂</text><text x="126" y="274">30°</text><text x="260" y="341">AC = 10, BC = 6, ∠A = 30° in both triangles.</text><text x="260" y="363">B₁ and B₂ give different third sides.</text></g></svg>

The counterexample does not say every SSA specification has two solutions: some have none or one. It says SSA alone is not a valid general congruence criterion.

Congruence also turns a visible symmetry into a proof. If $AB=AC$ and $D$ is the midpoint of $BC$, triangles $ABD$ and $ACD$ share $AD$ and have $AB=AC$, $BD=CD$, so they are congruent by SSS. Their angles at $D$ are equal and supplementary, hence both right angles. Their angles at $A$ are equal, so the same segment bisects the apex angle, and the corresponding angles at $B$ and $C$ are equal. This proves the familiar equal-base-angle rule and explains why the median, altitude and angle bisector from the apex of an isosceles triangle coincide.`,
      related: [
        { card: "pythagorean-theorem", note: String.raw`the right-angle case of the comparison of squares (S1.5).` },
        { card: "law-of-cosines", note: String.raw`the exact relation between the sides and any angle (S4.6).` },
        { card: "triangle-similarity", note: String.raw`triangles of the same shape, not size (S3.2).` }
      ],
      exercises: [
        { q: String.raw`A triangle has sides $5$ and $9$, and its third side is a whole number. How many values can the third side take?`, answer: "9",
          solution: String.raw`For a nondegenerate triangle the third side must satisfy $|9-5|\lt c\lt9+5$, or $4\lt c\lt14$. Thus $c$ is one of the integers $5,6,\ldots,13$, giving $13-5+1=9$ possibilities. The strict inequalities exclude the flat configurations at four and fourteen, and the triangle inequality's sufficiency ensures every listed value works.` },
        { q: String.raw`Of the triangles with sides $(5, 6, 7)$, $(5, 12, 13)$ and $(6, 7, 10)$, how many are obtuse?`, answer: "1",
          solution: String.raw`All three triples satisfy the triangle inequality, so angle classification is meaningful. Compare each largest side squared with the other two squares: $7^2=49\lt5^2+6^2=61$ gives an acute triangle; $13^2=169=5^2+12^2$ gives a right triangle; $10^2=100\gt6^2+7^2=85$ gives an obtuse triangle. Exactly one is obtuse.` },
        { q: String.raw`For how many whole numbers $x$ is there an acute triangle with sides $7$, $10$ and $x$?`, answer: "5",
          solution: String.raw`Existence first requires $|10-7|\lt x\lt10+7$, so $3\lt x\lt17$. If $x\le10$, the largest side is ten and acute angles require $100\lt49+x^2$, or $x^2\gt51$, so the integer possibilities in this case are eight, nine and ten. If $x\gt10$, the largest side is $x$, so $x^2\lt149$ leaves eleven and twelve. All five listed values meet the existence restriction, and the two cases cover every possible largest side.` },
        { q: String.raw`In an isosceles triangle $ABC$, $AB=AC$ and $D$ is the midpoint of $BC$. If $\angle BAD=28^\circ$, what is $\angle ADC$, in degrees?`, answer: "90",
          solution: String.raw`Triangles $ABD$ and $ACD$ have $AB=AC$, $BD=CD$ and common side $AD$, so they are congruent by SSS. Correspondence gives $\angle ADB=\angle ADC$. Rays $DB$ and $DC$ are opposite, so those equal angles sum to $180^\circ$, making each $90^\circ$. The given $28^\circ$ is not needed to determine the right angle.` },
        { q: String.raw`Let $A=(0,0)$ and $C=(6,4)$. Point $B$ lies on the positive $x$-axis and satisfies $BC=5$. How many different triangles $ABC$ are possible?`, answer: "2",
          solution: String.raw`Write $B=(x,0)$ with $x>0$. The vertical difference from $C$ is four, so Pythagoras gives $(x-6)^2+4^2=5^2$, hence $(x-6)^2=9$. Both $x=3$ and $x=9$ are allowed. They give triangles with the same $AC$, $BC$ and nonincluded angle at $A$, but different third sides $AB=3$ and $AB=9$. The circle centered at $C$ with radius five has exactly these two intersections with the ray, so the count is two.` }
      ],
      problems: [
        "1992 AJHSME, Problem 17",
        "2005 AMC 8, Problem 15",
        "2006 AMC 8, Problem 19",
        "2023 AMC 10A, Problem 4",
        "2003 AMC 10A, Problem 7",
        "2006 AMC 10B, Problem 10",
        "2017 AMC 10A, Problem 10",
        "2009 AMC 10A, Problem 12"
      ]
    },
    "S1.4": {
      prereq: [],
      cards: ["triangle-area-standard", "area-by-pieces", "joined-shapes-perimeter"],
      body: String.raw`Area measures how much planar region a figure occupies; perimeter measures the length of its boundary. Lengths use linear units, and areas use squared units. A cut may reduce area without changing perimeter, so the two measurements require separate arguments even when they concern the same outline.

For a triangle, choose any side as base, of length $b$, and let $h$ be the perpendicular distance from the opposite vertex to the entire line containing that side. Two congruent copies of the triangle, joined by a half-turn about the midpoint of one of the other two sides, form a parallelogram of base $b$ and height $h$. A parallelogram can be cut and translated into a rectangle with the same base and height, so its area is $bh$. Each copy has half that area, giving the [[triangle-area-standard|base-height formula]]

$$K=\frac12bh.$$

The height is a perpendicular distance, not generally the length of either sloping side. If the triangle has an obtuse angle next to the chosen base, the perpendicular foot is outside the base segment. The containing line still gives the correct height. For $A=(0,0)$, $B=(6,0)$ and $C=(2,5)$, the horizontal base has length six and the height is five, so $K=15$. Moving $C$ horizontally to any other point on $y=5$ leaves the area unchanged.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 285" role="img" aria-label="A triangle height is measured to the base line, even outside the side" style="width:100%;max-width:520px;height:auto"><title>A triangle height is measured to the base line, even outside the side</title><g stroke="currentColor" fill="none" stroke-width="1.5"><path d="M60 195L140 195L100 75Z M290 195L370 195L420 75Z"/><path d="M100 75V195M420 75V195M370 195H444" stroke-dasharray="5 4"/><path d="M100 185H110V195M420 185H430V195"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="100" y="35">Foot inside</text><text x="365" y="35">Foot outside</text><text x="100" y="219">base 4</text><text x="330" y="219">base 4</text><text x="87" y="145">6</text><text x="442" y="145">6</text><text x="260" y="268">Both triangles have area ½ · 4 · 6 = 12.</text></g></svg>

This explains two common area comparisons without needing the sloping sides. Triangles with the same base and the same perpendicular height have equal area, even when the foot of one height lies outside its base. Triangles sharing a height have areas in the ratio of their base lengths, and triangles sharing a base have areas in the ratio of their heights. A diagram should therefore mark the line to which a height is perpendicular, rather than suggesting that every altitude ends on a side segment.

More complicated regions can be assembled from pieces whose interiors do not overlap. Their areas add because no part of the region has been counted twice. Alternatively, subtract missing pieces from a containing rectangle or triangle. This [[area-by-pieces|cut-and-complete method]] gives $8\cdot6-3\cdot2=42$ for an eight-by-six rectangle with a three-by-two corner removed. The dimensions of the removed piece must be known or derived; a shape that merely looks rectangular is not enough.

Perimeter follows the exposed edges instead. Suppose two polygonal regions have disjoint interiors and share boundary segments of total length $L$. Every other boundary segment stays exposed, while each shared segment was counted once in each original perimeter and is now internal to the union. Thus [[joined-shapes-perimeter|the perimeter after joining]] is $P_1+P_2-2L$. Two five-by-five squares sharing a whole side have perimeter $20+20-2\cdot5=30$, agreeing with the resulting ten-by-five rectangle. This formula concerns edge-to-edge joining; overlapping interiors require a new boundary analysis.

Now compare two ways to remove a three-by-two rectangle from an eight-by-six rectangle. At a corner, the cut removes outer boundary lengths three and two and exposes new lengths two and three. The perimeter stays $2(8+6)=28$, although the area drops to forty-two. A notch of width three and depth two made strictly inside one side removes an outer segment of length three but replaces it with lengths two, three and two. Its perimeter increases by four to thirty-two, while its remaining area is still forty-two.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" role="img" aria-label="Equal removed areas can change perimeter differently" style="width:100%;max-width:520px;height:auto"><title>Equal removed areas can change perimeter differently</title><g stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity=".06"><path d="M40 185H200V105H140V65H40Z"/><path d="M300 185H460V65H420V105H360V65H300Z"/></g><g fill="none" stroke="currentColor" stroke-width="1.1" stroke-dasharray="5 4" opacity=".6"><path d="M140 65H200V105M360 65H420"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="120" y="30">Corner removed</text><text x="380" y="30">Side notch removed</text><text x="120" y="210">8</text><text x="380" y="210">8</text><text x="24" y="132">6</text><text x="479" y="132">6</text><text x="170" y="88">3 × 2</text><text x="390" y="88">3 × 2</text><text x="120" y="244">Perimeter 28</text><text x="380" y="244">Perimeter 32</text><text x="260" y="279">Each removes area 6 and leaves area 42.</text></g></svg>

A monotone staircase replacing a rectangular corner has the same endpoint-to-endpoint horizontal and vertical totals as the corner it replaces. That is why such a corner cut can preserve perimeter. An arbitrary right-angled outline need not have the perimeter of its bounding rectangle: inward notches add detours. For an uncertain outline, trace all exposed edges or total the directed horizontal and vertical movements, and distinguish a monotone path from one that doubles back.`,
      related: [
        { card: "shoelace-formula", note: String.raw`the area of any polygon from the coordinates of its corners (S7.4).` },
        { card: "same-base-area-ratio", note: String.raw`comparing triangles with a common base or height (S3.4).` },
        { card: "parallelogram-area", note: String.raw`the base-times-height rule for parallelograms and trapezoids (S2.3).` }
      ],
      exercises: [
        { q: String.raw`What is the area of the triangle with corners $(0, 0)$, $(6, 0)$ and $(2, 5)$?`, answer: "15",
          solution: String.raw`The horizontal side from $(0,0)$ to $(6,0)$ has length six. The perpendicular from $(2,5)$ meets the base at $(2,0)$ and has length five; the other sides need not be found. Thus the area is $\tfrac12\cdot6\cdot5=15$ square units.` },
        { q: String.raw`A room is an $8 \times 6$ rectangle with a $3 \times 2$ rectangle cut from one corner. What is its area?`, answer: "42",
          solution: String.raw`The removed rectangle lies within the original room and has area $3\cdot2=6$. Removing it from the full area $8\cdot6=48$ leaves $48-6=42$ square units. This subtraction concerns area; it does not by itself determine the new perimeter.` },
        { q: String.raw`An $8\times6$ room has a $3\times2$ rectangular corner removed. What is the perimeter of the remaining room?`, answer: "28",
          solution: String.raw`The full eight-by-six rectangle has perimeter $2(8+6)=28$. A corner cut removes one boundary segment of length three and one of length two. It exposes two new segments of exactly those same lengths, so the perimeter change is $-(3+2)+(3+2)=0$. The remaining perimeter is therefore twenty-eight. The corner placement is essential: an inward notch along a side would add a detour.` },
        { q: String.raw`Two $5 \times 5$ squares are placed side by side so that they share a whole side. What is the perimeter of the resulting rectangle?`, answer: "30",
          solution: String.raw`The two square perimeters total $20+20=40$. Their shared side has length five and is counted in both original boundaries, although neither copy remains on the outer boundary. Subtracting it twice gives $40-2\cdot5=30$. The union is a ten-by-five rectangle, whose perimeter $2(10+5)=30$ confirms the count.` }
      ],
      problems: [
        "1993 AJHSME, Problem 18",
        "1997 AJHSME, Problem 21",
        "2012 AMC 8, Problem 5",
        "2005 AMC 8, Problem 13",
        "2019 AMC 8, Problem 21",
        "2013 AMC 10A, Problem 3",
        "2002 AMC 10A, Problem 8",
        "2016 AMC 10B, Problem 9"
      ]
    },
    "S1.5": {
      prereq: ["triangle-area-standard"],
      cards: ["pythagorean-theorem", "shared-leg-pythagoras", "special-right-triangles"],
      body: String.raw`A right triangle has two perpendicular legs and a hypotenuse opposite the right angle. The hypotenuse is its longest side. If the legs have lengths $a,b$ and the hypotenuse has length $c$, the [[pythagorean-theorem|Pythagorean theorem]] states $a^2+b^2=c^2$. The right-angle hypothesis is essential; applying the same equation to a general triangle would impose a condition that need not hold.

The area relationships of S1.4 give a proof. Place four congruent copies of the right triangle in the corners of a square of side $a+b$, with their hypotenuses bounding the central region. The acute angles of each right triangle sum to $90^\circ$, so adjacent acute angles leave a right angle at every central corner. All four central sides have length $c$, making that region a square.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 390" role="img" aria-label="Four right triangles around a square prove the Pythagorean theorem" style="width:100%;max-width:520px;height:auto"><title>Four right triangles around a square prove the Pythagorean theorem</title><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M120 55H400V335H120Z"/><path d="M280 55L400 215L240 335L120 175Z"/></g><path d="M280 55L400 215L240 335L120 175Z" fill="currentColor" opacity=".1"/><g fill="currentColor" text-anchor="middle" font-size="17"><text x="200" y="40">b</text><text x="340" y="40">a</text><text x="420" y="135">b</text><text x="420" y="278">a</text><text x="260" y="207">c²</text><text x="354" y="126">c</text><text x="260" y="374">Outer area (a + b)² = 4 · ab/2 + c².</text></g></svg>

The large square therefore has area $(a+b)^2=4(ab/2)+c^2$. Expanding and canceling $2ab$ gives $a^2+b^2=c^2$. Conversely, if positive triangle side lengths satisfy this equality with $c$ largest, construct a right triangle with legs $a,b$. The theorem gives it the same third side $c$, so SSS makes it congruent to the given triangle. This proves that the original angle opposite $c$ is right, not just that right triangles satisfy an equation.

The theorem finds a hypotenuse by adding squares, but finds a missing leg by subtracting. A five-by-twelve rectangle has diagonal $\sqrt{5^2+12^2}=13$. The triples $(3,4,5)$, $(5,12,13)$, $(8,15,17)$ and $(7,24,25)$ satisfy the equation; scaling all three entries by a positive factor preserves it. Knowing a triple can shorten arithmetic, while the diagram still determines which side is the hypotenuse.

A perpendicular often supplies both a right triangle and an area height. In an isosceles triangle with equal sides thirteen and base ten, the apex-to-base midpoint segment is perpendicular by the congruence argument in S1.3. Each half has hypotenuse thirteen and base five, so the height is $\sqrt{13^2-5^2}=12$. The full area is $\tfrac12\cdot10\cdot12=60$. An altitude does not generally bisect its base; that conclusion here comes from the equal sides.

For an unequal-sided triangle, the foot can be found rather than guessed. Let $AB=13$, $AC=15$, $BC=14$, and let $H$ be the perpendicular foot from $A$ to line $BC$. Measure $BH=x$ toward $C$, and write $AH=h$. Applying the theorem to the two right triangles gives $h^2+x^2=169$ and $h^2+(14-x)^2=225$. Subtraction cancels $h^2$ and then $x^2$, leaving $196-28x=56$. Hence $x=5$, $h^2=169-25=144$ and $h=12$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 380" role="img" aria-label="A perpendicular makes two equations with a shared height" style="width:100%;max-width:520px;height:auto"><title>A perpendicular makes two equations with a shared height</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M110 295L200 79L362 295Z"/><path d="M200 79V295" stroke-dasharray="5 4"/><path d="M200 285H210V295"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="93" y="313">B</text><text x="200" y="60">A</text><text x="378" y="313">C</text><text x="200" y="315">H</text><text x="137" y="181">13</text><text x="301" y="181">15</text><text x="230" y="197">h = 12</text><text x="153" y="338">x = 5</text><text x="283" y="338">14 − x = 9</text><text x="260" y="370">Subtract the equations to eliminate h².</text></g></svg>

More generally, with $AB=p$, $AC=q$ and $BC=c$, the same subtraction yields $x=(p^2-q^2+c^2)/(2c)$ and $h^2=p^2-x^2$. The method of [[shared-leg-pythagoras|two right triangles sharing a leg]] remains valid if the foot lies on an extension: use a signed coordinate $x$, so the two horizontal distances have squares $x^2$ and $(c-x)^2$. An $x$ between zero and $c$ places the foot on the base; negative $x$ places it beyond $B$, and $x\gt c$ beyond $C$. Checking this position prevents subtracting the wrong base segment.

Two angle patterns make the right-triangle calculation especially direct. A diagonal splits a square into congruent right triangles, so their legs are equal and each acute angle is $45^\circ$. If each leg is $k$, Pythagoras gives hypotenuse $k\sqrt2$. An altitude of an equilateral triangle bisects its base and its $60^\circ$ apex angle, making two $30^\circ$-$60^\circ$-$90^\circ$ triangles. If the original side is $2k$, the short leg is $k$ and the long leg is $\sqrt{(2k)^2-k^2}=k\sqrt3$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-label="Special right triangle ratios come from a square and an equilateral triangle" style="width:100%;max-width:520px;height:auto"><title>Special right triangle ratios come from a square and an equilateral triangle</title><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M50 190H170V70Z M310 230H410V56.795Z"/><path d="M160 190V180H170M400 230V220H410"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="130" y="25">Half a square</text><text x="380" y="25">Half an equilateral triangle</text><text x="110" y="214">k</text><text x="185" y="138">k</text><text x="91" y="118">k√2</text><text x="93" y="177">45°</text><text x="154" y="111">45°</text><text x="360" y="254">k</text><text x="443" y="153">k√3</text><text x="337" y="132">2k</text><text x="338" y="216">60°</text><text x="391" y="128">30°</text><text x="130" y="286">k : k : k√2</text><text x="380" y="286">k : k√3 : 2k</text></g></svg>

These [[special-right-triangles|special right-triangle ratios]] must be matched to the opposite angles: $k$ is opposite $30^\circ$, $k\sqrt3$ opposite $60^\circ$, and $2k$ opposite $90^\circ$. With hypotenuse ten, the two legs are five and $5\sqrt3$. An equilateral triangle of side six has height $3\sqrt3$ and area $9\sqrt3$. A square with diagonal $d$ has side $d/\sqrt2$ and area $d^2/2$; setting the side equal to the diagonal would miss the factor of two.

A useful right angle may be given by a rectangle, constructed as a perpendicular, or proved from a converse. Once it is established, the lengths can be turned into heights, areas and further angle information. Keep radicals exact until an approximation is actually requested, and take the positive square root when recovering a length.`,
      related: [
        { card: "distance-midpoint", note: String.raw`the Pythagorean theorem in coordinates, as the distance formula (S2.5).` },
        { card: "herons-formula", note: String.raw`the area of a triangle from its three sides (S4.5).` },
        { card: "pythagorean-triples", note: String.raw`the whole-number solutions of $a^2 + b^2 = c^2$.` }
      ],
      exercises: [
        { q: String.raw`How long is the diagonal of a $5 \times 12$ rectangle?`, answer: "13",
          solution: String.raw`A rectangle has a right angle between its adjacent sides. Its diagonal is the hypotenuse of a right triangle with legs five and twelve, so $d^2=5^2+12^2=25+144=169$. Taking the positive square root gives $d=13$.` },
        { q: String.raw`What is the area of a triangle with sides $13$, $13$ and $10$?`, answer: "60",
          solution: String.raw`Join the apex to the midpoint of the base ten. The two resulting triangles have the equal sides thirteen, equal half-bases five, and a common third side, so SSS makes them congruent. Their adjacent angles at the midpoint are therefore equal and sum to $180^\circ$, making both right angles. The height is $\sqrt{13^2-5^2}=12$. Applying the area formula to the full base gives $\tfrac12\cdot10\cdot12=60$.` },
        { q: String.raw`What is the area of an equilateral triangle with side $6$?`, answer: "9sqrt(3)",
          solution: String.raw`The altitude from a vertex of an equilateral triangle bisects the opposite side by congruence, leaving a half-base of three and a right triangle with hypotenuse six. Its height is $\sqrt{6^2-3^2}=\sqrt{27}=3\sqrt3$. The full triangle area is $\tfrac12\cdot6\cdot3\sqrt3=9\sqrt3$. This also derives the special-triangle ratio used in the calculation.` },
        { q: String.raw`A triangle has sides $13$, $14$ and $15$. How long is its height to the side of length $14$?`, answer: "12",
          solution: String.raw`Let $BH=x$ along the base $BC=14$ and let $AH=h$, where $AB=13$ and $AC=15$. The two right-triangle equations are $h^2+x^2=169$ and $h^2+(14-x)^2=225$. Subtracting gives $196-28x=56$, so $x=5$. This lies between zero and fourteen, confirming that the foot is inside the base. Then $h^2=169-25=144$ and the height is the positive value twelve.` }
      ],
      problems: [
        "1997 AJHSME, Problem 15",
        "2007 AMC 8, Problem 14",
        "2002 AMC 8, Problem 16",
        "2014 AMC 8, Problem 14",
        "2005 AMC 10A, Problem 4",
        "2009 AMC 10B, Problem 4",
        "2010 AMC 10A, Problem 14",
        "2015 AMC 10A, Problem 11",
        "2019 AMC 10B, Problem 15"
      ]
    },
    "S1.6": {
      prereq: ["parallel-exterior-angles", "parallel-by-angle-sum", "angle-chasing", "clock-angle", "trapezoid-consecutive-angles", "triangle-inequality", "triangle-type-by-sides", "triangle-congruence", "triangle-area-standard", "area-by-pieces", "joined-shapes-perimeter", "pythagorean-theorem", "shared-leg-pythagoras", "special-right-triangles"],
      cards: [],
      body: String.raw`A geometric solution connects the given relationships to the requested measurement. An angle value moves through a diagram by a stated equality or sum, not by how the picture appears. Parallel-line transfers, straight and full turns, and triangle sums justify each step; a converse angle condition is needed when parallelism itself is the conclusion. For moving clock hands, calculate both positions and then choose the smaller of the two angles around the center.

A side calculation begins with existence: positive lengths must satisfy the strict triangle inequalities before their squares are used to classify an angle. A flat limiting arrangement can bound possible lengths or perimeters without being an allowed triangle. Congruence requires corresponding data that determine both size and shape; a nonincluded angle with two sides can leave more than one triangle. The isosceles midpoint construction shows how a valid congruence produces equal angles and a perpendicular.

Area uses a perpendicular height to the full base line, including an extended base when necessary. Cutting and completing regions preserves an area equation when overlaps are controlled. Perimeter instead follows exposed boundaries: joining along a shared edge hides that length twice, while cutting a corner and cutting an inward notch have different effects.

A perpendicular links these ideas by making right triangles. The Pythagorean theorem follows from an area dissection, its converse identifies a right angle, and subtracting two equations with a shared height locates an unknown foot. The $45^\circ$-$45^\circ$-$90^\circ$ and $30^\circ$-$60^\circ$-$90^\circ$ ratios follow from the same theorem and congruence constructions, with each side matched to its opposite angle.`,
      strategies: [
        String.raw`Mark every angle you know on the figure, and name an unknown angle $x$.`,
        String.raw`Look for parallel lines and isosceles triangles to carry angles across a figure.`,
        String.raw`Test three lengths by checking the largest against the sum of the other two.`,
        String.raw`For an area, choose the base whose height you know, or subtract pieces from a simple shape.`,
        String.raw`Drop a perpendicular to make a right angle, then use the Pythagorean theorem.`,
        String.raw`Turn an angle of $30^\circ$, $45^\circ$ or $60^\circ$ into a special right triangle.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The angles of a triangle are in the ratio $2 : 3 : 4$. What is the largest angle, in degrees?`, answer: "80",
        solution: String.raw`Write the angles as $2k,3k,4k$, with $k>0$. Their sum is $9k=180^\circ$, so $k=20^\circ$. The greatest coefficient is four, hence the largest angle is $4\cdot20^\circ=80^\circ$. The other angles, forty and sixty degrees, check the total.` },
      { q: String.raw`A $25$-foot ladder leans against a wall with its foot $7$ feet from the wall. How high up the wall does it reach, in feet?`, answer: "24",
        solution: String.raw`The vertical wall and horizontal ground are perpendicular, so the ladder forms the hypotenuse of a right triangle. If $h$ is the height reached, then $h^2+7^2=25^2$, giving $h^2=625-49=576$. Taking the positive square root gives $h=24$ feet, consistent with the $7$-$24$-$25$ triple.` },
      { q: String.raw`How many triangles that are not congruent to each other have whole-number sides and perimeter $12$?`, answer: "3",
        solution: String.raw`Order the positive integer sides as $a\le b\le c$ to avoid counting reorderings separately. SSS means that each such side triple gives exactly one congruence class. From $a+b+c=12$ and $c\lt a+b=12-c$, the largest side satisfies $c\lt6$. Also $12\le3c$, so $c\ge4$. If $c=5$, then $a+b=7$ with $a\le b\le5$, giving $(2,5,5)$ and $(3,4,5)$. If $c=4$, the only possibility is $(4,4,4)$. All three meet the strict triangle inequality, so there are three noncongruent triangles.` },
      { q: String.raw`What is the smaller angle between the hands of a standard clock at $11{:}50$, in degrees?`, answer: "55",
        solution: String.raw`The minute hand has position $6\cdot50=300^\circ$ clockwise from twelve. The hour hand has position $30\cdot11+0.5\cdot50=355^\circ$. The difference is $55^\circ$, already less than a straight angle, so the smaller angle is fifty-five degrees.` },
      { q: String.raw`A rectangular $8\times6$ region has a $3$-wide, $2$-deep rectangular notch removed from the middle of one of its length-eight sides. What are the remaining area and perimeter, in that order?`, answer: "42,32",
        solution: String.raw`The notch removes area $3\cdot2=6$ from the original forty-eight, leaving forty-two square units. The original perimeter is twenty-eight. Removing an outer length-three segment and adding lengths two, three and two increases perimeter by $2+3+2-3=4$, giving thirty-two. Unlike a corner cut, the notch introduces two extra depth segments.` },
      { q: String.raw`Find the area of the triangle with vertices $(0,0)$, $(4,0)$ and $(6,3)$.`, answer: "6",
        solution: String.raw`The base on the $x$-axis has length four. The perpendicular distance from $(6,3)$ to the line $y=0$ is three, although its foot $(6,0)$ lies outside the base segment. Therefore the area is $\tfrac12\cdot4\cdot3=6$ square units.` },
      { q: String.raw`Triangle $ABC$ has $AB=5$, $BC=6$ and $AC=\sqrt{85}$. Find its area.`, answer: "3sqrt(21)",
        solution: String.raw`The largest side $\sqrt{85}$ is less than eleven and greater than one, so the side lengths satisfy the triangle inequality. Put $B=(0,0)$, $C=(6,0)$ and $A=(x,h)$ with $h>0$. The two distance equations are $x^2+h^2=25$ and $(6-x)^2+h^2=85$. Their difference is $36-12x=60$, so $x=-2$: the altitude foot is on the extension beyond $B$. Then $h^2=25-4=21$, giving height $\sqrt{21}$ and area $\tfrac12\cdot6\sqrt{21}=3\sqrt{21}$.` }
    ],
    problems: [
      "1989 AJHSME, Problem 10",
      "2000 AMC 8, Problem 13",
      "2009 AMC 8, Problem 9",
      "2017 AMC 8, Problem 18",
      "2021 Fall AMC 10A, Problem 7",
      "2008 AMC 10A, Problem 14",
      "2016 AMC 10A, Problem 11",
      "2017 AMC 10A, Problem 7"
    ]
  },
  challenge: {
    problems: [
      "2025 AMC 8, Problem 24",
      "2012 AMC 8, Problem 25",
      "2011 AMC 12B, Problem 10",
      "2021 Fall AMC 10B, Problem 15",
      "2017 AMC 12B, Problem 8"
    ]
  }
};
