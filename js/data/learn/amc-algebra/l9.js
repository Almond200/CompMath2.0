// Learn, AMC Algebra, chapter L9: logarithms and exponential equations (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L9"] = {
  lessons: {
    "L9.1": {
      prereq: ["exponent-laws"],
      cards: [],
      body: String.raw`A logarithm names an exponent. If multiplying by the same factor repeatedly describes how a quantity grows, its logarithm records how many such multiplicative steps are needed to reach a specified value. This reverses the exponential rule studied earlier and converts some multiplicative relationships into additive ones.

Since $2^5=32$, we write $\log_2 32=5$. The input of the logarithm is the number reached, while its output is the exponent. Negative and fractional exponents fit the same definition: $\log_2(1/4)=-2$ and $\log_4 8=3/2$. A logarithm need not be a positive integer simply because its input is positive.

For real logarithms, the base must be positive and different from one, and the input must be positive. With such a base, the exponential function is one-to-one and takes every positive output exactly once, so its inverse is well defined. Base one would give only the output one, preventing this reversal. These domain conditions belong to every logarithmic calculation in the chapter.

Products of powers add exponents, which explains why logarithms turn products into sums. The laws are therefore consequences of the definition, not a separate set of symbolic instructions. A change of base describes the same exponent relationship using a different exponential unit.

The first lesson derives these laws and explains their conditions. The next uses them to solve equations by taking logarithms or naming a repeated logarithm or exponential term. The central habit is the same as in substitution: retain the domain and translate the result back into the original quantity before deciding which answers are valid.`,
      exercises: [
        { q: String.raw`Find $\log_2 32$.`, answer: "5",
          solution: String.raw`$2^5 = 32$, so $\log_2 32 = 5$.` },
        { q: String.raw`Find $\log 4 + \log 25$, with logarithms to base $10$.`, answer: "2",
          solution: String.raw`A sum of logarithms is the logarithm of the product: $\log(4 \cdot 25) = \log 100 = 2$.` },
        { q: String.raw`Find $\log_3 81 - \log_3 9$.`, answer: "2",
          solution: String.raw`A difference of logarithms is the logarithm of the quotient: $\log_3 9 = 2$. (Or $4 - 2 = 2$.)` }
      ],
      problems: [
        "2002 AMC 12A, Problem 14",
        "2023 AMC 12A, Problem 6",
        "2024 AMC 12B, Problem 6"
      ]
    },
    "L9.2": {
      prereq: ["exponent-laws"],
      cards: ["log-rules", "change-of-base"],
      body: String.raw`Read $\log_b x=u$ as the equation $b^u=x$. The base assumptions $b\gt 0$, $b\ne1$ make the exponent unique for every positive $x$. For $b\gt 1$, larger exponents give larger outputs, so the logarithm is increasing. For $0\lt b\lt 1$, the order is reversed and the logarithm is decreasing. This distinction will matter whenever a comparison is transformed by a logarithm.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 180" role="img" aria-labelledby="l92-scale-title l92-scale-desc" style="width:100%;max-width:500px;height:auto"><title id="l92-scale-title">Equal exponent steps give multiplicative spacing of inputs</title><desc id="l92-scale-desc">The inputs one quarter, one half, one, two, four and eight are evenly placed on a logarithmic scale. Their base-two logarithms are minus two, minus one, zero, one, two and three. Each step doubles the input and adds one to the logarithm.</desc><path d="M50 83H450" stroke="currentColor" fill="none"/><path d="M50 76V90" stroke="currentColor"/><text x="50" y="62" fill="currentColor" text-anchor="middle" font-size="17">1/4</text><text x="50" y="119" fill="currentColor" text-anchor="middle" font-size="17">-2</text><path d="M130 76V90" stroke="currentColor"/><text x="130" y="62" fill="currentColor" text-anchor="middle" font-size="17">1/2</text><text x="130" y="119" fill="currentColor" text-anchor="middle" font-size="17">-1</text><path d="M210 76V90" stroke="currentColor"/><text x="210" y="62" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="210" y="119" fill="currentColor" text-anchor="middle" font-size="17">0</text><path d="M290 76V90" stroke="currentColor"/><text x="290" y="62" fill="currentColor" text-anchor="middle" font-size="17">2</text><text x="290" y="119" fill="currentColor" text-anchor="middle" font-size="17">1</text><path d="M370 76V90" stroke="currentColor"/><text x="370" y="62" fill="currentColor" text-anchor="middle" font-size="17">4</text><text x="370" y="119" fill="currentColor" text-anchor="middle" font-size="17">2</text><path d="M450 76V90" stroke="currentColor"/><text x="450" y="62" fill="currentColor" text-anchor="middle" font-size="17">8</text><text x="450" y="119" fill="currentColor" text-anchor="middle" font-size="17">3</text><g fill="currentColor" text-anchor="middle" font-size="16"><text x="250" y="25">Input x doubles at each step</text><text x="250" y="158">log₂ x: equal steps of +1</text></g></svg>

The scale shows what this means for base two. Equal steps in the exponent correspond to multiplying the input by two, even when the input is below one. Multiplication is the natural measure of spacing on a logarithmic scale; the positive input cannot pass through zero to a negative value.

To derive [[log-rules|the product law]], let $x=b^u$ and $y=b^v$. Then $xy=b^{u+v}$, so $\log_b(xy)=u+v=\log_b x+\log_b y$. Dividing the powers instead subtracts their exponents, and raising $b^u$ to a real power $k$ multiplies the exponent by $k$. These give the quotient and power laws when $x,y\gt 0$. The checks $\log_b1=0$ and $\log_bb=1$ follow immediately from the defining exponential equations.

The laws do not apply to sums of inputs. For base ten, $\log 4+\log25=\log100=2$, whereas $\log(4+25)=\log29$ is a different quantity. A power identity also retains its domain: $\log_b(x^2)=2\log_b x$ requires $x\gt 0$ on the right. The left side alone is defined for every nonzero real $x$; on that larger domain the correct identity is $\log_b(x^2)=2\log_b|x|$. A rewrite can otherwise introduce an undefined logarithm or conceal a restriction.

For [[change-of-base|change of base]], begin again with $b^u=x$ and take logarithms to another valid base $c$. The power law gives $u\log_cb=\log_cx$, hence

$$\log_bx=\frac{\log_cx}{\log_cb}.$$

The denominator is nonzero because $b\ne1$. It also shows that the auxiliary base $c$ can be chosen for convenience, provided it is positive and not one.

For $\log_2 3\cdot\log_3 8$, change both logarithms to the same valid base. The two factors containing $\log 3$ cancel, leaving $\log_2 8=3$. The reciprocal identity $\log_ba=1/\log_ab$ is a special case, but it additionally needs $a\ne1$ because $a$ is now being used as a base. A zero logarithm cannot be inverted. For bases that are related powers, use their common underlying base: $\log_4 8=(\log_2 8)/(\log_2 4)=3/2$.

Logarithms can also locate the size of a positive integer. An integer $N$ has $d$ decimal digits exactly when $10^{d-1}\le N\lt 10^d$. Taking base-ten logarithms gives $d-1\le\log N\lt d$, so the digit count is $\lfloor\log N\rfloor+1$. Near an integer boundary, an approximate logarithm needs enough accuracy to determine the correct floor; a rough decimal value alone should not decide a boundary case.`,
      related: [
        { card: "telescoping", note: String.raw`a product of logarithms collapses like a telescoping product (L6.5).` },
        { card: "digit-count", note: String.raw`the number of digits of $N$ is $\lfloor \log_{10} N \rfloor + 1$.` }
      ],
      exercises: [
        { q: String.raw`Find $\log_2 3 \cdot \log_3 8$.`, answer: "3",
          solution: String.raw`By change of base, the product is $\tfrac{\log 3}{\log 2} \cdot \tfrac{\log 8}{\log 3} = \tfrac{\log 8}{\log 2} = \log_2 8 = 3$.` },
        { q: String.raw`Find $\log_4 8$.`, answer: "3/2",
          solution: String.raw`Change to base $2$: $\tfrac{\log_2 8}{\log_2 4} = \tfrac32$. Check: $4^{3/2} = 8$.` },
        { q: String.raw`Find $\log_5\left(125\sqrt5\right)$.`, answer: "7/2",
          solution: String.raw`$125\sqrt5 = 5^3 \cdot 5^{1/2} = 5^{7/2}$, so the logarithm is $\tfrac72$.` }
      ],
      problems: [
        "2002 AMC 12B, Problem 22",
        "2023 AMC 12B, Problem 7",
        "2024 AMC 12B, Problem 8",
        "2025 AMC 12A, Problem 7",
        "2005 AMC 12A, Problem 21"
      ]
    },
    "L9.3": {
      prereq: ["log-rules", "change-of-base", "quadratic-formula"],
      cards: ["take-logs-linearize", "log-substitution", "log-system"],
      body: String.raw`Equations involving exponents and logarithms become manageable when the exponential relationship is kept explicit. Sometimes both sides can be written as powers of the same base; sometimes a repeated power should be named as one variable; and sometimes taking a logarithm brings an unknown exponent into an algebraic equation.

For $a^x=b$ with fixed $a\gt 0$, $a\ne1$ and $b\gt 0$, [[take-logs-linearize|taking logarithms]] gives $x=\log_ab$. If $b\le0$, there is no real solution to this exponential equation. More generally, taking a logarithm of both sides preserves an equality only on a domain where both sides are positive. Exponentiating an equation with one logarithm is the inverse operation: $\log_bu=v$ means $u=b^v$, subject to the original base and input conditions.

Related powers can expose a repeated block. In $4^x-6\cdot2^x+8=0$, use $4^x=(2^x)^2$ and set $t=2^x$. The outer equation is $t^2-6t+8=0$, giving $t=2,4$. Both are in the range $t\gt 0$ of the original exponential, and they give $x=1,2$. This is [[log-substitution|substituting a power]]. If the outer polynomial instead had a negative root for $t$, that candidate would have no real exponential preimage and must be discarded.

A logarithm can also be the repeated block. For $x^{\log x}=100x$, with base-ten logarithms, the domain is $x\gt 0$, so both sides are positive. Taking logarithms gives $(\log x)^2=2+\log x$. Letting $u=\log x$ yields $(u-2)(u+1)=0$. Thus $u=2$ or $u=-1$, corresponding to $x=100$ or $x=1/10$. A negative value of a logarithm is allowed; it corresponds to a positive input less than one. Checking the original equation confirms both values.

For $\log_2x+\log_2(x-2)=3$, record the domain first: both inputs must be positive, so $x\gt 2$. Within this domain the product law gives $\log_2(x(x-2))=3$, hence $x(x-2)=8$. The algebraic roots are $4$ and $-2$, but only $4$ belongs to the original domain.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250" role="img" aria-labelledby="l93-domain-title l93-domain-desc" style="width:100%;max-width:500px;height:auto"><title id="l93-domain-title">Combining logarithms can conceal the separate input restrictions</title><desc id="l93-domain-desc">The original pair of logarithms requires x greater than two, admitting the root four but rejecting minus two. The combined logarithm only requires x times x minus two positive, which also admits x less than zero. Hollow endpoints exclude zero and two.</desc><g stroke="currentColor" fill="none"><path d="M50 65H450M50 185H450" opacity="0.3"/><path d="M300 65H450M50 185H200M300 185H450" stroke-width="3"/><path d="M441 60L450 65L441 70M59 180L50 185L59 190M441 180L450 185L441 190" stroke-width="1.5"/><path d="M95 60L105 70M95 70L105 60" stroke-width="1.5"/></g><g fill="var(--bg)" stroke="currentColor" stroke-width="1.5"><circle cx="300" cy="65" r="5"/><circle cx="200" cy="185" r="5"/><circle cx="300" cy="185" r="5"/></g><g fill="currentColor"><circle cx="400" cy="65" r="4"/><circle cx="100" cy="185" r="4"/><circle cx="400" cy="185" r="4"/><g font-size="15" text-anchor="middle"><text x="250" y="28">Separate inputs positive: x &gt; 2</text><text x="200" y="88">0</text><text x="300" y="88">2</text><text x="100" y="111">−2 excluded</text><text x="400" y="111">4 allowed</text><text x="250" y="148">Product positive: x &lt; 0 or x &gt; 2</text><text x="200" y="208">0</text><text x="300" y="208">2</text><text x="100" y="233">−2 allowed here</text><text x="400" y="233">4 allowed</text></g></g></svg>

The diagram explains why the restriction cannot be recovered from the combined input alone. The product $x(x-2)$ is positive for $x\lt 0$ as well as for $x\gt 2$, so the single combined logarithm has a larger domain than the original pair. The logarithm law has not failed: it was used outside its hypotheses if the newly available negative inputs are treated as original solutions. Carry the original restrictions alongside the transformed equation.

A [[log-system|system in logarithms]] is often linear after naming the logarithms. For $u=\log x$ and $v=\log y$, the conditions $u+v=3$ and $u-v=1$ give $u=2,v=1$, hence $x=100,y=10$ and $x+y=110$. The sum $u+v$ corresponds to the product $xy$, not to the sum $x+y$. Similarly, if two admissible roots $u_1,u_2$ of an equation in $u=\log x$ have known sum, the product of the corresponding positive solutions is $10^{u_1+u_2}$.`,
      related: [
        { card: "substitute-repeated-block", note: String.raw`the same substitution idea for a repeated algebraic block (L5.2).` },
        { card: "vietas-quadratic", note: String.raw`the sum or product of the solutions, without solving (L3.3).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $4^x - 6 \cdot 2^x + 8 = 0$.`, answer: "3",
          solution: String.raw`With $t = 2^x$: $t^2 - 6t + 8 = 0$, so $t = 2$ or $4$, giving $x = 1$ or $2$. The sum is $3$.` },
        { q: String.raw`Solve $\log_2 x + \log_2(x - 2) = 3$.`, answer: "4",
          solution: String.raw`Combine: $\log_2\left(x(x - 2)\right) = 3$, so $x^2 - 2x - 8 = 0$ and $x = 4$ or $-2$. Only $x = 4$ makes both logarithms defined.` },
        { q: String.raw`If $\log x + \log y = 3$ and $\log x - \log y = 1$ (base $10$), find $x + y$.`, answer: "110",
          solution: String.raw`Adding and subtracting: $\log x = 2$ and $\log y = 1$, so $x = 100$, $y = 10$, and $x + y = 110$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 19",
        "2022 AMC 12B, Problem 16",
        "2021 Spring AMC 12B, Problem 21"
      ]
    },
    "L9.4": {
      prereq: ["log-rules", "change-of-base", "take-logs-linearize", "log-substitution", "log-system"],
      cards: [],
      body: String.raw`A logarithm reverses an exponential assignment on a specified positive domain. [[log-rules|The logarithm laws]] follow by adding, subtracting or multiplying exponents; their input and base conditions remain part of each identity. In particular, a positive logarithm input does not imply a positive logarithm value, and a base between zero and one reverses order in comparisons.

[[change-of-base|Changing base]] expresses the same relationship using another valid exponential unit. It can expose cancellations in products of logarithms, but any canceled or inverted denominator must be nonzero. Special evaluations and digit estimates are useful only with enough accuracy to establish the intended bounds or integer floor.

[[take-logs-linearize|Taking logarithms]] can expose an unknown exponent when both sides are positive. [[log-substitution|Naming a power or logarithm]] then simplifies the outer algebra while retaining the range of the substitute variable. A power such as $2^x$ is always positive; a logarithm such as $\log x$ can take any real value while its input stays positive.

A [[log-system|system]] can be solved in the logarithms and translated back, keeping sums of logarithms distinct from sums of inputs. Combining separate logarithms may enlarge the apparent domain of a transformed expression, so record the original restrictions first and test every candidate against them.`,
      strategies: [
        String.raw`Read every logarithm as an exponent: $\log_b x = y$ means $b^y = x$.`,
        String.raw`Put every logarithm in one base before combining.`,
        String.raw`For a product of logarithms, change base and cancel.`,
        String.raw`For an equation with $b^{2x}$ and $b^x$, substitute $t = b^x$.`,
        String.raw`Record the separate logarithms' domains, combine within those restrictions, exponentiate, and check each candidate in the original equation.`,
        String.raw`In a system of logarithmic equations, treat the logarithms as the unknowns.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find $\log_2 6 + \log_2 \tfrac43$.`, answer: "3",
        solution: String.raw`The sum is $\log_2\left(6 \cdot \tfrac43\right) = \log_2 8 = 3$.` },
      { q: String.raw`Find $\log_9 27$.`, answer: "3/2",
        solution: String.raw`Both are powers of $3$: $\tfrac{\log_3 27}{\log_3 9} = \tfrac32$.` },
      { q: String.raw`Find $\log_2 9 \cdot \log_3 4$.`, answer: "4",
        solution: String.raw`$\log_2 9 = 2\log_2 3$ and $\log_3 4 = 2\log_3 2$, and $\log_2 3 \cdot \log_3 2 = 1$. The product is $4$.` },
      { q: String.raw`Solve $9^x = 27$.`, answer: "3/2",
        solution: String.raw`Write both in base $3$: $3^{2x} = 3^3$, so $x = \tfrac32$.` },
      { q: String.raw`Solve $\log_3(x + 1) + \log_3(x - 1) = 1$.`, answer: "2",
        solution: String.raw`Combine: $\log_3(x^2 - 1) = 1$, so $x^2 = 4$ and $x = \pm 2$. Only $x = 2$ keeps $x - 1$ positive.` },
      { q: String.raw`If $2^a = 3$ and $3^b = 4$, find $ab$.`, answer: "2",
        solution: String.raw`Then $a = \log_2 3$ and $b = \log_3 4$, so $ab = \log_2 4 = 2$. Directly: $2^{ab} = (2^a)^b = 3^b = 4$.` },
      { q: String.raw`Using $\log 5 \approx 0.699$, how many digits does $5^{20}$ have?`, answer: "14",
        solution: String.raw`$\log 5^{20} = 20 \log 5 \approx 13.98$, so $5^{20}$ is between $10^{13}$ and $10^{14}$ and has $14$ digits.` }
    ],
    problems: [
      "2024 AMC 12A, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "2005 AMC 12A, Problem 23",
      "2006 AMC 12A, Problem 21"
    ]
  }
};
