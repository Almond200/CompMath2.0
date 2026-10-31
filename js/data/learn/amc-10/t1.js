// Learn, AMC 10, chapter T1: the algebra toolkit (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["T1"] = {
  lessons: {
    "T1.1": {
      prereq: [],
      cards: ["difference-of-squares", "square-of-sum", "rationalizing", "completing-the-square"],
      body: String.raw`Most AMC algebra is won or lost in the first line: seeing that an expression factors, that a sum is part of a perfect square, or that a radical can be cleared, instead of multiplying everything out. Computing $\tfrac{100^2 - 7^2}{70^2 - 11^2}$, finding the largest prime factor of $3^8 - 1$, or the smallest value of $x^2 - 8x + 21$ each take one idea and no long arithmetic.

The [[difference-of-squares|difference of squares]] $a^2 - b^2 = (a - b)(a + b)$, with its relatives $a^3 \mp b^3 = (a \mp b)(a^2 \pm ab + b^2)$, is the factorization to look for first. It turns arithmetic into products and splits numbers that look prime: $3^8 - 1 = (3^4 - 1)(3^4 + 1) = 80 \cdot 82 = 2^5 \cdot 5 \cdot 41$, so its largest prime factor is $41$. It also explains why consecutive squares differ by consecutive odd numbers.

The [[square-of-sum|square of a sum]] $(a + b)^2 = a^2 + 2ab + b^2$, and $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$ for three terms, connects a sum, a sum of squares and a sum of products: knowing any two gives the third. [[completing-the-square|Completing the square]] runs it backward, rewriting $x^2 + bx$ as $\left(x + \tfrac b2\right)^2 - \tfrac{b^2}{4}$. So $x^2 - 8x + 21 = (x - 4)^2 + 5$, which is never less than $5$, and $x^2 + 6x + y^2 - 4y = 12$ becomes $(x + 3)^2 + (y - 2)^2 = 25$, a circle of radius $5$.

[[rationalizing|Rationalizing]] multiplies by a conjugate to clear a radical from a denominator: $\tfrac{1}{\sqrt5 - 2} = \sqrt5 + 2$, because $(\sqrt5 - 2)(\sqrt5 + 2) = 1$. It also simplifies sums: each term $\tfrac{1}{\sqrt{k + 1} + \sqrt k}$ equals $\sqrt{k + 1} - \sqrt k$, so a long sum of such terms collapses to its first and last pieces.

Before expanding, look for a difference of squares, a perfect square or a conjugate. The next lesson solves equations and systems.`,
      related: [
        { card: "sfft", note: String.raw`completing a product $xy + x + y + 1 = (x + 1)(y + 1)$ for integer equations (T5.4).` },
        { card: "vertex-form", note: String.raw`completing the square locates the vertex of a parabola (T2.1).` },
        { card: "telescoping", note: String.raw`sums that collapse after rationalizing (T3.4).` }
      ],
      exercises: [
        { q: String.raw`Find the largest prime factor of $3^8 - 1$.`, answer: "41",
          solution: String.raw`$3^8 - 1 = (3^4 - 1)(3^4 + 1) = 80 \cdot 82 = 2^5 \cdot 5 \cdot 41$. The largest prime factor is $41$.` },
        { q: String.raw`Find the smallest value of $x^2 - 8x + 21$.`, answer: "5",
          solution: String.raw`$x^2 - 8x + 21 = (x - 4)^2 + 5$, which is smallest, $5$, at $x = 4$.` }
      ],
      problems: [
        "2006 AMC 10B, Problem 2",
        "2020 AMC 12B, Problem 2",
        "2009 AMC 10A, Problem 11",
        "2022 AMC 10B, Problem 13",
        "2024 AMC 12A, Problem 9",
        "2012 AMC 10A, Problem 22",
        "2021 Fall AMC 12B, Problem 18"
      ]
    },
    "T1.2": {
      prereq: ["square-of-sum"],
      cards: ["linear-elimination", "add-all-equations", "transforming-equations", "symmetric-polynomial-strategies"],
      body: String.raw`Word problems on the AMC turn into small systems of equations, and the fastest solutions find what the question asks for without solving for everything. If the question asks for $x + y$, look for a combination of the equations that gives $x + y$; if the equations are symmetric, add them; if only $x + y$ and $xy$ appear, never find $x$ and $y$ at all.

[[linear-elimination|Elimination]] combines equations so that a variable cancels. From $3x + 2y = 16$ and $x - y = 2$, doubling the second and adding gives $5x = 20$, so $x = 4$, $y = 2$ and $xy = 8$. Name the unknowns so that the equations are short: in a problem about two people's ages or two kinds of coins, one variable per unknown quantity, and one equation per sentence that gives a fact.

When the equations are symmetric or cyclic, [[add-all-equations|adding them all]] often gives the total at once: three equations $x + y = a$, $y + z = b$, $z + x = c$ add to $2(x + y + z) = a + b + c$, and then each variable is the total minus one equation. Multiplying all the equations does the same for products.

Expressions that are symmetric in two variables are functions of $x + y$ and $xy$, and [[symmetric-polynomial-strategies|rewriting them in those]] avoids solving: if $x + y = 7$ and $xy = 12$, then $x^2 + y^2 = 49 - 24 = 25$ and $\tfrac1x + \tfrac1y = \tfrac{7}{12}$.

[[transforming-equations|Transforming equations]] safely means using steps that keep the same solutions. Adding the same thing to both sides, or multiplying by a nonzero number, is always safe; squaring both sides can create false solutions, and dividing by an expression that might be zero can lose real ones. Check every answer in the original problem.

Solve for what is asked, add symmetric equations, use $x + y$ and $xy$, and check. The next lesson simplifies equations with substitutions.`,
      related: [
        { card: "vietas-quadratic", note: String.raw`$x$ and $y$ as the roots of $t^2 - (x + y)t + xy$ (T2.1).` },
        { card: "setting-up-proportions", note: String.raw`translating word problems into equations (T1.5).` },
        { card: "quadratic-formula", note: String.raw`solving the quadratic that a symmetric system produces (T2.1).` }
      ],
      exercises: [
        { q: String.raw`Solve $3x + 2y = 16$ and $x - y = 2$, and give $xy$.`, answer: "8",
          solution: String.raw`Twice the second equation is $2x - 2y = 4$; adding the first gives $5x = 20$, so $x = 4$ and $y = 2$. Then $xy = 8$.` },
        { q: String.raw`If $x + y = 7$ and $xy = 12$, find $x^2 + y^2$.`, answer: "25",
          solution: String.raw`$x^2 + y^2 = (x + y)^2 - 2xy = 49 - 24 = 25$.` }
      ],
      problems: [
        "2014 AMC 10B, Problem 1",
        "2014 AMC 10B, Problem 3",
        "2023 AMC 10B, Problem 5",
        "2015 AMC 10A, Problem 8",
        "2012 AMC 12B, Problem 3",
        "2012 AMC 12A, Problem 6",
        "2008 AMC 10A, Problem 15",
        "2019 AMC 12A, Problem 12"
      ]
    },
    "T1.3": {
      prereq: ["quadratic-formula"],
      cards: ["name-the-whole-expression", "substitute-repeated-block", "repeated-block-equation", "infinite-nest"],
      body: String.raw`A substitution can turn a frightening equation into a quadratic. When the same block of symbols appears more than once, name it; when an expression goes on forever by repeating itself, name the whole thing and notice that it appears inside itself. These two moves solve a large family of AMC problems.

[[substitute-repeated-block|Substituting for a repeated block]]: in $(x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0$, put $u = x^2 - 3x$, so $u^2 - 2u - 8 = 0$ and $u = 4$ or $u = -2$. Then $x^2 - 3x = 4$ gives $x = 4, -1$ and $x^2 - 3x = -2$ gives $x = 1, 2$: four real solutions with sum $6$. The block may be hidden: $(x + 1)(x + 2)(x + 3)(x + 4)$ pairs into $(x^2 + 5x + 4)(x^2 + 5x + 6)$, with block $x^2 + 5x$. An [[repeated-block-equation|equation built around a repeated block]] often has the block both under a radical and outside it, and naming it makes the radical a simple square root of the new variable.

[[name-the-whole-expression|Naming a self-similar expression]] handles infinite repetition. The continued fraction $y = 2 + \cfrac{1}{2 + \cfrac{1}{2 + \cdots}}$ contains itself after the first $2 +$, so $y = 2 + \tfrac1y$, that is $y^2 - 2y - 1 = 0$, and since $y \gt 0$, $y = 1 + \sqrt2$. An [[infinite-nest|infinite nested radical]] works the same way: $y = \sqrt{6 + \sqrt{6 + \cdots}}$ satisfies $y^2 = 6 + y$, so $y = 3$. Always choose the root that fits the sign or size of the expression.

Look for a block that repeats, or an expression that contains itself, and name it. The next lesson treats absolute values and floors.`,
      related: [
        { card: "quadratic-formula", note: String.raw`solving the quadratic the substitution produces (T2.1).` },
        { card: "geometric-series", note: String.raw`an infinite sum that contains a copy of itself (T3.2).` },
        { card: "log-rules", note: String.raw`naming a logarithm as a new variable (T2.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the real solutions of $(x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0$.`, answer: "6",
          solution: String.raw`With $u = x^2 - 3x$, $u^2 - 2u - 8 = (u - 4)(u + 2) = 0$. The equation $x^2 - 3x - 4 = 0$ gives $4, -1$ and $x^2 - 3x + 2 = 0$ gives $1, 2$. The sum is $6$.` },
        { q: String.raw`Find the value of $2 + \cfrac{1}{2 + \cfrac{1}{2 + \cdots}}$.`, answer: "1+sqrt(2)",
          solution: String.raw`Call it $y$. Then $y = 2 + \tfrac1y$, so $y^2 - 2y - 1 = 0$ and $y = 1 \pm \sqrt2$. The value is positive, so $y = 1 + \sqrt2$.` }
      ],
      problems: [
        "2019 AMC 10A, Problem 19",
        "2017 AMC 10B, Problem 24",
        "2020 AMC 12B, Problem 22"
      ]
    },
    "T1.4": {
      prereq: ["trivial-inequality"],
      cards: ["absolute-value-rules", "abs-value-relations", "sign-chart", "abs-value-graphing", "name-the-floor", "group-equal-floors", "floor-equation", "floor-sum-range"],
      body: String.raw`Absolute values and floor functions are piecewise: they follow one rule on part of the number line and another rule elsewhere. Problems with them are solved by finding the points where the rule changes and working one piece at a time. Sign charts do the same for products and quotients.

The [[absolute-value-rules|absolute value]] $|t|$ is the distance from $t$ to $0$: $|t| \lt c$ means $-c \lt t \lt c$, and $|x - a|$ is the distance from $x$ to $a$. An equation such as $|x - 3| + |x + 1| = 6$ splits at $x = 3$ and $x = -1$; on each piece it is linear, and the solutions are $x = 4$ and $x = -2$. Thinking in distances is often faster: the sum of the distances to $3$ and $-1$ is $4$ between them and grows by $2$ for each unit beyond, so it reaches $6$ one unit outside on each side. [[abs-value-graphing|Graphs of absolute values]] are made of straight pieces with corners at the switch points, and [[abs-value-relations|relations]] like $|x| + |y| \le 3$ are polygons, here a square turned $45^\circ$.

A [[sign-chart|sign chart]] solves inequalities like $\tfrac{(x - 1)(x - 4)}{x + 2} \le 0$: mark the zeros of each factor, and the sign alternates from interval to interval (unless a factor is squared). Read off the intervals with the right sign, and keep the denominator's zeros out.

The floor $\lfloor x \rfloor$ is the greatest integer at most $x$. To solve equations with floors, [[name-the-floor|name the floor]] $n = \lfloor x \rfloor$ and write $x = n + f$ with $0 \le f \lt 1$; a [[floor-equation|floor equation]] then becomes a condition on the integer $n$ and the fraction $f$. For $\lfloor x \rfloor + \lfloor 2x \rfloor = 7$, the left side is $3n$ or $3n + 1$ depending on whether $f \lt \tfrac12$, so $3n + 1 = 7$ gives $n = 2$ and $\tfrac52 \le x \lt 3$. Sums of floors are done by [[group-equal-floors|grouping the terms with equal floors]]: $\lfloor\sqrt k\rfloor$ is $1$ for $k = 1$ to $3$, $2$ for $4$ to $8$, $3$ for $9$ to $15$, so the sum for $k = 1$ to $15$ is $3 + 10 + 21 = 34$. The [[floor-sum-range|range of a floor sum]] is limited, which bounds which values can occur.

Split at the switch points, chart the signs, and name the floor. The next lesson sets up word problems.`,
      related: [
        { card: "median-minimizes-abs", note: String.raw`the smallest value of a sum of distances (T2.5).` },
        { card: "piecewise-graph-counting", note: String.raw`counting intersections of piecewise graphs (T2.3).` },
        { card: "floor-multiples", note: String.raw`$\left\lfloor \tfrac nk \right\rfloor$ counts multiples of $k$ (T4.3).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $|x - 3| + |x + 1| = 6$.`, answer: "2",
          solution: String.raw`Between $-1$ and $3$ the left side is $4$. For $x \gt 3$ it is $2x - 2 = 6$, so $x = 4$; for $x \lt -1$ it is $-2x + 2 = 6$, so $x = -2$. The sum is $2$.` },
        { q: String.raw`Find the smallest $x$ with $\lfloor x \rfloor + \lfloor 2x \rfloor = 7$.`, answer: "5/2",
          solution: String.raw`With $x = n + f$, $\lfloor 2x \rfloor$ is $2n$ if $f \lt \tfrac12$ and $2n + 1$ otherwise, so the sum is $3n$ or $3n + 1$. Only $3n + 1 = 7$ works, so $n = 2$ and $f \ge \tfrac12$: $\tfrac52 \le x \lt 3$. The smallest is $\tfrac52$.` },
        { q: String.raw`Find $\lfloor\sqrt1\rfloor + \lfloor\sqrt2\rfloor + \cdots + \lfloor\sqrt{15}\rfloor$.`, answer: "34",
          solution: String.raw`The floor is $1$ for $k = 1, 2, 3$, $2$ for $k = 4, \ldots, 8$ and $3$ for $k = 9, \ldots, 15$: $3 \cdot 1 + 5 \cdot 2 + 7 \cdot 3 = 34$.` }
      ],
      problems: [
        "2021 Spring AMC 10B, Problem 1",
        "2020 AMC 10A, Problem 5",
        "2012 AMC 10B, Problem 8",
        "2000 AMC 12, Problem 5",
        "2005 AMC 12B, Problem 7",
        "2023 AMC 12A, Problem 10",
        "2016 AMC 10B, Problem 21",
        "2014 AMC 12A, Problem 21"
      ]
    },
    "T1.5": {
      prereq: ["linear-elimination"],
      cards: ["work-rates", "time-per-leg", "average-speed", "relative-motion", "averages-to-totals", "weighted-average", "mean-median-mode", "percent-change", "setting-up-proportions", "several-rates", "averages-before-after", "age-problems", "scoring-rules", "break-even-plans"],
      body: String.raw`The first ten problems of every AMC 10 include word problems about rates, averages, percents and ages. They are easy points when set up well and costly when a common mistake slips in: averaging speeds, adding percents, or confusing an average with a total. A few setups handle nearly all of them.

Rates multiply by time. [[work-rates|Work rates]] add: two pipes filling a tank in $4$ and $6$ hours fill $\tfrac14 + \tfrac16 = \tfrac{5}{12}$ of it per hour, so together they take $\tfrac{12}{5}$ hours. For a trip in pieces, [[time-per-leg|add the time of each leg]], and [[average-speed|average speed]] is total distance over total time, never the average of the speeds. [[relative-motion|Relative motion]] measures from one mover: a car at $80$ miles per hour chasing one at $60$ that left an hour earlier gains $20$ miles per hour on a $60$-mile gap, so it catches up in $3$ hours. When several people or machines work at once, a table of rate, time and amount for each keeps [[several-rates|several rates]] straight.

Averages are totals divided by counts, so [[averages-to-totals|turn averages into totals]] before combining. [[averages-before-after|Averages before and after]] a change compare totals: if adding one score raises an average, the new score minus the old average equals the number of scores times the rise. A [[weighted-average|weighted average]] mixes groups in proportion to their sizes; mixing $10$ liters of a $20\%$ solution with $5$ liters of $50\%$ gives $30\%$. The [[mean-median-mode|mean, median and mode]] answer different questions, and problems often fix two and ask for the third.

[[percent-change|Percent changes]] multiply: up $20\%$ then down $20\%$ is a factor $1.2 \cdot 0.8 = 0.96$. [[setting-up-proportions|Proportions]] scale quantities that vary together. [[age-problems|Age problems]] use that differences of ages never change. [[scoring-rules|Scoring rules]] and [[break-even-plans|pricing plans]] are linear: write the score or cost as a function of the counts and compare.

Name the quantities, write one equation per fact, and check the answer against the story. The next chapter studies quadratics and functions.`,
      related: [
        { card: "linear-elimination", note: String.raw`solving the equations a word problem produces (T1.2).` },
        { card: "geometric-series", note: String.raw`repeated percent changes (T3.2).` },
        { card: "mean-chain", note: String.raw`why the average speed is a harmonic mean (W3.3).` }
      ],
      exercises: [
        { q: String.raw`A car leaves town at $60$ miles per hour. One hour later a second car leaves the same town on the same road at $80$ miles per hour. How many hours after it leaves does the second car catch the first?`, answer: "3",
          solution: String.raw`When the second car leaves, the first is $60$ miles ahead. The gap closes at $80 - 60 = 20$ miles per hour, so it closes in $\tfrac{60}{20} = 3$ hours.` },
        { q: String.raw`How many liters of a $50\%$ acid solution must be added to $10$ liters of a $20\%$ solution to make a $30\%$ solution?`, answer: "5",
          solution: String.raw`The acid totals $0.2 \cdot 10 + 0.5x = 0.3(10 + x)$, so $2 + 0.5x = 3 + 0.3x$ and $x = 5$.` }
      ],
      problems: [
        "2023 AMC 10A, Problem 1",
        "2025 AMC 10A, Problem 4",
        "2017 AMC 10B, Problem 7",
        "2021 Fall AMC 10B, Problem 9",
        "2008 AMC 10A, Problem 11",
        "2022 AMC 12A, Problem 6",
        "2014 AMC 10A, Problem 15",
        "2008 AMC 10B, Problem 18"
      ]
    }
  }
};
