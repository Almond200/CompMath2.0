// Learn, AIME Counting & Probability, chapter C3: inclusion-exclusion and complements (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C3"] = {
  lessons: {
    "C3.1": {
      prereq: ["complementary-counting"],
      cards: ["inclusion-exclusion", "pie"],
      body: String.raw`When the objects to be counted satisfy at least one of several overlapping conditions, adding the counts for each condition counts the overlaps more than once. How many numbers up to $1000$ are divisible by $3$, $5$ or $7$? How many residents own at least one of four items, given how many own each? How many numbers below some bound are not squares, cubes or fifth powers? The correction is inclusion-exclusion: add the single conditions, subtract the pairs, add back the triples, and so on.

The [[inclusion-exclusion|principle of inclusion-exclusion]] says $|A \cup B| = |A| + |B| - |A \cap B|$, and for three sets $|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$. In general, the size of a union is the alternating sum, over all nonempty groups of the sets, of the size of their intersection. The reason is that an object in exactly $m$ of the sets is counted $\binom m1 - \binom m2 + \binom m3 - \cdots = 1$ time. The numbers up to $1000$ divisible by $3$, $5$ or $7$: $333 + 200 + 142 - 66 - 47 - 28 + 9 = 543$, where each intersection is a count of multiples of a product, $\left\lfloor \tfrac{1000}{15} \right\rfloor = 66$ and so on.

[[pie|Counting with inclusion-exclusion]] is the method of setting this up. Name the bad properties $P_1, \ldots, P_k$ so that the wanted objects are those with none of them, compute the number of objects with each chosen group of properties, and combine: the count with none is $N - \sum|P_i| + \sum|P_i \cap P_j| - \cdots$. The method pays off when the intersections are easy, which usually happens when the problem is symmetric so that every group of $j$ properties has the same count: then the formula is $\sum_j (-1)^j\binom kj N_j$. Numbers up to $100$ divisible by none of $2$, $3$, $5$: $100 - (50 + 33 + 20) + (16 + 10 + 6) - 3 = 26$.

The formula also runs in reverse. If the problem gives the sizes of the sets and of the union, or the number of objects in exactly one, exactly two and exactly three sets, the unknown is an intersection, and the principle is an equation for it. With two sets, $|A \cap B| = |A| + |B| - |A \cup B|$, so the overlap is smallest when the union is as large as possible. With several sets, count incidences: the sum of the set sizes counts each object once for every set it is in, so it equals $1 \cdot (\text{number in exactly one}) + 2 \cdot (\text{exactly two}) + \cdots$, a double count that often gives the missing equation.

Use inclusion-exclusion when the condition is "at least one of" several properties whose intersections are easy to count, and when the problem gives some of these sizes and asks for another. The next lesson applies it to permutations with forbidden positions.`,
      related: [
        { card: "floor-multiples", note: String.raw`counting the multiples of $d$ up to $n$, the size of each intersection in divisibility problems.` },
        { card: "double-counting", note: String.raw`counting incidences two ways, the source of the reverse equations (C4.2).` },
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
    "C3.2": {
      prereq: ["pie"],
      cards: ["derangements"],
      body: String.raw`A permutation in which nothing stays in its original place is a derangement: letters in the wrong envelopes, people who all take someone else's hat, a seating in which no one keeps a seat. More generally, a problem may forbid certain positions, such as no one sitting next to a former neighbor, or no sibling pair in the same row. Inclusion-exclusion over the forbidden events gives the count, and for derangements it gives a formula and a recursion worth knowing.

The [[derangements|derangement]] numbers $D_n$ count permutations of $n$ objects with no fixed point. Let $P_i$ be the event that object $i$ is fixed; any $j$ chosen objects are all fixed in $(n - j)!$ permutations, so by inclusion-exclusion $D_n = \sum_{j=0}^{n}(-1)^j\binom nj(n - j)! = n!\left(1 - \tfrac1{1!} + \tfrac1{2!} - \cdots + \tfrac{(-1)^n}{n!}\right)$. The first values are $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$, $D_6 = 265$, and they satisfy $D_n = (n - 1)(D_{n-1} + D_{n-2})$: object $1$ goes to some position $k$ ($n - 1$ choices), and then either $k$ goes to position $1$ (leaving a derangement of $n - 2$) or it does not (a derangement of $n - 1$). The probability that a random permutation is a derangement approaches $\tfrac1e \approx 0.368$ quickly, already $\tfrac{44}{120}$ for $n = 5$.

Exact numbers of fixed points follow: a permutation of $n$ objects with exactly $k$ fixed points is a choice of the $k$ fixed ones and a derangement of the rest, $\binom nk D_{n-k}$. For $n = 6$ and $k = 2$ that is $15 \cdot 9 = 135$. When the objects come in types, such as diners who ordered beef, chicken or fish, "nobody gets the right meal" is a derangement of types rather than individuals, and the count is a small casework on how many of each type go to each other type.

Other forbidden positions are handled the same way. Name the forbidden events (a given pair adjacent, a given person in a given seat), count the arrangements in which a chosen group of them all happen, often by gluing blocks, and combine with alternating signs. Gluing $k$ chosen adjacent pairs into blocks leaves fewer units to arrange, which is why the counts for groups of events are easy even when the events overlap in complicated ways.

Use the derangement numbers when every object has one forbidden place, and inclusion-exclusion over forbidden events in general. The next lesson counts "exactly" and "at most" conditions, and subsets that avoid a relation.`,
      related: [
        { card: "expected-fixed-points", note: String.raw`a random permutation has on average one fixed point, whatever $n$ is (C7.2).` },
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
    "C3.3": {
      prereq: ["pie", "binomial-row-sums"],
      cards: ["subset-avoiding-relation", "subset-sum-facts"],
      body: String.raw`Counting conditions come in several strengths: at least one, at most one, exactly one, none. Each can be reached from the others by complements and inclusion-exclusion, and choosing which one to count directly is half the work. Two kinds of subset problem appear constantly alongside them: subsets that must avoid a forbidden pair (no two elements adding to $11$, no element twice another) and sums over all subsets (the total of all subset sums, or of the largest elements).

"Exactly" counts come from inclusion-exclusion with weights. The numbers up to $100$ divisible by exactly one of $2$ and $3$ are those divisible by $2$ or $3$, minus those divisible by both counted twice: $50 + 33 - 2 \cdot 16 = 51$. In general, the number of objects with exactly $m$ of the properties is $\sum_{j \ge m}(-1)^{j - m}\binom jm S_j$, where $S_j$ is the sum of the sizes of the $j$-fold intersections. "At most" is a complement of "at least", and "at least two" is the total minus "none" minus "exactly one". Problems about sets of sets, such as ordered pairs $(A, B)$ with given unions and intersections, are cleanest element by element: each element independently chooses which of the regions of the Venn diagram it lies in, and the conditions say which regions are allowed or must be nonempty.

A [[subset-avoiding-relation|subset avoiding a relation]] is counted by drawing the forbidden pairs as a graph and counting the independent sets of that graph. If the pairs are disjoint, as for "no two elements adding to $11$" in $\{1, \ldots, 10\}$, the graph is five separate edges $\{1, 10\}, \ldots, \{5, 6\}$, and each edge contributes $3$ choices (neither, one, or the other), giving $3^5 = 243$. If the relation is "one is twice the other", the graph is a union of chains $1 - 2 - 4 - 8 - \cdots$, and each chain of length $\ell$ contributes the number of binary strings of length $\ell$ with no two adjacent ones, a Fibonacci number. The total is the product over components.

[[subset-sum-facts|Subset sums]] are computed by switching to counting by element: in the $2^n$ subsets of an $n$-element set, each element lies in exactly $2^{n-1}$ of them. So the sum of all subset sums of $\{1, \ldots, 10\}$ is $(1 + \cdots + 10) \cdot 2^9 = 55 \cdot 512 = 28160$. The sum of the largest elements over all nonempty subsets is $\sum_k k \cdot 2^{k-1}$, since $k$ is the largest in $2^{k-1}$ subsets. Alternating sums over subsets usually vanish or pair off by toggling one element.

Choose the strength of the condition that is easiest to count, and convert; draw forbidden pairs as a graph; and count totals over subsets element by element. The last lesson of the chapter compares complements with casework.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`independent sets in a path, the count for one chain of a forbidden relation (C2.3).` },
        { card: "double-counting", note: String.raw`counting by element instead of by subset is a double count (C4.2).` },
        { card: "binomial-row-sums", note: String.raw`each row of Pascal's triangle sums to $2^n$, the number of subsets (C4.4).` }
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
    "C3.4": {
      prereq: ["complementary-counting", "casework-method", "pie"],
      cards: [],
      body: String.raw`Most counting problems can be done either directly, by casework, or indirectly, by counting the complement and subtracting, possibly with inclusion-exclusion. Both give the right answer when done carefully, but one is often far shorter. How many binary strings of length $6$ contain two consecutive $1$s? How many colorings of a grid contain a solid $2 \times 2$ block? How many orientations of the roads between towns let you get from any town to any other? Deciding which way to count is a skill in its own right, and this lesson collects the signals.

Count the complement when the wanted condition is "at least one" of something and its failure is a single clean condition. Strings of length $6$ with two consecutive $1$s are all $64$ strings minus the $21$ with no two consecutive $1$s (a Fibonacci count), so $43$. Counting them directly would mean casework on where the first pair of $1$s appears, with care not to double count strings that have several pairs.

Use inclusion-exclusion when the complement is itself a union of overlapping events with easy intersections. The colorings of a $3 \times 3$ grid with at least one red $2 \times 2$ block: there are four possible blocks, and the colorings with a given set of blocks red are easy to count because red blocks only force more squares red. Adding, subtracting and adding back over the $15$ nonempty sets of blocks, grouped by how they overlap, is shorter than casework on the pattern of red squares.

Use direct casework when the complement is no simpler, or when the condition splits naturally into a few disjoint, easy cases: "exactly one pair of adjacent equal letters", or conditions that depend on a single parameter such as the position of the largest element. Casework is also safer when the intersections in an inclusion-exclusion would be irregular, with each group of events needing its own count.

Sometimes the best route combines the two: count the complement recursively, building up from smaller cases, as in counting orientations of a complete graph that are not strongly connected by the size of the part that cannot be left. Whichever route is chosen, check it on a small case where all the objects can be listed.

Before counting, write the condition and its negation, estimate the work for each, and choose the shorter. The review problems that follow mix all the methods of the chapter.`,
      related: [
        { card: "restricted-sequences", note: String.raw`the count of strings that avoid a pattern, the usual complement for "contains" (C2.3).` },
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
    }
  },
  review: [
    "2004 AMC 12B, Problem 4",
    "2025 AMC 12B, Problem 13",
    "2014 AIME II, Problem 2",
    "1995 AIME, Problem 1",
    "2011 AMC 12A, Problem 22",
    "2011 AIME II, Problem 12"
  ]
};
