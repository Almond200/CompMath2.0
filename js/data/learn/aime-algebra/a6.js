// Learn, AIME Algebra, chapter A6: complex numbers and roots of unity (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["A6"] = {
  lessons: {
    "A6.1": {
      prereq: ["quadratic-formula"],
      cards: ["complex-basics", "conjugate-both-sides", "complex-modulus-argument"],
      body: String.raw`Complex numbers enter contest problems in two ways: as the roots of polynomials that have no real roots, and as a way to do plane geometry with algebra. In either case the first skills are arithmetic ones: dividing by a complex number, finding a power of $i$, solving an equation with $z$ and its conjugate $\bar z$ both in it, or reading a condition such as $|z| = 1$ or "$z$ is real" as an equation. A problem such as finding $z$ with $\tfrac{z}{z + n} = 4i$, or the positive integer $b$ that makes $(9 + bi)^3$ real, comes down to these steps done carefully.

A [[complex-basics|complex number]] is $z = a + bi$ with $a$ and $b$ real and $i^2 = -1$. Its conjugate is $\bar z = a - bi$ and its modulus is $|z| = \sqrt{a^2 + b^2}$, its distance from $0$ in the plane. The product $z\bar z = a^2 + b^2 = |z|^2$ is real, and that is how division works: multiply the top and bottom by the conjugate of the bottom, so $\tfrac{2 + 3i}{1 - i} = \tfrac{(2 + 3i)(1 + i)}{2} = \tfrac{-1 + 5i}{2}$. Powers of $i$ repeat with period $4$ ($i, -1, -i, 1$), so $i^{n}$ depends only on $n$ modulo $4$, and a long sum of powers of $i$ is grouped in blocks of four. Two complex numbers are equal exactly when their real parts and imaginary parts are equal, so one complex equation is two real equations. To make $(9 + bi)^3$ real, expand it and set the imaginary part, $243b - b^3$, equal to zero.

Moduli multiply and conjugation respects every operation: $|zw| = |z||w|$, $\left|\tfrac zw\right| = \tfrac{|z|}{|w|}$, $\overline{zw} = \bar z\,\bar w$ and $\overline{z + w} = \bar z + \bar w$. Because of the second fact, [[conjugate-both-sides|conjugating both sides]] of an equation gives another true equation, often the one that was missing. The conditions in a problem translate directly: $z$ is real exactly when $z = \bar z$, purely imaginary exactly when $z = -\bar z$, and on the unit circle exactly when $\bar z = \tfrac1z$. To solve $z^2 = \bar z$, take moduli first: $|z|^2 = |z|$, so $|z|$ is $0$ or $1$. If $|z| = 1$ then $\bar z = \tfrac1z$, so $z^3 = 1$, which has three solutions; with $z = 0$ there are four. If a polynomial has real coefficients, conjugating $P(r) = 0$ gives $P(\bar r) = 0$, so non-real roots come in conjugate pairs.

A [[complex-modulus-argument|known modulus or argument]] is a geometric condition. A fixed modulus $|z - c| = r$ puts $z$ on a circle of radius $r$ about $c$, and $|z - a| = |z - b|$ puts it on the perpendicular bisector of $a$ and $b$. A fixed argument puts $z$ on a ray from $0$. Questions about the largest or smallest value of $|z - w|$ then become distance questions: if $|z| = 1$, the farthest $z$ from $3 + 4i$ is on the line through $0$ and $3 + 4i$, on the far side, at distance $5 + 1 = 6$. Dividing by a number with a known modulus scales distances from $0$ by a known factor, which is often the first step: if $|w| = 1$ and $|z| = 10$, then $\tfrac wz$ lies on the circle of radius $\tfrac1{10}$.

Use these tools whenever a problem mentions $i$, a conjugate or a modulus: split into real and imaginary parts when the numbers are small and the equation is polynomial, and work with moduli and conjugates when the condition is about size or realness. The next lesson writes complex numbers by size and angle, which turns multiplication into rotation.`,
      related: [
        { card: "conjugate-root-theorems", note: String.raw`non-real roots of a real polynomial come in conjugate pairs.` },
        { card: "abs-triangle-inequality", note: String.raw`$|z + w| \le |z| + |w|$, the bound on a sum of complex numbers (A5.4).` },
        { card: "cycle-hunting", note: String.raw`the period $4$ of the powers of $i$ is a cycle like those of last digits (N3.2).` }
      ],
      exercises: [
        { q: String.raw`Write $\tfrac{2 + 3i}{1 - i}$ as $a + bi$ and find $a + b$.`, answer: "2",
          solution: String.raw`Multiply the top and bottom by $1 + i$: $\tfrac{(2 + 3i)(1 + i)}{(1 - i)(1 + i)} = \tfrac{2 + 2i + 3i + 3i^2}{2} = \tfrac{-1 + 5i}{2}$. So $a = -\tfrac12$, $b = \tfrac52$ and $a + b = 2$.` },
        { q: String.raw`How many complex numbers $z$ satisfy $z^2 = \bar z$?`, answer: "4",
          solution: String.raw`Taking moduli, $|z|^2 = |z|$, so $|z| = 0$ or $|z| = 1$. The first gives $z = 0$. If $|z| = 1$, then $\bar z = \tfrac1z$ and the equation becomes $z^3 = 1$, with three solutions $1$ and $\tfrac{-1 \pm i\sqrt3}{2}$, all of modulus $1$. In all there are $4$.` },
        { q: String.raw`The complex number $z$ satisfies $|z| = 1$. Find the largest value of $|z - (3 + 4i)|$.`, answer: "6",
          solution: String.raw`$z$ lies on the unit circle and $3 + 4i$ is at distance $5$ from its center. The farthest point of the circle is on the line through $0$ and $3 + 4i$, on the opposite side, at distance $5 + 1 = 6$, namely $z = -\tfrac35 - \tfrac45 i$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 3",
        "2009 AMC 12A, Problem 15",
        "2004 AMC 12B, Problem 16",
        "2023 AMC 12B, Problem 12",
        "2009 AIME I, Problem 2",
        "2007 AIME I, Problem 3",
        "1985 AIME, Problem 3",
        "2018 AIME II, Problem 5",
        "2014 AIME I, Problem 7"
      ]
    },
    "A6.2": {
      prereq: ["complex-basics"],
      cards: ["eulers-formula", "polar-form", "de-moivre"],
      body: String.raw`Writing a complex number by its size and its direction turns the hardest-looking operations into easy ones. Raising $1 + i$ to the tenth power, finding the third vertex of an equilateral triangle from the other two, following a point that is rotated and scaled at every step, or deciding when $z^5$ is real: in rectangular form each is a long expansion, and in polar form each is a line. The price is converting between the two forms, which needs the angles of the special right triangles.

[[polar-form|Polar form]] writes $z = r(\cos\theta + i\sin\theta)$, where $r = |z|$ and $\theta$ is the argument, the angle from the positive real axis. [[eulers-formula|Euler's formula]] $e^{i\theta} = \cos\theta + i\sin\theta$ shortens this to $z = re^{i\theta}$, and the laws of exponents then say what multiplication does: $re^{i\alpha} \cdot se^{i\beta} = rse^{i(\alpha + \beta)}$. Multiplying by $w$ scales by $|w|$ and rotates by the argument of $w$. Multiplying by $i = e^{i\pi/2}$ turns a point $90^\circ$ counterclockwise about $0$, and to rotate about another center $c$ you subtract $c$, rotate, and add it back: turning $3 + i$ by $90^\circ$ about $1$ gives $1 + i(2 + i) = 2i$. Two segments $z_1 \to z_2$ and $z_3 \to z_4$ are perpendicular exactly when the quotient $\tfrac{z_4 - z_3}{z_2 - z_1}$ is purely imaginary, and the vertices $0$, $z$, $w$ form an equilateral triangle exactly when $w = ze^{\pm i\pi/3}$.

[[de-moivre|De Moivre's theorem]] is the power case: $(re^{i\theta})^n = r^ne^{in\theta}$, or $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. So $(1 + i)^{10} = (\sqrt2 e^{i\pi/4})^{10} = 32e^{i \cdot 5\pi/2} = 32i$. A power is real exactly when $n\theta$ is a multiple of $\pi$, which turns a question about $z^n$ into a congruence on angles, often solved in degrees modulo $360$. The theorem runs backward too. The solutions of $z^n = w$ all have modulus $\sqrt[n]{|w|}$ and arguments $\tfrac{\arg w + 360^\circ k}{n}$, so they are evenly spaced around a circle. Expanding $(\cos\theta + i\sin\theta)^n$ with the binomial theorem and matching real and imaginary parts gives the formulas for $\cos n\theta$ and $\sin n\theta$ in terms of $\cos\theta$ and $\sin\theta$.

A sequence defined by $z_{k+1} = wz_k$ moves around a spiral: each step scales by $|w|$ and turns by $\arg w$, so $z_n = w^{n-1}z_1$ is found by De Moivre in one step. If $w = \sqrt3 + i = 2e^{i\pi/6}$, twelve steps turn the point all the way around and scale it by $2^{12}$. When the steps themselves are added, as in a walk where each leg is turned and shrunk from the one before, the position is a geometric series, summed with the usual formula.

Switch to polar form whenever a problem multiplies, divides or raises complex numbers to powers, or describes rotations, equilateral triangles or regular polygons; stay in rectangular form for sums. The next lesson studies the solutions of $z^n = 1$, the most useful special case.`,
      related: [
        { card: "rotation-90", note: String.raw`turning a point $90^\circ$ about another point, the coordinate version of multiplying by $i$.` },
        { card: "special-trig-values", note: String.raw`the angles whose cosines and sines are exact, needed to convert to and from polar form.` },
        { card: "binomial-theorem", note: String.raw`expanding $(\cos\theta + i\sin\theta)^n$ to get multiple-angle formulas.` },
        { card: "geometric-series", note: String.raw`summing a walk whose legs are turned and scaled by the same factor.` }
      ],
      exercises: [
        { q: String.raw`Find the imaginary part of $(1 + i)^{10}$.`, answer: "32",
          solution: String.raw`$1 + i = \sqrt2 e^{i\pi/4}$, so by De Moivre $(1 + i)^{10} = (\sqrt2)^{10}e^{i \cdot 10\pi/4} = 32e^{i \cdot 5\pi/2} = 32e^{i\pi/2} = 32i$. The imaginary part is $32$.` },
        { q: String.raw`The point $(3, 1)$ is rotated $90^\circ$ counterclockwise about $(1, 0)$ to the point $(a, b)$. Find $a + b$.`, answer: "2",
          solution: String.raw`As complex numbers, subtract the center, multiply by $i$, and add the center back: $1 + i\big((3 + i) - 1\big) = 1 + i(2 + i) = 1 + 2i - 1 = 2i$. So $(a, b) = (0, 2)$ and $a + b = 2$.` },
        { q: String.raw`Two vertices of an equilateral triangle are $0$ and $4 + 2i$. Find the product of the real parts of the two possible third vertices.`, answer: "1",
          solution: String.raw`The third vertex is $4 + 2i$ turned by $\pm 60^\circ$ about $0$: $(4 + 2i)\left(\tfrac12 \pm \tfrac{\sqrt3}{2}i\right) = (2 \mp \sqrt3) + (1 \pm 2\sqrt3)i$. The real parts are $2 - \sqrt3$ and $2 + \sqrt3$, with product $4 - 3 = 1$.` }
      ],
      problems: [
        "2021 Spring AMC 12A, Problem 13",
        "2024 AMC 12B, Problem 12",
        "2019 AMC 12B, Problem 17",
        "2008 AMC 12A, Problem 25",
        "2000 AIME II, Problem 9",
        "2005 AIME II, Problem 9",
        "2012 AIME II, Problem 6",
        "2019 AIME I, Problem 12"
      ]
    },
    "A6.3": {
      prereq: ["de-moivre", "geometric-series"],
      cards: ["roots-of-unity", "roots-of-unity-filter", "trig-series-complex"],
      body: String.raw`The solutions of $z^n = 1$ are the vertices of a regular polygon on the unit circle, and they carry more structure than any other set of complex numbers: their powers cycle, their sum is zero, and their sum against a polynomial picks out every $n$th coefficient. Problems built on them include simplifying $\omega^{2021} + \omega^{2022}$ for a cube root of unity, counting the $z$ with $z^{24} = 1$ for which $z^6$ is real, counting subsets whose sum is divisible by $3$, and adding $\cos\tfrac{\pi}{7} + \cos\tfrac{3\pi}{7} + \cos\tfrac{5\pi}{7}$.

The [[roots-of-unity|$n$th roots of unity]] are $\omega^k = e^{2\pi ik/n}$ for $k = 0, 1, \ldots, n - 1$, where $\omega = e^{2\pi i/n}$. They are the roots of $z^n - 1$, so their sum is $0$ and their product is $(-1)^{n+1}$, and the ones other than $1$ are the roots of $1 + z + \cdots + z^{n-1}$. Powers of a root of unity repeat with period $n$, so exponents are read modulo $n$. The cube roots are the most used: with $\omega = \tfrac{-1 + i\sqrt3}{2}$, $\omega^3 = 1$ and $1 + \omega + \omega^2 = 0$, so $1 + \omega = -\omega^2$, and expressions like $(1 + \omega)^6 = \omega^{12} = 1$ collapse. A factor like $z^2 + z + 1$ or $z^4 + z^3 + z^2 + z + 1$ in a problem should be recognized as $\tfrac{z^3 - 1}{z - 1}$ or $\tfrac{z^5 - 1}{z - 1}$: its roots are roots of unity, and multiplying by $z - 1$ is often the first step. A root of unity $\omega^k$ is primitive, meaning its powers give all $n$ roots, exactly when $\gcd(k, n) = 1$.

The sum of the $k$th powers of all the $n$th roots of unity is $n$ when $n$ divides $k$ and $0$ otherwise, since otherwise it is a geometric series summing to $\tfrac{1 - \omega^{kn}}{1 - \omega^k} = 0$. That fact is the [[roots-of-unity-filter|roots of unity filter]]: for a polynomial $f(x) = \sum a_kx^k$, the average $\tfrac1n\left(f(1) + f(\omega) + \cdots + f(\omega^{n-1})\right)$ is the sum of the coefficients $a_k$ with $k$ divisible by $n$. With $n = 2$ it is the familiar $\tfrac{f(1) + f(-1)}{2}$. With $n = 3$ and $f(x) = (1 + x)^9$, the sum $\binom90 + \binom93 + \binom96 + \binom99$ is $\tfrac13\left(2^9 + (1 + \omega)^9 + (1 + \omega^2)^9\right) = \tfrac13(512 - 1 - 1) = 170$. Counting problems become filter problems once the count is written as a coefficient of a generating function, such as $\prod(1 + x^k)$ for subsets.

A trigonometric sum is the real or imaginary part of a sum of powers of $e^{i\theta}$, and [[trig-series-complex|summing it with complex numbers]] turns it into a geometric series. For $\cos\tfrac\pi7 + \cos\tfrac{3\pi}7 + \cos\tfrac{5\pi}7$, the sum of $z + z^3 + z^5$ with $z = e^{i\pi/7}$ is $\tfrac{z(1 - z^6)}{1 - z^2}$, and since $z^7 = -1$ its real part works out to $\tfrac12$. A quicker route uses symmetry: the seven numbers $e^{i(2k+1)\pi/7}$ are the roots of $z^7 = -1$ and add to $0$, and their real parts are these three cosines twice plus $\cos\pi = -1$, so twice the sum is $1$. The same idea evaluates sums of $\sin k\theta$ or $k\cos k\theta$ by differentiating a geometric series.

Recognize roots of unity whenever exponents can be reduced modulo $n$, a polynomial is a factor of $z^n - 1$, a count asks about residues of a sum, or a trigonometric sum runs over evenly spaced angles. The last lesson of the chapter uses them with the factored form of polynomials.`,
      related: [
        { card: "cyclotomic-polynomials", note: String.raw`the factors of $z^n - 1$ whose roots are exactly the primitive roots of unity.` },
        { card: "generating-function-method", note: String.raw`writing a count as a coefficient, so the filter can extract it.` },
        { card: "binomial-row-sums", note: String.raw`the $n = 2$ filter: even and odd binomial coefficients each add to $2^{n-1}$.` },
        { card: "conjugate-both-sides", note: String.raw`on the unit circle $\bar z = \tfrac1z$, the step behind many root-of-unity conditions (A6.1).` }
      ],
      exercises: [
        { q: String.raw`Let $\omega = \tfrac{-1 + i\sqrt3}{2}$. Find $(1 + \omega)^6$.`, answer: "1",
          solution: String.raw`$\omega$ is a cube root of unity, so $1 + \omega + \omega^2 = 0$ and $1 + \omega = -\omega^2$. Then $(1 + \omega)^6 = \omega^{12} = (\omega^3)^4 = 1$.` },
        { q: String.raw`Find $\binom90 + \binom93 + \binom96 + \binom99$.`, answer: "170",
          solution: String.raw`By the roots of unity filter with $f(x) = (1 + x)^9$ and $\omega$ a primitive cube root of unity, the sum is $\tfrac13\left(f(1) + f(\omega) + f(\omega^2)\right)$. Now $1 + \omega = -\omega^2$, so $f(\omega) = -\omega^{18} = -1$, and likewise $f(\omega^2) = (-\omega)^9 = -1$. The sum is $\tfrac13(512 - 2) = 170$; directly, $1 + 84 + 84 + 1 = 170$.` },
        { q: String.raw`Find $\cos\tfrac{\pi}{7} + \cos\tfrac{3\pi}{7} + \cos\tfrac{5\pi}{7}$.`, answer: "1/2",
          solution: String.raw`The seven numbers $e^{i(2k+1)\pi/7}$, $k = 0, \ldots, 6$, are the roots of $z^7 = -1$, so they add to $0$. Their real parts are $\cos\tfrac\pi7$, $\cos\tfrac{3\pi}7$, $\cos\tfrac{5\pi}7$, $\cos\pi = -1$, and then the first three again, since $\cos\tfrac{9\pi}{7} = \cos\tfrac{5\pi}{7}$ and so on. So twice the sum minus $1$ is $0$, and the sum is $\tfrac12$.` }
      ],
      problems: [
        "2022 AMC 12B, Problem 11",
        "2017 AMC 12A, Problem 17",
        "2021 Spring AMC 12B, Problem 20",
        "2023 AMC 10B, Problem 21",
        "1984 AIME, Problem 8",
        "2018 AIME I, Problem 6",
        "2011 AIME II, Problem 8",
        "2019 AIME II, Problem 8",
        "2018 AIME I, Problem 12",
        "2013 AIME I, Problem 14"
      ]
    },
    "A6.4": {
      prereq: ["roots-of-unity", "vietas-general"],
      cards: ["fundamental-theorem-algebra", "roots-unity-distance-product"],
      body: String.raw`Over the complex numbers every polynomial factors completely, and that one fact settles questions that look hard over the reals: how many roots a product of polynomials can have, what $\prod (2 - \omega^k)$ is over the seventh roots of unity, the product of the distances from one vertex of a regular polygon to all the others, or which polynomials satisfy a functional equation. Each turns on writing a polynomial as a product of linear factors and then evaluating that product at a well-chosen point.

The [[fundamental-theorem-algebra|fundamental theorem of algebra]] says that a polynomial of degree $n$ with complex coefficients has exactly $n$ complex roots counted with multiplicity, so $P(z) = a(z - r_1)(z - r_2)\cdots(z - r_n)$. This is what makes Vieta's formulas complete, and it gives two quick consequences. A polynomial of degree $n$ that vanishes at more than $n$ points is the zero polynomial, so two polynomials of degree at most $n$ that agree at $n + 1$ points are equal. And a product of factors over the roots can be computed by evaluating: $\prod_k (c - r_k) = \tfrac{P(c)}{a}$. For $z^4 + 4 = 0$ the four roots are $\pm 1 \pm i$, and over the reals the polynomial factors as $(z^2 + 2z + 2)(z^2 - 2z + 2)$, each quadratic carrying one conjugate pair. A product such as $\prod_k (r_k^2 + 4)$ over the roots of $P$ factors as $\prod (r_k - 2i)\prod(r_k + 2i)$, which is $P(2i)P(-2i)$ up to sign and the leading coefficient.

Applied to $z^n - 1 = \prod_{k=0}^{n-1}(z - \omega^k)$, evaluation gives the [[roots-unity-distance-product|distance products over roots of unity]]. Dividing by $z - 1$ leaves $1 + z + \cdots + z^{n-1} = \prod_{k=1}^{n-1}(z - \omega^k)$, and setting $z = 1$ shows $\prod_{k=1}^{n-1}|1 - \omega^k| = n$: the product of the distances from one vertex of a regular $n$-gon inscribed in the unit circle to the other vertices is $n$. For a regular $12$-gon the product of the eleven distances is $12$. Setting $z = c$ instead gives $\prod_{k=1}^{n-1}(c - \omega^k) = \tfrac{c^n - 1}{c - 1}$, so over the seventh roots of unity $\prod_{k=1}^{6}(2 - \omega^k) = \tfrac{2^7 - 1}{1} = 127$. Since $|1 - e^{i\theta}| = 2\sin\tfrac\theta2$, the same identity gives $\prod_{k=1}^{n-1}\sin\tfrac{k\pi}{n} = \tfrac{n}{2^{n-1}}$, the classic sine product. A product whose factors are quadratic in $\omega^k$ is first factored into two linear products, each of which is a value of $z^n - 1$.

The theorem also controls functional equations for polynomials. If $P(x)P(2x^2) = P(2x^3 + x)$ and $r$ is a root, then $2r^3 + r$ is a root too; if the roots are finitely many, this map must send the root set to itself, which forces strong conditions on where the roots can lie.

Use the factored form whenever a problem asks for a product, or a sum of logarithms, over the roots of a polynomial or over the vertices of a regular polygon: write it as the polynomial evaluated at a point. The chapter review mixes all four lessons; the next chapter turns to trigonometry, where these identities reappear.`,
      related: [
        { card: "vietas-general", note: String.raw`the coefficients of the factored form, read as sums and products of the roots (B2.2).` },
        { card: "chord-length", note: String.raw`$|1 - e^{i\theta}| = 2\sin\tfrac\theta2$, turning distances into sines.` },
        { card: "evenly-spaced-angle-products", note: String.raw`products of sines and cosines at evenly spaced angles, from the same factorization (A9.4).` },
        { card: "comparing-coefficients", note: String.raw`the other way to use the factored form: expand and match (A2.6).` }
      ],
      exercises: [
        { q: String.raw`Find the product of the roots of $z^4 + 4 = 0$ that have positive real part.`, answer: "2",
          solution: String.raw`$z^4 = -4 = 4e^{i\pi}$, so the roots have modulus $\sqrt2$ and arguments $45^\circ$, $135^\circ$, $225^\circ$, $315^\circ$: they are $\pm1 \pm i$. The two with positive real part are $1 + i$ and $1 - i$, with product $2$.` },
        { q: String.raw`A regular $12$-gon is inscribed in a circle of radius $1$. Find the product of the distances from one vertex to the other eleven.`, answer: "12",
          solution: String.raw`Put the vertices at the twelfth roots of unity and the chosen vertex at $1$. Then $\tfrac{z^{12} - 1}{z - 1} = 1 + z + \cdots + z^{11} = \prod_{k=1}^{11}(z - \omega^k)$, and at $z = 1$ the product of distances $\prod |1 - \omega^k|$ is $12$.` },
        { q: String.raw`Let $\omega = e^{2\pi i/7}$. Find $\prod_{k=1}^{6}(2 - \omega^k)$.`, answer: "127",
          solution: String.raw`$\prod_{k=1}^{6}(z - \omega^k) = 1 + z + \cdots + z^6 = \tfrac{z^7 - 1}{z - 1}$. At $z = 2$ this is $\tfrac{128 - 1}{1} = 127$.` }
      ],
      problems: [
        "2021 Fall AMC 12B, Problem 14",
        "2024 AMC 12A, Problem 15",
        "2013 AMC 12B, Problem 25",
        "2023 AIME II, Problem 8",
        "2009 AIME II, Problem 13",
        "2015 AIME I, Problem 13",
        "2024 AIME II, Problem 13",
        "2007 AIME II, Problem 14"
      ]
    }
  },
  review: [
    "2002 AMC 12A, Problem 24",
    "2020 AMC 12B, Problem 23",
    "2017 AMC 12A, Problem 25",
    "2022 AIME I, Problem 4",
    "2012 AIME I, Problem 6",
    "1996 AIME, Problem 11",
    "2017 AIME II, Problem 12",
    "1994 AIME, Problem 13",
    "1997 AIME, Problem 14",
    "2001 AIME II, Problem 14"
  ]
};
