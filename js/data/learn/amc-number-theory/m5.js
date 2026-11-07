// Learn, AMC Number Theory, chapter M5: integer equations (CONVENTIONS §14). Part: Core topics.
// Content revision: connected derivations, explicit domains, and checked worked solutions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["M5"] = {
  lessons: {
    "M5.1": {
      prereq: ["gcd-lcm-product", "difference-of-squares"],
      cards: [],
      body: String.raw`An integer equation asks for solutions among the integers: zero, positive whole numbers, and their negatives. A problem may impose the stronger requirement that each variable be positive or nonnegative. These restrictions are part of the equation's meaning: a negative coefficient in an exchange can represent change received, but a negative number of coins in a purchase is not allowed.

A linear equation such as $3x+5y=22$ has infinitely many real solutions. Requiring integers spaces the possible solutions apart, and requiring positivity can leave a finite list. Here $y$ must be congruent to two modulo three, while $5y\lt22$; only $y=2$ survives, giving $x=4$.

A product gives a different kind of restriction. The equation $x^2-y^2=15$ is equivalent to $(x-y)(x+y)=15$. For positive $x,y$, the first factor is smaller than the second, and the two factors must have the same parity. The positive factor pairs $(1,15)$ and $(3,5)$ give $(x,y)=(8,7)$ and $(4,1)$.

Both arguments replace an unlimited search by a structured list. Remainders describe the spacing in a linear equation; factor pairs describe a product; inequalities bound the list. A bound only limits the candidates, so every surviving candidate must still be checked in the original equation.

The chapter develops these ideas for linear equations, combined remainder conditions, coin totals, and integer-sided triangles. Its last lesson uses bounds when an equation does not immediately yield a factorization. The sign conditions and the question being counted, ordered solutions or distinct shapes, will remain essential throughout.`,
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $3x + 5y = 22$?`, answer: "1",
          solution: String.raw`Reduce the equation modulo three: $2y\equiv1\pmod3$, so $y\equiv2\pmod3$. Positivity of $x$ requires $5y\lt22$, hence $1\le y\le4$. Only $y=2$ remains, giving $x=(22-10)/3=4$. Substitution gives $3\cdot4+5\cdot2=22$, so there is exactly one pair.` },
        { q: String.raw`What is the largest amount that cannot be paid with coins of $4$ and $7$ cents?`, answer: "17",
          solution: String.raw`The possible numbers of seven-cent coins in a payment of seventeen are zero, one, or two. The remainders to be paid in four-cent coins are $17,10,3$, none divisible by four. But $18=7+7+4$, $19=7+4+4+4$, $20=4+4+4+4+4$, and $21=7+7+7$. These four consecutive totals represent every remainder modulo four; adding four-cent coins produces every larger total. Thus seventeen is the largest missing amount.` },
        { q: String.raw`How many pairs of positive integers satisfy $x^2 - y^2 = 15$?`, answer: "2",
          solution: String.raw`Since $x^2-y^2=15\gt0$ and $x,y$ are positive, $x\gt y$. Write $(x-y)(x+y)=15$. Both factors are positive, odd, and in increasing order, so their only possibilities are $(1,15)$ and $(3,5)$. Their half-sums and half-differences give $(x,y)=(8,7)$ and $(4,1)$. Both satisfy the original equation, giving two pairs.` }
      ],
      problems: [
        "2008 AMC 10B, Problem 8",
        "2002 AMC 12A, Problem 6",
        "2015 AMC 12B, Problem 10"
      ]
    },
    "M5.2": {
      prereq: ["euclidean-algorithm", "modular-basics"],
      cards: ["bezouts-identity", "crt"],
      body: String.raw`Let $a$ and $b$ be positive integers and $c$ an integer. The equation $ax+by=c$ asks which integer multiples of $a$ and $b$ can combine to give $c$. Write $d=\gcd(a,b)$. Every value of $ax+by$ is divisible by $d$, so $d\mid c$ is necessary for an integer solution. Thus $6x+15y=4$ is impossible, even though it has real solutions.

The converse comes from [[bezouts-identity|Bézout's identity]]: there are integers $u,v$ with $au+bv=d$. The Euclidean algorithm proves this by back-substitution. Each remainder is an integer combination of the preceding two entries; tracing those equations backward expresses the last nonzero remainder, the gcd, in terms of $a,b$.

For seven and eleven, the divisions are $11=7+4$, $7=4+3$, and $4=3+1$. Reversing them gives

$$1=4-3=2\cdot4-7=2\cdot11-3\cdot7.$$

If $c=dk$, multiplying a Bézout equation by $k$ supplies a solution to $ax+by=c$. Consequently, $d\mid c$ is both necessary and sufficient. This statement allows negative values of $x,y$; it does not guarantee a solution with both nonnegative. For example, $3\cdot2+5\cdot(-1)=1$, but positive coin values three and five cannot pay an amount of one without change.

One solution $(x_0,y_0)$ describes all the others. Subtract its equation from that of another solution:

$$a(x-x_0)=-b(y-y_0).$$

After dividing by $d$, the coefficients $a/d,b/d$ are coprime. Hence $b/d$ divides $x-x_0$. Writing $x-x_0=(b/d)t$ then forces $y-y_0=-(a/d)t$. All integer solutions are therefore

$$x=x_0+\frac bd t,\qquad y=y_0-\frac ad t,\qquad t\in\mathbb Z.$$

Conversely, substituting these expressions makes the terms involving $t$ cancel, so every integer $t$ does give a solution. In $7x+11y=1$, the family is $x=-3+11t$, $y=2-7t$. The smallest positive $x$ occurs at $t=1$, giving $(8,-5)$. There is no solution with both variables nonnegative.

For a bounded problem, inequalities restrict the parameter. The solutions of $3x+5y=22$ are $x=4+5t$, $y=2-3t$. Requiring $x,y\gt0$ leaves only $t=0$. The diagram shows why the real line contains just one positive integer point: consecutive integer solutions move five units horizontally and three vertically.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-labelledby="m52-line-title m52-line-desc" style="width:100%;max-width:520px;height:auto"><title id="m52-line-title">Integer solutions are spaced along a line</title><desc id="m52-line-desc">The line three x plus five y equals twenty-two contains integer points minus one comma five, four comma two, and nine comma minus one. Only four comma two has both coordinates positive. Moving to the next point adds five to x and subtracts three from y.</desc><g stroke="currentColor" stroke-width="1" opacity="0.15"><path d="M60 45V255"/><path d="M90 45V255"/><path d="M120 45V255"/><path d="M150 45V255"/><path d="M180 45V255"/><path d="M210 45V255"/><path d="M240 45V255"/><path d="M270 45V255"/><path d="M300 45V255"/><path d="M330 45V255"/><path d="M360 45V255"/><path d="M390 45V255"/><path d="M420 45V255"/><path d="M450 45V255"/><path d="M480 45V255"/><path d="M60 45H480"/><path d="M60 75H480"/><path d="M60 105H480"/><path d="M60 135H480"/><path d="M60 165H480"/><path d="M60 195H480"/><path d="M60 225H480"/><path d="M60 255H480"/></g><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M60 225H490M120 260V35"/><path d="M60 57L390 255" stroke-width="2.5"/><path d="M90 75H240V165" stroke-dasharray="5 4"/></g><g fill="currentColor"><circle cx="90" cy="75" r="4"/><circle cx="240" cy="165" r="5"/><circle cx="390" cy="255" r="4"/></g><g fill="currentColor" font-size="16"><text x="260" y="24" text-anchor="middle">3x + 5y = 22</text><text x="65" y="56">(−1, 5)</text><text x="250" y="157">(4, 2)</text><text x="400" y="274">(9, −1)</text><text x="165" y="66" text-anchor="middle">+5 in x</text><text x="252" y="115">−3 in y</text><text x="490" y="217">x</text><text x="132" y="40">y</text><text x="111" y="244" text-anchor="end">0</text></g></svg>

A system of remainder conditions becomes a linear integer equation in the same way. If $n\equiv r\pmod m$, write $n=r+mt$. A second requirement $n\equiv s\pmod k$ becomes $mt\equiv s-r\pmod k$. When $\gcd(m,k)=1$, multiplication by $m$ is reversible modulo $k$, so there is exactly one possible residue for $t$ modulo $k$.

For $n\equiv2\pmod5$ and $n\equiv3\pmod7$, substitution gives $2+5t\equiv3\pmod7$. The inverse of five modulo seven is three, so $t\equiv3\pmod7$. Thus $t=3+7q$ and $n=17+35q$. This proves existence and describes every solution; two solutions differ by a multiple of both five and seven, hence of thirty-five.

This is the two-modulus case of [[crt|the Chinese remainder theorem]]. Repeated combination gives one solution class modulo the product for any set of pairwise coprime positive moduli. For moduli sharing a gcd $g$, compatibility instead requires $g\mid s-r$. Dividing $mt-kq=s-r$ by $g$ proves sufficiency by Bézout, and two solutions differ by a multiple of $\operatorname{lcm}(m,k)$. For example, remainders one modulo six and three modulo eight give $n\equiv19\pmod{24}$; remainders one modulo six and two modulo eight are incompatible because their parities disagree.`,
      related: [
        { card: "extended-euclidean-algorithm", note: String.raw`finding the Bézout coefficients systematically.` },
        { card: "subtract-equal-remainders", note: String.raw`equal remainders and differences, the step before combining (M4.2).` }
      ],
      exercises: [
        { q: String.raw`What is the smallest positive integer $x$ for which $7x + 11y = 1$ has an integer solution $y$?`, answer: "8",
          solution: String.raw`Back-substitution gives $7(-3)+11(2)=1$, so one solution is $(-3,2)$. If $(x,y)$ is another, subtraction yields $7(x+3)=-11(y-2)$; coprimality forces $x=-3+11t$ and $y=2-7t$ for an integer $t$. The condition $x\gt0$ is $t\ge1$, whose smallest value gives $x=8,y=-5$. Check: $56-55=1$.` },
        { q: String.raw`What is the smallest positive integer that leaves remainder $2$ on division by $5$ and remainder $3$ on division by $7$?`, answer: "17",
          solution: String.raw`Write $n=3+7t$. The other condition is $3+2t\equiv2\pmod5$, so $2t\equiv4$ and $t\equiv2\pmod5$. Thus $t=2+5q$ and $n=17+35q$. At $q=0$ the value is seventeen; every smaller member of this class is negative, so it is the smallest positive solution.` },
        { q: String.raw`What is the smallest positive value of $6x + 15y$ for integers $x$ and $y$?`, answer: "3",
          solution: String.raw`Every value is divisible by $\gcd(6,15)=3$, so a positive value is at least three. The lower bound is attained by $x=3,y=-1$, since $6\cdot3+15(-1)=3$. Hence the minimum is three. Allowing negative coefficients is essential here.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 14",
        "2017 AMC 12B, Problem 19",
        "2000 AMC 12, Problem 16"
      ]
    },
    "M5.3": {
      prereq: ["bezouts-identity"],
      cards: ["chicken-mcnugget", "coins-and-prices"],
      body: String.raw`A purchase using unlimited coins of positive integer values $a,b$ has total $ax+by$ with $x,y\ge0$. Working in cents makes the coefficients integers. Bézout's identity settles whether a total is possible when change may be returned, but purchases require the additional nonnegativity conditions.

For a fixed total, a remainder condition often gives the count directly. In $4x+7y=100$, reduction modulo four gives $3y\equiv0\pmod4$, so $y\equiv0\pmod4$. Nonnegativity also requires $7y\le100$, hence $y\le14$. The choices $y=0,4,8,12$ give $x=25,18,11,4$, respectively. Each allowed $y$ determines exactly one $x$, so there are four representations. We count choices of coin quantities, not the orders in which the coins are handed over.

To describe all attainable totals at once, group them by remainder modulo one denomination. Take coins of five and eight cents. The multiples $0,8,16,24,32$ have different remainders modulo five, because eight and five are coprime. They are the least attainable totals in their respective residue classes.

To see the minimality, write the number of eight-cent coins as $y=j+5q$, with $0\le j\lt5$ and $q\ge0$. Then

$$5x+8y=8j+5(x+8q).$$

This total is at least $8j$. Conversely, every number at least $8j$ with its remainder modulo five is obtained by adding five-cent coins. The diagram shows each class beginning at its least representative and continuing in steps of five.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 310" role="img" aria-labelledby="m53-residues-title m53-residues-desc" style="width:100%;max-width:520px;height:auto"><title id="m53-residues-title">The least attainable total in each residue class</title><desc id="m53-residues-desc">For five and eight cent coins, residues zero through four modulo five first occur at totals zero, sixteen, thirty-two, eight, and twenty-four. Adding five continues each row. The preceding values in those classes are minus five, eleven, twenty-seven, three, and nineteen, so twenty-seven is the largest unattainable total.</desc><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="25">5-cent and 8-cent coins</text><text x="70" y="58">Residue</text><text x="250" y="58">First total, then add 5</text><text x="440" y="58">One step before</text><text x="70" y="92">0</text><text x="250" y="92">0, 5, 10, …</text><text x="440" y="92">-5</text><text x="70" y="130">1</text><text x="250" y="130">16, 21, 26, …</text><text x="440" y="130">11</text><text x="70" y="168">2</text><text x="250" y="168">32, 37, 42, …</text><text x="440" y="168">27</text><text x="70" y="206">3</text><text x="250" y="206">8, 13, 18, …</text><text x="440" y="206">3</text><text x="70" y="244">4</text><text x="250" y="244">24, 29, 34, …</text><text x="440" y="244">19</text><text x="260" y="290">Largest missing total: 32 − 5 = 27</text></g><path d="M30 68H490" stroke="currentColor" opacity="0.4"/></svg>

The same argument proves [[chicken-mcnugget|the Chicken McNugget theorem]]. Suppose $a,b\gt1$ are coprime. The numbers $0,b,2b,\ldots,(a-1)b$ represent all residues modulo $a$ exactly once, and $jb$ is the least attainable total in its class. The largest unattainable integer in that class is $jb-a$. Taking the largest of these gives

$$ab-a-b.$$

All larger integers are attainable because each is at least the first total in its own residue class. The bound itself is not attainable because it lies one step before $(a-1)b$ in that class. Coprimality is essential: if both values share a divisor greater than one, infinitely many positive totals remain impossible. If either value is one, every nonnegative total is attainable, so there is no largest missing nonnegative total.

The residue description also counts the positive missing amounts. For $1\le j\lt a$, there are $\lfloor jb/a\rfloor$ positive integers in the class of $jb$ that fall below $jb$. Write $jb=a\lfloor jb/a\rfloor+r_j$. The remainders $r_j$ rearrange $1,2,\ldots,a-1$, so adding these equations gives

$$\sum_{j=1}^{a-1}\left\lfloor\frac{jb}{a}\right\rfloor=\frac{(a-1)(b-1)}2.$$

For three and five, the missing amounts are $1,2,4,7$, a count of four. This is a count of unattainable positive totals, not a count of ways to pay one total.

[[coins-and-prices|Coin and price problems]] can impose a fixed item count or a limited supply. If ten coins, each worth five or eight cents, have total value sixty-eight cents, let $x+y=10$ and $5x+8y=68$. Subtracting five times the count equation gives $3y=18$, so $y=6$ and $x=4$. A bound on the available coins must also be imposed; the unlimited-supply theorem does not handle it.

For three or more denominations, the two-value formula cannot simply be reused. Least attainable totals by residue can still work: modulo a chosen denomination, find the first attainable total in every class and then add copies of that denomination. Establishing that each starting total is minimal is necessary; a list of attainable examples by itself proves only an upper bound on where the gaps end.`,
      related: [
        { card: "linear-elimination", note: String.raw`eliminating a variable from a count and a total value.` },
        { card: "assume-all-one-kind", note: String.raw`the same equations solved by assuming all coins are of one kind.` }
      ],
      exercises: [
        { q: String.raw`What is the largest amount that cannot be paid with $5$ and $8$ cent stamps?`, answer: "27",
          solution: String.raw`The denominations are coprime and greater than one, so the largest missing amount is $5\cdot8-5-8=27$. To verify the cutoff directly, the least attainable totals for residues $0,1,2,3,4$ modulo five are $0,16,32,8,24$. The preceding values in those classes are $-5,11,27,3,19$. Their maximum is twenty-seven; every larger total is at least its class's starting total and can be reached by adding fives.` },
        { q: String.raw`How many pairs of nonnegative integers satisfy $4x + 7y = 100$?`, answer: "4",
          solution: String.raw`Modulo four the equation gives $3y\equiv0$, so $y$ must be a multiple of four. Nonnegativity requires $7y\le100$, hence $y\le14$. Thus $y=0,4,8,12$, giving $x=25,18,11,4$, respectively. All four pairs are nonnegative and satisfy the equation; there are no other permitted values of $y$.` },
        { q: String.raw`How many positive amounts cannot be paid with coins of $3$ and $5$?`, answer: "4",
          solution: String.raw`Below eight, the attainable nonnegative amounts are $0,3,5,6$, leaving positive gaps $1,2,4,7$. Also $8=3+5$, $9=3+3+3$, and $10=5+5$. These three consecutive attainable totals cover all residues modulo three, and adding threes gives every amount from eight onward. There are exactly four positive gaps, agreeing with $(3-1)(5-1)/2=4$.` }
      ],
      problems: [
        "2003 AMC 12B, Problem 7",
        "2006 AMC 12A, Problem 9",
        "2015 AMC 10A, Problem 13",
        "2015 AMC 10B, Problem 15"
      ]
    },
    "M5.4": {
      prereq: ["difference-of-squares", "number-of-divisors"],
      cards: ["sfft", "factor-pair-counting", "difference-of-squares-rep"],
      body: String.raw`Factoring an integer equation can turn an unbounded search into a finite one. If $uv=N$ for a fixed nonzero integer $N$, then $u$ must divide $N$ and $v=N/u$ is forced. Recovering the original variables may impose additional sign, parity, or divisibility restrictions, so not every factor pair necessarily gives a solution.

A mixed term such as $xy$ suggests completing a product. In $xy-x-y=5$, adding one gives

$$(x-1)(y-1)=6.$$

This move is [[sfft|Simon's Favorite Factoring Trick]]. For positive integers $x,y$, the factors $x-1,y-1$ are nonnegative and their product is positive, so both are positive. The ordered factor pairs $(1,6),(2,3),(3,2),(6,1)$ give $(x,y)=(2,7),(3,4),(4,3),(7,2)$. Substitution reverses the factorization, proving that these four candidates are exactly the solutions.

The general identity comes from multiplying out:

$$(ax+c)(ay+b)=a(axy+bx+cy)+bc.$$

Thus, for $a\ne0$, the equation $axy+bx+cy=k$ is equivalent to $(ax+c)(ay+b)=ak+bc$. A factor pair $(u,v)$ of the right side must satisfy $u\equiv c\pmod{|a|}$ and $v\equiv b\pmod{|a|}$ to recover integers $x=(u-c)/a$ and $y=(v-b)/a$. Their required signs and sizes must then be checked.

For example, $2xy+x+y=7$ becomes $(2x+1)(2y+1)=15$. With positive $x,y$, both factors are at least three. Only $(3,5)$ and $(5,3)$ survive, giving $(1,2)$ and $(2,1)$. The pairs involving one would instead give a zero variable. If the constant product is zero, a finite divisor list no longer applies: either factor can vanish, potentially leaving the other variable free.

[[factor-pair-counting|Counting factor pairs]] makes the correspondence precise. For positive $N$, each positive divisor $u$ gives one ordered solution $(u,N/u)$, so there are $d(N)$ ordered pairs. If order is ignored, different pairs combine in twos; a square has the single unpaired middle pair $(\sqrt N,\sqrt N)$. The unordered count is $d(N)/2$ for a nonsquare and $(d(N)+1)/2$ for a square. At $N=36$, the nine divisors give nine ordered pairs and five unordered pairs.

If negative factors are allowed, a positive product also has pairs with both factors negative, while a negative product has factors of opposite signs. A restriction on $x$ is a restriction on the shifted factor, not necessarily on the factor's sign. For unrestricted integer $x,y$, $(x-1)(y-1)=6$ has four negative-factor pairs as well as the four positive ones.

[[difference-of-squares-rep|Representing a number as a difference of squares]] gives another factor-pair correspondence. If $m^2-n^2=N$, set $u=m-n$, $v=m+n$. Reversing the substitution gives

$$m=\frac{u+v}{2},\qquad n=\frac{v-u}{2}.$$

The variables are integers exactly when $u,v$ have the same parity. For positive $N$ and $m\gt n\ge0$, use $0\lt u\le v$; requiring $n\gt0$ makes the last inequality strict. To solve $n^2+20=m^2$ with positive $n$, the factor pairs of twenty are $(1,20),(2,10),(4,5)$. Only $(2,10)$ has matching parity, giving $m=6,n=4$.

Same-parity factors are either both odd or both even, so a difference of integer squares is odd or divisible by four. Conversely, every positive odd $N$ equals $((N+1)/2)^2-((N-1)/2)^2$, and every positive multiple $N=4k$ equals $(k+1)^2-(k-1)^2$. Allowing zero or negative square bases causes no difficulty, but requiring both bases positive removes some small cases. In particular, one and four have no representation with $m\gt n\gt0$.`,
      related: [
        { card: "number-of-divisors", note: String.raw`the count of factor pairs (M3.2).` },
        { card: "quadratic-perfect-square", note: String.raw`a quadratic with integer roots, a discriminant that is a square.` }
      ],
      exercises: [
        { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $xy - x - y = 5$?`, answer: "4",
          solution: String.raw`Adding one to both sides gives $(x-1)(y-1)=6$. Positive $x,y$ make both factors nonnegative, and their nonzero product makes them positive. The ordered factor pairs of six are $(1,6),(2,3),(3,2),(6,1)$; adding one to each entry gives $(2,7),(3,4),(4,3),(7,2)$. The transformation is reversible, so all four, and only these four, solve the original equation.` },
        { q: String.raw`How many ordered pairs of positive integers $(x, y)$ satisfy $xy = 36$?`, answer: "9",
          solution: String.raw`For every positive divisor $x$ of thirty-six, $y=36/x$ is the unique positive partner. Since $36=2^2\cdot3^2$, there are $(2+1)(2+1)=9$ choices: $x=1,2,3,4,6,9,12,18,36$. The pairs with coordinates exchanged count separately because the question asks for ordered pairs.` },
        { q: String.raw`Find the positive integer $n$ for which $n^2 + 20$ is a perfect square.`, answer: "4",
          solution: String.raw`Let $m\gt n\gt0$ and write $(m-n)(m+n)=20$. The positive factor pairs in increasing order are $(1,20),(2,10),(4,5)$. The two factors must have the same parity for their half-sum and half-difference to be integers, so only $(2,10)$ works. It gives $m=6,n=4$, and $4^2+20=36=6^2$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 13",
        "2004 AMC 10B, Problem 11",
        "2024 AMC 12A, Problem 17"
      ]
    },
    "M5.5": {
      prereq: ["pythagorean-theorem", "triangle-inequality"],
      cards: ["pythagorean-triples", "integer-triangles-perimeter"],
      body: String.raw`A Pythagorean triple consists of positive integers $a,b,c$ satisfying $a^2+b^2=c^2$. These are the side lengths of a right triangle, with hypotenuse $c$. A triple is primitive when its three entries have gcd one. Dividing any triple by that gcd leaves a primitive triple, so classifying primitive ones describes all integer right triangles up to an integer scale factor.

In a primitive triple, the legs cannot both be even. They cannot both be odd either, because their squares would add to two modulo four, which is not a square residue. Relabel the legs so that $a$ is odd and $b$ is even; then $c$ is odd. The equation gives

$$\left(\frac b2\right)^2=\frac{c+a}{2}\cdot\frac{c-a}{2}.$$

The two factors on the right are coprime. A common divisor would divide their sum $c$ and difference $a$; any prime dividing both $a$ and $c$ would also divide $b$, contradicting primitivity. A product of coprime positive integers is a square only when each factor is a square, since no prime exponent can be shared between them.

Write $(c+a)/2=m^2$ and $(c-a)/2=n^2$. Solving for the sides gives

$$a=m^2-n^2,\qquad b=2mn,\qquad c=m^2+n^2.$$

Here $m\gt n\ge1$, $\gcd(m,n)=1$, and $m,n$ have opposite parity. The gcd condition follows from that of the two square factors; opposite parity follows because $a$ is odd. Conversely, these conditions produce positive sides and the identity $(m^2-n^2)^2+(2mn)^2=(m^2+n^2)^2$. The triple is primitive: an odd common prime divisor would have to divide both $m,n$, while opposite parity excludes two. This proves the classification in [[pythagorean-triples|the Pythagorean triple formula]].

The parameters $(m,n)=(2,1),(3,2),(4,1)$ produce $3$-$4$-$5$, $5$-$12$-$13$, and $8$-$15$-$17$. Multiplying all three sides by the same positive integer gives further triples. If the parameter conditions are omitted, the formula still gives an identity, but can repeat or produce nonprimitive triples; it does not automatically give a count without duplication.

A fixed leg is often easier to handle by factoring. If one leg is fifteen, write the other as $b$ and the hypotenuse as $c$. Then $(c-b)(c+b)=225$. The factors are positive, odd, and unequal. The pairs $(1,225),(3,75),(5,45),(9,25)$ give $(b,c)=(112,113),(36,39),(20,25),(8,17)$. The remaining pair $(15,15)$ gives $b=0$, a degenerate figure rather than a triangle. Thus there are four right triangles with that fixed leg, including nonprimitive ones.

Counting all triangles with a given integer perimeter $p$ uses an inequality instead of the right-angle equation. Put the sides in the order $a\le b\le c$. This chooses one representative of each noncongruent triangle, including isosceles and equilateral ones. The triangle inequality reduces to $a+b\gt c$, because $c$ is the largest side.

Since $a+b+c=p$, this condition is $c\lt p/2$. Also $p\le3c$, so $c\ge p/3$. For each integer $c$ in that interval, substitute $a=p-b-c$. The order conditions become

$$\left\lceil\frac{p-c}{2}\right\rceil\le b\le\min(c,p-c-1).$$

The upper bound $b\le p-c-1$ keeps $a$ positive. These bounds are sufficient as well as necessary: they recover $1\le a\le b\le c$, and the strict bound on $c$ ensures positive area. This is [[integer-triangles-perimeter|counting integer-sided triangles by perimeter]].

For perimeter fifteen, the longest side is five, six, or seven. The diagram places each admissible pair $(b,c)$ at a lattice point; the shortest side is recovered as $15-b-c$. Points on $c=15/2$ would be degenerate and are excluded.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 315" role="img" aria-labelledby="m55-triangles-title m55-triangles-desc" style="width:100%;max-width:520px;height:auto"><title id="m55-triangles-title">Seven triangles of perimeter fifteen as lattice points</title><desc id="m55-triangles-desc">With sides a at most b at most c, the lattice points for b and c are five comma five; five comma six; six comma six; four comma seven; five comma seven; six comma seven; and seven comma seven. Their recovered shortest sides are five, four, three, four, three, two, and one.</desc><g stroke="currentColor" opacity="0.15"><path d="M100 65V245"/><path d="M180 65V245"/><path d="M260 65V245"/><path d="M340 65V245"/><path d="M70 225H380"/><path d="M70 165H380"/><path d="M70 105H380"/></g><path d="M70 55V245H390" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M70 75H380" stroke="currentColor" stroke-dasharray="5 4"/><g fill="currentColor"><circle cx="180" cy="225" r="5"/><circle cx="180" cy="165" r="5"/><circle cx="260" cy="165" r="5"/><circle cx="100" cy="105" r="5"/><circle cx="180" cy="105" r="5"/><circle cx="260" cy="105" r="5"/><circle cx="340" cy="105" r="5"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="260" y="25">a = 15 − b − c, with a ≤ b ≤ c</text><text x="100" y="267">4</text><text x="180" y="267">5</text><text x="260" y="267">6</text><text x="340" y="267">7</text><text x="400" y="249">b</text><text x="56" y="48">c</text><text x="50" y="230">5</text><text x="50" y="170">6</text><text x="50" y="110">7</text><text x="450" y="80">c = 7.5</text><text x="260" y="302">1 point + 2 points + 4 points = 7 triangles</text></g></svg>

For $c=5$ there is $(5,5,5)$. For $c=6$ there are $(4,5,6),(3,6,6)$, and for $c=7$ there are $(4,4,7),(3,5,7),(2,6,7),(1,7,7)$. The seven points count side-length triples up to order. Counting labelled sides or requiring a scalene or right triangle would be a different question.`,
      related: [
        { card: "sum-of-two-squares", note: String.raw`which numbers can be hypotenuses.` },
        { card: "triangle-inequality", note: String.raw`each side less than the sum of the other two.` }
      ],
      exercises: [
        { q: String.raw`Find the hypotenuse of the right triangle with legs $20$ and $21$.`, answer: "29",
          solution: String.raw`The hypotenuse is positive and satisfies $c^2=20^2+21^2=400+441=841=29^2$. Thus $c=29$. The identity verifies the side lengths without assuming that any particular familiar triple applies.` },
        { q: String.raw`How many right triangles with integer sides have a leg of length $15$?`, answer: "4",
          solution: String.raw`Let $b\gt0$ be the other leg and $c$ the hypotenuse. Factoring gives $(c-b)(c+b)=225$. Its positive factor pairs in increasing order are $(1,225),(3,75),(5,45),(9,25)$, all odd. They give $(b,c)=(112,113),(36,39),(20,25),(8,17)$. The equal pair $(15,15)$ would give $b=0$ and is excluded. Every listed pair has positive sides and satisfies $c^2-b^2=225$, so there are four triangles.` },
        { q: String.raw`How many non-congruent triangles with integer sides have perimeter $15$?`, answer: "7",
          solution: String.raw`Order the sides as $1\le a\le b\le c$ so each noncongruent triangle is counted once. The perimeter and strict triangle inequality give $5\le c\lt7.5$, so $c=5,6,7$. At $c=5$, the remaining sides can only be $(5,5)$. At $c=6$, they are $(3,6),(4,5)$; at $c=7$, they are $(1,7),(2,6),(3,5),(4,4)$. Each pair sums to $15-c$ and exceeds $c$, so all seven triangles have positive area.` }
      ],
      problems: [
        "2009 AMC 12B, Problem 13",
        "2011 AMC 12B, Problem 11",
        "2013 AMC 10B, Problem 16",
        "2014 AMC 12B, Problem 9"
      ]
    },
    "M5.6": {
      prereq: ["sfft"],
      cards: ["bounding-diophantine", "squeeze-between-squares"],
      body: String.raw`An integer equation may have only finitely many solutions even when its variables are initially unbounded. A useful inequality turns that fact into a finite search with a justified endpoint. [[bounding-diophantine|Bounding an integer equation]] therefore has two parts: prove that every solution lies in a small range, then check all candidates in that range against the original conditions.

Symmetry can make a bound stronger. Suppose positive integers satisfy $x+y+z=xyz$. Permuting the variables preserves the equation, so first classify solutions in the order $x\le y\le z$. Now $x+y+z\le3z$, giving $xyz\le3z$. Since $z\gt0$, division by $z$ is valid and yields $xy\le3$.

With $1\le x\le y$, the only possibilities are $(x,y)=(1,1),(1,2),(1,3)$. Substitution gives $2+z=z$, $3+z=2z$, or $4+z=3z$. The first is impossible, the second gives $z=3$, and the third gives $z=2$, violating $y\le z$. Only $(1,2,3)$ remains. If the question counts ordered triples without the imposed order, its six permutations are distinct solutions. Ordering variables is legitimate here because the equation and positivity conditions are symmetric; it would not be legitimate for unequal roles such as $x+2y+z=xyz$.

Bounds can also come from physical sizes. If $n$ coins have total thickness fourteen millimeters and each is between $1.35$ and $1.95$ millimeters thick, then

$$1.35n\le14\le1.95n.$$

Thus $14/1.95\le n\le14/1.35$, leaving $n=8,9,10$. The bound alone does not decide which counts work; the individual coin thicknesses can impose additional remainder conditions. Translating a finite range into an answer without checking those conditions can include impossible cases.

A discrete gap can exclude an infinite range all at once. Consecutive nonnegative integer squares have no integer square strictly between them. To prove that $E$ is not a square, it is enough to find an integer $k\ge0$ with $k^2\lt E\lt(k+1)^2$. Both inequalities must be strict; equality at either endpoint is a square.

For $E=n^2+3n+5$, the leading term suggests comparing with squares near $n^2$. The differences are

$$E-(n+1)^2=n+4,\qquad (n+2)^2-E=n-1.$$

For every integer $n\ge2$, both are positive, so $(n+1)^2\lt E\lt(n+2)^2$. No such $n$ works. The remaining positive integer $n=1$ makes the second difference zero, and indeed $E=9=3^2$. This is [[squeeze-between-squares|squeezing between consecutive squares]], with the exceptional endpoint checked separately.

The word consecutive matters. An expression lying between $n^2$ and $(n+3)^2$ might equal either intervening square. The domain matters too: the argument just given handles positive $n$, and the stated inequality does not remain valid for every negative integer.

The same gaps bound a square root without decimal approximation. Since $45^2=2025\lt2026\lt2116=46^2$, the positive integers with $n^2\lt2026$ are exactly $1,2,\ldots,45$. Here the square comparison supplies both a cutoff and a reason that every smaller positive integer works.`,
      related: [
        { card: "sqrt-approximation", note: String.raw`placing a square root between consecutive integers.` },
        { card: "wlog-symmetry", note: String.raw`ordering symmetric variables without loss of generality.` }
      ],
      exercises: [
        { q: String.raw`How many triples of positive integers $x \le y \le z$ satisfy $x + y + z = xyz$?`, answer: "1",
          solution: String.raw`Because $x,y\le z$, the equation gives $xyz=x+y+z\le3z$, hence $xy\le3$ after division by positive $z$. With $1\le x\le y$, the possibilities are $(1,1),(1,2),(1,3)$. These give $2+z=z$ (impossible), $3+z=2z$ ($z=3$), or $4+z=3z$ ($z=2$, contrary to $z\ge y=3$). Thus only $(1,2,3)$ remains, and $1+2+3=1\cdot2\cdot3$ verifies it.` },
        { q: String.raw`Find the positive integer $n$ for which $n^2 + 3n + 5$ is a perfect square.`, answer: "1",
          solution: String.raw`Put $E=n^2+3n+5$. The differences $E-(n+1)^2=n+4$ and $(n+2)^2-E=n-1$ are both positive for $n\ge2$. Thus $E$ lies strictly between consecutive squares and cannot be a square in that range. The only remaining positive integer is $n=1$, for which $E=1+3+5=9$.` },
        { q: String.raw`How many positive integers $n$ satisfy $n^2 \lt 2026$?`, answer: "45",
          solution: String.raw`The exact comparisons are $45^2=2025\lt2026$ and $46^2=2116\gt2026$. Since squaring is strictly increasing for positive integers, every $n=1,2,\ldots,45$ works, and none with $n\ge46$ works. The count is forty-five.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 13",
        "2016 AMC 10A, Problem 14",
        "2012 AMC 10B, Problem 12",
        "2024 AMC 10B, Problem 6"
      ]
    },
    "M5.7": {
      prereq: ["bezouts-identity", "crt", "chicken-mcnugget", "coins-and-prices", "sfft", "factor-pair-counting", "difference-of-squares-rep", "pythagorean-triples", "integer-triangles-perimeter", "bounding-diophantine", "squeeze-between-squares"],
      cards: [],
      body: String.raw`Integer restrictions turn equations into questions about spacing, divisibility, and finite choices. For a linear equation $ax+by=c$ with positive coefficients, the gcd decides whether any integer solution exists. Once one is found, all solutions follow by equal steps in opposite directions. Positivity and upper bounds then restrict the integer parameter. Several remainder conditions combine in the same way, provided their residues agree on the common factors of the moduli.

Coin totals impose nonnegative coefficients, a stronger condition than integer solvability. For two coprime denominations greater than one with unlimited supply, the least attainable total in each residue class proves that the largest missing amount is $ab-a-b$. Fixed coin counts, limited supplies, or additional denominations require their own conditions.

A nonzero constant product limits factors to divisors of that constant. Completing a product or factoring a difference of squares creates such a restriction; reversing the substitution checks signs, parity, and integrality. This correspondence also finds integer right triangles with a fixed leg. The primitive Pythagorean formula describes all right triangles, while sorting sides and imposing the strict triangle inequality counts general triangles without duplication.

When a factorization is not available, inequalities can bound the variables, or place a candidate strictly between consecutive squares. Each inequality must hold throughout the range being excluded, and all endpoint and exceptional cases must be checked. A complete solution combines a restriction that covers every possible solution with a verification that the surviving candidates really work.`,
      strategies: [
        String.raw`Before solving $ax + by = c$, check that $\gcd(a, b)$ divides $c$.`,
        String.raw`Find one solution, write the general solution, and impose the sign conditions.`,
        String.raw`For two coprime denominations $a,b\gt1$ with unlimited supply, the largest missing total is $ab-a-b$.`,
        String.raw`For a nonzero constant product, list its factor pairs and check signs, parity, and any congruence conditions from the substitution.`,
        String.raw`For primitive right triangles use coprime parameters $m\gt n\ge1$ of opposite parity; for a fixed leg, factor a difference of squares.`,
        String.raw`Order symmetric variables and bound the smallest.`,
        String.raw`To show an expression is not a square, trap it between consecutive squares.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many pairs of nonnegative integers satisfy $5x + 8y = 100$?`, answer: "3",
        solution: String.raw`Modulo five, $3y\equiv0$, so $y\equiv0\pmod5$. Nonnegativity requires $8y\le100$, giving $y\le12$. Thus $y=0,5,10$, with $x=20,12,4$, respectively. These are three solutions, and the residue condition and bound exhaust all possibilities.` },
      { q: String.raw`What is the smallest positive integer that leaves remainders $1$, $2$ and $3$ on division by $3$, $4$ and $5$?`, answer: "58",
        solution: String.raw`Each remainder is two less than its divisor, so $n+2$ is divisible by three, four, and five. Their lcm is sixty, hence every solution is $n=60t-2$. The smallest positive one has $t=1$, giving $n=58$. Its remainders are $1,2,3$ as required.` },
      { q: String.raw`How many pairs of positive integers $(x, y)$ satisfy $(x + 1)(y + 2) = 12$?`, answer: "3",
        solution: String.raw`Set $u=x+1,v=y+2$. Then $uv=12$, while positivity of $x,y$ requires $u\ge2,v\ge3$. Among the positive ordered factor pairs of twelve, exactly $(2,6),(3,4),(4,3)$ meet these bounds. They recover $(x,y)=(1,4),(2,2),(3,1)$, so the count is three.` },
      { q: String.raw`Find the perimeter of the primitive Pythagorean triangle given by $m = 4$, $n = 1$.`, answer: "40",
        solution: String.raw`The parameters are positive, coprime, ordered as $4\gt1$, and of opposite parity, so they give a primitive triple. Its sides are $4^2-1^2=15$, $2\cdot4\cdot1=8$, and $4^2+1^2=17$. They satisfy $15^2+8^2=289=17^2$, and the perimeter is $15+8+17=40$.` },
      { q: String.raw`Nuggets come in boxes of $6$, $9$ and $20$. What is the largest number of nuggets that cannot be bought exactly?`, answer: "43",
        solution: String.raw`Use residues modulo six. If $y$ is the number of nine-boxes and $z$ the number of twenty-boxes, the total is congruent to $3y+2z$. For an even residue, $y$ must be even and $z$ is fixed modulo three, so the least totals for residues $0,2,4$ are $0,20,40$. For an odd residue, $y$ must be odd and the same restriction on $z$ gives least totals $9,29,49$ for residues $3,5,1$. Adding six-boxes reaches every larger total in each class. In residue order $0,1,2,3,4,5$, the last missing values are $-6,43,14,3,34,23$. The largest is forty-three; all totals from forty-four onward are attainable.` }
    ],
    problems: [
      "2026 AIME I, Problem 4",
      "1993 AIME, Problem 4"
    ]
  },
  challenge: {
    problems: [
      "2020 AMC 10A, Problem 24",
      "2023 AMC 10A, Problem 23",
      "2023 AMC 10B, Problem 23",
      "1987 AIME, Problem 5"
    ]
  }
};
