// Learn, AMC Algebra, chapter L2: quadratics, functions and extremes (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L2"] = {
  lessons: {
    "L2.1": {
      prereq: ["completing-the-square"],
      cards: ["quadratic-formula", "vietas-quadratic", "vertex-form", "quadratic-forms", "quadratic-perfect-square"],
      body: String.raw`Quadratics are the most common equations on the AMC. Most questions about them need one of three facts: the quadratic formula and its discriminant, Vieta's formulas for the sum and product of the roots, or the vertex where the parabola turns. Knowing which to use saves the work of solving.

The [[quadratic-formula|quadratic formula]] gives the roots of $ax^2 + bx + c = 0$ as $\tfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. The discriminant $b^2 - 4ac$ counts the real roots: two if positive, one double root if zero, none if negative. So $x^2 + kx + 16$ has a double root exactly when $k^2 = 64$, and the positive choice is $k = 8$. [[vietas-quadratic|Vieta's formulas]] say the roots add to $-\tfrac ba$ and multiply to $\tfrac ca$; for $2x^2 - 7x + 3$ the roots have sum $\tfrac72$ and product $\tfrac32$, so $\tfrac1r + \tfrac1s = \tfrac{r + s}{rs} = \tfrac73$ without solving.

The [[vertex-form|vertex]] of $y = ax^2 + bx + c$ is at $x = -\tfrac{b}{2a}$, where the value is largest if $a \lt 0$ and smallest if $a \gt 0$: $-x^2 + 6x + 1$ is largest at $x = 3$, with value $10$. The three [[quadratic-forms|forms of a quadratic]] each show something: standard form shows the $y$-intercept, vertex form $a(x - h)^2 + k$ shows the vertex, and factored form $a(x - r)(x - s)$ shows the roots. Points with equal $y$-values are symmetric about the axis $x = h$.

A [[quadratic-perfect-square|quadratic that must be a perfect square]] is a common integer condition: $n^2 + 6n + k$ is a square for all $n$ only when $k = 9$, and $n^2 + n + 41$ is a square only for special $n$, found by squeezing it between consecutive squares. The discriminant of a quadratic with integer coefficients must be a perfect square for its roots to be rational.

Use Vieta for sums and products, the discriminant for how many roots, and the vertex for extremes. The next lesson studies functions.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`writing any symmetric expression of the roots through their sum and product (L1.2).` },
        { card: "vietas-general", note: String.raw`Vieta for polynomials of any degree (L5.1).` },
        { card: "quadratic-root-location", note: String.raw`where the roots lie without solving (L5.2).` }
      ],
      exercises: [
        { q: String.raw`The roots of $2x^2 - 7x + 3 = 0$ are $r$ and $s$. Find $\tfrac1r + \tfrac1s$.`, answer: "7/3",
          solution: String.raw`By Vieta $r + s = \tfrac72$ and $rs = \tfrac32$, so $\tfrac1r + \tfrac1s = \tfrac{r + s}{rs} = \tfrac{7/2}{3/2} = \tfrac73$.` },
        { q: String.raw`Find the largest value of $-x^2 + 6x + 1$.`, answer: "10",
          solution: String.raw`The vertex is at $x = 3$, where the value is $-9 + 18 + 1 = 10$. Equivalently, $-x^2 + 6x + 1 = 10 - (x - 3)^2$.` },
        { q: String.raw`For what positive $k$ does $x^2 + kx + 16 = 0$ have exactly one real solution?`, answer: "8",
          solution: String.raw`One solution means the discriminant is zero: $k^2 - 64 = 0$, so $k = 8$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 5",
        "2005 AMC 10A, Problem 10",
        "2006 AMC 10B, Problem 14",
        "2025 AMC 10A, Problem 18",
        "2013 AMC 10B, Problem 19",
        "2000 AMC 12, Problem 15",
        "2015 AMC 12A, Problem 18",
        "2013 AMC 12B, Problem 22"
      ]
    },
    "L2.2": {
      prereq: [],
      cards: ["inverse-function-properties", "odd-even-functions", "defined-operation"],
      body: String.raw`AMC problems about functions test whether you can work with a rule as a rule: compose it, undo it, use its symmetry, or follow a made-up operation exactly as defined. None needs advanced theory, only care.

A function's [[inverse-function-properties|inverse]] undoes it: $f^{-1}(b)$ is the $a$ with $f(a) = b$. So for $f(x) = 3x - 5$, $f^{-1}(7)$ solves $3a - 5 = 7$, giving $4$; there is no need to find a formula for $f^{-1}$. Composition applies functions in order, inside first: with $f(x) = x^2 - 1$, $f(f(2)) = f(3) = 8$. The graph of $f^{-1}$ is the graph of $f$ reflected in the line $y = x$.

[[odd-even-functions|Odd and even functions]] satisfy $f(-x) = -f(x)$ and $f(-x) = f(x)$. A polynomial is odd when only odd powers appear, and even when only even powers appear. This turns a value at $x$ into a value at $-x$: if $g(x) = x^3 + ax + 7$ and $g(2) = 15$, then $g(x) - 7$ is odd, so $g(-2) - 7 = -(g(2) - 7) = -8$ and $g(-2) = -1$, without finding $a$.

A [[defined-operation|defined operation]] is a rule like $a * b = 2a + b^2$ given in the problem. Apply it literally, with the innermost operation first: $(1 * 2) * 3 = 6 * 3 = 12 + 9 = 21$. Questions ask whether such an operation is commutative or associative; test with small numbers, since one failing example settles it.

Undo by solving, use symmetry to move between $x$ and $-x$, and follow defined rules exactly. The next lesson reads graphs.`,
      related: [
        { card: "fx-pairing", note: String.raw`pairing $f(x)$ with $f(c - x)$ to sum many values (L4.2).` },
        { card: "functional-substitution", note: String.raw`solving equations whose unknown is a function (L4.2).` },
        { card: "disproof-by-counterexample", note: String.raw`one example shows an operation is not commutative (L3.6).` }
      ],
      exercises: [
        { q: String.raw`For $f(x) = 3x - 5$, find $f^{-1}(7)$.`, answer: "4",
          solution: String.raw`$f^{-1}(7)$ is the $a$ with $3a - 5 = 7$, so $a = 4$.` },
        { q: String.raw`The function $g(x) = x^3 + ax + 7$ has $g(2) = 15$. Find $g(-2)$.`, answer: "-1",
          solution: String.raw`$g(x) - 7 = x^3 + ax$ is odd, so $g(-2) - 7 = -(g(2) - 7) = -8$ and $g(-2) = -1$.` },
        { q: String.raw`Define $a * b = 2a + b^2$. Find $(1 * 2) * 3$.`, answer: "21",
          solution: String.raw`$1 * 2 = 2 + 4 = 6$, and $6 * 3 = 12 + 9 = 21$.` }
      ],
      problems: [
        "2022 AMC 10B, Problem 1",
        "2005 AMC 10A, Problem 2",
        "2016 AMC 10B, Problem 2",
        "2010 AMC 10B, Problem 4",
        "2015 AMC 10B, Problem 7",
        "2003 AMC 12A, Problem 6",
        "2013 AMC 10B, Problem 14",
        "2014 AMC 12B, Problem 16"
      ]
    },
    "L2.3": {
      prereq: ["abs-value-graphing", "line-forms"],
      cards: ["piecewise-graph-counting", "reading-graphs", "slope-to-a-point"],
      body: String.raw`A picture of the graphs often answers a question about equations faster than algebra. How many solutions does $|x| = x^2 - 2$ have? How many times do two piecewise graphs cross? What is the largest value of $\tfrac yx$ on a circle? Sketch, then count or measure.

[[piecewise-graph-counting|Counting solutions by graphing]] draws both sides of an equation and counts the crossings. For $|x| = x^2 - 2$, the V of $|x|$ and the parabola $x^2 - 2$ cross where $|x| = 2$, at $x = \pm2$: two solutions. With absolute values, floors or other piecewise graphs, draw each piece on its interval and count piece by piece; a periodic graph against a slowly rising line is counted period by period until the line leaves the range.

[[reading-graphs|Reading a graph]] given in a problem means extracting exact information: intercepts, slopes, where a graph is above another, or the values of $f$ at given points. Problems that give $f$ only as a picture expect you to read values like $f(2) = 3$ and compose them.

A ratio of differences is a slope: $\tfrac{y - b}{x - a}$ is the slope from $(a, b)$ to $(x, y)$, so [[slope-to-a-point|its extreme values over a curve]] are the slopes of tangent lines from $(a, b)$. For $(x, y)$ on the circle $(x - 4)^2 + y^2 = 4$, the largest value of $\tfrac yx$ is the slope of the tangent from the origin: the right triangle with hypotenuse $4$ and leg $2$ makes an angle of $30^\circ$, so the largest value is $\tfrac{1}{\sqrt3} = \tfrac{\sqrt3}{3}$.

Draw first, count crossings, and read ratios as slopes. The next lesson treats exponents and logarithms.`,
      related: [
        { card: "abs-value-graphing", note: String.raw`drawing the pieces of absolute value graphs (L1.4).` },
        { card: "tangent-lines-from-point", note: String.raw`the tangent lines that give extreme slopes (S2.2).` },
        { card: "vertex-form", note: String.raw`the turning point of a parabola in a graph (L2.1).` }
      ],
      exercises: [
        { q: String.raw`How many real solutions does $|x| = x^2 - 2$ have?`, answer: "2",
          solution: String.raw`Writing $t = |x| \ge 0$, the equation is $t = t^2 - 2$, so $t = 2$ (the root $t = -1$ is negative). Then $x = \pm2$: two solutions.` },
        { q: String.raw`The point $(x, y)$ is on the circle $(x - 4)^2 + y^2 = 4$. Find the largest value of $\tfrac yx$.`, answer: "sqrt(3)/3",
          solution: String.raw`$\tfrac yx$ is the slope from the origin. The steepest line meeting the circle is tangent to it: the center is $4$ away and the radius is $2$, so the tangent makes an angle $\theta$ with $\sin\theta = \tfrac24$, $\theta = 30^\circ$. The largest slope is $\tan 30^\circ = \tfrac{\sqrt3}{3}$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 12",
        "2020 AMC 12A, Problem 9",
        "2021 Spring AMC 12B, Problem 13",
        "2002 AMC 12A, Problem 19",
        "2025 AMC 12B, Problem 24",
        "2012 AMC 12A, Problem 25"
      ]
    },
    "L2.4": {
      prereq: [],
      cards: ["log-rules", "change-of-base"],
      body: String.raw`Exponents and logarithms appear on the AMC 10 mostly as arithmetic: simplify $\log_2 8 + \log_3 27$, solve $\log_4 x = \tfrac32$, or compare powers like $2^{30}$ and $3^{20}$. On the AMC 12 they become equations, but the rules are the same.

The laws of exponents, $a^ma^n = a^{m + n}$, $(a^m)^n = a^{mn}$ and $a^{-n} = \tfrac{1}{a^n}$, simplify powers; writing every base as a power of one prime is the standard first step, so $4^x \cdot 8 = 2^{2x + 3}$. Comparing powers is easiest with a common exponent: $2^{30} = 8^{10}$ and $3^{20} = 9^{10}$, so $3^{20}$ is larger.

A logarithm is an exponent: $\log_b x = y$ means $b^y = x$. The [[log-rules|logarithm rules]] mirror the exponent laws: $\log(xy) = \log x + \log y$, $\log\tfrac xy = \log x - \log y$, and $\log x^n = n\log x$. So $\log_2 8 + \log_3 27 = 3 + 3 = 6$, and $\log_4 x = \tfrac32$ means $x = 4^{3/2} = 8$. Logarithms are defined only for positive arguments and positive bases other than $1$.

The [[change-of-base|change of base]] formula $\log_a b = \tfrac{\log b}{\log a}$ (in any common base) converts between bases and gives the chain rule $\log_a b \cdot \log_b c = \log_a c$: $\log_2 3 \cdot \log_3 16 = \log_2 16 = 4$. In particular $\log_a b = \tfrac{1}{\log_b a}$.

Write bases as powers of a prime, and treat logarithms as exponents. The last lesson of the chapter finds largest and smallest values.`,
      related: [
        { card: "take-logs-linearize", note: String.raw`taking logarithms to solve exponential equations (L4.1).` },
        { card: "log-substitution", note: String.raw`naming a logarithm to get a polynomial equation (L4.1).` },
        { card: "digit-count", note: String.raw`the number of digits of $n$ is $\lfloor\log_{10} n\rfloor + 1$ (M1.4).` }
      ],
      exercises: [
        { q: String.raw`Find $x$ if $\log_4 x = \tfrac32$.`, answer: "8",
          solution: String.raw`$x = 4^{3/2} = (4^{1/2})^3 = 2^3 = 8$.` },
        { q: String.raw`Find $\log_2 3 \cdot \log_3 16$.`, answer: "4",
          solution: String.raw`By change of base, $\tfrac{\log 3}{\log 2} \cdot \tfrac{\log 16}{\log 3} = \tfrac{\log 16}{\log 2} = \log_2 16 = 4$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 6",
        "2024 AMC 12B, Problem 8",
        "2022 AMC 12A, Problem 11",
        "2013 AMC 12A, Problem 14",
        "2009 AMC 12B, Problem 15",
        "2003 AMC 12B, Problem 17",
        "2005 AMC 12A, Problem 21",
        "2007 AMC 12A, Problem 23"
      ]
    },
    "L2.5": {
      prereq: ["completing-the-square"],
      cards: ["trivial-inequality", "am-gm", "max-product-fixed-sum", "sos-identity", "abs-triangle-inequality", "median-minimizes-abs", "placing-digits-extremes"],
      body: String.raw`"Find the largest possible value" and "find the smallest possible value" are among the most common AMC instructions. The answer always has two parts: a bound that the expression cannot pass, and an example that reaches it. A few tools supply the bounds.

The [[trivial-inequality|trivial inequality]] $x^2 \ge 0$ is the root of them all: completing the square shows $x^2 - 8x + 21 \ge 5$, and $(a - b)^2 \ge 0$ gives $a^2 + b^2 \ge 2ab$. In three variables, the [[sos-identity|sum-of-squares identity]] $a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12[(a - b)^2 + (b - c)^2 + (c - a)^2]$ shows the left side is never negative and is zero only when $a = b = c$.

The [[am-gm|AM-GM inequality]] says the average of positive numbers is at least their geometric mean: $\tfrac{a + b}{2} \ge \sqrt{ab}$. If the product of two terms is fixed, their sum is smallest when they are equal: $x + \tfrac9x \ge 2\sqrt9 = 6$ for $x \gt 0$, with equality at $x = 3$. If the sum is fixed, the product is largest when they are equal; for whole numbers the [[max-product-fixed-sum|largest product with a fixed sum]] uses as many $3$'s as possible, so $10 = 3 + 3 + 2 + 2$ gives $36$.

A sum of distances $|x - a_1| + \cdots + |x - a_n|$ is [[median-minimizes-abs|smallest at the median]] of the points: for $|x - 1| + |x - 5| + |x - 6|$ the minimum is at $x = 5$, value $5$. The [[abs-triangle-inequality|triangle inequality for absolute values]], $|a + b| \le |a| + |b|$, bounds sums of absolute values below. When an expression is built from given digits, [[placing-digits-extremes|put the largest digits in the most valuable places]]: the leading digit counts most, a subtracted term should be small, and a fraction is largest with a large numerator and small denominator.

Always find the example that attains the bound. The next chapter turns to polynomials and sequences.`,
      related: [
        { card: "vertex-form", note: String.raw`the extreme value of a quadratic (L2.1).` },
        { card: "mean-chain", note: String.raw`the full chain of means, for the AMC 12 (L6.3).` },
        { card: "cauchy-schwarz", note: String.raw`bounds for sums of products (L6.3).` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $x + \tfrac9x$ for $x \gt 0$.`, answer: "6",
          solution: String.raw`By AM-GM, $x + \tfrac9x \ge 2\sqrt{x \cdot \tfrac9x} = 6$, with equality at $x = 3$.` },
        { q: String.raw`Positive integers add to $10$. Find the largest possible product.`, answer: "36",
          solution: String.raw`Use $3$'s and $2$'s: $10 = 3 + 3 + 2 + 2$, product $36$. (Three $3$'s and a $1$ give only $27$, and $3 + 3 + 4$ gives the same $36$.)` },
        { q: String.raw`Find the smallest value of $|x - 1| + |x - 5| + |x - 6|$.`, answer: "5",
          solution: String.raw`A sum of distances is smallest at the median, $x = 5$: $4 + 0 + 1 = 5$.` }
      ],
      problems: [
        "2006 AMC 10A, Problem 4",
        "2013 AMC 10B, Problem 5",
        "2004 AMC 10A, Problem 15",
        "2016 AMC 10B, Problem 16",
        "2000 AMC 12, Problem 12",
        "2000 AMC 10, Problem 20",
        "2016 AMC 12B, Problem 15",
        "2010 AMC 12A, Problem 22"
      ]
    }
  }
};
