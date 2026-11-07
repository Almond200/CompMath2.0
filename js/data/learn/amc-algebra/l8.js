// Learn, AMC Algebra, chapter L8: inequalities, extremes and estimates (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L8"] = {
  lessons: {
    "L8.1": {
      prereq: ["completing-the-square"],
      cards: [],
      body: String.raw`An extreme-value problem asks for a bound that the allowed quantities can actually reach. The calculation has two parts: explain why every admissible choice stays on one side of a proposed value, and exhibit a choice that attains it. A convincing example supplies the second part but cannot replace the first.

For $x^2-4x+7=(x-2)^2+3$, the square proves that every real input gives a value at least $3$. The input $x=2$ makes the square zero, proving that $3$ is the minimum. If the same expression were restricted to $x\gt 2$, its values could approach $3$ as closely as desired but would never equal it. The algebraic bound would remain valid, while the claim of an attained minimum would change.

Different constraints suggest different ways to expose a bound. A fixed sum may be used to balance two factors; a sum of distances can be studied by moving a point along a line; a placement problem can be improved by swapping two entries. In each case, the constraint determines which changes are permitted and which equality conditions must hold together.

Estimation asks a related question: how narrow a range is sufficient to settle the requested answer? A rounded value may suggest the right choice, but a bound establishes that nearby possibilities have been excluded. When an assertion claims to hold for all inputs, the direction reverses: one admissible counterexample disproves it, whereas many successful examples do not prove it.

The chapter begins with nonnegative squares and balanced products, then develops distances and arrangement arguments. It ends by turning estimates into justified intervals and checking universal claims. Each bound depends on the allowed inputs and on where equality is possible.`,
      exercises: [
        { q: String.raw`Find the smallest value of $x^2 - 4x + 7$.`, answer: "3",
          solution: String.raw`Complete the square: $(x - 2)^2 + 3 \ge 3$, with equality at $x = 2$.` },
        { q: String.raw`If $x + y = 12$, what is the largest value of $xy$?`, answer: "36",
          solution: String.raw`Since $(x-y)^2\ge0$, $4xy\le(x+y)^2=144$, so $xy\le36$ for all real $x,y$ with the given sum. Equality holds at $x=y=6$.` },
        { q: String.raw`The digits $1, 2, 3, 4$ are each used once to form two two-digit numbers. What is the largest possible product of the two numbers?`, answer: "1312",
          solution: String.raw`The tens digits should be $4$ and $3$. Then $41 \cdot 32 = 1312$ beats $42 \cdot 31 = 1302$: the extra $1$ goes to the smaller number, keeping the two factors close.` }
      ],
      problems: [
        "1986 AJHSME, Problem 14",
        "1989 AJHSME, Problem 4",
        "2000 AMC 10, Problem 20"
      ]
    },
    "L8.2": {
      prereq: ["completing-the-square"],
      cards: ["trivial-inequality", "sos-identity"],
      body: String.raw`For a real number $u$, the square $u^2$ is nonnegative and equals zero exactly when $u=0$. This simple fact becomes useful when an expression can be rewritten to display its squares. The rewriting identifies a bound; the zero conditions identify when that bound can be reached.

For $x^2+y^2-2x+4y+10$, complete the square in each variable. The result is $(x-1)^2+(y+2)^2+5$. Both squares are nonnegative, so the expression is at least $5$. They vanish together at $(x,y)=(1,-2)$, proving that the bound is attained. This is an application of [[trivial-inequality|the nonnegativity of a square]] to an expression whose original expanded form concealed its structure.

Equality conditions have to be compatible. For $(x-1)^2+(x-2)^2$, declaring each square at least zero gives a valid bound of zero, but attaining it would require the same $x$ to equal both $1$ and $2$. Instead, complete the combined expression:

$$(x-1)^2+(x-2)^2=2\left(x-\frac32\right)^2+\frac12.$$

The actual minimum is $1/2$, at $x=3/2$. A collection of individually sharp inequalities need not remain sharp when their equality cases cannot occur together.

Squares can also exploit a constraint. If $a^2+b^2=10$, expand $(a-b)^2\ge0$ to obtain $2ab\le a^2+b^2=10$. Thus $ab\le5$, with equality when $a=b$ and the constraint still holds. The choices $a=b=\sqrt5$ and $a=b=-\sqrt5$ both work. No positivity assumption on $a,b$ was needed; the argument concerns their real difference.

The [[sos-identity|sum-of-squares identity]] extends this comparison to three variables:

$$a^2+b^2+c^2-ab-bc-ca=\frac{(a-b)^2+(b-c)^2+(c-a)^2}{2}.$$

Expanding the right side verifies the identity: each square term occurs twice before division by two, and each pairwise product occurs with coefficient minus one. It is zero precisely when all three variables are equal. This explains why a symmetric expression measuring differences often vanishes at an equal configuration.

An equation can force those zero conditions. Rearranging $x^2+y^2+2=2x+2y$ gives $(x-1)^2+(y-1)^2=0$. Since neither square can be negative to cancel the other, both must be zero and $x=y=1$. A single nonlinear equation has determined two unknowns by forcing an extreme value. Before applying the same reasoning elsewhere, check that all displayed square coefficients are positive; subtracting a square would no longer give this conclusion.`,
      related: [
        { card: "am-gm", note: String.raw`the inequality of the means, which is the trivial inequality applied to $\left(\sqrt a - \sqrt b\right)^2$ (L8.3).` },
        { card: "vertex-form", note: String.raw`the smallest value of a quadratic in one variable (L3.4).` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $x^2 + y^2 - 2x + 4y + 10$.`, answer: "5",
          solution: String.raw`Complete the squares: $(x - 1)^2 + (y + 2)^2 + 5 \ge 5$, with equality at $(1, -2)$.` },
        { q: String.raw`If $a^2 + b^2 = 10$, what is the largest value of $ab$?`, answer: "5",
          solution: String.raw`From $(a - b)^2 \ge 0$, $2ab \le a^2 + b^2 = 10$, so $ab \le 5$, with equality at $a = b = \sqrt5$.` },
        { q: String.raw`Real numbers $x$ and $y$ satisfy $x^2 + y^2 + 2 = 2x + 2y$. Find $x + y$.`, answer: "2",
          solution: String.raw`Rearrange: $(x - 1)^2 + (y - 1)^2 = 0$. A sum of squares is $0$ only when both are $0$, so $x = y = 1$ and $x + y = 2$.` }
      ],
      problems: [
        "2010 AMC 12A, Problem 13",
        "2021 Spring AMC 12B, Problem 18",
        "2010 AIME I, Problem 6"
      ]
    },
    "L8.3": {
      prereq: ["trivial-inequality"],
      cards: ["am-gm", "max-product-fixed-sum"],
      body: String.raw`For a rectangle with fixed perimeter, increasing one side decreases the other. The area depends on the product of those sides, so we can study how that product changes as the sides become unequal.

For nonnegative $a,b$, the square $(\sqrt a-\sqrt b)^2$ is nonnegative. Expanding gives $a+b\ge2\sqrt{ab}$, which is [[am-gm|the arithmetic-mean/geometric-mean inequality]] for two numbers. Equality requires $a=b$. The same statement holds for any number of nonnegative terms, with equality when all are equal; the reference card supplies the general proof. In applications, identify the actual terms being compared and the quantity their constraint keeps fixed.

For $2x+8/x$ with $x\gt 0$, take the two terms as $a=2x$ and $b=8/x$. They are positive and their product is always $16$, so their sum is at least $8$. The equality condition is $2x=8/x$, giving $x=2$, which is allowed. The minimum is therefore $8$, attained at $x=2$. For $x^2+16/x^2$, the same product is fixed at $16$ whenever $x\ne0$; equality gives $x^2=4$, allowing both $2$ and $-2$.

Read the inequality in the other direction for a fixed sum: $ab\le((a+b)/2)^2$. A rectangle with perimeter $40$ has positive sides adding to $20$, so its area is at most $100$. The sides $10,10$ satisfy the perimeter condition and attain the bound. More generally, [[max-product-fixed-sum|the greatest product for positive parts with fixed sum]] occurs at equal parts. The fixed sum is essential: enlarging both unconstrained factors would keep increasing their product.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 225" role="img" aria-labelledby="l83-rectangle-title l83-rectangle-desc" style="width:100%;max-width:500px;height:auto"><title id="l83-rectangle-title">Balanced sides maximize area at a fixed perimeter</title><desc id="l83-rectangle-desc">A ten by ten square and a twelve by eight rectangle each have perimeter forty. The square has area one hundred and the rectangle ninety-six. The dimensions are drawn to the same scale.</desc><g stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.12"><rect x="50" y="55" width="120" height="120"/><rect x="280" y="79" width="144" height="96"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="250" y="23">Same perimeter: 40</text><text x="110" y="43">10</text><text x="29" y="120">10</text><text x="352" y="65">12</text><text x="259" y="132">8</text><text x="110" y="120">Area 100</text><text x="352" y="132">Area 96</text><text x="110" y="205">10 × 10</text><text x="352" y="205">12 × 8</text></g></svg>

The area bound can also be seen without square roots. With sides $10+t$ and $10-t$, their sum remains $20$, while their product is $100-t^2$. Any nonzero imbalance removes a square of area from the maximum. The diagram compares the balanced case with the sides $12,8$, whose area is $96$. The parameter must satisfy $-10\lt t\lt 10$ to describe a nondegenerate rectangle.

Integer restrictions may prevent exact equality. If positive integers $p\lt q$ have $q-p\ge2$, replacing them by $p+1,q-1$ preserves their sum and changes their product by $q-p-1\gt 0$. Repeating this improvement stops when the integers differ by at most one. Thus two positive integers totaling $15$ have greatest product $7\cdot8=56$. This proves the near-equality rule instead of simply rounding a real optimum without checking it.

Finally, check any extra restrictions against the equality input. If $2x+8/x$ is restricted to $x\ge3$, the bound $8$ still holds but cannot be attained at $x=2$. Compare instead with the value at the allowed endpoint $3$:

$$2x+\frac8x-\frac{26}{3}=\frac{(x-3)(6x-8)}{3x}\ge0\qquad(x\ge3).$$

Both numerator factors are nonnegative and the denominator is positive on this domain. Equality occurs at $x=3$, so the restricted minimum is $26/3$. The extra condition has changed which bound is sharp.`,
      related: [
        { card: "mean-chain", note: String.raw`the full chain of means, from harmonic to quadratic (L11.5).` },
        { card: "sfft", note: String.raw`completing a product, which often prepares an AM-GM step.` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $2x + \dfrac8x$ for $x \gt 0$.`, answer: "8",
          solution: String.raw`By AM-GM, $2x + \tfrac8x \ge 2\sqrt{2x \cdot \tfrac8x} = 2\sqrt{16} = 8$, with equality at $2x = \tfrac8x$, that is, $x = 2$.` },
        { q: String.raw`A rectangle has perimeter $40$. What is its largest possible area?`, answer: "100",
          solution: String.raw`Its sides add to $20$, so by AM-GM their product is at most $10^2 = 100$, reached by the $10 \times 10$ square.` },
        { q: String.raw`Find the smallest value of $x^2 + \dfrac{16}{x^2}$ for $x \ne 0$.`, answer: "8",
          solution: String.raw`The two terms are positive with product $16$, so by AM-GM their sum is at least $2\sqrt{16} = 8$, with equality at $x^2 = 4$.` }
      ],
      problems: [
        "2016 AMC 10B, Problem 16",
        "2016 AMC 10B, Problem 17",
        "2023 AMC 12B, Problem 11",
        "2003 AMC 12A, Problem 24",
        "2008 AIME II, Problem 3"
      ]
    },
    "L8.4": {
      prereq: ["absolute-value-rules"],
      cards: ["abs-triangle-inequality", "median-minimizes-abs"],
      body: String.raw`The expression $|x-a|$ is the distance from a variable point $x$ to the landmark $a$ on a line. A sum of such terms is a total travel distance. Moving $x$ reveals how that total changes, so the minimizing position can be justified without solving separately for every absolute-value branch.

Take landmarks $1,4,6$. When $x$ is left of all three, a small move to the right shortens all three distances. Between $1$ and $4$, that move lengthens the distance to $1$ but shortens the other two, so the total still decreases. Between $4$ and $6$, two distances lengthen and only one shortens, so the total increases. The minimum is therefore at $x=4$, with value $3+0+2=5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" role="img" aria-labelledby="l84-median-title l84-median-desc" style="width:100%;max-width:500px;height:auto"><title id="l84-median-title">A total distance decreases toward its median and increases after it</title><desc id="l84-median-desc">The graph of the sum of distances from x to one, four and six has slopes minus three, minus one, one and three on successive intervals. Its minimum is five at x equal to four.</desc><g stroke="currentColor" fill="none"><path d="M45 280H455M65 295V38" opacity="0.5"/><path d="M65 82 L115 136 L265 190 L365 154 L415 100" stroke-width="2.5"/><path d="M65 190H265V280" stroke-dasharray="5 5" opacity="0.5"/></g><g fill="currentColor"><circle cx="265" cy="190" r="4"/><g font-size="16" text-anchor="middle"><text x="250" y="24">y = |x − 1| + |x − 4| + |x − 6|</text><text x="300" y="214">(4, 5)</text><text x="115" y="303">1</text><text x="265" y="303">4</text><text x="365" y="303">6</text><text x="50" y="195">5</text><text x="470" y="285">x</text><text x="50" y="43">y</text></g></g></svg>

The graph records these counts as slopes: $-3,-1,1,3$ on the successive intervals. Each landmark changes which distances increase and which decrease. This proves the [[median-minimizes-abs|median rule]]: with an odd number of equally weighted landmarks, a middle landmark minimizes the total. With an even number, the counts on the left and right balance throughout the interval between the two middle landmarks. Thus $|x-2|+|x-8|$ equals its minimum $6$ for every $x$ in $[2,8]$, not just at the midpoint.

Weights must be retained. For $k\ne0$, the term $|kx-c|$ equals $|k|\,|x-c/k|$. The landmark is $c/k$ and its weight is $|k|$, which need not be a whole number. If $k=0$, the term is constant and does not affect the minimizing position. For $2|x-1|+|x-5|$, moving right between $1$ and $5$ increases the first contribution twice as fast as it decreases the second, so the minimum occurs at $1$, not throughout that interval. In general, a weighted median has at most half the total positive weight strictly on either side. Treating unequal weights as one landmark each would lose the actual distance costs.

A different comparison bounds a difference of distances. [[abs-triangle-inequality|The triangle inequality]] says that a direct trip is no longer than a trip through an intermediate point. Traveling from $1$ to $x$ through $5$ gives $|x-1|\le4+|x-5|$, so $|x-1|-|x-5|\le4$. Equality holds when $x\ge5$, since the route then moves in one direction along the line. Reversing the roles gives the lower bound $-4$, attained when $x\le1$.

For real increments $a,b$, the same principle is $|a+b|\le|a|+|b|$. Equality occurs when the increments have the same sign or one is zero; opposite nonzero directions cause some cancellation. These equality conditions explain when a distance bound can be reached. Use movement counts for a sum of distances and a direct-versus-indirect route for a difference, then check the allowed positions of $x$.`,
      related: [
        { card: "abs-value-graphing", note: String.raw`the broken-line graph of a sum of absolute values, lowest over the median (L4.4).` },
        { card: "mean-median-mode", note: String.raw`the median of a list (L2.5).` }
      ],
      exercises: [
        { q: String.raw`Find the smallest value of $|x - 1| + |x - 4| + |x - 6|$.`, answer: "5",
          solution: String.raw`A sum of distances to $1$, $4$, $6$ is smallest at the median $4$: $3 + 0 + 2 = 5$.` },
        { q: String.raw`Find the smallest value of $|x - 2| + |x - 8|$.`, answer: "6",
          solution: String.raw`For $x$ between $2$ and $8$ the two distances add to the distance between $2$ and $8$, which is $6$; outside it the sum is larger.` },
        { q: String.raw`Find the largest value of $|x - 1| - |x - 5|$.`, answer: "4",
          solution: String.raw`By the triangle inequality, $|x - 1| \le |x - 5| + |5 - 1|$, so the difference is at most $4$, with equality for every $x \ge 5$.` }
      ],
      problems: [
        "1983 AIME, Problem 2",
        "2010 AMC 12A, Problem 22",
        "1988 AIME, Problem 4"
      ]
    },
    "L8.5": {
      prereq: ["am-gm"],
      cards: ["placing-digits-extremes", "rearrangement"],
      body: String.raw`An arrangement problem asks which permitted placement makes an expression largest or smallest. To prove a candidate optimal, compare it with a placement that differs in a controlled way. A useful comparison is an exchange: if swapping two entries improves the value, their original order could not have been optimal.

For a sum of two three-digit numbers, the positions have weights $100,100,10,10,1,1$. If a larger digit $u$ occupies a smaller weight $r$ while a smaller digit $v$ occupies a larger weight $s$, swapping them changes the sum by $(u-v)(s-r)\gt 0$. Thus [[placing-digits-extremes|placing digits for an extreme]] assigns the largest digits to the largest place weights. Using $1$ through $6$, the maximum sum is $600+500+40+30+2+1=1173$, regardless of how the two digits at each weight are split between the numbers.

Products require attention to both factors, because a digit's contribution depends on the other number. In the two-two-digit setting with positive leading digits, a larger ones digit should not remain below a smaller tens digit. Swapping within the same number increases that factor. For a swap across numbers $10a+b$ and $10c+d$, moving $b\gt c$ into the tens position changes the product by $(b-c)(100a-d)\gt 0$. This comparison proves that the largest two digits belong in the tens positions in this setting.

With digits $1,2,3,4$, the tens digits are therefore $4,3$. The remaining choices, up to swapping the factors, are $41\cdot32=1312$ and $42\cdot31=1302$. Both pairs have sum $73$, so the closer pair has the greater product, as the preceding lesson predicts. The place-value exchange establishes the leading digits; the fixed-sum comparison resolves the remaining choice. A general instruction to balance factors without first checking their possible sums would not prove the result.

The [[rearrangement|rearrangement inequality]] extends the exchange argument to weighted sums. For $u\le v$ and $r\le s$, pairing large with large rather than crossing the pairs changes the total by

$$(ur+vs)-(us+vr)=(v-u)(s-r)\ge0.$$

Removing reversed pairs one at a time proves that two sorted lists give the greatest sum of products when matched in the same order, and the least when matched in opposite orders. This argument works for real entries of either sign; it depends on their order and the nonnegative differences, not on every entry being positive. Matching $1,4,9$ with $2,3,5$ gives maximum $59$ and minimum $35$.

When choices influence more than one part of an expression, a locally best product may need to be compared with the subtraction term too. For three different choices $a,b,c$ from $-3,-1,2,5$, fix $c$ first and find the least product of two remaining numbers. For $c=5,2,-1,-3$, the least values of $ab-c$ are respectively $-11,-17,-14,-2$. The global minimum is therefore $-17$. This short complete comparison verifies that the choice of a very negative product did not sacrifice a more important gain elsewhere.

Before arranging values, identify what an exchange preserves: the available digits, the weights, the sum of factors, or the distinctness of choices. Then either prove every reversed pair can be improved or compare the small number of remaining cases.`,
      related: [
        { card: "max-product-fixed-sum", note: String.raw`for a product, the factors should be as close as possible (L8.3).` },
        { card: "digit-manipulation", note: String.raw`writing a number by its digits, $100a + 10b + c$.` }
      ],
      exercises: [
        { q: String.raw`The digits $1$ to $6$ are used once each to form two three-digit numbers. What is the largest possible sum?`, answer: "1173",
          solution: String.raw`Put $6$ and $5$ in the hundreds places, $4$ and $3$ in the tens, $2$ and $1$ in the ones: $600 + 500 + 40 + 30 + 2 + 1 = 1173$.` },
        { q: String.raw`The numbers $a$, $b$, $c$ are $1$, $4$, $9$ in some order. What is the largest value of $2a + 3b + 5c$?`, answer: "59",
          solution: String.raw`By rearrangement, match the largest number with the largest weight: $a = 1$, $b = 4$, $c = 9$ gives $2 + 12 + 45 = 59$.` },
        { q: String.raw`Three different numbers $a$, $b$, $c$ are chosen from $-3, -1, 2, 5$. What is the smallest value of $ab - c$?`, answer: "-17",
          solution: String.raw`For each choice of $c$, minimize $ab$ among the remaining numbers. For $c=5,2,-1,-3$, the least products are $-6,-15,-15,-5$, giving $ab-c=-11,-17,-14,-2$. The smallest is $-17$, attained by $a=-3,b=5,c=2$.` }
      ],
      problems: [
        "1990 AJHSME, Problem 1",
        "2004 AMC 10B, Problem 5",
        "2013 AMC 10B, Problem 5",
        "2004 AMC 10A, Problem 15"
      ]
    },
    "L8.6": {
      prereq: [],
      cards: ["estimating-answers", "sqrt-approximation", "disproof-by-counterexample"],
      body: String.raw`An estimate is most useful when its accuracy matches the question. A rough value can identify a plausible answer, but a justified interval shows that the other choices are impossible. Decide first whether the task asks for a comparison, a rounded value, or an exact integer count; each may require a different amount of precision.

For $401/0.198$, replacing the numerator by $400$ and the denominator by $0.2$ gives $2000$. Both quantities are positive, so decreasing the numerator and increasing the denominator decrease the quotient. The actual value is therefore greater than $2000$. To round to the nearest hundred, also establish that it is below $2050$: multiplying by the positive denominator gives $0.198\cdot2050=405.9\gt 401$. Thus the quotient lies strictly between $2000$ and $2050$ and rounds to $2000$. [[estimating-answers|Estimating answers]] becomes decisive once the bounds exclude the rounding boundary.

The direction of a change must be checked for the actual expression. Positive denominators make these fraction comparisons straightforward; a negative numerator or a denominator that could change sign needs separate reasoning. Likewise, rounding both numerator and denominator down does not by itself tell us whether their quotient increases or decreases, since the two changes compete.

For [[sqrt-approximation|a square-root estimate]], first use nearby squares. The inequalities $49\lt 50\lt 56.25$ show that $7\lt \sqrt{50}\lt 7.5$, proving that the nearest integer is $7$. Merely putting the root between $7$ and $8$ would not decide which integer is nearer. A finer check, $7.07^2=49.9849\lt 50\lt 50.1264=7.08^2$, places the root between $7.07$ and $7.08$.

The approximation $\sqrt{n^2+k}\approx n+k/(2n)$ for $n\gt 0$ and small nonnegative $k$ comes from writing the root as $n+d$. Expanding gives $2nd+d^2=k$; when $d$ is small, dropping $d^2$ suggests $d\approx k/(2n)$. It also explains the error direction: $(n+k/(2n))^2=n^2+k+k^2/(4n^2)$, so this proposed approximation is an upper bound. For $\sqrt{50}$ it gives $7+1/14$, slightly above the true root. The size of the omitted term determines whether the approximation is useful.

A universal claim needs a different kind of check. [[disproof-by-counterexample|One admissible counterexample]] disproves a statement about every input, whereas a long run of successful examples is not a proof. The expression $n^2+n+41$ is prime for each integer $n$ from $0$ through $39$, but at $n=40$ it equals $1681=41^2$. This disproves the assertion that it is always prime. To assert that $40$ is the first failure, the earlier forty cases must also be verified; finding a failure alone does not establish minimality.

Choose test inputs that satisfy the stated hypotheses. Zero, negative numbers and fractions can expose a hidden assumption only when they belong to the proposed domain. Then distinguish the conclusion supported by the test: a counterexample can disprove, a numerical estimate can suggest a bound, and a justified interval can settle a rounding or comparison question. Keeping those roles separate prevents plausible computation from being mistaken for a proof.`,
      related: [
        { card: "digit-count", note: String.raw`estimating the size of a number by its number of digits.` },
        { card: "log-rules", note: String.raw`estimating powers through logarithms (L9.2).` }
      ],
      exercises: [
        { q: String.raw`Which integer is nearest to $\sqrt{50}$?`, answer: "7",
          solution: String.raw`$49 \lt 50 \lt 56.25 = 7.5^2$, so $\sqrt{50}$ is between $7$ and $7.5$; indeed it is about $7.07$.` },
        { q: String.raw`To the nearest hundred, what is $\dfrac{401}{0.198}$?`, answer: "2000",
          solution: String.raw`Reducing the numerator to $400$ and increasing the positive denominator to $0.2$ gives the lower bound $2000$. Also $2050\cdot0.198=405.9\gt401$, so the quotient is below $2050$. It therefore rounds to $2000$ to the nearest hundred.` },
        { q: String.raw`What is the smallest nonnegative integer $n$ for which $n^2 + n + 41$ is not prime?`, answer: "40",
          solution: String.raw`At $n = 40$, $1600 + 40 + 41 = 1681 = 41^2$. (For $n$ from $0$ to $39$ the values are all prime, and $n = 40$ is the first failure.)` }
      ],
      problems: [
        "2008 AMC 10B, Problem 12",
        "2012 AMC 10B, Problem 6",
        "2014 AMC 10A, Problem 7",
        "2015 AMC 12A, Problem 5",
        "2016 AMC 12A, Problem 5"
      ]
    },
    "L8.7": {
      prereq: ["trivial-inequality", "sos-identity", "am-gm", "max-product-fixed-sum", "median-minimizes-abs", "abs-triangle-inequality", "placing-digits-extremes", "rearrangement", "estimating-answers", "disproof-by-counterexample"],
      cards: [],
      body: String.raw`An extreme value requires both a bound and a feasible equality case. [[trivial-inequality|A nonnegative square]] gives a bound after a suitable rewrite; a [[sos-identity|sum of squares]] can identify a unique solution when all its zero conditions are compatible. If those conditions conflict, the separate bounds need to be sharpened together.

[[am-gm|AM-GM]] relates a fixed sum to a product, or a fixed product to a sum, for nonnegative terms. [[max-product-fixed-sum|Balancing parts]] maximizes their product when the constraint permits equality; integer parts are balanced by an exchange that improves any gap of at least two. Domain restrictions can rule out the equality input even when the bound remains valid.

For [[median-minimizes-abs|a sum of distances]], count which contributions increase and decrease as the point moves. Unequal weights require a weighted median, with $|kx-c|$ carrying weight $|k|$ when $k\ne0$. [[abs-triangle-inequality|The triangle inequality]] instead compares a direct route with an indirect one and identifies attainable bounds for differences of distances.

[[placing-digits-extremes|Place-value comparisons]] and [[rearrangement|pair exchanges]] justify optimal arrangements by showing how an out-of-order placement can be improved. When choices affect several terms, preserve those dependencies or compare the remaining cases completely. Finally, [[estimating-answers|bounds on an estimate]] must be tight enough for the requested answer, while [[disproof-by-counterexample|a counterexample]] must satisfy the claim's hypotheses.`,
      strategies: [
        String.raw`Complete the square, or write the expression as a sum of squares, to find a least value.`,
        String.raw`If a sum of squares equals zero, set each square to zero.`,
        String.raw`For a sum with a constant product, use AM-GM; split terms so that the product is constant.`,
        String.raw`Check the equality case: a bound is the answer only if it can be reached under the problem's conditions.`,
        String.raw`For a sum of distances, use a median; retain positive weights such as $|k|$ in $|kx-c|=|k||x-c/k|$ when $k\ne0$.`,
        String.raw`Put the largest numbers in the most important places, and pair large with large for a largest sum of products.`,
        String.raw`Estimate before computing, and test "always true" claims on small and extreme values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the smallest value of $x + \dfrac4x$ for $x \gt 0$.`, answer: "4",
        solution: String.raw`By AM-GM, $x + \tfrac4x \ge 2\sqrt4 = 4$, with equality at $x = 2$.` },
      { q: String.raw`Find the smallest value of $4x^2 - 12x + 15$.`, answer: "6",
        solution: String.raw`Complete the square: $4\left(x - \tfrac32\right)^2 + 6 \ge 6$, with equality at $x = \tfrac32$.` },
      { q: String.raw`Find the smallest value of $|x + 3| + |x - 1| + |x - 7|$.`, answer: "10",
        solution: String.raw`The median of $-3$, $1$, $7$ is $1$; there the sum is $4 + 0 + 6 = 10$.` },
      { q: String.raw`Two positive integers add to $15$. What is the largest possible product?`, answer: "56",
        solution: String.raw`The product is largest when the integers are as equal as possible: $7 \cdot 8 = 56$.` },
      { q: String.raw`Using $2^{10} \approx 10^3$, how many digits does $2^{50}$ have?`, answer: "16",
        solution: String.raw`Since $1000\lt 1024\lt 1100$, raising to the fifth power gives $10^{15}\lt 2^{50}\lt 1.1^5\cdot10^{15}$. As $1.1^5=1.61051\lt 10$, the number lies strictly between $10^{15}$ and $10^{16}$ and has $16$ digits. The upper bound is needed as well as the lower one. Its exact value is $1125899906842624$.` },
      { q: String.raw`If $a + b + c = 3$, what is the largest value of $ab + bc + ca$?`, answer: "3",
        solution: String.raw`Since $a^2 + b^2 + c^2 \ge ab + bc + ca$ (a sum of squares), $9 = (a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) \ge 3(ab + bc + ca)$. So $ab + bc + ca \le 3$, with equality at $a = b = c = 1$.` },
      { q: String.raw`The digits $2, 3, 4, 5$ are used once each to form two two-digit numbers. What is the smallest possible sum?`, answer: "59",
        solution: String.raw`Put the smallest digits, $2$ and $3$, in the tens places and $4$ and $5$ in the ones: $20 + 30 + 4 + 5 = 59$.` }
    ],
    problems: [
      "1986 AJHSME, Problem 20"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12A, Problem 23",
      "2016 AMC 12A, Problem 24",
      "2012 AMC 12B, Problem 23",
      "2013 AMC 12A, Problem 21"
    ]
  }
};
