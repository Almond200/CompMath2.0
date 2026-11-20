// Problems and diagrams © 2015 HMMT. Reproduced with permission from HMMT.
// Source: the official HMMT individual-round papers.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2015-hmmt-february-algebra-1": { s: String.raw`Let $Q$ be a polynomial

$$Q(x)=a_{0}+a_{1} x+\cdots+a_{n} x^{n}$$

where $a_{0}, \ldots, a_{n}$ are nonnegative integers. Given that $Q(1)=4$ and $Q(5)=152$, find $Q(6)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-2": { s: String.raw`The fraction $\frac{1}{2015}$ has a unique "(restricted) partial fraction decomposition" of the form

$$\frac{1}{2015}=\frac{a}{5}+\frac{b}{13}+\frac{c}{31}$$

where $a, b, c$ are integers with $0 \leq a<5$ and $0 \leq b<13$. Find $a+b$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-3": { s: String.raw`Let $p$ be a real number and $c \neq 0$ an integer such that

$$c-0.1<x^{p}\left(\frac{1-(1+x)^{10}}{1+(1+x)^{10}}\right)<c+0.1$$

for all (positive) real numbers $x$ with $0<x<10^{-100}$. (The exact value $10^{-100}$ is not important. You could replace it with any "sufficiently small number".)
Find the ordered pair $(p, c)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-4": { s: String.raw`Compute the number of sequences of integers $\left(a_{1}, \ldots, a_{200}\right)$ such that the following conditions hold.

• $0 \leq a_{1}<a_{2}<\cdots<a_{200} \leq 202$.
• There exists a positive integer $N$ with the following property: for every index $i \in\{1, \ldots, 200\}$ there exists an index $j \in\{1, \ldots, 200\}$ such that $a_{i}+a_{j}-N$ is divisible by 203.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-5": { s: String.raw`Let $a, b, c$ be positive real numbers such that $a+b+c=10$ and $a b+b c+c a=25$. Let $m=\min \{a b, b c, c a\}$. Find the largest possible value of $m$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-6": { s: String.raw`Let $a, b, c, d, e$ be nonnegative integers such that $625 a+250 b+100 c+40 d+16 e=15^{3}$. What is the maximum possible value of $a+b+c+d+e$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-7": { s: String.raw`Suppose $\left(a_{1}, a_{2}, a_{3}, a_{4}\right)$ is a 4 -term sequence of real numbers satisfying the following two conditions:

• $a_{3}=a_{2}+a_{1}$ and $a_{4}=a_{3}+a_{2}$;
• there exist real numbers $a, b, c$ such that

$$a n^{2}+b n+c=\cos \left(a_{n}\right)$$

for all $n \in\{1,2,3,4\}$.
Compute the maximum possible value of

$$\cos \left(a_{1}\right)-\cos \left(a_{4}\right)$$

over all such sequences $\left(a_{1}, a_{2}, a_{3}, a_{4}\right)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-8": { s: String.raw`Find the number of ordered pairs of integers $(a, b) \in\{1,2, \ldots, 35\}^{2}$ (not necessarily distinct) such that $a x+b$ is a "quadratic residue modulo $x^{2}+1$ and 35 ", i.e. there exists a polynomial $f(x)$ with integer coefficients such that either of the following equivalent conditions holds:

• there exist polynomials $P, Q$ with integer coefficients such that $f(x)^{2}-(a x+b)=\left(x^{2}+1\right) P(x)+$ $35 Q(x)$;
• or more conceptually, the remainder when (the polynomial) $f(x)^{2}-(a x+b)$ is divided by (the polynomial) $x^{2}+1$ is a polynomial with (integer) coefficients all divisible by 35 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-9": { s: String.raw`Let $N=30^{2015}$. Find the number of ordered 4-tuples of integers $(A, B, C, D) \in\{1,2, \ldots, N\}^{4}$ (not necessarily distinct) such that for every integer $n, A n^{3}+B n^{2}+2 C n+D$ is divisible by $N$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-algebra-10": { s: String.raw`Find all ordered 4 -tuples of integers $(a, b, c, d)$ (not necessarily distinct) satisfying the following system of equations:
$$\begin{aligned}
a^{2}-b^{2}-c^{2}-d^{2} & =c-b-2 \\
2 a b & =a-d-32 \\
2 a c & =28-a-d \\
2 a d & =b+c+31
\end{aligned}$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/alg/problems.pdf" },
"2015-hmmt-february-combinatorics-1": { s: String.raw`Evan's analog clock displays the time $12: 13$; the number of seconds is not shown. After 10 seconds elapse, it is still 12:13. What is the expected number of seconds until 12:14?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-2": { s: String.raw`Victor has a drawer with 6 socks of 3 different types: 2 complex socks, 2 synthetic socks, and 2 trigonometric socks. He repeatedly draws 2 socks at a time from the drawer at random, and stops if the socks are of the same type. However, Victor is "synthetic-complex type-blind", so he also stops if he sees a synthetic and a complex sock.

What is the probability that Victor stops with 2 socks of the same type? Assume Victor returns both socks to the drawer after each step.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-3": { s: String.raw`Starting with the number 0, Casey performs an infinite sequence of moves as follows: he chooses a number from $\{1,2\}$ at random (each with probability $\frac{1}{2}$ ) and adds it to the current number. Let $p_{m}$ be the probability that Casey ever reaches the number $m$. Find $p_{20}-p_{15}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-4": { s: String.raw`Alice Czarina is bored and is playing a game with a pile of rocks. The pile initially contains 2015 rocks. At each round, if the pile has $N$ rocks, she removes $k$ of them, where $1 \leq k \leq N$, with each possible $k$ having equal probability. Alice Czarina continues until there are no more rocks in the pile. Let $p$ be the probability that the number of rocks left in the pile after each round is a multiple of 5 . If $p$ is of the form $5^{a} \cdot 31^{b} \cdot \frac{c}{d}$, where $a, b$ are integers and $c, d$ are positive integers relatively prime to $5 \cdot 31$, find $a+b$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-5": { s: String.raw`For positive integers $x$, let $g(x)$ be the number of blocks of consecutive 1 's in the binary expansion of $x$. For example, $g(19)=2$ because $19=10011_{2}$ has a block of one 1 at the beginning and a block of two 1 's at the end, and $g(7)=1$ because $7=111_{2}$ only has a single block of three 1 's. Compute $g(1)+g(2)+g(3)+\cdots+g(256)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-6": { s: String.raw`Count the number of functions $f: \mathbb{Z} \rightarrow\{$ 'green', 'blue' $\}$ such that $f(x)=f(x+22)$ for all integers $x$ and there does not exist an integer $y$ with $f(y)=f(y+2)=$ 'green'.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-7": { s: String.raw`2015 people sit down at a restaurant. Each person orders a soup with probability $\frac{1}{2}$. Independently, each person orders a salad with probability $\frac{1}{2}$. What is the probability that the number of people who ordered a soup is exactly one more than the number of people who ordered a salad?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-8": { s: String.raw`Let $S$ be the set of all 3 -digit numbers with all digits in the set $\{1,2,3,4,5,6,7\}$ (so in particular, all three digits are nonzero). For how many elements $\overline{a b c}$ of $S$ is it true that at least one of the (not necessarily distinct) "digit cycles"

$$\overline{a b c}, \overline{b c a}, \overline{c a b}$$

is divisible by 7 ? (Here, $\overline{a b c}$ denotes the number whose base 10 digits are $a, b$, and $c$ in that order.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-9": { s: String.raw`Calvin has a bag containing 50 red balls, 50 blue balls, and 30 yellow balls. Given that after pulling out 65 balls at random (without replacement), he has pulled out 5 more red balls than blue balls, what is the probability that the next ball he pulls out is red?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-combinatorics-10": { s: String.raw`A group of friends, numbered $1,2,3, \ldots, 16$, take turns picking random numbers. Person 1 picks a number uniformly (at random) in [0, 1], then person 2 picks a number uniformly (at random) in [0, 2], and so on, with person $k$ picking a number uniformly (at random) in $[0, k]$. What is the probability that the 16 numbers picked are strictly increasing?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/comb/problems.pdf" },
"2015-hmmt-february-geometry-1": { s: String.raw`Let $R$ be the rectangle in the Cartesian plane with vertices at $(0,0),(2,0),(2,1)$, and $(0,1)$. $R$ can be divided into two unit squares, as shown.

Pro selects a point $P$ uniformly at random in the interior of $R$. Find the probability that the line through $P$ with slope $\frac{1}{2}$ will pass through both unit squares.

@@fig:hmmt/2015/feb-geo-1-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-2": { s: String.raw`Let $A B C$ be a triangle with orthocenter $H$; suppose that $A B=13, B C=14, C A=15$. Let $G_{A}$ be the centroid of triangle $H B C$, and define $G_{B}, G_{C}$ similarly. Determine the area of triangle $G_{A} G_{B} G_{C}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-3": { s: String.raw`Let $A B C D$ be a quadrilateral with $\angle B A D=\angle A B C=90^{\circ}$, and suppose $A B=B C=1, A D=2$. The circumcircle of $A B C$ meets $\overline{A D}$ and $\overline{B D}$ at points $E$ and $F$, respectively. If lines $A F$ and $C D$ meet at $K$, compute $E K$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-4": { s: String.raw`Let $A B C D$ be a cyclic quadrilateral with $A B=3, B C=2, C D=2, D A=4$. Let lines perpendicular to $\overline{B C}$ from $B$ and $C$ meet $\overline{A D}$ at $B^{\prime}$ and $C^{\prime}$, respectively. Let lines perpendicular to $\overline{A D}$ from $A$ and $D$ meet $\overline{B C}$ at $A^{\prime}$ and $D^{\prime}$, respectively. Compute the ratio $\frac{\left[B C C^{\prime} B^{\prime}\right]}{\left[D A A^{\prime} D^{\prime}\right]}$, where $[\varpi]$ denotes the area of figure $\varpi$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-5": { s: String.raw`Let $I$ be the set of points $(x, y)$ in the Cartesian plane such that

$$x>\left(\frac{y^{4}}{9}+2015\right)^{1 / 4}$$

Let $f(r)$ denote the area of the intersection of $I$ and the disk $x^{2}+y^{2} \leq r^{2}$ of radius $r>0$ centered at the origin $(0,0)$. Determine the minimum possible real number $L$ such that $f(r)<L r^{2}$ for all $r>0$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-6": { s: String.raw`In triangle $A B C, A B=2, A C=1+\sqrt{5}$, and $\angle C A B=54^{\circ}$. Suppose $D$ lies on the extension of $A C$ through $C$ such that $C D=\sqrt{5}-1$. If $M$ is the midpoint of $B D$, determine the measure of $\angle A C M$, in degrees.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-7": { s: String.raw`Let $A B C D E$ be a square pyramid of height $\frac{1}{2}$ with square base $A B C D$ of side length $A B=12$ (so $E$ is the vertex of the pyramid, and the foot of the altitude from $E$ to $A B C D$ is the center of square $A B C D$ ). The faces $A D E$ and $C D E$ meet at an acute angle of measure $\alpha$ (so that $0^{\circ}<\alpha<90^{\circ}$ ). Find $\tan \alpha$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-8": { s: String.raw`Let $S$ be the set of discs $D$ contained completely in the set $\{(x, y): y<0\}$ (the region below the $x$-axis) and centered (at some point) on the curve $y=x^{2}-\frac{3}{4}$. What is the area of the union of the elements of $S$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-9": { s: String.raw`Let $A B C D$ be a regular tetrahedron with side length 1 . Let $X$ be the point in triangle $B C D$ such that $[X B C]=2[X B D]=4[X C D]$, where $[\varpi]$ denotes the area of figure $\varpi$. Let $Y$ lie on segment $A X$ such that $2 A Y=Y X$. Let $M$ be the midpoint of $B D$. Let $Z$ be a point on segment $A M$ such that the lines $Y Z$ and $B C$ intersect at some point. Find $\frac{A Z}{Z M}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-february-geometry-10": { s: String.raw`Let $\mathcal{G}$ be the set of all points $(x, y)$ in the Cartesian plane such that $0 \leq y \leq 8$ and

$$(x-3)^{2}+31=(y-4)^{2}+8 \sqrt{y(8-y)}$$

There exists a unique line $\ell$ of negative slope tangent to $\mathcal{G}$ and passing through the point $(0,4)$. Suppose $\ell$ is tangent to $\mathcal{G}$ at a unique point $P$. Find the coordinates $(\alpha, \beta)$ of $P$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/feb/geo/problems.pdf" },
"2015-hmmt-november-general-1": { s: String.raw`Find the number of triples $(a, b, c)$ of positive integers such that $a+a b+a b c=11$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-2": { s: String.raw`Let $a$ and $b$ be real numbers randomly (and independently) chosen from the range $[0,1]$. Find the probability that $a, b$ and 1 form the side lengths of an obtuse triangle.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-3": { s: String.raw`Neo has an infinite supply of red pills and blue pills. When he takes a red pill, his weight will double, and when he takes a blue pill, he will lose one pound. If Neo originally weighs one pound, what is the minimum number of pills he must take to make his weight 2015 pounds?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-4": { s: String.raw`Chords $A B$ and $C D$ of a circle are perpendicular and intersect at a point $P$. If $A P=6, B P=12$, and $C D=22$, find the area of the circle.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-5": { s: String.raw`Let $S$ be a subset of the set $\{1,2,3, \ldots, 2015\}$ such that for any two elements $a, b \in S$, the difference $a-b$ does not divide the sum $a+b$. Find the maximum possible size of $S$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-6": { s: String.raw`Consider all functions $f: \mathbb{Z} \rightarrow \mathbb{Z}$ satisfying

$$f(f(x)+2 x+20)=15$$

Call an integer $n$ good if $f(n)$ can take any integer value. In other words, if we fix $n$, for any integer $m$, there exists a function $f$ such that $f(n)=m$. Find the sum of all good integers $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-7": { s: String.raw`Let $\triangle A B C$ be a right triangle with right angle $C$. Let $I$ be the incenter of $A B C$, and let $M$ lie on $A C$ and $N$ on $B C$, respectively, such that $M, I, N$ are collinear and $\overline{M N}$ is parallel to $A B$. If $A B=36$ and the perimeter of $C M N$ is 48, find the area of $A B C$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-8": { s: String.raw`Let $A B C D$ be a quadrilateral with an inscribed circle $\omega$ that has center $I$. If $I A=5, I B=7, I C=$ $4, I D=9$, find the value of $\frac{A B}{C D}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-9": { s: String.raw`Rosencrantz plays $n \leq 2015$ games of question, and ends up with a win rate (i.e. $\frac{\# \text { of games won }}{\# \text { of games played }}$ ) of $k$. Guildenstern has also played several games, and has a win rate less than $k$. He realizes that if, after playing some more games, his win rate becomes higher than $k$, then there must have been some point in time when Rosencrantz and Guildenstern had the exact same win-rate. Find the product of all possible values of $k$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-general-10": { s: String.raw`Let $N$ be the number of functions $f$ from $\{1,2, \ldots, 101\} \rightarrow\{1,2, \ldots, 101\}$ such that $f^{101}(1)=2$. Find the remainder when $N$ is divided by 103.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/gen/problems.pdf" },
"2015-hmmt-november-theme-1": { s: String.raw`Consider a $1 \times 1$ grid of squares. Let $A, B, C, D$ be the vertices of this square, and let $E$ be the midpoint of segment $C D$. Furthermore, let $F$ be the point on segment $B C$ satisfying $B F=2 C F$, and let $P$ be the intersection of lines $A F$ and $B E$. Find $\frac{A P}{P F}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-2": { s: String.raw`Consider a $2 \times 2$ grid of squares. David writes a positive integer in each of the squares. Next to each row, he writes the product of the numbers in the row, and next to each column, he writes the product of the numbers in each column. If the sum of the eight numbers he writes down is 2015, what is the minimum possible sum of the four numbers he writes in the grid?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-3": { s: String.raw`Consider a $3 \times 3$ grid of squares. A circle is inscribed in the lower left corner, the middle square of the top row, and the rightmost square of the middle row, and a circle $O$ with radius $r$ is drawn such that $O$ is externally tangent to each of the three inscribed circles. If the side length of each square is 1 , compute $r$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-4": { s: String.raw`Consider a $4 \times 4$ grid of squares. Aziraphale and Crowley play a game on this grid, alternating turns, with Aziraphale going first. On Aziraphales turn, he may color any uncolored square red, and on Crowleys turn, he may color any uncolored square blue. The game ends when all the squares are colored, and Aziraphales score is the area of the largest closed region that is entirely red. If Aziraphale wishes to maximize his score, Crowley wishes to minimize it, and both players play optimally, what will Aziraphales score be?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-5": { s: String.raw`Consider a $5 \times 5$ grid of squares. Vladimir colors some of these squares red, such that the centers of any four red squares do not form an axis-parallel rectangle (i.e. a rectangle whose sides are parallel to those of the squares). What is the maximum number of squares he could have colored red?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-6": { s: String.raw`Consider a $6 \times 6$ grid of squares. Edmond chooses four of these squares uniformly at random. What is the probability that the centers of these four squares form a square?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-7": { s: String.raw`Consider a $7 \times 7$ grid of squares. Let $f:\{1,2,3,4,5,6,7\} \rightarrow\{1,2,3,4,5,6,7\}$ be a function; in other words, $f(1), f(2), \ldots, f(7)$ are each (not necessarily distinct) integers from 1 to 7 . In the top row of the grid, the numbers from 1 to 7 are written in order; in every other square, $f(x)$ is written where $x$ is the number above the square. How many functions have the property that the bottom row is identical to the top row, and no other row is identical to the top row?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-8": { s: String.raw`Consider an $8 \times 8$ grid of squares. A rook is placed in the lower left corner, and every minute it moves to a square in the same row or column with equal probability (the rook must move; i.e. it cannot stay in the same square). What is the expected number of minutes until the rook reaches the upper right corner?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-9": { s: String.raw`Consider a $9 \times 9$ grid of squares. Haruki fills each square in this grid with an integer between 1 and 9 , inclusive. The grid is called a super-sudoku if each of the following three conditions hold:

• Each column in the grid contains each of the numbers $1,2,3,4,5,6,7,8,9$ exactly once.
• Each row in the grid contains each of the numbers $1,2,3,4,5,6,7,8,9$ exactly once.
• Each $3 \times 3$ subsquare in the grid contains each of the numbers $1,2,3,4,5,6,7,8,9$ exactly once.

How many possible super-sudoku grids are there?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
"2015-hmmt-november-theme-10": { s: String.raw`Consider a $10 \times 10$ grid of squares. One day, Daniel drops a burrito in the top left square, where a wingless pigeon happens to be looking for food. Every minute, if the pigeon and the burrito are in the same square, the pigeon will eat $10 \%$ of the burrito's original size and accidentally throw it into a random square (possibly the one it is already in). Otherwise, the pigeon will move to an adjacent square, decreasing the distance between it and the burrito. What is the expected number of minutes before the pigeon has eaten the entire burrito?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2015/nov/thm/problems.pdf" },
});
