// Learn, AMC Algebra, chapter L8: complex numbers (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L8"] = {
  lessons: {
    "L8.1": {
      prereq: ["rationalizing"],
      cards: ["complex-basics", "conjugate-both-sides", "complex-modulus-argument"],
      body: String.raw`Complex numbers appear on almost every AMC 12. The first skills are arithmetic: dividing by a complex number, using the conjugate, and reading conditions on the modulus.

A [[complex-basics|complex number]] is $z = a + bi$ with $i^2 = -1$; its conjugate is $\bar z = a - bi$, and its modulus $|z| = \sqrt{a^2 + b^2}$ is its distance from $0$. Since $z\bar z = |z|^2$ is real, division multiplies by the conjugate: $\tfrac{3 + 4i}{1 + 2i} = \tfrac{(3 + 4i)(1 - 2i)}{5} = \tfrac{11 - 2i}{5}$, with real part $\tfrac{11}{5}$. Moduli multiply, so $|(1 + i)^6| = (\sqrt2)^6 = 8$. Powers of $i$ repeat with period $4$.

[[conjugate-both-sides|Conjugating both sides]] of an equation gives a second equation for free. A number is real exactly when $z = \bar z$, and on the unit circle $\bar z = \tfrac1z$, which turns conditions about $|z| = 1$ into polynomial equations.

A [[complex-modulus-argument|known modulus or argument]] is a locus: $|z - c| = r$ is a circle, $|z - a| = |z - b|$ a perpendicular bisector, and a fixed argument a ray. Extreme values of $|z - w|$ then become distance problems.

Divide with conjugates, conjugate whole equations, and read moduli as distances. The next lesson uses polar form.`,
      related: [
        { card: "conjugate-root-theorems", note: String.raw`non-real roots of real polynomials come in conjugate pairs (L5.2).` },
        { card: "abs-triangle-inequality", note: String.raw`$|z + w| \le |z| + |w|$ (L2.5).` },
        { card: "circle-equation", note: String.raw`circles as sets of complex numbers (S2.2).` }
      ],
      exercises: [
        { q: String.raw`Find the real part of $\tfrac{3 + 4i}{1 + 2i}$.`, answer: "11/5",
          solution: String.raw`$\tfrac{(3 + 4i)(1 - 2i)}{1 + 4} = \tfrac{3 - 6i + 4i + 8}{5} = \tfrac{11 - 2i}{5}$, with real part $\tfrac{11}{5}$.` },
        { q: String.raw`Find $|(1 + i)^6|$.`, answer: "8",
          solution: String.raw`$|1 + i| = \sqrt2$ and moduli multiply, so $(\sqrt2)^6 = 8$.` }
      ],
      problems: [
        "2025 AMC 12B, Problem 3",
        "2023 AMC 12A, Problem 16",
        "2021 Spring AMC 12B, Problem 18",
        "2020 AMC 12A, Problem 22",
        "2020 AMC 12B, Problem 23",
        "2009 AIME I, Problem 2",
        "2019 AIME II, Problem 8"
      ]
    },
    "L8.2": {
      prereq: ["complex-basics", "angle-addition"],
      cards: ["eulers-formula", "polar-form", "de-moivre"],
      body: String.raw`Writing a complex number by its size and angle turns multiplication into rotation and powers into repeated rotation. This is the main reason complex numbers appear in AMC 12 geometry and algebra.

[[polar-form|Polar form]] writes $z = r(\cos\theta + i\sin\theta)$, and [[eulers-formula|Euler's formula]] shortens it to $re^{i\theta}$. Multiplying multiplies moduli and adds angles, so multiplication by $i$ is a quarter turn and multiplication by $e^{i\theta}$ is a rotation by $\theta$. Points of a regular polygon, equilateral triangles and rotations about a point are all short formulas in this language.

[[de-moivre|De Moivre's theorem]] gives powers: $(re^{i\theta})^n = r^ne^{in\theta}$. Since $1 + i\sqrt3 = 2e^{i\pi/3}$, $(1 + i\sqrt3)^6 = 64e^{2\pi i} = 64$. A power is real when the angle times $n$ is a multiple of $\pi$, which turns questions about $z^n$ into congruences on angles. Expanding $(\cos\theta + i\sin\theta)^n$ by the binomial theorem gives multiple-angle formulas.

Convert to polar form for products, powers and rotations, and back for sums. The next lesson treats roots of unity.`,
      related: [
        { card: "rotation-90", note: String.raw`rotations in coordinates (S2.3).` },
        { card: "binomial-theorem", note: String.raw`expanding $(\cos\theta + i\sin\theta)^n$ (R1.4).` },
        { card: "geometric-series", note: String.raw`sums of repeated rotations (L3.2).` }
      ],
      exercises: [
        { q: String.raw`Find $(1 + i\sqrt3)^6$.`, answer: "64",
          solution: String.raw`$1 + i\sqrt3 = 2e^{i\pi/3}$, so the sixth power is $64e^{2\pi i} = 64$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 12",
        "2021 Spring AMC 12A, Problem 13",
        "2021 Fall AMC 12B, Problem 21",
        "2024 AMC 12A, Problem 23",
        "2002 AMC 12A, Problem 24",
        "2008 AMC 12A, Problem 25",
        "2022 AIME I, Problem 4",
        "2005 AIME II, Problem 9"
      ]
    },
    "L8.3": {
      prereq: ["de-moivre", "vietas-general"],
      cards: ["roots-of-unity", "fundamental-theorem-algebra"],
      body: String.raw`The solutions of $z^n = 1$ sit at the vertices of a regular polygon on the unit circle, and they turn up in polynomial factorizations, sums of powers and counting. Together with the fundamental theorem of algebra, they complete the AMC 12's complex numbers.

The [[roots-of-unity|$n$th roots of unity]] are $e^{2\pi ik/n}$ for $k = 0, \ldots, n - 1$; they add to $0$, and those other than $1$ are the roots of $1 + z + \cdots + z^{n-1}$. Their powers repeat with period $n$: if $\omega^3 = 1$ and $\omega \ne 1$, then $1 + \omega + \omega^2 = 0$. Among the twelfth roots of unity, $z^4$ is a cube root of unity, and it is real only when $z^4 = 1$, which happens for $4$ of them.

The [[fundamental-theorem-algebra|fundamental theorem of algebra]] says a polynomial of degree $n$ has exactly $n$ complex roots with multiplicity, so it factors completely and Vieta's formulas describe all roots: the product of the roots of $z^5 - 3z + 2$ is $-2$. Products over roots of unity are values of $z^n - 1$, so $\prod_{k=1}^{n-1}(1 - \omega^k) = n$.

Recognize factors of $z^n - 1$, reduce exponents modulo $n$, and use the complete factorization. This completes the AMC Algebra book.`,
      related: [
        { card: "products-over-roots", note: String.raw`products over roots as values of the polynomial (L5.1).` },
        { card: "roots-of-unity-filter", note: String.raw`extracting every $n$th coefficient (A6.4).` },
        { card: "cycle-hunting", note: String.raw`periods of powers (M2.2).` }
      ],
      exercises: [
        { q: String.raw`For how many of the $12$ complex numbers with $z^{12} = 1$ is $z^4$ real?`, answer: "4",
          solution: String.raw`$z^4$ is a cube root of unity, real only when it equals $1$. The solutions of $z^4 = 1$ are $\pm1$, $\pm i$, all twelfth roots of unity: $4$.` },
        { q: String.raw`Find the product of the complex roots of $z^5 - 3z + 2$.`, answer: "-2",
          solution: String.raw`For a monic polynomial of degree $5$ the product of the roots is $(-1)^5$ times the constant term: $-2$.` }
      ],
      problems: [
        "2022 AMC 12B, Problem 11",
        "2023 AMC 12A, Problem 14",
        "2020 AMC 12A, Problem 15",
        "2020 AMC 12B, Problem 17",
        "2019 AMC 12A, Problem 21",
        "2011 AMC 12B, Problem 24",
        "2023 AIME II, Problem 8"
      ]
    }
  }
};
