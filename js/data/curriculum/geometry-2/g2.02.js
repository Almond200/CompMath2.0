// New curriculum, Geometry II, Chapter G2.2: Power of a Point (geometry-2/G2.2).
// Written to curriculum/AUTHORING-STANDARD.md from curriculum/packets/G2.2.md. Explanations,
// figures and our own problems are original; contest statements come from the archive with its
// credits, and every solution here is our own. Every number is checked by
// tools/curriculum/verify/g2_02.py. Figures: g2.02-figures.js (generated).
//
// Body markup (rendered by js/curriculum-preview.js): blank-line paragraphs; "### " subheadings;
// "$$...$$" display math on its own paragraph; "- " bullet lists; __bold__; [[card-id]] card
// links; {{fig:name}} a figure; {{item:id}} an embedded checkpoint, example or problem from
// `items`. There are no hint fields anywhere (AUTHORING-STANDARD §2).
window.MATH_CURRICULUM = window.MATH_CURRICULUM || {};
window.MATH_CURRICULUM["geometry-2/G2.2"] = {
  title: "Power of a Point",
  opening: {
    body: String.raw`Take a circle and a point $P$ inside it, and draw a chord through $P$. The point cuts the chord into two pieces. Now turn the chord about $P$ and measure again. One piece grows and the other shrinks, and at first sight there is no reason why different chords through $P$ should have anything in common.

Here are actual measurements, for a circle of radius $5$ and a point $P$ at distance $2$ from the center $O$.

{{fig:chords-table}}

Along the diameter through $P$ the pieces are $3$ and $7$. Tilt the chord, and the pieces become $3.5$ and $6$; tilt it further, and they are $4$ and $5.25$. The chord perpendicular to $OP$ is cut into two equal pieces, each $\sqrt{21}$. The chords themselves all have different lengths: $10$, $9.5$, $9.25$ and $2\sqrt{21}\approx 9.17$. The products of the two pieces do not change. Every one of them is $21$.

{{item:open-predict}}

If this pattern is real, it is a strong statement. A single number, which belongs to the point $P$ and the circle, controls every chord through $P$ at once, whichever way the chord points. This chapter explains where that number comes from and why it ignores direction. It then shows that the same number governs lines through a point outside the circle, including the tangent lines, and puts it to work in problems where a length looks out of reach.

### What you need

- Inscribed angles: an inscribed angle is half the central angle on the same arc, so inscribed angles on the same arc are equal (G1.7.4, G1.7.5). Section 1 recalls exactly what is needed.
- The perpendicular from the center to a chord bisects it, and a radius is perpendicular to the tangent at its endpoint (G1.7.2).
- Similar triangles and proportional sides (G1.3.1); the Pythagorean theorem (G1.4.1).
- Solving a quadratic equation (A1.5).`
  },
  sections: {
    "G2.2.1": {
      body: String.raw`The surprise in the opening is about a product of two lengths. Products of lengths usually come from similar triangles. If two triangles are similar, a ratio of sides in one equals the matching ratio in the other, and a ratio equation $\dfrac{a}{b}=\dfrac{c}{d}$ is the same thing as a product equation $ad=bc$. So to explain the chords we will look for similar triangles inside the circle. Similar triangles need equal angles, and a circle supplies equal angles through one theorem.

### The inscribed angle theorem

An angle whose vertex is the center of a circle is a __central angle__; an angle whose vertex lies on the circle and whose sides are chords is an __inscribed angle__. The theorem from G1.7.4 says: __an inscribed angle is half the central angle that stands on the same arc.__

Recall why. If $C$ is on the circle and $O$ is the center, then $OA=OC=OB$, so triangles $OAC$ and $OBC$ are isosceles. The exterior angle at $O$ of triangle $OAC$ is twice the base angle at $C$, and adding the two triangles' contributions gives $\angle AOB = 2\angle ACB$. The case where $O$ lies outside angle $ACB$ is the same argument with a subtraction.

{{fig:same-arc}}

Two consequences are what this chapter uses.

- __Inscribed angles on the same arc are equal.__ If $C$ and $D$ lie on the same side of chord $AB$, then $\angle ACB$ and $\angle ADB$ are both half of $\angle AOB$, so they are equal. The side matters: a point on the other arc sees $AB$ under a different angle, as the second checkpoint below shows.
- __An angle in a semicircle is a right angle.__ If $AB$ is a diameter, the central angle is a straight angle, $180^\circ$, so every inscribed angle on it is $90^\circ$.

{{item:c-central}}

{{item:c-other-arc}}

The habit to build now is to look at a chord and ask which points see it under the same angle. In the next section two crossing chords will produce two pairs of such angles, and those pairs will be exactly what makes two triangles similar.`,
      items: {}
    },
    "G2.2.2": {
      body: String.raw`Return to two chords through a point $P$ inside the circle: chord $AB$ and chord $CD$, crossing at $P$. The opening suggests that

$$PA\cdot PB = PC\cdot PD.$$

Rewrite the goal as a ratio, $\dfrac{PA}{PC}=\dfrac{PD}{PB}$, and ask which triangles have these sides. The sides $PA$ and $PC$ belong to triangle $PAC$; the sides $PD$ and $PB$ belong to triangle $PDB$. So the goal is to show that these two triangles are similar, with $P\leftrightarrow P$, $A\leftrightarrow D$ and $C\leftrightarrow B$.

{{fig:crossing-chords}}

### The proof

The angles at $P$ are vertical angles: $\angle APC=\angle DPB$. Next, $\angle CAB$ and $\angle CDB$ are inscribed angles standing on the same arc $CB$, so they are equal. Since $P$ lies on $AB$ and on $DC$, these are the angles $\angle CAP$ and $\angle PDB$ of our two triangles. Two pairs of equal angles make the triangles similar (the third pair, $\angle ACD=\angle ABD$ on arc $AD$, agrees, as it must). Similar triangles have proportional sides:

$$\begin{gathered}\frac{PA}{PD}=\frac{PC}{PB},\\ \text{so}\quad PA\cdot PB=PC\cdot PD.\end{gathered}$$

__Intersecting chords theorem.__ If chords $AB$ and $CD$ of a circle meet at a point $P$ inside the circle, then $PA\cdot PB=PC\cdot PD$.

Look at what the proof used. It needed $P$ to be inside the circle, so that the angles at $P$ are vertical angles. It did not use any particular lengths or directions. The two chords were arbitrary, so every chord through $P$ has the same product. That is the pattern in the opening table, now explained.

### Which lengths multiply

The two lengths that multiply are the two pieces of the same chord, both measured from $P$. A common slip is to multiply $PA$ by $PC$, one piece from each chord. You can see at once that this cannot be right: turn chord $CD$ about $P$ while keeping $AB$ fixed. Then $PA$ does not change while $PC$ does, so $PA\cdot PC$ cannot stay constant.

{{item:c-basic}}

### A chord through a point on a diameter

{{item:ex-diameter}}

The example shows something the theorem alone did not say: the common product can be computed from the circle's radius and the distance $OP$ alone. With radius $r$ and $OP=d<r$, the diameter through $P$ is cut into $r-d$ and $r+d$, so every chord through $P$ has product $(r-d)(r+d)=r^2-d^2$. In the opening, $5^2-2^2=21$. This number will become the subject of Section 5.

{{item:c-shortest}}

{{item:p-hmmt07}}`,
      items: {}
    },
    "G2.2.3": {
      body: String.raw`Now move $P$ outside the circle. A line through $P$ that meets the circle twice is a __secant__. If it meets the circle at $A$ and $B$, with $A$ the nearer point, then both pieces $PA$ and $PB$ lie on the same side of $P$. Is there still a constant product?

Try the most natural line first, the one through the center. It meets the circle at distances $OP-r$ and $OP+r$ from $P$, so its product is $(OP-r)(OP+r)=OP^2-r^2$. Now turn the secant about $P$. The two intersection points slide toward each other, and at the extreme position they merge into a single point $T$: the line has become a __tangent__.

{{fig:secant-to-tangent}}

If the product really is the same for every secant, then at the tangent, where both pieces equal $PT$, the product must be $PT^2$. That is the conjecture:

$$PA\cdot PB = PT^2.$$

### A proof from the center

The angle method of Section 2 can be adapted, but there is a more revealing proof, one that computes the product directly. Drop the perpendicular from the center $O$ to the secant, meeting it at $M$. A perpendicular from the center bisects the chord (G1.7.2), so $M$ is the midpoint of $AB$ and $MA=MB$.

{{fig:center-perpendicular}}

Since $P$ is outside, $A$ lies between $P$ and $M$, so $PA=PM-MA$ and $PB=PM+MB=PM+MA$. Therefore

$$\begin{aligned}PA\cdot PB&=(PM-MA)(PM+MA)\\&=PM^2-MA^2.\end{aligned}$$

Both squares come from right triangles with the right angle at $M$. In triangle $OMP$, $PM^2=OP^2-OM^2$. In triangle $OMA$, $MA^2=r^2-OM^2$. Subtracting,

$$\begin{aligned}PA\cdot PB&=(OP^2-OM^2)\\&\qquad-(r^2-OM^2)\\&=OP^2-r^2.\end{aligned}$$

The distance $OM$, the only thing that depends on the direction of the secant, has cancelled. So every secant through $P$ has the same product $OP^2-r^2$. For the tangent, the radius $OT$ is perpendicular to $PT$, so $PT^2=OP^2-r^2$ as well.

__Tangent–secant theorem.__ If a secant from an outside point $P$ meets the circle at $A$ and $B$, and $PT$ is tangent to the circle at $T$, then $PA\cdot PB=PT^2$.

The same computation works when $P$ is inside the circle. There $P$ lies between $A$ and $B$, the pieces are $MA-PM$ and $MA+PM$, and the product is $MA^2-PM^2=r^2-OP^2$. This is a second proof of Section 2 and explains the formula $r^2-d^2$ found there. (Chapter G2.4 gives a proof of the tangent–secant theorem by similar triangles, using the tangent–chord angle.)

{{item:c-tangent}}

{{item:p-ahsme56}}

{{item:p-amc20b10}}`,
      items: {}
    },
    "G2.2.4": {
      body: String.raw`Two secants from the same outside point need no new work: each has product $PT^2$, so if one meets the circle at $A$ and $B$ and the other at $C$ and $D$,

$$PA\cdot PB=PT^2=PC\cdot PD.$$

Still, there is a reason to prove it again without the tangent. The proof by similar triangles from Section 2 carries over, and seeing it is what will let you recognise the configuration later when no circle center or tangent is anywhere in sight.

{{fig:two-secants}}

Let the secants be $PAB$ and $PCD$, with $A$ and $C$ the nearer points. Compare triangles $PAD$ and $PCB$. They share the angle at $P$. The angle at $D$ is $\angle ADC$ (since $C$ lies on $DP$), and the angle at $B$ is $\angle ABC$ (since $A$ lies on $BP$). Both are inscribed angles standing on arc $AC$, from points on the same side of chord $AC$, so they are equal. Hence $PAD\sim PCB$ with $A\leftrightarrow C$ and $D\leftrightarrow B$, and

$$\begin{gathered}\frac{PA}{PC}=\frac{PD}{PB},\\ \text{so}\quad PA\cdot PB=PC\cdot PD.\end{gathered}$$

__Intersecting secants theorem.__ If two secants from an outside point $P$ meet a circle at $A,B$ and at $C,D$, then $PA\cdot PB=PC\cdot PD$.

### One rule for all three pictures

In every case so far the rule reads the same way: along a line through $P$, multiply the distances from $P$ to the two points where the line meets the circle. For a chord through an inside point these are the two pieces; for a secant they are the near and the far distance; for a tangent both are $PT$. The lengths are always measured from $P$.

{{item:ex-error}}

{{item:c-secants}}`,
      items: {}
    },
    "G2.2.5": {
      body: String.raw`Collect what the last three sections found. For any line through $P$ that meets the circle at $A$ and $B$:

- if $P$ is inside, $PA\cdot PB=r^2-OP^2$;
- if $P$ is outside, $PA\cdot PB=OP^2-r^2$, which is also $PT^2$;
- if $P$ is on the circle, one of the two points is $P$ itself and the product is $0$.

{{fig:power-cases}}

The three lines are one formula up to sign. This suggests giving the number its own name.

__Definition.__ The __power__ of a point $P$ with respect to a circle with center $O$ and radius $r$ is

$$\operatorname{pow}(P)=OP^2-r^2.$$

The power is negative when $P$ is inside the circle, zero when $P$ is on it, and positive when $P$ is outside. In every case, for every line through $P$ meeting the circle at $A$ and $B$,

$$PA\cdot PB=|\operatorname{pow}(P)|.$$

The sign carries real information. Measure lengths along the line with a direction, so that a length pointing one way is positive and the other way negative. From an outside point, $A$ and $B$ lie in the same direction and the product of the signed lengths is positive; from an inside point they lie in opposite directions and the product is negative. With signed lengths the statement becomes a single equation with no cases: $\overline{PA}\cdot\overline{PB}=\operatorname{pow}(P)$.

### Why a single number is worth having

The power depends only on the distance $OP$ and the radius. It needs no line at all. That has three consequences you will use constantly.

- __A length from two distances.__ If you know how far $P$ is from the center and the radius, you know the product of the pieces on every line through $P$, and you know the tangent length $\sqrt{OP^2-r^2}$, without drawing anything.
- __A distance from a length.__ If you know one product through $P$, you know $OP^2-r^2$, and with the radius that gives $OP$.
- __A bridge to coordinates.__ For a circle $(x-a)^2+(y-b)^2=r^2$ and a point $(x_0,y_0)$, the power is $(x_0-a)^2+(y_0-b)^2-r^2$: substitute the point into the left side minus the right side. Chapter G2.6 uses this to decide inside or outside by a sign, and Chapter G3.3 uses points of equal power with respect to two circles.

{{item:c-power-out}}

{{item:c-power-in}}

{{item:p-amc20b12}}

{{item:p-ahsme95}}`,
      items: {}
    },
    "G2.2.6": {
      body: String.raw`Knowing the theorem is the easy part. In a contest problem nobody labels the point whose power you should use, and the circle or the second intersection is often not drawn. This section is about finding them. Four habits do most of the work.

### Choose the point, then write one equation for it

Power of a point is a statement about one point. So the first question is always: through which point do two known (or related) lines meet the circle? Each such point gives one equation. With two unknown lengths you usually need two points.

{{fig:two-points}}

{{item:p-hmmt06}}

### Look for the circle you are not shown

A problem that says "the circle with center $A$ through $B$" has handed you a circle and a radius, $AB$. Any point whose distance from $A$ you know then has a known power, and any line through that point that meets the circle twice gives an equation. Ask: which points have known distances to the center? Which lines through them meet the circle twice?

{{fig:hidden-circle}}

{{item:p-amc13}}

### Notice a tangent hiding as a right angle

A radius is perpendicular to the tangent at its endpoint, and conversely a line perpendicular to a radius at its endpoint is a tangent. So a right angle at a point of the circle, with one side through the center, announces a tangent, and therefore a power.

{{item:ex-hidden-tangent}}

### Know when power is not enough

Power gives one equation per point. A problem can still have more unknowns than that.

{{item:ex-not-enough}}

{{item:c-not-enough}}

### Summary of the strategy

- Find the point: where do two lines meet that both cut, or touch, the circle?
- If the circle is hidden, name it: a center and a radius, a right angle in a semicircle, a point equidistant from three others.
- Write one equation per point, with lengths measured from that point to both intersections.
- Count unknowns and equations. If you are short, look for a second point, a right triangle with the center, or a ratio from similar triangles.`,
      items: {}
    }
  },
  close: {
    body: String.raw`### What this chapter established

A point $P$ and a circle determine one number, the power $\operatorname{pow}(P)=OP^2-r^2$. For every line through $P$ that meets the circle at $A$ and $B$, the product $PA\cdot PB$ of the distances from $P$ equals $|\operatorname{pow}(P)|$; for a tangent it is $PT^2$. You have seen two proofs. Similar triangles built from inscribed angles explain why the product is shared by two lines. The perpendicular from the center explains why its value is $OP^2-r^2$, whatever the line.

### Signals to look for

- Two lines through one point, each meeting a circle twice, or once at a tangent.
- A length along a chord or a secant that you cannot reach with right triangles alone.
- A known distance from a point to a circle's center, or a known tangent length.
- A problem that gives integer lengths along a line through a circle: the product will be an integer with few factorisations.

### Where this goes next

Turn the theorem around. Suppose segments $AB$ and $CD$ cross at $P$ and you are told only that $PA\cdot PB=PC\cdot PD$. No circle is drawn.

{{fig:converse}}

The equation says $\dfrac{PA}{PC}=\dfrac{PD}{PB}$, and the angles at $P$ are vertical angles, so triangles $PAC$ and $PDB$ are similar by SAS. That gives $\angle CAB=\angle CDB$: the points $A$ and $D$ see segment $CB$ under the same angle, exactly the relation that inscribed angles on one arc have. Must the four points then lie on one circle? Chapter G2.3, Cyclic Quadrilaterals I, answers this. Equal products become one of several tests for when four points are concyclic, and from then on, power of a point is used not only to find lengths but to discover circles.

### Reference cards

Short reference versions of this chapter's results: [[power-of-a-point]] (the three cases and the signed power), [[tangent-facts]] (tangent lengths and the radius–tangent right angle) and [[chord-length]] (a chord from the radius and its distance to the center).`
  },
  items: {
    "open-predict": {
      type: "check",
      q: String.raw`A fifth chord through the same point $P$ has one piece of length $4.2$. If the pattern holds, how long is the other piece?`,
      answer: "5",
      why: String.raw`The product must be $21$, so the other piece is $21/4.2=5$. (The chord is $9.2$ long, which fits: every chord through $P$ is between $2\sqrt{21}\approx9.17$ and $10$ long.)`
    },
    "c-central": {
      type: "check",
      q: String.raw`Points $A$, $B$ and $C$ lie on a circle with center $O$, and $\angle AOB=110^\circ$, where this central angle stands on the arc $AB$ that does not contain $C$. Find $\angle ACB$ in degrees.`,
      answer: "55",
      why: String.raw`An inscribed angle is half the central angle on the same arc: $110^\circ/2=55^\circ$.`
    },
    "c-other-arc": {
      type: "check",
      q: String.raw`In the same circle, $D$ is a point on the arc $AB$ that does not contain $C$ (the short arc). Find $\angle ADB$ in degrees.`,
      answer: "125",
      why: String.raw`From $D$, the angle $\angle ADB$ stands on the other arc $AB$, the one containing $C$, whose central angle is $360^\circ-110^\circ=250^\circ$. Half of it is $125^\circ$. So points on opposite sides of a chord see it under angles that add to $180^\circ$; Chapter G2.3 builds on this.`
    },
    "c-basic": {
      type: "check",
      q: String.raw`Chords $AB$ and $CD$ meet at $P$ inside a circle, with $PA=4$, $PB=6$ and $PC=3$. Find $PD$.`,
      answer: "8",
      why: String.raw`$PC\cdot PD=PA\cdot PB=24$, so $PD=24/3=8$.`
    },
    "ex-diameter": {
      type: "example",
      title: "Every chord through a point at distance 5 from the center",
      body: String.raw`__Problem.__ A circle has radius $13$, and $P$ is a point at distance $5$ from the center $O$. What is the product of the two pieces of a chord through $P$, and how short can such a chord be?

__Choosing an approach.__ The theorem says every chord through $P$ has the same product, so compute it on the most convenient chord: the diameter through $P$.

{{fig:diameter-point}}

__Solution.__ The diameter $EF$ through $P$ is cut into $PE=13+5=18$ and $PF=13-5=8$. So every chord through $P$ has product $18\cdot 8=144$.

A chord whose pieces are $a$ and $b$ has length $a+b$, with $ab=144$. Since $(a+b)^2=(a-b)^2+4ab=(a-b)^2+576$, the length is smallest when $a=b=12$, giving $24$. Equal pieces mean $P$ is the midpoint of the chord, and the chord whose midpoint is $P$ is the one perpendicular to $OP$ (G1.7.2). In the figure that chord is $GH$. As a check, by Pythagoras its half-length is $\sqrt{13^2-5^2}=12$.`
    },
    "c-shortest": {
      type: "check",
      q: String.raw`A circle has radius $10$ and $P$ is at distance $6$ from its center. Find the length of the shortest chord through $P$.`,
      answer: "16",
      why: String.raw`The common product is $10^2-6^2=64$. The shortest chord has equal pieces, $8$ and $8$, so its length is $16$.`
    },
    "p-hmmt07": {
      type: "archive", slug: "2007-hmmt-february-geometry-2", role: "Try it",
      answer: "2", prompt: "Enter the value of BP.",
      solution: String.raw`The chords $AC$ and $BD$ cross at $P$, so $BP\cdot DP=AP\cdot PC=8\cdot1=8$. Also $BP+DP=BD=6$. So $BP$ and $DP$ are the two roots of $t^2-6t+8=0$, that is, $2$ and $4$. Since $BP<DP$, $BP=2$.`
    },
    "c-tangent": {
      type: "check",
      q: String.raw`From an outside point $P$, a secant meets a circle at $A$ and $B$ with $PA=4$ and $PB=9$. Find the length of a tangent from $P$ to the circle.`,
      answer: "6",
      why: String.raw`$PT^2=PA\cdot PB=36$, so $PT=6$.`
    },
    "p-ahsme56": {
      type: "archive", slug: "1956-ahsme-14", role: "Worked example", worked: true,
      solution: String.raw`__Setting up.__ The tangent from $P$ touches at $A$, and the secant through $P$ meets the circle at $B$ and then $C$, with $B$ between $C$ and $P$. Let $PB=x$; then $PC=x+20$.

__The equation.__ The tangent–secant theorem gives $PA^2=PB\cdot PC$:

$$\begin{gathered}300=x(x+20),\\ x^2+20x-300=0,\\ (x-10)(x+30)=0.\end{gathered}$$

A length is positive, so $x=10$: $PB=10$, choice (B). The rejected root $-30$ is not a second configuration; it simply does not describe a length.`
    },
    "p-amc20b10": {
      type: "archive", slug: "2020-amc-12b-10", role: "Finish this one",
      answer: "sqrt(5)/10", prompt: "Enter the value of AP.",
      partial: String.raw`__The idea.__ $A$ lies outside the circle, and line $AM$ is a secant through $A$: it meets the circle at $P$ and at $M$. So the tangent–secant theorem gives $AP\cdot AM=(\text{tangent from }A)^2$.

__Two lengths you need.__ The inscribed circle of a unit square touches each side at its midpoint, so the tangent from $A$ along side $AB$ has length $\tfrac12$. The point $M$ is the midpoint of $CD$, so $AM=\sqrt{AD^2+DM^2}=\sqrt{1+\tfrac14}=\tfrac{\sqrt5}{2}$.

__Your step.__ Finish the computation of $AP$.`,
      solution: String.raw`$AP\cdot\dfrac{\sqrt5}{2}=\left(\dfrac12\right)^2=\dfrac14$, so $AP=\dfrac14\cdot\dfrac{2}{\sqrt5}=\dfrac{1}{2\sqrt5}=\dfrac{\sqrt5}{10}$, choice (B).`
    },
    "ex-error": {
      type: "example",
      title: "Two secants, and a tempting mistake",
      body: String.raw`__Problem.__ From an outside point $P$, one secant meets a circle at $A$ and $B$ with $PA=4$ and $AB=5$. A second secant meets it at $C$ and $D$, with $C$ nearer, and $PC=3$. Find $CD$.

__Solution.__ The distances from $P$ are $PA=4$ and $PB=4+5=9$, so the common product is $36$. Then $PD=36/3=12$ and $CD=PD-PC=9$.

__The mistake.__ It is tempting to multiply the outside piece by the chord, writing $PA\cdot AB=PC\cdot CD$, that is, $4\cdot5=3\cdot CD$. That gives $CD=\tfrac{20}{3}$, a plausible-looking but wrong answer. The chord $AB$ is not a distance from $P$. Section 3's proof shows why only $PA\cdot PB$ is constant: it equals $PM^2-MA^2$, and nothing like that holds for $PA\cdot AB$. Concretely, as a secant turns toward the tangent, its chord shrinks to $0$ while $PA$ stays positive, so $PA\cdot AB$ goes to $0$, whereas $PA\cdot PB$ stays at $PT^2$.`
    },
    "c-secants": {
      type: "check",
      q: String.raw`From an outside point $P$, a secant meets a circle at $A$ and $B$ with $PA=5$ and $AB=7$. A second secant meets it at $C$ and $D$ with $PC=4$, $C$ nearer to $P$. Find $CD$.`,
      answer: "11",
      why: String.raw`$PA\cdot PB=5\cdot12=60$, so $PD=60/4=15$ and $CD=15-4=11$.`
    },
    "c-power-out": {
      type: "check",
      q: String.raw`A circle has radius $5$, and $P$ is at distance $13$ from its center. Find the length of a tangent from $P$.`,
      answer: "12",
      why: String.raw`$\operatorname{pow}(P)=13^2-5^2=144$, and the tangent length is $\sqrt{144}=12$.`
    },
    "c-power-in": {
      type: "check",
      q: String.raw`A circle has radius $7$, and $P$ is at distance $3$ from its center. A chord through $P$ has one piece of length $5$. Find the other piece.`,
      answer: "8",
      why: String.raw`$\operatorname{pow}(P)=3^2-7^2=-40$, so the pieces multiply to $40$, and the other piece is $40/5=8$.`
    },
    "p-amc20b12": {
      type: "archive", slug: "2020-amc-12b-12", role: "Worked example", worked: true,
      solution: String.raw`__What the question really asks.__ The target $CE^2+DE^2$ is a sum of squares of the two pieces of chord $CD$ through $E$. Write it as $(CE+DE)^2-2\,CE\cdot DE=CD^2-2\,CE\cdot DE$. Now both parts are things power of a point and chord geometry control.

__The product.__ With $O$ the center and $R^2=50$, the point $E$ is inside the circle, so $CE\cdot DE=R^2-OE^2=50-OE^2$.

__The chord.__ The distance from $O$ to line $CD$ is $OE\sin45^\circ=\dfrac{OE}{\sqrt2}$, because the line makes a $45^\circ$ angle with $OE$ (which lies along $AB$). A chord at distance $h$ from the center has half-length $\sqrt{R^2-h^2}$, so

$$\begin{aligned}CD^2&=4\left(50-\frac{OE^2}{2}\right)\\&=200-2\,OE^2.\end{aligned}$$

__Putting it together.__ $CE^2+DE^2=200-2\,OE^2-2(50-OE^2)=100$, choice (E).

__The lesson.__ $OE$ cancelled. The value $BE=2\sqrt5$ in the problem never mattered: every chord through every point of $AB$ at $45^\circ$ gives $100$. A problem that supplies a number you never use is often telling you that the answer is an invariant.`
    },
    "p-ahsme95": {
      type: "archive", slug: "1995-ahsme-26", role: "Try it",
      answer: "24pi", prompt: "Enter the area of the circle (type pi for π).",
      solution: String.raw`Let the radius be $r$ and $OE=x$. Two facts are available.

__Power of $E$.__ $E$ is inside the circle on chord $DF$, so $DE\cdot EF=r^2-x^2$, that is, $r^2-x^2=6\cdot2=12$.

__A right triangle.__ $CD\perp AB$, so triangle $DOE$ has a right angle at $O$, and $DE^2=OD^2+OE^2$, that is, $r^2+x^2=36$.

Adding the two equations gives $2r^2=48$, so $r^2=24$ and the area is $24\pi$, choice (C). (Then $x^2=12$, so $E$ is indeed inside the circle.) Notice the pattern from Section 6 in advance: power gave one equation, and the right triangle with the center gave the second.`
    },
    "p-hmmt06": {
      type: "archive", slug: "2006-hmmt-february-geometry-3", role: "Worked example", worked: true,
      solution: String.raw`__Finding the points.__ The unknown lengths lie on line $XY$, and two points of that line are on known chords: $P$ on $AB$ and $Q$ on $CD$. Each gives one equation, which is exactly what two unknowns need.

__Naming the unknowns.__ $P$ and $Q$ are inside the circle (they lie on chords), so the order along the line is $X,P,Q,Y$. Let $XP=x$ and $QY=y$. Then $PY=27+y$ and $QX=27+x$. On the chords, $PB=11-6=5$ and $QD=19-7=12$.

__The two equations.__

$$\begin{aligned}\text{at }P:&\quad x(27+y)=6\cdot5=30,\\ \text{at }Q:&\quad y(27+x)=7\cdot12=84.\end{aligned}$$

__Solving.__ Subtracting the first from the second, $27y-27x=54$, so $y=x+2$. Substituting, $x(x+29)=30$, so $x^2+29x-30=(x-1)(x+30)=0$ and $x=1$, $y=3$. Hence $XY=1+27+3=31$.

__Checking.__ $1\cdot30=30$ and $3\cdot28=84$. Both equations hold, and the positive root was the only admissible one.`
    },
    "p-amc13": {
      type: "archive", slug: "2013-amc-10a-23", role: "Try it",
      answer: "61", prompt: "Enter the value of BC.",
      solution: String.raw`__The hidden power.__ The circle has center $A$ and radius $AB=86$. The point $C$ has $CA=97>86$, so it is outside, with power $97^2-86^2=(97-86)(97+86)=11\cdot183=2013$. Line $CB$ meets the circle at $X$ and $B$, so

$$CX\cdot CB=2013.$$

__Using integrality.__ $BX$ and $CX$ are integers, so $CB=CX+XB$ is too. Thus $CX$ and $CB$ are complementary divisors of $2013=3\cdot11\cdot61$ with $CX<CB$: the pairs are $(1,2013)$, $(3,671)$, $(11,183)$ and $(33,61)$.

__Using the triangle.__ The triangle inequality requires $97-86<BC<97+86$, that is, $11<BC<183$. Only $(33,61)$ survives, so $BC=61$, with $CX=33$ and $BX=28$, choice (D). Such a triangle exists, since $61$, $86$ and $97$ satisfy the triangle inequality. (This step is number theory, the factor pairs of N1.4, serving geometry.)`
    },
    "ex-hidden-tangent": {
      type: "example",
      title: "A tangent you have to notice",
      body: String.raw`__Problem.__ Triangle $ABC$ has a right angle at $C$, with $AC=6$ and $BC=8$. The circle with diameter $BC$ meets $AB$ again at $D$. Find $AD$.

__Looking for the point.__ The circle has diameter $BC$, so its center is the midpoint of $BC$, and $C$ is on the circle. The segment $AC$ is perpendicular to $BC$ at $C$, so it is perpendicular to a radius at its endpoint: $AC$ is a __tangent__ to the circle. The point $A$ is therefore outside the circle, with one tangent ($AC$) and one secant ($ADB$) through it.

__Solution.__ By the tangent–secant theorem, $AC^2=AD\cdot AB$. Here $AB=\sqrt{6^2+8^2}=10$, so $36=10\,AD$ and $AD=\tfrac{18}{5}$.

__A check by another route.__ $\angle BDC$ is an angle in a semicircle, so $CD\perp AB$: $D$ is the foot of the altitude. The altitude-to-hypotenuse relation $AC^2=AD\cdot AB$ (G1.4.3) is the same equation, so the two methods agree. Power of a point explains why that familiar relation holds.`
    },
    "ex-not-enough": {
      type: "example",
      title: "When one equation is not enough",
      body: String.raw`__Problem.__ From a point $P$, a secant meets a circle at $A$ and $B$ with $PA=4$ and $PB=9$. Can you find the radius, or the distance from $P$ to the center?

__What power gives.__ $OP^2-r^2=PA\cdot PB=36$. That is one equation in two unknowns, $OP$ and $r$, so neither is determined. Indeed, $r=8$ with $OP=10$ and $r=\sqrt{13}$ with $OP=7$ both fit: power of a point fixes the difference $OP^2-r^2$ and nothing more.

__What would finish it.__ One more independent fact: the radius, or the distance $OP$, or the distance from $O$ to the secant (then the right triangles of Section 3 give $MA$ and $PM$, hence everything). When a problem seems to need a length that power cannot reach, count equations before computing.`
    },
    "c-not-enough": {
      type: "check",
      q: String.raw`In the example above, suppose you also learn that the radius is $8$. Find $OP$.`,
      answer: "10",
      why: String.raw`$OP^2=36+r^2=36+64=100$, so $OP=10$.`
    },
    "r1": {
      type: "exercise",
      q: String.raw`Chords $AB$ and $CD$ of a circle meet at $P$, with $PA=5$, $PB=8$ and $CD=14$. If $PC<PD$, find $PC$.`,
      answer: "4",
      solution: String.raw`$PC\cdot PD=PA\cdot PB=40$ and $PC+PD=14$, so $PC$ and $PD$ are the roots of $t^2-14t+40=0$, namely $4$ and $10$. With $PC<PD$, $PC=4$.`
    },
    "r2": {
      type: "exercise",
      q: String.raw`From a point $P$, a tangent to a circle has length $12$, and a secant through $P$ meets the circle at $A$ and $B$ with $A$ between $P$ and $B$ and $AB=7$. Find $PA$.`,
      answer: "9",
      solution: String.raw`Let $PA=x$, so $PB=x+7$. Then $x(x+7)=144$, so $x^2+7x-144=(x-9)(x+16)=0$ and $x=9$.`
    },
    "r3": {
      type: "exercise",
      q: String.raw`A chord through a point $P$ inside a circle of radius $10$ is cut by $P$ into pieces of lengths $4$ and $9$. How far is $P$ from the center?`,
      answer: "8",
      solution: String.raw`$r^2-OP^2=4\cdot9=36$, so $OP^2=100-36=64$ and $OP=8$.`
    },
    "r4": {
      type: "exercise",
      q: String.raw`A circle has radius $9$, and $P$ is at distance $15$ from its center. A line through $P$ meets the circle at $A$ and $B$, with $A$ between $P$ and $B$ and $AB=3\,PA$. Find $PA$.`,
      answer: "6",
      solution: String.raw`$\operatorname{pow}(P)=15^2-9^2=144=PA\cdot PB$. With $PA=x$, $PB=x+3x=4x$, so $4x^2=144$ and $x=6$. (Then $PB=24=15+9$: the line passes through the center, as it must, since $PB-PA=18$ is a diameter.)`
    },
    "r5": {
      type: "exercise",
      q: String.raw`Chord $AB$ of a circle has length $13$, and $P$ is the point of $AB$ with $PA=4$. Chord $CD$ passes through $P$, is perpendicular to $AB$, and has $P$ as its midpoint. Find $CD$.`,
      answer: "12",
      solution: String.raw`$PC\cdot PD=PA\cdot PB=4\cdot9=36$. Since $P$ is the midpoint of $CD$, $PC=PD=6$, so $CD=12$. (The data force more than they say. A chord is bisected at $P$ only when it is perpendicular to $OP$, so $OP\parallel AB$; since $P$ is on $AB$, the chord $AB$ passes through the center and is a diameter, of radius $6.5$. Check: $OP=2.5$ and $\sqrt{6.5^2-2.5^2}=6$.)`
    },
    "r6": {
      type: "exercise",
      q: String.raw`A point $P$ is at distance $10$ from the center of a circle of radius $6$. A secant through $P$ meets the circle at $A$ and $B$ with $PA=AB$. Find $PA$.`,
      answer: "4sqrt(2)",
      solution: String.raw`$\operatorname{pow}(P)=100-36=64$. With $PA=x$, $PB=2x$, so $2x^2=64$ and $x=4\sqrt2$. Such a secant exists. Its chord's midpoint $M$ would be at distance $PM=6\sqrt2$ from $P$, so $OM^2=OP^2-PM^2=100-72=28$ and $MA^2=r^2-OM^2=36-28=8$. That gives $MA=2\sqrt2$ and $PA=PM-MA=4\sqrt2$, as required.`
    },
    "ch1": {
      type: "archive", slug: "2001-aime-ii-6", role: "Challenge",
      answer: "251", prompt: "Enter the requested value 10n + m.",
      solution: String.raw`__Setting up.__ Give square $ABCD$ side $2$ and center at the origin, so its circumcircle has radius $\sqrt2$, with $CD$ on the line $y=-1$. Square $EFGH$ has side $s$, with $E$ and $F$ on $CD$ and $G$, $H$ on the circle. By symmetry about the vertical axis, $E=(-\tfrac s2,-1)$ and $F=(\tfrac s2,-1)$, and $G=(\tfrac s2,-1-s)$, $H=(-\tfrac s2,-1-s)$ lie below $CD$.

__The point and its two lines.__ $F$ is inside the circle, on chord $CD$ and on the vertical chord through $F$ and $G$. On $CD$ (from $x=-1$ to $x=1$), $F$ cuts the chord into $1+\tfrac s2$ and $1-\tfrac s2$. The vertical chord through $F$ is symmetric about the horizontal diameter $y=0$, so it runs from $y=-1-s$ up to $y=1+s$: from $F$ the pieces are $s$ and $2+s$.

__The equation.__ $s(2+s)=\left(1-\tfrac s2\right)\left(1+\tfrac s2\right)=1-\tfrac{s^2}{4}$, so $\tfrac54s^2+2s-1=0$, that is, $5s^2+8s-4=(5s-2)(s+2)=0$, and $s=\tfrac25$.

__The answer.__ The area ratio is $\dfrac{s^2}{2^2}=\dfrac{4/25}{4}=\dfrac1{25}$, so $m=1$, $n=25$ and $10n+m=251$. Check: $G=(\tfrac15,-\tfrac75)$ has $\tfrac1{25}+\tfrac{49}{25}=2$, so it is on the circle.`
    },
    "ch2": {
      type: "archive", slug: "2024-hmmt-february-geometry-3", role: "Challenge",
      answer: "42", prompt: "Enter the length of the chord.",
      solution: String.raw`__Positions along the chord.__ Let the chord of $\Omega$ be $AD$, cut by $\omega$ at $B$ and $C$ with $AB:BC:CD=1:2:3$. Put $AB=k$, so $AD=6k$, and measured from $A$ the points are at $0,\ k,\ 3k,\ 6k$. The midpoint of $AD$ is at $3k$: it is $C$.

__What the midpoint gives.__ The perpendicular from the center $O$ of $\Omega$ to a chord meets it at the chord's midpoint, so $OC\perp AD$. If $C=O$, the chord passes through the center and is a diameter, which is excluded. Otherwise $\angle OCB=90^\circ$. The points $O$, $C$ and $B$ all lie on $\omega$ (the center of $\Omega$ is on $\omega$), so the right angle at $C$ makes $OB$ a diameter of $\omega$: $OB=122$.

__Power of $B$ with respect to $\Omega$.__ $B$ is inside $\Omega$, so $BA\cdot BD=123^2-OB^2=123^2-122^2=245$. But $BA\cdot BD=k\cdot5k=5k^2$, so $k^2=49$, $k=7$ and the chord is $6k=42$.

__Checking the configuration.__ With $k=7$: $C$ is the chord's midpoint, so $OC^2=123^2-21^2=14688$, and $OB^2=OC^2+CB^2=14688+14^2=14884=122^2$. Consistent. (In the excluded case $C=O$ the same ratio conditions give the diameter $246$.)`
    },
    "ch3": {
      type: "archive", slug: "2024-aime-i-5", role: "Challenge",
      answer: "104", prompt: "Enter CE.",
      solution: String.raw`__Coordinates.__ Put line $DF$ on the $x$-axis with $D=(0,0)$, so $A=(0,16)$. Let $E=(e,0)$ with $0<e<107$; then $F=(e+184,0)$, $H=(e,-17)$ and $G=(e+184,-17)$.

__The center.__ The center of the circle through $A,D,H,G$ is on the perpendicular bisector of $AD$, the line $y=8$, and on that of $HG$, the line $x=e+92$.

__Two lines through $E$.__ The $x$-axis meets the circle at $D$ and at the reflection of $D$ in $x=e+92$, namely $(2e+184,0)$. From $E$ these are at distances $e$ and $e+184$, on opposite sides. The vertical line $x=e$ meets the circle at $H=(e,-17)$ and at its reflection in $y=8$, namely $(e,33)$. From $E$ these are at distances $17$ and $33$, again on opposite sides. So $E$ is inside the circle, and its power gives

$$\begin{gathered}e(e+184)=17\cdot33=561,\\ e^2+184e-561=(e-3)(e+187)=0.\end{gathered}$$

So $e=3$ and $CE=DC-DE=107-3=104$. The configuration is valid: $D,E,C,F$ are in order since $0<3<107<187$.`
    }
  },
  review: { title: "Review Problems", items: ["r1", "r2", "r3", "r4", "r5", "r6"] },
  challenge: { title: "Challenge Problems", items: ["ch1", "ch2", "ch3"] }
};
