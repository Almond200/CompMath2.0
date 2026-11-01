// Learn, AMC Algebra, chapter L11: functional equations, recurrences and inequalities (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L11"] = {
  lessons: {
    "L11.1": {
      prereq: ["first-order-recurrence", "am-gm"],
      cards: [],
      body: String.raw`This chapter collects the advanced tools for functions given by equations, sequences given by recurrences, sums arranged in tables, and the inequalities beyond AM-GM.

A functional equation describes a function by a property instead of a formula, such as $f(x + 1) = 2x + 5$ for every $x$. It is solved by choosing inputs well: to find $f(4)$, use $x = 3$, which gives $f(4) = 11$. Harder equations are solved by substituting expressions, such as $\tfrac1x$ for $x$, until a system of equations for the unknown values appears.

A linear recurrence gives each term from a fixed number of earlier terms with constant coefficients, like the Fibonacci rule $a_n = a_{n-1} + a_{n-2}$: from $a_1 = a_2 = 1$ the terms run $1, 1, 2, 3, 5, 8, 13, 21$. Its closed form comes from the roots of a quadratic.

A double sum adds the entries of a table, and swapping the order of summation, rows for columns, often simplifies it: $\sum_{i=1}^{3}\sum_{j=1}^{3}(i + j) = 36$. Finite differences extend a sequence given by a polynomial. Last, the chain of means and the Cauchy-Schwarz inequality bound expressions that AM-GM alone does not.

The lessons take these ideas in turn: functional equations by substitution (L11.2), linear recurrences (L11.3), finite differences and double sums (L11.4), and the mean inequalities and Cauchy-Schwarz (L11.5). The Summary (L11.6) collects the strategies.`,
      exercises: [
        { q: String.raw`If $f(x + 1) = 2x + 5$ for every $x$, find $f(4)$.`, answer: "11",
          solution: String.raw`Choose $x = 3$, so that $x + 1 = 4$: $f(4) = 2 \cdot 3 + 5 = 11$.` },
        { q: String.raw`A sequence has $a_1 = a_2 = 1$ and $a_n = a_{n-1} + a_{n-2}$. Find $a_8$.`, answer: "21",
          solution: String.raw`The terms are $1, 1, 2, 3, 5, 8, 13, 21$, so $a_8 = 21$.` },
        { q: String.raw`Find $\sum_{i=1}^{3}\sum_{j=1}^{3}(i + j)$.`, answer: "36",
          solution: String.raw`Split the sum: $\sum\sum i = 3(1 + 2 + 3) = 18$, since each $i$ appears for three values of $j$, and $\sum\sum j = 18$ likewise. The total is $36$.` }
      ],
      problems: [
        "2007 AMC 12B, Problem 9",
        "2008 AMC 10B, Problem 11",
        "2018 AMC 12B, Problem 9"
      ]
    },
    "L11.2": {
      prereq: ["inverse-function-properties", "linear-elimination"],
      cards: ["functional-substitution", "fx-pairing", "function-symmetry-equation"],
      body: String.raw`A functional equation gives a property of a function for all inputs and asks for one value. If $f(x) + 2f\left(\tfrac1x\right) = 3x$ for every $x \ne 0$, what is $f(2)$? If $f(xy) = f(x) + f(y)$ and $f(2) = 3$, what is $f(8)$? If $f(x) = \tfrac{4^x}{4^x + 2}$, what is $f\left(\tfrac1{10}\right) + f\left(\tfrac2{10}\right) + \cdots + f\left(\tfrac9{10}\right)$? Each is solved by choosing what to substitute.

[[functional-substitution|Substitution]] puts chosen values or expressions into the equation. Plugging in numbers that make the inner expression equal to the input you want is the first move: for $f(xy) = f(x) + f(y)$, $f(4) = f(2) + f(2) = 6$ and $f(8) = f(4) + f(2) = 9$. When the equation relates $f$ at two related points, such as $x$ and $\tfrac1x$, substitute the other point to get a second equation: $x = 2$ gives $f(2) + 2f\left(\tfrac12\right) = 6$, and $x = \tfrac12$ gives $f\left(\tfrac12\right) + 2f(2) = \tfrac32$. Solving this linear system, $f(2) = -1$. Values such as $x = 0$ or $x = 1$, and substitutions that make two sides equal, are good first tries.

[[fx-pairing|Pairing]] sums many values at once when $f(x) + f(c - x)$ is constant. For $f(x) = \tfrac{4^x}{4^x + 2}$, a short computation gives $f(x) + f(1 - x) = 1$, so the nine values pair into four pairs adding to $1$ each, plus $f\left(\tfrac12\right) = \tfrac12$: the sum is $\tfrac92$. [[function-symmetry-equation|A symmetry equation]] such as $f(c - x) = f(x)$ says the graph is symmetric about $x = \tfrac c2$, which pairs roots and values in the same way.

Substitute values that make the arguments match, substitute the partner point to get a system, and look for pairs whose values add to a constant. The next lesson solves linear recurrences.`,
      related: [
        { card: "odd-even-functions", note: String.raw`the simplest symmetries, $f(-x) = \pm f(x)$ (L4.2).` },
        { card: "cauchy-functional-equations", note: String.raw`equations such as $f(x + y) = f(x) + f(y)$ in general.` }
      ],
      exercises: [
        { q: String.raw`A function satisfies $f(x) + 2f\left(\tfrac1x\right) = 3x$ for every $x \ne 0$. Find $f(2)$.`, answer: "-1",
          solution: String.raw`$x = 2$ gives $f(2) + 2f\left(\tfrac12\right) = 6$, and $x = \tfrac12$ gives $f\left(\tfrac12\right) + 2f(2) = \tfrac32$. From the second, $f\left(\tfrac12\right) = \tfrac32 - 2f(2)$; substituting, $f(2) + 3 - 4f(2) = 6$, so $f(2) = -1$.` },
        { q: String.raw`A function satisfies $f(xy) = f(x) + f(y)$ for positive $x$, $y$, and $f(2) = 3$. Find $f(8)$.`, answer: "9",
          solution: String.raw`$f(4) = f(2) + f(2) = 6$ and $f(8) = f(4) + f(2) = 9$.` },
        { q: String.raw`Let $f(x) = \dfrac{4^x}{4^x + 2}$. Find $f\left(\tfrac1{10}\right) + f\left(\tfrac2{10}\right) + \cdots + f\left(\tfrac9{10}\right)$.`, answer: "9/2",
          solution: String.raw`$f(1 - x) = \tfrac{4/4^x}{4/4^x + 2} = \tfrac{2}{2 + 4^x}$, so $f(x) + f(1 - x) = 1$. The terms pair as $\tfrac1{10}$ with $\tfrac9{10}$ and so on, four pairs of $1$, plus $f\left(\tfrac12\right) = \tfrac24 = \tfrac12$. The sum is $\tfrac92$.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 18",
        "2001 AMC 12, Problem 9",
        "2019 AMC 12B, Problem 8",
        "2014 AMC 12A, Problem 15",
        "2023 AMC 12A, Problem 22"
      ]
    },
    "L11.3": {
      prereq: ["first-order-recurrence", "quadratic-formula"],
      cards: ["linear-recurrence", "binets-formula"],
      body: String.raw`The Fibonacci numbers, the number of ways to climb stairs one or two steps at a time, and many other sequences satisfy a rule like $a_n = 5a_{n-1} - 6a_{n-2}$, each term a fixed combination of the two before. For small indices the terms are computed by hand; for large ones, or for exact formulas, the recurrence is solved through a quadratic equation.

[[linear-recurrence|A linear recurrence]] of order two, $a_n = pa_{n-1} + qa_{n-2}$, has the characteristic equation $x^2 = px + q$. If its roots $r$ and $s$ are different, every solution is $a_n = Ar^n + Bs^n$, with $A$ and $B$ fixed by two starting values. For $a_n = 5a_{n-1} - 6a_{n-2}$ the roots are $2$ and $3$; with $a_0 = 2$ and $a_1 = 5$, $A + B = 2$ and $2A + 3B = 5$, so $A = B = 1$ and $a_n = 2^n + 3^n$, giving $a_5 = 275$. The reason is that $r^n$ satisfies the recurrence exactly when $r$ is a root, and combinations of solutions are solutions. A double root $r$ gives $a_n = (A + Bn)r^n$.

[[binets-formula|Binet's formula]] is the case of the Fibonacci numbers: the roots of $x^2 = x + 1$ are $\varphi = \tfrac{1 + \sqrt5}{2}$ and $\psi = \tfrac{1 - \sqrt5}{2}$, and $F_n = \tfrac{\varphi^n - \psi^n}{\sqrt5}$. Since $|\psi| \lt 1$, $F_n$ is the integer nearest $\tfrac{\varphi^n}{\sqrt5}$, and ratios of consecutive terms approach $\varphi$.

For contest indices, a table of terms is often fastest; the closed form helps for large indices, for exact identities, and for growth rates. The next lesson turns to differences and double sums.`,
      related: [
        { card: "recursive-counting", note: String.raw`counting problems that lead to linear recurrences.` },
        { card: "periodic-sequences", note: String.raw`recurrences whose terms repeat (L6.4).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_0 = 2$, $a_1 = 5$ and $a_n = 5a_{n-1} - 6a_{n-2}$. Find $a_5$.`, answer: "275",
          solution: String.raw`The characteristic equation $x^2 - 5x + 6 = 0$ has roots $2$ and $3$, and the starting values give $a_n = 2^n + 3^n$. So $a_5 = 32 + 243 = 275$.` },
        { q: String.raw`The Fibonacci numbers have $F_1 = F_2 = 1$ and $F_n = F_{n-1} + F_{n-2}$. Find $F_{10}$.`, answer: "55",
          solution: String.raw`The terms run $1, 1, 2, 3, 5, 8, 13, 21, 34, 55$, so $F_{10} = 55$.` },
        { q: String.raw`A sequence has $a_0 = 0$, $a_1 = 1$ and $a_n = a_{n-1} + 6a_{n-2}$. Find $a_4$.`, answer: "13",
          solution: String.raw`The roots of $x^2 - x - 6 = 0$ are $3$ and $-2$, and the starting values give $a_n = \tfrac{3^n - (-2)^n}{5}$. So $a_4 = \tfrac{81 - 16}{5} = 13$. Directly: $0, 1, 1, 7, 13$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 18",
        "2016 AMC 12B, Problem 25"
      ]
    },
    "L11.4": {
      prereq: ["arithmetic-series", "geometric-series", "power-sums"],
      cards: ["finite-differences", "double-summation", "arithmetico-geometric", "largest-term-ratio"],
      body: String.raw`Some sequences and sums are best seen through their structure: the differences of $2, 5, 10, 17, 26$ are $3, 5, 7, 9$, so the next term is $37$; a sum over a triangle of pairs can be added row by row or column by column; and $\sum \tfrac{k}{3^k}$ is a geometric sum in disguise.

[[finite-differences|Finite differences]] subtract consecutive terms. For a sequence given by a polynomial of degree $d$, the $d$th differences are constant, so a few terms determine the rest: $2, 5, 10, 17, 26$ has first differences $3, 5, 7, 9$ and constant second difference $2$, so it is quadratic ($n^2 + 1$) and continues with $37$. Mixing an arithmetic and a geometric sequence, the differences remove the arithmetic part.

[[double-summation|A double sum]] adds the entries of a table, and swapping the order of summation often helps: $\sum_{i=1}^{10}\sum_{j=1}^{i} 1$ counts the pairs $j \le i$, which is $1 + 2 + \cdots + 10 = 55$, whether counted by rows or by columns. Writing a sum of a product as a double sum and swapping turns many tricky sums into familiar ones.

[[arithmetico-geometric|An arithmetico-geometric sum]], a linear term times a geometric one, is found by multiplying by the ratio and subtracting: $S = \sum_{k \ge 1} \tfrac{k}{3^k}$ gives $S - \tfrac S3 = \sum_{k \ge 1} \tfrac{1}{3^k} = \tfrac12$, so $S = \tfrac34$. [[largest-term-ratio|The largest term]] of a sequence such as $\binom nk x^k$ is found where the ratio of consecutive terms passes $1$.

Take differences to recognize a polynomial, swap the order of a double sum, and multiply by the ratio to collapse an arithmetico-geometric sum. The next lesson turns to inequalities.`,
      related: [
        { card: "lagrange-interpolation", note: String.raw`a polynomial fixed by its values, the same information as its differences (L10.4).` },
        { card: "telescoping", note: String.raw`sums that collapse, the reverse of taking differences (L6.5).` }
      ],
      exercises: [
        { q: String.raw`Find the next term of $2, 5, 10, 17, 26, \ldots$`, answer: "37",
          solution: String.raw`The differences $3, 5, 7, 9$ grow by $2$, so the next difference is $11$ and the next term $37$ (the terms are $n^2 + 1$).` },
        { q: String.raw`Find $\sum_{i=1}^{10}\sum_{j=1}^{i} 1$.`, answer: "55",
          solution: String.raw`For each $i$ the inner sum is $i$, so the total is $1 + 2 + \cdots + 10 = 55$.` },
        { q: String.raw`Find $\sum_{k=1}^{\infty} \dfrac{k}{3^k}$.`, answer: "3/4",
          solution: String.raw`With $S$ the sum, $S - \tfrac S3 = \tfrac13 + \tfrac19 + \cdots = \tfrac12$, so $\tfrac{2S}{3} = \tfrac12$ and $S = \tfrac34$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 20",
        "2024 AMC 10B, Problem 12",
        "2015 AMC 12B, Problem 25"
      ]
    },
    "L11.5": {
      prereq: ["am-gm", "trivial-inequality"],
      cards: ["mean-chain", "cauchy-schwarz"],
      body: String.raw`AM-GM is not the only inequality the AMC uses. The harmonic mean of two speeds, the least value of $x^2 + y^2$ on a line, and the least value of $\tfrac1a + \tfrac1b$ when $a + b$ is fixed are all answered by the chain of means or by the Cauchy-Schwarz inequality.

[[mean-chain|The chain of means]] says that for positive numbers the quadratic mean is at least the arithmetic mean, which is at least the geometric mean, which is at least the harmonic mean: for two numbers, $\sqrt{\tfrac{a^2 + b^2}{2}} \ge \tfrac{a + b}{2} \ge \sqrt{ab} \ge \tfrac{2ab}{a + b}$, with equality exactly when $a = b$. The harmonic mean of $3$ and $6$ is $\tfrac{36}{9} = 4$; it is the average speed of a round trip at those speeds. The outer inequality gives $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3}$, and the inner one $\tfrac1a + \tfrac1b \ge \tfrac{4}{a + b}$, so if $a + b = 2$, then $\tfrac1a + \tfrac1b \ge 2$.

[[cauchy-schwarz|The Cauchy-Schwarz inequality]] says $(a_1b_1 + a_2b_2 + \cdots)^2 \le (a_1^2 + a_2^2 + \cdots)(b_1^2 + b_2^2 + \cdots)$, with equality when the two lists are proportional. It bounds a linear expression by a sum of squares: if $3x + 4y = 10$, then $100 \le (9 + 16)(x^2 + y^2)$, so $x^2 + y^2 \ge 4$, with equality at $(x, y) = \left(\tfrac65, \tfrac85\right)$; geometrically this is the squared distance from the origin to the line.

Use the chain of means for sums of squares and reciprocals with a fixed sum, and Cauchy-Schwarz for a linear expression against a sum of squares; always check the equality case. The Summary (L11.6) collects the chapter's strategies.`,
      related: [
        { card: "am-gm", note: String.raw`the middle link of the chain (L8.3).` },
        { card: "point-line-distance", note: String.raw`the geometric meaning of the least value of $x^2 + y^2$ on a line.` }
      ],
      exercises: [
        { q: String.raw`Find the harmonic mean of $3$ and $6$.`, answer: "4",
          solution: String.raw`The harmonic mean is $\tfrac{2 \cdot 3 \cdot 6}{3 + 6} = \tfrac{36}{9} = 4$.` },
        { q: String.raw`If $3x + 4y = 10$, find the least value of $x^2 + y^2$.`, answer: "4",
          solution: String.raw`By Cauchy-Schwarz, $(3x + 4y)^2 \le (3^2 + 4^2)(x^2 + y^2)$, so $100 \le 25(x^2 + y^2)$ and $x^2 + y^2 \ge 4$, with equality at $(x, y) = \left(\tfrac65, \tfrac85\right)$.` },
        { q: String.raw`Positive numbers $a$ and $b$ have $a + b = 2$. Find the least value of $\tfrac1a + \tfrac1b$.`, answer: "2",
          solution: String.raw`By the arithmetic-harmonic mean inequality, $\tfrac1a + \tfrac1b \ge \tfrac{4}{a + b} = 2$, with equality at $a = b = 1$.` }
      ],
      problems: [
        "2011 AMC 12B, Problem 21"
      ]
    },
    "L11.6": {
      prereq: ["functional-substitution", "fx-pairing", "linear-recurrence", "binets-formula", "finite-differences", "double-summation", "arithmetico-geometric", "mean-chain", "cauchy-schwarz"],
      cards: [],
      body: String.raw`[[functional-substitution|A functional equation]] is solved by substituting values that make the arguments match, and the partner point to get a system; [[fx-pairing|pairing]] $f(x)$ with $f(c - x)$ sums many values when the pair has a constant sum.

[[linear-recurrence|A linear recurrence]] has the closed form $Ar^n + Bs^n$ from the roots of its characteristic equation, and [[binets-formula|Binet's formula]] is the Fibonacci case.

[[finite-differences|Finite differences]] recognize and extend polynomial sequences, [[double-summation|a double sum]] is often simpler with its order swapped, and [[arithmetico-geometric|an arithmetico-geometric sum]] collapses when multiplied by the ratio and subtracted.

[[mean-chain|The chain of means]] runs quadratic, arithmetic, geometric, harmonic, and [[cauchy-schwarz|Cauchy-Schwarz]] bounds a linear expression by a sum of squares; each holds with equality only in its special case.`,
      strategies: [
        String.raw`In a functional equation, substitute values that make the arguments equal to what you need.`,
        String.raw`If the equation relates $f(x)$ and $f$ at a partner point, substitute the partner and solve the system.`,
        String.raw`For a sum of many values of $f$, check whether $f(x) + f(c - x)$ is constant.`,
        String.raw`For a linear recurrence, compute a table for small indices, and use the characteristic equation for large ones.`,
        String.raw`Take differences to recognize a polynomial sequence.`,
        String.raw`Swap the order of a double sum.`,
        String.raw`For sums of squares or reciprocals with a fixed sum, use the chain of means; for a linear expression against a sum of squares, use Cauchy-Schwarz.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A function satisfies $f(2x + 1) = 4x^2 + 4x$ for every $x$. Find $f(5)$.`, answer: "24",
        solution: String.raw`Choose $x = 2$, so that $2x + 1 = 5$: $f(5) = 16 + 8 = 24$. (In fact $f(t) = t^2 - 1$.)` },
      { q: String.raw`A function satisfies $f(x) + 3f(-x) = 2x$ for every $x$. Find $f(5)$.`, answer: "-5",
        solution: String.raw`Replace $x$ by $-x$: $f(-x) + 3f(x) = -2x$. Multiply the second by $3$ and subtract the first: $9f(x) - f(x) = -6x - 2x$, so $8f(x) = -8x$ and $f(x) = -x$. So $f(5) = -5$.` },
      { q: String.raw`A sequence has $a_0 = 1$, $a_1 = 3$ and $a_n = 2a_{n-1} + 3a_{n-2}$. Find $a_6$.`, answer: "729",
        solution: String.raw`The characteristic roots are $3$ and $-1$, and the starting values give $a_n = 3^n$. So $a_6 = 729$. Directly: $1, 3, 9, 27, 81, 243, 729$.` },
      { q: String.raw`Find $\sum_{k=1}^{20} \dfrac{k(k + 1)}{2}$.`, answer: "1540",
        solution: String.raw`Each term is $\binom{k + 1}{2}$, and summing a column of Pascal's triangle gives $\binom{22}{3} = 1540$; or use $\sum \tfrac{k^2 + k}{2} = \tfrac12(2870 + 210) = 1540$.` },
      { q: String.raw`Positive numbers $x$ and $y$ satisfy $\tfrac1x + \tfrac1y = \tfrac12$. Find the least value of $x + y$.`, answer: "8",
        solution: String.raw`By Cauchy-Schwarz, $(x + y)\left(\tfrac1x + \tfrac1y\right) \ge (1 + 1)^2 = 4$, so $x + y \ge 8$, with equality at $x = y = 4$.` },
      { q: String.raw`If $a + b + c = 9$, find the least value of $a^2 + b^2 + c^2$.`, answer: "27",
        solution: String.raw`The quadratic mean is at least the arithmetic mean: $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3} = 27$, with equality at $a = b = c = 3$.` }
    ],
    problems: [
      "2024 AMC 12B, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12B, Problem 22"
    ]
  }
};
