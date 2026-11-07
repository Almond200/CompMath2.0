// Learn, AMC Number Theory, chapter M1: primes, divisibility, gcd and lcm (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M1"] = {
  lessons: {
    "M1.1": {
      prereq: [],
      cards: [],
      body: String.raw`Divisibility describes when an integer can be divided into equal groups without a remainder. For a positive integer $d$, saying $d$ divides $n$ means that $n=dq$ for some integer $q$. The notation is $d\mid n$. Thus $6\mid42$ because $42=6\cdot7$, while dividing $43$ by $6$ leaves a remainder.

Factoring reverses multiplication. The factorization $360=2^3\cdot3^2\cdot5$ records three copies of the prime $2$, two copies of $3$, and one copy of $5$. A positive divisor can use some or all of these copies, but cannot introduce a different prime or use more copies than are available.

This interpretation explains common divisors and common multiples. A common divisor of $12=2^2\cdot3$ and $18=2\cdot3^2$ can use only the prime copies available in both. Their greatest common divisor is therefore $2\cdot3=6$. A common multiple must contain enough copies for either number, so the least one is $2^2\cdot3^2=36$.

The decimal representation provides a second way to study divisibility. In $4815$, each place value is a power of ten. Because every power of ten has remainder one upon division by nine, the number and its digit sum $18$ have the same remainder. This turns a digit calculation into a divisibility test.

The chapter begins with prime factors, then develops place-value tests and common divisors. It finishes with counting multiples and following periodic schedules. Throughout, distinguish a divisor of a number from a multiple of it, and state whether endpoints or a starting date are included in a count.`,
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
      body: String.raw`A prime is a positive integer greater than one whose only positive divisors are one and itself. A composite positive integer greater than one has a factorization into two smaller positive integers, both greater than one. Splitting composite factors repeatedly must eventually reach primes, because the factors become smaller.

The [[fundamental-theorem-arithmetic|fundamental theorem of arithmetic]] states that the resulting prime factors are unique apart from their order. For example, splitting $360$ as $36\cdot10$ or as $8\cdot45$ ends with the same collection $2,2,2,3,3,5$. Exponents record the multiplicities compactly. The integer one has no prime factors; calling it prime would destroy this uniqueness by permitting arbitrarily many extra factors of one.

To test a positive integer $n\gt1$ for primality, suppose it has a factorization $n=ab$ with $1\lt a\le b$. Then $a^2\le n$, so $a\le\sqrt n$. At least one prime divisor of $a$ is also at most $\sqrt n$. Consequently it is enough to test primes up to and including $\sqrt n$. Including the endpoint catches prime squares such as $49=7^2$.

For $391$, the relevant primes are $2,3,5,7,11,13,17,19$. Division finds $391=17\cdot23$. Both factors are prime, so the largest prime factor is $23$. When factoring by repeated division, the remaining cofactor shrinks. Once the next candidate prime has square greater than that remaining cofactor, any cofactor greater than one must be prime; a remaining cofactor of one contributes no further factor.

[[only-even-prime|Two is the only even prime]], since every larger even integer has the proper divisor two. This separates parity cases in prime sums. Two odd primes have even sum, so two primes totaling the odd number $21$ must be $2$ and $19$. Their product is $38$. The parity condition only supplies a candidate: for total $23$, the required companion $21$ is composite, so no pair of primes works.

Prime exponents also count how many copies of a composite factor fit. In $25^7\cdot8^3=5^{14}2^9$, every factor ten needs one two and one five. Exactly nine such pairs can be formed, leaving $5^5$ unpaired. The number therefore ends in exactly nine decimal zeros.

Some [[recognition-numbers|frequently occurring factorizations]] can be reconstructed from place value. Since $1001=10^3+1=(10+1)(10^2-10+1)=11\cdot91$, it equals $7\cdot11\cdot13$. Also, $2025=45^2=(3^2\cdot5)^2=3^4\cdot5^2$. Recognizing a power or a difference or sum of powers can expose factors before trial division is needed.`,
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
      body: String.raw`Write a decimal integer as $N=d_0+10d_1+100d_2+\cdots$, where $d_0$ is the units digit. A divisibility test follows whenever the place values have simple remainders for the divisor being tested. Digits are useful because their coefficients are powers of ten.

For $2$ and $5$, every term except $d_0$ is divisible by the divisor, so only the units digit matters. For $4$, write $N=100q+r$ with $0\le r\lt100$; the remainder of $N$ modulo four is the remainder of its last two digits $r$. Similarly, the last three digits suffice for eight because $1000$ is divisible by eight. Thus $2345678$ has the same remainder modulo four as $78$, namely two.

For nine, the difference $10^k-1$ is divisible by nine for every nonnegative integer $k$. Subtracting the digit sum from $N$ therefore gives a multiple of nine. The same holds for three. These [[divisibility-rules|place-value divisibility rules]] show that $123456789$, with digit sum $45$, is divisible by nine. If the digit sum is large, the process can be repeated without changing the remainder.

For eleven, powers of ten alternate between remainders one and minus one, since $10=11-1$. The signed digit sum from the units position therefore has the same remainder as $N$. Testing $7A2$ gives $2-A+7=9-A$. As $A$ runs from zero to nine, this expression runs from nine to zero, so its only possible multiple of eleven is zero. Hence $A=9$, and $792=11\cdot72$ verifies the result. Reversing every sign preserves a divisibility test, but would reverse a nonzero remainder.

To test a composite divisor, its prime powers must all be accounted for. Divisibility by eight and nine together is equivalent to divisibility by $72$, because those factors share no prime. Divisibility by four and six instead guarantees divisibility by their least common multiple, twelve. It does not force divisibility by $24$: twelve itself is a counterexample.

[[digit-sum-carries|Carrying explains changes in digit sums]]. Replacing ten units in one column by one unit in the next reduces the sum of the written digits by nine. When adding two numbers, each carry has this effect, including a carry into a new leading column.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" role="img" aria-labelledby="m13-carries-title m13-carries-desc" style="width:100%;max-width:520px;height:auto"><title id="m13-carries-title">Two carries reduce the total digit sum by eighteen</title><desc id="m13-carries-desc">In fifty-eight plus sixty-seven, eight plus seven gives fifteen units and a carry of one ten. Five plus six plus that carry gives twelve tens and a carry of one hundred. The result is one hundred twenty-five. The digit sum falls from twenty-six to eight.</desc><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="23">58 + 67 = 125</text><text x="90" y="55">Hundreds</text><text x="170" y="55">Tens</text><text x="240" y="55">Ones</text><g font-size="14"><text x="90" y="84">1</text><text x="170" y="84">1</text></g><g font-size="25"><text x="170" y="120">5</text><text x="240" y="120">8</text><text x="50" y="158">+</text><text x="170" y="158">6</text><text x="240" y="158">7</text><text x="90" y="206">1</text><text x="170" y="206">2</text><text x="240" y="206">5</text></g></g><path d="M55 172H265" stroke="currentColor" stroke-width="1.5"/><g fill="currentColor" font-size="16"><text x="300" y="119">15 ones → 1 ten</text><text x="300" y="157">12 tens → 1 hundred</text><text x="260" y="246" text-anchor="middle">Digit sum: 26 − 2 × 9 = 8</text></g></svg>

In $58+67=125$, the units column gives $15$, carrying one ten; the tens column then gives $12$, carrying one hundred. The two original digit sums total $13+13=26$, and the result has digit sum $8=26-2\cdot9$. This is an exact count of two carry operations, including the carry created by the earlier one.

If an integer ends in $t$ consecutive nines, adding one changes those digits to zeros and increases the next digit, or creates a new leading one. Its digit sum changes by $1-9t$. For $999\to1000$, the change is $1-27=-26$. These equalities give more information than the fact that digit sums preserve a remainder modulo nine.`,
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
      body: String.raw`For positive integers $a,b$, a common divisor divides each number, and a common multiple is divisible by each number. Prime factorization describes both conditions one prime at a time. If a prime has exponents $u,v$ in the two numbers, a common divisor can use at most $\min(u,v)$ copies, while a common multiple needs at least $\max(u,v)$ copies. A missing prime has exponent zero.

Thus $12=2^2\cdot3$ and $18=2\cdot3^2$ have greatest common divisor six and least common multiple thirty-six. Since $\min(u,v)+\max(u,v)=u+v$, multiplying these two prime-power constructions proves

$$\gcd(a,b)\operatorname{lcm}(a,b)=ab.$$

This is [[gcd-lcm-product|the gcd–lcm product identity]] for two positive integers. It does not extend unchanged to three: $\gcd(2,3,6)\operatorname{lcm}(2,3,6)=6$, whereas $2\cdot3\cdot6=36$.

A gcd can also be found without prime factorization. If $a=qb+r$, then every common divisor of $a,b$ divides $r=a-qb$, and every common divisor of $b,r$ divides $a=qb+r$. The two pairs therefore have exactly the same common divisors. Repeating this reduction is [[euclidean-algorithm|the Euclidean algorithm]].

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 335" role="img" aria-labelledby="m14-euclid-title m14-euclid-desc" style="width:100%;max-width:520px;height:auto"><title id="m14-euclid-title">Euclidean reductions tile a rectangle by progressively smaller squares</title><desc id="m14-euclid-desc">An outer rectangle is one hundred eighty by one hundred eight. A square of side one hundred eight leaves a seventy-two by one hundred eight rectangle. A square of side seventy-two leaves a seventy-two by thirty-six rectangle, filled by two squares of side thirty-six. The gcd is thirty-six.</desc><g fill="currentColor" stroke="currentColor" stroke-width="1.5"><rect x="70" y="50" width="216" height="216" fill-opacity="0.06"/><rect x="286" y="50" width="144" height="144" fill-opacity="0.12"/><rect x="286" y="194" width="72" height="72" fill-opacity="0.20"/><rect x="358" y="194" width="72" height="72" fill-opacity="0.12"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="250" y="29">180</text><text x="45" y="162">108</text><text x="178" y="163">108</text><text x="358" y="128">72</text><text x="322" y="236">36</text><text x="394" y="236">36</text><text x="250" y="301">180 = 108 + 72; 108 = 72 + 36</text><text x="250" y="326">72 = 2 × 36; gcd = 36</text></g></svg>

The rectangle illustrates the reductions $180=108+72$, $108=72+36$, and $72=2\cdot36$. Removing the largest possible squares leaves successively smaller rectangles. The last square size, thirty-six, divides both original side lengths and is their gcd.

For larger numbers, use the divisions directly:

$$1071=2\cdot462+147,\quad462=3\cdot147+21,\quad147=7\cdot21.$$

The last nonzero remainder is $21$. The next remainder is zero, and $\gcd(21,0)=21$, so the gcd of the original numbers is twenty-one. The remainders strictly decrease until zero, which guarantees termination.

To determine an unknown number with gcd six and lcm seventy-two with eighteen, the product identity gives $6\cdot72/18=24$. The resulting pair must still satisfy the specified gcd and lcm; here $\gcd(18,24)=6$ and $\operatorname{lcm}(18,24)=72$, so it does.

[[lcm-common-multiples|All common multiples]] are multiples of the lcm, as their prime exponents meet the same lower bounds. Two events that occur together at time zero and repeat every four and six units therefore next occur together at time twelve. If their starting times differ, the offsets must also be considered: an event at multiples of four cannot coincide with one at times $1+6k$, since the former times are even and the latter odd.`,
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
      body: String.raw`To count multiples of a positive integer $k$ from one through a nonnegative integer $n$, write them as $k,2k,\ldots,mk$. The condition $mk\le n$ allows exactly $m=\lfloor n/k\rfloor$ positive integer coefficients. This proves [[floor-multiples|the floor count for multiples]], including the case of no multiples when $n\lt k$.

For positive integer endpoints $A\le B$, count through $B$ and remove everything through $A-1$:

$$\#\{N:A\le N\le B,\ k\mid N\}
=\left\lfloor\frac Bk\right\rfloor-\left\lfloor\frac{A-1}k\right\rfloor.$$

Using $A-1$ keeps the left endpoint when it is itself a multiple. For $100$ through $500$, the number of multiples of seven is $71-14=57$. Their first and last values are $105$ and $497$, giving the independent arithmetic-sequence count $(497-105)/7+1=57$.

If a count allows either of two divisibility properties, an integer satisfying both appears in both separate counts. From one through one hundred, there are fifty multiples of two and twenty multiples of five. Their ten common multiples are multiples of ten, so the union has $50+20-10=60$ integers. For “multiples of three but not five” through one thousand, remove the multiples of fifteen: $333-66=267$.

[[calendar-problems|Weekdays]] also use division with remainder. Moving forward by seven days returns to the same weekday, so one hundred elapsed days has the same effect as two days. A Monday therefore becomes a Wednesday. A backward shift uses the remainder of a negative displacement; one day before Monday is Sunday.

Count elapsed days rather than the labels of dates. From the first of a month to the next first, exactly the number of days in the starting month elapses. A thirty-one-day month therefore shifts the weekday by three. From one year's date to the next corresponding date, the shift is one or two according to whether the actual interval contains February 29.

For example, January 1, 2024 to January 1, 2025 spans $366$ days, while March 1, 2024 to March 1, 2025 spans $365$. The second interval starts in a leap year but occurs after that year's February 29. In the Gregorian calendar, years divisible by four are leap years except centuries not divisible by four hundred: 1900 was not a leap year, while 2000 was.

Stating the interval and whether the starting day is counted resolves the usual one-day ambiguity before the remainder calculation.`,
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
      body: String.raw`A positive divisor uses prime factors already present in a number. [[fundamental-theorem-arithmetic|Unique prime factorization]] records those factors with multiplicities, and a composite integer must have a prime divisor at most its square root. [[only-even-prime|The exceptional parity of two]] restricts prime sums, but a forced companion still needs to be checked for primality.

[[divisibility-rules|Digit tests]] follow from powers of ten and their remainders. For a composite divisor, account for each required prime power; separate tests for noncoprime factors establish their lcm rather than automatically their product. Carrying changes a digit sum by nine per carry operation.

The gcd uses the smaller prime exponents and the lcm the larger. [[euclidean-algorithm|Remainder reductions]] preserve all common divisors, while [[gcd-lcm-product|the product identity]] connects the two constructions for a pair of positive integers. [[lcm-common-multiples|Repeated schedules]] use the lcm when their starting alignment has been established.

[[floor-multiples|Floor counts]] handle inclusive integer intervals by subtracting the count through the integer before the left endpoint. Combined properties require accounting for their overlap. For [[calendar-problems|calendar calculations]], count the actual elapsed days, including any February 29 in that interval, and reduce the displacement modulo seven.`,
      strategies: [
        String.raw`Use prime exponents for divisors and multiples, or use remainder reductions when a gcd can be found more directly.`,
        String.raw`To test whether a number is prime, try primes only up to its square root.`,
        String.raw`If two primes add to an odd number, one of them is $2$.`,
        String.raw`Use the digit rules for divisibility, and test a composite divisor through its coprime factors.`,
        String.raw`For a gcd without factoring, subtract multiples (the Euclidean algorithm).`,
        String.raw`For schedules that start together, use the lcm; otherwise retain their starting offsets.`,
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
