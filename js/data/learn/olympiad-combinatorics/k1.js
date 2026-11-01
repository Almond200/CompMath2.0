// Learn, Olympiad Combinatorics, chapter K1: advanced enumeration (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["K1"] = {
  lessons: {
    "K1.1": {
      prereq: ["generating-function-method", "derangements", "burnsides-lemma"],
      cards: [],
      body: String.raw`The counting of the AIME books reaches its limits with labeled structures, partitions of integers, counting up to symmetry with colors in fixed numbers, and arrangements of numbers in a shape. This chapter gives the olympiad tools: exponential generating functions, Euler's pentagonal theorem, Stirling numbers, Pólya's theorem and the hook length formula.

The derangements of $4$ objects number $9$, and their exponential generating function is $\tfrac{e^{-x}}{1 - x}$. The partitions of $7$, ways to write it as a sum of positive integers in any order, number $15$. And the permutations of $4$ objects with exactly $2$ cycles number $11$: three of type $2 + 2$ and eight of type $3 + 1$.

The lessons are generating functions for labeled objects and partitions (K1.2), and symmetry and tableaux (K1.3). The Summary (K1.4) collects the strategies.`,
      exercises: [
        { q: String.raw`How many permutations of $\{1, 2, 3, 4\}$ have exactly two cycles?`, answer: "11",
          solution: String.raw`Cycle type $3 + 1$: choose the fixed point ($4$ ways) and a $3$-cycle on the rest ($2$ ways), $8$. Type $2 + 2$: split into two pairs, $3$ ways. In all $11$.` },
        { q: String.raw`List the partitions of $7$ and count them.`, answer: "15",
          solution: String.raw`By largest part: $7$; $6 + 1$; $5 + 2$, $5 + 1 + 1$; $4 + 3$, $4 + 2 + 1$, $4 + 1 + 1 + 1$; $3 + 3 + 1$, $3 + 2 + 2$, $3 + 2 + 1 + 1$, $3 + 1 + 1 + 1 + 1$; $2 + 2 + 2 + 1$, $2 + 2 + 1 + 1 + 1$, $2 + 1 + 1 + 1 + 1 + 1$; $1 + \cdots + 1$. Fifteen.` }
      ],
      problems: []
    },
    "K1.2": {
      prereq: ["generating-function-method", "partitions", "binomial-theorem"],
      cards: ["exponential-generating-functions", "pentagonal-number-theorem", "stirling-first-kind"],
      body: String.raw`How many strings of length $5$ over $\{A, B, C\}$ have an even number of $A$'s? How is $p(10)$, the number of partitions of $10$, computed from smaller values without listing? How many permutations of $n$ objects have $k$ cycles? Each is a coefficient of a well-chosen series or product.

[[exponential-generating-functions|An exponential generating function]] $\sum a_n\tfrac{x^n}{n!}$ suits labeled objects, where the parts are distinguishable. The product of two such functions counts the ways to split a labeled set into two parts and put a structure of each kind on its part, because the binomial coefficient $\binom nk$ choosing the labels appears automatically. For the strings, the $A$'s form an even-sized set of positions, with function $\tfrac{e^x + e^{-x}}{2}$, and each of the other positions gets $B$ or $C$, with function $e^{2x}$. The product is $\tfrac{e^{3x} + e^x}{2}$, so the count is $\tfrac{3^n + 1}{2}$, which is $122$ for $n = 5$. Derangements, with no fixed points, satisfy $e^x \cdot D(x) = \tfrac{1}{1 - x}$, so $D(x) = \tfrac{e^{-x}}{1 - x}$.

[[pentagonal-number-theorem|Euler's pentagonal number theorem]] says $\prod_{n \ge 1}(1 - x^n) = 1 - x - x^2 + x^5 + x^7 - x^{12} - x^{15} + \cdots$, with exponents the pentagonal numbers $\tfrac{k(3k - 1)}{2}$ for $k = \pm1, \pm2, \ldots$. Since $\sum p(n)x^n = \prod\tfrac{1}{1 - x^n}$, multiplying gives the recurrence $p(n) = p(n - 1) + p(n - 2) - p(n - 5) - p(n - 7) + p(n - 12) + \cdots$. With $p(0), \ldots, p(9) = 1, 1, 2, 3, 5, 7, 11, 15, 22, 30$, it gives $p(10) = 30 + 22 - 7 - 3 = 42$. Generating functions also prove partition identities: partitions into distinct parts, $\prod(1 + x^n)$, equal partitions into odd parts, $\prod\tfrac{1}{1 - x^{2n-1}}$, since $1 + x^n = \tfrac{1 - x^{2n}}{1 - x^n}$.

[[stirling-first-kind|The Stirling numbers of the first kind]] $\left[{n \atop k}\right]$ count permutations of $n$ objects with $k$ cycles, and $x(x + 1)\cdots(x + n - 1) = \sum_k\left[{n \atop k}\right]x^k$: build a permutation by inserting $1, 2, \ldots, n$ in turn; the $m$th object starts a new cycle (the factor $x$) or goes after one of the $m - 1$ objects already placed. So $\left[{n \atop 1}\right] = (n - 1)!$, $\sum_k\left[{n \atop k}\right] = n!$, and $\left[{4 \atop 2}\right] = 11$.

Use exponential generating functions for labeled structures, the pentagonal recurrence for partition numbers, and the rising factorial for permutations by cycles. The next lesson counts up to symmetry and fills shapes.`,
      related: [
        { card: "derangements", note: String.raw`permutations with no fixed point, whose EGF is $\tfrac{e^{-x}}{1-x}$ (R3.4).` },
        { card: "stirling-bell", note: String.raw`set partitions, the other Stirling numbers.` },
        { card: "partitions", note: String.raw`partitions of an integer, listed in order (R4.2).` }
      ],
      exercises: [
        { q: String.raw`How many strings of length $5$ over $\{A, B, C\}$ contain an even number of $A$'s?`, answer: "122",
          solution: String.raw`The exponential generating function is $\tfrac{e^x + e^{-x}}{2} \cdot e^{2x} = \tfrac{e^{3x} + e^{x}}{2}$, whose coefficient of $\tfrac{x^n}{n!}$ is $\tfrac{3^n + 1}{2}$. For $n = 5$: $\tfrac{243 + 1}{2} = 122$. (Directly: $\binom50 2^5 + \binom52 2^3 + \binom54 2 = 32 + 80 + 10 = 122$.)` },
        { q: String.raw`Given $p(0), \ldots, p(9) = 1, 1, 2, 3, 5, 7, 11, 15, 22, 30$, use the pentagonal number theorem to compute $p(10)$.`, answer: "42",
          solution: String.raw`$p(n) = p(n - 1) + p(n - 2) - p(n - 5) - p(n - 7) + \cdots$, with the next term $p(n - 12)$ not present. So $p(10) = p(9) + p(8) - p(5) - p(3) = 30 + 22 - 7 - 3 = 42$.` },
        { q: String.raw`Prove that the number of partitions of $n$ into distinct parts equals the number of partitions of $n$ into odd parts.`,
          solution: String.raw`The generating functions are $\prod_{n \ge 1}(1 + x^n)$ and $\prod_{n \ge 1}\tfrac{1}{1 - x^{2n-1}}$. Since $1 + x^n = \tfrac{1 - x^{2n}}{1 - x^n}$, the first is $\prod\tfrac{1 - x^{2n}}{1 - x^n}$; the factors $1 - x^{2n}$ in the numerator cancel the even-index factors of the denominator, leaving $\prod\tfrac{1}{1 - x^{2n-1}}$. Equal series have equal coefficients. (For $n = 10$ both counts are $10$.)` },
        { q: String.raw`How many permutations of $5$ objects consist of a single cycle?`, answer: "24",
          solution: String.raw`$\left[{5 \atop 1}\right] = 4! = 24$: arrange the objects in a circle starting from object $1$, which leaves an ordering of the other four.` }
      ],
      problems: []
    },
    "K1.3": {
      prereq: ["burnsides-lemma", "permutations-combinations"],
      cards: ["polya-enumeration", "hook-length-formula"],
      body: String.raw`How many necklaces of $6$ beads in $3$ colors are there, up to rotation? How many necklaces of $4$ beads with exactly $2$ black and $2$ white? In how many ways can the numbers $1$ to $5$ fill a shape of rows $3$ and $2$ so that rows and columns increase? Symmetry and shape both shrink a count.

[[polya-enumeration|Pólya's theorem]] refines Burnside's lemma (R8.2). The cycle index of a group of symmetries records, for each symmetry, the lengths of its cycles of positions, as a monomial $t_1^{c_1}t_2^{c_2}\cdots$, averaged over the group. Substituting $t_k = m$ for every $k$ counts the colorings with $m$ colors up to symmetry: for the $6$ rotations of a ring of $6$, the cycle index is $\tfrac16(t_1^6 + t_2^3 + 2t_3^2 + 2t_6)$, and $m = 3$ gives $\tfrac{729 + 27 + 18 + 6}{6} = 130$. Substituting $t_k = b^k + w^k$ instead counts by the number of each color: for $4$ beads, $\tfrac14(t_1^4 + t_2^2 + 2t_4)$ gives, as the coefficient of $b^2w^2$, $\tfrac{6 + 2 + 0}{4} = 2$, the adjacent and the opposite pair.

[[hook-length-formula|The hook length formula]] counts standard Young tableaux, fillings of a shape of rows by $1, \ldots, n$ increasing along rows and down columns: the count is $\tfrac{n!}{\prod h(c)}$, where the hook of a cell is the cell, those to its right and those below it. For rows $3, 2$ the hooks are $4, 3, 1$ and $2, 1$, so the count is $\tfrac{120}{24} = 5$. For two rows of $n$ the count is the Catalan number $\tfrac{1}{n + 1}\binom{2n}{n}$, matching ballot sequences: $5$ for $n = 3$.

Write the cycle index, substitute a number of colors or color weights, and divide $n!$ by the hooks for a filling of a shape. The Summary follows.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`the averaging that Pólya refines (R8.2).` },
        { card: "catalan-numbers", note: String.raw`the tableaux of two equal rows.` },
        { card: "ballot-problem", note: String.raw`the sequences that two-row tableaux encode.` }
      ],
      exercises: [
        { q: String.raw`How many different necklaces of $6$ beads, each of $3$ colors, are there if rotations count as the same?`, answer: "130",
          solution: String.raw`The rotations by $0$ to $5$ places have $6, 1, 2, 3, 2, 1$ cycles, fixing $3^6, 3, 9, 27, 9, 3$ colorings, which add to $780$. Dividing by $6$ gives $130$.` },
        { q: String.raw`How many necklaces of $4$ beads have exactly $2$ black and $2$ white beads, up to rotation?`, answer: "2",
          solution: String.raw`The cycle index is $\tfrac14(t_1^4 + t_2^2 + 2t_4)$. With $t_k = b^k + w^k$, the coefficient of $b^2w^2$ is $\tfrac14\left(\binom42 + 2 + 0\right) = 2$: the black beads adjacent, or opposite.` },
        { q: String.raw`How many standard Young tableaux have rows of lengths $3$ and $2$?`, answer: "5",
          solution: String.raw`The hooks in the first row are $4, 3, 1$ and in the second $2, 1$, with product $24$. So the count is $\tfrac{5!}{24} = 5$. Listing confirms it: the second row is $\{4, 5\}$, $\{3, 5\}$, $\{2, 5\}$, $\{3, 4\}$ or $\{2, 4\}$.` }
      ],
      problems: []
    },
    "K1.4": {
      prereq: ["exponential-generating-functions", "pentagonal-number-theorem", "stirling-first-kind", "polya-enumeration", "hook-length-formula"],
      cards: [],
      body: String.raw`[[exponential-generating-functions|Exponential generating functions]] multiply to combine labeled structures; [[pentagonal-number-theorem|the pentagonal number theorem]] gives the recurrence for partitions; [[stirling-first-kind|Stirling numbers of the first kind]] count permutations by cycles.

[[polya-enumeration|Pólya's theorem]] counts colorings up to symmetry through the cycle index, by number of colors or by color weights, and [[hook-length-formula|the hook length formula]] counts fillings of a shape.`,
      strategies: [
        String.raw`For labeled objects split into parts, multiply exponential generating functions.`,
        String.raw`Prove partition identities by comparing generating products.`,
        String.raw`Build permutations by inserting elements one at a time to read off cycle counts.`,
        String.raw`For colorings with fixed numbers of each color, substitute $t_k = b^k + w^k$ in the cycle index.`,
        String.raw`For increasing fillings of a shape, divide $n!$ by the product of the hooks.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many derangements of $5$ objects are there?`, answer: "44",
        solution: String.raw`$D_5 = 5!\left(1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} - \tfrac1{120}\right) = 60 - 20 + 5 - 1 = 44$, the coefficient of $\tfrac{x^5}{5!}$ in $\tfrac{e^{-x}}{1 - x}$.` },
      { q: String.raw`How many partitions does $8$ have?`, answer: "22",
        solution: String.raw`By the pentagonal recurrence, $p(8) = p(7) + p(6) - p(3) - p(1) = 15 + 11 - 3 - 1 = 22$.` },
      { q: String.raw`How many standard Young tableaux have rows of lengths $3$ and $1$?`, answer: "3",
        solution: String.raw`The hooks are $4, 2, 1$ and $1$, with product $8$, so $\tfrac{4!}{8} = 3$: the number below $1$ is $2$, $3$ or $4$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that $x(x + 1)(x + 2)\cdots(x + n - 1) = \sum_k \left[{n \atop k}\right]x^k$, where $\left[{n \atop k}\right]$ counts permutations of $n$ objects with $k$ cycles.`,
        solution: String.raw`Induct on $n$. A permutation of $\{1, \ldots, n\}$ comes from one of $\{1, \ldots, n - 1\}$ by inserting $n$: either as a new cycle $(n)$, which adds one cycle, or right after one of the $n - 1$ other elements in its cycle, which keeps the number of cycles. So $\left[{n \atop k}\right] = \left[{n-1 \atop k-1}\right] + (n - 1)\left[{n-1 \atop k}\right]$, which is exactly the rule for the coefficients when the product for $n - 1$ is multiplied by $x + (n - 1)$.` },
      { q: String.raw`How many standard Young tableaux have three rows of length $2$?`, answer: "5",
        solution: String.raw`The hooks, row by row, are $4, 3$; $3, 2$; $2, 1$, with product $144$, so the count is $\tfrac{720}{144} = 5$, again a Catalan number, as the transpose of two rows of $3$.` },
      { q: String.raw`Find the number of necklaces of $5$ beads with exactly $2$ black and $3$ white beads, up to rotation.`, answer: "2",
        solution: String.raw`The rotations of $5$ positions are the identity and four rotations that are single $5$-cycles, so the cycle index is $\tfrac15(t_1^5 + 4t_5)$. With $t_k = b^k + w^k$, the coefficient of $b^2w^3$ is $\tfrac15\binom52 = 2$: the black beads adjacent or one apart.` }
    ],
    problems: []
  }
};
