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
## Why it works
An ordered selection is built slot by slot, and each unordered selection corresponds to exactly $k!$ ordered ones.

To choose $k$ objects in order from $n$, fill the first slot in $n$ ways, the second in $n - 1$ ways, since one object is used up, and so on down to the $k$th slot, which has $n - k + 1$ options. By the multiplication principle, and multiplying top and bottom by $(n - k)!$, $$P(n, k) = n(n - 1)\cdots(n - k + 1) = \frac{n!}{(n - k)!}.$$

Now group the ordered selections by which set of objects they use. Each set of $k$ objects can be put in order in $k!$ ways, so every set appears exactly $k!$ times among the ordered selections, and dividing out that overcount leaves $$\binom nk = \frac{P(n, k)}{k!} = \frac{n!}{k!(n-k)!}.$$ From $10$ people, the $P(10, 3) = 10 \cdot 9 \cdot 8 = 720$ ranked top-three lists collapse to $\frac{720}{6} = 120$ committees.

The symmetry $\binom nk = \binom n{n-k}$ has a one-line reason: choosing which $k$ objects to take is the same as choosing which $n - k$ to leave behind.

## How to use it
The decision is always "does order matter?", and when in doubt count the ordered version and divide by the overcount. That is safer than guessing, because the overcount is usually easy to name.

Three habits cover most problems. Read $P(n,k)$ as filling slots one at a time with a shrinking menu, which is how "chains of choices" problems appear in disguise. Use the [[complementary-counting|complementary framing]] $$\binom nk = \binom n{n-k}$$ whenever the smaller side is easier to count. And when the objects are not all distinct, switch to the multiset formula rather than trying to patch $\binom nk$.

The common error is mixing the two within one problem: counting an ordered stage and an unordered stage and then multiplying without checking that the second count does not depend on the first.

## On contests
The atoms of all counting, which is why they are rarely the whole answer: 2 of the 24 problems tagged here use them alone, and [[casework-method|casework]] joins them in 4. The recurring shapes layer the two kinds of selection: committees with restrictions, words formed from letters, and hybrid counts where one stage is ordered, like officers, and another is not, like ordinary members.
`,

"multiset-permutations": String.raw`
## Why it works
Label the identical objects to make them distinct, count those arrangements, then divide out the labels, since they do not change what you see.

With every object distinct there are $n!$ arrangements. Now erase the labels. Each visible arrangement came from $n_1!$ labeled ones that differ only in the order of the first group's labels, times $n_2!$ for the second group, and so on, because each group's labels can be shuffled among that group's positions independently. So each visible arrangement was counted $n_1!\,n_2! \cdots n_k!$ times, and dividing gives the formula.

{{figure:labels}}

With two groups of sizes $k$ and $n - k$ the formula is $\frac{n!}{k!\,(n - k)!} = \binom nk$: arranging $k$ identical A's and $n - k$ identical B's is the same as choosing which $k$ positions get the A's.

## How to use it
Any arrangement of objects that are not all distinct is this formula: list the multiset, take $n!$, and divide by a factorial for each repeated type. Grid paths are the most common disguise, since a path across a $5 \times 3$ grid is a word of five R's and three U's, and there are $\frac{8!}{5!\,3!} = 56$ of them.

With a restriction, do not patch the formula. Arrange the unrestricted objects first, then place the repeated ones into the gaps between them. For "no two I's adjacent" in MISSISSIPPI, arrange the other seven letters, then choose $4$ of the $8$ gaps for the I's: $$\frac{7!}{4!\,2!} \cdot \binom84 = 105 \cdot 70 = 7350.$$ When several types are restricted at once, handle the most constrained first, or switch to inclusion-exclusion on the adjacency conditions.

## On contests
Eight problems here, seven of them AIME, and none by it alone: it counts the pieces of a [[casework-method|casework]] split or the outcomes of a [[basic-probability|probability]], and twice it counts the words a [[bijection-method|bijection]] produces. The useful habit is to see identical-looking steps or objects as the letters of a word, which turns many problems into this one formula.
`,

"circular-permutations": String.raw`
## Why it works
Every circular arrangement corresponds to exactly $n$ rows, one for each seat you could start reading from, so dividing the $n!$ rows by $n$ counts the circles: $(n - 1)!$.

{{figure:rotations}}

Equivalently, seat one person anywhere; since rotations do not matter, that seat is as good as any other. The remaining $n - 1$ people then fill the remaining seats in order, in $(n - 1)!$ ways. When flips count as the same, each circle and its mirror image are one object, so divide by $2$ again, as long as $n \ge 3$ so that a circle differs from its mirror image.

## How to use it
Fixing one person is the habit worth building, because it also handles constraints. For "$A$ sits directly opposite $B$" at a table of $8$, fix $A$; then $B$'s seat is forced, and the other $6$ people fill the remaining seats in $6!$ ways.

Decide from the physical situation whether flips count: a bracelet or a key ring can be turned over, so divide by $2$, but people at a table cannot. For people who must sit together, glue them into a block first. A block of $k$ among $n$ people leaves $n - k + 1$ units around the circle, so the count is $$(n - k)! \cdot k!.$$ In general this division is the [[uniform-overcount|uniform overcount]] idea.

## On contests
Four problems here, all AIME, none by it alone; two use [[complementary-counting|complementary counting]] for "no two of these sit together" conditions. Round tables with adjacency conditions are an AMC fixture as well, and bead necklaces bring in the extra division by $2$.
`,

"complementary-counting": String.raw`
## When to use
Whenever the opposite of the condition is an "and". If the condition is already an "and", such as "every digit is odd", count it directly; its opposite would be the messy side.

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
## Why it works
A path is determined by its sequence of steps, and the sequence is any arrangement of $m$ R's and $n$ U's, so the paths match the ways to choose which $m$ of the $m + n$ positions hold an R. That is $\binom{m + n}{m}$, an instance of [[multiset-permutations|arrangements with repeated letters]].

The same count also builds up point by point. The last step into any point comes either from the left or from below, so the number of paths to a point is the sum of the numbers at those two neighbors. Filling in the grid from the corner reproduces Pascal's triangle, tilted.

{{figure:counts}}

## How to use it
From $(0, 0)$ to $(4, 3)$ there are $\binom73 = 35$ paths. A required waypoint $P$ multiplies: $$\#(\text{paths through } P) = \#(\text{paths to } P) \times \#(\text{paths from } P).$$ A forbidden point subtracts the paths through it, with [[pie|inclusion-exclusion]] when there are several, and a diagonal barrier is the [[reflection-principle|reflection principle]], which is where the Catalan numbers come from.

When the formulas start tangling, with several forbidden points or an awkward region, write the count at each point as the sum of the counts to its left and below. It is slower, but it is never wrong, and on a small grid it is often faster than getting inclusion-exclusion right.

## On contests
Four problems here, all AIME, one solved by it alone; the others pair it with a [[bijection-method|bijection]], a [[recursive-counting|recursion]] or [[stars-and-bars|stars, and bars]]. AMC uses the plain count, and AIME adds barriers, diagonal steps, or a third dimension. Most errors are miscounted steps, so write the two totals $m$ and $n$ down explicitly.
`,

"rectangles-in-grid": String.raw`## Why it works
A rectangle is determined by choosing 2 of the $m+1$ vertical grid lines and 2 of the $n+1$ horizontal ones — the choices are independent. Squares are the constrained version, since the two spans must be equal: summing over the side length $k$ gives $\sum_k (m+1-k)(n+1-k)$, which collapses to $\sum_{k=1}^{n} k^2$ on a square grid.

## How to use it
The key move is to stop counting rectangles and start counting the lines that bound them: any two of the $m+1$ vertical lines and any two of the $n+1$ horizontal lines determine exactly one rectangle, so the count is a product of two binomial coefficients.

Squares are the harder cousin, because the two spans must be equal — sum over the side length instead, which is why an $n\times n$ grid gives a sum of squares rather than a closed product.

For sub-rectangles containing a marked cell, count the line choices on each side of it separately and multiply. Tilted rectangles on lattice points are a genuinely different count, parametrised by the vector $(a,b)$ along one side, and are not covered by this formula.

## On contests
"How many rectangles/squares in this grid" appears verbatim on MATHCOUNTS/AMC 10; chessboard variants (counting those containing a given square) are the common twist.`,

"handshakes-diagonals": String.raw`
## Why it works
Each count chooses a few objects from $n$ without regard to order, which is what $\binom nk$ counts.

A handshake is an unordered pair of people, and so is a game in a round robin, so both number $\binom n2$. A diagonal is a pair of vertices that are not neighbors: of the $\binom n2$ pairs, $n$ are sides, which leaves $$\binom n2 - n = \frac{n(n - 1)}{2} - n = \frac{n(n - 3)}{2}.$$

Equivalently, each vertex has $n - 3$ diagonals, to every vertex except itself and its two neighbors, and each diagonal is counted from both ends. A triangle is a set of three points, and with no three on a line every such set gives a real triangle.

The crossing count is a pairing. Any four vertices of a convex polygon form a quadrilateral whose two diagonals cross exactly once, and every crossing of two diagonals comes from the four endpoints of those diagonals, so crossings and sets of four vertices match one-to-one.

{{figure:crossings}}

## How to use it
Counts often run backwards: $45$ handshakes means $\binom n2 = 45$, so $n = 10$. When some of the points are collinear, subtract the triples that do not make triangles, $\binom k3$ for each line through $k$ of the points. When three diagonals of a polygon do meet at one point, as the three long diagonals of a regular hexagon meet at its center, $\binom n4$ overcounts, and the coinciding crossings must be corrected by hand.

## On contests
Six problems here, spread across AMC 10, AMC 12, and AIME, three solved by it alone; two others use it as the total in [[complementary-counting|complementary counting]], such as counting all triples of points and removing the collinear ones. The $\binom n4$ crossing count and the collinearity corrections are the AIME-level versions.
`,

"counting-functions": String.raw`## Why it works
Each of the $n$ inputs independently selects an output: $k$ options each, multiplied. Injections consume options: $k(k-1)\cdots(k-n+1)$. Subsets are functions to $\{$in, out$\}$: $2^n$.

## How to use it
Model "assign each object a label" as a function and multiply the per-object choices. The direction matters and is the usual slip: $n$ objects each choosing among $k$ labels gives $k^n$, not $n^k$, so name which set is the domain before writing anything.

Injections are the same count with a shrinking menu, which is how they appear in disguise — a sequence of choices where nothing may repeat is an injection whether or not the word is used.

Surjections are the exception: requiring every label to be used breaks the independence, so the count needs inclusion-exclusion over which labels go unused, giving $\sum_j(-1)^j\binom kj(k-j)^n$.

## On contests
$2^n$ subset counts and $k^n$ assignment counts anchor countless problems; recognizing "this is just counting functions" strips away story-problem camouflage.`,

"pascals-identity": String.raw`## Why it works
Condition on one distinguished element: subsets of size $k$ either contain it ($\binom{n-1}{k-1}$ ways to finish) or not ($\binom{n-1}{k}$). Symmetry: choosing what's in = choosing what's out.

## How to use it
The identity is a case split: fix one element of the $n$, and every $k$-subset either contains it (leaving $\binom{n-1}{k-1}$ ways) or does not (leaving $\binom{n-1}{k}$). That story-proof reading is what lets you invent the right split in an unfamiliar problem.

Computationally the recursion builds Pascal's triangle row by row, which is the fastest way to get a whole row by hand and the standard engine for induction proofs about binomial coefficients.

Moving along a row is a different relation and often the more useful one: dividing the factorials leaves $\frac{\binom n{k+1}}{\binom nk} = \frac{n-k}{k+1}$, so a stated ratio between adjacent entries becomes a linear equation in $n$ and $k$, and two such conditions pin both. Combinatorially, a $(k+1)$-subset is built by adding one of the $n-k$ absent elements and arises from $k+1$ different $k$-subsets, which is the same fraction. It is also the ratio [[largest-term-ratio|the largest-term method]] asks for, crossing $1$ at $k = \frac{n-1}2$ and so putting the row's peak at $k = \lfloor n/2 \rfloor$.

The other use is absorption: applying the rule repeatedly collapses a sum of consecutive entries into a single coefficient, which is precisely how the [[hockey-stick|hockey stick identity]] telescopes. Symmetry halves your work and explains why every row reads the same forwards and backwards.

## On contests
Identity manipulation on AMC 12/AIME: recognize when an awkward sum is one Pascal application away from collapsing. Conditioning-on-an-element is also a general proof technique worth extracting.`,

"binomial-row-sums": String.raw`
## Why it works
Both identities count subsets: the row sum counts all of them, and the alternating sum compares the even-sized ones with the odd-sized ones.

Each of the $n$ elements is either in a subset or not, so there are $2^n$ subsets, and grouping them by size gives $$\binom n0 + \binom n1 + \cdots + \binom nn = 2^n.$$ Algebraically this is $(1 + 1)^n$ expanded by the Binomial Theorem.

For the alternating sum, pair each subset with the one obtained by toggling element $1$: add it if it is absent, remove it if it is present. Toggling twice gets back the original, so this splits all the subsets into pairs, and each pair has one even-sized and one odd-sized member. So there are equally many of each, $2^{n-1}$, and $\sum (-1)^k\binom nk = 0$. Algebraically it is $(1 - 1)^n = 0$, which needs $n \ge 1$.

{{figure:toggle}}

## How to use it
Substituting into $(x + y)^n$ is a general machine for coefficient sums, not just two facts. Put $x = y = 1$ for the total, $x = 1$ and $y = -1$ for the alternating version, and other values when the sum carries weights: $\sum_k \binom nk 2^k = (1 + 2)^n = 3^n$.

The even/odd split settles parity-constrained subset counts at once: exactly $2^{n-1}$ subsets of an $n$-element set have even size, for any $n \ge 1$. Adding the two identities also gives the sum of every other entry in a row, $\binom n0 + \binom n2 + \binom n4 + \cdots = 2^{n-1}$.

When the sum has a factor of $k$ in it, substitution alone will not reach it: use $k\binom nk = n\binom{n-1}{k-1}$, which is [[committee-chair|the committee-chair identity]], or differentiate $(1 + x)^n$ first.

## On contests
Eight problems here, seven of them AIME, and none by it alone. Four pair it with a [[bijection-method|bijection]] that turns the problem into a count of subsets, and others use $2^n$ as the total in [[complementary-counting|complementary counting]]. Weighted sums by clever substitution, and the base case of the roots-of-unity filter, are the other regular appearances.
`,

"nested-subset-pairs": String.raw`## Key forms
- $\#\{(A,B):A\subseteq B\subseteq S\}=3^n$ — three destinations per element
- $\alt{\sum_{k=0}^{n}\binom nk 2^k}{\binom n0 2^0+\binom n1 2^1+\cdots+\binom nn 2^n}=3^n$ — the same count organized by $|B|$
- chains $A_1\subseteq\cdots\subseteq A_m\subseteq S$ give $(m+1)^n$

## Why it works
Build the pair element by element rather than set by set. For each element of $S$ there are exactly three consistent possibilities: it belongs to $A$, in which case it belongs to $B$ as well; it belongs to $B$ only; or it belongs to neither. The fourth combination, in $A$ but not $B$, is precisely what $A\subseteq B$ forbids. The elements are independent, so the count is $3^n$.

Organizing the same count by the size of $B$ gives the identity. There are $\binom nk$ sets $B$ of size $k$, and once $B$ is fixed any of its $2^k$ subsets serves as $A$, so the total is $\sum_k\binom nk 2^k$. That is $(1+2)^n$ by the Binomial Theorem, so both routes give $3^n$ and each proves the other.

## How to use it
Recognize the shape: two sets with one required to sit inside the other, and a question asking how many such pairs exist. Counting by element is immediate, while counting by size leads to a binomial sum you then have to evaluate — so use the element argument to get the answer and the sum only if the problem asks for that form.

The extension is worth remembering because it is free. A chain of $m$ nested sets inside $S$ gives each element $m+1$ choices: the first set in the chain it enters, or none at all. Two nested sets is the $m=2$ case, $3^n$.

## On contests
The AMC and AIME phrasings hide it well — ordered pairs of subsets with a containment condition, or a question about $A\cap B=A$, which is the same statement. Anything of the form "count something for each element independently" beats summing [[binomial-row-sums|binomial row sums]] by hand; if you find yourself evaluating $\sum\binom nk 2^k$, the element argument was available.`,

"hockey-stick": String.raw`## Why it works
Telescoping Pascal: $\binom{n+1}{r+1} = \binom{n}{r} + \binom{n}{r+1}$, expand the last term repeatedly. Combinatorially: to choose $r+1$ from $\{1..n+1\}$, condition on the largest element chosen — the cases are the diagonal terms.

## How to use it
Any sum of binomial coefficients with a fixed lower index collapses in one step, so recognizing the diagonal is all that is required.

Its real reach is polynomial sums. Express $k$, $k^2$, $k^3$ in the binomial basis — $k=\binom k1$, $k^2=2\binom k2+\binom k1$, and so on — then hockey-stick each piece separately. That is the systematic route to the power-sum formulas, and unlike memorizing them it extends to any degree.

The same rewriting handles products: $k(k+1)=2\binom{k+1}{2}$ and $k(k+1)(k+2)=6\binom{k+2}{3}$, so sums of consecutive-integer products telescope immediately.

## On contests
AIME sum evaluations and stars-and-bars cumulative counts ("solutions with $x_1 + \cdots \le n$" = hockey stick over exact sums). The largest-element conditioning is reusable everywhere.`,

"vandermonde": String.raw`
## Key forms
- $\alt{\sum_{k}\binom{n}{k}^2}{\binom n0^2+\binom n1^2+\cdots+\binom nn^2} = \binom{2n}{n}$ — the $m = n = r$ case, by far the one that appears; choosing $k$ from the first $n$ and $n-k$ from the second is choosing $n$ from all $2n$
- $\binom{n}{k} = \binom{n}{n-k}$ — the symmetry the squared form leans on, since it turns $\binom{n}{k}\binom{n}{n-k}$ into $\binom{n}{k}^2$

## Why it works
Both sides count the committees of $r$ chosen from $m$ men and $n$ women.

The right side counts them directly. The left side sorts them by the number $k$ of men, who can be chosen in $\binom mk$ ways, with the other $r - k$ chosen from the women in $\binom n{r-k}$ ways; every committee has exactly one value of $k$, so the sorted counts add to the total.

Generating functions say the same thing. The coefficient of $x^r$ in $$(1 + x)^m(1 + x)^n = (1 + x)^{m+n}$$ is the sum on the left, from multiplying out the two factors, and $\binom{m+n}{r}$ on the right.

## How to use it
Recognizing the shape is the whole skill: two binomial coefficients multiplied, bottom indices adding to a constant, summed over the split. It collapses to a single coefficient.

It also runs in reverse: when a count naturally splits a group in two, expanding $\binom{m+n}{r}$ into the sum can be what makes the argument work. In probability it is why the hypergeometric probabilities add up to $1$: $$\sum_k \frac{\binom mk\binom n{r-k}}{\binom{m+n}{r}} = 1.$$

## On contests
Two problems here, both AIME, neither solved by it alone. Typical uses count how often each element appears across pairs of subsets, which produces a sum of squared binomial coefficients, or read a double sum as a single committee count.`,

"committee-chair": String.raw`## Why it works
Count (committee, chair) pairs twice: pick the $k$-committee then its chair ($k\binom{n}{k}$), or pick the chair first then the rest ($n\binom{n-1}{k-1}$). Summing over $k$: chair first ($n$ ways), each remaining person in or out ($2^{n-1}$).

## How to use it
The identity is a double count: choosing a committee of $k$ and then its chair gives $k\binom nk$, while choosing the chair first and then the rest of the committee gives $n\binom{n-1}{k-1}$. Both count the same pairs, so they are equal — and that story-proof pattern generalises far beyond this one identity.

Operationally it is an absorption rule: it removes a factor of $k$ from a weighted binomial sum, converting $\sum k\binom nk$ into $n\sum\binom{n-1}{k-1}=n\cdot2^{n-1}$.

For a factor of $k^2$, do not apply it twice directly. Write $k^2=k(k-1)+k$, absorb each piece separately, and the sum becomes $n(n-1)2^{n-2}+n2^{n-1}$. The same trick handles any polynomial weight by expressing it in falling factorials first.

## On contests
[[weighted-binomial-sums|Weighted binomial sums]] on AMC 12/AIME ($\sum k\binom{n}{k}$, $\sum k^2\binom{n}{k} = n(n+1)2^{n-2}$), and expected-size-of-random-subset arguments ($= \frac{n}{2}$, this identity divided by $2^n$).`,

"multinomial-theorem": String.raw`
## Why it works
Expanding $(x_1 + \cdots + x_m)^n$ means picking one term from each of the $n$ brackets and multiplying, so each product corresponds to a word of length $n$ recording the picks.

A word with $k_1$ copies of $x_1$, $k_2$ of $x_2$, and so on produces the monomial $x_1^{k_1}\cdots x_m^{k_m}$, and the number of such words is the number of arrangements of that multiset, $\frac{n!}{k_1!\cdots k_m!}$. Collecting like terms gives that coefficient. With two terms it is the Binomial Theorem, and the count is the one on [[multiset-permutations|arrangements with repeated objects]].

## How to use it
To extract a coefficient, find the exponent pattern that produces the wanted monomial, then take the multinomial coefficient and multiply by each term's own coefficient raised to its power. For $x^3y^2z^2$ in $(x + 2y - z)^7$: $$\frac{7!}{3!\,2!\,2!} \cdot 2^2 \cdot (-1)^2 = 210 \cdot 4 = 840.$$ Forgetting the coefficients of the terms is the usual error.

If several exponent patterns give the same monomial, as when some terms are powers of the same variable, add their contributions. Setting every $x_i = 1$ gives $m^n$, a check that the coefficients of a full expansion must pass.

## On contests
Four problems here, mostly AMC, none by it alone, and each with a different partner. Coefficient extraction in a trinomial is the standard form, and the same coefficient counts ordered splits of a set into groups of prescribed sizes.
`,

"pascal-parity": String.raw`## Why it works
Lucas' Theorem mod 2: $\binom{m}{n}$ is odd iff every binary digit of $n$ fits under $m$'s. The number of valid $n$ is $2^{(\text{number of 1-bits of } m)}$ — each 1-bit offers a free binary choice.

## How to use it
The parity of $\binom nk$ depends only on the binary digits: it is odd exactly when every $1$-bit of $k$ is also a $1$-bit of $n$. Counting the submasks of $n$ gives $2^{s_2(n)}$ odd entries in row $n$.

That single rule answers the standard questions immediately. Rows that are entirely odd are $n=2^m-1$, where every bit is set; rows with exactly two odd entries are $n=2^m$, where only the leading bit is.

Drawing Pascal's triangle mod $2$ produces the Sierpinski triangle, and the picture is worth keeping in mind — the self-similar structure is exactly the binary submask condition, and it makes questions about blocks of even entries easy to see. For odd primes, the same reasoning is Lucas' Theorem in base $p$.

## On contests
"How many entries of row 100 are odd" ($100 = 1100100_2$, so $2^3 = 8$) and divisibility-pattern problems. Mod 4 or higher powers needs more than Lucas — don't overextend the tool.`,

"stars-and-bars": String.raw`
## Why it works
Line up the $n$ objects as stars and drop $k - 1$ bars among them; the bars cut the row into $k$ groups, and the sizes of the groups are the $x_i$.

For $x_1 + x_2 + x_3 = 7$, the row $\star\star \mid \star\star\star \mid \star\star$ stands for $2 + 3 + 2$, as in the figure, and the row $\mid \star\star\star\star\star\star\star \mid$ stands for $0 + 7 + 0$: a bar at either end, or two bars side by side, simply makes an empty group. Every solution gives exactly one such row and every row gives exactly one solution, so counting solutions is the same as counting rows.

A row has $n + k - 1$ symbols, and it is decided completely by which $k - 1$ of those positions hold bars. So there are $$\binom{n+k-1}{k-1}$$ rows, and that many solutions.

When every $x_i$ must be at least $1$, no group may be empty, so no two bars may touch and none may sit at an end. The bars then go into the $n - 1$ gaps between neighboring stars, at most one per gap, which gives $\binom{n-1}{k-1}$. The same answer comes from the first formula by handing each variable its required $1$ in advance and distributing the remaining $n - k$ freely: $$\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}.$$

## How to use it
Identify which of the two forms applies by checking whether empty boxes are allowed, since that is the only difference between them. If the lower bounds are not all $0$ or all $1$, subtract them out first, $$y_i = x_i - a_i,$$ and apply the nonnegative formula to what remains.

Upper bounds break the picture, because a bound like $x_i \le 4$ is not about empty groups. Count everything, then subtract the solutions that break a bound: for each variable that is too big, give it the excess in advance and count what is left, correcting for overlaps with inclusion-exclusion.

For $x + y + z = 10$ with every variable at most $4$, there are $\binom{12}{2} = 66$ solutions in all and $\binom{7}{2} = 21$ with $x \ge 5$, the same for $y$ and $z$. Each of the three pairs of variables can both be at least $5$ in exactly $\binom{2}{2} = 1$ way, which forces the third to be $0$, so the answer is $$66 - 3 \cdot 21 + 3 \cdot 1 = 6.$$

## On contests
A counting workhorse that rarely stands alone: 3 of the 23 problems tagged here need nothing else, and [[casework-method|casework]] joins it in 6, usually to split a problem into pieces that are each a clean distribution. The recurring disguises are dice or digits with a fixed total, identical coins or candies handed out to people, and monomials $x^ay^bz^c$ of a fixed degree $n$, of which there are $\binom{n+2}{2}$.
`,

"stars-bars-upper-bound": String.raw`## Why it works
Violating a cap $x_i \le m$ means $x_i \ge m+1$ — substitute $x_i' = x_i - (m+1)$ and count freely; inclusion-exclusion alternates over which caps are violated since violations can overlap. With a common cap $m$ on all $k$ variables this closes up as $\sum_j(-1)^j\binom kj\binom{n-j(m+1)+k-1}{k-1}$, and the terms vanish once $j(m+1)\gt n$, which is why the sum is short in practice.

## How to use it
Handle the upper bound by violation rather than by construction. Count everything with plain [[stars-and-bars|stars and bars]], then subtract the cases where a chosen variable exceeds $m$ — force that overflow by pre-assigning it $m+1$ and re-counting the remainder, which is again a stars-and-bars problem.

Add back the double violations, subtract the triple ones, and so on. The sum terminates quickly because $j$ variables cannot all overflow unless $j(m+1)\le n$, so in practice only two or three terms are non-zero.

If the bounds differ between variables, the same method works but each subset of violating variables contributes its own shift, so track them individually rather than using the symmetric binomial factor.

## On contests
Bounded dice sums ("three dice show total 11"), digit-sum counts (digits capped at 9 — the canonical use), and AIME distribution problems with room capacities.`,

"balls-boxes-table": String.raw`## Why it works
Each row of the table is a different bijection, and the four cases differ only in what "the same distribution" means.

Distinct balls into distinct boxes is a free choice per ball, giving $k^n$ assignments. Requiring no empty box turns it into a surjection, and inclusion-exclusion over which boxes go unused gives $\sum_{i=0}^{k}(-1)^i\binom ki(k-i)^n$. Requiring at most one ball per box turns it into an injection, so the count is the falling factorial $k(k-1)\cdots(k-n+1)$.

Identical balls into distinct boxes is [[stars-and-bars|stars and bars]]: lay the $n$ balls in a row and insert $k-1$ bars to cut them into $k$ groups, so every arrangement of $n$ stars and $k-1$ bars is exactly one distribution. With every box nonempty, drop one ball into each box first and distribute the remaining $n-k$ freely, which is $\binom{(n-k)+k-1}{k-1}=\binom{n-1}{k-1}$. With at most one per box you are only choosing which boxes are occupied, so it is $\binom kn$.

Unlabeled boxes mean partitioning the balls into groups with no order among the groups. For distinct balls that is the Stirling number of the second kind $S(n,k)$, and summing over the number of groups gives the Bell number. This also explains the surjection formula: take an unlabeled partition into $k$ blocks and glue labels onto the boxes in $k!$ ways, so the number of onto maps is $k!\,S(n,k)$.

With nothing labeled at all, a distribution is just a way to write $n$ as a sum of positive parts — an integer partition, which has no closed form. Use the recursion $p_k(n)=p_{k-1}(n-1)+p_k(n-k)$, splitting on whether the smallest part is $1$ or every part is at least $2$, or simply list them for small $n$.

## How to use it
Answer two yes/no questions before writing a single number: are the balls distinguishable, and are the boxes distinguishable? Those pick the row. A third question — must every box be nonempty? — picks the column. Confusing identical with distinct is the most common counting mistake there is, and applying stars and bars to distinguishable objects, or $k^n$ to identical ones, is the classic way to lose the problem. Constraints ride on top of the twelve cells rather than needing new formulas. A per-box minimum $m_i$: hand out the minimums first and distribute the remaining $n - \sum m_i$ freely, which is the substitution $x_i \mapsto x_i - m_i$. An upper cap $x_i \le c$: inclusion-exclusion, giving an offending box $c+1$ up front and alternating signs. At most one ball per box: just choose the boxes, $\binom{k}{n}$ for identical balls and $\binom{k}{n}n! = k(k-1)\cdots(k-n+1)$ for distinct ones.

When box $i$ needs at least $m_i$ balls, give each box its minimum up front and distribute what remains with no restriction; formally the substitution $x_i\mapsto x_i-m_i$ turns every "at least $m_i$" into "at least $0$" and lands you back in plain stars and bars. For $20$ identical balls into $4$ distinct boxes with each box at least $3$, place $3$ in each box and distribute the remaining $8$ freely: $\binom{8+4-1}{3}=\binom{11}{3}=165$.

Upper bounds do not work that way, and need inclusion-exclusion instead. Count all distributions, then subtract those where some box overflows by handing that box $c+1$ balls first and counting the rest, alternating signs as you consider one overflowing box, then two. For $10$ balls into $3$ boxes each holding at most $4$: all distributions $\binom{12}{2}=66$, minus those with a box at $5$ or more $3\binom72=63$, plus those with two such boxes $3\binom22=3$, giving $6$.

When both bounds apply, do the minimum substitution first — which also shifts the cap — then run the overflow inclusion-exclusion on what is left. For $12$ balls into $3$ boxes each between $2$ and $5$, setting $y_i=x_i-2$ gives $y_1+y_2+y_3=6$ with each $y_i\le3$, so $\binom82-3\binom42=28-18=10$, the two-box term being impossible since $8\gt6$.

If instead the box sizes are fixed in advance, none of the table applies: putting exactly $n_1,\dots,n_k$ distinct balls into distinct boxes is the multinomial coefficient, since you choose which balls go to box $1$, then box $2$, and so on.

## On contests
Run the two-question checklist first. AMC and AIME sample every cell of the table — identical candies into distinct bags for stars and bars, distinct people into identical teams for Stirling, coin and score totals for partitions — and love bolting a minimum or a cap on top, which the substitution and inclusion-exclusion recipes above clear away.`,

"pie": String.raw`
## When to use
"How many integers up to $1000$ are divisible by none of $2$, $3$ and $5$", "how many seatings leave nobody in their own seat", "how many functions are onto": counts of objects that avoid several properties, where each property and each overlap of properties is easy to count. It often follows complementary counting, which turns "at least one" into "none".

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

"derangements": String.raw`## Why it works
[[pie|PIE]] over the events "element $i$ is fixed": $D_n = \sum_j (-1)^j\binom{n}{j}(n-j)! = n!\sum \frac{(-1)^j}{j!}$ — the truncated $e^{-1}$ series, whence the nearest-integer form. The recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$ conditions on where element 1 goes and whether the swap closes.

## How to use it
Recognize the setup as "no object in its own place" — hats returned to the wrong owners, letters in wrong envelopes, a permutation with no fixed point.

The nearest-integer formula is the fastest route for a specific $n$: compute $\frac{n!}{e}$ and round. It is not an approximation but exact, which makes it safe under time pressure.

For "exactly $k$ fixed points", choose which $k$ are fixed and derange the rest, giving $\binom nkD_{n-k}$. The recurrence is the one to use when the problem is a derangement variant, since its derivation — the first element goes to some position $j$, and then either $j$ maps back or it does not — adapts to modified conditions in a way the closed form does not.

## On contests
Hat checks, mismatched letters/envelopes, and "no one gets their own" scenarios on AMC/AIME. The exactly-$k$-fixed-points formula is the standard follow-up question.`,

"catalan-numbers": String.raw`## Why it works
[[reflection-principle|Reflection principle]]: monotone paths crossing the diagonal biject (reflect after first violation) with paths to a shifted endpoint, giving $\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$. The recurrence $C_{n+1} = \sum C_iC_{n-i}$ conditions on the first return to the diagonal.

## How to use it
The skill is recognition rather than computation: whenever a structure is built by nesting or by never letting one running count fall behind another, it is Catalan. Balanced brackets, lattice paths staying weakly below the diagonal, triangulations of a convex polygon, and binary trees on $n$ nodes are the standard disguises.

To confirm a guess, compute the first few values by hand and compare against $1,1,2,5,14$. That check is faster than finding the bijection and almost always settles it.

Two derivations are worth keeping. The subtraction form comes from the reflection principle — all paths minus the bad ones. The convolution recurrence comes from splitting at the first return to the diagonal, and it is the one that generalises when the problem is Catalan-like but not exactly Catalan.

## On contests
$1, 2, 5, 14, 42, 132, 429, 1430$ should be recognizable on sight. AIME problems rarely say "Catalan" — they describe a non-crossing or non-negative-partial-sum condition and expect the identification.`,

"ballot-problem": String.raw`## Why it works
The cycle lemma or reflection principle: bad sequences (where B ties or leads at some point) biject with sequences starting with a B-vote, giving the clean $\frac{a-b}{a+b}$ fraction of orderings.

## How to use it
Recognize the shape as a running-total condition: one count must stay ahead of another throughout a random ordering. Vote counts are the classic dressing, but queues with correct change and lattice paths above a line are the same problem.

The reflection argument is what to reproduce: any ordering where the counts tie can be reflected before the first tie, biject the bad orderings with the ones starting with a $B$, and the subtraction gives the clean fraction.

Check which version the problem wants. "Always strictly ahead" gives $\frac{a-b}{a+b}$, while "never behind" allows equality and gives $\frac{a-b+1}{a+1}$ — the two differ, and problems exploit the distinction.

## On contests
Vote-counting and queue problems on AIME; also the engine behind Catalan path counts (the $a = b$ boundary case). Reflection-principle fluency transfers to many "stay above the line" problems.`,

"burnsides-lemma": String.raw`
## Key forms
- $|\mathrm{Fix}(g)|=k^{c(g)}$ — count the cycles of $g$, since every cycle must be a single color
- rotation by $d$ on an $n$-cycle has $\gcd(n,d)$ cycles — the subcount behind every necklace problem
- reflections join the group only when flips are allowed — a bracelet, not a seating chart

## Why it works
Count the pairs made of a symmetry and a coloring it fixes, in two ways.

Summing over the symmetries gives $\sum_g|\mathrm{Fix}(g)|$. Summing over the colorings instead, each coloring is fixed by the symmetries in its stabilizer, which by the orbit-stabilizer theorem has $\frac{|G|}{\text{orbit size}}$ elements. So the colorings in one orbit contribute $$\text{orbit size} \times \frac{|G|}{\text{orbit size}} = |G|$$ pairs between them, whatever the orbit, and the total is $|G|$ times the number of orbits.

A coloring is fixed by $g$ exactly when $g$ never moves a position to one of a different color, that is, when every cycle of $g$ is one color, which gives $|\mathrm{Fix}(g)| = k^{c(g)}$.

{{figure:rotations}}

## How to use it
List the symmetry group, count the colorings each element fixes, and average. Choose the group first, since the answer depends on it: rotations alone for an object fixed in place, and reflections as well when flipping it over gives something indistinguishable, like a necklace that can be turned over.

For $2$-colorings of the corners of a square up to rotation, the identity fixes $2^4 = 16$, the quarter turns fix $2$ each, and the half turn fixes $2^2 = 4$, so there are $$\frac{16 + 2 + 4 + 2}{4} = 6.$$ On a necklace of $n$ beads, rotation by $d$ positions has $\gcd(n, d)$ cycles.

The sum over the group must be a multiple of $|G|$, so a non-integer average means a miscounted fixed set. Burnside counts orbits only; for colorings with a prescribed number of each color, use [[polya-enumeration|Pólya enumeration]].

## On contests
Five problems here, four of them AIME, one solved by it alone; two combine it with [[constructive-counting|constructive counting]] of the fixed colorings. AIME usually needs only rotations, while flippable physical objects need the reflections too. The cube's $24$ rotations and their cycle structures are worth working out once in advance.
`,

"stirling-bell": String.raw`## Why it works
$S(n,k)$ recursion conditions on element $n$: either it forms its own block ($S(n-1,k-1)$) or joins one of the $k$ existing blocks ($kS(n-1,k)$). Bell numbers sum over all block counts.

## How to use it
The recurrence is the practical tool and its derivation tells you how to adapt it: consider the last element, which either joins one of the $k$ existing blocks or forms a block of its own.

Keep the distinction between labeled and unlabeled straight, since it decides which count you need. Objects labeled and blocks unlabeled gives $S(n,k)$; labeling the blocks as well multiplies by $k!$ and gives surjections; making the objects identical instead gives integer partitions.

Bell numbers answer "how many ways to partition into any number of blocks", and their own recurrence $B_{n+1}=\sum_k\binom nkB_k$ comes from choosing the block containing a fixed element.

## On contests
"Partition 5 students into study groups" ($B_5$ or $S(5,k)$ depending on wording) and surjection counts. The labeled/unlabeled distinction (Stirling vs. surjection) is the tested subtlety.`,


"non-adjacent-selection": String.raw`
## Why it works
Putting the chosen objects into different gaps between the unchosen ones is exactly the same as choosing a set with no two neighbors.

In a row, the $n - k$ unchosen objects leave $n - k + 1$ gaps: one between each neighboring pair and one at each end. Putting each chosen object into a different gap guarantees an unchosen object between any two chosen ones, and every non-adjacent choice arises this way from exactly one set of gaps. So there are $\binom{n - k + 1}{k}$.

{{figure:gaps}}

For a circle, split on whether a fixed object, say object $1$, is chosen. If it is, its two neighbors are not, and the other $k - 1$ come from a row of $n - 3$, giving $\binom{n - k - 1}{k - 1}$. If it is not, the rest form a row of $n - 1$, giving $\binom{n - k}{k}$.

Since $\binom{n - k - 1}{k - 1} = \frac{k}{n - k}\binom{n - k}{k}$, the two cases add up to $\frac{n}{n - k}\binom{n - k}{k}$.

## How to use it
Do not attack the condition directly; lay out the unchosen objects and choose gaps. For $3$ of $8$ chairs in a row, the $5$ unchosen chairs leave $6$ gaps, so there are $\binom63 = 20$ ways; around a round table there are $\frac85\binom53 = 16$.

For "at least $d$ apart" instead of merely not adjacent, put $d - 1$ spacers into each inner gap first; the row count becomes $\binom{n - (k - 1)(d - 1)}{k}$. The complement, "at least two adjacent", is the total $\binom nk$ minus the non-adjacent count.

## On contests
Six problems here, all AIME, none by it alone; two turn the count into a [[basic-probability|probability]] by dividing by $\binom nk$. The circular formula is the one to know by heart, since deriving it under time pressure invites an off-by-one error.
`,

"partitions": String.raw`
## Why it works
Compositions are easy because order makes every choice independent. Write $n$ as $n$ ones in a row; a composition is a choice, at each of the $n - 1$ gaps, of whether to break there, so there are $2^{n-1}$.

Partitions ignore order, which destroys that independence, so there is no formula. What they have instead is a picture, the Ferrers diagram, with one row of dots for each part, longest first. Reflecting it across its diagonal swaps rows and columns, so it matches the partitions with at most $k$ parts with the partitions whose parts are at most $k$.

{{figure:conjugate}}

Euler's Theorem comes from splitting parts. An odd part repeated $m$ times regroups, by writing $m$ in binary, into distinct parts, and every distinct part is an odd number times a power of $2$, so the process runs backwards and the two kinds of partitions are equally many.

## How to use it
Decide first whether order matters, since the two counts are wildly different. For small $n$, list partitions in decreasing order of the largest part to avoid repeats, as in the example.

With a restriction on the parts, use the generating function $$\prod_{k \ge 1} \frac{1}{1 - x^k},$$ which counts all partitions; dropping factors restricts the allowed parts. Conjugation turns a hard restriction into an easy one, since at most $k$ parts is the same count as parts at most $k$.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. Typical uses count compositions in disguise, such as the halves of a palindrome or the jump sequences of a frog, and partitions under a parity or size restriction, alongside [[stars-and-bars|stars and bars]] and [[casework-method|casework]].
`,

"surjections": String.raw`## Why it works
Inclusion–exclusion over which outputs are missed: $\sum_{j=0}^{k}(-1)^j\binom{k}{j}(k-j)^n$ subtracts the assignments that avoid $j$ chosen outputs, alternating to correct for double-counted overlaps. It equals $k!\,S(n,k)$ because a surjection is an unordered partition of the $n$ inputs into $k$ nonempty blocks — that count is $S(n,k)$, a Stirling number of the second kind — followed by a bijection matching the $k$ blocks to the $k$ labeled outputs, which adds a factor of $k!$.

## How to use it
The requirement that every output is used destroys the independence between inputs, so no product formula exists — that is why this needs [[pie|inclusion-exclusion]] while counting plain functions does not.

Run the exclusion over which outputs are missed: subtract the functions avoiding one chosen output, add back those avoiding two, and so on. Each term is a plain function count into a smaller codomain.

The Stirling form is often faster when $k$ is small, since $k!\,S(n,k)$ separates the count into "how are the inputs grouped" and "which output does each group take". It is also the entry in [[balls-boxes-table|the twelvefold way]] for distinguishable balls into distinguishable boxes with none empty.

## On contests
"Each of 3 mailboxes gets at least one of 6 letters," "every color is used," "no group left empty" — all recurring AMC/AIME shapes. The PIE formula plus fluency with the small cases handles essentially all of them.`,

"permutation-cycle-structure": String.raw`
## Key forms
- $\operatorname{ord}(f) = \operatorname{lcm}$ of the cycle lengths — so $f^{\,k} = \mathrm{id}$ exactly when every cycle length divides $k$, which turns a condition on the function into a condition on a partition of $n$
- $\alt{\dfrac{n!}{\prod_c c^{m_c} m_c!}}{\dfrac{n!}{1^{m_1}m_1!\cdot 2^{m_2}m_2!\cdots}}$ functions have $m_c$ cycles of each length $c$ — divide by $c$ per cycle, since a cycle can be written starting anywhere, and by $m_c!$ because equal-length cycles are interchangeable
- $f = f^{-1}$ means every cycle has length $1$ or $2$ — an involution, the $k = 2$ case, counted by $\alt{\sum_j \binom{n}{2j}(2j-1)!!}{1+\binom n2\cdot 1+\binom n4\cdot 3+\binom n6\cdot 15+\cdots}$
- a single $c$-cycle on a chosen set of $c$ elements can be written $(c-1)!$ ways — the [[circular-permutations|circular arrangement]] count, which is where the $c^{m_c}$ comes from

## Why it works
Following an element must lead back to it, and the loops that result do not interact.

Start at $x$ and iterate. The set is finite, so some value repeats, say $f^{\,i}(x) = f^{\,j}(x)$ with $i \lt j$ and $i$ as small as possible. If $i$ were positive, $f$ being one-to-one would give the earlier repeat $f^{\,i-1}(x) = f^{\,j-1}(x)$, so $i = 0$ and the first repeat is $x$ itself. The orbit closes into a cycle, and repeating on what is left splits the whole set into disjoint cycles.

{{figure:cycles}}

Applying $f$ turns every cycle one step. A cycle of length $c$ is back in place after exactly the multiples of $c$ steps, so all of them are back at once after a common multiple of the lengths. The first such time is the $\operatorname{lcm}$, and $f^{\,k} = \mathrm{id}$ exactly when every length divides $k$.

The counting formula comes from writing permutations down. List the $n$ elements in a row, in $n!$ ways, and cut the row into consecutive blocks of the chosen lengths, each block a cycle. Each permutation is written $c$ times per $c$-cycle, once for each starting point, and equal-length cycles can be listed in any of $m_c!$ orders, so dividing by $\prod_c c^{m_c} m_c!$ counts each permutation once.

## How to use it
When a problem constrains an iterate of $f$, translate it at once into allowed cycle lengths: $$f^{\,k}(x) = x \text{ for every } x \iff \text{every cycle length divides } k.$$ Then list the partitions of $n$ into allowed parts and count each type with the formula, as in the example.

The picture answers the reverse question too. The largest order of a permutation of $n$ elements is the largest $\operatorname{lcm}$ of a partition of $n$; for $n = 8$ it is $15$, from $3 + 5$. Parity also reads off the cycles: a $c$-cycle is a product of $c - 1$ swaps, so a permutation is even exactly when it has an even number of cycles of even length.

One family comes up whenever something steps around a ring. Moving $k$ places at a time around $n$ positions splits them into $$\gcd(n, k) \text{ cycles, each of length } \frac{n}{\gcd(n, k)}.$$ A position comes back after $m$ steps exactly when $n$ divides $mk$, which first happens at $m = \frac{n}{\gcd(n, k)}$, and since every cycle has that length there are $\gcd(n, k)$ of them.

## On contests
Four problems here, all AIME, none solved by it alone, and three of them finish with [[casework-method|casework]] over cycle types. The standard shape is "count the functions with $f^{\,k}(x) = x$ for every $x$", where the allowed cycle lengths are the divisors of $k$, as in the example.

Variations forbid every cycle shorter than some length, count arrangements such as handshake rings that are cycle structures in disguise, or step around a ring of $n$ points, where $\gcd(n, k)$ decides the cycles.

[[derangements|Derangements]] ask about fixed points instead, [[burnsides-lemma|Burnside's Lemma]] averages over cycle structure, and counting by the number of cycles rather than their lengths is [[stirling-first-kind|Stirling numbers of the first kind]].
`,

"stirling-first-kind": String.raw`## Why it works
Permutations decompose uniquely into disjoint cycles; $c(n,k)$ counts those with exactly $k$ cycles. Recursion: element $n$ starts its own cycle ($c(n-1,k-1)$) or inserts into any of $n-1$ positions inside existing cycles ($(n-1)c(n-1,k)$).

## How to use it
Two readings, and knowing both is what makes the numbers usable. Algebraically they are the coefficients when a rising factorial is expanded into powers; combinatorially they count permutations by cycle number.

The recurrence follows the same last-element argument as the second-kind numbers, but with $(n-1)$ rather than $k$ as the multiplier, because the new element can be inserted after any of the $n-1$ existing elements within a cycle.

The row sum is $n!$, which is the quickest sanity check on a computed row, and the algebraic reading is what lets you convert between falling-factorial and ordinary-power bases when manipulating polynomial identities.

## On contests
Cycle-structure problems (dance circles, function iteration orbits) and probability questions about random permutations' cycles — e.g. probability 1..n form one cycle is $\frac{1}{n}$.`,

"necklace-formula": String.raw`## Why it works
Burnside specialized to the cyclic group: rotation by $d$ has $\gcd(n,d)$ cycles, and grouping rotations by $g = \gcd$ collects $\varphi(n/g)$ rotations each, giving $\frac{1}{n}\sum_{d\mid n}\varphi(d)k^{n/d}$.

## How to use it
This is Burnside specialised to rotations, so use it directly when the objects are arranged in a cycle and rotations are considered identical.

The grouping by order is what makes the sum short: rotating by $j$ positions creates $\gcd(n,j)$ cycles, and collecting the $j$ with the same $\gcd$ gives the $\varphi(d)$ factor. For a specific small $n$ it is often faster to list the rotations directly than to evaluate the sum.

If flips also count as the same object, the group is dihedral rather than cyclic and you must add the reflection terms — $n$ of them, with the count depending on whether $n$ is odd or even, since the axes pass through beads or between them.

## On contests
Circular binary strings up to rotation, bead necklaces, and AIME's occasional "distinguishable up to rotation" counts. The prime-$n$ simplification doubles as a proof of [[fermats-little-theorem|Fermat's Little Theorem]].`,


"basic-probability": String.raw`
## Why it works
If all the outcomes are equally likely, each one holds the same share of the total probability, so an event's probability is just how many shares it holds.

Suppose there are $N$ equally likely outcomes. Their probabilities add up to $1$ and are all the same, so each one is $\frac{1}{N}$. An event made of $k$ of them therefore has probability $$k \cdot \frac{1}{N} = \frac{k}{N},$$ which is favorable over total.

The union rule is a counting fact divided by $N$. Counting the outcomes in $A$ and then the outcomes in $B$ counts every outcome in both of them twice, so $|A \cup B| = |A| + |B| - |A \cap B|$, and dividing by $N$ gives $$P(A \cup B) = P(A) + P(B) - P(A \cap B).$$ With three or more events the same correction becomes [[pie|inclusion-exclusion]].

The complement rule is the special case where $A$ and "not $A$" never overlap and together cover every outcome, so their probabilities add to $1$.

When the outcomes are not equally likely, none of this applies. The sums $2, 3, \ldots, 12$ of two dice are eleven outcomes, but a sum of $7$ happens six ways and a sum of $2$ only one, so they do not share the probability equally. The fix is always to go back to a finer list that is equally likely, here the $36$ ordered pairs, and count there.

## How to use it
Choose the sample space so that a single count answers the question, then use the union rule for "or" and the complement for "at least one". The complement is almost always shorter, because "none" factors into independent choices while "at least one" does not.

Multiply probabilities only after confirming independence. When the draws are without replacement they are dependent, so either condition step by step or count the favorable and total selections directly with binomial coefficients.

## On contests
It is the frame around most probability problems rather than the step that solves them: of the 46 problems tagged here, only one needs nothing else. The partner that does the work is almost always a counting technique, [[casework-method|casework]] in 14 of them and [[constructive-counting|constructive counting]] in 5, because once the outcomes are equally likely the whole problem is two counts.

The recurring trap on AMC and AIME is a sample space that looks uniform and is not, like the dice sums above; the fix is to rebuild it from ordered, distinguishable choices.
`,

"conditional-probability": String.raw`
## Why it works
Once $B$ is known to have happened, the outcomes outside $B$ are impossible and the ones inside keep their relative likelihoods, so conditioning means restricting to $B$ and rescaling.

With equally likely outcomes this is plain counting. If $B$ has $|B|$ outcomes and $|A \cap B|$ of them are in $A$, then among the outcomes still possible a fraction $\frac{|A \cap B|}{|B|}$ lie in $A$. Dividing the top and bottom by the size of the whole space turns this into $\frac{P(A \cap B)}{P(B)}$.

The same ratio is taken as the definition when outcomes are not equally likely, because it is the only rescaling that keeps the outcomes of $B$ in their original proportions and makes their total $1$.

{{figure:dice}}

Bayes' Theorem is the definition used twice. Both $P(A \mid B)\,P(B)$ and $P(B \mid A)\,P(A)$ equal $P(A \cap B)$, so they equal each other, and dividing by $P(B)$ gives $P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}$. That is how a conditional probability is reversed, and Bayes' Theorem has its own card.

## How to use it
Read $P(A \mid B)$ as "throw away every outcome outside $B$, then measure $A$ within what remains." With equally likely outcomes that is a count of $A \cap B$ over a count of $B$, and it handles most problems without any formula.

The rearranged form is what you use going forward: a sequence of dependent choices multiplies as $$P(\text{first}) \cdot P(\text{second} \mid \text{first}) \cdots,$$ which is how draws without replacement are computed step by step. Drawing two red balls from $3$ red and $2$ blue happens with probability $\frac35 \cdot \frac24 = \frac{3}{10}$, since after one red is gone, $2$ of the $4$ remaining balls are red.

Two traps are worth naming. $P(A \mid B)$ and $P(B \mid A)$ are different numbers, and confusing them is exactly the error Bayes' Theorem exists to correct. And independence is a claim to check, not to assume from the story: "the two draws feel unrelated" is not evidence, while checking $P(A \cap B) = P(A)\,P(B)$ is.

## On contests
Eleven problems here, ten of them AIME, and none solved by it alone: the condition defines the restricted space, then [[casework-method|casework]] or [[constructive-counting|a direct count]] measures it, and three of them reverse the condition with Bayes' Theorem. The classic trap is which space the condition defines. For two children, "at least one is a boy" leaves three equally likely cases and makes two boys $\frac13$, while "the older one is a boy" leaves two cases and makes it $\frac12$.
`,

"binomial-probability": String.raw`
## Why it works
One particular sequence of outcomes with $k$ successes has probability $p^k(1 - p)^{n - k}$, and $\binom nk$ different sequences have that many successes.

Because the trials are independent, the probability of a particular sequence, such as success, failure, success, failure, is the product $p \cdot (1 - p) \cdot p \cdot (1 - p)$. Every sequence with exactly $k$ successes has the same product, $p^k(1 - p)^{n - k}$, whatever the order. Such a sequence is fixed by which $k$ of the $n$ positions hold the successes, so there are $\binom nk$ of them, and their probabilities add.

{{figure:sequences}}

## How to use it
Check three conditions first: the trials are independent, their number is fixed in advance, and $p$ is the same every time. If one fails, this is the wrong model: drawing without replacement is hypergeometric, and waiting for the first success is [[geometric-distribution|geometric]].

For "at least $k$" questions, add the terms from $k$ upward, or subtract the shorter tail from $1$. Expected counts need no sum at all, since [[expected-value|linearity]] gives $np$ directly: $4$ fair flips average $2$ heads, while exactly $2$ heads has probability $\binom42 \cdot \frac1{16} = \frac38$.

## On contests
Five problems here, all AIME, two solved by it alone; the others add [[symmetry-probability|symmetry]], a [[generating-function-method|generating function]], or a [[bijection-method|bijection]]. AMC uses the plain formula on coins and dice, and AIME variants weight the coin, compare two binomial probabilities, or condition on the outcome.
`,

"expected-value": String.raw`
## Why it works
Expectation is a weighted average, and a weighted average of a sum is the sum of the weighted averages, whatever the relationship between the terms.

Over a finite sample space whose outcomes $\omega$ have probabilities $p(\omega)$, $E[X] = \sum_\omega X(\omega)\,p(\omega)$. Splitting the sum gives $$E[X + Y] = \sum_\omega \bigl(X(\omega) + Y(\omega)\bigr)p(\omega) = E[X] + E[Y].$$ Independence never enters, because nothing about how $X$ and $Y$ relate was used. The same step gives $E[aX + b] = aE[X] + b$.

The table shows it for three coin flips: averaging the row totals gives the same answer as averaging each column and adding.

{{figure:flips}}

## How to use it
When the question asks for an expected number of something, write the count as a sum of indicators, one for each place the thing could happen, each equal to $1$ if it happens and $0$ if not. An indicator's expected value is the probability of its event, so the answer is a sum of probabilities, and the distribution of the total is never needed.

For the number of fixed points of a random permutation of $n$ items, the indicator for each position has expected value $\frac1n$, so $$E[\text{fixed points}] = n \cdot \frac1n = 1,$$ even though the events are far from independent.

Compute $E[X] = \sum x_ip_i$ directly only when the distribution is short. For a long or infinite range, use indicators or the [[tail-sum-expectation|tail-sum formula]]; for a process that moves between states, use [[states-recursion-prob|first-step analysis]].

## On contests
Six problems here, five of them AIME, none by it alone; two continue into first-step analysis and two into indicator variables. AIME expected-value problems are almost always linearity of indicators in disguise, and recognizing a count as a sum of indicators replaces heavy [[casework-method|casework]] with a one-line sum.
`,

"geometric-distribution": String.raw`## Why it works
Self-similarity: after one failure the situation resets, so $E = 1 + (1-p)E$, giving $E = \frac{1}{p}$. The series view sums $\sum k p(1-p)^{k-1}$ (arithmetico-geometric), whose terms are the distribution itself: the first success falls exactly on trial $k$ with probability $P(X=k)=(1-p)^{k-1}p$.

## How to use it
Set up the self-similar equation rather than summing a series: after one trial you have either succeeded or are back where you started, so $E=1+(1-p)E$, giving $E=\frac1p$. The same conditioning handles variants the closed form does not cover.

Coupon collector is a sum of geometric waits. Once you hold $k$ distinct types, the chance the next draw is new is $\frac{n-k}{n}$, so that stage takes $\frac{n}{n-k}$ on average; adding the stages gives $nH_n$. Recognizing it as a sum of independent waits is what makes it easy.

Watch what is being counted. "Trials until the first success" includes the successful trial and averages $\frac1p$; "failures before the first success" excludes it and averages $\frac{1-p}{p}$.

## On contests
"Expected rolls until a 6" ($=6$), coupon-collector variants (expected rolls to see every face: $14.7$), and first-passage questions. The self-similar equation is faster and safer than series summation.`,

"turn-based-games": String.raw`## Why it works
Sum the geometric series over rounds, or self-similarity: $P = p + (1-p)(1-q)P$ — either the first player wins now, or both miss and the game restarts identically.

## How to use it
Condition on the first round rather than summing the series: either the first player succeeds immediately, or both fail and the position resets exactly, giving $P=p+(1-p)(1-q)P$. Solving takes one line and generalises to variants the closed form does not cover.

The structural fact worth carrying is that moving first is always an advantage when the players are equally skilled — $\frac{1}{2-p}$ exceeds $\frac12$ for every $p$ in $(0,1)$, and approaches $1$ as $p$ grows.

If the turn order is not strictly alternating, or the success probability changes between rounds, the reset argument fails and you need a state recursion instead.

## On contests
Alternating dice/coin duels are AMC/AIME classics ("first to roll a six wins — probability the second player wins" $= \frac{5}{11}$). Set up the restart equation directly; series are backup.`,

"geometric-probability": String.raw`
## When to use
Two people arrive at random times and meet if they come within a fixed time of each other; a stick is broken at two random points and the pieces form a triangle; a point chosen in a square lands within some distance of a corner. Whenever the random quantities are real numbers chosen uniformly, the question is really about the size of a region.

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
A random process moves among finitely many situations until it stops: a random walk until it reaches an end, a game until someone wins, a bug on a cube until it reaches a corner, coin flips until a pattern appears. The question asks for the chance of ending a certain way or the expected number of steps.

## How
1. Choose states that capture everything that matters for the future, and nothing more.
2. Give each state an unknown: $p_S$ for the chance of winning from it, or $E_S$ for the expected number of steps.
3. For each state, condition on the first step: $p_S$ is the next states' values averaged by the step probabilities, and $E_S$ is $1$ more.
4. Fix the end states: $p = 1$ at a win, $p = 0$ at a loss, and $E = 0$ at the finish.
5. Solve the system, merging states that behave alike.

Flip a fair coin until two heads in a row appear. With states "start" and "just flipped a head", $E_0 = 1 + \frac12 E_H + \frac12 E_0$ and $E_H = 1 + \frac12 \cdot 0 + \frac12 E_0$. Substituting the second into the first gives $\frac14 E_0 = \frac32$, so $E_0 = 6$ flips on average.

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
- Leaving out the $+1$ in an expected-steps equation.
- Forgetting the values at the end states, which leaves the system with no unique solution.

## Contest profile
Usually the whole solution of an AIME probability or expected-value problem about a repeated process: a few states and a small linear system.
`,

"symmetry-probability": String.raw`
## When to use
The outcomes are equally likely and the question is about order or position: the chance that card $A$ comes before card $B$, that the top card is an ace, that the largest of $n$ numbers lands in the first half, that a given player is eliminated last. It also gives expected values, since interchangeable quantities have equal expectations: the gaps between random points on a segment all have the same expected length.

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

"hypergeometric": String.raw`## Why it works
Choosing $n$ from a population with $K$ marked items: favorable choices pick $k$ marked and $n-k$ unmarked independently; divide by all $\binom{N}{n}$.

## How to use it
Use it whenever a fixed pool is sampled without replacement and you want exactly $k$ of a distinguished type — red balls, face cards, defective parts. The trials are dependent, so the binomial formula does not apply.

The numerator is a straight product: choose which special items are drawn and which ordinary ones fill the rest. The denominator is every equally likely draw. Because it is a ratio of counts, order never enters, and you should not multiply by any arrangement factor.

Expected values still come from linearity, giving $n\frac KN$ exactly as in the binomial case — the dependence changes the distribution but not the mean, which is $E[X]=n\frac KN$ either way. When $N$ is very large compared with $n$, the two distributions nearly coincide, which is why sampling from a big population can be treated as independent.

## On contests
"Probability a 5-card hand has exactly 2 aces" and committee-composition problems. Choosing between binomial (with replacement/independent) and hypergeometric (without) is the tested judgment.`,


"variance-independence": String.raw`## Why it works
$\mathrm{Var}(X) = E[X^2] - E[X]^2$ is algebra on the definition; independence makes cross terms factor ($E[XY] = E[X]E[Y]$), so variances add. Affine changes need no independence at all: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$, since a shift moves the whole distribution without changing its spread while a scale squares it.

## How to use it
The contrast with expectation is the point worth internalising: $E[X+Y]=E[X]+E[Y]$ always, but the corresponding statements for products and for variance need independence. Applying them to dependent variables is the standard error.

Compute variance as $E[X^2]-E[X]^2$, which usually means finding $E[X^2]$ by the same indicator or [[casework-method|casework]] method used for $E[X]$. For an indicator, $E[X^2]=E[X]$ since $0$ and $1$ square to themselves, which simplifies sums of indicators considerably.

When the variables are dependent, the correction term is the covariance: $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$.

## On contests
Rare directly on AMC/AIME but appears in expected-square computations: $E[X^2] = \mathrm{Var} + (E[X])^2$ evaluates sums of squares over random processes cleanly.`,

"expected-fixed-points": String.raw`## Why it works
Write $X=\sum_{i=1}^{n}\mathbf 1[\text{position }i\text{ is fixed}]$. Each indicator has $P=\frac1n$ (position $i$ maps to $i$ with probability $1/n$), so $E[X]=n\cdot\frac1n=1$ for every $n$ — the events are dependent, but [[indicator-variables|linearity of expectation]] ignores dependence entirely. For the full distribution, the number of permutations of $n$ with exactly $k$ fixed points is $\binom{n}{k}D_{n-k}$: choose which $k$ are fixed, then derange the other $n-k$. Dividing by $n!$ gives $P(X=k)=\frac{1}{k!}\cdot\frac{D_{n-k}}{(n-k)!}\to\frac{e^{-1}}{k!}$, a Poisson($1$) limit.

## How to use it
The expectation is pure linearity: $n$ positions, each fixed with probability $\frac1n$, so the answer is $1$ regardless of $n$ — no distribution needed, and the dependence between positions is irrelevant.

For the exact distribution, choose which $k$ points are fixed and derange the rest, which is where $\binom nkD_{n-k}$ comes from. The $D$ values are worth knowing for small arguments: $D_1=0$, $D_2=1$, $D_3=2$, $D_4=9$, $D_5=44$.

Because the count is nearly Poisson with mean $1$, the probability of exactly $k$ fixed points is close to $\frac{1}{e\,k!}$ even for small $n$ — a good sanity check on an exact computation.

## On contests
Both a one-line quotable fact and a proof pattern: AIME expected-value questions and "exactly $k$ fixed / matching" counts about permutations almost always reduce to the indicator sum or the $\binom{n}{k}D_{n-k}$ formula.`,

"coprime-probability": String.raw`## Why it works
Heuristically: divisibility by each prime $p$ is "independent" with probability $\frac{1}{p^2}$ for both of a pair, giving density $\prod_p (1 - \frac{1}{p^2}) = \frac{1}{\zeta(2)} = \frac{6}{\pi^2}$.

## How to use it
The derivation is the useful part: a fixed prime $p$ divides both numbers with probability $\frac{1}{p^2}$, these events are independent across primes, so the coprime density is $\prod_p\left(1-\frac{1}{p^2}\right)$, which is $\frac{1}{\zeta(2)}=\frac{6}{\pi^2}$.

The same reasoning generalises: the probability that $k$ random integers share no common factor is $\frac{1}{\zeta(k)}$, and the density of $k$-th-power-free integers is the same number.

Treat "probability" here as a density over a growing range rather than a genuine uniform distribution, since there is no uniform measure on the integers — for contest purposes the limiting proportion is what is meant.

## On contests
Mostly enrichment; finite coprime-pair counts on AIME go through the Möbius/inclusion-exclusion sum rather than the constant.`,

"pigeonhole": String.raw`
## Why it works
If every box held fewer than the average, the boxes together would hold fewer than all the objects, which is impossible.

With $n$ objects in $k$ boxes the average box holds $\frac nk$, and the fullest box holds at least the average. Since box counts are whole numbers, it holds at least $\lceil \frac nk \rceil$. In the simplest case, $n \gt k$ makes the average more than $1$, so some box holds two. Run backwards, forcing some box to hold $r$ objects needs more than $k(r - 1)$ of them.

## How to use it
Invent the boxes. Choose a feature with few possible values, which become the boxes, such that two objects sharing a value gives what you want. Two integers with the same remainder mod $m$ differ by a multiple of $m$; two points in the same small region are close together; two subsets with the same sum can be compared.

For five points in a unit square, cut it into four squares of side $\frac12$. Five points in four squares put two in the same one, and two points in a square of side $\frac12$ are at most its diagonal, $\frac{\sqrt2}{2}$, apart.

{{figure:square}}

## On contests
Five problems here, mostly AMC, three solved by it alone. The signature is a guarantee: "show that two of them must", or a number exactly one more than the count of some category, as in the fewest socks that guarantee a matching pair. The art is always the choice of boxes, never the principle itself.
`,

"handshake-lemma": String.raw`
## Why it works
Count the pairs (vertex, edge at that vertex) in two ways.

Grouped by vertex, a vertex of degree $\deg(v)$ contributes $\deg(v)$ pairs. Grouped by edge, each edge has exactly two ends and contributes two. Both count the same pairs, so $$\sum_v \deg(v) = 2E.$$

{{figure:ends}}

The total is even, and the vertices of even degree contribute an even amount, so the odd degrees must also add to an even number, which needs an even number of them.

## How to use it
Use it in two directions. Forwards, it converts degree information into an edge count: if each of $n$ people shakes $k$ hands, there are $\frac{nk}{2}$ handshakes.

Backwards, it is a [[invariants-coloring|parity obstruction]]. Can seven people each shake exactly three hands? The degrees would add to $$7 \cdot 3 = 21,$$ an odd number, so no such arrangement exists.

The lemma also underlies [[eulerian-paths|Eulerian paths]]: a path through every edge needs $0$ or $2$ vertices of odd degree, and the count being even is why $1$ or $3$ never occurs.

In three dimensions the same count applies to a polyhedron twice. Each edge joins two vertices, so the vertex degrees add to $2E$, and each edge borders exactly two faces, so the numbers of sides of the faces add to $2E$ as well: $$\sum_{\text{vertices}} \deg(v) = 2E = \sum_{\text{faces}} (\text{sides of the face}).$$

{{figure:faces}}

A soccer ball has $12$ pentagons and $20$ hexagons, so $2E = 12 \cdot 5 + 20 \cdot 6 = 180$ and $E = 90$. Three faces meet at every vertex, so $3V = 180$ and $V = 60$, which agrees with [[eulers-polyhedron-formula|Euler's Polyhedron Formula]]: $60 - 90 + 32 = 2$.

The parity half carries over too. The face sides add to an even number, so every polyhedron has an even number of faces with an odd number of sides; no polyhedron is made of exactly seven triangles, since $7 \cdot 3 = 21$ is odd.

## On contests
Three problems here, two AIME and one AMC 10, one solved by it alone. Typical uses add up the degrees of a network to count its edges, split a polyhedron's vertices by degree once Euler's Polyhedron Formula gives how many there are, or use the odd degrees to bound a trail through a graph. The same template counts games in a tournament and edges of a polyhedron from its faces.`,

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

"ramsey-33": String.raw`## Why it works
Among one person's 5 relations, pigeonhole gives 3 of one type; those 3 either contain a matching pair (closing a monochromatic triangle with the center) or form the opposite triangle themselves. $K_5$'s two-pentagon coloring shows 6 is tight.

## How to use it
The proof is a two-step pigeonhole worth reproducing. Fix one person: of their five relationships, at least three share a color, say three friends. If any two of those three are friends with each other, that trio plus the fixed person is a monochromatic triangle; if none are, those three are mutual strangers.

Minimality needs a construction, not an argument — color a $5$-cycle one way and its complement the other, and no monochromatic triangle exists. Contest problems asking to show a bound is tight always need this second half.

The general lesson is that these results are proved by fixing one vertex and pigeonholing its edges, which is the standard opening for any small Ramsey-style question. Do not expect the pattern to continue cheaply — Ramsey numbers grow ferociously, with $R(4,4)=18$ and $R(5,5)$ still unknown.

## On contests
The 6-people puzzle appears verbatim in competition folklore; the argument template (fix a vertex, pigeonhole its edges) solves related AMC/AIME-adjacent coloring questions.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {


});

Object.assign(window.MATH_DETAILS, {

"weighted-binomial-sums": String.raw`## Why it works
Differentiating $(1+x)^n = \sum \binom{n}{k}x^k$ brings down a factor of $k$; multiplying by $x$ realigns the powers; setting $x = 1$ sums. Twice through gives $k(k-1)$ sums, and $k^2 = k(k-1) + k$ assembles the $k^2$ version. Combinatorially: $k^2\binom{n}{k}$ counts committees with a chair and a (possibly identical) secretary.

## How to use it
The derivative pipeline evaluates any $\sum k^m \binom{n}{k} x^k$; the combinatorial story (chair/secretary [[casework-method|casework]]: same person or different) is faster for small $m$ and less error-prone under pressure. For alternating versions, differentiate first and then substitute $x = -1$.

## On contests
Expected values over random subsets ($E[|S|^2]$ for uniform random subsets needs exactly $\sum k^2\binom{n}{k}/2^n = \frac{n(n+1)}{4}$) and AIME identity evaluations. The committee-chair-secretary story generalizes to any polynomial weight.`,

"cayleys-formula": String.raw`## Why it works
The Prüfer correspondence: repeatedly delete the smallest-labeled leaf and record its neighbor; a tree on $n$ labeled vertices produces a sequence of $n-2$ labels, and the process reverses uniquely. Sequences are free choices: $n^{n-2}$.

## How to use it
The formula is short but the bijection is what solves problems. Encode a tree by repeatedly deleting the smallest-labeled leaf and recording its neighbor; the resulting $n-2$ labels determine the tree uniquely, and every sequence arises exactly once.

That correspondence answers the harder variants directly. Since a vertex appears one fewer time than its degree, counting trees with prescribed degrees $d_1,\dots,d_n$ becomes the multinomial coefficient $\binom{n-2}{d_1-1,\dots,d_n-1}$, and counting trees in which a given vertex is a leaf becomes counting sequences that omit it.

Watch the labeling assumption — the count is for distinguishable vertices, and unlabeled trees have no closed form.

## On contests
AIME/olympiad network-counting problems ("how many ways to connect $n$ towns with $n-1$ roads so all are reachable"). The degree-refinement (multinomial over Prüfer sequences) handles "each hub connects to exactly $k$ cities" variants.`,

"eulerian-paths": String.raw`## Why it works
A pass through a vertex uses two edges (in, out), so intermediate vertices need even degree; the endpoints of a non-closed trail each spare one odd edge. Sufficiency is Hierholzer's construction: greedily walk until stuck (necessarily back at the start when degrees are even), then splice in detours at visited vertices with unused edges.

## How to use it
Count odd-degree vertices, and the answer follows immediately: zero means a closed trace, two means an open one starting and ending at those vertices, anything more means it cannot be done in one stroke.

Check connectivity as well, since the degree condition alone is not sufficient — a graph in two separate pieces fails however even its degrees are.

For "minimum retraced distance" problems, the number of odd vertices tells you how many edges must be duplicated: pair up the odd vertices along shortest paths and double those edges, which makes every degree even. Do not confuse any of this with Hamiltonian paths, which visit vertices rather than edges and have no comparable criterion.

## On contests
"Can this figure be drawn in one stroke" (MATHCOUNTS/AMC) and postman-flavored "minimum retraced distance" questions. Distinguish from Hamiltonian (every vertex once) — the vertex version has no such clean criterion.`,

"plane-regions": String.raw`## Why it works
Incremental counting: a new line crossing $k$ existing lines is cut into $k+1$ pieces, each splitting one region — so lines add $1, 2, 3, \dots$ new regions, summing to $1 + \sum_{i=1}^{n} i = \frac{n^2+n+2}{2}$. A new circle crossing each old one twice is cut into $2(n-1)$ arcs, each adding a region.

## How to use it
Derive rather than memorize: adding the $k$-th line crosses the previous $k-1$ lines, and each crossing splits one more region, so it adds $k$ regions in total. Summing gives $1+\sum_{k=1}^{n}k$, which is the closed form. The same argument with two crossings per circle gives the circle count.

That incremental principle is the transferable part — it handles configurations the formulas do not cover, such as a mix of lines and circles, or lines with some parallels, by counting crossings as each curve is added.

Check the general-position hypothesis before quoting a maximum. Any parallel pair or triple concurrence loses regions, and problems often specify a configuration that deliberately fails it.

## On contests
Direct AMC questions ask for the most pieces from a few straight cuts, such as $16$ pieces of a pancake from $5$ cuts, and harder problems use the same count, $1 +$ lines $+$ crossings, for the expected number of regions from random chords, by linearity.`,

"order-statistics": String.raw`## Why it works
By symmetry, $n$ uniform points plus the two interval endpoints split $[0,1]$ into $n+1$ exchangeable gaps, so each gap expects $\frac{1}{n+1}$; the $k$-th smallest point sits after $k$ gaps at $E[X_{(k)}] = \frac{k}{n+1}$. Directly: $P(\max \le x) = x^n$ integrates to $E[\max] = \frac{n}{n+1}$.

## How to use it
The distribution function route ($P(\max \le x) = x^n$, $P(\min \ge x) = (1-x)^n$) answers probability questions; the gap-symmetry route answers expectation questions instantly. For the range: $E[\max - \min] = \frac{n-1}{n+1}$.

## On contests
"[[expected-value|Expected value]] of the largest of three spins," waiting-point problems, and [[geometric-probability|geometric probability]] hybrids (the broken-stick setup is order statistics on two points). The $\frac{k}{n+1}$ pattern is worth having on instant recall.`,

"total-expectation": String.raw`## Why it works
Group the outcomes by which case $A_i$ occurred and average within cases first: the inner averages are the conditional expectations, and recombining with weights $P(A_i)$ reproduces the overall average. It is associativity of [[weighted-average|weighted averages]], elevated to a principle.

## How to use it
Choose the partition that makes each conditional expectation easy, and conditioning on the first step is almost always that choice — it turns a process into an equation relating $E[X]$ to itself.

Wald's identity is the case worth recognizing separately: when a random number of independent pieces are summed, the expected total is the product of the two expectations, provided $N$ does not depend on the values of the pieces. That proviso matters, and dropping it is the standard error.

The technique pairs naturally with state recursions: the Law of Total Expectation writes one equation per state, and solving the small system gives every expectation at once. Whichever partition you pick, check it is disjoint and exhaustive — the same requirement as ordinary [[casework-method|casework]], and the usual source of a wrong weighted average.

## On contests
The organizing principle behind nearly every AIME expected-value problem: condition on the first step, write the tower equation, solve. Misapplying it (conditioning on a non-partition) is the error to guard against — cases must be exclusive and exhaustive.`,



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
Counting lattice paths on a grid with blocked squares, extra steps such as diagonals, or a missing region, so that one binomial coefficient no longer gives the answer. It also handles any board-walking count small enough to write out.

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
Codes, license plates, seatings, numbers with digit conditions, committees with roles: anything you could build by making a fixed sequence of choices. It is the default first attempt at any count, and the base that casework, complementary counting and dividing out an overcount all build on.

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
A process of moves, such as replacing two numbers on a board by a combination of them, flipping coins, or jumping a piece, and a question about whether some state can be reached. The answer is usually no, proved by a quantity no move can change. The related question, whether the process must stop, asks for a quantity that every move decreases.

## How
1. Write down exactly what one move does.
2. Look for a quantity it leaves unchanged: a sum, a product, a parity, or a value modulo a small number.
3. Compute the quantity at the start and at the target.
4. If the two values differ, the target is unreachable.
5. To show the process stops, find a nonnegative integer that every move strictly decreases.

The numbers $1, 2, \ldots, 10$ are on a board, and a move replaces two of them by their difference. The last number can never be $0$: replacing $a$ and $b$ by $|a - b|$ changes the sum by $2\min(a, b)$, an even number, so the sum stays odd, as $55$ is.

## Why it works
A quantity that no move changes has the same value after any sequence of moves, so every reachable state shares its starting value, and a state with another value is out of reach. A nonnegative integer that drops with every move cannot drop forever, so the process must stop after finitely many moves.

## Formulas it uses
- [[modular-basics]]: invariants are often a value modulo a small number, such as a sum modulo $3$ when every move changes it by a multiple of $3$.

## Common traps
- Concluding that a target is reachable because the invariant agrees there; an invariant can only prove impossibility.
- Choosing a quantity that some move changes in a rare case.
- A decreasing quantity that is not bounded below, which proves nothing about stopping.

## Contest profile
Mostly olympiad; on the AMC and AIME it is the idea behind "which final number is possible" questions and jumping-piece questions, and the invariant is usually parity or a sum modulo a small number. Tilings use the [[coloring-arguments|coloring argument]] instead.
`

});

Object.assign(window.MATH_DETAILS, {

"bayes-theorem": String.raw`
## Why it works
Both $P(A)\,P(B \mid A)$ and $P(B)\,P(A \mid B)$ are the probability of the overlap $A \cap B$, so they are equal, and dividing by $P(B)$ gives the theorem. It is bookkeeping that swaps the direction of the conditioning.

The denominator is the law of total probability. If the causes $A_i$ are disjoint and cover every outcome, the evidence happens through exactly one of them, so $$P(B) = \sum_i P(B \mid A_i)\,P(A_i).$$ That denominator is the same whichever cause is being tested, so the chance of a cause is proportional to its prior times its likelihood, and comparing causes needs only the numerators.

## How to use it
Identify which direction you are given and which you want. Problems give $P(\text{evidence} \mid \text{cause})$, such as a test's accuracy, and ask for $P(\text{cause} \mid \text{evidence})$.

Counting whole people is more reliable than the formula. For a disease in $1\%$ of people and a test that is $90\%$ accurate both ways, take $100{,}000$ people: $1{,}000$ are sick and $900$ of them test positive, while $9{,}900$ of the $99{,}000$ healthy people also test positive. So $$P(\text{sick} \mid +) = \frac{900}{900 + 9{,}900} = \frac{1}{12}.$$

A rare condition drowns even an accurate test in false positives: when the base rate is far below the false-positive rate, most positives are false.

## On contests
Three problems here, all AIME, none solved by it alone, and each pairs it with conditional probability. The shapes are a coin or die that might be fair or biased, judged after a few outcomes; a population split into groups with different rates, where it helps to count $100$ people; and a lottery, the chance of the top prize given some prize.`,

"generating-function-method": String.raw`
## When to use
Reaching a total from independent parts, each with its own allowed amounts: making change, distributing identical objects with caps, sums of several dice, partitions into restricted parts. Whenever choices are independent and combine by adding, the product of one polynomial per choice handles every interaction at once.

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
Existence and impossibility claims about a finite configuration: a graph, a set of points, a tournament, a set of numbers. Look at the object that is largest or smallest in some sense, the longest path, the closest pair, the smallest counterexample, because being extreme gives it a property the other objects lack.

## How
1. Choose a quantity to make extreme: a length, a distance, a size, a number of wins.
2. Take an object where it is largest or smallest; one exists because the configuration is finite or the values are positive integers.
3. Use the extremeness: nothing is longer, closer or smaller.
4. Derive a contradiction, or read off the property you want.

In a round-robin tournament, a team $A$ with the most wins reaches every other team in at most two steps: either $A$ beat $B$, or $A$ beat some team that beat $B$. Otherwise $B$ beat $A$ and beat every team that $A$ beat, so $B$ won more games than $A$, which is impossible.

## Why it works
A finite set of numbers, or any nonempty set of positive integers, has a largest and a smallest member, so the extreme object exists. Being extreme is a property: nothing lies beyond it. A typical proof assumes the claim fails, takes the extreme object, and builds from the failure an object more extreme still, which cannot exist. Taking a smallest counterexample and finding a smaller one is the same argument as infinite descent.

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

"sprague-grundy": String.raw`## Why it works
In [[sprague-grundy|Nim]] the XOR ("Nim-sum") of the pile sizes is a handle you control: if it's nonzero, some pile has a leading bit you can clear to zero the whole XOR (a move to a losing-for-opponent position); if it's zero, every move breaks it. Sprague–Grundy generalizes this by assigning each position a value $g = \operatorname{mex}$ of its options' values — the least nonnegative integer they miss. A position with $g = 0$ can only move to $g \ne 0$ and vice versa, exactly Nim's win/loss logic, and independent games combine because the XOR of Grundy values behaves like one Nim position.

## How to use it
For a single game type, tabulate $g(0), g(1), \dots$ via $g(n) = \operatorname{mex}\{g(\text{reachable})\}$ until the (usually periodic) pattern emerges; $g = 0$ marks the losing positions. When a game splits into independent parts — several piles, a board that separates — compute each part's Grundy value and XOR them: the whole is a loss iff the XOR is $0$, and the winning move is the one that zeroes it (treat each part as a Nim pile of size $g$).

## On contests
Multi-pile take-away and token games on AIME and olympiad. The single-pile version is the Losing Positions card; Sprague–Grundy is what you need once the game separates into independent components. Remember two facts: losing $\iff$ Nim-sum $0$, and games add by XOR of Grundy values.`,

"erdos-szekeres": String.raw`## Why it works
Tag each term $x_i$ with $(u_i, d_i)$: the lengths of the longest increasing and longest decreasing subsequences ending at $x_i$. If $i \lt  j$ and $x_i \lt  x_j$ then $u_j > u_i$; if $x_i > x_j$ then $d_j > d_i$ — so distinct terms always get distinct tags. With $mn + 1$ terms but only $mn$ tags satisfying $u \le m, d \le n$, pigeonhole forces some $u \ge m+1$ or $d \ge n+1$.

## How to use it
The proof is the technique worth carrying: attach to each term the pair (longest increasing run ending there, longest decreasing run ending there). Any two terms have different labels, because whichever comes first extends one of the other's runs.

If no run reached $m+1$ or $n+1$, every label would lie in an $m\times n$ grid of possibilities — only $mn$ of them for $mn+1$ terms, which pigeonhole forbids.

Recognize the trigger as any problem asking to guarantee a monotone subsequence, or to show a sequence cannot avoid one. The labeling idea generalises: pairing each element with two extremal statistics and counting the available pairs is a reusable pigeonhole setup.

## On contests
Olympiad combinatorics, typically as a lemma ("among these $N$ values, some $k$ form a monotone chain"), and a natural companion to the Pigeonhole Principle. The bound $mn+1$ is sharp — a grid of decreasing blocks of decreasing runs achieves $mn$ with no long monotone subsequence.`,

"planar-graph-bound": String.raw`## Why it works
Euler's Formula $v - e + f = 2$ holds for any connected planar drawing. Every face is bounded by at least $3$ edges and every edge borders exactly $2$ faces, so $2e \ge 3f$, i.e. $f \le \frac{2e}{3}$; substituting into Euler gives $e \le 3v - 6$. If the graph is triangle-free (in particular bipartite), every face needs $\ge 4$ edges, so $2e \ge 4f$ and $e \le 2v - 4$.

## How to use it
Use the bound to prove non-planarity by counting: a graph with more edges than $3v-6$ allows cannot be drawn without crossings. This settles $K_5$ immediately, since $10\gt3\cdot5-6=9$.

For triangle-free graphs use the sharper form, because every face then needs at least four edges. That is what disposes of $K_{3,3}$, which is bipartite with $9\gt2\cdot6-4=8$.

The bound runs one way only — violating it disproves planarity, but satisfying it proves nothing. A useful corollary is that every planar graph has a vertex of degree at most $5$, which is the starting point for planar coloring arguments.

## On contests
AMC/AIME problems about maps, networks, and polyhedra, and olympiad graph theory. It is the corollary of Euler's Polyhedron Formula (filed under Geometry) — the same identity read as a planar graph rather than a solid; keep the two linked in your head.`,

"halls-marriage": String.raw`## Why it works
The condition $|N(S)| \ge |S|$ for every $S \subseteq X$ is clearly necessary — a group of applicants adjacent to fewer jobs than its size can't all be matched. Sufficiency is the theorem: if no matching saturates $X$, an augmenting-path argument extracts a specific deficient set $S$ with $|N(S)| \lt  |S|$. So the sole obstruction to a full matching is one bottleneck set.

## How to use it
To prove a matching exists, verify Hall's condition; to prove none exists, exhibit one deficient set — a group of applicants collectively connected to fewer jobs than there are applicants. That asymmetry is what makes the theorem practical, since disproof needs only a single example.

Checking all $2^{|X|}$ subsets is rarely necessary. Structural arguments usually suffice: in a $k$-regular bipartite graph, counting the edges leaving $S$ shows $|N(S)|\ge|S|$ at once, so a perfect matching always exists.

The standard dressings are assigning people to tasks, placing non-attacking rooks, and choosing distinct representatives from a family of sets — recognizing any of these as bipartite matching is the first step.

## On contests
Olympiad combinatorics: systems of distinct representatives, Latin-square and tiling completions, and "can these be paired / assigned?" existence problems. The whole task reduces to checking Hall's condition or naming the one set that fails it.`

});

Object.assign(window.MATH_DETAILS, {

"dilworths-theorem": String.raw`## Why it works
A chain and an antichain share at most one element, so you always need at least (largest antichain) chains to cover the poset — the easy direction. That this many suffice is the theorem, provable by induction or via [[konigs-theorem|Kőnig's Theorem]] on an associated bipartite graph. Mirsky's dual swaps chains and antichains.

## How to use it
Recognize the setup as a partial order — divisibility, containment, or dominance in two coordinates — where you must either cover everything with few chains or find a large incomparable family.

The theorem converts between the two, which is what makes it useful: bounding one side is usually much easier than the other. To show few chains suffice, exhibit a small antichain bound; to show a large antichain exists, exhibit a covering.

Erdős–Szekeres falls out by ordering terms by both index and value, where chains are monotone subsequences and antichains are the opposite monotonicity — recognizing that specialisation is often the quickest route into a sequence problem.

## On contests
Olympiad combinatorics: partitioning into monotone pieces, scheduling, "cover with few chains." Building the right poset and quoting Dilworth or Mirsky is usually the cleanest path.`,

"sperners-theorem": String.raw`## Why it works
Partition the subset lattice of $[n]$ into $\binom{n}{\lfloor n/2\rfloor}$ symmetric chains; an antichain meets each at most once, capping its size, and the middle layer attains it. The LYM inequality $\sum_{A} \binom{n}{|A|}^{-1} \le 1$ over any antichain gives the bound directly, maximized by all middle-size sets.

## How to use it
Use it when a problem asks for the most subsets you can choose with none containing another — committees where no committee contains another, or divisor sets with no divisibility relations.

The construction is immediate: take every subset of size $\lfloor n/2\rfloor$. Proving no larger family exists is the real content, and the symmetric chain decomposition is the clean route — partition all subsets into chains, and an antichain can take at most one member from each.

The LYM inequality is the more flexible form, since it weights subsets by size and so handles families with mixed sizes, which the plain bound does not.

## On contests
Olympiad extremal set theory. Carry two things: the answer $\binom{n}{\lfloor n/2\rfloor}$ and the LYM inequality as the lever.`,

"polya-enumeration": String.raw`## Key forms
- $Z_G=\frac{1}{|G|}\alt{\sum_g\prod_i x_i^{c_i(g)}}{\left(x_1^{c_1(g_1)}x_2^{c_2(g_1)}\cdots+x_1^{c_1(g_2)}x_2^{c_2(g_2)}\cdots+\cdots\right)}$ — the cycle index, recording how each symmetry splits the positions into cycles
- $x_i=k$ — substituting this recovers Burnside's plain count of $k$-colorings
- $x_i=\alt{\sum_j y_j^{\,i}}{y_1^{\,i}+y_2^{\,i}+\cdots+y_m^{\,i}}$ — substituting this instead breaks the count down by how many of each color, which Burnside alone cannot do
- $Z_{C_n}=\frac1n\alt{\sum_{d\mid n}\varphi(d)\,x_d^{\,n/d}}{\left(x_1^{\,n}+\cdots+\varphi(d)\,x_d^{\,n/d}+\cdots+\varphi(n)\,x_n\right)}$ — the cycle index for necklaces

## Why it works
Burnside counts orbits by averaging fixed points; Pólya refines "fixed" into a generating function via each symmetry's cycle structure. A coloring is fixed by $g$ iff it is constant on every cycle of $g$, so weighting by colors gives $\prod_k(\sum \text{colors}^k)^{c_k(g)}$, and averaging over $G$ is the cycle index $Z_G$.

## How to use it
Compute the cycle index $Z_G = \frac{1}{|G|}\sum_g \prod_k t_k^{c_k(g)}$. Substitute $t_k = m$ for a plain count (that's Burnside), or $t_k = x^k + y^k + \cdots$ to get a generating function whose coefficients count colorings with a prescribed number of each color — e.g. bracelets with exactly three red beads.

## On contests
Needed only for "count colorings with a fixed color distribution, up to symmetry" — rare and olympiad-tier. For plain orbit counts, Burnside's Lemma is enough.`,

"probability-generating-functions": String.raw`## Why it works
$G_X(s) = E[s^X] = \sum_k P(X=k)s^k$ stores the whole distribution. Differentiating and evaluating at $s = 1$ pulls down factors of $k$: $G'(1) = E[X]$ and $G''(1) = E[X(X-1)]$, giving the variance. Independence multiplies PGFs since $E[s^{X+Y}] = E[s^X]\,E[s^Y]$.

## How to use it
For a sum of independent nonnegative-integer variables, multiply their PGFs and expand to read the distribution — a single die is $\frac{s + s^2 + \cdots + s^6}{6}$, so $n$ dice is that to the $n$-th power. Get moments from the derivatives at $1$, and recover $P(X=k)$ as the coefficient of $s^k$.

## On contests
An AIME/olympiad convenience for sums of independent counts and for extracting $E[X]$ and $\mathrm{Var}(X)$ together — essentially ordinary [[generating-function-method|generating functions]] in probabilistic dress.`,

"konigs-theorem": String.raw`## Why it works
Any vertex cover must contain an endpoint of every matched edge, so cover $\ge$ matching always. In bipartite graphs, an augmenting-path argument (equivalently max-flow/min-cut on the bipartite network) constructs a cover of exactly the maximum matching's size, giving equality. It is the dual of Hall's theorem.

## How to use it
Use it to convert between two bounds of very different difficulty. Exhibiting a matching of size $k$ bounds the cover from below, and exhibiting a cover of size $k$ bounds the matching from above; when the two agree, both are optimal and you have proved it.

The complementary reading is often what a problem actually wants: the largest independent set is the complement of the smallest vertex cover, so König also computes maximum independent sets in bipartite graphs.

Check bipartiteness first, since the theorem genuinely fails without it, and configurations that look bipartite sometimes contain an odd cycle.

## On contests
Olympiad combinatorics on grids and bipartite structures. The min–max duality is the tool; pair it with Hall's theorem, its existence-flavored twin.`,

"turans-theorem": String.raw`## Why it works
Among $K_{r+1}$-free graphs, rebalancing degrees (Zykov symmetrization) never creates a clique and only adds edges, pushing the maximum to the Turán graph — the complete $r$-partite graph with near-equal parts — which has $(1-\frac1r)\frac{n^2}{2}$ edges.

## How to use it
Recognize the shape as an extremal question: how many edges can a graph have before a clique of a given size is unavoidable. The bound answers it and the Turán graph shows it cannot be improved.

Mantel's case is the one that appears at contest level — at most $\lfloor n^2/4\rfloor$ edges without a triangle, attained by the balanced complete bipartite graph. Proving that case directly is short: for any edge, its endpoints share no neighbor, so their degrees sum to at most $n$.

Use it in the contrapositive when a problem gives you many edges and asks for a clique — exceeding the bound guarantees one exists without having to construct it.

## On contests
Olympiad extremal graph theory, with Mantel occasionally surfacing on harder problems. Remember the extremal example (balanced complete multipartite), not just the number.`,

"graph-coloring": String.raw`## Why it works
Greedy coloring in any order uses $\le \Delta + 1$ colors: each vertex sees at most $\Delta$ colored neighbors, so a color is free. Two colors suffice exactly when the graph is bipartite, which is equivalent to having no odd cycle (a 2-coloring is a bipartition). Planar 4-colorability is the deep Four Color Theorem.

## How to use it
Bound from both sides. The greedy bound caps the chromatic number above, and any clique caps it below, so exhibiting a $k$-clique together with a $k$-coloring settles $\chi=k$ exactly.

The bipartite test is the one used most: two colors suffice precisely when there is no odd cycle, and producing a single odd cycle is usually the fastest way to prove three are needed.

The greedy bound is rarely tight — Brooks' theorem sharpens it to $\Delta$ for every connected graph except complete graphs and odd cycles, which is worth knowing when the bound looks one too large. Pair it with the clique bound $\chi(G)\ge\omega(G)$ from below: exhibiting a $k$-clique alongside a $k$-coloring settles $\chi=k$ exactly.

## On contests
Scheduling, map, and conflict problems on AMC/AIME, plus olympiad [[invariants-coloring|coloring arguments]]. The everyday facts are the greedy $\Delta + 1$ bound and "bipartite ⟺ no odd cycle."`,

"probabilistic-method": String.raw`
## When to use
An olympiad claim that some object exists, such as a coloring with no monochromatic structure, a subset with a property, or a cut with many edges, when building one explicitly is hard but a random object usually works.

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
Counting sequences, colorings of a strip or tilings of a $k \times n$ board where each next choice depends only on the last few, especially when $n$ is large or a general formula is wanted. When a recursion would need several sequences that feed into each other, the matrix keeps them organized.

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

"subset-sum-facts": String.raw`## Why it works
Fix one element $x$. Pairing each subset that contains $x$ with that subset minus $x$ is a bijection, so $x$ sits in exactly half of all subsets — $2^{n-1}$ of them. Weighting each element by how often it appears gives $\sum_{S}\sum_{x\in S} x = 2^{n-1}\sum_x x$. For parity, pick an odd element $t$: toggling $t$ (symmetric difference with $\{t\}$) flips a subset's sum-parity and is a bijection, so even-sum and odd-sum subsets are equinumerous, $2^{n-1}$ each.

## How to use it
Reach for these whenever a problem sums something over all subsets, or splits subsets by the parity of their sum or their size.

For a sum over all subsets, the shortcut is that each element appears in exactly $2^{n-1}$ of them, so the total is $2^{n-1}$ times the sum of the set. Over $\{1,2,3,4\}$ that gives $2^3\cdot10=80$ without listing anything.

The sum-parity split needs one odd element, and the reason is a bijection: toggling that element in or out flips the parity of the sum and pairs the even-sum subsets with the odd-sum ones exactly. With no odd element every subset sum is even and the split fails, which is the case to check before quoting the result.

The size-parity split is different and always holds — it is the [[binomial-theorem|Binomial Theorem]] at $x=1$, $y=-1$.

## On contests
AMC/AIME "sum over all subsets" and "how many subsets have even sum" problems collapse to one line; the same appearance-counting idea — each element or pair is counted a fixed number of times — generalizes to summing any additive statistic over a family.`,

"tail-sum-expectation": String.raw`## Why it works
Write $X$ as a sum of indicators of its own tail: $X = \sum_{k\ge 1} \mathbf{1}[X \ge k]$, since a value of $X = m$ makes exactly the first $m$ indicators equal to $1$. Taking expectations and using linearity, $E[X] = \sum_{k\ge 1} E[\mathbf{1}[X\ge k]] = \sum_{k\ge 1} P(X\ge k)$. Equivalently, it is a swap of summation order: $\sum_k P(X\ge k) = \sum_k \sum_{m\ge k} P(X=m) = \sum_m m\, P(X=m)$. The continuous version replaces the sum by $\int_0^\infty P(X>t)\,dt$ — the "area above the CDF."

## How to use it
Use it whenever $P(X\ge k)$ is easier to describe than $P(X=k)$, which happens far more often than not. Expected maxima are the flagship case: $P(\max\lt k)$ is a product over the independent draws, so the tail is one subtraction, while the exact distribution of the maximum requires a difference of two such products.

The identity itself is a double count — summing $P(X\ge k)$ over $k$ counts each outcome once for every $k$ up to its value, which totals $X$.

Watch the boundary: the sum starts at $k=1$ and uses $\ge$, not $>$. Starting at $k=0$ adds a spurious $1$, which is the usual slip.

## On contests
An AIME expected-value problem where the distribution is messy but "at least $k$" is a one-liner is the signal to switch to the tail sum. It also unifies familiar results: for a geometric wait, $P(X\ge k)=(1-p)^{k-1}$ sums to $\frac1p$; and it is the discrete cousin of the layer-cake / survival-function integral seen in continuous problems.`

});

Object.assign(window.MATH_DETAILS, {

"exponential-generating-functions": String.raw`## Why it works
Weighting the $n$-th term by $\frac{1}{n!}$ makes the product of two EGFs reindex as $c_n=\sum_k\binom{n}{k}a_k b_{n-k}$ — exactly "split the $n$ labels between two labeled structures." So EGF multiplication is the labeled analogue of the choose operation, where ordinary (unlabeled) GFs would undercount.

## How to use it
Use EGFs when the objects are labeled and ordinary [[generating-function-method|generating functions]] fail — that is, whenever the count involves choosing which labels go to which part, since that is exactly what the $\binom nk$ in the product supplies.

The dictionary is short: $e^x$ builds one structure per label, $\frac{1}{1-x}$ as an EGF builds linear orders, and exponentiating an EGF partitions the labels into an unordered collection of that structure. [[derangements|Derangements]], set partitions, and labeled trees all come out of applying that exponential rule.

Extract $a_n$ by reading the coefficient and multiplying back by $n!$ — forgetting that final factorial is the standard slip.

## On contests
Advanced olympiad / Putnam counting; EGFs crack derangements, surjections, and set-partition and permutation-structure counts that ordinary generating functions handle badly.`,

"moser-circle": String.raw`## Why it works
Apply [[eulers-formula|Euler's Formula]] $V-E+F=2$ to the planar graph of points, chord crossings, and arcs: there are $\binom{n}{2}$ chords and $\binom{n}{4}$ interior crossings (one per choice of 4 points, assuming no three chords meet inside), and bookkeeping the edges and faces yields $R(n)=\binom{n}{4}+\binom{n}{2}+1$.

## How to use it
Treat the formula as a warning: five data points agreeing with $2^{n-1}$ prove nothing, and the sequence breaks at exactly the moment most people stop checking.

The derivation is worth knowing because it explains the shape. Each interior crossing comes from choosing four points on the circle, giving $\binom n4$ vertices; each new chord adds one region plus one more for every crossing it makes. Applying Euler's Formula to the resulting planar graph gives the closed form directly.

The no-three-chords-concurrent condition is essential — with a regular polygon, chords do meet three at a time and the count drops, which is a common trap in problem statements.

## On contests
A famous AMC/MATHCOUNTS trap; the "the next term must be $32$" instinct is exactly what the problem punishes, so carry the $\binom{n}{4}+\binom{n}{2}+1$ formula.`,

"gap-method": String.raw`
## When to use
"No two of these are adjacent": people who must not sit next to each other, books of one subject that must be separated, binary strings with no two consecutive $1$s, or choosing $k$ numbers from $1$ to $n$ with no two consecutive.

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


"matrix-tree-theorem": String.raw`## Why it works
Expanding a cofactor of the Laplacian $L=D-A$ by Cauchy–Binet sums with signs over edge subsets, and only the acyclic spanning subsets survive — so the cofactor counts spanning trees. Equivalently it equals $\frac{1}{n}$ times the product of the nonzero Laplacian eigenvalues.

## How to use it
Build $L$ by putting each degree on the diagonal and $-1$ for each edge, delete any one row and the matching column, then take the determinant. Which row you delete does not matter, so pick whichever makes the arithmetic easiest.

The eigenvalue form is faster for highly symmetric graphs whose Laplacian spectrum is known — cycles, complete graphs, and hypercubes all have clean spectra, turning the count into a short product.

Check the result against a known case: applying the theorem to $K_n$ must reproduce $n^{n-2}$, which catches sign and deletion errors quickly.

## On contests
Advanced olympiad / Putnam combinatorics; it converts a daunting spanning-tree enumeration into one determinant, and [[cayleys-formula|Cayley's Formula]] is its headline corollary.`,

"lgv-lemma": String.raw`## Why it works
In a directed acyclic graph, swapping the tails of any two crossing paths pairs up all intersecting path systems with opposite signs in the determinant expansion, so they cancel — leaving only the non-intersecting families, whose signed count is $\det[M_{ij}]$ with $M_{ij}$ the single-path counts.

## How to use it
Set up the sources and sinks so the only non-crossing pairing is $a_i\to b_i$; then every off-diagonal permutation cancels and the determinant counts exactly what you want.

The cancellation is the mechanism worth understanding: given two crossing paths, swapping their tails at the first crossing produces another system with the opposite sign, so those terms annihilate and only the non-intersecting families survive.

The standard applications are families of lattice paths forbidden to touch, and the determinant formulas for plane partitions and tilings — the word "non-intersecting" in a problem statement is the cue.

## On contests
Olympiad / Putnam level; recognizing "non-intersecting lattice paths" as a determinant is the key move behind many exact product-formula counts.`,

"squared-binomial-sum": String.raw`## Key forms
- $\alt{\sum_{k=0}^{n}\binom nk^2}{\binom n0^2+\binom n1^2+\cdots+\binom nn^2}=\binom{2n}{n}$ — the squares of one row of Pascal's triangle
- $\binom{2n}{n}/4^n$ — the chance two people flipping $n$ coins each tie

## Why it works
Count the ways to choose $n$ things from $2n$, having split the $2n$ into two halves of size $n$. Any such choice takes some number $k$ from the first half and the remaining $n-k$ from the second, so the choices with a given $k$ number $\binom nk\binom n{n-k}$. Since $\binom n{n-k}=\binom nk$, that is $\binom nk^2$, and summing over $k$ counts every choice exactly once. The total is $\binom{2n}{n}$.

It is Vandermonde's Identity with $m=r=n$, but the special case behaves differently from the general one: the answer collapses to a single binomial coefficient instead of staying a convolution, which is what makes it usable in the middle of a computation.

## How to use it
Recognize it whenever squares of binomial coefficients are being summed, and replace the whole sum with one coefficient. The reverse direction matters just as much: a lone $\binom{2n}{n}$ can be opened up into $\sum_k\binom nk^2$ when you need a sum to compare against another sum.

The probability reading is the one worth carrying. Two people each flip $n$ fair coins; the chance they get the same number of heads is $\sum_k\binom nk^2/4^n$, which the identity turns into $\binom{2n}{n}/4^n$. Everything else follows by symmetry — the two of them are equally likely to be ahead, so each wins with probability $\tfrac12\left(1-\binom{2n}{n}/4^n\right)$.

## On contests
AIME uses it to close a sum that would otherwise need generating functions, and AMC uses the coin version. The signed companion, [[alternating-squared-binomials|the alternating sum of squared binomials]], comes from the same $(1-x)^m(1+x)^m$ expansion and is worth learning alongside it.`,

"alternating-squared-binomials": String.raw`## Why it works
Compare the coefficient of $x^m$ on both sides of $(1-x)^m(1+x)^m = (1-x^2)^m$.

On the left, expand each factor: $(1-x)^m = \sum_j (-1)^j\binom{m}{j}x^j$ and $(1+x)^m = \sum_i \binom{m}{i}x^i$. Collecting $x^m$ needs $i + j = m$, so the coefficient is $\sum_j (-1)^j \binom{m}{j}\binom{m}{m-j}$, and $\binom{m}{m-j} = \binom{m}{j}$ turns it into $\sum_j (-1)^j\binom{m}{j}^2$ — exactly the sum in question.

On the right, $(1-x^2)^m = \sum_t (-1)^t\binom{m}{t}x^{2t}$ contains only even powers. If $m = 2n$ is even, the term $x^m$ arises from $t = n$, contributing $(-1)^n\binom{2n}{n}$. If $m$ is odd there is no $t$ with $2t = m$, so the coefficient is $0$ and the whole alternating sum vanishes.

The unsigned identity $\sum_k\binom{n}{k}^2 = \binom{2n}{n}$ comes from the same comparison without the sign, using $(1+x)^n(1+x)^n = (1+x)^{2n}$, which is why the two are companions.

## How to use it
Spot the shape first: a sum of squared binomials with alternating signs is one coefficient of $(1-x^2)^m$, so read off the parity of the upper index before computing anything. Odd upper index means the answer is $0$ with no work at all — a common trap, since the sum looks like it should be messy.

More generally, whenever a binomial sum has the form $\sum_k (-1)^k \binom{m}{k}\binom{m}{r-k}$, it is the coefficient of $x^r$ in $(1-x^2)^m$: zero when $r$ is odd, and $(-1)^{r/2}\binom{m}{r/2}$ when $r$ is even. The squared case is $r = m$.

## On contests
An AIME-level identity that shows up when a problem manufactures $\sum(-1)^k\binom{2n}{k}^2$ out of a counting argument or a product of two [[generating-function-method|generating functions]]. The takeaway worth carrying is the technique rather than the closed form: multiply the two expansions whose product simplifies, then compare a single coefficient.`,

"markovs-inequality": String.raw`## Why it works
Split the expectation at the threshold. Because $X \ge 0$, throwing away the part below $a$ only decreases the average:
$E[X] \ge E\left[X \cdot \mathbf{1}_{X \ge a}\right] \ge a \cdot P(X \ge a)$,
where the second step replaces $X$ by $a$ on the event $X \ge a$, which is legitimate since $X \ge a$ there. Dividing by $a$ gives the inequality. Nonnegativity is essential: without it the discarded part could be very negative and the first step fails.

Chebyshev is a corollary rather than a separate idea. Apply Markov to the nonnegative variable $Y = (X-\mu)^2$ with threshold $k^2\sigma^2$: since $E[Y] = \sigma^2$, we get $P\!\left((X-\mu)^2 \ge k^2\sigma^2\right) \le \frac{\sigma^2}{k^2\sigma^2} = \frac{1}{k^2}$, and the event inside is exactly $|X-\mu| \ge k\sigma$.

## How to use it
Use it whenever you need to show something cannot happen too often, or that a good case must exist. Two directions:

- Bounding a tail. If the average score is $60$, at most a quarter of the students can have scored $240$ or more, whatever the distribution.
- Proving existence. If $E[X] \lt 1$ for a nonnegative integer count $X$, then $P(X = 0) \gt 0$, so some outcome has no bad events at all — the first-moment method behind many probabilistic-method arguments.

The bound is deliberately crude, using only the mean, so it is the right tool when you know almost nothing about the distribution and the wrong one when you need a sharp estimate. Its existence form is what [[probabilistic-method|the probabilistic method]] uses: if $E[X] \lt a$ then $P(X \lt a) \gt 0$, so some outcome beats the average.

## On contests
Rare on AMC and AIME as a named result, but the reasoning appears constantly in disguise: "the average is $m$, so some term is at least $m$" is the one-line version, and its contrapositive settles many "show some configuration exists" olympiad problems. Pair it with [[indicator-variables|linearity of expectation]], which computes the mean, and Markov converts that mean into a guarantee.`,

"casework-method": String.raw`
## When to use
When one feature controls everything else: the largest element of a set, the first digit, how many times a value appears, where a special person sits, or the outcome of the first move. Probability problems use the same split, weighting each case by its probability.

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
Grid paths that must stay on one side of a diagonal, vote counts in which one candidate is never behind, ticket queues in which change never runs out, and random walks that must not reach zero. The signal is a restriction on a path phrased with "never": never above, never trailing, never negative.

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
Unordered groups from ordered lists, seatings around a round table, words with repeated letters, handshakes counted from both people's sides, necklaces: wherever the easy count lists each object several times.

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
Whenever a condition says one number may not divide another, or forbids ratios that are powers of $2$. The same table with powers of $3$ in place of powers of $2$ handles ratios that are powers of $3$.

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
The condition is about pairs of chosen elements: no two sum to a target, differ by a fixed amount, are consecutive, or divide one another. The question asks either for the largest such subset or for how many there are. A condition on a single element, such as being odd, is ordinary counting; a condition on triples, such as no three in arithmetic progression, is much harder and needs other ideas.

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
});
