// Learn, AMC Algebra, chapter L6: sequences and series (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L6"] = {
  lessons: {
    "L6.1": {
      prereq: ["square-of-sum"],
      cards: [],
      body: String.raw`A sequence records values in an order, so a term has both a value and a position. A series adds terms of a sequence. Questions about a far term and questions about a sum may use the same rule in different ways: one tracks the accumulated change up to a position, while the other combines all the values along the way.

In an arithmetic sequence, every step adds the same amount. From $3$ to the twentieth term there are nineteen steps, so adding $4$ per step gives $3+19\cdot4=79$. In a geometric sequence, every step multiplies by the same factor, so repeated steps are recorded by a power. The distinction is between equal differences and equal multiplicative changes, not between small and large numbers.

A rule may also describe how to build the next term from previous ones. Such a recurrence can sometimes be transformed into an arithmetic or geometric sequence. In other cases the full information needed for the next step repeats, allowing an entire block of future terms to repeat. Computing a few terms can suggest either structure, but a repeated value alone does not prove a cycle when the rule remembers more than one term.

For sums, the useful structure may be cancellation. Writing $1/[k(k+1)]$ as $1/k-1/(k+1)$ shows that one term's negative contribution cancels the next term's positive contribution. Instead of adding many fractions, we can track what survives at the two boundaries.

This chapter develops equal-step and equal-ratio sequences, explains their sums, and then uses those ideas on recurrences and cancellation. Pay attention to indexing throughout: the number of steps between terms, the number of factors in a geometric sum, and the location of a cycle's first term can each change an answer by one.`,
      exercises: [
        { q: String.raw`Find the $20$th term of $3, 7, 11, 15, \ldots$`, answer: "79",
          solution: String.raw`Each term adds $4$, and the $20$th term is $19$ steps after the first: $3 + 19 \cdot 4 = 79$.` },
        { q: String.raw`Find $1 + 2 + 4 + \cdots + 2^9$.`, answer: "1023",
          solution: String.raw`A geometric sum with ratio $2$: $\tfrac{2^{10} - 1}{2 - 1} = 1023$.` },
        { q: String.raw`Find $\dfrac{1}{1 \cdot 2} + \dfrac{1}{2 \cdot 3} + \cdots + \dfrac{1}{9 \cdot 10}$.`, answer: "9/10",
          solution: String.raw`Each term is $\tfrac1k - \tfrac{1}{k + 1}$, so the sum telescopes to $1 - \tfrac1{10} = \tfrac{9}{10}$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 19",
        "2003 AMC 10B, Problem 8",
        "2008 AMC 10A, Problem 5"
      ]
    },
    "L6.2": {
      prereq: [],
      cards: ["arithmetic-series", "triangular-numbers"],
      body: String.raw`An arithmetic sequence is determined by a starting value and a fixed change per step. If the first term is $a_1$ and the change is $d$, then reaching the $n$th term requires $n-1$ changes, so $a_n=a_1+(n-1)d$. The subtraction of one records the fact that the first term is already present before any step is taken.

The same reasoning works between any two known positions. If $a_5=17$ and $a_{12}=45$, the seven steps from position five to position twelve account for an increase of $28$, so $d=4$. Position twenty is eight steps after position twelve, giving $a_{20}=45+8\cdot4=77$. Finding the first term is possible but unnecessary when a known term is closer to the requested position.

Counting terms reverses this calculation. The list $5,8,11,\ldots,302$ spans $297$ units, or $99$ steps of size $3$, so it contains $100$ terms. This count assumes that the endpoint actually occurs. If the upper bound were $303$ instead, it would not become the last term: we would still stop at $302$. For a positive step, the number of terms not exceeding an upper bound is the integer number of complete steps plus one. A decreasing sequence uses the same indexing idea with negative $d$.

To add the terms, write the sum forward and backward. Each column then pairs an early term with a late term. In an arithmetic sequence every such pair has value $a_1+a_n$, because moving one position inward adds $d$ to one term and subtracts $d$ from the other. Thus two copies of the sum equal $n(a_1+a_n)$, proving [[arithmetic-series|the arithmetic-sum formula]]. This argument works for odd $n$ too: in the doubled list the middle term is paired with itself.

For the first $50$ odd numbers, the final term is $99$, so the average of the endpoints is $50$ and the total is $2500$. The same result has a geometric explanation: consecutive odd-sized borders build squares. Adding the next odd number to an $n$ by $n$ square extends it to an $(n+1)$ by $(n+1)$ square, since the extra border has $2n+1$ cells. The sum of the first $n$ odd numbers is therefore $n^2$.

The [[triangular-numbers|triangular numbers]] arise from rows of lengths $1,2,\ldots,n$. Two copies fit into a rectangle with $n$ rows and $n+1$ columns, giving $T_n=n(n+1)/2$. The diagram shows the case $n=4$: the two ten-dot triangles make a twenty-dot rectangle. This same count appears in handshakes among $n+1$ people, because counting new pairs as each person arrives gives $0+1+\cdots+n$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 285" role="img" aria-labelledby="l62-triangle-title l62-triangle-desc" style="width:100%;max-width:500px;height:auto"><title id="l62-triangle-title">Two triangular arrays make a rectangle</title><desc id="l62-triangle-desc">Four rows have one, two, three and four filled dots. The complementary hollow dots have four, three, two and one dots. Together they form four rows and five columns, proving twice the four-row triangular number is twenty.</desc><circle cx="120" cy="65" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="160" cy="65" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="65" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="240" cy="65" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="280" cy="65" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="120" cy="105" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="160" cy="105" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="105" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="240" cy="105" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="280" cy="105" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="120" cy="145" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="160" cy="145" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="145" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="240" cy="145" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="280" cy="145" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="120" cy="185" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="160" cy="185" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="185" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="240" cy="185" r="7" fill="currentColor" stroke="currentColor" stroke-width="1.5"/><circle cx="280" cy="185" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" text-anchor="middle" font-size="16"><text x="200" y="25">5 columns</text><text x="365" y="130">4 rows</text><text x="105" y="235">10 filled dots</text><text x="295" y="235">10 hollow dots</text><text x="215" y="267">2(1 + 2 + 3 + 4) = 4 × 5</text></g></svg>

The endpoint average is a consequence of equal steps; it is not the mean of an arbitrary sequence. Before using the sum formula, verify the arithmetic rule, establish the correct number of terms, and check that the stated last term or bound has been interpreted correctly. The next lesson replaces equal differences by a constant ratio.`,
      related: [
        { card: "fencepost-counting", note: String.raw`the number of terms is the number of steps plus one.` },
        { card: "handshakes-diagonals", note: String.raw`$\binom n2$, a triangular number, counts the pairs among $n$ people.` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the first $50$ odd numbers.`, answer: "2500",
          solution: String.raw`There are $50$ terms from $1$ to $99$, with average $\tfrac{1 + 99}{2} = 50$, so the sum is $50 \cdot 50 = 2500$.` },
        { q: String.raw`An arithmetic sequence has $a_5 = 17$ and $a_{12} = 45$. Find $a_{20}$.`, answer: "77",
          solution: String.raw`Seven steps add $45 - 17 = 28$, so $d = 4$. Then $a_{20} = a_{12} + 8 \cdot 4 = 77$.` },
        { q: String.raw`How many terms does the sequence $5, 8, 11, \ldots, 302$ have?`, answer: "100",
          solution: String.raw`The steps of $3$ cover $302 - 5 = 297$, which is $99$ steps, so there are $99 + 1 = 100$ terms.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 5",
        "2025 AMC 10A, Problem 5",
        "2002 AMC 12B, Problem 9",
        "2023 AMC 10A, Problem 15"
      ]
    },
    "L6.3": {
      prereq: ["exponent-laws"],
      cards: ["geometric-series", "power-sums"],
      body: String.raw`A geometric sequence repeats a multiplication instead of an addition. Starting with $a$ and multiplying by $r$ each step gives $a,ar,ar^2,\ldots$. The exponent counts steps from the first term, so the seventh term is $ar^6$. A negative ratio alternates signs; a ratio of magnitude less than one makes the term magnitudes shrink.

To sum a finite geometric sequence, align a copy shifted by one multiplication. If $S_n=a+ar+\cdots+ar^{n-1}$, then $rS_n=ar+ar^2+\cdots+ar^n$. Subtracting cancels the shared terms:

$$S_n-rS_n=a-ar^n.$$

For $r\ne1$, this proves [[geometric-series|the geometric-sum formula]] $S_n=a(1-r^n)/(1-r)$. If $r=1$, every term is $a$ and the sum is $na$; dividing by $1-r$ would be invalid. With ratio zero the terms after the first are zero, which also agrees with the finite sum.

For $2+6+18+\cdots+2\cdot3^6$, the exponents run from zero through six, so there are seven terms. The sum is $2(3^7-1)/(3-1)=2186$. Counting only the six multiplications would omit a term. Relations among neighboring terms also need their conditions: $b^2=ac$ follows for three geometric terms, but the triple $0,0,1$ satisfies that equation without having a common multiplier. With nonzero first term, the relation does give the multiplier $b/a$ and the required third term. Calling the middle term the geometric mean is appropriate for positive terms; signs must otherwise be tracked separately.

An infinite series means the limit of its partial sums, not the result of formally canceling infinite lists. If $|r|\lt1$, then $r^n$ tends to zero, so the finite formula gives limit $a/(1-r)$. For $a=1$, $r=-1/3$, the partial sums alternate around $3/4$ and their error shrinks geometrically. For nonzero $a$ and $|r|\ge1$, the terms do not approach zero, so these partial sums cannot converge. In particular, substituting $r=2$ into the infinite-sum expression would assign a value to a divergent series.

Powers of the index, such as $1^2+2^2+\cdots+n^2$, form a different kind of sum. To derive [[power-sums|the square sum]], expand $(k+1)^3-k^3=3k^2+3k+1$ and add for $k=1$ through $n$. The left side cancels to $(n+1)^3-1$. The right side contains three times the desired square sum, three times the known arithmetic sum, and $n$ ones. Isolating the square sum and simplifying gives $n(n+1)(2n+1)/6$, which is $385$ for $n=10$.

The cube sum connects to the preceding lesson's triangular numbers. Since $T_k-T_{k-1}=k$ and $T_k+T_{k-1}=k^2$, the difference $T_k^2-T_{k-1}^2$ equals $k^3$. Adding these differences gives $1^3+\cdots+n^3=T_n^2$. We have obtained both power sums from cancellation rather than from unrelated formulas. For a sum restricted to even indices, first factor out the power of two: $2^3+4^3+\cdots+18^3=8(1^3+\cdots+9^3)$. The number of terms is now nine, not eighteen.`,
      related: [
        { card: "repeating-decimals", note: String.raw`a repeating decimal is an infinite geometric sum.` },
        { card: "arithmetico-geometric", note: String.raw`sums of a linear times a geometric term, by the same multiply-and-subtract (L11.4).` }
      ],
      exercises: [
        { q: String.raw`Find $2 + 6 + 18 + \cdots + 2 \cdot 3^6$.`, answer: "2186",
          solution: String.raw`A geometric sum with $a = 2$, $r = 3$ and $7$ terms: $2 \cdot \tfrac{3^7 - 1}{3 - 1} = 3^7 - 1 = 2186$.` },
        { q: String.raw`Find $1 - \tfrac13 + \tfrac19 - \tfrac1{27} + \cdots$.`, answer: "3/4",
          solution: String.raw`An infinite geometric sum with $a = 1$ and $r = -\tfrac13$: $\tfrac{1}{1 + 1/3} = \tfrac34$.` },
        { q: String.raw`Find $1^2 + 2^2 + \cdots + 10^2$.`, answer: "385",
          solution: String.raw`By the formula, $\tfrac{10 \cdot 11 \cdot 21}{6} = 385$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 19",
        "2025 AMC 10A, Problem 13",
        "2023 AMC 12A, Problem 12",
        "2025 AMC 10A, Problem 11"
      ]
    },
    "L6.4": {
      prereq: ["arithmetic-series", "geometric-series"],
      cards: ["first-order-recurrence", "periodic-sequences"],
      body: String.raw`A recurrence describes a sequence by specifying initial values and a rule for subsequent terms. Those ingredients together determine the sequence. A short list of calculated terms may suggest a closed formula or a cycle, but the suggestion must be checked against the rule. Many different rules can agree with the same initial list and then diverge.

For $a_1=3$ and $a_{n+1}=2a_n-1$, the first terms are $3,5,9,17,33$. The recurring subtraction prevents the terms themselves from being geometric. Instead, find a constant left unchanged by the rule: $c=2c-1$ gives $c=1$. Measuring each term relative to this fixed value produces

$$a_{n+1}-1=2(a_n-1).$$

Now $a_n-1$ is geometric with first term $2$, hence $a_n=2^n+1$. This derives the pattern and verifies it for all indices, giving $a_{10}=1025$. Shifting a [[first-order-recurrence|first-order recurrence]] by its fixed value often separates the multiplication from the added constant. If the multiplier is one, the fixed-value equation may have no solution, and the original rule is instead arithmetic.

When a recurrence adds a changing amount, accumulate those changes. From $a_{n+1}=a_n+2n$, the difference between $a_n$ and $a_1$ is $2(1+2+\cdots+(n-1))$. The last change used is the one from position $n-1$ to position $n$. With $a_1=1$, this gives $a_{20}=1+2\cdot190=381$.

To establish [[periodic-sequences|periodicity]], identify the complete state needed to determine the next term. For a rule using the last two terms, the state is their ordered pair. A repeated single value need not imply the same future because its predecessor may differ. The rule must also be the same at both occurrences; if it depends on the index, the relevant phase of that dependence belongs in the state.

For $a_1=1$, $a_2=2$ and $a_n=a_{n-1}/a_{n-2}$, the next terms are $2,1,1/2,1/2,1,2$. The ordered pair $(1,2)$ at positions seven and eight matches the initial pair. The same division rule therefore generates the same future, proving a period of six. All denominators remain nonzero in this repeating block. Since $100=6\cdot16+4$, the hundredth term is $a_4=1$.

A deterministic rule with finitely many possible states must eventually repeat a state, but the repetition need not start at the first term. For example, beginning at $3$ and repeatedly taking the floor of half the current term gives $3,1,0,0,\ldots$. The cycle is the final zero, with a transient prefix before it. Index reduction must begin at the start of the cycle, not automatically at the start of the sequence. Conversely, an infinite set of possible states does not force a repetition at all.

For a long sum, split off any transient prefix, then count whole periods and a remaining partial block. In the recurrence $a_1=5$, $a_2=8$, $a_n=a_{n-1}-a_{n-2}$, the block $5,8,3,-5,-8,-3$ repeats because the next ordered pair is again $(5,8)$. Its sum is zero, so the first $96$ terms contribute zero and the last four contribute $5+8+3-5=11$. Finding a block is only the first step; proving the state repeats and aligning its indices make the shortcut reliable.`,
      related: [
        { card: "linear-recurrence", note: String.raw`recursions that use the two previous terms, solved by their characteristic equation (L11.3).` },
        { card: "cycle-hunting", note: String.raw`finding the period of remainders of powers, the same idea in number theory.` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_1 = 3$ and $a_{n+1} = 2a_n - 1$. Find $a_{10}$.`, answer: "1025",
          solution: String.raw`The terms $3, 5, 9, 17, \ldots$ are $2^n + 1$; indeed $a_{n+1} - 1 = 2(a_n - 1)$, so $a_n - 1 = 2^{n-1} \cdot 2 = 2^n$. Then $a_{10} = 1025$.` },
        { q: String.raw`A sequence has $a_1 = 1$, $a_2 = 2$ and $a_n = \dfrac{a_{n-1}}{a_{n-2}}$. Find $a_{100}$.`, answer: "1",
          solution: String.raw`The terms are $1, 2, 2, 1, \tfrac12, \tfrac12, 1, 2, \ldots$, repeating with period $6$. Since $100 = 6 \cdot 16 + 4$, $a_{100} = a_4 = 1$.` },
        { q: String.raw`A sequence has $a_1 = 5$, $a_2 = 8$ and $a_n = a_{n-1} - a_{n-2}$. Find the sum of its first $100$ terms.`, answer: "11",
          solution: String.raw`The terms are $5, 8, 3, -5, -8, -3$ and then repeat, so every block of $6$ adds to $0$. The first $96$ terms add to $0$, and the last four are $5 + 8 + 3 - 5 = 11$.` }
      ],
      problems: [
        "2005 AMC 10B, Problem 11",
        "2006 AMC 10B, Problem 18",
        "2011 AMC 10A, Problem 17",
        "2004 AMC 12A, Problem 17",
        "2024 AMC 10A, Problem 10"
      ]
    },
    "L6.5": {
      prereq: ["difference-of-squares", "arithmetic-series"],
      cards: ["telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      body: String.raw`A telescoping sum is organized around cancellation between neighboring terms. The cancellation becomes visible only after a term is written as the change in another quantity. Instead of treating each summand as an isolated fraction, look for a difference whose endpoints match the differences in the next summands.

For $1/[k(k+1)]$, subtract the two reciprocal fractions with those denominators: $1/k-1/(k+1)$ has numerator $(k+1)-k=1$. Thus the original sum from $k=1$ to $9$ becomes

$$\left(1-\frac12\right)+\left(\frac12-\frac13\right)+\cdots+\left(\frac19-\frac1{10}\right).$$

Every middle reciprocal appears once with each sign, leaving $1-1/10=9/10$. In [[telescoping|a telescoping calculation]], write the first and last few terms explicitly before declaring what survives. A different lower bound or a gap in the matching indices changes the boundary contributions.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 190" role="img" aria-labelledby="l65-telescope-title l65-telescope-desc" style="width:100%;max-width:500px;height:auto"><title id="l65-telescope-title">Reciprocal differences partition an interval</title><desc id="l65-telescope-desc">The three adjacent intervals from one quarter to one third, one third to one half, and one half to one have lengths one twelfth, one sixth and one half. Their total length is one minus one quarter, which is three quarters.</desc><g stroke="currentColor" stroke-width="1.5" fill="currentColor"><rect x="80" y="60" width="40" height="35" fill-opacity="0.06"/><rect x="120" y="60" width="80" height="35" fill-opacity="0.13"/><rect x="200" y="60" width="240" height="35" fill-opacity="0.2"/><path d="M80 95V105M120 95V105M200 95V105M440 95V105" fill="none"/></g><g fill="currentColor" text-anchor="middle" font-size="15"><text x="100" y="83">1/12</text><text x="160" y="83">1/6</text><text x="320" y="83">1/2</text><text x="80" y="130">1/4</text><text x="120" y="130">1/3</text><text x="200" y="130">1/2</text><text x="440" y="130">1</text><text x="250" y="25">Adjacent gaps add without overlap</text><text x="250" y="172">1/2 + 1/6 + 1/12 = 1 − 1/4</text></g></svg>

The diagram shows the first three reciprocal differences as adjacent interval lengths. Their interiors do not overlap, so adding the gaps gives the distance between the outer endpoints, $1-1/4$. Extending the same partition through the ninth difference moves the left endpoint to $1/10$.

[[partial-fractions|Splitting a rational fraction]] can produce the needed differences. For $1/[(2k-1)(2k+1)]$, subtract $1/(2k+1)$ from $1/(2k-1)$. The numerator is $2$, so half of that difference equals the original fraction. From $k=1$ through $50$, cancellation leaves $(1-1/101)/2=50/101$. The factor of one half comes from the gap between the two denominator expressions, not from the number of summands.

Other denominators suggest different rewrites. Multiplying $1/(\sqrt{k}+\sqrt{k+1})$ by the conjugate numerator and denominator gives $\sqrt{k+1}-\sqrt{k}$, since the difference of the squares in the denominator is one. Summing from $1$ through $24$ then gives $\sqrt{25}-\sqrt1=4$. For [[factorial-telescoping|factorials]], the relation $(k+1)!=(k+1)k!$ yields $(k+1)!-k!=k\cdot k!$, so the sum of $k\cdot k!$ for $k=1$ through $8$ is $9!-1!=362879$. In each case the algebraic rewrite is checked before the cancellation is used.

Products have a parallel structure. Since $1+1/k=(k+1)/k$, multiplying these factors from $k=1$ through $99$ leaves $100/1=100$. Here intermediate factors cancel by division rather than by opposite signs. Every denominator must be nonzero; the formal appearance of a matching factor cannot justify an undefined original product.

An [[alternating-sum-grouping|alternating sum]] often uses pairs instead of telescoping. In $1-2+3-4+\cdots-98+99$, the first $98$ terms form $49$ pairs, each equal to $-1$, and the unmatched $99$ gives total $50$. Pairing the final term differently without changing the count can introduce a sign error. For alternating squares, a pair such as $100^2-99^2$ becomes $100+99$ by the difference of squares, turning the whole sum into an arithmetic sum.

Grouping is legitimate for these finite sums because it only rearranges finitely many additions. It should not be transferred uncritically to a divergent infinite series. Even when a sum has a visible pattern, identify the finite partial sum and its boundary terms first. Cancellation then explains the answer rather than hiding an unjustified limiting operation.`,
      related: [
        { card: "change-of-base", note: String.raw`products of logarithms telescope after a change of base (L9.2).` },
        { card: "trig-telescoping-product", note: String.raw`trigonometric products that telescope (L12.3).` }
      ],
      exercises: [
        { q: String.raw`Find $\left(1 + \tfrac11\right)\left(1 + \tfrac12\right)\left(1 + \tfrac13\right)\cdots\left(1 + \tfrac1{99}\right)$.`, answer: "100",
          solution: String.raw`Each factor is $\tfrac{k + 1}{k}$, so the product is $\tfrac21 \cdot \tfrac32 \cdots \tfrac{100}{99} = 100$.` },
        { q: String.raw`Find $\sum_{k=1}^{24} \dfrac{1}{\sqrt k + \sqrt{k + 1}}$.`, answer: "4",
          solution: String.raw`Rationalize: $\tfrac{1}{\sqrt k + \sqrt{k + 1}} = \sqrt{k + 1} - \sqrt k$. The sum telescopes to $\sqrt{25} - \sqrt1 = 4$.` },
        { q: String.raw`Find $1 \cdot 1! + 2 \cdot 2! + \cdots + 8 \cdot 8!$.`, answer: "362879",
          solution: String.raw`Since $k \cdot k! = (k + 1)! - k!$, the sum telescopes to $9! - 1! = 362880 - 1 = 362879$.` },
        { q: String.raw`Find $1 - 2 + 3 - 4 + \cdots - 98 + 99$.`, answer: "50",
          solution: String.raw`Pair $(1 - 2) + (3 - 4) + \cdots + (97 - 98)$: $49$ pairs of $-1$, then add $99$. The total is $-49 + 99 = 50$.` }
      ],
      problems: [
        "2005 AMC 12B, Problem 13",
        "2021 Spring AMC 10A, Problem 10",
        "2022 AMC 10B, Problem 9",
        "2010 AMC 12A, Problem 19"
      ]
    },
    "L6.6": {
      prereq: ["arithmetic-series", "triangular-numbers", "geometric-series", "power-sums", "first-order-recurrence", "periodic-sequences", "telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      cards: [],
      body: String.raw`A sequence's rule determines which information accumulates with its index. Equal differences give an arithmetic sequence, whose term count is a step count plus one. [[arithmetic-series|Pairing equal-step terms]] explains the endpoint-average formula, and [[triangular-numbers|triangular numbers]] organize both growing rows and counts of pairs.

Equal multipliers give a geometric sequence. [[geometric-series|Multiplying a finite sum by its ratio and subtracting]] leaves only the first term and a final boundary term. Taking a limit is justified when the nonzero series has $|r|\lt1$, and the case $r=1$ must be treated separately in the finite formula. [[power-sums|Sums of squares and cubes]] can likewise be derived from differences that cancel, rather than memorized without their underlying relationship.

A [[first-order-recurrence|recurrence]] may simplify after shifting by a fixed value or after accumulating its successive changes. A claim of [[periodic-sequences|periodicity]] requires a repeated complete state under the same rule. An eventual cycle can have a transient prefix; account for it before reducing a far index or adding whole periods.

[[telescoping|Telescoping]] makes the interior cancel and leaves boundaries. [[partial-fractions|Partial fractions]], conjugates and [[factorial-telescoping|factorial differences]] can expose that structure. [[alternating-sum-grouping|Grouping alternating terms]] instead replaces a long sum by repeated pair contributions and any leftover terms. In every approach, a small calculation of the first few terms checks the structure, while the rule and the endpoints justify using it for the full problem.`,
      strategies: [
        String.raw`For a count of arithmetic terms, count complete steps and add one; check whether the endpoint belongs to the sequence.`,
        String.raw`For an arithmetic sum, multiply the number of terms by the average of the first and last.`,
        String.raw`For a geometric sum, multiply by the ratio and subtract.`,
        String.raw`For a recursion, compute the first several terms by hand and look for a formula or a repeat.`,
        String.raw`Prove a complete state repeats, separate any transient prefix, then reduce the far index or add whole periods.`,
        String.raw`Write a term as a difference or a factor as a ratio, and look for cancellation.`,
        String.raw`Group an alternating sum into pairs.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`An arithmetic sequence has $31$ terms, first term $7$ and last term $97$. Find its sum.`, answer: "1612",
        solution: String.raw`The sum is $31 \cdot \tfrac{7 + 97}{2} = 31 \cdot 52 = 1612$.` },
      { q: String.raw`A geometric sequence has $a_2 = 6$ and $a_5 = 162$. Find $a_7$.`, answer: "1458",
        solution: String.raw`Three steps multiply by $\tfrac{162}{6} = 27$, so $r = 3$. Then $a_7 = a_5 \cdot 9 = 1458$.` },
      { q: String.raw`An infinite geometric series with ratio $\tfrac13$ has sum $12$. Find its first term.`, answer: "8",
        solution: String.raw`From $\tfrac{a}{1 - 1/3} = 12$, $a = 12 \cdot \tfrac23 = 8$.` },
      { q: String.raw`Find $1^3 + 2^3 + \cdots + 20^3$.`, answer: "44100",
        solution: String.raw`The sum of the first $n$ cubes is $\left(\tfrac{n(n + 1)}{2}\right)^2 = 210^2 = 44100$.` },
      { q: String.raw`Find $\sum_{k=1}^{50} \dfrac{1}{(2k - 1)(2k + 1)}$.`, answer: "50/101",
        solution: String.raw`By partial fractions each term is $\tfrac12\left(\tfrac{1}{2k - 1} - \tfrac{1}{2k + 1}\right)$, so the sum telescopes to $\tfrac12\left(1 - \tfrac{1}{101}\right) = \tfrac{50}{101}$.` },
      { q: String.raw`Find $100^2 - 99^2 + 98^2 - 97^2 + \cdots + 2^2 - 1^2$.`, answer: "5050",
        solution: String.raw`Pair the terms: $(100^2 - 99^2) + (98^2 - 97^2) + \cdots = (100 + 99) + (98 + 97) + \cdots + (2 + 1)$, which is $1 + 2 + \cdots + 100 = 5050$.` },
      { q: String.raw`A sequence has $a_1 = 1$ and $a_{n+1} = a_n + 2n$. Find $a_{20}$.`, answer: "381",
        solution: String.raw`Adding the steps, $a_{20} = 1 + 2(1 + 2 + \cdots + 19) = 1 + 2 \cdot 190 = 381$.` }
    ],
    problems: [
      "2004 AMC 10B, Problem 19",
      "2002 AMC 10B, Problem 23"
    ]
  },
  challenge: {
    problems: [
      "2024 AMC 12A, Problem 14",
      "2023 AMC 12A, Problem 20",
      "2024 AMC 12A, Problem 21",
      "2025 AMC 12A, Problem 21"
    ]
  }
};
