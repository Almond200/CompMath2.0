// Learn, AMC Algebra, chapter L8: inequalities, extremes and estimates (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L8"] = {
  lessons: {
    "L8.1": {
      prereq: ["completing-the-square"],
      cards: [],
      body: String.raw`This chapter finds largest and smallest values and estimates quantities closely enough to choose an answer. Its tools are the fact that a square is never negative, the inequality between the arithmetic and geometric means, distances on the number line, arranging numbers in the best order, and estimation.

Every square is at least $0$, and most inequalities come from that fact. Completing the square shows that $x^2 - 4x + 7 = (x - 2)^2 + 3$ is never below $3$, and equals $3$ at $x = 2$. A bound is the answer only if it can be reached, and the place where it is reached, the equality case, is part of the answer.

The arithmetic mean of two positive numbers is at least their geometric mean: $\tfrac{a + b}{2} \ge \sqrt{ab}$. So two numbers with a fixed sum have the largest product when they are equal: if $x + y = 12$, then $xy \le 36$.

On the number line, $|x - a|$ is a distance, and a sum of distances is smallest at a middle point. Numbers placed into a formula, such as digits into a product, give the largest result when the largest numbers go where they count most: the digits $1, 2, 3, 4$ make the largest product of two two-digit numbers as $41 \cdot 32 = 1312$. Last, rounding to easy numbers estimates a computation well enough to rule out wrong choices.

The lessons take these ideas in turn: a square is never negative (L8.2), AM-GM and fixed sums (L8.3), distances on the number line (L8.4), extremes by arrangement (L8.5), and estimating and checking (L8.6). The Summary (L8.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the smallest value of $x^2 - 4x + 7$.`, answer: "3",
          solution: String.raw`Complete the square: $(x - 2)^2 + 3 \ge 3$, with equality at $x = 2$.` },
        { q: String.raw`If $x + y = 12$, what is the largest value of $xy$?`, answer: "36",
          solution: String.raw`By AM-GM, $\sqrt{xy} \le \tfrac{x + y}{2} = 6$ for positive $x$, $y$, so $xy \le 36$, with equality at $x = y = 6$. (If one is negative, $xy$ is negative.)` },
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
      body: String.raw`Many questions ask for the smallest value of an expression in one or two variables, or for the variables when an expression equals its smallest value. What is the least value of $x^2 + y^2 - 2x + 4y + 10$? If $a^2 + b^2 = 10$, how large can $ab$ be? If $x^2 + y^2 + 2 = 2x + 2y$, what is $x + y$? One fact answers all three: a square of a real number is never negative.

[[trivial-inequality|The trivial inequality]] says $x^2 \ge 0$ for every real $x$, with equality only at $x = 0$. Its use is to rewrite an expression as a sum of squares plus a constant. Completing the square in each variable, $x^2 + y^2 - 2x + 4y + 10 = (x - 1)^2 + (y + 2)^2 + 5$, so the least value is $5$, at $(1, -2)$. Expanding $(a - b)^2 \ge 0$ gives $a^2 + b^2 \ge 2ab$, so $a^2 + b^2 = 10$ forces $ab \le 5$, with equality when $a = b = \sqrt5$.

[[sos-identity|Writing an expression as a sum of squares]] also solves equations. A sum of squares is $0$ only when every square is $0$, so $x^2 + y^2 + 2 - 2x - 2y = (x - 1)^2 + (y - 1)^2 = 0$ forces $x = y = 1$ and $x + y = 2$. The identity $a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12\left((a - b)^2 + (b - c)^2 + (c - a)^2\right)$ shows that the left side is never negative and is $0$ only when $a = b = c$.

Whenever an expression must be shown nonnegative, or its least value found, or an equation has more unknowns than equations, look for a sum of squares. The next lesson turns to the inequality of the means.`,
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
      body: String.raw`A rectangle with perimeter $40$ has its largest area when it is a square. The expression $2x + \tfrac8x$ for positive $x$ cannot be smaller than $8$. A sum of positive numbers with a fixed product is smallest when they are equal. These are all one inequality, between the arithmetic mean and the geometric mean.

[[am-gm|The AM-GM inequality]] says that for positive numbers the arithmetic mean is at least the geometric mean: $\tfrac{a + b}{2} \ge \sqrt{ab}$, and for $n$ numbers $\tfrac{a_1 + \cdots + a_n}{n} \ge \sqrt[n]{a_1 \cdots a_n}$, with equality exactly when all the numbers are equal. For two numbers it is the trivial inequality $\left(\sqrt a - \sqrt b\right)^2 \ge 0$. It bounds a sum below when the product is fixed: $2x + \tfrac8x \ge 2\sqrt{2x \cdot \tfrac8x} = 8$, with equality when $2x = \tfrac8x$, that is, $x = 2$. Split terms so that the product becomes constant: $x^2 + \tfrac{16}{x^2} \ge 2\sqrt{16} = 8$.

Read the other way, it bounds a product above when the sum is fixed, and [[max-product-fixed-sum|the product of parts with a fixed sum is largest when the parts are equal]]. A rectangle with perimeter $40$ has sides adding to $20$, so its area is at most $10 \cdot 10 = 100$. When the parts must be whole numbers, make them as equal as possible: $15 = 7 + 8$ gives the largest product of two positive integers with sum $15$, $56$. Products such as $(A + 1)(M + 1)(C + 1)$ appear after completing a product with a constant.

The bound is the answer only if its equality case is allowed; always check that the equal values satisfy the problem's conditions. Use AM-GM for a sum with a constant product and for a product with a constant sum. The next lesson studies distances on the number line.`,
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
      body: String.raw`Where should a meeting point be put on a straight road to make the total walking distance of several people smallest? What is the least value of $|x - 1| + |x - 4| + |x - 6|$? How large can $|x - 1| - |x - 5|$ be? Thinking of $|x - a|$ as the distance from $x$ to $a$ answers all of these at once.

[[median-minimizes-abs|A sum of distances to points on a line is smallest at a median]]: with the points sorted, at the middle one when there is an odd number of them, or anywhere between the two middle ones when there is an even number. Moving $x$ away from the median brings it closer to fewer points than it moves away from. So $|x - 1| + |x - 4| + |x - 6|$ is smallest at $x = 4$, where it is $3 + 0 + 2 = 5$, and $|x - 2| + |x - 8|$ is $6$ for every $x$ between $2$ and $8$. A term $|kx - 1|$ counts as $k$ copies of the distance to $\tfrac1k$, so a weighted median is used.

[[abs-triangle-inequality|The triangle inequality]] $|a + b| \le |a| + |b|$ says that going directly is never longer than going through a third point; equality holds when $a$ and $b$ have the same sign. Its other form, $\big||a| - |b|\big| \le |a - b|$, bounds a difference of distances: $|x - 1| - |x - 5|$ is at most the distance between $1$ and $5$, which is $4$, reached for every $x \ge 5$.

For a sum of absolute values of linear expressions, go to a median; for a difference, use the triangle inequality, and find where equality holds. The next lesson arranges numbers to make an expression extreme.`,
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
      body: String.raw`Some problems hand you numbers or digits to place into an expression and ask for the largest or smallest result. Which two three-digit numbers made from the digits $1$ to $6$ have the largest sum? How should $1$, $4$, $9$ be matched with the weights $2$, $3$, $5$ to make the weighted sum largest? Which choice of three numbers from a list makes $ab - c$ smallest? The answers come from placing the extreme numbers where they have the most effect.

[[placing-digits-extremes|Placing digits for an extreme]] puts the largest digits in the places that count most. For the largest sum of two three-digit numbers from $1$ to $6$, the hundreds digits are $6$ and $5$, the tens $4$ and $3$, and the ones $2$ and $1$: $600 + 500 + 40 + 30 + 2 + 1 = 1173$, however the pairs are split. For a product the same rule holds for the top places, and the remaining digits go to keep the two factors close, by AM-GM. For the smallest value of $ab - c$, make $ab$ as negative as possible, a large negative times a large positive, and subtract the largest remaining $c$: from $-3, -1, 2, 5$, the product $-3 \cdot 5 = -15$ minus $2$ gives $-17$.

[[rearrangement|The rearrangement inequality]] says that for two lists of numbers, the sum of products is largest when both are sorted the same way and smallest when sorted in opposite ways. Matching $1, 4, 9$ with $2, 3, 5$ in the same order gives $2 + 12 + 45 = 59$, the largest possible; the opposite order gives $18 + 12 + 5 = 35$, the smallest.

Decide which positions matter most, fill them with the extreme numbers, and check signs, since a negative number turns largest into smallest. The next lesson estimates and checks.`,
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
          solution: String.raw`Make $ab$ as negative as possible, $-3 \cdot 5 = -15$, and subtract the largest number left, $2$: $-17$. Any other choice gives a larger value.` }
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
      body: String.raw`Not every problem needs an exact computation. Which choice is closest to $\tfrac{401}{0.198}$? Is $\sqrt{50}$ nearer $7$ or $8$? Is it true that $n^2 + n + 41$ is always prime? An estimate, a square-root approximation or a single counterexample settles each, often faster than any formula.

[[estimating-answers|Estimating]] replaces the numbers by nearby easy ones and keeps track of which way each change moves the result: $\tfrac{401}{0.198} \approx \tfrac{400}{0.2} = 2000$, and the true value, about $2025$, is slightly larger because the top was rounded down and the bottom up. When the choices are far apart, a rough estimate decides; when they are close, keep one more digit. Rounding the parts of a fraction in opposite directions pushes it in a known direction, which also answers questions about whether an estimate is too big or too small.

[[sqrt-approximation|A square root]] is placed between consecutive integers by their squares, $7^2 = 49 \lt 50 \lt 64$, and refined by $\sqrt{n^2 + k} \approx n + \tfrac{k}{2n}$: $\sqrt{50} \approx 7 + \tfrac{1}{14} \approx 7.07$.

[[disproof-by-counterexample|A claim about every number is disproved by one counterexample]]. The formula $n^2 + n + 41$ gives primes for $n = 0, 1, \ldots, 39$, but at $n = 40$ it gives $1681 = 41^2$. In a multiple-choice question that asks which statement is not always true, test small or extreme values, such as $0$, negative numbers or fractions, until one statement fails.

Estimate before computing, keep track of rounding directions, and test claims with small cases. The Summary (L8.7) collects the chapter's strategies.`,
      related: [
        { card: "digit-count", note: String.raw`estimating the size of a number by its number of digits.` },
        { card: "log-rules", note: String.raw`estimating powers through logarithms (L9.2).` }
      ],
      exercises: [
        { q: String.raw`Which integer is nearest to $\sqrt{50}$?`, answer: "7",
          solution: String.raw`$49 \lt 50 \lt 56.25 = 7.5^2$, so $\sqrt{50}$ is between $7$ and $7.5$; indeed it is about $7.07$.` },
        { q: String.raw`To the nearest hundred, what is $\dfrac{401}{0.198}$?`, answer: "2000",
          solution: String.raw`$\tfrac{400}{0.2} = 2000$; the exact value is about $2025.3$, which rounds to $2000$ to the nearest hundred.` },
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
      body: String.raw`[[trivial-inequality|A square is never negative]], so writing an expression as [[sos-identity|a sum of squares]] plus a constant gives its least value, and a sum of squares equal to $0$ forces every square to be $0$.

[[am-gm|AM-GM]] bounds a sum with a fixed product below and a product with a fixed sum above, with equality when the parts are equal; [[max-product-fixed-sum|parts with a fixed sum]] have the largest product when equal, or as equal as whole numbers allow.

[[median-minimizes-abs|A sum of distances]] on a line is smallest at a median, and [[abs-triangle-inequality|the triangle inequality]] bounds sums and differences of distances.

[[placing-digits-extremes|Extreme numbers go where they count most]], and [[rearrangement|two lists sorted the same way]] give the largest sum of products. [[estimating-answers|Estimates]] rule out choices, and [[disproof-by-counterexample|one counterexample]] disproves a claim about all numbers.`,
      strategies: [
        String.raw`Complete the square, or write the expression as a sum of squares, to find a least value.`,
        String.raw`If a sum of squares equals zero, set each square to zero.`,
        String.raw`For a sum with a constant product, use AM-GM; split terms so that the product is constant.`,
        String.raw`Check the equality case: a bound is the answer only if it can be reached under the problem's conditions.`,
        String.raw`For a sum of absolute values, go to a median.`,
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
        solution: String.raw`$2^{50} = (2^{10})^5 \approx 10^{15}$, and since $2^{10} = 1024$ is a little more than $10^3$, $2^{50}$ is a little more than $10^{15}$, so it has $16$ digits. (It is $1125899906842624$.)` },
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
