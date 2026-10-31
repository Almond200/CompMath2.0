// Learn, AMC Number Theory, chapter M2: digits, bases and decimals (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M2"] = {
  lessons: {
    "M2.1": {
      prereq: [],
      cards: [],
      body: String.raw`This chapter studies numbers through the way they are written. Its tools are place value, digit puzzles, bases other than ten, decimal expansions of fractions, and the fractions that lie between two given ones.

A numeral is a sum of place values: $\overline{abc} = 100a + 10b + c$, where $a$, $b$, $c$ are digits from $0$ to $9$ and $a \ne 0$. Writing numbers this way turns digit puzzles into algebra. Reversing a three-digit number, for example, changes it by $\overline{abc} - \overline{cba} = 99(a - c)$, so when $a - c = 3$ the difference is $297$.

Some digit patterns recur: palindromes read the same in both directions, like the year $2112$, and cryptarithms replace digits by letters in an addition or multiplication. Other bases work the same way with powers of the base in place of powers of ten.

A fraction's decimal expansion either ends or repeats. The repeating block of $\tfrac4{37}$ is $108$, because $37 \cdot 27 = 999$, so $\tfrac{4}{37} = \tfrac{108}{999} = 0.\overline{108}$, with a block of length $3$.

The lessons take these ideas in turn: place value and digits (M2.2), digit puzzles (M2.3), other bases (M2.4), repeating and terminating decimals (M2.5), and fractions between two fractions (M2.6). The Summary (M2.7) collects the strategies.`,
      exercises: [
        { q: String.raw`A three-digit number $\overline{abc}$ has $a - c = 3$. Find $\overline{abc} - \overline{cba}$.`, answer: "297",
          solution: String.raw`$\overline{abc} - \overline{cba} = (100a + 10b + c) - (100c + 10b + a) = 99(a - c) = 297$.` },
        { q: String.raw`What is the product of the digits of the first palindrome year after $2026$?`, answer: "4",
          solution: String.raw`A four-digit palindrome year is $\overline{abba}$. After $2026$, the year $2002$ is past, and the next is $2112$, whose digits multiply to $4$.` },
        { q: String.raw`How long is the repeating block of $\tfrac{4}{37}$?`, answer: "3",
          solution: String.raw`$37 \cdot 27 = 999$, so $\tfrac{4}{37} = \tfrac{108}{999} = 0.\overline{108}$, a block of length $3$.` }
      ],
      problems: [
        "2010 AMC 8, Problem 22",
        "2002 AMC 8, Problem 4",
        "1995 AJHSME, Problem 15"
      ]
    },
    "M2.2": {
      prereq: ["exponent-laws"],
      cards: ["numeral-as-polynomial", "digit-manipulation", "digit-count"],
      body: String.raw`How many digits does $2^{10} \cdot 5^{12}$ have? Which two-digit numbers equal four times the sum of their digits? What happens to a number when its digits are reversed? Questions about digits become algebra once a number is written as a sum of place values.

[[numeral-as-polynomial|A numeral is a polynomial in $10$]]: the number with digits $d_k \ldots d_1d_0$ is $d_k10^k + \cdots + d_1 \cdot 10 + d_0$, with each digit from $0$ to $9$ and the first one nonzero. So a two-digit number is $10a + b$, and "four times its digit sum" is $10a + b = 4(a + b)$, that is, $6a = 3b$, $b = 2a$: the numbers are $12$, $24$, $36$, $48$.

[[digit-manipulation|Manipulating digits]] uses the same form: reversing gives $\overline{ab} + \overline{ba} = 11(a + b)$ and $\overline{abc} - \overline{cba} = 99(a - c)$; appending a digit multiplies by $10$ and adds it; and $\overline{abcabc} = 1001 \cdot \overline{abc}$. Numbers like $10^{93} - 93 = 99\ldots907$ are computed by borrowing, which shows their digits directly.

[[digit-count|The number of digits]] of $N$ is $\lfloor \log_{10} N \rfloor + 1$. With powers, pair $2$s with $5$s to make $10$s: $2^{10} \cdot 5^{12} = 10^{10} \cdot 25$, which has $12$ digits.

Write every number by its digits, collect the equation, and use the bounds $0 \le d \le 9$ to finish. The next lesson solves digit puzzles.`,
      related: [
        { card: "divisibility-rules", note: String.raw`the rules come from the place-value form (M1.3).` },
        { card: "base-conversion", note: String.raw`the same form in other bases (M2.4).` }
      ],
      exercises: [
        { q: String.raw`How many digits does $2^{10} \cdot 5^{12}$ have?`, answer: "12",
          solution: String.raw`Pair factors: $2^{10} \cdot 5^{12} = 10^{10} \cdot 5^2 = 25 \cdot 10^{10}$, which is $25$ followed by ten zeros, $12$ digits.` },
        { q: String.raw`How many two-digit numbers are equal to four times the sum of their digits?`, answer: "4",
          solution: String.raw`$10a + b = 4(a + b)$ gives $6a = 3b$, so $b = 2a$ with $b \le 9$: $a = 1, 2, 3, 4$, the numbers $12, 24, 36, 48$.` },
        { q: String.raw`For how many two-digit numbers $\overline{ab}$ (with $b \ne 0$) is $\overline{ab} + \overline{ba} = 99$?`, answer: "8",
          solution: String.raw`$\overline{ab} + \overline{ba} = 11(a + b) = 99$, so $a + b = 9$. With $a$ and $b$ from $1$ to $9$, $a$ runs from $1$ to $8$: eight numbers.` }
      ],
      problems: [
        "1993 AJHSME, Problem 20",
        "2001 AMC 8, Problem 25",
        "2023 AMC 10A, Problem 5",
        "2002 AMC 12B, Problem 15"
      ]
    },
    "M2.3": {
      prereq: ["numeral-as-polynomial"],
      cards: ["palindromes", "cryptarithms", "base10-curiosities"],
      body: String.raw`Digit puzzles ask which digits fit a pattern: palindromes that read the same both ways, additions in which letters stand for digits, and numbers like $111111111^2$ whose digits form a pattern. They are solved by place value, by the carries in each column, and by counting choices for the free digits.

[[palindromes|A palindrome]] is determined by its first half: a four-digit palindrome $\overline{abba}$ has $9$ choices for $a$ and $10$ for $b$, so there are $90$, and every four-digit palindrome is $1001a + 110b$, a multiple of $11$. Count palindromes by counting first halves.

[[cryptarithms|In a cryptarithm]], letters stand for digits, usually different letters for different digits. Work column by column from the right, tracking carries, and use the size of the sum: if $\overline{AB} + \overline{BA} = 121$, then $11(A + B) = 121$, so $A + B = 11$, and the pairs $(2, 9)$ through $(9, 2)$ give eight solutions. A leading digit cannot be $0$, and a carry into a new column is at most $1$ for a sum of two numbers.

[[base10-curiosities|Some numbers have patterns worth knowing]]: $111111^2 = 12345654321$, $142857 \cdot 7 = 999999$, and $1001 = 7 \cdot 11 \cdot 13$ makes $\overline{abcabc}$ a multiple of $7$, $11$ and $13$. Squares of repunits show the digits rising and falling until carries begin.

Count palindromes by their first halves, solve cryptarithms column by column with carries, and recognize the classic patterns. The next lesson moves to other bases.`,
      related: [
        { card: "digit-manipulation", note: String.raw`the algebra of place values behind every puzzle (M2.2).` },
        { card: "casework-method", note: String.raw`splitting a cryptarithm by the possible carries.` }
      ],
      exercises: [
        { q: String.raw`How many four-digit palindromes are there?`, answer: "90",
          solution: String.raw`A four-digit palindrome $\overline{abba}$ is fixed by $a$ (from $1$ to $9$) and $b$ (from $0$ to $9$): $90$ of them.` },
        { q: String.raw`How many two-digit numbers $\overline{AB}$ with nonzero digits satisfy $\overline{AB} + \overline{BA} = 121$?`, answer: "8",
          solution: String.raw`$11(A + B) = 121$, so $A + B = 11$, with $A$ and $B$ from $2$ to $9$: $(2, 9), (3, 8), \ldots, (9, 2)$, eight numbers.` },
        { q: String.raw`Find the sum of the digits of $111111^2$.`, answer: "36",
          solution: String.raw`$111111^2 = 12345654321$, whose digits add to $1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1 = 36$.` }
      ],
      problems: [
        "1986 AJHSME, Problem 8",
        "1988 AJHSME, Problem 25",
        "2003 AMC 8, Problem 14",
        "2009 AMC 10A, Problem 5",
        "2003 AMC 10A, Problem 11"
      ]
    },
    "M2.4": {
      prereq: ["numeral-as-polynomial"],
      cards: ["base-conversion", "unknown-base"],
      body: String.raw`Numbers can be written in any base, not only ten. What is $2026$ in base $5$? In which base is $121$ equal to $49$? What is $1011_2 + 111_2$? Each is answered by reading the numeral as a sum of powers of its base.

In base $b$, each place is worth a power of $b$ and the digits run from $0$ to $b - 1$: $121_b = b^2 + 2b + 1$, and $1011_2 = 8 + 2 + 1 = 11$. [[base-conversion|To convert to base $b$]], divide by $b$ repeatedly and read the remainders from the last to the first: $2026 = 5 \cdot 405 + 1$, $405 = 5 \cdot 81 + 0$, $81 = 5 \cdot 16 + 1$, $16 = 5 \cdot 3 + 1$, $3 = 5 \cdot 0 + 3$, so $2026 = 31101_5$. To convert from base $b$, expand the powers. Arithmetic in another base is easiest done by converting to base ten: $1011_2 + 111_2 = 11 + 7 = 18$.

[[unknown-base|When the base is unknown]], write the numeral as a polynomial in $b$ and solve: $121_b = (b + 1)^2 = 49$ gives $b = 6$. Every digit must be less than the base, which bounds the base from below, and the number of digits bounds it too: a three-digit numeral in base $b$ is at least $b^2$ and less than $b^3$.

Read every numeral as a polynomial in its base, convert by repeated division, and use the digit bounds for an unknown base. The next lesson turns to decimals.`,
      related: [
        { card: "digit-count", note: String.raw`the number of digits in base $b$ is $\lfloor \log_b N \rfloor + 1$ (M2.2).` },
        { card: "repeating-decimals", note: String.raw`repeating expansions work the same way in any base (M2.5).` }
      ],
      exercises: [
        { q: String.raw`Write $2026$ in base $5$, and find the sum of its digits.`, answer: "6",
          solution: String.raw`Repeated division by $5$ gives the remainders $1, 0, 1, 1, 3$, so $2026 = 31101_5$. Check: $3 \cdot 625 + 1 \cdot 125 + 1 \cdot 25 + 0 + 1 = 2026$. The digits add to $6$.` },
        { q: String.raw`In what base $b$ is $121_b = 49$?`, answer: "6",
          solution: String.raw`$121_b = b^2 + 2b + 1 = (b + 1)^2 = 49$, so $b = 6$, larger than every digit.` },
        { q: String.raw`Find $1011_2 + 111_2$ in base ten.`, answer: "18",
          solution: String.raw`$1011_2 = 11$ and $111_2 = 7$, so the sum is $18$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 4",
        "2003 AMC 10A, Problem 20",
        "2024 AMC 10A, Problem 18"
      ]
    },
    "M2.5": {
      prereq: ["geometric-series", "fundamental-theorem-arithmetic"],
      cards: ["repeating-decimals", "terminating-decimals"],
      body: String.raw`Every fraction has a decimal expansion that either stops or repeats. Which fraction is $0.\overline{27}$? How many digits does $\tfrac{7}{40}$ have after the decimal point? How long is the repeating block of $\tfrac17$? The answers depend only on the denominator's prime factors.

[[terminating-decimals|A fraction in lowest terms terminates]] exactly when its denominator has no prime factors other than $2$ and $5$, because then it can be written over a power of $10$: $\tfrac{7}{40} = \tfrac{7 \cdot 25}{1000} = 0.175$, with $3$ digits, one for each power of $10$ needed. The number of digits is the larger of the exponents of $2$ and $5$ in the denominator.

[[repeating-decimals|A repeating decimal]] is a fraction with denominator $99\ldots9$: if the block of length $k$ repeats from the start, the number is the block over $10^k - 1$. So $0.\overline{27} = \tfrac{27}{99} = \tfrac3{11}$. To convert, multiply by $10^k$ and subtract: with $x = 0.\overline{27}$, $100x - x = 27$. A delayed repeat is handled by shifting first. In the other direction, the block length of $\tfrac1n$ (with $n$ coprime to $10$) is the smallest $k$ with $n \mid 10^k - 1$: for $n = 7$, $999999 = 7 \cdot 142857$ and no shorter $99\ldots9$ works, so $\tfrac17 = 0.\overline{142857}$, a block of length $6$.

Look at the denominator's primes to decide whether a decimal ends, and write a repeating block over $99\ldots9$. The next lesson finds fractions between two fractions.`,
      related: [
        { card: "multiplicative-order", note: String.raw`the block length is the order of $10$ modulo the denominator (M6.4).` },
        { card: "geometric-series", note: String.raw`a repeating decimal is an infinite geometric sum.` }
      ],
      exercises: [
        { q: String.raw`Write $0.\overline{27}$ as a fraction $\tfrac mn$ in lowest terms, and find $m + n$.`, answer: "14",
          solution: String.raw`$0.\overline{27} = \tfrac{27}{99} = \tfrac{3}{11}$, so $m + n = 14$.` },
        { q: String.raw`How many digits does $\tfrac{7}{40}$ have after the decimal point?`, answer: "3",
          solution: String.raw`$40 = 2^3 \cdot 5$, so multiply top and bottom by $25$: $\tfrac{175}{1000} = 0.175$, three digits.` },
        { q: String.raw`How long is the repeating block of $\tfrac17$?`, answer: "6",
          solution: String.raw`The smallest number of the form $99\ldots9$ divisible by $7$ is $999999 = 7 \cdot 142857$, so $\tfrac17 = 0.\overline{142857}$, a block of length $6$.` }
      ],
      problems: [
        "2021 Spring AMC 10A, Problem 8",
        "2002 AMC 12A, Problem 20",
        "2013 AMC 12A, Problem 10",
        "2015 AMC 12A, Problem 15"
      ]
    },
    "M2.6": {
      prereq: ["gcd-lcm-product"],
      cards: ["farey-sequences"],
      body: String.raw`Which fraction with the smallest denominator lies between $\tfrac35$ and $\tfrac23$? Which line through a lattice point has the largest slope avoiding all lattice points in a range? These questions are about fractions between two fractions, and the Farey sequences answer them.

[[farey-sequences|The Farey sequence]] of order $n$ lists the fractions in $[0, 1]$ in lowest terms with denominator at most $n$, in increasing order. Two fractions $\tfrac ab \lt \tfrac cd$ are neighbors in some Farey sequence exactly when $bc - ad = 1$, and the fraction with the smallest denominator between neighbors is their mediant $\tfrac{a + c}{b + d}$. Since $5 \cdot 2 - 3 \cdot 3 = 1$, the fractions $\tfrac35$ and $\tfrac23$ are neighbors, and the simplest fraction between them is $\tfrac{3 + 2}{5 + 3} = \tfrac58$. Between $\tfrac13$ and $\tfrac12$ it is $\tfrac25$. The difference of neighbors is $\tfrac{1}{bd}$: $\tfrac58 - \tfrac35 = \tfrac{1}{40}$.

The fractions with denominator at most $n$ appear as slopes of lines from the origin to lattice points, so questions about lattice points on lines, or about slopes avoiding lattice points, become questions about Farey neighbors.

Check whether two fractions are neighbors with $bc - ad = 1$, and take mediants to find the simplest fraction between them. The Summary (M2.7) collects the chapter's strategies.`,
      related: [
        { card: "lattice-points-gcd", note: String.raw`lattice points on a segment, counted by a gcd.` },
        { card: "slope-to-a-point", note: String.raw`a fraction as the slope from the origin to a point.` }
      ],
      exercises: [
        { q: String.raw`What fraction with the smallest possible denominator lies strictly between $\tfrac35$ and $\tfrac23$? Give it in lowest terms.`, answer: "5/8",
          solution: String.raw`Since $5 \cdot 2 - 3 \cdot 3 = 1$, the two are Farey neighbors, and the simplest fraction between them is the mediant $\tfrac{3 + 2}{5 + 3} = \tfrac58$.` },
        { q: String.raw`What fraction with the smallest possible denominator lies strictly between $\tfrac13$ and $\tfrac12$?`, answer: "2/5",
          solution: String.raw`$3 \cdot 1 - 1 \cdot 2 = 1$, so they are neighbors, and the mediant $\tfrac25$ is the simplest fraction between them; no fraction with denominator $3$ or $4$ lies strictly between.` },
        { q: String.raw`Find $\tfrac58 - \tfrac35$.`, answer: "1/40",
          solution: String.raw`$\tfrac{25 - 24}{40} = \tfrac{1}{40}$, which is $\tfrac{1}{8 \cdot 5}$, as for any Farey neighbors.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 17",
        "2011 AMC 12B, Problem 19"
      ]
    },
    "M2.7": {
      prereq: ["numeral-as-polynomial", "digit-manipulation", "digit-count", "palindromes", "cryptarithms", "base-conversion", "unknown-base", "repeating-decimals", "terminating-decimals", "farey-sequences"],
      cards: [],
      body: String.raw`[[numeral-as-polynomial|A numeral is a sum of place values]], which turns [[digit-manipulation|digit manipulations]] such as reversals into algebra, and [[digit-count|the number of digits]] is $\lfloor \log_{10} N \rfloor + 1$.

[[palindromes|Palindromes]] are counted by their first halves, and [[cryptarithms|cryptarithms]] are solved column by column with carries.

[[base-conversion|Converting bases]] is repeated division, and [[unknown-base|an unknown base]] is found by solving a polynomial with the digits below the base.

[[terminating-decimals|A fraction terminates]] exactly when its reduced denominator has only the primes $2$ and $5$, and otherwise [[repeating-decimals|repeats]], with the block over $99\ldots9$. [[farey-sequences|Farey neighbors]] satisfy $bc - ad = 1$, and the simplest fraction between them is the mediant.`,
      strategies: [
        String.raw`Write a number by its digits, $100a + 10b + c$, and use $0 \le d \le 9$.`,
        String.raw`Pair $2$s with $5$s to count the digits of a product.`,
        String.raw`Count palindromes by their first halves.`,
        String.raw`Solve a cryptarithm column by column from the right, tracking carries.`,
        String.raw`Read a numeral in base $b$ as a polynomial in $b$; every digit is less than $b$.`,
        String.raw`Write a repeating block over $99\ldots9$, and check the denominator's primes to see whether a decimal ends.`,
        String.raw`For the simplest fraction between two neighbors, take the mediant.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many digits does $4^{10} \cdot 5^{15}$ have?`, answer: "17",
        solution: String.raw`$4^{10} \cdot 5^{15} = 2^{20} \cdot 5^{15} = 2^5 \cdot 10^{15} = 32 \cdot 10^{15}$, which has $17$ digits.` },
      { q: String.raw`How many three-digit numbers have digits adding to $3$?`, answer: "6",
        solution: String.raw`With first digit $a \ge 1$: $a = 1$ leaves $2$ for two digits, $3$ ways ($102$, $111$, $120$); $a = 2$ leaves $1$, $2$ ways; $a = 3$ leaves $0$, $1$ way. Total $6$.` },
      { q: String.raw`How long is the repeating block of $\tfrac1{13}$?`, answer: "6",
        solution: String.raw`$999999 = 13 \cdot 76923$, and no shorter $99\ldots9$ is a multiple of $13$ ($9, 99, 999, 9999, 99999$ are not). So $\tfrac{1}{13} = 0.\overline{076923}$, a block of length $6$.` },
      { q: String.raw`Write $0.1\overline{3}$ as a fraction in lowest terms.`, answer: "2/15",
        solution: String.raw`$0.1\overline{3} = \tfrac{1}{10} + \tfrac{1}{10}\cdot\tfrac39 = \tfrac{1}{10} + \tfrac{1}{30} = \tfrac{4}{30} = \tfrac{2}{15}$.` },
      { q: String.raw`Write $345_6$ in base ten.`, answer: "137",
        solution: String.raw`$3 \cdot 36 + 4 \cdot 6 + 5 = 108 + 24 + 5 = 137$.` },
      { q: String.raw`Every six-digit number of the form $\overline{abcabc}$ is divisible by a certain prime larger than $11$. Which?`, answer: "13",
        solution: String.raw`$\overline{abcabc} = 1001 \cdot \overline{abc}$, and $1001 = 7 \cdot 11 \cdot 13$. The prime larger than $11$ is $13$.` }
    ],
    problems: [
      "1991 AJHSME, Problem 20",
      "2006 AMC 8, Problem 24"
    ]
  },
  challenge: {
    problems: [
      "2005 AMC 10B, Problem 24",
      "2007 AMC 10A, Problem 22",
      "2004 AMC 12B, Problem 25",
      "2004 AMC 12A, Problem 25"
    ]
  }
};
