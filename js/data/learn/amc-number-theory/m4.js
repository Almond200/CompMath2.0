// Learn, AMC Number Theory, chapter M4: remainders (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M4"] = {
  lessons: {
    "M4.1": {
      prereq: ["divisibility-rules"],
      cards: [],
      body: String.raw`Division by a positive integer $m$ writes any integer $a$ uniquely as $a=qm+r$, with $0\le r\lt m$. The remainder $r$ records where $a$ falls among consecutive groups of size $m$. For $2026=7\cdot289+3$, the remainder is three.

Two integers have the same remainder exactly when their difference is divisible by $m$. We write $a\equiv b\pmod m$ and say that they are congruent modulo $m$. A congruence can use a convenient representative outside the usual remainder interval: $-1\equiv6\pmod7$, although the ordinary remainder of minus one is six.

Replacing a number by a congruent representative preserves addition and multiplication. This allows a calculation to remain small even when the integers being represented are large. Powers apply multiplication repeatedly, so their remainders follow a finite sequence of possible states.

The powers of three have last digits $3,9,7,1$ and then repeat. The period four reduces the exponent $2026$ to its position two in that cycle, giving last digit nine. A repeated state guarantees that the later sequence repeats, but some power sequences have an initial segment before their cycle begins.

Remainders also restrict equations. An integer square is zero or one modulo four, so a sum of two squares cannot have remainder three. A target with that remainder is impossible, without a search through all possible square values.

The chapter develops congruence operations, power cycles, and residue restrictions, then proves Fermat's little theorem and uses constant remainders in divisibility problems. Cancellation and exponent reduction will require particular attention to common factors with the modulus.`,
      exercises: [
        { q: String.raw`Find the remainder when $2026$ is divided by $7$.`, answer: "3",
          solution: String.raw`$7 \cdot 289 = 2023$, so $2026 = 2023 + 3$ leaves remainder $3$.` },
        { q: String.raw`What is the last digit of $3^{2026}$?`, answer: "9",
          solution: String.raw`The last digits of the powers of $3$ cycle $3, 9, 7, 1$ with period $4$. Since $2026 = 4 \cdot 506 + 2$, the last digit is the second in the cycle, $9$.` },
        { q: String.raw`Find the remainder when $99^2$ is divided by $4$.`, answer: "1",
          solution: String.raw`$99 \equiv -1 \pmod 4$, so $99^2 \equiv 1$. In general every odd square leaves remainder $1$ on division by $4$.` }
      ],
      problems: [
        "1996 AJHSME, Problem 15",
        "1990 AJHSME, Problem 4",
        "2003 AMC 10A, Problem 16"
      ]
    },
    "M4.2": {
      prereq: ["divisibility-rules", "euclidean-algorithm"],
      cards: ["modular-basics", "euclids-lemma", "subtract-equal-remainders"],
      body: String.raw`The statement $a\equiv b\pmod m$ means $m\mid a-b$. This definition of [[modular-basics|congruence]] explains its arithmetic rules. If also $c\equiv d\pmod m$, then $(a+c)-(b+d)$ is a sum of multiples of $m$, and $ac-bd=c(a-b)+b(c-d)$ is also a multiple of $m$. Addition, subtraction, and multiplication therefore preserve congruence.

For $17\cdot23+45$ modulo eight, use the representatives $1,7,5$. The result is congruent to $1\cdot7+5=12\equiv4$. Negative representatives can make a power simpler: $2^5=32\equiv-1\pmod{11}$, so $2^{10}\equiv1$.

Cancellation needs a separate argument. [[euclids-lemma|Euclid's lemma]] says that a prime dividing a product divides at least one factor. This follows from unique prime factorization: the product's copy of that prime has to come from one of its factors.

More generally, if $\gcd(k,m)=1$ and $m\mid k(a-b)$, every prime power required by $m$ must come from $a-b$, since $k$ supplies none of those primes. Thus $a\equiv b\pmod m$. A common multiplier coprime to the modulus can therefore be canceled without changing the modulus.

For a multiplier sharing factors with $m$, cancellation generally changes the modulus. If $g=\gcd(k,m)$, then $k(a-b)$ is divisible by $m$ exactly when $(k/g)(a-b)$ is divisible by $m/g$. These latter two coefficients are coprime, so the resulting condition is $a\equiv b\pmod{m/g}$. For example, $2\cdot3\equiv2\cdot8\pmod{10}$ implies $3\equiv8\pmod5$, not modulo ten.

An inverse of $a$ modulo $m\ge2$ is a number $u$ satisfying $au\equiv1\pmod m$. For three modulo seven, five works because $3\cdot5=15\equiv1$. An inverse requires $\gcd(a,m)=1$, since a common divisor would divide both $au$ and $m$ and hence would have to divide one.

Conversely, when $a$ is coprime to $m$, cancellation shows that the residues of $0,a,2a,\ldots,(m-1)a$ are all different. There are $m$ of them, so every residue occurs, including one. This proves the existence of an inverse in that case and explains how multiplication can undo a congruence.

[[subtract-equal-remainders|Equal remainders]] can instead reveal an unknown modulus. If $50,86,158$ have the same remainder modulo $m$, then $m$ divides $36=86-50$ and $72=158-86$. Hence $m\mid\gcd(36,72)=36$. Conversely, every positive divisor of thirty-six makes these differences multiples of $m$ and therefore gives equal remainders. The largest choice is thirty-six, for which all three remainders are fourteen.`,
      related: [
        { card: "modular-inverse", note: String.raw`inverses in general, found by the Euclidean algorithm (M6.3).` },
        { card: "crt", note: String.raw`conditions on several moduli joined into one (M5.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $17 \cdot 23 + 45$ is divided by $8$.`, answer: "4",
          solution: String.raw`Reduce first: $17 \equiv 1$, $23 \equiv 7$, $45 \equiv 5 \pmod 8$. Then $1 \cdot 7 + 5 = 12 \equiv 4$.` },
        { q: String.raw`The numbers $50$, $86$ and $158$ leave the same remainder on division by $n \gt 1$. What is the largest possible $n$?`, answer: "36",
          solution: String.raw`$n$ divides the differences $36$ and $72$, so it divides $\gcd(36, 72) = 36$. And $n = 36$ works: all three leave remainder $14$.` },
        { q: String.raw`Find the remainder when $2^{10}$ is divided by $11$.`, answer: "1",
          solution: String.raw`$2^5 = 32 \equiv -1 \pmod{11}$, so $2^{10} \equiv (-1)^2 = 1$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 7",
        "2023 AMC 10B, Problem 11",
        "2002 AMC 10B, Problem 15",
        "2003 AMC 10B, Problem 18",
        "2023 AMC 10B, Problem 18"
      ]
    },
    "M4.3": {
      prereq: ["modular-basics"],
      cards: ["cycle-hunting", "last-digit-patterns"],
      body: String.raw`For a fixed integer base $a$ and modulus $m$, the next power remainder is determined by multiplying the current remainder by $a$. Only finitely many remainders are possible, so some state eventually repeats. Once it does, all subsequent states repeat in the same order. This is [[cycle-hunting|finding a power cycle]].

If a state first occurs at exponent $i$ and returns at exponent $j\gt i$, the resulting period is $L=j-i$. For an exponent $N\ge i$, its equivalent position in that cycle is $i+((N-i)\bmod L)$. This retains the starting position of the cycle instead of assuming it begins at exponent zero.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 265" role="img" aria-labelledby="m43-cycle-title m43-cycle-desc" style="width:100%;max-width:520px;height:auto"><title id="m43-cycle-title">Powers of two modulo twelve have an initial segment before a two-state cycle</title><desc id="m43-cycle-desc">Starting at exponent zero, the remainders are one, two, four and eight, then return to four. Exponents two onward alternate four and eight. Exponent two thousand twenty-six corresponds to exponent two and remainder four.</desc><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="60" cy="105" r="24"/><circle cx="190" cy="105" r="24"/><circle cx="320" cy="105" r="24"/><circle cx="450" cy="105" r="24"/><path d="M84 105H166M158 100L166 105L158 110"/><path d="M214 105H296M288 100L296 105L288 110"/><path d="M344 105H426M418 100L426 105L418 110"/><path d="M450 129V175H320V131M314 139L320 131L326 139"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="23">2ᵏ modulo 12</text><text x="60" y="58">k = 0</text><text x="60" y="111">1</text><text x="190" y="58">k = 1</text><text x="190" y="111">2</text><text x="320" y="58">k = 2</text><text x="320" y="111">4</text><text x="450" y="58">k = 3</text><text x="450" y="111">8</text><text x="125" y="208">Prefix: 1, 2</text><text x="385" y="208">Cycle: 4, 8</text><text x="260" y="246">2026 → exponent 2 → remainder 4</text></g></svg>

The powers of two modulo twelve are $1,2,4,8,4,8,\ldots$ starting at exponent zero. The cycle $4,8$ begins at exponent two. Thus $2^{2026}\equiv4\pmod{12}$ because $2026-2$ is even. Reducing the exponent directly to zero modulo two would give $2^0=1$, which is outside that cycle and is the wrong answer.

When $\gcd(a,m)=1$, multiplication by $a$ is reversible modulo $m$. A repeated power can be canceled to give a positive power congruent to one, so the cycle returns to the exponent-zero state. If $a^L\equiv1$, then $a^{qL+r}\equiv a^r$ and ordinary exponent reduction modulo $L$ is valid for nonnegative exponents.

For two modulo seven, the powers $1,2,4,1$ give period three. Since $100=3\cdot33+1$, the remainder of $2^{100}$ is two. A known exponent $T$ with $a^T\equiv1$ also permits reduction, even if $T$ is not the least period.

[[last-digit-patterns|Last decimal digits]] are remainders modulo ten. For positive exponents, the powers of each final digit have periods one, two, or four. In particular, the powers of seven end in $7,9,3,1$, so $7^{2026}$ ends in nine.

For two final digits use modulus one hundred. Here $3^{10}=59049\equiv49$, so $3^{20}\equiv49^2=2401\equiv1\pmod{100}$. The last two digits are $01$, retaining the leading zero in the two-digit block. The modulus determines the number of final digits being kept; cycles for modulus ten cannot simply be reused for modulus one hundred.`,
      related: [
        { card: "fermats-little-theorem", note: String.raw`a period that divides $p - 1$ for a prime modulus (M4.5).` },
        { card: "periodic-sequences", note: String.raw`sequences that repeat, the same idea for any recursion.` }
      ],
      exercises: [
        { q: String.raw`What is the last digit of $7^{2026}$?`, answer: "9",
          solution: String.raw`The last digits of the powers of $7$ cycle $7, 9, 3, 1$. Since $2026 \equiv 2 \pmod 4$, the last digit is $9$.` },
        { q: String.raw`What are the last two digits of $3^{20}$? (Give the number from $0$ to $99$.)`, answer: "1",
          solution: String.raw`$3^{10} = 59049 \equiv 49 \pmod{100}$, so $3^{20} \equiv 49^2 = 2401 \equiv 1$. The last two digits are $01$.` },
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $7$.`, answer: "2",
          solution: String.raw`$2^3 = 8 \equiv 1 \pmod 7$, so the period is $3$, and $2^{100} = (2^3)^{33} \cdot 2 \equiv 2$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 8",
        "2006 AMC 10B, Problem 11",
        "2015 AMC 10B, Problem 10",
        "2008 AMC 12A, Problem 15",
        "2023 AMC 10B, Problem 6"
      ]
    },
    "M4.4": {
      prereq: ["modular-basics"],
      cards: ["squares-mod-small", "choose-modulus", "primes-6k"],
      body: String.raw`To determine possible square remainders modulo $m$, it is enough to square the representatives $0,1,\ldots,m-1$. Every integer is congruent to one of them, and congruence is preserved by multiplication. For modulus four the squares have remainders $0,1,0,1$, so only zero and one can occur.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" role="img" aria-labelledby="m44-squares-title m44-squares-desc" style="width:100%;max-width:520px;height:auto"><title id="m44-squares-title">A sum of two square residues modulo four cannot equal three</title><desc id="m44-squares-desc">Each square is congruent to zero or one modulo four. A two by two table adds those possibilities and contains zero, one, one and two. The target two thousand twenty-seven is three modulo four and cannot occur.</desc><g fill="currentColor" text-anchor="middle" font-size="17"><text x="250" y="25">Possible sums of two squares modulo 4</text><text x="285" y="60">y² modulo 4</text><text x="225" y="87">0</text><text x="345" y="87">1</text><text x="145" y="132">0</text><text x="145" y="192">1</text><text transform="translate(60 155) rotate(-90)">x² modulo 4</text></g><rect x="180" y="102" width="90" height="45" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="0.7"/><text x="225" y="132" fill="currentColor" text-anchor="middle" font-size="18">0</text><rect x="300" y="102" width="90" height="45" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="0.7"/><text x="345" y="132" fill="currentColor" text-anchor="middle" font-size="18">1</text><rect x="180" y="162" width="90" height="45" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="0.7"/><text x="225" y="192" fill="currentColor" text-anchor="middle" font-size="18">1</text><rect x="300" y="162" width="90" height="45" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="0.7"/><text x="345" y="192" fill="currentColor" text-anchor="middle" font-size="18">2</text><g fill="currentColor" text-anchor="middle" font-size="17"><text x="250" y="247">Possible sums: 0, 1, 2</text><text x="250" y="278">2027 ≡ 3 (mod 4): impossible</text></g></svg>

The table adds each possible square remainder to each other one. Its entries are only $0,1,2$, ruling out a sum of two squares congruent to three. Since $2027=4\cdot506+3$, the equation $x^2+y^2=2027$ has no integer solution.

This is an application of [[squares-mod-small|the restricted residues of squares]]. Modulo three they are zero and one; modulo eight they are zero, one, and four; modulo five they are zero, one, and four. For odd $x=2k+1$, the identity $x^2=4k(k+1)+1$ shows the sharper result $x^2\equiv1\pmod8$, since $k(k+1)$ is even.

[[choose-modulus|Choosing a modulus]] means selecting a remainder calculation that preserves a decisive restriction. A successful obstruction rules out every integer solution. Passing one residue test does not prove existence. For example, six passes the sum-of-two-squares test modulo four, but modulo three a sum of two squares can be zero only when both variables are multiples of three. Their square sum would then be divisible by nine, which six is not.

A prime condition can force a small divisor. If $p$ is prime and $p\ne3$, then $p^2\equiv1\pmod3$, so $p^2+2$ is divisible by three. It is larger than three and therefore composite. The remaining case $p=3$ gives eleven, which is prime. This argument includes $p=2$ among the excluded cases.

[[primes-6k|Every prime greater than three]] has remainder one or five modulo six, since the other classes are divisible by two or three. The converse is false: twenty-five and thirty-five have these remainders but are composite.

For such a prime, $(p-1)(p+1)$ is divisible by eight: both factors are even and one is a multiple of four. It is also divisible by three, since one neighbor of $p$ must be a multiple of three. The factors eight and three are coprime, giving $p^2\equiv1\pmod{24}$. The same proof applies to any integer coprime to six, so this residue condition alone is not a primality test.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`which numbers are sums of two squares.` },
        { card: "only-even-prime", note: String.raw`parity, the simplest choice of modulus (M1.2).` }
      ],
      exercises: [
        { q: String.raw`Show that $x^2 + y^2 = 2027$ has no integer solutions.`,
          solution: String.raw`Squares are $0$ or $1$ modulo $4$, so $x^2 + y^2$ is $0$, $1$ or $2$ modulo $4$. But $2027 = 4 \cdot 506 + 3$ is $3$ modulo $4$.` },
        { q: String.raw`For how many primes $p$ is $p^2 + 2$ also prime?`, answer: "1",
          solution: String.raw`Modulo $3$, any prime other than $3$ has $p^2 \equiv 1$, so $p^2 + 2$ is a multiple of $3$ larger than $3$. For $p = 3$, $p^2 + 2 = 11$ is prime. So only $p = 3$ works.` },
        { q: String.raw`Find the remainder when the square of any prime greater than $3$ is divided by $24$.`, answer: "1",
          solution: String.raw`$p^2 - 1 = (p - 1)(p + 1)$ is a product of two consecutive even numbers, one a multiple of $4$, so it is a multiple of $8$; one of $p - 1$, $p$, $p + 1$ is a multiple of $3$, and it is not $p$. So $24 \mid p^2 - 1$ and the remainder is $1$.` }
      ],
      problems: [
        "2018 AMC 10B, Problem 11",
        "1994 AIME, Problem 1",
        "2024 AMC 10B, Problem 24"
      ]
    },
    "M4.5": {
      prereq: ["cycle-hunting", "fundamental-theorem-arithmetic"],
      cards: ["fermats-little-theorem", "eulers-totient"],
      body: String.raw`Suppose $p$ is prime and $p\nmid a$. Multiplying the nonzero residues $1,2,\ldots,p-1$ by $a$ gives no zero residue, and no two results can agree: $ai\equiv aj\pmod p$ would allow cancellation of $a$, forcing $i=j$ within that range. Thus multiplication merely rearranges the nonzero residues.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 245" role="img" aria-labelledby="m45-permutation-title m45-permutation-desc" style="width:100%;max-width:520px;height:auto"><title id="m45-permutation-title">Multiplication permutes the nonzero residues modulo a prime</title><desc id="m45-permutation-desc">Residues one through six, multiplied by three modulo seven, become three, six, two, five, one and four. Their product is unchanged modulo seven, giving three to the sixth times six factorial congruent to six factorial. Canceling the factorial gives the Fermat congruence.</desc><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="25">Multiply nonzero residues by 3 modulo 7</text><text x="70" y="77">r</text><text x="70" y="137">3r mod 7</text><text x="170" y="77">1</text><text x="170" y="137">3</text><text x="225" y="77">2</text><text x="225" y="137">6</text><text x="280" y="77">3</text><text x="280" y="137">2</text><text x="335" y="77">4</text><text x="335" y="137">5</text><text x="390" y="77">5</text><text x="390" y="137">1</text><text x="445" y="77">6</text><text x="445" y="137">4</text><text x="260" y="190">The same residues, in a different order</text><text x="260" y="225">3⁶ · 6! ≡ 6! (mod 7) ⇒ 3⁶ ≡ 1 (mod 7)</text></g><path d="M40 98H480" stroke="currentColor" opacity="0.4"/></svg>

For $a=3,p=7$, the new list is $3,6,2,5,1,4$, which contains each original residue once. In general, multiplying all the entries gives

$$a^{p-1}(p-1)!\equiv(p-1)!\pmod p.$$

None of the factorial's factors is divisible by $p$, so the factorial is coprime to $p$ and can be canceled. This proves [[fermats-little-theorem|Fermat's little theorem]]: $a^{p-1}\equiv1\pmod p$ when $p\nmid a$. Multiplying by $a$ gives $a^p\equiv a$; the latter form also holds when $p\mid a$, because both sides are then zero modulo $p$.

Since $101$ is prime and does not divide two, $2^{100}\equiv1\pmod{101}$. Also $3^{31}\equiv3\pmod{31}$. Exponent reduction modulo $p-1$ uses the first form and therefore requires $p\nmid a$. For example, $7^6\equiv0\pmod7$ cannot be replaced by $7^0=1$ even though six reduces to zero modulo six.

The theorem supplies a period bound, not necessarily the least period. Two modulo seven already returns to one after three powers, a divisor of the Fermat bound six. The theorem also has no converse asserting primality: $341=11\cdot31$ is composite, yet $2^{10}=1024\equiv1\pmod{341}$ and therefore $2^{340}\equiv1$.

For a positive integer $n$, [[eulers-totient|Euler's totient]] $\varphi(n)$ counts the integers from one through $n$ coprime to $n$. At $n=36$, remove the eighteen multiples of two and twelve multiples of three, then restore the six multiples of both: $\varphi(36)=36-18-12+6=12$.

Applying the same inclusion-exclusion count to the distinct prime divisors gives

$$\varphi(n)=n\prod_{p\mid n}\left(1-\frac1p\right).$$

All divisors used in the count divide $n$, so each multiple count is exact. At $n=1$, the empty product gives $\varphi(1)=1$. For one hundred, the formula gives $100(1-1/2)(1-1/5)=40$.

For $n\ge2$ and $\gcd(a,n)=1$, multiplication also rearranges the residues coprime to $n$. Their product can be canceled because it is itself coprime to $n$. The same proof yields Euler's extension $a^{\varphi(n)}\equiv1\pmod n$. Thus $7^{40}\equiv1\pmod{100}$. The coprimality hypothesis remains essential for this composite-modulus version.`,
      related: [
        { card: "eulers-theorem", note: String.raw`$a^{\varphi(n)} \equiv 1$ in general (M6.3).` },
        { card: "multiplicative-order", note: String.raw`the exact length of a cycle, a divisor of $p - 1$ (M6.4).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $2^{100}$ is divided by $101$.`, answer: "1",
          solution: String.raw`$101$ is prime and does not divide $2$, so by Fermat $2^{100} \equiv 1 \pmod{101}$.` },
        { q: String.raw`Find the remainder when $3^{31}$ is divided by $31$.`, answer: "3",
          solution: String.raw`By Fermat, $a^p \equiv a \pmod p$, so $3^{31} \equiv 3$.` },
        { q: String.raw`Compute $\varphi(36)$.`, answer: "12",
          solution: String.raw`$36 = 2^2 \cdot 3^2$, so $\varphi(36) = 36 \cdot \tfrac12 \cdot \tfrac23 = 12$.` }
      ],
      problems: [
        "2017 AMC 10B, Problem 14",
        "1992 AIME, Problem 1",
        "1983 AIME, Problem 6"
      ]
    },
    "M4.6": {
      prereq: ["modular-basics", "polynomial-division"],
      cards: ["reduce-divisibility-constant", "poly-divisible-linear"],
      body: String.raw`For integer expressions $A(n),D(n)$ with $D(n)\ne0$, subtracting an integer multiple of $D(n)$ does not change divisibility by $D(n)$. If $A(n)=Q(n)D(n)+R$ with integer $Q(n)$, then $D(n)\mid A(n)$ exactly when $D(n)\mid R$. A constant nonzero remainder reduces the problem to a finite list of divisors.

For $n^2+5$ and $n+2$, the identity

$$n^2+5=(n+2)(n-2)+9$$

shows that $n+2\mid n^2+5$ exactly when $n+2\mid9$. If $n$ is positive, the divisor is at least three, so its possible values are three and nine. They give $n=1,7$, and both satisfy the original divisibility. This is [[reduce-divisibility-constant|reducing divisibility to a constant]] while retaining the sign and size restriction on the divisor.

For a polynomial $P$ with integer coefficients and an integer $a$, every power difference $n^k-a^k$ has factor $n-a$ with integer quotient. Adding these factorizations gives $n-a\mid P(n)-P(a)$. Consequently, for $n\ne a$,

$$n-a\mid P(n)\quad\Longleftrightarrow\quad n-a\mid P(a).$$

This is [[poly-divisible-linear|the constant-remainder rule for a monic linear divisor]]. Integer coefficients and an integer evaluation point make the quotient an integer at integer inputs. For $n^3+4$ and $n-1$ with $n\ge2$, the constant is five, so $n-1=1$ or five and $n=2,6$.

If the range permits negative values of $n-a$, include the negative divisors too. If $P(a)=0$, every nonzero $n-a$ divides the remainder, so the rule gives all such inputs rather than a finite list. The input $n=a$ must still be excluded because the proposed divisor would be zero.

A rational expression can be treated by separating its integer part. For $n\ne30$,

$$\frac n{30-n}=\frac{30}{30-n}-1.$$

Thus it is an integer exactly when $m=30-n$ is a nonzero divisor of thirty. If $0\lt n\lt30$, then $0\lt m\lt30$, giving the seven divisors $1,2,3,5,6,10,15$. If all positive $n$ are allowed, the eight negative divisors of thirty give eight further inputs above thirty, for fifteen in total. The divisor $m=30$ would give the excluded input zero, and $m=0$ would make the original expression undefined.

The algebraic rewrite establishes the equivalence; the original domain decides which signed divisors correspond to valid inputs.`,
      related: [
        { card: "factor-remainder-theorem", note: String.raw`the remainder of $P(n)$ on division by $n - a$ is $P(a)$.` },
        { card: "gcd-substitution", note: String.raw`subtracting multiples to simplify a gcd (M3.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the positive integers $n$ for which $n + 2$ divides $n^2 + 5$.`, answer: "8",
          solution: String.raw`$n^2 + 5 = (n + 2)(n - 2) + 9$, so $n + 2$ must divide $9$; with $n + 2 \ge 3$, $n + 2 = 3$ or $9$, so $n = 1$ or $7$. The sum is $8$.` },
        { q: String.raw`For how many positive integers $n \ge 2$ does $n - 1$ divide $n^3 + 4$?`, answer: "2",
          solution: String.raw`$n - 1$ divides $n^3 - 1$, so it divides $n^3 + 4$ exactly when it divides $5$. With $n - 1 \ge 1$: $n - 1 = 1$ or $5$, so $n = 2$ or $6$.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 7"
      ]
    },
    "M4.7": {
      prereq: ["modular-basics", "euclids-lemma", "subtract-equal-remainders", "cycle-hunting", "last-digit-patterns", "squares-mod-small", "choose-modulus", "primes-6k", "fermats-little-theorem", "eulers-totient", "reduce-divisibility-constant"],
      cards: [],
      body: String.raw`[[modular-basics|Congruence]] identifies integers whose difference is divisible by the modulus. Addition and multiplication preserve it. [[euclids-lemma|Prime-factor divisibility]] justifies cancellation when the multiplier is coprime to the modulus; otherwise canceling a common factor generally requires reducing the modulus too. [[subtract-equal-remainders|Equal remainders]] turn into divisibility conditions on differences.

[[cycle-hunting|Power cycles]] follow from a finite list of possible remainders and a fixed multiplication rule. Retain any initial segment before the cycle. With a coprime base, a return to one permits direct exponent reduction. [[last-digit-patterns|Final-digit questions]] choose a modulus equal to the required power of ten.

[[squares-mod-small|Restricted square residues]] and [[choose-modulus|an appropriate modulus]] can rule out integer equations. A residue condition is necessary, so passing it does not itself construct a solution. [[primes-6k|Primes greater than three]] occupy two classes modulo six, but composite integers can occupy them as well.

[[fermats-little-theorem|Fermat's theorem]] follows from permuting nonzero residues modulo a prime. [[eulers-totient|The totient]] counts residues coprime to a general modulus, giving the corresponding exponent bound. In both exponent-reduction arguments, check that the base is coprime to the modulus and distinguish a valid bound from the least period.

[[reduce-divisibility-constant|An integer-quotient remainder identity]] can reduce an expression divisibility problem to constant divisors. Preserve the domain, include allowed negative divisors, and handle a zero remainder separately.`,
      strategies: [
        String.raw`Reduce every number modulo $n$ as early as possible, and use negative remainders.`,
        String.raw`Locate the repeating power cycle and any initial segment before reducing an exponent.`,
        String.raw`For a prime modulus $p$ with $p\nmid a$, reduce the exponent of $a$ modulo $p-1$; handle bases divisible by $p$ separately.`,
        String.raw`To rule out an equation, look modulo $3$, $4$, $8$ or $9$.`,
        String.raw`To test whether $f(p)$ can be prime, look modulo a small prime.`,
        String.raw`When numbers leave equal remainders, take their differences.`,
        String.raw`Subtract integer multiples to simplify a divisibility condition; check the signed divisors and any excluded inputs.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the remainder when $1234567$ is divided by $9$.`, answer: "1",
        solution: String.raw`The digit sum is $28$, and $28 = 27 + 1$, so the remainder is $1$.` },
      { q: String.raw`What is the last digit of $2^{2026} + 3^{2026}$?`, answer: "3",
        solution: String.raw`Since $2026 \equiv 2 \pmod 4$, $2^{2026}$ ends like $2^2 = 4$ and $3^{2026}$ like $3^2 = 9$. The sum ends in $3$.` },
      { q: String.raw`Find the remainder when $5^{30}$ is divided by $7$.`, answer: "1",
        solution: String.raw`By Fermat, $5^6 \equiv 1 \pmod 7$, and $30$ is a multiple of $6$, so $5^{30} \equiv 1$.` },
      { q: String.raw`Find the remainder when $2^{2026}$ is divided by $9$.`, answer: "7",
        solution: String.raw`The powers of $2$ modulo $9$ run $2, 4, 8, 7, 5, 1$, period $6$. Since $2026 \equiv 4 \pmod 6$, $2^{2026} \equiv 2^4 = 16 \equiv 7$.` },
      { q: String.raw`How many integers $n$ from $1$ to $100$ leave remainder $2$ on division by $3$ and remainder $3$ on division by $4$?`, answer: "8",
        solution: String.raw`Both conditions say $n + 1$ is a multiple of $3$ and of $4$, so $n \equiv 11 \pmod{12}$: $11, 23, \ldots, 95$, eight numbers.` }
    ],
    problems: [
      "1994 AJHSME, Problem 6",
      "2024 AMC 10A, Problem 3"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12B, Problem 16",
      "2023 AMC 12A, Problem 24",
      "1988 AIME, Problem 2",
      "1989 AIME, Problem 3"
    ]
  }
};
