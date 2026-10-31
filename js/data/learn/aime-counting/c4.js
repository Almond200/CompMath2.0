// Learn, AIME Counting & Probability, chapter C4: bijections, symmetry and double counting (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C4"] = {
  lessons: {
    "C4.1": {
      prereq: ["permutations-combinations"],
      cards: [],
      body: String.raw`This chapter counts without building objects one decision at a time. Its tools are the bijection, double counting, symmetry, and the identities of binomial coefficients, which are what the first three give when they are applied to choosing subsets.

A bijection is a matching between two sets that pairs every element of one with exactly one element of the other. If the objects to be counted can be matched with objects that are easier to count, the two counts are equal. The subsets of $\{1, \ldots, 10\}$ of even size can be matched with those of odd size by putting the number $1$ in if it is out and taking it out if it is in. The rule changes the size by one and undoes itself, so the two kinds are equally many, $\tfrac{2^{10}}{2} = 512$ each.

Double counting counts one set in two ways and sets the counts equal. The set is often a set of pairs, such as a person together with a committee the person sits on: counted by people it is the sum of the numbers of committees each person is on, and counted by committees it is the sum of the committee sizes.

Symmetry says that outcomes related by a swap or a rotation are equally likely or equally many, so a count or a probability can be divided among them without computing any of them. When two fair dice are rolled, the first shows more than the second exactly as often as the second shows more than the first, so each happens with probability $\tfrac12\left(1 - \tfrac{6}{36}\right) = \tfrac{5}{12}$. The danger is a symmetry that is not really there, or one that fixes some objects, which is where the division becomes uneven.

The binomial coefficients satisfy many identities, and each can be proved by counting one set in two ways or by a bijection. They turn sums of binomial coefficients, which appear constantly in answers, into a single coefficient.

The lessons take these ideas in turn: designing bijections (C4.2), double counting (C4.3), using symmetry safely (C4.4), and binomial identities (C4.5). The Summary (C4.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Every member of a club of $10$ people serves on exactly $3$ committees, and every committee has exactly $5$ members. How many committees are there?`, answer: "6",
          solution: String.raw`Count the pairs (person, committee the person serves on) in two ways. By people there are $10 \cdot 3 = 30$ pairs. By committees there are $5c$, where $c$ is the number of committees. So $5c = 30$ and $c = 6$.` },
        { q: String.raw`Two fair six-sided dice are rolled, one red and one blue. What is the probability that the red die shows a greater number than the blue die?`, answer: "5/12",
          solution: String.raw`The dice show equal numbers with probability $\tfrac{6}{36} = \tfrac16$. Swapping the colors of the dice matches each outcome with red greater to one with blue greater, so these two events are equally likely, and each has probability $\tfrac12 \cdot \tfrac56 = \tfrac{5}{12}$.` },
        { q: String.raw`Find $\binom33 + \binom43 + \binom53 + \binom63 + \binom73$.`, answer: "70",
          solution: String.raw`Count the $4$-element subsets of $\{1, \ldots, 8\}$ by their largest element $m$. The other three elements are chosen from the $m - 1$ smaller numbers, in $\binom{m - 1}{3}$ ways, and $m$ runs from $4$ to $8$. So the sum counts all $4$-element subsets of an $8$-element set, $\binom84 = 70$. Directly: $1 + 4 + 10 + 20 + 35 = 70$.` }
      ],
      problems: [
        "2019 AMC 12B, Problem 13",
        "2022 AMC 12A, Problem 19",
        "2010 AIME II, Problem 8"
      ]
    },
    "C4.2": {
      prereq: ["permutations-combinations", "grid-paths"],
      cards: ["bijection-method", "catalan-numbers", "ballot-problem", "reflection-principle"],
      body: String.raw`Some sets are hard to count directly but match, one for one, a set that is easy to count. Numbers with strictly increasing digits match subsets of the digits; convex polygons with vertices among points on a circle match subsets of the points; lattice paths that stay below a diagonal match balanced strings of parentheses. Finding such a matching, a bijection, is often the whole solution, and a few named bijections cover a large share of contest problems.

A [[bijection-method|bijection]] between two sets proves they have the same size. To use one, describe a rule that turns each object into an object of the other kind, and check that the rule can be undone: every object of the second kind comes from exactly one of the first. A number with strictly increasing digits is determined by its set of digits, since the digits can only be written in one increasing order, so such numbers match nonempty subsets of $\{1, \ldots, 9\}$ (with one or more digits as required). A sequence that decreases and then increases with its minimum at a given place is determined by which values go on the left. The skill is to see which information determines the object and to count that information.

The [[catalan-numbers|Catalan numbers]] $C_n = \tfrac{1}{n + 1}\binom{2n}{n}$, which are $1, 1, 2, 5, 14, 42, 132, \ldots$, count a family of objects that all match each other: lattice paths from $(0, 0)$ to $(n, n)$ with right and up steps that never go above the diagonal, balanced strings of $n$ pairs of parentheses, ways to triangulate a convex polygon with $n + 2$ sides, and many more. Paths to $(4, 4)$ that stay on or below the diagonal number $C_4 = 14$. When a problem's answer for small cases begins $1, 2, 5, 14$, the Catalan numbers are the first suspect.

The formula comes from the [[reflection-principle|reflection principle]]. A path from $(0, 0)$ to $(n, n)$ that does go above the diagonal touches the line $y = x + 1$; reflecting the part of the path before (or after) the first touch across that line gives a path to a different endpoint, and the reflection is a bijection. So the bad paths number $\binom{2n}{n + 1}$, and the good ones $\binom{2n}{n} - \binom{2n}{n + 1} = C_n$. The same trick counts walks that reach a given level: walks that reach level $4$ and end below it match walks that end above it. The [[ballot-problem|ballot problem]] is a version for unequal totals: if candidate A receives $a$ votes and B receives $b \lt a$, the probability that A is strictly ahead throughout the count is $\tfrac{a - b}{a + b}$. With $5$ votes to $3$ that is $\tfrac{2}{8} = \tfrac14$.

Look for a bijection whenever the objects are determined by a smaller piece of information, or whenever small cases match a known sequence; use reflection whenever paths must avoid a line. The next lesson counts one set in two different ways.`,
      related: [
        { card: "grid-paths", note: String.raw`the unrestricted lattice paths that reflection subtracts from (C5.6).` },
        { card: "binomial-row-sums", note: String.raw`subsets of an $n$-element set number $2^n$, the usual target of a bijection (C4.5).` },
        { card: "recursive-counting", note: String.raw`the Catalan recursion $C_{n+1} = \sum C_kC_{n-k}$ from the first return to the diagonal (C5.2).` }
      ],
      exercises: [
        { q: String.raw`How many lattice paths from $(0, 0)$ to $(4, 4)$, using unit steps right and up, never go above the line $y = x$?`, answer: "14",
          solution: String.raw`All paths number $\binom84 = 70$. A path that goes above the line touches $y = x + 1$; reflecting its part before the first touch across that line gives a path from $(-1, 1)$ to $(4, 4)$, and every such path arises once, so there are $\binom{8}{5} = 56$ bad paths. The good ones number $70 - 56 = 14$, the Catalan number $C_4$.` },
        { q: String.raw`In an election A receives $5$ votes and B receives $3$, counted in a random order. What is the probability that A is strictly ahead throughout the count?`, answer: "1/4",
          solution: String.raw`By the ballot theorem the probability is $\tfrac{a - b}{a + b} = \tfrac{5 - 3}{5 + 3} = \tfrac14$. (Of the $\binom83 = 56$ orders, $14$ keep A ahead.)` }
      ],
      problems: [
        "2012 AMC 12B, Problem 18",
        "2016 AMC 12A, Problem 19",
        "1992 AIME, Problem 2",
        "1989 AIME, Problem 2",
        "2006 AIME II, Problem 4",
        "1986 AIME, Problem 7",
        "2020 AIME I, Problem 7",
        "1993 AIME, Problem 7",
        "2026 AIME II, Problem 2"
      ]
    },
    "C4.3": {
      prereq: ["counting-functions"],
      cards: ["double-counting", "committee-chair", "nested-subset-pairs"],
      body: String.raw`Counting the same collection in two different ways gives two expressions that must be equal. That simple principle proves identities, finds unknown totals, and turns hopeless sums into easy products. How many intersection points do forty lines make, given how many points have three, four or five lines through them? What is the sum of $k\binom nk$? How many pairs of sets $A \subseteq B$ are there? Each is a double count: of pairs of lines, of committees with a chair, of the elements and the regions they fall in.

[[double-counting|Double counting]] chooses a set of pairs (an object and something attached to it) and counts it once from each side. Forty lines, no two parallel, make $\binom{40}{2} = 780$ pairs of lines, and each intersection point where $m$ lines meet accounts for $\binom m2$ of those pairs; so $\sum \binom{m}{2}$ over the points is $780$, an equation that fixes the number of points where exactly two lines meet. If each of five segments joins two letters and every letter is an end of two segments, the five segment sums together count each letter's value twice. If $T$ teams each belong to some number of $9$-player groups, counting (team, group) pairs both ways gives an equation in $T$ and the number of players. The design choice is the set of pairs: it should be easy to count from both sides.

The [[committee-chair|committee-chair identity]] $k\binom nk = n\binom{n - 1}{k - 1}$ is the cleanest example: choose a committee of $k$ from $n$ people and then its chair, or choose the chair first and then the other $k - 1$ members. Summing over $k$ gives $\sum_k k\binom{n}{k} = n2^{n-1}$, so $\sum_{k} k\binom{10}{k} = 10 \cdot 2^9 = 5120$. A sum of the form "over all subsets, the size" or "over all subsets, the largest element" is always worth re-reading as a count of pairs.

Pairs of sets are counted element by element, which is a double count of the elements and their positions in the Venn diagram. For [[nested-subset-pairs|nested subset pairs]] $A \subseteq B \subseteq \{1, \ldots, n\}$, each element is in $A$, in $B$ but not $A$, or in neither: three choices each, so $3^n$ pairs, and $3^5 = 243$ for $n = 5$. The same view handles sums over pairs: the sum of $|A \cap B|$ over all pairs of subsets with $|A| = |B|$ is the sum, over elements, of the number of pairs that contain that element in both.

When a problem asks for a total that looks like a sum over many objects, ask what pairs that total counts, and count those pairs from the other side. The next lesson uses symmetry to get counts and probabilities without counting.`,
      related: [
        { card: "handshake-lemma", note: String.raw`the degrees of a graph add to twice the number of edges, a double count of edge ends (C8.2).` },
        { card: "subset-sum-facts", note: String.raw`each element lies in half of all subsets, the element-by-element count (C3.4).` },
        { card: "vandermonde", note: String.raw`a committee from two groups counted by how many come from each (C4.5).` }
      ],
      exercises: [
        { q: String.raw`How many ordered pairs of sets $(A, B)$ satisfy $A \subseteq B \subseteq \{1, 2, 3, 4, 5\}$?`, answer: "243",
          solution: String.raw`Each element independently lies in $A$ (and so in $B$), in $B$ only, or in neither. That is $3$ choices for each of $5$ elements, $3^5 = 243$ pairs.` },
        { q: String.raw`Find $\displaystyle\sum_{k=0}^{10} k\binom{10}{k}$.`, answer: "5120",
          solution: String.raw`The sum counts committees of any size from $10$ people with a chair chosen from the committee. Choosing the chair first ($10$ ways) and then any subset of the other $9$ ($2^9$ ways) gives $10 \cdot 512 = 5120$.` }
      ],
      problems: [
        "2005 AMC 12A, Problem 13",
        "2017 AMC 12B, Problem 25",
        "2003 AIME I, Problem 3",
        "2023 AIME I, Problem 3",
        "2016 AIME II, Problem 4",
        "1988 AIME, Problem 15",
        "2009 AIME II, Problem 12",
        "2022 AIME I, Problem 12"
      ]
    },
    "C4.4": {
      prereq: ["uniform-overcount", "basic-probability"],
      cards: ["symmetry-probability", "burnsides-lemma"],
      body: String.raw`Symmetry is the fastest tool in counting and probability, and the most dangerous. It says that the chance that the first card drawn is higher than the second is $\tfrac12$ when ties are impossible; that in a random order of six numbers, $1$, $2$, $3$ appear in increasing order with probability $\tfrac16$; that colorings of a cube can be counted up to rotation by averaging. Each claim is quick once the symmetry is identified, and wrong whenever the supposed symmetry is not really there.

A [[symmetry-probability|symmetry argument]] shows that several outcomes are equally likely by exhibiting a transformation that maps one onto another and preserves probabilities. In a random permutation, any relabeling of positions is such a map, so the $3! = 6$ relative orders of $1$, $2$, $3$ are equally likely, and the increasing one has probability $\tfrac16$. The order of drawing does not matter: the second person to draw from an urn has the same chance as the first of drawing a given color. When a comparison between two quantities is symmetric, $P(X \gt Y) = P(Y \gt X)$, so each is $\tfrac12(1 - P(X = Y))$; the only work left is the probability of a tie. Imagining a process run to completion, such as drawing all the chips in a random order even though the game stops early, often exposes a symmetry that the stopped process hides.

Every such argument must check that the transformation really preserves the probabilities. Swapping two players is a symmetry only if they play by the same rules; reversing a sequence is a symmetry only if the process treats both ends alike. When a condition is not symmetric, split it into a symmetric part and a correction.

For counting up to symmetry, [[burnsides-lemma|Burnside's lemma]] gives the number of essentially different objects as the average, over the symmetries, of the number of objects each symmetry fixes. The four rotations of a square act on $3$-colorings of its vertices: the identity fixes all $81$, the quarter turns fix the $3$ constant colorings each, and the half turn fixes the $9$ colorings with opposite vertices equal, so there are $\tfrac{81 + 3 + 3 + 9}{4} = 24$ colorings up to rotation. For a cube, the $24$ rotations fall into five types (the identity, face turns by $90^\circ$ and $180^\circ$, vertex turns by $120^\circ$, and edge turns by $180^\circ$), and each type fixes the colorings that are constant on its cycles. When all the colors are different, no symmetry but the identity fixes anything, and the lemma reduces to dividing by the number of symmetries.

Use symmetry to replace a count by a fraction, and Burnside whenever objects related by a rotation or reflection are to be counted once. The next lesson collects the identities of binomial coefficients.`,
      related: [
        { card: "necklace-formula", note: String.raw`Burnside for the rotations of a circle (C2.3).` },
        { card: "wlog-symmetry", note: String.raw`assuming an order because the problem is symmetric (A8.1).` },
        { card: "permutation-cycle-structure", note: String.raw`the cycles of a symmetry, which decide what it fixes (C9.2).` }
      ],
      exercises: [
        { q: String.raw`The vertices of a square are colored with $3$ colors. How many colorings are there if colorings that differ by a rotation are the same?`, answer: "24",
          solution: String.raw`By Burnside's lemma, average the fixed colorings over the four rotations: the identity fixes $3^4 = 81$, each quarter turn fixes the $3$ constant colorings, and the half turn fixes $3^2 = 9$. The count is $\tfrac{81 + 3 + 9 + 3}{4} = 24$.` },
        { q: String.raw`The numbers $1$ to $6$ are put in a random order. What is the probability that $1$, $2$, $3$ appear in that order (not necessarily next to each other)?`, answer: "1/6",
          solution: String.raw`By symmetry the $3! = 6$ relative orders of $1$, $2$, $3$ are equally likely (permuting these labels maps orders to orders one for one), so the probability of the increasing one is $\tfrac16$.` }
      ],
      problems: [
        "2015 AMC 12A, Problem 9",
        "2001 AMC 12, Problem 11",
        "2008 AMC 12A, Problem 21",
        "2023 AMC 12A, Problem 21",
        "2007 AMC 12B, Problem 16",
        "2000 AMC 12, Problem 25",
        "2021 Fall AMC 12B, Problem 20",
        "2023 AIME I, Problem 1",
        "1996 AIME, Problem 7",
        "2006 AIME II, Problem 8",
        "2013 AIME I, Problem 4"
      ]
    },
    "C4.5": {
      prereq: ["permutations-combinations"],
      cards: ["pascals-identity", "binomial-row-sums", "hockey-stick", "vandermonde", "squared-binomial-sum", "multinomial-theorem", "binomial-theorem"],
      body: String.raw`Binomial coefficients satisfy many identities, and contest problems use a handful of them constantly: to sum a diagonal of Pascal's triangle, to add the squares of a row, to expand a power of a sum, or to read off a coefficient. Each identity has a counting proof, and the counting proof is the best way to remember it and to recognize when a sum is one in disguise.

The [[binomial-theorem|binomial theorem]] $(x + y)^n = \sum_k \binom nk x^{n-k}y^k$ says that the coefficient of $x^{n-k}y^k$ counts the ways to pick $y$ from $k$ of the $n$ factors. The [[multinomial-theorem|multinomial theorem]] extends it: in $(x + y + z)^n$ the coefficient of $x^ay^bz^c$ with $a + b + c = n$ is $\tfrac{n!}{a!\,b!\,c!}$, so the coefficient of $x^2y^3z$ in $(x + y + z)^6$ is $\tfrac{720}{2 \cdot 6 \cdot 1} = 60$. Setting the variables to well-chosen numbers gives sums of coefficients, and writing a base as a number near a convenient value, such as $6 = 7 - 1$ and $8 = 7 + 1$ modulo $49$, kills most terms of an expansion.

[[pascals-identity|Pascal's identity]] $\binom nk = \binom{n-1}{k-1} + \binom{n-1}k$ splits on whether a particular element is chosen, and the symmetry $\binom nk = \binom n{n-k}$ swaps chosen and unchosen. The ratio of neighbors in a row, $\binom{n}{k+1} / \binom nk = \tfrac{n - k}{k + 1}$, locates three consecutive entries in a given ratio without computing any factorial. The [[binomial-row-sums|row sums]] are $\sum_k\binom nk = 2^n$ (all subsets) and $\sum_k(-1)^k\binom nk = 0$ (pair subsets by toggling one element), so the even and odd entries of a row each add to $2^{n-1}$.

The [[hockey-stick|hockey stick identity]] $\sum_{k=r}^{n}\binom kr = \binom{n + 1}{r + 1}$ sums a diagonal: choose $r + 1$ numbers from $1$ to $n + 1$, and sort by the largest, which is $k + 1$. So $\binom33 + \binom43 + \cdots + \binom{10}3 = \binom{11}4 = 330$. Products of consecutive integers are binomial coefficients times factorials, $(i - 2)(i - 1)i(i + 1) = 4!\binom{i + 1}{4}$, so sums of such products are hockey sticks. [[vandermonde|Vandermonde's identity]] $\sum_k\binom mk\binom n{r - k} = \binom{m + n}r$ chooses $r$ people from two groups by how many come from the first. Its special case, the [[squared-binomial-sum|sum of squared binomial coefficients]], is $\sum_k\binom nk^2 = \sum_k\binom nk\binom n{n-k} = \binom{2n}n$, so $\sum_k\binom5k^2 = \binom{10}5 = 252$. Sums like $\sum\binom6a\binom6b$ over $a + b = k$ collapse the same way.

When a sum of binomial coefficients appears, ask what it counts: a diagonal is a hockey stick, a product of two coefficients with a fixed total is Vandermonde, and a weighted sum is a committee with a chair. The Summary (C4.6) collects the chapter's strategies, and the problems after it mix these identities with bijections, double counting and symmetry.`,
      related: [
        { card: "committee-chair", note: String.raw`the identity $k\binom nk = n\binom{n-1}{k-1}$ for weighted row sums (C4.3).` },
        { card: "roots-of-unity-filter", note: String.raw`sums of every third or fourth entry of a row (A6.3).` },
        { card: "lucas-theorem", note: String.raw`binomial coefficients modulo a prime (N8.1).` }
      ],
      exercises: [
        { q: String.raw`Find $\binom33 + \binom43 + \binom53 + \cdots + \binom{10}3$.`, answer: "330",
          solution: String.raw`By the hockey stick identity the sum is $\binom{11}{4} = 330$: a $4$-element subset of $\{1, \ldots, 11\}$ with largest element $k + 1$ is a choice of $3$ elements from the $k$ below it.` },
        { q: String.raw`Find $\binom50^2 + \binom51^2 + \cdots + \binom55^2$.`, answer: "252",
          solution: String.raw`$\sum_k\binom5k^2 = \sum_k\binom5k\binom5{5-k} = \binom{10}5 = 252$ by Vandermonde: choosing $5$ of $10$ people split into two groups of $5$, by how many come from the first. Directly: $1 + 25 + 100 + 100 + 25 + 1 = 252$.` },
        { q: String.raw`Find the coefficient of $x^2y^3z$ in the expansion of $(x + y + z)^6$.`, answer: "60",
          solution: String.raw`By the multinomial theorem it is $\tfrac{6!}{2!\,3!\,1!} = \tfrac{720}{12} = 60$, the number of ways to choose which $2$ of the $6$ factors give $x$ and which $3$ give $y$.` }
      ],
      problems: [
        "2017 AMC 12B, Problem 11",
        "2021 Spring AMC 12A, Problem 15",
        "2003 AMC 12A, Problem 22",
        "2014 AMC 12B, Problem 23",
        "1983 AIME, Problem 6",
        "1988 AIME, Problem 1",
        "1992 AIME, Problem 4",
        "2000 AIME II, Problem 7",
        "1996 AIME, Problem 3",
        "2000 AIME I, Problem 3",
        "1983 AIME, Problem 13",
        "2017 AIME I, Problem 7",
        "2022 AIME II, Problem 10",
        "2025 AIME I, Problem 3"
      ]
    },
    "C4.6": {
      prereq: ["bijection-method", "catalan-numbers", "reflection-principle", "double-counting", "committee-chair", "symmetry-probability", "burnsides-lemma", "hockey-stick", "vandermonde"],
      cards: [],
      body: String.raw`[[bijection-method|A bijection]] matches the objects to be counted with objects that are easier to count, and it is correct when the matching has an inverse. The [[catalan-numbers|Catalan numbers]] count the most common family it reaches: balanced sequences, paths that stay on one side of a line, bracketings and triangulations. [[reflection-principle|Reflecting]] the part of a path up to its first bad step matches the bad paths with all paths to a reflected endpoint, so the good paths are counted by one subtraction.

[[double-counting|Double counting]] counts one set two ways, often a set of pairs, and sets the counts equal; [[committee-chair|choosing a committee and its chair]] in two orders is the model, and gives identities such as $k\binom nk = n\binom{n - 1}{k - 1}$.

[[symmetry-probability|Symmetry]] divides a count or a probability equally among outcomes that a swap or a rotation permutes. It is safe only when the swap really maps the outcomes of one kind onto those of the other. When a symmetry fixes some objects, [[burnsides-lemma|Burnside's lemma]] counts the objects up to symmetry as the average number fixed by each symmetry.

The binomial identities collect sums of coefficients: [[hockey-stick|the hockey stick]] sums a column of Pascal's triangle, and [[vandermonde|Vandermonde's identity]] sums the products that choose from two groups. Each is a statement of double counting, and the counting proof is usually the fastest way to recall it.`,
      strategies: [
        String.raw`If a count looks hard, ask what simpler objects it could be matched with, and check the matching by describing its inverse.`,
        String.raw`For paths, sequences and bracketings that must stay on one side of a line, suspect the Catalan numbers, and check the first few values against $1, 1, 2, 5, 14, 42$.`,
        String.raw`To count paths that cross a line, reflect them at their first crossing.`,
        String.raw`When a total is a sum over people of their memberships, count the pairs from the other side instead.`,
        String.raw`For a probability that compares two things, look for a swap that exchanges them; the leftover equal case is often the only thing to compute.`,
        String.raw`Before dividing by a symmetry, check that no object is fixed by it; if some are, use Burnside's lemma.`,
        String.raw`To evaluate a sum of binomial coefficients, find one set that it counts by cases, and count that set at once.`,
        String.raw`A sum such as $\sum k\binom nk$ is a committee with a chair: choose the chair first.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many sequences of five $+1$s and five $-1$s have every partial sum, from the left, at least $0$?`, answer: "42",
        solution: String.raw`These are the balanced sequences counted by the Catalan number $C_5 = \tfrac{1}{6}\binom{10}{5} = \tfrac{252}{6} = 42$. By reflection: of the $\binom{10}{5} = 252$ sequences, the bad ones first reach $-1$ somewhere; flipping every sign up to that point matches them with the sequences of six $-1$s and four $+1$s, $\binom{10}{4} = 210$ of them, so $252 - 210 = 42$.` },
      { q: String.raw`A path from $(0, 0)$ to $(6, 4)$ takes unit steps right or up. How many such paths never pass above the line $y = x$?`, answer: "90",
        solution: String.raw`There are $\binom{10}{4} = 210$ paths. A bad path touches the line $y = x + 1$; reflecting its part up to the first touch in that line matches it with a path from $(-1, 1)$ to $(6, 4)$, which takes $7$ steps right and $3$ up: $\binom{10}{3} = 120$ paths. So $210 - 120 = 90$ paths stay on or below the line.` },
      { q: String.raw`Find the sum of the sizes of all $1024$ subsets of $\{1, 2, \ldots, 10\}$.`, answer: "5120",
        solution: String.raw`Count the pairs (subset, element in it) by elements instead. Each of the $10$ elements is in half of the subsets, $2^9 = 512$ of them, so the total is $10 \cdot 512 = 5120$.` },
      { q: String.raw`Five people, among them Ann, Bo and Cy, line up in a random order. What is the probability that Ann is ahead of Bo and Bo is ahead of Cy?`, answer: "1/6",
        solution: String.raw`Whatever places the three of them occupy, the $3! = 6$ orders of Ann, Bo and Cy in those places are equally likely, since permuting their names maps the line-ups of one order onto those of another. Exactly one of the six orders is Ann, Bo, Cy, so the probability is $\tfrac16$.` },
      { q: String.raw`The four corners of a square are each colored with one of $3$ colors. How many colorings are different, if colorings that differ by a rotation of the square are the same?`, answer: "24",
        solution: String.raw`Use Burnside's lemma over the four rotations. The identity fixes all $3^4 = 81$ colorings. The quarter turns, either way, fix only the $3$ one-color colorings. The half turn fixes colorings with opposite corners equal, $3^2 = 9$. The average is $\tfrac{81 + 3 + 9 + 3}{4} = 24$.` },
      { q: String.raw`Find $\sum_{k=0}^{5} \binom5k\binom7k$.`, answer: "792",
        solution: String.raw`Write $\binom7k = \binom{7}{7 - k}$. Then $\binom5k\binom{7}{7-k}$ counts the ways to choose $k$ people from a group of $5$ and $7 - k$ from a group of $7$, a committee of $7$ from all $12$ people, sorted by how many come from the first group. So the sum is $\binom{12}{7} = 792$.` }
    ],
    problems: [
      "2006 AMC 12A, Problem 23",
      "2003 AIME I, Problem 13"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12A, Problem 17",
      "2025 AMC 12A, Problem 23",
      "2015 AIME I, Problem 12",
      "2024 AIME II, Problem 9"
    ]
  }
};
