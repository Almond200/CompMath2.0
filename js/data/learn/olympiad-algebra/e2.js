// Learn, Olympiad Algebra, chapter E2: the classical inequalities (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every inequality was checked numerically.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["E2"] = {
  lessons: {
    "E2.1": {
      prereq: ["cauchy-schwarz", "am-gm", "jensens-inequality"],
      cards: [],
      body: String.raw`Cauchy-Schwarz and AM-GM have relatives that handle more factors, sorted sequences, sums of distances, and convex functions. This chapter collects them: Hölder's inequality, Cauchy-Schwarz with three or more factors; Chebyshev's, for sequences sorted the same way; Minkowski's, the triangle inequality for sums of square roots; and Karamata's and Popoviciu's, which extend Jensen's inequality from averages to majorization.

For instance, $(a^3 + b^3 + c^3)(1 + 1 + 1)(1 + 1 + 1) \ge (a + b + c)^3$ is Hölder with three factors, so $a^3 + b^3 + c^3 \ge \tfrac{(a + b + c)^3}{9}$. And $\sqrt{a^2 + 1} + \sqrt{b^2 + 1} \ge \sqrt{(a + b)^2 + 4}$ is Minkowski: the left side is the length of a path made of the vectors $(a, 1)$ and $(b, 1)$, the right side the straight distance.

The lessons are Hölder, Chebyshev and Minkowski (E2.2), and majorization: Karamata and Popoviciu (E2.3). The Summary (E2.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that $\sqrt{a^2 + 1} + \sqrt{b^2 + 1} \ge \sqrt{(a + b)^2 + 4}$ for real $a$, $b$.`,
          solution: String.raw`The vectors $u = (a, 1)$ and $v = (b, 1)$ have lengths $\sqrt{a^2 + 1}$ and $\sqrt{b^2 + 1}$, and $u + v = (a + b, 2)$ has length $\sqrt{(a + b)^2 + 4}$. By the triangle inequality $|u| + |v| \ge |u + v|$.` },
        { q: String.raw`Prove that $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3}$ for real $a$, $b$, $c$.`,
          solution: String.raw`By Cauchy-Schwarz, $(a^2 + b^2 + c^2)(1 + 1 + 1) \ge (a + b + c)^2$.` }
      ],
      problems: []
    },
    "E2.2": {
      prereq: ["cauchy-schwarz", "rearrangement"],
      cards: ["holders-inequality", "chebyshev-sum-inequality", "minkowski-inequality"],
      body: String.raw`How is $a^3 + b^3 + c^3 \ge \tfrac{(a + b + c)^3}{9}$ proved in one line? When is $\tfrac{a^3 + b^3 + c^3}{3}$ at least the product of the averages of $a$ and of $a^2$? What is the smallest value of $\sqrt{a^2 + 1} + \sqrt{b^2 + 1} + \sqrt{c^2 + 1}$ when $a + b + c = 4$? Three inequalities, each a generalization of one already known.

[[holders-inequality|Hölder's inequality]] is Cauchy-Schwarz with more factors. For positive numbers in three sequences, $\left(\sum a_i\right)\left(\sum b_i\right)\left(\sum c_i\right) \ge \left(\sum \sqrt[3]{a_ib_ic_i}\right)^3$, and in two sequences with exponents $p$ and $q$, $\tfrac1p + \tfrac1q = 1$, it reads $\left(\sum a_i^p\right)^{1/p}\left(\sum b_i^q\right)^{1/q} \ge \sum a_ib_i$. With $(a^3, b^3, c^3)$ and two sequences of ones, the three-factor form gives $9(a^3 + b^3 + c^3) \ge (a + b + c)^3$. Hölder suits sums of fractions whose numerators and denominators have degrees that can be balanced by the right number of factors.

[[chebyshev-sum-inequality|Chebyshev's sum inequality]] says that two sequences sorted the same way have an average product at least the product of their averages: if $a_1 \le \cdots \le a_n$ and $b_1 \le \cdots \le b_n$, then $n\sum a_ib_i \ge \left(\sum a_i\right)\left(\sum b_i\right)$, and the inequality reverses for opposite orders. It follows by adding the rearrangement inequality over all cyclic shifts. With $a_i$ and $b_i = a_i^2$, sorted together, it gives $3(a^3 + b^3 + c^3) \ge (a + b + c)(a^2 + b^2 + c^2)$.

[[minkowski-inequality|Minkowski's inequality]] is the triangle inequality for sums of lengths: $\sum \sqrt{a_i^2 + b_i^2} \ge \sqrt{\left(\sum a_i\right)^2 + \left(\sum b_i\right)^2}$. It turns a sum of square roots into one square root. With $b_i = 1$ and $a + b + c = 4$, $\sqrt{a^2 + 1} + \sqrt{b^2 + 1} + \sqrt{c^2 + 1} \ge \sqrt{16 + 9} = 5$, with equality when the vectors $(a, 1)$, $(b, 1)$, $(c, 1)$ point the same way, at $a = b = c = \tfrac43$.

Balance degrees with Hölder, sort two sequences together for Chebyshev, and read square roots of sums of squares as lengths for Minkowski. The next lesson compares whole lists of numbers.`,
      related: [
        { card: "cauchy-schwarz", note: String.raw`the two-factor case of Hölder.` },
        { card: "rearrangement", note: String.raw`the inequality summed to prove Chebyshev.` },
        { card: "triangle-inequality", note: String.raw`Minkowski as the triangle inequality for vectors.` }
      ],
      exercises: [
        { q: String.raw`Prove that $a^3 + b^3 + c^3 \ge \tfrac{(a + b + c)^3}{9}$ for positive $a$, $b$, $c$.`,
          solution: String.raw`By Hölder with the three sequences $(a^3, b^3, c^3)$, $(1, 1, 1)$, $(1, 1, 1)$: $(a^3 + b^3 + c^3)(1 + 1 + 1)(1 + 1 + 1) \ge \left(\sqrt[3]{a^3} + \sqrt[3]{b^3} + \sqrt[3]{c^3}\right)^3 = (a + b + c)^3$.` },
        { q: String.raw`Prove that $3(a^3 + b^3 + c^3) \ge (a + b + c)(a^2 + b^2 + c^2)$ for nonnegative $a$, $b$, $c$.`,
          solution: String.raw`The sequences $(a, b, c)$ and $(a^2, b^2, c^2)$ are sorted the same way, since $t \mapsto t^2$ is increasing for $t \ge 0$. By Chebyshev, $3(a \cdot a^2 + b \cdot b^2 + c \cdot c^2) \ge (a + b + c)(a^2 + b^2 + c^2)$.` },
        { q: String.raw`Real numbers $a$, $b$, $c$ satisfy $a + b + c = 4$. Prove that $\sqrt{a^2 + 1} + \sqrt{b^2 + 1} + \sqrt{c^2 + 1} \ge 5$.`,
          solution: String.raw`By Minkowski, the sum of the lengths of $(a, 1)$, $(b, 1)$, $(c, 1)$ is at least the length of their sum $(a + b + c, 3) = (4, 3)$, which is $5$. Equality holds at $a = b = c = \tfrac43$.` }
      ],
      problems: []
    },
    "E2.3": {
      prereq: ["jensens-inequality"],
      cards: ["karamata-inequality", "popoviciu-inequality"],
      body: String.raw`For a convex function $f$, is $f(4) + f(0) \ge f(3) + f(1)$? Is $|x| + |y| + |z| + |x + y + z| \ge |x + y| + |y + z| + |z + x|$? Jensen's inequality compares a list of numbers with its average; majorization compares two lists.

[[karamata-inequality|Karamata's inequality]] says that if a list $x_1 \ge \cdots \ge x_n$ majorizes $y_1 \ge \cdots \ge y_n$, meaning that $x_1 + \cdots + x_k \ge y_1 + \cdots + y_k$ for every $k$ with equality for $k = n$, then $\sum f(x_i) \ge \sum f(y_i)$ for every convex $f$. A majorizing list is more spread out, and a convex function rewards spread. Jensen is the case where the $y_i$ are all equal to the average. So $(4, 0) \succ (3, 1) \succ (2, 2)$, and $f(4) + f(0) \ge f(3) + f(1) \ge 2f(2)$: with $f(t) = 2^t$, $17 \ge 10 \ge 8$. Checking majorization is a matter of partial sums of the sorted lists; finding the right convex function, such as $\ln$ for a product or $t^p$ for a power sum, is the idea.

[[popoviciu-inequality|Popoviciu's inequality]] compares a convex function at three points, at their average, and at the midpoints of the pairs: $f(x) + f(y) + f(z) + 3f\left(\tfrac{x + y + z}{3}\right) \ge 2\left[f\left(\tfrac{x + y}{2}\right) + f\left(\tfrac{y + z}{2}\right) + f\left(\tfrac{z + x}{2}\right)\right]$. With $f(t) = t^2$ it becomes $a^2 + b^2 + c^2 \ge ab + bc + ca$ after expanding; with $f(t) = |t|$ and the points $2x$, $2y$, $2z$ scaled, it gives Hlawka's inequality $|x| + |y| + |z| + |x + y + z| \ge |x + y| + |y + z| + |z + x|$.

Sort both lists and check partial sums for Karamata, choose the convex function that turns the problem into a sum of values, and use Popoviciu for averages of pairs. The Summary follows.`,
      related: [
        { card: "jensens-inequality", note: String.raw`the comparison with the average, Karamata's special case.` },
        { card: "muirheads-inequality", note: String.raw`majorization of exponents for symmetric sums (E1.3).` },
        { card: "smoothing-method", note: String.raw`moving a list toward its average step by step (E3.2).` }
      ],
      exercises: [
        { q: String.raw`Let $f$ be convex. Prove that $f(4) + f(0) \ge f(3) + f(1)$.`,
          solution: String.raw`The list $(4, 0)$ majorizes $(3, 1)$: $4 \ge 3$ and $4 + 0 = 3 + 1$. By Karamata, $f(4) + f(0) \ge f(3) + f(1)$. Directly: $3 = \tfrac34 \cdot 4 + \tfrac14 \cdot 0$ and $1 = \tfrac14 \cdot 4 + \tfrac34 \cdot 0$, so by convexity $f(3) + f(1) \le \left(\tfrac34 + \tfrac14\right)f(4) + \left(\tfrac14 + \tfrac34\right)f(0)$.` },
        { q: String.raw`Use Popoviciu's inequality with $f(t) = t^2$ to prove $x^2 + y^2 + z^2 \ge xy + yz + zx$.`,
          solution: String.raw`With $s = x + y + z$, Popoviciu gives $\sum x^2 + \tfrac{s^2}{3} \ge \tfrac12\sum (x + y)^2 = \sum x^2 + \sum xy$. So $\tfrac{s^2}{3} \ge \sum xy$, that is, $\sum x^2 + 2\sum xy \ge 3\sum xy$, which is the claim.` },
        { q: String.raw`Prove that $|x| + |y| + |z| + |x + y + z| \ge |x + y| + |y + z| + |z + x|$ for real $x$, $y$, $z$.`,
          solution: String.raw`Apply Popoviciu to the convex function $f(t) = |t|$ at the points $2x$, $2y$, $2z$: the average is $\tfrac{2(x + y + z)}{3}$ and the pair midpoints are $x + y$, $y + z$, $z + x$. So $2|x| + 2|y| + 2|z| + 3 \cdot \tfrac23|x + y + z| \ge 2(|x + y| + |y + z| + |z + x|)$, and dividing by $2$ gives the claim.` }
      ],
      problems: []
    },
    "E2.4": {
      prereq: ["holders-inequality", "chebyshev-sum-inequality", "minkowski-inequality", "karamata-inequality", "popoviciu-inequality"],
      cards: [],
      body: String.raw`[[holders-inequality|Hölder]] extends Cauchy-Schwarz to more factors, [[chebyshev-sum-inequality|Chebyshev]] compares sequences sorted together, and [[minkowski-inequality|Minkowski]] adds lengths.

[[karamata-inequality|Karamata]] extends Jensen to majorized lists, and [[popoviciu-inequality|Popoviciu]] compares a convex function at points, their average and their pair midpoints.`,
      strategies: [
        String.raw`Choose the number of Hölder factors that balances the degrees.`,
        String.raw`Sort two sequences the same way, then use Chebyshev or rearrangement.`,
        String.raw`Read $\sqrt{a^2 + b^2}$ as a length and add the vectors.`,
        String.raw`For Karamata, sort both lists and compare partial sums.`,
        String.raw`Pick the convex function that turns the problem into a sum of its values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that $(x + y + z)\left(\tfrac1x + \tfrac1y + \tfrac1z\right) \ge 9$ for positive $x$, $y$, $z$.`,
        solution: String.raw`By Cauchy-Schwarz with the vectors $(\sqrt x, \sqrt y, \sqrt z)$ and $\left(\tfrac{1}{\sqrt x}, \tfrac{1}{\sqrt y}, \tfrac{1}{\sqrt z}\right)$, the product is at least $(1 + 1 + 1)^2 = 9$.` },
      { q: String.raw`Let $f$ be convex. Prove that $f(5) + f(1) \ge f(4) + f(2) \ge 2f(3)$.`,
        solution: String.raw`The lists $(5, 1) \succ (4, 2) \succ (3, 3)$ all add to $6$, and their largest entries decrease. By Karamata, the values of $f$ decrease along the chain.` },
      { q: String.raw`Prove that for positive $a$, $b$, $c$, $(a^3 + b^3 + c^3)(a + b + c) \ge (a^2 + b^2 + c^2)^2$.`,
        solution: String.raw`By Cauchy-Schwarz with $(a^{3/2}, b^{3/2}, c^{3/2})$ and $(a^{1/2}, b^{1/2}, c^{1/2})$: $(a^3 + b^3 + c^3)(a + b + c) \ge (a^2 + b^2 + c^2)^2$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that for positive $a$, $b$, $c$, $\tfrac{a}{\sqrt{b + c}} + \tfrac{b}{\sqrt{c + a}} + \tfrac{c}{\sqrt{a + b}} \ge \sqrt{\tfrac{3(a + b + c)}{2}}$.`,
        solution: String.raw`Let $S$ be the left side. By Hölder with the sequences $\left(\tfrac{a}{\sqrt{b + c}}\right)$ twice and $(a(b + c))$: $S \cdot S \cdot \sum a(b + c) \ge (a + b + c)^3$. Since $\sum a(b + c) = 2(ab + bc + ca) \le \tfrac23(a + b + c)^2$, $S^2 \ge \tfrac{(a + b + c)^3}{\tfrac23(a + b + c)^2} = \tfrac{3(a + b + c)}{2}$.` },
      { q: String.raw`Prove that for positive $a$, $b$, $c$ with $a + b + c = 3$, $\sqrt{a^2 + 4} + \sqrt{b^2 + 4} + \sqrt{c^2 + 4} \ge 3\sqrt5$.`,
        solution: String.raw`By Minkowski, the sum is at least the length of $(a + b + c, 2 + 2 + 2) = (3, 6)$, which is $\sqrt{45} = 3\sqrt5$. Equality at $a = b = c = 1$.` },
      { q: String.raw`Prove that for positive $x$, $y$, $z$ with $xyz = 1$, $x^2 + y^2 + z^2 \ge x + y + z$, using Chebyshev.`,
        solution: String.raw`The sequences $(x, y, z)$ and $(x, y, z)$ are sorted the same way, so by Chebyshev $3(x^2 + y^2 + z^2) \ge (x + y + z)^2$. By AM-GM $x + y + z \ge 3\sqrt[3]{xyz} = 3$. So $x^2 + y^2 + z^2 \ge \tfrac{(x + y + z)^2}{3} \ge x + y + z$.` }
    ],
    problems: []
  }
};
