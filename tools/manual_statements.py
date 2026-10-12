"""Statements typed in from PDFs Stanley supplied (LIVE has no Fall 2021 AMC). Read by tools/fetch-live-statements.py,
which writes them into js/data/problems/statements/2021.js on every run. Only the problems and answer choices are used,
never the solutions. Each answer was checked against the answer key (10B) or the official solutions booklet (10A), and
the numbers were re-derived by computation when this was added. Figures are cropped from the PDFs into
js/data/problems/figures/amc10/2021FallA and 2021FallB.

The `u` marker names the source: "pdf:fall-2021-amc-10a" is the MAA's official Fall 2021 AMC 10A solutions booklet,
"pdf:fall-2021-amc-10b" a copy of the Fall 2021 AMC 10B paper with its answer key."""

A = "pdf:fall-2021-amc-10a"
B = "pdf:fall-2021-amc-10b"

FALL_2021_PDF = {
"2021-fall-amc-10a-1": (A, r"""What is the value of $\frac{(2112-2021)^2}{169}?$

(A) $7$  (B) $21$  (C) $49$  (D) $64$  (E) $91$"""),
"2021-fall-amc-10a-2": (A, r"""Menkara has a $4 \times 6$ index card. If she shortens the length of one side of this card by $1$ inch, the card would have area $18$ square inches. What would the area of the card be in square inches if instead she shortens the length of the other side by $1$ inch?

(A) $16$  (B) $17$  (C) $18$  (D) $19$  (E) $20$"""),
"2021-fall-amc-10a-3": (A, r"""What is the maximum number of balls of clay of radius $2$ that can completely fit inside a cube of side length $6$ assuming the balls can be reshaped but not compressed before they are packed in the cube?

(A) $3$  (B) $4$  (C) $5$  (D) $6$  (E) $7$"""),
"2021-fall-amc-10a-4": (A, r"""Mr. Lopez has a choice of two routes to get to work. Route A is $6$ miles long, and his average speed along this route is $30$ miles per hour. Route B is $5$ miles long, and his average speed along this route is $40$ miles per hour, except for a $\frac{1}{2}$-mile stretch in a school zone where his average speed is $20$ miles per hour. By how many minutes is Route B quicker than Route A?

(A) $2 \frac{3}{4}$  (B) $3 \frac{3}{4}$  (C) $4 \frac{1}{2}$  (D) $5 \frac{1}{2}$  (E) $6 \frac{3}{4}$"""),
"2021-fall-amc-10a-5": (A, r"""The six-digit number $\underline{2}\,\underline{0}\,\underline{2}\,\underline{1}\,\underline{0}\,\underline{A}$ is prime for only one digit $A.$ What is $A?$

(A) $1$  (B) $3$  (C) $5$  (D) $7$  (E) $9$"""),
"2021-fall-amc-10a-6": (A, r"""Elmer the emu takes $44$ equal strides to walk between consecutive telephone poles on a rural road. Oscar the ostrich can cover the same distance in $12$ equal leaps. The telephone poles are evenly spaced, and the $41$st pole along this road is exactly one mile ($5280$ feet) from the first pole. How much longer, in feet, is Oscar's leap than Elmer's stride?

(A) $6$  (B) $8$  (C) $10$  (D) $11$  (E) $15$"""),
"2021-fall-amc-10a-7": (A, r"""As shown in the figure below, point $E$ lies in the opposite half-plane determined by line $CD$ from point $A$ so that $\angle CDE = 110^\circ$. Point $F$ lies on $\overline{AD}$ so that $DE = DF$, and $ABCD$ is a square. What is the degree measure of $\angle AFE?$

@@fig:amc10/2021FallA/7.png@@

(A) $160$  (B) $164$  (C) $166$  (D) $170$  (E) $174$"""),
"2021-fall-amc-10a-8": (A, r"""A two-digit positive integer is said to be cuddly if it is equal to the sum of its nonzero tens digit and the square of its units digit. How many two-digit positive integers are cuddly?

(A) $0$  (B) $1$  (C) $2$  (D) $3$  (E) $4$"""),
"2021-fall-amc-10a-9": (A, r"""When a certain unfair die is rolled, an even number is $3$ times as likely to appear as an odd number. The die is rolled twice. What is the probability that the sum of the numbers rolled is even?

(A) $\frac{3}{8}$  (B) $\frac{4}{9}$  (C) $\frac{5}{9}$  (D) $\frac{9}{16}$  (E) $\frac{5}{8}$"""),
"2021-fall-amc-10a-10": (A, r"""A school has $100$ students and $5$ teachers. In the first period, each student is taking one class, and each teacher is teaching one class. The enrollments in the classes are $50, 20, 20, 5,$ and $5.$ Let $t$ be the average value obtained if a teacher is picked at random and the number of students in their class is noted. Let $s$ be the average value obtained if a student is picked at random and the number of students in their class, including that student, is noted. What is $t-s?$

(A) $-18.5$  (B) $-13.5$  (C) $0$  (D) $13.5$  (E) $18.5$"""),
"2021-fall-amc-10a-11": (A, r"""Emily sees a ship traveling at a constant speed along a straight section of a river. She walks parallel to the riverbank at a uniform rate faster than the ship. She counts $210$ equal steps walking from the back of the ship to the front. Walking in the opposite direction, she counts $42$ steps of the same size from the front of the ship to the back. In terms of Emily's equal steps, what is the length of the ship?

(A) $70$  (B) $84$  (C) $98$  (D) $105$  (E) $126$"""),
"2021-fall-amc-10a-12": (A, r"""The base-nine representation of the number $N$ is $27{,}006{,}000{,}052_{\text{nine}}.$ What is the remainder when $N$ is divided by $5?$

(A) $0$  (B) $1$  (C) $2$  (D) $3$  (E) $4$"""),
"2021-fall-amc-10a-13": (A, r"""Each of $6$ balls is randomly and independently painted either black or white with equal probability. What is the probability that every ball is different in color from more than half of the other $5$ balls?

(A) $\frac{1}{64}$  (B) $\frac{1}{6}$  (C) $\frac{1}{4}$  (D) $\frac{5}{16}$  (E) $\frac{1}{2}$"""),
"2021-fall-amc-10a-14": (A, r"""How many ordered pairs $(x, y)$ of real numbers satisfy the following system of equations?
$$\begin{aligned} x^2 + 3y &= 9 \\ (|x| + |y| - 4)^2 &= 1 \end{aligned}$$

(A) $1$  (B) $2$  (C) $3$  (D) $5$  (E) $7$"""),
"2021-fall-amc-10a-15": (A, r"""Isosceles triangle $ABC$ has $AB = AC = 3\sqrt{6},$ and a circle with radius $5\sqrt{2}$ is tangent to line $AB$ at $B$ and to line $AC$ at $C.$ What is the area of the circle that passes through vertices $A, B,$ and $C?$

(A) $24\pi$  (B) $25\pi$  (C) $26\pi$  (D) $27\pi$  (E) $28\pi$"""),
"2021-fall-amc-10a-16": (A, r"""The graph of $f(x) = |\lfloor x \rfloor| - |\lfloor 1 - x \rfloor|$ is symmetric about which of the following? (Here $\lfloor x \rfloor$ is the greatest integer not exceeding $x.$)

(A) the $y$-axis  (B) the line $x = 1$  (C) the origin  (D) the point $\left(\frac{1}{2}, 0\right)$  (E) the point $(1, 0)$"""),
"2021-fall-amc-10a-17": (A, r"""An architect is building a structure that will place vertical pillars at the vertices of regular hexagon $ABCDEF,$ which is lying horizontally on the ground. The six pillars will hold up a flat solar panel that will not be parallel to the ground. The heights of the pillars at $A,$ $B,$ and $C$ are $12,$ $9,$ and $10$ meters, respectively. What is the height, in meters, of the pillar at $E?$

(A) $9$  (B) $6\sqrt{3}$  (C) $8\sqrt{3}$  (D) $17$  (E) $12\sqrt{3}$"""),
"2021-fall-amc-10a-18": (A, r"""A farmer's rectangular field is partitioned into a $2$ by $2$ grid of $4$ rectangular sections as shown in the figure. In each section the farmer will plant one crop: corn, wheat, soybeans, or potatoes. The farmer does not want to grow corn and wheat in any two sections that share a border, and the farmer does not want to grow soybeans and potatoes in any two sections that share a border. Given these restrictions, in how many ways can the farmer choose crops to plant in each of the four sections of the field?

@@fig:amc10/2021FallA/18.png@@

(A) $12$  (B) $64$  (C) $84$  (D) $90$  (E) $144$"""),
"2021-fall-amc-10a-19": (A, r"""A disk of radius $1$ rolls all the way around the inside of a square of side length $s > 4$ and sweeps out a region of area $A.$ A second disk of radius $1$ rolls all the way around the outside of the same square and sweeps out a region of area $2A.$ The value of $s$ can be written as $a + \frac{b\pi}{c},$ where $a,$ $b,$ and $c$ are positive integers and $b$ and $c$ are relatively prime. What is $a+b+c?$

(A) $10$  (B) $11$  (C) $12$  (D) $13$  (E) $14$"""),
"2021-fall-amc-10a-20": (A, r"""For how many ordered pairs $(b, c)$ of positive integers does neither $x^2 + bx + c = 0$ nor $x^2 + cx + b = 0$ have two distinct real solutions?

(A) $4$  (B) $6$  (C) $8$  (D) $12$  (E) $16$"""),
"2021-fall-amc-10a-21": (A, r"""Each of $20$ balls is tossed independently and at random into one of $5$ bins. Let $p$ be the probability that some bin ends up with $3$ balls, another with $5$ balls, and the other three with $4$ balls each. Let $q$ be the probability that every bin ends up with $4$ balls. What is $\frac{p}{q}?$

(A) $1$  (B) $4$  (C) $8$  (D) $12$  (E) $16$"""),
"2021-fall-amc-10a-22": (A, r"""Inside a right circular cone with base radius $5$ and height $12$ are three congruent spheres each with radius $r.$ Each sphere is tangent to the other two spheres and also tangent to the base and side of the cone. What is $r?$

(A) $\frac{3}{2}$  (B) $\frac{90 - 40\sqrt{3}}{11}$  (C) $2$  (D) $\frac{144 - 25\sqrt{3}}{44}$  (E) $\frac{5}{2}$"""),
"2021-fall-amc-10a-23": (A, r"""For each positive integer $n,$ let $f_1(n)$ be twice the number of positive integer divisors of $n,$ and for $j \ge 2,$ let $f_j(n) = f_1(f_{j-1}(n)).$ For how many values of $n \le 50$ is $f_{50}(n) = 12?$

(A) $7$  (B) $8$  (C) $9$  (D) $10$  (E) $11$"""),
"2021-fall-amc-10a-24": (A, r"""Each of the $12$ edges of a cube is labeled $0$ or $1.$ Two labelings are considered different even if one can be obtained from the other by a sequence of one or more rotations and/or reflections. For how many such labelings is the sum of the labels on the edges of each of the $6$ faces of the cube equal to $2?$

(A) $8$  (B) $10$  (C) $12$  (D) $16$  (E) $20$"""),
"2021-fall-amc-10a-25": (A, r"""A quadratic polynomial $p(x)$ with real coefficients and leading coefficient $1$ is called disrespectful if the equation $p(p(x)) = 0$ is satisfied by exactly three real numbers. Among all the disrespectful quadratic polynomials, there is a unique such polynomial $\tilde{p}(x)$ for which the sum of the roots is maximized. What is $\tilde{p}(1)?$

(A) $\frac{5}{16}$  (B) $\frac{1}{2}$  (C) $\frac{5}{8}$  (D) $1$  (E) $\frac{9}{8}$"""),

"2021-fall-amc-10b-1": (B, r"""What is the value of $1234 + 2341 + 3412 + 4123?$

(A) $10{,}000$  (B) $10{,}010$  (C) $10{,}110$  (D) $11{,}000$  (E) $11{,}110$"""),
"2021-fall-amc-10b-2": (B, r"""What is the area of the shaded figure shown below?

@@fig:amc10/2021FallB/2.png@@

(A) $4$  (B) $6$  (C) $8$  (D) $10$  (E) $12$"""),
"2021-fall-amc-10b-3": (B, r"""The expression
$$\frac{2021}{2020} - \frac{2020}{2021}$$
is equal to the fraction $\frac{p}{q}$ in which $p$ and $q$ are positive integers whose greatest common divisor is $1.$ What is $p?$

(A) $1$  (B) $9$  (C) $2020$  (D) $2021$  (E) $4041$"""),
"2021-fall-amc-10b-4": (B, r"""At noon on a certain day, Minneapolis is $N$ degrees warmer than St. Louis. At $4{:}00$ the temperature in Minneapolis has fallen by $5$ degrees while the temperature in St. Louis has risen by $3$ degrees, at which time the temperatures in the two cities differ by $2$ degrees. What is the product of all possible values of $N?$

(A) $10$  (B) $30$  (C) $60$  (D) $100$  (E) $120$"""),
"2021-fall-amc-10b-5": (B, r"""Let
$$n = 8^{2022}.$$
Which of the following is equal to $\frac{n}{4}?$

(A) $4^{1010}$  (B) $2^{2022}$  (C) $8^{2018}$  (D) $4^{3031}$  (E) $4^{3032}$"""),
"2021-fall-amc-10b-6": (B, r"""The least positive integer with exactly $2021$ distinct positive divisors can be written in the form $m \cdot 6^k,$ where $m$ and $k$ are integers and $6$ is not a divisor of $m.$ What is $m+k?$

(A) $47$  (B) $58$  (C) $59$  (D) $88$  (E) $90$"""),
"2021-fall-amc-10b-7": (B, r"""Call a fraction $\frac{a}{b},$ not necessarily in simplest form, special if $a$ and $b$ are positive integers whose sum is $15.$ How many distinct integers can be written as the sum of two, not necessarily different, special fractions?

(A) $9$  (B) $10$  (C) $11$  (D) $12$  (E) $13$"""),
"2021-fall-amc-10b-8": (B, r"""The greatest prime number that is a divisor of $16{,}384$ is $2$ because $16{,}384 = 2^{14}.$ What is the sum of the digits of the greatest prime number that is a divisor of $16{,}383?$

(A) $3$  (B) $7$  (C) $10$  (D) $16$  (E) $22$"""),
"2021-fall-amc-10b-9": (B, r"""The knights in a certain kingdom come in two colors: $\frac{2}{7}$ of them are red, and the rest are blue. Furthermore, $\frac{1}{6}$ of the knights are magical, and the fraction of red knights who are magical is $2$ times the fraction of blue knights who are magical. What fraction of red knights are magical?

(A) $\frac{2}{9}$  (B) $\frac{3}{13}$  (C) $\frac{7}{27}$  (D) $\frac{2}{7}$  (E) $\frac{1}{3}$"""),
"2021-fall-amc-10b-10": (B, r"""Forty slips of paper numbered $1$ to $40$ are placed in a hat. Alice and Bob each draw one number from the hat without replacement, keeping their numbers hidden from each other. Alice says, "I can't tell who has the larger number." Then Bob says, "I know who has the larger number." Alice says, "You do? Is your number prime?" Bob replies, "Yes." Alice says, "In that case, if I multiply your number by $100$ and add my number, the result is a perfect square." What is the sum of the two numbers drawn from the hat?

(A) $27$  (B) $37$  (C) $47$  (D) $57$  (E) $67$"""),
"2021-fall-amc-10b-12": (B, r"""Which of the following conditions is sufficient to guarantee that integers $x,$ $y,$ and $z$ satisfy the equation
$$x(x-y)+y(y-z)+z(z-x) = 1?$$

(A) $x > y$ and $y = z$
(B) $x = y - 1$ and $y = z - 1$
(C) $x = z + 1$ and $y = x + 1$
(D) $x = z$ and $y - 1 = x$
(E) $x + y + z = 1$"""),
"2021-fall-amc-10b-13": (B, r"""A square with side length $3$ is inscribed in an isosceles triangle with one side of the square along the base of the triangle. A square with side length $2$ has two vertices on the other square and the other two on sides of the triangle, as shown. What is the area of the triangle?

@@fig:amc10/2021FallB/13.png@@

(A) $19\frac{1}{4}$  (B) $20\frac{1}{4}$  (C) $21\frac{3}{4}$  (D) $22\frac{1}{2}$  (E) $23\frac{3}{4}$"""),
"2021-fall-amc-10b-14": (B, r"""Una rolls $6$ standard $6$-sided dice simultaneously and calculates the product of the $6$ numbers obtained. What is the probability that the product is divisible by $4?$

(A) $\frac{3}{4}$  (B) $\frac{57}{64}$  (C) $\frac{59}{64}$  (D) $\frac{187}{192}$  (E) $\frac{63}{64}$"""),
"2021-fall-amc-10b-15": (B, r"""In square $ABCD,$ points $P$ and $Q$ lie on $\overline{AD}$ and $\overline{AB},$ respectively. Segments $\overline{BP}$ and $\overline{CQ}$ intersect at right angles at $R,$ with $BR = 6$ and $PR = 7.$ What is the area of the square?

@@fig:amc10/2021FallB/15.png@@

(A) $85$  (B) $93$  (C) $100$  (D) $117$  (E) $125$"""),
"2021-fall-amc-10b-16": (B, r"""Five balls are arranged around a circle. Chris chooses two adjacent balls at random and interchanges them. Then Silva does the same, with her choice of adjacent balls to interchange being independent of Chris's. What is the expected number of balls that occupy their original positions after these two successive transpositions?

(A) $1.6$  (B) $1.8$  (C) $2.0$  (D) $2.2$  (E) $2.4$"""),
"2021-fall-amc-10b-17": (B, r"""Distinct lines $\ell$ and $m$ lie in the $xy$-plane. They intersect at the origin. Point $P(-1, 4)$ is reflected about line $\ell$ to point $P',$ and then $P'$ is reflected about line $m$ to point $P''.$ The equation of line $\ell$ is $5x - y = 0,$ and the coordinates of $P''$ are $(4, 1).$ What is the equation of line $m?$

(A) $5x + 2y = 0$  (B) $3x + 2y = 0$  (C) $x - 3y = 0$  (D) $2x - 3y = 0$  (E) $5x - 3y = 0$"""),
"2021-fall-amc-10b-18": (B, r"""Three identical square sheets of paper each with side length $6$ are stacked on top of each other. The middle sheet is rotated clockwise $30^\circ$ about its center and the top sheet is rotated clockwise $60^\circ$ about its center, resulting in the $24$-sided polygon shown in the figure below. The area of this polygon can be expressed in the form $a - b\sqrt{c},$ where $a,$ $b,$ and $c$ are positive integers, and $c$ is not divisible by the square of any prime. What is $a+b+c?$

@@fig:amc10/2021FallB/18.png@@

(A) $75$  (B) $93$  (C) $96$  (D) $129$  (E) $147$"""),
"2021-fall-amc-10b-19": (B, r"""Let $N$ be the positive integer $7777\ldots777,$ a $313$-digit number where each digit is a $7.$ Let $f(r)$ be the leading digit of the $r$th root of $N.$ What is
$$f(2) + f(3) + f(4) + f(5) + f(6)?$$

(A) $8$  (B) $9$  (C) $11$  (D) $22$  (E) $29$"""),
"2021-fall-amc-10b-20": (B, r"""In a particular game, each of $4$ players rolls a standard $6$-sided die. The winner is the player who rolls the highest number. If there is a tie for the highest roll, those involved in the tie will roll again and this process will continue until one player wins. Hugo is one of the players in this game. What is the probability that Hugo's first roll was a $5,$ given that he won the game?

(A) $\frac{61}{216}$  (B) $\frac{367}{1296}$  (C) $\frac{41}{144}$  (D) $\frac{185}{648}$  (E) $\frac{11}{36}$"""),
"2021-fall-amc-10b-21": (B, r"""Regular polygons with $5, 6, 7,$ and $8$ sides are inscribed in the same circle. No two of the polygons share a vertex, and no three of their sides intersect at a common point. At how many points inside the circle do two of their sides intersect?

(A) $52$  (B) $56$  (C) $60$  (D) $64$  (E) $68$"""),
"2021-fall-amc-10b-22": (B, r"""For each integer $n \ge 2,$ let $S_n$ be the sum of all products $jk,$ where $j$ and $k$ are integers and $1 \le j < k \le n.$ What is the sum of the $10$ least values of $n$ such that $S_n$ is divisible by $3?$

(A) $196$  (B) $197$  (C) $198$  (D) $199$  (E) $200$"""),
"2021-fall-amc-10b-23": (B, r"""Each of the $5$ sides and the $5$ diagonals of a regular pentagon are randomly and independently colored red or blue with equal probability. What is the probability that there will be a triangle whose vertices are among the vertices of the pentagon such that all of its sides have the same color?

(A) $\frac{2}{3}$  (B) $\frac{105}{128}$  (C) $\frac{125}{128}$  (D) $\frac{253}{256}$  (E) $1$"""),
"2021-fall-amc-10b-24": (B, r"""A cube is constructed from $4$ white unit cubes and $4$ blue unit cubes. How many different ways are there to construct the $2 \times 2 \times 2$ cube using these smaller cubes? (Two constructions are considered the same if one can be rotated to match the other.)

(A) $7$  (B) $8$  (C) $9$  (D) $10$  (E) $11$"""),
"2021-fall-amc-10b-25": (B, r"""A rectangle with side lengths $1$ and $3,$ a square with side length $1,$ and a rectangle $R$ are inscribed inside a larger square as shown. The sum of all possible values for the area of $R$ can be written in the form $\frac{m}{n},$ where $m$ and $n$ are relatively prime positive integers. What is $m+n?$

@@fig:amc10/2021FallB/25.png@@

(A) $14$  (B) $23$  (C) $46$  (D) $59$  (E) $67$"""),
}
