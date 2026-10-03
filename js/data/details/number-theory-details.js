// Extended detail-page write-ups for Number Theory, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"gcd-lcm-product": String.raw`
## Why it works
The gcd and the lcm are both built one prime at a time, and for each prime they share out the two exponents exactly.

Write $a$ and $b$ over the same primes, allowing an exponent of $0$: $a = \prod p^{e_p}$ and $b = \prod p^{f_p}$. A number divides both exactly when its exponent of each prime is at most $\min(e_p, f_p)$, so $\gcd(a, b) = \prod p^{\min(e_p, f_p)}$. A number is a multiple of both exactly when its exponent of each prime is at least $\max(e_p, f_p)$, so $\operatorname{lcm}(a, b) = \prod p^{\max(e_p, f_p)}$.

With two numbers, one exponent is the minimum and the other is the maximum, so $\min(e_p, f_p) + \max(e_p, f_p) = e_p + f_p$. Multiplying over all primes gives $$\gcd(a, b) \cdot \operatorname{lcm}(a, b) = \prod p^{e_p + f_p} = ab.$$

{{figure:exponents}}

With three numbers the count breaks: the minimum and maximum of three exponents leave out the middle one. For $2$, $4$, and $8$ the gcd is $2$ and the lcm is $8$, whose product is $16$, not $2 \cdot 4 \cdot 8 = 64$.

## How to use it
Given any three of $a$, $b$, the gcd, and the lcm, the fourth follows: since $\gcd(8, 12) = 4$, $\operatorname{lcm}(8, 12) = \frac{8 \cdot 12}{4} = 24$.

To count pairs, pull the gcd out first. If $\gcd(a, b) = 6$ and $\operatorname{lcm}(a, b) = 210$, write $a = 6m$ and $b = 6n$ with $\gcd(m, n) = 1$. Then $$\operatorname{lcm}(a, b) = 6mn = 210, \qquad mn = 35.$$ Since $m$ and $n$ share no prime, each prime of $35$ goes entirely to one of them, which gives $2^2 = 4$ ordered pairs, $(m, n) = (1, 35), (5, 7), (7, 5), (35, 1)$. In general a number with $k$ distinct prime factors splits into $2^k$ ordered coprime pairs.

Harder conditions are handled the same way, one prime at a time, with the exponents of each prime treated as a separate small problem.

## On contests
Ten problems here, nine of them AIME, and two solved by it alone. The AIME form is a count of pairs or triples: conditions on gcds and lcms become conditions on exponents, handled prime by prime, often alongside [[exponent-tracking|tracking exponents]]. The identity itself is the AMC form. The common error is applying it to three numbers.
`,

"euclidean-algorithm": String.raw`
## Why it works
Replacing $a$ by $a - qb$ keeps exactly the same common divisors, so it keeps the gcd, while the numbers shrink until the answer can be read off.

If $d$ divides both $a$ and $b$, it divides $a - qb$ for any integer $q$. Conversely, if $d$ divides both $b$ and $a - qb$, it divides $(a - qb) + qb = a$. So the pairs $(a, b)$ and $(b, a - qb)$ have exactly the same common divisors, and in particular the same greatest one. Choosing $q$ so that $a - qb$ is the remainder $r$, with $0 \le r \lt b$, gives $$\gcd(a, b) = \gcd(b, r).$$

Each step replaces the pair with a smaller one, because the remainder is less than $b$, so the process must stop, and it stops when a remainder is $0$. The last pair is $(d, 0)$, and $\gcd(d, 0) = d$, so the last nonzero remainder is the gcd.

A rectangle shows the same steps. Cut as many $b \times b$ squares as possible off an $a \times b$ rectangle; what is left is a $b \times r$ strip, and cutting squares off that strip is the next step. The last square size fills its strip exactly, and every earlier piece is made of squares and strips that it fills too, so it measures both $a$ and $b$.

{{figure:tiling}}

## How to use it
For numbers, run the divisions: $$\gcd(252, 105) = \gcd(105, 42) = \gcd(42, 21) = \gcd(21, 0) = 21.$$

For expressions, the power is that any multiple of one may be subtracted from the other. For $\gcd(2n + 1, 5n + 2)$, subtract twice the first from the second to get $\gcd(2n + 1, n)$, then twice that from the first to get $\gcd(1, n) = 1$. So $\frac{2n + 1}{5n + 2}$ is always in lowest terms.

When the reduction ends at a constant instead, the gcd can only be a divisor of that constant. $\gcd(n + 3, n^2 + 7) = \gcd(n + 3, 16)$, because $n^2 + 7 = (n + 3)(n - 3) + 16$, so the two share a factor exactly when $n + 3$ is even, that is, when $n$ is odd.

Running the steps backwards writes the gcd as a combination. From $252 = 2 \cdot 105 + 42$ and $105 = 2 \cdot 42 + 21$, substitute upward: $$21 = 105 - 2 \cdot 42 = 105 - 2(252 - 2 \cdot 105) = 5 \cdot 105 - 2 \cdot 252.$$ That is [[bezouts-identity|Bézout's Identity]] made concrete.

## On contests
Eleven problems here, nine of them AIME, and two solved by it alone. The recurring type asks for how many $n$ a fraction $\frac{f(n)}{g(n)}$ is not in lowest terms: run the algorithm on the expressions, find the constant it ends at, and count the $n$ that share a factor with it. It also appears next to [[modular-basics|modular arithmetic]], since $\gcd(a, m) = 1$ is exactly the condition for $a$ to have an inverse mod $m$.
`,

"bezouts-identity": String.raw`## Why it works
The set of integer combinations $ax + by$ is closed under subtraction, so it consists of all multiples of its least positive element — which must be $\gcd(a,b)$ (it divides both; both divide into it via the [[euclidean-algorithm|Euclidean algorithm]] run backwards).

## How to use it
Solvability test for $ax + by = c$: check $\gcd(a,b) \mid c$. One solution comes from back-substituting the Euclidean algorithm; all others differ by multiples of $\left(\frac{b}{g}, -\frac{a}{g}\right)$. Nonnegative-solution questions layer the Chicken McNugget bound on top.

## On contests
Word problems ("stamps of 5¢ and 8¢..."), constructing modular inverses (solve $ax \equiv 1$), and existence arguments. The "consecutive solutions differ by $\frac{b}{g}$" fact answers "smallest positive $x$" questions.`,

"divisibility-rules": String.raw`
## Why it works
A number is a sum of its digits times powers of $10$, so its remainder depends only on the remainders of those powers, and for small moduli those remainders are very simple.

The two most useful facts are $$10 \equiv 1 \pmod 9, \qquad 10 \equiv -1 \pmod{11}.$$ The first makes every power of $10$ equal to $1$ mod $9$, so a number and its digit sum leave the same remainder mod $9$, and therefore mod $3$. The second makes the powers of $10$ alternate between $1$ and $-1$ mod $11$, so a number leaves the same remainder mod $11$ as the alternating sum of its digits, taken from the right.

Since $100$ is divisible by $4$ and $1000$ by $8$, everything but the last two or three digits is a multiple of $4$ or $8$.

For example, $8712 = 8 \cdot 1000 + 7 \cdot 100 + 1 \cdot 10 + 2$. Its digit sum is $18$, a multiple of $9$, and its alternating sum from the right is $2 - 1 + 7 - 8 = 0$, a multiple of $11$, so $8712$ is divisible by both.

The rule for $11$ is the first of a family. Reading the digits in blocks of $k$ from the right writes the number in base $10^k$, and $$10^k \equiv -1 \pmod{10^k + 1},$$ so the blocks alternate in sign: two-digit blocks for $101$, three-digit blocks for $1001 = 7 \cdot 11 \cdot 13$, four-digit blocks for $10001 = 73 \cdot 137$.

{{figure:blocks}}

Plain block sums do the same for $10^k - 1$, where $10^k \equiv 1$: two-digit blocks give the remainder mod $99$, and three-digit blocks the remainder mod $999 = 27 \cdot 37$, which is the quick test for $37$. Every factor of the modulus inherits its rule, which is how $1001$ tests for $7$ and $13$.

## How to use it
For a composite modulus, [[crt|split it into coprime pieces]] and test each: divisible by $72$ means divisible by $8$, checked on the last three digits, and by $9$, checked on the digit sum. In a missing-digit puzzle each rule becomes a linear condition on the unknown digits, which usually leaves one or two possibilities.

The digit sum gives the remainder itself, which makes it a check on arithmetic, called casting out nines. Since $n \equiv s(n) \pmod 9$ for every $n$, a product must satisfy $s(ab) \equiv s(a)\,s(b) \pmod 9$, and a computed product that fails this is wrong.

Summing the digits again and again ends at a single digit, the digital root, $$1 + \big((n - 1) \bmod 9\big) \quad \text{for } n \ge 1,$$ so any question about repeated digit sums is a question about $n \bmod 9$. How the digit sum drops when numbers are added is counted by [[digit-sum-carries|carries]].

The $1001$ factorization explains a classic: a six-digit number of the form $\overline{abcabc}$ equals $\overline{abc} \cdot 1001$, so it is always divisible by $7$, $11$, and $13$.

## On contests
Seven problems here, six of them AIME, four solved by it alone; two others split into [[casework-method|cases]] on the possible digits, and one counts multiples in a range. MATHCOUNTS and AMC 10 use the rules for missing-digit puzzles, AIME for conditions on numbers built from digit patterns, and the remainder mod $9$ can cut a search down to one candidate in nine.
`,

"gcd-power-minus-one": String.raw`## Why it works
The Euclidean algorithm lifts to exponents: $\gcd(a^m - 1, a^n - 1) = \gcd(a^{m - n} - 1 \cdot a^n\ldots)$ — concretely, $a^m - 1 \bmod (a^n - 1) = a^{m \bmod n} - 1$, so the exponent undergoes the Euclidean algorithm.

## How to use it
Immediate answers to gcds of repunits and Mersenne-type numbers: $\gcd(2^{100} - 1, 2^{36} - 1) = 2^{\gcd(100,36)} - 1 = 2^4 - 1 = 15$. Also the divisibility criterion $a^m - 1 \mid a^n - 1 \iff m \mid n$.

## On contests
AIME gcd problems with huge exponents are this identity verbatim. Repunit versions (all-1s numbers in base 10) follow with $a = 10$: $\gcd(R_m, R_n) = R_{\gcd(m,n)}$.`,

"consecutive-coprime": String.raw`## Why it works
Any common divisor of $n$ and $n+1$ divides their difference, 1. More generally a common divisor of $n$ and $n + k$ divides $k$.

## How to use it
Coprimality for free: factors of consecutive integers never interact, so $n(n+1)$ being a perfect square forces both factors to be squares (impossible for $n \ge 1$), and similar "spread the primes" arguments. The $k!$ divisibility of $k$ consecutive integers' product is binomial-coefficient integrality.

## On contests
Underpins many "product of consecutive integers is never a power" and simplification arguments; the $\gcd(n, n+k) \mid k$ form limits [[casework-method|casework]] in fraction-reduction problems.`,

"number-of-divisors": String.raw`
## Why it works
A divisor is built by choosing, separately for each prime, how many copies of it to use, and the numbers of choices multiply.

Take $360 = 2^3 \cdot 3^2 \cdot 5$. A divisor of $360$ can use only the primes $2$, $3$, and $5$, and it cannot use more copies of any prime than $360$ has, so it is $$2^a3^b5^c \quad \text{with} \quad 0 \le a \le 3, \ \ 0 \le b \le 2, \ \ 0 \le c \le 1.$$ Every such choice does divide $360$, and different choices give different numbers. So the divisors of $360$ match up exactly with the choices of $(a, b, c)$, and there are $4 \cdot 3 \cdot 2 = 24$ of them.

Each prime offers one more choice than its exponent because leaving the prime out, exponent $0$, is a choice too. That is where every $+1$ comes from.

The perfect-square fact is the same picture read differently. The count $$(e_1 + 1)(e_2 + 1)\cdots(e_k + 1)$$ is odd only if every factor is odd, which means every exponent $e_i$ is even, which is exactly what it means for $n$ to be a perfect square. Pairing gives a second view, worked on [[odd-divisor-count|the odd-divisor-count card]]: divisors come in pairs $m$ and $\frac{n}{m}$, and only $\sqrt{n}$ is its own partner.

## Full proof
Let $n = p_1^{e_1}\cdots p_k^{e_k}$ with the $p_i$ distinct primes. If $m$ divides $n$, every prime dividing $m$ also divides $n$, so $m = p_1^{f_1}\cdots p_k^{f_k}$ for some $f_i \ge 0$. Since $n = m \cdot \frac{n}{m}$ and prime factorization is unique, the exponent of $p_i$ in $n$ is $f_i$ plus the exponent of $p_i$ in $\frac{n}{m}$, so $f_i \le e_i$.

Conversely, if $0 \le f_i \le e_i$ for every $i$, then $\frac{n}{m} = p_1^{e_1 - f_1}\cdots p_k^{e_k - f_k}$ is a whole number, so $m$ divides $n$.

So the rule $(f_1, \ldots, f_k) \mapsto p_1^{f_1}\cdots p_k^{f_k}$ reaches every divisor, and it never sends two different exponent lists to the same number, because factorizations are unique. The divisors are therefore counted by the exponent lists. The $i$th exponent takes one of the $e_i + 1$ values $0, 1, \ldots, e_i$, independently of the others, so by the multiplication principle there are $(e_1 + 1)\cdots(e_k + 1)$ lists.

## How to use it
The skill contests test is running the formula backwards. To find the numbers with exactly $12$ divisors, write $12$ as a product of factors that are each at least $2$: $12$, $6 \cdot 2$, $4 \cdot 3$, and $3 \cdot 2 \cdot 2$. Each product is a list of values of $e_i + 1$, so the numbers with $12$ divisors are exactly those of the forms $p^{11}$, $p^5q$, $p^3q^2$, and $p^2qr$, with $p$, $q$, and $r$ distinct primes.

The formula turns a question about a number into a question about its exponents, which is the whole reason it matters. "How many divisors" needs no divisors listed, and "the smallest number with exactly $k$ divisors" becomes a search over the exponent patterns for $k$, giving the largest exponents to the smallest primes. For $k = 12$ the candidates are $2^{11}$, $2^5 \cdot 3$, $2^3 \cdot 3^2$, and $2^2 \cdot 3 \cdot 5$, and the smallest is $60$.

## On contests
Among the most-tested number-theory facts at every level, and self-contained in 4 of its 32 problems. Its partners are [[modular-basics|modular arithmetic]] and [[casework-method|casework]] (3 each), the usual shape being a divisibility condition that cuts the exponent patterns before the count is taken.

Three shapes recur: smallest number with exactly $k$ divisors, the locker-door problem and its relatives (the answer is always the squares), and divisor-counting a factorial, which needs [[legendres-formula|Legendre's Formula]] first to get the exponents.
`,

"sum-of-divisors": String.raw`
## Why it works
Expanding the product picks one term from each bracket, a power of each prime, and multiplies them. By unique factorization every divisor of $n$ is exactly one such choice, so the expansion lists each divisor once and the product is their sum.

{{figure:grid}}

Each bracket is a geometric series, $$1 + p + \cdots + p^e = \frac{p^{e+1} - 1}{p - 1},$$ which gives the closed form. The same grid with every cell counted as $1$ instead of its value gives the [[number-of-divisors|number of divisors]], $(e_1 + 1) \cdots (e_k + 1)$.

## How to use it
Compute prime by prime: $\sigma(72) = \sigma(2^3)\,\sigma(3^2) = 15 \cdot 13 = 195$. Because the formula is a product over primes, $\sigma(mn) = \sigma(m)\,\sigma(n)$ whenever $m$ and $n$ are coprime.

For a restricted sum, keep only the allowed powers of each prime. The odd divisors drop every positive power of $2$, so their sum is $\sigma$ of the odd part, and the even divisors are the total minus that, as in the example. For the divisors that are multiples of $3$, factor one $3$ out of each.

The divisors pair up as $d$ and $\frac nd$, so the sum of their reciprocals is $\frac{\sigma(n)}{n}$, and $n$ is perfect exactly when that sum is $2$.

## On contests
Two problems here, one AIME and one AMC 12, one solved by it alone. The AMC version compares the sums of the odd and even divisors, which the product formula splits by the power of $2$. The AIME version needs $\sigma(a^n) - 1$ divisible by a fixed number for every $a$, which comes down to the geometric series in each bracket and [[multiplicative-order|multiplicative orders]].
`,

"product-of-divisors": String.raw`
## Why it works
Pair each divisor with its partner and multiply the pairs.

The map $d \mapsto \frac nd$ sends divisors to divisors and undoes itself, so the divisors listed in the order $\frac nd$ are the same divisors again. Multiplying the two lists term by term, $$\left(\prod_{d \mid n} d\right)^2 = \prod_{d \mid n} d \cdot \frac nd = n^{d(n)},$$ so the product is $n^{d(n)/2}$. Squaring first avoids any special case: for a perfect square, $\sqrt n$ is paired with itself, and the formula still holds.

## How to use it
Count the divisors with the divisor-count formula, then halve that for the exponent. For $42 = 2 \cdot 3 \cdot 7$ there are $8$ divisors, so their product is $42^4$.

Problems usually run it backwards. The product of the proper divisors, all but $n$ itself, is $n^{d(n)/2 - 1}$, so for $n \gt 1$ $$n^{d(n)/2 - 1} = n \iff d(n) = 4,$$ which means $n = pq$ or $n = p^3$. Logarithms turn the product into a sum: the logarithms of all the divisors add up to $\frac{d(n)}{2}\log n$.

## On contests
Three problems here, two AIME and one AMC 10, none solved by it alone. Typical questions add the logarithms of all the divisors, which is the logarithm of their product, run the formula backwards to $d(n) = 4$ from a condition on the proper divisors, or ask only for a digit of the product.`,

"eulers-totient": String.raw`
## Why it works
Removing the multiples of each prime factor of $n$ leaves exactly the numbers coprime to $n$, and for different primes the removals are independent.

For a prime power it is a direct count. Among $1, 2, \ldots, p^k$, the numbers that share a factor with $p^k$ are the multiples of $p$, and there are $p^{k-1}$ of them, so $$\varphi(p^k) = p^k - p^{k-1} = p^k\left(1 - \frac1p\right).$$

For other $n$, the [[crt|Chinese Remainder Theorem]] matches each residue mod $mn$ with a pair of residues mod $m$ and mod $n$, and a number is coprime to $mn$ exactly when it is coprime to both. So for coprime $m$ and $n$, $\varphi(mn) = \varphi(m)\varphi(n)$, and multiplying the prime-power values gives $$\varphi(n) = n\prod_{p \mid n}\left(1 - \frac1p\right).$$ The same product comes out of [[pie|inclusion-exclusion]] on the multiples of each prime.

## How to use it
Factor $n$, then multiply $n$ by $1 - \frac1p$ for each distinct prime; the exponents matter only through $n$ itself. For $1000 = 2^3 \cdot 5^3$, $$\varphi(1000) = 1000 \cdot \frac12 \cdot \frac45 = 400.$$

Two facts make good checks: $\varphi(n)$ is even for $n \gt 2$, because $k$ and $n - k$ are coprime to $n$ together, and $\sum_{d \mid n}\varphi(d) = n$.

Inverse questions, such as for which $n$ is $\varphi(n) = 12$, are bounded [[casework-method|casework]]: every prime $p$ dividing $n$ has $p - 1$ dividing $\varphi(n)$, which leaves only a few primes to try.

## On contests
Three problems here, all AIME, one solved by it alone. Typical questions count the fractions in lowest terms whose numerator and denominator add to a given $n$, which is $\frac{\varphi(n)}{2}$, count star polygons by the step sizes coprime to the number of points, or add up the [[coprime-residue-sum|coprime residues]] below a bound.`,

"totient-divisor-sum": String.raw`## Why it works
Classify $k \in \{1..n\}$ by $g = \gcd(k, n)$: the $k$ with $\gcd(k,n) = g$ correspond bijectively to reduced residues mod $\frac{n}{g}$, so there are $\varphi(\frac{n}{g})$ of them. Summing the class sizes over all divisors gives $n$.

## How to use it
The classification idea (group by gcd) is itself the tool: sums like $\sum_{k=1}^{n} \gcd(k, n)$ evaluate as $\sum_{d\mid n} d\,\varphi(\frac{n}{d})$. Also the standard lemma when counting fractions with bounded denominators (Farey counts).

## On contests
AIME gcd-sum problems are exactly this regrouping. Knowing the identity signals the decomposition even when the final formula isn't quoted.`,

"mobius-inversion": String.raw`## Why it works
The key lemma: $\sum_{d \mid n}\mu(d)$ is 1 for $n = 1$ and 0 otherwise (choose a prime and pair subsets with/without it — signs cancel). Inversion is then a double-sum swap.

## How to use it
Contest-level use is almost always the lemma in inclusion-exclusion clothing: count objects with gcd exactly 1 by counting multiples ("gcd divisible by $d$") and combining with $\mu(d)$ signs — squarefree counts, coprime pair counts, primitive (aperiodic) strings, and necklaces.

## On contests
"How many of $1..10^6$ are squarefree," "count coprime pairs," "aperiodic binary strings of length 12" — all $\mu$-weighted sums over divisors. Recognize inclusion-exclusion over primes and reach for $\mu$ notation to organize it.`,

"multiplicative-functions": String.raw`## Why it works
[[crt|CRT]]: for coprime $m, n$, residues mod $mn$ pair with residue pairs mod $m$ and $n$, and the relevant structures (divisors, coprime residues) factor along the pairing.

## How to use it
License to compute prime-power by prime-power: evaluate $f(p^e)$ for each prime power in the factorization, multiply. Also a proof pattern: to verify an identity between multiplicative functions, check it on prime powers only.

## On contests
The silent workhorse — most divisor/totient computations implicitly use it. Stated problems test the warning: multiplicativity needs coprimality ($\varphi(4) \ne \varphi(2)\varphi(2)$).`,

"coprime-residue-sum": String.raw`## Why it works
If $\gcd(k, n) = 1$ then $\gcd(n - k, n) = 1$: totatives pair off summing to $n$ each, and there are $\frac{\varphi(n)}{2}$ pairs for $n > 2$ (no self-pairing since $\gcd(\frac{n}{2}, n) > 1$).

## How to use it
Instant evaluation of totative sums, and the pairing idea generalizes: sums of any symmetric function over totatives can exploit $k \leftrightarrow n - k$. Average totative is $\frac{n}{2}$ — occasionally the slicker phrasing.

## On contests
Appears inside AIME fraction-sum problems (sum of all reduced $\frac{k}{n}$ equals $\frac{\varphi(n)}{2}$) and as a lemma in bigger counting arguments.`,

"perfect-square-divisors": String.raw`
## Why it works
A divisor of $n$ is $\prod p_i^{f_i}$ with $0 \le f_i \le e_i$, and it is a perfect square exactly when every $f_i$ is even, since its square root is then $\prod p_i^{f_i/2}$.

The even numbers from $0$ to $e_i$ are $0, 2, \ldots, 2\left\lfloor \frac{e_i}{2} \right\rfloor$, which is $\left\lfloor \frac{e_i}{2} \right\rfloor + 1$ choices, and the choices for different primes are independent, so $$\#\{\text{square divisors}\} = \prod_i \left(\left\lfloor \frac{e_i}{2} \right\rfloor + 1\right).$$

## How to use it
Factor first; for a factorial, [[legendres-formula|Legendre's Formula]] gives the exponents. For $12! = 2^{10} \cdot 3^5 \cdot 5^2 \cdot 7 \cdot 11$, $$6 \cdot 3 \cdot 2 \cdot 1 \cdot 1 = 36$$ divisors are perfect squares. The divisors that are not squares follow by [[complementary-counting|complementary counting]], $d(n)$ minus this.

A related question asks what to multiply by to make a square. Every prime at an odd power must be fixed, so the smallest multiplier is the product of those primes: for $12!$ it is $3 \cdot 7 \cdot 11 = 231$.

## On contests
Three problems here, two AIME and one AMC 10, one solved by it alone. Typical questions clear the odd exponents to make a quotient or a product a perfect square, count the $m$ with $m^2$ dividing a given number, or track which primes of a product of factorials sit at odd powers.`,

"lcm-pair-counting": String.raw`## Why it works
Fix a prime $p$ with target exponent $e$: the pair's exponents $(x, y)$ must satisfy $\max(x,y) = e$, giving $2e + 1$ ordered choices ($x = e$ with $y$ free, or symmetric, minus the double count). Primes act independently.

## How to use it
The general method outranks the formula: translate every gcd/lcm condition into per-prime min/max conditions on exponent tuples, count tuples per prime, multiply. Systems (three variables, three pairwise lcms) become small combinatorial counts per prime. It is the counting form of [[gcd-lcm-product|gcd–lcm product]]: the identity $\min + \max = e + f$ is what lets each prime be handled independently.

## On contests
The AIME classic "how many ordered triples have $[x,y] = 1000$, $[y,z] = 2000$, $[z,x] = 2000$" is solved exactly this way (answer 70). Any lcm-constrained counting should trigger the per-prime reflex.`,

"fermats-little-theorem": String.raw`
## Why it works
Multiplying by $a$ just reorders the nonzero remainders mod $p$, and comparing the product of the remainders before and after gives the theorem.

The numbers $a, 2a, \ldots, (p - 1)a$ are all nonzero mod $p$, because the prime $p$ divides neither factor, and they are all different, because $ia \equiv ja$ would mean $p \mid (i - j)a$ and so $p \mid i - j$, which forces $i = j$. So they are $1, 2, \ldots, p - 1$ in some order.

{{figure:shuffle}}

Multiplying each list together, $a^{p-1}(p - 1)! \equiv (p - 1)! \pmod p$. The factorial is not divisible by $p$, so it can be cancelled, which leaves $a^{p-1} \equiv 1$. Multiplying by $a$ gives $a^p \equiv a$, and that form also holds when $p \mid a$, since then both sides are $0$. Another proof inducts on $a$ using the [[freshmans-dream|freshman's dream]] $(x + 1)^p \equiv x^p + 1$.

## How to use it
Reduce the exponent mod $p - 1$ when the base is coprime to $p$: for $2^{100} \bmod 7$, $100 \equiv 4 \pmod 6$, so the answer is $2^4 = 16 \equiv 2$. The true period can be shorter than $p - 1$, and here $2^3 \equiv 1$ already; that period, the [[multiplicative-order|multiplicative order]], always divides $p - 1$.

For towers, reduce level by level: the top exponent matters mod $p - 1$, so the exponent above it matters mod $\varphi(p - 1)$ by Euler's Theorem, and so on down. For a composite modulus, split it into prime powers, work in each, and recombine with the Chinese Remainder Theorem; for mod $1000$, work mod $8$ and mod $125$.

## On contests
Seven problems here, all AIME, none by it alone; three continue into the multiplicative order, the exact period that divides $p - 1$, and two combine it with the [[binomial-theorem|Binomial Theorem]] to expand a power before reducing it. Watch the hypothesis $p \nmid a$, and use $a^p \equiv a$ when unsure.
`,

"eulers-theorem": String.raw`
## Why it works
Multiplying by $a$ shuffles the residues that are coprime to $n$, and comparing their product before and after the shuffle gives the theorem.

Let $r_1, \ldots, r_k$ be the $k = \varphi(n)$ residues coprime to $n$. The numbers $ar_1, \ldots, ar_k$ are also coprime to $n$, and they are all different mod $n$, since $ar_i \equiv ar_j$ would let us cancel the invertible $a$. So they are the same residues in a new order, and $$a^k\,r_1 \cdots r_k \equiv r_1 \cdots r_k \pmod n.$$ The product $r_1 \cdots r_k$ is coprime to $n$, so it cancels, leaving $a^{\varphi(n)} \equiv 1$. For a prime $n$ this is exactly Fermat's argument.

## How to use it
Reduce the exponent modulo $\varphi(n)$, but only when $\gcd(a, n) = 1$. For the last two digits of $3^{100}$, $\varphi(100) = 40$, so $3^{100} \equiv 3^{20}$, and $$3^{20} = (3^{10})^2 \equiv 49^2 = 2401 \equiv 1 \pmod{100}.$$

When $a$ shares a factor with $n$, as for the last digits of $4^{100}$, split the modulus with [[crt|the Chinese Remainder Theorem]] into a part sharing factors with $a$, where the powers quickly become $0$, and a coprime part, where Euler applies. For the last three digits, working mod $8$ and mod $125$, with $\varphi(125) = 100$, is usually cleaner than mod $1000$ directly.

## On contests
Four problems here, split between AMC and AIME, none by it alone; two combine it with the Chinese Remainder Theorem, its standard partner for last-digit questions. A tower of exponents reduces down a chain of $\varphi$ values, $1000 \to 400 \to 160 \to \cdots$, one level at a time.
`,

"wilsons-theorem": String.raw`## Why it works
In the product $(p-1)!$, every residue pairs with its inverse and cancels to 1 — except the self-inverse ones, $1$ and $p - 1$, whose product is $-1$. Compositeness converse: a shared factor makes $(n-1)! \equiv 0$ (for $n > 4$).

## How to use it
Factorial congruences mod primes: shift with $(p-2)! \equiv 1$, $(p-3)! \equiv \frac{p-1}{2}\cdot$(adjust), and split $(p-1)!$ into halves to get $\left(\frac{p-1}{2}\right)!^2 \equiv (-1)^{\frac{p+1}{2}}$ — the source of square roots of $-1$ mod $p \equiv 1 \pmod 4$.

## On contests
AIME factorial-remainder problems and slick primality observations. The half-factorial corollary explicitly constructs $x$ with $x^2 \equiv -1$, which some problems require.`,

"crt": String.raw`
## Why it works
Coprime moduli measure independent things, so knowing the remainders modulo each of them pins down the remainder modulo their product, and every combination of remainders actually happens.

Take the moduli $3$ and $5$. Each of the numbers $0$ to $14$ leaves a pair of remainders, one modulo $3$ and one modulo $5$. Two different numbers in that range cannot leave the same pair: if they did, their difference would be divisible by both $3$ and $5$, $$3 \mid a - b \ \text{ and } \ 5 \mid a - b \quad \Longrightarrow \quad 15 \mid a - b,$$ which is impossible for two different numbers less than $15$ apart.

So the $15$ numbers give $15$ different pairs, and since there are exactly $3 \cdot 5 = 15$ possible pairs, every pair occurs exactly once. That is the theorem for $3$ and $5$: each system has exactly one solution modulo $15$.

The same count works for any pairwise coprime moduli, because a number divisible by each of them is divisible by their product. Coprimality is exactly what that step needs. Modulo $4$ and $6$ the numbers $0$ and $12$ leave the same remainders, and the system $$x \equiv 1 \pmod 4, \qquad x \equiv 2 \pmod 6$$ has no solution at all, since the first makes $x$ odd and the second makes it even.

## Full proof
Let $N = n_1n_2\cdots n_k$ with the $n_i$ pairwise coprime.

Uniqueness. If $x$ and $y$ both solve the system, then every $n_i$ divides $x - y$. Since the $n_i$ are pairwise coprime, their least common multiple is their product $N$, so $N$ divides $x - y$ and $x \equiv y \pmod N$.

Existence, by construction. Let $N_i = \frac{N}{n_i}$, which is coprime to $n_i$, so it has an inverse $M_i$ modulo $n_i$. Then $x = \sum_i a_iN_iM_i$ solves the system: modulo $n_i$, every term except the $i$th contains the factor $n_i$ and vanishes, while the $i$th term is $a_i \cdot N_iM_i \equiv a_i \cdot 1 = a_i$.

## How to use it
Splitting is the everyday use: a question modulo $1000$ becomes one modulo $8$ and one modulo $125$, answered separately and recombined. Counts multiply too: for coprime $m$ and $n$, the number of solutions of a congruence modulo $mn$ is the number modulo $m$ times the number modulo $n$.

To recombine, it is usually fastest to work two congruences at a time: from $x \equiv a \pmod m$ write $x = a + mt$, substitute into the next congruence, and solve for $t$.

For $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$, $x = 2 + 3t$ needs $3t \equiv 1 \pmod 5$, so $t \equiv 2$ and $x \equiv 8 \pmod{15}$; adding $x \equiv 2 \pmod 7$ then gives $x \equiv 23 \pmod{105}$.

The closed form from the full proof, $x = \sum_i a_iN_iM_i$, does it in one step when there are many moduli.

## On contests
The standard move for "find the remainder modulo a composite", and the reason prime-power analysis is the default first step in olympiad number theory. Of the 17 problems tagged here, 16 are AIME and 3 need nothing else; its partners are [[modular-basics|the congruence rules]] (3) and [[eulers-theorem|Euler's Theorem]] (2), which do the work inside each prime-power piece before the theorem recombines them. Splitting modulo $1000$ into $8$ and $125$ is the most common instance.
`,

"multiplicative-order": String.raw`
## Why it works
The powers of $a$ modulo $n$ repeat with period exactly the order $d$, so $a^m \equiv 1$ happens exactly when $m$ is a multiple of $d$.

Write $m = qd + r$ with $0 \le r \lt d$. Then $a^m = (a^d)^qa^r \equiv a^r$, and since $d$ is the smallest positive exponent giving $1$, $a^r \equiv 1$ only when $r = 0$. So $a^m \equiv 1$ exactly when $d \mid m$. By [[eulers-theorem|Euler's Theorem]] $a^{\varphi(n)} \equiv 1$, so $d$ divides $\varphi(n)$.

There is also a picture of why the order divides $\varphi(n)$: multiplying by $a$ splits the $\varphi(n)$ residues coprime to $n$ into cycles, and every cycle has the same length $d$.

{{figure:cycles}}

## How to use it
To find an order, test only the divisors of $\varphi(n)$, from small to large. For $2$ modulo $7$, $\varphi(7) = 6$, and $2^1 = 2$, $2^2 = 4$, $2^3 = 8 \equiv 1$, so the order is $3$.

Exponents can then be reduced modulo the order: $a^i \equiv a^j$ exactly when $i \equiv j \pmod d$. Questions like "the smallest $k$ with $n \mid a^k - 1$" and "the period of $\frac1n$" are order computations. For orders modulo prime powers, such as that of $2$ modulo $3^m$, the [[lte-lemma|Lifting the Exponent Lemma]] takes over.

## On contests
Five problems here, all AIME, none by it alone; three pair it with [[fermats-little-theorem|Fermat's Little Theorem]], which supplies an exponent the order must divide. AIME favors fractions $\frac1n$ with a prescribed period and divisibility chains like $2^k \equiv 1 \pmod{3^m}$.
`,

"modular-inverse": String.raw`## Why it works
[[bezouts-identity|Bézout]]: $\gcd(a, n) = 1$ gives $ax + ny = 1$, i.e. $ax \equiv 1$. Uniqueness mod $n$ follows from cancellation.

## How to use it
Small moduli: hunt by inspection or add the modulus to the numerator until divisible. Larger: extended Euclid, or Euler's $a^{\varphi(n)-1}$. Every "division" in modular arithmetic is multiplication by an inverse — needed for [[crt|CRT]] recombination, solving linear congruences, and evaluating fractions like $\frac{1}{2} \pmod p$ (which means $\frac{p+1}{2}$).

## On contests
Ubiquitous supporting skill: binomial coefficients mod $p$, linear congruence solving, and AIME answers defined as $m n^{-1}$ mod a prime. Fast small-case fluency matters more than the theory.`,


"squares-mod-small": String.raw`## Why it works
Square all residues: mod 4 the squares of $0,1,2,3$ are $0,1,0,1$; mod 8 odd squares are $(2k+1)^2 = 4k(k+1) + 1 \equiv 1$ (since $k(k+1)$ is even); mod 9 and 16 by the same enumeration.

## How to use it
First move on any "show no solutions" Diophantine: reduce mod 4, 8, 9, or 16 and compare residue menus. Sums of squares: $a^2 + b^2 \not\equiv 3 \pmod 4$; three odd squares can't sum to $\equiv 6 \pmod 8$; etc. Also fixes parities: $x^2 \equiv 1 \pmod 8$ for odd $x$ is remarkably often the key.

## On contests
AMC/AIME impossibility questions and digit puzzles ("can $\overline{abc}$ be a perfect square if..."). Squares end in $\{0,1,4,5,6,9\}$ and mod-4 analysis kills most wrong candidates fast.`,

"eulers-criterion": String.raw`## Why it works
The multiplicative group mod $p$ is cyclic of order $p-1$: writing $a = g^k$, $a^{\frac{p-1}{2}} = g^{k\frac{p-1}{2}} = (\pm1)$ according to the parity of $k$ — even $k$ means square.

## How to use it
Decides quadratic residuosity by one modular exponentiation. The headline corollary: $-1$ is a QR mod $p$ iff $p \equiv 1 \pmod 4$ — equivalently, $p \mid x^2 + 1$ has solutions only for such $p$ (and 2). Similar criteria: $2$ is a QR iff $p \equiv \pm1 \pmod 8$. It is the computational test behind [[squares-mod-small|quadratic residues]], and [[gauss-lemma-qr|Gauss's Lemma]] is the counting proof of the same fact.

## On contests
Divisibility problems about $x^2 + 1$ (its odd prime factors are all $\equiv 1 \bmod 4$ — a strong structural fact), and residue-existence questions on AIME. Full reciprocity is rarely needed; these special cases usually suffice.`,

"last-digit-patterns": String.raw`
## Why it works
The units digit of a product depends only on the units digits of its factors, so the units digit of $n^2$ is the units digit of $d^2$, where $d$ is the last digit of $n$. Squaring the ten digits gives endings $0, 1, 4, 9, 6, 5, 6, 9, 4, 1$, and $2$, $3$, $7$, and $8$ never appear.

Cubes modulo $9$ work the same way, with $n \equiv 0, \pm1, \pm2, \pm3, \pm4 \pmod 9$: $$(\pm1)^3 = \pm1, \quad (\pm2)^3 = \pm8 \equiv \mp1, \quad (\pm3)^3 \equiv 0, \quad (\pm4)^3 = \pm64 \equiv \pm1,$$ so every cube is $0$ or $\pm1$ modulo $9$.

The powers of each digit cycle because there are only ten possible endings: $$2, 4, 8, 6; \qquad 3, 9, 7, 1; \qquad 7, 9, 3, 1; \qquad 8, 4, 2, 6,$$ with $4$ and $9$ alternating and $0$, $1$, $5$, $6$ fixed. Every period divides $4$.

## How to use it
For the units digit of $a^k$, reduce $k$ modulo $4$ and read the cycle, remembering that $k \equiv 0$ means the fourth entry, not a zeroth one: $7^{2027}$ ends in $3$, because $2027 \equiv 3 \pmod 4$.

To reject a claimed square, check its last digit; to reject a claimed cube, check its digit sum modulo $9$, which equals the number modulo $9$ by the [[divisibility-rules|digit-sum rule]]. For the last two or three digits, work modulo $100$ or $1000$ with [[eulers-theorem|Euler's Theorem]] and the [[crt|Chinese Remainder Theorem]]; squares modulo other small numbers are on [[squares-mod-small|squares mod small numbers]].

## On contests
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version adds the units digits of two large powers, each read off its cycle; the AIME version sums a units-digit sequence over many terms, where the pattern repeats and [[periodicity-mod-m|periodicity]] does the rest.
`,

"primitive-roots": String.raw`## Why it works
The units mod $n$ form a cyclic group exactly for $n=1,2,4,p^k,2p^k$ (odd prime $p$) — the structure theorem. A primitive root $g$ is a generator: its powers $g^0,\dots,g^{\varphi(n)-1}$ run through all units, the number of primitive roots is $\varphi(\varphi(n))$, and the order of any element divides $\varphi(n)$ with a primitive root hitting the maximum.

## How to use it
Convert multiplicative questions to additive ones — counting $k$-th powers, solving $x^k\equiv a$, products or sums over all residues. Worked case mod $7$ with $g=3$ (powers $3,2,6,4,5,1$): the cubes have $\gcd(3,6)=3$, so there are $\frac{6}{3}=2$ cubic residues, namely $g^0=1$ and $g^3=6$.

Fixing $g$ turns multiplication into addition of exponents (the "index," a discrete log): $a=g^{\operatorname{ind}a}$, so $xy$ maps to $\operatorname{ind}x+\operatorname{ind}y\pmod{\varphi(n)}$. For $k$-th powers modulo a prime $p$, with $d=\gcd(k,p-1)$:

- Number of primitive roots: $\varphi(\varphi(n))$
- Number of $k$-th power residues: $\frac{p-1}{d}$
- $x^k\equiv a\pmod p$ is solvable iff $a^{(p-1)/d}\equiv1\pmod p$
- When solvable, it has exactly $d$ solutions

## On contests
AIME problems counting solutions of $x^k\equiv1$, asking for products over all residues, or exploiting that orders divide $p-1$ lean on this cyclic structure — usually implicitly.`,

"quadratic-reciprocity": String.raw`## Why it works
Deep — Gauss gave eight proofs, the classic elementary one counting lattice points in a rectangle. Take it as a tool: for distinct odd primes, $\left(\frac{p}{q}\right)$ and $\left(\frac{q}{p}\right)$ are equal unless both are $\equiv 3\pmod 4$, in which case they differ by a sign.

## How to use it
Evaluate a Legendre symbol like a gcd: factor the top, pull out $-1$ and $2$ with the supplements, flip the odd-prime factors (sign per reciprocity), reduce mod the bottom, repeat. Worked: $\left(\frac{30}{53}\right)=\left(\frac{2}{53}\right)\left(\frac{3}{53}\right)\left(\frac{5}{53}\right)$. Since $53\equiv5\bmod8$, $\left(\frac{2}{53}\right)=-1$; and $53\equiv1\bmod4$ so flips carry no sign: $\left(\frac{3}{53}\right)=\left(\frac{53}{3}\right)=\left(\frac{2}{3}\right)=-1$ and $\left(\frac{5}{53}\right)=\left(\frac{53}{5}\right)=\left(\frac{3}{5}\right)=-1$. Product $-1$: $30$ is a non-residue mod $53$.

## On contests
Rare on AIME (the supplements cover most needs) but decisive when a problem asks which primes divide values of a quadratic, or whether $x^2\equiv a$ is solvable. Knowing the two supplements cold is the practical takeaway.`,

"crt-solution-counting": String.raw`## Why it works
[[crt|CRT]]'s bijection respects polynomial equations: $f(x) \equiv 0 \pmod{mn}$ (coprime $m, n$) holds iff it holds mod $m$ and mod $n$ separately, and solutions pair off. So solution counts multiply.

## How to use it
Count solutions of a congruence mod each prime power in the modulus, multiply. E.g. $x^2 \equiv 1 \pmod{105}$: two solutions mod each of 3, 5, 7 → $2^3 = 8$ total. Explains why $x^2 \equiv 1$ can have many roots mod composites — non-fields allow it.

## On contests
"How many $x$ mod $n$ satisfy $x^2 \equiv x$" (idempotents: $2^{\#\text{prime factors}}$) and similar counts appear on AIME; the multiply-across-prime-powers reflex is the whole technique.`,

"lte-lemma": String.raw`
## Key forms
- $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$ — $p$ an odd prime dividing $a - b$ but neither $a$ nor $b$
- $v_p(a^n + b^n) = v_p(a + b) + v_p(n)$ — $p$ an odd prime dividing $a + b$ but neither $a$ nor $b$, and $n$ odd
- $v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1$ — $a$ and $b$ odd, $n$ even
- $v_2(a^n - b^n) = v_2(a - b)$ — $a$ and $b$ odd, $n$ odd

## Conditions
Each hypothesis is needed. The prime must divide $a - b$: for $p = 3$, $a = 2$, $b = 1$, and $n = 2$, the formula would give $v_3(1) + v_3(2) = 0$, but $v_3(2^2 - 1) = 1$. If $p$ divides both $a$ and $b$, divide out the common power first. And the odd-prime form fails at $p = 2$: $v_2(3^2 - 1) = v_2(8) = 3$, while $v_2(3 - 1) + v_2(2) = 2$.

## Why it works
Here $v_p(m)$ is the [[p-adic-valuation|p-adic valuation]] of $m$, the exponent of $p$ in it. Factor $$a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}),$$ so the question is how many factors of $p$ the second factor adds. Two cases cover every $n$, since $n$ is a power of $p$ times a number coprime to $p$.

If $p \nmid n$: since $a \equiv b \pmod p$, each of the $n$ terms of the second factor is $\equiv a^{n-1}$, so the factor is $\equiv na^{n-1} \not\equiv 0 \pmod p$ and adds nothing.

If $n = p$: write $a = b + t$ with $p \mid t$. To first order in $t$, the $k$th term $a^{p-1-k}b^k$ is $b^{p-1} + (p-1-k)b^{p-2}t$, and every term of order $t^2$ is divisible by $p^2$. Summing over $k = 0, 1, \ldots, p - 1$ gives $$pb^{p-1} + \frac{p(p-1)}{2}\,b^{p-2}t \pmod{p^2}.$$

For odd $p$ the second term is divisible by $p^2$, since $\frac{p-1}{2}$ is an integer and $p \mid t$, so the factor is $\equiv pb^{p-1} \pmod{p^2}$ and adds exactly one factor of $p$. For $p = 2$ the coefficient $\frac{p(p-1)}{2}$ is $1$, which is where the extra terms of the form for $2$ come from.

Applying the case $n = p$ once for each factor of $p$ in $n$, and the coprime case for the rest, adds exactly $v_p(n)$.

## Useful observations
- The case $b = 1$ is the most common: for an odd prime $p$ with $a \equiv 1 \pmod p$, $v_p(a^n - 1) = v_p(a - 1) + v_p(n)$.
- When $p \nmid a - b$, $p$ divides $a^n - b^n$ only if the [[multiplicative-order|multiplicative order]] $d$ of $ab^{-1}$ modulo $p$ divides $n$, and then the lemma applies to $(a^d)^{n/d} - (b^d)^{n/d}$.
- For an odd prime $p$, if $d$ is the order of $a$ modulo $p$ and $p^s$ exactly divides $a^d - 1$, then the order of $a$ modulo $p^k$ is $d \cdot p^{\max(0,\, k - s)}$.

## Applications
Divisibility of $a^n \pm b^n$ by prime powers, the largest power of a prime dividing such a number, and orders of residues modulo prime powers.

## Contest profile
The fact behind a step that would otherwise need the full factorization; inside a number theory problem it is the line that reads a valuation off directly.
`,

"legendres-formula": String.raw`
## Key forms
- $v_p(n!) = \left\lfloor \frac np \right\rfloor + \left\lfloor \frac n{p^2} \right\rfloor + \left\lfloor \frac n{p^3} \right\rfloor + \cdots$ — the sum stops once $p^i \gt n$
- $v_p(n!) = \frac{n - s_p(n)}{p - 1}$ — with $s_p(n)$ the sum of the base-$p$ digits of $n$
- $\left\lfloor \frac{\lfloor n/p^i \rfloor}{p} \right\rfloor = \left\lfloor \frac{n}{p^{i+1}} \right\rfloor$ — each term is the previous one divided by $p$ and rounded down

## Conditions
$p$ is a prime and $n$ a nonnegative integer. For a composite $m$, with $p^{e}$ exactly dividing $m$ for each prime $p$ of $m$, the largest $k$ with $m^k \mid n!$ is the smallest of the numbers $\left\lfloor v_p(n!)/e \right\rfloor$.

## Why it works
Each multiple of $p$ up to $n$ contributes one factor of $p$, each multiple of $p^2$ contributes one more, and so on, and the sum counts them level by level.

The exponent of $p$ in $n!$ is the total of the exponents of $p$ in $1, 2, \ldots, n$. Picture each $k$ with a stack of dots, one for each factor of $p$ in $k$, and count the dots by rows instead of by columns.

The first row has a dot over every multiple of $p$, and there are $\left\lfloor\frac np\right\rfloor$ of them; the second row has a dot over every multiple of $p^2$, and there are $\left\lfloor\frac n{p^2}\right\rfloor$; and so on. Every factor of $p$ is counted exactly once.

{{figure:dots}}

The digit-sum form comes from writing $n = d_0 + d_1p + d_2p^2 + \cdots$ in base $p$. The floor $\left\lfloor \frac n{p^i}\right\rfloor$ is $n$ with its last $i$ digits removed, so the digit $d_j$ appears in the floors for $i = 1, \ldots, j$ with total weight $1 + p + \cdots + p^{j-1} = \frac{p^j - 1}{p - 1}$. Adding over all digits gives $\frac{n - s_p(n)}{p - 1}$.

## Useful observations
- [[trailing-zeros|Trailing zeros]] of $n!$ count $v_5(n!)$, because each zero needs a factor $2$ and a factor $5$, and fives are the scarcer: $100!$ ends in $20 + 4 = 24$ zeros.
- The sum is a short chain of divisions: for the zeros at the end of $2025!$, $2025 \to 405 \to 81 \to 16 \to 3$, and $405 + 81 + 16 + 3 = 505$.
- For binomial coefficients, $v_p\binom nk = v_p(n!) - v_p(k!) - v_p((n - k)!)$, which is also the number of carries when $k$ and $n - k$ are added in base $p$, by [[kummers-theorem|Kummer's Theorem]].
- $v_2(n!) = n - s_2(n) \le n - 1$, with equality exactly when $n$ is a power of $2$.
- The values of $v_p(n!)$ jump by more than $1$ at multiples of $p^2$, so some values are never taken: no factorial ends in exactly $5$ zeros, since $24!$ ends in $4$ and $25!$ in $6$.

## Applications
Divisibility of factorials and binomial coefficients by prime powers, trailing zeros, and the prime factorization of products of consecutive integers.

## Contest profile
Usually the main computation rather than a supporting step, applied to a factorial or a binomial coefficient that a counting argument produced.
`,

"kummers-theorem": String.raw`## Why it works
Write the subtraction $n = k + (n-k)$ in base $p$: each carry in the addition corresponds to one factor of $p$ surviving in $\binom{n}{k}$ — provable by applying [[legendres-formula|Legendre's]] digit-sum form to all three factorials.

## How to use it
When Legendre-subtraction is messy, count carries instead: $v_2\binom{2n}{n}$ = number of 1s in binary $n$ (adding $n + n$ carries at every 1-bit). Divisibility questions about central binomials and [[catalan-numbers|Catalan numbers]] route through this.

## On contests
"For how many $n \le 1000$ is $\binom{2n}{n}$ odd" — never, for $n \ge 1$ (always a carry); "$\binom{2n}{n}$ not divisible by 4" — $n$ a power of 2. These carry-counting one-liners appear on AIME and Putnam-lite sets.`,

"lucas-theorem": String.raw`## Why it works
$(1+x)^{p^i} \equiv 1 + x^{p^i} \pmod p$ ([[freshmans-dream|freshman's dream]]); expanding $(1+x)^m$ over the base-$p$ digits of $m$ and matching coefficients digit-wise gives the product formula.

## How to use it
$\binom{m}{n} \bmod p$: write both in base $p$, multiply digit binomials (any digit of $n$ exceeding $m$'s gives 0). Parity special case: $\binom{m}{n}$ odd iff $n$'s binary 1s sit inside $m$'s — so row $m$ of Pascal's triangle has $2^{s_2(m)}$ odd entries.

## On contests
Pascal-parity questions (Sierpinski patterns), "how many $\binom{2027}{k}$ are divisible by small prime," and fast binomial-mod-p evaluations on AIME. For prime-power moduli, combine with more careful tools — Lucas alone is mod $p$ only.`,

"lte": String.raw`
## When to use
Exponent questions about a huge difference or sum of powers: the largest power of $3$ dividing $4^{729} - 1$, or the least $n$ for which $p^k$ divides $a^n - 1$. It is quickest when $p$ already divides $a - b$; when it does not, first find the smallest exponent that brings $p$ in, then lift from there. For $p = 2$ use the form for an even exponent, which adds $v_2(a + b) - 1$.

## How
1. Write the expression as $a^n - b^n$, or as $a^n + b^n$ with $n$ odd; a plain $a^n - 1$ has $b = 1$.
2. Check the hypotheses: $p$ divides $a - b$ (or $a + b$) but neither $a$ nor $b$, and $p$ is odd; for $p = 2$ use the separate form.
3. If $p$ does not divide $a - b$, find the smallest $d$ with $p \mid a^d - b^d$; then $p$ divides $a^n - b^n$ only when $d \mid n$, and the lemma applies to $(a^d)^{n/d} - (b^d)^{n/d}$.
4. Add $v_p(a - b)$ and $v_p(n)$, with the extra terms of the form for $2$.

## Why it works
Valuations turn products into sums, so the exponent of $p$ in a large number can be found without knowing the number. The lemma says that raising to the $n$th power adds exactly one factor of $p$ for each factor of $p$ in $n$, and nothing for the part of $n$ coprime to $p$, so the whole computation comes down to two small valuations.

## Formulas it uses
- [[lte-lemma]]: the exponent formula itself, $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$ for an odd prime $p$ dividing $a - b$ but neither $a$ nor $b$; one line then decides most uses, as in $v_3(4^{729} - 1) = v_3(3) + v_3(729) = 1 + 6 = 7$.
- [[p-adic-valuation]]: the language of the answer: $v_p(N)$ is the exponent of $p$ in $N$, and the valuations of a product add.
- [[multiplicative-order]]: for a prime that does not divide $a - b$, it decides whether $p$ divides $a^n - b^n$ at all, which happens exactly when the order of $ab^{-1}$ modulo $p$ divides $n$.

## Common traps
- Using the odd-prime form at $p = 2$: $v_2(3^2 - 1) = 3$, while $v_2(3 - 1) + v_2(2) = 2$.
- Applying the lemma when $p$ does not divide $a - b$; its right side then means nothing.
- Using the sum form for even $n$, which it does not cover.

## Contest profile
Usually the decisive step once it is spotted; the rest of the work is checking hypotheses and, often, an argument about orders.
`,

"primes-6k": String.raw`
## Why it works
Primes above $3$ avoid every residue class that $2$ or $3$ divides.

Modulo $6$ an integer is $0$, $1$, $2$, $3$, $4$, or $5$. The classes $0$, $2$, and $4$ are even, and $3$ is a multiple of $3$, so a prime $p > 3$ can only be $1$ or $5$: $$p \equiv \pm 1 \pmod 6.$$ In the grid below, every prime from $5$ on sits in one of those two columns.

{{figure:grid}}

For the square, factor $p^2 - 1 = (p - 1)(p + 1)$. Since $p$ is odd, $p - 1$ and $p + 1$ are consecutive even numbers, so one of them is a multiple of $4$ and their product is a multiple of $8$. Of the three consecutive integers $p - 1$, $p$, and $p + 1$, one is a multiple of $3$, and it is not $p$. So $$24 = 8 \cdot 3 \mid p^2 - 1.$$

## How to use it
Split an argument about an arbitrary prime $p > 3$ into the two cases $p = 6k + 1$ and $p = 6k - 1$, which is [[casework-method|casework]] with only two branches. Check $p = 2$ and $p = 3$ by hand first, since they are the exceptions.

The squared form answers divisibility questions at once. For $p > 3$, $p^2 + 2 \equiv 3 \pmod{24}$, so $p^2 + 2$ is a multiple of $3$ larger than $3$ and never prime; likewise $p^2 + 23$ is always a multiple of $24$.

The form is a necessary condition only. It rules numbers out quickly (anything even or divisible by $3$), but it never proves a number prime: $25 = 6 \cdot 4 + 1$ and $35 = 6 \cdot 6 - 1$ are composite.

## On contests
No problems here are tagged with it yet. The classic AMC question asks for the largest integer that always divides $p^2 - 1$ for primes $p > 3$ (it is $24$), and twin-prime puzzles use the frame too: twin primes above $3$ are $6k - 1$ and $6k + 1$, so the number between them is a multiple of $6$.
`,

"floor-multiples": String.raw`
## Why it works
The multiples of $d$ are evenly spaced, one in every block of $d$ consecutive numbers, so counting them is division.

The multiples of $d$ up to $n$ are $d, 2d, 3d, \ldots, kd$, where $k$ is the largest whole number with $kd \le n$, and there are exactly $k$ of them. The condition $kd \le n$ says $k \le \frac nd$, so the largest such whole number is $\left\lfloor \frac nd \right\rfloor$. For $n = 100$ and $d = 7$, $\frac{100}{7}$ is about $14.3$, and indeed $$7 \cdot 14 = 98 \le 100 \lt 105 = 7 \cdot 15.$$

The numbers divisible by both $a$ and $b$ are exactly the multiples of $\operatorname{lcm}(a, b)$, which is why that term appears when inclusion-exclusion corrects the double count in "divisible by $a$ or $b$".

## How to use it
Combine with inclusion-exclusion for unions ("divisible by 3 or 5"), complements ("divisible by neither"), and exact conditions ("by 6 but not 9"). This plus [[legendres-formula|Legendre]] covers most "how many numbers up to $N$..." questions. Ranges: count up to $b$, subtract count up to $a - 1$.

## On contests
Constant at MATHCOUNTS and AMC level, with 12 problems tagged here, 3 of them solved by it alone and 3 more with [[casework-method|casework]] on top. It is also the counting engine inside Legendre's Formula, totient computations, and AIME lattice problems.
`,

"prime-divides-binomial": String.raw`## Why it works
$\binom{p}{k} = \frac{p!}{k!(p-k)!}$: the numerator has one factor of $p$, and for $0 \lt  k \lt  p$ neither factorial below can cancel it.

## How to use it
Immediate consequence: the freshman's dream $(x + y)^p \equiv x^p + y^p \pmod p$ — the middle terms vanish. That powers induction proofs of Fermat's Little Theorem and digit-based expansions (Lucas). Also $\binom{p^k}{j} \equiv 0 \pmod p$ for $0 \lt  j \lt  p^k$.

## On contests
Appears as a lemma constantly: binomial expansions mod $p$, showing $p \mid 2^p - 2$, and prime-detection via Pascal's triangle rows (row $p$ is all multiples of $p$ inside).`,

"bertrands-postulate": String.raw`## Why it works
Proved by Chebyshev via binomial-coefficient estimates (Erdős's elementary proof analyzes prime factors of $\binom{2n}{n}$). For contest purposes: cite it.

## How to use it
Guarantees a prime in $(n, 2n)$ — enough for existence arguments ("some prime divides exactly one term"), bounding constructions, and showing $n!$ is never a perfect power for $n \ge 2$ (a prime in $(\frac{n}{2}, n]$ appears to the first power).

## On contests
Olympiad-leaning, but AIME-adjacent problems about primes in ranges or factorial factorizations sometimes want exactly this guarantee.`,

"chicken-mcnugget": String.raw`
## Why it works
Sort the amounts by their remainder mod $a$. Adding an $a$ keeps an amount in its class, so once a class contains one amount that can be made, every larger amount in that class can be made too.

The smallest amount that can be made in each class uses no $a$ at all, so it is one of $0, b, 2b, \ldots, (a - 1)b$. These leave different remainders mod $a$, because $a$ and $b$ are coprime, so there is exactly one in each class.

{{figure:grid}}

The class that starts last begins at $(a - 1)b$, and the amount just before it in that class, $$(a - 1)b - a = ab - a - b,$$ is the largest one that cannot be made. Every class has started by then, so nothing larger is impossible.

For the count, pair each amount $n$ from $0$ to $ab - a - b$ with $ab - a - b - n$. Exactly one of each pair can be made, and there are $\frac{(a - 1)(b - 1)}{2}$ pairs.

## How to use it
Check that $\gcd(a, b) = 1$ first. Otherwise only multiples of the gcd can ever be made, and the theorem applies after dividing through, as [[bezouts-identity|Bézout's Identity]] explains.

To decide which amounts can be made, work one residue class at a time modulo the smaller denomination, as in the figure. With three or more denominations there is no closed formula, and the same class-by-class picture, done by hand, is the way in.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. Typical questions reduce a coin problem to two coprime denominations after a parity or divisibility step, count the attainable values in a bounded range, or run the theorem backwards, finding the denominations that leave a given largest impossible amount.`,

"pythagorean-triples": String.raw`
## Why it works
In a primitive triple $a$ and $b$ cannot both be even, and they cannot both be odd, since then $c^2 = a^2 + b^2 \equiv 2 \pmod 4$, which no square is. So one leg, say $b$, is even, and $c$ is odd.

Then $$b^2 = c^2 - a^2 = (c - a)(c + a),$$ where $c - a$ and $c + a$ are both even and share no other factor. Half of each is then a perfect square, $c + a = 2m^2$ and $c - a = 2n^2$, which gives $a = m^2 - n^2$, $b = 2mn$, and $c = m^2 + n^2$.

Geometrically, a triple is a rational point $\left(\frac ac, \frac bc\right)$ on the unit circle, and the line through $(-1, 0)$ with slope $\frac nm$ meets the circle again at exactly that point.

{{figure:rational}}

## How to use it
To generate triples, run over coprime $m \gt n$ of opposite parity and scale: $(m, n) = (2, 1)$, $(3, 2)$, $(4, 1)$, and $(4, 3)$ give $3$-$4$-$5$, $5$-$12$-$13$, $15$-$8$-$17$ and $7$-$24$-$25$.

To find every right triangle with a given leg $a$, factor $a^2 = (c - b)(c + b)$ and match factor pairs of the same parity, which usually beats the parametrization. For the leg $15$, $$225 = 1 \cdot 225 = 3 \cdot 75 = 5 \cdot 45 = 9 \cdot 25$$ gives the hypotenuses $113$, $39$, $25$, and $17$.

A primitive triangle's inradius is $n(m - n)$, from $r = \frac{a + b - c}{2}$, and for any integer right triangle it is an integer, as on [[right-triangle-inradius|the right-triangle inradius]].

## On contests
Two problems here, one AIME and one AMC 12, neither solved by it alone. Both hide familiar triples, scaled up in the given lengths or as the tangents of angles, and recognizing them turns the geometry into arithmetic; one finishes with the [[angle-addition|angle addition formulas]].
`,

"pell-equation": String.raw`## Why it works
Units in $\mathbb{Z}[\sqrt D]$: if $(x_1, y_1)$ is the smallest solution, every solution is a power $(x_1 + y_1\sqrt D)^k$ because norms multiply ($N(u) = x^2 - Dy^2$ is multiplicative). Continued fractions of $\sqrt D$ find the fundamental solution.

## How to use it
From the fundamental solution, generate the rest by expanding $(x_1 + y_1\sqrt D)^k$ or by the recurrence $x_{k+1} = x_1x_k + Dy_1y_k$, $y_{k+1} = x_1y_k + y_1x_k$. Solutions grow exponentially — "the next solution after..." questions want exactly one multiplication.

## On contests
AIME problems about near-square pairs ($x^2 - 2y^2 = \pm1$-adjacent: triangular-square numbers, "$n$ and $\frac{n+1}{2}$ both squares") reduce to Pell orbits. Recognize the quadratic-in-two-variables-equals-constant shape and hunt the smallest solution by hand.`,

"sum-of-two-squares": String.raw`
## Key forms
- $n = a^2 + b^2$ for integers $a$, $b$ exactly when every prime $\equiv 3 \pmod 4$ divides $n$ to an even power — the general criterion
- an odd prime $p$ is a sum of two squares exactly when $p \equiv 1 \pmod 4$, and then in only one way — Fermat's Two-Square Theorem, the prime case
- $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2$ — representations multiply, by the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci Identity]]
- $r_2(n) = 4(d_1(n) - d_3(n))$ — the number of representations counting order and signs, where $d_1$ and $d_3$ count the divisors $\equiv 1$ and $\equiv 3 \pmod 4$

## Conditions
$n$ is a positive integer, and $a$, $b$ may be zero or negative. "Only one way" for a prime counts $\{a, b\}$ up to order and sign; with order and signs there are $8$ representations, matching $r_2(p) = 4 \cdot 2$.

## Why it works
One direction is a parity argument: every square is $0$ or $1$ modulo $4$, so a sum of two squares is never $3 \pmod 4$, which rules out every prime $p \equiv 3 \pmod 4$.

For $p \equiv 1 \pmod 4$, the congruence $x^2 \equiv -1 \pmod p$ has a solution, so $p$ divides $x^2 + 1$ for some $x$. [[thues-lemma|Thue's Lemma]] then gives integers $a$, $b$ with $0 \lt a, b \lt \sqrt p$ and $a \equiv xb \pmod p$, so $p$ divides $a^2 + b^2$, and $0 \lt a^2 + b^2 \lt 2p$ forces $a^2 + b^2 = p$. Uniqueness is clearest in the [[gaussian-integers|Gaussian integers]], where $p = (a + bi)(a - bi)$ and factorization is unique.

For general $n$, the identity multiplies representations, so a product of primes $\equiv 1 \pmod 4$, of $2 = 1^2 + 1^2$, and of squares is a sum of two squares. Conversely, a prime $q \equiv 3 \pmod 4$ that divides $a^2 + b^2$ must divide both $a$ and $b$, since $-1$ is not a square modulo $q$, so $q$ divides $n$ to an even power.

## Useful observations
- A right triangle with a prime hypotenuse $p$ exists only when $p \equiv 1 \pmod 4$, and then it is unique: $p = m^2 + n^2$ gives legs $m^2 - n^2$ and $2mn$. For $p = 13 = 3^2 + 2^2$ the legs are $5$ and $12$.
- To find the representation of a specific prime, test $p - b^2$ for $b \le \sqrt{p/2}$; the first square found is the only one.
- The number of [[lattice-points-circle|lattice points on the circle]] $x^2 + y^2 = n$ is exactly $r_2(n)$.

## Applications
Which integers are sums of two squares, lattice points on circles, right triangles with a given hypotenuse, and factorization in the Gaussian integers.

## Contest profile
A recognition fact more than a computation: it decides at once whether a representation exists, and the multiplication identity builds one when it does.
`,

"thues-lemma": String.raw`## Why it works
Pigeonhole. Consider the $(\lfloor\sqrt n\rfloor + 1)^2 > n$ numbers $ai - j$ for $0 \le i, j \le \lfloor\sqrt n\rfloor$. Two must be congruent mod $n$; subtracting gives $a(i_1 - i_2) \equiv (j_1 - j_2) \pmod n$ with both differences at most $\sqrt n$ in absolute value and not both zero — exactly the promised $x \equiv ay$ with $|x|, |y| \le \sqrt n$.

## How to use it
The elementary route to representation theorems. For $p \equiv 1 \pmod 4$, $-1$ is a quadratic residue, so pick $a$ with $a^2 \equiv -1$; then Thue's $x \equiv ay$ gives $x^2 \equiv a^2 y^2 \equiv -y^2$, so $p \mid x^2 + y^2$, and since $0 \lt  x^2 + y^2 \lt  2p$ it equals $p$. The same move with $a^2 \equiv -2$ or $-3$ produces $x^2 + 2y^2$ and $x^2 + 3y^2$ representations. The proof is a pigeonhole argument on the roughly $p$ pairs $(x,y)$ in a box of side $\sqrt p$.

## On contests
An olympiad tool — the standard "no Gaussian integers required" proof of Fermat's two-squares theorem, and a clean way to force a bounded solution of a modular condition into existence when a problem needs one.`,

"factor-pair-counting": String.raw`
## When to use
Equations such as $xy = 2x + 3y$, $\frac1x + \frac1y = \frac1{12}$, $x^2 - y^2 = 2025$ or $m^2 = n^2 + 60$: two unknown integers, degree at most two, and a rearrangement, often [[sfft|Simon's Favorite Factoring Trick]], that leaves a product equal to a number. Counting questions are its best use, because the answer comes straight from a divisor count.

## How
1. Rearrange the equation into $AB = N$, with $A$ and $B$ integer expressions in the unknowns.
2. List the factor pairs of $N$, or count them with $d(N)$; include negative pairs if the unknowns may be negative.
3. Filter the pairs: positivity of the original variables, equal parity when $A$ and $B$ must match, and ordering when pairs are unordered.
4. Translate each surviving pair back into values of the unknowns.

For $\frac1x + \frac1y = \frac1{12}$ in positive integers: clearing denominators gives $xy - 12x - 12y = 0$, so $(x - 12)(y - 12) = 144$. Both factors are at least $-11$, and two negative factors that small multiply to at most $121$, so both are positive, and the solutions number $d(144) = 15$.

## Why it works
Once an equation reads $AB = N$ with integers $A$ and $B$, choosing $A$ decides $B = \frac NA$, so the solutions correspond exactly to the divisors of $N$. An equation with no general method has become a list. The figure shows the five ways to write $36$ as a product, drawn as rectangles of area $36$; each is two ordered solutions except the square $6 \times 6$, which is its own mirror image.

Unordered pairs are therefore $\frac{d(N)}{2}$ when $N$ is not a square and $\frac{d(N) + 1}{2}$ when it is. When the factors are $x - y$ and $x + y$, they differ by an even number and so have the same parity, and the pairs of opposite parity are thrown out.

## Formulas it uses
- [[number-of-divisors]]: $d(N) = \prod (e_p + 1)$ counts the ordered positive factor pairs, since the first factor decides the second.
- [[difference-of-squares]]: $x^2 - y^2 = (x - y)(x + y)$ is the most common way to produce the product, and it brings the same-parity filter with it.

## Common traps
- Forgetting the negative factor pairs when the unknowns may be negative, or keeping them when they give impossible values.
- Counting unordered pairs as $\frac{d(N)}{2}$ when $N$ is a square, which drops the middle pair.
- Skipping the parity filter for a difference of squares, which counts pairs that give non-integer values.

## Contest profile
Rarely the whole solution: a factorization step, often a difference of squares, produces the product, and the divisor count with a sign or parity filter finishes.
`,

"difference-of-squares-rep": String.raw`
## Why it works
Every representation is a factorization into two factors of the same parity, and every such factorization is a representation.

The factors $a - b$ and $a + b$ differ by $2b$, an even number, so they are both odd or both even. If both are odd, $n$ is odd; if both are even, $n$ is a multiple of $4$. So an $n$ that is $2 \bmod 4$ has no representation. Conversely, if $n = st$ with $s \le t$ of the same parity, then $$a = \frac{s + t}{2}, \qquad b = \frac{t - s}{2}$$ are whole numbers with $a^2 - b^2 = st = n$. Every odd $n$ works with $s = 1$ and $t = n$, and every multiple of $4$ with $s = 2$ and $t = \frac n2$.

## How to use it
$40$ is a multiple of $4$, so it is a [[difference-of-squares|difference of squares]]: the pair $4 \cdot 10$ gives $a = 7$ and $b = 3$, and $7^2 - 3^2 = 40$. $42$ is $2 \bmod 4$, so it is not.

To count representations, count the factor pairs of matching parity. For odd $n$ every factor pair works, so there are $\lceil \frac{d(n)}{2} \rceil$ representations, counting $b = 0$ when $n$ is a square. Equations like $x^2 - y^2 = k$ are solved the same way, by listing factor pairs of $k$, which is the difference of squares factoring at work.

## On contests
Four problems here, mostly AMC, one solved by it alone and three combined with the difference of squares factoring itself. "How many numbers up to $N$ are differences of two squares" and "in how many ways" are the two recurring questions, and both come down to the parity condition and factor pairs.
`,

"farey-sequences": String.raw`## Why it works
The determinant condition $bc - ad = 1$ says consecutive Farey fractions form a unimodular pair — no lattice point strictly between their vectors ([[picks-theorem|Pick's Theorem]] on the empty triangle). The mediant is the lattice vector sum, the unique "next" fraction between them.

## How to use it
Best-approximation problems: the fraction with smallest denominator between two given fractions is found by mediant descent (Stern-Brocot search). Neighbor condition answers "which fractions are adjacent to $\frac{a}{b}$": solve $bc - ad = 1$. Counting: $|F_n| = 1 + \sum_{k\le n}\varphi(k)$.

## On contests
AIME problems on fractions with bounded denominators ("smallest denominator between..."), and the hidden structure in ford-circle/mediant configurations. The unimodular determinant is the fact to reach for.`,

"repeating-decimals": String.raw`
## Why it works
Multiplying by $10^k$ shifts a repeating block of length $k$ one whole block to the left, so subtracting the original number cancels the entire infinite tail.

If $x = 0.\overline{d_1 \ldots d_k}$, then $10^kx = d_1 \ldots d_k.\overline{d_1 \ldots d_k}$, and subtracting gives $$(10^k - 1)x = d_1 \ldots d_k,$$ the block read as a whole number. So $x$ is the block over $10^k - 1$, which is $k$ nines. The same fact is a [[geometric-series|geometric series]] with ratio $10^{-k}$.

In the long division of $1$ by $n$, each step multiplies the current remainder by $10$ and reduces it mod $n$, and the digit written down depends only on that remainder. So the digits repeat as soon as a remainder repeats, and for $n$ coprime to $10$ the remainder first returns to $1$ after $\operatorname{ord}_n(10)$ steps.

{{figure:division}}

## How to use it
Convert in either direction by counting digits: $0.\overline{57} = \frac{57}{99} = \frac{19}{33}$, and $$0.1\overline{6} = \frac1{10}\left(1 + 0.\overline{6}\right) = \frac1{10} \cdot \frac53 = \frac16.$$ Factors of $2$ and $5$ in a denominator create the digits before the repeat; the rest of the denominator sets the period.

Period questions are order computations: the period of $\frac1{49}$ is $\operatorname{ord}_{49}(10) = 42$, and the period always divides $\varphi(n)$. Every fraction $\frac{k}{999}$ has a three-digit repeating block, and $999 = 27 \cdot 37$, so counting numbers of the form $0.\overline{abc}$ comes down to the divisors of $999$.

## On contests
Five problems here, all AIME, one solved by it alone; two are counts over fractions $\frac{k}{999}$ in lowest terms, handled with [[pie|inclusion-exclusion]] on the prime factors $3$ and $37$. AIME also builds problems on the period of $\frac1n$ and on the digit sums of repeating blocks.
`,

"terminating-decimals": String.raw`## Why it works
Terminating with $k$ decimals means $10^k \cdot \frac{m}{n}$ is an integer, i.e. $n \mid 10^k$ — so $n$'s primes are only 2 and 5, and $k = \max(a, b)$ suffices.

## How to use it
Reduce the fraction FIRST — $\frac{3}{6}$ terminates. Counting problems ("how many $\frac{1}{n}$ for $n \le 100$ terminate") count numbers of the form $2^a5^b$. Mixed pre-period/period structure: factors of 2, 5 give the pre-period length, the rest gives the period.

## On contests
AMC counting questions and AIME hybrids ("$\frac{k}{2020}$ terminates for how many $k$" — depends on cancellation against the 101). The reduce-first trap is the tested subtlety.`,

"base-conversion": String.raw`
## Why it works
A base-$b$ numeral counts in bundles: $d_0$ ones, $d_1$ bundles of $b$, $d_2$ bundles of $b^2$, and so on, never with $b$ or more of any one size, since $b$ bundles of one size would make a single bundle of the next size up.

That rule is what makes the representation unique, and it is also how you find it. Dividing $n$ by $b$ leaves a remainder between $0$ and $b - 1$, and that remainder is the number of ones, $d_0$, because everything else is a multiple of $b$. The quotient counts the bundles of $b$, and dividing it by $b$ again gives $d_1$ as the remainder. Repeating until the quotient is $0$ produces the digits from right to left.

For $200$ in base $7$: $$200 = 28 \cdot 7 + 4, \qquad 28 = 4 \cdot 7 + 0, \qquad 4 = 0 \cdot 7 + 4,$$ and reading the remainders from the bottom up, $200 = 404_7$.

Converting the other way is just evaluating the polynomial, and the number of digits comes from the size of the leading power: a number with $k + 1$ digits satisfies $b^k \le n \lt b^{k+1}$, so $k = \lfloor \log_b n \rfloor$.

## Full proof
Existence is the division process above. Each step divides the current quotient by $b$, so the quotients strictly decrease and eventually reach $0$, and reassembling $n = q_1b + d_0 = (q_2b + d_1)b + d_0 = \cdots$ gives $n = \sum_i d_ib^i$ with every $d_i$ between $0$ and $b - 1$.

For uniqueness, suppose $\sum_i d_ib^i = \sum_i e_ib^i$ with every digit in $\{0, 1, \ldots, b - 1\}$. Reducing both sides modulo $b$ gives $d_0 \equiv e_0 \pmod b$, and two digits that are congruent modulo $b$ and both lie between $0$ and $b - 1$ must be equal. Subtracting $d_0$ from both sides and dividing by $b$ leaves the same situation one place to the left, so $d_1 = e_1$, and repeating shows every digit agrees.

## How to use it
Digit conditions in an unknown base become polynomial equations. "$\overline{121}_b$ is a perfect square" says that $$\overline{121}_b = b^2 + 2b + 1 = (b + 1)^2$$ is a square, which is true in every base $b \ge 3$, while "$\overline{abc}_b$ equals some given number" is usually a quadratic in $b$.

A few structural facts are worth having ready: $b^k$ is a $1$ followed by $k$ zeros, $b^k - 1$ is $k$ copies of the top digit $b - 1$, and a number whose digits are all equal is that digit times a repunit $\overline{11\cdots1}_b$.

What base problems really ask is for an equation to be read two ways. A digit string is a polynomial in the base, so a condition on digits is a polynomial condition on $b$, usually a quadratic, while the digits themselves are held to $0 \le d \lt b$. Those two facts together make the problem finite: the polynomial gives candidates and the digit bounds eliminate almost all of them.

## On contests
Alone in 4 of its 27 problems; the standing partner is [[casework-method|casework]] (6), because the digit bounds produce a small number of cases and someone has to check them. The recurring shapes are "in what base does this digit string equal that square" and palindromes that survive a change of base. Binary and ternary carry their own uses: base two for subset weights, and balanced ternary for weighing problems where a weight may go on either pan.
`,

"lattice-points-gcd": String.raw`
## Why it works
The segment is made of $\gcd(a, b)$ equal steps, each the smallest lattice vector in its direction.

Let $g = \gcd(a, b)$. The vector $\left(\frac ag, \frac bg\right)$ has coordinates with no common factor, and the segment is $g$ copies of it laid end to end, so it passes through the $g - 1$ lattice points between the copies. There are no others: a lattice point $t(a, b)$ with $0 \lt t \lt 1$ needs $ta$ and $tb$ both to be integers, which forces $t$ to be a multiple of $\frac1g$.

For the squares, the diagonal of an $m \times n$ grid crosses $m - 1$ inner vertical lines and $n - 1$ inner horizontal lines, and each crossing takes it into a new square. At each of the $g - 1$ interior lattice points it crosses one of each at once and enters only one new square, so it visits $$1 + (m - 1) + (n - 1) - (g - 1) = m + n - g$$ squares.

{{figure:squares}}

## How to use it
For Pick's Theorem, count boundary points edge by edge: an edge from $(x_1, y_1)$ to $(x_2, y_2)$ contributes $\gcd(|x_2 - x_1|, |y_2 - y_1|)$ points, counting one endpoint, so adding over the edges counts each vertex once. The segment from $(0, 0)$ to $(9, 6)$ is three steps of $(3, 2)$, so it has $2$ interior lattice points.

A lattice point $(a, b)$ is visible from the origin, with no lattice point in between, exactly when $\gcd(a, b) = 1$. In three dimensions, inclusion-exclusion gives the number of unit cubes the diagonal of an $a \times b \times c$ box passes through: $$a + b + c - \gcd(a, b) - \gcd(b, c) - \gcd(c, a) + \gcd(a, b, c).$$

## On contests
Five problems here, four of them AIME, none by it alone; three split the count into [[casework-method|cases]] by the value of the gcd. The recurring shapes are a diagonal crossing grid squares, lattice points on a segment or on a polygon's boundary, and the points of a grid visible from the origin.
`,

"wolstenholme": String.raw`## Why it works
Pair the fractions $\frac{1}{k} + \frac{1}{p-k} = \frac{p}{k(p-k)}$: the harmonic sum mod $p^2$ reduces to $p\sum\frac{1}{k(p-k)}$, and the remaining sum vanishes mod $p$ by symmetry of inverses. The binomial form follows by expansion.

## How to use it
Cite for harmonic-number congruences: $H_{p-1} \equiv 0 \pmod{p^2}$ (numerator divisible by $p^2$), and $\binom{2p}{p} \equiv 2 \pmod{p^3}$ for $p \ge 5$. The weaker mod-$p$ statements are provable by the pairing trick alone — learn the pairing, cite the strengthening.

## On contests
"Show the numerator of $1 + \frac{1}{2} + \cdots + \frac{1}{p-1}$ is divisible by $p$" appears in olympiad training; the $p^2$ version and binomial form are recognition facts for hard AIME/olympiad number theory.`,

"zsygmondy": String.raw`## Why it works
Deep (cyclotomic polynomial analysis). The content: $a^n - b^n$ almost always has a prime factor dividing no earlier $a^k - b^k$ — a "new" prime at every exponent, with the two listed exceptions.

## How to use it
A sledgehammer for exponential Diophantine equations: if a problem claims $a^n - b^n$ has only certain prime factors for large $n$, Zsygmondy usually contradicts it. Check the exceptions first: $2^6 - 1 = 63$ and $n = 2$ with $a + b$ a power of 2.

## On contests
Olympiad tool ("find all $n$ such that $2^n - 1$ divides..."). AIME rarely needs it, but recognizing when a smaller tool (orders, [[lte-lemma|LTE]]) suffices vs. when Zsygmondy is the honest reason marks mature problem-solving.`,

"fermat-numbers": String.raw`## Why it works
$F_n = 2^{2^n} + 1$: the product identity $F_0F_1\cdots F_{n-1} = F_n - 2$ follows by telescoping $(2^{2^k} - 1)(2^{2^k} + 1) = 2^{2^{k+1}} - 1$. Any common divisor of two Fermat numbers divides 2 — but all are odd, so they are pairwise coprime.

## How to use it
Pairwise coprimality gives infinitude of primes (each $F_n$ owns new primes). Structure facts: $2^m + 1$ can be prime only when $m$ is a power of 2 (else factor via odd-exponent sum); known Fermat primes are 3, 5, 17, 257, 65537 — and constructible polygons come from products of these.

## On contests
Factoring $2^{32} - 1 = 3 \cdot 5 \cdot 17 \cdot 257 \cdot 65537$ via the telescoping product is a beloved AMC/AIME move; coprimality arguments and "when is $2^m + 1$ prime" reasoning recur.`,

"continued-fraction-convergents": String.raw`## Why it works
Convergents $\frac{p_k}{q_k}$ satisfy the recurrence $p_k = a_kp_{k-1} + p_{k-2}$ (same for $q$), and the determinant identity $p_kq_{k-1} - p_{k-1}q_k = (-1)^{k-1}$ follows by induction — each step is a unimodular [[matrix-multiplication|matrix multiplication]].

## How to use it
Best rational approximations with bounded denominator are convergents — the tool for "closest fraction to $\pi$ with denominator under 100" questions. The determinant identity gives instant solutions to $ax - by = \pm1$ ([[bezouts-identity|Bézout]] via continued fractions), and consecutive convergents are Farey neighbors.

## On contests
Approximation problems and Pell-equation fundamentals ($\sqrt D$'s continued fraction finds the fundamental solution). Also underlies Stern-Brocot/mediant search arguments on AIME-level fraction problems.`,

"digit-count": String.raw`
## Why it works
$n$ has $d$ digits exactly when $10^{d-1} \le n \lt 10^d$, and taking logarithms turns that into $d - 1 \le \log_{10} n \lt d$. So $d - 1$ is the whole-number part of $\log_{10} n$, which is the formula; in base $b$ the same argument uses powers of $b$.

The fractional part of the logarithm decides the leading digits. If $\log_{10} n = k + f$ with $0 \le f \lt 1$, then $$n = 10^f \cdot 10^k,$$ and $10^f$, a number between $1$ and $10$, is $n$ with its decimal point moved.

## How to use it
For $2^{100}$, $\log_{10} 2^{100} = 100\log_{10} 2 \approx 30.103$, so it has $31$ digits, and since $10^{0.103} \approx 1.27$, it begins $1.27\ldots$, with leading digit $1$. Memorize $\log_{10} 2 \approx 0.30103$ and $\log_{10} 3 \approx 0.47712$; with $\log_{10} 5 = 1 - \log_{10} 2$ they cover most questions.

Leading-digit questions about a sequence of powers become questions about the fractional parts of multiples of a logarithm: $2^k$ starts with $1$ exactly when the fractional part of $k\log_{10} 2$ is less than $\log_{10} 2$.

## On contests
Four problems here, mostly AMC, three solved by it alone; the fourth works through [[log-rules|logarithm rules]] first. "How many digits does $5^{2027}$ have" and "how many powers of $2$ below $2^{1000}$ start with a $7$" are the classic forms.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"hensel-lifting": String.raw`
## When to use
Congruences modulo $p^2$, $p^3$ or a higher power: $x^2 \equiv a \pmod{p^k}$, $x^3 \equiv a \pmod{7^3}$, or counting the solutions of a polynomial congruence modulo a composite number, which the [[crt|Chinese Remainder Theorem]] first splits into prime powers. It also predicts, before any computation, whether a root modulo $p$ extends to one root, to many, or to none.

## How
1. Split a composite modulus into prime powers and treat each one separately.
2. Solve $f(x) \equiv 0 \pmod p$ by testing the $p$ residues.
3. For each root $a$, check that $f'(a) \not\equiv 0 \pmod p$; such a root has exactly one lift modulo each higher power.
4. Substitute $x = a + pt$, keep $f(a) + pt\,f'(a)$, divide by $p$, and solve $\frac{f(a)}{p} + t\,f'(a) \equiv 0 \pmod p$ for $t$.
5. Repeat with the new root and the next power of $p$ until you reach $p^k$.

For $x^2 \equiv -1 \pmod{25}$, take $f(x) = x^2 + 1$. Modulo $5$ the roots are $2$ and $3$. For $a = 2$, $\frac{f(2)}{5} = 1$ and $f'(2) = 4$, so $1 + 4t \equiv 0 \pmod 5$ gives $t = 1$ and $x = 7$; indeed $7^2 + 1 = 50$. The other root lifts to $18$, and one more step gives $57$ and $68$ modulo $125$.

## Why it works
Expanded around a known root, every term of a polynomial past the linear one carries a factor of $p^2$. For integer coefficients, Taylor's formula reads $$f(a + pt) = f(a) + pt\,f'(a) + p^2(\ldots),$$ with an integer in the parentheses, because the $k$th derivative divided by $k!$ has integer coefficients. Since $p$ divides $f(a)$, the condition $f(a + pt) \equiv 0 \pmod{p^2}$ divides by $p$ into the linear congruence $$\frac{f(a)}{p} + t\,f'(a) \equiv 0 \pmod p,$$ which has exactly one solution $t$ when $p \nmid f'(a)$.

When $p$ divides $f'(a)$ the $t$ drops out: the root lifts for every $t$ if $p^2 \mid f(a)$ and for none otherwise. That singular case is why square roots modulo powers of $2$ follow their own rule.

## Formulas it uses
- [[binomial-theorem]]: expands $(a + pt)^n$, and every term past $n a^{n-1} pt$ carries $p^2$, which is why each step is linear.
- [[modular-inverse]]: each step solves $t\,f'(a) \equiv -\frac{f(a)}{p} \pmod p$, which needs the inverse of $f'(a)$ modulo $p$.
- [[crt]]: splits a composite modulus into prime powers before lifting and recombines afterward, so the numbers of roots multiply.

## Common traps
- Lifting a root with $f'(a) \equiv 0 \pmod p$ as if it were simple; it lifts to $p$ roots or to none.
- Using the simple rule at $p = 2$ for square roots: the derivative $2x$ is always even, and an odd $a$ has a square root modulo $2^k$, $k \ge 3$, only when $a \equiv 1 \pmod 8$, in which case it has four.
- Forgetting to multiply the root counts across the prime powers after the Chinese Remainder Theorem.

## Contest profile
Rare below olympiad level; when it appears it is one step inside a larger count, solving a power congruence modulo a prime power after the Chinese Remainder Theorem has split the modulus.
`

});

Object.assign(window.MATH_DETAILS, {

"carmichael-function": String.raw`## Why it works
The multiplicative group mod $p^k$ is cyclic for odd $p$ (so $\lambda = \varphi$ there), but mod $2^k$ ($k \ge 3$) it is a product of a group of order 2 and a cyclic group of order $2^{k-2}$ — whence the smaller exponent. [[crt|CRT]] splits the group mod $n$ into the prime-power pieces, and the universal exponent of a product is the lcm of the pieces' exponents.

## How to use it
For "last $k$ digits of a huge power" problems, reduce the exponent mod $\lambda(10^k)$ instead of $\varphi(10^k)$: $\lambda(1000) = 100$ versus $\varphi(1000) = 400$. For power towers, iterate down the tower with $\lambda$ at each level. Remember the special cases $\lambda(2) = 1$, $\lambda(4) = 2$ and the lcm (not product) combination rule. Since $\lambda(n)\mid\varphi(n)$ always, using $\lambda$ can only sharpen [[eulers-theorem|Euler's Theorem]], never weaken it — and the true order of any particular $a$ divides $\lambda(n)$ in turn.

## On contests
AIME tower-of-exponents problems reward $\lambda$ heavily — a $4\times$ smaller modulus at each level compounds. Euler's Theorem is never wrong, just slower; $\lambda$ is the sharp version of the same idea.`

});

Object.assign(window.MATH_DETAILS, {

"floor-sum-reciprocity": String.raw`## Why it works
$\lfloor \frac{kp}{q} \rfloor$ counts lattice points $(k, j)$ with $1 \le j \le \frac{kp}{q}$ — the points strictly below the diagonal of the $q \times p$ rectangle in column $k$. Coprimality keeps the diagonal off the lattice, and the $180^\circ$ symmetry of the rectangle pairs each interior point below the diagonal with one above, splitting $(p-1)(q-1)$ evenly.

## How to use it
Evaluate floor sums over a full period instantly; for partial ranges, pair $k$ with $q - k$ using $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$. The lattice-counting viewpoint generalizes: sums of floors = points under a line, so Pick-style arguments and symmetry both apply.

## On contests
AIME floor-sum problems (often dressed as "sum of remainders": $\sum (kp \bmod q)$ converts via $kp = q\lfloor \cdot \rfloor + \text{rem}$). Also the key lemma inside [[eisenstein-criterion|Eisenstein's]] proof of [[quadratic-reciprocity|quadratic reciprocity]] — the same pairing, one level deeper.`

});

Object.assign(window.MATH_DETAILS, {

"lattice-points-circle": String.raw`## Why it works
In the Gaussian integers $\mathbb{Z}[i]$, $a^2 + b^2 = (a+bi)(a-bi)$, and unique factorization sorts primes into split ($p \equiv 1 \bmod 4$, contributing choices), inert ($p \equiv 3$, demanding even exponents), and ramified ($2$). Counting the factorization choices yields $4(d_1 - d_3)$, the 4 being unit rotations $\pm1, \pm i$.

## How to use it
Count representations without finding them: compute $d_1(n) - d_3(n)$ over the divisors. Practical shortcuts: powers of split primes give $e+1$ essentially-different representations; any prime $\equiv 3 \pmod 4$ to an odd power kills everything; factors of 2 and squares of inert primes just scale existing points.

## On contests
"How many lattice points on $x^2 + y^2 = 2025$" — direct plug-in. Also the cleaner route to "in how many ways is $n$ a sum of two squares" (divide out symmetries carefully: the $4(d_1-d_3)$ count is ordered and signed).`,

"gaussian-integers": String.raw`## Why it works
$\mathbb{Z}[i]$ is a Euclidean domain — you can divide with remainder by rounding to the nearest Gaussian integer — so it has unique factorization. The norm $N(a+bi) = a^2+b^2 = (a+bi)(a-bi)$ is multiplicative because it is $|z|^2$, which turns questions about sums of two squares into questions about factorization. A rational prime $p$ behaves by whether $-1$ is a quadratic residue mod $p$: $p \equiv 1 \pmod 4$ makes $x^2 \equiv -1$ solvable, so $p \mid (x+i)(x-i)$ splits; $p \equiv 3 \pmod 4$ stays prime; and $2 = -i(1+i)^2$ ramifies.

## How to use it
Reach for $\mathbb{Z}[i]$ whenever $a^2+b^2$ appears: factor it as $(a+bi)(a-bi)$ and lean on unique factorization. This proves [[sum-of-two-squares|Fermat's Two-Square Theorem]], powers the $4(d_1 - d_3)$ representation count, parametrizes Pythagorean triples via $(m+ni)^2$, and multiplies sums of two squares together (Brahmagupta–Fibonacci). The [[eisenstein-criterion|Eisenstein]] integers $\mathbb{Z}[\omega]$ do the same for $a^2+ab+b^2$ and problems with cube-root-of-unity (120°) symmetry.

## On contests
Chiefly an olympiad tool, but its consequences reach the AIME (sum-of-two-squares counts, Pythagorean-triple parametrizations). The practical takeaway: primes $\equiv 1 \pmod 4$ split (and are sums of two squares), while primes $\equiv 3 \pmod 4$ stay inert.`

});

Object.assign(window.MATH_DETAILS, {


"choose-modulus": String.raw`
## When to use
Reach for a modulus when a problem asks you to show an equation has no integer solutions, or when an integer search has far too many cases. The signal is a term whose remainders are scarce. Squares, cubes and fourth powers each hit only a few residues, a factorial $n!$ is $0$ modulo every prime up to $n$, the powers of a fixed base cycle, and digit conditions live naturally modulo $9$, $10$ and $11$. Pick the modulus to fit: $4$ or $8$ for squares, $9$ or $7$ for cubes, $16$ for fourth powers, $9$ for digit sums, $11$ for alternating digit sums, $10$ for last digits.

## How
1. Make a small table of the residues each term can take modulo a candidate $m$.
2. Reduce both sides of the equation modulo $m$ and list the values each side can reach.
3. If the two lists never overlap, the equation has no solutions.
4. If they overlap only in some classes, keep those, substitute (as $x = 2x'$ when $x$ must be even), and continue with the smaller problem.
5. If nothing is ruled out, try another modulus before switching to bounding or factoring.

For $x^2 + y^2 = 4z + 3$: a square is $0$ or $1$ modulo $4$, so the left side is $0$, $1$ or $2$ modulo $4$ and can never be $3$. There are no solutions.

## Why it works
Congruence respects addition and multiplication, so if $A = B$ in the integers then $A \equiv B \pmod m$ for every $m$. Read backwards, one modulus at which the two sides disagree rules out every integer solution at once.

A good modulus is one where the terms have few possible residues. Modulo $8$ every odd square is $1$, because $(2k + 1)^2 = 4k(k + 1) + 1$ and $k(k + 1)$ is even. Modulo $9$ a cube is $0$ or $\pm 1$, because $(3k \pm 1)^3 = 27k^3 \pm 27k^2 + 9k \pm 1$. A side built from such terms reaches only a few residues, and the art is choosing $m$ so that the other side lands outside them.

When the modulus does not kill the equation it still narrows it: a forced residue becomes a substitution, and when every variable is forced to be even, dividing by $2$ gives a smaller solution, the start of an infinite descent.

## Formulas it uses
- [[modular-basics]]: congruences can be added and multiplied, so each side of an equation can be reduced term by term.
- [[squares-mod-small]]: the residues of squares, $0, 1$ modulo $4$ and $0, 1, 4$ modulo $8$, the most common table to check.
- [[fermats-little-theorem]]: $a^{p-1} \equiv 1 \pmod p$ when $p \nmid a$, so powers modulo a prime take few values; fourth powers modulo $5$ are only $0$ and $1$.
- [[last-digit-patterns]]: the residues of squares and cubes modulo $9$ and the last digits they can end in.

## Common traps
- Treating a modulus that fails to rule out solutions as evidence that solutions exist; it only means that modulus is the wrong one.
- Forgetting the residue $0$: a variable divisible by $m$ behaves differently, as when $3 \mid x$ makes $x^3 \equiv 0 \pmod 9$.
- Reducing an exponent modulo $m$ instead of modulo the period of the base: $2^{100} \bmod 7$ uses $100 \bmod 3$, since $2^3 \equiv 1 \pmod 7$.

## Contest profile
Usually a single decisive line: the right modulus either ends a "show there are no solutions" problem outright or cuts an AIME search down to a few residue classes for another method to finish.
`,

"recognition-numbers": String.raw`
## Why it works
There is no theorem here, only the reason these particular numbers keep appearing.

Divisibility by $2$, $3$, and $5$ can be seen at a glance, so a number that passes those tests looks prime. A composite number that passes them has all its prime factors at least $7$, and the products of two primes from $7$ to $19$ are the ones that turn up most. Knowing those few products means $221$ or $323$ never slows you down.

$1001 = 7 \cdot 11 \cdot 13$ is behind a whole family of tricks. Repeating a three-digit block multiplies it by $1001$, $$\overline{abcabc} = \overline{abc} \cdot 1001 = \overline{abc} \cdot 7 \cdot 11 \cdot 13,$$ so every such six-digit number is divisible by $7$, $11$, and $13$. And $2^{10} = 1024$ is so close to $10^3$ that it converts between powers of $2$ and powers of $10$ with an error under $3\%$.

## How to use it
To factor a three-digit number, test $7$, $11$, $13$, $17$, and $19$ after the obvious small primes. A number below $529 = 23^2$ that passes all of them is prime, since a composite one would need two prime factors of at least $23$.

The family built on repeated digit patterns cracks numbers like $111111 = 111 \cdot 1001$: $111 = 3 \cdot 37$, $999 = 3^3 \cdot 37$, $10101 = 3 \cdot 7 \cdot 13 \cdot 37$, and $101 \cdot 9901 = 1000001$.

One power is worth knowing for last digits: $$7^4 = 2401 \equiv 1 \pmod{100},$$ so the last two digits of $7, 7^2, 7^3, 7^4, \ldots$ run $07, 49, 43, 01$ and repeat every four. [[eulers-theorem|Euler's Theorem]] only promises a repeat every $40$ steps; $7$ has [[multiplicative-order|order]] $4$ modulo $100$. So $7^{2025}$ ends in $07$, because $2025$ is one more than a multiple of $4$.

For estimates, $\log_{10} 2 \approx 0.301$ and $\log_{10} 3 \approx 0.477$ settle digit counts and size comparisons, and the square-root values settle which answer choice a messy expression is closest to.

## On contests
Four problems here, all solved by it alone, and really two, each shared between the AMC 10 and AMC 12. They reward recognizing products like $101 \cdot 9901 = 1000001$ and $99 \cdot 10101 = 999999$, or $10 \cdot 9 \cdot 8 = 720 = 6!$, instead of multiplying out. AIME answers often need a quick factorization such as $221$ or $299 = 13 \cdot 23$, and AMC estimates lean on $2^{10} \approx 10^3$.
`,

"digit-manipulation": String.raw`
## Distinguishing clues
The condition names individual digits: their sum, their order, a digit moved or deleted. A question about how many digits a number has belongs to [[digit-count|the number of digits]], and one about the last digits of a huge power is a question about remainders, not digits.

## Methods and Formulas to Try
Translate first, $\overline{abc} = 100a + 10b + c$, and every condition becomes an equation in bounded unknowns. Reversals then factor at once: $\overline{ab} + \overline{ba} = 11(a + b)$, $\overline{ab} - \overline{ba} = 9(a - b)$, and $\overline{abc} - \overline{cba} = 99(a - c)$, where the middle digit drops out.

### Methods to try
- [[bounding-diophantine]]: digits are bounded, $1 \le a \le 9$ for a leading digit and $0 \le b \le 9$ otherwise, so once the equation isolates one digit only a few values survive.
- [[choose-modulus]]: modulo $9$ a number equals its digit sum and modulo $11$ its alternating digit sum, so digit-sum conditions become congruences.
- [[casework-method]]: when two or three digits stay free, split on the leading digit or on a carry.

### Formulas to try
- [[base-conversion]]: the place-value expansion in base $10$ or any base $b$, where every digit problem starts.
- [[divisibility-rules]]: digit sums and alternating digit sums, the congruences behind the reversal identities.
- [[digit-sum-carries]]: the digit sum of a sum drops by $9$ for every carry, which links the digit sum of a result to the digit sums of its parts.

## Common traps
- Letting a leading digit be $0$, especially after a reversal: the reversal of a number ending in $0$ has fewer digits.
- Forgetting that in base $b$ the digits run only from $0$ to $b - 1$.
- Treating $\overline{ab}$ as the product $ab$.

## Contest profile
Mostly MATHCOUNTS and AMC: a place-value equation and a short bounded search; the AMC version often moves the same translation into another base.
`,

"squeeze-between-squares": String.raw`
## When to use
"Find every integer $n$ that makes this expression a perfect square", for a polynomial expression whose leading part is close to a square, and the related task of computing $\lfloor \sqrt N \rfloor$ for a large, awkward $N$. The same idea works for cubes and for products of consecutive integers.

## How
1. Find the polynomial $P(n)$ whose square agrees with the expression in its leading terms, scaling the expression first (often by $4$) if $P$ would need fractions.
2. Show the expression is strictly greater than $P(n)^2$ and strictly less than $(P(n) + 1)^2$ for all $n$ beyond some point.
3. Conclude that it is not a square for those $n$.
4. Check the finitely many remaining values by hand; any value where an inequality becomes an equality is a solution.

For which positive integers is $N = n^4 + n^3 + n^2 + n + 1$ a square? Multiply by $4$: $4N - (2n^2 + n)^2 = 3n^2 + 4n + 4 > 0$, and $(2n^2 + n + 1)^2 - 4N = n^2 - 2n - 3 = (n - 3)(n + 1)$, which is positive for $n > 3$. So $4N$ lies strictly between consecutive squares once $n > 3$, and checking $n = 1, 2, 3$ leaves only $n = 3$, where $N = 121 = 11^2$.

## Why it works
No perfect square lies strictly between $m^2$ and $(m + 1)^2$, so a number trapped there is not a square, and its square root has floor $m$. The gap $(m + 1)^2 - m^2 = 2m + 1$ grows with $m$, while the difference between a polynomial expression and the square of its nearest polynomial root grows more slowly. Eventually the expression fits strictly inside a gap and stays there, and only the small values before that point need checking.

The figure shows $n = 5$: $4N = 3124$ sits between $55^2 = 3025$ and $56^2 = 3136$.

## Formulas it uses
- [[square-of-sum]]: expands the candidate root, such as $(2n^2 + n + 1)^2$, term by term for the comparison with the expression.
- [[difference-of-squares]]: the gap between consecutive squares, $(m + 1)^2 - m^2 = 2m + 1$, which is why a polynomial eventually fits strictly inside it.

## Common traps
- Skipping the small values before the squeeze holds, which is exactly where the solutions usually are.
- Missing the boundary case where the expression equals one of the two squares; those values are solutions, not failures.
- Squeezing with a root that is off by a constant, so the inequalities never become strict; try nearby constants, or scale by $4$ first.

## Contest profile
Usually the closing step of a "find every $n$ making this a perfect square" problem, with a hand check of the few small values it leaves; the floor version also appears on its own.
`

});

Object.assign(window.MATH_DETAILS, {

"vieta-jumping": String.raw`
## When to use
The trigger is a symmetric condition on two positive integers, quadratic in each, claimed for every solution: $\frac{a^2 + b^2}{ab + 1}$ is an integer, or $ab \mid a^2 + b^2 + 1$. The question asks which values such an expression can take, or to prove it is always a perfect square. It belongs to olympiads; problems of the same shape at the AIME level are usually small enough to search directly.

## How
1. Suppose an integer value $k$ occurs, and choose a solution $(a, b)$ with $a + b$ as small as possible and $a \ge b$.
2. Fix $b$ and write the condition as a quadratic in $a$; call its other root $a'$.
3. Show $a'$ is an integer, from the sum of the roots, and that $0 \le a' < a$, from the product.
4. Then $(a', b)$ is a solution with a smaller sum, which contradicts the choice, unless $a'$ is a boundary case such as $a' = 0$.
5. Read off $k$ at the boundary case.

For $\frac{a^2 + b^2}{ab + 1} = k$ the quadratic is $a^2 - kb\,a + (b^2 - k) = 0$, so $a' = kb - a = \frac{b^2 - k}{a}$. The descent stops at $a' = 0$, where the condition reads $\frac{b^2}{1} = k$: the value $k$ is a perfect square.

## Why it works
The sum of the roots of $a^2 - kb\,a + (b^2 - k) = 0$ is $kb$, an integer, so the other root $a' = kb - a$ is an integer. The product is $b^2 - k$, so $a' = \frac{b^2 - k}{a}$, and with $a \ge b$ this gives $a' < \frac{b^2}{a} \le b \le a$. And $a'$ cannot be negative: then $a'b + 1 \le 0$, so the right side of $a'^2 + b^2 = k(a'b + 1)$ is at most $0$ while the left side is positive. So $(a', b)$ is another solution in nonnegative integers with a smaller sum.

The figure follows one chain of solutions for $k = 4$ along the curve $a^2 - 4ab + b^2 = 4$, jumping from $(30, 8)$ to $(2, 8)$ to $(2, 0)$. Every chain ends at a solution with a zero, and that is where the value of $k$ shows.

## Formulas it uses
- [[vietas-quadratic]]: the sum of the roots shows the second root is an integer, and their product bounds its size and sign.

## Common traps
- Minimizing the wrong quantity, or jumping before putting $a \ge b$, so the new root is not visibly smaller.
- Skipping the sign check: the descent needs the new root to be nonnegative, not merely smaller.
- Assuming the chain always ends at $0$; in some problems it ends at $a' = b$ or at a small fixed pair, which must be checked separately.

## Contest profile
An olympiad technique for symmetric divisibility conditions; below olympiad level the same equations usually have small enough solutions to find by search.
`

});

Object.assign(window.MATH_DETAILS, {

"trailing-zeros": String.raw`
## Why it works
A number ends in $k$ zeros exactly when $10^k$ divides it, and $10^k = 2^k 5^k$, so the number of trailing zeros of $n!$ is $\min\left(v_2(n!), v_5(n!)\right)$.

Among $1, \ldots, n$ every second number is even but only every fifth is a multiple of $5$, and the same holds at every power, so $v_2(n!) \ge v_5(n!)$ always. The minimum is therefore $v_5(n!)$, which [[legendres-formula|Legendre's Formula]] computes.

The count rises at every multiple of $5$, by one more at every multiple of $25$, and by one more again at multiples of $125$, and at those points some counts are skipped.

{{figure:jumps}}

## How to use it
Add $\left\lfloor \frac n5 \right\rfloor + \left\lfloor \frac n{25} \right\rfloor + \cdots$ until the terms reach zero. For the reverse question, which $n$ give exactly $k$ zeros, estimate $n \approx 4k$, since the count is about $\frac n4$, and adjust: a skipped value has no such $n$, and any other value has exactly five, a run of consecutive $n$ from a multiple of $5$.

Each multiple of $25$ skips one count, each multiple of $125$ skips one more, and so on, which counts the values that never occur below any bound.

In another base, factor the base and take the scarcest prime power: in base $12 = 2^2 \cdot 3$ the number of trailing zeros is $\min\left(\left\lfloor \frac{v_2(n!)}{2} \right\rfloor, v_3(n!)\right)$.

## On contests
Two problems here, one AIME and one AMC 10, neither solved by it alone, since both need Legendre's Formula for the count itself. The AIME version counts the values that are never attained, and the AMC version compares the zeros of $(2n)!$ and $n!$. At MATHCOUNTS and on the AMC 10 the plain count appears on its own.
`,

"pisano-periods": String.raw`## Why it works
A Fibonacci term mod $m$ is determined by the pair $(F_{n-1}, F_n) \bmod m$, and there are only $m^2$ possible pairs, so the sequence of pairs must eventually repeat. Because the recurrence $F_{n-1} = F_{n+1} - F_n$ runs backward as cleanly as forward, the repetition can't start late — it cycles from the very beginning, giving a pure period $\pi(m)$.

## How to use it
To find $F_n \bmod m$, compute the period $\pi(m)$ (list terms mod $m$ until $0, 1$ reappears), then reduce the index: $F_n \equiv F_{n \bmod \pi(m)}$. Handy values: $\pi(10) = 60$ governs last digits, $\pi(2) = 3$ (parity: even every third term), $\pi(5) = 20$. For composite $m$, $\pi$ is the lcm of the periods of its prime-power factors. It is the Fibonacci case of periodicity in a recursive sequence, and of periodicity mod $m$ generally.

## On contests
An olympiad and hard-AIME tool for "last digit of $F_{2024}$" or "for which $n$ is $F_n$ divisible by $m$" questions. The key recognitions: last digits cycle with period $60$, and divisibility of $F_n$ by $m$ is itself periodic in $n$.`,

"exponent-tracking": String.raw`
## When to use
The move pays whenever every condition is multiplicative: a gcd or lcm is fixed, a product or quotient must be a perfect power, one number divides another, or a number of divisors is given. Counting problems are its strongest case, such as "how many divisors of $N$ are perfect squares", because the count factors into one small count per prime. It is the wrong tool when a sum enters, as in $a + b = 100$ together with a gcd; there [[gcd-substitution|GCD Substitution]] fits better.

## How
1. Factor every given number, and write each unknown as $\prod p^{e_p}$, with one exponent for each prime that can appear.
2. Translate each condition: gcd to minimum, lcm to maximum, product to sum, divisibility to an inequality, and "is a $k$th power" to "every exponent is a multiple of $k$".
3. Solve or count the exponent conditions for each prime separately.
4. Multiply the counts over the primes, or rebuild the number from its exponents.

For the ordered pairs $(a, b)$ with $\operatorname{lcm}(a, b) = 2^3 \cdot 3^2$: at the prime $2$ the two exponents lie in $\{0, 1, 2, 3\}$ with largest exactly $3$, which allows $4^2 - 3^2 = 7$ choices; at $3$ they lie in $\{0, 1, 2\}$ with largest $2$, which allows $3^2 - 2^2 = 5$. So there are $7 \cdot 5 = 35$ pairs.

## Why it works
By unique factorization a positive integer is described exactly by its prime exponents, and the common operations act on each prime separately. Multiplying adds exponents, because $p^e \cdot p^f = p^{e + f}$. A common divisor can use at most the smaller exponent at each prime.

So the greatest common divisor uses exactly the smaller exponent, and the least common multiple needs the larger: for $a = \prod p^{e_p}$ and $b = \prod p^{f_p}$, $$\gcd(a, b) = \prod p^{\min(e_p, f_p)}, \qquad \operatorname{lcm}(a, b) = \prod p^{\max(e_p, f_p)}.$$ And $a \mid b$ exactly when $\frac ba$ has no negative exponent, that is, when $a$'s exponent is at most $b$'s at every prime.

None of these rules mixes two different primes. A condition on several numbers is therefore a list of independent conditions, one per prime, and the number of ways to satisfy all of them is the product of the numbers of ways at each prime.

## Formulas it uses
- [[number-of-divisors]]: $d(n) = \prod (e_p + 1)$, the simplest count built prime by prime, since a divisor's exponent at $p$ runs from $0$ to $e_p$.
- [[gcd-lcm-product]]: $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab$, because $\min(e, f) + \max(e, f) = e + f$ at every prime.
- [[lcm-pair-counting]]: the closed counts for pairs with a given gcd or lcm, which are this method's per-prime products written out once and for all.
- [[p-adic-valuation]]: the notation $v_p(n)$ for the exponent of $p$ in $n$, the coordinate the method works in.

## Common traps
- Leaving out a prime that divides none of the given numbers; an unknown's exponent there must be $0$, and that is a condition too.
- Treating ordered and unordered tuples alike: the per-prime product counts ordered tuples, and unordered ones need care wherever entries can coincide.
- Applying the method to a condition that contains a sum, which does not split prime by prime.

## Contest profile
Usually the whole solution of a gcd or lcm counting problem, sometimes with a short casework at one prime where the exponent conditions interact.
`

});

Object.assign(window.MATH_DETAILS, {

"sum-of-three-squares": String.raw`## Why it works
Squares are $0, 1, 4 \pmod 8$, so three of them can total at most a limited set of residues — and $7 \bmod 8$ is unreachable. If $n \equiv 7 \pmod 8$ fails, so does $4n$: any representation of $4n$ must have all three squares even (since a sum of three squares $\equiv 0 \bmod 4$ forces all even), and dividing by $4$ would produce a representation of $n$. That descent generates the whole excluded family $4^k(8m+7)$. Legendre's theorem says these are the only failures, and Lagrange's four-square theorem then covers them with one extra square.

## How to use it
To test $n$: strip factors of $4$ repeatedly, then check whether what remains is $\equiv 7 \pmod 8$. If yes, three squares are impossible and four are needed; otherwise three suffice. Remember zero counts as a square, so "three squares" includes representations that really use one or two. Pair this with the two-square criterion (a positive integer is a sum of two squares iff every prime $\equiv 3 \pmod 4$ appears to an even power) to know exactly how many squares a given $n$ requires.

## On contests
Mostly an olympiad-level classification tool and a fast way to rule out cases in a Diophantine problem. The mod-8 argument itself — squares are $0, 1, 4 \bmod 8$ — is far more broadly useful than the theorem, and is worth reaching for whenever an equation mixes three squares.`,

"bounding-diophantine": String.raw`
## When to use
Equations in positive integers with finitely many solutions but no algebraic way to isolate them: sums of unit fractions such as $\frac1x + \frac1y + \frac1z = 1$, symmetric equations such as $xyz = x + y + z$, and equations in which one side grows much faster than the other, such as $2^a + 1 = 3^b$ or $n! = n^3 - n$. The tell is that large values of the variables obviously fail.

## How
1. Use the symmetry to order the variables, $x \le y \le z$, and remember to restore the other orders at the end.
2. Bound the smallest variable from both sides by comparing it with the whole equation.
3. For each surviving value, substitute and solve the smaller equation, bounding again.
4. When an inequality is too weak, reduce modulo a small number to thin the cases first.
5. List every solution with all its orderings.

For $\frac1x + \frac1y + \frac1z = 1$ with $x \le y \le z$: $1 \le \frac3x$ gives $x \le 3$, and $\frac1x < 1$ gives $x \ge 2$. With $x = 2$, $\frac1y + \frac1z = \frac12$ forces $y = 3$ or $y = 4$; with $x = 3$, it forces $y = z = 3$. The figure shows this search: three solutions, $(2, 3, 6)$, $(2, 4, 4)$ and $(3, 3, 3)$.

## Why it works
Once the variables are ordered, the smallest variable's term is the largest of the terms, and the largest of $k$ numbers is at least their average, so it is at least $\frac1k$ of the total. That caps the smallest variable from one side, and positivity of the other terms caps it from the other. Without the ordering no single variable is capped, because any of them could be the large one.

Each surviving value leaves an equation with fewer unknowns, where the same comparison applies, so the search is a finite tree. Every solution has to pass through one of its branches, which is why the list at the end is complete. For a growth comparison the bound comes from size instead: once $3^b$ outruns $2^a + 1$ by more than any adjustment can make up, only small exponents remain to check.

## Formulas it uses
- [[modular-basics]]: when the inequalities leave too many cases, a congruence cuts them down before the search.

## Common traps
- Forgetting to restore the orderings at the end, and reporting $3$ solutions where the question wants $10$ ordered ones.
- Ordering variables that are not symmetric in the equation, which loses solutions.
- Stopping when the bound is weak instead of combining it with a modulus or a factorization.

## Contest profile
Usually the closing argument of an AIME Diophantine problem: once the variables are bounded, a short check of the survivors gives the answer, often after a modulus has thinned the cases.
`

});

Object.assign(window.MATH_DETAILS, {

"modular-basics": String.raw`
## Why it works
A congruence is a statement about a difference, $a \equiv b \pmod m$ meaning that $m$ divides $a - b$, and divisibility of differences survives adding and multiplying.

Suppose $a \equiv b$ and $c \equiv d \pmod m$, so $m$ divides both $a - b$ and $c - d$. Then $$(a + c) - (b + d) = (a - b) + (c - d)$$ is a sum of multiples of $m$, so $a + c \equiv b + d$, and subtraction works the same way.

For products, $$ac - bd = a(c - d) + d(a - b),$$ again a sum of multiples of $m$, so $ac \equiv bd$; applying that repeatedly gives $a^k \equiv b^k$.

Division is where it stops. That $m$ divides $k(a - b)$ does not force $m$ to divide $a - b$ when $k$ and $m$ share a factor: $6 \cdot 5 \equiv 6 \cdot 0 \pmod{15}$, since $15$ divides $30$, but $5 \not\equiv 0 \pmod{15}$.

Division is still possible, just not by everything. If $x \equiv a$ and $y \equiv b \pmod m$ and $\gcd(b, m) = 1$, then $$\frac xy \equiv ab^{-1} \pmod m,$$ where $b^{-1}$ denotes [[modular-inverse|the modular inverse]] of $b$. Dividing by $b$ is multiplying by $b^{-1}$, and the only hypothesis is that $b$ and $m$ share no factor. What fails is dividing by something that shares a factor with the modulus, and that failure is the cancellation rule below rather than a ban.

Exponents are the genuine exception to "treat $\equiv$ like $=$". Bases reduce freely: $x \equiv a$ gives $x^k \equiv a^k$. Exponents do not. From $k \equiv j \pmod m$ you may not conclude $a^k \equiv a^j \pmod m$; the exponent reduces modulo $\varphi(m)$, not modulo $m$, and only when $\gcd(a, m) = 1$.

Take $3^{14} \pmod{10}$, whose true value is $9$. Reducing the exponent modulo $10$ would give $3^4 \equiv 1$, which is wrong; reducing it modulo $\varphi(10) = 4$ is right: $$3^{14} = \left(3^4\right)^3 \cdot 3^2 \equiv 1^3 \cdot 9 = 9 \pmod{10}.$$ The base $3$ is coprime to $10$, which is what licenses the second reduction. That is [[eulers-theorem|Euler's Theorem]], with [[fermats-little-theorem|Fermat]] as the prime case.

## Full proof
Cancellation. Let $g = \gcd(k, m)$ and suppose $ka \equiv kb \pmod m$, so $m$ divides $k(a - b)$. Dividing through by $g$, the number $\frac mg$ divides $\frac kg(a - b)$. The numbers $\frac mg$ and $\frac kg$ share no factor, since $g$ was the greatest common factor of $m$ and $k$, so by [[euclids-lemma|Euclid's Lemma]] $\frac mg$ divides $a - b$. That is $a \equiv b \pmod{\frac mg}$, and when $g = 1$ it is ordinary cancellation modulo $m$.

Inverses. If $\gcd(b, m) = 1$, [[bezouts-identity|Bézout's Identity]] gives integers $u$ and $v$ with $bu + mv = 1$, so $bu \equiv 1 \pmod m$ and $u$ is an inverse of $b$. Conversely, if $bu \equiv 1 \pmod m$ then $bu - 1$ is a multiple of $m$, so any common factor of $b$ and $m$ divides $1$. The inverse therefore exists exactly when $\gcd(b, m) = 1$.

## How to use it
Reduce early and often: replace any number by its remainder before multiplying, to keep values small. The rule that trips people up is cancellation: from $ka \equiv kb \pmod m$ you get $$a \equiv b \pmod{\frac{m}{\gcd(k, m)}},$$ not mod $m$. So $6x \equiv 6y \pmod{15}$ only gives $x \equiv y \pmod 5$.

When $\gcd(k, m) = 1$ the cancellation is clean and, equivalently, $k$ has a modular inverse you can multiply by. When it is not $1$, either shrink the modulus as above or split into cases.

Beyond the mechanics, the reason to reach for a modulus at all is that it is the cheapest way to prove something is impossible. An equation that survives every algebraic attack often dies instantly mod 3, 4, 8, or 9, because those moduli have very few squares: $$x^2 \equiv 0, 1 \pmod 4, \qquad x^2 \equiv 0, 1, 4 \pmod 8,$$ so any equation forcing a square to be $3 \bmod 4$ has no solutions at all and the search stops before it starts.

That is the payoff: not computing a remainder, but replacing an infinite search with a finite check on residues.

It is also the standard way to shrink a problem. Reducing a variable mod $m$ replaces infinitely many cases with $m$ of them, which is why this card is almost always followed by [[casework-method|casework]]: the modulus produces the cases, and the casework closes them.

## On contests
The foundation under every modular problem — last-digit and remainder questions on MATHCOUNTS, and the setup for Fermat, Euler, and [[crt|CRT]] on AMC/AIME. The pairing is very consistent: casework shares 12 of the 61 problems tagged here, more than double any other partner, and only six use the modulus alone.

The single most common error is illegal division; the fix is always to track what $\gcd(k, m)$ does to the modulus.
`

});

Object.assign(window.MATH_DETAILS, {

"zeckendorf-theorem": String.raw`## Why it works
Greedily subtracting the largest Fibonacci number $\le n$ can never leave a remainder that needs two adjacent Fibonaccis, because $F_k+F_{k-1}=F_{k+1}$ would merge them into a larger term — which gives both existence and uniqueness of the non-consecutive representation.

## How to use it
The greedy algorithm is both the construction and the proof: taking the largest Fibonacci number at each step automatically leaves a remainder smaller than the previous term's predecessor, which is exactly the non-consecutive condition.

The representation is a bijection between integers and binary strings with no two adjacent $1$s, which ties the count to the Fibonacci tiling count — and explains why exactly $F_{n+2}$ integers have representations using only the first $n$ Fibonacci numbers.

Contest uses are usually about that uniqueness: showing a Fibonacci-sum representation is forced, or converting between an integer and its Fibonacci digits.

## On contests
Occasional AIME and olympiad appearances (Fibonacci representations, Wythoff and [[beatty-theorem|Beatty]] problems); the greedy algorithm together with uniqueness is essentially the whole toolkit.`,

"beatty-theorem": String.raw`## Why it works
The count of Beatty terms $\lfloor n\alpha\rfloor \le N$ is about $N/\alpha$, and similarly $N/\beta$ for the other sequence. Since $\frac1\alpha + \frac1\beta = 1$, the two counts add to $N$ for every $N$ — and irrationality prevents any collision — so together they hit each integer exactly once.

## How to use it
Given one irrational $\alpha > 1$, its partner is $\beta = \frac{\alpha}{\alpha - 1}$, and $\lfloor n\alpha\rfloor, \lfloor n\beta\rfloor$ tile $\mathbb{Z}^+$. Use it to prove two floor-sequences are complementary, or to answer "which set does $k$ fall in." It connects to floor-sum identities and to Wythoff's game (whose losing positions are the Beatty sequences for $\varphi$ and $\varphi^2$).

## On contests
Olympiad number theory / combinatorics — the "these two sequences partition the integers" gem. The density check $\frac1\alpha + \frac1\beta = 1$ is the whole idea.`,

"cauchy-davenport": String.raw`## Why it works
Working in $\mathbb{Z}_p$ (a field, so no zero divisors), a polynomial or transform argument shows the sumset $A + B$ cannot be too small: if it were smaller than $|A| + |B| - 1$ without filling $\mathbb{Z}_p$, a counting/degree contradiction appears. Primality is essential — for composite moduli subgroups let sumsets stay small.

## How to use it
It lower-bounds $|A + B|$ for subsets of $\mathbb{Z}_p$: repeatedly adding sets grows the sumset by $|A_i| - 1$ each step until it saturates at $p$. This is the base for showing certain sums hit every residue, and the springboard to Erdős–Ginzburg–Ziv and other additive results.

## On contests
Olympiad additive number theory. Remember the bound $\min(p, |A| + |B| - 1)$ and that it needs a prime modulus.`,

"erdos-ginzburg-ziv": String.raw`## Why it works
For prime $n = p$, iterate Cauchy–Davenport: pair up residues so their sumset grows to cover $0$, producing $p$ elements summing to $0 \bmod p$. The general $n$ follows multiplicatively from the prime case. The bound $2n - 1$ is sharp — $n-1$ zeros and $n-1$ ones have no $n$-subset summing to $0 \bmod n$.

## How to use it
Whenever you need "some $n$ of these have sum divisible by $n$," you only need $2n - 1$ integers to guarantee it. Useful in partition and divisibility-existence problems, often after reducing residues mod $n$.

## On contests
Olympiad number theory / combinatorics, the canonical zero-sum theorem. Pair it with Cauchy–Davenport (its engine) and remember the sharp count $2n - 1$.`,

"carmichael-numbers": String.raw`## Why it works
A [[fermat-numbers|Fermat pseudoprime]] slips past $b^{n-1} \equiv 1 \pmod n$ despite being composite. Korselt's criterion pins down the ones that fool every coprime base: $n$ must be squarefree with $(p-1) \mid (n-1)$ for each prime $p \mid n$ — then by [[crt|CRT]] the congruence holds for all bases. The smallest such $n$ is $561 = 3 \cdot 11 \cdot 17$ (and $2,10,16$ all divide $560$).

## How to use it
To test a candidate, check squarefreeness and the divisibility $(p-1)\mid(n-1)$ over its prime factors. The takeaway for primality: the Fermat test is not conclusive — Carmichael numbers are exactly its blind spot, which is why stronger tests (Miller–Rabin) are used.

## On contests
Olympiad number theory and "why the Fermat test fails" discussions. Keep it distinct from the Carmichael function $\lambda(n)$ — same name, unrelated object.`

});

Object.assign(window.MATH_DETAILS, {

"extended-euclidean-algorithm": String.raw`
## When to use
Whenever a computation needs the coefficients and not just the gcd: an inverse modulo a large number, a solution of $ax \equiv c \pmod m$, all nonnegative solutions of $21x + 8y = 100$, or the recombination step of the [[crt|Chinese Remainder Theorem]]. For a modulus under about $30$, guessing the inverse is faster; beyond that the algorithm is.

## How
1. Run the Euclidean algorithm on $a$ and $b$, writing each step as $r_{i-2} = q_i\,r_{i-1} + r_i$.
2. Stop at the last nonzero remainder, the gcd $g$.
3. Rewrite each step as $r_i = r_{i-2} - q_i\,r_{i-1}$ and substitute upward until $g$ is written in terms of $a$ and $b$.
4. For an inverse, reduce the coefficient of $a$ modulo $b$. For $ax + by = c$, scale by $\frac cg$, then add $t\left(\frac bg, -\frac ag\right)$ to get every solution.

For $21$ and $8$: $21 = 2 \cdot 8 + 5$, $8 = 1 \cdot 5 + 3$, $5 = 1 \cdot 3 + 2$, $3 = 1 \cdot 2 + 1$. Back-substituting, $$1 = 3 - 2 = 2 \cdot 3 - 5 = 2 \cdot 8 - 3 \cdot 5 = 8 \cdot 8 - 3 \cdot 21,$$ so $8^{-1} \equiv 8 \pmod{21}$, since $64 = 3 \cdot 21 + 1$.

## Why it works
Each remainder is an integer combination of the two numbers before it, and so, step by step, of $a$ and $b$ themselves. The remainders strictly decrease, so the process ends, and each step keeps the gcd, since a number dividing $r_{i-2}$ and $r_{i-1}$ divides $r_i$ and the other way round. The last nonzero remainder is therefore $\gcd(a, b)$, and it comes out as a combination $ax + by$.

The figure shows the same steps as squares cut from a $21 \times 8$ rectangle: each quotient counts how many squares of the shorter side fit, and the last square, of side $1$, is the gcd.

For $ax + by = c$, any common divisor of $a$ and $b$ divides the left side, so $g \mid c$ is necessary, and scaling the combination shows it is enough. Two solutions differ by a solution of $ax + by = 0$, and those are exactly the multiples of $\left(\frac bg, -\frac ag\right)$.

## Formulas it uses
- [[euclidean-algorithm]]: $\gcd(a, b) = \gcd(b, a \bmod b)$, the steps whose remainders the extended version records.
- [[bezouts-identity]]: the gcd is always an integer combination $ax + by$; the algorithm produces the coefficients.
- [[modular-inverse]]: when $\gcd(a, m) = 1$, the coefficient of $a$ in $ax + my = 1$ is $a^{-1} \bmod m$.

## Common traps
- Losing a sign while back-substituting; checking the final line, $8 \cdot 8 - 3 \cdot 21 = 1$, catches it.
- Stopping at one solution: counting nonnegative solutions needs the general step $\left(\frac bg, -\frac ag\right)$.
- Solving $ax \equiv c \pmod m$ without first checking $\gcd(a, m) \mid c$; when it divides, there are $\gcd(a, m)$ solutions modulo $m$.

## Contest profile
A computational step rather than the idea of a solution: it supplies the inverse or the particular solution that a congruence or linear-equation argument needs.
`

});

// Detail body added for a dense medium-importance card.
Object.assign(window.MATH_DETAILS, {

"gcd-substitution": String.raw`
## When to use
A problem names a gcd or an lcm and also a sum, a product, a ratio, or an equation linking them: $\gcd(a, b) = 6$ with $a + b = 84$, $\operatorname{lcm}(a, b) = 4\gcd(a, b)$, or a ratio $\frac ab$ given in lowest terms. It is usually the first line of the solution, written down before any other idea.

## How
1. Let $d = \gcd(a, b)$ and write $a = dx$ and $b = dy$ with $\gcd(x, y) = 1$.
2. Rewrite every condition: $a + b = S$ becomes $x + y = \frac Sd$, the lcm is $dxy$, and $ab = d^2xy$.
3. Use the coprimality: count coprime pairs, or move a factor from one side to the other.
4. Rebuild $a$ and $b$, and check them against the original conditions.

For $\gcd(a, b) = 6$ and $a + b = 84$: $x + y = 14$ with $\gcd(x, y) = 1$. A common divisor of $x$ and $y$ divides $14$, so the condition is $\gcd(x, 14) = 1$, which leaves $x = 1, 3, 5, 9, 11, 13$: six ordered pairs, or three unordered.

## Why it works
Dividing two numbers by their greatest common divisor leaves two numbers with nothing in common. If a prime $p$ divided both $x$ and $y$, then $pd$ would divide both $a$ and $b$, a common divisor larger than $d$, which is impossible. So $\gcd(x, y) = 1$. The figure shows the same argument with lengths.

{{figure:blocks}}

Coprime numbers share no prime, so every other condition simplifies. Their lcm is their product, which makes $\operatorname{lcm}(a, b) = dxy$. Their sum is coprime to their product, since a prime dividing $x$ and $x + y$ would divide $y$. And an equation such as $\gcd(a, b) + \operatorname{lcm}(a, b) = a + b$ divides by $d$ into $1 + xy = x + y$, that is, $(x - 1)(y - 1) = 0$: one number divides the other.

## Formulas it uses
- [[gcd-lcm-product]]: with coprime $x$ and $y$ the lcm is $dxy$, which is the identity $\gcd \cdot \operatorname{lcm} = ab$ in substituted form.
- [[euclids-lemma]]: if $x \mid yk$ and $\gcd(x, y) = 1$ then $x \mid k$, the step that pushes a factor from one side of an equation to the other.
- [[eulers-totient]]: with a fixed sum $x + y = n$, coprimality is $\gcd(x, n) = 1$, so the ordered pairs number $\varphi(n)$.

## Common traps
- Writing $a = dx$ and $b = dy$ but forgetting that $\gcd(x, y) = 1$ is the whole point, and then counting pairs that share a factor.
- Mixing ordered and unordered pairs at the end; $\varphi(n)$ counts ordered ones.
- Dividing a condition by $d$ when one of its terms is not a multiple of $d$; such a condition instead says $d$ divides that term.

## Contest profile
Usually the opening line rather than the whole solution: once the gcd is pulled out, coprimality and a short count finish.
`,

"periodicity-mod-m": String.raw`
## Distinguishing clues
Three shapes share the idea, and they repeat for different reasons. Remainders of a power or a recurrence repeat because the state, one residue or the last few, takes finitely many values, so by the [[pigeonhole|pigeonhole principle]] some state recurs. An iterated map can return to its starting point after a few steps, as fractional linear maps often do. A condition about divisibility by several small numbers repeats with period their least common multiple.

The cycle need not start at once. When the base is coprime to the modulus, its powers cycle from the first term, with period dividing $\varphi(m)$ by [[eulers-theorem|Euler's Theorem]]; when it shares a factor, there is a pre-period, and modulo $100$ the powers of $2$ first return to $4$, not to $2$.

## Methods and Formulas to Try
One cycle settles every case, so the work is finding the cycle, keeping it short, and reading the answer off it.

### Methods to try
- [[cycle-hunting]]: compute terms until a state repeats, note where the cycle starts and its length $T$, and replace the index $N$ by its position in the cycle, $a_N \equiv a_{\,n_0 + ((N - n_0) \bmod T)} \pmod m$.
- [[choose-modulus]]: split a composite modulus into prime powers and find the period of each, since the period modulo $m$ is the least common multiple of those periods; modulo $1000$, work modulo $8$ and $125$ separately.
- [[casework-method]]: when the question is a count, handle each position within one cycle separately, multiply by the number of full cycles, and add the partial cycle at the end.

### Formulas to try
- [[eulers-theorem]]: for a base coprime to $m$, the powers cycle from the first term with a period dividing $\varphi(m)$.
- [[multiplicative-order]]: the exact period of the powers of $a$ modulo $m$ is the order of $a$, the least $k \ge 1$ with $a^k \equiv 1 \pmod m$.
- [[crt]]: recombines the answers found modulo each prime power into the answer modulo $m$.

## Common traps
- Reducing the index by the period from the start when the cycle begins later.
- Taking $\varphi(m)$ as the period: the true period divides it, and only for a base coprime to $m$.
- Tracking one term of a recurrence when the next term depends on the last two or three.

## Contest profile
Usually the reduction step inside a larger count rather than the whole solution; casework over one period often finishes it.
`,

"sigma-parity": String.raw`## Why it works
$\sigma$ is multiplicative, so $\sigma(n)$ is odd iff every prime-power factor contributes an odd amount. For an odd prime $p$, the factor $1 + p + \cdots + p^e$ is a sum of $e+1$ odd terms, so it is odd iff $e+1$ is odd, i.e. $e$ is even. The factor from $2^a$ is $1 + 2 + \cdots + 2^a = 2^{a+1}-1$, which is always odd and never affects the parity. So $\sigma(n)$ is odd exactly when every odd prime appears to an even power — meaning the odd part of $n$ is a perfect square. Writing $n = 2^a m^2$ ($m$ odd), that happens for any $a$, and $2^a m^2$ is itself a square when $a$ is even and twice a square when $a$ is odd. Hence $\sigma(n)$ odd $\iff n$ is a square or twice a square.

## How to use it
Test the shape, do not compute the sum. Strip the factors of $2$ from $n$; if what remains is a perfect square then $\sigma(n)$ is odd, and otherwise it is even. Read backwards, the same criterion generates the candidates: if a problem needs $\sigma(n)$ odd, $n$ must be $m^2$ or $2m^2$, which is a far smaller search than the divisors themselves. For a product, apply it to each factor separately, since $\sigma$ is multiplicative and the parities multiply.

## On contests
It is the fast filter for "$\sigma(n)$ is odd/even" and a clean parity handle on sum-of-divisors problems — the same shape as the better-known $d(n)$ odd $\iff n$ a perfect square (there the count of divisors, not their sum, forces the pairing). Combined with $\sigma$ being multiplicative, it also settles parity of $\sigma$ for products quickly.`

});

Object.assign(window.MATH_DETAILS, {

"dirichlet-convolution": String.raw`## Why it works
Grouping divisors as $d\cdot\frac{n}{d}=n$ makes $*$ commutative and associative with identity $\varepsilon(n)=[n=1]$, and on prime powers the convolution of two multiplicative functions stays multiplicative — so any such identity reduces to one prime at a time. Möbius inversion is exactly the statement that $\mu$ is the $*$-inverse of $\mathbf 1$.

## How to use it
Recognize a divisor sum $\sum_{d\mid n} f(d)g(n/d)$ as a convolution and factor it over primes, or invert $g=f*\mathbf 1$ into $f=g*\mu$ to peel a summatory function back to its summand. Keep the staples handy: $\mu*\mathbf 1=\varepsilon$, $\varphi*\mathbf 1=\mathrm{id}$, $\mathrm{id}*\mathbf 1=\sigma$.

## On contests
Olympiad and advanced number theory; it is the clean framework for manipulating multiplicative functions and for any Möbius-inversion problem, replacing ad hoc divisor-sum algebra.`,

"jacobi-symbol": String.raw`## Why it works
Defining $\left(\frac{a}{n}\right)=\prod\left(\frac{a}{p_i}\right)^{e_i}$ inherits full multiplicativity in both arguments from the Legendre symbol, and for odd $n$ [[quadratic-reciprocity|quadratic reciprocity]] plus the $-1$ and $2$ supplements all survive — so the symbol can be flipped and reduced without ever factoring $n$.

## How to use it
Evaluate $\left(\frac{a}{p}\right)$ fast by treating it as a Jacobi symbol: reduce the top mod the bottom, extract $2$'s with the supplement, flip by reciprocity, and repeat, exactly like a [[euclidean-algorithm|Euclidean algorithm]]. Caution: for composite $n$ a value of $+1$ does not prove $a$ is a residue — only $-1$ is conclusive.

## On contests
An AIME-adjacent to olympiad computational tool; it is the practical way to decide [[squares-mod-small|quadratic residues]] quickly, and its lone pitfall (composite $+1$) is a favorite trap.`,

"gauss-lemma-qr": String.raw`## Why it works
The least residues of $a,2a,\dots,\frac{p-1}{2}a$ are, up to sign, a permutation of $1,\dots,\frac{p-1}{2}$; multiplying them and comparing with $\left(\frac{p-1}{2}\right)!$ leaves one factor of $-1$ for each residue that exceeded $p/2$, so $\left(\frac{a}{p}\right)=(-1)^{\mu}$.

## How to use it
Count $\mu$, the number of "folded-over" multiples, to read a Legendre symbol directly — cleanest for small fixed $a$, where it produces the closed formulas for $\left(\frac{2}{p}\right)$ and $\left(\frac{-1}{p}\right)$, and as the engine inside a reciprocity proof. Extending the symbol to composite lower arguments gives the [[jacobi-symbol|Jacobi symbol]], which is what makes the reciprocity flip practical to run by hand.

## On contests
Olympiad number theory; less a shortcut than the standard lemma for proving quadratic reciprocity and the supplementary laws from first principles.`,

"freshmans-dream": String.raw`## Why it works
Each middle coefficient $\binom{p}{k}$ with $0\lt k\lt p$ carries a factor of $p$ that the denominator cannot cancel, so mod $p$ every cross term dies and $(a+b)^p\equiv a^p+b^p$. Iterating raises the exponent to $p^m$; this is precisely the Frobenius map $x\mapsto x^p$.

## How to use it
Collapse $p$-th powers of sums mod $p$, prove Fermat's Little Theorem by induction ($n^p\equiv n$), and factor over $\mathbb F_p$ (for instance $x^p-x=\prod_{a}(x-a)$). It is the reason $\binom{p}{k}\equiv 0$ shows up so often.

## On contests
A recurring olympiad and AIME lemma; whenever a prime exponent meets a sum taken modulo that prime, this is the simplification to reach for.`,

"power-minus-self": String.raw`## Why it works
Fermat's Little Theorem gives $n^p\equiv n\pmod p$, and more generally $n^k\equiv n\pmod p$ for every $n$ exactly when $(p-1)\mid(k-1)$ (then $n^{k-1}\equiv 1$ for $\gcd(n,p)=1$, and both sides vanish when $p\mid n$). Multiplying all such primes gives the universal modulus.

## How to use it
To find the largest $m$ dividing $n^k-n$ for all $n$, list the primes $p$ with $(p-1)\mid(k-1)$ and multiply them (each once). So $n^3-n$ is always divisible by $6$, $n^5-n$ by $30$, $n^7-n$ by $42$, and $n^{13}-n$ by $2730$.

## On contests
A classic AMC/AIME divisibility fact; "$n^k-n$ is divisible by ___ for all $n$" turns immediately into the $(p-1)\mid(k-1)$ prime hunt.`,

"consecutive-product-factorial": String.raw`## Why it works
The product of $k$ consecutive integers equals $k!\binom{n+k-1}{k}$, and binomial coefficients are integers, so $k!$ always divides it. Concretely, among any $k$ consecutive integers one is a multiple of $k$, one of $k-1$, and so on down.

## How to use it
Invoke it to prove products divisible and binomial-type expressions integral: two consecutive integers give an even product, three a multiple of $6$, and $k$ a multiple of $k!$. It also bounds the prime valuations of factorials and falling factorials.

## On contests
A staple divisibility and parity tool from MATHCOUNTS through AIME; "the product of $k$ consecutive integers is divisible by $k!$" resolves many "show this is an integer / is divisible" problems in a line.`,

"chevalley-warning": String.raw`## Why it works
Summing the indicator of the common zero set over $\mathbb F_p^{\,n}$ and using that $\sum_{x\in\mathbb F_p}x^t\equiv 0$ unless $(p-1)\mid t$, the degree bound $\sum\deg f_i\lt n$ forces that sum to vanish mod $p$ — so the number of common zeros is a multiple of $p$.

## How to use it
When the $f_i$ over $\mathbb F_p$ have degrees summing below the number of variables, the zero count is divisible by $p$; and if the $f_i$ have no constant term then $x=0$ is a zero, so a nonzero zero must also exist. That existence step is the usual payoff (e.g. the [[erdos-ginzburg-ziv|Erdős–Ginzburg–Ziv Theorem]]).

## On contests
Olympiad number theory and combinatorics; it is the standard nonconstructive tool for "show a nontrivial solution exists mod $p$" and for divisibility of solution counts.`,

"odd-divisor-count": String.raw`
## Distinguishing clues
The clue is an action indexed by divisors: person $k$ touches every multiple of $k$, so item $n$ is touched once for each divisor of $n$, and only the parity of that count matters. A question about the sum of the divisors is different, since $\sigma(n)$ is odd when $n$ is a square or twice a square, and a question about the exact number of divisors is plain divisor counting.

## Methods and Formulas to Try
Divisors pair off, $d$ with $\frac nd$, and the only divisor that can be its own partner is $\sqrt n$. So a number has an odd number of divisors exactly when it is a perfect square, and from $1$ to $N$ there are $\lfloor \sqrt N \rfloor$ such numbers.

{{figure:pairs}}

### Methods to try
- [[factor-pair-counting]]: pair each divisor $d$ with $\frac nd$; the pairing shows the count is even unless some $d$ equals $\frac nd$, which happens exactly when $n = d^2$.
- [[exponent-tracking]]: $d(n) = (e_1 + 1)(e_2 + 1)\cdots$ is odd exactly when every exponent is even, the same conclusion from the factorization, and the route for a stated count such as exactly $15$ divisors, which forces $n = p^{14}$ or $n = p^2q^4$.

### Formulas to try
- [[number-of-divisors]]: $d(n) = \prod (e_p + 1)$, which is odd exactly when every $e_p$ is even.
- [[product-of-divisors]]: pairing the divisors multiplies them to $n^{d(n)/2}$, the same pairing argument with products.
- [[sigma-parity]]: for the sum of the divisors the answer changes, to squares and twice squares.

## Common traps
- Answering with the odd numbers instead of the perfect squares.
- Forgetting that $1$ is a perfect square, with a single divisor.
- Applying the square rule to the sum of the divisors, where twice a square also gives an odd sum.

## Contest profile
A one-step recognition: once the actions are seen to happen once per divisor, the answer is a count of perfect squares.
`,

"cryptarithms": String.raw`
## Distinguishing clues
Letters stand for digits, different letters for different digits, inside a written calculation with column structure. If the letters stand for whole unknown numbers, or the same digit may appear under different letters, the problem is ordinary algebra or a [[digit-manipulation|digit-manipulation problem]] instead.

## Methods and Formulas to Try
Work column by column from the right, where each column is an equation with a carry. In the sum of two numbers every carry is $0$ or $1$, so each column has only a couple of cases. The figure solves $\overline{TWO} + \overline{TWO} = \overline{FOUR}$ as $734 + 734 = 1468$.

### Methods to try
- [[casework-method]]: split on the carry out of each column and on the few values of the most constrained letter, starting at the column with the fewest unknowns.
- [[choose-modulus]]: modulo $9$ a number is congruent to its digit sum, so the whole equation becomes one congruence in the digits; modulo $2$ or $5$ settles the last column.
- [[bounding-diophantine]]: size pins the leading letters; two three-digit numbers sum to less than $2000$, so a fourth digit in the answer must be $1$.

### Formulas to try
- [[divisibility-rules]]: digit sums modulo $9$ and alternating digit sums modulo $11$ turn a word into a single congruence.
- [[base-conversion]]: a word is its place-value expansion, $\overline{ABC} = 100A + 10B + C$, and the same expansion with base $b$ handles puzzles in other bases.

## Common traps
- Allowing a carry of $2$ in the sum of two numbers, or forgetting that three or more addends can carry more.
- Dropping the distinctness condition halfway through the casework.
- Giving a leading letter the digit $0$.

## Contest profile
Mostly MATHCOUNTS and early AMC: a short column-by-column argument, with a little casework when the question counts the assignments.
`,

"base10-curiosities": String.raw`## Why it works
The cyclic run of $142857$ is just the six-digit repeating block of $\frac17$ — $10$ is a primitive root mod $7$, so the period is full and multiplying by $1$–$6$ rotates the digits. Narcissistic numbers and Kaprekar's routine are finite digit-map facts you can check directly.

The repunit family explains most of the rest. A string of $n$ ones is $\frac{10^n-1}{9}$, which is why $\frac19=0.\overline{1}$, $\frac1{99}=0.\overline{01}$, and $\frac1{999}=0.\overline{001}$, and why squaring a repunit of length $n\le9$ gives the palindrome $123\ldots n\ldots321$. The $1089$ trick is the same base-ten bookkeeping: reversing a three-digit number and subtracting always leaves a multiple of $99$, and adding that result to its own reverse always gives $1089$ — whose ninefold, $9801$, is itself reversed.

## How to use it
Recognize $142857$ (with $\frac27,\dots,\frac67$ as its rotations, and $\times 7=999999$) on sight, and remember that Kaprekar's routine on a four-digit number with non-identical digits reaches $6174$ within a few steps. These are recall aids, not deep theorems.

## On contests
Light MATHCOUNTS / trivia territory, but occasionally an AMC problem rewards spotting the $142857$ cycle or a repeating-decimal period — worth carrying as instant recall.`

});

Object.assign(window.MATH_DETAILS, {

"p-adic-valuation": String.raw`## Why it works
Unique factorization makes $v_p$ additive — the power of $p$ in a product is the sum of the powers, exactly like a logarithm for a single prime. The ultrametric bound holds because $p^{\min}$ divides both terms; when the two valuations differ, the smaller power survives the sum uncancelled, forcing equality there. Divisibility statements translate the same way: $v_p(\gcd(m,n))$ is the minimum of the two valuations and $v_p(\operatorname{lcm}(m,n))$ the maximum, and for factorials [[legendres-formula|Legendre's Formula]] gives $v_p(n!)=\sum_{i\ge1}\lfloor n/p^i\rfloor$.

## How to use it
Take $v_p$ of both sides of a divisibility statement or equation to turn it into linear arithmetic on exponents: $p^k \mid N \iff v_p(N)\ge k$, a perfect square needs every $v_p$ even, and "how many factors of $p$" becomes a sum. The equality case of the ultrametric bound is exactly the engine behind [[lte-lemma|Lifting the Exponent]].

## On contests
The backbone of AIME and olympiad prime-power problems, and the language in which LTE, Legendre's Formula, and [[kummers-theorem|Kummer's Theorem]] are all phrased — reach for it whenever only the power of one prime matters.`,


"euclids-lemma": String.raw`
## Why it works
The proof runs through [[bezouts-identity|Bézout's Identity]]: since $\gcd(a, b) = 1$, there are integers $x$ and $y$ with $ax + by = 1$.

Multiplying by $n$ gives $$anx + bny = n.$$ The first term is a multiple of $b$ because $b \mid an$ was assumed, and the second plainly is, so $b$ divides their sum, $n$.

The prime version is the special case $b = p$. If $p \nmid a$, then $\gcd(p, a) = 1$, because the only divisors of $p$ are $1$ and $p$, so $p \mid ab$ forces $p \mid b$. Primality matters: $6 \mid 4 \cdot 9$, but $6$ divides neither $4$ nor $9$.

## How to use it
Use it whenever a divisibility has to survive a cancellation. If $\frac{an}{b}$ is an integer and $b$ shares no factor with $a$, then $b \mid n$, which usually pins a variable to a multiple of something: $\frac{13n}{6}$ being an integer forces $6 \mid n$.

It also makes lowest terms rigid. Once a rational number is written as $\frac pq$ with $\gcd(p, q) = 1$, a condition like $q \mid kp$ forces $q \mid k$. When the gcd is not yet $1$, pull the common factor out first with [[gcd-substitution|gcd substitution]], and what remains is coprime by construction.

Unique factorization follows by applying it one prime at a time: a prime dividing a product of primes must be one of them, so two factorizations of the same number can be matched prime by prime.

## On contests
Two problems here, both AIME, neither solved by it alone: one uses it after gcd substitution has made two numbers coprime, and the other to decide when a repeated rotation first returns to its start. It is the invisible step in a large share of AIME number theory, rarely named in a solution even when it does the work.
`,

"digit-sum-carries": String.raw`
## Why it works
Adding two digits in a column either stays below ten or does not. When it does not, the column keeps the sum minus ten and hands one unit to the next column, so the digit sum loses $10$ and gains $1$, a net drop of $9$. Each carry contributes that independently: $$s(a + b) = s(a) + s(b) - 9c.$$

In base $b$ the same accounting gives a drop of $b - 1$. It is also why $n \equiv s(n) \pmod 9$: every correction is a multiple of $9$, which is why [[divisibility-rules|digit sums work mod 9]].

## How to use it
Use it in whichever direction is short. Forwards it predicts a digit sum without doing the addition; backwards it counts the carries, $$c = \frac{s(a) + s(b) - s(a + b)}{9},$$ which is often the real question in disguise.

"No carrying required" is the most common phrasing. Read column by column it says each column adds to at most $9$, so the digits in different places are chosen independently and the count is a product.

When a number is added to itself, a column carries exactly when its digit is $5$ or more, so $s(2n) = 2s(n) - 9 \cdot \#\{\text{digits} \ge 5\}$.

## On contests
Three problems here, all AIME, none solved by it alone. Typical questions count pairs that add to a given number without carrying, one independent choice per column; find which values $|s(x + 2) - s(x)|$ can take, $2$ and then $9n - 2$; or require a fixed number of carries when a given number is added. The carry count also drives [[kummers-theorem|Kummer's Theorem]], where it gives the power of a prime dividing a binomial coefficient.`,

"largest-odd-divisor-sum": String.raw`
## Key forms
- $f(2n) = f(n)$ and $f(2n+1) = 2n+1$ — halving an even number keeps its largest odd divisor
- $S(2m) = m^2 + S(m)$ and $S(2m+1) = (m+1)^2 + S(m)$ — the odd numbers contribute a square, the even ones a copy of the sum up to half
- $S(2^k) = \frac{4^k + 2}{3}$ — the recurrence unwound from $S(1) = 1$
- $S(n) = \alt{\sum_{j \ge 0} \left\lceil \tfrac12 \lfloor n/2^j \rfloor \right\rceil^2}{\left\lceil \tfrac n2 \right\rceil^2 + \left\lceil \tfrac12 \lfloor \tfrac n2 \rfloor \right\rceil^2 + \left\lceil \tfrac12 \lfloor \tfrac n4 \rfloor \right\rceil^2 + \cdots}$ — each round of halving adds the square of its count of odd numbers

## Why it works
Split the numbers by parity, and the even half is a smaller copy of the same sum.

The odd numbers from $1$ to $2m - 1$ are their own largest odd divisors, and the first $m$ odd numbers add to $m^2$. Each even number $2j$ with $j \le m$ has the same largest odd divisor as $j$, since halving removes only a factor of $2$, so the even numbers contribute $f(1) + \cdots + f(m) = S(m)$. That gives $S(2m) = m^2 + S(m)$; up to $2m + 1$ there are $m + 1$ odd numbers, so $S(2m+1) = (m+1)^2 + S(m)$. For $n = 10$, $$S(10) = 5^2 + S(5) = 25 + 3^2 + S(2) = 25 + 9 + 2 = 36,$$ which matches $1 + 1 + 3 + 1 + 5 + 3 + 7 + 1 + 9 + 5$.

For a power of $2$ the recurrence telescopes: $$S(2^k) = 4^{k-1} + 4^{k-2} + \cdots + 4^0 + S(1) = \frac{4^k - 1}{3} + 1 = \frac{4^k + 2}{3}.$$

## Useful observations
- Every $k$ is its largest odd divisor times the highest power of $2$ dividing it, $k = 2^{v_2(k)} f(k)$, the same split the [[odd-part-chains|odd-part chains]] method uses, so a sum of those powers of $2$ yields to the same halving.
- $S(n)$ is close to $\frac{n^2}{3}$, a quick check on any computed value: $S(64) = 1366$ against $\frac{64^2}{3} \approx 1365$.

## Applications
Sums over $1, 2, \ldots, n$ of a quantity that depends only on the odd part of each number, such as the largest odd divisor or the highest power of $2$.
`,
});
