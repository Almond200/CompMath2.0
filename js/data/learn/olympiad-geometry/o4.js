// Learn, Olympiad Geometry, chapter O4: Derived triangles and conjugates.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O4"] = {
  lessons: {
    "O4.1": {
      prereq: ["cevas-theorem"], cards: [],
      body: String.raw`Mark a point $P$ inside a triangle. There are two natural ways to mark a point on $BC$: drop a perpendicular from $P$, or extend $AP$ until it meets $BC$. Repeat on the other sides. The first construction gives a pedal triangle, whose right angles create circles. The second gives a cevian triangle, whose side ratios record where the lines concur.

Take $P$ to be the centroid of a scalene triangle. The cevian feet are the three side midpoints. Could its pedal feet be those same three points? Then $P$ would lie on every perpendicular bisector and would be the circumcenter as well. Asking what extra symmetry would force the two triangles to agree is a good way to tell the constructions apart. O4.2 follows perpendiculars and angle bisectors. O4.3 transforms the three cevian ratios and asks whether the new lines still concur.`,
      exercises: [
        { q: String.raw`Which center should be projected to obtain the three incircle contacts?`,
          solution: String.raw`Use the incenter. A radius to a contact point is perpendicular to the tangent side. Thus each contact is exactly the foot of the corresponding perpendicular.` },
        { q: String.raw`For an interior point the first two cyclic cevian ratios are $BD/DC=2$ and $CE/EA=3$. Find $AF/FB$.`, answer: "1/6",
          solution: String.raw`Ceva gives $(BD/DC)(CE/EA)(AF/FB)=1$, so the last ratio is $1/6$. Keeping the order $B$ to $C$, $C$ to $A$, $A$ to $B$ matters.` }
      ]
    },
    "O4.2": {
      prereq: ["inscribed-angle-theorem"], cards: ["pedal-triangle", "excentral-triangle", "orthocentric-system"],
      body: String.raw`Drop perpendiculars from an interior point $P$ to $BC,CA,AB$, with feet $D,E,F$. What determines the length $EF$? Both $E$ and $F$ see $AP$ at a right angle, so they lie on the circle with diameter $AP$. For feet on the side segments, chord $EF$ subtends angle $A$ at the vertex. Thus $EF=AP\sin A$ by the extended sine rule in that circle. The lengths of the [[pedal-triangle|pedal triangle]] tell us distances to the original vertices.

Now reverse the question. Can the original triangle itself be obtained from perpendiculars in a larger triangle? Take the excenters $I_A,I_B,I_C$, where $I_A$ lies on the internal bisector at $A$. Both $I_B$ and $I_C$ lie on the external bisector at $A$, perpendicular to the internal one. So in the [[excentral-triangle|excentral triangle]], the altitude from $I_A$ passes through $A$ and the incenter $I$. The other two altitudes pass through $B,I$ and $C,I$. Consequently $ABC$ is the pedal triangle of $I$ relative to the excentral triangle.

Read the same perpendicularities with different vertices. In any acute triangle with vertices $U,V,W$ and orthocenter $H$, the orthocenter of $H V W$ is $U$: the altitude from $H$ follows $HU$, and the altitude from $V$ follows $VU$ because $VU\perp HW$. The four points form an [[orthocentric-system|orthocentric system]]. In the excentral diagram this observation lets us choose any three among the incenter and excenters and identify their orthocenter immediately.`,
      exercises: [
        { q: String.raw`If $\angle A=30^\circ$ and $AP=10$, find the distance between the feet on segments $AB$ and $AC$.`, answer: "5",
          solution: String.raw`The circle with diameter $AP$ has diameter $10$. Its chord opposite angle $30^\circ$ has length $10\sin30^\circ=5$.` },
        { q: String.raw`Find the orthocenter of the triangle with vertices $I,I_A,I_B$.`,
          solution: String.raw`It is $I_C$. Line $I I_C$ is perpendicular to $I_A I_B$ at $C$. Also $I_A I_C$ is perpendicular to $I I_B$ at $B$. These two altitudes meet at $I_C$.` }
      ]
    },
    "O4.3": {
      prereq: ["steiner-ratio-theorem", "cevas-theorem"], cards: ["isogonal-conjugate", "isotomic-conjugate", "cevian-nest"],
      body: String.raw`Three lines $AD,BE,CF$ meet at an interior point $P$. Reflect each line in the bisector at its own vertex. Why should all three images pass through one point? Write $r=BD/DC$, $s=CE/EA$, $t=AF/FB$, so $rst=1$. At $A$, Steiner's ratio theorem gives the new ratio $(AB/AC)^2/r$. Cycling the vertices multiplies the three old reciprocals by $(AB/AC)^2(BC/BA)^2(CA/CB)^2=1$. Ceva now proves concurrence. The new point is the [[isogonal-conjugate|isogonal conjugate]] of $P$.

Instead reflect $D,E,F$ in the midpoints of their respective sides. Each ratio just turns upside down. Again the product is $1$, and the new point is the [[isotomic-conjugate|isotomic conjugate]]. These operations have different fixed points: vertex bisectors fix the incenter in the first construction, while side midpoints fix the centroid in the second.

For an example with two triangles inside each other, use the cevian triangle $DEF$ as a new reference triangle. Choose an interior point $Q$ there, and let its cevians from $D,E,F$ cut $EF,FD,DE$ at $X,Y,Z$. The [[cevian-nest|cevian nest theorem]] says that $AX,BY,CZ$ concur. Ordinary Ceva in $ABC$ cannot be applied directly because $X,Y,Z$ lie on the inner sides. In the challenge we track the weights of the original vertices through the second construction instead.`,
      exercises: [
        { q: String.raw`An interior point cuts $BC$ in the ratio $2:1$ from $B$, and $AB:AC=3:2$. Find the corresponding ratios for its isogonal and isotomic conjugates.`,
          solution: String.raw`Steiner gives $(3/2)^2/2=9/8$ for the isogonal ratio. Reflection in the side midpoint simply exchanges the two lengths and gives $1/2$ for the isotomic ratio.` },
        { q: String.raw`Why does taking the isotomic conjugate twice return the original interior point?`,
          solution: String.raw`Two reflections in the same side midpoint restore each cevian foot. The three original cevians return, and already the first two have the unique intersection $P$.` }
      ]
    },
    "O4.4": {
      prereq: [], cards: [],
      body: String.raw`Two perpendicular feet beside a vertex determine a circle whose diameter joins that vertex to the original point. With excenters, the perpendiculars come from the internal and external bisectors at the same vertex. For cevians, keep a different record: write the three ratios in cyclic order. Reflecting three feet or three rays then gives three new ratios whose product explains concurrence.`,
      strategies: ["When two feet appear next to a vertex, draw the diameter joining that vertex to the point being projected.", "At a vertex of the original triangle, label which excenters lie on the external bisector.", "Before applying Ceva, name the reference triangle and check that each marked foot lies on its opposite side."]
    }
  },
  reviewProblems: { exercises: [
    { q: String.raw`Let $P$ be interior to an acute triangle and let its pedal feet be $D,E,F$ in cyclic order. Show that $EF/FD=(AP/BP)(BC/CA)$.`,
      solution: String.raw`The two diameter circles give $EF=AP\sin A$ and $FD=BP\sin B$. The sine rule in $ABC$ gives $\sin A/\sin B=BC/CA$. Substitution proves the formula.` },
    { q: String.raw`Characterize the triangles in which the centroid equals its own isogonal conjugate.`,
      solution: String.raw`A fixed interior point must lie on all three internal bisectors because its cevians are unchanged by reflection. For the centroid these cevians are medians. At $A$ the bisector theorem now gives $AB=AC$, and at $B$ it gives $BA=BC$. Conversely all the medians of an equilateral triangle bisect their angles.` }
  ], problems: [] },
  challenge: { exercises: [
    { q: String.raw`In an acute triangle, the feet of the perpendiculars from an interior point $P$ make an equilateral triangle. Prove $AP\cdot BC=BP\cdot CA=CP\cdot AB$.`,
      solution: String.raw`The equal pedal chords give $AP\sin A=BP\sin B=CP\sin C$. Multiplying by the common diameter $2R$ of the circumcircle of $ABC$ turns the three sines into their opposite sides. The result follows without finding $P$.` },
    { q: String.raw`Prove the cevian nest theorem for interior points. Use barycentric weights: $(x:y:z)$ represents the weighted average of the vertices after division by $x+y+z$.`,
      solution: String.raw`Write $P=(p:q:r)$ in $ABC$. Its feet are $D=(0:q:r)$, $E=(p:0:r)$, $F=(p:q:0)$, since the ratio of the two retained weights is constant along the associated cevian. Write $Q=(u:v:w)$ in $DEF$. Then $X$ is the weighted average of $E,F$ with weights $v,w$. In $ABC$ the ratio of its $B$ and $C$ weights is therefore $[wq/(p+q)]/[vr/(p+r)]$. Normalizing each vertex before averaging is crucial here. Similarly $BY$ fixes the ratio of $C$ to $A$ weights at $[ur/(q+r)]/[wp/(p+q)]$, and $CZ$ fixes the ratio of $A$ to $B$ weights at $[vp/(p+r)]/[uq/(q+r)]$. The three displayed ratios multiply to $1$. Thus there is one positive triple of weights, up to scale, having all three ratios: choose the first weight and recover the other two successively. Its point lies on all three lines.` }
  ], problems: [] }
};
