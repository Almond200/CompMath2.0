// Problems and diagrams © 2025 Berkeley Math Tournament. Reproduced with permission from the Berkeley Math Tournament.
// Source: the official Berkeley Math Tournament papers. Built by tools/statements/build.py from tools/statements/spec/bmt/2025.txt.
Object.assign(window.MATH_STATEMENTS = window.MATH_STATEMENTS || {}, {
"2025-bmt-algebra-1": { s: String.raw`Real numbers $x,y$, and $z$ satisfy
$$\begin{gathered}5x+6y+7z=0,\\ 6x+7y+8z=1.\end{gathered}$$
Compute $65x+66y+67z$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-2": { s: String.raw`A hat initially contains five slips labeled with the numbers $1$, $2$, $3$, $4$, and $5$ (one slip per number). Every minute, Jessica adds a new slip labeled with the number $20$ to the hat. How many slips are in the hat when the average of the numbers in the hat is $5$ times the initial average?`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-3": { s: String.raw`An arithmetic sequence is a sequence of numbers where the difference between any two consecutive terms is the same. Harsh writes an arithmetic sequence where the ratio of the second term to the first term is $4$, and the sum of the third and fourth terms is $34$. Compute the second term of Harsh's sequence.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-4": { s: String.raw`Let $f(x)=(2x^2+7x+3)(x^2-2x-15)$. The graph of $f(x)$ in the coordinate plane is translated $4$ units to the right and then rotated about the origin by $180$ degrees. The resulting graph is the graph of the function $g(x)$. Compute the sum of the distinct roots of $g(x)$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-5": { s: String.raw`Complex numbers $a$, $b$, and $c$ satisfy the equations
$$\begin{gathered}a^3+b^3=2-3ab(a+b),\\ b^3+c^3=16-3bc(b+c),\\ c^3+a^3=54-3ca(c+a).\end{gathered}$$
Compute the sum of all distinct possible real values of $a+b+c$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-6": { s: String.raw`Compute the sum of all distinct real numbers $x$ satisfying $|x|\le\frac{1}{2}$ and
$$\sin\left(\log_{10}\left(\frac{1}{x}+\frac{1}{x^2}\right)\right)=0.$$
Note that the argument of the sine function is assumed to be in radians.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-7": { s: String.raw`Let $\omega=e^{\frac{2i\pi}{5}}$. Compute
$$\prod_{i=1}^{5}\prod_{j=i+1}^{5}(\omega^i-\omega^j)^2.$$`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-8": { s: String.raw`Let $a=\log_6(30)$ and $b=\log_{15}(24)$. Then
$$\frac{2ab+2a-1}{ab+b+1}=\log_m(n)$$
for positive integers $m$ and $n$ such that $m$ is as small as possible. Compute $m+n$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-9": { s: String.raw`Distinct complex numbers $a,b$, and $c$ each have integer real part and satisfy the equations
$$ab+bc+ca=300,$$
$$(a-b)^5+(b-c)^5+(c-a)^5=0.$$
Compute the sum of the three least possible positive real values of $abc$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-algebra-10": { s: String.raw`Complex numbers $a_1,a_2,\dots,a_{10}$ satisfy the following property for each $1\le k\le 10$:
$$\sum_{i=1}^{10}a_i^9=10a_k^{10}+a_k^9-2^9.$$
Given $a_1a_2\cdots a_{10}=-\frac{m}{n}$ for relatively prime positive integers $m$ and $n$, compute the sum of the digits of $m+n$.`, u: "https://berkeley.mt/archives/bmt-2025/algebra-problems.pdf" },
"2025-bmt-discrete-math-1": { s: String.raw`Jordan has two white socks and two black socks in their sock drawer. If they pull out two socks uniformly at random without replacement, what is the probability that they are the same color?`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-2": { s: String.raw`Find the positive integer $n$ such that $n+10$ is both a multiple of $n$ and a factor of $n+100$.`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-3": { s: String.raw`In how many ways can ten identical white blocks be placed into a red box, a yellow box, a green box, and a blue box such that no box is empty, and at least two boxes contain the same number of blocks?`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-4": { s: String.raw`A substring of a positive integer $n$ is a positive integer whose digits appear consecutively in the digits of $n$. For example, $10$, $00=0$, and $02=2$ are two-digit substrings of $1002$, but $12$ and $01=1$ are not. An integer $n$ is chosen uniformly at random from the integers between $1000$ and $9999$ inclusive. Compute the probability that all two-digit substrings of $n$ are divisible by three.`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-5": { s: String.raw`Over all triples of positive integers $(a,b,c)$ satisfying the equation
$$\gcd\left(\operatorname{lcm}(a,b),\operatorname{lcm}(a,c),\operatorname{lcm}(b,c)\right)=2025,$$
compute the smallest possible value of $a+b+c$.`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-6": { s: String.raw`An increasing sequence of positive integers is three-hating if it contains at least one term and alternates between integers that are multiples of $3$ and integers that are not multiples of $3$. For example, $(1)$, $(3,4,6)$, and $(3)$ are three-hating while $(3,6)$ and $(3,6,7,9)$ are not. Compute the number of three-hating sequences in which every term is less than or equal to $12$.`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-7": { s: String.raw`Fourteen people are sitting at a circular table with fourteen distinct seats. They all get up to eat lunch and then return to the table. When they sit down again, each person sits either in their original seat or a seat adjacent to their original seat, and no two people sit in the same seat. In how many ways can this occur?`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-8": { s: String.raw`Let $N=2025\times 202^5\times 20^{25}$. For each positive integer $x$, define $\sigma(x)$ to be the sum of the positive divisors of $x$. Define $h(x)$ to be the sum of all positive divisors $y$ of $x$ such that $\sigma(y)$ is even. For example, $\sigma(9)=13$ and $h(9)=3$. Find the number of positive divisors $k$ of $N$ such that $h(k)$ is odd.`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-9": { s: String.raw`In a tournament, twelve players compete in a sequence of matches. Each match consists of two players, and no two matches have the same pair of players. Furthermore, no two players who compete in the same number of matches in the tournament compete against each other in a match. What is the greatest possible number of matches that can be played in the tournament?`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-discrete-math-10": { s: String.raw`Let $S$ be the set of triples of nonnegative integers $(p,q,r)$ such that
$$3^p\cdot 21^q+9\cdot 2^r$$
is a perfect square. Compute
$$\sum_{(p,q,r)\in S}100p+10q+r.$$`, u: "https://berkeley.mt/archives/bmt-2025/discrete-problems.pdf" },
"2025-bmt-geometry-1": { s: String.raw`Triangle $\triangle ABC$ has a right angle at $B$ and all integer side lengths. Square $ACDE$ is constructed outside $\triangle ABC$. Given $AC=10$, what is the perimeter of pentagon $ABCDE$?

@@fig:bmt/2025/geometry-1.png@@`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-2": { s: String.raw`Stephanie uses a rope of length $4$ meters to tie a sheep to a point that is $2$ meters away from the corner of a large rectangular building. Given the sheep cannot enter the building, what is the area, in square meters, that the sheep can graze?

@@fig:bmt/2025/geometry-2.png@@`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-3": { s: String.raw`Square $ABCD$, regular pentagon $ABEFG$, and regular hexagon $ABHIJK$ all lie in the same plane so that the square lies inside the pentagon, and the pentagon lies inside the hexagon. Compute the degree measure of $\angle DGK$ which is less than $180^\circ$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-4": { s: String.raw`Let triangle $\triangle ABC$ be equilateral. Points $D$ and $E$ lie on sides $\overline{AB}$ and $\overline{AC}$, respectively, such that $\overline{DE}\parallel\overline{BC}$ and $\overline{CD}\perp\overline{BE}$. Compute $\dfrac{AD}{AB}$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-5": { s: String.raw`Quadrilateral $ABCD$ has $AB=CD=25$, $BC=50$, and acute angles at vertices $B$ and $C$. The distance from $C$ to line $\overleftrightarrow{AB}$ is $48$, and the distance from $B$ to line $\overleftrightarrow{CD}$ is $40$. Compute the area of quadrilateral $ABCD$.

@@fig:bmt/2025/geometry-5.png@@`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-6": { s: String.raw`Circles $I$ and $O$ have radii $1$ and $8$, respectively, and the distance between their centers is $4$. Let $\mathcal{C}$ be the set of all circles simultaneously internally tangent to $O$ and externally tangent to $I$. Compute the area enclosed by the curve formed from the centers of all circles in $\mathcal{C}$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-7": { s: String.raw`In three-dimensional coordinate space, a lattice point is a point whose coordinates are all integers. A triangular prism has all vertices at lattice points. Its triangular faces are both parallel to the $xy$-plane, and its rectangular faces are all parallel to the $z$-axis. The prism has $34$ lattice points on its edges (including the vertices), $72$ lattice points in the interior of its faces (not including the edges), and $126$ lattice points in its interior (not including the faces). What is the volume of the prism?`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-8": { s: String.raw`In acute triangle $\triangle ABC$ with orthocenter $H$, let $X$ be the unique point on $\overline{BC}$ for which angle $\angle AXH$ is maximized. Given $HX=15$, $AX=20$, and $BC=30$, compute $AB+AC$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-9": { s: String.raw`Triangle $\triangle ABC$ has $AB=4$, $AC=5$, and $BC=6$. Points $E$ and $F$ are the midpoints of sides $\overline{AB}$ and $\overline{AC}$, respectively. Let $P$ be the foot of the altitude from $A$ to side $\overline{BC}$, and let $H$ be the midpoint of $\overline{AP}$. The circumcircles of triangles $\triangle HEB$ and $\triangle HFC$ intersect at $K\ne H$. Compute $AK^2$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
"2025-bmt-geometry-10": { s: String.raw`Triangle $\triangle ABC$ has $AB=3+\sqrt{2}$ and $AC=1+\sqrt{2}$. Point $D$ lies on side $\overline{BC}$ such that $AD=2-\sqrt{2}$. The internal angle bisector of $\angle BAD$ intersects the circumcircle of triangle $\triangle BAD$ at $X\ne A$, and the internal angle bisector of $\angle CAD$ intersects the circumcircle of triangle $\triangle CAD$ at $Y\ne A$. Given $\overline{XY}\parallel\overline{BC}$, compute $XY$.`, u: "https://berkeley.mt/archives/bmt-2025/geometry-problems.pdf" },
});
