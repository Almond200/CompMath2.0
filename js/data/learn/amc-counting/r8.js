// Learn, AMC Counting & Probability, chapter R8: advanced counting (CONVENTIONS §14). Part: Advanced topics.
// Bounded models, orbit averaging, formal coefficients, coloring proofs and normal-play game assumptions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R8"] = {
  lessons: {
    "R8.1": {
      prereq: ["stars-and-bars", "inclusion-exclusion", "binomial-theorem", "backward-induction"],
      cards: [],
      body: String.raw`A restriction can change not only the count but also the way objects must be described. Distributing identical objects with upper bounds needs a correction for overlapping violations. Counting colorings up to rotations identifies several descriptions of one object, sometimes in unequal numbers. Games require a rule about legal moves and winning, rather than just a count of positions.

Consider $x+y+z=10$ in nonnegative integers with each variable at most four. Without the caps there are $\binom{12}{2}=66$ solutions. A specified variable at least five leaves five units after shifting, giving $\binom72=21$ solutions. Subtracting these three violations removes sixty-three descriptions, but a solution with two variables at least five was removed twice. Each of the three pairs has one such solution, so inclusion-exclusion gives $66-63+3=6$.

For a square whose vertices are black or white, there are sixteen labeled colorings. Up to rotation, the classes are all white, all black, one black, three black, two adjacent black and two opposite black: six classes. Division by four would give four, which is wrong because some colorings have fewer than four distinct rotations. The fixed-coloring average will count these unequal symmetry classes correctly.

Products organize another kind of counting. Choosing three people from two disjoint groups of five gives $\sum_k\binom5k\binom5{3-k}$ choices when split by how many come from the first group. Counting the same committees without the split gives $\binom{10}{3}=120$. Generating functions extend this principle: record the size of each choice by an exponent, so multiplication records combined sizes.

The chapter develops bounded distributions, symmetry classes, coefficient methods, graph colorings and games. In every case the model matters: labeled versus unlabeled positions, rotations versus reflections, ordered versus unordered choices, and deterministic strategy versus independent chance. The proofs will explain which distinctions each formula preserves.`,
      exercises: [
        { q: String.raw`How many ordered triples of nonnegative integers $(x, y, z)$ with $x + y + z = 10$ have each of $x$, $y$, $z$ at most $4$?`, answer: "6",
          solution: String.raw`Without caps, stars and bars gives $\binom{12}{2}=66$. If a specified coordinate is at least five, subtract five from it, leaving five units to distribute: $\binom72=21$ solutions. There are three choices of that coordinate. If two specified coordinates are at least five, the only solution gives each five and the third zero; there are three such intersections. Three violations are impossible. Inclusion-exclusion therefore gives $66-3\cdot21+3\cdot1=6$.` },
        { q: String.raw`The four corners of a square are each colored black or white. Two colorings count as the same if a rotation of the square turns one into the other. How many different colorings are there?`, answer: "6",
          solution: String.raw`Classify by the number of black vertices. Counts zero, one, three and four each give one rotation class. With two black vertices there are two classes, adjacent and opposite, and rotation cannot change adjacency. Every coloring belongs to exactly one of these classes. Hence the total is $1+1+2+1+1=6$. Reflections are not needed for these identifications.` },
        { q: String.raw`What is $\binom50\binom53 + \binom51\binom52 + \binom52\binom51 + \binom53\binom50$?`, answer: "120",
          solution: String.raw`Choose three people from two disjoint groups of five. A committee with $k$ people from the first group has $\binom5k\binom5{3-k}$ choices. The four displayed cases are disjoint and include every three-person committee, so their sum is $\binom{10}{3}=120$. The individual terms are ten, fifty, fifty and ten, confirming the sum.` }
      ],
      problems: [
        "2007 AMC 12B, Problem 16",
        "2011 AMC 10A, Problem 22"
      ]
    },
    "R8.2": {
      prereq: ["stars-and-bars", "inclusion-exclusion", "uniform-overcount"],
      cards: ["stars-bars-upper-bound", "burnsides-lemma"],
      body: String.raw`Upper bounds invalidate an unrestricted stars-and-bars count because it includes shares that are too large. Let $x_1+\cdots+x_k=N$ with integer bounds $a_i\le x_i\le b_i$, where $k\ge1$ and $a_i\le b_i$. First put $y_i=x_i-a_i$. Their remaining total is $M=N-\sum_i a_i$, and their caps are $c_i=b_i-a_i$. If $M\lt0$ or $M\gt\sum_i c_i$, no distribution is possible.

For a subset $S$ of coordinates required to violate their caps, subtract $c_i+1$ from each $y_i$ with $i\in S$. This bijects that intersection of violations with nonnegative solutions of total $M-\sum_{i\in S}(c_i+1)$. Define $B(t)=\binom{t+k-1}{k-1}$ for $t\ge0$ and $B(t)=0$ for $t\lt0$. Inclusion-exclusion proves [[stars-bars-upper-bound|the bounded distribution count]]

$$\sum_{S\subseteq\{1,\ldots,k\}}(-1)^{|S|}B\left(M-\sum_{i\in S}(c_i+1)\right).$$

When every cap is the same integer $c\ge0$, intersections depend only on $j=|S|$, so this becomes $\sum_{j=0}^k(-1)^j\binom kj B(M-j(c+1))$. Negative remaining totals contribute zero; they do not call for factorials of negative numbers. The shift removes a minimum before any upper-bound correction is made.

For three dice totaling ten, write $x_i=1+y_i$. Then $y_1+y_2+y_3=7$ with $0\le y_i\le5$. The unrestricted count is $\binom92=36$. Each specified violation $y_i\ge6$ leaves one unit and gives $\binom32=3$ solutions. Two violations would require twelve units and are impossible. Thus the answer is $36-3\cdot3=27$. In contrast, the introductory cap-four example had possible pairwise violations, so stopping after the first subtraction would fail.

Symmetry changes which objects are regarded as identical. Specify a finite collection $X$ of labeled arrangements and a finite group $G$ of allowed symmetries, acting on it. The arrangement set must be preserved by every symmetry, and the allowed operations include the identity, inverses and compositions. The orbit of $x$ is its equivalence class; its stabilizer is the symmetries leaving it unchanged. Rotations of a ring and rotations together with reflections are different groups and can give different counts.

[[burnsides-lemma|Burnside's lemma]] counts the orbits by averaging fixed arrangements:

$$\#\text{orbits}=\frac1{|G|}\sum_{g\in G}|\operatorname{Fix}(g)|.$$

To prove it, count pairs $(g,x)$ with $g(x)=x$. Counting by $g$ gives the numerator. For an orbit of size $r$, the number of symmetries sending a fixed arrangement to each particular member is the same: compose with a symmetry sending one member to another. Those equal sets partition $G$, so each has size $|G|/r$, in particular the stabilizer does. Summing stabilizer sizes over the $r$ orbit members gives $r(|G|/r)=|G|$. Every orbit contributes exactly this much, proving the formula. Unequal orbit sizes cause no problem.

A symmetry permutes the positions. A fixed coloring must be constant along every cycle of that permutation, and choosing one color for each cycle is sufficient. With $q$ available named colors and no inventory restriction, a permutation with $c$ cycles therefore fixes $q^c$ colorings. The colors themselves are not being permuted or identified.

For four square vertices, the identity, quarter turn, half turn and three-quarter turn have four, one, two and one cycles. For two colors their fixed counts are $16,2,4,2$, giving six orbits. For three colors the count is $(81+3+9+3)/4=24$. For six binary beads under rotations only, the cycle counts are $6,1,2,3,2,1$, giving $(64+2+4+8+4+2)/6=14$. A rotation by $r$ positions on $n$ beads has $\gcd(n,r)$ cycles: repeated addition of $r$ modulo $n$ returns after $n/\gcd(n,r)$ steps.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 275" role="img" aria-label="Unequal rotation classes with a fixed inventory" style="width:100%;max-width:520px;height:auto"><title>Unequal rotation classes with a fixed inventory</title><g stroke="currentColor" fill="none" stroke-width="1.4"><rect x="80" y="65" width="100" height="100"/><rect x="340" y="65" width="100" height="100"/></g><g fill="currentColor"><circle cx="80" cy="65" r="11" stroke="currentColor" fill="currentColor" fill-opacity="1"/><circle cx="180" cy="65" r="11" stroke="currentColor" fill="currentColor" fill-opacity="1"/><circle cx="180" cy="165" r="11" stroke="currentColor" fill="currentColor" fill-opacity="0.12"/><circle cx="80" cy="165" r="11" stroke="currentColor" fill="currentColor" fill-opacity="0.12"/><circle cx="340" cy="65" r="11" stroke="currentColor" fill="currentColor" fill-opacity="1"/><circle cx="440" cy="65" r="11" stroke="currentColor" fill="currentColor" fill-opacity="0.12"/><circle cx="440" cy="165" r="11" stroke="currentColor" fill="currentColor" fill-opacity="1"/><circle cx="340" cy="165" r="11" stroke="currentColor" fill="currentColor" fill-opacity="0.12"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="26">Exactly two black vertices: two rotation classes</text><text x="130" y="210">Adjacent: four labeled versions</text><text x="390" y="210">Opposite: two labeled versions</text><text x="260" y="248">Unequal class sizes rule out division by four.</text></g></svg>

Fixed inventories must be respected within each cycle count. For a square with exactly two black vertices, the identity fixes $\binom42=6$ colorings, quarter turns fix none, and the half turn fixes two, obtained by choosing which opposite pair is black. Thus $(6+0+2+0)/4=2$ classes, adjacent and opposite. Substituting $2^c$ here would include colorings with the wrong number of black vertices. If reflections are also allowed, each symmetry's cycles must be counted anew; one cannot simply divide the rotation-only answer by two.

For cube faces there are twenty-four rotations: a chosen face can go to six faces and an adjacent face then has four choices. Their face-cycle counts are six for the identity; four for the three half turns through opposite face centers; three for the six quarter turns through face centers and the six half turns through opposite edge midpoints; and two for the eight turns through opposite vertices. Therefore two face colors give $(2^6+3\cdot2^4+12\cdot2^3+8\cdot2^2)/24=10$. Reflections are excluded from this cube count.`,
      related: [
        { card: "coefficient-extraction", note: String.raw`the same count read as one coefficient of a product of polynomials.` },
        { card: "circular-permutations", note: String.raw`seating around a table, where every arrangement moves under a rotation (R3.4).` },
        { card: "generating-function-method", note: String.raw`shares with any allowed sizes, as a product of polynomials (R8.3).` }
      ],
      exercises: [
        { q: String.raw`Three fair dice are rolled independently. In how many of the $216$ outcomes is the total $10$?`, answer: "27",
          solution: String.raw`The dice are distinguished by their positions. Set $y_i=x_i-1$ for their three face values. The required total becomes seven with each $0\le y_i\le5$. The unrestricted count is $\binom92=36$. A specified violation $y_i\ge6$ leaves one unit after shifting, giving $\binom32=3$ possibilities; there are three coordinates. Two violations would need at least twelve units, so they cannot overlap. Subtracting gives $36-9=27$ ordered outcomes.` },
        { q: String.raw`Each of the four corners of a square is colored with one of $3$ available named colors; not all colors need be used. Two colorings count as the same if a rotation turns one into the other. How many different colorings are there?`, answer: "24",
          solution: String.raw`Use the four rotations acting on the four labeled vertices. The identity has four cycles and fixes $3^4=81$ colorings. Each quarter turn has one cycle and fixes three. The half turn has two cycles of opposite vertices and fixes $3^2=9$. Burnside's fixed-coloring average is $(81+3+9+3)/4=24$. The three available colors have fixed identities and need not all be used.` },
        { q: String.raw`Six beads on a ring are each black or white. Two rings count as the same if a rotation turns one into the other. How many different rings are there?`, answer: "14",
          solution: String.raw`A rotation by $r$ positions has $\gcd(6,r)$ cycles, with $\gcd(6,0)=6$. For $r=0,1,2,3,4,5$, the cycle counts are $6,1,2,3,2,1$. A fixed binary coloring is constant on each cycle, so the fixed counts are $64,2,4,8,4,2$. They total eighty-four; Burnside divides by six rotations to give fourteen. A flip of the ring is not included in the stated equivalence.` },
        { q: String.raw`Each face of a cube is painted red or blue. Two cubes count as the same if a rotation turns one into the other. How many different cubes are there?`, answer: "10",
          solution: String.raw`The twenty-four rotations consist of the identity; three half turns and six quarter turns about face-center axes; six half turns about opposite edge-midpoint axes; and eight turns about opposite vertices. Their face-cycle counts are respectively six, four, three, three and two. Each cycle must be monochromatic, so their fixed-coloring total is $64+3\cdot16+6\cdot8+6\cdot8+8\cdot4=240$. Burnside's average is $240/24=10$. The rotations preserve orientation; reflections are excluded.` }
      ],
      problems: [
        "2008 AMC 12A, Problem 19",
        "2021 Fall AMC 10B, Problem 24",
        "2017 AMC 12B, Problem 13",
        "2000 AMC 12, Problem 25",
        "2010 AMC 12A, Problem 25"
      ]
    },
    "R8.3": {
      prereq: ["binomial-theorem", "pascals-identity", "multiset-permutations", "stars-and-bars"],
      cards: ["vandermonde", "multinomial-theorem", "generating-function-method"],
      body: String.raw`[[vandermonde|Vandermonde's identity]] counts one choice in two ways. From disjoint groups of sizes $m,n$, choose $r$ objects. If $k$ come from the first group, the two selections have $\binom mk\binom n{r-k}$ possibilities. Every $r$-element subset has exactly one such split, so for nonnegative integers $m,n$ and $0\le r\le m+n$,

$$\sum_k\binom mk\binom n{r-k}=\binom{m+n}{r}.$$

Here a binomial coefficient is zero when its lower index is outside zero through its nonnegative upper index. Equivalently, sum over $\max(0,r-n)\le k\le\min(m,r)$. For committees of four from groups of five and six, the sum is $\binom{11}{4}=330$. Taking $m=n=r=6$ and using $\binom6{6-k}=\binom6k$ gives $\sum_k\binom6k^2=\binom{12}{6}=924$.

The same identity follows algebraically by extracting the coefficient of $x^r$ from $(1+x)^m(1+x)^n=(1+x)^{m+n}$. Coefficient extraction in a product is a convolution: if $A(x)=\sum_i a_ix^i$ and $B(x)=\sum_j b_jx^j$, then

$$[x^N]A(x)B(x)=\sum_i a_i b_{N-i}.$$

The notation $[x^N]$ selects the coefficient, not the value of the polynomial at $N$. Each product term contributes according to the sum of its exponents; its coefficient multiplies the numbers of choices at those two sizes.

The [[multinomial-theorem|multinomial theorem]] extends the binomial expansion. For an integer $n\ge0$ and commuting variables $x_1,\ldots,x_s$, choose one term from each of $n$ factors. If $n_i$ factors supply $x_i$, where the nonnegative integers $n_i$ sum to $n$, the positions can be assigned in $n!/(n_1!\cdots n_s!)$ ways. Thus

$$(x_1+\cdots+x_s)^n=\sum_{n_1+\cdots+n_s=n}\frac{n!}{n_1!\cdots n_s!}x_1^{n_1}\cdots x_s^{n_s}.$$

The coefficient of $x^2y^2z$ in $(x+y+z)^5$ is $5!/(2!2!1!)=30$. Constants and signs in the summands remain part of the term: in $(2x-y+z)^5$ the same coefficient is $30\cdot2^2\cdot(-1)^2=120$. In $(x+y+z)^6$ all exponent triples of total six occur with positive coefficients, so there are $\binom82=28$ different monomials. That count need not hold after cancellation: adding $(x-y-z)^n$ to $(x+y+z)^n$ cancels exactly the terms with odd combined exponent on $y,z$.

A [[generating-function-method|generating function]] records a collection of choices by size. If there are $a_j$ choices of size $j$, encode them by $A(x)=\sum_j a_jx^j$. Independent choices combine by multiplication because their sizes add and their numbers of descriptions multiply. One must check that each outcome has exactly one description by the factor choices, or correct the multiplicity when it does not.

For unordered combinations of pennies, nickels and dimes, let one factor record the number of coins of each denomination:

$$(1+x+x^2+\cdots)(1+x^5+x^{10}+\cdots)(1+x^{10}+x^{20}+\cdots).$$

Choosing one term from each factor uniquely specifies a coin count for each type. The coefficient of $x^{20}$ is therefore the number of combinations totaling twenty cents. With zero, one or two dimes, the possible nickel counts give five, three or one combinations, totaling nine. For this coefficient, terms above degree twenty can be discarded before multiplying. These formal series encode counts; no numerical convergence or substitution for $x$ is required.

The coin factors can also be written $1/(1-x)$, $1/(1-x^5)$ and $1/(1-x^{10})$, since multiplying $1+x^d+x^{2d}+\cdots$ by $1-x^d$ leaves one coefficientwise. A cap of $c$ on the number of a denomination instead gives $1+x^d+\cdots+x^{cd}$. Requiring at least one gives $x^d/(1-x^d)$. The factors express the allowed choices, not merely a memorized rational expression.

For $k$ shares each capped at $c$, the product is $(1-x^{c+1})^k/(1-x)^k$. Stars and bars gives $[x^t](1-x)^{-k}=\binom{t+k-1}{k-1}$ for $t\ge0$. Expanding the numerator by the binomial theorem therefore produces exactly the alternating upper-bound sum in R8.2. This identity explains why inclusion-exclusion and coefficient extraction count the same bounded distributions.

Generating functions also enforce a fixed color inventory in Burnside's lemma. If a symmetry's cycles have lengths $\ell_1,\ldots,\ell_c$, each cycle is either white or entirely black. Encode those choices by $\prod_{i=1}^c(1+t^{\ell_i})$. Its coefficient of $t^b$ counts the fixed colorings with exactly $b$ black positions. For the square half turn the cycle lengths are two and two, so $[t^2](1+t^2)^2=2$; a quarter turn has a single length-four cycle and fixes no coloring with exactly two black positions.

Ordered coin sequences are a different collection: their order is part of the outcome. A sequence of length $j$ is encoded by $(x+x^5+x^{10})^j$, and all finite lengths by $1/(1-(x+x^5+x^{10}))$. For ten cents there are four unordered combinations, but nine ordered sequences: ten pennies; two nickels; one dime; and the six placements of one nickel among five pennies. Positive coin sizes ensure only finitely many sequences contribute to a fixed coefficient.

Partitions illustrate another use. For each positive part size $j$, choose its multiplicity, giving a factor $1/(1-x^j)$. Hence the partition count $p(N)$ is $[x^N]\prod_{j\ge1}(1-x^j)^{-1}$. Only $j\le N$ matter to that coefficient. For distinct parts replace the factors by $1+x^j$; for odd parts keep only odd $j$. This connects the partition correspondences of R4 to coefficient methods without assuming an analytic infinite product. Dice totals similarly use $(x+x^2+\cdots+x^6)^k$, which counts outcomes; probabilities require their weights as well.`,
      related: [
        { card: "squared-binomial-sum", note: String.raw`the case $\sum_k \binom nk^2 = \binom{2n}{n}$.` },
        { card: "coefficient-extraction", note: String.raw`adding coefficients by setting $x = 1$ or $-1$ (R4.4).` },
        { card: "hockey-stick", note: String.raw`another sum of binomial coefficients, along a diagonal (R4.3).` }
      ],
      exercises: [
        { q: String.raw`What is $\binom60^2 + \binom61^2 + \cdots + \binom66^2$?`, answer: "924",
          solution: String.raw`Use $\binom6k=\binom6{6-k}$. Each product $\binom6k\binom6{6-k}$ counts a six-person committee from two disjoint groups of six with $k$ from the first group. Summing these disjoint cases counts all committees, so Vandermonde's identity gives $\binom{12}{6}=924$.` },
        { q: String.raw`What is the coefficient of $x^2y^2z$ in $(x + y + z)^5$?`, answer: "30",
          solution: String.raw`Choose which two of the five factors supply $x$, which two of the remaining three supply $y$, and let the last supply $z$. There are $\binom52\binom32=10\cdot3=30$ assignments, each contributing one copy of $x^2y^2z$. Equivalently the coefficient is $5!/(2!2!1!)=30$.` },
        { q: String.raw`How many different terms are there in the expansion of $(x + y + z)^6$, after like terms are combined?`, answer: "28",
          solution: String.raw`Each monomial is determined by a nonnegative exponent triple $(a,b,c)$ with $a+b+c=6$. Every such triple occurs with a positive multinomial coefficient, so combining like terms never cancels it. Stars and bars counts the triples as $\binom82=28$. This argument uses three independent formal variables, rather than substituting related expressions for them.` },
        { q: String.raw`In how many ways can $20$ cents be made from pennies, nickels and dimes?`, answer: "9",
          solution: String.raw`Record one nonnegative count for each denomination, so a combination is a solution of $p+5n+10d=20$. If $d=0$, nickels can number zero through four, giving five choices, with pennies then forced. If $d=1$, there are three choices of nickels; if $d=2$, only zero nickels works. Thus the count is $5+3+1=9$. It is also $[x^{20}](1-x)^{-1}(1-x^5)^{-1}(1-x^{10})^{-1}$; these factors count denomination counts, not orders of coins.` }
      ],
      problems: [
        "2024 AMC 8, Problem 25",
        "2003 AMC 12A, Problem 22",
        "2021 Spring AMC 12A, Problem 15",
        "2006 AMC 12A, Problem 24",
        "2024 AMC 12A, Problem 16"
      ]
    },
    "R8.4": {
      prereq: ["backward-induction", "geometric-series", "constructive-counting"],
      cards: ["graph-coloring", "strategy-stealing", "turn-based-games", "sprague-grundy"],
      body: String.raw`A proper vertex coloring assigns named colors so that endpoints of every edge differ. The chromatic number is the fewest colors needed. Here graphs are finite, simple and undirected. If the largest degree is $\Delta$, order the vertices and color each using a color unused by its already colored neighbors. At most $\Delta$ colors are forbidden, so $\Delta+1$ colors suffice. This is an upper bound, not necessarily the minimum.

A graph can be colored with at most two colors exactly when it has no odd cycle. In a two-coloring, colors alternate around a cycle, forcing its length to be even. Conversely, in each connected component choose a root and color vertices by the parity of their shortest-path distance to it. An edge joining equal parities would, together with their root paths, produce an odd closed walk. Removing repeated portions from an odd closed walk leaves an odd cycle, a contradiction. Thus adjacent vertices have different colors. A graph with an edge and no odd cycle needs exactly two colors; a nonempty edgeless graph needs only one.

A triangle or an odd cycle by itself needs three colors. A graph containing one needs at least three and may need more: four pairwise adjacent vertices require four. This is the distinction between a lower bound and an upper bound in [[graph-coloring|graph coloring]]. More generally, a clique of $r$ pairwise adjacent vertices needs $r$ different colors. Exhibiting such a clique and an $r$-coloring proves that the chromatic number is exactly $r$.

Additional structure gives sharper existence theorems, recorded with their references on the coloring card. Brooks' theorem improves the upper bound to $\Delta$ for a connected simple graph unless it is a complete graph or an odd cycle. The Four Color Theorem gives at most four colors for a planar graph, one drawable with edges meeting only at common endpoints. The hypotheses differ: planarity is not the same as low degree, and the exceptions in Brooks' theorem include the cliques that require $\Delta+1$. Neither theorem counts the colorings. Counting proper colorings is another question, and labeled vertices are not identified under rotations unless the problem explicitly says so.

For a four-cycle $ABCD$ in three colors, choose $A$ in three ways. If $C$ matches it, $B,D$ independently have two choices each. If $C$ differs, there are two choices for $C$ and one remaining choice for each of $B,D$. Hence $3(4+2)=18$ proper labeled colorings.

For a cycle of length $n\ge3$ with $q\ge2$ colors, a path of $n$ vertices has $q(q-1)^{n-1}$ proper colorings. The ones with equal endpoints correspond, by gluing the endpoints, to a cycle of length $n-1$. For $n=3$ the glued object is two vertices constrained to differ, with $q(q-1)$ colorings. Starting with that value as $C_2(q)$ gives $C_n(q)=q(q-1)^{n-1}-C_{n-1}(q)$. Induction yields

$$C_n(q)=(q-1)^n+(-1)^n(q-1).$$

Strategies also need a model. Assume a two-player game with perfect information, no chance, and every play terminating; under normal play, the player with no legal move loses. A [[strategy-stealing|symmetry strategy]] must prove that a proposed reply is legal, not just that the picture looks symmetric. For two equal nonempty piles, where a move removes any positive number from one pile, the second player can remove the same amount from the other. Equal piles are restored after each response; the reply is always available, and finite play ends with the second player taking the last coins.

Strategy stealing proves existence without generally specifying a winning first move. In rectangular Chomp, a move selects a cell other than the poisoned lower-left cell and removes it and all cells above and to its right. No legal move means a loss. For a rectangle of at least two rows and columns, suppose the second player could force a win. Let the first remove only the upper-right cell. The assumed strategy has a legal reply at some cell $c$, leaving a losing position for the player to move.

But every Chomp move removes the upper-right cell whenever it is present. Playing $c$ immediately on the original board would therefore leave exactly that same position, now with the second player to move. It would be a winning first move, contradicting the assumed second-player strategy. Termination rules out a draw, so some first-player winning strategy exists. The absorption of the opening cell into the reply is the crucial property; an arbitrary game need not have it.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" role="img" aria-label="Absorbing an opening move in Chomp" style="width:100%;max-width:520px;height:auto"><title>Absorbing an opening move in Chomp</title><g stroke="currentColor" stroke-width="1.2"><rect x="155" y="60" width="70" height="70" fill="currentColor" fill-opacity="0.03"/><rect x="225" y="60" width="70" height="70" fill="currentColor" fill-opacity="0.18"/><rect x="295" y="60" width="70" height="70" fill="currentColor" fill-opacity="0.18"/><rect x="155" y="130" width="70" height="70" fill="currentColor" fill-opacity="0.03"/><rect x="225" y="130" width="70" height="70" fill="currentColor" fill-opacity="0.18"/><rect x="295" y="130" width="70" height="70" fill="currentColor" fill-opacity="0.18"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="25">One reply absorbs the removed upper-right cell.</text><text x="190" y="173">Poison</text><text x="260" y="173">c</text><text x="330" y="103">t</text><text x="260" y="235">Choosing c removes the shaded region, including t.</text></g></svg>

For normal-play Nim, a move removes a positive number from exactly one pile. Form the bitwise XOR $s$ of the pile sizes, the binary sum without carries. If $s=0$, changing one pile changes the XOR to a nonzero value. If $s\ne0$, take its highest set bit and a pile $a$ having that bit. The target $b=a\mathbin\oplus s$ is smaller than $a$, because that highest differing bit changes from one to zero. Reducing $a$ to $b$ makes the total XOR zero. Thus zero-XOR positions are losing and all others winning, by induction on total coins.

For piles $1,4,6$, the XOR is three. Reducing six to $6\mathbin\oplus3=5$ leaves zero XOR, so taking one from that pile wins. This proof uses the last-coin-wins rule; a misère rule needs separate analysis.

[[sprague-grundy|Grundy values]] extend this reasoning to finite impartial normal-play games. Both players must have the same available moves from a given position, with no chance or hidden information, and moves must terminate. Define $g(P)$ as the mex, the smallest nonnegative integer absent from the option values; a terminal position has $g=0$. For example, $\operatorname{mex}\{0,2\}=1$. An option never has the same value as its parent, and every smaller nonnegative value occurs among the options.

For independent components, where a move changes exactly one component, XOR their Grundy values. The same highest-bit argument proves the sum losing exactly when this XOR is zero: a move from zero cannot preserve zero, while from nonzero one component can be moved to the required smaller value, which mex guarantees is available. This is the sense in which a component behaves like a Nim pile. It does not mean that games with different rules for the two players, looping moves, or chance can be replaced by Nim without further work.

In fact the Grundy value of the sum is the XOR $s$ itself, not merely zero or nonzero according to it. Induct on positions so that each option already has its component XOR as its value. No option has value $s$, because one component changes to a different Grundy value. For any $0\le z\lt s$, let $d=s\mathbin\oplus z$. At its highest set bit, $s$ has one and $z$ zero, so some component value $g_i$ has one there. Then $g_i\mathbin\oplus d\lt g_i$, and mex supplies an option of exactly that value. The resulting XOR is $s\mathbin\oplus d=z$. All values below $s$ occur and $s$ does not, so the mex of the sum's option values is $s$.

For a pile allowing removals of one or two, the values start $0,1,2,0,1,2,\ldots$. Induction proves $g(n)=n\bmod3$: for $n\ge2$ the preceding two residues are the other two values, whose mex is the missing one; the cases zero and one start the induction. <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" role="img" aria-label="Grundy values for one- or two-coin removal" style="width:100%;max-width:520px;height:auto"><title>Grundy values for one- or two-coin removal</title><g fill="currentColor" font-size="18" text-anchor="middle"><text x="260" y="25">A Grundy value is the mex of legal option values.</text><text x="85" y="75">Pile n</text><text x="270" y="75">Option values</text><text x="435" y="75">g(n)</text><text x="85" y="115">0</text><text x="270" y="115">none</text><text x="435" y="115">0</text><text x="85" y="155">1</text><text x="270" y="155">{0}</text><text x="435" y="155">1</text><text x="85" y="195">2</text><text x="270" y="195">{0, 1}</text><text x="435" y="195">2</text><text x="85" y="235">3</text><text x="270" y="235">{1, 2}</text><text x="435" y="235">0</text></g></svg>

Two independent piles of ten and eleven therefore have XOR $1\oplus2=3$ and are winning, although neither single-pile label alone describes the combined position.

If removing a piece splits a component, evaluate the resulting independent pieces by XOR, not by their total size. For a row of bricks where a move removes one brick or two adjacent bricks, the remaining left and right rows are separate components. From a row of three, removing one leaves lengths $(0,2),(1,1)$ or $(2,0)$, with option values two, zero and two. Removing two leaves a single brick, of value one. The option-value set is therefore $\{0,1,2\}$ and the row's Grundy value is three. This differs from a pile allowing only end removals of one or two, whose size-three value is zero.

[[turn-based-games|Alternating games of chance]] instead depend on probabilities. If successive independent attempts each succeed with the same probability $0\lt p\le1$, and the first success wins, the first player wins immediately with probability $p$. After two failures the probabilistic state is the original one. Therefore $P=p+(1-p)^2P$, giving

$$P=\frac{p}{1-(1-p)^2}=\frac1{2-p}.$$

The probability of no success tends to zero, so these are genuine eventual-win probabilities. At $p=0$ neither player ever wins, and the formula's canceled expression must not be used. For independent fair die rolls seeking a six, $p=1/6$ gives $P=6/11$. If the players have different success probabilities or the state changes after failures, write the appropriate conditional recurrence rather than reuse this formula.`,
      related: [
        { card: "backward-induction", note: String.raw`labeling positions one by one from the end (R5.4).` },
        { card: "constructive-counting", note: String.raw`counting proper colorings vertex by vertex (R1.3).` },
        { card: "states-recursion-prob", note: String.raw`games of chance with more states than two (R9.3).` }
      ],
      exercises: [
        { q: String.raw`The vertices of a square $ABCD$ are colored with $3$ colors so that the ends of each side differ. How many colorings are there?`, answer: "18",
          solution: String.raw`The vertices remain labeled. Choose the color of $A$ in three ways. If $C$ has the same color, $B$ and $D$ each avoid that one color and contribute four choices together. If $C$ differs, it has two choices, and $B,D$ must each use the third color, contributing one choice. The disjoint cases give $3(4+2)=18$. No division by rotations is made.` },
        { q: String.raw`In Nim with piles of $1$, $4$ and $6$ coins, a move takes a positive number of coins from one pile, and the player who takes the last coin wins. How many coins should the first player take, and from which pile, to win? Give the number of coins.`, answer: "1",
          solution: String.raw`The pile XOR is $001\oplus100\oplus110=011$, or three. A winning move must leave zero XOR. Testing the target $a\oplus3$ for each pile gives two from one, seven from four, and five from six. The first two would increase their piles and are illegal; reducing six to five is legal. Take one coin from the six-coin pile, leaving $1\oplus4\oplus5=0$. After any opponent move from zero XOR, a reply restoring zero exists by the Nim proof.` },
        { q: String.raw`Two players take turns making independent rolls of a fair die, and the first to roll a six wins. What is the probability that the first player wins?`, answer: "6/11",
          solution: String.raw`Let $P$ be the eventual first-player win probability. The first roll wins with probability $1/6$. If both first attempts fail, of probability $(5/6)^2=25/36$ by independence, the game returns to the same state. If only the first fails and the second succeeds, the first player loses. Hence $P=1/6+(25/36)P$, so $P=(1/6)/(11/36)=6/11$. The probability of endless failures is zero.` }
      ],
      problems: [
        "2015 AMC 12B, Problem 9",
        "2020 AMC 10B, Problem 16",
        "2021 Spring AMC 10B, Problem 24"
      ]
    },
    "R8.5": {
      prereq: ["stars-bars-upper-bound", "burnsides-lemma", "vandermonde", "multinomial-theorem", "generating-function-method", "graph-coloring", "strategy-stealing", "turn-based-games", "sprague-grundy"],
      cards: [],
      body: String.raw`[[stars-bars-upper-bound|Bounded distributions]] shift lower bounds first, then use inclusion-exclusion on cap violations. Negative remaining totals contribute zero, and intersections must be included when feasible. [[burnsides-lemma|Burnside's lemma]] counts equivalence classes by averaging fixed arrangements over the specified symmetry group. Fixed inventories require cycle choices consistent with the inventory; rotations and reflections are different identifications.

[[vandermonde|Vandermonde's identity]] counts a selection from two disjoint groups by its split. [[multinomial-theorem|Multinomial coefficients]] count factor assignments, retaining constants and signs. [[generating-function-method|Generating functions]] record choice sizes in exponents and multiplicities in coefficients. Products require a justified outcome description. Ordered sequences, unordered coin counts and integer partitions need different factors; formal coefficient calculations can discard terms beyond the target degree.

[[graph-coloring|Graph coloring]] separates existence, minimum colors and the number of colorings. Greedy coloring gives an upper bound; cliques and odd cycles give lower bounds. [[strategy-stealing|Symmetry and strategy stealing]] depend on verified legal responses or absorption properties. [[sprague-grundy|XOR and Grundy values]] apply to terminating impartial normal-play games and independent sums with one component changed per move. [[turn-based-games|Games of chance]] use weighted recurrences with stated independence and success probabilities, including exceptional cases where the process need not end.`,
      strategies: [
        String.raw`For a maximum on each share, count all shares, then subtract those that break it by inclusion-exclusion.`,
        String.raw`When symmetric arrangements count as one, average the fixed arrangements over the symmetries.`,
        String.raw`Read a sum of products of binomial coefficients as a choice from two groups.`,
        String.raw`Write each choice as a polynomial and look for one coefficient of the product.`,
        String.raw`In a game, look for a mirror move before building a table.`,
        String.raw`For terminating impartial normal-play games, compute the XOR of independent component Grundy values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many ways can $10$ identical candies be shared among $3$ children if no child gets more than $5$?`, answer: "21",
        solution: String.raw`The three children are distinct recipients, and empty shares are allowed. Unrestricted triples of total ten number $\binom{12}{2}=66$. A specified child receiving at least six leaves four candies freely shared after shifting, giving $\binom62=15$ possibilities. Two such children would need twelve candies and cannot occur. Inclusion-exclusion thus gives $66-3\cdot15=21$.` },
      { q: String.raw`What is the coefficient of $x^3$ in $(1 + x)^4(1 + x)^5$, found without multiplying out?`, answer: "84",
        solution: String.raw`The product equals $(1+x)^9$, whose coefficient of $x^3$ is $\binom93=84$. Reading the coefficient before combining factors gives the same convolution $\sum_k\binom4k\binom5{3-k}$. The two forms count the same selection of three factor positions, separated into groups of four and five or considered together.` },
      { q: String.raw`In a game, a pile has $n$ coins and a move takes $1$ or $2$ of them; the player who takes the last coin wins. What is the Grundy value of a pile of $10$ coins?`, answer: "1",
        solution: String.raw`A zero pile has no options, so $g(0)=\operatorname{mex}(\varnothing)=0$. Then $g(1)=\operatorname{mex}\{0\}=1$ and $g(2)=\operatorname{mex}\{0,1\}=2$. For $n\ge2$, the options have values $g(n-1),g(n-2)$; by induction these are the two residues other than $n\bmod3$. Their mex is the missing residue. Therefore $g(n)=n\bmod3$ and $g(10)=1$. This uses the normal-play last-coin-wins rule.` },
      { q: String.raw`How many ordered triples of integers $(a,b,c)$ satisfy $a+b+c=12$ and $2\le a,b,c\le5$?`, answer: "10",
        solution: String.raw`Subtract two from each coordinate, leaving total six and caps three. Unrestricted nonnegative triples number $\binom82=28$. A specified coordinate at least four leaves two after shifting, giving $\binom42=6$; two violations would require eight and are impossible. Hence the count is $28-3\cdot6=10$.` },
      { q: String.raw`Each vertex of a square receives one of three available named colors. Rotations and reflections both identify equivalent colorings. How many classes are there?`, answer: "21",
        solution: String.raw`The four rotations fix $81,3,9,3$ colorings. Among the four reflections, two fix opposite vertices and swap the other pair, giving three cycles and $3^3=27$ fixed colorings each. The other two swap two pairs, giving $3^2=9$ each. Burnside over all eight symmetries gives $(81+3+9+3+2\cdot27+2\cdot9)/8=21$. Dividing the rotation-only answer by two would not give this result.` },
      { q: String.raw`How many unordered combinations of pennies, nickels and dimes total ten cents, and how many ordered sequences of those coins total ten cents? Give the two counts in that order.`, answer: "4,9",
        solution: String.raw`The combinations are ten pennies, one nickel with five pennies, two nickels, and one dime: four. For ordered sequences, only the one-nickel case changes: the nickel has six positions among its five pennies. Thus there are $1+6+1+1=9$ sequences. Denomination-count factors encode the first model, while a sum over all lengths of $(x+x^5+x^{10})^j$ encodes the second.` },
      { q: String.raw`How many nonzero monomial terms remain after expanding and combining $(x+y+z)^4+(x-y-z)^4$ in independent formal variables?`, answer: "9",
        solution: String.raw`A monomial $x^ay^bz^c$ of total degree four has multiplier $1+(-1)^{b+c}$ between the two expansions. It survives exactly when $b+c$ is even, equivalently when $a$ is even. For $a=0,2,4$, the possible pairs $(b,c)$ number five, three and one. All surviving coefficients are twice a positive multinomial coefficient, so there are nine terms.` },
      { q: String.raw`A row contains four bricks. A move removes one brick or two adjacent bricks; remaining separated rows become independent components. Under normal play, what is this row's Grundy value?`, answer: "1",
        solution: String.raw`For row lengths zero through three the values are $0,1,2,3$. A one-brick removal from length four leaves lengths $(0,3),(1,2),(2,1),(3,0)$, all of XOR value three. A two-brick removal leaves $(0,2),(1,1),(2,0)$, of values two, zero and two. The option set is $\{0,2,3\}$, whose mex is one. The ability to split rows is part of the rule.` },
      { q: String.raw`Two players alternate independent attempts until the first success wins. The first player's success probability on each attempt is $1/2$ and the second player's is $1/3$. What is the first player's eventual win probability?`, answer: "3/4",
        solution: String.raw`Let $P$ be the first-player win probability at the start of a pair of turns. It wins immediately with probability $1/2$, and two failures occur with probability $(1/2)(2/3)=1/3$, returning to the same state. Hence $P=1/2+(1/3)P$, so $P=3/4$. The probability of infinitely many failed pairs is zero. The equal-success-probability formula does not apply directly.` }
    ],
    problems: [
      "1996 AIME, Problem 7",
      "2006 AIME II, Problem 8",
      "2017 AIME I, Problem 7",
      "1994 AIME, Problem 5"
    ]
  },
  challenge: {
    problems: [
      "2019 AMC 10A, Problem 25",
      "1993 AIME, Problem 8",
      "2020 AIME I, Problem 7",
      "2016 AIME II, Problem 12"
    ]
  }
};
