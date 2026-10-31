// Learn, AIME Number Theory, chapter N6: bases, digits and decimals (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["N6"] = {
  lessons: {
    "N6.1": {
      prereq: ["modular-basics"],
      cards: ["base-conversion", "numeral-as-polynomial"],
      body: String.raw`A numeral is a shorthand for a sum of powers of its base: $5623_7$ means $5 \cdot 7^3 + 6 \cdot 7^2 + 2 \cdot 7 + 3$, which is $2026$. Every question about digits in an unusual base comes down to writing the number out this way, and the same view treats the base itself as a variable. This lesson covers both directions of [[base-conversion|base conversion]] and the habit of reading a numeral as a polynomial in its base.

Converting to base ten is the expansion itself: $1234_5 = 125 + 2 \cdot 25 + 3 \cdot 5 + 4 = 194$. Converting from base ten is repeated division, since the last digit of $n$ in base $b$ is its remainder modulo $b$, and dividing by $b$ removes that digit: $2026 = 7 \cdot 289 + 3$, $289 = 7 \cdot 41 + 2$, $41 = 7 \cdot 5 + 6$, and $5 < 7$, so reading the remainders upward gives $5623_7$. The digits must lie between $0$ and $b - 1$, and that constraint is often the key to a problem: the largest number below $2026$ with a given digit sum in base $7$, for instance, is found by lowering one digit and filling everything after it with $6$s.

When the base is unknown, the numeral is a [[numeral-as-polynomial|polynomial in the base]]. So $121_b = b^2 + 2b + 1 = (b + 1)^2$ is a perfect square in every base where it makes sense, and $2021_b - 221_b = (2b^3 + 2b + 1) - (2b^2 + 2b + 1) = 2b^2(b - 1)$, whose divisibility by $3$ is then a question about $b$ modulo $3$. Reducing a polynomial in $b$ modulo a number $m$ uses $b \bmod m$: since $9 \equiv -1 \pmod 5$, a number written in base nine is congruent modulo $5$ to the alternating sum of its digits.

The signal is any number written in a base other than ten, or two bases compared. Write it out as a sum of powers, and use the digit range $0 \le d \le b - 1$ as a constraint.`,
      related: [
        { card: "unknown-base", note: String.raw`problems that solve for the base itself (N6.2).` },
        { card: "divisibility-rules", note: String.raw`the base-ten digit tests come from $10 \equiv 1 \pmod 9$ and $10 \equiv -1 \pmod{11}$, the same reasoning as for base nine modulo $5$.` },
        { card: "digit-manipulation", note: String.raw`place value in base ten, used to reverse, move, or delete digits (N6.3).` }
      ],
      exercises: [
        { q: String.raw`Write $2026$ in base $7$. Give the answer as the base-ten integer formed by its digits.`, answer: "5623",
          solution: String.raw`Repeated division: $2026 = 7 \cdot 289 + 3$, $289 = 7 \cdot 41 + 2$, $41 = 7 \cdot 5 + 6$, and the last quotient is $5$. Reading the remainders from the last to the first, $2026 = 5623_7$. Check: $5 \cdot 343 + 6 \cdot 49 + 2 \cdot 7 + 3 = 1715 + 294 + 14 + 3 = 2026$.` },
        { q: String.raw`What is $1234_5$ in base ten?`, answer: "194",
          solution: String.raw`$1234_5 = 1 \cdot 125 + 2 \cdot 25 + 3 \cdot 5 + 4 = 125 + 50 + 15 + 4 = 194$.` },
        { q: String.raw`In what base $b$ does $132_b$ equal $72$?`, answer: "7",
          solution: String.raw`$132_b = b^2 + 3b + 2 = 72$, so $b^2 + 3b - 70 = 0$, which factors as $(b + 10)(b - 7) = 0$. The base is $7$, and the digits $1, 3, 2$ are all less than $7$.` }
      ],
      problems: ["2025 AMC 10B, Problem 4", "2019 AMC 10B, Problem 12", "2021 Fall AMC 10A, Problem 12"]
    },
    "N6.2": {
      prereq: ["numeral-as-polynomial", "log-rules"],
      cards: ["unknown-base", "digit-count"],
      body: String.raw`Two kinds of problems ask about the size of a numeral rather than its value: equations whose unknown is the base, and questions about how many digits a huge number has. Both are settled by bounds. An equation such as $54_b + 45_b = 121_b$ becomes a polynomial equation in $b$, here $9b + 9 = b^2 + 2b + 1$ with solution $b = 8$, and the digits that appear force the base to be larger than any of them. The number of digits of $2^{100}$ is $31$, read off from a logarithm.

In an [[unknown-base|unknown base]], every numeral is a polynomial in $b$, so the equation is algebra; the extra information is the digit constraint. A digit $5$ in the numeral means $b \ge 6$, which rules out roots of the polynomial that are too small, and often there is only one admissible base. When the same digits are read in two bases, as in $\overline{ab}_7 = \overline{ba}_9$, writing $7a + b = 9b + a$ gives $6a = 8b$, and the digit ranges finish the problem. When a statement holds "for every base", it is a polynomial identity in $b$, and a factorization like $2b^2(b - 1)$ shows exactly when a divisibility holds.

A positive integer $n$ has [[digit-count|$\lfloor \log_{10} n \rfloor + 1$ digits]], because $10^k \le n < 10^{k+1}$ means exactly $k + 1$ digits. With $\log_{10} 2 \approx 0.30103$, $\log_{10} 2^{100} \approx 30.1$, so $2^{100}$ has $31$ digits. Often no logarithm is needed: factoring first, $4^{10} \cdot 5^{25} = 2^{20} \cdot 5^{25} = 5^5 \cdot 10^{20} = 3125 \cdot 10^{20}$, which has $24$ digits. The fractional part of the logarithm decides the leading digit, which is how problems about powers of $2$ or $9$ beginning with a given digit are counted.

The signal is a numeral with an unknown base, or a question about how many digits a power or product has. Turn it into a polynomial or a logarithm, and let the digit range or the powers of ten bound the answer.`,
      related: [
        { card: "log-rules", note: String.raw`$\log_{10}$ of a power or product, used to count digits.` },
        { card: "numeral-as-polynomial", note: String.raw`the polynomial in $b$ that an unknown-base numeral stands for (N6.1).` },
        { card: "bounding-diophantine", note: String.raw`the digit range as a bound that leaves finitely many bases to check ((N5.6)).` }
      ],
      exercises: [
        { q: String.raw`In what base $b$ is $54_b + 45_b = 121_b$?`, answer: "8",
          solution: String.raw`$(5b + 4) + (4b + 5) = b^2 + 2b + 1$, so $b^2 - 7b - 8 = 0$, which factors as $(b - 8)(b + 1) = 0$. So $b = 8$, which exceeds every digit used.` },
        { q: String.raw`How many digits does $2^{100}$ have?`, answer: "31",
          solution: String.raw`$\log_{10} 2^{100} = 100 \log_{10} 2 \approx 30.103$, so $10^{30} < 2^{100} < 10^{31}$ and $2^{100}$ has $31$ digits.` },
        { q: String.raw`How many digits does $4^{10} \cdot 5^{25}$ have?`, answer: "24",
          solution: String.raw`$4^{10} \cdot 5^{25} = 2^{20} \cdot 5^{25} = (2 \cdot 5)^{20} \cdot 5^5 = 3125 \cdot 10^{20}$, which is the four digits of $3125$ followed by twenty zeros: $24$ digits.` }
      ],
      problems: ["2021 Spring AMC 10A, Problem 11", "2023 AMC 10A, Problem 5", "2024 AMC 12B, Problem 6", "2004 AMC 12B, Problem 25", "1990 AIME, Problem 13"]
    },
    "N6.3": {
      prereq: ["modular-basics", "base-conversion"],
      cards: ["digit-sum-carries", "digit-manipulation", "base10-curiosities"],
      body: String.raw`Digits obey arithmetic of their own: a number is congruent to its digit sum modulo $9$, and adding two numbers lowers the digit sum by $9$ for every carry. Those two facts answer most questions about digit sums, from the remainder of $2^{100}$ modulo $9$ to the possible digit sums of $n + 1$ when the digit sum of $n$ is known. Together with place value, they also handle the problems where digits are reversed, moved, or deleted.

Since $10 \equiv 1 \pmod 9$, every power of $10$ is $1$ modulo $9$, so a number is congruent to the sum of its digits modulo $9$, and repeating the digit sum until one digit is left gives the remainder modulo $9$ (with $9$ in place of $0$). So $123456789$, with digit sum $45$, is a multiple of $9$, and the repeated digit sum of $2^{100}$ is $7$, because $2^6 \equiv 1 \pmod 9$ and $2^{100} \equiv 2^4 = 16 \equiv 7$. When numbers are added column by column, each carry turns $10$ in one column into $1$ in the next, losing $9$ from the digit sum; so [[digit-sum-carries|$s(a + b) = s(a) + s(b) - 9c$]], where $c$ is the number of carries. Adding $1$ to a number ending in $k$ nines makes $k$ carries, so if $s(n) = 100$, then $s(n + 1) = 101 - 9k$, and the smallest possibility is $2$, from $n = 1\underbrace{99\ldots9}_{11}$.

[[digit-manipulation|Digit manipulation]] problems are about place value: a two-digit number $\overline{ab}$ is $10a + b$, its reversal is $10b + a$, and their difference is $9(a - b)$. Deleting a final zero divides by $10$; appending a digit $d$ to $x$ gives $10x + d$. Writing every number in its place-value form turns a puzzle about digits into a linear equation. Some decimal patterns are worth recognizing on sight, such as $111111111^2 = 12345678987654321$ and the cyclic number $142857$, whose multiples by $1$ to $6$ rotate its digits; these are the [[base10-curiosities|base-ten curiosities]], and they turn up as the hidden structure of AMC problems more often than one would expect.

The signal is a digit sum, a remainder modulo $9$, a carry, or a number formed by rearranging another's digits. Use congruence modulo $9$ for the sum, count carries for the change, and place value for the rearrangement.`,
      related: [
        { card: "divisibility-rules", note: String.raw`the tests for $3$, $9$, and $11$ that the digit-sum congruence proves.` },
        { card: "palindromes", note: String.raw`digit symmetry, a common digit-manipulation setting (N6.5).` },
        { card: "multiplicative-order", note: String.raw`the cyclic number $142857$ is the period of $\tfrac17$, whose length is the order of $10$ modulo $7$ (N6.4).` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $2^{100}$ is divided by $9$?`, answer: "7",
          solution: String.raw`Modulo $9$ the powers of $2$ run $2, 4, 8, 7, 5, 1$, so $2^6 \equiv 1$. Since $100 = 6 \cdot 16 + 4$, $2^{100} \equiv 2^4 = 16 \equiv 7$. (So the repeated digit sum of $2^{100}$ is $7$.)` },
        { q: String.raw`The digit sum of a positive integer $n$ is $100$. What is the smallest possible digit sum of $n + 1$?`, answer: "2",
          solution: String.raw`If $n$ ends in $k$ nines, adding $1$ makes $k$ carries and $s(n + 1) = 100 + 1 - 9k$. The $k$ nines use $9k \le 100$ of the digit sum, so $k \le 11$, giving $s(n + 1) \ge 101 - 99 = 2$. This is reached by $n = 1$ followed by eleven nines, whose successor is $2$ followed by eleven zeros.` },
        { q: String.raw`A two-digit number exceeds the number formed by reversing its digits by $45$. What is the largest such number?`, answer: "94",
          solution: String.raw`$\overline{ab} - \overline{ba} = (10a + b) - (10b + a) = 9(a - b) = 45$, so $a - b = 5$. The largest choice is $a = 9$, $b = 4$, giving $94$ (and $94 - 49 = 45$).` }
      ],
      problems: ["2021 Spring AMC 10A, Problem 3", "2009 AMC 10A, Problem 5", "2017 AMC 10A, Problem 20", "2007 AMC 10A, Problem 25", "1987 AIME, Problem 1"]
    },
    "N6.4": {
      prereq: ["multiplicative-order", "geometric-series"],
      cards: ["repeating-decimals", "terminating-decimals"],
      body: String.raw`Every fraction has a decimal expansion that either stops or eventually repeats, and number theory says exactly which and how long the repeat is. $\tfrac{7}{80} = 0.0875$ stops after four places because $80 = 2^4 \cdot 5$; $\tfrac17 = 0.\overline{142857}$ repeats every six places because $6$ is the order of $10$ modulo $7$; and $0.\overline{36}$ is exactly $\tfrac{36}{99} = \tfrac4{11}$.

A [[terminating-decimals|decimal terminates]] after $k$ places exactly when the fraction can be written over $10^k$. In lowest terms $\tfrac mn$, that needs $n$ to divide $10^k = 2^k 5^k$, so $n$ may have no prime factors other than $2$ and $5$, and if $n = 2^a 5^b$ the number of places is $\max(a, b)$. Up to $100$ there are $15$ such denominators. Multiplying the numerator and denominator to reach a power of ten is also how a terminating decimal is computed exactly: $\tfrac{7}{80} = \tfrac{7 \cdot 125}{10^4}$.

A block of $k$ digits repeating from the start is a geometric series: $0.\overline{d_1 \cdots d_k} = \tfrac{D}{10^k} + \tfrac{D}{10^{2k}} + \cdots = \tfrac{D}{10^k - 1}$, where $D$ is the block read as a number. So [[repeating-decimals|a repeating block over the same number of nines]] gives the fraction, and $0.\overline{abc} = \tfrac{\overline{abc}}{999}$. Read in reverse, $\tfrac1n$ has a purely repeating decimal of period $k$ exactly when $n$ divides $10^k - 1$, which for $n$ coprime to $10$ happens first at $k$ equal to the order of $10$ modulo $n$ (N3.4). That is why $\tfrac1{41}$ repeats every $5$ digits ($41 \mid 99999$) and $\tfrac1{13}$ every $6$. A denominator with both kinds of factors, such as $\tfrac1{12}$, gives a decimal that runs for a few places before it starts repeating, and the length of that preamble is $\max(a, b)$ for the part $2^a 5^b$.

The signal is a repeating decimal, a question about the length of a period, or a fraction that must terminate. The same reasoning works in any base $k$, with $k^m - 1$ in place of $10^m - 1$.`,
      related: [
        { card: "multiplicative-order", note: String.raw`the period of $\tfrac1n$ is the order of $10$ modulo $n$ (N3.4).` },
        { card: "geometric-series", note: String.raw`the sum $\tfrac{D}{10^k - 1}$ of a repeating block.` },
        { card: "base10-curiosities", note: String.raw`the cyclic number $142857$, which is the period of $\tfrac17$ (N6.3).` }
      ],
      exercises: [
        { q: String.raw`Write $0.\overline{36}$ as a fraction in lowest terms; give its denominator.`, answer: "11",
          solution: String.raw`$0.\overline{36} = \tfrac{36}{99} = \tfrac{4}{11}$, so the denominator is $11$.` },
        { q: String.raw`How many digits are in the repeating block of the decimal for $\tfrac1{41}$?`, answer: "5",
          solution: String.raw`The period is the order of $10$ modulo $41$, which divides $40$. Testing: $10^1, 10^2 = 100 \equiv 18$ are not $1$, and $10^5 - 1 = 99999 = 41 \cdot 2439$, so $10^5 \equiv 1$; since $5$ is prime and $10 \not\equiv 1$, the order is $5$. Indeed $\tfrac1{41} = 0.\overline{02439}$.` },
        { q: String.raw`For how many integers $n$ with $1 \le n \le 100$ does $\tfrac1n$ have a terminating decimal?`, answer: "15",
          solution: String.raw`$n$ must have the form $2^a 5^b$. Up to $100$: $1, 2, 4, 8, 16, 32, 64$, then $5, 10, 20, 40, 80$, then $25, 50, 100$. That is $7 + 5 + 3 = 15$.` }
      ],
      problems: ["2013 AMC 12A, Problem 10", "2022 AMC 10A, Problem 17", "2015 AMC 12A, Problem 15", "2019 AMC 12A, Problem 11", "2016 AMC 12B, Problem 22"]
    },
    "N6.5": {
      prereq: ["digit-manipulation", "divisibility-rules"],
      cards: ["palindromes", "cryptarithms", "calendar-problems"],
      body: String.raw`The last group of digit problems are puzzles in disguise: numbers that read the same both ways, sums where letters stand for digits, and dates that fall on a given weekday. Each one yields to the same move as the rest of the chapter, writing the quantity in place-value form or as a residue, after which the puzzle is a small equation. A four-digit palindrome $\overline{abba}$, for instance, is $1001a + 110b$, so every one of them is a multiple of $11$.

A [[palindromes|palindrome]] is fixed by its first half, which makes counting easy: there are $9 \cdot 10 \cdot 10 = 900$ five-digit palindromes, one for each choice of $a \ne 0$, $b$, and $c$ in $\overline{abcba}$. The place-value form answers divisibility questions: since $1001 = 7 \cdot 11 \cdot 13$, a four-digit palindrome $1001a + 110b$ is a multiple of $7$ exactly when $110b$ is, that is when $b = 0$ or $7$, which gives $18$ of them. Finding the next palindrome after a given number means raising the middle digit, with a rollover when it is $9$.

In a [[cryptarithms|cryptarithm]] each column of the written calculation is a small equation with a carry: in $\overline{AB} + \overline{BA} = 121$, the place-value form $11(A + B) = 121$ gives $A + B = 11$ at once, with $8$ ordered pairs of distinct nonzero digits. The usual order of attack is the leftmost column (which bounds the leading digit) and the columns where a digit plus something equals itself (which forces a $0$ or a carry).

[[calendar-problems|Calendar problems]] are arithmetic modulo $7$. A day $100$ days after a Monday is $100 \equiv 2 \pmod 7$ days later in the week, so a Wednesday. A month of $31$ days is four weeks and three days, so exactly the weekdays of its first three dates occur five times; a common year shifts every date forward one weekday, and a leap year shifts it two.

The signal is a palindrome, letters standing for digits, or a weekday question. Write it in place value or modulo $7$, and the puzzle becomes a short computation.`,
      related: [
        { card: "divisibility-rules", note: String.raw`the tests for $7$, $11$, and $13$ through $1001 = 7 \cdot 11 \cdot 13$.` },
        { card: "digit-manipulation", note: String.raw`place value for numbers built from digits (N6.3).` },
        { card: "modular-basics", note: String.raw`weekdays as residues modulo $7$.` }
      ],
      exercises: [
        { q: String.raw`How many four-digit palindromes are divisible by $7$?`, answer: "18",
          solution: String.raw`$\overline{abba} = 1001a + 110b$, and $7 \mid 1001$, so the condition is $7 \mid 110b$, that is $7 \mid b$: $b = 0$ or $7$. With $9$ choices of $a$, there are $9 \cdot 2 = 18$.` },
        { q: String.raw`In $\overline{AB} + \overline{BA} = 121$, $A$ and $B$ are distinct nonzero digits. How many ordered pairs $(A, B)$ are possible?`, answer: "8",
          solution: String.raw`$(10A + B) + (10B + A) = 11(A + B) = 121$, so $A + B = 11$. The pairs of distinct digits from $1$ to $9$ with sum $11$ are $(2,9), (3,8), (4,7), (5,6)$ and their reversals: $8$ ordered pairs.` },
        { q: String.raw`Today is a Monday. On which day of the week will it be $100$ days from now? Answer with $1$ for Monday, $2$ for Tuesday, and so on up to $7$ for Sunday.`, answer: "3",
          solution: String.raw`$100 = 7 \cdot 14 + 2$, so $100$ days later is $2$ weekdays after Monday: Wednesday, which is $3$.` }
      ],
      problems: ["2020 AMC 10B, Problem 6", "2003 AMC 10A, Problem 11", "2010 AMC 10B, Problem 5", "2010 AMC 12B, Problem 11"]
    }
  },
  review: ["2021 Fall AMC 10B, Problem 1", "2016 AMC 10A, Problem 6", "2022 AMC 10B, Problem 6", "2021 Spring AMC 10A, Problem 8", "2009 AMC 10B, Problem 11",
    "2014 AMC 10B, Problem 10", "2010 AMC 10A, Problem 10", "2010 AMC 10A, Problem 9"]
};
