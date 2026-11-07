// Learn, AMC Algebra, chapter L10: advanced polynomials (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L10"] = {
  lessons: {
    "L10.1": {
      prereq: ["vietas-quadratic", "factor-remainder-theorem"],
      cards: [],
      body: String.raw`A polynomial can contain useful information even when its individual roots are difficult to find. Its coefficients record sums and products of the roots; its values record remainders; and substitutions can change the roots in a prescribed way. The first step is to identify which of these forms matches the information requested.

For a monic cubic with roots $r,s,t$, expanding $(x-r)(x-s)(x-t)$ gives coefficients $-(r+s+t)$, $rs+st+tr$, and $-rst$. Thus the polynomial $x^3-6x^2+11x-6$ tells us that the roots add to $6$ and their pairwise products add to $11$. Squaring the first relation gives $r^2+s^2+t^2=36-22=14$, without a separate calculation of any root.

Sometimes the target is a product rather than a sum. The product $(c-r)(c-s)(c-t)$ is simply the monic polynomial's value at $c$. The same fact connects roots to remainders: division by $x-c$ leaves the constant remainder $P(c)$. These are two uses of the same factor-and-value relationship.

Changes to the roots can also be handled at the polynomial level. If a new variable $y$ is meant to equal an old root plus one, then the old input is $y-1$, so the new equation is $P(y-1)=0$. This direction of substitution matters. Replacing $x$ by $x+1$ would move the roots the other way.

The chapter first develops coefficient information and transformations of roots, then constructs remainders and polynomials from specified values. It finishes with radicals and reciprocal expressions whose expansions reveal lower-degree equations, and with factorizations obtained by completing squares. In each setting, the identity used must preserve the original domain and any assumptions about degree.`,
      exercises: [
        { q: String.raw`The roots of $x^3 - 6x^2 + 11x - 6$ are $r$, $s$, $t$. Find $r^2 + s^2 + t^2$.`, answer: "14",
          solution: String.raw`By Vieta, $r + s + t = 6$ and $rs + st + tr = 11$, so $r^2 + s^2 + t^2 = 36 - 22 = 14$.` },
        { q: String.raw`If $a + \tfrac1a = 3$, find $a^2 + \tfrac1{a^2}$.`, answer: "7",
          solution: String.raw`Square: $a^2 + 2 + \tfrac1{a^2} = 9$, so $a^2 + \tfrac1{a^2} = 7$.` },
        { q: String.raw`A quadratic with rational coefficients has the root $2 + \sqrt3$. Find the sum of its roots.`, answer: "4",
          solution: String.raw`The conjugate $2 - \sqrt3$ is also a root, and the two add to $4$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 16",
        "2007 AMC 10A, Problem 20",
        "2007 AMC 12A, Problem 18"
      ]
    },
    "L10.2": {
      prereq: ["vietas-quadratic", "symmetric-polynomial-strategies"],
      cards: ["vietas-general", "newtons-sums"],
      body: String.raw`Suppose $P(x)=a_n(x-r_1)\cdots(x-r_n)$, where $a_n\ne0$ and repeated roots are listed according to their multiplicities. To obtain the coefficient of $x^{n-1}$ in the expansion, choose a root term from one factor and $x$ from all the others. The choices add to $-a_n(r_1+\cdots+r_n)$. For the next coefficient, choose root terms from two different factors; their products enter with a positive sign.

Continuing this count gives [[vietas-general|Vieta's formulas]]: the coefficient $k$ places below the leading coefficient is $(-1)^k a_n$ times the sum of all products of $k$ different root positions. The signs alternate because each chosen root term has a minus sign. The formulas apply to non-real roots too; reality is not needed for the expansion.

For $P(x)=x^3-2x^2-5x+6$, write $S=r+s+t=2$, $Q=rs+st+tr=-5$, and $T=rst=-6$. The square of $S$ counts each individual square once and each pairwise product twice, so

$$r^2+s^2+t^2=S^2-2Q=4+10=14.$$

No choice of ordering of the roots affects this calculation. Products of shifted roots can be read just as directly: $(2-r)(2-s)(2-t)=P(2)=-4$. For a polynomial that is not monic, divide by its leading coefficient: in general $\prod_i(c-r_i)=P(c)/a_n$. A product of $r_i-c$ has an additional factor $(-1)^n$.

Higher power sums can be developed without repeatedly expanding large symmetric expressions. Define $p_k=r^k+s^k+t^k$. For the monic cubic $x^3+bx^2+cx+d$, the initial sums are $p_1=-b$ and $p_2=p_1^2-2c$. Each root satisfies its own polynomial equation, so adding $r^3+br^2+cr+d=0$ over the three roots gives

$$p_3+bp_2+cp_1+3d=0.$$

The constant is counted three times. For $k\ge4$, multiply each root equation by that root to the power $k-3$ before adding. The result is

$$p_k+bp_{k-1}+cp_{k-2}+dp_{k-3}=0.$$

These are the cubic instances of [[newtons-sums|Newton's sums]]. If we set $p_0=3$, the same recurrence also includes the $k=3$ equation, but $p_0$ must not be mistaken for $1$.

For $x^3-3x+1$, the coefficients give $p_1=0$ and $p_2=6$. Summing the root equations gives $p_3=3p_1-3=-3$; the next step gives $p_4=3p_2-p_1=18$. Each new sum follows from the preceding ones. Vieta's formulas supply the initial information, while the polynomial equation propagates it to higher powers.

If roots must also be positive integers, their sum and product restrict a finite search. Such a search uses additional arithmetic conditions; Vieta's formulas alone do not say that the roots are real, distinct, or integral.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`writing symmetric expressions in sums and products (L3.3).` },
        { card: "roots-of-unity", note: String.raw`polynomials whose roots are the roots of unity, where Vieta gives sums of cosines (L13.4).` }
      ],
      exercises: [
        { q: String.raw`The roots of $x^3 - 2x^2 - 5x + 6$ are $r$, $s$, $t$. Find $(2 - r)(2 - s)(2 - t)$.`, answer: "-4",
          solution: String.raw`The polynomial is $(x - r)(x - s)(x - t)$, so the product is its value at $2$: $8 - 8 - 10 + 6 = -4$.` },
        { q: String.raw`The roots of $x^3 - 2x^2 - 5x + 6$ are $r$, $s$, $t$. Find $r^2 + s^2 + t^2$.`, answer: "14",
          solution: String.raw`By Vieta the roots add to $2$ and the pairwise products to $-5$, so $r^2 + s^2 + t^2 = 2^2 - 2(-5) = 14$. (The roots are $1$, $3$, $-2$.)` },
        { q: String.raw`The roots of $x^3 - 3x + 1$ are $r$, $s$, $t$. Find $r^3 + s^3 + t^3$.`, answer: "-3",
          solution: String.raw`Each root satisfies $r^3 = 3r - 1$, so $r^3 + s^3 + t^3 = 3(r + s + t) - 3 = 3 \cdot 0 - 3 = -3$.` }
      ],
      problems: [
        "2021 Spring AMC 12A, Problem 12",
        "2023 AMC 12B, Problem 14",
        "2004 AMC 12B, Problem 17",
        "2025 AMC 12A, Problem 19",
        "2003 AMC 12A, Problem 21"
      ]
    },
    "L10.3": {
      prereq: ["vietas-general"],
      cards: ["conjugate-root-theorems", "root-transformations"],
      body: String.raw`The coefficients of a polynomial can force roots to occur together. For real coefficients, taking the complex conjugate of $P(z)=0$ gives $P(\overline z)=0$: conjugation preserves sums and products, and leaves every real coefficient unchanged. Thus a non-real root $a+bi$ has the partner $a-bi$, with the same multiplicity. Their product of linear factors is the real quadratic $(x-a)^2+b^2$.

A related statement holds for square roots over the rationals. Suppose the coefficients, $a$, and $d$ are rational, with $d\gt0$ and $\sqrt d$ irrational. Expanding $P(a+\sqrt d)$ and replacing every even power of $\sqrt d$ by a rational number reduces the value to $A+B\sqrt d$, with rational $A,B$. If that value is zero, irrationality forces $A=B=0$. Replacing $\sqrt d$ by $-\sqrt d$ therefore still gives zero. This proves the quadratic-irrational case of [[conjugate-root-theorems|the conjugate root theorems]]. The assumptions on the coefficient field and on $a,d$ are essential.

For a monic quadratic with rational coefficients and root $3+\sqrt2$, the partner must be $3-\sqrt2$. The polynomial is therefore $(x-3)^2-2=x^2-6x+7$. Likewise, a monic real cubic with roots $2$ and $1+i$ must also have root $1-i$, giving $(x-2)((x-1)^2+1)=x^3-4x^2+6x-4$. The word monic fixes the leading coefficient; otherwise any nonzero constant multiple would have the same roots.

Another way to build a new polynomial is to prescribe how each old root changes. Let $y=r+1$ for an old root $r$. Then $r=y-1$, so substituting $y-1$ into the old polynomial makes it vanish at the desired new root. For $P(x)=x^2-5x+3$, this gives

$$P(y-1)=(y-1)^2-5(y-1)+3=y^2-7y+9.$$

The new roots have sum $7$ and product $9$, agreeing with $(r+1)+(s+1)=5+2$ and $(r+1)(s+1)=3+5+1$. This second check confirms the direction of the shift.

More generally, to transform roots by $y=cr+h$, with $c\ne0$, substitute $(y-h)/c$ for the old input. Multiplying by $c^n/a_n$ makes the result monic when $P$ has degree $n$ and leading coefficient $a_n$. The nonzero constant multiplier changes no roots. This is [[root-transformations|transforming the roots]] by reversing the relation between old and new variables.

For reciprocal roots, use $y^nP(1/y)$. Its coefficients are reversed. This gives a degree-$n$ polynomial with roots $1/r_i$ only when the original constant term is nonzero, so that none of the $r_i$ is zero. If $P$ has a zero root, remove its powers of $x$ before considering reciprocals of the remaining roots. For $2x^2-3x+1$, reversal gives $y^2-3y+2$, whose roots are $2$ and $1$, the reciprocals of $1/2$ and $1$.`,
      related: [
        { card: "complex-basics", note: String.raw`the conjugate $a - bi$ and the modulus (L13.2).` },
        { card: "palindromic-polynomials", note: String.raw`polynomials that equal their own reversal, whose roots come in pairs $r$, $\tfrac1r$ (L10.5).` }
      ],
      exercises: [
        { q: String.raw`A monic quadratic with rational coefficients has the root $3 + \sqrt2$. Find its constant term.`, answer: "7",
          solution: String.raw`The other root is $3 - \sqrt2$, and the constant term is the product $9 - 2 = 7$: the quadratic is $x^2 - 6x + 7$.` },
        { q: String.raw`A monic cubic with real coefficients has the roots $2$ and $1 + i$. Find its constant term.`, answer: "-4",
          solution: String.raw`The third root is $1 - i$. The cubic is $(x - 2)(x^2 - 2x + 2) = x^3 - 4x^2 + 6x - 4$, with constant term $-4$.` },
        { q: String.raw`The roots of $x^2 - 5x + 3$ are $r$ and $s$. Find the constant term of the monic quadratic with roots $r + 1$ and $s + 1$.`, answer: "9",
          solution: String.raw`Substitute $x - 1$ for $x$: $(x - 1)^2 - 5(x - 1) + 3 = x^2 - 7x + 9$. The constant term is $9$, which is $(r + 1)(s + 1) = rs + r + s + 1 = 3 + 5 + 1$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 8",
        "2021 Spring AMC 12B, Problem 16",
        "2021 Fall AMC 12A, Problem 15",
        "2020 AMC 12B, Problem 17",
        "2004 AMC 12A, Problem 23"
      ]
    },
    "L10.4": {
      prereq: ["factor-remainder-theorem", "linear-elimination"],
      cards: ["polynomial-crt", "lagrange-interpolation"],
      body: String.raw`Division by a polynomial $D$ writes $P=DQ+R$, with $\deg R\lt\deg D$, unless $R$ is zero. At a root of $D$, the term $DQ$ vanishes, so $P$ and its remainder have the same value. This converts remainder information into equations for a polynomial of smaller degree.

Suppose $P(1)=3$ and $P(2)=5$, and divide by $(x-1)(x-2)$. The remainder has degree at most one, so write it as $R(x)=ax+b$. Its values give $a+b=3$ and $2a+b=5$, hence $R(x)=2x+1$ and $R(3)=7$. This does not imply that $P(3)=7$: the discarded multiple of the divisor need not vanish at $3$.

There is also a direct construction. The linear polynomial $2-x$ is $1$ at $x=1$ and $0$ at $x=2$; the polynomial $x-1$ has the opposite values. Consequently

$$R(x)=3(2-x)+5(x-1)$$

has the required values. These two building blocks let us control one value at a time.

The same construction works at any distinct inputs $x_0,\ldots,x_n$. For input $x_i$, form the polynomial

$$L_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}.$$

It equals one at $x_i$ and zero at every other listed input. Thus $\sum_i y_iL_i(x)$ takes value $y_i$ at each $x_i$ and has degree at most $n$. This is [[lagrange-interpolation|Lagrange interpolation]]. The denominators are nonzero because the inputs are distinct.

There can be only one such polynomial of degree at most $n$. If two existed, their difference would have at least $n+1$ distinct roots but degree at most $n$, contradicting the root bound for a nonzero polynomial. The degree restriction is doing real work in that conclusion.

For values $1,3,7$ at $0,1,2$, the construction gives

$$P(x)=\frac{(x-1)(x-2)}2+3x(2-x)+7\frac{x(x-1)}2=x^2+x+1.$$

Its value at $3$ is $13$. Without the degree bound, adding $k\,x(x-1)(x-2)$ preserves all three specified values but changes the value at $3$ by $6k$. A finite list of values cannot determine an unrestricted polynomial.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 335" role="img" aria-labelledby="l104-values-title l104-values-desc" style="width:100%;max-width:520px;height:auto"><title id="l104-values-title">Three input values do not determine an unrestricted polynomial</title><desc id="l104-values-desc">A solid quadratic and a dashed cubic agree at zero, one and two, where their values are one, three and seven. At three they differ: the quadratic has value thirteen and the cubic has value sixteen.</desc><g fill="none" stroke="currentColor"><path d="M70 48V295H445" opacity="0.5"/><path d="M70.00,281.00L72.75,280.64L75.50,280.26L78.25,279.87L81.00,279.46L83.75,279.03L86.50,278.58L89.25,278.12L92.00,277.64L94.75,277.14L97.50,276.62L100.25,276.09L103.00,275.54L105.75,274.97L108.50,274.38L111.25,273.78L114.00,273.16L116.75,272.52L119.50,271.87L122.25,271.19L125.00,270.50L127.75,269.79L130.50,269.06L133.25,268.32L136.00,267.56L138.75,266.78L141.50,265.99L144.25,265.17L147.00,264.34L149.75,263.49L152.50,262.62L155.25,261.74L158.00,260.84L160.75,259.92L163.50,258.99L166.25,258.03L169.00,257.06L171.75,256.07L174.50,255.06L177.25,254.04L180.00,253.00L182.75,251.94L185.50,250.87L188.25,249.77L191.00,248.66L193.75,247.53L196.50,246.38L199.25,245.22L202.00,244.04L204.75,242.84L207.50,241.62L210.25,240.39L213.00,239.14L215.75,237.87L218.50,236.58L221.25,235.28L224.00,233.96L226.75,232.62L229.50,231.26L232.25,229.89L235.00,228.50L237.75,227.09L240.50,225.66L243.25,224.22L246.00,222.76L248.75,221.28L251.50,219.79L254.25,218.27L257.00,216.74L259.75,215.19L262.50,213.62L265.25,212.04L268.00,210.44L270.75,208.82L273.50,207.19L276.25,205.53L279.00,203.86L281.75,202.17L284.50,200.47L287.25,198.74L290.00,197.00L292.75,195.24L295.50,193.47L298.25,191.67L301.00,189.86L303.75,188.03L306.50,186.19L309.25,184.32L312.00,182.44L314.75,180.54L317.50,178.62L320.25,176.69L323.00,174.74L325.75,172.77L328.50,170.78L331.25,168.78L334.00,166.76L336.75,164.72L339.50,162.66L342.25,160.59L345.00,158.50L347.75,156.39L350.50,154.27L353.25,152.12L356.00,149.96L358.75,147.78L361.50,145.59L364.25,143.37L367.00,141.14L369.75,138.89L372.50,136.62L375.25,134.34L378.00,132.04L380.75,129.72L383.50,127.38L386.25,125.03L389.00,122.66L391.75,120.27L394.50,117.87L397.25,115.44L400.00,113.00" stroke-width="2.2"/><path d="M70.00,281.00L72.75,280.30L75.50,279.62L78.25,278.94L81.00,278.26L83.75,277.60L86.50,276.93L89.25,276.28L92.00,275.62L94.75,274.97L97.50,274.33L100.25,273.68L103.00,273.04L105.75,272.40L108.50,271.76L111.25,271.12L114.00,270.47L116.75,269.83L119.50,269.18L122.25,268.53L125.00,267.88L127.75,267.22L130.50,266.55L133.25,265.88L136.00,265.21L138.75,264.53L141.50,263.84L144.25,263.14L147.00,262.43L149.75,261.71L152.50,260.98L155.25,260.25L158.00,259.50L160.75,258.73L163.50,257.96L166.25,257.17L169.00,256.37L171.75,255.55L174.50,254.72L177.25,253.87L180.00,253.00L182.75,252.12L185.50,251.21L188.25,250.29L191.00,249.35L193.75,248.39L196.50,247.41L199.25,246.41L202.00,245.38L204.75,244.34L207.50,243.27L210.25,242.17L213.00,241.05L215.75,239.91L218.50,238.73L221.25,237.54L224.00,236.31L226.75,235.06L229.50,233.78L232.25,232.47L235.00,231.12L237.75,229.75L240.50,228.35L243.25,226.92L246.00,225.45L248.75,223.95L251.50,222.41L254.25,220.84L257.00,219.24L259.75,217.60L262.50,215.92L265.25,214.21L268.00,212.46L270.75,210.67L273.50,208.84L276.25,206.97L279.00,205.06L281.75,203.11L284.50,201.11L287.25,199.08L290.00,197.00L292.75,194.88L295.50,192.71L298.25,190.50L301.00,188.24L303.75,185.94L306.50,183.59L309.25,181.19L312.00,178.74L314.75,176.25L317.50,173.70L320.25,171.11L323.00,168.46L325.75,165.76L328.50,163.01L331.25,160.21L334.00,157.35L336.75,154.44L339.50,151.47L342.25,148.45L345.00,145.38L347.75,142.24L350.50,139.05L353.25,135.80L356.00,132.49L358.75,129.12L361.50,125.69L364.25,122.20L367.00,118.65L369.75,115.04L372.50,111.36L375.25,107.62L378.00,103.82L380.75,99.95L383.50,96.01L386.25,92.01L389.00,87.95L391.75,83.81L394.50,79.61L397.25,75.34L400.00,71.00" stroke-width="2.2" stroke-dasharray="6 4"/></g><g fill="currentColor" font-size="15"><text x="250" y="21" text-anchor="middle">Solid: P = x² + x + 1</text><text x="250" y="43" text-anchor="middle">Dashed: P + ½x(x − 1)(x − 2)</text><circle cx="70" cy="281" r="4"/><circle cx="180" cy="253" r="4"/><circle cx="290" cy="197" r="4"/><text x="70" y="319" text-anchor="middle">0</text><text x="180" y="319" text-anchor="middle">1</text><text x="290" y="319" text-anchor="middle">2</text><text x="400" y="319" text-anchor="middle">3</text><text x="55" y="300" text-anchor="end">0</text><text x="55" y="230" text-anchor="end">5</text><text x="55" y="160" text-anchor="end">10</text><text x="55" y="90" text-anchor="end">15</text><text x="458" y="299">x</text><text x="54" y="57">y</text><text x="414" y="117">13</text><text x="414" y="75">16</text></g></svg>

The solid quadratic and dashed cubic agree at the three specified inputs, but give different values at $3$. Their difference is a multiple of the product that vanishes at all three known inputs.

For division by a product of distinct linear factors, interpolation determines the remainder because its degree is smaller than the number of specified roots. [[polynomial-crt|The polynomial Chinese Remainder Theorem]] extends this principle to pairwise coprime polynomial divisors: the separate remainders determine one remainder modulo their product. Repeated factors require more information. Knowing $P(1)$ alone does not determine the remainder modulo $(x-1)^2$, since every $P(x)=3+c(x-1)$ has the same value at $1$ and a different remainder as $c$ changes.

If the known information is already a list of roots, use its vanishing product directly. A cubic with roots $1,2,3$ has form $a(x-1)(x-2)(x-3)$. The value $P(0)=-12$ gives $a=2$, and then $P(4)=12$. Both interpolation and this factor construction use the degree bound to rule out additional undetermined terms.`,
      related: [
        { card: "finite-differences", note: String.raw`extending a polynomial sequence by its differences (L11.4).` },
        { card: "crt", note: String.raw`the Chinese Remainder Theorem for integers, the same structure.` }
      ],
      exercises: [
        { q: String.raw`A polynomial $P$ has $P(1) = 3$ and $P(2) = 5$. Its remainder on division by $(x - 1)(x - 2)$ is $R(x)$. Find $R(3)$.`, answer: "7",
          solution: String.raw`Write $R(x) = ax + b$ with $a + b = 3$ and $2a + b = 5$: $a = 2$, $b = 1$. So $R(3) = 7$.` },
        { q: String.raw`A polynomial of degree at most $2$ has $P(0) = 1$, $P(1) = 3$ and $P(2) = 7$. Find $P(3)$.`, answer: "13",
          solution: String.raw`The quadratic $x^2+x+1$ gives the three required values at $0,1,2$. Any other polynomial of degree at most two with those values would differ from it by a polynomial of degree at most two with three distinct roots, so it must be the same polynomial. Thus $P(3)=9+3+1=13$.` },
        { q: String.raw`A cubic $P$ has roots $1$, $2$, $3$ and $P(0) = -12$. Find $P(4)$.`, answer: "12",
          solution: String.raw`$P(x) = a(x - 1)(x - 2)(x - 3)$, and $P(0) = -6a = -12$ gives $a = 2$. Then $P(4) = 2 \cdot 3 \cdot 2 \cdot 1 = 12$.` }
      ],
      problems: [
        "2022 AMC 12B, Problem 20",
        "2005 AMC 12A, Problem 24"
      ]
    },
    "L10.5": {
      prereq: ["two-variable-identities", "difference-of-squares"],
      cards: ["denesting-radicals", "palindromic-polynomials", "reciprocal-power-sums", "forced-difference-of-squares"],
      body: String.raw`A substitution can lower the apparent complexity of an expression when it respects a symmetry. Swapping two quantities preserves their sum and product; replacing $x$ by $1/x$ preserves $x+1/x$. Expanding these unchanged combinations lets us reconstruct more complicated expressions from them.

For [[denesting-radicals|denesting a radical]], start by squaring a proposed sum: $(\sqrt m+\sqrt n)^2=m+n+2\sqrt{mn}$ for $m,n\ge0$. Thus $\sqrt{A+2\sqrt B}$ can have this form when $m+n=A$ and $mn=B$. The needed numbers are the roots of $u^2-Au+B=0$, and they must be nonnegative. Not every nested radical gives convenient rational values of $m,n$.

For $\sqrt{9+4\sqrt5}$, write the inner term as $2\sqrt{20}$. The sum $9$ and product $20$ give $m,n=5,4$, so the root is $\sqrt5+2$. Squaring verifies the value, and nonnegativity selects it rather than its negative. With a minus sign, the corresponding rule is $\sqrt{m+n-2\sqrt{mn}}=|\sqrt m-\sqrt n|$. For example, $\sqrt{11-6\sqrt2}=|3-\sqrt2|=3-\sqrt2$ because $3\gt\sqrt2$.

For a reciprocal pair, let $t=x+1/x$, with $x\ne0$. Squaring gives $x^2+x^{-2}=t^2-2$. More generally, write $U_k=x^k+x^{-k}$ and multiply by $t$. The two middle terms give $U_{k-1}$, so

$$U_{k+1}=tU_k-U_{k-1},\qquad U_0=2,\quad U_1=t.$$

This derives [[reciprocal-power-sums|the reciprocal power sums]] successively. In particular $U_3=t^3-3t$. At $t=4$, $U_2=14$ and $U_4=U_2^2-2=194$. As with power sums of polynomial roots, the recurrence avoids solving for the individual numbers.

The same symmetry appears in [[palindromic-polynomials|a polynomial with symmetric coefficients]]. For

$$x^4-5x^3+8x^2-5x+1=0,$$

zero cannot be a root. Dividing by $x^2$ groups the reciprocal terms as $(x^2+x^{-2})-5(x+x^{-1})+8=0$. With $t=x+1/x$, this is $t^2-5t+6=0$, so $t=2$ or $3$. Return to the original variable through $x^2-tx+1=0$: $t=2$ gives $x=1$, a repeated root, while $t=3$ gives $(3+\sqrt5)/2$ and $(3-\sqrt5)/2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 255" role="img" aria-labelledby="l105-reciprocal-title l105-reciprocal-desc" style="width:100%;max-width:520px;height:auto"><title id="l105-reciprocal-title">A reciprocal substitution produces two branches of original roots</title><desc id="l105-reciprocal-desc">The reduced polynomial has t equal to two or three. At t equal to two, x squared minus two x plus one has the double root one. At t equal to three, x squared minus three x plus one has two reciprocal roots, three plus or minus square root of five, divided by two.</desc><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M240 41L130 67M280 41L390 67M130 101V126M390 101V126M130 164V188M390 164V188"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="27">(t − 2)(t − 3) = 0</text><text x="130" y="90">t = 2</text><text x="390" y="90">t = 3</text><text x="130" y="151">x² − 2x + 1 = 0</text><text x="390" y="151">x² − 3x + 1 = 0</text><text x="130" y="211">x = 1 (double root)</text><text x="390" y="211">x = (3 ± √5) / 2</text><text x="260" y="245">Each branch has root product 1</text></g></svg>

The branches in the diagram are reciprocal pairs because the product of the roots of $x^2-tx+1$ is one. For real $x$, the discriminant also requires $t^2-4\ge0$, or $|t|\ge2$. A real block value between $-2$ and $2$ would give no real original roots. For a palindromic polynomial of even degree $2m$, dividing by $x^m$ groups terms into the $U_k$, producing a polynomial of degree $m$ in $t$. An odd-degree palindromic polynomial first has the factor $x+1$, after which the even-degree reduction applies.

Completing a square can reveal a different kind of symmetry. To factor $n^4-20n^2+4$, use $(n^2-2)^2=n^4-4n^2+4$, leaving a square to subtract:

$$n^4-20n^2+4=(n^2-2)^2-(4n)^2=(n^2-4n-2)(n^2+4n-2).$$

This is [[forced-difference-of-squares|forcing a difference of squares]]. At $n=5$ it gives $129=3\cdot43$. For a numerical compositeness argument, also verify that both integer factors have absolute value greater than one; a symbolic factorization alone does not exclude a factor of $1$ or $-1$.`,
      related: [
        { card: "substitute-repeated-block", note: String.raw`the substitution $t = x + \tfrac1x$ is a repeated block (L5.2).` },
        { card: "rationalizing", note: String.raw`clearing roots from a denominator (L1.3).` }
      ],
      exercises: [
        { q: String.raw`Write $\sqrt{9 + 4\sqrt5}$ in the form $a + \sqrt b$.`, answer: "2 + sqrt(5)",
          solution: String.raw`Look for $\sqrt m + \sqrt n$ with $m + n = 9$ and $mn = 20$: $m = 5$, $n = 4$. So it is $2 + \sqrt5$; check $(2 + \sqrt5)^2 = 9 + 4\sqrt5$.` },
        { q: String.raw`If $x + \tfrac1x = 4$, find $x^4 + \tfrac1{x^4}$.`, answer: "194",
          solution: String.raw`Square: $x^2 + \tfrac1{x^2} = 16 - 2 = 14$. Square again: $x^4 + \tfrac1{x^4} = 196 - 2 = 194$.` },
        { q: String.raw`Factor $n^4 - 20n^2 + 4$ to find the largest prime factor of its value at $n = 5$.`, answer: "43",
          solution: String.raw`$n^4 - 20n^2 + 4 = (n^2 - 2)^2 - 16n^2 = (n^2 - 4n - 2)(n^2 + 4n - 2)$. At $n = 5$ the factors are $3$ and $43$, and $3 \cdot 43 = 129 = 625 - 500 + 4$.` }
      ],
      problems: [
        "2011 AMC 10A, Problem 16",
        "2024 AMC 10B, Problem 13",
        "2021 Spring AMC 10B, Problem 15",
        "2009 AMC 12B, Problem 19"
      ]
    },
    "L10.6": {
      prereq: ["difference-of-squares", "an-minus-bn"],
      cards: ["cubes-minus-3abc", "sophie-germain", "useful-factorizations"],
      body: String.raw`Completing a square is useful beyond finding a quadratic minimum. It can convert a sum of higher powers into a difference of squares, after which the two factors are explicit. To factor $a^4+4b^4$, the missing cross term in $(a^2+2b^2)^2$ is $4a^2b^2$, itself a square. Add it inside the square and subtract it outside:

$$a^4+4b^4=(a^2+2b^2)^2-(2ab)^2.$$

Factoring gives [[sophie-germain|the Sophie Germain identity]],

$$a^4+4b^4=(a^2+2b^2-2ab)(a^2+2b^2+2ab).$$

The two factors can also be written $(a-b)^2+b^2$ and $(a+b)^2+b^2$. This form helps check their size. For integers $a\ge2$ and $b\ge1$, both factors exceed one: if $b\ge2$ their $b^2$ terms already do, while $b=1$ gives $(a-1)^2+1\ge2$ for the smaller factor. Hence the identity proves compositeness under these conditions. For $a=3,b=1$, it gives $85=5\cdot17$.

To apply the identity to $n^4+4^k$, the second term must actually be four times an integer fourth power. If $k=2m+1$ is a positive odd integer, then $4^k=4(2^m)^4$, so every integer $n\ge2$ gives a composite value. The same conclusion does not follow for even $k$: $3^4+4^2=97$ is prime. Matching the coefficient and the exponent is part of applying a factorization.

Another useful identity connects symmetric cubes to the sum and pairwise products. Set $S=a+b+c$, $Q=ab+bc+ca$, and $T=abc$. Expanding $S(a^2+b^2+c^2-Q)$ cancels the mixed square terms and leaves $a^3+b^3+c^3-3T$. Since $a^2+b^2+c^2=S^2-2Q$, this gives

$$a^3+b^3+c^3=S^3-3SQ+3T.$$

This is [[cubes-minus-3abc|the three-variable sum-of-cubes identity]]. For $S=6,Q=11,T=6$, the cube sum is $216-198+18=36$. For real variables, the factor $a^2+b^2+c^2-Q$ is half the sum $(a-b)^2+(b-c)^2+(c-a)^2$, so it is nonnegative and vanishes exactly when all three variables agree. If instead $S=0$, the identity gives $a^3+b^3+c^3=3abc$.

Differences and sums of two cubes arise from the same expansion-and-cancellation reasoning. Multiplying $(a-b)(a^2+ab+b^2)$ leaves $a^3-b^3$; replacing $b$ by $-b$ gives $(a+b)(a^2-ab+b^2)=a^3+b^3$. They explain $999=10^3-1=9\cdot111=3^3\cdot37$ and $1001=10^3+1=11\cdot91=7\cdot11\cdot13$.

Some [[useful-factorizations|further factorizations]] are obtained by inserting a square into an almost-square expression. For example, $x^4+x^2+1=(x^2+1)^2-x^2=(x^2+x+1)(x^2-x+1)$. The expansion suggests which square to complete; the difference-of-squares identity then supplies the factors. In arithmetic applications, finish by checking that the resulting factors are integers of the required size.`,
      related: [
        { card: "sum-zero-identities", note: String.raw`the case $a + b + c = 0$, where $a^3 + b^3 + c^3 = 3abc$ (L5.3).` },
        { card: "forced-difference-of-squares", note: String.raw`completing a square to factor, the idea behind Sophie Germain (L10.5).` }
      ],
      exercises: [
        { q: String.raw`What is the largest prime factor of $3^4 + 4$?`, answer: "17",
          solution: String.raw`By Sophie Germain with $a = 3$, $b = 1$: $(9 + 2 + 6)(9 + 2 - 6) = 17 \cdot 5 = 85$. The largest prime factor is $17$.` },
        { q: String.raw`If $a + b + c = 6$, $ab + bc + ca = 11$ and $abc = 6$, find $a^3 + b^3 + c^3$.`, answer: "36",
          solution: String.raw`$a^2 + b^2 + c^2 = 36 - 22 = 14$, and $a^3 + b^3 + c^3 = 3abc + (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 18 + 6 \cdot 3 = 36$.` },
        { q: String.raw`What is the largest prime factor of $999$?`, answer: "37",
          solution: String.raw`$999 = 10^3 - 1 = 9 \cdot 111 = 3^3 \cdot 37$. The largest prime factor is $37$.` }
      ],
      problems: [
        "2021 Fall AMC 10B, Problem 12",
        "2012 AMC 10A, Problem 24",
        "2020 AMC 10B, Problem 22"
      ]
    },
    "L10.7": {
      prereq: ["vietas-general", "newtons-sums", "conjugate-root-theorems", "root-transformations", "polynomial-crt", "lagrange-interpolation", "denesting-radicals", "reciprocal-power-sums", "palindromic-polynomials", "cubes-minus-3abc", "sophie-germain"],
      cards: [],
      body: String.raw`Expanding a factored polynomial connects coefficients to its roots. [[vietas-general|Vieta's formulas]] give sums of products of distinct root positions, with multiplicities retained and signs alternating. Squaring a root sum gives a sum of squares after subtracting twice the pairwise products. For higher powers, [[newtons-sums|sum the equations satisfied by the roots]] to obtain a recurrence. Products of $c-r_i$ are read from $P(c)/a_n$.

Coefficient assumptions also control which roots must accompany one another. [[conjugate-root-theorems|Real coefficients force complex-conjugate pairs]], while rational coefficients force the paired quadratic irrationalities described in the lesson. To construct [[root-transformations|a polynomial with transformed roots]], solve for the old variable in terms of the new one before substituting. Reciprocal transformations require nonzero original roots.

Values at distinct points determine a polynomial only with a degree bound. [[lagrange-interpolation|Interpolation]] constructs that polynomial and the root bound proves uniqueness. Applied to a remainder, the degree bound comes from division by the divisor. [[polynomial-crt|Separate polynomial remainders]] combine uniquely modulo a product of pairwise coprime divisors; values alone are insufficient for repeated factors.

[[denesting-radicals|Denesting]] uses sums and products of nonnegative square roots, including the sign needed for a principal square root. [[reciprocal-power-sums|Reciprocal power sums]] and [[palindromic-polynomials|palindromic equations]] use the unchanged block $x+1/x$, followed by a check of its possible real values and the preimages of each block value.

Finally, completing a square can expose a product through [[sophie-germain|the Sophie Germain identity]] or another difference of squares. [[cubes-minus-3abc|The cubic identity]] expresses a three-variable cube sum in elementary symmetric quantities. A factorization establishes a numerical compositeness claim only after its integer factors are shown to be nontrivial.`,
      strategies: [
        String.raw`Translate any question about the roots into their elementary symmetric sums.`,
        String.raw`For $\prod (c - r_i)$, evaluate the monic polynomial at $c$.`,
        String.raw`For power sums of roots, use that each root satisfies the polynomial, or run Newton's sums.`,
        String.raw`Use complex-conjugate pairing for real coefficients, and quadratic-irrational pairing for rational coefficients under the stated assumptions.`,
        String.raw`For a polynomial with shifted, scaled or inverted roots, substitute instead of solving.`,
        String.raw`For a polynomial given by values, check the degree bound and distinctness of the inputs before interpolating.`,
        String.raw`Try $\sqrt m + \sqrt n$ for a nested radical, and $t = x + \tfrac1x$ for a symmetric expression.`,
        String.raw`Before testing a large number for primality, try the factorizations: cubes, $a^4 + 4b^4$, a forced difference of squares.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the product of the roots of $x^3 + x^2 - 4x - 4$.`, answer: "4",
        solution: String.raw`By Vieta the product of the roots of a monic cubic is $-d = 4$. (The roots are $-1$, $2$, $-2$.)` },
      { q: String.raw`Find the sum of the squares of the roots of $x^4 - 5x^2 + 6$.`, answer: "10",
        solution: String.raw`The roots are $\pm\sqrt2$ and $\pm\sqrt3$, whose squares add to $2 + 2 + 3 + 3 = 10$. By Vieta: the roots add to $0$ and the pairwise products to $-5$, so the squares add to $0 - 2(-5) = 10$.` },
      { q: String.raw`The roots of $2x^2 - 3x + 1$ are $r$ and $s$. Find the constant term of the monic quadratic with roots $\tfrac1r$ and $\tfrac1s$.`, answer: "2",
        solution: String.raw`Reverse the coefficients: $x^2 - 3x + 2$ has the reciprocal roots. Its constant term is $2 = \tfrac{1}{rs}$, since $rs = \tfrac12$.` },
      { q: String.raw`Write $\sqrt{11 - 6\sqrt2}$ in the form $a - \sqrt b$.`, answer: "3 - sqrt(2)",
        solution: String.raw`$11 - 6\sqrt2 = 11 - 2\sqrt{18}$, so look for $\sqrt m - \sqrt n$ with $m + n = 11$ and $mn = 18$: $m = 9$, $n = 2$. So it is $3 - \sqrt2$, which is positive as it must be.` },
      { q: String.raw`A quadratic $P$ has $P(1) = 2$, $P(2) = 5$ and $P(3) = 10$. Find $P(4)$.`, answer: "17",
        solution: String.raw`The quadratic $x^2+1$ has the stated values at $1,2,3$, so interpolation uniqueness shows that it is $P$. Therefore $P(4)=16+1=17$.` },
      { q: String.raw`Find $a^3 + b^3 + c^3 - 3abc$ for $a = 2$, $b = 3$, $c = 4$.`, answer: "27",
        solution: String.raw`By the identity it is $(a + b + c)\cdot\tfrac12\left((a - b)^2 + (b - c)^2 + (c - a)^2\right) = 9 \cdot \tfrac12(1 + 1 + 4) = 27$. Directly: $8 + 27 + 64 - 72 = 27$.` }
    ],
    problems: [
      "2024 AMC 12B, Problem 17"
    ]
  },
  challenge: {
    problems: [
      "2001 AMC 12, Problem 23",
      "2022 AMC 12A, Problem 22",
      "2021 Spring AMC 12A, Problem 22",
      "2024 AMC 12A, Problem 23"
    ]
  }
};
