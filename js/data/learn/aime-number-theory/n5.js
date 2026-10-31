// Learn, AIME Number Theory, chapter N5: Diophantine equations and constraints (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N5"] = {
  lessons: {
    "N5.1": {
      prereq: ["bezouts-identity", "extended-euclidean-algorithm"],
      cards: ["chicken-mcnugget", "coins-and-prices"],
      body: String.raw`An equation like $3x + 5y = 100$ in nonnegative integers is a question about making an amount from two sizes of coin, and the contest versions ask how many ways it can be done, or which amounts cannot be made at all. Bézout's identity from N2.4 already says when an amount can be made with integer coefficients of either sign; this lesson adds the restriction to nonnegative counts, which is where the interesting structure lives. With coins worth $5$ and $8$, every amount from $28$ up can be paid, and exactly $14$ smaller amounts cannot.

Counting the ways to pay a given total works by fixing one coin count and reading off the other. In $3x + 5y = 100$, reducing modulo $3$ gives $5y \equiv 100$, that is $2y \equiv 1$, so $y \equiv 2 \pmod 3$; the values $y = 2, 5, \ldots, 20$ each give one nonnegative $x$, so there are $7$ ways. Every [[coins-and-prices|coins-and-prices]] problem has this shape: a congruence fixes the residue of one count, a bound fixes its range, and the answer is the number of terms of an arithmetic progression. With more than two coin types the same idea applies after one count is fixed, or after subtracting one equation from another to eliminate a variable.

Which totals can be made at all? For coprime $a$ and $b$, the [[chicken-mcnugget|Chicken McNugget theorem]] says the largest total that cannot be written as $ax + by$ with $x, y \ge 0$ is $ab - a - b$, and exactly $\tfrac{(a-1)(b-1)}{2}$ totals cannot be made. The reason is the residues: the multiples $0, b, 2b, \ldots, (a-1)b$ cover every residue modulo $a$, and once a total reaches the smallest of these in its residue class, adding $a$ repeatedly reaches every larger total in the class. The last class to be reached is the one of $(a-1)b$, and the total just below it, $(a-1)b - a$, is the largest that fails. For $5$ and $8$ that is $40 - 5 - 8 = 27$, with $\tfrac{4 \cdot 7}{2} = 14$ unreachable totals. When $a$ and $b$ share a factor, only multiples of the gcd can ever be made, so the question is asked after dividing it out.

The signal is a total made from items of fixed values, stamps, coins, or prices, with whole numbers of each. Reduce modulo one value to fix the residue of a count, then count or bound.`,
      related: [
        { card: "bezouts-identity", note: String.raw`which totals are reachable once negative counts are allowed (N2.4).` },
        { card: "modular-inverse", note: String.raw`fixing a count's residue is solving a linear congruence, with an inverse when the coefficient is coprime to the modulus (N2.2 and N2.3).` },
        { card: "arithmetic-series", note: String.raw`the admissible counts form an arithmetic progression, whose terms are then counted.` }
      ],
      exercises: [
        { q: String.raw`How many pairs of nonnegative integers $(x, y)$ satisfy $3x + 5y = 100$?`, answer: "7",
          solution: String.raw`Modulo $3$, $5y \equiv 100$ becomes $2y \equiv 1$, so $y \equiv 2 \pmod 3$. With $5y \le 100$, $y \in \{2, 5, 8, 11, 14, 17, 20\}$, and each gives a nonnegative integer $x$. So there are $7$ pairs.` },
        { q: String.raw`With an unlimited supply of $5$-cent and $8$-cent stamps, what is the largest postage that cannot be made exactly?`, answer: "27",
          solution: String.raw`$5$ and $8$ are coprime, so by the Chicken McNugget theorem the largest unreachable amount is $5 \cdot 8 - 5 - 8 = 27$. Check: $28 = 4 \cdot 5 + 8$, $29 = 5 + 3 \cdot 8$, $30, 31, 32$ are reachable, so all larger amounts are too, while $27$ is $2 \pmod 5$ and the smallest multiple of $8$ that is $2 \pmod 5$ is $32$.` },
        { q: String.raw`How many positive amounts cannot be made from $5$-cent and $8$-cent stamps?`, answer: "14",
          solution: String.raw`For coprime $a$ and $b$ the number of unreachable amounts is $\tfrac{(a-1)(b-1)}{2} = \tfrac{4 \cdot 7}{2} = 14$. (They are $1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 17, 19, 22, 27$.)` }
      ],
      problems: ["2008 AMC 10B, Problem 8", "2015 AMC 10B, Problem 15", "2003 AMC 12B, Problem 7", "1994 AIME, Problem 11"]
    },
    "N5.2": {
      prereq: ["sfft", "forced-difference-of-squares", "factor-pair-counting"],
      cards: ["difference-of-squares-rep"],
      body: String.raw`An equation in integers becomes finite the moment it can be written as a product equal to a constant, because the factors must then be complementary divisors of that constant. Three algebraic moves get there most often: the difference of squares $a^2 - b^2 = (a - b)(a + b)$, Simon's Favorite Factoring Trick for equations with an $xy$ term, and forcing a difference of squares out of an expression that does not look like one. The equation $xy - 3x - 2y = 6$, for instance, becomes $(x - 2)(y - 3) = 12$, and its six solutions in positive integers are read off the factor pairs of $12$.

A difference of squares has a parity constraint built in. In $n = (a - b)(a + b)$ the two factors differ by $2b$, so they have the same parity: both odd, giving an odd $n$, or both even, giving a multiple of $4$. That is why [[difference-of-squares-rep|a number is a difference of two squares]] exactly when it is not $2$ more than a multiple of $4$; every odd number is $(k + 1)^2 - k^2$, every multiple of $4$ is $(k + 1)^2 - (k - 1)^2$, and the numbers $\equiv 2 \pmod 4$ never are. Of the numbers $1$ to $100$, the $25$ that are $2 \pmod 4$ fail and the other $75$ succeed. When two conditions say that $M + A$ and $M + B$ are both squares, subtracting gives $Q^2 - P^2 = B - A$, a difference of squares with a known value.

An equation of the form $xy + ax + by = c$ is a product missing its constant term: $(x + b)(y + a) = xy + ax + by + ab$, so adding $ab$ to both sides gives $(x + b)(y + a) = c + ab$. For $xy - 3x - 2y = 6$, adding $6$ gives $(x - 2)(y - 3) = 12$. The factor pairs must then respect the signs that the variables allow; here negative factors would force a negative $y$, so only the six positive pairs count. A quartic can sometimes be forced into a difference of squares by completing a square and subtracting the excess: $n^4 + 4 = (n^2 + 2)^2 - 4n^2 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, so $n^4 + 4$ is prime only when the smaller factor is $1$, that is, for $n = 1$.

The signal is an integer equation with a product of unknowns, a difference of squares, or a high power that "should" be prime. Factor until one side is a constant, then list its factor pairs with the right signs and parities.`,
      related: [
        { card: "sfft", note: String.raw`the trick of adding a constant so that $xy + ax + by$ factors.` },
        { card: "forced-difference-of-squares", note: String.raw`completing a square and subtracting, as in $n^4 + 4$ (the Sophie Germain identity).` },
        { card: "factor-pair-counting", note: String.raw`listing the factor pairs of the constant once the product form is reached (N1.5).` }
      ],
      exercises: [
        { q: String.raw`How many integers from $1$ to $100$ can be written as $a^2 - b^2$ with integers $a, b \ge 0$?`, answer: "75",
          solution: String.raw`A number is a difference of two squares exactly when it is not $2 \pmod 4$. From $1$ to $100$ there are $25$ numbers $\equiv 2 \pmod 4$ ($2, 6, \ldots, 98$), so $100 - 25 = 75$ can be written this way.` },
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy - 3x - 2y = 6$?`, answer: "6",
          solution: String.raw`Adding $6$ gives $(x - 2)(y - 3) = 12$. Since $x \ge 1$ and $y \ge 1$, the factors are at least $-1$ and $-2$; a negative pair would need a product of $12$ from numbers no smaller than $-1$ and $-2$, which is impossible. So both factors are positive divisors: $(1, 12), (2, 6), (3, 4), (4, 3), (6, 2), (12, 1)$, six pairs.` },
        { q: String.raw`For how many positive integers $n$ is $n^4 + 4$ prime?`, answer: "1",
          solution: String.raw`$n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 - 2n + 2)(n^2 + 2n + 2)$. The smaller factor is $(n - 1)^2 + 1 \ge 1$, and it equals $1$ only for $n = 1$; for larger $n$ both factors exceed $1$. At $n = 1$, $n^4 + 4 = 5$ is prime. So exactly one $n$ works.` }
      ],
      problems: ["2000 AMC 10, Problem 11", "2011 AMC 10A, Problem 19", "2024 AMC 10A, Problem 15", "1997 AIME, Problem 1", "2009 AMC 12B, Problem 19"]
    },
    "N5.3": {
      prereq: ["only-even-prime", "modular-basics"],
      cards: ["choose-modulus", "primes-6k"],
      body: String.raw`The fastest way to show an integer equation has no solutions is to look at it modulo a small number where its terms can take only a few values. Squares, for example, are only ever $0$ or $1$ modulo $4$, so $x^2 + y^2$ is $0$, $1$, or $2$ modulo $4$ and can never equal $2027$, which is $3$. Parity is the special case of modulus $2$, and it settles more contest problems than any other single observation. This lesson collects the moduli that are worth trying and what each one reveals.

The skill is [[choose-modulus|choosing the modulus]]. Squares take few values modulo $3$ ($0$ or $1$), $4$ ($0$ or $1$), and $8$ (an odd square is always $1$). Cubes take few values modulo $7$ and $9$ ($0$ and $\pm 1$). Fourth powers modulo $5$ or $16$ are just $0$ or $1$, and by Fermat's Little Theorem every $p - 1$st power modulo a prime $p$ is $0$ or $1$. A good modulus makes most terms of the equation constant or nearly so, and then the equation either has no room for a solution or pins down the residue of a variable. Choosing well is a matter of matching the modulus to the powers that appear.

Parity alone does a surprising amount, because $2$ is the only even prime. A sum of two primes that is odd must use $2$; a product of two consecutive integers is even, so it is prime only when it equals $2$, as $n^2 - 3n + 2 = (n - 1)(n - 2)$ shows. The same kind of sieve explains why [[primes-6k|every prime above $3$ is one more or one less than a multiple of $6$]]: the other residues modulo $6$ are divisible by $2$ or $3$. Squaring then gives $p^2 \equiv 1 \pmod{24}$ for every such prime, since $p^2 - 1 = (p - 1)(p + 1)$ is a product of two consecutive even numbers, one of them a multiple of $4$, and one of $p - 1$, $p$, $p + 1$ is a multiple of $3$. A related argument shows that among $p$, $p + 2$, $p + 4$ one is always a multiple of $3$, so the only prime triple of that shape is $3, 5, 7$.

Modular arguments rule things out; they rarely find solutions on their own. In practice they are used first, to discard impossible cases and fix residues, and the remaining cases are finished by bounding (N5.5) or factoring (N5.2).`,
      related: [
        { card: "only-even-prime", note: String.raw`parity with primes: an odd sum of two primes uses $2$.` },
        { card: "fermats-little-theorem", note: String.raw`why $(p - 1)$st powers are $0$ or $1$ modulo $p$, which makes $p$ a good modulus for them (N3.3).` },
        { card: "sum-of-two-squares", note: String.raw`the full answer to which numbers are $x^2 + y^2$, of which the modulo $4$ obstruction is the first step (N5.4).` }
      ],
      exercises: [
        { q: String.raw`How many pairs of integers $(x, y)$ satisfy $x^2 + y^2 = 2027$?`, answer: "0",
          solution: String.raw`Every square is $0$ or $1$ modulo $4$, so $x^2 + y^2$ is $0$, $1$, or $2$ modulo $4$. But $2027 = 4 \cdot 506 + 3$ is $3$ modulo $4$. There are no solutions.` },
        { q: String.raw`What is the remainder when $101^2$ is divided by $24$?`, answer: "1",
          solution: String.raw`$101$ is a prime greater than $3$, so $101^2 - 1 = 100 \cdot 102$ is a product of two consecutive even numbers (one of them, $100$, a multiple of $4$), and $102$ is a multiple of $3$. So $24 \mid 101^2 - 1$ and the remainder is $1$. Directly: $10201 = 24 \cdot 425 + 1$.` },
        { q: String.raw`How many primes $p$ are there such that $p$, $p + 2$, and $p + 4$ are all prime?`, answer: "1",
          solution: String.raw`The three numbers $p, p + 2, p + 4$ are $p, p + 2, p + 1$ modulo $3$, which are all three residues, so one of them is a multiple of $3$. Being prime, that one must be $3$ itself, which gives $p = 3$ and the triple $3, 5, 7$ (the cases $p + 2 = 3$ and $p + 4 = 3$ make $p$ negative or $1$). So there is exactly one such prime.` }
      ],
      problems: ["2002 AMC 10B, Problem 6", "2023 AMC 12B, Problem 16"]
    },
    "N5.4": {
      prereq: ["difference-of-squares-rep", "modular-basics"],
      cards: ["pythagorean-triples", "integer-triangles-perimeter", "sum-of-two-squares", "lattice-points-circle"],
      body: String.raw`Integer right triangles, integer triangles with a given perimeter, and integer points on a circle are three faces of one question: which integers are sums of squares, and in how many ways. Each has a complete answer that turns counting into arithmetic. There are exactly seven primitive right triangles with integer sides and hypotenuse at most $50$, exactly three triangles with integer sides and perimeter $12$, and exactly $16$ points with integer coordinates on the circle $x^2 + y^2 = 65$.

Every primitive Pythagorean triple, one with no common factor, is [[pythagorean-triples|$(m^2 - n^2,\ 2mn,\ m^2 + n^2)$]] for coprime $m > n$ of opposite parity, and every triple is a multiple of a primitive one. The reason is the factorization $b^2 = c^2 - a^2 = (c - a)(c + a)$ with $a$ odd: the two factors are even, their halves are coprime, and coprime numbers whose product is a square are each squares, $m^2$ and $n^2$. Listing $m$ and $n$ produces the triples in order: $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$, $(20, 21, 29)$, $(12, 35, 37)$, $(9, 40, 41)$ are all the primitive ones up to $50$. In geometry problems these triples appear inside figures, which is why recognizing $5$-$12$-$13$ or $9$-$12$-$15$ in a diagram is so often the first step.

For triangles with integer sides, the triangle inequality makes the count finite. [[integer-triangles-perimeter|Triangles with perimeter $n$]] have sides $a \le b \le c$ with $a + b > c$, so $c < \tfrac n2$; for perimeter $12$ that leaves $(2, 5, 5)$, $(3, 4, 5)$, and $(4, 4, 4)$. Listing by the longest side is the reliable method, and for larger perimeters the count is the integer nearest to $\tfrac{n^2}{48}$ when $n$ is even and to $\tfrac{(n+3)^2}{48}$ when $n$ is odd.

Which numbers are sums of two squares? Modulo $4$ shows that a prime $\equiv 3 \pmod 4$ never is, and in fact [[sum-of-two-squares|$n$ is a sum of two squares]] exactly when every prime $\equiv 3 \pmod 4$ divides it to an even power. Counting the [[lattice-points-circle|lattice points on $x^2 + y^2 = n$]], with signs and order, gives $4(d_1 - d_3)$, where $d_1$ and $d_3$ count the divisors of $n$ that are $1$ and $3$ modulo $4$. For $25$ that is $4 \cdot 3 = 12$ points, and for $65 = 5 \cdot 13$, whose four divisors are all $1 \pmod 4$, it is $16$.

The signal is a right triangle or a distance with integer lengths, a count of integer triangles, or integer points on a circle. Reach for the parametrization, the triangle inequality, or the divisor count.`,
      related: [
        { card: "triangle-inequality", note: String.raw`the condition $a + b > c$ that bounds integer triangles.` },
        { card: "difference-of-squares-rep", note: String.raw`the factorization $(c - a)(c + a)$ behind the Pythagorean parametrization (N5.2).` },
        { card: "number-of-divisors", note: String.raw`the divisor counts $d_1$ and $d_3$ that count lattice points (N1.3).` }
      ],
      exercises: [
        { q: String.raw`How many primitive Pythagorean triples have hypotenuse at most $50$?`, answer: "7",
          solution: String.raw`With $c = m^2 + n^2 \le 50$, $m > n$, coprime, opposite parity: $(2,1), (3,2), (4,1), (4,3), (5,2), (5,4), (6,1)$, giving $(3,4,5), (5,12,13), (15,8,17), (7,24,25), (21,20,29), (9,40,41), (35,12,37)$. Pairs like $(6, 5)$ give $c = 61 > 50$. So there are $7$.` },
        { q: String.raw`How many noncongruent triangles have integer sides and perimeter $12$?`, answer: "3",
          solution: String.raw`With $a \le b \le c$, $a + b > c$ and $a + b + c = 12$, the longest side satisfies $c < 6$ and $c \ge 4$. For $c = 5$: $(2, 5, 5)$, $(3, 4, 5)$. For $c = 4$: $(4, 4, 4)$. That is $3$ triangles.` },
        { q: String.raw`How many points with integer coordinates lie on the circle $x^2 + y^2 = 65$?`, answer: "16",
          solution: String.raw`The divisors of $65$ are $1, 5, 13, 65$, all $\equiv 1 \pmod 4$, so $d_1 = 4$, $d_3 = 0$, and there are $4 \cdot 4 = 16$ points. They are $(\pm1, \pm8), (\pm8, \pm1), (\pm4, \pm7), (\pm7, \pm4)$.` }
      ],
      problems: ["2009 AMC 12B, Problem 13", "2015 AMC 12B, Problem 10", "2017 AMC 10A, Problem 17", "2010 AIME I, Problem 8", "2023 AIME I, Problem 15"]
    },
    "N5.5": {
      prereq: ["choose-modulus", "factor-pair-counting"],
      cards: ["bounding-diophantine", "squeeze-between-squares"],
      body: String.raw`When neither factoring nor a modulus finishes an equation, inequalities do: they turn infinitely many candidates into a short list that can be checked by hand. The classic example is $\tfrac1a + \tfrac1b + \tfrac1c = 1$ in positive integers. Ordering the unknowns so that $a \le b \le c$ makes $\tfrac1a$ the largest term, so $\tfrac 3a \ge 1$ and $a \le 3$; each value of $a$ then bounds $b$ the same way, and the only solutions are $(3, 3, 3)$, $(2, 4, 4)$, and $(2, 3, 6)$.

[[bounding-diophantine|Bounding]] has a standard rhythm. First break the symmetry by ordering the variables, so that one of them carries the extreme value. Then bound that variable using the equation, often by replacing every other variable with it. Then fix it and repeat with the next. The method works because the bound tightens at each step, and the finite check that remains is short if the ordering was chosen well. It applies equally to sums of reciprocals, to products that must stay below a total, and to equations where one side grows much faster than the other, such as an exponential against a polynomial.

For equations that ask when an expression is a perfect square, the sharpest bound is a pair of consecutive squares. Since there is no square strictly between $k^2$ and $(k + 1)^2$, an expression trapped there cannot be a square, which is [[squeeze-between-squares|squeezing between squares]]. For every positive $n$, $n^2 < n^2 + n + 1 < (n + 1)^2$, so $n^2 + n + 1$ is never a square. When the expression is close to a square but not trapped, write the gap: $n^2 + 2n + 12 = (n + 1)^2 + 11$ is a square $m^2$ exactly when $m^2 - (n + 1)^2 = 11$, a difference of squares whose only factorization $1 \cdot 11$ gives $n = 4$ and $m = 6$.

The signal is an equation with no obvious factorization and no useful modulus, especially one with reciprocals, a product of several unknowns, or a quadratic that is asked to be a square. Order, bound, and check what is left.`,
      related: [
        { card: "difference-of-squares-rep", note: String.raw`the gap between a quadratic and the nearest square becomes a difference of squares (N5.2).` },
        { card: "choose-modulus", note: String.raw`a modulus to discard cases before or after the bounding (N5.3).` },
        { card: "am-gm", note: String.raw`a source of the inequalities used to bound a product or a sum.` }
      ],
      exercises: [
        { q: String.raw`How many triples of positive integers $a \le b \le c$ satisfy $\tfrac1a + \tfrac1b + \tfrac1c = 1$?`, answer: "3",
          solution: String.raw`With $a \le b \le c$, $1 \le \tfrac3a$, so $a \le 3$, and $a \ge 2$. For $a = 3$: $\tfrac1b + \tfrac1c = \tfrac23$ with $b \ge 3$ forces $b = c = 3$. For $a = 2$: $\tfrac1b + \tfrac1c = \tfrac12$, so $2 < b \le 4$: $b = 3$ gives $c = 6$, $b = 4$ gives $c = 4$. So the solutions are $(3, 3, 3), (2, 3, 6), (2, 4, 4)$: three.` },
        { q: String.raw`Find the positive integer $n$ for which $n^2 + 2n + 12$ is a perfect square.`, answer: "4",
          solution: String.raw`$n^2 + 2n + 12 = (n + 1)^2 + 11$. If this is $m^2$, then $(m - n - 1)(m + n + 1) = 11$, and with positive factors the only option is $1 \cdot 11$: $m - n - 1 = 1$ and $m + n + 1 = 11$, so $m = 6$, $n = 4$. Check: $16 + 8 + 12 = 36$.` },
        { q: String.raw`For how many positive integers $n$ is $n^2 + n + 1$ a perfect square?`, answer: "0",
          solution: String.raw`For $n \ge 1$, $n^2 < n^2 + n + 1 < n^2 + 2n + 1 = (n + 1)^2$, so $n^2 + n + 1$ lies strictly between two consecutive squares and is never a square. The answer is $0$.` }
      ],
      problems: ["2004 AMC 10B, Problem 13", "2016 AMC 10A, Problem 14", "2005 AIME I, Problem 4"]
    }
  },
  review: ["2015 AMC 10A, Problem 13", "2006 AMC 12A, Problem 9", "2021 Spring AMC 10B, Problem 11", "2024 AMC 10A, Problem 11", "2024 AMC 10A, Problem 4",
    "2011 AMC 12B, Problem 11", "1994 AIME, Problem 7", "2019 AIME II, Problem 14"]
};
