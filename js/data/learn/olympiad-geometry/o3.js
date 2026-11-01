// Learn, Olympiad Geometry, chapter O3: Olympiad lemmas.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O3"] = {
  lessons: {
    "O3.1": {
      prereq: ["ratio-lemma", "power-of-a-point"], cards: [],
      body: String.raw`Suppose a ray from $A$ divides $BC$ in the ratio $2:1$. Where does its reflection in the angle bisector meet $BC$? A drawing suggests that the two cuts exchange places. Try that drawing again with $AB$ much shorter than $AC$: the two cuts can actually lie on the same half of the side.

A ratio records what the eye misses. If $D$ is on $BC$, the triangles $ABD$ and $ACD$ have a common altitude, so their areas are in the ratio $BD/DC$. Computing those same areas using $AD$ instead brings in the angles at $A$. In O3.2 we use the two expressions together. In O3.3 we keep a different quantity fixed, a product of distances, while the points in a circle diagram move.`,
      exercises: [
        { q: String.raw`If $BD:DC=2:1$ and triangle $ABC$ has area $27$, find the area of $ABD$.`, answer: "18",
          solution: String.raw`The common altitude makes the areas proportional to the bases. The larger triangle $ABD$ takes two of the three equal shares, or $18$.` },
        { q: String.raw`Why does reflection in the bisector of angle $A$ exchange $B$ and $C$ only when $AB=AC$?`,
          solution: String.raw`The reflection takes ray $AB$ onto ray $AC$ and preserves distance from $A$. Its image of $B$ is therefore the unique point of ray $AC$ at distance $AB$ from $A$.` }
      ]
    },
    "O3.2": {
      prereq: ["ratio-lemma"], cards: ["isogonal-line-lemma", "steiner-ratio-theorem", "iran-lemma"],
      body: String.raw`Let $AD$ and $AE$ be rays inside angle $A$, reflected in its bisector, with $D,E$ on $BC$. Write $u=\angle BAD$ and $v=\angle DAC$. The area computation gives $BD/DC=(AB/AC)\sin u/\sin v$. For $E$ the sines exchange places. Multiplying gives [[steiner-ratio-theorem|Steiner's ratio theorem]]: the product of the two side ratios is $(AB/AC)^2$. For instance, if $AB/AC=2/3$ and $BD/DC=2$, the reflected ray cuts the side in the ratio $2/9$.

Sometimes the diagram gives two crossing pairs of lines instead of two marked feet. Choose points $X,Y$ on the reflected rays. Set $P=BX\cap CY$ and $Q=BY\cap CX$, assuming distinct, finite intersections. The [[isogonal-line-lemma|isogonal line lemma]] lets us apply the same product test to $AP,AQ$. The crossing is essential: at $B$ one uses $BX$ for the first intersection and $BY$ for the second, and at $C$ the choices switch.

A reflection also explains the [[iran-lemma|Iran lemma]]. Reflect $C$ across $BI$ onto ray $BA$ at $U$, where $I$ is the incenter. The midpoint $K$ of $CU$ lies on the mirror and $CK$ is perpendicular to it. In triangle $BCU$, the segment joining $K$ to the midpoint of $BC$ is parallel to $AB$. Why does $K$ also lie on the line through the two incircle contacts on $AB,AC$? The challenge asks you to recover that last incidence by projecting onto $AI$.`,
      exercises: [
        { q: String.raw`A median from $A$ is reflected across the bisector. If $AB=6$, $AC=9$ and $BC=13$, find the distance from $B$ to the reflected median's foot.`, answer: "4",
          solution: String.raw`The median has ratio $1$, so the reflected foot has ratio $36/81=4/9$. A side of length $13$ then divides into lengths $4$ and $9$.` },
        { q: String.raw`In the crossed-lines construction above, let $AP$ meet $BC$ at its midpoint. If $AB=AC$, prove $P$ and $Q$ lie on the same line through $A$.`,
          solution: String.raw`In an isosceles triangle the median from the apex is the angle bisector. Its reflected line is itself. The isogonal line lemma gives precisely that reflected line for $AQ$.` }
      ]
    },
    "O3.3": {
      prereq: ["power-of-a-point"], cards: ["humpty-queue-points", "dumpty-point", "shooting-lemma"],
      body: String.raw`How can you locate a point on a median without finding the orthocenter first? Put the midpoint $M$ of $BC$ at the origin, take $B=(-s,0)$, $C=(s,0)$ and write $A=(u,v)$ with $v>0$. The altitude through $A$ is vertical. The altitude through $B$ has slope $(s-u)/v$, so their intersection is $H=(u,(s^2-u^2)/v)$. The dot product of $MA$ and $MH$ as vectors is therefore $s^2$. Project $H$ onto $AM$ at $X$: the same product is $MA\cdot MX$. Thus the [[humpty-queue-points|Humpty point]] is the inverse of $A$ in the circle with diameter $BC$. For its companion, the Queue point, draw the line $MH$ instead: the antipode of $A$ is one intersection with the circumcircle, and the other sees $AH$ at a right angle when the points are distinct.

The [[dumpty-point|Dumpty point]] uses the reflected median, or symmedian. Follow it from $A$ to its second intersection $K$ with the circumcircle and take the midpoint $D$ of $AK$. Now $OD$ is perpendicular to $AK$ because $O$ is the circumcenter. In a Dumpty configuration the similar triangles $DBA$ and $DAC$ give $DB/DA=DA/DC$. This makes $DA$ recoverable from distances to the two base vertices, even without the length of the symmedian chord.

A different midpoint appears when a small circle touches chord $BC$ at $F$ and its circumcircle internally at $T$ (here the circumcircle means the larger circle through $B,C,T$). The [[shooting-lemma|shooting lemma]] locates the other end of line $TF$ on the larger circle. Dilate about $T$ to carry the small circle onto the large one. The tangent at $F$ goes to a parallel tangent, so the image of $F$ is the midpoint $N$ of the arc $BC$ opposite the small circle. In particular $N,F,T$ are collinear. To get a length from the incidence, the triangles $NBF$ and $NTB$ are similar: they share the angle at $N$, and $\angle NBF=\angle NTB$ because arcs $NC$ and $NB$ are equal. Hence $NF\cdot NT=NB^2$.`,
      exercises: [
        { q: String.raw`In the Humpty construction $BC=12$ and $MA=9$. How far from $M$ is the foot of the perpendicular from $H$ to $AM$?`, answer: "4",
          solution: String.raw`Here $s=6$. The projection identity gives $MX=s^2/MA=36/9=4$.` },
        { q: String.raw`For a Dumpty point the distances $DB$ and $DC$ are $4$ and $9$. Find $AK$.`, answer: "12",
          solution: String.raw`Similarity gives $DA^2=4\cdot9$, so $DA=6$. Since $D$ bisects $AK$, the chord has length $12$.` }
      ]
    },
    "O3.4": {
      prereq: [], cards: [],
      body: String.raw`A reflected pair of rays gives a product of side ratios. A perpendicular dropped to a median gives a product of lengths. Both calculations eliminate an angle that would otherwise have to be found. In a tangency diagram, first use the common tangent or a dilation to identify the arc midpoint. Only then use similar triangles to compute the product.`,
      strategies: ["Compute one cevian ratio from areas, then reflect the angles and multiply.", "Mark which midpoint belongs to the construction: a side midpoint, a chord midpoint or an arc midpoint.", "For two tangent circles, dilate about their contact point and follow the image of a known tangent."]
    }
  },
  reviewProblems: { exercises: [
    { q: String.raw`Two isogonal rays from $A$ cut $BC$ in ratios $3/2$ and $2/3$ measured from $B$. What can be inferred about the triangle?`,
      solution: String.raw`Their product is $1$, hence $(AB/AC)^2=1$. The sides are positive, so $AB=AC$.` },
    { q: String.raw`In the shooting construction let $NB=10$ and $NF=8$. Find $FT$.`, answer: "9/2",
      solution: String.raw`The dilation sends $F$ farther from $T$ to $N$, so the order is $N,F,T$. The product gives $NT=100/8=25/2$, whence $FT=25/2-8=9/2$.` }
  ], problems: [] },
  challenge: { exercises: [
    { q: String.raw`Finish the Iran lemma proof. Let $a=BC$, $b=CA$, $c=AB$. Show that the midpoint of $CU$ lies on the incircle contact chord from vertex $A$, allowing $U$ to lie past $A$.`,
      solution: String.raw`Use signed projections onto ray $AI$ with origin $A$. The projections of $C$ and $U$ are $b\cos(A/2)$ and $(c-a)\cos(A/2)$ because $BU=a$ on ray $BA$. Their midpoint projects to $((b+c-a)/2)\cos(A/2)$. The two equal tangents from $A$ have length $(b+c-a)/2$, by adding the side lengths and canceling equal tangent segments. Their contact points have exactly this same projection. The line joining them is the line of constant projection, so it contains the midpoint.` },
    { q: String.raw`Prove the right-angle assertion for the Queue point in an acute scalene triangle whenever the construction is nondegenerate.`,
      solution: String.raw`Let $A'$ be the antipode of $A$. Diameter angles give $BA'\perp AB$ and $CA'\perp AC$. Thus $BA'$ is parallel to $CH$ and $CA'$ to $BH$, making $B H C A'$ a parallelogram. Its diagonals bisect each other at $M$, so $H,M,A'$ are collinear. The other intersection $Q$ of this line with the circumcircle satisfies $AQ\perp QA'$ by the diameter $AA'$, and $QA'$ is line $QH$.` }
  ], problems: [] }
};
