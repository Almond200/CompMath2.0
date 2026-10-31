// Learn, AMC Number Theory, chapter M1: number theory, primes, divisors and digits (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M1"] = {
  lessons: {
    "M1.1": {
      prereq: [],
      cards: ["fundamental-theorem-arithmetic", "euclidean-algorithm", "gcd-lcm-product", "lcm-common-multiples", "gcd-substitution", "recognition-numbers"],
      body: String.raw`Almost every number theory problem on the AMC 10 starts by factoring into primes. Once $84 = 2^2 \cdot 3 \cdot 7$ and $126 = 2 \cdot 3^2 \cdot 7$ are written out, their greatest common divisor, least common multiple, divisors and every divisibility question can be read off the exponents.

The [[fundamental-theorem-arithmetic|fundamental theorem of arithmetic]] says the prime factorization is unique. The gcd takes the smaller exponent of each prime and the lcm the larger: $\gcd(84, 126) = 2 \cdot 3 \cdot 7 = 42$ and $\operatorname{lcm} = 2^2 \cdot 3^2 \cdot 7 = 252$. Since smaller plus larger is the total, [[gcd-lcm-product|$\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab$]]: here $42 \cdot 252 = 84 \cdot 126$. [[lcm-common-multiples|Common multiples]] are exactly the multiples of the lcm, which is why events that repeat every $a$ and every $b$ days coincide every $\operatorname{lcm}(a, b)$ days.

When numbers are too big to factor, the [[euclidean-algorithm|Euclidean algorithm]] finds the gcd by repeated division, $\gcd(a, b) = \gcd(b, a - kb)$. The same move works on expressions: $\gcd(n + 3, 2n + 1) = \gcd(n + 3, 2n + 1 - 2(n + 3)) = \gcd(n + 3, 5)$. In problems that give the gcd, [[gcd-substitution|write the numbers as multiples of it]]: if $\gcd(a, b) = d$, then $a = dx$ and $b = dy$ with $\gcd(x, y) = 1$, and the problem becomes one about $x$ and $y$.

[[recognition-numbers|Recognizing common numbers]] saves time: $1001 = 7 \cdot 11 \cdot 13$, $2^{10} = 1024$, $111 = 3 \cdot 37$, $10001 = 73 \cdot 137$, and the contest year's factorization is often the key.

Factor first and read everything from the exponents. The next lesson counts and sums divisors.`,
      related: [
        { card: "number-of-divisors", note: String.raw`counting divisors from the exponents (M1.2).` },
        { card: "exponent-tracking", note: String.raw`working one prime at a time (M3.1).` },
        { card: "bezouts-identity", note: String.raw`the gcd as a combination $ax + by$ (M2.3).` }
      ],
      exercises: [
        { q: String.raw`Find $\operatorname{lcm}(84, 126)$.`, answer: "252",
          solution: String.raw`$84 = 2^2 \cdot 3 \cdot 7$ and $126 = 2 \cdot 3^2 \cdot 7$; the lcm takes the larger exponents, $2^2 \cdot 3^2 \cdot 7 = 252$.` },
        { q: String.raw`Find the sum of the prime factors of $1001$.`, answer: "31",
          solution: String.raw`$1001 = 7 \cdot 11 \cdot 13$, and $7 + 11 + 13 = 31$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 1",
        "2018 AMC 10A, Problem 7",
        "2013 AMC 10B, Problem 9",
        "2011 AMC 12B, Problem 5",
        "2005 AMC 12A, Problem 8",
        "2017 AMC 12A, Problem 12",
        "2018 AMC 10B, Problem 23",
        "2018 AMC 12A, Problem 19"
      ]
    },
    "M1.2": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["number-of-divisors", "sum-of-divisors", "product-of-divisors", "perfect-square-divisors"],
      body: String.raw`Divisors are built from the prime factorization: a divisor of $p^aq^b$ is $p^iq^j$ with $0 \le i \le a$ and $0 \le j \le b$. Every divisor count, sum and product follows from this one description.

The [[number-of-divisors|number of divisors]] of $p^aq^br^c$ is $(a + 1)(b + 1)(c + 1)$: $360 = 2^3 \cdot 3^2 \cdot 5$ has $4 \cdot 3 \cdot 2 = 24$. The count is odd exactly when every exponent is even, that is, for perfect squares, because divisors pair up as $d$ and $\tfrac nd$ except for $\sqrt n$. Problems that ask for a number with exactly $k$ divisors work backward: factor $k$ into the possible $(a + 1)(b + 1)\cdots$.

The [[sum-of-divisors|sum of divisors]] multiplies the sums for each prime power: for $36 = 2^2 \cdot 3^2$, $(1 + 2 + 4)(1 + 3 + 9) = 7 \cdot 13 = 91$. The [[product-of-divisors|product of the divisors]] of $n$ is $n^{d(n)/2}$, from the same pairing: the $6$ divisors of $12$ multiply to $12^3 = 1728$.

[[perfect-square-divisors|Perfect-square divisors]] need even exponents: for $3600 = 2^4 \cdot 3^2 \cdot 5^2$ the exponent of $2$ is $0$, $2$ or $4$, and of $3$ and $5$ is $0$ or $2$, so there are $3 \cdot 2 \cdot 2 = 12$. Odd divisors drop the power of $2$, and divisors that are multiples of a given number are counted by dividing it out first.

Factor, then count exponent choices. The next lesson treats divisibility tests and factorials.`,
      related: [
        { card: "multiplicative-functions", note: String.raw`why divisor counts and sums multiply (M3.1).` },
        { card: "factor-pair-counting", note: String.raw`factor pairs as solutions of integer equations (M2.4).` },
        { card: "sigma-parity", note: String.raw`when the divisor sum is odd (M3.1).` }
      ],
      exercises: [
        { q: String.raw`How many positive divisors does $360$ have?`, answer: "24",
          solution: String.raw`$360 = 2^3 \cdot 3^2 \cdot 5$, so $4 \cdot 3 \cdot 2 = 24$.` },
        { q: String.raw`Find the sum of the positive divisors of $36$.`, answer: "91",
          solution: String.raw`$(1 + 2 + 4)(1 + 3 + 9) = 7 \cdot 13 = 91$.` },
        { q: String.raw`How many positive divisors of $3600$ are perfect squares?`, answer: "12",
          solution: String.raw`$3600 = 2^4 \cdot 3^2 \cdot 5^2$. A square divisor has even exponents: $3$ choices for $2$ and $2$ each for $3$ and $5$, so $12$.` }
      ],
      problems: [
        "2008 AMC 10A, Problem 3",
        "2010 AMC 10B, Problem 8",
        "2021 Spring AMC 10B, Problem 12",
        "2005 AMC 10A, Problem 15",
        "2013 AMC 10A, Problem 19",
        "2018 AMC 12B, Problem 14",
        "2017 AMC 12B, Problem 16",
        "2021 Fall AMC 12A, Problem 20"
      ]
    },
    "M1.3": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["divisibility-rules", "floor-multiples", "consecutive-coprime", "legendres-formula", "trailing-zeros", "factor-out-factorial", "consecutive-product-factorial"],
      body: String.raw`Divisibility questions are answered by quick tests, by counting multiples, and, for factorials, by counting how many times each prime appears. These tools decide questions like how many zeros end $100!$ or which digits make a number divisible by $9$.

The [[divisibility-rules|divisibility rules]]: by $2$, $4$, $8$ from the last one, two or three digits; by $3$ or $9$ from the digit sum; by $11$ from the alternating digit sum; by $5$ or $10$ from the last digit. A missing digit in a number that must be divisible by $72 = 8 \cdot 9$ is found by testing $8$ and $9$ separately.

The number of [[floor-multiples|multiples of $k$ from $1$ to $n$]] is $\left\lfloor \tfrac nk \right\rfloor$, so there are $71$ multiples of $7$ up to $500$. Counting these is the basis of [[legendres-formula|Legendre's formula]]: the exponent of a prime $p$ in $n!$ is $\left\lfloor\tfrac np\right\rfloor + \left\lfloor\tfrac n{p^2}\right\rfloor + \cdots$, since multiples of $p^2$ contribute an extra factor, and so on. The exponent of $2$ in $20!$ is $10 + 5 + 2 + 1 = 18$. The number of [[trailing-zeros|trailing zeros]] of $n!$ is the exponent of $5$, since $2$'s are more plentiful: $100!$ ends in $20 + 4 = 24$ zeros.

Factorials simplify by [[factor-out-factorial|factoring out the common factorial]]: $\tfrac{10! + 9!}{8!} = 9 \cdot 10 + 9 = 99$. A [[consecutive-product-factorial|product of $k$ consecutive integers]] is divisible by $k!$, and [[consecutive-coprime|consecutive integers are coprime]], so $n(n + 1)$ is always even and $n$ and $n + 1$ share no prime.

Test with the rules, count multiples with floors, and count prime exponents in factorials. The next lesson moves to bases and digits.`,
      related: [
        { card: "pie", note: String.raw`counting numbers divisible by one of several numbers (R1.2).` },
        { card: "prime-divides-binomial", note: String.raw`primes in binomial coefficients through Legendre (M3.3).` },
        { card: "modular-basics", note: String.raw`divisibility rules as statements about remainders (M2.1).` }
      ],
      exercises: [
        { q: String.raw`How many zeros does $100!$ end with?`, answer: "24",
          solution: String.raw`The exponent of $5$ in $100!$ is $\lfloor 100/5 \rfloor + \lfloor 100/25 \rfloor = 20 + 4 = 24$, and there are more $2$'s, so $24$ zeros.` },
        { q: String.raw`Find the exponent of $2$ in the prime factorization of $20!$.`, answer: "18",
          solution: String.raw`$\lfloor 20/2 \rfloor + \lfloor 20/4 \rfloor + \lfloor 20/8 \rfloor + \lfloor 20/16 \rfloor = 10 + 5 + 2 + 1 = 18$.` }
      ],
      problems: [
        "2016 AMC 10A, Problem 1",
        "2004 AMC 10B, Problem 6",
        "2024 AMC 12A, Problem 4",
        "2020 AMC 12B, Problem 6",
        "2021 Spring AMC 10B, Problem 16",
        "2010 AMC 10B, Problem 21",
        "2017 AMC 10B, Problem 23",
        "2001 AMC 10, Problem 25"
      ]
    },
    "M1.4": {
      prereq: [],
      cards: ["base-conversion", "numeral-as-polynomial", "unknown-base", "digit-count", "digit-sum-carries", "digit-manipulation", "base10-curiosities", "palindromes", "cryptarithms"],
      body: String.raw`A number's digits are its coefficients in powers of the base, and nearly every digit problem is solved by writing that out. Converting between bases, finding an unknown base, counting digits, reversing digits and solving letter puzzles all start from $\overline{abc} = 100a + 10b + c$.

[[base-conversion|Converting between bases]]: $1011_2 = 8 + 2 + 1 = 11$, and to write $2026$ in base $5$, divide repeatedly by $5$ and read the remainders upward: $31101_5$. A [[numeral-as-polynomial|numeral is a polynomial]] in the base, so $\overline{abc}_b = ab^2 + bb + c$, and a problem with an [[unknown-base|unknown base]] becomes a polynomial equation in $b$, with the condition that every digit is less than $b$.

The [[digit-count|number of digits]] of $n$ is $\lfloor\log_{10} n\rfloor + 1$; $2^{100}$ has $31$ digits since $\log_{10} 2 \approx 0.301$. [[digit-manipulation|Digit manipulation]] writes numbers in terms of their digits: reversing a two-digit number changes it by $9(a - b)$, and a three-digit reversal by $99(a - c)$. [[digit-sum-carries|Digit sums and carries]]: adding two numbers, the digit sum of the result is the sum of the digit sums minus $9$ for each carry, which is why digit sums are remembered modulo $9$; $10^{20} - 1$ is twenty $9$'s with digit sum $180$.

[[palindromes|Palindromes]] read the same both ways and are counted by choosing the first half. [[base10-curiosities|Special base-ten numbers]] like repunits $11\ldots1 = \tfrac{10^n - 1}{9}$ factor nicely. [[cryptarithms|Letter puzzles]] are solved column by column from the right, tracking carries, using that a leading digit is not $0$.

Write numbers through their digits and the base, and track carries. The last lesson of the chapter treats decimals and calendars.`,
      related: [
        { card: "log-rules", note: String.raw`logarithms count digits (L9.2).` },
        { card: "modular-basics", note: String.raw`digit sums modulo $9$ (M2.1).` },
        { card: "repeating-decimals", note: String.raw`digits after the decimal point (M1.5).` }
      ],
      exercises: [
        { q: String.raw`Write $1011_2$ in base ten.`, answer: "11",
          solution: String.raw`$1 \cdot 8 + 0 \cdot 4 + 1 \cdot 2 + 1 = 11$.` },
        { q: String.raw`How many digits does $2^{100}$ have?`, answer: "31",
          solution: String.raw`$\log_{10} 2^{100} = 100\log_{10} 2 \approx 30.1$, so $2^{100}$ has $\lfloor 30.1 \rfloor + 1 = 31$ digits.` },
        { q: String.raw`Find the digit sum of $10^{20} - 1$.`, answer: "180",
          solution: String.raw`$10^{20} - 1$ is twenty $9$'s, with digit sum $180$.` }
      ],
      problems: [
        "2017 AMC 10B, Problem 1",
        "2001 AMC 10, Problem 6",
        "2025 AMC 12B, Problem 4",
        "2014 AMC 12A, Problem 6",
        "2007 AMC 12A, Problem 11",
        "2018 AMC 12A, Problem 13",
        "2014 AMC 12A, Problem 16",
        "2020 AMC 12A, Problem 19"
      ]
    },
    "M1.5": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: ["repeating-decimals", "terminating-decimals", "calendar-problems"],
      body: String.raw`Fractions as decimals and dates on a calendar are both questions about remainders in disguise. A fraction terminates or repeats depending on the primes in its denominator, and a weekday depends on a number of days modulo $7$.

A fraction in lowest terms gives a [[terminating-decimals|terminating decimal]] exactly when its denominator has no prime factors other than $2$ and $5$; $\tfrac{3}{40} = 0.075$ terminates after three digits, the larger of the exponents of $2$ and $5$ in $40 = 2^3 \cdot 5$. Otherwise the decimal repeats. [[repeating-decimals|Repeating decimals]] convert back by the rule that a block of $k$ repeating digits is that block over $k$ nines: $0.\overline{36} = \tfrac{36}{99} = \tfrac{4}{11}$. The length of the repeating block of $\tfrac1n$ is the smallest $k$ with $10^k \equiv 1 \pmod n$, so $\tfrac17$ repeats every $6$ digits.

[[calendar-problems|Calendar problems]] count days modulo $7$: $100$ days after a Monday is $100 \equiv 2 \pmod 7$ days later in the week, a Wednesday. A non-leap year has $365 \equiv 1$, so the same date moves one weekday later each year, two after a leap day.

Factor denominators, convert repeating blocks over nines, and reduce day counts modulo $7$. The next chapter studies remainders in general.`,
      related: [
        { card: "multiplicative-order", note: String.raw`the period of a repeating decimal as an order (M3.2).` },
        { card: "modular-basics", note: String.raw`counting modulo $7$ (M2.1).` },
        { card: "geometric-series", note: String.raw`why a repeating block is that block over nines (L6.3).` }
      ],
      exercises: [
        { q: String.raw`Write $0.\overline{36}$ as a fraction in lowest terms $\tfrac mn$ and find $m + n$.`, answer: "15",
          solution: String.raw`$0.\overline{36} = \tfrac{36}{99} = \tfrac{4}{11}$, so $m + n = 15$.` },
        { q: String.raw`Today is Monday. In how many days from today, at most $6$, is the day of the week the same as $100$ days from today?`, answer: "2",
          solution: String.raw`$100 = 7 \cdot 14 + 2$, so $100$ days ahead falls on the same weekday as $2$ days ahead (a Wednesday).` }
      ],
      problems: [
        "2014 AMC 10A, Problem 2",
        "2010 AMC 10B, Problem 5",
        "2010 AMC 10A, Problem 10",
        "2021 Spring AMC 12A, Problem 5",
        "2012 AMC 12A, Problem 9",
        "2013 AMC 12A, Problem 10",
        "2019 AMC 10A, Problem 18",
        "2000 AMC 10, Problem 25"
      ]
    }
  }
};
