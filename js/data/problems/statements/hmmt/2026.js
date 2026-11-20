// Problems and diagram © 2026 HMMT. Reproduced with permission from HMMT.
// Source: the official HMMT February 2026 individual-round papers.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2026-hmmt-february-algebra-and-number-theory-1": { s: String.raw`A line intersects the graph of $y=x^2+\frac{2}{x}$ at three distinct points. Given that the $x$-coordinates of two of the points are $6$ and $7$, respectively, compute the $x$-coordinate of the third point.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-2": { s: String.raw`Compute the second smallest positive integer $n$ such that

• $n$ is divisible by $101$, and
• the decimal representation of $n$ contains the number $2026$ as a consecutive sequence of digits.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-3": { s: String.raw`Compute the sum of all positive integers $n$ such that $n$ has at least $6$ positive integer divisors and the $6$th largest divisor of $n$ is $6$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-4": { s: String.raw`Let $a$, $b$, and $c$ be pairwise distinct complex numbers such that
$$\begin{aligned}
a^2+ab+b^2 &= 3(a+b),\\
a^2+ac+c^2 &= 3(a+c),\\
b^2+bc+c^2 &= 5(b+c)+1.
\end{aligned}$$
Compute $a$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-5": { s: String.raw`Compute the largest positive integer $n$ such that
$$n \text{ divides } (\lfloor\sqrt{n}\rfloor)!\,n!+450.$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-6": { s: String.raw`The numbers $1,2,\ldots,2100$ are written on a board. Every second, Mark takes two numbers on the board, $a$ and $b$, erases them, and replaces them with $\gcd(a,b)$ and $\operatorname{lcm}(a,b)$. Mark stops once any move he makes will not change the numbers written on the board. Compute the number of divisors of the $2026$th smallest positive integer written on the board when he finishes.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-7": { s: String.raw`Positive real numbers $x$, $y$, and $z$ satisfy the following equations:
$$\begin{aligned}
xyz &= 3,\\
(x-y)(y-z)(z-x) &= 4,\\
(x+y)(y+z)(z+x) &= 40.
\end{aligned}$$
Compute the minimum possible value for $x$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-8": { s: String.raw`Let $a_0,a_1,a_2,\ldots$ be the unique sequence of nonnegative integers less than $397$ with $a_0=1$ and
$$a_{n+1}(a_n+1)^2\equiv a_n\pmod{397}$$
for all nonnegative integers $n$. Given that $a_{2026}=9$, compute the remainder when $a_0+a_1+\cdots+a_{2026}$ is divided by $397$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-9": { s: String.raw`Compute
$$\sum_{k=1}^{\infty}\left(2^{-\lfloor101k/1\rfloor}+2^{-\lfloor101k/2\rfloor}+\cdots+2^{-\lfloor101k/100\rfloor}\right).$$`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-algebra-and-number-theory-10": { s: String.raw`Let
$$S=\sum_{k=0}^{2026} k\binom{2k}{k}2^k.$$
Compute the remainder when $S$ is divided by $2027$. (Note that $2027$ is prime.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/algnt/problems.pdf" },
"2026-hmmt-february-combinatorics-1": { s: String.raw`A math test has $4$ questions. The topic of each question is randomly and independently chosen from algebra, combinatorics, geometry, and number theory. Given that the math test has at least one algebra question, at least one combinatorics question, and at least one geometry question, compute the probability that this test has at least one number theory question.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-2": { s: String.raw`Jacopo is rolling a fair $4$-sided die with faces labeled $1$, $2$, $3$, and $4$. He starts with a score of $0$. Every time he rolls a face with label $i$, he adds $i$ to his score, and then replaces the label of that face with $0$. Compute Jacopo’s expected score after $4$ rolls.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-3": { s: String.raw`The numbers $1$, $2$, $3$, $4$, $5$, $6$, and $7$ are written on a blackboard in some order. Jacob repeatedly swaps numbers at adjacent positions on the blackboard until the numbers are sorted in ascending order. Compute the number of initial orderings for which it is possible that the number $4$ was included in a swap at most once.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-4": { s: String.raw`Sarunyu has a stick of length $1$ with one endpoint marked in red. Every minute, he picks one of his sticks uniformly at random and breaks it into two halves of equal length. Compute the expected length of the stick with the red endpoint after $5$ minutes.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-5": { s: String.raw`Let $S$ be the set of positive integer divisors of $10^9$. Compute the number of subsets $T$ of $S$ such that

• for every element $s$ of $S$, exactly one of $s$ and $10^9/s$ is in $T$, and
• for every element $t$ of $T$, all positive integer divisors of $t$ are in $T$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-6": { s: String.raw`Derek currently owes $\pi$ units of a currency called Money of Indiscrete Type, or MIT for short. Every day, the following happens:

• He flips a fair coin to decide how much of his debt to pay. If he flips heads, he decreases his debt by $1$ MIT. If he flips tails, he decreases his debt by $2$ MITs. If Derek’s debt ever becomes nonpositive, Derek becomes debt-free.
• Afterwards, his remaining debt doubles.

Compute the probability that Derek ever becomes debt-free. (MITs are continuous, so the debt is never rounded.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-7": { s: String.raw`Let $S$ be the set of vertices of a right prism whose bases are regular decagons $A_1A_2\ldots A_{10}$ and $B_1B_2\ldots B_{10}$. A plane, not passing through any vertex of $S$, partitions the vertices of $S$ into two sets, one of which is $M$. Compute the number of possible sets $M$ that can arise out of such a partition.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-8": { s: String.raw`A regular hexagon with side length $4$ is subdivided into a lattice of $96$ equilateral triangles of side length $1$. Let $S$ be the set of all vertices of this lattice. Compute the number of nondegenerate triangles with vertices in $S$ that contain the center of the hexagon strictly in their interior.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-9": { s: String.raw`Let $A_1,A_2,A_3,\ldots$ be a sequence of finite nonempty sets of positive integers. Given that $|A_i\cap A_j|=\gcd(i,j)$ for all (not necessarily distinct) positive integers $i$ and $j$, compute the minimum possible value of
$$\sum_{d\mid250}\max A_d,$$
where the sum ranges over all positive integer divisors $d$ of $250$.
(For a finite nonempty set $S$, we define $\max S$ as the largest element of $S$.)`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-combinatorics-10": { s: String.raw`Let $S$ be the set of all ordered pairs $(x,y)$ of nonnegative integers $0\le x\le 19$ and $0\le y\le 2$. Compute the number of permutations $(x_1,y_1),(x_2,y_2),\ldots,(x_{60},y_{60})$ of the elements of $S$ such that

• $y_1=2$ and $y_{60}=0$;
• for all nonnegative integers $1\le i\le 59$, exactly one of the following holds:
  ◦ $x_i=x_{i+1}$ and $|y_i-y_{i+1}|=1$,
  ◦ $y_i=y_{i+1}$ and $x_i-x_{i+1}$ is $-1$ or $19$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/comb/problems.pdf" },
"2026-hmmt-february-geometry-1": { s: String.raw`Let $ABCD$ and $WXYZ$ be squares such that $W$ lies on segment $AD$, $X$ lies on segment $AB$, and points $Y$ and $Z$ lie strictly inside $ABCD$. Given that $AW=4$, $AX=5$, and $AB=12$, compute the area of triangle $\triangle BCY$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-2": { s: String.raw`Let $HORSE$ be a convex pentagon such that $\angle EHO=\angle ORS=\angle SEH=90^\circ$ and $\angle HOR=\angle RSE=135^\circ$. Given that $HO=20$, $SE=26$, and $OS=10$, compute the area of $HORSE$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-3": { s: String.raw`Let $ABCD$ be a rectangle with $AB=12$ and $BC=16$. Points $W$, $X$, $Y$, and $Z$ lie on sides $AB$, $BC$, $CD$, and $DA$, respectively, such that $WXYZ$ is a rhombus with area $120$. Compute $XY$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-4": { s: String.raw`Let $ABC$ be a triangle with $\angle BAC=90^\circ$. Points $X$ and $Y$ are such that $B$, $X$, $Y$, and $C$ lie on segment $BC$ in that order, $BX=4$, $XY=5$, and $YC=3$. Let $T$ be a point lying on segment $AC$ such that $TA=TX=TY=\ell$ for some $\ell$. Compute $\ell$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-5": { s: String.raw`In the diagram below, three circles of radius $2$ are internally tangent to a circle $\Omega$ centered at $O$ of radius $11$, and three chords of $\Omega$ are each tangent to two of the three circles. Given that $O$ lies inside the triangle formed by the three chords and two of the chords have length $4\sqrt{30}$, compute the length of the third chord.

@@fig:hmmt/2026/geo-5.png@@`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-6": { s: String.raw`Let $ABC$ be a triangle, and $M$ be the midpoint of segment $BC$. Points $P$ and $Q$ lie on segments $AB$ and $AC$, respectively, so that $\angle PMB=\angle QMC=\frac12\angle BAC$. Given that $AP=1$, $AQ=3$, and $BC=8$, compute $BP$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-7": { s: String.raw`Let $ABC$ be an isosceles triangle with $AB=AC$. Points $P$ and $Q$ are located inside triangle $ABC$ such that $BP=PQ=QC$. Suppose that $\angle BAP=20^\circ$, $\angle PAQ=46^\circ$, and $\angle QAC=26^\circ$. Compute the measure of $\angle APC$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-8": { s: String.raw`Let $ABC$ be a triangle with orthocenter $H$. The internal angle bisector of $\angle BAC$ meets the circumcircles of triangles $ABH$, $ACH$, and $ABC$ again at points $P$, $Q$, and $M$, respectively. Suppose that points $A$, $P$, $Q$, and $M$ are distinct and lie on the internal angle bisector of $\angle BAC$ in that order. Given that $AP=4$, $AQ=5$, and $BC=7$, compute $AM$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-9": { s: String.raw`Let $ABC$ be triangle with incenter $I$ and incircle $\omega$. The circumcircle of triangle $BIC$ intersects $\omega$ at points $E$ and $F$. Suppose that $\Gamma\ne\omega$ is a circle passing through $E$ and $F$ and tangent to lines $AB$ and $AC$. If $AB=5$, $AC=7$, and $\Gamma$ has twice the radius of $\omega$, compute $BC$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
"2026-hmmt-february-geometry-10": { s: String.raw`Let $ABC$ be a triangle with centroid $G$ and circumcenter $O$. Suppose that the orthocenter of triangle $AGO$ lies on line $BC$. Given that $AB=11$ and $AC=13$, compute $BC$.`, u: "https://hmmt-archive.s3.amazonaws.com/tournaments/2026/feb/geo/problems.pdf" },
});
