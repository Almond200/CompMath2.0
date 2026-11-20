// Problems and diagrams © 2025 HMMT. Reproduced with permission from HMMT.
// Source: the official HMMT individual-round papers.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2025-hmmt-february-algebra-and-number-theory-1": { s: String.raw`Compute the sum of the positive divisors (including 1) of 9! that have units digit 1.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-2": { s: String.raw`Mark writes the expression $\sqrt{abcd}$ on the board, where $abcd$ is a four-digit number and $a \neq 0$. Derek, a toddler, decides to move the $a$, changing Mark's expression to $a\sqrt{bc}$. Surprisingly, these two expressions are equal. Compute the only possible four-digit number $abcd$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-3": { s: String.raw`Given that $x$, $y$, and $z$ are positive real numbers such that

$$x^{\log_{2}(yz)} = 2^{8} \cdot 3^{4}, \quad y^{\log_{2}(zx)} = 2^{9} \cdot 3^{6}, \quad \text{and} \quad z^{\log_{2}(xy)} = 2^{5} \cdot 3^{10},$$

compute the smallest possible value of $xyz$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-4": { s: String.raw`Let $\lfloor z\rfloor$ denote the greatest integer less than or equal to $z$. Compute

$$\sum_{j = -1000}^{1000} \left\lfloor \frac{2025}{j + 0.5} \right\rfloor .$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-5": { s: String.raw`Let $\mathcal{S}$ be the set of all nonconstant monic polynomials $P$ with integer coefficients satisfying $P\left(\sqrt{3} + \sqrt{2}\right) = P\left(\sqrt{3} - \sqrt{2}\right)$. If $Q$ is an element of $\mathcal{S}$ with minimal degree, compute the only possible value of $Q(10) - Q(0)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-6": { s: String.raw`Let $r$ be the remainder when $2017^{2025!} - 1$ is divided by 2025!. Compute $\frac{r}{2025!}$. (Note that 2017 is prime.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-7": { s: String.raw`There exists a unique triple $(a,b,c)$ of positive real numbers that satisfies the equations

$$2(a^{2} + 1) = 3(b^{2} + 1) = 4(c^{2} + 1)\quad \mathrm{and}\quad ab + bc + ca = 1.$$

Compute $a + b + c$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-8": { s: String.raw`Define $\operatorname {sgn}(x)$ to be 1 when $x$ is positive, $-1$ when $x$ is negative, and 0 when $x$ is 0. Compute

$$\sum_{n = 1}^{\infty}\frac{\operatorname{sgn}(\sin(2^{n}))}{2^{n}}.$$

(The arguments to sin are in radians.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-9": { s: String.raw`Let $f$ be the unique polynomial of degree at most 2026 such that for all $n\in \{1,2,3,\ldots ,2027\}$

Suppose that $\frac{a}{b}$ is the coefficient of $x^{2025}$ in $f$, where $a$ and $b$ are integers such that $\gcd (a,b) = 1$. Compute the unique integer $r$ between 0 and 2026 (inclusive) such that $a - rb$ is divisible by 2027. (Note that 2027 is prime.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-algebra-and-number-theory-10": { s: String.raw`Let $a$, $b$, and $c$ be pairwise distinct complex numbers such that

$$a^{2} = b + 6,\quad b^{2} = c + 6,\quad \mathrm{and}\quad c^{2} = a + 6.$$

Compute the two possible values of $a + b + c$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/algnt/problems.pdf" },
"2025-hmmt-february-combinatorics-1": { s: String.raw`Compute the number of ways to arrange the numbers 1, 2, 3, 4, 5, 6, and 7 around a circle such that the product of every pair of adjacent numbers on the circle is at most 20. (Rotations and reflections count as different arrangements.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-2": { s: String.raw`Kelvin the frog is on the bottom-left lily pad of a $3\times 3$ grid of lily pads, and his home is at the topright lily pad. He can only jump between two lily pads which are horizontally or vertically adjacent. Compute the number of ways to remove 4 of the lily pads so that the bottom-left and top-right lily pads both remain, but Kelvin cannot get home.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-3": { s: String.raw`Ben has 16 balls labeled 1, 2, 3, ..., 16, as well as 4 indistinguishable boxes. Two balls are neighbors if their labels differ by 1. Compute the number of ways for him to put 4 balls in each box such that each ball is in the same box as at least one of its neighbors. (The order in which the balls are placed does not matter.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-4": { s: String.raw`Sophie is at $(0,0)$ on a coordinate grid and would like to get to $(3,3)$. If Sophie is at $(x,y)$, in a single step she can move to one of $(x + 1,y)$, $(x,y + 1)$, $(x - 1,y + 1)$, or $(x + 1,y - 1)$. She cannot revisit any points along her path, and neither her $x$ - coordinate nor her $y$ - coordinate can ever be less than 0 or greater than 3. Compute the number of ways for Sophie to reach $(3,3)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-5": { s: String.raw`In an $11 \times 11$ grid of cells, each pair of edge-adjacent cells is connected by a door. Karthik wants to walk a path in this grid. He can start in any cell, but he must end in the same cell he started in, and he cannot go through any door more than once (not even in opposite directions). Compute the maximum number of doors he can go through in such a path.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-6": { s: String.raw`Compute the number of ways to pick two rectangles in a $5 \times 5$ grid of squares such that the edges of the rectangles lie on the lines of the grid and the rectangles do not overlap at their interiors, edges, or vertices. The order in which the rectangles are chosen does not matter.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-7": { s: String.raw`Compute the number of ways to arrange 3 copies of each of the 26 lowercase letters of the English alphabet such that for any two distinct letters $x_{1}$ and $x_{2}$, the number of $x_{2}$ 's between the first and second occurrences of $x_{1}$ equals the number of $x_{2}$ 's between the second and third occurrences of $x_{1}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-8": { s: String.raw`Albert writes 2025 numbers $a_{1}$, ..., $a_{2025}$ in a circle on a blackboard. Initially, each of the numbers is uniformly and independently sampled at random from the interval $[0,1]$. Then, each second, he simultaneously replaces $a_{i}$ with $\max (a_{i - 1}, a_{i}, a_{i + 1})$ for all $i = 1, 2, \ldots , 2025$ (where $a_{0} = a_{2025}$ and $a_{2026} = a_{1}$ ). Compute the expected value of the number of distinct values remaining after 100 seconds.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-9": { s: String.raw`Two points are selected independently and uniformly at random inside a regular hexagon. Compute the probability that a line passing through both of the points intersects a pair of opposite edges of the hexagon.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-combinatorics-10": { s: String.raw`The circumference of a circle is divided into 45 arcs, each of length 1. Initially, there are 15 snakes, each of length 1, occupying every third arc. Every second, each snake independently moves either one arc left or one arc right, each with probability $\frac{1}{2}$. If two snakes ever touch, they merge to form a single snake occupying the arcs of both of the previous snakes, and the merged snake moves as one snake. Compute the expected number of seconds until there is only one snake left.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/comb/problems.pdf" },
"2025-hmmt-february-geometry-1": { s: String.raw`Equilateral triangles $\triangle ABC$ and $\triangle DEF$ are drawn such that points $B$, $E$, $F$, and $C$ lie on a line in this order, and point $D$ lies inside triangle $\triangle ABC$. If $BE = 14$, $EF = 15$, and $FC = 16$, compute $AD$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-2": { s: String.raw`In a two-dimensional cave with a parallel floor and ceiling, two stalactites of lengths 16 and 36 hang perpendicularly from the ceiling, while two stalagmites of heights 25 and 49 grow perpendicularly from the ground. If the tips of these four structures form the vertices of a square in some order, compute the height of the cave.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-3": { s: String.raw`Point $P$ lies inside square $ABCD$ such that the areas of $\triangle PAB$, $\triangle PBC$, $\triangle PCD$, and $\triangle PDA$ are 1, 2, 3, and 4, in some order. Compute $PA \cdot PB \cdot PC \cdot PD$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-4": { s: String.raw`A semicircle is inscribed in another semicircle if the smaller semicircle's diameter is a chord of the larger semicircle, and the smaller semicircle's arc is tangent to the diameter of the larger semicircle.

Semicircle $S_{1}$ is inscribed in a semicircle $S_{2}$, which is inscribed in another semicircle $S_{3}$. The radii of $S_{1}$ and $S_{3}$ are 1 and 10, respectively, and the diameters of $S_{1}$ and $S_{3}$ are parallel. The endpoints of the diameter of $S_{3}$ are $A$ and $B$, and $S_{2}$ 's arc is tangent to $AB$ at $C$. Compute $AC \cdot CB$.

@@fig:hmmt/2025/feb-geo-4-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-5": { s: String.raw`Let $\triangle ABC$ be an equilateral triangle with side length 6. Let $P$ be a point inside triangle $\triangle ABC$ such that $\angle BPC = 120^{\circ}$. The circle with diameter $\overline{AP}$ meets the circumcircle of $\triangle ABC$ again at $X \neq A$. Given that $AX = 5$, compute $XP$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-6": { s: String.raw`Trapezoid $A B C D$, with $A B\parallel C D$, has side lengths $A B = 11$, $B C = 8$, $C D = 19$, and $D A = 4$. Compute the area of the convex quadrilateral whose vertices are the circumcenters of $\triangle A B C$, $\triangle B C D$, $\triangle C D A$, and $\triangle D A B$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-7": { s: String.raw`Point $P$ is inside triangle $\triangle A B C$ such that $\angle A B P = \angle A C P$. Given that $A B = 6$, $A C = 8$, $B C = 7$, and $\frac{B P}{P C} = \frac{1}{2}$, compute $\frac{[BPC]}{[ABC]}$.

(Here, $[X Y Z]$ denotes the area of $\triangle X Y Z$ ).`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-8": { s: String.raw`Let $A B C D$ be an isosceles trapezoid such that $C D > A B = 4$. Let $E$ be a point on line $C D$ such that $D E = 2$ and $D$ lies between $E$ and $C$. Let $M$ be the midpoint of $\overline{{A E}}$. Given that points $A$, $B$, $C$, $D$, and $M$ lie on a circle with radius 5, compute $M D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-9": { s: String.raw`Let $A B C D$ be a rectangle with $B C = 24$. Point $X$ lies inside the rectangle such that $\angle A X B = 90^{\circ}$. Given that triangles $\triangle A X D$ and $\triangle B X C$ are both acute and have circumradii 13 and 15, respectively, compute $A B$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-february-geometry-10": { s: String.raw`A plane $\mathcal{P}$ intersects a rectangular prism at a hexagon which has side lengths 45, 66, 63, 55, 54, and 77, in that order. Compute the distance from the center of the rectangular prism to $\mathcal{P}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/feb/geo/problems.pdf" },
"2025-hmmt-november-general-1": { s: String.raw`Let $ABCD$ be a rectangle. Let $X$ and $Y$ be points on segments $BC$ and $AD$, respectively, such that $\angle AXY=\angle XYC=90^\circ$. Given that $AX:XY:YC=1:2:1$ and $AB=1$, compute $BC$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-2": { s: String.raw`Suppose $n$ integers are placed in a circle such that each of the following conditions is satisfied:

• at least one of the integers is 0;
• each pair of adjacent integers differs by exactly 1; and
• the sum of the integers is exactly 24.

Compute the smallest value of $n$ for which this is possible.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-3": { s: String.raw`Ashley fills each cell of a $3\times 3$ grid with some of the numbers 1, 2, 3, and 4 (possibly none or several). Compute the number of ways she can do so such that each row and each column contains each of 1, 2, 3, and 4 exactly once. (One such grid is shown below.)

@@fig:hmmt/2025/nov-gen-3-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-4": { s: String.raw`Given that $a$, $b$, and $c$ are integers with $c\le 2025$ such that $|x^2+ax+b|=c$ has exactly 3 distinct integer solutions for $x$, compute the number of possible values of $c$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-5": { s: String.raw`Let $A$, $B$, $C$, and $D$ be points on a line in that order. There exists a point $E$ such that $\angle AED=120^\circ$ and triangle $BEC$ is equilateral. Given that $BC=10$ and $AD=39$, compute $|AB-CD|$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-6": { s: String.raw`Kelvin the frog is at the point $(0,0,0)$ and wishes to reach the point $(3,3,3)$. In a single move, he can either increase any single coordinate by 1, or he can decrease his $z$-coordinate by 1. Given that he cannot visit any point twice, and that at all times his coordinates must all stay between 0 and 3 (inclusive), compute the number of distinct paths Kelvin can take to reach $(3,3,3)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-7": { s: String.raw`A positive integer $n$ is imbalanced if strictly more than 99 percent of the positive divisors of $n$ are strictly less than 1 percent of $n$. Given that $M$ is an imbalanced multiple of 2000, compute the minimum possible number of positive divisors of $M$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-8": { s: String.raw`Let $\Gamma_1$ and $\Gamma_2$ be two circles that intersect at two points $P$ and $Q$. Let $\ell_1$ and $\ell_2$ be the common external tangents of $\Gamma_1$ and $\Gamma_2$. Let $\Gamma_1$ touch $\ell_1$ and $\ell_2$ at $U_1$ and $U_2$, respectively, and let $\Gamma_2$ touch $\ell_1$ and $\ell_2$ at $V_1$ and $V_2$, respectively. Given that $PQ=10$ and the distances from $P$ to $\ell_1$ and $\ell_2$ are $3$ and $12$, respectively, compute the area of the quadrilateral $U_1U_2V_2V_1$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-9": { s: String.raw`Let $a$, $b$, and $c$ be pairwise distinct nonzero complex numbers such that
$$\begin{aligned}
(10a+b)(10a+c)&=a+\frac{1}{a},\\
(10b+a)(10b+c)&=b+\frac{1}{b},\\
(10c+a)(10c+b)&=c+\frac{1}{c}.
\end{aligned}$$
Compute $abc$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-general-10": { s: String.raw`Jacob and Bojac each start in a cell of the same $8\times 8$ grid (possibly different cells). They listen to the same sequence of cardinal directions (North, South, East, and West). When a direction is called out, Jacob always walks one cell in that direction, while Bojac always walks one cell in the direction $90^\circ$ counterclockwise of the called direction. If either person cannot make their move without leaving the grid, that person stays still instead. Over all possible starting positions and sequences of instructions, compute the maximum possible number of distinct ordered pairs (Jacob’s position, Bojac’s position) that they could have reached.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/gen/problems.pdf" },
"2025-hmmt-november-theme-1": { s: String.raw`Mark has two one-liter flasks: flask $A$ and flask $B$. Initially, flask $A$ is fully filled with liquid mercury, and flask $B$ is partially filled with liquid gallium. Mark pours the contents of flask $A$ into flask $B$ until flask $B$ is full. Then, he mixes the contents of flask $B$ and pours it back into flask $A$ until flask $A$ is full again. Given that the mixture in flask $B$ is now 30% mercury, and the mixture in flask $A$ is $x\%$ mercury, compute $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-2": { s: String.raw`Uranus has 29 known moons. Each moon is blue, icy, or large, though some moons may have several of these characteristics. There are 10 moons which are blue but not icy, 8 moons which are icy but not large, and 6 moons which are large but not blue. Compute the number of moons which are simultaneously blue, icy, and large.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-3": { s: String.raw`Let $VENUS$ be a convex pentagon with area 84. Given that $NV$ is parallel to $SU$, $SE$ is parallel to $UN$, and triangle $SUN$ has area 24, compute the maximum possible area of triangle $EUV$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-4": { s: String.raw`Compute the unique 5-digit integer $\overline{EARTH}$ for which the following addition holds:
$$\begin{array}{rccccc}
  &H&A&T&E&R\\
+ &H&E&A&R&T\\ \hline
  &E&A&R&T&H
\end{array}$$
The digits $E$, $A$, $R$, $T$, and $H$ are not necessarily distinct, but the leading digits $E$ and $H$ must be nonzero.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-5": { s: String.raw`Compute the number of ways to erase 26 letters from the string

SUNSUNSUNSUNSUNSUNSUNSUNSUNSUN

such that the remaining 4 letters spell SUNS in order.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-6": { s: String.raw`Regular hexagon $SATURN$ (with vertices in counterclockwise order) has side length 2. Point $O$ is the reflection of $T$ over $S$. Hexagon $SATURN$ is rotated $45^\circ$ counterclockwise around $O$. Compute the area its interior traces out during this rotation.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-7": { s: String.raw`Io, Europa, and Ganymede are three of Jupiter’s moons. In one Jupiter month, they complete exactly $I$, $E$, and $G$ orbits around Jupiter, respectively, for some positive integers $I$, $E$, and $G$. Each moon appears as a full moon precisely at the start of each of its orbits. Suppose that in every Jupiter month, there are

• exactly 54 moments of time with at least one full moon,
• exactly 11 moments of time with at least two full moons, and
• at least 1 moment of time with all three full moons.

Compute $I\cdot E\cdot G$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-8": { s: String.raw`Let $MARS$ be a trapezoid with $MA$ parallel to $RS$ and side lengths $MA=11$, $AR=17$, $RS=22$, and $SM=16$. Point $X$ lies on side $MA$ such that the common chord of the circumcircles of triangles $MXS$ and $AXR$ bisects segment $RS$. Compute $MX$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-9": { s: String.raw`Triton performs an ancient Neptunian ritual consisting of drawing red, green, and blue marbles from a bag. Initially, Triton has 3 marbles of each color, and the bag contains an additional 3 marbles of each color. Every turn, Triton picks one marble to put into the bag, then draws one marble uniformly at random from the bag (possibly the one he just discarded). The ritual is completed once Triton has 6 marbles of one color and 3 of another. Compute the expected number of turns the ritual will take, given that Triton plays optimally to minimize this value.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
"2025-hmmt-november-theme-10": { s: String.raw`The orbits of Pluto and Charon are given by the ellipses
$$x^2+xy+y^2=20\qquad\text{and}\qquad 2x^2-xy+y^2=25,$$
respectively. These orbits intersect at four points that form a parallelogram. Compute the largest of the slopes of the four sides of this parallelogram.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2025/nov/thm/problems.pdf" },
});
