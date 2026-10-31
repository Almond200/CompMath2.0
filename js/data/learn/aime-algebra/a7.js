// Learn, AIME Algebra, chapter A7: trigonometric algebra (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A7"] = {
  lessons: {
    "A7.1": {
      prereq: ["pythagorean-theorem"],
      cards: ["pythagorean-identities", "common-angle-values", "special-trig-values", "reduction-identities"],
      body: String.raw`Trigonometry in algebra problems is mostly bookkeeping between the six functions of one angle and between related angles. Given $\sec x + \tan x$, find $\sec x - \tan x$; given $\sin x + \cos x$, find $\sin x\cos x$; add $\sin^2 1^\circ + \sin^2 2^\circ + \cdots + \sin^2 89^\circ$. None of these needs a calculator or a new formula: each uses the Pythagorean identity, the exact values of a few angles, and the rules that move an angle into the first quadrant.

On the unit circle the point at angle $\theta$ is $(\cos\theta, \sin\theta)$, so the [[pythagorean-identities|Pythagorean identity]] $\sin^2\theta + \cos^2\theta = 1$ is the equation of the circle. Dividing by $\cos^2\theta$ or $\sin^2\theta$ gives $1 + \tan^2\theta = \sec^2\theta$ and $1 + \cot^2\theta = \csc^2\theta$. These are most useful in factored form. Since $\sec^2 x - \tan^2 x = 1$, the numbers $\sec x + \tan x$ and $\sec x - \tan x$ are reciprocals, so knowing one gives the other, and adding them gives $2\sec x$. Since $(\sin x + \cos x)^2 = 1 + 2\sin x\cos x$, knowing the sum $s = \sin x + \cos x$ gives the product $\sin x\cos x = \tfrac{s^2 - 1}{2}$, and then any symmetric expression in $\sin x$ and $\cos x$, exactly as with the symmetric systems of the first chapter: $\sin^3 x + \cos^3 x = s(1 - \sin x\cos x)$. When one function is given, the others follow from a right triangle, with the sign read from the quadrant: if $\tan\theta = \tfrac34$ and $\theta$ is in the third quadrant, then $\sin\theta = -\tfrac35$ and $\cos\theta = -\tfrac45$.

The [[common-angle-values|values at $30^\circ$, $45^\circ$ and $60^\circ$]] come from the two special right triangles: $\sin 30^\circ = \tfrac12$, $\sin 45^\circ = \tfrac{\sqrt2}{2}$, $\sin 60^\circ = \tfrac{\sqrt3}{2}$, and the cosines in the reverse order. A few more [[special-trig-values|special values]] are worth knowing by heart because they recur: $\tan 15^\circ = 2 - \sqrt3$ and $\tan 75^\circ = 2 + \sqrt3$, $\sin 15^\circ = \tfrac{\sqrt6 - \sqrt2}{4}$, and $\cos 36^\circ = \tfrac{1 + \sqrt5}{4}$, which belongs to the regular pentagon. Problems signal these angles by mentioning a regular dodecagon, a $15^\circ$ or $75^\circ$ angle, or a pentagon.

The [[reduction-identities|reduction identities]] relate the functions at related angles. Cofunctions swap at complementary angles, $\sin(90^\circ - \theta) = \cos\theta$; sine is odd and cosine is even; adding $180^\circ$ changes the sign of sine and cosine and leaves tangent alone; and every function repeats every $360^\circ$. With them, any angle reduces to one between $0^\circ$ and $90^\circ$, and sums over many angles pair up: in $\sin^2 1^\circ + \cdots + \sin^2 89^\circ$, the terms $\sin^2 k^\circ$ and $\sin^2(90 - k)^\circ = \cos^2 k^\circ$ add to $1$, so the $44$ pairs and the middle term $\sin^2 45^\circ = \tfrac12$ give $44.5$. When an angle is a fraction of a full turn, such as $c = \tfrac{2\pi}{11}$, reducing modulo the period shows which of $\sin 6c, \sin 9c, \ldots$ are the negatives of smaller ones.

These identities are the first thing to try in any trigonometric expression: rewrite in sines and cosines, reduce the angles, and use the Pythagorean identity to trade squares. The next lesson adds the formulas for sums and multiples of angles.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`the same sum-and-product bookkeeping as for $x + y$ and $xy$ ((A1.2)).` },
        { card: "special-right-triangles", note: String.raw`the triangles that give the common angle values.` },
        { card: "fx-pairing", note: String.raw`pairing $k^\circ$ with $(90 - k)^\circ$ is pairing symmetric terms (A4.1).` },
        { card: "golden-ratio-pentagon", note: String.raw`where $\cos 36^\circ = \tfrac{1 + \sqrt5}{4}$ comes from.` }
      ],
      exercises: [
        { q: String.raw`The angle $\theta$ is in the third quadrant and $\tan\theta = \tfrac34$. Find $\sin\theta + \cos\theta$.`, answer: "-7/5",
          solution: String.raw`A right triangle with legs $3$ and $4$ has hypotenuse $5$, so $|\sin\theta| = \tfrac35$ and $|\cos\theta| = \tfrac45$. In the third quadrant both are negative, so $\sin\theta + \cos\theta = -\tfrac35 - \tfrac45 = -\tfrac75$.` },
        { q: String.raw`If $\sin x + \cos x = \tfrac12$, find $\sin^3 x + \cos^3 x$.`, answer: "11/16",
          solution: String.raw`Squaring, $1 + 2\sin x\cos x = \tfrac14$, so $\sin x\cos x = -\tfrac38$. Then $\sin^3 x + \cos^3 x = (\sin x + \cos x)(\sin^2 x - \sin x\cos x + \cos^2 x) = \tfrac12\left(1 + \tfrac38\right) = \tfrac{11}{16}$.` },
        { q: String.raw`Find $\sin^2 1^\circ + \sin^2 2^\circ + \cdots + \sin^2 89^\circ$.`, answer: "89/2",
          solution: String.raw`Pair $k^\circ$ with $(90 - k)^\circ$: $\sin^2 k^\circ + \sin^2(90 - k)^\circ = \sin^2 k^\circ + \cos^2 k^\circ = 1$. The $44$ pairs with $k = 1, \ldots, 44$ give $44$, and the middle term $\sin^2 45^\circ = \tfrac12$ brings the sum to $\tfrac{89}{2}$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 11",
        "2010 AMC 12B, Problem 20",
        "2021 Fall AMC 12B, Problem 13",
        "1991 AIME, Problem 9",
        "2003 AIME I, Problem 4",
        "1995 AIME, Problem 7",
        "2011 AIME I, Problem 9"
      ]
    },
    "A7.2": {
      prereq: ["eulers-formula"],
      cards: ["angle-addition", "double-angle", "half-angle", "triple-angle", "product-sum", "harmonic-addition"],
      body: String.raw`The second layer of trigonometric algebra is a set of formulas that rewrite functions of sums, differences and multiples of angles. They turn $\tan 75^\circ$ into $2 + \sqrt3$, $\sin 3x$ into a polynomial in $\sin x$, a sum of two cosines into a product, and $3\sin x + 4\cos x$ into a single wave of amplitude $5$. Problems use them to collapse an expression, to solve an equation by factoring, or to find a largest value; the skill is choosing the formula that moves toward a factorization or a known value.

The [[angle-addition|angle-addition formulas]] are $\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$, $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$ and $\tan(a \pm b) = \tfrac{\tan a \pm \tan b}{1 \mp \tan a\tan b}$. They are the real and imaginary parts of $e^{ia}e^{ib} = e^{i(a + b)}$, which is the quickest way to rebuild them. The tangent formula is the one used most in coordinate problems, since a slope is the tangent of the angle a line makes with the axis: the angle between lines of slopes $m_1$ and $m_2$ has tangent $\left|\tfrac{m_1 - m_2}{1 + m_1m_2}\right|$. Expanding $\cos(a - b)$ also explains a common trick: squaring and adding $\sin a + \sin b$ and $\cos a + \cos b$ gives $2 + 2\cos(a - b)$.

Setting $b = a$ gives the [[double-angle|double-angle formulas]] $\sin 2a = 2\sin a\cos a$, $\cos 2a = \cos^2 a - \sin^2 a = 1 - 2\sin^2 a = 2\cos^2 a - 1$ and $\tan 2a = \tfrac{2\tan a}{1 - \tan^2 a}$. In terms of $t = \tan a$, $\sin 2a = \tfrac{2t}{1 + t^2}$ and $\cos 2a = \tfrac{1 - t^2}{1 + t^2}$, so $\tan a = 2$ gives $\sin 2a = \tfrac45$ and $\cos 2a = -\tfrac35$. Solving the cosine formulas for the squares gives the [[half-angle|half-angle formulas]] $\sin^2\tfrac a2 = \tfrac{1 - \cos a}{2}$, $\cos^2\tfrac a2 = \tfrac{1 + \cos a}{2}$ and $\tan\tfrac a2 = \tfrac{\sin a}{1 + \cos a}$, which lower the power of a function at the cost of halving the angle. Applying addition once more gives the [[triple-angle|triple-angle formulas]] $\sin 3a = 3\sin a - 4\sin^3 a$ and $\cos 3a = 4\cos^3 a - 3\cos a$, which turn an equation in $3a$ and $a$ into a cubic.

Adding the two expansions of $\sin(a + b)$ and $\sin(a - b)$ gives the [[product-sum|product-to-sum formulas]], such as $2\sin a\cos b = \sin(a + b) + \sin(a - b)$, and read backward, the sum-to-product formulas, such as $\cos x + \cos y = 2\cos\tfrac{x + y}{2}\cos\tfrac{x - y}{2}$. Sum-to-product is the tool for equations: $\sin 75^\circ - \sin 15^\circ = 2\cos 45^\circ\sin 30^\circ = \tfrac{\sqrt2}{2}$, and an equation such as $\cos 3x + \cos 5x = 2\cos 4x\cos x$ lets a sum of cubes be compared with a product. Product-to-sum is the tool for sums, since it turns each product into a difference that may telescope, as the last lesson shows.

[[harmonic-addition|Harmonic addition]] combines $a\sin x + b\cos x$ into $R\sin(x + \varphi)$ with $R = \sqrt{a^2 + b^2}$; the point $(a, b)$ gives the angle $\varphi$ and the length $R$. So $3\sin x + 4\cos x$ ranges from $-5$ to $5$, and the largest value of $3\sin x + 4\cos x + 1$ is $6$. This is the Cauchy-Schwarz bound for a point on a circle, and it is also the real part of a product of two complex numbers, which is how it appears in problems about $\operatorname{Re}\left(az + \tfrac bz\right)$ with $|z|$ fixed.

Use addition and double-angle formulas to reach a known angle or a factorization, sum-to-product to solve equations, and harmonic addition for extreme values of a linear combination. The next lesson counts the solutions of trigonometric equations on an interval.`,
      related: [
        { card: "cauchy-schwarz", note: String.raw`the bound $|a\sin x + b\cos x| \le \sqrt{a^2 + b^2}$ (A5.2).` },
        { card: "de-moivre", note: String.raw`multiple-angle formulas from the binomial expansion of $(\cos x + i\sin x)^n$ (A6.2).` },
        { card: "angle-between-lines", note: String.raw`the tangent subtraction formula applied to slopes.` },
        { card: "chord-length", note: String.raw`half-angle sines in circle geometry: a chord is $2R\sin\tfrac\theta2$.` }
      ],
      exercises: [
        { q: String.raw`Find $\tan 15^\circ$.`, answer: "2-sqrt(3)",
          solution: String.raw`$\tan 15^\circ = \tan(45^\circ - 30^\circ) = \tfrac{1 - \tfrac{1}{\sqrt3}}{1 + \tfrac{1}{\sqrt3}} = \tfrac{\sqrt3 - 1}{\sqrt3 + 1} = \tfrac{(\sqrt3 - 1)^2}{2} = \tfrac{4 - 2\sqrt3}{2} = 2 - \sqrt3$.` },
        { q: String.raw`If $\tan\theta = 2$, find $\sin 2\theta + \cos 2\theta$.`, answer: "1/5",
          solution: String.raw`With $t = \tan\theta = 2$, $\sin 2\theta = \tfrac{2t}{1 + t^2} = \tfrac45$ and $\cos 2\theta = \tfrac{1 - t^2}{1 + t^2} = -\tfrac35$. The sum is $\tfrac15$.` },
        { q: String.raw`Find the largest value of $3\sin x + 4\cos x + 1$.`, answer: "6",
          solution: String.raw`By harmonic addition $3\sin x + 4\cos x = 5\sin(x + \varphi)$, where $\cos\varphi = \tfrac35$ and $\sin\varphi = \tfrac45$. Its largest value is $5$, reached when $x + \varphi = 90^\circ$, so the largest value of the expression is $6$.` },
        { q: String.raw`Find $\sin 75^\circ - \sin 15^\circ$.`, answer: "sqrt(2)/2",
          solution: String.raw`By sum-to-product, $\sin x - \sin y = 2\cos\tfrac{x + y}{2}\sin\tfrac{x - y}{2}$, so $\sin 75^\circ - \sin 15^\circ = 2\cos 45^\circ\sin 30^\circ = 2 \cdot \tfrac{\sqrt2}{2} \cdot \tfrac12 = \tfrac{\sqrt2}{2}$.` }
      ],
      problems: [
        "2018 AMC 12A, Problem 9",
        "2007 AMC 12A, Problem 17",
        "2004 AMC 12A, Problem 21",
        "2017 AMC 12A, Problem 15",
        "2022 AMC 12A, Problem 17",
        "2006 AMC 12B, Problem 24",
        "2012 AIME II, Problem 9",
        "2006 AIME I, Problem 12",
        "2024 AIME I, Problem 7"
      ]
    },
    "A7.3": {
      prereq: ["reduction-identities"],
      cards: ["inverse-trig-identities"],
      body: String.raw`A trigonometric equation usually has infinitely many solutions, and the question restricts them to an interval and asks how many there are, or what they add to. How many $x$ in $[0, 2\pi)$ satisfy $\sin 3x = \tfrac12$? For how many $x$ is $\sin x = \sin x^2$ on a given range? What is $\arcsin(\sin 5)$? The method is to find the general solution, written with an integer parameter, and then count the values of the parameter that land in the interval.

Two sines are equal exactly when the angles are equal or supplementary, up to full turns: $\sin\alpha = \sin\beta$ means $\alpha = \beta + 360^\circ k$ or $\alpha = 180^\circ - \beta + 360^\circ k$ for some integer $k$. For cosines the second family is $\alpha = -\beta + 360^\circ k$, and for tangents a single family $\alpha = \beta + 180^\circ k$ covers everything. These come straight from the unit circle: two points have the same height when they are the same point or mirror images across the vertical axis. So $\sin 3x = \tfrac12$ means $3x = 30^\circ + 360^\circ k$ or $3x = 150^\circ + 360^\circ k$, and as $x$ runs over $[0^\circ, 360^\circ)$, $3x$ runs over $[0^\circ, 1080^\circ)$, three full turns, each holding two solutions: $6$ in all. An equation such as $\sin x = \sin nx$ gives two arithmetic progressions of solutions, $x = \tfrac{360^\circ k}{n - 1}$ and $x = \tfrac{180^\circ(2k + 1)}{n + 1}$, and counting them on an interval is a floor-function computation, with care for values that belong to both families. When the equation mixes $x$ with $x^2$, as in $\sin x = \sin x^2$, the two families become two quadratic equations in $x$, one for each integer $k$, and counting means counting the $k$ for which a root lands in the interval.

Factoring is the other main route. Moving everything to one side and using a double-angle or sum-to-product formula often splits an equation into simpler ones: $\sin 2x = \sin x$ becomes $\sin x(2\cos x - 1) = 0$, so $\sin x = 0$ or $\cos x = \tfrac12$, which on $[0, 2\pi]$ gives $0, \tfrac\pi3, \pi, \tfrac{5\pi}3, 2\pi$, five solutions. The values the functions can take give quick bounds too: $|\sin| \le 1$, so an equation like $\cos\left(\tfrac\pi2\sin x\right) = \sin\left(\tfrac\pi2\cos x\right)$ forces its arguments into a narrow range before any formula is used.

The [[inverse-trig-identities|inverse trigonometric functions]] return a single angle in a fixed range: $\arcsin$ and $\arctan$ give angles in $\left[-\tfrac\pi2, \tfrac\pi2\right]$ and $\arccos$ gives angles in $[0, \pi]$. So $\arcsin(\sin\theta) = \theta$ only when $\theta$ is already in $\left[-\tfrac\pi2, \tfrac\pi2\right]$; otherwise reduce it first. For $\theta = 5$, the angle $5 - 2\pi \approx -1.28$ has the same sine and lies in the range, so $\arcsin(\sin 5) = 5 - 2\pi$. The identities $\arcsin x + \arccos x = \tfrac\pi2$ and $\arctan x + \arctan\tfrac1x = \tfrac\pi2$ for $x \gt 0$ follow from complementary angles. A domain restriction is also a condition: $\arcsin(u)$ exists only for $-1 \le u \le 1$, so a problem asking for the domain of $\arcsin(\log_m(nx))$ is really asking when $\tfrac1m \le nx \le m$.

When a trigonometric equation asks for a count or a sum of solutions, write the general solution with an integer parameter before doing anything else, and count parameters. The last lesson of the chapter uses trigonometry to do algebra.`,
      related: [
        { card: "floor-basics", note: String.raw`counting the integers $k$ that put a solution in an interval (A4.2).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions by drawing both sides when no formula splits the equation (A4.5).` },
        { card: "double-angle", note: String.raw`the identity that most often factors a trigonometric equation (A7.2).` }
      ],
      exercises: [
        { q: String.raw`How many $x$ with $0 \le x \lt 2\pi$ satisfy $\sin 3x = \tfrac12$?`, answer: "6",
          solution: String.raw`$\sin 3x = \tfrac12$ means $3x = \tfrac\pi6 + 2\pi k$ or $3x = \tfrac{5\pi}6 + 2\pi k$. As $x$ runs over $[0, 2\pi)$, $3x$ runs over $[0, 6\pi)$, three full turns, and each turn holds one angle from each family. So there are $6$ solutions.` },
        { q: String.raw`How many $x$ with $0 \le x \le 2\pi$ satisfy $\sin 2x = \sin x$?`, answer: "5",
          solution: String.raw`$\sin 2x - \sin x = \sin x(2\cos x - 1) = 0$, so $\sin x = 0$ or $\cos x = \tfrac12$. The first gives $0$, $\pi$, $2\pi$ and the second gives $\tfrac\pi3$, $\tfrac{5\pi}{3}$. These are $5$ different solutions.` },
        { q: String.raw`Find $\arcsin(\sin 5)$, where $5$ is in radians.`, answer: "5-2pi",
          solution: String.raw`$\arcsin$ returns the angle in $\left[-\tfrac\pi2, \tfrac\pi2\right]$ with the given sine. The angle $5 - 2\pi \approx -1.283$ has the same sine as $5$ (it differs by a full turn) and lies in that range, so $\arcsin(\sin 5) = 5 - 2\pi$.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 15",
        "2021 Spring AMC 12A, Problem 19",
        "2007 AMC 12A, Problem 24",
        "2021 Fall AMC 12A, Problem 19",
        "2009 AMC 12B, Problem 24",
        "2002 AIME II, Problem 10",
        "2013 AIME I, Problem 8"
      ]
    },
    "A7.4": {
      prereq: ["angle-addition", "product-sum", "telescoping"],
      cards: ["trig-substitution", "arctan-telescoping", "sin-cos-ap-sum", "cot-tan-telescoping", "trig-telescoping-product"],
      body: String.raw`Trigonometric identities are also an algebra tool. A radical $\sqrt{1 - x^2}$ disappears when $x = \sin\theta$, a sum of arctangents collapses when each term is a difference, and products like $\cos 20^\circ\cos 40^\circ\cos 80^\circ$ or sums like $\sin 5^\circ + \sin 10^\circ + \cdots + \sin 175^\circ$ have closed forms. Each of these is a telescope or a substitution in disguise, and recognizing the disguise is most of the work.

A [[trig-substitution|trigonometric substitution]] replaces a variable by a trigonometric function so that an identity does the algebra. If $|x| \le 1$, put $x = \sin\theta$, and $\sqrt{1 - x^2}$ becomes $\cos\theta$; then the largest value of $x + \sqrt{1 - x^2}$ is the largest value of $\sin\theta + \cos\theta$, which is $\sqrt2$. If $x$ can be any real number, $x = \tan\theta$ turns $1 + x^2$ into $\sec^2\theta$ and $\tfrac{2x}{1 - x^2}$ into $\tan 2\theta$. The signals are a radical of the form $\sqrt{1 - x^2}$ or $\sqrt{a^2 - x^2}$, a recursion like $a_{n+1} = \tfrac45a_n + \tfrac35\sqrt{1 - a_n^2}$ (which is the sine addition formula, so each step adds a fixed angle), or a symmetric system whose terms look like $\sqrt{x(2 - y)}$, which $x = 2\sin^2 A$ turns into products of sines and cosines.

The tangent subtraction formula read backward is [[arctan-telescoping|arctangent telescoping]]: $\arctan a - \arctan b = \arctan\tfrac{a - b}{1 + ab}$. A term $\arctan\tfrac{1}{k^2 + k + 1}$ has the form $\arctan\tfrac{(k + 1) - k}{1 + k(k + 1)}$, so it equals $\arctan(k + 1) - \arctan k$, and $\sum_{k=1}^{9}\arctan\tfrac{1}{k^2 + k + 1} = \arctan 10 - \arctan 1$, whose tangent is $\tfrac{10 - 1}{1 + 10} = \tfrac{9}{11}$. Adding arctangents forward with $\arctan a + \arctan b = \arctan\tfrac{a + b}{1 - ab}$ works the same way, with care that the angle stays in the range of $\arctan$ (true while $ab \lt 1$ for positive $a$, $b$).

Sums of sines or cosines at angles in arithmetic progression have [[sin-cos-ap-sum|a closed form]]: $\sum_{k=1}^{n}\sin k\theta = \tfrac{\sin\tfrac{n\theta}{2}\sin\tfrac{(n + 1)\theta}{2}}{\sin\tfrac\theta2}$, and the same with cosine in the middle factor for cosine sums. The proof is a telescope: multiply by $2\sin\tfrac\theta2$, and product-to-sum turns each $2\sin\tfrac\theta2\sin k\theta$ into $\cos\left(k - \tfrac12\right)\theta - \cos\left(k + \tfrac12\right)\theta$. In practice the formula, or the telescope itself, turns a sum like $\sin 30^\circ + \sin 60^\circ + \cdots + \sin 180^\circ$ into $\tfrac{\sin 90^\circ\sin 105^\circ}{\sin 15^\circ} = \cot 15^\circ = 2 + \sqrt3$. The same sum is also the imaginary part of a geometric series in $e^{i\theta}$.

Doubling identities make two more telescopes. From $\cot\theta - \cot 2\theta = \csc 2\theta$, a sum of cosecants at doubling angles collapses, and from $\tan\theta = \cot\theta - 2\cot 2\theta$, so does a weighted sum of tangents; these are the [[cot-tan-telescoping|cotangent-tangent telescopes]]. For products, [[trig-telescoping-product|the doubling formula]] $\sin 2x = 2\sin x\cos x$ absorbs one cosine at a time: multiplying $\cos 20^\circ\cos 40^\circ\cos 80^\circ$ by $\sin 20^\circ$ gives $\tfrac12\sin 40^\circ\cos 40^\circ\cos 80^\circ = \tfrac14\sin 80^\circ\cos 80^\circ = \tfrac18\sin 160^\circ$, and since $\sin 160^\circ = \sin 20^\circ$ the product is $\tfrac18$.

Look for a telescope whenever a trigonometric sum or product runs over many evenly spaced or doubling angles, and for a substitution whenever an algebraic expression has the shape of an identity. The next chapter brings together the algebraic structures of the whole book.`,
      related: [
        { card: "telescoping", note: String.raw`the general method behind every collapse in this lesson (A3.2).` },
        { card: "trig-series-complex", note: String.raw`the same sums as geometric series in $e^{i\theta}$ (A6.3).` },
        { card: "weierstrass-substitution", note: String.raw`the substitution $t = \tan\tfrac\theta2$ that makes sine and cosine rational (A9.4).` },
        { card: "evenly-spaced-angle-products", note: String.raw`products of sines at evenly spaced angles, from roots of unity (A9.4).` }
      ],
      exercises: [
        { q: String.raw`Find $\tan\left(\displaystyle\sum_{k=1}^{9}\arctan\tfrac{1}{k^2 + k + 1}\right)$.`, answer: "9/11",
          solution: String.raw`Since $\tfrac{1}{k^2 + k + 1} = \tfrac{(k + 1) - k}{1 + k(k + 1)}$, each term is $\arctan(k + 1) - \arctan k$, and the sum telescopes to $\arctan 10 - \arctan 1$. Its tangent is $\tfrac{10 - 1}{1 + 10 \cdot 1} = \tfrac{9}{11}$.` },
        { q: String.raw`Find $\cos 20^\circ\cos 40^\circ\cos 80^\circ$.`, answer: "1/8",
          solution: String.raw`Multiply by $\sin 20^\circ$ and double three times: $\sin 20^\circ\cos 20^\circ\cos 40^\circ\cos 80^\circ = \tfrac12\sin 40^\circ\cos 40^\circ\cos 80^\circ = \tfrac14\sin 80^\circ\cos 80^\circ = \tfrac18\sin 160^\circ$. Since $\sin 160^\circ = \sin 20^\circ$, the product is $\tfrac18$.` },
        { q: String.raw`Find $\sin 30^\circ + \sin 60^\circ + \sin 90^\circ + \sin 120^\circ + \sin 150^\circ + \sin 180^\circ$.`, answer: "2+sqrt(3)",
          solution: String.raw`By the formula for sines in arithmetic progression with $\theta = 30^\circ$ and $n = 6$, the sum is $\tfrac{\sin 90^\circ\sin 105^\circ}{\sin 15^\circ} = \tfrac{\cos 15^\circ}{\sin 15^\circ} = \cot 15^\circ = 2 + \sqrt3$. Directly: $\tfrac12 + \tfrac{\sqrt3}{2} + 1 + \tfrac{\sqrt3}{2} + \tfrac12 + 0 = 2 + \sqrt3$.` },
        { q: String.raw`Find the largest value of $x + \sqrt{1 - x^2}$ for $-1 \le x \le 1$.`, answer: "sqrt(2)",
          solution: String.raw`Put $x = \sin\theta$ with $-\tfrac\pi2 \le \theta \le \tfrac\pi2$, so $\sqrt{1 - x^2} = \cos\theta$ and the expression is $\sin\theta + \cos\theta = \sqrt2\sin\left(\theta + \tfrac\pi4\right)$. Its largest value is $\sqrt2$, at $\theta = \tfrac\pi4$, that is $x = \tfrac{\sqrt2}{2}$.` }
      ],
      problems: [
        "2008 AIME I, Problem 8",
        "1999 AIME, Problem 11",
        "1997 AIME, Problem 11",
        "2008 AIME II, Problem 8",
        "2015 AIME II, Problem 13",
        "2009 AIME II, Problem 14",
        "2022 AIME I, Problem 15"
      ]
    }
  },
  review: [
    "2005 AMC 12B, Problem 24",
    "2004 AMC 12B, Problem 24",
    "2014 AMC 12B, Problem 25",
    "2020 AMC 12B, Problem 25",
    "2021 Spring AMC 12A, Problem 22",
    "2024 AMC 12A, Problem 23",
    "2023 AMC 12A, Problem 25",
    "2014 AIME II, Problem 12"
  ]
};
