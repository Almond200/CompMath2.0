// Learn, AMC Algebra, chapter L3: quadratics (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L3"] = {
  lessons: {
    "L3.1": {
      prereq: ["completing-the-square"],
      cards: [],
      body: String.raw`A quadratic expression contains a nonzero multiple of the square of its variable. That extra power changes the kinds of questions algebra can answer. A linear expression has a constant rate of change; a quadratic can turn from decreasing to increasing, take the same value at two inputs, and have a largest or smallest value. These features connect its equations, its factors and its graph.

Consider $x^2-6x+8$. Factoring gives $(x-2)(x-4)$, so the expression is zero at $2$ and $4$. Completing the square instead gives $(x-3)^2-1$, which shows that its smallest value is $-1$, attained at $x=3$. These are two descriptions of the same expression. The two zeroes lie one unit to either side of its minimum because the squared distances from $3$ are equal.

This connection guides the chapter. If a problem asks for inputs where the expression is zero, a product can expose those inputs. If it asks for a minimum, a square can expose a lower bound and when it is attained. If it asks about the pair of roots together, the coefficients can supply their sum and product without finding either root individually.

Not every quadratic has real zeroes. Adding $3$ to the example produces $(x-3)^2+2$, which is positive for every real $x$. Its graph still has a minimum and the same axis of symmetry, but it never meets the horizontal axis. The equation-solving method should explain this absence rather than merely fail to find factors.

We begin by deriving a method that solves every quadratic equation and determines how many real roots it has. We then read information about the roots directly from the coefficients, and finally use completed squares to understand extrema, symmetry and root locations. The aim is to recognize what the question needs before choosing a form.`,
      exercises: [
        { q: String.raw`Find the sum of the roots of $x^2 - 5x + 6$.`, answer: "5",
          solution: String.raw`It factors as $(x - 2)(x - 3)$, so the roots are $2$ and $3$, with sum $5$, which is $-\tfrac ba = 5$.` },
        { q: String.raw`Find the smallest value of $x^2 - 6x + 11$.`, answer: "2",
          solution: String.raw`Complete the square: $(x - 3)^2 + 2$. The square is at least $0$, so the smallest value is $2$, at the vertex $(3, 2)$.` },
        { q: String.raw`How many real roots does $2x^2 + 3x + 5$ have?`, answer: "0",
          solution: String.raw`The discriminant is $3^2 - 4 \cdot 2 \cdot 5 = -31$, which is negative, so there are no real roots.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 9",
        "2006 AMC 10A, Problem 8",
        "2005 AMC 10A, Problem 10"
      ]
    },
    "L3.2": {
      prereq: ["completing-the-square", "difference-of-squares"],
      cards: ["quadratic-formula", "quadratic-perfect-square"],
      body: String.raw`Solving a quadratic equation asks where a product or a square can take a specified value. When $x^2-5x+6$ factors as $(x-2)(x-3)$, its zeroes are immediate: a product of real numbers is zero only if at least one factor is zero. An equation such as $x^2-4x-1=0$ does not factor with integer constants, but that does not mean it has no real solutions. It means that this form has not yet exposed them.

Complete the square to obtain $(x-2)^2=5$. There are two real numbers with square $5$, one positive and one negative, so $x-2=\sqrt5$ or $x-2=-\sqrt5$. The roots are $2+\sqrt5$ and $2-\sqrt5$. They are equally far from $2$. Keeping both signs is essential; taking only the principal square root would lose one solution.

The same completion works with arbitrary coefficients. Starting from $ax^2+bx+c=0$, with $a\ne0$, multiply by $4a$ and rearrange:

$$4a^2x^2+4abx=-4ac,\qquad (2ax+b)^2=b^2-4ac.$$

The added $b^2$ completes the square on the left. If the right side is nonnegative, taking both square roots and solving the resulting linear equations gives [[quadratic-formula|the quadratic formula]]. We have derived it by reducing the problem to a square, so the expression under its radical has a clear meaning.

Write $D=b^2-4ac$, the discriminant. A positive $D$ gives two possible values of $2ax+b$, hence two distinct real roots. When $D=0$, there is just one value, and the two roots coincide; it is called a double root. A negative $D$ cannot equal the square of a real number, so there are no real roots. These conclusions determine the number of roots before any radical is evaluated.

For example, $x^2+kx+9=0$ has a double root exactly when $k^2-36=0$, so $k=6$ or $k=-6$. The corresponding polynomials are $(x+3)^2$ and $(x-3)^2$. In a graph, a double root is a contact with the horizontal axis rather than a crossing. More generally, substituting a nonvertical line into $y=ax^2+bx+c$ produces another quadratic in $x$; a double root then describes tangency of the line and parabola.

Arithmetic restrictions require a separate check. For integer coefficients, [[quadratic-perfect-square|rational roots require a square discriminant]]: the square root of an integer is rational only when that integer is a perfect square. But a square discriminant does not by itself guarantee integer roots when $a\ne1$. For $2x^2+x-1$, $D=9$, yet the roots are $(-1+3)/4=1/2$ and $(-1-3)/4=-1$. Divisibility by $2a$ still matters.

For the monic polynomial $x^2+x-n$, with positive integer $n$, a square discriminant $1+4n$ is odd. Write its square root as $2m+1$ with $m\ge0$. Then $n=m(m+1)$, and the factorization is $(x-m)(x+m+1)$. The positive $n$ up to $20$ are therefore $2,6,12,20$. Here the coefficient of $x^2$ is one and the parity matches, so the rational-root condition also gives integer roots. The next lesson uses the coefficients even when the roots themselves are unnecessary.`,
      related: [
        { card: "transforming-equations", note: String.raw`checking roots that squaring or clearing denominators may have added (L2.2).` },
        { card: "vietas-quadratic", note: String.raw`the sum and product of the roots, read from the coefficients (L3.3).` }
      ],
      exercises: [
        { q: String.raw`Find the larger root of $x^2 - 4x - 1 = 0$.`, answer: "2 + sqrt(5)",
          solution: String.raw`Complete the square: $(x - 2)^2 = 5$, so $x = 2 \pm \sqrt5$. The larger root is $2 + \sqrt5$.` },
        { q: String.raw`For which positive $k$ does $x^2 + kx + 9 = 0$ have exactly one real root?`, answer: "6",
          solution: String.raw`One root means the discriminant is $0$: $k^2 - 36 = 0$, so $k = 6$ (the root is $-3$).` },
        { q: String.raw`For how many integers $n$ from $1$ to $20$ does $x^2 + x - n$ factor into two linear factors with integer coefficients?`, answer: "4",
          solution: String.raw`The roots are integers exactly when the discriminant $1 + 4n$ is a perfect square, that is, when $n = m(m + 1)$ for a positive integer $m$. Up to $20$: $2, 6, 12, 20$, four values.` }
      ],
      problems: [
        "2002 AMC 12A, Problem 13",
        "2013 AMC 10B, Problem 19",
        "2024 AMC 10A, Problem 11",
        "2014 AMC 12B, Problem 17"
      ]
    },
    "L3.3": {
      prereq: ["quadratic-formula", "square-of-sum"],
      cards: ["vietas-quadratic", "symmetric-polynomial-strategies"],
      body: String.raw`The coefficients of a quadratic contain information about its roots as a pair. This is useful when the requested answer treats the two roots alike, because separately solving for them may introduce radicals that disappear as soon as the results are combined. Begin by asking whether the two roots need to be distinguished at all.

Let $r,s$ be the roots, counted with multiplicity. The factored form $a(x-r)(x-s)$ expands to $ax^2-a(r+s)x+ars$. Comparing it with $ax^2+bx+c$ gives [[vietas-quadratic|Vieta's formulas]]:

$$r+s=-\frac ba,\qquad rs=\frac ca.$$

The minus sign in the sum comes from the negative signs in the factors. For $2x^2-7x+3$, the sum is $7/2$ and the product is $3/2$. Neither root is zero because their product is nonzero. Thus the sum of their reciprocals is $(r+s)/(rs)=7/3$. We used exactly the information the question requests, with no need to find the two roots.

An expression is symmetric when swapping $r$ and $s$ does not change it. A useful way to simplify such an expression is to name $S=r+s$ and $P=rs$, then expand or regroup until those quantities appear. For instance, squaring $S$ counts $r^2+s^2$ plus two copies of $P$, so $r^2+s^2=S^2-2P$. Subtracting four copies of $P$ from $S^2$ instead gives $(r-s)^2$. These identities follow from the expansion, rather than being separate rules that must be memorized without explanation.

The same reasoning handles higher powers. Expanding $S^3$ produces $r^3+s^3+3rs(r+s)$, so $r^3+s^3=S^3-3PS$. For the roots of $x^2-3x-5$, $S=3$ and $P=-5$; therefore $r^2+s^2=9+10=19$. The negative product also tells us that the two real roots have opposite signs. A sign check can reveal a mistaken substitution before it propagates through a longer calculation.

[[symmetric-polynomial-strategies|Rewriting in the sum and product]] extends to every symmetric polynomial in two variables. Rational expressions can often be handled in the same way, provided we keep any nonzero-denominator restrictions. Symmetry is a reason to look for this representation, not permission to ignore the domain or assume that every expression is a polynomial.

The construction also works backward. If two numbers have sum $S$ and product $P$, then both satisfy $t^2-St+P=0$. Thus $x+y=6$ and $xy=7$ describe the roots of $t^2-6t+7$; in particular $(x-y)^2=36-28=8$. If real numbers are required, the discriminant $S^2-4P$ must be nonnegative. This shows, for example, that real numbers with sum $6$ cannot have product greater than $9$.

Extra conditions on the roots can be combined with their sum and product. If the roots of $x^2-63x+k$ are positive primes, they add to the odd number $63$. Two odd primes would have even sum, so one root must be $2$ and the other $61$, giving $k=122$. The information about primes supplies what the coefficients alone leave open. The next lesson connects the same midpoint and separation of roots to the quadratic's graph.`,
      related: [
        { card: "vietas-general", note: String.raw`the same formulas for polynomials of any degree (L10.2).` },
        { card: "root-transformations", note: String.raw`writing a quadratic whose roots are changed, such as doubled or inverted (L10.3).` }
      ],
      exercises: [
        { q: String.raw`The roots of $2x^2 - 7x + 3$ are $r$ and $s$. Find $\tfrac1r + \tfrac1s$.`, answer: "7/3",
          solution: String.raw`By Vieta, $r + s = \tfrac72$ and $rs = \tfrac32$, so $\tfrac1r + \tfrac1s = \tfrac{r + s}{rs} = \tfrac73$.` },
        { q: String.raw`The roots of $x^2 - 3x - 5$ are $r$ and $s$. Find $r^2 + s^2$.`, answer: "19",
          solution: String.raw`By Vieta, $r + s = 3$ and $rs = -5$, so $r^2 + s^2 = (r + s)^2 - 2rs = 9 + 10 = 19$.` },
        { q: String.raw`If $x + y = 6$ and $xy = 7$, find $(x - y)^2$.`, answer: "8",
          solution: String.raw`Use $(x - y)^2 = (x + y)^2 - 4xy = 36 - 28 = 8$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 10",
        "2003 AMC 10A, Problem 5",
        "2006 AMC 10B, Problem 14",
        "2002 AMC 10A, Problem 14",
        "2005 AMC 10B, Problem 16"
      ]
    },
    "L3.4": {
      prereq: ["completing-the-square", "quadratic-formula"],
      cards: ["vertex-form", "quadratic-forms", "quadratic-root-location"],
      body: String.raw`Completing the square separates a quadratic into a constant and a squared distance from a particular input. For $-2x^2+8x+1$, factor the leading coefficient from the first two terms, then complete the square inside:

$$-2x^2+8x+1=-2\big((x-2)^2-4\big)+1=-2(x-2)^2+9.$$

Because $(x-2)^2\ge0$, multiplying it by $-2$ makes the contribution nonpositive. The largest possible value is therefore $9$, attained at $x=2$. This identifies both the bound and an input reaching it. If the input is restricted, that final input must be allowed before we can call the bound a maximum.

In general, [[vertex-form|vertex form]] is $a(x-h)^2+k$. The point $(h,k)$ is the vertex. Inputs $h-d$ and $h+d$ give the same value because their differences from $h$ have equal squares, which explains the vertical axis of symmetry $x=h$. For $a\gt0$, $k$ is a minimum; for $a\lt0$, it is a maximum. The coefficient $a$ also controls how rapidly the value moves away from $k$ as the distance from $h$ increases.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 280" role="img" aria-labelledby="l34-parabola-title l34-parabola-desc" style="width:100%;max-width:480px;height:auto"><title id="l34-parabola-title">Vertex, roots and symmetry of a quadratic</title><desc id="l34-parabola-desc">The graph of y equals the square of x minus three, minus one. It has vertex three, minus one, roots two and four, and symmetry axis x equals three. It lies below the horizontal axis between its two roots.</desc><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M60 215H430M60 260V42"/><path d="M240 42V245" stroke-dasharray="5 5" opacity="0.5"/><path d="M93.000 64.925 L95.940 72.056 L98.880 79.043 L101.820 85.886 L104.760 92.585 L107.700 99.139 L110.640 105.550 L113.580 111.817 L116.520 117.939 L119.460 123.918 L122.400 129.752 L125.340 135.442 L128.280 140.989 L131.220 146.391 L134.160 151.649 L137.100 156.763 L140.040 161.733 L142.980 166.559 L145.920 171.241 L148.860 175.779 L151.800 180.173 L154.740 184.423 L157.680 188.528 L160.620 192.490 L163.560 196.308 L166.500 199.981 L169.440 203.511 L172.380 206.896 L175.320 210.137 L178.260 213.235 L181.200 216.188 L184.140 218.997 L187.080 221.662 L190.020 224.183 L192.960 226.560 L195.900 228.793 L198.840 230.882 L201.780 232.827 L204.720 234.628 L207.660 236.284 L210.600 237.797 L213.540 239.166 L216.480 240.390 L219.420 241.471 L222.360 242.407 L225.300 243.199 L228.240 243.848 L231.180 244.352 L234.120 244.712 L237.060 244.928 L240.000 245.000 L242.940 244.928 L245.880 244.712 L248.820 244.352 L251.760 243.848 L254.700 243.199 L257.640 242.407 L260.580 241.471 L263.520 240.390 L266.460 239.166 L269.400 237.797 L272.340 236.284 L275.280 234.628 L278.220 232.827 L281.160 230.882 L284.100 228.793 L287.040 226.560 L289.980 224.183 L292.920 221.662 L295.860 218.997 L298.800 216.188 L301.740 213.235 L304.680 210.137 L307.620 206.896 L310.560 203.511 L313.500 199.981 L316.440 196.308 L319.380 192.490 L322.320 188.528 L325.260 184.423 L328.200 180.173 L331.140 175.779 L334.080 171.241 L337.020 166.559 L339.960 161.733 L342.900 156.763 L345.840 151.649 L348.780 146.391 L351.720 140.989 L354.660 135.442 L357.600 129.752 L360.540 123.918 L363.480 117.939 L366.420 111.817 L369.360 105.550 L372.300 99.139 L375.240 92.585 L378.180 85.886 L381.120 79.043 L384.060 72.056 L387.000 64.925" stroke-width="2.5"/><path d="M180 211V219M300 211V219M56 185H64M56 245H64"/></g><g fill="currentColor"><circle cx="180" cy="215" r="4"/><circle cx="300" cy="215" r="4"/><circle cx="240" cy="245" r="4"/><g font-size="15" text-anchor="middle"><text x="245" y="23">y = (x − 3)² − 1</text><text x="180" y="237">2</text><text x="300" y="237">4</text><text x="290" y="268">(3, −1)</text><text x="42" y="190">1</text><text x="38" y="250">−1</text><text x="440" y="220">x</text><text x="60" y="31">y</text></g></g></svg>

The graph shown is $y=(x-3)^2-1$. Its vertex is $(3,-1)$, and its zeroes at $2$ and $4$ are symmetric about $3$. Between the zeroes the squared distance from $3$ is less than $1$, so the value is negative; outside them the squared distance is greater than $1$, so the value is positive. The picture follows from the squared-distance calculation rather than replacing it.

A restricted interval can change the extreme. For $-2(x-2)^2+9$ on $3\le x\le5$, the vertex input $2$ is unavailable. The smallest squared distance from $2$ occurs at $x=3$, so the maximum on this interval is $7$, not $9$. Likewise, if two distinct inputs give the same height on a parabola, their midpoint is the vertex input; equal values at $2$ and $4$ place the axis at $3$.

Completing squares also helps with [[quadratic-forms|quadratic expressions in two variables]]. The expression $x^2+4x+y^2-6y+20$ becomes $(x+2)^2+(y-3)^2+7$, with minimum $7$ at $(-2,3)$. A mixed term needs more care: $x^2+xy+y^2=(x+y/2)^2+3y^2/4$, which is nonnegative and zero only at $(0,0)$. We must examine the signs of all terms left after completing a square; $x^2-y^2$, for instance, has no minimum over the whole real plane.

For [[quadratic-root-location|root locations]], combine information rather than relying on a sketch. To make $x^2-mx+m+3=0$ have two distinct positive roots, first require a positive discriminant, $(m-6)(m+2)>0$. For real roots, a positive product $m+3$ then means the two roots have the same sign, and a positive sum $m$ selects the positive sign. The three requirements together give $m>6$. If $m$ is an integer, the smallest possibility is $7$, giving roots $2,5$.

A sign change across an interval is another useful test. A polynomial varies continuously, so opposite signs at two endpoints guarantee a zero between them. Equal signs do not settle the question: there may be no zero, two crossings, or a double root that touches without crossing. For example, $(x-3)^2$ is positive at $2$ and $4$ but zero at $3$. Keep distinct roots separate from repeated ones, and use a completed square, the discriminant and the endpoint values together when a parameter changes the graph.`,
      related: [
        { card: "trivial-inequality", note: String.raw`a square is never negative, which is why the vertex is the extreme (L8.2).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions by where graphs cross (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the largest value of $-2x^2 + 8x + 1$.`, answer: "9",
          solution: String.raw`Complete the square: $-2(x^2 - 4x) + 1 = -2(x - 2)^2 + 8 + 1 = -2(x - 2)^2 + 9$. The largest value is $9$, at $x = 2$.` },
        { q: String.raw`A ball's height after $t$ seconds is $-16t^2 + 64t$ feet. What is its greatest height?`, answer: "64",
          solution: String.raw`The vertex is at $t = -\tfrac{64}{2(-16)} = 2$, where the height is $-64 + 128 = 64$ feet.` },
        { q: String.raw`What is the smallest integer $m$ for which $x^2 - mx + m + 3 = 0$ has two different positive roots?`, answer: "7",
          solution: String.raw`Two real roots need $m^2 - 4(m + 3) = (m - 6)(m + 2) \gt 0$. Both positive needs the sum $m \gt 0$ and the product $m + 3 \gt 0$. Together $m \gt 6$, so the smallest integer is $7$ (the roots of $x^2 - 7x + 10$ are $2$ and $5$).` }
      ],
      problems: [
        "2005 AMC 12B, Problem 8",
        "2006 AMC 12B, Problem 12",
        "2021 Fall AMC 10A, Problem 25",
        "2020 AMC 12B, Problem 22"
      ]
    },
    "L3.5": {
      prereq: ["quadratic-formula", "quadratic-perfect-square", "vietas-quadratic", "symmetric-polynomial-strategies", "vertex-form", "quadratic-forms", "quadratic-root-location"],
      cards: [],
      body: String.raw`A quadratic has several useful representations. A factored form exposes zeroes, a completed square exposes symmetry and an extreme value, and the coefficient form exposes the roots' sum and product through [[vietas-quadratic|Vieta's formulas]]. These are different views of one expression. Choose the view according to what the problem asks you to determine.

Completing the square derives [[quadratic-formula|the quadratic formula]] and explains the discriminant. A positive discriminant gives two distinct real roots, zero gives a double root, and a negative discriminant gives no real roots. With integer coefficients, [[quadratic-perfect-square|a square discriminant]] characterizes rational roots; integer roots additionally require the divisions in the formula to produce integers.

A question treating the roots as an unordered pair often calls for [[symmetric-polynomial-strategies|their sum and product]]. Rewriting first can avoid finding either root, and it keeps domain restrictions such as nonzero roots visible when reciprocals occur. The reverse construction, $t^2-St+P$, also turns a known sum and product into an equation for the numbers.

In [[vertex-form|vertex form]], an extreme value is justified by the sign of a square and by an allowed input attaining equality. For [[quadratic-forms|two-variable quadratics]], inspect the remaining terms after completion before asserting a bound. To determine [[quadratic-root-location|where roots lie]], first establish their reality, then combine their sum and product with symmetry and signs. A double root need not change the sign of the polynomial. The review problems ask you to decide which information is needed before calculating it.`,
      strategies: [
        String.raw`Try to factor first: two numbers with the right sum and product.`,
        String.raw`If only the number or kind of roots is asked, compute the discriminant.`,
        String.raw`With integer coefficients, a square discriminant gives rational roots; check divisibility in the formula for integer roots.`,
        String.raw`For any symmetric expression in the roots, write it in their sum and product.`,
        String.raw`For a largest or smallest value, complete the square to find the vertex.`,
        String.raw`Use symmetry: equal heights at two points put the axis halfway between them.`,
        String.raw`For roots in a range, check the discriminant, the sum and product, and the signs at the ends.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the positive solution of $x^2 = 3x + 10$.`, answer: "5",
        solution: String.raw`Rearrange: $x^2 - 3x - 10 = (x - 5)(x + 2) = 0$, so $x = 5$ or $x = -2$. The positive solution is $5$.` },
      { q: String.raw`The two roots of a quadratic add to $10$ and differ by $2$. Find their product.`, answer: "24",
        solution: String.raw`The roots are $6$ and $4$, with product $24$. With Vieta-style identities: $(r - s)^2 = (r + s)^2 - 4rs$, so $4 = 100 - 4rs$ and $rs = 24$.` },
      { q: String.raw`For how many integers $b$ does $x^2 + bx + 12$ have two integer roots?`, answer: "6",
        solution: String.raw`The roots are integers with product $12$ and sum $-b$. The pairs $\pm(1, 12)$, $\pm(2, 6)$, $\pm(3, 4)$ give $b = \mp 13, \mp 8, \mp 7$: six values.` },
      { q: String.raw`Find the smallest value of $x^2 + 4x + y^2 - 6y + 20$.`, answer: "7",
        solution: String.raw`Complete the squares: $(x + 2)^2 + (y - 3)^2 + 7$. The smallest value is $7$, at $(-2, 3)$.` },
      { q: String.raw`The roots of $x^2 - 7x + 2$ are $r$ and $s$. Find $r^3 + s^3$.`, answer: "301",
        solution: String.raw`With $r + s = 7$ and $rs = 2$: $r^3 + s^3 = (r + s)^3 - 3rs(r + s) = 343 - 42 = 301$.` },
      { q: String.raw`One root of $x^2 - 10x + c$ is four times the other. Find $c$.`, answer: "16",
        solution: String.raw`With roots $r$ and $4r$: $5r = 10$, so $r = 2$, and $c = r \cdot 4r = 16$.` },
      { q: String.raw`For how many integers $x$ is $x^2 - 8x + 12 \lt 0$?`, answer: "3",
        solution: String.raw`The quadratic factors as $(x - 2)(x - 6)$ and is negative between its roots, for $2 \lt x \lt 6$. The integers are $3, 4, 5$.` }
    ],
    problems: [
      "2003 AMC 10A, Problem 18",
      "2023 AMC 10A, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2013 AMC 12B, Problem 17",
      "2025 AMC 10A, Problem 18",
      "2009 AMC 12A, Problem 23",
      "2010 AMC 12B, Problem 23"
    ]
  }
};
