// Learn, AIME Number Theory, chapter N2: linear congruences and CRT (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N2"] = {
  lessons: {
    "N2.1": {
      prereq: ["modular-basics"],
      cards: [],
      body: String.raw`This chapter solves equations in remainders. Its tools are the rules of congruences, inverses, the conditions under which a linear congruence has solutions, the extended Euclidean algorithm, and the Chinese Remainder Theorem, which joins conditions on different moduli into one.

Two integers are congruent modulo $n$ when they leave the same remainder on division by $n$, that is, when $n$ divides their difference. Congruences can be added, subtracted and multiplied like equations, so a sum or product can be reduced modulo $n$ at any stage. Division is the exception. An integer $a$ has an inverse modulo $n$, a number $b$ with $ab \equiv 1 \pmod n$, exactly when $\gcd(a, n) = 1$, and only then may $a$ be cancelled from both sides of a congruence. Since $7 \cdot 3 = 21 \equiv 1 \pmod{10}$, the congruence $7x \equiv 3 \pmod{10}$ is solved by multiplying by $3$: $x \equiv 9$.

A linear congruence $ax \equiv b \pmod n$ has solutions exactly when $d = \gcd(a, n)$ divides $b$, and then it has $d$ solutions modulo $n$, found by dividing everything by $d$. The same fact in another form is Bézout's identity: the numbers $ax + ny$ are exactly the multiples of $d$. The extended Euclidean algorithm finds the coefficients, and with them the inverses.

Conditions on different moduli are joined by the Chinese Remainder Theorem. If the moduli are pairwise coprime, a remainder for each modulus fixes exactly one remainder modulo their product: $x \equiv 1 \pmod 4$ and $x \equiv 4 \pmod{25}$ together say $x \equiv 29 \pmod{100}$. If the moduli share a factor, the conditions must agree on it, and then they fix one remainder modulo the least common multiple. In reverse, a question modulo a composite number splits into questions modulo its prime powers, which are answered separately and multiplied or joined.

The lessons take these ideas in turn: congruence rules and inverses (N2.2), linear congruences (N2.3), the extended Euclidean algorithm and Bézout (N2.4), the Chinese Remainder Theorem (N2.5), and moduli that share factors, with counts of solutions (N2.6). The Summary (N2.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Solve $7x \equiv 3 \pmod{10}$.`, answer: "9",
          solution: String.raw`Since $7 \cdot 3 = 21 \equiv 1 \pmod{10}$, the inverse of $7$ is $3$. Multiplying both sides by $3$ gives $x \equiv 9 \pmod{10}$. Check: $7 \cdot 9 = 63 \equiv 3$.` },
        { q: String.raw`Find every $x$ from $0$ to $9$ with $6x \equiv 4 \pmod{10}$.`, answer: "4, 9",
          solution: String.raw`Here $\gcd(6, 10) = 2$ divides $4$, so there are $2$ solutions modulo $10$. Dividing by $2$ gives $3x \equiv 2 \pmod 5$; the inverse of $3$ modulo $5$ is $2$, so $x \equiv 4 \pmod 5$, that is, $x = 4$ or $x = 9$.` },
        { q: String.raw`Find the integer $x$ from $0$ to $99$ with $x \equiv 1 \pmod 4$ and $x \equiv 4 \pmod{25}$.`, answer: "29",
          solution: String.raw`The numbers that are $4$ modulo $25$ below $100$ are $4, 29, 54, 79$, with remainders $0, 1, 2, 3$ modulo $4$. Only $29$ is $1$ modulo $4$. The Chinese Remainder Theorem says it is the only one modulo $100$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 21",
        "2017 AMC 10B, Problem 23",
        "2020 AMC 10A, Problem 24"
      ]
    },
    "N2.2": {
      prereq: ["modular-basics"],
      cards: ["modular-inverse", "euclids-lemma"],
      body: String.raw`Congruences can be added, subtracted, and multiplied like equations, but division is where they differ, and almost every mistake with them is a division made without checking. Solving $7x \equiv 3 \pmod{10}$ means undoing the multiplication by $7$, and that is possible exactly when $7$ has an inverse modulo $10$: a number $u$ with $7u \equiv 1$. Here $u = 3$ works, since $21 \equiv 1$, so multiplying both sides by $3$ gives $x \equiv 9$. The whole lesson is about when such an inverse exists, and what can still be done when it does not.

An inverse of $a$ modulo $n$ exists exactly when $a$ and $n$ are coprime. If they share a factor $d > 1$, every multiple $au$ is a multiple of $d$ while $1$ plus a multiple of $n$ is not, so $au \equiv 1$ is impossible. If they are coprime, multiplying the residues $0, 1, \ldots, n - 1$ by $a$ gives $n$ different residues (two equal products $ai \equiv aj$ would make $n$ divide $a(i - j)$, and so divide $i - j$), so one of them is $1$. The step "so it divides $i - j$" is [[euclids-lemma|Euclid's lemma]] in its general form: if $n$ divides $ab$ and $n$ is coprime to $a$, then $n$ divides $b$. For a prime $n$ this is the familiar statement that a prime dividing a product divides one of the factors.

Finding an inverse for a small modulus is a matter of trying the multiples: the [[modular-inverse|inverse]] of $13$ modulo $22$ is $17$, because $13 \cdot 17 = 221 = 10 \cdot 22 + 1$. For a large modulus the extended Euclidean algorithm of N2.4 finds it directly. Once an inverse is in hand, a congruence $ax \equiv b \pmod n$ with $a$ coprime to $n$ has exactly one solution, $x \equiv a^{-1} b$.

When the factor to be cancelled shares something with the modulus, cancelling is still possible, but the modulus shrinks. In general $ka \equiv kb \pmod n$ is equivalent to $a \equiv b \pmod{n / \gcd(k, n)}$. So $6x \equiv 6 \pmod 9$ does not give $x \equiv 1 \pmod 9$; dividing by $6$ divides the modulus by $\gcd(6, 9) = 3$, and the true statement is $x \equiv 1 \pmod 3$, which modulo $9$ means $x \equiv 1, 4, 7$. Forgetting to shrink the modulus loses solutions; dividing when the factor is coprime to the modulus loses nothing.

A multiplication by an invertible number also shuffles the residues without repeating any, which is how inverses show up in counting problems: a rule that sends seat $i$ to seat $ai$ modulo $n$ visits every seat exactly when $a$ is coprime to $n$. The signal for this lesson is a congruence to be solved for an unknown multiplied by a constant, or any step that wants to divide.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`the way to compute an inverse when the modulus is too large to try multiples (N2.4).` },
        { card: "fermats-little-theorem", note: String.raw`for a prime modulus, $a^{p-2}$ is the inverse of $a$ (N3.2).` },
        { card: "modular-basics", note: String.raw`the rules for adding and multiplying congruences that this lesson uses at every step.` }
      ],
      exercises: [
        { q: String.raw`Find the inverse of $13$ modulo $22$, as a residue from $0$ to $21$.`, answer: "17",
          solution: String.raw`$13$ and $22$ are coprime, so an inverse exists. Trying multiples of $13$ that are $1$ more than a multiple of $22$: $13 \cdot 17 = 221 = 10 \cdot 22 + 1$. So the inverse is $17$.` },
        { q: String.raw`Solve $7x \equiv 3 \pmod{10}$, giving $x$ as a residue from $0$ to $9$.`, answer: "9",
          solution: String.raw`The inverse of $7$ modulo $10$ is $3$, since $7 \cdot 3 = 21 \equiv 1$. Multiplying both sides by $3$ gives $x \equiv 9 \pmod{10}$. Check: $7 \cdot 9 = 63 \equiv 3$.` },
        { q: String.raw`Find all residues $x$ from $0$ to $8$ with $6x \equiv 6 \pmod 9$.`, answer: "1, 4, 7",
          solution: String.raw`$\gcd(6, 9) = 3$, so cancelling $6$ divides the modulus by $3$: the congruence is equivalent to $x \equiv 1 \pmod 3$. Modulo $9$ that is $x = 1, 4, 7$. Each one checks: $6, 24, 42$ are all $6$ modulo $9$.` }
      ],
      problems: ["2025 AMC 12B, Problem 5", "2025 AMC 10B, Problem 23", "2012 AIME I, Problem 15"]
    },
    "N2.3": {
      prereq: ["modular-inverse", "euclids-lemma"],
      cards: ["subtract-equal-remainders", "reduce-divisibility-constant", "poly-divisible-linear"],
      body: String.raw`A linear congruence $ax \equiv b \pmod n$ either has no solution or has exactly $\gcd(a, n)$ of them modulo $n$, and the gcd decides which. The congruence $6x \equiv 4 \pmod{10}$ has the two solutions $x \equiv 4$ and $x \equiv 9$, while $6x \equiv 3 \pmod{10}$ has none, and nothing more than $\gcd(6, 10) = 2$ separates the two cases. The same divisibility thinking runs through the problems of this lesson that do not look like congruences at all.

Write $g = \gcd(a, n)$. Every value of $ax$ modulo $n$ is a multiple of $g$, because $ax$ and $n$ both are, so the congruence needs $g \mid b$. When $g$ does divide $b$, dividing $a$, $b$, and $n$ by $g$ gives $\tfrac ag\, x \equiv \tfrac bg \pmod{\tfrac ng}$, where now $\tfrac ag$ is coprime to $\tfrac ng$ and has an inverse, so there is exactly one solution modulo $\tfrac ng$. Modulo $n$ that one solution becomes $g$ of them, spaced $\tfrac ng$ apart. For $6x \equiv 4 \pmod{10}$ the reduced form is $3x \equiv 2 \pmod 5$, with solution $x \equiv 4$, which modulo $10$ is $x \equiv 4, 9$.

Divisibility conditions often arrive in disguise. Three numbers that leave the same remainder on division by an unknown $d$ give $d$ dividing each of their differences, because equal remainders cancel when subtracting; so [[subtract-equal-remainders|subtracting equal remainders]] turns "the same remainder" into "a common divisor of the differences", and the possible $d$ are the divisors of the gcd of those differences. A condition like $k + 1 \mid k^2 + 1$ is handled by [[reduce-divisibility-constant|reducing to a constant]]: since $k^2 + 1 = (k - 1)(k + 1) + 2$, and $k + 1$ divides $(k - 1)(k + 1)$, it divides $k^2 + 1$ exactly when it divides $2$. In general, dividing a polynomial $f(k)$ by $k - c$ leaves the remainder $f(c)$, so [[poly-divisible-linear|$k - c$ divides $f(k)$]] for an integer $k$ exactly when $k - c$ divides the constant $f(c)$, and the answers are read off from the divisors of one number.

The signal is any statement that some unknown divides something, or leaves equal remainders, or a congruence whose coefficient shares a factor with the modulus. In each case the goal is the same: reduce the condition to "this number divides that constant", then list divisors.`,
      related: [
        { card: "modular-inverse", note: String.raw`the inverse of $\tfrac ag$ modulo $\tfrac ng$ that gives the one reduced solution.` },
        { card: "bezouts-identity", note: String.raw`why $\gcd(a, n) \mid b$ is also enough: some combination $ax + ny$ equals the gcd (N2.4).` },
        { card: "number-of-divisors", note: String.raw`counting the answers once a condition is reduced to "divides a constant".` }
      ],
      exercises: [
        { q: String.raw`Find all residues $x$ from $0$ to $19$ with $12x \equiv 8 \pmod{20}$.`, answer: "4, 9, 14, 19",
          solution: String.raw`$\gcd(12, 20) = 4$ divides $8$, so there are $4$ solutions modulo $20$. Dividing by $4$ gives $3x \equiv 2 \pmod 5$; the inverse of $3$ modulo $5$ is $2$, so $x \equiv 4 \pmod 5$. Modulo $20$ these are $4, 9, 14, 19$.` },
        { q: String.raw`How many residues $x$ modulo $10$ satisfy $6x \equiv 3 \pmod{10}$?`, answer: "0",
          solution: String.raw`$\gcd(6, 10) = 2$, but $2$ does not divide $3$: every $6x$ is even, and so is every $6x - 10k$, while $3$ is odd. There are no solutions.` },
        { q: String.raw`Find all positive integers $n$ for which $n + 1$ divides $n^2 + 1$.`, answer: "1",
          solution: String.raw`$n^2 + 1 = (n - 1)(n + 1) + 2$, so $n + 1$ divides $n^2 + 1$ exactly when it divides $2$. For positive $n$, $n + 1 \ge 2$, so $n + 1 = 2$ and $n = 1$. Check: $2$ divides $2$.` }
      ],
      problems: ["2017 AIME I, Problem 2", "2014 AMC 12B, Problem 7"]
    },
    "N2.4": {
      prereq: ["modular-inverse", "euclidean-algorithm"],
      cards: ["extended-euclidean-algorithm", "bezouts-identity"],
      body: String.raw`The combinations $21x + 15y$ with integer $x$ and $y$ can equal $3$, for instance $21 \cdot (-2) + 15 \cdot 3 = 3$, but they can never equal $1$, because every one of them is a multiple of $3$. [[bezouts-identity|Bézout's identity]] says this is the whole story: the integer combinations of $a$ and $b$ are exactly the multiples of $\gcd(a, b)$. It is the reason a linear congruence with $\gcd(a, n) \mid b$ always has a solution, and the [[extended-euclidean-algorithm|extended Euclidean algorithm]] is the way to find the coefficients.

The algorithm keeps track of the Euclidean algorithm's steps and runs them backward. For $21$ and $15$: $21 = 1 \cdot 15 + 6$, then $15 = 2 \cdot 6 + 3$, then $6 = 2 \cdot 3$, so the gcd is $3$. Reading the steps upward, $3 = 15 - 2 \cdot 6$, and $6 = 21 - 15$, so $3 = 15 - 2(21 - 15) = 3 \cdot 15 - 2 \cdot 21$. Each remainder along the way is a combination of the two starting numbers, so the last nonzero one, the gcd, is too. Applied to $a$ and a modulus $n$ that are coprime, the same process gives $ax + ny = 1$, and then $x$ is the inverse of $a$ modulo $n$: for $17$ modulo $60$ it gives $2 \cdot 60 - 7 \cdot 17 = 1$, so the inverse is $-7 \equiv 53$.

Once one solution of $ax + by = c$ is known, all of them follow. If $(x_0, y_0)$ works, so does $(x_0 + \tfrac bg t,\ y_0 - \tfrac ag t)$ for every integer $t$, where $g = \gcd(a, b)$, because the changes $a \cdot \tfrac bg t$ and $b \cdot \tfrac ag t$ cancel; and these are all the solutions. That is what contest problems usually want: the solutions in positive integers, or inside some range, found by bounding $t$. For $4x + 7y = 100$, the solution $(25, 0)$ gives the family $(25 - 7t, 4t)$, and both coordinates are positive for $t = 1, 2, 3$, so there are three solutions in positive integers.

The signal is an equation $ax + by = c$ in integers, a question about which amounts can be made from two sizes, or an inverse modulo a number too large to search.`,
      related: [
        { card: "euclidean-algorithm", note: String.raw`the forward steps that the extended version records and runs backward.` },
        { card: "modular-inverse", note: String.raw`an inverse modulo $n$ is the coefficient of $a$ in $ax + ny = 1$.` },
        { card: "chicken-mcnugget", note: String.raw`which amounts $ax + by$ with nonnegative $x$ and $y$ are reachable, when $a$ and $b$ are coprime.` }
      ],
      exercises: [
        { q: String.raw`What is the smallest positive integer of the form $84x + 126y$, with $x$ and $y$ integers?`, answer: "42",
          solution: String.raw`By Bézout's identity the combinations of $84$ and $126$ are exactly the multiples of $\gcd(84, 126)$. Since $126 = 84 + 42$ and $84 = 2 \cdot 42$, the gcd is $42$, and $42 = 126 - 84$ is reached. The smallest positive value is $42$.` },
        { q: String.raw`Find the inverse of $17$ modulo $60$, as a residue from $0$ to $59$.`, answer: "53",
          solution: String.raw`Euclid: $60 = 3 \cdot 17 + 9$, $17 = 1 \cdot 9 + 8$, $9 = 1 \cdot 8 + 1$. Backward: $1 = 9 - 8 = 9 - (17 - 9) = 2 \cdot 9 - 17 = 2(60 - 3 \cdot 17) - 17 = 2 \cdot 60 - 7 \cdot 17$. So $-7 \cdot 17 \equiv 1$, and the inverse is $-7 \equiv 53$. Check: $17 \cdot 53 = 901 = 15 \cdot 60 + 1$.` },
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $4x + 7y = 100$?`, answer: "3",
          solution: String.raw`One solution is $(25, 0)$, and since $\gcd(4, 7) = 1$ all solutions are $(25 - 7t, 4t)$. Positivity needs $t \ge 1$ and $25 - 7t \ge 1$, that is $t \le 3$. So $t = 1, 2, 3$, giving $(18, 4), (11, 8), (4, 12)$: three pairs.` }
      ],
      problems: ["2006 AMC 10A, Problem 22", "2000 AMC 12, Problem 16"]
    },
    "N2.5": {
      prereq: ["modular-inverse"],
      cards: ["crt"],
      body: String.raw`Many conditions on an integer come as remainders for several moduli at once: odd, a multiple of $3$, and $4$ more than a multiple of $25$. The [[crt|Chinese Remainder Theorem]] says that when the moduli are pairwise coprime, such a list of remainders pins the integer down to exactly one residue modulo their product. The number that is $1$ modulo $4$ and $4$ modulo $25$ is $29$ modulo $100$, and nothing else below $100$ will do; this pair returns in N3.5, where it gives the last two digits of $3^{2026}$.

The theorem is a counting argument. Modulo $mn$ there are $mn$ residues, and each one has a pair of remainders, one modulo $m$ and one modulo $n$; there are also exactly $mn$ such pairs. Two residues with the same pair differ by a multiple of both $m$ and $n$, and since $m$ and $n$ are coprime, a multiple of both is a multiple of $mn$, so the two residues are equal. Different residues therefore have different pairs, and with as many pairs as residues, every pair occurs exactly once. The same holds for any number of pairwise coprime moduli.

To find the residue, substitute rather than search. For $x \equiv 4 \pmod 9$ and $x \equiv 5 \pmod{11}$, write $x = 4 + 9k$; the second condition becomes $9k \equiv 1 \pmod{11}$, and the inverse of $9$ modulo $11$ is $5$, so $k \equiv 5$ and $x = 4 + 45 = 49$. A third congruence is folded in the same way, one at a time: $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, and $x \equiv 2 \pmod 7$ give $x \equiv 23 \pmod{105}$. When the numbers are small, listing the values of one congruence and checking the others is just as quick.

The theorem also runs in the other direction, which is often the more useful one. To study a number modulo $1000$, it is enough to study it modulo $8$ and modulo $125$ separately, and each of those questions is usually easier. A condition such as $10^4 \mid N(N - 1)$ splits the same way: $N$ and $N - 1$ are coprime, so the factor $16$ lies wholly in one of them and the factor $625$ wholly in one of them. The signal is a modulus that factors into coprime pieces, or several remainder conditions to be joined.`,
      related: [
        { card: "crt-solution-counting", note: String.raw`the count of solutions of a congruence is the product of the counts modulo the coprime pieces (N2.6).` },
        { card: "modular-inverse", note: String.raw`the inverse used in each substitution step.` },
        { card: "eulers-theorem", note: String.raw`the tool that most often works on one piece of a split modulus (N3.4 and N3.5).` }
      ],
      exercises: [
        { q: String.raw`Find the residue $x$ from $0$ to $98$ with $x \equiv 4 \pmod 9$ and $x \equiv 5 \pmod{11}$.`, answer: "49",
          solution: String.raw`Write $x = 4 + 9k$. Then $4 + 9k \equiv 5 \pmod{11}$ gives $9k \equiv 1$, and since $9 \cdot 5 = 45 = 4 \cdot 11 + 1$, $k \equiv 5$. So $x = 4 + 45 = 49$. Check: $49 = 5 \cdot 9 + 4 = 4 \cdot 11 + 5$.` },
        { q: String.raw`Find the smallest positive integer that leaves remainder $2$ on division by $3$, remainder $3$ on division by $5$, and remainder $2$ on division by $7$.`, answer: "23",
          solution: String.raw`The numbers that are $2$ modulo $7$ and $2$ modulo $3$ are the numbers $2$ modulo $21$: $2, 23, 44, \ldots$. Of these, $23$ is $3$ modulo $5$, so the answer is $23$ (and the full solution is $x \equiv 23 \pmod{105}$).` },
        { q: String.raw`Find the residue $x$ from $0$ to $99$ with $x \equiv 1 \pmod 4$ and $x \equiv 4 \pmod{25}$.`, answer: "29",
          solution: String.raw`The candidates that are $4$ modulo $25$ are $4, 29, 54, 79$. Of these, only $29 = 7 \cdot 4 + 1$ is $1$ modulo $4$, so $x = 29$.` }
      ],
      problems: ["1993 AIME, Problem 6", "2014 AIME I, Problem 8"]
    },
    "N2.6": {
      prereq: ["crt", "euclids-lemma"],
      cards: ["crt-solution-counting"],
      body: String.raw`The Chinese Remainder Theorem needs coprime moduli, but conditions such as $x \equiv 3 \pmod 6$ and $x \equiv 5 \pmod 8$ share a factor. Such a pair is either contradictory or has exactly one solution modulo the least common multiple of the moduli, and one gcd decides which. The same splitting, run in reverse, counts the solutions of harder congruences: $x^2 \equiv 1 \pmod{1000}$ has $8$ solutions, because it has $4$ modulo $8$ and $2$ modulo $125$.

Two congruences $x \equiv a \pmod m$ and $x \equiv b \pmod n$ can hold together only if they agree modulo $\gcd(m, n)$, since each fixes $x$ modulo that gcd. So the test is $\gcd(m, n) \mid a - b$. When it passes, there is exactly one solution modulo $\operatorname{lcm}(m, n)$; when it fails, there is none. For $x \equiv 3 \pmod 6$ and $x \equiv 5 \pmod 8$, the gcd $2$ divides $3 - 5$, and the solution is $x \equiv 21 \pmod{24}$. For $x \equiv 1 \pmod 6$ and $x \equiv 2 \pmod 4$, the first makes $x$ odd and the second makes it even, which is exactly the failure $2 \nmid 1 - 2$. A practical way to handle shared factors is to split every modulus into prime powers, check that the conditions on each prime power agree, and keep the strongest one.

To [[crt-solution-counting|count the solutions]] of a polynomial congruence $f(x) \equiv 0 \pmod n$, split $n$ into its prime-power factors. By the Chinese Remainder Theorem, a solution modulo $n$ is the same thing as a choice of one solution modulo each prime power, so the count is the product of the counts. For $x^2 \equiv 1 \pmod{125}$, the prime $5$ divides $(x - 1)(x + 1)$ and cannot divide both factors, since they differ by $2$, so $125$ divides one of them: $x \equiv \pm 1$, two solutions. Modulo $8$, every odd square is $1$, so all four odd residues work. The product is $4 \cdot 2 = 8$. Likewise $x^2 \equiv x \pmod{1000}$ has $2 \cdot 2 = 4$ solutions, since modulo a prime power $x(x - 1)$ can only be divisible through one factor.

The signal is a system of congruences with overlapping moduli, or a question asking how many residues satisfy a condition modulo a composite number. Split into prime powers, count or solve there, and multiply or join. The Summary (N2.7) collects the chapter's strategies.`,
      related: [
        { card: "crt", note: String.raw`the coprime case, which the prime-power splitting reduces everything to.` },
        { card: "euclids-lemma", note: String.raw`why a prime power dividing $(x - 1)(x + 1)$ must divide one factor when the factors share no copy of the prime.` },
        { card: "gcd-lcm-product", note: String.raw`the least common multiple that a compatible pair of congruences is solved modulo.` }
      ],
      exercises: [
        { q: String.raw`Find the residue $x$ from $0$ to $23$ with $x \equiv 3 \pmod 6$ and $x \equiv 5 \pmod 8$.`, answer: "21",
          solution: String.raw`$\gcd(6, 8) = 2$ divides $3 - 5 = -2$, so there is one solution modulo $\operatorname{lcm}(6, 8) = 24$. The numbers $5$ modulo $8$ below $24$ are $5, 13, 21$, and of these only $21$ is $3$ modulo $6$.` },
        { q: String.raw`How many residues $x$ modulo $1000$ satisfy $x^2 \equiv 1 \pmod{1000}$?`, answer: "8",
          solution: String.raw`Split $1000 = 8 \cdot 125$. Modulo $8$ the odd residues $1, 3, 5, 7$ all square to $1$: four solutions. Modulo $125$, $125$ must divide $(x - 1)(x + 1)$; these factors differ by $2$, so $5$ divides at most one of them, and $125$ divides $x - 1$ or $x + 1$: two solutions. By the Chinese Remainder Theorem there are $4 \cdot 2 = 8$.` },
        { q: String.raw`How many residues $x$ modulo $1000$ satisfy $x^2 \equiv x \pmod{1000}$?`, answer: "4",
          solution: String.raw`The condition is that $1000$ divides $x(x - 1)$. Modulo $8$: $x$ and $x - 1$ are coprime, so $8$ divides one of them, giving $x \equiv 0$ or $1$. Modulo $125$ the same reasoning gives $x \equiv 0$ or $1$. That is $2 \cdot 2 = 4$ solutions modulo $1000$.` }
      ],
      problems: ["2012 AIME I, Problem 10", "2012 AIME II, Problem 12", "2011 AIME II, Problem 14"]
    },
    "N2.7": {
      prereq: ["modular-basics", "modular-inverse", "euclids-lemma", "subtract-equal-remainders", "extended-euclidean-algorithm", "bezouts-identity", "crt", "crt-solution-counting"],
      cards: [],
      body: String.raw`[[modular-basics|Congruences]] can be added, subtracted and multiplied, and reduced at any stage. [[modular-inverse|An inverse]] of $a$ modulo $n$ exists exactly when $\gcd(a, n) = 1$, and only then may $a$ be cancelled; [[euclids-lemma|Euclid's lemma]] is the same fact for a prime modulus.

A linear congruence $ax \equiv b \pmod n$ has solutions exactly when $\gcd(a, n)$ divides $b$, and then it has $\gcd(a, n)$ of them. When several numbers leave [[subtract-equal-remainders|the same remainder]], the modulus divides their differences. [[bezouts-identity|Bézout's identity]] says the combinations $ax + ny$ are the multiples of $\gcd(a, n)$, and [[extended-euclidean-algorithm|the extended Euclidean algorithm]] finds the coefficients.

[[crt|The Chinese Remainder Theorem]] joins conditions modulo pairwise coprime numbers into one condition modulo their product. With moduli that share factors the conditions must agree, and [[crt-solution-counting|the number of solutions]] modulo a composite number is the product of the numbers of solutions modulo its prime powers.`,
      strategies: [
        String.raw`Reduce every quantity modulo $n$ as early as possible.`,
        String.raw`Before dividing a congruence, check that the divisor is coprime to the modulus; otherwise divide the modulus by the gcd as well.`,
        String.raw`For $ax \equiv b \pmod n$, compute $d = \gcd(a, n)$ first: no solution if $d \nmid b$, and $d$ solutions if $d \mid b$.`,
        String.raw`When several numbers leave the same remainder, take their differences: the modulus divides each of them.`,
        String.raw`Find an inverse by the extended Euclidean algorithm, or by trying small multiples when the modulus is small.`,
        String.raw`Split a composite modulus into prime powers, solve each piece, and join the answers with the Chinese Remainder Theorem.`,
        String.raw`To count solutions modulo a composite number, count them modulo each prime power and multiply.`,
        String.raw`To join two conditions by hand, list the numbers satisfying the one with the larger modulus and test them against the other.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the inverse of $13$ modulo $22$.`, answer: "17",
        solution: String.raw`Run the Euclidean algorithm: $22 = 13 + 9$, $13 = 9 + 4$, $9 = 2 \cdot 4 + 1$. Back-substituting, $1 = 9 - 2 \cdot 4 = 9 - 2(13 - 9) = 3 \cdot 9 - 2 \cdot 13 = 3(22 - 13) - 2 \cdot 13 = 3 \cdot 22 - 5 \cdot 13$. So $-5 \cdot 13 \equiv 1$, and the inverse is $-5 \equiv 17 \pmod{22}$. Check: $13 \cdot 17 = 221 = 10 \cdot 22 + 1$.` },
      { q: String.raw`What is the least positive integer $x$ with $21x \equiv 3 \pmod{15}$?`, answer: "3",
        solution: String.raw`Reduce: $21 \equiv 6$, so $6x \equiv 3 \pmod{15}$. Since $\gcd(6, 15) = 3$ divides $3$, divide through by $3$: $2x \equiv 1 \pmod 5$, so $x \equiv 3 \pmod 5$. The least positive solution is $3$.` },
      { q: String.raw`Find the integer $x$ from $0$ to $98$ with $x \equiv 4 \pmod 9$ and $x \equiv 5 \pmod{11}$.`, answer: "49",
        solution: String.raw`The numbers that are $5$ modulo $11$ are $5, 16, 27, 38, 49, \ldots$, with digit sums giving their remainders modulo $9$: $5, 7, 0, 2, 4$. So $x = 49$.` },
      { q: String.raw`What is the least positive integer that leaves remainders $2$, $3$ and $2$ on division by $3$, $5$ and $7$?`, answer: "23",
        solution: String.raw`The conditions modulo $3$ and $7$ say $n \equiv 2 \pmod{21}$, so $n$ is one of $2, 23, 44, \ldots$. Of these, $23$ is the first that is $3$ modulo $5$.` },
      { q: String.raw`Find the integer $x$ from $0$ to $23$ with $x \equiv 3 \pmod 6$ and $x \equiv 5 \pmod 8$.`, answer: "21",
        solution: String.raw`The moduli share the factor $2$, and both conditions say $x$ is odd, so they agree and fix one remainder modulo $\operatorname{lcm}(6, 8) = 24$. The numbers that are $5$ modulo $8$ are $5, 13, 21$, with remainders $5, 1, 3$ modulo $6$. So $x = 21$.` },
      { q: String.raw`How many $x$ from $0$ to $59$ satisfy $12x \equiv 24 \pmod{60}$?`, answer: "12",
        solution: String.raw`Here $\gcd(12, 60) = 12$ divides $24$, so there are $12$ solutions modulo $60$. Dividing by $12$ gives $x \equiv 2 \pmod 5$: $x = 2, 7, \ldots, 57$, twelve values.` },
      { q: String.raw`How many $x$ from $0$ to $999$ satisfy $x^2 \equiv 1 \pmod{1000}$?`, answer: "8",
        solution: String.raw`Split $1000 = 8 \cdot 125$. Modulo $8$, every odd $x$ works: $1, 3, 5, 7$, four solutions. Modulo $125$, $125 \mid (x - 1)(x + 1)$, and $5$ cannot divide both factors, which differ by $2$, so $x \equiv \pm 1$: two solutions. By the Chinese Remainder Theorem each pair gives one solution modulo $1000$, so there are $4 \cdot 2 = 8$.` }
    ],
    problems: [
      "2017 AIME I, Problem 9",
      "2013 AIME I, Problem 11",
      "1993 AIME, Problem 9"
    ]
  },
  challenge: {
    problems: [
      "2023 AIME I, Problem 7",
      "2001 AIME I, Problem 11",
      "2026 AIME I, Problem 8",
      "2026 AIME II, Problem 5"
    ]
  }
};
