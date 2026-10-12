// Extended detail-page write-ups for Counting & Probability, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"inclusion-exclusion": String.raw`
## Key forms
- $|A \cup B| = |A| + |B| - |A \cap B|$ — two sets
- $|A_1 \cup \cdots \cup A_n| = \alt{\sum_{k=1}^{n} (-1)^{k+1} \sum_{|S| = k} \left|\bigcap_{i \in S} A_i\right|}{(|A_1| + \cdots + |A_n|) - (|A_1 \cap A_2| + \cdots) + (|A_1 \cap A_2 \cap A_3| + \cdots) - \cdots}$ — $n$ sets, the sign set by how many sets are intersected
- $N - |A_1 \cup \cdots \cup A_n|$ — the elements in none of the sets, out of $N$ in all
- $\alt{\sum_{k=0}^{n} (-1)^k \binom nk N_k}{N_0 - \binom n1 N_1 + \binom n2 N_2 - \cdots \pm \binom nn N_n}$ — the elements in none of the sets when every intersection of $k$ sets has the same size $N_k$, with $N_0 = N$

## Conditions
The sets are finite subsets of one universe. The same identity holds for probabilities, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$, and for any additive measure, such as area.

## Why it works
Take an element that lies in exactly $m \ge 1$ of the sets. The right side counts it once for each set containing it, $\binom m1$ times, subtracts it once for each pair of those sets, $\binom m2$ times, and so on, for a net count of $$\binom m1 - \binom m2 + \binom m3 - \cdots \pm \binom mm = 1 - (1 - 1)^m = 1.$$ An element in none of the sets is counted zero times. So every element of the union is counted exactly once.

## Useful observations
- Stopping after any term gives a bound: stopping after an added term overestimates the union, and stopping after a subtracted term underestimates it.
- The complement form with $N_k = (n - k)!$ counts [[derangements|derangements]]: $n!\left(1 - \frac1{1!} + \frac1{2!} - \cdots \pm \frac1{n!}\right)$.
- The same argument counts maps from an $n$-element set onto a $k$-element set: $k^n - \binom k1 (k - 1)^n + \binom k2 (k - 2)^n - \cdots$.

## Applications
Unions of overlapping conditions, elements that avoid every one of several properties, derangements and surjections, and integers coprime to a given number.

## Contest profile
The fact behind most counts of "at least one of several conditions" that cannot be flipped cleanly; on contests it is applied through the counting method rather than quoted.
`,
"permutations-combinations": String.raw`
## Key forms
- $P(n, k) = \dfrac{n!}{(n - k)!}$ — the number of ordered selections of $k$ from $n$ distinct objects
- $\dbinom nk = \dfrac{n!}{k!\,(n - k)!}$ — the number of unordered selections, subsets of size $k$
- $P(n, k) = k!\dbinom nk$ — the two counts differ by the $k!$ orderings of a chosen set
- $\dbinom nk = \dbinom n{n-k}$ — choosing what to take is choosing what to leave

## Conditions
The $n$ objects are distinct and each is used at most once. With repeated objects the multiset formula replaces these.

## Why it works
An ordered selection is built slot by slot, and each unordered selection corresponds to exactly $k!$ ordered ones.

To choose $k$ objects in order from $n$, fill the first slot in $n$ ways, the second in $n - 1$ ways, since one object is used up, and so on down to the $k$th slot, which has $n - k + 1$ options. By the multiplication principle, $$P(n, k) = n(n - 1)\cdots(n - k + 1) = \frac{n!}{(n - k)!},$$ the last step multiplying top and bottom by $(n - k)!$.

Now group the ordered selections by which set of objects they use. Each set of $k$ objects can be put in order in $k!$ ways, so every set appears exactly $k!$ times among the ordered selections, and dividing out that overcount leaves $\binom nk = \frac{P(n, k)}{k!} = \frac{n!}{k!(n-k)!}$. From $10$ people, the $P(10, 3) = 10 \cdot 9 \cdot 8 = 720$ ranked top-three lists collapse to $\frac{720}{6} = 120$ committees.

The symmetry $\binom nk = \binom n{n-k}$ has a one-line reason: choosing which $k$ objects to take is the same as choosing which $n - k$ to leave behind.

## Useful observations
- The decision is always whether order matters, and when in doubt, counting the ordered version and dividing by the overcount is safer than guessing, because the overcount is usually easy to name.
- $P(n, k)$ reads as filling slots one at a time with a shrinking menu, which is how "chains of choices" problems appear in disguise.
- The [[complementary-counting|complementary framing]] $\binom nk = \binom n{n-k}$ helps whenever the smaller side is easier to count.
- The common error is mixing the two kinds within one problem: counting an ordered stage and an unordered stage and multiplying without checking that the second count does not depend on the first.

## Applications
Committees, rankings, arrangements, words from letters, and hybrid counts where one stage is ordered (officers) and another is not (ordinary members).

## Contest profile
The atoms of all counting, which is why they are rarely the whole answer; [[casework-method|casework]] usually joins them. The recurring shapes layer the two kinds of selection: committees with restrictions, words formed from letters, and hybrid counts.
`,

"multiset-permutations": String.raw`
## Key forms
- $\dfrac{n!}{n_1!\,n_2!\cdots n_k!}$ — the arrangements of $n$ objects in a row when $n_1, \ldots, n_k$ of them are identical in groups (a multinomial coefficient)
- $\dbinom nk = \dfrac{n!}{k!\,(n - k)!}$ — the case of two kinds, such as $k$ identical A's and $n - k$ identical B's

## Conditions
The $n_i$ are the sizes of the groups of identical objects and add up to $n$. Objects in different groups are distinguishable.

## Why it works
Label the identical objects to make them distinct, count those arrangements, then divide out the labels, since they do not change what is seen.

With every object distinct there are $n!$ arrangements. Now erase the labels. Each visible arrangement came from $n_1!$ labeled ones that differ only in the order of the first group's labels, times $n_2!$ for the second group, and so on, because each group's labels can be shuffled among that group's positions independently. So each visible arrangement was counted $n_1!\,n_2!\cdots n_k!$ times, and dividing gives the formula.

{{figure:labels}}

With two groups of sizes $k$ and $n - k$ the formula is $\frac{n!}{k!\,(n - k)!} = \binom nk$: arranging $k$ identical A's and $n - k$ identical B's is the same as choosing which $k$ positions get the A's.

## Useful observations
- Any arrangement of objects that are not all distinct is this formula: list the multiset, take $n!$, and divide by a factorial for each repeated type.
- Grid paths are the most common disguise, since a path across a $5 \times 3$ grid is a word of five R's and three U's, and there are $\frac{8!}{5!\,3!} = 56$ of them.
- With a restriction the formula is not patched. The unrestricted objects are arranged first and the repeated ones placed into the gaps between them: for "no two I's adjacent" in MISSISSIPPI, arrange the other seven letters in $\frac{7!}{4!\,2!} = 105$ ways, then choose $4$ of the $8$ gaps for the I's, $\binom84 = 70$ ways, for $7350$ in all. With several restricted types, the most constrained goes first, or inclusion-exclusion handles the adjacency conditions.
- Identical-looking steps or objects are the letters of a word, which turns many problems into this one formula.

## Applications
Words with repeated letters, lattice paths, arrangements of identical objects, and coefficients in multinomial expansions.

## Contest profile
Almost never alone: it counts the pieces of a [[casework-method|casework]] split or the outcomes of a [[basic-probability|probability]] problem, and sometimes the words a [[bijection-method|bijection]] produces.
`,

"circular-permutations": String.raw`
## Key forms
- $(n - 1)!$ — the ways to seat $n$ people around a round table, when only the order around the table matters
- $\dfrac{(n - 1)!}{2}$ — the same when the arrangement can be flipped over, as a necklace or key ring can, for $n \ge 3$
- $(n - k)!\,k!$ — the arrangements in which a chosen group of $k$ of the $n$ people sit together
- $n!$ — the arrangements at a table whose seats are labeled or distinguishable, where rotating gives a different arrangement

## Conditions
Two seatings count as the same exactly when one can be turned into the other, by a rotation or, for a flippable object, by a flip. The flip division needs $n \ge 3$, so that a circle differs from its mirror image.

## Why it works
Every circular arrangement corresponds to exactly $n$ rows, one for each seat that reading can start from, so dividing the $n!$ rows by $n$ counts the circles: $(n - 1)!$.

{{figure:rotations}}

Equivalently, seat one person anywhere; since rotations do not matter, that seat is as good as any other. The remaining $n - 1$ people then fill the remaining seats in order, in $(n - 1)!$ ways. When flips count as the same, each circle and its mirror image are one object, so divide by $2$ again.

## Useful observations
- Fixing one person is the habit worth building, because it also handles constraints. For "$A$ sits directly opposite $B$" at a table of $8$, fixing $A$ forces $B$'s seat, and the other $6$ people fill the remaining seats in $6!$ ways.
- Whether flips count is decided from the physical situation: a bracelet or a key ring can be turned over, so the count is divided by $2$, but people at a table cannot.
- For people who must sit together, they are glued into a block first. A block of $k$ among $n$ people leaves $n - k + 1$ units around the circle, which can be arranged in $(n - k)!$ ways, and the block itself in $k!$ ways. In general this division is the [[uniform-overcount|uniform overcount]] idea.

## Applications
Round tables, necklaces and bracelets, rotating arrangements of distinct objects, and seatings with people who must or must not be adjacent.

## Contest profile
Four problems here, all AIME, none by it alone; two use [[complementary-counting|complementary counting]] for "no two of these sit together" conditions. Round tables with adjacency conditions are an AMC fixture as well, and bead necklaces bring in the extra division by $2$.
`,

"complementary-counting": String.raw`
## When to use
Whenever the opposite of the condition is an "and": "at least one", "not all the same", "some two share a birthday", or the chance of at least one success in $n$ independent tries, $1 - (1 - p)^n$. If the condition is already an "and", such as "every digit is odd", count it directly; its opposite would be the messy side.

## How
1. Count the total, in the same terms the question uses: ordered with ordered, unordered with unordered.
2. Write down the opposite of the condition; "at least one" becomes "none", and "at least two" becomes "none or exactly one".
3. Count the opposite, usually as a product of independent choices.
4. Subtract it from the total; in probability, $P(\text{at least one}) = 1 - P(\text{none})$.

## Why it works
Every object either has the property or does not, so the two counts add up to the total, and whichever is easier to count gives the other by subtraction.

"At least one of four rolls is a $6$" is an "or" across the rolls, and its opposite, "no roll is a $6$", is an "and": a separate requirement on each roll. Separate requirements multiply, $5^4$ of the $6^4$ outcomes, so $$P(\text{at least one } 6) = 1 - \left(\frac56\right)^4.$$

## Formulas it uses
- [[permutations-combinations]]: counts the total and the opposite, usually as a product of independent choices, and $\#(\text{good}) = \#(\text{total}) - \#(\text{bad})$.
- [[basic-probability]]: the same subtraction for chances, $P(\text{at least one}) = 1 - P(\text{none})$, where $P(\text{none}) = \alt{\prod_i (1 - p_i)}{(1 - p_1)(1 - p_2)\cdots(1 - p_n)}$ for independent trials with probabilities $p_i$.

## Common traps
- Counting the total and the complement in different universes, such as ordered outcomes for one and unordered for the other.
- Taking the wrong opposite: the opposite of "at least two" is "at most one", not "exactly one".
- Multiplying single-trial probabilities for trials that are not independent.

## Contest profile
A setup step rather than a whole solution: the complement is usually counted by another tool, most often inclusion-exclusion when the bad events overlap.
`,

"counting-blocks": String.raw`
## When to use
Seatings in which a couple, a family or a set of books must stay together, words in which certain letters must be adjacent, and numbers in which certain digits form a block. Together with [[gap-method|the gap method]] it handles mixed conditions, some items together and others apart.

## How
1. Glue each group that must stay together into one block.
2. Count the arrangements of the blocks and the free items, treating each block as a single item.
3. Multiply by the number of orders inside each block.
4. Around a circle, arrange the $u$ units in $(u - 1)!$ ways before multiplying.

Seven people sit in a row, and Alice, Bob and Carol must sit together. Gluing the three leaves $5$ units, arranged in $5! = 120$ ways, and the block can be ordered in $3! = 6$ ways, so there are $720$ seatings.

## Why it works
In every valid arrangement the group occupies a stretch of consecutive seats, so the arrangement is described by two independent choices: where the block sits among the other items, and the order inside the block. Each pair of choices gives exactly one valid arrangement and each valid arrangement comes from exactly one pair, so the count is the product. The figure shows the example's block as one unit among five.

## Formulas it uses
- [[permutations-combinations]]: $u!$ arrangements of the units, and $k!$ orders inside a block of $k$.
- [[multiset-permutations]]: when some units are identical, the arrangements number $\frac{u!}{u_1!\,u_2!\cdots}$.

## Common traps
- Forgetting the orders inside each block.
- Gluing items that only need to be near each other, not adjacent.
- Using a block for "not all together", which is the total minus "all together".

## Contest profile
Usually a quick step inside an arrangement problem, often followed by complementary counting when the condition is that items are not all together.
`,

"grid-paths": String.raw`
## Key forms
- $\dbinom{m + n}{m}$ — the shortest paths along grid lines from $(0, 0)$ to $(m, n)$ using unit steps right and up
- $\dbinom{a + b}{a} \dbinom{c + d}{c}$ — the paths that pass through a waypoint, the product of the paths to it and the paths from it
- $\dfrac{(a + b + c)!}{a!\,b!\,c!}$ — the same count in three dimensions, with steps in three directions
- $\dfrac1{n + 1}\dbinom{2n}{n}$ — the paths from $(0, 0)$ to $(n, n)$ that never go above the line $y = x$, the Catalan number

## Conditions
Every step goes right or up, so every shortest path has exactly $m + n$ steps. A path that may also turn back is a different count.

## Why it works
A path is determined by its sequence of steps, and the sequence is any arrangement of $m$ R's and $n$ U's, so the paths match the ways to choose which $m$ of the $m + n$ positions hold an R. That is $\binom{m + n}{m}$, an instance of [[multiset-permutations|arrangements with repeated letters]].

The same count also builds up point by point. The last step into any point comes either from the left or from below, so the number of paths to a point is the sum of the numbers at those two neighbors. Filling in the grid from the corner reproduces Pascal's triangle, tilted.

{{figure:counts}}

## Useful observations
- A required waypoint $P$ multiplies: $$\#(\text{paths through } P) = \#(\text{paths to } P) \times \#(\text{paths from } P).$$ From $(0, 0)$ to $(4, 3)$ there are $\binom73 = 35$ paths.
- A forbidden point subtracts the paths through it, with [[pie|inclusion-exclusion]] when there are several, and a diagonal barrier is the [[reflection-principle|reflection principle]], which is where the Catalan numbers come from.
- When the formulas start tangling, with several forbidden points or an awkward region, the count at each point is written as the sum of the counts to its left and below. It is slower, but it is never wrong, and on a small grid it is often faster than getting inclusion-exclusion right.

## Applications
Shortest routes on a street grid, routes through or around required points, staircase and diagonal-barrier paths, and ballot-style counts.

## Contest profile
Four problems here, all AIME, one solved by it alone; the others pair it with a [[bijection-method|bijection]], a [[recursive-counting|recursion]] or [[stars-and-bars|stars and bars]]. AMC uses the plain count, and AIME adds barriers, diagonal steps, or a third dimension. Most errors are miscounted steps, so the two totals $m$ and $n$ are written down explicitly.
`,

"rectangles-in-grid": String.raw`
## Key forms
- $\dbinom{m+1}{2}\dbinom{n+1}{2}$ — the rectangles in an $m \times n$ grid of unit squares, choosing two of the $m + 1$ vertical lines and two of the $n + 1$ horizontal lines
- $\alt{\sum_{k=1}^{\min(m,n)}(m + 1 - k)(n + 1 - k)}{m \cdot n + (m - 1)(n - 1) + \cdots}$ — the squares of every side length in an $m \times n$ grid
- $\alt{\sum_{k=1}^{n}k^2}{1^2 + 2^2 + \cdots + n^2} = \dfrac{n(n+1)(2n+1)}{6}$ — the squares in an $n \times n$ grid
- $i(m - i + 1)\,j(n - j + 1)$ — the rectangles containing the unit cell in column $i$ and row $j$

## Conditions
The rectangles have sides along the grid lines. Tilted rectangles on lattice points are a different count, parametrized by the vector $(a, b)$ along one side, and are not covered by these formulas.

## Why it works
A rectangle is determined by choosing $2$ of the $m + 1$ vertical grid lines and $2$ of the $n + 1$ horizontal ones, and the choices are independent.

Squares are the constrained version, since the two spans must be equal: summing over the side length $k$ gives $\sum_k (m + 1 - k)(n + 1 - k)$, which collapses to the [[power-sums|sum of the squares]], $\sum_{k=1}^{n} k^2$, on a square grid.

## Useful observations
- The key move is to stop counting rectangles and start counting the lines that bound them: any two vertical lines and any two horizontal lines determine exactly one rectangle, so the count is a product of two binomial coefficients.
- Squares are the harder cousin, because the two spans must be equal; the sum is over the side length, which is why an $n \times n$ grid gives a sum of squares rather than a closed product.
- For sub-rectangles containing a marked cell, the line choices on each side of it are counted separately and multiplied.

## Applications
Counts of rectangles and squares in grids and chessboards, with or without a marked cell.

## Contest profile
Counting the rectangles or squares in a grid appears verbatim on MATHCOUNTS and AMC 10; chessboard variants, counting those containing a given square, are the common twist.
`,

"handshakes-diagonals": String.raw`
## Key forms
- $\dbinom n2 = \dfrac{n(n-1)}{2}$ — the handshakes among $n$ people, the games in a round robin among $n$ teams, and the segments joining $n$ points
- $\dfrac{n(n-3)}{2}$ — the diagonals of a convex $n$-gon: all the pairs of vertices, less the $n$ sides
- $\dbinom n3$ — the triangles determined by $n$ points with no three on a line
- $\dbinom n4$ — the points where the diagonals of a convex $n$-gon cross, when no three diagonals meet at one point

## Conditions
The people, teams, or points are distinct and each pair is counted once. The triangle count needs no three points on a line, and the crossing count needs a convex polygon with no three diagonals through one point.

## Why it works
Each count chooses a few objects from $n$ without regard to order, which is what $\binom nk$ counts.

A handshake is an unordered pair of people, and so is a game in a round robin, so both number $\binom n2$. A diagonal is a pair of vertices that are not neighbors: of the $\binom n2$ pairs, $n$ are sides, which leaves $$\binom n2 - n = \frac{n(n - 1)}{2} - n = \frac{n(n - 3)}{2}.$$

Equivalently, each vertex has $n - 3$ diagonals, to every vertex except itself and its two neighbors, and each diagonal is counted from both ends. A triangle is a set of three points, and with no three on a line every such set gives a real triangle.

The crossing count is a pairing. Any four vertices of a convex polygon form a quadrilateral whose two diagonals cross exactly once, and every crossing of two diagonals comes from the four endpoints of those diagonals, so crossings and sets of four vertices match one-to-one.

{{figure:crossings}}

## Useful observations
- Counts often run backwards: $45$ handshakes means $\binom n2 = 45$, so $n = 10$.
- When some of the points are collinear, the triples that do not make triangles are subtracted, $\binom k3$ for each line through $k$ of the points.
- When three diagonals of a polygon do meet at one point, as the three long diagonals of a regular hexagon meet at its center, $\binom n4$ overcounts, and the coinciding crossings must be corrected by hand.

## Applications
Handshakes and round-robin schedules, diagonals of polygons, triangles formed by points or by lines, and crossings of chords.

## Contest profile
Six problems here, spread across AMC 10, AMC 12, and AIME, three solved by it alone; two others use it as the total in [[complementary-counting|complementary counting]], counting all triples of points and removing the collinear ones. The crossing count and the collinearity corrections are the AIME-level versions.
`,

"counting-functions": String.raw`
## Key forms
- $k^n$ — the functions from an $n$-element set to a $k$-element set, each of the $n$ inputs independently choosing one of $k$ outputs
- $k(k - 1)\cdots(k - n + 1)$ — the injections, where no output is reused
- $2^n$ — the subsets of an $n$-element set, each element in or out
- $n!$ — the bijections of an $n$-element set to itself

## Conditions
The domain is the set being assigned, so $n$ objects each choosing among $k$ labels gives $k^n$, not $n^k$. Surjections, where every output is used, break the independence and need [[surjections|their own count]].

## Why it works
Each of the $n$ inputs independently selects an output: $k$ options each, multiplied. Injections consume options, so the menu shrinks by one at every step: $k(k - 1)\cdots(k - n + 1)$. Subsets are functions to $\{\text{in}, \text{out}\}$, giving $2^n$.

## Useful observations
- "Assign each object a label" is modeled as a function and the per-object choices multiplied. The direction matters and is the usual slip, so the domain is named before anything is written.
- Injections are the same count with a shrinking menu, which is how they appear in disguise: a sequence of choices where nothing may repeat is an injection whether or not the word is used.
- Surjections are the exception: requiring every label to be used breaks the independence, so the count needs inclusion-exclusion over which labels go unused.

## Applications
Assignments of objects to labels, subset counts, sequences with and without repetition, and arrangements in rooms or boxes.

## Contest profile
$2^n$ subset counts and $k^n$ assignment counts anchor countless problems; recognizing "this is just counting functions" strips away story-problem camouflage.
`,

"pascals-identity": String.raw`
## Key forms
- $\dbinom nk = \dbinom{n-1}{k-1} + \dbinom{n-1}{k}$ — each entry is the sum of the two above it
- $\dbinom nk = \dbinom n{n-k}$ — every row reads the same forwards and backwards
- $\dfrac{\binom n{k+1}}{\binom nk} = \dfrac{n - k}{k + 1}$ — stepping one place along a row multiplies by this ratio

## Conditions
$0 \le k \le n$, with $\binom nk = 0$ outside that range. The ratio form needs $\binom nk \ne 0$, that is $0 \le k < n$.

## Why it works
Condition on one distinguished element: a $k$-subset of the $n$ either contains it, leaving $\binom{n-1}{k-1}$ ways to finish, or does not, leaving $\binom{n-1}{k}$. The two cases do not overlap and cover everything, which is the identity. Symmetry has an equally short reason: choosing the $k$ elements that are in is choosing the $n - k$ that are out.

The ratio comes from the factorials: $\frac{\binom n{k+1}}{\binom nk} = \frac{n!/((k+1)!(n-k-1)!)}{n!/(k!(n-k)!)} = \frac{n - k}{k + 1}$. Combinatorially, a $(k+1)$-subset is built by adding one of the $n - k$ absent elements to a $k$-subset, and it arises from $k + 1$ different $k$-subsets, which is the same fraction.

## Useful observations
- The story-proof reading, fixing one element and splitting on whether it is chosen, is what invents the right split in an unfamiliar problem.
- The recursion builds Pascal's triangle row by row, which is the fastest way to get a whole row by hand and the standard engine for induction proofs about binomial coefficients.
- A stated ratio between adjacent entries becomes a linear equation in $n$ and $k$, and two such conditions pin both. It is also the ratio [[largest-term-ratio|the largest-term method]] asks for, crossing $1$ at $k = \frac{n-1}2$ and so putting the row's peak at $k = \lfloor n/2 \rfloor$.
- Applying the rule repeatedly collapses a sum of consecutive entries into a single coefficient, which is how the [[hockey-stick|hockey stick identity]] telescopes. Symmetry halves the work.

## Applications
Building Pascal's triangle, identities among binomial coefficients, conditions on adjacent entries of a row, and induction proofs about binomials.

## Contest profile
Identity manipulation on the AMC 12 and AIME: an awkward sum is often one Pascal step away from collapsing, and conditioning on an element is a general proof technique worth extracting.
`,

"binomial-row-sums": String.raw`
## Key forms
- $\alt{\sum_{k=0}^{n}\binom nk}{\binom n0 + \binom n1 + \cdots + \binom nn} = 2^n$ — every row of Pascal's triangle sums to a power of $2$
- $\alt{\sum_{k=0}^{n}(-1)^k\binom nk}{\binom n0 - \binom n1 + \binom n2 - \cdots \pm \binom nn} = 0$ for $n \ge 1$ — the alternating sum vanishes
- $\binom n0 + \binom n2 + \binom n4 + \cdots = \binom n1 + \binom n3 + \cdots = 2^{n-1}$ — a set has as many subsets of even size as of odd size
- $\alt{\sum_{k=0}^{n}\binom nk 2^k}{\binom n0 + 2\binom n1 + 4\binom n2 + \cdots + 2^n\binom nn} = 3^n$ — other substitutions give other weighted sums

## Conditions
$n$ is a nonnegative integer; the alternating sum needs $n \ge 1$.

## Why it works
Both identities count subsets: the row sum counts all of them, and the alternating sum compares the even-sized ones with the odd-sized ones.

Each of the $n$ elements is either in a subset or not, so there are $2^n$ subsets, and grouping them by size gives the row sum. Algebraically this is $(1 + 1)^n$ expanded by the Binomial Theorem.

For the alternating sum, pair each subset with the one obtained by toggling element $1$: add it if it is absent, remove it if it is present. Toggling twice gets back the original, so this splits all the subsets into pairs, and each pair has one even-sized and one odd-sized member. So there are equally many of each, $2^{n-1}$, and the alternating sum is $0$. Algebraically it is $(1 - 1)^n = 0$, which needs $n \ge 1$.

{{figure:toggle}}

## Useful observations
- Substituting into $(x + y)^n$ is a general machine for coefficient sums, not just two facts: $x = y = 1$ gives the total, $x = 1$ and $y = -1$ the alternating version, and other values weight the sum, as in $\sum_k \binom nk 2^k = (1 + 2)^n = 3^n$.
- The even/odd split settles parity-constrained subset counts at once: exactly $2^{n-1}$ subsets of an $n$-element set have even size, for any $n \ge 1$.
- When the sum has a factor of $k$ in it, substitution alone does not reach it: use $k\binom nk = n\binom{n-1}{k-1}$, which is [[committee-chair|the committee-chair identity]], or differentiate $(1 + x)^n$ first.

## Applications
Subset counts with a parity condition, sums of binomial coefficients with weights, and the total in complementary counting.

## Contest profile
Almost never alone. It pairs with a [[bijection-method|bijection]] that turns the problem into a count of subsets, and with complementary counting, where $2^n$ is the total; weighted sums by clever substitution, and the base case of the roots-of-unity filter, are the other regular appearances.
`,

"nested-subset-pairs": String.raw`
## Key forms
- $\#\{(A, B) : A \subseteq B \subseteq S\} = 3^n$ for $\lvert S\rvert = n$ — three destinations per element
- $\alt{\sum_{k=0}^{n}\dbinom nk 2^k}{\dbinom n0 2^0 + \dbinom n1 2^1 + \cdots + \dbinom nn 2^n} = 3^n$ — the same count organized by $\lvert B\rvert$
- chains $A_1 \subseteq \cdots \subseteq A_m \subseteq S$ give $(m + 1)^n$
- any condition on $m$ sets that allows $r$ membership patterns per element gives $r^n$

## Conditions
The condition treats every element alike, so the elements choose independently. If the rule singles out particular elements, those are counted separately.

## Why it works
Build the pair element by element rather than set by set. For each element of $S$ there are exactly three consistent possibilities: it belongs to $A$, in which case it belongs to $B$ as well; it belongs to $B$ only; or it belongs to neither. The fourth combination, in $A$ but not $B$, is precisely what $A \subseteq B$ forbids. The elements are independent, so the count is $3^n$.

Organizing the same count by the size of $B$ gives the identity. There are $\binom nk$ sets $B$ of size $k$, and once $B$ is fixed any of its $2^k$ subsets serves as $A$, so the total is $\sum_k\binom nk 2^k$. That is $(1 + 2)^n$ by the Binomial Theorem, so both routes give $3^n$ and each proves the other.

## Useful observations
- Counting by element is immediate, while counting by size leads to a binomial sum that then has to be evaluated, so the element argument gives the answer and the sum is used only if the problem asks for that form.
- A chain of $m$ nested sets inside $S$ gives each element $m + 1$ choices: the first set in the chain it enters, or none at all. Two nested sets is the $m = 2$ case, $3^n$.
- For each element the sets containing it form a string of $m$ yes-or-no answers, and a condition on the sets is a rule about which strings are allowed. For $A \subseteq B \subseteq C$ the allowed strings are $000$, $001$, $011$, $111$, giving $4^n$. For three sets whose union must be all of $S$, every string except $000$ is allowed, giving $7^n$. For three pairwise disjoint sets an element is in at most one of them, again $4$ strings and $4^n$.

## Applications
Ordered pairs or chains of subsets with a containment condition, conditions such as $A \cap B = A$, and any count that can be done for each element independently.

## Contest profile
The AMC and AIME phrasings hide it well: ordered pairs of subsets with a containment condition, or a statement that two sets intersect in one of them, which is the same condition. Any count that can be done for each element independently beats summing [[binomial-row-sums|binomial row sums]] by hand; a solution that evaluates the binomial sum has missed that the element argument was available.
`,

"hockey-stick": String.raw`
## Key forms
- $\alt{\sum_{i=r}^{n}\dbinom ir}{\dbinom rr + \dbinom{r+1}{r} + \cdots + \dbinom nr} = \dbinom{n+1}{r+1}$ — summing down a diagonal of Pascal's triangle
- $\alt{\sum_{k=0}^{m}\dbinom{r+k}{k}}{\dbinom r0 + \dbinom{r+1}{1} + \cdots + \dbinom{r+m}{m}} = \dbinom{r+m+1}{m}$ — the same identity read along the other diagonal
- $k = \dbinom k1$, $k^2 = 2\dbinom k2 + \dbinom k1$, and $k(k+1) = 2\dbinom{k+1}{2}$ — polynomials rewritten in the binomial basis

## Conditions
The lower index is fixed and the upper index runs through consecutive values starting at that lower index, where the first term is $1$.

## Why it works
Telescoping Pascal's rule, $\binom{n+1}{r+1} = \binom{n}{r} + \binom{n}{r+1}$, and expanding the last term repeatedly gives the sum.

Combinatorially, to choose $r + 1$ objects from $\{1, \ldots, n + 1\}$, condition on the largest element chosen: if it is $i + 1$, the other $r$ come from $\{1, \ldots, i\}$ in $\binom ir$ ways, and the cases are the diagonal terms.

## Useful observations
- Any sum of binomial coefficients with a fixed lower index collapses in one step, so recognizing the diagonal is all that is required.
- Its real reach is polynomial sums. $k$, $k^2$, $k^3$ are expressed in the binomial basis, then each piece is summed by the hockey stick separately. That is the systematic route to the power-sum formulas, and unlike memorizing them it extends to any degree.
- The same rewriting handles products: $k(k + 1) = 2\binom{k + 1}{2}$ and $k(k + 1)(k + 2) = 6\binom{k + 2}{3}$, so sums of consecutive-integer products telescope immediately.

## Applications
Sums of binomial coefficients, polynomial sums in the binomial basis, and cumulative counts: the solutions of $x_1 + \cdots + x_k \le n$ are a hockey stick over the exact sums.

## Contest profile
AIME sum evaluations and [[stars-and-bars|stars and bars]] cumulative counts. The largest-element conditioning is reusable everywhere.
`,

"vandermonde": String.raw`
## Key forms
- $\alt{\sum_{k=0}^{r}\binom mk\binom n{r-k}}{\binom m0\binom nr + \binom m1\binom n{r-1} + \cdots + \binom mr\binom n0} = \binom{m+n}{r}$ — choosing $r$ from two groups, sorted by how many come from the first
- $\alt{\sum_{k}\binom{n}{k}^2}{\binom n0^2+\binom n1^2+\cdots+\binom nn^2} = \binom{2n}{n}$ — the $m = n = r$ case, by far the one that appears; choosing $k$ from the first $n$ and $n-k$ from the second is choosing $n$ from all $2n$
- $\alt{\sum_{k}\binom mk\binom nk}{\binom m0\binom n0+\binom m1\binom n1+\cdots} = \binom{m+n}{m}$ — the version with equal bottom indices, from $\binom nk = \binom n{n-k}$
- $\binom{n}{k} = \binom{n}{n-k}$ — the symmetry the squared form leans on, since it turns $\binom{n}{k}\binom{n}{n-k}$ into $\binom{n}{k}^2$

## Conditions
The groups are distinct and disjoint, and $\binom nk = 0$ when $k \gt n$ or $k \lt 0$, so terms outside the range vanish.

## Why it works
Both sides count the committees of $r$ chosen from $m$ men and $n$ women.

The right side counts them directly. The left side sorts them by the number $k$ of men, who can be chosen in $\binom mk$ ways, with the other $r - k$ chosen from the women in $\binom n{r-k}$ ways; every committee has exactly one value of $k$, so the sorted counts add to the total.

Generating functions say the same thing. The coefficient of $x^r$ in $$(1 + x)^m(1 + x)^n = (1 + x)^{m+n}$$ is the sum on the left, from multiplying out the two factors, and $\binom{m+n}{r}$ on the right.

## Useful observations
- Recognizing the shape is the whole skill: two binomial coefficients multiplied, bottom indices adding to a constant, summed over the split. It collapses to a single coefficient.
- It also runs in reverse: when a count naturally splits a group in two, expanding $\binom{m+n}{r}$ into the sum can be what makes the argument work.
- In probability it is why the hypergeometric probabilities add up to $1$: $$\sum_k \frac{\binom mk\binom n{r-k}}{\binom{m+n}{r}} = 1.$$

## Applications
Sums of products of binomial coefficients, sums of squared binomial coefficients, and committee counts split by group.

## Contest profile
Two problems here, both AIME, neither solved by it alone. Typical uses count how often each element appears across pairs of subsets, which produces a sum of squared binomial coefficients, or read a double sum as a single committee count.
`,

"committee-chair": String.raw`
## Key forms
- $k\dbinom nk = n\dbinom{n-1}{k-1}$ — the absorption rule, from choosing a committee and its chair in two orders
- $\alt{\sum_{k=0}^{n}k\dbinom nk = n \cdot 2^{n-1}}{0 \cdot \dbinom n0 + 1 \cdot \dbinom n1 + \cdots + n\dbinom nn = n \cdot 2^{n-1}}$ — the weighted sum
- $\alt{\sum_{k=0}^{n}k^2\dbinom nk = n(n+1)2^{n-2}}{0 + \dbinom n1 + 4\dbinom n2 + \cdots + n^2\dbinom nn = n(n+1)2^{n-2}}$ — the next weight, after writing $k^2 = k(k-1) + k$
- $\dfrac n2$ — the expected size of a random subset of an $n$-element set, this identity divided by $2^n$

## Conditions
$n \ge 1$ and $1 \le k \le n$ for the absorption rule. The sums are over all $k$ from $0$ to $n$, and the terms with $k = 0$ vanish.

## Why it works
Count the pairs (committee, chair) twice: pick the $k$-person committee and then its chair, in $k\binom nk$ ways, or pick the chair first and then the other $k - 1$ members, in $n\binom{n-1}{k-1}$ ways. The two counts are equal.

Summing over $k$ counts all pairs: the chair is chosen first, in $n$ ways, and each of the remaining $n - 1$ people is independently in or out, in $2^{n-1}$ ways. The same sum is also the derivative of $(1 + x)^n$ at $x = 1$.

## Useful observations
- Operationally it is an absorption rule: it removes a factor of $k$ from a [[weighted-binomial-sums|weighted binomial sum]], converting $\sum k\binom nk$ into $n\sum\binom{n-1}{k-1} = n \cdot 2^{n-1}$.
- For a factor of $k^2$ the rule is not applied twice directly. Writing $k^2 = k(k - 1) + k$ and absorbing each piece separately gives $n(n-1)2^{n-2} + n2^{n-1}$. The same trick handles any polynomial weight by expressing it in falling factorials first.
- The story-proof pattern generalizes far beyond this one identity.

## Applications
Weighted binomial sums, the expected size of a random subset, and counts of committees with a distinguished member.

## Contest profile
Weighted binomial sums on AMC 12 and AIME, with a linear or quadratic weight on each term, and expected-size-of-random-subset arguments.
`,

"multinomial-theorem": String.raw`
## Key forms
- $\alt{(x_1 + \cdots + x_m)^n = \sum_{k_1 + \cdots + k_m = n} \dbinom{n}{k_1, \dots, k_m} x_1^{k_1} \cdots x_m^{k_m}}{(x_1 + \cdots + x_m)^n = \cdots + \dfrac{n!}{k_1!\cdots k_m!}\,x_1^{k_1} \cdots x_m^{k_m} + \cdots}$ — the expansion, with one term for each way to split the exponent $n$
- $\dbinom{n}{k_1, \dots, k_m} = \dfrac{n!}{k_1!\,k_2!\cdots k_m!}$ — the multinomial coefficient, also the number of ordered splits of $n$ objects into groups of sizes $k_1, \dots, k_m$
- $m^n$ — the sum of all the coefficients, from setting every $x_i = 1$
- $\dbinom{n + m - 1}{m - 1}$ — the number of terms in the expansion

## Conditions
The exponents $k_i$ are nonnegative integers adding to $n$. For two terms it is the Binomial Theorem, and the coefficients are the usual binomial coefficients.

## Why it works
Expanding $(x_1 + \cdots + x_m)^n$ means picking one term from each of the $n$ brackets and multiplying, so each product corresponds to a word of length $n$ recording the picks.

A word with $k_1$ copies of $x_1$, $k_2$ of $x_2$, and so on produces the monomial $x_1^{k_1}\cdots x_m^{k_m}$, and the number of such words is the number of arrangements of that multiset, $\frac{n!}{k_1!\cdots k_m!}$. Collecting like terms gives that coefficient. With two terms it is the Binomial Theorem, and the count is the one on [[multiset-permutations|arrangements with repeated objects]].

## Useful observations
- To extract a coefficient, the exponent pattern that produces the wanted monomial is found, then the multinomial coefficient is multiplied by each term's own coefficient raised to its power. For $x^3y^2z^2$ in $(x + 2y - z)^7$: $$\frac{7!}{3!\,2!\,2!} \cdot 2^2 \cdot (-1)^2 = 210 \cdot 4 = 840.$$ Forgetting the coefficients of the terms is the usual error.
- If several exponent patterns give the same monomial, as when some terms are powers of the same variable, their contributions are added.
- Setting every $x_i = 1$ gives $m^n$, a check that the coefficients of a full expansion must pass.

## Applications
Coefficients of a given monomial in a trinomial or larger expansion, ordered splits of a set into groups of prescribed sizes, and arrangements of words with repeated letters.

## Contest profile
Four problems here, mostly AMC, none by it alone, and each with a different partner. Coefficient extraction in a trinomial is the standard form, and the same coefficient counts ordered splits of a set into groups of prescribed sizes.
`,

"pascal-parity": String.raw`
## Key forms
- $\#\{k : \binom nk \text{ odd}\} = 2^{s_2(n)}$ — where $s_2(n)$ is the number of $1$-bits of $n$ in binary
- $\binom nk$ is odd exactly when every $1$-bit of $k$ is also a $1$-bit of $n$
- row $2^m - 1$ is entirely odd, and rows with exactly two odd entries are $n = 2^m$

## Conditions
The parity statement is [[lucas-theorem|Lucas' Theorem]] modulo $2$, proved from scratch below. For odd primes the same reasoning works in base $p$; for modulus $4$ or higher powers more than Lucas is needed.

## Why it works
Everything is a computation modulo $2$ in the polynomial $(1 + x)^n$, whose coefficients are the entries of row $n$. The proof turns the row into a product of simple factors and then reads the odd entries off the product.

Step 1, squaring is easy. Since $(1 + x)^2 = 1 + 2x + x^2$, $$(1 + x)^2 \equiv 1 + x^2 \pmod 2.$$ Squaring again gives $(1 + x)^4 \equiv (1 + x^2)^2 \equiv 1 + x^4$, and induction gives, for every $i$, $$(1 + x)^{2^i} \equiv 1 + x^{2^i} \pmod 2.$$

Step 2, split $n$ into its bits. Write $n = \sum_{i \in S}2^i$, where $S$ is the set of positions of the $1$-bits of $n$, so $\lvert S\rvert = s_2(n)$. Then $$(1 + x)^n = \prod_{i \in S}(1 + x)^{2^i} \equiv \prod_{i \in S}\left(1 + x^{2^i}\right) \pmod 2.$$

Step 3, expand the product. It is a sum of terms $x^e$, one for each subset $T \subseteq S$, with exponent $$e = \sum_{i \in T}2^i.$$ Different subsets give different exponents, because binary representations are unique. So no two terms combine, and every coefficient is $0$ or $1$.

Conclusion. The exponents that occur are exactly the numbers whose $1$-bits form a subset of the $1$-bits of $n$. Comparing with $(1 + x)^n = \sum_k\binom nkx^k$, the coefficient $\binom nk$ is odd exactly when $k$ has its $1$-bits among those of $n$. There are $2^{\lvert S\rvert}$ subsets, so $$\#\left\{k : \tbinom nk \text{ odd}\right\} = 2^{s_2(n)}.$$

{{figure:sierpinski}}

The special rows. Row $2^j - 1$ has all $j$ low bits set, so every $k \lt 2^j$ is a submask and all $2^j$ entries are odd. As a product, $$\prod_{i \lt j}\left(1 + x^{2^i}\right) = 1 + x + \cdots + x^{2^j - 1}.$$ Row $2^j$ has a single $1$-bit, so only $k = 0$ and $k = 2^j$ are odd, which is the statement $(1 + x)^{2^j} \equiv 1 + x^{2^j}$ itself.

The Sierpiński picture. It is the same fact: for $r \lt 2^j$, $$(1 + x)^{2^j + r} \equiv \left(1 + x^{2^j}\right)(1 + x)^r \pmod 2.$$ So the odd entries of row $2^j + r$ are those of row $r$, repeated a second time shifted by $2^j$. That self-similarity is the Sierpiński triangle in the figure.

## Useful observations
- The parity of $\binom nk$ depends only on the binary digits, and counting the submasks of $n$ gives $2^{s_2(n)}$ odd entries in row $n$.
- The self-similarity is what makes questions about blocks of even entries easy to see.
- Rows that are entirely odd have every bit set, and rows with two odd entries have only the leading bit set.

## Applications
Counting odd entries in a row, divisibility patterns of binomial coefficients, and the Sierpiński triangle.

## Contest profile
Counting the odd entries of one row, and divisibility-pattern problems about binomial coefficients. Moduli of four or higher powers need more than Lucas, so the tool is not overextended.
`,

"stars-and-bars": String.raw`
## Key forms
- $\dbinom{n + k - 1}{k - 1}$ — the solutions of $x_1 + \cdots + x_k = n$ in nonnegative integers, equivalently the ways to give $n$ identical objects to $k$ labeled groups
- $\dbinom{n - 1}{k - 1}$ — the same with every $x_i \ge 1$, so that no group is empty
- $\dbinom{n - (a_1 + \cdots + a_k) + k - 1}{k - 1}$ — the same with lower bounds $x_i \ge a_i$, after subtracting the bounds out
- $\dbinom{n + k}{k}$ — the solutions of $x_1 + \cdots + x_k \le n$, one extra variable absorbing the slack
- $\dbinom{n + k - 1}{n}$ — the ways to choose $n$ items from $k$ types with repetition allowed, and the number of monomials of degree $n$ in $k$ variables

## Conditions
The objects are identical and the groups are distinguishable. A bound on how large a group may be is not covered by the formulas and needs inclusion-exclusion on top.

## Why it works
Line up the $n$ objects as stars and drop $k - 1$ bars among them; the bars cut the row into $k$ groups, and the sizes of the groups are the $x_i$.

For $x_1 + x_2 + x_3 = 7$, the row $\star\star \mid \star\star\star \mid \star\star$ stands for $2 + 3 + 2$, as in the figure, and the row $\mid \star\star\star\star\star\star\star \mid$ stands for $0 + 7 + 0$: a bar at either end, or two bars side by side, simply makes an empty group. Every solution gives exactly one such row and every row gives exactly one solution.

A row has $n + k - 1$ symbols, and it is decided completely by which $k - 1$ of those positions hold bars. So there are $$\binom{n+k-1}{k-1}$$ rows, and that many solutions.

When every $x_i$ must be at least $1$, no two bars may touch and none may sit at an end. The bars then go into the $n - 1$ gaps between neighboring stars, at most one per gap, which gives $\binom{n-1}{k-1}$. The same answer comes from the first formula by handing each variable its required $1$ in advance and distributing the remaining $n - k$ freely: $$\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}.$$

## Useful observations
- Which of the two basic forms applies depends only on whether empty groups are allowed. If the lower bounds are neither all $0$ nor all $1$, they are subtracted out first, $y_i = x_i - a_i$, and the nonnegative formula is applied to what remains.
- Upper bounds break the picture, because a bound like $x_i \le 4$ is not about empty groups. The count is everything, minus the solutions that break a bound: for each variable that is too large, give it the excess in advance and count what is left, correcting overlaps by inclusion-exclusion.
- The full worked treatment of caps, with the alternating sum and its short terminating range, is on [[stars-bars-upper-bound|the upper-bounds card]].

## Applications
Dice or digits with a fixed total, identical coins or candies handed out to people, monomials of a fixed degree, and multisets of a given size.

## Contest profile
A counting workhorse that rarely stands alone: 3 of the 23 problems tagged here need nothing else, and [[casework-method|casework]] joins it in 6, usually to split a problem into pieces that are each a clean distribution. The recurring disguises are digit sums, identical items given to people, and monomials of a fixed degree in several variables.
`,

"stars-bars-upper-bound": String.raw`
## Key forms
- $\alt{\sum_{j=0}^{\lfloor n/(m+1)\rfloor}(-1)^j\dbinom kj\dbinom{n - j(m+1) + k - 1}{k - 1}}{\dbinom{n+k-1}{k-1} - \dbinom k1\dbinom{n-(m+1)+k-1}{k-1} + \dbinom k2\dbinom{n-2(m+1)+k-1}{k-1} - \cdots}$ — the solutions of $x_1 + \cdots + x_k = n$ with every $0 \le x_i \le m$
- $x_i \ge m + 1$ — the violation of a cap, counted by handing $x_i$ its excess $m + 1$ in advance and distributing the rest freely
- the terms vanish once $j(m + 1) \gt n$, so the sum is short in practice

## Conditions
The $x_i$ are nonnegative integers with a common cap $m$. With different caps the same method works, but each subset of violating variables contributes its own shift.

## Why it works
Violating a cap $x_i \le m$ means $x_i \ge m + 1$: substituting $x_i' = x_i - (m + 1)$ and counting freely gives the number of solutions in which that variable busts. Inclusion-exclusion alternates over which caps are violated, since violations can overlap.

With a common cap $m$ on all $k$ variables this closes up as $\sum_j(-1)^j\binom kj\binom{n - j(m+1) + k - 1}{k - 1}$, and the terms vanish once $j(m + 1) \gt n$.

## Useful observations
- The upper bound is handled by violation rather than by construction. Everything is counted with plain [[stars-and-bars|stars and bars]], then the cases where a chosen variable exceeds $m$ are subtracted, each forced by pre-assigning the overflow and re-counting the remainder.
- Double violations are added back, triple ones subtracted, and so on. The sum terminates quickly because $j$ variables cannot all overflow unless $j(m + 1) \le n$.
- If the bounds differ between variables, each subset of violating variables is tracked individually rather than using the symmetric binomial factor.

## Applications
Bounded dice sums, digit-sum counts with digits capped at $9$, and distribution problems with room capacities.

## Contest profile
Bounded dice sums, digit-sum counts with digits capped at nine (the canonical use), and AIME distribution problems with room capacities.
`,

"balls-boxes-table": String.raw`
## Key forms
- distinct balls into distinct boxes: $k^n$ with no restriction, $\dfrac{k!}{(k - n)!}$ with at most one per box, and $k!\,S(n, k)$ with no box empty
- identical balls into distinct boxes: $\dbinom{n + k - 1}{k - 1}$ with no restriction, $\dbinom kn$ with at most one per box, and $\dbinom{n - 1}{k - 1}$ with no box empty
- distinct balls into identical boxes: $\alt{\sum_{j=1}^{k}S(n, j)}{S(n, 1) + S(n, 2) + \cdots + S(n, k)}$ with no restriction, $1$ if $n \le k$ (and $0$ otherwise) with at most one per box, and $S(n, k)$ with no box empty
- identical balls into identical boxes: $p_{\le k}(n)$ with no restriction, $1$ if $n \le k$ (and $0$ otherwise) with at most one per box, and $p_k(n)$ with no box empty, the partitions of $n$ into at most $k$ parts and into exactly $k$ parts

## Conditions
Two yes-or-no questions and one three-way choice pick the cell: whether the balls are distinguishable, whether the boxes are, and what is required of the boxes (no restriction, at most one ball per box, or no box empty). The same $n$ balls and $k$ boxes give twelve different counts.

## Why it works
Each row of the table is a different bijection, and the four cases differ only in what "the same distribution" means.

Distinct balls into distinct boxes is a free choice per ball, giving $k^n$. Requiring no empty box makes it a surjection, counted by inclusion-exclusion over the boxes left unused, and requiring at most one ball per box makes it an injection, the falling factorial $k(k - 1)\cdots(k - n + 1)$.

Identical balls into distinct boxes is [[stars-and-bars|stars and bars]]: every arrangement of $n$ stars and $k - 1$ bars is exactly one distribution. With every box nonempty, one ball goes into each box first and the remaining $n - k$ are distributed freely, giving $\binom{n-1}{k-1}$. With at most one per box, only the occupied boxes are chosen, $\binom kn$.

Unlabeled boxes mean partitioning the balls into groups with no order among the groups: for distinct balls, the Stirling number $S(n, k)$. Gluing labels onto the boxes in $k!$ ways gives the surjection count $k!\,S(n, k)$.

With nothing labeled, a distribution is a way to write $n$ as a sum of positive parts, an integer partition, which has no closed form.

## Useful observations
- Two yes-or-no questions are answered before a single number is written: are the balls distinguishable, and are the boxes? A third picks the column: no restriction, at most one ball per box, or every box nonempty? Confusing identical with distinct is the most common counting mistake there is.
- A per-box minimum $m_i$ is handled by handing out the minimums first and distributing the rest freely, the substitution $x_i \mapsto x_i - m_i$. For $20$ identical balls into $4$ distinct boxes with each box at least $3$: place $3$ in each box and distribute the remaining $8$ freely, $\binom{11}{3} = 165$.
- An upper cap $c$ needs inclusion-exclusion: all distributions, minus those where some box overflows (that box is given $c + 1$ balls first), alternating signs. For $9$ balls into $3$ boxes each holding at most $4$: $\binom{11}{2} - 3\binom62 = 55 - 45 = 10$, the two-overflow term being impossible.
- When both bounds apply, the minimum substitution comes first, which also shifts the cap. For $12$ balls into $3$ boxes each between $2$ and $5$, $y_i = x_i - 2$ gives $y_1 + y_2 + y_3 = 6$ with each $y_i \le 3$, so $\binom82 - 3\binom42 = 28 - 18 = 10$.
- If the box sizes are fixed in advance, none of the table applies: putting exactly $n_1, \ldots, n_k$ distinct balls into distinct boxes is the multinomial coefficient.

## Applications
Distributing candies, people, or objects into bags, teams, or boxes under every labeling convention.

## Contest profile
The two-question checklist comes first. The AMC and AIME sample every cell of the table: identical candies into distinct bags for stars and bars, distinct people into identical teams for Stirling numbers, coin and score totals for partitions. They love bolting a minimum or a cap on top, which the substitution and inclusion-exclusion recipes clear away.
`,

"pie": String.raw`
## When to use
"How many integers up to $1000$ are divisible by none of $2$, $3$ and $5$", "how many seatings leave nobody in their own seat", "how many functions are onto": counts of objects that avoid several properties, where each property and each overlap of properties is easy to count. It often follows complementary counting, which turns "at least one" into "none".

If the properties can never hold together, plain addition is enough, and if the overlaps are hard to count, casework on how many properties hold may be shorter.

## How
1. Name the bad properties $A_1, \ldots, A_n$.
2. Count the objects with each property, each pair of properties, each triple, and so on.
3. Combine these with alternating signs to get the number with at least one bad property.
4. Subtract from the total to get the number with none.
5. When every intersection of $j$ properties has the same size $N_j$, use the symmetric form $\binom n1 N_1 - \binom n2 N_2 + \binom n3 N_3 - \cdots$.

Integers from $1$ to $100$ divisible by none of $2$, $3$, $5$: the multiples number $50 + 33 + 20 = 103$, the multiples of $6$, $10$, $15$ number $16 + 10 + 6 = 32$, and the multiples of $30$ number $3$. So $103 - 32 + 3 = 74$ are divisible by at least one of them, and $100 - 74 = 26$ by none.

## Why it works
An object with exactly $t \ge 1$ of the bad properties is counted $\binom t1$ times among the singles, $\binom t2$ times among the pairs, and so on, so the alternating sum counts it $\binom t1 - \binom t2 + \cdots \pm \binom tt = 1$ time, since $(1 - 1)^t = 0$. Objects with none of the properties are not counted at all. The Principle of Inclusion-Exclusion card proves the formula in full; the method's work is choosing properties whose intersections are easy to count.

{{figure:venn-2-3-5}}

## Formulas it uses
- [[inclusion-exclusion]]: the formula itself, $|A_1 \cup \cdots \cup A_n| = \sum |A_i| - \sum |A_i \cap A_j| + \cdots$, and its symmetric form.
- [[permutations-combinations]]: the sizes of the intersections, usually simple products such as $(n - j)!$ for arrangements that fix $j$ chosen items.

## Common traps
- Choosing properties whose intersections are hard to count; rephrase until each intersection is a product or a floor.
- Stopping after the pairs when triple overlaps are possible.
- Using the symmetric form when the intersections of one order do not all have the same size.

## Contest profile
Usually the counting engine of an AIME problem, set up after complementary counting turns the question into avoiding several properties.
`,

"derangements": String.raw`
## Key forms
- $\alt{D_n = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}}{D_n = n!\left(1 - \frac1{1!} + \frac1{2!} - \cdots + \frac{(-1)^n}{n!}\right)}$ and $D_n = \left[\dfrac{n!}{e}\right]$, the nearest integer — the permutations of $n$ objects with no fixed point
- $D_n = (n - 1)(D_{n-1} + D_{n-2})$ and $D_n = nD_{n-1} + (-1)^n$ — the recurrences
- the first values are $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$, and $D_6 = 265$, worth knowing by heart because small cases come up directly
- $\dbinom nk D_{n-k}$ — the permutations with exactly $k$ fixed points

## Conditions
A derangement moves every object. As $n$ grows the probability that a random permutation is a derangement tends to $\frac1e$, and is already within $\frac{1}{(n+1)!}$ of it for the nearest-integer formula.

## Why it works
[[pie|Inclusion-exclusion]] over the events "object $i$ stays fixed" gives $D_n = \sum_j (-1)^j\binom nj(n - j)! = n!\sum_j \frac{(-1)^j}{j!}$, the truncated series of $e^{-1}$, whence the nearest-integer form.

The recurrence $D_n = (n - 1)(D_{n-1} + D_{n-2})$ conditions on where object $1$ goes: to one of $n - 1$ positions $j$, and then either object $j$ goes to position $1$, leaving a derangement of the other $n - 2$, or it does not, leaving a derangement of $n - 1$ objects with $j$ playing the role of $1$.

## Useful observations
- The setup is recognized as "no object in its own place": hats returned to the wrong owners, letters in wrong envelopes, a permutation with no fixed point.
- The nearest-integer formula is the fastest route for a specific $n$: compute $\frac{n!}{e}$ and round. It is not an approximation but exact, which makes it safe under time pressure.
- The recurrence is the one to use when the problem is a derangement variant, since its derivation adapts to modified conditions in a way the closed form does not.
- For "exactly $k$ fixed points", the $k$ fixed objects are chosen and the rest deranged, giving $\binom nkD_{n-k}$.

## Applications
Hat checks, mismatched letters and envelopes, seatings in which nobody takes their own seat, and permutations with a prescribed number of fixed points.

## Contest profile
Hat checks, mismatched letters and envelopes, and "no one gets their own" scenarios on AMC and AIME. The exactly-$k$-fixed-points formula is the standard follow-up question.
`,

"catalan-numbers": String.raw`
## Key forms
- $C_n = \dfrac{1}{n + 1}\dbinom{2n}{n} = \dbinom{2n}{n} - \dbinom{2n}{n + 1}$ — the $n$th Catalan number
- the values worth recognizing on sight are $1, 1, 2, 5, 14, 42, 132, 429, 1430$ for $n = 0$ through $8$, so any guessed count can be checked by hand against the first few
- $\alt{C_{n+1} = \sum_{i=0}^{n} C_iC_{n-i}}{C_{n+1} = C_0C_n + C_1C_{n-1} + \cdots + C_nC_0}$ — the recurrence, from the first return to the diagonal
- balanced parenthesizations of $n$ pairs, monotone lattice paths from $(0, 0)$ to $(n, n)$ staying weakly below the diagonal, triangulations of an $(n + 2)$-gon, and binary trees with $n$ nodes — all counted by $C_n$

## Conditions
The structure is built by nesting or by never letting one running count fall behind another. The number of triangulations is $C_n$ for a convex polygon with $n + 2$ sides.

## Why it works
[[reflection-principle|Reflection principle]]: monotone paths crossing the diagonal biject, by reflecting after the first violation, with paths to a shifted endpoint, giving $\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$.

The recurrence $C_{n+1} = \sum C_iC_{n-i}$ conditions on the first return to the diagonal: what happens before the return and after it are independent smaller structures.

## Useful observations
- The skill is recognition rather than computation: whenever a structure is built by nesting or by never letting one running count fall behind another, it is Catalan.
- To confirm a guess, the first few values are computed by hand and compared with $1, 1, 2, 5, 14$. That check is faster than finding the bijection and almost always settles it.
- Two derivations are worth keeping. The subtraction form comes from the reflection principle, all paths minus the bad ones. The convolution recurrence comes from splitting at the first return, and it is the one that generalizes when the problem is Catalan-like but not exactly Catalan.

## Applications
Balanced brackets, lattice paths below a diagonal, triangulations, binary trees, and non-crossing pairings.

## Contest profile
The values $1, 2, 5, 14, 42, 132, 429, 1430$ should be recognizable on sight. AIME problems rarely say "Catalan": they describe a non-crossing or non-negative-partial-sum condition and expect the identification.
`,

"ballot-problem": String.raw`
## Key forms
- $\dfrac{a - b}{a + b}$ — the probability that candidate $A$, with $a$ votes, is strictly ahead throughout a random count against $B$, with $b \lt a$ votes
- $\dfrac{a - b + 1}{a + 1}$ — the probability that $A$ is never behind, ties allowed
- the boundary case $a = b$ is the Catalan count

## Conditions
Every ordering of the $a + b$ votes is equally likely. The two versions, strictly ahead and never behind, give different answers, and problems exploit the distinction.

## Why it works
The cycle lemma or the reflection principle: bad sequences, where $B$ ties or leads at some point, are in bijection with sequences starting with a $B$-vote, which gives the clean $\frac{a-b}{a+b}$ fraction of orderings.

The reflection argument is the one to reproduce: any ordering where the counts tie can be reflected before the first tie, so the bad orderings biject with the ones starting with a $B$, and the subtraction gives the fraction.

## Useful observations
- The shape is a running-total condition: one count must stay ahead of another throughout a random ordering. Vote counts are the classic dressing, but queues with correct change and lattice paths above a line are the same problem.
- The version asked for has to be checked: "always strictly ahead" gives $\frac{a-b}{a+b}$, while "never behind" gives $\frac{a-b+1}{a+1}$.

## Applications
Vote counting, queues with correct change, and lattice paths staying above a line.

## Contest profile
Vote-counting and queue problems on the AIME; also the engine behind Catalan path counts, the $a = b$ boundary case. Fluency with the reflection principle transfers to many "stay above the line" problems.
`,

"burnsides-lemma": String.raw`
## Key forms
- $\alt{\dfrac1{|G|}\sum_{g \in G}|\mathrm{Fix}(g)|}{\dfrac{|\mathrm{Fix}(g_1)| + |\mathrm{Fix}(g_2)| + \cdots + |\mathrm{Fix}(g_{|G|})|}{|G|}}$ — the number of orbits, as the average over the symmetries $g$ of the arrangements each one leaves unchanged
- $|\mathrm{Fix}(g)| = k^{c(g)}$ — with $k$ colors, where $c(g)$ is the number of cycles in which $g$ moves the positions, since every cycle must be a single color
- rotation by $d$ places on a ring of $n$ positions has $\gcd(n, d)$ cycles — the subcount behind every necklace problem
- $\dfrac{k^6 + 3k^4 + 12k^3 + 8k^2}{24}$ — the colorings of a cube's faces with $k$ colors, up to rotation

## Conditions
$G$ is a finite group of symmetries acting on a finite set of arrangements, and two arrangements count as the same exactly when some element of $G$ carries one to the other.

The group is part of the problem. Rotations alone suit an object held in place, and reflections join the group when flipping the object over gives something indistinguishable, as with a bracelet that can be turned over. Burnside counts orbits only; colorings with a prescribed number of each color need [[polya-enumeration|Pólya enumeration]].

## Why it works
Count the pairs made of a symmetry and a coloring it fixes, in two ways.

Summing over the symmetries gives $\sum_g|\mathrm{Fix}(g)|$. Summing over the colorings instead, each coloring is fixed by exactly $\frac{|G|}{\text{orbit size}}$ symmetries, because the symmetries carrying it to each member of its orbit are equally many. So the colorings in one orbit contribute $$\text{orbit size} \times \frac{|G|}{\text{orbit size}} = |G|$$ pairs between them, whatever the orbit, and the total is $|G|$ times the number of orbits.

A coloring is fixed by $g$ exactly when $g$ never moves a position to one of a different color, that is, when every cycle of $g$ is one color, which gives $|\mathrm{Fix}(g)| = k^{c(g)}$.

{{figure:rotations}}

## Useful observations
- The count is of what each symmetry fixes, never of the colorings themselves, and that is what makes the overcount cancel exactly.
- The sum over the group must be a multiple of $|G|$, so a non-integer average means a miscounted fixed set.
- The cube's $24$ rotations sort by cycle type on the faces. The identity fixes $k^6$; the six quarter turns about face axes fix $k^3$ each; the three half turns about face axes fix $k^4$ each; the eight third turns about vertex axes fix $k^2$ each; the six half turns about edge axes fix $k^3$ each. That sums to $k^6 + 3k^4 + 12k^3 + 8k^2$, and with $k = 2$ the cube has $\frac{64 + 48 + 96 + 32}{24} = 10$ colorings.

## Applications
Necklaces and bracelets, colorings of cubes and other solids, boards and tilings counted up to rotation, and structures counted up to relabeling.

## Contest profile
Five problems here, four of them AIME, one solved by it alone; two combine it with [[constructive-counting|constructive counting]] of the fixed colorings. AIME usually needs only rotations, while flippable physical objects need the reflections too. The cube's $24$ rotations and their cycle structures are worth working out once in advance.
`,

"stirling-bell": String.raw`
## Key forms
- $S(n, k) = k\,S(n-1, k) + S(n-1, k-1)$ — the number of ways to partition $n$ labeled objects into $k$ nonempty unlabeled groups
- $\alt{B_n = \sum_k S(n, k)}{B_n = S(n, 1) + S(n, 2) + \cdots + S(n, n)}$ — the Bell numbers, all set partitions: $1, 1, 2, 5, 15, 52, 203, \ldots$
- $k!\,S(n, k)$ — the surjections from $n$ objects onto $k$ labeled outputs
- $\alt{B_{n+1} = \sum_k\dbinom nk B_k}{B_{n+1} = \dbinom n0B_0 + \dbinom n1B_1 + \cdots + \dbinom nnB_n}$ — the recurrence for Bell numbers

## Conditions
The objects are labeled and the groups are unlabeled and nonempty. Labeling the groups multiplies by $k!$, and making the objects identical instead gives integer partitions.

## Why it works
The recursion for $S(n, k)$ conditions on element $n$: either it forms its own block, leaving $S(n-1, k-1)$ ways to partition the rest, or it joins one of the $k$ blocks of a partition of the other $n - 1$ elements, in $k\,S(n-1, k)$ ways. Bell numbers sum over all block counts.

The Bell recurrence comes from choosing the block containing a fixed element: if that block has the fixed element and $j$ others chosen in $\binom nj$ ways, the remaining $n - j$ elements are partitioned freely.

## Useful observations
- The recurrence is the practical tool and its derivation says how to adapt it: the last element either joins one of the $k$ existing blocks or forms a block of its own.
- The distinction between labeled and unlabeled decides which count is needed: objects labeled and blocks unlabeled gives $S(n, k)$; labeling the blocks as well multiplies by $k!$ and gives surjections; making the objects identical instead gives integer partitions.
- Bell numbers answer "how many ways to partition into any number of blocks."

## Applications
Partitions of a set into groups, counts of surjections, and "partition $5$ students into study groups" questions.

## Contest profile
Partitioning a group of students into study groups, where the wording decides between a Bell number and a Stirling number, and surjection counts. The labeled versus unlabeled distinction, Stirling versus surjection, is the tested subtlety.
`,


"non-adjacent-selection": String.raw`
## Key forms
- $\dbinom{n - k + 1}{k}$ — the ways to choose $k$ of $n$ objects in a row with no two chosen ones adjacent
- $\dfrac{n}{n - k}\dbinom{n - k}{k}$ — the same around a circle, where the first and last are also neighbors
- $\dbinom{n - (k - 1)(d - 1)}{k}$ — in a row with chosen objects at least $d$ apart
- $\dbinom nk - \dbinom{n - k + 1}{k}$ — at least two chosen ones adjacent, by complement

## Conditions
The objects are in a line or around a circle and are distinguishable by position. The formulas need $n - k + 1 \ge k$ for a row and $n \ge 2k$ for a circle, otherwise the count is $0$.

## Why it works
Putting the chosen objects into different gaps between the unchosen ones is exactly the same as choosing a set with no two neighbors.

In a row, the $n - k$ unchosen objects leave $n - k + 1$ gaps: one between each neighboring pair and one at each end. Putting each chosen object into a different gap guarantees an unchosen object between any two chosen ones, and every non-adjacent choice arises this way from exactly one set of gaps. So there are $\binom{n - k + 1}{k}$.

{{figure:gaps}}

For a circle, split on whether a fixed object, say object $1$, is chosen. If it is, its two neighbors are not, and the other $k - 1$ come from a row of $n - 3$, giving $\binom{n - k - 1}{k - 1}$. If it is not, the rest form a row of $n - 1$, giving $\binom{n - k}{k}$. Since $\binom{n - k - 1}{k - 1} = \frac{k}{n - k}\binom{n - k}{k}$, the two cases add up to $\frac{n}{n - k}\binom{n - k}{k}$.

## Useful observations
- The condition is not attacked directly: the unchosen objects are laid out first and the gaps chosen. For $3$ chairs of $8$ in a row, the $5$ unchosen chairs leave $6$ gaps, so there are $\binom63 = 20$ ways.
- For "at least $d$ apart" rather than merely not adjacent, $d - 1$ spacers go into each inner gap first.
- The circular formula is the one to know by heart, since deriving it under time pressure invites an off-by-one error.

## Applications
Seats with no two neighbors taken, lamps with no two adjacent lit, committees with no two neighbors, and strings with no two adjacent ones.

## Contest profile
Almost never alone; the count often becomes a [[basic-probability|probability]] by dividing by $\binom nk$.
`,

"partitions": String.raw`
## Key forms
- $p(n)$: $1, 2, 3, 5, 7, 11, 15, 22, 30, 42, \ldots$ for $n = 1, 2, \ldots$ — the number of partitions of $n$, ways of writing $n$ as a sum of positive integers when order does not matter
- $2^{n-1}$ — the number of compositions of $n$, where order does count
- $\dbinom{n - 1}{k - 1}$ — the compositions of $n$ into exactly $k$ parts
- partitions of $n$ into at most $k$ parts $=$ partitions of $n$ with every part at most $k$ — by reflecting the Ferrers diagram
- partitions into odd parts $=$ partitions into distinct parts — Euler's Theorem
- $\alt{\prod_{k \ge 1}\dfrac1{1 - x^k}}{\dfrac{1}{(1-x)(1-x^2)(1-x^3)\cdots}}$ — the generating function that counts all partitions

## Conditions
The parts are positive integers. Partitions ignore order and compositions do not, and the two counts are very different, so which one a problem asks for is the first thing to decide.

## Why it works
Compositions are easy because order makes every choice independent. Write $n$ as $n$ ones in a row; a composition is a choice, at each of the $n - 1$ gaps, of whether to break there, so there are $2^{n-1}$.

Partitions ignore order, which destroys that independence, so there is no formula. What they have instead is a picture, the Ferrers diagram, with one row of dots for each part, longest first. Reflecting it across its diagonal swaps rows and columns, so it matches the partitions with at most $k$ parts with the partitions whose parts are at most $k$.

{{figure:conjugate}}

Euler's Theorem comes from splitting parts. An odd part repeated $m$ times regroups, by writing $m$ in binary, into distinct parts, and every distinct part is an odd number times a power of $2$, so the process runs backwards and the two kinds of partitions are equally many.

## Useful observations
- For small $n$, partitions are listed in decreasing order of the largest part to avoid repeats.
- With a restriction on the parts, the generating function is used with factors dropped: leaving out the factor for $x^k$ forbids the part $k$. Conjugation turns a hard restriction into an easy one, since at most $k$ parts is the same count as parts at most $k$.
- Compositions turn up in disguise as the halves of a palindrome or the jump sequences of a frog.

## Applications
Counting sums with or without order, partitions under a parity or size restriction, and compositions in disguise.

## Contest profile
Three problems here, two AIME and one AMC 12, none solved by it alone. Typical uses count compositions in disguise and partitions under a parity or size restriction, alongside [[stars-and-bars|stars and bars]] and [[casework-method|casework]].
`,

"surjections": String.raw`
## Key forms
- $\alt{\sum_{i=0}^{k} (-1)^i \dbinom{k}{i} (k - i)^n}{k^n - \dbinom k1 (k-1)^n + \dbinom k2 (k-2)^n - \cdots}$ — the number of functions from $n$ inputs onto $k$ outputs, with every output used
- $k!\,S(n, k)$ — the same count, as a partition of the inputs into $k$ nonempty blocks followed by an assignment of the blocks to the outputs
- $2^n - 2$ for $k = 2$, and $3^n - 3 \cdot 2^n + 3$ for $k = 3$ — the small cases that come up most
- $k^n = \alt{\sum_j \dbinom kj \operatorname{surj}(n, j)}{\dbinom k1 \operatorname{surj}(n, 1) + \dbinom k2 \operatorname{surj}(n, 2) + \cdots}$ — every function is a surjection onto exactly the outputs it uses

## Conditions
The inputs and the outputs are distinguishable. There are no surjections when $n \lt k$, and for $n = k$ they are the $k!$ bijections.

## Why it works
Counting the functions that miss no output is a job for [[pie|inclusion–exclusion]] over the set of outputs that are missed.

Start with all $k^n$ functions. For each output, the functions that avoid it number $(k-1)^n$, so subtract $\binom k1 (k-1)^n$. A function missing two outputs has been subtracted twice, so add back $\binom k2 (k-2)^n$, and so on, alternating until every overlap is corrected. That is $\sum_{j=0}^{k}(-1)^j\binom kj(k-j)^n$.

For the second form, a surjection splits the $n$ inputs into $k$ nonempty groups, one for each output. The number of ways to split is the [[stirling-bell|Stirling number of the second kind]] $S(n, k)$, and matching the groups to the $k$ labeled outputs can be done in $k!$ ways.

## Useful observations
- No product formula exists, because requiring every output to be used destroys the independence between inputs. That is why this needs inclusion–exclusion while counting plain functions does not.
- The Stirling form is often faster when $k$ is small, since it separates "how are the inputs grouped" from "which output does each group take".
- It is the entry in [[balls-boxes-table|the twelvefold way]] for distinguishable balls into distinguishable boxes with none empty.
- Classifying every function by the outputs it uses gives $k^n = \sum_j \binom kj \operatorname{surj}(n, j)$, a check on the numbers: for $n = 3$ and $k = 2$, $8 = 0 + 2 \cdot 1 + 1 \cdot 6$.

## Applications
Mailboxes that each get at least one letter, colorings that use every color, tasks assigned so that no worker is idle, and groups that must all be nonempty.

## Contest profile
Mailboxes that must each receive a letter, colorings in which every color is used, and groups that may not be left empty are all recurring AMC and AIME shapes. The formula plus fluency with the small cases handles essentially all of them.
`,

"permutation-cycle-structure": String.raw`
## Key forms
- $\operatorname{ord}(f) = \operatorname{lcm}$ of the cycle lengths — so $f^{\,k} = \mathrm{id}$ exactly when every cycle length divides $k$, which turns a condition on the function into a condition on a partition of $n$
- $\alt{\dfrac{n!}{\prod_c c^{m_c} m_c!}}{\dfrac{n!}{1^{m_1}m_1!\cdot 2^{m_2}m_2!\cdots}}$ permutations have $m_c$ cycles of each length $c$ — divide by $c$ per cycle, since a cycle can be written starting anywhere, and by $m_c!$ because equal-length cycles are interchangeable
- $f = f^{-1}$ means every cycle has length $1$ or $2$ — an involution, the $k = 2$ case, counted by $\alt{\sum_j \binom{n}{2j}(2j-1)!!}{1+\binom n2\cdot 1+\binom n4\cdot 3+\binom n6\cdot 15+\cdots}$
- a single $c$-cycle on a chosen set of $c$ elements can be written $(c-1)!$ ways — the [[circular-permutations|circular arrangement]] count, which is where the $c^{m_c}$ comes from

## Conditions
$f$ is a bijection of a finite set to itself. A function that is not one-to-one has no cycle decomposition of this kind, because its orbits can run into a cycle from outside. Fixed points are cycles of length $1$ and take part in the $\operatorname{lcm}$ without changing it.

## Why it works
Following an element must lead back to it, and the loops that result do not interact.

Start at $x$ and iterate. The set is finite, so some value repeats, say $f^{\,i}(x) = f^{\,j}(x)$ with $i \lt j$ and $i$ as small as possible. If $i$ were positive, $f$ being one-to-one would give the earlier repeat $f^{\,i-1}(x) = f^{\,j-1}(x)$, so $i = 0$ and the first repeat is $x$ itself. The orbit closes into a cycle, and repeating on what is left splits the whole set into disjoint cycles.

{{figure:cycles}}

Applying $f$ turns every cycle one step. A cycle of length $c$ is back in place after exactly the multiples of $c$ steps, so all of them are back at once after a common multiple of the lengths. The first such time is the $\operatorname{lcm}$, and $f^{\,k} = \mathrm{id}$ exactly when every length divides $k$.

The counting formula comes from writing permutations down. List the $n$ elements in a row, in $n!$ ways, and cut the row into consecutive blocks of the chosen lengths, each block a cycle. A $c$-cycle is written $c$ times, once for each starting point, and equal-length cycles can be listed in any of $m_c!$ orders, so dividing by $\prod_c c^{m_c} m_c!$ counts each permutation once.

## Useful observations
- A condition on an iterate becomes a list of allowed cycle lengths at once: $$f^{\,k}(x) = x \text{ for every } x \iff \text{every cycle length divides } k.$$ The count is then a sum over the partitions of $n$ into allowed parts, each type counted by the formula.
- The largest order of a permutation of $n$ elements is the largest $\operatorname{lcm}$ of a partition of $n$; for $n = 8$ it is $15$, from $3 + 5$.
- Parity can be read off the cycles: a $c$-cycle is a product of $c - 1$ swaps, so a permutation is even exactly when it has an even number of cycles of even length.
- Moving $k$ places at a time around $n$ positions splits them into $\gcd(n, k)$ cycles, each of length $\frac{n}{\gcd(n, k)}$. A position returns after $m$ steps exactly when $n$ divides $mk$, which first happens at $m = \frac{n}{\gcd(n, k)}$.

## Applications
Repeated application of a function or a shuffle, the order of a permutation, handshake rings and other arrangements that are cycle structures in disguise, and stepping around a ring of points.

## Contest profile
Four problems here, all AIME, none solved by it alone, and three of them finish with [[casework-method|casework]] over cycle types. The standard shape counts the functions whose repeated application returns every element to itself, where the allowed cycle lengths are the divisors of the number of applications.

Variations forbid every cycle shorter than some length or ask about stepping around a ring. [[derangements|Derangements]] ask about fixed points instead, [[burnsides-lemma|Burnside's Lemma]] averages over cycle structure, and counting by the number of cycles rather than their lengths is [[stirling-first-kind|Stirling numbers of the first kind]].
`,

"stirling-first-kind": String.raw`
## Key forms
- $c(n, k)$ counts the permutations of $n$ elements with exactly $k$ cycles
- $c(n, k) = (n - 1)\,c(n-1, k) + c(n-1, k-1)$
- $\alt{x(x + 1)\cdots(x + n - 1) = \sum_k c(n, k)\,x^k}{x(x+1)(x+2)\cdots(x+n-1) = c(n,1)x + c(n,2)x^2 + \cdots + c(n,n)x^n}$
- the row sums are $n!$, and the chance that a random permutation is one single cycle is $\dfrac1n$

## Conditions
These are the unsigned numbers; the signed ones come from the falling factorial. They are different from the Stirling numbers of the second kind, which count set partitions.

## Why it works
Permutations decompose uniquely into disjoint cycles, and $c(n, k)$ counts those with exactly $k$ cycles. For the recursion, element $n$ either forms a cycle by itself, giving $c(n-1, k-1)$, or is inserted after one of the $n - 1$ existing elements inside the cycles, giving $(n - 1)\,c(n-1, k)$.

## Useful observations
- There are two readings: algebraically, the coefficients when a rising factorial is expanded into powers; combinatorially, permutations counted by cycle number.
- The recursion follows the same last-element argument as the second-kind numbers, with multiplier $n - 1$ in place of $k$.
- The row sum $n!$ is the quickest check on a computed row.

## Applications
Cycle-structure problems such as dance circles and function-iteration orbits, and probabilities about the cycles of a random permutation.

## Contest profile
Cycle-structure counts and random-permutation probability questions.
`,

"necklace-formula": String.raw`
## Key forms
- $\alt{\dfrac1n\sum_{d \mid n}\varphi(d)\,k^{n/d}}{\dfrac{\varphi(d_1)k^{n/d_1} + \varphi(d_2)k^{n/d_2} + \cdots}{n}}$ over the divisors $d_i$ of $n$ — the number of colorings of $n$ beads in a ring with $k$ colors, up to rotation
- rotation by $j$ positions has $\gcd(n, j)$ cycles, so it fixes $k^{\gcd(n, j)}$ colorings
- for prime $n = p$ the count is $\dfrac{k^p + (p - 1)k}{p}$, which is an integer, so $p \mid k^p - k$

## Conditions
Rotations alone are the symmetries. If flips also count as the same arrangement, the group is dihedral and reflection terms are added: $n$ of them, with the count depending on whether $n$ is odd or even.

## Why it works
This is Burnside's Lemma for the cyclic group of rotations. Rotation by $j$ positions splits the $n$ beads into $\gcd(n, j)$ cycles, each of which must be one color to be fixed, so it fixes $k^{\gcd(n, j)}$ colorings.

Group the rotations by $g = \gcd(n, j)$. The number of $j \in \{0, \ldots, n - 1\}$ with $\gcd(n, j) = g$ is $\varphi(n/g)$. Writing $d = n/g$, the average over the $n$ rotations is $\frac1n\sum_{d \mid n}\varphi(d)k^{n/d}$.

For $n = p$ prime, the identity rotation fixes $k^p$ and each of the other $p - 1$ rotations fixes $k$, so the count is $\frac{k^p + (p - 1)k}{p}$. A count of orbits is an integer, so $p \mid k^p - k$, which is [[fermats-little-theorem|Fermat's Little Theorem]].

## Useful observations
- The grouping by order is what makes the sum short; for a specific small $n$ it is often faster to list the rotations directly.
- If flips count too, the reflection terms depend on the parity of $n$, since the axes pass through beads or between them.

## Applications
Circular binary strings up to rotation, bead necklaces, and "distinguishable up to rotation" counts.

## Contest profile
Circular strings and bead necklaces up to rotation. The prime-length case doubles as a proof of Fermat's Little Theorem.
`,


"basic-probability": String.raw`
## Key forms
- $P(A) = \dfrac{\#\text{favorable}}{\#\text{total}}$ — when every outcome is equally likely
- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ — "$A$ or $B$": add, then remove the overlap counted twice
- $P(\text{not } A) = 1 - P(A)$ — the complement
- $P(A \cap B) = P(A)\,P(B)$ — for independent events only

## Conditions
Everything above except the last line needs the outcomes to be equally likely; when they are not, rebuild the sample space from a finer list that is. The product rule needs the events to be independent.

## Why it works
If all the outcomes are equally likely, each one holds the same share of the total probability, so an event's probability is just how many shares it holds.

Suppose there are $N$ equally likely outcomes. Their probabilities add up to $1$ and are all the same, so each one is $\frac1N$. An event made of $k$ of them therefore has probability $k \cdot \frac1N = \frac kN$, which is favorable over total.

The union rule is a counting fact divided by $N$. Counting the outcomes in $A$ and then the outcomes in $B$ counts every outcome in both of them twice, so $|A \cup B| = |A| + |B| - |A \cap B|$, and dividing by $N$ gives the rule. With three or more events the same correction becomes [[pie|inclusion-exclusion]]. The complement rule is the special case where $A$ and "not $A$" never overlap and together cover every outcome, so their probabilities add to $1$.

When the outcomes are not equally likely, none of this applies. The sums $2, 3, \ldots, 12$ of two dice are eleven outcomes, but a sum of $7$ happens six ways and a sum of $2$ only one, so they do not share the probability equally. The fix is to go back to a finer list that is equally likely, here the $36$ ordered pairs, and count there.

## Useful observations
- Choosing the sample space so that a single count answers the question is most of the work; the union rule handles "or" and the complement handles "at least one".
- The complement is almost always shorter, because "none" factors into independent choices while "at least one" does not.
- Probabilities multiply only for independent events. Draws without replacement are dependent, so either condition step by step or count the favorable and total selections directly with binomial coefficients.

## Applications
Any problem that is two counts divided: dice, cards, selections, random numbers from a range, and geometric probability once the "count" becomes a measure.

## Contest profile
The frame around most probability problems rather than the step that solves them; the partner that does the work is almost always a counting technique, usually [[casework-method|casework]] or [[constructive-counting|constructive counting]], because once the outcomes are equally likely the whole problem is two counts. The recurring trap on the AMC and AIME is a sample space that looks uniform and is not.
`,

"conditional-probability": String.raw`
## Key forms
- $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$ — the probability of $A$ once $B$ is known to have happened
- $P(A \cap B) = P(B)\,P(A \mid B)$ — multiply along a sequence of dependent steps
- turning the condition around is Bayes' Theorem, on its own card
- $A$ and $B$ are independent exactly when $P(A \mid B) = P(A)$, that is $P(A \cap B) = P(A)\,P(B)$

## Conditions
$P(B) > 0$. With equally likely outcomes, $P(A \mid B)$ is a count of $A \cap B$ over a count of $B$.

## Why it works
Once $B$ is known to have happened, the outcomes outside $B$ are impossible and the ones inside keep their relative likelihoods, so conditioning means restricting to $B$ and rescaling.

With equally likely outcomes this is plain counting. If $B$ has $|B|$ outcomes and $|A \cap B|$ of them are in $A$, then among the outcomes still possible a fraction $\frac{|A \cap B|}{|B|}$ lie in $A$. Dividing the top and bottom by the size of the whole space turns this into $\frac{P(A \cap B)}{P(B)}$. 

The same ratio is taken as the definition when outcomes are not equally likely, because it is the only rescaling that keeps the outcomes of $B$ in their original proportions and makes their total $1$.

{{figure:dice}}

Bayes' Theorem is the definition used twice. Both $P(A \mid B)\,P(B)$ and $P(B \mid A)\,P(A)$ equal $P(A \cap B)$, so they equal each other, and dividing by $P(B)$ gives the reversed form. That is how a conditional probability is reversed, and Bayes' Theorem has its own card.

## Useful observations
- $P(A \mid B)$ reads as "throw away every outcome outside $B$, then measure $A$ within what remains", which handles most problems without any formula.
- The product form is what runs forward: a sequence of dependent choices multiplies as $P(\text{first}) \cdot P(\text{second} \mid \text{first}) \cdots$, which is how draws without replacement are computed step by step. Drawing two red balls from $3$ red and $2$ blue happens with probability $\frac35 \cdot \frac24 = \frac{3}{10}$.
- $P(A \mid B)$ and $P(B \mid A)$ are different numbers, and confusing them is the error Bayes' Theorem exists to correct.
- Independence is a claim to check, not to assume from the story: checking $P(A \cap B) = P(A)\,P(B)$ is evidence, while "the draws feel unrelated" is not.
- The classic trap is which space the condition defines. For two children, "at least one is a boy" leaves three equally likely cases and makes two boys $\frac13$, while "the older one is a boy" leaves two cases and makes it $\frac12$.

## Applications
Draws without replacement, probabilities given partial information, and reversing a condition.

## Contest profile
The condition defines the restricted space, then [[casework-method|casework]] or [[constructive-counting|a direct count]] measures it, and some problems reverse the condition. Almost never alone, and most often on the AIME.
`,

"binomial-probability": String.raw`
## Key forms
- $\dbinom nk p^k(1 - p)^{n - k}$ — the probability of exactly $k$ successes in $n$ independent trials, each succeeding with probability $p$
- $\alt{\sum_{j=k}^{n}\dbinom nj p^j(1 - p)^{n - j}}{\dbinom nk p^k(1 - p)^{n-k} + \cdots + p^n}$ — the probability of at least $k$ successes
- $1 - (1 - p)^n$ — the probability of at least one success
- $np$ and $np(1 - p)$ — the expected number of successes and its variance

## Conditions
The trials are independent, their number is fixed in advance, and $p$ is the same every time. If one fails, the model is wrong: drawing without replacement is hypergeometric, and waiting for the first success is [[geometric-distribution|geometric]].

## Why it works
One particular sequence of outcomes with $k$ successes has probability $p^k(1 - p)^{n - k}$, and $\binom nk$ different sequences have that many successes.

Because the trials are independent, the probability of a particular sequence, such as success, failure, success, failure, is the product $p \cdot (1 - p) \cdot p \cdot (1 - p)$. Every sequence with exactly $k$ successes has the same product, $p^k(1 - p)^{n - k}$, whatever the order. Such a sequence is fixed by which $k$ of the $n$ positions hold the successes, so there are $\binom nk$ of them, and their probabilities add.

{{figure:sequences}}

## Useful observations
- "At least $k$" questions are the terms from $k$ upward added, or $1$ minus the shorter tail. "At least one" is always $1 - (1 - p)^n$.
- Expected counts need no sum at all, since [[expected-value|linearity]] gives $np$ directly: $4$ fair flips average $2$ heads, while exactly $2$ heads has probability $\binom42 \cdot \frac1{16} = \frac38$.

## Applications
Repeated coin flips, dice rolls, and any fixed number of identical independent attempts; exact counts, at-least counts, and the expected number of successes.

## Contest profile
Five problems here, all AIME, two solved by it alone; the others add [[symmetry-probability|symmetry]], a [[generating-function-method|generating function]], or a [[bijection-method|bijection]]. AMC uses the plain formula on coins and dice, and AIME variants weight the coin, compare two binomial probabilities, or condition on the outcome.
`,

"expected-value": String.raw`
## Key forms
- $E[X] = \alt{\sum_i x_ip_i}{x_1p_1 + x_2p_2 + \cdots + x_np_n}$ — each possible value times its probability
- $E[X + Y] = E[X] + E[Y]$ — linearity, for any random quantities whether or not they are independent
- $E[aX + b] = aE[X] + b$
- a count of events is a sum of indicators, and $E[\text{indicator}] = P(\text{event})$

## Conditions
Linearity needs no independence at all. Multiplying expectations, $E[XY] = E[X]E[Y]$, does need independence.

## Why it works
Expectation is a weighted average, and a weighted average of a sum is the sum of the weighted averages, whatever the relationship between the terms.

Over a finite sample space whose outcomes $\omega$ have probabilities $p(\omega)$, $E[X] = \sum_\omega X(\omega)\,p(\omega)$. Splitting the sum gives $E[X + Y] = \sum_\omega \bigl(X(\omega) + Y(\omega)\bigr)p(\omega) = E[X] + E[Y]$. Independence never enters, because nothing about how $X$ and $Y$ relate was used. The same step gives $E[aX + b] = aE[X] + b$.

The table shows it for three coin flips: averaging the row totals gives the same answer as averaging each column and adding.

{{figure:flips}}

## Useful observations
- For an expected number of something, the count is written as a sum of indicators, one for each place the thing could happen, each equal to $1$ if it happens and $0$ if not; each indicator's expected value is the probability of its event, so the answer is a sum of probabilities and the distribution of the total is never needed.
- The number of fixed points of a random permutation of $n$ items has each position contributing $\frac1n$, so the expected number is $n \cdot \frac1n = 1$, even though the events are far from independent.
- $E[X] = \sum x_ip_i$ is computed directly only when the distribution is short. For a long or infinite range, use indicators or the [[tail-sum-expectation|tail-sum formula]]; for a process that moves between states, use [[states-recursion-prob|first-step analysis]].

## Applications
Expected counts and totals, games and processes, and probabilities of events through indicators.

## Contest profile
AIME expected-value problems are almost always linearity of indicators in disguise, and recognizing a count as a sum of indicators replaces heavy [[casework-method|casework]] with a one-line sum.
`,

"geometric-distribution": String.raw`
## Key forms
- $E[\text{trials until the first success}] = \dfrac1p$ — and the first success is on trial $k$ with probability $(1 - p)^{k-1}p$
- $\dfrac{1 - p}{p}$ — the expected number of failures before the first success
- $\alt{E[\text{collect all } n \text{ types}] = nH_n = n\sum_{k=1}^{n}\frac1k}{E[\text{collect all } n \text{ types}] = n\left(1 + \frac12 + \cdots + \frac1n\right)}$ — the coupon collector

## Conditions
The trials are independent with the same success probability $p$. "Trials until the first success" includes the successful trial; "failures before the first success" excludes it.

## Why it works
Self-similarity: after one failure the situation resets, so $E = 1 + (1 - p)E$, giving $E = \frac1p$. The series view sums $\sum kp(1 - p)^{k-1}$, an arithmetico-geometric sum whose terms are the distribution itself.

The coupon collector is a sum of geometric waits. Once $k$ distinct types are held, the chance the next draw is new is $\frac{n - k}{n}$, so that stage takes $\frac{n}{n - k}$ on average; adding the stages gives $nH_n$.

## Useful observations
- The self-similar equation is set up rather than a series summed: after one trial the process has either succeeded or is back where it started.
- The same conditioning handles variants the closed form does not cover.
- Recognizing the coupon collector as a sum of independent waits is what makes it easy.

## Applications
Expected waiting times for a first success, expected rolls to see every face, and first-passage questions.

## Contest profile
Expected number of rolls until a given face, coupon-collector variants such as the expected number of rolls to see every face, and first-passage questions. The self-similar equation is faster and safer than series summation.
`,

"turn-based-games": String.raw`
## Key forms
- $P(\text{first player wins}) = \dfrac{p}{p + q - pq}$ — when the first player succeeds with probability $p$ on each turn and the second with probability $q$
- $\dfrac{1}{2 - p}$ — the case $q = p$, always more than $\frac12$
- $P = p + (1 - p)(1 - q)P$ — the restart equation behind the formula

## Conditions
The players alternate strictly, the success probabilities are the same every round, and the game ends at the first success. If the order is not strictly alternating or the probabilities change, the reset argument fails and a state recursion is needed.

## Why it works
The geometric series over rounds sums to the formula, or equivalently by self-similarity: the first player wins now, with probability $p$, or both miss, with probability $(1 - p)(1 - q)$, and the game restarts identically. So $P = p + (1 - p)(1 - q)P$.

The series version is $p + (1 - p)(1 - q)p + \cdots$, a geometric series with ratio $(1 - p)(1 - q)$.

## Useful observations
- The first round is conditioned on rather than the series summed: either the first player succeeds immediately, or both fail and the position resets exactly. Solving takes one line and generalizes to variants the closed form does not cover.
- The structural fact worth carrying is that moving first is always an advantage when the players are equally skilled: $\frac{1}{2 - p}$ exceeds $\frac12$ for every $p$ in $(0, 1)$, and approaches $1$ as $p$ grows.

## Applications
Alternating dice and coin duels, first-to-succeed games, and the advantage of moving first.

## Contest profile
Alternating dice and coin duels are AMC and AIME classics, in which the first player to roll a six wins and the question is the second player's chance. The restart equation is set up directly; series are the backup.
`,

"geometric-probability": String.raw`
## When to use
Two people arrive at random times and meet if they come within a fixed time of each other; a stick is broken at two random points and the pieces form a triangle; a point chosen in a square lands within some distance of a corner. Whenever the random quantities are real numbers chosen uniformly, the question is really about the size of a region. When the outcomes are discrete, such as dice or coins, count them instead, and a quantity that is not uniform needs its density, not just an area.

## How
1. Give each random quantity its own axis, so two make a square and three make a cube.
2. Write the condition as inequalities in the coordinates.
3. Draw the lines where the inequalities become equalities, and shade the region that satisfies them.
4. Divide the shaded length, area or volume by the size of the whole.

Two people arrive at independent uniform times within an hour and each waits $20$ minutes. With times $x, y \in [0, 1]$ in hours they meet when $|x - y| \le \frac13$. The region where they miss is two corner triangles with legs $\frac23$, of total area $\left(\frac23\right)^2 = \frac49$, so they meet with probability $\frac59$.

## Why it works
"Uniform" means equal lengths are equally likely, so the chance of landing in a subinterval of $[0, 1]$ is its length. Two independent uniform numbers give a point uniform in the unit square, and the chance that it lands in a region is the region's area; three give volume. A condition such as $x + y < 1$ or $|x - y| \le t$ cuts the square along straight lines, so the favorable region is a polygon whose area comes from triangles and trapezoids.

{{figure:broken-stick}}

The figure shows the broken stick: the three pieces form a triangle exactly when each is shorter than $\frac12$, a region of area $\frac14$ of the square.

## Formulas it uses
- [[basic-probability]]: a probability as favorable over total, measured here by length, area or volume instead of by counting.
- [[order-statistics]]: the distributions of the smallest, largest and middle of several uniform numbers, which describe the pieces of a randomly broken stick.

## Common traps
- Treating a uniform choice in one description as uniform in another: a random point on a circle is uniform in angle, not in its $x$ coordinate.
- Shading before writing each condition as an inequality, which loses boundary lines.
- Forgetting to divide by the total area when the square is not the unit square, as with times measured in minutes.

## Contest profile
Usually the whole solution once the region is drawn: a ratio of polygon areas, sometimes with casework on which lines cut the square.
`,

"states-recursion-prob": String.raw`
## When to use
A random process moves among finitely many situations until it stops: a random walk until it reaches an end, a game until someone wins, a bug on a cube until it reaches a corner, coin flips until a pattern appears. The question asks for the chance of ending a certain way or the expected number of steps. A process whose next step depends on its whole history has no finite list of states, and this method does not apply.

## How
1. Decide which kind of question it is: the chance of ending a certain way, the expected number of steps, or the position after a fixed number of steps.
2. Choose states that capture everything the future depends on, merging states alike by symmetry.
3. Give each state an unknown and fix the end states.
4. Write one equation for every other state by conditioning on its first step.
5. Solve the linear system.

### The chance of ending a certain way
The unknown $P_s$ is the chance of eventually ending in the wanted way from state $s$. At the end states the answer is already known: $P = 1$ at an ending that counts as a success and $P = 0$ at every other ending. Every other state averages its neighbors, with no extra term: $P_s = \sum p_{s \to s'}\, P_{s'}$. Nothing is added, because a probability does not grow as time passes.

### The expected number of steps
The unknown $E_s$ is the expected number of steps still to come from state $s$. At every end state $E = 0$, because no steps remain, whether the ending is good or bad. Every other state adds $1$ for the step it is about to take: $E_s = 1 + \sum p_{s \to s'}\, E_{s'}$.

The $1$ is one unit of whatever is being counted; to count draws, flips, or minutes, add $1$, and to count something else, such as heads, add the expected amount of it gained in one step instead.

Flip a fair coin until two heads in a row appear. With states "start" and "just flipped a head", $E_0 = 1 + \frac12 E_H + \frac12 E_0$ and $E_H = 1 + \frac12 \cdot 0 + \frac12 E_0$. Substituting the second into the first gives $\frac14 E_0 = \frac32$, so $E_0 = 6$ flips on average.

### Where the process is after exactly $n$ steps
A question about a fixed number of steps is not about ending at all, so there are no end states and no first-step equations. Instead, keep track of where the process could be after each step, as a list of probabilities that always adds up to $1$.

Start by grouping the positions that behave alike by symmetry, so the list stays short, and write down where one step leads from each group and with what chance. The first row of the list puts probability $1$ on the starting group and $0$ everywhere else.

Each new row is built from the one above it: a group's new probability is the sum, over the groups that can step into it, of the old probability times the chance of that step. Writing the rows as a table, one row per step, keeps the bookkeeping straight, and the answer is read off the row for step $n$.

For example, a bug starts at a vertex of a cube and each minute walks to one of the three neighboring vertices at random; what is the chance that it is at the opposite vertex after $5$ minutes? Group the vertices by their distance from the start, $0$, $1$, $2$, or $3$. From distance $0$ every move goes to distance $1$; from $1$, one of the three moves goes back to $0$ and two go on to $2$; from $2$, two go back to $1$ and one goes on to $3$; from $3$ every move goes to $2$.

| Minute | Distance $0$ | Distance $1$ | Distance $2$ | Distance $3$ |
|---|---|---|---|---|
| $0$ | $1$ | $0$ | $0$ | $0$ |
| $1$ | $0$ | $1$ | $0$ | $0$ |
| $2$ | $\frac13$ | $0$ | $\frac23$ | $0$ |
| $3$ | $0$ | $\frac79$ | $0$ | $\frac29$ |
| $4$ | $\frac{7}{27}$ | $0$ | $\frac{20}{27}$ | $0$ |
| $5$ | $0$ | $\frac{61}{81}$ | $0$ | $\frac{20}{81}$ |

Each entry comes from the row above it. After minute $3$, for instance, distance $1$ collects every move from distance $0$ and two thirds of the moves from distance $2$, so its chance is $\frac13 + \frac23 \cdot \frac23 = \frac79$. The last row answers the question: the bug is at the opposite vertex with probability $\frac{20}{81}$. Every row adds up to $1$, a quick check on the arithmetic, and the zeros alternate because each move changes the distance by exactly one.

## Why it works
The future depends only on the current state, so after the first step the process starts afresh from wherever it landed. Averaging over the first step therefore gives each state's value in terms of the next states' values, which is the law of total probability; for expected steps, the first step adds $1$. When an end state can be reached from every state, the system has exactly one solution.

{{figure:cube}}

The figure shows the symmetry step on a cube: vertices at the same distance from the target behave alike and become a single state, so eight unknowns shrink to four.

## Formulas it uses
- [[conditional-probability]]: the law of total probability, conditioning on the first step, which gives each $p_S$ equation.
- [[total-expectation]]: the same conditioning for expected values, which gives each $E_S$ equation.
- [[geometric-distribution]]: waiting for a success of probability $p$ takes $\frac1p$ tries on average, the one-state case and a quick check.

## Common traps
- States that forget something the future depends on, such as whether the last flip was a head.
- Leaving out the $+1$ in an expected-steps equation, or adding one to a probability equation, where it does not belong.
- Giving a winning end state the value $1$ in an expected-steps problem, where every end state has $0$ steps left, or forgetting the end-state values altogether, which leaves the system with no unique solution.
- Setting up absorbing end states for a question about a fixed number of steps, which needs a step-by-step probability list instead.

## Contest profile
Usually the whole solution of an AIME probability or expected-value problem about a repeated process: a few states and a small linear system.
`,

"symmetry-probability": String.raw`
## When to use
The outcomes are equally likely and the question is about order or position: the chance that card $A$ comes before card $B$, that the top card is an ace, that the largest of $n$ numbers lands in the first half, that a given player is eliminated last. It also gives expected values, since interchangeable quantities have equal expectations: the gaps between random points on a segment all have the same expected length.

If the outcomes are not equally likely, the swap argument fails and the weights must be tracked.

## How
1. Check that the outcomes are equally likely and the setup treats the swapped items alike.
2. Find a swap that sends the wanted event to another and undoes itself.
3. Conclude the events are equally likely; if $k$ of them split all outcomes, each has probability $\frac1k$.
4. If a tie is possible, the two events split only the rest: $P(A \gt B) = \frac{1 - P(A = B)}{2}$.
5. For expected values, give interchangeable quantities equal shares of their total.

Five people sit in a random order. The chance that Alice sits to the left of Bob is $\frac12$, and the chance that Alice, Bob and Carol sit in that order from left to right is $\frac{1}{3!} = \frac16$, since the $6$ orders of the three are equally likely.

With ties possible the answer is not $\frac12$: when two people each roll a die, a tie has probability $\frac16$, so the first roll is higher with probability $\frac{1 - \frac16}{2} = \frac{5}{12}$.

## Why it works
In a uniformly random arrangement every order is equally likely. Swapping the places of $A$ and $B$ sends each order with $A$ first to an order with $B$ first, and swapping again restores the original, so the two sets of orders match one for one and have the same size. Equal numbers of equally likely outcomes mean equal probabilities.

{{figure:swap}}

Positions work the same way. Exchanging the contents of position $1$ and position $k$ matches the deals with an ace in position $k$ to the deals with an ace on top, so $P(\text{ace in position } k) = P(\text{ace on top}) = \frac{4}{52}$. And if $n + 1$ interchangeable quantities always add to $1$, as the gaps made by $n$ random points in $[0, 1]$ do, each has expected value $\frac{1}{n + 1}$.

## Formulas it uses
- [[basic-probability]]: with equally likely outcomes a probability is a count of outcomes over the total, which is why equal-sized sets of outcomes have equal probabilities.
- [[expected-value]]: expectation is linear, so interchangeable quantities with a fixed total each get an equal share of it.

## Common traps
- Using symmetry when the setup is not symmetric: in a game where one player moves first, the players are not interchangeable.
- Swapping items the condition treats differently, such as a named card and a card of a given suit.
- Answering $\frac12$ when a tie is possible; the symmetric events share only $1 - P(\text{tie})$, so each has probability $\frac{1 - P(\text{tie})}{2}$.

## Contest profile
Usually a shortcut that replaces a long computation: a probability that looks like a sum over many cases turns out to be a simple fraction.
`,

"hypergeometric": String.raw`
## Key forms
- $\dfrac{\dbinom Kk\dbinom{N-K}{n-k}}{\dbinom Nn}$ — the probability that a draw of $n$ from $N$ objects, $K$ of them special, without replacement contains exactly $k$ special ones
- $n\dfrac KN$ — the expected number of special objects drawn, the same as in the binomial case
- $n\dfrac KN\left(1 - \dfrac KN\right)\dfrac{N - n}{N - 1}$ — the variance, the binomial variance with a finite-population correction
- $\dfrac{\dbinom Kk\dbinom{N-K}{n-k}}{\dbinom Nn} = \dfrac{\dbinom nk\dbinom{N-n}{K-k}}{\dbinom NK}$ — the roles of the draw and the special set can be exchanged

## Conditions
The pool is fixed and sampled without replacement, every draw is equally likely, and order does not matter. Terms with $k \gt K$ or $n - k \gt N - K$ are zero.

## Why it works
Choosing $n$ from a population with $K$ marked items: the favorable choices pick $k$ marked and $n - k$ unmarked ones independently, in $\binom Kk\binom{N-K}{n-k}$ ways, and the total number of equally likely choices is $\binom Nn$.

Because it is a ratio of counts, order never enters, and no arrangement factor appears. The probabilities over all $k$ add to $1$ by [[vandermonde|Vandermonde's Identity]].

## Useful observations
- The trials are dependent, so the binomial formula does not apply: drawing without replacement changes the odds at each step.
- Expected values still come from linearity, giving $n\frac KN$ exactly as in the binomial case — the dependence changes the distribution but not the mean.
- When $N$ is very large compared with $n$, the two distributions nearly coincide, which is why sampling from a big population can be treated as independent.

## Applications
Hands of cards with exactly $k$ of a kind, committees with a prescribed composition, defective parts in a sample, and any fixed pool sampled without replacement.

## Contest profile
Hands of cards with a prescribed number of a kind and committee-composition problems. Choosing between binomial (with replacement or independent) and hypergeometric (without) is the tested judgment.
`,


"variance-independence": String.raw`
## Key forms
- $\operatorname{Var}(X) = E[X^2] - E[X]^2$ — the variance
- $E[XY] = E[X]\,E[Y]$ and $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$ — for independent $X$ and $Y$
- $\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)$ — no independence needed
- $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X, Y)$ — for dependent variables, with $\operatorname{Cov}(X, Y) = E[XY] - E[X]E[Y]$

## Conditions
Unlike $E[X + Y] = E[X] + E[Y]$, which always holds, the statements for products and for variances of sums require independence, or at least zero covariance.

## Why it works
$\operatorname{Var}(X) = E[(X - E[X])^2] = E[X^2] - 2E[X]^2 + E[X]^2 = E[X^2] - E[X]^2$ is algebra on the definition.

Independence makes cross terms factor: $E[XY] = E[X]E[Y]$, so $\operatorname{Cov}(X, Y) = 0$ and in $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X, Y)$ the covariance term vanishes.

Affine changes need no independence at all: a shift moves the whole distribution without changing its spread, and a scale by $a$ multiplies every deviation by $a$, so the variance by $a^2$.

## Useful observations
- The contrast with expectation is the point worth internalizing: applying the product and variance rules to dependent variables is the standard error.
- Variance is computed as $E[X^2] - E[X]^2$, which usually means finding $E[X^2]$ by the same indicator or [[casework-method|casework]] method used for $E[X]$.
- For an indicator, $E[X^2] = E[X]$, since $0$ and $1$ square to themselves, which simplifies sums of indicators considerably.

## Applications
Variance of sums and products of independent variables, and expected-square computations.

## Contest profile
Rare directly on the AMC and AIME, but it appears in expected-square computations, where the second moment, the variance plus the square of the mean, evaluates sums of squares over random processes cleanly.
`,

"expected-fixed-points": String.raw`
## Key forms
- $E[\#\text{fixed points}] = 1$ — for a random permutation of $n$ objects, for every $n$
- $P(\text{exactly } k) = \dfrac{\dbinom nk D_{n-k}}{n!}$ — the exact distribution, using the derangement numbers $D_m$
- $P(\text{exactly } k) \approx \dfrac{1}{e\,k!}$ — the Poisson limit with mean $1$

## Conditions
The permutation is uniformly random. The expectation is exactly $1$ for every $n \ge 1$, and the Poisson form is an approximation that is accurate even for small $n$.

## Why it works
Write $X = \sum_{i=1}^{n}\mathbf 1[\text{position } i \text{ is fixed}]$. Each indicator has probability $\frac1n$, since position $i$ maps to $i$ with probability $\frac1n$, so $E[X] = n \cdot \frac1n = 1$ for every $n$. The events are dependent, but [[indicator-variables|linearity of expectation]] ignores dependence entirely.

For the full distribution, the number of permutations of $n$ objects with exactly $k$ fixed points is $\binom nkD_{n-k}$: choose which $k$ are fixed, then derange the other $n - k$. Dividing by $n!$ gives $P(X = k) = \frac{1}{k!}\cdot\frac{D_{n-k}}{(n-k)!} \to \frac{e^{-1}}{k!}$.

## Useful observations
- The expectation is pure linearity: $n$ positions, each fixed with probability $\frac1n$, so the answer is $1$ regardless of $n$, with no distribution needed.
- For the exact distribution the $D$ values are worth knowing for small arguments: $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$.
- Because the count is nearly Poisson with mean $1$, the probability of exactly $k$ fixed points is close to $\frac{1}{e\,k!}$, a good sanity check on an exact computation.

## Applications
Hat checks and matching problems, expected number of matches, and exactly-$k$ counts for permutations.

## Contest profile
Both a one-line quotable fact and a proof pattern: AIME expected-value questions and counts of permutations with a given number of fixed points almost always reduce to the indicator sum or the fixed-point formula.
`,

"coprime-probability": String.raw`
## Key forms
- the density of coprime pairs is $\dfrac{6}{\pi^2} = \dfrac1{\zeta(2)} \approx 0.608$
- the density of squarefree integers is the same constant
- the density of $k$-tuples of integers with no common factor is $\dfrac1{\zeta(k)}$, and of $k$th-power-free integers also $\dfrac1{\zeta(k)}$

## Conditions
"Probability" means a limiting density over a growing range, since there is no uniform measure on the integers.

## Why it works
A fixed prime $p$ divides both of two numbers with probability $\frac1{p^2}$. These events are independent across primes, so the coprime density is $\prod_p\left(1 - \frac1{p^2}\right) = \frac1{\zeta(2)} = \frac6{\pi^2}$.

## Useful observations
- The derivation is the useful part, since the same product for $k$ numbers gives $\frac1{\zeta(k)}$.
- Finite counts of coprime pairs on a contest go through Möbius inversion or inclusion–exclusion rather than through the constant.

## Applications
Densities of coprime pairs and of squarefree and power-free integers.

## Contest profile
Mostly enrichment. Finite coprime-pair counts go through exact sums instead of the constant.
`,

"pigeonhole": String.raw`
## Key forms
- $n$ objects in $k$ boxes $\implies$ some box holds at least $\left\lceil\dfrac nk\right\rceil$, and some holds at most $\left\lfloor\dfrac nk\right\rfloor$
- $n > k(r - 1) \implies$ some box holds at least $r$ — the form that forces a given number into one box
- $n > k \implies$ some box holds at least two — the simplest case

## Conditions
Every object goes into exactly one box. The principle guarantees that a crowded box exists but never says which one.

## Why it works
If every box held fewer than the average, the boxes together would hold fewer than all the objects, which is impossible.

With $n$ objects in $k$ boxes the average box holds $\frac nk$, and the fullest box holds at least the average. Since box counts are whole numbers, it holds at least $\lceil \frac nk \rceil$. In the simplest case, $n > k$ makes the average more than $1$, so some box holds two. Run backwards, forcing some box to hold $r$ objects needs more than $k(r - 1)$ of them.

## Useful observations
- The art is inventing the boxes: a feature with few possible values, such that two objects sharing a value gives what is wanted. Two integers with the same remainder modulo $m$ differ by a multiple of $m$; two points in the same small region are close together; two subsets with the same sum can be compared.
- For five points in a unit square, cutting it into four squares of side $\frac12$ puts two points in the same one, and two points in a square of side $\frac12$ are at most its diagonal, $\frac{\sqrt2}{2}$, apart.

{{figure:square}}

- It proves that something must exist without finding it, and the averaging form says that some value is at least the average.

## Applications
Guarantee problems ("two of them must", the fewest socks that guarantee a matching pair), remainders, points in regions, and subset sums.

## Contest profile
The signature is a guarantee, or a number exactly one more than the count of some category. The art is always the choice of boxes, never the principle itself.
`,

"handshake-lemma": String.raw`
## Key forms
- $\displaystyle\alt{\sum_v \deg(v)}{\deg(v_1) + \deg(v_2) + \cdots + \deg(v_n)} = 2E$ — the degrees add up to twice the number of edges
- the number of vertices of odd degree is even
- polyhedron: $\alt{\sum_{\text{vertices}}\deg(v)}{\deg(v_1) + \cdots + \deg(v_V)} = 2E = \alt{\sum_{\text{faces}}(\text{sides})}{(\text{sides of face }1) + \cdots + (\text{sides of face }F)}$

## Conditions
Any graph, with each edge counted once at each of its two ends; a loop counts $2$ toward its vertex's degree. For a polyhedron, each edge joins two vertices and borders exactly two faces.

## Why it works
Count the pairs (vertex, edge at that vertex) in two ways.

Grouped by vertex, a vertex of degree $\deg(v)$ contributes $\deg(v)$ pairs. Grouped by edge, each edge has exactly two ends and contributes two. Both count the same pairs, so the degrees add up to $2E$.

{{figure:ends}}

The total is even, and the vertices of even degree contribute an even amount, so the odd degrees must also add to an even number, which needs an even number of them.

## Useful observations
- Forwards, it converts degree information into an edge count: if each of $n$ people shakes $k$ hands, there are $\frac{nk}{2}$ handshakes.
- Backwards, it is a [[invariants-coloring|parity obstruction]]. Can seven people each shake exactly three hands? The degrees would add to $7 \cdot 3 = 21$, an odd number, so no such arrangement exists.
- It underlies [[eulerian-paths|Eulerian paths]]: a path through every edge needs $0$ or $2$ vertices of odd degree, and the count being even is why $1$ or $3$ never occurs.
- For a polyhedron the same count applies twice, once at the vertices and once at the faces.

{{figure:faces}}

A soccer ball has $12$ pentagons and $20$ hexagons, so $2E = 12 \cdot 5 + 20 \cdot 6 = 180$ and $E = 90$. Three faces meet at every vertex, so $3V = 180$ and $V = 60$, which agrees with [[eulers-polyhedron-formula|Euler's Polyhedron Formula]]: $60 - 90 + 32 = 2$.

- The parity half carries over too: every polyhedron has an even number of faces with an odd number of sides; no polyhedron is made of exactly seven triangles, since $7 \cdot 3 = 21$ is odd.

## Applications
Edge counts from degrees, polyhedra from their faces and vertices, tournaments, and parity obstructions.

## Contest profile
Typical uses add up the degrees of a network to count its edges, split a polyhedron's vertices by degree once Euler's Polyhedron Formula says how many there are, or use the odd degrees to bound a trail through a graph. The same template counts games in a tournament.
`,

"double-counting": String.raw`
## When to use
When a sum looks hard but its terms are counts of incidences: degrees of vertices, sizes of committees, numbers of problems each student solved. It also proves identities such as $k\binom nk = n\binom{n - 1}{k - 1}$ by counting one set two ways, and it is the engine of olympiad inequalities, where one count is exact and the other can only be bounded.

## How
1. Choose a set of pairs, such as (vertex, edge at it) or (committee, chair), whose size is the quantity you want.
2. Count the pairs grouped by their first entries.
3. Count them again grouped by their second entries.
4. Set the two counts equal, or, when one count can only be bounded, turn the equation into an inequality.

How many committees of $k$ people with a chair can be formed from $n$ people? Choosing the committee and then its chair gives $k\binom nk$; choosing the chair and then the other $k - 1$ members gives $n\binom{n - 1}{k - 1}$. Both count the same set, so the two expressions are equal.

## Why it works
Every pair in a set $S$ has one first entry and one second entry. Grouping by first entries splits $S$ into pieces, one per first entry, and grouping by second entries splits it differently, but either way the pieces add up to $|S|$. In a grid with a dot for each pair, these are the row totals and the column totals, and both add up to the number of dots.

{{figure:incidence}}

The equation is free; the work is choosing what to count. The right set is one whose two groupings are each something you can evaluate, or at least bound.

## Formulas it uses
- [[handshake-lemma]]: counting (vertex, edge) pairs gives $\sum \deg v = 2E$, the most used double count of all.
- [[committee-chair]]: $k\binom nk = n\binom{n - 1}{k - 1}$, a committee with its chair counted two ways.
- [[vandermonde]]: choosing $r$ people from $m$ men and $n$ women, all at once or split by the number of men, gives $\binom{m + n}{r}$ both ways.

## Common traps
- Choosing a set whose two counts are both hard, so the equation says nothing.
- Counting ordered pairs one way and unordered pairs the other.
- Forgetting the factor of $2$ when each object is counted from both of its ends, as an edge is from its two endpoints.

## Contest profile
Usually the key step of a proof, or of an AIME count over incidences: one side is computed directly and the other is solved for.
`,

"ramsey-33": String.raw`
## Key forms
- $R(3, 3) = 6$ — among any $6$ people, some $3$ are mutual friends or mutual strangers, and $6$ is the smallest such number
- a $5$-cycle of friendships, with the complementary $5$-cycle of strangers, has no monochromatic triangle — so $5$ people do not suffice
- the number of non-monochromatic triangles in a $2$-coloring of $K_6$ is $\alt{\dfrac12\sum_v d_v(5 - d_v)}{\dfrac12\left[d_1(5 - d_1) + d_2(5 - d_2) + \cdots + d_6(5 - d_6)\right]}$, where $d_v$ is the number of friends of $v$

## Conditions
Every pair of people is in exactly one of two relations, friends or strangers. The result is about the complete graph $K_6$ with edges colored in two colors.

## Why it works
Among one person's $5$ relations, pigeonhole gives $3$ of one type, say three friends. Those three either contain a pair of friends, which closes a monochromatic triangle with the fixed person, or are all strangers to one another, which is the opposite triangle themselves.

Minimality needs a construction: the pentagon coloring of $K_5$, the $5$-cycle in one color and its complement in the other, has no monochromatic triangle, so $6$ is tight.

## Useful observations
- The proof is a two-step pigeonhole worth reproducing: fix one person, and of their five relationships at least three share a color.
- Minimality needs a construction, not an argument. Contest problems asking to show a bound is tight always need this second half.
- The general lesson is that these results are proved by fixing one vertex and pigeonholing its edges, the standard opening for any small Ramsey-style question. Ramsey numbers grow ferociously, with $R(4, 4) = 18$ and $R(5, 5)$ still unknown.

## Applications
Guaranteed monochromatic triangles, party problems, and small Ramsey-style coloring questions.

## Contest profile
The $6$-people puzzle appears verbatim in competition folklore; the argument template, fixing a vertex and pigeonholing its edges, solves related coloring questions.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {


});

Object.assign(window.MATH_DETAILS, {

"weighted-binomial-sums": String.raw`
## Key forms
- the weight $k$ alone is the sum on [[committee-chair|the Committee–Chair card]]
- $\alt{\sum_{k=0}^{n}k(k - 1)\dbinom nk = n(n - 1)2^{n-2}}{0 + 0 + 2\dbinom n2 + \cdots + n(n-1)\dbinom nn = n(n-1)2^{n-2}}$
- $\alt{\sum_{k=0}^{n}k^2\dbinom nk = n(n + 1)2^{n-2}}{\dbinom n1 + 4\dbinom n2 + \cdots + n^2\dbinom nn = n(n+1)2^{n-2}}$
- $\alt{\sum_k k^m\dbinom nk = \sum_{j}S(m, j)\,n(n - 1)\cdots(n - j + 1)\,2^{n - j}}{S(m,1)\,n\,2^{n-1} + S(m,2)\,n(n-1)\,2^{n-2} + \cdots}$ — the general weight, with $S(m, j)$ the [[stirling-bell|Stirling numbers of the second kind]]

## Conditions
$n \ge 0$ and the sums run over $0 \le k \le n$. For alternating versions, the derivative is taken first and $x = -1$ substituted afterwards.

## Why it works
Differentiate $(1 + x)^n = \sum_k\binom nkx^k$ once: $n(1 + x)^{n-1} = \sum_kk\binom nkx^{k-1}$. Multiplying by $x$ realigns the powers, $nx(1 + x)^{n-1} = \sum_kk\binom nkx^k$, and setting $x = 1$ sums, which is the first-weight sum of the committee-chair identity.

Differentiating $j$ times gives $\frac{d^j}{dx^j}(1 + x)^n = n(n - 1)\cdots(n - j + 1)(1 + x)^{n-j}$, and at $x = 1$ the left side is $\sum_kk(k - 1)\cdots(k - j + 1)\binom nk$. So the falling-factorial weights give $\sum_kk^{\underline j}\binom nk = n^{\underline j}2^{n-j}$.

Every power is a combination of falling factorials, $k^m = \sum_jS(m, j)\,k^{\underline j}$, by the definition of the Stirling numbers, so the general formula follows. The case $m = 2$ is $k^2 = k(k - 1) + k$, giving $n(n - 1)2^{n-2} + n2^{n-1} = n(n + 1)2^{n-2}$.

Combinatorially, $k^2\binom nk$ counts committees of size $k$ with a chair and a secretary who may be the same person: the same person gives $k\binom nk$, and two different people give $k(k - 1)\binom nk$.

## Useful observations
- The derivative pipeline evaluates any $\sum k^m\binom nkx^k$; the combinatorial story, with [[casework-method|casework]] on whether the chair and secretary are the same, is faster for small $m$ and less error-prone under pressure.
- The weight $k^{\underline j}$ is the natural one, since each factor $k - i$ is absorbed by lowering the upper index.
- For a uniformly random subset of an $n$-element set, the expected square of its size is $\frac{n(n+1)}{4}$, which is this sum divided by $2^n$.

## Applications
Expected values over random subsets, identity evaluations, and any polynomial weight on a binomial sum.

## Contest profile
Expected values over random subsets and AIME identity evaluations. The committee story generalizes to any polynomial weight.
`,

"cayleys-formula": String.raw`
## Key forms
- $n^{\,n-2}$ — the number of trees on $n$ labeled vertices
- a vertex of degree $d$ appears exactly $d - 1$ times in the Prüfer sequence
- $\dbinom{n - 2}{d_1 - 1, \ldots, d_n - 1}$ — the number of labeled trees with prescribed degrees $d_1, \ldots, d_n$

## Conditions
The vertices are distinguishable, so the count is of labeled trees; unlabeled trees have no closed form. A tree is connected and has no cycles, and has $n - 1$ edges.

## Why it works
The Prüfer correspondence matches trees on $\{1, \ldots, n\}$ with sequences of length $n - 2$ over $\{1, \ldots, n\}$, of which there are $n^{n-2}$.

Encoding: repeat $n - 2$ times: remove the leaf with the smallest label and write down the label of its neighbor. A tree always has a leaf, and $n$ is never removed, since removing a leaf of a tree with at least $3$ vertices never leaves a lone vertex, so it is not the smallest leaf until two vertices remain.

A vertex of degree $d$ is written once for each of its neighbors that is removed before it, and it is removed last of its neighbors; so it appears $d - 1$ times if it is eventually removed or is a final vertex, and leaves never appear. That gives the degree statement.

Decoding: given a sequence, the first removed leaf is the smallest label that does not appear in it. Remove it from the list of available labels, attach it to the first written label, delete the first written label from the sequence, and repeat. At the end two labels remain unused and are joined.

Every sequence decodes to a tree, and encoding that tree returns the same sequence, so the correspondence is a bijection and there are $n^{n-2}$ trees. The degree statement turns counts with prescribed degrees into counts of sequences with prescribed multiplicities, the multinomial coefficient.

## Useful observations
- The formula is short but the bijection is what solves problems. Counting trees in which a given vertex is a leaf becomes counting sequences that omit it.
- Counting trees with prescribed degrees becomes a multinomial coefficient over the Prüfer sequence.

## Applications
Counting ways to connect labeled towns with roads, trees with prescribed degrees, and trees with a prescribed leaf set.

## Contest profile
AIME and olympiad network-counting problems, and the degree refinement for variants where a hub connects to a prescribed number of others.
`,

"eulerian-paths": String.raw`
## Key forms
- a connected graph has an Eulerian circuit (a closed route using every edge exactly once) if and only if every vertex has even degree
- a connected graph has an Eulerian path that is not closed if and only if exactly two vertices have odd degree, and the path starts at one and ends at the other
- with $2k$ odd vertices, at least $k$ separate strokes are needed to trace the graph

## Conditions
The graph must be connected apart from isolated vertices; the degree condition alone is not enough, since a graph in two separate pieces fails however even its degrees are. Hamiltonian paths, which visit vertices rather than edges, have no comparable criterion.

## Why it works
A pass through a vertex uses two edges, one in and one out, so every vertex that is not an endpoint needs an even degree. The endpoints of a non-closed trail each spare one odd edge, so they are the two odd vertices.

Sufficiency is Hierholzer's construction: walk greedily until stuck, which with all degrees even can only happen back at the start, then splice in detours at visited vertices that still have unused edges. Every edge ends up used, since connectivity guarantees an unused edge is always reachable from the walk.

## Useful observations
- Counting the odd-degree vertices answers the question immediately: zero means a closed trace, two means an open one starting and ending at those vertices, anything more means it cannot be done in one stroke.
- For "minimum retraced distance" problems, the odd vertices say how many edges must be duplicated: pair them up along shortest paths and double those edges, which makes every degree even.
- The number of odd vertices is always even, by the [[handshake-lemma|Handshake Lemma]], which is why one odd vertex never occurs.

## Applications
Drawing a figure without lifting the pencil, closed walks that use every street once, and minimum retraced distance.

## Contest profile
"Can this figure be drawn in one stroke" at MATHCOUNTS and the AMC, and postman-flavored "minimum retraced distance" questions.
`,

"plane-regions": String.raw`
## Key forms
- $R_{\text{lines}} = \dfrac{n^2 + n + 2}{2}$ — the maximum regions from $n$ lines, no two parallel and no three through one point
- $R_{\text{circles}} = n^2 - n + 2$ — the maximum regions from $n$ circles, each pair meeting in two points
- regions $= 1 + (\text{lines}) + (\text{crossings})$ for lines in the plane, and each new curve adds one region per crossing plus one

## Conditions
The maximum needs general position: no two lines parallel and no three lines or circles through one point. Any parallel pair or triple concurrence loses regions, and problems often specify a configuration that deliberately fails it.

## Why it works
Incremental counting: a new line crossing $k$ existing lines is cut into $k + 1$ pieces, each splitting one region, so lines add $1, 2, 3, \ldots$ new regions, summing to $1 + \sum_{i=1}^{n} i = \frac{n^2 + n + 2}{2}$. A new circle crossing each old one twice is cut into $2(n - 1)$ arcs, each adding a region.

## Useful observations
- The formulas are derived rather than memorized: adding the $k$th line crosses the previous $k - 1$ lines, and each crossing splits one more region, so it adds $k$ regions in total. The same argument with two crossings per circle gives the circle count.
- That incremental principle is the transferable part: it handles configurations the formulas do not cover, such as a mix of lines and circles, or lines with some parallels, by counting crossings as each curve is added.
- The general-position hypothesis is checked before quoting a maximum.

## Applications
The most pieces from straight cuts, regions cut by lines and circles, and regions in configurations with parallel or concurrent curves.

## Contest profile
Direct AMC questions ask for the most pieces from a few straight cuts, such as $16$ pieces of a pancake from $5$ cuts, and harder problems use the same count, $1 +$ lines $+$ crossings, for the expected number of regions from random chords, by linearity.
`,

"order-statistics": String.raw`
## Key forms
- $E[\max] = \dfrac{n}{n+1}$, $E[\min] = \dfrac{1}{n+1}$, and $E[X_{(k)}] = \dfrac{k}{n+1}$ — for $n$ independent uniform points on $[0, 1]$
- $E[\text{gap}] = \dfrac{1}{n+1}$ — each of the $n + 1$ gaps
- $P(\max \le x) = x^n$ and $P(\min \ge x) = (1 - x)^n$ — the distribution functions
- $E[\max - \min] = \dfrac{n - 1}{n + 1}$ — the expected range
- discrete, without replacement: $k$ distinct draws from $\{1, \ldots, n\}$ give $E[\max] = \dfrac{k(n + 1)}{k + 1}$
- discrete, with replacement: $k$ independent draws from $\{1, \ldots, n\}$ give $E[\max] = \alt{n - \displaystyle\sum_{j=1}^{n-1}\left(\dfrac jn\right)^k}{n - \left[\left(\dfrac1n\right)^k + \left(\dfrac2n\right)^k + \cdots + \left(\dfrac{n-1}{n}\right)^k\right]}$ — the other formula does not apply here

## Conditions
The points are independent and uniform on $[0, 1]$. The first discrete form is for $k$ distinct values drawn from $\{1, \ldots, n\}$ without replacement; with replacement the draws are independent and the second form applies. Using the wrong one is the usual slip: for $n = 6$ and $k = 3$ they give $\frac{21}{4}$ and $\frac{119}{24}$.

## Why it works
By symmetry, $n$ uniform points plus the two interval endpoints split $[0, 1]$ into $n + 1$ exchangeable gaps, so each gap expects $\frac{1}{n+1}$; the $k$th smallest point sits after $k$ gaps, at $E[X_{(k)}] = \frac{k}{n+1}$. Directly, $P(\max \le x) = x^n$ integrates to $E[\max] = \frac{n}{n+1}$. With replacement on $\{1, \ldots, n\}$ the same idea gives $P(\max \le m) = \left(\frac mn\right)^k$, so $E[\max] = \sum_{m=1}^{n}P(\max \ge m) = n - \sum_{j=1}^{n-1}\left(\frac jn\right)^k$.

## Useful observations
- The distribution-function route ($P(\max \le x) = x^n$, $P(\min \ge x) = (1 - x)^n$) answers probability questions; the gap-symmetry route answers expectation questions instantly.
- For the range, $E[\max - \min] = \frac{n - 1}{n + 1}$.
- The $\frac{k}{n+1}$ pattern is worth having on instant recall.

## Applications
Expected largest, smallest, or $k$th of several random points, expected gaps, and broken-stick setups, which are order statistics of two points.

## Contest profile
"[[expected-value|Expected value]] of the largest of three spins," waiting-point problems, and [[geometric-probability|geometric probability]] hybrids.
`,

"total-expectation": String.raw`
## Key forms
- $\alt{E[X] = \sum_i P(A_i)\,E[X \mid A_i]}{E[X] = P(A_1)E[X \mid A_1] + P(A_2)E[X \mid A_2] + \cdots}$ — the expectation as the probability-weighted average of the case expectations
- $E[\text{total}] = E[N] \cdot E[X]$ — Wald's identity, for a random number $N$ of identically distributed contributions, with $N$ independent of them or a stopping time and $E[N]$ finite
- conditioning on the first step turns a process into an equation relating $E[X]$ to itself

## Conditions
The cases $A_i$ are disjoint and exhaustive. Wald's identity needs the contributions to have the same expectation, $E[N]$ to be finite, and $N$ to be either independent of the contributions or a stopping time, meaning that whether to take term $k + 1$ is decided from the first $k$ terms only. An $N$ that looks ahead at later contributions breaks it.

## Why it works
Group the outcomes by which case $A_i$ occurred and average within cases first: the inner averages are the conditional expectations, and recombining with weights $P(A_i)$ reproduces the overall average. It is associativity of [[weighted-average|weighted averages]], elevated to a principle.

## Useful observations
- The partition is chosen so that each conditional expectation is easy, and conditioning on the first step is almost always that choice.
- Wald's identity is the case worth recognizing separately: when a random number of independent pieces are summed, the expected total is the product of the two expectations, provided $N$ is independent of the pieces or a stopping time. Dropping that proviso is the standard error: let the $X_i$ be fair $0$-$1$ coins and let $N = 2$ if $X_2 = 1$ and $N = 1$ otherwise, so that $N$ looks at the term it decides to take. Then $E[\text{total}] = E[X_1] + E[X_2 \cdot \mathbf 1_{X_2 = 1}] = \frac12 + \frac12 = 1$, while $E[N]\,E[X] = \frac32 \cdot \frac12 = \frac34$.
- The technique pairs naturally with state recursions: it writes one equation per state, and solving the small system gives every expectation at once.
- Whichever partition is picked, it must be disjoint and exhaustive, the same requirement as ordinary [[casework-method|casework]] and the usual source of a wrong weighted average.

## Applications
Expected waiting times, expected values of processes with random stopping, and sums of a random number of random terms.

## Contest profile
The organizing principle behind nearly every AIME expected-value problem: condition on the first step, write the equation, solve. Misapplying it by conditioning on a non-partition is the error to guard against.
`,



"bijection-method": String.raw`
## When to use
Reach for a bijection when the objects have a simpler description hiding inside them. Increasing sequences are really sets, solutions of $x_1 + \cdots + x_k = n$ are really rows of stars and bars, lattice paths are really words in two letters, and binary strings are really subsets. It is also the standard way to prove two families have the same size without computing either.

## How
1. Describe a typical hard object in full, constraints included.
2. Find a recoding into an object you can count, so that each hard object gives exactly one easy object.
3. Write the reverse rule, and check that every easy object comes back to exactly one hard object.
4. Count the easy objects.

How many solutions does $x_1 + x_2 + x_3 = 10$ have in nonnegative integers? Write each solution as $10$ stars split by $2$ bars, so $(3, 0, 7)$ becomes $\star\star\star \mid \mid \star\star\star\star\star\star\star$. Every row of $10$ stars and $2$ bars reads back as exactly one solution, so there are $\binom{12}{2} = 66$.

## Why it works
Two sets whose elements can be paired off, every element in exactly one pair, have the same size. A rule from the hard set to the easy set is such a pairing when no two hard objects share an image and every easy object is reached, and a reverse rule checks both at once, since undoing the rule recovers the one object behind each easy object. Nothing about the hard objects themselves is counted; the number comes entirely from their partners.

{{figure:path-word}}

The figure shows the most common recoding: a lattice path read as the word of its steps, so paths with $m$ right and $n$ up steps are words with $m$ R's and $n$ U's.

## Formulas it uses
- [[permutations-combinations]]: most easy sets are subsets or arrangements, counted by $\binom nk$ and $\frac{n!}{(n - k)!}$.
- [[stars-and-bars]]: rows of stars and bars, $\binom{n + k - 1}{k - 1}$ of them, the standard target for sums of nonnegative integers.
- [[grid-paths]]: paths of $m$ right and $n$ up steps number $\binom{m + n}{n}$, the target for words in two letters.
- [[catalan-numbers]]: balanced parentheses, paths that stay below the diagonal, triangulations and binary trees are all in bijection, and all counted by $C_n = \frac{1}{n + 1}\binom{2n}{n}$.

## Common traps
- A rule that sends two hard objects to the same easy object, which makes the count too small.
- An easy object that no hard object reaches, which makes the count too large.
- Losing a constraint in the recoding, such as positive parts against nonnegative parts, which changes $\binom{n + k - 1}{k - 1}$ into $\binom{n - 1}{k - 1}$.

## Contest profile
Usually the decisive reformulation: once the objects are recoded, a standard formula finishes, most often stars and bars or a binomial coefficient.
`,

"grid-path-fill": String.raw`
## When to use
Counting lattice paths on a grid with blocked squares, extra steps such as diagonals, or a missing region, so that one binomial coefficient no longer gives the answer. An open grid with only right and up steps is one binomial coefficient, $\binom{m + n}{n}$, and needs no filling. It also handles any board-walking count small enough to write out.

## How
1. Write $1$ at the starting cell.
2. Write $0$ on every blocked cell.
3. Fill the cells in an order where every cell comes after the cells that step into it, usually row by row.
4. In each cell write the sum of the numbers in the cells that step into it.
5. Read the answer at the target.

Paths of right and up steps from $(0, 0)$ to $(4, 3)$ that avoid the points $(2, 1)$ and $(1, 2)$: filling the grid gives $5$ at the target, as the first figure shows. As a check, there are $\binom73 = 35$ paths in all, $\binom31\binom42 = 18$ pass through $(2, 1)$, $\binom31\binom41 = 12$ pass through $(1, 2)$, and no path passes through both, leaving $35 - 18 - 12 = 5$.

## Why it works
Every path into a cell arrives by exactly one last step, from one of the cells that step into it, so the paths reaching the cell are split by that neighbor, and adding the neighbors' numbers counts each path once. A blocked cell has no paths through it, so its $0$ makes every later sum skip it. On an open grid of right and up steps the numbers are Pascal's triangle turned on its side, and the count at $(m, n)$ is $\binom{m + n}{n}$. Allowing a diagonal step adds a third neighbor to every sum, as the second figure shows.

## Formulas it uses
- [[grid-paths]]: $\binom{m + n}{n}$ paths on an open grid, the count before any blocking and a check on the table.
- [[pascals-identity]]: $\binom nk = \binom{n - 1}{k - 1} + \binom{n - 1}{k}$, the same addition rule the table follows, which is why an open grid fills with binomial coefficients.

## Common traps
- Filling a cell before all the cells that step into it.
- Forgetting a third neighbor when diagonal steps are allowed.
- Leaving a blocked cell empty and then copying a neighbor's value through it.

## Contest profile
Usually the whole count when a path problem has an obstacle; for a single blocked point, the total minus the paths through it is a quick check.
`,

"recursive-counting": String.raw`
## When to use
Counts indexed by a size $n$, where a size-$n$ object is a smaller object of the same kind plus an ending: tilings of a strip, strings with no forbidden pattern, climbs up a staircase in steps of $1$ or $2$, seatings built one person at a time. It is especially good when one specific size is asked for, such as $n = 12$, since a short table gets there.

When the objects are strings with a rule about neighbors, the situation has its own card, [[restricted-sequences|Counting Restricted Sequences (State Machines)]], which says how to choose the states.

## How
1. Define $a_n$ exactly: the number of valid objects of size $n$.
2. Classify the objects of size $n$ by how they end: their last tile, last letter or last block.
3. Check that removing each ending leaves a valid smaller object, and write $a_n$ in terms of earlier terms.
4. If one sequence does not carry enough information, use several, one for each state, such as "ends in $0$" and "ends in $1$".
5. Work out the first few terms by hand and run the recursion up to the size asked.

Binary strings of length $10$ with no two consecutive $1$s: such a string ends in $0$, after any valid string of length $n - 1$, or in $01$, after any valid string of length $n - 2$. So $a_n = a_{n-1} + a_{n-2}$ with $a_1 = 2$ and $a_2 = 3$, which gives $2, 3, 5, 8, 13, 21, 34, 55, 89, 144$, and $a_{10} = 144$.

## Why it works
Every valid object of size $n$ ends in exactly one of the listed ways, so the endings split the objects into disjoint, exhaustive cases. Removing the ending leaves a valid smaller object, and every smaller object takes each allowed ending in exactly one way, so each case has as many objects as the corresponding smaller size. The figure shows the split for tilings by squares and dominoes: the last tile is one or the other.

{{figure:last-tile}}

## Formulas it uses
- [[linear-recurrence]]: turns the recursion into a closed form through its characteristic equation, when a formula is wanted rather than one value.
- [[derangements]]: $D_n = (n - 1)(D_{n-1} + D_{n-2})$, a recursion found by following where the first item goes.
- [[catalan-numbers]]: $C_{n+1} = C_0C_n + C_1C_{n-1} + \cdots + C_nC_0$, the recursion from splitting a path at its first return to the diagonal.

## Common traps
- Wrong small cases, most often the empty object, which usually counts as $1$.
- Endings that overlap, so some objects are counted in two cases.
- A single sequence that forgets something the next step needs; add a state instead.

## Contest profile
Usually the whole solution for an AIME count indexed by length: a recursion and a short table, often with two or three states.
`

});

Object.assign(window.MATH_DETAILS, {

"constructive-counting": String.raw`
## When to use
Codes, license plates, seatings, numbers with digit conditions, committees with roles: anything you could build by making a fixed sequence of choices. It is the default first attempt at any count, and the base that casework, complementary counting and dividing out an overcount all build on. When the condition is easier to state as "not ...", the opposite is the better thing to count.

## How
1. Describe the object as a sequence of decisions.
2. Put the most restricted decision first, such as the units digit of an even number or the seat of a person with a requirement.
3. Check that the number of options at each step is the same whatever was chosen before.
4. Multiply the numbers of options.
5. If every object was built in the same number of different orders, divide by that number.

How many even three-digit numbers have distinct digits? The hundreds digit cannot be $0$, so the number of options depends on whether the units digit is $0$; split there. Units digit $0$: $9 \cdot 8 = 72$. Units digit $2$, $4$, $6$ or $8$: $4 \cdot 8 \cdot 8 = 256$. Total $328$.

## Why it works
Picture the decisions as a tree whose leaves are the finished objects. If the first decision always has $c_1$ options, the second always $c_2$, and so on, the tree has $c_1 c_2 \cdots c_k$ leaves, and when each object is exactly one leaf, that product is the count. The options themselves may change from branch to branch; only their number has to stay the same.

{{figure:decision-tree}}

When the number of options depends on earlier choices, as in the example, reorder the steps or split into cases. When each object is built in several orders, divide by the number of orders.

## Formulas it uses
- [[permutations-combinations]]: ordered selections $\frac{n!}{(n - k)!}$, built one slot at a time from a shrinking menu, and unordered ones $\binom nk$, the same build divided by the $k!$ orders.
- [[multiset-permutations]]: arrangements with repeated items, $\frac{n!}{n_1!\,n_2!\cdots}$, with the orders inside each group of identical items divided out.

## Common traps
- Multiplying when the number of options depends on an earlier choice, as with a leading digit that cannot be $0$.
- Building unordered objects in order and forgetting to divide by the number of orders.
- A sequence of steps that can produce the same object twice, so the product overcounts.

## Contest profile
The most common counting idea of all: usually combined with casework, which splits the build, or with complementary counting, which builds the opposite.
`,

"indicator-variables": String.raw`
## When to use
An expected count of something that can happen in many places: fixed points of a random permutation, adjacent pairs of the same color, people who get their own hat back, empty boxes, runs of heads. The occurrences may depend on each other in complicated ways; the method does not care.

It gives expected values only: a probability or a variance needs more, because the indicators are not independent.

## How
1. Identify the individual places where the counted thing can happen.
2. Give each place an indicator, $1$ if it happens there and $0$ if not, so the count is the sum of the indicators.
3. Find the probability for one place, usually the same for every place by symmetry.
4. Add the probabilities: that sum is the expected count.

Five red and five blue balls are lined up in random order. There are $9$ adjacent pairs, and each is the same color with probability $2 \cdot \frac{5}{10} \cdot \frac49 = \frac49$, so the expected number of same-color neighbors is $9 \cdot \frac49 = 4$.

## Why it works
Expected value adds, $E[X + Y] = E[X] + E[Y]$, whether or not $X$ and $Y$ are independent, because an expected value is a weighted sum over outcomes and a sum can be regrouped term by term. An indicator has expected value $1 \cdot P(\text{it happens}) + 0 = P(\text{it happens})$. So a count written as a sum of indicators has expected value equal to the sum of their probabilities, and the dependence between the places never enters.

The figure shows one random row of the example with its same-color neighbors marked; their number varies from row to row, but it averages $4$.

## Formulas it uses
- [[expected-value]]: linearity of expectation, the whole basis of the method.
- [[expected-fixed-points]]: a random permutation of $n$ items has $1$ fixed point on average, one indicator per item with probability $\frac1n$.
- [[basic-probability]]: the probability for a single place, usually a short count.

## Common traps
- Believing the indicators must be independent; for the expected value they need not be.
- Using indicators alone for a variance, which also needs the probabilities for pairs of places.
- Counting each unordered pair twice by giving it two indicators.

## Contest profile
Usually the whole solution of an expected-count problem: one probability times the number of places.
`,

"invariants-coloring": String.raw`
## When to use
A process of moves, such as replacing two numbers on a board by a combination of them, flipping coins, or jumping a piece, and a question about whether some state can be reached. The answer is usually no, proved by a quantity no move can change.

The same idea shows that two positions of a puzzle are not connected, and that a tiling or a rearrangement is impossible when every allowed piece or swap preserves some count. Whether a process must stop is a different question, answered with a [[monovariant|monovariant]].

## How
1. Write down exactly what one move does.
2. Look for a quantity it leaves unchanged: a sum, a product, a parity, or a value modulo a small number.
3. Compute the quantity at the start and at the target.
4. If the two values differ, the target is unreachable.

A row of $7$ coins shows all heads, and a move flips any two of them. All tails is never reached: each move changes the number of heads by $-2$, $0$, or $2$, so that number stays odd, and $0$ is even.

## Why it works
A quantity that no move changes has the same value after any sequence of moves, so every reachable state shares its starting value, and a state with another value is out of reach.

## Formulas it uses
- [[modular-basics]]: invariants are often a value modulo a small number, such as a sum modulo $3$ when every move changes it by a multiple of $3$.

## Common traps
- Concluding that a target is reachable because the invariant agrees there; an invariant can only prove impossibility.
- Choosing a quantity that some move changes in a rare case.
- Looking only at sums when the move preserves a product, or a sum of squares.

## Contest profile
Mostly olympiad; on the AMC and AIME it is the idea behind "which final number is possible" questions and jumping-piece questions, and the invariant is usually parity or a sum modulo a small number. Tilings use the [[coloring-arguments|coloring argument]] instead.
`

});

Object.assign(window.MATH_DETAILS, {

"bayes-theorem": String.raw`
## Key forms
- $P(A \mid B) = \dfrac{P(B \mid A)\,P(A)}{P(B)}$ — the chance of the cause given the evidence, from the chance of the evidence given the cause
- $\alt{P(B) = \sum_i P(B \mid A_i)\,P(A_i)}{P(B) = P(B \mid A_1)P(A_1) + P(B \mid A_2)P(A_2) + \cdots}$ — the total probability of the evidence, summed over disjoint and exhaustive causes
- $\dfrac{P(A_1 \mid B)}{P(A_2 \mid B)} = \dfrac{P(A_1)}{P(A_2)} \cdot \dfrac{P(B \mid A_1)}{P(B \mid A_2)}$ — the odds form: prior odds times the likelihood ratio

## Conditions
$P(B) \gt 0$, and the causes $A_i$ are disjoint and together cover every outcome, so that the evidence happens through exactly one of them.

## Why it works
Both $P(A)\,P(B \mid A)$ and $P(B)\,P(A \mid B)$ are the probability of the overlap $A \cap B$, so they are equal, and dividing by $P(B)$ gives the theorem. It is bookkeeping that swaps the direction of the conditioning.

The denominator is the law of total probability. If the causes $A_i$ are disjoint and cover every outcome, the evidence happens through exactly one of them, so $$P(B) = \sum_i P(B \mid A_i)\,P(A_i).$$ That denominator is the same whichever cause is being tested, so the chance of a cause is proportional to its prior times its likelihood, and comparing causes needs only the numerators.

## Useful observations
- The direction matters: problems give $P(\text{evidence} \mid \text{cause})$, such as a test's accuracy, and ask for $P(\text{cause} \mid \text{evidence})$.
- Counting whole people is more reliable than the formula. For a disease in $1\%$ of people and a test that is $90\%$ accurate both ways, among $100{,}000$ people $1{,}000$ are sick and $900$ of them test positive, while $9{,}900$ of the $99{,}000$ healthy people also test positive. So $P(\text{sick} \mid +) = \frac{900}{900 + 9{,}900} = \frac{1}{12}$.
- A rare condition drowns even an accurate test in false positives: when the base rate is far below the false-positive rate, most positives are false.

## Applications
Medical tests and other evidence, a coin or die that might be fair or biased, and populations split into groups with different rates.

## Contest profile
Three problems here, all AIME, none solved by it alone, and each pairs it with conditional probability. The shapes are a coin or die that might be fair or biased, judged after a few outcomes; a population split into groups with different rates, where it helps to count $100$ people; and a lottery, the chance of the top prize given some prize.
`,

"generating-function-method": String.raw`
## When to use
Reaching a total from independent parts, each with its own allowed amounts: making change, distributing identical objects with caps, sums of several dice, partitions into restricted parts. Whenever choices are independent and combine by adding, the product of one polynomial per choice handles every interaction at once.

When the total is small enough to list, or the choices are not independent, listing or casework is shorter, and unlimited identical objects with no caps are plain stars and bars.

## How
1. For each independent part, write a polynomial or series whose coefficient of $x^k$ counts the ways that part contributes $k$.
2. Multiply them together.
3. Read off the coefficient of $x^N$, which counts the ways to reach a total of $N$.
4. Simplify first with $\frac{1}{1 - x} = 1 + x + x^2 + \cdots$ and $1 + x + \cdots + x^m = \frac{1 - x^{m+1}}{1 - x}$.

The ways to make $10$ cents from pennies, nickels and dimes are counted by the coefficient of $x^{10}$ in $\frac{1}{(1 - x)(1 - x^5)(1 - x^{10})}$, which is $4$: ten pennies, a nickel and five pennies, two nickels, or a dime.

## Why it works
Multiplying sums of powers of $x$ produces one term for every combination of choices, one term from each factor, and the exponents add. Collecting like terms groups the combinations by their total, so the coefficient of $x^N$ is the number of combinations that reach $N$.

{{figure:product}}

## Formulas it uses
- [[stars-and-bars]]: $\frac{1}{(1 - x)^k} = \sum \binom{n + k - 1}{k - 1}x^n$, the coefficient for unlimited supplies of $k$ kinds.
- [[multinomial-theorem]]: expands a power of a sum, each coefficient counting the ways to choose its terms.
- [[probability-generating-functions]]: the same product for random variables, where the coefficient of $x^k$ is the probability of a total of $k$, as for the sum of several dice.

## Common traps
- Using $\frac{1}{1 - x}$ for a part that is capped at $m$; that needs $1 + x + \cdots + x^m$.
- Forgetting that a product of polynomials counts unordered combinations of the parts, not orders.
- Expanding everything by brute force instead of using closed forms and subtracting the capped terms.

## Contest profile
Usually the organizing tool for a distribution count with caps; the coefficient is then extracted with stars and bars after a subtraction or two.
`

});

Object.assign(window.MATH_DETAILS, {

"extremal-principle": String.raw`
## When to use
Existence and impossibility claims about a finite configuration: a graph, a set of points, a tournament, a set of numbers. Look at the object that is largest or smallest in some sense, the longest path, the closest pair, the smallest counterexample, because being extreme gives it a property the other objects lack. A configuration with no extreme element, such as the positive reals, offers nothing to take.

## How
1. Choose a quantity to make extreme: a length, a distance, a size, a number of wins.
2. Take an object where it is largest or smallest; one exists because the configuration is finite or the values are positive integers.
3. Use the extremeness: nothing is longer, closer or smaller.
4. Derive a contradiction, or read off the property you want.

In a round-robin tournament, a team $A$ with the most wins reaches every other team in at most two steps: either $A$ beat $B$, or $A$ beat some team that beat $B$. Otherwise $B$ beat $A$ and beat every team that $A$ beat, so $B$ won more games than $A$, which is impossible.

## Why it works
A finite set of numbers, or any nonempty set of positive integers, has a largest and a smallest member, so the extreme object exists. Being extreme is a property: nothing lies beyond it. A typical proof assumes the claim fails, takes the extreme object, and builds from the failure an object more extreme still, which cannot exist.

One use is common enough to have its own card: taking a smallest counterexample and finding a smaller one is the [[minimal-counterexample|minimal counterexample]] proof, the extremal principle applied to the set of counterexamples, and the same argument as infinite descent.

{{figure:longest-path}}

The figure shows the classic use: in a longest path, every neighbor of the last vertex already lies on the path, or the path could be extended.

## Formulas it uses
No formula is needed; the method rests on the fact that a finite or positive-integer set has a largest and a smallest element.

## Common traps
- Taking the largest element of a set that may not have one, such as an infinite set of real numbers.
- Choosing a quantity whose extreme says nothing useful; try another measure.
- Forgetting ties: there may be several extreme objects, and the argument must work for whichever one is taken.

## Contest profile
Mostly olympiad, where it proves that a configuration exists or cannot; in answer-only contests it shows up as starting casework from the largest or smallest element.
`

});

Object.assign(window.MATH_DETAILS, {

"sprague-grundy": String.raw`
## Key forms
- in Nim, a position is a loss for the player to move exactly when the XOR of the pile sizes is $0$: $n_1 \oplus \cdots \oplus n_k = 0$
- every position of an impartial game has a Grundy value $g = \operatorname{mex}\{g(\text{options})\}$, the smallest nonnegative integer missing from its options' values
- a position is losing exactly when $g = 0$, and a sum of independent games has $g(G_1 + \cdots + G_m) = g(G_1) \oplus \cdots \oplus g(G_m)$

## Conditions
The game is impartial (both players have the same moves), finite, and ends when no move is possible, with the last mover winning.

## Why it works
In Nim the XOR of the pile sizes is a handle one controls: if it is nonzero, some pile has a leading bit that can be cleared to make the whole XOR zero, a move to a position that is losing for the opponent; if it is zero, every move breaks it. Sprague–Grundy generalizes this by giving each position its mex value. A position with $g = 0$ can only move to positions with $g \ne 0$ and the reverse, which is Nim's win-and-loss logic.

Independent games combine because the XOR of Grundy values behaves like one Nim position.

## Useful observations
- For a single game type, tabulating $g(0), g(1), \ldots$ by the mex rule usually shows a periodic pattern, and $g = 0$ marks the losing positions.
- When a game splits into independent parts, the whole is a loss exactly when the XOR of the parts' values is $0$.
- The winning move zeroes the XOR, treating each part as a Nim pile whose size is its Grundy value.

## Applications
Multi-pile take-away and token games, and games that separate into independent components.

## Contest profile
Multi-pile games on AIME and olympiad problems. The single-pile version is the losing-positions card, and Sprague–Grundy is the step up once the game separates into components.
`,

"erdos-szekeres": String.raw`
## Key forms
- $mn + 1$ distinct terms contain an increasing run of length $m + 1$ or a decreasing run of length $n + 1$
- with $m = n$: any $n^2 + 1$ distinct reals contain a monotone subsequence of length $n + 1$
- the bound is sharp: $mn$ terms can avoid both

## Conditions
The terms are distinct real numbers, and the subsequences keep the original order of the terms.

## Why it works
Tag each term $x_i$ with $(u_i, d_i)$: the lengths of the longest increasing and longest decreasing subsequences ending at $x_i$. If $i \lt j$ and $x_i \lt x_j$ then $u_j \gt u_i$; if $x_i \gt x_j$ then $d_j \gt d_i$, so distinct terms always get distinct tags.

With $mn + 1$ terms but only $mn$ tags satisfying $u \le m$ and $d \le n$, the [[pigeonhole|pigeonhole principle]] forces some $u \ge m + 1$ or $d \ge n + 1$.

## Useful observations
- The proof is the technique worth carrying: to each term is attached the pair (longest increasing run ending there, longest decreasing run ending there), and any two terms have different labels, because whichever comes first extends one of the other's runs.
- The trigger is a problem asking to guarantee a monotone subsequence, or to show a sequence cannot avoid one.
- The labeling idea generalizes: pairing each element with two extremal statistics and counting the available pairs is a reusable pigeonhole setup.

## Applications
Guaranteeing a long monotone subsequence, and showing that a sequence cannot avoid one.

## Contest profile
Olympiad combinatorics, typically as a lemma, and a natural companion to the Pigeonhole Principle. The bound is sharp, achieved by blocks arranged so that runs are short in both directions.
`,

"planar-graph-bound": String.raw`
## Key forms
- $e \le 3v - 6$ for a simple planar graph with $v \ge 3$ vertices
- $e \le 2v - 4$ for a triangle-free (in particular bipartite) planar graph
- every planar graph has a vertex of degree at most $5$

## Conditions
The graph is simple, with no loops or repeated edges, and planar. The bound runs one way only: violating it disproves planarity, but satisfying it proves nothing.

## Why it works
Euler's Formula $v - e + f = 2$ holds for any connected planar drawing. Every face is bounded by at least $3$ edges and every edge borders exactly $2$ faces, so $2e \ge 3f$, that is $f \le \frac{2e}{3}$; substituting into Euler's Formula gives $e \le 3v - 6$.

If the graph is triangle-free, every face needs at least $4$ edges, so $2e \ge 4f$ and $e \le 2v - 4$.

## Useful observations
- The bound proves non-planarity by counting: a graph with more edges than $3v - 6$ allows cannot be drawn without crossings. This settles $K_5$ immediately, since $10 \gt 3 \cdot 5 - 6 = 9$.
- For triangle-free graphs the sharper form is used, since every face then needs at least four edges. That is what disposes of $K_{3,3}$, which is bipartite with $9 \gt 2 \cdot 6 - 4 = 8$.
- A useful corollary is that every planar graph has a vertex of degree at most $5$, the starting point for planar coloring arguments.

## Applications
Proving that a graph is not planar, bounding the number of edges of a planar map, and degree arguments for planar graphs.

## Contest profile
AMC and AIME problems about maps, networks, and polyhedra, and olympiad graph theory. It is the corollary of Euler's Polyhedron Formula, the same identity read as a planar graph rather than a solid.
`,

"halls-marriage": String.raw`
## Key forms
- a matching saturates $X$ $\iff$ $\lvert N(S)\rvert \ge \lvert S\rvert$ for every $S \subseteq X$ — Hall's condition, where $N(S)$ is the set of neighbors of $S$
- the only obstruction to a full matching is a single deficient set $S$ with $\lvert N(S)\rvert \lt \lvert S\rvert$
- a $k$-regular bipartite graph always has a perfect matching

## Conditions
The graph is bipartite, with the applicants $X$ on one side and the jobs on the other. A matching saturates $X$ when every applicant gets a distinct job they are connected to.

## Why it works
The condition $\lvert N(S)\rvert \ge \lvert S\rvert$ for every $S \subseteq X$ is clearly necessary: a group of applicants adjacent to fewer jobs than its size cannot all be matched.

Sufficiency is the theorem: if no matching saturates $X$, an augmenting-path argument extracts a specific deficient set $S$ with $\lvert N(S)\rvert \lt \lvert S\rvert$. So the sole obstruction to a full matching is one bottleneck set.

## Useful observations
- To prove a matching exists, Hall's condition is verified; to prove none exists, one deficient set is exhibited. That asymmetry makes the theorem practical, since disproof needs only a single example.
- Checking all $2^{\lvert X\rvert}$ subsets is rarely necessary. Structural arguments usually suffice: in a $k$-regular bipartite graph, counting the edges leaving $S$ shows $\lvert N(S)\rvert \ge \lvert S\rvert$ at once, so a perfect matching always exists.
- The standard dressings are assigning people to tasks, placing non-attacking rooks, and choosing distinct representatives from a family of sets.

## Applications
Systems of distinct representatives, Latin-square and tiling completions, and "can these be paired or assigned?" existence problems.

## Contest profile
Olympiad combinatorics: the whole task reduces to checking Hall's condition or naming the one set that fails it.
`

});

Object.assign(window.MATH_DETAILS, {

"dilworths-theorem": String.raw`
## Key forms
- the fewest chains (totally ordered subsets) covering a finite poset equals the size of its largest antichain (pairwise-incomparable subset)
- Mirsky's theorem, the dual: the fewest antichains covering a poset equals the length of its longest chain
- Erdős–Szekeres is the classic corollary: ordering points by first coordinate and comparing by second, chains are increasing subsequences and antichains decreasing ones

## Conditions
The poset is finite. Divisibility, containment, and dominance in two coordinates are the usual partial orders.

## Why it works
A chain and an antichain share at most one element, so at least as many chains as the largest antichain are always needed: the easy direction. That this many suffice is the theorem, provable by induction or via [[konigs-theorem|Kőnig's Theorem]] on an associated bipartite graph. Mirsky's dual swaps chains and antichains.

## Useful observations
- The setup is recognized as a partial order, where everything must be covered with few chains or a large incomparable family found.
- The theorem converts between the two, which is what makes it useful: bounding one side is usually much easier than the other.
- Erdős–Szekeres falls out by ordering terms by both index and value, a specialization that is often the quickest route into a sequence problem.

## Applications
Partitioning into monotone pieces, scheduling, and "cover with few chains" problems.

## Contest profile
Olympiad combinatorics. Building the right poset and quoting Dilworth or Mirsky is usually the cleanest path.
`,

"sperners-theorem": String.raw`
## Key forms
- the largest antichain in the subsets of an $n$-element set has size $\dbinom{n}{\lfloor n/2\rfloor}$, attained by all subsets of the middle size
- the LYM inequality: $\alt{\sum_{A}\dbinom{n}{\lvert A\rvert}^{-1} \le 1}{\dbinom{n}{\lvert A_1\rvert}^{-1} + \dbinom{n}{\lvert A_2\rvert}^{-1} + \cdots \le 1}$ over any antichain of subsets

## Conditions
An antichain is a family of subsets with none containing another. The bound is for families of subsets of one $n$-element set, with no restriction on sizes.

## Why it works
Partition the subset lattice of $\{1, \ldots, n\}$ into $\binom{n}{\lfloor n/2\rfloor}$ symmetric chains; an antichain meets each chain at most once, capping its size, and the middle layer attains it.

The LYM inequality over any antichain gives the bound directly, since $\binom{n}{\lvert A\rvert} \le \binom{n}{\lfloor n/2\rfloor}$ for every size, so each term is at least $\binom{n}{\lfloor n/2\rfloor}^{-1}$.

## Useful observations
- The construction is immediate: every subset of size $\lfloor n/2\rfloor$ is taken. Proving that no larger family exists is the real content.
- The LYM inequality is the more flexible form, since it weights subsets by size and so handles families with mixed sizes, which the plain bound does not.

## Applications
Committees where no committee contains another, divisor sets with no divisibility relations, and extremal families of sets.

## Contest profile
Olympiad extremal set theory. Two things are carried: the size of the largest family, and the LYM inequality as the lever.
`,

"polya-enumeration": String.raw`
## Key forms
- $Z_G = \dfrac{1}{\lvert G\rvert}\alt{\sum_g\prod_k t_k^{\,c_k(g)}}{\left(t_1^{c_1(g_1)}t_2^{c_2(g_1)}\cdots + t_1^{c_1(g_2)}t_2^{c_2(g_2)}\cdots + \cdots\right)}$, the cycle index, with $c_k(g)$ the number of $k$-cycles of $g$
- substituting $t_k = m$ recovers Burnside's count of colorings with $m$ colors
- substituting $t_k = \alt{\sum_j y_j^{\,k}}{y_1^{\,k} + y_2^{\,k} + \cdots + y_m^{\,k}}$ gives a generating function whose coefficients count colorings with a prescribed number of each color
- for rotations of an $n$-bead necklace, $Z_{C_n} = \dfrac1n\alt{\sum_{d \mid n}\varphi(d)\,t_d^{\,n/d}}{\left(t_1^{\,n} + \cdots + \varphi(n)\,t_n\right)}$

## Conditions
$G$ is a finite group acting on the positions. A coloring is fixed by $g$ exactly when it is constant on each cycle of $g$.

## Why it works
Burnside counts orbits by averaging fixed points, and Pólya refines "fixed" into a generating function through each symmetry's cycle structure. A coloring is fixed by $g$ exactly when it is constant on every cycle of $g$, so weighting by colors gives $\prod_k(\text{sum over colors of color}^k)^{c_k(g)}$, and averaging over $G$ gives the cycle index.

## Useful observations
- For plain orbit counts, Burnside's Lemma is enough.
- The refinement is needed for counts such as bracelets with exactly three red beads.

## Applications
Counting colorings with a prescribed number of each color, up to symmetry, in necklaces, bracelets, and similar patterns.

## Contest profile
Needed only for colorings with a fixed color distribution up to symmetry. Rare and olympiad-tier.
`,

"probability-generating-functions": String.raw`
## Key forms
- $\alt{G_X(s) = E[s^X] = \sum_kP(X = k)\,s^k}{G_X(s) = P(X=0) + P(X=1)s + P(X=2)s^2 + \cdots}$
- $E[X] = G_X'(1)$ and $\operatorname{Var}(X) = G_X''(1) + G_X'(1) - G_X'(1)^2$
- $G_{X+Y} = G_XG_Y$ for independent $X$ and $Y$, and the coefficient of $s^k$ is $P(X = k)$

## Conditions
$X$ takes nonnegative integer values. The sums of independent variables are independent sums.

## Why it works
$G_X(s) = \sum_kP(X = k)s^k$ stores the whole distribution. Differentiating and setting $s = 1$ pulls down factors of $k$: $G'(1) = E[X]$ and $G''(1) = E[X(X - 1)]$, which gives the variance. Independence multiplies the PGFs, because $E[s^{X+Y}] = E[s^X]\,E[s^Y]$.

## Useful observations
- For a sum of independent nonnegative integer variables, the distribution is one polynomial expansion of the product of the PGFs.
- A single fair die has PGF $\frac{s + s^2 + \cdots + s^6}{6}$, and $n$ dice have that to the $n$th power.
- The moments come from derivatives at $1$ and the probabilities from coefficients.

## Applications
Distributions of sums of independent counts, and the mean and variance together.

## Contest profile
A convenience for sums of independent counts, essentially ordinary [[generating-function-method|generating functions]] in probabilistic dress.
`,

"konigs-theorem": String.raw`
## Key forms
- in a bipartite graph, the size of a maximum matching equals the size of a minimum vertex cover
- the maximum independent set has size $n$ minus the maximum matching, where $n$ is the number of vertices — the Kőnig–Egerváry form
- a matching of size $k$ bounds the cover from below, and a cover of size $k$ bounds the matching from above; when they agree, both are optimal

## Conditions
The graph is bipartite. The theorem genuinely fails without it: a triangle has a maximum matching of size $1$ and a minimum vertex cover of size $2$.

## Why it works
Any vertex cover must contain an endpoint of every matched edge, so cover $\ge$ matching always. In bipartite graphs, an augmenting-path argument, equivalently max-flow/min-cut on the bipartite network, constructs a cover of exactly the maximum matching's size, giving equality. It is a min-max duality, the dual of Hall's Theorem and a special case of max-flow/min-cut.

## Useful observations
- It converts between two bounds of very different difficulty. Exhibiting a matching of size $k$ bounds the cover from below, and exhibiting a cover of size $k$ bounds the matching from above; when the two agree, both are optimal and the equality is proved.
- The complementary reading is often what a problem wants: the largest independent set is the complement of the smallest vertex cover, so it also computes maximum independent sets in bipartite graphs.
- Bipartiteness is checked first, since configurations that look bipartite sometimes contain an odd cycle.

## Applications
Covering and packing problems on grids and bipartite structures, such as the fewest lines covering all the marked cells of a board and the most non-attacking rooks on marked cells.

## Contest profile
Olympiad combinatorics on grids and bipartite structures. The min-max duality is the tool, paired with Hall's Theorem, its existence-flavored twin.
`,

"turans-theorem": String.raw`
## Key forms
- a $K_{r+1}$-free graph on $n$ vertices has $e \le \left(1 - \dfrac1r\right)\dfrac{n^2}{2}$ edges, with equality for the Turán graph, the complete $r$-partite graph with parts as equal as possible
- Mantel's theorem, $r = 2$: a triangle-free graph has at most $\lfloor n^2/4\rfloor$ edges, attained by the balanced complete bipartite graph

## Conditions
The graph is simple and has no clique on $r + 1$ vertices. The exact maximum, when $r$ does not divide $n$, is the number of edges of the Turán graph with parts of sizes differing by at most one.

## Why it works
Among $K_{r+1}$-free graphs, rebalancing (Zykov symmetrization) never creates a clique and only adds edges, pushing the maximum to the Turán graph, which has $\left(1 - \frac1r\right)\frac{n^2}{2}$ edges when $r$ divides $n$.

## Useful observations
- The shape is an extremal question: how many edges can a graph have before a clique of a given size is unavoidable. The bound answers it and the Turán graph shows it cannot be improved.
- Mantel's case is the one that appears at contest level, and proving it directly is short: for any edge, its endpoints share no neighbor, so their degrees sum to at most $n$.
- In the contrapositive, a problem gives many edges and asks for a clique: exceeding the bound guarantees one exists without having to construct it.

## Applications
Maximum edges without a clique, and guaranteeing a clique from a large edge count.

## Contest profile
Olympiad extremal graph theory, with Mantel occasionally surfacing on harder problems. The extremal example, the balanced complete multipartite graph, is remembered, not just the number.
`,

"graph-coloring": String.raw`
## Key forms
- $\chi(G) \le \Delta + 1$ — greedy coloring, where $\Delta$ is the maximum degree
- $\chi(G) \le \Delta$ for every connected graph except complete graphs and odd cycles — Brooks' theorem
- $G$ is bipartite $\iff \chi = 2 \iff$ $G$ has no odd cycle
- $\chi(G) \ge \omega(G)$, the size of the largest clique, and $G$ planar $\implies \chi \le 4$ — the Four Color Theorem

## Conditions
The coloring is proper, so adjacent vertices get different colors, and the graph is simple. Greedy coloring works in any vertex order.

## Why it works
Greedy coloring in any order uses at most $\Delta + 1$ colors: each vertex sees at most $\Delta$ colored neighbors, so a color is free. Two colors suffice exactly when the graph is bipartite, which is equivalent to having no odd cycle, since a $2$-coloring is a bipartition. Planar $4$-colorability is the deep Four Color Theorem.

## Useful observations
- The chromatic number is bounded from both sides: the greedy bound caps it above, and any clique caps it below, so exhibiting a $k$-clique together with a $k$-coloring settles $\chi = k$ exactly.
- The bipartite test is the one used most: producing a single odd cycle is usually the fastest way to prove that three colors are needed.
- The greedy bound is rarely tight; Brooks' theorem sharpens it to $\Delta$, which is worth knowing when the bound looks one too large.

## Applications
Scheduling, map, and conflict problems, bipartiteness tests, and [[invariants-coloring|coloring arguments]].

## Contest profile
Scheduling, map, and conflict problems on the AMC and AIME, plus olympiad coloring arguments. The everyday facts are the greedy $\Delta + 1$ bound and "bipartite if and only if no odd cycle."
`,

"probabilistic-method": String.raw`
## When to use
An olympiad claim that some object exists, such as a coloring with no monochromatic structure, a subset with a property, or a cut with many edges, when building one explicitly is hard but a random object usually works. It proves existence only and gives no way to find the object, and a failure probability above $1$ proves nothing.

## How
1. Choose a random way to build the object, often coloring or selecting each element independently.
2. Either list the bad events and show their probabilities add to less than $1$, or define a quantity $X$ and compute $E[X]$.
3. Conclude that some outcome avoids every bad event, or that some outcome has $X$ at least its average.

Every graph with $m$ edges has a cut of at least $\frac m2$ edges. Color each vertex red or blue at random: each edge joins two colors with probability $\frac12$, so the expected number of crossing edges is $\frac m2$, and some coloring has at least that many.

## Why it works
An average is always reached: if every outcome had $X < c$, the average would be below $c$, so $E[X] \ge c$ forces some outcome with $X \ge c$. For bad events, the chance that at least one happens is at most the sum of their chances, so if that sum is below $1$, some outcome has none of them. Both turn a probability calculation into a proof that a good object exists, without ever naming it.

## Formulas it uses
- [[expected-value]]: linearity gives the expected number of good or bad structures without knowing how they interact.
- [[basic-probability]]: the union bound, that the chance of at least one bad event is at most the sum of their chances.

## Common traps
- A union bound that adds to $1$ or more, which proves nothing.
- Forgetting that the average is reached on both sides: some outcome is at least the average and some is at most.
- A random construction that does not produce the objects the problem asks about.

## Contest profile
Olympiad only: it proves existence without a construction, which answer-only contests never ask for.
`

});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"transfer-matrix-method": String.raw`
## When to use
Counting sequences, colorings of a strip or tilings of a $k \times n$ board where each next choice depends only on the last few, especially when $n$ is large or a general formula is wanted. When a recursion would need several sequences that feed into each other, the matrix keeps them organized. For strings with a rule about neighbors, see [[restricted-sequences|Counting Restricted Sequences (State Machines)]].

## How
1. Choose states that record just enough of the recent past to decide which next choices are allowed.
2. Build the matrix $M$ with $M_{ij}$ equal to the number of ways state $i$ can be followed by state $j$.
3. The sequences of length $n$ from state $i$ to state $j$ number $(M^n)_{ij}$; add over the allowed starts and ends.
4. For circular arrangements, take the trace of $M^n$.
5. For a closed form, use the characteristic polynomial of $M$, which gives the recursion the counts satisfy.

Binary strings with no two consecutive $1$s, with states "last digit $0$" and "last digit $1$": $M = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$, since a $0$ may be followed by either digit and a $1$ only by a $0$. The characteristic polynomial $x^2 - x - 1$ gives $a_n = a_{n-1} + a_{n-2}$, and the circular strings of length $n$ number $\operatorname{tr} M^n$: $1, 3, 4, 7, 11, \ldots$, the Lucas numbers.

## Why it works
Matrix multiplication adds over the states in between: $(M^2)_{ij} = \sum_k M_{ik}M_{kj}$ counts the two-step walks $i \to k \to j$, and in general $(M^n)_{ij}$ counts the $n$-step walks from $i$ to $j$ through the allowed transitions, which are exactly the valid sequences. The trace counts the walks that return to their starting state, which are the valid circular arrangements. A $k \times k$ matrix satisfies its own characteristic polynomial, so every entry of $M^n$ obeys a linear recursion of order at most $k$.

## Formulas it uses
- [[matrix-multiplication]]: the rule $(AB)_{ij} = \sum_k A_{ik}B_{kj}$, which is exactly a sum over the state in between.
- [[linear-recurrence]]: turns the characteristic polynomial of $M$ into a closed form for the counts.

## Common traps
- States that remember too little, so the matrix allows forbidden patterns.
- An off-by-one in the length: $n$ symbols make $n - 1$ transitions.
- Counting circular arrangements with $\mathbf u^{\top} M^n \mathbf v$ instead of the trace.

## Contest profile
Rare on answer-only contests, where a two- or three-state recursion usually does the same job; it organizes larger state spaces in olympiad problems.
`,

"subset-sum-facts": String.raw`
## Key forms
- $\alt{\sum_{S \subseteq A}\sum_{x \in S}x = 2^{\,n-1}\sum_{x \in A}x}{\text{(sum of all subset sums)} = 2^{\,n-1}(a_1 + a_2 + \cdots + a_n)}$ — each element lies in exactly $2^{n-1}$ of the $2^n$ subsets
- if $A$ has at least one odd element, exactly half the subsets, $2^{n-1}$ of them, have an even sum
- equally many subsets have even size as odd size, for $n \ge 1$ — the binomial identity at $x = 1$, $y = -1$

## Conditions
$A$ has $n$ elements. The sum-parity split needs one odd element; with no odd element every subset sum is even and the split fails.

## Why it works
Fix one element $x$. Pairing each subset that contains $x$ with that subset minus $x$ is a bijection, so $x$ sits in exactly half of all subsets, $2^{n-1}$ of them. Weighting each element by how often it appears gives $\sum_S\sum_{x \in S}x = 2^{n-1}\sum_x x$.

For parity, pick an odd element $t$: toggling $t$ in or out, the symmetric difference with $\{t\}$, flips a subset's sum parity and is a bijection, so even-sum and odd-sum subsets are equinumerous, $2^{n-1}$ each.

## Useful observations
- For a sum over all subsets, each element appears in exactly $2^{n-1}$ of them, so the total is $2^{n-1}$ times the sum of the set, with nothing listed.
- The sum-parity split rests on one bijection, and the case with no odd element is the one to check before quoting the result.
- The size-parity split is different and always holds, by the [[binomial-theorem|Binomial Theorem]] at $x = 1$, $y = -1$.

## Applications
Sums over all subsets, counts of subsets with even or odd sum or size, and any additive statistic summed over a family.

## Contest profile
AMC and AIME "sum over all subsets" and "how many subsets have even sum" problems collapse to one line; the same appearance-counting idea, each element or pair counted a fixed number of times, generalizes to summing any additive statistic over a family.
`,

"tail-sum-expectation": String.raw`
## Key forms
- $\alt{E[X] = \sum_{k=1}^{\infty}P(X \ge k)}{E[X] = P(X \ge 1) + P(X \ge 2) + P(X \ge 3) + \cdots}$ for a nonnegative integer $X$
- $E[X] = \displaystyle\int_0^{\infty}P(X \gt t)\,\mathrm{d}t$ for $X \ge 0$ — the continuous analog, the area above the distribution function
- $\alt{P(\max \lt k) = \prod_i P(X_i \lt k)}{P(\max \lt k) = P(X_1 \lt k)P(X_2 \lt k)\cdots P(X_n \lt k)}$ for independent draws — the tail of a maximum is one product

## Conditions
$X$ takes nonnegative integer values for the sum, and the sum starts at $k = 1$ with $\ge$ and not $\gt$. Starting at $k = 0$ adds a spurious $1$.

## Why it works
Write $X$ as a sum of indicators of its own tail: $X = \sum_{k \ge 1}\mathbf 1[X \ge k]$, since a value of $X = m$ makes exactly the first $m$ indicators equal to $1$. Taking expectations and using linearity, $E[X] = \sum_{k \ge 1}P(X \ge k)$.

Equivalently, it is a swap of summation order: $\sum_k P(X \ge k) = \sum_k\sum_{m \ge k}P(X = m) = \sum_m m\,P(X = m)$. The continuous version replaces the sum by $\int_0^\infty P(X \gt t)\,\mathrm{d}t$.

## Useful observations
- It is used whenever $P(X \ge k)$ is easier to describe than $P(X = k)$, which happens far more often than not.
- Expected maxima are the flagship case: $P(\max \lt k)$ is a product over the independent draws, so the tail is one subtraction, while the exact distribution of the maximum requires a difference of two such products.
- For a geometric wait, $P(X \ge k) = (1 - p)^{k-1}$ sums to $\frac1p$.

## Applications
Expected maximum or minimum of independent draws, expected waiting times, and expectations whose "at least $k$" event is simple.

## Contest profile
An AIME expected-value problem where the distribution is messy but the event of reaching at least a given value is a one-liner is the signal to use the tail sum. It is the discrete cousin of the survival-function integral seen in continuous problems.
`

});

Object.assign(window.MATH_DETAILS, {

"exponential-generating-functions": String.raw`
## Key forms
- $\alt{\hat A(x) = \sum_{n \ge 0}a_n\dfrac{x^n}{n!}}{\hat A(x) = a_0 + a_1x + a_2\dfrac{x^2}{2!} + a_3\dfrac{x^3}{3!} + \cdots}$
- $\widehat{A\cdot B}(x) = \hat A(x)\hat B(x)$ means $\alt{c_n = \sum_k\binom nk a_kb_{n-k}}{c_n = \binom n0a_0b_n + \binom n1a_1b_{n-1} + \cdots + \binom nna_nb_0}$, the labeled product
- $e^x$ is one structure on each label set, $e^x - 1$ a nonempty set, $\dfrac1{1 - x}$ a linear order, and $\exp(\text{connected})$ counts structures built from connected pieces

## Conditions
The objects are labeled. The coefficient of $\frac{x^n}{n!}$ gives the count $a_n$, so the final factor $n!$ must be restored when reading off a coefficient.

## Why it works
Weighting the $n$th term by $\frac1{n!}$ makes the product of two EGFs reindex as $c_n = \sum_k\binom nka_kb_{n-k}$: exactly the number of ways to split the $n$ labels between two labeled structures. So EGF multiplication is the labeled analogue of choosing, which ordinary generating functions would undercount.

## Useful observations
- EGFs are the right tool whenever the count involves choosing which labels go to which part.
- Exponentiating an EGF partitions the labels into an unordered collection of that structure, which is how [[derangements|derangements]], set partitions, and labeled trees come out.
- Forgetting the final factor of $n!$ when extracting $a_n$ is the standard slip.

## Applications
Derangements, surjections, set partitions, and permutation-structure counts that ordinary generating functions undercount.

## Contest profile
Advanced olympiad and Putnam counting, where EGFs handle counts that ordinary generating functions handle badly.
`,

"moser-circle": String.raw`
## Key forms
- $R(n) = \dbinom n4 + \dbinom n2 + 1$ — the regions cut from a disk by all chords of $n$ points on its circle, with no three chords meeting inside
- $1, 2, 4, 8, 16, 31, 57, \ldots$ for $n = 1, 2, 3, \ldots$ — it agrees with $2^{n-1}$ up to $n = 5$ and then breaks

## Conditions
No three chords meet at one interior point. With a regular polygon chords do meet three at a time, and the count drops.

## Why it works
Apply [[eulers-formula|Euler's Formula]] $V - E + F = 2$ to the planar graph of points, chord crossings, and arcs. There are $\binom n2$ chords and $\binom n4$ interior crossings, one per choice of $4$ points, and bookkeeping the edges and faces yields $R(n) = \binom n4 + \binom n2 + 1$.

Equivalently, each new chord adds one region plus one more for every crossing it makes.

## Useful observations
- The formula is a warning: five data points agreeing with $2^{n-1}$ prove nothing, and the sequence breaks at exactly the moment most people stop checking.
- Each interior crossing comes from choosing four points on the circle, giving $\binom n4$ vertices, which is what explains the shape of the formula.
- The no-three-concurrent condition is essential and a common trap in problem statements.

## Applications
Regions cut by chords of a circle, and cautionary examples against extrapolating a pattern.

## Contest profile
A famous AMC and MATHCOUNTS trap; the instinct that the doubling pattern must continue is exactly what the problem punishes, so the formula is worth carrying.
`,

"gap-method": String.raw`
## When to use
"No two of these are adjacent": people who must not sit next to each other, books of one subject that must be separated, binary strings with no two consecutive $1$s, or choosing $k$ numbers from $1$ to $n$ with no two consecutive. Items that must stay together instead of apart are [[counting-blocks|glued into blocks]].

## How
1. Arrange the unrestricted items first, counting their orders if they are distinct.
2. Count the gaps they leave: $n$ items in a row leave $n + 1$ gaps, the two ends included, and $n$ items in a circle leave $n$.
3. Choose distinct gaps for the restricted items, $\binom{n + 1}{k}$ ways in a row.
4. Multiply by $k!$ if the restricted items are distinct.

Four boys and three girls stand in a row with no two girls adjacent. The boys stand in $4! = 24$ orders and leave $5$ gaps; choosing $3$ of them takes $\binom53 = 10$ ways, and the girls stand in $3! = 6$ orders. Total $24 \cdot 10 \cdot 6 = 1440$.

## Why it works
Once the unrestricted items are in place, two restricted items are adjacent exactly when they share a gap, so the arrangements with no two adjacent are exactly those that put the restricted items in distinct gaps. Each choice of distinct gaps, together with an order of the items, gives one arrangement, and each arrangement comes from one such choice. With identical items it says that $k$ non-consecutive numbers can be chosen from $1$ to $n$ in $\binom{n - k + 1}{k}$ ways, since the other $n - k$ numbers leave $n - k + 1$ gaps. The figure shows the example's gaps.

## Formulas it uses
- [[non-adjacent-selection]]: $\binom{n - k + 1}{k}$ ways to choose $k$ of $n$ objects in a row with no two adjacent, the gap count with identical items.
- [[permutations-combinations]]: the orders of both kinds of items, and the binomial coefficient for choosing the gaps.

## Common traps
- Forgetting the two end gaps in a row, or counting end gaps around a circle, which has only $n$.
- Letting a gap hold more than one restricted item, which allows adjacency.
- Using gaps for "not all together", which is the total minus "all together".

## Contest profile
Usually the whole count for a non-adjacency condition, sometimes inside casework when the conditions are mixed.
`,


"matrix-tree-theorem": String.raw`
## Key forms
- the number of spanning trees of a graph is any cofactor of its Laplacian $L = D - A$, degree matrix minus adjacency matrix
- equivalently it is $\dfrac1n\lambda_1\lambda_2\cdots\lambda_{n-1}$, the product of the nonzero Laplacian eigenvalues over $n$
- for the complete graph $K_n$ it gives $n^{n-2}$

## Conditions
The graph is finite and may have multiple edges. Deleting any one row and the matching column gives the same determinant.

## Why it works
Expanding a cofactor of $L = D - A$ by the Cauchy–Binet formula gives a signed sum over subsets of edges, and only the acyclic spanning subsets survive, so the cofactor counts spanning trees. Equivalently it equals $\frac1n$ times the product of the nonzero Laplacian eigenvalues.

## Useful observations
- Putting each degree on the diagonal and $-1$ for each edge builds $L$, and the row to delete is whichever makes the arithmetic easiest.
- The eigenvalue form is faster for symmetric graphs with known spectrum, such as cycles, complete graphs, and hypercubes.
- Applying it to $K_n$ must reproduce $n^{n-2}$, which catches sign and deletion errors.

## Applications
Counting spanning trees by one determinant, and the headline corollary [[cayleys-formula|Cayley's Formula]].

## Contest profile
Advanced olympiad and Putnam combinatorics: a daunting spanning-tree enumeration becomes one determinant.
`,

"lgv-lemma": String.raw`
## Key forms
- in a directed acyclic graph with sources $a_1, \ldots, a_k$ and sinks $b_1, \ldots, b_k$, the signed count of families of pairwise non-intersecting paths $a_i \to b_{\sigma(i)}$ is $\det[M_{ij}]$, with $M_{ij}$ the number of paths from $a_i$ to $b_j$
- when the only non-crossing way to match sources to sinks is $a_i \to b_i$, the determinant is the plain count

## Conditions
The graph is directed and has no cycles. The sources and sinks must be arranged so that every non-intersecting system is the identity matching, or else the signs of the other matchings must be accounted for.

## Why it works
Swapping the tails of two crossing paths at the first crossing pairs every intersecting system with another of opposite sign in the determinant expansion, so those terms cancel. Only the non-intersecting families remain, and their signed count is $\det[M_{ij}]$.

## Useful observations
- The word "non-intersecting" in a problem statement is the cue.
- The standard applications are lattice paths forbidden to touch, and determinant formulas for plane partitions and tilings.
- Arranging sources and sinks so that only $a_i \to b_i$ is non-crossing makes every off-diagonal permutation drop out.

## Applications
Counting families of non-touching lattice paths, plane partitions, and tilings by a determinant.

## Contest profile
Olympiad and Putnam level, where seeing non-intersecting lattice paths as a determinant is behind many exact product-formula counts.
`,

"squared-binomial-sum": String.raw`
## Key forms
- $\alt{\sum_{k=0}^{n}\dbinom nk^2}{\dbinom n0^2 + \dbinom n1^2 + \cdots + \dbinom nn^2} = \dbinom{2n}{n}$ — the squares of one row of Pascal's triangle
- $\dbinom{2n}{n}\Big/4^n$ — the chance two people flipping $n$ fair coins each get the same number of heads

## Conditions
The identity is [[vandermonde|Vandermonde's Identity]] with $m = r = n$. The signed companion with alternating signs is a different sum with a different value.

## Why it works
Count the ways to choose $n$ things from $2n$, having split the $2n$ into two halves of size $n$. Any such choice takes some number $k$ from the first half and the remaining $n - k$ from the second, so the choices with a given $k$ number $\binom nk\binom n{n-k}$.

Since $\binom n{n-k} = \binom nk$, that is $\binom nk^2$, and summing over $k$ counts every choice exactly once. The total is $\binom{2n}{n}$.

The special case behaves differently from the general identity: the answer collapses to a single binomial coefficient instead of staying a convolution, which is what makes it usable in the middle of a computation.

## Useful observations
- A sum of squares of binomial coefficients is replaced by one coefficient, and in reverse a lone $\binom{2n}{n}$ can be opened up into $\sum_k\binom nk^2$ when a sum is needed to compare against another sum.
- Two people each flip $n$ fair coins; the chance they get the same number of heads is $\sum_k\binom nk^2/4^n$, which the identity turns into $\binom{2n}{n}/4^n$.
- By symmetry the two are equally likely to be ahead, so each wins with probability $\frac12\left(1 - \binom{2n}{n}/4^n\right)$.

## Applications
Closing a sum of squared binomial coefficients, coin-flip tie probabilities, and counting arrangements split into two equal halves.

## Contest profile
AIME uses it to close a sum that would otherwise need generating functions, and AMC uses the coin version. The signed companion, [[alternating-squared-binomials|the alternating sum of squared binomials]], comes from the same $(1 - x)^m(1 + x)^m$ expansion and is worth learning alongside it.
`,

"alternating-squared-binomials": String.raw`
## Key forms
- $\alt{\sum_{k=0}^{2n}(-1)^k\dbinom{2n}{k}^2}{\dbinom{2n}{0}^2 - \dbinom{2n}{1}^2 + \cdots + \dbinom{2n}{2n}^2} = (-1)^n\dbinom{2n}{n}$ — for an even upper index
- $\alt{\sum_{k=0}^{m}(-1)^k\dbinom mk^2}{\dbinom m0^2 - \dbinom m1^2 + \cdots} = 0$ for odd $m$ — no middle term
- $\alt{\sum_k(-1)^k\dbinom mk\dbinom m{r-k}}{\dbinom m0\dbinom mr - \dbinom m1\dbinom m{r-1} + \cdots}$ is the coefficient of $x^r$ in $(1 - x^2)^m$: zero for odd $r$ and $(-1)^{r/2}\dbinom m{r/2}$ for even $r$

## Conditions
The upper index is $m$, even or odd, and the sum runs over $k = 0, \ldots, m$. The unsigned companion is $\sum_k\binom nk^2 = \binom{2n}{n}$.

## Why it works
Compare the coefficient of $x^m$ on both sides of $(1 - x)^m(1 + x)^m = (1 - x^2)^m$.

On the left, expand each factor: $(1 - x)^m = \sum_j(-1)^j\binom mjx^j$ and $(1 + x)^m = \sum_i\binom mix^i$. Collecting $x^m$ needs $i + j = m$, so the coefficient is $\sum_j(-1)^j\binom mj\binom m{m-j}$, and $\binom m{m-j} = \binom mj$ turns it into $\sum_j(-1)^j\binom mj^2$.

On the right, $(1 - x^2)^m = \sum_t(-1)^t\binom mtx^{2t}$ contains only even powers. If $m = 2n$ is even, $x^m$ arises from $t = n$, contributing $(-1)^n\binom{2n}{n}$. If $m$ is odd there is no $t$ with $2t = m$, so the coefficient is $0$.

## Useful observations
- A sum of squared binomials with alternating signs is one coefficient of $(1 - x^2)^m$, so the parity of the upper index is read first. An odd upper index means the answer is $0$ with no work, a common trap since the sum looks like it should be messy.
- The technique matters more than the closed form: the two expansions whose product simplifies are multiplied, and a single coefficient is compared.

## Applications
Sums of squared binomial coefficients with alternating signs, and products of two [[generating-function-method|generating functions]] that simplify.

## Contest profile
An AIME-level identity that shows up when a problem manufactures an alternating sum of squared binomial coefficients out of a counting argument or a product of two generating functions.
`,

"markovs-inequality": String.raw`
## Key forms
- for $X \ge 0$ and $a > 0$: $P(X \ge a) \le \dfrac{E[X]}{a}$
- applying it to $(X - \mu)^2$ gives Chebyshev: $P(\lvert X - \mu\rvert \ge k\sigma) \le \dfrac1{k^2}$
- the existence form: if $E[X] < a$, then $P(X < a) > 0$, so some outcome is below the average

## Conditions
$X$ is nonnegative. Without that, the discarded part of the expectation could be very negative and the proof fails.

## Why it works
Split the expectation at the threshold. Since $X \ge 0$, dropping the part below $a$ only lowers the average: $$E[X] \ge E\left[X\cdot\mathbf{1}_{X \ge a}\right] \ge a\cdot P(X \ge a).$$ The second step replaces $X$ by $a$ on the event $X \ge a$. Dividing by $a$ gives the inequality.

Chebyshev is a corollary: apply Markov to $Y = (X - \mu)^2$ with threshold $k^2\sigma^2$. Since $E[Y] = \sigma^2$, $P\left((X - \mu)^2 \ge k^2\sigma^2\right) \le \frac1{k^2}$, and that event is exactly $\lvert X - \mu\rvert \ge k\sigma$.

## Useful observations
- It shows that something cannot happen too often, or that a good case must exist.
- For a nonnegative integer count $X$ with $E[X] < 1$, some outcome has no bad events at all, the first-moment form of [[probabilistic-method|the probabilistic method]].
- The bound is crude, using only the mean, so it is the right tool when little is known about the distribution and the wrong one for a sharp estimate.

## Applications
Tail bounds from the mean, and existence arguments of the form "some outcome beats the average".

## Contest profile
Rare as a named result, but the reasoning that some term is at least the average appears constantly, paired with [[indicator-variables|linearity of expectation]], which computes the mean.
`,

"casework-method": String.raw`
## When to use
When one feature controls everything else: the largest element of a set, the first digit, how many times a value appears, where a special person sits, or the outcome of the first move. Probability problems use the same split, weighting each case by its probability. When the cases would be too many to list but the opposite of the condition has few, [[complementary-counting|complementary counting]] is the shorter route.

## How
1. Choose the feature to split on: the one that makes the rest of the count easy once it is fixed.
2. List the cases, and check that they do not overlap and that every object lies in one of them.
3. Count each case, usually with the multiplication principle.
4. Add the counts; for a probability, add each case's probability times the conditional probability inside it.

How many subsets of $\{1, 2, \ldots, 10\}$ have largest element twice their smallest? Split on the smallest element $m$. The largest is then $2m \le 10$, so $m \le 5$, and each of the $m - 1$ numbers strictly between is free, giving $2^{m - 1}$ subsets. The total is $1 + 2 + 4 + 8 + 16 = 31$.

## Why it works
If every object lies in exactly one case, adding the cases counts every object exactly once. Overlapping cases count shared objects twice, and missing cases leave objects out, so the cases must be disjoint and exhaustive; then $|S| = |S_1| + \cdots + |S_m|$. The split helps because fixing one feature usually makes the remaining choices independent, and independent choices multiply. The probability version is the law of total probability, the same addition with weights.

The figure shows the five cases of the example and their sizes.

## Formulas it uses
- [[permutations-combinations]]: counts each case once its feature is fixed, usually as a product of independent choices.
- [[conditional-probability]]: the law of total probability, $P(A) = P(A \mid B_1)P(B_1) + P(A \mid B_2)P(B_2) + \cdots$, casework with weights.

## Common traps
- Overlapping cases, such as "contains a $1$" and "contains a $2$", which count some objects twice.
- A forgotten case, most often an edge such as the empty set, a zero, or a tie.
- Splitting on a feature that does not simplify the rest, which multiplies the work instead of dividing it.

## Contest profile
The most common counting technique of all, usually with constructive counting inside each case; most AIME counting solutions are a few cases of products.
`,

"reflection-principle": String.raw`
## When to use
Grid paths that must stay on one side of a diagonal, vote counts in which one candidate is never behind, ticket queues in which change never runs out, and random walks that must not reach zero. The signal is a restriction on a path phrased with "never": never above, never trailing, never negative. It needs steps of one size in two directions, and a barrier that is not a line of the grid is not reflected into itself.

## How
1. Count all paths from the start to the end, ignoring the barrier.
2. Identify the bad paths: those that touch the barrier line.
3. Reflect each bad path across the barrier from its first touch onward; it becomes a path to the reflected endpoint.
4. Count the paths to the reflected endpoint, and subtract them from the total.

Paths of $3$ right and $3$ up steps that never rise above the line $y = x$: the bad paths touch $y = x + 1$, and reflecting across that line sends the endpoint $(3, 3)$ to $(2, 4)$. So there are $\binom63 - \binom62 = 20 - 15 = 5$ good paths, the Catalan number $C_3$.

## Why it works
Take a bad path and the first point where it touches the line $y = x + 1$. Reflecting every step after that point, so that right steps become up steps and up steps become right steps, produces a path from the same start to the mirror image of the endpoint. Reflecting again restores the original path. And every path to the mirrored endpoint must touch the line, because its end lies on the other side, so it has a first touch to reflect from. The reflection therefore matches the bad paths exactly with all paths to the mirrored endpoint, which a binomial coefficient counts.

The figure shows one bad path from $(0, 0)$ to $(4, 4)$ and its reflection after the first touch, which ends at $(3, 5)$.

## Formulas it uses
- [[grid-paths]]: paths with $m$ right and $n$ up steps number $\binom{m + n}{n}$, both for the total and for the reflected count.

## Common traps
- Reflecting across the wrong line: "never above $y = x$" makes the bad paths those touching $y = x + 1$, not $y = x$.
- Confusing never touching with never crossing; the two counts differ by one step of the barrier.
- Using one reflection when there are two barriers; that takes alternating reflections and inclusion-exclusion.

## Contest profile
Usually the whole solution once the path picture is drawn: the total number of paths minus the reflected count.
`,

"uniform-overcount": String.raw`
## When to use
Unordered groups from ordered lists, seatings around a round table, words with repeated letters, handshakes counted from both people's sides, necklaces: wherever the easy count lists each object several times. If some objects are built more often than others, as a double scoop is, split into cases instead.

## How
1. Count a related set of constructions that is easy to count, usually ordered.
2. Find how many constructions give one particular object, and check that this number $k$ is the same for every object.
3. Divide by $k$.
4. If some objects are built fewer times, count them separately, divide only the rest, and add them back.

Six people sit around a round table, rotations counting as the same: there are $6! = 720$ rows, and each circular seating reads as $6$ rows, one starting at each seat, so there are $\frac{720}{6} = 120$ seatings.

## Why it works
If every object is built exactly $k$ times, the constructions fall into groups of $k$, one group per object, so there are $k$ times as many constructions as objects. The division is exact only when the group sizes agree. Choosing two scoops from four flavors in order gives $16$ choices; a mixed pair is built twice but a double scoop only once, so dividing by $2$ gives the wrong $8$. Counting the $4$ doubles separately repairs it: $\frac{16 - 4}{2} + 4 = 10$.

{{figure:grid}}

When objects are built different numbers of times because they have extra symmetry, averaging over the symmetries gives the exact count, which is what Burnside's Lemma does.

## Formulas it uses
- [[permutations-combinations]]: $\binom nr = \frac{n!}{(n - r)!\,r!}$, ordered selections divided by the $r!$ orders of one group.
- [[circular-permutations]]: $(n - 1)!$ circular seatings, rows divided by the $n$ rotations.
- [[multiset-permutations]]: $\frac{n!}{n_1!\,n_2!\cdots}$, arrangements divided by the orders inside each block of identical items.

## Common traps
- Dividing when the overcount is not uniform: a double scoop, or a necklace with a repeating pattern, is built fewer times.
- Dividing by the wrong factor: a necklace that can also be flipped has $2n$ symmetries, not $n$.
- Dividing a count that missed some objects altogether; the method needs every object, each counted the same number of times.

## Contest profile
Usually one division inside a larger count, and the trap in many problems is an object with extra symmetry that is built fewer times.
`,

"odd-part-chains": String.raw`
## When to use
Whenever a condition says one number may not divide another, or forbids ratios that are powers of $2$. The same table with powers of $3$ in place of powers of $2$ handles ratios that are powers of $3$. A condition forbidding sums or differences is [[pairing-to-bound|pairing]], not chains.

## How
1. Write every number from $1$ to $n$ as $2^k m$ with $m$ odd.
2. Make a table with one row for each odd $m \le n$, listing $m, 2m, 4m, \ldots$ up to $n$; there are $\lceil n/2 \rceil$ rows.
3. Within a row each entry divides the next, so a valid set takes at most one entry from each row.
4. To reach the bound, take one entry per row with none dividing another; the largest entry of each row, the numbers above $n/2$, always works.

For $n = 10$ the rows are $1, 2, 4, 8$, then $3, 6$, then $5, 10$, then $7$, then $9$. Five rows allow at most five numbers, and $\{6, 7, 8, 9, 10\}$ has five with none dividing another.

## Why it works
Each number is $2^k m$ with $m$ odd in exactly one way, $k$ being its [[p-adic-valuation|2-adic valuation]] $v_2$, so every number lands in exactly one row. The top half reaches the bound: each odd $m \le n$ has exactly one multiple $2^k m$ in $\left(\frac n2, n\right]$, since doubling a number at most $\frac n2$ keeps it at most $n$, and no number there divides another, since its next multiple exceeds $n$.

Two numbers with the same odd part differ only in their power of $2$, so the smaller divides the larger, and a set with no element dividing another meets each row at most once. The rows are chains, and their number equals the size of the largest such set, which is the equality [[dilworths-theorem|Dilworth's Theorem]] promises; here the chains are found by hand.

The same table proves a classic result of Erdős: among any $n + 1$ numbers chosen from $\{1, 2, \ldots, 2n\}$, one divides another. There are only $n$ odd numbers up to $2n$, so two of the chosen numbers share a row, and the smaller divides the larger. The $n$ numbers from $n + 1$ to $2n$ show that $n + 1$ cannot be lowered.

## Formulas it uses
- [[pigeonhole]]: more chosen numbers than rows forces two of them into one row, which gives the upper bound and Erdős's $n + 1$ result.
- [[dilworths-theorem]]: the rows cover the numbers with as few chains as the largest set has elements, so the bound from the rows is exact; the method finds those chains by hand.

## Common traps
- Treating the top half as the only largest set: smaller entries also work when no entry divides an entry in another row, which matters when the question counts the sets.
- Assuming one entry per row is automatically valid: $3$ and $9$ lie in different rows, and $3$ divides $9$.

## Contest profile
Usually the whole argument in two halves: the rows give the upper bound, and the top half of the range shows it is reached.
`,

"backward-induction": String.raw`
## When to use
Two players take turns, there is no chance and no hidden information, every move makes progress toward the end, and the question asks who wins with best play, or how many starting positions up to $N$ are wins for the first or second player. Several piles, or a choice of which pile to play on, make it a game of Nim, which [[sprague-grundy|the Sprague–Grundy Theorem]] handles; dice or random draws make it a probability question instead.

## How
1. Fix the ending rule and label the end positions: when taking the last object wins, the empty pile is a loss for the player to move.
2. Go up in size, labeling each position winning if some move reaches a losing position and losing if every move reaches a winning one.
3. Watch for the labels to repeat, and check at least two full periods.
4. Prove the pattern: every move from a losing position reaches a winning one, and every winning position has a move to a losing one.
5. Count the positions with the label the question wants.

With moves of $1$ or $2$ coins, the losing positions are $0, 3, 6, \ldots$, the multiples of $3$, since from a multiple of $3$ every move leaves a remainder of $1$ or $2$, and from those a move returns to a multiple of $3$.

## Why it works
Every move leads to a smaller position, so by induction on size every position gets exactly one label. A player at a losing position must hand the opponent a winning position whatever they do, and a player at a winning position can always hand the opponent a losing one, so the labels describe best play. The labels of a position depend only on a fixed window of smaller labels, so they eventually repeat.

## Formulas it uses
- [[modular-basics]]: the losing positions usually form residue classes, so counting them up to $N$ is counting numbers in those classes.

## Common traps
- Mixing up the conventions: when taking the last object loses, the end labels flip and so does everything after.
- Declaring a period after too few terms.
- Counting first-player wins when the question asks for second-player wins.

## Contest profile
Mostly AMC and MATHCOUNTS: a short table of labels, its period, and a count up to a bound; the AIME has asked the same with an unusual set of moves.
`,

"coloring-arguments": String.raw`
## When to use
A region is to be tiled by dominoes, trominoes, or $1 \times k$ bars, a piece moves on a grid, or the question asks for the fewest pieces that block or touch every placement, and the answer is about whether something is possible or how small it can be.

## How
1. Choose a coloring every piece respects: a checkerboard for dominoes, $k$ diagonal stripes, colored by $(i + j) \bmod k$, for $1 \times k$ bars, or a set of marked cells.
2. Count how many cells of each color one piece covers.
3. Count the cells of each color in the region.
4. If no combination of pieces matches those counts, the tiling is impossible.
5. For a covering question, mark cells that every placement must touch; the number of marked cells is a lower bound on the pieces needed.

An $8 \times 8$ board with two opposite corners removed cannot be tiled by dominoes: every domino covers one dark and one light cell, but the removed corners share a color, leaving $30$ cells of one color and $32$ of the other.

{{figure:board}}

## Why it works
Each piece covers a fixed number of cells of each color wherever it is placed, so the totals covered by any set of pieces are fixed combinations of those numbers. A region whose color counts are not such a combination cannot be covered exactly. A coloring proves impossibility only; matching counts do not by themselves show that a tiling exists.

## Formulas it uses
- [[modular-basics]]: stripe colorings by $(i + j) \bmod k$ make every $1 \times k$ bar cover one cell of each residue.

## Common traps
- A coloring the pieces do not respect, such as a checkerboard for $1 \times 3$ bars, which cover two cells of one color and one of the other in either order.
- Concluding that a tiling exists because the counts match.
- Forgetting that a $1 \times k$ bar may lie in a row or a column; the diagonal coloring handles both.

## Contest profile
AMC tiling and covering questions, often as a lower bound from marked cells, and olympiad impossibility proofs.
`,

"pairing-to-bound": String.raw`
## When to use
The question asks for the largest subset of $\{1, 2, \ldots, n\}$, or of another set, that never contains two elements with some property: summing to a fixed total, differing by a fixed amount, one double the other, or both in a forbidden pair. Divisibility conditions, where one element must not divide another, use the chains of [[odd-part-chains|odd parts]] instead.

The same grouping bounds selections outside number sets. At most one king fits in each $2 \times 2$ block of a chessboard without two attacking each other, so no more than $16$ kings fit on an $8 \times 8$ board, and one king in the same corner of every block reaches the bound.

## How
1. Find pairs of elements that are forbidden together, such as $k$ and $21 - k$ for the sum $21$.
2. When the forbidden links form chains rather than pairs, as $1, 6, 11, \ldots$ do for the difference $5$, find how many elements of one chain can be chosen with no two linked.
3. Cover the whole set with the pairs and chains, each element exactly once.
4. Add up the allowed amounts; that is the upper bound.
5. Build a subset that takes the allowed amount from every group, which shows the bound is reached.

The largest subset of $\{1, \ldots, 20\}$ with no two elements summing to $21$: the pairs $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$ cover the set, so at most $10$ elements fit, and $\{1, \ldots, 10\}$ has $10$.

## Why it works
If the subset had more elements than the groups allow, some group would contribute more than its allowance by the [[pigeonhole|pigeonhole principle]], and for a pair that means both elements, a forbidden combination. So the allowances add up to a true upper bound. An upper bound alone does not answer a "largest" question; the explicit subset shows nothing larger is needed.

## Formulas it uses
- [[pigeonhole]]: more elements than the groups allow forces some group to give too many.

## Common traps
- Groups that miss some elements, or use an element twice.
- Allowing one element per chain when a chain of length $\ell$ with only neighbors linked allows $\lceil \ell/2 \rceil$.
- Stopping at the upper bound without exhibiting a subset that reaches it.

## Contest profile
An AMC question in its plain form, sum-free or difference-free subsets, and an AIME or olympiad step when the groups are less obvious.
`,

"subset-avoiding-relation": String.raw`
## Distinguishing clues
- The condition is about pairs of chosen elements: no two sum to a target, differ by a fixed amount, are consecutive, or divide one another.
- The question asks either for the largest such subset or for how many there are.
- Not this pattern: a condition on a single element, such as being odd, which is ordinary counting, or a condition on triples, such as no three in arithmetic progression, which is much harder and needs other ideas.

{{figure:pairs}}

## Methods and Formulas to Try
The forbidden pairs organize the set into groups; the largest subset takes the most each group allows, and a count multiplies the choices across groups or runs a recursion along a chain.

### Methods to try
- [[pairing-to-bound]]: cover the set with pairs or chains of linked elements and add up what each can contribute, then build a subset that reaches the bound.
- [[odd-part-chains]]: for divisibility, write each number as an odd number times a power of $2$; numbers with the same odd part form a chain in which any two divide one another.
- [[recursive-counting]]: to count subsets of a chain with no two neighbors, condition on whether the last element is chosen, which gives a Fibonacci recursion.

### Formulas to try
- [[pigeonhole]]: too many chosen elements force two into one group.
- [[non-adjacent-selection]]: $\binom{n - k + 1}{k}$ subsets of size $k$ of $\{1, \ldots, n\}$ with no two consecutive.
- [[dilworths-theorem]]: the fewest chains covering a partial order equals the largest set with no two comparable, so a chain cover and a set of the same size with no two comparable prove each other optimal.

## Common traps
- Giving an upper bound without a subset that reaches it.
- Treating a chain as a pair and allowing one element where several fit.
- Forgetting the empty set when counting subsets.

## Contest profile
AMC problems ask for the largest sum-free or difference-free subset; AIME and olympiad versions count such subsets or disguise the forbidden relation.
`,

"monovariant": String.raw`
## When to use
A process of moves and a question about whether it must end, how long it can last, or what its final state looks like: numbers on a board replaced again and again, out-of-order neighbors swapped, chips passed between piles. The same move proves existence: to show that people can be split into two groups with some local property, start anywhere and keep fixing a person who violates it; a monovariant shows the fixing ends, and the end is the split that was wanted. Whether a state can be reached at all is a different question, answered with an [[invariants-coloring|invariant]].

## How
1. Write down exactly what one move does.
2. Look for a quantity every move changes in the same direction: a sum, a sum of squares, the number of out-of-order pairs, or a count of "bad" pairs.
3. Check that the change is strict and that the quantity takes only finitely many values, for example a nonnegative integer.
4. Conclude that the process stops, after at most as many moves as the quantity's starting value allows.
5. For existence, read off the property from the stopping point: no improving move is left.

Sorting $n$ items by swapping adjacent pairs that are out of order ends after at most $\binom{n}{2}$ swaps: each swap lowers the number of out-of-order pairs by exactly $1$, and that number starts at most $\binom{n}{2}$.

## Why it works
A nonnegative integer cannot decrease forever, and a quantity with finitely many possible values cannot increase forever, so only finitely many moves are possible. When the process stops, by definition no move applies, which is exactly the property an existence proof needs.

## Formulas it uses
No particular formula is needed; the argument rests on the fact that a strictly decreasing sequence of nonnegative integers is finite.

## Common traps
- A quantity that decreases but can take infinitely many values, such as one halving forever, which proves nothing about stopping.
- A move that leaves the quantity unchanged in some case; the change must be strict for every move.
- Concluding which final state is reached; a monovariant proves that the process ends, and an invariant usually pins down where.

## Contest profile
An olympiad combinatorics staple for termination and existence proofs, and on the AIME the idea behind questions asking for the largest possible number of moves.
`,

"tree-basics": String.raw`
## Key forms
- a tree on $n$ vertices has $n - 1$ edges
- any two of connected, acyclic, and $n - 1$ edges imply the third
- any two vertices of a tree are joined by exactly one path
- a tree with $n \ge 2$ vertices has at least two leaves
- adding any edge to a tree creates exactly one cycle, and removing any edge disconnects it
- a forest, a graph with no cycles, on $n$ vertices with $c$ components has $n - c$ edges

## Conditions
Finite simple graphs. A tree with one vertex has no edges and no leaves.

## Why it works
The two ends of a longest path in a tree are leaves: any other neighbor of an end would either extend the path or close a cycle. So a tree with at least two vertices has at least two leaves.

Removing a leaf and its edge leaves a smaller tree, still connected and still without cycles, with one vertex and one edge fewer. Repeating down to a single vertex with no edges shows that the number of edges is always one less than the number of vertices. Two different paths between the same two vertices would together contain a cycle, so the path is unique.

{{figure:leaves}}

## Useful observations
- The degrees of a tree add up to $2(n - 1)$, by the [[handshake-lemma|Handshake Lemma]], so the average degree is just under $2$.
- A tree has at least as many leaves as its largest degree.
- Every connected graph contains a spanning tree, so a connected graph on $n$ vertices has at least $n - 1$ edges.
- The labeled trees on $n$ vertices number $n^{n-2}$, which is [[cayleys-formula|Cayley's Formula]].

## Applications
Networks with no redundant links, counting edges and leaves from degree information, and spanning trees of graphs.

## Contest profile
Olympiad graph theory and occasional AIME problems that count leaves or edges from degrees, or prove that some structure is a tree.
`,

"restricted-sequences": String.raw`
## Distinguishing clues
- The objects are strings or rows of length $n$, built left to right, and the rule is about neighbors or runs: no two $1$s adjacent, no three equal letters in a row, no forbidden word of length two or three.
- Because only the last few symbols matter, the count can be organized by what the string ends with.
- Not this pattern: a rule about the whole string, such as a fixed total number of $1$s with no restriction on position, which calls for ordinary combinations, or a selection of $k$ positions with none adjacent, the closed-form case, [[non-adjacent-selection|Non-Adjacent Selection]].

## Methods and Formulas to Try
The choice among the methods depends on what is asked: one length, a general formula, or a circular arrangement.

### Methods to try
- [[recursive-counting]]: classify the valid strings of length $n$ by how they end, and write the count in terms of shorter strings; for one specific length a short table is enough.
- [[transfer-matrix-method]]: when the states are many, or $n$ is large, or the arrangement is circular, put the allowed moves between states in a matrix and take its power.
- [[counting-blocks]]: when the rule is that certain symbols must stay together, glue them into one block first and count the arrangements of blocks.
- [[complementary-counting]]: when the rule is that a bad pattern is absent, and the bad cases are easier to count, subtract them from all $2^n$ strings.

### Formulas to try
- [[linear-recurrence]]: the counts by length satisfy a linear recurrence, solved in closed form from its characteristic polynomial.
- [[non-adjacent-selection]]: $\binom{n - k + 1}{k}$ strings with $k$ ones and no two adjacent.
- [[cayley-hamilton]]: shows the counts from a transfer matrix satisfy the recurrence of its characteristic polynomial.

## Common traps
- States that forget something the rule depends on, such as the length of the current run.
- Counting strings of length $n$ from a table for length $n - 1$ without checking the starting cases.
- Using a circular count with a linear recursion, where the two ends also have to match.

## Contest profile
An AIME counting pattern about binary or ternary strings with a forbidden pattern, usually solved by a small table of counts by ending, and occasionally by a transfer matrix.
`,

"organized-listing": String.raw`
## When to use
Use it when the objects are few, perhaps up to a few dozen, and a formula would need several cases of its own or does not exist: integer triangles with a given perimeter, ways to make a sum with restricted parts, paths on a small irregular board. It is also the check on a formula's answer for a small case. When the count is large and the objects have a product structure, [[constructive-counting|Constructive Counting]] is the right tool, and when the cases differ in kind rather than in one ordered quantity, [[casework-method|Casework]] is.

## How
1. Choose the quantity to order by, usually the largest or the smallest part, or the first position.
2. Write its possible values from smallest to largest.
3. For each value, list the objects with that value in order of a second quantity.
4. Use the problem's conditions to stop each row early instead of testing every candidate.
5. Count each row, then add the rows.

For three positive parts adding to $9$, ordered so that $a \le b \le c$ and grouped by the largest part $c$: $c = 3$ gives $(3, 3, 3)$; $c = 4$ gives $(1, 4, 4)$ and $(2, 3, 4)$; $c = 5$ gives $(1, 3, 5)$ and $(2, 2, 5)$; $c = 6$ gives $(1, 2, 6)$; $c = 7$ gives $(1, 1, 7)$. That makes $7$.

## Why it works
Putting the parts of each object in a fixed order, such as $a \le b \le c$, chooses one representative for each object, so no object is listed twice under different orders. Fixing the first quantity and then the second sorts the representatives the way a dictionary sorts words, and in that order every object has exactly one place. A list written in it can be checked row by row, and a missing or repeated object shows up as a gap or a repeat in a row. The method stops being practical when the rows grow long, which is the signal to look for a formula for one row.

## Formulas it uses
- [[triangle-inequality]]: in lists of triangles it bounds the largest side, which decides where each row starts and stops.
- [[partitions]]: an organized list of the parts of a number is a list of its partitions, and the card's formulas count the same objects for checking.

## Common traps
- Listing objects that differ only in order as different, when the problem counts them as one.
- Changing the ordering rule part-way through the list.
- Stopping a row at the wrong value because a condition such as the triangle inequality was checked loosely.
- Forgetting the extreme cases at either end of the list, such as the equal parts.

## Contest profile
A MATHCOUNTS and AMC 8 and 10 staple, and a habit that appears in harder problems as the check on a small case before a general count. It pairs with Casework and with the triangle inequality.
`,

"simulate-the-process": String.raw`
## When to use
Use it when the problem describes a rule applied step by step, such as players removed from a circle, a token moving on a board, or a number transformed again and again, and asks for the state after some number of steps. It is the right first move when the steps are few or the states are few, because then the process either ends quickly or repeats. When the process runs long and is defined by a formula, such as a remainder of a power, Finding the Period is the tool; when a probability is asked rather than a final state, [[states-recursion-prob|First-Step Analysis]] is.

## How
1. Write down the starting state completely: positions, values, and whose turn it is.
2. Apply the rule once and write the new state on the next line of a table.
3. Repeat, checking each new state against the earlier ones.
4. Stop when the process ends, or when a state repeats.
5. If a state repeats, the steps from its first appearance form a cycle; use the cycle length to jump to the step asked for.

Starting from $7$ and replacing a number by the sum of the squares of its digits gives $7, 49, 97, 130, 10, 1, 1, \dots$, which ends at $1$ after five steps.

## Why it works
The table is the process itself, so every recorded state is correct as long as the rule is applied correctly, and no theory is needed. A process with finitely many possible states cannot run forever without revisiting one, by the [[pigeonhole|pigeonhole principle]], and once a state repeats, the rule produces the same states after it as the first time, so the process is periodic from there on. Simulation stops being practical when the cycle is very long or the state is large, which is the point at which a formula for the state is needed instead.

## Formulas it uses
- [[pigeonhole]]: guarantees that a process with finitely many states eventually repeats one, which bounds how long the simulation can take.

## Common traps
- Recording only part of the state, such as the value without whose turn it is, so that a false repeat appears.
- Starting the count of steps at the wrong place, off by one at the end.
- Assuming the cycle starts at the first state, when it may start later.
- Applying the rule to a stale state after a removal or a move changed the order.

## Contest profile
An AMC 8 and 10 tool for games, eliminations, and repeated operations, and the first step in harder problems where the simulation reveals the pattern that a proof then confirms. It pairs with Finding the Period.
`,

"truth-tellers-logic": String.raw`
## Distinguishing clues
- People who always tell the truth or always lie, each making a statement about the others or about how many are lying.
- Clues about an arrangement, such as who finished where or who owns what, some of which may be false.
- Statements that mention each other, so their truth values depend on one another.
- Not this pattern: a probability question about random liars, where each statement is true with some probability, which is a conditional-probability problem.

## Methods and Formulas to Try
The data are truth values, so the unknown is a choice of who is truthful, and the statements check each choice.

### Methods to try
- [[casework-method]]: split on the one statement or person that decides the most, often the number of liars, and check each case against every statement.
- [[proof-by-cases]]: the cases must cover every possibility, so that the surviving one is forced and not merely possible.
- [[proof-by-contradiction]]: assume a person is truthful, follow what that forces, and reject the assumption when two forced facts disagree.

### Formulas to try
No formula is needed: the statements themselves are the data, and the work is the case check.

## Common traps
- Treating a liar's statement as giving no information, when its negation is a fact.
- Missing that statements like "exactly one of us is lying" are mutually exclusive, so at most one of them is true.
- Stopping at the first consistent assignment without checking that it is the only one.
- Forgetting the case in which everyone lies, or everyone tells the truth.

## Contest profile
An AMC 8 and 10 puzzle type, from knights and knaves to finishing orders, solved by a short, complete set of cases. It pairs with Casework.
`,

"drawing-without-replacement": String.raw`
## Distinguishing clues
- Objects drawn from a bag, deck, or drawer one at a time and not put back.
- A question about a particular draw, such as the color of the third ball, or about when the first object of a kind appears.
- A fixed number drawn together, with the count of each kind asked for, the [[hypergeometric|hypergeometric]] setting.
- Not this pattern: draws with replacement, where each draw is independent and the fractions do not change.

## Methods and Formulas to Try
Each draw changes what is left, and two facts tame that: products of shrinking fractions for sequences, and symmetry for positions.

### Methods to try
- [[symmetry-probability]]: every position in the drawing order is equally likely to hold any given object, so the $k$th draw behaves like the first.
- [[complementary-counting]]: "at least one red" is one minus the probability of drawing no red at all.
- [[states-recursion-prob]]: when the drawing stops on a condition, the state is what is left in the bag, and the probability satisfies a recursion in it.

### Formulas to try
- [[hypergeometric]]: the probability of exactly $k$ of a kind among $m$ drawn together.
- [[conditional-probability]]: the probability of a sequence of draws is the product of the conditional probabilities, each computed from what is left.

## Common traps
- Using the original fractions for later draws, as if each ball were put back.
- Multiplying by an extra factor for order when the draws are counted as a set.
- Forgetting that "the third draw is the first red" needs the first two to be blue.
- Adding the probabilities of overlapping events, such as "the first is red" and "the second is red".

## Contest profile
An AMC 10 and 12 probability setup, from a single product of fractions to symmetry arguments about the order of draws. It pairs with the hypergeometric distribution and with Symmetry Arguments.
`
});
