// Learn, AMC Algebra, chapter L12: trigonometry (CONVENTIONS §14). Part: Advanced topics.
// Unit-circle definitions, angle identities and applications.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L12"] = {
  lessons: {
    "L12.1": {
      prereq: ["pythagorean-theorem", "similar-figures-ratios"],
      cards: [],
      body: String.raw`Start with an acute angle $\theta$ in a right triangle. Its sine is the opposite leg divided by the hypotenuse, and its cosine is the adjacent leg divided by the hypotenuse. The tangent is the opposite leg divided by the adjacent one. These ratios depend only on the angle because any two right triangles with that angle are similar. For instance, if the adjacent leg is twelve and the hypotenuse is thirteen, the opposite leg is five by the Pythagorean theorem. Hence $\sin\theta=5/13$, $\cos\theta=12/13$ and $\tan\theta=5/12$.

The unit circle, the circle of radius one centered at the origin, extends the same definitions to all real angles. Measure $\theta$ from the positive $x$-axis, counterclockwise for a positive angle and clockwise for a negative angle. The point reached has coordinates $(\cos\theta,\sin\theta)$. In the first quadrant these are the adjacent and opposite legs of a right triangle with hypotenuse one. Outside it, they are signed coordinates. Tangent is the ratio $\sin\theta/\cos\theta$ whenever the horizontal coordinate is nonzero.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" role="img" aria-labelledby="l122-circle-title l122-circle-desc" style="width:100%;max-width:520px;height:auto"><title id="l122-circle-title">Signed coordinates on the unit circle</title><desc id="l122-circle-desc">A point P in the first quadrant has coordinates cosine theta and sine theta. Its horizontal projection and vertical segment form a right triangle with the unit radius. The circle also extends into the other three quadrants.</desc><g fill="none" stroke="currentColor"><circle cx="190" cy="170" r="105" opacity="0.55"/><path d="M65 170H325M190 35V300" opacity="0.5"/><path d="M190 170L274 107" stroke-width="2"/><path d="M274 107V170" stroke-dasharray="5 4" stroke-width="1.5"/><path d="M218 170A28 28 0 0 0 212.4 153.2"/><path d="M264 170V160H274"/></g><g fill="currentColor"><circle cx="274" cy="107" r="4"/><g font-size="16"><text x="250" y="23" text-anchor="middle">A point on the unit circle</text><text x="295" y="92">P = (cos θ, sin θ)</text><text x="300" y="142">sin θ</text><text x="232" y="197" text-anchor="middle">cos θ</text><text x="232" y="157">θ</text><text x="214" y="126">1</text><text x="342" y="176">x</text><text x="177" y="36">y</text><text x="177" y="193">0</text><text x="295" y="193" text-anchor="middle">1</text><text x="85" y="193" text-anchor="middle">−1</text><text x="174" y="70">1</text></g></g></svg>

The radius and the two coordinate segments in the diagram form a right triangle, giving $\cos^2\theta+\sin^2\theta=1$. An isosceles right triangle with sides $1,1,\sqrt2$ gives $\sin45^\circ=\cos45^\circ=\sqrt2/2$. Bisecting an equilateral triangle of side $2$ gives legs $1,\sqrt3$ and hypotenuse $2$, hence $\sin30^\circ=1/2$ and $\cos30^\circ=\sqrt3/2$. Interchanging the legs gives the values at $60^\circ$. A reference angle is the acute angle a ray makes with the horizontal axis when it is off the axes. The absolute values of its sine and cosine are those from the reference triangle. The quadrant determines the signs. For example, $210^\circ$ has reference angle $30^\circ$ and lies below the horizontal axis, so its sine is $-1/2$.

A radian measures arc length in units of the radius. On the unit circle a full turn traverses circumference $2\pi$, giving $360^\circ=2\pi$ radians and $30^\circ=\pi/6$. The point repeats after each full turn. The next lesson (L12.2) uses these circle symmetries and rotations to derive identities that work for every angle in their domain.`,
      exercises: [
        { q: String.raw`Find $\sin 30^\circ + \cos 60^\circ$.`, answer: "1",
          solution: String.raw`Both are $\tfrac12$, from the half of an equilateral triangle, so the sum is $1$.` },
        { q: String.raw`A right triangle has hypotenuse $13$ and the leg adjacent to $\theta$ has length $12$. Find $\tan\theta$.`, answer: "5/12",
          solution: String.raw`The opposite leg is $\sqrt{13^2-12^2}=5$. The tangent is the opposite leg divided by the adjacent one, giving $5/12$.` },
        { q: String.raw`Find $\sin(7\pi/6)$.`, answer: "-1/2",
          solution: String.raw`The ray at $7\pi/6=\pi+\pi/6$ has reference angle $\pi/6$ and lies in the third quadrant. Its vertical coordinate is negative, so the sine is $-1/2$.` }
      ]
    },
    "L12.2": {
      prereq: ["pythagorean-theorem", "pythagorean-identities", "reduction-identities"],
      cards: ["special-trig-values", "angle-addition"],
      body: String.raw`A trigonometric identity is an equality that holds for every angle for which both expressions are defined. The unit circle gives [[pythagorean-identities|the Pythagorean identity]] $\sin^2 x+\cos^2 x=1$. Dividing by $\cos^2 x$ gives $1+\tan^2 x=1/\cos^2 x$ when $\cos x\ne0$. For example, if $x$ is in the second quadrant and $\cos x=-3/5$, then $\sin x=4/5$ and $\tan x=-4/3$. The sign comes from the quadrant before the division.

Reflections give [[reduction-identities|angle reduction identities]]. Reflecting across the horizontal axis sends $x$ to $-x$, so cosine stays the same and sine changes sign. Reflection across the vertical axis sends $x$ to $\pi-x$, keeping sine and negating cosine. Reflection across the line $y=x$ sends $x$ to $\pi/2-x$, swapping the two coordinates. These symmetries extend [[special-trig-values|the exact special-angle values]] to other quadrants, for example $\cos(5\pi/6)=-\cos(\pi/6)=-\sqrt3/2$.

To understand addition of angles, rotate the coordinate axes through $\beta$. A unit vector along the new horizontal direction has coordinates $(\cos\beta,\sin\beta)$; the perpendicular unit vector has coordinates $(-\sin\beta,\cos\beta)$. A point at angle $\alpha$ relative to these rotated directions is therefore

$$\cos\alpha\,(\cos\beta,\sin\beta)+\sin\alpha\,(-\sin\beta,\cos\beta).$$

Its angle from the original horizontal axis is $\alpha+\beta$. Comparing the two coordinates proves [[angle-addition|the addition formulas]]:

$$\begin{aligned}
\cos(\alpha+\beta)&=\cos\alpha\cos\beta-\sin\alpha\sin\beta,\\
\sin(\alpha+\beta)&=\sin\alpha\cos\beta+\cos\alpha\sin\beta.
\end{aligned}$$

Reflection in the horizontal axis gives $\cos(-\beta)=\cos\beta$ and $\sin(-\beta)=-\sin\beta$, so replacing $\beta$ by $-\beta$ gives the subtraction forms. For $15^\circ=45^\circ-30^\circ$, the sine formula yields $(\sqrt6-\sqrt2)/4$.

Dividing the sine addition formula by the cosine addition formula gives the tangent formula when the required quotients exist:

$$\tan(\alpha+\beta)=\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}.$$

Replacing $\beta$ by $-\beta$ gives $\tan(\alpha-\beta)=(\tan\alpha-\tan\beta)/(1+\tan\alpha\tan\beta)$. These tangent formulas require $\tan\alpha$, $\tan\beta$ and the tangent of the resulting angle to be defined. For tangent at an excluded input, the sine and cosine formulas can still describe the rotated point.

The same addition law can prove a family of identities by induction. Since $\sin\pi=0$ and $\cos\pi=-1$, adding $\pi$ reverses the sign of the sine. For $n=0$, $\sin(x+n\pi)=(-1)^n\sin x$ holds without any shift. If it holds for $n$, then adding another $\pi$ negates the left side and multiplies the right side by $-1$. Thus the formula holds for every nonnegative integer $n$. For instance, $\sin(\pi/6+7\pi)=-1/2$.`,
      related: [
        { card: "common-angle-values", note: String.raw`exact values for special triangles and points on the unit circle (S9.2).` }
      ],
      exercises: [
        { q: String.raw`Find the exact value of $\sin 15^\circ$.`, answer: "(sqrt(6) - sqrt(2))/4",
          solution: String.raw`$\sin(45^\circ - 30^\circ) = \tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} - \tfrac{\sqrt2}{2}\cdot\tfrac12 = \tfrac{\sqrt6 - \sqrt2}{4}$.` },
        { q: String.raw`Find $\tan 75^\circ$.`, answer: "2 + sqrt(3)",
          solution: String.raw`$\tan(45^\circ + 30^\circ) = \tfrac{1 + \tfrac{1}{\sqrt3}}{1 - \tfrac{1}{\sqrt3}} = \tfrac{\sqrt3 + 1}{\sqrt3 - 1} = \tfrac{(\sqrt3 + 1)^2}{2} = 2 + \sqrt3$.` },
        { q: String.raw`Find $\cos(\pi/3+9\pi)$.`, answer: "-1/2",
          solution: String.raw`Each half turn negates both coordinates on the unit circle. Nine half turns negate the cosine, and $\cos(\pi/3)=1/2$, so the value is $-1/2$.` }
      ],
      problems: [
        "2024 AMC 12A, Problem 18",
        "2007 AMC 12A, Problem 17",
        "2023 AMC 12A, Problem 11",
        "2024 AMC 12B, Problem 21"
      ]
    },
    "L12.3": {
      prereq: ["angle-addition"],
      cards: ["product-sum", "trigonometric-sums-products"],
      body: String.raw`The addition identities can be combined to isolate products. Adding the formulas for $\sin(\alpha+\beta)$ and $\sin(\alpha-\beta)$ cancels the cosine-sine terms, giving

$$2\sin\alpha\cos\beta=\sin(\alpha+\beta)+\sin(\alpha-\beta).$$

Adding the cosine formulas gives $2\cos\alpha\cos\beta=\cos(\alpha-\beta)+\cos(\alpha+\beta)$, while subtracting them gives $2\sin\alpha\sin\beta=\cos(\alpha-\beta)-\cos(\alpha+\beta)$. These are [[product-sum|the product-to-sum identities]]. For example, $\sin75^\circ\cos15^\circ=(\sin90^\circ+\sin60^\circ)/2=(2+\sqrt3)/4$.

The same identities factor sums. Set $\alpha=(A+B)/2$ and $\beta=(A-B)/2$, so $\alpha+\beta=A$ and $\alpha-\beta=B$. The cosine difference becomes

$$\cos A-\cos B=-2\sin\frac{A+B}{2}\sin\frac{A-B}{2}.$$

This substitution explains the half-sum and half-difference angles. In an equation, a product equal to zero separates the possible causes of a vanishing sum, while retaining every original solution.

The same substitution gives $\sin A+\sin B=2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$, $\sin A-\sin B=2\cos\frac{A+B}{2}\sin\frac{A-B}{2}$ and $\cos A+\cos B=2\cos\frac{A+B}{2}\cos\frac{A-B}{2}$. For example, $\sin4x+\sin2x=2\sin3x\cos x$. Its zeros come from $\sin3x=0$ or $\cos x=0$. On $0\le x<\pi$, those give $0,\pi/3,2\pi/3$ and $\pi/2$.

A difference can combine both transformations. Write $C=\cos36^\circ-\cos72^\circ$. Sum-to-product gives $C=2\sin54^\circ\sin18^\circ=2\cos36^\circ\sin18^\circ$. Multiplying by $\cos18^\circ$ now produces $\cos36^\circ\sin36^\circ=\sin72^\circ/2=\cos18^\circ/2$. Since $\cos18^\circ\ne0$, this gives $C=1/2$. The useful form is the one that creates matching angles and permits a justified cancellation.`,
      related: [
        { card: "telescoping", note: String.raw`cancellation in algebraic sums (L6.5).` },
        { card: "trig-telescoping-product", note: String.raw`products with successively doubled angles (L12.5).` },
        { card: "roots-of-unity", note: String.raw`sums of cosines at evenly spaced angles (L13.4).` }
      ],
      exercises: [
        { q: String.raw`Find $\sin 75^\circ\cos 15^\circ$.`, answer: "(2 + sqrt(3))/4",
          solution: String.raw`$\sin 75^\circ\cos 15^\circ = \tfrac12(\sin 90^\circ + \sin 60^\circ) = \tfrac12\left(1 + \tfrac{\sqrt3}{2}\right) = \tfrac{2 + \sqrt3}{4}$.` },
        { q: String.raw`Find $\cos 36^\circ - \cos 72^\circ$.`, answer: "1/2",
          solution: String.raw`By sum-to-product, $c = 2\sin 54^\circ\sin 18^\circ = 2\cos 36^\circ\sin 18^\circ$, and multiplying by $\cos 18^\circ$ gives $c\cos 18^\circ = \cos 36^\circ\sin 36^\circ = \tfrac12\sin 72^\circ = \tfrac12\cos 18^\circ$. So $c = \tfrac12$.` },
        { q: String.raw`How many solutions of $\cos5x-\cos x=0$ are in $[0,\pi)$?`, answer: "4",
          solution: String.raw`The difference factors as $-2\sin3x\sin2x$. The first factor vanishes at $0,\pi/3,2\pi/3$ in that interval. The second vanishes at $0,\pi/2$. Taking their union gives four solutions.` }
      ],
      problems: [
        "2006 AMC 12B, Problem 24",
        "2020 AMC 12B, Problem 25"
      ]
    },
    "L12.4": {
      prereq: ["angle-addition", "special-trig-values"],
      cards: ["harmonic-addition"],
      body: String.raw`The expression $a\sin x+b\cos x$ combines two coordinates of a point on the unit circle. Its largest possible magnitude can be found by choosing a direction in that plane. Let $R=\sqrt{a^2+b^2}$. If $R\gt0$, the pair $(a/R,b/R)$ lies on the unit circle, so choose $\varphi$ with $\cos\varphi=a/R$ and $\sin\varphi=b/R$. The addition formula then gives

$$a\sin x+b\cos x=R\sin(x+\varphi).$$

This is [[harmonic-addition|combining the two terms into one shifted wave]]. For all real $x$, its range is $[-R,R]$, since the shifted sine attains both endpoints and every value between them. If $a=b=0$, the expression is identically zero and no phase choice is needed.

For $5\sin x+12\cos x$, the amplitude is $13$, so the unrestricted maximum is $13$. It is attained when $(\sin x,\cos x)=(5/13,12/13)$. An extra interval restriction on $x$ must still be checked against these angles. In particular, the amplitude supplies a bound on every interval, but the interval may fail to contain a point attaining it.

The same shift can solve an equation. For $\sqrt3\sin x+\cos x=1$, the phase is $\pi/6$ because its cosine and sine are $\sqrt3/2$ and $1/2$. Divide by the amplitude two to get $\sin(x+\pi/6)=1/2$. Within one turn the shifted angle is $\pi/6$ or $5\pi/6$, so $x=0$ or $2\pi/3$ on $[0,2\pi)$. For a general right side $k$, a solution is possible over the full real line exactly when $|k|\le R$. A restricted interval may exclude some or all of the corresponding angles.`,
      related: [
        { card: "cauchy-schwarz", note: String.raw`a direct bound on the amplitude using the dot product (L11.5).` }
      ],
      exercises: [
        { q: String.raw`Find the largest value of $5\sin x + 12\cos x$.`, answer: "13",
          solution: String.raw`$5\sin x + 12\cos x = 13\sin(x + \varphi)$ with $\cos\varphi = \tfrac{5}{13}$, $\sin\varphi = \tfrac{12}{13}$, so the largest value is $13$.` },
        { q: String.raw`What is the largest value of $\sin x+\cos x$ on $0\le x\le\pi/6$?`, answer: "(1+sqrt(3))/2",
          solution: String.raw`The expression is $\sqrt2\sin(x+\pi/4)$. The shifted angle varies from $\pi/4$ to $5\pi/12$, where sine is increasing, so the maximum occurs at $x=\pi/6$. Its value is $1/2+\sqrt3/2$.` }
      ],
      problems: [
        "2017 AMC 12A, Problem 15",
        "2024 AMC 12B, Problem 19"
      ]
    },
    "L12.5": {
      prereq: ["angle-addition", "special-trig-values", "pythagorean-identities"],
      cards: ["double-angle", "half-angle", "triple-angle", "trig-telescoping-product"],
      body: String.raw`Setting $\alpha=\beta=x$ gives [[double-angle|the double-angle identities]]. In particular $\sin2x=2\sin x\cos x$ and $\cos2x=\cos^2x-\sin^2x$. Using the unit-circle identity gives two further forms, $1-2\sin^2x$ and $2\cos^2x-1$. Choose the one whose right side uses the supplied information. If $\tan x=3$, the tangent formula gives $\tan2x=6/(1-9)=-3/4$.

Solving $\cos x=1-2\sin^2(x/2)$ for the square gives [[half-angle|the half-angle relation]] $\sin^2(x/2)=(1-\cos x)/2$. Thus $\sin^2(22.5^\circ)=(2-\sqrt2)/4$. Taking a square root gives $|\sin(x/2)|$; the quadrant of $x/2$ determines the sign of the sine itself. The corresponding cosine square is $(1+\cos x)/2$.

Finally apply addition to $2x+x$. With $c=\cos x$ and $s=\sin x$, the cosine expression is $(2c^2-1)c-2s^2c=4c^3-3c$. The sine expression similarly becomes $3s-4s^3$. These derive [[triple-angle|the triple-angle identities]] from the same rotation law. For tangent, divide these sine and cosine expressions by $\cos^3 x$ when $\cos x\ne0$. With $t=\tan x$ this gives $\tan3x=(3t-t^3)/(1-3t^2)$ when the denominator is nonzero. For $\cos x=1/3$, the cosine triple angle is $4/27-1=-23/27$.

The same double-angle identities reduce powers at a fixed angle. At angle $x$, $\sin^2 x=(1-\cos2x)/2$ and $\cos^2 x=(1+\cos2x)/2$. These are the squared half-angle formulas with input $2x$. For the fourth power, square the first expression and reduce its remaining square using the angle $2x$:
$$\sin^4 x=\frac{3-4\cos2x+\cos4x}{8}.$$
In the opposite direction, use the half-angle square to solve for an actual sine or cosine. Its sign is the sign at the half angle, which can differ from the sign at the original angle. For example, half of $4\pi/3$ is in the second quadrant, so its cosine is the negative root $-1/2$ of the half-angle square $1/4$.

Some products have doubling angles, so the double-angle identity can be applied repeatedly. For $P=\cos20^\circ\cos40^\circ\cos80^\circ$, multiply by $\sin20^\circ$. The first two factors combine to $\sin40^\circ/2$, then the next pair combines to $\sin80^\circ/4$, and the final pair gives

$$P\sin20^\circ=\frac{\sin160^\circ}{8}=\frac{\sin20^\circ}{8}.$$

The sine factor is nonzero, so division gives $P=1/8$. The added factor was chosen to start a chain in which each newly produced angle matches the next cosine.

More generally, repeating the same step proves [[trig-telescoping-product|the doubling-product identity]]

$$2^N\sin x\prod_{k=0}^{N-1}\cos(2^kx)=\sin(2^Nx),\qquad N\ge1.$$

For $N=1$ this is the double-angle identity. In the induction step, multiply by $2\cos(2^Nx)$ and use the double-angle rule at $2^Nx$. The right side becomes $\sin(2^{N+1}x)$, which completes the induction. The undivided identity holds for every real $x$. Expressing the product as a quotient requires $\sin x\ne0$. If $x=m\pi$ for an integer $m$, the original product can instead be evaluated directly: its first factor is $(-1)^m$ and all the later factors are one.`,
      related: [
        { card: "de-moivre", note: String.raw`multiple-angle identities obtained from powers of complex numbers (L13.3).` }
      ],
      exercises: [
        { q: String.raw`If $\tan x = 3$, find $\tan 2x$.`, answer: "-3/4",
          solution: String.raw`$\tan 2x = \tfrac{2 \cdot 3}{1 - 9} = -\tfrac34$.` },
        { q: String.raw`If $\cos x = \tfrac13$, find $\cos 3x$.`, answer: "-23/27",
          solution: String.raw`$\cos 3x = 4\cos^3 x - 3\cos x = \tfrac{4}{27} - 1 = -\tfrac{23}{27}$.` },
        { q: String.raw`Find $\sin^2 22.5^\circ$.`, answer: "(2 - sqrt(2))/4",
          solution: String.raw`By the half angle formula, $\sin^2 22.5^\circ = \tfrac{1 - \cos 45^\circ}{2} = \tfrac{1 - \sqrt2/2}{2} = \tfrac{2 - \sqrt2}{4}$.` },
        { q: String.raw`If $\sin x = \tfrac35$, find $\cos 2x$.`, answer: "7/25",
          solution: String.raw`$\cos 2x = 1 - 2\sin^2 x = 1 - \tfrac{18}{25} = \tfrac{7}{25}$.` },
        { q: String.raw`Find $\cos 20^\circ\cos 40^\circ\cos 80^\circ$.`, answer: "1/8",
          solution: String.raw`Multiply by $\sin 20^\circ$ and apply the double angle formula three times: the product becomes $\tfrac18\sin 160^\circ = \tfrac18\sin 20^\circ$. Dividing by $\sin 20^\circ$ gives $\tfrac18$.` },
        { q: String.raw`Write $\sin^4x+\cos^4x=A+B\cos4x$. What is $A$?`, answer: "3/4",
          solution: String.raw`The sum is $1-2\sin^2x\cos^2x=1-\sin^2(2x)/2$. Power reduction gives $\sin^2(2x)=(1-\cos4x)/2$, so the sum is $3/4+\cos4x/4$.` }
      ],
      problems: [
        "2024 AMC 12A, Problem 10",
        "2014 AMC 12A, Problem 12",
        "2013 AMC 12B, Problem 20",
        "2004 AMC 12A, Problem 21"
      ]
    },
    "L12.6": {
      prereq: ["angle-addition", "special-trig-values"],
      cards: ["inverse-trig-identities"],
      body: String.raw`The [[inverse-trig-identities|inverse trigonometric functions]] select angles on intervals where the corresponding original function is one-to-one. For inputs in $[-1,1]$, $\arcsin$ returns an angle in $[-\pi/2,\pi/2]$ and $\arccos$ one in $[0,\pi]$. For every real input, $\arctan$ returns an angle in the open interval $(-\pi/2,\pi/2)$. Its endpoints are excluded because tangent is undefined there.

These range choices imply $\arcsin u+\arccos u=\pi/2$ for $-1\le u\le1$: the two selected angles are complementary. They also explain why reversing a composition requires care. If $x$ is outside $[0,\pi]$, $\arccos(\cos x)$ returns the selected angle having the same cosine. For example, $\arccos(\cos(5\pi/3))=\pi/3$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" role="img" aria-labelledby="l124-inverse-title l124-inverse-desc" style="width:100%;max-width:520px;height:auto"><title id="l124-inverse-title">The selected inverse-cosine angle folds into zero to pi</title><desc id="l124-inverse-desc">On inputs from zero to pi, arccosine of cosine x equals x. From pi to two pi, it equals two pi minus x. At five pi thirds it gives pi thirds.</desc><g fill="none" stroke="currentColor"><path d="M75 50V260H450" opacity="0.5"/><path d="M75 260L250 80L425 260" stroke-width="2.5"/><path d="M75 200H366.667V260" stroke-dasharray="5 4" opacity="0.5"/><path d="M363 204L335 221" opacity="0.6"/></g><g fill="currentColor"><circle cx="366.667" cy="200" r="4"/><g font-size="16" text-anchor="middle"><text x="250" y="25">y = arccos(cos x)</text><text x="250" y="285">π</text><text x="425" y="285">2π</text><text x="55" y="85">π</text><text x="57" y="285">0</text><text x="285" y="240">(5π/3, π/3)</text><text x="467" y="266">x</text><text x="61" y="49">y</text></g></g></svg>

The graph folds the inputs from $\pi$ to $2\pi$ back into the allowed output range. On the first half it equals $x$, and on the second half it equals $2\pi-x$. Similarly, $\arcsin(\sin(5\pi/6))=\pi/6$, because $\pi/6$ is the angle in the selected sine interval with that sine value.

For a sum of inverse tangents, the addition formula determines its tangent, and the ranges determine the actual angle. Let $A=\arctan2$, $B=\arctan3$. Both lie between $\pi/4$ and $\pi/2$, so $A+B$ lies between $\pi/2$ and $\pi$. Its tangent is $(2+3)/(1-6)=-1$, giving $A+B=3\pi/4$. If the addition denominator vanishes, the sum has undefined tangent; determine the possible vertical angle from its range instead of dividing by zero.`,
      related: [
        { card: "piecewise-graph-counting", note: String.raw`counting solutions by tracking a function on successive intervals (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find $\arcsin\tfrac12 + \arccos\tfrac12$.`, answer: "pi/2",
          solution: String.raw`$\arcsin\tfrac12 = \tfrac\pi6$ and $\arccos\tfrac12 = \tfrac\pi3$, which add to $\tfrac\pi2$, as $\arcsin x + \arccos x$ always does.` },
        { q: String.raw`Find $\arctan 2 + \arctan 3$.`, answer: "3pi/4",
          solution: String.raw`The tangent of the sum is $\tfrac{2 + 3}{1 - 2 \cdot 3} = -1$. Each angle is between $\tfrac\pi4$ and $\tfrac\pi2$, so the sum is between $\tfrac\pi2$ and $\pi$, and it is $\tfrac{3\pi}{4}$.` }
      ],
      problems: [
        "2009 AMC 12B, Problem 24"
      ]
    },
    "L12.7": {
      prereq: ["pythagorean-identities", "reduction-identities", "special-trig-values", "angle-addition", "double-angle", "half-angle", "triple-angle", "product-sum", "trig-telescoping-product", "harmonic-addition", "inverse-trig-identities"],
      cards: [],
      body: String.raw`Right-triangle ratios extend to every real angle through the signed coordinates of the unit circle. The circle gives the [[pythagorean-identities|Pythagorean identities]], [[special-trig-values|exact values]] and [[reduction-identities|symmetries for reducing angles]]. Rotating the coordinate directions proves [[angle-addition|the formulas for a sum or difference of angles]].

Combining two addition formulas gives [[product-sum|product-to-sum and sum-to-product identities]]. Use the half-sum and half-difference of the angles to factor an equation. [[harmonic-addition|Harmonic addition]] gives a different way to combine terms. It expresses a linear combination of sine and cosine at the same angle as one shifted wave. The wave's maximum on a restricted interval depends on whether the interval contains an angle attaining its amplitude.

[[double-angle|Double]], [[triple-angle|triple]] and [[half-angle|half-angle formulas]] all follow from adding angles. The squared forms also reduce powers. The half angle's quadrant supplies the sign when taking a square root. Repeated doubling gives [[trig-telescoping-product|telescoping products]]. Work with the undivided identity until the factor being canceled is known to be nonzero.

[[inverse-trig-identities|Inverse trigonometric functions]] select angles in fixed intervals. For sums of inverse tangents, a tangent calculation determines the angle up to multiples of $\pi$. The range of the original sum determines which one is correct.`,
      strategies: [
        String.raw`Use circle reflections to move to a known angle and recover the correct sign.`,
        String.raw`Use angle addition to derive a double-angle formula or shift a linear combination of sine and cosine.`,
        String.raw`Factor a trigonometric sum with the half-sum and half-difference of the angles.`,
        String.raw`Choose a double-angle form that uses the data or removes an unwanted square.`,
        String.raw`For a doubling-angle product, multiply by the sine of the smallest angle and check that it can be canceled.`,
        String.raw`When using an inverse trigonometric function, check the selected output interval and all permitted solutions.`
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
