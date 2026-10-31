// Learn, AMC Number Theory, chapter M1: primes, divisibility, gcd and lcm (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M1"] = {
  lessons: {
    "M1.1": {
      prereq: [],
      cards: [],
      body: String.raw`This chapter is about the building blocks of whole numbers. Its tools are prime factorization, the divisibility rules, the greatest common divisor and least common multiple, and counting multiples.

A prime is a whole number greater than $1$ whose only positive divisors are $1$ and itself: $2, 3, 5, 7, 11, \ldots$. Every whole number greater than $1$ is a product of primes in exactly one way, apart from order: $360 = 2^3 \cdot 3^2 \cdot 5$, with three different primes. This factorization is the key to almost every question about divisors.

Divisibility rules test whether a number is a multiple of $2, 3, 4, 5, 8, 9$ or $11$ by looking at its digits. A number is a multiple of $9$ exactly when its digit sum is: $4815$ has digit sum $18$, so it is a multiple of $9$.

The greatest common divisor (gcd) of two numbers is the largest number dividing both, and the least common multiple (lcm) is the smallest positive number both divide: $\gcd(12, 18) = 6$ and $\operatorname{lcm}(12, 18) = 36$. Their product is the product of the two numbers, $6 \cdot 36 = 216 = 12 \cdot 18$.

Last, the number of multiples of $k$ from $1$ to $n$ is $\left\lfloor \tfrac nk \right\rfloor$, and days of the week repeat every $7$ days.

The lessons take these ideas in turn: primes and prime factorization (M1.2), divisibility rules (M1.3), the gcd and the lcm (M1.4), and counting multiples and calendars (M1.5). The Summary (M1.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many different primes divide $360$?`, answer: "3",
          solution: String.raw`$360 = 2^3 \cdot 3^2 \cdot 5$, so the primes are $2$, $3$ and $5$: three of them.` },
        { q: String.raw`Find the remainder when $4815$ is divided by $9$.`, answer: "0",
          solution: String.raw`A number leaves the same remainder on division by $9$ as its digit sum, $4 + 8 + 1 + 5 = 18$, which is a multiple of $9$. The remainder is $0$.` },
        { q: String.raw`Find $\gcd(12, 18) \cdot \operatorname{lcm}(12, 18)$.`, answer: "216",
          solution: String.raw`$\gcd(12, 18) = 6$ and $\operatorname{lcm}(12, 18) = 36$, with product $216$, which equals $12 \cdot 18$.` }
      ],
      problems: [
        "1993 AJHSME, Problem 3",
        "2014 AMC 8, Problem 8",
        "2013 AMC 8, Problem 10"
      ]
    },
    "M1.2": {
      prereq: [],
      cards: ["fundamental-theorem-arithmetic", "only-even-prime", "recognition-numbers"],
      body: String.raw`Many number theory questions are answered by writing a number as a product of primes. How many zeros end $25^7 \cdot 8^3$? Which numbers in a list are prime? Can an odd number be a sum of two primes in more than one way? The answer to each starts with a factorization.

A prime is a whole number greater than $1$ with exactly two positive divisors, $1$ and itself; $1$ is not prime. [[fundamental-theorem-arithmetic|The fundamental theorem of arithmetic]] says every whole number greater than $1$ factors into primes in exactly one way, apart from order. To factor, divide by $2$, $3$, $5$, $7$, and so on, as long as the prime is at most the square root of what is left; if no such prime divides it, what is left is prime. So $391$ is tested by the primes up to $19$, and $391 = 17 \cdot 23$. Factorizations multiply and divide nicely: $25^7 \cdot 8^3 = 5^{14} \cdot 2^9$, which contains $10^9$ and so ends in $9$ zeros.

[[only-even-prime|The prime $2$ is the only even prime]], and this decides many problems: an odd number that is a sum of two primes must use $2$, since two odd primes add to an even number. So $21 = 2 + 19$ is the only way to write $21$ as a sum of two primes, and $23 = 2 + 21$ fails because $21$ is not prime.

Some numbers are worth knowing by their factorizations, because problems use them on purpose: [[recognition-numbers|$1001 = 7 \cdot 11 \cdot 13$]], $10101 = 3 \cdot 7 \cdot 13 \cdot 37$, $2025 = 45^2 = 3^4 \cdot 5^2$, and $10! = 3628800$. Recognizing them saves a long multiplication or division.

Factor first, test primes only up to the square root, and treat $2$ separately. The next lesson tests divisibility by the digits.`,
      related: [
        { card: "number-of-divisors", note: String.raw`counting divisors from the exponents of the factorization (M3.2).` },
        { card: "trailing-zeros", note: String.raw`zeros at the end of a number count its factors of $10$ (M3.4).` }
      ],
      exercises: [
        { q: String.raw`Write $1001$ as a product of primes, and find the sum of those primes.`, answer: "31",
          solution: String.raw`$1001 = 7 \cdot 143 = 7 \cdot 11 \cdot 13$, and $7 + 11 + 13 = 31$.` },
        { q: String.raw`Two primes add to $21$. What is their product?`, answer: "38",
          solution: String.raw`Two odd primes add to an even number, so one of the primes is $2$, and the other is $19$, which is prime. The product is $38$.` },
        { q: String.raw`What is the largest prime factor of $391$?`, answer: "23",
          solution: String.raw`Test the primes up to $\sqrt{391} \approx 19.8$: $391 = 17 \cdot 23$. The largest prime factor is $23$.` }
      ],
      problems: [
        "1991 AJHSME, Problem 13",
        "1989 AJHSME, Problem 16",
        "2024 AMC 10A, Problem 1",
        "2003 AMC 10B, Problem 14"
      ]
    },
    "M1.3": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["divisibility-rules", "digit-sum-carries"],
      body: String.raw`Is $123456789$ a multiple of $9$? Which digit $A$ makes $7A2$ a multiple of $11$? What remainder does $2345678$ leave on division by $4$? These are answered from the digits without dividing, by the divisibility rules.

[[divisibility-rules|The divisibility rules]] come from writing a number by its place values. Since $10$ is a multiple of $2$ and $5$, only the last digit matters for them; since $100$ is a multiple of $4$ and $1000$ of $8$, the last two or three digits decide divisibility by $4$ and $8$: $2345678$ leaves the same remainder as $78$ on division by $4$, which is $2$. Since $10 = 9 + 1$, every power of $10$ leaves remainder $1$ on division by $3$ and $9$, so a number leaves the same remainder as its digit sum: $123456789$ has digit sum $45$, a multiple of $9$. Since $10 = 11 - 1$, the powers of $10$ alternate between remainders $1$ and $-1$ modulo $11$, so a number is a multiple of $11$ exactly when its alternating digit sum is: $7 - A + 2$ must be a multiple of $11$, so $A = 9$. For a composite divisor such as $72 = 8 \cdot 9$, test each coprime factor.

[[digit-sum-carries|Digit sums and carrying]] are linked: when two numbers are added, the digit sum of the result is the sum of the digit sums minus $9$ for every carry. So the digit sum of a number changes in a known way when $1$ or $2$ is added, which settles questions about how digit sums of neighboring numbers compare.

Test divisibility by the last digits for $2$, $4$, $5$, $8$, by the digit sum for $3$ and $9$, and by the alternating sum for $11$. The next lesson studies common divisors and multiples.`,
      related: [
        { card: "modular-basics", note: String.raw`the rules are statements about remainders (M4.2).` },
        { card: "numeral-as-polynomial", note: String.raw`a number as a sum of place values, the reason the rules work (M2.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $123456789$ is divided by $9$.`, answer: "0",
          solution: String.raw`The digit sum is $1 + 2 + \cdots + 9 = 45$, a multiple of $9$, so the remainder is $0$.` },
        { q: String.raw`Which digit $A$ makes the three-digit number $7A2$ a multiple of $11$?`, answer: "9",
          solution: String.raw`The alternating sum $7 - A + 2 = 9 - A$ must be a multiple of $11$, so $A = 9$; indeed $792 = 11 \cdot 72$.` },
        { q: String.raw`Find the remainder when $2345678$ is divided by $4$.`, answer: "2",
          solution: String.raw`Only the last two digits matter, since $100$ is a multiple of $4$: $78 = 4 \cdot 19 + 2$, so the remainder is $2$.` }
      ],
      problems: [
        "2007 AMC 8, Problem 24",
        "2018 AMC 8, Problem 7",
        "2020 AMC 8, Problem 19",
        "2016 AMC 8, Problem 24"
      ]
    },
    "M1.4": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["euclidean-algorithm", "gcd-lcm-product", "lcm-common-multiples"],
      body: String.raw`Two gears line up again after how many turns? What is the smallest number of marbles that can be shared equally among $12$ or $15$ children? If two numbers have gcd $6$ and lcm $72$, and one is $18$, what is the other? The greatest common divisor and least common multiple answer these.

The greatest common divisor $\gcd(a, b)$ is the largest number dividing both, and the least common multiple $\operatorname{lcm}(a, b)$ is the smallest positive number both divide. From the prime factorizations, the gcd takes the smaller exponent of each prime and the lcm the larger: $180 = 2^2 \cdot 3^2 \cdot 5$ and $594 = 2 \cdot 3^3 \cdot 11$ have gcd $2 \cdot 3^2 = 18$ and lcm $2^2 \cdot 3^3 \cdot 5 \cdot 11 = 5940$.

[[euclidean-algorithm|The Euclidean algorithm]] finds a gcd without factoring, using $\gcd(a, b) = \gcd(b, a - qb)$: $\gcd(1071, 462) = \gcd(462, 147) = \gcd(147, 21) = 21$, since $147 = 7 \cdot 21$. The same idea shows that a common divisor of two numbers divides their difference, which is the standard way to find what can divide two expressions.

[[gcd-lcm-product|The gcd times the lcm is the product of the two numbers]], because together they use each prime's smaller and larger exponents. So if $\gcd = 6$, $\operatorname{lcm} = 72$ and one number is $18$, the other is $\tfrac{6 \cdot 72}{18} = 24$. [[lcm-common-multiples|Common multiples]] are exactly the multiples of the lcm: things that repeat every $4$ and every $6$ steps coincide every $\operatorname{lcm}(4, 6) = 12$ steps, and a number that leaves remainder $2$ on division by $3$, $4$, $5$ and $6$ is $2$ more than a multiple of $60$.

Factor or use the Euclidean algorithm for a gcd, take the lcm for anything that repeats on two schedules, and use $\gcd \cdot \operatorname{lcm} = ab$ to find a missing number. The next lesson counts multiples.`,
      related: [
        { card: "bezouts-identity", note: String.raw`the gcd as a combination $ax + by$, from the Euclidean algorithm (M5.2).` },
        { card: "crt", note: String.raw`conditions on remainders joined into one, through the lcm (M5.2).` }
      ],
      exercises: [
        { q: String.raw`Find $\gcd(1071, 462)$.`, answer: "21",
          solution: String.raw`$1071 - 2 \cdot 462 = 147$, $462 - 3 \cdot 147 = 21$, and $147 = 7 \cdot 21$. So the gcd is $21$.` },
        { q: String.raw`Find $\operatorname{lcm}(4, 6, 10)$.`, answer: "60",
          solution: String.raw`$4 = 2^2$, $6 = 2 \cdot 3$, $10 = 2 \cdot 5$; take the largest power of each prime: $2^2 \cdot 3 \cdot 5 = 60$.` },
        { q: String.raw`Two numbers have gcd $6$ and lcm $72$. One of them is $18$. Find the other.`, answer: "24",
          solution: String.raw`The product of the numbers is $\gcd \cdot \operatorname{lcm} = 432$, so the other is $\tfrac{432}{18} = 24$. Check: $\gcd(18, 24) = 6$ and $\operatorname{lcm}(18, 24) = 72$.` }
      ],
      problems: [
        "2003 AMC 8, Problem 19",
        "2016 AMC 8, Problem 20",
        "2017 AMC 8, Problem 9",
        "2025 AMC 10A, Problem 17"
      ]
    },
    "M1.5": {
      prereq: ["lcm-common-multiples"],
      cards: ["floor-multiples", "calendar-problems"],
      body: String.raw`How many multiples of $7$ lie between $100$ and $500$? How many numbers up to $100$ are even or multiples of $5$? On what day of the week does a date $100$ days away fall? Counting multiples and working with weeks are two uses of division with remainder.

[[floor-multiples|The number of multiples of $k$ from $1$ to $n$]] is $\left\lfloor \tfrac nk \right\rfloor$, the whole part of $\tfrac nk$. For a range from $a$ to $b$, subtract the count up to $a - 1$ from the count up to $b$: there are $\left\lfloor \tfrac{500}{7} \right\rfloor - \left\lfloor \tfrac{99}{7} \right\rfloor = 71 - 14 = 57$ multiples of $7$ from $100$ to $500$. Numbers divisible by both $a$ and $b$ are the multiples of $\operatorname{lcm}(a, b)$, so to count numbers divisible by $2$ or $5$ up to $100$, add $50$ and $20$ and subtract the $10$ multiples of $10$ counted twice: $60$.

[[calendar-problems|Calendar problems]] use the fact that the days of the week repeat every $7$ days, so only the remainder on division by $7$ matters: $100 = 7 \cdot 14 + 2$, so $100$ days after a Monday is a Wednesday. A year has $365 = 7 \cdot 52 + 1$ days, so a date moves one day of the week each year, two in a leap year, and a month of $31$ days moves the next month's dates by $3$.

Count multiples with floors, subtract to count in a range, add and subtract to avoid counting a number twice, and reduce days modulo $7$. The Summary (M1.6) collects the chapter's strategies.`,
      related: [
        { card: "pie", note: String.raw`counting numbers with at least one of several divisibility properties.` },
        { card: "legendres-formula", note: String.raw`counting multiples of each power of a prime to count its factors in $n!$ (M3.4).` }
      ],
      exercises: [
        { q: String.raw`How many multiples of $7$ are there from $100$ to $500$?`, answer: "57",
          solution: String.raw`Up to $500$ there are $\lfloor 500/7 \rfloor = 71$, and up to $99$ there are $14$. So $71 - 14 = 57$ lie from $100$ to $500$.` },
        { q: String.raw`How many integers from $1$ to $100$ are multiples of $2$ or of $5$?`, answer: "60",
          solution: String.raw`There are $50$ multiples of $2$ and $20$ of $5$; the $10$ multiples of $10$ are counted twice. So $50 + 20 - 10 = 60$.` },
        { q: String.raw`Today is a Monday. How many days after a Monday is the day of the week reached $100$ days from now? (Give the number from $0$ to $6$.)`, answer: "2",
          solution: String.raw`$100 = 7 \cdot 14 + 2$, so $100$ days from now is $2$ days of the week after Monday: a Wednesday.` }
      ],
      problems: [
        "1988 AJHSME, Problem 10",
        "2005 AMC 8, Problem 18",
        "2023 AMC 10A, Problem 3",
        "2003 AMC 10A, Problem 15"
      ]
    },
    "M1.6": {
      prereq: ["fundamental-theorem-arithmetic", "only-even-prime", "divisibility-rules", "euclidean-algorithm", "gcd-lcm-product", "lcm-common-multiples", "floor-multiples", "calendar-problems"],
      cards: [],
      body: String.raw`[[fundamental-theorem-arithmetic|Every whole number greater than $1$]] factors into primes in one way; testing primes up to the square root finds the factorization, and [[only-even-prime|$2$ is the only even prime]].

[[divisibility-rules|The divisibility rules]] read the last digits for $2$, $4$, $5$, $8$, the digit sum for $3$ and $9$, and the alternating sum for $11$.

The gcd takes the smaller exponent of each prime and the lcm the larger; [[euclidean-algorithm|the Euclidean algorithm]] finds a gcd by subtracting, [[gcd-lcm-product|their product]] is the product of the two numbers, and [[lcm-common-multiples|common multiples]] are the multiples of the lcm.

[[floor-multiples|Multiples of $k$ up to $n$]] number $\left\lfloor \tfrac nk \right\rfloor$, and [[calendar-problems|days of the week]] are counted modulo $7$.`,
      strategies: [
        String.raw`Factor every number into primes before anything else.`,
        String.raw`To test whether a number is prime, try primes only up to its square root.`,
        String.raw`If two primes add to an odd number, one of them is $2$.`,
        String.raw`Use the digit rules for divisibility, and test a composite divisor through its coprime factors.`,
        String.raw`For a gcd without factoring, subtract multiples (the Euclidean algorithm).`,
        String.raw`For things that repeat on two schedules, use the lcm.`,
        String.raw`Count multiples in a range by subtracting two floor counts.`,
        String.raw`For days of the week, reduce the number of days modulo $7$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Counting repeated factors, how many primes multiply to $2^4 \cdot 3^3 \cdot 5$?`, answer: "8",
        solution: String.raw`$4 + 3 + 1 = 8$ prime factors, counted with repetition.` },
      { q: String.raw`What is the smallest positive number divisible by each of $1, 2, \ldots, 10$?`, answer: "2520",
        solution: String.raw`The lcm takes the largest power of each prime up to $10$: $2^3 \cdot 3^2 \cdot 5 \cdot 7 = 2520$.` },
      { q: String.raw`Find $\gcd(2^{10} - 1, 2^6 - 1)$.`, answer: "3",
        solution: String.raw`$2^{10} - 1 = 1023 = 3 \cdot 11 \cdot 31$ and $2^6 - 1 = 63 = 3^2 \cdot 7$, so the gcd is $3$, which is $2^{\gcd(10, 6)} - 1$.` },
      { q: String.raw`How many integers from $1$ to $1000$ are multiples of $3$ but not of $5$?`, answer: "267",
        solution: String.raw`There are $333$ multiples of $3$, and $66$ of them are multiples of $15$. So $333 - 66 = 267$.` },
      { q: String.raw`The six-digit number $\overline{12A45B}$ is a multiple of $72$. Find the sum of all possible values of $A$.`, answer: "9",
        solution: String.raw`It must be a multiple of $8$ and of $9$. For $8$, the last three digits $\overline{45B}$ must be a multiple of $8$, so $B = 6$ ($456 = 8 \cdot 57$). For $9$, the digit sum $18 + A$ must be a multiple of $9$, so $A = 0$ or $9$. The sum is $9$.` }
    ],
    problems: [
      "1990 AJHSME, Problem 10",
      "2014 AMC 8, Problem 21"
    ]
  },
  challenge: {
    problems: [
      "2003 AMC 12B, Problem 18",
      "2005 AMC 12B, Problem 17",
      "2006 AMC 12B, Problem 14",
      "2003 AMC 12A, Problem 18"
    ]
  }
};
