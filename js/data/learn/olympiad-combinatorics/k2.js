// Learn, Olympiad Combinatorics, chapter K2: extremal set theory and Ramsey-type results (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["K2"] = {
  lessons: {
    "K2.1": {
      prereq: ["pigeonhole", "permutations-combinations", "double-counting"],
      cards: [],
      body: String.raw`Extremal combinatorics asks how large a family can be when it must avoid a pattern: no set containing another, no two sets disjoint, no long increasing run. Ramsey-type results say the opposite, that a large enough structure cannot avoid a pattern at all. Both are about exact thresholds, and both are proved by counting chains, pairing, or labeling.

Among the subsets of $\{1, 2, 3, 4\}$, the six $2$-element subsets form a family in which no set contains another, and no such family is larger. Any $10$ different numbers in a row include $4$ that increase or $4$ that decrease, since $10 = 3 \cdot 3 + 1$. And the $2$-element subsets of $\{1, \ldots, 5\}$ that pairwise intersect can number at most $4$, all the pairs containing one fixed element.

The lessons are chains and antichains (K2.2), and monotone subsequences and Schur's theorem (K2.3). The Summary (K2.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Find a family of $6$ subsets of $\{1, 2, 3, 4\}$ in which no set contains another.`,
          solution: String.raw`The six $2$-element subsets: two different sets of the same size never contain each other.` },
        { q: String.raw`Find a sequence of $9$ different numbers with no $4$ increasing and no $4$ decreasing terms.`,
          solution: String.raw`$3, 2, 1, 6, 5, 4, 9, 8, 7$. A decreasing subsequence stays inside one block of three, so has at most $3$ terms; an increasing one takes at most one term from each block, so at most $3$.` }
      ],
      problems: []
    },
    "K2.2": {
      prereq: ["double-counting", "permutations-combinations", "pigeonhole"],
      cards: ["dilworths-theorem", "sperners-theorem", "kruskal-katona", "erdos-ko-rado"],
      body: String.raw`How many subsets of $\{1, \ldots, n\}$ can be chosen so that none contains another? How large can a family of $3$-element subsets of $\{1, \ldots, 6\}$ be if every two of them meet? How few chains of divisors cover all the divisors of $72$? Families of sets are bounded by chains.

[[sperners-theorem|Sperner's theorem]] says that an antichain of subsets of an $n$-element set, a family in which no set contains another, has at most $\binom{n}{\lfloor n/2\rfloor}$ members, the middle layer. The LYM proof counts maximal chains $\emptyset \subset \{x_1\} \subset \{x_1, x_2\} \subset \cdots$, of which there are $n!$. A set of size $k$ lies on $k!(n - k)!$ of them, and an antichain meets each chain at most once, so $\sum_{A}k_A!(n - k_A)! \le n!$, that is, $\sum_A\binom{n}{k_A}^{-1} \le 1$. Since every $\binom{n}{k} \le \binom{n}{\lfloor n/2\rfloor}$, the family has at most $\binom{n}{\lfloor n/2\rfloor}$ members.

[[dilworths-theorem|Dilworth's theorem]] says that in a finite partially ordered set, the largest antichain has the same size as the fewest chains needed to cover it. Its dual, Mirsky's theorem, says that the longest chain has the same length as the fewest antichains covering it, by sorting elements by the length of the longest chain ending at them. For the divisors of $72 = 2^3 \cdot 3^2$ under divisibility, the largest antichain has $3$ elements, such as $8, 12, 18$, and indeed $3$ chains cover all twelve divisors.

[[erdos-ko-rado|The Erdős-Ko-Rado theorem]] says that a family of $k$-subsets of an $n$-set, $n \ge 2k$, in which every two sets meet has at most $\binom{n-1}{k-1}$ members, the star of all sets through one element; for $n = 6$, $k = 3$, that is $10$. [[kruskal-katona|The Kruskal-Katona theorem]] answers the opposite question, how small the shadow (the $(k - 1)$-subsets of the sets) of a family of $k$-sets can be: if the family has $\binom{a}{k}$ members, its shadow has at least $\binom{a}{k-1}$, so $4 = \binom43$ triples have at least $\binom42 = 6$ pairs beneath them, reached by the triples of a $4$-element set.

Count maximal chains for antichains, cover by chains or by levels, use the star for intersecting families, and the first sets in order for small shadows. The next lesson forces patterns.`,
      related: [
        { card: "pigeonhole-argument", note: String.raw`the chains as boxes in an extremal bound (P4.2).` },
        { card: "odd-part-chains", note: String.raw`chains for divisibility among $1, \ldots, n$ (R7.2).` },
        { card: "double-counting", note: String.raw`the count of (set, chain) pairs behind LYM.` }
      ],
      exercises: [
        { q: String.raw`Prove the LYM inequality: if $\mathcal F$ is an antichain of subsets of $\{1, \ldots, n\}$, then $\sum_{A \in \mathcal F}\binom{n}{|A|}^{-1} \le 1$, and deduce Sperner's theorem.`,
          solution: String.raw`A maximal chain adds the elements one at a time in some order, so there are $n!$ of them. A set $A$ of size $k$ lies on $k!(n - k)!$ chains (its elements first in some order, then the rest). No chain contains two sets of an antichain. So $\sum_{A}|A|!(n - |A|)! \le n!$; dividing by $n!$ gives LYM. Each term is at least $\binom{n}{\lfloor n/2\rfloor}^{-1}$, so $|\mathcal F| \le \binom{n}{\lfloor n/2\rfloor}$.` },
        { q: String.raw`What is the largest number of divisors of $72$ that can be chosen so that none divides another?`, answer: "3",
          solution: String.raw`A divisor is $2^a3^b$ with $0 \le a \le 3$, $0 \le b \le 2$. Cover them by $3$ chains: $1, 2, 4, 8, 24, 72$; $3, 6, 12, 36$; $9, 18$. An antichain meets each chain at most once, so it has at most $3$ elements, and $8, 12, 18$ (that is $2^3$, $2^2 3$, $2 \cdot 3^2$) is one.` },
        { q: String.raw`What is the largest family of $3$-element subsets of $\{1, \ldots, 6\}$ in which every two sets share an element?`, answer: "10",
          solution: String.raw`By Erdős-Ko-Rado with $n = 6 \ge 2k = 6$, at most $\binom52 = 10$, and the $10$ triples containing $1$ reach it. (Here a complementary pair of triples is disjoint, and the $20$ triples form $10$ such pairs, so at most one of each pair can be chosen, another proof.)` }
      ],
      problems: []
    },
    "K2.3": {
      prereq: ["pigeonhole", "proof-by-cases"],
      cards: ["erdos-szekeres", "schurs-theorem"],
      body: String.raw`Why must $10$ different numbers include $4$ in increasing or decreasing order? Why does every coloring of $1, \ldots, 5$ in two colors contain $x + y = z$ with all three the same color? These are Ramsey-type results: a large enough structure contains a pattern.

[[erdos-szekeres|The Erdős-Szekeres theorem]] says that a sequence of $mn + 1$ different numbers has an increasing subsequence of length $m + 1$ or a decreasing one of length $n + 1$. Label each term with the pair $(i, d)$, the lengths of the longest increasing and decreasing subsequences ending at it. Two terms get different labels, since if the later one is larger its $i$ is bigger, and if smaller its $d$ is bigger. If all $i \le m$ and all $d \le n$, there are at most $mn$ labels for $mn + 1$ terms, a contradiction. The bound is sharp: take $m$ blocks of $n$ terms, each block decreasing and every block above the last, such as $3, 2, 1, 6, 5, 4, 9, 8, 7$ for $m = n = 3$.

[[schurs-theorem|Schur's theorem]] says that for every $k$, if $1, \ldots, N$ are colored with $k$ colors and $N$ is large enough, some $x$, $y$, $z$ of one color satisfy $x + y = z$ ($x = y$ allowed). For two colors, $N = 5$ suffices and $N = 4$ does not: the coloring $\{1, 4\}$, $\{2, 3\}$ avoids it. With $5$: say $1$ is red; then $2 = 1 + 1$ is blue, $4 = 2 + 2$ is red, $3 = 4 - 1$ must be blue (else $1 + 3 = 4$ in red), and then $5$ is blue because of $1 + 4$ in red, but $2 + 3 = 5$ in blue. The general proof reduces to Ramsey's theorem for a complete graph whose edge $ij$ is colored by the color of $|i - j|$.

Label each term by the patterns ending at it and count labels, and follow forced colors step by step for small Schur-type claims. The Summary follows.`,
      related: [
        { card: "pigeonhole-argument", note: String.raw`the label count at the heart of Erdős-Szekeres (P4.2).` },
        { card: "convex-position", note: String.raw`the other Erdős-Szekeres theorem, on points in convex position (K5.2).` },
        { card: "coloring-arguments", note: String.raw`colorings that must contain a pattern.` }
      ],
      exercises: [
        { q: String.raw`Prove that any sequence of $mn + 1$ different real numbers has an increasing subsequence of length $m + 1$ or a decreasing subsequence of length $n + 1$.`,
          solution: String.raw`Give the $k$th term the label $(i_k, d_k)$: the lengths of the longest increasing and longest decreasing subsequences ending at it. For $j \lt k$, if $a_j \lt a_k$ then $i_k \ge i_j + 1$, and if $a_j \gt a_k$ then $d_k \ge d_j + 1$; so the labels are all different. If every $i_k \le m$ and $d_k \le n$, there are at most $mn$ possible labels for $mn + 1$ terms, impossible. So some $i_k \ge m + 1$ or $d_k \ge n + 1$.` },
        { q: String.raw`Prove that however $1, 2, 3, 4, 5$ are colored red and blue, some $x$, $y$, $z$ of one color (not necessarily different) satisfy $x + y = z$.`,
          solution: String.raw`Suppose not, and say $1$ is red. Then $2 = 1 + 1$ is blue, so $4 = 2 + 2$ is red. Then $3$ is blue, since $1 + 3 = 4$, and $5$ is blue, since $1 + 4 = 5$. But $2 + 3 = 5$ are all blue, a contradiction.` },
        { q: String.raw`Show that $1, 2, 3, 4$ can be colored in two colors with no monochromatic solution of $x + y = z$.`,
          solution: String.raw`Color $1$ and $4$ red, $2$ and $3$ blue. Red sums: $1 + 1 = 2$ (blue), $1 + 4 = 5$, $4 + 4 = 8$ (out of range). Blue sums: $2 + 2 = 4$ (red), $2 + 3 = 5$, $3 + 3 = 6$ (out of range). No solution lies in one color.` }
      ],
      problems: []
    },
    "K2.4": {
      prereq: ["dilworths-theorem", "sperners-theorem", "kruskal-katona", "erdos-ko-rado", "erdos-szekeres", "schurs-theorem"],
      cards: [],
      body: String.raw`[[sperners-theorem|Sperner's theorem]] bounds antichains by the middle layer, through maximal chains; [[dilworths-theorem|Dilworth's theorem]] matches the largest antichain with the fewest covering chains; [[erdos-ko-rado|Erdős-Ko-Rado]] bounds intersecting families by a star; [[kruskal-katona|Kruskal-Katona]] bounds shadows from below.

[[erdos-szekeres|Erdős-Szekeres]] forces a long monotone subsequence, and [[schurs-theorem|Schur's theorem]] forces a monochromatic $x + y = z$.`,
      strategies: [
        String.raw`For a family with no set inside another, count the maximal chains each set lies on.`,
        String.raw`Cover a partial order by chains to bound an antichain, and by levels to bound a chain.`,
        String.raw`For intersecting families, compare with the star through one point.`,
        String.raw`Label each term by the longest patterns ending at it, then count labels.`,
        String.raw`For small coloring claims, follow the forced colors until a contradiction.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the largest family of subsets of $\{1, \ldots, 5\}$ in which no set contains another?`, answer: "10",
        solution: String.raw`By Sperner, $\binom52 = 10$, reached by the $2$-element (or the $3$-element) subsets.` },
      { q: String.raw`How long a monotone subsequence must a sequence of $17$ different numbers contain?`, answer: "5",
        solution: String.raw`$17 = 4 \cdot 4 + 1$, so by Erdős-Szekeres there is an increasing or a decreasing subsequence of length $5$. The sequence of four decreasing blocks of four, each above the last, shows $6$ is not forced.` },
      { q: String.raw`What is the largest family of $2$-element subsets of $\{1, \ldots, 5\}$ in which every two pairs meet?`, answer: "4",
        solution: String.raw`By Erdős-Ko-Rado with $n = 5 \ge 4$, at most $\binom41 = 4$: the four pairs through one element.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that the elements of a finite partially ordered set whose longest chain has $m$ elements can be split into $m$ antichains.`,
        solution: String.raw`Give each element $x$ its height $h(x)$, the number of elements in the longest chain ending at $x$; then $1 \le h(x) \le m$. If $x \lt y$, a longest chain ending at $x$ extends by $y$, so $h(y) \gt h(x)$. Hence elements of equal height are incomparable, and the $m$ sets $\{x : h(x) = j\}$ are antichains covering everything.` },
      { q: String.raw`For $n \ge 4$, prove that a family of $2$-element subsets of $\{1, \ldots, n\}$ in which every two pairs meet has at most $n - 1$ members.`,
        solution: String.raw`If all pairs share one element, there are at most $n - 1$ of them. Otherwise take two pairs $\{a, b\}$, $\{a, c\}$ and a third not containing $a$; it meets both, so it is $\{b, c\}$. Any further pair must meet $\{a, b\}$, $\{a, c\}$ and $\{b, c\}$, so it lies inside $\{a, b, c\}$: the family is at most the $3$ pairs of a triangle, and $3 \le n - 1$.` },
      { q: String.raw`Prove that among any $10$ different numbers in a row, there are $4$ that increase or $4$ that decrease, and show that $9$ numbers do not suffice.`,
        solution: String.raw`$10 = 3 \cdot 3 + 1$, so Erdős-Szekeres with $m = n = 3$ gives a monotone subsequence of length $4$. The sequence $3, 2, 1, 6, 5, 4, 9, 8, 7$ has $9$ terms and no monotone subsequence of length $4$ (K2.1).` }
    ],
    problems: []
  }
};
