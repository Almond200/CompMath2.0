// Learn, AIME Counting & Probability, chapter C1: systematic counting and cases (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C1"] = {
  lessons: {
    "C1.1": {
      prereq: ["casework-method"],
      cards: [],
      body: String.raw`This chapter is about counting a finite set of objects exactly, by a method that builds or sorts every object once. Its tools are the product rule, the sum rule, the complement, an organizing parameter, the division of an overcount, and the check on small cases.

The product rule counts objects made by a sequence of decisions. If the first decision has $a$ options and the second has $b$ options whatever the first was, there are $ab$ ways to make both, and so on for more decisions. A three-digit number with all digits odd is three decisions with $5$ options each, so there are $5^3 = 125$ of them. The sum rule counts a set split into pieces that do not overlap: the count is the sum of the pieces. The positive integers below $1000$ with all digits odd split by their number of digits into $5 + 25 + 125 = 155$.

When the number of options at a step depends on an earlier choice, the count is split into cases, one for each way the earlier choice can go, and the cases are added. A good split has cases that are each easy to count and visibly disjoint, and together cover everything.

Three other moves recur. The complement counts what is not wanted and subtracts it from the total, which pays when the unwanted objects satisfy a single "none" or "all" condition. An organizing parameter is one number, such as the smallest element or a difference, that once fixed makes the rest of the count a simple product; the count is then a sum over its values. An overcount builds each object the same number of times, for example in every order of its parts, and is fixed by one division.

Last, a count can be tested. Running a process by hand on a small case, or listing a small version of the problem, finds patterns and catches a missing or doubled case.

The lessons take these ideas in turn: the product and sum rules with cases (C1.2), complements (C1.3), counting by a parameter, including counting functions (C1.4), uniform overcounts (C1.5), and processes run forward, backward and on small cases (C1.6). The Summary (C1.7) collects the strategies.`,
      exercises: [
        { q: String.raw`How many positive integers less than $1000$ have every digit odd?`, answer: "155",
          solution: String.raw`Split by the number of digits, which gives disjoint pieces. Each digit is one of $1, 3, 5, 7, 9$, so there are $5$ one-digit, $5^2 = 25$ two-digit and $5^3 = 125$ three-digit such numbers. By the sum rule the total is $5 + 25 + 125 = 155$.` },
        { q: String.raw`How many three-digit numbers have at least two equal digits?`, answer: "252",
          solution: String.raw`Count the complement, the three-digit numbers with three different digits. The first digit has $9$ options (not $0$), the second $9$ (not the first), the third $8$: $9 \cdot 9 \cdot 8 = 648$. Of the $900$ three-digit numbers, $900 - 648 = 252$ have a repeated digit.` },
        { q: String.raw`How many ordered pairs $(a, b)$ of positive integers satisfy $a + b \le 10$?`, answer: "45",
          solution: String.raw`Organize by $a$. For each $a$ from $1$ to $9$, $b$ can be any of $1, \ldots, 10 - a$, which is $10 - a$ values. The total is $9 + 8 + \cdots + 1 = 45$.` },
        { q: String.raw`How many triangles have all three vertices among the vertices of a convex octagon?`, answer: "56",
          solution: String.raw`Choose the vertices in order: $8 \cdot 7 \cdot 6 = 336$ ways. Each triangle is built in $3! = 6$ orders of its vertices, and no three vertices of a convex octagon are collinear, so there are $\tfrac{336}{6} = 56$ triangles.` }
      ],
      problems: [
        "2009 AIME I, Problem 1",
        "2012 AIME I, Problem 1",
        "1992 AIME, Problem 6"
      ]
    },
    "C1.2": {
      prereq: ["casework-method"],
      cards: ["constructive-counting"],
      body: String.raw`Most counting problems are solved by describing how to build the objects being counted, one decision at a time, and multiplying the number of choices at each step; when the number of choices depends on earlier decisions, the count is split into cases. How many four-digit numbers are even and have distinct digits? How many ways can the regions of a map be colored so that neighbors differ? How many paths go from the top of an icosahedron to the bottom? Each answer is a product of choices or a sum of such products, and the whole skill lies in choosing the order of the decisions so that every object is built exactly once.

[[constructive-counting|Constructive counting]] rests on two rules. If an object is made by a sequence of decisions, the first with $a$ options, the next with $b$ options whatever the first was, and so on, the number of objects is $a \cdot b \cdots$ (the product rule). If the objects split into disjoint groups, the count is the sum of the group counts (the sum rule). The product rule needs two conditions that are easy to miss: the number of options at each step must not depend on earlier choices, and different sequences of decisions must give different objects. When the first fails, split into cases; when the second fails, the count is an overcount, which a later lesson handles.

The order of decisions matters. Make the most restricted decision first. For a four-digit even number with distinct digits, the last digit is restricted (even) and the first is restricted (not zero), and the two restrictions interact through the digit $0$. So split on the last digit: if it is $0$, the other three are $9 \cdot 8 \cdot 7 = 504$; if it is $2$, $4$, $6$ or $8$, the first digit has $8$ options (not zero, not the last digit), then $8$ and $7$, giving $4 \cdot 8 \cdot 8 \cdot 7 = 1792$. The total is $2296$. Deciding the first digit first would leave the last digit's count depending on whether the first was even, which needs the same split in a clumsier place.

For coloring problems the order is chosen so that each new region touches as few colored regions as possible, and the count at each step is the number of colors minus the number of distinct colors among its colored neighbors. When that number depends on whether two earlier regions happened to get the same color, split on that. Four regions in a ring, colored with three colors so that neighbors differ: color the first ($3$ ways) and the second ($2$); then the third either matches the first, leaving $2$ choices for the fourth, or differs from both, leaving $1$. That gives $3 \cdot 2 \cdot (1 \cdot 2 + 1 \cdot 1) = 18$. A case split is good when each case is easy to count and the cases visibly do not overlap.

Use the product rule whenever the objects can be built step by step, put the restricted steps first, and split into cases exactly where a count would otherwise depend on an earlier choice. The next lesson counts what is not wanted instead.`,
      related: [
        { card: "casework-method", note: String.raw`splitting a count into disjoint cases, the sum rule in practice.` },
        { card: "graph-coloring", note: String.raw`the general count of colorings with neighbors different (C8.3).` },
        { card: "uniform-overcount", note: String.raw`what to do when different decision sequences build the same object (C1.5).` }
      ],
      exercises: [
        { q: String.raw`How many four-digit even numbers have four different digits?`, answer: "2296",
          solution: String.raw`Split on the units digit. If it is $0$, the other digits are chosen in $9 \cdot 8 \cdot 7 = 504$ ways. If it is one of $2, 4, 6, 8$, the thousands digit has $8$ options (not $0$ and not the units digit), then the hundreds $8$ and the tens $7$: $4 \cdot 8 \cdot 8 \cdot 7 = 1792$. The total is $504 + 1792 = 2296$.` },
        { q: String.raw`Four regions are arranged in a ring, each touching the two next to it. In how many ways can they be colored with three colors so that touching regions have different colors?`, answer: "18",
          solution: String.raw`Color regions $1$, $2$, $3$, $4$ around the ring. Region $1$ has $3$ options and region $2$ has $2$. If region $3$ matches region $1$ ($1$ way), region $4$ must avoid one color, $2$ ways. If region $3$ differs from both ($1$ way), region $4$ must avoid two colors, $1$ way. So the count is $3 \cdot 2 \cdot (2 + 1) = 18$.` }
      ],
      problems: [
        "2022 AMC 12A, Problem 7",
        "2013 AMC 12A, Problem 15",
        "2019 AMC 12A, Problem 13",
        "1993 AIME, Problem 1",
        "2013 AIME I, Problem 2",
        "2004 AIME II, Problem 4",
        "2016 AIME I, Problem 3",
        "2012 AIME II, Problem 3"
      ]
    },
    "C1.3": {
      prereq: ["complementary-counting"],
      cards: [],
      body: String.raw`A condition that says "at least one" is satisfied in many overlapping ways, while its failure is satisfied in only one way. That asymmetry is the reason to count the complement: the number of four-digit numbers with at least one $7$ is all four-digit numbers minus those with no $7$; the number of triangles among fifteen points is all triples minus the collinear ones; the number of pairs of cube edges that determine a plane is all pairs minus the skew ones. When the complement is a single clean condition, this is much shorter than casework.

[[complementary-counting|Counting the complement]] means computing $|\text{all}| - |\text{bad}|$. It works best when the bad objects are described by "none" or "all", since those conditions multiply. A four-digit number with no digit $7$ has $8$ choices for the first digit and $9$ for each other, so $8 \cdot 9^3 = 5832$ of the $9000$ four-digit numbers have no $7$, and $3168$ have at least one. A $3$-element subset of $\{1, \ldots, 10\}$ with at least one even number is any subset except the $\binom53 = 10$ all-odd ones: $120 - 10 = 110$. The direct count would add the subsets with one, two and three even numbers, three cases instead of one subtraction.

Complements also handle geometric and structural conditions. The triangles with vertices among some points are the triples that are not collinear, so count all triples and subtract the triples on a common line, grouped by line. Two segments determine a plane unless they are skew, so count the skew pairs. The diagonals of a polyhedron are the vertex pairs that are not edges or face diagonals. In each case the excluded set has a structure (lines, parallel classes, faces) that makes it easy to list.

A complement can be the wrong choice. If the bad set is itself a union of overlapping conditions, such as "some two people sit together", subtracting it needs inclusion-exclusion, and the third chapter takes that up. The test is simple: count the complement when its description is a single "none" or "all" condition, or a short list of disjoint pieces.

Make it a habit to ask, before any casework, whether the opposite condition is simpler. The next lesson organizes a count by a well-chosen parameter.`,
      related: [
        { card: "pie", note: String.raw`subtracting a complement that is itself a union of overlapping conditions (C3.1).` },
        { card: "handshakes-diagonals", note: String.raw`counting pairs that are not edges, the complement in polygon and polyhedron problems.` },
        { card: "binomial-row-sums", note: String.raw`all subsets number $2^n$, the usual "all" in a subset complement (C4.4).` }
      ],
      exercises: [
        { q: String.raw`How many four-digit numbers contain at least one digit $7$?`, answer: "3168",
          solution: String.raw`There are $9000$ four-digit numbers. Those with no $7$ have $8$ choices for the first digit (not $0$, not $7$) and $9$ for each of the others: $8 \cdot 729 = 5832$. So $9000 - 5832 = 3168$ have at least one $7$.` },
        { q: String.raw`How many $3$-element subsets of $\{1, 2, \ldots, 10\}$ contain at least one even number?`, answer: "110",
          solution: String.raw`All $3$-element subsets number $\binom{10}{3} = 120$, and those with no even number are subsets of the five odd numbers, $\binom53 = 10$. So $120 - 10 = 110$.` }
      ],
      problems: [
        "2018 AMC 12B, Problem 5",
        "2005 AMC 12B, Problem 11",
        "2019 AMC 12B, Problem 11",
        "2017 AIME I, Problem 1",
        "2004 AIME I, Problem 3",
        "2008 AIME I, Problem 7",
        "2022 AIME I, Problem 6"
      ]
    },
    "C1.4": {
      prereq: ["constructive-counting"],
      cards: ["counting-functions"],
      body: String.raw`Some counts become easy once the objects are sorted by one number that controls everything else: the smallest element of a set, the difference between two numbers, the largest value, the number of fixed points. How many pairs $a \lt b$ from $1$ to $20$ have $b - a \le 5$? How many sets have as many elements as their least element? How many functions satisfy $f(f(x)) = f(x)$? Each is a sum over the organizing parameter, and for each value of the parameter the count is a simple product.

Choosing the parameter is the main decision. It should be a quantity that, once fixed, makes the rest independent. For pairs with $b - a \le 5$, fix the difference $d$: there are $20 - d$ pairs with $b - a = d$, so the total is $19 + 18 + 17 + 16 + 15 = 85$. For subsets of $\{1, \ldots, 8\}$ with largest minus smallest equal to $4$, fix the smallest element $m$ (from $1$ to $4$); the largest is then $m + 4$, and any of the $3$ numbers between may be included, so the count is $4 \cdot 2^3 = 32$. Writing the count as a sum over the parameter is a double sum, and when it is easier, the order of summation can be swapped: count, for each element, how many objects contain it.

Functions are counted the same way. A function from an $n$-element set to a $k$-element set makes $n$ independent choices, so there are $k^n$ of them; a one-to-one function makes choices that shrink, $k(k - 1)\cdots(k - n + 1)$; these are the basic [[counting-functions|counts of functions and injections]]. Conditions on a function are organized by its structure. If $f(f(x)) = f(x)$, every value of $f$ is a fixed point, so fix the set of values, of size $j$: the $j$ values are fixed, and each of the other $n - j$ elements maps to one of them. On a $4$-element set this gives $\sum_j \binom4j j^{4 - j} = 4 + 24 + 12 + 1 = 41$. Conditions such as $f(f(f(x))) = f(f(x))$ add a layer: elements that reach a fixed point in at most two steps, organized by how many sit at each distance.

The skill is to look for the quantity that, once known, turns the problem into a product, and to check that the cases it defines are disjoint and cover everything. The next lesson counts objects that are each built several times.`,
      related: [
        { card: "double-summation", note: String.raw`swapping the order of a double sum, the same move as counting by element instead of by object (A3.3).` },
        { card: "double-counting", note: String.raw`counting one set two ways, the systematic form of reorganizing a count (C4.2).` },
        { card: "surjections", note: String.raw`functions that hit every value, counted by inclusion-exclusion (C2.5).` }
      ],
      exercises: [
        { q: String.raw`How many pairs of integers $(a, b)$ with $1 \le a \lt b \le 20$ satisfy $b - a \le 5$?`, answer: "85",
          solution: String.raw`Organize by $d = b - a$. For each $d$ from $1$ to $5$, $a$ runs from $1$ to $20 - d$, giving $20 - d$ pairs. The total is $19 + 18 + 17 + 16 + 15 = 85$.` },
        { q: String.raw`How many functions $f$ from $\{1, 2, 3, 4\}$ to itself satisfy $f(f(x)) = f(x)$ for every $x$?`, answer: "41",
          solution: String.raw`The condition says every value of $f$ is a fixed point. Choose the set of values, of size $j$, in $\binom4j$ ways; those are fixed, and each of the other $4 - j$ elements maps to one of the $j$ values. The count is $\binom41 1^3 + \binom42 2^2 + \binom43 3^1 + \binom44 4^0 = 4 + 24 + 12 + 1 = 41$.` },
        { q: String.raw`How many subsets $S$ of $\{1, 2, \ldots, 8\}$ have largest element minus smallest element equal to $4$?`, answer: "32",
          solution: String.raw`Organize by the smallest element $m$, which can be $1$, $2$, $3$ or $4$; the largest is then $m + 4$. Each of the $3$ numbers strictly between may or may not be in $S$: $2^3 = 8$ ways. The total is $4 \cdot 8 = 32$.` }
      ],
      problems: [
        "2023 AMC 12B, Problem 8",
        "1998 AIME, Problem 2",
        "2021 AIME I, Problem 3",
        "2024 AIME II, Problem 6",
        "2010 AIME I, Problem 7",
        "2018 AIME II, Problem 10"
      ]
    },
    "C1.5": {
      prereq: ["constructive-counting"],
      cards: ["uniform-overcount"],
      body: String.raw`Sometimes the natural way to build an object builds it several times. Splitting six people into three pairs by choosing a first pair, a second and a third builds each split in $3! = 6$ orders; counting squares by their vertex pairs counts each square once per pair of its vertices; counting a set of three cards by choosing two and completing the third counts each set three times. When every object is built the same number of times, the fix is a single division.

[[uniform-overcount|Counting with a uniform overcount]] counts ordered or labeled versions, which are easy, and divides by the number of versions of each object. Six people into three unlabeled pairs: choose the pairs in order, $\binom62\binom42\binom22 = 90$ ways, then divide by $3!$ because the order of the pairs does not matter, giving $15$. The same count comes from $\tfrac{6!}{2^3 \cdot 3!}$: line the people up, pair neighbors, and divide by the swaps within pairs and the orders of the pairs. The diagonals of a decagon: each vertex sends $7$ diagonals, so $10 \cdot 7 = 70$ counts each diagonal from both ends, and there are $35$.

The division is valid only when the overcount is truly uniform, every object built the same number of times. Two things break it. One is objects with symmetry: if some pairs are identical, or a square's vertex pairs include both sides and diagonals that build it differently, objects can be built different numbers of times. The other is ordered pieces of different kinds: committees of sizes $4$, $4$, $4$, $4$ are divided by $4!$, but committees of sizes $3$, $3$ and $2$ only by $2!$, because only the two committees of the same size can be swapped. Before dividing, check what is being permuted and that every object has the same number of versions.

A uniform overcount also gives quick probability and existence arguments. If shifting a configuration by $1$ modulo an odd number permutes the configurations and moves a sum through all residues, each residue class gets the same share, so the count is a total divided by the number of classes.

Use this method when the objects are unordered groupings, or when each object has a fixed number of natural "handles" to build it from. The last lesson of the chapter turns to processes that must be run or undone step by step.`,
      related: [
        { card: "multiset-permutations", note: String.raw`dividing by the orders of identical letters, the same idea for words (C2.1).` },
        { card: "burnsides-lemma", note: String.raw`the correct count when symmetry makes the overcount uneven (C4.3).` },
        { card: "handshakes-diagonals", note: String.raw`pairs counted from both ends and halved.` }
      ],
      exercises: [
        { q: String.raw`In how many ways can six people be split into three pairs?`, answer: "15",
          solution: String.raw`Choosing pairs in order gives $\binom62\binom42\binom22 = 15 \cdot 6 \cdot 1 = 90$. Each split is built in $3! = 6$ orders, so there are $\tfrac{90}{6} = 15$ splits.` },
        { q: String.raw`How many diagonals does a convex decagon have?`, answer: "35",
          solution: String.raw`Each of the $10$ vertices is joined by a diagonal to the $7$ vertices that are neither itself nor its neighbors, so $10 \cdot 7 = 70$ counts each diagonal from both ends. There are $\tfrac{70}{2} = 35$ diagonals.` }
      ],
      problems: [
        "2024 AMC 12B, Problem 16",
        "2021 Fall AMC 12A, Problem 25",
        "1993 AIME, Problem 8",
        "2002 AIME I, Problem 5",
        "1997 AIME, Problem 10"
      ]
    },
    "C1.6": {
      prereq: ["constructive-counting"],
      cards: ["simulate-the-process", "working-backwards"],
      body: String.raw`Some problems describe a process (a game, a dealing of cards, a sequence of operations, a table filled row by row) and ask about its outcome. There may be no formula; the reliable method is to run the process on small cases, record each state, and look for the pattern that makes the large case predictable. When the outcome is given and the start is asked for, run the process backward. Small cases also serve as a check on any formula found another way.

[[simulate-the-process|Simulating the process]] means doing exactly what the problem says, one step at a time, with a clear record of the state after each step. The state should be the smallest description that determines the future: the current number in a doubling game, the list of remaining cards, the row of a table. Ten people stand in a circle, and starting with person $2$ every second person is removed until one remains. Removing $2, 4, 6, 8, 10$, then $3, 7$, then $1, 9$ leaves person $5$. Running the same process for $n = 1, 2, \ldots, 8$ shows the pattern: the survivor is $2(n - 2^k) + 1$ where $2^k$ is the largest power of $2$ not above $n$, which gives $2 \cdot 2 + 1 = 5$ for $n = 10$. Simulation finds patterns, and the pattern is then proved or at least checked on a case not used to find it.

[[working-backwards|Working backwards]] undoes the steps from the end. If each step is an invertible map, the start is the end with the inverses applied in reverse order. A number is doubled and decreased by $3$, three times in all, and the result is $19$: undo by adding $3$ and halving, $19 \to 11 \to 7 \to 5$, so the start was $5$. Dealing cards from the top and moving the next card to the bottom is undone by moving the bottom card to the top and placing the next lower card on top. When a step is not invertible, working backwards still lists all the states that could lead to a given one, as for $f(x) = 2x$ on $[0, \tfrac12]$ and $2 - 2x$ on $[\tfrac12, 1]$, where each value has exactly two preimages, so the number of solutions doubles with each application.

Small cases are also the honest check of completeness. After a casework count, run the same casework on a small version of the problem whose answer can be listed by hand; a mismatch shows a missing or doubled case.

Simulate when the process is simple to run and the question is about where it ends; work backwards when the end is known; and always test a count on a small case. The Summary (C1.7) collects the chapter's strategies, and the next chapter turns to arrangements and selections.`,
      related: [
        { card: "cycle-hunting", note: String.raw`finding the period of a process that repeats (N3.1).` },
        { card: "recursive-counting", note: String.raw`turning the pattern of small cases into a recursion (C5.2).` },
        { card: "backward-induction", note: String.raw`working backwards through the positions of a game (C5.4).` }
      ],
      exercises: [
        { q: String.raw`A number is doubled and then decreased by $3$; this is done three times in all, and the result is $19$. What was the starting number?`, answer: "5",
          solution: String.raw`Undo each step by adding $3$ and halving: $19 \to 11 \to 7 \to 5$. Check: $5 \to 7 \to 11 \to 19$.` },
        { q: String.raw`Ten people numbered $1$ to $10$ stand in a circle. Starting with person $2$, every second person still standing is removed, going around the circle, until one remains. Who remains?`, answer: "5",
          solution: String.raw`The first pass removes $2, 4, 6, 8, 10$. Continuing from $1$, the next removed are $3$ and $7$ (skipping $1$, $5$, $9$), then $1$ and $9$. Person $5$ remains. (The pattern from small cases, survivor $2(n - 2^k) + 1$ with $2^k = 8$, also gives $5$.)` }
      ],
      problems: [
        "2016 AMC 12B, Problem 7",
        "2012 AMC 12B, Problem 14",
        "2015 AMC 12B, Problem 20",
        "2005 AMC 12A, Problem 20",
        "2012 AMC 12B, Problem 24",
        "2000 AIME I, Problem 15"
      ]
    },
    "C1.7": {
      prereq: ["constructive-counting", "complementary-counting", "counting-functions", "uniform-overcount", "simulate-the-process", "working-backwards"],
      cards: [],
      body: String.raw`[[constructive-counting|Constructive counting]] builds each object by a sequence of decisions and multiplies the options, which is valid when the number of options at each step does not depend on earlier choices and different sequences give different objects. When a count does depend on an earlier choice, the objects are split into disjoint cases at that choice and the cases are added.

[[complementary-counting|The complement]] is the total minus the unwanted objects. It is the right tool when the unwanted objects are described by one "none" or "all" condition, or by a few disjoint pieces such as the collinear triples on each line; when they form an overlapping union, inclusion-exclusion is needed instead.

An organizing parameter is a number, such as a difference, the smallest element or the set of values of a function, that once fixed makes the rest a product. The count is a sum over the parameter, and [[counting-functions|functions]] are counted this way, by the structure their conditions force.

A [[uniform-overcount|uniform overcount]] counts ordered or labeled versions and divides by the number of versions of each object. It is correct only when every object has the same number of versions, which fails when parts of the same kind can be swapped and parts of different kinds cannot.

[[simulate-the-process|Simulating a process]] on small cases finds the pattern of a process and checks a count; [[working-backwards|working backwards]] undoes the steps when the end is known, and lists every state that could lead to a given one when a step is not invertible.`,
      strategies: [
        String.raw`Describe how to build one object, decision by decision, before counting anything.`,
        String.raw`Make the most restricted decision first.`,
        String.raw`Split into cases exactly where a number of options would depend on an earlier choice, and check that the cases are disjoint and cover everything.`,
        String.raw`Before any casework, ask whether the opposite condition is a single "none" or "all"; if so, count it and subtract.`,
        String.raw`Look for one quantity that, once fixed, turns the rest of the count into a product, and sum over its values.`,
        String.raw`If it is easier to count ordered or labeled versions, do so, then divide by the number of versions of each object, after checking that this number is the same for every object.`,
        String.raw`For a process, record the smallest state that decides the future, and run it on small cases until a pattern shows.`,
        String.raw`When the end of a process is given, run it backward.`,
        String.raw`Test every count on a small version of the problem that can be listed by hand.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many five-digit numbers have no two adjacent digits equal?`, answer: "59049",
        solution: String.raw`Choose the digits from left to right. The first digit has $9$ options (not $0$), and each later digit has $9$ options (any digit except the one before it), whatever came earlier. The count is $9 \cdot 9^4 = 9^5 = 59049$.` },
      { q: String.raw`How many four-digit multiples of $5$ contain at least one digit $3$?`, answer: "504",
        solution: String.raw`A four-digit multiple of $5$ has first digit $1$ to $9$, two free middle digits, and last digit $0$ or $5$: $9 \cdot 10 \cdot 10 \cdot 2 = 1800$ numbers. Those with no $3$ have $8$ options for the first digit, $9$ for each middle digit and $2$ for the last: $8 \cdot 9 \cdot 9 \cdot 2 = 1296$. So $1800 - 1296 = 504$ contain a $3$.` },
      { q: String.raw`How many triples of integers $1 \le a \lt b \lt c \le 10$ satisfy $c - a = 5$?`, answer: "20",
        solution: String.raw`Organize by $a$, which can be $1$ to $5$ since $c = a + 5 \le 10$. Then $b$ is any of the $4$ integers strictly between $a$ and $a + 5$. The count is $5 \cdot 4 = 20$.` },
      { q: String.raw`In how many ways can eight people be split into two groups of three and one group of two?`, answer: "280",
        solution: String.raw`Choose a first group of three, a second group of three, and the pair: $\binom83\binom53\binom22 = 56 \cdot 10 \cdot 1 = 560$. The two groups of three can be swapped without changing the split, but the pair cannot be swapped with either, so each split is built exactly twice. There are $\tfrac{560}{2} = 280$ splits.` },
      { q: String.raw`Starting from a positive integer, a step halves the number if it is even and replaces $n$ by $3n + 1$ if it is odd. For how many starting numbers is $1$ reached for the first time after exactly $7$ steps?`, answer: "4",
        solution: String.raw`Work backwards from $1$. A number $m$ is reached from $2m$, and also from $\tfrac{m - 1}{3}$ when that is an odd integer greater than $1$. The numbers $1$ step before $1$ form the set $\{2\}$; then $\{4\}$; then $\{8\}$ (since $\tfrac{4 - 1}{3} = 1$ would reach $1$ too early); then $\{16\}$; then $\{32, 5\}$; then $\{64, 10\}$ (from $5$ only $10$, since $\tfrac43$ is not an integer); then $\{128, 21, 20, 3\}$. So $4$ numbers work: $3, 20, 21, 128$.` }
    ],
    problems: [
      "2001 AIME II, Problem 1"
    ]
  },
  challenge: {
    problems: [
      "2019 AIME I, Problem 4",
      "2014 AIME I, Problem 5",
      "2022 AMC 12B, Problem 17",
      "2025 AIME II, Problem 3",
      "2024 AMC 12A, Problem 22"
    ]
  }
};
