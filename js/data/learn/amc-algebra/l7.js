// Learn, AMC Algebra, chapter L7: polynomials (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L7"] = {
  lessons: {
    "L7.1": {
      prereq: ["vietas-quadratic"],
      cards: [],
      body: String.raw`A polynomial combines finitely many nonnegative integer powers of its variable with fixed coefficients. For example, $x^3-2x+5$ has degree three, the highest power with a nonzero coefficient. Expressions involving $1/x$ or $\sqrt{x}$ are not polynomials in $x$. This restriction gives polynomials a useful structure: they can be added, multiplied and divided with a remainder while remaining within a finite list of powers.

A factor and a value are connected. If $P(x)=(x-a)Q(x)$, substituting $x=a$ makes the product zero, so $a$ is a root. The converse is also true: a root produces a linear factor. Division explains why. Dividing by $x-a$ leaves a constant remainder, and substituting $a$ makes the divisible part vanish, exposing that remainder directly.

For $P(x)=x^3-2x+5$, this gives remainder $P(2)=9$ on division by $x-2$. A remainder question has become an evaluation, without determining the quotient. In contrast, a factorization question needs a value that makes the remainder zero, followed by division to remove the corresponding factor and lower the degree.

Evaluation can also combine coefficients in useful ways. At $x=1$, every power becomes one, so the value is the sum of the coefficients. At $x=-1$, even and odd powers contribute with different signs. These special inputs reveal aggregate information without expanding every term of a large product.

The chapter develops division and its evaluation shortcut, then explains how integer coefficients restrict possible rational roots. It finishes by comparing identities and selecting coefficient sums through carefully chosen values. Keep the distinction between equality at one input and equality for every input in view: a polynomial identity contains much more information than a single equation.`,
      exercises: [
        { q: String.raw`Find the remainder when $x^3 - 2x + 5$ is divided by $x - 2$.`, answer: "9",
          solution: String.raw`By the remainder theorem, it is the value at $x = 2$: $8 - 4 + 5 = 9$.` },
        { q: String.raw`Find the value of $x^3 + x^2 - x - 1$ at $x = -1$. What does it tell you?`, answer: "0",
          solution: String.raw`$-1 + 1 + 1 - 1 = 0$, so $-1$ is a root and $x + 1$ is a factor; indeed $x^3 + x^2 - x - 1 = (x + 1)^2(x - 1)$.` },
        { q: String.raw`Find the sum of the coefficients of $(x + 2)^5$ when it is expanded.`, answer: "243",
          solution: String.raw`The sum of the coefficients is the value at $x = 1$: $3^5 = 243$.` }
      ],
      problems: [
        "2025 AMC 10A, Problem 7",
        "2018 AMC 12A, Problem 5",
        "2009 AMC 12A, Problem 9"
      ]
    },
    "L7.2": {
      prereq: [],
      cards: ["polynomial-division", "factor-remainder-theorem"],
      body: String.raw`Polynomial division writes a polynomial as a multiple of a chosen nonzero divisor plus a smaller remainder. The quotient records the multiple, while the remainder is what cannot be removed by further division. Its degree must be less than the divisor's degree, unless the remainder is zero. This bound is what makes the quotient and remainder unique over the real numbers.

To divide $P(x)=x^3+2x^2-5x+1$ by $x-1$, begin by matching the leading term. Multiplying the divisor by $x^2$ produces $x^3-x^2$; subtracting leaves $3x^2-5x+1$. Next use $3x$, leaving $-2x+1$, and finally use $-2$, leaving $-1$. Thus [[polynomial-division|division]] has established the identity

$$P(x)=(x-1)(x^2+3x-2)-1.$$

Multiplying back verifies all the terms, including the remainder's sign. The remainder is constant because any remaining term of positive degree could still be reduced by the linear divisor.

Now substitute $x=1$ into that identity. The product containing $x-1$ vanishes, so $P(1)=-1$ directly. The same reasoning proves [[factor-remainder-theorem|the remainder theorem]]: dividing by $x-a$ gives $P(x)=(x-a)Q(x)+r$, and hence $r=P(a)$. Evaluation is enough when only the remainder is requested; long division remains useful when the quotient itself is needed.

A zero remainder means exact divisibility. Thus $x-2$ divides $x^3+kx-6$ precisely when $8+2k-6=0$, giving $k=-1$. A divisor $x+1$ calls for the input $-1$, not $1$, so the remainder of $x^{50}+x^{25}+1$ is $1-1+1=1$. Write the divisor in the form $x-a$ before choosing the evaluation point.

For a quadratic divisor, the remainder has degree at most one, so write it as $ux+v$, allowing $u=0$. If the divisor has two distinct roots $a,b$, the values $P(a)=ua+v$ and $P(b)=ub+v$ determine the two coefficients. As an example, dividing $x^3$ by $(x-1)(x-2)$ gives $u+v=1$ and $2u+v=8$, so the remainder is $7x-6$. Indeed, $x^3=(x^2-3x+2)(x+3)+7x-6$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 330" role="img" aria-labelledby="l72-remainder-title l72-remainder-desc" style="width:100%;max-width:500px;height:auto"><title id="l72-remainder-title">The remainder agrees with the polynomial at the divisor's roots</title><desc id="l72-remainder-desc">For division of x cubed by x minus one times x minus two, the remainder is seven x minus six. The cubic graph and remainder line have equal values at one and two, the roots of the divisor. Their common points are one, one and two, eight.</desc><g fill="none" stroke="currentColor"><path d="M50 310V40M30 220H420" opacity="0.5"/><path d="M50.00 220.00 L53.22 220.00 L56.44 220.00 L59.66 220.00 L62.88 219.99 L66.10 219.98 L69.32 219.97 L72.54 219.95 L75.76 219.93 L78.98 219.89 L82.20 219.85 L85.42 219.81 L88.64 219.75 L91.86 219.68 L95.08 219.60 L98.30 219.51 L101.52 219.40 L104.74 219.28 L107.96 219.15 L111.18 219.00 L114.40 218.83 L117.62 218.65 L120.84 218.45 L124.06 218.22 L127.28 217.98 L130.50 217.72 L133.72 217.43 L136.94 217.13 L140.16 216.79 L143.38 216.44 L146.60 216.06 L149.82 215.65 L153.04 215.22 L156.26 214.75 L159.48 214.26 L162.70 213.74 L165.92 213.19 L169.14 212.60 L172.36 211.99 L175.58 211.34 L178.80 210.66 L182.02 209.94 L185.24 209.18 L188.46 208.39 L191.68 207.56 L194.90 206.70 L198.12 205.79 L201.34 204.84 L204.56 203.85 L207.78 202.82 L211.00 201.75 L214.22 200.63 L217.44 199.47 L220.66 198.26 L223.88 197.01 L227.10 195.71 L230.32 194.36 L233.54 192.96 L236.76 191.51 L239.98 190.01 L243.20 188.46 L246.42 186.86 L249.64 185.20 L252.86 183.49 L256.08 181.73 L259.30 179.90 L262.52 178.02 L265.74 176.09 L268.96 174.09 L272.18 172.04 L275.40 169.92 L278.62 167.74 L281.84 165.50 L285.06 163.20 L288.28 160.84 L291.50 158.40 L294.72 155.91 L297.94 153.34 L301.16 150.71 L304.38 148.01 L307.60 145.25 L310.82 142.41 L314.04 139.50 L317.26 136.52 L320.48 133.46 L323.70 130.34 L326.92 127.13 L330.14 123.86 L333.36 120.50 L336.58 117.07 L339.80 113.56 L343.02 109.98 L346.24 106.31 L349.46 102.56 L352.68 98.73 L355.90 94.82 L359.12 90.83 L362.34 86.75 L365.56 82.58 L368.78 78.33 L372.00 74.00" stroke-width="2.5"/><path d="M50 292L386 90.4" stroke-width="1.7"/><path d="M190 208V220M330 124V220" stroke-dasharray="5 5" opacity="0.5"/></g><g fill="currentColor"><circle cx="190" cy="208" r="4"/><circle cx="330" cy="124" r="4"/><g font-size="16" text-anchor="middle"><text x="220" y="50">P(x) = x³</text><text x="155" y="295">R(x) = 7x − 6</text><text x="140" y="184">(1, 1)</text><text x="370" y="149">(2, 8)</text><text x="190" y="244">1</text><text x="330" y="244">2</text><text x="32" y="129">8</text><text x="50" y="28">y</text><text x="432" y="225">x</text><text x="240" y="320">Divisor: (x − 1)(x − 2)</text></g></g></svg>

At the divisor's roots, the multiple of the divisor disappears, so the polynomial and remainder have the same height. The diagram shows those two matching values; the remainder need not follow the cubic between them.

The distinctness condition is essential. A repeated root supplies the same value equation twice, which cannot determine both coefficients. For division of $x^3$ by $(x-1)^2$, direct division gives $x^3=(x-1)^2(x+2)+3x-2$. Knowing only $P(1)=1$ would allow many candidate remainders with value one there. If the divisor has no real roots, division or an algebraic identity still works: $x^3+1=(x-1)(x^2+x+1)+2$ gives remainder two without finding complex roots.

For polynomials with integer coefficients, the same factor structure has an arithmetic consequence. Every difference $a^j-b^j$ is divisible by $a-b$ for distinct integers $a,b$. Adding the coefficient-weighted differences shows that $a-b$ divides $P(a)-P(b)$. The integer-coefficient hypothesis matters, just as the degree bound matters in division. Choose the shortcut whose assumptions match the question instead of applying evaluation to every possible divisor.`,
      related: [
        { card: "polynomial-crt", note: String.raw`remainders modulo several factors at once (L10.4).` },
        { card: "vietas-general", note: String.raw`the sum and product of all the roots, from the coefficients (L10.2).` }
      ],
      exercises: [
        { q: String.raw`Find the remainder when $x^3 + 2x^2 - 5x + 1$ is divided by $x - 1$.`, answer: "-1",
          solution: String.raw`By the remainder theorem it is the value at $1$: $1 + 2 - 5 + 1 = -1$. (Long division gives the quotient $x^2 + 3x - 2$.)` },
        { q: String.raw`For which $k$ is $x - 2$ a factor of $x^3 + kx - 6$?`, answer: "-1",
          solution: String.raw`By the factor theorem the value at $2$ must be $0$: $8 + 2k - 6 = 0$, so $k = -1$.` },
        { q: String.raw`Find the remainder when $x^{50} + x^{25} + 1$ is divided by $x + 1$.`, answer: "1",
          solution: String.raw`Evaluate at $x = -1$: $1 - 1 + 1 = 1$.` }
      ],
      problems: [
        "2014 AMC 12A, Problem 19",
        "2022 AMC 10B, Problem 17",
        "2011 AMC 12A, Problem 20",
        "2023 AMC 10A, Problem 21",
        "2021 Spring AMC 12B, Problem 20"
      ]
    },
    "L7.3": {
      prereq: ["factor-remainder-theorem"],
      cards: ["rational-root-theorem", "comparing-coefficients", "coefficient-extraction"],
      body: String.raw`A polynomial with integer coefficients need not have rational roots, but any rational root must obey strong divisibility restrictions. These restrictions turn guessing into a finite search. First remove a factor of $x$ if the constant term is zero; for a nonzero constant term, its divisors provide the numerator candidates.

Suppose $p/q$, in lowest terms with $q>0$, is a root of $a_nx^n+\cdots+a_0$. Multiplying the equation by $q^n$ gives an integer equation. Every term except $a_np^n$ contains a factor of $q$, so $q$ divides $a_np^n$. Since $p$ and $q$ are coprime, $q$ must divide $a_n$. Looking from the other end, every term except $a_0q^n$ contains $p$, so $p$ divides $a_0$. This proves [[rational-root-theorem|the rational root restriction]] rather than merely listing it as a guessing rule.

For $2x^3-3x^2-3x+2$, the possibilities are $\pm1,\pm2,\pm1/2$. Testing $2$ gives zero. Dividing out $x-2$ leaves $2x^2+x-1=(x+1)(2x-1)$, so the roots are $2,-1,1/2$. The restrictions supplied candidates, not a guarantee that every candidate worked. When the leading coefficient is one, a rational root must be an integer; if no integer candidate works, a monic polynomial may still have irrational or nonreal roots.

A polynomial identity offers a different way to determine coefficients. In $(x^2+ax+3)(x+b)=x^3+4x^2+7x+6$ for every $x$, the constant terms give $3b=6$, so $b=2$. The coefficients of $x^2$ then give $a+b=4$, so $a=2$. The coefficient of $x$ checks the result: $3+ab=7$. [[comparing-coefficients|Comparing coefficients]] is justified by equality as polynomials, not just agreement at a few arbitrarily chosen inputs.

For example, $x^2$ and $x$ agree at zero and one but have different coefficients. More generally, two polynomials of degree at most $d$ that agree at $d+1$ distinct inputs must be identical: their difference would otherwise have too many distinct roots. Repeated use of the factor theorem makes each distinct root contribute a linear factor, which a nonzero polynomial of that degree cannot accommodate. Counting the distinct inputs is essential.

Some questions ask only for a combination of coefficients. Write $P(x)=c_0+c_1x+c_2x^2+\cdots$. Then $P(1)$ adds them all, while $P(-1)$ adds the even-power coefficients and subtracts the odd-power ones. If their respective sums are $E,O$, we have $P(1)=E+O$ and $P(-1)=E-O$. Adding or subtracting these two equations gives the desired group of coefficients. This is [[coefficient-extraction|extracting coefficient information]] by choosing useful inputs.

For $P(x)=(1+x)^8$, $P(1)=256$ and $P(-1)=0$. Hence both parity groups sum to $128$, without expanding the eighth power. These evaluations recover the two sums, not every individual coefficient. An individual coefficient generally requires more information or an expansion of the terms that can contribute to its power.

Finally, distinguish the variable of a polynomial from a shifted input. If $Q(x)=f(x+3)$, the sum of the coefficients of $Q$ is $Q(1)=f(4)$. The sum of the coefficients of $f$ is instead $f(1)=Q(-2)$. For $f(t)=t^2$, the shifted polynomial is $Q(x)=(x+3)^2=x^2+6x+9$: its coefficients sum to $16$, whereas those of $f$ sum to one. Identify which polynomial's coefficients the question asks about before substituting a convenient value.`,
      related: [
        { card: "binomial-theorem", note: String.raw`the coefficients of $(x + y)^n$, read individually.` },
        { card: "roots-of-unity-filter", note: String.raw`sums of every third or fourth coefficient, from roots of unity (L13.4).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the roots of $2x^3 - 3x^2 - 3x + 2$, after finding them with the rational root theorem.`, answer: "3/2",
          solution: String.raw`The candidates are $\pm 1, \pm 2, \pm \tfrac12$. Testing: $P(2) = 16 - 12 - 6 + 2 = 0$, $P(-1) = -2 - 3 + 3 + 2 = 0$, $P(\tfrac12) = \tfrac14 - \tfrac34 - \tfrac32 + 2 = 0$. The roots $2, -1, \tfrac12$ add to $\tfrac32$, which matches $\tfrac{3}{2}$ from Vieta.` },
        { q: String.raw`If $(x^2 + ax + 3)(x + b) = x^3 + 4x^2 + 7x + 6$ for all $x$, find $a + b$.`, answer: "4",
          solution: String.raw`The $x^2$ coefficient of the left side is $a + b$, and it must equal $4$. (Separately, $3b = 6$ gives $b = 2$, so $a = 2$, and the $x$ coefficient $3 + ab = 7$ checks.)` },
        { q: String.raw`Find the sum of the coefficients of the even powers of $x$ in $(1 + x)^8$.`, answer: "128",
          solution: String.raw`With $P(x) = (1 + x)^8$, the even-power coefficients add to $\tfrac{P(1) + P(-1)}{2} = \tfrac{256 + 0}{2} = 128$.` }
      ],
      problems: [
        "2025 AMC 10B, Problem 10",
        "2001 AMC 12, Problem 13",
        "2024 AMC 12A, Problem 13",
        "2012 AMC 12A, Problem 20"
      ]
    },
    "L7.4": {
      prereq: ["polynomial-division", "factor-remainder-theorem", "rational-root-theorem", "comparing-coefficients", "coefficient-extraction"],
      cards: [],
      body: String.raw`Polynomial division preserves an identity: [[polynomial-division|the dividend is divisor times quotient plus remainder]], with the remainder's degree below the divisor's. For a linear divisor $x-a$, this remainder is the number $P(a)$, giving [[factor-remainder-theorem|the remainder and factor theorems]]. For a quadratic divisor it has degree at most one. Values at two distinct roots can determine its coefficients, but a repeated root gives only one value condition, and division remains available when real roots do not exist.

With integer coefficients, [[rational-root-theorem|rational roots have restricted numerators and denominators]]. Test those candidates and divide out a root that works to reduce the degree. Failure to find a rational root is a conclusion about rational roots, not proof that there are no roots of another kind.

[[comparing-coefficients|An identity]] equates coefficients because it holds for every input. Agreement at isolated values is weaker, unless a degree bound and enough distinct points establish the identity. [[coefficient-extraction|Special evaluations]] then offer a targeted alternative to expansion: zero selects the constant term, one sums coefficients, and minus one distinguishes even and odd powers.

The same principle guides all these methods: select the representation that retains the information needed for the question. A remainder may need only one value; a quotient needs division; a coefficient group may need two evaluations; and a shifted polynomial requires deciding which input corresponds to one in the polynomial actually being asked about.`,
      strategies: [
        String.raw`For a remainder on division by $x - a$, evaluate at $a$.`,
        String.raw`To test a factor $x - a$, check whether $a$ is a root.`,
        String.raw`On division by a quadratic, use a remainder of degree at most one; two distinct roots give two conditions, while a repeated root needs more information.`,
        String.raw`List the rational candidates before guessing a root, then divide out each root found.`,
        String.raw`For an identity between polynomials, match the constant terms and the leading terms first.`,
        String.raw`For sums of coefficients, evaluate at $1$, $-1$ or $0$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`The polynomial $x^2 + kx - 1$ leaves remainder $5$ when divided by $x - 3$. Find $k$.`, answer: "-1",
        solution: String.raw`The remainder is the value at $3$: $9 + 3k - 1 = 5$, so $k = -1$.` },
      { q: String.raw`Find the product of the roots of $x^3 - 6x^2 + 11x - 6$.`, answer: "6",
        solution: String.raw`Testing the divisors of $6$, the roots are $1, 2, 3$, with product $6$, which is also $-\tfrac{-6}{1}$ by Vieta.` },
      { q: String.raw`Find the coefficient of $x^2$ in $(x + 1)^3(x - 2)$.`, answer: "-3",
        solution: String.raw`$(x + 1)^3 = x^3 + 3x^2 + 3x + 1$. The $x^2$ terms of the product come from $3x^2 \cdot (-2)$ and $3x \cdot x$: $-6 + 3 = -3$.` },
      { q: String.raw`Find the sum of the coefficients of $(3x - 2)^7$.`, answer: "1",
        solution: String.raw`Evaluate at $x = 1$: $(3 - 2)^7 = 1$.` },
      { q: String.raw`The polynomial $x^4 + ax^2 + b$ is divisible by $x^2 - 3x + 2$. Find $b$.`, answer: "4",
        solution: String.raw`The roots of $x^2 - 3x + 2$ are $1$ and $2$, so $1 + a + b = 0$ and $16 + 4a + b = 0$. Subtracting, $15 + 3a = 0$, so $a = -5$ and $b = 4$. Indeed $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$.` },
      { q: String.raw`Find the remainder when $x^3 + 1$ is divided by $x^2 + x + 1$.`, answer: "2",
        solution: String.raw`Since $x^3 - 1 = (x - 1)(x^2 + x + 1)$, we have $x^3 + 1 = (x - 1)(x^2 + x + 1) + 2$. The remainder is $2$.` }
    ],
    problems: [
      "2015 AMC 12A, Problem 20"
    ]
  },
  challenge: {
    problems: [
      "2010 AMC 10B, Problem 25",
      "2002 AMC 12A, Problem 25",
      "2010 AMC 12A, Problem 21",
      "2025 AMC 12A, Problem 17"
    ]
  }
};
