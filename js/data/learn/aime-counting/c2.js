// Learn, AIME Counting & Probability, chapter C2: arrangements and selections (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C2"] = {
  lessons: {
    "C2.1": {
      prereq: ["multiset-permutations", "permutations-combinations"],
      cards: [],
      body: String.raw`Arranging objects in a row and choosing a group of them are the two basic acts of counting, and their formulas are the product rule applied once and for all. How many orders are there for $n$ distinct objects? How many groups of $k$ can be chosen from $n$? How many different words can be spelled with the letters of MISSISSIPPI? Most AIME counting problems contain one of these counts as a step, often after a disguise: a lattice walk is a word in the letters $R$ and $U$, a choice of digits in increasing order is a subset, and a sequence of moves that ends at a given point is an arrangement of a fixed multiset of moves.

Distinct objects in a row can be ordered in $n!$ ways, and the [[permutations-combinations|ordered and unordered selections]] of $k$ of them number $\tfrac{n!}{(n - k)!}$ and $\binom nk = \tfrac{n!}{k!(n - k)!}$. The binomial coefficient divides by $k!$ because each unordered group appears in $k!$ orders, a uniform overcount. Whether order matters is decided by the objects, not the wording: a committee is unordered, a ranking is ordered, a password is ordered, a hand of cards is unordered.

When some objects are identical, [[multiset-permutations|arrangements of a multiset]] number $\tfrac{n!}{n_1!\,n_2!\cdots}$, since permuting identical copies among themselves does not change the row. MISSISSIPPI has $11$ letters with four $S$, four $I$, two $P$ and one $M$, so it has $\tfrac{11!}{4!\,4!\,2!} = 34650$ arrangements. With two kinds of objects the count is a binomial coefficient: a row of $a$ letters $R$ and $b$ letters $U$ is a choice of positions for the $R$'s, $\binom{a + b}{a}$. This is why lattice paths, binary strings with a fixed number of ones, and sequences of wins and losses are all counted by binomial coefficients.

The common difficulty is a problem where the multiset itself is not fixed. A walk of four or six steps that ends at a given point, a code with at most two of one symbol, or a room assignment where some rooms hold two people: first split into cases by the composition (how many of each kind), then count arrangements of each composition with the multiset formula, and add. The composition is usually forced by a sum condition, and listing the compositions is a small casework problem of its own.

When an object is a row of symbols, count it as a multiset arrangement; when it is a group, as a binomial coefficient; and when the composition varies, case on the composition first. The next lesson arranges objects around a circle, where rotations make some rows the same.`,
      related: [
        { card: "uniform-overcount", note: String.raw`dividing by the orders of identical objects is a uniform overcount (C1.4).` },
        { card: "grid-paths", note: String.raw`lattice paths as words in two letters (C5.5).` },
        { card: "multinomial-theorem", note: String.raw`the coefficients $\tfrac{n!}{n_1!\,n_2!\cdots}$ in the expansion of $(x_1 + \cdots + x_k)^n$ (C4.4).` }
      ],
      exercises: [
        { q: String.raw`How many different arrangements of the letters of MISSISSIPPI are there?`, answer: "34650",
          solution: String.raw`There are $11$ letters: $4$ S, $4$ I, $2$ P and $1$ M. The count is $\tfrac{11!}{4!\,4!\,2!\,1!} = \tfrac{39916800}{24 \cdot 24 \cdot 2} = 34650$.` },
        { q: String.raw`How many five-digit strings use the digits $1, 1, 2, 2, 3$, each exactly as often as listed?`, answer: "30",
          solution: String.raw`This is an arrangement of a multiset with two $1$s, two $2$s and one $3$: $\tfrac{5!}{2!\,2!\,1!} = \tfrac{120}{4} = 30$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 16",
        "2014 AMC 12A, Problem 13",
        "2001 AMC 12, Problem 16",
        "2007 AIME II, Problem 1",
        "1995 AIME, Problem 3",
        "2012 AIME I, Problem 5",
        "1990 AIME, Problem 8"
      ]
    },
    "C2.2": {
      prereq: ["uniform-overcount"],
      cards: ["circular-permutations", "necklace-formula"],
      body: String.raw`Around a circle, arrangements that differ by a rotation are usually the same, and sometimes reflections are the same too. Seating six people at a round table, placing digits around a circle so that every three in a row add to a multiple of $3$, or coloring the beads of a necklace all need this adjustment. When all the objects are distinct it is a single division; when some are identical, rotations can fix an arrangement and the division fails, and the correct count needs a little more care.

For $n$ distinct objects around a circle up to rotation, [[circular-permutations|circular arrangements]] number $(n - 1)!$: each circular arrangement corresponds to exactly $n$ rows, one for each starting point, so $\tfrac{n!}{n} = (n - 1)!$. Equivalently, fix one object's seat to remove the rotation and arrange the rest in a row. Six people at a round table can sit in $5! = 120$ ways. If two of them must sit together, glue them into a block: $5$ units around the table give $4! = 24$ arrangements, times $2$ for the order within the block, so $48$. If reflections are also identified, as for a bracelet that can be turned over, divide by $2$ more, provided $n \ge 3$.

Fixing one object is the most useful form of the idea, because it turns a circle into a row and every row technique then applies. To choose $k$ of $n$ seats around a round table with no two adjacent, case on whether seat $1$ is chosen: if it is, its two neighbors are out and the rest is a row of $n - 3$ seats from which $k - 1$ are chosen with no two adjacent; if not, the rest is a row of $n - 1$ seats. Both are row counts, and together they give $\tfrac{n}{n - k}\binom{n - k}{k}$. When the arrangement has a pattern that must repeat, such as digits whose residues modulo $3$ cycle with period $3$, fix the pattern first and then arrange within each class.

When identical objects sit around a circle, an arrangement can look the same after a rotation, so dividing by $n$ undercounts those symmetric ones. Counting $2$-colorings of $6$ beads up to rotation by $\tfrac{2^6}{6}$ gives a non-integer, the sign of the problem. The [[necklace-formula|necklace formula]] averages over the rotations the number of colorings each one fixes: a rotation by $j$ steps fixes $k^{\gcd(j, n)}$ colorings, so the number of necklaces is $\tfrac1n\sum_{j=0}^{n-1}k^{\gcd(j, n)}$. For $6$ beads in $2$ colors this is $\tfrac16(64 + 2 + 4 + 8 + 4 + 2) = 14$. The formula is the simplest case of Burnside's lemma, which a later chapter develops.

Fix one object when all are distinct; use the necklace formula, or list the symmetric arrangements, when some are identical. The next lesson counts selections with spacing conditions.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting arrangements up to any group of symmetries (C4.3).` },
        { card: "gap-method", note: String.raw`choosing gaps between already-placed objects, used around circles too (C2.3).` },
        { card: "permutation-cycle-structure", note: String.raw`a rotation by $j$ of $n$ positions splits them into $\gcd(j, n)$ cycles (C9.2).` }
      ],
      exercises: [
        { q: String.raw`Six people sit at a round table, and arrangements that differ by a rotation are the same. In how many arrangements do two particular people sit next to each other?`, answer: "48",
          solution: String.raw`Glue the two into a block, leaving $5$ units around the table, which can be arranged in $(5 - 1)! = 24$ ways. The two can sit in either order within the block, so there are $24 \cdot 2 = 48$ arrangements.` },
        { q: String.raw`How many different necklaces of $6$ beads can be made with beads of $2$ colors, if necklaces that differ by a rotation are the same?`, answer: "14",
          solution: String.raw`A rotation by $j$ steps fixes $2^{\gcd(j, 6)}$ colorings. For $j = 0, 1, \ldots, 5$ these are $64, 2, 4, 8, 4, 2$, adding to $84$, and the number of necklaces is the average, $\tfrac{84}{6} = 14$.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 18",
        "1983 AIME, Problem 7",
        "2011 AIME I, Problem 5",
        "2009 AIME I, Problem 10"
      ]
    },
    "C2.3": {
      prereq: ["gap-method"],
      cards: ["non-adjacent-selection", "restricted-sequences"],
      body: String.raw`Many conditions in counting problems are about neighbors: no two chosen chairs adjacent, no two girls standing together, no three consecutive zeros, no letter followed by a particular other letter. Such conditions do not fit the product rule directly, because whether a position is allowed depends on its neighbors. Three tools handle them: placing the unrestricted objects first and choosing gaps, a shift that turns spaced selections into ordinary ones, and a state machine that counts strings one symbol at a time.

The gap method places the unrestricted objects first and then chooses gaps for the restricted ones. Five boys and three girls in a row with no two girls adjacent: arrange the boys, $5!$ ways, which leaves $6$ gaps (between and at the ends), choose $3$ of them, $\binom63$, and arrange the girls, $3!$, for $120 \cdot 20 \cdot 6 = 14400$. The same idea gives [[non-adjacent-selection|choosing non-adjacent objects]]: the number of ways to choose $k$ of $n$ objects in a row with no two adjacent is $\binom{n - k + 1}{k}$. One proof uses the gap method with $n - k$ unchosen objects; another shifts the chosen positions $a_1 \lt a_2 \lt \cdots \lt a_k$ to $a_1, a_2 - 1, \ldots, a_k - (k - 1)$, which are any $k$ distinct numbers from $1$ to $n - k + 1$. Choosing $4$ of $12$ chairs in a row with no two adjacent gives $\binom94 = 126$. Around a circle, case on one fixed position (chosen or not) to cut the circle into a row.

When the condition is about runs or about which symbol may follow which, count [[restricted-sequences|restricted sequences]] with states. A state records just enough about the end of the string to decide what may come next, and the count for length $n + 1$ comes from the counts for length $n$ in each state. For binary strings with no two consecutive $1$s, the states are "ends in $0$" and "ends in $1$"; a $0$ may follow either, a $1$ only a $0$. The totals follow the Fibonacci numbers, $2, 3, 5, 8, \ldots$, so length $8$ gives $55$. For "no three consecutive zeros" the states are the length of the final run of zeros, and for a rule like "A is never followed by B" the states are the last letter. When the rule makes each step after the first have a fixed number of options regardless of state, the count is a simple product.

Choose the method by the shape of the condition: "no two adjacent" with a fixed number of chosen objects calls for gaps or the shift; a condition on runs or successors calls for states. The next lesson splits identical objects among groups.`,
      related: [
        { card: "recursive-counting", note: String.raw`the general form of the state-machine recursion (C5.1).` },
        { card: "tiling-a-board", note: String.raw`tilings by squares and dominoes, counted by the same Fibonacci recursion (C5.2).` },
        { card: "stars-and-bars", note: String.raw`the shift that turns spaced choices into ordinary ones is a stars-and-bars substitution (C2.4).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $4$ of $12$ chairs in a row be chosen so that no two chosen chairs are adjacent?`, answer: "126",
          solution: String.raw`By the shift $a_i \to a_i - (i - 1)$, the choices correspond to any $4$ of $12 - 4 + 1 = 9$ positions, so there are $\binom94 = 126$.` },
        { q: String.raw`How many binary strings of length $8$ have no two consecutive $1$s?`, answer: "55",
          solution: String.raw`Let $a_n$ count them. A valid string ends in $0$ (after any valid string of length $n - 1$) or in $01$ (after any valid string of length $n - 2$), so $a_n = a_{n-1} + a_{n-2}$ with $a_1 = 2$, $a_2 = 3$. Then $5, 8, 13, 21, 34, 55$: $a_8 = 55$.` },
        { q: String.raw`Five boys and three girls stand in a row. In how many orders are no two girls next to each other?`, answer: "14400",
          solution: String.raw`Arrange the boys, $5! = 120$ ways, leaving $6$ gaps. Choose $3$ gaps for the girls, $\binom63 = 20$, and order the girls, $3! = 6$. The total is $120 \cdot 20 \cdot 6 = 14400$.` }
      ],
      problems: [
        "2018 AMC 12A, Problem 3",
        "2015 AMC 12A, Problem 17",
        "2006 AMC 12A, Problem 25",
        "2003 AIME II, Problem 3",
        "2009 AIME II, Problem 6",
        "2019 AIME II, Problem 5",
        "2008 AIME II, Problem 12",
        "2023 AIME I, Problem 11",
        "2025 AIME II, Problem 10"
      ]
    },
    "C2.4": {
      prereq: ["permutations-combinations"],
      cards: ["stars-and-bars", "stars-bars-upper-bound", "balls-boxes-table"],
      body: String.raw`How many ways are there to give $10$ identical candies to $4$ children, to write $66$ as an ordered sum of three positive integers, or to choose $4$ numbers with gaps that satisfy a condition? Each is a count of solutions of $x_1 + \cdots + x_k = n$ in integers with lower bounds, and sometimes upper bounds. The tool is stars and bars, a bijection with arrangements of two symbols, together with a shift for lower bounds and a complement for upper bounds.

[[stars-and-bars|Stars and bars]] counts nonnegative solutions of $x_1 + \cdots + x_k = n$: write $n$ stars and $k - 1$ bars in a row, and read $x_i$ as the number of stars in the $i$th group. Every row gives one solution and every solution one row, so there are $\binom{n + k - 1}{k - 1}$ solutions; for $a + b + c + d = 10$ that is $\binom{13}{3} = 286$. Positive solutions number $\binom{n - 1}{k - 1}$, by choosing $k - 1$ of the $n - 1$ gaps between stars, or by substituting $x_i = y_i + 1$. Any lower bound is handled by such a shift, and other conditions are handled by a substitution that makes the variables free: odd values $x_i = 2y_i - 1$, or digits subtracted in an alternating sum replaced by their complements $9 - d$. The gaps between chosen numbers $a \lt b \lt c \lt d$ are a stars-and-bars solution too, which turns conditions on differences into conditions on parts.

With [[stars-bars-upper-bound|upper bounds]], count all solutions and subtract the bad ones by inclusion-exclusion: a solution with $x_i \ge m + 1$ becomes, after the shift $x_i \to x_i - (m + 1)$, an unrestricted solution with a smaller total. For $x_1 + x_2 + x_3 = 10$ with each $x_i \le 5$, all solutions number $\binom{12}{2} = 66$, those with one variable at least $6$ number $3\binom{6}{2} = 45$, and two variables cannot both be $6$ or more, so the answer is $21$. The same count is the coefficient of $x^{10}$ in $(1 + x + \cdots + x^5)^3$, which is how such problems appear in polynomial form.

Stars and bars is one entry of [[balls-boxes-table|the table of distributions]]: identical balls into distinct boxes. Distinct balls into distinct boxes number $k^n$; distinct balls into distinct boxes with none empty are surjections; distinct balls into identical boxes are set partitions, counted by Stirling numbers; identical balls into identical boxes are partitions of an integer. Before counting a distribution, decide which entry it is: whether the objects are identical, whether the groups are labeled, and whether a group may be empty.

Use stars and bars whenever a count is the number of ways to write a total as an ordered sum, after shifting away lower bounds and subtracting upper ones. The last lesson of the chapter separates choosing positions from assigning values.`,
      related: [
        { card: "pie", note: String.raw`the subtraction of solutions that break upper bounds (C3.1).` },
        { card: "coefficient-extraction", note: String.raw`the same count as a coefficient of a power of a polynomial.` },
        { card: "partitions", note: String.raw`identical objects into identical groups, where order of parts does not matter (C9.1).` },
        { card: "surjections", note: String.raw`distinct objects into labeled groups with none empty (C2.5).` }
      ],
      exercises: [
        { q: String.raw`How many solutions in nonnegative integers does $a + b + c + d = 10$ have?`, answer: "286",
          solution: String.raw`Stars and bars with $10$ stars and $3$ bars: $\binom{13}{3} = 286$.` },
        { q: String.raw`How many solutions does $x_1 + x_2 + x_3 = 10$ have in integers with $0 \le x_i \le 5$?`, answer: "21",
          solution: String.raw`Without upper bounds there are $\binom{12}{2} = 66$ solutions. A solution with $x_1 \ge 6$ becomes, with $x_1' = x_1 - 6$, a solution of $x_1' + x_2 + x_3 = 4$, of which there are $\binom62 = 15$; the same holds for each variable, and no two variables can both reach $6$. So the count is $66 - 3 \cdot 15 = 21$.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 22",
        "2008 AMC 12A, Problem 19",
        "2020 AMC 12B, Problem 24",
        "1998 AIME, Problem 7",
        "2001 AIME I, Problem 6",
        "2021 AIME I, Problem 4",
        "2011 AIME II, Problem 6",
        "2009 AIME I, Problem 9",
        "2011 AIME I, Problem 12"
      ]
    },
    "C2.5": {
      prereq: ["counting-functions"],
      cards: ["surjections", "stirling-bell", "fencepost-counting"],
      body: String.raw`Two ways of describing the same object often give very different counts, and the choice between them is a recurring decision: choose which positions get a certain value, or assign a value to each position. Assigning colors to five people so that all three colors are used, splitting five people into three nonempty groups, and counting the posts along a fence all depend on keeping straight what is being chosen and what is being assigned, and on counting endpoints correctly.

A function from an $n$-element set onto a $k$-element set, one that uses every value, is a [[surjections|surjection]]. There are $k^n$ functions in all, and by inclusion-exclusion over which values are missed, the surjections number $\sum_{j=0}^{k}(-1)^j\binom kj(k - j)^n$. From $5$ people onto $3$ colors: $3^5 - 3 \cdot 2^5 + 3 \cdot 1^5 = 243 - 96 + 3 = 150$. Small cases can also be counted by the shape of the distribution: the color counts are $3, 1, 1$ or $2, 2, 1$ in some order, giving $3 \cdot \tfrac{5!}{3!} + 3 \cdot \tfrac{5!}{2!\,2!} = 60 + 90 = 150$.

When the groups are not labeled, divide the surjection count by $k!$: the result is the [[stirling-bell|Stirling number of the second kind]] $S(n, k)$, the number of ways to split $n$ labeled objects into $k$ nonempty unlabeled groups. So $S(5, 3) = \tfrac{150}{6} = 25$. The Stirling numbers satisfy $S(n, k) = kS(n - 1, k) + S(n - 1, k - 1)$, by asking whether the last object is alone, and the Bell number $B_n = \sum_k S(n, k)$ counts all ways to split $n$ objects into groups. Problems that ask for the number of ways to cut a board into tiles and then color the tiles with every color used combine the two steps: choose where the cuts go (positions), then assign colors (a surjection from tiles onto colors).

[[fencepost-counting|Fencepost counting]] is the bookkeeping behind positions in a row: $n$ posts in a line make $n - 1$ gaps, but around a closed loop $n$ posts make $n$ gaps; the integers from $a$ to $b$ inclusive number $b - a + 1$; and a fence of length $100$ with posts every $4$ units, both ends included, has $\tfrac{100}{4} + 1 = 26$ posts. Off-by-one errors in these counts are among the most common mistakes in contest counting, and the cure is to check the formula on a tiny case, such as a fence of length $4$ with $2$ posts.

Decide whether an object is a choice of positions or an assignment of values, whether the groups are labeled, and whether every group must be used; then the count is a binomial coefficient, a power, a surjection count or a Stirling number. The next chapter develops inclusion-exclusion, the method behind the surjection formula.`,
      related: [
        { card: "pie", note: String.raw`the inclusion-exclusion that counts surjections (C3.1).` },
        { card: "balls-boxes-table", note: String.raw`where surjections and Stirling numbers sit among the distributions (C2.4).` },
        { card: "uniform-overcount", note: String.raw`dividing by $k!$ to unlabel the groups (C1.4).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can each of five people be given one of three colors so that every color is used?`, answer: "150",
          solution: String.raw`By inclusion-exclusion over the missing colors: $3^5 - \binom31 2^5 + \binom32 1^5 = 243 - 96 + 3 = 150$.` },
        { q: String.raw`In how many ways can five people be split into three nonempty groups, if the groups are not labeled?`, answer: "25",
          solution: String.raw`Labeled nonempty groups are surjections onto $3$ labels, $150$ of them, and each split is counted $3! = 6$ times, once per labeling. So there are $\tfrac{150}{6} = 25$ splits.` },
        { q: String.raw`A straight fence $100$ feet long has a post at each end and a post every $4$ feet in between. How many posts are there?`, answer: "26",
          solution: String.raw`The posts divide the fence into $\tfrac{100}{4} = 25$ gaps, and a straight row of posts has one more post than gaps: $26$.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 3",
        "2012 AMC 12B, Problem 7",
        "2016 AMC 12B, Problem 9",
        "2014 AIME I, Problem 12",
        "2013 AIME II, Problem 9"
      ]
    }
  },
  review: [
    "2021 Fall AMC 12A, Problem 18",
    "2000 AIME II, Problem 5",
    "2007 AIME II, Problem 2",
    "2026 AIME I, Problem 2",
    "2011 AIME II, Problem 7",
    "2016 AIME II, Problem 8",
    "1989 AIME, Problem 13"
  ]
};
