// Learn, AMC Algebra, chapter L11: functional equations, recurrences and inequalities (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L11"] = {
  lessons: {
    "L11.1": {
      prereq: ["first-order-recurrence", "am-gm"],
      cards: [],
      body: String.raw`A function need not be presented by an explicit formula. An equation may instead relate its values at different inputs, or a recurrence may determine each new term from earlier ones. These relationships can determine the requested value before we know a formula for the entire function or sequence.

If $f(x+1)=2x+5$ holds for every real $x$, finding $f(4)$ requires the input $x=3$, since that makes the argument of $f$ equal to four. More generally, setting $t=x+1$ gives $x=t-1$ and hence $f(t)=2t+3$. Choosing an input and changing a variable are two ways of following the same relation.

A recurrence gives a different kind of information. With $a_1=a_2=1$ and $a_n=a_{n-1}+a_{n-2}$ for $n\ge3$, each term is fixed once the preceding two are known. Thus the terms begin $1,1,2,3,5,8,13,21$. A proposed closed formula must satisfy both the recurrence and its starting values. Satisfying the recurrence alone leaves many possible sequences.

Sums can also be understood by following how often a contribution appears. In $\sum_{i=1}^3\sum_{j=1}^3(i+j)$, each value of $i$ occurs three times, as does each value of $j$. The total is therefore $3(1+2+3)+3(1+2+3)=36$. For a triangular range of pairs, the number of repetitions changes from one column to the next, so the range must be tracked when the order is reversed.

The chapter develops functional equations, then recurrences and structured sums. It ends with inequalities that compare means and connect a linear constraint to a sum of squares. The equality conditions will determine which bounds can actually be attained.`,
      exercises: [
        { q: String.raw`If $f(x + 1) = 2x + 5$ for every $x$, find $f(4)$.`, answer: "11",
          solution: String.raw`Choose $x = 3$, so that $x + 1 = 4$: $f(4) = 2 \cdot 3 + 5 = 11$.` },
        { q: String.raw`A sequence has $a_1 = a_2 = 1$ and $a_n = a_{n-1} + a_{n-2}$. Find $a_8$.`, answer: "21",
          solution: String.raw`The terms are $1, 1, 2, 3, 5, 8, 13, 21$, so $a_8 = 21$.` },
        { q: String.raw`Find $\sum_{i=1}^{3}\sum_{j=1}^{3}(i + j)$.`, answer: "36",
          solution: String.raw`Split the sum: $\sum\sum i = 3(1 + 2 + 3) = 18$, since each $i$ appears for three values of $j$, and $\sum\sum j = 18$ likewise. The total is $36$.` }
      ],
      problems: [
        "2007 AMC 12B, Problem 9",
        "2008 AMC 10B, Problem 11",
        "2018 AMC 12B, Problem 9"
      ]
    },
    "L11.2": {
      prereq: ["inverse-function-properties", "linear-elimination"],
      cards: ["functional-substitution", "fx-pairing", "function-symmetry-equation"],
      body: String.raw`A functional equation places a condition on a function throughout a specified domain. We may substitute any allowed input, but the arguments appearing in the equation must remain in the function's domain. Begin by distinguishing an input from the value of the function at that input.

For $f(x+1)=2x+5$, choosing $x=3$ makes the argument $x+1$ equal to four. In more complicated equations, [[functional-substitution|choosing a substitution]] can make one argument equal another, make a term constant, or produce a second equation involving the same unknown values.

Consider $f(x)+2f(1/x)=3x$ for every nonzero real $x$. The partner of $x$ is $1/x$, and taking the partner a second time returns to $x$. Substitute it into the original equation:

$$f(x)+2f(1/x)=3x,\qquad 2f(x)+f(1/x)=3/x.$$

These are two linear equations for two function values. Twice the second minus the first gives $3f(x)=6/x-3x$, hence $f(x)=2/x-x$. In particular $f(2)=-1$. Substituting this formula back gives $(2/x-x)+2(2x-1/x)=3x$, verifying that it satisfies the condition on the entire stated domain.

The domain excludes zero, so substituting zero would provide no valid information. At $x=1$ and $x=-1$, the partner is the input itself; the original equation still gives the corresponding value. The general formula agrees with both.

For $f(xy)=f(x)+f(y)$ on positive inputs, the useful substitutions build the requested number from known factors. If $f(2)=3$, then $f(4)=6$ and $f(8)=9$. Setting $x=y=1$ also gives $f(1)=0$, and using $y=1/x$ gives $f(1/x)=-f(x)$. These conclusions follow from the equation itself. They do not require assuming that every solution is a constant multiple of an ordinary logarithm; such a full classification needs additional hypotheses.

When many function values are being added, the partner relation may determine each pair's sum directly. For $f(x)=4^x/(4^x+2)$, set $u=4^x\gt0$. Then $4^{1-x}=4/u$, so $f(1-x)=2/(u+2)$ and

$$f(x)+f(1-x)=1.$$

This is [[fx-pairing|pairing function values]]. In the sum at inputs $1/10,2/10,\ldots,9/10$, the first and last inputs pair, as do the next two, giving four pairs of value one. The middle input $1/2$ is its own partner and has value $1/2$. The total is $9/2$.

A [[function-symmetry-equation|symmetry equation]] also describes the graph. The relation $f(c-x)=f(x)$ pairs points at the same height, giving reflection across $x=c/2$. The relation $f(c-x)=K-f(x)$ instead pairs heights adding to $K$, giving a half-turn about $(c/2,K/2)$. The pairing example has this second symmetry about $(1/2,1/2)$. Counting an unpaired middle term is part of using either relation in a finite sum.`,
      related: [
        { card: "odd-even-functions", note: String.raw`the simplest symmetries, $f(-x) = \pm f(x)$ (L4.2).` },
        { card: "cauchy-functional-equations", note: String.raw`equations such as $f(x + y) = f(x) + f(y)$ in general.` }
      ],
      exercises: [
        { q: String.raw`A function satisfies $f(x) + 2f\left(\tfrac1x\right) = 3x$ for every $x \ne 0$. Find $f(2)$.`, answer: "-1",
          solution: String.raw`$x = 2$ gives $f(2) + 2f\left(\tfrac12\right) = 6$, and $x = \tfrac12$ gives $f\left(\tfrac12\right) + 2f(2) = \tfrac32$. From the second, $f\left(\tfrac12\right) = \tfrac32 - 2f(2)$; substituting, $f(2) + 3 - 4f(2) = 6$, so $f(2) = -1$.` },
        { q: String.raw`A function satisfies $f(xy) = f(x) + f(y)$ for positive $x$, $y$, and $f(2) = 3$. Find $f(8)$.`, answer: "9",
          solution: String.raw`$f(4) = f(2) + f(2) = 6$ and $f(8) = f(4) + f(2) = 9$.` },
        { q: String.raw`Let $f(x) = \dfrac{4^x}{4^x + 2}$. Find $f\left(\tfrac1{10}\right) + f\left(\tfrac2{10}\right) + \cdots + f\left(\tfrac9{10}\right)$.`, answer: "9/2",
          solution: String.raw`$f(1 - x) = \tfrac{4/4^x}{4/4^x + 2} = \tfrac{2}{2 + 4^x}$, so $f(x) + f(1 - x) = 1$. The terms pair as $\tfrac1{10}$ with $\tfrac9{10}$ and so on, four pairs of $1$, plus $f\left(\tfrac12\right) = \tfrac24 = \tfrac12$. The sum is $\tfrac92$.` }
      ],
      problems: [
        "2006 AMC 12A, Problem 18",
        "2001 AMC 12, Problem 9",
        "2019 AMC 12B, Problem 8",
        "2014 AMC 12A, Problem 15",
        "2023 AMC 12A, Problem 22"
      ]
    },
    "L11.3": {
      prereq: ["first-order-recurrence", "quadratic-formula"],
      cards: ["linear-recurrence", "binets-formula"],
      body: String.raw`For a recurrence, initial values identify which sequence is intended. A second-order rule $a_n=pa_{n-1}+qa_{n-2}$, for $n\ge2$, propagates any chosen $a_0,a_1$ uniquely: those values determine $a_2$, then $a_3$, and so on. We will assume $q\ne0$ for this second-order discussion; when $q=0$, the rule from $a_1$ onward is first-order.

The constant coefficients suggest trying geometric sequences. Substituting $a_n=r^n$, with $r\ne0$, and dividing by $r^{n-2}$ gives $r^2=pr+q$. This quadratic is the characteristic equation of [[linear-recurrence|the linear recurrence]]. Each of its roots supplies a geometric solution, and any linear combination of solutions still satisfies the recurrence.

If the roots $r,s$ are distinct, set $a_n=Ar^n+Bs^n$. The starting values require $A+B=a_0$ and $Ar+Bs=a_1$. The roots being distinct makes this system uniquely solvable. The resulting formula agrees with both initial values and the recurrence, so uniqueness of the propagated sequence proves that it is the desired sequence for every $n\ge0$.

For $a_n=5a_{n-1}-6a_{n-2}$, the characteristic roots are $2,3$. With $a_0=2,a_1=5$, the equations give $A=B=1$, hence $a_n=2^n+3^n$ and $a_5=32+243=275$. Computing a few early terms checks the indexing, but agreement at the two starting values together with the recurrence is what proves the formula for all terms.

If the characteristic equation has a repeated root $r$, the two geometric candidates coincide. Here $p=2r$, $q=-r^2$, and $r\ne0$. Divide by $r^n$ and set $u_n=a_n/r^n$. The recurrence becomes $u_n=2u_{n-1}-u_{n-2}$, or $u_n-u_{n-1}=u_{n-1}-u_{n-2}$. Thus $u_n$ is arithmetic, giving $a_n=(A+Bn)r^n$. For example, $a_n=4a_{n-1}-4a_{n-2}$ with $a_0=1,a_1=4$ gives $a_n=(n+1)2^n$ and $a_2=12$.

For Fibonacci numbers, use $F_0=0,F_1=1$ and $F_n=F_{n-1}+F_{n-2}$. The characteristic roots are $\varphi=(1+\sqrt5)/2$ and $\psi=(1-\sqrt5)/2$. The initial equations give coefficients $1/\sqrt5$ and $-1/\sqrt5$, so

$$F_n=\frac{\varphi^n-\psi^n}{\sqrt5}.$$

This is [[binets-formula|Binet's formula]]. It is exact, although it is written using irrational numbers. Since $|\psi|\lt1$, its difference from $\varphi^n/\sqrt5$ has magnitude at most $1/\sqrt5\lt1/2$ for $n\ge0$. Therefore $F_n$ is the unique nearest integer to that quantity. Dividing numerator and denominator of $F_{n+1}/F_n$ by $\varphi^n$ also shows that the ratio approaches $\varphi$, because $|\psi/\varphi|\lt1$.

For a small requested index, direct recurrence computation may be shorter than solving the quadratic. A closed form is especially useful when the task concerns a far term, a growth rate, or an identity across all indices.`,
      related: [
        { card: "recursive-counting", note: String.raw`counting problems that lead to linear recurrences.` },
        { card: "periodic-sequences", note: String.raw`recurrences whose terms repeat (L6.4).` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_0 = 2$, $a_1 = 5$ and $a_n = 5a_{n-1} - 6a_{n-2}$. Find $a_5$.`, answer: "275",
          solution: String.raw`The characteristic equation $x^2 - 5x + 6 = 0$ has roots $2$ and $3$, and the starting values give $a_n = 2^n + 3^n$. So $a_5 = 32 + 243 = 275$.` },
        { q: String.raw`The Fibonacci numbers have $F_1 = F_2 = 1$ and $F_n = F_{n-1} + F_{n-2}$. Find $F_{10}$.`, answer: "55",
          solution: String.raw`The terms run $1, 1, 2, 3, 5, 8, 13, 21, 34, 55$, so $F_{10} = 55$.` },
        { q: String.raw`A sequence has $a_0 = 0$, $a_1 = 1$ and $a_n = a_{n-1} + 6a_{n-2}$. Find $a_4$.`, answer: "13",
          solution: String.raw`The roots of $x^2 - x - 6 = 0$ are $3$ and $-2$, and the starting values give $a_n = \tfrac{3^n - (-2)^n}{5}$. So $a_4 = \tfrac{81 - 16}{5} = 13$. Directly: $0, 1, 1, 7, 13$.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 18",
        "2016 AMC 12B, Problem 25"
      ]
    },
    "L11.4": {
      prereq: ["arithmetic-series", "geometric-series", "power-sums"],
      cards: ["finite-differences", "double-summation", "arithmetico-geometric", "largest-term-ratio"],
      body: String.raw`Successive differences measure how a sequence changes. Define $\Delta a_n=a_{n+1}-a_n$. If $a_n$ is a polynomial in $n$ of degree $d\ge1$, expansion of $(n+1)^d-n^d$ cancels its leading power and leaves degree $d-1$. Repeating the operation $d$ times gives a constant; one more difference gives zero.

For $a_n=n^2+1$, indexed from $n=1$, the terms $2,5,10,17,26$ have differences $3,5,7,9$ and second differences $2,2,2$. Under the hypothesis that the terms come from a polynomial of degree at most two, the next difference is $11$ and the next term is $37$. [[finite-differences|Finite differences]] establish this continuation when the degree bound is known.

The displayed prefix alone does not establish that hypothesis. Adding $(n-1)(n-2)(n-3)(n-4)(n-5)$ to $n^2+1$ preserves the first five terms but changes the sixth by $120$. A difference table can suggest a rule; a stated degree bound or another defining condition is needed to make the continuation unique.

In a sum of several kinds of terms, differences affect each part separately. Two differences eliminate a linear contribution, while a geometric contribution $r^n$ becomes $(r-1)^2r^n$. This can separate a polynomial trend from an exponential one without expanding a long list of terms.

A double sum requires equal care with its range. The sum $\sum_{i=1}^{N}\sum_{j=1}^{i}1$ counts pairs with $1\le j\le i\le N$. At fixed $i$, there are $i$ choices of $j$. At fixed $j$, the allowed values of $i$ run from $j$ to $N$, giving $N-j+1$ choices. Consequently the same total can be written

$$\sum_{i=1}^{N}\sum_{j=1}^{i}1
=\sum_{j=1}^{N}\sum_{i=j}^{N}1
=\frac{N(N+1)}2.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 350" role="img" aria-labelledby="l114-triangle-title l114-triangle-desc" style="width:100%;max-width:520px;height:auto"><title id="l114-triangle-title">Reversing a triangular double sum</title><desc id="l114-triangle-desc">For one less than or equal to j less than or equal to i less than or equal to five, row i contains i dots. The columns contain five, four, three, two and one dots. Rows and columns count the same fifteen pairs.</desc><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="25">Same pairs, counted in either order</text><text x="260" y="53">Column j</text><text x="42" y="170">Row i</text><text x="100" y="81">1</text><text x="155" y="81">2</text><text x="210" y="81">3</text><text x="265" y="81">4</text><text x="320" y="81">5</text><text x="72" y="115">1</text><text x="415" y="115">1</text><circle cx="100" cy="110" r="6"/><text x="72" y="150">2</text><text x="415" y="150">2</text><circle cx="100" cy="145" r="6"/><circle cx="155" cy="145" r="6"/><text x="72" y="185">3</text><text x="415" y="185">3</text><circle cx="100" cy="180" r="6"/><circle cx="155" cy="180" r="6"/><circle cx="210" cy="180" r="6"/><text x="72" y="220">4</text><text x="415" y="220">4</text><circle cx="100" cy="215" r="6"/><circle cx="155" cy="215" r="6"/><circle cx="210" cy="215" r="6"/><circle cx="265" cy="215" r="6"/><text x="72" y="255">5</text><text x="415" y="255">5</text><circle cx="100" cy="250" r="6"/><circle cx="155" cy="250" r="6"/><circle cx="210" cy="250" r="6"/><circle cx="265" cy="250" r="6"/><circle cx="320" cy="250" r="6"/><text x="415" y="81">Row count</text><text x="260" y="305">Column counts: 5, 4, 3, 2, 1</text><text x="260" y="333">1 + 2 + 3 + 4 + 5 = 15 pairs</text></g></svg>

The diagram shows the fifteen pairs for $N=5$. Its rows have lengths $1,2,3,4,5$, while its columns have lengths $5,4,3,2,1$. [[double-summation|Reversing the order]] preserves every pair and changes which index is fixed first. For a nonconstant summand, the same range conversion is necessary; simply swapping the two summation symbols would generally include the wrong pairs. At $N=10$, the count is $55$.

An [[arithmetico-geometric|arithmetico-geometric sum]] combines a linear factor with a geometric one. Work first with the finite sum $S_N=\sum_{k=1}^N kr^k$. Multiplying by $r$ shifts the powers, so subtraction gives

$$(1-r)S_N=r+r^2+\cdots+r^N-Nr^{N+1}.$$

The boundary term records the unmatched last term in the shifted sum. For $|r|\lt1$, the geometric sum tends to $r/(1-r)$ and $Nr^{N+1}$ tends to zero. The latter follows, for example, because the ratio of consecutive magnitudes tends to $|r|\lt1$, so eventually those magnitudes decrease by at least a fixed geometric factor. Thus

$$\sum_{k=1}^{\infty}kr^k=\frac{r}{(1-r)^2},\qquad |r|\lt1.$$

At $r=1/3$, the value is $3/4$. Establishing the finite identity first both identifies the boundary term and justifies the infinite calculation.

Ratios also locate an extreme term in a positive sequence. For $T_k=\binom nk x^k$, take a nonnegative integer $n$, $x\gt0$, and $0\le k\le n$. For neighboring terms, with $0\le k\lt n$, division gives $T_{k+1}/T_k=x(n-k)/(k+1)$. This ratio decreases as $k$ increases. Terms increase while it exceeds one and decrease after it falls below one, which proves [[largest-term-ratio|the largest-term rule]] in this setting. With $n=5,x=2$, the terms are $1,10,40,80,80,32$: a ratio equal to one gives two adjacent maxima. For a sequence whose ratios are not monotone, one crossing alone would not establish a global maximum.`,
      related: [
        { card: "lagrange-interpolation", note: String.raw`a polynomial fixed by its values, the same information as its differences (L10.4).` },
        { card: "telescoping", note: String.raw`sums that collapse, the reverse of taking differences (L6.5).` }
      ],
      exercises: [
        { q: String.raw`The terms $2,5,10,17,26$ come from a polynomial in the index of degree at most two. Find the next term.`, answer: "37",
          solution: String.raw`The differences $3, 5, 7, 9$ grow by $2$, so the next difference is $11$ and the next term $37$ (the terms are $n^2 + 1$).` },
        { q: String.raw`Find $\sum_{i=1}^{10}\sum_{j=1}^{i} 1$.`, answer: "55",
          solution: String.raw`For each $i$ the inner sum is $i$, so the total is $1 + 2 + \cdots + 10 = 55$.` },
        { q: String.raw`Find $\sum_{k=1}^{\infty} \dfrac{k}{3^k}$.`, answer: "3/4",
          solution: String.raw`For $S_N=\sum_{k=1}^N k/3^k$, shifting and subtracting gives $(1-1/3)S_N=\sum_{k=1}^N3^{-k}-N/3^{N+1}$. The geometric sum tends to $1/2$ and the boundary term tends to zero, so $S_N$ tends to $(1/2)/(2/3)=3/4$.` }
      ],
      problems: [
        "2022 AMC 10A, Problem 20",
        "2024 AMC 10B, Problem 12",
        "2015 AMC 12B, Problem 25"
      ]
    },
    "L11.5": {
      prereq: ["am-gm", "trivial-inequality"],
      cards: ["mean-chain", "cauchy-schwarz"],
      body: String.raw`Different averages answer different questions because they preserve different totals. For positive $a,b$, the arithmetic mean $A=(a+b)/2$ preserves their sum, the geometric mean $G=\sqrt{ab}$ preserves their product, and the harmonic mean $H=2/(1/a+1/b)$ preserves their average reciprocal. The quadratic mean is $Q=\sqrt{(a^2+b^2)/2}$.

Their order follows from squares. The identity $Q^2-A^2=(a-b)^2/4$ gives $Q\ge A$. AM-GM gives $A\ge G$, and applying AM-GM to $1/a,1/b$ gives $1/H\ge1/G$, hence $G\ge H$. Therefore [[mean-chain|the chain of means]] is $Q\ge A\ge G\ge H$, with equality throughout exactly when $a=b$.

The harmonic mean occurs for equal travel distances. Cover distance $d$ at speed $3$ and distance $d$ at speed $6$. The total time is $d/3+d/6=d/2$, while the total distance is $2d$, so the average speed is $4$. Taking the arithmetic mean of the speeds would instead correspond to equal times. The quantity held equal determines the appropriate average.

The reciprocal bound can also be checked directly:

$$\frac1a+\frac1b=\frac{a+b}{ab}\ge\frac4{a+b},$$

since $ab\le(a+b)^2/4$ and all denominators are positive. If $a+b=2$, this gives a minimum of $2$, attained at $a=b=1$. Positivity is essential for the reciprocal comparison.

For a linear constraint involving squares, start with the two-variable identity

$$(a^2+b^2)(x^2+y^2)-(ax+by)^2=(ay-bx)^2\ge0.$$

This proves [[cauchy-schwarz|Cauchy-Schwarz]] in two dimensions, including its equality condition $ay=bx$. In any finite dimension, the corresponding difference is $\sum_{i\lt j}(a_i x_j-a_j x_i)^2$, so it is still nonnegative. If the coefficient list is nonzero, equality means that the other list is a scalar multiple of it; a zero list makes equality automatic. The entries themselves may be negative.

Under $3x+4y=10$, Cauchy-Schwarz gives $100\le25(x^2+y^2)$, hence $x^2+y^2\ge4$. Equality requires $(x,y)=t(3,4)$, and the constraint gives $25t=10$. Thus $(x,y)=(6/5,8/5)$ attains the bound.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 335" role="img" aria-labelledby="l115-distance-title l115-distance-desc" style="width:100%;max-width:520px;height:auto"><title id="l115-distance-title">The point nearest the origin on three x plus four y equals ten</title><desc id="l115-distance-desc">Axes use the same scale. The line has intercepts ten thirds and five halves. The perpendicular from the origin ends at six fifths, eight fifths and has length two. A circle of radius two centered at the origin touches the line there.</desc><g fill="none" stroke="currentColor"><path d="M65 280V36M55 270H390" opacity="0.55"/><path d="M65 70L331.667 270" stroke-width="2"/><path d="M65 110A160 160 0 0 1 225 270" stroke-dasharray="5 5" opacity="0.6"/><path d="M65 270L161 142" stroke-width="2"/><path d="M153.8 151.6L163.4 158.8L170.6 149.2" stroke-width="1.3"/></g><g fill="currentColor"><circle cx="161" cy="142" r="4"/><g font-size="16"><text x="250" y="24" text-anchor="middle">Closest point on 3x + 4y = 10</text><text x="44" y="291">0</text><text x="402" y="275">x</text><text x="44" y="42">y</text><text x="332" y="295" text-anchor="middle">10/3</text><text x="49" y="75" text-anchor="end">5/2</text><text x="181" y="136">P = (6/5, 8/5)</text><text x="91" y="196">2</text><text x="250" y="323" text-anchor="middle">Minimum x² + y² = 4</text></g></g></svg>

Geometrically, $x^2+y^2$ is squared distance from the origin. The equality point lies in the direction $(3,4)$, perpendicular to the line $3x+4y=10$. Every other point on the line adds a nonzero displacement along the line, increasing the squared distance. The diagram shows the perpendicular segment of length $2$ and the circle it just reaches.

Taking the coefficient list as $(1,1,1)$ instead gives $(a+b+c)^2\le3(a^2+b^2+c^2)$ for all real $a,b,c$. With sum $9$, the minimum sum of squares is $27$, attained at $a=b=c=3$. Unlike a comparison of positive harmonic and geometric means, this squares inequality needs no positivity assumption. In each application, derive the equality configuration and then check it against every original constraint.`,
      related: [
        { card: "am-gm", note: String.raw`the middle link of the chain (L8.3).` },
        { card: "point-line-distance", note: String.raw`the geometric meaning of the least value of $x^2 + y^2$ on a line.` }
      ],
      exercises: [
        { q: String.raw`Find the harmonic mean of $3$ and $6$.`, answer: "4",
          solution: String.raw`The harmonic mean is $\tfrac{2 \cdot 3 \cdot 6}{3 + 6} = \tfrac{36}{9} = 4$.` },
        { q: String.raw`If $3x + 4y = 10$, find the least value of $x^2 + y^2$.`, answer: "4",
          solution: String.raw`By Cauchy-Schwarz, $(3x + 4y)^2 \le (3^2 + 4^2)(x^2 + y^2)$, so $100 \le 25(x^2 + y^2)$ and $x^2 + y^2 \ge 4$, with equality at $(x, y) = \left(\tfrac65, \tfrac85\right)$.` },
        { q: String.raw`Positive numbers $a$ and $b$ have $a + b = 2$. Find the least value of $\tfrac1a + \tfrac1b$.`, answer: "2",
          solution: String.raw`By the arithmetic-harmonic mean inequality, $\tfrac1a + \tfrac1b \ge \tfrac{4}{a + b} = 2$, with equality at $a = b = 1$.` }
      ],
      problems: [
        "2011 AMC 12B, Problem 21"
      ]
    },
    "L11.6": {
      prereq: ["functional-substitution", "fx-pairing", "function-symmetry-equation", "linear-recurrence", "binets-formula", "finite-differences", "double-summation", "arithmetico-geometric", "largest-term-ratio", "mean-chain", "cauchy-schwarz"],
      cards: [],
      body: String.raw`A functional equation provides relationships between values at allowed inputs. [[functional-substitution|Substitution]] can produce equations involving the same values, and solving that system can determine a formula or a requested value. Check the resulting formula in the original equation. For [[fx-pairing|paired values]], a constant pair sum can determine a long finite sum, with any fixed middle input counted once.

A second-order [[linear-recurrence|linear recurrence]] is fixed by two initial values. Its characteristic roots supply geometric solutions; distinct roots give two independently adjustable terms, while a repeated nonzero root gives an additional linear factor in the index. [[binets-formula|The Fibonacci formula]] follows by matching the two starting values, and the size of its second root controls the error in its dominant term.

[[finite-differences|Differences]] lower polynomial degree, but a finite table determines a continuation only under an appropriate degree bound. In [[double-summation|a double sum]], describe the allowed index pairs before reversing the order. For [[arithmetico-geometric|weighted geometric sums]], multiply and subtract finite partial sums first, then check the boundary term before taking a limit. [[largest-term-ratio|Consecutive-term ratios]] give a global maximum when the full pattern of increases and decreases has been justified.

[[mean-chain|Mean inequalities]] compare positive quantities while retaining the sum, product, or reciprocal information relevant to the problem. [[cauchy-schwarz|Cauchy-Schwarz]] compares a linear expression with sums of squares, permits real entries of either sign, and attains equality when its lists are proportional. An attained optimum requires that this equality condition satisfy the original constraint.`,
      strategies: [
        String.raw`In a functional equation, substitute values that make the arguments equal to what you need.`,
        String.raw`If the equation relates $f(x)$ and $f$ at a partner point, substitute the partner and solve the system.`,
        String.raw`For a sum of many values of $f$, check whether $f(x) + f(c - x)$ is constant.`,
        String.raw`For a linear recurrence, compute a table for small indices, and use the characteristic equation for large ones.`,
        String.raw`Use differences to determine a polynomial sequence when its degree bound is known; a finite prefix alone does not prove the rule.`,
        String.raw`Describe the allowed index pairs, then rewrite both summation limits when reversing the order.`,
        String.raw`For sums of squares or reciprocals with a fixed sum, use the chain of means; for a linear expression against a sum of squares, use Cauchy-Schwarz.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A function satisfies $f(2x + 1) = 4x^2 + 4x$ for every $x$. Find $f(5)$.`, answer: "24",
        solution: String.raw`Choose $x = 2$, so that $2x + 1 = 5$: $f(5) = 16 + 8 = 24$. (In fact $f(t) = t^2 - 1$.)` },
      { q: String.raw`A function satisfies $f(x) + 3f(-x) = 2x$ for every $x$. Find $f(5)$.`, answer: "-5",
        solution: String.raw`Replace $x$ by $-x$: $f(-x) + 3f(x) = -2x$. Multiply the second by $3$ and subtract the first: $9f(x) - f(x) = -6x - 2x$, so $8f(x) = -8x$ and $f(x) = -x$. So $f(5) = -5$.` },
      { q: String.raw`A sequence has $a_0 = 1$, $a_1 = 3$ and $a_n = 2a_{n-1} + 3a_{n-2}$. Find $a_6$.`, answer: "729",
        solution: String.raw`The characteristic roots are $3$ and $-1$, and the starting values give $a_n = 3^n$. So $a_6 = 729$. Directly: $1, 3, 9, 27, 81, 243, 729$.` },
      { q: String.raw`Find $\sum_{k=1}^{20} \dfrac{k(k + 1)}{2}$.`, answer: "1540",
        solution: String.raw`Each term is $\binom{k + 1}{2}$, and summing a column of Pascal's triangle gives $\binom{22}{3} = 1540$; or use $\sum \tfrac{k^2 + k}{2} = \tfrac12(2870 + 210) = 1540$.` },
      { q: String.raw`Positive numbers $x$ and $y$ satisfy $\tfrac1x + \tfrac1y = \tfrac12$. Find the least value of $x + y$.`, answer: "8",
        solution: String.raw`By Cauchy-Schwarz, $(x + y)\left(\tfrac1x + \tfrac1y\right) \ge (1 + 1)^2 = 4$, so $x + y \ge 8$, with equality at $x = y = 4$.` },
      { q: String.raw`If $a + b + c = 9$, find the least value of $a^2 + b^2 + c^2$.`, answer: "27",
        solution: String.raw`Apply Cauchy-Schwarz to $(a,b,c)$ and $(1,1,1)$: $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3} = 27$, with equality at $a = b = c = 3$.` }
    ],
    problems: [
      "2024 AMC 12B, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12B, Problem 22"
    ]
  }
};
