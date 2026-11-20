// Problems and diagrams © 2024 HMMT. Reproduced with permission from HMMT.
// Source: the official HMMT individual-round papers.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2024-hmmt-february-algebra-and-number-theory-1": { s: String.raw`Suppose $r, s$, and $t$ are nonzero reals such that the polynomial $x^{2}+r x+s$ has $s$ and $t$ as roots, and the polynomial $x^{2}+t x+r$ has 5 as a root. Compute $s$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-2": { s: String.raw`Suppose $a$ and $b$ are positive integers. Isabella and Vidur both fill up an $a \times b$ table. Isabella fills it up with numbers $1,2, \ldots, a b$, putting the numbers $1,2, \ldots, b$ in the first row, $b+1, b+2, \ldots, 2 b$ in the second row, and so on. Vidur fills it up like a multiplication table, putting $i j$ in the cell in row $i$ and column $j$. (Examples are shown for a $3 \times 4$ table below.)

@@fig:hmmt/2024/feb-algnt-2-1.png@@

Isabella sums up the numbers in her grid, and Vidur sums up the numbers in his grid; the difference between these two quantities is 1200 . Compute $a+b$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-3": { s: String.raw`Compute the sum of all two-digit positive integers $x$ such that for all three-digit (base 10) positive integers $\underline{a} \underline{b} \underline{c}$, if $\underline{a} \underline{b} \underline{c}$ is a multiple of $x$, then the three-digit (base 10) number $\underline{b} \underline{c} \underline{a}$ is also a multiple of $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-4": { s: String.raw`Let $f(x)$ be a quotient of two quadratic polynomials. Given that $f(n)=n^{3}$ for all $n \in\{1,2,3,4,5\}$, compute $f(0)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-5": { s: String.raw`Compute the unique ordered pair $(x, y)$ of real numbers satisfying the system of equations

$$\frac{x}{\sqrt{x^{2}+y^{2}}}-\frac{1}{x}=7 \quad \text { and } \quad \frac{y}{\sqrt{x^{2}+y^{2}}}+\frac{1}{y}=4 .$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-6": { s: String.raw`Compute the sum of all positive integers $n$ such that $50 \leq n \leq 100$ and $2 n+3$ does not divide $2^{n!}-1$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-7": { s: String.raw`Let $P(n)=\left(n-1^{3}\right)\left(n-2^{3}\right) \ldots\left(n-40^{3}\right)$ for positive integers $n$. Suppose that $d$ is the largest positive integer that divides $P(n)$ for every integer $n>2023$. If $d$ is a product of $m$ (not necessarily distinct) prime numbers, compute $m$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-8": { s: String.raw`Let $\zeta=\cos \frac{2 \pi}{13}+i \sin \frac{2 \pi}{13}$. Suppose $a>b>c>d$ are positive integers satisfying

$$\left|\zeta^{a}+\zeta^{b}+\zeta^{c}+\zeta^{d}\right|=\sqrt{3}$$

Compute the smallest possible value of $1000 a+100 b+10 c+d$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-9": { s: String.raw`Suppose $a, b$, and $c$ are complex numbers satisfying

$$\begin{aligned}
a^{2} & =b-c, \\
b^{2} & =c-a, \text { and } \\
c^{2} & =a-b .
\end{aligned}$$

Compute all possible values of $a+b+c$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-algebra-and-number-theory-10": { s: String.raw`A polynomial $f \in \mathbb{Z}[x]$ is called splitty if and only if for every prime $p$, there exist polynomials $g_{p}, h_{p} \in \mathbb{Z}[x]$ with $\operatorname{deg} g_{p}, \operatorname{deg} h_{p}<\operatorname{deg} f$ and all coefficients of $f-g_{p} h_{p}$ are divisible by $p$. Compute the sum of all positive integers $n \leq 100$ such that the polynomial $x^{4}+16 x^{2}+n$ is splitty.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/algnt/problems.pdf" },
"2024-hmmt-february-combinatorics-1": { s: String.raw`Compute the number of ways to divide a $20 \times 24$ rectangle into $4 \times 5$ rectangles. (Rotations and reflections are considered distinct.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-2": { s: String.raw`A lame king is a chess piece that can move from a cell to any cell that shares at least one vertex with it, except for the cells in the same column as the current cell.
A lame king is placed in the top-left cell of a $7 \times 7$ grid. Compute the maximum number of cells it can visit without visiting the same cell twice (including its starting cell).`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-3": { s: String.raw`Compute the number of ways there are to assemble 2 red unit cubes and 25 white unit cubes into a $3 \times 3 \times 3$ cube such that red is visible on exactly 4 faces of the larger cube. (Rotations and reflections are considered distinct.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-4": { s: String.raw`Sally the snail sits on the $3 \times 24$ lattice of points $(i, j)$ for all $1 \leq i \leq 3$ and $1 \leq j \leq 24$. She wants to visit every point in the lattice exactly once. In a move, Sally can move to a point in the lattice exactly one unit away. Given that Sally starts at $(2,1)$, compute the number of possible paths Sally can take.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-5": { s: String.raw`The country of HMMTLand has 8 cities. Its government decides to construct several two-way roads between pairs of distinct cities. After they finish construction, it turns out that each city can reach exactly 3 other cities via a single road, and from any pair of distinct cities, either exactly 0 or 2 other cities can be reached from both cities by a single road. Compute the number of ways HMMTLand could have constructed the roads.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-6": { s: String.raw`In each cell of a $4 \times 4$ grid, one of the two diagonals is drawn uniformly at random. Compute the probability that the resulting 32 triangular regions can be colored red and blue so that any two regions sharing an edge have different colors.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-7": { s: String.raw`There is a grid of height 2 stretching infinitely in one direction. Between any two edge-adjacent cells of the grid, there is a door that is locked with probability $\frac{1}{2}$ independent of all other doors. Philip starts in a corner of the grid (in the starred cell). Compute the expected number of cells that Philip can reach, assuming he can only travel between cells if the door between them is unlocked.

@@fig:hmmt/2024/feb-comb-7-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-8": { s: String.raw`Rishabh has 2024 pairs of socks in a drawer. He draws socks from the drawer uniformly at random, without replacement, until he has drawn a pair of identical socks. Compute the expected number of unpaired socks he has drawn when he stops.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-9": { s: String.raw`Compute the number of triples $(f, g, h)$ of permutations on $\{1,2,3,4,5\}$ such that

$$\begin{aligned}
& f(g(h(x)))=h(g(f(x)))=g(x), \\
& g(h(f(x)))=f(h(g(x)))=h(x), \text { and } \\
& h(f(g(x)))=g(f(h(x)))=f(x)
\end{aligned}$$

for all $x \in\{1,2,3,4,5\}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-combinatorics-10": { s: String.raw`A peacock is a ten-digit positive integer that uses each digit exactly once. Compute the number of peacocks that are exactly twice another peacock.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/comb/problems.pdf" },
"2024-hmmt-february-geometry-1": { s: String.raw`Inside an equilateral triangle of side length 6 , three congruent equilateral triangles of side length $x$ with sides parallel to the original equilateral triangle are arranged so that each has a vertex on a side of the larger triangle, and a vertex on another one of the three equilateral triangles, as shown below.

@@fig:hmmt/2024/feb-geo-1-1.png@@

A smaller equilateral triangle formed between the three congruent equilateral triangles has side length 1. Compute $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-2": { s: String.raw`Let $A B C$ be a triangle with $\angle B A C=90^{\circ}$. Let $D, E$, and $F$ be the feet of altitude, angle bisector, and median from $A$ to $B C$, respectively. If $D E=3$ and $E F=5$, compute the length of $B C$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-3": { s: String.raw`Let $\Omega$ and $\omega$ be circles with radii 123 and 61 , respectively, such that the center of $\Omega$ lies on $\omega$. A chord of $\Omega$ is cut by $\omega$ into three segments, whose lengths are in the ratio $1: 2: 3$ in that order. Given that this chord is not a diameter of $\Omega$, compute the length of this chord.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-4": { s: String.raw`Let $A B C D$ be a square, and let $\ell$ be a line passing through the midpoint of segment $\overline{A B}$ that intersects segment $\overline{B C}$. Given that the distances from $A$ and $C$ to $\ell$ are 4 and 7 , respectively, compute the area of $A B C D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-5": { s: String.raw`Let $A B C D$ be a convex trapezoid such that $\angle D A B=\angle A B C=90^{\circ}, D A=2, A B=3$, and $B C=8$. Let $\omega$ be a circle passing through $A$ and tangent to segment $\overline{C D}$ at point $T$. Suppose that the center of $\omega$ lies on line $B C$. Compute $C T$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-6": { s: String.raw`In triangle $A B C$, a circle $\omega$ with center $O$ passes through $B$ and $C$ and intersects segments $\overline{A B}$ and $\overline{A C}$ again at $B^{\prime}$ and $C^{\prime}$, respectively. Suppose that the circles with diameters $B B^{\prime}$ and $C C^{\prime}$ are externally tangent to each other at $T$. If $A B=18, A C=36$, and $A T=12$, compute $A O$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-7": { s: String.raw`Let $A B C$ be an acute triangle. Let $D, E$, and $F$ be the feet of altitudes from $A, B$, and $C$ to sides $\overline{B C}$, $\overline{C A}$, and $\overline{A B}$, respectively, and let $Q$ be the foot of altitude from $A$ to line $E F$. Given that $A Q=20$, $B C=15$, and $A D=24$, compute the perimeter of triangle $D E F$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-8": { s: String.raw`Let $A B T C D$ be a convex pentagon with area 22 such that $A B=C D$ and the circumcircles of triangles $T A B$ and $T C D$ are internally tangent. Given that $\angle A T D=90^{\circ}, \angle B T C=120^{\circ}, B T=4$, and $C T=5$, compute the area of triangle $T A D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-9": { s: String.raw`Let $A B C$ be a triangle. Let $X$ be the point on side $\overline{A B}$ such that $\angle B X C=60^{\circ}$. Let $P$ be the point on segment $\overline{C X}$ such that $B P \perp A C$. Given that $A B=6, A C=7$, and $B P=4$, compute $C P$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-february-geometry-10": { s: String.raw`Suppose point $P$ is inside quadrilateral $A B C D$ such that

$$\begin{aligned}
& \angle P A B=\angle P D A \\
& \angle P A D=\angle P D C, \\
& \angle P B A=\angle P C B, \text { and } \\
& \angle P B C=\angle P C D
\end{aligned}$$

If $P A=4, P B=5$, and $P C=10$, compute the perimeter of $A B C D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/feb/geo/problems.pdf" },
"2024-hmmt-november-general-1": { s: String.raw`Six consecutive positive integers are written on slips of paper. The slips are then handed out to Ethan, Jacob, and Karthik, such that each of them receives two slips. The product of Ethan's numbers is 20, and the product of Jacob's numbers is 24 . Compute the product of Karthik's numbers.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-2": { s: String.raw`Let $R A N D O M$ be a regular hexagon with side length 1 . Points $I$ and $T$ lie on segments $\overline{R A}$ and $\overline{D O}$, respectively, such that $M I=M T$ and $\angle T M I=90^{\circ}$. Compute the area of triangle $M I T$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-3": { s: String.raw`Suppose that $a, b$, and $c$ are distinct positive integers such that $a^{b} b^{c}=a^{c}$. Across all possible values of $a, b$, and $c$, compute the minimum value of $a+b+c$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-4": { s: String.raw`Compute the number of ways to pick a 3 -element subset of

$$\left\{10^{1}+1,10^{2}+1,10^{3}+1,10^{4}+1,10^{5}+1,10^{6}+1,10^{7}+1\right\}$$

such that the product of the 3 numbers in the subset has no digits besides 0 and 1 when written in base 10 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-5": { s: String.raw`Let $f$ be a function on nonnegative integers such that $f(0)=0$ and

$$f(3 n+2)=f(3 n+1)=f(3 n)+1=3 f(n)+1$$

for all integers $n \geq 0$. Compute the sum of all nonnegative integers $m$ such that $f(m)=13$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-6": { s: String.raw`A positive integer $n$ is stacked if $2 n$ has the same number of digits as $n$ and the digits of $2 n$ are multiples of the corresponding digits of $n$. For example, 1203 is stacked because $2 \times 1203=2406$, and $2,4,0,6$ are multiples of $1,2,0,3$, respectively. Compute the number of stacked integers less than 1000 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-7": { s: String.raw`Let triangle $A B C$ have $A B=5, B C=8$, and $\angle A B C=60^{\circ}$. A circle $\omega$ tangent to segments $\overline{A B}$ and $\overline{B C}$ intersects segment $\overline{C A}$ at points $X$ and $Y$ such that points $C, Y, X$, and $A$ lie along $\overline{C A}$ in this order. If $\omega$ is tangent to $\overline{A B}$ at point $Z$ and $Z Y \| B C$, compute the radius of $\omega$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-8": { s: String.raw`Let

$$f(x)=||\cdots||| | x|-1|-2|-3|-\cdots|-10|$$

Compute $f(1)+f(2)+\cdots+f(54)+f(55)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-9": { s: String.raw`Let $A B C D E F$ be a regular hexagon with center $O$ and side length 1 . Point $X$ is placed in the interior of the hexagon such that $\angle B X C=\angle A X E=90^{\circ}$. Compute all possible values of $O X$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-general-10": { s: String.raw`Let $S=\{1,2,3, \ldots, 64\}$. Compute the number of ways to partition $S$ into 16 arithmetic sequences such that each arithmetic sequence has length 4 and common difference 1,4 , or 16 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/gen/problems.pdf" },
"2024-hmmt-november-theme-1": { s: String.raw`Compute the number of ways to fill each of the 12 empty cells in the grid below with one of $T, A, L$, or $C$ such that each of the four rows, columns, and bolded $2 \times 2$ square regions contains each letter exactly once.

@@fig:hmmt/2024/nov-thm-1-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-2": { s: String.raw`Paul is in the desert and has a pile of gypsum crystals. No matter how he divides the pile into two nonempty piles, at least one of the resulting piles has a number of crystals that, when written in base 10 , has a sum of digits at least 7. Given that Paul's initial pile has at least two crystals, compute the smallest possible number of crystals in the initial pile.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-3": { s: String.raw`Points $K, A, L, C, I, T, E$ are such that triangles $C A T$ and $E L K$ are equilateral, share a center $I$, and points $E, L, K$ lie on sides $\overline{C A}, \overline{A T}, \overline{T C}$ respectively. If the area of triangle $C A T$ is double the area of triangle $E L K$ and $C I=2$, compute the minimum possible value of $C K$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-4": { s: String.raw`Compute

$$\sum_{i=1}^{4} \sum_{t=1}^{4} \sum_{e=1}^{4}\left\lfloor\frac{i t e}{5}\right\rfloor$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-5": { s: String.raw`Alf, the alien from the 1980s TV show, has a big appetite for the mineral apatite. However, he's currently on a diet, so for each integer $k \geq 1$, he can eat exactly $k$ pieces of apatite on day $k$. Additionally, if he eats apatite on day $k$, he cannot eat on any of days $k+1, k+2, \ldots, 2 k-1$. Compute the maximum total number of pieces of apatite Alf could eat over days $1,2, \ldots, 99,100$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-6": { s: String.raw`Let $F E L D S P A R$ be a regular octagon, and let $I$ be a point in its interior such that $\angle F I L=\angle L I D=$ $\angle D I S=\angle S I A$. Compute $\angle I A R$ in degrees.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-7": { s: String.raw`Jasper and Rose are playing a game. Twenty-six 32 -ounce jugs are in a line, labeled Quart A through Quart Z from left to right. All twenty-six jugs are initially full. Jasper and Rose take turns making one of the following two moves:

• Remove a positive integer number of ounces from the leftmost nonempty jug, possibly emptying it
• Remove an equal positive integer number of ounces from the two leftmost nonempty jugs, possibly emptying one or both of them. (Attempting to remove more ounces from a jug than it currently contains is not allowed.)

Jasper plays first. A player's score is the number of ounces they take from Quart Z. If both players play to maximize their score, compute the maximum score that Jasper can guarantee.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-8": { s: String.raw`For all positive integers $r$ and $s$, let $\operatorname{Top}(r, s)$ denote the top number (i.e., numerator) when $\frac{r}{s}$ is written in simplified form. For instance, $\operatorname{Top}(20,24)=5$. Compute the number of ordered pairs of positive integers $(a, z)$ such that $200 \leq a \leq 300$ and $\operatorname{Top}(a, z)=\operatorname{Top}(z, a-1)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-9": { s: String.raw`Compute the number of ways to color each cell of an $18 \times 18$ square grid either ruby or sapphire such that each contiguous $3 \times 3$ subgrid has exactly 1 ruby cell.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
"2024-hmmt-november-theme-10": { s: String.raw`Isabella the geologist discovers a diamond deep underground using an X-ray machine. The diamond has the shape of a convex cyclic pentagon $P A B C D$ with $A D \| B C$. Soon after the discovery, her X-ray breaks, and she only recovers partial information about its dimensions. She knows that $A D=70$, $B C=55, P A: P D=3: 4$, and $P B: P C=5: 6$. Compute $P B$.

@@fig:hmmt/2024/nov-thm-10-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2024/nov/thm/problems.pdf" },
});
