// Learn, AMC Number Theory, chapter M3: divisors and factorials (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M3"] = {
  lessons: {
    "M3.1": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: [],
      body: String.raw`This chapter counts, sums and multiplies the divisors of a number, and counts the primes inside a factorial. Every method starts from the prime factorization.

A divisor of $n = p_1^{a_1}\cdots p_k^{a_k}$ is a choice of exponent for each prime, from $0$ up to $a_i$. So $72 = 2^3 \cdot 3^2$ has $(3 + 1)(2 + 1) = 12$ divisors. The sum of the divisors is a product of one sum per prime: for $12 = 2^2 \cdot 3$ it is $(1 + 2 + 4)(1 + 3) = 28$. Divisors with a condition, such as perfect squares, are counted by restricting the exponents.

A factorial $n! = 1 \cdot 2 \cdots n$ contains many small primes, and the exponent of a prime in it is found by counting multiples. The zeros at the end of $50!$ are its factors of $10$, limited by the factors of $5$: $10$ multiples of $5$ and $2$ of $25$ give $12$ zeros.

Last, consecutive numbers share no common factor, a product of $k$ consecutive numbers is a multiple of $k!$, and a common factor of two expressions divides any combination of them.

The lessons take these ideas in turn: counting divisors (M3.2), summing and multiplying divisors (M3.3), primes in a factorial and trailing zeros (M3.4), and consecutive numbers and gcd tricks (M3.5). The Summary (M3.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many positive divisors does $72$ have?`, answer: "12",
          solution: String.raw`$72 = 2^3 \cdot 3^2$, so a divisor is $2^a3^b$ with $4$ choices for $a$ and $3$ for $b$: $12$ divisors.` },
        { q: String.raw`Find the sum of the positive divisors of $12$.`, answer: "28",
          solution: String.raw`$12 = 2^2 \cdot 3$, so the sum is $(1 + 2 + 4)(1 + 3) = 28$; directly, $1 + 2 + 3 + 4 + 6 + 12 = 28$.` },
        { q: String.raw`How many zeros are at the end of $50!$?`, answer: "12",
          solution: String.raw`Count factors of $5$: $\lfloor 50/5 \rfloor + \lfloor 50/25 \rfloor = 10 + 2 = 12$; factors of $2$ are more plentiful.` }
      ],
      problems: [
        "2010 AMC 10B, Problem 8",
        "2004 AMC 10B, Problem 6",
        "2024 AMC 10A, Problem 5"
      ]
    },
    "M3.2": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["number-of-divisors", "perfect-square-divisors"],
      body: String.raw`How many divisors does $720$ have, and how many of them are perfect squares? What is the smallest number with exactly $6$ divisors? Which numbers have an odd number of divisors? Listing divisors by hand is slow and error-prone; the prime factorization counts them at once.

[[number-of-divisors|The number of divisors]] of $n = p_1^{a_1}p_2^{a_2}\cdots p_k^{a_k}$ is $(a_1 + 1)(a_2 + 1)\cdots(a_k + 1)$, because a divisor chooses an exponent for each prime independently, from $0$ to $a_i$. So $2^4 \cdot 3^2 \cdot 5$ has $5 \cdot 3 \cdot 2 = 30$ divisors. In reverse, a number with exactly $6 = 6 \cdot 1 = 3 \cdot 2$ divisors is $p^5$ or $p^2q$, and the smallest is $2^2 \cdot 3 = 12$. A number has an odd number of divisors exactly when every exponent is even, that is, when it is a perfect square, since otherwise its divisors pair up as $d$ and $\tfrac nd$.

[[perfect-square-divisors|Divisors with a condition]] are counted by restricting the exponents. A perfect square divisor has even exponents: for $720 = 2^4 \cdot 3^2 \cdot 5$, the exponent of $2$ is $0$, $2$ or $4$, of $3$ is $0$ or $2$, and of $5$ is $0$, giving $3 \cdot 2 \cdot 1 = 6$. A cube divisor has exponents that are multiples of $3$; an odd divisor has exponent $0$ at $2$; a divisor that is a multiple of $6$ has exponent at least $1$ at $2$ and at $3$.

Factor the number, write the condition as a rule on each exponent, count the allowed exponents, and multiply. The next lesson sums and multiplies divisors.`,
      related: [
        { card: "multiplicative-functions", note: String.raw`the divisor count is multiplicative, the reason the formula is a product (M6.2).` },
        { card: "factor-pair-counting", note: String.raw`divisors pair up as $d$ and $\tfrac nd$, counting solutions of $xy = n$ (M5.4).` }
      ],
      exercises: [
        { q: String.raw`How many positive divisors does $2^4 \cdot 3^2 \cdot 5$ have?`, answer: "30",
          solution: String.raw`$(4 + 1)(2 + 1)(1 + 1) = 30$.` },
        { q: String.raw`How many positive divisors of $720$ are perfect squares?`, answer: "6",
          solution: String.raw`$720 = 2^4 \cdot 3^2 \cdot 5$. A square divisor has even exponents: $3$ choices at $2$, $2$ at $3$, $1$ at $5$, so $6$ in all.` },
        { q: String.raw`What is the smallest positive integer with exactly $6$ divisors?`, answer: "12",
          solution: String.raw`$6 = 6$ or $3 \cdot 2$, so the number is $p^5$ or $p^2q$. The smallest are $2^5 = 32$ and $2^2 \cdot 3 = 12$, so the answer is $12$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 8",
        "2005 AMC 10A, Problem 15",
        "2011 AMC 12B, Problem 15",
        "2023 AMC 10B, Problem 15"
      ]
    },
    "M3.3": {
      prereq: ["number-of-divisors", "geometric-series"],
      cards: ["sum-of-divisors", "product-of-divisors"],
      body: String.raw`What is the sum of the divisors of $100$? The product of the divisors of $30$? The sum of the odd divisors of $360$? Like counting, summing and multiplying divisors are done from the prime factorization.

[[sum-of-divisors|The sum of the divisors]] of $p_1^{a_1}\cdots p_k^{a_k}$ is $(1 + p_1 + \cdots + p_1^{a_1})\cdots(1 + p_k + \cdots + p_k^{a_k})$, because expanding the product gives every divisor exactly once. For $100 = 2^2 \cdot 5^2$ it is $(1 + 2 + 4)(1 + 5 + 25) = 7 \cdot 31 = 217$. Each factor is a geometric sum, $\tfrac{p^{a+1} - 1}{p - 1}$. Restrictions work as for counting: the odd divisors of $360 = 2^3 \cdot 3^2 \cdot 5$ add to $(1 + 3 + 9)(1 + 5) = 78$, leaving out the factor for $2$.

[[product-of-divisors|The product of the divisors]] of $n$ is $n^{d(n)/2}$, where $d(n)$ is the number of divisors, because the divisors pair up as $d$ and $\tfrac nd$, each pair multiplying to $n$. For $30$, with $8$ divisors, the product is $30^4 = 810000$. For a perfect square the middle divisor $\sqrt n$ pairs with itself, and the formula still holds.

Use the product of geometric sums for a divisor sum, $n^{d(n)/2}$ for a divisor product, and drop or restrict factors for conditions. The next lesson counts primes in factorials.`,
      related: [
        { card: "sigma-parity", note: String.raw`when the divisor sum is odd.` },
        { card: "multiplicative-functions", note: String.raw`the divisor sum is multiplicative (M6.2).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the positive divisors of $100$.`, answer: "217",
          solution: String.raw`$100 = 2^2 \cdot 5^2$, so the sum is $(1 + 2 + 4)(1 + 5 + 25) = 7 \cdot 31 = 217$.` },
        { q: String.raw`Find the product of the positive divisors of $30$.`, answer: "810000",
          solution: String.raw`$30$ has $8$ divisors, which pair into $4$ pairs with product $30$. So the product is $30^4 = 810000$.` },
        { q: String.raw`Find the sum of the odd positive divisors of $360$.`, answer: "78",
          solution: String.raw`$360 = 2^3 \cdot 3^2 \cdot 5$, and the odd divisors use only $3$ and $5$: $(1 + 3 + 9)(1 + 5) = 78$.` }
      ],
      problems: [
        "2021 Spring AMC 10B, Problem 12",
        "2021 Fall AMC 12B, Problem 12",
        "2024 AMC 10B, Problem 8",
        "2013 AMC 10B, Problem 24"
      ]
    },
    "M3.4": {
      prereq: ["floor-multiples", "number-of-divisors"],
      cards: ["legendres-formula", "trailing-zeros"],
      body: String.raw`How many times does $3$ divide $30!$? How many zeros end $125!$? What is the largest power of $6$ dividing $20!$? A factorial is a product of many numbers, and the exponent of a prime in it is a sum of counts of multiples.

[[legendres-formula|Legendre's formula]] says the exponent of a prime $p$ in $n!$ is $\left\lfloor \tfrac np \right\rfloor + \left\lfloor \tfrac{n}{p^2} \right\rfloor + \left\lfloor \tfrac{n}{p^3} \right\rfloor + \cdots$: every multiple of $p$ up to $n$ gives one factor, every multiple of $p^2$ one more, and so on. So $30!$ contains $3$ to the power $10 + 3 + 1 = 14$. For a composite base, take each prime's share: $6 = 2 \cdot 3$, and $20!$ has $18$ factors of $2$ but only $6 + 2 = 8$ of $3$, so the largest power of $6$ dividing it is $6^8$.

[[trailing-zeros|The zeros at the end of $n!$]] count its factors of $10 = 2 \cdot 5$, and since factors of $2$ are always more plentiful, they count the factors of $5$: $125!$ ends in $25 + 5 + 1 = 31$ zeros. The count jumps by more than one at multiples of $25$, which is why some numbers of zeros are skipped.

Count multiples of each power of the prime and add; for a composite base, the scarcest prime decides. The next lesson uses consecutive numbers and gcd tricks.`,
      related: [
        { card: "p-adic-valuation", note: String.raw`the exponent of a prime in any number (M6.2).` },
        { card: "number-of-divisors", note: String.raw`the divisors of a factorial, counted from its prime exponents (M3.2).` }
      ],
      exercises: [
        { q: String.raw`Find the exponent of $3$ in $30!$.`, answer: "14",
          solution: String.raw`By Legendre's formula, $\lfloor 30/3 \rfloor + \lfloor 30/9 \rfloor + \lfloor 30/27 \rfloor = 10 + 3 + 1 = 14$.` },
        { q: String.raw`How many zeros are at the end of $125!$?`, answer: "31",
          solution: String.raw`Count factors of $5$: $25 + 5 + 1 = 31$.` },
        { q: String.raw`What is the largest $k$ such that $6^k$ divides $20!$?`, answer: "8",
          solution: String.raw`The exponents are $10 + 5 + 2 + 1 = 18$ for $2$ and $6 + 2 = 8$ for $3$. Each $6$ needs one of each, so $k = 8$.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 9",
        "2017 AMC 10B, Problem 20",
        "2019 AMC 10B, Problem 14",
        "2015 AMC 10B, Problem 23"
      ]
    },
    "M3.5": {
      prereq: ["euclidean-algorithm"],
      cards: ["factor-out-factorial", "consecutive-product-factorial", "consecutive-coprime", "gcd-substitution"],
      body: String.raw`Some problems are simplified by one structural fact. A sum of factorials shares a large common factor; a product of consecutive numbers is always a multiple of a factorial; consecutive numbers have no common factor; and a common factor of two expressions divides any combination of them. Each fact turns an apparently hard question into a short one.

[[factor-out-factorial|Factor out the smallest factorial]]: $8! + 9! = 8!(1 + 9) = 10 \cdot 8!$, so $\tfrac{8! + 9!}{7!} = 8 \cdot 10 = 80$, and $(n + 1)! + (n + 2)! = n!\,(n + 1)(n + 3)$. Square factorials such as $99! \cdot 100! = (99!)^2 \cdot 100$ are perfect squares exactly when the extra factor is.

[[consecutive-product-factorial|A product of $k$ consecutive integers is a multiple of $k!$]], because the quotient is a binomial coefficient. So $n(n + 1)(n + 2)$ is always a multiple of $6$, and $6$ is the largest number that divides every such product, as $1 \cdot 2 \cdot 3$ shows.

[[consecutive-coprime|Consecutive integers are coprime]]: any common divisor of $n$ and $n + 1$ divides their difference, $1$. So if a product of two consecutive integers is a perfect square, or a fraction $\tfrac{k^2}{k^2 + 1}$ must be simplified, the two parts share no factor. [[gcd-substitution|The gcd of two expressions]] is found by subtracting multiples, as in the Euclidean algorithm: $\gcd(n^2 + 1, n + 1) = \gcd(2, n + 1)$, since $n^2 + 1 - (n - 1)(n + 1) = 2$; it is $2$ for odd $n$ and $1$ for even $n$, so for $n = 7$ it is $\gcd(50, 8) = 2$.

Factor out the smallest factorial, use $k!$ for products of consecutive numbers, and reduce a gcd of expressions to a gcd with a constant. The Summary (M3.6) collects the chapter's strategies.`,
      related: [
        { card: "permutations-combinations", note: String.raw`the binomial coefficient that shows $k!$ divides a product of $k$ consecutive numbers.` },
        { card: "euclidean-algorithm", note: String.raw`subtracting multiples to find a gcd (M1.4).` }
      ],
      exercises: [
        { q: String.raw`Find $\dfrac{8! + 9!}{7!}$.`, answer: "80",
          solution: String.raw`$8! + 9! = 8!(1 + 9) = 10 \cdot 8!$, and $\tfrac{10 \cdot 8!}{7!} = 10 \cdot 8 = 80$.` },
        { q: String.raw`What is the largest integer that divides $n(n + 1)(n + 2)$ for every positive integer $n$?`, answer: "6",
          solution: String.raw`A product of three consecutive integers is a multiple of $3! = 6$. For $n = 1$ the product is $6$ itself, so no larger number divides every such product.` },
        { q: String.raw`Find $\gcd(n^2 + 1, n + 1)$ for $n = 7$, and explain which values it can take for other $n$.`, answer: "2",
          solution: String.raw`$n^2 + 1 - (n - 1)(n + 1) = 2$, so the gcd is $\gcd(2, n + 1)$: $2$ for odd $n$ and $1$ for even $n$. For $n = 7$, $\gcd(50, 8) = 2$.` }
      ],
      problems: [
        "2014 AMC 10A, Problem 8",
        "2019 AMC 10B, Problem 6",
        "2002 AMC 10B, Problem 16",
        "2012 AMC 10A, Problem 17"
      ]
    },
    "M3.6": {
      prereq: ["number-of-divisors", "perfect-square-divisors", "sum-of-divisors", "product-of-divisors", "legendres-formula", "trailing-zeros", "factor-out-factorial", "consecutive-product-factorial", "consecutive-coprime", "gcd-substitution"],
      cards: [],
      body: String.raw`[[number-of-divisors|The number of divisors]] is the product of the exponents plus one, and [[perfect-square-divisors|divisors with a condition]] are counted by restricting each exponent; a number has an odd number of divisors exactly when it is a square.

[[sum-of-divisors|The divisor sum]] is a product of geometric sums, and [[product-of-divisors|the divisor product]] is $n^{d(n)/2}$.

[[legendres-formula|Legendre's formula]] counts a prime in $n!$ by adding the floors of $\tfrac{n}{p^k}$, and [[trailing-zeros|trailing zeros]] count factors of $5$.

[[factor-out-factorial|Sums of factorials]] factor through the smallest one, [[consecutive-product-factorial|products of $k$ consecutive integers]] are multiples of $k!$, [[consecutive-coprime|consecutive integers]] are coprime, and [[gcd-substitution|a gcd of expressions]] reduces by subtracting multiples.`,
      strategies: [
        String.raw`Factor the number before counting, summing or multiplying its divisors.`,
        String.raw`Write a condition on a divisor as a rule on each exponent.`,
        String.raw`For a number with a given count of divisors, factor the count and match exponents.`,
        String.raw`For the exponent of a prime in $n!$, add the floors of $\tfrac{n}{p}$, $\tfrac{n}{p^2}$, and so on.`,
        String.raw`For a composite base in a factorial, the scarcest prime decides.`,
        String.raw`Factor the smallest factorial out of a sum of factorials.`,
        String.raw`Reduce $\gcd(f(n), g(n))$ by subtracting multiples until a constant is left.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many positive divisors does $1000$ have?`, answer: "16",
        solution: String.raw`$1000 = 2^3 \cdot 5^3$, so $(3 + 1)(3 + 1) = 16$.` },
      { q: String.raw`How many positive divisors does $10!$ have?`, answer: "270",
        solution: String.raw`$10! = 2^8 \cdot 3^4 \cdot 5^2 \cdot 7$ by Legendre's formula, so it has $9 \cdot 5 \cdot 3 \cdot 2 = 270$ divisors.` },
      { q: String.raw`Find the sum of the positive divisors of $32$.`, answer: "63",
        solution: String.raw`$1 + 2 + 4 + 8 + 16 + 32 = 63 = 2^6 - 1$.` },
      { q: String.raw`How many zeros are at the end of $2026!$?`, answer: "505",
        solution: String.raw`$405 + 81 + 16 + 3 = 505$ factors of $5$.` },
      { q: String.raw`Find $\dfrac{10! - 9!}{8!}$.`, answer: "81",
        solution: String.raw`$10! - 9! = 9!(10 - 1) = 9 \cdot 9!$, and $\tfrac{9 \cdot 9!}{8!} = 9 \cdot 9 = 81$.` },
      { q: String.raw`How many integers from $1$ to $100$ have exactly three positive divisors?`, answer: "4",
        solution: String.raw`Three divisors means $p^2$ for a prime $p$. Up to $100$: $4, 9, 25, 49$, four numbers.` }
    ],
    problems: [
      "2024 AMC 10B, Problem 22"
    ]
  },
  challenge: {
    problems: [
      "2003 AMC 12A, Problem 23",
      "2022 AMC 10A, Problem 25",
      "2021 Spring AMC 12A, Problem 25",
      "2025 AMC 12B, Problem 23"
    ]
  }
};
