// Problems and diagrams © 2012 HMMT. Reproduced with permission from HMMT.
// Source: the official HMMT individual-round papers.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2012-hmmt-february-algebra-1": { s: String.raw`Let $f$ be the function such that

$$f(x)= \begin{cases}2 x & \text { if } x \leq \frac{1}{2} \\ 2-2 x & \text { if } x>\frac{1}{2}\end{cases}$$

What is the total length of the graph of $\underbrace{f(f(\ldots f}_{2012 f^{\prime} s}(x) \ldots))$ from $x=0$ to $x=1$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-2": { s: String.raw`You are given an unlimited supply of red, blue, and yellow cards to form a hand. Each card has a point value and your score is the sum of the point values of those cards. The point values are as follows: the value of each red card is 1 , the value of each blue card is equal to twice the number of red cards, and the value of each yellow card is equal to three times the number of blue cards. What is the maximum score you can get with fifteen cards?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-3": { s: String.raw`Given points $a$ and $b$ in the plane, let $a \oplus b$ be the unique point $c$ such that $a b c$ is an equilateral triangle with $a, b, c$ in the clockwise orientation.

Solve $(x \oplus(0,0)) \oplus(1,1)=(1,-1)$ for $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-4": { s: String.raw`During the weekends, Eli delivers milk in the complex plane. On Saturday, he begins at $z$ and delivers milk to houses located at $z^{3}, z^{5}, z^{7}, \ldots, z^{2013}$, in that order; on Sunday, he begins at 1 and delivers milk to houses located at $z^{2}, z^{4}, z^{6}, \ldots, z^{2012}$, in that order. Eli always walks directly (in a straight line) between two houses. If the distance he must travel from his starting point to the last house is $\sqrt{2012}$ on both days, find the real part of $z^{2}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-5": { s: String.raw`Find all ordered triples $(a, b, c)$ of positive reals that satisfy: $\lfloor a\rfloor b c=3, a\lfloor b\rfloor c=4$, and $a b\lfloor c\rfloor=5$, where $\lfloor x\rfloor$ denotes the greatest integer less than or equal to $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-6": { s: String.raw`Let $a_{0}=-2, b_{0}=1$, and for $n \geq 0$, let

$$\begin{aligned}
& a_{n+1}=a_{n}+b_{n}+\sqrt{a_{n}^{2}+b_{n}^{2}} \\
& b_{n+1}=a_{n}+b_{n}-\sqrt{a_{n}^{2}+b_{n}^{2}}
\end{aligned}$$

Find $a_{2012}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-7": { s: String.raw`Let $\otimes$ be a binary operation that takes two positive real numbers and returns a positive real number. Suppose further that $\otimes$ is continuous, commutative $(a \otimes b=b \otimes a)$, distributive across multiplication $(a \otimes(b c)=(a \otimes b)(a \otimes c))$, and that $2 \otimes 2=4$. Solve the equation $x \otimes y=x$ for $y$ in terms of $x$ for $x>1$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-8": { s: String.raw`Let $x_{1}=y_{1}=x_{2}=y_{2}=1$, then for $n \geq 3$ let $x_{n}=x_{n-1} y_{n-2}+x_{n-2} y_{n-1}$ and $y_{n}=y_{n-1} y_{n-2}-$ $x_{n-1} x_{n-2}$. What are the last two digits of $\left|x_{2012}\right|$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-9": { s: String.raw`How many real triples $(a, b, c)$ are there such that the polynomial $p(x)=x^{4}+a x^{3}+b x^{2}+a x+c$ has exactly three distinct roots, which are equal to $\tan y, \tan 2 y$, and $\tan 3 y$ for some real $y$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-algebra-10": { s: String.raw`Suppose that there are 16 variables $\left\{a_{i, j}\right\}_{0 \leq i, j \leq 3}$, each of which may be 0 or 1 . For how many settings of the variables $a_{i, j}$ do there exist positive reals $c_{i, j}$ such that the polynomial

$$f(x, y)=\sum_{0 \leq i, j \leq 3} a_{i, j} c_{i, j} x^{i} y^{j}$$

$(x, y \in \mathbb{R})$ is bounded below?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/alg/problems.pdf" },
"2012-hmmt-february-combinatorics-1": { s: String.raw`In the game of Minesweeper, a number on a square denotes the number of mines that share at least one vertex with that square. A square with a number may not have a mine, and the blank squares are undetermined. How many ways can the mines be placed in this configuration?

@@fig:hmmt/2012/feb-comb-1-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-2": { s: String.raw`Brian has a 20 -sided die with faces numbered from 1 to 20 , and George has three 6 -sided dice with faces numbered from 1 to 6 . Brian and George simultaneously roll all their dice. What is the probability that the number on Brian's die is larger than the sum of the numbers on George's dice?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-3": { s: String.raw`In the figure below, how many ways are there to select 5 bricks, one in each row, such that any two bricks in adjacent rows are adjacent?

@@fig:hmmt/2012/feb-comb-3-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-4": { s: String.raw`A frog is at the point $(0,0)$. Every second, he can jump one unit either up or right. He can only move to points $(x, y)$ where $x$ and $y$ are not both odd. How many ways can he get to the point $(8,14)$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-5": { s: String.raw`Dizzy Daisy is standing on the point $(0,0)$ on the $x y$-plane and is trying to get to the point $(6,6)$. She starts facing rightward and takes a step 1 unit forward. On each subsequent second, she either takes a step 1 unit forward or turns 90 degrees counterclockwise then takes a step 1 unit forward. She may never go on a point outside the square defined by $|x| \leq 6,|y| \leq 6$, nor may she ever go on the same point twice. How many different paths may Daisy take?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-6": { s: String.raw`For a permutation $\sigma$ of $1,2, \ldots, 7$, a transposition is a swapping of two elements. (For instance, we could apply a transposition to the permutation $3,7,1,4,5,6,2$ and get $3,7,6,4,5,1,2$ by swapping the 1 and the 6.)
Let $f(\sigma)$ be the minimum number of transpositions necessary to turn $\sigma$ into the permutation $1,2,3,4,5,6,7$. Find the sum of $f(\sigma)$ over all permutations $\sigma$ of $1,2, \ldots, 7$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-7": { s: String.raw`You are repeatedly flipping a fair coin. What is the expected number of flips until the first time that your previous 2012 flips are 'HTHT...HT'?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-8": { s: String.raw`How many ways can one color the squares of a $6 \times 6$ grid red and blue such that the number of red squares in each row and column is exactly 2 ?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-9": { s: String.raw`A parking lot consists of 2012 parking spots equally spaced in a line, numbered 1 through 2012. One by one, 2012 cars park in these spots under the following procedure: the first car picks from the 2012 spots uniformly randomly, and each following car picks uniformly randomly among all possible choices which maximize the minimal distance from an already parked car. What is the probability that the last car to park must choose spot 1 ?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-combinatorics-10": { s: String.raw`Jacob starts with some complex number $x_{0}$ other than 0 or 1 . He repeatedly flips a fair coin. If the $n^{\text {th }}$ flip lands heads, he lets $x_{n}=1-x_{n-1}$, and if it lands tails he lets $x_{n}=\frac{1}{x_{n-1}}$. Over all possible choices of $x_{0}$, what are all possible values of the probability that $x_{2012}=x_{0}$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/comb/problems.pdf" },
"2012-hmmt-february-geometry-1": { s: String.raw`$A B C$ is an isosceles triangle with $A B=2$ and $\measuredangle A B C=90^{\circ} . D$ is the midpoint of $B C$ and $E$ is on $A C$ such that the area of $A E D B$ is twice the area of $E C D$. Find the length of $D E$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-2": { s: String.raw`Let $A B C$ be a triangle with $\angle A=90^{\circ}, A B=1$, and $A C=2$. Let $\ell$ be a line through $A$ perpendicular to $B C$, and let the perpendicular bisectors of $A B$ and $A C$ meet $\ell$ at $E$ and $F$, respectively. Find the length of segment $E F$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-3": { s: String.raw`Let $A B C$ be a triangle with incenter $I$. Let the circle centered at $B$ and passing through $I$ intersect side $A B$ at $D$ and let the circle centered at $C$ passing through $I$ intersect side $A C$ at $E$. Suppose $D E$ is the perpendicular bisector of $A I$. What are all possible measures of angle $B A C$ in degrees?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-4": { s: String.raw`There are circles $\omega_{1}$ and $\omega_{2}$. They intersect in two points, one of which is the point $A$. $B$ lies on $\omega_{1}$ such that $A B$ is tangent to $\omega_{2}$. The tangent to $\omega_{1}$ at $B$ intersects $\omega_{2}$ at $C$ and $D$, where $D$ is the closer to $B$. $A D$ intersects $\omega_{1}$ again at $E$. If $B D=3$ and $C D=13$, find $E B / E D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-5": { s: String.raw`A mouse lives in a circular cage with completely reflective walls. At the edge of this cage, a small flashlight with vertex on the circle whose beam forms an angle of $15^{\circ}$ is centered at an angle of $37.5^{\circ}$ away from the center. The mouse will die in the dark. What fraction of the total area of the cage can keep the mouse alive?

@@fig:hmmt/2012/feb-geo-5-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-6": { s: String.raw`Triangle $A B C$ is an equilateral triangle with side length 1 . Let $X_{0}, X_{1}, \ldots$ be an infinite sequence of points such that the following conditions hold:

• $X_{0}$ is the center of $A B C$
• For all $i \geq 0, X_{2 i+1}$ lies on segment $A B$ and $X_{2 i+2}$ lies on segment $A C$.
• For all $i \geq 0, \measuredangle X_{i} X_{i+1} X_{i+2}=90^{\circ}$.
• For all $i \geq 1, X_{i+2}$ lies in triangle $A X_{i} X_{i+1}$.

Find the maximum possible value of $\sum_{i=0}^{\infty}\left|X_{i} X_{i+1}\right|$, where $|P Q|$ is the length of line segment $P Q$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-7": { s: String.raw`Let $S$ be the set of the points $\left(x_{1}, x_{2}, \ldots, x_{2012}\right)$ in 2012-dimensional space such that $\left|x_{1}\right|+\left|x_{2}\right|+\cdots+$ $\left|x_{2012}\right| \leq 1$. Let $T$ be the set of points in 2012-dimensional space such that $\max _{i=1}^{2012}\left|x_{i}\right|=2$. Let $p$ be a randomly chosen point on $T$. What is the probability that the closest point in $S$ to $p$ is a vertex of $S$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-8": { s: String.raw`Hexagon $A B C D E F$ has a circumscribed circle and an inscribed circle. If $A B=9, B C=6, C D=2$, and $E F=4$. Find $\{D E, F A\}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-9": { s: String.raw`Let $O, O_{1}, O_{2}, O_{3}, O_{4}$ be points such that $O_{1}, O, O_{3}$ and $O_{2}, O, O_{4}$ are collinear in that order, $O O_{1}=$ $1, O O_{2}=2, O O_{3}=\sqrt{2}, O O_{4}=2$, and $\measuredangle O_{1} O O_{2}=45^{\circ}$. Let $\omega_{1}, \omega_{2}, \omega_{3}, \omega_{4}$ be the circles with respective centers $O_{1}, O_{2}, O_{3}, O_{4}$ that go through $O$. Let $A$ be the intersection of $\omega_{1}$ and $\omega_{2}, B$ be the intersection of $\omega_{2}$ and $\omega_{3}, C$ be the intersection of $\omega_{3}$ and $\omega_{4}$, and $D$ be the intersection of $\omega_{4}$ and $\omega_{1}$, with $A, B, C, D$ all distinct from $O$. What is the largest possible area of a convex quadrilateral $P_{1} P_{2} P_{3} P_{4}$ such that $P_{i}$ lies on $O_{i}$ and that $A, B, C, D$ all lie on its perimeter?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-february-geometry-10": { s: String.raw`Let $C$ denote the set of points $(x, y) \in \mathbb{R}^{2}$ such that $x^{2}+y^{2} \leq 1$. A sequence $A_{i}=\left(x_{i}, y_{i}\right) \mid i \geq 0$ of points in $\mathbb{R}^{2}$ is 'centric' if it satisfies the following properties:

• $A_{0}=\left(x_{0}, y_{0}\right)=(0,0), A_{1}=\left(x_{1}, y_{1}\right)=(1,0)$.
• For all $n \geq 0$, the circumcenter of triangle $A_{n} A_{n+1} A_{n+2}$ lies in $C$.

Let $K$ be the maximum value of $x_{2012}^{2}+y_{2012}^{2}$ over all centric sequences. Find all points $(x, y)$ such that $x^{2}+y^{2}=K$ and there exists a centric sequence such that $A_{2012}=(x, y)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/feb/geo/problems.pdf" },
"2012-hmmt-november-general-1": { s: String.raw`What is the sum of all of the distinct prime factors of $25^{3}-27^{2}$?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-2": { s: String.raw`Let $Q(x)=x^{2}+2 x+3$, and suppose that $P(x)$ is a polynomial such that

$$P(Q(x))=x^{6}+6 x^{5}+18 x^{4}+32 x^{3}+35 x^{2}+22 x+8$$

Compute $P(2)$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-3": { s: String.raw`$A B C D$ is a rectangle with $A B=20$ and $B C=3$. A circle with radius 5 , centered at the midpoint of $D C$, meets the rectangle at four points: $W, X, Y$, and $Z$. Find the area of quadrilateral $W X Y Z$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-4": { s: String.raw`If you roll four fair 6 -sided dice, what is the probability that at least three of them will show the same value?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-5": { s: String.raw`How many ways are there to arrange three indistinguishable rooks on a $6 \times 6$ board such that no two rooks are attacking each other? (Two rooks are attacking each other if and only if they are in the same row or the same column.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-6": { s: String.raw`$A B C D$ is a parallelogram satisfying $A B=7, B C=2$, and $\angle D A B=120^{\circ}$. Parallelogram $E C F A$ is contained in $A B C D$ and is similar to it. Find the ratio of the area of $E C F A$ to the area of $A B C D$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-7": { s: String.raw`Find the number of ordered 2012-tuples of integers $\left(x_{1}, x_{2}, \ldots, x_{2012}\right)$, with each integer between 0 and 2011 inclusive, such that the sum $x_{1}+2 x_{2}+3 x_{3}+\cdots+2012 x_{2012}$ is divisible by 2012 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-8": { s: String.raw`Let $n$ be the 200th smallest positive real solution to the equation $x-\frac{\pi}{2}=\tan x$. Find the greatest integer that does not exceed $\frac{n}{2}$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-9": { s: String.raw`Consider triangle $A B C$ where $B C=7, C A=8$, and $A B=9 . D$ and $E$ are the midpoints of $B C$ and $C A$, respectively, and $A D$ and $B E$ meet at $G$. The reflection of $G$ across $D$ is $G^{\prime}$, and $G^{\prime} E$ meets $C G$ at $P$. Find the length $P G$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-general-10": { s: String.raw`Let $\alpha$ and $\beta$ be reals. Find the least possible value of

$$(2 \cos \alpha+5 \sin \beta-8)^{2}+(2 \sin \alpha+5 \cos \beta-15)^{2} .$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/gen/problems.pdf" },
"2012-hmmt-november-theme-1": { s: String.raw`In a tower of exponents, the exponents are computed from the top down. For example, $2^{2^3}=2^8=256$.

If $4^{4^{4}}=\sqrt[128]{2^{2^{2^{n}}}}$, find $n$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-2": { s: String.raw`In a tower of exponents, the exponents are computed from the top down. For example, $2^{2^3}=2^8=256$.

If $x^{x}=2012^{2012^{2013}}$, find $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-3": { s: String.raw`In a tower of exponents, the exponents are computed from the top down. For example, $2^{2^3}=2^8=256$.

Find the smallest positive integer $n$ such that
$$\underbrace{2^{2^{\cdot^{\cdot^{2}}}}}_{n}>3^{3^{3^3}}.$$
(The notation $\underbrace{2^{2^{\cdot^{\cdot^{2}}}}}_{n}$ is used to denote a power tower with $n$ 2’s. For example, with $n=4$ the tower equals $2^{2^{2^2}}$.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-4": { s: String.raw`In a tower of exponents, the exponents are computed from the top down. For example, $2^{2^3}=2^8=256$.

Find the sum of all real solutions for $x$ to the equation $\left(x^{2}+2 x+3\right)^{\left(x^{2}+2 x+3\right)^{\left(x^{2}+2 x+3\right)}}=2012$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-5": { s: String.raw`In a tower of exponents, the exponents are computed from the top down. For example, $2^{2^3}=2^8=256$.

Given any positive integer, we can write the integer in base 12 and add together the digits of its base 12 representation. We perform this operation on the number $7^{6^{5^{4^{3^{2^1}}}}}$ repeatedly until a single base 12 digit remains. Find this digit.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-6": { s: String.raw`A rectangular piece of paper with vertices $A B C D$ is being cut by a pair of scissors. The pair of scissors starts at vertex $A$, and then cuts along the angle bisector of $D A B$ until it reaches another edge of the paper. One of the two resulting pieces of paper has 4 times the area of the other piece. What is the ratio of the longer side of the original paper to the shorter side?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-7": { s: String.raw`In the game of rock-paper-scissors, two players each choose one of rock, paper, or scissors to play. Rock beats scissors, scissors beats paper, and paper beats rock. If the players play the same thing, the match is considered a draw.

The game of rock-scissors is played just like rock-paper-scissors, except that neither player is allowed to play paper. You play against a poorly-designed computer program that plays rock with $50 \%$ probability and scissors with $50 \%$ probability. If you play optimally against the computer, find the probability that after 8 games you have won at least 4 .`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-8": { s: String.raw`In the game of rock-paper-scissors-lizard-Spock, rock defeats scissors and lizard, paper defeats rock and Spock, scissors defeats paper and lizard, lizard defeats paper and Spock, and Spock defeats rock and scissors, as shown in the below diagram. As before, if two players choose the same move, then there is a draw. If three people each play a game of rock-paper-scissors-lizard-Spock at the same time by choosing one of the five moves at random, what is the probability that one player beats the other two?

@@fig:hmmt/2012/nov-thm-8-1.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-9": { s: String.raw`64 people are in a single elimination rock-paper-scissors tournament, which consists of a 6-round knockout bracket. Each person has a different rock-paper-scissors skill level, and in any game, the person with the higher skill level will always win. For how many players $P$ is it possible that $P$ wins the first four rounds that he plays?
(A 6-round knockout bracket is a tournament which works as follows:
(a) In the first round, all 64 competitors are paired into 32 groups, and the two people in each group play each other. The winners advance to the second round, and the losers are eliminated.
(b) In the second round, the remaining 32 players are paired into 16 groups. Again, the winner of each group proceeds to the next round, while the loser is eliminated.
(c) Each round proceeds in a similar way, eliminating half of the remaining players. After the sixth round, only one player will not have been eliminated. That player is declared the champion.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
"2012-hmmt-november-theme-10": { s: String.raw`In the game of rock-paper-scissors, two players each choose one of rock, paper, or scissors to play. Rock beats scissors, scissors beats paper, and paper beats rock. If the players play the same thing, the match is considered a draw.

In a game of rock-paper-scissors with $n$ people, the following rules are used to determine a champion:
(a) In a round, each person who has not been eliminated randomly chooses one of rock, paper, or scissors to play.
(b) If at least one person plays rock, at least one person plays paper, and at least one person plays scissors, then the round is declared a tie and no one is eliminated. If everyone makes the same move, then the round is also declared a tie.
(c) If exactly two moves are represented, then everyone who made the losing move is eliminated from playing in all further rounds (for example, in a game with 8 people, if 5 people play rock and 3 people play scissors, then the 3 who played scissors are eliminated).
(d) The rounds continue until only one person has not been eliminated. That person is declared the champion and the game ends.

If a game begins with 4 people, what is the expected value of the number of rounds required for a champion to be determined?`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2012/nov/thm/problems.pdf" },
});
