// Learn, Olympiad Number Theory, chapter D3: additive number theory (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every number was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["D3"] = {
  lessons: {
    "D3.1": {
      prereq: ["pigeonhole", "quadratic-reciprocity", "modular-basics"],
      cards: [],
      body: String.raw`Additive number theory asks which numbers are sums of a given kind: sums of two squares, sums of elements from two sets modulo a prime, sums of $n$ numbers out of a list that are divisible by $n$. The tools in this chapter are pigeonhole arguments sharpened by algebra, and each gives an exact bound.

The prime $13$ is $2^2 + 3^2$, and $29$ is $2^2 + 5^2$; every prime $p \equiv 1 \pmod 4$ is a sum of two squares, and the proof finds the squares from a square root of $-1$ modulo $p$. In $\mathbb{Z}_7$, the sets $A = \{0, 1, 2\}$ and $B = \{0, 3\}$ have the sumset $A + B = \{0, 1, 2, 3, 4, 5\}$, six elements, at least the $3 + 2 - 1 = 4$ that the Cauchy-Davenport theorem guarantees. And among any five integers, three have a sum divisible by $3$.

The lessons are Thue's lemma and Chevalley-Warning (D3.2), and sumsets: Cauchy-Davenport and Erdős-Ginzburg-Ziv (D3.3). The Summary (D3.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Write $13$ and $29$ as sums of two squares.`,
          solution: String.raw`$13 = 4 + 9 = 2^2 + 3^2$ and $29 = 4 + 25 = 2^2 + 5^2$.` },
        { q: String.raw`In $\mathbb{Z}_7$, find $A + B$ for $A = \{0, 1, 2\}$ and $B = \{0, 3\}$.`,
          solution: String.raw`The sums are $0, 1, 2$ (adding $0$) and $3, 4, 5$ (adding $3$), so $A + B = \{0, 1, 2, 3, 4, 5\}$, with $6$ elements.` }
      ],
      problems: []
    },
    "D3.2": {
      prereq: ["pigeonhole", "quadratic-reciprocity", "fermats-little-theorem"],
      cards: ["thues-lemma", "chevalley-warning"],
      body: String.raw`Why is every prime $p \equiv 1 \pmod 4$ a sum of two squares? Why does $x^2 + y^2 + z^2 \equiv 0 \pmod p$ have a solution other than $(0, 0, 0)$? Two theorems find small or nontrivial solutions of congruences.

[[thues-lemma|Thue's lemma]] says that for $a$ coprime to $n$ there are $x$, $y$ with $x \equiv ay \pmod n$ and $0 \lt |x|, |y| \le \sqrt n$. The proof is pigeonhole: the numbers $u - av$ for $0 \le u, v \le \lfloor\sqrt n\rfloor$ are $(\lfloor\sqrt n\rfloor + 1)^2 \gt n$ in number, so two agree modulo $n$, and their difference gives $x = u - u'$, $y = v - v'$. For a prime $p \equiv 1 \pmod 4$, take $a$ with $a^2 \equiv -1$ (D1.3). Then $x^2 \equiv a^2y^2 \equiv -y^2$, so $p \mid x^2 + y^2$, and $0 \lt x^2 + y^2 \lt 2p$ since $\sqrt p$ is not an integer. So $x^2 + y^2 = p$. The method gives other forms: with a square root of $-2$ or $-3$, it writes suitable primes as $x^2 + 2y^2$ or $x^2 + 3y^2$.

[[chevalley-warning|The Chevalley-Warning theorem]] says that if polynomials $f_1, \ldots, f_k$ in $n$ variables over $\mathbb{F}_p$ have total degree less than $n$, then the number of common zeros is a multiple of $p$. So if there is one zero, such as $(0, \ldots, 0)$ for polynomials with no constant term, there are at least $p$, and some zero is nontrivial. For $x^2 + y^2 + z^2$, of degree $2$ in $3$ variables, there is a nontrivial solution modulo every prime. The proof counts with the polynomial $\prod(1 - f_i^{p-1})$, which is $1$ at a common zero and $0$ elsewhere, and uses that $\sum_{x \in \mathbb{F}_p} x^k \equiv 0$ for $0 \le k \lt p - 1$.

Find a small solution of $x \equiv ay$ by pigeonhole, square it against a square root of $-1$, and count zeros modulo $p$ when the degree is less than the number of variables. The next lesson studies sumsets.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`which integers are sums of two squares, built from the primes.` },
        { card: "combinatorial-nullstellensatz", note: String.raw`another polynomial method over $\mathbb{F}_p$ (K4.2).` },
        { card: "brahmagupta-fibonacci", note: String.raw`the product of two sums of two squares is one.` }
      ],
      exercises: [
        { q: String.raw`Prove that every prime $p \equiv 1 \pmod 4$ is a sum of two squares.`,
          solution: String.raw`Since $p \equiv 1 \pmod 4$, there is $a$ with $a^2 \equiv -1 \pmod p$. By Thue's lemma there are $x, y$ with $x \equiv ay \pmod p$ and $0 \lt |x|, |y| \le \sqrt p$, in fact $\lt \sqrt p$ since $p$ is not a square. Then $x^2 \equiv a^2y^2 \equiv -y^2$, so $p \mid x^2 + y^2$, and $0 \lt x^2 + y^2 \lt 2p$. Hence $x^2 + y^2 = p$.` },
        { q: String.raw`Write $1013$ as a sum of two squares, and then write $2026 = 2 \cdot 1013$ as a sum of two squares.`,
          solution: String.raw`$1013 = 22^2 + 23^2 = 484 + 529$. Since $2 = 1^2 + 1^2$, the product identity gives $2026 = (23 + 22)^2 + (23 - 22)^2 = 45^2 + 1^2 = 2025 + 1$.` },
        { q: String.raw`Prove that for every prime $p$ there are integers $x, y, z$, not all multiples of $p$, with $p \mid x^2 + y^2 + z^2$.`,
          solution: String.raw`The polynomial $x^2 + y^2 + z^2$ over $\mathbb{F}_p$ has degree $2$, less than the $3$ variables. By Chevalley-Warning the number of its zeros is a multiple of $p$. It has the zero $(0, 0, 0)$, so it has at least $p \ge 2$ zeros, and one of them is not $(0, 0, 0)$.` }
      ],
      problems: []
    },
    "D3.3": {
      prereq: ["pigeonhole", "modular-basics"],
      cards: ["cauchy-davenport", "erdos-ginzburg-ziv"],
      body: String.raw`If $A$ and $B$ are sets of residues modulo a prime $p$, how small can $A + B = \{a + b\}$ be? Among how many integers must some $n$ have a sum divisible by $n$? The two theorems of this lesson answer exactly.

[[cauchy-davenport|The Cauchy-Davenport theorem]] says that for nonempty $A, B \subseteq \mathbb{Z}_p$ with $p$ prime, $|A + B| \ge \min(p, |A| + |B| - 1)$. Arithmetic progressions with the same difference show it is sharp: $\{0, 1, \ldots, k - 1\} + \{0, 1, \ldots, l - 1\} = \{0, 1, \ldots, k + l - 2\}$. Over the integers the bound $|A| + |B| - 1$ is easy, by adding the smallest of one set to all of the other and then the largest of the first to the rest; modulo a prime the sums can wrap around, and primality is needed, as $\{0, 2\} + \{0, 2\} = \{0, 2\}$ modulo $4$ shows. The theorem is proved by induction on $|B|$, or by the combinatorial Nullstellensatz.

[[erdos-ginzburg-ziv|The Erdős-Ginzburg-Ziv theorem]] says that among any $2n - 1$ integers some $n$ have a sum divisible by $n$. The number $2n - 1$ cannot be lowered: $n - 1$ zeros and $n - 1$ ones contain no such $n$, since any $n$ of them include between $1$ and $n - 1$ ones. For $n = 3$ it is a pigeonhole argument: among five integers, either three share a remainder modulo $3$, and their sum is a multiple of $3$, or each remainder appears at most twice, so all three appear, and one of each gives $0 + 1 + 2 \equiv 0$. The general proof handles primes with Chevalley-Warning and then multiplies: if the theorem holds for $m$ and for $n$, it holds for $mn$.

Expect a sumset modulo a prime to have at least $|A| + |B| - 1$ elements, compare with progressions, and for divisible subset sums count $2n - 1$ numbers. The Summary follows.`,
      related: [
        { card: "chevalley-warning", note: String.raw`the zero count that proves Erdős-Ginzburg-Ziv for primes (D3.2).` },
        { card: "pigeonhole-argument", note: String.raw`the method behind the small cases (P4.2).` },
        { card: "combinatorial-nullstellensatz", note: String.raw`a short proof of Cauchy-Davenport (K4.2).` }
      ],
      exercises: [
        { q: String.raw`Prove that among any five integers there are three whose sum is divisible by $3$.`,
          solution: String.raw`Sort the five integers by their remainders $0, 1, 2$ modulo $3$. If some remainder occurs three times, those three have a sum divisible by $3$. Otherwise each occurs at most twice, so with five numbers all three remainders occur, and one number of each remainder gives a sum $\equiv 0 + 1 + 2 = 3 \equiv 0$.` },
        { q: String.raw`Show that the number $2n - 1$ in the Erdős-Ginzburg-Ziv theorem cannot be replaced by $2n - 2$.`,
          solution: String.raw`Take $n - 1$ zeros and $n - 1$ ones. Any $n$ of them include $k$ ones with $1 \le k \le n - 1$ (at most $n - 1$ zeros are available, and at most $n - 1$ ones), and their sum is $k$, not a multiple of $n$.` },
        { q: String.raw`Show that $\{0, 2\} + \{0, 2\}$ modulo $4$ has fewer than $|A| + |B| - 1$ elements, and explain why this does not contradict Cauchy-Davenport.`,
          solution: String.raw`The sums are $0, 2, 2, 4 \equiv 0$, so the sumset is $\{0, 2\}$ with $2 \lt 3$ elements. Cauchy-Davenport needs a prime modulus; modulo $4$ the set $\{0, 2\}$ is closed under addition, which no set other than $\{0\}$ and the whole of $\mathbb{Z}_p$ can be modulo a prime.` }
      ],
      problems: []
    },
    "D3.4": {
      prereq: ["thues-lemma", "chevalley-warning", "cauchy-davenport", "erdos-ginzburg-ziv"],
      cards: [],
      body: String.raw`[[thues-lemma|Thue's lemma]] finds a small solution of $x \equiv ay$, which writes primes $1 \pmod 4$ as sums of two squares, and [[chevalley-warning|Chevalley-Warning]] gives a nontrivial zero when the degree is less than the number of variables.

[[cauchy-davenport|Cauchy-Davenport]] bounds sumsets modulo a prime by $|A| + |B| - 1$, and [[erdos-ginzburg-ziv|Erdős-Ginzburg-Ziv]] finds $n$ of any $2n - 1$ integers with a sum divisible by $n$.`,
      strategies: [
        String.raw`For a sum of two squares, start from a square root of $-1$ and shrink with Thue's lemma.`,
        String.raw`If a system has degree less than its number of variables, count its zeros modulo $p$.`,
        String.raw`Compare a sumset with arithmetic progressions, which are the extreme case.`,
        String.raw`Check whether a modulus must be prime; most sumset bounds fail otherwise.`,
        String.raw`Prove a divisibility statement for primes and then multiply, as for Erdős-Ginzburg-Ziv.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Write $37$ and $41$ as sums of two squares.`,
        solution: String.raw`$37 = 1 + 36 = 1^2 + 6^2$ and $41 = 16 + 25 = 4^2 + 5^2$; both primes are $1 \pmod 4$.` },
      { q: String.raw`Let $A = \{0, 1, \ldots, k - 1\}$ in $\mathbb{Z}_p$ with $2k - 1 \le p$. Find $|A + A|$.`,
        solution: String.raw`$A + A = \{0, 1, \ldots, 2k - 2\}$, which has $2k - 1$ elements, all different modulo $p$ since $2k - 2 \lt p$. So $|A + A| = 2k - 1 = |A| + |A| - 1$, and Cauchy-Davenport is sharp.` },
      { q: String.raw`Prove that among any three integers, two have an even sum.`,
        solution: String.raw`Two of the three have the same parity, and two numbers of the same parity have an even sum. This is Erdős-Ginzburg-Ziv for $n = 2$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Prove that if the Erdős-Ginzburg-Ziv theorem holds for $m$ and for $n$, then it holds for $mn$.`,
        solution: String.raw`Take $2mn - 1$ integers. While at least $2n - 1$ remain, choose $n$ of them with sum divisible by $n$ and set them aside. After $2m - 2$ groups, $2mn - 1 - (2m - 2)n = 2n - 1$ remain, so a $(2m - 1)$st group can be taken. Let the group sums be $ns_1, \ldots, ns_{2m-1}$. By the theorem for $m$, some $m$ of the $s_i$ add to a multiple of $m$; the corresponding $m$ groups are $mn$ integers whose sum is $n$ times a multiple of $m$.` },
      { q: String.raw`Let $p \equiv 1 \pmod 3$ be prime. Given that $-3$ is a square modulo $p$, prove that $p = x^2 + 3y^2$ for some integers $x$, $y$.`,
        solution: String.raw`Take $a^2 \equiv -3$. By Thue's lemma there are $x, y$ with $x \equiv ay$ and $0 \lt |x|, |y| \lt \sqrt p$, so $x^2 + 3y^2 \equiv 0 \pmod p$ and $0 \lt x^2 + 3y^2 \lt 4p$. It is $p$, $2p$ or $3p$. If $2p$: then $x$ and $y$ have the same parity, and then $x^2 + 3y^2 \equiv 0 \pmod 4$, but $4 \nmid 2p$. If $3p$: then $3 \mid x$, $x = 3x'$, and $3x'^2 + y^2 = p$. Either way $p$ has the form $X^2 + 3Y^2$.` },
      { q: String.raw`Prove that $x^2 + y^2 \equiv -1 \pmod p$ has a solution for every odd prime $p$.`,
        solution: String.raw`The values $x^2$ for $x = 0, \ldots, \tfrac{p-1}{2}$ are $\tfrac{p+1}{2}$ different residues, and so are the values $-1 - y^2$. Together they are $p + 1$ values among $p$ residues, so some $x^2 \equiv -1 - y^2$, which is the required solution.` }
    ],
    problems: []
  }
};
