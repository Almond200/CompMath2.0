// Learn, Olympiad Algebra, chapter E3: methods for inequalities (CONVENTIONS §14). The olympiad track.
// Written fresh (twentieth chat). The problems are our own, each with a full written proof; every inequality was checked numerically.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["E3"] = {
  lessons: {
    "E3.1": {
      prereq: ["am-gm", "schurs-inequality", "symmetric-polynomial-strategies"],
      cards: [],
      body: String.raw`The inequalities of E1 and E2 are tools; this chapter is about methods for choosing and applying them. A constrained inequality is made homogeneous so that the standard tools fit; an extremum is located by smoothing a configuration toward the optimum; a symmetric difference is written as a weighted sum of squares; and a three-variable problem is reduced to checking the cases with two variables equal or one zero.

If $a + b + c = 1$, the inequality $ab + bc + ca \le \tfrac13$ is not homogeneous, but replacing $\tfrac13$ by $\tfrac{(a + b + c)^2}{3}$ makes it $3(ab + bc + ca) \le (a + b + c)^2$, which holds for all reals. If $a + b = s$ is fixed, the product $ab$ is largest at $a = b$, since $\left(\tfrac s2\right)^2 - ab = \left(\tfrac{a - b}{2}\right)^2$: replacing two unequal variables by their average improves a product.

The lessons are homogenizing and smoothing (E3.2), and sums of squares and the uvw method (E3.3). The Summary (E3.4) collects the strategies.`,
      exercises: [
        { q: String.raw`Positive $a$, $b$, $c$ satisfy $a + b + c = 1$. Prove that $ab + bc + ca \le \tfrac13$.`,
          solution: String.raw`Homogenize: the claim is $ab + bc + ca \le \tfrac{(a + b + c)^2}{3}$, that is, $3(ab + bc + ca) \le a^2 + b^2 + c^2 + 2(ab + bc + ca)$, or $ab + bc + ca \le a^2 + b^2 + c^2$, which holds by E1.1.` },
        { q: String.raw`Prove that if $a + b = s$, then $ab \le \tfrac{s^2}{4}$, with equality exactly when $a = b$.`,
          solution: String.raw`$\tfrac{s^2}{4} - ab = \tfrac{(a + b)^2 - 4ab}{4} = \tfrac{(a - b)^2}{4} \ge 0$, with equality exactly when $a = b$.` }
      ],
      problems: []
    },
    "E3.2": {
      prereq: ["am-gm", "cauchy-schwarz"],
      cards: ["homogenization", "smoothing-method"],
      body: String.raw`If $a + b + c = 3$, why is $a^2 + b^2 + c^2 \ge 3$? With the same constraint and nonnegative variables, why is $abc \le 1$, proved without AM-GM? A constraint is a resource: it can be used to make the inequality homogeneous, or to move the variables while keeping it.

[[homogenization|Homogenization]] uses a constraint $g = c$ to give every term the same degree. Replace a constant by a power of $\tfrac gc$: with $a + b + c = 3$, the $3$ on the right of $a^2 + b^2 + c^2 \ge 3$ is $3 \cdot 1 = 3\left(\tfrac{a + b + c}{3}\right)^2$, so the claim becomes $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3}$, true for all reals by Cauchy-Schwarz. A homogeneous inequality is unchanged by scaling the variables, so a convenient normalization, such as $a + b + c = 1$ or $abc = 1$, can be imposed afterward, or Muirhead and AM-GM applied directly.

[[smoothing-method|Smoothing]] proves where an extremum is by improving every other configuration. If a configuration that is not the expected optimum can always be changed, keeping the constraint, to one that is better, then the optimum is the expected one, provided the changes reach it. With $a + b + c = 3$ and $abc$ to be maximized, suppose not all three are $1$; then one, say $a$, is above $1$ and another, $b$, below. Replace $a$ and $b$ by $1$ and $a + b - 1$: the sum is unchanged, and the product of the pair changes from $ab$ to $a + b - 1$, an increase of $(a - 1)(1 - b) \ge 0$. One step fixes a variable at $1$, and a second step fixes the others, so $abc \le 1 \cdot 1 \cdot 1$. Moving two variables to their average is the other common step, and it needs a limit argument unless it reaches the optimum in finitely many moves, as the step above does.

Homogenize with the constraint, and when equality is at all variables equal, smooth by moves that keep the constraint and improve the quantity. The next lesson writes differences as squares.`,
      related: [
        { card: "muirheads-inequality", note: String.raw`a tool for homogeneous symmetric inequalities (E1.3).` },
        { card: "karamata-inequality", note: String.raw`the majorization behind many smoothing steps (E2.3).` }
      ],
      exercises: [
        { q: String.raw`Real numbers $a$, $b$, $c$ satisfy $a + b + c = 3$. Prove that $a^2 + b^2 + c^2 \ge 3$.`,
          solution: String.raw`Homogenize: the claim is $a^2 + b^2 + c^2 \ge \tfrac{(a + b + c)^2}{3}$, which is Cauchy-Schwarz, $(a^2 + b^2 + c^2)(1 + 1 + 1) \ge (a + b + c)^2$.` },
        { q: String.raw`Nonnegative $a$, $b$, $c$ satisfy $a + b + c = 3$. Prove, by smoothing, that $abc \le 1$.`,
          solution: String.raw`If $a = b = c = 1$ the product is $1$. Otherwise some variable, say $a$, exceeds $1$ and another, $b$, is below $1$. Replacing them by $1$ and $a + b - 1 \ge 0$ keeps the sum and changes the product by $c[(a + b - 1) - ab] = c(a - 1)(1 - b) \ge 0$. After this step one variable is $1$ and the other two add to $2$; if they are not both $1$, one is above and one below, and the same step makes all three $1$. Each step did not decrease the product, so $abc \le 1$.` },
        { q: String.raw`Prove that $\tfrac{a^2 + b^2 + c^2}{3} \ge \left(\tfrac{a + b + c}{3}\right)^2$, and explain why it implies $a^2 + b^2 + c^2 \ge 3$ whenever $a + b + c = 3$.`,
          solution: String.raw`Multiplying by $9$, the claim is $3(a^2 + b^2 + c^2) \ge (a + b + c)^2$, which is $(a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$ after expanding. With $a + b + c = 3$ the right side is $1$, so $a^2 + b^2 + c^2 \ge 3$: the constrained inequality is the homogeneous one evaluated on the constraint.` }
      ],
      problems: []
    },
    "E3.3": {
      prereq: ["schurs-inequality", "symmetric-polynomial-strategies", "vietas-general"],
      cards: ["sos-method", "uvw-method"],
      body: String.raw`How is $a^3 + b^3 + c^3 - 3abc \ge 0$ seen at a glance for nonnegative variables? For $a, b, c \ge 0$ with $a + b + c = 3$, what is the largest value of $ab + bc + ca - abc$? Two methods for symmetric expressions in three variables.

[[sos-method|The SOS method]] writes the difference of the two sides as $S_a(b - c)^2 + S_b(c - a)^2 + S_c(a - b)^2$ and checks the signs of the coefficients. A symmetric expression that vanishes when $a = b = c$ can usually be written this way. The simplest cases are $a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12[(a - b)^2 + (b - c)^2 + (c - a)^2]$ and $a^3 + b^3 + c^3 - 3abc = \tfrac12(a + b + c)[(a - b)^2 + (b - c)^2 + (c - a)^2]$, which is at least $0$ for nonnegative variables. When some $S$ is negative, the method continues with an ordering $a \ge b \ge c$ and the inequality $(a - c)^2 \ge (a - b)^2 + (b - c)^2$ to absorb it.

[[uvw-method|The uvw method]] uses the fact that, for fixed $p = a + b + c$ and $q = ab + bc + ca$, the product $r = abc$ ranges over an interval, and its ends occur when two variables are equal or one is zero. The reason is that $a$, $b$, $c$ are the roots of $t^3 - pt^2 + qt - r$, and as $r$ moves the cubic keeps three nonnegative real roots until two of them meet or one reaches $0$. So an expression that is linear in $r$ for fixed $p$ and $q$ takes its extreme values in those cases, and the problem reduces to one variable. For $ab + bc + ca - abc = q - r$ with $p = 3$: if $c = 0$, it is $ab \le \tfrac94$; if $b = c = t$ and $a = 3 - 2t$, it is $2t^3 - 6t^2 + 6t$, increasing on $[0, \tfrac32]$, largest at $t = \tfrac32$, where it is again $\tfrac94$. So the maximum is $\tfrac94$, at $(\tfrac32, \tfrac32, 0)$.

Write a symmetric difference as weighted squared differences and check the weights, or fix $p$ and $q$ and check the cases of two equal variables and of a zero. The Summary follows.`,
      related: [
        { card: "schurs-inequality", note: String.raw`an inequality whose equality cases are those of uvw (E1.2).` },
        { card: "vietas-general", note: String.raw`$a$, $b$, $c$ as the roots of a cubic with coefficients $p$, $q$, $r$.` },
        { card: "resultant-discriminant", note: String.raw`the discriminant that vanishes when two roots meet (E4.3).` }
      ],
      exercises: [
        { q: String.raw`Prove that $a^3 + b^3 + c^3 - 3abc = \tfrac12(a + b + c)\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$, and deduce that $a^3 + b^3 + c^3 \ge 3abc$ for nonnegative $a$, $b$, $c$.`,
          solution: String.raw`The factorization $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$ holds, and the second factor is $\tfrac12[(a - b)^2 + (b - c)^2 + (c - a)^2]$. For nonnegative variables both factors are at least $0$.` },
        { q: String.raw`Nonnegative $a$, $b$, $c$ satisfy $a + b + c = 3$. Prove that $ab + bc + ca - abc \le \tfrac94$.`,
          solution: String.raw`For fixed $q$, the expression $q - r$ is largest when $r$ is smallest, which by the uvw method happens with a zero or two equal variables. If $c = 0$: $ab \le \left(\tfrac{a + b}{2}\right)^2 = \tfrac94$. If $b = c = t$, $a = 3 - 2t$ with $0 \le t \le \tfrac32$: the expression is $2t(3 - 2t) + t^2 - t^2(3 - 2t) = 2t^3 - 6t^2 + 6t$, whose derivative $6(t - 1)^2 \ge 0$ shows it increases, to $\tfrac94$ at $t = \tfrac32$. So the maximum is $\tfrac94$.` },
        { q: String.raw`Write $a^2 + b^2 + c^2 - ab - bc - ca$ in SOS form and find when it equals $0$.`,
          solution: String.raw`It is $\tfrac12[(a - b)^2 + (b - c)^2 + (c - a)^2]$, with all three coefficients $\tfrac12 \gt 0$. It is $0$ exactly when $a = b = c$.` }
      ],
      problems: []
    },
    "E3.4": {
      prereq: ["homogenization", "smoothing-method", "sos-method", "uvw-method"],
      cards: [],
      body: String.raw`[[homogenization|Homogenization]] uses a constraint to make every term the same degree, and [[smoothing-method|smoothing]] improves any configuration toward the expected optimum.

[[sos-method|The SOS method]] writes a symmetric difference as weighted squared differences, and [[uvw-method|the uvw method]] reduces a problem linear in $abc$ to the cases of two equal variables or a zero.`,
      strategies: [
        String.raw`Use the constraint to homogenize, then apply the homogeneous tools.`,
        String.raw`After homogenizing, normalize however is convenient.`,
        String.raw`Smooth with moves that keep the constraint and reach the optimum in finitely many steps.`,
        String.raw`For a symmetric difference that vanishes at $a = b = c$, try SOS.`,
        String.raw`If an expression is linear in $abc$ for fixed $a + b + c$ and $ab + bc + ca$, check two equal variables and one zero.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Positive $a$, $b$, $c$ satisfy $abc = 1$. Prove that $a + b + c \ge 3$.`,
        solution: String.raw`By AM-GM, $\tfrac{a + b + c}{3} \ge \sqrt[3]{abc} = 1$. (Homogenized, the claim is $a + b + c \ge 3\sqrt[3]{abc}$, which is AM-GM itself.)` },
      { q: String.raw`Prove that for real $a$, $b$, $c$, $(a + b + c)^2 \le 3(a^2 + b^2 + c^2)$, by writing the difference as a sum of squares.`,
        solution: String.raw`$3(a^2 + b^2 + c^2) - (a + b + c)^2 = 2(a^2 + b^2 + c^2) - 2(ab + bc + ca) = (a - b)^2 + (b - c)^2 + (c - a)^2 \ge 0$.` },
      { q: String.raw`Nonnegative $a$, $b$ satisfy $a + b = 2$. Prove that $a^2b^2(a^2 + b^2) \le 2$.`,
        solution: String.raw`Let $t = ab \le 1$. Then $a^2 + b^2 = 4 - 2t$, and the expression is $t^2(4 - 2t) = 4t^2 - 2t^3$. Its derivative $8t - 6t^2 = 2t(4 - 3t) \ge 0$ on $[0, 1]$, so it is largest at $t = 1$: $4 - 2 = 2$.` }
    ],
    problems: []
  },
  challenge: {
    exercises: [
      { q: String.raw`Nonnegative $a$, $b$, $c$ satisfy $a + b + c = 1$. Prove that $ab + bc + ca - 2abc \le \tfrac{7}{27}$.`,
        solution: String.raw`The expression is $q - 2r$, linear in $r$, so by uvw its maximum occurs with a zero or two equal variables. If $c = 0$: $ab \le \tfrac14 \lt \tfrac{7}{27}$. If $b = c = t$, $a = 1 - 2t$, $0 \le t \le \tfrac12$: the expression is $2t(1 - 2t) + t^2 - 2t^2(1 - 2t) = 4t^3 - 5t^2 + 2t$, with derivative $12t^2 - 10t + 2 = 2(3t - 1)(2t - 1)$. On $[0, \tfrac12]$ it rises to $t = \tfrac13$ and then falls, so the maximum is at $t = \tfrac13$: $\tfrac{4}{27} - \tfrac59 + \tfrac23 = \tfrac{7}{27}$.` },
      { q: String.raw`Prove that for nonnegative $a$, $b$, $c$, $a^3 + b^3 + c^3 + 6abc \ge (a + b + c)(ab + bc + ca)$.`,
        solution: String.raw`In terms of $p$, $q$, $r$: $a^3 + b^3 + c^3 = p^3 - 3pq + 3r$, so the difference of the two sides is $p^3 - 3pq + 3r + 6r - pq = p^3 - 4pq + 9r$, which is at least $0$ by Schur's inequality (E1.2). Equality holds at $a = b = c$ and at two equal variables with the third $0$.` },
      { q: String.raw`Nonnegative $a$, $b$, $c$ satisfy $a + b + c = 3$. Prove that $a^2b + b^2c + c^2a + abc \le 4$.`,
        solution: String.raw`The expression is cyclic, and one of the three numbers lies between the other two; relabeling cyclically, let it be $b$. Then $a^2b + b^2c + c^2a + abc - b(a + c)^2 = c(b - a)(b - c) \le 0$, since $b - a$ and $b - c$ have opposite signs (or one is $0$). So the expression is at most $b(a + c)^2 = 4 \cdot b \cdot \tfrac{a + c}{2} \cdot \tfrac{a + c}{2} \le 4\left(\tfrac{b + (a + c)}{3}\right)^3 = 4$, by AM-GM. Equality holds at $a = b = c = 1$, and at $(2, 1, 0)$ and its cyclic shifts, where the expression is $4 + 0 + 0 + 0$.` }
    ],
    problems: []
  }
};
