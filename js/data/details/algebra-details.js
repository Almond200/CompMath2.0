// Extended detail-page write-ups for Algebra, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"lagrange-interpolation-formula": String.raw`
## Key forms
- $P(x) = y_1 \frac{x - x_2}{x_1 - x_2} + y_2 \frac{x - x_1}{x_2 - x_1}$ — two points: the line through them
- $P(x) = \alt{\sum_i y_i \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}}{y_1L_1(x) + y_2L_2(x) + \cdots + y_nL_n(x)}$ — $n$ points, where each $L_i$ is $1$ at $x_i$ and $0$ at the other points
- $P(0) = \alt{\sum_i y_i \prod_{j \ne i} \frac{x_j}{x_j - x_i}}{y_1\frac{x_2 \cdots x_n}{(x_2 - x_1)\cdots(x_n - x_1)} + \cdots + y_n\frac{x_1 \cdots x_{n-1}}{(x_1 - x_n)\cdots(x_{n-1} - x_n)}}$ — a single value without the whole polynomial

## Conditions
The $x_i$ are distinct. With $n$ points the polynomial has degree at most $n - 1$, and it can be lower, as when the points are collinear.

## Why it works
Each basis polynomial $L_i(x) = \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}$ has degree $n - 1$, vanishes at every $x_j$ with $j \ne i$, and equals $1$ at $x_i$. So $y_1L_1 + \cdots + y_nL_n$ takes the value $y_i$ at each $x_i$.

Uniqueness: if two polynomials of degree at most $n - 1$ agree at $n$ points, their difference has degree at most $n - 1$ and $n$ roots, so it is zero.

## Useful observations
- A polynomial of degree at most $n - 1$ is determined by any $n$ of its values, so a question about one more value has exactly one answer, whatever method finds it.
- When the values follow a pattern at the given points, subtracting the pattern first is usually faster than the formula; see [[shifted-polynomial-construction|building a polynomial from equal values]].
- [[finite-differences|Finite differences]] give the same polynomial when the $x_i$ are equally spaced.

## Applications
Reconstructing a polynomial from its values, extrapolating one more value, and the uniqueness arguments behind many polynomial problems.

## Contest profile
The fact that a polynomial is pinned down by enough of its values; contest solutions usually use it through subtraction rather than the explicit formula.
`,
"fundamental-theorem-symmetric": String.raw`
## Key forms
- $x^2 + y^2 = e_1^2 - 2e_2$ and $x^3 + y^3 = e_1^3 - 3e_1e_2$ — two variables, with $e_1 = x + y$ and $e_2 = xy$
- $x^2 + y^2 + z^2 = e_1^2 - 2e_2$ — three variables
- $x^3 + y^3 + z^3 = e_1^3 - 3e_1e_2 + 3e_3$ — three variables
- $\frac1x + \frac1y + \frac1z = \frac{e_2}{e_3}$ — a symmetric rational expression is a quotient of polynomials in the $e_k$

## Conditions
The polynomial must be unchanged by every permutation of the variables, not just by cyclic shifts: $x^2y + y^2z + z^2x$ is cyclic but not symmetric, and it is not a polynomial in $e_1$, $e_2$, $e_3$.

## Why it works
Order monomials by their exponents: the larger exponent of $x_1$ first, then of $x_2$, and so on. In a symmetric polynomial the leading monomial $x_1^{a_1}x_2^{a_2}\cdots x_n^{a_n}$ has $a_1 \ge a_2 \ge \cdots \ge a_n$, since permuting the variables of any monomial gives another monomial of the polynomial.

The product $e_1^{a_1 - a_2}e_2^{a_2 - a_3}\cdots e_n^{a_n}$ has exactly that leading monomial, so subtracting the right multiple of it removes the leading term and leaves a smaller symmetric polynomial. Each step lowers the leading monomial, and there are finitely many monomials of each degree, so the process ends, having written the polynomial in the $e_k$.

Uniqueness holds because the $e_k$ are algebraically independent: no nonzero polynomial in them vanishes identically.

## Useful observations
- By Vieta's Formulas, the $e_k$ of a polynomial's roots are its coefficients up to sign, so every symmetric expression in the roots is determined by the coefficients without solving.
- Power sums $x_1^k + \cdots + x_n^k$ are the most common symmetric expressions, and [[newtons-sums|Newton's Sums]] compute them from the $e_k$ one at a time.

## Applications
Symmetric expressions in the roots of a polynomial, systems that are symmetric in their unknowns, and identities among sums of powers.

## Contest profile
The reason a symmetric expression in the roots is computable at all; on contests the work is the rewriting, which the method of the same idea carries out.
`,
"quadratic-formula": String.raw`
## Why it works
Completing the square turns any quadratic into a square equal to a number, and a square equal to a number is solved by taking a square root.

Divide $ax^2 + bx + c = 0$ by $a$, which is allowed because $a \ne 0$, to get $x^2 + \frac bax + \frac ca = 0$. The first two terms are almost a perfect square: $$\left(x + \frac{b}{2a}\right)^2 = x^2 + \frac bax + \frac{b^2}{4a^2},$$ which is short only the constant $\frac{b^2}{4a^2}$.

Adding that constant to both sides and moving $\frac ca$ across gives $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2}{4a^2} - \frac ca = \frac{b^2 - 4ac}{4a^2}.$$ Taking square roots, $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$, and subtracting $\frac{b}{2a}$ gives the formula.

{{figure:complete-square}}

The figure shows where the name comes from. The expression $x^2 + px$ is a square of side $x$ with two strips, $x$ by $\frac p2$, attached along two sides. Filling the missing corner, a square of area $\frac{p^2}{4}$, completes a square of side $x + \frac p2$. In the derivation above, $p = \frac ba$.

The discriminant is the numerator on the right-hand side. A square of a real number cannot be negative, so real solutions need $b^2 - 4ac \ge 0$; when it is $0$ both signs give the same root, and when it is positive they give two different ones.

## How to use it
Before grinding through the formula, look for a shortcut. If the quadratic factors, the roots are immediate, and if the question asks only for the sum or product of the roots, Vieta's Formulas give them straight from the coefficients: $$r_1 + r_2 = -\frac ba, \qquad r_1r_2 = \frac ca.$$

What makes the discriminant worth more than the formula is that it answers questions without solving anything. Whether the roots are real, equal, rational, or integers is decided by $\Delta$ alone, so a question about the nature of the roots never needs the roots, and an integrality question becomes "when is $\Delta$ a perfect square", which is a Diophantine problem rather than an algebraic one.

[[tangency-condition|Tangency]] is the same idea: a line touches a parabola exactly when substituting one into the other gives a quadratic with $\Delta = 0$.

## On contests
Almost never alone — 3 of its 32 problems — because it is the step that finishes a setup rather than the setup itself. Its partners say what those setups are: [[pythagorean-theorem|Pythagoras]] (4 problems), [[similar-figures-ratios|similar triangles]] (3), and [[coordinate-bash|coordinates]] (3), all geometry that reduces to one quadratic in one unknown.

Two shapes recur. "For how many integer $k$ does this quadratic have rational roots" is perfect-square discriminant analysis. And tangency is $\Delta=0$: substituting a line into a circle or parabola and setting the discriminant to zero settles contact problems with no calculus, which is why unique solution implies tangency is the same idea under another name.
`,

"vietas-quadratic": String.raw`
## Key forms
- $r + s = -\frac ba$ and $rs = \frac ca$ — the sum and product straight from the coefficients
- $r^2 + s^2 = (r + s)^2 - 2rs$ and $\frac1r + \frac1s = \frac{r + s}{rs}$ — symmetric expressions without the roots
- $|r - s| = \frac{\sqrt{\Delta}}{|a|}$ — the gap between the roots, from the [[quadratic-formula|discriminant]]
- $x^2 - px + q = 0$ — the quadratic whose roots have sum $p$ and product $q$

## Conditions
$a \ne 0$, and the roots are counted with multiplicity and may be complex. The formulas say nothing about whether the roots are real: two numbers with real sum $p$ and real product $q$ are themselves real exactly when $p^2 \ge 4q$.

## Why it works
A quadratic with roots $r$ and $s$ is $a(x - r)(x - s)$, and multiplying that out shows the sum and the product of the roots sitting in the coefficients.

Expand: $$a(x - r)(x - s) = ax^2 - a(r + s)x + ars.$$ Matching this with $ax^2 + bx + c$ term by term gives $-a(r + s) = b$ and $ars = c$, so $r + s = -\frac ba$ and $rs = \frac ca$. The factored form exists for every quadratic once complex roots are allowed, so the formulas hold whether the roots are real or not. The same expansion at higher degree gives [[vietas-general|Vieta's Formulas in general]].

The reverse direction is the same identity read the other way. If two numbers have sum $p$ and product $q$, then $(x - r)(x - s) = x^2 - px + q$, so they are exactly the two roots of that quadratic.

## Useful observations
- Every symmetric polynomial expression in $r$ and $s$ is a polynomial in $r + s$ and $rs$, by the [[fundamental-theorem-symmetric|Fundamental Theorem of Symmetric Polynomials]]; for example, $r^3 + s^3 = (r + s)^3 - 3rs(r + s)$.
- A monic quadratic with integer coefficients has integer roots exactly when its discriminant is a perfect square.
- Power sums of the roots beyond the second are handled by [[newtons-sums|Newton's Sums]].

## Applications
Symmetric expressions in the roots of a quadratic, systems given by a sum and a product, and quadratics with integer roots.

## Contest profile
A routine step inside many setups rather than a solution in itself; the reverse direction, from a sum and a product to a quadratic, is the part that most often opens a problem.
`,

"vietas-general": String.raw`
## Key forms
- $e_k(r_1, \ldots, r_n) = (-1)^k\frac{a_{n-k}}{a_n}$, the sum of all products of $k$ roots
- $x^3 + bx^2 + cx + d$: $r + s + t = -b$, $rs + rt + st = c$, $rst = -d$
- $x^4 + bx^3 + cx^2 + dx + e$: the roots sum to $-b$, their pairwise products to $c$, their triple products to $-d$, and their product is $e$

## Conditions
The polynomial has degree $n \ge 1$ and $a_n \ne 0$. The roots are its $n$ complex roots counted with multiplicity, real or not; the formulas say nothing about which roots are real.

## Why it works
A polynomial with roots $r_1, \ldots, r_n$ factors as $a_n(x - r_1)(x - r_2)\cdots(x - r_n)$, and multiplying out the product shows which combination of the roots lands in front of each power of $x$.

In degree two, $(x - r)(x - s) = x^2 - (r + s)x + rs$, so the middle coefficient is minus the sum and the constant is the product. Degree three follows the same pattern, $$(x - r)(x - s)(x - t) = x^3 - (r + s + t)x^2 + (rs + rt + st)x - rst.$$ The signs alternate because each root enters with a minus sign, and a product of $k$ roots carries $k$ of them. A leading coefficient other than $1$ is divided out first, which is why every formula is a coefficient over $a_n$.

## Useful observations
- The other symmetric functions follow from the $e_k$: $\sum r_i^2 = e_1^2 - 2e_2$ and $\sum\frac{1}{r_i} = \frac{e_{n-1}}{e_n}$.
- A missing term means a zero symmetric sum: no $x^{n-1}$ term means the roots sum to $0$.
- For a quadratic $x^2 - sx + p$, the roots are the two numbers with sum $s$ and product $p$, so a pair of numbers is fixed by its sum and product.
- With integer coefficients and leading coefficient $1$, an integer root divides the constant term, since it is a factor of the product of the roots.

## Applications
Sums, products, and other symmetric functions of the roots of a polynomial, polynomials built from prescribed roots, and conditions on roots, such as integer or arithmetic-progression roots, written as conditions on coefficients.

## Contest profile
The most common polynomial fact on the AIME, but rarely the whole solution: it usually converts a structure found by another argument, such as conjugate pairs or a transformed polynomial, into coefficients.

## Full proof
Over the complex numbers a polynomial of degree $n$ has $n$ roots counted with multiplicity, by the Fundamental Theorem of Algebra, so $a_nx^n + \cdots + a_0 = a_n(x - r_1)\cdots(x - r_n)$.

Each term of the expansion of the right side is made by choosing, from every bracket, either its $x$ or its $-r_i$, and multiplying the choices. A choice that takes $-r_i$ from the brackets in a set $S$ of size $k$ contributes $(-1)^k\left(\prod_{i \in S} r_i\right)x^{n-k}$.

Collecting the choices with the same $k$, the coefficient of $x^{n-k}$ is $(-1)^k a_n e_k$, where $e_k$ is the sum of $\prod_{i \in S} r_i$ over all $\binom nk$ sets $S$ of size $k$. Comparing with $a_{n-k}$ gives $e_k = (-1)^k\frac{a_{n-k}}{a_n}$.
`,

"fundamental-theorem-algebra": String.raw`## Why it works
The analytic core is that every non-constant complex polynomial has at least one root (provable via Liouville's theorem, a winding-number argument, or a minimum-modulus argument). Once you have one root $r$, divide out $(x - r)$ to drop the degree by one and repeat; after $n$ steps you have peeled off $n$ linear factors, $P(x) = a_n\prod (x - r_k)$, with exactly $n$ roots counted by multiplicity.

## How to use it
It is the license behind "a degree-$n$ polynomial has $n$ roots," which underwrites [[vietas-general|Vieta's Formulas]], partial fractions, and all root counting. Two corollaries do heavy lifting: a polynomial of degree $\le n$ that vanishes at $n+1$ points is identically zero (the standard way to prove a polynomial identity), and $n+1$ values pin a polynomial down uniquely ([[lagrange-interpolation|Lagrange interpolation]]). Over $\mathbb{R}$, pairing conjugate roots yields real linear and irreducible-quadratic factors — hence every odd-degree real polynomial has a real root.

## On contests
Usually invoked implicitly: knowing the exact root count sets up Vieta, and the "agree at enough points $\Rightarrow$ identical" corollary cracks many AIME polynomial and functional-equation problems. The conjugate-pairing consequence is a common parity/real-root argument.`,

"factor-remainder-theorem": String.raw`
## Why it works
Divide $P(x)$ by $x - a$. The remainder has degree less than $1$, so it is a constant $r$, and $$P(x) = (x - a)Q(x) + r.$$ Evaluating at $x = a$ kills the first term and leaves $r = P(a)$. The Factor Theorem is the case $P(a)=0$, and dividing by a degree-$k$ polynomial leaves a remainder of degree less than $k$, which is why a quadratic divisor leaves a line, pinned down by its values at the two roots.

The integer statement is the same theorem read over $\mathbb{Z}$. Apply the Factor Theorem to $P(x) - P(b)$: it vanishes at $x = b$, so $P(x) - P(b) = (x-b)Q(x)$ with $Q$ having integer coefficients whenever $P$ does. Substituting $x = a$ gives $$P(a) - P(b) = (a - b)Q(a),$$ and $Q(a)$ is an integer, so $(a-b) \mid P(a) - P(b)$. Equivalently, expand $P(a) - P(b) = \sum c_k(a^k - b^k)$ and note every $a^k - b^k$ carries the factor $a - b$.

## How to use it
For a remainder, evaluate rather than divide. Mod a quadratic $(x-a)(x-b)$ the remainder is linear, so interpolate the line through $(a,P(a))$ and $(b,P(b))$; mod $(x-a)^2$ use $P(a) + P'(a)(x-a)$, or match coefficients. Divisibility questions reduce to evaluations at the roots of the divisor, complex ones included: $x^2+1 \mid P(x)$ exactly when $P(i) = 0$, and [[roots-of-unity|roots of unity]] handle $x^2+x+1$ and friends.

Over the integers, run the divisibility conditions as a filter. Candidate values at integer points must satisfy $$a - b \mid P(a) - P(b)$$ for every pair of integers, which settles most "can such a polynomial exist" questions by parity alone. It also constrains fixed points and cycles: if $P(P(x)) = x$ on integers then $a-b \mid P(a)-P(b) \mid P(P(a))-P(P(b)) = a-b$, forcing $|P(a)-P(b)| = |a-b|$, which is the key step in polynomial 2-cycle problems.

## On contests
A high-frequency polynomial tool on AMC 12 and AIME: 14 problems are tagged here, 4 of them solved by it alone. "Find the remainder when $x^{100}$ is divided by $x^2 - 3x + 2$" is a pure evaluation at $1$ and $2$ followed by drawing the line through the two values. The integer form shows up as "an integer polynomial takes the values $3$ and $7$ at some integers; can it take $5$ at another?", where checking the differences settles the answer in a line.
`,

"rational-root-theorem": String.raw`
## Why it works
Substitute the root and clear the denominators; then every term but one is a multiple of $p$, and every term but one is a multiple of $q$.

Let $a_nx^n + \cdots + a_1x + a_0$ have the root $\frac pq$ with $\gcd(p, q) = 1$. Multiplying the equation by $q^n$ gives $$a_np^n + a_{n-1}p^{n-1}q + \cdots + a_1pq^{n-1} + a_0q^n = 0.$$

Every term except the last contains a factor of $p$, so $p$ divides $a_0q^n$. Since $p$ shares no factor with $q$, it shares none with $q^n$, so $p$ divides $a_0$. In the same way every term except the first contains a factor of $q$, so $q$ divides $a_np^n$, and therefore $q$ divides $a_n$.

## How to use it
List the candidates $\pm\frac pq$, test them, and divide out each root as you find it. For $2x^3 - 3x^2 - 11x + 6$ the candidates are $\pm1, \pm2, \pm3, \pm6, \pm\frac12, \pm\frac32$. Testing finds $x = 3$, since $54 - 27 - 33 + 6 = 0$, and dividing by $x - 3$ leaves a quadratic that factors: $$2x^3 - 3x^2 - 11x + 6 = (x - 3)(2x - 1)(x + 2).$$

Synthetic division tests a candidate and divides at the same time. Try the small candidates first, and use signs or a rough sketch to skip the hopeless ones.

The monic case also proves irrationality. The only candidates for $x^2 - 2$ are $\pm1$ and $\pm2$, and none is a root, so $\sqrt2$ is irrational.

## On contests
Three problems here, all AIME, none solved by it alone: it usually factors a cubic that another method has produced, such as the equation a [[sp-substitution|symmetric substitution]] reduces a system to, or the equation for the ratio of a geometric series. Try the candidates with small denominators first, since contest cubics are built to have a rational root.`,

"coefficient-extraction": String.raw`
## Why it works
Evaluating a polynomial at a number weights each coefficient by a power of that number, so a well-chosen point makes the weights collapse: $$P(1) = a_0 + a_1 + a_2 + \cdots, \qquad P(-1) = a_0 - a_1 + a_2 - \cdots.$$

Adding and subtracting those cancels one parity at a time: $$\frac{P(1) + P(-1)}{2} = a_0 + a_2 + a_4 + \cdots, \qquad \frac{P(1) - P(-1)}{2} = a_1 + a_3 + a_5 + \cdots.$$ At $x = 0$ every weight but the first vanishes, leaving $a_0$.

## How to use it
Evaluate the polynomial in whatever form the problem gives it, a product, a power, or a composition, and never expand it. For $(1 + 2x)^{10}(1 - x)^4$ the coefficient sum is $3^{10} \cdot 0^4 = 0$, and the constant term is $1$.

For every third or every fourth coefficient, replace $\pm 1$ by the cube or fourth roots of unity, which is the [[roots-of-unity-filter|roots of unity filter]]. In a polynomial of two variables, fix the other variable first. A [[generating-function-method|generating function]] read this way counts all its objects at once, since $G(1)$ adds up every coefficient.

## On contests
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version combines it with the [[binomial-theorem|Binomial Theorem]], and the AIME version asks for the sum of the absolute values of the coefficients, which one evaluation at $x = -1$ produces once the sign of every coefficient is known.
`,


"newtons-sums": String.raw`
## Key forms
- $p_k=e_1p_{k-1}-e_2p_{k-2}+\cdots+(-1)^{k-1}k\,e_k$ — each power sum comes from the earlier ones and the coefficients, so the whole ladder is computable from the polynomial alone
- $p_1=e_1$, $p_2=e_1p_1-2e_2$, $p_3=e_1p_2-e_2p_1+3e_3$ — the first rungs, which cover almost every contest use
- past the degree $n$, the $k\,e_k$ term disappears — the relation becomes a pure recursion in the previous $n$ power sums, and forgetting to drop the term is the common error
- run backwards, power sums give the $e_k$ — and so the polynomial whose roots they are

## Why it works
Every root satisfies the polynomial, so multiplying that equation by a power of the root and adding over all the roots relates the power sums to each other.

Take a cubic with roots $r$, $s$, $t$ and $e_1 = r + s + t$, $e_2 = rs + st + tr$, $e_3 = rst$. Each root satisfies $$x^3 = e_1x^2 - e_2x + e_3.$$ Multiplying by $x^{k-3}$ and adding over the three roots gives, for $k \ge 3$, $$p_k = e_1p_{k-1} - e_2p_{k-2} + e_3p_{k-3},$$ with $p_0 = 3$, because each root contributes $1$. At $k = 3$ the last term is $3e_3$, the source of the $k\,e_k$ in the general ladder.

Below the degree the same shape holds: $p_1 = e_1$, and squaring the sum of the roots gives $p_2 = e_1^2 - 2e_2 = e_1p_1 - 2e_2$. Only the coefficients enter, so the ladder works just as well when the roots are complex.

## How to use it
Read $e_1, e_2, \ldots$ off the coefficients with Vieta's Formulas, minding the alternating signs, then climb one power at a time. For $x^3 - 6x^2 + 11x - 6$, with $e_1 = 6$, $e_2 = 11$, and $e_3 = 6$, $$p_1 = 6, \qquad p_2 = 36 - 22 = 14, \qquad p_3 = 6 \cdot 14 - 11 \cdot 6 + 18 = 36.$$ The roots are $1$, $2$, $3$, and indeed $1 + 8 + 27 = 36$.

Past the degree drop the $k\,e_k$ term, so the relation becomes a pure recursion in the previous $n$ power sums.

The ladder also runs backwards: given $p_1$, $p_2$, $p_3$ for three numbers, solve for $e_1$, $e_2$, $e_3$, and the numbers are the roots of $t^3 - e_1t^2 + e_2t - e_3$.

## On contests
Three problems here, all AIME, none solved by it alone, and two pair it with Vieta's Formulas. The classic form gives $x + y + z$, $x^2 + y^2 + z^2$, and $x^3 + y^3 + z^3$ and asks for $x^4 + y^4 + z^4$. Harder versions reduce one polynomial modulo another so that only low power sums of the roots are needed, or ask for a symmetric sum over the roots of a polynomial that cannot be solved.`,

"conjugate-root-theorems": String.raw`
## Why it works
Replacing $i$ by $-i$ everywhere respects addition and multiplication and leaves real numbers alone, so it turns a true equation with real coefficients into another true equation.

If $P(r) = 0$, conjugate both sides. Conjugation respects sums and products, and it leaves the real coefficients of $P$ unchanged, so the left side becomes $P(\bar r)$ and the right side stays $0$. So $\bar r$ is a root too. The polynomial cannot tell which square root of $-1$ it is using.

{{figure:mirror}}

The radical version works the same way with the map $\sqrt d \mapsto -\sqrt d$ on numbers $x + y\sqrt d$ with $x$ and $y$ rational. It respects sums and products, because $\sqrt d$ and $-\sqrt d$ have the same square, and it leaves rational numbers fixed, so it sends roots of a rational polynomial to roots.

## How to use it
Each pair comes with its quadratic factor: $a \pm bi$ gives $x^2 - 2ax + (a^2 + b^2)$, and $a \pm b\sqrt d$ gives $x^2 - 2ax + (a^2 - b^2d)$. A rational cubic with root $2 + \sqrt3$ therefore has the factor $x^2 - 4x + 1$, and its third root follows from [[vietas-general|Vieta's Formulas]].

Two consequences come up. A real polynomial of odd degree has a real root, since its non-real roots pair off. And the hypothesis matters: $x - \sqrt2$ has the root $\sqrt2$ but not $-\sqrt2$, because its coefficients are not rational.

## On contests
Five problems here, all AIME, and every one of them finishes with Vieta's Formulas: the conjugate supplies the missing root, and Vieta turns the roots into the coefficients the problem asks about.
`,

"palindromic-polynomials": String.raw`
## Distinguishing clues
The coefficients form a palindrome, such as $1, 3, -8, 3, 1$, or a palindrome up to sign. A polynomial with merely symmetric roots, such as an even polynomial $x^4 - 5x^2 + 4$, is a different case: its roots come in pairs $r, -r$, and the substitution is $u = x^2$. Equations already written with $x + \frac1x$ and its powers are this pattern in disguise.

## Methods and Formulas to Try
Reversing the coefficients of a polynomial replaces each root by its reciprocal, so a palindrome has roots in reciprocal pairs. The natural unknown is the pair sum $y = x + \frac1x$, and dividing an even-degree palindrome by the middle power of $x$ makes it a polynomial in $y$ of half the degree.

{{figure:pairs}}

### Methods to try
- [[sp-substitution]]: a reciprocal pair has product $1$, so the pair is described by its sum $y = x + \frac1x$, using $x^2 + \frac{1}{x^2} = y^2 - 2$.
- [[root-transformations]]: reversing the coefficients corresponds to $x \mapsto \frac1x$, which proves the roots come in reciprocal pairs and that an odd palindrome has the root $-1$.

### Formulas to try
- [[vietas-quadratic]]: each value of $y$ gives the quadratic $x^2 - yx + 1 = 0$, whose roots have product $1$.
- [[reciprocal-power-sums]]: $x^2 + \frac{1}{x^2} = y^2 - 2$ and $x^3 + \frac{1}{x^3} = y^3 - 3y$, the conversions that finish the substitution.
- [[factor-remainder-theorem]]: an odd-degree palindrome vanishes at $x = -1$, and an anti-palindrome at $x = 1$, so a factor can be removed first.

## Common traps
- Applying the substitution to an odd-degree palindrome before removing the factor $x + 1$.
- Forgetting that a real $y$ with $|y| < 2$ gives complex roots on the unit circle, not real ones.
- Mixing up $x^2 + \frac{1}{x^2} = y^2 - 2$ with $y^2 + 2$.
- Dividing by $x^{n/2}$ without noting that $x = 0$ is never a root of a palindrome with nonzero constant term.

## Contest profile
An AMC 12 and AIME pattern: a quartic or sextic with palindromic coefficients, and a question about its real roots or their sum.
`,

"vertex-form": String.raw`
## Why it works
Completing the square separates the part that varies from the part that does not: $$ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}.$$

The square is never negative and is zero only at $x = -\frac{b}{2a}$. So when $a \gt 0$ the expression is smallest there, with value $c - \frac{b^2}{4a}$, and when $a \lt 0$ it is largest there. The square also takes the same value at $-\frac{b}{2a} + t$ and at $-\frac{b}{2a} - t$, which is the symmetry the figure at the top shows.

## How to use it
For an optimization, write the quantity as a quadratic in one variable and read off the vertex. That is why [[max-product-fixed-sum|a fixed sum has its largest product in the middle]]: $x(s - x)$ is a downward parabola with its vertex at $x = \frac s2$. If the variable is restricted to a range that misses the vertex, the extreme value is at the endpoint nearer to it, as in the example.

The symmetry is used even more than the extremum. Two points at the same height put the axis halfway between them, and the roots are such a pair, so they average to $-\frac{b}{2a}$, as [[vietas-quadratic|Vieta's Formulas]] also say.

{{figure:symmetry}}

So a parabola known to pass through $(p, k)$ and $(q, k)$ has its axis at $x = \frac{p + q}{2}$ before any coefficient is found, which often turns a system of conditions into one equation.

## On contests
Two problems here, both AIME, one solved by it alone; the other adds [[casework-method|casework]] on where the vertex falls relative to the allowed range. On the AMC 10 it drives maximum-area and maximum-revenue questions, which are quadratics in disguise.
`,

"lagrange-interpolation": String.raw`
## When to use
Problems that give a polynomial's degree and its values at a few points with no visible pattern, such as "the quadratic with $P(0) = 1$, $P(1) = 2$, $P(3) = 10$; find $P(5)$"; remainder problems, since the remainder of $P(x)$ modulo $(x - a)(x - b)$ is the line through $(a, P(a))$ and $(b, P(b))$; and existence questions, since a polynomial with too many prescribed values cannot exist. When the values follow a simple rule, [[subtract-and-factor|subtracting the rule and factoring]] is shorter.

## How
1. Count: a polynomial of degree at most $n - 1$ is fixed by $n$ values, so check the data determines it.
2. For each node $x_i$, write the basis polynomial $L_i(x) = \prod_{j \ne i}\frac{x - x_j}{x_i - x_j}$.
3. Evaluate each $L_i$ only at the point you need.
4. Combine: $P(x) = \sum y_iL_i(x)$.

For the quadratic through $(1, 2)$, $(3, 10)$ and $(4, 20)$, the three basis terms at $x = 0$ equal $\frac{(0 - 3)(0 - 4)}{(1 - 3)(1 - 4)} = 2$, $\frac{(0 - 1)(0 - 4)}{(3 - 1)(3 - 4)} = -2$ and $\frac{(0 - 1)(0 - 3)}{(4 - 1)(4 - 3)} = 1$, so $P(0) = 2 \cdot 2 - 2 \cdot 10 + 1 \cdot 20 = 4$.

{{figure:basis}}

## Why it works
The basis polynomial $L_i$ has degree $n - 1$, equals $1$ at $x_i$, and equals $0$ at every other node, because one factor in its numerator vanishes there. So $\sum y_iL_i(x)$ takes the value $y_i$ at each $x_i$, as the figure shows for three points. Uniqueness comes from counting roots: two polynomials of degree at most $n - 1$ that agree at $n$ points differ by a polynomial of degree at most $n - 1$ with $n$ roots, which must be zero.

## Formulas it uses
- [[lagrange-interpolation-formula]]: the explicit formula $P(x) = \sum_i y_i\prod_{j \ne i}\frac{x - x_j}{x_i - x_j}$ and the uniqueness of the interpolant.
- [[polynomial-crt]]: values at several points fix the remainder modulo the product $(x - x_1)\cdots(x - x_n)$, which is interpolation read as a remainder.
- [[factor-remainder-theorem]]: a polynomial of degree at most $n - 1$ with $n$ roots is zero, the uniqueness behind the formula.

## Common traps
- Expanding the whole interpolating polynomial when only one value is asked for.
- Dropping a factor or a sign in a basis denominator $(x_i - x_j)$.
- Using a difference table on unequally spaced inputs, where it does not apply.

## Contest profile
An AIME and olympiad tool for values with no pattern; when a pattern is visible, subtracting it is usually faster.
`,
"subtract-and-factor": String.raw`
## When to use
Polynomials described by values that follow a rule: $P(k) = \frac1k$ or $\frac{k}{k + 1}$ for $k = 0, \ldots, n$; $P(1) = 10$, $P(2) = 20$, $P(3) = 30$ for a monic quartic; or a polynomial taking the same value at several points. The question usually asks for one more value or for a sum such as $P(12) + P(-8)$, where an unknown root cancels.

## How
1. Find the simple function $g$ the values follow, such as $\frac1x$, $10x$ or a constant.
2. Form $Q(x) = P(x) - g(x)$, multiplied through by a denominator if $g$ is a fraction, so that $Q$ is a polynomial vanishing at every given point.
3. Compare degrees: if $Q$ has as many known roots as its degree, $Q(x) = c\prod(x - x_i)$; if it has one more degree, include an unknown root $(x - r)$.
4. Find $c$ from the leading coefficient or from a point where $P$ drops out, then evaluate $Q$ and recover $P$.

Find $P(5)$ if $P$ has degree $3$ and $P(k) = \frac1k$ for $k = 1, 2, 3, 4$. The polynomial $Q(x) = xP(x) - 1$ has degree $4$ and vanishes at $1, 2, 3, 4$, so $Q(x) = c(x - 1)(x - 2)(x - 3)(x - 4)$. At $x = 0$, $Q(0) = -1 = 24c$, so $c = -\frac{1}{24}$. Then $Q(5) = -\frac{24}{24} = -1$, so $5P(5) - 1 = -1$ and $P(5) = 0$.

{{figure:auxiliary}}

## Why it works
If $Q(x_i) = 0$, the Factor Theorem gives the factor $x - x_i$, and distinct roots give distinct factors, so $Q$ is divisible by $\prod(x - x_i)$. When the number of known roots equals the degree of $Q$, the quotient is a constant; one more fact about $Q$, such as its value at a point where the unknown $P$ is multiplied by $0$, determines that constant and therefore $Q$ and $P$ completely.

The method works because the rule $g$ hides the polynomial's structure: $P$ itself has no visible roots, but $P - g$ has as many as the data.

## Formulas it uses
- [[factor-remainder-theorem]]: each root $x_i$ of $Q$ gives a factor $x - x_i$, which builds the factored form.
- [[fundamental-theorem-algebra]]: a polynomial of degree $n$ is its leading coefficient times the product of $n$ root factors, so no factor is missing.

## Common traps
- Miscounting the degree of $Q$: $xP(x) - 1$ has degree one more than $P$, so it has room for one more root.
- Writing $Q$ as monic when its leading coefficient is unknown or different.
- Forgetting an unknown extra root when $Q$ has higher degree than the number of known roots.

## Contest profile
A recurring AIME and olympiad move: subtract the obvious function, factor the difference, and evaluate once.
`,

"difference-of-squares": String.raw`
## Why it works
Multiply out the product and the middle terms cancel: $(a - b)(a + b) = a^2 + ab - ab - b^2 = a^2 - b^2$.

The figure at the top shows why the answer has that shape. Cut a $b \times b$ corner out of an $a \times a$ square; the L-shaped piece left over has area $a^2 - b^2$, and it can be cut and rearranged into a rectangle $a + b$ long and $a - b$ wide.

The cube versions expand the same way, with more cancellation: $$(a - b)(a^2 + ab + b^2) = a^3 + a^2b + ab^2 - a^2b - ab^2 - b^3 = a^3 - b^3.$$ Replacing $b$ by $-b$ turns this into $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.

All three are cases of one pattern. As a polynomial in $a$, $a^n - b^n$ is zero when $a = b$, so it always has the factor $a - b$; and for odd $n$, $a^n + b^n$ is zero when $a = -b$, so it has the factor $a + b$. That is why a sum of two cubes factors but a sum of two squares does not.

## How to use it
The identity does one thing everywhere it appears: it converts a subtraction into a product, and a product is something you can count, cancel, or bound. Everything below is that conversion wearing different clothes.

Against a Diophantine equation it turns solving into counting. Writing $$n = a^2 - b^2 = (a - b)(a + b)$$ means every representation is a factorization of $n$, so the question stops being "which squares differ by $n$" and becomes "how many factor pairs does $n$ have", which is why this card and factor-pair counting appear together more than either does with anything else.

The one filter that matters: $a - b$ and $a + b$ always have the same parity, so an $n \equiv 2 \pmod 4$ has no representations at all.

Against a radical it clears the denominator, since $(\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b$ leaves no radical behind; that is all [[rationalizing|rationalizing]] is.

Against a product it telescopes. Multiplying the chain by $1 - x$ collapses it completely, $$(1 - x)(1 + x)(1 + x^2)(1 + x^4)\cdots(1 + x^{2^{k-1}}) = 1 - x^{2^k},$$ because each factor is the conjugate the previous step was waiting for. Recognizing a chain of that shape is worth more than the formula, since the collapse is total rather than partial.

And against arithmetic it is a shortcut: $51 \cdot 49 = 2500 - 1$, and more usefully $a^2 - b^2$ with $a$ and $b$ close together is small, which is often the bound a problem needs.

## On contests
Rarely the whole problem — three of the 42 tagged here stand alone — because it is a move rather than a result. Its standing partner is factor-pair counting (6 problems): factor first, then count the pairs and filter by parity and sign. The next most common partner is [[arithmetic-series|an arithmetic series]] (4), where pairing consecutive terms produces differences of squares that cancel down the list.

The trigger to train is "one less than a power". Anything of the form $2^{32}-1$, $10^4-1$, or $n^2-1$ should be factored before it is thought about, and the [[sophie-germain|Sophie Germain]] identity is the same instinct applied to $a^4+4b^4$, which is a difference of squares once you add and subtract $4a^2b^2$.
`,

"an-minus-bn": String.raw`## Why it works
The geometric-series identity: multiply $(a - b)$ by the sum $a^{n-1} + a^{n-2}b + \cdots + b^{n-1}$ and everything telescopes. For odd $n$, substitute $-b$ to get the $a^n + b^n$ version.

## How to use it
Divisibility engine: $a - b \mid a^n - b^n$ always; $a + b \mid a^n + b^n$ for odd $n$; and $a^m - 1 \mid a^n - 1$ iff $m \mid n$. Factoring numbers like $2^{15} - 1$: factor the exponent's divisor chain. Combined with [[lte-lemma|LTE]] it computes exact prime powers.

## On contests
"Find the largest prime factor of $3^{12} - 1$"-type problems: factor via exponent divisors ($3^6-1$, $3^4-1$, $3^3-1$, cyclotomic pieces). Mersenne-flavored AIME number theory leans on $m \mid n \iff 2^m - 1 \mid 2^n - 1$.`,

"sophie-germain": String.raw`
## Key forms
- the completed square: $a^4 + 4b^4$ is the square of $a^2 + 2b^2$ minus the square of $2ab$
- each factor is a sum of two squares: $\left((a - b)^2 + b^2\right)\left((a + b)^2 + b^2\right)$

## Conditions
The identity holds for all real or complex $a$ and $b$. For integer factorization arguments, $a$ and $b$ are positive integers, and the smaller factor $(a - b)^2 + b^2$ exceeds $1$ unless $a = b = 1$.

## Why it works
Adding and subtracting $4a^2b^2$ completes a square: $$a^4 + 4b^4 = a^4 + 4a^2b^2 + 4b^4 - 4a^2b^2 = (a^2 + 2b^2)^2 - (2ab)^2.$$ The result is a difference of two squares, which factors as $(a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)$. Rewriting $a^2 - 2ab + 2b^2$ as $(a - b)^2 + b^2$ shows that each factor is a sum of two squares.

## Useful observations
- With $b = 1$ it reads $n^4 + 4 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, so $n^4 + 4$ is prime only for $n = 1$, where it equals $5$.
- $n^4 + 4^k$ fits the identity when $k$ is odd, with $b = 2^{(k-1)/2}$, since then $4^k = 4b^4$.
- The two factors evaluated at consecutive arguments share a value: with $f(x) = x^2 + 2bx + 2b^2$ and $g(x) = x^2 - 2bx + 2b^2$, $f(x) = g(x + 2b)$, which makes products of such expressions telescope.

## Applications
Factorizations and compositeness of expressions of the form $a^4 + 4b^4$, and products of such expressions over arithmetic progressions, where the factors cancel in a telescoping chain.

## Contest profile
An occasional AIME and AMC tool: a fourth power plus four times a fourth power, often hidden behind a constant such as $324 = 4 \cdot 3^4$.
`,

"largest-term-ratio": String.raw`
## When to use
Questions that ask which term of a binomial expansion is largest, such as the largest coefficient of $(1 + 2x)^{20}$; which number of successes is most likely in repeated trials; or where a sequence built from factorials, powers, and binomial coefficients peaks. The terms are too large to compute, but their ratio is small and simple.

## How
1. Write the general term $a_k$, positive for every $k$ in range.
2. Form $\frac{a_{k+1}}{a_k}$ and cancel the factorials.
3. Solve $\frac{a_{k+1}}{a_k} > 1$ for $k$: the terms climb for those $k$.
4. The peak is at the first $k$ where the ratio drops to $1$ or below. If the ratio equals $1$ exactly, two neighbors tie.
5. Check that the ratio really decreases in $k$, so there is only one crossing.

Which coefficient of $(1 + 2x)^{20}$ is largest? The coefficient of $x^k$ is $a_k = \binom{20}{k}2^k$, and $$\frac{a_{k+1}}{a_k} = \frac{20 - k}{k + 1} \cdot 2.$$ This exceeds $1$ when $40 - 2k > k + 1$, that is $k < 13$, and equals $1$ at $k = 13$. So the coefficients climb up to $a_{13}$, and $a_{14} = a_{13}$: two coefficients tie for the largest, $a_{13} = a_{14} = 635043840$.

{{figure:bars}}

## Why it works
For positive terms, $a_{k+1} > a_k$ exactly when the ratio exceeds $1$. If the ratio decreases as $k$ grows, it crosses $1$ at most once, so the sequence rises, peaks, and falls, with no second peak, as the figure shows. For binomial-type terms the ratio is $\frac{n - k}{k + 1}\cdot r$, whose numerator decreases and denominator increases, so it always decreases.

The ratio is useful because almost everything cancels: $\frac{\binom{n}{k+1}}{\binom nk} = \frac{n - k}{k + 1}$ comes from writing both coefficients as factorials. The location of the maximum is then a linear inequality in $k$, however large the terms are. For the binomial distribution with $n$ trials and success probability $p$, the same computation puts the most likely count at $\lfloor (n + 1)p \rfloor$.

## Formulas it uses
- [[pascals-identity]]: the ratio $\frac{\binom n{k+1}}{\binom nk} = \frac{n - k}{k + 1}$, which reduces the comparison to a linear inequality.
- [[binomial-theorem]]: the coefficients $\binom nk a^{n-k}b^k$ of $(a + b)^n$ are the usual terms being compared.
- [[binomial-probability]]: $\binom nk p^k(1 - p)^{n-k}$, whose largest value is the most likely number of successes.

## Common traps
- Answering with the last $k$ where the ratio exceeds $1$, instead of the next index, which is the peak.
- Missing a tie when the ratio equals $1$ exactly.
- Applying the test to terms that change sign; compare absolute values instead.
- Forgetting the factor $r^k$ in a weighted expansion, which shifts the peak away from the middle.

## Contest profile
An occasional AIME question asks directly for the largest coefficient or most likely outcome, and the ratio settles it in two lines.
`,

"sfft": String.raw`
## When to use
Equations such as $xy - 2x + 3y = 20$, $\frac1x + \frac1y = \frac1n$ after clearing denominators, $3xy + 5x + 2y = 40$ after multiplying by the coefficient of $xy$, and conditions such as a rectangle's area equaling its perimeter. The signal is two unknown integers, their product, and a multiple of each.

## How
1. Collect the terms as $xy + ax + by = c$; if $xy$ has a coefficient $k$, multiply the equation by $k$ first.
2. Add $ab$ to both sides: $(x + b)(y + a) = c + ab$.
3. List the factor pairs of $c + ab$, including negative pairs when the unknowns may be negative.
4. Convert each pair back, and keep the solutions that satisfy every condition.

Which rectangles with whole-number sides have area equal to perimeter? From $xy = 2x + 2y$, adding $4$ gives $(x - 2)(y - 2) = 4$. The positive factor pairs $1 \cdot 4$, $2 \cdot 2$, $4 \cdot 1$ give $3 \times 6$, $4 \times 4$ and $6 \times 3$, while the negative pairs give a side that is not positive. So the rectangles are $3 \times 6$ and $4 \times 4$.

## Why it works
Expanding $(x + b)(y + a) = xy + ax + by + ab$ shows that the left side of $xy + ax + by = c$ is this product without its constant term, so adding $ab$ to both sides completes it. With integer unknowns, $x + b$ and $y + a$ are integers whose product is the known number $c + ab$, so they are a factor pair, and each factor pair gives back exactly one solution.

When $xy$ has a coefficient $k$, multiplying by $k$ gives $(kx + b)(ky + a) = kc + ab$, the same shape. The figure shows the identity as a rectangle cut into four pieces.

## Formulas it uses
- [[number-of-divisors]]: counts the factor pairs of $c + ab$, which is the number of solutions before any filter.

## Common traps
- Adding $a + b$, or the wrong product, instead of $ab$.
- Forgetting to multiply through when $xy$ has a coefficient.
- Missing the negative factor pairs, or keeping ones that give invalid values.

## Contest profile
Usually the first step of an AIME Diophantine problem, after which listing or counting factor pairs finishes.
`,

"cubes-minus-3abc": String.raw`## Why it works
Direct expansion, or the elegant route: $a^3+b^3+c^3 - 3abc = \det$ of a circulant matrix, factoring via [[roots-of-unity|roots of unity]]. The second factor is $\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2]$, manifestly nonnegative.

## How to use it
Two directions: (1) if $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$ — applies to differences like $(x-y), (y-z), (z-x)$ which always sum to zero; (2) the factorization itself for Diophantine or symmetric-system problems. Also proves AM-GM for three variables.

## On contests
"$x - y$, $y - z$, $z - x$" cube sums, and systems giving $a+b+c$ and $ab+bc+ca$ and $abc$ (compute cube sums via this + [[newtons-sums|Newton]]). The zero-sum special case is the single most reused fragment.`,

"square-of-sum": String.raw`
## Why it works
Multiplying a sum by itself pairs every term with every term, so each square appears once and each product of two different terms appears twice, once in each order.

Write $(a + b + c)^2 = (a + b + c)(a + b + c)$ and multiply every term of the first bracket by every term of the second, which gives nine products. Three of them pair a term with itself: $a^2$, $b^2$, and $c^2$. The other six pair two different terms, and each pair shows up twice, as $ab$ and $ba$, as $bc$ and $cb$, and as $ca$ and $ac$. So the square is $$a^2 + b^2 + c^2 + 2(ab + bc + ca).$$

The figure at the top is the two-term version: a square of side $a + b$ splits into the squares $a^2$ and $b^2$ and two $ab$ rectangles.

The two-variable relatives come from adding and subtracting $(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$: the cross terms cancel in the sum, and the squares cancel in the difference. And the cross term of $\left(x + \frac1x\right)^2$ is $2 \cdot x \cdot \frac1x = 2$, so $$\left(x + \frac1x\right)^2 = x^2 + 2 + \frac{1}{x^2}.$$

One rearrangement is worth keeping separately: $$a^2 + b^2 + c^2 - ab - bc - ca = \frac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right].$$ The right side is visibly never negative and is zero only when $a = b = c$, so it turns a symmetric expression into an inequality with a known equality case.

## How to use it
The three-variable identity converts among $a + b + c$, $ab + bc + ca$, and $a^2 + b^2 + c^2$: given $a + b + c = 6$ and $ab + bc + ca = 11$, the sum of the squares is $36 - 22 = 14$, with no need to find $a$, $b$, and $c$.

For $x + \frac1x$, square and cube to climb. If $y = x + \frac1x$, then $x^2 + \frac{1}{x^2} = y^2 - 2$ and $x^3 + \frac{1}{x^3} = y^3 - 3y$, and higher powers follow by multiplying neighbors, since $$\left(x^n + \frac{1}{x^n}\right)\left(x + \frac1x\right) = \left(x^{n+1} + \frac{1}{x^{n+1}}\right) + \left(x^{n-1} + \frac{1}{x^{n-1}}\right).$$

## On contests
A permanent AMC fixture in two shapes: "given $\sum a$ and $\sum a^2$, find $\sum ab$", and climbing the powers of $x + \frac1x$ one step at a time. Of the 16 problems tagged here only 2 need nothing else; the identity usually serves another setup, such as a box whose [[space-diagonal|space diagonal]] and edge sum are given (3 problems), where $(a + b + c)^2$ links the two.
`,

"binomial-theorem": String.raw`
## Why it works
Multiplying out $(x + y)^n$ means choosing $x$ or $y$ from each of the $n$ brackets, and $\binom nk$ counts the ways to choose $y$ exactly $k$ times.

Write $(x + y)^n = (x + y)(x + y)\cdots(x + y)$ with $n$ brackets. Each term of the expansion is built by picking one of the two letters from every bracket and multiplying the picks. A term that picks $y$ from $k$ brackets and $x$ from the other $n - k$ is $x^{n-k}y^k$, and there is one such term for every choice of which $k$ brackets supply the $y$. There are $\binom nk$ of those choices, so after collecting like terms the coefficient of $x^{n-k}y^k$ is $\binom nk$: $$(x + y)^n = \sum_{k=0}^{n} \binom nk x^{n-k}y^k.$$

The same picture explains Pascal's triangle. Split off one bracket: $(x + y)^n = (x + y)^{n-1}(x + y)$. A term $x^{n-k}y^k$ either takes its last $y$ from the final bracket, leaving $k - 1$ of them among the first $n - 1$ brackets, or takes the $x$ there, leaving all $k$ among the first $n - 1$. So $$\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}:$$ each entry is the sum of the two above it.

{{figure:pascal}}

## How to use it
Coefficient extraction is the everyday use, and substitution extends it: the coefficient of $x^2$ in $(2x - 3)^5$ is $\binom52 \cdot 2^2 \cdot (-3)^3$, read off by treating $2x$ and $-3$ as the two terms.

For remainders, write the base next to a round number: $9^{100} = (10 - 1)^{100}$, and modulo $1000$ every term containing $10^3$ or more vanishes, leaving only three terms to compute. For a small $\epsilon$, $(1 + \epsilon)^n \approx 1 + n\epsilon$ is just the first two terms of the expansion.

## On contests
Spread across many problem types rather than tied to one: 2 of the 19 problems tagged here use it alone, and no partner appears more than twice. The recurring shapes are last-digit and remainder questions such as $9^{100} \bmod 1000$, coefficient hunts in products of binomials, and sums of binomial coefficients that collapse under a clever substitution. It is also the bridge between algebra and counting, since every $\binom nk$ in an expansion is a count of choices.
`,

"brahmagupta-fibonacci": String.raw`## Why it works
$|z|^2|w|^2 = |zw|^2$ for complex numbers $z = a+bi$, $w = c+di$ — expand both sides. The two sign choices come from $zw$ and $z\bar w$.

## How to use it
Closure tool: products of sums-of-two-squares are sums of two squares, with an explicit recipe for the representation. Run it forward to build representations (e.g. $65 = 5 \cdot 13 = (1^2+2^2)(2^2+3^2)$ gives both $1^2+8^2$ and $4^2+7^2$) or cite it for existence.

## On contests
AIME problems asking for numbers expressible as $a^2 + b^2$ in multiple ways lean on the two sign choices producing distinct representations. Also the algebraic heart of counting lattice points on circles.`,

"arithmetic-series": String.raw`
## Why it works
Write the sum forwards and backwards, one line above the other, and every column adds up to the same number.

Write $S = a_1 + a_2 + \cdots + a_n$, and underneath it the same sum reversed, $S = a_n + a_{n-1} + \cdots + a_1$. Add the two lines column by column. Moving one column to the right raises the top term by $d$ and lowers the bottom term by $d$, so every column has the same total as the first one, $a_1 + a_n$. There are $n$ columns, so $2S = n(a_1 + a_n)$, and halving gives the formula.

{{figure:two-staircases}}

The figure is the same argument in blocks: two copies of the staircase, one turned upside down, fit together into a rectangle $n$ columns wide and $a_1 + a_n$ tall, so one staircase is half of it. It also shows why the sum is the number of terms times the average term. The terms are spread evenly around the average of the two ends, so the amounts above it exactly make up for the amounts below.

Writing the sum twice also avoids a worry that pairing first with last runs into, a middle term left over when $n$ is odd. The doubled sum works for every $n$.

The term formula is the same bookkeeping. Getting from $a_1$ to $a_n$ takes $n - 1$ steps of size $d$, so $a_n = a_1 + (n-1)d$, and solving that for $n$ gives the term count $\frac{a_n - a_1}{d} + 1$.

## How to use it
Think of it as count times average, not as a formula: $$\text{sum} = \text{number of terms} \times \text{average term}.$$ That reading survives where the formula does not: any list symmetric about its middle has sum equal to its length times its middle value, so the same one-line computation handles a set of residues, a run of consecutive integers, or the terms of a symmetric sum that is not arithmetic at all.

It converts a sum into a product, which is what makes it useful inside other problems rather than as an answer. A sum over an unknown-length run becomes $n$ times an average, so an equation about a total becomes an equation about $n$, and since $n$ must be a positive integer, a single divisibility or bounding step often finishes what looked like a two-unknown problem.

Two places to be careful, and they cause most of the errors. Counting the terms is the fencepost problem: a run from $a$ to $b$ by $d$ has $\frac{b-a}{d}+1$ terms, and the $+1$ is missed constantly. And when the last term is unknown, use $$S_n = \frac n2\left(2a_1 + (n - 1)d\right)$$ rather than solving for it first, which keeps one unknown instead of introducing a second.

## On contests
Everywhere and often alone — 13 of the 55 problems tagged here need nothing else, among the highest of any card in the library. Its usual partner is [[geometric-series|a geometric series]] (6 problems), in problems built to contrast the two.

The disguises are what to train. A sum of a residue class ("all multiples of 7 under 500") is an arithmetic series with $d=7$; interior-angle sums are one with $d=180^\circ$; and the sums of consecutive blocks of an arithmetic sequence form another arithmetic sequence, which is how a problem hides one inside itself. In each case naming it converts the whole computation to a single multiplication.
`,

"geometric-series": String.raw`
## Why it works
Multiplying the sum by $r$ shifts every term over by one place, so subtracting the two makes almost everything cancel.

Write $S = a + ar + ar^2 + \cdots + ar^{n-1}$. Then $rS = ar + ar^2 + \cdots + ar^{n-1} + ar^n$: the same terms moved one place along, with a new term at the end and the first term missing. Subtracting, every term except those two cancels, so $S - rS = a - ar^n$. That is $S(1 - r) = a(1 - r^n)$, and dividing by $1 - r$, which is allowed when $r \ne 1$, gives $$S = a\,\frac{1 - r^n}{1 - r}.$$

For the infinite sum, let $n$ grow. When $|r| \lt 1$ the powers $r^n$ shrink toward $0$, so the finite sums approach $$\frac{a}{1 - r},$$ and that limit is what the infinite sum means. When $|r| \ge 1$ the terms do not shrink, and the sums never settle down. The figure at the top is the case $a = \frac12$, $r = \frac12$: each piece is half of what is left, the pieces fill the whole square, and $\frac{1/2}{1 - 1/2} = 1$.

When $r = 1$ the formula does not apply, but it is not needed either: all $n$ terms equal $a$, and the sum is $na$.

## How to use it
Learn the derivation rather than the formula. Multiplying the sum by $r$ and subtracting shifts every term onto its neighbor so that all but two cancel, $$S - rS = a - ar^n,$$ and that single move is reusable: it is also what closes an [[arithmetico-geometric|arithmetico-geometric]] sum, what turns a repeating decimal into a fraction, and what solves a first-order recurrence. The formula is just the move applied once.

The reason it matters so often is that it converts an infinite process into a number. A ball bouncing forever, a fractal dissected forever, a game that might go on forever: each is unbounded in time and finite in total, and the series is what makes that finite total computable. Self-similarity is the tell. Whenever a figure or a process contains a scaled copy of itself, the ratio of the copy is $r$ and the problem is already solved.

Two habits prevent the usual errors. Confirm $|r| \lt 1$ before summing an infinite series, because a problem that fails this is usually testing exactly that. And when only some terms are wanted, re-index rather than filter: every other term of a series with ratio $r$ is itself geometric with ratio $r^2$, $$a + ar^2 + ar^4 + \cdots = \frac{a}{1 - r^2},$$ so splitting by parity gives two clean series instead of one awkward one.

## On contests
Unusually self-sufficient for a tool this common: it is the whole solution in 9 of the 42 problems tagged here. When it has a partner it is [[arithmetic-series|an arithmetic series]] (6 problems), typically a problem that hands you one of each and asks for them to be combined or compared.

The recurring shapes are worth recognizing before any algebra: the total distance of an infinite bounce, the shaded area of a fractal dissection, the probability that a repeated trial first succeeds on turn $k$, and a repeating decimal. All four are the same sum with different nouns.
`,

"power-sums": String.raw`
## Why it works
The sum of the first $n$ integers comes from pairing, and each higher sum comes from a telescoping sum that trades it for the lower ones.

Pairing: write $1 + 2 + \cdots + n$ forwards and backwards and add term by term. Each of the $n$ pairs adds to $n + 1$, so twice the sum is $n(n + 1)$.

Squares: add up $(k + 1)^3 - k^3 = 3k^2 + 3k + 1$ for $k = 1$ to $n$. The left side telescopes to $(n + 1)^3 - 1$, and the right side is $3\sum k^2 + \frac{3n(n + 1)}{2} + n$. Solving, $$3\sum k^2 = (n + 1)^3 - (n + 1) - \frac{3n(n + 1)}{2} = \frac{n(n + 1)(2n + 1)}{2},$$ so $\sum k^2 = \frac{n(n + 1)(2n + 1)}{6}$. The same step with $(k + 1)^4 - k^4$ gives the cubes.

The cube formula also has a picture. A square of side $1 + 2 + \cdots + n$ splits into L-shaped bands, and the $k$th band lies between the squares of sides $\frac{(k - 1)k}{2}$ and $\frac{k(k + 1)}{2}$. Its area is the difference of their squares, which factors as $k \cdot k^2 = k^3$. The bands fill the square, so $1^3 + 2^3 + \cdots + n^3 = (1 + 2 + \cdots + n)^2$.

{{figure:cubes}}

## How to use it
Any polynomial summed over $k = 1$ to $n$ reduces to these formulas plus $\sum 1 = n$: expand, sum term by term, and simplify. For example $$\sum_{k=1}^{n} k(k + 1) = \sum k^2 + \sum k = \frac{n(n + 1)(n + 2)}{3}.$$

Every formula here starts at $k = 1$, so a sum that starts anywhere else needs the prefix subtracted first: $$\sum_{k=a}^{b} f(k) = \sum_{k=1}^{b} f(k) - \sum_{k=1}^{a-1} f(k).$$ The piece removed ends at $a - 1$, not $a$; using $a$ silently drops the $k = a$ term. The same care applies to the odd and even sums, whose last terms are $2n - 1$ and $2n$, so "the even numbers up to $100$" means $n = 50$.

## On contests
Eight problems here, six AIME and two AMC 12, none by it alone and each with a different partner, since a closed-form sum is usually one step inside a larger count: [[rectangles-in-grid|rectangles in a grid]], or a divisibility condition on $\frac{n(n + 1)}{2}$ settled with [[crt|the Chinese Remainder Theorem]]. The identity $\sum k^3 = \left(\sum k\right)^2$ is sometimes tested directly.
`,

"telescoping": String.raw`
## When to use
Sums of fractions whose denominators factor into terms in arithmetic progression, such as $\frac{1}{k(k+1)}$, $\frac{1}{(2k-1)(2k+1)}$ or $\frac{1}{k(k+1)(k+2)}$; sums of radical fractions $\frac{1}{\sqrt k + \sqrt{k+1}}$; terms like $\frac{k}{(k+1)!}$; products such as $\prod\left(1 - \frac{1}{k^2}\right)$; and sums of $\arctan$, $\tan$, or $\cot$ at related angles. The signal is a long sum whose terms all have the same shape and whose answer is supposed to be a simple number.

## How
1. Guess $f$ from the terms, as $\frac1k$ for $\frac{1}{k(k+1)}$.
2. Split the term by partial fractions, by rationalizing, or by an identity, so it reads $f(k) - f(k+1)$, or $f(k) - f(k+d)$ when the factors are $d$ apart.
3. Write out the first and last few terms to see what cancels.
4. Keep the survivors: one term at each end for a gap of $1$, and $d$ terms at each end for a gap of $d$.
5. For a product, write each factor as $\frac{g(k)}{g(k+1)}$ and cancel the same way.

Compute $\sum_{k=2}^{100}\frac{1}{k^2 - 1}$. Since $k^2 - 1 = (k - 1)(k + 1)$, a gap of $2$, the term is $\frac12\left(\frac{1}{k-1} - \frac{1}{k+1}\right)$. Two terms survive at each end: $$\frac12\left(1 + \frac12 - \frac{1}{100} - \frac{1}{101}\right) = \frac{14949}{20200}.$$

{{figure:staircase}}

## Why it works
When each term is $f(k) - f(k+1)$, the sum from $k = m$ to $n$ lists every intermediate value $f(m+1), \ldots, f(n)$ twice, once with each sign. Those cancel, leaving $f(m) - f(n+1)$. The figure shows the cancellation as a staircase: each term is the drop from one step to the next, and the drops add up to the total fall from the first step to the last.

The splitting rules produce that shape. Putting $\frac1k - \frac{1}{k+d}$ over a common denominator gives $\frac{d}{k(k+d)}$, which is where partial fractions come from. Multiplying by a conjugate gives $\frac{1}{\sqrt k + \sqrt{k+1}} = \sqrt{k+1} - \sqrt k$. Writing $k = (k + 1) - 1$ gives $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$.

For products, $1 - \frac{1}{k^2} = \frac{k - 1}{k} \cdot \frac{k + 1}{k}$ is a product of two telescoping ratios, so $\prod_{k=2}^{n}\left(1 - \frac{1}{k^2}\right) = \frac1n \cdot \frac{n + 1}{2} = \frac{n+1}{2n}$.

## Formulas it uses
- [[factorial-telescoping]]: $k \cdot k! = (k+1)! - k!$ and $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$, the standard factorial differences.
- [[difference-of-squares]]: rationalizing $\frac{1}{\sqrt k + \sqrt{k+1}}$ to the difference $\sqrt{k+1} - \sqrt k$.
- [[arctan-telescoping]]: $\arctan a - \arctan b = \arctan\frac{a - b}{1 + ab}$, which writes terms such as $\arctan\frac{1}{k^2 + k + 1}$ as differences.
- [[cot-tan-telescoping]]: $\cot\theta - \cot 2\theta = \csc 2\theta$, which telescopes sums over doubling angles.

## Common traps
- Keeping only one term at each end when the gap is $d > 1$.
- Forgetting the constant in front of the split, such as the $\frac12$ in $\frac{1}{k^2 - 1} = \frac12\left(\frac{1}{k-1} - \frac{1}{k+1}\right)$.
- Misreading the end: the last survivor is $f(n+1)$, not $f(n)$.
- In an infinite sum, assuming the tail term goes to zero without checking.

## Contest profile
Common at every level, usually as the main move: AMC problems telescope after one partial fraction, while AIME and olympiad problems hide the difference behind radicals, factorials, or trigonometry.
`,

"arithmetico-geometric": String.raw`## Why it works
Differentiate $\sum x^k = \frac{1}{1-x}$ termwise, or avoid calculus: $S - xS$ turns the linear coefficients into a plain geometric series.

## How to use it
$\sum_{k\ge1} k x^k = \frac{x}{(1-x)^2}$ and, one more derivative up, $\sum k^2 x^k = \frac{x(1+x)}{(1-x)^3}$. Finite versions come from the same shift trick. This is the standard closed form behind expected values of geometric-type random variables.

## On contests
Expected-value problems ("expected number of flips") and sums like $\frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \cdots$ appear on AMC/AIME regularly; the shift-subtract derivation is fast and safe under pressure.`,

"binets-formula": String.raw`
## Why it works
A geometric sequence $r^n$ satisfies the Fibonacci rule exactly when $r^2 = r + 1$, and the combination of the two such sequences that fits the first two terms is the whole sequence.

Putting $r^n$ into $F_{n+1} = F_n + F_{n-1}$ and dividing by $r^{n-1}$ gives $r^2 = r + 1$, with roots $\varphi$ and $\psi$. The rule is linear, so $A\varphi^n + B\psi^n$ satisfies it for any constants, and matching $F_0 = 0$ and $F_1 = 1$ gives $A = -B = \frac1{\sqrt5}$. This is the general method for [[linear-recurrence|linear recurrences]].

The identities come from the recurrence itself. Since $F_i = F_{i+2} - F_{i+1}$, the sum $F_1 + \cdots + F_n$ [[telescoping|telescopes]] to $F_{n+2} - F_2 = F_{n+2} - 1$.

## How to use it
For a single far-out term or its size, use the closed form: $F_n$ is the nearest integer to $\frac{\varphi^n}{\sqrt5}$, so it has roughly $0.209n$ digits, since $\log_{10}\varphi \approx 0.209$.

For sums, products, and divisibility, use the identities instead: $$F_1 + \cdots + F_n = F_{n+2} - 1, \qquad F_1^2 + \cdots + F_n^2 = F_nF_{n+1},$$ together with Cassini's $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$, the addition rule $F_{m+n} = F_mF_{n+1} + F_{m-1}F_n$, and $\gcd(F_m, F_n) = F_{\gcd(m, n)}$. For example $F_1 + \cdots + F_8 = F_{10} - 1 = 54$, and $\gcd(F_{12}, F_{18}) = F_6 = 8$.

## On contests
Four problems here, split between AMC and AIME, none by it alone; two continue into linear recurrences in general. Fibonacci sums and gcds appear on AIME with the identities as the intended shortcuts.
`,

"linear-recurrence": String.raw`
## Why it works
Geometric sequences are the building blocks: substituting $a_n = r^n$ turns the recurrence into an equation for $r$, and any combination of the geometric sequences that work also works.

Put $a_n = r^n$ into $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ and divide by $r^{n-k}$. The result is $$r^k = c_1r^{k-1} + \cdots + c_k,$$ the characteristic equation, so its roots are exactly the ratios whose geometric sequences obey the rule.

The rule is linear, meaning that a sum of solutions, or a multiple of one, is again a solution, so $\sum_i A_ir_i^{\,n}$ works for any constants $A_i$. With $k$ distinct roots there are $k$ constants, just enough to match the $k$ initial terms, and since those initial terms determine the whole sequence, the matching combination is the sequence.

For $a_n = a_{n-1} + 2a_{n-2}$ the characteristic equation is $x^2 = x + 2$, with roots $2$ and $-1$, so $$a_n = A \cdot 2^n + B(-1)^n.$$

A repeated root leaves one constant short, and $nr^n$ supplies the missing solution: it is what two geometric solutions look like in the limit as their ratios merge. A complex-conjugate pair $\rho e^{\pm i\phi}$ combines into the real form $$\rho^n(A\cos n\phi + B\sin n\phi),$$ which is why some linear recurrences oscillate instead of growing steadily; when $\rho = 1$ and $\phi$ is a rational multiple of $\pi$, the sequence is periodic.

## How to use it
Write the characteristic equation, factor it, assemble the general solution from the roots, then solve the small linear system the initial terms give you. Check one term beyond the ones you fitted; it catches almost every algebra slip.

For a rule with an extra term, $a_n = c_1a_{n-1} + \cdots + f(n)$, the general solution is one particular solution plus the solution of the rule without $f(n)$. Guess the particular solution by matching the shape of $f(n)$: a constant for a constant, a degree-$d$ polynomial for a degree-$d$ polynomial, $Cs^n$ for $s^n$. If that guess already solves the rule without $f(n)$, multiply it by $n$ and try again.

When the recurrence is not linear, look for a substitution that makes it so. With $b_n = \frac{1}{a_n}$, $$a_n = \frac{a_{n-1}}{1 + a_{n-1}} \quad \text{becomes} \quad b_n = b_{n-1} + 1,$$ an [[arithmetic-series|arithmetic sequence]]; $b_n = \log a_n$ linearizes a multiplicative rule, and $b_n = a_n - L$ handles a shifted fixed point. Failing that, telescope, or compute terms and test for periodicity: an ugly rational rule is usually periodic rather than solvable in closed form.

## On contests
Recognizing the branch within seconds is what the time pressure rewards: a $+d$ on a first-order rule means shifting to the fixed point, a two-term rule with no extra term means the characteristic equation, and an ugly rational rule means periodicity or a reciprocal substitution.

Of the 13 problems tagged here only 1 needs nothing else, with [[telescoping|telescoping]] and [[binets-formula|Binet's Formula]] the usual partners (2 each).

Counting recursions, such as tilings and strings avoiding a pattern, are usually Fibonacci-like and yield closed forms this way, though AIME more often asks for a term modulo $m$, and then the right move is to skip the closed form and iterate the recurrence modulo $m$, hunting for the cycle.
`,

"am-gm": String.raw`
## Why it works
For two numbers, the gap between the arithmetic and geometric means is a perfect square, so it can never be negative.

$$\frac{a + b}{2} - \sqrt{ab} = \frac{(\sqrt a - \sqrt b)^2}{2} \ge 0,$$ and the square is zero only when $a = b$. The same fact has a picture: four $a \times b$ rectangles fit inside a square of side $a + b$ with a square hole of side $a - b$ left over, so $(a + b)^2 \ge 4ab$.

{{figure:pinwheel}}

For $n$ numbers, a smoothing argument gives the general case. Let $m$ be their mean. If the numbers are not all equal to $m$, one of them, $x$, is above $m$ and another, $y$, is below. Replace $x$ by $m$ and $y$ by $x + y - m$.

The sum does not change, and the product goes up, because $$m(x + y - m) - xy = (x - m)(m - y) \gt 0.$$ Each step makes one more number equal to $m$, so after at most $n$ steps all of them equal $m$, and the product has only grown, to $m^n$. The original product was therefore at most $m^n$, which is the inequality. It also follows from [[jensens-inequality|Jensen's Inequality]] for the concave function $\log x$.

## How to use it
To minimize a sum whose terms have a constant product, or maximize a product with a constant sum, arrange the terms so that the equality case can happen. For example $$x + \frac{16}{x} \ge 2\sqrt{16} = 8,$$ with equality at $x = 4$.

When the product is not constant, split terms until it is: for $2x + \frac{3}{x^2}$, write $2x$ as $x + x$, so the three terms $x$, $x$, and $\frac3{x^2}$ have product $3$: $$x + x + \frac3{x^2} \ge 3\sqrt[3]{x \cdot x \cdot \frac{3}{x^2}} = 3\sqrt[3]3,$$ reached when $x = \frac3{x^2}$, that is, $x = \sqrt[3]3$.

Always check that the equality case is allowed by the constraints; if it is not, the bound is true but it is not the answer. Instant consequences worth knowing: $x + \frac1x \ge 2$ for $x \gt 0$, $\frac ab + \frac ba \ge 2$, and among rectangles with a given perimeter the square has the largest area.

## On contests
Six problems here, four of them AIME, and four solved by it alone, which is typical: once the right split is found, the inequality is the whole solution. AMC uses it for "minimum value of" questions and AIME for bounding steps. When the terms carry weights or squares, [[cauchy-schwarz|Cauchy–Schwarz]] is often the better tool.
`,

"mean-chain": String.raw`## Why it works
The chain is really one inequality proved three times. QM $\ge$ AM is the statement that variance is non-negative: expanding $\sum(a_i-\bar a)^2 \ge 0$ gives $\sum a_i^2 \ge n\bar a^2$, which is exactly $\text{QM}^2 \ge \text{AM}^2$. AM $\ge$ GM follows from the concavity of $\ln$. And GM $\ge$ HM is not a new fact at all — it is AM $\ge$ GM applied to the reciprocals $1/a_i$ and then flipped. Every equality case is the same: all the $a_i$ are equal.

## Full proof
Throughout, $a_1,\dots,a_n \gt 0$ and $\bar a = \frac{1}{n}\sum a_i$ denotes the arithmetic mean.

QM $\ge$ AM. Since squares are non-negative, $\sum_{i=1}^n (a_i - \bar a)^2 \ge 0$. Expanding, $\sum a_i^2 - 2\bar a\sum a_i + n\bar a^2 \ge 0$, and $\sum a_i = n\bar a$, so this is $\sum a_i^2 - n\bar a^2 \ge 0$. Dividing by $n$ gives $\frac{1}{n}\sum a_i^2 \ge \bar a^2$, and taking square roots of both non-negative sides gives $\sqrt{\frac{1}{n}\sum a_i^2} \ge \bar a$. Equality needs every $(a_i-\bar a)^2 = 0$, i.e. all $a_i$ equal. (The same conclusion follows from Cauchy-Schwarz against the all-ones vector: $\left(\sum a_i\cdot 1\right)^2 \le n\sum a_i^2$.)

AM $\ge$ GM. The function $\ln$ is concave, since $(\ln x)'' = -1/x^2 \lt 0$. [[jensens-inequality|Jensen's Inequality]] for a concave function says the function of the average is at least the average of the function, so $\ln\!\left(\frac{1}{n}\sum a_i\right) \ge \frac{1}{n}\sum \ln a_i = \ln\!\left(\left(\prod a_i\right)^{1/n}\right)$. Exponentiating the increasing function $e^x$ preserves the inequality, giving $\frac{1}{n}\sum a_i \ge \left(\prod a_i\right)^{1/n}$. Jensen is an equality exactly when all inputs coincide, so again all $a_i$ must be equal.

For $n=2$ this needs no machinery: $\frac{a+b}{2}-\sqrt{ab} = \frac{(\sqrt a-\sqrt b)^2}{2} \ge 0$.

GM $\ge$ HM. Apply the AM $\ge$ GM inequality just proved to the positive numbers $1/a_1,\dots,1/a_n$: $\frac{1}{n}\sum\frac{1}{a_i} \ge \left(\prod \frac{1}{a_i}\right)^{1/n} = \frac{1}{\left(\prod a_i\right)^{1/n}}$. Both sides are positive, so taking reciprocals reverses the inequality: $\left(\prod a_i\right)^{1/n} \ge \frac{n}{\sum 1/a_i}$, which is GM $\ge$ HM. Equality transfers from the AM-GM step, so once more all $a_i$ are equal.

Chaining the three gives QM $\ge$ AM $\ge$ GM $\ge$ HM, with a single equality case: $a_1 = a_2 = \cdots = a_n$.

## How to use it
Pick the pair of means matching the given data and the target: given a sum of squares, QM-AM converts to a sum bound; given a sum of reciprocals, HM enters. The chain also settles "which is bigger" comparison questions instantly.

## On contests
AMC comparison problems and AIME bounding steps. HM's appearance: [[average-speed|average speed]] over equal distances is the harmonic mean — the classic "drive there at 30, back at 60" trap (answer 40, not 45).`,

"cauchy-schwarz": String.raw`
## Key forms
- $\alt{\left(\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)}{(a_1b_1 + \cdots + a_nb_n)^2 \le (a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2)}$ — the plain form, with equality exactly when the two sequences are proportional
- $\alt{\sum \dfrac{x_i^2}{y_i} \ge \dfrac{\left(\sum x_i\right)^2}{\sum y_i}}{\dfrac{x_1^2}{y_1} + \cdots + \dfrac{x_n^2}{y_n} \ge \dfrac{(x_1 + \cdots + x_n)^2}{y_1 + \cdots + y_n}}$ — Titu's lemma, also called the Engel form; the one to reach for whenever squares sit over positive denominators
- $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$ — the vector reading, which makes it obvious: the [[vector-dot-product|dot product]] carries a $\cos\theta$ that never exceeds $1$
- $a_i = \sqrt{w_i}\cdot\dfrac{a_i}{\sqrt{w_i}}$ — the weighting trick: split each term this way before applying it to get a weighted version for free

## Why it works
A quadratic that is never negative cannot have two real roots, and that is the whole inequality.

For every real $t$, $$\sum_i (a_it + b_i)^2 = \left(\sum a_i^2\right)t^2 + 2\left(\sum a_ib_i\right)t + \sum b_i^2 \ge 0.$$ A quadratic that never dips below zero has discriminant at most $0$, and here the discriminant is $4\left(\sum a_ib_i\right)^2 - 4\left(\sum a_i^2\right)\left(\sum b_i^2\right)$, which gives the inequality. Equality needs a $t$ that makes every $a_it + b_i$ zero, which means the sequences are proportional.

[[lagranges-identity|Lagrange's Identity]] writes the gap as a sum of squares, which proves the inequality a second way. Geometrically the statement is $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$, since the dot product carries a factor $\cos\theta$, which is never more than $1$ in size.

Titu's lemma is the plain form with $a_i = \frac{x_i}{\sqrt{y_i}}$ and $b_i = \sqrt{y_i}$: then $\sum a_ib_i = \sum x_i$, and the inequality reads $\left(\sum x_i\right)^2 \le \left(\sum \frac{x_i^2}{y_i}\right)\left(\sum y_i\right)$.

## How to use it
Choosing the two sequences is the art. To bound a linear sum under a constraint on squares, pair it with the constraint: $$(x + 2y + 2z)^2 \le (1^2 + 2^2 + 2^2)(x^2 + y^2 + z^2),$$ so if $x^2 + y^2 + z^2 = 1$ the sum is at most $3$, reached at $(x, y, z) = \left(\frac13, \frac23, \frac23\right)$, where the two sequences are proportional.

Titu's lemma handles squares over positive denominators directly. Given $a + b = 1$, $$\frac1a + \frac4b = \frac{1^2}{a} + \frac{2^2}{b} \ge \frac{(1 + 2)^2}{a + b} = 9,$$ with equality when $\frac1a = \frac2b$, that is, at $a = \frac13$ and $b = \frac23$. Tracking the equality case is what locates the extreme point.

## On contests
Three problems here, two AIME and one AMC 12, one solved by it alone. The model AIME use is a pair of constraints that combine into exactly the equality case of the Engel form, which forces the variables to be proportional and so pins every one of them down. It is the default first attempt on an olympiad inequality, and with the weights $b_i = 1$ it proves that the quadratic mean is at least the arithmetic mean.`,

"rearrangement": String.raw`## Why it works
For sorted sequences $a_1\le\cdots\le a_n$ and $b_1\le\cdots\le b_n$, the sum $\sum a_i b_{\sigma(i)}$ over permutations $\sigma$ is largest when $\sigma$ keeps the same order and smallest when it reverses one. The proof is a swap argument: if some pair is matched out of order, exchanging the two partners changes the sum by $(a_i-a_j)(b_{\sigma(i)}-b_{\sigma(j)})$, whose sign forces the straightened pairing to be at least as large. Repeating until everything is aligned needs no convexity or positivity — just the ordering.

## How to use it
It makes "pair large with large" rigorous, and it is the honest engine behind several results: averaging the same-order and reverse-order versions gives Chebyshev's Sum Inequality, and it underlies many bounds that look like forced AM-GM. When a cyclic sum resists, ask whether its terms are two sorted sequences in disguise. Equality needs one sequence constant or the orders already matched.

## On contests
Mostly olympiad, but AMC/AIME "assign these values to maximize (or minimize) $\sum a_i b_i$" problems are direct: sort both lists and pair them in the same order for the maximum, opposite order for the minimum.`,

"trivial-inequality": String.raw`
## Why it works
A real number and its negative have the same square, and the square of a positive number is positive, so $x^2 \ge 0$ for every real $x$, with equality exactly at $x = 0$. A sum of squares is therefore nonnegative too, and it is zero only when every square is.

Applied to a difference, it gives the two-variable form $$(a - b)^2 \ge 0 \iff a^2 + b^2 \ge 2ab,$$ with equality exactly when $a = b$. Adding the three such inequalities for the pairs from $a$, $b$, $c$ and halving gives $$a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right] \ge 0.$$

The two-variable form with $a = \sqrt x$ and $b = \sqrt y$ is already [[am-gm|AM-GM]] for two numbers, and [[cauchy-schwarz|Cauchy–Schwarz]] and [[mean-chain|the mean inequalities]] are sums of such squares.

## How to use it
For an expression in several variables, [[completing-the-square|complete the square]] in each variable and read off the constant left over: $$x^2 - 6x + y^2 + 4y + 20 = (x - 3)^2 + (y + 2)^2 + 7 \ge 7,$$ with equality at $(3, -2)$.

When a product or a cross term is in the way, look for a hidden square. $a^2 + b^2 \ge 2ab$ bounds a product by a sum of squares, and $\frac{x}{y} + \frac{y}{x} \ge 2$ for positive $x$ and $y$ is $\left(\sqrt{x/y} - \sqrt{y/x}\right)^2 \ge 0$. Writing a symmetric expression as a sum of squares is the [[sos-method|SOS method]].

The equality case matters as much as the bound: every square must vanish at once, which finds the point where the minimum occurs and confirms that it is actually reached.

## On contests
Two problems here, both AIME, one solved by it alone; the other completes the square first. Minimization questions in two or three free variables usually end as a sum of squares plus a constant, and the equality case gives the point where the minimum occurs.
`,

"abs-triangle-inequality": String.raw`## Why it works
Square both sides for the real/complex case, or read it geometrically: the path through the origin detour cannot be shorter than the direct one. Equality iff the terms share direction (same sign / same argument).

## How to use it
Bounding tool: $|A + B|$ splits, $|A - B|$ lower-bounds via the reverse form. In complex-number problems it converts algebraic constraints into geometric ones (locus arguments, max/min of $|z - w|$ given $|z| = r$: the answer is $|w| \pm r$).

## On contests
"Max/min of $|z - 3 - 4i|$ given $|z| = 1$" → $5 \pm 1$; distance bounds in coordinate problems; and [[casework-method|casework]] elimination in absolute-value equations.`,

"bernoulli-inequality": String.raw`## Why it works
Induct on $n$: it holds at $n = 1$, and if $(1+x)^k \ge 1 + kx$ then — since $x \ge -1$ keeps $1 + x \ge 0$ — multiplying preserves the inequality: $(1+x)^{k+1} \ge (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \ge 1 + (k+1)x$. Geometrically, $y = 1 + nx$ is the tangent at $x = 0$ to the convex curve $y = (1+x)^n$, so the curve never dips below it; for real exponents it is just convexity of $t \mapsto t^n$.

## How to use it
A fast, calculus-free bound on a power: estimate compound growth, show a power clears a linear target, or sandwich limits like $\left(1 + \tfrac{1}{n}\right)^n$. Keep the flip in mind — for exponents in $[0,1]$, $(1+x)^r \le 1 + rx$ bounds roots from above. It is often the first move that turns a power into something linear before AM–GM or telescoping finishes.

## On contests
Common in estimation and bounding problems on the AMC/AIME, and a standard lemma in olympiad inequalities. Whenever you need "$(1 + \text{small})^{\text{power}}$ is at least (or at most) roughly linear," this is the tool.`,

"log-rules": String.raw`
## Why it works
A logarithm is an exponent, so every log rule is an exponent law read backwards.

Write $x = b^p$ and $y = b^q$, so that $\log_b x = p$ and $\log_b y = q$. Multiplying, $xy = b^pb^q = b^{p+q}$, so $\log_b(xy) = p + q = \log_b x + \log_b y$: adding exponents is adding logs. Dividing instead gives $\frac xy = b^{p-q}$, which is the quotient rule. Raising to a power gives $x^n = (b^p)^n = b^{np}$, so $\log_b x^n = np = n\log_b x$.

The two identities $\log_b b^p = p$ and $b^{\log_b x} = x$ just say that taking a power and taking a log undo each other. That is what the graphs show: $y = b^x$ and $y = \log_b x$ are mirror images across the line $y = x$.

{{figure:mirror}}

A power on the base divides instead of multiplying. By [[change-of-base|change of base]], $$\log_{b^m} x^n = \frac{\log_b x^n}{\log_b b^m} = \frac{n\log_b x}{m},$$ so an exponent on the argument multiplies and an exponent on the base divides. The special case $m = n$ gives $\log_{b^k} x^k = \log_b x$: raising base and argument to the same power changes nothing.

One thing the algebra hides: $\log_b$ is increasing only when $b \gt 1$. For $0 \lt b \lt 1$ it is decreasing, so applying $\log_b$ to both sides of an inequality reverses it, the same trap as dividing by a negative number.

## How to use it
Contest logs are mostly about converting to a common base and hunting structure: products of logs go to the chain rule, sums of logs collapse into the log of a product (watch for a telescoping product inside), and an exponent anywhere, on the argument or on the base, comes out front via $$\log_{b^m} x^n = \frac{n}{m}\log_b x.$$

Domain discipline is where most marks are lost. Arguments must be positive and the base must avoid $1$, so every solution has to be checked against the original equation; extraneous roots are the single most common error in log problems. When an inequality is involved, check whether the base exceeds $1$ before deciding which way the sign goes.

The reason all of this pays is that logs turn multiplication into addition, so a problem that is nonlinear in $x$ is linear in $\log x$. That is the conversion to look for: substituting $u=\log x$ does not simplify the algebra so much as change its type, and a system that looked intractable becomes a linear system you can solve by adding and halving.

## On contests
Almost never alone, 3 of the 45 problems tagged here, and its inseparable partner is change of base (11 problems), because the first move in nearly every log problem is putting everything over one base so the rules can apply at all.

Two shapes recur. On AMC 12, convert to a common base and substitute $u = \log x$. On AIME, a system in $\log(xy)$, $\log(yz)$, and $\log(zx)$ is linear algebra in three log variables: adding all three and halving gives $\log(xyz)$, and each individual variable follows by subtraction. Recognizing that shape is the entire problem.
`,

"change-of-base": String.raw`
## Key forms
- $\log_a b \cdot \log_b c = \log_a c$ — the two-term chain, the case that actually turns up; the three-term version in the box is the same idea extended
- $\log_a b = \dfrac{1}{\log_b a}$ — inverting the base inverts the logarithm, which is what lets you flip an awkward base
- $\log_a b + \log_b a \ge 2$ for $a, b > 1$ — immediate from $t + \frac1t \ge 2$, and a standard way these appear inside an inequality

## Why it works
A logarithm asks what power of the base gives the number, and writing both the number and the base in terms of a common base $c$ answers that question by division.

Let $\log_b a = t$, so $b^t = a$. Take $\log_c$ of both sides: $\log_c(b^t) = \log_c a$, and by the power rule this is $t\log_c b = \log_c a$. Dividing, $t = \frac{\log_c a}{\log_c b}$. Choosing $c = a$ makes the numerator $1$, which is the reciprocal rule $\log_b a = \frac{1}{\log_a b}$.

The chain rule is the same formula applied to every factor at once. Over a common base, $$\log_a b \cdot \log_b c \cdot \log_c d = \frac{\log b}{\log a} \cdot \frac{\log c}{\log b} \cdot \frac{\log d}{\log c},$$ and each numerator cancels the next denominator, leaving $\frac{\log d}{\log a} = \log_a d$. The same cancellation runs through a chain of any length, which is why these products [[telescoping|telescope]].

## How to use it
Normalize every logarithm to one base first; after that the chain rule collapses products like $\log_2 3 \cdot \log_3 4 \cdots \log_{63} 64$ to $\log_2 64 = 6$ at once. The reciprocal rule handles symmetric pairs: with $t = \log_a b$, the expression $\log_a b + \log_b a$ is $t + \frac1t$, which is at least $2$ when $a, b \gt 1$ by [[am-gm|AM-GM]], and a system in $\log_a b$ and $\log_b a$ becomes a rational equation in $t$.

## On contests
Almost always paired with [[log-rules|the log rules]], in 11 of the 15 problems tagged here and alone in none, because changing base is the step that makes the other rules usable. Telescoping log products are an AMC classic, and AIME layers the reciprocal rule into systems, where substituting $t = \log_a b$ and $\log_b a = \frac1t$ reduces them to rational equations.
`,

"log-swap-identity": String.raw`## Why it works
The identity is $a^{\log_b c}=c^{\log_b a}$. Take $\log_b$ of each side: the left becomes $(\log_b c)(\log_b a)$ and the right becomes $(\log_b a)(\log_b c)$ — the same product, since multiplication commutes. So the base of the power and the argument inside the exponent's logarithm can trade places.

## How to use it
It rewrites awkward exponents into forms that combine or cancel: $2^{\log_3 5}$ and $5^{\log_3 2}$ are the same number, so a sum or ratio mixing them collapses. The common-base version is $x^{\log y}=y^{\log x}$, which means a product like $x^{\log y}\cdot y^{\log x}$ is just $\bigl(x^{\log y}\bigr)^2$. Related anchors: $a^{\log_a x}=x$ and $\log_a b=\frac{1}{\log_b a}$. When an exponent hides a logarithm whose base differs from the power's base, swapping is the move.

## On contests
Occasional but decisive on AMC 12 / AIME — these problems are engineered so the swap makes two terms merge or cancel. Spot the tell (a term like $a^{\log_b c}$ with $a\ne b$) and swap to line it up with its partner.`,

"exponent-laws": String.raw`
## Why it works
For whole-number exponents the laws are counting: $a^m$ is $m$ factors of $a$, so $a^m \cdot a^n$ has $m + n$ factors, and $(a^m)^n$ is $n$ groups of $m$ factors.

Zero, negative, and fractional exponents are then defined so that the addition law keeps working. Since $a^m \cdot a^0$ must be $a^m$, $a^0 = 1$. Since $a^n \cdot a^{-n}$ must be $a^0 = 1$, $a^{-n} = \frac1{a^n}$. And since $\left(a^{1/n}\right)^n$ must be $a$, the power $a^{1/n}$ is the $n$th root of $a$, so $a^{m/n} = \sqrt[n]{a^m}$.

## How to use it
Put everything over a common base and compare exponents: $4^x = 8$ becomes $2^{2x} = 2^3$, so $x = \frac32$. To compare sizes, take the same root of both sides: $$2^{300} = 8^{100} \lt 9^{100} = 3^{200}.$$ When the exponents share no convenient factor, take [[log-rules|logarithms]] instead.

Read towers from the top down: $2^{3^2} = 2^9 = 512$, while $(2^3)^2 = 64$. And a law like $(ab)^n = a^nb^n$ has no counterpart for sums: $(a + b)^n$ needs the [[binomial-theorem|Binomial Theorem]].

## On contests
Four problems here, split between AMC and AIME, one solved by it alone; two continue into logarithms, which are the exponent laws read in reverse. Base matching solves most AMC exponential equations, and taking a common root settles size comparisons.
`,

"complex-basics": String.raw`
## Why it works
Every rule comes from treating $i$ as an ordinary symbol and replacing $i^2$ by $-1$ wherever it appears.

Multiply a number by its conjugate: $$(a + bi)(a - bi) = a^2 - abi + abi - b^2i^2 = a^2 + b^2.$$ The imaginary parts cancel and $-b^2i^2$ becomes $+b^2$, leaving a real number, the square of the distance from $0$ to the point $(a, b)$. That is why $z\bar z = |z|^2$, and why multiplying the top and bottom of a fraction by the conjugate of the bottom makes the bottom real: $\frac1z = \frac{\bar z}{z\bar z} = \frac{\bar z}{|z|^2}$.

The powers of $i$ cycle because each step multiplies by $i$ once more: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, and $i^4 = 1$, and then $i^5 = i$ starts the cycle over. So $i^n$ depends only on $n$ modulo $4$.

Moduli multiply because conjugation respects products, $\overline{zw} = \bar z\,\bar w$, which you can check by expanding both sides. Then $$|zw|^2 = zw\,\overline{zw} = z\bar z\,w\bar w = |z|^2|w|^2.$$ Written out in real numbers this is the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci Identity]], $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2$.

## How to use it
Division means multiplying the top and bottom by the conjugate of the bottom, which turns the denominator into the real number $|z|^2$. Powers of $i$ reduce by taking the exponent modulo $4$. And modulus conditions become algebra through $$|z|^2 = z\bar z, \qquad z + \bar z = 2\operatorname{Re}(z), \qquad z - \bar z = 2i\operatorname{Im}(z);$$ in particular $z$ is real exactly when $z = \bar z$.

The reason to move a problem into the complex plane is that it collapses two coordinates into one number, so a pair of real equations becomes a single complex one and geometric operations become arithmetic. Translation is addition, rotation is multiplication by a number of modulus $1$, and reflection in the real axis is conjugation. A configuration that needed coordinates and trigonometry becomes algebra in one variable.

{{figure:plane}}

The single most useful consequence is that on the unit circle $\bar z = \frac1z$. Conjugates are usually the obstruction in a complex computation, and that substitution removes them entirely, turning an expression that mixes $z$ and $\bar z$ into a rational function of $z$ alone.

## On contests
Alone in 3 of its 26 problems; its usual partner is [[roots-of-unity|roots of unity]] (3), where the unit-circle substitution is exactly what the problem is built around.

The recurring shapes are $|z|=1$ problems solved by $\bar z = 1/z$, sums of powers of $i$ that cycle with period four, and any rotation by $90^\circ$ — which is multiplication by $i$ and nothing more, making [[rotation-90|the coordinate rotation]] a special case of this card.
`,

"eulers-formula": String.raw`## Why it works
Compare Taylor series of $e^{i\theta}$, $\cos\theta$, $\sin\theta$ — or accept it as the definition of complex exponentials and verify the multiplication law via [[angle-addition|angle addition]] formulas (which it then re-derives, circularly but consistently).

## How to use it
Polar form makes multiplication trivial: moduli multiply, angles add. Convert to polar for any power, root, or rotation task; convert back for addition. Rotation of point $z$ about $p$ by $\theta$: $p + e^{i\theta}(z - p)$ — geometry problems become one-line computations.

## On contests
The bridge between trig and algebra on AIME: products of cosines, sums like $\sum \cos k\theta$ (real part of [[geometric-series|geometric series]]), and polygon-vertex computations all route through $e^{i\theta}$.`,

"de-moivre": String.raw`
## Why it works
Multiplying complex numbers multiplies their lengths and adds their angles, so multiplying a number of length $1$ by itself $n$ times adds its angle to itself $n$ times.

The key step is a product of two such numbers. Using $i^2 = -1$, $$(\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta) = (\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta).$$ The two brackets are exactly [[angle-addition|the angle-addition formulas]], so the product is $\cos(\alpha + \beta) + i\sin(\alpha + \beta)$: the angles add.

Now apply that repeatedly. Each further factor of $\cos\theta + i\sin\theta$ adds $\theta$ to the angle, so after $n$ factors the angle is $n\theta$, which is the theorem for every positive integer $n$. For negative $n$, the reciprocal of $\cos\theta + i\sin\theta$ is its conjugate $\cos(-\theta) + i\sin(-\theta)$, so the theorem holds for every integer $n$.

With [[eulers-formula|Euler's Formula]] $e^{i\theta} = \cos\theta + i\sin\theta$ it is simply the exponent law $\left(e^{i\theta}\right)^n = e^{in\theta}$.

## How to use it
Forward, it computes powers without expanding: write the base in polar form, raise the modulus to the $n$th power and multiply the angle by $n$. For $(1 + i)^{20}$, the modulus is $\sqrt2$ and the angle $45^\circ$, and $900^\circ$ is $180^\circ$ plus full turns: $$(1 + i)^{20} = \left(\sqrt2\right)^{20}\left(\cos 900^\circ + i\sin 900^\circ\right) = -2^{10}.$$

Backward is the richer direction. Expand $(\cos\theta + i\sin\theta)^3$ with the Binomial Theorem and match the real part with $\cos 3\theta$: the real part is $\cos^3\theta - 3\cos\theta\sin^2\theta$, and replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $$\cos 3\theta = 4\cos^3\theta - 3\cos\theta.$$ The same move gives $\tan n\theta$ as a rational function of $\tan\theta$.

## On contests
Never the whole problem, none of the 17 tagged here, and most often paired with [[roots-of-unity|roots of unity]] (6 problems), since the $n$th roots of unity are exactly the numbers whose angles De Moivre multiplies back to a full turn. AIME trig identities that seem to come from nowhere are usually De Moivre expansions, and it is also the fastest way to evaluate a large power of a complex number such as $(1 + i)^{20}$.
`,

"roots-of-unity": String.raw`
## Why it works
A root of $z^n = 1$ must have length $1$, and its angle must come back to a whole number of turns after $n$ steps, which leaves exactly $n$ equally spaced points.

Write $z = r(\cos\theta + i\sin\theta)$. By [[de-moivre|De Moivre's Theorem]], $z^n$ has length $r^n$ and angle $n\theta$. For $z^n = 1$ the length must be $1$, so $r = 1$, and the angle $n\theta$ must be a whole number of turns, $2\pi k$, so $$\theta = \frac{2\pi k}{n}.$$ The values $k = 0, 1, \ldots, n - 1$ give $n$ different points, and every other $k$ repeats one of them, as the figure at the top shows.

Since $x^n - 1$ has degree $n$ and these are $n$ distinct roots, they are all of its roots, and $$x^n - 1 = \prod_{k=0}^{n-1}(x - \omega^k).$$ Vieta's Formulas then read their sum from the missing $x^{n-1}$ term, which gives $0$ when $n \gt 1$, and their product from the constant term, $(-1)^n \cdot (-1) = (-1)^{n+1}$. The zero sum has a picture too: the points are balanced around the center, so their average is the center.

## How to use it
Evaluate the factorization at a chosen point to turn a product over the roots into a number. Dividing out the factor $x - 1$ leaves $1 + x + \cdots + x^{n-1} = \prod_{k=1}^{n-1}(x - \omega^k)$, and at $x = 1$ this gives $\prod_{k=1}^{n-1}(1 - \omega^k) = n$: the product of the distances from one vertex of the polygon to all the others is $n$. Evaluating at $x = -1$ gives the alternating versions.

Powers of a fixed root recycle with period $n$, so exponents live modulo $n$. And summing $\omega^{jk}$ over all $k$ gives $n$ when $n$ divides $j$ and $0$ otherwise, which is [[roots-of-unity-filter|the filter]] that picks out every $n$th coefficient of a polynomial.

## On contests
An AIME staple, with 17 problems tagged here and only 1 solved by the roots alone; the usual partner is De Moivre's Theorem (6 problems), which locates the roots in the first place. The recurring uses are evaluating a polynomial at every root and multiplying the values, symmetric sums over the vertices of a regular polygon, and periodicity arguments. Seeing the regular $n$-gon as the $n$th roots converts polygon geometry into algebra.
`,

"roots-of-unity-filter": String.raw`
## When to use
Sums of every second, third, or fourth binomial coefficient, such as $\binom{n}{0} + \binom{n}{3} + \binom{n}{6} + \cdots$; counts of subsets, strings, or dice rolls whose total lies in one residue class; and any coefficient sum $a_r + a_{r+n} + a_{r+2n} + \cdots$ of a generating function that is easy to evaluate at complex numbers. The filter for $n = 2$ needs only $f(1)$ and $f(-1)$ and works with no complex numbers at all.

## How
1. Express the count as coefficients: subsets by size come from $(1 + x)^m$, and subsets of $\{1, \ldots, m\}$ by sum from $\prod_k(1 + x^k)$.
2. To keep the indices divisible by $n$, average $f$ over the $n$th roots of unity: $\frac{f(1) + f(\omega) + \cdots + f(\omega^{n-1})}{n}$.
3. To keep the indices congruent to $r$, multiply each value by $\omega^{-jr}$ before averaging.
4. Evaluate each $f(\omega^j)$, using $1 + \omega + \cdots + \omega^{n-1} = 0$ and polar form.

Find $\binom{10}{0} + \binom{10}{3} + \binom{10}{6} + \binom{10}{9}$. With $f(x) = (1 + x)^{10}$ and $\omega = e^{2\pi i/3}$, the sum is $\frac{f(1) + f(\omega) + f(\omega^2)}{3}$. Since $1 + \omega = e^{i\pi/3}$ and $1 + \omega^2 = e^{-i\pi/3}$, the last two values add to $2\cos\frac{10\pi}{3} = -1$. So the sum is $\frac{1024 - 1}{3} = 341$.

{{figure:average}}

## Why it works
For $\omega = e^{2\pi i/n}$, the powers $1, \omega^k, \omega^{2k}, \ldots, \omega^{(n-1)k}$ form a geometric series with ratio $\omega^k$. If $n$ divides $k$, every term is $1$ and the average is $1$. Otherwise the ratio is not $1$, the sum is $\frac{1 - \omega^{nk}}{1 - \omega^k} = 0$, and the average is $0$; geometrically, the points are spread evenly around the circle and balance at the center, as the figure shows for $n = 3$.

Averaging $f(x) = \sum_k a_kx^k$ over the roots and exchanging the two sums gives $$\frac1n\sum_{j=0}^{n-1} f(\omega^j) = \sum_k a_k \cdot \frac1n\sum_{j=0}^{n-1}\omega^{jk},$$ and the inner average is $1$ or $0$ by the fact above, so exactly the coefficients with $n \mid k$ survive. The factor $\omega^{-jr}$ shifts every exponent down by $r$, which moves the class $r$ into the class $0$.

## Formulas it uses
- [[roots-of-unity]]: the $n$ roots $\omega^j$ and the identity $1 + \omega + \cdots + \omega^{n-1} = 0$ behind the filter.
- [[geometric-series]]: sums the powers $\omega^{jk}$ to $0$ when $n \nmid k$.
- [[binomial-theorem]]: $(1 + x)^m = \sum\binom mk x^k$, the generating function for binomial filters.
- [[eulers-formula]]: writes $1 + \omega^j$ in polar form so that its $m$th power is easy.

## Common traps
- Forgetting to divide by $n$ at the end.
- Using $\omega^{jr}$ instead of $\omega^{-jr}$ to select the class $r$; for real answers the error can hide, but for a generic class it gives the class $-r$.
- Counting the empty set, or the zero coefficient, when the problem excludes it.
- Expanding $(1 + \omega)^m$ by the Binomial Theorem instead of writing $1 + \omega = e^{i\pi/3}$.

## Contest profile
Rare but decisive: one AIME or AMC 12 problem in a while counts subsets or binomial coefficients by residue, and the filter turns it into three evaluations.
`,

"roots-unity-distance-product": String.raw`
## Why it works
Dividing $x^n - 1$ by $x - 1$ leaves a polynomial whose roots are exactly the other $n - 1$ roots of unity, so it factors over them: $$\frac{x^n - 1}{x - 1} = 1 + x + \cdots + x^{n-1} = (x - \omega)(x - \omega^2)\cdots(x - \omega^{n-1}).$$

At $x = 1$ the middle expression is a sum of $n$ ones, so $(1 - \omega)(1 - \omega^2)\cdots(1 - \omega^{n-1}) = n$. The division happens before the substitution, so no limit is needed, and taking absolute values turns each factor into a distance.

Each factor is a chord of the unit circle. The points $1$ and $\omega^k$ are separated by the central angle $\frac{2k\pi}{n}$, and the radius bisecting that angle cuts the chord into two halves of length $\sin\frac{k\pi}{n}$, so $$|1 - \omega^k| = 2\sin\frac{k\pi}{n}.$$

{{figure:chord}}

Multiplying the $n - 1$ chords gives $2^{n-1}\sin\frac{\pi}{n}\sin\frac{2\pi}{n}\cdots\sin\frac{(n-1)\pi}{n} = n$, which is the sine product.

## How to use it
Scale to the unit circle first. On a circle of radius $R$ every chord is $R$ times as long, so the product of the distances from one vertex of a regular $n$-gon to the other $n - 1$ vertices is $nR^{n-1}$, as in the example.

For products of sines at equally spaced angles, pair $\sin\frac{k\pi}{n}$ with $\sin\frac{(n-k)\pi}{n}$, which is equal to it, and take a square root. With $n = 9$ every factor appears twice, so $$\sin 20^\circ \sin 40^\circ \sin 60^\circ \sin 80^\circ = \sqrt{\frac{9}{2^8}} = \frac{3}{16}.$$

When the point is on the circle but not at a vertex, the product depends on where it is, which is [[ngon-vertex-distance-product|the product from a general point]]; other spacings of sines and cosines are on [[evenly-spaced-angle-products|evenly spaced angle products]].

## On contests
Three problems here, all AIME, none solved by it alone. The factors $1 - \omega^k$ come from a polynomial whose roots are roots of unity, or appear as chord lengths in a regular polygon, and the product is finished with [[de-moivre|De Moivre's Theorem]] or a [[double-angle|double-angle]] identity that simplifies what it leaves.
`,

"pythagorean-identities": String.raw`
## Why it works
The point at angle $\theta$ on the unit circle is $(\cos\theta, \sin\theta)$, and its distance from the center is $1$, so the Pythagorean Theorem gives $\cos^2\theta + \sin^2\theta = 1$.

Dividing that equation by $\cos^2\theta$, where it is not zero, gives $1 + \tan^2\theta = \sec^2\theta$; dividing by $\sin^2\theta$ gives $\cot^2\theta + 1 = \csc^2\theta$. The second identity can also be seen directly: extending the radius to the tangent line $x = 1$ makes a right triangle with legs $1$ and $\tan\theta$ and hypotenuse $\sec\theta$.

{{figure:unit-circle}}

## How to use it
Given one value, get the others, choosing signs by the quadrant: if $\sin\theta = \frac35$ and $\theta$ is acute, then $\cos\theta = \sqrt{1 - \frac{9}{25}} = \frac45$ and $\tan\theta = \frac34$. To solve an equation with several functions, replace them all by one: $2\sin^2\theta = 3\cos\theta$ becomes $2 - 2\cos^2\theta = 3\cos\theta$, a quadratic in $\cos\theta$.

The squaring trick is a favorite. If $\sin\theta + \cos\theta = k$, squaring gives $1 + 2\sin\theta\cos\theta = k^2$, so $\sin\theta\cos\theta = \frac{k^2 - 1}{2}$. From the sum and product, expressions such as $\sin^3\theta + \cos^3\theta$ follow by factoring.

## On contests
Six problems here, five of them AIME, one solved by it alone; two combine it with [[log-rules|logarithm rules]], in problems that give logarithms of $\sin x$ and $\cos x$. The sum-and-product squaring trick is a permanent AMC favorite.
`,

"common-angle-values": String.raw`
## Why it works
The values come from the two [[special-right-triangles|special right triangles]], read as opposite over hypotenuse and adjacent over hypotenuse. The $45$-$45$-$90$ triangle with legs $1$ has hypotenuse $\sqrt2$, so $\sin 45^\circ = \cos 45^\circ = \frac{\sqrt2}{2}$. Half an equilateral triangle of side $2$ has sides $1$, $\sqrt3$, and $2$, which gives $\sin 30^\circ = \cos 60^\circ = \frac12$ and $\sin 60^\circ = \cos 30^\circ = \frac{\sqrt3}{2}$.

The table is easy to rebuild: the sines of $0^\circ$, $30^\circ$, $45^\circ$, $60^\circ$, and $90^\circ$ are $$\frac{\sqrt0}{2},\ \frac{\sqrt1}{2},\ \frac{\sqrt2}{2},\ \frac{\sqrt3}{2},\ \frac{\sqrt4}{2},$$ and the cosines are the same list backwards, since $\cos\theta = \sin(90^\circ - \theta)$.

On the unit circle the point at angle $\theta$ is $(\cos\theta, \sin\theta)$, so $0^\circ$ and $90^\circ$ are the points $(1, 0)$ and $(0, 1)$, and $\tan 90^\circ = \frac10$ is undefined.

## How to use it
For any angle, find its reference angle, the acute angle it makes with the $x$-axis, and attach the sign of its quadrant. The points at $\theta$, $180^\circ - \theta$, $180^\circ + \theta$, and $360^\circ - \theta$ are mirror images across the axes, so their coordinates differ only in sign.

{{figure:reference}}

So $\sin 150^\circ = \sin 30^\circ = \frac12$, $\cos 225^\circ = -\cos 45^\circ = -\frac{\sqrt2}{2}$, and $\tan 300^\circ = -\tan 60^\circ = -\sqrt3$. The signs follow the mnemonic ASTC: all three functions are positive in the first quadrant, sine in the second, tangent in the third, and cosine in the fourth.

In radians the angles are $\frac\pi6$, $\frac\pi4$, $\frac\pi3$, and $\frac\pi2$, the default at the AMC 12 and AIME. Other exact values come from these through the [[angle-addition|angle addition formulas]], such as $\sin 15^\circ = \sin(45^\circ - 30^\circ) = \frac{\sqrt6 - \sqrt2}{4}$.

## On contests
Two problems here, both AIME, one solved by it alone; the other works on the unit circle with [[de-moivre|De Moivre's Theorem]]. The AIME uses them to locate points on the unit circle and to solve $\sin\alpha = \sin\beta$ by reflecting across the vertical axis, and on the AMC they sit inside nearly every trigonometric computation.
`,

"reduction-identities": String.raw`## Why it works
Everything is a unit-circle reflection. Reflecting across $y = x$ swaps coordinates, giving the cofunction pair $\sin(90^\circ - \theta) = \cos\theta$. Reflecting across the $x$-axis negates $y$ (so $\sin$ is odd) and fixes $x$ (so $\cos$ is even). Reflecting across the $y$-axis is the supplement $180^\circ - \theta$: $y$ stays, $x$ flips, so $\sin$ is preserved and $\cos$ negates.

## How to use it
Use them to collapse awkward angles to first-quadrant values before applying other identities. The cofunction rule is why the $\sin$ and $\cos$ graphs are shifts of each other; the odd/even rules drop signs inside functions; and remembering $\tan$ has period $180^\circ$ (not $360^\circ$) avoids a common off-by-a-period slip.

## On contests
Routine simplification on AMC/AIME, and the key to telescoping or symmetric trig sums where you must see that terms like $\sin\theta$ and $\sin(180^\circ - \theta)$ are equal.`,

"angle-addition": String.raw`
## Why it works
Turning by angle $a$ and then by angle $b$ is the same as turning by $a + b$, and writing that out in coordinates is the formula.

With complex numbers the computation is one line. The point at angle $\theta$ on the unit circle is $\cos\theta + i\sin\theta$, and multiplying by it turns the plane by $\theta$, so $$\cos(a + b) + i\sin(a + b) = (\cos a + i\sin a)(\cos b + i\sin b).$$ Expanding the right side with $i^2 = -1$ gives $$(\cos a\cos b - \sin a\sin b) + i(\sin a\cos b + \cos a\sin b),$$ and matching real and imaginary parts gives both formulas at once.

Without complex numbers, draw it. Put a right triangle $OQP$ with hypotenuse $OP = 1$ and angle $b$ at $O$ so that its leg $OQ = \cos b$ lies along the line at angle $a$ above the axis. Then $P$ is at angle $a + b$, so its height is $\sin(a + b)$. That height splits at the level of $Q$: $Q$ is $\cos b$ along a line at angle $a$, so it is $\sin a\cos b$ high, and the leg $QP = \sin b$ is tilted at angle $a$ from vertical, so it climbs a further $\cos a\sin b$.

{{figure:stacked}}

The difference formulas follow by replacing $b$ with $-b$, using $\cos(-b) = \cos b$ and $\sin(-b) = -\sin b$. Dividing the sine formula by the cosine formula, then dividing the top and bottom by $\cos a\cos b$, gives the tangent formula.

## How to use it
Nearly everything else in trigonometry is downstream. Double angle is the case $a = b$, half angle is double angle read backwards, and shifts like $\sin(\theta + 90^\circ) = \cos\theta$ are the case $b = 90^\circ$. Used directly, the formulas give exact values at $15^\circ$, $75^\circ$, and $105^\circ$ as sums and differences of $30^\circ$, $45^\circ$, and $60^\circ$.

Read backwards, they collapse a combination of sine and cosine into one wave, which is [[harmonic-addition|harmonic addition]]; its maximum is $\sqrt{a^2 + b^2}$.

## On contests
An AIME and AMC 12 tool, with 16 problems tagged here and 2 that need nothing else. Its usual partners are [[trig-substitution|trigonometric substitution]] (3 problems), where a substitution turns an algebraic sum into an angle sum, and [[chord-length|chord lengths]] (2). The tangent form computes angle sums in geometry, such as the angle between two lines from their slopes, and it telescopes arctangent series.
`,

"harmonic-addition": String.raw`## Why it works
Expand the right-hand side by [[angle-addition|angle addition]]: $R\sin(\theta+\varphi) = (R\cos\varphi)\sin\theta + (R\sin\varphi)\cos\theta$. Matching coefficients forces $R\cos\varphi = a$ and $R\sin\varphi = b$, so $a^2+b^2 = R^2$ and $\tan\varphi = \frac{b}{a}$. The pair $(a,b)$ is just the point $(R,\varphi)$ in [[eulers-formula|polar form]], which is why the amplitude is a hypotenuse.

## How to use it
Read it as a range statement. Since $\sin$ covers $[-1,1]$, the expression covers $[-R,R]$, so the maximum is $\sqrt{a^2+b^2}$ and the minimum its negative, with no calculus and no critical points. "Max of $3\sin x + 4\cos x$" is $5$ on sight. It also solves equations of the form $a\sin\theta + b\cos\theta = c$, which has a solution exactly when $|c| \le \sqrt{a^2+b^2}$, and it is the reason a sum of two sinusoids of the same frequency is another sinusoid of that frequency. Use the cosine form $R\cos(\theta-\varphi)$ when the phase is more natural measured from the cosine.

## On contests
A high-frequency AMC 12 and AIME shape whenever a trigonometric expression must be bounded, and the usual disguise is a problem that never mentions trigonometry: maximizing $3x+4y$ on the circle $x^2+y^2=1$ is the same statement, with $\sqrt{a^2+b^2}$ playing the role [[cauchy-schwarz|Cauchy-Schwarz]] plays in the algebraic phrasing. Watch the quadrant — $\tan\varphi = \frac ba$ alone does not distinguish $\varphi$ from $\varphi + 180^\circ$, and the signs of $a$ and $b$ are what settle it.`,

"double-angle": String.raw`
## Why it works
Doubling an angle is adding it to itself, so each formula is an angle addition formula with the two angles equal.

Put $\alpha = \beta = \theta$ into $$\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$ and into its companions for cosine and tangent. Each one collapses: $$\sin 2\theta = 2\sin\theta\cos\theta, \qquad \cos 2\theta = \cos^2\theta - \sin^2\theta, \qquad \tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}.$$

The sine formula can also be seen directly. Take an isosceles triangle with two sides of length $1$ and the angle $2\theta$ between them, for $\theta$ below $90^\circ$. By [[trig-area|the sine area formula]] its area is $\frac12\sin 2\theta$.

The altitude from the apex cuts it into two right triangles, each with hypotenuse $1$ and angle $\theta$ at the apex, so each has legs $\cos\theta$ and $\sin\theta$. The triangle's base is then $2\sin\theta$ and its height $\cos\theta$, and its area is $\frac12 \cdot 2\sin\theta \cdot \cos\theta$. The two areas are equal, which is $\sin 2\theta = 2\sin\theta\cos\theta$.

{{figure:isosceles}}

The other two forms of $\cos 2\theta$ come from $\sin^2\theta + \cos^2\theta = 1$. Replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $2\cos^2\theta - 1$, and replacing $\cos^2\theta$ by $1 - \sin^2\theta$ gives $1 - 2\sin^2\theta$. Solving each of these for the square gives the power-reduction formulas.

Finally, dividing $\sin 2\theta$ and $\cos 2\theta$ by $\cos^2\theta + \sin^2\theta$, which equals $1$, and then dividing top and bottom by $\cos^2\theta$ writes both in $t = \tan\theta$: $\sin 2\theta = \frac{2t}{1 + t^2}$ and $\cos 2\theta = \frac{1 - t^2}{1 + t^2}$. This is the [[weierstrass-substitution|Weierstrass substitution]], which turns a trigonometric equation into a rational one in a single variable.

## How to use it
Choose the $\cos 2\theta$ form that removes what you do not want: $2\cos^2\theta - 1$ keeps cosines and $1 - 2\sin^2\theta$ keeps sines. From $\cos\theta = \frac35$, for instance, $$\cos 2\theta = 2 \cdot \frac{9}{25} - 1 = -\frac{7}{25}$$ without ever finding $\sin\theta$.

Read backwards, the formulas lower powers. Power reduction turns $\sin^2\theta$ and $\cos^2\theta$ into first powers of $\cos 2\theta$, the usual first step on a sum of squared sines or cosines, and $\sin\theta\cos\theta = \frac12\sin 2\theta$ turns a product into a single sine, which is how it appears inside area formulas.

Halving works the same way in reverse: $\cos\theta = 2\cos^2\frac\theta2 - 1$ gives $\cos\frac\theta2$ from $\cos\theta$ up to sign, which is how chains of half angles are unwound.

## On contests
Eleven problems here, ten of them AIME, and one solved by it alone. It usually converts an angle the figure gives into the doubled or halved angle another formula needs, next to the [[law-of-cosines|Law of Cosines]], a [[chord-length|chord length]], or an [[inradius-area|inradius]] computation. Watch for an angle bisector or an inscribed angle, both of which put an angle and its double in the same figure. Power reduction appears in AIME sums of squared trigonometric values.
`,

"half-angle": String.raw`
## Why it works
They are the double angle formulas with $\theta$ in place of $2\theta$, solved for the half angle.

From $\cos\theta = 1 - 2\sin^2\frac\theta2$ and $\cos\theta = 2\cos^2\frac\theta2 - 1$, solving for the squares gives the first two formulas. For the tangent, divide $\sin\theta = 2\sin\frac\theta2\cos\frac\theta2$ by $1 + \cos\theta = 2\cos^2\frac\theta2$: $$\frac{\sin\theta}{1 + \cos\theta} = \frac{2\sin\frac\theta2\cos\frac\theta2}{2\cos^2\frac\theta2} = \tan\frac\theta2.$$

The tangent form also has a picture. On the unit circle, the angle at $(-1, 0)$ that looks at the arc from $(1, 0)$ to $(\cos\theta, \sin\theta)$ is $\frac\theta2$, by the [[inscribed-angle-theorem|Inscribed Angle Theorem]], and the line from $(-1, 0)$ to that point has slope $\frac{\sin\theta}{1 + \cos\theta}$.

{{figure:inscribed}}

## How to use it
Repeated halving gives exact values: $$\cos 22.5^\circ = \sqrt{\frac{1 + \cos 45^\circ}{2}} = \frac{\sqrt{2 + \sqrt2}}{2}.$$ Read backwards, a nested radical like $\sqrt{2 + \sqrt2}$ is $2\cos 22.5^\circ$, which is the idea behind [[trig-substitution|trigonometric substitution]]. Choose the sign of each square root by the quadrant of $\frac\theta2$.

In triangle problems prefer the radical-free tangent forms. The incircle gives $\tan\frac A2 = \frac{r}{s - a}$, because the incenter, the vertex $A$ and the point where the incircle touches $AB$ form a right triangle with legs $r$ and $s - a$; [[half-angle-tangent-identity|the half-angle tangent identity]] develops this.

## On contests
Five problems here, split between AMC and AIME, none by it alone; two use [[tangent-facts|tangent lengths]] with the incircle form above, and two follow the [[law-of-cosines|Law of Cosines]], which produces $\cos\theta$ when the problem needs the half angle.
`,

"product-sum": String.raw`
## Why it works
Adding or subtracting two angle addition formulas cancels half the terms, and what is left is a product on one side and a sum on the other.

For example, $\cos(a - b) = \cos a\cos b + \sin a\sin b$ and $\cos(a + b) = \cos a\cos b - \sin a\sin b$. Subtracting the second from the first leaves $$\cos(a - b) - \cos(a + b) = 2\sin a\sin b,$$ and adding them gives $2\cos a\cos b$. The sine formulas pair up the same way.

Setting $x = a + b$ and $y = a - b$, so that $a = \frac{x + y}{2}$ and $b = \frac{x - y}{2}$, turns each product-to-sum formula into a sum-to-product one. The sum-to-product formulas also have a picture: the midpoint of the chord between two points of the unit circle has coordinates that are the averages of theirs.

{{figure:midpoint}}

## How to use it
Turn products into sums to make a series telescope. Multiplying $\sin\theta + \sin 2\theta + \cdots + \sin n\theta$ by $2\sin\frac\theta2$ turns each term into a difference of two cosines, and the sum collapses to two terms; that is the derivation of [[sin-cos-ap-sum|the sum of sines in arithmetic progression]].

Turn sums into products to solve equations: $\sin x + \sin 3x = 0$ becomes $2\sin 2x\cos x = 0$, which splits into $\sin 2x = 0$ or $\cos x = 0$. A single product can also be evaluated directly: $$\sin 75^\circ \sin 15^\circ = \frac12(\cos 60^\circ - \cos 90^\circ) = \frac14.$$

## On contests
Six problems here, all AIME, none by it alone: two feed a [[telescoping|telescoping sum]] such as $\sum \sin k^\circ$, and two simplify a [[law-of-cosines|Law of Cosines]] computation involving several angles. When an equation mixes sines or cosines of different multiples of $\theta$, sum-to-product is the standard first step.
`,

"special-trig-values": String.raw`## Why it works
$\sin 15^\circ$: angle subtraction $45^\circ - 30^\circ$. The $18^\circ/36^\circ$ family: the isosceles 36-72-72 triangle's self-similarity yields the golden ratio, or solve $\sin 2\theta = \cos 3\theta$ at $\theta = 18^\circ$ as a cubic.

## How to use it
Recognize the family resemblances: anything with $\sqrt6 \pm \sqrt2$ is the $15^\circ/75^\circ$ family; anything with $\sqrt5$ is the $18^\circ/36^\circ$ (pentagon) family. Derive on demand from the two generator methods rather than memorizing all eight values.

## On contests
Pentagon problems and $15^\circ$ configurations (square + equilateral triangle) reduce to these. AIME expects the derivation skill: "compute $\cos 36^\circ - \cos 72^\circ$" ($ = \frac{1}{2}$, via golden-ratio algebra).`,

"triple-angle": String.raw`## Why it works
Compose double and single angle additions, or take real/imaginary parts of $(\cos\theta + i\sin\theta)^3$ (De Moivre).

## How to use it
$\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ turns cubics with three real roots into trig equations (the "casus irreducibilis" — cubics like $4x^3 - 3x = c$ are solved by $x = \cos\frac{\arccos c}{3}$). The $\sin 3\theta$ product identity $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \frac{\sin 3\theta}{4}$ collapses symmetric products.

## On contests
Cubic-to-trig conversion appears in hard AMC 12/AIME algebra ($x^3 - 3x = 1$-type). The product identity computes $\sin 20^\circ \sin 40^\circ \sin 80^\circ = \frac{\sqrt3}{8}$ in one line.`,

"trig-telescoping-product": String.raw`## Why it works
$\sin 2x = 2\sin x\cos x$ rearranges to $\cos x = \frac{\sin 2x}{2\sin x}$; multiply this over the doubling chain $\theta, 2\theta, \dots, 2^{n-1}\theta$ and the sine ratios telescope.

## How to use it
Trigger: a product of cosines whose angles double each time (or can be reordered to double). Multiply and divide by $\sin$ of the smallest angle. Works with complements too: $\cos 20^\circ\cos 40^\circ\cos 80^\circ$ uses $\sin 160^\circ = \sin 20^\circ$ for the clean $\frac{1}{8}$.

## On contests
A named AIME/AMC 12 pattern; also handles products like $\prod \cos\frac{\pi}{2^k}$ and, with the substitution $x = \cos\theta$, the iterated map $x \mapsto 2x^2 - 1$.`,

"arctan-telescoping": String.raw`## Why it works
The tangent subtraction formula $\tan(A - B) = \frac{\tan A - \tan B}{1 + \tan A\tan B}$, read as a statement about arctangents (with care about branch: valid when the relevant angles stay in $(-\frac{\pi}{2}, \frac{\pi}{2})$).

## How to use it
To telescope $\sum \arctan t_n$, hunt for $a_n, b_n$ with $t_n = \frac{a_n - b_n}{1 + a_nb_n}$ — usually $a_n = n+1$, $b_n = n$ (denominator $n^2 + n + 1$) or similar consecutive pairs. Also computes specific angle sums: $\arctan 1 + \arctan 2 + \arctan 3 = \pi$ (a classic, provable by two applications).

## On contests
AIME arctangent sums are built for this; the $\arctan\frac{1}{n^2+n+1}$ family is the canonical instance. In geometry, sums of angles in rectangular grids ($\arctan$ of slopes) fall to the same formula.`,

"sin-cos-ap-sum": String.raw`## Why it works
Multiply the sum by $2\sin\frac{d}{2}$: each product-to-sum expansion telescopes, leaving only boundary terms — which reassemble into the closed form ("Dirichlet kernel" argument). Alternatively: imaginary part of the [[geometric-series|geometric series]] $\sum e^{i(a + kd)}$.

## How to use it
Both routes are worth knowing: the $2\sin\frac{d}{2}$ multiplication is self-contained; the complex geometric series is faster if you're fluent. Special case to remember: $\sum_{k=1}^{n-1}\sin\frac{k\pi}{n} = \cot\frac{\pi}{2n}$; and sums of cosines of equally spaced angles around a full circle vanish.

## On contests
AIME sums like $\sum_{k=1}^{35}\sin 5k^\circ$ (a known AIME problem) are direct applications. The vanishing-over-full-circle fact also short-circuits many symmetric configurations.`,

"floor-basics": String.raw`
## Why it works
Every real number sits in exactly one gap between consecutive integers, and the floor records which gap it is in.

For any real $x$ there is exactly one integer $n$ with $$n \le x \lt n + 1,$$ because the intervals $[n, n + 1)$ cover the number line without overlapping. That $n$ is $\lfloor x \rfloor$, and then $\{x\} = x - n$ is at least $0$ and less than $1$. The figure at the top shows the two pieces: the floor jumps up by $1$ at each integer, while the fractional part climbs from $0$ and resets there.

The identities follow from this one fact. Adding an integer $n$ to $x$ moves it into the gap $n$ places along, so $$\lfloor x + n \rfloor = \lfloor x \rfloor + n.$$ If $x$ is not an integer, it lies strictly inside a gap, $m \lt x \lt m + 1$, so $-m - 1 \lt -x \lt -m$ and $\lfloor -x \rfloor = -m - 1$; the two floors add to $-1$. If $x$ is an integer, both floors are exact and add to $0$.

Counting multiples is the same idea. The multiples of $d$ up to $n$ are $d, 2d, \ldots, kd$, where $k$ is the largest integer with $kd \le n$, that is, the largest integer at most $\frac nd$, which is $\left\lfloor \frac nd \right\rfloor$.

## Full proof
The nested-division rule $$\left\lfloor \frac{x}{ab} \right\rfloor = \left\lfloor \frac{\lfloor x/a \rfloor}{b} \right\rfloor$$ holds for every real $x$ and all positive integers $a$ and $b$.

Let $q = \lfloor x/a \rfloor$, so that $qa \le x \lt (q + 1)a$, and let $Q = \lfloor q/b \rfloor$, so that $Qb \le q \le Qb + b - 1$, the upper bound holding because $q$ is an integer. Then $x \ge qa \ge Qab$, and $x \lt (q + 1)a \le (Qb + b)a = (Q + 1)ab$. So $Qab \le x \lt (Q + 1)ab$, which says exactly that $\left\lfloor \frac{x}{ab} \right\rfloor = Q$.

## How to use it
To solve an equation with a floor in it, write $$x = n + f, \qquad n = \lfloor x \rfloor, \quad 0 \le f \lt 1,$$ with $n$ an integer. That converts one equation in a real unknown into an equation about an integer plus an inequality, and the inequality is what makes the search finite: a floor equation over the reals has no method until it becomes a small number of integer cases.

For $\lfloor x \rfloor = \frac x2 + 1$, substituting gives $f = n - 2$, and $0 \le f \lt 1$ forces $n = 2$, so $x = 2$ is the only solution.

Integers pull straight out of floors, and the number of integers in an interval $[a, b]$ is $$\lfloor b \rfloor - \lceil a \rceil + 1.$$ When a floor sits inside a sum, split the range into the stretches where the floor is constant; on each stretch it is a single integer, and the sum becomes a short list of products.

## On contests
Floor equations and floor-counting problems permeate AMC and AIME, and the card stands alone in 6 of its 31 problems. When it does not, the partner is [[casework-method|casework]] (4 problems) — which is the method, not a coincidence: the band substitution produces the cases and casework closes them.

Two facts pay for themselves. Counting multiples of $d$ up to $n$ is $\lfloor n/d \rfloor$, which turns most floor-counting into divisor arithmetic. And nested division collapses: $$\lfloor \frac{n}{ab}\rfloor = \lfloor\frac{\lfloor n/a\rfloor}{b}\rfloor,$$ so repeated halving or repeated division never needs to be unwound.
`,

"hermite-identity": String.raw`## Why it works
As $x$ increases by $\frac{1}{n}$ steps, exactly one of the shifted floors $\lfloor x + \frac{k}{n}\rfloor$ ticks up at each step — the left side $\lfloor nx\rfloor$ ticks at the same moments. Both sides are step functions with identical jumps and equal value at $x = 0$.

## How to use it
Splits $\lfloor nx \rfloor$ into pieces when summing floors of arithmetic sequences, and collapses sums like $\sum_{k=0}^{n-1}\lfloor x + \frac{k}{n}\rfloor$ on sight. Companion identity for counting: $\lfloor x\rfloor + \lfloor -x\rfloor$ is $0$ or $-1$ — useful for symmetric summations.

## On contests
AIME floor-sum problems ($\sum_k \lfloor \frac{2^k \cdot a}{b}\rfloor$-type) and Putnam-lite identities. Recognizing that a messy floor sum is Hermite-in-reverse is usually the entire problem.`,

"denesting-radicals": String.raw`
## When to use
Answers such as $\sqrt{7 - 4\sqrt3}$ or $\sqrt{11 + 6\sqrt2}$ that must be written as $p + q\sqrt r$, expressions like $\sqrt{2 + \sqrt3}$ that come from half-angle formulas, and equations whose solutions arrive as nested radicals.

## How
1. Write the radical as $\sqrt{a \pm 2\sqrt c}$, moving a factor $2$ inside the inner root if needed.
2. Find $x$ and $y$ with $x + y = a$ and $xy = c$: they are the roots of $t^2 - at + c = 0$.
3. If they are rational, which happens exactly when $a^2 - 4c$ is a perfect square, then $\sqrt{a + 2\sqrt c} = \sqrt x + \sqrt y$, and $\sqrt{a - 2\sqrt c} = \sqrt x - \sqrt y$ with $x > y$.
4. If not, the radical does not denest into such a sum.

$\sqrt{7 - 4\sqrt3} = \sqrt{7 - 2\sqrt{12}}$: the numbers with sum $7$ and product $12$ are $4$ and $3$, so it equals $\sqrt4 - \sqrt3 = 2 - \sqrt3$. Squaring checks it: $(2 - \sqrt3)^2 = 7 - 4\sqrt3$.

## Why it works
Squaring a sum of two roots gives $(\sqrt x + \sqrt y)^2 = x + y + 2\sqrt{xy}$, so $\sqrt{a + 2\sqrt c} = \sqrt x + \sqrt y$ exactly when $x + y = a$ and $xy = c$, matching the rational part and the root part. Numbers with a given sum and product are the roots of a quadratic, and they are rational when its discriminant $a^2 - 4c$ is a perfect square.

The figure shows the identity as a square of side $\sqrt x + \sqrt y$ cut into pieces of area $x$, $y$ and two of area $\sqrt{xy}$.

Radicals that do not denest this way can sometimes be written with cosines: $\sqrt{2 + \sqrt3} = 2\cos 15^\circ$, which also equals $\frac{\sqrt6 + \sqrt2}{2}$.

## Formulas it uses
- [[square-of-sum]]: $(\sqrt x + \sqrt y)^2 = x + y + 2\sqrt{xy}$, the identity run backward.
- [[vietas-quadratic]]: $x$ and $y$ are the roots of $t^2 - at + c = 0$, found from their sum and product.
- [[half-angle]]: $\cos\frac\theta2 = \sqrt{\frac{1 + \cos\theta}{2}}$, which produces nested radicals such as $\sqrt{2 + \sqrt3} = 2\cos 15^\circ$ that the method then simplifies.

## Common traps
- Forgetting to rewrite $\sqrt b$ as $2\sqrt c$ before matching, and solving with the wrong product.
- Writing $\sqrt y - \sqrt x$ with $y < x$, which is negative and cannot equal a square root.
- Claiming a denesting when $a^2 - 4c$ is not a perfect square.

## Contest profile
Usually the last simplification of an answer that must be written in the form $p + q\sqrt r$.
`,

"infinite-nest": String.raw`
## Distinguishing clues
The dots sit inside the expression, at the end of a radical, a fraction, or an exponent, rather than at the end of a sum or a list. An infinite sum $1 + \frac12 + \frac14 + \cdots$ is a series, while $\sqrt{2 + \sqrt{2 + \cdots}}$ repeats the same operation on itself. A finite nest with a stated number of layers is a recursion; it belongs here only when a pattern in the number of layers is wanted.

## Methods and Formulas to Try
The defining feature is that removing one layer leaves the same expression. Naming the value turns that into an equation, usually a quadratic, and the choice of root is decided by a bound such as positivity. Finite nests of radicals often have exact values from trigonometry instead.

{{figure:cobweb}}

### Methods to try
- [[name-the-whole-expression]]: call the infinite expression $x$, write $x$ in terms of itself using one layer, and solve.
- [[trig-substitution]]: a nest such as $\sqrt{2 + \sqrt{2 + \cdots + \sqrt 2}}$ with $n$ layers equals $2\cos\frac{\pi}{2^{n+1}}$, since each layer halves an angle.

### Formulas to try
- [[quadratic-formula]]: the equation from one layer is usually a quadratic, with one root to reject.
- [[ramanujan-nested-radical]]: nests whose layers change from step to step, such as $\sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + \cdots}}} = 3$, which self-similarity alone cannot handle.
- [[half-angle]]: $\sqrt{2 + 2\cos\theta} = 2\cos\frac\theta2$, the identity that evaluates finite radical nests.

## Common traps
- Keeping both roots of the quadratic, when the value is positive or larger than the first term.
- Solving a power tower $x^{x^{\cdots}} = a$ without checking convergence: the tower converges only for $e^{-e} \le x \le e^{1/e}$, so $\sqrt2^{\sqrt2^{\cdots}}$ equals $2$, never $4$.
- Assuming that a nest whose layers change, such as $\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}}$, is self-similar.

## Contest profile
A quick AMC question in its plain form and an AIME ingredient when the nest is combined with a continued fraction or a convergence argument.
`,

"rationalizing": String.raw`
## When to use
Simplifying $\frac{1}{\sqrt5 - 2}$, summing $\frac{1}{\sqrt1 + \sqrt2} + \frac{1}{\sqrt2 + \sqrt3} + \cdots$, comparing $\sqrt{n + 1} - \sqrt n$ with $\frac{1}{2\sqrt n}$, and finding the integer part or the last digits of a power like $(2 + \sqrt3)^{10}$.

## How
1. Find the conjugate by changing the sign between the two terms: $\sqrt a + \sqrt b$ becomes $\sqrt a - \sqrt b$.
2. Multiply the top and bottom by the conjugate; the denominator becomes $a - b$.
3. For a sum, check whether the rewritten terms telescope.
4. For a power, add the conjugate power: $(a + \sqrt b)^n + (a - \sqrt b)^n$ is an integer, and when $|a - \sqrt b| < 1$ the conjugate power is tiny.

$\frac{1}{\sqrt1 + \sqrt2} + \frac{1}{\sqrt2 + \sqrt3} + \cdots + \frac{1}{\sqrt{99} + \sqrt{100}}$: each term rationalizes to $\sqrt{k + 1} - \sqrt k$, so the sum telescopes to $\sqrt{100} - \sqrt1 = 9$.

## Why it works
A sum and difference of the same two square roots multiply to a difference of squares, $(\sqrt a + \sqrt b)(\sqrt a - \sqrt b) = a - b$, which has no roots left. Multiplying the top and bottom of a fraction by the conjugate changes its form, not its value, and leaves a rational denominator.

For powers, expanding $(a + \sqrt b)^n$ and $(a - \sqrt b)^n$ with the Binomial Theorem gives the same terms, except that those with an odd power of $\sqrt b$ have opposite signs, so they cancel in the sum and only integers remain.

## Formulas it uses
- [[difference-of-squares]]: $(\sqrt a + \sqrt b)(\sqrt a - \sqrt b) = a - b$, the product that clears the roots.
- [[binomial-theorem]]: expands both powers, showing the odd powers of $\sqrt b$ cancel when the conjugates are added.
- [[conjugate-root-theorems]]: a polynomial with rational coefficients that has $a + \sqrt b$ as a root also has $a - \sqrt b$, the same pairing applied to equations.

## Common traps
- Using the square-root conjugate on cube roots, which need $a^2 \mp ab + b^2$ from the sum or difference of cubes.
- Multiplying only the denominator by the conjugate.
- Losing a sign when the conjugate has the larger term second.

## Contest profile
Usually a quick simplification inside a larger problem, or the step that makes a sum of radical fractions telescope.
`,

"fx-pairing": String.raw`
## When to use
Sums of a function at points placed symmetrically about a center: $f\!\left(\frac{k}{n}\right)$ for $k = 1, \ldots, n - 1$, $\sin^2$ or $\cos^2$ of evenly spaced angles, logarithms of numbers paired as $x$ and $\frac1x$, and repeating decimals paired with nines complements. Also equations with that symmetry, where $x = \text{center} + t$ makes it visible. The tell is a function that looks impossible to sum term by term, given on arguments that pair up.

## How
1. Find the center of the arguments: $\frac12$ for $\frac kn$, $45^\circ$ for $1^\circ$ to $89^\circ$.
2. Compute one general pair, $f(x) + f(1 - x)$, and simplify; for a product, compute $f(x)f(1 - x)$.
3. If the pair is constant, count the pairs. A term at the center pairs with itself and contributes half a pair.
4. If the pair is not constant, the symmetry may still halve the work, or another pairing may be the right one.

Compute $\sin^2 1^\circ + \sin^2 2^\circ + \cdots + \sin^2 89^\circ$. Pair $k^\circ$ with $(90 - k)^\circ$: since $\sin(90^\circ - k^\circ) = \cos k^\circ$, each pair adds to $\sin^2 k^\circ + \cos^2 k^\circ = 1$. There are $44$ pairs and the unpaired middle term $\sin^2 45^\circ = \frac12$, so the sum is $44.5$.

{{figure:symmetry}}

## Why it works
Writing the sum twice, once forward and once backward, lines up each term with its mirror image: $$2S = \sum_{k=1}^{n-1}\left(f\!\left(\frac kn\right) + f\!\left(\frac{n-k}{n}\right)\right).$$ If every bracket equals the same constant $c$, then $2S = (n - 1)c$. This is Gauss's argument for $1 + 2 + \cdots + 100$, with $f(x) = x$ and $c = 1$.

A constant pair sum means the graph of $f$ is symmetric about the point $\left(\frac12, \frac c2\right)$, as the figure shows: a point on the graph and its mirror image always average to the center. Functions built from exponentials often have this property by design, since $9^{1-x} = \frac{9}{9^x}$ turns the mirror term into a rearrangement of the original.

## Formulas it uses
- [[arithmetic-series]]: Gauss's pairing of first and last terms, the prototype of the method, gives $\frac{n(a_1 + a_n)}{2}$.
- [[exponent-laws]]: $c^{1-x} = \frac{c}{c^x}$, which makes exponential mirror terms simplify against each other.
- [[pythagorean-identities]]: $\sin^2\theta + \cos^2\theta = 1$, the constant pair sum for squared sines.
- [[reduction-identities]]: $\sin(90^\circ - \theta) = \cos\theta$, which turns the mirror term of a sine into a cosine.

## Common traps
- Miscounting the pairs when there is a middle term, or double-counting it.
- Pairing about the wrong center, for example pairing $k$ with $n - k$ when the sum runs from $0$ to $n$.
- Assuming the pair sum is constant without computing $f(x) + f(1 - x)$ in general.
- Missing a pairing that is multiplicative, such as $\tan k^\circ \tan(90 - k)^\circ = 1$, rather than additive.

## Contest profile
A short AMC and AIME move: the whole problem is spotting the symmetry, after which the answer is a count of pairs.
`,

"trig-substitution": String.raw`
## When to use
Radicals such as $\sqrt{1 - x^2}$ or $\sqrt{x^2 + 4}$, optimizing an expression like $x + \sqrt{1 - x^2}$, recursions such as $x_{n+1} = 2x_n^2 - 1$, and symmetric conditions such as $a + b + c = abc$ or $ab + bc + ca = 1$, which are identities for the tangents of angles that add to $\pi$ or to $\frac\pi2$.

## How
1. Match the shape: $a\sin\theta$, $a\tan\theta$ or $a\sec\theta$ for the three radicals, $\cos\theta$ for $2x^2 - 1$, and tangents of angles for $a + b + c = abc$.
2. Restrict the angle so the substitution covers every allowed value exactly once and the square root comes out with the right sign.
3. Simplify with identities and solve or optimize in the angle.
4. Convert back to the original variable.

Maximize $x + \sqrt{1 - x^2}$ for $-1 \le x \le 1$. With $x = \sin\theta$ and $-\frac\pi2 \le \theta \le \frac\pi2$, the root is $\cos\theta$, so the expression is $\sin\theta + \cos\theta = \sqrt2\sin\left(\theta + \frac\pi4\right)$, whose maximum $\sqrt2$ occurs at $\theta = \frac\pi4$, that is $x = \frac{\sqrt2}{2}$.

## Why it works
Each substitution matches a Pythagorean identity. With $x = a\sin\theta$, $$\sqrt{a^2 - x^2} = a\sqrt{1 - \sin^2\theta} = a\cos\theta,$$ which is right because $\cos\theta \ge 0$ for $-\frac\pi2 \le \theta \le \frac\pi2$. The figure shows the same fact as a right triangle with hypotenuse $a$ and one leg $x$.

Recursions close because identities double or add angles: $\cos 2\theta = 2\cos^2\theta - 1$ turns $x \mapsto 2x^2 - 1$ into $\theta \mapsto 2\theta$. And for angles with $A + B + C = \pi$, $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, which is the condition $a + b + c = abc$.

## Formulas it uses
- [[pythagorean-identities]]: $\sin^2\theta + \cos^2\theta = 1$ and $1 + \tan^2\theta = \sec^2\theta$, which clear the radicals.
- [[double-angle]]: $\cos 2\theta = 2\cos^2\theta - 1$, which turns the recursion $x \mapsto 2x^2 - 1$ into doubling an angle.
- [[harmonic-addition]]: $a\sin\theta + b\cos\theta = \sqrt{a^2 + b^2}\sin(\theta + \varphi)$, which finishes most optimizations after the substitution.
- [[triangle-angle-identities]]: for $A + B + C = \pi$, $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, the identity behind $a + b + c = abc$.

## Common traps
- Choosing an angle range where the root changes sign, so $\sqrt{a^2 - x^2}$ is taken as $-a\cos\theta$ by mistake.
- Substituting $x = a\sin\theta$ when $x$ can lie outside $[-a, a]$, where no angle works.
- Forgetting to convert the final angle back into the original variable.

## Contest profile
Usually the step that makes a radical or a recursion tractable, after which an angle addition identity finishes.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"functional-substitution": String.raw`
## When to use
Equations such as $f(x + y) = f(x) + f(y) + xy$, $f(x) + 2f(1 - x) = x^2$ or $f(xy) = f(x)f(y)$ that hold for all real or integer inputs. Contest problems usually ask for a single value, such as $f(2024)$, which a few substitutions produce without solving the equation completely.

## How
1. Try $x = y = 0$ to find $f(0)$, which often has only one or two possible values.
2. Set one variable to $0$, then try $y = x$ and $y = -x$, to learn about doubling and about whether $f$ is even or odd.
3. When the equation involves $f$ at two related points, such as $x$ and $1 - x$, substitute so the two swap, and solve the pair of equations as a linear system.
4. Guess the form the values suggest, often linear or quadratic, and prove it.
5. Check every candidate in the original equation.

If $f(x) + 2f(1 - x) = x^2$ for all $x$, replacing $x$ by $1 - x$ gives $f(1 - x) + 2f(x) = (1 - x)^2$. Doubling the second equation and subtracting the first leaves $3f(x) = 2(1 - x)^2 - x^2$, so $f(x) = \frac{x^2 - 4x + 2}{3}$, and substituting back confirms it.

## Why it works
An equation that holds for all inputs holds in particular for the inputs you choose, and each choice is a new equation about a few values of $f$. Inputs that make terms vanish or coincide shrink those equations until they pin values down, and a substitution that swaps two related points gives two equations in the same two unknowns, which can be solved like any linear system. Substitutions only produce necessary conditions, so the final check is what proves a candidate really works.

## Formulas it uses
- [[cauchy-functional-equations]]: the standard forms, such as $f(x + y) = f(x) + f(y)$ with solutions $f(x) = cx$ under mild conditions, which many equations reduce to.

## Common traps
- Deciding the whole function from its values at a few points.
- Skipping the final check, and keeping a candidate that fails the original equation.
- Assuming $f(x + y) = f(x) + f(y)$ forces $f(x) = cx$ over the reals without a condition such as continuity or monotonicity.

## Contest profile
Usually a few substitutions in an AMC or AIME problem that asks for one value; complete solutions of functional equations are olympiad work.
`

});

Object.assign(window.MATH_DETAILS, {

"descartes-rule-signs": String.raw`## Why it works
Each positive root forces at least one sign change (a polynomial with all-positive coefficients has none), and a careful induction on factoring out $(x - r)$ shows roots consume sign changes in pairs-preserving fashion — hence "equal or less by an even number."

## How to use it
Quick structural triage: count sign changes of $P(x)$ for positive roots, of $P(-x)$ for negative roots, and remember complex roots come in pairs to fill the gap. Zero sign changes = zero positive roots (a certainty, not a bound). Combine with the intermediate value theorem at a few points to pin the exact count.

## On contests
AMC 12 uses it to eliminate cases in "how many real solutions" problems; on AIME it prunes root-hunting before heavier tools. It never locates a root — pair it with rational root candidates or IVT for locations.`,

"finite-differences": String.raw`
## When to use
A sequence given by its first few terms that is known, or suspected, to be polynomial; a polynomial pinned down by values at consecutive integers, such as "$P$ has degree $4$ and $P(k) = 2^k$ for $k = 0, \ldots, 4$; find $P(5)$"; and counts or sums that grow with a parameter, where the table both detects the degree and extends the data. The inputs must be equally spaced.

## How
1. List the values at consecutive inputs in a row.
2. Below it write the differences of neighbors, and repeat until a row is constant.
3. The number of differencing steps is the degree, and the constant is $k!$ times the leading coefficient.
4. To extend the sequence, add one more copy of the constant to the bottom row and add back up the diagonal.
5. For a formula, read the left edge into Newton's form $a_n = \sum_j \binom nj\Delta^j a_0$.

Find $P(5)$ if $P$ has degree $4$ and $P(k) = 2^k$ for $k = 0, 1, 2, 3, 4$. The values $1, 2, 4, 8, 16$ have every row of differences equal to the same powers of $2$, so the left edge is $1, 1, 1, 1, 1$. Newton's form gives $P(5) = \binom50 + \binom51 + \binom52 + \binom53 + \binom54 = 32 - 1 = 31$: one less than $2^5$, because the polynomial stops at degree $4$.

{{figure:table}}

## Why it works
Each difference lowers the degree of a polynomial by exactly one. By the Binomial Theorem, $(n + 1)^k - n^k = kn^{k-1} + (\text{lower terms})$, so differencing a degree-$k$ polynomial leaves degree $k - 1$, with the leading coefficient multiplied by $k$. After $k$ rounds only the constant $k!\,a_k$ remains.

The converse runs the table backward. Each entry is the one to its left plus the one below that, so the whole table is fixed by its left edge, and the binomial coefficients satisfy the same rule by Pascal's Identity. That gives Newton's form, $a_n = \sum_j\binom nj\Delta^ja_0$. When a row of differences is constant, every later row is zero, so the sum stops and $a_n$ is a polynomial in $n$ of the degree read from the table.

## Formulas it uses
- [[binomial-theorem]]: expands $(n + 1)^k - n^k$, showing that each difference lowers the degree by one.
- [[pascals-identity]]: $\binom{n+1}{j} - \binom nj = \binom{n}{j-1}$, so the binomial coefficients are the natural basis for difference tables.
- [[power-sums]]: sums such as $\sum k^2$ are polynomials of one degree higher, which the table detects and extends.

## Common traps
- Using the table on unequally spaced inputs, such as $P(1)$, $P(2)$ and $P(4)$.
- Stopping one row too early, before the row is really constant.
- Forgetting that a non-polynomial sequence, such as $2^n$, never reaches a constant row; a polynomial that matches it agrees only at the given points.
- Adding up the wrong diagonal when extending, and mixing old entries with new ones.

## Contest profile
Usually a quick AMC or AIME computation: the table identifies the degree and supplies the next value without solving for any coefficients.
`,

"cauchy-functional-equations": String.raw`## Why it works
For additive $f$: build from $f(1)$ over integers, then rationals ($qf(p/q) = f(p)$); regularity (continuity/monotonicity/boundedness on an interval) forces the rational-linear behavior to extend to all reals. The other three templates reduce to the additive one via logarithms and exponentials (e.g. $g = \ln f$ turns multiplicative into additive).

## How to use it
Match the template, verify the regularity hypothesis the problem provides, write the general solution with one unknown constant, and pin the constant from a given value. Watch for domain subtleties: the multiplicative forms need positivity to take logs; check $f \equiv 0$ degenerate solutions separately.

## On contests
AMC/AIME functional equations are usually a Cauchy template in light disguise (shifted argument, extra constant). Recognize, normalize (e.g. set $g(x) = f(x) - f(0)$), classify, and evaluate — a three-minute routine once the four forms are memorized.`

});

Object.assign(window.MATH_DETAILS, {

"root-transformations": String.raw`
## When to use
Questions about numbers made from the roots of a known polynomial by one fixed rule: shifted roots $r - 2$, scaled roots $3r$, reciprocals $\frac1r$, squares $r^2$, or Möbius images such as $\frac{1 + r}{1 - r}$. The target is usually a sum, a product, or another symmetric function of the new numbers, which would take long symmetric-polynomial algebra in the old roots but is one coefficient of the new polynomial.

## How
1. Name the new number $y = g(r)$ and solve for $r$ in terms of $y$.
2. Substitute that expression for $x$ in $P(x) = 0$.
3. Clear denominators, so the result is a polynomial equation in $y$ of the same degree.
4. Read the requested symmetric function from its coefficients with Vieta's Formulas.

The common cases have short forms: roots $r + k$ come from $P(x - k)$, roots $kr$ from $P\!\left(\frac xk\right)$, roots $-r$ from $P(-x)$, and reciprocal roots from reversing the list of coefficients.

Let $r$, $s$, $t$ be the roots of $P(x) = x^3 - 3x + 1$, and find $\frac{1}{r - 2} + \frac{1}{s - 2} + \frac{1}{t - 2}$. The numbers $r - 2$ are the roots of $P(x + 2) = x^3 + 6x^2 + 9x + 3$. For a monic cubic $x^3 + ax^2 + bx + c$, the sum of the reciprocals of the roots is $\frac{e_2}{e_3} = -\frac{b}{c}$, so the answer is $-\frac93 = -3$.

{{figure:shift}}

## Why it works
If $r$ is a root of $P$ and $y = g(r)$, then $r = g^{-1}(y)$ and so $P(g^{-1}(y)) = 0$. Conversely, any $y$ with $P(g^{-1}(y)) = 0$ comes from a root of $P$. So the equation $P(g^{-1}(y)) = 0$ has exactly the transformed numbers as its roots, and when $g$ is a fraction of linear expressions, clearing denominators makes it a polynomial of the same degree. Substituting the inverse rule, not the rule itself, is the whole point: the figure shows that $P(x - 2)$, not $P(x + 2)$, moves every root two units to the right.

Reversing coefficients is the case $g(r) = \frac1r$: $x^nP\!\left(\frac1x\right)$ has coefficients $a_0, a_1, \ldots, a_n$ in the opposite order, and its roots are the reciprocals, provided $0$ was not a root. For squares there is no single inverse, so pair the two square roots: $P(\sqrt x)P(-\sqrt x)$ is a polynomial in $x$ whose roots are the $r_i^2$.

## Formulas it uses
- [[fundamental-theorem-algebra]]: $P(x) = a_n\prod(x - r_i)$, so substituting $g^{-1}(y)$ visibly produces a factor vanishing at each $g(r_i)$, and the root count is preserved.
- [[vietas-general]]: reads the sum, product, and other symmetric functions of the new roots off the new coefficients.

## Common traps
- Substituting the rule instead of its inverse, and moving the roots the wrong way.
- Forgetting that reversing coefficients fails when $0$ is a root, since the degree drops.
- Using $P(x^2)$ for squared roots: its roots are $\pm\sqrt{r_i}$, the opposite of what is wanted.
- Clearing denominators carelessly in a Möbius substitution, and losing the leading coefficient that Vieta's Formulas divide by.

## Contest profile
A supporting move in AIME root problems: transforming first turns a long symmetric computation into a single coefficient, and it pairs naturally with Vieta's Formulas.
`,

"periodic-sequences": String.raw`
## Distinguishing clues
The rule depends only on the last one, two, or three terms, has no constant growth, and the question asks for a term or a sum far down the sequence. Linear recursions with growth, such as Fibonacci, belong to closed forms and characteristic roots; this pattern is the case where the terms come back. The same recursion taken modulo $m$ is a cousin, [[periodicity-mod-m|periodicity modulo a number]], which is periodic for a different reason: it has only finitely many states.

## Methods and Formulas to Try
Computing a handful of terms exactly, as fractions, is almost always the first step, and the cycle often appears within ten terms. Some rules announce their period in advance: a fractional linear rule $\frac{ax + b}{cx + d}$ that acts like a rotation by a fraction of a turn, or a linear rule whose characteristic roots are roots of unity.

{{figure:cycle}}

### Methods to try
- [[cycle-hunting]]: compute terms until the state, the terms the rule needs, repeats; then reduce the index modulo the period.
- [[trig-substitution]]: writing $x_n = \tan\theta_n$ turns rules such as $\frac{1 + x}{1 - x}$ into adding a fixed angle, which shows the period at once.

### Formulas to try
- [[linear-recurrence]]: characteristic roots that are roots of unity, as for $a_{n+1} = a_n - a_{n-1}$ with roots $e^{\pm i\pi/3}$, give a periodic sequence.
- [[roots-of-unity]]: the order of the characteristic roots is the period of a linear rule.
- [[angle-addition]]: $\tan(\theta + 45^\circ) = \frac{1 + \tan\theta}{1 - \tan\theta}$, the identity behind the period-$4$ rule.

## Common traps
- Using decimals, which hide an exact return to the start.
- With a two-term rule, stopping when one value repeats instead of waiting for the pair to repeat.
- Misaligning the index: if the cycle starts at $a_1$, then $a_n = a_r$ with $r \equiv n \pmod p$ and $1 \le r \le p$.
- Missing a pre-period, a few terms before the cycle begins.

## Contest profile
Common in AMC and AIME: a recursion with a term numbered in the thousands is almost always periodic, and the work is computing six to ten terms carefully.
`,

"triangle-angle-identities": String.raw`## Why it works
All spring from $C = 180^\circ - A - B$: expand $\tan(A+B) = \tan(180^\circ - C) = -\tan C$ and clear denominators for the tangent identity; the cosine and sine sums follow from sum-to-product plus half-angle conversions, which is where $r$ and $R$ sneak in ($\cos$ sum) and $s$ ($\sin$ sum).

## How to use it
Two directions: (1) given trig data about a triangle's angles, convert to $r$, $R$, $s$ — the geometry; (2) given an equation like $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, recognize it as the definition of angles summing to $180^\circ$ (used both ways on contests). The cotangent identity $\sum \cot A \cot B = 1$ pairs with [[brocard-angle|the Brocard angle]] formula.

## On contests
AIME trig problems hand you one of these sums and expect the $1 + \frac{r}{R}$ or $\frac{s}{R}$ translation; AMC 12 uses the tangent identity to detect or exploit supplementary structure. Memorize the two headline identities, derive the rest from sum-to-product on demand.`,

"piecewise-graph-counting": String.raw`
## When to use
"How many real solutions" questions for equations built from absolute values, floors, maxima, or other piecewise pieces; questions such as "for which $c$ does $f(x) = c$ have exactly four solutions"; and counts of intersections between two piecewise graphs, such as two sawtooth curves. The sign is an equation that would split into many cases if solved algebraically.

## How
1. Build the graph of $f$, folding and shifting from the inside out, and list its corners with their heights.
2. Sort the corner heights. Between two consecutive heights, the line $y = c$ crosses the same pieces, so the count is constant.
3. Count crossings once in each band, and separately at each corner height, where the line can touch a corner instead of crossing.
4. For two graphs, count crossings piece by piece, comparing slopes and endpoints.

For which $c$ does $\bigl|\bigl||x| - 2\bigr| - 1\bigr| = c$ have exactly $8$ solutions? The graph has corners at heights $1$ (at $x = 0$ and $x = \pm 2$) and $0$ (at $x = \pm 1$ and $x = \pm 3$), and rises without bound past $\pm 3$. A line at height $c$ with $0 < c < 1$ crosses each of the eight slanted pieces once, while $c = 0$ gives $4$ solutions, $c = 1$ gives $5$, and $c > 1$ gives $2$. So exactly $0 < c < 1$.

{{figure:folds}}

## Why it works
Each solution of $f(x) = c$ is a point where the graph of $f$ is at height $c$, so solutions and crossings are the same thing. Between corners the graph is a straight piece, which a horizontal line meets at most once unless the piece is itself horizontal. As $c$ moves without passing a corner height, every crossing slides along its piece and none appear or disappear, so the count is constant on each band and can change only at a corner height.

## Formulas it uses
- [[absolute-value-rules]]: $|u| = c$ has two solutions for $c > 0$, one for $c = 0$, and none for $c < 0$, which is the counting fact behind every fold.

## Common traps
- Counting a touch at a corner as two crossings, or missing it entirely.
- Forgetting the unbounded end pieces, which contribute crossings for every large $c$.
- Building the graph in the wrong order, outside in, which gives the wrong corners.
- Ignoring horizontal pieces, where a line at that height has infinitely many solutions.

## Contest profile
An AIME favorite in its harder forms, nested bars or two sawtooth curves, and a common AMC question in simpler ones; graphing first almost always beats casework.
`,

"work-rates": String.raw`
## Why it works
When workers do not get in each other's way, the work they do in an hour adds up, and time is the reciprocal of rate.

A pipe that fills a pool in $4$ hours fills $\frac14$ of it each hour, and one that takes $6$ hours fills $\frac16$. Together they fill $\frac14 + \frac16 = \frac5{12}$ per hour, so the whole pool takes $\frac{12}{5}$ hours. Adding or averaging the times would be wrong, because time is not the quantity that adds.

{{figure:rates}}

For two workers, $\frac1a + \frac1b = \frac{a + b}{ab}$, so together they take $\frac{ab}{a + b}$ hours, which is half the [[mean-chain|harmonic mean]] of their two times.

## How to use it
Call the job $1$, convert every worker to a rate, add or subtract, and invert at the end. For a job done in stages, such as two workers together for a while and then one alone, track the fraction completed in each stage and set the fractions' total equal to $1$.

The harder versions leave the rates unknown and give combined times for pairs: A and B take $x$ hours, B and C take $y$, and so on. Each is a linear equation in the rates, so solve for the rates rather than for the times.

## On contests
Five problems here, four of them AIME, and four solved by it alone: once every worker is a rate, the problem is a small linear system. MATHCOUNTS and early AMC use the simple versions with pipes and painters.
`,

"average-speed": String.raw`
## Why it works
An average speed has to reproduce the whole trip: covering the total distance at that one speed must take the total time, which forces total distance over total time.

That weights each speed by the time spent at it. Over equal distances $d$ at speeds $v_1$ and $v_2$ the times are $\frac d{v_1}$ and $\frac d{v_2}$, so $$v_{\text{avg}} = \frac{2d}{\frac{d}{v_1} + \frac{d}{v_2}} = \frac{2v_1v_2}{v_1 + v_2}.$$ More time is spent at the slower speed, so it counts for more, and the result is below the arithmetic mean unless the two speeds are equal.

## How to use it
Never average the speeds directly. Pick a convenient distance, such as a common multiple of the speeds, find each leg's time, and divide total by total. For $30$ mph out and $60$ mph back over $60$ miles each way, the legs take $2$ hours and $1$ hour, so $$v_{\text{avg}} = \frac{60 + 60}{2 + 1} = 40 \text{ mph}.$$

The harmonic-mean shortcut applies only to equal distances. Equal times give the ordinary arithmetic mean instead, and anything else needs the full total over total.

## On contests
Three problems here, two AMC 12 and one AIME, two solved by it alone. On the AMC it is an answer-choice trap, with $45$ among the options whenever the answer is $40$. A common version misses a target time by the same margin at two speeds, late at one and early at the other, which makes the right speed their harmonic mean. For trips with several legs, see [[multi-leg-rates|multi-leg rates]].`,

"relative-motion": String.raw`
## Why it works
Only the distance between two movers decides when they meet, and that distance changes at the difference of their velocities.

On a line, put one object at $x_1 = a_1 + v_1t$ and the other at $x_2 = a_2 + v_2t$. The gap $x_2 - x_1 = (a_2 - a_1) + (v_2 - v_1)t$ changes at the constant rate $v_2 - v_1$.

Moving toward each other, the velocities have opposite signs and the gap shrinks at the sum of the speeds; moving the same way, it shrinks at their difference. Either way the time to meet is the starting gap divided by that rate, exactly as if one object stood still and the other moved at the combined speed.

{{figure:frames}}

A current or a moving walkway adds the same drift to everything in it. It changes speeds measured from the ground, but not the speeds of two objects in it relative to each other.

A circular track is the same idea with the gap wrapping around. Two runners starting together are at the same point again exactly when the distance between them, measured along the track, has changed by a whole number of laps.

Running the same way, that separation grows at $v_1 - v_2$, so the first meeting is when the faster has run exactly one lap more than the slower. Running opposite ways, it grows at $v_1 + v_2$, so they meet when their two distances add to one full lap. After that, meetings repeat at the same interval, and the $k$th meeting comes at $k$ times the first.

## How to use it
Chases: the time is the starting gap divided by the difference of speeds. Head-on meetings: the gap divided by the sum.

In a current of speed $c$, a boat with still-water speed $v$ goes $v - c$ upstream and $v + c$ downstream, so a round trip averages less than $v$, because the slow leg takes longer. With $v = 5$ and $c = 3$ km/h over $8$ km each way, the trip takes $$\frac{8}{5 - 3} + \frac{8}{5 + 3} = 4 + 1 = 5 \text{ hours},$$ so $16$ km in $5$ hours averages $3.2$ km/h rather than $5$.

Crossing a river, split the velocity into components. The across-stream component alone decides how long the crossing takes, and the along-stream component, the boat's own plus the current's, decides where it lands. To land straight across, aim upstream so the two along-stream parts cancel.

Clock hands are a circular track too. The minute hand gains $6 - \frac12 = 5.5$ degrees per minute on the hour hand, so they coincide every $\frac{360}{5.5} = \frac{720}{11}$ minutes.

## On contests
Ten problems here, and eight of them solved by it alone: once the right frame is chosen, there is usually nothing left to do. Track problems lean on the lap rule, since "two runners start together and next meet after $4$ minutes" fixes $v_1 - v_2$ or $v_1 + v_2$, which is usually the missing equation. Trains passing, clock hands, escalator walkers, and river crossings are the other regulars.
`,

"weighted-average": String.raw`
## Why it works
An average is a total divided by a count, and mixing two groups adds their totals and adds their counts.

A group of $w_1$ items averaging $x_1$ contains a total of $w_1x_1$: that many points, grams of acid, or miles. Pour in a second group of $w_2$ items with total $w_2x_2$. Nothing is lost, so the combined total is $w_1x_1 + w_2x_2$, spread over $w_1 + w_2$ items, and dividing gives the average: $$\bar x = \frac{w_1x_1 + w_2x_2}{w_1 + w_2}.$$ That is why averages of averages go wrong without the weights: class averages of $80$ and $90$ combine to $85$ only if the two classes are the same size.

Rearranging gives the seesaw rule. Clearing the denominator, $w_1\bar x + w_2\bar x = w_1x_1 + w_2x_2$, so $$w_1(\bar x - x_1) = w_2(x_2 - \bar x).$$ Picture the two values as weights on a seesaw balanced at $\bar x$: each weight times its distance from the balance point is the same on both sides. So the heavier group sits closer, and $\frac{w_1}{w_2} = \frac{x_2 - \bar x}{\bar x - x_1}$.

{{figure:seesaw}}

## How to use it
The seesaw form answers mixing-ratio questions in one line, without variables. For dilution and replacement problems, "remove a liter, add water, repeat", track the pure substance multiplicatively: each replacement multiplies the concentration by the same fraction, the share of the container that was kept. And whenever averages are combined, find the weights first; the class-average traps are exactly missing-weight errors.

## On contests
Unusually self-contained: 15 of the 20 problems tagged here need nothing else, most of them AMC. The shapes are mixtures of two concentrations, combined averages of groups, and average-score puzzles where one added score shifts the mean. A harder classic swaps equal volumes between two jars; after the swap, the amount of each liquid that has ended up in the other jar is always the same, an invariant worth knowing because it makes the question free.
`

});

Object.assign(window.MATH_DETAILS, {

"sos-identity": String.raw`## Why it works
Expand the right side: each $(x-y)^2$ contributes $x^2 + y^2 - 2xy$, and the halved total collects exactly $x^2+y^2+z^2 - xy-yz-zx$. Being a sum of real squares, it is nonnegative and vanishes only when all pairwise differences do.

## How to use it
Three standard deployments: (1) prove $\sum x^2 \ge \sum xy$ with equality analysis; (2) crack symmetric conditions — any equation reducible to $\sum(x-y)^2 = 0$ forces all variables equal; (3) factor analysis of $x^3+y^3+z^3-3xyz = (x+y+z)\cdot\frac{1}{2}\sum(x-y)^2$, which shows the second factor's sign is fixed.

## On contests
AMC/AIME symmetric systems constantly hide the "$= 0$ forces equal" step; inequality problems use it as the base case of [[sos-method|SOS]] (sum-of-squares) arguments. Worth recognizing in both directions — expanded and factored.`,

"useful-factorizations": String.raw`## Why it works
$a^4 + a^2b^2 + b^4$: add and subtract $a^2b^2$ to reach $(a^2+b^2)^2 - (ab)^2$, then difference of squares. The cube identity expands directly, or via symmetry: the left side vanishes when $a = -b$ (etc.), so $(a+b)(b+c)(c+a)$ divides it, and degree/leading-coefficient comparison fixes the factor 3.

## How to use it
$x^4 + x^2 + 1$ (and $x^8 + x^4 + 1$, iterated) show up in telescoping products and "factor this large number" problems — e.g. $n^4 + n^2 + 1 = (n^2+n+1)(n^2-n+1)$ with the bonus that $n^2 - n + 1 = (n-1)^2 + (n-1) + 1$, chaining consecutive values into telescoping fractions. The identity $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$ converts products of pairwise sums into elementary symmetric data (Vieta-ready).

## On contests
The telescoping product $\prod \frac{n^4 + n^2 + 1 \text{-type factors}}{\cdots}$ is a recurring AIME construction (same family as the Sophie Germain $324$ problem). The pairwise-sum identity resolves systems giving $a+b+c$, $ab+bc+ca$, $abc$ and asking for $(a+b)(b+c)(c+a)$ in one line.`,

"pairwise-sum-product": String.raw`## Why it works
Expand $(x+y)(y+z)(z+x)$: the degree-3 terms are all six $x^2y$-type monomials plus $2xyz$. Meanwhile $(x+y+z)(xy+yz+zx)$ produces those same six monomials but with $3xyz$. Subtract one $xyz$ and they agree, so $(x+y)(y+z)(z+x) = e_1 e_2 - e_3$ in the elementary symmetric polynomials $e_1, e_2, e_3$.

## How to use it
Whenever $x+y+z$, $xy+yz+zx$, $xyz$ are known — most often as $-\frac{b}{a}, \frac{c}{a}, -\frac{d}{a}$ from a cubic's coefficients via [[vietas-general|Vieta]] — any product of the pairwise sums is just $e_1 e_2 - e_3$, no expansion. Read backward, it simplifies a stubborn product of three binomials into symmetric-sum arithmetic. Companion: $(x+y+z)^3 - x^3 - y^3 - z^3 = 3(x+y)(y+z)(z+x)$.

## On contests
The signature AIME setup hands you the three symmetric sums (or a cubic whose roots are $x, y, z$) and asks for $(x+y)(y+z)(z+x)$ or an equivalent product — one substitution and you are done, no messy expansion under time pressure.`,

"antisymmetric-factorization": String.raw`## Why it works
Read the expression as a polynomial in $a$. Substituting $a = b$ makes it vanish, so $(a - b)$ divides it; by the cyclic symmetry $(b - c)$ and $(c - a)$ divide it too. Their product already has degree 3, so the degree-2 sum equals that product times a constant — one test point fixes the constant to $-1$. The degree-3 sum has one degree to spare, and symmetry forces the leftover factor to be $a + b + c$.

## How to use it
Any cyclic expression that dies when two variables coincide factors as $(a-b)(b-c)(c-a)$ times a symmetric polynomial of the leftover degree; write that skeleton, then pin the coefficient with an easy substitution. This turns "factor this cyclic mess" or "show this symmetric sum vanishes" into a two-line argument.

## On contests
Common on AIME and olympiad algebra when a symmetric or cyclic quantity must be factored or shown to vanish. The sign is the classic slip — always sanity-check against $(a,b,c) = (1,2,3)$.`,

"sum-zero-identities": String.raw`
## Key forms
- $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ — the parent factorization; setting the first factor to zero is what makes the whole card work
- $p_k = -e_2\,p_{k-2} + e_3\,p_{k-3}$ — with $e_1 = 0$ [[newtons-sums|Newton's Sums]] collapse to this, and every higher power sum follows from it
- $p_5 = -5e_2e_3$, $p_7 = 7e_2^2e_3$ — the clean consequences, and the source of the power-sum ratios these problems ask for

## Why it works
Everything follows from the elementary symmetric values $e_1 = a + b + c = 0$, $e_2 = ab + bc + ca$, and $e_3 = abc$.

Squaring $a + b + c = 0$ gives $a^2 + b^2 + c^2 + 2e_2 = 0$, which is the square identity. For cubes, the factorization $$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$$ has a first factor of $0$, so $a^3 + b^3 + c^3 = 3abc$.

Higher powers come from Newton's Sums. Each of $a$, $b$, $c$ is a root of $t^3 + e_2t - e_3$, so $t^3 = -e_2t + e_3$; multiplying by $t^{k-3}$ and adding over the three roots gives $$p_k = -e_2\,p_{k-2} + e_3\,p_{k-3},$$ where $p_k = a^k + b^k + c^k$. Starting from $p_0 = 3$, $p_1 = 0$, and $p_2 = -2e_2$, it produces $p_4 = 2e_2^2$, $p_5 = -5e_2e_3$, and $p_7 = 7e_2^2e_3$.

## How to use it
The moment a problem states or implies $a + b + c = 0$, reach for the cube and square identities, and get higher powers from the recurrence.

The zero sum is often hidden. The roots of a cubic with no $x^2$ term sum to $0$ by [[vietas-general|Vieta's Formulas]], and the differences of any three numbers always sum to $0$, so for all $a$, $b$, $c$, $$(a - b)^3 + (b - c)^3 + (c - a)^3 = 3(a - b)(b - c)(c - a).$$ A shift creates one too: if $x + y + z = 3m$, then $x - m$, $y - m$, and $z - m$ sum to $0$.

## On contests
Three problems here, all AIME, none solved by it alone. The usual trigger is a cubic with no $x^2$ term, whose roots sum to $0$, so sums like $(r + s)^3 + (s + t)^3 + (t + r)^3$ collapse to $-3rst$. Others create the zero sum by shifting all three variables by their average, or force it from a symmetry of the problem.`,

"reciprocal-power-sums": String.raw`## Key forms
- $s_n = t\,s_{n-1} - s_{n-2}$ with $s_0 = 2$, $s_1 = t$ — the recurrence that generates every power at once, so nothing beyond $t$ is ever needed
- $s_4 = t^4 - 4t^2 + 2$ — the next one after the two in the box, worth having ready
- $s_n = 2\cos n\theta$ when $x = e^{i\theta}$ — on the unit circle these are the [[chebyshev-polynomials|Chebyshev polynomials]], which is why the recurrence looks like theirs

## Why it works
Multiply $s_{n-1} = x^{n-1} + x^{-(n-1)}$ by $t = x + x^{-1}$: the cross terms give $x^n + x^{-n} + x^{n-2} + x^{-(n-2)} = s_n + s_{n-2}$, so $s_n = t\,s_{n-1} - s_{n-2}$. Starting from $s_0 = 2$, $s_1 = t$, this produces $s_2 = t^2 - 2$, $s_3 = t^3 - 3t$, $s_4 = t^4 - 4t^2 + 2$, … — each $s_n$ a degree-$n$ polynomial in $t$ (the Chebyshev/Dickson polynomials).

## How to use it
Given $x + \frac{1}{x}$, climb to any $x^n + \frac{1}{x^n}$ with the two-term recurrence — no need to solve for $x$. The same machine handles $a^n + b^n$ whenever $ab = 1$ (take $t = a+b$), and $2\cos n\theta$ from $2\cos\theta$, since $x = e^{i\theta}$ makes $s_n = 2\cos n\theta$.

## On contests
A frequent AMC/AIME setup: "given $x + \frac{1}{x} = k$, find $x^n + \frac{1}{x^n}$" (or the reverse). The recurrence is faster and safer than repeated squaring/cubing, and it exposes the tie to $\cos n\theta$ that some problems turn on.`,

"factorial-telescoping": String.raw`## Why it works
$k \cdot k! = (k+1)! - k!$ is just $(k+1)! = (k+1)\cdot k!$ rearranged; summing telescopes to $(n+1)! - 1!$. The fraction version rewrites $\frac{k}{(k+1)!} = \frac{(k+1) - 1}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$.

## How to use it
Any sum with $k \cdot k!$, $\frac{k}{(k+1)!}$, or $\frac{k-1}{k!}$ shapes telescopes immediately. Related tools: $\frac{1}{k!} - \frac{1}{(k+1)!} = \frac{k}{(k+1)!}$ read backwards, and for alternating factorial sums, pairing consecutive terms. Also the reason $1\cdot1! + 2\cdot2! + \cdots$ base-factorial representations are unique (factorial number system).

## On contests
MATHCOUNTS through AIME: "compute $\sum k \cdot k!$ mod something" and factorial-base digit questions. Recognizing the telescope converts an intimidating factorial sum into two terms.`

});

Object.assign(window.MATH_DETAILS, {

"jensens-inequality": String.raw`## Why it works
Convexity means every chord lies above the graph. The average $\frac{x_1 + \cdots + x_n}{n}$ is a point inside the interval, and the average of the values $\frac{\sum f(x_i)}{n}$ is the corresponding point on the "chord polygon" above it — so the function value at the average sits below the average of the values. Induction from the two-point definition $f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda) f(y)$ gives the full weighted statement.

## How to use it
Check convexity with the second derivative: $f'' \ge 0$ convex (inequality as stated), $f'' \le 0$ concave (flip it). The classical specializations are worth knowing cold: $\ln$ concave gives AM–GM; $x^2$ convex gives the QM–AM step; $\frac{1}{x}$ convex on $(0,\infty)$ gives AM–HM; $\sin$ concave on $(0,\pi)$ bounds angle sums. When the constraint fixes $x_1 + \cdots + x_n$, Jensen immediately locates the extremum at "all equal" — and if the extremum is instead at an endpoint, that's the signal the relevant function was concave (or convex) the other way.

## On contests
The fastest tool for "maximize a symmetric sum of function values with a fixed sum of inputs" — trig sums over triangle angles are the archetype. On AMC/AIME it usually appears disguised: recognizing that equality-at-the-mean structure lets you guess the extremal configuration (all variables equal) and verify. Full Jensen citations are an olympiad staple, often with weights equal to side lengths or masses.`,

"schurs-inequality": String.raw`## Why it works
By symmetry assume $x \ge y \ge z$. Group the three terms as $(x - y)\big(x^t(x - z) - y^t(y - z)\big) + z^t(x - z)(y - z)$: every factor in both products is nonnegative under the ordering, so the whole sum is. This WLOG-and-group argument is the entire proof — no expansion needed.

## How to use it
Deploy the $t = 1$ expansion $x^3 + y^3 + z^3 + 3xyz \ge \sum_{\text{cyc}} xy(x + y)$ when a symmetric degree-3 inequality has the "wrong direction" for AM–GM — the $+3xyz$ on the small side is Schur's signature, and no bunching argument produces it (Muirhead can never yield it, since $(1,1,1)$ is majorized by everything). Useful normalized form: with $x + y + z = s$, $q = \sum xy$, $r = xyz$, the $t = 1$ case reads $s^3 + 9r \ge 4sq$. The $t = 2$ case handles degree-4 versions.

## On contests
An olympiad tool: it settles many symmetric three-variable inequalities that resist AM–GM/Cauchy, and the $s, q, r$ form combines cleanly with $q^2 \ge 3sr$ and friends. Recognize its equality cases — $x = y = z$ and the degenerate $(k, k, 0)$ — as the tell that Schur (not Muirhead) is intended.`,

"muirheads-inequality": String.raw`## Why it works
Majorization means the exponent vector $(a)$ can be reached from $(b)$ by repeatedly moving two exponents apart ($(b_i, b_j) \to (b_i + \epsilon, b_j - \epsilon)$ with $b_i \ge b_j$). Each such move is a two-variable AM–GM-style smoothing step on the symmetric sum, so the more "spread out" exponent triple dominates. In fact every Muirhead inequality is a positive combination of weighted AM–GMs.

## How to use it
Sort both exponent triples in decreasing order, then check the partial sums: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, $a_1 + a_2 + a_3 = b_1 + b_2 + b_3$. If all hold, $\sum_{\text{sym}}$ of the $a$-monomial dominates. Two standing warnings: it applies only to full symmetric sums — cyclic sums are not covered, so convert first and watch the factor of $2$ — and both sides must be homogeneous of the same degree (normalize the constraint, e.g. impose $xyz = 1$, to homogenize).

## On contests
The rigorous stamp for "bunching" steps in olympiad solutions: $(3,0,0) \succ (2,1,0) \succ (1,1,1)$ handles most degree-3 comparisons in one line. Citing Muirhead by name is standard on olympiads; on anything below that level, writing out the two or three AM–GMs it encodes is safer and just as fast. Pairs constantly with [[schurs-inequality|Schur]], which covers exactly the direction Muirhead cannot.`,

"maclaurin-inequality": String.raw`## Why it works
The engine is Newton's inequality $p_k^2 \ge p_{k-1}p_{k+1}$, where $p_k = e_k / \binom{n}{k}$ is the averaged $k$-th elementary symmetric polynomial. It says the sequence $p_k$ is log-concave, and it comes from the fact that $\prod_i (t + x_i)$ has all real roots — so do its derivatives (Rolle), and a real-rooted quadratic slice forces $p_k^2 \ge p_{k-1}p_{k+1}$. Chaining log-concavity and taking $k$-th roots yields Maclaurin's descending chain $p_1 \ge \sqrt{p_2} \ge \cdots \ge \sqrt[n]{p_n}$.

## How to use it
It sits between AM–GM and the heavier symmetric machinery: the two ends are exactly the AM and the GM, while the middle terms give sharper bounds when several elementary symmetric quantities appear together. In practice invoke one link — $p_1 \ge \sqrt{p_2}$ or $\sqrt{p_2} \ge \sqrt[3]{p_3}$ — to relate $\sum x_i$, $\sum x_i x_j$, and $\prod x_i$ more tightly than AM–GM allows.

## On contests
An olympiad-level refinement — rarely needed over AM–GM or Cauchy–Schwarz, but decisive on symmetric inequalities those cannot tighten. Newton's inequality also explains why a real-rooted polynomial has log-concave (hence unimodal) coefficients, a handy lemma in its own right.`

});

Object.assign(window.MATH_DETAILS, {

"sp-substitution": String.raw`
## When to use
Systems such as $x + y = 5$ and $x^3 + y^3 = 35$, expressions such as $x^5 + y^5$ when $x + y$ and $xy$ are known, and equations in $x + \frac1x$, where the substitution is $s = x + \frac1x$ with $p = 1$. Anything unchanged when the two variables are swapped is a candidate.

## How
1. Check that the expression is symmetric.
2. Rewrite each part with $s$ and $p$: $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$, $(x - y)^2 = s^2 - 4p$ and $\frac1x + \frac1y = \frac sp$.
3. Solve for $s$ and $p$.
4. If $x$ and $y$ themselves are needed, solve $t^2 - st + p = 0$, and use $s^2 - 4p \ge 0$ to decide whether they are real.

Solve $x + y = 5$, $x^3 + y^3 = 35$. Then $35 = s^3 - 3sp = 125 - 15p$, so $p = 6$, and $x$ and $y$ are the roots of $t^2 - 5t + 6 = 0$, namely $2$ and $3$.

## Why it works
A symmetric expression depends only on the unordered pair $\{x, y\}$, and the pair is fixed by its sum and product, since $x$ and $y$ are exactly the roots of $(t - x)(t - y) = t^2 - st + p$. Every symmetric polynomial in $x$ and $y$ is a polynomial in $s$ and $p$, so the substitution never loses information and usually lowers the degree. Higher power sums follow from a ladder: $$x^n + y^n = s\left(x^{n-1} + y^{n-1}\right) - p\left(x^{n-2} + y^{n-2}\right).$$

## Formulas it uses
- [[vietas-quadratic]]: $x$ and $y$ are the roots of $t^2 - st + p = 0$, so $s$ and $p$ determine the pair and recover it at the end.
- [[square-of-sum]]: $(x + y)^2 = x^2 + 2xy + y^2$, which gives the first conversion, $x^2 + y^2 = s^2 - 2p$.
- [[newtons-sums]]: the ladder $x^n + y^n = s(x^{n-1} + y^{n-1}) - p(x^{n-2} + y^{n-2})$ for any power sum.
- [[reciprocal-power-sums]]: the case $y = \frac1x$, where $x^n + x^{-n}$ is a polynomial in $s = x + \frac1x$.

## Common traps
- Forgetting that real $x$ and $y$ need $s^2 \ge 4p$, and reporting a pair that does not exist over the reals.
- Applying the substitution to an expression that is not symmetric.
- Counting ordered pairs from one solution $(s, p)$, which gives both $(x, y)$ and $(y, x)$ unless $x = y$.

## Contest profile
Usually the setup of an AIME system or power-sum problem, finished by Vieta's Formulas or a short power-sum ladder.
`

});

Object.assign(window.MATH_DETAILS, {

"completing-the-square": String.raw`
## When to use
Finding the minimum of $x^2 - 6x + 13$ or of $x^2 + y^2 - 4x + 6y$, putting $x^2 + y^2 + Dx + Ey + F = 0$ into center and radius form, deriving the quadratic formula, and integer equations such as $n^2 + 10n + 9 = m^2$, which become a difference of squares.

## How
1. Factor the leading coefficient out of the terms in $x$.
2. Add and subtract the square of half the coefficient of $x$: $x^2 + bx = \left(x + \frac b2\right)^2 - \frac{b^2}{4}$.
3. Repeat for each variable separately.
4. Read off the minimum or the center; for an integer equation, multiply by $4$ to clear halves and factor the difference of squares.

For which integers $n$ is $n^2 + 10n + 9$ a perfect square $m^2$, with $m \ge 0$? Completing the square, $(n + 5)^2 - m^2 = 16$, so $(n + 5 - m)(n + 5 + m) = 16$ with both factors even: $2 \cdot 8$, $4 \cdot 4$, $(-8)(-2)$ and $(-4)(-4)$. These give $n = 0, -1, -10, -9$.

## Why it works
Expanding $\left(x + \frac b2\right)^2$ gives $x^2 + bx + \frac{b^2}{4}$, so $x^2 + bx$ is that square minus $\frac{b^2}{4}$, and adding and subtracting the missing piece changes nothing. A square is never negative and is zero only where its inside is zero, so $\left(x + \frac b2\right)^2 + c - \frac{b^2}{4}$ has its minimum $c - \frac{b^2}{4}$ at $x = -\frac b2$, as the figure shows.

For a perfect-square condition, $n^2 + bn + c = m^2$ times $4$ is $(2n + b)^2 - (2m)^2 = b^2 - 4c$, a difference of squares equal to a known number.

{{figure:minimum}}

## Formulas it uses
- [[vertex-form]]: $a(x - h)^2 + k$, the completed square, with vertex $(h, k)$.
- [[quadratic-formula]]: completing the square on $ax^2 + bx + c = 0$ produces the formula itself.
- [[difference-of-squares]]: $X^2 - Y^2 = (X - Y)(X + Y)$, which finishes an integer equation once the square is completed.
- [[trivial-inequality]]: $X^2 \ge 0$, which turns the completed square into a minimum.

## Common traps
- Adding the square of half the coefficient without subtracting it again.
- Completing the square before factoring out a leading coefficient other than $1$.
- In an integer equation, forgetting that the two factors must have the same parity.

## Contest profile
Usually a setup step: it locates an extreme value or a center, or turns a perfect-square condition into a factorable difference of squares.
`,

"abs-value-relations": String.raw`
## When to use
Regions and curves in the plane defined by absolute values: $|x| + |y| \le c$, $\max(|x|, |y|) = c$, $|x - 3| + |y + 1| = 4$, nested forms such as $\bigl||x| - 1\bigr| + \bigl||y| - 1\bigr| = 1$, and mixed terms such as $|x - y|$. Typical questions ask for an area, a perimeter, the number of lattice points, or the number of intersection points with another curve.

## How
1. Note which variables appear only inside bars as $|x|$ or $|y|$: the graph is symmetric across the corresponding axes.
2. Solve in the region where all the bars on $x$ and $y$ vanish, the first quadrant, giving an ordinary relation.
3. Treat any remaining bar $|g(x, y)|$ as a fold along the line $g = 0$, and graph piece by piece.
4. Reflect the first-quadrant piece across the symmetry axes, and check for overlaps along the axes before multiplying an area or a count.

Find the area of $\bigl||x| - 1\bigr| + \bigl||y| - 1\bigr| \le 1$. In the first quadrant the region is $|x - 1| + |y - 1| \le 1$, a square standing on a corner, centered at $(1, 1)$, with diagonals $2$ and area $2$. Reflecting across both axes gives four such squares, which meet only at points, so the total area is $8$.

## Why it works
Replacing $x$ by $|x|$ makes a relation unable to distinguish $x$ from $-x$, so its graph is its own mirror image across the $y$-axis; the same holds for $y$ and the $x$-axis. Inside the first quadrant, $|x| = x$ and $|y| = y$, so the bars disappear and the relation becomes one without bars on the variables themselves.

For the remaining bars, $|x - a| + |y - b| = c$ is a square on its corner centered at $(a, b)$: in each of the four quadrants around $(a, b)$ it is a line segment with slope $\pm 1$. A bar such as $|x - y|$ adds a fold along $y = x$, where its contents change sign, so the plane splits into more pieces, each with a linear relation.

## Formulas it uses
- [[absolute-value-rules]]: $|u| \le c$ is the pair of linear inequalities $-c \le u \le c$, which makes every piece of the region a polygon.
- [[abs-triangle-inequality]]: $|x| + |y| \ge |x \pm y|$, which explains why $|x| + |y| = c$ and $\max(|x + y|, |x - y|) = c$ describe the same square.

## Common traps
- Reflecting across an axis whose variable has no bar, such as reflecting $|x| + y \le 1$ across the $x$-axis.
- Double counting lattice points or boundary segments on the axes when multiplying by four.
- Forgetting the fold lines of a mixed term such as $|x - y|$, and drawing a square where the region is a hexagon.
- Mistaking the diagonal of a tilted square for its side when computing area.

## Contest profile
A common AMC 10 and AMC 12 topic, usually an area or a count of lattice points, and an occasional AIME first step.
`,

"absolute-value-identities": String.raw`## Key forms
- $|ab|=|a||b|$, $\left|\frac ab\right|=\frac{|a|}{|b|}$, $|a^n|=|a|^n$ — absolute value is multiplicative
- $|ax+b|=|a|\left|x+\frac ba\right|$ — the factoring move, and the one worth drilling
- $|a|^2=a^2$ and $\sqrt{a^2}=|a|$ — the pair that lets you square bars away and get them back
- $|a+b|$ obeys no identity, only the triangle inequality

## Why it works
Every one of these follows from $|t|=\pm t$ by checking signs, but the shorter reason is that $|t|$ is the distance from $t$ to $0$, and scaling a number by $a$ scales its distance from $0$ by $|a|$. Multiplication stretches the number line, so absolute value passes through it; addition slides one point relative to another, so it does not, and the most that survives is $|a+b|\le|a|+|b|$.

The factoring identity is the multiplicative rule read backwards. Since $ax+b=a\left(x+\frac ba\right)$, taking absolute values gives $|a|\left|x+\frac ba\right|$ directly.

## How to use it
Use it to turn any linear expression inside bars into a distance, which is the form every absolute-value equation and inequality wants to be in. $|3x-12|=3|x-4|$, so $|3x-12|\lt 6$ is "within $2$ of $4$", giving $2\lt x\lt 6$ with no casework.

Watch the sign of the coefficient. The factor outside is $|a|$, not $a$: $|-2x+4|=2|x-2|$, and writing $-2|x-2|$ makes a non-negative quantity negative. Squaring is the other reliable move, since $|a|=|b|$ and $a^2=b^2$ say the same thing, which clears bars from both sides of an equation at once.

## On contests
Most often a setup step rather than the answer: pulling the coefficient out converts a messy $|ax+b|$ into a distance and the problem becomes a picture on the number line. Nested bars are the AMC version, and they unfold from the inside using these same rules — see [[abs-value-graphing|graphing nested absolute values]] when the count of solutions is what is wanted.`,

"absolute-value-rules": String.raw`
## Why it works
Distance from $c$ is the same in both directions, which is why every absolute value condition is symmetric about $c$.

$|x - c| \lt d$ says $x$ is less than $d$ away from $c$, so it lies strictly between $c - d$ and $c + d$. $|x - c| \gt d$ says it is more than $d$ away, so it lies beyond one end or the other. And $\sqrt{x^2} = |x|$ because the square root symbol means the nonnegative root, while $x$ itself may be negative.

{{figure:number-line}}

## How to use it
Turn each absolute value into a distance or into two cases. To solve $|2x - 1| \lt 5$, divide by $2$ to get $\left|x - \frac12\right| \lt \frac52$: $x$ is within $\frac52$ of $\frac12$, so $-2 \lt x \lt 3$. For an equation $|A| = |B|$, solve $A = B$ and $A = -B$ separately.

The usual trap is a forgotten branch: $|x| \gt a$ has two rays, and $\sqrt{x^2}$ carries a sign. For nested absolute values, peel them from the outside by cases or graph and count, as in [[piecewise-graph-counting|counting solutions by graphing]]; with two variables, [[abs-value-relations|absolute value relations]] are graphed by symmetry.

## On contests
Five problems here, mostly AMC, two solved by it alone; two others move on to regions in the plane. Distance readings, sums of distances, and piecewise equations are the common forms on MATHCOUNTS and early AMC.
`,

"median-minimizes-abs": String.raw`
## Distinguishing clues
The quantity to minimize is a sum of absolute differences from one unknown point, possibly weighted. A sum of squared differences $\sum(x - a_i)^2$ is minimized at the mean instead, and a maximum of absolute differences is minimized at the midpoint of the two extremes. Distances in the plane, $\sum\sqrt{(x - a_i)^2 + (y - b_i)^2}$, are a geometry problem, not this one; but taxicab distances $\sum(|x - a_i| + |y - b_i|)$ split into one of these problems for each coordinate.

## Methods and Formulas to Try
The function $f(x) = \sum w_i|x - a_i|$ is piecewise linear with corners at the $a_i$. Its slope is the total weight to the left of $x$ minus the total weight to the right, which increases at each corner, so $f$ decreases and then increases. The minimum is where the slope changes sign, the weighted median.

### Methods to try
- [[slope-counting]]: sweep $x$ from left to right, track the slope of the piecewise-linear function at each corner, and stop where the slope stops being negative.
- [[abs-value-graphing]]: sketch the sum as a graph built from V shapes, which shows the flat bottom when the number of points is even.

### Formulas to try
- [[abs-triangle-inequality]]: $|x - a| + |x - b| \ge |b - a|$, with equality exactly for $x$ between $a$ and $b$, which pairs outer points to prove the median result.
- [[absolute-value-rules]]: $|x - a|$ is the distance from $x$ to $a$, which turns the sum into total distance on the number line.

## Common traps
- Using the mean, which minimizes squared distances, not absolute ones.
- Ignoring weights: $3|x - 4|$ counts the point $4$ three times.
- With an even number of points, giving only one minimizer when the whole interval between the two middle points works.
- Forgetting to compute the minimum value itself when the question asks for it.

## Contest profile
An AMC 10 and AMC 12 pattern, often as a placement question on a line, and occasionally an AIME step inside a taxicab-distance problem.
`,

"weierstrass-substitution": String.raw`
## When to use
Fractions that mix $\sin\theta$, $\cos\theta$ and $\tan\theta$, equations such as $a\sin\theta + b\cos\theta = c$ that should become a single polynomial, and questions about rational points on the unit circle or about Pythagorean triples. When one identity simplifies the expression directly, use that instead: the substitution always works, but its algebra can be longer.

## How
1. Set $t = \tan\frac\theta2$.
2. Replace $\sin\theta = \frac{2t}{1 + t^2}$, $\cos\theta = \frac{1 - t^2}{1 + t^2}$ and $\tan\theta = \frac{2t}{1 - t^2}$.
3. Clear denominators and solve the polynomial equation in $t$.
4. Convert back with $\theta = 2\arctan t$, and check $\theta = \pi$ separately, since $t$ is undefined there.

Solve $\sin\theta + \cos\theta = 1$ for $0 \le \theta < 2\pi$. Substituting gives $\frac{2t + 1 - t^2}{1 + t^2} = 1$, so $2t - 2t^2 = 0$ and $t = 0$ or $t = 1$, that is $\theta = 0$ or $\theta = \frac\pi2$. The excluded value $\theta = \pi$ gives $-1$, not a solution.

## Why it works
The double angle formulas give $\sin\theta = 2\sin\frac\theta2\cos\frac\theta2$ and $\cos\theta = \cos^2\frac\theta2 - \sin^2\frac\theta2$. Factoring out $\cos^2\frac\theta2 = \frac{1}{1 + t^2}$ turns both into rational functions of $t = \tan\frac\theta2$: $$\sin\theta = \frac{2t}{1 + t^2}, \qquad \cos\theta = \frac{1 - t^2}{1 + t^2}.$$

Geometrically, the line through $(-1, 0)$ with slope $t$ meets the unit circle again at exactly this point, as the figure shows. Every rational slope gives a rational point, and with $t = \frac mn$, clearing denominators gives $(n^2 - m^2)^2 + (2mn)^2 = (n^2 + m^2)^2$, the formula for Pythagorean triples.

## Formulas it uses
- [[double-angle]]: $\sin\theta = 2\sin\frac\theta2\cos\frac\theta2$ and $\cos\theta = \cos^2\frac\theta2 - \sin^2\frac\theta2$, the identities behind the substitution.
- [[half-angle]]: $\tan\frac\theta2 = \frac{\sin\theta}{1 + \cos\theta}$, the substitution read backward.
- [[pythagorean-triples]]: the slope $t = \frac mn$ gives the triple $(n^2 - m^2, 2mn, n^2 + m^2)$, every primitive triple up to order.

## Common traps
- Losing the solution $\theta = \pi$, where $t$ is undefined.
- Using it where one identity would do, such as $\sin^2\theta + \cos^2\theta = 1$, and drowning in fractions.
- Forgetting that each $t$ gives one $\theta$ in $(-\pi, \pi)$, so solutions on other intervals must be shifted.

## Contest profile
Rare as a whole solution; it appears in rational-point and Pythagorean-triple problems and as a last resort for mixed trigonometric equations.
`,



"tangent-line-trick": String.raw`
## When to use
Symmetric inequalities of the form $\sum f(x_i) \ge C$ or $\le C$ in which every term depends on one variable, a fixed sum such as $a + b + c = 3$ is given, and equality holds at $a = b = c$. It is the right tool when $f$ is not convex on the whole range, so that Jensen's Inequality does not apply directly, but each term still lies above its tangent at the equality point.

## How
1. Find the equality point $t = \frac sn$ and compute $f(t)$ and $f'(t)$.
2. Write the tangent line $L(x) = f(t) + f'(t)(x - t)$.
3. Prove $f(x) \ge L(x)$ for every allowed $x$: the difference $f(x) - L(x)$ has a double root at $t$, so it factors as $(x - t)^2$ times something, and that something must be nonnegative on the range.
4. Add the $n$ bounds: the linear terms sum to $nf(t) + f'(t)(s - nt) = nf(t)$.

For positive $x$, $y$, $z$ with $x + y + z = 1$, prove $\frac1x + \frac1y + \frac1z \ge 9$. The tangent to $\frac1x$ at $x = \frac13$ is $6 - 9x$, and $\frac1x - (6 - 9x) = \frac{(3x - 1)^2}{x} \ge 0$. Adding the three bounds gives $18 - 9(x + y + z) = 9$.

## Why it works
The constraint $\sum x_i = s$ makes any linear function of the $x_i$ sum to a constant. So if each term $f(x_i)$ is at least $L(x_i)$, the sum is at least $\sum L(x_i)$, which depends only on $s$. Taking the tangent at the equality point makes the bound sharp, since $L(t) = f(t)$ and equality is preserved, as the figure on this card shows.

For convex $f$ this is Jensen's Inequality, since a convex function lies above all its tangents. The trick is more flexible: the bound $f(x) \ge L(x)$ only has to hold on the allowed range, and the factored form $(x - t)^2 g(x)$ shows exactly where it holds.

## Formulas it uses
- [[jensens-inequality]]: the convex case, where $f$ lies above every tangent line and the trick is Jensen's Inequality in disguise.
- [[trivial-inequality]]: the factor $(x - t)^2 \ge 0$ that makes $f(x) - L(x)$ nonnegative.

## Common traps
- Checking $f(x) \ge L(x)$ only near $t$ instead of on the whole range; the bound often fails for large $x$, which then needs a separate case.
- Using the tangent at the wrong point; it must be the equality point, or the bound is not sharp.
- Forgetting that the method needs the terms to be separate functions of single variables.
- Losing positivity conditions when dividing, as in $\frac{(3x - 1)^2}{x}$, which needs $x > 0$.

## Contest profile
An olympiad and hard AIME tool for one-variable-per-term inequalities; when it applies, the whole proof is the one factorization.
`

});

Object.assign(window.MATH_DETAILS, {

"holders-inequality": String.raw`## Why it works
Hölder is $\ell^p$–$\ell^q$ duality. With $\frac1p + \frac1q = 1$, apply [[weighted-am-gm|weighted AM–GM]] termwise to $\frac{a_i^p}{\sum a^p}$ and $\frac{b_i^q}{\sum b^q}$ and sum: the total is $1$, which rearranges to $\sum a_i b_i \le (\sum a^p)^{1/p}(\sum b^q)^{1/q}$. The three-sequence form is the same statement with exponents $\frac13 + \frac13 + \frac13 = 1$. Any number of sequences works the same way: with weights $\lambda_j\ge0$ summing to $1$, $\prod_j\big(\sum_i a_{ij}\big)^{\lambda_j}\ge\sum_i\prod_j a_{ij}^{\lambda_j}$, which is the form to reach for when the exponents in a problem are not all equal.

## How to use it
The signature move on cyclic sums. To bound $\sum \frac{a}{b+c}$ below, pair it with two copies of $\sum a(b+c)$ so the Hölder product telescopes: $\bigl(\sum \tfrac{a}{b+c}\bigr)\bigl(\sum a(b+c)\bigr)\bigl(\sum a(b+c)\bigr) \ge (a+b+c)^3$, then bound the denominator. General recipe: choose the sequences and exponents so the right-hand cube (or $k$-th power) is exactly the quantity you want and the left factors are computable. Anywhere Cauchy–Schwarz almost works but leaves an exponent short, Hölder finishes.

## On contests
Olympiad inequalities — cyclic fractions and $\sum \frac{a^k}{\cdots}$ shapes above all. Rarely needed below olympiad level. Track the equality case (proportional sequences) to know whether your bound is tight.`,

"chebyshev-sum-inequality": String.raw`## Why it works
Sum the $n^2$ products $(a_i - a_j)(b_i - b_j) \ge 0$, each nonnegative when the sequences are sorted the same way. Expanding gives $n\sum a_i b_i - (\sum a_i)(\sum b_j) \ge 0$. Opposite ordering makes every factor flip sign, reversing the inequality.

## How to use it
Reach for it when a sum pairs two quantities that rise and fall together (or oppositely) — it's the averaged cousin of Rearrangement: $\frac1n \sum a_i b_i \ge \bigl(\frac1n\sum a_i\bigr)\bigl(\frac1n\sum b_i\bigr)$. Taking $b = a$ recovers $\sum a_i^2 \ge \frac1n(\sum a_i)^2$ (power-mean); more generally it bounds $\sum a_i f(a_i)$ for monotonic $f$.

## On contests
An olympiad tool and a clean lemma inside longer inequality chains. Always confirm the two sequences are sorted consistently first — the direction depends entirely on it.`,

"minkowski-inequality": String.raw`## Why it works
It is the triangle inequality for the norm $\|x\|_p = (\sum |x_i|^p)^{1/p}$: $\|a + b\|_p \le \|a\|_p + \|b\|_p$. For $p = 2$ this is $|\vec u| + |\vec v| \ge |\vec u + \vec v|$ — the straight path beats the bent one. The general case follows from [[holders-inequality|Hölder]].

## How to use it
Whenever a sum of square-root (or $p$-th-root) terms appears, read each as a vector length and add the vectors tip to tail. To minimize $\sum \sqrt{x_i^2 + y_i^2}$ with the $\sum x_i$ and $\sum y_i$ fixed, the minimum is $\sqrt{(\sum x_i)^2 + (\sum y_i)^2}$, attained when the little vectors are parallel — the algebraic version of reflecting to straighten a path. It's also the standard proof that coordinate distance satisfies the triangle inequality.

## On contests
The $p = 2$ form is an AIME-level "minimize a sum of hypotenuses" trick and shows up wherever reflection/shortest-path does; the general $\ell^p$ statement is olympiad. Equality means all vectors point the same way.`,

"karamata-inequality": String.raw`## Why it works
Each value of a convex $f$ lies above its tangent line; combining the tangent-line comparisons by Abel (summation-by-parts) with the majorization prefix-sum inequalities yields $\sum f(x_i) \ge \sum f(y_i)$. Convexity is exactly what makes the tangent slopes line up with those partial sums.

## How to use it
First establish majorization: sort both sequences in decreasing order, check that every prefix sum of $(x_i)$ is at least the corresponding prefix sum of $(y_i)$, with equal totals. Then convex $f$ gives $\sum f(x_i) \ge \sum f(y_i)$ (concave flips it). It shines when the extremum sits at an unequal, boundary configuration: $(a,b,c)$ majorizes $(\bar x,\bar x,\bar x)$ recovers Jensen, while $(a+b, 0)$ majorizing $(a, b)$ powers "smoothing" arguments.

## On contests
Olympiad inequalities, especially symmetric ones whose extremum is at a boundary rather than the center — the regime Jensen alone can't reach. Proving the majorization is the real work; the inequality is then automatic.`,

"generalized-binomial-series": String.raw`## Why it works
Taylor-expanding $(1+x)^\alpha$ gives $n$-th coefficient $\frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!} = \binom{\alpha}{n}$. For $\alpha = -k$, $\binom{-k}{n} = (-1)^n\binom{n+k-1}{n}$, and those signs cancel the $(-x)^n$ inside $\frac{1}{(1-x)^k}$, leaving the positive coefficients $\binom{n+k-1}{k-1}$ — the stars-and-bars count of $n$ as an ordered sum of $k$ nonnegative parts. Fractional exponents behave the same way: $\alpha=\tfrac12$ gives $\sqrt{1+x}=1+\frac x2-\frac{x^2}{8}+\cdots$, the standard route to approximating a square root by hand.

## How to use it
This is the dictionary that turns generating functions into numbers. Model unlimited repetition of $k$ item types by $\frac{1}{(1-x)^k}$ and read the $x^n$ coefficient as $\binom{n+k-1}{k-1}$. Multiply such factors (and finite pieces $\frac{1-x^{m+1}}{1-x}$ for bounded supply), expand, and extract the coefficient. Know $\frac{1}{1-x} = \sum x^n$ and $\frac{1}{(1-x)^2} = \sum (n+1)x^n$ cold.

## On contests
The engine behind AIME/olympiad generating-function counts and every "number of nonnegative integer solutions" problem — it is [[stars-and-bars|stars and bars]], packaged to compose with other generating functions. For formal coefficient extraction, convergence never matters.`,

"cardano-cubic": String.raw`## Why it works
The substitution $x = t - \frac{b}{3a}$ kills the quadratic term, leaving $t^3 + pt + q = 0$. Setting $t = u + v$ with $3uv + p = 0$ turns it into $u^3 + v^3 = -q$ and $u^3 v^3 = -\frac{p^3}{27}$, so $u^3, v^3$ are roots of a quadratic — giving the nested cube-root expression. The term under the inner square root is (up to a constant) the discriminant $\Delta = -4p^3 - 27q^2$.

## How to use it
Depress the cubic, apply the formula, then add $-\frac{b}{3a}$ back. Read the discriminant to predict roots: $\Delta \lt  0$ → one real root the formula gives directly; $\Delta > 0$ → three real roots but via complex cube roots (casus irreducibilis), where the trig substitution $t = 2\sqrt{-p/3}\cos\theta$ is cleaner; $\Delta = 0$ → a repeated root. In practice, try the Rational Root Theorem and factoring first.

## On contests
Almost never the intended path — contest cubics are designed to factor. Worth knowing it exists (and the discriminant's root count is occasionally handy), but reach for rational roots, [[vietas-general|Vieta]], or a clever substitution before Cardano.`

});

Object.assign(window.MATH_DETAILS, {

"power-mean-inequality": String.raw`## Why it works
$p \mapsto M_p$ is nondecreasing because $x \mapsto x^{p/q}$ is convex for $p > q > 0$ (Jensen applied to $a_i^q$); limiting and sign arguments extend the chain through $p = 0$ (which is the geometric mean) and to negative exponents. All values equal collapses every mean to the same number — the equality case.

## How to use it
Match the two exponents to your data: $M_2 \ge M_1$ compares $\sum a_i^2$ with $(\sum a_i)^2$; $M_1 \ge M_{-1}$ is AM–HM; $M_1 \ge M_0$ is AM–GM. When a problem mixes, say, cubes and first powers, quote the general $M_p \le M_q$ ($p \lt  q$) directly. It's often the cleanest finish after normalizing $n$ or $\sum a_i$.

## On contests
The workhorse behind "compare these symmetric sums" inequalities on AIME and olympiad — it packages the whole QM–AM–GM–HM chain into one statement. Name the specific exponent step you use.`,

"weighted-am-gm": String.raw`## Why it works
It is Jensen for the concave logarithm: $\ln\!\big(\sum w_i a_i\big) \ge \sum w_i \ln a_i = \ln\!\big(\prod a_i^{w_i}\big)$. Rational weights reduce to ordinary AM–GM by repeating terms; arbitrary weights follow by continuity.

## How to use it
Choose weights to produce the exponents you want. To bound a product $\prod a_i^{c_i}$, take weights $w_i \propto c_i$ so the weighted GM is your product and the weighted AM is a sum you control — this is how targeted bounds like $a^3 + a^3 + b^3 \ge 3a^2 b$ are proved. It also proves Young's inequality and, through it, Hölder.

## On contests
Half of olympiad inequality work is picking good weights. Equal weights (plain AM–GM) handle symmetric sums; the weighted form is what unequal exponents demand. Equality iff all $a_i$ are equal.`,

"eisenstein-criterion": String.raw`## Why it works
If a prime $p$ divides every coefficient except the leading one and $p^2$ does not divide the constant term, reducing a hypothetical factorisation mod $p$ forces both factors to be powers of $x$ times a unit. Their constant terms would then both be divisible by $p$, making the product's constant term divisible by $p^2$, which contradicts the hypothesis. So no factorisation into lower-degree rational polynomials exists.

## How to use it
Check the three conditions in order: $p\mid a_0,\dots,a_{n-1}$, then $p\nmid a_n$, then $p^2\nmid a_0$. If no prime works as written, try a shift $x\mapsto x+c$ first, since irreducibility is unchanged by it. For the cyclotomic $\Phi_p(x)=1+x+\cdots+x^{p-1}$, substituting $x+1$ makes $p$ Eisenstein, because the middle binomial coefficients are all divisible by $p$. The criterion only ever proves irreducibility, never the reverse: failing it says nothing.

## On contests
Rare below olympiad level, and when it appears the polynomial is usually cyclotomic or one shift away from it. Worth knowing mainly so that "show this is irreducible over $\mathbb{Q}$" has a first move.`,

"abel-summation": String.raw`## Why it works
Summation by parts: substitute $a_k = A_k - A_{k-1}$ and reindex, exactly mirroring $\int u\,dv = uv - \int v\,du$. The boundary term $A_n b_n$ minus the sum of $A_k$ against the forward differences $b_{k+1} - b_k$ reconstructs the original sum.

## How to use it
Use it when one factor has a clean partial sum $A_k$ (arithmetic, geometric, binomial) or the other is monotone. Sums such as $\sum k r^k$, $\sum k\binom{n}{k}$, and Dirichlet-type $\sum a_k/k$ all yield. When $b_k$ is monotone the transformed sum has one-signed terms — the mechanism behind the proofs of Chebyshev's and Karamata's inequalities and Abel's convergence test.

## On contests
An olympiad and advanced-AIME tool for sums of products, and for turning an intractable sum into a telescoping or bounded one. The trigger is spotting that one factor telescopes or is monotone.`,

"inverse-trig-identities": String.raw`## Why it works
$\arcsin x + \arccos x = \frac\pi2$ because sine and cosine are cofunctions on the principal ranges. $\arctan x + \arctan\frac1x = \pm\frac\pi2$ because the tangent of the sum blows up and the sign is set by the sign of $x$. The arctan addition formula is tangent-addition read backward, valid only while the true sum stays inside $(-\frac\pi2, \frac\pi2)$; once $xy > 1$ pushes it out, add or subtract $\pi$.

## How to use it
Pin the ranges first: $\arcsin, \arctan \in [-\frac\pi2, \frac\pi2]$ and $\arccos \in [0, \pi]$. For telescoping arctan sums, combine adjacent terms with the addition formula and watch for the $\pm\pi$ correction. For "evaluate $\arctan a + \arctan b + \arctan c$," compute the tangent, then let the ranges choose the right multiple of $\pi$.

## On contests
AMC 12 tests these ranges head-on ("what is $\arcsin(\sin 5)$?"), and AIME uses arctan telescoping. The identities are easy; the branch and range bookkeeping is where the points actually are.`

});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"sos-method": String.raw`
## When to use
Olympiad inequalities in three variables, symmetric or cyclic, with equality at $a = b = c$: polynomial inequalities after clearing denominators, inequalities where AM-GM and Cauchy-Schwarz lose too much, and inequalities with a second equality case such as $a = b,\ c = 0$, which points to Schur's Inequality. It is a mechanical method, so it is also the fallback when no clever idea appears. When the extremes may sit at the boundary instead, the [[uvw-method|uvw method]] is the companion check.

## How
1. Move everything to one side, so the claim is $F(a, b, c) \ge 0$ with $F(t, t, t) = 0$.
2. Rewrite $F$ as $S_a(b - c)^2 + S_b(c - a)^2 + S_c(a - b)^2$, using the building blocks below.
3. If $S_a, S_b, S_c \ge 0$, the proof is done.
4. Otherwise assume $a \ge b \ge c$ and check the ordered criterion: $S_b \ge 0$, $S_a + S_b \ge 0$ and $S_c + S_b \ge 0$.

The building blocks are the SOS identity, $a^2 + b^2 + c^2 - ab - bc - ca = \frac12\sum(a - b)^2$, and its consequences such as $a^3 + b^3 + c^3 - 3abc = \frac{a + b + c}{2}\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$. In the second one every coefficient is $\frac{a + b + c}{2}$, nonnegative for nonnegative variables, which proves $a^3 + b^3 + c^3 \ge 3abc$ in one line.

## Why it works
A symmetric polynomial that vanishes whenever $a = b = c$ can be organized around the differences between the variables, and the squared differences are the natural nonnegative quantities. Writing $F$ in that form changes the question from "is this polynomial nonnegative?" to "are three coefficients nonnegative?", which is usually a much simpler question.

The ordered criterion handles a negative coefficient. With $a \ge b \ge c$, the largest gap satisfies $(a - c)^2 \ge (a - b)^2 + (b - c)^2$, since $a - c$ is the sum of the other two gaps, both nonnegative. So if $S_b \ge 0$, the middle term is at least $S_b(a - b)^2 + S_b(b - c)^2$, and $F \ge (S_a + S_b)(b - c)^2 + (S_c + S_b)(a - b)^2$, which is nonnegative under the criterion.

## Formulas it uses
- [[sos-identity]]: $x^2 + y^2 + z^2 - xy - yz - zx = \frac12\left[(x - y)^2 + (y - z)^2 + (z - x)^2\right]$, the first building block of every SOS form.
- [[trivial-inequality]]: squares are nonnegative, which makes each term $S(b - c)^2$ nonnegative once its coefficient is.
- [[schurs-inequality]]: the standard finish when SOS leaves a residual term, and the inequality behind the equality case $a = b,\ c = 0$.

## Common traps
- Forgetting to check that the inequality really is an equality at $a = b = c$; if not, no SOS form exists.
- Concluding from one negative coefficient that the inequality fails, without trying the ordered criterion.
- Using the ordered criterion on a cyclic inequality without checking both orderings $a \ge b \ge c$ and $a \ge c \ge b$.
- Assuming nonnegative variables when the problem allows negative ones, which can flip the sign of a coefficient such as $a + b + c$.

## Contest profile
An olympiad tool for three-variable polynomial inequalities, used when slicker approaches fail; it seldom appears in AMC or AIME problems, where the inequalities are lighter.
`,
"uvw-method": String.raw`
## When to use
Symmetric inequalities and optimization problems in three nonnegative variables, especially polynomial ones of degree at most $5$ under a constraint such as $a + b + c = 3$, where the extreme case might be $a = b = c$, or $(t, t, s)$, or a configuration with a zero such as $(\frac32, \frac32, 0)$. The method decides which, with no clever idea needed.

## How
1. Write the expression in $p = a + b + c$, $q = ab + bc + ca$ and $r = abc$.
2. Fix $p$ and $q$ and check that the expression is linear in $r$, or at least monotone; for symmetric polynomials of degree at most $5$ it always is, since $r^2$ has degree $6$.
3. Conclude that the extremes occur at the ends of the range of $r$, which are the configurations with two equal variables or with one variable equal to $0$.
4. Check those two one-variable cases directly.

For nonnegative $a + b + c = 3$, show $a^2 + b^2 + c^2 + abc \ge 4$. In $pqr$ form the expression is $9 - 2q + r$, linear in $r$, so it suffices to check the boundary. With $c = 0$ it is $a^2 + b^2 \ge \frac92$. With $a = b = t$ and $c = 3 - 2t$ it is $-2t^3 + 9t^2 - 12t + 9$, whose minimum on $[0, \frac32]$ is $4$, at $t = 1$.

{{figure:boundary}}

## Why it works
A symmetric polynomial is a polynomial in $p$, $q$ and $r$. Three real numbers with given $p$, $q$, $r$ exist exactly when the cubic $x^3 - px^2 + qx - r$ has three real roots, nonnegative if required. With $p$ and $q$ fixed, the set of allowed $r$ is an interval, and its endpoints are where the cubic has a double root, two equal variables, or a root at $0$.

A linear function of $r$ on an interval takes its maximum and minimum at the endpoints. So the extreme values of the original expression occur in those boundary configurations, and the three-variable problem becomes two one-variable problems.

## Formulas it uses
- [[fundamental-theorem-symmetric]]: every symmetric polynomial in $a$, $b$, $c$ is a polynomial in $p$, $q$ and $r$.
- [[vietas-general]]: $a$, $b$, $c$ are the roots of $x^3 - px^2 + qx - r$, which is how the range of $r$ is described.
- [[schurs-inequality]]: $p^3 - 4pq + 9r \ge 0$, a bound on $r$ that often finishes the boundary case.

## Common traps
- Applying the method to an expression that is not linear or monotone in $r$, such as one containing $r^2$.
- Checking only $a = b = c$ and forgetting the two-equal and one-zero cases.
- Forgetting the zero case when variables may be $0$, or including it when they must be positive.

## Contest profile
An olympiad tool for symmetric inequalities in three variables; it settles where the extreme sits, and the two boundary checks are routine.
`,

"max-product-fixed-sum": String.raw`## Why it works
For a fixed sum, AM–GM makes the product largest when the parts are equal, so the ideal part is near $e\approx 2.718$ — and among integers $3$ beats $2$. Two local swaps pin the integer rule: a $1$ is always wasteful (merging it, $1+x \to (x+1)$, raises the product), and three $2$'s lose to two $3$'s (same sum $6$, but $8\lt 9$), so never keep more than two $2$'s.

## How to use it
Write $n = 3q + r$ and read off the split: $r=0$ gives $3^q$; $r=1$ gives $4\cdot 3^{q-1}$ (trade a leftover $1$ and a $3$ for a $4$, or two $2$'s); $r=2$ gives $2\cdot 3^q$. Example: $n=11 = 3+3+3+2$ has product $54$, and $n=10=3+3+4$ gives $36$.

## On contests
"Largest product of positive integers summing to $N$" is a MATHCOUNTS/AMC staple, and the $3$'s rule answers it instantly. The same principle handles the real-number version (all parts equal) and constrained integer variants ("parts at least $2$," etc.).`,

"triangle-square-identities": String.raw`## Why it works
Use $C = \pi-(A+B)$, so $\cos C = -\cos(A+B)$. Substituting into $\cos^2 A+\cos^2 B+\cos^2 C$ and simplifying with product-to-sum collapses it to $1 - 2\cos A\cos B\cos C$ — the star identity. The tangent and cotangent twins come the same way from $A+B+C=\pi$: $\tan A+\tan B+\tan C = \tan A\tan B\tan C$ and $\cot A\cot B+\cot B\cot C+\cot C\cot A = 1$, with half-angle version $\tan\frac A2\tan\frac B2+\tan\frac B2\tan\frac C2+\tan\frac C2\tan\frac A2 = 1$.

## How to use it
When a problem hands you a symmetric combination of $\cos^2$, $\sin^2$, or $\sin\sin\cos$ of a triangle's angles, this identity is often the whole problem — solve for the missing term. The right-triangle test is fast: $\cos^2 A+\cos^2 B+\cos^2 C = 1 \iff$ one angle is $90^\circ$, since then $2\cos A\cos B\cos C = 0$.

## On contests
AIME problems that give $\cos^2$ or $\sin\sin\cos$ relations among a triangle's angles are the target: recognize the identity, then solve. Keep the half-angle twin handy for incircle/excircle setups where the angles are halved.`,

"chebyshev-polynomials": String.raw`## Why it works
Expanding $\cos n\theta$ with [[angle-addition|angle addition]] always yields a polynomial in $\cos\theta$ (the odd powers of $\sin\theta$ pair up), and that polynomial is $T_n$. Its recurrence $T_{n+1} = 2x\,T_n - T_{n-1}$ (with $T_0=1$, $T_1=x$) mirrors $\cos(n+1)\theta = 2\cos\theta\cos n\theta - \cos(n-1)\theta$; the second kind $U_n$, with $U_n(\cos\theta) = \frac{\sin((n+1)\theta)}{\sin\theta}$, obeys the same recurrence.

## How to use it
Two moves. First, substitute $x=\cos\theta$ to evaluate stubborn polynomials or nested cosine products: the roots $x_k = \cos\frac{(2k-1)\pi}{2n}$ give exact values and a product of cosines collapses. Second, for "make the largest value as small as possible," invoke the minimax fact: $\frac{1}{2^{n-1}}T_n$ is the monic degree-$n$ polynomial with the least maximum $|\cdot|$ on $[-1,1]$, equioscillating between $\pm\frac{1}{2^{n-1}}$.

## On contests
Iterated maps like $x\mapsto 2x^2-1$ (which is $T_2$) and multiple-angle [[even-power-sin-cos-sums|cosine sums]] are the recurring AIME/olympiad uses; the minimax property answers the rarer "minimize the peak of a monic polynomial" question. Closely tied to the trig substitution $x=\cos\theta$.`,

"lagranges-identity": String.raw`## Why it works
Expand both sides. The product $\left(\sum a_i^2\right)\left(\sum b_j^2\right) = \sum_{i,j} a_i^2 b_j^2$ splits into the diagonal terms $\sum_i a_i^2 b_i^2$ and the off-diagonal $\sum_{i\ne j} a_i^2 b_j^2$. The squared dot product $\left(\sum a_i b_i\right)^2 = \sum_i a_i^2 b_i^2 + \sum_{i\ne j} a_i b_i a_j b_j$ shares the same diagonal. Subtracting, the diagonals cancel and the off-diagonal remainder pairs up: $a_i^2 b_j^2 + a_j^2 b_i^2 - 2 a_i b_i a_j b_j = (a_i b_j - a_j b_i)^2$ for each pair $i \lt j$. That is the right-hand side.

## How to use it
Because the right side is a sum of squares it is $\ge 0$, which is exactly the Cauchy–Schwarz Inequality — and it pins the equality case: every $a_i b_j - a_j b_i = 0$, i.e. the sequences are proportional. It also names the "defect" in Cauchy–Schwarz precisely, useful when you need not just $\le$ but how much slack there is. In three dimensions it is the vector identity $|\mathbf a|^2 |\mathbf b|^2 - (\mathbf a\cdot\mathbf b)^2 = |\mathbf a\times\mathbf b|^2$.

## On contests
The two-term case $(a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2$ is the Brahmagupta–Fibonacci Identity — the workhorse for sum-of-two-squares problems and complex-number norms. The full identity itself is rarer, but it is the cleanest one-line proof of Cauchy–Schwarz and the tidiest way to argue an equality/proportionality condition.`,

"abs-value-graphing": String.raw`
## When to use
Equations and inequalities in one variable with nested bars, such as $\bigl||x| - 3\bigr| = b$ or $\bigl||x - 5| - 5\bigr| \le 2$; questions that count solutions for a parameter; and any task asking for the graph of an absolute value expression. Splitting into sign cases doubles the work with each bar, while the graph handles every bar in one picture.

## How
1. Start from the innermost expression, usually a line or the V of $|x|$.
2. Apply the operations from the inside out: a shift $f(x - h)$ moves right by $h$, a constant $f(x) + k$ moves up by $k$, an outer bar $|f(x)|$ folds the part below the $x$-axis upward, and an inner bar $f(|x|)$ replaces the left half by the mirror image of the right half.
3. Track only the corners, their positions and heights, since the graph is straight between them.
4. Read the question off the finished picture: solutions are crossings with a horizontal line, and solution sets of inequalities are the stretches above or below it.

Graph $y = \bigl||x| - 3\bigr|$. The V of $|x|$, lowered by $3$, has its vertex at $(0, -3)$ and crosses the axis at $\pm 3$. Folding the part below the axis gives a W with corners at $(\pm 3, 0)$ and a peak at $(0, 3)$, as the figure on this card shows.

## Why it works
An outer bar changes only the sign of negative outputs, so it reflects exactly the part of the graph below the $x$-axis and leaves the rest. An inner bar makes the expression depend only on $|x|$, so the value at $-x$ equals the value at $x$: the graph is even, and its right half determines everything. Shifts and stretches act on graphs in the usual way.

Each operation keeps the graph piecewise linear, and the corners appear only at points the operations create: the roots of the expression inside an outer bar, and $x = 0$ for an inner bar. So a few corners describe the whole graph, and the order of operations matters, since folding then shifting differs from shifting then folding.

## Formulas it uses
- [[absolute-value-rules]]: $|u| = c$ means $u = \pm c$, and $|u| \le c$ means $-c \le u \le c$, the algebra behind each fold.
- [[absolute-value-identities]]: $|ax + b| = |a|\left|x + \frac ba\right|$, which puts a bar in shift-and-stretch form before graphing.

## Common traps
- Applying the operations from the outside in, which produces a different graph.
- Confusing $f(|x|)$, a mirror across the $y$-axis, with $|f(x)|$, a fold across the $x$-axis.
- Losing the corners at the roots of an inner expression, where a fold creates a new corner.
- Miscounting solutions at a corner height, where a horizontal line touches instead of crossing.

## Contest profile
A frequent AMC and occasional AIME tool: one picture replaces a dozen sign cases, and the question is usually a count of solutions.
`,

"first-order-recurrence": String.raw`
## Why it works
The fixed point is the one value the recurrence leaves alone: solving $L = rL + d$ gives $L = \frac{d}{1 - r}$. Subtracting $L = rL + d$ from $a_n = ra_{n-1} + d$ removes the constant, $$a_n - L = r(a_{n-1} - L), \qquad \text{so} \qquad a_n - L = r^n(a_0 - L).$$

That subtraction is the whole content: $d$ disappears into the change of origin, and what is left is a [[geometric-series|geometric sequence]] of gaps from $L$. It also predicts the behaviour without any computation.

{{figure:gaps}}

So $a_n$ approaches $L$ when $|r| \lt 1$, runs away when $|r| \gt 1$, and alternates around $L$ when $r$ is negative.

The excluded case is $r = 1$, where $x \mapsto x + d$ has no fixed point at all; there the recurrence is an [[arithmetic-series|arithmetic sequence]], $a_n = a_0 + nd$.

## How to use it
Three steps, in order: solve $L = rL + d$, write $a_n = r^n(a_0 - L) + L$, and read off what the question wants, a specific term, the limit $L$, or the step at which a threshold is crossed, which is a logarithm away.

Recognize the shape in words, since it is rarely written as a recurrence. "Each year the population grows by $8\%$ and $500$ more arrive" is $r = 1.08$ and $d = 500$. "Half the liquid in a $6$-litre tank is removed and replaced with $3$ litres of water", tracking the water, is $r = \frac12$ and $d = 3$. Interest with a fixed deposit and repeated dilution are the same recurrence.

Two checks prevent the usual errors: rule out $r = 1$ before dividing by $1 - r$, and confirm whether the sequence starts at $a_0$ or $a_1$, since the exponent in $r^n$ shifts with it.

## On contests
Two problems here, one AIME and one AMC 12, neither solved by it alone: one pairs it with a [[states-recursion-prob|recursion on states]] for a probability, the other with [[periodicity-mod-m|periodicity]] modulo $m$. At MATHCOUNTS and on the AMC it appears in disguise as a mixture, interest, or population question, and the fixed point is usually the number being asked for. Any process described as repeating forever and asked to settle calls for solving $L = rL + d$ first.
`

});

Object.assign(window.MATH_DETAILS, {

"proportion-properties": String.raw`
## Why it works
Equal ratios all hide the same multiplier, and once each numerator is written as that multiplier times its denominator, every rule is one line of algebra.

If $\frac{a_i}{b_i} = k$ for every $i$, then $a_i = kb_i$. Adding, $a_1 + \cdots + a_n = k(b_1 + \cdots + b_n)$, so the pooled fraction $\frac{a_1 + \cdots + a_n}{b_1 + \cdots + b_n}$ is again $k$. Scaling each pair first changes nothing, since $w_ia_i = k(w_ib_i)$ as well.

For a single proportion $\frac ab = \frac cd = k$, write $a = kb$ and $c = kd$. Then $\frac{a + b}{b} = k + 1 = \frac{c + d}{d}$, which is componendo, and $\frac{a - b}{b} = k - 1 = \frac{c - d}{d}$, which is dividendo. Dividing the first by the second gives $$\frac{a + b}{a - b} = \frac{k + 1}{k - 1} = \frac{c + d}{c - d},$$ provided $k \ne 1$ so that nothing is divided by zero.

## How to use it
When several equal ratios (or a single proportion) appear, add numerators over denominators to collapse them to the common value in one step. Use componendo-dividendo — $$\frac{a}{b}=\frac{c}{d}\Rightarrow\frac{a+b}{a-b}=\frac{c+d}{c-d}$$ — to simplify sum-and-difference forms before cross-multiplying.

## On contests
A MATHCOUNTS and AMC time-saver, and nearly always the whole solution when it applies: 16 of the 19 problems tagged here need nothing else. The addendo one-liner beats introducing a parameter, and componendo-dividendo tidies a messy proportion equation before you solve it.
`,

"resultant-discriminant": String.raw`## Why it works
The resultant is the determinant of the Sylvester matrix, which is singular exactly when $f$ and $g$ share a root; equivalently $\operatorname{Res}(f,g)=a_m^{\,n}b_n^{\,m}\prod(\alpha_i-\beta_j)$ vanishes iff some $\alpha_i=\beta_j$. Taking $g=f'$ detects a repeated root, which is the discriminant.

## How to use it
Set $\operatorname{Res}(f,g)=0$ to eliminate a variable between two polynomial equations, and use $\Delta_f$ to test for or force a multiple root (tangency conditions). For a quadratic $\Delta=b^2-4ac$; for a cubic the sign of $\Delta$ counts real roots.

## On contests
Mostly olympiad and advanced algebra; the discriminant is everyday, while the resultant is the systematic elimination tool for two-variable polynomial systems where substitution gets unwieldy.`,

"smoothing-method": String.raw`
## When to use
Extremal problems in several symmetric variables with a fixed sum or product: maximize a product, minimize a sum of squares, bound $\sum f(x_i)$, or split an integer into parts with the largest product. The tell is a problem that "obviously" has its extremum at equal values, or at an extreme configuration such as $(2, 1, 0)$, and needs that claim proved.

## How
1. Fix the constraint and pick a move that preserves it: replace $(a, b)$ by $\left(\frac{a+b}{2}, \frac{a+b}{2}\right)$, or by $(a + t, b - t)$ toward or away from each other.
2. Show the move always improves the objective while the two variables are unequal (or are not at a boundary).
3. Conclude that the optimum is the configuration where no move is possible: all variables equal, or as many as possible at the boundary.
4. Compute the objective there, and check that the optimum is attained.

Split $10$ into positive integers with the largest product. A part $p \ge 5$ can be replaced by $2$ and $p - 2$, since $2(p - 2) > p$; a part $1$ should be merged into a neighbor; a $4$ can be written as $2 + 2$; and three $2$s can become two $3$s, since $9 > 8$. After every improvement is used, only $3$s and at most two $2$s remain, so $10 = 3 + 3 + 2 + 2$ and the largest product is $36$.

{{figure:chord}}

## Why it works
If $f$ is convex, then $f(a) + f(b) \ge 2f\!\left(\frac{a + b}{2}\right)$, so averaging two variables lowers a sum of convex terms, as the figure shows for $f(x) = x^2$. Moving them apart raises it. A configuration that can always be improved is not optimal, so the optimum lies among the configurations that admit no improving move.

There is one subtle point. Repeating the averaging move forever may only approach equality, never reach it, so a rigorous proof either uses a move that reaches the final state in finitely many steps, such as setting one variable to the mean of all of them, or argues that an optimum exists and then shows it cannot have two unequal variables. For convex objectives, Karamata's Inequality packages the whole argument: a more spread-out list of values gives a larger sum.

## Formulas it uses
- [[jensens-inequality]]: for convex $f$, $f(a) + f(b) \ge 2f\!\left(\frac{a+b}{2}\right)$, the improvement in each smoothing step.
- [[max-product-fixed-sum]]: the result of discrete smoothing, the largest product of positive integers with sum $n$ uses parts $3$ and at most two $2$s.
- [[karamata-inequality]]: compares whole configurations by majorization, the global form of many smoothing steps.

## Common traps
- Smoothing in the wrong direction: a concave objective is maximized at equal values but minimized at a boundary.
- Breaking the constraint with the move, for example averaging two variables when the constraint is a fixed product.
- Assuming a minimum exists on an open domain where it may only be approached.
- Forgetting that integer problems need integer moves, as with the $2 + 2$ and $3 + 3$ swaps above.

## Contest profile
Behind many AIME optimization answers as an unstated step, and an olympiad method in its own right when the equality case must be proved rather than guessed.
`,

"evenly-spaced-angle-products": String.raw`## Why it works
Writing each sine as complex exponentials turns an equally spaced product into a factorization of $z^n-1$ (or $z^n+1$), which collapses to a single $\sin n\theta$; the constant $\frac{1}{2^{\,n-1}}$ is exactly what that factorization leaves behind.

## How to use it
Spot sines, cosines, or tangents at a common spacing $\frac{k\pi}{n}$ and replace the product with one term: the $n=3$ identity $\sin\theta\sin(60^\circ-\theta)\sin(60^\circ+\theta)=\frac14\sin 3\theta$ is the most common, and $\prod_{k=1}^{n-1}\sin\frac{k\pi}{n}=\frac{n}{2^{\,n-1}}$ evaluates "the product of all those sines."

## On contests
An AIME/olympiad trig gem; recognizing the equal spacing turns an intimidating product into a one-line evaluation.`,

"cot-tan-telescoping": String.raw`## Why it works
Both identities fall out of the double-angle formulas: $\cot\theta-\cot 2\theta=\csc 2\theta$ and $\tan\theta=\cot\theta-2\cot 2\theta$ each rewrite a term as a difference of the same function at $\theta$ and $2\theta$, so a sum over doubling angles cancels internally.

## How to use it
When a sum has terms like $\csc 2^{k}\theta$ or $2^{k}\tan(2^{k}\theta)$, replace each by its cotangent difference; the sum telescopes to $\cot\theta-2^{\,n}\cot(2^{\,n}\theta)$ (or the cosecant analogue), and you take a limit if it is infinite.

## On contests
A recurring AIME/olympiad "evaluate this trig sum" trick; noticing the doubling angle is the signal to telescope with cotangents.`,

"ramanujan-nested-radical": String.raw`## Why it works
A self-referential radical satisfies its own equation: $x=\sqrt{1+x}$ gives $x=\varphi$. Ramanujan's radical unrolls the identity $n+2=\sqrt{1+(n+1)(n+3)}=\sqrt{1+(n+1)\sqrt{1+(n+2)(n+4)}}$, so starting at $n=1$ the whole tower equals $3$.

## How to use it
For an infinitely repeating radical, set it equal to $x$ and solve the fixed-point equation (then check positivity and convergence). For a patterned nested radical, look for a telescoping identity like Ramanujan's that hands each layer a closed value.

## On contests
An AMC/AIME favorite for the golden-ratio radical and a classic olympiad curiosity for Ramanujan's; the "set it equal to $x$" reflex handles most cases.`,

"symmetric-polynomial-strategies": String.raw`
## When to use
Any question of the form "the roots of this polynomial are $r$, $s$, $t$; find..." where the requested quantity treats the roots alike: sums of powers, sums of reciprocals, or sums such as $\frac{r}{s} + \frac{s}{r}$. The polynomial usually has no nice roots, which is the signal that the problem never wants them found. If swapping two roots changes the expression, it is not symmetric; pair it with its mirror image first. A product over all the roots is faster by [[products-over-roots|evaluation]].

## How
1. Read off the elementary symmetric sums: for $x^3 + ax^2 + bx + c$ they are $e_1 = -a$, $e_2 = b$ and $e_3 = -c$.
2. For a power sum $r^k + s^k + t^k$, climb from $p_1 = e_1$ with Newton's Sums.
3. For a fraction, use a common denominator; both parts are symmetric.
4. Otherwise expand into the $e_k$, starting from $r^2 + s^2 + t^2 = e_1^2 - 2e_2$.

Let $r$, $s$, $t$ be the roots of $x^3 - 2x^2 + 3x - 4$, so $e_1 = 2$, $e_2 = 3$ and $e_3 = 4$. Then $r^2 + s^2 + t^2 = e_1^2 - 2e_2 = 4 - 6 = -2$, negative because two of the roots are complex, and $\frac1r + \frac1s + \frac1t = \frac{rs + st + tr}{rst} = \frac{e_2}{e_3} = \frac34$.

## Why it works
The coefficients of a polynomial are, up to sign, the elementary symmetric sums of its roots. That is Vieta's Formulas, and it is the only information about the roots that the coefficients hold. The Fundamental Theorem of Symmetric Polynomials says that this is enough: every polynomial expression that is unchanged by permuting the roots equals a polynomial in $e_1, \ldots, e_n$. A symmetric target can therefore always be computed from the coefficients, and the only question is how quickly.

Power sums have their own ladder. Each root satisfies the polynomial, so $r^3 = -ar^2 - br - c$, and adding over the roots expresses $p_3$ through $p_2$, $p_1$ and $p_0 = n$; the same step works for every higher power, which is Newton's Sums.

## Formulas it uses
- [[fundamental-theorem-symmetric]]: guarantees that every symmetric expression in the roots is a polynomial in the $e_k$, so the method never gets stuck.
- [[vietas-general]]: identifies each $e_k$ with a coefficient, $e_k = (-1)^k \frac{a_{n-k}}{a_n}$.
- [[newtons-sums]]: converts the $e_k$ into the power sums $p_k = \sum r_i^k$ one step at a time.

## Common traps
- Sign errors in Vieta's Formulas: for a cubic, $e_1 = -\frac{a_2}{a_3}$ and $e_3 = -\frac{a_0}{a_3}$, while $e_2$ has a plus sign.
- Forgetting $p_0 = n$, the number of roots, when Newton's Sums reach back to the constant term.
- Applying the method to an expression that is not symmetric, such as $r^2s + s^2t + t^2r$ alone.

## Contest profile
Usually the whole problem: an AIME question gives a cubic with ugly roots and asks for one symmetric value, and the work is choosing between direct expansion and Newton's Sums.
`,
"products-over-roots": String.raw`
## When to use
Products in which every root of a known polynomial appears in the same factor, such as $(r + 1)(s + 1)(t + 1)$, $(2 - r)(2 - s)(2 - t)$ or $(r^2 + 1)(s^2 + 1)(t^2 + 1)$, and sums of reciprocals $\frac{1}{k - r}$ over all the roots. Expanding these in the elementary symmetric sums works but is long; one evaluation is enough.

## How
1. Write the polynomial in factored form, $P(x) = a_n(x - r_1)\cdots(x - r_n)$.
2. Match each factor of the product to $k - r_i$ for one number $k$, fixing signs: $r_i + 1 = -(-1 - r_i)$.
3. For a quadratic factor such as $r^2 + c^2$, split it as $(r - ci)(r + ci)$ and evaluate at $ci$ and $-ci$.
4. For $\sum \frac{1}{k - r_i}$, compute $\frac{P'(k)}{P(k)}$.

For the roots of $P(x) = x^3 - 2x^2 + 3x - 4$, putting $x = -1$ gives $P(-1) = (-1 - r)(-1 - s)(-1 - t) = -(r + 1)(s + 1)(t + 1)$, so the product is $-P(-1) = 10$. For the roots of $x^3 - 3x + 1$, $\sum \frac{1}{2 - r} = \frac{P'(2)}{P(2)} = \frac{9}{3} = 3$.

{{figure:distances}}

## Why it works
The factored form $P(x) = a_n\prod(x - r_k)$ is an identity: it holds for every number $x$, real or complex. Substituting one value turns the product over all the roots into a single value of $P$. Complex values extend the reach: $r^2 + c^2 = (r - ci)(r + ci)$, so $\prod(r_k^2 + c^2) = \frac{P(ci)P(-ci)}{a_n^2}$, and for real coefficients $P(-ci)$ is the conjugate of $P(ci)$, so the answer is $\frac{|P(ci)|^2}{a_n^2}$, as the figure shows with distances from $i$ to the roots.

Reciprocal sums come from the same identity after taking a logarithm and differentiating: $\ln|P(x)| = \ln|a_n| + \sum\ln|x - r_k|$, so $\frac{P'(x)}{P(x)} = \sum\frac{1}{x - r_k}$.

## Formulas it uses
- [[fundamental-theorem-algebra]]: the factored form $P(x) = a_n\prod(x - r_k)$, valid at every complex number.
- [[complex-basics]]: $P(-ci) = \overline{P(ci)}$ for real coefficients, and $z\bar z = |z|^2$, which finishes products such as $\prod(r^2 + 1)$.
- [[factor-remainder-theorem]]: $P(k)$ is the remainder on division by $x - k$, which is why one evaluation captures the whole product.

## Common traps
- Forgetting the leading coefficient: $\prod(k - r_i) = \frac{P(k)}{a_n}$, not $P(k)$.
- Getting the sign backward: $\prod(r_i - k) = (-1)^n\prod(k - r_i)$.
- Evaluating at $i$ only and forgetting the factor $P(-i)$.

## Contest profile
An AIME favorite: a product such as $\prod(r^2 + 1)$ over ugly roots, where one evaluation at $i$ replaces a page of symmetric algebra.
`,

"even-power-sin-cos-sums": String.raw`## Why it works
Write $u=\sin^2\theta$, $v=\cos^2\theta$, so $u+v=1$. Every symmetric expression in $u$ and $v$ is then a polynomial in the single quantity $uv = \sin^2\theta\cos^2\theta = \tfrac14\sin^2 2\theta$.

Squaring the Pythagorean identity gives $u^2+v^2 = (u+v)^2 - 2uv = 1-2uv$, which is the first formula. For the cubes use $u^3+v^3 = (u+v)^3 - 3uv(u+v) = 1-3uv$, which is the second. Substituting $uv=\tfrac14\sin^2 2\theta$ turns $1-2uv$ into $1-\tfrac12\sin^2 2\theta$ and $1-3uv$ into $1-\tfrac34\sin^2 2\theta$.

That also explains the ranges. Since $0\le\sin^2 2\theta\le 1$, the first sum runs from $\tfrac12$ (at $\theta=45^\circ$, where the two terms are equal) up to $1$ (at the axes), and the second from $\tfrac14$ up to $1$.

## How to use it
The moment an expression is symmetric in $\sin^2$ and $\cos^2$, stop expanding and switch to $p = uv$. Any even-power symmetric combination collapses to a polynomial in $p$, and $p=\tfrac14\sin^2 2\theta$ converts it to a single double angle. This is the fastest route to maxima and minima: extremes occur where $\sin^2 2\theta$ is $0$ or $1$, i.e. at the axes or at $45^\circ$, so you never differentiate.

The same substitution handles differences and mixed powers: $\sin^4\theta-\cos^4\theta = (u-v)(u+v) = u-v = -\cos 2\theta$, for instance. Pushing one step further, $\sin^8\theta+\cos^8\theta = 1-\sin^2 2\theta+\tfrac18\sin^4 2\theta$, which shows the pattern does not stop at the sixth power — it just stops being a single correction term.

## On contests
A staple of AMC 12 and early AIME trigonometry, usually disguised: "find the range of", "compute the maximum of", or a constraint like $\sin^4\theta+\cos^4\theta = \tfrac58$ that you must solve for $\theta$. In that last case, $\tfrac58 = 1-\tfrac12\sin^2 2\theta$ gives $\sin^2 2\theta = \tfrac34$ immediately.`,

"cosecant-cotangent-square-sums": String.raw`## Why it works
The whole derivation rests on one identity connecting the roots of $z^n=1$ to cotangents. Let $\omega = e^{2\pi i/n}$. For $k=1,\dots,n-1$ we have $\frac{1}{1-\omega^{k}} = \frac12 + \frac{i}{2}\cot\frac{k\pi}{n}$. (To see it, factor $1-e^{i\varphi} = -2i\,e^{i\varphi/2}\sin\frac{\varphi}{2}$ and take the reciprocal.) So these $n-1$ complex numbers all share the real part $\tfrac12$, and their imaginary parts are exactly half the cotangents we want. Squaring one of them gives $\left(\frac{1}{1-\omega^{k}}\right)^{2} = \frac14 - \frac14\cot^{2}\frac{k\pi}{n} + \frac{i}{2}\cot\frac{k\pi}{n}$, so the real part of $\sum_k (1-\omega^k)^{-2}$ is $\frac{n-1}{4} - \frac14\sum_k\cot^2\frac{k\pi}{n}$. It remains to compute that sum a second way, from the polynomial itself.

The $\omega^k$ are precisely the roots of $P(z) = \frac{z^n-1}{z-1} = 1+z+\cdots+z^{n-1}$, so $\sum_k \frac{1}{z-\omega^k} = \frac{P'(z)}{P(z)}$ and $\sum_k \frac{1}{(z-\omega^k)^2} = \left(\frac{P'}{P}\right)^{2} - \frac{P''}{P}$. Evaluating at $z=1$ needs only $P(1)=n$, $P'(1)=\sum_{j=1}^{n-1} j = \frac{n(n-1)}{2}$, and $P''(1)=\sum_{j=2}^{n-1} j(j-1) = \frac{n(n-1)(n-2)}{3}$, giving $\sum_k \frac{1}{(1-\omega^k)^2} = \frac{(n-1)^2}{4} - \frac{(n-1)(n-2)}{3}$. Setting the two expressions for the real part equal and solving yields $\sum\cot^2 = \frac{(n-1)(n-2)}{3}$. Finally $\csc^2 = \cot^2+1$ adds $n-1$ to the total, and $\frac{(n-1)(n-2)}{3} + (n-1) = \frac{n^2-1}{3}$.

## How to use it
Recognize the shape first: a sum over $k=1,\dots,n-1$ of a trigonometric function of $k\pi/n$ is a sum over the nontrivial $n$th roots of unity in disguise, and the substitution above is the standard way in. The two results are worth storing as a pair, since $\csc^2 = \cot^2+1$ converts either into the other in one line and problems quote both.

The identity $\frac{1}{1-\omega^k} = \frac12+\frac{i}{2}\cot\frac{k\pi}{n}$ is the reusable part. Taking real parts of $\sum\frac{1}{1-\omega^k} = \frac{n-1}{2}$ recovers $\sum\cot\frac{k\pi}{n}=0$, and pushing the same method to fourth powers gives $\sum\csc^4$, the next sum in the family.

## On contests
Standard AIME fare whenever a problem asks for a closed form of $\sum\csc^2$ or $\sum\cot^2$ at equally spaced angles, and the engine behind several $\sum 1/\sin^2$ evaluations. The same roots-of-unity-to-cotangent bridge is how the Basel sum $\sum 1/k^2 = \pi^2/6$ is proved by elementary means, squeezing $\cot^2$ against $\csc^2$.`,

"shifted-polynomial-construction": String.raw`
## Distinguishing clues
Repeated outputs mean subtracting a constant, and outputs that follow a rule mean subtracting the rule, after clearing denominators when the rule is a fraction: for $f(k) = \frac1k$, work with $xf(x) - 1$. When the values follow no visible rule, the shape is plain interpolation instead, and the [[finite-differences|finite differences]] of the values are the quicker check.

## Methods and Formulas to Try
Subtracting the rule leaves a polynomial with known roots, and known roots are known factors: if $f(a_i) = g(a_i)$ for $i = 1, \ldots, m$, then $$f(x) - g(x) = (x - a_1)\cdots(x - a_m)\,Q(x),$$ and when $f$ has the higher degree, $\deg Q = \deg f - m$, so comparing degrees counts what is left to find.

### Methods to try
- [[subtract-and-factor]]: subtract the rule from the polynomial so that every listed point becomes a root, write the difference as the product of those linear factors times an unknown polynomial, and pin down the unknown part by comparing degrees or plugging in one more value.
- [[lagrange-interpolation]]: when no subtraction leaves roots, build the polynomial directly through the given points, or evaluate it only at the one point the question asks about.

### Formulas to try
- [[factor-remainder-theorem]]: $f(a) = 0$ exactly when $x - a$ divides $f(x)$, which turns each point where the polynomial agrees with the rule into a factor of the difference.
- [[lagrange-interpolation-formula]]: writes the unique polynomial of degree less than $n$ through $n$ given points as a sum of one term per point.

## Common traps
- Expanding the product instead of evaluating the factored form.
- Forgetting the unknown factor $Q(x)$ when fewer points are given than the degree.
- Reading too much into agreement at too few points: two values pin down a line, not a quadratic.

## Contest profile
Rarely the whole solution: the factored form is the setup, and bounding or counting the remaining factor finishes it.
`,

"forced-difference-of-squares": String.raw`
## When to use
Factoring $x^4 + x^2 + 1$, $x^4 + 4$ or $n^4 + 4^n$; showing that numbers like $n^4 + 4$ are composite for $n > 1$; and simplifying products or sums whose terms are such quartics, which then telescope.

## How
1. Find the square the outer terms suggest: for $x^4 + 4$ the outer terms are the squares of $x^2$ and $2$, so the target is $(x^2 + 2)^2$.
2. Compare middle terms: $(x^2 + 2)^2$ has $4x^2$, which the expression lacks.
3. Add and subtract the missing term: $x^4 + 4 = (x^2 + 2)^2 - 4x^2$.
4. If the subtracted term is a perfect square, factor: $(x^2 - 2x + 2)(x^2 + 2x + 2)$.

Is $n^4 + 4$ ever prime for $n > 1$? It factors as $(n^2 - 2n + 2)(n^2 + 2n + 2)$, and for $n > 1$ the smaller factor is $(n - 1)^2 + 1 \ge 2$, so the number is composite; only $n = 1$ gives a prime, $5$.

## Why it works
A quartic with no odd-degree terms is close to a perfect square: its outer terms are squares, and only the middle term is off. Adding and subtracting the difference leaves the value unchanged and writes the expression as $A^2 - B$. When $B$ is a perfect square $C^2$, the difference of squares $A^2 - C^2 = (A - C)(A + C)$ factors it. The constant in $a^4 + 4b^4$ is exactly what makes the leftover $4a^2b^2 = (2ab)^2$ a square, which is why $a^4 + 4b^4$ factors while $a^4 + b^4$ does not. The figure shows the identity for $x^4 + x^2 + 1$ as a square with a strip of area $x^2$ removed.

## Formulas it uses
- [[difference-of-squares]]: $A^2 - C^2 = (A - C)(A + C)$, the factorization the method forces.
- [[sophie-germain]]: $a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2)$, the best-known instance.
- [[square-of-sum]]: expands the target square, so the missing middle term can be read off.

## Common traps
- Forcing the difference when the leftover is not a perfect square, as for $x^4 + 3x^2 + 1$ with target $(x^2 + 1)^2$, where the method does not factor over the integers.
- Choosing a target square whose outer terms do not match the expression.
- Forgetting to check the small cases, where one factor can equal $1$.

## Contest profile
Rare but decisive: it supplies the factorization that makes a product telescope or a number composite.
`,

"log-substitution": String.raw`
## When to use
Equations such as $\log_2^2 x - 3\log_2 x + 2 = 0$ or $\log_x 4 + \log_4 x = \frac52$, systems in $\log_a b$ and $\log_b a$, and equations with the unknown in both a base and an exponent, such as $x^{\log_2 x} = 16$, which become one of these after taking logarithms of both sides. The signal is one logarithm, or one logarithm and its reciprocal, appearing again and again.

## How
1. Rewrite every logarithm in one base, using the change of base formula.
2. Name the repeated quantity, $u = \log_b x$, or $t = \log_a b$ when $\log_b a = \frac1t$ also appears.
3. Solve the polynomial or rational equation in the new variable.
4. Convert each root back with $x = b^u$, and check it in the original equation, where arguments must be positive and bases positive and different from $1$.

Solve $\log_x 4 + \log_4 x = \frac52$. With $t = \log_4 x$, the first term is $\frac1t$, so $\frac1t + t = \frac52$, that is $2t^2 - 5t + 2 = 0$, with roots $t = 2$ and $t = \frac12$. So $x = 16$ or $x = 2$, and both are valid bases.

## Why it works
Logarithms turn multiplication into addition and powers into multiples: $\log(xy) = \log x + \log y$ and $\log x^k = k\log x$. So any quantity built from $x$ and constants by multiplying, dividing and raising to fixed powers has a logarithm that is linear in $\log x$, and an equation that combines such logarithms with arithmetic is a polynomial equation in the single unknown $\log x$. The reciprocal pair works because $\log_a b \cdot \log_b a = 1$, which is the change of base formula.

The final check is not optional. The new variable ranges over all real numbers, while the original equation needs positive arguments and bases other than $1$, so a root of the polynomial can give an $x$ the original equation cannot accept.

## Formulas it uses
- [[log-rules]]: $\log(xy) = \log x + \log y$ and $\log x^k = k\log x$, which make the equation polynomial in one logarithm.
- [[change-of-base]]: $\log_a b = \frac{\log b}{\log a}$, which puts every logarithm in one base and gives $\log_b a = \frac{1}{\log_a b}$.
- [[exponent-laws]]: $x = b^u$ converts each solution back, and $(b^u)^v = b^{uv}$ handles unknowns in exponents.

## Common traps
- Skipping the final check, and keeping a root that makes an argument negative or a base equal to $1$.
- Confusing $\log^2 x$, the square of the logarithm, with $\log x^2 = 2\log x$.
- Forgetting that $\log_b x$ can be negative, so a negative root $u$ is usually a valid solution.

## Contest profile
Usually the first step of an AIME logarithm problem: once the repeated logarithm is named, a quadratic and Vieta's Formulas finish.
`,

"normalization": String.raw`
## When to use
Homogeneous inequalities such as $\frac{a}{b + c} + \frac{b}{c + a} + \frac{c}{a + b} \ge \frac32$, where nothing changes if every variable is doubled; homogeneous optimization problems; and geometry problems asking for a ratio, where one length may be set to $1$. The opposite situation, a constraint with terms of different degrees, calls for [[homogenization|homogenization]].

## How
1. Check homogeneity: replacing every variable $a$ by $ta$ should multiply each side by the same power of $t$.
2. Impose the scale that most simplifies the expression, such as $a + b + c = 1$, $abc = 1$ or $a = 1$.
3. Prove the simplified statement.
4. Note that scaling carries it back to every choice of the variables.

Prove $\frac{a}{b + c} + \frac{b}{c + a} + \frac{c}{a + b} \ge \frac32$ for positive reals. The left side is homogeneous of degree $0$, so take $a + b + c = 1$; it becomes $\sum \frac{a}{1 - a}$. The function $\frac{x}{1 - x}$ is convex on $(0, 1)$, so by Jensen's Inequality the sum is at least $3 \cdot \frac{1/3}{2/3} = \frac32$.

## Why it works
An expression is homogeneous of degree $d$ if $f(ta, tb, tc) = t^d f(a, b, c)$. If both sides of an inequality are homogeneous of degree $d$ and it holds whenever $a + b + c = 1$, then for any positive $a$, $b$, $c$ with sum $S$, apply it to $\frac aS$, $\frac bS$, $\frac cS$ and multiply by $S^d$: it holds everywhere. The same argument works for any normalization that a scaling can reach, such as $abc = 1$.

## Formulas it uses
- [[am-gm]]: homogeneous on both sides, so it applies cleanly after normalizing, as in $a + b + c \ge 3$ under $abc = 1$.
- [[jensens-inequality]]: after normalizing the sum, a sum of one-variable terms is bounded by the value at the average.

## Common traps
- Normalizing an expression that is not homogeneous, which changes the two sides differently.
- Imposing two normalizations at once, such as $a + b + c = 1$ and $abc = 1$, which a single scaling cannot achieve.
- Dividing by a quantity whose sign is not known when scaling.

## Contest profile
Mostly olympiad inequalities, as the first line of a proof, and AIME geometry ratios, where one length is set to $1$.
`,
"homogenization": String.raw`
## When to use
Constrained inequalities with terms of different degrees, such as "$a + b + c = 3$; prove $a^3 + b^3 + c^3 \ge a^2 + b^2 + c^2$" or "$abc = 1$; prove $a^2 + b^2 + c^2 \ge a + b + c$". The classical tools for symmetric inequalities, Muirhead, Schur, and SOS, need every term to have the same degree, so the degrees must be leveled first. A problem that is already homogeneous calls for [[normalization|normalization]] instead.

## How
1. List the degree of every term.
2. Rewrite each constant as the constraint's expression raised to the right power: under $a + b + c = 3$, $1 = \frac{a + b + c}{3}$; under $abc = 1$, $1 = (abc)^{1/3}$ or a suitable power.
3. Multiply each low-degree term by that expression until all terms share the top degree.
4. Prove the homogeneous inequality for all positive variables, usually by expanding and using Muirhead, Schur, or SOS.

Prove that $a + b + c = 3$ implies $a^2 + b^2 + c^2 \ge 3$. Under the constraint, $3 = \frac{(a + b + c)^2}{3}$, so the claim is $3(a^2 + b^2 + c^2) \ge (a + b + c)^2$, which expands to $(a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$, true for all real numbers.

## Why it works
On the constraint set the inserted factor equals $1$, so the homogenized inequality says exactly the same thing there as the original. Off the constraint set it says more, but a homogeneous inequality that holds at one scale holds at every scale, so proving the stronger homogeneous statement for all positive variables proves the original. The gain is access to inequalities such as Muirhead's, which compare symmetric sums of one degree and say nothing otherwise.

## Formulas it uses
- [[muirheads-inequality]]: compares symmetric sums of the same degree, the usual finish once the degrees match.
- [[schurs-inequality]]: a homogeneous degree-$3$ inequality, often the missing piece after homogenizing.
- [[am-gm]]: supplies homogeneous bounds term by term, as in $a^3 + b^3 \ge a^2b + ab^2$.

## Common traps
- Using the wrong power of the constraint, so the degrees still do not match.
- Homogenizing with a factor that is not positive, which can reverse the inequality.
- Forgetting that a fractional power, such as $(abc)^{1/3}$, may make the expansion awkward; a substitution such as $a = x^3$ can clear it.

## Contest profile
An olympiad first step for constrained inequalities: level the degrees, then expand and finish with Muirhead, Schur, or SOS.
`,

"sqrt-approximation": String.raw`
## When to use
Estimating a square root by hand to two or more decimals, comparing a root with a fraction or a decimal, finding the integer nearest to $\sqrt N$ or to a sum of roots, and bounding expressions such as $\sqrt{n^2 + n}$ between two simple values. It also explains why $\sqrt{n^2 + k}$ is just above $n + \frac{k}{2n}$ in many floor-function problems.

## How
1. Find the largest perfect square $a^2$ not exceeding the number, and write the number as $a^2 + b$.
2. For a first estimate, use $a + \frac{b}{2a}$, which is slightly too large.
3. For a lower bound, use $a + \frac{b}{2a + 1}$, valid whenever $b \le 2a + 1$.
4. For more digits, refine: $\sqrt{a^2 + b} = a + \frac{b}{a + \sqrt{a^2 + b}}$, with the latest estimate substituted on the right; equivalently, average the estimate $x$ with $\frac Nx$.

Estimate $\sqrt{53}$. Here $53 = 7^2 + 4$. The bounds give $7 + \frac{4}{15} \le \sqrt{53} \le 7 + \frac{4}{14}$, that is $7.267 \le \sqrt{53} \le 7.286$. One refinement, $7 + \frac{4}{7 + 7.286} = 7.2800$, is correct to four decimals, since $\sqrt{53} = 7.28011\ldots$.

{{figure:between}}

## Why it works
With $x = \sqrt{a^2 + b}$, the difference of squares gives $(x - a)(x + a) = b$, so $x = a + \frac{b}{x + a}$ exactly. Replacing $x$ on the right by $a$ makes the denominator too small and the estimate too large: $a + \frac{b}{2a}$. Replacing it by $a + 1$, which is at least $x$ when $b \le 2a + 1$, makes the denominator too large and the estimate too small: $a + \frac{b}{2a + 1}$.

The figure shows both bounds as lines. The upper bound is the tangent to $y = \sqrt x$ at $x = a^2$, which lies above the curve because the curve bends down. The lower bound is the chord from $(a^2, a)$ to $((a + 1)^2, a + 1)$, which lies below it for the same reason. The refinement step is the Babylonian method: if $x$ is too large, then $\frac Nx$ is too small, and their average is closer than either, never below $\sqrt N$ by AM-GM.

## Formulas it uses
- [[difference-of-squares]]: $(x - a)(x + a) = b$, which gives the exact identity $x = a + \frac{b}{x + a}$.
- [[generalized-binomial-series]]: $\sqrt{1 + t} = 1 + \frac t2 - \frac{t^2}{8} + \cdots$, the same first-order estimate written as a series, with the size of the error.
- [[am-gm]]: $\frac12\left(x + \frac Nx\right) \ge \sqrt N$, so each Babylonian step stays above the root.

## Common traps
- Using the lower bound $a + \frac{b}{2a + 1}$ when $b > 2a + 1$, where $a$ was not the right integer.
- Forgetting that $a + \frac{b}{2a}$ always overestimates, which decides close comparisons the wrong way.
- Rounding intermediate results too early, which wastes the digits the refinement gains.
- Choosing $a$ above the root, which makes $b$ negative and flips the direction of both bounds.

## Contest profile
A MATHCOUNTS and AMC skill for nearest-integer and comparison questions, and a supporting step in AIME floor problems involving $\sqrt{n^2 + k}$.
`,
"double-summation": String.raw`
## When to use
Sums of divisor functions such as $\sum_{n \le N} d(n)$ or $\sum_{n \le N}\sigma(n)$; sums with inner limits that depend on the outer index, such as $\sum_{i=1}^{n}\sum_{j=i}^{n}$; sums over pairs, such as $\sum_{i \lt j}a_ia_j$; and single sums whose terms are themselves counts or sums, such as $\frac{n}{2^n}$, read as $n$ copies of $\frac{1}{2^n}$. The signal is a sum that is awkward in the order written but would be easy if the roles of the two indices were exchanged.

## How
1. Write the region of index pairs as a set of conditions, such as $\{(n, d) : d \mid n,\ n \le N\}$.
2. Choose the other index to be the outer one, and rewrite the limits for the inner sum.
3. If the summand factors as $f(i)g(j)$ over a rectangle, split it into $\left(\sum f(i)\right)\left(\sum g(j)\right)$.
4. Check the new limits on a small case before computing.

Compute $\sum_{n=1}^{\infty}\frac{n}{2^n}$. Write $\frac{n}{2^n}$ as a sum of $n$ copies of $\frac{1}{2^n}$, one for each $k$ with $1 \le k \le n$. The pairs $(k, n)$ with $1 \le k \le n$ can be summed by $k$ first: $$\sum_{k=1}^{\infty}\sum_{n=k}^{\infty}\frac{1}{2^n} = \sum_{k=1}^{\infty}\frac{2}{2^k} = 2.$$

{{figure:grid}}

## Why it works
A finite double sum adds one number for each pair in a region, and addition does not depend on order. Summing by rows and summing by columns visit the same pairs, as the figure shows, so the totals agree. For infinite sums of nonnegative terms the same holds. The work is entirely in describing the region correctly from the other side.

Swapping pays when one direction has structure the other hides. For each $n$, the divisors of $n$ are irregular, but for each $d$, its multiples up to $N$ are simply $d, 2d, \ldots$, and there are $\left\lfloor\frac Nd\right\rfloor$ of them. So $\sum_{n \le N}d(n) = \sum_{d \le N}\left\lfloor\frac Nd\right\rfloor$, and $\sum_{n \le N}\sigma(n) = \sum_{d \le N}d\left\lfloor\frac Nd\right\rfloor$.

Pair sums use a different region, the off-diagonal part of a square: $\sum_{i \ne j}a_ia_j = \left(\sum a_i\right)^2 - \sum a_i^2$, and the pairs with $i \lt j$ are half of it.

## Formulas it uses
- [[floor-multiples]]: $d$ has $\left\lfloor\frac Nd\right\rfloor$ multiples up to $N$, the length of each column after a divisor-sum swap.
- [[number-of-divisors]]: $d(n)$ is the inner count that the swap replaces.
- [[sum-of-divisors]]: $\sigma(n) = \sum_{d \mid n} d$, which swaps to $\sum_d d\left\lfloor\frac Nd\right\rfloor$.
- [[square-of-sum]]: $\left(\sum a_i\right)^2 = \sum a_i^2 + 2\sum_{i \lt j}a_ia_j$, the square region split into its diagonal and two triangles.

## Common traps
- Getting the new limits wrong: the region $1 \le k \le n$ swaps to $n \ge k$, not $n \ge 1$.
- Factoring a summand over a region that is not a rectangle, where the limits still depend on each other.
- Forgetting the diagonal, or counting it twice, when splitting a square into $i \lt j$ and $i > j$.
- Swapping an infinite sum with terms of both signs without checking that it converges absolutely.

## Contest profile
A supporting move in AIME sums and in number theory: swapping a divisor sum into a floor sum is the standard first line, and reading a weighted sum as a double sum often replaces a clever trick.
`,

"triangular-numbers": String.raw`
## Why it works
Writing the sum forwards and backwards pairs its ends: $1$ with $n$, $2$ with $n - 1$, and so on, $n$ pairs each adding to $n + 1$, so twice the sum is $n(n + 1)$. Choosing two of $n + 1$ objects gives the same count, $\binom{n + 1}{2}$.

Two staircases, of heights $1$ to $n - 1$ and $1$ to $n$, interlock exactly into an $n \times n$ square, which is $T_{n-1} + T_n = n^2$.

{{figure:staircases}}

For the test, multiply $T = \frac{n(n + 1)}{2}$ by $8$ and add $1$: $$8T + 1 = 4n^2 + 4n + 1 = (2n + 1)^2.$$ So a triangular number always gives an odd square, and an odd square $(2n + 1)^2$ always comes from $T_n$.

## How to use it
Recognize the shape rather than the formula: any count of pairs, handshakes, or unordered choices of two is triangular, as on [[handshakes-diagonals|the handshakes card]].

To test a number, check whether $8T + 1$ is an odd square and read off $n = \frac{\sqrt{8T + 1} - 1}{2}$. For $5050$, $8 \cdot 5050 + 1 = 40401 = 201^2$, so it is $T_{100}$; for $5051$, $40409$ falls strictly between $201^2$ and $202^2$, so it is not triangular.

A sequence whose second differences are constantly $1$ is $T_n$ plus a linear term, so fit that form rather than solving for three unknown coefficients.

## On contests
Four problems here, split between AMC and AIME, one solved by it alone; two combine it with [[modular-basics|modular arithmetic]]. Sums of the first $n$ integers turn up constantly inside larger arguments; the general sum is on [[arithmetic-series|the arithmetic series card]], and [[power-sums|the power sums]] carry squares and cubes.
`,

"multi-leg-rates": String.raw`
## Distinguishing clues
The speed changes during the trip, or two travelers cover overlapping routes at different speeds. A single trip at one speed is plain distance equals rate times time; two objects moving at once toward or away from each other is relative motion, and a question that asks only for the speed over the whole trip is average speed. Work problems with jobs in place of distances follow the same arithmetic.

## Methods and Formulas to Try
The quantities that add are distances and times; speeds never add. So the setup is a list of legs, each with its own distance, speed, and time, tied together by the total distance and the total time. Two travelers on the same route give two such equations, and subtracting them cancels the shared legs.

{{figure:legs}}

### Methods to try
- [[time-per-leg]]: cut the trip wherever the speed changes, write each leg's time as $\frac{d_i}{v_i}$, and add the times and the distances.

### Formulas to try
- [[average-speed]]: total distance over total time, harmonic for equal distances, never the plain average of the speeds.
- [[relative-motion]]: two travelers approaching each other close the gap at the sum of their speeds.
- [[work-rates]]: the same additive structure with jobs in place of distances, where rates add and times do not.

## Common traps
- Averaging speeds, as in $\frac{4 + 8}{2} = 6$, instead of dividing total distance by total time.
- Mixing units, such as minutes in one leg and hours in another.
- Forgetting a leg, such as the return trip or a wait.
- Setting the times equal when the travelers started at different moments.

## Contest profile
A MATHCOUNTS and AMC 10 staple, usually one or two linear equations; AIME versions add a meeting point or several travelers.
`,




"determinant-basics": String.raw`## Why it works
The determinant is the one function of the rows that is linear in each row, flips sign when two rows swap, and gives $1$ on the identity. Those three demands pin it down completely, and every formula for it follows: $ad - bc$ for a $2 \times 2$, Sarrus for a $3 \times 3$, [[cofactor-expansion|cofactor expansion]] in general. Sign-flipping on a swap forces the value to vanish when two rows are equal, and linearity then extends that to any dependent set, which is why $\det = 0$ means exactly that one row is a combination of the others.

## How to use it
Reach for the properties before the formula. Row operations of the add-a-multiple kind cost nothing, so use them to manufacture zeros and then expand along the sparsest row. Remember $\det(AB) = \det A \cdot \det B$, which turns a product you cannot compute into two you can, and $\det(A^{\top}) = \det A$, which lets any row argument be run on columns instead. Sarrus's rule is a $3 \times 3$ accident and does not generalize; trying to extend the diagonal pattern to $4 \times 4$ is a standard and silent error.

## On contests
Determinants are not on the AMC or AIME syllabus, yet this library invokes one on eight cards, and a tridiagonal matrix whose determinant is asked for outright is a recurring AIME shape. There the determinant is never the difficulty, only the notation the difficulty arrives in, and the actual work is turning it into a recurrence. The other common sighting is quieter, since [[shoelace-formula|the shoelace formula]] and [[cross-product-area|the cross product]] are both determinants wearing other names.`,

"determinant-geometric": String.raw`## Why it works
Area is linear in each edge of a parallelogram and reverses sign when the two edges swap roles, which is the same short list of demands that defines the determinant, so the two must agree. Reading it that way makes the collinearity test obvious rather than memorized: three points span a triangle of zero area exactly when they lie on one line, and the determinant of the two edge vectors is twice that area. One dimension up, the $3 \times 3$ determinant is the signed volume of the parallelepiped, so it vanishes exactly when four points are coplanar.

## How to use it
Use the sign, not just the size. A positive value means $A$, $B$, $C$ run counterclockwise, which is how a convex-hull or orientation argument is actually carried out, and taking absolute values too early throws that away. For the collinearity of three points, expanding $\det = 0$ gives a linear relation in the coordinates and is usually cleaner than equating two slopes, since it never needs a vertical-line case. The area-scaling reading is the missing sentence on [[affine-transformations|affine transformations]], which says a linear map multiplies every area by one constant: that constant is $\lvert \det \rvert$.

## On contests
This is the card behind two things AIME asks constantly. [[shoelace-formula|Shoelace]] is this determinant summed around a polygon, and some problems turn on the parity or divisibility of $x_1y_2 - x_2y_1$ rather than on any area at all. The collinearity test is the quieter use, and it is worth reaching for whenever a problem says three points are collinear and you would otherwise write two slope equations.`,

"matrix-multiplication": String.raw`## Why it works
A matrix is a linear map written in coordinates, and the product is what you get by doing one map after the other: entry $(i,j)$ of $AB$ asks where basis vector $j$ goes under $B$ and then reads off coordinate $i$ after $A$. Composition of maps is associative, so matrix multiplication is, and it is not commutative for the same reason rotating then reflecting differs from reflecting then rotating. The sum over the intermediate index $k$ is the whole content of the definition.

## How to use it
The counting reading is the one worth having on sight. If $A$ is an adjacency matrix, $(A^n)_{ij}$ counts walks of length $n$ from $i$ to $j$, because the sum over $k$ is precisely "choose where the walk stood one step earlier". That is the engine inside [[transfer-matrix-method|the transfer matrix method]], and it converts a tiling or no-two-adjacent count into a matrix power. To evaluate that power, do not multiply $n$ times: either square repeatedly, or use [[eigenvalues-characteristic|the eigenvalues]] to get a closed form.

## On contests
Matrices themselves are essentially never asked for on the AMC or AIME. They appear as the machinery under a counting card, which is why the useful fact is not how to multiply two matrices but what a matrix power means. If a problem gives a small state machine and asks for long-run counts, the matrix is available, but so is the [[linear-recurrence|linear recurrence]] it produces, and solving the recurrence is usually the shorter road.`,

"cramers-rule": String.raw`## Why it works
Replace column $i$ of $A$ by $\mathbf{b} = \sum_j x_j (\text{column } j)$ and expand using linearity in that column. Every term except the $j = i$ one has a repeated column and so contributes zero, leaving $\det A_i = x_i \det A$. The rule is therefore not a separate theorem, just [[determinant-basics|column linearity]] applied once.

## How to use it
It earns its keep when a problem asks for one unknown out of three and you would otherwise eliminate the other two. Writing the single quotient is faster and far less error-prone than two rounds of substitution. It is also the cleanest statement of solvability: $\det A \ne 0$ gives exactly one solution, and $\det A = 0$ gives none or infinitely many, with the two cases separated by whether $\mathbf{b}$ respects the same dependence the rows do. For a system that is symmetric rather than generic, do not use this at all, since [[symmetric-linear-system|adding all the equations]] is a line of work instead of a page.

## On contests
Roughly eighteen problems in this library's database solve a system somewhere in the middle of a solution, and almost none of them need a general method, because contest systems are small and usually structured. Treat Cramer as the fallback when the structure genuinely is not there, and check for the symmetric shape first.`,

"eigenvalues-characteristic": String.raw`## Why it works
$A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v} \ne \mathbf{0}$ says $(A - \lambda I)$ kills a nonzero vector, so its rows are dependent and its determinant vanishes. Expanding $\det(A - \lambda I)$ gives a degree-$n$ polynomial in $\lambda$ whose roots are exactly the eigenvalues. [[vietas-general|Vieta's Formulas]] on that polynomial then hand you the two identities worth memorizing, since the coefficient of $\lambda^{n-1}$ is the trace and the constant term is the determinant.

## How to use it
Use eigenvalues when you need $A^n$, not when you need $A$. If $A = PDP^{-1}$ with $D$ diagonal then $A^n = PD^nP^{-1}$, so each eigenvalue is simply raised to the $n$, and the entries of $A^n$ become a fixed combination of $\lambda_1^n, \ldots, \lambda_k^n$. That is the same shape as the closed form of a linear recurrence, and it is not a coincidence: the characteristic polynomial of the transfer matrix is the characteristic equation of the recurrence.

## On contests
Olympiad-adjacent only, and it appears in this library as the machinery two cards already lean on. [[matrix-tree-theorem|The matrix-tree theorem]] states the spanning-tree count as a product of Laplacian eigenvalues, and the transfer matrix gets its recurrence from $\det(xI - M) = 0$. If you are reading either of those, this is the card that makes the sentence mean something.`,

"symmetric-linear-system": String.raw`
## Distinguishing clues
The equations are copies of one another with the variables relabeled or rotated, and their number equals the number of variables. A general linear system with unrelated coefficients needs elimination; here the structure does the elimination. Nonlinear symmetric systems such as $x + y + z = 6$, $xy + yz + zx = 11$, $xyz = 6$ belong to [[vietas-general|Vieta's Formulas]] instead.

## Methods and Formulas to Try
Adding every equation treats the variables alike, so the sum collapses into a multiple of the total $S$ of the variables. Subtracting two equations then isolates a difference, and each original equation, rewritten with $S$, gives one variable. A cyclic system in which each equation links one variable to the next closes up after going once around.

{{figure:columns}}

### Methods to try
- [[add-all-equations]]: add (or multiply) all the equations so the symmetric parts become a multiple of the total, then return to one equation at a time.

### Formulas to try
- [[cramers-rule]]: confirms that the system has a unique solution exactly when the determinant is nonzero, which fails when adding all equations gives $0 = 0$.
- [[determinant-basics]]: the determinant of a cyclic coefficient matrix factors, and one factor is the column sum that the addition step produces.

## Common traps
- Dividing by the coefficient of $S$ after adding, when that coefficient is $0$ and the system has no unique solution.
- Solving for every variable when the question asks only for the total.
- Miscounting how many times each variable appears in the added equation.

## Contest profile
A short AMC problem, often with four or five variables to make elimination tedious, and an occasional AIME first step.
`,

"cofactor-expansion": String.raw`
## When to use
Determinants of size $4$ or more; determinants with a row or column of mostly zeros; families $D_n$ of $n \times n$ determinants with a banded pattern, such as $2$ on the diagonal and $1$ beside it; and determinants with a variable in some entries, such as characteristic polynomials, where expanding along the variable's row keeps the algebra organized.

## How
1. Pick the row or column with the most zeros. If none is sparse, create zeros by adding multiples of one row to another, which leaves the determinant unchanged.
2. For each nonzero entry $a_{ij}$ in that line, delete its row and column to get the minor $M_{ij}$, and attach the sign $(-1)^{i+j}$ from the checkerboard pattern.
3. Add the terms $a_{ij}(-1)^{i+j}M_{ij}$, and evaluate each minor the same way.
4. For a banded family, expand $D_n$ along the first row, identify the smaller determinants as $D_{n-1}$ and $D_{n-2}$, and solve the resulting recurrence.

For the $n \times n$ matrix with $2$ on the diagonal and $1$ on both neighboring diagonals, expanding along the first row gives $2D_{n-1}$ from the corner entry. The entry beside it gives $-1$ times a minor whose first column has a single $1$, which expands to $D_{n-2}$. So $D_n = 2D_{n-1} - D_{n-2}$, with $D_1 = 2$ and $D_2 = 3$, and the solution is $D_n = n + 1$.

{{figure:expand}}

## Why it works
A determinant is linear in each row, so the chosen row can be split into its entries, giving a sum of determinants that each have a single nonzero entry in that row. In each of them, the entry can be moved to the top left corner by $i + j - 2$ swaps of adjacent rows and columns, and each swap changes the sign, which produces the factor $(-1)^{i+j}$. A determinant whose first row is $(a, 0, \ldots, 0)$ equals $a$ times the determinant of what remains, the minor.

Since the determinant of a matrix equals that of its transpose, the same expansion works down any column, and every choice gives the same value. That freedom is the whole strategy: expand where the zeros are.

## Formulas it uses
- [[determinant-basics]]: the $2 \times 2$ and $3 \times 3$ formulas that finish every expansion, and the row operations that leave the determinant unchanged.
- [[linear-recurrence]]: solves the recurrence $D_n = aD_{n-1} - bD_{n-2}$ that a banded family produces.

## Common traps
- Getting the checkerboard signs wrong, especially when expanding along a column or a middle row.
- Multiplying a row by a constant during row reduction and forgetting that this scales the determinant.
- Misidentifying a minor as $D_{n-1}$ when its first row or column differs from the pattern.
- Expanding a dense matrix directly, which takes $n!$ terms, instead of first creating zeros.

## Contest profile
Rare in AMC and AIME, which seldom use matrices; it appears in olympiad and college-style problems, most often as the recurrence for a banded family.
`,

"polynomial-crt": String.raw`
## Key forms
- $P(x) \bmod (x-a)(x-b) = P(a) + \frac{P(b)-P(a)}{b-a}(x-a)$ — two values give the linear remainder, for $a \ne b$
- $P(x) \bmod (x-a)^2 = P(a) + P'(a)(x-a)$ — a repeated factor takes the derivative in place of a second value
- $P(i) = u + vi \implies P(x) \bmod (x^2+1) = vx + u$ — for $P$ with real coefficients, evaluate at a root of the quadratic

## Conditions
The moduli must be coprime. Distinct linear factors $x - a$ and $x - b$ always are; a repeated factor $(x-a)^2$ is not coprime to itself, so the value $P(a)$ alone cannot fix the remainder, and the derivative supplies the second condition.

## Why it works
Divide by the product and look at what survives when the product vanishes.

Write $P(x) = (x-a)(x-b)Q(x) + R(x)$ with $\deg R \le 1$. Putting $x = a$ and then $x = b$ kills the first term, so $R(a) = P(a)$ and $R(b) = P(b)$, and a line is fixed by two of its points.

For coprime moduli $m_1, m_2$ in general, two polynomials with the same remainders differ by a multiple of $m_1$ and of $m_2$, hence of $m_1 m_2$, so at most one remainder of degree below $\deg m_1 m_2$ fits; and a combination $r_1 t\, m_2 + r_2 s\, m_1$, with $s\, m_1 + t\, m_2 = 1$, has both remainders, so one does.

For the repeated factor, differentiate $P(x) = (x-a)^2 Q(x) + R(x)$: every term of the derivative of $(x-a)^2 Q(x)$ still contains $x - a$, so $P'(a) = R'(a)$.

## Useful observations
- Modulo a product of $k$ distinct linear factors, the remainder is the polynomial of degree less than $k$ through the $k$ values, which the [[lagrange-interpolation-formula|Lagrange Interpolation Formula]] writes down directly.
- Only the values at the roots of the modulus matter, so a polynomial given by an enormous formula is reduced by evaluating it, never by dividing.
`,
});
