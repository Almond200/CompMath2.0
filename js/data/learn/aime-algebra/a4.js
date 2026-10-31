// Learn, AIME Algebra, chapter A4: functions, logs and exponentials (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A4"] = {
  lessons: {
    "A4.1": {
      prereq: ["transforming-equations", "exponent-laws"],
      cards: [],
      body: String.raw`This chapter works with functions as objects: their compositions, inverses and symmetries, the floor and absolute value functions, exponentials and logarithms, functional equations of contest length, and the graphs that count solutions.

A function can be composed with itself or another, and undone by its inverse when it is one-to-one: if $f(x) = 2x + 3$, then $f^{-1}(11) = 4$, the input that gives $11$. An odd function has $f(-x) = -f(x)$ and an even one $f(-x) = f(x)$; such symmetries, and pairings such as $x$ with $1 - x$, let a sum or an equation be halved.

The floor $\lfloor x \rfloor$ is the greatest integer at most $x$, so $\lfloor \sqrt{50} \rfloor = 7$ and $\lfloor -2.5 \rfloor = -3$. The standard move is to name the floor $n$ and write $n \le x \lt n + 1$, which turns an equation with a floor into a few inequalities. Sums of floors are grouped by the stretches on which the floor is constant. Absolute values are handled the same way, by splitting the line at the points where the inside changes sign.

The logarithm is the inverse of the exponential: $\log_b x = y$ means $b^y = x$. Its laws turn products into sums and powers into multiples, and the change of base formula $\log_b x = \tfrac{\log x}{\log b}$ puts every logarithm on one base. An exponential equation is often a quadratic in disguise, in $2^x$ or $\log x$.

A functional equation is solved by substituting well-chosen values or expressions, until a system for the unknown values appears. Last, the number of solutions of an equation is the number of crossings of two graphs, and a sketch often settles it.

The lessons take these ideas in turn: composition, inverses and symmetry (A4.2), piecewise and floor functions (A4.3), exponentials and logarithms (A4.4), functional identities (A4.5), and graphs and the number of solutions (A4.6). The Summary (A4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`If $f(x) = 2x + 3$, find $f^{-1}(11)$.`, answer: "4",
          solution: String.raw`The inverse undoes $f$: $f^{-1}(11)$ is the $x$ with $2x + 3 = 11$, so $x = 4$.` },
        { q: String.raw`Find $\lfloor \sqrt{50} \rfloor + \lfloor -2.5 \rfloor$.`, answer: "4",
          solution: String.raw`Since $7^2 = 49 \le 50 \lt 64$, $\lfloor \sqrt{50} \rfloor = 7$. The greatest integer at most $-2.5$ is $-3$, not $-2$. The sum is $7 - 3 = 4$.` },
        { q: String.raw`Solve $\log_4 x = \tfrac32$.`, answer: "8",
          solution: String.raw`By definition $x = 4^{3/2} = \left(\sqrt4\right)^3 = 8$.` }
      ],
      problems: [
        "2003 AMC 12B, Problem 20",
        "2011 AMC 12A, Problem 19",
        "2000 AIME II, Problem 1"
      ]
    },
    "A4.2": {
      prereq: ["transforming-equations"],
      cards: ["inverse-function-properties", "odd-even-functions", "function-symmetry-equation", "fx-pairing"],
      body: String.raw`A function's symmetries are facts about its values at paired inputs, and writing them as equations is what makes them usable. An even function has $f(-x) = f(x)$; an inverse undoes a function, so $f(f^{-1}(x)) = x$; and a function like $f(x) = \tfrac{4^x}{4^x + 2}$ satisfies $f(x) + f(1 - x) = 1$, which turns the sum $f(\tfrac1{101}) + \cdots + f(\tfrac{100}{101})$ into fifty pairs of $1$, so the sum is $50$.

The [[inverse-function-properties|inverse]] of $f$ is defined by $f^{-1}(b) = a$ exactly when $f(a) = b$, so evaluating an inverse means solving an equation, not finding a formula: for $f(x) = \tfrac{2x + 3}{x - 1}$, $f^{-1}(5)$ is the $x$ with $\tfrac{2x + 3}{x - 1} = 5$, which is $\tfrac83$. The graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$, and composing a function with its inverse in either order gives the identity, an identity whose coefficients can be compared.

A function is [[odd-even-functions|even]] when $f(-x) = f(x)$ and odd when $f(-x) = -f(x)$; for a polynomial these mean only even or only odd powers appear. Adding $P(x)$ and $P(-x)$ cancels the odd terms, so $P(1) + P(-1)$ is twice the sum of the even-power coefficients. Any symmetry of a graph has the same kind of equation: a graph symmetric about the line $x = a$ satisfies $f(a - t) = f(a + t)$, and one symmetric about the point $(a, b)$ satisfies $f(a - t) + f(a + t) = 2b$. Writing [[function-symmetry-equation|the symmetry as an equation]] is what lets it be checked or used.

The point-symmetry equation is behind [[fx-pairing|pairing symmetric terms]], the method of Gauss's sum $1 + 2 + \cdots + 100$ applied to any function. If $f(x) + f(c - x)$ is constant, a sum of $f$ over inputs placed symmetrically about $\tfrac c2$ is that constant times the number of pairs, even when each single term is hopeless to compute.

The signal is a function given by a formula with a question about its inverse, its parity, or a long sum of its values at evenly spaced points.`,
      related: [
        { card: "comparing-coefficients", note: String.raw`turning $f(f^{-1}(x)) = x$ or $f(-x) = f(x)$ into equations on the coefficients (A2.6).` },
        { card: "functional-substitution", note: String.raw`choosing inputs in an identity, the general version of plugging in $-x$ or $1 - x$ (A4.5).` },
        { card: "arithmetic-series", note: String.raw`Gauss's pairing, the model for pairing symmetric terms.` }
      ],
      exercises: [
        { q: String.raw`For $f(x) = \tfrac{2x + 3}{x - 1}$, find $f^{-1}(5)$.`, answer: "8/3",
          solution: String.raw`$f^{-1}(5)$ is the $x$ with $\tfrac{2x + 3}{x - 1} = 5$: $2x + 3 = 5x - 5$, so $x = \tfrac83$. Check: $f(\tfrac83) = \tfrac{25/3}{5/3} = 5$.` },
        { q: String.raw`For $f(x) = \tfrac{4^x}{4^x + 2}$, find $\displaystyle\sum_{k=1}^{100} f\!\left(\tfrac{k}{101}\right)$.`, answer: "50",
          solution: String.raw`$f(1 - x) = \tfrac{4/4^x}{4/4^x + 2} = \tfrac{4}{4 + 2 \cdot 4^x} = \tfrac{2}{4^x + 2}$, so $f(x) + f(1 - x) = \tfrac{4^x + 2}{4^x + 2} = 1$. The terms pair as $k$ and $101 - k$, fifty pairs each adding to $1$, so the sum is $50$.` },
        { q: String.raw`A cubic $P(x) = ax^3 + bx^2 + cx + d$ has $P(1) = 7$ and $P(-1) = 3$. Find $b + d$.`, answer: "5",
          solution: String.raw`Adding cancels the odd-power terms: $P(1) + P(-1) = 2b + 2d = 10$, so $b + d = 5$.` }
      ],
      problems: ["2004 AMC 12B, Problem 13", "2014 AMC 12B, Problem 16", "2021 Fall AMC 10A, Problem 16", "2019 AMC 12B, Problem 8"]
    },
    "A4.3": {
      prereq: ["floor-multiples"],
      cards: ["floor-basics", "name-the-floor", "group-equal-floors", "floor-equation", "floor-sum-range", "abs-value-graphing"],
      body: String.raw`Floors and absolute values break a function into pieces, and the problems built on them are solved by finding the pieces. The equation $x \lfloor x \rfloor = 17$ looks unusual, but on each interval $[n, n + 1)$ the floor is the constant $n$, so the equation is $nx = 17$, and only $n = 4$ gives a solution inside its interval: $x = \tfrac{17}{4}$. Every technique of this lesson is a way of handling one piece at a time.

The [[floor-basics|floor]] $\lfloor x \rfloor$ is the greatest integer at most $x$, and $x = \lfloor x \rfloor + \{x\}$ with $0 \le \{x\} < 1$. To solve an equation with a floor, [[name-the-floor|name it]]: write $n = \lfloor x \rfloor$, solve for $x$ in terms of $n$, and impose $n \le x < n + 1$, which turns the equation into an inequality on the integer $n$. That is the general method for a [[floor-equation|floor equation]], and it is the same move whether the floor is of $x$, of $\sqrt n$, or of a logarithm.

Long sums of floors are reorganized by value. Since $\lfloor \sqrt k \rfloor = m$ for the $2m + 1$ integers from $m^2$ to $(m + 1)^2 - 1$, [[group-equal-floors|grouping equal floors]] turns $\lfloor \sqrt1 \rfloor + \cdots + \lfloor \sqrt{24} \rfloor$ into $1 \cdot 3 + 2 \cdot 5 + 3 \cdot 7 + 4 \cdot 9 = 70$. A [[floor-sum-range|sum of floors over a long range]] is counted the same way: by how many terms take each value, or, for $\lfloor \tfrac{kn}{m} \rfloor$, by counting lattice points under a line.

Absolute values are pieces too, but they are often better seen as geometry. $|x - a|$ is the distance from $x$ to $a$, so $|x - 1| + |x - 3| = 4$ asks for points whose distances to $1$ and $3$ add to $4$, which are $0$ and $4$. In two variables, $|x| + |y| = k$ is a diamond and $|x - y| + |x + y| = 2\max(|x|, |y|)$ is a square, so [[abs-value-graphing|graphing the absolute values]] replaces several sign cases with one picture.

The signal is a floor, a fractional part, or an absolute value in an equation or a sum. Name the integer part or the sign, solve on each piece, and keep only solutions that lie on their own piece.`,
      related: [
        { card: "floor-multiples", note: String.raw`$\lfloor \tfrac nd \rfloor$ counts multiples, the most common floor in number theory (N1.6).` },
        { card: "digit-count", note: String.raw`$\lfloor \log_{10} n \rfloor + 1$ digits, a floor of a logarithm (N6.3).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions of a piecewise equation by its graph (A4.6).` }
      ],
      exercises: [
        { q: String.raw`Find the positive real $x$ with $x \lfloor x \rfloor = 17$.`, answer: "17/4",
          solution: String.raw`Let $n = \lfloor x \rfloor$; then $x = \tfrac{17}{n}$ and $n \le \tfrac{17}{n} < n + 1$, that is $n^2 \le 17 < n^2 + n$. Only $n = 4$ works ($16 \le 17 < 20$), so $x = \tfrac{17}{4}$.` },
        { q: String.raw`Find $\lfloor \sqrt1 \rfloor + \lfloor \sqrt2 \rfloor + \cdots + \lfloor \sqrt{24} \rfloor$.`, answer: "70",
          solution: String.raw`$\lfloor \sqrt k \rfloor = m$ for $2m + 1$ values of $k$: $m = 1$ for $k = 1$ to $3$, $2$ for $4$ to $8$, $3$ for $9$ to $15$, $4$ for $16$ to $24$. The sum is $3 + 10 + 21 + 36 = 70$.` },
        { q: String.raw`Find the sum of all real $x$ with $|x - 1| + |x - 3| = 4$.`, answer: "4",
          solution: String.raw`The left side is the sum of distances from $x$ to $1$ and $3$. Between them it is $2$; outside, it grows by $2$ per unit, reaching $4$ at $x = 0$ and $x = 4$. The solutions add to $4$.` }
      ],
      problems: ["2003 AMC 10B, Problem 7", "2025 AMC 10B, Problem 18", "2021 Fall AMC 10A, Problem 14", "2023 AMC 10B, Problem 22", "2020 AMC 10B, Problem 24", "2018 AMC 10B, Problem 25"]
    },
    "A4.4": {
      prereq: ["exponent-laws"],
      cards: ["log-rules", "change-of-base", "take-logs-linearize", "log-substitution", "log-system"],
      body: String.raw`A logarithm is an exponent: $\log_b x$ is the power of $b$ that gives $x$. Every rule follows from that, and every logarithm problem is solved by moving between the two languages at the right moment. The equation $\log_2 x + \log_4 x + \log_8 x = 11$ looks like three different logarithms, but in base $2$ they are $L$, $\tfrac L2$, and $\tfrac L3$ with $L = \log_2 x$, so $\tfrac{11}{6} L = 11$, $L = 6$, and $x = 64$.

The [[log-rules|logarithm rules]] are the exponent laws read backward: $\log(xy) = \log x + \log y$, $\log \tfrac xy = \log x - \log y$, and $\log x^k = k \log x$, valid for positive $x$ and $y$. [[change-of-base|Change of base]], $\log_b a = \tfrac{\log_c a}{\log_c b}$, puts every logarithm in one base, which is almost always the first step when several bases appear; its special cases $\log_b a = \tfrac{1}{\log_a b}$ and $\log_{b^k} a = \tfrac1k \log_b a$ are the ones used most. With them, $\log_4 8 = \tfrac32$ and $\log_x 8 = \tfrac32$ means $x^{3/2} = 8$, so $x = 4$.

Two strategies come from the definition. [[take-logs-linearize|Taking logarithms]] turns an equation of products and powers, such as $2^x = 3^{x - 1}$ or $a^{\log b} = b^{\log a}$, into a linear one in the logarithms. [[log-substitution|Substituting for a logarithm]], $u = \log_2 x$, turns an equation in logarithms into a polynomial in $u$, where Vieta's formulas can work on the roots directly: the product of the $x$ values is $2$ raised to the sum of the $u$ values. A [[log-system|system of logarithmic equations]] in $x$, $y$, $z$ becomes, with $a = \log x$, $b = \log y$, $c = \log z$, a linear or symmetric system in $a$, $b$, $c$, which is solved by the methods of A1.

Logarithms need positive arguments and a positive base other than $1$, so every solution must be checked against the domain, and squaring or combining logarithms can introduce candidates that fail it.

The signal is any logarithm, an unknown in an exponent, or a product of powers. Put everything in one base, name the logarithms, and solve the algebra that results.`,
      related: [
        { card: "exponent-laws", note: String.raw`the rules for powers that every logarithm rule restates.` },
        { card: "digit-count", note: String.raw`the number of digits as $\lfloor \log_{10} n \rfloor + 1$ (N6.3).` },
        { card: "vietas-quadratic", note: String.raw`after substituting $u = \log x$, the sum of the $u$ roots gives the product of the $x$ roots.` }
      ],
      exercises: [
        { q: String.raw`Solve $\log_2 x + \log_4 x + \log_8 x = 11$.`, answer: "64",
          solution: String.raw`With $L = \log_2 x$: $\log_4 x = \tfrac L2$ and $\log_8 x = \tfrac L3$, so $L(1 + \tfrac12 + \tfrac13) = \tfrac{11}{6}L = 11$, $L = 6$, and $x = 2^6 = 64$.` },
        { q: String.raw`Solve $\log_x 8 = \tfrac32$.`, answer: "4",
          solution: String.raw`By definition $x^{3/2} = 8 = 2^3$, so $x = (2^3)^{2/3} = 4$. The base $4$ is positive and not $1$.` },
        { q: String.raw`Evaluate $\log_2 8 + \log_3 81$.`, answer: "7",
          solution: String.raw`$\log_2 8 = 3$ since $2^3 = 8$, and $\log_3 81 = 4$ since $3^4 = 81$. The sum is $7$.` }
      ],
      problems: ["2021 Spring AMC 12B, Problem 9", "2022 AMC 12B, Problem 16", "1983 AIME, Problem 1", "1984 AIME, Problem 5", "2024 AIME II, Problem 4"]
    },
    "A4.5": {
      prereq: ["comparing-coefficients"],
      cards: ["functional-substitution", "defined-operation"],
      body: String.raw`A functional equation is an identity that holds for every input, and the way to extract information from it is to choose the inputs. If $f(3x - 1) = x^2 + x + 1$ for all $x$, then $f(5)$ is found by choosing $x$ so that $3x - 1 = 5$, that is $x = 2$, which gives $f(5) = 7$. Most contest functional equations are solved by a few such well-chosen substitutions.

The standard choices in [[functional-substitution|functional substitution]] are the values that make an argument simple ($x = 0$, $x = 1$, $y = x$), the values that make two arguments swap, and the values that hit a target. For $f(x) + 2f(\tfrac1x) = 3x$, substituting $x = 2$ and $x = \tfrac12$ gives two linear equations in $f(2)$ and $f(\tfrac12)$: $f(2) + 2f(\tfrac12) = 6$ and $f(\tfrac12) + 2f(2) = \tfrac32$, from which $f(2) = -1$. The same swap applied with a general $x$ solves for $f(x)$ everywhere. An identity like $f(xy) = \tfrac{f(x)}{y}$ is used by choosing $x$ and $y$ with the known value at one side and the target at the other: $f(600) = \tfrac{f(500)}{6/5}$.

A [[defined-operation|newly defined operation]], written with a new symbol and a formula, is a functional equation in disguise. It is evaluated by substituting into the formula, carefully, from the inside out, since such operations are rarely associative or commutative: with $a \oplus b = a + b - ab$, $2 \oplus 3 = -1$. Questions about which inputs give a value, or whether the operation has an identity element, are solved by setting up the equation the definition gives.

The signal is an equation that must hold for all inputs, or a symbol defined by a formula. Choose inputs that make the arguments simple or make two of them swap, and solve the small system that results.`,
      related: [
        { card: "function-symmetry-equation", note: String.raw`symmetries of a graph written as functional equations (A4.2).` },
        { card: "cauchy-functional-equations", note: String.raw`equations like $f(x + y) = f(x) + f(y)$, solved in full in A9.2.` },
        { card: "comparing-coefficients", note: String.raw`when the unknown function is a polynomial, an identity becomes equations on its coefficients (A2.6).` }
      ],
      exercises: [
        { q: String.raw`If $f(3x - 1) = x^2 + x + 1$ for all $x$, find $f(5)$.`, answer: "7",
          solution: String.raw`Choose $x$ with $3x - 1 = 5$: $x = 2$. Then $f(5) = 4 + 2 + 1 = 7$.` },
        { q: String.raw`If $f(x) + 2f(\tfrac1x) = 3x$ for all nonzero $x$, find $f(2)$.`, answer: "-1",
          solution: String.raw`At $x = 2$: $f(2) + 2f(\tfrac12) = 6$. At $x = \tfrac12$: $f(\tfrac12) + 2f(2) = \tfrac32$. From the second, $f(\tfrac12) = \tfrac32 - 2f(2)$; substituting, $f(2) + 3 - 4f(2) = 6$, so $f(2) = -1$.` },
        { q: String.raw`Define $a \oplus b = a + b - ab$. Find $(2 \oplus 3) \oplus 4$.`, answer: "7",
          solution: String.raw`$2 \oplus 3 = 5 - 6 = -1$. Then $(-1) \oplus 4 = -1 + 4 - (-1)(4) = 3 + 4 = 7$.` }
      ],
      problems: ["2022 AMC 10B, Problem 1", "2007 AMC 12B, Problem 9", "2001 AMC 12, Problem 9", "2024 AMC 12A, Problem 13"]
    },
    "A4.6": {
      prereq: ["abs-value-graphing"],
      cards: ["piecewise-graph-counting", "reading-graphs"],
      body: String.raw`Some equations cannot be solved in closed form but can still be counted. The equation $\sin x = \tfrac{x}{10}$ has no algebraic solution, yet it has exactly $7$ real solutions, and the count comes from a picture: the line $y = \tfrac{x}{10}$ crosses the sine wave within the strip where the line stays between $-1$ and $1$, and the crossings can be counted wave by wave. [[piecewise-graph-counting|Counting solutions by graphing]] turns "solve $f(x) = g(x)$" into "count where two graphs meet".

The method is to sketch both sides on a common axis and use what each graph does: where it increases or decreases, where it is bounded, and where it repeats. A bounded side such as a sine or cosine confines the solutions to the range where the other side lies within the bounds; for $\sin x = \tfrac{x}{10}$ that is $|x| \le 10$, about $1.6$ periods on each side of $0$. Monotonic pieces cross at most once, so each interval where both sides are monotonic contributes zero or one solution, decided by comparing the endpoints. Periodic sides repeat their crossings period by period, and only the edge periods need care. For an equation like $|x^2 - 4| = 3$, the graph of $|x^2 - 4|$ is a parabola with its middle folded up, and the horizontal line $y = 3$ crosses it four times.

[[reading-graphs|Reading graphs and tables]] is the reverse skill: extracting a total, a rate, or an average from a given chart. The common error is to read the wrong quantity, a change instead of a level, or a cumulative total instead of a daily one; the cure is to write down what each axis measures before computing anything.

The signal is an equation mixing different kinds of functions (trigonometric with linear, exponential with polynomial), a parameter that changes the number of solutions, or a question asked about a graph or a table. The Summary (A4.7) collects the chapter's strategies.`,
      related: [
        { card: "abs-value-graphing", note: String.raw`folding a graph at the $x$-axis to draw an absolute value (A4.3).` },
        { card: "derivative-extremum", note: String.raw`finding where a function turns, which marks the monotonic pieces (A5.4).` },
        { card: "mean-median-mode", note: String.raw`the averages most often asked about data in a chart.` }
      ],
      exercises: [
        { q: String.raw`How many real solutions does $|x^2 - 4| = 3$ have?`, answer: "4",
          solution: String.raw`Either $x^2 - 4 = 3$, giving $x = \pm\sqrt7$, or $x^2 - 4 = -3$, giving $x = \pm 1$. That is $4$ solutions, the four crossings of $y = 3$ with the folded parabola.` },
        { q: String.raw`How many real solutions does $\sin x = \tfrac{x}{10}$ have?`, answer: "7",
          solution: String.raw`Solutions need $|x| \le 10$. For $x > 0$: on $(0, \pi)$ the line meets the first hump once (besides $x = 0$), on $(2\pi, 3\pi)$ the hump reaches $1$ while the line is between $0.63$ and $0.94$, so it crosses twice, and after $3\pi \approx 9.4$ the line exceeds the next part of the wave where it is positive only beyond $10$. That gives $3$ positive solutions, $3$ negative ones by symmetry, and $x = 0$: $7$ in all.` },
        { q: String.raw`How many real solutions does $|x - 2| = \tfrac{x}{2}$ have?`, answer: "2",
          solution: String.raw`For $x \ge 2$: $x - 2 = \tfrac x2$ gives $x = 4$. For $x < 2$: $2 - x = \tfrac x2$ gives $x = \tfrac43$. Both lie on their pieces, so there are $2$ solutions; the line $y = \tfrac x2$ crosses both arms of the V.` }
      ],
      problems: ["2025 AMC 10A, Problem 9", "2020 AMC 12A, Problem 9", "2021 Spring AMC 12B, Problem 13"]
    },
    "A4.7": {
      prereq: ["inverse-function-properties", "odd-even-functions", "fx-pairing", "name-the-floor", "group-equal-floors", "abs-value-graphing", "log-rules", "change-of-base", "functional-substitution", "piecewise-graph-counting"],
      cards: [],
      body: String.raw`[[inverse-function-properties|An inverse]] undoes a function, and its graph is the reflection in $y = x$. [[odd-even-functions|Odd and even functions]] and [[fx-pairing|pairings]] such as $f(x) + f(1 - x)$ halve a sum or an equation.

[[name-the-floor|Naming the floor]] $n = \lfloor x \rfloor$ with $n \le x \lt n + 1$ turns a floor equation into inequalities, and [[group-equal-floors|grouping equal floors]] sums them. [[abs-value-graphing|Absolute values]] split the line, or the plane, at the points where their insides change sign.

[[log-rules|The logarithm laws]] turn products into sums and powers into multiples, and [[change-of-base|change of base]] puts every logarithm on one base; an exponential equation is often a quadratic in $b^x$.

[[functional-substitution|A functional equation]] is solved by substitutions that produce a system for the unknown values. [[piecewise-graph-counting|The number of solutions]] of an equation is the number of crossings of two graphs.`,
      strategies: [
        String.raw`For an inverse value, solve $f(x) = $ the given value instead of finding $f^{-1}$.`,
        String.raw`If a sum runs over pairs $x$ and $c - x$, pair the terms.`,
        String.raw`For a floor, set $n = \lfloor x \rfloor$ and write $n \le x \lt n + 1$; then solve for $n$ first.`,
        String.raw`For a sum of floors, group the terms on which the floor is constant.`,
        String.raw`Split absolute values at the points where their insides vanish, and solve on each piece.`,
        String.raw`Put every logarithm on one base, and treat $\log x$ or $b^x$ as the unknown.`,
        String.raw`For a functional equation, substitute the values or expressions that make the unknowns repeat, and solve the system.`,
        String.raw`To count solutions, sketch both sides and count the crossings.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A function satisfies $f(x) + 2f(1 - x) = 3x$ for all real $x$. Find $f(4)$.`, answer: "-10",
        solution: String.raw`Replace $x$ by $1 - x$: $f(1 - x) + 2f(x) = 3 - 3x$. Doubling this and subtracting the original equation gives $3f(x) = 6 - 6x - 3x = 6 - 9x$, so $f(x) = 2 - 3x$ and $f(4) = -10$.` },
      { q: String.raw`Find $\sum_{k=1}^{100} \lfloor \sqrt k \rfloor$.`, answer: "625",
        solution: String.raw`The floor equals $n$ for $n^2 \le k \lt (n + 1)^2$, that is, for $2n + 1$ values of $k$, when $n = 1, \ldots, 9$; and it equals $10$ for $k = 100$ only. The sum is $\sum_{n=1}^{9} n(2n + 1) + 10 = 615 + 10 = 625$.` },
      { q: String.raw`Solve $\log_2 x + \log_4 x + \log_{16} x = 7$.`, answer: "16",
        solution: String.raw`Change to base $2$: $\log_4 x = \tfrac12\log_2 x$ and $\log_{16} x = \tfrac14\log_2 x$. So $\tfrac74 \log_2 x = 7$, $\log_2 x = 4$, and $x = 16$.` },
      { q: String.raw`Solve $4^x - 3 \cdot 2^x - 4 = 0$.`, answer: "2",
        solution: String.raw`With $t = 2^x \gt 0$ this is $t^2 - 3t - 4 = (t - 4)(t + 1) = 0$. Since $t \gt 0$, $t = 4$ and $x = 2$.` },
      { q: String.raw`How many real solutions does $|x - 1| + |x - 3| = 4$ have?`, answer: "2",
        solution: String.raw`For $x$ between $1$ and $3$ the left side is $2$. For $x \ge 3$ it is $2x - 4$, which equals $4$ at $x = 4$; for $x \le 1$ it is $4 - 2x$, which equals $4$ at $x = 0$. So there are two solutions, $0$ and $4$.` },
      { q: String.raw`Let $f(x) = x^3 + ax + 5$, and suppose $f(2) = 7$. Find $f(-2)$.`, answer: "3",
        solution: String.raw`The part $x^3 + ax$ is odd, so $f(x) + f(-x) = 10$ for every $x$. Hence $f(-2) = 10 - 7 = 3$.` },
      { q: String.raw`Find the area of the region $|x| + |y| \le 3$.`, answer: "18",
        solution: String.raw`In the first quadrant the region is the triangle $x + y \le 3$, of area $\tfrac92$, and the absolute values reflect it into all four quadrants. The region is a square with diagonals $6$, of area $\tfrac{6 \cdot 6}{2} = 18$.` }
    ],
    problems: [
      "2016 AMC 10B, Problem 21",
      "2014 AMC 12A, Problem 15",
      "1988 AIME, Problem 3",
      "1991 AIME, Problem 6"
    ]
  },
  challenge: {
    problems: [
      "2021 Spring AMC 10A, Problem 19",
      "2002 AIME I, Problem 6",
      "2010 AIME II, Problem 5",
      "2012 AIME I, Problem 9",
      "1985 AIME, Problem 10"
    ]
  }
};
