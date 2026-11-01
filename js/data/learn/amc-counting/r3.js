// Learn, AMC Counting & Probability, chapter R3: arrangements (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R3"] = {
  lessons: {
    "R3.1": {
      prereq: ["permutations-combinations", "complementary-counting"],
      cards: [],
      body: String.raw`R1 counted arrangements of different objects in a row. Real problems add complications: some objects are alike, some must not sit together, the row closes into a circle, or two conditions overlap. This chapter handles each complication with one idea, and most of these ideas share a single principle: count too many in a simple way, then correct.

The letters of $BOOK$ can be arranged in $4! = 24$ ways if the two $O$s are treated as different, but swapping the two $O$s does not change the word, so each word was counted twice: there are $\tfrac{24}{2} = 12$ words.

Five people around a round table, where only the order around the table matters and not which chair, can be seated in $5! = 120$ ways in chairs, but each seating is one of $5$ rotations of the same circle, so there are $\tfrac{120}{5} = 24$.

The numbers from $1$ to $30$ divisible by $2$ or by $3$ are the $15$ even numbers and the $10$ multiples of $3$, but the $5$ multiples of $6$ were counted in both, so there are $15 + 10 - 5 = 20$.

The lessons take these ideas in turn: arranging letters with repeats (R3.2), gaps, blocks and non-adjacent choices (R3.3), circles and derangements (R3.4), and inclusion-exclusion and overcounting (R3.5). The Summary (R3.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many different arrangements are there of the letters of $BOOK$?`, answer: "12",
          solution: String.raw`With the $O$s labeled there are $4! = 24$ orders, and swapping the two $O$s gives the same word, so $\tfrac{24}{2} = 12$.` },
        { q: String.raw`In how many ways can $5$ people sit around a round table, if two seatings that differ by a rotation are the same?`, answer: "24",
          solution: String.raw`In labeled chairs there are $5! = 120$ seatings, and each circle appears in $5$ rotations: $\tfrac{120}{5} = 24$. Equivalently, seat one person anywhere and arrange the other four, $4! = 24$.` },
        { q: String.raw`How many integers from $1$ to $30$ are divisible by $2$ or by $3$?`, answer: "20",
          solution: String.raw`There are $15$ multiples of $2$ and $10$ of $3$, and the $5$ multiples of $6$ are in both lists: $15 + 10 - 5 = 20$.` }
      ],
      problems: [
        "2012 AMC 8, Problem 10",
        "2018 AMC 10A, Problem 4",
        "1991 AJHSME, Problem 9"
      ]
    },
    "R3.2": {
      prereq: ["permutations-combinations"],
      cards: ["multiset-permutations"],
      body: String.raw`How many different words can be made from the letters of $MISSISSIPPI$? How many four-digit numbers use the digits $0, 0, 1, 2$? When some objects are alike, the plain $n!$ counts each arrangement several times.

[[multiset-permutations|Arrangements with repeated objects]] are counted by labeling the alike objects, counting all orders, and dividing by the number of ways to shuffle the alike ones among themselves. $MISSISSIPPI$ has $11$ letters: $1$ $M$, $4$ $I$s, $4$ $S$s and $2$ $P$s. With every letter labeled there are $11!$ orders, and each word appears $4! \cdot 4! \cdot 2!$ times, once for each way to permute the $I$s, the $S$s and the $P$s among their own places. So there are $\tfrac{11!}{4!\,4!\,2!} = 34650$ words. In general, $n$ objects of which $n_1$ are alike, $n_2$ alike, and so on, have $\tfrac{n!}{n_1!\,n_2! \cdots}$ arrangements.

The same count can be built by choosing places: the $4$ $I$s take $\binom{11}{4}$ of the $11$ places, the $S$s $\binom74$ of the remaining $7$, the $P$s $\binom32$ of the last $3$, and the $M$ the one left. The product $330 \cdot 35 \cdot 3 = 34650$ agrees, and this form is easier when only one kind of letter matters: a string of $5$ letters with two $O$s and three $X$s is fixed once the two places of the $O$s are chosen, $\binom52 = 10$ ways.

Digits add a restriction: a number cannot begin with $0$. The digits $0, 0, 1, 2$ have $\tfrac{4!}{2!} = 12$ orders, and those starting with $0$ are the $3! = 6$ orders of $0, 1, 2$ after it, so $12 - 6 = 6$ are four-digit numbers. Count all orders, then remove the forbidden ones by the complement.

Label the alike objects, count, and divide by their shuffles; or choose places for each kind in turn. The next lesson keeps objects apart or together.`,
      related: [
        { card: "multinomial-theorem", note: String.raw`the same numbers $\tfrac{n!}{n_1! \cdots n_k!}$ as coefficients of $(x_1 + \cdots + x_k)^n$ (R8.3).` },
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is counted, the idea behind the formula (R3.5).` }
      ],
      exercises: [
        { q: String.raw`How many different arrangements are there of the letters of $MISSISSIPPI$?`, answer: "34650",
          solution: String.raw`$11$ letters with $4$ $I$s, $4$ $S$s, $2$ $P$s and $1$ $M$: $\tfrac{11!}{4!\,4!\,2!} = \tfrac{39916800}{1152} = 34650$.` },
        { q: String.raw`How many five-digit numbers use each of the digits $1, 1, 2, 2, 3$ exactly once?`, answer: "30",
          solution: String.raw`No digit is $0$, so every order is a five-digit number: $\tfrac{5!}{2!\,2!} = 30$.` },
        { q: String.raw`How many four-digit numbers use each of the digits $0, 0, 1, 2$ exactly once?`, answer: "6",
          solution: String.raw`The digits have $\tfrac{4!}{2!} = 12$ orders. Those starting with $0$ are a $0$ followed by an order of $0, 1, 2$: $3! = 6$. The other $6$ are four-digit numbers.` }
      ],
      problems: [
        "2004 AMC 8, Problem 2",
        "2009 AMC 8, Problem 16",
        "2020 AMC 10B, Problem 5",
        "2019 AMC 10A, Problem 17",
        "2014 AMC 12A, Problem 13"
      ]
    },
    "R3.3": {
      prereq: ["permutations-combinations", "constructive-counting"],
      cards: ["gap-method", "counting-blocks", "non-adjacent-selection"],
      body: String.raw`Many restrictions say that certain objects must be next to each other, or must not be. In how many ways can $4$ boys and $3$ girls stand in a row with the girls together? With no two girls next to each other? How many ways are there to choose $3$ of the numbers $1$ to $10$ with no two consecutive?

[[counting-blocks|Gluing items into a block]] handles "together". Tie the three girls into one block; now there are $5$ items, the block and $4$ boys, arranged in $5!$ ways, and the girls arranged inside the block in $3!$ ways: $5! \cdot 3! = 720$.

[[gap-method|The gap method]] handles "no two together". Arrange the unrestricted objects first, the boys, in $4!$ ways. They leave $5$ gaps, one before each boy and one at the end: $\_ B \_ B \_ B \_ B \_$. Placing the girls in $3$ different gaps keeps them apart, and choosing the gaps and ordering the girls gives $\binom53 \cdot 3!$ ways. In all, $4! \cdot 10 \cdot 6 = 1440$. Arranging the restricted objects first never works, because the spaces between them are not yet known.

[[non-adjacent-selection|Choosing non-adjacent objects]] is the gap method with identical objects. To choose $3$ numbers from $1$ to $10$ with no two consecutive, think of the $7$ unchosen numbers in a row, leaving $8$ gaps, and put the $3$ chosen ones in $3$ different gaps: $\binom83 = 56$. In general, $k$ non-adjacent choices from $n$ in a row number $\binom{n - k + 1}{k}$. Strings of $8$ binary digits with exactly three $1$s, no two adjacent, are the same count with $n = 8$: $\binom63 = 20$.

Glue objects that must be together; for objects that must be apart, place the others first and choose gaps. The next lesson closes the row into a circle.`,
      related: [
        { card: "stars-and-bars", note: String.raw`the same gaps, when several objects may share a gap (R4.2).` },
        { card: "recursive-counting", note: String.raw`strings with no two adjacent $1$s and no fixed number of $1$s, counted by a recursion (R5.2).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $4$ boys and $3$ girls stand in a row so that no two girls are next to each other?`, answer: "1440",
          solution: String.raw`Arrange the boys: $4! = 24$. They leave $5$ gaps; choose $3$ for the girls, $\binom53 = 10$, and order the girls, $3! = 6$. In all $24 \cdot 10 \cdot 6 = 1440$.` },
        { q: String.raw`In how many ways can $4$ boys and $3$ girls stand in a row so that the three girls are together?`, answer: "720",
          solution: String.raw`Glue the girls into one block: $5$ items in $5! = 120$ orders, and the girls in $3! = 6$ orders inside the block. In all $720$.` },
        { q: String.raw`In how many ways can $3$ numbers be chosen from $1, 2, \ldots, 10$ so that no two chosen numbers are consecutive?`, answer: "56",
          solution: String.raw`The $7$ unchosen numbers leave $8$ gaps, and the chosen numbers go in $3$ different gaps: $\binom83 = 56$.` },
        { q: String.raw`How many strings of $8$ binary digits have exactly three $1$s, with no two $1$s next to each other?`, answer: "20",
          solution: String.raw`The five $0$s leave $6$ gaps, and the three $1$s take $3$ different gaps: $\binom63 = 20$.` }
      ],
      problems: [
        "2018 AMC 8, Problem 23",
        "2012 AMC 12B, Problem 12",
        "2015 AMC 12A, Problem 17",
        "2024 AMC 10A, Problem 20"
      ]
    },
    "R3.4": {
      prereq: ["permutations-combinations"],
      cards: ["circular-permutations", "derangements"],
      body: String.raw`Two arrangements have their own counts. In how many ways can $6$ people sit around a round table? In how many ways can $4$ letters be put into $4$ addressed envelopes so that no letter goes in its own envelope?

[[circular-permutations|A circular arrangement]] counts only the order around the circle, not which seat: rotating everyone one seat gives the same arrangement. Fixing one person's seat removes the rotations, and the others fill the remaining seats in order, so $n$ people can sit in $(n - 1)!$ ways: $6$ people in $5! = 120$. If flips also count as the same, as for beads on a bracelet that can be turned over, each arrangement and its mirror image are one, and the count halves: $\tfrac{5!}{2} = 60$ for $6$ different beads. Conditions are handled after fixing someone: with $8$ people around a table and $A$ next to $B$, seat $A$, put $B$ on one of $A$'s $2$ sides, and arrange the other $6$: $2 \cdot 6! = 1440$.

[[derangements|A derangement]] is an arrangement in which no object is in its own place. The numbers $D_n$ of derangements of $n$ objects start $D_1 = 0$, $D_2 = 1$, $D_3 = 2$, $D_4 = 9$, $D_5 = 44$. For $3$ objects, the two derangements of $1, 2, 3$ are $2, 3, 1$ and $3, 1, 2$. They obey $D_n = (n - 1)(D_{n-1} + D_{n-2})$, and they come from inclusion-exclusion, the next lesson's tool. Arrangements with exactly some objects in place reduce to derangements of the rest: $5$ letters in $5$ envelopes with exactly one right are $5$ choices of that letter times $D_4 = 9$ for the others, $45$ ways.

Fix one person to remove rotations, halve for flips, and for "nothing in its own place", use $D_n$. The next lesson corrects overlapping counts.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting arrangements up to rotation when some rotations fix an arrangement, as with colorings (R8.2).` },
        { card: "expected-fixed-points", note: String.raw`on average a random arrangement has exactly one object in its own place.` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $6$ people sit around a round table, if seatings that differ by a rotation are the same?`, answer: "120",
          solution: String.raw`Fix one person's seat; the other five fill the remaining seats in $5! = 120$ ways.` },
        { q: String.raw`How many different bracelets can be made from $6$ different beads, if a bracelet may be rotated or turned over?`, answer: "60",
          solution: String.raw`Up to rotation there are $5! = 120$ circular orders, and turning over pairs each order with its mirror image, which is different since the beads are different: $\tfrac{120}{2} = 60$.` },
        { q: String.raw`In how many ways can $4$ letters be put into their $4$ addressed envelopes, one per envelope, so that no letter is in its own envelope?`, answer: "9",
          solution: String.raw`This is $D_4 = 3(D_3 + D_2) = 3(2 + 1) = 9$. Check by inclusion-exclusion: $4! - 4 \cdot 3! + 6 \cdot 2! - 4 \cdot 1! + 1 = 24 - 24 + 12 - 4 + 1 = 9$.` },
        { q: String.raw`In how many ways can $5$ letters be put into their $5$ envelopes, one per envelope, so that exactly one letter is in its own envelope?`, answer: "45",
          solution: String.raw`Choose the letter in place, $5$ ways; the other four are deranged, $D_4 = 9$ ways. In all $45$.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 18",
        "2018 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 11"
      ]
    },
    "R3.5": {
      prereq: ["permutations-combinations", "complementary-counting", "casework-method"],
      cards: ["inclusion-exclusion", "pie", "uniform-overcount", "double-counting"],
      body: String.raw`When cases overlap, adding them counts some objects twice. How many numbers from $1$ to $100$ are divisible by $2$, $3$ or $5$? In how many ways can $5$ different balls go into $3$ boxes with no box empty? How many edges does a solid with $12$ pentagonal faces have?

[[inclusion-exclusion|Inclusion-exclusion]] corrects the overlaps. For two sets, $|A \cup B| = |A| + |B| - |A \cap B|$: the overlap was counted twice and is subtracted once. For three sets, add the three sizes, subtract the three pairwise overlaps, and add back the triple overlap, which the subtraction removed once too often. From $1$ to $100$, the multiples of $2$, $3$, $5$ number $50$, $33$, $20$; of $6$, $10$, $15$, they number $16$, $10$, $6$; and of $30$, $3$. So $50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$ numbers are divisible by at least one.

[[pie|Counting with inclusion-exclusion]] is most often used through the complement, on conditions of the form "none of these bad things happens". Putting $5$ different balls into $3$ boxes gives $3^5 = 243$ ways. Let a bad event be "box $i$ is empty". One given box empty leaves $2^5$ ways, and there are $3$ such boxes; two given boxes empty leaves $1$ way, for $3$ pairs; all three empty is impossible. So $243 - 3 \cdot 32 + 3 \cdot 1 = 150$ ways leave no box empty. The derangement numbers of R3.4 come the same way. When the sizes of the overlaps are hard to find, try defining the bad events differently; the right sets make every intersection a simple count.

[[uniform-overcount|A uniform overcount]] is the opposite situation: every object is counted the same number of times, so dividing corrects it. The $12$ pentagons of the solid have $12 \cdot 5 = 60$ sides, and each edge is a side of exactly $2$ faces, so there are $30$ edges. [[double-counting|Double counting]] counts one set in two ways and sets the counts equal. If $20$ students each join $3$ clubs and every club has $6$ members, the student-club memberships number $20 \cdot 3 = 60$ counted by students and $6c$ counted by clubs, so there are $c = 10$ clubs.

Add, subtract the overlaps, add back the triple overlap; for "none of these", subtract from the total; and when every object is counted equally often, divide. The Summary follows.`,
      related: [
        { card: "derangements", note: String.raw`inclusion-exclusion over the objects left in their own place (R3.4).` },
        { card: "handshake-lemma", note: String.raw`double counting the ends of the edges of a graph (R7.3).` }
      ],
      exercises: [
        { q: String.raw`How many integers from $1$ to $100$ are divisible by at least one of $2$, $3$ and $5$?`, answer: "74",
          solution: String.raw`Singles: $50 + 33 + 20 = 103$. Pairs (multiples of $6$, $10$, $15$): $16 + 10 + 6 = 32$. Triple (multiples of $30$): $3$. So $103 - 32 + 3 = 74$.` },
        { q: String.raw`In how many ways can $5$ different balls be put into $3$ different boxes so that no box is empty?`, answer: "150",
          solution: String.raw`All placements: $3^5 = 243$. With a given box empty: $2^5 = 32$, for each of $3$ boxes. With two given boxes empty: $1$, for each of $3$ pairs. So $243 - 96 + 3 = 150$.` },
        { q: String.raw`A solid has $12$ faces, each a pentagon, and each edge lies on exactly two faces. How many edges does it have?`, answer: "30",
          solution: String.raw`The faces have $12 \cdot 5 = 60$ sides in all, and each edge is counted twice, once for each face it lies on: $\tfrac{60}{2} = 30$.` },
        { q: String.raw`Each of $20$ students belongs to exactly $3$ clubs, and each club has exactly $6$ members. How many clubs are there?`, answer: "10",
          solution: String.raw`Count the pairs (student, club of that student) two ways: $20 \cdot 3 = 60$ by students, and $6c$ by clubs. So $c = 10$.` }
      ],
      problems: [
        "1991 AJHSME, Problem 23",
        "2005 AMC 10B, Problem 13",
        "2004 AMC 10A, Problem 13",
        "2023 AMC 10A, Problem 6",
        "2005 AMC 12A, Problem 18",
        "2025 AMC 10B, Problem 16"
      ]
    },
    "R3.6": {
      prereq: ["multiset-permutations", "gap-method", "counting-blocks", "non-adjacent-selection", "circular-permutations", "derangements", "inclusion-exclusion", "pie", "uniform-overcount", "double-counting"],
      cards: [],
      body: String.raw`[[multiset-permutations|Arrangements with repeats]] number $\tfrac{n!}{n_1!\,n_2! \cdots}$: label, count, divide by the shuffles of the alike objects.

[[counting-blocks|Glue]] objects that must be together; for objects that must be apart, [[gap-method|place the others first and choose gaps]]. [[non-adjacent-selection|Choosing $k$ non-adjacent objects from $n$ in a row]] gives $\binom{n-k+1}{k}$.

[[circular-permutations|Around a circle]], fix one person: $(n - 1)!$, halved if flips count as the same. [[derangements|Derangements]] $D_n$ count arrangements with nothing in its own place.

[[inclusion-exclusion|Inclusion-exclusion]] corrects overlapping cases, and [[pie|used with the complement]] counts the arrangements avoiding every bad event. [[uniform-overcount|A uniform overcount]] is divided out, and [[double-counting|double counting]] equates two counts of one set.`,
      strategies: [
        String.raw`Treat alike objects as different, then divide by the number of ways to shuffle them.`,
        String.raw`Glue together what must be together; place the unrestricted objects first and choose gaps for the rest.`,
        String.raw`Around a circle, fix one object's position before counting.`,
        String.raw`For "none of these bad things", subtract the bad cases by inclusion-exclusion.`,
        String.raw`If the inclusion-exclusion terms are hard to compute, redefine the sets.`,
        String.raw`If every object is counted the same number of times, divide by that number.`,
        String.raw`Count a set of pairs two ways and set the counts equal.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many different arrangements are there of the letters of $LETTER$?`, answer: "180",
        solution: String.raw`$6$ letters with two $E$s and two $T$s: $\tfrac{6!}{2!\,2!} = 180$.` },
      { q: String.raw`How many integers from $1$ to $60$ are divisible by neither $3$ nor $4$?`, answer: "30",
        solution: String.raw`Multiples of $3$: $20$; of $4$: $15$; of $12$: $5$. So $20 + 15 - 5 = 30$ are divisible by one of them, and $60 - 30 = 30$ by neither.` },
      { q: String.raw`In how many ways can $8$ people sit around a round table so that $A$ and $B$ sit next to each other, if rotations are the same?`, answer: "1440",
        solution: String.raw`Seat $A$; $B$ takes one of the $2$ seats beside $A$; the other $6$ fill the rest in $6!$ ways: $2 \cdot 720 = 1440$.` },
      { q: String.raw`How many arrangements of $1, 2, 3, 4, 5$ leave no number in its own position?`, answer: "44",
        solution: String.raw`$D_5 = 4(D_4 + D_3) = 4(9 + 2) = 44$, or by inclusion-exclusion $120 - 120 + 60 - 20 + 5 - 1 = 44$.` }
    ],
    problems: [
      "1985 AJHSME, Problem 15",
      "2007 AMC 10A, Problem 11",
      "2005 AMC 10A, Problem 17",
      "2009 AMC 10B, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2008 AMC 10B, Problem 22",
      "2010 AMC 10B, Problem 22",
      "2021 Spring AMC 10B, Problem 22",
      "2006 AMC 12A, Problem 25"
    ]
  }
};
