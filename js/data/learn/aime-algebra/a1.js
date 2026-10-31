// Learn, AIME Algebra, chapter A1: equations, substitutions and systems (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A1"] = {
  lessons: {
    "A1.1": {
      prereq: ["vietas-quadratic"],
      cards: ["symmetric-polynomial-strategies"],
      body: String.raw`When a problem gives $x + y$ and $xy$ and asks for something like $x^3 + y^3$, solving for $x$ and $y$ is the slow way, and often the messy one: with $x + y = 5$ and $xy = 3$ the two numbers are $\tfrac{5 \pm \sqrt{13}}{2}$. Every expression that does not change when $x$ and $y$ are swapped can instead be written in terms of the sum and the product alone, and the answer comes out in one line: $x^2 + y^2 = 19$ and $x^3 + y^3 = 80$.

The two basic identities are $x^2 + y^2 = (x + y)^2 - 2xy$ and $x^3 + y^3 = (x + y)^3 - 3xy(x + y)$, and everything else is built from them. Reciprocal sums put the product in the denominator, $\tfrac1x + \tfrac1y = \tfrac{x + y}{xy}$; a difference reaches the sum and product through its square, $(x - y)^2 = (x + y)^2 - 4xy$; and higher powers follow by squaring again, $x^4 + y^4 = (x^2 + y^2)^2 - 2(xy)^2$. Writing a symmetric expression this way, as [[symmetric-polynomial-strategies|a polynomial in the elementary symmetric sums]], always works, because every symmetric polynomial can be expressed in them.

The method runs in the other direction too. If a system is symmetric in its unknowns, introduce $s = x + y$ and $p = xy$, solve the usually simpler system in $s$ and $p$, and recover $x$ and $y$ as the roots of $t^2 - st + p = 0$ at the end, if they are needed at all. A condition like $a - b = ab$ is not symmetric, but $\tfrac ab + \tfrac ba = \tfrac{(a - b)^2 + 2ab}{ab}$ brings it into reach. With three unknowns the same idea uses $x + y + z$, $xy + yz + zx$, and $xyz$.

The signal is a question about a symmetric expression of quantities that are awkward to find individually, or a system that stays the same when its unknowns are permuted.`,
      related: [
        { card: "vietas-quadratic", note: String.raw`the roots of $t^2 - st + p$ have sum $s$ and product $p$, which is how $x$ and $y$ are recovered.` },
        { card: "newtons-sums", note: String.raw`the recursion for $x^n + y^n$ (and for more variables) in terms of the symmetric sums (A2.2).` },
        { card: "fundamental-theorem-symmetric", note: String.raw`the theorem that every symmetric polynomial is a polynomial in the elementary ones (A2.3).` }
      ],
      exercises: [
        { q: String.raw`If $x + y = 5$ and $xy = 3$, find $x^3 + y^3$.`, answer: "80",
          solution: String.raw`$x^3 + y^3 = (x + y)^3 - 3xy(x + y) = 125 - 3 \cdot 3 \cdot 5 = 125 - 45 = 80$.` },
        { q: String.raw`If $x + y = 5$ and $xy = 3$, find $x^4 + y^4$.`, answer: "343",
          solution: String.raw`First $x^2 + y^2 = 25 - 6 = 19$. Then $x^4 + y^4 = (x^2 + y^2)^2 - 2(xy)^2 = 361 - 18 = 343$.` },
        { q: String.raw`If $x + y = 5$ and $xy = 3$, find $\tfrac1x + \tfrac1y$.`, answer: "5/3",
          solution: String.raw`$\tfrac1x + \tfrac1y = \tfrac{x + y}{xy} = \tfrac53$.` }
      ],
      problems: ["2000 AMC 10, Problem 15", "2022 AMC 12A, Problem 14"]
    },
    "A1.2": {
      prereq: ["transforming-equations", "square-of-sum"],
      cards: ["denesting-radicals"],
      body: String.raw`Equations with radicals and fractions are solved by clearing them, and clearing them can create solutions that were never there. Squaring $\sqrt{x + 3} = x - 3$ gives $x^2 - 7x + 6 = 0$, with roots $1$ and $6$, but only $6$ satisfies the original equation, because a square root is never negative and $1 - 3 = -2$ is. Keeping track of the domain, and of which steps can add or lose solutions, is the discipline of this lesson; the other skill is undoing a radical inside a radical.

Some steps keep exactly the same solutions: adding to both sides, multiplying by a nonzero constant, applying a one-to-one function. Others do not. Squaring both sides can add solutions where the two sides had opposite signs; multiplying by an expression in $x$ can add the zeros of that expression; dividing by an expression in $x$ can lose its zeros. Cross-multiplying $\tfrac{x - 1}{x - 2} = \tfrac{x - k}{x - 6}$ gives $(k - 5)x = 2k - 6$, and for $k = 5$ this has no solution at all, which a careless solver could miss. The safe practice of [[transforming-equations|transforming equations]] is to note the domain at the start (radicands at least $0$, denominators not $0$, square roots equal to nonnegative quantities) and check every candidate against it at the end.

A nested radical $\sqrt{a + b\sqrt c}$ often simplifies, because $(\sqrt p + \sqrt q)^2 = p + q + 2\sqrt{pq}$. To [[denesting-radicals|denest]] it, look for $p$ and $q$ with $p + q = a$ and $2\sqrt{pq} = b\sqrt c$. For $\sqrt{9 + 6\sqrt2}$ that means $p + q = 9$ and $pq = 18$, so $p = 6$, $q = 3$, and $\sqrt{9 + 6\sqrt2} = \sqrt6 + \sqrt3$. Likewise $\sqrt{7 + 4\sqrt3} = 2 + \sqrt3$. For the minus sign the larger root comes first, so $\sqrt{9 - 6\sqrt2} = \sqrt6 - \sqrt3$, and the sum of the two is $2\sqrt6$.

The signal is a square root of an expression involving another square root, or an equation with radicals or fractions in the unknown. Denest when the numbers fit a perfect square, and always check solutions against the domain.`,
      related: [
        { card: "square-of-sum", note: String.raw`$(\sqrt p + \sqrt q)^2 = p + q + 2\sqrt{pq}$, the identity that denesting runs backward.` },
        { card: "rationalizing", note: String.raw`removing radicals from a denominator, the other routine radical simplification.` },
        { card: "completing-the-square", note: String.raw`rewriting a quadratic under a radical before deciding when it is a square (A1.3).` }
      ],
      exercises: [
        { q: String.raw`Solve $\sqrt{x + 3} = x - 3$.`, answer: "6",
          solution: String.raw`The right side must be at least $0$, so $x \ge 3$. Squaring gives $x + 3 = x^2 - 6x + 9$, that is $x^2 - 7x + 6 = (x - 1)(x - 6) = 0$. The root $1$ fails $x \ge 3$ (it gives $2 = -2$), so the only solution is $x = 6$: $\sqrt9 = 3$.` },
        { q: String.raw`Simplify $\sqrt{9 + 6\sqrt2} + \sqrt{9 - 6\sqrt2}$.`, answer: "2sqrt(6)",
          solution: String.raw`With $p + q = 9$ and $pq = 18$, $p = 6$ and $q = 3$. So $\sqrt{9 + 6\sqrt2} = \sqrt6 + \sqrt3$ and $\sqrt{9 - 6\sqrt2} = \sqrt6 - \sqrt3$ (positive, since $\sqrt6 > \sqrt3$). The sum is $2\sqrt6$.` },
        { q: String.raw`Simplify $\sqrt{7 + 4\sqrt3}$.`, answer: "2+sqrt(3)",
          solution: String.raw`$4\sqrt3 = 2\sqrt{12}$, so look for $p + q = 7$ and $pq = 12$: $p = 4$, $q = 3$. Then $\sqrt{7 + 4\sqrt3} = \sqrt4 + \sqrt3 = 2 + \sqrt3$. Check: $(2 + \sqrt3)^2 = 4 + 4\sqrt3 + 3$.` }
      ],
      problems: ["2011 AMC 10A, Problem 16", "2024 AMC 10B, Problem 13", "2021 Spring AMC 12A, Problem 2", "1990 AIME, Problem 2", "2006 AIME I, Problem 5"]
    },
    "A1.3": {
      prereq: ["symmetric-polynomial-strategies"],
      cards: ["palindromic-polynomials", "reciprocal-power-sums", "completing-the-square"],
      body: String.raw`A good substitution can halve the degree of an equation or turn an unfamiliar expression into a familiar one. The quartic $x^4 - 5x^3 + 6x^2 - 5x + 1 = 0$ looks hard, but its coefficients read the same forwards and backwards, and dividing by $x^2$ and setting $t = x + \tfrac1x$ turns it into the quadratic $t^2 - 5t + 4 = 0$. Two other moves of this kind, powers of $x + \tfrac1x$ and completing the square, are used so often that they are worth having ready.

A polynomial whose coefficients form a palindrome is unchanged, up to a power of $x$, when $x$ is replaced by $\tfrac1x$, so its roots come in pairs $r$ and $\tfrac1r$. Dividing an even-degree one by the middle power of $x$ groups it into terms $x^k + x^{-k}$, and each of those is a polynomial in $t = x + \tfrac1x$; that is the [[palindromic-polynomials|palindromic substitution]]. In the example, $x^2 + x^{-2} - 5(x + x^{-1}) + 6 = (t^2 - 2) - 5t + 6$. The root $t = 1$ gives no real $x$, since $|x + \tfrac1x| \ge 2$ for real $x$, and $t = 4$ gives $x = 2 \pm \sqrt3$, so the real roots add to $4$.

The values $s_n = x^n + x^{-n}$ follow from $t = x + \tfrac1x$ by [[reciprocal-power-sums|a recursion]], $s_n = t\, s_{n-1} - s_{n-2}$, which is the identity $(x + x^{-1})(x^{n-1} + x^{1-n}) = (x^n + x^{-n}) + (x^{n-2} + x^{2-n})$. Squaring is the shortcut for doubling the exponent, $s_{2n} = s_n^2 - 2$: if $x + \tfrac1x = 4$, then $x^2 + x^{-2} = 14$ and $x^4 + x^{-4} = 194$.

[[completing-the-square|Completing the square]] writes $x^2 + bx + c$ as $(x + \tfrac b2)^2 + c - \tfrac{b^2}{4}$. It gives the minimum of a quadratic at once, $x^2 - 6x + 13 = (x - 3)^2 + 4 \ge 4$, and it turns an equation in two variables into a sum of squares, where each square must take a forced value: $x^2 + y^2 - 10x + 6y + 34 = 0$ is $(x - 5)^2 + (y + 3)^2 = 0$, so $(x, y) = (5, -3)$.

The signal is a polynomial with symmetric coefficients, an expression in $x$ and $\tfrac1x$, or a quadratic whose minimum or square form is needed.`,
      related: [
        { card: "vertex-form", note: String.raw`the completed square of a quadratic function, read as the vertex of its parabola.` },
        { card: "quadratic-perfect-square", note: String.raw`completing the square inside a perfect-square condition (A1.5).` },
        { card: "linear-recurrence", note: String.raw`$s_n = t\,s_{n-1} - s_{n-2}$ is a linear recurrence, solved in general in A3.1.` }
      ],
      exercises: [
        { q: String.raw`If $x + \tfrac1x = 4$, find $x^4 + \tfrac1{x^4}$.`, answer: "194",
          solution: String.raw`Square: $x^2 + \tfrac1{x^2} = 16 - 2 = 14$. Square again: $x^4 + \tfrac1{x^4} = 196 - 2 = 194$.` },
        { q: String.raw`Find the sum of the real roots of $x^4 - 5x^3 + 6x^2 - 5x + 1 = 0$.`, answer: "4",
          solution: String.raw`Divide by $x^2$: $(x^2 + x^{-2}) - 5(x + x^{-1}) + 6 = 0$. With $t = x + \tfrac1x$ this is $t^2 - 2 - 5t + 6 = t^2 - 5t + 4 = (t - 1)(t - 4) = 0$. For real $x$, $|t| \ge 2$, so $t = 1$ gives complex roots; $t = 4$ gives $x^2 - 4x + 1 = 0$, two real roots with sum $4$.` },
        { q: String.raw`What is the smallest value of $x^2 - 6x + 13$ for real $x$?`, answer: "4",
          solution: String.raw`$x^2 - 6x + 13 = (x - 3)^2 + 4$, which is least, $4$, at $x = 3$.` }
      ],
      problems: ["2007 AMC 10A, Problem 20", "2013 AMC 10B, Problem 11", "2020 AMC 10B, Problem 9", "2021 Spring AMC 10B, Problem 15"]
    },
    "A1.4": {
      prereq: ["add-all-equations", "symmetric-polynomial-strategies"],
      cards: ["subtract-and-factor"],
      body: String.raw`Systems whose equations are rotations of one another are solved by combining the equations rather than eliminating one variable at a time. Adding the three pair sums $a + b = 12$, $b + c = 17$, $c + a = 19$ counts each number twice, so $a + b + c = 24$, and subtracting each equation then gives the numbers one by one: $c = 12$, $a = 7$, $b = 5$. The second standard move is to subtract two equations and factor the difference, which usually produces a product equal to zero and splits the problem into cases.

Adding all the equations, or multiplying them, uses the symmetry directly: products of pairs $xy, yz, zx$ multiply to $(xyz)^2$, and dividing that by each pair recovers the third variable. Subtracting two equations exposes a common factor. For $x^2 = y + 2$ and $y^2 = x + 2$, subtracting gives $x^2 - y^2 = y - x$, that is $(x - y)(x + y + 1) = 0$. So either $x = y$, which reduces the system to one equation, or $x + y = -1$, which is new information. This [[subtract-and-factor|subtract and factor]] step is the heart of most cyclic systems, and its typical output is a case split: $(y - 4)(x - z) = 0$ means $y = 4$ or $z = x$, and each case must be followed through.

The same idea turns known values of a polynomial into known roots. If $f(2) = 4$, $f(3) = 9$, and $f(4) = 16$ for a cubic $f$ with leading coefficient $a$, then $f(x) - x^2$ vanishes at $2$, $3$, $4$, so $f(x) = x^2 + a(x - 2)(x - 3)(x - 4)$. Subtracting the pattern the data follow leaves a polynomial whose roots are known.

The signal is a system that looks the same after rotating its variables, two equations that differ by a symmetric change, or a polynomial given at points where it agrees with a simple function. Add or multiply to use the symmetry, and subtract and factor to split into cases.`,
      related: [
        { card: "add-all-equations", note: String.raw`adding or multiplying all the equations of a symmetric system.` },
        { card: "factor-remainder-theorem", note: String.raw`a polynomial vanishing at $r$ has the factor $x - r$, which turns known values into a factored form (A2.1).` },
        { card: "wlog-symmetry", note: String.raw`ordering or identifying variables without loss of generality in a symmetric system (A8.1).` }
      ],
      exercises: [
        { q: String.raw`If $a + b = 12$, $b + c = 17$, and $c + a = 19$, find $abc$.`, answer: "420",
          solution: String.raw`Adding the three equations gives $2(a + b + c) = 48$, so $a + b + c = 24$. Then $c = 24 - 12 = 12$, $a = 24 - 17 = 7$, $b = 24 - 19 = 5$, and $abc = 7 \cdot 5 \cdot 12 = 420$.` },
        { q: String.raw`Real numbers $x \ne y$ satisfy $x^2 = y + 2$ and $y^2 = x + 2$. Find $x + y$.`, answer: "-1",
          solution: String.raw`Subtracting: $x^2 - y^2 = y - x$, so $(x - y)(x + y) = -(x - y)$. Since $x \ne y$, divide by $x - y$: $x + y = -1$.` },
        { q: String.raw`A cubic $f$ with leading coefficient $1$ has $f(1) = 1$, $f(2) = 4$, $f(3) = 9$. Find $f(4)$.`, answer: "22",
          solution: String.raw`$f(x) - x^2$ is a cubic with leading coefficient $1$ and roots $1, 2, 3$, so $f(x) = x^2 + (x - 1)(x - 2)(x - 3)$. Then $f(4) = 16 + 3 \cdot 2 \cdot 1 = 22$.` }
      ],
      problems: ["2012 AMC 10A, Problem 8", "2015 AMC 10A, Problem 16", "2023 AIME II, Problem 4"]
    },
    "A1.5": {
      prereq: ["sfft", "completing-the-square", "factor-pair-counting"],
      cards: ["forced-difference-of-squares", "quadratic-perfect-square"],
      body: String.raw`Many algebra problems ask for integer or positive solutions, and then the algebra is only half the work: the rest is a number-theory argument that the solutions are finite and can be listed. The workhorse case is a quadratic that must be a perfect square. If $n^2 + 6n + 24 = m^2$ for integers, completing the square gives $(n + 3)^2 + 15 = m^2$, so $m^2 - (n + 3)^2 = 15$, a difference of squares equal to a constant, and its factorizations give exactly the four solutions $n = -10, -4, -2, 4$.

The general method for [[quadratic-perfect-square|a quadratic that must be a square]] is to multiply through by $4$ times the leading coefficient if needed, complete the square, and move the constant: $4(n^2 + bn + c) = (2n + b)^2 + (4c - b^2)$. Setting this equal to $(2m)^2$ gives $(2m - 2n - b)(2m + 2n + b) = b^2 - 4c$, and each factor pair of the constant, with matching parity, gives one solution. When the constant is large, its number of factor pairs bounds the number of solutions in advance.

Sometimes the expression is a quartic or a higher power that must be prime, and the move is to [[forced-difference-of-squares|force a difference of squares]] by completing a square and subtracting the excess. $n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, and $n^4 - 360n^2 + 400 = (n^2 + 20)^2 - 400n^2 = (n^2 - 20n + 20)(n^2 + 20n + 20)$; a product of two integers is prime only when the smaller factor is $\pm 1$. Simon's Favorite Factoring Trick plays the same role for equations with an $xy$ term, and an inequality such as $mn \le m + n$ becomes $(m - 1)(n - 1) \le 1$.

The signal is "integer" or "positive integer" in a problem whose algebra is a quadratic, a product of unknowns, or a high power. Complete the square or the product, reach a constant, and list factor pairs.`,
      related: [
        { card: "sfft", note: String.raw`completing the product $(x + b)(y + a)$ for equations with an $xy$ term ((N5.3)).` },
        { card: "difference-of-squares-rep", note: String.raw`which numbers are differences of squares, and the parity condition on the factors ((N5.3)).` },
        { card: "factor-pair-counting", note: String.raw`listing the factor pairs of the constant (N1.5).` }
      ],
      exercises: [
        { q: String.raw`How many integers $n$ make $n^2 + 6n + 24$ a perfect square?`, answer: "4",
          solution: String.raw`$n^2 + 6n + 24 = (n + 3)^2 + 15 = m^2$ gives $(m - n - 3)(m + n + 3) = 15$ with $m \ge 0$. The factor pairs $(1, 15)$ and $(3, 5)$ give $n + 3 = 7$ or $1$; the pairs $(15, 1)$ and $(5, 3)$ give $n + 3 = -7$ or $-1$. So $n = 4, -2, -10, -4$: four integers.` },
        { q: String.raw`For how many positive integers $n$ is $n^4 + 4$ prime?`, answer: "1",
          solution: String.raw`$n^4 + 4 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, and the smaller factor is $(n - 1)^2 + 1$, which is $1$ only at $n = 1$. For $n \ge 2$ both factors exceed $1$. At $n = 1$ the value is $5$, prime. So one $n$.` },
        { q: String.raw`For how many ordered pairs of positive integers $(m, n)$ with $m, n \le 10$ is $mn \le m + n$?`, answer: "20",
          solution: String.raw`$mn \le m + n$ is $(m - 1)(n - 1) \le 1$. This holds when $m = 1$ or $n = 1$ ($10 + 10 - 1 = 19$ pairs) and when $m = n = 2$ (product $1$). That is $20$ pairs.` }
      ],
      problems: ["2002 AMC 10A, Problem 4", "1999 AIME, Problem 3", "2017 AIME II, Problem 6"]
    }
  },
  review: ["2015 AMC 10A, Problem 12", "2001 AMC 10, Problem 10", "2002 AMC 10B, Problem 12", "2013 AMC 12A, Problem 8", "2004 AMC 10B, Problem 11",
    "2021 Spring AMC 10A, Problem 9", "2017 AMC 12B, Problem 23", "2015 AIME I, Problem 10"]
};
