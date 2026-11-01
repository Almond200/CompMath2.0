// Learn, Olympiad Geometry, chapter O1: methods (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["O1"] = {
  lessons: {
    "O1.1": {
      prereq: ["inscribed-angle-theorem", "cyclic-quadrilateral", "power-of-a-point", "triangle-similarity"],
      cards: [],
      body: String.raw`Olympiad geometry proofs must hold for every configuration, not just the one drawn, and they often need a change of viewpoint. This chapter gives the methods for both: directed angles, which make one angle chase cover every arrangement; the phantom point, which proves that a point has a property by building a point that does and showing they coincide; inversion, which turns circles through a point into lines; and projective and moving-point arguments.

An inversion with center $O$ and radius $2$ sends a point at distance $4$ from $O$ to the point on the same ray at distance $\tfrac{2^2}{4} = 1$. A line at distance $3$ from $O$ goes, under an inversion of radius $3$, to a circle through $O$ whose diameter is $\tfrac{3^2}{3} = 3$. And four points $A$, $B$, $P$, $Q$ lie on a circle exactly when the directed angles $\angle(PA, PB)$ and $\angle(QA, QB)$ are equal modulo $180^\circ$, whichever side of $AB$ the points $P$ and $Q$ are on.

The lessons are directed angles and phantom points (O1.2), inversion (O1.3), and projective transformations and moving points (O1.4). The Summary (O1.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Under the inversion with center $O$ and radius $2$, where does a point at distance $4$ from $O$ go?`,
          solution: String.raw`It goes to the point $P^*$ on the ray $OP$ with $OP \cdot OP^* = 4$, so at distance $1$ from $O$.` },
        { q: String.raw`Under the inversion with center $O$ and radius $3$, a line $\ell$ at distance $3$ from $O$ goes to a circle. What is its diameter?`, answer: "3",
          solution: String.raw`The foot $F$ of the perpendicular from $O$ to $\ell$, at distance $3$, goes to the point at distance $\tfrac93 = 3$, itself. The image of a line not through $O$ is a circle through $O$, and its diameter through $O$ ends at the image of the nearest point $F$, so the diameter is $3$: here the circle is tangent to $\ell$ at $F$.` }
      ],
      problems: []
    },
    "O1.2": {
      prereq: ["inscribed-angle-theorem", "cyclic-quadrilateral", "angle-chasing"],
      cards: ["directed-angles", "phantom-point"],
      body: String.raw`Points $D$, $E$, $F$ lie on the sides $BC$, $CA$, $AB$ of a triangle: why do the circles $AEF$, $BFD$, $CDE$ pass through one point, wherever $D$, $E$, $F$ are? Why does the bisector of angle $A$ meet the perpendicular bisector of $BC$ on the circumcircle? Two methods that make such proofs complete.

[[directed-angles|Directed angles]] measure $\angle(\ell, m)$ as the angle that rotates line $\ell$ counterclockwise onto line $m$, taken modulo $180^\circ$. With them, the rules of angle chasing hold in every configuration: $\angle(\ell, m) + \angle(m, n) = \angle(\ell, n)$, and four points $A$, $B$, $P$, $Q$ are concyclic exactly when $\angle(PA, PB) = \angle(QA, QB)$. The cases "same side" and "opposite sides" of $AB$, which make ordinary angles equal or supplementary, become one statement. For Miquel's theorem: let circles $AEF$ and $BFD$ meet again at $M$. Then $\angle(MD, ME) = \angle(MD, MF) + \angle(MF, ME) = \angle(BD, BF) + \angle(AF, AE) = \angle(BC, BA) + \angle(AB, AC) = \angle(CB, CA) = \angle(CD, CE)$, so $M$ lies on circle $CDE$, in every arrangement.

[[phantom-point|The phantom point method]] proves that a point $X$ defined one way has a property by building a point $X'$ that has the property by construction, then showing $X' = X$. Let $M$ be the midpoint of arc $BC$ not containing $A$. Then $MB = MC$, so $M$ lies on the perpendicular bisector of $BC$; and the arcs $BM$ and $MC$ are equal, so $\angle BAM = \angle MAC$ and $AM$ is the bisector. The bisector and the perpendicular bisector meet at only one point (when $AB \ne AC$), so that point is $M$, on the circumcircle. The method replaces a hard forward computation by an easy check that the two definitions agree.

Chase angles modulo $180^\circ$ to cover all configurations, and build the point with the desired property before identifying it with the given one. The next lesson inverts.`,
      related: [
        { card: "cyclic-quadrilateral", note: String.raw`the concyclicity test that directed angles make uniform (S5.3).` },
        { card: "complete-quadrilateral-miquel", note: String.raw`the Miquel point of four lines (O7.4).` },
        { card: "incenter-excenter-lemma", note: String.raw`the arc midpoint as center of a circle through $B$, $C$, $I$, $I_A$.` }
      ],
      exercises: [
        { q: String.raw`Points $D$, $E$, $F$ lie on the lines $BC$, $CA$, $AB$ of triangle $ABC$. Prove that the circles $AEF$, $BFD$ and $CDE$ have a common point.`,
          solution: String.raw`Let circles $AEF$ and $BFD$ meet at $F$ and $M$. With directed angles modulo $180^\circ$: since $B, F, D, M$ are concyclic, $\angle(MD, MF) = \angle(BD, BF) = \angle(BC, BA)$; since $A, E, F, M$ are concyclic, $\angle(MF, ME) = \angle(AF, AE) = \angle(AB, AC)$. Adding, $\angle(MD, ME) = \angle(BC, AC) = \angle(CD, CE)$, so $C, D, E, M$ are concyclic.` },
        { q: String.raw`In triangle $ABC$ with $AB \ne AC$, prove that the bisector of angle $A$ and the perpendicular bisector of $BC$ meet on the circumcircle.`,
          solution: String.raw`Let $M$ be the midpoint of the arc $BC$ not containing $A$. Equal arcs give equal chords, $MB = MC$, so $M$ is on the perpendicular bisector of $BC$. Equal arcs give equal inscribed angles, $\angle BAM = \angle MAC$, so $M$ is on the bisector of angle $A$. The two lines are different (they coincide only if $AB = AC$), so they meet only at $M$.` },
        { q: String.raw`Prove that for any lines $\ell$, $m$, $n$, the directed angles satisfy $\angle(\ell, m) + \angle(m, n) = \angle(\ell, n)$, and that $\angle(m, \ell) = -\angle(\ell, m)$.`,
          solution: String.raw`Rotating $\ell$ counterclockwise by $\angle(\ell, m)$ gives $m$, and rotating $m$ by $\angle(m, n)$ gives $n$; the two rotations together rotate $\ell$ onto $n$, so the sum is $\angle(\ell, n)$ modulo $180^\circ$. Rotating back by $-\angle(\ell, m)$ takes $m$ to $\ell$, so $\angle(m, \ell) = -\angle(\ell, m)$.` }
      ],
      problems: []
    },
    "O1.3": {
      prereq: ["power-of-a-point", "triangle-similarity", "ptolemys-theorem"],
      cards: ["inversion-properties", "sqrt-bc-inversion"],
      body: String.raw`How far apart are the images of two points under an inversion? Why is $AB \cdot CD + BC \cdot DA \ge AC \cdot BD$ for any four points? What does the inversion about $A$ with radius $\sqrt{AB \cdot AC}$, followed by a reflection, do to a triangle? Inversion trades circles through a point for lines.

[[inversion-properties|Inversion]] with center $O$ and radius $r$ sends each point $P \ne O$ to the point $P^*$ on ray $OP$ with $OP \cdot OP^* = r^2$. It fixes the circle of radius $r$, swaps inside and outside, sends lines through $O$ to themselves, lines not through $O$ to circles through $O$ and back, and circles not through $O$ to circles not through $O$; it preserves angles between curves. Triangles $OPQ$ and $OQ^*P^*$ are similar, since $\tfrac{OP}{OQ^*} = \tfrac{OQ}{OP^*}$ with the angle at $O$ shared, which gives the distance formula $P^*Q^* = \tfrac{r^2 \cdot PQ}{OP \cdot OQ}$. The art is choosing the center at a point where many circles meet, so that they all become lines.

Ptolemy's inequality is an example. Invert about $A$ with radius $1$: then $B^*C^* = \tfrac{BC}{AB \cdot AC}$, $C^*D^* = \tfrac{CD}{AC \cdot AD}$, $B^*D^* = \tfrac{BD}{AB \cdot AD}$. The triangle inequality $B^*D^* \le B^*C^* + C^*D^*$, multiplied by $AB \cdot AC \cdot AD$, is $AC \cdot BD \le BC \cdot AD + CD \cdot AB$. Equality needs $C^*$ on segment $B^*D^*$, that is, $B$, $C$, $D$ on a circle through $A$ in that order: Ptolemy's theorem.

[[sqrt-bc-inversion|The $\sqrt{bc}$ inversion]] is the inversion about $A$ with radius $\sqrt{AB \cdot AC}$ followed by the reflection in the bisector of angle $A$. It sends $B$ to $C$ and $C$ to $B$, since $AB \cdot AC = bc$ and the reflection swaps the rays $AB$ and $AC$; so it swaps the circumcircle and line $BC$, and it swaps the incenter and the $A$-excenter. It turns statements about the circumcircle into statements about the opposite side.

Invert about a point where many circles meet, use the distance formula to turn products into lengths, and use the $\sqrt{bc}$ inversion to swap the circumcircle and the opposite side. The next lesson moves the whole plane.`,
      related: [
        { card: "ptolemys-theorem", note: String.raw`the equality case of the inequality inversion proves (S9.4).` },
        { card: "orthogonal-circles", note: String.raw`circles fixed by an inversion (O6.2).` },
        { card: "mobius-transformations", note: String.raw`inversions and similarities together, in the complex plane (O7.4).` }
      ],
      exercises: [
        { q: String.raw`Under the inversion with center $O$ and radius $r$, prove that $P^*Q^* = \tfrac{r^2 \cdot PQ}{OP \cdot OQ}$.`,
          solution: String.raw`From $OP \cdot OP^* = r^2 = OQ \cdot OQ^*$, $\tfrac{OP}{OQ^*} = \tfrac{OQ}{OP^*}$, and the triangles $OPQ$ and $OQ^*P^*$ share the angle at $O$, so they are similar (SAS), with ratio $\tfrac{OP^*}{OQ} = \tfrac{r^2}{OP \cdot OQ}$. Hence $P^*Q^* = PQ \cdot \tfrac{r^2}{OP \cdot OQ}$.` },
        { q: String.raw`Prove Ptolemy's inequality: for any four points $A$, $B$, $C$, $D$ in the plane, $AB \cdot CD + BC \cdot DA \ge AC \cdot BD$.`,
          solution: String.raw`If two points coincide the claim is easy; otherwise invert about $A$ with radius $1$. By the distance formula, $B^*C^* = \tfrac{BC}{AB \cdot AC}$, $C^*D^* = \tfrac{CD}{AC \cdot AD}$, $B^*D^* = \tfrac{BD}{AB \cdot AD}$. The triangle inequality $B^*C^* + C^*D^* \ge B^*D^*$, multiplied by $AB \cdot AC \cdot AD$, gives $BC \cdot AD + CD \cdot AB \ge BD \cdot AC$.` },
        { q: String.raw`In triangle $ABC$ with $AB = c$ and $AC = b$, let $\Phi$ be the inversion about $A$ with radius $\sqrt{bc}$ followed by the reflection in the bisector of angle $A$. Prove that $\Phi$ swaps $B$ and $C$, and swaps the circumcircle and line $BC$.`,
          solution: String.raw`The inversion sends $B$ to the point on ray $AB$ at distance $\tfrac{bc}{c} = b$, and the reflection carries ray $AB$ to ray $AC$, so $B$ goes to the point of ray $AC$ at distance $b$, which is $C$. In the same way $C$ goes to $B$. The circumcircle passes through $A$, $B$, $C$; its image under the inversion is a line (a circle through the center becomes a line), and after the reflection it is a line through the images of $B$ and $C$, that is, line $BC$. Since $\Phi$ undoes itself, it also sends line $BC$ to the circumcircle.` }
      ],
      problems: []
    },
    "O1.4": {
      prereq: ["homothety-monge", "complex-basics", "determinant-geometric"],
      cards: ["projective-transformations", "gliding-principle", "zacks-lemma"],
      body: String.raw`Why do the meeting point of a trapezoid's legs, the meeting point of its diagonals, and the midpoints of its two bases lie on one line? If two triangles are similar and similarly oriented, what can be said of the midpoints of the segments joining their matching corners? How can a collinearity that depends on a moving point be checked at a few positions? Three ways to move a figure without changing what matters.

[[projective-transformations|A projective transformation]] maps lines to lines and keeps cross-ratios, and it can send any chosen line to the line at infinity, so that lines meeting on it become parallel. A statement about collinear points and concurrent lines can be proved in its simplest projective image. For the trapezoid, the homothety centered at the meeting point $E$ of the legs that takes the short base to the long one maps the midpoint of one base to the midpoint of the other, so both lie on a line through $E$; the homothety centered at the meeting point of the diagonals, with negative ratio, does the same, so the midpoints lie on a line through it too. The two lines share two points, the midpoints, so they are the same line.

[[gliding-principle|The gliding principle]] says that if triangles $ABC$ and $A'B'C'$ are directly similar, and points $P$, $Q$, $R$ divide $AA'$, $BB'$, $CC'$ in the same ratio, then $PQR$ is directly similar to them too. In complex numbers, $A' = sA + t$ for a spiral similarity, and $P = (1 - \lambda)A + \lambda A'$, so $Q - P = ((1 - \lambda) + \lambda s)(B - A)$, one fixed complex factor for every side. The midpoints of the joining segments, $\lambda = \tfrac12$, are the most common case.

[[zacks-lemma|Zack's lemma]] handles moving points: if points move so that their coordinates are polynomials in a parameter $t$ of degrees $a$, $b$, $c$, their collinearity determinant is a polynomial of degree at most $a + b + c$, so if they are collinear for $a + b + c + 1$ values of $t$, they are collinear for all. For $A = (t, 0)$, $B = (0, t)$, $C = (2t, -t)$, each of degree $1$, checking four values suffices, and all three lie on $x + y = t$.

Send a line to infinity to make the figure simple, use complex numbers for similar triangles, and check a moving-point claim at enough positions. The Summary follows.`,
      related: [
        { card: "cross-ratio", note: String.raw`the quantity a projective transformation keeps (O7.2).` },
        { card: "homothety-monge", note: String.raw`scalings about a point, the simplest projective maps (S9.5).` },
        { card: "complex-basics", note: String.raw`spiral similarities as $z \mapsto sz + t$.` }
      ],
      exercises: [
        { q: String.raw`In trapezoid $ABCD$ with $AB \parallel CD$, the legs $AD$ and $BC$ meet at $E$ and the diagonals meet at $F$. Prove that $E$, $F$ and the midpoints $M$ of $AB$ and $N$ of $CD$ are collinear.`,
          solution: String.raw`The homothety with center $E$ taking line $CD$ to line $AB$ sends $D$ to $A$ and $C$ to $B$, so it sends $N$ to $M$: $E$, $N$, $M$ are collinear. The homothety with center $F$ and negative ratio sends $C$ to $A$ and $D$ to $B$ (along the diagonals), so it sends $N$ to $M$: $F$, $N$, $M$ are collinear. Both lines pass through $M$ and $N$, so all four points lie on line $MN$.` },
        { q: String.raw`Triangles $ABC$ and $A'B'C'$ are directly similar. Prove that the midpoints of $AA'$, $BB'$, $CC'$ form a triangle directly similar to $ABC$, or all coincide.`,
          solution: String.raw`In complex numbers there are $s \ne 0$ and $t$ with $A' = sA + t$, $B' = sB + t$, $C' = sC + t$. The midpoints are $P = \tfrac{A + A'}{2}$ and so on, and $Q - P = \tfrac{(1 + s)(B - A)}{2}$, $R - P = \tfrac{(1 + s)(C - A)}{2}$. If $s \ne -1$, $PQR$ is the image of $ABC$ under $z \mapsto \tfrac{1 + s}{2}z + \text{const}$, a direct similarity. If $s = -1$, the midpoints all coincide.` },
        { q: String.raw`Points move by $A = (t, 0)$, $B = (0, t)$, $C = (2t, -t)$. Show that they are always collinear, and say how many values of $t$ Zack's lemma would require checking.`, answer: "4",
          solution: String.raw`All three satisfy $x + y = t$, so they lie on one line for every $t$. Each has degree $1$, so the collinearity determinant has degree at most $3$, and Zack's lemma asks for $1 + 1 + 1 + 1 = 4$ checked values.` }
      ],
      problems: []
    },
    "O1.5": {
      prereq: ["directed-angles", "phantom-point", "inversion-properties", "sqrt-bc-inversion", "projective-transformations", "gliding-principle", "zacks-lemma"],
      cards: [],
      body: String.raw`[[directed-angles|Directed angles]] make angle chases hold in every configuration, and [[phantom-point|the phantom point]] builds the point with the property and identifies it.

[[inversion-properties|Inversion]] turns circles through its center into lines, with $P^*Q^* = \tfrac{r^2 PQ}{OP \cdot OQ}$, and [[sqrt-bc-inversion|the $\sqrt{bc}$ inversion]] swaps the circumcircle and the opposite side.

[[projective-transformations|Projective transformations]] send a line to infinity, [[gliding-principle|the gliding principle]] keeps similarity along joining segments, and [[zacks-lemma|Zack's lemma]] checks a moving-point claim at finitely many positions.`,
      strategies: [
        String.raw`Use directed angles modulo $180^\circ$ whenever the configuration could be drawn more than one way.`,
        String.raw`To show a point has a property, construct the point that has it and prove it is the same point.`,
        String.raw`Invert about a point where many circles meet.`,
        String.raw`Turn products of lengths into single lengths with the inversion distance formula.`,
        String.raw`Send the line through two meeting points to infinity to make lines parallel.`,
        String.raw`For similar triangles moving together, write the similarity as $z \mapsto sz + t$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Four points $A$, $B$, $C$, $D$ satisfy $\angle(CA, CB) = \angle(DA, DB)$ for directed angles. What can be concluded?`,
        solution: String.raw`$A$, $B$, $C$, $D$ lie on one circle (or on one line), whichever sides of $AB$ the points $C$ and $D$ are on.` },
      { q: String.raw`An inversion has center $O$ and radius $6$. Points $P$, $Q$ have $OP = 3$, $OQ = 4$ and $PQ = 5$. Find $P^*Q^*$.`, answer: "15",
        solution: String.raw`$P^*Q^* = \tfrac{r^2 PQ}{OP \cdot OQ} = \tfrac{36 \cdot 5}{12} = 15$.` },
      { q: String.raw`Under an inversion with center $O$, what is the image of a circle through $O$?`,
        solution: String.raw`A line not through $O$, perpendicular to the diameter of the circle through $O$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove Ptolemy's theorem: if $ABCD$ is a convex quadrilateral inscribed in a circle, then $AB \cdot CD + BC \cdot DA = AC \cdot BD$.`,
        solution: String.raw`Invert about $A$ with radius $1$. The circle through $A$, $B$, $C$, $D$ goes to a line containing $B^*$, $C^*$, $D^*$, with $C^*$ between $B^*$ and $D^*$ since the order around the circle is $A, B, C, D$. So $B^*C^* + C^*D^* = B^*D^*$, and by the distance formula $\tfrac{BC}{AB \cdot AC} + \tfrac{CD}{AC \cdot AD} = \tfrac{BD}{AB \cdot AD}$. Multiplying by $AB \cdot AC \cdot AD$ gives $BC \cdot AD + CD \cdot AB = BD \cdot AC$.` },
      { q: String.raw`Let $M$ be the midpoint of arc $BC$ not containing $A$ of the circumcircle of triangle $ABC$, and $I$ the incenter. Prove that $MB = MI = MC$.`,
        solution: String.raw`$MB = MC$ from equal arcs. $M$ is on the bisector $AI$. Then $\angle MBI = \angle MBC + \angle CBI = \angle MAC + \tfrac B2 = \tfrac A2 + \tfrac B2$, and $\angle MIB$, an exterior angle of triangle $ABI$, is $\angle IAB + \angle IBA = \tfrac A2 + \tfrac B2$. So triangle $MBI$ is isosceles with $MB = MI$.` },
      { q: String.raw`Prove that an inversion sends a circle not through its center to a circle not through its center.`,
        solution: String.raw`Let the circle $\omega$ have power $k \ne 0$ with respect to the center $O$, so every line through $O$ meeting $\omega$ at $P$, $Q$ has $OP \cdot OQ = k$. The inversion sends $P$ to $P^*$ with $OP^* = \tfrac{r^2}{OP} = \tfrac{r^2}{k}OQ$, on the same line. So the image of $\omega$ is the image of $\omega$ under the homothety about $O$ with ratio $\tfrac{r^2}{k}$ (with a reflection through $O$ if $k \lt 0$), which is a circle, and it does not pass through $O$ since $\omega$ does not.` }
    ],
    problems: []
  }
};
