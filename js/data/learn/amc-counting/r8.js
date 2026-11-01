// Learn, AMC Counting & Probability, chapter R8: advanced counting (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R8"] = {
  lessons: {
    "R8.1": {
      prereq: ["stars-and-bars", "inclusion-exclusion", "binomial-theorem", "backward-induction"],
      cards: [],
      body: String.raw`The harder AMC problems build on the counting of the earlier chapters in four directions: shares with a maximum as well as a minimum, objects counted as the same when a rotation turns one into another, sums of products of binomial coefficients, and games and colorings that need more than a table of wins and losses.

Sharing $10$ among $x$, $y$, $z$ with each at most $4$ is stars and bars with a correction: of the $\binom{12}{2} = 66$ ways with no maximum, $3 \cdot \binom72 = 63$ give some share at least $5$, and $3 \cdot \binom22 = 3$ give two shares at least $5$, so inclusion-exclusion leaves $66 - 63 + 3 = 6$. Coloring the corners of a square black or white gives $16$ colorings, but if turning the square does not count as a change, there are only $6$: all white, all black, one black, two black side by side, two black opposite, three black. And choosing $3$ people from $5$ men and $5$ women, split by the number of men, gives $\sum_k \binom5k \binom5{3-k} = \binom{10}{3} = 120$, since every choice of $3$ from the $10$ appears once.

The lessons take these ideas in turn: upper bounds and counting up to symmetry (R8.2), more binomial identities (R8.3), and graph coloring and games (R8.4). The Summary (R8.5) collects the strategies.`,
      exercises: [
        { q: String.raw`How many ordered triples of nonnegative integers $(x, y, z)$ with $x + y + z = 10$ have each of $x$, $y$, $z$ at most $4$?`, answer: "6",
          solution: String.raw`Without the maximum there are $\binom{12}{2} = 66$. A share of at least $5$: set it to $5 + x'$, leaving $5$ to share, $\binom72 = 21$ ways, for each of $3$ shares. Two shares of at least $5$ use all $10$: $1$ way for each of $3$ pairs. By inclusion-exclusion, $66 - 63 + 3 = 6$.` },
        { q: String.raw`The four corners of a square are each colored black or white. Two colorings count as the same if a rotation of the square turns one into the other. How many different colorings are there?`, answer: "6",
          solution: String.raw`Sort by the number of black corners: $0$ (one coloring), $1$ (one, as all positions are rotations of each other), $2$ (adjacent or opposite: two), $3$ (one), $4$ (one). In all $6$.` },
        { q: String.raw`What is $\binom50\binom53 + \binom51\binom52 + \binom52\binom51 + \binom53\binom50$?`, answer: "120",
          solution: String.raw`Each term counts the choices of $3$ people from $5$ men and $5$ women with a given number of men. Together they count all choices of $3$ from $10$: $\binom{10}{3} = 120$. (Directly, $10 + 50 + 50 + 10 = 120$.)` }
      ],
      problems: [
        "2007 AMC 12B, Problem 16",
        "2011 AMC 10A, Problem 22"
      ]
    },
    "R8.2": {
      prereq: ["stars-and-bars", "inclusion-exclusion", "uniform-overcount"],
      cards: ["stars-bars-upper-bound", "burnsides-lemma"],
      body: String.raw`In how many ways can three dice show a total of $10$? How many different necklaces of $6$ beads, black or white, are there when a rotation does not count as a change? How many ways are there to paint the faces of a cube in two colors? Each is a count with a twist: a maximum on each share, or a symmetry that makes some arrangements the same.

[[stars-bars-upper-bound|Stars and bars with a maximum]] counts all the shares first and then removes the bad ones by inclusion-exclusion. A share that breaks its maximum $m$ is at least $m + 1$; subtracting $m + 1$ from it leaves a free share again, so the bad cases are counted by stars and bars too. Three dice totaling $10$ are $x_1 + x_2 + x_3 = 10$ with each $x_i$ from $1$ to $6$; setting $y_i = x_i - 1$ gives $y_1 + y_2 + y_3 = 7$ with each $y_i \le 5$. There are $\binom92 = 36$ solutions in all; a share of at least $6$ leaves $1$ to share, $\binom32 = 3$ ways, for each of $3$ shares; two shares of at least $6$ are impossible. So $36 - 9 = 27$. The same count is the coefficient of $x^{10}$ in $(x + x^2 + \cdots + x^6)^3$, which is how such a question is sometimes asked.

[[burnsides-lemma|Burnside's lemma]] counts arrangements up to symmetry. Dividing by the number of symmetries works only when no arrangement is left unchanged by a symmetry other than the identity (R3.5); with colorings, many are, and they are undercounted by that division. Burnside's lemma averages instead: over all the symmetries, count the colorings each one leaves unchanged, add, and divide by the number of symmetries. A symmetry leaves a coloring unchanged exactly when each cycle of positions it moves around is one color, so with $k$ colors a symmetry with $c$ cycles fixes $k^c$ colorings.

For the square's corners in $2$ colors, the $4$ rotations fix $16$, $2$, $4$ and $2$ colorings (the quarter turns have one cycle, the half turn two), so there are $\tfrac{16 + 2 + 4 + 2}{4} = 6$ colorings, as listed in R8.1; in $3$ colors, $\tfrac{81 + 3 + 9 + 3}{4} = 24$. For $6$ beads in a ring, the rotations by $0$ to $5$ places have $6$, $1$, $2$, $3$, $2$, $1$ cycles, giving $\tfrac{64 + 2 + 4 + 8 + 4 + 2}{6} = 14$ necklaces. For the faces of a cube, the $24$ rotations give $\tfrac{2^6 + 3 \cdot 2^4 + 12 \cdot 2^3 + 8 \cdot 2^2}{24} = 10$. When the colors are used in fixed numbers, as in "three blue and two red", each symmetry's fixed colorings are counted with those numbers.

Subtract the shares that break a maximum after shifting them, and average the fixed colorings over the symmetries when a rotation or reflection does not count as a change. The next lesson adds sums of binomial coefficients.`,
      related: [
        { card: "coefficient-extraction", note: String.raw`the same count read as one coefficient of a product of polynomials.` },
        { card: "circular-permutations", note: String.raw`seating around a table, where every arrangement moves under a rotation (R3.4).` },
        { card: "generating-function-method", note: String.raw`shares with any allowed sizes, as a product of polynomials (R8.3).` }
      ],
      exercises: [
        { q: String.raw`Three fair dice are rolled. In how many of the $216$ outcomes is the total $10$?`, answer: "27",
          solution: String.raw`Write each die as $1 + y_i$; then $y_1 + y_2 + y_3 = 7$ with $0 \le y_i \le 5$. All solutions: $\binom92 = 36$. Those with some $y_i \ge 6$: replace it by $6 + y_i'$, leaving $1$, $\binom32 = 3$ ways, for $3$ choices of $i$; two at least $6$ is impossible. So $36 - 9 = 27$.` },
        { q: String.raw`The four corners of a square are colored with $3$ colors. Two colorings count as the same if a rotation turns one into the other. How many different colorings are there?`, answer: "24",
          solution: String.raw`The identity fixes $3^4 = 81$; each quarter turn moves all four corners in one cycle and fixes $3$; the half turn swaps opposite corners, two cycles, and fixes $9$. By Burnside's lemma, $\tfrac{81 + 3 + 9 + 3}{4} = 24$.` },
        { q: String.raw`Six beads on a ring are each black or white. Two rings count as the same if a rotation turns one into the other. How many different rings are there?`, answer: "14",
          solution: String.raw`The rotation by $r$ places splits the $6$ positions into $\gcd(r, 6)$ cycles, for $r = 0$ to $5$: $6, 1, 2, 3, 2, 1$. They fix $2^6, 2, 4, 8, 4, 2$ colorings, which add to $84$, and $\tfrac{84}{6} = 14$.` },
        { q: String.raw`Each face of a cube is painted red or blue. Two cubes count as the same if a rotation turns one into the other. How many different cubes are there?`, answer: "10",
          solution: String.raw`The $24$ rotations are the identity ($6$ cycles of faces), $3$ half turns about face axes ($4$ cycles), $6$ quarter turns about face axes ($3$ cycles), $6$ half turns about edge axes ($3$ cycles), and $8$ turns about corner axes ($2$ cycles). They fix $64 + 3 \cdot 16 + 12 \cdot 8 + 8 \cdot 4 = 240$ colorings in all, and $\tfrac{240}{24} = 10$.` }
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
      body: String.raw`What is $\binom60^2 + \binom61^2 + \cdots + \binom66^2$? What is the coefficient of $x^2y^2z$ in $(x + y + z)^5$? In how many ways can $20$ cents be made from pennies, nickels and dimes? Each is a count that a product of choices, or a product of polynomials, organizes.

[[vandermonde|Vandermonde's identity]], $\sum_k \binom mk \binom n{r-k} = \binom{m+n}{r}$, chooses $r$ people from a group of $m$ and a group of $n$, split by how many come from the first group. So committees of $4$ from $5$ men and $6$ women add up to $\binom{11}{4} = 330$. With $m = n = r$ and $\binom n{n-k} = \binom nk$ it gives the sum of squares: $\sum_k \binom6k^2 = \binom{12}{6} = 924$. A sum of products of two binomial coefficients whose lower numbers add to a constant is a sign to look for this identity.

[[multinomial-theorem|The multinomial theorem]] expands a power of a sum of several terms. In $(x + y + z)^5$, a term picks one of $x$, $y$, $z$ from each of the $5$ factors, and the term $x^2y^2z$ arises once for each arrangement of the letters $xxyyz$, so its coefficient is $\tfrac{5!}{2!\,2!\,1!} = 30$ (R3.2). The number of different terms is the number of exponent triples adding to $5$, by stars and bars; for $(x + y + z)^6$ it is $\binom82 = 28$.

[[generating-function-method|A generating function]] turns a count into a product of polynomials. When polynomials are multiplied, exponents add, so the coefficient of $x^N$ in a product counts the ways to pick one term from each factor with exponents adding to $N$. Making $20$ cents from pennies, nickels and dimes is the coefficient of $x^{20}$ in $(1 + x + x^2 + \cdots)(1 + x^5 + x^{10} + \cdots)(1 + x^{10} + x^{20} + \cdots)$: choose the dimes ($0$, $1$ or $2$), then the nickels, and the pennies fill the rest, $5 + 3 + 1 = 9$ ways. A die is $x + x^2 + \cdots + x^6$, so the totals of several dice are the coefficients of its power, and a maximum on a share is a polynomial that stops.

Look for a split into two groups behind a sum of products, count the arrangements of the exponents for a multinomial coefficient, and write each choice as a polynomial when the sizes of the parts vary. The next lesson turns to colorings of graphs and to games.`,
      related: [
        { card: "squared-binomial-sum", note: String.raw`the case $\sum_k \binom nk^2 = \binom{2n}{n}$.` },
        { card: "coefficient-extraction", note: String.raw`adding coefficients by setting $x = 1$ or $-1$ (R4.4).` },
        { card: "hockey-stick", note: String.raw`another sum of binomial coefficients, along a diagonal (R4.3).` }
      ],
      exercises: [
        { q: String.raw`What is $\binom60^2 + \binom61^2 + \cdots + \binom66^2$?`, answer: "924",
          solution: String.raw`Write $\binom6k^2 = \binom6k\binom6{6-k}$: the sum counts the choices of $6$ people from two groups of $6$, split by how many come from the first. That is $\binom{12}{6} = 924$.` },
        { q: String.raw`What is the coefficient of $x^2y^2z$ in $(x + y + z)^5$?`, answer: "30",
          solution: String.raw`The term arises once for each way to choose which factors give $x$, $y$ and $z$, that is, each arrangement of $xxyyz$: $\tfrac{5!}{2!\,2!\,1!} = \tfrac{120}{4} = 30$.` },
        { q: String.raw`How many different terms are there in the expansion of $(x + y + z)^6$, after like terms are combined?`, answer: "28",
          solution: String.raw`A term is $x^ay^bz^c$ with $a + b + c = 6$, and every such triple appears with a positive coefficient. By stars and bars there are $\binom82 = 28$.` },
        { q: String.raw`In how many ways can $20$ cents be made from pennies, nickels and dimes?`, answer: "9",
          solution: String.raw`This is the coefficient of $x^{20}$ in $\tfrac{1}{1-x}\cdot\tfrac{1}{1-x^5}\cdot\tfrac{1}{1-x^{10}}$, found by choosing the dimes first. With $0$ dimes, $0$ to $4$ nickels ($5$ ways); with $1$ dime, $0$ to $2$ nickels ($3$ ways); with $2$ dimes, $1$ way. In all $9$.` }
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
      body: String.raw`How few colors are needed for the vertices of a graph so that neighbors differ? Who wins Nim with piles of $1$, $4$ and $6$? Two players take turns rolling a die, and the first to roll a six wins: what is the first player's chance? These questions about colorings and games go beyond a plain table of wins and losses.

[[graph-coloring|Graph coloring]] asks for the fewest colors in a proper coloring, one in which the ends of every edge differ. A graph with largest degree $\Delta$ needs at most $\Delta + 1$, by coloring the vertices one at a time with a color no neighbor has yet; it needs only $2$ exactly when it has no cycle of odd length; and a triangle, or any odd cycle, needs $3$. Counting the proper colorings is a separate question, answered vertex by vertex: the vertices of a $4$-cycle in $3$ colors can be colored in $18$ ways, $3 \cdot 2 \cdot 2 \cdot 2$ less the colorings whose last vertex matches the first, by cases on whether opposite corners agree.

[[strategy-stealing|A symmetry strategy]] decides a game without labeling every position. If the second player can answer each move with its mirror image, the position is symmetric after each of the second player's moves, so whenever the first player can move, the mirror move is also available, and the second player is never the one stuck. Strategy stealing proves instead that the first player wins, without saying how: if the second player had a winning strategy, the first player could make any move and then follow it, which is impossible whenever an extra move cannot hurt.

[[sprague-grundy|Nim]] is the game of several piles from which a move takes any number of coins from one pile, the last coin winning. The player to move loses exactly when the binary sum without carries, the XOR, of the pile sizes is $0$. For $1$, $4$, $6$ the XOR is $1 \oplus 4 \oplus 6 = 3$, so the player to move wins, by taking $1$ coin from the pile of $6$, leaving $1 \oplus 4 \oplus 5 = 0$. Every game in which both players have the same moves plays like a Nim pile of some size, its Grundy value, the smallest number not among the values of its options; a pile from which $1$ or $2$ coins may be taken has value $n \bmod 3$.

[[turn-based-games|A game of chance in turns]] is a probability, not a strategy. If each player in turn wins with probability $p$, the first wins on turn $1$, $3$, $5$, and so on, and summing the geometric series, or noting that after two failures the game starts over, gives $P = \tfrac{p}{1 - (1 - p)^2}$. For a six on a die, $\tfrac{1/6}{11/36} = \tfrac{6}{11}$.

Color greedily for an upper bound and find an odd cycle for a lower one, look for a mirror move or a stolen strategy, compute the XOR for Nim and the Grundy value for its relatives, and sum the turns of a game of chance. The Summary follows.`,
      related: [
        { card: "backward-induction", note: String.raw`labeling positions one by one from the end (R5.4).` },
        { card: "constructive-counting", note: String.raw`counting proper colorings vertex by vertex (R1.3).` },
        { card: "states-recursion-prob", note: String.raw`games of chance with more states than two (R9.3).` }
      ],
      exercises: [
        { q: String.raw`The vertices of a square $ABCD$ are colored with $3$ colors so that the ends of each side differ. How many colorings are there?`, answer: "18",
          solution: String.raw`Color $A$ ($3$ ways) and $C$. If $C$ matches $A$, then $B$ and $D$ each avoid one color: $2 \cdot 2$; if $C$ differs from $A$ ($2$ ways), $B$ and $D$ each avoid two colors: $1 \cdot 1$. So $3(1 \cdot 4 + 2 \cdot 1) = 18$.` },
        { q: String.raw`In Nim with piles of $1$, $4$ and $6$ coins, a move takes any number of coins from one pile, and the player who takes the last coin wins. How many coins should the first player take, and from which pile, to win? Give the number of coins.`, answer: "1",
          solution: String.raw`In binary, $1 = 001$, $4 = 100$, $6 = 110$, and their XOR is $011 = 3$, not $0$, so the player to move wins by making it $0$. Only the pile of $6$ can be lowered to $6 \oplus 3 = 5$; the others would have to grow. So take $1$ coin from the pile of $6$, leaving $1, 4, 5$, whose XOR is $0$.` },
        { q: String.raw`Two players take turns rolling a fair die, and the first to roll a six wins. What is the probability that the first player wins?`, answer: "6/11",
          solution: String.raw`The first player wins on the first roll with probability $\tfrac16$; otherwise both miss, with probability $\tfrac{25}{36}$, and the game starts over. So $P = \tfrac16 + \tfrac{25}{36}P$, and $P = \tfrac{1/6}{11/36} = \tfrac{6}{11}$.` }
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
      body: String.raw`[[stars-bars-upper-bound|Stars and bars with a maximum]] subtracts the shares that break it, after a shift. [[burnsides-lemma|Burnside's lemma]] averages the colorings fixed by each symmetry.

[[vandermonde|Vandermonde's identity]] splits a choice between two groups; [[multinomial-theorem|the multinomial theorem]] counts arrangements of exponents; and [[generating-function-method|a generating function]] reads a count as a coefficient of a product.

[[graph-coloring|Graph coloring]] bounds the colors from above greedily and from below by odd cycles. [[strategy-stealing|Symmetry and strategy stealing]] decide a game without a table, [[sprague-grundy|the XOR]] decides Nim, and [[turn-based-games|a game of chance]] is a geometric series.`,
      strategies: [
        String.raw`For a maximum on each share, count all shares, then subtract those that break it by inclusion-exclusion.`,
        String.raw`When symmetric arrangements count as one, average the fixed arrangements over the symmetries.`,
        String.raw`Read a sum of products of binomial coefficients as a choice from two groups.`,
        String.raw`Write each choice as a polynomial and look for one coefficient of the product.`,
        String.raw`In a game, look for a mirror move before building a table.`,
        String.raw`For Nim and games like it, compute the XOR of the piles or Grundy values.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many ways can $10$ identical candies be shared among $3$ children if no child gets more than $5$?`, answer: "21",
        solution: String.raw`All shares: $\binom{12}{2} = 66$. A child with at least $6$: give $6$ first and share $4$ freely, $\binom62 = 15$, for each of $3$ children. Two children with $6$ each would need $12$. So $66 - 45 = 21$.` },
      { q: String.raw`What is the coefficient of $x^3$ in $(1 + x)^4(1 + x)^5$, found without multiplying out?`, answer: "84",
        solution: String.raw`The product is $(1 + x)^9$, so the coefficient is $\binom93 = 84$; read as Vandermonde's identity, $\sum_k \binom4k\binom5{3-k} = \binom93$.` },
      { q: String.raw`In a game, a pile has $n$ coins and a move takes $1$ or $2$ of them; the player who takes the last coin wins. What is the Grundy value of a pile of $10$ coins?`, answer: "1",
        solution: String.raw`The values start $g(0) = 0$, $g(1) = 1$, $g(2) = 2$, and $g(3) = 0$, the smallest number not among $g(1)$ and $g(2)$. They repeat with period $3$, so $g(n) = n \bmod 3$ and $g(10) = 1$.` }
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
