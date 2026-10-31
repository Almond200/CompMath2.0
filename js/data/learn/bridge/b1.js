// Learn, AMC to AIME Bridge, chapter B1: algebra fluency and substitutions (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B1"] = {
  lessons: {
    "B1.1": {
      prereq: [],
      cards: ["useful-factorizations", "difference-of-squares", "square-of-sum", "rationalizing"],
      body: String.raw`Fast, accurate manipulation of expressions is the foundation of every later chapter. Contest problems reward seeing a factorization instead of expanding, recognizing a perfect square inside a sum, and clearing a radical from a denominator. Computing $100^2 - 7^2$ without multiplying, finding the largest prime factor of $2^{16} - 1$, or simplifying $\tfrac{\sqrt5 + \sqrt3}{\sqrt5 - \sqrt3}$ are typical, and each takes one line once the right identity is in view.

The [[difference-of-squares|difference of squares]] $a^2 - b^2 = (a - b)(a + b)$ is the most used factorization in contest mathematics, together with the difference and sum of cubes, $a^3 \mp b^3 = (a \mp b)(a^2 \pm ab + b^2)$. It turns arithmetic into multiplication ($100^2 - 7^2 = 93 \cdot 107$), and it factors numbers that look prime: $2^{16} - 1 = (2^8 - 1)(2^8 + 1) = 3 \cdot 5 \cdot 17 \cdot 257$, so its largest prime factor is $257$. Consecutive squares differ by odd numbers, $(n + 1)^2 - n^2 = 2n + 1$, which is why counts of squares in ranges and sums of odd numbers go together.

The [[square-of-sum|square of a sum]] $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$ links the sum of squares and the sum of products: if $a + b + c = 6$ and $a^2 + b^2 + c^2 = 14$, then $ab + bc + ca = 11$ without finding $a$, $b$, $c$. The two-variable case $(a + b)^2 = a^2 + 2ab + b^2$ does the same for a right triangle whose legs' sum and product are known. A few [[useful-factorizations|other factorizations]] are worth recognizing on sight: $ab + a + b + 1 = (a + 1)(b + 1)$, $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$, and $a^4 + 4b^4$ as a difference of squares.

[[rationalizing|Rationalizing]] multiplies by a conjugate to clear radicals: $\tfrac{1}{\sqrt3 - \sqrt2} = \sqrt3 + \sqrt2$, and $\tfrac{\sqrt5 + \sqrt3}{\sqrt5 - \sqrt3} = \tfrac{(\sqrt5 + \sqrt3)^2}{2} = 4 + \sqrt{15}$. The same trick telescopes sums like $\sum \tfrac{1}{\sqrt{k + 1} + \sqrt k} = \sum(\sqrt{k + 1} - \sqrt k)$, and it shows that small differences of square roots, such as $\sqrt{n + 1} - \sqrt n$, are about $\tfrac{1}{2\sqrt n}$.

Before expanding anything, look for one of these shapes. Every step of manipulation must keep the domain in mind: dividing by an expression assumes it is nonzero, and squaring can add solutions, which the next lesson takes up.`,
      related: [
        { card: "sfft", note: String.raw`$xy + x + y + 1 = (x + 1)(y + 1)$ used to solve equations in integers (B3.4).` },
        { card: "sophie-germain", note: String.raw`$a^4 + 4b^4$ as a product of two quadratics (A8.3).` },
        { card: "telescoping", note: String.raw`sums that collapse after rationalizing each term (A3.3).` }
      ],
      exercises: [
        { q: String.raw`Find the largest prime factor of $2^{16} - 1$.`, answer: "257",
          solution: String.raw`$2^{16} - 1 = (2^8 - 1)(2^8 + 1) = (2^4 - 1)(2^4 + 1)(2^8 + 1) = 15 \cdot 17 \cdot 257 = 3 \cdot 5 \cdot 17 \cdot 257$, and $257$ is prime (no prime up to $16$ divides it). The largest prime factor is $257$.` },
        { q: String.raw`Write $\tfrac{\sqrt5 + \sqrt3}{\sqrt5 - \sqrt3}$ in the form $a + \sqrt b$ and find $a + b$.`, answer: "19",
          solution: String.raw`Multiply the top and bottom by $\sqrt5 + \sqrt3$: $\tfrac{(\sqrt5 + \sqrt3)^2}{5 - 3} = \tfrac{8 + 2\sqrt{15}}{2} = 4 + \sqrt{15}$. So $a + b = 19$.` },
        { q: String.raw`Real numbers $a$, $b$, $c$ satisfy $a + b + c = 6$ and $a^2 + b^2 + c^2 = 14$. Find $ab + bc + ca$.`, answer: "11",
          solution: String.raw`$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$, so $36 = 14 + 2(ab + bc + ca)$ and $ab + bc + ca = 11$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 5",
        "2023 AMC 10B, Problem 9",
        "2001 AMC 10, Problem 11",
        "2023 AMC 10A, Problem 15",
        "2023 AMC 12A, Problem 12",
        "2023 AMC 10A, Problem 23",
        "1989 AIME, Problem 1",
        "2015 AIME I, Problem 3"
      ]
    },
    "B1.2": {
      prereq: [],
      cards: ["linear-elimination", "add-all-equations", "transforming-equations"],
      body: String.raw`A large share of AMC problems set up a small system of equations from a word problem and solve it. The skill is to solve with as little work as possible: eliminate a variable by combining equations, add all the equations when the system is symmetric, and keep track of which steps might add or lose solutions. Finding $x + y$ without finding $x$ and $y$, or $xyz$ from the three pairwise sums, is the typical target.

[[linear-elimination|Elimination]] combines equations so that a variable cancels: from $2x + 3y = 12$ and $4x - y = 10$, multiply the second by $3$ and add to get $14x = 42$, so $x = 3$ and $y = 2$. Choose the variable that cancels most easily, and notice when the question asks for a combination, such as $x + y$, that one well-chosen combination of the equations gives directly.

When the equations are symmetric or cyclic, [[add-all-equations|adding them all]] is the first move. If $x + y = 10$, $y + z = 14$ and $z + x = 12$, adding gives $2(x + y + z) = 36$, so $x + y + z = 18$, and subtracting each equation gives $z = 8$, $x = 4$, $y = 6$, so $xyz = 192$. Multiplying all the equations works the same way for products, and subtracting pairs of equations works for differences.

[[transforming-equations|Transforming equations]] safely means knowing which steps are reversible. Adding the same quantity to both sides, or multiplying by a nonzero constant, keeps exactly the same solutions. Squaring both sides can add solutions (both $x = 3$ and $x = -3$ satisfy $x^2 = 9$), so every candidate must be checked in the original equation; multiplying by an expression that might be zero can add solutions too, and dividing by one can lose them. Taking logarithms or square roots requires the quantities to be positive. A domain check at the end, against every restriction in the original problem, is part of every solution.

Solve systems by the combination that the question asks for, add symmetric equations, and check candidates when a step was not reversible. The next lesson simplifies equations by naming repeated expressions.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`symmetric systems in $x + y$ and $xy$ (A1.2).` },
        { card: "quadratic-root-location", note: String.raw`checking which roots of a cleared equation satisfy the original conditions (B6.1).` },
        { card: "cramers-rule", note: String.raw`solving a linear system for one unknown at a time (A9.4).` }
      ],
      exercises: [
        { q: String.raw`Solve $2x + 3y = 12$ and $4x - y = 10$, and give $x + y$.`, answer: "5",
          solution: String.raw`Three times the second equation is $12x - 3y = 30$; adding the first gives $14x = 42$, so $x = 3$, and then $y = 4x - 10 = 2$. So $x + y = 5$.` },
        { q: String.raw`Real numbers satisfy $x + y = 10$, $y + z = 14$ and $z + x = 12$. Find $xyz$.`, answer: "192",
          solution: String.raw`Adding, $2(x + y + z) = 36$, so $x + y + z = 18$. Subtracting each equation: $z = 8$, $x = 4$, $y = 6$. So $xyz = 192$.` }
      ],
      problems: [
        "2014 AMC 10B, Problem 1",
        "2016 AMC 10A, Problem 3",
        "2018 AMC 10A, Problem 6",
        "2002 AMC 10A, Problem 9",
        "2015 AMC 12A, Problem 6",
        "2013 AMC 12B, Problem 10",
        "2009 AIME II, Problem 1",
        "2000 AIME I, Problem 4"
      ]
    },
    "B1.3": {
      prereq: ["quadratic-formula"],
      cards: ["name-the-whole-expression", "substitute-repeated-block", "repeated-block-equation"],
      body: String.raw`Many equations that look hard are easy after one substitution. A degree-four equation in which $x^2 + x$ appears twice is a quadratic in $u = x^2 + x$; an infinite nested radical is a number that contains a copy of itself; a system in which $xyz$ appears in every equation becomes simple once $xyz$ has a name. The skill is spotting the repeated piece.

[[substitute-repeated-block|Substituting for a repeated block]] replaces an expression that occurs several times by a single letter. In $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$, put $u = x^2 + x$: then $u^2 - 8u + 12 = 0$, so $u = 2$ or $u = 6$, and the four roots come from $x^2 + x = 2$ and $x^2 + x = 6$, namely $1, -2, 2, -3$, with sum $-2$. The block is often hidden: in $(x + 1)(x + 2)(x + 3)(x + 4)$, pairing the outer and inner factors gives $(x^2 + 5x + 4)(x^2 + 5x + 6)$, and the block is $x^2 + 5x$. When the same block appears under a radical and outside it, as in $x^2 + 18x + 30 = 2\sqrt{x^2 + 18x + 45}$, naming it turns the equation into a quadratic in the block; this is the pattern of an [[repeated-block-equation|equation with a repeated block]].

[[name-the-whole-expression|Naming a self-similar expression]] handles infinite expressions. If $y = \sqrt{x + \sqrt{x + \sqrt{x + \cdots}}}$, then the part under the first radical is $x + y$, so $y^2 = x + y$. Asking for $y = 3$ gives $x = 6$. The same works for continued fractions, $y = 1 + \tfrac{1}{1 + \tfrac{1}{\cdots}}$ giving $y = 1 + \tfrac1y$, and for infinite sums and products whose tail looks like the whole.

After a substitution, solve for the new variable, then return to the original one and check the domain: a square root must be nonnegative, and a repeated block may take values that no $x$ produces.

Look for a piece that repeats, name it, and solve the simpler equation. The next lesson handles absolute values and inequalities.`,
      related: [
        { card: "quadratic-formula", note: String.raw`solving the quadratic that a substitution produces (B2.2).` },
        { card: "palindromic-polynomials", note: String.raw`the substitution $t = x + \tfrac1x$ for symmetric equations (A1.4).` },
        { card: "log-substitution", note: String.raw`naming $\log x$ to turn an equation into a polynomial (A4.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the real solutions of $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$.`, answer: "-2",
          solution: String.raw`With $u = x^2 + x$: $u^2 - 8u + 12 = (u - 2)(u - 6) = 0$. Then $x^2 + x - 2 = 0$ gives $x = 1, -2$, and $x^2 + x - 6 = 0$ gives $x = 2, -3$. All four are real, with sum $-2$.` },
        { q: String.raw`For what $x$ does $\sqrt{x + \sqrt{x + \sqrt{x + \cdots}}}$ equal $3$?`, answer: "6",
          solution: String.raw`The expression $y$ satisfies $y = \sqrt{x + y}$, so $y^2 = x + y$. With $y = 3$, $9 = x + 3$ and $x = 6$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 19",
        "1983 AIME, Problem 3",
        "1990 AIME, Problem 4",
        "2010 AIME I, Problem 9"
      ]
    },
    "B1.4": {
      prereq: [],
      cards: ["absolute-value-rules", "abs-value-relations", "sign-chart", "trivial-inequality"],
      body: String.raw`Absolute values and inequalities restrict where solutions can be, and contest problems use them to define regions, count integers, and bound expressions. How many integers satisfy $|2x - 5| \lt 7$? Where is a product of factors negative? What region does $|x| + |y| \le 3$ describe? Each has a standard method: split into cases at the points where expressions change sign.

The [[absolute-value-rules|absolute value rules]]: $|t| \lt c$ means $-c \lt t \lt c$, and $|t| \gt c$ means $t \gt c$ or $t \lt -c$. So $|2x - 5| \lt 7$ means $-1 \lt x \lt 6$, which holds for the $6$ integers from $0$ to $5$. $|t|$ is the distance from $t$ to $0$, and $|a - b|$ the distance between $a$ and $b$, which turns many equations into statements about distances on a line. An equation with nested or several absolute values is solved by cases on the sign of each inside expression. Graphs of [[abs-value-relations|absolute value relations]] are made of line segments: $|x| + |y| = c$ is a square with vertices on the axes, $|x - a| + |y - b|$ measures taxicab distance, and $y = |x - a|$ is a V; a relation such as $|x + y| + |x - y| = 2$ is the square $\max(|x|, |y|) = 1$.

A [[sign-chart|sign chart]] solves polynomial and rational inequalities. Mark the zeros of every factor on a number line, note that the sign changes at each zero of odd multiplicity and not at even multiplicity, and read off the intervals where the expression has the desired sign. For $\tfrac{(x - 1)(x - 4)}{x + 2} \le 0$ the critical points are $-2$, $1$, $4$, and the solution is $x \lt -2$ or $1 \le x \le 4$; from $-10$ to $10$ that is $12$ integers. The denominator's zero is always excluded.

The [[trivial-inequality|trivial inequality]] $x^2 \ge 0$, with equality only at $x = 0$, is the source of most bounds: $a^2 + b^2 \ge 2ab$ because $(a - b)^2 \ge 0$, and a quadratic's minimum comes from completing the square. A sum of squares equal to zero forces each square to be zero.

Split at sign changes, read intervals from a chart, and bound with squares. The next lesson sets up word problems.`,
      related: [
        { card: "median-minimizes-abs", note: String.raw`minimizing a sum of absolute values (A5.5).` },
        { card: "am-gm", note: String.raw`the next inequality after $x^2 \ge 0$ (A5.2).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions by graphing pieces (A4.6).` }
      ],
      exercises: [
        { q: String.raw`How many integers $x$ satisfy $|2x - 5| \lt 7$?`, answer: "6",
          solution: String.raw`$-7 \lt 2x - 5 \lt 7$ means $-2 \lt 2x \lt 12$, so $-1 \lt x \lt 6$: the integers $0, 1, 2, 3, 4, 5$, which is $6$.` },
        { q: String.raw`How many integers $x$ with $-10 \le x \le 10$ satisfy $\tfrac{(x - 1)(x - 4)}{x + 2} \le 0$?`, answer: "12",
          solution: String.raw`The critical points are $-2$, $1$, $4$. The expression is negative for $x \lt -2$, positive on $(-2, 1)$, zero at $1$, negative on $(1, 4)$, zero at $4$, and positive after. So the solutions are $x \lt -2$ and $1 \le x \le 4$: the integers $-10, \ldots, -3$ ($8$ of them) and $1, 2, 3, 4$, giving $12$.` }
      ],
      problems: [
        "2021 Spring AMC 10B, Problem 1",
        "2020 AMC 10A, Problem 5",
        "2012 AMC 10B, Problem 8",
        "2000 AMC 12, Problem 5",
        "2010 AMC 10B, Problem 13",
        "2018 AMC 12A, Problem 10",
        "1997 AIME, Problem 13",
        "2020 AIME II, Problem 8"
      ]
    },
    "B1.5": {
      prereq: ["linear-elimination"],
      cards: ["work-rates", "time-per-leg", "average-speed", "relative-motion", "averages-to-totals", "weighted-average", "mean-median-mode", "percent-change", "setting-up-proportions", "several-rates", "averages-before-after", "age-problems", "scoring-rules", "break-even-plans"],
      body: String.raw`Word problems about rates, averages and percents are the bread and butter of the early AMC, and their difficulty is almost entirely in the setup. Once the right quantities are named and the right relation written, the algebra is a line or two. A small set of setups covers almost all of them.

Rates multiply by time: distance is speed times time, work is rate times time. For [[work-rates|work rates]], add rates, not times: if one person does a job in $6$ hours and another in $3$, together they do $\tfrac16 + \tfrac13 = \tfrac12$ of the job per hour and finish in $2$ hours. For trips with several legs, [[time-per-leg|add the time of each leg]], and [[average-speed|average speed]] is total distance over total time, not the average of the speeds: $60$ miles per hour out and $40$ back averages $\tfrac{2 \cdot 60 \cdot 40}{100} = 48$, the harmonic mean. [[relative-motion|Relative motion]] works in the frame of one mover: two objects approaching each other close the gap at the sum of their speeds, and one chasing another at the difference. Problems with [[several-rates|several rates]] at once are organized as a table of rate, time and amount for each participant.

Averages are totals in disguise: [[averages-to-totals|turn every average into a total]], since totals add. If five tests average $80$, their total is $400$, and raising the average over six tests to $82$ needs a total of $492$, so the sixth score must be $92$. The same idea handles [[averages-before-after|averages before and after]] adding or removing members. A [[weighted-average|weighted average]] is a total divided by a total, and the mixture of two groups lies between their averages, closer to the larger group. The [[mean-median-mode|mean, median and mode]] respond differently to changes: the median depends only on the order, the mode on repetition, and the mean on every value.

[[percent-change|Percent changes]] multiply: an increase of $20\%$ followed by a decrease of $20\%$ multiplies by $1.2 \cdot 0.8 = 0.96$, a net loss of $4\%$. [[setting-up-proportions|Proportions]] compare quantities that scale together, such as cost with amount or volume with each dimension. Problems about [[age-problems|ages]] use the fact that differences of ages never change; problems about [[scoring-rules|scoring]] write the score as a linear combination of counts; [[break-even-plans|plans with a fixed cost and a rate]] are compared by where their linear costs meet.

Name the unknown, translate each sentence into an equation with rates, totals or factors, and check that the answer makes sense in the story. The next chapter turns to polynomials and sequences.`,
      related: [
        { card: "linear-elimination", note: String.raw`solving the small systems that word problems produce (B1.2).` },
        { card: "mean-chain", note: String.raw`the harmonic mean behind average speed (A5.2).` },
        { card: "geometric-series", note: String.raw`repeated percentage changes as a geometric sequence (B2.3).` }
      ],
      exercises: [
        { q: String.raw`A car drives to a town at $60$ miles per hour and returns along the same road at $40$ miles per hour. What is its average speed for the round trip, in miles per hour?`, answer: "48",
          solution: String.raw`For a one-way distance $d$, the total time is $\tfrac{d}{60} + \tfrac{d}{40} = \tfrac{d}{24}$, and the total distance is $2d$. The average speed is $\tfrac{2d}{d/24} = 48$.` },
        { q: String.raw`One worker can paint a room in $6$ hours and another in $3$ hours. How many hours do they take working together?`, answer: "2",
          solution: String.raw`Together they paint $\tfrac16 + \tfrac13 = \tfrac12$ of the room per hour, so they take $2$ hours.` },
        { q: String.raw`A student's five test scores average $80$. What must the sixth score be to raise the average to $82$?`, answer: "92",
          solution: String.raw`The five scores total $400$, and an average of $82$ over six tests needs a total of $492$. The sixth score is $492 - 400 = 92$.` }
      ],
      problems: [
        "2023 AMC 10A, Problem 1",
        "2012 AMC 10B, Problem 5",
        "2023 AMC 12B, Problem 2",
        "2001 AMC 12, Problem 4",
        "2019 AMC 10B, Problem 13",
        "2002 AMC 10A, Problem 17",
        "2026 AIME I, Problem 1",
        "1993 AIME, Problem 3"
      ]
    }
  },
};
