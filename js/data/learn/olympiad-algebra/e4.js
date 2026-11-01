// Learn, Olympiad Algebra, chapter E4: polynomials (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["E4"] = {
  lessons: {
    "E4.1": {
      prereq: ["rational-root-theorem", "vietas-general", "binomial-theorem"],
      cards: [],
      body: String.raw`Olympiad polynomial problems ask whether a polynomial factors, where its roots lie, and which polynomials take integer values. This chapter gives the three kinds of tool: criteria for irreducibility, facts about roots and their positions, and the binomial basis for integer-valued polynomials.

The polynomial $x^2 - 2$ does not factor over the rationals, since a factorization would give a rational root, and the rational root theorem allows only $\pm1$ and $\pm2$, none of which works. The cubic $x^3 - 3x + 1$ has discriminant $-4(-3)^3 - 27 \cdot 1^2 = 81 \gt 0$, so its three roots are real and different. And $\tfrac{x(x - 1)}{2}$ has non-integer coefficients but an integer value at every integer, since one of $x$ and $x - 1$ is even.

The lessons are irreducibility (E4.2), roots: cubics, derivatives and discriminants (E4.3), and polynomials with integer values (E4.4). The Summary (E4.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that $x^2 - 2$ cannot be written as a product of two polynomials of degree $1$ with rational coefficients.`,
          solution: String.raw`Such a factorization would give a rational root of $x^2 - 2$. By the rational root theorem a rational root is $\pm1$ or $\pm2$, and $1 - 2$, $4 - 2$ are not $0$. So there is none.` },
        { q: String.raw`Compute the discriminant $-4p^3 - 27q^2$ of $x^3 - 3x + 1$ and say what it shows about the roots.`,
          solution: String.raw`With $p = -3$ and $q = 1$: $-4(-27) - 27 = 81$. A positive discriminant means three different real roots.` },
        { q: String.raw`Prove that $\tfrac{x(x - 1)}{2}$ is an integer for every integer $x$.`,
          solution: String.raw`Of the consecutive integers $x - 1$ and $x$, one is even, so their product is even and half of it is an integer.` }
      ],
      problems: []
    },
    "E4.2": {
      prereq: ["rational-root-theorem", "binomial-theorem"],
      cards: ["eisenstein-criterion", "cohn-irreducibility"],
      body: String.raw`Does $x^4 + 10x + 5$ factor over the integers? Does $x^4 + x^3 + x^2 + x + 1$? Does $x^3 + x + 3$? A polynomial of degree $4$ can factor into two quadratics without having a rational root, so the rational root test is not enough. Two criteria settle many cases.

[[eisenstein-criterion|Eisenstein's criterion]] says that if a prime $p$ divides every coefficient except the leading one, does not divide the leading one, and $p^2$ does not divide the constant term, then the polynomial is irreducible over the rationals. For $x^4 + 10x + 5$, the prime $5$ divides $10$ and $5$, not $1$, and $25 \nmid 5$. The proof: in a factorization $(b_0 + \cdots)(c_0 + \cdots)$, $p$ divides exactly one of $b_0$, $c_0$, say $b_0$; then comparing coefficients, $p$ divides $b_1$, $b_2$, and so on through all of the first factor, including its leading coefficient, which would make $p$ divide the leading coefficient of the product. When the criterion does not apply as written, a substitution $x \to x + a$ often makes it apply, since it does not change irreducibility. For $x^4 + x^3 + x^2 + x + 1 = \tfrac{x^5 - 1}{x - 1}$, put $x + 1$ for $x$: $\tfrac{(x + 1)^5 - 1}{x} = x^4 + 5x^3 + 10x^2 + 10x + 5$, Eisenstein at $5$. The same works for $1 + x + \cdots + x^{p-1}$ for every prime $p$.

[[cohn-irreducibility|Cohn's criterion]] reads a prime's digits as coefficients: if $p = \overline{a_m \ldots a_0}$ in base $10$ is prime, then $a_mx^m + \cdots + a_0$ is irreducible over the integers. Since $1013$ is prime, $x^3 + x + 3$ is irreducible. It is a criterion to recognize rather than to prove in a contest, and the converse fails: an irreducible polynomial can give a composite value at $10$.

Look for a prime that divides all but the leading coefficient, shift $x$ when it almost works, and read the coefficients as digits for Cohn. The next lesson studies roots.`,
      related: [
        { card: "rational-root-theorem", note: String.raw`the test for linear factors.` },
        { card: "cyclotomic-polynomials", note: String.raw`the polynomials $1 + x + \cdots + x^{p-1}$ and their relatives (D2.3).` }
      ],
      exercises: [
        { q: String.raw`Prove that $x^4 + 10x + 5$ is irreducible over the rationals.`,
          solution: String.raw`The prime $5$ divides the coefficients $0, 0, 10, 5$ of $x^3$, $x^2$, $x$ and $1$, does not divide the leading coefficient $1$, and $25$ does not divide the constant term $5$. By Eisenstein's criterion the polynomial is irreducible.` },
        { q: String.raw`Prove that $x^4 + x^3 + x^2 + x + 1$ is irreducible over the rationals.`,
          solution: String.raw`It is irreducible exactly when $f(x + 1)$ is. Since $f(x) = \tfrac{x^5 - 1}{x - 1}$, $f(x + 1) = \tfrac{(x + 1)^5 - 1}{x} = x^4 + 5x^3 + 10x^2 + 10x + 5$. The prime $5$ divides $5, 10, 10, 5$, not $1$, and $25 \nmid 5$, so $f(x + 1)$ is irreducible by Eisenstein, and so is $f$.` },
        { q: String.raw`Prove that $x^3 + x + 3$ is irreducible over the rationals, both by Cohn's criterion and directly.`,
          solution: String.raw`By Cohn: its coefficients are the digits of $1013$, which is prime. Directly: a cubic that factors has a linear factor, hence a rational root, which must be $\pm1$ or $\pm3$; the values $5$, $1$, $33$, $-27$ are not $0$.` }
      ],
      problems: []
    },
    "E4.3": {
      prereq: ["vietas-general", "complex-basics", "quadratic-formula"],
      cards: ["cardano-cubic", "gauss-lucas", "resultant-discriminant", "mason-stothers"],
      body: String.raw`What is a root of $t^3 + 6t - 20 = 0$? Where do the roots of $P'$ lie compared with those of $P$? How can one tell whether a cubic has three real roots without finding them? Why does $x^n + y^n = z^n$ have no solutions in coprime nonconstant polynomials for $n \ge 3$? Four facts about roots.

[[cardano-cubic|Cardano's formula]] solves $t^3 + pt + q = 0$: substituting $t = u + v$ with $3uv = -p$ reduces it to a quadratic in $u^3$, giving $t = \sqrt[3]{-\tfrac q2 + \sqrt D} + \sqrt[3]{-\tfrac q2 - \sqrt D}$ with $D = \tfrac{q^2}{4} + \tfrac{p^3}{27}$. For $t^3 + 6t - 20$, $D = 100 + 8 = 108$, and $t = \sqrt[3]{10 + \sqrt{108}} + \sqrt[3]{10 - \sqrt{108}} = 2$. Any cubic is brought to this form by shifting $x$ to remove the $x^2$ term.

[[resultant-discriminant|The discriminant]] is a product of the squared differences of the roots, times a power of the leading coefficient, so it is zero exactly when two roots coincide. For $x^3 + px + q$ it is $-4p^3 - 27q^2$: positive means three different real roots, negative means one real and two complex. The resultant of two polynomials vanishes exactly when they share a root, and the discriminant of $f$ is essentially the resultant of $f$ and $f'$.

[[gauss-lucas|The Gauss-Lucas theorem]] says that the roots of $P'$ lie in the convex hull of the roots of $P$ in the complex plane: in any convex region containing all the roots of $P$. For real-rooted $P$ it is the statement that the roots of $P'$ lie between the smallest and largest roots of $P$, which Rolle's theorem refines to one in each gap. For $P = x(x - 2)(x - 4)$, the roots of $P' = 3x^2 - 12x + 8$ are $2 \pm \tfrac{2}{\sqrt3}$, inside $[0, 4]$.

[[mason-stothers|The Mason-Stothers theorem]] is the polynomial $abc$ theorem: if $a + b = c$ for coprime polynomials, not all constant, then the largest degree is less than the number of distinct roots of $abc$. Applied to $x^n + y^n = z^n$ with coprime $x$, $y$, $z$, the number of distinct roots of $x^ny^nz^n$ is at most $\deg x + \deg y + \deg z$, so $n \max \deg \le \deg x + \deg y + \deg z - 1 \lt 3\max\deg$, impossible for $n \ge 3$.

Depress a cubic and use Cardano, read the sign of the discriminant for the nature of the roots, keep the critical points among the roots, and count distinct roots with Mason-Stothers. The next lesson studies polynomials that take integer values.`,
      related: [
        { card: "vietas-general", note: String.raw`the symmetric functions of the roots that the discriminant is built from.` },
        { card: "complex-basics", note: String.raw`the plane in which the convex hull of Gauss-Lucas is drawn.` }
      ],
      exercises: [
        { q: String.raw`Use Cardano's formula to find the real root of $t^3 + 6t - 20 = 0$.`,
          solution: String.raw`$p = 6$, $q = -20$, $D = \tfrac{400}{4} + \tfrac{216}{27} = 100 + 8 = 108$. So $t = \sqrt[3]{10 + \sqrt{108}} + \sqrt[3]{10 - \sqrt{108}}$. Since $(1 + \sqrt3)^3 = 10 + 6\sqrt3 = 10 + \sqrt{108}$ and $(1 - \sqrt3)^3 = 10 - \sqrt{108}$, $t = (1 + \sqrt3) + (1 - \sqrt3) = 2$. Check: $8 + 12 - 20 = 0$.` },
        { q: String.raw`How many real roots does $x^3 - 3x + 1$ have? Justify with the discriminant.`,
          solution: String.raw`For $x^3 + px + q$ the discriminant is $-4p^3 - 27q^2$; here $-4(-3)^3 - 27 = 108 - 27 = 81 \gt 0$. A positive discriminant means three different real roots: $3$.` },
        { q: String.raw`Let $P(x) = x(x - 2)(x - 4)$. Find the sum of the roots of $P'$ and check that they lie in $[0, 4]$.`,
          solution: String.raw`$P = x^3 - 6x^2 + 8x$, $P' = 3x^2 - 12x + 8$, whose roots add to $4$ and are $2 \pm \tfrac{2}{\sqrt3} \approx 0.85$ and $3.15$, both in $[0, 4]$, as the Gauss-Lucas theorem says.` },
        { q: String.raw`Prove that $x(t)^3 + y(t)^3 = z(t)^3$ has no solution in coprime polynomials that are not all constant.`,
          solution: String.raw`Let $d$ be the largest of the degrees. By Mason-Stothers applied to $x^3 + y^3 = z^3$, $3d \le n_0(x^3y^3z^3) - 1$, where $n_0$ counts distinct roots. The distinct roots of $x^3y^3z^3$ are those of $xyz$, at most $\deg x + \deg y + \deg z \le 3d$. So $3d \le 3d - 1$, a contradiction.` }
      ],
      problems: []
    },
    "E4.4": {
      prereq: ["binomial-theorem", "finite-differences"],
      cards: ["integer-valued-polynomials"],
      body: String.raw`Why is $\tfrac{x(x + 1)(x + 2)}{6}$ an integer at every integer? If a quadratic takes integer values at $0$, $1$ and $2$, must it take integer values at every integer? Which polynomial takes the values $1, 3, 7, 13$ at $0, 1, 2, 3$? Integer values do not require integer coefficients.

[[integer-valued-polynomials|Integer-valued polynomials]] are exactly the integer combinations of the binomial polynomials $\binom xk = \tfrac{x(x - 1)\cdots(x - k + 1)}{k!}$. Each $\binom xk$ is integer-valued, since for $x \ge k$ it counts subsets and for other integers it is $0$ or $\pm$ a binomial coefficient. Conversely, any polynomial of degree $n$ can be written as $\sum c_k\binom xk$, and the coefficients are its finite differences at $0$: $c_0 = P(0)$, $c_1 = P(1) - P(0)$, $c_2 = P(2) - 2P(1) + P(0)$, and so on. So if $P(0), \ldots, P(n)$ are integers, every $c_k$ is an integer and $P$ is integer-valued everywhere. The polynomial $\tfrac{x(x + 1)(x + 2)}{6} = \binom{x + 2}{3}$ is one of them.

The difference table finds the polynomial. For values $1, 3, 7, 13$, the first differences are $2, 4, 6$, the second $2, 2$, the third $0$; so $P = 1 + 2\binom x1 + 2\binom x2 = x^2 + x + 1$, and $P(10) = 111$. A polynomial with integer coefficients satisfies more: $a - b$ divides $P(a) - P(b)$, which an integer-valued polynomial need not: $\binom 22 - \binom 02 = 1$ is not a multiple of $2 - 0$.

Write a polynomial in the binomial basis with its finite differences, and read integer values from integer differences. The Summary follows.`,
      related: [
        { card: "finite-differences", note: String.raw`the difference table that gives the coefficients.` },
        { card: "lagrange-interpolation", note: String.raw`another way to write the polynomial through given values.` }
      ],
      exercises: [
        { q: String.raw`Prove that $\tfrac{x(x + 1)(x + 2)}{6}$ is an integer for every integer $x$.`,
          solution: String.raw`Among three consecutive integers one is a multiple of $3$ and at least one is even, so the product is a multiple of $6$. (It is also $\binom{x + 2}{3}$.)` },
        { q: String.raw`A polynomial $P$ of degree at most $2$ has $P(0)$, $P(1)$, $P(2)$ integers. Prove that $P(n)$ is an integer for every integer $n$.`,
          solution: String.raw`Write $P(x) = c_0 + c_1 x + c_2\binom x2$. Setting $x = 0, 1, 2$: $c_0 = P(0)$, $c_1 = P(1) - P(0)$, $c_2 = P(2) - 2P(1) + P(0)$, all integers. Since $\binom n2$ is an integer for every integer $n$, so is $P(n)$.` },
        { q: String.raw`A polynomial of degree at most $3$ takes the values $1, 3, 7, 13$ at $x = 0, 1, 2, 3$. What is its value at $x = 10$?`, answer: "111",
          solution: String.raw`The differences are $2, 4, 6$, then $2, 2$, then $0$, so $P = 1 + 2x + 2\binom x2 = x^2 + x + 1$. Then $P(10) = 111$.` }
      ],
      problems: []
    },
    "E4.5": {
      prereq: ["eisenstein-criterion", "cohn-irreducibility", "cardano-cubic", "gauss-lucas", "resultant-discriminant", "mason-stothers", "integer-valued-polynomials"],
      cards: [],
      body: String.raw`[[eisenstein-criterion|Eisenstein's criterion]], with a shift of $x$, and [[cohn-irreducibility|Cohn's criterion]] prove irreducibility.

[[cardano-cubic|Cardano's formula]] solves the depressed cubic, [[resultant-discriminant|the discriminant]] detects repeated roots and counts real ones, [[gauss-lucas|Gauss-Lucas]] keeps the roots of $P'$ among those of $P$, and [[mason-stothers|Mason-Stothers]] bounds degrees by distinct roots.

[[integer-valued-polynomials|Integer-valued polynomials]] are the integer combinations of $\binom xk$.`,
      strategies: [
        String.raw`For irreducibility, try a prime for Eisenstein, then a shift $x \to x + a$.`,
        String.raw`For a quartic, the rational root test is not enough: a quartic can split into quadratics.`,
        String.raw`Remove the $x^2$ term of a cubic before using Cardano.`,
        String.raw`Read the sign of the discriminant for the number of real roots.`,
        String.raw`Write a polynomial in the binomial basis to study its integer values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that $x^3 - 2$ is irreducible over the rationals.`,
        solution: String.raw`By Eisenstein at $2$: $2$ divides $0, 0, -2$, not $1$, and $4 \nmid 2$. (Or: a factorization would give a rational root, $\pm1$ or $\pm2$, and none works.)` },
      { q: String.raw`Prove that $\tfrac{x^5 - x}{5}$ is an integer for every integer $x$.`,
        solution: String.raw`By Fermat's little theorem, $x^5 \equiv x \pmod 5$ for every integer $x$. (Or: its values at $0, \ldots, 5$ are integers, $0, 0, 6, 48, 204, 624$, and it has degree $5$, so it is integer-valued.)` },
      { q: String.raw`Find the sum of the squares of the roots of $x^3 - 3x + 1$.`, answer: "6",
        solution: String.raw`With $e_1 = 0$ and $e_2 = -3$, the sum of the squares is $e_1^2 - 2e_2 = 6$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that $(x - 1)(x - 2)\cdots(x - n) - 1$ is irreducible over the integers for every $n \ge 1$.`,
        solution: String.raw`Suppose $f = gh$ with $g$, $h$ nonconstant integer polynomials; we may take both with leading coefficient $1$ or both $-1$, and $\deg g, \deg h \lt n$. For $i = 1, \ldots, n$, $g(i)h(i) = -1$, so $\{g(i), h(i)\} = \{1, -1\}$ and $g(i) + h(i) = 0$. The polynomial $g + h$ has degree less than $n$ and $n$ roots, so $g + h = 0$ and $f = -g^2$. But the leading coefficient of $-g^2$ is $-1$ and that of $f$ is $1$, a contradiction.` },
      { q: String.raw`A polynomial $P$ with integer coefficients takes the value $1$ at four different integers. Prove that $P(n) \ne -1$ for every integer $n$.`,
        solution: String.raw`$P(x) - 1 = (x - a)(x - b)(x - c)(x - d)Q(x)$ with $Q$ having integer coefficients. If $P(n) = -1$, then $(n - a)(n - b)(n - c)(n - d)Q(n) = -2$, a product of four different nonzero integers and an integer. Four different nonzero integers include at most two of $\pm1$, so the others have absolute value at least $2$, and the product has absolute value at least $1 \cdot 1 \cdot 2 \cdot 2 = 4$, too large.` },
      { q: String.raw`Use Cardano's formula to solve $t^3 - 6t - 6 = 0$.`,
        solution: String.raw`$p = -6$, $q = -6$, $D = 9 - 8 = 1$, so $t = \sqrt[3]{3 + 1} + \sqrt[3]{3 - 1} = \sqrt[3]4 + \sqrt[3]2$. Check: with $u = \sqrt[3]4$, $v = \sqrt[3]2$, $uv = 2$, $t^3 = u^3 + v^3 + 3uv\,t = 6 + 6t$.` }
    ],
    problems: []
  }
};
