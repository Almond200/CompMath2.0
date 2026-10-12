// Extended detail-page write-ups for Number Theory, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"gcd-lcm-product": String.raw`
## Key forms
- $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab$
- prime by prime: $\gcd \leftrightarrow \min(e_p, f_p)$ and $\operatorname{lcm} \leftrightarrow \max(e_p, f_p)$
- with $g = \gcd(a, b)$: $a = gm$, $b = gn$, $\gcd(m, n) = 1$, and $\operatorname{lcm}(a, b) = gmn$

## Conditions
$a$ and $b$ are positive integers. For three or more numbers the identity fails: $\gcd(2, 4, 8) \cdot \operatorname{lcm}(2, 4, 8) = 16$, not $64$.

## Why it works
The gcd and the lcm are both built one prime at a time, and for each prime they share out the two exponents exactly.

Write $a = \prod p^{e_p}$ and $b = \prod p^{f_p}$, allowing exponents of $0$. A number divides both exactly when its exponent of each prime is at most $\min(e_p, f_p)$, so $\gcd(a, b) = \prod p^{\min(e_p, f_p)}$; it is a multiple of both exactly when each exponent is at least $\max(e_p, f_p)$, so $\operatorname{lcm}(a, b) = \prod p^{\max(e_p, f_p)}$. With two numbers, $\min + \max = e_p + f_p$, and multiplying over all primes gives $ab$.

{{figure:exponents}}

## Useful observations
- Any three of $a$, $b$, $\gcd(a, b)$ and $\operatorname{lcm}(a, b)$ determine the fourth.
- A number with $k$ distinct prime factors splits as $mn$ with $\gcd(m, n) = 1$ in exactly $2^k$ ordered ways, which counts the pairs with a given gcd and lcm.
- $\gcd(a, b)$ always divides $\operatorname{lcm}(a, b)$, and they are equal only when $a = b$.

## Applications
Pairs and triples of integers with prescribed gcds and lcms, and the relation between a pair's product and its common structure.

## Contest profile
The bare identity is an AMC fact; AIME problems turn gcd and lcm conditions into conditions on exponents, prime by prime.
`,

"euclidean-algorithm": String.raw`
## Key forms
- $\gcd(a, b) = \gcd(b, a \bmod b)$, and more generally $\gcd(a, b) = \gcd(b, a - qb)$ for any integer $q$
- $\gcd(d, 0) = d$, which ends the algorithm
- the last nonzero remainder is the gcd

## Conditions
$a$ and $b$ are integers, not both $0$. The same rule holds for polynomials, with polynomial division in place of integer division.

## Why it works
Replacing $a$ by $a - qb$ keeps exactly the same common divisors, so it keeps the gcd, while the numbers shrink until the answer can be read off.

If $d$ divides $a$ and $b$, it divides $a - qb$; conversely, if $d$ divides $b$ and $a - qb$, it divides $(a - qb) + qb = a$. So $(a, b)$ and $(b, a - qb)$ have the same common divisors. Each step makes the pair smaller, because the remainder is less than $b$, so the process stops, at a pair $(d, 0)$ whose gcd is $d$.

A rectangle shows the same steps: cutting as many $b \times b$ squares as possible from an $a \times b$ rectangle leaves a $b \times r$ strip, and the last square size fills its strip exactly, so it measures both sides.

{{figure:tiling}}

## Useful observations
- Every two steps at least halve the larger number, so even large pairs finish in a few lines: $\gcd(252, 105) = \gcd(105, 42) = \gcd(42, 21) = \gcd(21, 0) = 21$.
- On expressions it ends at a constant: $\gcd(n + 3, n^2 + 7) = \gcd(n + 3, 16)$, since $n^2 + 7 = (n + 3)(n - 3) + 16$.
- Two linear expressions with a combination equal to $1$ are always coprime: $5(2n + 1) - 2(5n + 2) = 1$, so $\gcd(2n + 1, 5n + 2) = 1$ and $\frac{2n + 1}{5n + 2}$ is always in lowest terms.
- Running the steps backwards writes the gcd as $ax + by$, which is [[bezouts-identity|Bézout's Identity]]; for $252$ and $105$, $21 = 5 \cdot 105 - 2 \cdot 252$.

## Applications
Greatest common divisors of numbers and of expressions in a variable, fractions in lowest terms, modular inverses, and the coefficients in Bézout's Identity.

## Contest profile
A frequent AIME step, usually in a problem asking for how many integers make a fraction reducible, where the algorithm on expressions ends at a constant.
`,

"bezouts-identity": String.raw`
## Key forms
- $ax + by = \gcd(a, b)$ has integer solutions
- $ax + by = c$ is solvable $\iff \gcd(a, b) \mid c$
- with $g = \gcd(a, b)$ and one solution $(x_0, y_0)$, all solutions are $\left(x_0 + \frac bg t,\ y_0 - \frac ag t\right)$, $t \in \mathbb Z$

## Conditions
$a$ and $b$ are integers, not both $0$; $x$ and $y$ may be negative. Requiring $x, y \ge 0$ is a different question, answered for coprime $a$, $b$ by the Chicken McNugget Theorem.

## Why it works
Let $S$ be the set of numbers $ax + by$. It is closed under addition and subtraction, so if $s$ is its least positive element, dividing any element by $s$ leaves a remainder that is also in $S$ and smaller than $s$, hence $0$. So $S$ is exactly the multiples of $s$. Since $a$ and $b$ are in $S$, $s$ divides both; and every common divisor of $a$ and $b$ divides every element of $S$, including $s$. So $s = \gcd(a, b)$.

For the solution family: if $ax_0 + by_0 = c$ and $ax + by = c$, then $a(x - x_0) = -b(y - y_0)$, and dividing by $g$ leaves coprime coefficients, so $\frac bg$ divides $x - x_0$.

## Useful observations
- The coefficients of a relation $ax + by = 1$ are inverses: from $3 \cdot 5 - 2 \cdot 7 = 1$, $3$ is the inverse of $5$ modulo $7$, and $-2 \equiv 3$ is the inverse of $7$ modulo $5$.
- $a$ has an inverse modulo $m$ exactly when $\gcd(a, m) = 1$, since $ax + my = 1$ says $ax \equiv 1 \pmod m$.
- Running the Euclidean algorithm backwards produces one solution explicitly.

## Applications
Linear Diophantine equations, modular inverses, and existence statements about integer combinations.

## Contest profile
Usually a supporting fact: a linear equation in integers or a modular inverse appears inside a longer problem.
`,

"divisibility-rules": String.raw`
## Key forms
- $n \equiv s(n) \pmod 9$, where $s(n)$ is the digit sum
- $n \equiv$ alternating digit sum (from the right) $\pmod{11}$
- $4$: last two digits; $8$: last three digits; $5$ and $10$: last digit
- alternating sums of $k$-digit blocks give $n \bmod (10^k + 1)$; plain block sums give $n \bmod (10^k - 1)$

## Conditions
The rules are for base $10$. In base $b$ the digit sum gives the remainder mod $b - 1$ and the alternating sum the remainder mod $b + 1$.

## Why it works
A number is a sum of its digits times powers of $10$, so its remainder depends only on the remainders of those powers. Since $10 \equiv 1 \pmod 9$, every power of $10$ is $1$ mod $9$, and a number leaves the same remainder as its digit sum. Since $10 \equiv -1 \pmod{11}$, the powers alternate between $1$ and $-1$, giving the alternating sum. Since $100$ is divisible by $4$ and $1000$ by $8$, everything but the last two or three digits is a multiple of $4$ or $8$.

Reading digits in blocks of $k$ writes the number in base $10^k$, and $10^k \equiv -1 \pmod{10^k + 1}$, so the blocks alternate in sign: two-digit blocks for $101$, three-digit blocks for $1001 = 7 \cdot 11 \cdot 13$.

{{figure:blocks}}

## Useful observations
- Repeating a three-digit block multiplies by $1001 = 7 \cdot 11 \cdot 13$, so $\overline{abcabc} = \overline{abc} \cdot 1001$ is always divisible by $7$, $11$, and $13$.
- Three-digit block sums give the remainder mod $999 = 27 \cdot 37$, the quick test for $37$.
- The digital root, the result of repeated digit sums, is $1 + ((n - 1) \bmod 9)$ for $n \ge 1$.
- A composite modulus splits into coprime pieces: divisible by $72$ means divisible by $8$ and by $9$.

## Applications
Missing-digit puzzles, numbers built from digit patterns, remainders of large numbers, and checks on arithmetic by casting out nines.

## Contest profile
MATHCOUNTS and AMC use the rules for missing digits; AIME problems use them as exact remainders on numbers defined by their digits.
`,

"gcd-power-minus-one": String.raw`
## Key forms
- $\gcd(a^m - 1, a^n - 1) = a^{\gcd(m, n)} - 1$
- $a^m - 1 \mid a^n - 1 \iff m \mid n$, for $a \ge 2$
- for repunits $R_k = \frac{10^k - 1}{9}$: $\gcd(R_m, R_n) = R_{\gcd(m, n)}$

## Conditions
$a \ge 2$ and $m, n \ge 1$ are integers. The same holds for $a^m - b^m$ and $a^n - b^n$ with $\gcd(a, b) = 1$: their gcd is $a^{\gcd(m, n)} - b^{\gcd(m, n)}$.

## Why it works
If $m = qn + r$, then $a^m - 1 = a^r(a^{qn} - 1) + (a^r - 1)$, and $a^{qn} - 1$ is divisible by $a^n - 1$, since $x - 1$ divides $x^q - 1$ with $x = a^n$. So $a^m - 1 \equiv a^r - 1 \pmod{a^n - 1}$, and $$\gcd(a^m - 1, a^n - 1) = \gcd(a^n - 1, a^r - 1).$$ The exponents $(m, n) \to (n, r)$ follow exactly the Euclidean algorithm, which ends at $\gcd(m, n)$, and the numbers end at $a^{\gcd(m, n)} - 1$.

## Useful observations
- The gcd collapses to the gcd of the exponents, so enormous numbers reduce to a small one: $\gcd(2^{100} - 1, 2^{36} - 1) = 2^{\gcd(100, 36)} - 1 = 15$.
- $2^n - 1$ can be prime only when $n$ is prime, since $2^d - 1$ divides it for every divisor $d$ of $n$.
- $\gcd(2^m + 1, 2^m - 1) = 1$, and $\gcd(a^m + 1, a^n - 1)$ follows from writing $a^m + 1 = \frac{a^{2m} - 1}{a^m - 1}$.

## Applications
Gcds and divisibility of Mersenne-type numbers and repunits, and orders of $a$ modulo a number.

## Contest profile
An AIME tool for gcds with huge exponents, where the answer is read from the gcd of the exponents.
`,

"consecutive-coprime": String.raw`
## Key forms
- $\gcd(n, n + 1) = 1$
- $\gcd(n, n + k) = \gcd(n, k)$, a divisor of $k$
- $k \text{ consecutive integers} \implies k! \mid$ their product

## Conditions
$n$ and $k$ are integers. The product statement includes products containing $0$ or negative numbers.

## Why it works
A common divisor of $n$ and $n + k$ divides their difference, $k$, and conversely $\gcd(n, n + k) = \gcd(n, k)$ by one step of the Euclidean algorithm; with $k = 1$ the gcd is $1$.

Among $k$ consecutive integers the remainders mod $k$ are all different, so exactly one is $0$. For the product, $(n + 1)(n + 2)\cdots(n + k) = k!\binom{n + k}{k}$ when $n \ge 0$, and a binomial coefficient is an integer.

## Useful observations
- $n(n + 1)$ is never a perfect square for $n \ge 1$: the factors are coprime, so both would be squares, and no two positive squares differ by $1$.
- The product of two consecutive integers is even, of three is divisible by $6$, and of four by $24$.
- $\gcd(n, n + 2)$ is $1$ or $2$, according to the parity of $n$.

## Applications
Arguments that a product of consecutive integers is not a perfect power, divisibility of such products, and fractions that are automatically in lowest terms.

## Contest profile
A supporting fact: it keeps the primes of adjacent numbers apart, which splits a product condition into conditions on each factor.
`,

"number-of-divisors": String.raw`
## Key forms
- $n = p_1^{e_1}\cdots p_k^{e_k} \implies d(n) = (e_1 + 1)\cdots(e_k + 1)$
- $d(n)$ is odd $\iff n$ is a perfect square
- $d(mn) = d(m)\,d(n)$ when $\gcd(m, n) = 1$

## Conditions
$n$ is a positive integer, and only positive divisors are counted, including $1$ and $n$. Counting divisors with a property, such as even divisors or square divisors, restricts the exponent choices prime by prime.

## Why it works
A divisor is built by choosing, separately for each prime, how many copies of it to use, and the numbers of choices multiply. For $360 = 2^3 \cdot 3^2 \cdot 5$, a divisor is $2^a3^b5^c$ with $0 \le a \le 3$, $0 \le b \le 2$, $0 \le c \le 1$; every such choice divides $360$, and different choices give different numbers, so there are $4 \cdot 3 \cdot 2 = 24$ divisors. Each prime offers one more choice than its exponent because leaving it out, exponent $0$, is a choice too.

The product $(e_1 + 1)\cdots(e_k + 1)$ is odd only if every factor is odd, that is, every exponent is even, which is what it means for $n$ to be a perfect square.

## Useful observations
- Running the formula backwards lists the shapes with a given count: exactly $12$ divisors means $p^{11}$, $p^5q$, $p^3q^2$ or $p^2qr$.
- To make a number with a given divisor count as small as possible, give the largest exponents to the smallest primes and compare the shapes: for $12$ divisors they give $2048$, $96$, $72$, and $60 = 2^2 \cdot 3 \cdot 5$, the smallest.
- The divisors of $n$ that are perfect squares number $\prod\left(\left\lfloor \frac{e_i}{2} \right\rfloor + 1\right)$.
- Divisors pair as $m$ and $\frac nm$, with only $\sqrt n$ paired with itself, which is why only squares have an odd number of divisors: anything switched once per divisor, like lockers toggled by every $k$th student, ends switched exactly at the perfect squares.

{{figure:pairs}}

## Applications
Counting divisors, counting divisors with a property, numbers with a prescribed number of divisors, and the divisors of factorials once their factorizations are known.

## Contest profile
Among the most tested number theory facts at every level, usually after a divisibility condition has cut down the possible exponent patterns.

## Full proof
Let $n = p_1^{e_1}\cdots p_k^{e_k}$ with distinct primes. If $m$ divides $n$, every prime of $m$ divides $n$, so $m = p_1^{f_1}\cdots p_k^{f_k}$, and unique factorization of $n = m \cdot \frac nm$ gives $f_i \le e_i$. Conversely, if $0 \le f_i \le e_i$, then $\frac nm = \prod p_i^{e_i - f_i}$ is an integer. Distinct exponent lists give distinct numbers, so the divisors correspond to the lists, and there are $(e_1 + 1)\cdots(e_k + 1)$ of them.
`,

"sum-of-divisors": String.raw`
## Key forms
- $\sigma(n) = \alt{\prod_i (1 + p_i + \cdots + p_i^{e_i})}{(1 + p_1 + \cdots + p_1^{e_1})\cdots(1 + p_k + \cdots + p_k^{e_k})} = \alt{\prod_i \frac{p_i^{e_i + 1} - 1}{p_i - 1}}{\frac{p_1^{e_1 + 1} - 1}{p_1 - 1}\cdots\frac{p_k^{e_k + 1} - 1}{p_k - 1}}$
- $\sigma(mn) = \sigma(m)\,\sigma(n)$ when $\gcd(m, n) = 1$
- the reciprocals of the divisors of $n$ add up to $\frac{\sigma(n)}{n}$

## Conditions
$n$ is a positive integer. A restricted sum, such as the sum of the odd or even divisors, comes from the same product with the disallowed powers of a prime removed from its bracket.

## Why it works
Expanding the product picks one term from each bracket, a power of each prime, and multiplies them. By unique factorization every divisor of $n$ is exactly one such choice, so the expansion lists each divisor once and the product is their sum.

{{figure:grid}}

Each bracket is the geometric series $1 + p + \cdots + p^e = \frac{p^{e+1} - 1}{p - 1}$, which gives the closed form. Counting each term as $1$ instead of its value gives the number of divisors, $(e_1 + 1)\cdots(e_k + 1)$.

## Useful observations
- The sum is computed one prime power at a time, each factor a short geometric series: $\sigma(72) = \sigma(2^3)\,\sigma(3^2) = 15 \cdot 13 = 195$.
- The odd divisors of $n$ sum to $\sigma$ of the odd part of $n$, and the even divisors to the rest.
- $n$ is perfect when $\sigma(n) = 2n$; the even perfect numbers are $2^{p-1}(2^p - 1)$ with $2^p - 1$ prime.
- Divisors pair as $d$ and $\frac nd$, so the reciprocals of the divisors sum to $\frac{\sigma(n)}{n}$.

## Applications
Sums of divisors and of restricted sets of divisors, perfect and abundant numbers, and sums of reciprocals of divisors.

## Contest profile
An AMC and AIME computation, usually a restricted sum split by the power of $2$ or a divisibility condition on each geometric bracket.
`,

"product-of-divisors": String.raw`
## Key forms
- the product of all divisors of $n$ is $n^{d(n)/2}$
- product of the proper divisors $= n^{d(n)/2 - 1}$
- the logarithms of all divisors of $n$ add up to $\frac{d(n)}{2}\log n$

## Conditions
$n$ is a positive integer. The formula gives an integer even when $d(n)$ is odd, since then $n$ is a perfect square.

## Why it works
The map $d \mapsto \frac nd$ sends divisors to divisors and undoes itself, so listing the divisors in the order $\frac nd$ gives the same divisors again. Multiplying the two lists term by term, $$\left(\prod_{d \mid n} d\right)^2 = \prod_{d \mid n} d \cdot \frac nd = n^{d(n)},$$ so the product is $n^{d(n)/2}$. Squaring first avoids a special case for perfect squares.

## Useful observations
- When $n$ is not a square the divisors pair off exactly, so the product is a whole power of $n$: $42 = 2 \cdot 3 \cdot 7$ has $8$ divisors, whose product is $42^4$.
- The product of the proper divisors equals $n$ exactly when $d(n) = 4$, that is, $n = pq$ or $n = p^3$.
- Logarithms turn the product into a sum, so the logarithms of the divisors add up to $\frac{d(n)}{2}\log n$: the $49$ divisors of $10^6$ have base-$10$ logarithms summing to $\frac{49}{2} \cdot 6 = 147$.

## Applications
Products and sums of logarithms of divisors, and conditions on the product of proper divisors.

## Contest profile
Short AMC and AIME questions, often disguised as a sum of logarithms of all the divisors.
`,

"eulers-totient": String.raw`
## Key forms
- $\varphi(n) = \alt{n\prod_{p \mid n}\left(1 - \frac1p\right)}{n\left(1 - \frac{1}{p_1}\right)\cdots\left(1 - \frac{1}{p_k}\right)}$, over the distinct primes dividing $n$
- $\varphi(p^k) = p^k - p^{k-1}$
- $\varphi(mn) = \varphi(m)\,\varphi(n)$ when $\gcd(m, n) = 1$

## Conditions
$n$ is a positive integer, with $\varphi(1) = 1$. Only the distinct primes of $n$ enter the product; the exponents matter only through $n$ itself.

## Why it works
Removing the multiples of each prime factor of $n$ leaves exactly the numbers coprime to $n$, and for different primes the removals are independent.

For a prime power it is a direct count: among $1, \ldots, p^k$ the numbers sharing a factor with $p^k$ are the $p^{k-1}$ multiples of $p$, so $\varphi(p^k) = p^k - p^{k-1}$. For coprime $m$ and $n$, the Chinese Remainder Theorem matches each residue mod $mn$ with a pair of residues mod $m$ and mod $n$, and a number is coprime to $mn$ exactly when it is coprime to both, so $\varphi(mn) = \varphi(m)\varphi(n)$.

Multiplying the prime-power values gives the product formula, which inclusion-exclusion on the multiples of each prime also produces.

## Useful observations
- The product form needs only the distinct primes, not their exponents: $\varphi(1000) = 1000 \cdot \frac12 \cdot \frac45 = 400$.
- $\varphi(n)$ is even for $n \gt 2$, since $k$ and $n - k$ are coprime to $n$ together.
- The fractions $\frac an$ in lowest terms with $0 \lt a \lt n$ number $\varphi(n)$, and the pairs of positive coprime integers with sum $n$ also number $\varphi(n)$.
- If a prime $p$ divides $n$, then $p - 1$ divides $\varphi(n)$, which bounds the solutions of $\varphi(n) = k$.

## Applications
Counts of reduced fractions and coprime residues, star polygons, the exponent in Euler's Theorem, and the order of the group of units mod $n$.

## Contest profile
An AIME counting fact, usually disguised as reduced fractions or coprime step sizes.
`,

"totient-divisor-sum": String.raw`
## Key forms
- $\alt{\sum_{d \mid n}\varphi(d)}{\varphi(d_1) + \cdots + \varphi(d_r)} = n$, over the divisors of $n$
- the $k \le n$ with $\gcd(k, n) = g$ number $\varphi\left(\frac ng\right)$
- $\alt{\sum_{k=1}^{n}\gcd(k, n) = \sum_{d \mid n} d\,\varphi\left(\frac nd\right)}{\gcd(1, n) + \cdots + \gcd(n, n) = d_1\varphi\left(\frac{n}{d_1}\right) + \cdots + d_r\varphi\left(\frac{n}{d_r}\right)}$

## Conditions
$n$ is a positive integer and $d$ runs over all its positive divisors, including $1$ and $n$.

## Why it works
Sort the fractions $\frac1n, \frac2n, \ldots, \frac nn$ by the denominator each one reduces to. The fraction $\frac kn$ reduces to denominator $d = \frac{n}{\gcd(k, n)}$, with a numerator coprime to $d$; conversely, every fraction $\frac ad$ with $d \mid n$ and $\gcd(a, d) = 1$ comes from exactly one $k$. So the class with denominator $d$ has exactly $\varphi(d)$ members, the classes partition all $n$ fractions, and the class sizes add up to $n$.

## Useful observations
- Each $k \le n$ is counted exactly once, by the divisor $\frac{n}{\gcd(k, n)}$, which is why the sum is $n$: for $n = 12$, $\varphi(1) + \varphi(2) + \varphi(3) + \varphi(4) + \varphi(6) + \varphi(12) = 1 + 1 + 2 + 2 + 2 + 4 = 12$.
- In Dirichlet convolution form it reads $\varphi * \mathbf 1 = \mathrm{id}$, and Möbius inversion turns it into $\varphi(n) = \sum_{d \mid n}\mu(d)\frac nd$.
- In a cyclic group of order $n$, exactly $\varphi(d)$ elements have order $d$ for each $d \mid n$, which is the same identity.

## Applications
Sums of gcds, counts of fractions with bounded denominators, and counts of elements of each order in a cyclic group.

## Contest profile
Rare as a named fact; its classification by gcd is what evaluates AIME sums such as $\sum \gcd(k, n)$.
`,

"mobius-inversion": String.raw`
## Key forms
- $\alt{\sum_{d \mid n}\mu(d)}{\mu(d_1) + \cdots + \mu(d_r)} = 1$ if $n = 1$ and $0$ otherwise
- $g(n) = \alt{\sum_{d \mid n} f(d)}{f(d_1) + \cdots + f(d_r)} \iff f(n) = \alt{\sum_{d \mid n}\mu(d)\,g\left(\frac nd\right)}{\mu(d_1)g\left(\frac{n}{d_1}\right) + \cdots + \mu(d_r)g\left(\frac{n}{d_r}\right)}$
- squarefree numbers up to $N$: $\alt{\sum_{k \ge 1}\mu(k)\left\lfloor \frac{N}{k^2} \right\rfloor}{N - \left\lfloor \frac N4 \right\rfloor - \left\lfloor \frac N9 \right\rfloor - \left\lfloor \frac N{25} \right\rfloor + \left\lfloor \frac N{36} \right\rfloor - \cdots}$

## Conditions
$f$ and $g$ are any functions on the positive integers; no multiplicativity is needed for the inversion itself.

## Why it works
The key lemma first. For $n \gt 1$, let $p$ be one of its primes. The divisors with $\mu(d) \ne 0$ are the squarefree ones, and they pair up as $d$ and $dp$ for $p \nmid d$, with opposite signs, so the sum is $0$; for $n = 1$ it is $\mu(1) = 1$.

For the inversion, substitute $g$ into the right side: $\sum_{d \mid n}\mu(d)\sum_{e \mid n/d} f(e)$. Swapping the order, $f(e)$ is multiplied by $\sum \mu(d)$ over the $d$ dividing $\frac ne$, which is $1$ when $e = n$ and $0$ otherwise. So only $f(n)$ survives.

## Useful observations
- Squarefree numbers are counted by inclusion-exclusion over square divisors, $\sum_d \mu(d)\left\lfloor \frac{N}{d^2} \right\rfloor$: up to $30$ there are $30 - 7 - 3 - 1 = 19$.
- Inversion of $\sum_{d \mid n}\varphi(d) = n$ gives $\varphi(n) = \sum_{d \mid n}\mu(d)\frac nd$, the product formula for $\varphi$.
- The binary strings of length $n$ that are not repetitions of a shorter block number $\sum_{d \mid n}\mu(d)2^{n/d}$.
- The probability that two random integers are coprime is $\sum_k \frac{\mu(k)}{k^2} = \frac{6}{\pi^2}$.

## Applications
Inclusion-exclusion over primes: squarefree counts, coprime pairs, aperiodic strings and necklaces, and recovering a function from its divisor sums.

## Contest profile
An olympiad notation for inclusion-exclusion over primes; AIME problems use the same counts without naming $\mu$.
`,

"multiplicative-functions": String.raw`
## Key forms
- $\gcd(m, n) = 1 \implies f(mn) = f(m)f(n)$
- $n = p_1^{e_1}\cdots p_k^{e_k} \implies f(n) = f(p_1^{e_1})\cdots f(p_k^{e_k})$
- $d(p^e) = e + 1$, $\sigma(p^e) = \frac{p^{e+1} - 1}{p - 1}$, $\varphi(p^e) = p^e - p^{e-1}$, $\mu(p) = -1$, $\mu(p^e) = 0$ for $e \ge 2$

## Conditions
Multiplicativity needs coprime arguments: $\varphi(4) = 2 \ne \varphi(2)\varphi(2) = 1$. A function with $f(mn) = f(m)f(n)$ for all $m$, $n$, such as $n^k$, is called completely multiplicative.

## Why it works
For coprime $m$ and $n$, each divisor of $mn$ factors uniquely as a divisor of $m$ times a divisor of $n$, since their primes are separate. So counting divisors, adding them, or adding $\mu$ over them splits into a product of the same operation on $m$ and on $n$. For $\varphi$, the Chinese Remainder Theorem pairs residues mod $mn$ with pairs of residues mod $m$ and mod $n$, matching the coprime ones. The prime-power formula follows by applying the rule to the coprime prime-power pieces of $n$.

## Useful observations
- Evaluating at any $n$ reduces to evaluating at each prime power separately: $d(720) = d(2^4)\,d(3^2)\,d(5) = 5 \cdot 3 \cdot 2 = 30$.
- The divisor sum $F(n) = \sum_{d \mid n} f(d)$ of a multiplicative $f$ is multiplicative.
- Products and quotients of multiplicative functions are multiplicative, so $\frac{\sigma(n)}{n}$ and $\frac{d(n)}{n^{1/3}}$ split over primes.
- Two multiplicative functions are equal when they agree on all prime powers.

## Applications
Computing $d$, $\sigma$, $\varphi$ and $\mu$ from a factorization, proving identities among them on prime powers, and optimizing ratios such as $\frac{d(n)}{n^{c}}$ one prime at a time.

## Contest profile
The silent step behind most divisor and totient computations; problems test it directly by requiring coprimality.
`,

"coprime-residue-sum": String.raw`
## Key forms
- $\alt{\sum_{1 \le k \le n,\ \gcd(k, n) = 1} k}{k_1 + k_2 + \cdots + k_{\varphi(n)}} = \frac{n\,\varphi(n)}{2}$, for $n \gt 1$
- the reduced fractions $\frac kn$ with $0 \lt k \lt n$ add up to $\frac{\varphi(n)}{2}$

## Conditions
$n \gt 1$; for $n = 1$ the sum is $1$ while the formula gives $\frac12$.

## Why it works
If $\gcd(k, n) = 1$ then $\gcd(n - k, n) = 1$, since a common divisor of $n - k$ and $n$ divides $k$. So the coprime residues pair off as $k$ and $n - k$, each pair summing to $n$. For $n \gt 2$ no residue pairs with itself, since $k = \frac n2$ would share the factor $\frac n2$ with $n$, so there are $\frac{\varphi(n)}{2}$ pairs and the sum is $\frac{n\varphi(n)}{2}$; for $n = 2$ it is $1 = \frac{2 \cdot 1}{2}$.

## Useful observations
- The coprime residues pair as $k$ and $n - k$, so their average is exactly $\frac n2$: the coprime residues of $12$ are $1, 5, 7, 11$, summing to $24 = \frac{12 \cdot 4}{2}$.
- The same pairing shows that $\varphi(n)$ is even for $n \gt 2$.
- From $1$ to $mn$, the numbers coprime to $n$ add up to $\frac{m^2 n\,\varphi(n)}{2}$, since each block of $n$ repeats the pattern shifted by a multiple of $n$.

## Applications
Sums of numbers or fractions coprime to a modulus, and sums over reduced fractions with a fixed denominator.

## Contest profile
A short AIME step inside fraction-sum problems.
`,

"perfect-square-divisors": String.raw`
## Key forms
- $\#\{\text{square divisors of } p_1^{e_1}\cdots p_k^{e_k}\} = \left(\left\lfloor \frac{e_1}{2} \right\rfloor + 1\right)\cdots\left(\left\lfloor \frac{e_k}{2} \right\rfloor + 1\right)$
- $j$th-power divisors: $\left(\left\lfloor \frac{e_1}{j} \right\rfloor + 1\right)\cdots\left(\left\lfloor \frac{e_k}{j} \right\rfloor + 1\right)$
- the smallest $m$ making $mn$ a perfect square is the product of the primes at odd exponents in $n$

## Conditions
$n$ is a positive integer with the given prime factorization; $1$ counts as a perfect square divisor.

## Why it works
A divisor of $n$ is $\prod p_i^{f_i}$ with $0 \le f_i \le e_i$, and it is a perfect square exactly when every $f_i$ is even, since its square root is then $\prod p_i^{f_i/2}$. The even numbers from $0$ to $e_i$ are $0, 2, \ldots, 2\left\lfloor \frac{e_i}{2} \right\rfloor$, which is $\left\lfloor \frac{e_i}{2} \right\rfloor + 1$ choices, and the choices for different primes are independent.

## Useful observations
- Each prime contributes its number of even exponent choices, so primes to the first power contribute only a factor of $1$: $12! = 2^{10} \cdot 3^5 \cdot 5^2 \cdot 7 \cdot 11$ has $6 \cdot 3 \cdot 2 \cdot 1 \cdot 1 = 36$ square divisors.
- The $m$ with $m^2 \mid n$ are in one-to-one correspondence with the square divisors of $n$.
- The smallest multiplier that makes $n$ a perfect square is the product of the primes with odd exponent: for $12!$ it is $3 \cdot 7 \cdot 11 = 231$.

## Applications
Counting square or $k$th-power divisors, the integers $m$ with $m^2$ dividing a given number, and the least factor that makes a product a perfect square.

## Contest profile
AMC and AIME counts, usually after Legendre's Formula has supplied the exponents of a factorial.
`,

"lcm-pair-counting": String.raw`
## Key forms
- $\#\{(a, b) : \operatorname{lcm}(a, b) = p_1^{e_1}\cdots p_k^{e_k}\} = (2e_1 + 1)\cdots(2e_k + 1)$
- with $\gcd(a, b) = 1$ as well: $2^k$ ordered pairs
- triples with a given lcm: $\left((e_1 + 1)^3 - e_1^3\right)\cdots\left((e_k + 1)^3 - e_k^3\right)$

## Conditions
$a$ and $b$ are positive integers and the pairs are ordered; unordered pairs number $\frac{\prod(2e_i + 1) + 1}{2}$, counting $a = b$ once.

## Why it works
For one prime $p$ with target exponent $e$, the pair's exponents $(x, y)$ must satisfy $\max(x, y) = e$ with $0 \le x, y \le e$. There are $(e + 1)^2$ pairs with both at most $e$ and $e^2$ with both at most $e - 1$, so $(e + 1)^2 - e^2 = 2e + 1$ have maximum exactly $e$. The exponents of different primes are chosen independently, so the counts multiply.

## Useful observations
- The count is a product of factors $2e + 1$, one per prime, since the primes act independently: $\operatorname{lcm}(a, b) = 72 = 2^3 \cdot 3^2$ has $7 \cdot 5 = 35$ ordered pairs.
- With $k$ numbers, the count per prime is $(e + 1)^k - e^k$.
- With a fixed gcd as well, each prime's exponents are pinned to $\{\min, \max\}$, leaving $2$ orders per prime where they differ.

## Applications
Counting pairs and tuples with prescribed lcms or gcds, prime by prime.

## Contest profile
An AIME counting fact; systems of several lcm conditions reduce to the same small count for each prime.
`,

"fermats-little-theorem": String.raw`
## Key forms
- $a^{p-1} \equiv 1 \pmod p$, for $p \nmid a$
- $a^p \equiv a \pmod p$, for every integer $a$
- $a^k \equiv a^{k \bmod (p-1)} \pmod p$, for $p \nmid a$

## Conditions
$p$ is prime. For a composite modulus the analogue is Euler's Theorem; $a^{n-1} \equiv 1 \pmod n$ can hold for composite $n$, so the converse is false.

## Why it works
Multiplying by $a$ just reorders the nonzero remainders mod $p$, and comparing the product of the remainders before and after gives the theorem.

The numbers $a, 2a, \ldots, (p - 1)a$ are nonzero mod $p$, and different, since $ia \equiv ja$ would mean $p \mid (i - j)a$ and so $p \mid i - j$. So they are $1, 2, \ldots, p - 1$ in some order.

{{figure:shuffle}}

Multiplying each list together gives $a^{p-1}(p - 1)! \equiv (p - 1)! \pmod p$, and the factorial is coprime to $p$, so it cancels, leaving $a^{p-1} \equiv 1$. Multiplying by $a$ gives $a^p \equiv a$, which also holds when $p \mid a$, both sides being $0$.

## Useful observations
- Exponents can be reduced modulo $p - 1$ whenever $p \nmid a$: for $2^{100} \bmod 7$, $100 \equiv 4 \pmod 6$, so $2^{100} \equiv 2^4 \equiv 2$.
- The true period, the multiplicative order of $a$, divides $p - 1$ and can be smaller: $2^3 \equiv 1 \pmod 7$.
- If a prime $p$ divides $a^{2^k} + 1$, then the order of $a$ is $2^{k+1}$, so $p \equiv 1 \pmod{2^{k+1}}$.
- A second proof inducts on $a$ with $(a + 1)^p \equiv a^p + 1 \pmod p$.

## Applications
Remainders of large powers modulo primes, orders of elements, primality tests, and constraints on the primes dividing $a^n \pm 1$.

## Contest profile
A frequent AIME step, usually leading to the multiplicative order or combined with the Chinese Remainder Theorem for a composite modulus.
`,

"eulers-theorem": String.raw`
## Key forms
- $a^{\varphi(n)} \equiv 1 \pmod n$, for $\gcd(a, n) = 1$
- $a^k \equiv a^{k \bmod \varphi(n)} \pmod n$, for $\gcd(a, n) = 1$

## Conditions
$\gcd(a, n) = 1$ is essential: $2^{\varphi(4)} = 4 \equiv 0 \pmod 4$. For a base sharing a factor with $n$, the modulus is split into a coprime part, where the theorem applies, and a part where high powers vanish.

## Why it works
Multiplying by $a$ shuffles the residues coprime to $n$. Let $r_1, \ldots, r_k$ be those residues, $k = \varphi(n)$. The numbers $ar_1, \ldots, ar_k$ are also coprime to $n$ and all different mod $n$, since $ar_i \equiv ar_j$ would let the invertible $a$ cancel. So they are the same residues in a new order, and $$a^k\,r_1\cdots r_k \equiv r_1\cdots r_k \pmod n.$$ The product is coprime to $n$, so it cancels, leaving $a^{\varphi(n)} \equiv 1$. For prime $n$ this is Fermat's argument.

## Useful observations
- Exponents reduce modulo $\varphi(n)$, and often a smaller exponent already gives $1$: with $\varphi(100) = 40$, $3^{100} \equiv 3^{20} = (3^{10})^2 \equiv 49^2 \equiv 1 \pmod{100}$.
- Exponent towers reduce down a chain of totients, $1000 \to 400 \to 160 \to \cdots$.
- The order of $a$ divides $\varphi(n)$, and the Carmichael function gives a universal exponent that is often smaller.

## Applications
Last digits and remainders of large powers for composite moduli, towers of exponents, and modular inverses as $a^{-1} \equiv a^{\varphi(n) - 1}$.

## Contest profile
AMC and AIME last-digit questions, usually paired with the Chinese Remainder Theorem for moduli that are products of coprime prime powers.
`,

"wilsons-theorem": String.raw`
## Key forms
- $(p - 1)! \equiv -1 \pmod p$ for prime $p$
- $(p - 2)! \equiv 1 \pmod p$
- $\left(\left(\frac{p - 1}{2}\right)!\right)^2 \equiv (-1)^{\frac{p+1}{2}} \pmod p$, so $\left(\frac{p-1}{2}\right)!$ is a square root of $-1$ when $p \equiv 1 \pmod 4$

## Conditions
$p$ is prime. For composite $n \gt 4$, $(n - 1)! \equiv 0 \pmod n$, and $3! \equiv 2 \pmod 4$.

## Why it works
Each of $1, 2, \ldots, p - 1$ has an inverse modulo $p$, and the inverse is unique. A number is its own inverse exactly when $x^2 \equiv 1$, that is $p \mid (x - 1)(x + 1)$, so $x \equiv \pm1$. So the numbers $2, 3, \ldots, p - 2$ split into pairs $\{x, x^{-1}\}$, each multiplying to $1$, and $(p - 1)! \equiv 1 \cdot (p - 1) \equiv -1$.

For the converse, if $n = ab$ with $1 \lt a \le b \lt n$, then $a$ divides $(n - 1)!$, so $(n - 1)! \equiv -1 \pmod n$ would make $a$ divide $1$. The half-factorial form pairs $k$ with $p - k \equiv -k$: $(p - 1)! = \prod_{k \le (p-1)/2} k(p - k) \equiv (-1)^{(p-1)/2}\left(\left(\frac{p-1}{2}\right)!\right)^2$.

## Useful observations
- The product pairs each residue with its inverse, leaving only $1$ and $-1$ unpaired: modulo $7$, $6! = 1 \cdot (2 \cdot 4)(3 \cdot 5) \cdot 6 \equiv -1$, and indeed $720 = 7 \cdot 103 - 1$.
- $100! \equiv -1 \pmod{101}$ fixes every factorial near $100$ modulo $101$, by dividing out the last few factors.
- Primes $p \equiv 1 \pmod 4$ have a square root of $-1$, namely $\left(\frac{p-1}{2}\right)!$.

## Applications
Factorials modulo primes, primality characterizations, and square roots of $-1$ modulo primes.

## Contest profile
Occasional on the AIME and AMC 12, usually as a factorial modulo a prime or as the reason a quotient fails to be an integer exactly when some number is prime.
`,

"crt": String.raw`
## Key forms
- pairwise coprime $n_i$: $x \equiv a_i \pmod{n_i}$ for all $i$ has a unique solution mod $N = n_1\cdots n_k$
- explicit solution: $x = \alt{\sum_i a_iN_iM_i}{a_1N_1M_1 + \cdots + a_kN_kM_k}$, with $N_i = \frac{N}{n_i}$ and $M_i \equiv N_i^{-1} \pmod{n_i}$
- general moduli: solvable $\iff a_i \equiv a_j \pmod{\gcd(n_i, n_j)}$ for all $i, j$, unique mod $\operatorname{lcm}$

## Conditions
For the clean statement the moduli must be pairwise coprime: $x \equiv 1 \pmod 4$ and $x \equiv 2 \pmod 6$ have no solution, since the first makes $x$ odd and the second even.

## Why it works
Coprime moduli measure independent things. For $3$ and $5$, each of $0, \ldots, 14$ leaves a pair of remainders, and no two leave the same pair, since their difference would be divisible by $3$ and $5$, hence by $15$. So the $15$ numbers give $15$ different pairs, and as there are exactly $3 \cdot 5$ pairs, every pair occurs exactly once. The same count works for any pairwise coprime moduli, because a number divisible by each of them is divisible by their product.

## Useful observations
- Congruences combine one at a time, each step multiplying the modulus: $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$ give $x \equiv 8 \pmod{15}$, and adding $x \equiv 2 \pmod 7$ gives $x \equiv 23 \pmod{105}$.
- A question mod $1000$ splits into one mod $8$ and one mod $125$.
- For coprime $m$ and $n$, the number of solutions of a polynomial congruence mod $mn$ is the product of the numbers mod $m$ and mod $n$.

## Applications
Remainders modulo composite numbers, systems of congruences, counting solutions of congruences, and the multiplicativity of $\varphi$.

## Contest profile
A frequent AIME step, most often splitting a modulus such as $1000$ into $8$ and $125$ and recombining.

## Full proof
Let $N = n_1\cdots n_k$ with the $n_i$ pairwise coprime. If $x$ and $y$ both solve the system, every $n_i$ divides $x - y$, and since their lcm is their product, $N$ divides $x - y$. For existence, $N_i = \frac{N}{n_i}$ is coprime to $n_i$, so it has an inverse $M_i$ modulo $n_i$, and $x = \sum_i a_iN_iM_i$ works: modulo $n_i$, every term but the $i$th contains the factor $n_i$, and the $i$th is $a_i \cdot N_iM_i \equiv a_i$.
`,

"multiplicative-order": String.raw`
## Key forms
- $a^m \equiv 1 \pmod n \iff \operatorname{ord}_n(a) \mid m$
- $\operatorname{ord}_n(a) \mid \varphi(n)$, and modulo a prime $p$, $\operatorname{ord}_p(a) \mid p - 1$
- $a^i \equiv a^j \pmod n \iff i \equiv j \pmod{\operatorname{ord}_n(a)}$

## Conditions
$\gcd(a, n) = 1$; otherwise no power of $a$ is $1$ modulo $n$.

## Why it works
Write $m = qd + r$ with $0 \le r \lt d$. Then $a^m = (a^d)^q a^r \equiv a^r$, and since $d$ is the smallest positive exponent giving $1$, $a^r \equiv 1$ only when $r = 0$. So $a^m \equiv 1$ exactly when $d \mid m$, and Euler's Theorem, $a^{\varphi(n)} \equiv 1$, gives $d \mid \varphi(n)$.

There is also a picture: multiplying by $a$ splits the $\varphi(n)$ residues coprime to $n$ into cycles, and every cycle has the same length $d$.

{{figure:cycles}}

## Useful observations
- The order divides every exponent that gives $1$, in particular $p - 1$, and can be a proper divisor: $\operatorname{ord}_7(2) = 3$, since $2^3 = 8 \equiv 1$, and $3 \mid 6$.
- The period of the repeating decimal of $\frac1n$, for $\gcd(n, 10) = 1$, is $\operatorname{ord}_n(10)$.
- If a prime $p$ divides $a^{2^k} + 1$, then $\operatorname{ord}_p(a) = 2^{k+1}$, so $p \equiv 1 \pmod{2^{k+1}}$.
- $\operatorname{ord}_n(a^k) = \frac{\operatorname{ord}_n(a)}{\gcd(k, \operatorname{ord}_n(a))}$.

## Applications
Periods of repeating decimals, the smallest $k$ with $n \mid a^k - 1$, the primes dividing $a^m \pm 1$, and cycle structures of multiplication maps.

## Contest profile
An AIME tool, usually fed by Fermat's Little Theorem, for periods and for divisibility chains such as $a^k \equiv 1 \pmod{p^m}$.
`,

"modular-inverse": String.raw`
## Key forms
- $a \cdot a^{-1} \equiv 1 \pmod n$, which exists $\iff \gcd(a, n) = 1$
- $a^{-1} \equiv a^{\varphi(n) - 1} \pmod n$, and modulo a prime $a^{-1} \equiv a^{p - 2}$
- $2^{-1} \equiv \frac{p + 1}{2} \pmod p$ for odd $p$

## Conditions
$\gcd(a, n) = 1$. If $\gcd(a, n) = g \gt 1$, the congruence $ax \equiv b \pmod n$ is solvable exactly when $g \mid b$, with $g$ solutions modulo $n$.

## Why it works
If $\gcd(a, n) = 1$, Bézout's Identity gives integers $x$ and $y$ with $ax + ny = 1$, so $ax \equiv 1 \pmod n$. If $x$ and $x'$ are both inverses, then $x \equiv x(ax') = (xa)x' \equiv x'$, so the inverse is unique. Conversely, if $ax \equiv 1$, any common factor of $a$ and $n$ divides $1$. The power form follows from Euler's Theorem, $a \cdot a^{\varphi(n) - 1} = a^{\varphi(n)} \equiv 1$.

## Useful observations
- An inverse is checked by a single multiplication, even when finding it takes work: $5^{-1} \equiv 3 \pmod 7$, since $15 \equiv 1$.
- The extended Euclidean algorithm finds $a^{-1}$ by running the divisions backwards.
- A fraction $\frac pq$ modulo a prime is $pq^{-1}$, so expressions like $\frac{1}{2} \bmod 7 = 4$ make sense.
- The units modulo $n$, the residues with inverses, number $\varphi(n)$.

## Applications
Division in modular arithmetic, solving linear congruences, recombining the Chinese Remainder Theorem, and fractions modulo a prime.

## Contest profile
A supporting skill inside congruence problems, binomial coefficients modulo primes, and Chinese Remainder recombinations.
`,


"squares-mod-small": String.raw`
## Key forms
- $x^2 \bmod 4 \in \{0, 1\}$ and $x^2 \bmod 3 \in \{0, 1\}$
- $x^2 \bmod 8 \in \{0, 1, 4\}$, and $x$ odd $\implies x^2 \equiv 1 \pmod 8$
- modulo $9$ the squares are $0, 1, 4, 7$, and modulo $16$ they are $0, 1, 4, 9$
- $x^2 \bmod 5 \in \{0, 1, 4\}$, so fourth powers are $0$ or $1$ mod $5$

## Conditions
$x$ is an integer. Modulo an odd prime $p$, exactly $\frac{p - 1}{2}$ nonzero residues are squares.

## Why it works
A square's remainder depends only on the remainder of the number being squared, so it is enough to square each residue. Modulo $4$, $0, 1, 2, 3$ square to $0, 1, 0, 1$. For odd $x = 2k + 1$, $x^2 = 4k(k + 1) + 1$, and $k(k + 1)$ is even, so $x^2 \equiv 1 \pmod 8$. Modulo $9$ and $16$ the same enumeration gives the lists above.

## Useful observations
- A sum of two squares is never $3 \bmod 4$, and a sum of three squares is never $7 \bmod 8$.
- Squares reach only six last digits, $0, 1, 4, 5, 6$, and $9$, so a units digit of $2$, $3$, $7$, or $8$ rules out a square at once.
- Every odd square is $1 \bmod 8$, since $x^2 - 1 = (x - 1)(x + 1)$ is a product of consecutive even numbers, one of them a multiple of $4$.

## Applications
Proofs that Diophantine equations have no solutions, restrictions on sums of squares, and quick rejections of claimed perfect squares.

## Contest profile
The most common impossibility tool at every level: a square forced into a forbidden residue ends the problem.
`,

"eulers-criterion": String.raw`
## Key forms
- $a^{\frac{p-1}{2}} \equiv \left(\frac ap\right) \pmod p$, with $\left(\frac ap\right) = \pm1$
- $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$: $-1$ is a residue $\iff p \equiv 1 \pmod 4$
- $\left(\frac{ab}{p}\right) = \left(\frac ap\right)\left(\frac bp\right)$

## Conditions
$p$ is an odd prime and $p \nmid a$.

## Why it works
Pair each $x$ in $1, \ldots, p - 1$ with the unique $y$ satisfying $xy \equiv a$. If $a$ is not a square, no $x$ pairs with itself, so the $p - 1$ numbers form $\frac{p-1}{2}$ pairs each with product $a$, and $(p - 1)! \equiv a^{(p-1)/2}$. Wilson's Theorem makes the left side $-1$.

If $a$ is a square, $a \equiv r^2$, then $x^2 \equiv a$ has exactly the two solutions $\pm r$, which pair with themselves and multiply to $-r^2 \equiv -a$. The other $p - 3$ numbers form pairs with product $a$, so $(p - 1)! \equiv -a \cdot a^{(p-3)/2} = -a^{(p-1)/2}$, and Wilson's Theorem gives $a^{(p-1)/2} \equiv 1$.

## Useful observations
- One power replaces a search through all the squares: $3^3 = 27 \equiv -1 \pmod 7$, so $3$ is not a square modulo $7$, matching the list of squares $1, 2, 4$.
- Every odd prime factor of $x^2 + 1$ is $1 \bmod 4$.
- $2$ is a square modulo $p$ exactly when $p \equiv \pm1 \pmod 8$.

## Applications
Deciding whether a number is a square modulo a prime, the primes dividing $x^2 + 1$ or $x^2 + 2$, and the supplements to quadratic reciprocity.

## Contest profile
Rare on the AIME except through its corollary about $-1$; an olympiad staple for prime factors of quadratic expressions.
`,

"last-digit-patterns": String.raw`
## Key forms
- a square never ends in $2$, $3$, $7$ or $8$
- $n^3 \bmod 9 \in \{0, 1, 8\}$
- the units digits of $a, a^2, a^3, \ldots$ repeat with period $1$, $2$ or $4$, since $a^5 \equiv a \pmod{10}$

## Conditions
The facts concern integers; the cycle of a units digit starts at the first power, so $a^{4k}$ has the fourth entry of the cycle.

## Why it works
The units digit of a product depends only on the units digits of the factors, so the units digit of $n^2$ is that of $d^2$, where $d$ is the last digit of $n$. Squaring the ten digits gives endings $0, 1, 4, 9, 6, 5, 6, 9, 4, 1$, and $2$, $3$, $7$, $8$ never appear.

Cubes modulo $9$: with $n \equiv 0, \pm1, \pm2, \pm3, \pm4$, the cubes are $0$, $\pm1$, $\pm8 \equiv \mp1$, $0$, $\pm64 \equiv \pm1$, so every cube is $0$ or $\pm1$. The powers of each digit cycle because there are only ten endings, and every period divides $4$ since $a^5 \equiv a \pmod{10}$ for all $a$.

## Useful observations
- Every units digit cycles with period dividing $4$: the cycles are $2, 4, 8, 6$; $3, 9, 7, 1$; $7, 9, 3, 1$; $8, 4, 2, 6$; $4, 6$; $9, 1$, with $0, 1, 5, 6$ fixed, so $7^{2027}$ ends in $3$, since $2027 \equiv 3 \pmod 4$.
- A number whose digit sum is $3$, $4$, $5$ or $6 \bmod 9$ is never a cube.
- $a^5 - a$ is always divisible by $10$, which is why units digits repeat every four powers.

## Applications
Rejecting claimed squares and cubes, units digits of huge powers, and sums of units digits over long ranges.

## Contest profile
MATHCOUNTS and AMC 10 units-digit questions, and AIME sums over a units-digit pattern that repeats.
`,

"primitive-roots": String.raw`
## Key forms
- primitive roots exist mod $n$ $\iff n \in \{1, 2, 4, p^k, 2p^k\}$, $p$ an odd prime
- their number is $\varphi(\varphi(n))$
- modulo a prime $p$: $x^k \equiv a$ is solvable $\iff a^{(p-1)/d} \equiv 1$, with $d = \gcd(k, p - 1)$, and then has exactly $d$ solutions

## Conditions
$g$ is coprime to $n$. Modulo $8$ there is no primitive root: every odd square is $1 \bmod 8$, so every unit has order at most $2$, while $\varphi(8) = 4$.

## Why it works
For a prime $p$, consider the number of residues of each order $d \mid p - 1$. If some $a$ has order $d$, then $1, a, \ldots, a^{d-1}$ are $d$ distinct roots of $x^d - 1$, which has at most $d$ roots modulo a prime, so every element of order $d$ is a power $a^j$, and $a^j$ has order $d$ exactly when $\gcd(j, d) = 1$. So each order $d$ is taken by either $0$ or $\varphi(d)$ residues.

Every residue has some order dividing $p - 1$, and $\sum_{d \mid p - 1}\varphi(d) = p - 1$. The counts can only add up if every order is taken by exactly $\varphi(d)$ residues, in particular order $p - 1$ by $\varphi(p - 1) \ge 1$ residues: primitive roots exist.

## Useful observations
- The powers of a primitive root run through every nonzero residue exactly once: modulo $7$ the powers of $3$ are $3, 2, 6, 4, 5, 1$.
- With a primitive root, multiplication becomes addition of exponents modulo $\varphi(n)$, the index or discrete logarithm.
- Modulo $p$, there are $\frac{p-1}{\gcd(k, p-1)}$ nonzero $k$th powers; for $k = 2$ that is $\frac{p-1}{2}$.
- To test $g$, check $g^{(p-1)/q} \not\equiv 1$ for each prime $q$ dividing $p - 1$.

## Applications
Counting $k$th power residues and solutions of $x^k \equiv a$, discrete logarithms, and the cyclic structure behind Euler's Criterion.

## Contest profile
An olympiad tool; AIME problems use its consequences, such as orders dividing $p - 1$ and counts of $k$th powers, without naming it.
`,

"quadratic-reciprocity": String.raw`
## Key forms
- $\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}$, for distinct odd primes
- $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$ and $\left(\frac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}$
- $\left(\frac ap\right)$ depends only on $a \bmod p$ and is multiplicative in $a$

## Conditions
$p$ and $q$ are distinct odd primes. For composite bottoms the Jacobi symbol obeys the same rules but no longer decides squareness.

## Why it works
The proof below, Eisenstein's, counts lattice points. Its key fact is Eisenstein's Lemma: for an odd prime $p$ and odd $a$ coprime to $p$, $$\left(\frac ap\right) = (-1)^{\sum_{u=1}^{(p-1)/2}\lfloor au/p \rfloor}.$$

Apply it with $a = q$ and with $a = p$. The sum $\sum_{u=1}^{(p-1)/2}\left\lfloor \frac{qu}{p} \right\rfloor$ counts lattice points $(u, v)$ in the rectangle $1 \le u \le \frac{p-1}{2}$, $1 \le v \le \frac{q-1}{2}$ lying below the line $v = \frac qp u$, and the other sum counts those above it; none lies on it, since $p \nmid qu$. So the two exponents add to $\frac{p-1}{2}\cdot\frac{q-1}{2}$, the number of points in the rectangle.

## Useful observations
- Flipping and reducing settle a symbol in a few steps, with no list of squares: $\left(\frac{3}{11}\right) = -\left(\frac{11}{3}\right) = -\left(\frac23\right) = 1$, and indeed $5^2 \equiv 3 \pmod{11}$.
- Factoring the top splits a symbol into prime pieces, each settled by a supplement or a flip: $\left(\frac{30}{53}\right) = \left(\frac{2}{53}\right)\left(\frac{3}{53}\right)\left(\frac{5}{53}\right) = (-1)(-1)(-1) = -1$, since $53 \equiv 5 \pmod 8$ and $53 \equiv 1 \pmod 4$.
- $3$ is a square modulo $p \gt 3$ exactly when $p \equiv \pm1 \pmod{12}$.

## Applications
Deciding solvability of $x^2 \equiv a \pmod p$, describing the primes that divide values of a quadratic, and computing Legendre symbols quickly.

## Contest profile
Rare on the AIME, where the supplements usually suffice; decisive in olympiad problems about primes dividing quadratic expressions.

## Full proof
Eisenstein's Lemma, step one. Let $a$ be odd and coprime to $p$. For each even $e$ in $2, 4, \ldots, p - 1$, write $ae = p\left\lfloor \frac{ae}{p} \right\rfloor + r_e$ with $0 \lt r_e \lt p$, and replace each odd $r_e$ by the even number $p - r_e \equiv -r_e$. These even numbers are distinct: two equal ones would give $a(e \mp e') \equiv 0 \pmod p$ with $0 \lt e \pm e' \lt 2p$ even, impossible. So they are $2, 4, \ldots, p - 1$ in some order.

Multiplying everything, $a^{(p-1)/2}\prod e \equiv (-1)^{\sum r_e}\prod e$, so by Euler's Criterion $\left(\frac ap\right) = (-1)^{\sum r_e}$. Since $ae$ is even and $p$ is odd, $r_e \equiv \left\lfloor \frac{ae}{p} \right\rfloor \pmod 2$, so the exponent can be taken as $\sum_e \left\lfloor \frac{ae}{p} \right\rfloor$.

Step two, reindexing. An even $e \lt \frac p2$ is already some $u \le \frac{p-1}{2}$. An even $e \gt \frac p2$ is $p - u$ for an odd $u \lt \frac p2$, and $\left\lfloor \frac{a(p - u)}{p} \right\rfloor = a - 1 - \left\lfloor \frac{au}{p} \right\rfloor$, which has the same parity as $\left\lfloor \frac{au}{p} \right\rfloor$ because $a - 1$ is even. Each $u$ from $1$ to $\frac{p-1}{2}$ arises exactly once, which gives the lemma.
`,

"crt-solution-counting": String.raw`
## Key forms
- $\#\{x \bmod mn : f(x) \equiv 0\} = \#\{x \bmod m\} \cdot \#\{x \bmod n\}$, for $\gcd(m, n) = 1$
- $x^2 \equiv 1 \pmod n$, $n$ odd with $k$ distinct primes: $2^k$ solutions
- $x^2 \equiv x \pmod n$: $2^k$ solutions, where $k$ is the number of distinct primes of $n$

## Conditions
$f$ has integer coefficients and $\gcd(m, n) = 1$. Prime powers must be counted on their own: $x^2 \equiv 1$ has $2$ solutions mod $4$ but $4$ mod $8$.

## Why it works
For coprime $m$ and $n$, the map $x \mapsto (x \bmod m, x \bmod n)$ is a bijection from residues mod $mn$ to pairs of residues, by the Chinese Remainder Theorem. Since $f$ has integer coefficients, $f(x) \bmod m$ depends only on $x \bmod m$, and $mn \mid f(x)$ exactly when $m \mid f(x)$ and $n \mid f(x)$. So solutions mod $mn$ correspond to pairs of solutions, and the counts multiply.

## Useful observations
- Each odd prime contributes its own pair $\pm1$, so modulo a product of $k$ distinct odd primes $x^2 \equiv 1$ has $2^k$ solutions: modulo $105$ there are $2 \cdot 2 \cdot 2 = 8$.
- $x^2 \equiv x \pmod{10^k}$ has $4$ solutions, the endings of $0$, $1$, and the automorphic numbers ending in $5$ and $6$.
- Modulo $2^k$ with $k \ge 3$, $x^2 \equiv 1$ has exactly $4$ solutions, $\pm1$ and $2^{k-1} \pm 1$.

## Applications
Counting solutions of congruences modulo composite numbers, automorphic numbers, and square roots modulo composites.

## Contest profile
An AIME counting step: count modulo each prime power, then multiply.
`,

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

"kummers-theorem": String.raw`
## Key forms
- $v_p\binom{m+n}{m} = $ number of carries in $m + n$ in base $p$
- $v_p\binom{m+n}{m} = \frac{s_p(m) + s_p(n) - s_p(m + n)}{p - 1}$, with $s_p$ the base-$p$ digit sum
- $v_2\binom{2n}{n} = s_2(n)$, the number of $1$s in binary $n$

## Conditions
$p$ is prime and $m, n \ge 0$. Carries are counted at every position, including chains of carries.

## Why it works
By Legendre's Formula in digit-sum form, $v_p(N!) = \frac{N - s_p(N)}{p - 1}$, so $$v_p\binom{m+n}{m} = \frac{s_p(m) + s_p(n) - s_p(m + n)}{p - 1}.$$ When $m$ and $n$ are added digit by digit, each position without a carry contributes its digits unchanged to the sum's digits, and each carry replaces a digit total of $d + p$ by $d$ in that position and adds $1$ to the next, lowering the digit sum by exactly $p - 1$. So $s_p(m) + s_p(n) - s_p(m + n) = (p - 1) \times$ the number of carries.

## Useful observations
- The carries read off the exact power with no factorials computed: in binary $101 + 101$ carries twice, and indeed $\binom{10}{5} = 252 = 4 \cdot 63$.
- $\binom{2n}{n}$ is even for every $n \ge 1$, and divisible by $4$ unless $n$ is a power of $2$.
- $p \nmid \binom{m+n}{m}$ exactly when no digit sum reaches $p$, which is Lucas's Theorem's nonzero condition.

## Applications
Powers of primes dividing binomial and central binomial coefficients, divisibility of Catalan numbers, and parity of Pascal's triangle.

## Contest profile
An AIME and olympiad shortcut that replaces three Legendre computations with counting carries.
`,

"lucas-theorem": String.raw`
## Key forms
- $\binom mn \equiv \alt{\prod_i \binom{m_i}{n_i}}{\binom{m_0}{n_0}\binom{m_1}{n_1}\cdots\binom{m_k}{n_k}} \pmod p$
- $p \mid \binom mn \iff$ some digit $n_i \gt m_i$
- $\binom mn$ is odd $\iff$ the binary $1$s of $n$ are among those of $m$; row $m$ of Pascal's triangle has $2^{s_2(m)}$ odd entries

## Conditions
$p$ is prime. The theorem works modulo $p$ only, not modulo $p^2$.

## Why it works
Compare the coefficients of $(1 + x)^m$ computed two ways modulo $p$. The proof has three steps: a lemma, a power rule, and a digit-by-digit expansion.

Step 1, the lemma. For a prime $p$ and $0 \lt j \lt p$, $p \mid \binom pj$. The identity $$j!\,(p - j)!\binom pj = p!$$ has $p$ on the right. Every factor of $j!$ and $(p - j)!$ is less than $p$, so $p$ divides neither, and it must divide $\binom pj$.

Step 2, the power rule. All the middle terms of $(1 + x)^p$ vanish modulo $p$, the freshman's dream: $$(1 + x)^p \equiv 1 + x^p \pmod p.$$ Raising to the $p$th power again gives $(1 + x)^{p^2} \equiv (1 + x^p)^p \equiv 1 + x^{p^2}$, and induction gives, for every $i$, $$(1 + x)^{p^i} \equiv 1 + x^{p^i} \pmod p.$$

Step 3, expand by digits. Write $m = \sum_i m_ip^i$ with digits $0 \le m_i \lt p$. Then $$(1 + x)^m = \prod_i\left((1 + x)^{p^i}\right)^{m_i} \equiv \prod_i\left(1 + x^{p^i}\right)^{m_i} \pmod p.$$

Each factor expands by the [[binomial-theorem|Binomial Theorem]]: $$\left(1 + x^{p^i}\right)^{m_i} = \sum_{j_i = 0}^{m_i}\binom{m_i}{j_i}x^{j_ip^i}.$$

Multiplying the factors out, a term has exponent $\sum_i j_ip^i$ with $0 \le j_i \le m_i \lt p$. Each $j_i$ is a legitimate base-$p$ digit, so the exponent determines the $j_i$ uniquely. The power $x^n$ therefore arises from exactly one choice, $j_i = n_i$, the digits of $n$, and from none if some $n_i \gt m_i$.

Conclusion. Comparing the coefficient of $x^n$ on both sides gives $$\binom mn \equiv \prod_i\binom{m_i}{n_i} \pmod p, \qquad \binom{m_i}{n_i} = 0 \text{ when } n_i \gt m_i.$$ The theorem stops at modulo $p$ because the lemma only gives divisibility by $p$ itself.

The corollaries. A product is divisible by the prime $p$ exactly when a factor is, and $\binom{m_i}{n_i}$ with $0 \le n_i \le m_i \lt p$ is not. So $p \mid \binom mn$ exactly when some $n_i \gt m_i$, and the number of $n$ with $p \nmid \binom mn$ is the number of digit choices $0 \le n_i \le m_i$: $$\#\left\{n : p \nmid \binom mn\right\} = \prod_i(m_i + 1).$$

For $p = 2$ the digits are $0$ and $1$, so $\binom mn$ is odd exactly when the binary $1$s of $n$ lie among those of $m$, and row $m$ has $2^{s_2(m)}$ odd entries. The card for [[pascal-parity|odd entries of a row]] works this case out in full.

## Useful observations
- A single digit of $k$ larger than the matching digit of $n$ makes the coefficient divisible by $p$: $10 = 101_3$ and $4 = 011_3$, the middle digits give $\binom 01 = 0$, so $3 \mid \binom{10}{4} = 210$.
- The odd entries of Pascal's triangle form the Sierpiński pattern.
- Row $p^k - 1$ of Pascal's triangle has no entry divisible by $p$, since every digit of $m$ is $p - 1$ and no digit of $n$ can exceed it.

## Applications
Binomial coefficients modulo a prime, parity of Pascal's triangle, and counts of entries not divisible by $p$.

## Contest profile
AIME questions on binomial coefficients modulo $2$ or $3$, and Pascal parity patterns.
`,

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
## Key forms
- $p \gt 3$ prime $\implies p \equiv \pm1 \pmod 6$
- $p \gt 3$ prime $\implies p^2 \equiv 1 \pmod{24}$
- twin primes above $3$ are $6k - 1$ and $6k + 1$

## Conditions
$p$ is a prime greater than $3$; $2$ and $3$ are the exceptions. The conditions are necessary, not sufficient.

## Why it works
Modulo $6$ an integer is $0, 1, 2, 3, 4$ or $5$. The classes $0$, $2$, $4$ are even and $3$ is a multiple of $3$, so a prime above $3$ is $1$ or $5$, that is $\pm1$.

{{figure:grid}}

For the square, $p^2 - 1 = (p - 1)(p + 1)$ is a product of consecutive even numbers, one of them a multiple of $4$, so it is divisible by $8$; and of $p - 1$, $p$, $p + 1$ one is a multiple of $3$, not $p$. So $24 \mid p^2 - 1$.

## Useful observations
- Since every prime $p \gt 3$ has $p^2 \equiv 1 \pmod{24}$, any $p^2 + c$ has a fixed residue: $p^2 + 2 \equiv 3 \pmod{24}$ is a multiple of $3$, so never prime.
- $24$ is the largest number dividing $p^2 - 1$ for every prime $p \gt 3$, since $5^2 - 1 = 24$.
- The number between twin primes above $3$ is a multiple of $6$.

## Applications
Divisibility of expressions in an arbitrary prime, twin primes, and quick restrictions on which numbers can be prime.

## Contest profile
A short AMC fact, usually as the largest number that always divides one less than the square of a prime above three.
`,

"floor-multiples": String.raw`
## Key forms
- $\#\{k \le n : d \mid k\} = \left\lfloor \frac nd \right\rfloor$
- divisible by $a$ or $b$: $\left\lfloor \frac na \right\rfloor + \left\lfloor \frac nb \right\rfloor - \left\lfloor \frac{n}{\operatorname{lcm}(a, b)} \right\rfloor$
- in a range $a \le k \le b$: $\left\lfloor \frac bd \right\rfloor - \left\lfloor \frac{a - 1}{d} \right\rfloor$

## Conditions
$n \ge 0$ and $d \ge 1$ are integers. The count is of positive multiples; including $0$ adds one.

## Why it works
The multiples of $d$ up to $n$ are $d, 2d, \ldots, kd$, where $k$ is the largest whole number with $kd \le n$, and there are exactly $k$ of them. The condition $kd \le n$ says $k \le \frac nd$, so $k = \left\lfloor \frac nd \right\rfloor$. For $n = 100$ and $d = 7$, $7 \cdot 14 = 98 \le 100 \lt 105 = 7 \cdot 15$, so there are $14$.

The numbers divisible by both $a$ and $b$ are exactly the multiples of $\operatorname{lcm}(a, b)$, which is why that term appears when [[pie|inclusion-exclusion]] removes the double count.

## Useful observations
- $\left\lfloor \frac{\lfloor n/a \rfloor}{b} \right\rfloor = \left\lfloor \frac{n}{ab} \right\rfloor$, so counts of multiples of multiples can be taken in stages.
- The numbers up to $n$ with remainder $r$ on division by $d$ number $\left\lfloor \frac{n - r}{d} \right\rfloor + 1$ for $0 \le r \le n$.
- Summed over $d$, $\sum_{d \le n}\left\lfloor \frac nd \right\rfloor$ is the total number of divisors of $1, \ldots, n$.

## Applications
Counts of integers in a range with divisibility conditions, the terms of Legendre's Formula, and divisor sums written as sums of floors.

## Contest profile
Constant at MATHCOUNTS and AMC level, usually with inclusion-exclusion; inside AIME problems it is the counting engine of longer arguments.
`,

"prime-divides-binomial": String.raw`
## Key forms
- $p \mid \binom pk$ for $0 \lt k \lt p$
- $p \mid \binom{p^m}{j}$ for $0 \lt j \lt p^m$
- $\binom{p-1}{k} \equiv (-1)^k \pmod p$

## Conditions
$p$ is prime. For composite $n$ the statement fails: $4 \nmid \binom 42 = 6$.

## Why it works
$\binom pk = \frac{p!}{k!(p - k)!}$ is an integer. The prime $p$ divides the numerator once, and for $0 \lt k \lt p$ every factor of $k!$ and $(p - k)!$ is less than $p$, so by Euclid's Lemma $p$ does not divide the denominator. Hence $p$ divides the integer $\binom pk$. For $\binom{p-1}{k}$, each factor $\frac{p - j}{j} \equiv -1 \pmod p$ in the product $\prod_{j=1}^{k}\frac{p - j}{j}$.

## Useful observations
- The whole interior of row $p$ of Pascal's triangle is divisible by $p$: row $7$ reads $7, 21, 35, 35, 21, 7$ inside.
- It gives the freshman's dream $(a + b)^p \equiv a^p + b^p \pmod p$.
- $2^p - 2 = \sum_{0 \lt k \lt p}\binom pk$ is divisible by $p$.

## Applications
Binomial expansions modulo a prime, Fermat's Little Theorem, and digit arguments such as Lucas's Theorem.

## Contest profile
A lemma inside binomial expansions modulo $p$.
`,

"bertrands-postulate": String.raw`
## Key forms
- $n \ge 1 \implies$ some prime $p$ has $n \lt p \le 2n$
- for $n \ge 2$, some prime lies in $\left(\frac n2, n\right]$ and divides $n!$ exactly once

## Conditions
$n$ is a positive integer. The postulate guarantees existence only; the number of primes in $(n, 2n]$ is roughly $\frac{n}{\ln n}$.

## Why it works
The proof compares two estimates of $N = \binom{2n}{n}$. From below, $N$ is the largest of the $2n + 1$ terms of $(1 + 1)^{2n}$, so $N \ge \frac{4^n}{2n + 1}$.

From above, look at its prime factors. By Kummer's Theorem every prime power dividing $N$ is at most $2n$, so primes above $\sqrt{2n}$ appear at most once. Primes $p$ with $\frac{2n}{3} \lt p \le n$ do not divide $N$ at all, since $p$ and $2p$ are the only multiples of $p$ up to $2n$ and they are cancelled by the two copies of $p$ in $n! \cdot n!$.

## Useful observations
- The guarantee is weak, as the interval usually holds many primes: between $10$ and $20$ there are four, $11$, $13$, $17$, and $19$.
- $n!$ is never a perfect square for $n \ge 2$, since a prime in $\left(\frac n2, n\right]$ appears to the first power.
- Starting from $2$ and repeatedly taking a prime below twice the last gives a chain such as $2, 3, 5, 7, 13, 23, 43, 83, 163, 317, 631$.

## Applications
Existence arguments about primes in ranges, factorials that are not perfect powers, and constructions needing a large prime.

## Contest profile
An olympiad existence tool, occasionally useful in AIME-level arguments about factorials.

## Full proof
Suppose no prime lies in $(n, 2n]$. Then every prime factor of $N = \binom{2n}{n}$ is at most $\frac{2n}{3}$. Those up to $\sqrt{2n}$ contribute prime powers of at most $2n$ each, so at most $(2n)^{\sqrt{2n}}$ together; those above $\sqrt{2n}$ contribute at most their product, and the product of all primes up to $x$ is less than $4^x$ (by induction, using $\prod_{m + 1 \lt p \le 2m + 1} p \le \binom{2m + 1}{m} \le 4^m$).

So $\frac{4^n}{2n + 1} \le N \le (2n)^{\sqrt{2n}} \cdot 4^{2n/3}$, that is $4^{n/3} \le (2n + 1)(2n)^{\sqrt{2n}}$. The left side grows exponentially and the right only like $e^{c\sqrt n \log n}$; checking the logarithms shows the inequality fails for all $n \ge 468$. For $n \lt 468$ the chain $2, 3, 5, 7, 13, 23, 43, 83, 163, 317, 631$, each prime less than twice the previous, puts a prime in every interval $(n, 2n]$.
`,

"chicken-mcnugget": String.raw`
## Key forms
- largest non-representable: $ab - a - b$
- number of non-representable positive integers: $\frac{(a - 1)(b - 1)}{2}$
- $n$ and $ab - a - b - n$: exactly one is representable, for $0 \le n \le ab - a - b$

## Conditions
$\gcd(a, b) = 1$ and $x, y \ge 0$. If $\gcd(a, b) = g \gt 1$, only multiples of $g$ are representable, and the theorem applies to $\frac ag$, $\frac bg$. For three or more values there is no closed formula.

## Why it works
Sort the amounts by remainder mod $a$. Adding an $a$ stays in the class, so once a class contains a representable amount, all larger amounts in it are representable. The smallest representable amount in each class uses no $a$, so it is one of $0, b, 2b, \ldots, (a - 1)b$, which leave different remainders since $\gcd(a, b) = 1$.

{{figure:grid}}

The class that starts last begins at $(a - 1)b$, so the amount just before it, $(a - 1)b - a = ab - a - b$, is the largest one not representable. For the count, if both $n$ and $ab - a - b - n$ were representable, so would be their sum $ab - a - b$; and if neither were, the class argument shows $ab - a - b - n$ is. So exactly half of $0, \ldots, ab - a - b$ are not representable.

## Useful observations
- Exactly half of the amounts $0, \ldots, ab - a - b$ are impossible, $\frac{(a - 1)(b - 1)}{2}$ of them: with stamps of $5$ and $8$, the largest impossible amount is $27$, and $14$ amounts are impossible.
- Once $a$ consecutive amounts are reachable, every larger amount is too, by adding copies of $a$; this is why everything above $ab - a - b$ is representable.
- For three coin values, reducing by a common factor of two of them often leads back to two values.

## Applications
Coin, stamp and package problems, and counts of attainable totals.

## Contest profile
AMC and AIME problems, often after a parity or divisibility step reduces to two coprime values, or run backwards to find the values.
`,

"pythagorean-triples": String.raw`
## Key forms
- primitive triples: $(m^2 - n^2,\ 2mn,\ m^2 + n^2)$, $m \gt n$ coprime, opposite parity
- in every triple one leg is a multiple of $3$, one leg a multiple of $4$, and one side a multiple of $5$
- inradius of the primitive triangle: $r = n(m - n)$

## Conditions
The parametrization gives each primitive triple exactly once with the even leg $2mn$. Dropping the coprime or parity conditions gives non-primitive triples, possibly with repeats.

## Why it works
In a primitive triple the legs cannot both be even, and not both odd, since then $c^2 \equiv 2 \pmod 4$. So one leg $b$ is even and $c$ is odd. Then $b^2 = (c - a)(c + a)$, with $c - a$ and $c + a$ both even; their halves are coprime, since a common factor would divide $c$ and $a$, and their product $\left(\frac b2\right)^2$ is a square, so each half is a square: $c + a = 2m^2$, $c - a = 2n^2$. That gives $a = m^2 - n^2$, $b = 2mn$, $c = m^2 + n^2$.

Geometrically, a triple is a rational point $\left(\frac ac, \frac bc\right)$ on the unit circle, and the line through $(-1, 0)$ with slope $\frac nm$ meets the circle again at exactly that point.

{{figure:rational}}

## Useful observations
- Small coprime pairs $(m, n)$ of opposite parity give the familiar primitive triples: $(2, 1), (3, 2), (4, 1), (4, 3)$ give $3$-$4$-$5$, $5$-$12$-$13$, $15$-$8$-$17$, and $7$-$24$-$25$.
- Fixing a leg turns the search into factoring: for leg $15$, the factor pairs of $225 = (c - b)(c + b)$ give hypotenuses $113$, $39$, $25$, and $17$.
- The inradius of any integer right triangle is an integer, $r = \frac{a + b - c}{2}$.

## Applications
Integer right triangles, rational points on the circle, lattice-point distances, and integer-sided figures with right angles.

## Contest profile
AMC and AIME problems hide familiar triples in given lengths or in tangents of angles; recognizing them turns geometry into arithmetic.
`,

"pell-equation": String.raw`
## Key forms
- solutions: $x_k + y_k\sqrt D = (x_1 + y_1\sqrt D)^k$
- recurrence: $x_{k+1} = x_1x_k + Dy_1y_k$, $y_{k+1} = x_1y_k + y_1x_k$
- the smallest solution $(x_1, y_1)$ generates all others; for $D = 2$ it is $(3, 2)$

## Conditions
$D \gt 0$ is not a perfect square. For a square $D$ the only solutions are trivial, and $x^2 - Dy^2 = -1$ may or may not have solutions.

## Why it works
The norm $N(x + y\sqrt D) = x^2 - Dy^2$ is multiplicative, since $(x^2 - Dy^2)(u^2 - Dv^2) = (xu + Dyv)^2 - D(xv + yu)^2$. So powers of a solution are solutions.

Conversely, let $\varepsilon = x_1 + y_1\sqrt D \gt 1$ be the smallest solution larger than $1$ and $\eta \gt 1$ any solution. Choose $k$ with $\varepsilon^k \le \eta \lt \varepsilon^{k+1}$. Then $\eta\varepsilon^{-k}$ has norm $1$, since $\varepsilon^{-1} = x_1 - y_1\sqrt D$, and lies in $[1, \varepsilon)$. A norm-$1$ number $u + v\sqrt D \gt 1$ has $u, v \gt 0$, since its conjugate $u - v\sqrt D$ is its reciprocal, in $(0, 1)$. So $\eta\varepsilon^{-k}$, being smaller than $\varepsilon$, must equal $1$, and $\eta = \varepsilon^k$.

## Useful observations
- The fundamental solution comes from the continued fraction of $\sqrt D$, but contest values of $D$ are small enough to search by hand.
- Solutions grow geometrically, each about $\varepsilon$ times the previous: for $D = 2$ they are $(3, 2), (17, 12), (99, 70), \ldots$, with ratio near $3 + 2\sqrt2$.
- $\frac xy$ from Pell solutions are excellent approximations of $\sqrt D$, such as $\frac{99}{70} \approx \sqrt 2$.

## Applications
Square triangular numbers, near-square pairs, and integer solutions of quadratic equations in two variables that reduce to $x^2 - Dy^2 = c$.

## Contest profile
Rare on the AIME, as the hidden structure of a quadratic Diophantine condition; standard in olympiads.
`,

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

"thues-lemma": String.raw`
## Key forms
- $\gcd(a, n) = 1 \implies x \equiv ay \pmod n$ for some $0 \lt |x|, |y| \le \sqrt n$
- $p \equiv 1 \pmod 4$ prime, $a^2 \equiv -1 \implies p = x^2 + y^2$ with $x \equiv ay$

## Conditions
$n \gt 1$ and $\gcd(a, n) = 1$. When $n$ is not a perfect square the bound can be taken as $|x|, |y| \lt \sqrt n$.

## Why it works
Let $m = \lfloor\sqrt n\rfloor$ and consider the $(m + 1)^2 \gt n$ numbers $ai - j$ with $0 \le i, j \le m$. Two of them are congruent mod $n$, so subtracting gives $a(i_1 - i_2) \equiv j_1 - j_2 \pmod n$ with both differences at most $m$ in absolute value and not both zero. If $i_1 = i_2$ then $j_1 \equiv j_2$, impossible for distinct values at most $m \lt n$ apart, so $y = i_1 - i_2 \ne 0$, and likewise $x = j_1 - j_2 \ne 0$ because $a$ is invertible.

## Useful observations
- A square root of $-1$ turns the small solution into a sum of two squares: if $a^2 \equiv -1 \pmod p$ and $x \equiv ay$, then $p \mid x^2 + y^2$ with $0 \lt x^2 + y^2 \lt 2p$, so $x^2 + y^2 = p$; with $a = 5$ mod $13$, $y = 2$ gives $x \equiv -3$ and $13 = 9 + 4$.
- The same argument with $a^2 \equiv -2$ or $a^2 \equiv -3$ represents primes as $x^2 + 2y^2$ or $x^2 + 3y^2$.
- The bound is the most a pigeonhole on a $(m + 1) \times (m + 1)$ box can give, which is why the representation comes out exactly at size $p$.

## Applications
Fermat's two-squares theorem and its relatives, and existence of small solutions to linear congruences.

## Contest profile
An olympiad tool, mostly as the elementary proof that primes $1 \bmod 4$ are sums of two squares.
`,

"factor-pair-counting": String.raw`
## When to use
Equations such as $xy = 2x + 3y$, $\frac1x + \frac1y = \frac1{12}$, $x^2 - y^2 = 2025$ or $m^2 = n^2 + 60$: two unknown integers, degree at most two, and a rearrangement, often [[sfft|Simon's Favorite Factoring Trick]], that leaves a product equal to a number. Counting questions are its best use, because the answer comes straight from a divisor count. An equation that stays a sum after rearranging, or has three unknowns, does not reduce to a product, and [[bounding-diophantine|bounding]] or a congruence is the tool there.

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
## Key forms
- $n = a^2 - b^2$ is solvable $\iff n \not\equiv 2 \pmod 4$
- representations $\leftrightarrow$ factorizations $n = st$, $s \le t$, $s \equiv t \pmod 2$, via $a = \frac{s + t}{2}$, $b = \frac{t - s}{2}$
- odd $n$ has $\left\lceil \frac{d(n)}{2} \right\rceil$ representations, counting $b = 0$ for squares

## Conditions
$n$ is a positive integer and $a, b$ are nonnegative integers; allowing $b = 0$ includes perfect squares.

## Why it works
The factors $a - b$ and $a + b$ differ by $2b$, so they have the same parity: both odd makes $n$ odd, both even makes $n$ a multiple of $4$, and so $n \equiv 2 \pmod 4$ is impossible. Conversely, if $n = st$ with $s \le t$ of the same parity, $a = \frac{s + t}{2}$ and $b = \frac{t - s}{2}$ are integers with $a^2 - b^2 = n$. Every odd $n$ has the pair $1 \cdot n$, and every multiple of $4$ has $2 \cdot \frac n2$.

## Useful observations
- Consecutive squares differ by consecutive odd numbers, $(k + 1)^2 - k^2 = 2k + 1$, which is why every odd number is a difference of squares.
- Squares two apart differ by multiples of $4$: $(k + 1)^2 - (k - 1)^2 = 4k$.
- An equation $x^2 - y^2 = k$ has as many solutions as $k$ has same-parity factor pairs, so its solutions are found by factoring $k$.

## Applications
Which integers are differences of squares, counting representations, and integer solutions of $x^2 - y^2 = k$ and of two square conditions differing by a constant.

## Contest profile
AMC and AIME questions: how many numbers in a range are differences of squares, or two perfect-square conditions subtracted into a factorization.
`,

"farey-sequences": String.raw`
## Key forms
- $\dfrac ab < \dfrac cd$ are neighbors in a Farey sequence exactly when $bc - ad = 1$
- the mediant $\dfrac{a + c}{b + d}$ of two neighbors is the first fraction to appear between them, in $F_{b+d}$
- $\alt{\lvert F_n\rvert = 1 + \sum_{k \le n}\varphi(k)}{\lvert F_n\rvert = 1 + \varphi(1) + \varphi(2) + \cdots + \varphi(n)}$, which is about $\dfrac{3n^2}{\pi^2}$

## Conditions
$F_n$ lists the reduced fractions in $[0, 1]$ with denominator at most $n$, in increasing order.

## Why it works
The condition $bc - ad = 1$ says that consecutive Farey fractions form a unimodular pair, with no lattice point strictly between their vectors ([[picks-theorem|Pick's Theorem]] on the empty triangle). The mediant is the sum of the two lattice vectors, the unique next fraction between them.

## Useful observations
- The fraction with the smallest denominator between two given fractions comes from descending through mediants, as in a Stern–Brocot search.
- The neighbors of $\frac ab$ in a Farey sequence come from solving $bc - ad = 1$.
- The counting formula comes from the number of reduced fractions with each denominator.

## Applications
Fractions with bounded denominators, best rational approximations, and neighbor and mediant questions.

## Contest profile
AIME problems on fractions with bounded denominators, and the hidden mediant structure behind Ford-circle configurations.
`,

"repeating-decimals": String.raw`
## Key forms
- $0.\overline{d_1\cdots d_k} = \frac{d_1\cdots d_k}{\underbrace{99\cdots9}_{k}}$
- with $j$ digits before the repeat: divide by $10^j$ after separating them
- period of $\frac1n$, $\gcd(n, 10) = 1$: $\operatorname{ord}_n(10)$, a divisor of $\varphi(n)$

## Conditions
The block formula needs the repeat to start right after the decimal point; factors of $2$ and $5$ in a denominator create the digits before the repeat.

## Why it works
If $x = 0.\overline{d_1\cdots d_k}$, then $10^kx = d_1\cdots d_k.\overline{d_1\cdots d_k}$, and subtracting cancels the infinite tail: $(10^k - 1)x = d_1\cdots d_k$. The same fact is a geometric series with ratio $10^{-k}$.

In the long division of $1$ by $n$, each step multiplies the remainder by $10$ and reduces mod $n$, and the digit depends only on the remainder. So the digits repeat when a remainder repeats, and for $n$ coprime to $10$ the remainder first returns to $1$ after $\operatorname{ord}_n(10)$ steps.

{{figure:division}}

## Useful observations
- The denominator splits into a part $2^a5^b$, which sets the number of digits before the repeat, $\max(a, b)$, and a part coprime to $10$, which sets the period.
- Every fraction $\frac{k}{999}$ has a three-digit repeating block, and $999 = 27 \cdot 37$, so the fractions with period dividing $3$ are those with denominator dividing $999$.
- The period of $\frac1p$ divides $p - 1$, and equals $p - 1$ exactly when $10$ is a primitive root mod $p$, as for $\frac17 = 0.\overline{142857}$.

## Applications
Converting between decimals and fractions, periods of decimal expansions, and counting fractions with a given period.

## Contest profile
MATHCOUNTS and AMC conversions; AIME counts of reduced fractions whose denominator is a string of nines, and questions about periods.
`,

"terminating-decimals": String.raw`
## Key forms
- $\frac mn$ in lowest terms terminates $\iff n = 2^a5^b$
- the number of decimal places is $\max(a, b)$
- otherwise the decimal repeats, with $\max(a, b)$ digits before the repeat

## Conditions
The fraction must be in lowest terms: $\frac36$ terminates although $6$ has the factor $3$.

## Why it works
A decimal with $k$ places is an integer over $10^k$. So $\frac mn$ terminates with $k$ places exactly when $10^k \cdot \frac mn$ is an integer, that is, when $n \mid 10^km$, which for $\gcd(m, n) = 1$ means $n \mid 10^k = 2^k5^k$. That happens for some $k$ exactly when $n = 2^a5^b$, and the least $k$ is $\max(a, b)$.

## Useful observations
- Only the reduced denominator matters, so a factor of the numerator can cancel an unwanted prime: $\frac{k}{120}$ terminates exactly when $3 \mid k$.
- The unit fractions $\frac1n$ that terminate are exactly those with $n$ of the form $2^a5^b$.
- In base $b$ the same holds with the primes of $b$ in place of $2$ and $5$.

## Applications
Deciding whether a fraction terminates, counting terminating fractions, and decimal lengths.

## Contest profile
AMC counting questions, where the tested point is reducing the fraction first.
`,

"base-conversion": String.raw`
## Key forms
- $(d_k\cdots d_0)_b = \alt{\sum_{i=0}^{k} d_ib^i}{d_kb^k + \cdots + d_1b + d_0}$, $0 \le d_i \lt b$
- the digits are the remainders of repeated division by $b$, from the right
- $n$ has $\lfloor \log_b n \rfloor + 1$ digits in base $b$

## Conditions
$b \ge 2$ and every digit satisfies $0 \le d_i \le b - 1$. Balanced or negative bases use other digit sets.

## Why it works
A base-$b$ numeral counts in bundles: $d_0$ ones, $d_1$ bundles of $b$, $d_2$ bundles of $b^2$, never $b$ or more of one size. Dividing $n$ by $b$ leaves a remainder from $0$ to $b - 1$, which is $d_0$, since everything else is a multiple of $b$; the quotient counts bundles of $b$, and repeating gives the other digits. For $200$ in base $7$: $200 = 28 \cdot 7 + 4$, $28 = 4 \cdot 7 + 0$, $4 = 0 \cdot 7 + 4$, so $200 = 404_7$.

## Useful observations
- $b^k$ is $1$ followed by $k$ zeros, and $b^k - 1$ is $k$ copies of the top digit $b - 1$.
- A number with all digits equal is that digit times a repunit $\overline{11\cdots1}_b = \frac{b^k - 1}{b - 1}$.
- A digit condition in an unknown base becomes a polynomial equation in $b$, and the bound $d \lt b$ discards most of its roots; $\overline{121}_b = (b + 1)^2$ is a square in every base $b \ge 3$.
- A number's remainder mod $b - 1$ is its digit sum, and mod $b + 1$ its alternating digit sum.

## Applications
Puzzles with digits in unknown bases, subsets encoded in binary, sums of distinct powers in ternary, and digit counts.

## Contest profile
Common at every level, usually as a polynomial equation in the base with digit bounds leaving a few cases.

## Full proof
Existence is the division process: each step divides the quotient by $b$, so the quotients decrease to $0$, and reassembling gives $n = \sum d_ib^i$ with $0 \le d_i \lt b$. For uniqueness, if $\sum d_ib^i = \sum e_ib^i$ with all digits in $\{0, \ldots, b - 1\}$, reducing mod $b$ gives $d_0 \equiv e_0$, so $d_0 = e_0$; subtracting and dividing by $b$ repeats the argument one place to the left.
`,

"lattice-points-gcd": String.raw`
## Key forms
- $\gcd(a, b) - 1$ — the number of lattice points strictly between $(0, 0)$ and $(a, b)$ on the segment joining them; $\gcd(a, b) + 1$ counting the ends
- $m + n - \gcd(m, n)$ — the number of unit squares the diagonal of an $m \times n$ grid passes through
- $a + b + c - \gcd(a, b) - \gcd(b, c) - \gcd(c, a) + \gcd(a, b, c)$ — the unit cubes crossed by the diagonal of an $a \times b \times c$ box
- $(a, b)$ is visible from the origin, with no lattice point in between, exactly when $\gcd(a, b) = 1$

## Conditions
$a$ and $b$ are integers (for a segment between two lattice points the differences $|x_2 - x_1|$ and $|y_2 - y_1|$ play this role); $m$ and $n$ are positive integers.

## Why it works
The segment is made of $\gcd(a, b)$ equal steps, each the smallest lattice vector in its direction.

Let $g = \gcd(a, b)$. The vector $\left(\frac ag, \frac bg\right)$ has coordinates with no common factor, and the segment is $g$ copies of it laid end to end, so it passes through the $g - 1$ lattice points between the copies. There are no others: a lattice point $t(a, b)$ with $0 < t < 1$ needs $ta$ and $tb$ both to be integers, which forces $t$ to be a multiple of $\frac1g$.

For the squares, the diagonal of an $m \times n$ grid crosses $m - 1$ inner vertical lines and $n - 1$ inner horizontal lines, and each crossing takes it into a new square. At each of the $g - 1$ interior lattice points it crosses one of each at once and enters only one new square, so it visits $1 + (m - 1) + (n - 1) - (g - 1) = m + n - g$ squares.

{{figure:squares}}

## Useful observations
- For Pick's Theorem, the boundary points are counted edge by edge: an edge from $(x_1, y_1)$ to $(x_2, y_2)$ contributes $\gcd(|x_2 - x_1|, |y_2 - y_1|)$ points, counting one endpoint, so adding over the edges counts each vertex once.
- The segment from $(0, 0)$ to $(9, 6)$ is three steps of $(3, 2)$, so it has $2$ interior lattice points.
- The three-dimensional count follows by inclusion-exclusion on the crossings of the planes.

## Applications
Lattice points on a segment or a polygon's boundary (the boundary count in Pick's Theorem), squares crossed by a diagonal, and visibility from the origin.

## Contest profile
Often split by the value of the gcd into [[casework-method|cases]]. The recurring shapes are a diagonal crossing grid squares, lattice points on a segment or on a polygon's boundary, and the points of a grid visible from the origin.
`,

"wolstenholme": String.raw`
## Key forms
- $1 + \frac12 + \cdots + \frac{1}{p - 1} \equiv 0 \pmod{p^2}$, for $p \ge 5$
- $\binom{2p}{p} \equiv 2 \pmod{p^3}$ and $\binom{2p - 1}{p - 1} \equiv 1 \pmod{p^3}$, for $p \ge 5$
- $\alt{\sum_{k=1}^{p-1} \frac{1}{k^2}}{\frac{1}{1^2} + \frac{1}{2^2} + \cdots + \frac{1}{(p-1)^2}} \equiv 0 \pmod p$, for $p \ge 5$

## Conditions
$p \ge 5$ is prime; fractions are read as residues, since their denominators are coprime to $p$. For $p = 3$ the harmonic sum is $\frac32$, divisible by $3$ but not $9$.

## Why it works
Pair $k$ with $p - k$: $\frac1k + \frac{1}{p - k} = \frac{p}{k(p - k)}$, so $2H = p\sum_{k=1}^{p-1}\frac{1}{k(p - k)}$, where $H$ is the harmonic sum. It remains to show the last sum is $0$ mod $p$. Modulo $p$, $\frac{1}{k(p - k)} \equiv -\frac{1}{k^2}$, and as $k$ runs over the nonzero residues so does $\frac1k$, so $\sum\frac{1}{k^2} \equiv \sum_{j=1}^{p-1} j^2 = \frac{(p - 1)p(2p - 1)}{6}$, which is divisible by $p$ when $p \ge 5$, since then $6$ is invertible. So $H \equiv 0 \pmod{p^2}$.

## Useful observations
- The pairing alone shows the numerator of the harmonic sum is divisible by $p$ for every odd prime; the extra factor of $p$ needs the sum of inverse squares.
- The extra factor of $p$ is visible already at $p = 5$: $1 + \frac12 + \frac13 + \frac14 = \frac{25}{12}$, with numerator exactly $5^2$.
- Sums of $k$th powers of the nonzero residues vanish mod $p$ unless $(p - 1) \mid k$, which is the general reason sums like $\sum\frac{1}{k^2}$ vanish.

## Applications
Congruences for harmonic sums and for central binomial coefficients modulo prime powers.

## Contest profile
An olympiad fact; its mod-$p$ version by pairing is the part that appears in training problems.
`,

"cyclotomic-polynomials": String.raw`
## Key forms
- $\Phi_n(x) = \alt{\prod_{\gcd(k, n) = 1} \left(x - e^{2\pi i k/n}\right)}{(x - \zeta_1)(x - \zeta_2)\cdots(x - \zeta_{\varphi(n)})}$, the product over the primitive $n$th roots of unity; it is monic with integer coefficients and degree $\varphi(n)$
- $x^n - 1 = \alt{\prod_{d \mid n} \Phi_d(x)}{\Phi_{d_1}(x)\Phi_{d_2}(x)\cdots\Phi_n(x)}$ over the divisors of $n$, and by [[mobius-inversion|Möbius inversion]] $\Phi_n(x) = \alt{\prod_{d \mid n}\left(x^d - 1\right)^{\mu(n/d)}}{\frac{\text{the factors } x^d - 1 \text{ with } \mu(n/d) = 1}{\text{the factors } x^d - 1 \text{ with } \mu(n/d) = -1}}$
- $\Phi_p(x) = 1 + x + \cdots + x^{p - 1}$ for a prime $p$, $\Phi_{p^k}(x) = \Phi_p\!\left(x^{p^{k - 1}}\right)$, and $\Phi_{2n}(x) = \Phi_n(-x)$ for odd $n \gt 1$
- for an integer $a$ and a prime $p \nmid n$: $p \mid \Phi_n(a)$ exactly when $a$ has order $n$ modulo $p$, and then $p \equiv 1 \pmod n$
- there are infinitely many primes $p \equiv 1 \pmod n$, for every $n$

## Conditions
The prime-divisor statement is about integer values $\Phi_n(a)$ and primes $p$ that do not divide $n$. A prime that divides both $n$ and $\Phi_n(a)$ is possible, as $3 \mid \Phi_3(1) = 3$ shows, and it need not be $1 \bmod n$.

## Why it works
Step 1, the factorization. The roots of $x^n - 1$ are the $n$ distinct $n$th roots of unity, and each has an exact order $d$, a divisor of $n$. Grouping the roots by their order groups the linear factors into the polynomials $\Phi_d$, which gives $x^n - 1 = \prod_{d \mid n}\Phi_d(x)$. Comparing degrees recovers $\sum_{d \mid n}\varphi(d) = n$, the identity on [[totient-divisor-sum|the Totient Divisor Sum]]. Taking logarithms and applying Möbius inversion to the factorization gives the product formula with exponents $\mu(n/d)$.

Step 2, integer coefficients. By induction on $n$: $\Phi_n(x)$ is $x^n - 1$ divided by the product of the $\Phi_d(x)$ for the smaller divisors $d$, which is monic with integer coefficients by the induction hypothesis. Long division by a monic integer polynomial never leaves the integers, so $\Phi_n$ has integer coefficients.

Step 3, the prime divisors. Let $p \nmid n$ and $p \mid \Phi_n(a)$. Then $p \mid a^n - 1$, so $p \nmid a$ and the order $d$ of $a$ modulo $p$ divides $n$. Suppose $d \lt n$. Then $p \mid a^d - 1 = \prod_{e \mid d}\Phi_e(a)$, so $p \mid \Phi_e(a)$ for some $e \mid d$, $e \lt n$. Modulo $p$, both $\Phi_n$ and $\Phi_e$ have $a$ as a root, and both divide $x^n - 1$, so $a$ is a double root of $x^n - 1$ modulo $p$ and a root of its derivative $nx^{n - 1}$. But $na^{n - 1} \not\equiv 0$, since $p$ divides neither $n$ nor $a$. So $d = n$, and since the order divides $p - 1$ by [[fermats-little-theorem|Fermat's Little Theorem]], $p \equiv 1 \pmod n$. Conversely, if $a$ has order $n$, then $p \mid a^n - 1$ but $p$ divides no $\Phi_e(a)$ with $e \lt n$, because each such factor divides some $a^e - 1$; so $p \mid \Phi_n(a)$.

Step 4, infinitely many primes $1 \bmod n$. Let $n \ge 2$ and suppose $p_1, \ldots, p_k$ are all the primes $\equiv 1 \pmod n$. Put $a = n\,p_1 \cdots p_k$. Since $\Phi_n$ has integer coefficients, $\Phi_n(a) \equiv \Phi_n(0) = 1$ modulo each prime factor of $a$. Also $\Phi_n(a) = \prod |a - \zeta| \gt 1$, because each primitive root $\zeta$ differs from $1$, so $|a - \zeta| \gt a - 1 \ge 1$. So $\Phi_n(a)$ has a prime factor $q$ that divides neither $n$ nor any $p_i$, and by Step 3, $q \equiv 1 \pmod n$, a new prime of that form.

## Useful observations
- $\Phi_n$ is irreducible over the rationals for every $n$. For a prime $n$ this follows from the shift $x \mapsto x + 1$ and the [[eisenstein-criterion|Eisenstein Criterion]]; the proof for composite $n$ is longer and is not given here.
- The constant term $\Phi_n(0)$ is $1$ for every $n \ge 2$, which is what Step 4 uses.
- A prime factor of $a^n - 1$ that divides no $a^d - 1$ with $d \lt n$ must divide $\Phi_n(a)$; [[zsygmondy|Zsigmondy's Theorem]] says such a prime exists apart from a short list of exceptions, and its proof works with $\Phi_n(a)$.
- The first few are $\Phi_1 = x - 1$, $\Phi_2 = x + 1$, $\Phi_3 = x^2 + x + 1$, $\Phi_4 = x^2 + 1$, $\Phi_6 = x^2 - x + 1$, and $\Phi_{12} = x^4 - x^2 + 1$, and they are worth recognizing in disguise.

## Applications
Showing that the prime factors of an expression such as $n^4 - n^2 + 1$ lie in one residue class, constructing infinitely many primes $\equiv 1 \pmod n$, factoring $x^n - 1$ and $x^n + 1$ completely, and finding primitive prime divisors of $a^n - 1$.

## Contest profile
An olympiad tool for number theory problems about the prime factors of $a^n - 1$ or of a polynomial value. It is usually invisible in the statement: the polynomial is a cyclotomic one in disguise, and recognizing it gives the residue class of every prime factor.
`,

"zsygmondy": String.raw`
## Key forms
- $a^n - b^n$ has a prime divisor not dividing any earlier $a^k - b^k$
- exceptions: $(a, b, n) = (2, 1, 6)$, and $n = 2$ with $a + b$ a power of $2$
- the same holds for $a^n + b^n$, with the single exception $2^3 + 1 = 9$

## Conditions
$a \gt b \ge 1$ are coprime and $n \ge 2$. For $n = 1$ the statement is about $a - b \gt 1$ having any prime factor.

## Why it works
The proof is long. It factors $a^n - b^n$ into cyclotomic pieces $\Phi_d(a, b)$ over the divisors $d$ of $n$ and shows that $\Phi_n(a, b)$ is larger than the product of the primes it could share with earlier terms: any such shared prime divides $n$ and appears in $\Phi_n(a, b)$ only to the first power, while $\Phi_n(a, b)$ grows like $a^{\varphi(n)}$. Comparing sizes leaves a new prime except in the listed cases.

## Useful observations
- A primitive prime $q$ of $a^n - b^n$ has $a$ of order $n$ relative to $b$ mod $q$, so $q \equiv 1 \pmod n$.
- The theorem defeats any claim that $a^n - b^n$ has a bounded set of prime factors for all large $n$.
- The exceptions are the first thing to check: $2^6 - 1 = 63 = 3^2 \cdot 7$ brings no new prime, since $3 \mid 2^2 - 1$ and $7 \mid 2^3 - 1$.

## Applications
Exponential Diophantine equations such as $a^n - b^n = $ a prime power, and problems about which primes divide terms of $a^n - 1$.

## Contest profile
An olympiad sledgehammer; most contest uses can also be done with orders or the Lifting the Exponent Lemma.
`,

"fermat-numbers": String.raw`
## Key forms
- $F_n = 2^{2^n} + 1$
- $F_0F_1\cdots F_{n-1} = F_n - 2$
- distinct Fermat numbers are pairwise coprime, so there are infinitely many primes
- $2^m + 1$ can be prime only when $m$ is a power of $2$

## Conditions
$n \ge 0$. The only Fermat numbers known to be prime are $F_0$ through $F_4$.

## Why it works
The product identity follows by telescoping $(2^{2^k} - 1)(2^{2^k} + 1) = 2^{2^{k+1}} - 1$. Any common divisor of two Fermat numbers then divides $2$, but all Fermat numbers are odd, so they are pairwise coprime.

If $m$ has an odd factor $q > 1$, then $2^m + 1$ is divisible by $2^{m/q} + 1$, which is why only powers of $2$ can occur.

## Useful observations
- Pairwise coprimality gives infinitely many primes, since each $F_n$ contributes a prime factor no other one has.
- Constructible regular polygons are governed by products of distinct Fermat primes.
- The telescoping product factors $2^{32} - 1$ into Fermat numbers at once.

## Applications
Factoring numbers of the form $2^{2^k} - 1$, coprimality arguments, and the question of when $2^m + 1$ is prime.

## Contest profile
The telescoping factorization and the coprimality argument recur in contest number theory.
`,

"continued-fraction-convergents": String.raw`
## Key forms
- $p_k = a_kp_{k-1} + p_{k-2}$ and $q_k = a_kq_{k-1} + q_{k-2}$ — the recurrences for the convergents $\frac{p_k}{q_k}$ of $[a_0; a_1, a_2, \ldots]$
- $p_kq_{k-1} - p_{k-1}q_k = (-1)^{k-1}$ — consecutive convergents are Farey neighbors
- the convergents are the best rational approximations with a bounded denominator

## Conditions
The partial quotients $a_k$ are positive integers for $k \ge 1$. The starting values are $p_{-1} = 1$, $q_{-1} = 0$, $p_0 = a_0$, $q_0 = 1$.

## Why it works
Convergents satisfy the recurrence above, and the determinant identity follows by induction. At the first step $p_0q_{-1} - p_{-1}q_0 = -1$, and substituting the recurrence, $p_kq_{k-1} - p_{k-1}q_k = (a_kp_{k-1} + p_{k-2})q_{k-1} - p_{k-1}(a_kq_{k-1} + q_{k-2}) = -(p_{k-1}q_{k-2} - p_{k-2}q_{k-1})$, which flips the sign each step.

In matrix form each step multiplies by a matrix of determinant $-1$, a unimodular [[matrix-multiplication|matrix multiplication]], which is why the determinant stays $\pm1$.

## Useful observations
- Best rational approximations with bounded denominator are convergents, the tool for "closest fraction to a number with denominator under a bound" questions.
- The determinant identity gives instant solutions to $ax - by = \pm 1$, which is [[bezouts-identity|Bézout's Identity]] via continued fractions.
- Consecutive convergents are Farey neighbors.

## Applications
Rational approximation, Pell equations, and Stern–Brocot and mediant arguments.

## Contest profile
Approximation problems and Pell-equation fundamentals, since the continued fraction of $\sqrt D$ finds the fundamental solution. It also underlies Stern–Brocot and mediant search arguments on AIME-level fraction problems.
`,

"digit-count": String.raw`
## Key forms
- number of digits of $n$ in base $b$: $\lfloor \log_b n \rfloor + 1$
- leading digits of $n$: those of $10^{f}$, where $f$ is the fractional part of $\log_{10} n$
- the values of $\log_{10} 2$ and $\log_{10} 3$, about $0.30103$ and $0.47712$, give most other logarithms needed

## Conditions
$n$ is a positive integer. Near powers of ten the logarithm must be known accurately enough to decide the floor.

## Why it works
$n$ has $d$ digits exactly when $10^{d-1} \le n \lt 10^d$; taking logarithms, $d - 1 \le \log_{10} n \lt d$, so $d - 1 = \lfloor \log_{10} n \rfloor$. If $\log_{10} n = k + f$ with $0 \le f \lt 1$, then $n = 10^f \cdot 10^k$, and $10^f$, between $1$ and $10$, is $n$ with its decimal point moved, which gives the leading digits.

## Useful observations
- A product has either the sum of its factors' digit counts or one fewer, since logarithms add.
- $2^k$ and $5^k$ together have $k + 1$ digits, because $2^k \cdot 5^k = 10^k$ and neither is a power of ten.
- Leading-digit questions about powers $a^k$ become questions about the fractional parts of $k\log_{10} a$: $2^k$ starts with $1$ exactly when that fractional part is below $\log_{10} 2$.

## Applications
Digit counts of large numbers, leading digits of powers, and how often powers begin with a given digit.

## Contest profile
AMC questions on digit counts, often after factoring a product into a power of ten times a small number.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"hensel-lifting": String.raw`
## When to use
Congruences modulo $p^2$, $p^3$ or a higher power: $x^2 \equiv a \pmod{p^k}$, $x^3 \equiv a \pmod{7^3}$, or counting the solutions of a polynomial congruence modulo a composite number, which the [[crt|Chinese Remainder Theorem]] first splits into prime powers. It also predicts, before any computation, whether a root modulo $p$ extends to one root, to many, or to none. A congruence modulo a prime itself needs only a check of residues.

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

"carmichael-function": String.raw`
## Key forms
- $\lambda(p^k) = p^{k-1}(p - 1)$ for odd $p$; $\lambda(2) = 1$, $\lambda(4) = 2$, $\lambda(2^k) = 2^{k-2}$ for $k \ge 3$
- $\lambda(n) = \operatorname{lcm}\left(\lambda(p_1^{a_1}), \ldots, \lambda(p_k^{a_k})\right)$
- $\lambda(n)$ divides $\varphi(n)$, and the order of each base coprime to $n$ divides $\lambda(n)$

## Conditions
The universal exponent applies to bases coprime to $n$. The order of any particular base divides $\lambda(n)$, which divides $\varphi(n)$.

## Why it works
For odd primes the units mod $p^k$ form a cyclic group of order $\varphi(p^k)$, so the smallest exponent killing every unit is $\varphi(p^k)$ itself. Mod $2^k$ with $k \ge 3$ they do not: every odd square is $1 \bmod 8$, and squaring repeatedly shows $a^{2^{k-2}} \equiv 1 \pmod{2^k}$ for every odd $a$, while $5$ has order exactly $2^{k-2}$. The Chinese Remainder Theorem splits congruences mod $n$ into congruences mod each prime power, and an exponent works for all of them exactly when it is a multiple of each one's universal exponent, that is, of their lcm.

## Useful observations
- $\lambda$ can be much smaller than $\varphi$, since the cycles of the prime-power parts need only a common multiple: $\lambda(1000) = \operatorname{lcm}(\lambda(8), \lambda(125)) = \operatorname{lcm}(2, 100) = 100$, against $\varphi(1000) = 400$.
- Every odd $a$ has $a^2 \equiv 1 \pmod 8$, which is $\lambda(8) = 2$.
- Composite $n$ with $\lambda(n) \mid n - 1$ are exactly the Carmichael numbers, such as $561$.

## Applications
Sharper exponent reduction for remainders of huge powers, towers of exponents, and Carmichael numbers.

## Contest profile
An AIME refinement of Euler's Theorem: for last-digit questions it cuts the exponent modulus by a factor of four.
`

});

Object.assign(window.MATH_DETAILS, {

"floor-sum-reciprocity": String.raw`
## Key forms
- $\alt{\sum_{k=1}^{q-1}\left\lfloor\dfrac{kp}{q}\right\rfloor = \dfrac{(p - 1)(q - 1)}{2}}{\left\lfloor\tfrac pq\right\rfloor + \left\lfloor\tfrac{2p}{q}\right\rfloor + \cdots + \left\lfloor\tfrac{(q-1)p}{q}\right\rfloor = \dfrac{(p-1)(q-1)}{2}}$ for $\gcd(p, q) = 1$
- $\left\lfloor\dfrac{kp}{q}\right\rfloor + \left\lfloor\dfrac{(q - k)p}{q}\right\rfloor = p - 1$ for $0 < k < q$

## Conditions
$p$ and $q$ are positive and coprime, so that no interior lattice point lies on the diagonal of the rectangle.

## Why it works
The term $\lfloor\frac{kp}{q}\rfloor$ counts the lattice points $(k, j)$ with $1 \le j \le \frac{kp}{q}$, the points strictly below the diagonal in column $k$ of the $q \times p$ rectangle. Coprimality keeps the diagonal off the lattice, and the half-turn symmetry of the rectangle pairs each interior point below the diagonal with one above, which splits the $(p-1)(q-1)$ interior points evenly.

## Useful observations
- Floor sums over a full period are evaluated at once, and partial ranges pair $k$ with $q - k$.
- Sums of floors are counts of lattice points under a line, so Pick-style arguments and symmetry both apply.
- A "sum of remainders" converts to a floor sum through $kp = q\lfloor\frac{kp}{q}\rfloor + (kp \bmod q)$.
- The same pairing, one level deeper, is the key lemma in [[eisenstein-criterion|Eisenstein's]] proof of [[quadratic-reciprocity|quadratic reciprocity]].

## Applications
Floor sums over a full period, sums of remainders, and lattice points under a line.

## Contest profile
AIME floor-sum problems, often disguised as sums of remainders.
`

});

Object.assign(window.MATH_DETAILS, {

"lattice-points-circle": String.raw`
## Key forms
- $\#\{(a, b) \in \mathbb{Z}^2 : a^2 + b^2 = n\} = 4\big(d_1(n) - d_3(n)\big)$ — where $d_1$ and $d_3$ count the divisors of $n$ congruent to $1$ and $3$ mod $4$
- the count is $0$ exactly when some prime $\equiv 3 \pmod 4$ divides $n$ to an odd power

## Conditions
The count is of ordered, signed representations, so $(a, b)$, $(-a, b)$, $(b, a)$ and so on are all counted.

## Why it works
In the Gaussian integers $\mathbb{Z}[i]$, $a^2 + b^2 = (a + bi)(a - bi)$, and unique factorization sorts primes into split ($p \equiv 1 \pmod 4$, contributing choices), inert ($p \equiv 3 \pmod 4$, demanding even exponents), and ramified ($2$). Counting the factorization choices yields $4(d_1 - d_3)$, the $4$ being the unit rotations $\pm1, \pm i$.

## Useful observations
- Representations are counted without being found: $d_1(n) - d_3(n)$ is computed over the divisors.
- A power of a split prime contributes one more than its exponent; any prime $\equiv 3 \pmod 4$ to an odd power kills everything; factors of $2$ and squares of inert primes just scale existing points.
- For the number of ways $n$ is a sum of two squares, the symmetries have to be divided out carefully, since the $4(d_1 - d_3)$ count is ordered and signed.

## Applications
Lattice points on a circle, the number of ways to write an integer as a sum of two squares, and Pythagorean-triple counts.

## Contest profile
Direct plug-in for "how many lattice points on this circle" questions, and the cleaner route to counting representations as a sum of two squares.
`,

"gaussian-integers": String.raw`
## Key forms
- $N(a + bi) = a^2 + b^2 = (a + bi)(a - bi)$ and $N(zw) = N(z)N(w)$ — the multiplicative norm of $\mathbb{Z}[i]$, whose units are $\pm1, \pm i$
- a prime $p \equiv 1 \pmod 4$ splits into two conjugate Gaussian primes and is a sum of two squares; $p \equiv 3 \pmod 4$ stays inert; and $2 = -i(1 + i)^2$ ramifies
- the Eisenstein integers $\mathbb{Z}[\omega]$, $\omega = e^{2\pi i/3}$, have norm $N(a + b\omega) = a^2 - ab + b^2$, with primes classified mod $3$

## Conditions
Unique factorization holds in $\mathbb{Z}[i]$ and $\mathbb{Z}[\omega]$ up to units and the order of the factors.

## Why it works
$\mathbb{Z}[i]$ is a Euclidean domain, since division with remainder works by rounding to the nearest Gaussian integer, so it has unique factorization. The norm is multiplicative because it is $\lvert z\rvert^2$, which turns questions about sums of two squares into questions about factorization.

A rational prime $p$ behaves by whether $-1$ is a quadratic residue mod $p$: $p \equiv 1 \pmod 4$ makes $x^2 \equiv -1$ solvable, so $p \mid (x + i)(x - i)$ splits; $p \equiv 3 \pmod 4$ stays prime; and $2$ ramifies.

## Useful observations
- $\mathbb{Z}[i]$ is used whenever $a^2 + b^2$ appears: it is factored as $(a + bi)(a - bi)$ and unique factorization is leaned on.
- It proves [[sum-of-two-squares|Fermat's Two-Square Theorem]], powers the $4(d_1 - d_3)$ representation count, parametrizes Pythagorean triples through $(m + ni)^2$, and multiplies sums of two squares together.
- The Eisenstein integers do the same for $a^2 - ab + b^2$ (the same values as $a^2 + ab + b^2$) and for problems with cube-root-of-unity symmetry ($120^\circ$).

## Applications
Sums of two squares and the number of their representations, Pythagorean triples, and norm forms $a^2 - ab + b^2$.

## Contest profile
Chiefly an olympiad tool, but its consequences reach the AIME (sum-of-two-squares counts, Pythagorean-triple parametrizations). Primes $\equiv 1 \pmod 4$ split and are sums of two squares, while primes $\equiv 3 \pmod 4$ stay inert.
`

});

Object.assign(window.MATH_DETAILS, {


"choose-modulus": String.raw`
## When to use
Reach for a modulus when a problem asks you to show an equation has no integer solutions, or when an integer search has far too many cases. The signal is a term whose remainders are scarce. Squares, cubes and fourth powers each hit only a few residues, a factorial $n!$ is $0$ modulo every prime up to $n$, the powers of a fixed base cycle, and digit conditions live naturally modulo $9$, $10$ and $11$. Pick the modulus to fit: $4$ or $8$ for squares, $9$ or $7$ for cubes, $16$ for fourth powers, $9$ for digit sums, $11$ for alternating digit sums, $10$ for last digits.

An equation whose solutions are to be found, not ruled out, needs bounding or factoring first; a modulus only shows that none exist.

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
- [[last-digit-patterns]]: units digits of powers repeat with period dividing $4$, so modulo $10$ a power takes only a few values.

## Common traps
- Treating a modulus that fails to rule out solutions as evidence that solutions exist; it only means that modulus is the wrong one.
- Forgetting the residue $0$: a variable divisible by $m$ behaves differently, as when $3 \mid x$ makes $x^3 \equiv 0 \pmod 9$.
- Reducing an exponent modulo $m$ instead of modulo the period of the base: $2^{100} \bmod 7$ uses $100 \bmod 3$, since $2^3 \equiv 1 \pmod 7$.

## Contest profile
Usually a single decisive line: the right modulus either ends a "show there are no solutions" problem outright or cuts an AIME search down to a few residue classes for another method to finish.
`,

"recognition-numbers": String.raw`
## Key forms
- the "fake primes" with a factor of $7$ — $91 = 7 \cdot 13$, $119 = 7 \cdot 17$, and $133 = 7 \cdot 19$, products of two primes from $7$ to $19$ that pass the quick tests for $2$, $3$, and $5$
- the fake primes with a factor of $11$ are $143 = 11 \cdot 13$, $187 = 11 \cdot 17$, and $209 = 11 \cdot 19$, each of which passes the quick tests for $2$, $3$, and $5$ and is easily mistaken for a prime
- the fake primes made of larger primes — $221 = 13 \cdot 17$, $247 = 13 \cdot 19$, and $323 = 17 \cdot 19$
- the repeated-digit family is built on $1001 = 7 \cdot 11 \cdot 13$, together with $111 = 3 \cdot 37$, $999 = 3^3 \cdot 37$, and $101 \cdot 9901 = 1000001$, and the taxicab number $1729 = 7 \cdot 13 \cdot 19$ belongs with them
- among the powers and factorials worth knowing, $2^{10} = 1024$ is close to $10^3$, which converts between powers of two and powers of ten, while $7! = 5040$ and $10! = 3{,}628{,}800$ keep appearing in counting answers
- constants for estimates — $\sqrt2 \approx 1.414$, $\sqrt3 \approx 1.732$, $\sqrt5 \approx 2.236$, $\pi \approx 3.1416$, $\log_{10}2 \approx 0.301$, $\log_{10}3 \approx 0.477$ — constants for estimates
- $7^4 = 2401 \equiv 1 \pmod{100}$ — the last two digits of powers of $7$

## Conditions
There is no theorem here: these are facts about particular numbers, and the decimal values are approximations. The factorizations are exact.

## Why it works
There is no theorem here, only the reason these particular numbers keep appearing.

Divisibility by $2$, $3$, and $5$ can be seen at a glance, so a number that passes those tests looks prime. A composite number that passes them has all its prime factors at least $7$, and the products of two primes from $7$ to $19$ are the ones that turn up most. Knowing those few products means $221$ or $323$ never slows anything down.

$1001 = 7 \cdot 11 \cdot 13$ is behind a whole family of tricks. Repeating a three-digit block multiplies it by $1001$, $$\overline{abcabc} = \overline{abc} \cdot 1001 = \overline{abc} \cdot 7 \cdot 11 \cdot 13,$$ so every such six-digit number is divisible by $7$, $11$, and $13$. And $2^{10} = 1024$ is so close to $10^3$ that it converts between powers of $2$ and powers of $10$ with an error under $3\%$.

## Useful observations
- To factor a three-digit number, the primes $7$, $11$, $13$, $17$, and $19$ are tested after the obvious small ones. A number below $529 = 23^2$ that passes all of them is prime, since a composite one would need two prime factors of at least $23$.
- The repeated-digit family cracks numbers like $111111 = 111 \cdot 1001$: $111 = 3 \cdot 37$, $999 = 3^3 \cdot 37$, $10101 = 3 \cdot 7 \cdot 13 \cdot 37$, and $101 \cdot 9901 = 1000001$.
- $7^4 = 2401 \equiv 1 \pmod{100}$, so the last two digits of $7, 7^2, 7^3, 7^4, \ldots$ run $07, 49, 43, 01$ and repeat every four. [[eulers-theorem|Euler's Theorem]] only promises a repeat every $40$ steps; $7$ has [[multiplicative-order|order]] $4$ modulo $100$. So $7^{2025}$ ends in $07$, because $2025$ is one more than a multiple of $4$.
- For estimates, $\log_{10} 2 \approx 0.301$ and $\log_{10} 3 \approx 0.477$ settle digit counts and size comparisons, and the square-root values settle which answer choice a messy expression is closest to.

## Applications
Quick factorizations, divisibility of repeated-digit numbers, last digits of powers, digit counts, and estimates of roots and logarithms.

## Contest profile
Four problems here, all solved by it alone, and really two, each shared between the AMC 10 and AMC 12. They reward recognizing familiar products, such as the repeated-digit factorizations, instead of multiplying out. AIME answers often need a quick factorization of a fake prime, and AMC estimates lean on powers of two as powers of ten.
`,

"digit-manipulation": String.raw`
## Distinguishing clues
- The condition names individual digits: their sum, their order, a digit moved or deleted.
- Not this pattern: a question about how many digits a number has, which belongs to [[digit-count|the number of digits]], or one about the last digits of a huge power, which is a question about remainders, not digits.

## Methods and Formulas to Try
Translate first, $\overline{abc} = 100a + 10b + c$, and every condition becomes an equation in bounded unknowns. Reversals then factor at once: $\overline{ab} + \overline{ba} = 11(a + b)$, $\overline{ab} - \overline{ba} = 9(a - b)$, and $\overline{abc} - \overline{cba} = 99(a - c)$, where the middle digit drops out.

### Methods to try
- [[bounding-diophantine]]: compare the sizes of the two sides before searching. A $k$-digit number is at least $10^{k-1}$ while its digit sum is at most $9k$, so a condition such as $N = 7 \cdot S(N)$ rules out four or more digits ($1000 \gt 7 \cdot 36$); the digits themselves, $1$ to $9$ when leading and $0$ to $9$ otherwise, then leave a short check.
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
"Find every integer $n$ that makes this expression a perfect square", for a polynomial expression whose leading part is close to a square, and the related task of computing $\lfloor \sqrt N \rfloor$ for a large, awkward $N$. The same idea works for cubes and for products of consecutive integers. An expression that is already a square, such as $n^2 + 2n + 1$, has no gap to fit in.

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
Usually the closing step of a problem that asks for every integer making an expression a perfect square, with a hand check of the few small values it leaves; the floor version also appears on its own.
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
## Key forms
- zeros of $n! = v_5(n!) = \left\lfloor \frac n5 \right\rfloor + \left\lfloor \frac n{25} \right\rfloor + \left\lfloor \frac n{125} \right\rfloor + \cdots$
- zeros of $n!$ in base $b$: $\min$ over prime powers $q^e \,\|\, b$ of $\left\lfloor \frac{v_q(n!)}{e} \right\rfloor$
- each attained count is attained by exactly five consecutive $n$

## Conditions
$n \ge 0$; the base-$10$ formula uses that $v_2(n!) \ge v_5(n!)$ always.

## Why it works
A number ends in $k$ zeros exactly when $10^k = 2^k5^k$ divides it, so the count is $\min(v_2(n!), v_5(n!))$. Among $1, \ldots, n$ every second number is even but only every fifth is a multiple of $5$, and the same holds at every power, so $v_2(n!) \ge v_5(n!)$ and the minimum is $v_5(n!)$, which Legendre's Formula computes.

The count rises at every multiple of $5$, by one more at multiples of $25$, and by one more again at multiples of $125$; at those points some counts are skipped.

{{figure:jumps}}

## Useful observations
- The count is a short chain of divisions by $5$: $100!$ ends in $20 + 4 = 24$ zeros, and $2025!$ in $405 + 81 + 16 + 3 = 505$.
- Since $\frac n5 + \frac n{25} + \cdots$ sums to $\frac n4$ before rounding, the count is just under $\frac n4$, which locates $n$ quickly from a target number of zeros.
- The count jumps by $2$ or more at multiples of $25$, so some counts never occur: no factorial ends in exactly $5$ zeros, since $24!$ ends in $4$ and $25!$ in $6$.

## Applications
Trailing zeros of factorials in any base, and which zero counts are possible.

## Contest profile
A MATHCOUNTS and AMC staple; AIME versions count the values that are never attained.
`,

"pisano-periods": String.raw`
## Key forms
- $F_n \bmod m$ is periodic with period $\pi(m)$, the Pisano period, which starts from the beginning of the sequence
- $\pi(2) = 3$, $\pi(3) = 8$, $\pi(5) = 20$, $\pi(10) = 60$ — the values worth knowing, with $\pi(10)$ governing last digits
- for composite $m$, $\pi(m)$ is the lcm of the periods of its prime-power factors
- $F_n \equiv F_{n \bmod \pi(m)} \pmod m$

## Conditions
The recurrence is $F_{n+1} = F_n + F_{n-1}$ with $F_0 = 0$ and $F_1 = 1$, reduced modulo $m \ge 2$.

## Why it works
A Fibonacci term mod $m$ is determined by the pair $(F_{n-1}, F_n) \bmod m$, and there are only $m^2$ possible pairs, so the sequence of pairs must eventually repeat.

Because the recurrence $F_{n-1} = F_{n+1} - F_n$ runs backward as cleanly as forward, the repetition cannot start late: it cycles from the very beginning, giving a pure period $\pi(m)$.

## Useful observations
- To find $F_n \bmod m$, the period $\pi(m)$ is computed by listing terms mod $m$ until $0, 1$ reappears, and then the index is reduced.
- Handy: $\pi(10) = 60$ governs last digits, $\pi(2) = 3$ means a term is even every third time, and $\pi(5) = 20$.
- It is the Fibonacci case of periodicity in a recursive sequence, and of periodicity mod $m$ generally.

## Applications
Last digits of large Fibonacci numbers, and the periodicity of divisibility of $F_n$ by $m$.

## Contest profile
An olympiad and hard-AIME tool for last-digit questions and for questions about when a Fibonacci number is divisible by a given number. Last digits cycle with period $60$, and divisibility of $F_n$ by $m$ is itself periodic in $n$.
`,

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

"sum-of-three-squares": String.raw`
## Key forms
- $n = a^2 + b^2 + c^2$ solvable $\iff n \ne 4^k(8m + 7)$
- every $n \ge 0$ is $a^2 + b^2 + c^2 + d^2$
- two squares: $n = a^2 + b^2 \iff$ every prime $\equiv 3 \pmod 4$ divides $n$ to an even power

## Conditions
Squares may be $0$, so "three squares" includes numbers that need fewer.

## Why it works
The necessity is a short computation. Squares are $0, 1, 4 \pmod 8$, so a sum of three of them is never $7 \bmod 8$. And a sum of three squares that is divisible by $4$ must have all three squares even, since odd squares are $1 \bmod 4$ and one or two of them would leave $1$, $2$ or $3 \bmod 4$; dividing each by $4$ represents $\frac n4$. So if $n$ fails, $4n$ fails too, which excludes all of $4^k(8m + 7)$.

The converse, that every other number is a sum of three squares, needs the theory of ternary quadratic forms. Lagrange's theorem has an elementary proof: Euler's four-square identity makes representable numbers closed under multiplication, so it suffices to represent primes, which a descent argument does.

## Useful observations
- Removing factors of $4$ never changes the answer, so the test strips powers of $4$ and checks the residue mod $8$ of what remains; $28 = 4 \cdot 7$ needs four squares, while $29 = 25 + 4$ does not.
- A sum of three squares that is divisible by $4$ is $4$ times a sum of three squares, the descent behind the excluded family.
- Up to $N$, about $\frac16$ of all numbers need four squares, since $\frac18 + \frac{1}{32} + \frac{1}{128} + \cdots = \frac16$.

## Applications
Deciding how many squares a number needs, and residue arguments that rule out solutions of equations with three squares.

## Contest profile
Mostly an olympiad classification fact; the mod-$8$ argument behind it is the part that appears widely.
`,

"bounding-diophantine": String.raw`
## When to use
Equations in positive integers with finitely many solutions but no algebraic way to isolate them: sums of unit fractions such as $\frac1x + \frac1y + \frac1z = 1$, symmetric equations such as $xyz = x + y + z$, and equations in which one side grows much faster than the other, such as $2^a + 1 = 3^b$ or $n! = n^3 - n$. The tell is that large values of the variables obviously fail. If a rearrangement leaves a product equal to a number, [[factor-pair-counting|listing factor pairs]] is quicker.

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
## Key forms
- $a \equiv b$, $c \equiv d \pmod m \implies a \pm c \equiv b \pm d$, $ac \equiv bd$, $a^k \equiv b^k$
- $ka \equiv kb \pmod m \implies a \equiv b \pmod{\frac{m}{\gcd(k, m)}}$
- $b$ has an inverse mod $m$ $\iff \gcd(b, m) = 1$; then $\frac xy \equiv ab^{-1}$ for $x \equiv a$, $y \equiv b$
- exponents reduce mod $\varphi(m)$, not mod $m$, and only for bases coprime to $m$

## Conditions
$m \ge 1$. Congruences between exponents do not transfer to powers: $k \equiv j \pmod m$ does not give $a^k \equiv a^j \pmod m$.

## Why it works
A congruence is a statement about a difference, and divisibility of differences survives adding and multiplying. If $m$ divides $a - b$ and $c - d$, then it divides $(a + c) - (b + d) = (a - b) + (c - d)$, and $$ac - bd = a(c - d) + d(a - b),$$ so $ac \equiv bd$; repeating gives powers.

Division is where it stops: $6 \cdot 5 \equiv 6 \cdot 0 \pmod{15}$, since $15 \mid 30$, but $5 \not\equiv 0 \pmod{15}$. And exponents reduce modulo $\varphi(m)$: for $3^{14} \bmod 10$, reducing the exponent mod $10$ gives the wrong $3^4 \equiv 1$, while reducing mod $\varphi(10) = 4$ gives $3^{14} \equiv 3^2 = 9$, which is correct.

## Useful observations
- $x^2 \equiv 0, 1 \pmod 4$ and $x^2 \equiv 0, 1, 4 \pmod 8$, so a sum of two squares is never $3 \bmod 4$.
- Cancelling a factor that shares primes with the modulus divides the modulus by their gcd: $6x \equiv 6y \pmod{15}$ gives only $x \equiv y \pmod 5$.
- Reducing any number to its remainder before an operation keeps every value smaller than $m$.

## Applications
Remainders and last digits, divisibility, parity and residue arguments that rule out solutions, and the setting of Fermat's and Euler's Theorems and the Chinese Remainder Theorem.

## Contest profile
The foundation under every modular problem at every level, very often followed by casework on the residues it produces.

## Full proof
Cancellation. Let $g = \gcd(k, m)$ and suppose $m \mid k(a - b)$. Then $\frac mg$ divides $\frac kg(a - b)$, and $\frac mg$ and $\frac kg$ are coprime, so by Euclid's Lemma $\frac mg$ divides $a - b$.

Inverses. If $\gcd(b, m) = 1$, Bézout's Identity gives $bu + mv = 1$, so $bu \equiv 1$ and $u$ is an inverse. Conversely, if $bu \equiv 1 \pmod m$, then any common factor of $b$ and $m$ divides $bu - (bu - 1) = 1$.
`

});

Object.assign(window.MATH_DETAILS, {

"zeckendorf-theorem": String.raw`
## Key forms
- $n = F_{k_1} + F_{k_2} + \cdots + F_{k_r}$ with $k_i \ge k_{i+1} + 2$ — every positive integer is uniquely a sum of non-consecutive Fibonacci numbers
- the representation is a binary string with no two adjacent $1$s, in bijection with the integers
- exactly $F_{n+2}$ of the integers from $0$ to $F_{n+2} - 1$ are written using only the first $n$ Fibonacci numbers $F_2, \ldots, F_{n+1}$

## Conditions
The Fibonacci numbers used are $F_2 = 1, F_3 = 2, F_4 = 3, \ldots$, each at most once, since $F_1 = F_2$ would duplicate the value $1$.

## Why it works
Greedily subtracting the largest Fibonacci number $\le n$ can never leave a remainder that needs two adjacent Fibonacci numbers, because $F_k + F_{k-1} = F_{k+1}$ would merge them into a larger term. That gives both existence and uniqueness of the non-consecutive representation.

## Useful observations
- The greedy algorithm is both the construction and the proof: taking the largest Fibonacci number at each step automatically leaves a remainder smaller than the previous term's predecessor, which is exactly the non-consecutive condition.
- The bijection with binary strings with no two adjacent $1$s ties the count to the Fibonacci tiling count, and explains why $F_{n+2}$ integers have representations using only the first $n$ Fibonacci numbers.
- The contest uses are usually about uniqueness: showing a Fibonacci-sum representation is forced, or converting between an integer and its Fibonacci digits.

## Applications
Fibonacci-base representations, Fibonacci nim and Wythoff's game, and counting problems that become digit arguments on the Zeckendorf string.

## Contest profile
Occasional AIME and olympiad appearances (Fibonacci representations, Wythoff and [[beatty-theorem|Beatty]] problems); the greedy algorithm together with uniqueness is essentially the whole toolkit.
`,

"beatty-theorem": String.raw`
## Key forms
- if $\alpha, \beta > 1$ are irrational with $\dfrac1\alpha + \dfrac1\beta = 1$, the sequences $\lfloor n\alpha\rfloor$ and $\lfloor n\beta\rfloor$ for $n \ge 1$ hit every positive integer exactly once between them
- the partner of $\alpha$ is $\beta = \dfrac{\alpha}{\alpha - 1}$

## Conditions
$\alpha$ and $\beta$ are irrational and greater than $1$. If one of them were rational the two sequences would collide or leave gaps.

## Why it works
The number of terms $\lfloor n\alpha\rfloor \le N$ is about $\frac N\alpha$, and similarly $\frac N\beta$ for the other sequence. Since $\frac1\alpha + \frac1\beta = 1$ the two counts add to $N$ for every $N$, and irrationality prevents any collision, so together they hit each integer exactly once.

## Useful observations
- A single irrational $\alpha > 1$ generates a complementary pair of sequences that tile the positive integers.
- The density check $\frac1\alpha + \frac1\beta = 1$ is the whole idea.
- The losing positions of Wythoff's game are the Beatty sequences for $\varphi$ and $\varphi^2$.

## Applications
Proving two floor sequences are complementary, deciding which sequence an integer belongs to, and floor-sum identities.

## Contest profile
Olympiad number theory and combinatorics: the statement that two sequences partition the integers.
`,

"cauchy-davenport": String.raw`
## Key forms
- $|A + B| \ge \min(p, |A| + |B| - 1)$ for nonempty $A, B \subseteq \mathbb Z_p$
- iterated: $|A_1 + \cdots + A_k| \ge \min\left(p, |A_1| + \cdots + |A_k| - (k - 1)\right)$
- equality holds for arithmetic progressions with a common difference

## Conditions
The modulus must be prime: modulo $6$, $A = B = \{0, 3\}$ gives $|A + B| = 2 \lt 3$.

## Why it works
The proof below uses the polynomial method. Its tool is the Combinatorial Nullstellensatz: if a polynomial $f(x, y)$ over $\mathbb Z_p$ has total degree $s + t$ and a nonzero coefficient of $x^sy^t$, then for any sets $A$, $B$ with $|A| \gt s$ and $|B| \gt t$ there are $a \in A$, $b \in B$ with $f(a, b) \ne 0$.

Suppose $|A| + |B| \le p + 1$ and $A + B \subseteq C$ with $|C| = |A| + |B| - 2$. Let $f(x, y) = \prod_{c \in C}(x + y - c)$, of degree $|A| + |B| - 2$; its coefficient of $x^{|A|-1}y^{|B|-1}$ is $\binom{|A| + |B| - 2}{|A| - 1}$, nonzero mod $p$ since $|A| + |B| - 2 \lt p$. So some $f(a, b) \ne 0$, meaning $a + b \notin C$, a contradiction. Hence $|A + B| \ge |A| + |B| - 1$; if $|A| + |B| \gt p + 1$, shrink $A$ first.

## Useful observations
- Adding sets one at a time grows the sumset by at least $|A_i| - 1$ each step until it fills $\mathbb Z_p$, so a few large sets always cover every residue.
- The bound is sharp: $\{0, \ldots, s - 1\} + \{0, \ldots, t - 1\} = \{0, \ldots, s + t - 2\}$.
- Primality enters only through the binomial coefficient being nonzero mod $p$, which is why composite moduli, with their subgroups, break it.

## Applications
Showing that sums from several sets hit every residue, the prime case of the Erdős–Ginzburg–Ziv Theorem, and sumset bounds in additive combinatorics.

## Contest profile
An olympiad result in additive number theory.
`,

"erdos-ginzburg-ziv": String.raw`
## Key forms
- any $2n - 1$ integers contain $n$ whose sum is a multiple of $n$
- sharp: $n - 1$ zeros and $n - 1$ ones have no such $n$
- if the theorem holds for $m$ and $n$, it holds for $mn$

## Conditions
The integers may repeat. With only $2n - 2$ integers the conclusion can fail.

## Why it works
For a prime $p$, take $a_1, \ldots, a_{2p-1}$ and work over $\mathbb Z_p$ with the two polynomials $f_1 = \sum x_i^{p-1}$ and $f_2 = \sum a_ix_i^{p-1}$ in $2p - 1$ variables. Their degrees add to $2p - 2 \lt 2p - 1$, so by the Chevalley–Warning Theorem the number of common zeros is divisible by $p$. The zero vector is one, so there is another. Since $x^{p-1}$ is $1$ for $x \ne 0$ and $0$ otherwise, the set $S$ of nonzero coordinates has $|S| \equiv 0 \pmod p$ from $f_1$, so $|S| = p$, and $f_2$ gives $\sum_{i \in S} a_i \equiv 0$.

For the product step, from $2mn - 1$ integers pull out groups of $n$ with sum divisible by $n$, possible while at least $2n - 1$ remain; this gives $2m - 1$ groups. Their sums divided by $n$ are $2m - 1$ integers, $m$ of which have sum divisible by $m$, and the corresponding $mn$ integers have sum divisible by $mn$.

## Useful observations
- The prime case is the heart of it; every other $n$ follows by multiplying prime cases together.
- The smallest case shows the pigeonhole at work: for $n = 2$, any three integers contain two of the same parity, whose sum is even.
- Reducing everything mod $n$ first loses nothing, since only residues matter.

## Applications
Existence of zero-sum subsets of prescribed size, and divisibility arguments over many integers.

## Contest profile
The standard zero-sum theorem of olympiad combinatorics.
`,

"carmichael-numbers": String.raw`
## Key forms
- a Carmichael number is a composite $n$ with $b^{n-1} \equiv 1 \pmod n$ for every $b$ coprime to $n$
- Korselt's Criterion: $n$ is Carmichael exactly when $n$ is squarefree and $(p - 1) \mid (n - 1)$ for every prime $p \mid n$
- a Fermat pseudoprime to base $b$ is a composite $n$ with $b^{n-1} \equiv 1 \pmod n$

## Conditions
$n$ is composite and odd. The Carmichael function $\lambda(n)$ has the same name and is an unrelated object.

## Why it works
A [[fermat-numbers|Fermat pseudoprime]] slips past the test $b^{n-1} \equiv 1 \pmod n$ despite being composite. Korselt's Criterion pins down those that fool every coprime base: $n$ must be squarefree with $(p - 1) \mid (n - 1)$ for each prime $p \mid n$, and then by the [[crt|Chinese Remainder Theorem]] the congruence holds for every base.

## Useful observations
- To test a candidate, check squarefreeness and the divisibility $(p - 1) \mid (n - 1)$ over its prime factors.
- Carmichael numbers are exactly the blind spot of the Fermat primality test, which is why stronger tests such as Miller–Rabin are used.

## Applications
Showing that a number is a Carmichael number, and the limits of the Fermat primality test.

## Contest profile
Olympiad number theory and discussions of why the Fermat test fails.
`

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


"sigma-parity": String.raw`
## Key forms
- $\sigma(n)$ odd $\iff n = m^2$ or $n = 2m^2$
- $\sigma(n)$ odd $\iff$ the odd part of $n$ is a perfect square

## Conditions
$n$ is a positive integer.

## Why it works
$\sigma$ is multiplicative, so $\sigma(n)$ is odd exactly when every prime-power factor contributes an odd amount. For an odd prime $p$, the factor $1 + p + \cdots + p^e$ is a sum of $e + 1$ odd terms, so it is odd exactly when $e$ is even. The factor from $2^a$ is $2^{a+1} - 1$, always odd. So $\sigma(n)$ is odd exactly when every odd prime appears to an even power, that is, when $n = 2^a m^2$ with $m$ odd, which is a square for even $a$ and twice a square for odd $a$.

## Useful observations
- Odd values of $\sigma$ are rare, since only squares and twice squares qualify: from $1$ to $20$, $\sigma(n)$ is odd only for $n = 1, 2, 4, 8, 9, 16, 18$.
- The power of $2$ in $n$ never affects the parity of $\sigma(n)$.
- Up to $N$, there are $\lfloor\sqrt N\rfloor + \lfloor\sqrt{N/2}\rfloor$ values of $n$ with $\sigma(n)$ odd.

## Applications
Parity questions about sums of divisors, and counts of $n$ up to a bound with $\sigma(n)$ odd or even.

## Contest profile
A rare fact on its own; when it appears, the whole question is the parity of $\sigma$.
`

});

Object.assign(window.MATH_DETAILS, {

"dirichlet-convolution": String.raw`
## Key forms
- $(f * g)(n) = \alt{\sum_{d \mid n} f(d)\,g\left(\frac nd\right)}{f(d_1)g\left(\frac{n}{d_1}\right) + \cdots + f(d_r)g\left(\frac{n}{d_r}\right)}$
- $\mathbf 1 * \mathbf 1 = d$, $\mathrm{id} * \mathbf 1 = \sigma$, $\varphi * \mathbf 1 = \mathrm{id}$, $\mu * \mathbf 1 = \varepsilon$
- $g = f * \mathbf 1 \iff f = g * \mu$, which is Möbius inversion

## Conditions
The functions are arbitrary complex-valued functions on the positive integers; $f$ has a convolution inverse exactly when $f(1) \ne 0$.

## Why it works
The sum runs over factorizations $n = de$ in ordered pairs, which is symmetric in the two factors, so $f * g = g * f$. Three-fold convolutions run over $n = abc$, so the order of grouping does not matter. $\varepsilon$ is the identity because only the factorization $n = n \cdot 1$ survives.

For multiplicative $f$ and $g$ and coprime $m$, $n$, the factorizations of $mn$ are exactly products of factorizations of $m$ and of $n$, so $(f * g)(mn) = (f * g)(m)\,(f * g)(n)$. The identity $\mu * \mathbf 1 = \varepsilon$ is the statement that $\sum_{d \mid n}\mu(d)$ vanishes for $n \gt 1$, and convolving $g = f * \mathbf 1$ with $\mu$ gives $f$.

## Useful observations
- Summing over divisors is convolving with $\mathbf 1$, so every divisor-sum identity is a convolution identity: $\sum_{d \mid 12}\varphi(d) = (\varphi * \mathbf 1)(12) = 12$.
- Convolving $\varphi * \mathbf 1 = \mathrm{id}$ with $\mu$ gives $\varphi = \mathrm{id} * \mu$, that is $\varphi(n) = \sum_{d \mid n}\mu(d)\frac nd$.
- To prove an identity between multiplicative convolutions it suffices to check prime powers.

## Applications
Identities among $d$, $\sigma$, $\varphi$ and $\mu$, Möbius inversion, and divisor sums of multiplicative functions.

## Contest profile
An olympiad framework; contest problems use its identities without the notation.
`,

"jacobi-symbol": String.raw`
## Key forms
- $\left(\frac an\right) = \left(\frac{a}{p_1}\right)^{e_1}\cdots\left(\frac{a}{p_k}\right)^{e_k}$ for odd $n = p_1^{e_1}\cdots p_k^{e_k}$
- $\left(\frac{ab}{n}\right) = \left(\frac an\right)\left(\frac bn\right)$ and $\left(\frac{a}{mn}\right) = \left(\frac am\right)\left(\frac an\right)$
- $\left(\frac mn\right)\left(\frac nm\right) = (-1)^{\frac{m-1}{2}\cdot\frac{n-1}{2}}$ for odd coprime $m, n$; $\left(\frac{-1}{n}\right) = (-1)^{\frac{n-1}{2}}$, $\left(\frac 2n\right) = (-1)^{\frac{n^2-1}{8}}$

## Conditions
$n$ is odd and positive. $\left(\frac an\right) = -1$ proves $a$ is not a square mod $n$; $\left(\frac an\right) = 1$ proves nothing for composite $n$.

## Why it works
Multiplicativity in each argument is inherited from the Legendre symbol, factor by factor. For reciprocity, write $m$ and $n$ as products of odd primes and expand both symbols into Legendre symbols $\left(\frac pq\right)$; each pair contributes the sign $(-1)^{\frac{p-1}{2}\frac{q-1}{2}}$. The total exponent is $\sum_{p, q}\frac{p-1}{2}\frac{q-1}{2} = \left(\sum\frac{p-1}{2}\right)\left(\sum\frac{q-1}{2}\right)$, and $\sum\frac{p-1}{2} \equiv \frac{m-1}{2} \pmod 2$, because $\frac{xy - 1}{2} \equiv \frac{x - 1}{2} + \frac{y - 1}{2} \pmod 2$ for odd $x$, $y$. The supplements follow the same way.

## Useful observations
- A Jacobi symbol equal to $1$ does not certify a square, since two failures multiply to $1$: $\left(\frac{2}{15}\right) = \left(\frac 23\right)\left(\frac 25\right) = (-1)(-1) = 1$, yet $2$ is not a square modulo $15$.
- A Legendre symbol can be computed by repeated flipping and reducing, like the Euclidean algorithm, with no factoring.
- $\left(\frac an\right)$ depends only on $a \bmod n$.

## Applications
Fast evaluation of Legendre symbols and proofs that a number is not a square modulo a composite.

## Contest profile
An olympiad computational tool; its one trap is reading a value of $1$ as a residue.
`,

"gauss-lemma-qr": String.raw`
## Key forms
- $\left(\frac ap\right) = (-1)^\mu$, $\mu = \#\left\{1 \le k \le \frac{p-1}{2} : (ka \bmod p) \gt \frac p2\right\}$
- consequence: $\left(\frac 2p\right) = (-1)^{\frac{p^2 - 1}{8}}$, so $2$ is a square mod $p$ exactly when $p \equiv \pm1 \pmod 8$

## Conditions
$p$ is an odd prime and $p \nmid a$.

## Why it works
Let $r_k$ be the remainder of $ka$, for $1 \le k \le \frac{p-1}{2}$, and replace each $r_k \gt \frac p2$ by $p - r_k$. The resulting numbers all lie in $1, \ldots, \frac{p-1}{2}$, and they are distinct: equal values would give $ka \equiv \pm ja$, so $p \mid k \mp j$, impossible for distinct $k, j \le \frac{p-1}{2}$ since $0 \lt k + j \lt p$. So they are $1, 2, \ldots, \frac{p-1}{2}$ in some order.

Multiplying all $ka$ therefore gives $a^{\frac{p-1}{2}}\left(\frac{p-1}{2}\right)! \equiv (-1)^\mu\left(\frac{p-1}{2}\right)!$, one sign for each replaced remainder. Cancelling the factorial and applying Euler's Criterion gives $\left(\frac ap\right) = (-1)^\mu$.

## Useful observations
- Counting remainders above $\frac p2$ settles small cases by hand: for $\left(\frac 27\right)$, the remainders $2, 4, 6$ have two above $3.5$, so the symbol is $1$, and indeed $3^2 \equiv 2$.
- For $a = 2$, the multiples $2, 4, \ldots, p - 1$ exceed $\frac p2$ for about half of them, which gives the formula $(-1)^{(p^2-1)/8}$.
- For $a = -1$, every one of the $\frac{p-1}{2}$ remainders is above $\frac p2$, giving $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$.

## Applications
The supplementary laws, proofs of quadratic reciprocity, and direct evaluation of Legendre symbols for small $a$.

## Contest profile
An olympiad lemma, used to prove reciprocity and its supplements rather than as a computational shortcut.
`,

"freshmans-dream": String.raw`
## Key forms
- $(a + b)^p \equiv a^p + b^p \pmod p$
- $(a + b)^{p^m} \equiv a^{p^m} + b^{p^m} \pmod p$
- $p \mid \binom pk$ for $0 \lt k \lt p$

## Conditions
$p$ is prime, and $a$, $b$ are integers or polynomials with integer coefficients. For composite exponents it fails: $(1 + 1)^4 = 16 \not\equiv 2 \pmod 4$.

## Why it works
$\binom pk = \frac{p!}{k!(p - k)!}$ is an integer whose numerator has a factor $p$, while for $0 \lt k \lt p$ neither $k!$ nor $(p - k)!$ contains $p$. So $p$ divides $\binom pk$, and expanding $(a + b)^p$ by the Binomial Theorem leaves only $a^p + b^p$ modulo $p$. Applying the result $m$ times gives the $p^m$ form, and induction on the number of terms gives the multinomial form.

## Useful observations
- The inner binomial coefficients vanish modulo $p$, so the expansion collapses to its two ends: $(x + 1)^5 \equiv x^5 + 1 \pmod 5$, since $5, 10, 10, 5$ are all multiples of $5$.
- With $a_1 = \cdots = a_n = 1$, the multinomial form gives $n^p \equiv n \pmod p$, a proof of Fermat's Little Theorem.
- $(x + 1)^{p^m} \equiv x^{p^m} + 1$, so most coefficients of $(1 + x)^{p^m}$ are divisible by $p$, which is the case of Lucas's Theorem.

## Applications
Powers of sums modulo a prime, Fermat's Little Theorem, binomial coefficients modulo $p$, and polynomials over the integers mod $p$.

## Contest profile
An olympiad lemma, occasionally behind AIME binomial-coefficient divisibility questions.
`,

"power-minus-self": String.raw`
## Key forms
- $n^3 - n$, $n^5 - n$ and $n^7 - n$ are always divisible by $6$, $30$ and $42$
- $p \mid n^k - n$ for all $n \iff (p - 1) \mid (k - 1)$
- the largest universal divisor of $n^k - n$ is the product of the primes $p$ with $(p - 1) \mid (k - 1)$, each once

## Conditions
$k \ge 2$ and $n$ is any integer. No prime square divides $n^k - n$ for all $n$: taking $n = p$ gives $p^k - p$, which is divisible by $p$ but not by $p^2$.

## Why it works
If $(p - 1) \mid (k - 1)$, then for $p \nmid n$ Fermat's Little Theorem gives $n^{k-1} \equiv 1$, so $n^k \equiv n$, and for $p \mid n$ both sides are $0$. Conversely, if $p$ divides $n^k - n$ for all $n$, take a primitive root $g$ modulo $p$: $g^{k-1} \equiv 1$ forces $(p - 1) \mid (k - 1)$. The primes are distinct, so their product divides $n^k - n$, and the remark on $n = p$ shows no larger number works.

## Useful observations
- For small exponents the factorization shows the divisibility directly: $n^3 - n = (n - 1)n(n + 1)$ is a product of three consecutive integers, so $6$ divides it.
- Since $10 \mid n^5 - n$, a fifth power always has the same units digit as its base.
- The largest number dividing $n^k - n$ for every $n$ is the product of the primes $p$ with $(p - 1) \mid (k - 1)$: for $k = 13$ it is $2730 = 2 \cdot 3 \cdot 5 \cdot 7 \cdot 13$.

## Applications
Universal divisors of polynomial expressions, units digits of fifth powers, and divisibility proofs for all integers.

## Contest profile
A classic AMC and AIME divisibility fact; the question is always which primes satisfy $(p - 1) \mid (k - 1)$.
`,

"consecutive-product-factorial": String.raw`
## Key forms
- $n(n + 1)\cdots(n + k - 1) = k!\binom{n + k - 1}{k}$
- $k! \mid n(n + 1)\cdots(n + k - 1)$ for every integer $n$
- $\binom nk$ is an integer for all integers $n \ge k \ge 0$

## Conditions
$k \ge 1$ and $n$ is any integer; products containing $0$ or negative numbers are divisible trivially or by symmetry.

## Why it works
For $n \ge 1$, the product divided by $k!$ is $\frac{(n + k - 1)!}{(n - 1)!\,k!} = \binom{n + k - 1}{k}$, which counts $k$-element subsets of an $(n + k - 1)$-element set and so is an integer. If the product contains $0$ it is $0$; if all factors are negative, it is $\pm$ a product of $k$ consecutive positive integers.

A prime-by-prime check gives the same: the exponent of $p$ in the product is at least $\sum_i \left\lfloor \frac{k}{p^i} \right\rfloor = v_p(k!)$, since any $k$ consecutive integers contain at least $\left\lfloor \frac k{p^i} \right\rfloor$ multiples of $p^i$.

## Useful observations
- A product of four consecutive integers is one less than a square, $n(n + 1)(n + 2)(n + 3) + 1 = (n^2 + 3n + 1)^2$, as well as a multiple of $24$.
- A polynomial that factors into consecutive integers inherits the divisibility: $n^5 - 5n^3 + 4n = (n - 2)(n - 1)n(n + 1)(n + 2)$ is always a multiple of $120$.
- The numbers $\frac{n(n+1)}{2}$, $\frac{n(n+1)(n+2)}{6}$ are triangular and tetrahedral numbers, integers for this reason.

## Applications
Divisibility of products of consecutive integers and of polynomials that factor into them, and integrality of binomial coefficients.

## Contest profile
A one-line divisibility tool from MATHCOUNTS through AIME.
`,

"chevalley-warning": String.raw`
## Key forms
- $\alt{\sum_i \deg f_i}{\deg f_1 + \cdots + \deg f_k} \lt n \implies p \mid \#\{x \in \mathbb F_p^n : f_1(x) = \cdots = f_k(x) = 0\}$
- no constant terms $\implies$ a nonzero common zero exists
- $0^t + 1^t + \cdots + (p - 1)^t \equiv 0 \pmod p$ unless $t$ is a positive multiple of $p - 1$

## Conditions
$p$ is prime and the $f_i$ have coefficients in $\mathbb F_p$; the degrees are total degrees.

## Why it works
For each $x \in \mathbb F_p^n$, the product $P(x) = \prod_i \left(1 - f_i(x)^{p-1}\right)$ is $1$ when $x$ is a common zero and $0$ otherwise, by Fermat's Little Theorem. So the number of common zeros is $\sum_x P(x) \bmod p$.

$P$ has degree at most $(p - 1)\sum \deg f_i \lt (p - 1)n$, so each monomial $x_1^{t_1}\cdots x_n^{t_n}$ in it has some $t_j \lt p - 1$. Summing that monomial over $\mathbb F_p^n$ factors into $\prod_j \sum_{x_j} x_j^{t_j}$, and the factor with $t_j \lt p - 1$ is $0$ mod $p$: for $t_j = 0$ it is $p$, and for $0 \lt t_j \lt p - 1$ it is the sum of the $t_j$th powers of all residues, which a primitive root shows is $0$. So $\sum_x P(x) \equiv 0$.

## Useful observations
- The theorem gives existence without construction: a degree count alone forces a nontrivial solution.
- The power sums $\sum_{x \in \mathbb F_p} x^t$ vanish mod $p$ except when $t$ is a positive multiple of $p - 1$, where they are $-1$; this one fact drives the proof.
- Indicator polynomials $1 - f^{p-1}$ turn counting solutions into summing a polynomial.

## Applications
Existence of nonzero solutions to low-degree systems mod $p$, the Erdős–Ginzburg–Ziv Theorem, and divisibility of solution counts.

## Contest profile
An olympiad existence tool.
`,


"cryptarithms": String.raw`
## Distinguishing clues
- Letters stand for digits, different letters for different digits, inside a written calculation with column structure.
- Not this pattern: letters that stand for whole unknown numbers, or the same digit under different letters, which is ordinary algebra or a [[digit-manipulation|digit-manipulation problem]].

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

"base10-curiosities": String.raw`
## Key forms
- $\dfrac17 = 0.\overline{142857}$ — the cyclic number $142857$, whose multiples by $1$ through $6$ are rotations of its digits and which times $7$ is $999999$
- $153 = 1^3 + 5^3 + 3^3$, also $370$, $371$, $407$ — the narcissistic numbers, equal to the sum of their digits each raised to the digit count
- $6174$ — Kaprekar's constant: any four-digit number whose digits are not all equal reaches it within $7$ steps of subtracting the ascending arrangement from the descending one
- $1089$ — reversing a three-digit number with distinct end digits, subtracting, and adding the result to its own reverse always gives $1089$

## Conditions
These are facts about base-ten digits, not theorems about all bases. Kaprekar's routine needs a four-digit number with at least two different digits.

## Why it works
The cyclic run of $142857$ is the six-digit repeating block of $\frac17$: $10$ is a primitive root mod $7$, so the period is full and multiplying by $1$ through $6$ rotates the digits. Narcissistic numbers and Kaprekar's routine are finite digit-map facts that can be checked directly.

The repunit family explains most of the rest. A string of $n$ ones is $\frac{10^n - 1}{9}$, which is why $\frac19 = 0.\overline{1}$, $\frac1{99} = 0.\overline{01}$, and why squaring a repunit of length $n \le 9$ gives the palindrome $123\ldots n\ldots321$.

The $1089$ trick is the same base-ten bookkeeping: reversing a three-digit number and subtracting always leaves a multiple of $99$, and adding that result to its own reverse always gives $1089$.

## Useful observations
- $142857$ is recognized on sight, with $\frac27, \ldots, \frac67$ as its rotations.
- These are recall aids, not deep theorems.

## Applications
Repeating-decimal periods, digit puzzles, and instant recall of the cyclic number.

## Contest profile
Light MATHCOUNTS and trivia territory, but occasionally an AMC problem rewards spotting the cyclic number or a repeating-decimal period.
`

});

Object.assign(window.MATH_DETAILS, {

"p-adic-valuation": String.raw`
## Key forms
- $v_p(mn) = v_p(m) + v_p(n)$ and $v_p\left(\frac mn\right) = v_p(m) - v_p(n)$
- $v_p(m + n) \ge \min(v_p(m), v_p(n))$, with equality if $v_p(m) \ne v_p(n)$
- $v_p(\gcd(m, n)) = \min$ and $v_p(\operatorname{lcm}(m, n)) = \max$ of the two valuations

## Conditions
$p$ is prime and $m, n$ are nonzero integers (or rationals, for quotients).

## Why it works
By unique factorization, the power of $p$ in a product is the sum of the powers in the factors, which makes $v_p$ behave like a logarithm for one prime. For a sum, write $m = p^a m'$ and $n = p^b n'$ with $p \nmid m', n'$ and $a \le b$: then $m + n = p^a(m' + p^{b-a}n')$, so $v_p(m + n) \ge a$. When $a \lt b$, the bracket is $m' + (\text{multiple of } p) \not\equiv 0$, so the valuation is exactly $a$.

## Useful observations
- The valuation of a sum can exceed the minimum only when the minimum is tied: $v_2(48) = v_2(80) = 4$, but $v_2(48 + 80) = v_2(128) = 7$.
- $N$ is a perfect square exactly when every $v_p(N)$ is even.
- $p^k \mid N \iff v_p(N) \ge k$.
- Legendre's Formula computes $v_p(n!)$, and the Lifting the Exponent Lemma computes $v_p(a^n - b^n)$.

## Applications
Divisibility by prime powers, perfect powers, gcds and lcms, and the language of Legendre's Formula, Kummer's Theorem, and the Lifting the Exponent Lemma.

## Contest profile
The language of AIME and olympiad prime-power problems, used whenever only the power of one prime matters.
`,


"euclids-lemma": String.raw`
## Key forms
- $p$ prime, $p \mid ab \implies p \mid a$ or $p \mid b$
- $\gcd(a, b) = 1$ and $b \mid an \implies b \mid n$
- $\frac pq$ in lowest terms and $q \mid kp \implies q \mid k$

## Conditions
The first form needs $p$ prime: $6 \mid 4 \cdot 9$, but $6$ divides neither factor. The second needs $\gcd(a, b) = 1$, with no primality assumption.

## Why it works
The proof runs through Bézout's Identity: since $\gcd(a, b) = 1$, there are integers $x$ and $y$ with $ax + by = 1$. Multiplying by $n$ gives $anx + bny = n$. The first term is a multiple of $b$ because $b \mid an$, and the second plainly is, so $b$ divides their sum, $n$.

The prime version is the case $b = p$. If $p \nmid a$, then $\gcd(p, a) = 1$, because the only divisors of $p$ are $1$ and $p$, so $p \mid ab$ forces $p \mid b$.

## Useful observations
- A coprime factor can be cancelled from a divisibility: if $a \mid bc$ and $\gcd(a, b) = 1$, then $a \mid c$. So if $\frac{13n}{6}$ is an integer, then $6 \mid n$.
- A prime dividing a product of several factors divides one of them, by induction on the number of factors.
- Unique factorization follows: a prime dividing a product of primes equals one of them, so two factorizations match prime by prime.

## Applications
Cancellation in divisibility statements, fractions in lowest terms, and every argument that depends on unique prime factorization.

## Contest profile
The invisible step in a large share of AIME number theory, rarely named even when it does the work.
`,

"digit-sum-carries": String.raw`
## Key forms
- $s(a + b) = s(a) + s(b) - 9c$, with $c$ the number of carries
- $c = \frac{s(a) + s(b) - s(a + b)}{9}$
- in base $b$: $s_b(x + y) = s_b(x) + s_b(y) - (b - 1)c$

## Conditions
$a$ and $b$ are nonnegative integers; carries are counted column by column, including chains.

## Why it works
Adding two digits in a column, plus any incoming carry, either stays below $10$ or does not. When it does not, the column keeps the total minus $10$ and passes $1$ to the next column, so the overall digit sum loses $10$ and gains $1$, a net drop of $9$. Without carries every digit of the sum is the sum of the digits, so each carry accounts for exactly one drop of $9$.

## Useful observations
- "No carrying" means each column adds to at most $9$, so the digits of different places are chosen independently and counts become products.
- Doubling a number carries exactly at the digits that are $5$ or more, so $s(2n) = 2s(n) - 9 \cdot \#\{\text{digits} \ge 5\}$.
- The formula is why $n \equiv s(n) \pmod 9$, since every correction is a multiple of $9$.
- The carry count is also the exponent in Kummer's Theorem for binomial coefficients.

## Applications
Predicting digit sums, counting carries, and counting pairs that add without carrying.

## Contest profile
An AIME tool: count pairs adding without carrying, or find how a digit sum can change when a number is incremented.
`,

"largest-odd-divisor-sum": String.raw`
## Key forms
- $f(2n) = f(n)$ and $f(2n+1) = 2n+1$ — halving an even number keeps its largest odd divisor
- $S(2m) = m^2 + S(m)$ and $S(2m+1) = (m+1)^2 + S(m)$ — the odd numbers contribute a square, the even ones a copy of the sum up to half
- $S(2^k) = \frac{4^k + 2}{3}$ — the recurrence unwound from $S(1) = 1$
- $S(n) = \alt{\sum_{j \ge 0} \left\lceil \tfrac12 \lfloor n/2^j \rfloor \right\rceil^2}{\left\lceil \tfrac n2 \right\rceil^2 + \left\lceil \tfrac12 \lfloor \tfrac n2 \rfloor \right\rceil^2 + \left\lceil \tfrac12 \lfloor \tfrac n4 \rfloor \right\rceil^2 + \cdots}$ — each round of halving adds the square of its count of odd numbers

## Conditions
$n$ is a positive integer and $f(k)$ is the largest odd divisor of $k$, so $f(k) = k$ when $k$ is odd. The recurrence starts from $S(1) = 1$, or from $S(0) = 0$.

## Why it works
Split the numbers by parity, and the even half is a smaller copy of the same sum.

The odd numbers from $1$ to $2m - 1$ are their own largest odd divisors, and the first $m$ odd numbers add to $m^2$. Each even number $2j$ with $j \le m$ has the same largest odd divisor as $j$, since halving removes only a factor of $2$, so the even numbers contribute $f(1) + \cdots + f(m) = S(m)$. That gives $S(2m) = m^2 + S(m)$; up to $2m + 1$ there are $m + 1$ odd numbers, so $S(2m+1) = (m+1)^2 + S(m)$. For $n = 10$, $$S(10) = 5^2 + S(5) = 25 + 3^2 + S(2) = 25 + 9 + 2 = 36,$$ which matches $1 + 1 + 3 + 1 + 5 + 3 + 7 + 1 + 9 + 5$.

For a power of $2$ the recurrence telescopes: $$S(2^k) = 4^{k-1} + 4^{k-2} + \cdots + 4^0 + S(1) = \frac{4^k - 1}{3} + 1 = \frac{4^k + 2}{3}.$$

## Useful observations
- Every $k$ is its largest odd divisor times the highest power of $2$ dividing it, $k = 2^{v_2(k)} f(k)$, the same split the [[odd-part-chains|odd-part chains]] method uses, so a sum of those powers of $2$ yields to the same halving.
- $S(n)$ is close to $\frac{n^2}{3}$, a quick check on any computed value: $S(64) = 1366$ against $\frac{64^2}{3} \approx 1365$.

## Applications
Sums over $1, 2, \ldots, n$ of a quantity that depends only on the odd part of each number, such as the largest odd divisor or the highest power of $2$.

## Contest profile
No problems here are tagged with it yet. On the AIME and in olympiad number theory it appears as a sum of largest odd divisors, or of the powers of $2$ dividing each number, up to a large bound, where the halving recurrence replaces a term-by-term count.
`,

"cycle-hunting": String.raw`
## When to use
The question asks for $a_{2026}$, the last digits of $3^{2026}$, or the $1001$st iterate of a map, and the next term depends only on a state with finitely many possible values: a residue modulo $m$, the last two terms modulo $m$, or a value of a map that keeps returning. A rule that grows without bound and is asked for an exact value has no cycle to find, and its closed form is the better route.

## How
1. Identify the state, the terms the rule needs to produce the next one.
2. Compute terms exactly, as fractions or residues, until a state repeats.
3. Record the start $n_0$ of the cycle and its length $T$.
4. Replace the index $N$ by $n_0 + ((N - n_0) \bmod T)$ and read off that term.
5. For powers of a base coprime to $m$, the period is the order of the base and divides $\varphi(m)$.

The units digits of $7^n$ run $7, 9, 3, 1$ and repeat, so $T = 4$; since $2026 \equiv 2 \pmod 4$, the units digit of $7^{2026}$ is $9$.

{{figure:cycle}}

## Why it works
A state with finitely many possible values must repeat within that many steps, by the [[pigeonhole|pigeonhole principle]]. The rule is deterministic, so once a state recurs, everything after it repeats the steps that followed its first appearance, and the sequence is periodic from $n_0$ on. When the rule can also be run backward, as for powers of a base coprime to the modulus, the cycle starts at the very first term.

## Formulas it uses
- [[pigeonhole]]: finitely many states force a repeat.
- [[multiplicative-order]]: the exact period of the powers of $a$ modulo $m$ is the least $k$ with $a^k \equiv 1 \pmod m$.
- [[eulers-theorem]]: for $a$ coprime to $m$, that period divides $\varphi(m)$, which bounds the search.

## Common traps
- Tracking one term when the rule needs the last two, and declaring a cycle when only one value repeats.
- Reducing the index from the start when the cycle begins later.
- Computing with decimals, which hide an exact return.

## Contest profile
Common on the AMC and AIME: a term numbered in the thousands, or the last digits of a large power, almost always reduces to six to twenty careful terms.
`,

"reduce-divisibility-constant": String.raw`
## When to use
Conditions such as "$n + 2$ divides $n^3 + 50$", "$\frac{n^2 + 7}{n - 1}$ is an integer", or "find $\gcd(n^2 + 3, n + 1)$". The same reduction finds the possible common factors of two consecutive values of a sequence, and shows that a polynomial with integer coefficients satisfies $a - b \mid P(a) - P(b)$, which rules out values such as $P(2) = 5$ with $P(7) = 8$. A divisibility with a fixed divisor, such as $7 \mid n^3 + 50$, is a congruence, settled by checking residues.

## How
1. Identify the linear divisor $n + a$.
2. Replace $n$ by $-a$ in the polynomial; the result $C = P(-a)$ is what remains after subtracting multiples of $n + a$.
3. Conclude $n + a \mid C$, so $n + a$ is a divisor of $C$, positive or negative.
4. List the divisors of $C$ in the allowed range, and convert each to a value of $n$.
5. For a gcd, the same step gives $\gcd(P(n), n + a) = \gcd(C, n + a)$, a divisor of $C$; check which divisors actually occur.

For $\gcd(n^2 + 3, n + 1)$: replacing $n$ by $-1$ leaves $4$, so the gcd divides $4$, and $n = 2, 1, 3$ give $1$, $2$, and $4$.

## Why it works
$P(n) - P(-a)$ is divisible by $n - (-a) = n + a$, because $n^k - (-a)^k$ is divisible by $n + a$ for every $k$. So $P(n)$ and $P(-a)$ leave the same remainder on division by $n + a$, and one is divisible by $n + a$ exactly when the other is.

## Formulas it uses
- [[factor-remainder-theorem]]: dividing $P(x)$ by $x - c$ leaves remainder $P(c)$, and for integers $a - b \mid P(a) - P(b)$, the fact behind the reduction.
- [[euclidean-algorithm]]: $\gcd(P(n), n + a) = \gcd(P(-a), n + a)$ is one step of the Euclidean algorithm.
- [[number-of-divisors]]: counts the values of $n$, one for each divisor of the constant in range.

## Common traps
- Forgetting negative divisors when $n$ may be negative or zero.
- Keeping divisors that give $n$ outside the allowed range, such as $n + 2 = 1$ for positive $n$.
- Reducing with the wrong sign: modulo $n + a$, $n$ behaves like $-a$, not $a$.

## Contest profile
AMC and AIME problems asking for all $n$ that make a polynomial quotient an integer, the largest such $n$, or the possible values of a gcd of two expressions in $n$.
`,

"subtract-equal-remainders": String.raw`
## When to use
"$701$, $1107$, and $1658$ leave the same remainder on division by $d$", or "$n$ leaves remainder $3$ when divided by $4$, $4$ when divided by $5$, and $5$ when divided by $6$". The same subtraction shows that a sequence with $a_{k+1} \equiv a_k$ has constant remainder, finds which modulus makes a congruence hold, and explains why $a \equiv b$ lets equal remainders be cancelled from both sides of an equation. Unrelated remainders, not the same one, call for the Chinese Remainder Theorem.

## How
1. If several numbers share an unknown remainder modulo an unknown $d$, subtract them in pairs; $d$ divides every difference.
2. Compute the gcd of the differences with the Euclidean algorithm; the possible $d$ are its divisors larger than the remainder.
3. If one number $n$ leaves remainders that are each $c$ less than the moduli, then $n + c$ is divisible by every modulus, hence by their lcm.
4. If the remainders are all equal to $r$, then $n - r$ is a common multiple, the same step in the other direction.
5. Find the remainder, or $n$, from the divisor or the lcm.

For $n \equiv 3 \pmod 4$, $n \equiv 4 \pmod 5$, $n \equiv 5 \pmod 6$, each remainder is $1$ short of the modulus, so $60 = \operatorname{lcm}(4, 5, 6)$ divides $n + 1$, and the smallest such $n$ is $59$.

## Why it works
If $a = q_1d + r$ and $b = q_2d + r$, then $a - b = (q_1 - q_2)d$, so the remainder cancels and $d$ divides the difference. Conversely, if $d$ divides $a - b$, the two numbers have the same remainder. A number divisible by each of several moduli is divisible by their lcm, which handles a shared remainder for one number and many moduli.

## Formulas it uses
- [[euclidean-algorithm]]: computes the gcd of the differences quickly, by repeated subtraction.
- [[gcd-lcm-product]]: relates gcd and lcm, used to find the lcm of the moduli.
- [[crt]]: when the remainders are not all the same distance from the moduli, the Chinese Remainder Theorem is the general tool.

## Common traps
- Forgetting that $d$ must exceed the common remainder, which rules out small divisors of the gcd.
- Taking the gcd of the numbers themselves instead of their differences.
- Missing a remainder pattern written as "one less than the divisor", which is a shared remainder of $-1$.

## Contest profile
A MATHCOUNTS and AMC 10 favorite with numbers chosen to make differences share a large prime, and a quick first step in AIME remainder problems.
`,

"numeral-as-polynomial": String.raw`
## When to use
"In which base is $253_b$ twice $126_b$?", "$\overline{ab}_7 = \overline{ba}_9$", or "show that $121_b$ is a perfect square in every base". The same view explains divisibility tests in any base: since $b \equiv 1 \pmod{b - 1}$, a numeral is congruent to its digit sum modulo $b - 1$, and since $b \equiv -1 \pmod{b + 1}$, to its alternating digit sum modulo $b + 1$. A puzzle about base-ten digits, with nothing unknown about the base, is a digit problem, not this.

## How
1. Write each numeral as a polynomial in its base: $253_b = 2b^2 + 5b + 3$.
2. Turn the condition into an equation or identity in $b$.
3. Solve for $b$, or factor the polynomial; $121_b = b^2 + 2b + 1 = (b + 1)^2$.
4. Keep only bases larger than every digit used, and check the answer by converting.

The numeral $1111_b = b^3 + b^2 + b + 1 = (b + 1)(b^2 + 1)$, so it is never prime for $b \ge 2$.

## Why it works
Positional notation means exactly this polynomial: the digit in place $k$ counts copies of $b^k$. The polynomial in $b$ therefore has the numeral's value, and any algebra done on the polynomial is algebra on the number. The digit condition $0 \le a_i \lt b$ is what makes the representation valid and unique.

## Formulas it uses
- [[base-conversion]]: the expansion $\sum a_ib^i$ and the conversion back by repeated division.
- [[factor-remainder-theorem]]: substituting $b = 1$ or $b = -1$ gives the remainder modulo $b - 1$ or $b + 1$, the digit sum or the alternating digit sum.
- [[divisibility-rules]]: the base-ten tests for $9$ and $11$ are the cases $b - 1$ and $b + 1$ with $b = 10$.

## Common traps
- Accepting a base that is not larger than every digit, such as $b = 5$ for a numeral containing the digit $6$.
- Forgetting that a leading digit cannot be $0$.
- Mixing up which base belongs to which numeral when two bases appear.

## Contest profile
From MATHCOUNTS to the AIME: finding an unknown base from an equation between numerals, numbers whose digits reverse between two bases, and facts about numerals that hold in every base.
`,

"poly-divisible-linear": String.raw`
## Distinguishing clues
- The unknown is an integer $n$, and it appears on both sides of a divisibility, with a linear expression on the divisor side.
- The questions ask for all such $n$, the largest one, or the possible values of a gcd.
- Not this pattern: a divisibility with a fixed divisor, such as $7 \mid n^3 + 50$, which is a congruence settled by [[choose-modulus|checking residues]].

## Methods and Formulas to Try
Modulo $n + a$, every power of $n$ can be replaced by a power of $-a$, so the polynomial shrinks to a constant.

### Methods to try
- [[reduce-divisibility-constant]]: replace $n$ by $-a$ to get a constant $C$, so $n + a$ must be a divisor of $C$.
- [[factor-pair-counting]]: once $n + a$ times an integer equals $C$, list the factor pairs of $C$ to find every $n$.

### Formulas to try
- [[factor-remainder-theorem]]: $P(n)$ leaves remainder $P(-a)$ on division by $n + a$.
- [[euclidean-algorithm]]: $\gcd(P(n), n + a) = \gcd(P(-a), n + a)$.
- [[number-of-divisors]]: counts the solutions, one for each divisor of $C$ in range.

## Common traps
- Missing negative divisors when $n$ ranges over all integers.
- Not checking the range, so that $n + a$ equals a divisor smaller than its minimum value.
- Dividing the polynomial carelessly when replacing $n$ by $-a$ gives the remainder at once.

## Contest profile
AMC and AIME problems asking for the largest or every integer $n$ that makes a polynomial quotient an integer, and for the values a gcd of two expressions in $n$ can take.
`,

"unknown-base": String.raw`
## Distinguishing clues
- A subscript is a variable, or a number is described by its digits in two different bases.
- Not this pattern: a plain conversion between two known bases, which is a routine computation, or a puzzle about base-ten digits with nothing unknown about the base, which belongs with the other [[digit-manipulation|digit problems]].

## Methods and Formulas to Try
Expanding the numeral turns the condition into an equation in the base and the digits, all small integers with known bounds.

### Methods to try
- [[numeral-as-polynomial]]: expand each numeral as a polynomial in its base and solve for the base.
- [[bounding-diophantine]]: with digits and base both unknown, as in $\overline{ab}_7 = \overline{ba}_9$, the digit bounds leave a short check.

### Formulas to try
- [[base-conversion]]: the expansion in powers of the base, and conversion back.
- [[divisibility-rules]]: in base $b$ a numeral is congruent to its digit sum modulo $b - 1$, which can fix a digit or rule out a base.

## Common traps
- Accepting a base that is not larger than every digit in the numeral.
- Forgetting that the leading digit in each base must be nonzero.
- Solving the polynomial for $b$ and missing a second positive root.

## Contest profile
MATHCOUNTS and AMC questions asking for an unknown base, and AIME problems in which a number's digits are related across two bases.
`,

"fundamental-theorem-arithmetic": String.raw`
## Key forms
- $n = p_1^{e_1} p_2^{e_2} \cdots p_k^{e_k}$ — every $n \ge 2$ factors into primes, and the primes and exponents are unique
- there are infinitely many primes — no finite list contains them all
- $m \mid n \iff$ every exponent of $m$ is at most the matching exponent of $n$
- $n$ is a perfect $k$th power $\iff$ every exponent in its factorization is a multiple of $k$

## Conditions
Integers $n \ge 2$; the factorization is unique up to the order of the factors, and $1$ is the empty product.

## Why it works
Existence comes from taking the smallest integer with no prime factorization: it is not prime, so it splits as $ab$ with $1 \lt a, b \lt n$, and both $a$ and $b$ factor, so it does too.

Uniqueness rests on [[euclids-lemma|Euclid's Lemma]]: a prime that divides a product divides one of the factors. If $p_1 p_2 \cdots = q_1 q_2 \cdots$ are two factorizations, $p_1$ divides the right side, so it divides some $q_j$, and since $q_j$ is prime, $p_1 = q_j$. Cancel the pair and repeat; the two lists match.

Infinitely many primes: given any finite list $p_1, \ldots, p_k$ of primes, the number $N = p_1p_2 \cdots p_k + 1$ leaves remainder $1$ on division by each $p_i$, so its prime factors are not on the list.

## Useful observations
- The divisors of $n$ are the products $p_1^{a_1} \cdots p_k^{a_k}$ with $0 \le a_i \le e_i$, so $n$ has $(e_1 + 1)\cdots(e_k + 1)$ divisors, the [[number-of-divisors|divisor count]].
- The gcd takes the smaller exponent of each prime and the lcm the larger one, which is why $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab$.
- Uniqueness is special to the integers: among numbers $a + b\sqrt{-5}$, $6 = 2 \cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$ factors in two genuinely different ways.

## Applications
Divisors, gcds and lcms, perfect powers, and any question about the prime exponents of a number.

## Contest profile
The bedrock of number theory at every level; it is rarely named in a solution, but every argument about exponents of primes assumes it.
`,

"lagrange-roots-mod-p": String.raw`
## Key forms
- a polynomial of degree $d$, not identically $0$ modulo the prime $p$, has at most $d$ roots modulo $p$
- $x^{p-1} - 1 \equiv (x - 1)(x - 2)\cdots(x - (p - 1)) \pmod p$ — both sides have the $p - 1$ roots $1, \ldots, p - 1$
- $x^2 \equiv a \pmod p$ has at most $2$ solutions, and $x^k \equiv 1 \pmod p$ has at most $k$

## Conditions
The modulus must be prime. For a composite modulus the bound fails: $x^2 \equiv 1 \pmod 8$ has the four solutions $1$, $3$, $5$, and $7$.

## Why it works
Modulo a prime, a product is $0$ only when a factor is $0$, by [[euclids-lemma|Euclid's Lemma]], so the Factor Theorem works as it does for real numbers. If $r$ is a root of $f$, then $f(x) \equiv (x - r)g(x)$ with $\deg g = d - 1$. Any other root $s \not\equiv r$ makes $(s - r)g(s) \equiv 0$ with $s - r \not\equiv 0$, so $g(s) \equiv 0$. By induction on the degree, $g$ has at most $d - 1$ roots, so $f$ has at most $d$.

## Useful observations
- Comparing constant terms in $x^{p-1} - 1 \equiv (x - 1)\cdots(x - (p - 1))$ gives $(p - 1)! \equiv -1 \pmod p$, which is [[wilsons-theorem|Wilson's Theorem]].
- Two polynomials of degree less than $p$ that agree at more points than their degree are congruent modulo $p$ coefficient by coefficient.
- The bound is what makes [[primitive-roots|primitive roots]] exist: it limits how many residues can have each order.

## Applications
Counting solutions of polynomial congruences modulo a prime, and proofs of Wilson's Theorem and of the existence of primitive roots.

## Contest profile
An olympiad tool, usually the step that bounds the number of solutions of a congruence or proves two polynomials are congruent.
`,

"coins-and-prices": String.raw`
## Distinguishing clues
- A total amount of money made from coins, stamps, or items at a few fixed prices.
- Counts that must be whole numbers, often at least one of each kind.
- A question about how many ways the amount can be made, which item count is forced, or the largest amount that cannot be made.
- Not this pattern: a rate or a percentage problem in which the quantities may be fractions, which needs equations, not whole-number reasoning.

## Methods and Formulas to Try
One equation in whole numbers, with values that share little, so divisibility fixes one count and bounds finish the list.

### Methods to try
- [[choose-modulus]]: reduce the equation modulo one of the values to fix the remainder of another count.
- [[bounding-diophantine]]: the counts are nonnegative and the total is fixed, so each count is bounded, leaving a short list to check.
- [[casework-method]]: with three or more kinds of items, fix the count of the most valuable kind and solve the rest in each case.

### Formulas to try
- [[chicken-mcnugget]]: with two coprime values $a$ and $b$, every amount above $ab - a - b$ can be made, and $ab - a - b$ cannot.
- [[bezouts-identity]]: with values whose gcd is $d$, only multiples of $d$ can be made at all.

## Common traps
- Forgetting a condition such as "at least one of each", which removes the solutions with a zero count.
- Mixing units, such as dollars and cents, in one equation.
- Stopping after one solution when the question asks for the number of ways.
- Testing every count from zero upward instead of using a remainder to jump between solutions.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 setup, from a single forced count to counting the ways to make change, with the Frobenius bound at AMC 12 and AIME level. It pairs with Choosing the Right Modulus and with the Chicken McNugget Theorem.
`,
"dirichlet-primes-progression": String.raw`
## Key forms
- infinitely many primes $p \equiv 3 \pmod 4$ — if $p_1, \ldots, p_k$ were all of them, $4p_1\cdots p_k - 1$ would have a prime factor $\equiv 3 \pmod 4$ outside the list
- infinitely many primes $p \equiv 1 \pmod 4$ — every odd prime factor of $(2p_1\cdots p_k)^2 + 1$ is $\equiv 1 \pmod 4$
- infinitely many primes $p \equiv 1 \pmod n$ — every prime factor of $\Phi_n(N)$ that does not divide $n$ is $\equiv 1 \pmod n$

## Conditions
$m \ge 1$ and $\gcd(a, m) = 1$. The theorem says nothing about where the first such prime is, and nothing about primes in a progression whose terms share a factor.

## Why it works
The general theorem, proved by Dirichlet in 1837, uses characters modulo $m$ and the fact that certain infinite series, his $L$-functions, do not vanish at $1$. That is far beyond a contest, and solutions cite it.

The special cases follow Euclid's proof. For $3 \bmod 4$, suppose $p_1, \ldots, p_k$ are all the primes $\equiv 3 \pmod 4$ and let $N = 4p_1\cdots p_k - 1$. It is odd and $\equiv 3 \pmod 4$. A product of primes that are all $\equiv 1 \pmod 4$ is $\equiv 1 \pmod 4$, so some prime factor $q$ of $N$ is $\equiv 3 \pmod 4$. But $N \equiv -1 \pmod{p_i}$ for every $i$, so $q$ is not on the list, a contradiction.

For $1 \bmod 4$, let $N = (2p_1\cdots p_k)^2 + 1$ and let $q$ be a prime factor of it. Then $q$ is odd and $(2p_1\cdots p_k)^2 \equiv -1 \pmod q$, so $-1$ is a square modulo $q$, which by [[eulers-criterion|Euler's Criterion]] forces $q \equiv 1 \pmod 4$. Again $q$ is none of the $p_i$.

The last Key form is the same argument with the [[cyclotomic-polynomials|cyclotomic polynomial]] $\Phi_n$, using $N = n\,p_1\cdots p_k$.

## Useful observations
- In an olympiad solution the theorem supplies a prime of a chosen residue larger than any given bound, for instance a prime $p \equiv -1 \pmod m$ with $p \gt N$, to substitute into a functional equation or a divisibility.
- The elementary arguments work exactly for the residues $a$ with $a^2 \equiv 1 \pmod m$; any other residue needs Dirichlet's analysis.

## Applications
Choosing a large prime in a given residue class to test a divisibility or a functional equation, and proving that the primes of a given form are infinite.

## Contest profile
No problems here are tagged with it yet. An olympiad citation, quoted in one line; the special cases for $1$ and $3$ modulo $4$ are classical olympiad exercises in their own right.
`
});
