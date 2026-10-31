// Learn, AIME Number Theory, chapter N1: prime factorization and divisors (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N1"] = {
  lessons: {
    "N1.1": {
      prereq: ["fundamental-theorem-arithmetic", "number-of-divisors"],
      cards: [],
      body: String.raw`This chapter works with whole numbers through their prime factorizations. Every positive integer is a product of primes in exactly one way, and most questions about divisors, common divisors and multiples become questions about the exponents of the primes, one prime at a time.

Write $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$. A divisor of $n$ is a choice of exponent for each prime, from $0$ up to the exponent in $n$, so $360 = 2^3 \cdot 3^2 \cdot 5$ has $(3 + 1)(2 + 1)(1 + 1) = 24$ divisors. The greatest common divisor of two numbers takes the smaller exponent of each prime and the least common multiple the larger, which is why their product is the product of the two numbers.

The sum and the product of the divisors are found the same way, from the exponents, and they behave well on numbers with no common prime factor. A condition on a divisor, such as being a perfect square, being odd, or being a multiple of $6$, becomes a rule on each exponent, so such divisors are counted prime by prime and the counts multiplied. Pairs of numbers with a given least common multiple or greatest common divisor are counted the same way, by the exponents each pair may take at each prime.

The exponent of a prime in a large product, such as a factorial, is found by counting multiples: the exponent of $2$ in $20!$ is $10 + 5 + 2 + 1 = 18$, one for each multiple of $2$, one more for each multiple of $4$, and so on. Counting the numbers that share no prime with a modulus leads to Euler's function and to sums over such numbers.

The lessons take these ideas in turn: exponents, gcd and lcm (N1.2), the number, sum and product of divisors (N1.3), divisors with conditions (N1.4), factor pairs and pairs counted by lcm and gcd (N1.5), and prime exponents with counting (N1.6). The Summary (N1.7) collects the strategies.`,
      exercises: [
        { q: String.raw`How many positive divisors does $360$ have?`, answer: "24",
          solution: String.raw`Factor: $360 = 2^3 \cdot 3^2 \cdot 5$. A divisor is $2^a 3^b 5^c$ with $0 \le a \le 3$, $0 \le b \le 2$, $0 \le c \le 1$, so there are $4 \cdot 3 \cdot 2 = 24$ of them.` },
        { q: String.raw`Find the greatest common divisor and the least common multiple of $360 = 2^3 \cdot 3^2 \cdot 5$ and $1134 = 2 \cdot 3^4 \cdot 7$.`, answer: "18, 22680",
          solution: String.raw`The gcd takes the smaller exponent of each prime: $2^1 \cdot 3^2 = 18$. The lcm takes the larger: $2^3 \cdot 3^4 \cdot 5 \cdot 7 = 22680$. As a check, $18 \cdot 22680 = 408240 = 360 \cdot 1134$.` },
        { q: String.raw`What is the largest power of $2$ that divides $20!$?`, answer: "2^18",
          solution: String.raw`Each of the $10$ even numbers up to $20$ gives one factor of $2$; each of the $5$ multiples of $4$ gives one more; the $2$ multiples of $8$ one more; and $16$ one more. The exponent is $10 + 5 + 2 + 1 = 18$, so the answer is $2^{18}$.` }
      ],
      problems: [
        "2010 AMC 10B, Problem 8",
        "2015 AIME II, Problem 1",
        "2021 Fall AMC 10B, Problem 6"
      ]
    },
    "N1.2": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["exponent-tracking", "gcd-lcm-product", "lcm-common-multiples", "gcd-substitution"],
      body: String.raw`Nearly every question about divisibility becomes simpler once each number is written as a product of primes and then thought of as a list of exponents, one for each prime. In those coordinates multiplying two numbers adds their exponents, the gcd takes the smaller exponent of each prime, and the lcm takes the larger one. A condition that looks tangled, such as finding $n$ with a given lcm against $18$ and a given gcd against $45$, falls apart into a separate, easy question for each prime. That habit is [[exponent-tracking|prime exponent tracking]], and the rest of the chapter is built on it.

The rules follow from unique factorization. A number $d$ divides $n$ exactly when every exponent of $d$ is at most the matching exponent of $n$, so the common divisors of $a$ and $b$ are the numbers whose exponents are at most both, and the largest of them takes the minimum of the two. In the same way the common multiples have exponents at least both, and the smallest takes the maximum. For $360 = 2^3 \cdot 3^2 \cdot 5$ and $84 = 2^2 \cdot 3 \cdot 7$ this gives $\gcd = 2^2 \cdot 3 = 12$ and $\operatorname{lcm} = 2^3 \cdot 3^2 \cdot 5 \cdot 7 = 2520$. Since the minimum and maximum of two exponents add up to the two exponents themselves, [[gcd-lcm-product|the gcd times the lcm is the product]]: $12 \cdot 2520 = 30240 = 360 \cdot 84$. That identity lets either one be found from the other, and it is often the quickest way to turn a statement about an lcm into an equation.

The same exponent view explains why a list of divisibility conditions collapses into one. A number divisible by each of several numbers has, for every prime, an exponent at least as large as each of theirs, which says exactly that it is a multiple of their lcm. So [[lcm-common-multiples|the common multiples are the multiples of the lcm]]: the numbers divisible by every integer from $1$ to $10$ are the multiples of $2520$, and two events that repeat every $a$ and every $b$ days coincide every $\operatorname{lcm}(a, b)$ days.

When a problem fixes the gcd of two unknowns, the cleanest move is to pull it out. If $\gcd(a, b) = g$, write $a = gx$ and $b = gy$; then $x$ and $y$ are coprime, which means they share no prime at all, and any further condition becomes a condition on a coprime pair. That is [[gcd-substitution|gcd substitution]]. For instance, the pairs of positive integers with sum $60$ and gcd $12$ are $12x + 12y = 60$ with $\gcd(x, y) = 1$, so $x + y = 5$, and all four ordered splittings of $5$ are coprime.

The signal is any problem that mentions a gcd, an lcm, or several divisibility conditions together, especially one whose numbers factor into a few small primes. Factor everything first, then work one prime at a time.`,
      related: [
        { card: "fundamental-theorem-arithmetic", note: String.raw`unique factorization, which makes the list of exponents a faithful description of a number.` },
        { card: "number-of-divisors", note: String.raw`counting the divisors from the exponents, the first use of the exponent view in N1.3.` },
        { card: "lcm-pair-counting", note: String.raw`counting the pairs with a given lcm or gcd, prime by prime (N1.5).` }
      ],
      exercises: [
        { q: String.raw`Two positive integers have $\gcd 12$ and $\operatorname{lcm} 360$. One of them is $72$. What is the other?`, answer: "60",
          solution: String.raw`The gcd times the lcm is the product of the two numbers, so the other is $\tfrac{12 \cdot 360}{72} = 60$. Check: $72 = 2^3 \cdot 3^2$ and $60 = 2^2 \cdot 3 \cdot 5$ have gcd $2^2 \cdot 3 = 12$ and lcm $2^3 \cdot 3^2 \cdot 5 = 360$.` },
        { q: String.raw`What is the smallest positive integer divisible by every integer from $1$ to $10$?`, answer: "2520",
          solution: String.raw`It is $\operatorname{lcm}(1, \ldots, 10)$, which takes the largest power of each prime up to $10$: $2^3$ (from $8$), $3^2$ (from $9$), $5$, and $7$. So it is $8 \cdot 9 \cdot 5 \cdot 7 = 2520$.` },
        { q: String.raw`How many ordered pairs of positive integers $(a, b)$ have $a + b = 60$ and $\gcd(a, b) = 12$?`, answer: "4",
          solution: String.raw`Write $a = 12x$ and $b = 12y$ with $\gcd(x, y) = 1$. Then $x + y = 5$, and the ordered pairs of positive integers with sum $5$ are $(1, 4), (2, 3), (3, 2), (4, 1)$, all coprime. So there are $4$ pairs.` }
      ],
      problems: ["2019 AMC 10B, Problem 7", "2022 AMC 10A, Problem 7", "2018 AMC 10B, Problem 23", "1998 AIME, Problem 1"]
    },
    "N1.3": {
      prereq: ["number-of-divisors", "exponent-tracking"],
      cards: ["sum-of-divisors", "product-of-divisors", "multiplicative-functions"],
      body: String.raw`Once a number is factored, its divisors can be counted, added, and multiplied without being listed. A divisor of $n = p_1^{e_1} \cdots p_k^{e_k}$ is a choice of one exponent for each prime, from $0$ up to $e_i$, and that one description gives three formulas: the number of divisors, their sum, and their product. For $360 = 2^3 \cdot 3^2 \cdot 5$ there are $24$ divisors adding to $1170$, and both numbers come from a single line of arithmetic.

Since each divisor is a free choice of exponents, the count is $(e_1 + 1)(e_2 + 1) \cdots (e_k + 1)$, which for $360$ is $4 \cdot 3 \cdot 2 = 24$. The sum works the same way. Expanding the product $(1 + 2 + 2^2 + 2^3)(1 + 3 + 3^2)(1 + 5)$ produces every product of one term from each bracket exactly once, and those products are exactly the divisors of $360$. So [[sum-of-divisors|the sum of the divisors]] is that product, $15 \cdot 13 \cdot 6 = 1170$, and each bracket is a geometric series, $\tfrac{p^{e+1} - 1}{p - 1}$. Dropping the bracket for one prime restricts the sum: the odd divisors of $360$ add to $13 \cdot 6 = 78$, the divisor sum of its odd part $45$.

The product of the divisors needs a different idea, pairing. Each divisor $d$ has a partner $\tfrac nd$, and the two multiply to $n$, so the $d(n)$ divisors form $\tfrac{d(n)}{2}$ pairs and [[product-of-divisors|their product is $n^{d(n)/2}$]]. For $12$, with $6$ divisors, the product is $12^3 = 1728$, which is indeed $1 \cdot 2 \cdot 3 \cdot 4 \cdot 6 \cdot 12$. When $n$ is a perfect square one divisor, $\sqrt n$, is its own partner; the formula still holds, because that divisor contributes $\sqrt n = n^{1/2}$.

Both formulas are products over the primes, and that is no accident. A function $f$ with $f(mn) = f(m) f(n)$ whenever $m$ and $n$ are coprime is called [[multiplicative-functions|multiplicative]], and the number of divisors, their sum, and Euler's $\varphi$ all are. For such a function, knowing its value on prime powers is enough, and a question about $f(n)$ for all $n$, such as which $n$ makes $f(n)$ largest relative to $n$, splits into a separate question for each prime.

The signal is a question about how many divisors a number has, what they add or multiply to, or a sum taken over divisors. Factor the number, then think of each divisor as a choice of exponents.`,
      related: [
        { card: "number-of-divisors", note: String.raw`the count $(e_1 + 1) \cdots (e_k + 1)$ that the other two formulas build on.` },
        { card: "eulers-totient", note: String.raw`another multiplicative function, met again in N3.4.` },
        { card: "geometric-series", note: String.raw`each bracket $1 + p + \cdots + p^e$ in the divisor sum is a finite geometric series.` }
      ],
      exercises: [
        { q: String.raw`What is the sum of all positive divisors of $360$?`, answer: "1170",
          solution: String.raw`$360 = 2^3 \cdot 3^2 \cdot 5$, so the sum is $(1 + 2 + 4 + 8)(1 + 3 + 9)(1 + 5) = 15 \cdot 13 \cdot 6 = 1170$.` },
        { q: String.raw`What is the sum of the odd positive divisors of $360$?`, answer: "78",
          solution: String.raw`An odd divisor uses the exponent $0$ on $2$, so the odd divisors of $360$ are the divisors of $45 = 3^2 \cdot 5$. Their sum is $(1 + 3 + 9)(1 + 5) = 13 \cdot 6 = 78$.` },
        { q: String.raw`What is the product of all positive divisors of $12$?`, answer: "1728",
          solution: String.raw`$12 = 2^2 \cdot 3$ has $3 \cdot 2 = 6$ divisors, which pair up as $(1, 12), (2, 6), (3, 4)$, each pair multiplying to $12$. So the product is $12^{6/2} = 12^3 = 1728$.` }
      ],
      problems: ["2021 Spring AMC 10B, Problem 12", "2024 AMC 10B, Problem 8", "1987 AIME, Problem 3", "1986 AIME, Problem 8"]
    },
    "N1.4": {
      prereq: ["number-of-divisors", "sum-of-divisors"],
      cards: ["perfect-square-divisors", "largest-odd-divisor-sum", "sigma-parity"],
      body: String.raw`Many counting questions ask not for all the divisors of a number but for the ones with some property: the perfect squares, the odd ones, the ones that are cubes. The exponent view handles all of them at once, because a property of a divisor is almost always a condition on each of its exponents separately. A divisor of $12! = 2^{10} \cdot 3^5 \cdot 5^2 \cdot 7 \cdot 11$ is a perfect square exactly when each of its exponents is even, so there are $6 \cdot 3 \cdot 2 \cdot 1 \cdot 1 = 36$ square divisors, and counting them never requires listing one.

A number is a perfect square exactly when all its prime exponents are even, so for a [[perfect-square-divisors|square divisor]] the exponent of $p$ can be any even number from $0$ to $e$, which is $\lfloor \tfrac e2 \rfloor + 1$ choices, and the count is the product of these. The same reasoning counts cubes, with exponents that are multiples of $3$, and odd divisors, with exponent $0$ on $2$: $12!$ has $6 \cdot 3 \cdot 2 \cdot 2 = 72$ odd divisors. When a question asks for divisors that are squares or cubes, the two counts overlap in the sixth powers, and inclusion and exclusion removes the overlap.

The parity of a divisor count or a divisor sum is a property of this kind too. The number of divisors $\prod (e_i + 1)$ is odd exactly when every $e_i$ is even, that is, exactly for perfect squares. The divisor sum is a product of brackets $1 + p + \cdots + p^e$, and for an odd prime such a bracket is odd exactly when $e$ is even, while the bracket for $p = 2$ is always odd. So [[sigma-parity|$\sigma(n)$ is odd]] exactly when every odd prime has an even exponent, that is, when $n$ is a perfect square or twice one. Of the numbers up to $100$, that is the $10$ squares and the $7$ numbers $2, 8, 18, 32, 50, 72, 98$, so $17$ in all.

Some sums over divisors are best found with a recursion instead. Let $f(k)$ be the largest odd divisor of $k$, and $S(n) = f(1) + \cdots + f(n)$. The odd numbers up to $2m$ add to $m^2$, and each even number $2j$ has the same largest odd divisor as $j$, so [[largest-odd-divisor-sum|$S(2m) = m^2 + S(m)$]]. Halving repeatedly gives $S(8) = 16 + S(4) = 16 + 4 + S(2) = 22$, and in general $S(2^k) = \tfrac{4^k + 2}{3}$.

The signal is a count or sum of divisors with an extra condition. Translate the condition into a rule on each exponent, count the allowed exponents prime by prime, and multiply.`,
      related: [
        { card: "number-of-divisors", note: String.raw`the unrestricted count, of which each restricted count is a variant.` },
        { card: "inclusion-exclusion", note: String.raw`for divisors that are squares or cubes, subtracting the sixth powers counted twice.` },
        { card: "legendres-formula", note: String.raw`the exponents of a factorial such as $12!$, needed before its divisors can be counted (N4).` }
      ],
      exercises: [
        { q: String.raw`How many positive divisors of $12! = 2^{10} \cdot 3^5 \cdot 5^2 \cdot 7 \cdot 11$ are perfect squares?`, answer: "36",
          solution: String.raw`A square divisor has even exponents: $0, 2, \ldots, 10$ for $2$ ($6$ choices), $0, 2, 4$ for $3$ ($3$ choices), $0, 2$ for $5$ ($2$ choices), and only $0$ for $7$ and $11$. So there are $6 \cdot 3 \cdot 2 = 36$.` },
        { q: String.raw`For how many positive integers $n \le 100$ is $\sigma(n)$, the sum of the divisors of $n$, odd?`, answer: "17",
          solution: String.raw`$\sigma(n)$ is odd exactly when $n$ is a perfect square or twice a perfect square. Up to $100$ there are $10$ squares ($1, 4, \ldots, 100$) and $7$ doubled squares ($2, 8, 18, 32, 50, 72, 98$), and no number is both. So the answer is $17$.` },
        { q: String.raw`Let $f(k)$ be the largest odd divisor of $k$. Find $f(1) + f(2) + \cdots + f(16)$.`, answer: "86",
          solution: String.raw`With $S(2m) = m^2 + S(m)$: $S(16) = 64 + S(8)$, $S(8) = 16 + S(4)$, $S(4) = 4 + S(2)$, $S(2) = 1 + S(1) = 2$. So $S(4) = 6$, $S(8) = 22$, and $S(16) = 86$. (This matches $\tfrac{4^4 + 2}{3} = 86$.)` }
      ],
      problems: ["2019 AMC 10A, Problem 11", "2020 AMC 10A, Problem 15", "2020 AIME II, Problem 1"]
    },
    "N1.5": {
      prereq: ["factor-pair-counting", "exponent-tracking"],
      cards: ["lcm-pair-counting"],
      body: String.raw`Two unknowns whose product is a known constant can only be a pair of complementary divisors of that constant, so an equation that looks open-ended becomes a finite list. The equation $x^2 - y^2 = 45$ in positive integers becomes $(x - y)(x + y) = 45$, and the factor pairs $1 \cdot 45$, $3 \cdot 15$, and $5 \cdot 9$ give its only three solutions. This lesson is about getting an equation into that product form, and about counting pairs when the condition is an lcm or a gcd instead of a product.

Listing [[factor-pair-counting|factor pairs]] is only half the job: each pair must also satisfy whatever the problem demands of the two factors. In $(x - y)(x + y) = 45$ the two factors have the same parity, because they differ by the even number $2y$, and both must be positive with the first smaller. Here every factor pair of the odd number $45$ qualifies, but the same equation with $46$ on the right has no solution at all, since $46$ cannot be split into two factors of the same parity. Counting the ordered pairs with product $n$ needs no conditions and gives exactly $d(n)$ of them: $360$ can be written as an ordered product $xy$ in $24$ ways.

A condition on the lcm is counted prime by prime. For [[lcm-pair-counting|$\operatorname{lcm}(a, b) = n$]] with $n = \prod p^e$, the exponents of $p$ in $a$ and $b$ must have maximum exactly $e$: both lie between $0$ and $e$, and at least one equals $e$. That leaves $(e + 1)^2 - e^2 = 2e + 1$ choices, so the number of ordered pairs is $\prod (2e + 1)$, which for $360 = 2^3 \cdot 3^2 \cdot 5$ is $7 \cdot 5 \cdot 3 = 105$. When both the gcd and the lcm are fixed, divide everything by the gcd first: pairs with $\gcd 6$ and $\operatorname{lcm} 360$ correspond to coprime pairs with lcm $60 = 2^2 \cdot 3 \cdot 5$, and for a coprime pair each prime of $60$ goes wholly to one number or the other, so there are $2^3 = 8$ ordered pairs.

The signal is an equation that can be factored into a product equal to a constant (difference of squares, Simon's Favorite Factoring Trick), or a count of pairs with a prescribed gcd or lcm. Get the product form, list or count the factorizations prime by prime, then apply the side conditions.`,
      related: [
        { card: "difference-of-squares", note: String.raw`the most common way to reach a product equal to a constant, as in $x^2 - y^2 = 45$.` },
        { card: "number-of-divisors", note: String.raw`the number of ordered factor pairs of $n$ is $d(n)$.` },
        { card: "gcd-substitution", note: String.raw`dividing out the gcd before counting pairs (N1.2).` }
      ],
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $x^2 - y^2 = 45$?`, answer: "3",
          solution: String.raw`$(x - y)(x + y) = 45$ with $0 < x - y < x + y$. The factor pairs of $45$ are $1 \cdot 45$, $3 \cdot 15$, $5 \cdot 9$, all with factors of the same parity, giving $(x, y) = (23, 22), (9, 6), (7, 2)$. So there are $3$.` },
        { q: String.raw`How many ordered pairs of positive integers $(a, b)$ have $\operatorname{lcm}(a, b) = 360$?`, answer: "105",
          solution: String.raw`$360 = 2^3 \cdot 3^2 \cdot 5$. For each prime the larger exponent must equal the exponent in $360$, which leaves $2e + 1$ choices: $7$ for $2$, $5$ for $3$, $3$ for $5$. So there are $7 \cdot 5 \cdot 3 = 105$ pairs.` },
        { q: String.raw`How many ordered pairs of positive integers $(a, b)$ have $\gcd(a, b) = 6$ and $\operatorname{lcm}(a, b) = 360$?`, answer: "8",
          solution: String.raw`Write $a = 6x$, $b = 6y$; then $\gcd(x, y) = 1$ and $\operatorname{lcm}(x, y) = 60 = 2^2 \cdot 3 \cdot 5$. Coprime numbers share no prime, so each of the prime powers $4$, $3$, $5$ goes wholly to $x$ or wholly to $y$: $2^3 = 8$ ordered pairs.` }
      ],
      problems: ["2016 AMC 10B, Problem 18", "2022 AMC 10B, Problem 7", "2016 AMC 12B, Problem 24"]
    },
    "N1.6": {
      prereq: ["exponent-tracking"],
      cards: ["floor-multiples", "coprime-residue-sum", "consecutive-coprime"],
      body: String.raw`The last tools of the chapter count and add numbers by their divisibility rather than by listing them. How many numbers up to $1000$ are multiples of $3$ or $5$, how many share no factor with $30$, and what the numbers coprime to $30$ add up to are all questions with exact answers found in a few lines. They rest on three small facts: multiples are evenly spaced, numbers coprime to $n$ come in pairs, and neighbors share no factor.

The multiples of $d$ among $1, 2, \ldots, n$ are $d, 2d, \ldots$, one in each block of $d$ consecutive numbers, so there are [[floor-multiples|$\lfloor \tfrac nd \rfloor$ of them]]. Combined with inclusion and exclusion this counts numbers divisible by at least one of several primes: up to $1000$ there are $333$ multiples of $3$ and $200$ of $5$, and the $66$ multiples of $15$ were counted twice, so $333 + 200 - 66 = 467$ numbers are multiples of $3$ or $5$. A condition such as "divisible by $5$ and a perfect square" usually translates into a single multiple first: a square divisible by $5$ is divisible by $25$.

The numbers from $1$ to $n$ that are coprime to $n$ come in pairs $k$ and $n - k$, since a common factor of $n - k$ and $n$ would also divide $k$. Each pair adds to $n$, so [[coprime-residue-sum|their sum is $\tfrac{n \varphi(n)}{2}$]], where $\varphi(n)$ is how many of them there are. For $n = 30$ the eight numbers $1, 7, 11, 13, 17, 19, 23, 29$ add to $\tfrac{30 \cdot 8}{2} = 120$. The count $\varphi(n)$ itself is taken up properly in N3.4.

Finally, [[consecutive-coprime|consecutive integers share no factor]], because any common divisor of $n$ and $n + 1$ divides their difference $1$. More generally a common divisor of $n$ and $n + k$ divides $k$, so $\gcd(n, n + 6)$ is one of $1, 2, 3, 6$, and it is $1$ exactly when $n$ is coprime to $6$. This is what makes equations like $\tfrac{n}{20 - n} = k^2$ finite: rewriting gives $n = \tfrac{20k^2}{k^2 + 1}$, and since $k^2$ and $k^2 + 1$ share no factor, $k^2 + 1$ must divide $20$.

The signal is a count of numbers up to some bound with a divisibility condition, a sum over the residues coprime to a modulus, or a fraction whose numerator and denominator are close together. The Summary (N1.7) collects the chapter's strategies.`,
      related: [
        { card: "inclusion-exclusion", note: String.raw`combining the counts of multiples of several numbers without double counting.` },
        { card: "eulers-totient", note: String.raw`the number $\varphi(n)$ of residues coprime to $n$ (N3.4).` },
        { card: "legendres-formula", note: String.raw`counting multiples of $p, p^2, p^3, \ldots$ to find the power of $p$ in a factorial (N4).` }
      ],
      exercises: [
        { q: String.raw`How many integers from $1$ to $1000$ are divisible by $3$ or by $5$?`, answer: "467",
          solution: String.raw`There are $\lfloor \tfrac{1000}{3} \rfloor = 333$ multiples of $3$, $200$ of $5$, and $\lfloor \tfrac{1000}{15} \rfloor = 66$ of both. By inclusion and exclusion, $333 + 200 - 66 = 467$.` },
        { q: String.raw`What is the sum of the positive integers less than $30$ that are coprime to $30$?`, answer: "120",
          solution: String.raw`They are $1, 7, 11, 13, 17, 19, 23, 29$, eight numbers that pair up as $k$ and $30 - k$. Each of the four pairs adds to $30$, so the sum is $4 \cdot 30 = 120$, which is $\tfrac{30 \cdot 8}{2}$.` },
        { q: String.raw`For how many integers $n$ with $1 \le n \le 100$ is $\gcd(n, n + 6) = 1$?`, answer: "33",
          solution: String.raw`A common divisor of $n$ and $n + 6$ divides $6$, so the gcd is $1$ exactly when $n$ is divisible by neither $2$ nor $3$. Up to $100$ there are $50$ multiples of $2$, $33$ of $3$, and $16$ of $6$, so $50 + 33 - 16 = 67$ are divisible by $2$ or $3$, and $100 - 67 = 33$ are not.` }
      ],
      problems: ["2022 AMC 10B, Problem 8", "2023 AMC 10A, Problem 3", "2002 AMC 10B, Problem 16", "1992 AIME, Problem 1"]
    },
    "N1.7": {
      prereq: ["exponent-tracking", "gcd-lcm-product", "number-of-divisors", "sum-of-divisors", "product-of-divisors", "perfect-square-divisors", "lcm-pair-counting", "floor-multiples", "coprime-residue-sum"],
      cards: [],
      body: String.raw`[[exponent-tracking|Tracking prime exponents]] turns products, powers, divisibility and roots into statements about each exponent separately. The gcd takes the smaller exponent of each prime and the lcm the larger, so [[gcd-lcm-product|their product]] is the product of the two numbers.

A divisor is a choice of exponents, so [[number-of-divisors|the number of divisors]] is the product of the exponents plus one; [[sum-of-divisors|the sum of the divisors]] is a product of one geometric series per prime; and [[product-of-divisors|the product of the divisors]] of $n$ is $n^{d(n)/2}$, since the divisors pair up to multiply to $n$.

A condition on a divisor becomes a rule on each exponent: [[perfect-square-divisors|a square divisor]] has even exponents, an odd divisor has exponent $0$ at $2$. Pairs with [[lcm-pair-counting|a given lcm]] are counted prime by prime: one of the two exponents must equal the exponent in the lcm.

[[floor-multiples|Counting multiples]] with floors gives the exponent of a prime in a factorial and the size of a set defined by divisibility, and [[coprime-residue-sum|the numbers coprime to a modulus]] pair up as $k$ and $n - k$, so their sum is $\tfrac{n\,\varphi(n)}{2}$.`,
      strategies: [
        String.raw`Factor every number into primes before anything else.`,
        String.raw`Work one prime at a time: write each condition as a rule on that prime's exponent.`,
        String.raw`Count divisors with a property by counting the allowed exponents at each prime and multiplying.`,
        String.raw`For gcd and lcm, take the smaller and the larger exponent; when one is given, write the unknowns as multiples of the gcd.`,
        String.raw`To count pairs with a given lcm or gcd, count the allowed pairs of exponents at each prime and multiply.`,
        String.raw`Pair each divisor $d$ of $n$ with $\tfrac nd$ when a product or a symmetric sum over divisors is wanted.`,
        String.raw`For the exponent of a prime in a factorial, add the floors of $\tfrac{n}{p}$, $\tfrac{n}{p^2}$, and so on.`,
        String.raw`To find a gcd involving a variable, subtract multiples of one expression from the other until a constant is left.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the sum of the positive divisors of $72$.`, answer: "195",
        solution: String.raw`Factor: $72 = 2^3 \cdot 3^2$. Every divisor is a term of the product $(1 + 2 + 4 + 8)(1 + 3 + 9)$, each exactly once, so the sum is $15 \cdot 13 = 195$.` },
      { q: String.raw`Find the product of the positive divisors of $36$.`, answer: "10077696",
        solution: String.raw`The $9$ divisors of $36$ pair up as $d$ and $\tfrac{36}{d}$, with product $36$ for each pair, and $6$ is paired with itself. So the product is $36^{9/2} = 6^9 = 10077696$.` },
      { q: String.raw`How many positive divisors of $10!$ are perfect squares?`, answer: "30",
        solution: String.raw`Factor: $10! = 2^8 \cdot 3^4 \cdot 5^2 \cdot 7$. A square divisor has even exponents: $5$ choices at $2$ ($0, 2, 4, 6, 8$), $3$ at $3$, $2$ at $5$ and $1$ at $7$. The count is $5 \cdot 3 \cdot 2 \cdot 1 = 30$.` },
      { q: String.raw`How many divisors of $720$ are odd, and how many are multiples of $6$?`, answer: "6, 16",
        solution: String.raw`Factor: $720 = 2^4 \cdot 3^2 \cdot 5$. An odd divisor has exponent $0$ at $2$: $1 \cdot 3 \cdot 2 = 6$ of them. A multiple of $6$ has exponent at least $1$ at both $2$ and $3$: $4 \cdot 2 \cdot 2 = 16$ of them.` },
      { q: String.raw`How many ordered pairs $(a, b)$ of positive integers have $\operatorname{lcm}(a, b) = 72$?`, answer: "35",
        solution: String.raw`Write $72 = 2^3 \cdot 3^2$. At the prime $2$ the exponents $(x, y)$ of $a$ and $b$ are at most $3$ with the larger equal to $3$: $4^2 - 3^2 = 7$ pairs. At $3$, similarly, $3^2 - 2^2 = 5$ pairs. The primes are independent, so there are $7 \cdot 5 = 35$ pairs.` },
      { q: String.raw`Find the sum of the positive integers up to $100$ that are relatively prime to $100$.`, answer: "2000",
        solution: String.raw`There are $\varphi(100) = 100 \cdot \tfrac12 \cdot \tfrac45 = 40$ of them. If $k$ is coprime to $100$, so is $100 - k$, and the two add to $100$. So the $40$ numbers form $20$ pairs with sum $100$, and the total is $2000$.` },
      { q: String.raw`For how many integers $n$ from $1$ to $100$ is $\gcd(n^2 + 1, n + 1) = 2$?`, answer: "50",
        solution: String.raw`Subtract multiples: $n^2 + 1 - (n - 1)(n + 1) = 2$, so $\gcd(n^2 + 1, n + 1) = \gcd(2, n + 1)$. It is $2$ exactly when $n + 1$ is even, that is, when $n$ is odd: $50$ values.` }
    ],
    problems: [
      "2013 AMC 10B, Problem 24",
      "2012 AMC 10A, Problem 17",
      "1994 AIME, Problem 12"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 10B, Problem 14",
      "2023 AMC 12B, Problem 24",
      "2021 Spring AMC 12A, Problem 25"
    ]
  }
};
