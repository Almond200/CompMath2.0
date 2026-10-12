// Extended detail-page write-ups for Proof Methods, keyed by card id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"direct-proof": String.raw`
## When to use
The claim reads "if $P$, then $Q$", and both $P$ and $Q$ can be written in concrete terms: an integer is even, one number divides another, a quadrilateral is cyclic, an expression equals another. Try a direct proof first; switch to another method only when the forward chain gets stuck.

## How
1. Replace every word in the hypotheses by its definition: "$n$ is odd" becomes $n = 2k + 1$, "$a \mid b$" becomes $b = ak$.
2. Write the conclusion in the same terms, so you know exactly what form you are aiming for.
3. Work forward from the hypotheses and backward from the goal ("it suffices to show that ..."), until the two chains meet.
4. Write the final proof in the forward direction only, each step justified by a hypothesis, a definition, or a known result.

If $a$ and $b$ are odd, write $a = 2m + 1$ and $b = 2n + 1$; then $ab = 4mn + 2m + 2n + 1 = 2(2mn + m + n) + 1$, which is odd by definition.

## Why it works
Each step is an implication, and implications chain: if $P \Rightarrow R$ and $R \Rightarrow Q$, then $P \Rightarrow Q$. Working backward is only scratch work. A backward step "$Q$ follows from $R$" is safe, while a step that goes from $Q$ to $R$ proves nothing unless it can be reversed.

## Formulas it uses
No particular formula is needed; the proof rests on definitions and on results already known.

## Common traps
- Starting from the conclusion and reaching something true, such as squaring both sides of an inequality and arriving at $0 \le (a - b)^2$. That proves the claim only if every step reverses, so write it forward.
- Checking a few numbers instead of the general case.
- Using one letter for two different quantities: if $a$ and $b$ are even, write $a = 2k$ and $b = 2l$, not $a = b = 2k$.

## Contest profile
The default shape of an olympiad solution. In answer-only contests it is the silent justification behind each step rather than something written out.
`,

"proof-by-contradiction": String.raw`
## When to use
The claim says something does not exist, cannot happen, or never ends: $\sqrt{2}$ is irrational, an equation has no integer solutions, there are infinitely many primes of some kind. Assuming the opposite gives an object (a fraction, a solution, a finite list) that a direct proof would not have. When the claim is an implication with structure to start from, a direct proof is cleaner, and contradiction earns its place when the assumption is all there is to start from.

## How
1. Write the negation exactly. Negate the quantifiers: "every $x$ has property $A$" becomes "some $x$ lacks $A$", and "there is no $x$" becomes "there is an $x$".
2. Name what the negation gives you, and choose it as conveniently as possible: a fraction in lowest terms, the smallest solution, the complete finite list.
3. Derive consequences until one contradicts a hypothesis, a known fact, or another consequence.
4. Conclude that the assumption was false, so the claim holds.

For $\sqrt{2}$: suppose $\sqrt{2} = \frac{p}{q}$ in lowest terms. Then $p^2 = 2q^2$, so $p$ is even; writing $p = 2r$ gives $q^2 = 2r^2$, so $q$ is even too, and the fraction was not in lowest terms.

## Why it works
A statement and its negation cannot both be true, and one of them is. If the negation leads by valid steps to something false, the negation is false, so the statement is true.

## Formulas it uses
No particular formula is needed; the contradiction usually comes from a definition or a basic fact such as parity or divisibility.

## Common traps
- Negating incorrectly: the negation of "all of them are even" is "at least one is odd", not "all of them are odd".
- Reaching a "contradiction" through an arithmetic mistake. Contradiction proofs hide errors, because a wrong step also ends in something false, so check each step.
- Writing a contradiction proof that never uses the assumption. That is a direct proof in disguise; rewrite it directly.
- Confusing it with the contrapositive: a contradiction proof may reach any impossibility, while a contrapositive proof aims at one specific target, the negated hypothesis.

## Contest profile
Common in olympiad number theory and combinatorics, especially for irrationality, nonexistence, and infinitely-many claims. Answer-only contests use it silently when ruling out cases.
`,

"contrapositive": String.raw`
## When to use
The conclusion $Q$ is a negative or a primality-type statement ("is prime", "is not a perfect square", "is irrational"), while its negation is a positive statement with structure: "is composite" means $n = ab$, "is a perfect square" means $n = m^2$. Proving the contrapositive lets you start from that structure. Its close relative, [[proof-by-contradiction|proof by contradiction]], assumes $P$ and not $Q$ and looks for any contradiction at all, where the contrapositive aims at not $P$ exactly.

## How
1. Identify $P$ and $Q$ exactly.
2. Negate both, taking care with "and", "or", and quantifiers: not ($A$ and $B$) is (not $A$) or (not $B$).
3. Prove "not $Q$ implies not $P$" by a [[direct-proof|direct proof]].
4. State that this is the contrapositive, so the original implication holds.

To show that if $n^2$ is even then $n$ is even, prove the contrapositive: if $n = 2k + 1$ is odd, then $n^2 = 4k^2 + 4k + 1$ is odd.

## Why it works
"$P \Rightarrow Q$" is false in exactly one situation, $P$ true and $Q$ false, and so is "$\neg Q \Rightarrow \neg P$". Two statements that are false in the same situations are the same statement.

## Formulas it uses
No particular formula is needed; the work is a direct proof of the switched statement.

## Common traps
- Proving the converse "$Q \Rightarrow P$" or the inverse "$\neg P \Rightarrow \neg Q$", neither of which is equivalent to the original.
- Negating a compound statement incorrectly, especially "or" and "for all".
- Forgetting edge cases that the negation includes: "$n$ is not prime" includes $n = 1$.

## Contest profile
An olympiad proof technique, frequent in number theory statements of the form "if ... is prime, then ...". In answer-only contests it appears only as reasoning behind a step.
`,

"proof-by-cases": String.raw`
## When to use
One quantity controls the argument: the parity of $n$, its residue modulo a small number, the sign of an expression, the order of the variables, or which region a point is in. Within each value of that quantity, the claim becomes routine. For counting with cases, see [[casework-method|Casework]]; here the aim is to prove a statement.

## How
1. Choose the split variable whose value changes the argument, such as $n \bmod m$ or the sign of $x - y$.
2. List the cases and check that they cover every possibility, including boundaries such as $0$, equality, and small $n$.
3. Prove the claim in each case.
4. Merge cases that share an argument, and use symmetry to skip cases that are relabelings of others.

Every square is $0$ or $1 \bmod 4$: if $n = 2k$ then $n^2 = 4k^2$, and if $n = 2k + 1$ then $n^2 = 4(k^2 + k) + 1$.

## Why it works
If one of $A_1, \ldots, A_k$ must hold, and each one implies $Q$, then $Q$ holds whichever one occurs.

## Formulas it uses
- [[fermats-little-theorem]]: an alternative to residue cases modulo a prime $p$, since $n^p \equiv n \pmod p$ settles all $p$ cases at once.

## Common traps
- Missing a case: zero, negative values, equality between variables, or the smallest $n$.
- Choosing a split that does not simplify anything; if every case needs the same hard argument, the split is wrong.
- Too many cases when a factorization or a congruence would cover them together.

## Contest profile
Appears at every level. On AMC and AIME it shows up as checking residues or parities; in olympiad solutions it is the structure of many number theory and inequality proofs.
`,

"wlog-symmetry": String.raw`
## When to use
The statement is symmetric in some variables or objects: swapping $a$ and $b$, reflecting a figure, or scaling every length changes neither the hypotheses nor the conclusion. Then you may order the variables, place a point at the origin, or set a length to $1$. A statement that singles out one variable allows only the symmetries it has, and assuming an order it does not permit is the classic error.

## How
1. Find the symmetry. Check that both the hypotheses and the conclusion are unchanged by it.
2. Pick the normalization it allows: order the variables, choose which object is largest, put a vertex at the origin, or scale a homogeneous statement so that a sum is $1$.
3. Say why it is free, in one phrase: "since the statement is symmetric in $a$, $b$, $c$".
4. Prove the special case, now with the extra fact available.

In a claim symmetric in the side lengths $a$, $b$, $c$, assuming $a \le b \le c$ reduces the three triangle inequalities to the single inequality $a + b \gt c$.

## Why it works
Any other case turns into the chosen one by a relabeling, and the relabeling leaves the statement unchanged. So the proof of the chosen case, read with the labels changed, proves every other case.

## Formulas it uses
- [[schurs-inequality]]: its standard proof, shown in the example, orders the variables without loss of generality.

## Common traps
- Ordering all the variables when the statement is only cyclic. For a cyclic expression such as $a^2b + b^2c + c^2a$ you may assume $a$ is the largest, but not $a \ge b \ge c$.
- Normalizing two things that cannot both be fixed, such as scaling so that $a = 1$ and also $a + b + c = 1$.
- Scaling a statement that is not homogeneous.

## Contest profile
A standard step in olympiad inequalities, geometry, and combinatorics. In answer-only contests it appears as an assumption on the order of the variables before casework.
`,

"proving-both-directions": String.raw`
## When to use
The claim says "$P$ if and only if $Q$", "$P$ is necessary and sufficient for $Q$", or "$A = B$" for two sets. A "find all" problem is the same structure: show that every solution has the stated form, and that every number of that form is a solution. A one-way implication needs only the stated direction, and checking the converse is wasted work.

## How
1. Write the two directions as separate claims. "$P$ only if $Q$" is $P \Rightarrow Q$; "$P$ if $Q$" is $Q \Rightarrow P$.
2. Prove each one, often by different methods; one direction is frequently an easy check and the other the real work.
3. For sets, take an arbitrary element of $A$ and show it lies in $B$, then the reverse.
4. For a chain of equivalences, either check that every step reverses, or prove a cycle $P \Rightarrow Q \Rightarrow R \Rightarrow P$.

In a "find all" problem with answer $n = 2$ and $n = 3$, one direction shows that any solution is $2$ or $3$, and the other checks that $2$ and $3$ work.

## Why it works
"$P \iff Q$" means exactly that each implies the other. Two sets are equal exactly when each contains the other.

## Formulas it uses
- [[number-of-divisors]]: gives a second proof of the example, since $\tau(n) = \prod (e_i + 1)$ is odd exactly when every exponent $e_i$ is even.

## Common traps
- Proving one direction twice, once as stated and once restated as its contrapositive.
- Writing a chain of $\iff$ where a step only goes one way, such as squaring both sides or dividing by a quantity that may be $0$.
- In "find all" problems, deriving the candidates but never checking that they work.

## Contest profile
An olympiad structure: characterization statements, "find all" problems, and set equalities. Answer-only contests hide it, but a "find all" answer still depends on both directions.
`,

"proving-uniqueness": String.raw`
## When to use
The claim says "there is exactly one", "the only solution", or "is determined by". Functional equations, systems of equations, and division with remainder all have this shape. Existence is a separate proof: showing that any two solutions coincide does not show that one exists.

## How
1. Existence: construct the object, or show one must exist.
2. Uniqueness, two-object form: suppose $x$ and $y$ both have the property, use it for each, and subtract, divide, or compare until $x = y$.
3. Uniqueness, derivation form: assume an object has the property and derive what it must be. This gives the only candidate.
4. In the derivation form, check that the candidate really has the property; that check is the existence half.

The remainder on division by $m$ is unique: if $a = qm + r = q'm + r'$ with $0 \le r, r' \lt m$, then $m$ divides $r - r'$, which lies strictly between $-m$ and $m$, so $r = r'$.

## Why it works
At most one means any two coincide, and at least one means some object exists. Together they say exactly one.

## Formulas it uses
No particular formula is needed; the argument uses the defining property itself.

## Common traps
- Deriving a formula from the property and stopping there; that shows at most one, and the formula still has to be checked.
- Showing uniqueness only within a guessed family, such as linear functions, when the claim is about all functions.
- Assuming $x \ne y$ at the start and then deriving $x = y$ without noticing that this is a contradiction proof, which is fine but should be said.

## Contest profile
Mostly olympiad, especially functional equations and "find all" problems. In answer-only contests uniqueness is assumed rather than proved, which is why a guessed function can give the right answer.
`,

"disproof-by-counterexample": String.raw`
## When to use
A statement claims something for all integers, all triangles, or all functions, and you are asked to prove or disprove it, or to pick which of several statements is false. Also use it on your own conjectures before trying to prove them.

## How
1. Test small and extreme cases: $0$, $1$, negative values, equal values, degenerate figures.
2. Look at the reason the claim seems true and find where it could fail: a factor that could equal $1$, a denominator that could be $0$, a pattern that holds only for small $n$.
3. Check that the candidate satisfies every hypothesis.
4. Show by direct computation that the conclusion fails.

The polynomial $n^2 + n + 41$ is prime for $n = 0, 1, \ldots, 39$, yet $n = 40$ gives $1600 + 40 + 41 = 1681 = 41^2$.

## Why it works
A statement about all objects is false exactly when at least one object fails it, so exhibiting one such object settles the question.

## Formulas it uses
- [[multiplicative-order]]: in the example, the order of $2$ modulo a prime factor $q$ of $2^{11} - 1$ is $11$, which forces $q \equiv 1 \pmod{11}$ and narrows the search for a factor.

## Common traps
- A counterexample that violates a hypothesis, which disproves nothing.
- Trusting a pattern from small cases: the numbers of regions cut from a circle by chords through $n$ points run $1, 2, 4, 8, 16$, then $31$.
- Confusing "not always true" with "never true"; a counterexample shows only the first.

## Contest profile
Common in AMC "which of the following must be true" questions, where each wrong option has a counterexample, and in olympiad "prove or disprove" problems.
`,

"induction": String.raw`
## When to use
The claim is about every positive integer $n$ (a sum formula, a divisibility, a tiling, a statement about $n$ points), and a size-$(n + 1)$ instance contains a size-$n$ instance with a small, controllable difference. A claim whose size-$(n + 1)$ case does not contain a size-$n$ case needs another route, and strong induction is the same method with more hypotheses.

## How
1. State $P(n)$ precisely, as a statement that is true or false for each $n$.
2. Base case: check $P(1)$, or the first value the claim covers.
3. Inductive hypothesis: assume $P(n)$ for some fixed $n$ at or above the base.
4. Inductive step: locate the case $n$ inside the case $n + 1$, apply the hypothesis to it, and handle the difference.
5. Conclude that $P(n)$ holds for every $n$ from the base on.

For $1 + 3 + \cdots + (2n - 1) = n^2$: adding the next odd number gives $n^2 + (2n + 1) = (n + 1)^2$.

## Why it works
Suppose some case fails, and let $m$ be the smallest failing value. It is not the base case, so $m - 1$ is at or above the base and does not fail; then the inductive step gives $P(m)$, a contradiction. This uses the fact that every nonempty set of positive integers has a smallest element.

## Formulas it uses
No particular formula is needed; induction is a proof structure, and the step uses whatever the statement is about.

## Common traps
- Skipping the base case, or an inductive step that fails at the smallest value. The "all horses are the same color" argument breaks exactly at the step from $1$ to $2$.
- Assuming $P(n + 1)$ while trying to prove it.
- Inducting on the wrong quantity; try the number of elements, the sum, or the largest value.
- When the step stalls, the statement may need strengthening; see [[strengthening-the-hypothesis|Strengthening the Hypothesis]].

## Contest profile
A basic olympiad tool. Answer-only contests use it implicitly when a pattern from small cases is trusted; induction is what would justify it.
`,

"strong-induction": String.raw`
## When to use
Breaking the case $n$ apart produces pieces of various smaller sizes: a factorization $n = ab$, a split into halves, a recurrence $a_n = a_{n-1} + a_{n-2}$, or a step back by a fixed amount such as $n - 4$. If the case $n$ needs only the case $n - 1$, ordinary induction is enough.

## How
1. State $P(n)$.
2. Count how far back the step reaches. If it uses $P(n - k)$, check $k$ consecutive base cases so that every later case lands on a checked one.
3. Assume $P(m)$ for every $m$ from the base up to $n - 1$.
4. Split the case $n$ into smaller cases, apply the hypothesis to each, and combine.

Every integer $n \ge 2$ is a product of primes: either $n$ is prime, or $n = ab$ with $2 \le a, b \lt n$, and both $a$ and $b$ are products of primes by hypothesis.

## Why it works
Apply ordinary [[induction|induction]] to the statement $Q(n)$: "$P$ holds for every value from the base up to $n$". The strong step is exactly $Q(n - 1) \Rightarrow Q(n)$.

## Formulas it uses
- [[chicken-mcnugget]]: for the example, the largest amount not formed from $4$ and $5$ is $4 \cdot 5 - 4 - 5 = 11$, which is why the base cases start at $12$.

## Common traps
- Too few base cases: a step reaching back $k$ places needs $k$ consecutive checked cases.
- A step that calls on a value below the base, such as splitting $n$ into pieces that can be $0$ or $1$.
- Using strong induction where the step only needs $n - 1$; it is not wrong, but ordinary induction is clearer.

## Contest profile
An olympiad tool, especially for recurrences, factorizations, and games where a move can change the size by various amounts.
`,

"forward-backward-induction": String.raw`
## When to use
The statement is about $n$ numbers or objects, and instances combine naturally into a bigger one: two instances of size $n$ into one of size $2n$, or $k$ groups of size $n$ into one of size $kn$. Going from $n$ to $n + 1$ has no such natural move. Inequalities with equal weights, such as AM-GM, Jensen's Inequality from midpoint convexity, and the power mean inequality, are the standard examples.

## How
1. Base case: prove the smallest case that starts the forward jumps, usually $P(2)$.
2. Forward step: prove a jump that reaches arbitrarily large sizes. Most often this is doubling, $P(n) \Rightarrow P(2n)$: apply $P(n)$ to each half and $P(2)$ to the two results.
3. Backward step: prove $P(n) \Rightarrow P(n - 1)$. Choose the extra $n$th object so that the case $n$ collapses to the case $n - 1$; for means, choose it equal to the mean of the other $n - 1$. Often the same choice jumps down directly: padding $m$ numbers with $N - m$ copies of their mean gives $P(N) \Rightarrow P(m)$ in one step.
4. Conclude: any $m$ lies at or below some covered size, such as a power of $2$, and the backward step walks down to $m$.

Doubling is only the most famous forward jump. Others work the same way:
- multiplying by a fixed $k$, $P(n) \Rightarrow P(kn)$, when $k$ groups combine more naturally than two;
- a product rule, $P(m)$ and $P(n) \Rightarrow P(mn)$: split $mn$ objects into $m$ groups of $n$, apply $P(n)$ inside each group and $P(m)$ across the groups;
- any other jump whose covered sizes grow without bound.

For AM-GM, the product rule started from the bases $P(2)$ and $P(3)$ covers every size $2^a3^b$. Any unbounded set of covered sizes is enough, since the backward step fills in everything below.

## Why it works
The forward step only has to make the set of covered sizes unbounded; it does not matter whether that set is the powers of $2$, the powers of $3$, or the numbers $2^a3^b$. For any $m$ there is a covered size $N \ge m$, and finitely many backward steps go from $N$ down to $m$.

## Formulas it uses
- [[am-gm]]: the classic result proved this way, as in the example.
- [[jensens-inequality]]: for equal weights it follows from midpoint convexity, $f\left(\frac{x + y}{2}\right) \le \frac{f(x) + f(y)}{2}$, by the same doubling and padding steps.

## Common traps
- Proving only the forward step, which covers only the sizes the jumps reach.
- A forward step whose sizes stay bounded, which reaches nothing beyond them.
- A backward step whose extra object changes the quantity being compared; for means, the extra term must equal the mean of the others so that the mean is unchanged.
- Forgetting the base cases that the forward step starts from; a product rule needs a base at each starting size, such as $P(2)$ and $P(3)$.

## Contest profile
An olympiad technique, mostly for equal-weight inequalities and functional inequalities with a doubling or splitting structure. Answer-only contests do not need it, though they use the results it proves.
`,

"strengthening-the-hypothesis": String.raw`
## When to use
You tried [[induction|induction]], and the step fails because the hypothesis is too weak: a bound with a fixed constant (the sum is less than $2$), a claim about one object when the step also needs facts about a neighbor, or a statement about one value when the step needs a whole family.

## How
1. Attempt the plain induction and identify exactly what the step is missing.
2. Strengthen the statement to supply it: replace a constant bound by one that depends on $n$, prove a second claim at the same time, or generalize a fixed number to a variable.
3. Check small cases of the stronger statement, since a strengthening can be false.
4. Prove the stronger statement by induction, then deduce the original from it.

To show $\frac12 + \frac14 + \cdots + \frac{1}{2^n} \lt 1$, prove the exact statement $\frac12 + \cdots + \frac{1}{2^n} = 1 - \frac{1}{2^n}$; adding $\frac{1}{2^{n+1}}$ gives $1 - \frac{1}{2^{n+1}}$ at once.

## Why it works
In the step, the hypothesis is the statement for $n$. A stronger statement gives a stronger hypothesis, so the step has more to work with, and the stronger conclusion still implies the original.

## Formulas it uses
No particular formula is needed; the strengthening is chosen to fit the step.

## Common traps
- Strengthening to a false statement; test small cases first.
- Assuming the strong form but concluding only the weak form in the step, which breaks the chain.
- Strengthening more than necessary, which makes the step harder.

## Contest profile
An olympiad technique for inequalities, sequences, and combinatorial statements that resist a direct induction.
`,

"minimal-counterexample": String.raw`
## When to use
The objects have a size measured by a positive integer (a number, a count of vertices, a sum of entries), and from a failing object you can remove, merge, or reduce something to get a smaller object that still fails. Graph theory and representation statements ("every integer can be written as ...") are typical. Where no smaller failing object can be built, try induction forward instead.

## How
1. Assume a counterexample exists, and choose one of smallest size.
2. Record what minimality gives: every smaller object satisfies the claim.
3. Reduce the counterexample: remove a vertex, subtract a term, divide out a factor. Show the result is a valid object that is smaller.
4. Either the smaller object still fails, contradicting minimality, or its success forces the original to succeed, a contradiction either way.

Every integer $n \ge 2$ has a prime factor: the smallest $n$ without one is not prime, since a prime is its own prime factor, so $n = ab$ with $1 \lt a \lt n$; then $a$ has a prime factor, which also divides $n$.

## Why it works
Every nonempty set of positive integers has a smallest element, so if counterexamples exist, a smallest one exists. Showing that no smallest counterexample can exist therefore shows there are none.

## Formulas it uses
- [[zeckendorf-theorem]]: the example proves the existence half of this theorem.

## Common traps
- The reduced object no longer satisfies the hypotheses, such as removing a vertex and losing a degree condition.
- A size measure that is not a nonnegative integer, so a smallest one need not exist.
- Making the reduced object smaller in one measure but larger in the measure that was minimized.

## Contest profile
An olympiad technique, closely related to [[infinite-descent|infinite descent]] and the [[extremal-principle|extremal principle]]. Answer-only contests rarely need it written out.
`,

"infinite-descent": String.raw`
## When to use
A Diophantine equation, often homogeneous, appears to have no solutions in positive integers, and reducing modulo a small prime forces all the variables to be divisible by it. Another source of descent is a quadratic in one variable whose second root is a smaller positive integer, the idea behind [[vieta-jumping|Vieta jumping]]. An equation known to have a solution is not a descent problem: descent proves there is none, or that the smallest one has some property.

## How
1. Assume a positive-integer solution exists; optionally take one that is minimal in a measure such as $x + y + z$ or $z$.
2. Find the reduction: a congruence forcing a common factor $p$, or a transformation that produces another solution.
3. Check that the new values are again positive integers solving the same equation, and that they are strictly smaller.
4. Conclude: there would be an endless strictly decreasing sequence of positive integers, which is impossible, or the minimal solution was not minimal.

For $\sqrt{2}$: $p^2 = 2q^2$ forces $p = 2r$, and then $q^2 = 2r^2$ is a solution with $q \lt p$.

## Why it works
Any strictly decreasing sequence of positive integers is finite, because it starts at some value and loses at least $1$ each time. So a procedure that always produces a smaller positive solution shows there was no solution to begin with.

## Formulas it uses
- [[squares-mod-small]]: in the example, squares are $0$ or $1 \bmod 3$, which forces $3$ to divide both $x$ and $y$.

## Common traps
- A "smaller" solution that is $0$ or negative, which may be allowed by the equation and breaks the descent.
- Forgetting to check that the new values satisfy the same equation, not a similar one.
- A measure that does not strictly decrease, such as one variable shrinking while another grows.

## Contest profile
A classic olympiad number theory technique for proving that equations have no solutions, often combined with a congruence. AIME problems occasionally use the idea when finding all solutions.
`,

"proof-by-construction": String.raw`
## When to use
The problem asks to show that something exists, or that a maximum or minimum is attained. In "find the largest" problems, construction is half of the answer: a bound shows nothing larger works, and a construction shows the bound is reached. A claim about every object cannot be proved by one construction, and needs an argument that covers them all.

## How
1. Solve small cases by hand to see what working objects look like.
2. Guess a family with a parameter: arithmetic progressions, powers of $2$, alternating colorings, factorials, or a recursive rule that grows one valid object into a bigger one.
3. Write the construction for general $n$.
4. Verify every condition, including the smallest cases and any distinctness requirement.

For $n$ consecutive composite numbers, take $(n + 1)! + 2, (n + 1)! + 3, \ldots, (n + 1)! + (n + 1)$: the term $(n + 1)! + k$ is divisible by $k$ and larger than $k$.

## Why it works
A single object with the property proves that one exists. For a claim about every $n$, a rule that produces a valid object for each $n$ proves every case at once.

## Formulas it uses
No particular formula is needed; each construction is checked against the problem's own conditions.

## Common traps
- Verifying only some of the conditions, often forgetting that the objects must be distinct or positive.
- Checking a few values of $n$ and calling the construction general.
- In optimization problems, giving only the bound or only the construction; both are needed.
- Missing the cases where no object exists, which the construction should explain.

## Contest profile
Central to olympiad combinatorics and number theory, and to the "achieve the bound" half of AIME optimization problems.
`,

"pigeonhole-argument": String.raw`
## When to use
The claim is that among enough objects, two must be related in a specific way: their difference is divisible by $m$, they are close together, they have the same color, or they repeat a state. The number of objects is just above some natural count, which hints at how many boxes to use.

## How
1. Decide what two objects in one box should give: a difference divisible by $m$, a distance below $d$, a repeated state.
2. Design boxes with that property: residue classes, small subregions, pairs of complementary values.
3. Count objects and boxes; for a stronger conclusion, use the general form that $n$ objects in $k$ boxes put at least $\lceil n/k \rceil$ in one box.
4. Read the conclusion off the two objects in the shared box.

Among any $n + 1$ integers, two leave the same remainder modulo $n$, so their difference is divisible by $n$.

## Why it works
If every box held at most $\lceil n/k \rceil - 1$ objects, there would be at most $k\left(\lceil n/k \rceil - 1\right) \lt n$ objects in total.

## Formulas it uses
- [[pigeonhole]]: the principle itself, in its basic and general forms.

## Common traps
- Boxes that do not yield the conclusion when two objects share one.
- Off-by-one errors: the conclusion needs strictly more objects than boxes.
- Using the basic form when the general form gives the needed count.
- Overlooking that the boxes must cover every possible object.

## Contest profile
A staple of olympiad combinatorics and number theory. On AMC and AIME it appears as "what is the least number that guarantees ..." questions.
`,

"discrete-intermediate-value": String.raw`
## When to use
You need a configuration where some count equals an exact value, and there is a natural sequence of configurations in which the count changes by $0$ or $1$ at each step: a window sliding one place, a set gaining one element, a game advancing one move. If the count can jump by more than one between steps, the exact value may be skipped, and the argument does not apply.

## How
1. Choose a sequence of configurations from one where the quantity is at most the target to one where it is at least the target.
2. Check that each step changes the quantity by at most $1$.
3. Conclude that the target value occurs at some step.

Sliding a window of fixed length one place along a row of coins changes its count of heads by $-1$, $0$, or $+1$: one coin leaves and one enters.

## Why it works
Say $f(0) \lt t \le f(n)$, and let $k$ be the last index with $f(k) \lt t$. Then $f(k) \le t - 1$, so $f(k + 1) \le t$, and $f(k + 1) \ge t$ because $k$ was the last index below $t$. So $f(k + 1) = t$.

## Formulas it uses
No particular formula is needed; the argument uses only that the quantity is an integer moving in steps of at most $1$.

## Common traps
- Steps that can change the quantity by $2$ or more, which allows skipping.
- Quantities that are not integers.
- Endpoints that do not straddle the target; one end must be at most the target and the other at least.

## Contest profile
An olympiad combinatorics idea, often hidden inside a problem about windows, partial sums, or tournaments. It also justifies some AIME arguments about which values are attainable.
`

});
