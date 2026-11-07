// Learn, AMC Number Theory, chapter M3: divisors and factorials (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M3"] = {
  lessons: {
    "M3.1": {
      prereq: ["fundamental-theorem-arithmetic"],
      cards: [],
      body: String.raw`Prime factorization describes a number by the copies of each prime it contains. A positive divisor chooses how many of those copies to use. If $72=2^3\cdot3^2$, a divisor has form $2^a3^b$ with $0\le a\le3$ and $0\le b\le2$. These independent choices produce twelve divisors.

The same choices can be combined in several ways. Counting them gives the number of divisors. Adding their values amounts to expanding $(1+2+4+8)(1+3+9)$. Pairing a divisor $d$ with $72/d$ instead makes the product of each pair equal seventy-two. The prime exponents organize all three calculations.

A restriction changes the permitted choices. A square divisor uses an even exponent at every prime; an odd divisor uses no factor of two. These conditions must hold for the divisor being chosen, even when the original number is neither square nor odd.

Factorials bring the same viewpoint to a product with many factors. In $50!=1\cdot2\cdots50$, each multiple of five contributes at least one factor five, and each multiple of twenty-five contributes a second. There are ten of the former and two of the latter, giving twelve factors of five. Since there are at least as many factors of two, exactly twelve factors ten can be assembled, producing twelve trailing decimal zeros.

The chapter develops divisor counts, sums, and products, then counts prime exponents in factorials. It finishes with consecutive factors and common-divisor arguments. In each case, the prime copies used by a product or divisor must match the available exponents.`,
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
      body: String.raw`Let $n=p_1^{a_1}\cdots p_k^{a_k}$ be the prime factorization of a positive integer greater than one. A positive divisor has a unique representation $d=p_1^{b_1}\cdots p_k^{b_k}$ with $0\le b_i\le a_i$. Conversely, every permitted exponent choice gives a divisor. Uniqueness of prime factorization ensures that different choices give different divisors.

There are $a_i+1$ choices at the $i$th prime, and the choices are independent. Thus [[number-of-divisors|the divisor count]] is $\tau(n)=(a_1+1)\cdots(a_k+1)$. For $720=2^4\cdot3^2\cdot5$, it is $5\cdot3\cdot2=30$. For $n=1$, the only positive divisor is one; the empty product gives the same count.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 350" role="img" aria-labelledby="m32-exponents-title m32-exponents-desc" style="width:100%;max-width:520px;height:auto"><title id="m32-exponents-title">Divisors form a grid of independent prime exponents</title><desc id="m32-exponents-desc">Five columns choose the exponent of two from zero to four, and three rows choose the exponent of three from zero to two. The fifteen cells are the divisors of one hundred forty-four. Cells with both exponents even mark one, four, sixteen, nine, thirty-six and one hundred forty-four. A further choice of whether to multiply by five gives thirty divisors of seven hundred twenty.</desc><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="24">Divisors of 2⁴ × 3²</text><text x="285" y="53">Exponent of 2</text><text transform="translate(32 182) rotate(-90)">Exponent of 3</text><text x="135" y="85">0</text><text x="210" y="85">1</text><text x="285" y="85">2</text><text x="360" y="85">3</text><text x="435" y="85">4</text><text x="75" y="128">0</text><text x="75" y="188">1</text><text x="75" y="248">2</text></g><rect x="100" y="98" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="135" y="129" fill="currentColor" text-anchor="middle" font-size="17">1</text><rect x="175" y="98" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="210" y="129" fill="currentColor" text-anchor="middle" font-size="17">2</text><rect x="250" y="98" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="285" y="129" fill="currentColor" text-anchor="middle" font-size="17">4</text><rect x="325" y="98" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="360" y="129" fill="currentColor" text-anchor="middle" font-size="17">8</text><rect x="400" y="98" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="435" y="129" fill="currentColor" text-anchor="middle" font-size="17">16</text><rect x="100" y="158" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="135" y="189" fill="currentColor" text-anchor="middle" font-size="17">3</text><rect x="175" y="158" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="210" y="189" fill="currentColor" text-anchor="middle" font-size="17">6</text><rect x="250" y="158" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="285" y="189" fill="currentColor" text-anchor="middle" font-size="17">12</text><rect x="325" y="158" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="360" y="189" fill="currentColor" text-anchor="middle" font-size="17">24</text><rect x="400" y="158" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="435" y="189" fill="currentColor" text-anchor="middle" font-size="17">48</text><rect x="100" y="218" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="135" y="249" fill="currentColor" text-anchor="middle" font-size="17">9</text><rect x="175" y="218" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="210" y="249" fill="currentColor" text-anchor="middle" font-size="17">18</text><rect x="250" y="218" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="285" y="249" fill="currentColor" text-anchor="middle" font-size="17">36</text><rect x="325" y="218" width="70" height="48" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-width="0.4"/><text x="360" y="249" fill="currentColor" text-anchor="middle" font-size="17">72</text><rect x="400" y="218" width="70" height="48" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6"/><text x="435" y="249" fill="currentColor" text-anchor="middle" font-size="17">144</text><g fill="currentColor" text-anchor="middle" font-size="15"><text x="260" y="303">Even exponents select the six square divisors</text><text x="260" y="330">Multiplying each entry by 5 gives 720’s other 15 divisors</text></g></svg>

The grid shows the fifteen choices for $2^a3^b$ with $0\le a\le4$ and $0\le b\le2$. Choosing exponent zero or one for the additional prime five doubles the count to thirty for $720$.

For [[perfect-square-divisors|square divisors]], each exponent must be even. The choices at two are $0,2,4$, at three are $0,2$, and at five only zero. This gives six square divisors: $1,4,9,16,36,144$. In general the count is $\prod_i(\lfloor a_i/2\rfloor+1)$. A divisor that is a perfect $r$th power, for a positive integer $r$, instead uses exponents divisible by $r$.

Other restrictions translate in the same way. An odd divisor of $720$ fixes the exponent at two to zero, leaving $3\cdot2=6$ choices. A divisor divisible by six must use at least one two and one three, giving $4\cdot2\cdot2=16$ choices. The bounds apply separately at the required primes.

The formula also identifies when $\tau(n)$ is odd. A product of the integers $a_i+1$ is odd exactly when every $a_i$ is even, which says that $n$ is a square. Equivalently, the correspondence $d\leftrightarrow n/d$ pairs all divisors except a possible middle divisor $\sqrt n$. That unpaired divisor exists precisely for a square.

To reverse a divisor count, factor the count into possible integers $a_i+1\ge2$. For $\tau(n)=6$, the possibilities are $n=p^5$ or $n=p^2q$ with distinct primes $p,q$. To minimize a product of prime powers, use small primes and put larger exponents on smaller primes: if $p\lt q$ and $u\gt v$, then $p^uq^v\lt p^vq^u$, as their ratio is $(p/q)^{u-v}\lt1$. The least possibilities are therefore $2^5=32$ and $2^2\cdot3=12$, so twelve is the smallest integer with six divisors.`,
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
      body: String.raw`The sum of positive divisors can be built by the same independent choices used to count them. For $100=2^2\cdot5^2$, expand $(1+2+4)(1+5+25)$. Every term selects a power of two and a power of five, producing each divisor exactly once. Therefore the sum is $7\cdot31=217$.

For $n=p_1^{a_1}\cdots p_k^{a_k}$, this argument proves [[sum-of-divisors|the divisor-sum formula]]

$$\sigma(n)=\prod_{i=1}^k(1+p_i+\cdots+p_i^{a_i})
=\prod_{i=1}^k\frac{p_i^{a_i+1}-1}{p_i-1}.$$

Each factor is a finite geometric sum. The formula includes one and $n$ among the divisors. If a problem asks for proper positive divisors, excluding $n$, subtract $n$ from the result. For example, twelve has divisor sum twenty-eight and proper-divisor sum sixteen.

Restrictions change the sums of allowed powers. The odd divisors of $360=2^3\cdot3^2\cdot5$ use exponent zero at two, so their sum is $(1+3+9)(1+5)=78$. The omitted factor has value one. For square divisors, keep only even powers in every factor instead.

To multiply all divisors, pairing is more useful than expansion. The map $d\mapsto n/d$ permutes the positive divisors, so if their product is $D$,

$$D^2=\prod_{d\mid n}d\cdot\prod_{d\mid n}\frac nd
=\prod_{d\mid n}n=n^{\tau(n)}.$$

Taking the positive square root proves [[product-of-divisors|the divisor-product formula]] $D=n^{\tau(n)/2}$. Here $D$ is positive because every divisor is positive.

For $30$, the eight divisors form four pairs, each of product thirty, so $D=30^4=810000$. A square needs care with its middle divisor:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 330" role="img" aria-labelledby="m33-pairs-title m33-pairs-desc" style="width:100%;max-width:520px;height:auto"><title id="m33-pairs-title">Four complementary divisor pairs and a single middle divisor</title><desc id="m33-pairs-desc">The pairs one and thirty-six, two and eighteen, three and twelve, four and nine each multiply to thirty-six. Six occurs once as the middle divisor, so the product is thirty-six to the fourth times six.</desc><g fill="currentColor" font-size="18" text-anchor="middle"><text x="250" y="26">Complementary divisors of 36</text><text x="100" y="76">1</text><text x="160" y="76">×</text><text x="220" y="76">36</text><text x="300" y="76">=</text><text x="360" y="76">36</text><text x="100" y="118">2</text><text x="160" y="118">×</text><text x="220" y="118">18</text><text x="300" y="118">=</text><text x="360" y="118">36</text><text x="100" y="160">3</text><text x="160" y="160">×</text><text x="220" y="160">12</text><text x="300" y="160">=</text><text x="360" y="160">36</text><text x="100" y="202">4</text><text x="160" y="202">×</text><text x="220" y="202">9</text><text x="300" y="202">=</text><text x="360" y="202">36</text><text x="160" y="257">6</text><text x="325" y="257" font-size="16">one middle divisor</text><text x="250" y="311">Product = 36⁴ × 6</text></g><circle cx="160" cy="251" r="20" fill="none" stroke="currentColor"/></svg>

For $36$, the four displayed pairs contribute $36^4$, while the single middle divisor contributes six. The product is $36^4\cdot6=36^{9/2}$. Counting the middle divisor twice as a fifth pair would incorrectly introduce a second copy of six. The identity for $D^2$ handles both even and odd divisor counts without that ambiguity.`,
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
      body: String.raw`In a product, the exponent of a prime is the sum of its exponents in the individual factors. For $n!$, we can collect those contributions by asking which integers from one through $n$ supply a first, second, or later copy of the prime.

Every multiple of a prime $p$ supplies at least one copy. Every multiple of $p^2$ supplies an additional copy, and every multiple of $p^3$ another. An integer divisible by $p^j$ but not $p^{j+1}$ is counted once in each of the first $j$ groups, exactly matching its exponent.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 285" role="img" aria-labelledby="m34-layers-title m34-layers-desc" style="width:100%;max-width:520px;height:auto"><title id="m34-layers-title">Prime exponents in a factorial accumulate in layers</title><desc id="m34-layers-desc">The ten multiples of three up to thirty each contribute a first copy of three. Nine, eighteen and twenty-seven contribute a second, and twenty-seven contributes a third. The row counts ten, three and one add to fourteen.</desc><g fill="currentColor" font-size="16" text-anchor="middle"><text x="280" y="24">Copies of the prime 3 in 30!</text><text x="510" y="60">Count</text><text x="105" y="60">3</text><circle cx="105" cy="95" r="5.5"/><text x="144" y="60">6</text><circle cx="144" cy="95" r="5.5"/><text x="183" y="60">9</text><circle cx="183" cy="95" r="5.5"/><circle cx="183" cy="140" r="5.5"/><text x="222" y="60">12</text><circle cx="222" cy="95" r="5.5"/><text x="261" y="60">15</text><circle cx="261" cy="95" r="5.5"/><text x="300" y="60">18</text><circle cx="300" cy="95" r="5.5"/><circle cx="300" cy="140" r="5.5"/><text x="339" y="60">21</text><circle cx="339" cy="95" r="5.5"/><text x="378" y="60">24</text><circle cx="378" cy="95" r="5.5"/><text x="417" y="60">27</text><circle cx="417" cy="95" r="5.5"/><circle cx="417" cy="140" r="5.5"/><circle cx="417" cy="185" r="5.5"/><text x="456" y="60">30</text><circle cx="456" cy="95" r="5.5"/><text x="50" y="100">3</text><text x="510" y="100">10</text><text x="50" y="145">9</text><text x="510" y="145">3</text><text x="50" y="190">27</text><text x="510" y="190">1</text><text x="280" y="233">Rows: multiples of 3, 9, 27</text><text x="280" y="263">10 + 3 + 1 = 14 factors of 3</text></g></svg>

For the prime three in $30!$, the first group has ten integers, the second has three, and the third has one. In particular, twenty-seven contributes once in each group, for its three copies of three. The total exponent is fourteen.

Counting each group by a floor gives [[legendres-formula|Legendre's formula]]:

$$E_p(n!)=\left\lfloor\frac np\right\rfloor+
\left\lfloor\frac n{p^2}\right\rfloor+
\left\lfloor\frac n{p^3}\right\rfloor+\cdots.$$

Here $E_p$ denotes the exponent of the prime $p$. Terms are zero once $p^j\gt n$, so only finitely many contribute. The primality assumption matters; composite factors require separate accounting for their primes.

For a base $B=\prod_i p_i^{c_i}$, each copy of $B$ uses $c_i$ copies of $p_i$. Thus the largest exponent $K$ with $B^K\mid n!$ is

$$K=\min_i\left\lfloor\frac{E_{p_i}(n!)}{c_i}\right\rfloor.$$

For $20!$, the exponents at two and three are $10+5+2+1=18$ and $6+2=8$. Consequently the largest power of six is $6^8$. For $72=2^3\cdot3^2$, the possible counts are instead $\lfloor18/3\rfloor=6$ and $\lfloor8/2\rfloor=4$, so the largest power of seventy-two is $72^4$. Compare the number of complete groups available, not just the raw prime exponents.

[[trailing-zeros|Trailing zeros]] in base ten count complete factors of $10=2\cdot5$. For a factorial the exponent at two is at least the exponent at five, since every floor for $2^j$ is at least the corresponding floor for $5^j$. Thus the count is $E_5(n!)$. For $125!$ it is $25+5+1=31$.

The count need not increase one at a time. The factorial $24!$ has four trailing zeros, while multiplication by $25=5^2$ makes $25!$ have six. All later factorials have at least six, so no factorial has exactly five trailing zeros. This jump is explained by the two new copies of five in the single factor twenty-five.`,
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
      body: String.raw`A factorial sum shares long initial products. In $8!+9!$, both terms contain $8!$, so factoring gives $8!(1+9)=10\cdot8!$. Division by $7!$ now leaves $8\cdot10=80$. More generally, $n!+(n+1)!=n!(n+2)$ for nonnegative integers $n$. [[factor-out-factorial|Removing the smallest factorial]] makes the remaining factors explicit before any large arithmetic.

Products can contain a repeated factorial too. The expression $99!\cdot100!$ equals $(99!)^2\cdot100=(10\cdot99!)^2$. In general $n!(n+1)!=(n!)^2(n+1)$ is a square exactly when $n+1$ is a square: the squared factorial already contributes even prime exponents.

A [[consecutive-product-factorial|product of $k$ consecutive positive integers]] has another useful factor. For a block starting at $m\ge1$,

$$m(m+1)\cdots(m+k-1)=k!\binom{m+k-1}{k}.$$

The binomial coefficient is an integer because it counts $k$-element subsets of an $(m+k-1)$-element set. Therefore $k!$ divides the product. For three consecutive integers, the divisor is $3!=6$. It is the largest positive integer dividing every such product, since the starting block $1\cdot2\cdot3$ equals six itself. For a block of arbitrary integers, a zero factor makes divisibility immediate; an entirely negative block reduces, up to sign and reversed order, to a positive block.

Adjacent integers have a more specific relationship: any common divisor of $n$ and $n+1$ divides their difference one. Hence [[consecutive-coprime|adjacent integers are coprime]]. This does not say that every pair in a longer consecutive block is coprime; two and four share a factor despite belonging to the block $2,3,4$.

If coprime positive integers have a square product, the primes in one factor do not occur in the other. Each factor must therefore already have even prime exponents and be a square. A product $n(n+1)$ with $n\ge1$ cannot be square: it lies strictly between the consecutive squares $n^2$ and $(n+1)^2$. Also, $\gcd(k^2,k^2+1)=1$, so the fraction $k^2/(k^2+1)$ is already reduced.

For a [[gcd-substitution|gcd involving expressions]], preserve common divisors by subtracting an integer multiple. The identity

$$n^2+1-(n-1)(n+1)=2$$

gives $\gcd(n^2+1,n+1)=\gcd(2,n+1)$. The latter gcd is two when $n$ is odd and one when $n$ is even. At $n=7$, it gives $\gcd(50,8)=2$. The simplified gcd supplies a bound and an exact answer because the transformation preserves the full set of common divisors, not merely one direction of divisibility.`,
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
      body: String.raw`A divisor is a unique choice of prime exponents. [[number-of-divisors|Counting the choices]] gives $\tau(n)$, while [[perfect-square-divisors|restrictions such as being square]] keep only the permitted exponents. Reversing a count requires listing the possible exponent patterns and checking which assignments to primes make the number smallest.

[[sum-of-divisors|Expanding a product of power sums]] adds each divisor exactly once. [[product-of-divisors|Pairing complementary divisors]] instead controls their product, with a square's middle divisor counted only once. Both constructions include one and $n$ among the positive divisors.

[[legendres-formula|Counting multiples of successive prime powers]] gives exponents in a factorial. A composite base needs a specified number of copies of each prime, so divide each available exponent by that requirement and take the smallest whole-number result. [[trailing-zeros|Decimal trailing zeros of a factorial]] are the resulting count of factors ten, limited by the factors five.

[[factor-out-factorial|Common factorial factors]] simplify sums and products. [[consecutive-product-factorial|An integer binomial coefficient]] proves the universal $k!$ divisor for a block of $k$ consecutive integers. [[consecutive-coprime|Adjacent coprimality]] separates their prime factors, and [[gcd-substitution|subtracting multiples]] can reduce an expression gcd to one with a constant.`,
      strategies: [
        String.raw`Factor the number before counting, summing or multiplying its divisors.`,
        String.raw`Write a condition on a divisor as a rule on each exponent.`,
        String.raw`For a number with a given count of divisors, factor the count and match exponents.`,
        String.raw`For the exponent of a prime in $n!$, add the floors of $\tfrac{n}{p}$, $\tfrac{n}{p^2}$, and so on.`,
        String.raw`For a composite base, divide each available prime exponent by its exponent in the base, round down, and take the minimum.`,
        String.raw`Factor the smallest factorial out of a sum of factorials.`,
        String.raw`Simplify a gcd of expressions by subtracting integer multiples; if a constant remains, test its possible common factors.`
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
