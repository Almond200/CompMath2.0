// Learn, AMC Algebra, chapter L5: substitutions and symmetric expressions (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L5"] = {
  lessons: {
    "L5.1": {
      prereq: ["vietas-quadratic", "two-variable-identities"],
      cards: [],
      body: String.raw`A long expression can have a simple internal structure. The useful unit of algebra is not always a single variable: it may be a repeated combination, a sum of unknown quantities, or a whole expression that appears inside itself. Naming that unit lets us work at the level where the condition is simplest, then return to the original variables only if the question requires them.

In $(x^2+x)^2-8(x^2+x)+12=0$, expanding immediately would create a fourth-degree equation. Instead, the expression $x^2+x$ plays the same role in three places. Calling it $t$ gives $t^2-8t+12=0$, so $t=2$ or $t=6$. We have simplified one stage of the problem, but we have not yet found $x$. Each admissible block value must be traced back: $x^2+x=2$ gives $x=1,-2$, and $x^2+x=6$ gives $x=2,-3$.

The distinction between a block value and an original input matters. A block such as $x^2$ cannot be negative for real $x$, and a reciprocal is defined only when its denominator is nonzero. An algebraic answer for a substitute variable may therefore have no corresponding input. The preceding chapter's ideas about domains and preimages remain part of substitution.

Symmetry offers another kind of simplification. A question that treats several variables alike may depend only on their sum and products, rather than their individual values. Vieta's formulas provided this viewpoint for two roots; here we use it to recognize repeated structure in larger expressions and in systems of equations.

Substitution keeps track of which original inputs produce a given block value. Symmetric identities instead combine variables in ways that preserve a requested sum or product. For an infinite expression, a proposed block value must also be the limit of the finite expressions that define it.`,
      exercises: [
        { q: String.raw`How many real solutions does $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$ have?`, answer: "4",
          solution: String.raw`With $t = x^2 + x$: $t^2 - 8t + 12 = (t - 2)(t - 6) = 0$. Then $x^2 + x = 2$ gives $x = 1, -2$, and $x^2 + x = 6$ gives $x = 2, -3$. Four real solutions.` },
        { q: String.raw`Find the value of $\sqrt{6 + \sqrt{6 + \sqrt{6 + \cdots}}}$.`, answer: "3",
          solution: String.raw`Define $u_0=0$ and $u_{n+1}=\sqrt{6+u_n}$. The sequence increases and stays at most $3$, since the rule is increasing and sends $3$ to $3$. Its limit $x$ exists and satisfies $x=\sqrt{6+x}$ by continuity. Thus $x^2-x-6=0$, and the nonnegative limit is $3$, not $-2$.` },
        { q: String.raw`If $a + b + c = 0$ and $abc = 2$, find $a^3 + b^3 + c^3$.`, answer: "6",
          solution: String.raw`The identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(\ldots)$ shows the left side is $0$ when $a + b + c = 0$. So $a^3 + b^3 + c^3 = 3abc = 6$.` }
      ],
      problems: []
    },
    "L5.2": {
      prereq: ["quadratic-formula"],
      cards: ["name-the-whole-expression", "substitute-repeated-block", "repeated-block-equation", "infinite-nest"],
      body: String.raw`A substitution is useful when it replaces several appearances of one compound quantity by a single name. The outer equation can then be simpler than the formula defining that quantity. Separate those two levels: first determine what the block must equal, then determine which original inputs can produce each value.

For $(x-3)^2-5(x-3)+6=0$, set $t=x-3$. The outer equation factors as $(t-2)(t-3)=0$. Because every real value of $t$ corresponds to exactly one real $x=t+3$, these two block values give $x=5,6$. [[substitute-repeated-block|Substituting a repeated block]] does not change the equation's meaning when we retain the defining relation and its domain.

The same outer equation can lead to different counts for a different block. If $t=x^2$, a negative root of the outer equation has no real preimage, zero has one, and a positive value has two. In a [[repeated-block-equation|repeated-block equation]], counting roots for $t$ is therefore not the same as counting solutions for $x$. For $t=x^2+x$, the values $2$ and $6$ in the introduction each have two real preimages, giving four in all. A block can also have a restricted range even when no radical or denominator appears: $x^2+x=(x+1/2)^2-1/4$ cannot be less than $-1/4$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 210" role="img" aria-labelledby="l52-block-title l52-block-desc" style="width:100%;max-width:500px;height:auto"><title id="l52-block-title">Two block values can produce four original inputs</title><desc id="l52-block-desc">With t equal to x squared plus x, the outer quadratic gives t equal to two or six. Solving the defining relation gives x equal to one or minus two in the first branch, and two or minus three in the second.</desc><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M220 42L120 65M260 42L360 65M120 100V141M360 100V141"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="240" y="27">(t − 2)(t − 6) = 0</text><text x="120" y="89">t = 2</text><text x="360" y="89">t = 6</text><text x="240" y="125">t = x² + x</text><text x="120" y="166">x = 1 or −2</text><text x="360" y="166">x = 2 or −3</text><text x="240" y="201">2 block values → 4 inputs</text></g></svg>

Sometimes the target is the block itself. If $x+1/x=5$, with $x\ne0$, expand the cube of that whole quantity. The cross terms combine to $3(x+1/x)$, so $x^3+1/x^3=5^3-3\cdot5=110$. This is [[name-the-whole-expression|naming the whole expression]]: the two possible values of $x$ are irrelevant because the requested quantity is already determined by the given block.

A block may become visible only after regrouping. In $(x+1)(x+2)(x+3)(x+4)$, pairing the first and last factors gives $x^2+5x+4$, while pairing the middle two gives $x^2+5x+6$. Their difference is just $2$, so name the expression halfway between them, $t=x^2+5x+5$. The product becomes $(t-1)(t+1)=t^2-1$. Adding $1$ consequently produces a square. The pairing was chosen to make the linear coefficients equal; expanding all four factors first would conceal that clue.

An [[infinite-nest|infinite repeating expression]] requires an additional step: an equation for a possible limit does not prove that a limit exists. Define the radical $\sqrt{2+\sqrt{2+\cdots}}$ through finite approximations $u_0=0$, $u_{n+1}=\sqrt{2+u_n}$. They increase, since the square-root rule is increasing, and they never exceed $2$, since $u_n\le2$ implies $u_{n+1}\le2$. An increasing bounded real sequence has a limit. Continuity then gives $L=\sqrt{2+L}$; its only nonnegative solution is $L=2$. The bound and increase justify taking a limit before the equation identifies it.

A continued fraction shows why monotonicity must be checked rather than assumed. For $u_0=1$ and $u_{n+1}=1+1/u_n$, the first values are $1,2,3/2,5/3$: they move alternately above and below the limiting value. Solving the candidate equation gives $\phi=(1+\sqrt5)/2$. Since every $u_n\ge1$ and $1+1/\phi=\phi$, the error satisfies

$$|u_{n+1}-\phi|=\frac{|u_n-\phi|}{u_n\phi}\le\frac{|u_n-\phi|}{\phi}.$$

Because $\phi>1$, repeated steps shrink the error to zero. The finite truncations therefore converge to $\phi$. For finite substitutions, verify the preimages; for infinite ones, verify the limiting process as well.`,
      related: [
        { card: "palindromic-polynomials", note: String.raw`the substitution $t = x + \tfrac1x$ for polynomials that read the same both ways (L10.5).` },
        { card: "log-substitution", note: String.raw`naming $\log x$ or $2^x$ to turn an equation into a polynomial (L9.3).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $(x - 3)^2 - 5(x - 3) + 6 = 0$.`, answer: "11",
          solution: String.raw`With $t = x - 3$: $t^2 - 5t + 6 = 0$, so $t = 2$ or $3$, and $x = 5$ or $6$. The sum is $11$.` },
        { q: String.raw`Find $\sqrt{2 + \sqrt{2 + \sqrt{2 + \cdots}}}$.`, answer: "2",
          solution: String.raw`Starting with $u_0=0$ and $u_{n+1}=\sqrt{2+u_n}$ gives an increasing sequence bounded by $2$. Its limit $x$ therefore exists and satisfies $x=\sqrt{2+x}$. The equation gives $x=2$ or $-1$; only $2$ is nonnegative.` },
        { q: String.raw`Find $1 + \cfrac{1}{1 + \cfrac{1}{1 + \cdots}}$.`, answer: "(1 + sqrt(5))/2",
          solution: String.raw`The candidate positive limit is $\phi=(1+\sqrt5)/2$, from $x=1+1/x$. For the truncations $u_0=1$, $u_{n+1}=1+1/u_n$, every $u_n\ge1$, and $|u_{n+1}-\phi|=|u_n-\phi|/(u_n\phi)\le|u_n-\phi|/\phi$. Since $\phi>1$, the errors tend to zero. Thus the continued fraction converges to $\phi$.` },
        { q: String.raw`Find $(x + 1)(x + 2)(x + 3)(x + 4) + 1$ when $x = 1$, and check that it is a perfect square.`, answer: "121",
          solution: String.raw`Directly, $2 \cdot 3 \cdot 4 \cdot 5 + 1 = 121 = 11^2$. In general, pairing gives $(x^2 + 5x + 4)(x^2 + 5x + 6) + 1 = (x^2 + 5x + 5)^2$, which at $x = 1$ is $11^2$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 19",
        "1983 AIME, Problem 3",
        "1990 AIME, Problem 4",
        "1991 AIME, Problem 7",
        "2017 AMC 10B, Problem 24"
      ]
    },
    "L5.3": {
      prereq: ["symmetric-polynomial-strategies", "difference-of-squares"],
      cards: ["square-of-sum", "sum-zero-identities", "pairwise-sum-product", "an-minus-bn", "subtract-and-factor"],
      body: String.raw`Symmetry suggests combining variables before trying to find them separately. With three variables, the elementary combinations $S=a+b+c$, $Q=ab+bc+ca$ and $P=abc$ record the total, the pairwise products and the full product. A target that treats the variables equally can often be reconstructed from these quantities. The useful identities come from counting which terms an expansion includes.

[[square-of-sum|Squaring the three-term sum $S$]] gives $a^2+b^2+c^2$ plus two copies of each pairwise product. If $S=0$, it follows that $Q=-(a^2+b^2+c^2)/2$. The condition on the sum causes part of an expansion to disappear. For cubes, expand

$$S(a^2+b^2+c^2-Q).$$

The terms of type $a^2b$ cancel between the two products, while the remaining terms are $a^3+b^3+c^3-3abc$. Thus [[sum-zero-identities|a zero sum]] also gives $a^3+b^3+c^3=3P$. With $P=2$, the requested cube sum is $6$, regardless of which particular numbers satisfy the conditions. We use the condition to simplify an identity instead of attempting to solve for all three variables.

The [[pairwise-sum-product|product of pairwise sums]] is another example. Write each pair as the total minus the omitted variable:

$$(a+b)(b+c)(c+a)=(S-c)(S-a)(S-b).$$

Expanding the right side gives $S^3-S^2(a+b+c)+SQ-P=SQ-P$. The first two terms cancel because $a+b+c=S$. If $S=6$, $Q=11$ and $P=6$, the product is $60$. When $S=0$, the simpler observation that the three pairwise sums are $-c,-a,-b$ gives the same result, $-P$, directly.

Repeated algebraic structure also explains [[an-minus-bn|factoring differences of powers]]. Multiplying $a-b$ by $a^{n-1}+a^{n-2}b+\cdots+b^{n-1}$ makes consecutive mixed terms cancel, leaving only $a^n-b^n$. If $d$ divides $n$, regard $a^n-b^n$ as a difference of powers of $a^d$ and $b^d$, so $a^d-b^d$ is a factor too. Choosing a divisor of the exponent can expose small factors without evaluating the full power.

For example, $2^{12}-1=(2^6-1)(2^6+1)=63\cdot65=3^2\cdot7\cdot5\cdot13$. The largest prime factor is $13$. Factoring has converted a large-number question into two small factorizations. For odd $n$, replacing $b$ by $-b$ in a difference of powers shows that $a^n+b^n$ has factor $a+b$. The parity matters: $x^2+1$ does not have factor $x+1$, as its value at $x=-1$ is $2$.

Symmetry in a system can instead create a factor when we subtract. From $x^2+y=7$ and $y^2+x=7$, [[subtract-and-factor|subtracting and factoring]] gives $(x-y)(x+y-1)=0$. A solution must therefore lie in one of two cases, $x=y$ or $x+y=1$. If the problem already states $x\ne y$, only the second remains. This conclusion is a necessary relation, not permission to discard the original equations.

To verify that the unequal case is attainable, substitute $y=1-x$ into the first equation. We get $x^2-x-6=0$, so $(x,y)=(3,-2)$ or $(-2,3)$; both satisfy both original equations. If equality is allowed, the other branch gives $x=y=(-1\pm\sqrt{29})/2$. Keeping the two cases before dividing by $x-y$ preserves these equal solutions. The pattern throughout the lesson is to combine expressions so that terms cancel, then return to the original conditions to establish which candidates actually work.`,
      related: [
        { card: "cubes-minus-3abc", note: String.raw`the factorization of $a^3 + b^3 + c^3 - 3abc$ in full (L10.6).` },
        { card: "vietas-general", note: String.raw`the elementary sums as coefficients of a cubic (L10.2).` }
      ],
      exercises: [
        { q: String.raw`If $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$, find $(a + b)(b + c)(c + a)$.`, answer: "60",
          solution: String.raw`Use $(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc = 66 - 6 = 60$. (The numbers are $1, 2, 3$: $3 \cdot 5 \cdot 4 = 60$.)` },
        { q: String.raw`What is the largest prime factor of $2^{12} - 1$?`, answer: "13",
          solution: String.raw`Factor: $2^{12} - 1 = (2^6 - 1)(2^6 + 1) = 63 \cdot 65 = 3^2 \cdot 7 \cdot 5 \cdot 13$. The largest prime factor is $13$.` },
        { q: String.raw`Numbers $x \ne y$ satisfy $x^2 + y = 7$ and $y^2 + x = 7$. Find $x + y$.`, answer: "1",
          solution: String.raw`Subtract: $x^2 - y^2 + y - x = (x - y)(x + y - 1) = 0$. Since $x \ne y$, $x + y = 1$.` }
      ],
      problems: [
        "2015 AMC 10A, Problem 16",
        "2008 AIME II, Problem 7",
        "2023 AIME II, Problem 4"
      ]
    },
    "L5.4": {
      prereq: ["name-the-whole-expression", "substitute-repeated-block", "infinite-nest", "sum-zero-identities", "pairwise-sum-product", "an-minus-bn", "subtract-and-factor"],
      cards: [],
      body: String.raw`A substitution changes the level at which we view an equation. [[substitute-repeated-block|A repeated block]] becomes one unknown, making the outer structure simpler, while [[name-the-whole-expression|a named target quantity]] may be found without finding its constituent variables. Regrouping factors can expose a block that is not initially written twice in the same form. Always retain the defining relation, since different block values may have different numbers of original inputs.

[[infinite-nest|A repeating infinite expression]] also suggests an equation, but that equation describes a candidate limit. Finite approximations must be shown to converge before replacing their tail by the whole value. Increasing bounded approximations or a shrinking error can supply that justification; simply rejecting a negative root does not establish convergence.

Symmetric combinations such as the sum, pairwise-product sum and full product often determine a target that treats the variables alike. [[sum-zero-identities|A zero sum]] makes expansions collapse, and [[pairwise-sum-product|pairwise sums]] can be rewritten as the total minus each omitted variable. [[an-minus-bn|Differences of powers]] expose a different cancellation, organized by the exponent's divisors.

For systems that swap variables, [[subtract-and-factor|subtraction]] separates equal and unequal cases. A factorization narrows the possibilities, but each resulting branch must still satisfy the original conditions. The review problems ask you to decide which expression to name and which relationship to preserve before carrying out the calculation.`,
      strategies: [
        String.raw`If a block appears more than once, call it $t$ and solve for $t$ first.`,
        String.raw`Regroup factors to make a hidden block appear, such as pairing the outer and inner factors of a product of four.`,
        String.raw`After solving for the block, keep only the values the block can take.`,
        String.raw`For an infinite expression, define finite approximations, justify convergence, and then solve the equation for the limit.`,
        String.raw`If the variables add to zero, use $a^3 + b^3 + c^3 = 3abc$.`,
        String.raw`Factor $a^n - b^n$ through the divisors of $n$ before testing for primes.`,
        String.raw`For two equations that swap into each other, subtract them and factor out $x - y$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the sum of the squares of the real solutions of $x^4 - 5x^2 + 4 = 0$.`, answer: "10",
        solution: String.raw`With $t = x^2$: $t^2 - 5t + 4 = 0$, so $t = 1$ or $4$, and $x = \pm 1, \pm 2$. The squares add to $1 + 1 + 4 + 4 = 10$.` },
      { q: String.raw`If $x + \tfrac1x = 5$, find $x^3 + \tfrac{1}{x^3}$.`, answer: "110",
        solution: String.raw`Cube: $\left(x + \tfrac1x\right)^3 = x^3 + \tfrac1{x^3} + 3\left(x + \tfrac1x\right)$, so $x^3 + \tfrac1{x^3} = 125 - 15 = 110$.` },
      { q: String.raw`If $a - b = 3$ and $a^2 - b^2 = 21$, find $a$.`, answer: "5",
        solution: String.raw`Factor: $(a - b)(a + b) = 21$, so $a + b = 7$. With $a - b = 3$, $a = 5$.` },
      { q: String.raw`Find $\sqrt{12 + \sqrt{12 + \sqrt{12 + \cdots}}}$.`, answer: "4",
        solution: String.raw`The finite approximations $u_0=0$, $u_{n+1}=\sqrt{12+u_n}$ increase and are bounded above by $4$, since the rule is increasing and fixes $4$. Their limit exists and satisfies $x=\sqrt{12+x}$. Solving $x^2-x-12=0$ gives $4$ and $-3$; the nonnegative limit is $4$.` },
      { q: String.raw`If $a + b + c = 0$ and $a^2 + b^2 + c^2 = 6$, find $ab + bc + ca$.`, answer: "-3",
        solution: String.raw`Square the sum: $0 = a^2 + b^2 + c^2 + 2(ab + bc + ca) = 6 + 2(ab + bc + ca)$, so $ab + bc + ca = -3$.` },
      { q: String.raw`Find the sum of the real solutions of $(x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0$.`, answer: "6",
        solution: String.raw`With $t = x^2 - 3x$: $t^2 - 2t - 8 = (t - 4)(t + 2) = 0$. Then $x^2 - 3x = 4$ gives $x = 4, -1$, and $x^2 - 3x = -2$ gives $x = 1, 2$. All are real, and they add to $6$.` }
    ],
    problems: []
  },
  challenge: {
    problems: [
      "2017 AMC 12B, Problem 23",
      "1990 AIME, Problem 2"
    ]
  }
};
