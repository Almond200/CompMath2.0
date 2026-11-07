// Learn, AMC Number Theory, chapter M6: advanced number theory (CONVENTIONS §14). Part: Advanced topics.
// Content revision: connected proofs, explicit hypotheses, and checked worked solutions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M6"] = {
  lessons: {
    "M6.1": {
      prereq: ["fundamental-theorem-arithmetic", "modular-basics", "fermats-little-theorem"],
      cards: [],
      body: String.raw`Prime factorization and remainders describe two kinds of integer structure. Factorization records how many copies of each prime a number contains. A remainder records its position modulo a chosen integer. This chapter develops both descriptions and then uses them to study equations involving squares.

The exponent of a prime in a positive integer is called its valuation at that prime. Products add these exponents, while a gcd takes the smaller exponent and an lcm takes the larger. Conditions on products, gcds, and lcms can therefore be translated into separate conditions for each prime.

Addition behaves differently. Both $1000=2^3\cdot125$ and $24=2^3\cdot3$ contain exactly three factors of two, but $1000+24=1024=2^{10}$. Factoring out the common power leaves $125+3=128$, which contributes seven more factors. This distinction matters whenever two terms have equal valuations.

For remainders, an inverse allows division: $3\cdot5\equiv1\pmod7$, so multiplication by five undoes multiplication by three. Such an inverse exists only when the multiplier and modulus are coprime. Euler's theorem gives an exponent returning a coprime base to one, and the multiplicative order is the smallest positive exponent doing so.

The powers of two modulo seven return to one after three steps. Thus an exponent of one hundred can be reduced modulo three, giving remainder two. For a base sharing a factor with the modulus, this return to one need not occur; a power cycle may instead have an initial segment.

The final lesson studies Pell equations, such as $x^2-2y^2=1$. Multiplication of expressions involving $\sqrt2$ generates new solutions from known ones. Explaining when this process gives every positive solution requires more than verifying a recurrence, so the generation and completeness arguments will be treated separately.`,
      exercises: [
        { q: String.raw`What is the largest integer $k$ such that $2^k$ divides $1000 + 24$?`, answer: "10",
          solution: String.raw`The sum is $1000+24=1024=2^{10}$. Its quotient by $2^{10}$ is one, which is odd, so it has exactly ten factors of two. Equivalently, factor out the common $2^3$ first: $2^3(125+3)=2^3\cdot128=2^{10}$. The equal valuations of the summands did not determine that of their sum.` },
        { q: String.raw`Find the integer $x$ with $0 \le x \lt 7$ and $3x \equiv 1 \pmod 7$.`, answer: "5",
          solution: String.raw`The residues of $3x$ for $x=0,1,\ldots,6$ are $0,3,6,2,5,1,4$. Only $x=5$ gives one. Since three is coprime to seven, multiplication by three permutes all seven residues, so there is exactly one solution in $0\le x\lt7$. The check is $3\cdot5=15=2\cdot7+1$.` },
        { q: String.raw`What is the remainder when $2^{100}$ is divided by $7$?`, answer: "2",
          solution: String.raw`The powers at exponents zero through three have remainders $1,2,4,1$. A return to one allows $2^{3q+r}\equiv2^r\pmod7$. Since $100=3\cdot33+1$, the remainder is two. No initial segment has to be retained because the cycle begins at exponent zero.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 7",
        "2018 AMC 10B, Problem 16",
        "2025 AMC 12B, Problem 5"
      ]
    },
    "M6.2": {
      prereq: ["fundamental-theorem-arithmetic", "gcd-lcm-product", "number-of-divisors", "sum-of-divisors", "eulers-totient", "legendres-formula"],
      cards: ["exponent-tracking", "p-adic-valuation", "power-minus-self", "multiplicative-functions"],
      body: String.raw`Unique prime factorization turns a positive integer into a list of nonnegative exponents. For a fixed prime $p$, write $v_p(n)$ for the exponent of $p$ in $n$; if $p$ does not divide $n$, this exponent is zero. This is [[p-adic-valuation|the valuation at $p$]]. Here the arguments of $v_p$ are positive integers, so no convention for $v_p(0)$ is needed.

The exponent in a product adds, because multiplying prime factorizations joins their factors. A common divisor can use at most the copies available in either integer, while a common multiple must contain every copy required by either. Hence

$$v_p(uv)=v_p(u)+v_p(v),\qquad v_p(\gcd(u,v))=\min(v_p(u),v_p(v)),\qquad v_p(\operatorname{lcm}(u,v))=\max(v_p(u),v_p(v)).$$

This is the basis of [[exponent-tracking|tracking prime exponents]] in integer conditions. If $\operatorname{lcm}(n,24)=72$, no prime other than two or three can divide $n$. Write $n=2^a3^b$, with $24=2^3\cdot3$ and $72=2^3\cdot3^2$. Comparing exponents gives $\max(a,3)=3$ and $\max(b,1)=2$. Thus $0\le a\le3$ and $b=2$, giving $n=9,18,36,72$.

Each pair of allowed exponents gives exactly one positive integer by unique factorization. When all the conditions separate by prime, their numbers of choices multiply. An extra restriction on the size or digit sum of $n$ can couple the choices, so independence must follow from the actual conditions rather than from factorization alone.

For addition, extract the smaller common power. If $u=p^rU$, $v=p^sV$, where $p$ divides neither $U$ nor $V$, and $r\lt s$, then

$$u+v=p^r(U+p^{s-r}V).$$

The term in parentheses is not divisible by $p$, since it is congruent to $U$. Thus $v_p(u+v)=r$ when the valuations differ. When $r=s$, the same extraction gives $p^r(U+V)$, and the new sum may contribute more copies of $p$. In particular, $48+80=2^4(3+5)=2^7$. For two, both remaining parts are odd, so an equal-valuation sum always gains at least one extra factor; for an odd prime it need not.

A different way to simplify powers is to find a modulus for which a power agrees with its base. The factorization $n^3-n=(n-1)n(n+1)$ contains an even factor and a multiple of three, so $n^3\equiv n\pmod6$ for every integer $n$.

The congruences $n^5\equiv n\pmod{30}$ and $n^7\equiv n\pmod{42}$ follow one prime at a time. For exponent five, Fermat's little theorem gives the assertion modulo five, while modulo two and three it follows because the exponent minus one is a multiple of their Fermat exponents. If a prime divides $n$, both sides are zero modulo that prime. Combining the coprime prime factors $2,3,5$ gives thirty. The same argument with $2,3,7$ and exponent seven gives forty-two. These are instances of [[power-minus-self|universal divisibility of a power minus its base]].

Such a congruence can be added across many terms: $1^3+\cdots+10^3=3025$ and $1+\cdots+10=55$ both leave remainder one modulo six. It does not allow an arbitrary exponent to be replaced by one for an arbitrary modulus; the prime-by-prime conditions are what justify the replacement.

An arithmetic function assigns a value to each positive integer. It is [[multiplicative-functions|multiplicative]] when $f(1)=1$ and $f(uv)=f(u)f(v)$ for coprime $u,v$. Coprimality gives each divisor of $uv$ a unique decomposition as a divisor of $u$ times a divisor of $v$. Counting these pairs proves multiplicativity of the divisor count, and summing their products proves it for the divisor sum.

For the totient, the Chinese remainder theorem pairs residues modulo coprime $u,v$ with residues modulo $uv$. A residue is coprime to $uv$ exactly when its two components are coprime to $u$ and $v$, respectively, proving $\varphi(uv)=\varphi(u)\varphi(v)$.

Consequently, prime-power values determine these functions on every positive integer. For $72=8\cdot9$, the sum of divisors is $(1+2+4+8)(1+3+9)=15\cdot13=195$. For $36=4\cdot9$, the totient is $2\cdot6=12$. The coprimality restriction cannot be dropped: $d(4)=3$, whereas $d(2)d(2)=4$.`,
      related: [
        { card: "lte", note: String.raw`the exponent of $p$ in $a^n - b^n$, for when a valuation of a difference of powers is needed.` },
        { card: "legendres-formula", note: String.raw`the valuation of a factorial (M3.4).` }
      ],
      exercises: [
        { q: String.raw`How many positive integers $n$ satisfy $\operatorname{lcm}(n, 30) = 180$?`, answer: "2",
          solution: String.raw`Any prime dividing $n$ must divide $180$, since $n$ divides its lcm with thirty. Write $n=2^a3^b5^c$. Comparing the lcm exponents with $30=2\cdot3\cdot5$ and $180=2^2\cdot3^2\cdot5$ gives $\max(a,1)=2$, $\max(b,1)=2$, and $\max(c,1)=1$. Thus $a=b=2$, while $c=0$ or one. The resulting integers $36,180$ both have lcm one hundred eighty with thirty, giving two solutions.` },
        { q: String.raw`What is the largest integer $k$ such that $2^k$ divides $48 + 80$?`, answer: "7",
          solution: String.raw`Both summands have valuation four at two. Extract that common power: $48+80=2^4(3+5)=2^4\cdot8=2^7$. After division by $2^7$, the quotient is one, so no higher power divides the sum. Thus the largest exponent is seven.` },
        { q: String.raw`What is the remainder when $1^5 + 2^5 + \cdots + 20^5$ is divided by $30$?`, answer: "0",
          solution: String.raw`For every integer $n$, the difference $n^5-n$ is divisible by two, three, and five, hence by thirty. The sum of fifth powers is therefore congruent to $1+2+\cdots+20=20\cdot21/2=210$. Since $210=30\cdot7$, the remainder is zero. The congruence is applied to each summand before adding.` },
        { q: String.raw`What is the sum of the positive divisors of $72$?`, answer: "195",
          solution: String.raw`Since $72=8\cdot9$ with coprime factors, each divisor is uniquely a divisor of eight times a divisor of nine. Summing those products gives $\sigma(72)=(1+2+4+8)(1+3+9)=15\cdot13=195$. The uniqueness of this decomposition is what permits multiplication of the two sums.` }
      ],
      problems: [
        "2009 AMC 10A, Problem 25",
        "2020 AMC 12A, Problem 21",
        "2023 AMC 12B, Problem 24"
      ]
    },
    "M6.3": {
      prereq: ["modular-basics", "fermats-little-theorem", "eulers-totient", "bezouts-identity"],
      cards: ["modular-inverse", "eulers-theorem", "wilsons-theorem"],
      body: String.raw`An integer $u$ is [[modular-inverse|an inverse of $a$ modulo $n\ge2$]] when $au\equiv1\pmod n$. If an inverse exists, a common divisor of $a,n$ divides both $au$ and $au-1$, so it must be one. Conversely, when $\gcd(a,n)=1$, [[bezouts-identity|Bézout's identity]] supplies integers $u,v$ with $au+nv=1$, giving an inverse.

Multiplying a congruence by the inverse is the valid form of division. In $7x\equiv3\pmod{10}$, the inverse of seven is three because $7\cdot3=21\equiv1$. Multiplication gives $x\equiv9\pmod{10}$, and $7\cdot9=63$ verifies the result. Inverses can be found by inspecting small multiples or by back-substitution in the Euclidean algorithm.

If $d=\gcd(a,n)\gt1$, there is no inverse modulo $n$. The equation $ax\equiv c\pmod n$ means $ax+ny=c$ for some integer $y$, so it is solvable exactly when $d\mid c$. Dividing this integer equation by $d$ changes the modulus as well:

$$\frac ad x\equiv\frac cd\pmod{n/d}.$$

For $6x\equiv9\pmod{15}$, division by three gives $2x\equiv3\pmod5$, so $x\equiv4\pmod5$. There are three residues modulo fifteen, $4,9,14$, satisfying the original condition. Keeping modulus fifteen after division would lose solutions. In general a solvable linear congruence has $d$ solutions modulo $n$; if $n\mid a$ and $n\mid c$, every residue works.

For powers of a coprime base, multiplication permutes the residues coprime to $n$. Indeed, $ar\equiv as\pmod n$ allows cancellation of $a$, so different residues remain different. Multiplying all $\varphi(n)$ residues before and after the permutation gives $a^{\varphi(n)}P\equiv P$, where $P$ is their product. Each factor of $P$ is coprime to $n$, so $P$ can be canceled. This proves [[eulers-theorem|Euler's theorem]]:

$$a^{\varphi(n)}\equiv1\pmod n\quad\text{when }\gcd(a,n)=1.$$

At modulus one hundred, $\varphi(100)=40$. Thus $3^{42}\equiv3^2=9\pmod{100}$, and its last two digits are $09$. Euler's exponent is a guaranteed period, not necessarily the smallest one. The coprimality condition is essential: $2^4\equiv0\pmod8$, although $\varphi(8)=4$, so replacing its exponent by zero would incorrectly give one.

Factorials have a useful remainder when the modulus is prime. For a prime $p$, every nonzero residue has an inverse. A residue pairs with itself only if $a^2\equiv1\pmod p$, which implies $p\mid(a-1)(a+1)$. Primality forces $a\equiv1$ or $-1$. All other residues pair with a different inverse and each pair has product one.

The diagram displays the pairing modulo eleven. Removing the inverse pairs leaves only one and ten, whose product is minus one modulo eleven.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 245" role="img" aria-labelledby="m63-pairs-title m63-pairs-desc" style="width:100%;max-width:520px;height:auto"><title id="m63-pairs-title">Inverse pairs explain Wilson's theorem modulo eleven</title><desc id="m63-pairs-desc">The pairs two and six, three and four, five and nine, and seven and eight each multiply to one modulo eleven. The unpaired self-inverse residues are one and ten. Their product is ten, or minus one modulo eleven.</desc><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M45 80V135H115V80"/><path d="M165 80V135H235V80"/><path d="M285 80V135H355V80"/><path d="M405 80V135H475V80"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="25">Inverse pairs modulo 11</text><text x="45" y="70">2</text><text x="115" y="70">6</text><text x="80" y="124">× ≡ 1</text><text x="165" y="70">3</text><text x="235" y="70">4</text><text x="200" y="124">× ≡ 1</text><text x="285" y="70">5</text><text x="355" y="70">9</text><text x="320" y="124">× ≡ 1</text><text x="405" y="70">7</text><text x="475" y="70">8</text><text x="440" y="124">× ≡ 1</text><text x="260" y="181">Self-inverse residues: 1 and 10</text><text x="260" y="220">10! ≡ 1 · 10 ≡ −1 (mod 11)</text></g></svg>

This proves [[wilsons-theorem|Wilson's theorem]]: $(p-1)!\equiv-1\pmod p$. The prime two satisfies the same statement directly, since $1!=1\equiv-1\pmod2$. For a nearby factorial, retain the missing factors before canceling. Modulo seventeen, $16!=16\cdot15!\equiv-15!$, while Wilson gives $16!\equiv-1$, hence $15!\equiv1$.

The prime hypothesis cannot be used for a general composite modulus. If $n$ is composite, it has a divisor $d$ with $1\lt d\lt n$. Then $d$ divides $(n-1)!$, so that factorial cannot be minus one modulo $d$, and therefore cannot be minus one modulo $n$. The inverse-pair argument depends on every nonzero residue being invertible.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`finding an inverse modulo a large number.` },
        { card: "crt", note: String.raw`splitting a modulus such as $100 = 4 \cdot 25$ into coprime parts (M5.2).` },
        { card: "carmichael-function", note: String.raw`the smallest exponent that works for every $a$ coprime to $n$, often smaller than $\varphi(n)$.` }
      ],
      exercises: [
        { q: String.raw`What is the smallest positive integer $x$ with $7x \equiv 3 \pmod{10}$?`, answer: "9",
          solution: String.raw`Seven is coprime to ten, and its inverse is three because $7\cdot3=21\equiv1$. Multiplying the congruence by three gives $x\equiv9\pmod{10}$. Hence every integer solution is $x=9+10t$; its smallest positive member has $t=0$. Substitution gives $7\cdot9=63\equiv3$.` },
        { q: String.raw`What number is formed by the last two digits of $3^{42}$?`, answer: "9",
          solution: String.raw`The base three is coprime to one hundred, and $\varphi(100)=100(1-1/2)(1-1/5)=40$. Euler's theorem gives $3^{40}\equiv1$, so $3^{42}\equiv3^2=9\pmod{100}$. The two-digit block is $09$, whose numerical value is nine. A leading zero is retained when describing the block.` },
        { q: String.raw`What is the remainder when $15!$ is divided by $17$?`, answer: "1",
          solution: String.raw`Seventeen is prime, so Wilson's theorem gives $16!\equiv-1\pmod{17}$. Also $16!=16\cdot15!\equiv-15!$. Thus $-15!\equiv-1$, yielding $15!\equiv1$. This is already the representative in the remainder range from zero through sixteen.` },
        { q: String.raw`What is the remainder when $2 \cdot 26!$ is divided by $29$?`, answer: "28",
          solution: String.raw`Twenty-nine is prime, so $28!\equiv-1\pmod{29}$. The missing factors in $28!=28\cdot27\cdot26!$ have residues minus one and minus two, whose product is two. Consequently $2\cdot26!\equiv-1\equiv28\pmod{29}$. The requested factor two is exactly the product supplied by the missing terms.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 23"
      ]
    },
    "M6.4": {
      prereq: ["eulers-theorem", "cycle-hunting", "repeating-decimals"],
      cards: ["multiplicative-order"],
      body: String.raw`For a modulus $n\ge2$ and a base $a$ coprime to $n$, Euler's theorem guarantees a positive power congruent to one. The smallest positive exponent $d$ with $a^d\equiv1\pmod n$ is [[multiplicative-order|the multiplicative order of $a$ modulo $n$]]. Specifying the base, modulus, and coprimality is part of the definition.

Every exponent $k\ge0$ can be written $k=qd+r$ with $0\le r\lt d$. Then $a^k\equiv a^r$. If $a^k\equiv1$ and $r$ were positive, $r$ would be a smaller exponent returning to one, contrary to the definition. Thus

$$a^k\equiv1\pmod n\quad\Longleftrightarrow\quad d\mid k.$$

The same cancellation shows that $a^i\equiv a^j$ exactly when $i\equiv j\pmod d$ for nonnegative $i,j$. The cycle contains $d$ different residues, with exponent zero corresponding to one. In particular, applying the divisibility statement to Euler's exponent proves $d\mid\varphi(n)$; knowing only $d\le\varphi(n)$ would be weaker.

For two modulo thirty-one, the powers at exponents one through five are $2,4,8,16,1$. Thus the order is five, and $31\mid2^k-1$ precisely for multiples of five. In the range $1\le k\le100$, there are twenty such exponents.

To find an order, factor a known exponent $T$ with $a^T\equiv1$ and test its divisors. Modulo seven, $T=\varphi(7)=6$ restricts the order of three to $1,2,3,6$. The values $3^1\equiv3$, $3^2\equiv2$, and $3^3\equiv6$ rule out the proper divisors, so the order is six. Testing only exponent five, for example, would say nothing about the other candidates.

Decimal periods use the base ten. For $n\gt1$ coprime to ten, a block of $k$ digits with value $B$ repeats to give $B/(10^k-1)$. Consequently $1/n$ has a repeating block of length $k$ exactly when $n\mid10^k-1$. Its least period is therefore the order of ten modulo $n$.

Long division explains the same result as a cycle of remainders. From a current remainder $r$, divide $10r$ by $n$: its quotient digit is next in the decimal, and its remainder is the new state. For $1/41$, the states and digits are as follows. The return to remainder one restarts the entire process, including the initial zero digit.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 305" role="img" aria-labelledby="m64-decimal-title m64-decimal-desc" style="width:100%;max-width:520px;height:auto"><title id="m64-decimal-title">Five long-division steps for one forty-first</title><desc id="m64-decimal-desc">Remainders one, ten, eighteen, sixteen, and thirty-seven produce digits zero, two, four, three, and nine. The next remainder is one, so the block zero two four three nine repeats with period five.</desc><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="24">Long division of 1 by 41</text><text x="85" y="60">Remainder r</text><text x="205" y="60">10r</text><text x="315" y="60">Digit</text><text x="440" y="60">Next remainder</text><text x="85" y="96">1</text><text x="205" y="96">10</text><text x="315" y="96">0</text><text x="440" y="96">10</text><text x="85" y="130">10</text><text x="205" y="130">100</text><text x="315" y="130">2</text><text x="440" y="130">18</text><text x="85" y="164">18</text><text x="205" y="164">180</text><text x="315" y="164">4</text><text x="440" y="164">16</text><text x="85" y="198">16</text><text x="205" y="198">160</text><text x="315" y="198">3</text><text x="440" y="198">37</text><text x="85" y="232">37</text><text x="205" y="232">370</text><text x="315" y="232">9</text><text x="440" y="232">1</text><text x="260" y="282">Digits: 02439; return to remainder 1</text></g><path d="M25 71H495" stroke="currentColor" opacity="0.4"/></svg>

The remainders $1,10,18,16,37$ are distinct, and the next is one, so the least period is five: $1/41=0.\overline{02439}$. Leading zeros count as digits in the block. Similarly, modulo thirteen the powers of ten are $10,9,12,3,4,1$, giving period six.

If the denominator shares a factor with ten, this order is not defined. For a reduced fraction, first separate the factors two and five from the denominator. They produce a nonrepeating initial segment; any remaining denominator coprime to ten determines the later period. A denominator containing only twos and fives instead gives a terminating decimal. Thus an eventual decimal cycle and an order returning to the initial remainder are distinct situations.`,
      related: [
        { card: "carmichael-function", note: String.raw`the largest order of any number modulo $n$.` },
        { card: "last-digit-patterns", note: String.raw`last-digit cycles; an order modulo ten applies only to a base coprime to ten (M4.3).` }
      ],
      exercises: [
        { q: String.raw`What is the order of $3$ modulo $7$?`, answer: "6",
          solution: String.raw`The residues of $3^1,\ldots,3^6$ modulo seven are $3,2,6,4,5,1$. The first return to one is at exponent six, so the order is six. The list verifies both that exponent six works and that no smaller positive exponent does.` },
        { q: String.raw`For how many integers $k$ with $1 \le k \le 100$ is $2^k - 1$ divisible by $31$?`, answer: "20",
          solution: String.raw`The residues of $2^1,\ldots,2^5$ modulo thirty-one are $2,4,8,16,1$, proving that the order is five. Therefore $2^k\equiv1$ exactly when five divides $k$. In the range one through one hundred, these are $5,10,\ldots,100$, a total of twenty exponents.` },
        { q: String.raw`How many digits are in the repeating block of the decimal for $\tfrac{1}{41}$?`, answer: "5",
          solution: String.raw`The denominator forty-one is coprime to ten, so the least decimal period is the order of ten modulo forty-one. The first five positive powers have residues $10,18,16,37,1$, so that order is five. Long division gives $1/41=0.\overline{02439}$; the initial zero is one of the five digits. Indeed, $41\cdot2439=99999$.` }
      ],
      problems: [
        "2018 AMC 10B, Problem 13",
        "2016 AMC 12B, Problem 22"
      ]
    },
    "M6.5": {
      prereq: ["difference-of-squares-rep"],
      cards: ["pell-equation"],
      body: String.raw`A [[pell-equation|Pell equation]] has the form $x^2-Dy^2=1$, where $D$ is a positive integer that is not a square. We first seek positive integer $x,y$. The restriction on $D$ matters: for $D=s^2$, factoring $(x-sy)(x+sy)=1$ forces $y=0$, leaving no positive solution.

The expression $x+y\sqrt D$ has a conjugate $x-y\sqrt D$, and their product, $x^2-Dy^2$, is called its norm. Multiplying two expressions multiplies their norms. Thus two norm-one solutions produce another through

$$(x+y\sqrt D)(u+v\sqrt D)=(xu+Dyv)+(xv+yu)\sqrt D.$$

The new coefficients are integers and again satisfy the Pell equation. This proves that powers of a known positive solution generate solutions. For $D=2$, testing $y=1$ gives no integer $x$, while $y=2$ gives $x=3$. Multiplication by $3+2\sqrt2$ yields

$$x_{k+1}=3x_k+4y_k,\qquad y_{k+1}=2x_k+3y_k.$$

Starting at $(1,0)$ gives $(3,2),(17,12),(99,70),(577,408)$ and then $(3363,2378)$. Both coordinates increase after the first step. For $D=3$, the smallest positive solution is $(2,1)$, giving $(7,4)$ and $(26,15)$ by multiplication by $2+\sqrt3$.

Generating solutions alone does not prove that none were skipped. Let $\varepsilon=x_1+y_1\sqrt D$ be the smallest such expression with positive integer coefficients and norm one. For any other positive solution $\alpha=x+y\sqrt D$, choose a nonnegative integer $k$ with $\varepsilon^k\le\alpha\lt\varepsilon^{k+1}$. Then $\beta=\alpha\varepsilon^{-k}$ lies in $[1,\varepsilon)$.

Since $\varepsilon^{-1}=x_1-y_1\sqrt D$, the expression $\beta=X+Y\sqrt D$ still has integer coefficients and norm one. Its conjugate is $1/\beta$, so

$$X=\frac{\beta+\beta^{-1}}2,\qquad Y=\frac{\beta-\beta^{-1}}{2\sqrt D}.$$

If $\beta\gt1$, both coefficients are positive and give a smaller positive solution, contradicting the choice of $\varepsilon$. Therefore $\beta=1$, so $\alpha=\varepsilon^k$. This proves that every positive solution is generated once a smallest positive solution has been established. The existence of a positive solution for every positive nonsquare $D$ is a deeper theorem, proved using continued fractions; trial alone does not prove it in general. For the explicit values two and three, the exhibited solutions establish existence directly.

A square triangular number gives a useful application. If $n(n+1)/2=m^2$, multiplying by eight and completing the square gives

$$(2n+1)^2-8m^2=1.$$

Set $x=2n+1$, $y=2m$ to obtain $x^2-2y^2=1$. Conversely, every positive solution of this equation has even $y$ and odd $x$. An odd $y$ would give $x^2\equiv3\pmod4$, which is impossible; once $y$ is even, $x$ must be odd. Thus the substitutions recover integers $n=(x-1)/2$ and $m=y/2$.

The first four Pell pairs give $n=1,8,49,288$ and $m=1,6,35,204$. Their square triangular values are $1,36,1225,41616$. Because the Pell coordinates increase and the generation is complete, these really are the first four, rather than just four examples.

The equation with right side minus one is a different problem: a positive nonsquare $D$ does not guarantee its solvability, and powers of a norm-one solution alone keep the right side one. Likewise, trial lists for an equation $x^2-Dy^2=N$ with other $N$ need not form a single family. For the norm-one equation, the trivial solution is $(1,0)$, and independent sign changes of positive solutions supply the corresponding signed solutions.`,
      related: [
        { card: "triangular-numbers", note: String.raw`the numbers $\tfrac{n(n+1)}{2}$, whose square members come from a Pell equation.` },
        { card: "pythagorean-triples", note: String.raw`right triangles with legs that differ by $1$ lead to $x^2 - 2y^2 = -1$ (M5.5).` }
      ],
      exercises: [
        { q: String.raw`The solutions of $x^2 - 3y^2 = 1$ in positive integers begin $(2, 1)$ and $(7, 4)$. What is $x$ in the next solution?`, answer: "26",
          solution: String.raw`For $D=3$, the fundamental positive solution is $(2,1)$, so consecutive positive solutions arise by multiplying by $2+\sqrt3$. Applying this to $7+4\sqrt3$ gives $(7\cdot2+3\cdot4)+(7+4\cdot2)\sqrt3=26+15\sqrt3$. The norm check is $26^2-3\cdot15^2=676-675=1$. Completeness and increasing powers show that this is the next solution, with $x=26$.` },
        { q: String.raw`What is the smallest integer $y \gt 2$ such that $2y^2 + 1$ is a perfect square?`, answer: "12",
          solution: String.raw`The condition is $x^2-2y^2=1$ with positive $x,y$. The fundamental solution is $(3,2)$, and its next power is $(3+2\sqrt2)^2=17+12\sqrt2$. All positive solutions are powers of this fundamental expression and their $y$ coordinates increase, so none lies between $y=2$ and $y=12$. The required minimum is twelve, with $2\cdot12^2+1=289=17^2$.` },
        { q: String.raw`How many solutions of $x^2 - 2y^2 = 1$ in positive integers have $x \lt 1000$?`, answer: "4",
          solution: String.raw`Starting from $(1,0)$, multiply successively by $3+2\sqrt2$, or use $x'=3x+4y$, $y'=2x+3y$. This gives $(3,2),(17,12),(99,70),(577,408),(3363,2378)$. These generate every positive solution and increase strictly. The first four have $x\lt1000$, while the fifth and all later ones exceed the bound. Thus the count is four.` }
      ],
      problems: [
        "2022 AMC 12A, Problem 16"
      ]
    },
    "M6.6": {
      prereq: ["exponent-tracking", "p-adic-valuation", "power-minus-self", "multiplicative-functions", "modular-inverse", "eulers-theorem", "wilsons-theorem", "multiplicative-order", "pell-equation"],
      cards: [],
      body: String.raw`Prime exponents make multiplication, divisibility, gcds, and lcms precise one prime at a time. Their addition and minimum/maximum rules follow from unique factorization. A sum requires a different argument: extract the smaller common power and inspect the remaining terms, especially when the valuations are equal. Counts multiply across primes only when the given restrictions allow the exponent choices independently.

Modular division uses an inverse and requires coprimality with the modulus. When a multiplier and modulus share a gcd, a solvable linear congruence reduces to a smaller modulus and may have several solutions in the original one. Euler's theorem proves a period for a coprime base; the order is the least period and divides every exponent returning the base to one. Decimal repetition is the same order question for the base ten after the denominator's factors two and five are separated.

Wilson's theorem follows by pairing inverses modulo a prime, leaving only one and minus one. Factorials near $(p-1)!$ can then be handled by retaining and canceling the missing factors. The prime and coprimality hypotheses are what make these cancellations valid.

For Pell equations, a norm identity generates new integer solutions. A separate argument using the smallest positive norm-one expression proves completeness. Applications must also reverse their substitutions and check parity, positivity, and any size bounds. Finding a plausible sequence of candidates is only the first part of classifying every solution.`,
      strategies: [
        String.raw`Write gcd, lcm, and product conditions prime by prime; multiply counts only after establishing independent exponent choices.`,
        String.raw`In a sum of two terms with the same number of factors of $p$, take that power out and look at what is left.`,
        String.raw`Replace $n^3$ by $n$ modulo $6$, and $n^5$ by $n$ modulo $30$.`,
        String.raw`Before dividing a congruence, check that the divisor is coprime to the modulus.`,
        String.raw`For a base coprime to the modulus, reduce a large exponent using a verified period, such as its order or $\varphi(n)$.`,
        String.raw`Write the large factors of a factorial modulo $p$ as $-1, -2, \ldots$ and use Wilson's theorem.`,
        String.raw`When completing a square gives a Pell equation, check its nonsquare parameter, establish the fundamental positive solution, and reverse the substitution.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is $\varphi(100)$, the number of positive integers up to $100$ that are coprime to $100$?`, answer: "40",
        solution: String.raw`A number up to one hundred is coprime to one hundred exactly when it is divisible by neither two nor five. Inclusion-exclusion gives $100-50-20+10=40$. Alternatively, multiplicativity across $100=4\cdot25$ gives $\varphi(4)\varphi(25)=2\cdot20=40$, with the coprimality of four and twenty-five justifying the product.` },
      { q: String.raw`What is the remainder when $2^{2026}$ is divided by $15$?`, answer: "4",
        solution: String.raw`The base two is coprime to fifteen. Its powers at exponents one through four have residues $2,4,8,1$, so its order is four. Since $2026=4\cdot506+2$, the remainder is $2^2=4$. A verified return to one is the reason the exponent can be reduced.` },
      { q: String.raw`Find the integer $x$ with $0 \le x \lt 17$ and $5x \equiv 1 \pmod{17}$.`, answer: "7",
        solution: String.raw`The identity $5\cdot7-17\cdot2=1$ shows that seven is an inverse of five modulo seventeen. Hence $x\equiv7\pmod{17}$. In the interval $0\le x\lt17$ there is exactly one representative, namely seven; uniqueness follows because five is coprime to the modulus.` },
      { q: String.raw`What is the remainder when $1^7 + 2^7 + \cdots + 12^7$ is divided by $42$?`, answer: "36",
        solution: String.raw`For every integer $n$, $n^7\equiv n$ modulo two, three, and seven: for a coprime base, each prime's Fermat exponent divides six, while a base divisible by the prime gives zero on both sides. Combining these congruences gives the same statement modulo forty-two. Thus the sum is congruent to $1+2+\cdots+12=12\cdot13/2=78=42+36$, leaving remainder thirty-six.` },
      { q: String.raw`What is the remainder when $17!$ is divided by $19$?`, answer: "1",
        solution: String.raw`Nineteen is prime, so Wilson gives $18!\equiv-1\pmod{19}$. Since $18!=18\cdot17!\equiv-17!$, it follows that $-17!\equiv-1$, hence $17!\equiv1$. No factor divisible by nineteen was canceled.` }
    ],
    problems: [
      "1985 AIME, Problem 7",
      "2016 AIME II, Problem 8"
    ]
  },
  challenge: {
    problems: [
      "2022 AMC 12A, Problem 23",
      "1987 AIME, Problem 7",
      "2021 Fall AMC 12A, Problem 25",
      "2025 AMC 10B, Problem 25"
    ]
  }
};
