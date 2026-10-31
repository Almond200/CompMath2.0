// Learn, AMC Algebra, chapter L12: trigonometry (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L12"] = {
  lessons: {
    "L12.1": {
      prereq: ["pythagorean-theorem"],
      cards: [],
      body: String.raw`This chapter treats trigonometry as algebra with a few identities. Its tools are the exact values at the standard angles, the addition, double, half and triple angle formulas, the formulas that turn sums of sines and cosines into products and back, the combination of $a\sin x + b\cos x$ into one wave, and the inverse functions.

On the unit circle, the point at angle $\theta$ is $(\cos\theta, \sin\theta)$, so $\sin^2\theta + \cos^2\theta = 1$, and the values at $30^\circ$, $45^\circ$ and $60^\circ$ come from the half-square and half-equilateral triangles: $\sin 30^\circ = \cos 60^\circ = \tfrac12$.

The addition formulas build new values from old ones: $\tan 75^\circ = \tan(45^\circ + 30^\circ) = \tfrac{1 + 1/\sqrt3}{1 - 1/\sqrt3} = 2 + \sqrt3$. Setting both angles equal gives the double angle formulas, such as $\cos 2x = 1 - 2\sin^2 x$, so $\sin x = \tfrac35$ gives $\cos 2x = \tfrac{7}{25}$.

Products of sines and cosines can be written as sums and the reverse, which makes some long products collapse. A sum $a\sin x + b\cos x$ is a single sine wave of amplitude $\sqrt{a^2 + b^2}$, which gives its largest value at once. The inverse functions $\arcsin$, $\arccos$ and $\arctan$ return angles, and sums of them are found with the addition formulas.

The lessons take these ideas in turn: special values and the identities (L12.2), sums, products and telescoping (L12.3), and combining waves and inverse functions (L12.4). The Summary (L12.5) collects the strategies.`,
      exercises: [
        { q: String.raw`Find $\sin 30^\circ + \cos 60^\circ$.`, answer: "1",
          solution: String.raw`Both are $\tfrac12$, from the half of an equilateral triangle, so the sum is $1$.` },
        { q: String.raw`If $\sin x = \tfrac35$, find $\cos 2x$.`, answer: "7/25",
          solution: String.raw`$\cos 2x = 1 - 2\sin^2 x = 1 - \tfrac{18}{25} = \tfrac{7}{25}$.` },
        { q: String.raw`Find $\tan 75^\circ$.`, answer: "2 + sqrt(3)",
          solution: String.raw`$\tan(45^\circ + 30^\circ) = \tfrac{1 + \tfrac{1}{\sqrt3}}{1 - \tfrac{1}{\sqrt3}} = \tfrac{\sqrt3 + 1}{\sqrt3 - 1} = \tfrac{(\sqrt3 + 1)^2}{2} = 2 + \sqrt3$.` }
      ],
      problems: [
        "2024 AMC 12A, Problem 18",
        "2024 AMC 12A, Problem 10",
        "2007 AMC 12A, Problem 17"
      ]
    },
    "L12.2": {
      prereq: ["pythagorean-theorem"],
      cards: ["special-trig-values", "angle-addition", "double-angle", "half-angle", "triple-angle"],
      body: String.raw`Trigonometry problems on the AMC rarely need a calculator: the angles are chosen so that exact values exist, and the identities connect them. What is $\sin 15^\circ$? If $\tan x = 3$, what is $\tan 2x$? If $\cos x = \tfrac13$, what is $\cos 3x$? Each is one identity applied to known values.

[[special-trig-values|The special values]] come from two triangles: the isosceles right triangle gives $\sin 45^\circ = \cos 45^\circ = \tfrac{\sqrt2}{2}$, and half an equilateral triangle gives $\sin 30^\circ = \tfrac12$ and $\sin 60^\circ = \tfrac{\sqrt3}{2}$. Reflections on the unit circle give the values in the other quadrants, with signs from the quadrant.

[[angle-addition|The addition formulas]] are $\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$, $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$ and $\tan(a \pm b) = \tfrac{\tan a \pm \tan b}{1 \mp \tan a\tan b}$. They give $\sin 15^\circ = \sin(45^\circ - 30^\circ) = \tfrac{\sqrt6 - \sqrt2}{4}$, and the tangent formula gives the angle between two lines from their slopes.

Setting $a = b$ gives [[double-angle|the double angle formulas]]: $\sin 2x = 2\sin x\cos x$, $\cos 2x = \cos^2 x - \sin^2 x = 1 - 2\sin^2 x = 2\cos^2 x - 1$, and $\tan 2x = \tfrac{2\tan x}{1 - \tan^2 x}$, so $\tan x = 3$ gives $\tan 2x = -\tfrac34$. Solving the cosine forms for the squares gives [[half-angle|the half angle formulas]], $\sin^2\tfrac x2 = \tfrac{1 - \cos x}{2}$, so $\sin^2 22.5^\circ = \tfrac{2 - \sqrt2}{4}$. [[triple-angle|The triple angle formulas]] $\sin 3x = 3\sin x - 4\sin^3 x$ and $\cos 3x = 4\cos^3 x - 3\cos x$ give $\cos 3x = \tfrac{4}{27} - 1 = -\tfrac{23}{27}$ when $\cos x = \tfrac13$.

Write every angle as a sum, difference, double or half of a standard angle, and choose the form of the identity that uses what is given. The next lesson turns sums into products.`,
      related: [
        { card: "pythagorean-identities", note: String.raw`$\sin^2 x + \cos^2 x = 1$ and its relatives.` },
        { card: "de-moivre", note: String.raw`the multiple angle formulas from powers of complex numbers (L13.3).` }
      ],
      exercises: [
        { q: String.raw`Find the exact value of $\sin 15^\circ$.`, answer: "(sqrt(6) - sqrt(2))/4",
          solution: String.raw`$\sin(45^\circ - 30^\circ) = \tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} - \tfrac{\sqrt2}{2}\cdot\tfrac12 = \tfrac{\sqrt6 - \sqrt2}{4}$.` },
        { q: String.raw`If $\tan x = 3$, find $\tan 2x$.`, answer: "-3/4",
          solution: String.raw`$\tan 2x = \tfrac{2 \cdot 3}{1 - 9} = -\tfrac34$.` },
        { q: String.raw`If $\cos x = \tfrac13$, find $\cos 3x$.`, answer: "-23/27",
          solution: String.raw`$\cos 3x = 4\cos^3 x - 3\cos x = \tfrac{4}{27} - 1 = -\tfrac{23}{27}$.` },
        { q: String.raw`Find $\sin^2 22.5^\circ$.`, answer: "(2 - sqrt(2))/4",
          solution: String.raw`By the half angle formula, $\sin^2 22.5^\circ = \tfrac{1 - \cos 45^\circ}{2} = \tfrac{1 - \sqrt2/2}{2} = \tfrac{2 - \sqrt2}{4}$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 11",
        "2014 AMC 12A, Problem 12",
        "2013 AMC 12B, Problem 20",
        "2004 AMC 12A, Problem 21",
        "2024 AMC 12B, Problem 21"
      ]
    },
    "L12.3": {
      prereq: ["angle-addition", "double-angle"],
      cards: ["product-sum", "trig-telescoping-product"],
      body: String.raw`Products like $\cos 20^\circ\cos 40^\circ\cos 80^\circ$ and sums like $\cos 36^\circ - \cos 72^\circ$ have surprisingly simple values, $\tfrac18$ and $\tfrac12$. They are found by turning products into sums, or sums into products, so that terms cancel.

[[product-sum|The product-to-sum formulas]] come from adding and subtracting the addition formulas: $2\sin a\cos b = \sin(a + b) + \sin(a - b)$, $2\cos a\cos b = \cos(a - b) + \cos(a + b)$ and $2\sin a\sin b = \cos(a - b) - \cos(a + b)$. So $\sin 75^\circ\cos 15^\circ = \tfrac12(\sin 90^\circ + \sin 60^\circ) = \tfrac{2 + \sqrt3}{4}$. Read backward, they are the sum-to-product formulas, such as $\cos A - \cos B = -2\sin\tfrac{A + B}{2}\sin\tfrac{A - B}{2}$, which factor sums and differences.

[[trig-telescoping-product|A product that telescopes]] multiplies by a well-chosen factor so that the double angle formula applies again and again. For $P = \cos 20^\circ\cos 40^\circ\cos 80^\circ$, multiply by $\sin 20^\circ$: $\sin 20^\circ\cos 20^\circ = \tfrac12\sin 40^\circ$, then $\tfrac12\sin 40^\circ\cos 40^\circ = \tfrac14\sin 80^\circ$, then $\tfrac14\sin 80^\circ\cos 80^\circ = \tfrac18\sin 160^\circ = \tfrac18\sin 20^\circ$. So $P\sin 20^\circ = \tfrac18\sin 20^\circ$ and $P = \tfrac18$. Doubling angles collapses the product.

When a product of cosines has angles that double, multiply by the sine of the smallest; when a sum or difference must be simplified, convert it to a product; and in long sums, look for terms that cancel after converting. The next lesson combines waves and studies inverse functions.`,
      related: [
        { card: "telescoping", note: String.raw`the same cancellation in algebraic sums and products (L6.5).` },
        { card: "roots-of-unity", note: String.raw`sums of cosines at evenly spaced angles (L13.4).` }
      ],
      exercises: [
        { q: String.raw`Find $\sin 75^\circ\cos 15^\circ$.`, answer: "(2 + sqrt(3))/4",
          solution: String.raw`$\sin 75^\circ\cos 15^\circ = \tfrac12(\sin 90^\circ + \sin 60^\circ) = \tfrac12\left(1 + \tfrac{\sqrt3}{2}\right) = \tfrac{2 + \sqrt3}{4}$.` },
        { q: String.raw`Find $\cos 20^\circ\cos 40^\circ\cos 80^\circ$.`, answer: "1/8",
          solution: String.raw`Multiply by $\sin 20^\circ$ and apply the double angle formula three times: the product becomes $\tfrac18\sin 160^\circ = \tfrac18\sin 20^\circ$. Dividing by $\sin 20^\circ$ gives $\tfrac18$.` },
        { q: String.raw`Find $\cos 36^\circ - \cos 72^\circ$.`, answer: "1/2",
          solution: String.raw`By sum-to-product, $c = 2\sin 54^\circ\sin 18^\circ = 2\cos 36^\circ\sin 18^\circ$, and multiplying by $\cos 18^\circ$ gives $c\cos 18^\circ = \cos 36^\circ\sin 36^\circ = \tfrac12\sin 72^\circ = \tfrac12\cos 18^\circ$. So $c = \tfrac12$.` }
      ],
      problems: [
        "2006 AMC 12B, Problem 24",
        "2020 AMC 12B, Problem 25"
      ]
    },
    "L12.4": {
      prereq: ["angle-addition", "special-trig-values"],
      cards: ["harmonic-addition", "inverse-trig-identities"],
      body: String.raw`What is the largest value of $5\sin x + 12\cos x$? How many times does a sum of sines change sign? What is $\arctan 2 + \arctan 3$? The first two are about combining sine and cosine into one wave; the third is about inverse functions.

[[harmonic-addition|Combining waves]]: $a\sin x + b\cos x = R\sin(x + \varphi)$, where $R = \sqrt{a^2 + b^2}$ and $\varphi$ is the angle with $\cos\varphi = \tfrac aR$ and $\sin\varphi = \tfrac bR$. This is the addition formula read backward. So $5\sin x + 12\cos x = 13\sin(x + \varphi)$ has largest value $13$ and smallest $-13$, and the equation $5\sin x + 12\cos x = c$ has solutions only for $|c| \le 13$.

[[inverse-trig-identities|The inverse functions]] return angles in fixed ranges: $\arcsin$ and $\arctan$ in $\left[-\tfrac\pi2, \tfrac\pi2\right]$, $\arccos$ in $[0, \pi]$. Two facts are used constantly: $\arcsin x + \arccos x = \tfrac\pi2$, and $\arccos(\cos x) = x$ only for $x$ in $[0, \pi]$. A sum of arctangents is found with the tangent addition formula, then placed in the right range: $\tan(\arctan 2 + \arctan 3) = \tfrac{2 + 3}{1 - 6} = -1$, and since both angles are between $\tfrac\pi4$ and $\tfrac\pi2$, the sum is between $\tfrac\pi2$ and $\pi$, so it is $\tfrac{3\pi}{4}$.

Combine $a\sin x + b\cos x$ into one wave for extremes and solutions, and take the tangent of a sum of arctangents, then fix the quadrant. The Summary (L12.5) collects the chapter's strategies.`,
      related: [
        { card: "cauchy-schwarz", note: String.raw`$(a\sin x + b\cos x)^2 \le (a^2 + b^2)(\sin^2 x + \cos^2 x)$, the same bound (L11.5).` },
        { card: "piecewise-graph-counting", note: String.raw`counting the solutions of trigonometric equations from graphs (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the largest value of $5\sin x + 12\cos x$.`, answer: "13",
          solution: String.raw`$5\sin x + 12\cos x = 13\sin(x + \varphi)$ with $\cos\varphi = \tfrac{5}{13}$, $\sin\varphi = \tfrac{12}{13}$, so the largest value is $13$.` },
        { q: String.raw`Find $\arcsin\tfrac12 + \arccos\tfrac12$.`, answer: "pi/2",
          solution: String.raw`$\arcsin\tfrac12 = \tfrac\pi6$ and $\arccos\tfrac12 = \tfrac\pi3$, which add to $\tfrac\pi2$, as $\arcsin x + \arccos x$ always does.` },
        { q: String.raw`Find $\arctan 2 + \arctan 3$.`, answer: "3pi/4",
          solution: String.raw`The tangent of the sum is $\tfrac{2 + 3}{1 - 2 \cdot 3} = -1$. Each angle is between $\tfrac\pi4$ and $\tfrac\pi2$, so the sum is between $\tfrac\pi2$ and $\pi$, and it is $\tfrac{3\pi}{4}$.` }
      ],
      problems: [
        "2017 AMC 12A, Problem 15",
        "2009 AMC 12B, Problem 24",
        "2024 AMC 12B, Problem 19"
      ]
    },
    "L12.5": {
      prereq: ["special-trig-values", "angle-addition", "double-angle", "half-angle", "triple-angle", "product-sum", "trig-telescoping-product", "harmonic-addition", "inverse-trig-identities"],
      cards: [],
      body: String.raw`[[special-trig-values|The exact values]] at $30^\circ$, $45^\circ$ and $60^\circ$ come from two triangles. [[angle-addition|The addition formulas]] build the others, and give [[double-angle|the double]], [[half-angle|half]] and [[triple-angle|triple angle formulas]].

[[product-sum|The product-to-sum formulas]] turn products into sums and back, and [[trig-telescoping-product|a product of cosines with doubling angles]] collapses after multiplying by the sine of the smallest angle.

[[harmonic-addition|$a\sin x + b\cos x$]] is one wave of amplitude $\sqrt{a^2 + b^2}$, and [[inverse-trig-identities|the inverse functions]] return angles in fixed ranges, with sums of arctangents found from the tangent addition formula.`,
      strategies: [
        String.raw`Write each angle as a sum, difference, double or half of a standard angle.`,
        String.raw`Choose the form of $\cos 2x$ that uses what is given: $1 - 2\sin^2 x$ or $2\cos^2 x - 1$.`,
        String.raw`If $\sin x \pm \cos x$ is given, square it to get $\sin 2x$.`,
        String.raw`For a product of cosines whose angles double, multiply by the sine of the smallest angle.`,
        String.raw`Turn a sum or difference of sines or cosines into a product, or a product into a sum, whichever cancels.`,
        String.raw`For the extremes of $a\sin x + b\cos x$, use the amplitude $\sqrt{a^2 + b^2}$.`,
        String.raw`For a sum of inverse tangents, take its tangent, then fix the quadrant from the sizes of the angles.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find the exact value of $\cos 75^\circ$.`, answer: "(sqrt(6) - sqrt(2))/4",
        solution: String.raw`$\cos(45^\circ + 30^\circ) = \tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} - \tfrac{\sqrt2}{2}\cdot\tfrac12 = \tfrac{\sqrt6 - \sqrt2}{4}$, the same as $\sin 15^\circ$.` },
      { q: String.raw`If $\sin x + \cos x = \tfrac12$, find $\sin x\cos x$.`, answer: "-3/8",
        solution: String.raw`Square: $1 + 2\sin x\cos x = \tfrac14$, so $\sin x\cos x = -\tfrac38$.` },
      { q: String.raw`Find $\sin 10^\circ \sin 30^\circ \sin 50^\circ \sin 70^\circ$.`, answer: "1/16",
        solution: String.raw`Since $\sin\theta = \cos(90^\circ - \theta)$, $\sin 10^\circ\sin 50^\circ\sin 70^\circ = \cos 80^\circ\cos 40^\circ\cos 20^\circ = \tfrac18$, and multiplying by $\sin 30^\circ = \tfrac12$ gives $\tfrac{1}{16}$.` },
      { q: String.raw`Find the smallest value of $\sin x + \sqrt3\cos x$.`, answer: "-2",
        solution: String.raw`$\sin x + \sqrt3\cos x = 2\sin(x + 60^\circ)$, whose smallest value is $-2$.` },
      { q: String.raw`Find $\tan\left(\arctan\tfrac12 + \arctan\tfrac13\right)$.`, answer: "1",
        solution: String.raw`$\tfrac{1/2 + 1/3}{1 - 1/6} = \tfrac{5/6}{5/6} = 1$.` },
      { q: String.raw`If $\cos 2x = \tfrac13$, find $\sin^4 x - \cos^4 x$.`, answer: "-1/3",
        solution: String.raw`Factor: $\sin^4 x - \cos^4 x = (\sin^2 x - \cos^2 x)(\sin^2 x + \cos^2 x) = -\cos 2x = -\tfrac13$.` }
    ],
    problems: []
  },
  challenge: {
    problems: [
      "2025 AMC 12A, Problem 24",
      "2019 AMC 12B, Problem 25"
    ]
  }
};
