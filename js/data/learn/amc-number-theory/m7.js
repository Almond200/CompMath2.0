// Learn, AMC Number Theory, chapter M7: from the AMC to the AIME (CONVENTIONS §14). Part: Toward the AIME.
// Content revision: mixed problems with reversible steps and checked worked solutions. No new cards.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M7"] = {
  lessons: {
    "M7.1": {
      prereq: ["modular-basics", "crt", "sfft"],
      cards: [],
      body: String.raw`Mixed number theory problems connect descriptions of the same integer. A digit string is also a place-value sum; a remainder condition is a divisibility statement; a perfect square may become one side of a difference of squares. The useful first step is often a change of representation that exposes one of these structures.

The chapters so far have justified the individual tools. This chapter combines them, often using one to restrict the input of another. For example, a power modulo a composite integer can first be evaluated modulo coprime factors, using a different argument for each factor, before the remainders are recombined.

A small example is $7^{2026}$ modulo one hundred. Since $7^4=2401\equiv1\pmod{100}$, the exponent reduces modulo four, giving $7^2\equiv49$. The reason for the reduction is the verified return to one, not the size of the exponent or the number of decimal digits requested.

Integer equations require the same attention to reversibility. The equation $xy=2x+3y$ becomes $(x-3)(y-2)=6$. Factor pairs create a finite candidate list, but positivity of $x,y$ must be translated into conditions on the shifted factors. A negative shifted factor is not automatically forbidden merely because the original variable is positive.

The lessons combine residues and cycles, factoring and bounds, and divisor counts with other restrictions. Each worked solution should establish why all possible answers enter its candidate list and why the accepted candidates satisfy the original conditions. The final requested quantity may be a count, a sum, or a remainder of that count, rather than the intermediate integers found along the way.`,
      exercises: [
        { q: String.raw`What number is formed by the last two digits of $7^{2026}$?`, answer: "49",
          solution: String.raw`The computation $7^4=2401\equiv1\pmod{100}$ provides a valid period because seven is coprime to one hundred. As $2026=4\cdot506+2$, $7^{2026}\equiv(7^4)^{506}7^2\equiv49\pmod{100}$. The remainder forty-nine is the requested final two-digit number.` },
        { q: String.raw`What is the smallest positive integer that leaves remainder $3$ on division by $4$, remainder $2$ on division by $5$, and remainder $1$ on division by $3$?`, answer: "7",
          solution: String.raw`Combine the first two conditions by writing $n=3+4t$. Modulo five, $3+4t\equiv2$ gives $t\equiv1\pmod5$, hence $n=7+20q$. The third condition gives $1+2q\equiv1\pmod3$, so $q\equiv0\pmod3$. Thus all solutions are $n=7+60s$. Its smallest positive member is seven, which has the required remainders.` },
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy = 2x + 3y$?`, answer: "4",
          solution: String.raw`Rearranging gives $(x-3)(y-2)=6$. A zero factor cannot occur. If $x-3$ is negative, positive $x$ leaves $x=1$ or two. These force $y-2=-3$ or $-6$, respectively, so $y$ is negative and the cases fail. Both factors must therefore be positive. The ordered pairs $(1,6),(2,3),(3,2),(6,1)$ give $(x,y)=(4,8),(5,5),(6,4),(9,3)$. Reversing the factorization verifies all four.` }
      ],
      problems: [
        "2004 AIME I, Problem 1",
        "1993 AIME, Problem 6",
        "1997 AIME, Problem 1"
      ]
    },
    "M7.2": {
      prereq: ["modular-basics", "cycle-hunting", "crt", "eulers-theorem", "multiplicative-order"],
      cards: [],
      body: String.raw`A remainder modulo a product of coprime integers is determined by its remainders modulo the factors. This follows from [[crt|the Chinese remainder theorem]]: two integers agreeing modulo both factors agree modulo their product. Splitting the modulus is useful when the base behaves differently on its prime-power factors.

For $2^{2026}$ modulo one thousand, the factors are eight and one hundred twenty-five. Modulo eight, every power with exponent at least three is zero, so there is no need for a period returning to one. Modulo one hundred twenty-five, two is coprime to the modulus and $\varphi(125)=100$, so [[eulers-theorem|Euler's theorem]] reduces the exponent to twenty-six.

The smaller power can be calculated by short repeated products: $2^7=128\equiv3\pmod{125}$, hence $2^{21}\equiv27$ and $2^{26}\equiv27\cdot32=864\equiv114$. We need a remainder $r$ with $r\equiv0\pmod8$ and $r\equiv114\pmod{125}$. Writing $r=114+125t$, the first condition becomes $2+5t\equiv0\pmod8$, so $t\equiv6\pmod8$. Taking $t=6$ gives $r=864$, already in the required range $0\le r\lt1000$.

The diagram separates the two arguments. The exponent is large enough to force divisibility on one branch, while coprimality permits exponent reduction on the other. Recombination needs both branches.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-labelledby="m72-split-title m72-split-desc" style="width:100%;max-width:520px;height:auto"><title id="m72-split-title">Different arguments for the two prime-power factors of one thousand</title><desc id="m72-split-desc">To find two to the power two thousand twenty-six modulo one thousand, work modulo eight and one hundred twenty-five. Divisibility gives zero modulo eight. Euler's theorem and a short power computation give one hundred fourteen modulo one hundred twenty-five. The combined remainder is eight hundred sixty-four.</desc><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M260 47L130 92M260 47L390 92M130 198L260 249M390 198L260 249"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="28">2²⁰²⁶ modulo 1000</text><text x="130" y="118">Modulo 8</text><text x="130" y="151">2026 ≥ 3</text><text x="130" y="184">Remainder 0</text><text x="390" y="118">Modulo 125</text><text x="390" y="151">2026 ≡ 26 (mod 100)</text><text x="390" y="184">Remainder 114</text><text x="260" y="277">CRT: remainder 864 modulo 1000</text></g></svg>

A power tower needs the period of the lower level to become the modulus for the exponent above it. Exponentiation is read from the top: $7^{7^7}$ means $7^{(7^7)}$, not $(7^7)^7$. The first four positive powers of seven modulo one hundred are $7,49,43,1$, so [[multiplicative-order|its order]] is four.

Thus only $7^7$ modulo four is needed for the outer exponent. Since $7\equiv-1\pmod4$ and the exponent seven is odd, $7^7\equiv3\pmod4$. Therefore $7^{7^7}\equiv7^3\equiv43\pmod{100}$. The lower period is four, even though the original modulus is one hundred. Reducing the upper exponent modulo one hundred instead would not be the justified step.

[[cycle-hunting|Finding the actual cycle]] remains necessary when a base is not coprime to its modulus. For instance, $2^{2^{10}}$ modulo eight is zero because the outer exponent exceeds two. Replacing that exponent by zero modulo $\varphi(8)=4$ would produce $2^0=1$, which belongs before the stable zero state and is incorrect.

Residues can also classify an entire set of integers. The condition $n^2\equiv1\pmod{24}$ holds exactly when $\gcd(n,6)=1$. Necessity follows because even $n$ fails modulo eight, and a multiple of three fails modulo three. Conversely, for $n$ coprime to six, $(n-1)(n+1)$ contains two consecutive even factors, one divisible by four, so it is divisible by eight; one factor is also divisible by three. Together these give twenty-four.

Using [[modular-basics|congruence conditions]] has replaced a square test by exclusion of multiples of two or three. Up to one thousand the count is $1000-500-333+166=333$, with multiples of six restored after being excluded twice. The count includes $n=1$, for which $n^2-1=0$ is divisible by twenty-four.`,
      related: [
        { card: "lte", note: String.raw`the exact power of a prime in $a^n - b^n$, an alternative for some towers and differences of powers.` },
        { card: "carmichael-function", note: String.raw`the period that works for every number coprime to the modulus at once.` }
      ],
      exercises: [
        { q: String.raw`What is the remainder when $2^{2026}$ is divided by $1000$?`, answer: "864",
          solution: String.raw`Modulo eight, the exponent exceeds two, so $2^{2026}\equiv0$. Modulo one hundred twenty-five, Euler gives $2^{2026}\equiv2^{26}$ because $\varphi(125)=100$ and the base is coprime to the modulus. Now $2^7\equiv3$, so $2^{26}=2^{21}2^5\equiv27\cdot32=864\equiv114$. Write the combined remainder as $r=114+125t$. The condition $r\equiv0\pmod8$ becomes $2+5t\equiv0$, giving $t\equiv6\pmod8$. Thus $r\equiv864\pmod{1000}$, and eight hundred sixty-four is in the required remainder range.` },
        { q: String.raw`What number is formed by the last two digits of $7^{7^7}$?`, answer: "43",
          solution: String.raw`The outer base seven has $7^4\equiv1\pmod{100}$, so its exponent only needs to be evaluated modulo four. The exponent is $7^7$, with the tower read from the top. Since $7\equiv-1\pmod4$ and seven is odd, $7^7\equiv3\pmod4$. Hence $7^{7^7}\equiv7^3=343\equiv43\pmod{100}$.` },
        { q: String.raw`For how many integers $n$ with $1 \le n \le 1000$ is $n^2 - 1$ divisible by $24$?`, answer: "333",
          solution: String.raw`If $n$ is even, $n^2-1$ is odd; if three divides $n$, then $n^2-1\equiv2\pmod3$. Both cases are impossible. Conversely, when $n$ is coprime to six, the factors $n-1,n+1$ are consecutive even integers, giving a factor eight, and one is divisible by three. Thus exactly the integers divisible by neither two nor three work. Inclusion-exclusion gives $1000-500-333+166=333$, including one because zero is divisible by twenty-four.` }
      ],
      problems: [
        "2008 AIME I, Problem 3",
        "1999 AIME, Problem 1",
        "2002 AIME II, Problem 7"
      ]
    },
    "M7.3": {
      prereq: ["sfft", "factor-pair-counting", "difference-of-squares-rep", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`An integer condition can become a finite divisor problem after a suitable rearrangement. The rearrangement must preserve both the equation and its domain. For a square condition, introduce an integer square root; for a fraction equation, record the nonzero denominators before clearing them.

Suppose $n\gt0$ and $n^2+24n=k^2$, where $k\ge0$. Completing the square gives

$$(n+12)^2-k^2=144,$$

so [[difference-of-squares-rep|a difference of squares]] becomes the product $(n+12-k)(n+12+k)=144$. Since $k^2=(n+12)^2-144$, we have $k\lt n+12$. The two factors are therefore positive, and their difference $2k$ makes their parity agree. They cannot both be odd, so both are even.

The even factor pairs in increasing order are $(2,72),(4,36),(6,24),(8,18),(12,12)$. Taking half the sum and then subtracting twelve gives $n=25,8,3,1,0$. Positivity removes zero, leaving four values whose sum is thirty-seven. Each surviving pair reverses to the original equation, and all have $k\ge0$, so no candidate is counted twice by choosing the sign of its square root.

A lattice-point count needs different sign rules. For $x^2-y^2=96$, both factors $x-y,x+y$ are even because they have matching parity and even product. Write $x-y=2a$, $x+y=2b$. Then $ab=24$, and the reverse formulas are $x=a+b$, $y=b-a$.

Each of the eight positive divisors $a$ of twenty-four gives one positive ordered factor pair $(a,24/a)$. These give eight points with $x\gt0$; their negative factor pairs give eight with $x\lt0$. Exchanging $a,b$ changes the sign of $y$, so those exchanges already count the vertical reflection. Multiplying by another factor of two for it would overcount.

The diagram shows all sixteen points. The four positive values of $|y|$ correspond to the unordered factor pairs; the signs of $x$ and $y$ supply the four branches. There are no points on either axis for this equation.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360" role="img" aria-labelledby="m73-points-title m73-points-desc" style="width:100%;max-width:520px;height:auto"><title id="m73-points-title">Sixteen lattice points on a difference-of-squares curve</title><desc id="m73-points-desc">The points on x squared minus y squared equals ninety-six have absolute coordinate pairs ten and two, eleven and five, fourteen and ten, or twenty-five and twenty-three. Independent signs of x and y give sixteen points.</desc><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M30 180H490M260 30V330"/></g><g fill="currentColor"><circle cx="330" cy="170" r="3.7"/><circle cx="330" cy="190" r="3.7"/><circle cx="190" cy="170" r="3.7"/><circle cx="190" cy="190" r="3.7"/><circle cx="337" cy="155" r="3.7"/><circle cx="337" cy="205" r="3.7"/><circle cx="183" cy="155" r="3.7"/><circle cx="183" cy="205" r="3.7"/><circle cx="358" cy="130" r="3.7"/><circle cx="358" cy="230" r="3.7"/><circle cx="162" cy="130" r="3.7"/><circle cx="162" cy="230" r="3.7"/><circle cx="435" cy="65" r="3.7"/><circle cx="435" cy="295" r="3.7"/><circle cx="85" cy="65" r="3.7"/><circle cx="85" cy="295" r="3.7"/></g><g fill="currentColor" font-size="16"><text x="260" y="22" text-anchor="middle">x² − y² = 96</text><text x="493" y="173">x</text><text x="270" y="42">y</text><text x="438" y="61">(25, 23)</text><text x="365" y="123">(14, 10)</text><text x="350" y="151">(11, 5)</text><text x="350" y="210">(10, 2)</text><path d="M334 173L345 196" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="260" y="351" text-anchor="middle">Four absolute coordinate pairs × four signs = 16</text></g></svg>

[[factor-pair-counting|Counting the ordered factor pairs]] supplies a bijection here: the original point determines $a,b$ uniquely, and every counted pair recovers one point. The exact correspondence decides whether signs, exchanges, or equal factors have already been included.

For positive integers $x,y$ with $1/x+1/y=1/6$, each positive reciprocal is strictly less than $1/6$, so $x,y\gt6$. Clearing the nonzero denominators and [[sfft|completing a product]] gives $(x-6)(y-6)=36$. Both factors are positive, and its nine ordered positive pairs give nine solutions. No negative-factor cases are needed because the reciprocal argument has already ruled them out.

When a factorization is unavailable, [[bounding-diophantine|a proved bound]] can still make the search finite. To solve $2^n=n^2$ for positive integers, check $n=1,2,3,4$: only two and four work. At five, $2^5\gt5^2$. For every $n\ge5$, $2n^2\gt(n+1)^2$ because $n^2-2n-1\gt0$. Therefore $2^n\gt n^2$ implies $2^{n+1}\gt(n+1)^2$, excluding all later values by induction. Saying that the exponential eventually grows faster would not by itself justify stopping at five.

Another bound can exclude an entire range by [[squeeze-between-squares|squeezing between consecutive squares]]. The inequalities must be strict and hold throughout the proposed range. Factoring, congruences, and bounds can be combined, but the final list is complete only when each step accounts for every permitted integer.`,
      related: [
        { card: "pell-equation", note: String.raw`for $x^2 - Dy^2 = 1$, which has infinitely many solutions instead of a few (M6.5).` },
        { card: "pythagorean-triples", note: String.raw`the factoring of $c^2 - b^2 = a^2$ (M5.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of all positive integers $n$ for which $n^2 + 24n$ is a perfect square.`, answer: "37",
          solution: String.raw`Choose the nonnegative square root $k$. Completing the square gives $(n+12-k)(n+12+k)=144$. The factors are positive, in increasing order, and of the same parity, so both are even. Their possible pairs are $(2,72),(4,36),(6,24),(8,18),(12,12)$. Half their sums are $37,20,15,13,12$, yielding $n=25,8,3,1,0$. Exclude zero. The four positive values reverse to valid square equations, and their sum is $25+8+3+1=37$.` },
        { q: String.raw`How many points with integer coordinates lie on the curve $x^2 - y^2 = 96$?`, answer: "16",
          solution: String.raw`Factoring gives $(x-y)(x+y)=96$. Matching parity forces both factors to be even, so set them to $2a,2b$ with $ab=24$. Each nonzero ordered factor pair gives a unique point $(x,y)=(a+b,b-a)$, and each original point gives that pair back. There are $d(24)=(3+1)(1+1)=8$ positive ordered pairs and eight pairs with both entries negative. These sixteen already include both signs of $y$, so the count is sixteen.` },
        { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $\tfrac1x + \tfrac1y = \tfrac16$?`, answer: "9",
          solution: String.raw`Both reciprocals are positive and add to $1/6$, so each is strictly less than $1/6$, implying $x,y\gt6$. Clearing denominators and adding thirty-six gives $(x-6)(y-6)=36$. Its positive ordered factor pairs correspond bijectively to the original solutions by adding six to both entries. There are $d(36)=9$ such pairs, including the equal pair, which yields $x=y=12$.` }
      ],
      problems: [
        "1997 AIME, Problem 3",
        "2000 AIME II, Problem 2",
        "1999 AIME, Problem 3",
        "2000 AIME I, Problem 1"
      ]
    },
    "M7.4": {
      prereq: ["modular-basics", "crt", "number-of-divisors", "exponent-tracking", "difference-of-squares-rep", "base-conversion", "bounding-diophantine"],
      cards: [],
      body: String.raw`A mixed problem is often simplified by recording several descriptions of the same integer. A divisor is a bounded tuple of prime exponents; its remainder is a condition on those exponents. A square condition is an equation that may factor after a split into residue classes. The useful representation is the one that makes the restrictions precise.

Consider positive integers $n$ for which $2^n+65=k^2$. If $n$ is odd, powers of two modulo five alternate between two and three in odd positions. Adding sixty-five leaves the same residue, and neither is a square residue modulo five. Thus every solution has even $n=2m$, with $m\ge1$.

Now use [[difference-of-squares-rep|a difference of squares]]:

$$(k-2^m)(k+2^m)=65.$$

Choose $k\gt0$; the factors are positive because $k^2=2^{2m}+65$. Their pairs are $(1,65)$ or $(5,13)$. Subtracting the smaller factor from the larger gives $2^{m+1}=64$ or eight, hence $m=5$ or two. Therefore $n=10$ or four. The checks $2^{10}+65=1089=33^2$ and $2^4+65=81=9^2$ verify both candidates; the requested sum of exponents is fourteen.

A divisor condition can mix a count with a residue. Every positive divisor of $10^6=2^6\cdot5^6$ is uniquely $2^a5^b$ with $0\le a,b\le6$. Thus [[number-of-divisors|the unrestricted divisor count]] is $7\cdot7=49$. Modulo three, however, both prime bases are minus one, so the divisor is congruent to $(-1)^{a+b}$.

Remainder one requires $a+b$ even: the two exponents must have the same parity. There are four even choices and three odd choices in the range zero through six, giving $4\cdot4+3\cdot3=25$. It is not exactly half of forty-nine; the exponent ranges have an extra even value.

The lattice grid makes the restriction visible. A filled point represents one divisor with remainder one; an open point represents a divisor with remainder two. Replacing a divisor by its exponent pair keeps the representation unique.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 365" role="img" aria-labelledby="m74-divisors-title m74-divisors-desc" style="width:100%;max-width:520px;height:auto"><title id="m74-divisors-title">Twenty-five exponent pairs give divisor remainder one modulo three</title><desc id="m74-divisors-desc">A seven by seven grid represents exponents a and b from zero through six. The twenty-five points where a plus b is even are filled. The other twenty-four points are open.</desc><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M110 45V302H414"/></g><circle cx="145" cy="275" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="240" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="205" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="170" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="135" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="100" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="145" cy="65" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="275" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="240" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="205" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="170" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="135" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="100" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="185" cy="65" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="275" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="240" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="205" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="170" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="135" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="100" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="225" cy="65" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="275" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="240" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="205" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="170" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="135" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="100" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="265" cy="65" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="275" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="240" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="205" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="170" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="135" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="100" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="305" cy="65" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="275" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="240" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="205" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="170" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="135" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="100" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="345" cy="65" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="275" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="240" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="205" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="170" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="135" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="100" r="6" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="1.2"/><circle cx="385" cy="65" r="6" fill="currentColor" fill-opacity="1" stroke="currentColor" stroke-width="1.2"/><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="24">Divisors 2ᵃ5ᵇ: fill a + b even</text><text x="145" y="324">0</text><text x="90" y="280">0</text><text x="185" y="324">1</text><text x="90" y="245">1</text><text x="225" y="324">2</text><text x="90" y="210">2</text><text x="265" y="324">3</text><text x="90" y="175">3</text><text x="305" y="324">4</text><text x="90" y="140">4</text><text x="345" y="324">5</text><text x="90" y="105">5</text><text x="385" y="324">6</text><text x="90" y="70">6</text><text x="430" y="306">a</text><text x="110" y="40">b</text><text x="260" y="355">16 even-even pairs + 9 odd-odd pairs = 25</text></g></svg>

This use of [[modular-basics|remainders]] has not changed the exponent bounds; it has added a relation among the choices. A general exponent count cannot multiply the choices independently after such a relation is imposed. Here splitting into the two parity cases restores independence within each case.

Several simultaneous remainder conditions can also simplify before [[crt|the Chinese remainder theorem]] is applied. If $n$ leaves remainder one on division by each of $2,3,4,5,6$, then $n-1$ is a multiple of their lcm, sixty. Thus $n=60t+1$. Requiring divisibility by seven gives $4t+1\equiv0\pmod7$, hence $t\equiv5\pmod7$ and

$$n=301+420q.$$

The smallest positive member is $301=7\cdot43$. The moduli two through six are not pairwise coprime, so directly multiplying them would give the wrong description of the solution spacing. Their shared remainder is what allowed consolidation into one condition modulo sixty.

Each example uses a restriction to create a complete finite count or a single congruence class. At the end, translate back to the quantity asked for and check its original domain. An intermediate exponent, digit string, or count need not itself be the answer requested by the problem.`,
      related: [
        { card: "choose-modulus", note: String.raw`choosing the modulus that rules out a case, as $5$ does for $2^n + 65$ with $n$ odd (M4.4).` },
        { card: "squares-mod-small", note: String.raw`the squares modulo $3$, $4$, $5$ and $8$ (M4.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of all positive integers $n$ for which $2^n + 65$ is a perfect square.`, answer: "14",
          solution: String.raw`For odd $n$, the residues of $2^n$ modulo five are two or three, neither a square residue, so $n$ must be even. Write $n=2m$ with $m\ge1$ and choose $k\gt0$. The equation becomes $(k-2^m)(k+2^m)=65$, with positive factors. Their pairs $(1,65),(5,13)$ have differences sixty-four and eight, respectively. Thus $2^{m+1}=64$ or eight, giving $n=10$ or four. Both work, since $1024+65=33^2$ and $16+65=9^2$. The requested sum is fourteen.` },
        { q: String.raw`How many positive divisors of $10^6$ leave remainder $1$ on division by $3$?`, answer: "25",
          solution: String.raw`Every divisor is uniquely $2^a5^b$ with $0\le a,b\le6$. Modulo three its residue is $(-1)^{a+b}$, so remainder one requires matching exponent parity. There are four even values $0,2,4,6$ and three odd values $1,3,5$. The two disjoint cases give $4^2+3^2=16+9=25$ divisors. Unique prime factorization ensures that different exponent pairs count different divisors.` },
        { q: String.raw`What is the smallest integer $n \gt 1$ that leaves remainder $1$ on division by each of $2$, $3$, $4$, $5$ and $6$ and is divisible by $7$?`, answer: "301",
          solution: String.raw`The equal remainders give $60\mid n-1$, since sixty is the lcm of two through six. Write $n=60t+1$. Modulo seven, divisibility of $n$ is $4t+1\equiv0$, so $t\equiv5\pmod7$. Thus $t=5+7q$ and $n=301+420q$. With $n\gt1$, the smallest allowed member is $301=7\cdot43$. The previous member is negative, proving minimality.` }
      ],
      problems: [
        "1990 AIME, Problem 5",
        "2000 AIME II, Problem 4",
        "1987 AIME, Problem 3",
        "2001 AIME I, Problem 8"
      ]
    },
    "M7.5": {
      prereq: ["modular-basics", "cycle-hunting", "crt", "eulers-theorem", "multiplicative-order", "sfft", "factor-pair-counting", "difference-of-squares-rep", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`The central task in a mixed problem is to keep equivalent descriptions of the same integer consistent. Splitting a modulus into coprime factors gives smaller calculations, but each factor still needs its own valid argument. An order reduces exponents for a coprime base; a noncoprime base may instead require divisibility or an eventual cycle. In a power tower, the period of a lower power becomes the modulus for the exponent above it.

A square condition can become a finite product after completing the square. A reciprocal equation can become a product after its denominators are cleared. In either case the factor list must respect the original signs, ranges, and integrality conditions. A correspondence between factors and solutions explains both completeness and whether exchanges or sign choices have already been counted.

For divisor problems, unique prime factorization provides the underlying count. Additional residue or size conditions can link the exponents, so they must be imposed before independent choice counts are multiplied. When no immediate factorization appears, an inequality must justify where a finite check stops; eventual growth alone does not identify that endpoint.

A finished solution has accounted for all possible inputs, verified the candidates, and returned to the requested quantity. This final translation matters when a problem asks for a digit sum, a count modulo one thousand, or a sum of allowable exponents rather than the values found during the calculation.`,
      strategies: [
        String.raw`Split a remainder modulo $1000$ into remainders modulo $8$ and $125$, then recombine.`,
        String.raw`In a power tower, use the lower power's period as the modulus for its exponent; retain any initial segment for a noncoprime base.`,
        String.raw`Turn "is a perfect square" into a difference of squares by completing the square.`,
        String.raw`Both factors of $x^2 - y^2$ have the same parity; use it to cut the factor pairs.`,
        String.raw`Before factoring, split by parity or by a remainder; one case often dies at once.`,
        String.raw`Name the ideas a problem needs before computing.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`What is the remainder when $3^{100}$ is divided by $1000$?`, answer: "1",
        solution: String.raw`Modulo eight, $3^2\equiv1$ and one hundred is even, so $3^{100}\equiv1$. Modulo one hundred twenty-five, the base is coprime and $\varphi(125)=100$, so Euler again gives remainder one. These coprime moduli multiply to one thousand; agreement with one modulo both means $3^{100}-1$ is divisible by one thousand. Hence the required remainder is one.` },
      { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $xy = 4x + 4y$?`, answer: "5",
        solution: String.raw`Divide the original equation by positive $xy$: $1/x+1/y=1/4$. Each summand is smaller than $1/4$, so $x,y\gt4$. The equivalent product is $(x-4)(y-4)=16$, and both factors are positive. Its five ordered factor pairs yield $(5,20),(6,12),(8,8),(12,6),(20,5)$. Each pair reverses to the original equation, and all possibilities are included, so the count is five.` },
      { q: String.raw`What is the remainder when $1^2 + 2^2 + \cdots + 100^2$ is divided by $7$?`, answer: "5",
        solution: String.raw`The square residues of one complete block of seven consecutive integers are $1,4,2,2,4,1,0$, with sum fourteen, congruent to zero. The integers one through ninety-eight form fourteen such blocks. The remaining integers ninety-nine and one hundred have residues one and two, so their squares add to $1+4=5$. Thus the final remainder is five. The direct check is $100\cdot101\cdot201/6=338350=7\cdot48335+5$.` }
    ],
    problems: [
      "1991 AIME, Problem 5",
      "1995 AIME, Problem 6"
    ]
  },
  challenge: {
    problems: [
      "2026 AIME I, Problem 8",
      "1996 AIME, Problem 8",
      "1992 AIME, Problem 5"
    ]
  }
};
