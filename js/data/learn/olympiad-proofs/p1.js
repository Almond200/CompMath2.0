// Learn, Olympiad Proofs, chapter P1: what a proof is (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["P1"] = {
  lessons: {
    "P1.1": {
      prereq: ["modular-basics", "fundamental-theorem-arithmetic"],
      cards: [],
      body: String.raw`An answer contest asks for a number; a proof contest asks why. A proof is a chain of statements, each following from the hypotheses, from earlier statements or from known results, that ends at the claim. It must cover every case the claim covers, and a reader must be able to check each step without filling in a gap. This chapter gives the shapes a proof can take.

Take the claim "the square of an odd number is odd". A direct proof starts from the hypothesis: an odd number is $2k + 1$, and $(2k + 1)^2 = 2(2k^2 + 2k) + 1$, which is odd. Take "there is no largest prime". There is nothing to start from, so assume the opposite, that $p$ is the largest prime, and look at $N = 2 \cdot 3 \cdot 5 \cdots p + 1$: it leaves remainder $1$ on division by every prime up to $p$, so its prime factors are all larger than $p$, which contradicts the assumption. And take "if $n^2$ is even then $n$ is even": it is easier to prove the equivalent "if $n$ is odd then $n^2$ is odd", which is the first claim again.

A proof is judged by its completeness, not its length. Checking examples, however many, proves nothing about the cases not checked: $n^2 + n + 41$ is prime for $n = 0, 1, \ldots, 39$ but not for $n = 40$, where it is $41^2$. A single counterexample, on the other hand, disproves a claim completely.

The lessons take these shapes in turn: direct proof, contradiction and the contrapositive (P1.2), and statements with two directions, uniqueness and symmetry (P1.3). The Summary (P1.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Prove that the sum of two odd numbers is even.`,
          solution: String.raw`Write the odd numbers as $2a + 1$ and $2b + 1$ for integers $a$, $b$. Their sum is $2a + 2b + 2 = 2(a + b + 1)$, which is twice an integer, so it is even.` },
        { q: String.raw`Show that the statement "$n^2 + n + 41$ is prime for every nonnegative integer $n$" is false.`,
          solution: String.raw`One counterexample is enough. For $n = 40$, $n^2 + n + 41 = 40 \cdot 41 + 41 = 41 \cdot 41$, which is not prime. (So is $n = 41$: $41^2 + 41 + 41 = 41 \cdot 43$.)` },
        { q: String.raw`Prove that there are infinitely many primes.`,
          solution: String.raw`Suppose there were only finitely many, $p_1, p_2, \ldots, p_k$. Let $N = p_1p_2\cdots p_k + 1$. Then $N \gt 1$, so $N$ has a prime factor $q$, which must be one of the $p_i$. But $N$ leaves remainder $1$ on division by each $p_i$, so no $p_i$ divides it. This contradiction shows the list cannot be complete.` }
      ],
      problems: []
    },
    "P1.2": {
      prereq: ["fundamental-theorem-arithmetic", "modular-basics"],
      cards: ["direct-proof", "proof-by-contradiction", "contrapositive"],
      body: String.raw`How is it proved that $\sqrt2$ is irrational, that $n^3 - n$ is always a multiple of $6$, or that a number whose square is a multiple of $3$ is itself a multiple of $3$? Three shapes of proof cover most claims, and choosing the right one is often half the work.

[[direct-proof|A direct proof]] runs from the hypotheses to the conclusion. It is the default, and the other shapes exist to make a direct argument possible. For $6 \mid n^3 - n$, factor: $n^3 - n = (n - 1)n(n + 1)$ is a product of three consecutive integers, so one of them is even and one is a multiple of $3$, and the product is a multiple of $6$. The skill is writing the hypothesis in a form that can be worked with, here a factorization, elsewhere $n = 2k + 1$ or $a = qb + r$.

[[contrapositive|The contrapositive]] of "if $P$ then $Q$" is "if not $Q$ then not $P$", and the two are the same statement. It helps when "not $Q$" gives something to build with. To prove that $3 \mid n^2$ forces $3 \mid n$, suppose $3 \nmid n$; then $n \equiv \pm 1 \pmod 3$, so $n^2 \equiv 1$, and $3 \nmid n^2$. The converse, "if $Q$ then $P$", is a different statement and must never be used in its place.

[[proof-by-contradiction|A proof by contradiction]] assumes the claim is false and reaches something impossible. It suits claims that something does not exist, since assuming the opposite produces an object to work with. If $\sqrt2 = \tfrac pq$ in lowest terms, then $p^2 = 2q^2$, so $p^2$ is even and so is $p$, say $p = 2r$; then $4r^2 = 2q^2$ gives $q^2 = 2r^2$, so $q$ is even too, and the fraction was not in lowest terms. The assumption "in lowest terms" is what the contradiction breaks, and choosing such a normalization at the start is the usual trick. A contradiction proof should be checked for whether it is really a contrapositive in disguise; if so, the contrapositive reads more cleanly.

Write the hypothesis in a usable form for a direct proof, turn "if $P$ then $Q$" around when "not $Q$" is concrete, and assume the opposite, normalized, when the claim says something cannot exist. The next lesson handles claims with two halves.`,
      related: [
        { card: "infinite-descent", note: String.raw`contradiction with a smallest case, the engine behind many irrationality proofs (P3.2).` },
        { card: "euclids-lemma", note: String.raw`a prime dividing a product divides a factor, used in the $\sqrt2$ argument.` },
        { card: "proof-by-cases", note: String.raw`splitting into cases, the most common shape of a direct proof.` }
      ],
      exercises: [
        { q: String.raw`Prove that $n^3 - n$ is divisible by $6$ for every integer $n$.`,
          solution: String.raw`$n^3 - n = (n - 1)n(n + 1)$. Among any two consecutive integers one is even, so $2$ divides the product. Among any three consecutive integers one is a multiple of $3$, so $3$ divides it. Since $2$ and $3$ are coprime, $6$ divides it.` },
        { q: String.raw`Prove that if $n^2$ is a multiple of $3$, then $n$ is a multiple of $3$.`,
          solution: String.raw`Prove the contrapositive. If $3 \nmid n$, then $n \equiv 1$ or $2 \pmod 3$, so $n^2 \equiv 1$ or $4 \equiv 1 \pmod 3$. Hence $3 \nmid n^2$.` },
        { q: String.raw`Prove that $\sqrt3$ is irrational.`,
          solution: String.raw`Suppose $\sqrt3 = \tfrac pq$ with positive integers $p$, $q$ having no common factor. Then $p^2 = 3q^2$, so $3 \mid p^2$, and by the previous problem $3 \mid p$; write $p = 3r$. Then $9r^2 = 3q^2$, so $q^2 = 3r^2$ and $3 \mid q$. So $3$ divides both $p$ and $q$, a contradiction.` },
        { q: String.raw`Prove that no integers $x$, $y$ satisfy $x^2 - 4y = 3$.`,
          solution: String.raw`Suppose they did. Then $x^2 = 4y + 3 \equiv 3 \pmod 4$. But a square is $0$ or $1$ modulo $4$: $(2k)^2 = 4k^2$ and $(2k + 1)^2 = 4(k^2 + k) + 1$. This contradiction shows there are no such integers.` }
      ],
      problems: []
    },
    "P1.3": {
      prereq: ["direct-proof", "contrapositive"],
      cards: ["proving-both-directions", "proving-uniqueness", "wlog-symmetry"],
      body: String.raw`"A positive integer is a perfect square if and only if it has an odd number of divisors." "There is exactly one prime $p$ with $p + 2$ and $p + 4$ also prime." "If $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$; suppose without loss of generality that $a \ge b \ge c$." Each of these claims has a structure that the proof must respect.

[[proving-both-directions|An "if and only if"]] is two claims. "$P$ if and only if $Q$" means $P \Rightarrow Q$ and $Q \Rightarrow P$, and each needs its own argument; the commonest error is to prove one direction twice. For the divisors, pair each divisor $d$ of $n$ with $\tfrac nd$. The pairs have two different members except when $d = \tfrac nd$, that is, $d = \sqrt n$. So if $n$ is a square, exactly one divisor is unpaired and the count is odd; and if the count is odd, some divisor is unpaired, so $\sqrt n$ is an integer. Proving that two sets are equal is the same: show each is inside the other.

[[proving-uniqueness|"Exactly one"]] is also two claims: at least one, and at most one. Here, $p = 3$ works ($3$, $5$, $7$). For uniqueness, among $p$, $p + 2$, $p + 4$ one is a multiple of $3$, since they have different remainders modulo $3$; all three are prime only if that one is $3$ itself, and $p + 2 = 3$ or $p + 4 = 3$ would make $p$ less than $2$. So $p = 3$. Often the uniqueness argument comes first, since deriving what the object must be also produces the candidate to check.

[[wlog-symmetry|Without loss of generality]] lets a symmetry choose one case. When a statement does not change if the variables are permuted, an ordering such as $a \ge b \ge c$ can be assumed, because any other order is turned into this one by relabeling. The phrase must be earned: if the statement is symmetric only in $a$ and $b$, then only $a \ge b$ may be assumed. Writing down which symmetry is used makes the proof checkable.

Split an "if and only if" into two arrows, prove existence and at most one for "exactly one", and name the symmetry before writing "without loss of generality". The Summary follows.`,
      related: [
        { card: "number-of-divisors", note: String.raw`the count of divisors, odd exactly for squares.` },
        { card: "proof-by-cases", note: String.raw`the cases a symmetry merges into one.` },
        { card: "pairing-to-bound", note: String.raw`the pairing that counts divisors, used again for bounds.` }
      ],
      exercises: [
        { q: String.raw`Prove that a positive integer $n$ has an odd number of positive divisors if and only if $n$ is a perfect square.`,
          solution: String.raw`Pair each divisor $d$ with $\tfrac nd$; this matches the divisors in pairs, and a divisor is matched with itself exactly when $d^2 = n$. If $n = m^2$, the only self-matched divisor is $m$, so the number of divisors is twice the number of pairs plus one: odd. Conversely, if the number of divisors is odd, they cannot all lie in pairs of two different divisors, so some $d$ has $d^2 = n$, and $n$ is a square.` },
        { q: String.raw`Prove that $p = 3$ is the only prime for which $p$, $p + 2$ and $p + 4$ are all prime.`,
          solution: String.raw`Existence: $3$, $5$, $7$ are prime. Uniqueness: $p$, $p + 2$, $p + 4$ are $p$, $p + 2$, $p + 1$ modulo $3$, three different remainders, so one of the three numbers is a multiple of $3$. A prime multiple of $3$ is $3$, so one of them equals $3$; since $p \ge 2$, only $p = 3$ is possible.` },
        { q: String.raw`Prove that for real numbers with $a + b + c = 0$, $a^3 + b^3 + c^3 = 3abc$.`,
          solution: String.raw`Substitute $c = -(a + b)$: $a^3 + b^3 - (a + b)^3 = -3a^2b - 3ab^2 = -3ab(a + b) = 3abc$. (The identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ gives the same.)` },
        { q: String.raw`Prove that among any three integers, two have a sum that is even.`,
          solution: String.raw`Each integer is even or odd. Among three integers, two have the same parity, by the pigeonhole principle, and two integers of the same parity have an even sum. (No ordering is needed; the claim is symmetric in the three numbers, so it does not matter which two they are.)` }
      ],
      problems: []
    },
    "P1.4": {
      prereq: ["direct-proof", "proof-by-contradiction", "contrapositive", "proving-both-directions", "proving-uniqueness", "wlog-symmetry"],
      cards: [],
      body: String.raw`[[direct-proof|A direct proof]] runs from the hypotheses to the claim. [[contrapositive|The contrapositive]] proves "not $Q$ implies not $P$" instead, and [[proof-by-contradiction|a contradiction]] assumes the claim false and reaches the impossible, best from a normalized assumption.

[[proving-both-directions|An "if and only if"]] needs both arrows, [[proving-uniqueness|"exactly one"]] needs existence and at most one, and [[wlog-symmetry|"without loss of generality"]] needs a symmetry that is really there.`,
      strategies: [
        String.raw`Write the hypothesis in a form you can compute with: a factorization, a remainder, $2k + 1$.`,
        String.raw`When "not $Q$" is concrete, prove the contrapositive.`,
        String.raw`For "there is no such object", assume one exists, choose it smallest or in lowest terms, and break that choice.`,
        String.raw`Prove both directions of an "if and only if" separately.`,
        String.raw`For "exactly one", derive what the object must be, then check that it works.`,
        String.raw`State the symmetry you use before assuming an order.`,
        String.raw`Disprove a claim with one counterexample; never prove one with examples.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Prove that the product of any four consecutive integers is divisible by $24$.`,
        solution: String.raw`Among four consecutive integers, two are even and one of those two is a multiple of $4$, so the product is divisible by $2 \cdot 4 = 8$. One of any three consecutive integers is a multiple of $3$. Since $\gcd(8, 3) = 1$, the product is divisible by $24$.` },
      { q: String.raw`Prove that $\log_2 3$ is irrational.`,
        solution: String.raw`Suppose $\log_2 3 = \tfrac pq$ with positive integers $p$, $q$. Then $2^{p/q} = 3$, so $2^p = 3^q$. The left side is even and the right side is odd, a contradiction.` },
      { q: String.raw`Prove that an integer $n$ is odd if and only if $n^2$ is odd.`,
        solution: String.raw`If $n = 2k + 1$, then $n^2 = 2(2k^2 + 2k) + 1$ is odd. Conversely, prove the contrapositive: if $n$ is even, $n = 2k$, then $n^2 = 4k^2$ is even. Both directions hold.` },
      { q: String.raw`Prove that $n = 1$ is the only positive integer for which $n + 1$ and $n + 3$ are both powers of $2$.`,
        solution: String.raw`$n = 1$ works: $2$ and $4$. If $n + 1 = 2^a$ and $n + 3 = 2^b$, then $2^b - 2^a = 2$, so $b \gt a \ge 1$ and $2^a(2^{b - a} - 1) = 2$. Since $2^{b-a} - 1$ is odd, it must be $1$ and $2^a = 2$: $a = 1$, $b = 2$, $n = 1$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that if $a$, $b$, $c$ are odd integers, then $ax^2 + bx + c = 0$ has no rational root.`,
        solution: String.raw`Suppose $x = \tfrac pq$ in lowest terms is a root. Then $ap^2 + bpq + cq^2 = 0$. Since $p$ and $q$ are not both even, consider cases. If both are odd, all three terms are odd and their sum is odd, not $0$. If $p$ is even and $q$ odd, the first two terms are even and $cq^2$ is odd, so the sum is odd. If $p$ is odd and $q$ even, $ap^2$ is odd and the others even, so the sum is odd. In every case the sum is odd, a contradiction.` },
      { q: String.raw`Prove that there are infinitely many primes of the form $4k + 3$.`,
        solution: String.raw`Suppose $p_1, \ldots, p_m$ were all of them, and let $N = 4p_1\cdots p_m - 1$. Then $N \equiv 3 \pmod 4$ and $N$ is odd. A product of numbers that are all $1 \pmod 4$ is $1 \pmod 4$, so some prime factor $q$ of $N$ is $3 \pmod 4$. Then $q$ is some $p_i$, but $N \equiv -1 \pmod{p_i}$, so $p_i \nmid N$: a contradiction.` },
      { q: String.raw`Prove that among any five points with integer coordinates in the plane, there are two whose midpoint also has integer coordinates.`,
        solution: String.raw`Each point's coordinates have a parity pattern, one of (even, even), (even, odd), (odd, even), (odd, odd). With five points and four patterns, two points share a pattern. Their coordinates then have even sums, so the midpoint $\left(\tfrac{x_1 + x_2}{2}, \tfrac{y_1 + y_2}{2}\right)$ has integer coordinates.` }
    ],
    problems: []
  }
};
