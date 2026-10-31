// Learn, AMC Algebra, chapter L3: quadratics (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L3"] = {
  lessons: {
    "L3.1": {
      prereq: ["completing-the-square"],
      cards: [],
      body: String.raw`This chapter studies quadratics, expressions of the form $ax^2 + bx + c$ with $a \ne 0$. They are the first expressions where whole families of questions, about the roots, their sum and product, and the largest or smallest value, are answered by formulas instead of by trial.

A root of $ax^2 + bx + c$ is a value of $x$ that makes it $0$. Some quadratics factor: $x^2 - 5x + 6 = (x - 2)(x - 3)$ has roots $2$ and $3$. Every quadratic can be solved by completing the square, which gives the quadratic formula, and the number $b^2 - 4ac$ under its root, the discriminant, tells how many real roots there are: for $2x^2 + 3x + 5$ it is $9 - 40 = -31 \lt 0$, so there are none.

The roots are often not needed one by one. Their sum is $-\tfrac ba$ and their product $\tfrac ca$ (Vieta's formulas), so for $x^2 - 5x + 6$ the roots add to $5$ and multiply to $6$, and any symmetric expression in them follows.

The graph of a quadratic is a parabola, symmetric about a vertical line through its vertex. Completing the square writes $x^2 - 6x + 11$ as $(x - 3)^2 + 2$, so the vertex is $(3, 2)$ and the smallest value is $2$. The vertex answers questions about largest and smallest values, and the position of the vertex with the sign of the discriminant tells where the roots lie.

The lessons take these ideas in turn: solving quadratics (L3.2), Vieta's formulas (L3.3), and the vertex and where the roots lie (L3.4). The Summary (L3.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the sum of the roots of $x^2 - 5x + 6$.`, answer: "5",
          solution: String.raw`It factors as $(x - 2)(x - 3)$, so the roots are $2$ and $3$, with sum $5$, which is $-\tfrac ba = 5$.` },
        { q: String.raw`Find the smallest value of $x^2 - 6x + 11$.`, answer: "2",
          solution: String.raw`Complete the square: $(x - 3)^2 + 2$. The square is at least $0$, so the smallest value is $2$, at the vertex $(3, 2)$.` },
        { q: String.raw`How many real roots does $2x^2 + 3x + 5$ have?`, answer: "0",
          solution: String.raw`The discriminant is $3^2 - 4 \cdot 2 \cdot 5 = -31$, which is negative, so there are no real roots.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 9",
        "2006 AMC 10A, Problem 8",
        "2005 AMC 10A, Problem 10"
      ]
    },
    "L3.2": {
      prereq: ["completing-the-square", "difference-of-squares"],
      cards: ["quadratic-formula", "quadratic-perfect-square"],
      body: String.raw`Many problems end in a quadratic equation: a length found from a right triangle, a number that differs from its reciprocal by $1$, a line that just touches a parabola. Solving $x^2 - 4x - 1 = 0$, deciding when $x^2 + kx + 9 = 0$ has only one root, and deciding when $x^2 + x - n$ factors with integers are all answered by one formula and the expression inside it.

First try to factor: if $x^2 + bx + c = (x - r)(x - s)$, the roots are $r$ and $s$, and $r + s = -b$, $rs = c$, so look for two numbers with that sum and product. When that fails, complete the square: $x^2 - 4x - 1 = (x - 2)^2 - 5$, so $x - 2 = \pm\sqrt5$ and $x = 2 \pm \sqrt5$. Doing the same with letters gives [[quadratic-formula|the quadratic formula]]: the roots of $ax^2 + bx + c = 0$ are $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

The discriminant $D = b^2 - 4ac$ decides the kind of roots without solving. If $D \gt 0$ there are two real roots, if $D = 0$ one (a double root, where the parabola touches the $x$-axis), and if $D \lt 0$ none. So $x^2 + kx + 9$ has exactly one root when $k^2 - 36 = 0$, that is, $k = \pm 6$. A line is tangent to a parabola exactly when substituting one into the other gives a quadratic with $D = 0$.

When the roots must be rational or integers, [[quadratic-perfect-square|the discriminant must be a perfect square]]. For $x^2 + x - n$ the discriminant is $1 + 4n$, a perfect square exactly when $n = m(m + 1)$; between $1$ and $20$ that is $n = 2, 6, 12, 20$, and then $x^2 + x - n = (x - m)(x + m + 1)$.

Factor when you can, complete the square or use the formula when you cannot, and read the discriminant when only the number or kind of roots is asked. The next lesson uses the roots' sum and product without finding them.`,
      related: [
        { card: "transforming-equations", note: String.raw`checking roots that squaring or clearing denominators may have added (L2.2).` },
        { card: "vietas-quadratic", note: String.raw`the sum and product of the roots, read from the coefficients (L3.3).` }
      ],
      exercises: [
        { q: String.raw`Find the larger root of $x^2 - 4x - 1 = 0$.`, answer: "2 + sqrt(5)",
          solution: String.raw`Complete the square: $(x - 2)^2 = 5$, so $x = 2 \pm \sqrt5$. The larger root is $2 + \sqrt5$.` },
        { q: String.raw`For which positive $k$ does $x^2 + kx + 9 = 0$ have exactly one real root?`, answer: "6",
          solution: String.raw`One root means the discriminant is $0$: $k^2 - 36 = 0$, so $k = 6$ (the root is $-3$).` },
        { q: String.raw`For how many integers $n$ from $1$ to $20$ does $x^2 + x - n$ factor into two linear factors with integer coefficients?`, answer: "4",
          solution: String.raw`The roots are integers exactly when the discriminant $1 + 4n$ is a perfect square, that is, when $n = m(m + 1)$ for a positive integer $m$. Up to $20$: $2, 6, 12, 20$, four values.` }
      ],
      problems: [
        "2002 AMC 12A, Problem 13",
        "2013 AMC 10B, Problem 19",
        "2024 AMC 10A, Problem 11",
        "2014 AMC 12B, Problem 17"
      ]
    },
    "L3.3": {
      prereq: ["quadratic-formula", "square-of-sum"],
      cards: ["vietas-quadratic", "symmetric-polynomial-strategies"],
      body: String.raw`Often a problem asks about the roots of a quadratic without asking for the roots themselves: the sum of their reciprocals, the sum of their squares, or the product of the roots each increased by $1$. Finding the roots with the formula works but brings square roots that cancel at the end; reading the sum and product straight from the coefficients is faster and exact.

[[vietas-quadratic|Vieta's formulas]] say that the roots $r$ and $s$ of $ax^2 + bx + c$ satisfy $r + s = -\tfrac ba$ and $rs = \tfrac ca$. They come from expanding $a(x - r)(x - s) = ax^2 - a(r + s)x + ars$ and matching coefficients. For $2x^2 - 7x + 3$, the roots add to $\tfrac72$ and multiply to $\tfrac32$, so the sum of their reciprocals is $\tfrac{r + s}{rs} = \tfrac{7/2}{3/2} = \tfrac73$.

An expression in $r$ and $s$ that does not change when they are swapped is symmetric, and [[symmetric-polynomial-strategies|every symmetric expression]] can be written using only $r + s$ and $rs$. The ones to know: $r^2 + s^2 = (r + s)^2 - 2rs$, $(r - s)^2 = (r + s)^2 - 4rs$, and $r^3 + s^3 = (r + s)^3 - 3rs(r + s)$. For $x^2 - 3x - 5$, $r^2 + s^2 = 9 + 10 = 19$. The same idea solves symmetric systems: if $x + y = 6$ and $xy = 7$, then $x$ and $y$ are the roots of $t^2 - 6t + 7$, and $(x - y)^2 = 36 - 28 = 8$.

Vieta also works in reverse: two numbers with a known sum $S$ and product $P$ are the roots of $t^2 - St + P$. And integer conditions combine with it: if the roots of $x^2 - 63x + k$ are primes, their sum $63$ is odd, so one of them is $2$.

When a question is about the roots as a pair, write it in their sum and product before solving anything. The next lesson turns to the graph of a quadratic.`,
      related: [
        { card: "vietas-general", note: String.raw`the same formulas for polynomials of any degree (L10.2).` },
        { card: "root-transformations", note: String.raw`writing a quadratic whose roots are changed, such as doubled or inverted (L10.3).` }
      ],
      exercises: [
        { q: String.raw`The roots of $2x^2 - 7x + 3$ are $r$ and $s$. Find $\tfrac1r + \tfrac1s$.`, answer: "7/3",
          solution: String.raw`By Vieta, $r + s = \tfrac72$ and $rs = \tfrac32$, so $\tfrac1r + \tfrac1s = \tfrac{r + s}{rs} = \tfrac73$.` },
        { q: String.raw`The roots of $x^2 - 3x - 5$ are $r$ and $s$. Find $r^2 + s^2$.`, answer: "19",
          solution: String.raw`By Vieta, $r + s = 3$ and $rs = -5$, so $r^2 + s^2 = (r + s)^2 - 2rs = 9 + 10 = 19$.` },
        { q: String.raw`If $x + y = 6$ and $xy = 7$, find $(x - y)^2$.`, answer: "8",
          solution: String.raw`Use $(x - y)^2 = (x + y)^2 - 4xy = 36 - 28 = 8$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 10",
        "2003 AMC 10A, Problem 5",
        "2006 AMC 10B, Problem 14",
        "2002 AMC 10A, Problem 14",
        "2005 AMC 10B, Problem 16"
      ]
    },
    "L3.4": {
      prereq: ["completing-the-square", "quadratic-formula"],
      cards: ["vertex-form", "quadratic-forms", "quadratic-root-location"],
      body: String.raw`The graph of $y = ax^2 + bx + c$ is a parabola, and its lowest or highest point, the vertex, answers a whole class of questions: the largest value of $-2x^2 + 8x + 1$, the greatest height of a ball thrown upward, the line on which the vertex of a family of parabolas lies. The parabola also shows where the roots are, which decides questions such as when a quadratic has two positive roots.

Completing the square writes a quadratic in [[vertex-form|vertex form]], $a(x - h)^2 + k$. The vertex is $(h, k)$, with $h = -\tfrac{b}{2a}$, and the parabola is symmetric about the line $x = h$. If $a \gt 0$ it opens upward and $k$ is the smallest value; if $a \lt 0$ it opens downward and $k$ is the largest. For $-2x^2 + 8x + 1 = -2(x - 2)^2 + 9$ the largest value is $9$, at $x = 2$. Symmetry gives the axis quickly: if a parabola has the same height at $x = 2$ and $x = 4$, its axis is $x = 3$.

The same idea handles [[quadratic-forms|quadratic expressions in two variables]], such as $x^2 + 4x + y^2 - 6y + 20 = (x + 2)^2 + (y - 3)^2 + 7$, whose smallest value is $7$. Completing the square in each variable shows the minimum, and expressions such as $x^2 + xy + y^2$ are handled by completing the square in one variable.

[[quadratic-root-location|Where the roots lie]] is read from the discriminant, the sum and product of the roots, and the vertex. For $x^2 - mx + m + 3$ to have two different positive roots, the discriminant $m^2 - 4m - 12 = (m - 6)(m + 2)$ must be positive, and the sum $m$ and product $m + 3$ must be positive; together $m \gt 6$. For a root between two numbers, compare the signs of the quadratic at them: a sign change means a root in between.

Use vertex form for every largest or smallest value of a quadratic, and the discriminant with Vieta for the position of the roots. The Summary (L3.5) collects the chapter's strategies.`,
      related: [
        { card: "trivial-inequality", note: String.raw`a square is never negative, which is why the vertex is the extreme (L8.2).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions by where graphs cross (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the largest value of $-2x^2 + 8x + 1$.`, answer: "9",
          solution: String.raw`Complete the square: $-2(x^2 - 4x) + 1 = -2(x - 2)^2 + 8 + 1 = -2(x - 2)^2 + 9$. The largest value is $9$, at $x = 2$.` },
        { q: String.raw`A ball's height after $t$ seconds is $-16t^2 + 64t$ feet. What is its greatest height?`, answer: "64",
          solution: String.raw`The vertex is at $t = -\tfrac{64}{2(-16)} = 2$, where the height is $-64 + 128 = 64$ feet.` },
        { q: String.raw`What is the smallest integer $m$ for which $x^2 - mx + m + 3 = 0$ has two different positive roots?`, answer: "7",
          solution: String.raw`Two real roots need $m^2 - 4(m + 3) = (m - 6)(m + 2) \gt 0$. Both positive needs the sum $m \gt 0$ and the product $m + 3 \gt 0$. Together $m \gt 6$, so the smallest integer is $7$ (the roots of $x^2 - 7x + 10$ are $2$ and $5$).` }
      ],
      problems: [
        "2005 AMC 12B, Problem 8",
        "2006 AMC 12B, Problem 12",
        "2021 Fall AMC 10A, Problem 25",
        "2020 AMC 12B, Problem 22"
      ]
    },
    "L3.5": {
      prereq: ["quadratic-formula", "quadratic-perfect-square", "vietas-quadratic", "symmetric-polynomial-strategies", "vertex-form", "quadratic-forms", "quadratic-root-location"],
      cards: [],
      body: String.raw`A quadratic is solved by factoring, by completing the square, or by [[quadratic-formula|the quadratic formula]] $x = \tfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. The discriminant $b^2 - 4ac$ tells whether there are two, one or no real roots, and [[quadratic-perfect-square|it must be a perfect square]] for the roots to be rational.

[[vietas-quadratic|Vieta's formulas]] give the sum $-\tfrac ba$ and product $\tfrac ca$ of the roots, and [[symmetric-polynomial-strategies|every symmetric expression]] in the roots is written in these two; two numbers with a known sum and product are the roots of $t^2 - St + P$.

[[vertex-form|Vertex form]] $a(x - h)^2 + k$ gives the largest or smallest value and the axis of symmetry; [[quadratic-forms|quadratic expressions in two variables]] are handled by completing the square in each. [[quadratic-root-location|The position of the roots]] follows from the discriminant, their sum and product, and the signs of the quadratic at chosen points.`,
      strategies: [
        String.raw`Try to factor first: two numbers with the right sum and product.`,
        String.raw`If only the number or kind of roots is asked, compute the discriminant.`,
        String.raw`For integer or rational roots, require the discriminant to be a perfect square.`,
        String.raw`For any symmetric expression in the roots, write it in their sum and product.`,
        String.raw`For a largest or smallest value, complete the square to find the vertex.`,
        String.raw`Use symmetry: equal heights at two points put the axis halfway between them.`,
        String.raw`For roots in a range, check the discriminant, the sum and product, and the signs at the ends.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the positive solution of $x^2 = 3x + 10$.`, answer: "5",
        solution: String.raw`Rearrange: $x^2 - 3x - 10 = (x - 5)(x + 2) = 0$, so $x = 5$ or $x = -2$. The positive solution is $5$.` },
      { q: String.raw`The two roots of a quadratic add to $10$ and differ by $2$. Find their product.`, answer: "24",
        solution: String.raw`The roots are $6$ and $4$, with product $24$. With Vieta-style identities: $(r - s)^2 = (r + s)^2 - 4rs$, so $4 = 100 - 4rs$ and $rs = 24$.` },
      { q: String.raw`For how many integers $b$ does $x^2 + bx + 12$ have two integer roots?`, answer: "6",
        solution: String.raw`The roots are integers with product $12$ and sum $-b$. The pairs $\pm(1, 12)$, $\pm(2, 6)$, $\pm(3, 4)$ give $b = \mp 13, \mp 8, \mp 7$: six values.` },
      { q: String.raw`Find the smallest value of $x^2 + 4x + y^2 - 6y + 20$.`, answer: "7",
        solution: String.raw`Complete the squares: $(x + 2)^2 + (y - 3)^2 + 7$. The smallest value is $7$, at $(-2, 3)$.` },
      { q: String.raw`The roots of $x^2 - 7x + 2$ are $r$ and $s$. Find $r^3 + s^3$.`, answer: "301",
        solution: String.raw`With $r + s = 7$ and $rs = 2$: $r^3 + s^3 = (r + s)^3 - 3rs(r + s) = 343 - 42 = 301$.` },
      { q: String.raw`One root of $x^2 - 10x + c$ is four times the other. Find $c$.`, answer: "16",
        solution: String.raw`With roots $r$ and $4r$: $5r = 10$, so $r = 2$, and $c = r \cdot 4r = 16$.` },
      { q: String.raw`For how many integers $x$ is $x^2 - 8x + 12 \lt 0$?`, answer: "3",
        solution: String.raw`The quadratic factors as $(x - 2)(x - 6)$ and is negative between its roots, for $2 \lt x \lt 6$. The integers are $3, 4, 5$.` }
    ],
    problems: [
      "2003 AMC 10A, Problem 18",
      "2023 AMC 10A, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2013 AMC 12B, Problem 17",
      "2025 AMC 10A, Problem 18",
      "2009 AMC 12A, Problem 23",
      "2010 AMC 12B, Problem 23"
    ]
  }
};
