// Learn, AMC Number Theory, chapter M2: digits, bases and decimals (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M2"] = {
  lessons: {
    "M2.1": {
      prereq: [],
      cards: [],
      body: String.raw`An integer and the numeral used to write it are different objects. The integer eleven can be written $11$ in decimal or $1011_2$ in binary. The value is unchanged, while the place values and the allowed digits depend on the base.

In decimal, $\overline{abc}=100a+10b+c$, with digits from zero through nine and $a\ne0$ for a three-digit numeral. Reversing the positions gives a difference of $99(a-c)$, because the middle terms cancel. If the final digit is zero, its reversal has a leading zero and may no longer be a three-digit numeral, even though the place-value expression still has a value.

Place value also explains patterns in digit puzzles. A four-digit palindrome has form $\overline{abba}$, so the first two digits determine the entire numeral. An addition puzzle imposes equations in each column, with carries joining one column to the next. These equations must be solved together with the digit bounds.

For fractions, long division generates digits by carrying a remainder from one step to the next. There are only finitely many possible remainders for a fixed denominator. Reaching zero makes the expansion terminate; repeating a nonzero remainder repeats the subsequent digits.

The chapter first develops the algebra of digits and other bases, then follows remainders through decimal expansions. Its final lesson studies fractions between two given fractions, where integer cross-products place a lower bound on possible denominators.`,
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
      body: String.raw`The position of a digit determines its contribution to a numeral. In $\overline{abc}=100a+10b+c$, changing $a$ by one changes the value by one hundred, while changing $c$ by one changes it by one. The digit restrictions are $1\le a\le9$ and $0\le b,c\le9$ when the numeral has three digits.

More generally, [[numeral-as-polynomial|a numeral is a polynomial in ten]]: the digits $d_k\ldots d_1d_0$ represent $\sum_{j=0}^k d_j10^j$. This expression lets a verbal condition on digits be compared with a condition on the value of the whole number.

For a two-digit number equal to four times its digit sum, write $10a+b=4(a+b)$. Simplification gives $b=2a$. Since $a\ge1$ and $b\le9$, the possible first digits are $1,2,3,4$, producing $12,24,36,48$. The equation alone would allow many other pairs; the digit bounds make the solution list finite.

[[digit-manipulation|Reversing, appending, and repeating digits]] can be derived in the same way. Reversal gives $\overline{ab}+\overline{ba}=11(a+b)$ and $\overline{abc}-\overline{cba}=99(a-c)$. Appending a digit $d$ to a numeral of value $N$ gives $10N+d$. Appending a full block of $k$ digits with value $B$ gives $10^kN+B$, with any leading zeros in that block retained among its $k$ places.

For a repeated three-digit block, $\overline{abcabc}=1000\overline{abc}+\overline{abc}=1001\overline{abc}$. Thus every such six-digit number is divisible by $7,11,13$. The factor $1001=10^3+1$ comes from the distance between the two copies of the block.

Borrowing is also a place-value exchange. In $10^k-m$ with $0\lt m\le10^k$, write the difference as $(10^k-1)-(m-1)$. The first term is a row of $k$ nines, so each digit can be complemented against the corresponding digit of $m-1$, padded to $k$ places. For example, $100000-93=99999-92=99907$.

A positive integer $N$ has [[digit-count|exactly $d$ decimal digits]] when $10^{d-1}\le N\lt10^d$. Taking logarithms gives $d=\lfloor\log_{10}N\rfloor+1$, but exact power comparisons often avoid approximations. Here $2^{10}5^{12}=25\cdot10^{10}$ is twenty-five followed by ten zeros, so it has twelve digits. Zero is a separate case: its usual numeral has one digit.`,
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
      body: String.raw`A palindrome reads the same from either end. Once its first $\lceil k/2\rceil$ digits are chosen, every remaining digit of a $k$-digit palindrome is fixed by reflection. The first digit has nine choices and each other free digit has ten. Thus there are $9\cdot10^{\lceil k/2\rceil-1}$ positive $k$-digit [[palindromes|palindromes]].

For four digits, $\overline{abba}$ has $9\cdot10=90$ choices. Its value is $1001a+110b$, so it is divisible by eleven. More generally, in an even-length palindrome each mirrored digit occurs once with each sign in the alternating digit sum; the contributions cancel. Hence every even-length decimal palindrome is divisible by eleven. Odd-length palindromes do not have this universal property: $101$ is not divisible by eleven.

In a [[cryptarithms|letter-and-digit puzzle]], the stated rules determine whether distinct letters must have distinct digits. A leading digit cannot be zero. Column equations make the carries explicit, rather than treating them as digits that can be chosen independently.

For $\overline{AB}+\overline{BA}=121$ with nonzero digits, let $c$ be the carry from the units column. Then $A+B=1+10c$. The tens column is $A+B+c=12$, since the result has tens digit two and a carry of one into the hundreds column. Subtraction gives $11c=11$, so $c=1$ and $A+B=11$.

The allowed ordered pairs run from $(2,9)$ to $(9,2)$, giving eight original two-digit numbers. Swapping a pair changes the original numeral and is counted separately here. With two addends a carry is at most one, but a column in a sum of more addends can produce a larger carry; its bound must come from that sum.

Repeated-one numerals give another application of column counting. Let $R=1+10+\cdots+10^5=111111$. When $R$ is squared, the coefficient of $10^k$ counts pairs of exponents $i,j$ with $i+j=k$ and $0\le i,j\le5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" role="img" aria-labelledby="m23-repunit-title m23-repunit-desc" style="width:100%;max-width:520px;height:auto"><title id="m23-repunit-title">Multiplying six repeated ones counts pairs of exponents</title><desc id="m23-repunit-desc">Bars show one, two, three, four, five, six, five, four, three, two and one contributions to powers ten to the zero through ten. Every coefficient is below ten, so no carries are required.</desc><path d="M45 220H475" stroke="currentColor" opacity="0.4"/><rect x="55" y="198" width="25" height="22" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="67.5" y="188" fill="currentColor" text-anchor="middle" font-size="16">1</text><text x="67.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">0</text><rect x="92" y="176" width="25" height="44" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="104.5" y="166" fill="currentColor" text-anchor="middle" font-size="16">2</text><text x="104.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">1</text><rect x="129" y="154" width="25" height="66" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="141.5" y="144" fill="currentColor" text-anchor="middle" font-size="16">3</text><text x="141.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">2</text><rect x="166" y="132" width="25" height="88" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="178.5" y="122" fill="currentColor" text-anchor="middle" font-size="16">4</text><text x="178.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">3</text><rect x="203" y="110" width="25" height="110" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="215.5" y="100" fill="currentColor" text-anchor="middle" font-size="16">5</text><text x="215.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">4</text><rect x="240" y="88" width="25" height="132" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="252.5" y="78" fill="currentColor" text-anchor="middle" font-size="16">6</text><text x="252.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">5</text><rect x="277" y="110" width="25" height="110" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="289.5" y="100" fill="currentColor" text-anchor="middle" font-size="16">5</text><text x="289.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">6</text><rect x="314" y="132" width="25" height="88" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="326.5" y="122" fill="currentColor" text-anchor="middle" font-size="16">4</text><text x="326.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">7</text><rect x="351" y="154" width="25" height="66" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="363.5" y="144" fill="currentColor" text-anchor="middle" font-size="16">3</text><text x="363.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">8</text><rect x="388" y="176" width="25" height="44" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="400.5" y="166" fill="currentColor" text-anchor="middle" font-size="16">2</text><text x="400.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">9</text><rect x="425" y="198" width="25" height="22" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><text x="437.5" y="188" fill="currentColor" text-anchor="middle" font-size="16">1</text><text x="437.5" y="243" fill="currentColor" text-anchor="middle" font-size="14">10</text><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="24">Contributions to each power of 10 in 111111²</text><text x="260" y="272">Exponent k in 10ᵏ; each contribution has coefficient 1</text></g></svg>

Those counts are $1,2,3,4,5,6,5,4,3,2,1$. Since none reaches ten, no carrying is needed, and $R^2=12345654321$. Its digit sum is $36$, also the sum of the thirty-six contributions in the multiplication. For a repunit of length ten or more, middle coefficients reach ten and carries change the displayed pattern.

These [[base10-curiosities|decimal patterns]] follow from expansion rather than an unrestricted rule about repeated digits. The same caution applies to cyclic-looking products: $142857\cdot7=999999$ is an exact identity that can be checked by multiplication, and its connection to the repeating expansion of $1/7$ will follow from long division.`,
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
      body: String.raw`For an integer base $b\ge2$, a numeral with digits $d_k\ldots d_0$ means $d_kb^k+\cdots+d_1b+d_0$, where each digit is an integer from zero to $b-1$. The leading digit is nonzero unless the numeral represents zero. Decimal notation is the case $b=10$.

For example, $1011_2=1\cdot2^3+0\cdot2^2+1\cdot2+1=11$. Every binary digit is zero or one. To convert a numeral to decimal, expand these place values; to find its digits from its value, reverse the process using division.

The division algorithm gives $N=bq+r$ with $0\le r\lt b$. The remainder $r$ is the last digit, and the quotient $q$ contains all the earlier digits. Applying the same division to $q$ therefore finds the next digit from the right. This proves [[base-conversion|conversion by repeated division]] and explains why the remainders are read in reverse order.

For $2026$ in base five, the successive divisions are

$$\begin{aligned}
2026&=5\cdot405+1,&405&=5\cdot81+0,\\
81&=5\cdot16+1,&16&=5\cdot3+1,\\
3&=5\cdot0+3.
\end{aligned}$$

Reading the remainders backward gives $31101_5$. Expansion checks the result: $3\cdot625+125+25+1=2026$. The internal zero is essential; omitting it changes the place values.

Arithmetic can be performed directly in the base as well. In binary, $1+1$ is written $10_2$, carrying one into the next column. Thus $1011_2+111_2=10010_2$. Converting the two addends to decimal gives $11+7=18$, and $10010_2=16+2=18$, providing a second check.

For an [[unknown-base|unknown base]], the same place-value expression becomes a polynomial in $b$. The equation $121_b=49$ is $(b+1)^2=49$, with algebraic candidates $b=6,-8$. Only $b=6$ is an integer base at least two and larger than every displayed digit. The digit two in particular requires $b\ge3$.

A positive $k$-digit numeral in base $b$ lies from $b^{k-1}$ through $b^k-1$. These size bounds can narrow the base before solving, and the digit bounds must still be checked afterward.`,
      related: [
        { card: "digit-count", note: String.raw`the number of digits in base $b$ is $\lfloor \log_b N \rfloor + 1$ (M2.2).` },
        { card: "repeating-decimals", note: String.raw`repeating expansions work the same way in any base (M2.5).` }
      ],
      exercises: [
        { q: String.raw`Write $2026$ in base $5$, and find the sum of its digits.`, answer: "6",
          solution: String.raw`Repeated division by $5$ gives the remainders $1, 0, 1, 1, 3$, so $2026 = 31101_5$. Check: $3 \cdot 625 + 1 \cdot 125 + 1 \cdot 25 + 0 + 1 = 2026$. The digits add to $6$.` },
        { q: String.raw`In what base $b$ is $121_b = 49$?`, answer: "6",
          solution: String.raw`$121_b=(b+1)^2=49$ gives $b=6$ or $-8$. An integer base must be at least two and larger than each displayed digit, so only $b=6$ works.` },
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
      body: String.raw`Long division carries a remainder to the next decimal place. For a proper fraction $p/q$ with $0\le p\lt q$ and $q\gt0$, a current remainder $r$ produces a digit $d$ and a new remainder $r'$ through $10r=qd+r'$, with $0\le r'\lt q$. The next digit depends entirely on the current remainder.

If the remainder reaches zero, the expansion terminates. Otherwise some nonzero remainder must recur, because there are only $q-1$ possibilities. From that point the same divisions and digits repeat. This proves that every rational number has a terminating or eventually repeating decimal expansion.

For $1/7$, the remainders return to the starting remainder after six steps:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 325" role="img" aria-labelledby="m25-remainders-title m25-remainders-desc" style="width:100%;max-width:520px;height:auto"><title id="m25-remainders-title">A six-step remainder cycle generates the digits of one seventh</title><desc id="m25-remainders-desc">Remainders one, three, two, six, four and five produce the digits one, four, two, eight, five and seven, then return to remainder one. Each row satisfies ten r equals seven times the next digit plus the new remainder.</desc><g fill="currentColor" text-anchor="middle" font-size="17"><text x="250" y="24">Long division of 1 by 7</text><text x="100" y="59">Remainder r</text><text x="250" y="59">Next digit d</text><text x="400" y="59">New remainder</text><text x="100" y="92">1</text><text x="250" y="92">1</text><text x="400" y="92">3</text><text x="100" y="121">3</text><text x="250" y="121">4</text><text x="400" y="121">2</text><text x="100" y="150">2</text><text x="250" y="150">2</text><text x="400" y="150">6</text><text x="100" y="179">6</text><text x="250" y="179">8</text><text x="400" y="179">4</text><text x="100" y="208">4</text><text x="250" y="208">5</text><text x="400" y="208">5</text><text x="100" y="237">5</text><text x="250" y="237">7</text><text x="400" y="237">1</text><text x="250" y="282">10r = 7d + new remainder</text><text x="250" y="309">After six digits, remainder 1 returns</text></g></svg>

The digits along those steps are $142857$, and no earlier remainder has repeated. Therefore $1/7=0.\overline{142857}$ has least repeating length six. Keeping the remainder sequence distinguishes a proven period from a pattern suggested by a short decimal approximation.

For a fraction in lowest terms, [[terminating-decimals|termination]] has an equivalent denominator condition. If $p/q=A/10^k$, then $q\mid10^k$, because $p$ and $q$ share no prime factor. Thus $q$ can have only prime factors two and five. Conversely, if $q=2^a5^b$, multiplying numerator and denominator by the missing factors reaches denominator $10^{\max(a,b)}$. The shortest terminating expansion therefore has $\max(a,b)$ decimal places.

For $7/40$, the denominator is $2^3\cdot5$, so $7/40=175/1000=0.175$ uses three places. Reduce first: $3/6=1/2$ terminates even though the unreduced denominator contains a factor three. An integer has reduced denominator one and needs zero decimal places. We use the terminating representation when it exists; an alternative such as $0.999\ldots=1$ does not change the represented number.

A purely [[repeating-decimals|repeating block]] can also be converted exactly. If $x=0.\overline{27}$, then $100x=27.\overline{27}$, so $99x=27$ and $x=3/11$. In general a block of $k$ digits with integer value $B$ gives $B/(10^k-1)$. Any leading zeros still count toward the block length.

For a delayed repeat, first align the repeating tails. With $x=0.1\overline3$, the expressions $10x=1.\overline3$ and $100x=13.\overline3$ have the same tail. Subtracting gives $90x=12$, hence $x=2/15$.

When $p/q$ is reduced and $q\gt1$ is coprime to ten, distinct remainders cannot lead to the same next remainder: $q\mid10(r-s)$ would force $q\mid r-s$, so $r=s$ within the allowed remainder range. The finite cycle therefore returns to the initial remainder, and the expansion repeats from the start. Returning after $k$ steps means $10^kp$ and $p$ have the same remainder modulo $q$. Coprimality of $p,q$ makes this equivalent to $q\mid10^k-1$. The least such $k$ is the period. For $4/37$, the candidates $9,99$ are not divisible by $37$, while $999=27\cdot37$, proving least period three and the block $108$.

If a reduced denominator also contains twos or fives, those factors can cause a nonrepeating initial segment. After separating them, the remaining factor coprime to ten controls the repeating cycle.`,
      related: [
        { card: "multiplicative-order", note: String.raw`the block length is the order of $10$ modulo the denominator (M6.4).` },
        { card: "geometric-series", note: String.raw`a repeating decimal is an infinite geometric sum.` }
      ],
      exercises: [
        { q: String.raw`Write $0.\overline{27}$ as a fraction $\tfrac mn$ in lowest terms, and find $m + n$.`, answer: "14",
          solution: String.raw`$0.\overline{27} = \tfrac{27}{99} = \tfrac{3}{11}$, so $m + n = 14$.` },
        { q: String.raw`How many decimal places are needed in the shortest terminating expansion of $\tfrac{7}{40}$?`, answer: "3",
          solution: String.raw`$40 = 2^3 \cdot 5$, so multiply top and bottom by $25$: $\tfrac{175}{1000} = 0.175$, three digits.` },
        { q: String.raw`How long is the repeating block of $\tfrac17$?`, answer: "6",
          solution: String.raw`Long division visits remainders $1,3,2,6,4,5$ and then returns to $1$, producing digits $142857$. No remainder recurs earlier, so the least repeating length is $6$.` }
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
      body: String.raw`For fractions $a/b\lt c/d$ with positive denominators, their mediant is $(a+c)/(b+d)$. It lies strictly between them: comparing the left fraction with the mediant gives numerator difference $bc-ad\gt0$, and comparison with the right fraction gives the same positive difference. This proves that the construction supplies an intermediate fraction.

The mediant need not give the smallest possible denominator for an arbitrary pair. Between $1/5$ and $1/2$, the mediant is $2/7$, while $1/3$ is already strictly inside the interval with a smaller denominator. To obtain a sharp denominator bound directly from $b+d$, assume that the given fractions are reduced and

$$bc-ad=1.$$

Let a fraction $p/q$ lie strictly between them, with positive integer denominator $q$. Its strict position makes $bp-aq$ and $cq-dp$ positive integers, so each is at least one. Combining them gives

$$q=d(bp-aq)+b(cq-dp)\ge b+d.$$

The equality uses $bc-ad=1$. Thus no intermediate fraction can have a denominator below $b+d$. The mediant attains this bound and is already reduced: any common divisor of $a+c,b+d$ divides $b(a+c)-a(b+d)=bc-ad=1$.

Equality in the bound forces both positive integers above to be one, which gives $p=a+c$ and $q=b+d$. Hence the mediant is the unique reduced fraction with this smallest denominator under the stated condition.

For $3/5$ and $2/3$, the cross-product difference is $5\cdot2-3\cdot3=1$. Every intermediate fraction has denominator at least eight, and the mediant $5/8$ attains eight. Similarly, $1/3$ and $1/2$ give the smallest intermediate fraction $2/5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 240" role="img" aria-labelledby="m26-mediant-title m26-mediant-desc" style="width:100%;max-width:520px;height:auto"><title id="m26-mediant-title">The smallest-denominator intermediate fraction is not necessarily the midpoint</title><desc id="m26-mediant-desc">A number line is zoomed to the interval from three fifths to two thirds. Five eighths is three eighths of the way from the left endpoint to the right. Its gaps are one fortieth on the left and one twenty-fourth on the right. Its denominator eight is the sum five plus three.</desc><g fill="none" stroke="currentColor"><path d="M40 125H480" opacity="0.6"/><path d="M60 120V130M460 120V130" stroke-width="1.5"/><path d="M60 95V83H210V95M210 95V83H460V95" opacity="0.55"/></g><g fill="currentColor"><circle cx="60" cy="125" r="4"/><circle cx="210" cy="125" r="4.5"/><circle cx="460" cy="125" r="4"/><g text-anchor="middle" font-size="17"><text x="260" y="25">3/5 &lt; 5/8 &lt; 2/3</text><text x="135" y="71">1/40</text><text x="335" y="71">1/24</text><text x="60" y="157">3/5</text><text x="210" y="157">5/8</text><text x="460" y="157">2/3</text><text x="260" y="209">Smallest denominator strictly inside: 5 + 3 = 8</text></g></g></svg>

The exact positions in the diagram show that the mediant need not be the arithmetic midpoint. Its gaps from the endpoints are $5/8-3/5=1/40$ and $2/3-5/8=1/24$.

The [[farey-sequences|Farey sequence]] of order $N$ lists the reduced fractions in $[0,1]$ with denominators at most $N$, in increasing order. For a pair satisfying the cross-product condition above, both endpoints occur when $N\ge\max(b,d)$, and the denominator bound shows that they remain neighbors exactly while $N\lt b+d$. Thus $3/5$ and $2/3$ are adjacent at order seven, but cease to be adjacent at order eight when $5/8$ appears.

A fraction $p/q$ can also describe the slope from the origin to the lattice point $(q,p)$. A denominator bound becomes a horizontal-coordinate bound. This translates some questions about lines between two slopes into the same search for a fraction of small denominator.`,
      related: [
        { card: "lattice-points-gcd", note: String.raw`lattice points on a segment, counted by a gcd.` },
        { card: "slope-to-a-point", note: String.raw`a fraction as the slope from the origin to a point.` }
      ],
      exercises: [
        { q: String.raw`What fraction with the smallest possible denominator lies strictly between $\tfrac35$ and $\tfrac23$? Give it in lowest terms.`, answer: "5/8",
          solution: String.raw`For an intermediate $p/q$, the integers $5p-3q$ and $2q-3p$ are positive. Therefore $q=3(5p-3q)+5(2q-3p)\ge8$. The reduced fraction $5/8$ lies strictly between the endpoints and attains denominator eight.` },
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
      body: String.raw`[[numeral-as-polynomial|Place value]] expresses digits as coefficients of powers of the base. [[digit-manipulation|Reversals and appended blocks]] then become algebraic operations, with leading-zero and digit bounds retained. [[digit-count|A digit count]] follows from the two powers of the base surrounding a positive integer.

[[palindromes|Mirrored digits]] reduce a count to choices for the first half, while [[cryptarithms|column equations]] constrain carries as well as digits. Repeated-digit multiplication gives coefficient counts; those counts become displayed digits only after any necessary carrying.

[[base-conversion|Repeated division]] recovers a numeral from its value because each remainder is its final digit. For an [[unknown-base|unknown base]], solve the place-value equation and check that the base is an integer at least two and larger than every digit.

Long-division remainders prove that a rational decimal terminates or eventually repeats. [[terminating-decimals|A reduced denominator with only twos and fives]] gives termination. [[repeating-decimals|Aligning and subtracting repeating tails]] converts an expansion to a fraction, and a return of remainders establishes its least period.

For [[farey-sequences|fractions satisfying $bc-ad=1$]], positivity of integer cross-products proves that every intermediate denominator is at least $b+d$. The mediant attains that bound. At a fixed Farey order, the denominator cutoff also determines whether the pair is still adjacent.`,
      strategies: [
        String.raw`Write a number by its digits, $100a + 10b + c$, and use $0 \le d \le 9$.`,
        String.raw`Pair $2$s with $5$s to count the digits of a product.`,
        String.raw`Count palindromes by their first halves.`,
        String.raw`Solve a cryptarithm column by column from the right, tracking carries.`,
        String.raw`Read a numeral in base $b$ as a polynomial in $b$; every digit is less than $b$.`,
        String.raw`Write a repeating block over $99\ldots9$, and check the denominator's primes to see whether a decimal ends.`,
        String.raw`When reduced endpoints satisfy $bc-ad=1$, their mediant is the unique intermediate fraction with smallest denominator.`
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
        solution: String.raw`Long division visits the distinct remainders $1,10,9,12,3,4$ and then returns to $1$, producing digits $076923$. Thus the least period is six; the leading zero is part of the block.` },
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
