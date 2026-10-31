// Learn, AIME Number Theory, chapter N4: valuations and factorial divisibility (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N4"] = {
  lessons: {
    "N4.1": {
      prereq: ["exponent-tracking"],
      cards: [],
      body: String.raw`This chapter measures how many times a prime divides a number. Its tools are the valuation $v_p(n)$, Legendre's formula for factorials, the test for a prime dividing a binomial coefficient, the Lifting the Exponent lemma for $a^n - b^n$, and the facts about $\gcd(a^m - 1, a^n - 1)$.

The valuation $v_p(n)$ is the exponent of the prime $p$ in $n$: $v_2(96) = 5$, since $96 = 2^5 \cdot 3$. Valuations add under multiplication, $v_p(ab) = v_p(a) + v_p(b)$, so the valuation of a long product is the sum of the valuations of its factors. For a sum there is only an inequality, with equality when the two valuations differ.

For a factorial the sum is organized by Legendre's formula: $v_p(n!)$ counts the multiples of $p$ up to $n$, then adds one more for each multiple of $p^2$, and so on. The number of zeros at the end of $n!$ is $v_5(n!)$, since factors of $2$ are always more plentiful: $100!$ ends in $20 + 4 = 24$ zeros. A binomial coefficient is a quotient of factorials, so its valuation is a difference of Legendre sums, which turns out to count the carries when its two lower numbers are added in base $p$.

For a difference of powers there is a sharper tool. When $p$ is an odd prime dividing $a - b$ but not $a$ or $b$, Lifting the Exponent says $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$, with an extra term for $p = 2$. And $\gcd(a^m - 1, a^n - 1) = a^{\gcd(m, n)} - 1$, by the Euclidean algorithm applied to the exponents.

The lessons take these ideas in turn: valuations (N4.2), Legendre's formula and trailing zeros (N4.3), primes dividing binomial coefficients (N4.4), Lifting the Exponent (N4.5), and valuations with bounds (N4.6). The Summary (N4.7) collects the strategies.`,
      exercises: [
        { q: String.raw`Find $v_3(54 \cdot 81)$.`, answer: "7",
          solution: String.raw`Since $54 = 2 \cdot 3^3$ and $81 = 3^4$, the valuations are $3$ and $4$, and valuations add under multiplication: $3 + 4 = 7$.` },
        { q: String.raw`How many zeros are at the end of $100!$?`, answer: "24",
          solution: String.raw`Each zero is a factor $10 = 2 \cdot 5$, and there are more factors of $2$ than of $5$, so the count is $v_5(100!)$. There are $20$ multiples of $5$ up to $100$ and $4$ multiples of $25$, so $v_5(100!) = 20 + 4 = 24$.` },
        { q: String.raw`Find $v_5(25!)$.`, answer: "6",
          solution: String.raw`By Legendre's formula, $v_5(25!) = \lfloor 25/5 \rfloor + \lfloor 25/25 \rfloor = 5 + 1 = 6$: one factor for each of $5, 10, 15, 20, 25$, and a second one for $25$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 6",
        "2001 AMC 10, Problem 12",
        "2013 AMC 12B, Problem 9"
      ]
    },
    "N4.2": {
      prereq: ["exponent-tracking"],
      cards: ["p-adic-valuation"],
      body: String.raw`Many AIME questions ask not what a number is but how many times a prime divides it: how many zeros end $100!$, the largest power of $2$ dividing $3^{100} - 1$, the power of $5$ in a binomial coefficient. That count has a name and a notation. The [[p-adic-valuation|valuation]] $v_p(n)$ is the exponent of the prime $p$ in $n$, so $v_2(40) = 3$ and $v_5(40) = 1$. This chapter is a toolkit for computing valuations of numbers far too large to factor, and this lesson sets out the rules they obey.

Valuations turn multiplication into addition. Since exponents of a prime add when numbers multiply, $v_p(ab) = v_p(a) + v_p(b)$, and so $v_p(a^n) = n\, v_p(a)$ and $v_p(\tfrac ab) = v_p(a) - v_p(b)$ whenever the quotient is an integer. A number $m$ divides $n$ exactly when $v_p(m) \le v_p(n)$ for every prime $p$, which is the exponent bookkeeping of N1 written in this notation.

Sums are the delicate case, and almost every valuation problem turns on them. If $p^k$ divides both $a$ and $b$, it divides $a + b$, so $v_p(a + b) \ge \min(v_p(a), v_p(b))$. When the two valuations are different the inequality is an equality: if $v_p(a) < v_p(b)$, then $a + b = p^{v_p(a)} \left(a' + p^{v_p(b) - v_p(a)} b'\right)$, where $a'$ and $b'$ are the parts of $a$ and $b$ not divisible by $p$; the second term in the bracket is a multiple of $p$ and the first is not, so the bracket is not divisible by $p$. So $10^6 + 64 = 2^6 \cdot 5^6 + 2^6$ has the two terms with equal valuation $6$ and needs a look inside: it is $2^6 (5^6 + 1) = 2^6 \cdot 15626$, and $15626 = 2 \cdot 7813$, so $v_2 = 7$. But $10^5 + 64$ has terms with valuations $5$ and $6$, so its valuation is exactly $5$ without any arithmetic. Equal valuations can cancel upward, as $2^5 \cdot 3 + 2^5 \cdot 5 = 2^8$ shows.

The signal is any question about the highest power of a prime dividing something, the number of trailing zeros, or whether a fraction in lowest terms has a given prime in its denominator. Find the valuation of each piece, and treat a sum by comparing the valuations of its terms first.`,
      related: [
        { card: "exponent-tracking", note: String.raw`the same exponents, used prime by prime for gcd and lcm (N1.2).` },
        { card: "legendres-formula", note: String.raw`the valuation of a factorial (N4.3).` },
        { card: "lte-lemma", note: String.raw`the valuation of $a^n - b^n$, where the terms have equal valuation and cancel upward (N4.5).` }
      ],
      exercises: [
        { q: String.raw`Find $v_2(10^6 + 64)$.`, answer: "7",
          solution: String.raw`Both terms have valuation $6$: $10^6 = 2^6 \cdot 5^6$ and $64 = 2^6$. So $10^6 + 64 = 2^6 (5^6 + 1) = 2^6 \cdot 15626$, and $15626 = 2 \cdot 7813$ with $7813$ odd. Hence $v_2 = 7$.` },
        { q: String.raw`Find $v_5(100^3 + 25)$.`, answer: "2",
          solution: String.raw`$v_5(100^3) = 3 \cdot 2 = 6$ and $v_5(25) = 2$. The valuations differ, so the sum has the smaller one, $2$.` },
        { q: String.raw`Find $v_2(2^5 \cdot 3 + 2^5 \cdot 5)$.`, answer: "8",
          solution: String.raw`Both terms have valuation $5$, so no shortcut applies. The sum is $2^5(3 + 5) = 2^5 \cdot 8 = 2^8$, so the valuation is $8$, larger than either term's.` }
      ],
      problems: ["2009 AMC 10A, Problem 25", "2022 AMC 12A, Problem 23"]
    },
    "N4.3": {
      prereq: ["p-adic-valuation", "floor-multiples"],
      cards: ["legendres-formula", "trailing-zeros", "factor-out-factorial", "consecutive-product-factorial"],
      body: String.raw`Factorials are where valuations are needed most and computed most easily. The number $100!$ has $158$ digits, yet how many times $5$ divides it takes three seconds: $20 + 4 = 24$. That count is [[legendres-formula|Legendre's formula]], $v_p(n!) = \lfloor \tfrac np \rfloor + \lfloor \tfrac n{p^2} \rfloor + \lfloor \tfrac n{p^3} \rfloor + \cdots$, and with it the trailing zeros, the largest power of a prime in a factorial, and the smallest factorial divisible by a given number all become short computations.

The formula counts contributions layer by layer. Each multiple of $p$ up to $n$ contributes one factor of $p$, and there are $\lfloor \tfrac np \rfloor$ of them; each multiple of $p^2$ contributes a second factor, and there are $\lfloor \tfrac n{p^2} \rfloor$ of those; and so on until the powers of $p$ exceed $n$. So $v_2(50!) = 25 + 12 + 6 + 3 + 1 = 47$. The [[trailing-zeros|trailing zeros]] of $n!$ count the factors of $10$, and since factors of $2$ are always more plentiful than factors of $5$, they are just $v_5(n!)$: $100!$ ends in $24$ zeros. Asking for the smallest $n$ with $2024 \mid n!$ is the same reasoning run backward: $2024 = 2^3 \cdot 11 \cdot 23$, and $n!$ contains the prime $23$ only once $n \ge 23$, by which point it has plenty of $2$s and an $11$.

Expressions built from several nearby factorials are best handled by [[factor-out-factorial|factoring out the smallest one]], since $(n + k)! = n!\,(n + 1) \cdots (n + k)$. For instance $(n + 1)! + (n + 2)! = n!\,(n + 1)(1 + (n + 2)) = n!\,(n + 1)(n + 3)$, which turns an equation in factorials into an equation in two consecutive odd or even numbers.

Factorials also explain a classic divisibility fact. The product of any $k$ consecutive integers is a multiple of $k!$, because $n(n + 1) \cdots (n + k - 1) = k! \binom{n + k - 1}{k}$ and a binomial coefficient is an integer; so [[consecutive-product-factorial|three consecutive integers have a product divisible by $6$]], and four by $24$. Legendre's formula proves the same thing directly, since the count of multiples of $p^j$ in any block of $k$ consecutive integers is at least $\lfloor \tfrac k{p^j} \rfloor$.

The signal is a factorial with a question about a prime power, the zeros at its end, or a quotient of factorials that must be an integer.`,
      related: [
        { card: "floor-multiples", note: String.raw`each term of Legendre's formula is a count of multiples (N1.6).` },
        { card: "prime-divides-binomial", note: String.raw`Legendre's formula applied to the three factorials in a binomial coefficient (N4.4).` },
        { card: "perfect-square-divisors", note: String.raw`once the exponents of a factorial are known, its square or cube divisors are counted as in N1.4.` }
      ],
      exercises: [
        { q: String.raw`How many zeros are at the end of $100!$?`, answer: "24",
          solution: String.raw`The zeros count the factors of $10$, and factors of $5$ are scarcer than factors of $2$. By Legendre's formula $v_5(100!) = \lfloor \tfrac{100}{5} \rfloor + \lfloor \tfrac{100}{25} \rfloor = 20 + 4 = 24$.` },
        { q: String.raw`Find $v_2(50!)$.`, answer: "47",
          solution: String.raw`$\lfloor \tfrac{50}{2} \rfloor + \lfloor \tfrac{50}{4} \rfloor + \lfloor \tfrac{50}{8} \rfloor + \lfloor \tfrac{50}{16} \rfloor + \lfloor \tfrac{50}{32} \rfloor = 25 + 12 + 6 + 3 + 1 = 47$.` },
        { q: String.raw`What is the smallest positive integer $n$ such that $2024$ divides $n!$?`, answer: "23",
          solution: String.raw`$2024 = 2^3 \cdot 11 \cdot 23$. The prime $23$ appears in $n!$ only when $n \ge 23$, and $23!$ also contains $11$ and at least three factors of $2$. So $n = 23$.` }
      ],
      problems: ["2019 AMC 10A, Problem 2", "2019 AMC 10B, Problem 6", "2015 AMC 10B, Problem 23", "1992 AIME, Problem 15"]
    },
    "N4.4": {
      prereq: ["legendres-formula"],
      cards: ["prime-divides-binomial"],
      body: String.raw`A binomial coefficient is a quotient of factorials, so the power of a prime in it is a difference of Legendre sums, and that difference turns out to be strikingly small. For a prime $p$ and $0 < k < p$ the coefficient $\binom pk$ is a multiple of $p$, and more generally the power of $p$ dividing $\binom nk$ is never more than the number of digits of $n$ in base $p$. Questions such as the largest two-digit prime factor of $\binom{200}{100}$ come down to checking a single floor sum for each candidate prime.

The first fact is direct. In $\binom pk = \tfrac{p!}{k!\,(p - k)!}$ the numerator contains the prime $p$, and for $0 < k < p$ neither factorial in the denominator does, since both $k$ and $p - k$ are less than $p$. So [[prime-divides-binomial|$p$ divides $\binom pk$]]. One consequence is that $(a + b)^p \equiv a^p + b^p \pmod p$, because every middle term of the binomial expansion is a multiple of $p$.

For general $n$, Legendre's formula gives $v_p\binom nk = \sum_{i \ge 1} \left( \lfloor \tfrac n{p^i} \rfloor - \lfloor \tfrac k{p^i} \rfloor - \lfloor \tfrac{n-k}{p^i} \rfloor \right)$. Each term of this sum is $0$ or $1$, because $\lfloor x + y \rfloor - \lfloor x \rfloor - \lfloor y \rfloor$ is always $0$ or $1$; a term is $1$ exactly when the fractional parts of $\tfrac k{p^i}$ and $\tfrac{n-k}{p^i}$ add to at least $1$, which is when adding $k$ and $n - k$ in base $p$ carries out of that digit. For $\binom{200}{100}$ and a prime $p$ between $10$ and $100$, only the first term can be nonzero, and it is $\lfloor \tfrac{200}{p} \rfloor - 2 \lfloor \tfrac{100}{p} \rfloor$. For $p = 61$ this is $3 - 2 = 1$, while for $67$ and every larger two-digit prime it is $2 - 2 = 0$, so $61$ is the largest two-digit prime factor.

The signal is a binomial coefficient with a question about a prime factor, its power of $2$, or its remainder modulo a prime.`,
      related: [
        { card: "legendres-formula", note: String.raw`the three Legendre sums whose difference is the valuation of $\binom nk$.` },
        { card: "lucas-theorem", note: String.raw`the remainder of $\binom nk$ modulo a prime, read from the base-$p$ digits of $n$ and $k$ (N8).` },
        { card: "fermats-little-theorem", note: String.raw`one proof of Fermat's theorem expands $(a + 1)^p$ and uses that $p$ divides the middle coefficients (N3.3).` }
      ],
      exercises: [
        { q: String.raw`What is the largest two-digit prime factor of $\binom{200}{100}$?`, answer: "61",
          solution: String.raw`For a prime $p$ with $10 < p < 100$, $p^2 > 200$, so $v_p\binom{200}{100} = \lfloor \tfrac{200}{p} \rfloor - 2\lfloor \tfrac{100}{p} \rfloor$. For $p = 97, 89, 83, 79, 73, 71, 67$ this is $2 - 2 = 0$. For $p = 61$ it is $3 - 2 = 1$. So the answer is $61$.` },
        { q: String.raw`Find $v_2\binom{52}{10}$.`, answer: "2",
          solution: String.raw`$v_2(52!) = 26 + 13 + 6 + 3 + 1 = 49$, $v_2(10!) = 5 + 2 + 1 = 8$, and $v_2(42!) = 21 + 10 + 5 + 2 + 1 = 39$. So $v_2\binom{52}{10} = 49 - 8 - 39 = 2$.` },
        { q: String.raw`Find $v_3\binom{100}{50}$.`, answer: "4",
          solution: String.raw`$v_3(100!) = 33 + 11 + 3 + 1 = 48$ and $v_3(50!) = 16 + 5 + 1 = 22$. So $v_3\binom{100}{50} = 48 - 2 \cdot 22 = 4$.` }
      ],
      problems: ["2020 AMC 10B, Problem 19", "1983 AIME, Problem 8"]
    },
    "N4.5": {
      prereq: ["p-adic-valuation", "difference-of-squares"],
      cards: ["lte-lemma", "lte"],
      body: String.raw`Differences of large powers, $a^n - b^n$, are the one kind of sum whose terms have equal valuation and cancel upward, and for them there is an exact formula. The [[lte-lemma|Lifting the Exponent Lemma]] says that for an odd prime $p$ dividing $a - b$ but neither $a$ nor $b$, $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$. So $v_3(4^{81} - 1) = v_3(3) + v_3(81) = 1 + 4 = 5$, with no need to compute a number with fifty digits.

The reason is the factorization $a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1})$. When $p$ divides $a - b$, every term of the second factor is congruent to $a^{n-1}$ modulo $p$, so the second factor is $n\,a^{n-1}$ modulo $p$, which is divisible by $p$ exactly when $p$ divides $n$. That handles one factor of $p$ at a time: raising to a power $n$ coprime to $p$ adds nothing, and raising to the power $p$ adds exactly one more factor of $p$ (the careful check of this step is where $p$ odd is needed). Building $n$ out of these steps gives the formula.

The prime $2$ behaves differently, because the sum $a + b$ joins the difference. For odd $a$ and $b$ and even $n$, $v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1$, so $v_2(3^{100} - 1) = 1 + 2 + 2 - 1 = 4$. For odd $n$ the valuation is just $v_2(a - b)$.

The hypotheses are where [[lte|lifting the exponent]] goes wrong in practice. The prime must divide $a - b$: $2^6 - 1 = 63$ has $v_3 = 2$, but $3$ does not divide $2 - 1$, so the lemma does not apply to the base $2$; it applies after rewriting $2^6 - 1 = 4^3 - 1$, where $3 \mid 4 - 1$ and the formula gives $1 + 1 = 2$. The prime must not divide $a$ or $b$, and $p = 2$ needs its own formula. With those checked, a condition such as $1000 \mid 149^n - 2^n$ splits into one LTE computation for each prime of $1000$ that divides $149 - 2$, and an order computation for the others.

The signal is a huge difference or sum of like powers, and a question about the largest power of a prime dividing it, or the smallest exponent that makes it divisible by a prime power.`,
      related: [
        { card: "multiplicative-order", note: String.raw`for a prime that does not divide $a - b$, first find the order to know when $p$ divides $a^n - b^n$ at all, then lift (N3.4).` },
        { card: "difference-of-squares", note: String.raw`the factorization $a^{2m} - b^{2m} = (a^m - b^m)(a^m + b^m)$ behind the extra $v_2(a + b)$.` },
        { card: "gcd-power-minus-one", note: String.raw`the gcd of two numbers of the form $a^m - 1$ (N4.6).` }
      ],
      exercises: [
        { q: String.raw`Find $v_3(4^{81} - 1)$.`, answer: "5",
          solution: String.raw`$3$ divides $4 - 1 = 3$ and does not divide $4$ or $1$, so LTE gives $v_3(4^{81} - 1^{81}) = v_3(3) + v_3(81) = 1 + 4 = 5$.` },
        { q: String.raw`Find $v_2(3^{100} - 1)$.`, answer: "4",
          solution: String.raw`For $p = 2$ with odd bases and even exponent, $v_2(3^{100} - 1) = v_2(3 - 1) + v_2(3 + 1) + v_2(100) - 1 = 1 + 2 + 2 - 1 = 4$.` },
        { q: String.raw`Find $v_5(6^{125} - 1)$.`, answer: "4",
          solution: String.raw`$5$ divides $6 - 1$ and not $6$, so $v_5(6^{125} - 1) = v_5(5) + v_5(125) = 1 + 3 = 4$.` }
      ],
      problems: ["2014 AMC 10B, Problem 17", "2020 AIME I, Problem 12", "2025 AIME I, Problem 15"]
    },
    "N4.6": {
      prereq: ["euclidean-algorithm", "fermats-little-theorem"],
      cards: ["gcd-power-minus-one", "power-minus-self"],
      body: String.raw`Two families of numbers come up often enough to have their own rules: numbers of the form $a^m - 1$, and the polynomial values $n^k - n$. The first family has an exact gcd, $\gcd(a^m - 1, a^n - 1) = a^{\gcd(m, n)} - 1$, so $\gcd(2^{12} - 1, 2^{18} - 1) = 2^6 - 1 = 63$. The second always has a fixed set of prime factors: $n^5 - n$ is a multiple of $30$ for every integer $n$, and $30$ is the largest number with that property.

The gcd rule comes from running the Euclidean algorithm on the exponents. If $m > n$, then $a^m - 1 = a^{m-n}(a^n - 1) + (a^{m-n} - 1)$, so [[gcd-power-minus-one|$\gcd(a^m - 1, a^n - 1) = \gcd(a^{m-n} - 1, a^n - 1)$]]: subtracting the exponents leaves the gcd unchanged. Repeating the subtraction is the Euclidean algorithm on $m$ and $n$, which ends at $\gcd(m, n)$, and so the gcd ends at $a^{\gcd(m,n)} - 1$. In the language of N3.4 this says that a prime dividing both $a^m - 1$ and $a^n - 1$ has an order dividing both $m$ and $n$.

For the second family, Fermat's Little Theorem gives $n^p \equiv n \pmod p$ for every $n$. If $p - 1$ divides $k - 1$, then $n^k = n \cdot (n^{p-1})^{(k-1)/(p-1)}$, which is $n$ modulo $p$ whether or not $p$ divides $n$. So [[power-minus-self|$n^k - n$ is divisible by every prime $p$ with $p - 1 \mid k - 1$]], and for those primes the divisibility holds for all $n$ at once. For $k = 3$ the primes are $2$ and $3$, so $6 \mid n^3 - n$; for $k = 5$ they are $2, 3, 5$, so $30 \mid n^5 - n$; for $k = 13$ they are $2, 3, 5, 7, 13$, whose product is $2730$. No square of a prime divides $n^k - n$ for every $n$, since $n = p$ gives $p^k - p$, with valuation exactly $1$.

The signal for the first rule is a gcd of two numbers that are powers minus one, or a condition like "$a^m - 1$ divides $a^n - 1$" (which holds exactly when $m \mid n$). The signal for the second is a sum of cubes or fifth powers with a remainder condition: since $6 \mid a^3 - a$, a sum of cubes has the same remainder modulo $6$ as the sum of the bases. The Summary (N4.7) collects the chapter's strategies.`,
      related: [
        { card: "euclidean-algorithm", note: String.raw`the subtraction steps that the exponents follow.` },
        { card: "multiplicative-order", note: String.raw`a prime dividing $a^m - 1$ and $a^n - 1$ has order dividing $\gcd(m, n)$ (N3.4).` },
        { card: "fermats-little-theorem", note: String.raw`$n^p \equiv n$, the source of the second rule (N3.3).` }
      ],
      exercises: [
        { q: String.raw`Find $\gcd(2^{12} - 1, 2^{18} - 1)$.`, answer: "63",
          solution: String.raw`$\gcd(2^{12} - 1, 2^{18} - 1) = 2^{\gcd(12, 18)} - 1 = 2^6 - 1 = 63$.` },
        { q: String.raw`What is the largest integer that divides $n^5 - n$ for every integer $n$?`, answer: "30",
          solution: String.raw`The primes $p$ with $p - 1 \mid 4$ are $2, 3, 5$, so $30 \mid n^5 - n$ for all $n$. No other prime always divides it ($n = 2$ gives $30$ itself), and no prime square always divides it, so the answer is $30$.` },
        { q: String.raw`What is the largest integer that divides $n^{13} - n$ for every integer $n$?`, answer: "2730",
          solution: String.raw`The primes with $p - 1 \mid 12$ are $2, 3, 5, 7, 13$ (from $p - 1 = 1, 2, 4, 6, 12$; $p - 1 = 3$ gives $4$, not prime). Their product is $2 \cdot 3 \cdot 5 \cdot 7 \cdot 13 = 2730$, and as before no other prime and no prime square always divides $n^{13} - n$.` }
      ],
      problems: ["2018 AMC 10B, Problem 16", "2021 AIME II, Problem 9"]
    },
    "N4.7": {
      prereq: ["p-adic-valuation", "legendres-formula", "trailing-zeros", "prime-divides-binomial", "lte", "gcd-power-minus-one", "power-minus-self"],
      cards: [],
      body: String.raw`[[p-adic-valuation|The valuation]] $v_p(n)$ is the exponent of $p$ in $n$; it adds over products, and for sums it is at least the smaller of the two valuations, with equality when they differ.

[[legendres-formula|Legendre's formula]] gives $v_p(n!) = \sum_{k \ge 1} \lfloor n / p^k \rfloor$, and [[trailing-zeros|the trailing zeros]] of $n!$ number $v_5(n!)$. [[prime-divides-binomial|A prime divides a binomial coefficient]] $\binom{m + n}{m}$ to the power equal to the number of carries when $m$ and $n$ are added in base $p$.

[[lte|Lifting the Exponent]] gives $v_p(a^n - b^n) = v_p(a - b) + v_p(n)$ for an odd prime $p$ dividing $a - b$ and neither $a$ nor $b$, and for $p = 2$ and even $n$, $v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1$. [[gcd-power-minus-one|The gcd of $a^m - 1$ and $a^n - 1$]] is $a^{\gcd(m, n)} - 1$, and [[power-minus-self|$a^p - a$]] is always a multiple of $p$.`,
      strategies: [
        String.raw`Write the question as a valuation: "the largest $k$ such that $p^k$ divides", "the number of trailing zeros", "the power of $2$ in".`,
        String.raw`For a product, add the valuations of the factors; group the factors by their own valuation when there are many.`,
        String.raw`For a factorial, use Legendre's formula; for trailing zeros, count factors of $5$.`,
        String.raw`For a binomial coefficient, subtract Legendre sums, or count the carries in base $p$.`,
        String.raw`For $a^n - b^n$, factor it or use Lifting the Exponent, after checking its hypotheses; treat $p = 2$ separately.`,
        String.raw`For $\gcd(a^m - 1, a^n - 1)$, reduce the exponents by the Euclidean algorithm.`,
        String.raw`For the last nonzero digits of a factorial, remove the factors of $10$ first, then work modulo a power of $2$ and a power of $5$ separately.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find $v_2(30!)$.`, answer: "26",
        solution: String.raw`By Legendre's formula, $v_2(30!) = 15 + 7 + 3 + 1 = 26$, from the multiples of $2$, $4$, $8$ and $16$ up to $30$.` },
      { q: String.raw`How many zeros are at the end of $2026!$?`, answer: "505",
        solution: String.raw`Count factors of $5$: $\lfloor 2026/5 \rfloor = 405$, $\lfloor 2026/25 \rfloor = 81$, $\lfloor 2026/125 \rfloor = 16$, $\lfloor 2026/625 \rfloor = 3$. The total is $405 + 81 + 16 + 3 = 505$.` },
      { q: String.raw`Is $\binom{100}{50}$ divisible by $7$?`,
        solution: String.raw`No. In base $7$, $50 = 49 + 1 = 101_7$, and adding $101_7 + 101_7 = 202_7$ involves no carries. The number of carries is the exponent of $7$ in $\binom{100}{50}$, so it is $0$. Legendre's formula agrees: $v_7(100!) = 14 + 2 = 16$ and $v_7(50!) = 7 + 1 = 8$, so $v_7 = 16 - 2 \cdot 8 = 0$.` },
      { q: String.raw`Find the largest $k$ such that $3^k$ divides $\binom{30}{10}$.`, answer: "2",
        solution: String.raw`By Legendre's formula, $v_3(30!) = 10 + 3 + 1 = 14$, $v_3(10!) = 3 + 1 = 4$ and $v_3(20!) = 6 + 2 = 8$. So $v_3\binom{30}{10} = 14 - 4 - 8 = 2$. In base $3$, adding $10 = 101_3$ and $20 = 202_3$ has two carries, as it must.` },
      { q: String.raw`Find $v_2(3^{100} - 1)$.`, answer: "4",
        solution: String.raw`Lifting the Exponent for $p = 2$ and even exponent: $v_2(3^{100} - 1) = v_2(3 - 1) + v_2(3 + 1) + v_2(100) - 1 = 1 + 2 + 2 - 1 = 4$.` },
      { q: String.raw`Find $v_3(2^{54} - 1)$.`, answer: "4",
        solution: String.raw`Write $2^{54} - 1 = 4^{27} - 1$. Here $3$ divides $4 - 1$, so Lifting the Exponent gives $v_3 = v_3(4 - 1) + v_3(27) = 1 + 3 = 4$.` },
      { q: String.raw`Find $\gcd(2^{24} - 1, 2^{36} - 1)$.`, answer: "4095",
        solution: String.raw`The gcd of $2^m - 1$ and $2^n - 1$ is $2^{\gcd(m, n)} - 1$, and $\gcd(24, 36) = 12$, so the answer is $2^{12} - 1 = 4095$.` }
    ],
    problems: [
      "2017 AMC 10B, Problem 20",
      "2006 AIME II, Problem 3",
      "2010 AIME II, Problem 3"
    ]
  },
  challenge: {
    problems: [
      "2010 AMC 10A, Problem 24",
      "2006 AIME I, Problem 4",
      "2006 AMC 12B, Problem 22"
    ]
  }
};
