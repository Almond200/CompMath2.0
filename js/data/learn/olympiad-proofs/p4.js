// Learn, Olympiad Proofs, chapter P4: existence proofs (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["P4"] = {
  lessons: {
    "P4.1": {
      prereq: ["pigeonhole", "expected-value", "modular-basics"],
      cards: [],
      body: String.raw`"Prove that there exists" is answered in two ways. One builds the object and checks it. The other shows that it must exist without saying which it is: by counting more objects than places, by bounding how many objects a space can hold, or by showing that a random choice works with positive probability. This chapter takes both.

For every $n$ there are $n$ consecutive composite numbers: $(n + 1)! + 2, (n + 1)! + 3, \ldots, (n + 1)! + (n + 1)$, since $k$ divides $(n + 1)! + k$ for $2 \le k \le n + 1$. That is a construction. Every positive integer $n$ has a multiple written only with the digits $1$ and $0$: among $1, 11, 111, \ldots$ with $n + 1$ ones at most, two leave the same remainder on division by $n$, and their difference is a multiple of $n$ made of ones followed by zeros. That is pigeonhole, and it does not say which multiple.

The lessons are constructions and pigeonhole (P4.2), and dimension and probability arguments (P4.3). The Summary (P4.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that for every positive integer $n$ there are $n$ consecutive composite numbers.`,
          solution: String.raw`Take $(n + 1)! + k$ for $k = 2, 3, \ldots, n + 1$: these are $n$ consecutive integers. Each $k$ in that range divides $(n + 1)!$, so it divides $(n + 1)! + k$, which is larger than $k$. So each of the numbers is composite.` },
        { q: String.raw`Prove that every positive integer $n$ has a positive multiple whose decimal digits are all $0$ or $1$.`,
          solution: String.raw`Consider $r_j = 11\ldots1$ ($j$ ones) for $j = 1, \ldots, n + 1$. There are $n + 1$ numbers and $n$ remainders modulo $n$, so $r_i \equiv r_j$ for some $i \lt j$. Then $r_j - r_i = 11\ldots1\,00\ldots0$, with $j - i$ ones followed by $i$ zeros, is a positive multiple of $n$.` }
      ],
      problems: []
    },
    "P4.2": {
      prereq: ["pigeonhole", "modular-basics"],
      cards: ["proof-by-construction", "pigeonhole-argument"],
      body: String.raw`Among any $n$ integers, must some of them in a row add to a multiple of $n$? Among five points in a unit square, must two be close together? For every $n \ge 3$, can $1$ be written as a sum of $n$ different unit fractions? Some existence claims are proved by building, others by counting.

[[proof-by-construction|A construction]] proves existence by exhibiting the object and checking it. When the claim is for every $n$, the construction must be a family, usually found by solving small cases and seeing what they share, or by a step that turns a solution for $n$ into one for $n + 1$. For unit fractions, $1 = \tfrac12 + \tfrac13 + \tfrac16$, and the identity $\tfrac1m = \tfrac{1}{m + 1} + \tfrac{1}{m(m + 1)}$ applied to the largest denominator $m$ adds one term and keeps the denominators different, since both new ones exceed $m$. So $1$ is a sum of $n$ different unit fractions for every $n \ge 3$; for $n = 2$ it is not, since $\tfrac1a + \tfrac1b$ with $2 \le a \lt b$ is less than $\tfrac12 + \tfrac12$.

[[pigeonhole-argument|A pigeonhole argument]] puts more objects than boxes and concludes that two share a box. The principle is trivial; the boxes are the idea. For the integers $a_1, \ldots, a_n$, the boxes are the remainders of the partial sums $s_0 = 0, s_1 = a_1, s_2 = a_1 + a_2, \ldots, s_n$: there are $n + 1$ sums and $n$ remainders, so $s_i \equiv s_j$ for some $i \lt j$, and $a_{i+1} + \cdots + a_j = s_j - s_i$ is a multiple of $n$. For the points, cut the unit square into four squares of side $\tfrac12$; two of the five points lie in one small square, and so are at most its diagonal, $\tfrac{\sqrt2}{2}$, apart. Partial sums, remainders, small regions and pairs that add to a target are the common boxes.

Build a family from small cases or a step, and when only existence is asked, choose boxes so that two objects in one box give the conclusion. The next lesson counts with dimension and probability.`,
      related: [
        { card: "pigeonhole", note: String.raw`the principle with its averaging form, $\lceil \tfrac nk \rceil$.` },
        { card: "strong-induction", note: String.raw`the step that extends a construction from $n$ to $n + 1$ (P2.2).` },
        { card: "telescoping", note: String.raw`the identity $\tfrac1m - \tfrac{1}{m+1} = \tfrac{1}{m(m+1)}$ behind the unit-fraction step.` }
      ],
      exercises: [
        { q: String.raw`Prove that among any $n$ integers $a_1, \ldots, a_n$, there is a nonempty block $a_{i+1}, \ldots, a_j$ of consecutive ones whose sum is a multiple of $n$.`,
          solution: String.raw`Let $s_0 = 0$ and $s_k = a_1 + \cdots + a_k$. The $n + 1$ numbers $s_0, \ldots, s_n$ have only $n$ possible remainders modulo $n$, so two of them, $s_i$ and $s_j$ with $i \lt j$, have the same remainder. Then $s_j - s_i = a_{i+1} + \cdots + a_j$ is a multiple of $n$.` },
        { q: String.raw`Five points lie in a square of side $1$. Prove that two of them are at most $\tfrac{\sqrt2}{2}$ apart.`,
          solution: String.raw`Divide the square into four squares of side $\tfrac12$ (points on a dividing line may go in either). Five points in four squares put two in one small square, and two points of a square of side $\tfrac12$ are at most its diagonal, $\tfrac{\sqrt2}{2}$, apart.` },
        { q: String.raw`Prove that for every $n \ge 3$, the number $1$ is a sum of $n$ unit fractions with different denominators.`,
          solution: String.raw`For $n = 3$, $1 = \tfrac12 + \tfrac13 + \tfrac16$. Given such a sum with $n$ terms, let $m$ be the largest denominator, and replace $\tfrac1m$ by $\tfrac{1}{m + 1} + \tfrac{1}{m(m + 1)}$, which is equal since $\tfrac{1}{m + 1} + \tfrac{1}{m(m+1)} = \tfrac{m + 1}{m(m + 1)}$. Both new denominators exceed $m$, so all are still different, and the sum now has $n + 1$ terms. By induction, every $n \ge 3$ works.` },
        { q: String.raw`Prove that among any $51$ numbers chosen from $1, 2, \ldots, 100$, two are consecutive.`,
          solution: String.raw`The pairs $\{1, 2\}, \{3, 4\}, \ldots, \{99, 100\}$ are $50$ boxes. With $51$ numbers, two fall in one pair, and the two numbers of a pair are consecutive.` }
      ],
      problems: []
    },
    "P4.3": {
      prereq: ["expected-value", "indicator-variables", "pigeonhole"],
      cards: ["dimension-arguments", "probabilistic-method"],
      body: String.raw`A town of $n$ people forms clubs, each with an odd number of members, and any two clubs share an even number of members: how many clubs can there be? Every graph with $m$ edges can have its vertices split into two groups so that at least half the edges cross between them: why? Ten $5$-element subsets of a set are given: why can the elements be colored red and blue so that no subset is all one color? Two methods prove such claims without building the object directly.

[[dimension-arguments|A dimension argument]] turns objects into vectors and bounds their number by the dimension. Write each club as a vector of $0$'s and $1$'s indexed by the people, with arithmetic modulo $2$. Then the dot product of two clubs counts their common members modulo $2$: a club with itself gives its size, $1$, and two different clubs give $0$. Such vectors are independent: if a sum of some of them were $0$, taking the dot product with one of them would leave $1 = 0$. An $n$-dimensional space holds at most $n$ independent vectors, so there are at most $n$ clubs. The idea is to find the space in which the condition becomes "these vectors are independent".

[[probabilistic-method|The probabilistic method]] proves that an object exists by choosing one at random and showing that it works with positive probability, or that a random quantity has a large average. For the graph, put each vertex in one of the two groups by a fair coin. Each edge crosses with probability $\tfrac12$, so the expected number of crossing edges is $\tfrac m2$, and some split achieves at least the average. For the subsets, color each element by a fair coin; a given subset is all one color with probability $2 \cdot \left(\tfrac12\right)^5 = \tfrac{1}{16}$, so the chance that some subset is one color is at most $\tfrac{10}{16} \lt 1$, and some coloring has none. The method never says which split or coloring works, only that one does.

Encode objects as vectors over the right field and prove them independent, or choose randomly and show that the bad events have total probability below $1$ or that the average is large enough. The Summary follows.`,
      related: [
        { card: "indicator-variables", note: String.raw`the expected count as a sum of probabilities.` },
        { card: "combinatorial-nullstellensatz", note: String.raw`another algebraic method for combinatorial existence (K4.2).` },
        { card: "markovs-inequality", note: String.raw`a further probability tool for existence (K4.3).` }
      ],
      exercises: [
        { q: String.raw`In a town of $n$ people, every club has an odd number of members and any two different clubs share an even number of members. Prove that there are at most $n$ clubs.`,
          solution: String.raw`Represent each club by its membership vector $v \in \mathbb{F}_2^n$. Then $v \cdot v$ is the club's size modulo $2$, which is $1$, and $v \cdot w$ for different clubs is the number of common members modulo $2$, which is $0$. If $\sum_{i \in S} v_i = 0$ for a nonempty set $S$ of clubs, take the dot product with $v_j$ for some $j \in S$: the result is $v_j \cdot v_j = 1$, not $0$. So the vectors are linearly independent, and there are at most $n$ of them.` },
        { q: String.raw`Prove that the vertices of any graph with $m$ edges can be split into two groups so that at least $\tfrac m2$ edges join the two groups.`,
          solution: String.raw`Put each vertex in group $A$ or $B$ independently with probability $\tfrac12$. An edge joins the groups when its ends land in different groups, with probability $\tfrac12$. By linearity of expectation the expected number of such edges is $\tfrac m2$. A random variable takes a value at least its expectation with positive probability, so some split has at least $\tfrac m2$ crossing edges.` },
        { q: String.raw`Ten subsets of a set are given, each with exactly $5$ elements. Prove that the elements can be colored red and blue so that no subset is all red or all blue.`,
          solution: String.raw`Color each element red or blue independently with probability $\tfrac12$. A given subset is all red with probability $\tfrac{1}{32}$ and all blue with probability $\tfrac{1}{32}$, so it is one color with probability $\tfrac{1}{16}$. The probability that at least one of the ten subsets is one color is at most $\tfrac{10}{16} \lt 1$. So with positive probability none is, and such a coloring exists.` }
      ],
      problems: []
    },
    "P4.4": {
      prereq: ["proof-by-construction", "pigeonhole-argument", "dimension-arguments", "probabilistic-method"],
      cards: [],
      body: String.raw`[[proof-by-construction|A construction]] builds the object, usually a family found from small cases or a step from $n$ to $n + 1$. [[pigeonhole-argument|A pigeonhole argument]] forces two objects into one box chosen so that sharing a box is the conclusion.

[[dimension-arguments|A dimension argument]] bounds a family by proving its vectors independent, and [[probabilistic-method|the probabilistic method]] shows a random choice works with positive probability.`,
      strategies: [
        String.raw`Solve small cases and look for the family they belong to.`,
        String.raw`Extend a construction from $n$ to $n + 1$ when a direct formula is hard.`,
        String.raw`For pigeonhole, try partial sums, remainders, small regions and pairs as boxes.`,
        String.raw`Turn sets into $0$-$1$ vectors and conditions into dot products.`,
        String.raw`Choose at random; show the bad events have total probability below $1$, or the average is large enough.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that among any $13$ integers, two differ by a multiple of $12$.`,
        solution: String.raw`There are $12$ remainders modulo $12$, so two of the $13$ integers share one, and their difference is a multiple of $12$.` },
      { q: String.raw`Prove that there are infinitely many positive integers $n$ for which $n^2 + 1$ is composite.`,
        solution: String.raw`For every odd $n \ge 3$, $n^2 + 1$ is even and larger than $2$, so it is composite.` },
      { q: String.raw`Each vertex of a graph with $m$ edges is chosen independently with probability $\tfrac12$. Prove that the expected number of edges with both ends chosen is $\tfrac m4$, and hence that some set of vertices contains at least $\tfrac m4$ edges.`,
        solution: String.raw`An edge has both ends chosen with probability $\tfrac12 \cdot \tfrac12 = \tfrac14$. By linearity of expectation the expected number of such edges is $\tfrac m4$, and some choice reaches at least the expectation.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Let $x$ be a real number and $n$ a positive integer. Prove that there are integers $p$ and $q$ with $1 \le q \le n$ and $|qx - p| \lt \tfrac1n$.`,
        solution: String.raw`Consider the fractional parts $\{0x\}, \{1x\}, \ldots, \{nx\}$, $n + 1$ numbers in $[0, 1)$, and the $n$ intervals $\left[\tfrac kn, \tfrac{k+1}{n}\right)$. Two lie in one interval, say $\{ix\}$ and $\{jx\}$ with $i \lt j$, so they differ by less than $\tfrac1n$. Then $q = j - i$ satisfies $1 \le q \le n$, and $qx = jx - ix$ is within $\tfrac1n$ of the integer $p = \lfloor jx \rfloor - \lfloor ix \rfloor$.` },
      { q: String.raw`Prove that every graph with $n$ vertices and average degree $d$ has an independent set (no two of its vertices joined) with at least $\tfrac{n}{d + 1}$ vertices.`,
        solution: String.raw`Order the vertices at random, and let $I$ be the set of vertices that come before all their neighbors. No two vertices of $I$ are joined, since of two joined vertices one comes later. A vertex of degree $d_v$ comes first among itself and its neighbors with probability $\tfrac{1}{d_v + 1}$, so $E|I| = \sum_v \tfrac{1}{d_v + 1}$. The function $\tfrac{1}{t + 1}$ is convex, so this is at least $\tfrac{n}{d + 1}$, where $d$ is the average of the $d_v$. Some ordering gives $|I|$ at least its expectation.` },
      { q: String.raw`Prove that among any $n + 1$ numbers chosen from $1, 2, \ldots, 2n$, one divides another.`,
        solution: String.raw`Write each number as $2^k m$ with $m$ odd. The odd parts lie among $1, 3, \ldots, 2n - 1$, only $n$ values, so two chosen numbers $2^a m$ and $2^b m$ share an odd part. The one with the smaller power of $2$ divides the other.` }
    ],
    problems: []
  }
};
