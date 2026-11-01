// Learn, Olympiad Algebra, chapter E1: symmetric inequalities (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every inequality was checked numerically.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["E1"] = {
  lessons: {
    "E1.1": {
      prereq: ["am-gm", "trivial-inequality"],
      cards: [],
      body: String.raw`Olympiad inequalities in three variables are usually symmetric: exchanging the variables does not change them. The AIME tools, AM-GM and the fact that a square is never negative, prove many of them, but not all. This chapter adds the inequalities designed for symmetric sums, Schur's inequality, which holds where AM-GM is too weak, and Muirhead's and Maclaurin's, which compare whole families of symmetric sums at once.

The inequality $a^2 + b^2 + c^2 \ge ab + bc + ca$ is half of $(a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$. If $x + y + z = 3$ with $x, y, z \ge 0$, then $xyz \le 1$ by AM-GM. And $x^3 + y^3 + z^3 + 3xyz \ge xy(x + y) + yz(y + z) + zx(z + x)$, Schur's inequality, is an equality both at $x = y = z$ and at $x = y$, $z = 0$; no sum of squares and no single AM-GM gives an inequality with that second equality case, which is why Schur is needed.

The lessons are Schur's inequality (E1.2) and Muirhead and Maclaurin (E1.3). The Summary (E1.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that $a^2 + b^2 + c^2 \ge ab + bc + ca$ for all real $a$, $b$, $c$.`,
          solution: String.raw`$2(a^2 + b^2 + c^2) - 2(ab + bc + ca) = (a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$. Equality holds exactly when $a = b = c$.` },
        { q: String.raw`Check that $x^3 + y^3 + z^3 + 3xyz = xy(x + y) + yz(y + z) + zx(z + x)$ when $x = y = 1$ and $z = 0$.`,
          solution: String.raw`The left side is $1 + 1 + 0 + 0 = 2$. The right side is $1 \cdot 1 \cdot 2 + 0 + 0 = 2$. So Schur's inequality is an equality there as well as at $x = y = z$.` }
      ],
      problems: []
    },
    "E1.2": {
      prereq: ["am-gm", "symmetric-polynomial-strategies", "wlog-symmetry"],
      cards: ["schurs-inequality", "vornicu-schur"],
      body: String.raw`Why is $x^3 + y^3 + z^3 + 3xyz \ge xy(x + y) + yz(y + z) + zx(z + x)$ for nonnegative $x$, $y$, $z$? Why is $4(ab + bc + ca) \le 1 + 9abc$ when $a + b + c = 1$? Schur's inequality proves the symmetric inequalities whose equality cases include a variable equal to zero.

[[schurs-inequality|Schur's inequality]] says that for $x, y, z \ge 0$ and $t \gt 0$, $x^t(x - y)(x - z) + y^t(y - x)(y - z) + z^t(z - x)(z - y) \ge 0$. The proof is a grouping. Since the expression is symmetric, assume $x \ge y \ge z$. The last term $z^t(z - x)(z - y)$ is a product of $z^t$ and two numbers that are both at most $0$, so it is at least $0$. The first two terms combine to $(x - y)\left[x^t(x - z) - y^t(y - z)\right]$, and since $x^t \ge y^t$ and $x - z \ge y - z \ge 0$, the bracket is at least $0$. For $t = 1$ the inequality expands to the form above, with equality at $x = y = z$ and at two equal variables with the third zero.

The $t = 1$ case is most useful in the language of $p = x + y + z$, $q = xy + yz + zx$, $r = xyz$: it reads $p^3 - 4pq + 9r \ge 0$. With $p = 1$ it is $4q \le 1 + 9r$, the second example. Schur in this form gives a lower bound on $r$, which AM-GM cannot, since AM-GM bounds $r$ only from above; problems that ask for $r$ to be large enough, or that involve $q$ and $r$ with opposite signs, call for it.

[[vornicu-schur|The Vornicu-Schur inequality]] generalizes the weights: for $x \ge y \ge z$ and nonnegative $a$, $b$, $c$ with $a \ge b$ or $c \ge b$, $a(x - y)(x - z) + b(y - x)(y - z) + c(z - x)(z - y) \ge 0$. The same grouping proves it. It is used when the natural weights are not powers of the variables, such as $a = y + z$ or $a = \tfrac1x$.

Order the variables, group the two largest terms, and translate into $p$, $q$, $r$ when a lower bound on $xyz$ is needed. The next lesson compares whole symmetric sums.`,
      related: [
        { card: "uvw-method", note: String.raw`checking the cases $b = c$ and $c = 0$ that Schur's equality points to (E3.3).` },
        { card: "sos-method", note: String.raw`writing a symmetric difference as weighted squares (E3.3).` },
        { card: "symmetric-polynomial-strategies", note: String.raw`rewriting in $p$, $q$, $r$.` }
      ],
      exercises: [
        { q: String.raw`Prove Schur's inequality for $t = 1$: $x(x - y)(x - z) + y(y - x)(y - z) + z(z - x)(z - y) \ge 0$ for $x, y, z \ge 0$.`,
          solution: String.raw`The expression is symmetric, so assume $x \ge y \ge z \ge 0$. Then $z(z - x)(z - y) \ge 0$, a nonnegative number times two nonpositive ones. And $x(x - y)(x - z) + y(y - x)(y - z) = (x - y)[x(x - z) - y(y - z)]$; here $x - y \ge 0$, and $x(x - z) \ge y(y - z)$ since $x \ge y \ge 0$ and $x - z \ge y - z \ge 0$. So the whole is at least $0$.` },
        { q: String.raw`Show that Schur's inequality for $t = 1$ is $p^3 - 4pq + 9r \ge 0$, where $p = x + y + z$, $q = xy + yz + zx$, $r = xyz$.`,
          solution: String.raw`Expanded, Schur is $x^3 + y^3 + z^3 + 3xyz \ge \sum xy(x + y)$. Now $x^3 + y^3 + z^3 = p^3 - 3pq + 3r$ and $\sum xy(x + y) = pq - 3r$. So Schur is $p^3 - 3pq + 3r + 3r \ge pq - 3r$, that is, $p^3 - 4pq + 9r \ge 0$.` },
        { q: String.raw`Let $a, b, c \ge 0$ with $a + b + c = 1$. Prove that $4(ab + bc + ca) \le 1 + 9abc$.`,
          solution: String.raw`By the previous problem with $p = 1$, Schur gives $1 - 4q + 9r \ge 0$, which is the claim. Equality holds at $a = b = c = \tfrac13$ and at $a = b = \tfrac12$, $c = 0$.` }
      ],
      problems: []
    },
    "E1.3": {
      prereq: ["am-gm", "power-mean-inequality"],
      cards: ["muirheads-inequality", "maclaurin-inequality"],
      body: String.raw`Is $\sum x^3 \ge \sum x^2 y$ over all orderings? Is $x^2y + x^2z + \cdots \ge 6xyz$? If $xy + yz + zx = 3$, must $x + y + z \ge 3$ and $xyz \le 1$? Two inequalities compare symmetric sums by their exponents or their degrees.

[[muirheads-inequality|Muirhead's inequality]] compares symmetric sums of monomials. Write $\sum_{\text{sym}} x^{a_1}y^{a_2}z^{a_3}$ for the sum over all $6$ orderings of the exponents. If the exponent list $(a_1, a_2, a_3)$, in decreasing order, majorizes $(b_1, b_2, b_3)$, meaning $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, and both lists add to the same total, then $\sum_{\text{sym}} x^{a}\cdots \ge \sum_{\text{sym}} x^{b}\cdots$ for positive variables. So $(2, 0, 0) \succ (1, 1, 0)$ gives $a^2 + b^2 + c^2 \ge ab + bc + ca$, $(3, 0, 0) \succ (2, 1, 0)$ gives $2\sum a^3 \ge \sum_{\text{sym}} a^2b$, and $(2, 1, 0) \succ (1, 1, 1)$ gives $\sum_{\text{sym}} a^2b \ge 6abc$. Each step of Muirhead is a sum of AM-GMs, which is how a solution should present it: Muirhead is for finding the inequality, AM-GM for writing it down. It needs the inequality to be homogeneous and symmetric; a cyclic sum is not enough.

[[maclaurin-inequality|Maclaurin's inequality]] compares the averaged elementary symmetric sums. With $p_k = \tfrac{e_k}{\binom nk}$, where $e_k$ is the sum of all products of $k$ of the variables, it says $p_1 \ge \sqrt{p_2} \ge \sqrt[3]{p_3} \ge \cdots$. For three variables with $xy + yz + zx = 3$, $p_2 = 1$, so $\tfrac{x + y + z}{3} \ge 1$ and $\sqrt[3]{xyz} \le 1$. The first and last links are AM-GM; the middle ones come from Newton's inequalities $p_k^2 \ge p_{k-1}p_{k+1}$.

Read exponent lists for Muirhead and then write the AM-GMs; chain Maclaurin's averages to pass between $x + y + z$, $xy + yz + zx$ and $xyz$. The Summary follows.`,
      related: [
        { card: "karamata-inequality", note: String.raw`majorization for any convex function (E2.3).` },
        { card: "power-mean-inequality", note: String.raw`the power means, another chain of averages.` },
        { card: "homogenization", note: String.raw`making an inequality homogeneous before Muirhead applies (E3.2).` }
      ],
      exercises: [
        { q: String.raw`Prove that $a^3 + b^3 \ge a^2b + ab^2$ for $a, b \ge 0$, and deduce $2(a^3 + b^3 + c^3) \ge a^2b + ab^2 + b^2c + bc^2 + c^2a + ca^2$.`,
          solution: String.raw`$a^3 + b^3 - a^2b - ab^2 = a^2(a - b) - b^2(a - b) = (a - b)^2(a + b) \ge 0$. Adding this for the pairs $(a, b)$, $(b, c)$, $(c, a)$ gives the second inequality, which is Muirhead's $(3, 0, 0) \succ (2, 1, 0)$.` },
        { q: String.raw`Prove that $a^2b + a^2c + b^2a + b^2c + c^2a + c^2b \ge 6abc$ for positive $a$, $b$, $c$.`,
          solution: String.raw`By AM-GM on the six terms, their average is at least $\sqrt[6]{a^6b^6c^6} = abc$. So the sum is at least $6abc$. (This is Muirhead's $(2, 1, 0) \succ (1, 1, 1)$.)` },
        { q: String.raw`Positive $x$, $y$, $z$ satisfy $xy + yz + zx = 3$. Prove that $x + y + z \ge 3$ and $xyz \le 1$.`,
          solution: String.raw`From $(x + y + z)^2 \ge 3(xy + yz + zx) = 9$, $x + y + z \ge 3$. For the product, AM-GM on $xy$, $yz$, $zx$: $1 = \tfrac{xy + yz + zx}{3} \ge \sqrt[3]{x^2y^2z^2}$, so $xyz \le 1$. These are the links $p_1 \ge \sqrt{p_2}$ and $\sqrt{p_2} \ge \sqrt[3]{p_3}$ of Maclaurin's chain.` }
      ],
      problems: []
    },
    "E1.4": {
      prereq: ["schurs-inequality", "vornicu-schur", "muirheads-inequality", "maclaurin-inequality"],
      cards: [],
      body: String.raw`[[schurs-inequality|Schur's inequality]] is proved by ordering the variables and grouping, and in $p$, $q$, $r$ it gives the lower bound $9r \ge 4pq - p^3$; [[vornicu-schur|Vornicu-Schur]] allows other weights.

[[muirheads-inequality|Muirhead]] compares symmetric sums whose exponents majorize each other, and is written out as AM-GMs; [[maclaurin-inequality|Maclaurin]] chains the averaged symmetric sums.`,
      strategies: [
        String.raw`Find the equality cases first; a case with a variable at $0$ points to Schur.`,
        String.raw`Translate a symmetric inequality into $p$, $q$, $r$.`,
        String.raw`Use Muirhead to see which symmetric sum is larger, then write the proof with AM-GM.`,
        String.raw`Check that an inequality is homogeneous and symmetric, not only cyclic, before Muirhead.`,
        String.raw`Pass between $x + y + z$, $xy + yz + zx$ and $xyz$ with Maclaurin's chain.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that $(a + b)(b + c)(c + a) \ge 8abc$ for positive $a$, $b$, $c$.`,
        solution: String.raw`By AM-GM, $a + b \ge 2\sqrt{ab}$, $b + c \ge 2\sqrt{bc}$, $c + a \ge 2\sqrt{ca}$. Multiplying, $(a + b)(b + c)(c + a) \ge 8\sqrt{a^2b^2c^2} = 8abc$.` },
      { q: String.raw`Prove that $a^4 + b^4 + c^4 \ge a^2b^2 + b^2c^2 + c^2a^2$ for real $a$, $b$, $c$.`,
        solution: String.raw`Apply $u^2 + v^2 + w^2 \ge uv + vw + wu$ to $u = a^2$, $v = b^2$, $w = c^2$. (It is also Muirhead's $(4, 0, 0) \succ (2, 2, 0)$.)` },
      { q: String.raw`Prove that for $x, y, z \ge 0$, $x^3 + y^3 + z^3 + 3xyz \ge xy(x + y) + yz(y + z) + zx(z + x)$, and find all cases of equality.`,
        solution: String.raw`This is Schur's inequality for $t = 1$, proved in E1.2 with $x \ge y \ge z$: the left side minus the right is $(x - y)^2(x + y - z) + z(x - z)(y - z)$, a sum of two nonnegative terms. Equality needs both to vanish: either $x = y$, and then $z(x - z)^2 = 0$, so $z = 0$ or $z = x$; or $x + y = z$, which with $z \le y \le x$ gives $x \le 0$, so all three are $0$. So equality holds exactly when $x = y = z$ or when two variables are equal and the third is $0$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Let $a, b, c \ge 0$ with $a + b + c = 3$. Prove that $a^2 + b^2 + c^2 + abc \ge 4$.`,
        solution: String.raw`With $p = 3$, $a^2 + b^2 + c^2 = 9 - 2q$, so the claim is $r \ge 2q - 5$. Schur gives $27 - 12q + 9r \ge 0$, so $r \ge \tfrac{4q - 9}{3}$. It suffices that $\tfrac{4q - 9}{3} \ge 2q - 5$, that is, $q \le 3$, which holds because $q \le \tfrac{p^2}{3} = 3$. Equality holds at $a = b = c = 1$.` },
      { q: String.raw`Let $a$, $b$, $c$ be positive with $abc = 1$. Prove that $a^2 + b^2 + c^2 \ge a + b + c$.`,
        solution: String.raw`By AM-GM, $a + b + c \ge 3\sqrt[3]{abc} = 3$. And $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3} = (a + b + c) \cdot \tfrac{a + b + c}{3} \ge a + b + c$.` },
      { q: String.raw`Prove that for positive $a$, $b$, $c$, $\tfrac{a^3 + b^3 + c^3}{3} \ge \left(\tfrac{a + b + c}{3}\right)\left(\tfrac{ab + bc + ca}{3}\right)$.`,
        solution: String.raw`Multiply by $9$: the claim is $3(a^3 + b^3 + c^3) \ge (a + b + c)(ab + bc + ca) = \sum_{\text{sym}} a^2b + 3abc$, where $\sum_{\text{sym}} a^2b$ has six terms. By E1.3, $2\sum a^3 \ge \sum_{\text{sym}} a^2b$, and by AM-GM $\sum a^3 \ge 3abc$. Adding gives the claim.` }
    ],
    problems: []
  }
};
