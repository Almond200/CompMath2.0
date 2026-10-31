// Learn, AMC 12, chapter W4: trigonometry (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["W4"] = {
  lessons: {
    "W4.1": {
      prereq: ["common-angle-values", "pythagorean-identities"],
      cards: ["special-trig-values", "angle-addition", "double-angle", "half-angle"],
      body: String.raw`Trigonometry on the AMC 12 is mostly identities: the values at special angles and the formulas for sums, doubles and halves. With them, expressions in sines and cosines simplify to numbers.

The [[angle-addition|angle-addition formulas]] $\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$ and $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$, with $\tan(a \pm b) = \tfrac{\tan a \pm \tan b}{1 \mp \tan a\tan b}$, give the [[special-trig-values|special values]] beyond the common angles: $\cos 75^\circ = \tfrac{\sqrt6 - \sqrt2}{4}$ and $\tan 15^\circ = 2 - \sqrt3$. The tangent formula gives the angle between lines from their slopes.

The [[double-angle|double-angle formulas]] $\sin 2a = 2\sin a\cos a$ and $\cos 2a = \cos^2 a - \sin^2 a = 1 - 2\sin^2 a$ are the most used: $\sin 15^\circ\cos 15^\circ = \tfrac12\sin 30^\circ = \tfrac14$, and if $\tan\theta = \tfrac34$ (acute), $\sin 2\theta = 2 \cdot \tfrac35 \cdot \tfrac45 = \tfrac{24}{25}$. The [[half-angle|half-angle formulas]] $\cos^2\tfrac a2 = \tfrac{1 + \cos a}{2}$ and $\sin^2\tfrac a2 = \tfrac{1 - \cos a}{2}$ lower powers.

Rewrite in sines and cosines, use addition and double angles, and lower powers with half angles. The next lesson combines and solves.`,
      related: [
        { card: "eulers-formula", note: String.raw`the addition formulas from multiplying $e^{ia}e^{ib}$ (W5.2).` },
        { card: "angle-between-lines", note: String.raw`the tangent formula applied to slopes (T9.2).` },
        { card: "law-of-cosines", note: String.raw`trigonometry in triangles (T8.6).` }
      ],
      exercises: [
        { q: String.raw`Find $\sin 15^\circ\cos 15^\circ$.`, answer: "1/4",
          solution: String.raw`$\sin 15^\circ\cos 15^\circ = \tfrac12\sin 30^\circ = \tfrac14$.` },
        { q: String.raw`If $\theta$ is acute and $\tan\theta = \tfrac34$, find $\sin 2\theta$.`, answer: "24/25",
          solution: String.raw`$\sin\theta = \tfrac35$ and $\cos\theta = \tfrac45$, so $\sin 2\theta = 2 \cdot \tfrac35 \cdot \tfrac45 = \tfrac{24}{25}$.` }
      ],
      problems: [
        "2025 AMC 10A, Problem 15",
        "2023 AMC 12A, Problem 11",
        "2022 AMC 12B, Problem 14",
        "2024 AMC 12A, Problem 18",
        "2024 AMC 12B, Problem 21",
        "2004 AMC 12B, Problem 24",
        "1986 AIME, Problem 3",
        "1990 AIME, Problem 12"
      ]
    },
    "W4.2": {
      prereq: ["angle-addition"],
      cards: ["harmonic-addition", "inverse-trig-identities"],
      body: String.raw`Two more trigonometric tools answer common AMC 12 questions: combining $a\sin x + b\cos x$ into a single wave, and working with inverse functions and their ranges.

[[harmonic-addition|Harmonic addition]] writes $a\sin x + b\cos x = R\sin(x + \varphi)$ with $R = \sqrt{a^2 + b^2}$. So $5\sin x + 12\cos x$ ranges from $-13$ to $13$, and its largest value is $13$. Equations $a\sin x + b\cos x = c$ have solutions only when $|c| \le R$, and the number of solutions on an interval follows from the single wave.

The [[inverse-trig-identities|inverse trigonometric functions]] return angles in fixed ranges: $\arcsin$ and $\arctan$ in $\left[-\tfrac\pi2, \tfrac\pi2\right]$, $\arccos$ in $[0, \pi]$. Sums of arctangents combine through the tangent addition formula: $\arctan\tfrac12 + \arctan\tfrac13$ has tangent $\tfrac{1/2 + 1/3}{1 - 1/6} = 1$, so it is $\tfrac\pi4$. Expressions like $\arcsin(\sin x)$ equal $x$ only when $x$ is in the range; otherwise reduce first.

Combine linear combinations into one wave, and keep inverse functions within their ranges. The last lesson of the chapter treats products and powers.`,
      related: [
        { card: "cauchy-schwarz", note: String.raw`the same bound $\sqrt{a^2 + b^2}$ (W3.3).` },
        { card: "reduction-identities", note: String.raw`moving angles into the principal range (T8.6).` },
        { card: "arctan-telescoping", note: String.raw`sums of many arctangents (A7.4).` }
      ],
      exercises: [
        { q: String.raw`Find the largest value of $5\sin x + 12\cos x$.`, answer: "13",
          solution: String.raw`$5\sin x + 12\cos x = 13\sin(x + \varphi)$ with $R = \sqrt{25 + 144} = 13$, so the largest value is $13$.` },
        { q: String.raw`Find $\arctan\tfrac12 + \arctan\tfrac13$.`, answer: "pi/4",
          solution: String.raw`The tangent of the sum is $\tfrac{1/2 + 1/3}{1 - 1/6} = 1$, and both angles are between $0$ and $\tfrac\pi4$, so the sum is $\tfrac\pi4$.` }
      ],
      problems: [
        "2017 AMC 12A, Problem 15",
        "2024 AMC 12B, Problem 19",
        "2009 AMC 12B, Problem 24",
        "2019 AMC 12B, Problem 25",
        "2024 AIME I, Problem 7",
        "2013 AIME I, Problem 8"
      ]
    },
    "W4.3": {
      prereq: ["double-angle"],
      cards: ["trig-telescoping-product", "even-power-sin-cos-sums"],
      body: String.raw`Products of cosines at doubling angles and high powers of sine and cosine look hopeless but collapse with the double-angle formula.

A [[trig-telescoping-product|telescoping cosine product]] multiplies by a sine and doubles repeatedly: $\sin 20^\circ\cos 20^\circ\cos 40^\circ\cos 80^\circ = \tfrac18\sin 160^\circ = \tfrac18\sin 20^\circ$, so $\cos 20^\circ\cos 40^\circ\cos 80^\circ = \tfrac18$. In general $\cos x\cos 2x\cdots\cos 2^{n-1}x = \tfrac{\sin 2^nx}{2^n\sin x}$.

[[even-power-sin-cos-sums|High even powers]] reduce through $\sin^2 + \cos^2 = 1$: $\sin^4\theta + \cos^4\theta = 1 - 2\sin^2\theta\cos^2\theta = 1 - \tfrac12\sin^2 2\theta$, and $\sin^6\theta + \cos^6\theta = 1 - \tfrac34\sin^2 2\theta$. If $\sin 2\theta = \tfrac12$, then $\sin^4\theta + \cos^4\theta = \tfrac78$.

Double to absorb cosines, and square the Pythagorean identity to lower powers. The next chapter treats complex numbers.`,
      related: [
        { card: "evenly-spaced-angle-products", note: String.raw`products of sines at evenly spaced angles (A9.4).` },
        { card: "square-of-sum", note: String.raw`squaring $\sin^2 + \cos^2 = 1$ (T1.1).` },
        { card: "telescoping", note: String.raw`the same collapse for sums (T3.4).` }
      ],
      exercises: [
        { q: String.raw`Find $\cos 20^\circ\cos 40^\circ\cos 80^\circ$.`, answer: "1/8",
          solution: String.raw`Multiply by $\sin 20^\circ$ and double three times: $\tfrac18\sin 160^\circ = \tfrac18\sin 20^\circ$. Dividing by $\sin 20^\circ$ gives $\tfrac18$.` },
        { q: String.raw`If $\sin 2\theta = \tfrac12$, find $\sin^4\theta + \cos^4\theta$.`, answer: "7/8",
          solution: String.raw`$\sin^4\theta + \cos^4\theta = 1 - \tfrac12\sin^2 2\theta = 1 - \tfrac18 = \tfrac78$.` }
      ],
      problems: []
    }
  }
};
