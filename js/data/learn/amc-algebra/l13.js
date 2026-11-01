// Learn, AMC Algebra, chapter L13: complex numbers (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L13"] = {
  lessons: {
    "L13.1": {
      prereq: ["quadratic-formula"],
      cards: [],
      body: String.raw`This chapter introduces complex numbers, which extend the real numbers by a number $i$ with $i^2 = -1$. Its tools are complex arithmetic with the conjugate and the modulus, the polar form with De Moivre's theorem, and the roots of unity.

A complex number is $a + bi$ with real $a$ and $b$, its real and imaginary parts. It is added and multiplied like a polynomial in $i$, replacing $i^2$ by $-1$: $(2 + i)(3 - i) = 6 + i + 1 = 7 + i$. The powers of $i$ cycle with period $4$, $i, -1, -i, 1$, so $i^{2026} = i^2 = -1$.

Each complex number is a point $(a, b)$ of the plane. Its distance from $0$ is the modulus $|a + bi| = \sqrt{a^2 + b^2}$, so $|3 + 4i| = 5$, and its angle from the positive real axis is its argument. In this polar form, multiplying multiplies the moduli and adds the arguments, which makes powers easy.

The solutions of $z^n = 1$, the $n$th roots of unity, are the vertices of a regular $n$-gon on the unit circle, and every polynomial of degree $n$ has exactly $n$ complex roots. These facts solve problems about polygons, about sums of binomial coefficients, and about polynomials.

The lessons take these ideas in turn: complex arithmetic and the modulus (L13.2), polar form and De Moivre (L13.3), and roots of unity (L13.4). The Summary (L13.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Find $i^{2026}$.`, answer: "-1",
          solution: String.raw`The powers of $i$ repeat every $4$, and $2026 = 4 \cdot 506 + 2$, so $i^{2026} = i^2 = -1$.` },
        { q: String.raw`Find the real part of $(2 + i)(3 - i)$.`, answer: "7",
          solution: String.raw`$(2 + i)(3 - i) = 6 - 2i + 3i - i^2 = 7 + i$. The real part is $7$.` },
        { q: String.raw`Find $|3 + 4i|$.`, answer: "5",
          solution: String.raw`The modulus is the distance from $0$ to $(3, 4)$: $\sqrt{9 + 16} = 5$.` }
      ],
      problems: [
        "2009 AMC 12A, Problem 15",
        "2004 AMC 12B, Problem 16",
        "2017 AMC 12A, Problem 17"
      ]
    },
    "L13.2": {
      prereq: ["quadratic-formula", "linear-elimination"],
      cards: ["complex-basics", "conjugate-both-sides", "complex-modulus-argument"],
      body: String.raw`Complex numbers appear in AMC problems as numbers to compute with and as points to locate. What is the real part of $\tfrac{1 + 2i}{1 - i}$? Which $z$ satisfies $z + 2\bar z = 3 - i$? Where are the numbers with $|z| = 5$ and real part $3$? The rules are those of algebra, plus the conjugate and the modulus.

[[complex-basics|Complex arithmetic]]: add and multiply $a + bi$ as polynomials in $i$ with $i^2 = -1$. Two complex numbers are equal exactly when their real parts are equal and their imaginary parts are equal, which turns one complex equation into two real ones. The conjugate of $z = a + bi$ is $\bar z = a - bi$, and $z\bar z = a^2 + b^2$ is real, so division is done by multiplying the top and bottom by the conjugate of the bottom: $\tfrac{1 + 2i}{1 - i} = \tfrac{(1 + 2i)(1 + i)}{2} = \tfrac{-1 + 3i}{2}$, with real part $-\tfrac12$.

[[conjugate-both-sides|Taking conjugates]] gives a second equation from one. For $z + 2\bar z = 3 - i$, write $z = a + bi$: the left side is $3a - bi$, so $a = 1$ and $b = 1$, and $|z| = \sqrt2$. Equivalently, the conjugate equation $\bar z + 2z = 3 + i$ and the original form a linear system in $z$ and $\bar z$. Conjugation respects sums and products, $\overline{zw} = \bar z\bar w$.

[[complex-modulus-argument|The modulus and the argument]] are the length and the angle of the point $z$. The modulus is multiplicative, $|zw| = |z||w|$, and $|z|^2 = z\bar z$. The set $|z| = 5$ is a circle of radius $5$, and $|z - w|$ is the distance between the points $z$ and $w$; with $|z| = 5$ and $z + \bar z = 6$, the real part is $3$ and the imaginary part is $\pm 4$.

Write $z = a + bi$ and compare parts, divide by multiplying by the conjugate, and read $|z - w|$ as a distance. The next lesson uses the polar form.`,
      related: [
        { card: "conjugate-root-theorems", note: String.raw`non-real roots of real polynomials come in conjugate pairs (L10.3).` },
        { card: "distance-midpoint", note: String.raw`$|z - w|$ is the distance between two points of the plane.` }
      ],
      exercises: [
        { q: String.raw`Find the real part of $\dfrac{1 + 2i}{1 - i}$.`, answer: "-1/2",
          solution: String.raw`Multiply the top and bottom by $1 + i$: $\tfrac{(1 + 2i)(1 + i)}{2} = \tfrac{1 + 3i - 2}{2} = \tfrac{-1 + 3i}{2}$. The real part is $-\tfrac12$.` },
        { q: String.raw`A complex number $z$ satisfies $z + 2\bar z = 3 - i$. Find $|z|^2$.`, answer: "2",
          solution: String.raw`With $z = a + bi$: $(a + bi) + 2(a - bi) = 3a - bi = 3 - i$, so $a = 1$, $b = 1$, and $|z|^2 = 2$.` },
        { q: String.raw`A complex number has $|z| = 5$ and $z + \bar z = 6$. Find the absolute value of its imaginary part.`, answer: "4",
          solution: String.raw`$z + \bar z = 2\operatorname{Re} z = 6$, so the real part is $3$, and $3^2 + b^2 = 25$ gives $|b| = 4$.` }
      ],
      problems: [
        "2008 AMC 12B, Problem 19",
        "2010 AMC 12B, Problem 15",
        "2025 AMC 12A, Problem 9",
        "2023 AMC 12A, Problem 16",
        "2009 AMC 12B, Problem 23"
      ]
    },
    "L13.3": {
      prereq: ["complex-basics", "special-trig-values"],
      cards: ["eulers-formula", "polar-form", "de-moivre"],
      body: String.raw`Computing $(1 + i)^{10}$ or $(\sqrt3 + i)^6$ by expanding is long, but in polar form it is one line. Polar form also turns questions about equilateral triangles, rotations and spirals of points into questions about angles.

[[polar-form|The polar form]] writes $z = r(\cos\theta + i\sin\theta)$, where $r = |z|$ and $\theta$ is the argument. [[eulers-formula|Euler's formula]] $e^{i\theta} = \cos\theta + i\sin\theta$ shortens this to $z = re^{i\theta}$. Multiplying two numbers multiplies their moduli and adds their arguments, since $e^{i\alpha}e^{i\beta} = e^{i(\alpha + \beta)}$: so $|(1 + i)(\sqrt3 + i)| = \sqrt2 \cdot 2 = 2\sqrt2$, with argument $45^\circ + 30^\circ = 75^\circ$. Multiplying by $e^{i\theta}$ rotates a point about $0$ by $\theta$.

[[de-moivre|De Moivre's theorem]] follows: $\left(re^{i\theta}\right)^n = r^ne^{in\theta}$. So $(1 + i)^{10} = \left(\sqrt2e^{i\pi/4}\right)^{10} = 32e^{i5\pi/2} = 32i$, and $(\sqrt3 + i)^6 = \left(2e^{i\pi/6}\right)^6 = 64e^{i\pi} = -64$. Expanding $(\cos\theta + i\sin\theta)^n$ with the binomial theorem and comparing parts gives the multiple angle formulas, such as $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$.

Convert to polar form before raising to a power, read products as rotations and scalings, and take moduli of both sides of an equation to fix the size of $z$. The next lesson studies the roots of unity.`,
      related: [
        { card: "rotation-90", note: String.raw`multiplying by $i$ rotates by $90^\circ$.` },
        { card: "triple-angle", note: String.raw`the multiple angle formulas, which De Moivre explains (L12.2).` }
      ],
      exercises: [
        { q: String.raw`Find the imaginary part of $(1 + i)^{10}$.`, answer: "32",
          solution: String.raw`$1 + i = \sqrt2e^{i\pi/4}$, so $(1 + i)^{10} = 32e^{i5\pi/2} = 32i$. The imaginary part is $32$.` },
        { q: String.raw`Find $(\sqrt3 + i)^6$.`, answer: "-64",
          solution: String.raw`$\sqrt3 + i = 2e^{i\pi/6}$, so its sixth power is $64e^{i\pi} = -64$.` },
        { q: String.raw`Find $|(1 + i)(\sqrt3 + i)|$.`, answer: "2sqrt(2)",
          solution: String.raw`Moduli multiply: $|1 + i| = \sqrt2$ and $|\sqrt3 + i| = 2$, so the product has modulus $2\sqrt2$.` }
      ],
      problems: [
        "2021 Spring AMC 12A, Problem 13",
        "2002 AMC 12A, Problem 24",
        "2024 AMC 12B, Problem 12",
        "2019 AMC 12B, Problem 17",
        "2005 AMC 12B, Problem 22"
      ]
    },
    "L13.4": {
      prereq: ["de-moivre", "vietas-general"],
      cards: ["roots-of-unity", "fundamental-theorem-algebra", "roots-of-unity-filter"],
      body: String.raw`The solutions of $z^n = 1$, or of $z^n = c$, are evenly spaced around a circle, and that picture answers many problems: the area of the polygon formed by the solutions of $z^6 = 64$, the number of solutions in a quadrant, sums such as $\binom60 + \binom63 + \binom66$, and the factorization of polynomials.

[[roots-of-unity|The $n$th roots of unity]] are $e^{2\pi ik/n}$ for $k = 0, 1, \ldots, n - 1$, the vertices of a regular $n$-gon inscribed in the unit circle with one vertex at $1$. They are the roots of $z^n - 1$, so by Vieta they add to $0$ (for $n \ge 2$) and multiply to $(-1)^{n+1}$; for $n = 5$ the product is $1$. The solutions of $z^n = c$ are a regular $n$-gon of radius $|c|^{1/n}$: those of $z^6 = 64$ form a regular hexagon of side $2$, with area $6\sqrt3$. Powers of a root of unity cycle, so exponents are reduced modulo $n$.

[[fundamental-theorem-algebra|The fundamental theorem of algebra]] says every polynomial of degree $n$ has exactly $n$ complex roots, counted with multiplicity, so it factors completely into linear factors over the complex numbers. Factoring $z^4 + 4$ or $z^2 + 4$ over the complex numbers, as $(z + 2i)(z - 2i)$, then grouping conjugate factors, factors real expressions.

[[roots-of-unity-filter|The roots of unity filter]] picks out every $n$th coefficient. With $\omega = e^{2\pi i/3}$, the sum $1 + \omega^k + \omega^{2k}$ is $3$ when $3 \mid k$ and $0$ otherwise, so averaging $(1 + x)^6$ over $x = 1, \omega, \omega^2$ gives $\binom60 + \binom63 + \binom66 = \tfrac{64 + (1 + \omega)^6 + (1 + \omega^2)^6}{3} = \tfrac{64 + 1 + 1}{3} = 22$.

Draw the roots as a regular polygon, use Vieta on $z^n - 1$, and average over roots of unity to filter coefficients. The Summary (L13.5) collects the chapter's strategies.`,
      related: [
        { card: "binomial-theorem", note: String.raw`the coefficients the filter sums.` },
        { card: "regular-polygon-area", note: String.raw`the area of the polygon formed by the roots.` }
      ],
      exercises: [
        { q: String.raw`Find the product of the five solutions of $z^5 = 1$.`, answer: "1",
          solution: String.raw`They are the roots of $z^5 - 1$, whose roots multiply to $(-1)^5 \cdot \tfrac{-1}{1} = 1$ by Vieta. (Their arguments add to $0 + 72^\circ + \cdots + 288^\circ = 720^\circ$.)` },
        { q: String.raw`Find the area of the polygon whose vertices are the solutions of $z^6 = 64$.`, answer: "6sqrt(3)",
          solution: String.raw`The solutions have modulus $2$ and are $60^\circ$ apart, a regular hexagon of side $2$ made of six equilateral triangles of area $\sqrt3$. The area is $6\sqrt3$.` },
        { q: String.raw`Find $\binom60 + \binom63 + \binom66$.`, answer: "22",
          solution: String.raw`$1 + 20 + 1 = 22$. By the filter: with $\omega = e^{2\pi i/3}$, $(1 + \omega)^6 = (-\omega^2)^6 = 1$ and likewise $(1 + \omega^2)^6 = 1$, so the sum is $\tfrac{2^6 + 1 + 1}{3} = 22$.` }
      ],
      problems: [
        "2017 AMC 12B, Problem 12",
        "2018 AMC 12B, Problem 16",
        "2020 AMC 12A, Problem 15",
        "2024 AMC 12A, Problem 15",
        "2023 AMC 12A, Problem 14"
      ]
    },
    "L13.5": {
      prereq: ["complex-basics", "conjugate-both-sides", "complex-modulus-argument", "polar-form", "de-moivre", "roots-of-unity", "fundamental-theorem-algebra", "roots-of-unity-filter"],
      cards: [],
      body: String.raw`[[complex-basics|Complex numbers]] are computed with as polynomials in $i$, with $i^2 = -1$; two are equal when their real and imaginary parts are, and division is done with the conjugate. [[conjugate-both-sides|Taking conjugates]] gives a second equation, and [[complex-modulus-argument|the modulus and argument]] are the length and angle of the point.

[[polar-form|In polar form]] products multiply lengths and add angles, so [[de-moivre|De Moivre's theorem]] computes powers, and multiplying by $e^{i\theta}$ is a rotation.

[[roots-of-unity|The roots of unity]] are a regular polygon on the unit circle, adding to $0$; [[fundamental-theorem-algebra|every polynomial]] of degree $n$ has $n$ complex roots, and [[roots-of-unity-filter|the filter]] picks out every $n$th coefficient.`,
      strategies: [
        String.raw`For an equation in $z$ and $\bar z$, write $z = a + bi$ and compare real and imaginary parts.`,
        String.raw`To divide, multiply the top and bottom by the conjugate of the bottom.`,
        String.raw`Read $|z - w|$ as a distance and $|z| = r$ as a circle.`,
        String.raw`For a power of a complex number, convert to polar form.`,
        String.raw`Take the modulus of both sides of an equation to find $|z|$ first.`,
        String.raw`Draw the solutions of $z^n = c$ as a regular polygon.`,
        String.raw`To add every third or fourth coefficient, average the polynomial over the roots of unity.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the real part of $i + i^2 + i^3 + \cdots + i^{2026}$.`, answer: "-1",
        solution: String.raw`Every four consecutive powers add to $0$. Since $2026 = 4 \cdot 506 + 2$, the sum is $i + i^2 = -1 + i$, with real part $-1$.` },
      { q: String.raw`Find $(1 - i)^8$.`, answer: "16",
        solution: String.raw`$(1 - i)^2 = -2i$, so $(1 - i)^8 = (-2i)^4 = 16$.` },
      { q: String.raw`Find $|(3 + 4i)(5 - 12i)|$.`, answer: "65",
        solution: String.raw`Moduli multiply: $5 \cdot 13 = 65$.` },
      { q: String.raw`A complex number $z$ with positive real part satisfies $z^2 = 3 + 4i$. Find the real part of $z$.`, answer: "2",
        solution: String.raw`With $z = a + bi$: $a^2 - b^2 = 3$ and $2ab = 4$. Also $|z|^2 = |z^2| = 5$, so $a^2 + b^2 = 5$, giving $a^2 = 4$. With $a \gt 0$, $a = 2$ (and $z = 2 + i$).` },
      { q: String.raw`How many solutions of $z^4 = -16$ lie in the open first quadrant?`, answer: "1",
        solution: String.raw`The solutions have modulus $2$ and arguments $45^\circ, 135^\circ, 225^\circ, 315^\circ$, one in each quadrant. Only $2e^{i\pi/4} = \sqrt2 + \sqrt2i$ is in the first.` },
      { q: String.raw`Find $\binom80 + \binom84 + \binom88$.`, answer: "72",
        solution: String.raw`$1 + 70 + 1 = 72$. By the filter with the fourth roots of unity: $\tfrac{2^8 + (1 + i)^8 + 0 + (1 - i)^8}{4} = \tfrac{256 + 16 + 16}{4} = 72$.` }
    ],
    problems: [
      "2008 AMC 12A, Problem 23"
    ]
  },
  challenge: {
    problems: [
      "2008 AMC 12A, Problem 25",
      "2023 AMC 12B, Problem 19",
      "2017 AMC 12A, Problem 25",
      "2023 AMC 12A, Problem 25"
    ]
  }
};
