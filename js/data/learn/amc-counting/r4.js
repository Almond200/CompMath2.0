// Learn, AMC Counting & Probability, chapter R4: distributions and binomial coefficients (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R4"] = {
  lessons: {
    "R4.1": {
      prereq: ["permutations-combinations", "gap-method"],
      cards: [],
      body: String.raw`The numbers $\binom nk$ count more than committees. They count ways to share identical objects among people, they fill Pascal's triangle, they are the coefficients when $(1 + x)^n$ is multiplied out, and they count any set that can be matched one to one with a set of choices. This chapter follows them through each of these.

Sharing $5$ identical candies among $3$ children is a choice in disguise: line up the $5$ candies and $2$ dividers, so that the candies before the first divider go to the first child, those between the dividers to the second, and the rest to the third. Each sharing is one arrangement of $7$ symbols, fixed by the places of the $2$ dividers, so there are $\binom72 = 21$ sharings.

The numbers $\binom6k$ for $k = 0$ to $6$ add to $2^6 = 64$, since each counts the subsets of size $k$ of a $6$-element set, and there are $64$ subsets in all. When $(1 + x)^5$ is multiplied out, the coefficient of $x^2$ is $\binom52 = 10$, the number of ways to choose which $2$ of the $5$ factors supply an $x$.

The lessons take these ideas in turn: stars and bars (R4.2), Pascal's triangle (R4.3), the binomial theorem (R4.4), and bijections (R4.5). The Summary (R4.6) collects the strategies.`,
      exercises: [
        { q: String.raw`In how many ways can $5$ identical candies be shared among $3$ children, if a child may get none?`, answer: "21",
          solution: String.raw`Arrange $5$ candies and $2$ dividers in a row; each arrangement is one sharing. The dividers take $2$ of $7$ places: $\binom72 = 21$.` },
        { q: String.raw`What is $\binom60 + \binom61 + \cdots + \binom66$?`, answer: "64",
          solution: String.raw`The terms count the subsets of a $6$-element set by size, so they add to the number of all subsets, $2^6 = 64$.` },
        { q: String.raw`What is the coefficient of $x^2$ when $(1 + x)^5$ is multiplied out?`, answer: "10",
          solution: String.raw`Each term picks $1$ or $x$ from each of the $5$ factors, and an $x^2$ term picks $x$ from exactly $2$ of them: $\binom52 = 10$ ways.` }
      ],
      problems: [
        "2004 AMC 8, Problem 17",
        "2022 AMC 10B, Problem 3",
        "2025 AMC 10B, Problem 3"
      ]
    },
    "R4.2": {
      prereq: ["permutations-combinations"],
      cards: ["stars-and-bars", "balls-boxes-table", "partitions"],
      body: String.raw`How many solutions in positive integers does $x + y + z = 10$ have? In how many ways can $12$ identical balls go into $4$ boxes with at least $2$ in each? And when the boxes are identical too, what changes?

[[stars-and-bars|Stars and bars]] counts the ways to split $n$ identical objects among $k$ different recipients. With empty shares allowed, the objects are $n$ stars and the boundaries $k - 1$ bars, in a row of $n + k - 1$ symbols, and choosing the places of the bars gives $\binom{n + k - 1}{k - 1}$. So $x + y + z = 10$ has $\binom{12}{2} = 66$ solutions in nonnegative integers. If every share must be positive, put the bars in different gaps between the stars: there are $n - 1$ gaps, so $\binom{n - 1}{k - 1}$, and $x + y + z = 10$ has $\binom92 = 36$ solutions in positive integers. A lower bound other than $0$ or $1$ is handled by handing out the required minimum first: with at least $2$ balls in each of $4$ boxes, give $8$ balls first and share the remaining $4$ freely, $\binom{7}{3} = 35$ ways.

[[balls-boxes-table|The balls-in-boxes table]] keeps the cases apart. Are the balls different or identical? Are the boxes different or identical? May a box be empty? Different balls in different boxes give $k^n$ placements (R1.3); identical balls in different boxes give stars and bars; identical balls in identical boxes give [[partitions|partitions]], ways to write $n$ as a sum with the order ignored. Putting $5$ identical balls into $3$ identical boxes, empty allowed, is writing $5$ as a sum of at most $3$ parts: $5$, $4 + 1$, $3 + 2$, $3 + 1 + 1$, $2 + 2 + 1$, five ways. There is no formula for partitions; they are listed in order, largest part first. The number of ways to write $6$ as a sum of positive integers in any number of parts, order ignored, is $11$.

Decide whether the objects and the containers are different, hand out any minimum first, then use stars and bars for identical objects in different boxes and an ordered list for identical boxes. The next lesson studies the numbers $\binom nk$ themselves.`,
      related: [
        { card: "stars-bars-upper-bound", note: String.raw`stars and bars with a maximum on each share, by inclusion-exclusion (R8.2).` },
        { card: "pie", note: String.raw`different balls in different boxes with none empty (R3.5).` }
      ],
      exercises: [
        { q: String.raw`How many ordered triples of positive integers $(x, y, z)$ satisfy $x + y + z = 10$?`, answer: "36",
          solution: String.raw`Ten stars have $9$ gaps between them, and two bars in different gaps split them into three positive parts: $\binom92 = 36$.` },
        { q: String.raw`How many ordered triples of nonnegative integers $(x, y, z)$ satisfy $x + y + z = 10$?`, answer: "66",
          solution: String.raw`Arrange $10$ stars and $2$ bars in $12$ places: $\binom{12}{2} = 66$.` },
        { q: String.raw`In how many ways can $12$ identical balls be put into $4$ different boxes with at least $2$ balls in each box?`, answer: "35",
          solution: String.raw`Put $2$ balls in each box first, using $8$. The other $4$ go in freely: $\binom{4 + 3}{3} = \binom73 = 35$.` },
        { q: String.raw`In how many ways can $5$ identical balls be put into $3$ identical boxes, if a box may be empty?`, answer: "5",
          solution: String.raw`Only the multiset of box sizes matters, so this is writing $5$ as a sum of at most $3$ parts: $5$, $4 + 1$, $3 + 2$, $3 + 1 + 1$, $2 + 2 + 1$. Five ways.` }
      ],
      problems: [
        "2019 AMC 8, Problem 25",
        "2001 AMC 10, Problem 19",
        "2003 AMC 10A, Problem 21",
        "2018 AMC 10A, Problem 11",
        "2013 AMC 10B, Problem 18",
        "2016 AMC 10A, Problem 20"
      ]
    },
    "R4.3": {
      prereq: ["permutations-combinations"],
      cards: ["pascals-identity", "binomial-row-sums", "hockey-stick"],
      body: String.raw`Write the numbers $\binom nk$ in rows, row $n$ holding $\binom n0, \binom n1, \ldots, \binom nn$, and a triangle appears in which every entry is the sum of the two above it. Why does that rule hold, and what do the sums of rows and of diagonals give?

[[pascals-identity|Pascal's identity]], $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$, is a count by cases. Fix one of the $n$ objects. A choice of $k$ either includes it, and then the other $k - 1$ come from the remaining $n - 1$, or leaves it out, and then all $k$ come from the remaining $n - 1$. So $\binom83 + \binom84 = \binom94 = 126$. The triangle is also symmetric, $\binom nk = \binom n{n-k}$, and along a row the entries rise to the middle and fall again, each the one before times $\tfrac{n - k + 1}{k}$.

[[binomial-row-sums|The row sums]] are powers of $2$: $\binom n0 + \binom n1 + \cdots + \binom nn = 2^n$, the number of all subsets. The alternating sum $\binom n0 - \binom n1 + \binom n2 - \cdots$ is $0$ for $n \ge 1$, so the even-numbered entries and the odd-numbered entries each add to half the row: $\binom{10}{0} + \binom{10}{2} + \cdots + \binom{10}{10} = 2^9 = 512$.

[[hockey-stick|The hockey stick identity]] adds a diagonal: $\binom rr + \binom{r+1}{r} + \cdots + \binom nr = \binom{n+1}{r+1}$. To choose $r + 1$ numbers from $1, \ldots, n + 1$, split by the largest one chosen, $m + 1$: the other $r$ come from $1, \ldots, m$, in $\binom mr$ ways. So $\binom33 + \binom43 + \cdots + \binom{10}{3} = \binom{11}{4} = 330$. Since the triangular numbers are $\binom{k+1}{2}$, the first ten add to $\binom{12}{3} = 220$.

Read sums of binomial coefficients as counts: split by one object for Pascal's identity, count all subsets for a row, and split by the largest element for a diagonal. The next lesson multiplies out $(x + y)^n$.`,
      related: [
        { card: "vandermonde", note: String.raw`a sum of products of binomial coefficients, by choosing from two groups (R8.3).` },
        { card: "committee-chair", note: String.raw`the identity $k\binom nk = n\binom{n-1}{k-1}$ (R1.4).` }
      ],
      exercises: [
        { q: String.raw`What is $\binom83 + \binom84$?`, answer: "126",
          solution: String.raw`By Pascal's identity it is $\binom94 = \tfrac{9 \cdot 8 \cdot 7 \cdot 6}{24} = 126$ (directly, $56 + 70 = 126$).` },
        { q: String.raw`What is $\binom33 + \binom43 + \binom53 + \cdots + \binom{10}{3}$?`, answer: "330",
          solution: String.raw`By the hockey stick identity, $\binom{11}{4} = \tfrac{11 \cdot 10 \cdot 9 \cdot 8}{24} = 330$.` },
        { q: String.raw`What is $\binom{10}{0} + \binom{10}{2} + \binom{10}{4} + \cdots + \binom{10}{10}$?`, answer: "512",
          solution: String.raw`The full row adds to $2^{10}$ and the alternating sum is $0$, so the even-numbered entries and the odd-numbered entries are equal, each $2^9 = 512$.` },
        { q: String.raw`What is the sum of the first ten triangular numbers, $1 + 3 + 6 + \cdots + 55$?`, answer: "220",
          solution: String.raw`The $k$th triangular number is $\binom{k+1}{2}$, so the sum is $\binom22 + \binom32 + \cdots + \binom{11}{2} = \binom{12}{3} = 220$.` }
      ],
      problems: [
        "2017 AMC 10B, Problem 17",
        "2022 AMC 12A, Problem 19",
        "1992 AIME, Problem 4",
        "2000 AIME II, Problem 7"
      ]
    },
    "R4.4": {
      prereq: ["permutations-combinations", "pascals-identity"],
      cards: ["binomial-theorem"],
      body: String.raw`What is the coefficient of $x^3$ in $(2x + 1)^5$? What is the constant term of $\left(x + \tfrac1x\right)^6$? What are the last two digits of $11^5$? All three come from one formula.

[[binomial-theorem|The binomial theorem]] says $(x + y)^n = \sum_{k=0}^{n} \binom nk x^{n-k} y^k$. The reason is a count: multiplying out $n$ factors of $(x + y)$ picks $x$ or $y$ from each factor, and a term $x^{n-k}y^k$ arises once for each choice of the $k$ factors that supply $y$, which is $\binom nk$ times. So the coefficients of row $n$ of Pascal's triangle are the coefficients of $(x + y)^n$.

A coefficient is found by writing the general term with every constant included. In $(2x + 1)^5$ the term with $x^3$ chooses $2x$ from $3$ factors, $\binom53 (2x)^3 = 10 \cdot 8x^3$, so its coefficient is $80$, not $10$. In $\left(x + \tfrac1x\right)^6$ the general term is $\binom6k x^{6-k} x^{-k} = \binom6k x^{6 - 2k}$, constant when $k = 3$: the constant term is $\binom63 = 20$.

Two substitutions answer questions about all the coefficients at once. Setting $x = 1$ gives the sum of the coefficients: for $(3x - 2)^5$ it is $(3 - 2)^5 = 1$. And writing a number as a round number plus a small one makes the expansion collapse: $11^5 = (10 + 1)^5 = 1 + 5 \cdot 10 + 10 \cdot 100 + \cdots$, and every later term is a multiple of $100$, so $11^5$ ends in $51$.

Write the general term with its constants, set $x = 1$ for the sum of the coefficients, and expand a power of a number near a round one. The next lesson counts by matching.`,
      related: [
        { card: "multinomial-theorem", note: String.raw`the same count for $(x_1 + \cdots + x_m)^n$ (R8.3).` },
        { card: "coefficient-extraction", note: String.raw`finding one coefficient of a product of several polynomials.` }
      ],
      exercises: [
        { q: String.raw`What is the coefficient of $x^3$ in $(2x + 1)^5$?`, answer: "80",
          solution: String.raw`The term is $\binom53 (2x)^3 \cdot 1^2 = 10 \cdot 8 x^3$, so the coefficient is $80$.` },
        { q: String.raw`What is the constant term of $\left(x + \tfrac1x\right)^6$?`, answer: "20",
          solution: String.raw`The general term is $\binom6k x^{6-k}\left(\tfrac1x\right)^k = \binom6k x^{6-2k}$, constant for $k = 3$: $\binom63 = 20$.` },
        { q: String.raw`What is the sum of the coefficients of $(3x - 2)^5$?`, answer: "1",
          solution: String.raw`Setting $x = 1$ adds all the coefficients: $(3 - 2)^5 = 1$.` },
        { q: String.raw`What number is formed by the last two digits of $11^5$?`, answer: "51",
          solution: String.raw`$(10 + 1)^5 = 1 + \binom51 10 + \binom52 10^2 + \cdots$, and every term from the third on is a multiple of $100$. So $11^5 \equiv 1 + 50 = 51 \pmod{100}$ (indeed $11^5 = 161051$).` }
      ],
      problems: [
        "2021 Fall AMC 12A, Problem 12",
        "2011 AMC 10B, Problem 23",
        "2025 AMC 10A, Problem 19",
        "2000 AIME I, Problem 3"
      ]
    },
    "R4.5": {
      prereq: ["permutations-combinations", "binomial-row-sums"],
      cards: ["bijection-method"],
      body: String.raw`Some sets are hard to count directly but match, one to one, a set that is easy to count. How many four-digit numbers have digits that strictly decrease? How many points inside a convex octagon are crossings of two diagonals, if no three diagonals meet at a point?

[[bijection-method|A bijection]] is a matching that pairs every object of one set with exactly one object of another, and every object of the second with one of the first; then the two sets have the same size. A number with strictly decreasing digits is fixed by its set of digits, since they can be written in only one decreasing order, and any $4$ different digits from $0$ to $9$ give such a number (the largest comes first, so it is not $0$). So the decreasing four-digit numbers match the $4$-element subsets of the ten digits: $\binom{10}{4} = 210$.

Inside a convex octagon, every crossing of two diagonals belongs to exactly one set of $4$ vertices, the ends of the two diagonals, and every $4$ vertices form a quadrilateral whose two diagonals cross once inside. So the crossings match the $4$-element subsets of the vertices: $\binom84 = 70$.

A matching can also show that two sets have equal size without counting either. The subsets of $\{1, \ldots, 8\}$ of even size match those of odd size by adding or removing the element $1$, so each kind is half of $2^8$: $128$. And a condition on gaps can be removed by a shift: choosing $a \lt b \lt c$ from $1$ to $12$ with each gap at least $3$ matches choosing $a \lt b - 2 \lt c - 4$ freely from $1$ to $8$, so there are $\binom83 = 56$ such choices. To check a bijection, describe the map both ways and confirm that each undoes the other.

Look for the choice that determines the object, match the set to subsets or arrangements, and confirm the map in both directions. The Summary follows.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`the shift that removes a gap condition, for gaps of at least $2$ (R3.3).` },
        { card: "grid-paths", note: String.raw`paths matched with strings of moves (R5.3).` }
      ],
      exercises: [
        { q: String.raw`How many four-digit numbers have digits that strictly decrease from left to right?`, answer: "210",
          solution: String.raw`Each such number is fixed by its set of $4$ different digits, and any $4$ digits from $0$ to $9$ written in decreasing order give one (the largest leads, so not $0$). So there are $\binom{10}{4} = 210$.` },
        { q: String.raw`In a convex octagon no three diagonals meet at one point inside. At how many points inside the octagon do two diagonals cross?`, answer: "70",
          solution: String.raw`Each crossing is fixed by the $4$ ends of its two diagonals, and every $4$ vertices give exactly one crossing, of the diagonals of their quadrilateral. So there are $\binom84 = 70$.` },
        { q: String.raw`How many subsets of $\{1, 2, \ldots, 8\}$ have an even number of elements?`, answer: "128",
          solution: String.raw`Adding $1$ to a subset that lacks it, or removing it from one that has it, changes the parity of the size and pairs the even subsets with the odd ones. So each kind is half of $2^8$: $128$.` },
        { q: String.raw`How many ways are there to choose $a \lt b \lt c$ from $\{1, 2, \ldots, 12\}$ with $b - a \ge 3$ and $c - b \ge 3$?`, answer: "56",
          solution: String.raw`Set $b' = b - 2$ and $c' = c - 4$. Then $a \lt b' \lt c'$ are any three numbers from $1$ to $8$, and the map reverses. So the count is $\binom83 = 56$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 16",
        "2021 Spring AMC 10A, Problem 15",
        "1992 AIME, Problem 2",
        "2010 AMC 10A, Problem 22",
        "2012 AMC 10B, Problem 22"
      ]
    },
    "R4.6": {
      prereq: ["stars-and-bars", "balls-boxes-table", "partitions", "pascals-identity", "binomial-row-sums", "hockey-stick", "binomial-theorem", "bijection-method"],
      cards: [],
      body: String.raw`[[stars-and-bars|Stars and bars]]: $n$ identical objects among $k$ recipients in $\binom{n+k-1}{k-1}$ ways, or $\binom{n-1}{k-1}$ with every share positive. [[balls-boxes-table|The balls-in-boxes table]] separates the cases, and identical boxes give [[partitions|partitions]], listed in order.

[[pascals-identity|Pascal's identity]] splits a choice by one object. [[binomial-row-sums|A row]] adds to $2^n$, with even and odd entries equal, and [[hockey-stick|a diagonal]] adds to the entry below its end.

[[binomial-theorem|The binomial theorem]] expands $(x + y)^n$ with coefficients $\binom nk$; setting $x = 1$ adds them. [[bijection-method|A bijection]] matches a hard set with an easy one.`,
      strategies: [
        String.raw`Hand out any required minimum first, then share the rest by stars and bars.`,
        String.raw`Ask whether the objects and the boxes are different; the four answers need four different counts.`,
        String.raw`Read a sum of binomial coefficients as a count, split by one object or by the largest element.`,
        String.raw`Write the general term of an expansion with all its constants before choosing $k$.`,
        String.raw`Set the variable to $1$ to add all the coefficients.`,
        String.raw`Find the choice that determines the object, and count those choices instead.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A shop sells $4$ kinds of donuts. In how many ways can a box of $10$ donuts be chosen?`, answer: "286",
        solution: String.raw`A box is a count of each kind adding to $10$: $\binom{10 + 3}{3} = \binom{13}{3} = 286$.` },
      { q: String.raw`What is the coefficient of $x^2y^4$ in $(x - y)^6$?`, answer: "15",
        solution: String.raw`The term is $\binom64 x^2 (-y)^4 = 15x^2y^4$.` },
      { q: String.raw`How many ordered quadruples of nonnegative integers satisfy $a + b + c + d = 8$ with $a \ge 2$?`, answer: "84",
        solution: String.raw`Set $a' = a - 2 \ge 0$; then $a' + b + c + d = 6$ has $\binom{9}{3} = 84$ solutions.` },
      { q: String.raw`What is $1 \cdot \binom61 + 2 \cdot \binom62 + \cdots + 6 \cdot \binom66$?`, answer: "192",
        solution: String.raw`The sum counts committees with a chair from $6$ people: choose the chair ($6$ ways) and any subset of the other $5$ ($2^5$): $6 \cdot 32 = 192$.` }
    ],
    problems: [
      "1988 AIME, Problem 1",
      "1998 AIME, Problem 7",
      "2000 AIME II, Problem 5",
      "1989 AIME, Problem 2"
    ]
  },
  challenge: {
    problems: [
      "2006 AMC 12A, Problem 23",
      "2023 AMC 12A, Problem 17",
      "2025 AMC 10A, Problem 24",
      "1991 AIME, Problem 3"
    ]
  }
};
