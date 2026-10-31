// Learn, AIME Counting & Probability, chapter C3: inclusion-exclusion and complements (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C3"] = {
  lessons: {
    "C3.1": {
      prereq: ["complementary-counting"],
      cards: [],
      body: String.raw`This chapter counts objects that satisfy at least one of several conditions that overlap, and objects that satisfy none of them. Its tool is inclusion-exclusion, together with the complement and the choice between counting directly and counting what is left out.

If two sets overlap, adding their sizes counts the common part twice, so $|A \cup B| = |A| + |B| - |A \cap B|$. Of the numbers from $1$ to $100$, there are $50$ multiples of $2$ and $33$ multiples of $3$, and the $16$ multiples of $6$ are in both, so $50 + 33 - 16 = 67$ numbers are multiples of $2$ or $3$. With three sets the triple overlap is added back after the pairs are subtracted, and in general the sizes of the single sets, the pairs, the triples, and so on are added and subtracted in turn. The method pays when the overlaps are easy to count, as multiples of a least common multiple are.

Counting the objects with none of the conditions is the complement of the union: the total minus the union. A permutation in which no object keeps its place is the standard example. Each object staying in place is one condition, the permutations that keep a given set of objects in place are easy to count, and inclusion-exclusion gives the permutations that keep none.

Conditions come in strengths: at least one, exactly one, at most one, none. Each can be turned into the others by complements and by inclusion-exclusion, so the first decision is which one to count. A last kind of condition forbids pairs, such as two chosen numbers that add to $11$; drawing each forbidden pair as an edge often splits the problem into independent pieces.

The lessons take these ideas in turn: inclusion-exclusion with two and three sets (C3.2), derangements and forbidden positions (C3.3), at least, at most and exactly (C3.4), and when a complement beats casework (C3.5). The Summary (C3.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many integers from $1$ to $1000$ are divisible by $3$, $5$ or $7$?`, answer: "543",
          solution: String.raw`There are $333$ multiples of $3$, $200$ of $5$ and $142$ of $7$. A number divisible by two of them is a multiple of their product: $66$ multiples of $15$, $47$ of $21$ and $28$ of $35$. There are $9$ multiples of $105$. By inclusion-exclusion the count is $333 + 200 + 142 - 66 - 47 - 28 + 9 = 543$.` },
        { q: String.raw`How many integers from $1$ to $30$ are divisible by exactly one of $2$ and $3$?`, answer: "15",
          solution: String.raw`There are $15$ multiples of $2$ and $10$ of $3$, and the $5$ multiples of $6$ are in both. "Exactly one" removes the common part from each set, so the count is $15 + 10 - 2 \cdot 5 = 15$.` },
        { q: String.raw`Four letters are put into four addressed envelopes, one in each. In how many ways does no letter go into its own envelope?`, answer: "9",
          solution: String.raw`There are $4! = 24$ placements. If a given set of $k$ letters is in place, the other $4 - k$ can go anywhere: $(4 - k)!$ ways. Inclusion-exclusion over the letters in place gives $24 - \binom41 \cdot 6 + \binom42 \cdot 2 - \binom43 \cdot 1 + \binom44 \cdot 1 = 24 - 24 + 12 - 4 + 1 = 9$.` }
      ],
      problems: [
        "2004 AMC 12B, Problem 4",
        "2025 AMC 12B, Problem 13",
        "2014 AIME II, Problem 2"
      ]
    },
    "C3.2": {
      prereq: ["complementary-counting"],
      cards: ["inclusion-exclusion", "pie"],
      body: String.raw`When the objects to be counted satisfy at least one of several overlapping conditions, adding the counts for each condition counts the overlaps more than once. How many numbers up to $1000$ are divisible by $3$, $5$ or $7$? How many residents own at least one of four items, given how many own each? How many numbers below some bound are not squares, cubes or fifth powers? The correction is inclusion-exclusion: add the single conditions, subtract the pairs, add back the triples, and so on.

The [[inclusion-exclusion|principle of inclusion-exclusion]] says $|A \cup B| = |A| + |B| - |A \cap B|$, and for three sets $|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$. In general, the size of a union is the alternating sum, over all nonempty groups of the sets, of the size of their intersection. The reason is that an object in exactly $m$ of the sets is counted $\binom m1 - \binom m2 + \binom m3 - \cdots = 1$ time. The numbers up to $1000$ divisible by $3$, $5$ or $7$: $333 + 200 + 142 - 66 - 47 - 28 + 9 = 543$, where each intersection is a count of multiples of a product, $\left\lfloor \tfrac{1000}{15} \right\rfloor = 66$ and so on.

[[pie|Counting with inclusion-exclusion]] is the method of setting this up. Name the bad properties $P_1, \ldots, P_k$ so that the wanted objects are those with none of them, compute the number of objects with each chosen group of properties, and combine: the count with none is $N - \sum|P_i| + \sum|P_i \cap P_j| - \cdots$. The method pays off when the intersections are easy, which usually happens when the problem is symmetric so that every group of $j$ properties has the same count: then the formula is $\sum_j (-1)^j\binom kj N_j$. Numbers up to $100$ divisible by none of $2$, $3$, $5$: $100 - (50 + 33 + 20) + (16 + 10 + 6) - 3 = 26$.

The formula also runs in reverse. If the problem gives the sizes of the sets and of the union, or the number of objects in exactly one, exactly two and exactly three sets, the unknown is an intersection, and the principle is an equation for it. With two sets, $|A \cap B| = |A| + |B| - |A \cup B|$, so the overlap is smallest when the union is as large as possible. With several sets, count incidences: the sum of the set sizes counts each object once for every set it is in, so it equals $1 \cdot (\text{number in exactly one}) + 2 \cdot (\text{exactly two}) + \cdots$, a double count that often gives the missing equation.

Use inclusion-exclusion when the condition is "at least one of" several properties whose intersections are easy to count, and when the problem gives some of these sizes and asks for another. The next lesson applies it to permutations with forbidden positions.`,
      related: [
        { card: "floor-multiples", note: String.raw`counting the multiples of $d$ up to $n$, the size of each intersection in divisibility problems.` },
        { card: "double-counting", note: String.raw`counting incidences two ways, the source of the reverse equations (C4.3).` },
        { card: "eulers-totient", note: String.raw`the count of numbers coprime to $n$ is inclusion-exclusion over the prime factors.` }
      ],
      exercises: [
        { q: String.raw`How many of the integers $1, 2, \ldots, 1000$ are divisible by $3$, $5$ or $7$?`, answer: "543",
          solution: String.raw`Multiples of $3$, $5$, $7$: $333$, $200$, $142$. Of $15$, $21$, $35$: $66$, $47$, $28$. Of $105$: $9$. By inclusion-exclusion, $333 + 200 + 142 - 66 - 47 - 28 + 9 = 543$.` },
        { q: String.raw`How many of the integers $1, 2, \ldots, 100$ are divisible by none of $2$, $3$, $5$?`, answer: "26",
          solution: String.raw`Those divisible by at least one number $50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$, using multiples of $6$, $10$, $15$ and $30$ for the overlaps. So $100 - 74 = 26$ are divisible by none.` }
      ],
      problems: [
        "2016 AMC 12A, Problem 11",
        "2001 AMC 12, Problem 12",
        "2005 AMC 12A, Problem 18",
        "2010 AMC 12A, Problem 9",
        "1990 AIME, Problem 1",
        "2017 AIME II, Problem 1",
        "2001 AIME II, Problem 2",
        "2005 AIME II, Problem 4",
        "2024 AIME II, Problem 1"
      ]
    },
    "C3.3": {
      prereq: ["pie"],
      cards: ["derangements"],
      body: String.raw`A permutation in which nothing stays in its original place is a derangement: letters in the wrong envelopes, people who all take someone else's hat, a seating in which no one keeps a seat. More generally, a problem may forbid certain positions, such as no one sitting next to a former neighbor, or no sibling pair in the same row. Inclusion-exclusion over the forbidden events gives the count, and for derangements it gives a formula and a recursion worth knowing.

The [[derangements|derangement]] numbers $D_n$ count permutations of $n$ objects with no fixed point. Let $P_i$ be the event that object $i$ is fixed; any $j$ chosen objects are all fixed in $(n - j)!$ permutations, so by inclusion-exclusion $D_n = \sum_{j=0}^{n}(-1)^j\binom nj(n - j)! = n!\left(1 - \tfrac1{1!} + \tfrac1{2!} - \cdots + \tfrac{(-1)^n}{n!}\right)$. The first values are $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$, $D_6 = 265$, and they satisfy $D_n = (n - 1)(D_{n-1} + D_{n-2})$: object $1$ goes to some position $k$ ($n - 1$ choices), and then either $k$ goes to position $1$ (leaving a derangement of $n - 2$) or it does not (a derangement of $n - 1$). The probability that a random permutation is a derangement approaches $\tfrac1e \approx 0.368$ quickly, already $\tfrac{44}{120}$ for $n = 5$.

Exact numbers of fixed points follow: a permutation of $n$ objects with exactly $k$ fixed points is a choice of the $k$ fixed ones and a derangement of the rest, $\binom nk D_{n-k}$. For $n = 6$ and $k = 2$ that is $15 \cdot 9 = 135$. When the objects come in types, such as diners who ordered beef, chicken or fish, "nobody gets the right meal" is a derangement of types rather than individuals, and the count is a small casework on how many of each type go to each other type.

Other forbidden positions are handled the same way. Name the forbidden events (a given pair adjacent, a given person in a given seat), count the arrangements in which a chosen group of them all happen, often by gluing blocks, and combine with alternating signs. Gluing $k$ chosen adjacent pairs into blocks leaves fewer units to arrange, which is why the counts for groups of events are easy even when the events overlap in complicated ways.

Use the derangement numbers when every object has one forbidden place, and inclusion-exclusion over forbidden events in general. The next lesson counts "exactly" and "at most" conditions, and subsets that avoid a relation.`,
      related: [
        { card: "expected-fixed-points", note: String.raw`a random permutation has on average one fixed point, whatever $n$ is (C7.3).` },
        { card: "counting-blocks", note: String.raw`gluing a forbidden adjacent pair into one block to count arrangements where it happens.` },
        { card: "recursive-counting", note: String.raw`the recursion for $D_n$ comes from asking where the first object goes (C5.2).` }
      ],
      exercises: [
        { q: String.raw`Five letters are put into five addressed envelopes, one per envelope. In how many ways does no letter go into its own envelope?`, answer: "44",
          solution: String.raw`This is $D_5 = 5!\left(1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} - \tfrac1{120}\right) = 60 - 20 + 5 - 1 = 44$. The recursion gives the same: $D_5 = 4(D_4 + D_3) = 4(9 + 2) = 44$.` },
        { q: String.raw`How many permutations of $1, 2, \ldots, 6$ have exactly two fixed points?`, answer: "135",
          solution: String.raw`Choose the two fixed points, $\binom62 = 15$ ways; the other four must form a derangement, $D_4 = 9$ ways. The count is $15 \cdot 9 = 135$.` }
      ],
      problems: [
        "2018 AMC 10B, Problem 18",
        "2021 Spring AMC 10B, Problem 22",
        "2012 AIME I, Problem 3",
        "2020 AIME II, Problem 9"
      ]
    },
    "C3.4": {
      prereq: ["pie", "binomial-row-sums"],
      cards: ["subset-avoiding-relation", "subset-sum-facts"],
      body: String.raw`Counting conditions come in several strengths: at least one, at most one, exactly one, none. Each can be reached from the others by complements and inclusion-exclusion, and choosing which one to count directly is half the work. Two kinds of subset problem appear constantly alongside them: subsets that must avoid a forbidden pair (no two elements adding to $11$, no element twice another) and sums over all subsets (the total of all subset sums, or of the largest elements).

"Exactly" counts come from inclusion-exclusion with weights. The numbers up to $100$ divisible by exactly one of $2$ and $3$ are those divisible by $2$ or $3$, minus those divisible by both counted twice: $50 + 33 - 2 \cdot 16 = 51$. In general, the number of objects with exactly $m$ of the properties is $\sum_{j \ge m}(-1)^{j - m}\binom jm S_j$, where $S_j$ is the sum of the sizes of the $j$-fold intersections. "At most" is a complement of "at least", and "at least two" is the total minus "none" minus "exactly one". Problems about sets of sets, such as ordered pairs $(A, B)$ with given unions and intersections, are cleanest element by element: each element independently chooses which of the regions of the Venn diagram it lies in, and the conditions say which regions are allowed or must be nonempty.

A [[subset-avoiding-relation|subset avoiding a relation]] is counted by drawing the forbidden pairs as a graph and counting the independent sets of that graph. If the pairs are disjoint, as for "no two elements adding to $11$" in $\{1, \ldots, 10\}$, the graph is five separate edges $\{1, 10\}, \ldots, \{5, 6\}$, and each edge contributes $3$ choices (neither, one, or the other), giving $3^5 = 243$. If the relation is "one is twice the other", the graph is a union of chains $1 - 2 - 4 - 8 - \cdots$, and each chain of length $\ell$ contributes the number of binary strings of length $\ell$ with no two adjacent ones, a Fibonacci number. The total is the product over components.

[[subset-sum-facts|Subset sums]] are computed by switching to counting by element: in the $2^n$ subsets of an $n$-element set, each element lies in exactly $2^{n-1}$ of them. So the sum of all subset sums of $\{1, \ldots, 10\}$ is $(1 + \cdots + 10) \cdot 2^9 = 55 \cdot 512 = 28160$. The sum of the largest elements over all nonempty subsets is $\sum_k k \cdot 2^{k-1}$, since $k$ is the largest in $2^{k-1}$ subsets. Alternating sums over subsets usually vanish or pair off by toggling one element.

Choose the strength of the condition that is easiest to count, and convert; draw forbidden pairs as a graph; and count totals over subsets element by element. The last lesson of the chapter compares complements with casework.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`independent sets in a path, the count for one chain of a forbidden relation (C2.4).` },
        { card: "double-counting", note: String.raw`counting by element instead of by subset is a double count (C4.3).` },
        { card: "binomial-row-sums", note: String.raw`each row of Pascal's triangle sums to $2^n$, the number of subsets (C4.5).` }
      ],
      exercises: [
        { q: String.raw`How many of the integers $1, 2, \ldots, 100$ are divisible by exactly one of $2$ and $3$?`, answer: "51",
          solution: String.raw`Multiples of $2$: $50$; of $3$: $33$; of both, that is of $6$: $16$. Those divisible by exactly one number $(50 - 16) + (33 - 16) = 51$.` },
        { q: String.raw`How many subsets of $\{1, 2, \ldots, 10\}$, including the empty set, contain no two elements that add to $11$?`, answer: "243",
          solution: String.raw`The pairs adding to $11$ are $\{1, 10\}, \{2, 9\}, \{3, 8\}, \{4, 7\}, \{5, 6\}$, and they are disjoint. From each pair the subset takes neither element or exactly one, $3$ ways, independently: $3^5 = 243$.` },
        { q: String.raw`Find the sum of the sums of all subsets of $\{1, 2, \ldots, 10\}$.`, answer: "28160",
          solution: String.raw`Each element lies in $2^9 = 512$ of the $2^{10}$ subsets, so it contributes $512$ times its value. The total is $512 \cdot (1 + 2 + \cdots + 10) = 512 \cdot 55 = 28160$.` }
      ],
      problems: [
        "2012 AMC 12B, Problem 16",
        "2002 AIME II, Problem 9",
        "2007 AIME II, Problem 10",
        "1992 AIME, Problem 5",
        "2018 AIME I, Problem 9",
        "2021 AIME II, Problem 6",
        "2025 AIME II, Problem 7"
      ]
    },
    "C3.5": {
      prereq: ["complementary-counting", "casework-method", "pie"],
      cards: [],
      body: String.raw`Most counting problems can be done either directly, by casework, or indirectly, by counting the complement and subtracting, possibly with inclusion-exclusion. Both give the right answer when done carefully, but one is often far shorter. How many binary strings of length $6$ contain two consecutive $1$s? How many colorings of a grid contain a solid $2 \times 2$ block? How many orientations of the roads between towns let you get from any town to any other? Deciding which way to count is a skill in its own right, and this lesson collects the signals.

Count the complement when the wanted condition is "at least one" of something and its failure is a single clean condition. Strings of length $6$ with two consecutive $1$s are all $64$ strings minus the $21$ with no two consecutive $1$s (a Fibonacci count), so $43$. Counting them directly would mean casework on where the first pair of $1$s appears, with care not to double count strings that have several pairs.

Use inclusion-exclusion when the complement is itself a union of overlapping events with easy intersections. The colorings of a $3 \times 3$ grid with at least one red $2 \times 2$ block: there are four possible blocks, and the colorings with a given set of blocks red are easy to count because red blocks only force more squares red. Adding, subtracting and adding back over the $15$ nonempty sets of blocks, grouped by how they overlap, is shorter than casework on the pattern of red squares.

Use direct casework when the complement is no simpler, or when the condition splits naturally into a few disjoint, easy cases: "exactly one pair of adjacent equal letters", or conditions that depend on a single parameter such as the position of the largest element. Casework is also safer when the intersections in an inclusion-exclusion would be irregular, with each group of events needing its own count.

Sometimes the best route combines the two: count the complement recursively, building up from smaller cases, as in counting orientations of a complete graph that are not strongly connected by the size of the part that cannot be left. Whichever route is chosen, check it on a small case where all the objects can be listed.

Before counting, write the condition and its negation, estimate the work for each, and choose the shorter. The Summary (C3.6) collects the chapter's strategies, and the problems that follow mix all the methods of the chapter.`,
      related: [
        { card: "restricted-sequences", note: String.raw`the count of strings that avoid a pattern, the usual complement for "contains" (C2.4).` },
        { card: "recursive-counting", note: String.raw`counting a complement by building up from smaller cases (C5.2).` },
        { card: "simulate-the-process", note: String.raw`checking a count on a small case that can be listed (C1.6).` }
      ],
      exercises: [
        { q: String.raw`How many binary strings of length $6$ contain at least one pair of consecutive $1$s?`, answer: "43",
          solution: String.raw`Count the complement. Strings of length $n$ with no two consecutive $1$s satisfy $a_n = a_{n-1} + a_{n-2}$ with $a_1 = 2$, $a_2 = 3$, so $a_6 = 21$ (the sequence is $2, 3, 5, 8, 13, 21$). The answer is $2^6 - 21 = 43$.` }
      ],
      problems: [
        "2012 AMC 12B, Problem 12",
        "2001 AIME II, Problem 9",
        "1996 AIME, Problem 6",
        "2015 AIME I, Problem 9",
        "2016 AIME II, Problem 11",
        "2017 AIME II, Problem 11"
      ]
    },
    "C3.6": {
      prereq: ["inclusion-exclusion", "pie", "derangements", "subset-avoiding-relation", "subset-sum-facts", "complementary-counting"],
      cards: [],
      body: String.raw`[[inclusion-exclusion|Inclusion-exclusion]] counts a union of overlapping sets by adding the single sets, subtracting the pairs, adding the triples, and so on. [[pie|The general principle]] works over any number of conditions, and is practical when the size of an intersection depends only on how many conditions are in it, so that each layer is one binomial coefficient times one count.

The objects that satisfy none of the conditions are the total minus the union. [[derangements|Derangements]] are the model: permutations with no fixed point, counted by inclusion-exclusion over the fixed points, with $D_n = n!\left(1 - \tfrac1{1!} + \tfrac1{2!} - \cdots\right)$ and a recursion. Forbidden positions of other kinds are handled the same way, one event per forbidden placement.

"At least", "at most", "exactly" and "none" are converted into each other by complements and inclusion-exclusion, so the strength that is easiest to count is chosen first. [[subset-avoiding-relation|Subsets that avoid a relation]] are counted by drawing the forbidden pairs as a graph and multiplying over its components, and [[subset-sum-facts|totals over all subsets]] are found element by element.

Every count can be made directly by casework or indirectly by a complement. The indirect route is shorter when the complement is a single clean condition or a union with easy intersections; the direct one when the condition splits into a few disjoint cases.`,
      strategies: [
        String.raw`For "at least one of", write each condition as a set, check that every intersection is easy to count, and add and subtract by layers.`,
        String.raw`When the size of an intersection depends only on how many conditions are in it, write each layer as $\binom{n}{k}$ times one count.`,
        String.raw`For "none of", count the union and subtract it from the total.`,
        String.raw`For "exactly $k$", choose the $k$ conditions that hold, then require none of the others.`,
        String.raw`When a problem gives the sizes of some of the regions of a Venn diagram, fill in the regions from the inside out.`,
        String.raw`Draw forbidden pairs as a graph, and multiply the counts for its separate pieces.`,
        String.raw`For a total over all subsets, ask how many subsets each element contributes to.`,
        String.raw`Before counting, write the condition and its negation side by side, and count whichever is simpler.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many integers from $1$ to $1000$ are divisible by none of $2$, $3$ and $5$?`, answer: "266",
        solution: String.raw`The multiples of $2$, $3$ and $5$ number $500$, $333$ and $200$; of $6$, $10$ and $15$, $166$, $100$ and $66$; of $30$, $33$. So $500 + 333 + 200 - 166 - 100 - 66 + 33 = 734$ numbers are divisible by at least one, and $1000 - 734 = 266$ by none.` },
      { q: String.raw`How many integers from $1$ to $1000$ are neither perfect squares nor perfect cubes?`, answer: "962",
        solution: String.raw`There are $31$ squares ($31^2 = 961 \le 1000 \lt 32^2$) and $10$ cubes. A number that is both is a sixth power, and there are $3$: $1$, $64$, $729$. So $31 + 10 - 3 = 38$ numbers are squares or cubes, and $1000 - 38 = 962$ are neither.` },
      { q: String.raw`How many permutations of $1, 2, 3, 4, 5, 6$ have exactly two numbers in their original places?`, answer: "135",
        solution: String.raw`Choose the two fixed numbers: $\binom62 = 15$ ways. The other four must all move, which is a derangement of four objects, $D_4 = 9$ ways. The count is $15 \cdot 9 = 135$.` },
      { q: String.raw`How many subsets of $\{1, 2, \ldots, 10\}$, the empty set included, contain no two numbers that add to $11$?`, answer: "243",
        solution: String.raw`The forbidden pairs are $\{1, 10\}$, $\{2, 9\}$, $\{3, 8\}$, $\{4, 7\}$ and $\{5, 6\}$, and they do not share elements. From each pair a subset takes neither number, the first, or the second, but not both: $3$ options. The pairs are independent, so the count is $3^5 = 243$.` },
      { q: String.raw`How many strings of eight binary digits contain two consecutive $1$s somewhere?`, answer: "201",
        solution: String.raw`Count the complement. A string with $k$ ones, no two adjacent, is a choice of $k$ non-adjacent positions among $8$, $\binom{9 - k}{k}$ ways. For $k = 0, 1, 2, 3, 4$ this gives $1 + 8 + 21 + 20 + 5 = 55$. So $256 - 55 = 201$ strings have two adjacent $1$s. The direct count would need cases on where the first pair occurs.` }
    ],
    problems: [
      "1995 AIME, Problem 1",
      "2015 AIME I, Problem 2"
    ]
  },
  challenge: {
    problems: [
      "2011 AMC 12A, Problem 22",
      "2011 AIME II, Problem 12",
      "2017 AIME I, Problem 12",
      "2022 AIME I, Problem 13"
    ]
  }
};
