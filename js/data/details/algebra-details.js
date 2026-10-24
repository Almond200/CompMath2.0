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
Each basis polynomial $L_i(x) = \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}$ has degree $n - 1$, vanishes at every $x_j$ with $j \ne i$, and equals $1$ at $x_i$. So $y_1L_1 + \cdots + y_nL_n$ takes the value $y_i$ at each $x_i$. With two points this is the line through them, and putting $x = 0$ turns each factor into $\frac{-x_j}{x_i - x_j} = \frac{x_j}{x_j - x_i}$, which is the $P(0)$ form.

Uniqueness: if two polynomials of degree at most $n - 1$ agree at $n$ points, their difference has degree at most $n - 1$ and $n$ roots, so it is zero.

## Useful observations
- A polynomial of degree at most $n - 1$ is determined by any $n$ of its values, so a question about one more value has exactly one answer, whatever method finds it.
- When the values follow a pattern at the given points, subtracting the pattern first is usually faster than the formula; see [[subtract-and-factor|building a polynomial from equal values]].
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
## Key forms
- $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ — the solutions of $ax^2 + bx + c = 0$
- $\Delta = b^2 - 4ac$ — the discriminant, the number under the square root
- $\Delta > 0$: two distinct real roots; $\Delta = 0$: one repeated real root; $\Delta < 0$: two complex conjugate roots
- integer coefficients: the roots are rational exactly when $\Delta$ is a perfect square

## Conditions
$a \ne 0$. The cases for $\Delta$ describe real coefficients; the rationality test needs integer (or rational) coefficients.

## Why it works
Completing the square turns any quadratic into a square equal to a number, and a square equal to a number is solved by taking a square root.

Divide $ax^2 + bx + c = 0$ by $a$, which is allowed because $a \ne 0$, to get $x^2 + \frac bax + \frac ca = 0$. The first two terms are almost a perfect square: $$\left(x + \frac{b}{2a}\right)^2 = x^2 + \frac bax + \frac{b^2}{4a^2},$$ which is short only the constant $\frac{b^2}{4a^2}$. Adding that constant to both sides and moving $\frac ca$ across gives $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2}{4a^2} - \frac ca = \frac{b^2 - 4ac}{4a^2}.$$ Taking square roots, $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$, and subtracting $\frac{b}{2a}$ gives the formula.

{{figure:complete-square}}

The figure shows where the name comes from. The expression $x^2 + px$ is a square of side $x$ with two strips, $x$ by $\frac p2$, attached along two sides. Filling the missing corner, a square of area $\frac{p^2}{4}$, completes a square of side $x + \frac p2$. In the derivation above, $p = \frac ba$.

The discriminant is the numerator on the right-hand side. A square of a real number cannot be negative, so real solutions need $b^2 - 4ac \ge 0$; when it is $0$ both signs give the same root, and when it is positive they give two different ones.

## Useful observations
- If the quadratic factors, the roots are immediate, and if only the sum or product of the roots is asked, Vieta's Formulas give them from the coefficients: $r_1 + r_2 = -\frac ba$ and $r_1r_2 = \frac ca$. The formula is for when neither shortcut applies.
- The discriminant answers questions without solving anything. Whether the roots are real, equal, rational, or integers is decided by $\Delta$ alone, and an integrality question becomes "when is $\Delta$ a perfect square", which is a Diophantine problem rather than an algebraic one.
- [[tangency-condition|Tangency]] is the same idea: a line touches a parabola exactly when substituting one into the other gives a quadratic with $\Delta = 0$, and the same works for a line and a circle, settling contact problems without calculus.

## Applications
Solving quadratics, deciding the nature of the roots, counting integer parameters with rational roots, and contact conditions through $\Delta = 0$.

## Contest profile
Seldom alone, because it finishes a setup rather than building it; the partners are geometry facts that reduce to one quadratic in one unknown, such as the Pythagorean Theorem, similar triangles, and coordinates. Two shapes recur: a perfect-square discriminant, as when the values of a parameter that make the roots rational are counted, and tangency as a zero discriminant.
`,

"vietas-quadratic": String.raw`
## Key forms
- $r + s = -\frac ba$ and $rs = \frac ca$ — the sum and product straight from the coefficients
- $r^2 + s^2 = (r + s)^2 - 2rs$ and $\frac1r + \frac1s = \frac{r + s}{rs}$ — symmetric expressions without the roots
- $|r - s| = \frac{\sqrt{|\Delta|}}{|a|}$ — the gap between the roots, real or complex ($x^2 + 1$: $|i - (-i)| = 2$), from the [[quadratic-formula|discriminant]]
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
- The sum and product also place the roots without finding them: both positive when the discriminant is at least $0$ and the sum and product are positive, opposite signs when the product is negative, which [[quadratic-root-location|locating the roots of a quadratic]] extends to any point and interval.

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

"fundamental-theorem-algebra": String.raw`
## Key forms
- $\alt{P(x) = a_n\prod_{k=1}^{n}(x - r_k)}{P(x) = a_n(x - r_1)(x - r_2)\cdots(x - r_n)}$ with $r_k \in \mathbb{C}$ — every polynomial of degree $n \ge 1$ with complex coefficients factors completely into linear factors
- a polynomial of degree at most $n$ with $n + 1$ roots is identically zero, and $n + 1$ values determine it uniquely
- a real polynomial splits into real linear and irreducible quadratic factors, so odd degree forces a real root

## Conditions
The polynomial is nonconstant, and roots are counted with multiplicity. Over the real numbers the count of real roots can be smaller than the degree; it is over $\mathbb{C}$ that there are exactly $n$.

## Why it works
The analytic core is that every non-constant complex polynomial has at least one root. It is quoted, not proved here: proofs go through Liouville's theorem, a winding-number argument, or a minimum-modulus argument, and B. Fine and G. Rosenberger, The Fundamental Theorem of Algebra (Springer, 1997), collects them.

Once there is one root $r$, dividing out $(x - r)$ drops the degree by one, and repeating gives, after $n$ steps, $n$ linear factors, $P(x) = a_n\prod (x - r_k)$, with exactly $n$ roots counted by multiplicity.

The other Key forms need only the Factor Theorem. If a polynomial of degree at most $n$ had $n + 1$ distinct roots and were not zero, it would have $n + 1$ linear factors and degree at least $n + 1$. So two polynomials of degree at most $n$ that agree at $n + 1$ points are equal.

For real coefficients, $\overline{P(z)} = P(\bar z)$, so non-real roots come in conjugate pairs, and $(x - r)(x - \bar r) = x^2 - 2\operatorname{Re}(r)\,x + \lvert r\rvert^2$ is a real quadratic. An odd degree cannot be made of pairs alone, so one root is real.

## Useful observations
- It is the license behind "a degree-$n$ polynomial has $n$ roots," which underwrites [[vietas-general|Vieta's Formulas]], partial fractions, and all root counting.
- A polynomial of degree at most $n$ that vanishes at $n + 1$ points is identically zero, which is the standard way to prove a polynomial identity, and $n + 1$ values pin a polynomial down uniquely ([[lagrange-interpolation|Lagrange interpolation]]).
- Over $\mathbb{R}$, pairing conjugate roots yields real linear and irreducible quadratic factors, hence every odd-degree real polynomial has a real root.

## Applications
Root counting, factoring over the complex numbers, proving a polynomial identity by counting agreeing points, and real-root arguments from the degree.

## Contest profile
Usually invoked implicitly: knowing the exact root count sets up Vieta, and the "agree at enough points implies identical" corollary cracks many AIME polynomial and functional-equation problems. The conjugate-pairing consequence is a common parity and real-root argument.
`,

"factor-remainder-theorem": String.raw`
## Key forms
- $P(x) = (x - a)Q(x) + P(a)$ — dividing by $x - a$ leaves the remainder $P(a)$
- $x - a \mid P(x) \iff P(a) = 0$ — the Factor Theorem
- the remainder on division by $(x - a)(x - b)$ is the line through $(a, P(a))$ and $(b, P(b))$
- $a, b \in \mathbb Z$ and $P$ with integer coefficients $\implies (a - b) \mid P(a) - P(b)$

## Conditions
$a$ is any number (real, complex, or integer). The divisibility statement needs integer coefficients and integer arguments.

## Why it works
Divide $P(x)$ by $x - a$. The remainder has degree less than $1$, so it is a constant $r$, and $P(x) = (x - a)Q(x) + r$. Evaluating at $x = a$ kills the first term and leaves $r = P(a)$. The Factor Theorem is the case $P(a) = 0$, and dividing by a degree-$k$ polynomial leaves a remainder of degree less than $k$, which is why a quadratic divisor leaves a line, pinned down by its values at the two roots.

The integer statement is the same theorem read over the integers. Apply the Factor Theorem to $P(x) - P(b)$: it vanishes at $x = b$, so $P(x) - P(b) = (x - b)Q(x)$ with $Q$ having integer coefficients whenever $P$ does. Substituting $x = a$ gives $P(a) - P(b) = (a - b)Q(a)$, and $Q(a)$ is an integer, so $(a - b) \mid P(a) - P(b)$. Equivalently, expand $P(a) - P(b) = \sum c_k(a^k - b^k)$ and note that every $a^k - b^k$ carries the factor $a - b$.

## Useful observations
- For a remainder, evaluating beats dividing. Modulo a quadratic $(x - a)(x - b)$ the remainder is linear, so interpolate the line through the two values; modulo $(x - a)^2$ use $P(a) + P'(a)(x - a)$.
- Divisibility questions reduce to evaluations at the roots of the divisor, complex ones included: $x^2 + 1 \mid P(x)$ exactly when $P(i) = 0$, and [[roots-of-unity|roots of unity]] handle $x^2 + x + 1$ and its relatives.
- Over the integers, $a - b \mid P(a) - P(b)$ is a filter that settles most "can such a polynomial exist" questions by parity alone.
- It also constrains fixed points and cycles: if $P(P(x)) = x$ on the integers, then $a - b \mid P(a) - P(b) \mid P(P(a)) - P(P(b)) = a - b$, which forces $|P(a) - P(b)| = |a - b|$, the key step in polynomial 2-cycle problems.
- When the quotient is needed as well as the remainder, [[polynomial-division|synthetic division]] by $x - a$ produces both in one row, the last number being $P(a)$.

## Applications
Remainders of polynomial division, divisibility by a given factor, and existence questions for integer polynomials.

## Contest profile
A high-frequency polynomial tool on the AMC 12 and AIME. Remainder questions are a pure evaluation at the roots followed by drawing the line through the values; the integer form appears as "an integer polynomial takes these values; can it take another?", where checking the differences settles it in a line.
`,

"rational-root-theorem": String.raw`
## Key forms
- $x = \dfrac pq$ in lowest terms is a root of $a_nx^n + \cdots + a_0 \implies p \mid a_0$ and $q \mid a_n$
- a monic polynomial with integer coefficients has only integer rational roots, each dividing the constant term
- $(p - kq) \mid f(k)$ for every integer $k$ — a second test on a candidate, for instance $(p - q) \mid f(1)$

## Conditions
The coefficients are integers (a polynomial with rational coefficients is first multiplied by a common denominator), and $p$ and $q$ share no factor. The theorem lists candidates; a candidate need not be a root.

## Why it works
Substitute the root and clear the denominators; then every term but one is a multiple of $p$, and every term but one is a multiple of $q$.

Let $a_nx^n + \cdots + a_1x + a_0$ have the root $\frac pq$ with $\gcd(p, q) = 1$. Multiplying the equation by $q^n$ gives $$a_np^n + a_{n-1}p^{n-1}q + \cdots + a_1pq^{n-1} + a_0q^n = 0.$$

Every term except the last contains a factor of $p$, so $p$ divides $a_0q^n$. Since $p$ shares no factor with $q$, it shares none with $q^n$, so $p$ divides $a_0$. In the same way every term except the first contains a factor of $q$, so $q$ divides $a_np^n$, and therefore $q$ divides $a_n$.

## Useful observations
- The candidates $\pm\frac pq$ are listed and tested, and each root is divided out as it is found. For $2x^3 - 3x^2 - 11x + 6$ the candidates are $\pm1, \pm2, \pm3, \pm6, \pm\frac12, \pm\frac32$. Testing finds $x = 3$, since $54 - 27 - 33 + 6 = 0$, and dividing by $x - 3$ leaves a quadratic that factors: $(x - 3)(2x - 1)(x + 2)$.
- Synthetic division tests a candidate and divides at the same time. The small candidates come first, and signs or a rough sketch skip the hopeless ones.
- The monic case also proves irrationality. The only candidates for $x^2 - 2$ are $\pm1$ and $\pm2$, and none is a root, so $\sqrt2$ is irrational.
- The test $(p - kq) \mid f(k)$ follows because $q^n\big(f(k) - f(\tfrac pq)\big)$ is divisible by $kq - p$ and $kq - p$ shares no factor with $q$; it quickly discards candidates, since $f(1)$ and $f(-1)$ are small.

## Applications
Factoring a cubic or quartic with integer coefficients, finding all rational roots, and proving that a number is irrational.

## Contest profile
Three problems here, all AIME, none solved by it alone: it usually factors a cubic that another method has produced, such as the equation a [[symmetric-polynomial-strategies|symmetric substitution]] reduces a system to, or the equation for the ratio of a geometric series. The candidates with small denominators are tried first, since contest cubics are built to have a rational root.
`,

"coefficient-extraction": String.raw`
## Key forms
- $P(1) = a_0 + a_1 + a_2 + \cdots$ — the sum of all the coefficients, and $P(0) = a_0$, the constant term
- $P(-1) = a_0 - a_1 + a_2 - \cdots$ — the alternating sum of the coefficients
- $\dfrac{P(1) + P(-1)}{2}$ is the sum of the coefficients of the even powers, and $\dfrac{P(1) - P(-1)}{2}$ the sum of the coefficients of the odd powers
- when the signs of the coefficients are known, $P(\pm 1)$ also gives the sum of their absolute values

## Conditions
The polynomial is evaluated in whatever form it is given, so a product, a power, or a composition is never expanded. For two variables, the other variable is fixed first.

## Why it works
Evaluating a polynomial at a number weights each coefficient by a power of that number, so a well-chosen point makes the weights collapse:
$$P(1) = a_0 + a_1 + a_2 + \cdots, \qquad P(-1) = a_0 - a_1 + a_2 - \cdots.$$

Adding and subtracting those cancels one parity at a time:
$$\frac{P(1) + P(-1)}{2} = a_0 + a_2 + a_4 + \cdots, \qquad \frac{P(1) - P(-1)}{2} = a_1 + a_3 + a_5 + \cdots.$$
At $x = 0$ every weight but the first vanishes, leaving $a_0$. If the coefficients are all of one sign, $\lvert P(1) \rvert$ is the sum of their absolute values; if they alternate in sign, $\lvert a_k \rvert = \pm(-1)^ka_k$ with one fixed sign, so the sum is $\lvert P(-1) \rvert$.

## Useful observations
- The polynomial is evaluated in the form the problem gives, never expanded. For $(1 + 2x)^{10}(1 - x)^4$ the coefficient sum is $3^{10} \cdot 0^4 = 0$, and the constant term is $1$.
- For every third or every fourth coefficient, $\pm 1$ is replaced by the cube or fourth roots of unity, which is the [[roots-of-unity-filter|roots of unity filter]].
- A [[generating-function-method|generating function]] read this way counts all its objects at once, since $G(1)$ adds up every coefficient.
- The sum of the absolute values of the coefficients is one evaluation once the signs are known: if they alternate, it is $\lvert P(-1) \rvert$.

## Applications
Coefficient sums of products and powers too large to expand, even-power and odd-power sums, alternating sums, and sums of absolute values.

## Contest profile
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version combines it with the [[binomial-theorem|Binomial Theorem]], and the AIME version asks for the sum of the absolute values of the coefficients, which one evaluation at negative one produces once the sign of every coefficient is known.
`,


"newtons-sums": String.raw`
## Key forms
- $p_k = e_1p_{k-1} - e_2p_{k-2} + \cdots + (-1)^{k-1}k\,e_k$ — each power sum comes from the earlier ones and the coefficients, so the whole ladder is computable from the polynomial alone
- $p_1 = e_1$, $p_2 = e_1p_1 - 2e_2$, $p_3 = e_1p_2 - e_2p_1 + 3e_3$, $p_4 = e_1p_3 - e_2p_2 + e_3p_1 - 4e_4$ — the first rungs, which cover almost every contest use
- past the degree $n$, the $k\,e_k$ term disappears: the relation becomes a pure recursion in the previous $n$ power sums, and forgetting to drop the term is the common error
- run backwards, power sums give the $e_k$ — and so the polynomial whose roots they are

## Conditions
Here $p_k = \sum r_i^k$ over the roots and $e_k$ is the $k$th elementary symmetric function of the roots, read from the coefficients with the alternating signs of [[vietas-general|Vieta's Formulas]]. The roots may be complex.

## Why it works
Every root satisfies the polynomial, so multiplying that equation by a power of the root and adding over all the roots relates the power sums to each other.

Take a cubic with roots $r$, $s$, $t$ and $e_1 = r + s + t$, $e_2 = rs + st + tr$, $e_3 = rst$. Each root satisfies $$x^3 = e_1x^2 - e_2x + e_3.$$ Multiplying by $x^{k-3}$ and adding over the three roots gives, for $k \ge 3$, $$p_k = e_1p_{k-1} - e_2p_{k-2} + e_3p_{k-3},$$ with $p_0 = 3$, because each root contributes $1$. At $k = 3$ the last term is $3e_3$, the source of the $k\,e_k$ in the general ladder.

Below the degree the same shape holds: $p_1 = e_1$, and squaring the sum of the roots gives $p_2 = e_1^2 - 2e_2 = e_1p_1 - 2e_2$. Only the coefficients enter, so the ladder works just as well when the roots are complex.

## Useful observations
- The coefficients give $e_1, e_2, \ldots$ with Vieta's Formulas, minding the alternating signs, and then the ladder is climbed one power at a time. For $x^3 - 6x^2 + 11x - 6$, with $e_1 = 6$, $e_2 = 11$, and $e_3 = 6$, $p_1 = 6$, $p_2 = 36 - 22 = 14$, and $p_3 = 6 \cdot 14 - 11 \cdot 6 + 18 = 36$. The roots are $1$, $2$, $3$, and indeed $1 + 8 + 27 = 36$.
- The ladder also runs backwards: given $p_1$, $p_2$, $p_3$ for three numbers, $e_1$, $e_2$, $e_3$ are solved for, and the numbers are the roots of $t^3 - e_1t^2 + e_2t - e_3$.

## Applications
Power sums of the roots of a polynomial without finding the roots, sums of powers of three or more numbers given the first few, and the polynomial whose roots are given by their power sums.

## Contest profile
Three problems here, all AIME, none solved by it alone, and two pair it with Vieta's Formulas. The classic form gives $x + y + z$, $x^2 + y^2 + z^2$, and $x^3 + y^3 + z^3$ and asks for $x^4 + y^4 + z^4$. Harder versions reduce one polynomial modulo another so that only low power sums of the roots are needed.
`,

"conjugate-root-theorems": String.raw`
## Key forms
- $a + bi$ a root of a real polynomial $\implies a - bi$ is a root, with the same multiplicity
- $a + b\sqrt d$ a root of a rational polynomial, with $\sqrt d$ irrational $\implies a - b\sqrt d$ is a root
- $a \pm bi$ gives the factor $x^2 - 2ax + (a^2 + b^2)$, and $a \pm b\sqrt d$ gives $x^2 - 2ax + (a^2 - b^2d)$
- a real polynomial of odd degree has at least one real root, since its non-real roots pair off

## Conditions
The coefficients are real for the complex version and rational for the radical version. The hypothesis matters: $x - \sqrt2$ has the root $\sqrt2$ but not $-\sqrt2$, because its coefficients are not rational.

## Why it works
Replacing $i$ by $-i$ everywhere respects addition and multiplication and leaves real numbers alone, so it turns a true equation with real coefficients into another true equation.

If $P(r) = 0$, conjugate both sides. Conjugation respects sums and products, and it leaves the real coefficients of $P$ unchanged, so the left side becomes $P(\bar r)$ and the right side stays $0$. So $\bar r$ is a root too. The polynomial cannot tell which square root of $-1$ it is using.

{{figure:mirror}}

The radical version works the same way with the map $\sqrt d \mapsto -\sqrt d$ on numbers $x + y\sqrt d$ with $x$ and $y$ rational. It respects sums and products, because $\sqrt d$ and $-\sqrt d$ have the same square, and it leaves rational numbers fixed, so it sends roots of a rational polynomial to roots.

## Useful observations
- Each pair comes with its quadratic factor. A rational cubic with root $2 + \sqrt3$ therefore has the factor $x^2 - 4x + 1$, and its third root follows from [[vietas-general|Vieta's Formulas]].
- A root with two radicals needs more conjugates. If a rational polynomial has the root $\sqrt2 + \sqrt3$, it also has $\sqrt2 - \sqrt3$, $-\sqrt2 + \sqrt3$, and $-\sqrt2 - \sqrt3$, and the four multiply out to $x^4 - 10x^2 + 1$.
- A real polynomial of odd degree has a real root, since its non-real roots come in pairs and cannot account for an odd count.

## Applications
Finding the missing roots of a polynomial from one given root, building a polynomial with a prescribed irrational root, and showing that a root must be real.

## Contest profile
Five problems here, all AIME, and every one of them finishes with Vieta's Formulas: the conjugate supplies the missing root, and Vieta turns the roots into the coefficients the problem asks about.
`,

"palindromic-polynomials": String.raw`
## When to use
The coefficients form a palindrome, such as $1, 3, -8, 3, 1$, or a palindrome up to sign, or an equation is already written with $x + \frac1x$ and its powers. A polynomial with merely symmetric roots, such as the even polynomial $x^4 - 5x^2 + 4$, is a different case: its roots come in pairs $r$ and $-r$, and the substitution there is $u = x^2$.

## How
1. If the degree is odd, divide out the root $x = -1$, or $x = 1$ for a palindrome up to sign; the quotient is an even-degree palindrome.
2. Divide by the middle power $x^m$ and group the terms as $a(x^m + x^{-m}) + b(x^{m-1} + x^{-(m-1)}) + \cdots$.
3. Rewrite each group in $y = x + \frac1x$, using $x^2 + \frac{1}{x^2} = y^2 - 2$ and $x^3 + \frac{1}{x^3} = y^3 - 3y$.
4. Solve the equation in $y$, of half the degree.
5. Recover $x$ from $x^2 - yx + 1 = 0$ for each value of $y$.

For $x^4 + 2x^3 - 6x^2 + 2x + 1 = 0$, dividing by $x^2$ gives $\left(x^2 + \frac1{x^2}\right) + 2\left(x + \frac1x\right) - 6 = 0$, that is $y^2 + 2y - 8 = 0$, so $y = 2$ or $y = -4$. Then $y = 2$ gives the double root $x = 1$, and $y = -4$ gives $x = -2 \pm \sqrt3$.

{{figure:pairs}}

## Why it works
For a polynomial of degree $n$ with nonzero constant term, $x^nP\!\left(\frac1x\right)$ has the coefficients of $P$ in reverse order and the reciprocals of its roots as roots. A palindrome equals its own reversal, so its roots are closed under $r \mapsto \frac1r$ and come in reciprocal pairs, each with product $1$. A pair is then determined by its sum $r + \frac1r$, which is why the equation reduces to one in $y$ of half the degree.

## Formulas it uses
- [[reciprocal-power-sums]]: $x^k + \frac{1}{x^k}$ is a polynomial in $y = x + \frac1x$, such as $y^2 - 2$ and $y^3 - 3y$.
- [[vietas-quadratic]]: each value of $y$ gives $x^2 - yx + 1 = 0$, whose roots have sum $y$ and product $1$.
- [[factor-remainder-theorem]]: an odd-degree palindrome vanishes at $x = -1$, so the factor $x + 1$ can be removed first.

## Common traps
- Substituting before removing the factor $x + 1$ from an odd-degree palindrome.
- Forgetting that a real $y$ with $|y| \lt 2$ gives complex roots on the unit circle, not real ones.
- Writing $x^2 + \frac{1}{x^2} = y^2 + 2$ instead of $y^2 - 2$.
- Forgetting that $y = x + \frac1x$ satisfies $\lvert y\rvert \ge 2$ for real $x$: a root $y$ with $\lvert y\rvert \lt 2$ gives two non-real $x$ (see [[transforming-equations|transforming equations without losing solutions]]).

## Contest profile
An AMC 12 and AIME step: a quartic or sextic with palindromic coefficients, and a question about its real roots or their sum.
`,

"vertex-form": String.raw`
## Key forms
- $x = -\dfrac{b}{2a}$ and $y = c - \dfrac{b^2}{4a}$ — the vertex of $y = ax^2 + bx + c$
- $y = a(x - h)^2 + k$ — the vertex form, with the vertex at $(h, k)$
- a minimum when $a \gt 0$ and a maximum when $a \lt 0$
- the axis $x = -\frac{b}{2a}$ lies halfway between any two points at the same height, and in particular halfway between the two roots

## Conditions
The quadratic is defined for all real $x$. When the variable is restricted to a range, the vertex gives the extreme value only if it lies inside the range.

## Why it works
Completing the square separates the part that varies from the part that does not: $$ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}.$$

The square is never negative and is zero only at $x = -\frac{b}{2a}$. So when $a \gt 0$ the expression is smallest there, with value $c - \frac{b^2}{4a}$, and when $a \lt 0$ it is largest there. The square also takes the same value at $-\frac{b}{2a} + t$ and at $-\frac{b}{2a} - t$, which is the symmetry the figure at the top shows.

## Useful observations
- For an optimization, the quantity is written as a quadratic in one variable and the vertex read off. That is why [[max-product-fixed-sum|a fixed sum has its largest product in the middle]]: $x(s - x)$ is a downward parabola with its vertex at $x = \frac s2$.
- If the variable is restricted to a range that misses the vertex, the extreme value is at the endpoint nearer to it.
- The symmetry is used even more than the extremum. Two points at the same height put the axis halfway between them, and the roots are such a pair, so they average to $-\frac{b}{2a}$, as [[vietas-quadratic|Vieta's Formulas]] also say.

{{figure:symmetry}}

- A parabola known to pass through $(p, k)$ and $(q, k)$ has its axis at $x = \frac{p + q}{2}$ before any coefficient is found, which often turns a system of conditions into one equation.

## Applications
Maximum-area and maximum-revenue questions, minimum values of quadratics, parabolas through given points, and axis-of-symmetry arguments.

## Contest profile
Two problems here, both AIME, one solved by it alone; the other adds [[casework-method|casework]] on where the vertex falls relative to the allowed range. On the AMC 10 it drives maximum-area and maximum-revenue questions, which are quadratics in disguise.
`,

"lagrange-interpolation": String.raw`
## When to use
Problems that give a polynomial's degree and its values at a few points with no visible pattern, such as "the quadratic with $P(0) = 1$, $P(1) = 2$, $P(3) = 10$; find $P(5)$"; remainder problems, since the remainder of $P(x)$ modulo $(x - a)(x - b)$ is the line through $(a, P(a))$ and $(b, P(b))$; and existence questions, since a polynomial with too many prescribed values cannot exist. When the values follow a simple rule, [[subtract-and-factor|turning the known values into known roots]] is shorter.

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
Polynomials described by values that follow a rule: $P(k) = \frac1k$ or $\frac{k}{k + 1}$ for $k = 0, \ldots, n$; $P(1) = 10$, $P(2) = 20$, $P(3) = 30$ for a monic quartic; or a polynomial taking the same value at several points. The question usually asks for one more value or for a sum such as $P(12) + P(-8)$, where an unknown root cancels. Values with no visible rule call for [[lagrange-interpolation|interpolating a polynomial]] instead.

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
## Key forms
- $a^2 - b^2 = (a - b)(a + b)$ — a subtraction becomes a product
- $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ and $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ — the cube versions
- $(1 - x)(1 + x)(1 + x^2)(1 + x^4)\cdots(1 + x^{2^{k-1}}) = 1 - x^{2^k}$ — a chain of conjugates collapses completely
- $a^2 + b^2$ does not factor over the real numbers

## Conditions
$a$ and $b$ can be numbers, variables, or whole expressions. In integers, $a - b$ and $a + b$ always have the same parity, so $n = a^2 - b^2$ is impossible when $n \equiv 2 \pmod 4$.

## Why it works
Multiply out the product and the middle terms cancel: $(a - b)(a + b) = a^2 + ab - ab - b^2 = a^2 - b^2$.

The figure at the top shows why the answer has that shape. Cut a $b \times b$ corner out of an $a \times a$ square; the L-shaped piece left over has area $a^2 - b^2$, and it can be cut and rearranged into a rectangle $a + b$ long and $a - b$ wide.

The cube versions expand the same way, with more cancellation: $$(a - b)(a^2 + ab + b^2) = a^3 + a^2b + ab^2 - a^2b - ab^2 - b^3 = a^3 - b^3.$$ Replacing $b$ by $-b$ turns this into $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.

All three are cases of one pattern. As a polynomial in $a$, $a^n - b^n$ is zero when $a = b$, so it always has the factor $a - b$; and for odd $n$, $a^n + b^n$ is zero when $a = -b$, so it has the factor $a + b$. That is why a sum of two cubes factors but a sum of two squares does not.

## Useful observations
- The identity does one thing everywhere: it converts a subtraction into a product, and a product can be counted, cancelled, or bounded.
- Against a Diophantine equation it turns solving into counting: $n = a^2 - b^2 = (a - b)(a + b)$ makes every representation a factorization of $n$, so the question becomes how many factor pairs $n$ has, filtered by parity.
- Against a radical it clears the denominator, since $(\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b$ leaves no radical behind; that is all [[rationalizing|rationalizing]] is.
- Against a product it telescopes: multiplying the chain of conjugates by $1 - x$ collapses it completely, because each factor is the conjugate the previous step was waiting for.
- Against arithmetic it is a shortcut: $51 \cdot 49 = 2500 - 1$, and when $a$ and $b$ are close together $a^2 - b^2$ is small, which is often the bound a problem needs.
- "One less than a power" is factorable: $2^{32} - 1$, $10^4 - 1$, and $n^2 - 1$ factor before they are evaluated, and the [[sophie-germain|Sophie Germain]] identity is the same idea for $a^4 + 4b^4$, which becomes a difference of squares after adding and subtracting $4a^2b^2$.

## Applications
Factoring, clearing radicals, mental arithmetic, representations of integers as differences of squares, and telescoping products.

## Contest profile
Rarely the whole problem, because it is a move rather than a result. Its standing partner is factor-pair counting (factor first, then count the pairs and filter by parity and sign); the next most common is [[arithmetic-series|an arithmetic series]], where pairing consecutive terms produces differences of squares that cancel down the list.
`,

"an-minus-bn": String.raw`
## Key forms
- $a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1})$ — for every positive integer $n$
- $a^n + b^n = (a + b)(a^{n-1} - a^{n-2}b + \cdots + b^{n-1})$ — for odd $n$
- the cubic cases, $n = 3$, that come up most are on [[difference-of-squares|Difference of Squares & Cubes]]
- $a^m - 1 \mid a^n - 1$ exactly when $m \mid n$, and $\gcd(a^m - 1, a^n - 1) = a^{\gcd(m, n)} - 1$

## Conditions
The sum factorization needs an odd exponent; for even $n$, $a^n + b^n$ has no factor $a + b$, though it can factor in other ways, for example $a^4 + 4b^4 = (a^2 + 2ab + 2b^2)(a^2 - 2ab + 2b^2)$.

## Why it works
The geometric-series identity: multiplying $(a - b)$ by the sum $a^{n-1} + a^{n-2}b + \cdots + b^{n-1}$ makes everything telescope, each product cancelling the next, and leaves $a^n - b^n$. For odd $n$, substituting $-b$ for $b$ gives the $a^n + b^n$ version, since $(-b)^n = -b^n$. For even exponents, $a^{2m} - b^{2m}$ is a difference of squares, $(a^m - b^m)(a^m + b^m)$.

Step 1, divisibility of $a^n - 1$ (with $a \ge 2$). If $n = mq$, then $a^n - 1 = (a^m)^q - 1$, which the first Key form makes a multiple of $a^m - 1$. Conversely, write $n = qm + r$ with $0 \le r \lt m$:
$$a^n - 1 = a^r\left(a^{qm} - 1\right) + \left(a^r - 1\right).$$
If $a^m - 1$ divides $a^n - 1$, it divides $a^r - 1$, which is smaller, so $a^r - 1 = 0$ and $r = 0$.

Step 2, the gcd. The same display shows $\gcd(a^n - 1, a^m - 1) = \gcd(a^m - 1, a^r - 1)$, which is one step of the [[euclidean-algorithm|Euclidean algorithm]] run on the exponents. Repeating it ends at $\gcd(a^{d} - 1, a^0 - 1) = a^d - 1$ with $d = \gcd(m, n)$.

## Useful observations
- It is a divisibility engine: $a - b \mid a^n - b^n$ always, and $a + b \mid a^n + b^n$ for odd $n$. This is key for number-theory divisibility arguments.
- Numbers like $2^{15} - 1$ factor along the divisors of the exponent: $2^3 - 1$ and $2^5 - 1$ both divide it. Combined with [[lte-lemma|the Lifting the Exponent Lemma]] it computes exact prime powers.
- An even exponent factors twice: $a^{2m} - b^{2m} = (a^m - b^m)(a^m + b^m)$, and continuing gives the full chain of cyclotomic pieces.

## Applications
Divisibility of differences and sums of powers, factoring numbers of the form $a^n \pm 1$, Mersenne-type numbers, and gcds of numbers like $2^m - 1$ and $2^n - 1$.

## Contest profile
Finding the largest prime factor of a number such as a power minus one is done by factoring along the exponent's divisors. Mersenne-flavored AIME number theory leans on the divisibility of one such number by another.
`,

"sophie-germain": String.raw`
## Key forms
- the completed square: $a^4 + 4b^4$ is the square of $a^2 + 2b^2$ minus the square of $2ab$
- each factor is a sum of two squares: $\left((a - b)^2 + b^2\right)\left((a + b)^2 + b^2\right)$

## Conditions
The identity holds for all real or complex $a$ and $b$. For integer factorization arguments, $a$ and $b$ are positive integers, and the smaller factor $(a - b)^2 + b^2$ exceeds $1$ unless $a = b = 1$.

## Why it works
Adding and subtracting $4a^2b^2$ completes a square:
$$a^4 + 4b^4 = a^4 + 4a^2b^2 + 4b^4 - 4a^2b^2 = (a^2 + 2b^2)^2 - (2ab)^2.$$
The result is a difference of two squares, which factors as $(a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)$. Rewriting $a^2 - 2ab + 2b^2$ as $(a - b)^2 + b^2$ shows that each factor is a sum of two squares.

The observations are direct checks. With $b = 1$ the smaller factor is $(n - 1)^2 + 1$, which is more than $1$ once $n \ge 2$, so $n^4 + 4$ is then composite. For odd $k$, $4^k = 4 \cdot 4^{k - 1} = 4\left(2^{(k - 1)/2}\right)^4$. And
$$g(x + 2b) = (x + 2b)^2 - 2b(x + 2b) + 2b^2 = x^2 + 2bx + 2b^2 = f(x).$$

## Useful observations
- With $b = 1$ it reads $n^4 + 4 = (n^2 - 2n + 2)(n^2 + 2n + 2)$, so $n^4 + 4$ is prime only for $n = 1$, where it equals $5$.
- $n^4 + 4^k$ fits the identity when $k$ is odd, with $b = 2^{(k-1)/2}$, since then $4^k = 4b^4$.
- The two factors evaluated at consecutive arguments share a value: with $f(x) = x^2 + 2bx + 2b^2$ and $g(x) = x^2 - 2bx + 2b^2$, $f(x) = g(x + 2b)$, which makes products of such expressions telescope.

## Applications
Factorizations and compositeness of expressions of the form $a^4 + 4b^4$, and products of such expressions over arithmetic progressions, where the factors cancel in a telescoping chain.

## Contest profile
An occasional AIME and AMC tool: a fourth power plus four times a fourth power, often hidden behind a constant that is itself of that form.
`,

"largest-term-ratio": String.raw`
## When to use
Questions that ask which term of a binomial expansion is largest, such as the largest coefficient of $(1 + 2x)^{20}$; which number of successes is most likely in repeated trials; or where a sequence built from factorials, powers, and binomial coefficients peaks. The terms are too large to compute, but their ratio is small and simple. A ratio that is not monotone can peak twice, and a sequence built from sums rather than products has no simple ratio.

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
- [[permutations-combinations]]: the factorial formula $\binom nk = \frac{n!}{k!\,(n-k)!}$ gives the ratio $\frac{\binom n{k+1}}{\binom nk} = \frac{n - k}{k + 1}$, which reduces the comparison to a linear inequality.
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
Equations such as $xy - 2x + 3y = 20$, $\frac1x + \frac1y = \frac1n$ after clearing denominators, $3xy + 5x + 2y = 40$ after multiplying by the coefficient of $xy$, and conditions such as a rectangle's area equaling its perimeter. The signal is two unknown integers, their product, and a multiple of each. An equation with an $x^2$ or $y^2$ term is not of this shape, and a quadratic in one unknown is better handled by its discriminant or a bound.

The same completion factors $xy + ax + by$ wherever it appears, not only in integer equations: it shows that $xy - x - y + 1 = (x - 1)(y - 1)$ is positive when $x, y \gt 1$, and it splits a sum over pairs into a product of two sums.

## How
1. Collect the terms as $xy + ax + by = c$.
2. Add $ab$ to both sides: $(x + b)(y + a) = c + ab$.
3. If $xy$ has a coefficient $k$, as in $kxy + ax + by = c$, multiply the whole equation by $k$ first; then adding $ab$ gives $(kx + b)(ky + a) = kc + ab$.
4. List the factor pairs of the constant, including negative pairs when the unknowns may be negative.
5. Convert each pair back, and keep the solutions that satisfy every condition.

Which rectangles with whole-number sides have area equal to perimeter? From $xy = 2x + 2y$, adding $4$ gives $(x - 2)(y - 2) = 4$. The positive factor pairs $1 \cdot 4$, $2 \cdot 2$, $4 \cdot 1$ give $3 \times 6$, $4 \times 4$ and $6 \times 3$, while the negative pairs give a side that is not positive. So the rectangles are $3 \times 6$ and $4 \times 4$.

## Why it works
Expanding $(x + b)(y + a) = xy + ax + by + ab$ shows that the left side of $xy + ax + by = c$ is this product without its constant term, so adding $ab$ to both sides completes it. With integer unknowns, $x + b$ and $y + a$ are integers whose product is the known number $c + ab$, so they are a factor pair, and each factor pair gives back exactly one solution.

When $xy$ has a coefficient $k$, the product $(x + b)(y + a)$ no longer matches, but $(kx + b)(ky + a) = k^2xy + akx + bky + ab$ is exactly $k$ times the left side plus $ab$, so multiplying by $k$ restores the same shape. The figure shows the identity as a rectangle cut into four pieces.

## Formulas it uses
- [[number-of-divisors]]: counts the factor pairs of $c + ab$, which is the number of solutions before any filter.

## Common traps
- Adding $a + b$, or the wrong product, instead of $ab$.
- Forgetting to multiply through when $xy$ has a coefficient, or forgetting that the factors must then have the right residues modulo $k$.
- Missing the negative factor pairs, or keeping ones that give invalid values.

## Contest profile
Usually the first step of an AIME Diophantine problem, after which listing or counting factor pairs finishes.
`,

"cubes-minus-3abc": String.raw`
## Key forms
- $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ — the factorization
- $a^2 + b^2 + c^2 - ab - bc - ca = \dfrac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$ — the second factor, a sum of squares
- $a^3 + b^3 + c^3 \ge 3abc$ for $a, b, c \ge 0$, with equality exactly when $a = b = c$ — the cubic AM-GM inequality
- the special case $a + b + c = 0 \implies a^3 + b^3 + c^3 = 3abc$

## Conditions
The factorization holds for all numbers. The inequality needs $a, b, c \ge 0$, so that $a + b + c \ge 0$ multiplies the nonnegative second factor.

## Why it works
Direct expansion proves it: multiplying out $(a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ leaves the cubes and cancels every mixed term except $-3abc$.

A more conceptual route sees $a^3 + b^3 + c^3 - 3abc$ as the determinant of a circulant matrix, which factors through the cube [[roots-of-unity|roots of unity]].

The second factor is $\frac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$, manifestly nonnegative, and it vanishes only when $a = b = c$. That is why the product has the sign of $a + b + c$, and why for nonnegative numbers the cubes dominate $3abc$.

## Useful observations
- Two directions are used. If $a + b + c = 0$ the cubes sum to $3abc$, which applies to differences such as $x - y$, $y - z$, $z - x$ that always sum to zero; the zero-sum consequences are collected on [[sum-zero-identities|their own card]]. The factorization itself serves Diophantine and symmetric-system problems.
- With $a = u^{1/3}$ and similar, the inequality is the three-variable AM-GM inequality.
- The numbers $a$, $b$, $c$ may be multiples of the variables: $x^3 + 8y^3 + 27z^3 - 18xyz$ is the case $a = x$, $b = 2y$, $c = 3z$.

## Applications
Factoring expressions with three cubes, symmetric systems, Diophantine equations, and the three-variable AM-GM inequality.

## Contest profile
Cube sums of $x - y$, $y - z$, $z - x$, and systems giving $a + b + c$, $ab + bc + ca$, and $abc$, where cube sums come from this identity together with [[newtons-sums|Newton's Sums]]. The zero-sum special case is the single most reused fragment.
`,

"square-of-sum": String.raw`
## Key forms
- $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$ — each square once, each pairwise product twice
- $(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ and $(a + b)^2 - (a - b)^2 = 4ab$ — the two-variable relatives
- $\left(x + \dfrac1x\right)^2 = x^2 + 2 + \dfrac{1}{x^2}$ — the first step up the powers of $x + \frac1x$
- $a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$

## Conditions
Valid for all numbers or expressions. The last identity is nonnegative for real $a$, $b$, $c$ and zero only when $a = b = c$.

## Why it works
Multiplying a sum by itself pairs every term with every term, so each square appears once and each product of two different terms appears twice, once in each order.

Write $(a + b + c)^2 = (a + b + c)(a + b + c)$ and multiply every term of the first bracket by every term of the second, which gives nine products. Three of them pair a term with itself: $a^2$, $b^2$, and $c^2$. The other six pair two different terms, and each pair shows up twice, as $ab$ and $ba$, as $bc$ and $cb$, and as $ca$ and $ac$. The figure at the top is the two-term version: a square of side $a + b$ splits into the squares $a^2$ and $b^2$ and two $ab$ rectangles.

The two-variable relatives come from adding and subtracting $(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$: the cross terms cancel in the sum, and the squares cancel in the difference. The cross term of $\left(x + \frac1x\right)^2$ is $2 \cdot x \cdot \frac1x = 2$, which gives the third form.

The last identity is worth keeping separately. The right side is visibly never negative and is zero only when $a = b = c$, so it turns a symmetric expression into an inequality with a known equality case.

## Useful observations
- The three-variable identity converts among $a + b + c$, $ab + bc + ca$, and $a^2 + b^2 + c^2$: any two determine the third, without finding $a$, $b$, and $c$.
- For $x + \frac1x$, squaring and cubing climb the powers. If $y = x + \frac1x$, then $x^2 + \frac{1}{x^2} = y^2 - 2$ and $x^3 + \frac{1}{x^3} = y^3 - 3y$, and higher powers follow by multiplying neighbors, since $\left(x^n + \frac{1}{x^n}\right)\left(x + \frac1x\right) = \left(x^{n+1} + \frac{1}{x^{n+1}}\right) + \left(x^{n-1} + \frac{1}{x^{n-1}}\right)$.
- A box whose [[space-diagonal|space diagonal]] and edge sum are given is the standard geometric use: $(a + b + c)^2$ links the two.

## Applications
Sums of squares from sums and pairwise products, the powers of $x + \frac1x$, boxes with given diagonal and edge sum, and symmetric inequalities.

## Contest profile
A permanent AMC fixture in two shapes: given the sum and the sum of squares, find the sum of pairwise products; and climbing the powers of a number plus its reciprocal one step at a time. It usually serves another setup rather than standing alone.
`,

"binomial-theorem": String.raw`
## Key forms
- $(x + y)^n = \alt{\sum_{k=0}^{n}\binom nk x^{n-k}y^k}{x^n + \binom n1 x^{n-1}y + \binom n2 x^{n-2}y^2 + \cdots + y^n}$ — the coefficient of $x^{n-k}y^k$ is $\binom nk$, row $n$ of Pascal's triangle
- $\alt{\sum_{k=0}^{n}\binom nk}{\binom n0 + \binom n1 + \cdots + \binom nn} = 2^n$ and $\alt{\sum_{k=0}^{n}(-1)^k\binom nk}{\binom n0 - \binom n1 + \cdots \pm \binom nn} = 0$ — the cases $x = y = 1$ and $x = 1$, $y = -1$
- $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$ — each entry is the sum of the two above it
- $(1 + \epsilon)^n \approx 1 + n\epsilon$ for small $\epsilon$ — the first two terms

## Conditions
$n$ is a nonnegative integer. The terms can be numbers or whole expressions, so $2x$ and $-3$ are the two terms of $(2x - 3)^5$.

## Why it works
Multiplying out $(x + y)^n$ means choosing $x$ or $y$ from each of the $n$ brackets, and $\binom nk$ counts the ways to choose $y$ exactly $k$ times.

Write $(x + y)^n = (x + y)(x + y)\cdots(x + y)$ with $n$ brackets. Each term of the expansion is built by picking one of the two letters from every bracket and multiplying the picks. A term that picks $y$ from $k$ brackets and $x$ from the other $n - k$ is $x^{n-k}y^k$, and there is one such term for every choice of which $k$ brackets supply the $y$. There are $\binom nk$ of those choices, so after collecting like terms the coefficient of $x^{n-k}y^k$ is $\binom nk$.

The same picture explains Pascal's triangle. Split off one bracket: $(x + y)^n = (x + y)^{n-1}(x + y)$. A term $x^{n-k}y^k$ either takes its last $y$ from the final bracket, leaving $k - 1$ of them among the first $n - 1$ brackets, or takes the $x$ there, leaving all $k$ among the first $n - 1$. So $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$: each entry is the sum of the two above it.

{{figure:pascal}}

## Useful observations
- Coefficient extraction is the everyday use: the coefficient of $x^2$ in $(2x - 3)^5$ is $\binom52 \cdot 2^2 \cdot (-3)^3$, read off by treating $2x$ and $-3$ as the two terms.
- For remainders, write the base next to a round number: $9^{100} = (10 - 1)^{100}$, and modulo $1000$ every term containing $10^3$ or more vanishes, leaving three terms to compute.
- Substituting values collapses whole rows: $x = y = 1$ gives the row sum $2^n$, and $x = 1$, $y = -1$ gives an alternating sum of $0$.
- It is the bridge between algebra and counting, since every $\binom nk$ in an expansion is a count of choices.

## Applications
Coefficients of powers of sums, remainders and last digits of large powers, sums of binomial coefficients, and approximations for small $\epsilon$.

## Contest profile
Spread across many problem types rather than tied to one. The recurring shapes are last-digit and remainder questions, coefficient hunts in products of binomials, and sums of binomial coefficients that collapse under a clever substitution.
`,

"brahmagupta-fibonacci": String.raw`
## Key forms
- $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2$ — a product of two sums of two squares is a sum of two squares
- $(a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2$ — the other sign choice, often a second, different representation

## Conditions
The numbers $a, b, c, d$ are integers (or reals). The two sign choices come from $zw$ and $z\bar w$ and generally give different representations.

## Why it works
$\lvert z\rvert^2\lvert w\rvert^2 = \lvert zw\rvert^2$ for the complex numbers $z = a + bi$ and $w = c + di$: both sides are expanded. The two sign choices come from $zw$ and $z\bar w$, which have the same modulus.

## Useful observations
- It is a closure tool: products of sums of two squares are sums of two squares, with an explicit recipe for the representation.
- Run forward, it builds representations; for example $65 = 5 \cdot 13 = (1^2 + 2^2)(2^2 + 3^2)$ gives both $1^2 + 8^2$ and $4^2 + 7^2$.
- The norm statement is the algebraic heart of the lattice-point count on a circle.

## Applications
Numbers expressible as a sum of two squares in several ways, and building representations from smaller ones.

## Contest profile
AIME problems asking for numbers expressible as a sum of two squares in multiple ways lean on the two sign choices producing distinct representations. It is also the algebraic heart of counting lattice points on circles.
`,

"arithmetic-series": String.raw`
## Key forms
- $a_n = a_1 + (n - 1)d$ — the $n$th term of a sequence that changes by $d$ each step
- $n = \dfrac{a_n - a_1}{d} + 1$ — the number of terms from $a_1$ to $a_n$ in steps of $d$
- $S_n = \dfrac{n(a_1 + a_n)}{2}$ — the sum is the number of terms times the average of the first and last
- $S_n = \dfrac n2\left(2a_1 + (n - 1)d\right)$ — the same sum when the last term is not known

## Conditions
The difference $d$ between consecutive terms is constant, and $n$ is a positive integer. The formulas hold for every $d$, including negative or zero, and for any $n$, odd or even.

## Why it works
Write the sum forwards and backwards, one line above the other, and every column adds up to the same number.

Write $S = a_1 + a_2 + \cdots + a_n$, and underneath it the same sum reversed, $S = a_n + a_{n-1} + \cdots + a_1$. Add the two lines column by column. Moving one column to the right raises the top term by $d$ and lowers the bottom term by $d$, so every column has the same total as the first one, $a_1 + a_n$. There are $n$ columns, so $2S = n(a_1 + a_n)$, and halving gives the formula.

{{figure:two-staircases}}

The figure is the same argument in blocks: two copies of the staircase, one turned upside down, fit together into a rectangle $n$ columns wide and $a_1 + a_n$ tall, so one staircase is half of it. It also shows why the sum is the number of terms times the average term. The terms are spread evenly around the average of the two ends, so the amounts above it exactly make up for the amounts below.

Writing the sum twice also avoids the worry that pairing first with last leaves a middle term over when $n$ is odd, since the doubled sum works for every $n$.

The term formula is the same bookkeeping. Getting from $a_1$ to $a_n$ takes $n - 1$ steps of size $d$, so $a_n = a_1 + (n-1)d$, and solving that for $n$ gives the term count. Substituting $a_n = a_1 + (n - 1)d$ into the sum gives the version that needs no last term.

## Useful observations
- The sum is count times average, $\text{sum} = \text{number of terms} \times \text{average term}$, and that reading survives where the formula does not: any list symmetric about its middle has sum equal to its length times its middle value, so the same computation handles a set of residues, a run of consecutive integers, or the terms of a symmetric sum that is not arithmetic.
- The sum converts into a product, which is why it is useful inside other problems: a sum over a run of unknown length becomes $n$ times an average, so an equation about a total becomes an equation about $n$, and since $n$ must be a positive integer, one divisibility or bounding step often finishes what looked like a problem in two unknowns.
- The usual error is counting the terms. A run from $a$ to $b$ in steps of $d$ has $\frac{b - a}{d} + 1$ terms, and the $+1$ is missed constantly. When the last term is unknown, use $\frac n2\left(2a_1 + (n-1)d\right)$ so that only one unknown remains.
- Disguises: a sum of a residue class ("all multiples of $7$ under $500$") is an arithmetic series with $d = 7$; interior-angle sums of polygons are one with $d = 180^\circ$; and the sums of consecutive blocks of an arithmetic sequence form another arithmetic sequence.

## Applications
Sums of evenly spaced numbers, term counts, polygon angle sums, and sums over multiples or residue classes.

## Contest profile
Everywhere, and very often alone: it is among the cards most often the entire solution. Its usual partner is [[geometric-series|a geometric series]], in problems built to contrast the two. Training the disguises matters more than the formula.
`,

"geometric-series": String.raw`
## Key forms
- $a_n = a\,r^{n-1}$ — the $n$th term, each term being the previous one times the ratio $r$
- $S_n = a\,\dfrac{1 - r^n}{1 - r}$ for $r \ne 1$, and $S_n = na$ for $r = 1$ — the first $n$ terms
- $S_\infty = \dfrac{a}{1 - r}$ for $|r| < 1$ — the sum of all the terms; for $|r| \ge 1$ the infinite sum does not exist
- $a + ar^2 + ar^4 + \cdots = \dfrac{a}{1 - r^2}$ — every other term is a geometric series with ratio $r^2$

## Conditions
The ratio $r$ between consecutive terms is constant. The infinite sum needs $|r| < 1$, and the finite formula needs $r \ne 1$.

## Why it works
Multiplying the sum by $r$ shifts every term over by one place, so subtracting the two makes almost everything cancel.

Write $S = a + ar + ar^2 + \cdots + ar^{n-1}$. Then $rS = ar + ar^2 + \cdots + ar^{n-1} + ar^n$: the same terms moved one place along, with a new term at the end and the first term missing. Subtracting, every term except those two cancels, so $S - rS = a - ar^n$. That is $S(1 - r) = a(1 - r^n)$, and dividing by $1 - r$, which is allowed when $r \ne 1$, gives $S = a\,\frac{1 - r^n}{1 - r}$.

For the infinite sum, let $n$ grow. When $|r| < 1$ the powers $r^n$ shrink toward $0$, so the finite sums approach $\frac{a}{1 - r}$, and that limit is what the infinite sum means. When $|r| \ge 1$ the terms do not shrink, and the sums never settle down.

The figure at the top is the case $a = \frac12$, $r = \frac12$: each piece is half of what is left, the pieces fill the whole square, and $\frac{1/2}{1 - 1/2} = 1$. When $r = 1$ the formula does not apply, but it is not needed: all $n$ terms equal $a$, and the sum is $na$.

## Useful observations
- The move is more reusable than the formula: multiplying the sum by $r$ and subtracting shifts every term onto its neighbor so that all but two cancel, and that same move closes an [[arithmetico-geometric|arithmetico-geometric]] sum, turns a repeating decimal into a fraction, and solves a first-order recurrence.
- It converts an infinite process into a number. A ball bouncing forever, a fractal dissected forever, and a game that might go on forever are each unbounded in time and finite in total, and the series makes that total computable.
- Self-similarity is the tell: whenever a figure or process contains a scaled copy of itself, the ratio of the copy is $r$.
- Confirm $|r| < 1$ before summing an infinite series. When only some terms are wanted, re-index rather than filter: every other term has ratio $r^2$.
- The recurring shapes: the total distance of an infinite bounce, the shaded area of a fractal dissection, the probability that a repeated trial first succeeds on turn $k$, and a repeating decimal.

## Applications
Infinite processes with a constant ratio, repeating decimals, bounce and dissection problems, and probabilities of a first success.

## Contest profile
Unusually self-sufficient for a tool this common: it is often the whole solution. When it has a partner it is [[arithmetic-series|an arithmetic series]], typically a problem that hands over one of each and asks for them to be combined or compared.
`,

"power-sums": String.raw`
## Key forms
- $\alt{\sum_{k=1}^{n} k = \dfrac{n(n+1)}{2}}{1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}}$ — the sum of the first $n$ integers
- $\alt{\sum_{k=1}^{n} k^2 = \dfrac{n(n+1)(2n+1)}{6}}{1^2 + 2^2 + \cdots + n^2 = \dfrac{n(n+1)(2n+1)}{6}}$ — the sum of the squares
- $\alt{\sum_{k=1}^{n} k^3 = \left(\dfrac{n(n+1)}{2}\right)^2}{1^3 + 2^3 + \cdots + n^3 = \left(\dfrac{n(n+1)}{2}\right)^2}$ — the sum of the cubes, the square of the sum of the numbers
- $\alt{\sum_{k=1}^{n}(2k-1) = n^2}{1 + 3 + \cdots + (2n-1) = n^2}$ and $\alt{\sum_{k=1}^{n}2k = n(n+1)}{2 + 4 + \cdots + 2n = n(n+1)}$ — the odd numbers and the even numbers
- $\alt{\sum_{k=a}^{b} f(k) = \sum_{k=1}^{b} f(k) - \sum_{k=1}^{a-1} f(k)}{f(a) + \cdots + f(b) = \big(f(1) + \cdots + f(b)\big) - \big(f(1) + \cdots + f(a-1)\big)}$ — a sum that does not start at $1$

## Conditions
$n$ is a positive integer, and every formula starts at $k = 1$. The number of terms in a sum of consecutive integers is $n$, so the even numbers up to $100$ have $n = 50$.

## Why it works
The sum of the first $n$ integers comes from pairing, and each higher sum comes from a telescoping sum that trades it for the lower ones.

Pairing: write $1 + 2 + \cdots + n$ forwards and backwards and add term by term. Each of the $n$ pairs adds to $n + 1$, so twice the sum is $n(n + 1)$.

Squares: add up $(k + 1)^3 - k^3 = 3k^2 + 3k + 1$ for $k = 1$ to $n$. The left side telescopes to $(n + 1)^3 - 1$, and the right side is $3\sum k^2 + \frac{3n(n + 1)}{2} + n$. Solving, $$3\sum k^2 = (n + 1)^3 - (n + 1) - \frac{3n(n + 1)}{2} = \frac{n(n + 1)(2n + 1)}{2},$$ so $\sum k^2 = \frac{n(n + 1)(2n + 1)}{6}$. The same step with $(k + 1)^4 - k^4$ gives the cubes.

The cube formula also has a picture. A square of side $1 + 2 + \cdots + n$ splits into L-shaped bands, and the $k$th band lies between the squares of sides $\frac{(k - 1)k}{2}$ and $\frac{k(k + 1)}{2}$. Its area is the difference of their squares, which factors as $k \cdot k^2 = k^3$. The bands fill the square, so $1^3 + 2^3 + \cdots + n^3 = (1 + 2 + \cdots + n)^2$.

{{figure:cubes}}

## Useful observations
- Any polynomial summed over $k = 1$ to $n$ reduces to these formulas plus $\sum 1 = n$: expand, sum term by term, and simplify. For example $$\sum_{k=1}^{n} k(k + 1) = \sum k^2 + \sum k = \frac{n(n + 1)(n + 2)}{3}.$$
- A sum that starts anywhere else needs the prefix subtracted first. The piece removed ends at $a - 1$, not $a$; using $a$ silently drops the $k = a$ term.
- The odd and even sums have last terms $2n - 1$ and $2n$, so "the even numbers up to $100$" means $n = 50$.

## Applications
Closed forms for polynomial sums, counts of rectangles and squares in a grid, divisibility conditions on triangular numbers, and the sum of an arithmetic progression.

## Contest profile
Eight problems here, six AIME and two AMC 12, none by it alone and each with a different partner, since a closed-form sum is usually one step inside a larger count: [[rectangles-in-grid|rectangles in a grid]], or a divisibility condition on a triangular number settled with [[crt|the Chinese Remainder Theorem]]. The fact that the sum of the cubes is the square of the sum is sometimes tested directly.
`,

"telescoping": String.raw`
## When to use
Sums of fractions whose denominators factor into terms in arithmetic progression, such as $\frac{1}{k(k+1)}$, $\frac{1}{(2k-1)(2k+1)}$ or $\frac{1}{k(k+1)(k+2)}$; sums of radical fractions $\frac{1}{\sqrt k + \sqrt{k+1}}$; terms like $\frac{k}{(k+1)!}$; products such as $\prod\left(1 - \frac{1}{k^2}\right)$; and sums of $\arctan$, $\tan$, or $\cot$ at related angles. The signal is a long sum whose terms all have the same shape and whose answer is supposed to be a simple number.

A sum that no rewriting turns into $f(k) - f(k + 1)$ is not telescoping, and writing out its first three terms shows it at once.

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

"arithmetico-geometric": String.raw`
## Key forms
- $\alt{\sum_{k=1}^{\infty} kx^k = \dfrac{x}{(1-x)^2}}{x + 2x^2 + 3x^3 + \cdots = \dfrac{x}{(1-x)^2}}$ for $\lvert x \rvert \lt 1$
- $\alt{\sum_{k=1}^{\infty} k^2x^k = \dfrac{x(1+x)}{(1-x)^3}}{x + 4x^2 + 9x^3 + \cdots = \dfrac{x(1+x)}{(1-x)^3}}$ for $\lvert x \rvert \lt 1$
- $\alt{\sum_{k=1}^{n} kx^k = \dfrac{x\left(1 - (n+1)x^n + nx^{n+1}\right)}{(1-x)^2}}{x + 2x^2 + \cdots + nx^n = \dfrac{x\left(1 - (n+1)x^n + nx^{n+1}\right)}{(1-x)^2}}$ — the finite sum
- $\alt{\sum_{k=1}^{n} k2^k = (n-1)2^{n+1} + 2}{1\cdot 2 + 2 \cdot 4 + \cdots + n2^n = (n-1)2^{n+1} + 2}$ — the finite sum at $x = 2$

## Conditions
The infinite sums need $\lvert x \rvert \lt 1$ to converge. The finite sum holds for $x \ne 1$, and at $x = 1$ it is the arithmetic sum $\frac{n(n+1)}{2}$.

## Why it works
Differentiate $\sum x^k = \frac{1}{1-x}$ termwise, or avoid calculus: $S - xS$ turns the linear coefficients into a plain geometric series.

Take $S = x + 2x^2 + 3x^3 + \cdots$ and subtract $xS = x^2 + 2x^3 + \cdots$. The coefficient of each power of $x$ drops from $k$ to $k - (k - 1) = 1$, so $S - xS = x + x^2 + x^3 + \cdots = \frac{x}{1-x}$, and $S = \frac{x}{(1-x)^2}$.

For the finite sum, the subtraction leaves one extra term at the end:
$$S_n - xS_n = x + x^2 + \cdots + x^n - nx^{n+1} = \frac{x(1 - x^n)}{1 - x} - nx^{n+1}.$$
Dividing by $1 - x$ and collecting gives $\frac{x\left(1 - (n+1)x^n + nx^{n+1}\right)}{(1-x)^2}$. At $x = 2$ the denominator is $1$, and $2\left(1 - (n+1)2^n + n2^{n+1}\right) = (n - 1)2^{n+1} + 2$.

For the squares, $T = \sum k^2x^k$ gives $T - xT = \sum \left(k^2 - (k-1)^2\right)x^k = \sum (2k - 1)x^k = 2S - \frac{x}{1-x}$, which is $\frac{x(1 + x)}{(1-x)^2}$; dividing by $1 - x$ once more gives $\frac{x(1+x)}{(1-x)^3}$.

## Useful observations
- The shift-subtract derivation is fast and safe under pressure, and it works for finite sums too: the leftover term at the end gives the $(n+1)x^n$ correction.
- Each further factor of $k$ needs one more round of the derivation, or one more derivative, which is why $\sum k^2x^k$ has $(1-x)^3$ in the denominator.
- This is the standard closed form behind expected values of geometric-type random variables.

## Applications
Expected values of geometric-type random variables, sums such as $\frac12 + \frac24 + \frac38 + \cdots$, and finite sums of $k$ times a geometric term.

## Contest profile
Expected-value problems, such as the expected number of flips, and sums whose terms are a counter over a power of two appear on AMC and AIME regularly; the shift-subtract derivation is fast and safe under pressure.
`,

"binets-formula": String.raw`
## Key forms
- $F_n = \dfrac{\varphi^n - \psi^n}{\sqrt5}$ with $\varphi = \dfrac{1+\sqrt5}{2}$ and $\psi = \dfrac{1-\sqrt5}{2}$ — the closed form for the Fibonacci numbers, with $F_0 = 0$ and $F_1 = 1$
- $F_n$ is the nearest integer to $\dfrac{\varphi^n}{\sqrt5}$ — since $\lvert\psi\rvert \lt 1$, the second term is tiny
- $\alt{\sum_{i=1}^{n} F_i = F_{n+2} - 1}{F_1 + F_2 + \cdots + F_n = F_{n+2} - 1}$ and $\alt{\sum_{i=1}^{n} F_i^2 = F_nF_{n+1}}{F_1^2 + F_2^2 + \cdots + F_n^2 = F_nF_{n+1}}$ — the two sums that telescope
- $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$ — Cassini's identity
- $F_{m+n} = F_mF_{n+1} + F_{m-1}F_n$ — the addition rule
- $\gcd(F_m, F_n) = F_{\gcd(m, n)}$ — the divisibility property

## Conditions
The sequence starts $F_0 = 0$, $F_1 = 1$, and $F_{n+1} = F_n + F_{n-1}$. The numbers $\varphi$ and $\psi$ are the two roots of $x^2 = x + 1$, so $\varphi + \psi = 1$ and $\varphi\psi = -1$.

## Why it works
A geometric sequence $r^n$ satisfies the Fibonacci rule exactly when $r^2 = r + 1$, and the combination of the two such sequences that fits the first two terms is the whole sequence.

Putting $r^n$ into $F_{n+1} = F_n + F_{n-1}$ and dividing by $r^{n-1}$ gives $r^2 = r + 1$, with roots $\varphi$ and $\psi$. The rule is linear, so $A\varphi^n + B\psi^n$ satisfies it for any constants, and matching $F_0 = 0$ and $F_1 = 1$ gives $A = -B = \frac1{\sqrt5}$. This is the general method for [[linear-recurrence|linear recurrences]].

The identities come from the recurrence itself. Since $F_i = F_{i+2} - F_{i+1}$, the sum $F_1 + \cdots + F_n$ [[telescoping|telescopes]] to $F_{n+2} - F_2 = F_{n+2} - 1$.

## Useful observations
- For a single far-out term or its size, the closed form is used: $F_n$ is the nearest integer to $\frac{\varphi^n}{\sqrt5}$, so it has roughly $0.209n$ digits, since $\log_{10}\varphi \approx 0.209$. For $n = 100$ that is $21$ digits.
- For sums, products, and divisibility, the identities are used instead. For example $F_1 + \cdots + F_8 = F_{10} - 1 = 54$, and $\gcd(F_{12}, F_{18}) = F_6 = 8$.
- Cassini's identity says $F_nF_{n+2} - F_{n+1}^2$ alternates between $1$ and $-1$, which is the source of the classic "missing square" dissection of a square into pieces of Fibonacci size.

## Applications
Far-out Fibonacci terms and their sizes, sums of Fibonacci numbers and of their squares, divisibility and gcd problems, and recurrences solved by the characteristic equation.

## Contest profile
Four problems here, split between AMC and AIME, none by it alone; two continue into linear recurrences in general. Fibonacci sums and gcds appear on AIME with the identities as the intended shortcuts.
`,

"linear-recurrence": String.raw`
## Key forms
- $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k} \implies x^k = c_1x^{k-1} + \cdots + c_k$ — the characteristic equation, whose roots are the ratios of the geometric sequences that satisfy the rule
- $a_n = \alt{\sum_i A_i r_i^{\,n}}{A_1r_1^{\,n} + A_2r_2^{\,n} + \cdots + A_kr_k^{\,n}}$ for distinct roots $r_i$, with the constants fixed by the first $k$ terms
- $a_n = (A + Bn)\,r^n$ for a double root $r$, and in general a root of multiplicity $m$ contributes a polynomial of degree $m - 1$ times $r^n$
- $a_n = \rho^n(A\cos n\phi + B\sin n\phi)$ for a complex pair $\rho e^{\pm i\phi}$
- a rule with an extra term $f(n)$ has solution = a particular solution shaped like $f(n)$ + the solution without $f(n)$

## Conditions
The coefficients $c_i$ are constants and the rule involves the $k$ previous terms, so $k$ initial terms determine the sequence. Nonlinear rules are not covered directly and need a substitution first.

## Why it works
Geometric sequences are the building blocks: substituting $a_n = r^n$ turns the recurrence into an equation for $r$, and any combination of the geometric sequences that work also works.

Put $a_n = r^n$ into $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ and divide by $r^{n-k}$. The result is $$r^k = c_1r^{k-1} + \cdots + c_k,$$ the characteristic equation, so its roots are exactly the ratios whose geometric sequences obey the rule.

The rule is linear, so a sum of solutions, or a multiple of one, is again a solution, and $\sum_i A_ir_i^{\,n}$ works for any constants $A_i$. With $k$ distinct roots there are $k$ constants, just enough to match the $k$ initial terms, and since those terms determine the whole sequence, the matching combination is the sequence.

For $a_n = a_{n-1} + 2a_{n-2}$ the characteristic equation is $x^2 = x + 2$, with roots $2$ and $-1$, so $a_n = A \cdot 2^n + B(-1)^n$.

A repeated root leaves one constant short, and $nr^n$ supplies the missing solution: it is what two geometric solutions look like in the limit as their ratios merge. A complex-conjugate pair combines into the real form $\rho^n(A\cos n\phi + B\sin n\phi)$, which is why some linear recurrences oscillate instead of growing steadily; when $\rho = 1$ and $\phi$ is a rational multiple of $\pi$, the sequence is periodic.

## Useful observations
- The general solution is assembled from the roots of the characteristic equation, and the small linear system the initial terms give fixes the constants. Checking one term beyond the ones fitted catches almost every algebra slip.
- For a rule with an extra term, the particular solution is guessed by matching the shape of $f(n)$: a constant for a constant, a degree-$d$ polynomial for a degree-$d$ polynomial, $Cs^n$ for $s^n$. If that guess already solves the rule without $f(n)$, it is multiplied by $n$ and tried again.
- A recurrence that is not linear can often be made so by a substitution. With $b_n = \frac{1}{a_n}$, $$a_n = \frac{a_{n-1}}{1 + a_{n-1}} \quad \text{becomes} \quad b_n = b_{n-1} + 1,$$ an [[arithmetic-series|arithmetic sequence]]; $b_n = \log a_n$ linearizes a multiplicative rule, and $b_n = a_n - L$ handles a shifted fixed point.
- Failing that, computing terms and testing for periodicity is the standard fallback, since an ugly rational rule is usually periodic rather than solvable in closed form.

## Applications
Closed forms for sequences defined by recursion, counting recursions such as tilings and strings avoiding a pattern, Fibonacci-like growth, and terms of a sequence modulo $m$.

## Contest profile
Recognizing the branch within seconds is what the time pressure rewards: a $+d$ on a first-order rule means shifting to the fixed point, a two-term rule with no extra term means the characteristic equation, and an ugly rational rule means periodicity or a reciprocal substitution.

Of the 13 problems tagged here only 1 needs nothing else, with [[telescoping|telescoping]] and [[binets-formula|Binet's Formula]] the usual partners (2 each). AIME more often asks for a term modulo $m$, and then the closed form is skipped: the recurrence is iterated modulo $m$ until the cycle appears.
`,

"am-gm": String.raw`
## Key forms
- $\dfrac{a_1 + a_2 + \cdots + a_n}{n} \ge \sqrt[n]{a_1a_2\cdots a_n}$ for $a_i \ge 0$, with equality exactly when all the numbers are equal
- $a + b \ge 2\sqrt{ab}$ — the two-number form
- $x + \dfrac1x \ge 2$ for $x > 0$, and $\dfrac ab + \dfrac ba \ge 2$
- a sum with fixed product is smallest, and a product with fixed sum is largest, when the terms are equal

## Conditions
All the numbers are nonnegative. The equality case must be reachable within the problem's constraints; if it is not, the bound is true but is not the answer.

## Why it works
For two numbers, the gap between the arithmetic and geometric means is a perfect square, so it can never be negative: $\frac{a + b}{2} - \sqrt{ab} = \frac{(\sqrt a - \sqrt b)^2}{2} \ge 0$, and the square is zero only when $a = b$. The same fact has a picture: four $a \times b$ rectangles fit inside a square of side $a + b$ with a square hole of side $a - b$ left over, so $(a + b)^2 \ge 4ab$.

{{figure:pinwheel}}

For $n$ numbers, a smoothing argument gives the general case. Let $m$ be their mean. If the numbers are not all equal to $m$, one of them, $x$, is above $m$ and another, $y$, is below. Replace $x$ by $m$ and $y$ by $x + y - m$. The sum does not change, and the product goes up, because $m(x + y - m) - xy = (x - m)(m - y) > 0$.

Each step makes one more number equal to $m$, so after at most $n$ steps all of them equal $m$, and the product has only grown, to $m^n$. The original product was therefore at most $m^n$, which is the inequality. It also follows from [[jensens-inequality|Jensen's Inequality]] for the concave function $\log x$.

## Useful observations
- To minimize a sum whose terms have a constant product, or maximize a product with a constant sum, the terms are arranged so that the equality case can happen: $x + \frac{16}{x} \ge 2\sqrt{16} = 8$, with equality at $x = 4$.
- When the product is not constant, terms are split until it is: for $2x + \frac3{x^2}$, writing $2x$ as $x + x$ makes the three terms $x$, $x$, and $\frac3{x^2}$ have product $3$, so $x + x + \frac3{x^2} \ge 3\sqrt[3]{3}$, reached at $x = \sqrt[3]3$.
- When the terms carry weights or squares, [[cauchy-schwarz|Cauchy–Schwarz]] is often the better tool.
- Instant consequences worth knowing: among rectangles with a given perimeter the square has the largest area.

## Applications
Minimum and maximum values of sums and products with a fixed counterpart, and bounding steps in larger arguments.

## Contest profile
Typically the whole solution once the right split is found. The AMC uses it for "minimum value of" questions and the AIME for bounding steps.
`,

"mean-chain": String.raw`
## Key forms
- $\sqrt{\dfrac{a_1^2 + \cdots + a_n^2}{n}} \ge \dfrac{a_1 + \cdots + a_n}{n} \ge \sqrt[n]{a_1 \cdots a_n} \ge \dfrac{n}{\frac1{a_1} + \cdots + \frac1{a_n}}$ — quadratic mean, arithmetic mean, geometric mean, and harmonic mean
- for two numbers, $\sqrt{\dfrac{a^2 + b^2}{2}} \ge \dfrac{a + b}{2} \ge \sqrt{ab} \ge \dfrac{2ab}{a + b}$
- all the equalities hold exactly when all the values are equal

## Conditions
The values $a_i$ are positive reals. The first inequality, QM $\ge$ AM, holds for all reals, but the geometric and harmonic means need positive values.

## Why it works
The chain is really one inequality proved three times. QM $\ge$ AM is the statement that variance is nonnegative: expanding $\sum(a_i - \bar a)^2 \ge 0$ gives $\sum a_i^2 \ge n\bar a^2$, which is exactly $\text{QM}^2 \ge \text{AM}^2$.

AM $\ge$ GM follows from the concavity of $\ln$. And GM $\ge$ HM is not a new fact at all: it is AM $\ge$ GM applied to the reciprocals $1/a_i$ and then flipped. Every equality case is the same: all the $a_i$ are equal.

## Full proof
Throughout, $a_1, \ldots, a_n \gt 0$ and $\bar a = \frac1n\sum a_i$ denotes the arithmetic mean.

QM $\ge$ AM. Since squares are nonnegative, $\sum_{i=1}^n (a_i - \bar a)^2 \ge 0$. Expanding, $\sum a_i^2 - 2\bar a\sum a_i + n\bar a^2 \ge 0$, and $\sum a_i = n\bar a$, so this is $\sum a_i^2 - n\bar a^2 \ge 0$.

Dividing by $n$ gives $\frac1n\sum a_i^2 \ge \bar a^2$, and taking square roots of both nonnegative sides gives $\sqrt{\frac1n\sum a_i^2} \ge \bar a$. Equality needs every $(a_i - \bar a)^2 = 0$, that is, all $a_i$ equal.

AM $\ge$ GM. The function $\ln$ is concave, since $(\ln x)'' = -1/x^2 \lt 0$. [[jensens-inequality|Jensen's Inequality]] for a concave function says the function of the average is at least the average of the function, so $\ln\!\left(\frac1n\sum a_i\right) \ge \frac1n\sum \ln a_i = \ln\!\left(\left(\prod a_i\right)^{1/n}\right)$.

Exponentiating preserves the inequality, giving $\frac1n\sum a_i \ge \left(\prod a_i\right)^{1/n}$. Jensen is an equality exactly when all inputs coincide, so again all $a_i$ must be equal. For $n = 2$ this needs no machinery: $\frac{a + b}{2} - \sqrt{ab} = \frac{(\sqrt a - \sqrt b)^2}{2} \ge 0$.

GM $\ge$ HM. Apply the AM $\ge$ GM inequality just proved to the positive numbers $1/a_1, \ldots, 1/a_n$: $\frac1n\sum\frac1{a_i} \ge \left(\prod \frac1{a_i}\right)^{1/n} = \frac{1}{\left(\prod a_i\right)^{1/n}}$.

Both sides are positive, so taking reciprocals reverses the inequality: $\left(\prod a_i\right)^{1/n} \ge \frac{n}{\sum 1/a_i}$, which is GM $\ge$ HM. Chaining the three gives QM $\ge$ AM $\ge$ GM $\ge$ HM, with a single equality case: $a_1 = a_2 = \cdots = a_n$.

## Useful observations
- The pair of means matching the given data and the target is chosen: given a sum of squares, QM-AM converts to a sum bound; given a sum of reciprocals, HM enters.
- The chain settles "which is bigger" comparison questions instantly.
- The harmonic mean appears as the [[average-speed|average speed]] over equal distances, the classic "drive there at 30, back at 60" trap, where the answer is $40$ and not $45$.

## Applications
Comparison questions about means, bounds from a sum of squares or a sum of reciprocals, and the equality cases of symmetric inequalities.

## Contest profile
AMC comparison problems and AIME bounding steps.
`,

"cauchy-schwarz": String.raw`
## Key forms
- $\alt{\left(\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)}{(a_1b_1 + \cdots + a_nb_n)^2 \le (a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2)}$ — the plain form, with equality exactly when the two sequences are proportional
- $\alt{\sum \dfrac{x_i^2}{y_i} \ge \dfrac{\left(\sum x_i\right)^2}{\sum y_i}}{\dfrac{x_1^2}{y_1} + \cdots + \dfrac{x_n^2}{y_n} \ge \dfrac{(x_1 + \cdots + x_n)^2}{y_1 + \cdots + y_n}}$ — Titu's lemma, also called the Engel form, for squares over positive denominators
- $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$ — the vector reading: the [[vector-dot-product|dot product]] carries a $\cos\theta$ that never exceeds $1$
- $a_i = \sqrt{w_i}\cdot\dfrac{a_i}{\sqrt{w_i}}$ — the weighting trick: splitting each term this way before applying the inequality gives a weighted version for free

## Conditions
The numbers are real. Titu's lemma needs every $y_i > 0$. Equality holds exactly when the two sequences are proportional (for Titu: when $\frac{x_i}{y_i}$ is the same for every $i$).

## Why it works
A quadratic that is never negative cannot have two real roots, and that is the whole inequality.

For every real $t$, $\sum_i (a_it + b_i)^2 = \left(\sum a_i^2\right)t^2 + 2\left(\sum a_ib_i\right)t + \sum b_i^2 \ge 0$. A quadratic that never dips below zero has discriminant at most $0$, and here the discriminant is $4\left(\sum a_ib_i\right)^2 - 4\left(\sum a_i^2\right)\left(\sum b_i^2\right)$, which gives the inequality. Equality needs a $t$ that makes every $a_it + b_i$ zero, which means the sequences are proportional.

[[lagranges-identity|Lagrange's Identity]] writes the gap as a sum of squares, which proves the inequality a second way. Geometrically the statement is $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$, since the dot product carries a factor $\cos\theta$, which is never more than $1$ in size.

Titu's lemma is the plain form with $a_i = \frac{x_i}{\sqrt{y_i}}$ and $b_i = \sqrt{y_i}$: then $\sum a_ib_i = \sum x_i$, and the inequality reads $\left(\sum x_i\right)^2 \le \left(\sum \frac{x_i^2}{y_i}\right)\left(\sum y_i\right)$.

## Useful observations
- Choosing the two sequences is the art. To bound a linear sum under a constraint on squares, the sum's coefficients form one sequence and the constraint's variables the other: $(x + 2y + 2z)^2 \le (1^2 + 2^2 + 2^2)(x^2 + y^2 + z^2)$, so if $x^2 + y^2 + z^2 = 1$ the sum is at most $3$, reached at $(x, y, z) = \left(\frac13, \frac23, \frac23\right)$, where the two sequences are proportional.
- Titu's lemma handles squares over positive denominators directly. Given $a + b = 1$, $\frac1a + \frac4b = \frac{1^2}{a} + \frac{2^2}{b} \ge \frac{(1 + 2)^2}{a + b} = 9$, with equality when $\frac1a = \frac2b$, at $a = \frac13$ and $b = \frac23$.
- Tracking the equality case is what locates the extreme point.
- With the weights $b_i = 1$ it proves that the quadratic mean is at least the arithmetic mean.

## Applications
Bounds on linear sums under a constraint on squares, minima of sums of fractions with squared numerators, and the vector inequality.

## Contest profile
The model AIME use is a pair of constraints that combine into exactly the equality case of the Engel form, which forces the variables to be proportional and so pins every one of them down. It is the default first attempt on an olympiad inequality.
`,

"rearrangement": String.raw`
## Key forms
- $\alt{\sum a_ib_i}{a_1b_1 + a_2b_2 + \cdots + a_nb_n}$ with both sequences sorted the same way is the largest sum of products, over all pairings $\sigma$ of the second sequence
- the same sum with the sequences sorted in opposite orders is the smallest
- every other pairing lies between the two: $\alt{a_1b_n + \cdots + a_nb_1 \le \sum a_ib_{\sigma(i)} \le a_1b_1 + \cdots + a_nb_n}{a_1b_n + \cdots + a_nb_1 \le a_1b_{\sigma(1)} + \cdots + a_nb_{\sigma(n)} \le a_1b_1 + \cdots + a_nb_n}$ for $a_1 \le \cdots \le a_n$ and $b_1 \le \cdots \le b_n$

## Conditions
Real sequences, sorted; no positivity is needed. Equality needs one sequence constant or the orders already matched.

## Why it works
For sorted sequences $a_1 \le \cdots \le a_n$ and $b_1 \le \cdots \le b_n$, the sum $\sum a_ib_{\sigma(i)}$ over permutations $\sigma$ is largest when $\sigma$ keeps the same order and smallest when it reverses one.

The proof is a swap argument: if some pair is matched out of order, exchanging the two partners changes the sum by $(a_i - a_j)(b_{\sigma(i)} - b_{\sigma(j)})$, whose sign forces the straightened pairing to be at least as large. Repeating until everything is aligned needs no convexity or positivity, only the ordering.

## Useful observations
- It makes "pair large with large" rigorous, and it is the honest engine behind several results: averaging the same-order and reverse-order versions gives Chebyshev's Sum Inequality, and it underlies many bounds that look like forced AM-GM.
- When a cyclic sum resists, the question is whether its terms are two sorted sequences in disguise.
- Applied to a sequence and itself, it gives $\sum a_i^2 \ge \sum a_ia_{\sigma(i)}$, the base of many symmetric inequalities.

## Applications
Maximizing or minimizing a sum of products over assignments, proving symmetric and cyclic inequalities, and Chebyshev-type bounds.

## Contest profile
Mostly olympiad, but AMC and AIME problems that assign given values to maximize or minimize a sum of products are direct: both lists are sorted and paired in the same order for the maximum, opposite order for the minimum.
`,

"trivial-inequality": String.raw`
## Key forms
- $x^2 \ge 0$ for every real $x$, with equality only at $x = 0$
- $a^2 + b^2 \ge 2ab$ — equivalent to $(a - b)^2 \ge 0$, with equality exactly when $a = b$
- $a^2 + b^2 + c^2 \ge ab + bc + ca$ — the symmetric form, with equality exactly when $a = b = c$
- a sum of squares is nonnegative, and zero only when every square is

## Conditions
The numbers are real. For complex numbers $x^2 \ge 0$ fails, and $|x|^2 \ge 0$ is used instead.

## Why it works
A real number and its negative have the same square, and the square of a positive number is positive, so $x^2 \ge 0$ for every real $x$, with equality exactly at $x = 0$. A sum of squares is therefore nonnegative too, and it is zero only when every square is.

Applied to a difference, it gives the two-variable form $(a - b)^2 \ge 0 \iff a^2 + b^2 \ge 2ab$, with equality exactly when $a = b$. Adding the three such inequalities for the pairs from $a$, $b$, $c$ and halving gives $a^2 + b^2 + c^2 - ab - bc - ca = \frac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right] \ge 0$.

The two-variable form with $a = \sqrt x$ and $b = \sqrt y$ is already [[am-gm|AM-GM]] for two numbers, and [[cauchy-schwarz|Cauchy–Schwarz]] and [[mean-chain|the mean inequalities]] are sums of such squares.

## Useful observations
- For an expression in several variables, [[completing-the-square|completing the square]] in each variable leaves a constant: $x^2 - 6x + y^2 + 4y + 20 = (x - 3)^2 + (y + 2)^2 + 7 \ge 7$, with equality at $(3, -2)$.
- A product or a cross term in the way hides a square: $a^2 + b^2 \ge 2ab$ bounds a product by a sum of squares, and $\frac xy + \frac yx \ge 2$ for positive $x$ and $y$ is $\left(\sqrt{x/y} - \sqrt{y/x}\right)^2 \ge 0$. Writing a symmetric expression as a sum of squares is the [[sos-method|SOS method]].
- The equality case matters as much as the bound: every square must vanish at once, which finds the point where the minimum occurs and confirms that it is reached.

## Applications
Minima of expressions in several variables, the base of AM-GM and Cauchy–Schwarz, and sums of squares.

## Contest profile
Minimization questions in two or three free variables usually end as a sum of squares plus a constant, and the equality case gives the point where the minimum occurs.
`,

"abs-triangle-inequality": String.raw`
## Key forms
- $|a + b| \le |a| + |b|$ — the triangle inequality, with equality exactly when the terms point the same way
- $|a - b| \ge \big||a| - |b|\big|$ — the reverse form, with equality when they point opposite ways
- for $|z| = r$: $\big||w| - r\big| \le |z - w| \le |w| + r$ — the range of a distance from a fixed point to a point on a circle

## Conditions
It holds for real numbers, complex numbers, and vectors. "Pointing the same way" means the same sign for reals and the same argument for complex numbers.

## Why it works
For real or complex numbers, square both sides: $|a + b|^2 = |a|^2 + 2\operatorname{Re}(a\bar b) + |b|^2 \le |a|^2 + 2|a||b| + |b|^2$, because $\operatorname{Re}(a\bar b) \le |a\bar b|$, with equality exactly when $a\bar b$ is a nonnegative real, that is, when $a$ and $b$ point the same way.

Geometrically it says that a detour through a third point cannot be shorter than the direct path: the side of a triangle is at most the sum of the other two. The reverse form is the same fact with the roles of the sides exchanged, since one side is at least the difference of the other two.

## Useful observations
- It is a bounding tool: $|A + B|$ splits into $|A| + |B|$, and $|A - B|$ is bounded below by the reverse form.
- In complex-number problems it converts algebraic constraints into geometric ones: the maximum and minimum of $|z - w|$ given $|z| = r$ are $|w| + r$ and $\big||w| - r\big|$, reached when $z$ is on the line through $0$ and $w$.
- Both ends of the interval are attained, so the range cannot be narrowed.
- Distance bounds in coordinate problems and elimination of cases in absolute-value equations use the same inequality.

## Applications
Ranges of $|z + w|$ and $|z - w|$, distance bounds, and absolute-value equations.

## Contest profile
Most often a quick bounding step in a complex-number or coordinate problem, and a tool for [[casework-method|casework]] elimination in absolute-value equations.
`,

"bernoulli-inequality": String.raw`
## Key forms
- $(1 + x)^n \ge 1 + nx$ for $x \ge -1$ and $n \ge 1$ — a linear lower bound on a power
- $(1 + x)^r \le 1 + rx$ for $0 \le r \le 1$ — the flipped form for fractional exponents, which bounds roots from above: $\sqrt{1 + x} \le 1 + \frac x2$
- equality only at $x = 0$ (or $n = 0, 1$) — the bound is the tangent line to $(1 + x)^n$ at $x = 0$

## Conditions
$x \ge -1$ so that $1 + x \ge 0$, and the exponent is a real number at least $1$ for the first form, in particular any positive integer.

## Why it works
Induct on $n$: it holds at $n = 1$, and if $(1 + x)^k \ge 1 + kx$ then, since $x \ge -1$ keeps $1 + x \ge 0$, multiplying preserves the inequality: $(1 + x)^{k+1} \ge (1 + kx)(1 + x) = 1 + (k + 1)x + kx^2 \ge 1 + (k + 1)x$. The last step drops $kx^2$, which is $0$ only at $x = 0$, so for $n \ge 2$ equality needs $x = 0$.

For a real exponent $r$, compare $f(x) = (1 + x)^r$ with its tangent line $1 + rx$ at $x = 0$. Since
$$f''(x) = r(r - 1)(1 + x)^{r - 2},$$
$f$ is convex for $r \ge 1$ and lies above the tangent, and concave for $0 \le r \le 1$ and lies below it. That gives both forms, and $\sqrt{1 + x} \le 1 + \frac x2$ is the case $r = \frac12$.

## Useful observations
- It is a fast, calculus-free bound on a power: it estimates compound growth, shows a power clears a linear target, or sandwiches limits like $\left(1 + \frac1n\right)^n$.
- For exponents in $[0, 1]$ the inequality flips, so $(1 + x)^r \le 1 + rx$ bounds roots from above.
- It is often an early step that turns a power into something linear before AM-GM or telescoping finishes.

## Applications
Estimation and bounding, limits of powers, and the standard lemma in olympiad inequalities.

## Contest profile
Common in estimation and bounding problems on the AMC and AIME, and a standard lemma in olympiad inequalities. Any time a power of one plus a small quantity has to be bounded below or above by something linear, this is the tool.
`,

"log-rules": String.raw`
## Key forms
- $\log_b(xy) = \log_b x + \log_b y$ and $\log_b\dfrac xy = \log_b x - \log_b y$ — products become sums, quotients become differences
- $\log_b x^n = n\log_b x$ — a power on the argument comes out front
- $\log_{b^m} x^n = \dfrac nm\log_b x$ — a power on the base divides
- $b^{\log_b x} = x$ and $\log_b b^p = p$ — taking a power and taking a log undo each other

## Conditions
The argument is positive and the base is positive and not $1$. For $b > 1$ the logarithm is increasing; for $0 < b < 1$ it is decreasing, so applying $\log_b$ to both sides of an inequality reverses it.

## Why it works
A logarithm is an exponent, so every log rule is an exponent law read backwards.

Write $x = b^p$ and $y = b^q$, so that $\log_b x = p$ and $\log_b y = q$. Multiplying, $xy = b^pb^q = b^{p+q}$, so $\log_b(xy) = p + q = \log_b x + \log_b y$: adding exponents is adding logs. Dividing instead gives $\frac xy = b^{p-q}$, the quotient rule. Raising to a power gives $x^n = (b^p)^n = b^{np}$, so $\log_b x^n = np = n\log_b x$.

The two identities $\log_b b^p = p$ and $b^{\log_b x} = x$ say that taking a power and taking a log undo each other. That is what the graphs show: $y = b^x$ and $y = \log_b x$ are mirror images across the line $y = x$.

{{figure:mirror}}

A power on the base divides instead of multiplying. By [[change-of-base|change of base]], $$\log_{b^m} x^n = \frac{\log_b x^n}{\log_b b^m} = \frac{n\log_b x}{m},$$ so an exponent on the argument multiplies and an exponent on the base divides. The special case $m = n$ gives $\log_{b^k} x^k = \log_b x$: raising base and argument to the same power changes nothing.

## Useful observations
- Logs turn multiplication into addition, so a problem that is nonlinear in $x$ is linear in $\log x$. A system in $\log(xy)$, $\log(yz)$, and $\log(zx)$ is linear algebra in three log variables: adding all three and halving gives $\log(xyz)$, and each variable follows by subtraction.
- Contest logs are mostly about converting to a common base: sums of logs collapse into the log of a product (a telescoping product often hides inside), and an exponent on the argument or the base comes out front.
- Domain discipline is where most marks are lost. Arguments must be positive and the base must avoid $1$, so every solution is checked against the original equation; extraneous roots are the most common error in log problems.
- For an inequality, check whether the base exceeds $1$ before deciding which way the sign goes.
- Applying a logarithm to both sides of an equation assumes both sides are positive: $x^2 = 4$ becomes $2\log\lvert x\rvert = \log 4$, not $2\log x = \log 4$, which would lose $x = -2$ (see [[transforming-equations|transforming equations without losing solutions]]).

## Applications
Equations and systems with logarithms, exponents that include logs, and sums of logs that telescope into one.

## Contest profile
Seldom alone: its inseparable partner is change of base, because the rules apply only once everything is over one base. On the AMC 12 the typical shape converts to a common base and substitutes $u = \log x$; on the AIME it is a linear system in the logs of products.
`,

"change-of-base": String.raw`
## Key forms
- $\log_b a = \dfrac{\log_c a}{\log_c b}$ — any logarithm is a ratio of logarithms in a base of your choice
- $\log_a b = \dfrac{1}{\log_b a}$ — inverting the base inverts the logarithm, which flips an awkward base
- $\log_a b \cdot \log_b c = \log_a c$ — the two-term chain, the case that actually turns up; the longer chains are the same idea extended
- $\log_{a^m}\!\left(b^n\right) = \dfrac nm \log_a b$ — powers in the base and the argument come out as a ratio
- $a^{\log_b c} = c^{\log_b a}$ — the base and the argument of an exponent of a logarithm can be exchanged
- $\log_a b + \log_b a \ge 2$ for $a, b > 1$ — immediate from $t + \frac1t \ge 2$, a standard way these appear inside an inequality

## Conditions
Every base is positive and not $1$, and every argument is positive. The reciprocal rule needs both logarithms to exist, so $a \ne 1$ and $b \ne 1$.

## Why it works
A logarithm asks what power of the base gives the number, and writing both the number and the base in terms of a common base $c$ answers that question by division.

Let $\log_b a = t$, so $b^t = a$. Take $\log_c$ of both sides: $\log_c(b^t) = \log_c a$, and by the power rule this is $t\log_c b = \log_c a$. Dividing, $t = \frac{\log_c a}{\log_c b}$. Choosing $c = a$ makes the numerator $1$, which is the reciprocal rule $\log_b a = \frac{1}{\log_a b}$.

The chain rule is the same formula applied to every factor at once. Over a common base, $$\log_a b \cdot \log_b c \cdot \log_c d = \frac{\log b}{\log a} \cdot \frac{\log c}{\log b} \cdot \frac{\log d}{\log c},$$ and each numerator cancels the next denominator, leaving $\frac{\log d}{\log a} = \log_a d$. The same cancellation runs through a chain of any length, which is why these products [[telescoping|telescope]].

## Useful observations
- Normalizing every logarithm to one base makes the other rules usable, and after that the chain rule collapses products like $\log_2 3 \cdot \log_3 4 \cdots \log_{63} 64$ to $\log_2 64 = 6$ at once.
- The reciprocal rule handles symmetric pairs: with $t = \log_a b$, the expression $\log_a b + \log_b a$ is $t + \frac1t$, which is at least $2$ when $a, b > 1$ by [[am-gm|AM-GM]], and a system in $\log_a b$ and $\log_b a$ becomes a rational equation in $t$.
- A change of base to the base of the argument gives the reciprocal at once, and a change to a common power gives the rule $\log_{a^m}(b^n) = \frac nm\log_a b$.

## Applications
Telescoping products of logarithms, systems and inequalities in $\log_a b$ and $\log_b a$, logarithms with awkward bases, and evaluating a logarithm on a calculator that has only $\log_{10}$ or $\ln$.

## Contest profile
Almost always paired with [[log-rules|the log rules]], in 11 of the 15 problems tagged here and alone in none, because changing base is the step that makes the other rules usable. Telescoping log products are an AMC classic, and AIME layers the reciprocal rule into systems, where substituting for one logarithm and its reciprocal reduces them to rational equations.
`,

"log-swap-identity": String.raw`
## Key forms
- $a^{\log_b c} = c^{\log_b a}$ — the base of a power and the argument of the logarithm in its exponent trade places
- $x^{\log y} = y^{\log x}$ — the common-base version
- $a^{\log_a x} = x$ — the related anchor; the reciprocal rule $\log_a b = \frac{1}{\log_b a}$ is on [[change-of-base|Change of Base]]

## Conditions
The bases and arguments are positive and the bases are not $1$.

## Why it works
Take $\log_b$ of each side: the left becomes $(\log_b c)(\log_b a)$ and the right becomes $(\log_b a)(\log_b c)$, the same product, since multiplication commutes. So the two sides are equal.

## Useful observations
- It rewrites awkward exponents into forms that combine or cancel: $2^{\log_3 5}$ and $5^{\log_3 2}$ are the same number, so a sum or ratio mixing them collapses.
- A product like $x^{\log y} \cdot y^{\log x}$ is just $\left(x^{\log y}\right)^2$.
- When an exponent hides a logarithm whose base differs from the power's base, swapping is the move.

## Applications
Simplifying and solving equations with powers whose exponents are logarithms.

## Contest profile
Occasional but decisive on the AMC 12 and AIME: these problems are engineered so the swap makes two terms merge or cancel. The tell is a term like $a^{\log_b c}$ with $a \ne b$.
`,

"exponent-laws": String.raw`
## Key forms
- $a^ma^n = a^{m+n}$ and $\dfrac{a^m}{a^n} = a^{m-n}$ — equal bases add or subtract exponents
- $(a^m)^n = a^{mn}$ and $(ab)^n = a^nb^n$ — a power of a power multiplies exponents, and a power of a product distributes
- $a^0 = 1$, $a^{-n} = \dfrac{1}{a^n}$, and $a^{1/n} = \sqrt[n]{a}$ — the meanings of zero, negative, and fractional exponents
- $a^{b^c} = a^{(b^c)}$ — a tower is read from the top down, not as $(a^b)^c$

## Conditions
The base is positive when the exponent is not an integer, and $0^0$ is undefined. A negative base with a fractional exponent has no real value in general. The laws have no counterpart for sums: $(a + b)^n \ne a^n + b^n$.

## Why it works
For whole-number exponents the laws are counting: $a^m$ is $m$ factors of $a$, so $a^m \cdot a^n$ has $m + n$ factors, and $(a^m)^n$ is $n$ groups of $m$ factors.

Zero, negative, and fractional exponents are then defined so that the addition law keeps working. Since $a^m \cdot a^0$ must be $a^m$, $a^0 = 1$. Since $a^n \cdot a^{-n}$ must be $a^0 = 1$, $a^{-n} = \frac1{a^n}$. And since $\left(a^{1/n}\right)^n$ must be $a$, the power $a^{1/n}$ is the $n$th root of $a$, so $a^{m/n} = \sqrt[n]{a^m}$.

## Useful observations
- Putting everything over a common base and comparing exponents solves most exponential equations: $4^x = 8$ becomes $2^{2x} = 2^3$, so $x = \frac32$.
- To compare sizes, the same root is taken of both sides: $$2^{300} = 8^{100} \lt 9^{100} = 3^{200}.$$ When the exponents share no convenient factor, [[log-rules|logarithms]] are the tool instead.
- Towers are read from the top down: $2^{3^2} = 2^9 = 512$, while $(2^3)^2 = 64$.
- A sum of powers is factored rather than expanded: $2^{x+1} + 2^x = 2^x(2 + 1)$. For a sum raised to a power, the [[binomial-theorem|Binomial Theorem]] is needed.

## Applications
Exponential equations, comparisons of large powers, simplifying expressions with radicals and negative exponents, and reading towers.

## Contest profile
Four problems here, split between AMC and AIME, one solved by it alone; two continue into logarithms, which are the exponent laws read in reverse. Base matching solves most AMC exponential equations, and taking a common root settles size comparisons.
`,

"complex-basics": String.raw`
## Key forms
- $z = a + bi$, $\bar z = a - bi$, $|z| = \sqrt{a^2 + b^2}$ — a complex number, its conjugate, and its modulus (its distance from $0$)
- $z\bar z = |z|^2 = a^2 + b^2$ and $\dfrac1z = \dfrac{\bar z}{|z|^2}$ — the conjugate makes a denominator real
- $i^2 = -1$ and $i, -1, -i, 1$ repeating — the powers of $i$ have period $4$
- $|zw| = |z||w|$ and $\overline{zw} = \bar z\,\bar w$ — moduli multiply, conjugation respects products
- $|z| = 1 \implies \bar z = \dfrac1z$ — on the unit circle the conjugate is the reciprocal
- $z + \bar z = 2\operatorname{Re}(z)$ and $z - \bar z = 2i\operatorname{Im}(z)$; $z$ is real exactly when $z = \bar z$

## Conditions
$a$ and $b$ are real. The reciprocal needs $z \ne 0$, and $\bar z = \frac1z$ needs $|z| = 1$.

## Why it works
Every rule comes from treating $i$ as an ordinary symbol and replacing $i^2$ by $-1$ wherever it appears.

Multiply a number by its conjugate: $$(a + bi)(a - bi) = a^2 - abi + abi - b^2i^2 = a^2 + b^2.$$ The imaginary parts cancel and $-b^2i^2$ becomes $+b^2$, leaving a real number, the square of the distance from $0$ to the point $(a, b)$. That is why $z\bar z = |z|^2$, and why multiplying the top and bottom of a fraction by the conjugate of the bottom makes the bottom real: $\frac1z = \frac{\bar z}{z\bar z} = \frac{\bar z}{|z|^2}$.

The powers of $i$ cycle because each step multiplies by $i$ once more: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, and $i^4 = 1$, and then $i^5 = i$ starts the cycle over. So $i^n$ depends only on $n$ modulo $4$.

Moduli multiply because conjugation respects products, $\overline{zw} = \bar z\,\bar w$, which can be checked by expanding both sides. Then $|zw|^2 = zw\,\overline{zw} = z\bar z\,w\bar w = |z|^2|w|^2$. Written out in real numbers this is the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci Identity]], $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2$.

## Useful observations
- Division means multiplying the top and bottom by the conjugate of the bottom, which turns the denominator into the real number $|z|^2$; powers of $i$ reduce by taking the exponent modulo $4$; and modulus conditions become algebra through $|z|^2 = z\bar z$.
- Moving a problem into the complex plane collapses two coordinates into one number, so a pair of real equations becomes one complex equation and geometric operations become arithmetic: translation is addition, rotation is multiplication by a number of modulus $1$, and reflection in the real axis is conjugation.

{{figure:plane}}

- Conjugates are usually the obstruction in a complex computation, and on the unit circle $\bar z = \frac1z$ removes them entirely, turning an expression that mixes $z$ and $\bar z$ into a rational function of $z$ alone.
- A rotation by $90^\circ$ is multiplication by $i$ and nothing more, which makes [[rotation-90|the coordinate rotation]] a special case of this card.

## Applications
Division and powers of complex numbers, $|z| = 1$ problems, sums of powers of $i$, and rotations and reflections of the plane.

## Contest profile
Often alone; its usual partner is [[roots-of-unity|roots of unity]], where the unit-circle substitution is exactly what the problem is built around. The recurring shapes are unit-modulus problems solved by replacing the conjugate with the reciprocal, and sums of powers of the imaginary unit that cycle with period four.
`,

"eulers-formula": String.raw`
## Key forms
- $e^{i\theta} = \cos\theta + i\sin\theta$ — Euler's Formula, with $e^{i\pi} + 1 = 0$ as the special case $\theta = \pi$
- $z = re^{i\theta}$ — the polar form of a complex number with modulus $r$ and angle $\theta$
- $e^{i\alpha}e^{i\beta} = e^{i(\alpha + \beta)}$ — multiplication multiplies moduli and adds angles
- $\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$ and $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$ — the exponential forms of cosine and sine
- $p + e^{i\theta}(z - p)$ — the rotation of $z$ about $p$ by $\theta$

## Conditions
The angle $\theta$ is in radians, and the polar form of a number is determined only up to adding $2\pi$ to the angle. The modulus is $r \ge 0$.

## Why it works
Comparing Taylor series of $e^{i\theta}$, $\cos\theta$, and $\sin\theta$ shows they agree term by term once $i^2 = -1$ is used: the even powers of $i\theta$ give the cosine series and the odd powers give $i$ times the sine series.

Alternatively it can be accepted as the definition of complex exponentials, and the multiplication law verified through [[angle-addition|angle addition]] formulas, which it then re-derives, circularly but consistently.

## Useful observations
- Polar form makes multiplication trivial: moduli multiply and angles add. Converting to polar suits any power, root, or rotation task, and converting back suits addition.
- Rotation of the point $z$ about $p$ by $\theta$ is $p + e^{i\theta}(z - p)$, so geometry problems become one-line computations.
- Sums like $\sum \cos k\theta$ are the real part of a [[geometric-series|geometric series]] in $e^{i\theta}$, and powers of $e^{i\theta}$ are [[de-moivre|De Moivre's Theorem]].

## Applications
Powers and roots of complex numbers, rotations, sums of cosines and sines, and polygon-vertex computations.

## Contest profile
The bridge between trigonometry and algebra on the AIME: products of cosines, sums of cosines in progression, and polygon-vertex computations all route through $e^{i\theta}$.
`,

"de-moivre": String.raw`
## Key forms
- $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$ — raising a number of length $1$ to the $n$th power multiplies its angle by $n$
- $\big(r(\cos\theta + i\sin\theta)\big)^n = r^n(\cos n\theta + i\sin n\theta)$ — the general power, with the length raised to the $n$th power as well
- $z^{1/n}$ has the $n$ values $r^{1/n}\left(\cos\dfrac{\theta + 2\pi k}{n} + i\sin\dfrac{\theta + 2\pi k}{n}\right)$ for $k = 0, 1, \ldots, n - 1$ — the $n$th roots of $z = r(\cos\theta + i\sin\theta)$
- $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ and $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$ — the multiple-angle formulas that come from expanding

## Conditions
The exponent $n$ is an integer, positive or negative. For a fractional exponent the right side gives only one of several values, which is why the root formula lists all $n$ of them.

## Why it works
Multiplying complex numbers multiplies their lengths and adds their angles, so multiplying a number of length $1$ by itself $n$ times adds its angle to itself $n$ times.

The key step is a product of two such numbers. Using $i^2 = -1$, $$(\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta) = (\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta).$$ The two brackets are exactly [[angle-addition|the angle-addition formulas]], so the product is $\cos(\alpha + \beta) + i\sin(\alpha + \beta)$: the angles add.

Each further factor of $\cos\theta + i\sin\theta$ adds $\theta$ to the angle, so after $n$ factors the angle is $n\theta$, which is the theorem for every positive integer $n$. For negative $n$, the reciprocal of $\cos\theta + i\sin\theta$ is its conjugate $\cos(-\theta) + i\sin(-\theta)$, so the theorem holds for every integer $n$.

With [[eulers-formula|Euler's Formula]] $e^{i\theta} = \cos\theta + i\sin\theta$ it is simply the exponent law $\left(e^{i\theta}\right)^n = e^{in\theta}$.

## Useful observations
- Forward, it computes powers without expanding: the base goes into polar form, the modulus is raised to the $n$th power and the angle multiplied by $n$. For $(1 + i)^{20}$ the modulus is $\sqrt2$ and the angle $45^\circ$, and $900^\circ$ is $180^\circ$ plus full turns, so $$(1 + i)^{20} = \left(\sqrt2\right)^{20}\left(\cos 900^\circ + i\sin 900^\circ\right) = -2^{10}.$$
- Backward is the richer direction. Expanding $(\cos\theta + i\sin\theta)^3$ with the Binomial Theorem, the real part is $\cos^3\theta - 3\cos\theta\sin^2\theta$, and replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$. The same move gives $\tan n\theta$ as a rational function of $\tan\theta$.
- Taking the $n$th root reverses the angle multiplication: the roots of $z$ are spread equally around a circle, a full turn $\frac{2\pi}{n}$ apart, which is the picture behind [[roots-of-unity|roots of unity]].

## Applications
Large powers of complex numbers, multiple-angle formulas, the $n$th roots of a complex number, and trigonometric identities that come from comparing real and imaginary parts.

## Contest profile
Never the whole problem, none of the 17 tagged here, and most often paired with roots of unity (6 problems), since the $n$th roots of unity are exactly the numbers whose angles De Moivre multiplies back to a full turn. AIME trigonometric identities that seem to come from nowhere are usually De Moivre expansions.
`,

"roots-of-unity": String.raw`
## Key forms
- $\omega^k = \cos\dfrac{2\pi k}{n} + i\sin\dfrac{2\pi k}{n}$ for $k = 0, 1, \ldots, n - 1$ — the $n$ solutions of $z^n = 1$, the vertices of a regular $n$-gon on the unit circle with one vertex at $1$
- $x^n - 1 = (x - 1)(x - \omega)\cdots(x - \omega^{n-1})$, so $1 + x + \cdots + x^{n-1} = (x - \omega)(x - \omega^2)\cdots(x - \omega^{n-1})$
- the sum of the roots is $0$ for $n > 1$, and their product is $(-1)^{n+1}$
- $\alt{\sum_{k=0}^{n-1}\omega^{jk} = \begin{cases} n & n \mid j \\ 0 & n \nmid j\end{cases}}{1 + \omega^j + \omega^{2j} + \cdots + \omega^{(n-1)j} = \begin{cases} n & n \mid j \\ 0 & n \nmid j\end{cases}}$ — summing a power over all the roots keeps only the exponents that are multiples of $n$
- $\omega^k$ is a primitive root, one whose powers give all $n$ roots, exactly when $\gcd(k, n) = 1$, so there are $\varphi(n)$ of them

## Conditions
Here $\omega = e^{2\pi i/n}$ for a positive integer $n$. Powers of a root repeat with period $n$, so exponents live modulo $n$.

## Why it works
A root of $z^n = 1$ must have length $1$, and its angle must come back to a whole number of turns after $n$ steps, which leaves exactly $n$ equally spaced points.

Write $z = r(\cos\theta + i\sin\theta)$. By [[de-moivre|De Moivre's Theorem]], $z^n$ has length $r^n$ and angle $n\theta$. For $z^n = 1$ the length must be $1$, so $r = 1$, and the angle $n\theta$ must be a whole number of turns, $2\pi k$, so $$\theta = \frac{2\pi k}{n}.$$ The values $k = 0, 1, \ldots, n - 1$ give $n$ different points, and every other $k$ repeats one of them, as the figure at the top shows.

Since $x^n - 1$ has degree $n$ and these are $n$ distinct roots, they are all of its roots, and $$x^n - 1 = \prod_{k=0}^{n-1}(x - \omega^k).$$ Vieta's Formulas then read their sum from the missing $x^{n-1}$ term, which gives $0$ when $n > 1$, and their product from the constant term, $(-1)^n \cdot (-1) = (-1)^{n+1}$. The zero sum has a picture too: the points are balanced around the center, so their average is the center.

## Useful observations
- Evaluating the factorization at a chosen point turns a product over the roots into a number. Dividing out the factor $x - 1$ leaves $1 + x + \cdots + x^{n-1} = \prod_{k=1}^{n-1}(x - \omega^k)$, and at $x = 1$ this gives $\prod_{k=1}^{n-1}(1 - \omega^k) = n$: the product of the distances from one vertex of the polygon to all the others is $n$.
- Summing $\omega^{jk}$ over all $k$ gives $n$ when $n$ divides $j$ and $0$ otherwise, which is [[roots-of-unity-filter|the filter]] that picks out every $n$th coefficient of a polynomial.
- Seeing the regular $n$-gon as the $n$th roots converts polygon geometry into algebra.

## Applications
Evaluating a polynomial at every root and multiplying the values, symmetric sums over the vertices of a regular polygon, periodicity arguments, and the factorization of $x^n - 1$.

## Contest profile
An AIME staple, with 17 problems tagged here and only 1 solved by the roots alone; the usual partner is De Moivre's Theorem (6 problems), which locates the roots in the first place.
`,

"roots-of-unity-filter": String.raw`
## When to use
Sums of every second, third, or fourth binomial coefficient, such as $\binom{n}{0} + \binom{n}{3} + \binom{n}{6} + \cdots$; counts of subsets, strings, or dice rolls whose total lies in one residue class; and any coefficient sum $a_r + a_{r+n} + a_{r+2n} + \cdots$ of a generating function that is easy to evaluate at complex numbers. The filter for $n = 2$ needs only $f(1)$ and $f(-1)$ and works with no complex numbers at all.

For a condition on one small value, such as a total of exactly $7$, the coefficient itself is shorter than a filter.

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
## Key forms
- $\alt{\prod_{k=1}^{n-1}\left\lvert 1 - \omega^k\right\rvert = n}{\lvert 1 - \omega\rvert\,\lvert 1 - \omega^2\rvert\cdots\lvert 1 - \omega^{n-1}\rvert = n}$ with $\omega = e^{2\pi i/n}$ — the product of the distances from one $n$th root of unity to all the others
- $\lvert 1 - \omega^k\rvert = 2\sin\dfrac{k\pi}{n}$ — each distance is a chord of the unit circle
- $nR^{n-1}$ — the product of the distances from one vertex of a regular $n$-gon inscribed in a circle of radius $R$ to the other vertices

## Conditions
$n \ge 2$ and $\omega$ is a primitive $n$th root of unity. The point must be a vertex; from a point of the circle that is not a vertex the product depends on where it is.

## Why it works
Dividing $x^n - 1$ by $x - 1$ leaves a polynomial whose roots are exactly the other $n - 1$ roots of unity, so it factors over them: $$\frac{x^n - 1}{x - 1} = 1 + x + \cdots + x^{n-1} = (x - \omega)(x - \omega^2)\cdots(x - \omega^{n-1}).$$

At $x = 1$ the middle expression is a sum of $n$ ones, so $(1 - \omega)(1 - \omega^2)\cdots(1 - \omega^{n-1}) = n$. The division happens before the substitution, so no limit is needed, and taking absolute values turns each factor into a distance.

Each factor is a chord of the unit circle. The points $1$ and $\omega^k$ are separated by the central angle $\frac{2k\pi}{n}$, and the radius bisecting that angle cuts the chord into two halves of length $\sin\frac{k\pi}{n}$, so $\lvert 1 - \omega^k\rvert = 2\sin\frac{k\pi}{n}$.

{{figure:chord}}

Multiplying the $n - 1$ chords gives $2^{n-1}$ times the product of the sines, and that product is evaluated on [[evenly-spaced-angle-products|the evenly spaced angle products card]].

## Useful observations
- The unit circle comes first. On a circle of radius $R$ every chord is $R$ times as long, so the product of the distances from one vertex of a regular $n$-gon to the other $n - 1$ vertices is $nR^{n-1}$.
- For products of sines at equally spaced angles, $\sin\frac{k\pi}{n}$ is paired with $\sin\frac{(n-k)\pi}{n}$, which is equal to it, and a square root is taken. With $n = 9$ every factor appears twice, so $\sin 20^\circ\sin 40^\circ\sin 60^\circ\sin 80^\circ = \sqrt{\frac{9}{2^8}} = \frac{3}{16}$.
- When the point is on the circle but not at a vertex, the product depends on where it is, which is [[ngon-vertex-distance-product|the product from a general point]]; other spacings of sines and cosines are on [[evenly-spaced-angle-products|the evenly spaced angle products card]].

## Applications
Products of chord lengths in a regular polygon, products of sines at equally spaced angles, and values of $\prod(x - \omega^k)$.

## Contest profile
Three problems here, all AIME, none solved by it alone. The factors $1 - \omega^k$ come from a polynomial whose roots are roots of unity, or appear as chord lengths in a regular polygon, and the product is finished with [[de-moivre|De Moivre's Theorem]] or a [[double-angle|double-angle]] identity that simplifies what it leaves.
`,

"pythagorean-identities": String.raw`
## Key forms
- $\sin^2\theta + \cos^2\theta = 1$ — the point $(\cos\theta, \sin\theta)$ lies on the unit circle
- $1 + \tan^2\theta = \sec^2\theta$ — dividing by $\cos^2\theta$
- $1 + \cot^2\theta = \csc^2\theta$ — dividing by $\sin^2\theta$
- $(\sin\theta + \cos\theta)^2 = 1 + 2\sin\theta\cos\theta$ — the squaring trick for a sum and a product

## Conditions
All angles for the first; the second needs $\cos\theta \ne 0$ and the third needs $\sin\theta \ne 0$. Taking a square root to recover a function needs a sign decided by the quadrant.

## Why it works
The point at angle $\theta$ on the unit circle is $(\cos\theta, \sin\theta)$, and its distance from the center is $1$, so the Pythagorean Theorem gives $\cos^2\theta + \sin^2\theta = 1$.

Dividing that equation by $\cos^2\theta$, where it is not zero, gives $1 + \tan^2\theta = \sec^2\theta$; dividing by $\sin^2\theta$ gives $\cot^2\theta + 1 = \csc^2\theta$. The second identity can also be seen directly: extending the radius to the tangent line $x = 1$ makes a right triangle with legs $1$ and $\tan\theta$ and hypotenuse $\sec\theta$.

{{figure:unit-circle}}

## Useful observations
- Given one value, the identities give the others, with signs chosen by the quadrant: if $\sin\theta = \frac35$ and $\theta$ is acute, then $\cos\theta = \sqrt{1 - \frac{9}{25}} = \frac45$ and $\tan\theta = \frac34$.
- To solve an equation with several functions, replace them all by one: $2\sin^2\theta = 3\cos\theta$ becomes $2 - 2\cos^2\theta = 3\cos\theta$, a quadratic in $\cos\theta$.
- If $\sin\theta + \cos\theta = k$, squaring gives $\sin\theta\cos\theta = \frac{k^2 - 1}{2}$, and from the sum and product, expressions such as $\sin^3\theta + \cos^3\theta$ follow by factoring.

## Applications
Converting between trigonometric functions, equations with several functions, and sum-and-product problems.

## Contest profile
The sum-and-product squaring trick is a permanent AMC favorite, and the identities combine with [[log-rules|logarithm rules]] in problems that give logarithms of $\sin x$ and $\cos x$.
`,

"common-angle-values": String.raw`
## Key forms
- $\sin$ at $0^\circ$, $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$ is $\dfrac{\sqrt0}{2}, \dfrac{\sqrt1}{2}, \dfrac{\sqrt2}{2}, \dfrac{\sqrt3}{2}, \dfrac{\sqrt4}{2}$, and $\cos$ is the same list backwards, since $\cos\theta = \sin(90^\circ - \theta)$
- $\tan$ is the quotient: $0$, $\frac{\sqrt3}{3}$, $1$, $\sqrt3$, and undefined at $90^\circ$
- the reference angle of $\theta$ is the acute angle it makes with the $x$-axis, and the values at $\theta$, $180^\circ - \theta$, $180^\circ + \theta$, and $360^\circ - \theta$ differ only in sign
- all three functions are positive in the first quadrant, sine in the second, tangent in the third, and cosine in the fourth

## Conditions
The table is exact. Angles in radians are $\frac\pi6$, $\frac\pi4$, $\frac\pi3$, and $\frac\pi2$, the usual form on the AMC 12 and AIME.

## Why it works
The values come from the two [[special-right-triangles|special right triangles]], read as opposite over hypotenuse and adjacent over hypotenuse. The $45$-$45$-$90$ triangle with legs $1$ has hypotenuse $\sqrt2$, so $\sin 45^\circ = \cos 45^\circ = \frac{\sqrt2}{2}$. Half an equilateral triangle of side $2$ has sides $1$, $\sqrt3$, and $2$, which gives $\sin 30^\circ = \cos 60^\circ = \frac12$ and $\sin 60^\circ = \cos 30^\circ = \frac{\sqrt3}{2}$.

On the unit circle the point at angle $\theta$ is $(\cos\theta, \sin\theta)$, so $0^\circ$ and $90^\circ$ are the points $(1, 0)$ and $(0, 1)$, and $\tan 90^\circ = \frac10$ is undefined.

## Useful observations
- For any angle, the reference angle is found and the sign of its quadrant attached. So $\sin 150^\circ = \sin 30^\circ = \frac12$, $\cos 225^\circ = -\cos 45^\circ = -\frac{\sqrt2}{2}$, and $\tan 300^\circ = -\tan 60^\circ = -\sqrt3$.

{{figure:reference}}

- Other exact values come from these through the [[angle-addition|angle addition formulas]], such as $\sin 15^\circ = \sin(45^\circ - 30^\circ) = \frac{\sqrt6 - \sqrt2}{4}$.
- The table is rebuilt from the pattern $\frac{\sqrt k}{2}$ for $k = 0, \ldots, 4$ whenever memory fails.

## Applications
Exact values in trigonometric computations, points on the unit circle, and solving $\sin\alpha = \sin\beta$ by reflecting across the vertical axis.

## Contest profile
Two problems here, both AIME, one solved by it alone; the other works on the unit circle with [[de-moivre|De Moivre's Theorem]]. The AIME uses them to locate points on the unit circle, and on the AMC they sit inside nearly every trigonometric computation.
`,

"reduction-identities": String.raw`
## Key forms
- $\sin(90^\circ - \theta) = \cos\theta$ and $\cos(90^\circ - \theta) = \sin\theta$ — the cofunction pair, likewise $\tan$ and $\cot$, $\sec$ and $\csc$
- $\sin(-\theta) = -\sin\theta$ and $\cos(-\theta) = \cos\theta$ — sine and tangent are odd, cosine is even
- $\sin(180^\circ - \theta) = \sin\theta$ and $\cos(180^\circ - \theta) = -\cos\theta$ — supplementary angles keep sine and flip cosine and tangent
- sine and cosine repeat every $360^\circ$ and tangent every $180^\circ$

## Conditions
The identities hold for all angles where the functions are defined. Any angle reduces to a first-quadrant reference angle plus a sign.

## Why it works
Everything is a unit-circle reflection. Reflecting across $y = x$ swaps coordinates, giving the cofunction pair $\sin(90^\circ - \theta) = \cos\theta$. Reflecting across the $x$-axis negates $y$, so sine is odd, and fixes $x$, so cosine is even.

Reflecting across the $y$-axis is the supplement $180^\circ - \theta$: $y$ stays and $x$ flips, so sine is preserved and cosine negates.

## Useful observations
- Awkward angles are collapsed to first-quadrant values before other identities are applied.
- The cofunction rule is why the sine and cosine graphs are shifts of each other, and the odd and even rules drop signs inside functions.
- Remembering that tangent has period $180^\circ$, not $360^\circ$, avoids a common off-by-a-period slip.

## Applications
Simplifying trigonometric expressions, reducing large angles, and telescoping or symmetric trigonometric sums where $\sin\theta$ and $\sin(180^\circ - \theta)$ must be seen to be equal.

## Contest profile
Routine simplification on the AMC and AIME, and the key to telescoping or symmetric trigonometric sums.
`,

"angle-addition": String.raw`
## Key forms
- $\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$ — the sine of a sum or difference
- $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$ — the cosine, with the sign flipped
- $\tan(a \pm b) = \dfrac{\tan a \pm \tan b}{1 \mp \tan a\tan b}$ and $\cot(a \pm b) = \dfrac{\cot a\cot b \mp 1}{\cot b \pm \cot a}$

## Conditions
The formulas hold for all real angles $a$, $b$. The tangent and cotangent forms need the denominators and the tangents to exist.

## Why it works
Turning by angle $a$ and then by angle $b$ is the same as turning by $a + b$, and writing that out in coordinates is the formula.

With complex numbers the computation is one line. The point at angle $\theta$ on the unit circle is $\cos\theta + i\sin\theta$, and multiplying by it turns the plane by $\theta$, so $\cos(a + b) + i\sin(a + b) = (\cos a + i\sin a)(\cos b + i\sin b)$. Expanding the right side with $i^2 = -1$ gives $(\cos a\cos b - \sin a\sin b) + i(\sin a\cos b + \cos a\sin b)$, and matching real and imaginary parts gives both formulas at once.

Without complex numbers, draw it. Put a right triangle $OQP$ with hypotenuse $OP = 1$ and angle $b$ at $O$ so that its leg $OQ = \cos b$ lies along the line at angle $a$ above the axis. Then $P$ is at angle $a + b$, so its height is $\sin(a + b)$. That height splits at the level of $Q$: $Q$ is $\cos b$ along a line at angle $a$, so it is $\sin a\cos b$ high, and the leg $QP = \sin b$ is tilted at angle $a$ from vertical, so it climbs a further $\cos a\sin b$.

{{figure:stacked}}

The difference formulas follow by replacing $b$ with $-b$, using $\cos(-b) = \cos b$ and $\sin(-b) = -\sin b$. Dividing the sine formula by the cosine formula, then dividing the top and bottom by $\cos a\cos b$, gives the tangent formula.

## Useful observations
- Nearly everything else in trigonometry is downstream. Double angle is the case $a = b$, half angle is double angle read backwards, and shifts like $\sin(\theta + 90^\circ) = \cos\theta$ are the case $b = 90^\circ$.
- Used directly, the formulas give exact values at $15^\circ$, $75^\circ$, and $105^\circ$ as sums and differences of $30^\circ$, $45^\circ$, and $60^\circ$.
- Read backwards, they collapse a combination of sine and cosine into one wave, which is harmonic addition; its maximum is $\sqrt{a^2 + b^2}$.
- The tangent form computes angle sums in geometry, such as the angle between two lines from their slopes, and it telescopes arctangent series.

## Applications
Exact trigonometric values, angle sums and differences in figures, combining waves, and telescoping arctangent sums.

## Contest profile
An AIME and AMC 12 tool. Its usual partners are [[trig-substitution|trigonometric substitution]], where a substitution turns an algebraic sum into an angle sum, and [[chord-length|chord lengths]].
`,

"harmonic-addition": String.raw`
## Key forms
- $a\sin\theta + b\cos\theta = R\sin(\theta + \varphi)$ with $R = \sqrt{a^2 + b^2}$, $\cos\varphi = \dfrac aR$, and $\sin\varphi = \dfrac bR$ — a linear combination of sine and cosine is one shifted sine wave
- $a\sin\theta + b\cos\theta = R\cos(\theta - \varphi')$ — the cosine form, when the phase is more natural measured from the cosine
- the expression ranges over $[-R, R]$, so its maximum is $\sqrt{a^2 + b^2}$ and its minimum the negative
- $a\sin\theta + b\cos\theta = c$ has a solution exactly when $\lvert c \rvert \le \sqrt{a^2 + b^2}$

## Conditions
$a$ and $b$ are not both zero. The relation $\tan\varphi = \frac ba$ alone does not distinguish $\varphi$ from $\varphi + 180^\circ$, and the signs of $a$ and $b$ fix the quadrant.

## Why it works
Expand the right-hand side by [[angle-addition|angle addition]]: $R\sin(\theta + \varphi) = (R\cos\varphi)\sin\theta + (R\sin\varphi)\cos\theta$. Matching coefficients forces $R\cos\varphi = a$ and $R\sin\varphi = b$, so $a^2 + b^2 = R^2$ and $\tan\varphi = \frac{b}{a}$. Such a $\varphi$ exists because $\left(\frac aR, \frac bR\right)$ is a point of the unit circle.

The pair $(a, b)$ is just the point $(R, \varphi)$ in [[eulers-formula|polar form]], which is why the amplitude is a hypotenuse. The cosine form works the same way: $R\cos(\theta - \varphi') = (R\sin\varphi')\sin\theta + (R\cos\varphi')\cos\theta$, so $R\sin\varphi' = a$ and $R\cos\varphi' = b$.

Since $\sin(\theta + \varphi)$ takes every value in $[-1, 1]$ as $\theta$ varies, the expression takes every value in $[-R, R]$ and no other. That gives the maximum $R$, the minimum $-R$, and the solvability condition $\lvert c \rvert \le R$.

## Useful observations
- It is read as a range statement. Since $\sin$ covers $[-1, 1]$, the expression covers $[-R, R]$, so the maximum is $\sqrt{a^2 + b^2}$ with no calculus and no critical points. The maximum of $3\sin x + 4\cos x$ is $5$ on sight.
- It is the reason a sum of two sinusoids of the same frequency is another sinusoid of that frequency.
- The usual disguise is a problem that never mentions trigonometry: maximizing $3x + 4y$ on the circle $x^2 + y^2 = 1$ is the same statement, with $\sqrt{a^2 + b^2}$ playing the role [[cauchy-schwarz|Cauchy-Schwarz]] plays in the algebraic phrasing.

## Applications
Maxima and minima of trigonometric expressions, equations of the form $a\sin\theta + b\cos\theta = c$, and sums of two sinusoids.

## Contest profile
A high-frequency AMC 12 and AIME shape whenever a trigonometric expression must be bounded. The quadrant matters: the signs of $a$ and $b$, not $\tan\varphi$ alone, fix the phase.
`,

"double-angle": String.raw`
## Key forms
- $\sin 2\theta = 2\sin\theta\cos\theta$
- $\cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta$ — three forms, so either function can be kept
- $\tan 2\theta = \dfrac{2\tan\theta}{1 - \tan^2\theta}$
- $\cos^2\theta = \dfrac{1 + \cos 2\theta}{2}$ and $\sin^2\theta = \dfrac{1 - \cos 2\theta}{2}$ — power reduction, the formulas read backwards
- with $t = \tan\theta$: $\sin 2\theta = \dfrac{2t}{1 + t^2}$ and $\cos 2\theta = \dfrac{1 - t^2}{1 + t^2}$

## Conditions
All angles for sine and cosine; the tangent form needs $\tan\theta$ defined and $\tan^2\theta \ne 1$.

## Why it works
Doubling an angle is adding it to itself, so each formula is an angle addition formula with the two angles equal.

Put $\alpha = \beta = \theta$ into $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$ and into its companions for cosine and tangent, and each one collapses to the double-angle form.

The sine formula can also be seen directly. Take an isosceles triangle with two sides of length $1$ and the angle $2\theta$ between them, for $\theta$ below $90^\circ$. By [[trig-area|the sine area formula]] its area is $\frac12\sin 2\theta$.

The altitude from the apex cuts it into two right triangles, each with hypotenuse $1$ and angle $\theta$ at the apex, so each has legs $\cos\theta$ and $\sin\theta$. The triangle's base is then $2\sin\theta$ and its height $\cos\theta$, and its area is $\frac12 \cdot 2\sin\theta \cdot \cos\theta$. The two areas are equal, which is $\sin 2\theta = 2\sin\theta\cos\theta$.

{{figure:isosceles}}

The other two forms of $\cos 2\theta$ come from $\sin^2\theta + \cos^2\theta = 1$. Replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $2\cos^2\theta - 1$, and replacing $\cos^2\theta$ by $1 - \sin^2\theta$ gives $1 - 2\sin^2\theta$. Solving each of these for the square gives the power-reduction formulas.

Finally, dividing $\sin 2\theta$ and $\cos 2\theta$ by $\cos^2\theta + \sin^2\theta$, which equals $1$, and then dividing top and bottom by $\cos^2\theta$ writes both in $t = \tan\theta$. This is the [[weierstrass-substitution|Weierstrass substitution]], which turns a trigonometric equation into a rational one in a single variable.

## Useful observations
- The $\cos 2\theta$ form that removes what is not wanted can be chosen: $2\cos^2\theta - 1$ keeps cosines and $1 - 2\sin^2\theta$ keeps sines, so $\cos 2\theta$ comes from $\cos\theta$ alone without ever finding $\sin\theta$.
- Read backwards, the formulas lower powers: power reduction turns $\sin^2\theta$ and $\cos^2\theta$ into first powers of $\cos 2\theta$, the usual first step on a sum of squared sines or cosines, and $\sin\theta\cos\theta = \frac12\sin 2\theta$ turns a product into a single sine, as inside area formulas.
- Halving works in reverse: $\cos\theta = 2\cos^2\frac\theta2 - 1$ gives $\cos\frac\theta2$ from $\cos\theta$ up to sign, which is how chains of half angles are unwound.
- An angle bisector or an inscribed angle puts an angle and its double in the same figure.

## Applications
Doubled and halved angles in figures, power reduction in sums of squared trigonometric values, and rational parametrizations through $t = \tan\theta$.

## Contest profile
Mostly an AIME tool. It converts an angle the figure gives into the doubled or halved angle another formula needs, next to the [[law-of-cosines|Law of Cosines]], a [[chord-length|chord length]], or an [[inradius-area|inradius]] computation.
`,

"half-angle": String.raw`
## Key forms
- $\sin^2\dfrac\theta2 = \dfrac{1 - \cos\theta}{2}$ and $\cos^2\dfrac\theta2 = \dfrac{1 + \cos\theta}{2}$ — the squares of the half angle
- $\tan\dfrac\theta2 = \dfrac{\sin\theta}{1 + \cos\theta} = \dfrac{1 - \cos\theta}{\sin\theta}$ — the tangent, with no square roots

## Conditions
Taking the square root of the first two needs a sign, decided by the quadrant of $\frac\theta2$. The tangent forms need $1 + \cos\theta \ne 0$ and $\sin\theta \ne 0$ respectively.

## Why it works
They are the double angle formulas with $\theta$ in place of $2\theta$, solved for the half angle.

From $\cos\theta = 1 - 2\sin^2\frac\theta2$ and $\cos\theta = 2\cos^2\frac\theta2 - 1$, solving for the squares gives the first two formulas. For the tangent, divide $\sin\theta = 2\sin\frac\theta2\cos\frac\theta2$ by $1 + \cos\theta = 2\cos^2\frac\theta2$: $\frac{\sin\theta}{1 + \cos\theta} = \frac{2\sin\frac\theta2\cos\frac\theta2}{2\cos^2\frac\theta2} = \tan\frac\theta2$.

The tangent form also has a picture. On the unit circle, the angle at $(-1, 0)$ that looks at the arc from $(1, 0)$ to $(\cos\theta, \sin\theta)$ is $\frac\theta2$, by the [[inscribed-angle-theorem|Inscribed Angle Theorem]], and the line from $(-1, 0)$ to that point has slope $\frac{\sin\theta}{1 + \cos\theta}$.

{{figure:inscribed}}

## Useful observations
- Repeated halving gives exact values: $\cos 22.5^\circ = \sqrt{\frac{1 + \cos 45^\circ}{2}} = \frac{\sqrt{2 + \sqrt2}}{2}$. Read backwards, a nested radical like $\sqrt{2 + \sqrt2}$ is $2\cos 22.5^\circ$, which is the idea behind [[trig-substitution|trigonometric substitution]].
- In triangle problems the radical-free tangent forms are the ones to use. The incircle gives $\tan\frac A2 = \frac{r}{s - a}$, because the incenter, the vertex $A$ and the point where the incircle touches $AB$ form a right triangle with legs $r$ and $s - a$; [[half-angle-tangent-identity|the half-angle tangent identity]] develops this.

## Applications
Exact values at half angles, nested radicals, and half angles in triangles and with the incircle.

## Contest profile
Used with [[tangent-facts|tangent lengths]] through the incircle form, and after the [[law-of-cosines|Law of Cosines]], which produces $\cos\theta$ when the problem needs the half angle.
`,

"product-sum": String.raw`
## Key forms
- $2\sin a\cos b = \sin(a + b) + \sin(a - b)$
- $2\cos a\cos b = \cos(a + b) + \cos(a - b)$
- $2\sin a\sin b = \cos(a - b) - \cos(a + b)$
- $\sin a \pm \sin b = 2\sin\dfrac{a \pm b}{2}\cos\dfrac{a \mp b}{2}$
- $\cos a + \cos b = 2\cos\dfrac{a + b}{2}\cos\dfrac{a - b}{2}$ and $\cos a - \cos b = -2\sin\dfrac{a + b}{2}\sin\dfrac{a - b}{2}$

## Conditions
The identities hold for all angles, in degrees or radians. The product forms put a product on the left and a sum on the right, and the sum forms are the same identities read the other way.

## Why it works
Adding or subtracting two angle addition formulas cancels half the terms, and what is left is a product on one side and a sum on the other.

For example, $\cos(a - b) = \cos a\cos b + \sin a\sin b$ and $\cos(a + b) = \cos a\cos b - \sin a\sin b$. Subtracting the second from the first leaves $$\cos(a - b) - \cos(a + b) = 2\sin a\sin b,$$ and adding them gives $2\cos a\cos b$. The sine formulas pair up the same way.

Setting $x = a + b$ and $y = a - b$, so that $a = \frac{x + y}{2}$ and $b = \frac{x - y}{2}$, turns each product-to-sum formula into a sum-to-product one. The sum-to-product formulas also have a picture: the midpoint of the chord between two points of the unit circle has coordinates that are the averages of theirs.

{{figure:midpoint}}

## Useful observations
- Products become sums to make a series telescope. Multiplying $\sin\theta + \sin 2\theta + \cdots + \sin n\theta$ by $2\sin\frac\theta2$ turns each term into a difference of two cosines, and the sum collapses to two terms; that is the derivation of [[sin-cos-ap-sum|the sum of sines in arithmetic progression]].
- Sums become products to solve equations: $\sin x + \sin 3x = 0$ becomes $2\sin 2x\cos x = 0$, which splits into $\sin 2x = 0$ or $\cos x = 0$.
- A single product can be evaluated directly: $$\sin 75^\circ \sin 15^\circ = \frac12(\cos 60^\circ - \cos 90^\circ) = \frac14.$$

## Applications
[[telescoping|Telescoping sums]] of sines and cosines, equations that mix different multiples of an angle, exact values at angles such as $15^\circ$ and $75^\circ$, and sums of equally spaced cosines.

## Contest profile
Six problems here, all AIME, none by it alone: two feed a telescoping sum such as $\sum \sin k^\circ$, and two simplify a [[law-of-cosines|Law of Cosines]] computation involving several angles. An equation that mixes sines or cosines of different multiples of $\theta$ is the standard place for sum-to-product.
`,

"special-trig-values": String.raw`
## Key forms
- $\sin 18^\circ = \dfrac{\sqrt5 - 1}{4}$ and $\cos 36^\circ = \dfrac{1 + \sqrt5}{4}$ — the pentagon family, with $\cos 72^\circ = \dfrac{\sqrt5 - 1}{4}$
- $\cos 36^\circ = \dfrac\varphi2$ and $\sin 18^\circ = \dfrac{\varphi - 1}{2}$ — the same values in terms of the golden ratio $\varphi$
- $\cos 36^\circ - \cos 72^\circ = \dfrac12$ and $\cos 36^\circ\cos 72^\circ = \dfrac14$ — two products of the pentagon values
- $\sin 15^\circ = \dfrac{\sqrt6 - \sqrt2}{4}$, $\tan 15^\circ = 2 - \sqrt3$, and $\tan 75^\circ = 2 + \sqrt3$ — the $15^\circ$ family, detailed on [[15-75-90-triangle|its own card]]

## Conditions
The values are exact, with $\sin 15^\circ = \sin(45^\circ - 30^\circ)$ and the $18^\circ$ family following from the regular pentagon.

## Why it works
$\sin 15^\circ$ comes from the angle subtraction $45^\circ - 30^\circ$: $\sin 45^\circ\cos 30^\circ - \cos 45^\circ\sin 30^\circ = \frac{\sqrt6 - \sqrt2}4$.

For the pentagon family, let $\theta = 18^\circ$, so $2\theta = 90^\circ - 3\theta$ and $\sin 2\theta = \cos 3\theta$. With $s = \sin\theta$ and $c = \cos\theta \ne 0$, that is $2sc = 4c^3 - 3c$; dividing by $c$,
$$2s = 4c^2 - 3 = 1 - 4s^2, \qquad 4s^2 + 2s - 1 = 0,$$
and the positive root is $s = \frac{\sqrt5 - 1}4$. This is also $\cos 72^\circ$.

Then $\cos 36^\circ = 1 - 2\sin^2 18^\circ = 1 - \frac{6 - 2\sqrt5}8 = \frac{1 + \sqrt5}4$. With $\varphi = \frac{1 + \sqrt5}2$ these are $\frac\varphi2$ and $\frac{\varphi - 1}2$. Their difference is $\frac{(1 + \sqrt5) - (\sqrt5 - 1)}4 = \frac12$ and their product is $\frac{5 - 1}{16} = \frac14$.

## Useful observations
- The family resemblance is the guide: anything with $\sqrt6 \pm \sqrt2$ is the $15^\circ$ and $75^\circ$ family, and anything with $\sqrt5$ is the $18^\circ$ and $36^\circ$ pentagon family.
- Deriving on demand from the two generator methods beats memorizing all the values.
- The pentagon relation to the golden ratio explains why $\varphi$ appears in all of them.

## Applications
Pentagon problems, configurations with $15^\circ$ angles such as a square with an equilateral triangle, and exact evaluation of products and differences of cosines at $36^\circ$ and $72^\circ$.

## Contest profile
Pentagon problems and $15^\circ$ configurations reduce to these. The AIME expects the derivation skill: golden-ratio algebra turns the differences and products of these cosines into simple numbers.
`,

"triple-angle": String.raw`
## Key forms
- $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$
- $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$
- $\tan 3\theta = \dfrac{3\tan\theta - \tan^3\theta}{1 - 3\tan^2\theta}$

## Conditions
The identities hold for all angles; the tangent form needs $\cos 3\theta \ne 0$ and $\tan\theta$ defined. In the cubic $4x^3 - 3x = c$ the trigonometric solution needs $\lvert c \rvert \le 1$.

## Why it works
Compose double and single angle additions: $\sin 3\theta = \sin(2\theta + \theta) = \sin 2\theta\cos\theta + \cos 2\theta\sin\theta$, and expanding with the double-angle formulas leaves $3\sin\theta - 4\sin^3\theta$. The same expansion of $\cos(2\theta + \theta)$ gives $4\cos^3\theta - 3\cos\theta$.

Alternatively, by [[de-moivre|De Moivre's Theorem]], with $c = \cos\theta$ and $s = \sin\theta$,
$$\cos 3\theta + i\sin 3\theta = (c + is)^3 = (c^3 - 3cs^2) + i(3c^2s - s^3).$$
Dividing the imaginary part by the real part, then top and bottom by $c^3$, gives $\tan 3\theta = \frac{3t - t^3}{1 - 3t^2}$ with $t = \tan\theta$.

For the cubic, put $x = \cos t$. Then $4x^3 - 3x = \cos 3t$, so the equation $4x^3 - 3x = c$ with $\lvert c \rvert \le 1$ holds when $3t = \arccos c + 2\pi k$. The values $k = 0, 1, 2$ give the roots $\cos\frac{\arccos c + 2\pi k}3$, which are distinct for $\lvert c \rvert \lt 1$, and a cubic has no more. Solving the Key forms for the cube gives $\sin^3\theta = \frac{3\sin\theta - \sin 3\theta}4$ and $\cos^3\theta = \frac{3\cos\theta + \cos 3\theta}4$.

## Useful observations
- $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ turns cubics with three real roots into trigonometric equations (the "casus irreducibilis"): cubics like $4x^3 - 3x = c$ are solved by $x = \cos\frac{\arccos c}{3}$ and its two rotations by $\frac{2\pi}{3}$.
- The sine form factors as a product of three sines $60^\circ$ apart, which collapses symmetric products of sines; that factorization is on [[evenly-spaced-angle-products|Evenly-Spaced Angle Products]].
- Solved for $\sin^3\theta$ or $\cos^3\theta$, the formulas reduce cubes of sines and cosines to first powers of multiples of $\theta$.

## Applications
Cubic equations of the form $4x^3 - 3x = c$, evaluating $\sin 3\theta$ from $\sin\theta$, and products of three sines or cosines spaced by $60^\circ$.

## Contest profile
Cubic-to-trigonometric conversion appears in hard AMC 12 and AIME algebra, after scaling the unknown to twice a cosine. The product identity computes a product of three sines in one line.
`,

"trig-telescoping-product": String.raw`
## Key forms
- $\alt{\prod_{k=0}^{n-1}\cos(2^k\theta)}{\cos\theta\cos2\theta\cos4\theta\cdots\cos2^{n-1}\theta} = \dfrac{\sin(2^n\theta)}{2^n\sin\theta}$
- $\cos x = \dfrac{\sin 2x}{2\sin x}$ — the one-step relation each factor uses

## Conditions
$\sin\theta \ne 0$. The angles double each step, or can be reordered or complemented so that they do.

## Why it works
$\sin 2x = 2\sin x\cos x$ rearranges to $\cos x = \frac{\sin 2x}{2\sin x}$. Multiplying this over the doubling chain $\theta, 2\theta, \ldots, 2^{n-1}\theta$, the numerator of each ratio cancels the denominator of the next, and the sine ratios telescope.

## Useful observations
- The trigger is a product of cosines whose angles double each time; the product is multiplied and divided by the sine of the smallest angle.
- It works with complements too: $\sin 160^\circ = \sin 20^\circ$ gives the clean $\frac18$ for $\cos 20^\circ\cos 40^\circ\cos 80^\circ$.
- With $x = \cos\theta$ the same doubling is the iterated map $x \mapsto 2x^2 - 1$.

## Applications
Products of cosines at doubling angles, products such as $\prod\cos\frac{\pi}{2^k}$, and iterated quadratic maps.

## Contest profile
A named AIME and AMC 12 pattern, which also handles products of cosines at angles $\frac{\pi}{2^k}$.
`,

"arctan-telescoping": String.raw`
## Key forms
- $\arctan a - \arctan b = \arctan\dfrac{a - b}{1 + ab}$ — the subtraction formula, valid exactly when $ab > -1$; for $ab < -1$ the true difference differs from the right side by $\pi$ (for example $a = 2$, $b = -0.9$ gives $1.840$ on the left and $-1.302$ on the right)
- $\arctan\dfrac{1}{n^2 + n + 1} = \arctan(n + 1) - \arctan n$ — the denominators $1 + n(n + 1)$
- $\arctan\dfrac{1}{2n^2} = \arctan\dfrac{1}{2n - 1} - \arctan\dfrac{1}{2n + 1}$ — another standard family
- $\arctan 1 + \arctan 2 + \arctan 3 = \pi$ — a classic, proved by two applications of the addition formula

## Conditions
The addition and subtraction formulas hold with $\arctan$ taking values in $\left(-\frac\pi2, \frac\pi2\right)$, so the true difference of two arctangents must stay in that range, which is the condition $ab > -1$; otherwise a multiple of $\pi$ is added, as on [[inverse-trig-identities|the inverse trig card]].

## Why it works
The tangent subtraction formula $\tan(A - B) = \frac{\tan A - \tan B}{1 + \tan A\tan B}$, read as a statement about arctangents. With $A = \arctan a$ and $B = \arctan b$, the formula says $A - B$ has tangent $\frac{a - b}{1 + ab}$, so $A - B = \arctan\frac{a - b}{1 + ab}$ when that angle is in the principal range.

That range condition is $ab \gt -1$. The difference $A - B$ lies in $(-\pi, \pi)$, and it lies in $\left(-\frac\pi2, \frac\pi2\right)$ exactly when $\cos(A - B) = \cos A\cos B(1 + ab)$ is positive; since $\cos A\cos B \gt 0$, that means $1 + ab \gt 0$.

Read right to left, a term $\arctan\frac{a - b}{1 + ab}$ splits into a difference of two arctangents, and a sum of such terms telescopes. The two families are instances: $\frac{(n + 1) - n}{1 + n(n + 1)} = \frac1{n^2 + n + 1}$, and
$$\frac{\frac1{2n - 1} - \frac1{2n + 1}}{1 + \frac1{4n^2 - 1}} = \frac{2}{4n^2} = \frac1{2n^2}.$$

For the classic, $\tan(\arctan 2 + \arctan 3) = \frac{5}{1 - 6} = -1$, and the sum lies between $\frac\pi2$ and $\pi$, so it is $\frac{3\pi}4$; adding $\arctan 1 = \frac\pi4$ gives $\pi$.

## Useful observations
- To telescope $\sum \arctan t_n$, the terms are matched with $t_n = \frac{a_n - b_n}{1 + a_nb_n}$, usually with $a_n = n + 1$ and $b_n = n$, which gives the denominator $n^2 + n + 1$, or with a similar pair of consecutive values.
- A denominator of the form $1 + n(n + 1)$ is the trigger.
- Finite sums are cleaner to finish through the tangent: if the sum telescopes to $\arctan x - \arctan y$, its tangent is $\frac{x - y}{1 + xy}$.

## Applications
Sums of arctangents with quadratic denominators, specific angle sums such as $\arctan 1 + \arctan 2 + \arctan 3$, and sums of angles in rectangular grids, where each angle is the arctangent of a slope.

## Contest profile
AIME arctangent sums are built for this; the family with a quadratic denominator is the canonical instance. In geometry, sums of angles in rectangular grids fall to the same formula.
`,

"sin-cos-ap-sum": String.raw`
## Key forms
- $\alt{\sum_{k=0}^{n-1}\sin(a + kd)}{\sin a + \sin(a + d) + \cdots + \sin(a + (n-1)d)} = \dfrac{\sin\frac{nd}{2}}{\sin\frac d2}\sin\left(a + \dfrac{(n-1)d}{2}\right)$ — the sum of sines in arithmetic progression
- the same formula with cosine on the right, $\dfrac{\sin\frac{nd}{2}}{\sin\frac d2}\cos\left(a + \dfrac{(n-1)d}{2}\right)$, for cosine sums
- $\alt{\sum_{k=1}^{n-1}\sin\dfrac{k\pi}{n}}{\sin\frac\pi n + \sin\frac{2\pi}{n} + \cdots + \sin\frac{(n-1)\pi}{n}} = \cot\dfrac{\pi}{2n}$ — a special case worth remembering
- sums of cosines of equally spaced angles around a full circle vanish

## Conditions
The common difference $d$ is not a multiple of $2\pi$, so that $\sin\frac d2 \ne 0$. The number of terms is $n$ and the angle in the last factor is the middle angle of the progression.

## Why it works
Multiply by $2\sin\frac d2$ and use product-to-sum on each term:
$$2\sin\tfrac d2\sin(a + kd) = \cos\left(a + \left(k - \tfrac12\right)d\right) - \cos\left(a + \left(k + \tfrac12\right)d\right).$$
Summing over $k = 0, \ldots, n - 1$ telescopes to $\cos\left(a - \frac d2\right) - \cos\left(a + \left(n - \frac12\right)d\right)$, which by sum-to-product is $2\sin\left(a + \frac{(n - 1)d}2\right)\sin\frac{nd}2$. Dividing by $2\sin\frac d2$ gives the formula.

For cosines, $2\sin\frac d2\cos(a + kd) = \sin\left(a + \left(k + \frac12\right)d\right) - \sin\left(a + \left(k - \frac12\right)d\right)$, which telescopes to $2\cos\left(a + \frac{(n - 1)d}2\right)\sin\frac{nd}2$. Alternatively, the sum is the imaginary part of the [[geometric-series|geometric series]] $\sum e^{i(a + kd)}$, whose closed form is $e^{ia}\frac{e^{ind} - 1}{e^{id} - 1}$.

The special case takes $n - 1$ terms with $a = d = \frac\pi n$: the middle angle is $\frac\pi2$ and the ratio is $\frac{\sin\left(\frac\pi2 - \frac\pi{2n}\right)}{\sin\frac\pi{2n}} = \cot\frac\pi{2n}$. Around a full circle $nd = 2\pi$, so $\sin\frac{nd}2 = 0$ and the sum vanishes.

## Useful observations
- Both routes are worth knowing: the multiplication by $2\sin\frac d2$ is self-contained, and the complex geometric series is faster with fluency.
- The result is a ratio of two sines times one sine or cosine of the middle angle, so the sum is large when the middle term is large.
- Sums of cosines of equally spaced angles around a full circle vanish, a fact that short-circuits many symmetric configurations.

## Applications
Sums such as $\cos 1^\circ + \cos 2^\circ + \cdots$, vertex sums of regular polygons, and symmetric configurations of equally spaced directions.

## Contest profile
AIME sums of sines at equally spaced degrees are direct applications. The vanishing-over-full-circle fact also short-circuits many symmetric configurations.
`,

"floor-basics": String.raw`
## Key forms
- $x = \lfloor x \rfloor + \{x\}$ with $0 \le \{x\} < 1$ — the floor is the integer part, the fractional part is what is left
- $\lfloor x + n \rfloor = \lfloor x \rfloor + n$ for an integer $n$ — integers pass through a floor unchanged
- $\lfloor x \rfloor + \lfloor -x \rfloor = -1$ unless $x$ is an integer, when it is $0$
- $\left\lfloor \dfrac nd \right\rfloor$ — the number of multiples of $d$ from $1$ to $n$
- $\left\lfloor \dfrac{n}{ab} \right\rfloor = \left\lfloor \dfrac{\lfloor n/a \rfloor}{b} \right\rfloor$ — nested division collapses
- $\lfloor b \rfloor - \lceil a \rceil + 1$ — the number of integers in $[a, b]$

## Conditions
$x$ is a real number; the floor always rounds down, so $\lfloor -3.7 \rfloor = -4$ and $\{-3.7\} = 0.3$. The nested-division rule needs $a$ and $b$ to be positive integers.

## Why it works
Every real number sits in exactly one gap between consecutive integers, and the floor records which gap it is in.

For any real $x$ there is exactly one integer $n$ with $$n \le x < n + 1,$$ because the intervals $[n, n + 1)$ cover the number line without overlapping. That $n$ is $\lfloor x \rfloor$, and then $\{x\} = x - n$ is at least $0$ and less than $1$. The figure at the top shows the two pieces: the floor jumps up by $1$ at each integer, while the fractional part climbs from $0$ and resets there.

The identities follow from this one fact. Adding an integer $n$ to $x$ moves it into the gap $n$ places along, so $\lfloor x + n \rfloor = \lfloor x \rfloor + n$. If $x$ is not an integer, it lies strictly inside a gap, $m < x < m + 1$, so $-m - 1 < -x < -m$ and $\lfloor -x \rfloor = -m - 1$; the two floors add to $-1$. If $x$ is an integer, both floors are exact and add to $0$.

Counting multiples is the same idea. The multiples of $d$ up to $n$ are $d, 2d, \ldots, kd$, where $k$ is the largest integer with $kd \le n$, that is, the largest integer at most $\frac nd$, which is $\left\lfloor \frac nd \right\rfloor$.

## Full proof
The nested-division rule $$\left\lfloor \frac{x}{ab} \right\rfloor = \left\lfloor \frac{\lfloor x/a \rfloor}{b} \right\rfloor$$ holds for every real $x$ and all positive integers $a$ and $b$.

Let $q = \lfloor x/a \rfloor$, so that $qa \le x < (q + 1)a$, and let $Q = \lfloor q/b \rfloor$, so that $Qb \le q \le Qb + b - 1$, the upper bound holding because $q$ is an integer. Then $x \ge qa \ge Qab$, and $x < (q + 1)a \le (Qb + b)a = (Q + 1)ab$. So $Qab \le x < (Q + 1)ab$, which says exactly that $\left\lfloor \frac{x}{ab} \right\rfloor = Q$.

## Useful observations
- To solve an equation with a floor in it, write $x = n + f$ with $n = \lfloor x \rfloor$ an integer and $0 \le f < 1$. That converts one equation in a real unknown into an equation about an integer plus an inequality, and the inequality makes the search finite: a floor equation over the reals has no method until it becomes a small number of integer cases.
- When a floor sits inside a sum, split the range into the stretches where the floor is constant; on each stretch it is a single integer, and the sum becomes a short list of products.
- Counting multiples of $d$ up to $n$ as $\lfloor n/d \rfloor$ turns most floor-counting into divisor arithmetic, and nested division means repeated halving or repeated division never needs to be unwound.

## Applications
Equations with floors, counting multiples and integers in intervals, and sums over bands where the floor is constant.

## Contest profile
Floor equations and floor-counting problems permeate the AMC and AIME, and the card is often the whole solution. When it is not, the partner is [[casework-method|casework]], which is the method rather than a coincidence: the band substitution produces the cases and casework closes them.
`,

"hermite-identity": String.raw`
## Key forms
- $\lfloor nx\rfloor = \lfloor x\rfloor + \left\lfloor x + \dfrac1n\right\rfloor + \cdots + \left\lfloor x + \dfrac{n-1}{n}\right\rfloor$ — Hermite's Identity
- $\lfloor x\rfloor + \lfloor -x\rfloor$ is $0$ or $-1$ — a companion for symmetric summations

## Conditions
$n$ is a positive integer and $x$ is real.

## Why it works
As $x$ increases by steps of $\frac1n$, exactly one of the shifted floors $\lfloor x + \frac kn\rfloor$ ticks up at each step, and the left side $\lfloor nx\rfloor$ ticks at the same moments. Both sides are step functions with identical jumps and equal value at $x = 0$.

## Useful observations
- It splits $\lfloor nx\rfloor$ into pieces when summing floors of arithmetic sequences, and collapses sums like $\sum_{k=0}^{n-1}\lfloor x + \frac kn\rfloor$ on sight.
- Recognizing that a messy floor sum is Hermite in reverse is usually the entire problem.

## Applications
Floor-sum problems and proofs of floor identities.

## Contest profile
AIME floor-sum problems and Putnam-style identities, where a messy sum of floors collapses to one floor.
`,

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
- The dots sit inside the expression, at the end of a radical, a fraction, or an exponent, rather than at the end of a sum or a list.
- Not this pattern: an infinite sum $1 + \frac12 + \frac14 + \cdots$, which is a series, while $\sqrt{2 + \sqrt{2 + \cdots}}$ repeats the same operation on itself.
- A finite nest with a stated number of layers is a recursion, and belongs here only when a pattern in the number of layers is wanted.

## Methods and Formulas to Try
Removing one layer leaves the same expression, which is an equation for its value; finite radical nests often have exact trigonometric values instead.

### Methods to try
- [[name-the-whole-expression]]: call the expression $x$, write $x$ in terms of itself using one layer, and solve.
- [[trig-substitution]]: a nest such as $\sqrt{2 + \sqrt{2 + \cdots + \sqrt 2}}$ with $n$ layers equals $2\cos\frac{\pi}{2^{n+1}}$, since each layer halves an angle.

### Formulas to try
- [[quadratic-formula]]: the one-layer equation is usually a quadratic, with one root to reject.
- [[half-angle]]: $\sqrt{2 + 2\cos\theta} = 2\cos\frac\theta2$, the identity that evaluates finite radical nests.
- [[ramanujan-nested-radical]]: nests whose layers change from step to step, which self-similarity alone cannot handle.

## Common traps
- Keeping both roots of the quadratic, when the value is positive or larger than the first term.
- Solving a power tower $x^{x^{\cdots}} = a$ without checking convergence: the tower converges only for $e^{-e} \le x \le e^{1/e}$, so $\sqrt2^{\sqrt2^{\cdots}}$ equals $2$, never $4$.
- Assuming that a nest whose layers change, such as $\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}}$, is self-similar.

## Contest profile
A quick AMC question in its plain form and an AIME ingredient when the nest is combined with a continued fraction or a convergence argument.
`,

"rationalizing": String.raw`
## When to use
Simplifying $\frac{1}{\sqrt5 - 2}$, summing $\frac{1}{\sqrt1 + \sqrt2} + \frac{1}{\sqrt2 + \sqrt3} + \cdots$, comparing $\sqrt{n + 1} - \sqrt n$ with $\frac{1}{2\sqrt n}$, and finding the integer part or the last digits of a power like $(2 + \sqrt3)^{10}$. A nested radical such as $\sqrt{a + \sqrt b}$ is a different job, the one of [[denesting-radicals|denesting]], and a product or a square of radicals needs no conjugate.

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

A sum whose pairs do not add to a constant is not this, and [[telescoping|telescoping]] or a closed form is the next thing to try.

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
Radicals such as $\sqrt{1 - x^2}$ or $\sqrt{x^2 + 4}$, optimizing an expression like $x + \sqrt{1 - x^2}$, recursions such as $x_{n+1} = 2x_n^2 - 1$, and symmetric conditions such as $a + b + c = abc$ or $ab + bc + ca = 1$, which are identities for the tangents of angles that add to $\pi$ or to $\frac\pi2$. The range of $x$ has to match: for $|x| > 1$, $\sqrt{1 - x^2}$ is not real, and a secant or hyperbolic substitution is needed.

## How
1. Match the shape: $a\sin\theta$, $a\tan\theta$ or $a\sec\theta$ for the three radicals, $\cos\theta$ for $2x^2 - 1$, and tangents of angles for $a + b + c = abc$.
2. Restrict the angle so the substitution covers every allowed value exactly once and the square root comes out with the right sign.
3. Simplify with identities and solve or optimize in the angle.
4. Convert back to the original variable.

Maximize $x + \sqrt{1 - x^2}$ for $-1 \le x \le 1$. With $x = \sin\theta$ and $-\frac\pi2 \le \theta \le \frac\pi2$, the root is $\cos\theta$, so the expression is $\sin\theta + \cos\theta = \sqrt2\sin\left(\theta + \frac\pi4\right)$, whose maximum $\sqrt2$ occurs at $\theta = \frac\pi4$, that is $x = \frac{\sqrt2}{2}$.

## Why it works
Each substitution matches a Pythagorean identity. With $x = a\sin\theta$,
$$\sqrt{a^2 - x^2} = a\sqrt{1 - \sin^2\theta} = a\cos\theta,$$
which is right because $\cos\theta \ge 0$ for $-\frac\pi2 \le \theta \le \frac\pi2$. The figure shows the same fact as a right triangle with hypotenuse $a$ and one leg $x$.

Recursions close because identities double or add angles: $\cos 2\theta = 2\cos^2\theta - 1$ turns $x \mapsto 2x^2 - 1$ into $\theta \mapsto 2\theta$. And for angles with $A + B + C = \pi$, $\tan(A + B) = -\tan C$ reads $\frac{\tan A + \tan B}{1 - \tan A\tan B} = -\tan C$, which rearranges to $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, the condition $a + b + c = abc$.

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

"descartes-rule-signs": String.raw`
## Key forms
- the number of positive real roots of $P(x)$ equals the number of sign changes between consecutive nonzero coefficients, or is smaller than it by an even number
- the number of negative real roots is counted the same way on $P(-x)$
- zero sign changes means no positive roots, a certainty and not a bound; one sign change means exactly one

## Conditions
The coefficients are real, roots are counted with multiplicity, and zero coefficients are skipped. A root at $0$ is removed first by factoring out a power of $x$.

## Why it works
Let $V(P)$ be the number of sign changes. Assume $P(0) \ne 0$ and the leading coefficient is positive.

Step 1, parity. $V(P)$ is even exactly when the constant term is positive. The number of positive roots, with multiplicity, is even exactly when $P$ has the same sign at $0$ and for large $x$, which is again when the constant term is positive. So the two numbers have the same parity.

Step 2, the lemma: for $r \gt 0$, $V((x - r)Q) \ge V(Q) + 1$. Write $Q = \sum b_ix^i$ with $b_d \gt 0$, so the coefficients of $(x - r)Q$ are $c_i = b_{i-1} - rb_i$. Let $i_1 \gt i_2 \gt \cdots \gt i_V$ be the indices where the sign of $Q$'s coefficients first switches, so $b_{i_k}$ has sign $(-1)^k$ and $b_{i_k + 1}$ is $0$ or of the opposite sign.

Then $c_{i_k + 1} = b_{i_k} - rb_{i_k + 1}$ has the sign $(-1)^k$. Together with $c_{d+1} = b_d \gt 0$ and $c_0 = -rb_0$, of sign $(-1)^{V+1}$, the coefficients $c_{d+1}, c_{i_1 + 1}, \ldots, c_{i_V + 1}, c_0$ alternate in sign, so $(x - r)Q$ has at least $V + 1$ sign changes.

Step 3. Factor $P = (x - r_1)\cdots(x - r_k)Q$ over its $k$ positive roots. The lemma, applied $k$ times, gives $V(P) \ge k$, and by Step 1 the difference is even. For negative roots, the roots of $P(-x)$ are the negatives of those of $P$.

## Useful observations
- Sign changes of $P(x)$ are counted for positive roots and sign changes of $P(-x)$ for negative roots, and the complex roots, which come in pairs, fill the gap to the degree.
- Combined with the intermediate value theorem at a few points, the bound often pins down the exact count.
- It never locates a root; it is a structural triage, to be paired with rational root candidates or the intermediate value theorem for locations.

## Applications
Counting real roots, eliminating cases in "how many real solutions" problems, and pruning a root search.

## Contest profile
The AMC 12 uses it to eliminate cases in "how many real solutions" problems; on the AIME it prunes root-hunting before heavier tools.
`,

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

"cauchy-functional-equations": String.raw`
## Key forms
- $f(x + y) = f(x) + f(y) \implies f(x) = cx$ — additive gives linear
- $f(x + y) = f(x)f(y) \implies f(x) = c^x$ — additive to multiplicative gives exponential
- $f(xy) = f(x) + f(y) \implies f(x) = c\log x$ — multiplicative to additive gives logarithmic
- $f(xy) = f(x)f(y) \implies f(x) = x^c$ — multiplicative gives power

## Conditions
Each template assumes continuity, monotonicity, or boundedness on an interval; contest problems always supply enough regularity. The multiplicative forms need positivity to take logarithms, and the degenerate solution $f \equiv 0$ is checked separately.

## Why it works
For additive $f$: build from $f(1)$ over the integers, then the rationals ($q\,f(p/q) = f(p)$); regularity forces the rational-linear behavior to extend to all reals. The other three templates reduce to the additive one via logarithms and exponentials, for example $g = \ln f$ turns the multiplicative equation into an additive one.

## Useful observations
- The template is matched, the regularity hypothesis the problem provides is verified, the general solution is written with one unknown constant, and the constant is pinned from a given value.
- Shifted arguments and extra constants are normalized away first, for example $g(x) = f(x) - f(0)$.
- Domain subtleties matter: the multiplicative forms need positivity, and $f \equiv 0$ is checked separately.

## Applications
Functional equations that are a Cauchy template in light disguise, and recovering $f$ from a single value.

## Contest profile
AMC and AIME functional equations are usually a Cauchy template in light disguise (a shifted argument or an extra constant). Recognize, normalize, classify, and evaluate: a three-minute routine once the four forms are memorized.
`

});

Object.assign(window.MATH_DETAILS, {

"root-transformations": String.raw`
## When to use
Questions about numbers made from the roots of a known polynomial by one fixed rule: shifted roots $r - 2$, scaled roots $3r$, reciprocals $\frac1r$, squares $r^2$, or Möbius images such as $\frac{1 + r}{1 - r}$. The target is usually a sum, a product, or another symmetric function of the new numbers, which would take long symmetric-polynomial algebra in the old roots but is one coefficient of the new polynomial. Quantities that are not symmetric in the roots, such as $r_1 - r_2$, cannot be read from the new polynomial.

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
- The index is in the hundreds or thousands, and nothing in the rule suggests a closed form.
- Remainders of a power or a recurrence, which repeat because the state, one residue or the last few, takes finitely many values.
- A rule built from fractions $\frac{ax + b}{cx + d}$ or quotients of earlier terms, which can return exactly to its start.
- A condition about divisibility by several small numbers, which repeats with period their least common multiple.
- Not this pattern: a recursion with steady growth, such as Fibonacci asked for an actual value, which is a closed-form problem.

## Methods and Formulas to Try
Which method fits depends on why the terms repeat: finitely many states call for listing them, a hidden rotation for a substitution, and a count for working over one period.

### Methods to try
- [[cycle-hunting]]: compute exact terms or residues until the state the rule needs repeats, then reduce the index by the period.
- [[trig-substitution]]: writing $x_n = \tan\theta_n$ turns rules such as $\frac{1 + x}{1 - x}$ into adding a fixed angle, which shows the period at once.
- [[casework-method]]: when the question is a count, handle each position within one period, multiply by the number of full periods, and add the partial period at the end.

### Formulas to try
- [[eulers-theorem]]: for a base coprime to $m$, the powers modulo $m$ cycle from the first term with a period dividing $\varphi(m)$.
- [[multiplicative-order]]: the exact period of the powers of $a$ modulo $m$.
- [[linear-recurrence]]: characteristic roots that are roots of unity, as for $a_{n+1} = a_n - a_{n-1}$, give a periodic sequence.
- [[crt]]: splits a composite modulus, such as $1000 = 8 \cdot 125$, so each part's period can be found separately.

## Common traps
- Computing with decimals, which hide an exact return to the start.
- With a two-term rule, declaring a cycle when one value repeats instead of the pair.
- Reducing the index from the start when the cycle begins after a few terms.
- Taking $\varphi(m)$ as the period, when the true period divides it.

## Contest profile
Common on the AMC and AIME: a term numbered in the thousands, the last digits of a large power, or a count up to $1000$ that depends only on residues; the work is computing one cycle carefully.
`,

"triangle-angle-identities": String.raw`
## Key forms
- $\tan A + \tan B + \tan C = \tan A\tan B\tan C$ — for a triangle with no right angle
- $\cos A + \cos B + \cos C = 1 + \dfrac rR$ and $\sin A + \sin B + \sin C = \dfrac sR$ — the sums, with inradius $r$, circumradius $R$, and semiperimeter $s$
- $\sin 2A + \sin 2B + \sin 2C = 4\sin A\sin B\sin C$
- $\cot A\cot B + \cot B\cot C + \cot C\cot A = 1$

## Conditions
All hold whenever $A + B + C = 180^\circ$. The tangent identity needs every tangent defined, so no right angle.

## Why it works
All spring from $C = 180^\circ - A - B$. For the tangent identity, $\tan(A + B) = \tan(180^\circ - C) = -\tan C$ is expanded and denominators cleared. For the cotangents, $\cot C = -\cot(A + B) = \frac{1 - \cot A\cot B}{\cot A + \cot B}$, and clearing the denominator gives $\sum\cot A\cot B = 1$, which holds even with a right angle.

The sine sum is $\frac{a + b + c}{2R}$ by the Law of Sines. For the cosines, sum-to-product and $\cos C = 1 - 2\sin^2\frac C2$ give
$$\cos A + \cos B + \cos C = 1 + 2\sin\tfrac C2\left(\cos\tfrac{A - B}2 - \cos\tfrac{A + B}2\right) = 1 + 4\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2.$$

To bring in $r$: the incircle touches $BC$ at distances $r\cot\frac B2$ and $r\cot\frac C2$ from $B$ and $C$, so $a = r\frac{\cos\frac A2}{\sin\frac B2\sin\frac C2}$, and $a = 4R\sin\frac A2\cos\frac A2$ turns this into $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$. So the cosine sum is $1 + \frac rR$. The $\sin 2A$ identity is proved on [[triangle-sin2-sum-ratio|its own card]].

## Useful observations
- Two directions: given trigonometric data about a triangle's angles, convert to $r$, $R$, $s$; and given an equation like $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, recognize it as saying the angles sum to $180^\circ$ (used both ways).
- The cotangent identity $\sum\cot A\cot B = 1$ pairs with [[brocard-angle|the Brocard angle]] formula.
- The two headline identities are memorized, and the rest derived from sum-to-product on demand.

## Applications
Converting angle sums to $r$, $R$, and $s$, finding a third angle's tangent from two, and detecting supplementary structure.

## Contest profile
AIME trigonometry problems hand over one of these sums and expect the translation into the inradius, circumradius, or semiperimeter; AMC 12 uses the tangent identity to detect or exploit supplementary structure.
`,

"piecewise-graph-counting": String.raw`
## When to use
"How many real solutions" questions for equations built from absolute values, floors, maxima, or other piecewise pieces; questions such as "for which $c$ does $f(x) = c$ have exactly four solutions"; and counts of intersections between two piecewise graphs, such as two sawtooth curves. The signal is an equation that would split into many cases if solved algebraically. One absolute value with a single corner is two cases and is solved algebraically in two lines.

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
## Key forms
- $\alt{\dfrac1{t_{\text{together}}} = \sum_i \dfrac1{t_i}}{\dfrac1{t_{\text{together}}} = \dfrac1{t_1} + \dfrac1{t_2} + \cdots}$ — rates add, and the time together is the reciprocal of the total rate
- $\dfrac{ab}{a + b}$ — the time for two workers who take $a$ and $b$ alone
- a drain or leak is a negative rate, so a filling pipe and a drain together fill at $\frac1a - \frac1b$ per unit of time
- (rate) $\times$ (time) $=$ fraction of the job, and the fractions done in each stage add up to $1$

## Conditions
Every worker keeps a constant rate and the workers do not get in each other's way. The job is the same job for everyone, taken as $1$.

## Why it works
When workers do not get in each other's way, the work they do in an hour adds up, and time is the reciprocal of rate.

A pipe that fills a pool in $4$ hours fills $\frac14$ of it each hour, and one that takes $6$ hours fills $\frac16$. Together they fill $\frac14 + \frac16 = \frac5{12}$ per hour, so the whole pool takes $\frac{12}{5}$ hours. Adding or averaging the times would be wrong, because time is not the quantity that adds.

{{figure:rates}}

For two workers, $\frac1a + \frac1b = \frac{a + b}{ab}$, so together they take $\frac{ab}{a + b}$ hours, which is half the [[mean-chain|harmonic mean]] of their two times.

## Useful observations
- Calling the job $1$, converting every worker to a rate, adding or subtracting, and inverting at the end handles every version. For a job done in stages, such as two workers together for a while and then one alone, the fraction completed in each stage is tracked, and their total set equal to $1$.
- The harder versions leave the rates unknown and give combined times for pairs: A and B take $x$ hours, B and C take $y$, and so on. Each is a linear equation in the rates, so the rates are solved for rather than the times.

## Applications
Pipes and drains, painters and machines, joint jobs done in stages, and any problem where independent contributions per unit time add.

## Contest profile
Five problems here, four of them AIME, and four solved by it alone: once every worker is a rate, the problem is a small linear system. MATHCOUNTS and early AMC use the simple versions with pipes and painters.
`,

"average-speed": String.raw`
## Key forms
- $v_{\text{avg}} = \dfrac{\text{total distance}}{\text{total time}}$ — the one definition that cannot go wrong
- $\dfrac{2v_1v_2}{v_1 + v_2}$ — the average over two equal distances at speeds $v_1$ and $v_2$, the harmonic mean
- $\alt{\dfrac{n}{\sum_i \frac1{v_i}}}{\dfrac{n}{\frac1{v_1} + \frac1{v_2} + \cdots + \frac1{v_n}}}$ — the average over $n$ equal distances
- $\dfrac{v_1 + v_2}{2}$ — the average over two equal times, the ordinary mean

## Conditions
The speed on each leg is constant. The harmonic-mean shortcut needs equal distances and the arithmetic mean needs equal times; any other split needs total over total.

## Why it works
An average speed has to reproduce the whole trip: covering the total distance at that one speed must take the total time, which forces total distance over total time.

That weights each speed by the time spent at it. Over equal distances $d$ at speeds $v_1$ and $v_2$ the times are $\frac d{v_1}$ and $\frac d{v_2}$, so $$v_{\text{avg}} = \frac{2d}{\frac{d}{v_1} + \frac{d}{v_2}} = \frac{2v_1v_2}{v_1 + v_2}.$$ More time is spent at the slower speed, so it counts for more, and the result is below the arithmetic mean unless the two speeds are equal.

## Useful observations
- The speeds are never averaged directly. A convenient distance, such as a common multiple of the speeds, gives each leg's time, and total is divided by total. For $30$ mph out and $60$ mph back over $60$ miles each way, the legs take $2$ hours and $1$ hour, so $v_{\text{avg}} = \frac{60 + 60}{2 + 1} = 40$ mph.
- The harmonic-mean shortcut applies only to equal distances. Equal times give the ordinary arithmetic mean instead, and anything else needs the full total over total.

## Applications
Round trips, trips with several legs, "late at one speed and early at another" problems, and any rate that is a ratio of totals.

## Contest profile
Three problems here, two AMC 12 and one AIME, two solved by it alone. On the AMC it is an answer-choice trap, with the plain mean among the options whenever the true answer is the harmonic mean. A common version misses a target time by the same margin at two speeds, late at one and early at the other, which makes the right speed their harmonic mean. For trips with several legs, see [[time-per-leg|multi-leg rates]].
`,

"relative-motion": String.raw`
## Key forms
- closing speed $= v_1 + v_2$ for movers approaching head-on, and $|v_1 - v_2|$ when one chases the other
- time to meet $= \dfrac{\text{gap}}{\text{closing speed}}$
- in a current $c$: a boat of still-water speed $v$ moves at $v - c$ upstream and $v + c$ downstream
- circular track of length $L$: runners going the same way meet every $\dfrac{L}{|v_1 - v_2|}$, runners going opposite ways every $\dfrac{L}{v_1 + v_2}$

## Conditions
Constant speeds along a line or a closed track. A current, wind, or moving walkway adds the same drift to everything in it.

## Why it works
Only the distance between two movers decides when they meet, and that distance changes at the difference of their velocities.

On a line, put one object at $x_1 = a_1 + v_1t$ and the other at $x_2 = a_2 + v_2t$. The gap $x_2 - x_1 = (a_2 - a_1) + (v_2 - v_1)t$ changes at the constant rate $v_2 - v_1$. Moving toward each other, the velocities have opposite signs and the gap shrinks at the sum of the speeds; moving the same way, it shrinks at their difference. Either way the time to meet is the starting gap divided by that rate, exactly as if one object stood still and the other moved at the combined speed.

{{figure:frames}}

A current or a moving walkway adds the same drift to everything in it. It changes speeds measured from the ground, but not the speeds of two objects in it relative to each other.

A circular track is the same idea with the gap wrapping around. Two runners starting together are at the same point again exactly when the distance between them, measured along the track, has changed by a whole number of laps.

Running the same way, that separation grows at $v_1 - v_2$, so the first meeting is when the faster has run exactly one lap more than the slower. Running opposite ways, it grows at $v_1 + v_2$, so they meet when their two distances add to one full lap. After that, meetings repeat at the same interval, and the $k$th meeting comes at $k$ times the first.

## Useful observations
- In a current of speed $c$ a round trip averages less than $v$, because the slow leg takes longer: with $v = 5$ and $c = 3$ km/h over $8$ km each way, the trip takes $\frac{8}{5 - 3} + \frac{8}{5 + 3} = 5$ hours, so $16$ km in $5$ hours averages $3.2$ km/h.
- Crossing a river, the velocity splits into components: the across-stream component alone decides how long the crossing takes, and the along-stream component, the boat's own plus the current's, decides where it lands. To land straight across, aim upstream so the two along-stream parts cancel.
- Clock hands are a circular track too. The minute hand gains $6 - \frac12 = 5.5$ degrees per minute on the hour hand, so they coincide every $\frac{360}{5.5} = \frac{720}{11}$ minutes.
- "Two runners start together and next meet after $4$ minutes" fixes $v_1 - v_2$ or $v_1 + v_2$, which is usually the missing equation.

## Applications
Chases and head-on meetings, boats and currents, trains passing, escalators, runners on a track, and clock hands.

## Contest profile
Once the right frame is chosen there is usually nothing left to do, so it is very often the whole solution. Track problems lean on the lap rule; trains passing, clock hands, escalator walkers, and river crossings are the other regulars.
`,

"weighted-average": String.raw`
## Key forms
- $\bar x = \dfrac{w_1x_1 + w_2x_2}{w_1 + w_2}$ — the weighted average of $x_1$ and $x_2$ with weights $w_1$ and $w_2$
- $\dfrac{w_1}{w_2} = \dfrac{x_2 - \bar x}{\bar x - x_1}$ — the weights are inversely proportional to the distances from the average (the seesaw rule)
- $x_1 \le \bar x \le x_2$ — the average lies between the two values, closer to the heavier one

## Conditions
The weights are positive and measure how much of each value there is: items, grams, liters, hours, or points. "Averages of averages" are weighted averages, and the plain average of two class averages is right only when the weights are equal.

## Why it works
An average is a total divided by a count, and mixing two groups adds their totals and adds their counts.

A group of $w_1$ items averaging $x_1$ contains a total of $w_1x_1$: that many points, grams of acid, or miles. Pour in a second group of $w_2$ items with total $w_2x_2$. Nothing is lost, so the combined total is $w_1x_1 + w_2x_2$, spread over $w_1 + w_2$ items, and dividing gives the average. That is why averages of averages go wrong without the weights: class averages of $80$ and $90$ combine to $85$ only if the two classes are the same size.

Rearranging gives the seesaw rule. Clearing the denominator, $w_1\bar x + w_2\bar x = w_1x_1 + w_2x_2$, so $w_1(\bar x - x_1) = w_2(x_2 - \bar x)$. Picture the two values as weights on a seesaw balanced at $\bar x$: each weight times its distance from the balance point is the same on both sides, so the heavier group sits closer, and $\frac{w_1}{w_2} = \frac{x_2 - \bar x}{\bar x - x_1}$.

{{figure:seesaw}}

## Useful observations
- The seesaw form answers mixing-ratio questions in one line, without variables.
- For dilution and replacement problems ("remove a liter, add water, repeat"), tracking the pure substance multiplicatively works: each replacement multiplies the concentration by the same fraction, the share of the container that was kept.
- Whenever averages are combined, the weights come first; the class-average traps are exactly missing-weight errors.
- Equal-volume swaps between two jars have an invariant: after the swap, the amount of each liquid that has ended up in the other jar is always the same, which makes a hard-looking question free.

## Applications
Mixtures and concentrations, combined averages of groups, average speed over equal distances or equal times, and puzzles where one added score shifts the mean.

## Contest profile
Unusually self-contained: it is the whole solution in most of the problems that use it, mostly on the AMC. The shapes are mixtures of two concentrations, combined averages of groups, and average-score puzzles.
`

});

Object.assign(window.MATH_DETAILS, {

"sos-identity": String.raw`
## Key forms
- $x^2 + y^2 + z^2 - xy - yz - zx = \dfrac12\left[(x - y)^2 + (y - z)^2 + (z - x)^2\right]$ — the sum-of-squares form
- $x^2 + y^2 + z^2 \ge xy + yz + zx$ for all reals, with equality exactly when $x = y = z$
- $(x + y + z)^2 \ge 3(xy + yz + zx)$ — an equivalent statement, since the left side minus the right is the same expression
- $\alt{\sum_{i \lt j}(x_i - x_j)^2 = n\sum_i x_i^2 - \Big(\sum_i x_i\Big)^2}{(x_1 - x_2)^2 + (x_1 - x_3)^2 + \cdots = n(x_1^2 + \cdots + x_n^2) - (x_1 + \cdots + x_n)^2}$ — the version for $n$ variables

## Conditions
The variables are real, so that every square is nonnegative. The identity itself holds for all numbers, but the inequality and the equality case need real values.

## Why it works
Expand the right side: each $(x - y)^2$ contributes $x^2 + y^2 - 2xy$, and the halved total collects exactly $x^2 + y^2 + z^2 - xy - yz - zx$. Each variable appears in two of the three squares, which gives its square the coefficient $\frac12 \cdot 2 = 1$, and each pair appears once with $-2$, which gives $-1$ after halving.

Being a sum of real squares, it is nonnegative and vanishes only when all pairwise differences do. The third Key form is the same expression, since $(x + y + z)^2 - 3(xy + yz + zx) = x^2 + y^2 + z^2 - xy - yz - zx$.

With $n$ variables, each $x_i^2$ appears in $n - 1$ of the squares, so
$$\sum_{i \lt j}(x_i - x_j)^2 = (n - 1)\sum_i x_i^2 - 2\sum_{i \lt j}x_ix_j = n\sum_i x_i^2 - \Big(\sum_i x_i\Big)^2.$$

## Useful observations
- Three standard deployments: proving $\sum x^2 \ge \sum xy$ with the equality analysis; cracking symmetric conditions, since any equation reducible to $\sum(x - y)^2 = 0$ forces all variables equal; and the factor analysis of $x^3 + y^3 + z^3 - 3xyz = (x + y + z)\cdot\frac12\sum(x - y)^2$, which shows the second factor's sign is fixed (see [[cubes-minus-3abc|the cubes factorization]]).
- The expression depends only on the differences of the variables, so it is unchanged when every variable is shifted by the same amount.

## Applications
Proving symmetric inequalities, deducing equality from a symmetric equation, and evaluating a symmetric expression from the differences of its variables.

## Contest profile
Symmetric systems on the AMC and AIME constantly hide the "equals zero forces equal" step; inequality problems use it as the base case of [[sos-method|SOS]] (sum-of-squares) arguments. It is worth recognizing in both directions, expanded and factored.
`,

"useful-factorizations": String.raw`
## Key forms
- $a^4 + a^2b^2 + b^4 = (a^2 + ab + b^2)(a^2 - ab + b^2)$ — the $x^4 + x^2 + 1$ family
- $(a + b + c)^3 - a^3 - b^3 - c^3 = 3(a + b)(b + c)(c + a)$
- $(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc$ — converting between products of pairwise sums and symmetric sums

## Conditions
All three are identities in any commutative setting. The first is a disguised difference of squares, which is why it factors over the integers even though $a^2 + ab + b^2$ looks irreducible.

## Why it works
$a^4 + a^2b^2 + b^4$: adding and subtracting $a^2b^2$ reaches $(a^2 + b^2)^2 - (ab)^2$, then the difference of squares.

The cube identity expands directly, or follows from symmetry: the left side vanishes when $a = -b$ (and likewise for the other pairs), so $(a + b)(b + c)(c + a)$ divides it, and comparing degree and leading coefficient fixes the factor $3$.

For the last identity, both sides expand to $a^2b + a^2c + b^2a + b^2c + c^2a + c^2b + 2abc$: the product $(a + b + c)(ab + bc + ca)$ gives each of the six $a^2b$ terms once and $abc$ three times. The chaining in the first observation is $(n - 1)^2 + (n - 1) + 1 = n^2 - n + 1$.

## Useful observations
- $x^4 + x^2 + 1$ and its iterate $x^8 + x^4 + 1$ show up in telescoping products and "factor this large number" problems. For example $n^4 + n^2 + 1 = (n^2 + n + 1)(n^2 - n + 1)$, with the bonus that $n^2 - n + 1 = (n - 1)^2 + (n - 1) + 1$, chaining consecutive values into telescoping fractions.
- The identity $(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc$ converts products of pairwise sums into elementary symmetric data, which is Vieta-ready; it has [[pairwise-sum-product|its own card]].

## Applications
Telescoping products with quartic factors, factoring large numbers, and systems that give $a + b + c$, $ab + bc + ca$, and $abc$.

## Contest profile
The telescoping product of quartic factors is a recurring AIME construction, in the same family as the Sophie Germain Identity. The pairwise-sum identity resolves systems giving $a + b + c$, $ab + bc + ca$, $abc$ and asking for $(a + b)(b + c)(c + a)$ in one line.
`,

"pairwise-sum-product": String.raw`
## Key forms
- $(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$, that is $e_1e_2 - e_3$ in the elementary symmetric polynomials
- $(x + y + z)^3 - x^3 - y^3 - z^3 = 3(x + y)(y + z)(z + x)$ — the companion identity

## Conditions
The identities hold for all numbers or expressions $x$, $y$, $z$. They convert a product of binomials into Vieta-ready symmetric-sum data, and back.

## Why it works
Expand $(x + y)(y + z)(z + x)$: the degree-$3$ terms are all six $x^2y$-type monomials plus $2xyz$. Meanwhile $(x + y + z)(xy + yz + zx)$ produces those same six monomials but with $3xyz$. Subtracting one $xyz$ makes them agree, so $(x + y)(y + z)(z + x) = e_1e_2 - e_3$.

For the companion, the left side vanishes when $x = -y$, so $x + y$ is a factor, and likewise $y + z$ and $z + x$. Both sides have degree $3$, and comparing the coefficient of $x^2y$, which is $3$ on the left, fixes the constant $3$.

## Useful observations
- When $x + y + z$, $xy + yz + zx$, and $xyz$ are known, most often as $-\frac ba$, $\frac ca$, $-\frac da$ from a cubic's coefficients via [[vietas-general|Vieta's Formulas]], any product of the pairwise sums is just $e_1e_2 - e_3$, with no expansion.
- Read backward, it simplifies a stubborn product of three binomials into symmetric-sum arithmetic.
- The companion identity turns a difference of cubes of three variables into the same product.

## Applications
Products of pairwise sums of the roots of a cubic, and symmetric systems asking for $(x + y)(y + z)(z + x)$.

## Contest profile
The signature AIME setup hands over the three symmetric sums, or a cubic whose roots are $x$, $y$, $z$, and asks for $(x + y)(y + z)(z + x)$ or an equivalent product: one substitution and the answer is done, with no messy expansion under time pressure.
`,

"antisymmetric-factorization": String.raw`
## Key forms
- $a^2(b - c) + b^2(c - a) + c^2(a - b) = -(a - b)(b - c)(c - a)$ — the degree-$2$ cyclic sum
- $a^3(b - c) + b^3(c - a) + c^3(a - b) = -(a - b)(b - c)(c - a)(a + b + c)$ — the degree-$3$ one
- a cyclic expression that vanishes whenever two variables are equal carries the factor $(a - b)(b - c)(c - a)$, and the remaining degree fixes the rest

## Conditions
The expression is a polynomial that is antisymmetric, or at least vanishes whenever two variables coincide. A symmetric polynomial that does not vanish at $a = b$ has no such factor.

## Why it works
Read the expression as a polynomial in $a$. Substituting $a = b$ makes it vanish, so $(a - b)$ divides it; by the cyclic symmetry $(b - c)$ and $(c - a)$ divide it too.

Their product already has degree $3$, so the degree-$2$ sum equals that product times a constant, and one test point fixes the constant to $-1$. The degree-$3$ sum has one degree to spare, and symmetry forces the leftover factor to be $a + b + c$.

## Useful observations
- Any cyclic expression that dies when two variables coincide factors as $(a - b)(b - c)(c - a)$ times a symmetric polynomial of the leftover degree; the skeleton is written down, then the coefficient is pinned with an easy substitution.
- This turns "factor this cyclic mess" or "show this symmetric sum vanishes" into a two-line argument.
- The sign is the classic slip, so every answer is checked against $(a, b, c) = (1, 2, 3)$.

## Applications
Factoring cyclic sums, showing that an expression vanishes, and Vandermonde-type determinants.

## Contest profile
Common on the AIME and in olympiad algebra when a symmetric or cyclic quantity must be factored or shown to vanish.
`,

"sum-zero-identities": String.raw`
## Key forms
- $a^3 + b^3 + c^3 = 3abc$ and $a^2 + b^2 + c^2 = -2(ab + bc + ca)$ — what the cube and square sums become when $a + b + c = 0$
- $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ — the parent factorization; setting the first factor to zero is what makes the whole card work
- $a^4 + b^4 + c^4 = \dfrac12(a^2 + b^2 + c^2)^2$ and $\dfrac{a^5 + b^5 + c^5}{5} = \dfrac{a^3 + b^3 + c^3}{3} \cdot \dfrac{a^2 + b^2 + c^2}{2}$ — the higher power sums
- $p_k = -e_2\,p_{k-2} + e_3\,p_{k-3}$ — with $e_1 = 0$ [[newtons-sums|Newton's Sums]] collapse to this, and every higher power sum follows from it
- $p_5 = -5e_2e_3$, $p_7 = 7e_2^2e_3$ — the clean consequences, and the source of the power-sum ratios these problems ask for

## Conditions
The three quantities sum to zero. The identities hold for real or complex numbers and for expressions, so $a$, $b$, $c$ may themselves be differences or roots of a polynomial.

## Why it works
Everything follows from the elementary symmetric values $e_1 = a + b + c = 0$, $e_2 = ab + bc + ca$, and $e_3 = abc$.

Squaring $a + b + c = 0$ gives $a^2 + b^2 + c^2 + 2e_2 = 0$, which is the square identity. For cubes, the factorization $$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$$ has a first factor of $0$, so $a^3 + b^3 + c^3 = 3abc$.

Higher powers come from Newton's Sums. Each of $a$, $b$, $c$ is a root of $t^3 + e_2t - e_3$, so $t^3 = -e_2t + e_3$; multiplying by $t^{k-3}$ and adding over the three roots gives $$p_k = -e_2\,p_{k-2} + e_3\,p_{k-3},$$ where $p_k = a^k + b^k + c^k$. Starting from $p_0 = 3$, $p_1 = 0$, and $p_2 = -2e_2$, it produces $p_4 = 2e_2^2$, $p_5 = -5e_2e_3$, and $p_7 = 7e_2^2e_3$.

## Useful observations
- The zero sum is often hidden. The roots of a cubic with no $x^2$ term sum to $0$ by [[vietas-general|Vieta's Formulas]], and the differences of any three numbers always sum to $0$, so for all $a$, $b$, $c$, $$(a - b)^3 + (b - c)^3 + (c - a)^3 = 3(a - b)(b - c)(c - a).$$
- A shift creates one too: if $x + y + z = 3m$, then $x - m$, $y - m$, and $z - m$ sum to $0$.

## Applications
Cubic equations with no $x^2$ term, sums of cubes and higher powers of three quantities, factoring differences, and ratios of power sums.

## Contest profile
Three problems here, all AIME, none solved by it alone. The usual trigger is a cubic with no $x^2$ term, whose roots sum to $0$, so sums like $(r + s)^3 + (s + t)^3 + (t + r)^3$ collapse to $-3rst$. Others create the zero sum by shifting all three variables by their average, or force it from a symmetry of the problem.
`,

"reciprocal-power-sums": String.raw`
## Key forms
- $s_n = t\,s_{n-1} - s_{n-2}$ with $s_0 = 2$ and $s_1 = t$, where $t = x + \frac1x$ and $s_n = x^n + \frac1{x^n}$ — the recurrence that generates every power at once
- $s_2 = t^2 - 2$, $s_3 = t^3 - 3t$, $s_4 = t^4 - 4t^2 + 2$ — the first few, worth having ready
- $s_n = 2\cos n\theta$ when $x = e^{i\theta}$ — on the unit circle these are the [[chebyshev-polynomials|Chebyshev polynomials]], which is why the recurrence looks like theirs

## Conditions
$x \ne 0$. The same recurrence holds for $a^n + b^n$ whenever $ab = 1$, with $t = a + b$.

## Why it works
Multiply $s_{n-1} = x^{n-1} + x^{-(n-1)}$ by $t = x + x^{-1}$: the cross terms give $x^n + x^{-n} + x^{n-2} + x^{-(n-2)} = s_n + s_{n-2}$, so $s_n = t\,s_{n-1} - s_{n-2}$. The same computation works for $a$ and $b$ with $ab = 1$, since only $ab = 1$ was used.

Starting from $s_0 = 2$ and $s_1 = t$, this produces each $s_n$ as a degree-$n$ polynomial in $t$, the Chebyshev and Dickson polynomials:
$$s_2 = t^2 - 2, \qquad s_3 = t(t^2 - 2) - t = t^3 - 3t, \qquad s_4 = t(t^3 - 3t) - (t^2 - 2) = t^4 - 4t^2 + 2.$$
With $x = e^{i\theta}$, $x^n + x^{-n} = 2\cos n\theta$ by [[de-moivre|De Moivre's Theorem]].

## Useful observations
- Given $x + \frac1x$, any $x^n + \frac1{x^n}$ is reached with the two-term recurrence, with no need to solve for $x$.
- The same machine handles $a^n + b^n$ whenever $ab = 1$, and $2\cos n\theta$ from $2\cos\theta$.
- The recurrence is faster and safer than repeated squaring and cubing.

## Applications
"Given $x + \frac1x = k$, find $x^n + \frac1{x^n}$" and its reverse, and the link to $\cos n\theta$.

## Contest profile
A frequent AMC and AIME setup, and it exposes the tie to $\cos n\theta$ that some problems turn on.
`,

"factorial-telescoping": String.raw`
## Key forms
- $k \cdot k! = (k + 1)! - k!$, so $\alt{\sum_{k=1}^{n}k \cdot k!}{1\cdot1! + 2\cdot2! + \cdots + n\cdot n!} = (n + 1)! - 1$
- $\dfrac{k}{(k+1)!} = \dfrac1{k!} - \dfrac1{(k+1)!}$, so $\alt{\sum_{k=1}^{n}\dfrac{k}{(k+1)!}}{\dfrac{1}{2!} + \dfrac{2}{3!} + \cdots + \dfrac{n}{(n+1)!}} = 1 - \dfrac1{(n+1)!}$
- $\dfrac{k - 1}{k!} = \dfrac{1}{(k-1)!} - \dfrac{1}{k!}$ — the other shape that telescopes

## Conditions
The terms must be rewritten as a difference of consecutive factorial expressions; the sum then collapses to its two ends. The index range decides the boundary terms.

## Why it works
$k \cdot k! = (k + 1)! - k!$ is just $(k + 1)! = (k + 1) \cdot k!$ rearranged; summing telescopes to $(n + 1)! - 1!$.

The fraction version rewrites $\frac{k}{(k+1)!} = \frac{(k + 1) - 1}{(k + 1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$, and in the same way $\frac{k - 1}{k!} = \frac{k}{k!} - \frac1{k!} = \frac1{(k - 1)!} - \frac1{k!}$.

For base factorial, digits $d_k \le k$ give $\sum_{k \le n} d_k \cdot k! \le \sum_{k \le n} k \cdot k! = (n + 1)! - 1$, which is less than the next place value. So the top digit of a number is forced, and by induction all of them are.

## Useful observations
- A sum with $k \cdot k!$, $\frac{k}{(k+1)!}$, or $\frac{k-1}{k!}$ terms telescopes immediately.
- The identity $\frac{1}{k!} - \frac{1}{(k+1)!} = \frac{k}{(k+1)!}$ read backwards is the same fact, and for alternating factorial sums, consecutive terms are paired.
- It is also the reason base-factorial representations are unique: the digits $d_k \le k$ in $\sum d_k \cdot k!$ stay below the next factorial.

## Applications
Sums with $k \cdot k!$ and $\frac{k}{(k+1)!}$ terms, and factorial-base digit questions.

## Contest profile
MATHCOUNTS through AIME: sums of a factorial times its index, often taken modulo a number, and factorial-base digit questions. Recognizing the telescope converts an intimidating factorial sum into two terms.
`

});

Object.assign(window.MATH_DETAILS, {

"jensens-inequality": String.raw`
## Key forms
- $f$ convex $\implies f\!\left(\dfrac{x_1 + \cdots + x_n}{n}\right) \le \dfrac{f(x_1) + \cdots + f(x_n)}{n}$ — the value at the average is at most the average of the values
- $f$ concave $\implies$ the inequality reverses
- $\alt{f\Big(\sum\lambda_ix_i\Big) \le \sum\lambda_if(x_i)}{f(\lambda_1x_1 + \cdots + \lambda_nx_n) \le \lambda_1f(x_1) + \cdots + \lambda_nf(x_n)}$ with nonnegative weights $\lambda_i$ that add to $1$ — the weighted version
- AM-GM is Jensen applied to the concave $\ln x$

## Conditions
The function is convex or concave on an interval containing every $x_i$; for twice-differentiable $f$, convex means $f'' \ge 0$ and concave means $f'' \le 0$. Equality needs all the $x_i$ equal unless $f$ is linear on the relevant stretch.

## Why it works
Convexity means every chord lies above the graph: $f(\lambda x + (1 - \lambda)y) \le \lambda f(x) + (1 - \lambda)f(y)$ for $0 \le \lambda \le 1$. That is the weighted statement for two points.

Step 1, induction on $n$. Given weights $\lambda_1, \ldots, \lambda_n$ with $\lambda_n \lt 1$, put $y = \sum_{i \lt n}\frac{\lambda_i}{1 - \lambda_n}x_i$, an average of $n - 1$ points. Then
$$f\Big(\sum\lambda_ix_i\Big) = f\big(\lambda_nx_n + (1 - \lambda_n)y\big) \le \lambda_nf(x_n) + (1 - \lambda_n)f(y),$$
and the induction hypothesis bounds $f(y)$ by $\sum_{i \lt n}\frac{\lambda_i}{1 - \lambda_n}f(x_i)$. Equal weights $\frac1n$ give the first Key form, and $-f$ gives the concave one.

Step 2, the derivative test. If $f'' \ge 0$, then $f'$ is increasing, so for $x \lt z \lt y$ the mean value theorem makes the slope of the chord from $x$ to $z$ at most the slope from $z$ to $y$; that is the chord inequality at $z$. Strict convexity makes it strict unless the points coincide, which is the equality case.

The specializations are this applied once. Jensen for the concave $\ln$ says the log of the mean is at least the mean of the logs, which is AM-GM. For the convex $\frac1x$ it says $\frac1{\text{AM}}$ is at most the mean of the reciprocals, which is AM-HM.

## Useful observations
- Convexity is checked with the second derivative: $f'' \ge 0$ convex (inequality as stated), $f'' \le 0$ concave (flip it).
- The classical specializations are worth knowing cold: $\ln$ concave gives AM-GM; $x^2$ convex gives the QM-AM step; $\frac1x$ convex on $(0, \infty)$ gives AM-HM; $\sin$ concave on $(0, \pi)$ bounds angle sums; $\tan$ convex on $\left(0, \frac\pi2\right)$ bounds the tangents of the angles of an acute triangle.
- When the constraint fixes $x_1 + \cdots + x_n$, Jensen immediately locates the extremum at "all equal"; if the extremum is instead at an endpoint, that signals the function is convex or concave the other way.

## Applications
Maximizing or minimizing a symmetric sum of function values with a fixed sum of inputs, trigonometric sums over triangle angles, and the derivation of the classical mean inequalities.

## Contest profile
The fastest tool for "maximize a symmetric sum of function values with a fixed sum of inputs," and trigonometric sums over triangle angles are the archetype. On the AMC and AIME it usually appears disguised, and recognizing the equality-at-the-mean structure lets one guess the extremal configuration, all variables equal, and verify. Full Jensen citations are an olympiad staple, often with weights equal to side lengths or masses.
`,

"nesbitt-inequality": String.raw`
## Key forms
- $\frac{a}{b + c} + \frac{b}{c + a} + \frac{c}{a + b} \ge \frac32$ for $a, b, c \gt 0$, with equality exactly when $a = b = c$
- no upper bound for positive reals: $a \to \infty$ with $b$, $c$ fixed sends the sum to infinity
- for the sides of a triangle, $\frac32 \le \frac{a}{b + c} + \frac{b}{c + a} + \frac{c}{a + b} \lt 2$
- in $n$ variables with $S = a_1 + \cdots + a_n$: $\alt{\sum_i \frac{a_i}{S - a_i}}{\frac{a_1}{S - a_1} + \cdots + \frac{a_n}{S - a_n}} \ge \frac{n}{n - 1}$

## Conditions
All three numbers are positive; one of them may be $0$ as long as no denominator vanishes. With negative values the inequality fails: $a = b = 1$, $c = -\frac32$ gives $-2 - 2 - \frac34 \lt \frac32$. The triangle upper bound needs the strict triangle inequalities.

## Why it works
Proof 1, by AM–HM. Add $1$ to each fraction: $\frac{a}{b + c} + 1 = \frac{a + b + c}{b + c}$. With $x = b + c$, $y = c + a$, $z = a + b$, whose sum is $2(a + b + c)$,

$$\sum \frac{a}{b + c} + 3 = \frac{x + y + z}{2}\left(\frac1x + \frac1y + \frac1z\right) \ge \frac92,$$

because $(x + y + z)\left(\frac1x + \frac1y + \frac1z\right) \ge 9$ by AM–GM applied to each factor. So the sum is at least $\frac92 - 3 = \frac32$, with equality when $x = y = z$, that is, $a = b = c$.

Proof 2, by Titu's lemma. Write each term as $\frac{a^2}{a(b + c)}$. The Engel form of Cauchy–Schwarz gives

$$\sum \frac{a^2}{a(b + c)} \ge \frac{(a + b + c)^2}{2(ab + bc + ca)} \ge \frac32,$$

the last step because $(a + b + c)^2 - 3(ab + bc + ca) = \frac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right] \ge 0$.

Proof 3, by rearrangement. Let $a \ge b \ge c$. Then $b + c \le c + a \le a + b$, so $(a, b, c)$ and $\left(\frac1{b + c}, \frac1{c + a}, \frac1{a + b}\right)$ are ordered the same way, and the Rearrangement Inequality puts the given sum above the sums with the numerators shifted by one place and by two places:

$$2\sum \frac{a}{b + c} \ge \frac{b + c}{b + c} + \frac{c + a}{c + a} + \frac{a + b}{a + b} = 3.$$

The upper bound for a triangle. $a \lt b + c$ is the same as $a + b + c \lt 2(b + c)$, so $\frac{a}{b + c} \lt \frac{2a}{a + b + c}$. Adding the three gives a sum below $2$; a nearly flat triangle with $a = b$ and $c$ close to $0$ comes as close to $2$ as desired.

The $n$-variable form. $f(x) = \frac{x}{S - x}$ is convex on $(0, S)$, so by Jensen's Inequality the sum is at least $n\,f\!\left(\frac Sn\right) = \frac{n}{n - 1}$. The three-variable case of this argument is the worked example on [[homogenization|Homogenization]].

## Useful observations
- The inequality is homogeneous of degree $0$, so a constraint such as $a + b + c = 1$ or $a + b + c = 3$ can be added or dropped freely.
- Substituting $a = y + z$, $b = z + x$, $c = x + y$ for triangle sides (the Ravi substitution) turns the upper bound into a statement about positive $x$, $y$, $z$.
- The cyclic generalization $\sum \frac{x_i}{x_{i+1} + x_{i+2}} \ge \frac n2$, Shapiro's inequality, holds for even $n \le 12$ and odd $n \le 23$ and fails for larger $n$, so the pattern does not extend for free.

## Applications
Lower bounds for symmetric sums of fractions, minimizing $\sum \frac{x}{S - x}$ under a fixed sum, and bounding ratio sums of a triangle's sides.

## Contest profile
A named inequality that is quoted directly in olympiad solutions and appears on hard AIME problems in disguise, usually as a sum of fractions with a fixed total. Its three short proofs make it the standard test case for AM–GM, Cauchy–Schwarz, and rearrangement.
`,

"schurs-inequality": String.raw`
## Key forms
- $x^t(x - y)(x - z) + y^t(y - x)(y - z) + z^t(z - x)(z - y) \ge 0$ for $x, y, z \ge 0$ and $t \gt 0$
- $x^3 + y^3 + z^3 + 3xyz \ge xy(x + y) + yz(y + z) + zx(z + x)$ — the $t = 1$ case, the classic degree-$3$ symmetric inequality
- $s^3 + 9r \ge 4sq$ — the $t = 1$ case in $s = x + y + z$, $q = xy + yz + zx$, $r = xyz$
- equality when $x = y = z$, or when two are equal and the third is $0$

## Conditions
The variables are nonnegative. The $t = 2$ case gives the degree-$4$ version.

## Why it works
By symmetry assume $x \ge y \ge z$. Group the three terms as
$$(x - y)\big(x^t(x - z) - y^t(y - z)\big) + z^t(x - z)(y - z).$$
Here $x^t \ge y^t$ and $x - z \ge y - z \ge 0$, so the bracket is nonnegative, and every other factor is nonnegative under the ordering, so the whole sum is. This ordering-and-grouping argument is the entire proof, with no expansion needed. Equality needs both products to vanish: $x = y = z$, or $x = y$ with $z = 0$.

For $t = 1$, expanding $\sum x(x - y)(x - z)$ gives $\sum x^3 - \sum_{\text{sym}}x^2y + 3xyz$, the second Key form. In $s$, $q$, $r$, $\sum x^3 = s^3 - 3sq + 3r$ and $\sum_{\text{sym}}x^2y = sq - 3r$, so the inequality reads $s^3 - 3sq + 6r \ge sq - 3r$, which is $s^3 + 9r \ge 4sq$.

## Useful observations
- The $t = 1$ expansion is used when a symmetric degree-$3$ inequality has the "wrong direction" for AM-GM: the $+3xyz$ on the small side is Schur's signature, and no bunching argument produces it, since [[muirheads-inequality|Muirhead's Inequality]] can never yield it.
- The form in $s$, $q$, $r$ combines cleanly with $q^2 \ge 3sr$ and similar relations.
- The equality cases, $x = y = z$ and the degenerate $(k, k, 0)$, are the tell that Schur, not Muirhead, is intended.

## Applications
Symmetric three-variable inequalities that resist AM-GM and Cauchy-Schwarz.

## Contest profile
An olympiad tool: it settles many symmetric three-variable inequalities that resist AM-GM and Cauchy-Schwarz.
`,

"muirheads-inequality": String.raw`
## Key forms
- $(a_1, a_2, a_3) \succ (b_1, b_2, b_3) \implies \alt{\sum_{\text{sym}}x^{a_1}y^{a_2}z^{a_3} \ge \sum_{\text{sym}}x^{b_1}y^{b_2}z^{b_3}}{x^{a_1}y^{a_2}z^{a_3} + x^{a_1}y^{a_3}z^{a_2} + \cdots \ge x^{b_1}y^{b_2}z^{b_3} + x^{b_1}y^{b_3}z^{b_2} + \cdots}$ — for positive reals, where $\succ$ is majorization
- majorization means, with both triples sorted decreasing, $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, and equal total sums
- "more spread-out exponents win" — the rigorous version of bunching

## Conditions
The sums are full symmetric sums, over all $3! = 6$ permutations, and both sides are homogeneous of the same degree. Cyclic sums are not covered.

## Why it works
Majorization means the exponent vector $a$ can be reached from $b$ by repeatedly moving two exponents apart: $(b_i, b_j) \to (b_i + \epsilon, b_j - \epsilon)$ with $b_i \ge b_j$. Each such move is a two-variable AM-GM-style smoothing step on the symmetric sum, so the more spread-out exponent triple dominates. In fact every Muirhead inequality is a positive combination of weighted AM-GMs.

## Useful observations
- Both exponent triples are sorted in decreasing order and the partial sums checked; if all hold, the symmetric sum of the $a$-monomial dominates.
- Two standing warnings: it applies only to full symmetric sums, so cyclic sums are converted first with the factor of $2$ watched, and both sides must be homogeneous of the same degree, so a constraint like $xyz = 1$ is used to homogenize.
- Majorization is the idea behind [[karamata-inequality|Karamata's Inequality]].

## Applications
Bunching steps in olympiad inequalities, and comparisons of symmetric sums of monomials.

## Contest profile
The rigorous stamp for "bunching" steps in olympiad solutions: a chain of majorizations handles most degree-3 comparisons in one line. Below the olympiad level, writing out the two or three AM-GMs it encodes is safer and just as fast. It pairs constantly with [[schurs-inequality|Schur's Inequality]], which covers exactly the direction Muirhead cannot.
`,

"maclaurin-inequality": String.raw`
## Key forms
- for nonnegative reals with $p_k = \dfrac{e_k}{\binom nk}$ the averaged elementary symmetric polynomials, $p_1 \ge \sqrt{p_2} \ge \sqrt[3]{p_3} \ge \cdots \ge \sqrt[n]{p_n}$ (Maclaurin)
- $p_k^2 \ge p_{k-1}p_{k+1}$ (Newton), the log-concavity of the $p_k$
- the two ends are the AM and the GM, so the chain refines AM–GM; equality throughout exactly when all the $x_i$ are equal

## Conditions
The $x_i$ are nonnegative reals. Newton's inequality holds for all real $x_i$.

## Why it works
The engine is Newton's inequality. It comes from the fact that $\prod_i(t + x_i)$ has only real roots, and so do its derivatives (Rolle), and a real-rooted quadratic slice forces $p_k^2 \ge p_{k-1}p_{k+1}$.

Chaining the log-concavity and taking $k$th roots gives Maclaurin's descending chain.

## Useful observations
- The middle links give sharper bounds than AM–GM when several elementary symmetric quantities appear together.
- One link, such as $p_1 \ge \sqrt{p_2}$ or $\sqrt{p_2} \ge \sqrt[3]{p_3}$, relates $\sum x_i$, $\sum x_ix_j$, and $\prod x_i$ more tightly.
- Newton's inequality also says the coefficients of a real-rooted polynomial are log-concave, hence unimodal.

## Applications
Symmetric inequalities in the elementary symmetric polynomials, and refinements of AM–GM.

## Contest profile
An olympiad-level refinement, rarely needed over AM–GM or Cauchy–Schwarz, but decisive on symmetric inequalities those cannot tighten.
`

});

Object.assign(window.MATH_DETAILS, {

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
Regions and curves in the plane defined by absolute values: $|x| + |y| \le c$, $\max(|x|, |y|) = c$, $|x - 3| + |y + 1| = 4$, nested forms such as $\bigl||x| - 1\bigr| + \bigl||y| - 1\bigr| = 1$, and mixed terms such as $|x - y|$. Typical questions ask for an area, a perimeter, the number of lattice points, or the number of intersection points with another curve. An absolute value in one variable alone, such as $|x - 2| < 3$, is an interval on the number line and needs none of this.

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

"absolute-value-identities": String.raw`
## Key forms
- $\lvert ab\rvert = \lvert a\rvert\lvert b\rvert$, $\left\lvert\dfrac ab\right\rvert = \dfrac{\lvert a\rvert}{\lvert b\rvert}$, and $\lvert a^n\rvert = \lvert a\rvert^n$ — absolute value is multiplicative
- $\lvert ax + b\rvert = \lvert a\rvert\left\lvert x + \dfrac ba\right\rvert$ — the factoring move, and the one worth drilling
- $\lvert a\rvert^2 = a^2$ and $\sqrt{a^2} = \lvert a\rvert$ — the pair that lets bars be squared away and brought back
- $\lvert -a\rvert = \lvert a\rvert$, $\lvert a - b\rvert = \lvert b - a\rvert$, and $\lvert a + b\rvert$ obeys no identity, only the triangle inequality

## Conditions
The factor outside is $\lvert a\rvert$, never $a$: with $a = -2$ the identity gives $2\lvert x - 2\rvert$, and dropping the bars would make a nonnegative expression negative. Absolute value does not pass through sums.

## Why it works
Every one of these follows from $\lvert t\rvert = \pm t$ by checking signs, but the shorter reason is that $\lvert t\rvert$ is the distance from $t$ to $0$, and scaling a number by $a$ scales its distance from $0$ by $\lvert a\rvert$. Multiplication stretches the number line, so absolute value passes through it; addition slides one point relative to another, so it does not, and the most that survives is $\lvert a + b\rvert \le \lvert a\rvert + \lvert b\rvert$.

The factoring identity is the multiplicative rule read backwards. Since $ax + b = a\left(x + \frac ba\right)$, taking absolute values gives $\lvert a\rvert\left\lvert x + \frac ba\right\rvert$ directly.

## Useful observations
- Any linear expression inside bars becomes a distance, which is the form every absolute-value equation and inequality wants to be in: $\lvert 3x - 12\rvert = 3\lvert x - 4\rvert$, so $\lvert 3x - 12\rvert \lt 6$ is "within $2$ of $4$", giving $2 \lt x \lt 6$ with no casework.
- Squaring is the other reliable move, since $\lvert a\rvert = \lvert b\rvert$ and $a^2 = b^2$ say the same thing, which clears bars from both sides of an equation at once.

## Applications
Absolute-value equations and inequalities, distances on the number line, and simplifying $\sqrt{a^2}$.

## Contest profile
Most often a setup step rather than the answer: pulling the coefficient out converts a messy $\lvert ax + b\rvert$ into a distance and the problem becomes a picture on the number line. Nested bars are the AMC version, and they unfold from the inside using these same rules; see [[abs-value-graphing|graphing nested absolute values]] when the count of solutions is what is wanted.
`,

"absolute-value-rules": String.raw`
## Key forms
- $|x - c| \lt d \iff c - d \lt x \lt c + d$ — within distance $d$ of $c$
- $|x - c| \gt d \iff x \lt c - d$ or $x \gt c + d$ — farther than $d$ from $c$, two rays
- $|x - c| = d \iff x = c \pm d$ — exactly distance $d$, two points
- $|xy| = |x||y|$, and $|x| = |y| \iff x = \pm y$
- $\sqrt{x^2} = |x|$ — not $x$, since the square root symbol means the nonnegative root
- $|x + y| \le |x| + |y|$ — the triangle inequality, with equality when $x$ and $y$ have the same sign

## Conditions
The inequalities with $d \lt 0$ are either empty or everything, so $d$ is taken positive. Squaring both sides of an equation preserves $|x| = |y|$ but needs care for inequalities that mix signs.

## Why it works
Distance from $c$ is the same in both directions, which is why every absolute value condition is symmetric about $c$.

$|x - c| \lt d$ says $x$ is less than $d$ away from $c$, so it lies strictly between $c - d$ and $c + d$. $|x - c| \gt d$ says it is more than $d$ away, so it lies beyond one end or the other. And $\sqrt{x^2} = |x|$ because the square root symbol means the nonnegative root, while $x$ itself may be negative.

{{figure:number-line}}

## Useful observations
- Each absolute value is turned into a distance or into two cases. To solve $|2x - 1| \lt 5$, divide by $2$ to get $\left|x - \frac12\right| \lt \frac52$: $x$ is within $\frac52$ of $\frac12$, so $-2 \lt x \lt 3$. For an equation $|A| = |B|$, the two equations $A = B$ and $A = -B$ are solved separately.
- A sum of distances reads off the number line: $|x - a| + |x - b|$ is smallest, equal to $|a - b|$, for $x$ between $a$ and $b$, and grows by $2$ for every unit outside.
- The usual trap is a forgotten branch: $|x| \gt a$ has two rays, and $\sqrt{x^2}$ carries a sign.
- Nested absolute values are peeled from the outside by cases, or graphed and counted, as in [[piecewise-graph-counting|counting solutions by graphing]]; with two variables, [[abs-value-relations|absolute value relations]] are graphed by symmetry.

## Applications
Inequalities with absolute values, distances on a number line, piecewise equations, and the simplification of $\sqrt{x^2}$.

## Contest profile
Five problems here, mostly AMC, two solved by it alone; two others move on to regions in the plane. Distance readings, sums of distances, and piecewise equations are the common forms on MATHCOUNTS and early AMC.
`,

"median-minimizes-abs": String.raw`
## When to use
The quantity to minimize is a sum of absolute differences from a single unknown, possibly weighted: total walking distance to several houses on a street, or $\sum |x - a_i| + \sum |y - b_i|$, which splits into one such problem per coordinate. A sum of squared differences is minimized at the mean instead.

## How
1. Sort the points, listing each as many times as its weight.
2. Pair the smallest with the largest, the second smallest with the second largest, and so on.
3. Each pair $a \le b$ contributes $|x - a| + |x - b| \ge b - a$, with equality exactly when $a \le x \le b$.
4. The pairs' intervals nest, so the median, or any point between the two middle points, makes every pair an equality.
5. The minimum is the sum of the pair widths.

For $|x - 1| + |x - 4| + |x - 6| + |x - 11|$ the pairs are $(1, 11)$ and $(4, 6)$, so the minimum is $10 + 2 = 12$, reached for every $x$ from $4$ to $6$.

## Why it works
For one pair, $|x - a| + |x - b|$ is the distance from $x$ to $a$ plus the distance to $b$, which is at least $b - a$ and equals it exactly on the segment between them. Adding over the pairs bounds the whole sum below by the total of the widths, and a point in the innermost interval lies in every interval, so it attains the bound. With an odd count the middle point pairs with nothing and contributes $0$ when $x$ sits on it.

## Formulas it uses
- [[abs-triangle-inequality]]: $|x - a| + |x - b| \ge |a - b|$, with equality exactly for $x$ between $a$ and $b$, the bound for each pair.
- [[absolute-value-rules]]: $|x - a|$ is the distance from $x$ to $a$ on the number line.

## Common traps
- Using the mean, which minimizes squared distances.
- Ignoring weights: $3|x - 4|$ lists the point $4$ three times.
- With an even count, giving one minimizer when a whole interval works.

## Contest profile
An AMC 10 and AMC 12 question, often a placement on a line, and an occasional AIME step inside a taxicab-distance problem.
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
The constraint $\sum x_i = s$ makes any linear function of the $x_i$ sum to a constant. So if each term $f(x_i)$ is at least $L(x_i)$, the sum is at least $\sum L(x_i)$, which depends only on $s$. Taking the tangent at the equality point makes the bound sharp, since $L(t) = f(t)$ and equality is preserved.

For convex $f$ this is Jensen's Inequality, since a convex function lies above all its tangents. The trick is more flexible: the bound $f(x) \ge L(x)$ only has to hold on the allowed range, and the factored form $(x - t)^2 g(x)$ shows exactly where it holds.

## Formulas it uses
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

"holders-inequality": String.raw`
## Key forms
- $\alt{\Big(\sum a_i^p\Big)^{1/p}\Big(\sum b_i^q\Big)^{1/q} \ge \sum a_ib_i}{(a_1^p + \cdots + a_n^p)^{1/p}(b_1^q + \cdots + b_n^q)^{1/q} \ge a_1b_1 + \cdots + a_nb_n}$ with $\frac1p + \frac1q = 1$ — Cauchy-Schwarz is the case $p = q = 2$
- $\alt{\Big(\sum a_i\Big)\Big(\sum b_i\Big)\Big(\sum c_i\Big) \ge \Big(\sum\sqrt[3]{a_ib_ic_i}\Big)^3}{(a_1 + \cdots + a_n)(b_1 + \cdots + b_n)(c_1 + \cdots + c_n) \ge \left(\sqrt[3]{a_1b_1c_1} + \cdots + \sqrt[3]{a_nb_nc_n}\right)^3}$ — the three-sequence form, and its $k$-sequence generalization
- equality when the sequences are proportional

## Conditions
The terms are positive and $p, q \gt 1$ are conjugate exponents. The $k$-sequence form uses weights adding to $1$.

## Why it works
Hölder is $\ell^p$–$\ell^q$ duality. With $\frac1p + \frac1q = 1$, [[weighted-am-gm|weighted AM–GM]] is applied termwise to $\frac{a_i^p}{\sum a^p}$ and $\frac{b_i^q}{\sum b^q}$ and the results summed: the total is $1$, which rearranges to $\sum a_ib_i \le (\sum a^p)^{1/p}(\sum b^q)^{1/q}$.

The three-sequence form is the same statement with exponents $\frac13 + \frac13 + \frac13 = 1$. Any number of sequences works the same way, with weights $\lambda_j \ge 0$ summing to $1$, which is the form for when the exponents in a problem are not all equal.

## Useful observations
- It is the signature move on cyclic sums: the sequences and exponents are chosen so that the right-hand cube, or $k$th power, is exactly the quantity wanted and the left factors are computable.
- To bound $\sum\frac{a}{b + c}$ below, it is paired with two copies of $\sum a(b + c)$, giving $\left(\sum\frac{a}{b + c}\right)\left(\sum a(b + c)\right)^2 \ge (a + b + c)^3$, and then the denominator is bounded.
- Anywhere Cauchy-Schwarz almost works but leaves an exponent short, Hölder finishes.

## Applications
Cyclic fraction inequalities and sums such as $\sum\frac{a^k}{\cdots}$, and bounds with an exponent that Cauchy-Schwarz leaves short.

## Contest profile
Olympiad inequalities, cyclic fractions above all. Rarely needed below olympiad level. The equality case, proportional sequences, is tracked to know whether a bound is tight.
`,

"chebyshev-sum-inequality": String.raw`
## Key forms
- for $a_1 \le \cdots \le a_n$ and $b_1 \le \cdots \le b_n$: $\alt{n\sum_{i=1}^{n}a_ib_i \ge \left(\sum a_i\right)\left(\sum b_i\right)}{n(a_1b_1 + \cdots + a_nb_n) \ge (a_1 + \cdots + a_n)(b_1 + \cdots + b_n)}$
- sorted in opposite orders, the inequality reverses
- the average of the products is at least the product of the averages, for similarly sorted sequences

## Conditions
Both sequences are sorted, in the same direction for $\ge$ and in opposite directions for $\le$. The direction depends entirely on the sorting.

## Why it works
Sum the $n^2$ products $(a_i - a_j)(b_i - b_j)$, each nonnegative when the sequences are sorted the same way. Expanding gives $n\sum a_ib_i - (\sum a_i)(\sum b_j) \ge 0$. Opposite ordering makes every factor flip sign, reversing the inequality.

## Useful observations
- It is the averaged cousin of the Rearrangement Inequality.
- Taking $b = a$ gives $\sum a_i^2 \ge \frac1n(\sum a_i)^2$, a power-mean bound.
- More generally it bounds $\sum a_if(a_i)$ for a monotone $f$.

## Applications
Sums that pair two quantities rising and falling together, and inequalities between averages of products.

## Contest profile
An olympiad tool and a clean lemma inside longer inequality chains.
`,

"minkowski-inequality": String.raw`
## Key forms
- $\alt{\Big(\sum\lvert a_i + b_i\rvert^p\Big)^{1/p} \le \Big(\sum\lvert a_i\rvert^p\Big)^{1/p} + \Big(\sum\lvert b_i\rvert^p\Big)^{1/p}}{(\lvert a_1 + b_1\rvert^p + \cdots)^{1/p} \le (\lvert a_1\rvert^p + \cdots)^{1/p} + (\lvert b_1\rvert^p + \cdots)^{1/p}}$ for $p \ge 1$ — the triangle inequality for the $p$-norm
- $\sqrt{a^2 + b^2} + \sqrt{c^2 + d^2} \ge \sqrt{(a + c)^2 + (b + d)^2}$ — the case $p = 2$, which is $\lvert\vec u\rvert + \lvert\vec v\rvert \ge \lvert\vec u + \vec v\rvert$
- a sum $\alt{\sum\sqrt{x_i^2 + y_i^2}}{\sqrt{x_1^2 + y_1^2} + \sqrt{x_2^2 + y_2^2} + \cdots}$ is least when the little vectors are parallel, and then equals $\sqrt{(x_1 + x_2 + \cdots)^2 + (y_1 + y_2 + \cdots)^2}$

## Conditions
$p \ge 1$. Equality needs all the vectors to point the same way, that is, to be nonnegative multiples of one another.

## Why it works
It is the triangle inequality for the norm $\lVert x\rVert_p = (\sum\lvert x_i\rvert^p)^{1/p}$. For $p = 2$, expand: $\lvert\vec u + \vec v\rvert^2 = \lvert\vec u\rvert^2 + 2\,\vec u \cdot \vec v + \lvert\vec v\rvert^2 \le \lvert\vec u\rvert^2 + 2\lvert\vec u\rvert\lvert\vec v\rvert + \lvert\vec v\rvert^2 = (\lvert\vec u\rvert + \lvert\vec v\rvert)^2$, by Cauchy–Schwarz $\vec u \cdot \vec v \le \lvert\vec u\rvert\lvert\vec v\rvert$. Taking square roots gives the claim.

The general case follows from [[holders-inequality|Hölder's Inequality]]: writing $\sum\lvert a_i + b_i\rvert^p \le \sum\lvert a_i\rvert\lvert a_i + b_i\rvert^{p-1} + \sum\lvert b_i\rvert\lvert a_i + b_i\rvert^{p-1}$ and applying Hölder to each sum with exponents $p$ and $\frac{p}{p-1}$ bounds each by the norm of $a$ (or $b$) times $\left(\sum\lvert a_i + b_i\rvert^p\right)^{(p-1)/p}$; dividing by that factor gives the result.

## Useful observations
- A sum of square-root terms is read as a sum of vector lengths and the vectors are added tip to tail.
- To minimize $\sum\sqrt{x_i^2 + y_i^2}$ with $\sum x_i$ and $\sum y_i$ fixed, the minimum is attained when the little vectors are parallel, the algebraic version of reflecting to straighten a path.
- It is also the standard proof that coordinate distance satisfies the triangle inequality.

## Applications
Minimizing a sum of hypotenuses, shortest-path problems solved without reflection, and norm inequalities.

## Contest profile
The exponent-two form is an AIME-level "minimize a sum of hypotenuses" trick wherever reflection and shortest paths appear; the general statement is olympiad.
`,

"karamata-inequality": String.raw`
## Key forms
- if $x_1 \ge \cdots \ge x_n$ and $y_1 \ge \cdots \ge y_n$ have equal sums and every prefix sum of $x$ is at least that of $y$ (the sequence $x$ majorizes $y$), then $\alt{\sum f(x_i) \ge \sum f(y_i)}{f(x_1) + \cdots + f(x_n) \ge f(y_1) + \cdots + f(y_n)}$ for convex $f$
- for concave $f$ the inequality reverses
- Jensen's Inequality is the case where every $y_i$ equals the common mean

## Conditions
Both sequences are sorted in decreasing order, with equal totals, and $f$ is convex (or concave) on an interval containing all the values.

## Why it works
Each value of a convex $f$ lies above its tangent line. Combining the tangent-line comparisons by summation by parts with the majorization prefix-sum inequalities gives $\sum f(x_i) \ge \sum f(y_i)$. Convexity is what makes the tangent slopes line up with the partial sums.

## Useful observations
- Establishing majorization is the real work; the inequality is then automatic.
- It is useful when the extremum sits at an unequal, boundary configuration, where Jensen alone cannot reach.
- A pair such as $(a + b, 0)$ majorizing $(a, b)$ is the basis of smoothing arguments.
- AM–GM and power-mean bounds, and many symmetric-sum bounds, drop out as corollaries.

## Applications
Symmetric inequalities with convex or concave summands, and extremal bounds at boundary configurations.

## Contest profile
Olympiad inequalities, especially symmetric ones whose extremum is at a boundary rather than the center.
`,

"generalized-binomial-series": String.raw`
## Key forms
- $\alt{(1 + x)^{\alpha} = \sum_{n \ge 0}\dbinom{\alpha}{n}x^n}{1 + \alpha x + \dbinom\alpha2x^2 + \dbinom\alpha3x^3 + \cdots}$ for $\lvert x\rvert \lt 1$, with $\dbinom{\alpha}{n} = \dfrac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!}$ — Newton's Binomial Theorem for any real exponent
- $\alt{\dfrac{1}{(1 - x)^{k}} = \sum_{n \ge 0}\dbinom{n + k - 1}{k - 1}x^n}{1 + kx + \dbinom{k+1}{2}x^2 + \cdots}$ — the case $\alpha = -k$
- $\alt{\dfrac{1}{1 - x} = \sum x^n}{\dfrac1{1 - x} = 1 + x + x^2 + \cdots}$ and $\alt{\dfrac{1}{(1 - x)^2} = \sum (n + 1)x^n}{\dfrac{1}{(1-x)^2} = 1 + 2x + 3x^2 + \cdots}$ — the two to know cold
- $\sqrt{1 + x} = 1 + \dfrac x2 - \dfrac{x^2}{8} + \dfrac{x^3}{16} - \cdots$ — the fractional case

## Conditions
The numerical series converges for $\lvert x\rvert \lt 1$. For formal coefficient extraction in a generating function, convergence never matters.

## Why it works
Let $f(x) = \sum_n \binom\alpha n x^n$. The ratio of consecutive coefficients is $\frac{\alpha - n}{n + 1}$, which tends to $-1$, so the series converges for $\lvert x\rvert \lt 1$. Comparing coefficients, with $(n + 1)\binom\alpha{n+1} = (\alpha - n)\binom\alpha n$,
$$(1 + x)f'(x) = \alpha f(x).$$
Then $\frac{f(x)}{(1 + x)^\alpha}$ has derivative $0$ and equals $1$ at $x = 0$, so $f(x) = (1 + x)^\alpha$.

For $\alpha = -k$, $\binom{-k}{n} = \frac{(-k)(-k - 1)\cdots(-k - n + 1)}{n!} = (-1)^n\binom{n + k - 1}{n}$, and those signs cancel the $(-x)^n$ inside $\frac{1}{(1 - x)^k}$, leaving the positive coefficients $\binom{n + k - 1}{k - 1}$, the stars-and-bars count of $n$ as an ordered sum of $k$ nonnegative parts. With $k = 1, 2$ these are $1$ and $n + 1$.

For $\alpha = \frac12$: $\binom{1/2}2 = \frac{\frac12 \cdot \left(-\frac12\right)}{2} = -\frac18$ and $\binom{1/2}3 = \frac{\frac12 \cdot \left(-\frac12\right) \cdot \left(-\frac32\right)}{6} = \frac1{16}$.

## Useful observations
- This is the dictionary that turns generating functions into numbers. Unlimited repetition of $k$ item types is modeled by $\frac{1}{(1 - x)^k}$ and the $x^n$ coefficient is read as $\binom{n + k - 1}{k - 1}$.
- Such factors, and finite pieces $\frac{1 - x^{m+1}}{1 - x}$ for bounded supply, are multiplied, expanded, and the coefficient extracted.
- Fractional exponents give the standard route to approximating a square root by hand.

## Applications
Generating-function counts, "number of nonnegative integer solutions" problems, and series for roots and reciprocals.

## Contest profile
The engine behind AIME and olympiad generating-function counts; it is [[stars-and-bars|stars and bars]], packaged to compose with other generating functions.
`,

"cardano-cubic": String.raw`
## Key forms
- $t^3 + pt + q = 0 \implies t = \sqrt[3]{-\dfrac q2 + \sqrt{\dfrac{q^2}{4} + \dfrac{p^3}{27}}} + \sqrt[3]{-\dfrac q2 - \sqrt{\dfrac{q^2}{4} + \dfrac{p^3}{27}}}$ — a root of the depressed cubic
- $x = t - \dfrac{b}{3a}$ — the substitution that depresses $ax^3 + bx^2 + cx + d = 0$
- $\Delta = -4p^3 - 27q^2$ — the discriminant: $\Delta \gt 0$ three distinct real roots, $\Delta = 0$ a repeated root, $\Delta \lt 0$ one real and two complex

## Conditions
For $\Delta \gt 0$ the cube roots are of complex numbers (the casus irreducibilis), even though all three roots are real, and the trigonometric substitution is cleaner there. The two cube roots are chosen so that their product is $-\frac p3$.

## Why it works
The substitution $x = t - \frac{b}{3a}$ kills the quadratic term, leaving $t^3 + pt + q = 0$. Setting $t = u + v$ with $3uv + p = 0$ turns it into $u^3 + v^3 = -q$ and $u^3v^3 = -\frac{p^3}{27}$.

So $u^3$ and $v^3$ are the two roots of $z^2 + qz - \frac{p^3}{27} = 0$, which are $-\frac q2 \pm \sqrt{\frac{q^2}{4} + \frac{p^3}{27}}$. That gives the nested cube-root expression. The term under the inner square root is, up to a constant, the discriminant $\Delta = -4p^3 - 27q^2$.

## Useful observations
- The cubic is depressed, the formula applied, and $-\frac{b}{3a}$ added back.
- The discriminant predicts the roots: for $\Delta \lt 0$ one real root is given directly; for $\Delta \gt 0$ there are three real roots via complex cube roots, where $t = 2\sqrt{-p/3}\cos\theta$ is cleaner.
- In practice the [[rational-root-theorem|Rational Root Theorem]] and factoring come first; contest cubics are designed to factor.

## Applications
Solving a cubic with no nice root, and counting the real roots of a cubic by its discriminant.

## Contest profile
Almost never the intended path; the discriminant's root count is occasionally handy, but rational roots, [[vietas-general|Vieta's Formulas]], or a clever substitution come before Cardano.
`

});

Object.assign(window.MATH_DETAILS, {

"power-mean-inequality": String.raw`
## Key forms
- $\alt{M_p = \left(\dfrac1n\sum a_i^{\,p}\right)^{1/p}}{M_p = \left(\dfrac{a_1^{\,p} + a_2^{\,p} + \cdots + a_n^{\,p}}{n}\right)^{1/p}}$ is nondecreasing in $p$, so $M_p \le M_q$ whenever $p \lt q$
- $M_{-1} \le M_0 \le M_1 \le M_2$, that is HM $\le$ GM $\le$ AM $\le$ QM — with $M_0$, the limit as $p \to 0$, equal to the geometric mean
- equality throughout exactly when all the $a_i$ are equal

## Conditions
The $a_i$ are positive reals. The case $p = 0$ is defined as the limit, the geometric mean, and negative exponents need positive values.

## Why it works
Step 1, $0 \lt p \lt q$. The function $f(t) = t^{q/p}$ is convex for $t \gt 0$, so [[jensens-inequality|Jensen]] applied to $t_i = a_i^{\,p}$ gives
$$\left(\frac1n\sum a_i^{\,p}\right)^{q/p} \le \frac1n\sum a_i^{\,q},$$
and taking $q$th roots gives $M_p \le M_q$.

Step 2, $p \lt q \lt 0$. Now $\frac qp$ is between $0$ and $1$, so $f$ is concave and the inequality above reverses. Taking the power $\frac1q$, which is negative, reverses it again, so $M_p \le M_q$ still.

Step 3, through $0$. [[am-gm|AM-GM]] on the numbers $a_i^{\,q}$ gives $G^q \le \frac1n\sum a_i^{\,q}$, so $G \le M_q$ for $q \gt 0$, where $G$ is the geometric mean. On the numbers $a_i^{\,p}$ with $p \lt 0$ it gives $G^p \le \frac1n\sum a_i^{\,p}$, and the negative power $\frac1p$ turns this into $G \ge M_p$. As $p \to 0$, $a^p = e^{p\ln a} \approx 1 + p\ln a$, so $\ln M_p \to \frac1n\sum\ln a_i = \ln G$, which is why $M_0$ is defined as $G$.

Equality: Jensen and AM-GM are strict unless all the $a_i$ are equal, and equal values make every mean the same number.

## Useful observations
- The two exponents are matched to the data: $M_2 \ge M_1$ compares $\sum a_i^2$ with $(\sum a_i)^2$; $M_1 \ge M_{-1}$ is AM-HM; $M_1 \ge M_0$ is AM-GM.
- When a problem mixes, say, cubes and first powers, the general $M_p \le M_q$ for $p \lt q$ is quoted directly.
- It is often the cleanest finish after normalizing $n$ or $\sum a_i$.

## Applications
Comparing symmetric sums of different powers, bounding a sum given a sum of cubes or squares, and packaging the whole mean chain into one statement.

## Contest profile
The workhorse behind "compare these symmetric sums" inequalities on the AIME and in olympiads, packaging the whole mean chain into one statement. The specific exponent step used should be named.
`,

"weighted-am-gm": String.raw`
## Key forms
- $\alt{\sum w_ia_i \ge \prod a_i^{\,w_i}}{w_1a_1 + \cdots + w_na_n \ge a_1^{\,w_1}\cdots a_n^{\,w_n}}$ with positive weights $w_i$ that add to $1$ and positive $a_i$ — the weighted arithmetic mean dominates the weighted geometric mean
- rational weights recover plain AM-GM by repeating terms
- equality holds exactly when all the $a_i$ are equal

## Conditions
The weights are positive and add to $1$, and the $a_i$ are positive. Equal weights give the ordinary AM-GM inequality.

## Why it works
It is [[jensens-inequality|Jensen's Inequality]] in its weighted form for the concave logarithm:
$$\ln\Big(\sum w_ia_i\Big) \ge \sum w_i\ln a_i = \ln\Big(\prod a_i^{\,w_i}\Big),$$
and exponentiating gives the inequality for any positive weights adding to $1$. Since $\ln$ is strictly concave, equality needs all the $a_i$ equal. For rational weights $w_i = \frac{m_i}M$ the same result is plain AM-GM on $M$ numbers, with $a_i$ repeated $m_i$ times.

## Useful observations
- The weights are chosen to produce the exponents wanted. To bound a product $\prod a_i^{c_i}$, weights $w_i \propto c_i$ make the weighted geometric mean the product and the weighted arithmetic mean a sum that is under control. This is how targeted bounds like $a^3 + a^3 + b^3 \ge 3a^2b$ are proved.
- It also proves Young's inequality and, through it, Hölder's Inequality.
- Half of olympiad inequality work is picking good weights: equal weights handle symmetric sums, and the weighted form is what unequal exponents demand.

## Applications
Maximizing a product with a fixed weighted sum, bounds with unequal exponents, and proofs of Young's and Hölder's inequalities.

## Contest profile
The weighted form is what unequal exponents demand; equal weights (plain AM-GM) handle symmetric sums.
`,

"eisenstein-criterion": String.raw`
## Key forms
- if a prime $p$ divides $a_0, a_1, \ldots, a_{n-1}$ but not $a_n$, and $p^2 \nmid a_0$, then $\alt{\sum a_ix^i}{a_nx^n + \cdots + a_1x + a_0}$ is irreducible over $\mathbb{Q}$
- a shift $x \mapsto x + c$ often exposes an Eisenstein prime: $\Phi_p(x) = 1 + x + \cdots + x^{p-1}$ becomes Eisenstein at $p$ after $x \mapsto x + 1$

## Conditions
The coefficients are integers. The criterion only ever proves irreducibility; failing it says nothing.

## Why it works
If a prime $p$ divides every coefficient except the leading one and $p^2$ does not divide the constant term, reducing a hypothetical factorization mod $p$ forces both factors to be powers of $x$ times a unit. Their constant terms would then both be divisible by $p$, making the product's constant term divisible by $p^2$, which contradicts the hypothesis. So no factorization into lower-degree rational polynomials exists.

## Useful observations
- The three conditions are checked in order: $p \mid a_0, \ldots, a_{n-1}$, then $p \nmid a_n$, then $p^2 \nmid a_0$.
- If no prime works as written, a shift $x \mapsto x + c$ is tried first, since irreducibility is unchanged by it.
- For the cyclotomic $\Phi_p(x)$, substituting $x + 1$ makes $p$ Eisenstein, because the middle binomial coefficients are all divisible by $p$.

## Applications
Proving that a polynomial is irreducible over $\mathbb{Q}$, and the irreducibility of cyclotomic polynomials of prime index.

## Contest profile
Rare below olympiad level, and when it appears the polynomial is usually cyclotomic or one shift away from it. It is worth knowing so that proving a polynomial irreducible over the rationals has a first move.
`,

"abel-summation": String.raw`
## Key forms
- $\alt{\sum_{k=1}^{n}a_kb_k = A_nb_n - \sum_{k=1}^{n-1}A_k(b_{k+1} - b_k)}{a_1b_1 + \cdots + a_nb_n = A_nb_n - A_1(b_2 - b_1) - \cdots - A_{n-1}(b_n - b_{n-1})}$ with $A_k = a_1 + \cdots + a_k$
- the discrete analogue of integration by parts

## Conditions
$A_k$ is the partial sum of the sequence $a$. When $b_k$ is monotone, the transformed sum has terms of one sign.

## Why it works
Substitute $a_k = A_k - A_{k-1}$ and reindex. This mirrors $\int u\,\mathrm{d}v = uv - \int v\,\mathrm{d}u$: the boundary term $A_nb_n$ minus the sum of the $A_k$ against the forward differences $b_{k+1} - b_k$ rebuilds the original sum.

## Useful observations
- It pays off when one factor has a clean partial sum (arithmetic, geometric, binomial) or the other is monotone.
- Sums like $\sum kr^k$ and $\sum k\binom nk$, and Dirichlet-type $\sum a_k/k$, all yield to it.
- The one-signed terms for monotone $b_k$ are the mechanism behind Chebyshev's and Karamata's inequalities and Abel's convergence test.

## Applications
Sums of products where one factor telescopes or is monotone, and proofs of inequalities by one-signed terms.

## Contest profile
An olympiad and advanced-AIME tool that turns an intractable sum of products into a telescoping or bounded one.
`,

"inverse-trig-identities": String.raw`
## Key forms
- $\arcsin x + \arccos x = \dfrac\pi2$ — the complement identity
- $\arctan x + \arctan\dfrac1x = \dfrac\pi2\operatorname{sgn}(x)$ — $+\frac\pi2$ for $x \gt 0$ and $-\frac\pi2$ for $x \lt 0$
- $\arctan x + \arctan y = \arctan\dfrac{x + y}{1 - xy}$, with $\pm\pi$ added when $xy \gt 1$ — the addition formula and its correction
- the ranges: $\arcsin$ and $\arctan$ return values in $\left[-\frac\pi2, \frac\pi2\right]$, and $\arccos$ in $[0, \pi]$

## Conditions
Each identity holds on the principal ranges. $\arcsin(\sin x) = x$ only for $x \in \left[-\frac\pi2, \frac\pi2\right]$, and $\arccos(\cos x) = x$ only for $x \in [0, \pi]$; elsewhere the answer is the reflection or shift that lands in the range.

## Why it works
Step 1, the complement. Let $\theta = \arcsin x$, in $\left[-\frac\pi2, \frac\pi2\right]$. Then $\frac\pi2 - \theta$ is in $[0, \pi]$, the range of $\arccos$, and $\cos\left(\frac\pi2 - \theta\right) = \sin\theta = x$, so $\arccos x = \frac\pi2 - \theta$.

Step 2, reciprocals. For $x \gt 0$, $\theta = \arctan x$ is in $\left(0, \frac\pi2\right)$, so is $\frac\pi2 - \theta$, and $\tan\left(\frac\pi2 - \theta\right) = \frac1x$; so the sum is $\frac\pi2$. Both functions are odd, so for $x \lt 0$ it is $-\frac\pi2$.

Step 3, addition. With $A = \arctan x$ and $B = \arctan y$, tangent addition gives $\tan(A + B) = \frac{x + y}{1 - xy}$. The sum $A + B$ lies in $(-\pi, \pi)$, and inside the principal range exactly when $\cos(A + B) = \cos A\cos B(1 - xy) \gt 0$, that is $xy \lt 1$. When $xy \gt 1$ it is outside, and the arctangent of $\frac{x + y}{1 - xy}$ differs from it by $\pi$, added when $x \gt 0$ and subtracted when $x \lt 0$.

## Useful observations
- The ranges are pinned first: $\arcsin, \arctan \in \left[-\frac\pi2, \frac\pi2\right]$ and $\arccos \in [0, \pi]$.
- For telescoping arctan sums, adjacent terms are combined with the addition formula, watching for the $\pm\pi$ correction.
- For "evaluate $\arctan a + \arctan b + \arctan c$," the tangent is computed first and the ranges choose the right multiple of $\pi$.

## Applications
Evaluating compositions such as $\arcsin(\sin 5)$ and $\arccos(\cos 4)$, sums of arctangents, and identities that need the branch chosen correctly.

## Contest profile
AMC 12 tests these ranges head-on, and AIME uses arctan telescoping. The identities are easy; the branch and range bookkeeping is where the points actually are.
`

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
Symmetric inequalities and optimization problems in three nonnegative variables, especially polynomial ones of degree at most $5$ under a constraint such as $a + b + c = 3$, where the extreme case might be $a = b = c$, or $(t, t, s)$, or a configuration with a zero such as $(\frac32, \frac32, 0)$. The method decides which, with no clever idea needed. A degree above $5$, or four variables, falls outside it.

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

"max-product-fixed-sum": String.raw`
## Key forms
- $n = 3q + r$: the maximum product is $3^q$ for $r = 0$, $4 \cdot 3^{q-1}$ for $r = 1$, and $2 \cdot 3^q$ for $r = 2$ — the best integer split uses as many $3$'s as possible
- never a $1$, and at most two $2$'s — the two local rules behind the formula
- for real parts with a fixed sum $s$ and $k$ parts, the product is largest when all parts equal $\frac sk$, and the best $k$ makes the parts nearest to $e \approx 2.718$

## Conditions
The parts are positive integers adding to $n \ge 2$; for $n = 1$ the single part $1$ gives product $1$, and the $r = 1$ line, which needs $q \ge 1$, does not apply. For parts restricted to be at least $2$, or to a fixed count, the rule changes and the equal-parts principle is used directly.

## Why it works
For a fixed sum, AM–GM makes the product largest when the parts are equal, so the ideal part is near $e \approx 2.718$, and among integers $3$ beats $2$. Two local swaps pin the integer rule: a $1$ is always wasteful, since merging it into a neighbor, $1 + x \to x + 1$, raises the product from $x$ to $x + 1$, and three $2$'s lose to two $3$'s, which have the same sum $6$ but $8 \lt 9$, so never keep more than two $2$'s.

## Useful observations
- Writing $n = 3q + r$ gives the split at once: $r = 0$ gives $3^q$; $r = 1$ gives $4 \cdot 3^{q-1}$, since a leftover $1$ and a $3$ become a $4$ (or two $2$'s); $r = 2$ gives $2 \cdot 3^q$.
- For example $n = 11 = 3 + 3 + 3 + 2$ has product $54$, and $n = 10 = 3 + 3 + 4$ gives $36$.
- The same principle handles the real-number version, where all parts are equal, and constrained integer variants such as parts at least $2$.

## Applications
Largest product of positive integers with a given sum, the real-number version, and constrained variants.

## Contest profile
Splitting an integer into positive parts with the largest product is a MATHCOUNTS and AMC staple, and the rule about threes answers it instantly.
`,

"triangle-square-identities": String.raw`
## Key forms
- $\cos^2 A + \cos^2 B + \cos^2 C + 2\cos A\cos B\cos C = 1$ — the star identity
- $\sin^2 A + \sin^2 B + \sin^2 C = 2 + 2\cos A\cos B\cos C$ — from $\cos^2 = 1 - \sin^2$
- $\cos^2 A + \cos^2 B + \cos^2 C = 1$ exactly when the triangle is right

## Conditions
$A + B + C = 180^\circ$. The right-triangle test works because the product $\cos A\cos B\cos C$ vanishes exactly when one angle is $90^\circ$.

## Why it works
Use $C = \pi - (A + B)$, so $\cos C = -\cos(A + B)$. Substituting into $\cos^2 A + \cos^2 B + \cos^2 C$ and simplifying with product-to-sum collapses it to $1 - 2\cos A\cos B\cos C$, the star identity.

The same substitution of $\pi - (A + B)$ for $C$ proves the tangent and cotangent identities for the angles, and the half angles, which add up to $\frac\pi2$, give the half-angle tangent sum on [[half-angle-tangent-identity|the Half-Angle Tangent Identity]].

## Useful observations
- A symmetric combination of $\cos^2$, $\sin^2$, or $\sin\sin\cos$ of a triangle's angles is often the whole problem: the identity is applied and the missing term solved for.
- The right-triangle test is fast: $\cos^2 A + \cos^2 B + \cos^2 C = 1$ if and only if one angle is $90^\circ$.

## Applications
Relations among the cosines or sines of a triangle's angles, the right-triangle test, and incircle setups.

## Contest profile
AIME problems that give $\cos^2$ or $\sin\sin\cos$ relations among a triangle's angles are the target: the identity is recognized, then solved.
`,

"chebyshev-polynomials": String.raw`
## Key forms
- $T_n(\cos\theta) = \cos n\theta$ — the polynomial that turns the cosine of a multiple angle into a polynomial in $\cos\theta$
- $U_n(\cos\theta) = \dfrac{\sin(n + 1)\theta}{\sin\theta}$ — the second kind
- $T_{n+1} = 2x\,T_n - T_{n-1}$ with $T_0 = 1$ and $T_1 = x$ — the recurrence, the same for $U_n$
- $\dfrac{1}{2^{n-1}}T_n$ is the monic degree-$n$ polynomial with the least maximum of $\lvert\cdot\rvert$ on $[-1, 1]$, equioscillating between $\pm\dfrac{1}{2^{n-1}}$

## Conditions
The trigonometric form uses $x = \cos\theta$ with $\lvert x\rvert \le 1$; the polynomial identities hold for all $x$. The roots of $T_n$ are $x_k = \cos\frac{(2k - 1)\pi}{2n}$.

## Why it works
Expanding $\cos n\theta$ with [[angle-addition|angle addition]] always yields a polynomial in $\cos\theta$, since the odd powers of $\sin\theta$ pair up, and that polynomial is $T_n$.

Its recurrence mirrors $\cos(n + 1)\theta = 2\cos\theta\cos n\theta - \cos(n - 1)\theta$. The second kind obeys the same recurrence because $\sin(n + 2)\theta + \sin n\theta = 2\cos\theta\sin(n + 1)\theta$. The recurrence also shows that $T_n$ has leading coefficient $2^{n-1}$ for $n \ge 1$. The roots come from $\cos n\theta = 0$, that is $n\theta = \frac{(2k - 1)\pi}2$, and $T_m(T_n(\cos\theta)) = \cos(mn\theta)$ gives the composition rule.

For the minimax fact, put $t = \frac{T_n}{2^{n-1}}$, monic, with $\lvert t\rvert \le \frac1{2^{n-1}}$ on $[-1, 1]$ and the value $\pm\frac1{2^{n-1}}$, alternating in sign, at the $n + 1$ points $\cos\frac{j\pi}n$. If a monic $p$ of degree $n$ had $\lvert p\rvert \lt \frac1{2^{n-1}}$ there, then $t - p$, of degree at most $n - 1$, would alternate in sign at those $n + 1$ points, so it would have $n$ roots and be $0$, which is impossible.

## Useful observations
- Two moves. Substituting $x = \cos\theta$ evaluates stubborn polynomials or nested cosine products: the roots $x_k$ give exact values and a product of cosines collapses.
- For "make the largest value as small as possible," the minimax fact applies: the scaled $T_n$ has the smallest peak among monic polynomials of its degree.
- Iterated maps like $x \mapsto 2x^2 - 1$ are $T_2$, so $T_m(T_n(x)) = T_{mn}(x)$.

## Applications
Multiple-angle formulas, iterated quadratic maps, cosine products and sums, and minimax polynomial problems.

## Contest profile
Iterated maps like $x \mapsto 2x^2 - 1$ and multiple-angle [[even-power-sin-cos-sums|cosine sums]] are the recurring AIME and olympiad uses; the minimax property answers the rarer "minimize the peak of a monic polynomial" question. It is closely tied to the trigonometric substitution $x = \cos\theta$.
`,

"lagranges-identity": String.raw`
## Key forms
- $\alt{\left(\sum a_i^2\right)\left(\sum b_i^2\right) - \left(\sum a_ib_i\right)^2 = \sum_{i < j}(a_ib_j - a_jb_i)^2}{(a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2) - (a_1b_1 + \cdots + a_nb_n)^2 = (a_1b_2 - a_2b_1)^2 + \cdots}$
- the two-term case, for four numbers, has its own card, [[brahmagupta-fibonacci|the Brahmagupta-Fibonacci card]]
- in three dimensions, $\lvert\mathbf{a}\rvert^2\lvert\mathbf{b}\rvert^2 - (\mathbf{a} \cdot \mathbf{b})^2 = \lvert\mathbf{a} \times \mathbf{b}\rvert^2$

## Conditions
The sequences are real, of the same length $n$. Equality in the Cauchy–Schwarz Inequality holds exactly when every $a_ib_j - a_jb_i = 0$, that is, when the sequences are proportional.

## Why it works
Expand both sides. The product of the two sums of squares splits into diagonal terms $\sum a_i^2b_i^2$ and off-diagonal terms $\sum_{i \ne j}a_i^2b_j^2$. The squared dot product has the same diagonal and off-diagonal terms $\sum_{i \ne j}a_ib_ia_jb_j$.

Subtracting, the diagonals cancel and the off-diagonal remainder pairs up: $a_i^2b_j^2 + a_j^2b_i^2 - 2a_ib_ia_jb_j = (a_ib_j - a_jb_i)^2$ for each pair $i < j$, which is the right-hand side.

## Useful observations
- Because the right side is a sum of squares, the identity contains Cauchy–Schwarz and its equality case.
- It gives the exact slack in Cauchy–Schwarz, useful when $\le$ alone is not enough.
- The two-term case is the Brahmagupta–Fibonacci Identity, the workhorse for sums of two squares and complex-number norms.

## Applications
The slack in the Cauchy–Schwarz Inequality, proportionality conditions, and sums of two squares through the two-term case.

## Contest profile
The two-term case is the common one. The full identity is rarer, but it is the cleanest one-line proof of Cauchy–Schwarz.
`,

"abs-value-graphing": String.raw`
## When to use
Equations and inequalities in one variable with nested bars, such as $\bigl||x| - 3\bigr| = b$ or $\bigl||x - 5| - 5\bigr| \le 2$; questions that count solutions for a parameter; and any task asking for the graph of an absolute value expression. Splitting into sign cases doubles the work with each bar, while the graph handles every bar in one picture.

## How
1. Start from the innermost expression, usually a line or the V of $|x|$.
2. Apply the operations from the inside out: a shift $f(x - h)$ moves right by $h$, a constant $f(x) + k$ moves up by $k$, an outer bar $|f(x)|$ folds the part below the $x$-axis upward, and an inner bar $f(|x|)$ replaces the left half by the mirror image of the right half.
3. Track only the corners, their positions and heights, since the graph is straight between them.
4. Read the question off the finished picture: solutions are crossings with a horizontal line, and solution sets of inequalities are the stretches above or below it.

Graph $y = \bigl||x| - 3\bigr|$. The V of $|x|$, lowered by $3$, has its vertex at $(0, -3)$ and crosses the axis at $\pm 3$. Folding the part below the axis gives a W with corners at $(\pm 3, 0)$ and a peak at $(0, 3)$.

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
## Key forms
- $L = \dfrac{d}{1 - r}$ for $r \ne 1$ — the fixed point of $a_n = ra_{n-1} + d$, the value the rule leaves unchanged
- $a_n - L = r^n(a_0 - L)$ — measured from $L$ the sequence is geometric
- $a_n = r^n(a_0 - L) + L$ — the closed form
- $a_n = a_0 + nd$ when $r = 1$, where the sequence is arithmetic (no fixed point if $d \ne 0$; every value fixed if $d = 0$)

## Conditions
The rule has a constant ratio $r$ and a constant added amount $d$. The behavior, for $r \ne 1$:

| case | behavior |
|---|---|
| $a_0 = L$ | constant, for every $r$ |
| $\lvert r \rvert \lt 1$ | approaches $L$ (from one side if $r \gt 0$, alternating if $r \lt 0$) |
| $r = -1$ | a two-cycle, $a_0, 2L - a_0, a_0, \ldots$ |
| $\lvert r \rvert \gt 1$ | runs away from $L$ (alternating if $r \lt -1$) |

## Why it works
The fixed point is the one value the recurrence leaves alone: solving $L = rL + d$ gives $L = \frac{d}{1 - r}$. Subtracting $L = rL + d$ from $a_n = ra_{n-1} + d$ removes the constant, $$a_n - L = r(a_{n-1} - L), \qquad \text{so} \qquad a_n - L = r^n(a_0 - L).$$

That subtraction is the whole content: $d$ disappears into the change of origin, and what is left is a [[geometric-series|geometric sequence]] of gaps from $L$. It also predicts the behavior without any computation.

{{figure:gaps}}

So, unless $a_0 = L$ (a constant sequence), $a_n$ approaches $L$ when $\lvert r \rvert \lt 1$, keeps a constant distance from it when $r = -1$ (a two-cycle), runs away when $\lvert r \rvert \gt 1$, and alternates sides when $r$ is negative.

The excluded case is $r = 1$, where $x \mapsto x + d$ has no fixed point at all when $d \ne 0$ (and fixes everything when $d = 0$); there the recurrence is an [[arithmetic-series|arithmetic sequence]], $a_n = a_0 + nd$.

## Useful observations
- The process is: solve $L = rL + d$, write $a_n = r^n(a_0 - L) + L$, and read off what the question wants, a specific term, the limit $L$, or the step at which a threshold is crossed, which is a logarithm away.
- The shape is rarely written as a recurrence. "Each year the population grows by $8\%$ and $500$ more arrive" is $r = 1.08$ and $d = 500$. "Half the liquid in a $6$-litre tank is removed and replaced with $3$ litres of water", tracking the water, is $r = \frac12$ and $d = 3$.
- Two checks prevent the usual errors: $r = 1$ is ruled out before dividing by $1 - r$, and whether the sequence starts at $a_0$ or $a_1$ is confirmed, since the exponent in $r^n$ shifts with it.

## Applications
Mixing and dilution, interest with deposits, population questions, and any process described as repeating forever and asked to settle.

## Contest profile
Two problems here, one AIME and one AMC 12, neither solved by it alone: one pairs it with a [[states-recursion-prob|recursion on states]] for a probability, the other with [[periodic-sequences|periodicity]] modulo $m$. At MATHCOUNTS and on the AMC it appears in disguise as a mixture, interest, or population question, and the fixed point is usually the number being asked for.
`

});

Object.assign(window.MATH_DETAILS, {

"proportion-properties": String.raw`
## Key forms
- $\dfrac{a_1}{b_1} = \dfrac{a_2}{b_2} = \cdots = \dfrac{a_n}{b_n} = k \implies \dfrac{a_1 + a_2 + \cdots + a_n}{b_1 + b_2 + \cdots + b_n} = k$ — addendo, which also holds with any weights: $\dfrac{w_1a_1 + \cdots + w_na_n}{w_1b_1 + \cdots + w_nb_n} = k$
- $\dfrac ab = \dfrac cd \implies \dfrac{a + b}{b} = \dfrac{c + d}{d}$ — componendo
- $\dfrac ab = \dfrac cd \implies \dfrac{a - b}{b} = \dfrac{c - d}{d}$ — dividendo
- $\dfrac ab = \dfrac cd \implies \dfrac{a + b}{a - b} = \dfrac{c + d}{c - d}$ — both together, which clears a sum-and-difference form in one step

## Conditions
Every denominator is nonzero. Addendo also needs $b_1 + \cdots + b_n \ne 0$, since $\frac21 = \frac{-2}{-1}$ has denominators adding to $0$. Dividendo, and the combined form, need $a \ne b$, that is $k \ne 1$.

## Why it works
Equal ratios all hide the same multiplier, and once each numerator is written as that multiplier times its denominator, every rule is one line of algebra.

If $\frac{a_i}{b_i} = k$ for every $i$, then $a_i = kb_i$. Adding, $a_1 + \cdots + a_n = k(b_1 + \cdots + b_n)$, so the pooled fraction is again $k$. Scaling each pair first changes nothing, since $w_ia_i = k(w_ib_i)$ as well.

For a single proportion $\frac ab = \frac cd = k$, write $a = kb$ and $c = kd$. Then $\frac{a + b}{b} = k + 1 = \frac{c + d}{d}$, which is componendo, and $\frac{a - b}{b} = k - 1 = \frac{c - d}{d}$, which is dividendo. Dividing the first by the second gives $$\frac{a + b}{a - b} = \frac{k + 1}{k - 1} = \frac{c + d}{c - d},$$ provided $k \ne 1$ so that nothing is divided by zero.

## Useful observations
- Read backwards, the combined form recovers a ratio: $\frac{x + y}{x - y} = \frac pq$ gives $\frac xy = \frac{p + q}{p - q}$. For instance $\frac{x + y}{x - y} = \frac53$ gives $\frac xy = 4$.
- The weighted form pools ratios whose numerators and denominators are combinations of the unknowns. If $\frac{a + b}{c} = \frac{b + c}{a} = \frac{c + a}{b} = k$, adding the numerators and denominators gives $k = \frac{2(a + b + c)}{a + b + c} = 2$, unless $a + b + c = 0$, in which case each ratio is $-1$. The excluded case is exactly the one the addendo condition warns about.
- Writing the common value as a parameter $k$ is always available, and these rules save introducing it.

## Applications
Ratio and proportion problems, chains of equal ratios, simplifying sum-and-difference proportions before cross-multiplying, and finding a ratio from its sum-over-difference form.

## Contest profile
A MATHCOUNTS and AMC time-saver, and often the whole solution when it applies. The addendo one-liner beats introducing a parameter, and componendo-dividendo tidies a messy proportion equation before it is solved.
`,

"resultant-discriminant": String.raw`
## Key forms
- $\operatorname{Res}(f, g)$, the determinant of the Sylvester matrix, is $0$ exactly when $f$ and $g$ share a root
- $\operatorname{Res}(f, g) = a_m^{\,n}b_n^{\,m}\,\alt{\prod_{i, j}(\alpha_i - \beta_j)}{(\alpha_1 - \beta_1)(\alpha_1 - \beta_2)\cdots(\alpha_m - \beta_n)}$ for $f$ of degree $m$ with roots $\alpha_i$ and $g$ of degree $n$ with roots $\beta_j$
- the discriminant $\Delta_f$ is $0$ exactly when $f$ has a repeated root, and it equals $\frac{(-1)^{n(n-1)/2}}{a_n}\operatorname{Res}(f, f')$ for $f$ of degree $n$
- for a quadratic $\Delta = b^2 - 4ac$, and the sign of a cubic's discriminant counts its real roots

## Conditions
The leading coefficients are nonzero. The resultant is a polynomial in the coefficients of $f$ and $g$, so it can be evaluated without finding any roots.

## Why it works
The resultant is singular exactly when $f$ and $g$ share a root, and in terms of the roots it is the product of all differences $\alpha_i - \beta_j$, which vanishes when some $\alpha_i = \beta_j$. Taking $g = f'$ detects a repeated root of $f$, since a repeated root of $f$ is a root of $f'$, and that is the discriminant.

## Useful observations
- Setting a resultant to $0$ eliminates a variable between two polynomial equations.
- The discriminant states tangency and double-root conditions in one equation.
- It generalizes the quadratic discriminant to every degree.

## Applications
Elimination of a variable from two polynomial equations, repeated-root and tangency conditions, and counting real roots.

## Contest profile
Mostly olympiad and advanced algebra. The discriminant is an everyday tool; the resultant is the systematic elimination tool for two-variable systems.
`,

"smoothing-method": String.raw`
## When to use
Extremal problems in several symmetric variables with a fixed sum or product: maximize a product, minimize a sum of squares, bound $\sum f(x_i)$, or split an integer into parts with the largest product. The tell is a problem that "obviously" has its extremum at equal values, or at an extreme configuration such as $(2, 1, 0)$, and needs that claim proved. Whether averaging raises or lowers the quantity depends on convexity, so the direction is checked first.

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
- [[karamata-inequality]]: compares whole configurations by majorization, the global form of many smoothing steps.

## Common traps
- Smoothing in the wrong direction: a concave objective is maximized at equal values but minimized at a boundary.
- Breaking the constraint with the move, for example averaging two variables when the constraint is a fixed product.
- Assuming a minimum exists on an open domain where it may only be approached.
- Forgetting that integer problems need integer moves, as with the $2 + 2$ and $3 + 3$ swaps above.

## Contest profile
Behind many AIME optimization answers as an unstated step, and an olympiad method in its own right when the equality case must be proved rather than guessed.
`,

"evenly-spaced-angle-products": String.raw`
## Key forms
- $\alt{\prod_{k=0}^{n-1}\sin\!\Big(\theta + \dfrac{k\pi}{n}\Big) = \dfrac{\sin n\theta}{2^{n-1}}}{\sin\theta\sin\!\Big(\theta + \dfrac\pi n\Big)\cdots\sin\!\Big(\theta + \dfrac{(n-1)\pi}{n}\Big) = \dfrac{\sin n\theta}{2^{n-1}}}$ — equally spaced sines collapse to one sine
- $\alt{\prod_{k=1}^{n-1}\sin\dfrac{k\pi}{n} = \dfrac{n}{2^{n-1}}}{\sin\dfrac\pi n\sin\dfrac{2\pi}n\cdots\sin\dfrac{(n-1)\pi}{n} = \dfrac{n}{2^{n-1}}}$ — the product hiding inside the roots of unity
- $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \dfrac14\sin3\theta$ — the $n = 3$ case, with the same shape for cosines and $\tan\theta\tan(60^\circ - \theta)\tan(60^\circ + \theta) = \tan3\theta$

## Conditions
The angles are equally spaced by $\frac\pi n$. The constant $\frac{1}{2^{n-1}}$ is what the factorization of $z^n \pm 1$ leaves behind.

## Why it works
Writing each sine as complex exponentials turns an equally spaced product into a factorization of $z^n - 1$ (or $z^n + 1$), which collapses to a single $\sin n\theta$. The constant $\frac{1}{2^{n-1}}$ is exactly what that factorization leaves behind.

## Useful observations
- Sines, cosines, or tangents at a common spacing $\frac{k\pi}{n}$ are replaced by one term.
- The $n = 3$ identity is the most common; the product of the nonzero multiples of $\frac\pi n$ is the other form that turns up.
- The same distances appear as chords in a regular polygon, on [[roots-unity-distance-product|the distance products card]].

## Applications
Products of sines, cosines, and tangents at equally spaced angles.

## Contest profile
An AIME and olympiad trigonometry gem: recognizing the equal spacing turns an intimidating product into a one-line evaluation.
`,

"cot-tan-telescoping": String.raw`
## Key forms
- $\cot\theta - \cot 2\theta = \csc 2\theta$ — so a sum of cosecants at doubling angles collapses
- $\tan\theta = \cot\theta - 2\cot 2\theta$ — so a weighted sum of tangents at doubling angles collapses
- $\alt{\sum_{k=0}^{n-1}2^k\tan(2^k\theta) = \cot\theta - 2^n\cot(2^n\theta)}{\tan\theta + 2\tan2\theta + \cdots + 2^{n-1}\tan(2^{n-1}\theta) = \cot\theta - 2^n\cot(2^n\theta)}$

## Conditions
The angles double at each term. For an infinite sum, a limit is taken, with $2^n\cot(2^n\theta) \to 0$ when $\theta$ is small enough.

## Why it works
Both identities fall out of the double-angle formulas: $\cot\theta - \cot 2\theta = \csc 2\theta$ and $\tan\theta = \cot\theta - 2\cot 2\theta$ each rewrite a term as a difference of the same function at $\theta$ and $2\theta$, so a sum over doubling angles cancels internally.

## Useful observations
- When a sum has terms like $\csc 2^k\theta$ or $2^k\tan(2^k\theta)$, each is replaced by its cotangent difference and the sum telescopes.
- The key step is $\cot\theta - \cot 2\theta = \frac{\cos\theta}{\sin\theta} - \frac{\cos 2\theta}{\sin 2\theta} = \frac{2\cos^2\theta - \cos 2\theta}{\sin 2\theta} = \frac{1}{\sin 2\theta}$.

## Applications
Sums of cosecants or weighted tangents at doubling angles.

## Contest profile
A recurring AIME and olympiad "evaluate this trigonometric sum" trick; noticing the doubling angle is the signal to telescope with cotangents.
`,

"ramanujan-nested-radical": String.raw`
## Key forms
- $\sqrt{1 + \sqrt{1 + \sqrt{1 + \cdots}}} = \varphi$ — the golden ratio, from $x = \sqrt{1 + x}$
- $\sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + 4\sqrt{\cdots}}}} = 3$ — Ramanujan's radical, from $n + 2 = \sqrt{1 + (n + 1)(n + 3)}$
- an infinitely repeating radical is set equal to $x$ and the fixed-point equation solved, then positivity and convergence are checked

## Conditions
For a repeating radical the equation $x = f(x)$ has a spurious root in general; the positive root that the iteration converges to is the value.

## Why it works
A self-referential radical satisfies its own equation: $x = \sqrt{1 + x}$ gives $x = \varphi = \frac{1 + \sqrt5}{2}$.

Ramanujan's radical unrolls the identity $n + 2 = \sqrt{1 + (n + 1)(n + 3)} = \sqrt{1 + (n + 1)\sqrt{1 + (n + 2)(n + 4)}}$, so starting at $n = 1$ the whole tower equals $3$.

## Useful observations
- For an infinitely repeating radical, setting it equal to $x$ and solving the fixed-point equation handles most cases.
- For a patterned nested radical, a telescoping identity like Ramanujan's is looked for, one that hands each layer a closed value.

## Applications
Values of infinite nested radicals, and the idea of unrolling an identity into a tower.

## Contest profile
An AMC and AIME favorite for the golden-ratio radical and a classic olympiad curiosity for Ramanujan's.
`,

"symmetric-polynomial-strategies": String.raw`
## When to use
Any question of the form "the roots of this polynomial are $r$, $s$, $t$; find..." where the requested quantity treats the roots alike: sums of powers, sums of reciprocals, or sums such as $\frac{r}{s} + \frac{s}{r}$. The polynomial usually has no nice roots, which is the signal that the problem never wants them found. If swapping two roots changes the expression, it is not symmetric; pair it with its mirror image first. A product over all the roots is faster by [[products-over-roots|evaluation]].

The same move handles systems and expressions in two or three unknowns that are unchanged when the unknowns are swapped: $x + y = 5$ with $x^3 + y^3 = 35$, the value of $x^5 + y^5$ when $x + y$ and $xy$ are known, or an equation in $x + \frac1x$, where the substitution is $s = x + \frac1x$ with $p = 1$.

## How
1. Read off or name the symmetric sums: $e_1 = -a$, $e_2 = b$, $e_3 = -c$ for the roots of $x^3 + ax^2 + bx + c$, or $s = x + y$ and $p = xy$ for two unknowns.
2. Climb to power sums: $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$, or Newton's Sums for more roots.
3. For a fraction, use a common denominator; both parts are symmetric.
4. Solve for the symmetric sums when they are unknown.
5. To recover two unknowns, solve $t^2 - st + p = 0$; they are real when $s^2 \ge 4p$.

Let $r$, $s$, $t$ be the roots of $x^3 - 2x^2 + 3x - 4$, so $e_1 = 2$, $e_2 = 3$ and $e_3 = 4$. Then $r^2 + s^2 + t^2 = e_1^2 - 2e_2 = -2$, negative because two of the roots are complex, and $\frac1r + \frac1s + \frac1t = \frac{e_2}{e_3} = \frac34$.

For the system $x + y = 5$, $x^3 + y^3 = 35$: $35 = s^3 - 3sp = 125 - 15p$, so $p = 6$, and $x$ and $y$ are $2$ and $3$.

## Why it works
The coefficients of a polynomial are, up to sign, the elementary symmetric sums of its roots. That is Vieta's Formulas, and it is the only information about the roots that the coefficients hold. The Fundamental Theorem of Symmetric Polynomials says that this is enough: every polynomial expression unchanged by permuting the variables equals a polynomial in $e_1, \ldots, e_n$.

For two unknowns the pair $\{x, y\}$ is exactly the set of roots of $t^2 - st + p$, so trading $x$ and $y$ for $s$ and $p$ loses nothing.

Power sums have their own ladder. Each root satisfies the polynomial, so $r^3 = -ar^2 - br - c$, and adding over the roots expresses $p_3$ through $p_2$, $p_1$ and $p_0 = n$; for two unknowns the ladder is $$x^n + y^n = s\left(x^{n-1} + y^{n-1}\right) - p\left(x^{n-2} + y^{n-2}\right).$$

## Formulas it uses
- [[fundamental-theorem-symmetric]]: guarantees that every symmetric expression is a polynomial in the $e_k$, so the method never gets stuck.
- [[vietas-general]]: identifies each $e_k$ with a coefficient, $e_k = (-1)^k \frac{a_{n-k}}{a_n}$.
- [[newtons-sums]]: converts the $e_k$ into the power sums $p_k = \sum r_i^k$ one step at a time.
- [[vietas-quadratic]]: two unknowns are the roots of $t^2 - st + p = 0$, which recovers them at the end.
- [[square-of-sum]]: $(x + y)^2 = x^2 + 2xy + y^2$ gives the first conversion, $x^2 + y^2 = s^2 - 2p$.
- [[reciprocal-power-sums]]: the case $y = \frac1x$, where $x^n + x^{-n}$ is a polynomial in $s = x + \frac1x$.

## Common traps
- Sign errors in Vieta's Formulas: for a cubic, $e_1 = -\frac{a_2}{a_3}$ and $e_3 = -\frac{a_0}{a_3}$, while $e_2$ has a plus sign.
- Forgetting $p_0 = n$, the number of roots, when Newton's Sums reach back to the constant term.
- Forgetting that real $x$ and $y$ need $s^2 \ge 4p$, and counting one solution $(s, p)$ as one ordered pair when it gives both $(x, y)$ and $(y, x)$.
- Applying the method to an expression that is not symmetric, such as $r^2s + s^2t + t^2r$ alone.

## Contest profile
Usually the whole problem on the AIME: a cubic with ugly roots and one symmetric value to find, or a symmetric system in two unknowns that collapses in $s$ and $p$; AMC 10 and 12 problems use the two-variable form.
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

"even-power-sin-cos-sums": String.raw`
## Key forms
- $\sin^4\theta + \cos^4\theta = 1 - \dfrac12\sin^2 2\theta$
- $\sin^6\theta + \cos^6\theta = 1 - \dfrac34\sin^2 2\theta$
- $\sin^4\theta - \cos^4\theta = -\cos 2\theta$ — a difference, from $(u - v)(u + v)$
- $\sin^8\theta + \cos^8\theta = 1 - \sin^2 2\theta + \dfrac18\sin^4 2\theta$ — the pattern does not stop at the sixth power, it just stops being a single correction term

## Conditions
The expressions are symmetric in $\sin^2\theta$ and $\cos^2\theta$, with $\sin^2\theta + \cos^2\theta = 1$.

## Why it works
Write $u = \sin^2\theta$ and $v = \cos^2\theta$, so $u + v = 1$. Every symmetric expression in $u$ and $v$ is then a polynomial in the single quantity $p = uv = \sin^2\theta\cos^2\theta = \frac14\sin^2 2\theta$.

Squaring the Pythagorean identity gives $u^2 + v^2 = (u + v)^2 - 2uv = 1 - 2p$, the first formula. For the cubes, $u^3 + v^3 = (u + v)^3 - 3uv(u + v) = 1 - 3p$, the second. For the fourth powers of $u$ and $v$,
$$u^4 + v^4 = (u^2 + v^2)^2 - 2p^2 = 1 - 4p + 2p^2,$$
which is $1 - \sin^2 2\theta + \frac18\sin^4 2\theta$. The difference is $u^2 - v^2 = (u - v)(u + v) = \sin^2\theta - \cos^2\theta = -\cos 2\theta$.

## Useful observations
- The moment an expression is symmetric in $\sin^2$ and $\cos^2$, expanding stops and $p = uv$ takes over: any even-power symmetric combination collapses to a polynomial in $p$.
- Extremes occur where $\sin^2 2\theta$ is $0$ or $1$, at the axes or at $45^\circ$, so nothing is differentiated. Since $0 \le \sin^2 2\theta \le 1$, the first sum runs from $\frac12$ (at $\theta = 45^\circ$) up to $1$, and the second from $\frac14$ up to $1$.
- A constraint such as $\sin^4\theta + \cos^4\theta = \frac58$ gives $\sin^2 2\theta = \frac34$ immediately.

## Applications
Ranges and extrema of even-power trigonometric sums, and constraints that must be solved for $\theta$ or for another power sum.

## Contest profile
A staple of AMC 12 and early AIME trigonometry, usually disguised: "find the range of," "compute the maximum of," or a constraint relating two even-power sums.
`,

"cosecant-cotangent-square-sums": String.raw`
## Key forms
- $\alt{\sum_{k=1}^{n-1}\csc^2\dfrac{k\pi}{n} = \dfrac{n^2 - 1}{3}}{\csc^2\dfrac\pi n + \csc^2\dfrac{2\pi}{n} + \cdots + \csc^2\dfrac{(n-1)\pi}{n} = \dfrac{n^2 - 1}{3}}$
- $\alt{\sum_{k=1}^{n-1}\cot^2\dfrac{k\pi}{n} = \dfrac{(n - 1)(n - 2)}{3}}{\cot^2\dfrac\pi n + \cdots + \cot^2\dfrac{(n-1)\pi}{n} = \dfrac{(n-1)(n-2)}{3}}$
- $\dfrac1{1 - \omega^k} = \dfrac12 + \dfrac i2\cot\dfrac{k\pi}{n}$ — the reusable bridge from roots of unity to cotangents, with $\omega = e^{2\pi i/n}$

## Conditions
The sums run over the $n - 1$ nontrivial $n$th roots of unity. The two sums differ by exactly $n - 1$ because $\csc^2 = \cot^2 + 1$, so proving either gives the other.

## Why it works
Let $\omega = e^{2\pi i/n}$. Factor $1 - e^{i\varphi} = -2i\,e^{i\varphi/2}\sin\frac\varphi2$ and take the reciprocal: $\frac{1}{1 - \omega^k} = \frac12 + \frac i2\cot\frac{k\pi}{n}$. So these $n - 1$ complex numbers share the real part $\frac12$, and their imaginary parts are half the cotangents.

Squaring one gives $\left(\frac{1}{1 - \omega^k}\right)^2 = \frac14 - \frac14\cot^2\frac{k\pi}{n} + \frac i2\cot\frac{k\pi}{n}$, so the real part of $\sum_k(1 - \omega^k)^{-2}$ is $\frac{n-1}{4} - \frac14\sum_k\cot^2\frac{k\pi}{n}$.

That sum is computed a second way from the polynomial. The $\omega^k$ are the roots of $P(z) = 1 + z + \cdots + z^{n-1}$, so $\sum_k\frac{1}{(z - \omega^k)^2} = \left(\frac{P'}{P}\right)^2 - \frac{P''}{P}$. At $z = 1$ this needs $P(1) = n$, $P'(1) = \frac{n(n-1)}{2}$, and $P''(1) = \frac{n(n-1)(n-2)}{3}$.

That gives $\sum_k\frac{1}{(1 - \omega^k)^2} = \frac{(n-1)^2}{4} - \frac{(n-1)(n-2)}{3}$. Setting the two real parts equal yields $\sum\cot^2 = \frac{(n-1)(n-2)}{3}$, and adding $n - 1$ gives the cosecant sum.

## Useful observations
- A sum over $k = 1, \ldots, n - 1$ of a trigonometric function of $k\pi/n$ is a sum over the nontrivial $n$th roots of unity in disguise, and the substitution above is the standard way in.
- The two results are worth storing as a pair, since $\csc^2 = \cot^2 + 1$ converts either into the other.
- Taking real parts of $\sum\frac{1}{1 - \omega^k} = \frac{n-1}{2}$ recovers $\sum\cot\frac{k\pi}{n} = 0$, and pushing the same method to fourth powers gives the sum of fourth powers of the cosecants.

## Applications
Closed forms for sums of squared cosecants and cotangents at equally spaced angles, and elementary proofs of the Basel sum.

## Contest profile
Standard AIME fare whenever a closed form of such a sum at equally spaced angles is asked for. The same bridge from roots of unity to cotangents is how the Basel sum is proved by elementary means.
`,


"forced-difference-of-squares": String.raw`
## When to use
Factoring $x^4 + x^2 + 1$, $x^4 + 4$ or $n^4 + 4^n$; showing that numbers like $n^4 + 4$ are composite for $n > 1$; and simplifying products or sums whose terms are such quartics, which then telescope. A quartic with odd-degree terms is not of this shape, and the Rational Root Theorem or grouping is the tool there.

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
Estimating a square root by hand to two or more decimals, comparing a root with a fraction or a decimal, finding the integer nearest to $\sqrt N$ or to a sum of roots, and bounding expressions such as $\sqrt{n^2 + n}$ between two simple values. It also explains why $\sqrt{n^2 + k}$ is just above $n + \frac{k}{2n}$ in many floor-function problems. An estimate is not a proof: to settle an inequality exactly, compare squares.

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
## Key forms
- $T_n = \dfrac{n(n+1)}{2} = \dbinom{n+1}{2}$ — the $n$th triangular number, the dots in a triangular array with $n$ rows, and the pairs among $n + 1$ objects
- $T_{n-1} + T_n = n^2$ — two consecutive triangular numbers add to a perfect square
- $8T_n + 1 = (2n+1)^2$ — so $T$ is triangular exactly when $8T + 1$ is an odd perfect square
- $T_{n+1} = T_n + (n + 1)$ — each triangular number adds one more row
- $\alt{\sum_{k=1}^{n} T_k = \dfrac{n(n+1)(n+2)}{6}}{T_1 + T_2 + \cdots + T_n = \dfrac{n(n+1)(n+2)}{6}}$ — the tetrahedral numbers

## Conditions
$n$ is a positive integer, with $T_0 = 0$. The test $8T + 1$ is a square must be an odd square, and every odd square greater than $1$ arises this way, since $(2n + 1)^2$ is the value at $T_n$.

## Why it works
Writing the sum forwards and backwards pairs its ends: $1$ with $n$, $2$ with $n - 1$, and so on, $n$ pairs each adding to $n + 1$, so twice the sum is $n(n + 1)$. Choosing two of $n + 1$ objects gives the same count, $\binom{n + 1}{2}$.

Two staircases, of heights $1$ to $n - 1$ and $1$ to $n$, interlock exactly into an $n \times n$ square, which is $T_{n-1} + T_n = n^2$.

{{figure:staircases}}

For the test, multiply $T = \frac{n(n + 1)}{2}$ by $8$ and add $1$: $$8T + 1 = 4n^2 + 4n + 1 = (2n + 1)^2.$$ So a triangular number always gives an odd square, and an odd square $(2n + 1)^2$ always comes from $T_n$.

## Useful observations
- The shape is recognized rather than the formula: any count of pairs, handshakes, or unordered choices of two is triangular, as on [[handshakes-diagonals|the handshakes card]].
- To test a number, check whether $8T + 1$ is an odd square and read off $n = \frac{\sqrt{8T + 1} - 1}{2}$. For $5050$, $8 \cdot 5050 + 1 = 40401 = 201^2$, so it is $T_{100}$; for $5051$, $40409$ falls strictly between $201^2$ and $202^2$, so it is not triangular.
- A sequence whose second differences are constantly $1$ is $T_n$ plus a linear term, so that form is fitted rather than three unknown coefficients solved for.

## Applications
Counts of pairs, handshakes, and dots in triangular arrays; sequences with constant second difference; and tests for whether a number is triangular.

## Contest profile
Four problems here, split between AMC and AIME, one solved by it alone; two combine it with [[modular-basics|modular arithmetic]]. Sums of the first $n$ integers turn up constantly inside larger arguments; the general sum is on [[arithmetic-series|the arithmetic series card]], and [[power-sums|the power sums]] carry squares and cubes.
`,





"determinant-basics": String.raw`
## Key forms
- $ad - bc$ for a $2 \times 2$, and $aei + bfg + cdh - ceg - bdi - afh$ for a $3 \times 3$ (Sarrus's rule, three downward diagonals minus three upward ones, which does not extend to larger sizes)
- swapping two rows reverses the sign; adding a multiple of one row to another changes nothing; scaling a row scales the determinant, so $\det(cA) = c^n \det A$ for an $n \times n$ matrix
- $\det(AB) = \det A \cdot \det B$ and $\det(A^{\top}) = \det A$
- the determinant of a triangular matrix is the product of its diagonal entries
- $\det A = 0$ exactly when the rows are dependent, and exactly when $A$ has no inverse

## Conditions
The matrix is square. The first two rules hold for rows and, by $\det(A^{\top}) = \det A$, equally for columns. Sarrus's rule is a $3 \times 3$ accident.

## Why it works
The determinant is the one function of the rows that is linear in each row, flips sign when two rows swap, and gives $1$ on the identity. Those three demands pin it down completely, and every formula for it follows: $ad - bc$ for a $2 \times 2$, Sarrus for a $3 \times 3$, [[cofactor-expansion|cofactor expansion]] in general. Sign-flipping on a swap forces the value to vanish when two rows are equal, and linearity then extends that to any dependent set, which is why $\det = 0$ means exactly that one row is a combination of the others.

The general formula is the Leibniz formula, $\det A = \sum_{\sigma} \operatorname{sgn}(\sigma)\, a_{1\sigma(1)} a_{2\sigma(2)} \cdots a_{n\sigma(n)}$: one term for each way of choosing one entry from every row and every column, signed by the parity of the permutation. Sarrus's six terms are the case $n = 3$.

## Useful observations
- The properties are used before the formula. Row operations of the add-a-multiple kind cost nothing, so they manufacture zeros, after which the determinant is expanded along the sparsest row.
- $\det(AB) = \det A \cdot \det B$ turns a product that cannot be computed into two that can, and $\det(A^{\top}) = \det A$ lets any row argument be run on columns instead.
- Trying to extend the diagonal pattern of Sarrus's rule to a $4 \times 4$ is a standard and silent error.
- Reduced modulo $2$ the signs disappear, so the determinant of a $0$-$1$ matrix has the same parity as the number of permutations it allows, a count of perfect matchings in disguise.

## Applications
Areas and volumes, collinearity and coplanarity, solving small linear systems, and recurrences for tridiagonal matrices.

## Contest profile
Determinants are not on the AMC or AIME syllabus, yet several cards in this library invoke one, and a tridiagonal matrix whose determinant is asked for outright is a recurring AIME shape. There the determinant is never the difficulty, only the notation the difficulty arrives in, and the actual work is turning it into a recurrence. The other common sighting is quieter, since [[shoelace-formula|the shoelace formula]] and [[cross-product-area|the cross product]] are both determinants wearing other names.
`,

"determinant-geometric": String.raw`
## Key forms
- $\begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix} = u_1v_2 - u_2v_1$ — the signed area of the parallelogram on $\vec u$ and $\vec v$, positive when $\vec v$ is counterclockwise from $\vec u$
- $[ABC] = \dfrac12\left\lvert \begin{vmatrix} x_B - x_A & y_B - y_A \\ x_C - x_A & y_C - y_A \end{vmatrix} \right\rvert$ — the triangle on the same two edges; the same number is $\dfrac12 \left\lvert \begin{vmatrix} x_A & y_A & 1 \\ x_B & y_B & 1 \\ x_C & y_C & 1 \end{vmatrix} \right\rvert$
- $A$, $B$, $C$ are collinear exactly when that determinant is $0$, and four points of space are coplanar exactly when the corresponding $3 \times 3$ determinant of edge vectors is $0$
- the $3 \times 3$ determinant of three vectors is the signed volume of the parallelepiped on them, and the tetrahedron has one sixth of its absolute value
- a linear map multiplies every area by $\lvert \det \rvert$, and in space every volume

## Conditions
The coordinates are Cartesian. The sign depends on the order of the rows, so swapping two rows reverses it, and only the absolute value is an area. The scaling statement holds for any linear map and, adding a translation, for any affine one.

## Why it works
Area is linear in each edge of a parallelogram and reverses sign when the two edges swap roles, which is the same short list of demands that defines the determinant, so the two must agree.

Reading it that way makes the collinearity test obvious rather than memorized: three points span a triangle of zero area exactly when they lie on one line, and the determinant of the two edge vectors is twice that area. One dimension up, the $3 \times 3$ determinant is the signed volume of the parallelepiped, so it vanishes exactly when four points are coplanar.

## Useful observations
- The sign carries information. A positive value means $A$, $B$, $C$ run counterclockwise, which is how a convex-hull or orientation argument is actually carried out, and taking absolute values too early throws that away.
- For the collinearity of three points, expanding $\det = 0$ gives a linear relation in the coordinates and is usually cleaner than equating two slopes, since it never needs a vertical-line case.
- The area-scaling reading is the missing sentence on [[affine-transformations|affine transformations]], which says a linear map multiplies every area by one constant: that constant is $\lvert \det \rvert$.

## Applications
Areas from coordinates, collinearity and coplanarity tests, orientation, volumes of parallelepipeds and tetrahedra, and the effect of a linear map on area.

## Contest profile
It is behind two things AIME asks constantly. [[shoelace-formula|Shoelace]] is this determinant summed around a polygon, and some problems turn on the parity or divisibility of $x_1y_2 - x_2y_1$ rather than on any area at all. The collinearity test is the quieter use, worth writing down whenever a problem says three points are collinear and the alternative is two slope equations.
`,

"matrix-multiplication": String.raw`
## Key forms
- $\alt{(AB)_{ij} = \sum_k a_{ik}b_{kj}}{(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots}$ — entry $(i, j)$ pairs row $i$ of $A$ against column $j$ of $B$
- $AB \ne BA$ in general — multiplication is associative and distributive but not commutative
- $(A^n)_{ij}$ is the number of walks of length $n$ from $i$ to $j$, when $A$ is the adjacency matrix of a graph
- $AI = IA = A$ — the identity matrix, with ones on the diagonal

## Conditions
The product is defined only when the number of columns of $A$ equals the number of rows of $B$. Only square matrices have powers.

## Why it works
A matrix is a linear map written in coordinates, and the product is what comes from doing one map after the other: entry $(i, j)$ of $AB$ asks where basis vector $j$ goes under $B$ and then reads off coordinate $i$ after $A$.

Composition of maps is associative, so matrix multiplication is, and it is not commutative for the same reason rotating then reflecting differs from reflecting then rotating. The sum over the intermediate index $k$ is the whole content of the definition.

## Useful observations
- The counting reading is the one worth having on sight. If $A$ is an adjacency matrix, $(A^n)_{ij}$ counts walks of length $n$ from $i$ to $j$, because the sum over $k$ is precisely "choose where the walk stood one step earlier".
- That is the engine inside [[transfer-matrix-method|the transfer matrix method]], and it converts a tiling or no-two-adjacent count into a matrix power.
- To evaluate such a power, the matrix is not multiplied $n$ times: it is squared repeatedly, or [[eigenvalues-characteristic|the eigenvalues]] give a closed form.

## Applications
Walk counts in graphs, tiling counts through transfer matrices, composition of linear maps, and powers of a matrix.

## Contest profile
Matrices themselves are essentially never asked for on the AMC or AIME. They appear as the machinery under a counting card, which is why the useful fact is not how to multiply two matrices but what a matrix power means. If a problem gives a small state machine and asks for long-run counts, the matrix is available, but so is the [[linear-recurrence|linear recurrence]] it produces, and solving the recurrence is usually the shorter road.
`,

"cramers-rule": String.raw`
## Key forms
- $A\mathbf x = \mathbf b$ with $\det A \ne 0$ gives $x_i = \dfrac{\det A_i}{\det A}$ — where $A_i$ is $A$ with column $i$ replaced by $\mathbf b$
- $\det A \ne 0$ gives exactly one solution, while $\det A = 0$ gives none or infinitely many

## Conditions
The system is square, with as many equations as unknowns. When $\det A = 0$ the rule does not apply, and which of "none" or "infinitely many" occurs depends on whether $\mathbf b$ is consistent with the dependent rows.

## Why it works
Replace column $i$ of $A$ by $\mathbf b = \sum_j x_j(\text{column } j)$ and expand using linearity in that column. Every term except the $j = i$ one has a repeated column and so contributes zero, leaving $\det A_i = x_i\det A$. The rule is therefore not a separate theorem, just [[determinant-basics|column linearity]] applied once.

That argument shows any solution must be the quotient. When $\det A \ne 0$ the matrix is invertible and $\mathbf x = A^{-1}\mathbf b$ is a solution, so there is exactly one. When $\det A = 0$ the columns are dependent, so $A\mathbf v = \mathbf 0$ for some $\mathbf v \ne \mathbf 0$. Then if $\mathbf x_0$ is a solution, so is every $\mathbf x_0 + t\mathbf v$, infinitely many; otherwise there is none.

## Useful observations
- It earns its keep when a problem asks for one unknown out of three and the other two would otherwise be eliminated. Writing the single quotient is faster and far less error-prone than two rounds of substitution.
- It is the cleanest statement of solvability: $\det A \ne 0$ gives exactly one solution, and $\det A = 0$ gives none or infinitely many.
- For a system that is symmetric rather than generic it is not used at all, since [[add-all-equations|adding all the equations]] is a line of work instead of a page.

## Applications
One unknown out of a small linear system, solvability of a square system, and the dependence of a solution on a parameter.

## Contest profile
A number of problems in this library's database solve a system somewhere in the middle of a solution, and almost none of them need a general method, because contest systems are small and usually structured. Cramer's Rule is the fallback when the structure genuinely is not there, and the symmetric shape is checked first.
`,

"eigenvalues-characteristic": String.raw`
## Key forms
- $A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v} \ne \mathbf{0}$ exactly when $\det(A - \lambda I) = 0$, the characteristic polynomial
- $\alt{\sum_i \lambda_i = \operatorname{tr}A}{\lambda_1 + \cdots + \lambda_n = \operatorname{tr}A}$, the sum of the diagonal entries
- $\alt{\prod_i \lambda_i = \det A}{\lambda_1\lambda_2\cdots\lambda_n = \det A}$
- $A^n$ has eigenvalues $\lambda_i^n$ on the same eigenvectors, and $\operatorname{tr}(AB) = \operatorname{tr}(BA)$

## Conditions
$A$ is a square matrix, and $\lambda$ counts with multiplicity as a root of the characteristic polynomial. The diagonal form $A = PDP^{-1}$ needs $n$ independent eigenvectors.

## Why it works
$A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v} \ne \mathbf{0}$ says $A - \lambda I$ kills a nonzero vector, so its rows are dependent and its determinant vanishes. Expanding $\det(A - \lambda I)$ gives a degree-$n$ polynomial in $\lambda$ whose roots are the eigenvalues. [[vietas-general|Vieta's Formulas]] then identify the coefficient of $\lambda^{n-1}$ with the trace and the constant term with the determinant.

The identity $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ holds because both equal $\sum_{i, j}a_{ij}b_{ji}$. So $AB - BA$ always has trace $0$, and it can never equal the identity matrix, whose trace is $n$.

## Useful observations
- Eigenvalues are what turn $A^n$ into a closed form: if $A = PDP^{-1}$ then $A^n = PD^nP^{-1}$, using the [[matrix-inverse|inverse]] $P^{-1}$.
- The entries of $A^n$ are then fixed combinations of $\lambda_1^n, \ldots, \lambda_k^n$, which is the shape of the closed form of a linear recurrence.
- The characteristic polynomial of a transfer matrix is the characteristic equation of its recurrence, and the [[cayley-hamilton|Cayley–Hamilton Theorem]] covers matrices that cannot be diagonalized.
- [[matrix-tree-theorem|The matrix-tree theorem]] states a spanning-tree count as a product of Laplacian eigenvalues.

## Applications
Powers of a matrix, closed forms for linear recurrences, and trace and determinant identities.

## Contest profile
Olympiad-adjacent only. It is the machinery behind the transfer-matrix and matrix-tree cards of this library.
`,


"cofactor-expansion": String.raw`
## When to use
Determinants of size $4$ or more; determinants with a row or column of mostly zeros; families $D_n$ of $n \times n$ determinants with a banded pattern, such as $2$ on the diagonal and $1$ beside it; and determinants with a variable in some entries, such as characteristic polynomials, where expanding along the variable's row keeps the algebra organized. A $2 \times 2$ or $3 \times 3$ determinant is shorter by its direct formula, and a large numeric one is shorter by row operations to triangular form.

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

## Applications
The remainder of a polynomial divided by a quadratic or by a product of linear factors, a polynomial given by its remainders modulo several factors, and remainders of huge powers such as $x^{100}$ modulo $x^2 - 1$ or $x^2 + 1$.

## Contest profile
No problems here are tagged with it yet. On the AMC 12 and the AIME it appears as a polynomial known only by its remainders modulo two linear factors, asking for the remainder modulo their product.
`,

"add-all-equations": String.raw`
## When to use
The equations look alike, each obtained from the last by relabeling or rotating the variables, as in $x + y = 10$, $y + z = 14$, $z + x = 12$, or each equation is the total of all the variables plus or minus one of them, or the question asks for the sum of the variables, or some other combination of them, rather than the variables themselves. A general linear system with unrelated coefficients needs elimination instead, and nonlinear symmetric systems such as $x + y + z = 6$, $xy + yz + zx = 11$, $xyz = 6$ belong to [[vietas-general|Vieta's Formulas]].

## How
1. Decide what the sum should produce: the total $S$ of all the variables, or the exact expression the question asks for.
2. Add the equations that produce it, all of them for a symmetric or cyclic system, where every variable appears the same number $k$ of times and the left side is $kS$, or just a chosen group when that group's left sides add to the target.
3. Solve for $S$, the sum of the right sides divided by $k$.
4. Subtract each original equation from the right multiple of $S$, or subtract equations in pairs, to isolate each variable.
5. If $k = 0$, adding gives no information about $S$; use differences of equations instead.

For $x + y = 10$, $y + z = 14$, $z + x = 12$, adding all three gives $2S = 36$, so $S = 18$, and then $z = 18 - 10 = 8$, $x = 18 - 14 = 4$, and $y = 18 - 12 = 6$. A group can be enough: from $x + 2y = 7$ and $2y + 3z = 11$, the question "find $x + 4y + 3z$" is answered by adding just those two, $18$, though neither $x$, $y$, nor $z$ is determined.

{{figure:columns}}

## Why it works
Any sum of true equations is a true equation, so adding a group of them is always allowed. In a system unchanged by relabeling the variables, every variable occupies each position equally often across the equations, so in the sum every variable has the same coefficient and the sum is a multiple of $S$. Once $S$ is known, each equation of the form "$S$ minus one variable" or "$S$ plus one variable" names that variable directly.

## Formulas it uses
No formula is needed; the method is bookkeeping with the total of the variables.

## Common traps
- Dividing by the coefficient of $S$ when it is $0$, where the system has no unique solution.
- Solving for every variable when the question asks only for the total or another combination; look for a group of equations that adds to it.
- Miscounting how many times each variable appears after adding.

## Contest profile
A short AMC problem, often with four or five variables to make elimination tedious, and an AIME first step after a substitution turns a logarithmic system into a linear one.
`,

"time-per-leg": String.raw`
## When to use
A trip has stretches at different constant speeds, out and back, uphill and downhill, walking and riding, or two travelers cover the same route at different speeds, and a total time or a total distance is given while one leg is unknown. A single trip at one speed is plain distance equals rate times time, and two objects moving toward each other at once is relative motion; work problems, with jobs in place of distances, follow the same arithmetic.

## How
1. Cut the trip wherever the speed changes, and give each leg its distance $d_i$ and speed $v_i$.
2. Write each leg's time as $\frac{d_i}{v_i}$.
3. Set the sum of the times equal to the total time, and the sum of the distances equal to the total distance.
4. With two trips over the same route, subtract their time equations so that the shared legs cancel.
5. Convert every time to one unit before adding.

Walking at $3$ mph and running at $6$ mph covers $9$ miles in $2$ hours. With $w$ miles walked, $\frac w3 + \frac{9 - w}{6} = 2$, so $w = 3$.

{{figure:legs}}

## Why it works
On a leg at constant speed, distance equals speed times time, so the time is distance over speed. Distances along a route add, and the times of consecutive legs add, but speeds over different times do not average, because the legs last different amounts of time. The total-time and total-distance equations therefore hold exactly, and they are the only links between legs.

## Formulas it uses
- [[average-speed]]: total distance over total time, the quantity asked for when a problem wants the speed over the whole trip.
- [[relative-motion]]: two travelers moving toward each other close the gap at the sum of their speeds, which gives the time of a meeting leg.

## Common traps
- Averaging speeds, as in $\frac{4 + 8}{2} = 6$, instead of dividing total distance by total time.
- Mixing minutes and hours.
- Forgetting a leg, such as a rest stop or the return trip.

## Contest profile
A MATHCOUNTS and AMC 10 staple, usually one or two linear equations; AIME versions add rest stops, meeting points, or several travelers.
`,

"name-the-whole-expression": String.raw`
## When to use
The dots sit inside an expression, at the end of a radical, a fraction, or an exponent: $\sqrt{a + \sqrt{a + \cdots}}$, $a + \cfrac{1}{b + \cfrac{1}{a + \cdots}}$, or $x^{x^{\cdots}}$, or a finite nest has a repeating layer that can be collapsed.

The same move works on anything that contains a copy of itself. A geometric series satisfies $S = a + rS$, so $S = \frac{a}{1 - r}$, and a game that returns to its starting position with probability $q$, after a win with probability $p$, has a chance of winning $P$ with $P = p + qP$.

## How
1. Make sure the expression converges, or is defined as a limit.
2. Call its value $x$.
3. Find the copy of $x$ inside it: after one layer, or after one full period when the layers alternate.
4. Write the one-layer equation and solve it.
5. Reject roots that break a bound the expression must satisfy, such as positivity.

For $x = \sqrt{6 + \sqrt{6 + \cdots}}$, one layer gives $x = \sqrt{6 + x}$, so $x^2 = x + 6$ and $x = 3$, since $x = -2$ is negative.

{{figure:cobweb}}

## Why it works
If the infinite expression has a value, removing its first layer leaves exactly the same infinite expression, with the same value, so the value satisfies the one-layer equation. The equation alone cannot show the expression converges; that comes from a separate argument, usually that the partial nests increase and stay below a bound, which also picks out the right root.

## Formulas it uses
- [[quadratic-formula]]: the one-layer equation is usually a quadratic, with one root to reject.

## Common traps
- Keeping both roots of the quadratic.
- Skipping convergence: the tower $\sqrt2^{\sqrt2^{\cdots}}$ equals $2$, though $4$ also satisfies the tower equation.
- Treating a nest whose layers change, such as $\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}}$, as self-similar.

## Contest profile
A quick AMC question in its plain form; AIME versions alternate the layers or ask about a finite nest that collapses the same way.
`,

"substitute-repeated-block": String.raw`
## When to use
An equation repeats one block: $(x^2 + 3x)^2 - 2(x^2 + 3x) = 8$, or $4^x - 3 \cdot 2^x + 2 = 0$, where $4^x = (2^x)^2$. Often the block has to be produced first: $(x + 1)(x + 4) = x^2 + 5x + 4$ and $(x + 2)(x + 3) = x^2 + 5x + 6$ share the block $x^2 + 5x$, so a product of all four factors is a quadratic in that block.


The move is not limited to equations. To minimize $(x^2 + 2x + 3)(x^2 + 2x - 5)$, put $u = x^2 + 2x$, which can be any number from $-1$ up; the product is $u^2 - 2u - 15$, smallest at $u = 1$, where it equals $-16$. Inequalities, sums, and functional equations with a repeated inner expression simplify the same way.
## How
1. Find the block: an expression that appears more than once, or one that appears after pairing factors whose constants have equal sums.
2. Name it $u$ and rewrite the whole equation in $u$. If some $x$ is left over, the block was chosen wrongly.
3. Solve the equation in $u$.
4. Keep only the values the block can take: $2^x \gt 0$, a square root is at least $0$, and $x^2 + x \ge -\frac14$.
5. Solve "block $=$ each kept value" for $x$, or, when only a sum or product of roots is asked, read it from those equations with Vieta's Formulas.

For $4^x - 6 \cdot 2^x + 8 = 0$, put $u = 2^x$: then $u^2 - 6u + 8 = 0$, so $u = 2$ or $u = 4$, and $x = 1$ or $x = 2$.

## Why it works
A number $x$ solves the original equation exactly when the value of the block at $x$ solves the equation in $u$. So the solutions are the solutions of "block $= u_1$", together with those of "block $= u_2$", and so on, one simpler equation per root $u_i$.

## Formulas it uses
- [[quadratic-formula]]: the equation in $u$ is usually a quadratic, and so is each equation "block $= u_i$" when the block is quadratic in $x$.
- [[vietas-quadratic]]: each quadratic "block $= u_i$" gives the sum and product of its roots straight from its coefficients.
- [[exponent-laws]]: $4^x = (2^x)^2$ and $9^x = (3^x)^2$ show that two exponential terms are powers of one block.

## Common traps
- Keeping a value of $u$ the block cannot reach, such as $2^x = -1$, or a negative value for a square root.
- Counting complex roots when the question asks for real ones; check the discriminant of each equation "block $= u_i$".
- Squaring both sides when the block contains a root, which can create solutions that fail the original; check every answer.
- Stopping at the values of $u$ when the question asks about $x$.

## Contest profile
Common on the AMC 10, AMC 12, and AIME: a quartic, exponential, or radical equation that is a quadratic in disguise, usually asking for a sum or product of the real solutions.
`,

"averages-to-totals": String.raw`
## When to use
Statements such as "the average rises by $2$ when the next score is added", "after one number is removed, the rest average $40$", or "two classes with different averages take the same test". Whenever a group changes and averages are given before and after.


The same bookkeeping runs through every average that is a ratio of totals. An [[average-speed|average speed]] is total distance over total time, the concentration of a mixture is total solute over total volume, and an expected value adds over outcomes. In each case the totals add and the average does not, so the totals are what to track.
## How
1. Name the unknown count $n$, and any unknown values.
2. Write each stated average as a total: $n$ items with mean $m$ add up to $nm$.
3. Write the change as an equation between totals: adding a value $v$ gives the total $nm + v$ over $n + 1$ items.
4. Solve, then divide by the final count for any average that is asked for.

Five numbers average $12$, and after one is removed the other four average $10$: the totals are $60$ and $40$, so the removed number is $20$.

## Why it works
An average is a total divided by a count, so the total is the average times the count, and the totals of separate groups add. Averages do not add: the average of two groups combined is their averages weighted by the group sizes. Working with totals carries those weights automatically.

## Formulas it uses
- [[weighted-average]]: two groups merge to the average $\frac{n_1m_1 + n_2m_2}{n_1 + n_2}$, which is the combined total over the combined count.

## Common traps
- Averaging the averages of groups of different sizes.
- Dividing the new total by the old count after a value is added or removed.
- Reading "the average increases by $2$" as "the new value is $2$ more than the old average".

## Contest profile
A MATHCOUNTS and AMC 10 staple, and on the AMC 12 a step inside a problem with an unknown count.
`,

"setting-up-proportions": String.raw`
## When to use
A quantity grows in step with another at a fixed rate: laps and minutes at a constant speed, distance on a map and on the ground, the tagged share of a sample and of the whole lake, a recipe scaled up, or a price per item. Every change of units is the same move, and so is a ratio that must hold after a group is added to, as when a class whose girls and boys are in the ratio $3 : 2$ gains more boys. A rate that changes partway through, two speeds or two workers, is not one proportion: it belongs to [[work-rates|combined work rates]] or to separate legs of the trip. Several equal ratios combined at once are the business of [[proportion-properties|addendo and componendo]].

## How
1. Find the quantity that stays fixed: a speed, a scale, a share, or a price per item.
2. Write it twice as a fraction, once with known numbers and once with the unknown, keeping the same units in the same places, $\frac ab = \frac cx$.
3. Cross-multiply to $ax = bc$ and solve.
4. For a change of units, multiply by fractions equal to $1$, such as $\frac{1000\ \text{m}}{1\ \text{km}}$, arranged so that each unwanted unit cancels.
5. Check the size of the answer against the ratio: twice the time should give twice the laps.

If $4$ of $50$ fish in a sample are tagged, and $120$ fish were tagged in a lake of $x$ fish, then $\frac{4}{50} = \frac{120}{x}$, so $4x = 6000$ and $x = 1500$.

## Why it works
A fixed rate means the ratio of the two quantities is the same number $k$ every time, $\frac ab = k = \frac cx$. Multiplying both sides by $bx$, which is allowed because neither is $0$, clears both denominators and gives $ax = bc$. A conversion factor such as $\frac{1.6\ \text{km}}{1\ \text{mi}}$ is a ratio equal to $1$, so multiplying by it changes the units and not the amount. The move stops being valid when the relation is not a straight proportion: a fixed charge plus a rate, as in a taxi fare, or a rate that changes.

## Formulas it uses
No formula is needed; the move is one equation between two equal ratios.

## Common traps
- Putting the units in different places in the two fractions, which turns the answer upside down.
- Treating a fixed charge plus a rate as a proportion.
- Converting an area or a volume with the length factor: a square meter is $10^4$ square centimeters, not $100$.

## Contest profile
A step in the first problems of the AMC 10 and 12, and the first line of a capture-recapture or ratio-change setup on the AIME.
`,

"linear-elimination": String.raw`
## When to use
Each condition in the problem is a linear equation in a few unknowns, and there are as many independent conditions as unknowns: two prices from two shopping lists, a balance scale, a model $T = aL + bG$ with two data points, or dimensions that each grow by a fixed amount. When the equations are rotations of one another, or only a combination of the unknowns is asked for, [[add-all-equations|adding groups of equations]] is shorter. When one variable out of three is wanted, a determinant can give it at once.

## How
1. Name one unknown for each quantity, in units that keep the coefficients whole.
2. Write one equation per condition.
3. Pick the unknown to remove, scale two equations so that its coefficients match, and subtract.
4. Repeat until one unknown remains, or, when each equation links the next unknown to the last, substitute forward along the chain.
5. Solve, back-substitute, and check every original condition.

From $x + 2y = 8$ and $3x - y = 3$, doubling the second gives $6x - 2y = 6$, and adding it to the first gives $7x = 14$, so $x = 2$ and then $y = 3$.

## Why it works
Adding a multiple of one true equation to another gives a true equation, and the step can be undone by subtracting the same multiple, so the new system has exactly the same solutions as the old one. Each round removes one unknown. For two equations, taking $b_2$ times the first minus $b_1$ times the second leaves $(a_1b_2 - a_2b_1)\,x$ alone on the left. When $a_1b_2 - a_2b_1 \ne 0$ there is exactly one solution; when it is $0$ the two equations describe parallel lines, and the elimination ends in $0 = 0$ (infinitely many solutions) or $0 = c$ with $c \ne 0$ (none).

## Formulas it uses
- [[cramers-rule]]: the same elimination carried out once in general, which gives a single unknown directly as a ratio of determinants and says when the solution is unique.

## Common traps
- Scaling only one side of an equation.
- Solving for every unknown when one subtraction already gives the combination the question asks for.
- Missing that the system is dependent, so that elimination ends in $0 = 0$ and the answer is not determined.

## Contest profile
A step in the early AMC 10 and 12 problems and the setup of many word problems; on the AIME it usually follows a substitution that makes a nonlinear system linear.
`,

"repeated-block-equation": String.raw`
## Distinguishing clues
- The degree looks high, often four, yet the equation has more structure than a general quartic.
- One expression appears twice, exponential terms share a base up to squaring, or four linear factors have constants that pair to equal sums, as $1 + 4 = 2 + 3$.
- Not this pattern: a general quartic with no repetition, which is a root-finding problem, or an expression that contains a copy of itself, such as an infinite nested radical, which is the related [[infinite-nest|self-similar expression]], where the whole expression is named rather than a piece of it.

## Methods and Formulas to Try
The repeated piece is the real unknown. Name it, solve the smaller equation, and return to $x$ one value at a time.

### Methods to try
- [[substitute-repeated-block]]: name the repeated expression $u$, solve for $u$, and keep only the values the expression can take.
- [[palindromic-polynomials]]: a polynomial with symmetric coefficients hides the block $x + \frac1x$, which appears after dividing by the middle power of $x$.
- [[log-substitution]]: logarithms of one quantity in several places, possibly in different bases, form one block once every log is in the same base.

### Formulas to try
- [[vietas-quadratic]]: each equation "block $= u_i$" is usually a quadratic, so the sum and product of its roots come from its coefficients.
- [[exponent-laws]]: $4^x = (2^x)^2$ shows that two exponential terms are powers of one block.
- [[change-of-base]]: $\log_x 4 = \frac{2}{\log_2 x}$ rewrites a log with a variable base in terms of the block $\log_2 x$.

## Common traps
- Pairing the wrong factors; pair them so the two products share their $x^2$ and $x$ terms.
- Forgetting the range of the block: $2^x$ is positive, and $x^2 + 5x$ is at least $-\frac{25}{4}$.
- Reporting values of the block instead of values of $x$.

## Contest profile
A staple from the AMC 10 to the AIME: quartics built from four linear factors, exponential equations in $2^x$ and $4^x$, and radical equations whose radicand matches the rest of the equation, usually asking for a sum or product of real solutions.
`,

"averages-before-after": String.raw`
## Distinguishing clues
- Two or more averages describe nearly the same group.
- An unknown count, the giveaway that the problem wants equations in totals rather than arithmetic with averages.
- Averages that belong to overlapping subgroups, where each element is counted in several of them.
- Not this pattern: a single average with nothing changing, which is only a total in disguise, or an [[average-speed|average speed]] over the legs of a trip, a different setup of total distance over total time.

## Methods and Formulas to Try
The averages hide the totals that actually change, and totals are what add.

### Methods to try
- [[averages-to-totals]]: rewrite each average as count times mean, and keep the books in totals.
- [[add-all-equations]]: with overlapping subgroups every element appears equally often, so adding the equations for the totals gives the grand total at once.

### Formulas to try
- [[weighted-average]]: two groups merge to the average $\frac{n_1m_1 + n_2m_2}{n_1 + n_2}$.
- [[arithmetic-series]]: when the values are consecutive integers, their average is the average of the first and last, which pins down the count after one is removed.

## Common traps
- Averaging the averages of groups of different sizes.
- Losing track of the count after a value is added or removed.
- Forgetting, with overlapping subgroups, that each element is counted several times.

## Contest profile
MATHCOUNTS and AMC 10 problems with a value added or removed, and AMC 12 versions where the count is unknown or the subgroups overlap.
`,

"take-logs-linearize": String.raw`
## When to use
Several equations multiply and raise the unknowns to powers: $x^2y^3 = 2^{13}$ and $x^3y = 2^9$, or $2^x = 3^y = 6^z$, or an unknown in an exponent, as in $5^x = 3$. Additive tools do not touch these, but logarithms make them linear. Logarithms do not split sums, so an unknown inside a sum is not helped.


Logarithms also size and compare huge numbers. In base $10$, $2^{100}$ has logarithm $100 \cdot 0.30103 \approx 30.10$ and $3^{63}$ has $63 \cdot 0.47712 \approx 30.06$, so $2^{100}$ is larger, and the integer part of the logarithm gives the [[digit-count|number of digits]].
## How
1. Check that every quantity you take a logarithm of is positive.
2. Choose a base that makes the constants simple: base $2$ when the constants are powers of $2$, or any base when only ratios of logarithms matter.
3. Take logarithms of both sides of every equation, so $\log(x^ay^b) = a\log x + b\log y$.
4. Solve the linear system for $X = \log x$, $Y = \log y$, and so on.
5. Exponentiate back, or keep the logarithms if the question asks for a logarithm or a ratio.

If $2^x = 3^y = 6^z = k$, then $x = \log_2 k$, $y = \log_3 k$, $z = \log_6 k$, and $\frac1x + \frac1y = \log_k 2 + \log_k 3 = \log_k 6 = \frac1z$.

## Why it works
The logarithm is one-to-one on positive numbers and turns products into sums and powers into multiples, so an equation between positive products holds exactly when the matching linear equation between logarithms holds. Solving the linear system therefore finds exactly the solutions of the original.

## Formulas it uses
- [[log-rules]]: $\log(xy) = \log x + \log y$ and $\log x^a = a\log x$, the two rules that make the equations linear.
- [[change-of-base]]: $\log_b a = \frac{\log a}{\log b}$ moves every logarithm into the one base chosen, and turns $\log_k 2$ into $\frac{1}{\log_2 k}$.

## Common traps
- Taking the logarithm of a quantity that could be zero or negative.
- Mixing bases partway through; pick one base and convert everything into it.
- Writing $\log(x + y)$ as $\log x + \log y$; only products split.

## Contest profile
AMC 12 and AIME: systems of power equations, chains such as $a^x = b^y = c^z$, and equations with the unknown in an exponent, usually asking for a product, a ratio, or a logarithm of the answer.
`,

"polar-form": String.raw`
## When to use
Powers such as $(1 + i\sqrt3)^{10}$, products and quotients of several complex numbers, roots of $z^n = w$, and any condition on $|z|$ or on an angle. Rectangular form is better for sums; polar form is better for everything multiplicative.


Polar form reaches beyond complex-number questions. Trigonometric identities come from powers, since $\cos 3\theta$ is the real part of $(\cos\theta + i\sin\theta)^3$, and a sum of cosines of equally spaced angles is the real part of a geometric series of points on a circle.
## How
1. For each number find its modulus $r = \sqrt{a^2 + b^2}$ and its argument $\theta$, the angle from the positive real axis, using the quadrant of $a + bi$.
2. Write it as $re^{i\theta}$, or $r(\cos\theta + i\sin\theta)$.
3. Multiply moduli and add arguments for products; divide and subtract for quotients; for an $n$th power, raise the modulus to the $n$th power and multiply the argument by $n$.
4. Reduce the final argument modulo $360^\circ$ and convert back to $a + bi$ if needed.

For $z^3 = 8i$, write $8i = 8e^{i\pi/2}$; the cube roots have modulus $2$ and arguments $\frac{\pi}{6} + \frac{2\pi k}{3}$ for $k = 0, 1, 2$.

## Why it works
By Euler's Formula $e^{i\alpha}e^{i\beta} = e^{i(\alpha + \beta)}$, which is the angle-addition formulas for sine and cosine in one line. So multiplying by $se^{i\beta}$ scales every point by $s$ and rotates it by $\beta$, and repeating that $n$ times multiplies the angle by $n$.

## Formulas it uses
- [[eulers-formula]]: $e^{i\theta} = \cos\theta + i\sin\theta$, the bridge between the two forms.
- [[de-moivre]]: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$, for powers.
- [[complex-basics]]: the modulus $|a + bi| = \sqrt{a^2 + b^2}$ and $z\bar z = |z|^2$.

## Common traps
- Taking the argument from $\arctan\frac{b}{a}$ without checking the quadrant.
- Forgetting the other $n - 1$ roots of $z^n = w$, spaced $\frac{360^\circ}{n}$ apart.
- Using polar form for a sum, where it does not help.

## Contest profile
AMC 12 and AIME: powers and products of complex numbers, roots of $z^n = w$, and conditions on a modulus or an angle, often followed by a count or a sum of the solutions.
`,

"log-system": String.raw`
## Distinguishing clues
- The equations involve the same few unknowns only through products, quotients, powers, and logarithms, with no sum of two unknowns inside a logarithm, which makes the system linear in the logarithms.
- Not this pattern: a single equation such as $\log_2 x + \log_4 x = 6$, which is one substitution, or a logarithm of a sum, such as $\log(x + y)$, which does not split and needs another idea.

## Methods and Formulas to Try
Name the logarithms of the unknowns as new variables; the rules of logarithms then make every equation linear in them.

### Methods to try
- [[log-substitution]]: set $X = \log x$, $Y = \log y$, $Z = \log z$, or $u = \log_x y$ when the bases are unknown, and solve for the new variables.
- [[take-logs-linearize]]: when the system arrives as products and powers, take logarithms of every equation first.
- [[add-all-equations]]: symmetric systems such as $\log(xy)$, $\log(yz)$, $\log(zx)$ add to twice $\log(xyz)$, which gives each unknown by subtraction.

### Formulas to try
- [[log-rules]]: products split into sums and powers come down as coefficients.
- [[change-of-base]]: $\log_x y = \frac{\log y}{\log x}$ and $\log_y x = \frac{1}{\log_x y}$ put every logarithm in one base.
- [[log-swap-identity]]: $a^{\log_b c} = c^{\log_b a}$, which untangles unknowns that appear both as a base and inside an exponent.

## Common traps
- Splitting $\log(x + y)$ as if it were $\log x + \log y$.
- Dropping the conditions that every argument is positive and every base is positive and not $1$.
- Mixing bases in the same equation without converting.

## Contest profile
An AIME favorite and an occasional AMC 12 problem: three equations in $\log(xy)$, $\log(yz)$, $\log(zx)$, or two equations in $\log_x y$, usually asking for a product, a sum, or a logarithm of the answer.
`,

"complex-modulus-argument": String.raw`
## Distinguishing clues
- The conditions are about size and direction: $|z| = 1$, $|z - a| = r$, an argument, or a power of $z$ that must be real or equal to $1$.
- Writing $z = a + bi$ would turn these into a pair of circle equations, while polar form turns them into one condition on an angle.
- Not this pattern: a sum of complex numbers with nothing said about moduli or angles, which is ordinary algebra in $a + bi$.

## Methods and Formulas to Try
Size and direction are the polar coordinates of $z$, so the conditions are simplest in polar form.

### Methods to try
- [[polar-form]]: write $z = re^{i\theta}$, so the modulus condition fixes $r$ and the rest becomes an equation in $\theta$.
- [[complex-bash]]: when the numbers are points of a figure, a condition such as $|z| = 1$ places them on the unit circle, where rotations and reflections are multiplications.

### Formulas to try
- [[complex-basics]]: $z\bar z = |z|^2$, so $|z| = 1$ gives $\bar z = \frac1z$, which removes conjugates from an equation.
- [[de-moivre]]: powers multiply the argument, so $z^n$ is real exactly when $n\theta$ is a multiple of $\pi$.
- [[roots-of-unity]]: the solutions of $z^n = 1$ are $n$ equally spaced points on the unit circle.

## Common traps
- Replacing $\bar z$ by $\frac1z$ when $|z|$ is not $1$; in general $\bar z = \frac{|z|^2}{z}$.
- Losing solutions by taking only one argument, when the argument is defined up to multiples of $2\pi$.
- Forgetting that $z = 0$ has no argument.

## Contest profile
AMC 12 and AIME: an equation in a complex number and its conjugate on the unit circle, a power that must be real, or a count of complex numbers meeting conditions on modulus and angle.
`,

"name-the-floor": String.raw`
## When to use
A condition mixes $\lfloor x \rfloor$, $\{x\}$, and $x$ itself: $\lfloor x \rfloor + 2\{x\} = 3.5$, or $x^2 = 10\lfloor x \rfloor - 9$. The same split proves floor identities, such as $\lfloor 2x \rfloor = 2\lfloor x \rfloor$ or $2\lfloor x \rfloor + 1$ depending on whether $f$ is below or above $\frac12$, and it settles inequalities that involve a floor. If only $\lfloor x \rfloor$ appears, $x$ is really an integer and no split is needed.

## How
1. Write $x = n + f$ with $n$ an integer and $0 \le f \lt 1$; then $\lfloor x \rfloor = n$ and $\{x\} = f$.
2. Rewrite the condition in $n$ and $f$. A term such as $\lfloor 2x \rfloor$ splits into cases $f \lt \frac12$ and $f \ge \frac12$.
3. Solve for $f$ in terms of $n$, or bound $n$ from $n \le x \lt n + 1$.
4. Keep the integers $n$ for which $f$ lands in $[0, 1)$, and assemble $x = n + f$.

From $\lfloor x \rfloor + 2\{x\} = 3.5$: $2f = 3.5 - n$ must lie in $[0, 2)$, so $n = 2$ or $n = 3$, giving $x = 2.75$ or $x = 3.25$.

## Why it works
Every real number has exactly one such split, so the condition on $x$ is the same as the condition on the pair $(n, f)$. The pair has a rigid shape, an integer and a number in $[0, 1)$, and that shape is what cuts the possibilities down.

## Formulas it uses
- [[floor-basics]]: $\lfloor x + m \rfloor = \lfloor x \rfloor + m$ for an integer $m$, and $x - 1 \lt \lfloor x \rfloor \le x$, the inequalities that bound $n$.
- [[hermite-identity]]: $\lfloor x \rfloor + \lfloor x + \frac1k \rfloor + \cdots + \lfloor x + \frac{k-1}{k} \rfloor = \lfloor kx \rfloor$, proved by this split with cases on $f$.

## Common traps
- Allowing $f = 1$; the fractional part is strictly less than $1$.
- Forgetting negative $x$: $\lfloor -2.3 \rfloor = -3$ and $\{-2.3\} = 0.7$.
- Solving for $f$ and not checking that it lies in $[0, 1)$ for each $n$.

## Contest profile
AMC 10, AMC 12, and AIME equations mixing $x$, $\lfloor x \rfloor$, and $\{x\}$, usually asking for the number of solutions or their sum.
`,

"group-equal-floors": String.raw`
## When to use
Long sums such as $\lfloor \sqrt1 \rfloor + \lfloor \sqrt2 \rfloor + \cdots + \lfloor \sqrt{50} \rfloor$, and counts such as "how many distinct values does $\lfloor \frac{k^2}{1000} \rfloor$ take for $k \le 1000$". The same grouping counts digits (the numbers with $d$ digits form one block) and splits any sum whose terms depend only on which range $k$ lies in.

A sum of floors of $\frac{ak}{n}$ over $k = 1, \ldots, n - 1$ is better paired from its two ends, as in [[fx-pairing|pairing symmetric terms]].

## How
1. For each value $m$, solve $m \le f(k) \lt m + 1$ for $k$; for an increasing $f$ this is one block of consecutive integers.
2. Count the block: for $\lfloor \sqrt k \rfloor = m$ it is $k = m^2, \ldots, (m + 1)^2 - 1$, which is $2m + 1$ values.
3. Add $m$ times the block size over all complete blocks.
4. Handle the last, partial block separately.

The numbers from $1$ to $999$ use $9 \cdot 1 + 90 \cdot 2 + 900 \cdot 3 = 2889$ digits, one block for each number of digits.

## Why it works
Adding the same terms in a different order does not change the sum. Sorting the terms by their value $m$ puts equal terms together, and a run of $c_m$ terms equal to $m$ adds to $m\,c_m$.

## Formulas it uses
- [[floor-basics]]: $\lfloor f(k) \rfloor = m$ exactly when $m \le f(k) \lt m + 1$, which is how each block is found.
- [[power-sums]]: block sizes such as $2m + 1$ make the total a sum of $m$ and $m^2$, evaluated in closed form.

## Common traps
- Forgetting the last block is usually cut short by the end of the range.
- Off-by-one block sizes: $m^2$ to $(m + 1)^2 - 1$ has $2m + 1$ terms, not $2m$.
- Assuming the blocks have the same size; their lengths usually grow with $m$.

## Contest profile
AMC and AIME sums of floors of square roots, logarithms, or quadratics over a long range, and questions counting the distinct values such a floor takes.
`,

"floor-sum-range": String.raw`
## Distinguishing clues
- The sum has many terms, each a floor of one expression in the index, and the question wants an exact total or a count of distinct values.
- A slowly growing inside, such as $\sqrt k$ or $\log_2 k$, which signals blocks of equal terms.
- An inside linear in $k$ with a fraction $\frac{a}{n}$, summed from $k = 1$ to $n - 1$, which signals pairing from the ends.
- Not this pattern: a single equation with a floor, which is solved by splitting $x$ into its integer and fractional parts.

## Methods and Formulas to Try
Two structures make the sum short: equal terms in long runs, and terms whose fractional parts cancel in pairs.

### Methods to try
- [[group-equal-floors]]: count how many $k$ give each value of the floor and add value times count.
- [[fx-pairing]]: pair the term at $k$ with the term at $n - k$; when the two insides add to an integer $N$ and are not integers themselves, their floors add to $N - 1$.

### Formulas to try
- [[floor-basics]]: $\lfloor y \rfloor = m$ exactly when $m \le y \lt m + 1$, which locates each block.
- [[hermite-identity]]: $\lfloor x \rfloor + \lfloor x + \frac1k \rfloor + \cdots + \lfloor x + \frac{k-1}{k} \rfloor = \lfloor kx \rfloor$, which collapses evenly shifted floors.
- [[legendres-formula]]: the sum $\lfloor \frac{n}{p} \rfloor + \lfloor \frac{n}{p^2} \rfloor + \cdots$ is the exponent of $p$ in $n!$.
- [[floor-multiples]]: $\lfloor \frac{n}{d} \rfloor$ counts the multiples of $d$ up to $n$, the meaning behind many floor sums.

## Common traps
- Miscounting the last, partial block.
- Pairing terms whose insides are integers, where the pair sum is $N$, not $N - 1$.
- Assuming every value in a range is taken when the floor jumps by more than $1$ at a time.

## Contest profile
AMC 12 and AIME sums of floors of square roots or logarithms, counts of distinct values of a floor of a quadratic, and sums of $\lfloor \frac{ak}{n} \rfloor$ that pair up.
`,

"floor-equation": String.raw`
## Distinguishing clues
- One real unknown appears both as itself and inside a floor or a fractional part.
- Not this pattern: an equation in which only $\lfloor x \rfloor$ appears, where the unknown is really an integer and the problem is a number theory problem in $n$, or a long sum of floors with no unknown real number, which is a counting problem handled by grouping equal terms.

## Methods and Formulas to Try
The floor is an integer and the fractional part lies in $[0, 1)$; those two facts, plus $n \le x \lt n + 1$, leave only a few cases.

### Methods to try
- [[name-the-floor]]: write $x = n + f$, solve for $f$ or $x$ in terms of $n$, and keep the integers $n$ that put $f$ in $[0, 1)$.
- [[casework-method]]: floors of multiples such as $\lfloor 2x \rfloor$ split into cases by which part of $[0, 1)$ the fractional part lies in.

### Formulas to try
- [[floor-basics]]: $n \le x \lt n + 1$ and $\lfloor x + m \rfloor = \lfloor x \rfloor + m$ for an integer $m$.
- [[hermite-identity]]: rewrites a sum of evenly shifted floors as one floor.

## Common traps
- Checking only $n \le x$ and forgetting $x \lt n + 1$, or the reverse.
- Missing negative solutions, where the floor rounds away from zero.
- Squaring or dividing without checking the sign of what was squared or divided by.

## Contest profile
AMC and AIME problems asking for the number of real solutions of such an equation, or their sum or product, typically solved by bounding the integer part and checking a few cases.
`,

"mean-median-mode": String.raw`
## Key forms
- $\bar x = \frac{x_1 + x_2 + \cdots + x_n}{n}$ — the mean, so the sum of the list is $n\bar x$
- the median — the middle value of the sorted list, or the average of the two middle values when $n$ is even
- the mode — the value that appears most often; a list can have several modes, or none if every value appears once
- $\max - \min$ — the range
- changing one value by $d$ changes the mean by $\frac dn$
- adding $c$ to every value adds $c$ to the mean, median, and mode and leaves the range alone; multiplying every value by $k$ multiplies the mean, median, and mode by $k$ and the range by $\lvert k\rvert$

## Conditions
A finite list of numbers, with repeated values counted as often as they appear. The median needs the list sorted first.

## Why it works
The mean is the balance point of the list: the deviations $x_i - \bar x$ always add up to $0$, because their sum is $(x_1 + \cdots + x_n) - n\bar x$. The median is the point with half the values on each side, so it depends only on the order of the values near the middle; pushing the largest value even larger does not move it at all, while the mean moves by the change divided by $n$.

## Useful observations
- An outlier pulls the mean toward itself but leaves the median unchanged unless it crosses the middle.
- The mean minimizes the sum of squared deviations $\sum (x_i - t)^2$, while the median minimizes the sum of absolute deviations $\sum \lvert x_i - t\rvert$, the fact behind [[median-minimizes-abs|the median trick]].
- For consecutive integers, or any arithmetic progression, the mean and the median are equal, both the average of the first and last terms.
- When several statistics of an unknown list are fixed, a value is as large as possible exactly when the other values are as small as the conditions allow.

## Applications
Summarizing data sets, and lists of unknown numbers described by some of their statistics.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 staple: lists with a given mean, median, and mode, and the largest or smallest value or range such a list can have.
`,

"percent-change": String.raw`
## Key forms
- $\text{new} = \text{old} \cdot \left(1 + \frac{p}{100}\right)$ — a change of $p$ percent, with $p$ negative for a decrease
- $\frac{\text{new} - \text{old}}{\text{old}} \cdot 100\%$ — the percent change from old to new
- $\left(1 + \frac{p}{100}\right)\left(1 + \frac{q}{100}\right)$ — the factor for two successive changes, in either order
- $\left(1 + \frac{x}{100}\right)\left(1 - \frac{x}{100}\right) = 1 - \frac{x^2}{10000}$ — up $x\%$ then down $x\%$ is a net loss of $\frac{x^2}{100}$ percent
- $A = P(1 + r)^n$ — compound growth at rate $r$ per period for $n$ periods; simple interest is $A = P(1 + rn)$, and compounding $k$ times a year gives $P\left(1 + \frac rk\right)^{kn}$

## Conditions
Each percent is taken of the value at that moment, not of the original, unless the problem says otherwise.

## Why it works
Percent means per hundred, so $p\%$ of a quantity is $\frac{p}{100}$ of it, and adding that to the quantity multiplies it by $1 + \frac{p}{100}$. Each later change multiplies the current value again, so successive changes multiply, and since multiplication does not care about order, neither do the changes. The same reasoning applied $n$ times at one rate gives $(1 + r)^n$.

## Useful observations
- Undoing a change of $p\%$ takes a change of $\frac{-p}{100 + p} \cdot 100\%$: undoing a $25\%$ increase is a $20\%$ decrease, since $\frac{1}{1.25} = 0.8$.
- $x\%$ of $y$ equals $y\%$ of $x$, since both are $\frac{xy}{100}$.
- Equal percent increases and decreases never cancel; the result is always below the start.
- A quantity growing at $r\%$ per period roughly doubles in $\frac{72}{r}$ periods.

## Applications
Prices with markups and discounts, populations and investments that grow by a fixed percent, and mixtures whose concentration changes.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 staple: successive discounts, a change and its reversal, and interest or growth over several periods.
`,

"quadratic-forms": String.raw`
## Key forms
- $ax^2 + bx + c$ — standard form: the $y$-intercept is $c$
- $a(x - h)^2 + k$ — vertex form: the vertex is $(h, k)$, with $h = -\frac{b}{2a}$ and $k = c - \frac{b^2}{4a}$
- $a(x - r)(x - s)$ — factored form: the roots are $r$ and $s$, with $r + s = -\frac ba$ and $rs = \frac ca$
- $a(x - p)(x - q) + c$ — the quadratic that takes the same value $c$ at $x = p$ and at $x = q$, with its axis at $x = \frac{p + q}{2}$; a small case of [[subtract-and-factor|Turning Known Values into Known Roots]]
- $h = \frac{r + s}{2}$ — the vertex lies halfway between the roots

## Conditions
$a \ne 0$. The factored form exists over the reals only when $b^2 - 4ac \ge 0$; with complex roots it still holds, with $r$ and $s$ conjugates.

## Why it works
Each form expands to the standard one. Expanding $a(x - h)^2 + k$ gives $ax^2 - 2ahx + ah^2 + k$, so matching coefficients gives $b = -2ah$ and $c = ah^2 + k$, which is $h = -\frac{b}{2a}$ and $k = c - \frac{b^2}{4a}$; going from standard to vertex form is [[completing-the-square|completing the square]]. Expanding $a(x - r)(x - s) = ax^2 - a(r + s)x + ars$ gives $r + s = -\frac ba$ and $rs = \frac ca$, which is [[vietas-quadratic|Vieta's Formulas]].

Then $h = -\frac b{2a} = \frac{r + s}2$, halfway between the roots. The form $a(x - p)(x - q) + c$ equals $c$ at $p$ and $q$, and it is the factored form shifted up by $c$, so its axis is $x = \frac{p + q}2$. Since $a(x - h)^2 \ge 0$ when $a \gt 0$, the smallest value is $k$, and the largest when $a \lt 0$.

Three points fix the quadratic: two quadratics through the same three points differ by a polynomial of degree at most $2$ with three roots, which is $0$. With the vertex known, $h$ and $k$ are fixed and one more point gives $a$; with the roots known, one more point gives $a$ in the factored form.

## Useful observations
- The axis of symmetry is $x = h$, halfway between the roots and between any two points of the parabola at the same height.
- The vertex form shows the range at once: for $a \gt 0$ the smallest value is $k$, and for $a \lt 0$ the largest value is $k$.
- A quadratic is determined by any three points, or by its vertex and one more point, or by its two roots and one more point.
- Subtracting $c$ from the equal-values form leaves a quadratic whose roots are $p$ and $q$, the whole idea of the general method in its smallest case.

## Applications
Reading the vertex, roots, intercepts, or extreme value of a quadratic, and finding a quadratic from information of each kind.

## Contest profile
A MATHCOUNTS and AMC 10 staple: building a quadratic from a vertex and a point, or from its roots, and switching forms to read off what a question asks.
`,

"matrix-inverse": String.raw`
## Key forms
- $\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ — the $2 \times 2$ inverse
- $A^{-1} = \frac{\operatorname{adj} A}{\det A}$ — the general formula, where $\operatorname{adj} A$ is the transpose of the matrix of cofactors
- $A$ is invertible $\iff \det A \ne 0$
- $(AB)^{-1} = B^{-1}A^{-1}$, $\ (A^{\top})^{-1} = (A^{-1})^{\top}$, $\ \det(A^{-1}) = \frac{1}{\det A}$
- $A\mathbf{x} = \mathbf{b} \iff \mathbf{x} = A^{-1}\mathbf{b}$ — the unique solution of an invertible system

## Conditions
$A$ is square. When $\det A = 0$ there is no inverse, and the system $A\mathbf{x} = \mathbf{b}$ has no solution or infinitely many.

## Why it works
Expanding a determinant along row $i$ with the cofactors of row $i$ gives $\det A$; using the cofactors of a different row instead computes the determinant of a matrix with two equal rows, which is $0$. In matrix language that is $A \cdot \operatorname{adj} A = (\det A)\,I$, so dividing by $\det A$ gives the inverse. For a $2 \times 2$ matrix, multiplying out $\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix} = (ad - bc)I$ checks it directly. Conversely, $\det A \cdot \det A^{-1} = \det I = 1$ shows that a matrix with determinant $0$ cannot have an inverse.

## Useful observations
- [[cramers-rule|Cramer's Rule]] is $\mathbf{x} = A^{-1}\mathbf{b}$ read one coordinate at a time.
- A matrix with integer entries has an inverse with integer entries exactly when its determinant is $1$ or $-1$.
- The order reverses in $(AB)^{-1} = B^{-1}A^{-1}$ because the last transformation applied must be undone first.

## Applications
Solving square linear systems, undoing a linear transformation, and changing coordinates, as in writing $A^n = PD^nP^{-1}$.

## Contest profile
Rare on answer-only contests; it appears in olympiad and AIME problems phrased with matrices, and as background for diagonalization and Cramer's Rule.
`,

"cayley-hamilton": String.raw`
## Key forms
- $p(A) = 0$ where $p(\lambda) = \det(\lambda I - A)$ — every square matrix satisfies its characteristic polynomial
- $A^2 - (\operatorname{tr}A)\,A + (\det A)\,I = 0$ — the $2 \times 2$ case
- $A^{n+2} = (\operatorname{tr}A)\,A^{n+1} - (\det A)\,A^n$ — so every entry of $A^n$ satisfies the linear recurrence with characteristic polynomial $p$
- $A^{-1} = \frac{(\operatorname{tr}A)\,I - A}{\det A}$ — the $2 \times 2$ inverse, read off the theorem

## Conditions
$A$ is any square matrix, diagonalizable or not, with entries in any field.

## Why it works
For a $2 \times 2$ matrix the theorem is a direct computation. With $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, $A^2 = \begin{pmatrix} a^2 + bc & b(a + d) \\ c(a + d) & d^2 + bc \end{pmatrix}$, and subtracting $(a + d)A$ leaves $(bc - ad)I = -(\det A)\,I$.

In general, let $B(\lambda) = \operatorname{adj}(\lambda I - A)$, a matrix whose entries are polynomials in $\lambda$ of degree at most $n - 1$. The adjugate identity gives $B(\lambda)(\lambda I - A) = p(\lambda)\,I$. Writing $B(\lambda) = B_0 + B_1\lambda + \cdots + B_{n-1}\lambda^{n-1}$ and $p(\lambda) = c_0 + c_1\lambda + \cdots + \lambda^n$ and comparing the coefficients of each power of $\lambda$ gives $n + 1$ matrix equations. Multiplying the equation for $\lambda^k$ by $A^k$ on the right and adding them all, the left sides telescope to $0$ and the right sides add up to $p(A)$.

## Useful observations
- It replaces diagonalization: $A^n = PD^nP^{-1}$ needs $A$ to be diagonalizable, while the recurrence for $A^n$ always holds.
- For a [[transfer-matrix-method|transfer matrix]] $M$, the counts $\mathbf{u}^{\top}M^n\mathbf{v}$ satisfy the recurrence whose characteristic polynomial is $\det(\lambda I - M)$, which is why a transfer matrix always yields a linear recurrence.
- For $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$, $p(\lambda) = \lambda^2 - \lambda - 1$, so $A^{n+2} = A^{n+1} + A^n$: the Fibonacci recurrence in matrix form.

## Applications
Computing powers and inverses of small matrices, and deriving linear recurrences from matrices.

## Contest profile
An olympiad tool, and the step that justifies a recurrence obtained from a transfer matrix.
`,

"vandermonde-determinant": String.raw`
## Key forms
- $\det\left[x_i^{\,j-1}\right] = \alt{\prod_{i \lt j}(x_j - x_i)}{(x_2 - x_1)(x_3 - x_1)\cdots(x_n - x_{n-1})}$ — the $n \times n$ Vandermonde determinant
- $\begin{vmatrix} 1 & a & a^2 \\ 1 & b & b^2 \\ 1 & c & c^2 \end{vmatrix} = (b - a)(c - a)(c - b)$ — the $3 \times 3$ case
- the determinant is nonzero $\iff$ the $x_i$ are distinct

## Conditions
The rows are consecutive powers $x_i^0, x_i^1, \ldots, x_i^{n-1}$ of the same number; the transpose, with powers down the columns, has the same determinant.

## Why it works
Treat $x_n$ as a variable and the other $x_i$ as fixed. The determinant is then a polynomial in $x_n$ of degree $n - 1$, and it vanishes at $x_n = x_1, \ldots, x_{n-1}$, since each makes two rows equal. So it equals $c\,(x_n - x_1)\cdots(x_n - x_{n-1})$, where $c$ is the coefficient of $x_n^{n-1}$, which is the cofactor of that entry: the Vandermonde determinant of $x_1, \ldots, x_{n-1}$. Induction on $n$ finishes the product.

## Useful observations
- Fitting a polynomial $a_0 + a_1x + \cdots + a_{n-1}x^{n-1}$ through $n$ points is a linear system whose matrix is the Vandermonde matrix, so distinct $x$-values give exactly one solution, the [[lagrange-interpolation-formula|interpolating polynomial]].
- For the roots of a polynomial, the square of the Vandermonde determinant is the [[resultant-discriminant|discriminant]], up to a power of the leading coefficient.
- Swapping two of the $x_i$ swaps two rows and flips the sign, matching the antisymmetry of the product of differences.

## Applications
Interpolation and uniqueness of polynomials, discriminants, and olympiad problems about determinants built from powers.

## Contest profile
An olympiad algebra tool, usually appearing as the reason a linear system in polynomial coefficients has a unique solution.
`,

"several-rates": String.raw`
## Distinguishing clues
- Two or more rates appear in one story: speeds, jobs per hour, liters per minute.
- Agents acting at the same time on one task, whose rates add, as for two pipes filling a tank or two runners closing a gap.
- One agent acting in stages, whose times add and whose rates do not, which is why the average speed of a round trip is not the average of the two speeds.
- Not this pattern: a story with one rate, which is plain distance equals rate times time, or a story that gives averages of a group of numbers, a different setup about [[averages-before-after|averages before and after a change]].

## Methods and Formulas to Try
Name what acts at the same time and what acts in sequence; rates add across the first, times across the second.

### Methods to try
- [[time-per-leg]]: cut the trip wherever the speed changes, write each leg's time as distance over speed, and add the times.
- [[averages-to-totals]]: an average speed is total distance over total time, so work with the totals, never with an average of the speeds.

### Formulas to try
- [[work-rates]]: rates of agents working together add, so a job takes $\frac{1}{r_1 + r_2 + \cdots}$ of the time units.
- [[average-speed]]: total distance over total time; for two equal distances it is the harmonic mean $\frac{2v_1v_2}{v_1 + v_2}$.
- [[relative-motion]]: approaching objects close a gap at the sum of their speeds and one chasing another at the difference, and a current adds to speed downstream and subtracts upstream.

## Common traps
- Averaging two speeds instead of dividing total distance by total time.
- Adding times for agents that work at the same time, or adding rates for stages that happen one after another.
- Mixing units, such as minutes with hours.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 staple that returns on the AIME with several legs or travelers and a single unknown speed or time.
`,

"odd-even-functions": String.raw`
## Key forms
- $f(-x) = f(x)$ for every $x$ in the domain: $f$ is even, and its graph is symmetric in the $y$-axis
- $f(-x) = -f(x)$ for every $x$ in the domain: $f$ is odd, its graph is symmetric about the origin, and $f(0) = 0$ whenever $0$ is in the domain
- Combinations: a sum of two even functions is even and a sum of two odd functions is odd; a product or quotient is even when the two parities match and odd when they differ; a composition is odd when both functions are odd and even in every other case where both have a parity
- $f(x) = \dfrac{f(x) + f(-x)}{2} + \dfrac{f(x) - f(-x)}{2}$, an even part plus an odd part, and the split is unique
- $\displaystyle\int_{-a}^{a} f(x)\,\mathrm{d}x = 0$ for odd $f$ and $2\displaystyle\int_{0}^{a} f(x)\,\mathrm{d}x$ for even $f$
- Standard parities: $x^n$ is even for even $n$ and odd for odd $n$; $\cos x$ and $\lvert x\rvert$ are even; $\sin x$ and $\tan x$ are odd; $a^x$ and $\log x$ are neither

## Conditions
The domain must be symmetric about $0$: whenever $x$ is allowed, so is $-x$. Without that the test $f(-x) = f(x)$ cannot even be stated, so $\sqrt{x}$, and $x^2$ restricted to $x \ge 0$, are neither even nor odd. The only function that is both is the zero function, because $f(x) = f(-x) = -f(x)$ forces $f(x) = 0$.

## Why it works
Replacing $x$ by $-x$ reflects the graph in the $y$-axis, so $f(-x) = f(x)$ says the reflected graph is the original one. Reflecting in the $y$-axis and then in the $x$-axis is a half turn about the origin, and $f(-x) = -f(x)$ says that the point $(-x, -f(x))$, the half turn of $(x, f(x))$, is on the graph too. Putting $x = 0$ in the odd condition gives $f(0) = -f(0)$, so $f(0) = 0$.

Each combination rule is one line of substitution. For two odd functions, $$(fg)(-x) = f(-x)\,g(-x) = \bigl(-f(x)\bigr)\bigl(-g(x)\bigr) = (fg)(x),$$ so the product is even, and the other products, sums, and quotients are checked the same way, with signs multiplying. For a composition with $g$ odd and $f$ even, $f(g(-x)) = f(-g(x)) = f(g(x))$, which is even, and if $g$ is even the inner step $g(-x) = g(x)$ already makes the composition even.

For the split, set $e(x) = \frac{f(x) + f(-x)}{2}$ and $o(x) = \frac{f(x) - f(-x)}{2}$. Replacing $x$ by $-x$ leaves $e$ unchanged and flips the sign of $o$, and $e + o = f$. The split is unique: if $e + o = e' + o'$, then $e - e' = o' - o$ is both even and odd, hence zero.

For the integral, substitute $x = -u$ on the left half of the interval: $$\int_{-a}^{0} f(x)\,\mathrm{d}x = \int_{0}^{a} f(-u)\,\mathrm{d}u = \pm\int_{0}^{a} f(u)\,\mathrm{d}u,$$ with the plus sign for an even function and the minus sign for an odd one. Adding the right half gives twice the right half in the even case and zero in the odd case.

## Useful observations
- A polynomial is even exactly when only even powers of $x$ appear and odd exactly when only odd powers appear, since $p(-x) = \pm p(x)$ compares coefficients power by power. The even part of a polynomial is the sum of its even-degree terms, which is why the sum of those coefficients is $\frac{P(1) + P(-1)}{2}$, as in [[coefficient-extraction|Coefficient Sums]].
- A given value $f(-a)$ with $f(a)$ asked for usually hides an odd part: removing the constant term, or whatever else spoils oddness, leaves an odd function whose values at $a$ and $-a$ are opposite.
- The roots of an even or odd function come in pairs $\pm r$. An odd function defined at $0$ also has $0$ as a root, so it has an odd number of distinct real roots when the number is finite, and the roots of an even polynomial add to $0$.
- Differentiating $f(-x) = \pm f(x)$ gives $-f'(-x) = \pm f'(x)$, so the derivative of an even function is odd and the derivative of an odd function is even.
- Any function with $f(x + y) = f(x) + f(y)$ is odd: setting $y = 0$ gives $f(0) = 0$ and setting $y = -x$ gives $f(x) + f(-x) = 0$, the first step in [[cauchy-functional-equations|Cauchy's Functional Equations]].

## Applications
Evaluating a function at $-a$ from its value at $a$, discarding half of a symmetric integral, and halving the casework when counting or summing roots.

## Contest profile
Parity usually appears as a quiet step rather than a headline: the problem supplies a value at one point and asks for the opposite point, or an integral over a symmetric interval that cancels, or a polynomial whose even- and odd-degree terms have to be separated. The check costs one substitution, so testing $-x$ before expanding anything is the habit it earns. It is also the simplest case of reading a symmetry off an equation, and the other axes and centers extend it directly.
`,

"inverse-function-properties": String.raw`
## Key forms
- $f(a) = b \iff f^{-1}(b) = a$, so $f(f^{-1}(x)) = x$ for every $x$ in the range of $f$ and $f^{-1}(f(x)) = x$ for every $x$ in its domain
- The domain of $f^{-1}$ is the range of $f$ and the range of $f^{-1}$ is the domain of $f$; the point $(a, b)$ is on the graph of $f$ exactly when $(b, a)$ is on the graph of $f^{-1}$, so the two graphs are mirror images in $y = x$
- $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$, the last step undone first
- If $f$ is strictly increasing then so is $f^{-1}$, and $f(x) = f^{-1}(x)$ holds exactly where $f(x) = x$
- The inverse of $f(x) = \dfrac{ax + b}{cx + d}$ with $ad - bc \ne 0$ is $f^{-1}(x) = \dfrac{dx - b}{-cx + a}$

## Conditions
$f$ must be one-to-one on the domain used: no horizontal line meets its graph twice. When it is not, a piece of the domain on which it is one-to-one is chosen first, and the inverse belongs to that piece alone. The statement about $f(x) = f^{-1}(x)$ needs $f$ strictly increasing; a decreasing function can meet its inverse away from the line $y = x$.

## Why it works
The relation $f(a) = b \iff f^{-1}(b) = a$ is the definition, and the two composition identities are its two readings: start at $a$, apply $f$ to reach $b$, apply $f^{-1}$ to return to $a$, and the same walk backwards. Swapping the coordinates of every point of a graph reflects it in the line $y = x$, and swapping the coordinates of every point of the graph of $f$ is exactly the graph of $f^{-1}$, which is why domain and range trade places.

For a composition, $f(g(x)) = y$ is undone by undoing $f$ first and then $g$: $$x = g^{-1}\bigl(f^{-1}(y)\bigr).$$ Putting on socks and then shoes is undone by taking off the shoes first.

If $f$ is increasing and $f^{-1}$ were not, there would be $u < v$ with $f^{-1}(u) \ge f^{-1}(v)$; applying the increasing $f$ to both sides gives $u \ge v$, a contradiction. For the fixed-point statement, suppose $f(x) = f^{-1}(x) = y$, which means $f(x) = y$ and $f(y) = x$. If $x < y$ then $f(x) < f(y)$ gives $y < x$, and if $x > y$ the same step gives $y > x$; both are impossible, so $x = y$ and $f(x) = x$. The other direction is immediate.

For the fraction, solve $y = \frac{ax + b}{cx + d}$ for $x$: $$y(cx + d) = ax + b \ \Longrightarrow \ x(cy - a) = b - dy \ \Longrightarrow \ x = \frac{dy - b}{-cy + a}.$$ The condition $ad - bc \ne 0$ is what keeps $f$ from being constant.

## Useful observations
- To find $f^{-1}(b)$ without finding $f^{-1}$, solve $f(x) = b$. A one-to-one function has at most one solution, so a solution found by inspection is the answer.
- Exponentials and logarithms with the same base are inverses, which is the content of $b^{\log_b x} = x$ and $\log_b b^x = x$ in [[log-rules|Logarithm Rules]].
- A function equal to its own inverse satisfies $f(f(x)) = x$, and its graph is symmetric in $y = x$. The maps $x \mapsto c - x$ and $x \mapsto \frac{k}{x}$ are examples, and such symmetries are read off an equation as in [[function-symmetry-equation|Writing a Function's Symmetry as an Equation]].
- For a decreasing $f$, any pair with $f(p) = q$ and $f(q) = p$ makes $f(x) = f^{-1}(x)$ true at both $x = p$ and $x = q$, even when $p \ne q$.
- Differentiating $f(f^{-1}(x)) = x$ gives $f'(f^{-1}(x))\,(f^{-1})'(x) = 1$, so the slope of $f^{-1}$ at $b$ is the reciprocal of the slope of $f$ at the point $a$ with $f(a) = b$.

## Applications
Evaluating an inverse at a point, inverting a composition, finding where a function meets its inverse, and trading a question about $f^{-1}$ for one about the reflected graph.

## Contest profile
Inverses show up in three forms: an inverse that must be evaluated at a point where the formula for it is out of reach but the equation $f(x) = b$ has a visible solution, an inverse of a composition, and a question about where a function crosses its inverse. The mirror-image picture settles many monotonicity and area questions in a line, and the restriction to a one-to-one piece is the step most often forgotten.
`,

"injectivity-surjectivity": String.raw`
## When to use
Functional equations in which $f$ is nested inside itself, such as $f(f(x)) = x + 1$ or $f(x + f(y)) = f(x) + y$, where plugging in special values only produces more unknown values of $f$. Two signs point to this method. A variable that appears outside every $f$ on one side can be made to take any value, which proves surjectivity; and an equation that would be solved by "cancelling $f$" needs injectivity first.

## How
1. Look for surjectivity: find a side that runs over all reals as one variable varies, while the other side is a value of $f$. Then every real is a value of $f$.
2. Look for injectivity: assume $f(a) = f(b)$, substitute $a$ and then $b$ into the same position, and use a side where the variable appears outside $f$ to conclude $a = b$. For example, if $f(f(x)) = x + 1$, then $f(a) = f(b)$ gives $a + 1 = f(f(a)) = f(f(b)) = b + 1$.
3. Use surjectivity: take a point $x_0$ with $f(x_0) = 0$, or with $f(x_0)$ equal to any convenient value, and substitute it; or replace $f(y)$ by a free variable $t$ that ranges over all reals.
4. Use injectivity: from $f(A) = f(B)$, conclude $A = B$, which removes one layer of $f$.
5. Solve what remains, often a Cauchy-type equation, and check every candidate in the original equation.

## Why it works
Injectivity is exactly the statement that $f$ can be cancelled: $f(A) = f(B)$ with $A \ne B$ is what it rules out. Surjectivity is exactly the statement that $f(y)$ takes every value, so an identity that holds for all $f(y)$ holds for every real number in its place. Both properties pass from a composition to the inner function: if $f \circ f$ is injective, so is $f$, since $f(a) = f(b)$ gives $f(f(a)) = f(f(b))$ and so $a = b$; and if $f \circ f$ is surjective, so is $f$, since every value of $f(f(x))$ is a value of $f$. A bijective $f$ has an inverse, and the facts about [[inverse-function-properties|inverse functions]] then apply.

## Formulas it uses
- [[inverse-function-properties]]: a bijection has an inverse, and $f(f(x)) = x$ means $f$ is its own inverse, with a graph symmetric in $y = x$.
- [[cauchy-functional-equations]]: the equation that often remains once $f$ has been cancelled or its values freed, with its solutions and the conditions they need.

## Common traps
- Cancelling $f$ before injectivity is proved.
- Claiming surjectivity onto all reals from an expression that only covers part of them, such as $x^2$, or forgetting that for $f : \mathbb{N} \to \mathbb{N}$ the target is only the positive integers.
- Proving injectivity at a single pair of points instead of for all $a$ and $b$.
- Skipping the final check that each candidate satisfies the original equation.

## Contest profile
The first move in most olympiad functional equations, and occasionally needed on a hard AIME problem with nested functions. Solutions usually open by proving one of the two properties and then exploit it in the next substitution.
`,

"function-symmetry-equation": String.raw`
## When to use
A function is described by a relation such as $f(2 - x) = f(x)$, $f(x + 3) = f(1 - x)$, $f(x + 2) = -f(x)$, or by a sentence saying its graph is symmetric about a line or a point, and the question asks for a value far from the data, a sum of roots, a count of roots in an interval, or a period. The relation is usually the whole description of $f$, so the work is reading it as geometry before any substitution. A relation in which the arguments differ by a constant is a shift, not a mirror.

## How
1. Look at the two arguments in each relation and form their sum and their difference. A constant sum $c$ means a reflection or a half turn; a constant difference means a shift.
2. If the values are equal, $f(x) = f(c - x)$, the graph has the axis $x = \frac{c}{2}$. If the values add to $2b$, $f(x) + f(c - x) = 2b$, the graph has the center $\bigl(\frac{c}{2}, b\bigr)$.
3. A shift $f(x + T) = f(x)$ gives the period $T$, and $f(x + a) = -f(x)$ gives the period $2a$, since applying it twice returns $f(x)$.
4. Combine two symmetries into a period: two axes at $x = p$ and $x = q$, or two centers at the same height with $x$-coordinates $p$ and $q$, give the period $2\lvert p - q\rvert$; an axis and a center give the period $4\lvert p - q\rvert$.
5. Subtract whole periods until the argument is in an interval where $f$ is known, and use one more symmetry if the argument lands on the wrong side.

The relation $f(x + 1) + f(3 - x) = 6$ has arguments $x + 1$ and $3 - x$ adding to $4$ and values adding to $6$, so the center is $(2, 3)$. The relation $f(x + 3) = f(1 - x)$ has arguments adding to $4$ and equal values, so the axis is $x = 2$.

{{figure:symmetries}}

## Why it works
The points $(x, f(x))$ and $(c - x, f(c - x))$ have $x$-coordinates whose midpoint is $\frac{c}{2}$ for every $x$. If their heights are equal, the segment joining them is horizontal and is bisected by the line $x = \frac{c}{2}$, so the two points are mirror images. If their heights add to $2b$, the midpoint of the segment is $\bigl(\frac{c}{2}, b\bigr)$ for every $x$, so every point is carried to its partner by a half turn about that center. A relation $f(x + a) = -f(x)$ gives $f(x + 2a) = -f(x + a) = f(x)$ by applying itself twice.

Two symmetries compose into a shift. If $f(2p - x) = f(x)$ and $f(2q - x) = f(x)$ for two axes, then $$f(x) = f(2p - x) = f\bigl(2q - (2p - x)\bigr) = f\bigl(x + 2(q - p)\bigr),$$ so $2\lvert q - p\rvert$ is a period. For an axis $x = p$ and a center $(q, b)$, the same substitution gives $f\bigl(x + 2(q - p)\bigr) = 2b - f(x)$, and doing it twice gives $f\bigl(x + 4(q - p)\bigr) = f(x)$. For two centers at the same height $b$ the first substitution gives $f\bigl(x + 2(q - p)\bigr) = 2b - f(2p - x) = f(x)$, and if the heights differ by $b_2 - b_1$ the function repeats up to the constant $2(b_2 - b_1)$ instead.

Roots follow the same pairing: with an axis at $x = p$, the roots $r$ and $2p - r$ come in pairs adding to $2p$, and with a center at $(p, 0)$ the same is true and $p$ itself is a root when $f$ is defined there.

## Formulas it uses
- [[odd-even-functions]]: the case of the axis $x = 0$ and the center $(0, 0)$, where $f(-x) = f(x)$ and $f(-x) = -f(x)$ are the two symmetry equations with $c = 0$.

## Common traps
- Reading $f(x + a) = f(x - a)$ as a mirror. The arguments differ by $2a$, so this is a shift and the period is $2a$; a mirror needs arguments whose sum is constant.
- Halving wrongly: $f(x) = f(c - x)$ has the axis $x = \frac{c}{2}$, while $f(a + x) = f(a - x)$ has the axis $x = a$.
- Taking two centers at different heights to give a period. They give a period only up to a constant, so the function is the sum of a periodic function and a linear one.
- Treating the period found as the smallest, or applying a relation outside the domain where it was given. It is a period; the least one may be shorter.

## Contest profile
This is the standard way a problem hides a period or a mirror line: the function is never written down, only a relation or two, and the question needs a value far away or a count of roots. Read as geometry first, the relations turn a functional-equation problem into a one-line reduction. When the symmetry is not given but has to be found, it pairs with [[functional-substitution|Functional Equation Substitution]].
`,

"slope-to-a-point": String.raw`
## When to use
A quotient of differences, $\frac{y - a}{x - b}$ or the special case $\frac{y}{x}$, is to be maximized or minimized while $(x, y)$ satisfies a condition that is easy to draw: a circle, an ellipse, a disk, or a region cut out by lines. The condition may be hidden, as in a constraint like $x^2 + y^2 = 1$ or a system of linear inequalities. It is also worth a look when a problem asks for a range of values of such a ratio.

## How
1. Rewrite the quantity as a slope: $\frac{y - a}{x - b}$ is the slope from $(b, a)$ to $(x, y)$, and $\frac{y}{x}$ is the slope from the origin.
2. Draw the allowed set of points $(x, y)$ and mark the fixed point $(b, a)$.
3. Swing a line about the fixed point. The slope changes continuously, and its extreme values occur at the last lines that still touch the set.
4. For a curve or disk those lines are the tangents from the fixed point, found with [[tangent-lines-from-point|Tangent Lines to a Circle from a Point (Distance Method)]]; for a polygon they pass through vertices, so it is enough to compute the slope at each corner.
5. If the set reaches the vertical line $x = b$, the slope is unbounded there, and the ratio has no maximum or minimum over the whole set.

For $(x, y)$ on the circle $x^2 + y^2 = 4$, the value $\frac{y - 1}{x - 3}$ is the slope from $(3, 1)$. That point is outside the circle, so two tangents leave it, and the largest and smallest slopes are the slopes of those tangents. The tangent condition $\frac{\lvert 1 - 3m\rvert}{\sqrt{m^2 + 1}} = 2$ gives $5m^2 - 6m - 3 = 0$, so the range of the ratio is from $\frac{3 - 2\sqrt6}{5}$ to $\frac{3 + 2\sqrt6}{5}$.

## Why it works
The slope $\frac{y - a}{x - b}$ is the same for every point of a line through $(b, a)$, because points on such a line differ from $(b, a)$ by multiples of one direction. So the quantity depends only on which line through $(b, a)$ the point is on, and the set of values it takes is the set of slopes of lines through $(b, a)$ that meet the region. Rotating a line about $(b, a)$ changes its slope continuously, so the set of slopes is an interval as long as the vertical line is not reached, and its endpoints are the lines that only just touch the region: tangents for a smooth curve and corner lines for a polygon.

For a polygon this means a linear-fractional function over a convex region is extreme at a vertex, as long as the denominator keeps one sign across it.

## Formulas it uses
- [[distance-midpoint]]: the slope $\frac{y_2 - y_1}{x_2 - x_1}$ between two points, which is the quantity the method reads.

## Common traps
- Dividing by $x - b$ when the region contains points on both sides of $x = b$: the vertical line is then reached, and the ratio is unbounded.
- Taking only one tangent: the maximum and the minimum are the two different tangents.
- Reading $\frac{y - a}{x - b}$ as the slope from $(a, b)$ instead of from $(b, a)$.
- Forgetting a vertical tangent, which has no slope; it signals that the ratio is unbounded on that side.

## Contest profile
A short way through an optimization that would otherwise be a calculus exercise or an inequality with a constraint, and common enough in coordinate problems on circles and polygons to be worth recognizing on sight. It shows up as a request for the extreme value of a quotient of coordinates, and the moment the ratio is read as a slope the figure is a region and a point with its extreme lines.
`,

"defined-operation": String.raw`
## Distinguishing clues
- A new symbol, such as $a \star b$ or $a \diamond b$, defined by a formula in the statement.
- A chain of the operation to evaluate, often long, such as $((2 \star 3) \star 4) \star \cdots \star 10$.
- An equation in the new operation to solve, or a question about its properties: commutative, associative, an identity element.
- Not this pattern: a function defined by an equation it satisfies, such as $f(x) + 2f(1 - x) = x$, which is a functional equation solved by [[functional-substitution|Functional Equation Substitution]].

## Methods and Formulas to Try
The rule is a familiar operation in disguise, and finding which one is the whole problem.

### Methods to try
- [[sfft]]: a rule like $ab - a - b + c$ factors as $(a - 1)(b - 1) + (c - 1)$, a shifted product, which makes long chains collapse.
- [[telescoping]]: a rule like $\frac{1}{a} - \frac{1}{b}$ telescopes along a chain, leaving only the two ends.
- [[functional-substitution]]: when the operation must satisfy an equation, substitute simple values, such as equal arguments or an identity, to pin it down.

### Formulas to try
No standard formula is needed: the rule in the statement is the formula, and the work is rewriting it.

## Common traps
- Evaluating a chain right to left when it is grouped left to right, for an operation that is not associative.
- Assuming the operation is commutative because the symbol looks symmetric.
- Expanding a long chain term by term instead of rewriting the rule first.
- Reading $a \star b$ as multiplication in a step where the rule must be applied.

## Contest profile
An AMC 8 and 10 favorite, from a single evaluation to a long chain or an equation in the new operation, and an AMC 12 version that asks for the properties of the operation. It pairs with Simon's Favorite Factoring Trick and with telescoping.
`,
"integer-valued-polynomials": String.raw`
## Key forms
- $c_k = \Delta^k P(0) = \alt{\sum_{j=0}^{k} (-1)^{k-j}\binom{k}{j}P(j)}{P(k) - \binom{k}{1}P(k - 1) + \binom{k}{2}P(k - 2) - \cdots + (-1)^k P(0)}$ — the coefficients are the forward differences at $0$
- $P(m) \in \mathbb{Z}$ for $n + 1$ consecutive integers $m$ $\implies$ $P(m) \in \mathbb{Z}$ for every integer $m$
- $n!\,P(x)$ has integer coefficients when $P$ is integer-valued of degree $n$
- if $m$ divides $P(0), P(1), \ldots, P(n)$, it divides every value $P(k)$ at an integer $k$

## Conditions
$P$ is a polynomial of degree $n$ with rational, or even real, coefficients. The values that decide the question are at $n + 1$ consecutive integers; fewer, or values at integers with gaps, are not enough.

## Why it works
First, each $\binom{x}{k}$ is integer-valued. For a whole number $x \ge k$ it counts the $k$-element subsets of an $x$-element set; for $0 \le x \lt k$ it is $0$; and for a negative integer $x = -m$, $$\binom{-m}{k} = \frac{(-m)(-m - 1)\cdots(-m - k + 1)}{k!} = (-1)^k\binom{m + k - 1}{k}.$$ So every integer combination of them is integer-valued.

Conversely, $\binom{x}{k}$ has degree exactly $k$, so the polynomials $\binom{x}{0}, \ldots, \binom{x}{n}$ can be combined to give any polynomial of degree $n$: $P(x) = \sum c_k\binom{x}{k}$ for some numbers $c_k$. The difference operator $\Delta f(x) = f(x + 1) - f(x)$ acts on the basis like Pascal's rule, $\Delta\binom{x}{k} = \binom{x}{k - 1}$, and every $\binom{0}{k}$ with $k \ge 1$ is $0$. So applying $\Delta$ $j$ times and putting $x = 0$ leaves exactly $c_j$, which is the first Key form.

If $P(0), \ldots, P(n)$ are whole numbers, every difference built from them is a whole number, so every $c_k$ is, and $P$ is integer-valued. For any other run of consecutive integers $a, \ldots, a + n$, apply the same argument to $P(x + a)$.

## Useful observations
- The divisibility $a - b \mid P(a) - P(b)$ of [[factor-remainder-theorem|the Remainder Theorem]] needs integer coefficients and fails here: $\binom{x}{2}$ is $0$ at $x = 0$ and $1$ at $x = 2$.
- $k!\binom{x}{k} = x(x - 1)\cdots(x - k + 1)$ has integer coefficients, which gives the bound on denominators: an integer-valued polynomial of degree $n$ has coefficients with denominators dividing $n!$.
- The same differences give divisibility: if $m$ divides $P(0), \ldots, P(n)$, it divides every difference, every $c_k$, and so every value.

## Applications
Showing that a polynomial's values are integers, or divisible by a given number, from a few of its values; writing the polynomial through given values at consecutive integers in a form that can be evaluated anywhere.

## Contest profile
No problems here are tagged with it yet. An olympiad tool for polynomials that must take integer values; AIME problems that give values at consecutive integers use the same differences to extend a sequence.
`,
"partial-fractions": String.raw`
## When to use
A sum of fractions such as $\frac{1}{k(k + 2)}$ or $\frac{1}{k^2 - 1}$ that should telescope once split. A generating function such as $\frac{1}{(1 - x)(1 - 2x)}$ whose coefficients are wanted. A sum over the roots of a polynomial of $\frac{1}{x - r}$, which partial fractions turn into $\frac{P'(x)}{P(x)}$.

It is the wrong first move when the numerator's degree is at least the denominator's, where long division comes first, and when the denominator does not factor, where a quadratic factor with no real roots keeps a linear numerator $\frac{Bx + C}{x^2 + px + q}$.

## How
1. Divide first if the numerator's degree is not lower than the denominator's, and keep the quotient aside.
2. Factor the denominator completely.
3. Write one term for each factor: $\frac{A}{x - a}$ for a simple factor, $\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2}$ for a squared one, and $\frac{Bx + C}{x^2 + px + q}$ for a quadratic with no real roots.
4. Find the numerator over each simple factor $x - a$ by covering that factor and putting $x = a$ into the rest.
5. Find any numerators left by putting in convenient values of $x$ or by comparing coefficients.
6. Check by recombining at one value of $x$.

For instance, for $\frac{x + 5}{(x - 1)(x + 2)}$, covering $x - 1$ and putting $x = 1$ gives $\frac{6}{3} = 2$, and covering $x + 2$ and putting $x = -2$ gives $\frac{3}{-3} = -1$, so the fraction is $\frac{2}{x - 1} - \frac{1}{x + 2}$.

## Why it works
Suppose $\frac{P(x)}{(x - a)R(x)} = \frac{A}{x - a} + T(x)$, where no term of $T$ has $x - a$ in its denominator. Multiplying by $x - a$ gives $\frac{P(x)}{R(x)} = A + (x - a)T(x)$, and putting $x = a$ leaves $A = \frac{P(a)}{R(a)}$, which is the cover-up.

For distinct linear factors, the split always exists and is unique: over the common denominator, the sum of the cover-up terms has a numerator of degree below that of the denominator that agrees with $P$ at every root, so it is $P$. The cover-up finds only the top power of a repeated factor, since the lower powers are not removed by multiplying by $(x - a)^2$ and setting $x = a$; those need step 5.

## Formulas it uses
- [[lagrange-interpolation-formula]]: with $Q(x) = (x - a_1)\cdots(x - a_n)$ for distinct $a_i$ and $\deg P \lt n$, $\frac{P(x)}{Q(x)} = \frac{P(a_1)}{Q'(a_1)(x - a_1)} + \cdots + \frac{P(a_n)}{Q'(a_n)(x - a_n)}$, which is the cover-up written for every factor at once.
- [[geometric-series]]: each piece $\frac{A}{1 - rx}$ expands as $A(1 + rx + r^2x^2 + \cdots)$, so a split generating function gives its coefficients as sums of powers.

## Common traps
- Using the cover-up on a repeated factor for anything but its highest power.
- Forgetting to divide first when the fraction is improper.
- Telescoping $\frac{1}{k(k + 2)} = \frac12\left(\frac1k - \frac1{k + 2}\right)$ as if one term survived at each end: two first terms and two last terms survive.
- Dropping the constant $\frac{1}{a - b}$ in front of the split.
- Decomposing before dividing: when the numerator's degree is at least the denominator's, divide first by [[polynomial-division|polynomial long division]] and decompose only the proper remainder.

## Contest profile
An AMC and AIME tool that rarely stands alone: it is the first step of most telescoping sums of fractions and of generating-function coefficient problems.
`,
"age-problems": String.raw`
## Distinguishing clues
- Two or more people whose ages are compared at different times: now, some years ago, some years from now.
- Phrases such as "was three times as old as", "will be twice as old as", or "the sum of their ages was".
- A question asking for a present age, or for the year in which a ratio of ages will hold.
- Not this pattern: ages that appear only as data in an average, such as the mean age of a club before and after a member joins, which is [[averages-before-after|the averages pattern]].

## Methods and Formulas to Try
Use the present ages as the unknowns, and write every past or future age as a present age plus or minus the years. The difference of two ages is the same at every time, so when the older person is $r$ times as old as the younger, the younger is $\frac{D}{r - 1}$ and the older $\frac{rD}{r - 1}$, where $D$ is the difference.

### Methods to try
- [[add-all-equations]]: with several people and several sentences, adding the equations often gives the total of the ages at once.
- [[working-backwards]]: when the problem walks through the years and gives the end, undo the years from the end.
- [[averages-to-totals]]: when an average age is given, turn it into a total first, since totals change by a known amount each year.

### Formulas to try
No formula is needed beyond setting up linear equations: two sentences about two people give two equations in their present ages.

## Common traps
- Taking the unknown as an age in the past or future, and then answering with it as if it were the present age.
- Adding the years to one person's age and forgetting the other's.
- Assuming the ratio of ages stays the same over time; only the difference does.
- Counting "in 5 years" and "5 years ago" as the same shift with the same sign.

## Contest profile
An AMC 8 and AMC 10 word problem, usually one of the first ten, settled by two linear equations in the present ages. Harder versions ask in which year a ratio first becomes a whole number, which turns into a divisibility question about the age difference.
`,
"conjugate-both-sides": String.raw`
## When to use
An equation mixes $z$ and $\bar z$, such as $z^2 + \bar z = 0$; a quantity built from $z$ is said to be real; or the numbers lie on the unit circle and a sum or polynomial in them is known. In each case conjugating supplies a second equation.

It is the wrong move when the equation has real coefficients and no $\bar z$ and nothing is said about $|z|$: conjugating then only says that $\bar z$ is a solution too, which is [[conjugate-root-theorems|the conjugate root theorem]], not a new condition on $z$.

## How
1. Write the condition as an equation; a condition "$w$ is real" becomes $w = \bar w$.
2. Take the conjugate of both sides, conjugating each $z$ and each nonreal coefficient.
3. If $|z| = 1$, replace every $\bar z$ by $\frac1z$ and clear denominators.
4. Combine the two equations, by subtracting them or substituting one into the other, to cancel the mixed terms.
5. Factor what is left and solve, then check each solution against the original condition.

For instance, when $|z| = 1$ and $z^2 \ne -1$, the number $\frac{z}{1 + z^2}$ is real: its conjugate is $\frac{1/z}{1 + 1/z^2} = \frac{z}{z^2 + 1}$, the same number.

## Why it works
Conjugation respects sums and products, $\overline{u + v} = \bar u + \bar v$ and $\overline{uv} = \bar u\,\bar v$, so it carries every true equation to another true equation. The new one is not a copy: it says something about $\bar z$, and $\bar z$ is tied to $z$ by $z\bar z = |z|^2$, so the two together carry more information than either.

On the unit circle $z\bar z = 1$, so $\bar z = \frac1z$ and the conjugated equation is again an equation in $z$ alone. The move adds nothing when the equation is already its own conjugate, as for a polynomial with real coefficients, and any solution found must still be checked in the original equation, since combining two equations can introduce extra roots.

## Formulas it uses
- [[complex-basics]]: $\overline{uv} = \bar u\,\bar v$, $z\bar z = |z|^2$, so $\bar z = \frac1z$ when $|z| = 1$, and $w$ is real exactly when $w = \bar w$.
- [[roots-of-unity]]: the solutions of $z^n = 1$ or $z^n = -1$ that the combined equation usually reduces to, $n$ of them equally spaced.

## Common traps
- Using $\bar z = \frac1z$ when $|z|$ is not $1$; in general $\bar z = \frac{|z|^2}{z}$.
- Forgetting to conjugate a nonreal coefficient such as $i$, which becomes $-i$.
- Counting roots of the combined equation that fail the original one, or counting a root shared by two factors twice.
- Missing $z = 0$ after dividing by $z$.

## Contest profile
Uncommon but recognizable: late AMC 12 and early-to-middle AIME problems that put complex numbers on the unit circle and say a sum or an expression is real or zero. The conjugated equation usually factors into roots of unity, and the count or sum of the solutions is the answer.
`
});

// Sign Chart for a Polynomial Inequality (P15, 2026-10-18).
Object.assign(window.MATH_DETAILS, {
"sign-chart": String.raw`
## When to use
The inequality compares a product or a quotient with $0$, and the factors are known or easy to find: $P(x) \le 0$ for a factored polynomial, $\frac{(x-1)(x+2)}{x-3} \gt 0$, or the number of integers where a product of many factors is negative. When the expression does not factor, or the inequality compares two sides that are not a product and $0$, move everything to one side first; if it still does not factor, a [[tangent-line-trick|bound]] or a graph is the better tool.

## How
1. Move every term to one side, so the inequality compares one expression with $0$.
2. Factor it completely into linear factors and factors that never change sign, such as squares.
3. Mark every root, of the numerator and the denominator, in order on a number line.
4. On each interval between marks, count the factors that are negative; an odd count makes the expression negative, an even count positive.
5. Keep the intervals the inequality asks for.
6. Decide each mark on its own: a root of the numerator is in when equality is allowed, and a root of the denominator is never in.

For $x(x-2)(x+3) \ge 0$ the marks are $-3$, $0$, $2$. Left of $-3$ all three factors are negative, so the product is negative; then two, one and none are negative, giving $+$, $-$, $+$. The answer is $-3 \le x \le 0$ or $x \ge 2$.

## Why it works
A linear factor $x - r$ is negative to the left of $r$ and positive to the right of it, so it changes sign only at $r$. Between two consecutive roots no factor changes sign, and so the product keeps one sign on the whole interval. That sign is $-1$ raised to the number of negative factors, which is the number of roots to the right of $x$.

A factor $(x - r)^2$ is never negative, so it does not flip the sign at $r$; it only makes the expression $0$ there. The method stops working when a factor is not known to keep its sign between the marks, which is why the factoring has to be complete.

## Formulas it uses
- [[factor-remainder-theorem]]: each root $r$ of a polynomial gives a factor $x - r$, so knowing the roots gives the factorization the chart is built on.

## Common traps
- Dividing both sides by an expression whose sign is not known, which can flip the inequality without notice.
- Letting a squared factor flip the sign at its root.
- Forgetting the roots themselves: in when equality is allowed, and always out when they make a denominator $0$.
- Losing the intervals at the two ends, left of the smallest root and right of the largest.

## Contest profile
An early or middle AMC 10 and 12 step: a factored polynomial with many roots whose sign must be counted over the integers, or a rational inequality in an algebra problem. On the AIME it is usually one line inside a larger solution.
`
});
Object.assign(window.MATH_DETAILS, {
"popoviciu-inequality": String.raw`
## Key forms
- $f(x) + f(y) + f(z) + 3f(s) \ge 2\left[f\!\left(\tfrac{x+y}{2}\right) + f\!\left(\tfrac{y+z}{2}\right) + f\!\left(\tfrac{z+x}{2}\right)\right]$ with $s = \tfrac{x+y+z}{3}$ — for $f$ convex; reversed for $f$ concave
- $\lvert a\rvert + \lvert b\rvert + \lvert c\rvert + \lvert a+b+c\rvert \ge \lvert a+b\rvert + \lvert b+c\rvert + \lvert c+a\rvert$ — Hlawka's inequality for real numbers, from $f(t) = \lvert t\rvert$ at $x = 2a$, $y = 2b$, $z = 2c$

## Conditions
$f$ is convex on an interval containing $x$, $y$, and $z$. Equality holds when $x = y = z$, and for every $x$, $y$, $z$ when $f$ is linear.

## Why it works
The idea is that the six numbers on the left are more spread out than the six on the right, so a convex function gives the left side the larger total. Both sides have six terms: on the left $x$, $y$, $z$, $s$, $s$, $s$, and on the right each midpoint twice. Both lists add up to $2(x+y+z)$.

$$(x,\ y,\ z,\ s,\ s,\ s) \succ \left(\tfrac{x+y}{2},\ \tfrac{x+y}{2},\ \tfrac{x+z}{2},\ \tfrac{x+z}{2},\ \tfrac{y+z}{2},\ \tfrac{y+z}{2}\right)$$

Step 1, the ordering. Take $x \ge y \ge z$, so the right list in decreasing order is the one written above. Suppose first that $y \ge s$, which is the same as $2y \ge x + z$. Then the left list in decreasing order is $x$, $y$, $s$, $s$, $s$, $z$.

Step 2, the partial sums. The first term gives $x \ge \tfrac{x+y}{2}$. The first two give $x + y = x + y$. The third and fourth each need $s \ge \tfrac{x+z}{2}$, which is $2y \ge x + z$ again. The fifth needs $x + y + 3s - (2x + y + z) \ge \tfrac{y+z}{2}$, that is $y \ge \tfrac{y+z}{2}$, which holds since $y \ge z$. The totals are equal, so the left list majorizes the right one.

Step 3, the other case. If $y \le s$, replace $x$, $y$, $z$ by $-z$, $-y$, $-x$ and $f$ by $t \mapsto f(-t)$, which is still convex; this swaps the two cases. Then [[karamata-inequality|Karamata's Inequality]] turns the majorization into the inequality.

For Hlawka's inequality take $f(t) = \lvert t\rvert$ and $x = 2a$, $y = 2b$, $z = 2c$: the midpoints become $a+b$, $b+c$, $c+a$, and $3f(s) = 2\lvert a+b+c\rvert$, so every term doubles and the factor $2$ cancels.

## Useful observations
- With $f(t) = t^2$ the difference of the two sides is $\tfrac13(a^2 + b^2 + c^2 - ab - bc - ca)$, never negative, a quick check of the direction.
- Compared with Jensen's Inequality, which only compares the values with the value at the mean, the midpoint terms make it sharper for three points.
- A weighted form and versions for $n$ points exist; the three-point form is the one quoted.

## Applications
Three-variable inequalities with a convex function evaluated at the points, their pairwise midpoints, and their mean, and Hlawka-type inequalities for absolute values.

## Contest profile
An olympiad curiosity, quoted mostly as the source of Hlawka's inequality. It pairs with Karamata's Inequality, which proves it, and with Jensen's Inequality, which it refines.
`
});
Object.assign(window.MATH_DETAILS, {
"vornicu-schur": String.raw`
## Key forms
- $a(x-y)(x-z) + b(y-x)(y-z) + c(z-x)(z-y) \ge 0$ — for real $x \ge y \ge z$ and $a, b, c \ge 0$, whenever $a \ge b$ or $c \ge b$
- $a = x^t$, $b = y^t$, $c = z^t$ — with $x \ge y \ge z \ge 0$ and $t \gt 0$ this gives $a \ge b$, which is Schur's Inequality

## Conditions
The weights are nonnegative and the variables are ordered $x \ge y \ge z$, with the weight $a$ on the largest variable's term. Without one of the two weight conditions the sum can be negative: $a = c = 0$, $b = 1$ gives $(y-x)(y-z) \le 0$.

## Why it works
The middle term is the only one that can be negative, because $(y-x)(y-z) \le 0$ when $y$ lies between $x$ and $z$, while $(x-y)(x-z) \ge 0$ and $(z-x)(z-y) \ge 0$. The proof pairs the middle term with whichever outer term has the larger weight.

Case $a \ge b$. Group the first two terms:

$$a(x-y)(x-z) + b(y-x)(y-z) = (x-y)\big[a(x-z) - b(y-z)\big].$$

Here $x - y \ge 0$, and $a(x-z) \ge b(x-z) \ge b(y-z)$ because $a \ge b \ge 0$ and $x - z \ge y - z \ge 0$. So the pair is nonnegative, and the third term $c(x-z)(y-z)$ is too.

Case $c \ge b$. Group the last two terms the same way:

$$b(y-x)(y-z) + c(z-x)(z-y) = (y-z)\big[c(x-z) - b(x-y)\big] \ge 0,$$

since $c(x-z) \ge b(x-z) \ge b(x-y)$. The first term is nonnegative, which finishes the proof.

For Schur's Inequality put $a = x^t$, $b = y^t$, $c = z^t$ with $x \ge y \ge z \ge 0$: then $a \ge b$, and the first case applies.

## Useful observations
- A symmetric inequality is first written as $\sum a(x-y)(x-z)$ with weights that are expressions in the variables, then the variables are ordered and the weights compared.
- Other sufficient conditions are known, such as $ax \ge by$ when $x, y, z \ge 0$, and they are proved by the same grouping.
- Every symmetric cubic in three variables that vanishes at $x = y = z$ can be tried in this form before reaching for sum of squares.

## Applications
Schur-like symmetric inequalities in three variables whose weights are not powers, including weights such as $y + z$ or $\tfrac1x$.

## Contest profile
An olympiad tool in the same family as Schur's Inequality and the sum-of-squares method, for the symmetric three-variable inequalities that need more than AM-GM.
`
});
Object.assign(window.MATH_DETAILS, {
"cohn-irreducibility": String.raw`
## Key forms
- $f(10) = p$ prime, coefficients the digits $0, \ldots, 9$ $\implies f$ irreducible over $\mathbb{Z}$ — Cohn's criterion in base $10$
- the same for the digits $0, \ldots, b - 1$ of a prime in any base $b \ge 2$ — the general form, due to Brillhart, Filaseta, and Odlyzko

## Conditions
The coefficients are the digits, so each lies between $0$ and $b - 1$ and the leading one is at least $1$. The criterion is one-directional: a composite number can still give an irreducible polynomial.

## Why it works
The idea is that a factor $g$ of $f$ would make $g(10)$ a divisor of $p$, but every root of $f$ is far from $10$, so $\lvert g(10)\rvert$ is too big to be $1$.

Step 1, where the roots are. Let $z$ be a complex number with $\operatorname{Re} z \ge 0$ and $\lvert z\rvert \gt 1$. Dividing by $z^m$ and using $a_m \ge 1$, $a_{m-1} \ge 0$, $\operatorname{Re}\tfrac1z \ge 0$, and $a_i \le 9$,

$$\left\lvert \frac{f(z)}{z^m}\right\rvert \ge \operatorname{Re}\!\left(a_m + \frac{a_{m-1}}{z}\right) - 9\left(\frac{1}{\lvert z\rvert^2} + \frac{1}{\lvert z\rvert^3} + \cdots\right) \ge 1 - \frac{9}{\lvert z\rvert^2 - \lvert z\rvert}.$$

This is positive once $\lvert z\rvert^2 - \lvert z\rvert \gt 9$, that is $\lvert z\rvert \gt \tfrac{1+\sqrt{37}}{2} \approx 3.54$. So every root $\alpha$ of $f$ has $\operatorname{Re}\alpha \lt 0$ or $\lvert \alpha\rvert \le 3.54$, and in both cases $\lvert 10 - \alpha\rvert \gt 1$.

Step 2, a factor. Suppose $f = gh$ with $g$, $h$ nonconstant and integer coefficients. By the [[fundamental-theorem-algebra|Fundamental Theorem of Algebra]], $g(x) = c\prod(x - \alpha_i)$ over some of the roots of $f$, with $c$ a nonzero integer, so $\lvert g(10)\rvert = \lvert c\rvert\prod\lvert 10 - \alpha_i\rvert \gt 1$, and likewise $\lvert h(10)\rvert \gt 1$.

Step 3, the contradiction. Then $p = f(10) = g(10)h(10)$ is a product of two integers each larger than $1$ in absolute value, which a prime is not.

## Useful observations
- Read the other way, it gives a test that is sometimes easier than Eisenstein: evaluate at the base and check for a prime.
- The bound in Step 1 uses only that the digits are at most $9$, so the same proof runs in base $b \ge 3$ with $b - 1$ in place of $9$; base $2$ needs a separate argument.
- Eisenstein's Criterion is the other standard irreducibility test; the two cover different polynomials.

## Applications
Irreducibility of polynomials with small nonnegative coefficients, and olympiad problems that ask whether such a polynomial factors.

## Contest profile
An olympiad result, set itself as a problem more often than quoted. It pairs with Eisenstein's Criterion and with root-location bounds on polynomials.
`
});
Object.assign(window.MATH_DETAILS, {
"gauss-lucas": String.raw`
## Key forms
- $P'(w) = 0 \implies w \in \operatorname{conv}\{z_1, \ldots, z_n\}$ — the critical points lie in the convex hull of the roots
- $\dfrac{P'(w)}{P(w)} = \dfrac{1}{w - z_1} + \cdots + \dfrac{1}{w - z_n}$ — the logarithmic derivative behind the proof
- for real roots, every root of $P'$ lies between the least and the greatest root — the real-line case, which Rolle's theorem sharpens to one root in each gap

## Conditions
$P$ is a nonconstant polynomial with complex coefficients, and roots are counted with multiplicity. A repeated root of $P$ is itself a root of $P'$, which lies in the hull trivially.

## Why it works
The idea is that a critical point outside the hull would see every root on one side of it, and then the terms of the logarithmic derivative could not cancel.

Step 1, the logarithmic derivative. Write $P(x) = c(x - z_1)\cdots(x - z_n)$. By the product rule, at any $w$ that is not a root,

$$\frac{P'(w)}{P(w)} = \sum_{k=1}^{n} \frac{1}{w - z_k} = \sum_{k=1}^{n} \frac{\overline{w - z_k}}{\lvert w - z_k\rvert^2}.$$

Step 2, a weighted average. If $P'(w) = 0$ and $P(w) \ne 0$, the sum is zero. Taking conjugates and writing $m_k = \tfrac{1}{\lvert w - z_k\rvert^2} \gt 0$ gives $\sum m_k (w - z_k) = 0$, so

$$w = \frac{m_1 z_1 + m_2 z_2 + \cdots + m_n z_n}{m_1 + m_2 + \cdots + m_n},$$

an average of the roots with positive weights, and such an average lies in their convex hull. If $P(w) = 0$ as well, $w$ is a root of $P$ and so in the hull anyway.

## Useful observations
- If all roots of $P$ lie in a disk or a half-plane, so do all roots of $P'$, $P''$, and every higher derivative, since each of those sets is convex.
- For a cubic with roots at the vertices of a triangle, the two critical points are the foci of the ellipse inscribed in the triangle and tangent to its sides at their midpoints (Marden's theorem), a sharp form of the statement.
- With all roots real it reduces to the statement that $P'$ has its roots between the extreme roots of $P$.

## Applications
Locating the roots of a derivative, olympiad problems about polynomials whose roots lie in a region, and bounds on critical points.

## Contest profile
An olympiad tool for complex polynomials, often paired with Vieta's Formulas or with a root-location argument on the polynomial itself.
`
});
Object.assign(window.MATH_DETAILS, {
"mason-stothers": String.raw`
## Key forms
- $a + b = c$, $a$, $b$, $c$ coprime, not all constant $\implies \max(\deg a, \deg b, \deg c) \le n_0(abc) - 1$ — with $n_0$ the number of distinct complex roots
- $x(t)^n + y(t)^n = z(t)^n$ has no solution in coprime nonconstant polynomials for $n \ge 3$ — Fermat's Last Theorem for polynomials, a corollary

## Conditions
The polynomials have complex (or real, or rational) coefficients, no root common to all three, and their derivatives are not all zero, which over the complex numbers just means not all of them are constant. Any two of them coprime makes all three coprime, since $c = a + b$.

## Why it works
The idea is that the Wronskian $W = ab' - a'b$ is divisible by every repeated root to one power less than its multiplicity, yet its degree is small.

Step 1, the Wronskian is not zero and is shared. Since $a + b = c$, also $a' + b' = c'$, so $W = ab' - a'b = ac' - a'c = cb' - c'b$. If $W = 0$, then $\left(\tfrac ba\right)' = 0$, so $b$ is a constant multiple of $a$, which coprimality rules out unless both are constant, and then $c$ is constant too.

Step 2, the divisibility. A root of $a$ of multiplicity $m$ is a root of $a'$ of multiplicity $m - 1$, so it divides $W = ab' - a'b$ to power at least $m - 1$; the same holds for the roots of $b$ and $c$, using the other two forms of $W$. These roots are all different, so $\dfrac{abc}{\operatorname{rad}(abc)}$ divides $W$, where $\operatorname{rad}(abc)$ has each distinct root once.

Step 3, the degrees. Then

$$\deg a + \deg b + \deg c - n_0(abc) \le \deg W \le \deg a + \deg b - 1.$$

So $\deg c \le n_0(abc) - 1$, and by the symmetric forms of $W$ the same bound holds for $\deg a$ and $\deg b$.

For the Fermat corollary, apply the theorem to $x^n + y^n = z^n$: the distinct roots of $x^n y^n z^n$ number at most $\deg x + \deg y + \deg z \le 3d$, with $d$ the largest of the three degrees, so $nd \le 3d - 1$ and $n \lt 3$.

## Useful observations
- The theorem is the polynomial case of the abc conjecture, where the radical of an integer plays the part of $n_0$; for polynomials it has this short proof.
- It also bounds how close a cube and a square can be: for coprime nonconstant $f$, $g$ with $f^3 \ne g^2$, $\deg(f^3 - g^2) \ge \tfrac12\deg f + 1$ (Davenport).
- The count $n_0$ is of distinct roots, so a polynomial like $(x-1)^{10}$ contributes only $1$.

## Applications
Polynomial equations of Fermat or Catalan type, bounds on $\deg(f^3 - g^2)$, and olympiad problems about sums of polynomial powers.

## Contest profile
An olympiad result for polynomial Diophantine equations, quoted to rule out solutions in a line. It pairs with the Fundamental Theorem of Algebra and with derivative arguments on repeated roots.
`
});
Object.assign(window.MATH_DETAILS, {
"matrix-power-diagonalizing": String.raw`
## When to use
The same linear step is applied over and over: a probability vector moved by a transition matrix, a recurrence such as $F_{n+1} = F_n + F_{n-1}$ written as $\begin{pmatrix}1&1\\1&0\end{pmatrix}$, or a linear map iterated. Reach for it when $n$ is large or the answer must be a formula in $n$. For a handful of steps, multiplying the matrix out directly, or filling in a step-by-step table, is faster.

## How
1. Find the eigenvalues of $M$ from $\det(M - \lambda I) = 0$.
2. For each eigenvalue $\lambda$, find an eigenvector $v$ with $Mv = \lambda v$.
3. Put the eigenvectors as columns of $P$ and the eigenvalues on the diagonal of $D$, in the same order.
4. Compute $M^n = PD^nP^{-1}$, or, if only one entry or one combination is asked for, write it as $\sum c_i\lambda_i^n$ and fit the constants $c_i$ from the first few values.
5. Without eigenvectors, the Cayley–Hamilton Theorem reduces $M^n$ to a combination of $I$ and $M$ (for $2 \times 2$) whose coefficients satisfy the same recurrence.

For $M = \begin{pmatrix}1&2\\2&1\end{pmatrix}$ the eigenvalues are $3$ and $-1$, with eigenvectors $(1, 1)$ and $(1, -1)$, so $M^n = \tfrac12\begin{pmatrix}3^n + (-1)^n & 3^n - (-1)^n \\ 3^n - (-1)^n & 3^n + (-1)^n\end{pmatrix}$.

## Why it works
If $MP = PD$, the columns of $P$ are eigenvectors, and when $P$ is invertible this says $M = PDP^{-1}$. In the power $M^n = (PDP^{-1})(PDP^{-1})\cdots(PDP^{-1})$ every inner $P^{-1}P$ cancels, leaving $PD^nP^{-1}$, and the power of a diagonal matrix is the diagonal of powers.

It needs enough independent eigenvectors to make $P$ invertible, which holds whenever the eigenvalues are distinct. With a repeated eigenvalue and too few eigenvectors, terms $n\lambda^n$ appear instead, exactly as for a linear recurrence with a double root.

## Formulas it uses
- [[eigenvalues-characteristic]]: the characteristic polynomial gives the eigenvalues that $D$ holds.
- [[matrix-multiplication]]: the product $PD^nP^{-1}$, and the check $MP = PD$.
- [[cayley-hamilton]]: reduces $M^n$ to a combination of lower powers when eigenvectors are not needed.

## Common traps
- Putting the eigenvectors in $P$ in a different order from the eigenvalues in $D$.
- Forgetting $P^{-1}$, or inverting it wrongly; a quick check is that $n = 1$ gives back $M$.
- Assuming every matrix diagonalizes; a repeated eigenvalue may not.
- Using it for a few steps, where direct multiplication is shorter.

## Contest profile
A late AIME and olympiad tool, behind closed forms for Markov chains, linear recurrences, and repeated linear maps. On contests the same answer usually comes from the recurrence or a table, and this method explains why those answers are sums of powers.
`
});
Object.assign(window.MATH_DETAILS, {
"trig-series-complex": String.raw`
## When to use
A sum runs over $\cos k\theta$ or $\sin k\theta$ for $k$ in an arithmetic progression, plain or weighted by $\binom nk$, $r^k$, or similar coefficients. The plain sum of sines or cosines in arithmetic progression has its own closed form; this method is the way to derive it, and the only quick way when the terms carry weights. A sum of $\cos^2$ or of products is first rewritten with the double-angle or product-to-sum identities.

## How
1. Replace $\cos k\theta$ by $\operatorname{Re} e^{ik\theta}$ (or $\sin k\theta$ by $\operatorname{Im} e^{ik\theta}$), keeping the real weights.
2. Recognize the complex sum: $\sum r^ke^{ik\theta}$ is geometric with ratio $re^{i\theta}$, and $\sum\binom nke^{ik\theta} = (1 + e^{i\theta})^n$.
3. Sum it in closed form.
4. Simplify, often by factoring out a half angle: $1 + e^{i\theta} = 2\cos\tfrac\theta2\,e^{i\theta/2}$.
5. Take the real or imaginary part.

For $\sum_{k=0}^{n}\binom nk\cos k\theta$, $(1 + e^{i\theta})^n = \left(2\cos\tfrac\theta2\right)^ne^{in\theta/2}$, whose real part is $\left(2\cos\tfrac\theta2\right)^n\cos\tfrac{n\theta}2$.

## Why it works
Euler's Formula $e^{ik\theta} = \cos k\theta + i\sin k\theta$ makes $\cos k\theta$ the real part of $e^{ik\theta}$, and taking real parts commutes with adding up terms and multiplying by real weights. So the cosine sum is the real part of the complex sum, term by term.

The point of the move is that $e^{ik\theta} = \left(e^{i\theta}\right)^k$: angles in arithmetic progression become powers of one number, and sums of powers have closed forms. It stops working when the weights are not real, because then taking the real part mixes the cosine and sine sums.

## Formulas it uses
- [[eulers-formula]]: $e^{ik\theta} = \cos k\theta + i\sin k\theta$ turns each term into a power of $e^{i\theta}$.
- [[geometric-series]]: sums $\sum\left(re^{i\theta}\right)^k$ in closed form.
- [[binomial-theorem]]: sums $\sum\binom nk e^{ik\theta}$ as $(1 + e^{i\theta})^n$.

## Common traps
- Taking the real part of a quotient term by term; first make the denominator real, by multiplying by its conjugate or factoring a half angle out of it.
- Forgetting the $k = 0$ term, $\cos0 = 1$.
- Using complex weights and then reading off the real part as if they were real.
- Missing the half-angle factorization, which turns $1 - e^{i\theta}$ into $-2i\sin\tfrac\theta2\,e^{i\theta/2}$.

## Contest profile
An AIME tool for cosine and sine sums with weights, and the derivation behind the closed form for sines and cosines in arithmetic progression. It pairs with Euler's Formula, geometric series, and the Binomial Theorem.
`
});
Object.assign(window.MATH_DETAILS, {
"estimating-answers": String.raw`
## When to use
The question asks which choice is closest, or the choices differ by factors of two or more, so a rough value settles it. Typical cases are products and quotients of awkward numbers, unit conversions, square roots, and a physical quantity with real-world data. When two choices are close together, estimate more finely or compute exactly; estimation is a way to save time, not a replacement for care.

## How
1. Look at the choices first, to see how accurate the estimate must be.
2. Round each number to a convenient one: a power of ten, a round multiple, or a known square.
3. Note the direction of each rounding: rounding a factor up raises a product, rounding a divisor up lowers a quotient.
4. Compute the rough value, and if it lands near a boundary, make a lower and an upper estimate.
5. Choose the only answer within the bounds.

For $\tfrac{1024 \cdot 243}{2401}$, round to $\tfrac{1000 \cdot 250}{2400} \approx 104$; the errors are a few percent each, so the value is close to $100$.

## Why it works
A product or quotient changes by about the sum of the relative errors of its parts, so rounding each part by a few percent moves the result by only a few percent. If the gap between the estimate and the next-closest choice is larger than that, the estimate picks the answer.

Keeping track of directions turns an estimate into a bound: rounding every factor up gives an upper bound and every factor down a lower one. When both bounds lie nearer one choice than any other, the choice is certain, not just likely.

## Formulas it uses
This method uses no particular formula card: it rests only on how relative errors combine in products and quotients.

## Common traps
- Rounding several factors the same way, so the errors add up instead of canceling.
- Forgetting that dividing by a rounded-up number makes the quotient smaller.
- Estimating when two choices are within the error of the estimate.
- Rounding before a subtraction of nearly equal numbers, where small errors become large ones.

## Contest profile
An AMC 8 and early AMC 10 and 12 skill, behind every "closest to" question and many unit-conversion and real-data problems. It pairs with Approximating Square Roots and with Setting Up a Proportion.
`
});
Object.assign(window.MATH_DETAILS, {
"derivative-extremum": String.raw`
## When to use
A quantity depends on one variable through a smooth formula, such as a polynomial, a product, or a quotient, and its maximum or minimum is asked for. On a multiple-choice or short-answer contest the derivative is a legitimate way to find the answer, and a fast check on an algebraic one. It needs a single variable: with two, eliminate one first. For a quadratic, the vertex formula is shorter.

## How
1. Write the quantity as a function $f(x)$ of one variable, and find the interval it is allowed on.
2. Differentiate, using the power, product, and quotient rules: $(x^n)' = nx^{n-1}$, $(uv)' = u'v + uv'$.
3. Solve $f'(x) = 0$ and keep the solutions inside the interval.
4. Evaluate $f$ at those points and at the ends of the interval.
5. Take the largest or smallest value.

For $f(x) = x(10 - 2x)^2$ on $0 \lt x \lt 5$, $f'(x) = (10 - 2x)^2 - 4x(10 - 2x) = (10 - 2x)(10 - 6x)$, which vanishes inside the interval only at $x = \tfrac53$, where $f = \tfrac{2000}{27}$.

## Why it works
The derivative $f'(x)$ is the slope of the graph at $x$. At an interior maximum the function rises up to the point and falls after it, so the slope changes from positive to negative and is $0$ at the top; the same holds at a minimum with the signs reversed. So every interior extreme is a critical point.

A continuous function on a closed interval has a largest and a smallest value, and they occur either at a critical point or at an end. Checking that finite list is therefore complete. On an open interval, or for a function that is not smooth (with a corner, like $\lvert x\rvert$), the ends and the corners must be examined separately.

## Formulas it uses
This method uses no formula card of the library, which has no calculus cards; the power, product, and quotient rules are stated in How.

## Common traps
- Forgetting the ends of the interval, where the extreme often is.
- Keeping a critical point outside the allowed interval.
- Taking $f'(x) = 0$ to mean a maximum when it is a minimum or a flat point; compare values.
- Differentiating with respect to the wrong variable after a substitution.

## Contest profile
An occasional AIME shortcut for one-variable optimization, and a check on an algebraic answer from AM-GM or completing the square. Contest solutions usually present the algebraic proof; the derivative finds where to look.
`
});
Object.assign(window.MATH_DETAILS, {
"reading-graphs": String.raw`
## Distinguishing clues
- A picture of data: bars, a line, a circle cut into sectors, or a table of values.
- A question asking for a total, an average, a percent, a change, or which item is largest.
- An axis that starts above $0$, a scale with several units per mark, or units stated only in the axis label.
- Not this pattern: the graph of a function in coordinates, where the question is about the equation, not data.

## Methods and Formulas to Try
First turn the picture into a list of numbers, checking the scale and the units of each axis, then answer the question with ordinary arithmetic. For a pie chart, a sector of angle $\theta$ is $\tfrac{\theta}{360^\circ}$ of the total.

### Methods to try
- [[averages-to-totals]]: a question about the average of the data is answered through the total.
- [[setting-up-proportions]]: a pie chart or a scale drawing is a proportion between the picture and the data.

### Formulas to try
- [[percent-change]]: changes between bars or points are asked for as percents of the starting value.
- [[mean-median-mode]]: the average, median, and mode of the values read from the graph.

## Common traps
- Comparing bar heights when the axis does not start at $0$.
- Missing that each mark stands for several units, or that values are in thousands.
- Taking a percent change from the wrong starting value.
- Reading a pie chart's angles as percents.

## Contest profile
Mostly an AMC 8 setup, rarer on the AMC 10: one graph or table and a question about its numbers. It pairs with Percent Change and with the mean, median, and mode.
`
});
Object.assign(window.MATH_DETAILS, {
"transforming-equations": String.raw`
## When to use
Any equation whose solution needs a step that is not reversible: squaring both sides, multiplying by an expression that can be $0$ (clearing a variable denominator), dividing by or canceling a factor, taking logarithms of both sides, substituting a new variable, or dividing by a parameter. Steps that are always reversible need no check: adding the same expression to both sides, multiplying by a nonzero constant, or applying a one-to-one function such as $x \mapsto x^3$.

## How
1. Write down the domain of the original equation: denominators nonzero, even roots of nonnegative numbers, logarithms of positive numbers.
2. Before dividing by a factor or canceling it, set it equal to $0$ and solve that case separately.
3. Before squaring, isolate the radical on one side and record that the other side must be nonnegative.
4. When substituting a new variable, record the values it can actually take.
5. Solve the transformed equation, splitting on the cases a parameter needs.
6. Keep only the candidates that meet every recorded condition, or substitute each one into the original equation.

For $\sqrt{x + 2} = x$ the right side must be nonnegative, so $x \ge 0$. Squaring gives $x^2 - x - 2 = 0$, with candidates $2$ and $-1$. The candidate $-1$ breaks $x \ge 0$ (indeed $\sqrt{1} = 1 \ne -1$), so the only solution is $x = 2$.

## Why it works
A step is safe in both directions when it can be undone. Squaring cannot: $a = b$ implies $a^2 = b^2$, but $a^2 = b^2$ only says $a = b$ or $a = -b$. So the squared equation holds the solutions of both $\sqrt{x + 2} = x$ and $\sqrt{x + 2} = -x$, and the sign condition recorded in step 3 is exactly what separates them. Isolating the radical first matters for the same reason: with only one radical on one side, a single squaring removes it.

Dividing goes wrong in the other direction. From $x(x - 1) = x$, dividing by $x$ gives $x = 2$ and loses $x = 0$; setting the factor to $0$ first, as in step 2, keeps it. Canceling cannot add a value the original excludes: $\frac{x^2 - 1}{x - 1} = 2$ excludes $x = 1$, and canceling to $x + 1 = 2$ gives exactly $x = 1$, so the equation has no solution.

Logarithms and substitutions narrow the domain. Writing $x^2 = 4$ as $2\log x = \log 4$ assumes $x \gt 0$ and loses $-2$; the correct form is $2\log\lvert x\rvert = \log 4$. Setting $t = x + \frac1x$ for real $x \ne 0$ forces $\lvert t\rvert \ge 2$, by AM–GM applied to $\lvert x\rvert$ and $\frac1{\lvert x\rvert}$, so a root $t = 1$ of the new equation gives no real $x$. A parameter is a case split: $ax = a$ has the single solution $x = 1$ when $a \ne 0$, and every real $x$ when $a = 0$.

## Formulas it uses
- [[log-rules]]: $\log x^2 = 2\log\lvert x\rvert$, not $2\log x$, which is the rule that keeps the negative solutions.
- [[am-gm]]: $\lvert x\rvert + \frac1{\lvert x\rvert} \ge 2$ gives the range $\lvert t\rvert \ge 2$ of the substitution $t = x + \frac1x$.

## Common traps
- Squaring before isolating the radical, which leaves a radical behind and multiplies the candidates.
- Dividing both sides by a variable expression and losing the solutions where it is $0$.
- Reporting a root of a canceled or substituted equation that is outside the original domain.
- Forgetting the value of a parameter that makes a coefficient $0$.

## Contest profile
A step inside many AMC 10 and 12 algebra problems rather than a problem of its own: a radical equation whose squared form has an extra root, a logarithmic equation whose candidates must keep every argument positive, or a parameter question whose answer hinges on the case where a coefficient vanishes. The answer choices often include the extraneous root.
`
});
Object.assign(window.MATH_DETAILS, {
"polynomial-division": String.raw`
## When to use
A polynomial has to be divided by another one: removing a known root $r$ to get the remaining factor of degree one less, simplifying a rational expression whose numerator has degree at least the denominator's (before [[partial-fractions|partial fractions]], which need a smaller numerator, or to find a slant asymptote), finding the remainder by a quadratic or higher divisor, or deciding when a quotient of polynomials is an integer. When only the remainder by $x - a$ is wanted, the [[factor-remainder-theorem|Remainder Theorem]] gives it as $P(a)$ with no division at all.

## How
1. Write $P$ and $D$ in descending powers, putting a $0$ for every missing power of $P$.
2. Divide the leading term of what remains by the leading term of $D$; the result is the next term of $Q$.
3. Multiply $D$ by that term and subtract it from what remains.
4. Repeat steps 2 and 3 until what remains has smaller degree than $D$; that is the remainder $R$.
5. For $D = x - a$, use synthetic division instead: bring down the first coefficient, then repeatedly multiply the last number by $a$ and add it to the next coefficient.
6. Read the answer: the last number of the synthetic row is $R = P(a)$, and the numbers before it are the coefficients of $Q$.

To divide $x^3 - 2x + 5$ by $x - 2$, list the coefficients $1, 0, -2, 5$. Bring down $1$; then $1 \cdot 2 + 0 = 2$, $2 \cdot 2 - 2 = 2$ and $2 \cdot 2 + 5 = 9$. So $x^3 - 2x + 5 = (x - 2)(x^2 + 2x + 2) + 9$, and indeed $P(2) = 8 - 4 + 5 = 9$.

## Why it works
Each step of long division subtracts a multiple of $D$, so the remainder at every stage differs from $P$ by a multiple of $D$. Each step also removes the leading term of what remains, so the degree drops, and the process stops once the degree is below $\deg D$. Collecting the multiples subtracted gives $Q$ with $P = DQ + R$.

The quotient and remainder are unique. If $DQ + R = DQ' + R'$, then $D(Q - Q') = R' - R$. The right side has degree less than $\deg D$, and a nonzero multiple of $D$ cannot, so $Q = Q'$ and $R = R'$.

Synthetic division is long division by $x - a$ with the bookkeeping removed. The leading coefficient of $D$ is $1$, so each new quotient coefficient is just the leading coefficient of what remains, and subtracting $-a$ times it is the same as adding $a$ times it. The numbers produced are the quotient coefficients $q_k = p_k + a\,q_{k-1}$, which is also Horner's way of evaluating $P(a)$; that is why the last number is $P(a)$.

## Formulas it uses
- [[factor-remainder-theorem]]: the remainder on division by $x - a$ is $P(a)$, and it is $0$ exactly when $x - a$ is a factor.
- [[rational-root-theorem]]: lists the candidates $a$ to try, after which division by $x - a$ lowers the degree.

## Common traps
- Leaving out a $0$ coefficient for a missing power, which shifts every later column.
- Using $a$ instead of $-a$ for a divisor $x + a$: synthetic division by $x + 3$ multiplies by $-3$.
- Dividing synthetically by $bx - c$ as if it were $x - \frac cb$ and forgetting to divide the quotient by $b$.
- Stopping before the remainder's degree is below the divisor's.

## Contest profile
A routine step on the AMC 10 and 12: removing a root found by inspection to reach a quadratic, rewriting a rational function as a polynomial plus a proper fraction to find integer values or an asymptote, or finding a remainder by a quadratic. On the AIME it is usually one line inside a polynomial problem.
`
});
Object.assign(window.MATH_DETAILS, {
"quadratic-root-location": String.raw`
## When to use
A quadratic whose coefficients involve a parameter must have its roots in a stated place: both real and positive, one on each side of a number $k$, both greater than $k$, or both inside an interval. The question asks for the parameter values, and the quadratic formula would bury the parameter under a square root. When the roots come out cleanly, solving directly is simpler.

## How
1. Make the leading coefficient positive, multiplying the equation by $-1$ if needed, so the parabola opens upward.
2. For one root on each side of $k$, require only $f(k) \lt 0$.
3. For both roots greater than $k$, require $\Delta \ge 0$, the vertex $-\frac{b}{2a} \gt k$, and $f(k) \gt 0$.
4. For both roots inside $(m, n)$, require $\Delta \ge 0$, $m \lt -\frac{b}{2a} \lt n$, $f(m) \gt 0$ and $f(n) \gt 0$.
5. For signs only (the case $k = 0$), use Vieta: both roots positive when $\Delta \ge 0$, $r_1 + r_2 \gt 0$ and $r_1r_2 \gt 0$; opposite signs exactly when $r_1r_2 \lt 0$.
6. Intersect the conditions to get the parameter range.

For which $m$ does $x^2 - 2mx + m + 2 = 0$ have one root on each side of $1$? The test is $f(1) = 1 - 2m + m + 2 = 3 - m \lt 0$, so $m \gt 3$. At $m = 4$ the roots are $4 \pm \sqrt{10}$, about $0.84$ and $7.16$.

## Why it works
With $a \gt 0$, $f(x) = a(x - r_1)(x - r_2)$ when the roots are real, and the product is negative exactly between them. So $f(k) \lt 0$ forces two distinct real roots with $k$ between them; if the roots were not real, $f$ would be positive everywhere. No discriminant check is needed for this case.

For both roots on one side of $k$, $f(k) \gt 0$ says only that $k$ is outside the interval between the roots, or that there are no real roots at all. The discriminant rules out the second possibility. The vertex then says which side: its $x$-coordinate $-\frac{b}{2a}$ is the midpoint of the roots, so it is to the right of $k$ exactly when both roots are. The interval case applies this at both ends.

The sign test is the case $k = 0$ written with Vieta's Formulas. A positive product $\frac ca$ means the real roots have the same sign, and a positive sum $-\frac ba$ makes that sign positive. A negative product already forces real roots of opposite signs, since then $\Delta = b^2 - 4ac \gt 0$.

## Formulas it uses
- [[quadratic-formula]]: the discriminant $\Delta = b^2 - 4ac$ decides whether the roots are real.
- [[vietas-quadratic]]: the sum $-\frac ba$ and product $\frac ca$ give the signs of the roots.
- [[vertex-form]]: the vertex $-\frac{b}{2a}$ is the midpoint of the roots, which places them relative to $k$.

## Common traps
- Checking $f(k) \gt 0$ and the vertex but not $\Delta \ge 0$, which admits parameters with no real roots.
- Using the tests with a negative leading coefficient; either flip the sign first or use $a\,f(k) \lt 0$.
- Mixing strict and non-strict inequalities at the endpoints, where a root equal to $k$ is or is not allowed.
- Forgetting that a parameter in the leading coefficient can make the equation linear.

## Contest profile
An AMC 12 and occasional AIME step: a parameter range for which a quadratic has two positive roots, or roots on either side of a number, often inside a problem about the intersections of a line and a parabola. The sign of a single value $f(k)$ is the fastest test and the one most often missed.
`
});
