// Learn, AMC Counting & Probability, chapter R1: counting (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R1"] = {
  lessons: {
    "R1.1": {
      prereq: [],
      cards: ["permutations-combinations", "constructive-counting", "counting-functions", "fencepost-counting"],
      body: String.raw`Counting on the AMC starts with two rules: multiply the numbers of choices for decisions made in sequence, and add the counts of separate cases. Every formula in this chapter is one of these rules used cleverly.

[[constructive-counting|Constructive counting]] builds each object by a sequence of decisions and multiplies. A four-letter code with no repeated letters has $26 \cdot 25 \cdot 24 \cdot 23 = 358800$ choices. Make the most restricted decision first (a first digit that cannot be $0$, a last digit that must be even), and split into cases when a later count depends on an earlier choice.

[[permutations-combinations|Permutations and combinations]] are the two standard selections: ordered selections of $k$ from $n$ number $\tfrac{n!}{(n - k)!}$, unordered ones $\binom nk$, because each group appears in $k!$ orders. Choosing $4$ of $9$ people for a team gives $\binom94 = 126$.

[[counting-functions|Functions]] from a $3$-element set to a $4$-element set number $4^3 = 64$, since each input picks its output; one-to-one functions number $4 \cdot 3 \cdot 2 = 24$. The same count describes coloring $3$ objects with $4$ colors.

[[fencepost-counting|Fencepost counting]] avoids the most common off-by-one error: the integers from $15$ to $87$ inclusive number $87 - 15 + 1 = 73$, a row of $n$ posts has $n - 1$ gaps, and a closed loop has as many gaps as posts.

Multiply for sequences of choices, divide by orders that do not matter, and count endpoints carefully. The next lesson splits counts into cases.`,
      related: [
        { card: "multiset-permutations", note: String.raw`arrangements with repeated objects (R1.3).` },
        { card: "binomial-theorem", note: String.raw`binomial coefficients as coefficients (R1.4).` },
        { card: "basic-probability", note: String.raw`probability as a ratio of counts (R2.1).` }
      ],
      exercises: [
        { q: String.raw`How many four-letter codes can be made from the $26$ letters if no letter repeats?`, answer: "358800",
          solution: String.raw`$26 \cdot 25 \cdot 24 \cdot 23 = 358800$.` },
        { q: String.raw`How many integers are there from $15$ to $87$ inclusive?`, answer: "73",
          solution: String.raw`$87 - 15 + 1 = 73$.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 1",
        "2007 AMC 10B, Problem 8",
        "2020 AMC 12A, Problem 4",
        "2025 AMC 12A, Problem 6",
        "2006 AMC 12B, Problem 9",
        "2004 AMC 12A, Problem 13",
        "2019 AMC 10B, Problem 25"
      ]
    },
    "R1.2": {
      prereq: ["permutations-combinations"],
      cards: ["casework-method", "complementary-counting", "inclusion-exclusion", "pie", "uniform-overcount"],
      body: String.raw`When a count does not fit a formula, split it into cases, count what is not wanted, or correct for overlaps. Choosing among these is the main skill in AMC counting.

[[casework-method|Casework]] splits the objects by one feature into separate groups, counts each, and adds; good cases are few, clearly disjoint and easy. [[complementary-counting|Counting the complement]] subtracts the unwanted outcomes from the total: four-digit numbers with at least one repeated digit are $9000$ minus the $9 \cdot 9 \cdot 8 \cdot 7 = 4536$ with all digits different, so $4464$.

[[inclusion-exclusion|Inclusion-exclusion]] corrects for overlaps: $|A \cup B| = |A| + |B| - |A \cap B|$, and for three sets add back the triple overlap. The integers from $1$ to $200$ divisible by $4$ or $6$ number $50 + 33 - 16 = 67$, where $16$ counts multiples of $12$. [[pie|Counting with inclusion-exclusion]] sets this up for "none of several properties": subtract the single properties, add back pairs, subtract triples.

A [[uniform-overcount|uniform overcount]] is fixed by dividing: splitting $8$ people into $4$ unlabeled pairs, choose pairs in order and divide by the $4!$ orders and the $2$ orders within each pair, $\tfrac{8!}{2^4 \cdot 4!} = 105$.

Choose the case split, the complement or inclusion-exclusion, and check on a small version. The next lesson handles arrangements with restrictions.`,
      related: [
        { card: "derangements", note: String.raw`inclusion-exclusion for permutations with no fixed point (R1.3).` },
        { card: "floor-multiples", note: String.raw`counting multiples for inclusion-exclusion (M1.3).` },
        { card: "organized-listing", note: String.raw`listing cases in order .` }
      ],
      exercises: [
        { q: String.raw`How many integers from $1$ to $200$ are divisible by $4$ or $6$?`, answer: "67",
          solution: String.raw`$\lfloor 200/4 \rfloor + \lfloor 200/6 \rfloor - \lfloor 200/12 \rfloor = 50 + 33 - 16 = 67$.` },
        { q: String.raw`How many four-digit numbers have at least two equal digits?`, answer: "4464",
          solution: String.raw`All four-digit numbers: $9000$. With all digits different: $9 \cdot 9 \cdot 8 \cdot 7 = 4536$. So $9000 - 4536 = 4464$.` },
        { q: String.raw`In how many ways can $8$ people be split into $4$ pairs?`, answer: "105",
          solution: String.raw`Line them up and pair neighbors, $8!$ ways, then divide by the $2^4$ orders within pairs and the $4!$ orders of the pairs: $\tfrac{40320}{16 \cdot 24} = 105$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 2",
        "2014 AMC 12A, Problem 3",
        "2013 AMC 10A, Problem 13",
        "2009 AMC 12B, Problem 10",
        "2017 AMC 10A, Problem 19",
        "2013 AMC 12A, Problem 15",
        "2025 AMC 12B, Problem 17",
        "2021 Fall AMC 12B, Problem 19"
      ]
    },
    "R1.3": {
      prereq: ["permutations-combinations"],
      cards: ["multiset-permutations", "gap-method", "counting-blocks", "circular-permutations", "non-adjacent-selection", "derangements"],
      body: String.raw`Restrictions on arrangements, such as repeated letters, people who must sit together or apart, seats around a circle, or nobody in their own place, each have a standard fix.

[[multiset-permutations|Repeated objects]]: divide by the orders of identical copies, so LEVEL has $\tfrac{5!}{2!\,2!} = 30$ arrangements. [[counting-blocks|Objects that stay together]]: glue them into a block, arrange the units, then arrange inside the block. [[gap-method|Objects that stay apart]]: arrange the others, then choose gaps for the separated ones. [[non-adjacent-selection|Choosing $k$ of $n$ objects in a row with no two adjacent]] gives $\binom{n - k + 1}{k}$ ways; $3$ of $10$ gives $\binom83 = 56$.

[[circular-permutations|Around a circle]], rotations are usually the same, so $n$ people can be seated in $(n - 1)!$ ways: fix one person and arrange the rest in a row. Seven people give $6! = 720$. If reflections also count as the same, divide by $2$ more.

[[derangements|Derangements]] are permutations with nothing in its original place. Their numbers $D_1, D_2, \ldots$ are $0, 1, 2, 9, 44, 265$, from inclusion-exclusion or the recursion $D_n = (n - 1)(D_{n-1} + D_{n-2})$. Four letters in the wrong envelopes: $9$ ways.

Divide for repeats, glue for together, gap for apart, fix one seat for circles. The next lesson distributes identical objects.`,
      related: [
        { card: "pie", note: String.raw`the inclusion-exclusion behind derangements (R1.2).` },
        { card: "necklace-formula", note: String.raw`circular arrangements with identical beads (C2.3).` },
        { card: "recursive-counting", note: String.raw`recursions for arrangements (R1.5).` }
      ],
      exercises: [
        { q: String.raw`How many arrangements of the letters of LEVEL are there?`, answer: "30",
          solution: String.raw`Five letters with two L's and two E's: $\tfrac{5!}{2!\,2!} = 30$.` },
        { q: String.raw`In how many ways can $3$ of $10$ chairs in a row be chosen with no two adjacent?`, answer: "56",
          solution: String.raw`$\binom{10 - 3 + 1}{3} = \binom83 = 56$.` }
      ],
      problems: [
        "2018 AMC 10A, Problem 4",
        "2009 AMC 10B, Problem 11",
        "2025 AMC 10B, Problem 16",
        "2014 AMC 12A, Problem 13",
        "2012 AMC 10A, Problem 20",
        "2008 AMC 10B, Problem 22",
        "2015 AMC 12A, Problem 17",
        "2021 Fall AMC 12A, Problem 18"
      ]
    },
    "R1.4": {
      prereq: ["permutations-combinations"],
      cards: ["stars-and-bars", "balls-boxes-table", "pascals-identity", "binomial-row-sums", "hockey-stick", "binomial-theorem", "bijection-method"],
      body: String.raw`Distributing identical objects into groups, and the identities of Pascal's triangle, are the heart of intermediate AMC counting. Both rest on binomial coefficients.

[[stars-and-bars|Stars and bars]] counts nonnegative solutions of $x_1 + \cdots + x_k = n$ as $\binom{n + k - 1}{k - 1}$: $a + b + c = 8$ has $\binom{10}{2} = 45$. Positive solutions number $\binom{n - 1}{k - 1}$. The [[balls-boxes-table|table of distributions]] organizes the cases: identical or distinct objects, identical or distinct boxes, empty boxes allowed or not.

Pascal's triangle has its own identities. [[pascals-identity|Pascal's identity]] $\binom nk = \binom{n-1}{k-1} + \binom{n-1}k$ builds the triangle; the [[binomial-row-sums|row sums]] are $2^n$; the [[hockey-stick|hockey stick]] sums a diagonal, $\binom22 + \binom32 + \cdots + \binom{10}2 = \binom{11}3 = 165$. The [[binomial-theorem|binomial theorem]] $(x + y)^n = \sum\binom nk x^{n-k}y^k$ gives coefficients: in $(2x + 1)^6$ the coefficient of $x^3$ is $\binom63 \cdot 2^3 = 160$.

A [[bijection-method|bijection]] counts a set by matching it with an easier one: increasing digit strings match subsets of the digits, lattice paths match words in two letters, and distributions match stars and bars.

Write a distribution as stars and bars, read sums of binomial coefficients as identities, and match hard sets with easy ones. The next lesson builds counts recursively.`,
      related: [
        { card: "grid-paths", note: String.raw`lattice paths as binomial coefficients (R1.5).` },
        { card: "stars-bars-upper-bound", note: String.raw`distributions with upper bounds (R3.1).` },
        { card: "vandermonde", note: String.raw`more binomial identities (R3.2).` }
      ],
      exercises: [
        { q: String.raw`How many solutions in nonnegative integers does $a + b + c = 8$ have?`, answer: "45",
          solution: String.raw`Stars and bars: $\binom{8 + 2}{2} = 45$.` },
        { q: String.raw`Find $\binom22 + \binom32 + \cdots + \binom{10}{2}$.`, answer: "165",
          solution: String.raw`By the hockey stick identity the sum is $\binom{11}{3} = 165$.` },
        { q: String.raw`Find the coefficient of $x^3$ in $(2x + 1)^6$.`, answer: "160",
          solution: String.raw`$\binom63(2x)^3 = 20 \cdot 8x^3$, so $160$.` }
      ],
      problems: [
        "2022 AMC 10B, Problem 3",
        "2018 AMC 10A, Problem 11",
        "2017 AMC 12B, Problem 11",
        "2025 AMC 10A, Problem 19",
        "2010 AMC 10A, Problem 22",
        "2011 AMC 10B, Problem 23",
        "2020 AMC 10B, Problem 25",
        "2006 AMC 12A, Problem 23"
      ]
    },
    "R1.5": {
      prereq: ["permutations-combinations"],
      cards: ["recursive-counting", "tiling-a-board", "grid-paths", "grid-path-fill", "backward-induction", "simulate-the-process", "working-backwards"],
      body: String.raw`Some counts are found by building up from smaller cases, some processes by running them or undoing them, and some games by labeling positions from the end. These step-by-step methods handle problems that formulas cannot.

[[recursive-counting|Recursive counting]] relates the count for size $n$ to smaller sizes by asking about the last step. Climbing $n$ stairs one or two at a time: the last step is $1$ or $2$, so $a_n = a_{n-1} + a_{n-2}$, the Fibonacci numbers, and $8$ stairs give $34$ ways. [[tiling-a-board|Tilings]] of a $2 \times n$ board by dominoes follow the same recursion.

[[grid-paths|Lattice paths]] with right and up steps from $(0, 0)$ to $(4, 3)$ number $\binom73 = 35$. With obstacles, [[grid-path-fill|fill the grid]]: each point's count is the sum of the counts at the points leading into it, blocked points get $0$.

[[backward-induction|Games are solved backward]]: a position is losing if every move leads to a winning position for the opponent. If each turn removes $1$ to $4$ stones and the last stone wins, the losing positions are the multiples of $5$, so from $1$ to $40$ the first player loses only from the $8$ multiples of $5$.

[[simulate-the-process|Simulate]] a process for small cases to find its pattern, and [[working-backwards|work backwards]] from a known end: undo each step in reverse order.

Build from small cases, fill tables, and run processes in both directions. The last lesson of the chapter treats subsets, graphs and pigeonhole.`,
      related: [
        { card: "first-order-recurrence", note: String.raw`solving the recursions counting produces (L6.4).` },
        { card: "linear-recurrence", note: String.raw`closed forms like Binet's formula (L11.3).` },
        { card: "states-recursion-prob", note: String.raw`the probability version, with states (R3.5).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a staircase of $8$ steps be climbed taking $1$ or $2$ steps at a time?`, answer: "34",
          solution: String.raw`$a_n = a_{n-1} + a_{n-2}$ with $a_1 = 1$, $a_2 = 2$: $3, 5, 8, 13, 21, 34$, so $a_8 = 34$.` },
        { q: String.raw`How many up-and-right lattice paths go from $(0, 0)$ to $(4, 3)$?`, answer: "35",
          solution: String.raw`A path is a word with $4$ R's and $3$ U's: $\binom73 = 35$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 3",
        "2002 AMC 10A, Problem 6",
        "2021 Spring AMC 10B, Problem 9",
        "2015 AMC 12B, Problem 4",
        "2009 AMC 10B, Problem 14",
        "2011 AMC 10A, Problem 23",
        "2012 AMC 10B, Problem 25",
        "2011 AMC 12B, Problem 23"
      ]
    },
    "R1.6": {
      prereq: ["permutations-combinations"],
      cards: ["subset-avoiding-relation", "subset-sum-facts", "handshake-lemma", "eulerian-paths", "round-robin-tournaments", "pigeonhole", "pairing-to-bound", "coloring-arguments"],
      body: String.raw`The last group of counting tools concerns subsets, graphs and guarantees: how many subsets avoid a forbidden pair, how many handshakes happen, when a route uses every road once, and how many objects guarantee a repeat.

A [[subset-avoiding-relation|subset avoiding a relation]] is counted by grouping the forbidden pairs. In $\{1, \ldots, 8\}$ the pairs adding to $9$ are four disjoint pairs, and from each a subset takes neither element or one, $3$ ways, so $3^4 = 81$ subsets have no two elements adding to $9$. [[subset-sum-facts|Subset sums]] are counted element by element: each element is in half of all subsets.

The [[handshake-lemma|handshake lemma]]: degrees add to twice the number of edges, so $10$ people each shaking $3$ hands make $15$ handshakes. A route using every edge once, an [[eulerian-paths|Eulerian path]], exists in a connected graph exactly when $0$ or $2$ vertices have odd degree. In a [[round-robin-tournaments|round robin]] of $n$ teams there are $\binom n2$ games and the wins add to that number.

The [[pigeonhole|pigeonhole principle]]: $n + 1$ objects in $n$ boxes put two in one box, so $6$ socks of $5$ colors include a pair. [[pairing-to-bound|Pairing elements]] builds the boxes: with the pairs $\{1, 8\}, \{2, 7\}, \ldots$, any $5$ numbers from $1$ to $8$ include two adding to $9$. [[coloring-arguments|Coloring arguments]] prove impossibility: a checkerboard with two opposite corners removed cannot be covered by dominoes, since each domino covers one square of each color.

Group forbidden pairs, count edge ends, and build pigeonholes. The next chapter turns counts into probabilities.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`subsets avoiding consecutive elements (R1.3).` },
        { card: "graph-coloring", note: String.raw`coloring graphs with neighbors different (R3.3).` },
        { card: "invariants-coloring", note: String.raw`quantities a process cannot change (R3.3).` }
      ],
      exercises: [
        { q: String.raw`How many subsets of $\{1, 2, \ldots, 8\}$ (including the empty set) contain no two numbers that add to $9$?`, answer: "81",
          solution: String.raw`The pairs $\{1, 8\}, \{2, 7\}, \{3, 6\}, \{4, 5\}$ are disjoint, and from each the subset takes nothing or one element: $3^4 = 81$.` },
        { q: String.raw`Ten people each shake hands with exactly three others. How many handshakes are there?`, answer: "15",
          solution: String.raw`The degrees add to $30$, twice the number of handshakes, so $15$.` },
        { q: String.raw`A drawer has socks in $5$ colors. How many must be drawn to be sure of two of the same color?`, answer: "6",
          solution: String.raw`Five socks can all be different; six must repeat a color by pigeonhole.` }
      ],
      problems: [
        "2010 AMC 10B, Problem 3",
        "2011 AMC 10B, Problem 11",
        "2012 AMC 10A, Problem 14",
        "2016 AMC 10B, Problem 15",
        "2023 AMC 10A, Problem 18",
        "2015 AMC 12A, Problem 13",
        "2025 AMC 10A, Problem 21",
        "2012 AMC 12A, Problem 17"
      ]
    }
  }
};
