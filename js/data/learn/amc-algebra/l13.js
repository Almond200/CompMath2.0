// Learn, AMC Algebra, chapter L13: complex numbers (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L13"] = {
  lessons: {
    "L13.1": {
      prereq: ["quadratic-formula"],
      cards: [],
      body: String.raw`The equation $x^2+1=0$ has no real solution because a real square cannot be negative. Complex numbers extend the real numbers by introducing $i$ with $i^2=-1$. Every complex number has a unique form $a+bi$, where $a,b$ are real. The imaginary part is the real coefficient $b$.

Addition and multiplication use the distributive law together with $i^2=-1$. For example, $(2+i)(3-i)=6-2i+3i-i^2=7+i$. The powers $1,i,-1,-i$ repeat every four steps, since $i^4=1$, so a large integer exponent can be reduced modulo four.

The pair $(a,b)$ locates $a+bi$ in a plane with horizontal real axis and vertical imaginary axis. Its modulus is its distance from zero, $\sqrt{a^2+b^2}$. Thus $3+4i$ has modulus five. Conjugation sends $a+bi$ to $a-bi$, reflecting its point across the real axis. Multiplying a number by its conjugate gives the real quantity $a^2+b^2$, which will make division possible.

A nonzero point can also be specified by its distance and direction. The trigonometric coordinates from the preceding chapter give $z=r(\cos\theta+i\sin\theta)$. In this form multiplication combines lengths and angles, so powers and roots acquire a direct geometric interpretation.

The chapter develops arithmetic and distance first, then polar multiplication and powers. It ends with roots of unity and their use in polynomial equations and coefficient sums. These two representations of a complex number supply different information: coordinates are convenient for addition and conjugation, while length and angle are convenient for multiplication.`,
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
      body: String.raw`Write a complex number as $z=a+bi$, with real $a,b$. Equality of two complex numbers means equality of their real parts and of their imaginary parts. Thus a complex equation can encode two real equations, and its real and imaginary parts should be compared separately.

The basic [[complex-basics|arithmetic rules]] follow by distributing products and replacing $i^2$ by $-1$. In particular,

$$(a+bi)(c+di)=(ac-bd)+(ad+bc)i.$$

The conjugate $\bar z=a-bi$ satisfies $z\bar z=a^2+b^2$. For $z\ne0$ this is positive, so $1/z=\bar z/|z|^2$. Dividing by a complex number therefore amounts to multiplying numerator and denominator by its conjugate. For example,

$$\frac{1+2i}{1-i}=\frac{(1+2i)(1+i)}{2}=\frac{-1+3i}{2}.$$

The real part is $-1/2$, and the imaginary part is $3/2$. The denominator check is essential: zero has no reciprocal.

Conjugation preserves sums and products. This follows directly from the coordinate formulas; changing the sign of every imaginary coordinate gives $\overline{z+w}=\bar z+\bar w$ and $\overline{zw}=\bar z\bar w$. Consequently [[conjugate-both-sides|taking conjugates of an equation]] supplies another valid relation.

For $z+2\bar z=3-i$, conjugation gives $\bar z+2z=3+i$. Twice the second equation minus the first yields $3z=3+3i$, hence $z=1+i$. Alternatively, substituting $z=a+bi$ into the original equation gives $3a-bi=3-i$, so $a=b=1$. Both routes use the same pair of real constraints, and substituting $1+i$ checks the result.

The [[complex-modulus-argument|modulus]] $|z|=\sqrt{a^2+b^2}$ measures distance from the origin. Since $|zw|^2=zw\,\overline{zw}=(z\bar z)(w\bar w)$, nonnegative square roots give $|zw|=|z||w|$. Also, $|z-w|$ is the distance between the two corresponding points, so an equation $|z-w|=R$ describes a circle centered at $w$ when $R\gt0$.

The conditions $|z|=5$ and $z+\bar z=6$ illustrate how algebra locates points. The second condition is $2a=6$, so $a=3$. The first is $a^2+b^2=25$, giving $b=\pm4$ and $z=3\pm4i$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 365" role="img" aria-labelledby="l132-locus-title l132-locus-desc" style="width:100%;max-width:520px;height:auto"><title id="l132-locus-title">A modulus and a real-part condition locate two complex numbers</title><desc id="l132-locus-desc">The circle of radius five centered at zero meets the vertical line with real part three at three plus four i and three minus four i. The radius to the upper intersection has length five.</desc><g fill="none" stroke="currentColor"><circle cx="230" cy="180" r="130" opacity="0.6"/><path d="M75 180H400M230 35V330" opacity="0.4"/><path d="M308 45V318" stroke-width="2"/><path d="M230 180L308 76" stroke-width="1.5"/></g><g fill="currentColor"><circle cx="308" cy="76" r="4"/><circle cx="308" cy="284" r="4"/><g font-size="16"><text x="250" y="23" text-anchor="middle">|z| = 5 and Re(z) = 3</text><text x="322" y="68">3 + 4i</text><text x="322" y="306">3 − 4i</text><text x="259" y="120">5</text><text x="419" y="186">Re</text><text x="211" y="35">Im</text><text x="214" y="203">0</text><text x="308" y="203" text-anchor="middle">3</text><text x="360" y="203" text-anchor="middle">5</text><text x="214" y="55">5</text></g></g></svg>

The vertical line in the diagram records the real-part condition, and its two intersections with the circle account for the two signs. For a nonzero complex number, an argument is a directed angle from the positive real axis to its point. Arguments differ by integer multiples of $2\pi$; zero has no direction and hence no argument. Determining the quadrant is part of specifying an argument, even when a tangent ratio is known.`,
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
      body: String.raw`For a nonzero complex number $z=a+bi$, let $r=|z|\gt0$ and choose an argument $\theta$. The unit-circle coordinates give $a=r\cos\theta$ and $b=r\sin\theta$, so

$$z=r(\cos\theta+i\sin\theta).$$

This is [[polar-form|polar form]]. Adding $2\pi$ to the angle changes neither coordinate, so the representation permits all arguments differing by full turns. For example, $-1+i$ has argument $3\pi/4$; the value $\arctan(-1)=-\pi/4$ would point into the wrong quadrant.

Multiply two unit-modulus factors and collect parts. The real part is $\cos\alpha\cos\beta-\sin\alpha\sin\beta$, and the imaginary part is $\sin\alpha\cos\beta+\cos\alpha\sin\beta$. The addition formulas identify these as $\cos(\alpha+\beta)$ and $\sin(\alpha+\beta)$. Therefore multiplication multiplies the moduli and adds the arguments.

[[eulers-formula|Euler's formula]] writes $\cos\theta+i\sin\theta=e^{i\theta}$ for angles in radians, giving the compact notation $z=re^{i\theta}$. The multiplication rule just proved becomes $re^{i\alpha}\,se^{i\beta}=rs\,e^{i(\alpha+\beta)}$. Multiplication by a unit-modulus number rotates about zero; a positive modulus also scales every distance from zero by that modulus.

Take $z=1+i$ and $w=\sqrt3+i$. Their moduli are $\sqrt2$ and $2$, and arguments are $\pi/4$ and $\pi/6$. Thus $wz$ has modulus $2\sqrt2$ and argument $5\pi/12$. Expansion gives $(\sqrt3-1)+(\sqrt3+1)i$, consistent with a first-quadrant point at $75^\circ$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 340" role="img" aria-labelledby="l133-rotation-title l133-rotation-desc" style="width:100%;max-width:520px;height:auto"><title id="l133-rotation-title">Multiplication doubles a length and adds thirty degrees</title><desc id="l133-rotation-desc">The point z equals one plus i. Multiplication by square root of three plus i first scales its length by two to the point two z, then rotates thirty degrees counterclockwise to the point square root of three minus one plus i times square root of three plus one.</desc><g fill="none" stroke="currentColor"><path d="M65 265H380M160 300V40" opacity="0.45"/><path d="M160 265L290 135" stroke-dasharray="5 4" opacity="0.55"/><path d="M160 265L225 200M160 265L207.583 87.417" stroke-width="2"/><path d="M290 135A183.848 183.848 0 0 0 207.583 87.417" stroke-width="1.5"/></g><g fill="currentColor"><circle cx="225" cy="200" r="4"/><circle cx="290" cy="135" r="4"/><circle cx="207.583" cy="87.417" r="4"/><g font-size="16"><text x="250" y="24" text-anchor="middle">Multiply by √3 + i: double length, add 30°</text><text x="242" y="211">z = 1 + i</text><text x="301" y="142">2z</text><text x="215" y="74">wz</text><text x="276" y="101">30°</text><text x="399" y="271">Re</text><text x="143" y="36">Im</text><text x="143" y="286">0</text><text x="250" y="324" text-anchor="middle">|wz| = 2√2; arg(wz) = 75°</text></g></g></svg>

The diagram separates multiplication by $w$ into doubling the length and rotating through $30^\circ$. This interpretation applies to every input point using the same multiplier.

Repeated multiplication proves [[de-moivre|De Moivre's theorem]] for positive integer powers: $(re^{i\theta})^n=r^ne^{in\theta}$. For nonzero $z$, reciprocals give the negative integer cases, and the zeroth power is one. For example, $1+i=\sqrt2e^{i\pi/4}$ gives $(1+i)^{10}=32e^{i5\pi/2}=32i$. Likewise $(\sqrt3+i)^6=64e^{i\pi}=-64$.

De Moivre also reconnects algebra to the trigonometric identities. The real part of $(\cos\theta+i\sin\theta)^3$ is $\cos^3\theta-3\cos\theta\sin^2\theta$. Replacing $\sin^2\theta$ by $1-\cos^2\theta$ gives $\cos3\theta=4\cos^3\theta-3\cos\theta$.

When solving a power equation, all possible arguments must be retained before division by the exponent. If $z^n=Re^{i\phi}$ with $R\gt0$ and positive integer $n$, then $|z|=R^{1/n}$ and $n\arg z=\phi+2k\pi$. The distinct roots are therefore $R^{1/n}e^{i(\phi+2k\pi)/n}$ for $k=0,\ldots,n-1$. A single choice of $\phi/n$ would find only one of them.`,
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
      body: String.raw`Let $n$ be a positive integer. Solving $z^n=1$ first gives $|z|=1$, then requires $n\arg z$ to be an integer multiple of $2\pi$. The distinct solutions are

$$1,\omega,\omega^2,\ldots,\omega^{n-1},\qquad \omega=e^{2\pi i/n}.$$

These are [[roots-of-unity|the $n$th roots of unity]]. The angle between consecutive points is $2\pi/n$. For $n\ge3$ they form a regular polygon on the unit circle; for $n=2$ they are the two opposite points $1,-1$. Powers repeat after $n$ steps, and this chosen $\omega$ has no smaller positive period.

Because the roots are those of $z^n-1$, Vieta gives their product as $(-1)^{n+1}$. For $n\ge2$, their sum is zero, since the coefficient of $z^{n-1}$ is zero. The case $n=1$ has the single root one and sum one. The zero sum for larger $n$ also follows from the rotational symmetry of the equally spaced points.

More generally, for $z^n=c$ with $c\ne0$, the roots have radius $|c|^{1/n}$ and arguments separated by $2\pi/n$, with their initial direction determined by the argument of $c$. If $c=0$, the only root is zero, with multiplicity $n$; there is no circle of distinct roots.

For $z^6=64$, the radius is two and the angles are multiples of $\pi/3$. Adjacent roots are distance two apart, so the six triangles from the center are equilateral with area $\sqrt3$ each. The hexagon's area is $6\sqrt3$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 345" role="img" aria-labelledby="l134-hexagon-title l134-hexagon-desc" style="width:100%;max-width:520px;height:auto"><title id="l134-hexagon-title">The sixth roots of sixty-four form a hexagon of radius two</title><desc id="l134-hexagon-desc">Six points at sixty-degree intervals have radius two. Joining them to the center divides the regular hexagon into six equilateral triangles of side two, each with area square root of three.</desc><polygon points="360.000,174.000 305.000,78.737 195.000,78.737 140.000,174.000 195.000,269.263 305.000,269.263" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="2"/><g fill="none" stroke="currentColor" opacity="0.4"><path d="M100 174H400M250 40V310"/><path d="M250 174L360.000 174.000"/><path d="M250 174L305.000 78.737"/><path d="M250 174L195.000 78.737"/><path d="M250 174L140.000 174.000"/><path d="M250 174L195.000 269.263"/><path d="M250 174L305.000 269.263"/></g><g fill="currentColor"><circle cx="360.000" cy="174.000" r="4"/><circle cx="305.000" cy="78.737" r="4"/><circle cx="195.000" cy="78.737" r="4"/><circle cx="140.000" cy="174.000" r="4"/><circle cx="195.000" cy="269.263" r="4"/><circle cx="305.000" cy="269.263" r="4"/><g font-size="16"><text x="250" y="23" text-anchor="middle">z⁶ = 64: six roots of modulus 2</text><text x="381" y="180">2</text><text x="326" y="73">1 + i√3</text><text x="353" y="120">2</text><text x="200" y="222">2</text><text x="236" y="195">0</text><text x="418" y="180">Re</text><text x="233" y="39">Im</text><text x="250" y="330" text-anchor="middle">6 triangles × √3 = 6√3</text></g></g></svg>

The six radii in the diagram exhibit these triangles. Moduli determine their lengths, while the angular spacing determines their shapes.

The [[fundamental-theorem-algebra|fundamental theorem of algebra]] extends the existence of complex roots to every nonconstant polynomial with complex coefficients. A degree-$n$ polynomial has exactly $n$ roots counted with multiplicity and factors into its leading coefficient times the corresponding linear factors. This does not guarantee $n$ distinct roots: $(z-1)^n$ has only one distinct root.

For example, $z^2+4=(z-2i)(z+2i)$. The quartic $z^4+4$ has the four roots $1+i,1-i,-1+i,-1-i$. Grouping conjugate linear factors gives the real factorization $(z^2-2z+2)(z^2+2z+2)$. Over the complex numbers it splits further into four linear factors.

The angular spacing of roots also gives a coefficient-selection identity. For the chosen $\omega=e^{2\pi i/n}$,

$$\sum_{j=0}^{n-1}\omega^{jk}=
\begin{cases}
n,&n\mid k,\\
0,&n\nmid k.
\end{cases}$$

If $n\mid k$, every term is one. Otherwise the ratio $\omega^k$ differs from one, and the finite geometric sum is $((\omega^k)^n-1)/(\omega^k-1)=0$. The exact order of $\omega$ matters here.

For a polynomial $F(x)=\sum_k a_kx^k$, averaging $F(1),F(\omega),\ldots,F(\omega^{n-1})$ applies this identity to each coefficient. Terms whose index is divisible by $n$ survive, and all other terms cancel. This is [[roots-of-unity-filter|the roots-of-unity filter]].

With $n=3$ and $F(x)=(1+x)^6$, the surviving coefficients are $\binom60+\binom63+\binom66$. Since $1+\omega=-\omega^2$ and $1+\omega^2=-\omega$, their sixth powers both equal one. The average is $(64+1+1)/3=22$, agreeing with $1+20+1$.`,
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
      prereq: ["complex-basics", "conjugate-both-sides", "complex-modulus-argument", "eulers-formula", "polar-form", "de-moivre", "roots-of-unity", "fundamental-theorem-algebra", "roots-of-unity-filter"],
      cards: [],
      body: String.raw`[[complex-basics|Complex arithmetic]] extends distributive algebra using $i^2=-1$. Comparing real and imaginary parts turns a complex equality into two real constraints. Conjugation changes the sign of the imaginary coordinate and makes $z\bar z=|z|^2$ real; for a nonzero denominator, this supplies the reciprocal used in division. [[conjugate-both-sides|Conjugating an equation]] preserves its sum and product relationships.

[[complex-modulus-argument|A modulus]] measures distance, while an argument specifies direction modulo full turns for a nonzero point. [[polar-form|Polar form]] uses those quantities, and Euler's exponential notation takes its angles in radians. Multiplication scales lengths and adds angles. [[de-moivre|Integer powers]] repeat this operation; solving a power equation requires all possible full turns before dividing the angle.

[[roots-of-unity|Roots of unity]] are equally spaced on the unit circle. Their sum is zero for $n\ge2$, and their product follows from Vieta. Equations $z^n=c$ give a scaled, rotated set when $c\ne0$; at $c=0$, there is one root of multiplicity $n$.

[[fundamental-theorem-algebra|A degree-$n$ polynomial]] splits into $n$ complex linear factors with repeated roots counted according to multiplicity. Finally, [[roots-of-unity-filter|averaging over all $n$th roots of unity]] uses a finite geometric sum to select polynomial coefficients at indices divisible by $n$.`,
      strategies: [
        String.raw`For an equation in $z$ and $\bar z$, write $z = a + bi$ and compare real and imaginary parts.`,
        String.raw`To divide, multiply the top and bottom by the conjugate of the bottom.`,
        String.raw`Read $|z - w|$ as a distance and $|z| = r$ as a circle.`,
        String.raw`For a power of a complex number, convert to polar form.`,
        String.raw`Take the modulus of both sides of an equation to find $|z|$ first.`,
        String.raw`For $z^n=c$ with $c\ne0$, locate all equally spaced arguments on the circle of radius $|c|^{1/n}$; handle $c=0$ separately.`,
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
