// Learn, AIME Algebra, chapter A9: algebra extensions (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// An extension chapter: almost no contest problem in the database needs these tools, so the lessons
// carry their own problems and the chapter has no review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A9"] = {
  lessons: {
    "A9.1": {
      prereq: ["power-sums", "functional-substitution", "linear-elimination"],
      cards: [],
      body: String.raw`This chapter goes beyond the core of AIME algebra. Its topics each solve a few problems quickly: sums of higher powers and polynomials that take integer values, functional equations that need more than substitution, matrices and determinants, and inequalities and trigonometric sums beyond the routine.

The sums $1^k + 2^k + \cdots + n^k$ are polynomials in $n$ of degree $k + 1$: $1^3 + \cdots + n^3 = \left(\tfrac{n(n + 1)}{2}\right)^2$, so $1^3 + \cdots + 10^3 = 3025$. A polynomial that takes integer values at the integers is an integer combination of the binomial coefficients $\binom xk$, and its finite differences show the combination.

The Cauchy equation $f(x + y) = f(x) + f(y)$ forces $f(x) = cx$ on the rationals, and with a little more (continuity, monotonicity, or a second equation) on the reals; if $f(1) = 3$ then $f(5) = 15$. Showing that a function is one-to-one or onto is the first step in many harder functional equations.

A matrix records a linear map, and multiplying matrices composes the maps, so a linear recurrence is a matrix power. The determinant of $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $ad - bc$, which is the factor by which the map scales areas; for $\begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix}$ it is $5$. Cramer's rule solves a linear system with determinants.

Last, homogeneous inequalities can be normalized, the tangent line trick bounds a sum one term at a time, and sums and products of sines and cosines at evenly spaced angles have closed forms, found with complex numbers.

The lessons take these ideas in turn: interpolation and finite differences (A9.2), functional equations (A9.3), recurrences, matrices and determinants (A9.4), and inequalities and substitutions (A9.5). The Summary (A9.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Find $1^3 + 2^3 + \cdots + 10^3$.`, answer: "3025",
          solution: String.raw`The sum of the first $n$ cubes is the square of the sum of the first $n$ integers: $\left(\tfrac{10 \cdot 11}{2}\right)^2 = 55^2 = 3025$.` },
        { q: String.raw`A function on the rationals satisfies $f(x + y) = f(x) + f(y)$ and $f(1) = 3$. Find $f(5)$.`, answer: "15",
          solution: String.raw`Applying the equation repeatedly, $f(5) = f(1) + f(1) + f(1) + f(1) + f(1) = 15$. (In fact $f(x) = 3x$ for every rational $x$.)` },
        { q: String.raw`Find the determinant of $\begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix}$.`, answer: "5",
          solution: String.raw`The determinant of $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $ad - bc = 2 \cdot 4 - 1 \cdot 3 = 5$.` }
      ],
      problems: []
    },
    "A9.2": {
      prereq: ["finite-differences", "power-sums", "lagrange-interpolation"],
      cards: ["higher-power-sums", "integer-valued-polynomials", "generalized-binomial-series"],
      body: String.raw`The finite differences and interpolation of the polynomial chapter extend in three directions that occasionally matter: closed forms for sums of fourth and higher powers, polynomials that take integer values at integers without having integer coefficients, and the binomial theorem for exponents that are negative or fractional. Each is a natural continuation of a familiar idea, and each answers a kind of question the basic tools leave open, such as $1^4 + 2^4 + \cdots + 10^4$, the value at $10$ of an integer-valued quadratic known at three points, or the coefficient of $x^3$ in $\tfrac{1}{(1 - 2x)^2}$.

The sum $1^m + 2^m + \cdots + n^m$ is a polynomial in $n$ of degree $m + 1$, since its differences are the polynomial $n^m$ of degree $m$; these are the [[higher-power-sums|sums of higher powers]]. For fourth powers it is $\tfrac{n(n + 1)(2n + 1)(3n^2 + 3n - 1)}{30}$, which gives $25333$ at $n = 10$. In practice the formula matters less than the method: a sum of a polynomial of degree $m$ is a polynomial of degree $m + 1$, so it is fixed by $m + 2$ values, and those can be computed by hand and interpolated. Writing $k^m$ in terms of the binomial coefficients $\binom{k}{j}$ and using the hockey-stick identity $\sum_k \binom kj = \binom{n + 1}{j + 1}$ gives the sum directly.

The binomial coefficients are also the right basis for [[integer-valued-polynomials|integer-valued polynomials]]. The polynomial $\binom{x}{2} = \tfrac{x(x - 1)}{2}$ has a fractional coefficient, yet it is an integer at every integer. A polynomial is integer-valued exactly when, written as $c_0 + c_1\binom x1 + c_2\binom x2 + \cdots$, all the $c_j$ are integers, and the $c_j$ are the leading finite differences at $0$. So the quadratic with $P(0) = 1$, $P(1) = 3$, $P(2) = 8$ has differences $2, 5$ and second difference $3$, hence $P(x) = 1 + 2\binom x1 + 3\binom x2$ and $P(10) = 1 + 20 + 135 = 156$. This is Newton's forward-difference form of interpolation, and it is often the fastest way to evaluate an interpolating polynomial at a far point.

The [[generalized-binomial-series|generalized binomial series]] extends $(1 + x)^n$ to any real exponent: $(1 + x)^\alpha = \sum_k \binom{\alpha}{k}x^k$ for $|x| \lt 1$, where $\binom{\alpha}{k} = \tfrac{\alpha(\alpha - 1)\cdots(\alpha - k + 1)}{k!}$. For a negative integer exponent it counts multisets: $\tfrac{1}{(1 - x)^m} = \sum_k \binom{k + m - 1}{m - 1}x^k$, the stars-and-bars count, so the coefficient of $x^3$ in $\tfrac{1}{(1 - 2x)^2}$ is $\binom{4}{1} \cdot 2^3 = 32$. For $\alpha = \tfrac12$ it gives $\sqrt{1 + x} = 1 + \tfrac x2 - \tfrac{x^2}{8} + \cdots$, which is how square roots of numbers near $1$ are estimated.

These are tools for the rare problem that needs them: a sum of high powers, an interpolation where integrality matters, or a generating function with a denominator. The next lesson turns to functional equations beyond substitution.`,
      related: [
        { card: "hockey-stick", note: String.raw`summing binomial coefficients down a diagonal, the step behind power sums in the binomial basis.` },
        { card: "stars-and-bars", note: String.raw`the count that the coefficients of $(1 - x)^{-m}$ record.` },
        { card: "generating-function-method", note: String.raw`where series with denominators are used to count.` }
      ],
      exercises: [
        { q: String.raw`Find $1^4 + 2^4 + \cdots + 10^4$.`, answer: "25333",
          solution: String.raw`By the formula $\tfrac{n(n + 1)(2n + 1)(3n^2 + 3n - 1)}{30}$ with $n = 10$: $\tfrac{10 \cdot 11 \cdot 21 \cdot 329}{30} = \tfrac{759990}{30} = 25333$.` },
        { q: String.raw`A quadratic $P$ has $P(0) = 1$, $P(1) = 3$, $P(2) = 8$. Find $P(10)$.`, answer: "156",
          solution: String.raw`The first differences are $2$ and $5$ and the second difference is $3$, so $P(x) = 1 + 2\binom x1 + 3\binom x2$. Then $P(10) = 1 + 20 + 3 \cdot 45 = 156$.` },
        { q: String.raw`Find the coefficient of $x^3$ in the expansion of $\tfrac{1}{(1 - 2x)^2}$.`, answer: "32",
          solution: String.raw`$\tfrac{1}{(1 - y)^2} = \sum_k (k + 1)y^k$, so with $y = 2x$ the coefficient of $x^3$ is $4 \cdot 2^3 = 32$.` }
      ],
      problems: []
    },
    "A9.3": {
      prereq: ["functional-substitution"],
      cards: ["cauchy-functional-equations", "injectivity-surjectivity"],
      body: String.raw`The functional equations of the AIME are solved by substitution: plug in clever values until the function's values fall out. Olympiad functional equations ask for all functions satisfying a condition, and they need two further ideas. One is a short list of classical equations whose solutions are known, such as $f(x + y) = f(x) + f(y)$; the other is proving that the function is one-to-one or onto, which licenses cancelling $f$ or choosing an input that makes $f$ take a convenient value.

[[cauchy-functional-equations|Cauchy's functional equation]] $f(x + y) = f(x) + f(y)$ forces $f(nx) = nf(x)$ for integers $n$, then $f(q) = qf(1)$ for every rational $q$; with any mild extra condition (continuity, monotonicity, or boundedness on an interval) $f(x) = cx$ for all reals. If $f(1) = 3$, then $f\!\left(\tfrac72\right) = \tfrac{21}{2}$. The other classical forms reduce to this one: $f(x + y) = f(x)f(y)$ gives exponentials, $f(xy) = f(x) + f(y)$ gives logarithms, and $f(xy) = f(x)f(y)$ gives powers. So if $f(xy) = f(x) + f(y)$ for positive reals and $f(2) = 1$, then $f$ behaves like $\log_2$ on powers of $2$, and $f(16\sqrt2) = 4 + \tfrac12 = \tfrac92$.

[[injectivity-surjectivity|Injectivity and surjectivity]] are the first structural facts to establish. If $f(a) = f(b)$ forces $a = b$, then $f$ can be cancelled from both sides of an equation; if every value is taken, one may substitute the $x$ with $f(x) = 0$ or $f(x) = 1$. Both often come from an equation like $f(f(x)) = 2x + 1$: the right side is one-to-one and onto, so $f$ must be too. Applying $f$ to both sides gives $f(2x + 1) = 2f(x) + 1$, so $f$ commutes with $g(x) = 2x + 1$, and at the fixed point $x = -1$ of $g$ this reads $f(-1) = 2f(-1) + 1$, so $f(-1) = -1$. Fixed points and commuting maps are a common source of such forced values.

These ideas appear on the AIME only in simple forms, but they explain why the substitution method works, and they are the standard opening moves on olympiad functional equations. The next lesson treats linear recurrences and systems with matrices.`,
      related: [
        { card: "functional-substitution", note: String.raw`plugging in values, the method these ideas extend (A4.5).` },
        { card: "log-rules", note: String.raw`the logarithm as the model solution of $f(xy) = f(x) + f(y)$ (A4.4).` },
        { card: "inverse-function-properties", note: String.raw`a one-to-one and onto function has an inverse (A4.2).` }
      ],
      exercises: [
        { q: String.raw`A function on the rationals satisfies $f(x + y) = f(x) + f(y)$ and $f(1) = 3$. Find $f\!\left(\tfrac72\right)$.`, answer: "21/2",
          solution: String.raw`$f(2 \cdot \tfrac12) = 2f(\tfrac12)$ gives $f(\tfrac12) = \tfrac32$, and then $f(\tfrac72) = 7f(\tfrac12) = \tfrac{21}{2}$.` },
        { q: String.raw`A function on the positive reals satisfies $f(xy) = f(x) + f(y)$ and $f(2) = 1$. Find $f(16\sqrt2)$.`, answer: "9/2",
          solution: String.raw`$f(16) = 4f(2) = 4$, and $f(2) = f(\sqrt2 \cdot \sqrt2) = 2f(\sqrt2)$ gives $f(\sqrt2) = \tfrac12$. So $f(16\sqrt2) = 4 + \tfrac12 = \tfrac92$.` },
        { q: String.raw`A function $f$ on the reals satisfies $f(f(x)) = 2x + 1$ for all $x$. Find $f(-1)$.`, answer: "-1",
          solution: String.raw`Apply $f$ to both sides: $f(f(f(x))) = f(2x + 1)$, and also $f(f(f(x))) = 2f(x) + 1$ by the equation at $f(x)$. So $f(2x + 1) = 2f(x) + 1$. At $x = -1$, where $2x + 1 = -1$, this says $f(-1) = 2f(-1) + 1$, so $f(-1) = -1$.` }
      ],
      problems: []
    },
    "A9.4": {
      prereq: ["linear-recurrence", "linear-elimination"],
      cards: ["matrix-multiplication", "matrix-power-diagonalizing", "determinant-basics", "cramers-rule", "matrix-inverse", "chebyshev-polynomials"],
      body: String.raw`Matrices organize two things contest algebra does often: solving linear systems and running linear recurrences. A system of three equations is one matrix equation, a recurrence such as $F_{n+1} = F_n + F_{n-1}$ is repeated multiplication by one matrix, and the determinant decides whether a system has a unique solution. None of this is needed for the AIME, but it explains results like Binet's formula, and it is the shortest route through some problems about counting invertible arrays or solving a system for one unknown.

[[matrix-multiplication|Matrix multiplication]] pairs rows with columns: entry $(i, j)$ of $AB$ is row $i$ of $A$ times column $j$ of $B$. A linear recurrence becomes a power of a matrix. For Fibonacci numbers, $\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix}$, so $M^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$ and the top-left entry of $M^{10}$ is $F_{11} = 89$. Powers are computed quickly by squaring, and [[matrix-power-diagonalizing|by diagonalizing]]: if $M = PDP^{-1}$ with $D$ diagonal, then $M^n = PD^nP^{-1}$, and the diagonal entries of $D$ are the eigenvalues, the roots of the characteristic equation. For the Fibonacci matrix these are $\tfrac{1 \pm \sqrt5}{2}$, and the result is Binet's formula.

The [[determinant-basics|determinant]] of a square matrix is the single number that decides invertibility. For $2 \times 2$ it is $ad - bc$; for $3 \times 3$ it can be expanded along a row, $\det\begin{pmatrix} 2 & 1 & 3 \\ 0 & 4 & 1 \\ 5 & 2 & 0 \end{pmatrix} = 2(0 - 2) - 1(0 - 5) + 3(0 - 20) = -59$. Geometrically it is the signed area or volume of the parallelogram or box spanned by the rows. A square system has exactly one solution when the determinant is nonzero, and a homogeneous system $Ax = 0$ has a nonzero solution exactly when it is zero. The [[matrix-inverse|inverse]] exists in the same case; for $2 \times 2$, $\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \tfrac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$. [[cramers-rule|Cramer's rule]] solves for one unknown at a time: in $3x + 2y = 7$, $4x - y = 2$, the determinant is $-11$, and replacing the $y$ column by the constants gives $y = \tfrac{3 \cdot 2 - 7 \cdot 4}{-11} = 2$.

The [[chebyshev-polynomials|Chebyshev polynomials]] $T_n$ satisfy $\cos n\theta = T_n(\cos\theta)$ and the recurrence $T_{n+1}(x) = 2xT_n(x) - T_{n-1}(x)$, from the sum-to-product identity $\cos(n + 1)\theta + \cos(n - 1)\theta = 2\cos\theta\cos n\theta$. So $T_2 = 2x^2 - 1$, $T_3 = 4x^3 - 3x$, $T_4 = 8x^4 - 8x^2 + 1$, and if $\cos\theta = \tfrac13$ then $\cos 4\theta = \tfrac{8}{81} - \tfrac89 + 1 = \tfrac{17}{81}$. They connect the trigonometry chapter with the linear recurrences of the sequences chapter.

Use matrices when a problem is about a linear system or a linear recurrence and the direct method is long; otherwise the elimination and characteristic-root methods of earlier chapters are shorter. The last lesson collects inequalities and substitutions used in olympiads.`,
      related: [
        { card: "linear-recurrence", note: String.raw`the characteristic roots are the eigenvalues of the step matrix (A3.2).` },
        { card: "triple-angle", note: String.raw`$T_3(x) = 4x^3 - 3x$ is the triple-angle formula (A7.3).` },
        { card: "shoelace-formula", note: String.raw`the area of a polygon as a sum of $2 \times 2$ determinants.` }
      ],
      exercises: [
        { q: String.raw`Find the top-left entry of $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^{10}$.`, answer: "89",
          solution: String.raw`$M^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$, as induction on $n$ shows, so the entry is $F_{11} = 89$ (the Fibonacci numbers $1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89$).` },
        { q: String.raw`Find $\det\begin{pmatrix} 2 & 1 & 3 \\ 0 & 4 & 1 \\ 5 & 2 & 0 \end{pmatrix}$.`, answer: "-59",
          solution: String.raw`Expand along the first row: $2(4 \cdot 0 - 1 \cdot 2) - 1(0 \cdot 0 - 1 \cdot 5) + 3(0 \cdot 2 - 4 \cdot 5) = -4 + 5 - 60 = -59$.` },
        { q: String.raw`Use Cramer's rule to find $y$ in the system $3x + 2y = 7$, $4x - y = 2$.`, answer: "2",
          solution: String.raw`The determinant is $3(-1) - 2 \cdot 4 = -11$. Replacing the $y$ column by the constants gives $\det\begin{pmatrix} 3 & 7 \\ 4 & 2 \end{pmatrix} = 6 - 28 = -22$, so $y = \tfrac{-22}{-11} = 2$ (and $x = 1$).` },
        { q: String.raw`If $\cos\theta = \tfrac13$, find $\cos 4\theta$.`, answer: "17/81",
          solution: String.raw`$\cos 4\theta = T_4(\cos\theta)$ with $T_4(x) = 8x^4 - 8x^2 + 1$: $\tfrac{8}{81} - \tfrac{8}{9} + 1 = \tfrac{8 - 72 + 81}{81} = \tfrac{17}{81}$.` }
      ],
      problems: ["2022 AMC 10B, Problem 18"]
    },
    "A9.5": {
      prereq: ["am-gm", "cauchy-schwarz", "double-angle"],
      cards: ["nesbitt-inequality", "tangent-line-trick", "normalization", "weierstrass-substitution", "even-power-sin-cos-sums", "evenly-spaced-angle-products"],
      body: String.raw`A few more inequalities and substitutions recur in olympiad algebra and occasionally simplify an AIME problem. Nesbitt's inequality and the tangent line trick prove symmetric bounds; normalization uses the freedom to choose a scale; and three trigonometric devices turn sines and cosines into rational functions, collapse high powers, and evaluate products at evenly spaced angles.

[[nesbitt-inequality|Nesbitt's inequality]] says that for positive $a$, $b$, $c$, $\tfrac{a}{b + c} + \tfrac{b}{c + a} + \tfrac{c}{a + b} \ge \tfrac32$, with equality when $a = b = c$. One proof adds $1$ to each fraction, which gives $(a + b + c)\left(\tfrac{1}{b + c} + \tfrac{1}{c + a} + \tfrac{1}{a + b}\right)$, and the arithmetic-harmonic mean inequality bounds that by $\tfrac92$. The [[tangent-line-trick|tangent line trick]] proves a bound on $f(a) + f(b) + f(c)$ under $a + b + c = 3$ by showing $f(x) \ge f(1) + f'(1)(x - 1)$ on the allowed range and adding: for $f(x) = x^3$, $x^3 - 3x + 2 = (x - 1)^2(x + 2) \ge 0$ when $x \ge -2$, so $a^3 + b^3 + c^3 \ge 3(a + b + c) - 6 = 3$. [[normalization|Normalization]] fixes a scale when an expression is homogeneous, meaning every term has the same degree: then one may assume $a + b + c = 3$ or $abc = 1$, which makes a tangent line or AM-GM argument possible.

The [[weierstrass-substitution|Weierstrass substitution]] $t = \tan\tfrac\theta2$ gives $\sin\theta = \tfrac{2t}{1 + t^2}$ and $\cos\theta = \tfrac{1 - t^2}{1 + t^2}$, so any rational expression in $\sin\theta$ and $\cos\theta$ becomes a rational function of $t$; with $t = \tfrac12$, $\sin\theta + \cos\theta = \tfrac{4/5 + 3/5}{1} = \tfrac75$. For [[even-power-sin-cos-sums|high powers of sine and cosine]], square or cube $\sin^2\theta + \cos^2\theta = 1$: $\sin^4\theta + \cos^4\theta = 1 - 2\sin^2\theta\cos^2\theta = 1 - \tfrac12\sin^2 2\theta$, and $\sin^6\theta + \cos^6\theta = 1 - \tfrac34\sin^2 2\theta$. So when $\sin 2\theta = \tfrac23$, $\sin^4\theta + \cos^4\theta = \tfrac79$. For [[evenly-spaced-angle-products|products at evenly spaced angles]], $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \tfrac14\sin 3\theta$, so $\sin 20^\circ\sin 40^\circ\sin 80^\circ = \tfrac14\sin 60^\circ = \tfrac{\sqrt3}{8}$, and in general products of sines at angles spaced by $\tfrac\pi n$ come from the factorization of $z^n - 1$.

These tools finish the algebra book. Each is a shortcut for a specific shape: a cyclic sum of fractions, a sum of one function of each variable, a homogeneous inequality, a rational expression in sine and cosine, a high even power, or a product over a regular pattern of angles. The Summary (A9.6) collects the chapter's strategies.`,
      related: [
        { card: "mean-chain", note: String.raw`the arithmetic-harmonic step in the proof of Nesbitt's inequality (A5.2).` },
        { card: "derivative-extremum", note: String.raw`the tangent line at the equality point, found with a derivative (A5.5).` },
        { card: "roots-unity-distance-product", note: String.raw`the root-of-unity factorization behind evenly spaced sine products (A6.5).` },
        { card: "double-angle", note: String.raw`the half-angle tangent formulas that the Weierstrass substitution uses (A7.3).` }
      ],
      exercises: [
        { q: String.raw`Positive reals $a$, $b$, $c$ satisfy $a + b + c = 3$. Find the smallest value of $a^3 + b^3 + c^3$.`, answer: "3",
          solution: String.raw`For $x \gt 0$, $x^3 - (3x - 2) = (x - 1)^2(x + 2) \ge 0$, so $x^3 \ge 3x - 2$, the tangent line at $x = 1$. Adding for $a$, $b$, $c$: $a^3 + b^3 + c^3 \ge 3 \cdot 3 - 6 = 3$, with equality at $a = b = c = 1$.` },
        { q: String.raw`If $\tan\tfrac\theta2 = \tfrac12$, find $\sin\theta + \cos\theta$.`, answer: "7/5",
          solution: String.raw`With $t = \tfrac12$, $\sin\theta = \tfrac{2t}{1 + t^2} = \tfrac{1}{5/4} = \tfrac45$ and $\cos\theta = \tfrac{1 - t^2}{1 + t^2} = \tfrac{3/4}{5/4} = \tfrac35$. The sum is $\tfrac75$.` },
        { q: String.raw`If $\sin 2\theta = \tfrac23$, find $\sin^4\theta + \cos^4\theta$.`, answer: "7/9",
          solution: String.raw`$\sin^4\theta + \cos^4\theta = (\sin^2\theta + \cos^2\theta)^2 - 2\sin^2\theta\cos^2\theta = 1 - \tfrac12\sin^2 2\theta = 1 - \tfrac12 \cdot \tfrac49 = \tfrac79$.` },
        { q: String.raw`Find $\sin 20^\circ\sin 40^\circ\sin 80^\circ$.`, answer: "sqrt(3)/8",
          solution: String.raw`With $\theta = 20^\circ$, the angles are $\theta$, $60^\circ - \theta$ and $60^\circ + \theta$, and $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \tfrac14\sin 3\theta$. So the product is $\tfrac14\sin 60^\circ = \tfrac{\sqrt3}{8}$.` }
      ],
      problems: []
    },
    "A9.6": {
      prereq: ["higher-power-sums", "integer-valued-polynomials", "cauchy-functional-equations", "injectivity-surjectivity", "matrix-power-diagonalizing", "determinant-basics", "cramers-rule", "nesbitt-inequality", "tangent-line-trick", "evenly-spaced-angle-products"],
      cards: [],
      body: String.raw`[[higher-power-sums|The sums of $k$th powers]] are polynomials of degree $k + 1$, and [[integer-valued-polynomials|a polynomial with integer values]] is an integer combination of binomial coefficients, read from its differences.

[[cauchy-functional-equations|The Cauchy equations]] force linear, exponential or power functions once a mild condition holds, and [[injectivity-surjectivity|proving a function one-to-one or onto]] unlocks substitutions in harder equations.

A linear recurrence is [[matrix-power-diagonalizing|a matrix power]]. [[determinant-basics|The determinant]] measures how a map scales area and decides whether a system has a unique solution, which [[cramers-rule|Cramer's rule]] gives.

[[nesbitt-inequality|Nesbitt's inequality]] and [[tangent-line-trick|the tangent line trick]] handle symmetric fractions and sums of one function of each variable, and [[evenly-spaced-angle-products|products of sines at evenly spaced angles]] come from the roots of unity.`,
      strategies: [
        String.raw`For a sum of powers, use the known formulas, or the fact that the sum is a polynomial of one degree higher fixed by a few values.`,
        String.raw`For a polynomial that must take integer values, write it in binomial coefficients.`,
        String.raw`For a functional equation like Cauchy's, find $f$ on the integers, then the rationals, then use the extra condition.`,
        String.raw`Prove a function is one-to-one or onto before substituting cleverly.`,
        String.raw`Write a linear recurrence as a matrix power.`,
        String.raw`For a homogeneous inequality, normalize the variables first.`,
        String.raw`For products or sums of trigonometric values at evenly spaced angles, go to the roots of unity.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find $1^4 + 2^4 + \cdots + 10^4$.`, answer: "25333",
        solution: String.raw`Use $\sum_{k=1}^{n} k^4 = \tfrac{n(n + 1)(2n + 1)(3n^2 + 3n - 1)}{30}$: for $n = 10$ it is $\tfrac{10 \cdot 11 \cdot 21 \cdot 329}{30} = 25333$.` },
      { q: String.raw`A polynomial of degree $2$ has $P(0) = 1$, $P(1) = 3$ and $P(2) = 8$. Find $P(5)$.`, answer: "41",
        solution: String.raw`The differences are $2, 5$ and the second difference is $3$, so $P(x) = 1 + 2\binom x1 + 3\binom x2$. Then $P(5) = 1 + 10 + 30 = 41$.` },
      { q: String.raw`Let $M = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$. Find the upper right entry of $M^{10}$.`, answer: "10",
        solution: String.raw`Multiplying, $M^2 = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$, and by induction $M^n = \begin{pmatrix} 1 & n \\ 0 & 1 \end{pmatrix}$. So the entry is $10$.` },
      { q: String.raw`Use Cramer's rule to find $x$ when $2x + y = 5$ and $x - 3y = -1$.`, answer: "2",
        solution: String.raw`The determinant of the system is $2(-3) - 1 \cdot 1 = -7$. Replacing the first column by the constants gives $5(-3) - 1(-1) = -14$. So $x = \tfrac{-14}{-7} = 2$ (and $y = 1$).` },
      { q: String.raw`Find the least value of $\dfrac{a}{b + c} + \dfrac{b}{c + a} + \dfrac{c}{a + b}$ for positive $a$, $b$, $c$.`, answer: "3/2",
        solution: String.raw`Add $1$ to each term: the sum plus $3$ is $(a + b + c)\left(\tfrac{1}{b + c} + \tfrac{1}{c + a} + \tfrac{1}{a + b}\right) = \tfrac12\left((b + c) + (c + a) + (a + b)\right)\left(\sum \tfrac{1}{b + c}\right) \ge \tfrac92$ by Cauchy-Schwarz. So the sum is at least $\tfrac32$, with equality at $a = b = c$ (Nesbitt's inequality).` },
      { q: String.raw`Find $\sin\tfrac\pi7\sin\tfrac{2\pi}{7}\sin\tfrac{3\pi}{7}$.`, answer: "sqrt(7)/8",
        solution: String.raw`The product of all six values $\sin\tfrac{k\pi}{7}$, $k = 1, \ldots, 6$, is $\tfrac{7}{2^6}$, from $\prod_{k=1}^{6} |1 - \omega^k| = 7$ with $|1 - e^{i\theta}| = 2\sin\tfrac\theta2$. The values for $k$ and $7 - k$ are equal, so the product of the first three is $\sqrt{\tfrac{7}{64}} = \tfrac{\sqrt7}{8}$.` },
      { q: String.raw`Find $\sum_{k=0}^{5} \cos^2\tfrac{k\pi}{6}$.`, answer: "3",
        solution: String.raw`Write $\cos^2\theta = \tfrac{1 + \cos 2\theta}{2}$. The angles $\tfrac{k\pi}{3}$, $k = 0, \ldots, 5$, are evenly spaced around the circle, so their cosines add to $0$. The sum is $\tfrac{6}{2} = 3$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Find the remainder when $1^3 + 2^3 + \cdots + 100^3$ is divided by $1000$.`, answer: "500",
        solution: String.raw`The sum is $\left(\tfrac{100 \cdot 101}{2}\right)^2 = 5050^2 = 25502500$, which leaves $500$.` },
      { q: String.raw`The Fibonacci numbers satisfy $\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Using $M^{20} = (M^{10})^2$ with $M^{10} = \begin{pmatrix} 89 & 55 \\ 55 & 34 \end{pmatrix}$, find $F_{20}$.`, answer: "6765",
        solution: String.raw`$M^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$, so $F_{20}$ is the off-diagonal entry of $(M^{10})^2$: $89 \cdot 55 + 55 \cdot 34 = 55 \cdot 123 = 6765$.` },
      { q: String.raw`If $\tan\tfrac x2 = \tfrac12$, find $\sin x + \cos x$.`, answer: "7/5",
        solution: String.raw`With $t = \tan\tfrac x2$, $\sin x = \tfrac{2t}{1 + t^2} = \tfrac{1}{5/4} = \tfrac45$ and $\cos x = \tfrac{1 - t^2}{1 + t^2} = \tfrac{3/4}{5/4} = \tfrac35$. The sum is $\tfrac75$.` }
    ],
    problems: []
  }
};
