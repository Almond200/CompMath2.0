// Learn, AIME Algebra, chapter A5: inequalities and bounds (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A5"] = {
  lessons: {
    "A5.1": {
      prereq: ["trivial-inequality", "vertex-form"],
      cards: [],
      body: String.raw`This chapter finds largest and smallest values. Its tools are the inequality between the arithmetic and geometric means, the Cauchy-Schwarz inequality, sums of squares, rearrangement and the triangle inequality, and the care that the domain and the equality case demand.

Every square is at least $0$, and most inequalities in contests come from that fact. Completing the square shows that $x^2 - 6x + 13 = (x - 3)^2 + 4$ is at least $4$, with equality at $x = 3$. The inequality of the means, $\tfrac{a + b}{2} \ge \sqrt{ab}$ for positive $a$ and $b$, is the same fact applied to $\left(\sqrt a - \sqrt b\right)^2$; it bounds a sum below by a product and a product above by a sum. So $x + \tfrac4x \ge 2\sqrt4 = 4$ for $x \gt 0$, and if $x + y = 10$ then $xy \le 25$.

The Cauchy-Schwarz inequality, $(a_1b_1 + a_2b_2)^2 \le (a_1^2 + a_2^2)(b_1^2 + b_2^2)$, bounds a linear expression on a circle or a sphere. Rearrangement says that a sum of products is largest when the two lists are sorted the same way, and the triangle inequality bounds a sum of distances.

An inequality gives a bound, and the bound is the answer only when equality can happen within the allowed values. The equality case of every inequality tells where to look: the means are equal when the numbers are equal, Cauchy-Schwarz when the lists are proportional. When the variables must be integers or lie in a range, the extreme may sit at an endpoint or at the nearest allowed value.

The lessons take these ideas in turn: the inequality of the means (A5.2), Cauchy-Schwarz (A5.3), squares, rearrangement and estimates (A5.4), extremes with a domain (A5.5), and when a bound is sharp enough (A5.6). The Summary (A5.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the least value of $x + \dfrac4x$ for $x \gt 0$.`, answer: "4",
          solution: String.raw`By the inequality of the means, $x + \tfrac4x \ge 2\sqrt{x \cdot \tfrac4x} = 4$, with equality when $x = \tfrac4x$, that is, $x = 2$. So the least value is $4$.` },
        { q: String.raw`If $x + y = 10$, what is the largest possible value of $xy$?`, answer: "25",
          solution: String.raw`Write $xy = \left(\tfrac{x + y}{2}\right)^2 - \left(\tfrac{x - y}{2}\right)^2 = 25 - \left(\tfrac{x - y}{2}\right)^2 \le 25$, with equality at $x = y = 5$.` },
        { q: String.raw`Find the least value of $x^2 - 6x + 13$.`, answer: "4",
          solution: String.raw`Complete the square: $x^2 - 6x + 13 = (x - 3)^2 + 4 \ge 4$, with equality at $x = 3$.` }
      ],
      problems: [
        "2023 AMC 12B, Problem 11",
        "2000 AIME I, Problem 6",
        "2016 AIME II, Problem 7"
      ]
    },
    "A5.2": {
      prereq: ["trivial-inequality"],
      cards: ["am-gm", "max-product-fixed-sum", "mean-chain"],
      body: String.raw`Many contest questions ask for the largest or smallest value of an expression and expect a bound together with a case that reaches it, not a search. The smallest value of $x + \tfrac{9}{x}$ for positive $x$, the largest volume of a box whose three edges add to $27$, the largest product of positive integers adding to $20$: each is settled by one inequality between means, used so that its equality case is actually available. The inequality supplies a number the expression can never pass, and the equality case shows the number is reached, so the two halves together are the answer.

The [[am-gm|AM-GM inequality]] says that for nonnegative numbers the arithmetic mean is at least the geometric mean, $\tfrac{a_1 + \cdots + a_n}{n} \ge \sqrt[n]{a_1 \cdots a_n}$, with equality exactly when all the numbers are equal. For two numbers it is the trivial inequality in disguise: $\tfrac{a + b}{2} - \sqrt{ab} = \tfrac12(\sqrt a - \sqrt b)^2 \ge 0$, and that identity is worth remembering on its own, since it measures how far apart two numbers are by the gap between their means. AM-GM is read in two directions. If a sum is fixed, the product is at most the $n$th power of the average; if a product is fixed, the sum is at least $n$ times the $n$th root. So $x + \tfrac9x \ge 2\sqrt{9} = 6$, with equality at $x = 3$, because the product of the two terms is the constant $9$.

The work is in arranging the terms so that their product (or sum) is constant and so that they can all be equal at once. To minimize $x^2 + \tfrac{16}{x}$, the product $x^2 \cdot \tfrac{16}{x}$ is not constant, but splitting the second term into two equal halves fixes it: $x^2 + \tfrac8x + \tfrac8x \ge 3\sqrt[3]{64} = 12$, and the three terms are equal when $x^2 = \tfrac8x$, at $x = 2$. The split is chosen by the equality case, not by the inequality. An application that leaves no way for the terms to be equal gives a true bound that is never reached, and the answer it suggests is wrong. Before trusting a bound from AM-GM, solve for the equality case and check that it satisfies every constraint of the problem.

When the parts must be positive integers the equality case is usually out of reach, and the answer comes from [[max-product-fixed-sum|breaking a sum into parts with the largest product]]. A part of $4$ or more can be split as $2 + (k - 2)$ with a larger product, a part of $1$ only wastes the sum, and three $2$'s lose to two $3$'s, since $8 \lt 9$. So the best split uses as many $3$'s as possible and at most two $2$'s: $20 = 3 \cdot 6 + 2$ gives $3^6 \cdot 2 = 1458$. The same reasoning shows that for a fixed sum the product of real parts is largest when the parts are as equal as the rules allow, which is AM-GM again.

AM-GM is the middle link of the [[mean-chain|chain of means]]: quadratic mean, then arithmetic, then geometric, then harmonic, $\sqrt{\tfrac{a^2 + b^2}{2}} \ge \tfrac{a + b}2 \ge \sqrt{ab} \ge \tfrac{2}{1/a + 1/b}$, each equal only when all the numbers are equal. Any two links give a bound. Arithmetic against harmonic bounds a sum of reciprocals when the sum is fixed: with $a + b + c = 1$ the harmonic mean is at most $\tfrac13$, so $\tfrac1a + \tfrac1b + \tfrac1c \ge 9$. Quadratic against arithmetic bounds a sum of squares when the sum is fixed. Problems also use the chain backward, giving two means as numbers and asking for the values: the arithmetic and geometric means of $x$ and $y$ determine $x + y$ and $xy$, so $x$ and $y$ are the roots of a quadratic.

Reach for AM-GM when the question asks for an extreme value of a sum whose terms multiply to a constant, or a product whose factors add to a constant, and always pair the bound with an equality case. The next lesson handles the sums that AM-GM cannot: a linear expression under a constraint on squares, and sums of fractions.`,
      related: [
        { card: "trivial-inequality", note: String.raw`the fact $(\sqrt a - \sqrt b)^2 \ge 0$ that the two-term AM-GM rewrites.` },
        { card: "power-mean-inequality", note: String.raw`the whole chain of means as one statement about exponents (A5.6).` },
        { card: "weighted-am-gm", note: String.raw`AM-GM with unequal weights, for terms that cannot be split evenly (A5.6).` },
        { card: "sfft", note: String.raw`completing a product first, so that AM-GM or the equal-parts rule applies to the factors.` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $x^2 + \tfrac{16}{x}$ for positive $x$.`, answer: "12",
          solution: String.raw`Split the second term so the product is constant: $x^2 + \tfrac8x + \tfrac8x \ge 3\sqrt[3]{x^2 \cdot \tfrac8x \cdot \tfrac8x} = 3\sqrt[3]{64} = 12$. Equality needs $x^2 = \tfrac8x$, that is $x = 2$, and indeed $4 + 8 = 12$. The smallest value is $12$.` },
        { q: String.raw`Positive integers add to $20$. What is the largest possible value of their product?`, answer: "1458",
          solution: String.raw`Use as many $3$'s as possible and never a $1$: $20 = 3 \cdot 6 + 2$, and the product is $3^6 \cdot 2 = 729 \cdot 2 = 1458$. (A $4$ could replace two $2$'s, which gives the same product; any part of $5$ or more, or three $2$'s, can be improved.)` },
        { q: String.raw`Positive reals $a$, $b$, $c$ add to $1$. Find the smallest value of $\tfrac1a + \tfrac1b + \tfrac1c$.`, answer: "9",
          solution: String.raw`The arithmetic mean is at least the harmonic mean: $\tfrac{a + b + c}{3} \ge \tfrac{3}{1/a + 1/b + 1/c}$, so $\tfrac1a + \tfrac1b + \tfrac1c \ge \tfrac{9}{a + b + c} = 9$. Equality holds at $a = b = c = \tfrac13$, where the sum is $3 + 3 + 3 = 9$.` }
      ],
      problems: [
        "2016 AMC 10B, Problem 16",
        "2016 AMC 10B, Problem 17",
        "2000 AMC 10, Problem 20",
        "2011 AMC 12B, Problem 21",
        "2003 AMC 12A, Problem 24",
        "1983 AIME, Problem 9",
        "2008 AIME II, Problem 3",
        "2011 AIME II, Problem 9"
      ]
    },
    "A5.3": {
      prereq: ["completing-the-square"],
      cards: ["cauchy-schwarz", "quadratic-forms"],
      body: String.raw`Some extreme-value problems put a constraint on squares and ask about a linear expression, or the reverse: the largest value of $3x + 4y$ when $x^2 + y^2 = 25$, the smallest value of $\tfrac{a^2}{1} + \tfrac{b^2}{2} + \tfrac{c^2}{3}$ when $a + b + c = 6$, the range of one variable when the sum and the sum of squares of three are known. AM-GM does not fit, since nothing multiplies to a constant. The tool is the Cauchy-Schwarz inequality, which compares a sum of products with sums of squares, together with the plain algebra of quadratics: a quadratic expression is smallest at its vertex, and a quadratic equation has a real root only when its discriminant is nonnegative.

The [[cauchy-schwarz|Cauchy-Schwarz inequality]] says $(a_1b_1 + \cdots + a_nb_n)^2 \le (a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2)$, with equality exactly when the two lists are proportional. In vector language it says that a dot product is at most the product of the lengths, so it holds because the cosine of an angle is at most $1$. To bound $3x + 4y$ with $x^2 + y^2 = 25$, pair $(3, 4)$ with $(x, y)$: $(3x + 4y)^2 \le (9 + 16)(x^2 + y^2) = 625$, so $3x + 4y \le 25$, reached when $(x, y)$ is proportional to $(3, 4)$, at $(3, 4)$ itself. The equality case again turns a bound into an answer, and it also tells you where the extreme sits.

A second form handles sums of fractions. Applying Cauchy-Schwarz to the lists $\tfrac{x_i}{\sqrt{y_i}}$ and $\sqrt{y_i}$ gives $\tfrac{x_1^2}{y_1} + \cdots + \tfrac{x_n^2}{y_n} \ge \tfrac{(x_1 + \cdots + x_n)^2}{y_1 + \cdots + y_n}$ for positive $y_i$, often called Engel's form or Titu's lemma. With $a + b + c = 6$, $\tfrac{a^2}{1} + \tfrac{b^2}{2} + \tfrac{c^2}{3} \ge \tfrac{36}{6} = 6$, and equality needs $a : b : c = 1 : 2 : 3$, so $(1, 2, 3)$ reaches it. This form is the one to try when a constraint fixes a sum and the target divides squares by known amounts. A special case worth knowing: $(a + b)^2 \le 2(a^2 + b^2)$, so a known sum of squares limits the sum, which is the quadratic-mean link of the previous lesson.

Quadratic expressions in one or two variables are minimized by [[quadratic-forms|rewriting them in vertex form]]. Completing the square in one variable at a time turns $x^2 + 2xy + 3y^2 - 2x - 10y$ into $(x + y - 1)^2 + 2(y - 2)^2 - 9$, and since squares are nonnegative the minimum is $-9$, at $y = 2$, $x = -1$. The factored form and the discriminant answer the other kind of question, about which values are possible: if $a + b = s$ and $ab = p$, then $a$ and $b$ are real only when $s^2 - 4p \ge 0$, so a known sum and sum of squares for three numbers bound each one. To find the largest possible $c$ when $a + b + c$ and $a^2 + b^2 + c^2$ are given, write $a + b$ and $ab$ in terms of $c$ and ask that the quadratic with roots $a$ and $b$ have real roots.

A quadratic squeezed between two others is pinned at the point where they touch. If a quadratic $P$ satisfies $x^2 + 1 \le P(x) \le 2x^2 + 1$ for all $x$, both bounds are $1$ at $x = 0$, so $P(0) = 1$, and $P(x) - 1$ lies between $x^2$ and $2x^2$, which forces $P(x) = 1 + kx^2$ with $1 \le k \le 2$; one more value of $P$ then fixes it.

Use Cauchy-Schwarz when the target is linear and the constraint is a sum of squares, or the target is a sum of fractions with squared numerators; use vertex form and the discriminant when everything is quadratic. The next lesson collects the other elementary estimates: sorting, sums of squares, and the triangle inequality.`,
      related: [
        { card: "completing-the-square", note: String.raw`the step that puts a quadratic in vertex form (A1.4).` },
        { card: "mean-chain", note: String.raw`the quadratic-mean bound $(a + b)^2 \le 2(a^2 + b^2)$ is the two-term Cauchy-Schwarz (A5.2).` },
        { card: "harmonic-addition", note: String.raw`$a\cos\theta + b\sin\theta \le \sqrt{a^2 + b^2}$, Cauchy-Schwarz for a point on a circle (A7.3).` },
        { card: "vietas-quadratic", note: String.raw`writing the quadratic whose roots are two unknowns from their sum and product.` }
      ],
      exercises: [
        { q: String.raw`Real numbers $x$ and $y$ satisfy $x^2 + y^2 = 25$. Find the largest value of $3x + 4y$.`, answer: "25",
          solution: String.raw`By Cauchy-Schwarz, $(3x + 4y)^2 \le (3^2 + 4^2)(x^2 + y^2) = 25 \cdot 25 = 625$, so $3x + 4y \le 25$. Equality needs $(x, y)$ proportional to $(3, 4)$, and $(3, 4)$ satisfies the constraint and gives $9 + 16 = 25$.` },
        { q: String.raw`Positive reals $a$, $b$, $c$ add to $6$. Find the smallest value of $a^2 + \tfrac{b^2}{2} + \tfrac{c^2}{3}$.`, answer: "6",
          solution: String.raw`By Engel's form of Cauchy-Schwarz, $\tfrac{a^2}{1} + \tfrac{b^2}{2} + \tfrac{c^2}{3} \ge \tfrac{(a + b + c)^2}{1 + 2 + 3} = \tfrac{36}{6} = 6$. Equality needs $a : b : c = 1 : 2 : 3$, so $(a, b, c) = (1, 2, 3)$, where the value is $1 + 2 + 3 = 6$.` },
        { q: String.raw`Find the smallest value of $x^2 + 2xy + 3y^2 - 2x - 10y$ over all real $x$ and $y$.`, answer: "-9",
          solution: String.raw`Complete the square in $x$ first: $x^2 + 2xy - 2x = (x + y - 1)^2 - (y - 1)^2$. The expression becomes $(x + y - 1)^2 + 2y^2 - 8y - 1 = (x + y - 1)^2 + 2(y - 2)^2 - 9$. Both squares can vanish at once, at $y = 2$ and $x = -1$, so the smallest value is $-9$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 13",
        "2013 AMC 12B, Problem 17",
        "2010 AIME I, Problem 6",
        "2016 AIME II, Problem 15"
      ]
    },
    "A5.4": {
      prereq: ["triangle-inequality"],
      cards: ["rearrangement", "sos-identity", "abs-triangle-inequality"],
      body: String.raw`Three short estimates settle a large share of the remaining bounding questions. One decides how to pair two lists of numbers to make a sum of products largest, as in assigning prices to quantities or flowers to beds of different sizes. One writes a symmetric expression as a sum of squares, so that it is visibly nonnegative and its zero case forces all the variables to be equal. The third bounds a sum of absolute values below by the absolute value of the sum. Each is a one-line idea, and each comes with an equality case that the problem usually turns on.

The [[rearrangement|rearrangement inequality]] says that for two lists of real numbers, the sum of products $a_1b_{\sigma(1)} + \cdots + a_nb_{\sigma(n)}$ is largest when both lists are sorted the same way and smallest when they are sorted in opposite ways. The reason is a swap: if $a_i \lt a_j$ but $b_i \gt b_j$, exchanging $b_i$ and $b_j$ changes the sum by $(a_j - a_i)(b_i - b_j) \gt 0$, so every out-of-order pair can be improved. To make the cheapest garden, the most expensive flower goes in the smallest bed; to minimize $1 \cdot a_1 + 2 \cdot a_2 + \cdots + 6 \cdot a_6$ over orderings of $1, \ldots, 6$, pair them in opposite order, $1 \cdot 6 + 2 \cdot 5 + \cdots + 6 \cdot 1 = 56$.

The [[sos-identity|sum-of-squares identity]] $x^2 + y^2 + z^2 - xy - yz - zx = \tfrac12\left[(x - y)^2 + (y - z)^2 + (z - x)^2\right]$ shows at a glance that $x^2 + y^2 + z^2 \ge xy + yz + zx$, with equality only when $x = y = z$. Its main use in contests is the equality case. If $x + y + z = 6$ and $xy + yz + zx = 12$, then $x^2 + y^2 + z^2 = 36 - 24 = 12$, which equals $xy + yz + zx$, so the three squares in the identity vanish and $x = y = z = 2$. The same idea works with any expression that can be written as a sum of squares: if $x^2 + y^2 - 4x + 2y + 5 = 0$, completing both squares gives $(x - 2)^2 + (y + 1)^2 = 0$, and a sum of squares is zero only when each one is. One equation then gives two values, because it says two separate quantities are zero.

The [[abs-triangle-inequality|triangle inequality for absolute values]], $|a + b| \le |a| + |b|$, holds with equality exactly when $a$ and $b$ have the same sign (or one is zero). It gives lower bounds for sums of distances: $|x - 2| + |x + 6| = |2 - x| + |x + 6| \ge |(2 - x) + (x + 6)| = 8$, with equality when $2 - x$ and $x + 6$ are both nonnegative, that is for every $x$ from $-6$ to $2$. A problem can also tell you the slack in the inequality. If $\sum |x_i| - \left|\sum x_i\right|$ is a given number and every $|x_i| \lt 1$, the slack is less than the number of terms, which bounds how many terms there must be. The same inequality, applied to differences, carries a known change through intermediate values: $|f(a) - f(c)| \le |f(a) - f(b)| + |f(b) - f(c)|$.

Use rearrangement when the question is which pairing is best, the sum-of-squares identity when a symmetric condition looks too strong for the number of unknowns, and the triangle inequality when absolute values add. The next lesson turns to extreme-value problems where the domain, rather than an inequality, does the work.`,
      related: [
        { card: "chebyshev-sum-inequality", note: String.raw`the averaged form of rearrangement: same-order lists make the average of products at least the product of averages.` },
        { card: "cubes-minus-3abc", note: String.raw`$x^3 + y^3 + z^3 - 3xyz$ factors through the sum-of-squares expression (A8.1).` },
        { card: "median-minimizes-abs", note: String.raw`the triangle inequality applied to many distances at once (A5.5).` },
        { card: "completing-the-square", note: String.raw`writing a quadratic equation as a sum of squares equal to zero.` }
      ],
      exercises: [
        { q: String.raw`The numbers $a_1, \ldots, a_6$ are $1, 2, \ldots, 6$ in some order. Find the smallest value of $1 \cdot a_1 + 2 \cdot a_2 + \cdots + 6 \cdot a_6$.`, answer: "56",
          solution: String.raw`By rearrangement the sum is smallest when the lists are paired in opposite order, $a_k = 7 - k$: $1 \cdot 6 + 2 \cdot 5 + 3 \cdot 4 + 4 \cdot 3 + 5 \cdot 2 + 6 \cdot 1 = 6 + 10 + 12 + 12 + 10 + 6 = 56$.` },
        { q: String.raw`Real numbers $x$, $y$, $z$ satisfy $x + y + z = 6$ and $xy + yz + zx = 12$. Find $xyz$.`, answer: "8",
          solution: String.raw`$x^2 + y^2 + z^2 = (x + y + z)^2 - 2(xy + yz + zx) = 36 - 24 = 12$, so $x^2 + y^2 + z^2 - xy - yz - zx = 0$. By the sum-of-squares identity this is $\tfrac12\left[(x - y)^2 + (y - z)^2 + (z - x)^2\right] = 0$, so $x = y = z = 2$ and $xyz = 8$.` },
        { q: String.raw`How many integers $x$ make $|x - 2| + |x + 6|$ as small as possible?`, answer: "9",
          solution: String.raw`By the triangle inequality, $|2 - x| + |x + 6| \ge |(2 - x) + (x + 6)| = 8$, with equality exactly when $2 - x \ge 0$ and $x + 6 \ge 0$, that is $-6 \le x \le 2$. That interval holds $9$ integers.` }
      ],
      problems: [
        "2003 AMC 10B, Problem 4",
        "2022 AMC 10B, Problem 24",
        "1988 AIME, Problem 4"
      ]
    },
    "A5.5": {
      prereq: ["vertex-form"],
      cards: ["median-minimizes-abs", "slope-to-a-point", "placing-digits-extremes", "derivative-extremum"],
      body: String.raw`Not every extreme-value problem needs an inequality between means. Some are settled by where the expression can live: a sum of distances on a line, a ratio that is really a slope, a number built from given digits, a smooth function on an interval. The question looks the same (find the largest or smallest value), but the answer comes from a picture or from an ordering argument that says where the extreme must sit, and then the value is computed there. These methods also handle the constraints the inequalities ignore, such as integer variables or a bounded interval.

A sum of distances $|x - a_1| + |x - a_2| + \cdots + |x - a_n|$ is smallest at [[median-minimizes-abs|a median of the points]]. Pair the outermost points: $|x - a_1| + |x - a_n| \ge a_n - a_1$, with equality for every $x$ between them, and the next pair inward gives the same kind of bound on a smaller interval. All the bounds hold at once at the middle point (or anywhere in the middle interval, when $n$ is even). For the points $1, 3, 4, 9, 10$ the minimum is at $4$, with value $3 + 1 + 0 + 5 + 6 = 15$. When the terms carry weights, as in $|2x - 1| = 2\left|x - \tfrac12\right|$, a point of weight $k$ counts as $k$ copies, and the minimum sits at the weighted median, where half the total weight lies on each side.

A ratio of differences $\tfrac{y - a}{x - b}$ is [[slope-to-a-point|the slope from the fixed point $(b, a)$]] to the point $(x, y)$. Asking for its largest value over a curve asks for the steepest line through $(b, a)$ that still meets the curve, which is a tangent line. For $(x, y)$ on the circle $x^2 + y^2 = 9$, the largest value of $\tfrac{y}{x - 5}$ is the slope of a tangent from $(5, 0)$: the tangent, the radius to the point of tangency, and the segment from the center to $(5, 0)$ make a right triangle with sides $3$, $4$, $5$, so the slope is $\pm\tfrac34$, and the largest value is $\tfrac34$.

When an expression is built from given digits or numbers, [[placing-digits-extremes|fill its most valuable position first]]. The leading digit of a number matters most, a sign in front of a subtracted term should make that term small, and a fraction is largest with a large numerator and a small denominator. For a product of two numbers made from fixed digits, the two numbers should be as close as possible, which places the largest digits in the leading places of both: from $1, \ldots, 6$ the largest product of two three-digit numbers is $631 \cdot 542 = 342002$. When a rule is not obvious, compare two arrangements that differ by one swap, exactly as in rearrangement.

For a smooth function on an interval, [[derivative-extremum|the derivative]] finds the candidates: the extreme values occur where $f'(x) = 0$ or at the ends of the interval. An open box from a $10 \times 10$ sheet with squares of side $x$ cut from the corners has volume $V(x) = x(10 - 2x)^2$ on $0 \lt x \lt 5$, and $V'(x) = (10 - 2x)(10 - 6x)$ is zero at $x = \tfrac53$, giving $V = \tfrac{2000}{27}$. The same answer comes from AM-GM applied to $4x$, $10 - 2x$, $10 - 2x$, whose sum is the constant $20$; contest solutions usually prefer that route, but the derivative is a reliable check. A quadratic needs neither, since its extreme is at the vertex, and many problems reduce to a quadratic after a substitution: naming $s = 2^x$ turns $4^x - 6 \cdot 2^x$ into $s^2 - 6s$, smallest at $s = 3$.

These methods share one habit: decide where the extreme must be before computing anything. The last lesson of the chapter collects the general inequalities that contain everything so far as special cases.`,
      related: [
        { card: "abs-triangle-inequality", note: String.raw`the bound for one pair of distances that the median argument applies to every pair (A5.4).` },
        { card: "rearrangement", note: String.raw`the swap argument that decides where digits and numbers should go (A5.4).` },
        { card: "tangent-lines-from-point", note: String.raw`the right triangle that gives the slope of a tangent from an outside point.` },
        { card: "extremal-principle", note: String.raw`the same habit in counting: look at the largest or smallest object first.` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $|x - 1| + |x - 3| + |x - 4| + |x - 9| + |x - 10|$.`, answer: "15",
          solution: String.raw`A sum of distances is smallest at the median of the points, here $x = 4$: $3 + 1 + 0 + 5 + 6 = 15$.` },
        { q: String.raw`The point $(x, y)$ lies on the circle $x^2 + y^2 = 9$. Find the largest value of $\tfrac{y}{x - 5}$.`, answer: "3/4",
          solution: String.raw`The ratio is the slope of the line from $(5, 0)$ to $(x, y)$, so the extremes are the slopes of the two tangents from $(5, 0)$. The center, the point of tangency and $(5, 0)$ form a right triangle with hypotenuse $5$ and leg $3$, so the other leg is $4$ and the tangent makes an angle with $\tan = \tfrac34$ with the $x$-axis. The slopes are $\pm\tfrac34$, and the largest value is $\tfrac34$.` },
        { q: String.raw`Squares of side $x$ are cut from the corners of a $10 \times 10$ sheet and the sides are folded up into an open box. Find the largest possible volume.`, answer: "2000/27",
          solution: String.raw`The volume is $V = x(10 - 2x)^2$ for $0 \lt x \lt 5$. Then $V' = (10 - 2x)^2 - 4x(10 - 2x) = (10 - 2x)(10 - 6x)$, which is zero inside the interval only at $x = \tfrac53$, and $V$ is $0$ at both ends. So the largest volume is $\tfrac53 \cdot \left(\tfrac{20}{3}\right)^2 = \tfrac{2000}{27}$.` },
        { q: String.raw`Each of the digits $1, 2, 3, 4, 5, 6$ is used once to write two three-digit numbers. Find the largest possible product of the two numbers.`, answer: "342002",
          solution: String.raw`The hundreds digits matter most, so they are $6$ and $5$; then the tens digits $4$ and $3$, then $2$ and $1$. For a fixed sum a product is largest when the numbers are close, so each next pair puts its larger digit on the smaller number: $6\_\_$ and $5\_\_$ become $63\_$ and $54\_$, then $631$ and $542$. The product is $631 \cdot 542 = 342002$, and checking all arrangements confirms no larger one.` }
      ],
      problems: [
        "2013 AMC 10B, Problem 5",
        "2004 AMC 10A, Problem 15",
        "1983 AIME, Problem 2",
        "2010 AMC 12A, Problem 22",
        "2020 AMC 12B, Problem 22",
        "2009 AMC 12A, Problem 23",
        "2022 AIME I, Problem 7"
      ]
    },
    "A5.6": {
      prereq: ["am-gm", "mean-chain"],
      cards: ["power-mean-inequality", "jensens-inequality", "bernoulli-inequality", "weighted-am-gm"],
      body: String.raw`The inequalities of this chapter are special cases of a few general ones, and knowing the general forms helps in two situations: when the terms of a problem do not split into equal pieces, and when a bound must compare two different powers. Bounding $a + b + c$ when $a^3 + b^3 + c^3$ is known, bounding $\sin A + \sin B + \sin C$ over all triangles, and maximizing $x^2y^3$ when $x + y$ is fixed are typical. Each has a one-line answer from the right general inequality, while the basic tools need a clever rearrangement first.

The [[power-mean-inequality|power mean inequality]] puts the whole chain of means into one statement. For positive numbers, the power mean $M_p = \left(\tfrac{a_1^p + \cdots + a_n^p}{n}\right)^{1/p}$ increases with $p$, and the geometric mean is the case $p = 0$. The quadratic, arithmetic, geometric and harmonic means are $M_2$, $M_1$, $M_0$ and $M_{-1}$, but any two exponents compare. If $a^3 + b^3 + c^3 = 24$, then $M_3 = 2$, so $M_1 \le 2$ and $a + b + c \le 6$, with equality at $a = b = c = 2$.

[[jensens-inequality|Jensen's inequality]] says that for a convex function, one whose graph bends upward so that every chord lies above it, the average of the values is at least the value at the average: $\tfrac{f(x_1) + \cdots + f(x_n)}{n} \ge f\!\left(\tfrac{x_1 + \cdots + x_n}{n}\right)$. For a concave function, bending downward, the inequality reverses. Since $\sin x$ is concave on $[0, \pi]$, the angles of a triangle satisfy $\sin A + \sin B + \sin C \le 3\sin\tfrac{A + B + C}{3} = 3\sin 60^\circ = \tfrac{3\sqrt3}{2}$, with equality for the equilateral triangle. AM-GM is Jensen for the concave function $\ln x$, and the power mean inequality is Jensen for $x^{q/p}$, so Jensen is the source of them all. The test for convexity in a contest is usually the shape of a familiar graph, or a second derivative that keeps one sign on the interval.

[[weighted-am-gm|Weighted AM-GM]] allows unequal weights: for positive weights $w_i$ adding to $1$, $w_1a_1 + \cdots + w_na_n \ge a_1^{w_1} \cdots a_n^{w_n}$. It is plain AM-GM with each term repeated in proportion to its weight, and it is the way to handle a product with unequal exponents. To maximize $x^2y^3$ with $x + y = 5$, write $x + y = \tfrac x2 + \tfrac x2 + \tfrac y3 + \tfrac y3 + \tfrac y3$. Five terms add to $5$, so their product $\tfrac{x^2y^3}{108}$ is at most $1$, and $x^2y^3 \le 108$, reached when $\tfrac x2 = \tfrac y3$, at $x = 2$, $y = 3$. The weights are chosen so the equality case satisfies the constraint, the same rule as before.

[[bernoulli-inequality|Bernoulli's inequality]], $(1 + x)^n \ge 1 + nx$ for $x \ge -1$ and $n \ge 1$, is the statement that the curve $(1 + x)^n$ lies above its tangent line at $x = 0$. For an exponent between $0$ and $1$ it flips, $(1 + x)^r \le 1 + rx$, which bounds roots from above: $\sqrt[10]{1.2} \lt 1 + \tfrac{0.2}{10} = 1.02$. It is the quickest way to compare a power with a linear expression, as in showing $1.01^{100} \ge 2$.

These are tools to recognize rather than to reach for first: try AM-GM, Cauchy-Schwarz and the methods of the earlier lessons, and use the general forms when the terms are unequal or the powers differ. The Summary (A5.7) collects the chapter's strategies, and the next chapter changes subject to complex numbers, where the triangle inequality and the geometry of the plane return.`,
      related: [
        { card: "holders-inequality", note: String.raw`the generalization of Cauchy-Schwarz to three or more lists, proved with weighted AM-GM.` },
        { card: "tangent-line-trick", note: String.raw`bounding each term by its tangent line, the method behind Bernoulli's inequality (A9.4).` },
        { card: "cauchy-schwarz", note: String.raw`the other general inequality of the chapter, for sums of products (A5.3).` }
      ],
      exercises: [
        { q: String.raw`Positive reals $a$, $b$, $c$ satisfy $a^3 + b^3 + c^3 = 24$. Find the largest value of $a + b + c$.`, answer: "6",
          solution: String.raw`By the power mean inequality, $\tfrac{a + b + c}{3} \le \left(\tfrac{a^3 + b^3 + c^3}{3}\right)^{1/3} = 8^{1/3} = 2$, so $a + b + c \le 6$. Equality holds at $a = b = c = 2$, where $8 + 8 + 8 = 24$.` },
        { q: String.raw`Find the largest value of $\sin A + \sin B + \sin C$ over all triangles $ABC$.`, answer: "3sqrt(3)/2",
          solution: String.raw`On $[0, \pi]$ the sine graph bends downward, so $\sin$ is concave there and Jensen's inequality gives $\tfrac{\sin A + \sin B + \sin C}{3} \le \sin\tfrac{A + B + C}{3} = \sin 60^\circ = \tfrac{\sqrt3}{2}$. So the sum is at most $\tfrac{3\sqrt3}{2}$, reached by the equilateral triangle.` },
        { q: String.raw`Positive reals $x$ and $y$ add to $5$. Find the largest value of $x^2y^3$.`, answer: "108",
          solution: String.raw`Split the sum into five terms matching the exponents: $\tfrac x2 + \tfrac x2 + \tfrac y3 + \tfrac y3 + \tfrac y3 = 5$. By AM-GM their product is at most $1$: $\tfrac{x^2}{4} \cdot \tfrac{y^3}{27} \le 1$, so $x^2y^3 \le 108$. Equality needs $\tfrac x2 = \tfrac y3$, which with $x + y = 5$ gives $x = 2$, $y = 3$, and $4 \cdot 27 = 108$.` },
        { q: String.raw`Show that $\sqrt[10]{1.2} \lt 1.02$ without computing the root.`,
          solution: String.raw`For an exponent $r$ between $0$ and $1$, Bernoulli's inequality reverses: $(1 + x)^r \le 1 + rx$, with equality only at $x = 0$. With $x = 0.2$ and $r = \tfrac1{10}$, $(1.2)^{1/10} \lt 1 + 0.02 = 1.02$. (In fact $\sqrt[10]{1.2} \approx 1.0184$.)` }
      ],
      problems: []
    },
    "A5.7": {
      prereq: ["am-gm", "max-product-fixed-sum", "cauchy-schwarz", "sos-identity", "rearrangement", "abs-triangle-inequality", "median-minimizes-abs", "power-mean-inequality"],
      cards: [],
      body: String.raw`[[am-gm|The inequality of the means]] bounds a sum below by a product, with equality when the terms are equal; split terms so that their product is constant. With a fixed sum, [[max-product-fixed-sum|the product is largest]] when the parts are equal, or as equal as the integers allow.

[[cauchy-schwarz|Cauchy-Schwarz]] bounds $\sum a_ib_i$ by $\sqrt{\sum a_i^2}\sqrt{\sum b_i^2}$, with equality when the lists are proportional. [[sos-identity|Writing an expression as a sum of squares]] proves it is at least $0$ and shows where it vanishes.

[[rearrangement|Rearrangement]] makes a sum of products largest with the lists sorted alike and smallest with them sorted oppositely. [[abs-triangle-inequality|The triangle inequality]] bounds a sum of absolute values or distances, and [[median-minimizes-abs|a sum of distances to points on a line]] is smallest at a median.

[[power-mean-inequality|The power means]] increase with the power, which compares a sum of squares with a square of a sum. Every bound is the answer only when its equality case is allowed.`,
      strategies: [
        String.raw`Complete the square, or write the expression as a sum of squares, before reaching for a named inequality.`,
        String.raw`For a sum with a constant product, use the inequality of the means; split terms so that the product is constant.`,
        String.raw`For a linear expression on a circle or sphere, use Cauchy-Schwarz.`,
        String.raw`For a sum of distances on a line, go to a median.`,
        String.raw`To pair two lists for the largest sum of products, sort them the same way.`,
        String.raw`Check the equality case: the bound is the answer only if it can be reached.`,
        String.raw`With integers or a restricted domain, test the allowed values nearest the unrestricted extreme, and the endpoints.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the least value of $x + \dfrac{9}{x - 1}$ for $x \gt 1$.`, answer: "7",
        solution: String.raw`Write it as $(x - 1) + \tfrac{9}{x - 1} + 1$. The first two terms have constant product $9$, so their sum is at least $2\sqrt9 = 6$, with equality at $x - 1 = 3$. The least value is $6 + 1 = 7$, at $x = 4$.` },
      { q: String.raw`If $x^2 + y^2 = 1$, what is the largest value of $3x + 4y$?`, answer: "5",
        solution: String.raw`By Cauchy-Schwarz, $(3x + 4y)^2 \le (3^2 + 4^2)(x^2 + y^2) = 25$, so $3x + 4y \le 5$, with equality when $(x, y)$ is proportional to $(3, 4)$: $(x, y) = \left(\tfrac35, \tfrac45\right)$.` },
      { q: String.raw`Find the least value of $(x + y + z)\left(\dfrac1x + \dfrac1y + \dfrac1z\right)$ for positive $x$, $y$, $z$.`, answer: "9",
        solution: String.raw`By Cauchy-Schwarz with the lists $\sqrt x, \sqrt y, \sqrt z$ and $\tfrac{1}{\sqrt x}, \tfrac{1}{\sqrt y}, \tfrac{1}{\sqrt z}$, the product is at least $(1 + 1 + 1)^2 = 9$, with equality when $x = y = z$.` },
      { q: String.raw`Find the least value of $|x - 1| + |x - 2| + |x - 5| + |x - 9|$.`, answer: "11",
        solution: String.raw`A sum of distances to points on a line is smallest at a median, here any $x$ from $2$ to $5$. At $x = 2$ the sum is $1 + 0 + 3 + 7 = 11$.` },
      { q: String.raw`If $x$ and $y$ are positive and $x + y = 3$, what is the largest value of $x^2y$?`, answer: "4",
        solution: String.raw`Split $x$ into two halves so that the three terms have a constant sum: $\tfrac x2 + \tfrac x2 + y = 3$. By the inequality of the means, $\tfrac x2 \cdot \tfrac x2 \cdot y \le 1$, so $x^2y \le 4$, with equality at $\tfrac x2 = y = 1$, that is, $x = 2$, $y = 1$.` },
      { q: String.raw`If $a + b + c = 6$, what is the least value of $a^2 + b^2 + c^2$?`, answer: "12",
        solution: String.raw`By the inequality between the quadratic and arithmetic means, or Cauchy-Schwarz, $3(a^2 + b^2 + c^2) \ge (a + b + c)^2 = 36$, so $a^2 + b^2 + c^2 \ge 12$, with equality at $a = b = c = 2$.` },
      { q: String.raw`The numbers $a, b, c, d$ are $1, 2, 3, 4$ in some order. What is the largest value of $a + 2b + 3c + 4d$?`, answer: "30",
        solution: String.raw`By rearrangement the sum of products is largest when the lists are sorted the same way: $a = 1$, $b = 2$, $c = 3$, $d = 4$, giving $1 + 4 + 9 + 16 = 30$.` }
    ],
    problems: [
      "2023 AMC 12A, Problem 23"
    ]
  },
  challenge: {
    problems: [
      "2016 AMC 12A, Problem 24",
      "2025 AIME II, Problem 15",
      "2009 AIME II, Problem 15"
    ]
  }
};
