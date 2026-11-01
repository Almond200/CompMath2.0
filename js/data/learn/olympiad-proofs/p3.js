// Learn, Olympiad Proofs, chapter P3: extremal arguments and descent (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["P3"] = {
  lessons: {
    "P3.1": {
      prereq: ["proof-by-contradiction", "strong-induction", "modular-basics"],
      cards: [],
      body: String.raw`Every nonempty set of positive integers has a smallest element. This plain fact drives a family of proofs: assume a claim fails, take the smallest failure, and show that an even smaller one exists, which is impossible. It proves that equations have no solutions, that configurations always have a structure, and, in its most surprising form, that integer solutions of certain quadratic equations must be very special.

The equation $x^2 = 2y^2$ has no solution in positive integers: from one, $x$ is even, $x = 2x'$, and $2x'^2 = y^2$, so $(y, x')$ is a smaller solution of the same equation, and the solutions would shrink forever. In a tournament, where every two players meet once and one wins, the players can be lined up so that each beat the next: a smallest tournament with no such line cannot exist, because removing one player leaves a smaller tournament that has a line, and the removed player fits into it. And the pairs of positive integers with $\tfrac{a^2 + b^2}{ab + 1}$ an integer, such as $(2, 8)$ giving $4$ and $(3, 27)$ giving $9$, always give a perfect square; the proof jumps from one solution to a smaller one.

The lessons are the smallest counterexample and infinite descent (P3.2), and Vieta jumping and discrete continuity (P3.3). The Summary (P3.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that $x^2 = 2y^2$ has no solution in positive integers.`,
          solution: String.raw`Suppose there is one, and take the one with the smallest $y$. Then $x^2$ is even, so $x$ is even, $x = 2x'$, and $4x'^2 = 2y^2$, that is, $y^2 = 2x'^2$. So $(y, x')$ is a solution with $x' \lt y$, since $x' = \tfrac{x}{2} = \tfrac{y\sqrt2}{2} \lt y$. This contradicts the choice of the smallest $y$.` },
        { q: String.raw`Check that $(a, b) = (8, 30)$ makes $\tfrac{a^2 + b^2}{ab + 1}$ an integer, and that the integer is a perfect square.`,
          solution: String.raw`$a^2 + b^2 = 64 + 900 = 964$ and $ab + 1 = 241$, and $964 = 4 \cdot 241$. The quotient is $4 = 2^2$.` }
      ],
      problems: []
    },
    "P3.2": {
      prereq: ["proof-by-contradiction", "strong-induction", "modular-basics"],
      cards: ["minimal-counterexample", "infinite-descent"],
      body: String.raw`Why does $x^2 + y^2 = 3z^2$ have no solution in positive integers? Why can the players of every tournament be lined up so that each beat the next? Both proofs suppose a counterexample and look at the smallest one.

[[minimal-counterexample|A minimal counterexample]] argument assumes the claim fails, takes the smallest case where it fails, and uses the fact that every smaller case works. It is strong induction written as a contradiction, and it is often the more natural shape for claims about graphs, sets and configurations, where "smaller" means fewer points or fewer edges. In a smallest tournament without a line, remove any player $v$; the rest, being smaller, can be lined up as $u_1, u_2, \ldots, u_m$, each beating the next. If $v$ beat $u_1$, put $v$ first. Otherwise $u_1$ beat $v$; let $u_i$ be the last player in the line who beat $v$. If $i = m$, put $v$ last; otherwise $v$ beat $u_{i+1}$, and $v$ fits between $u_i$ and $u_{i+1}$. Either way the tournament has a line, a contradiction.

[[infinite-descent|Infinite descent]] proves that an equation has no positive solutions by turning any solution into a strictly smaller one, which cannot go on forever. The smaller solution usually comes from a congruence that forces every variable to share a factor. In $x^2 + y^2 = 3z^2$, the squares modulo $3$ are $0$ and $1$, so $x^2 + y^2 \equiv 0 \pmod 3$ forces $x \equiv y \equiv 0$. Then $9 \mid x^2 + y^2 = 3z^2$, so $3 \mid z$, and $(\tfrac x3, \tfrac y3, \tfrac z3)$ is a smaller solution. The choice of modulus is the whole idea: it is the one in which the equation forces divisibility, here $3$, and for $a^2 + b^2 = 7c^2$ it is $7$.

Take the smallest counterexample and build a smaller one, and look for a modulus that forces all the variables to share a factor. The next lesson descends through quadratic equations.`,
      related: [
        { card: "strong-induction", note: String.raw`the same argument written forward (P2.2).` },
        { card: "quadratic-reciprocity", note: String.raw`which numbers are squares modulo $p$, the source of most descents (D1.3).` },
        { card: "extremal-principle", note: String.raw`starting from the largest or smallest object in general.` }
      ],
      exercises: [
        { q: String.raw`Prove that $x^2 + y^2 = 3z^2$ has no solution in positive integers.`,
          solution: String.raw`Suppose there is one; take the one with the smallest $z$. Squares are $0$ or $1$ modulo $3$, and $x^2 + y^2 \equiv 0$ forces $x^2 \equiv y^2 \equiv 0$, so $3 \mid x$ and $3 \mid y$. Then $9 \mid 3z^2$, so $3 \mid z^2$ and $3 \mid z$. Dividing by $3$, $\left(\tfrac x3\right)^2 + \left(\tfrac y3\right)^2 = 3\left(\tfrac z3\right)^2$ is a solution with a smaller $z$, a contradiction.` },
        { q: String.raw`Prove that in every tournament (every two players meet once, and one of them wins) the players can be listed so that each beat the next one in the list.`,
          solution: String.raw`Suppose not, and take a counterexample with the fewest players; it has at least two. Remove a player $v$. The rest can be listed $u_1, \ldots, u_m$ with each beating the next. If $v$ beat $u_1$, list $v$ first. If not, $u_1$ beat $v$; let $i$ be the largest index with $u_i$ beating $v$. If $i = m$, list $v$ last. Otherwise $v$ beat $u_{i+1}$, so $u_1, \ldots, u_i, v, u_{i+1}, \ldots, u_m$ works. In every case the tournament has such a list, a contradiction.` },
        { q: String.raw`Prove that $a^2 + b^2 = 7c^2$ has no solution in positive integers.`,
          solution: String.raw`The squares modulo $7$ are $0, 1, 2, 4$, and the only way two of them add to a multiple of $7$ is $0 + 0$ (the sums $1 + 1$, $1 + 2$, $1 + 4$, $2 + 2$, $2 + 4$, $4 + 4$ are $2, 3, 5, 4, 6, 1$). So $7 \mid a$ and $7 \mid b$, then $49 \mid 7c^2$, so $7 \mid c$. Dividing by $7$ gives a smaller solution, and by descent there is none.` }
      ],
      problems: []
    },
    "P3.3": {
      prereq: ["vietas-quadratic", "infinite-descent"],
      cards: ["vieta-jumping", "discrete-intermediate-value"],
      body: String.raw`If $a$ and $b$ are positive integers and $\tfrac{a^2 + b^2}{ab + 1}$ is an integer, why must it be a perfect square? If $ab$ divides $a^2 + b^2 + 1$, why must the quotient be $3$? In a row of $10$ men and $10$ women, why do some $10$ people in a row include exactly $5$ women? Two more ways to make a quantity smaller, or to make it pass through a value.

[[vieta-jumping|Vieta jumping]] is descent through a quadratic. Fix the quotient $k$ and read the equation as a quadratic in $a$: for $a^2 + b^2 = k(ab + 1)$ it is $a^2 - kb \cdot a + (b^2 - k) = 0$. Its two roots add to $kb$ and multiply to $b^2 - k$, so from a root $a$ the other root is $a' = kb - a = \tfrac{b^2 - k}{a}$, an integer by the first form. Suppose $k$ is not a square and take a solution with $a \ge b$ and $a + b$ smallest. The jump $a'$ is not $0$, since then $k = b^2$. It is not negative, since for $a' \le -1$ the left side $a'^2 - kba' + b^2 - k$ is at least $a'^2 + kb + b^2 - k \gt 0$. And $a' = \tfrac{b^2 - k}{a} \lt \tfrac{b^2}{a} \le b$. So $(a', b)$ is a solution with $a' + b \lt a + b$, contradicting the choice; hence $k$ is a square. The same method shows that $ab \mid a^2 + b^2 + 1$ forces the quotient $3$: in a smallest solution with $a \ge b$, the jump $a' = \tfrac{b^2 + 1}{a}$ is a positive integer and cannot be smaller than $a$, so $b^2 + 1 \ge a^2$, which with $a \ge b$ forces $a = b$, then $a^2 \mid 2a^2 + 1$, so $a = b = 1$ and the quotient is $3$.

[[discrete-intermediate-value|Discrete continuity]] is the integer intermediate value theorem: a quantity that changes by at most $1$ at each step cannot skip a value. In the row of $20$, let $w_i$ be the number of women among people $i$ to $i + 9$. Moving the window one place changes $w_i$ by at most $1$. The first window, people $1$ to $10$, and the last, people $11$ to $20$, together hold all $10$ women, so $w_1 + w_{11} = 10$: one is at most $5$ and the other at least $5$, and some window in between has exactly $5$.

Read an integer equation as a quadratic in one variable and jump to the other root; slide a window, and use steps of at most one to hit a target. The Summary follows.`,
      related: [
        { card: "vietas-quadratic", note: String.raw`the sum and product of the roots that define the jump.` },
        { card: "pigeonhole-argument", note: String.raw`another way to force a value to occur (P4.2).` },
        { card: "pell-equation", note: String.raw`equations whose solutions are generated by repeated jumps.` }
      ],
      exercises: [
        { q: String.raw`Let $a$ and $b$ be positive integers such that $ab$ divides $a^2 + b^2 + 1$. Prove that $\tfrac{a^2 + b^2 + 1}{ab} = 3$.`,
          solution: String.raw`Let $k$ be the quotient, and among all solutions for this $k$ take one with $a \ge b$ and $a + b$ smallest. Then $a$ is a root of $x^2 - kbx + (b^2 + 1) = 0$, whose other root is $a' = kb - a = \tfrac{b^2 + 1}{a}$, a positive integer. So $(a', b)$ is a solution, and by minimality $a' + b \ge a + b$, that is, $\tfrac{b^2 + 1}{a} \ge a$, so $b^2 + 1 \ge a^2 \ge b^2$. If $a \gt b$, then $a^2 \ge (b + 1)^2 \gt b^2 + 1$, impossible; so $a = b$, and $a^2 \mid 2a^2 + 1$ gives $a^2 \mid 1$, $a = b = 1$, and $k = 3$.` },
        { q: String.raw`Twenty people stand in a row, $10$ men and $10$ women. Prove that some $10$ consecutive people include exactly $5$ women.`,
          solution: String.raw`Let $w_i$ be the number of women among people $i, \ldots, i + 9$, for $i = 1, \ldots, 11$. Shifting from $i$ to $i + 1$ drops one person and adds one, so $|w_{i+1} - w_i| \le 1$. The windows starting at $1$ and $11$ cover everyone once, so $w_1 + w_{11} = 10$, and one of them is at most $5$, the other at least $5$. Moving from one to the other in steps of at most $1$, the count takes the value $5$.` },
        { q: String.raw`Show that the pairs $(1, 1)$, $(1, 2)$, $(2, 5)$, $(5, 13)$ all satisfy $a^2 + b^2 + 1 = 3ab$, and that each comes from the one before by a Vieta jump.`,
          solution: String.raw`Check: $3 = 3$; $6 = 6$; $30 = 30$; $195 = 195$. As a quadratic in the first entry with $b$ fixed, $x^2 - 3bx + b^2 + 1 = 0$, the roots add to $3b$. From $(b, c)$ the jump replaces $b$ by $3c - b$: from $(1, 1)$ to $(1, 2)$ (the other root for $x$ with fixed $1$ is $3 - 1 = 2$), from $(1, 2)$ to $(2, 6 - 1) = (2, 5)$, from $(2, 5)$ to $(5, 15 - 2) = (5, 13)$.` }
      ],
      problems: []
    },
    "P3.4": {
      prereq: ["minimal-counterexample", "infinite-descent", "vieta-jumping", "discrete-intermediate-value"],
      cards: [],
      body: String.raw`[[minimal-counterexample|A minimal counterexample]] uses the fact that every smaller case works, and [[infinite-descent|infinite descent]] turns a solution into a smaller one, usually through a modulus that forces a common factor.

[[vieta-jumping|Vieta jumping]] replaces one root of a quadratic by the other to descend, and [[discrete-intermediate-value|discrete continuity]] makes a quantity that moves by at most $1$ pass through every value in between.`,
      strategies: [
        String.raw`Take the smallest counterexample, and use that everything smaller works.`,
        String.raw`For an equation with no solutions, look for a modulus that forces every variable to share a factor.`,
        String.raw`Read a symmetric integer equation as a quadratic in one variable and jump to the other root.`,
        String.raw`In a Vieta jump, check that the new root is a positive integer and smaller.`,
        String.raw`To force a value, find two configurations on either side of it and a path of steps of at most one.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that $x^3 + 2y^3 = 4z^3$ has no solution in integers other than $x = y = z = 0$.`,
        solution: String.raw`Suppose a nonzero solution exists, and take one with $|x| + |y| + |z|$ smallest. Then $x^3$ is even, so $x = 2x_1$, and $8x_1^3 + 2y^3 = 4z^3$ gives $y^3 + 4x_1^3 = 2z^3$, so $y$ is even, $y = 2y_1$: $8y_1^3 + 4x_1^3 = 2z^3$, so $z^3 = 4y_1^3 + 2x_1^3$ is even, $z = 2z_1$, and $x_1^3 + 2y_1^3 = 4z_1^3$. This is a smaller nonzero solution, a contradiction.` },
      { q: String.raw`Prove that every set of $n \ge 1$ points in the plane, no three on a line, can be joined by $n - 1$ segments into a path visiting every point, with no two segments crossing.`,
        solution: String.raw`Order the points by their $x$-coordinate (rotating the plane slightly first, so that no two have the same $x$) and join consecutive points. The segments lie in disjoint vertical strips, apart from shared endpoints, so no two cross.` },
      { q: String.raw`A sequence of integers $a_1, \ldots, a_{50}$ has $a_1 = 0$, $a_{50} = 30$, and $|a_{i+1} - a_i| \le 1$ for each $i$. Prove that some $a_i = 17$.`,
        solution: String.raw`The sequence starts below $17$ and ends above it, and changes by at most $1$ at each step, so it cannot pass from at most $16$ to at least $18$ without taking the value $17$. Precisely, let $i$ be the last index with $a_i \le 17$; then $i \lt 50$ and $a_{i+1} \ge 18$, so $a_i \ge 17$, and $a_i = 17$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Let $a$ and $b$ be positive integers with $\tfrac{a^2 + b^2}{ab + 1} = k$ an integer. Prove that $k$ is a perfect square.`,
        solution: String.raw`Suppose $k$ is not a square, and take a solution with $a \ge b$ and $a + b$ smallest. The other root of $x^2 - kbx + (b^2 - k) = 0$ is $a' = kb - a = \tfrac{b^2 - k}{a}$, an integer. If $a' \lt 0$, then $a'^2 - kba' + b^2 - k \ge a'^2 + kb + b^2 - k \gt 0$, impossible; if $a' = 0$, then $k = b^2$, a square. So $a' \gt 0$ and $(a', b)$ is a solution, with $a' = \tfrac{b^2 - k}{a} \lt \tfrac{b^2}{a} \le b \le a$, so $a' + b \lt a + b$, contradicting minimality. Hence $k$ is a square.` },
      { q: String.raw`Prove that $x^2 + y^2 + z^2 = 2xyz$ has no solution in positive integers.`,
        solution: String.raw`Prove more: $x^2 + y^2 + z^2 = 2^m xyz$ has no positive solution for any $m \ge 1$. In a solution the left side is even, so an even number of $x, y, z$ are odd. If two are odd, the left side is $2 \pmod 4$, while the right side is $2^m$ times a product containing an even factor, a multiple of $4$. So all three are even, and halving gives $x_1^2 + y_1^2 + z_1^2 = 2^{m+2} x_1y_1z_1$, a solution with smaller $x$. Infinite descent rules out every solution.` },
      { q: String.raw`Prove that $a^2 + b^2 + 1 = 3ab$ has infinitely many solutions in positive integers.`,
        solution: String.raw`$(1, 1)$ is a solution. If $(a, b)$ is a solution with $b \ge a$, then as a quadratic in $a$ the other root is $3b - a$, so $(b, 3b - a)$ is also a solution (the equation is symmetric), and $3b - a \gt b$ since $2b \gt a$. Repeating gives solutions with ever larger entries, $(1, 1), (1, 2), (2, 5), (5, 13), (13, 34), \ldots$, infinitely many.` }
    ],
    problems: []
  }
};
