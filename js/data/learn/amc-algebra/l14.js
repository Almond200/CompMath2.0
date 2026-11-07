// Learn, AMC Algebra, chapter L14: from the AMC to the AIME, algebra (CONVENTIONS §14). Part: Toward the AIME.
// No new cards: the habits the AIME asks for, on harder mixed problems. Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L14"] = {
  lessons: {
    "L14.1": {
      prereq: ["transforming-equations", "quadratic-root-location"],
      cards: [],
      body: String.raw`A harder algebra problem often determines a requested quantity more directly than it determines all the individual unknowns. Before calculating, identify that target and the constraints on the variables. These determine which transformations will preserve the information needed for the answer.

Consider $x-5\sqrt x+6=0$. The original domain is $x\ge0$, and the repeated expression $\sqrt x$ suggests setting $y=\sqrt x$. This gives $y^2-5y+6=0$ with the additional condition $y\ge0$. Its roots $2,3$ are both allowed, and returning through $x=y^2$ gives $x=4,9$. If the question asks for their sum, the requested quantity is $13$, rather than either root separately.

The same separation of variable and target matters when the answer is encoded in a specified form. A rational quantity may be requested as $m+n$ for its reduced form $m/n$. For $12/18=2/3$, the target is therefore $5$. A radical expression or a large integer remainder requires its own final conversion.

In the AIME, that final requested quantity is an integer from $0$ to $999$. Intermediate quantities, roots, or lengths can lie outside this range. The range is a check on the submitted result, not an extra constraint on every unknown in the problem.

This chapter brings together substitutions, root information, exact arithmetic, and mixed problems. A complete solution follows each candidate back to the original conditions and then computes the specified target. The worked examples develop those two stages separately so that restrictions on a substitute variable are carried through to the final calculation.`,
      exercises: [
        { q: String.raw`Find the sum of the solutions of $x - 5\sqrt x + 6 = 0$.`, answer: "13",
          solution: String.raw`With $y = \sqrt x \ge 0$: $y^2 - 5y + 6 = 0$, so $y = 2$ or $3$, both allowed, and $x = 4$ or $9$. The sum is $13$.` },
        { q: String.raw`An answer is the fraction $\tfrac{12}{18}$, and the problem asks for $m + n$ where $\tfrac mn$ is in lowest terms. What should be entered?`, answer: "5",
          solution: String.raw`Reduce first: $\tfrac{12}{18} = \tfrac23$, so $m + n = 5$.` },
        { q: String.raw`Solve $\log_2(x - 1) + \log_2(x + 1) = 3$.`, answer: "3",
          solution: String.raw`The separate logarithms require $x\gt1$. On this domain, combining gives $\log_2(x^2-1)=3$, so $x^2=9$ and the algebraic candidates are $\pm3$. Only $x=3$ is in the original domain; its logarithms are $1$ and $2$, which add to $3$.` }
      ],
      problems: [
        "1986 AIME, Problem 1",
        "1986 AIME, Problem 5",
        "1983 AIME, Problem 1"
      ]
    },
    "L14.2": {
      prereq: ["transforming-equations", "quadratic-root-location", "vietas-quadratic"],
      cards: [],
      body: String.raw`A substitution replaces an expression by a new variable, so it must also record which values that expression can take. For $y=\sqrt x$, the original input satisfies $x\ge0$ and the new variable satisfies $y\ge0$. For $t=2^x$ with real $x$, the range is $t\gt0$. Solving an equation in the new variable is only the first stage; each allowed value must then be traced back to the original inputs.

Range restrictions can change an optimum even when the transformed expression is simple. For positive $x$, let $t=x+1/x$. The square $(x-1)^2\ge0$, divided by $x\gt0$, gives $t\ge2$. Conversely, every $t\ge2$ is attained: the equation $x^2-tx+1=0$ has real positive roots, since its discriminant is nonnegative and its roots have positive sum and product. Thus $[2,\infty)$ is exactly the range.

Now rewrite

$$x^2+\frac1{x^2}-3\left(x+\frac1x\right)=t^2-3t-2.$$

Its unrestricted quadratic vertex is at $t=3/2$, outside the allowed range. To find the attainable bound, compare with the value at $t=2$:

$$t^2-3t-2+4=(t-1)(t-2)\ge0\qquad(t\ge2).$$

Equality requires $t=2$, which corresponds to $x=1$. The minimum is therefore $-4$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 355" role="img" aria-labelledby="l142-range-title l142-range-desc" style="width:100%;max-width:520px;height:auto"><title id="l142-range-title">A substitution excludes the unconstrained quadratic vertex</title><desc id="l142-range-desc">The parabola t squared minus three t minus two has a vertex at three halves, minus seventeen fourths. That dashed part is excluded by t at least two. The allowed solid branch has minimum minus four at t equal to two.</desc><g fill="none" stroke="currentColor"><path d="M55 52V310M45 70H385" opacity="0.45"/><path d="M55.000,170.000L57.000,173.719L59.000,177.375L61.000,180.969L63.000,184.500L65.000,187.969L67.000,191.375L69.000,194.719L71.000,198.000L73.000,201.219L75.000,204.375L77.000,207.469L79.000,210.500L81.000,213.469L83.000,216.375L85.000,219.219L87.000,222.000L89.000,224.719L91.000,227.375L93.000,229.969L95.000,232.500L97.000,234.969L99.000,237.375L101.000,239.719L103.000,242.000L105.000,244.219L107.000,246.375L109.000,248.469L111.000,250.500L113.000,252.469L115.000,254.375L117.000,256.219L119.000,258.000L121.000,259.719L123.000,261.375L125.000,262.969L127.000,264.500L129.000,265.969L131.000,267.375L133.000,268.719L135.000,270.000L137.000,271.219L139.000,272.375L141.000,273.469L143.000,274.500L145.000,275.469L147.000,276.375L149.000,277.219L151.000,278.000L153.000,278.719L155.000,279.375L157.000,279.969L159.000,280.500L161.000,280.969L163.000,281.375L165.000,281.719L167.000,282.000L169.000,282.219L171.000,282.375L173.000,282.469L175.000,282.500L177.000,282.469L179.000,282.375L181.000,282.219L183.000,282.000L185.000,281.719L187.000,281.375L189.000,280.969L191.000,280.500L193.000,279.969L195.000,279.375L197.000,278.719L199.000,278.000L201.000,277.219L203.000,276.375L205.000,275.469L207.000,274.500L209.000,273.469L211.000,272.375L213.000,271.219L215.000,270.000" stroke-dasharray="5 4" opacity="0.65" stroke-width="2"/><path d="M215.000,270.000L216.600,268.980L218.200,267.920L219.800,266.820L221.400,265.680L223.000,264.500L224.600,263.280L226.200,262.020L227.800,260.720L229.400,259.380L231.000,258.000L232.600,256.580L234.200,255.120L235.800,253.620L237.400,252.080L239.000,250.500L240.600,248.880L242.200,247.220L243.800,245.520L245.400,243.780L247.000,242.000L248.600,240.180L250.200,238.320L251.800,236.420L253.400,234.480L255.000,232.500L256.600,230.480L258.200,228.420L259.800,226.320L261.400,224.180L263.000,222.000L264.600,219.780L266.200,217.520L267.800,215.220L269.400,212.880L271.000,210.500L272.600,208.080L274.200,205.620L275.800,203.120L277.400,200.580L279.000,198.000L280.600,195.380L282.200,192.720L283.800,190.020L285.400,187.280L287.000,184.500L288.600,181.680L290.200,178.820L291.800,175.920L293.400,172.980L295.000,170.000L296.600,166.980L298.200,163.920L299.800,160.820L301.400,157.680L303.000,154.500L304.600,151.280L306.200,148.020L307.800,144.720L309.400,141.380L311.000,138.000L312.600,134.580L314.200,131.120L315.800,127.620L317.400,124.080L319.000,120.500L320.600,116.880L322.200,113.220L323.800,109.520L325.400,105.780L327.000,102.000L328.600,98.180L330.200,94.320L331.800,90.420L333.400,86.480L335.000,82.500L336.600,78.480L338.200,74.420L339.800,70.320L341.400,66.180L343.000,62.000" stroke-width="2.7"/><path d="M215 70V310M55 270H215" stroke-dasharray="4 5" opacity="0.35"/></g><circle cx="175" cy="282.5" r="4.5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor"><circle cx="215" cy="270" r="4"/><g font-size="16"><text x="250" y="25" text-anchor="middle">t² − 3t − 2, with t ≥ 2</text><text x="215" y="95" text-anchor="middle">2</text><text x="42" y="75">0</text><text x="40" y="275" text-anchor="end">−4</text><text x="400" y="75">t</text><text x="245" y="275">(2, −4)</text><text x="140" y="335" text-anchor="middle">Vertex (3/2, −17/4)</text><text x="367" y="335" text-anchor="middle">Dashed: excluded t &lt; 2</text></g></g></svg>

The dashed part of the parabola in the diagram includes the excluded vertex. Only the solid branch represents values arising from positive $x$. An integer restriction can narrow the possible substitute values further. For example, an integer $x=2$ gives $x+1/x=5/2$, so integrality of $x$ does not automatically make this substitute an integer.

When a polynomial's roots must be integers, [[vietas-quadratic|Vieta's formulas]] can turn that condition into a finite factor search. Suppose $x^2-ax+2a$ has integer roots $r,s$, possibly equal. Then $r+s=a$ and $rs=2a$, so

$$rs-2r-2s=0,\qquad (r-2)(s-2)=4.$$

The unordered integer factor pairs of $4$ are $(1,4),(2,2),(-1,-4),(-2,-2)$. They give root pairs $(3,6),(4,4),(1,-2),(0,0)$ and parameter values $9,8,-1,0$. Each pair satisfies both Vieta relations, so all four values work. Reversing a pair does not produce a new parameter.

Transformations involving squares also require sign control. In $\sqrt{x+3}+\sqrt x=3$, first record $x\ge0$. Isolating the first root gives $\sqrt{x+3}=3-\sqrt x$, which requires $x\le9$. On this domain both sides are nonnegative, so squaring is reversible. It gives $x+3=9-6\sqrt x+x$, hence $\sqrt x=1$ and $x=1$. Substitution into the original equation gives $2+1=3$.

These checks distinguish the consequences of an equation from equivalent rewrites. [[transforming-equations|Retaining the domain and verifying the original equation]] rules out extraneous candidates, while the range of a substitute and [[quadratic-root-location|the locations of quadratic roots]] determine which candidates can occur.`,
      related: [
        { card: "quadratic-root-location", note: String.raw`where the roots of a quadratic with a parameter lie (L3.4).` },
        { card: "sfft", note: String.raw`turning an integer condition into a product of factors.` }
      ],
      exercises: [
        { q: String.raw`Find the least value of $x^2 + \tfrac1{x^2} - 3\left(x + \tfrac1x\right)$ for $x \gt 0$.`, answer: "-4",
          solution: String.raw`For $t=x+1/x\ge2$, the expression equals $t^2-3t-2=-4+(t-1)(t-2)\ge-4$. Equality occurs at $t=2$, which is attained by $x=1$. Thus the minimum is $-4$.` },
        { q: String.raw`For how many integers $a$ does $x^2 - ax + 2a = 0$ have two integer roots (possibly equal)?`, answer: "4",
          solution: String.raw`With roots $r$, $s$: $r + s = a$ and $rs = 2a$, so $(r - 2)(s - 2) = 4$. The pairs $(1, 4)$, $(2, 2)$, $(-1, -4)$, $(-2, -2)$ and their reversals give $(r, s) = (3, 6), (4, 4), (1, -2), (0, 0)$, so $a = 9, 8, -1, 0$: four values.` },
        { q: String.raw`Solve $\sqrt{x + 3} + \sqrt x = 3$.`, answer: "1",
          solution: String.raw`Write $\sqrt{x + 3} = 3 - \sqrt x$, which needs $\sqrt x \le 3$. Squaring: $x + 3 = 9 - 6\sqrt x + x$, so $\sqrt x = 1$ and $x = 1$. Check: $2 + 1 = 3$.` }
      ],
      problems: [
        "1991 AIME, Problem 8",
        "1995 AIME, Problem 7",
        "1983 AIME, Problem 5",
        "1986 AIME, Problem 4"
      ]
    },
    "L14.3": {
      prereq: ["exponent-laws"],
      cards: [],
      body: String.raw`An exact mathematical quantity and the integer requested by a contest problem may be different objects. The last calculation should follow the definition of the answer. A probability, an area, a remainder, and a count each require a different interpretation of the information obtained.

Suppose a probability has been calculated as $6/16$, and the question specifies $m+n$ where $m/n$ is in lowest terms with positive denominator. Dividing numerator and denominator by their greatest common divisor gives $3/8$, so the required integer is $11$. The reduced-form condition makes the representation unique.

For an area $\sqrt{7500}$ requested as $a\sqrt b$ with positive integer $a$ and squarefree positive integer $b$, factor the radicand as $2500\cdot3$. The area is $50\sqrt3$, so a request for $a+b$ gives $53$. Keeping the radical exact exposes the square factor and establishes the specified form. A rounded decimal would not by itself identify those integers.

Use modular arithmetic when the problem explicitly requests a remainder or final digits. For the remainder of $2^{20}$ modulo $1000$, begin with $2^{10}=1024\equiv24\pmod{1000}$ and square to obtain $2^{20}\equiv576\pmod{1000}$. Reducing intermediate sums and products preserves the final remainder, so the full large power need not be written.

The modulus comes from the question. Last two digits mean reduction modulo $100$, while last three mean modulo $1000$. The AIME answer range alone does not authorize reducing an otherwise requested integer modulo $1000$. Congruences can always be added and multiplied. To divide by a number, it must have a multiplicative inverse modulo the modulus: a factor whose product with it is congruent to one. For example, $2u\equiv2\pmod6$ is satisfied by both $u=1$ and $u=4$; canceling two and retaining modulus six would lose the second possibility.

Verification returns first to the underlying solution. If roots were found, substitute those roots into the original equations and check their domains. If an optimum was found, check both the bound and an allowed equality case. Then form the requested sum, product, count, or encoding and check its final range. A sum of roots is not generally itself a root to substitute back.

An estimate can still help detect an error in scale or sign, while exact arithmetic establishes the required result. Keep those roles distinct until the target quantity has been computed.`,
      related: [
        { card: "modular-basics", note: String.raw`reducing modulo $1000$ at every step.` },
        { card: "estimating-answers", note: String.raw`a rough estimate catches an answer of the wrong size (L8.6).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $2^{20}$ is divided by $1000$.`, answer: "576",
          solution: String.raw`$2^{10} = 1024 \equiv 24 \pmod{1000}$, so $2^{20} \equiv 24^2 = 576$. (Indeed $2^{20} = 1048576$.)` },
        { q: String.raw`A probability works out to $\tfrac{6}{16}$, and the answer is to be given as $m + n$ for $\tfrac mn$ in lowest terms. What is it?`, answer: "11",
          solution: String.raw`$\tfrac{6}{16} = \tfrac38$, so $m + n = 11$.` },
        { q: String.raw`An area works out to $\sqrt{7500}$, and the answer is to be given as $a + b$ for $a\sqrt b$ with $b$ squarefree. What is it?`, answer: "53",
          solution: String.raw`$\sqrt{7500} = \sqrt{2500 \cdot 3} = 50\sqrt3$, so $a + b = 53$.` }
      ],
      problems: [
        "1984 AIME, Problem 1",
        "1985 AIME, Problem 1",
        "1988 AIME, Problem 3",
        "1994 AIME, Problem 3"
      ]
    },
    "L14.4": {
      prereq: ["vietas-general", "log-rules", "telescoping", "complex-basics"],
      cards: [],
      body: String.raw`For a question about polynomial roots, begin with the information their equation supplies. Let $r,s$ be the roots of $x^2-10x+1$. Vieta gives $r+s=10$ and $rs=1$, but the requested cube sum can be developed directly from the root equations as well. Each root satisfies $r^2=10r-1$, so $r^3=10r^2-r=99r-10$. Adding the two instances gives

$$r^3+s^3=99(r+s)-20=970.$$

The calculation used the sum of the roots and their common equation; it did not need a separate radical expression for either root. [[vietas-general|Coefficient information]] and the equations satisfied by roots complement one another in power-sum problems.

A repeated logarithm can similarly collect an equation into one unknown. In $\log_2x+\log_4x+\log_8x=11$, the domain is $x\gt0$. [[log-rules|The logarithm laws]] give $\log_4x=(\log_2x)/2$ and $\log_8x=(\log_2x)/3$. With $u=\log_2x$, the equation is $(1+1/2+1/3)u=11$, so $u=6$ and $x=64$. The original terms are $6,3,2$, confirming the sum and the positive domain.

For a finite sum involving consecutive roots, rationalizing can create consecutive differences. The denominator of $1/(\sqrt k+\sqrt{k+1})$ is positive for $k\ge1$. Multiplying numerator and denominator by $\sqrt{k+1}-\sqrt k$ leaves denominator $(k+1)-k=1$, giving

$$\frac1{\sqrt k+\sqrt{k+1}}=\sqrt{k+1}-\sqrt k.$$

Adding from $k=1$ to $99$ cancels every interior square root. Only $\sqrt{100}-\sqrt1=9$ remains. [[telescoping|The boundary terms]] are determined by the first and last indices, so they should be written explicitly before performing the cancellation.

A polynomial can instead reveal a root-of-unity structure. In $z^6+z^3+1=0$, the repeated block is $y=z^3$, giving $y^2+y+1=0$. Multiplying by $y-1$ yields $y^3-1=0$, but $y=1$ does not satisfy the original quadratic. Therefore the original roots are exactly the solutions of $z^9=1$ with $z^3\ne1$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 365" role="img" aria-labelledby="l144-filtered-title l144-filtered-desc" style="width:100%;max-width:520px;height:auto"><title id="l144-filtered-title">Six ninth roots remain after excluding the three cube roots</title><desc id="l144-filtered-desc">Nine equally spaced points lie on the unit circle. Three hollow points are the cube roots of unity and are excluded. The six filled points are exactly the roots of z to the sixth plus z cubed plus one.</desc><circle cx="250" cy="185" r="120" fill="none" stroke="currentColor" opacity="0.4"/><circle cx="370.000" cy="185.000" r="6" fill="var(--bg)" stroke="currentColor" stroke-width="1.8"/><circle cx="341.925" cy="107.865" r="4.5" fill="currentColor"/><circle cx="270.838" cy="66.823" r="4.5" fill="currentColor"/><circle cx="190.000" cy="81.077" r="6" fill="var(--bg)" stroke="currentColor" stroke-width="1.8"/><circle cx="137.237" cy="143.958" r="4.5" fill="currentColor"/><circle cx="137.237" cy="226.042" r="4.5" fill="currentColor"/><circle cx="190.000" cy="288.923" r="6" fill="var(--bg)" stroke="currentColor" stroke-width="1.8"/><circle cx="270.838" cy="303.177" r="4.5" fill="currentColor"/><circle cx="341.925" cy="262.135" r="4.5" fill="currentColor"/><circle cx="83" cy="337" r="4.5" fill="currentColor"/><circle cx="276" cy="337" r="6" fill="var(--bg)" stroke="currentColor" stroke-width="1.8"/><g fill="currentColor" font-size="16"><text x="250" y="23" text-anchor="middle">Nine roots of z⁹ = 1; six retained</text><text x="389" y="190">1</text><text x="98" y="343">z⁶ + z³ + 1 = 0</text><text x="292" y="343">z³ = 1 excluded</text></g></svg>

The diagram begins with nine equally spaced points and excludes the three cube roots of unity. At each excluded point, $z^3=1$ makes the original expression equal $3$. At each of the other six points, the identity

$$z^9-1=(z^3-1)(z^6+z^3+1)$$

forces the second factor to vanish because the first is nonzero. This proves both directions of the description and accounts for all six roots. The remaining points have alternating angular gaps of $40^\circ$ and $80^\circ$; a subset of roots of unity need not itself be a regular polygon.

Multiplication by a factor and division by that factor require different checks. Multiplication can add candidates where the factor is zero; division is valid only after those cases have been handled. Here the original value at the excluded roots completes the argument.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`symmetric functions of roots without the roots (L3.3).` },
        { card: "roots-of-unity", note: String.raw`polynomials that divide $z^n - 1$ (L13.4).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^2 - 10x + 1$ are $r$ and $s$. Find $r^3 + s^3$.`, answer: "970",
          solution: String.raw`With $r + s = 10$ and $rs = 1$: $r^3 + s^3 = (r + s)^3 - 3rs(r + s) = 1000 - 30 = 970$.` },
        { q: String.raw`Solve $\log_2 x + \log_4 x + \log_8 x = 11$.`, answer: "64",
          solution: String.raw`In base $2$: $\left(1 + \tfrac12 + \tfrac13\right)\log_2 x = \tfrac{11}{6}\log_2 x = 11$, so $\log_2 x = 6$ and $x = 64$.` },
        { q: String.raw`Find $\sum_{k=1}^{99} \dfrac{1}{\sqrt k + \sqrt{k + 1}}$.`, answer: "9",
          solution: String.raw`Each term is $\sqrt{k + 1} - \sqrt k$ after rationalizing, so the sum telescopes to $\sqrt{100} - \sqrt1 = 9$.` }
      ],
      problems: [
        "1984 AIME, Problem 8",
        "1985 AIME, Problem 3",
        "1995 AIME, Problem 2",
        "1996 AIME, Problem 5",
        "2026 AIME I, Problem 6",
        "1994 AIME, Problem 4"
      ]
    },
    "L14.5": {
      prereq: ["transforming-equations", "quadratic-root-location", "vietas-general", "log-rules"],
      cards: [],
      body: String.raw`A substitution carries both an equation and a set of possible values. The range of $\sqrt x$ is nonnegative, the range of $2^x$ is positive, and $x+1/x$ has range $[2,\infty)$ when $x\gt0$. Solve within that range and then recover every corresponding original input. [[transforming-equations|Check transformations against the original domain]], especially when squaring or multiplying by a factor that may vanish.

Integrality is another constraint to translate precisely. Vieta's formulas can convert integer-root conditions into a factorization with finitely many integer factor pairs. [[quadratic-root-location|Root locations]] and equality conditions determine which algebraic candidates are actually allowed. An integer original input does not make every substitute expression an integer.

In a mixed problem, the target determines how much information is needed. [[vietas-general|Symmetric root quantities]] can follow from coefficients and root equations; [[log-rules|logarithmic equations]] can simplify after a change of base. Consecutive differences can telescope, and a factor of $z^n-1$ can locate roots on a circle, provided excluded factors are checked.

Finish by verifying the underlying solutions and computing the quantity the problem defines. Reduce a fraction before reading its numerator and denominator, simplify a radical before identifying its coefficients, and use a remainder only when requested. The final AIME answer lies from $0$ to $999$; intermediate roots and quantities need not.`,
      strategies: [
        String.raw`Write the range of every substitute when you introduce it, and discard solutions outside it.`,
        String.raw`Turn an integer condition into a product equal to a constant, or a discriminant that is a perfect square.`,
        String.raw`Keep fractions and radicals exact until the end.`,
        String.raw`Reduce fractions to lowest terms and radicals to squarefree form before forming the requested sum.`,
        String.raw`When a remainder is requested, reduce sums and products modulo the stated modulus throughout the calculation.`,
        String.raw`Verify the underlying solutions in the original conditions, then compute the requested quantity and check its final range.`,
        String.raw`In a mixed problem, ask what kind of object it is about, then look for the move that makes it familiar.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The roots of $x^2 - 4x + 1$ are $r$ and $s$. Find $r^2 + s^2$.`, answer: "14",
        solution: String.raw`$r^2 + s^2 = (r + s)^2 - 2rs = 16 - 2 = 14$.` },
      { q: String.raw`Find the sum of the solutions of $3^{2x} - 10 \cdot 3^x + 9 = 0$.`, answer: "2",
        solution: String.raw`With $t = 3^x \gt 0$: $t^2 - 10t + 9 = 0$, so $t = 1$ or $9$, both positive, and $x = 0$ or $2$. The sum is $2$.` },
      { q: String.raw`Find the real part of $(1 + i)^{12}$.`, answer: "-64",
        solution: String.raw`$(1 + i)^2 = 2i$, so $(1 + i)^{12} = (2i)^6 = 64i^6 = -64$.` },
      { q: String.raw`Find the last two digits of $3^{10}$.`, answer: "49",
        solution: String.raw`$3^5 = 243 \equiv 43 \pmod{100}$, and $43^2 = 1849 \equiv 49$. So $3^{10} = 59049$ ends in $49$.` },
      { q: String.raw`How many integers $x$ satisfy $|x - 3| + |x + 2| \le 9$?`, answer: "10",
        solution: String.raw`The left side is $5$ for $-2 \le x \le 3$, $2x - 1$ for $x \gt 3$ and $-2x + 1$ for $x \lt -2$. It is at most $9$ for $-4 \le x \le 5$, which holds $10$ integers.` },
      { q: String.raw`Find the remainder when $\sum_{k=1}^{10} k \cdot 2^k$ is divided by $1000$.`, answer: "434",
        solution: String.raw`For $S = \sum_{k=1}^{n} k2^k$, $2S - S = n2^{n+1} - (2 + 4 + \cdots + 2^n) = n2^{n+1} - 2^{n+1} + 2$, so $S = (n - 1)2^{n+1} + 2$. For $n = 10$: $9 \cdot 2048 + 2 = 18434$, which leaves $434$.` }
    ],
    problems: [
      "1991 AIME, Problem 6",
      "1987 AIME, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "1984 AIME, Problem 7",
      "1989 AIME, Problem 7",
      "1993 AIME, Problem 5",
      "1991 AIME, Problem 4"
    ]
  }
};
