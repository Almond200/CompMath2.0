// Learn, AMC Algebra, chapter L4: functions, graphs, absolute values and floors (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L4"] = {
  lessons: {
    "L4.1": {
      prereq: ["transforming-equations"],
      cards: [],
      body: String.raw`This chapter treats a function as a rule that takes an input and gives one output, and studies the rules the AMC likes best: operations defined in the problem, inverses and symmetric functions, graphs, absolute values and floors.

A function $f$ assigns to each allowed input $x$ one output $f(x)$. If $f(x) = 2x + 1$, then $f(3) = 7$, and applying $f$ again gives $f(f(3)) = f(7) = 15$. A problem may also define its own operation, such as $a \star b = 2a - b$, and the only thing to do is follow the definition exactly, working from the innermost brackets out.

A graph draws a function as the points $(x, f(x))$. The steepness of a line, its slope, is the rise over the run, and on a graph of distance against time the slope is the speed. The number of solutions of an equation $f(x) = g(x)$ is the number of points where the two graphs cross, which a sketch often settles faster than algebra.

The absolute value $|x|$ is the distance from $x$ to $0$, so $|-7| = 7$ and $|3 - 10| = 7$. The floor $\lfloor x \rfloor$ is the greatest integer at most $x$, so $\lfloor 3.7 \rfloor = 3$ but $\lfloor -3.7 \rfloor = -4$. Both are piecewise functions, given by different formulas on different pieces of the line, and both are handled by splitting into those pieces.

The lessons take these ideas in turn: functions and defined operations (L4.2), reading graphs and slopes (L4.3), absolute value (L4.4), counting solutions with a graph (L4.5), and floors and ceilings (L4.6). The Summary (L4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`If $f(x) = 2x + 1$, find $f(f(3))$.`, answer: "15",
          solution: String.raw`Work from the inside: $f(3) = 7$, then $f(7) = 15$.` },
        { q: String.raw`Find $|-7| - |3 - 10|$.`, answer: "0",
          solution: String.raw`Both are distances from $0$: $|-7| = 7$ and $|3 - 10| = |-7| = 7$. The difference is $0$.` },
        { q: String.raw`Find $\lfloor 3.7 \rfloor + \lfloor -3.7 \rfloor$.`, answer: "-1",
          solution: String.raw`$\lfloor 3.7 \rfloor = 3$, and the greatest integer at most $-3.7$ is $-4$. The sum is $-1$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 6",
        "2022 AMC 10A, Problem 6",
        "2003 AMC 10B, Problem 7"
      ]
    },
    "L4.2": {
      prereq: ["transforming-equations"],
      cards: ["defined-operation", "inverse-function-properties", "odd-even-functions"],
      body: String.raw`A function is a rule, and many AMC problems are about following a rule carefully or undoing it. An operation $a \star b = 2a - b$ is defined in the problem and applied twice; an inverse function is asked for at one point; a function is known to be odd, and its value at $-2$ is wanted from its value at $2$. Each is short once the definition is used exactly as written.

A function $f$ gives each input exactly one output, and composing two functions applies one and then the other: $f(g(x))$ means $g$ first. A [[defined-operation|defined operation]] is a function of two inputs given by a formula in the problem; apply it from the innermost brackets out, and do not assume it is commutative or associative unless you check. With $a \star b = 2a - b$: $3 \star 4 = 2$, and $2 \star 5 = -1$, so $(3 \star 4) \star 5 = -1$, while $3 \star (4 \star 5) = 3 \star 3 = 3$.

The inverse $f^{-1}$ undoes $f$: $f^{-1}(y)$ is the input that $f$ sends to $y$. [[inverse-function-properties|To find one value of the inverse]], solve $f(x) = y$ instead of finding a formula: for $f(x) = \tfrac{x + 1}{x - 2}$, $f^{-1}(3)$ solves $\tfrac{x + 1}{x - 2} = 3$, so $x + 1 = 3x - 6$ and $x = \tfrac72$. Composing a function with its inverse gives back the input, $f(f^{-1}(x)) = x$, which turns a condition on an inverse into equations for coefficients. The graph of $f^{-1}$ is the graph of $f$ reflected in the line $y = x$.

A function is even if $f(-x) = f(x)$ for every $x$, like $x^2$, and odd if $f(-x) = -f(x)$, like $x^3$. [[odd-even-functions|These symmetries]] halve the work: if $f$ is odd and $f(2) = 5$, then $f(-2) = -5$; and if $g(x) = f(x) + 3$ with $f$ odd, then $g(x) + g(-x) = 6$, so $g(-2) = 6 - g(2) = -2$. A polynomial is even when all its powers are even and odd when all are odd.

Read every function and operation literally, compute from the inside out, solve an equation for a single inverse value, and look for odd or even parts that cancel. The next lesson reads information from graphs.`,
      related: [
        { card: "functional-substitution", note: String.raw`equations that a function must satisfy for all inputs (L11.2).` },
        { card: "fx-pairing", note: String.raw`pairing $f(x)$ with $f(c - x)$ to sum many values (L11.2).` }
      ],
      exercises: [
        { q: String.raw`Let $a \star b = 2a - b$. Find $(3 \star 4) \star 5$.`, answer: "-1",
          solution: String.raw`Inside first: $3 \star 4 = 6 - 4 = 2$. Then $2 \star 5 = 4 - 5 = -1$.` },
        { q: String.raw`Let $f(x) = \dfrac{x + 1}{x - 2}$. Find $f^{-1}(3)$.`, answer: "7/2",
          solution: String.raw`Solve $f(x) = 3$: $x + 1 = 3(x - 2)$, so $2x = 7$ and $x = \tfrac72$. Check: $\tfrac{9/2}{3/2} = 3$.` },
        { q: String.raw`A function $f$ is odd, and $g(x) = f(x) + 3$. If $g(2) = 8$, find $g(-2)$.`, answer: "-2",
          solution: String.raw`From $g(2) = 8$, $f(2) = 5$, so $f(-2) = -5$ and $g(-2) = -5 + 3 = -2$.` }
      ],
      problems: [
        "2004 AMC 12B, Problem 13",
        "2003 AMC 12B, Problem 20",
        "2003 AMC 10B, Problem 13",
        "2011 AMC 10B, Problem 15",
        "2023 AMC 12B, Problem 12"
      ]
    },
    "L4.3": {
      prereq: [],
      cards: ["reading-graphs", "slope-to-a-point"],
      body: String.raw`Some problems give their data as a graph or a chart: a distance-time graph of a race, a bar chart of daily changes, a plot of prices against weights. The answer comes from reading the picture correctly, and the most useful reading is the slope, which turns a graph into a rate.

[[reading-graphs|To read a graph]], first read its axes: what each one measures and in what units, where it starts, and whether the chart shows amounts or changes. A chart of daily changes in a score must be added up before the scores themselves are averaged. Flat stretches mean nothing changes, steeper stretches mean faster change, and two curves crossing means the two quantities are equal at that moment.

The slope of the line through $(x_1, y_1)$ and $(x_2, y_2)$ is $\tfrac{y_2 - y_1}{x_2 - x_1}$, the rise over the run: through $(1, 2)$ and $(4, 11)$ it is $\tfrac{9}{3} = 3$. On a distance-time graph the slope is the speed: $60$ miles in $1.5$ hours is $40$ mph. On a graph of total cost against amount, the slope from the origin to a point is the price per unit, so [[slope-to-a-point|the best buy is the point whose line from the origin is least steep]]. In general, a ratio $\tfrac yx$ is the slope of the segment from $(0, 0)$ to $(x, y)$, which lets a comparison of ratios be done by eye.

Read the axes and units first, convert every question about a rate into a question about a slope, and compare steepness instead of computing when only an order is asked. The next lesson turns to absolute value.`,
      related: [
        { card: "line-forms", note: String.raw`the equation of a line from its slope and a point.` },
        { card: "average-speed", note: String.raw`total distance over total time, the slope from the start to the end of a trip (L2.4).` }
      ],
      exercises: [
        { q: String.raw`Find the slope of the line through $(1, 2)$ and $(4, 11)$.`, answer: "3",
          solution: String.raw`The rise is $11 - 2 = 9$ and the run is $4 - 1 = 3$, so the slope is $3$.` },
        { q: String.raw`A distance-time graph shows a cyclist $60$ miles from the start after $1.5$ hours, moving at a steady speed from the start. What is the speed, in mph?`, answer: "40",
          solution: String.raw`The speed is the slope: $\tfrac{60}{1.5} = 40$ miles per hour.` },
        { q: String.raw`Three packages cost $\$6$ for $4$ ounces, $\$9$ for $5$ ounces and $\$10$ for $8$ ounces. Which is the cheapest per ounce, by its cost per ounce in dollars?`, answer: "5/4",
          solution: String.raw`The costs per ounce, the slopes from the origin, are $\tfrac64 = 1.5$, $\tfrac95 = 1.8$ and $\tfrac{10}{8} = 1.25$. The third is cheapest, at $\tfrac54$ dollars per ounce.` }
      ],
      problems: [
        "2022 AMC 8, Problem 15",
        "2020 AMC 8, Problem 11",
        "2024 AMC 10A, Problem 12"
      ]
    },
    "L4.4": {
      prereq: ["transforming-equations"],
      cards: ["absolute-value-rules", "abs-value-relations", "absolute-value-identities", "sign-chart", "abs-value-graphing"],
      body: String.raw`Absolute values appear in equations, inequalities and regions of the plane. How many solutions has $|2x - 3| = 7$? How many integers satisfy $|x - 1| \lt 3$? Where is $(x - 1)(x - 3)(x + 2)$ negative? What region does $|x| + |y| \le 3$ describe? Each is settled by one idea: an absolute value is a distance, and it is removed by splitting into the cases where its inside is positive or negative.

The absolute value $|a|$ is the distance from $a$ to $0$, and $|a - b|$ is the distance between $a$ and $b$. [[absolute-value-rules|The rules]] follow: $|a| = a$ if $a \ge 0$ and $-a$ if $a \lt 0$; $\sqrt{a^2} = |a|$, not $a$; $|ab| = |a||b|$. So $|2x - 3| = 7$ means $2x - 3 = 7$ or $2x - 3 = -7$, that is, $x = 5$ or $x = -2$. An inequality $|x - 1| \lt 3$ says $x$ is within $3$ of $1$, so $-2 \lt x \lt 4$, with the integers $-1, 0, 1, 2, 3$. [[abs-value-relations|Relations]] such as $|a + b| \le |a| + |b|$ and $|a| = |b|$ meaning $a = \pm b$ shorten many cases, and [[absolute-value-identities|identities]] such as $|a| + |b| = |a + b|$ exactly when $a$ and $b$ have the same sign (or one is $0$) decide when equality holds.

When an expression with several absolute values or factors must be positive or negative, mark the points where each piece changes sign and test one value in each interval: this is [[sign-chart|a sign chart]]. For $(x - 1)(x - 3)(x + 2)$ the points are $-2$, $1$, $3$; the product is negative for $x \lt -2$ and for $1 \lt x \lt 3$.

[[abs-value-graphing|The graph]] of $y = |x - a|$ is a V with its corner at $x = a$, and a sum of absolute values is a broken line with corners at the points where each inside vanishes. In the plane, $|x| + |y| \le 3$ is a square with corners on the axes at distance $3$, because the absolute values reflect the first-quadrant triangle $x + y \le 3$ into all four quadrants.

Split at the points where the insides vanish, solve on each piece, and keep only the solutions that lie in their piece. The next lesson counts solutions with graphs.`,
      related: [
        { card: "median-minimizes-abs", note: String.raw`a sum of distances on the number line is smallest at a median (L8.4).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions where piecewise graphs cross (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $|2x - 3| = 7$.`, answer: "3",
          solution: String.raw`Either $2x - 3 = 7$, so $x = 5$, or $2x - 3 = -7$, so $x = -2$. The sum is $3$.` },
        { q: String.raw`How many integers satisfy $|x - 1| \lt 3$?`, answer: "5",
          solution: String.raw`The condition says $x$ is less than $3$ from $1$: $-2 \lt x \lt 4$. The integers are $-1, 0, 1, 2, 3$, five of them.` },
        { q: String.raw`For how many integers $x$ from $-5$ to $5$ is $(x - 1)(x - 3)(x + 2) \lt 0$?`, answer: "4",
          solution: String.raw`The factors change sign at $-2$, $1$, $3$. Testing one point in each interval, the product is negative for $x \lt -2$ and for $1 \lt x \lt 3$. The integers are $-5, -4, -3$ and $2$: four.` },
        { q: String.raw`Find the area enclosed by $y = |x|$ and $y = 4$.`, answer: "16",
          solution: String.raw`The V meets the line at $(\pm 4, 4)$, enclosing a triangle with base $8$ and height $4$: area $16$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 10",
        "2011 AMC 10B, Problem 19",
        "2023 AMC 10B, Problem 12",
        "2023 AMC 10B, Problem 13",
        "2011 AMC 12A, Problem 18"
      ]
    },
    "L4.5": {
      prereq: ["abs-value-graphing", "reading-graphs"],
      cards: ["piecewise-graph-counting"],
      body: String.raw`Some equations cannot be solved exactly, but the question only asks how many solutions they have. How many real solutions has $x^2 = 2^x$? How many times does a wave cross a line? How many values of $x$ give $f(f(x)) = 6$ when $f$ is given by a graph? The answer is the number of crossings of two graphs, and a careful sketch counts them.

[[piecewise-graph-counting|Counting solutions with a graph]] rewrites the equation as $f(x) = g(x)$, with each side simple to draw, and counts the points where the graphs meet. For $x^2 = 2^x$, the parabola and the exponential cross at $x = 2$ and $x = 4$, and once more at a negative $x$, where $2^x$ is small and positive while $x^2$ grows: three solutions. To be sure no crossing is missed, check the behavior far to the left and right, and which graph is above at a few points.

For a composition such as $f(f(x)) = 6$, work from the outside in: first find the values $y$ with $f(y) = 6$, then count the solutions of $f(x) = y$ for each, by drawing horizontal lines across the graph. Each horizontal line $y = c$ meets the graph once for each solution of $f(x) = c$.

Piecewise functions, absolute values and floors are drawn piece by piece; a sum of absolute values such as $|x - 1| + |x + 1|$ is flat at $2$ between $-1$ and $1$ and rises on either side, so it equals $3$ exactly twice. Sine and cosine waves are counted the same way, period by period, once they appear in L12.

When only the number of solutions is asked, draw both sides, check the ends and a few test points, and count. The next lesson turns to floors.`,
      related: [
        { card: "vertex-form", note: String.raw`where a parabola lies relative to a line (L3.4).` },
        { card: "inverse-function-properties", note: String.raw`solving $f(x) = y$ for each needed $y$ (L4.2).` }
      ],
      exercises: [
        { q: String.raw`How many real solutions does $|x| = x^2 - 2$ have?`, answer: "2",
          solution: String.raw`With $t = |x| \ge 0$, $t^2 - t - 2 = (t - 2)(t + 1) = 0$, so $t = 2$ and $x = \pm 2$. On a graph, the V meets the parabola twice.` },
        { q: String.raw`How many real solutions does $x^2 = 2^x$ have?`, answer: "3",
          solution: String.raw`The graphs cross at $x = 2$ and $x = 4$. For negative $x$, $2^x$ lies between $0$ and $1$ while $x^2$ grows from $0$, so they cross once more. Beyond $x = 4$, $2^x$ stays above. Three solutions.` },
        { q: String.raw`How many real solutions does $|x - 1| + |x + 1| = 3$ have?`, answer: "2",
          solution: String.raw`The left side is $2$ for $-1 \le x \le 1$, $2x$ for $x \gt 1$ and $-2x$ for $x \lt -1$. It equals $3$ at $x = \tfrac32$ and $x = -\tfrac32$: two solutions.` }
      ],
      problems: [
        "2002 AMC 12A, Problem 19",
        "2020 AMC 12A, Problem 9",
        "2021 Spring AMC 12B, Problem 13",
        "2012 AMC 12A, Problem 25"
      ]
    },
    "L4.6": {
      prereq: [],
      cards: ["floor-basics", "name-the-floor", "group-equal-floors", "floor-equation", "floor-sum-range"],
      body: String.raw`The floor function rounds down to an integer, and it turns up in counting, in sums and in equations. Solve $\lfloor x \rfloor + x = 8.5$. Find $\lfloor \tfrac13 \rfloor + \lfloor \tfrac23 \rfloor + \cdots + \lfloor \tfrac{30}{3} \rfloor$. How many integers $x$ have $\lfloor \sqrt x \rfloor = 4$? The floor is hard to handle directly, but it is constant on each stretch between integers, and every method uses that.

[[floor-basics|The floor]] $\lfloor x \rfloor$ is the greatest integer at most $x$, and the ceiling $\lceil x \rceil$ the least integer at least $x$; the fractional part is $\{x\} = x - \lfloor x \rfloor$, between $0$ and $1$. So $\lfloor 2.5 \rfloor = 2$, $\lfloor -2.5 \rfloor = -3$, and $\lfloor x \rfloor + \lfloor -x \rfloor$ is $0$ for integers and $-1$ otherwise. The number of multiples of $k$ from $1$ to $n$ is $\lfloor \tfrac nk \rfloor$.

[[name-the-floor|To solve an equation with a floor]], give the floor a name: $n = \lfloor x \rfloor$, with $n \le x \lt n + 1$, so $x = n + f$ where $0 \le f \lt 1$. Then $\lfloor x \rfloor + x = 8.5$ becomes $2n + f = 8.5$; since $n$ is an integer and $0 \le f \lt 1$, $f = 0.5$ and $n = 4$, so $x = 4.5$. [[floor-equation|Floor equations]] in general are solved this way: an integer unknown, an inequality for it, then a check.

[[group-equal-floors|A sum of floors]] is computed by grouping the terms with the same value. $\lfloor \tfrac k3 \rfloor$ is $0$ for $k = 1, 2$, then $1$ for $k = 3, 4, 5$, and so on up to $9$ for $k = 27, 28, 29$, and $10$ for $k = 30$; the sum is $3(1 + 2 + \cdots + 9) + 10 = 145$. Similarly $\lfloor \sqrt x \rfloor = 4$ exactly for $16 \le x \le 24$, nine integers. [[floor-sum-range|The range of a floor expression]], which values it takes as $x$ varies, is found by watching where each floor jumps.

Name the floor, turn the equation into inequalities for an integer, and group equal terms in a sum. The Summary (L4.7) collects the chapter's strategies.`,
      related: [
        { card: "legendres-formula", note: String.raw`a sum of floors that counts the factors of a prime in $n!$.` },
        { card: "round-up-whole-items", note: String.raw`ceilings in word problems, such as the number of boxes needed (L2.6).` }
      ],
      exercises: [
        { q: String.raw`Solve $\lfloor x \rfloor + x = 8.5$.`, answer: "4.5",
          solution: String.raw`Write $x = n + f$ with $n = \lfloor x \rfloor$ and $0 \le f \lt 1$. Then $2n + f = 8.5$, so $f = 0.5$ and $n = 4$: $x = 4.5$. Check: $4 + 4.5 = 8.5$.` },
        { q: String.raw`Find $\sum_{k=1}^{30} \left\lfloor \dfrac k3 \right\rfloor$.`, answer: "145",
          solution: String.raw`The floor is $m$ for the three values $k = 3m, 3m + 1, 3m + 2$ when $1 \le m \le 9$, it is $0$ for $k = 1, 2$, and $10$ for $k = 30$. The sum is $3(1 + \cdots + 9) + 10 = 135 + 10 = 145$.` },
        { q: String.raw`How many integers $x$ have $\lfloor \sqrt x \rfloor = 4$?`, answer: "9",
          solution: String.raw`We need $4 \le \sqrt x \lt 5$, that is, $16 \le x \lt 25$: the integers $16$ to $24$, nine of them.` }
      ],
      problems: [
        "2019 AMC 10B, Problem 9",
        "2011 AMC 12A, Problem 19",
        "2025 AMC 10B, Problem 18",
        "2021 Fall AMC 10A, Problem 16",
        "2002 AMC 10A, Problem 22"
      ]
    },
    "L4.7": {
      prereq: ["defined-operation", "inverse-function-properties", "odd-even-functions", "reading-graphs", "slope-to-a-point", "absolute-value-rules", "sign-chart", "abs-value-graphing", "piecewise-graph-counting", "name-the-floor", "group-equal-floors"],
      cards: [],
      body: String.raw`A function gives each input one output; [[defined-operation|a defined operation]] is followed exactly, from the inside out. [[inverse-function-properties|One value of an inverse]] is found by solving $f(x) = y$, and [[odd-even-functions|odd and even functions]] relate $f(-x)$ to $f(x)$.

[[reading-graphs|A graph]] is read through its axes and units, and a rate is a slope; [[slope-to-a-point|a ratio $\tfrac yx$]] is the slope from the origin to $(x, y)$.

[[absolute-value-rules|An absolute value]] is a distance, removed by splitting where its inside changes sign. [[sign-chart|A sign chart]] decides where a product is positive, and [[abs-value-graphing|the graph]] of a sum of absolute values is a broken line with corners at those points.

[[piecewise-graph-counting|The number of solutions]] of $f(x) = g(x)$ is the number of crossings of the graphs. [[name-the-floor|A floor is named]] $n$ with $n \le x \lt n + 1$, and [[group-equal-floors|a sum of floors]] is grouped by equal values.`,
      strategies: [
        String.raw`Apply a defined operation exactly as written, innermost first, and do not assume it is commutative.`,
        String.raw`For a value of an inverse, solve $f(x) = y$.`,
        String.raw`Look for an odd part of a function that cancels in $f(x) + f(-x)$.`,
        String.raw`Read a graph's axes and units first; turn every rate into a slope.`,
        String.raw`Split absolute values at the points where their insides vanish, and keep only the solutions in each piece.`,
        String.raw`For where a product is positive or negative, make a sign chart.`,
        String.raw`To count solutions, draw both sides and count crossings, checking the far ends.`,
        String.raw`For a floor, set $n = \lfloor x \rfloor$ with $n \le x \lt n + 1$, and solve for the integer $n$ first.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Let $f(x) = 3x - 4$ and $g(x) = x^2$. Find $f(g(2)) - g(f(2))$.`, answer: "4",
        solution: String.raw`$f(g(2)) = f(4) = 8$ and $g(f(2)) = g(2) = 4$. The difference is $4$.` },
      { q: String.raw`Find the sum of the solutions of $|x + 2| + |x - 4| = 10$.`, answer: "2",
        solution: String.raw`Between $-2$ and $4$ the left side is $6$. For $x \gt 4$ it is $2x - 2 = 10$, so $x = 6$; for $x \lt -2$ it is $-2x + 2 = 10$, so $x = -4$. The sum is $2$.` },
      { q: String.raw`Find $\lfloor 2.5 \rfloor \cdot \lfloor -2.5 \rfloor$.`, answer: "-6",
        solution: String.raw`$\lfloor 2.5 \rfloor = 2$ and $\lfloor -2.5 \rfloor = -3$, so the product is $-6$.` },
      { q: String.raw`For how many nonnegative integers $n$ is $\lfloor \tfrac n2 \rfloor = \lfloor \tfrac n3 \rfloor$?`, answer: "3",
        solution: String.raw`Since $\lfloor \tfrac n2 \rfloor \ge \tfrac{n - 1}{2}$ and $\lfloor \tfrac n3 \rfloor \le \tfrac n3$, the difference of the floors is at least $\tfrac{n - 1}{2} - \tfrac n3 = \tfrac{n - 3}{6}$, which is positive for $n \gt 3$. So only $n = 0, 1, 2, 3$ can work; checking them, $n = 0, 1, 3$ do and $n = 2$ does not ($1 \ne 0$). There are $3$.` },
      { q: String.raw`Let $f(x) = x^3 + 1$. Find $f^{-1}(28)$.`, answer: "3",
        solution: String.raw`Solve $x^3 + 1 = 28$: $x^3 = 27$, so $x = 3$.` },
      { q: String.raw`Find the area of the region $|x| + |y| \le 2$.`, answer: "8",
        solution: String.raw`It is a square with corners $(\pm 2, 0)$ and $(0, \pm 2)$, whose diagonals have length $4$. Its area is $\tfrac{4 \cdot 4}{2} = 8$.` },
      { q: String.raw`An even function $f$ has $f(x) = x^2 - 4x$ for $x \ge 0$. Find $f(-3)$.`, answer: "-3",
        solution: String.raw`Since $f$ is even, $f(-3) = f(3) = 9 - 12 = -3$.` }
    ],
    problems: [
      "2022 AMC 12A, Problem 5",
      "2016 AMC 10B, Problem 14"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 10B, Problem 22",
      "2003 AMC 12B, Problem 24",
      "2010 AMC 12A, Problem 24",
      "2025 AMC 12A, Problem 25"
    ]
  }
};
