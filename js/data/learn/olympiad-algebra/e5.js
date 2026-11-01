// Learn, Olympiad Algebra, chapter E5: functional equations, sums and matrices (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["E5"] = {
  lessons: {
    "E5.1": {
      prereq: ["functional-substitution", "cauchy-schwarz", "linear-recurrence"],
      cards: [],
      body: String.raw`This chapter collects three olympiad topics that share a habit of substitution: functional equations, where the unknown is a function and the move is to plug in well-chosen values; sums rearranged by parts, the discrete form of integration by parts; and matrices, whose powers and determinants encode recurrences and products.

If $f(x) + 2f(1 - x) = x$ for every real $x$, replacing $x$ by $1 - x$ gives $f(1 - x) + 2f(x) = 1 - x$, and the two equations solve for $f(x) = \tfrac23 - x$. The identity $(a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2$, Lagrange's identity for two terms, proves Cauchy-Schwarz with its equality case. And the matrix $\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ has trace $4$ and determinant $3$, so its eigenvalues, adding to $4$ and multiplying to $3$, are $1$ and $3$.

The lessons are functional equations at olympiad level (E5.2), summation by parts and Lagrange's identity (E5.3), and matrices in olympiad algebra (E5.4). The Summary (E5.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Find all functions $f: \mathbb{R} \to \mathbb{R}$ with $f(x) + 2f(1 - x) = x$ for every real $x$.`,
          solution: String.raw`Replace $x$ by $1 - x$: $f(1 - x) + 2f(x) = 1 - x$. Doubling this and subtracting the original equation gives $3f(x) = 2 - 2x - x = 2 - 3x$, so $f(x) = \tfrac23 - x$. Check: $\tfrac23 - x + 2\left(\tfrac23 - 1 + x\right) = x$. So $f(x) = \tfrac23 - x$ is the only solution.` },
        { q: String.raw`Verify that $(a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2$.`,
          solution: String.raw`The right side is $a^2c^2 + 2abcd + b^2d^2 + a^2d^2 - 2abcd + b^2c^2 = a^2c^2 + a^2d^2 + b^2c^2 + b^2d^2$, which is the left side expanded.` },
        { q: String.raw`What are the eigenvalues of $\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$?`,
          solution: String.raw`They are the roots of $\det\begin{pmatrix} 2 - \lambda & 1 \\ 1 & 2 - \lambda \end{pmatrix} = (2 - \lambda)^2 - 1 = (\lambda - 1)(\lambda - 3)$: $1$ and $3$. They add to the trace $4$ and multiply to the determinant $3$.` }
      ],
      problems: []
    },
    "E5.2": {
      prereq: ["functional-substitution"],
      cards: ["injectivity-surjectivity"],
      body: String.raw`Find all $f: \mathbb{R} \to \mathbb{R}$ with $f(x)f(y) - f(xy) = x + y$. Find all $f: \mathbb{Z} \to \mathbb{Z}$ with $f(f(n)) = n + 2$. An olympiad functional equation is solved by substitutions that produce facts about $f$, and two of the most useful facts are that $f$ is one-to-one or onto.

The first moves are always the same: substitute $0$, $1$, equal variables, and values that make an argument vanish, and see what each gives. For $f(x)f(y) - f(xy) = x + y$, setting $x = y = 0$ gives $f(0)^2 = f(0)$, so $f(0)$ is $0$ or $1$; setting $y = 0$ gives $f(x)f(0) - f(0) = x$, which with $f(0) = 0$ would say $0 = x$, so $f(0) = 1$ and $f(x) = x + 1$. Then the candidate must be checked in the original equation: $(x + 1)(y + 1) - (xy + 1) = x + y$. A solution is not complete until every candidate is checked and no case is left out.

[[injectivity-surjectivity|Injectivity and surjectivity]] are the structural facts. A function is injective if $f(a) = f(b)$ forces $a = b$, and surjective if every value is taken. An equation such as $f(f(n)) = n + 2$ makes $f$ injective, since $f(a) = f(b)$ gives $a + 2 = b + 2$; injectivity lets $f$ be cancelled from both sides of an equation $f(\cdots) = f(\cdots)$. Here, applying $f$ to both sides, $f(n + 2) = f(f(f(n))) = f(n) + 2$, so $f$ is fixed by $f(0)$ and $f(1)$, and checking parities shows the solutions are exactly $f(n) = n + 1 + 2c$ for even $n$ and $f(n) = n + 1 - 2c$ for odd $n$, for an integer $c$. Surjectivity gives a point $a$ with $f(a) = 0$, a value worth substituting.

Substitute the special values first, prove injectivity or surjectivity when $f$ appears inside itself, and always check the candidates. The next lesson rearranges sums.`,
      related: [
        { card: "cauchy-functional-equations", note: String.raw`additive functions, and why regularity is needed for $f(x) = cx$.` },
        { card: "periodic-sequences", note: String.raw`relations like $f(n + 2) = f(n) + 2$ that reduce $f$ to a few values.` }
      ],
      exercises: [
        { q: String.raw`Find all functions $f: \mathbb{R} \to \mathbb{R}$ such that $f(x)f(y) - f(xy) = x + y$ for all real $x$, $y$.`,
          solution: String.raw`With $x = y = 0$, $f(0)^2 - f(0) = 0$, so $f(0) \in \{0, 1\}$. With $y = 0$, $f(0)(f(x) - 1) = x$ for every $x$; if $f(0) = 0$ this says $0 = x$ for all $x$, false. So $f(0) = 1$ and $f(x) = x + 1$. Check: $(x + 1)(y + 1) - (xy + 1) = x + y$. The only solution is $f(x) = x + 1$.` },
        { q: String.raw`Let $f: \mathbb{R} \to \mathbb{R}$ satisfy $f(f(x)) = x + 1$ for all $x$. Prove that $f$ is injective and that $f(x + 1) = f(x) + 1$.`,
          solution: String.raw`If $f(a) = f(b)$, then $f(f(a)) = f(f(b))$, so $a + 1 = b + 1$ and $a = b$. Applying $f$ to $f(f(x)) = x + 1$: $f(f(f(x))) = f(x + 1)$, and by the equation applied at $f(x)$ the left side is $f(x) + 1$.` },
        { q: String.raw`Find all functions $f: \mathbb{Z} \to \mathbb{Z}$ with $f(f(n)) = n + 2$ for every integer $n$.`,
          solution: String.raw`As in the last problem, $f(n + 2) = f(n) + 2$, so $f(2k) = a + 2k$ and $f(2k + 1) = b + 2k$ with $a = f(0)$, $b = f(1)$. If $a$ were even, $f(a) = 2a = 2$ would give $a = 1$, odd; so $a = 2m + 1$ and $f(a) = b + 2m = 2$. If $b$ were odd, $b = 2j + 1$, then $f(b) = b + 2j = 4j + 1 = 3$ would be impossible; so $b$ is even, $b = 2 - 2m$. Then $f(n) = n + 2m + 1$ for even $n$ and $f(n) = n + 1 - 2m$ for odd $n$. These all work: an even $n$ goes to the odd $n + 2m + 1$ and back to $n + 2m + 2 - 2m = n + 2$, and similarly for odd $n$. So the solutions are this family, one for each integer $m$.` }
      ],
      problems: []
    },
    "E5.3": {
      prereq: ["cauchy-schwarz", "telescoping"],
      cards: ["abel-summation", "lagranges-identity"],
      body: String.raw`What is $1 \cdot 2 + 2 \cdot 2^2 + \cdots + 10 \cdot 2^{10}$? If $a_1 \ge a_2 \ge \cdots \ge a_n \ge 0$ and every partial sum of the $b_k$ is nonnegative, why is $\sum a_kb_k \ge 0$? Why does Cauchy-Schwarz hold, and when is it an equality? Two identities rearrange sums.

[[abel-summation|Summation by parts]] moves a difference from one factor to the other: with $A_k = a_1 + \cdots + a_k$, $\sum_{k=1}^{n} a_kb_k = A_nb_n - \sum_{k=1}^{n-1} A_k(b_{k+1} - b_k)$. It is the discrete form of integration by parts, and it helps when the partial sums of one sequence are simple and the differences of the other are small or of one sign. For $\sum k \cdot 2^k$, take $a_k = 2^k$ with $A_k = 2^{k+1} - 2$, and $b_k = k$ with differences $1$: the sum is $(2^{n+1} - 2)n - \sum_{k=1}^{n-1}(2^{k+1} - 2) = (n - 1)2^{n+1} + 2$, which is $18434$ for $n = 10$. For the sign question, write $\sum a_kb_k = \sum_{k} B_k(a_k - a_{k+1}) + B_na_n$ with $B_k$ the partial sums of $b$: every term is a product of two nonnegative numbers.

[[lagranges-identity|Lagrange's identity]] writes the gap in Cauchy-Schwarz as a sum of squares: $\left(\sum a_i^2\right)\left(\sum b_i^2\right) - \left(\sum a_ib_i\right)^2 = \sum_{i \lt j}(a_ib_j - a_jb_i)^2$. So the gap is at least $0$, with equality exactly when every $a_ib_j = a_jb_i$, that is, when the two sequences are proportional. For two terms it is $(a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2$, which also shows that a product of two sums of two squares is a sum of two squares.

Sum by parts when one factor has simple partial sums, and write the Cauchy-Schwarz gap as squares to see its equality case. The next lesson uses matrices.`,
      related: [
        { card: "telescoping", note: String.raw`the sums of differences that summation by parts produces.` },
        { card: "brahmagupta-fibonacci", note: String.raw`the two-squares product identity as a statement about sums of squares.` },
        { card: "cauchy-schwarz", note: String.raw`the inequality whose gap Lagrange's identity computes.` }
      ],
      exercises: [
        { q: String.raw`Compute $\sum_{k=1}^{10} k \cdot 2^k$.`, answer: "18434",
          solution: String.raw`By summation by parts with $a_k = 2^k$, $A_k = 2^{k+1} - 2$, $b_k = k$: the sum is $10(2^{11} - 2) - \sum_{k=1}^{9}(2^{k+1} - 2) = 20460 - (2^{11} - 4 - 18) = 20460 - 2026 = 18434$, which is $(n - 1)2^{n+1} + 2$ at $n = 10$.` },
        { q: String.raw`Let $a_1 \ge a_2 \ge \cdots \ge a_n \ge 0$, and let $b_1, \ldots, b_n$ be real numbers whose partial sums $B_k = b_1 + \cdots + b_k$ are all nonnegative. Prove that $a_1b_1 + \cdots + a_nb_n \ge 0$.`,
          solution: String.raw`With $b_k = B_k - B_{k-1}$ and $B_0 = 0$, summation by parts gives $\sum_{k=1}^{n} a_kb_k = \sum_{k=1}^{n-1} B_k(a_k - a_{k+1}) + B_na_n$. Each $B_k \ge 0$, each $a_k - a_{k+1} \ge 0$, and $a_n \ge 0$, so the sum is at least $0$.` },
        { q: String.raw`Prove the Cauchy-Schwarz inequality for three terms, with its equality case, from Lagrange's identity.`,
          solution: String.raw`$(a_1^2 + a_2^2 + a_3^2)(b_1^2 + b_2^2 + b_3^2) - (a_1b_1 + a_2b_2 + a_3b_3)^2 = (a_1b_2 - a_2b_1)^2 + (a_1b_3 - a_3b_1)^2 + (a_2b_3 - a_3b_2)^2 \ge 0$, as expanding both sides confirms. Equality holds exactly when all three squares are $0$, that is, when the vectors $(a_i)$ and $(b_i)$ are proportional.` }
      ],
      problems: []
    },
    "E5.4": {
      prereq: ["determinant-geometric", "linear-recurrence", "vietas-quadratic"],
      cards: ["eigenvalues-characteristic", "cayley-hamilton", "vandermonde-determinant"],
      body: String.raw`Why is $F_{n+1}F_{n-1} - F_n^2 = (-1)^n$ for the Fibonacci numbers? How is $\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}^3$ computed without multiplying three times? What is the determinant whose rows are $1, x, x^2$ for $x = 1, 2, 3$? Matrices turn recurrences and products into algebra.

[[eigenvalues-characteristic|Eigenvalues]] are the numbers $\lambda$ with $A\mathbf v = \lambda\mathbf v$ for some nonzero $\mathbf v$, the roots of the characteristic polynomial $\det(A - \lambda I)$. They add to the trace and multiply to the determinant, as Vieta's formulas say. A recurrence $x_{n+1} = ax_n + bx_{n-1}$ is the matrix $\begin{pmatrix} a & b \\ 1 & 0 \end{pmatrix}$ acting on $(x_n, x_{n-1})$, and its eigenvalues are the roots of the recurrence's characteristic equation. For Fibonacci, $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$, and taking determinants, with $\det\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} = -1$, gives Cassini's identity $F_{n+1}F_{n-1} - F_n^2 = (-1)^n$.

[[cayley-hamilton|The Cayley-Hamilton theorem]] says that a matrix satisfies its own characteristic polynomial. For a $2 \times 2$ matrix, $A^2 = (\operatorname{tr}A)A - (\det A)I$, so every power of $A$ is a combination of $A$ and $I$. For $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$, $A^2 = 4A - 3I$ and $A^3 = 4A^2 - 3A = 13A - 12I = \begin{pmatrix} 14 & 13 \\ 13 & 14 \end{pmatrix}$.

[[vandermonde-determinant|The Vandermonde determinant]], with rows $1, x_i, x_i^2, \ldots, x_i^{n-1}$, equals $\prod_{i \lt j}(x_j - x_i)$: it is a polynomial that vanishes whenever two $x_i$ coincide, so it is divisible by each difference, and comparing degrees fixes the constant. For $x = 1, 2, 3$ it is $(2 - 1)(3 - 1)(3 - 2) = 2$. It is why a polynomial of degree less than $n$ is fixed by its values at $n$ points.

Encode a linear recurrence as a matrix and take determinants, reduce powers with Cayley-Hamilton, and factor a Vandermonde determinant by its differences. The Summary follows.`,
      related: [
        { card: "linear-recurrence", note: String.raw`the characteristic equation of a recurrence, the eigenvalues of its matrix.` },
        { card: "lagrange-interpolation", note: String.raw`a polynomial through $n$ points, unique because the Vandermonde determinant is not $0$.` },
        { card: "determinant-geometric", note: String.raw`the determinant as a signed area (S10.3).` }
      ],
      exercises: [
        { q: String.raw`Prove Cassini's identity $F_{n+1}F_{n-1} - F_n^2 = (-1)^n$ for $n \ge 1$, where $F_0 = 0$, $F_1 = 1$.`,
          solution: String.raw`By induction, $M^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$ for $M = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$: it holds for $n = 1$, and multiplying by $M$ gives $\begin{pmatrix} F_{n+1} + F_n & F_{n+1} \\ F_n + F_{n-1} & F_n \end{pmatrix}$, the case $n + 1$. Taking determinants, $\det M^n = (\det M)^n = (-1)^n$, and $\det M^n = F_{n+1}F_{n-1} - F_n^2$.` },
        { q: String.raw`Let $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. Use the Cayley-Hamilton theorem to find $A^3$.`,
          solution: String.raw`The trace is $4$ and the determinant $3$, so $A^2 = 4A - 3I$. Then $A^3 = 4A^2 - 3A = 4(4A - 3I) - 3A = 13A - 12I = \begin{pmatrix} 14 & 13 \\ 13 & 14 \end{pmatrix}$.` },
        { q: String.raw`Compute the determinant with rows $(1, 1, 1)$, $(1, 2, 4)$, $(1, 3, 9)$.`, answer: "2",
          solution: String.raw`It is a Vandermonde determinant with $x_1 = 1$, $x_2 = 2$, $x_3 = 3$, equal to $(x_2 - x_1)(x_3 - x_1)(x_3 - x_2) = 1 \cdot 2 \cdot 1 = 2$.` }
      ],
      problems: []
    },
    "E5.5": {
      prereq: ["injectivity-surjectivity", "abel-summation", "lagranges-identity", "eigenvalues-characteristic", "cayley-hamilton", "vandermonde-determinant"],
      cards: [],
      body: String.raw`[[injectivity-surjectivity|Injectivity and surjectivity]] are the structural facts behind functional equations, found by substituting special values and checked at the end.

[[abel-summation|Summation by parts]] moves differences between factors, and [[lagranges-identity|Lagrange's identity]] writes the Cauchy-Schwarz gap as squares.

[[eigenvalues-characteristic|Eigenvalues]] add to the trace and multiply to the determinant; [[cayley-hamilton|Cayley-Hamilton]] reduces powers; [[vandermonde-determinant|the Vandermonde determinant]] is the product of the differences.`,
      strategies: [
        String.raw`In a functional equation, substitute $0$, $1$, equal variables and values that cancel an argument.`,
        String.raw`When $f$ appears inside itself, look for injectivity or surjectivity.`,
        String.raw`Check every candidate function in the original equation.`,
        String.raw`Sum by parts when one factor has simple partial sums.`,
        String.raw`Encode a linear recurrence as a matrix and take determinants for identities.`,
        String.raw`Reduce matrix powers with Cayley-Hamilton.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A function $f: \mathbb{R} \to \mathbb{R}$ satisfies $f(x + 1) = f(x) + 2$ for every $x$, and $f(0) = 1$. What is $f(10)$?`, answer: "21",
        solution: String.raw`Applying the relation ten times, $f(10) = f(0) + 2 \cdot 10 = 21$.` },
      { q: String.raw`Write $(1^2 + 2^2)(3^2 + 4^2)$ as a sum of two squares in two ways.`,
        solution: String.raw`By Lagrange's identity, $(ac + bd)^2 + (ad - bc)^2 = (3 + 8)^2 + (4 - 6)^2 = 121 + 4$, and with the roles of $c$ and $d$ swapped, $(ad + bc)^2 + (ac - bd)^2 = (4 + 6)^2 + (3 - 8)^2 = 100 + 25$. Both are $125$.` },
      { q: String.raw`A $2 \times 2$ matrix has trace $5$ and determinant $6$. What are its eigenvalues?`,
        solution: String.raw`They are the roots of $\lambda^2 - 5\lambda + 6 = (\lambda - 2)(\lambda - 3)$: $2$ and $3$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Find all functions $f: \mathbb{Q} \to \mathbb{Q}$ with $f(x + y) = f(x) + f(y)$ for all rationals $x$, $y$.`,
        solution: String.raw`With $x = y = 0$, $f(0) = 0$, and with $y = -x$, $f(-x) = -f(x)$. By induction $f(nx) = nf(x)$ for positive integers $n$, hence for all integers. Let $c = f(1)$. For $x = \tfrac pq$, $qf\left(\tfrac pq\right) = f(p) = pc$, so $f(x) = cx$. Every $f(x) = cx$ works, so these are all the solutions.` },
      { q: String.raw`Let $A$ be a real $2 \times 2$ matrix with $A^2 = 0$. Prove that $\operatorname{tr}A = 0$ and $\det A = 0$.`,
        solution: String.raw`By Cayley-Hamilton, $A^2 - tA + dI = 0$ with $t = \operatorname{tr}A$, $d = \det A$, so $tA = dI$. Also $\det(A^2) = d^2 = 0$, so $d = 0$ and $tA = 0$. If $t \ne 0$, then $A = 0$, whose trace is $0$, a contradiction. So $t = 0$.` },
      { q: String.raw`Prove that for real numbers $a_1 \ge a_2 \ge \cdots \ge a_n \gt 0$ and $b_1, \ldots, b_n$ whose partial sums satisfy $|b_1 + \cdots + b_k| \le M$ for every $k$, $|a_1b_1 + \cdots + a_nb_n| \le Ma_1$.`,
        solution: String.raw`By summation by parts, $\sum a_kb_k = \sum_{k=1}^{n-1} B_k(a_k - a_{k+1}) + B_na_n$. Each $|B_k| \le M$ and the weights $a_k - a_{k+1}$ and $a_n$ are nonnegative and add to $a_1$. So the absolute value is at most $M\left(\sum_{k=1}^{n-1}(a_k - a_{k+1}) + a_n\right) = Ma_1$.` }
    ],
    problems: []
  }
};
