// Learn, Olympiad Proofs, chapter P2: induction (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["P2"] = {
  lessons: {
    "P2.1": {
      prereq: ["direct-proof", "recursive-counting"],
      cards: [],
      body: String.raw`Many claims are about every positive integer at once: a formula for $1 + 3 + \cdots + (2n - 1)$, an inequality such as $2^n \gt n^2$ for large $n$, a statement that every board of a certain shape can be tiled. Induction proves such a claim by proving a first case and showing that each case brings the next with it, like a row of dominoes.

For $1 + 3 + \cdots + (2n - 1) = n^2$: the case $n = 1$ is $1 = 1$. If the sum up to $2n - 1$ is $n^2$, then adding the next odd number gives $n^2 + (2n + 1) = (n + 1)^2$, which is the claim for $n + 1$. So the claim holds for $1$, hence for $2$, hence for $3$, and so on for every $n$. The work is always in the step, in finding the case $n$ inside the case $n + 1$.

The lessons take induction in turn: ordinary and strong induction (P2.2), and stronger statements and unusual inductions (P2.3). The Summary (P2.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that $1 + 3 + 5 + \cdots + (2n - 1) = n^2$ for every positive integer $n$.`,
          solution: String.raw`For $n = 1$ both sides are $1$. Suppose the formula holds for $n$. Then $1 + 3 + \cdots + (2n - 1) + (2n + 1) = n^2 + 2n + 1 = (n + 1)^2$, which is the formula for $n + 1$. By induction it holds for every $n$.` },
        { q: String.raw`Prove that $1 + 2 + \cdots + n = \tfrac{n(n + 1)}{2}$ for every positive integer $n$.`,
          solution: String.raw`For $n = 1$: $1 = \tfrac{1 \cdot 2}{2}$. If it holds for $n$, then adding $n + 1$ gives $\tfrac{n(n + 1)}{2} + (n + 1) = \tfrac{(n + 1)(n + 2)}{2}$, the formula for $n + 1$.` }
      ],
      problems: []
    },
    "P2.2": {
      prereq: ["direct-proof", "fundamental-theorem-arithmetic"],
      cards: ["induction", "strong-induction"],
      body: String.raw`How is it proved that $2^n \gt n^2$ for every $n \ge 5$, that every integer above $1$ is a product of primes, or that every amount of at least $8$ cents can be paid with $3$-cent and $5$-cent stamps? Each step of these proofs leans on earlier cases, one step back or several.

[[induction|Induction]] has two parts: a base case, and a step from $n$ to $n + 1$. The base need not be $1$; it is wherever the claim starts. For $2^n \gt n^2$ with $n \ge 5$, the base is $32 \gt 25$. For the step, assume $2^n \gt n^2$; then $2^{n+1} = 2 \cdot 2^n \gt 2n^2$, and $2n^2 \ge (n + 1)^2$ exactly when $n^2 \ge 2n + 1$, which holds for $n \ge 3$. So $2^{n+1} \gt (n + 1)^2$. The step used $n \ge 3$, which the range $n \ge 5$ provides; a step that fails for small $n$ is why the base is placed where it is. Both parts are needed: the step alone proves nothing, as the false claim "$n = n + 1$" shows, whose step is valid.

[[strong-induction|Strong induction]] assumes the claim for every case below $n$, not just for $n - 1$. It suits steps that go down by more than one. Every integer $n \ge 2$ is a product of primes: if $n$ is prime, it is a product of one prime; if not, $n = ab$ with $2 \le a, b \lt n$, and both $a$ and $b$ are products of primes by assumption, so $n$ is too. For the stamps, check $8 = 3 + 5$, $9 = 3 + 3 + 3$ and $10 = 5 + 5$; then any $n \ge 11$ is $(n - 3) + 3$, and $n - 3 \ge 8$ can be paid by assumption. Strong induction needs as many base cases as the step reaches back, here three.

Place the base where the step starts to work, find case $n$ inside case $n + 1$, and use strong induction, with enough base cases, when the step reaches back further. The next lesson strengthens the claim to make the step go through.`,
      related: [
        { card: "minimal-counterexample", note: String.raw`strong induction written as a contradiction (P3.2).` },
        { card: "recursive-counting", note: String.raw`recursions, which induction turns into formulas.` },
        { card: "fundamental-theorem-arithmetic", note: String.raw`the factorization whose existence strong induction proves.` }
      ],
      exercises: [
        { q: String.raw`Prove that $2^n \gt n^2$ for every integer $n \ge 5$.`,
          solution: String.raw`Base: $2^5 = 32 \gt 25$. Step: suppose $2^n \gt n^2$ with $n \ge 5$. Then $2^{n+1} \gt 2n^2 = n^2 + n^2 \ge n^2 + 5n \gt n^2 + 2n + 1 = (n + 1)^2$, using $n^2 \ge 5n$ and $5n \gt 2n + 1$. So the claim holds for $n + 1$.` },
        { q: String.raw`Prove that every integer $n \ge 2$ is a product of one or more primes.`,
          solution: String.raw`Strong induction on $n$. The case $n = 2$ is a prime. Suppose every integer from $2$ to $n - 1$ is a product of primes. If $n$ is prime, we are done. Otherwise $n = ab$ with $1 \lt a, b \lt n$; by assumption $a$ and $b$ are products of primes, and so is their product $n$.` },
        { q: String.raw`Prove that every integer $n \ge 8$ can be written as $3x + 5y$ with nonnegative integers $x$, $y$.`,
          solution: String.raw`Base cases: $8 = 3 + 5$, $9 = 3 \cdot 3$, $10 = 2 \cdot 5$. For $n \ge 11$, assume every integer from $8$ to $n - 1$ works. Then $n - 3 \ge 8$ is $3x + 5y$, and $n = 3(x + 1) + 5y$.` },
        { q: String.raw`Prove that $7$ divides $3^{2n+1} + 2^{n+2}$ for every integer $n \ge 0$.`,
          solution: String.raw`Let $a_n = 3^{2n+1} + 2^{n+2}$. Base: $a_0 = 3 + 4 = 7$. Step: $a_{n+1} = 9 \cdot 3^{2n+1} + 2 \cdot 2^{n+2} = 9a_n - 7 \cdot 2^{n+2}$. If $7 \mid a_n$, both terms are multiples of $7$, so $7 \mid a_{n+1}$.` }
      ],
      problems: []
    },
    "P2.3": {
      prereq: ["induction", "am-gm"],
      cards: ["forward-backward-induction", "strengthening-the-hypothesis"],
      body: String.raw`Prove that $1 + \tfrac14 + \tfrac19 + \cdots + \tfrac1{n^2} \lt 2$ for every $n$. The obvious induction fails: from "the sum is less than $2$", adding $\tfrac{1}{(n+1)^2}$ gives nothing. Prove the AM-GM inequality for $n$ numbers. Stepping from $n$ to $n + 1$ numbers is awkward, but from $n$ to $2n$ is easy. Two changes to the plan rescue such proofs.

[[strengthening-the-hypothesis|Strengthening the hypothesis]] proves a stronger statement, because a stronger assumption in the step is easier to use. Claim instead that the sum is at most $2 - \tfrac1n$. For $n = 1$, $1 \le 1$. If the sum up to $\tfrac1{n^2}$ is at most $2 - \tfrac1n$, adding $\tfrac{1}{(n + 1)^2}$ gives at most $2 - \tfrac1n + \tfrac{1}{(n + 1)^2}$, and this is at most $2 - \tfrac{1}{n + 1}$ because $\tfrac1n - \tfrac{1}{n + 1} = \tfrac{1}{n(n + 1)} \gt \tfrac{1}{(n + 1)^2}$. The stronger claim then gives the weaker one. The same idea runs a tiling proof: any $2^n \times 2^n$ board with any one square removed can be tiled by L-shaped trominoes, because the step cuts the board into four quarters and places one tromino at the center so that each quarter is missing one square, a case of the claim, where "this particular square removed" would not be.

[[forward-backward-induction|Forward-backward induction]] reaches every $n$ in two passes. For AM-GM, the case of $2$ numbers is $\tfrac{a + b}{2} \ge \sqrt{ab}$, that is, $(\sqrt a - \sqrt b)^2 \ge 0$. Forward: the case for $n$ numbers gives the case for $2n$, by applying it to each half and then the two-number case to the two averages; so AM-GM holds for $2, 4, 8, \ldots$. Backward: from $n$ numbers to $n - 1$, add as an $n$th number the average $A$ of the first $n - 1$; the $n$-number case says $A \ge \sqrt[n]{a_1 \cdots a_{n-1} A}$, so $A^n \ge a_1 \cdots a_{n-1} A$ and $A^{n-1} \ge a_1 \cdots a_{n-1}$. Every $n$ is below some power of $2$, so every $n$ is reached.

When the step fails because the assumption is too weak, prove more; when combining copies is natural, go forward by doubling and backward by one. The Summary follows.`,
      related: [
        { card: "am-gm", note: String.raw`the inequality the forward-backward induction proves.` },
        { card: "telescoping", note: String.raw`the sum $\tfrac{1}{n(n+1)} = \tfrac1n - \tfrac{1}{n+1}$ behind the strengthened bound.` },
        { card: "tiling-a-board", note: String.raw`tiling questions, often settled by induction or coloring.` }
      ],
      exercises: [
        { q: String.raw`Prove that $1 + \tfrac14 + \tfrac19 + \cdots + \tfrac1{n^2} \lt 2$ for every positive integer $n$.`,
          solution: String.raw`Prove the stronger $S_n \le 2 - \tfrac1n$. For $n = 1$, $S_1 = 1 = 2 - 1$. If $S_n \le 2 - \tfrac1n$, then $S_{n+1} \le 2 - \tfrac1n + \tfrac{1}{(n + 1)^2} \lt 2 - \tfrac1n + \tfrac{1}{n(n + 1)} = 2 - \tfrac{1}{n + 1}$. So $S_n \le 2 - \tfrac1n \lt 2$ for every $n$.` },
        { q: String.raw`Prove that for every $n \ge 1$, a $2^n \times 2^n$ board with any one square removed can be tiled by L-shaped trominoes (three squares in an L).`,
          solution: String.raw`For $n = 1$ the board minus a square is an L-tromino. Suppose the claim holds for $2^n \times 2^n$. Cut a $2^{n+1} \times 2^{n+1}$ board into four $2^n \times 2^n$ quarters. The removed square is in one quarter; place one tromino at the center covering one corner square of each of the other three quarters. Now each quarter is missing exactly one square, and each can be tiled by the assumption.` },
        { q: String.raw`Using that the AM-GM inequality holds for $2$ numbers, prove it for $4$ positive numbers: $\tfrac{a + b + c + d}{4} \ge \sqrt[4]{abcd}$.`,
          solution: String.raw`By the two-number case, $\tfrac{a + b}{2} \ge \sqrt{ab}$ and $\tfrac{c + d}{2} \ge \sqrt{cd}$. Applying it again to the two averages, $\tfrac{a + b + c + d}{4} = \tfrac12\left(\tfrac{a + b}{2} + \tfrac{c + d}{2}\right) \ge \sqrt{\tfrac{a + b}{2} \cdot \tfrac{c + d}{2}} \ge \sqrt{\sqrt{ab}\sqrt{cd}} = \sqrt[4]{abcd}$.` },
        { q: String.raw`Using the case of $4$ numbers, prove AM-GM for $3$ positive numbers $a$, $b$, $c$.`,
          solution: String.raw`Let $A = \tfrac{a + b + c}{3}$. Apply the four-number case to $a, b, c, A$: $\tfrac{a + b + c + A}{4} = \tfrac{3A + A}{4} = A \ge \sqrt[4]{abcA}$. So $A^4 \ge abcA$, and dividing by $A \gt 0$, $A^3 \ge abc$.` }
      ],
      problems: []
    },
    "P2.4": {
      prereq: ["induction", "strong-induction", "forward-backward-induction", "strengthening-the-hypothesis"],
      cards: [],
      body: String.raw`[[induction|Induction]] needs a base and a step from $n$ to $n + 1$; [[strong-induction|strong induction]] lets the step use every smaller case, with enough base cases for how far it reaches back.

[[strengthening-the-hypothesis|A stronger claim]] gives a stronger assumption and can make a stuck step go through, and [[forward-backward-induction|forward-backward induction]] reaches every $n$ by doubling up and stepping down.`,
      strategies: [
        String.raw`Find the case $n$ inside the case $n + 1$ before writing anything.`,
        String.raw`Start the base where the step begins to work.`,
        String.raw`With strong induction, check as many base cases as the step reaches back.`,
        String.raw`If the step is stuck, try proving a stronger statement.`,
        String.raw`When two copies combine naturally, double forward and step back by one.`,
        String.raw`Never prove only the step: a valid step from a false base proves nothing.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The Fibonacci numbers are $F_1 = F_2 = 1$ and $F_{n+2} = F_{n+1} + F_n$. Prove that $F_1 + F_2 + \cdots + F_n = F_{n+2} - 1$.`,
        solution: String.raw`For $n = 1$: $F_1 = 1 = F_3 - 1 = 2 - 1$. If the sum up to $F_n$ is $F_{n+2} - 1$, adding $F_{n+1}$ gives $F_{n+2} + F_{n+1} - 1 = F_{n+3} - 1$.` },
      { q: String.raw`Prove that $n$ lines in the plane, no two parallel and no three through one point, divide it into $\tfrac{n(n + 1)}{2} + 1$ regions.`,
        solution: String.raw`For $n = 0$ there is $1$ region. Add the $(n + 1)$st line to $n$ lines. It crosses each of them once, at $n$ different points, which cut it into $n + 1$ pieces, and each piece splits one region in two. So the count grows by $n + 1$: $\tfrac{n(n + 1)}{2} + 1 + (n + 1) = \tfrac{(n + 1)(n + 2)}{2} + 1$.` },
      { q: String.raw`Prove Bernoulli's inequality: $(1 + x)^n \ge 1 + nx$ for every integer $n \ge 1$ and real $x \ge -1$.`,
        solution: String.raw`For $n = 1$ it is an equality. If $(1 + x)^n \ge 1 + nx$, multiply by $1 + x \ge 0$: $(1 + x)^{n+1} \ge (1 + nx)(1 + x) = 1 + (n + 1)x + nx^2 \ge 1 + (n + 1)x$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that every positive integer is a sum of distinct powers of $2$.`,
        solution: String.raw`Strong induction. $1 = 2^0$. For $n \ge 2$, let $2^k$ be the largest power of $2$ with $2^k \le n$. If $n = 2^k$, done. Otherwise $0 \lt n - 2^k \lt 2^k$, since $n \lt 2^{k+1}$. By assumption $n - 2^k$ is a sum of distinct powers of $2$, all less than $2^k$, so adding $2^k$ keeps them distinct.` },
      { q: String.raw`Prove that every positive integer is a sum of distinct Fibonacci numbers, no two consecutive in the sequence $1, 2, 3, 5, 8, \ldots$.`,
        solution: String.raw`Strong induction. Small cases $1$, $2$, $3$ are Fibonacci numbers. For $n$, let $F$ be the largest Fibonacci number at most $n$, and $F'$ the next one, so $n \lt F'$. If $n = F$, done. Otherwise $r = n - F$ satisfies $0 \lt r \lt F' - F$, which is the Fibonacci number just before $F$. By assumption $r$ is such a sum, and every term in it is less than the number before $F$, so adding $F$ keeps the terms distinct and non-consecutive.` },
      { q: String.raw`Prove that for every $n \ge 1$, $\tfrac{1}{\sqrt1} + \tfrac{1}{\sqrt2} + \cdots + \tfrac{1}{\sqrt n} \le 2\sqrt n - 1$.`,
        solution: String.raw`For $n = 1$: $1 \le 1$. If it holds for $n$, it suffices that $2\sqrt n - 1 + \tfrac{1}{\sqrt{n + 1}} \le 2\sqrt{n + 1} - 1$, that is, $\tfrac{1}{\sqrt{n + 1}} \le 2(\sqrt{n + 1} - \sqrt n) = \tfrac{2}{\sqrt{n + 1} + \sqrt n}$. This holds since $\sqrt{n + 1} + \sqrt n \le 2\sqrt{n + 1}$.` }
    ],
    problems: []
  }
};
