// Learn, AMC Counting & Probability, chapter R10: from the AMC to the AIME (CONVENTIONS §14). Part: Toward the AIME.
// The second plan's book, written fresh (twentieth chat). No new cards. Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R10"] = {
  lessons: {
    "R10.1": {
      prereq: ["permutations-combinations", "casework-method", "basic-probability"],
      cards: [],
      body: String.raw`This chapter teaches no new card. It takes the counting and probability of the book to the early AIME, where an answer is a whole number from $0$ to $999$ with no choices to test it against. A wrong count is no longer caught by the answer choices, so the habits that catch it become part of the solution: checking that the cases neither overlap nor leave a gap, testing a method on a small case, and recognizing which idea a problem needs when it does not say.

An AIME problem often asks for the answer in a disguised form. If the number of $3$-card hands from a deck of $n$ cards is twice the number of $2$-card hands, then $\binom n3 = 2\binom n2$, which simplifies to $\tfrac{n - 2}{3} = 2$, so $n = 8$. A probability is asked as $m + n$ for the fraction $\tfrac mn$ in lowest terms: two different cards from $1$ to $9$ have an even sum when both are odd or both are even, with probability $\tfrac{\binom52 + \binom42}{\binom92} = \tfrac{16}{36} = \tfrac49$, so the answer would be $13$. Reducing the fraction is part of the problem.

The lessons are checking cases and double counting (R10.2), small cases as a test (R10.3), and mixed problems across the book (R10.4). The Summary (R10.5) collects the strategies.`,
      exercises: [
        { q: String.raw`A deck has $n$ different cards. The number of $3$-card hands is twice the number of $2$-card hands. Find $n$.`, answer: "8",
          solution: String.raw`The condition is $\binom n3 = 2\binom n2$. Since $\binom n3 = \binom n2 \cdot \tfrac{n - 2}{3}$, it says $\tfrac{n-2}{3} = 2$, so $n = 8$. Check: $\binom83 = 56 = 2 \cdot 28$.` },
        { q: String.raw`Two different cards are drawn from cards numbered $1$ to $9$. The probability that their sum is even is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "13",
          solution: String.raw`The sum is even when both are odd, $\binom52 = 10$ pairs, or both even, $\binom42 = 6$ pairs, out of $\binom92 = 36$. So the probability is $\tfrac{16}{36} = \tfrac49$, and $m + n = 13$.` },
        { q: String.raw`How many triangles have all three vertices among $6$ points on a circle?`, answer: "20",
          solution: String.raw`No three points of a circle are on a line, so every $3$ of the $6$ points make a triangle: $\binom63 = 20$.` }
      ],
      problems: [
        "2005 AIME II, Problem 1",
        "2017 AIME I, Problem 1",
        "2015 AIME I, Problem 2"
      ]
    },
    "R10.2": {
      prereq: ["casework-method", "organized-listing", "double-counting", "complementary-counting"],
      cards: [],
      body: String.raw`How many positive integers below $1000$ have at most two different digits? How many five-card hands contain exactly two pairs? If each of $12$ students belongs to $3$ clubs and each club has $4$ members, how many clubs are there? Each is a count in which an error, a case counted twice or a case forgotten, is easy to make and hard to see.

[[casework-method|Casework]] is only as good as its split. The cases must cover every object and no object may fall in two of them. For numbers below $1000$ with at most two different digits, split by the number of digits: all $9$ one-digit numbers and all $90$ two-digit numbers qualify, and of the $900$ three-digit numbers, the $9 \cdot 9 \cdot 8 = 648$ with three different digits fail. So the count is $9 + 90 + 252 = 351$, the last case by [[complementary-counting|the complement]]. Before adding, check the split: is every number in exactly one case? When the cases are many, a short [[organized-listing|organized list]] of one case confirms the formula used for it.

The most common error is counting an object once for each order in which it can be built. A hand with two pairs is not "choose a rank for the first pair, then a rank for the second": that builds each hand twice, once for each order of the two ranks. Choose the two ranks together, $\binom{13}{2}$, then the suits of each pair, $\binom42^2$, and the fifth card, $44$: $78 \cdot 36 \cdot 44 = 123552$. The test is to take one finished object and ask in how many ways the method produces it; if the answer is not $1$, divide by it or change the method.

[[double-counting|Double counting]] turns the danger into a tool: count the same set two ways and equate. Pairs (student, club) with the student in the club number $12 \cdot 3 = 36$ by students and $4c$ by clubs, so $c = 9$. AIME problems on lines and their crossing points, on handshakes, or on sums over subsets are often this.

Check every case split for gaps and overlaps, ask how many times a finished object is built, and count one set two ways. The next lesson tests a method on small cases.`,
      related: [
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is built (R3.5).` },
        { card: "pie", note: String.raw`correcting cases that overlap (R3.5).` },
        { card: "handshake-lemma", note: String.raw`a double count of the ends of edges (R7.3).` }
      ],
      exercises: [
        { q: String.raw`How many positive integers less than $1000$ have at most two different digits?`, answer: "351",
          solution: String.raw`One-digit: $9$. Two-digit: all $90$ have at most two digits. Three-digit: $900$ in all, of which $9 \cdot 9 \cdot 8 = 648$ have three different digits (a nonzero first digit, then two others), leaving $252$. Total $9 + 90 + 252 = 351$.` },
        { q: String.raw`How many five-card hands from a standard deck have exactly two pairs (two cards of one rank, two of another, and a fifth card of a third rank)?`, answer: "123552",
          solution: String.raw`Choose the two pair ranks together, $\binom{13}{2} = 78$ (ordering them would build each hand twice); the suits of each pair, $\binom42 = 6$ each; and the fifth card from the $44$ cards of other ranks. So $78 \cdot 36 \cdot 44 = 123552$.` },
        { q: String.raw`Each of $12$ students belongs to exactly $3$ clubs, and each club has exactly $4$ members. How many clubs are there?`, answer: "9",
          solution: String.raw`Count the pairs (student, club) with the student in the club. By students, $12 \cdot 3 = 36$; by clubs, $4$ per club. So there are $\tfrac{36}{4} = 9$ clubs.` }
      ],
      problems: [
        "2001 AIME II, Problem 1",
        "2003 AIME I, Problem 3",
        "2004 AIME II, Problem 4",
        "2012 AIME II, Problem 3",
        "2023 AIME I, Problem 3",
        "2009 AIME II, Problem 6"
      ]
    },
    "R10.3": {
      prereq: ["recursive-counting", "organized-listing"],
      cards: [],
      body: String.raw`Points on a circle, joined by all their chords with no three meeting inside, cut the disk into $1, 2, 4, 8, 16$ regions for $1$ to $5$ points. How many for $6$? A $3 \times n$ board can be tiled by dominoes in $3$ ways for $n = 2$ and $11$ for $n = 4$: how many for $n = 6$? Small cases are the fastest way into a problem, and also the fastest way to be fooled.

Small cases do three jobs. They show the structure: listing the strings of length $1$, $2$, $3$ with no three $1$'s in a row often shows how a string is built from a shorter one, which is the [[recursive-counting|recursion]]. They test a formula before it is used: a count for general $n$ that gives the wrong number at $n = 2$, checked by a quick [[organized-listing|list]], is wrong. And they give the first entries of a table that the recursion extends to the size asked for.

What small cases cannot do is replace a reason. The circle's regions are not powers of $2$: with $6$ points there are $31$, not $32$. The true count is $1 + \binom n2 + \binom n4$, one region to start, one more for each chord, and one more for each crossing of two chords, which is a set of $4$ points; for $n \le 5$ it happens to equal $2^{n-1}$. A pattern guessed from small cases is a conjecture until a reason for it is found, and the reason is usually a recursion or a bijection. The tilings of $3 \times n$ follow $t_n = 4t_{n-2} - t_{n-4}$, which gives $t_6 = 4 \cdot 11 - 3 = 41$, and which comes from how a tiling can end, not from the two numbers alone.

Work out the smallest cases by hand, use them to find the structure and to test every formula, and trust a pattern only once it is explained. The next lesson mixes the whole book.`,
      related: [
        { card: "tiling-a-board", note: String.raw`tilings counted by how they end (R5.2).` },
        { card: "bijection-method", note: String.raw`the reason behind a count, as a matching (R4.5).` },
        { card: "restricted-sequences", note: String.raw`strings with a forbidden pattern, counted by states.` }
      ],
      exercises: [
        { q: String.raw`Six points on a circle are joined by all $15$ chords, and no three chords meet at one point inside. Into how many regions do the chords cut the disk?`, answer: "31",
          solution: String.raw`Draw the chords one at a time. Each new chord adds one region, plus one more for each chord it crosses. So the regions number $1 + \binom62 + \binom64 = 1 + 15 + 15 = 31$, since each crossing is a set of $4$ points. The pattern $1, 2, 4, 8, 16$ breaks here.` },
        { q: String.raw`How many strings of $10$ digits, each $0$ or $1$, have no three $1$'s in a row?`, answer: "504",
          solution: String.raw`Split by how a good string ends: in $0$, $01$ or $011$, after a good string of length $n - 1$, $n - 2$ or $n - 3$. So $a_n = a_{n-1} + a_{n-2} + a_{n-3}$ with $a_0 = 1$, $a_1 = 2$, $a_2 = 4$ (checked by listing). Then $7, 13, 24, 44, 81, 149, 274, 504$, so $a_{10} = 504$.` },
        { q: String.raw`A $3 \times n$ board can be tiled by dominoes in $3$ ways when $n = 2$ and in $11$ ways when $n = 4$, and the counts satisfy $t_n = 4t_{n-2} - t_{n-4}$, with $t_0 = 1$. How many tilings does a $3 \times 6$ board have?`, answer: "41",
          solution: String.raw`First check the rule on the given cases: $t_4 = 4t_2 - t_0 = 12 - 1 = 11$. Then $t_6 = 4t_4 - t_2 = 44 - 3 = 41$.` }
      ],
      problems: [
        "2007 AIME II, Problem 6",
        "2007 AIME I, Problem 6",
        "2008 AIME I, Problem 11",
        "2015 AIME II, Problem 10"
      ]
    },
    "R10.4": {
      prereq: ["permutations-combinations", "non-adjacent-selection", "partitions", "basic-probability", "complementary-counting"],
      cards: [],
      body: String.raw`An AIME problem does not say which chapter it comes from. Three numbers are chosen from $1$ to $10$: what is the chance that no two are consecutive? In how many ways can $12$ be written as a sum of three different positive integers in increasing order? Two dice are rolled: what is the chance that the product is even? The first job is to recognize the idea.

A few questions sort most problems. Is the answer a count or a probability? If a probability with equally likely outcomes, it is a count divided by a count, and both counts use the same model, all ordered or all unordered. Are the objects different or identical, and does order matter? That picks between arrangements, choices, stars and bars and partitions. Is there a restriction on neighbors or a "no two" condition? Then gaps, blocks or a shift. "At least one" points to the complement, overlapping conditions to inclusion-exclusion, a process to recursion or states.

For the three numbers with no two consecutive, the shift of [[non-adjacent-selection|non-adjacent selection]] matches them with any $3$ numbers from $1$ to $8$, so the chance is $\tfrac{\binom83}{\binom{10}{3}} = \tfrac{56}{120} = \tfrac{7}{15}$. Writing $12$ as $a \lt b \lt c$ is a small [[partitions|partition]] count, listed by the smallest part: $1 + 2 + 9$, $1 + 3 + 8$, $1 + 4 + 7$, $1 + 5 + 6$, $2 + 3 + 7$, $2 + 4 + 6$, $3 + 4 + 5$, seven ways. And the product of two dice is even unless both are odd, so by the complement its chance is $1 - \tfrac14 = \tfrac34$.

Sort the problem by these questions, choose one model of the outcomes and keep it, and check the answer by a second method or a small case. The Summary follows.`,
      related: [
        { card: "balls-boxes-table", note: String.raw`the four cases of different or identical objects and boxes (R4.2).` },
        { card: "inclusion-exclusion", note: String.raw`conditions that overlap (R3.5).` },
        { card: "states-recursion-prob", note: String.raw`probabilities of a process with states (R9.3).` }
      ],
      exercises: [
        { q: String.raw`Three different numbers are chosen at random from $1$ to $10$. The probability that no two of them are consecutive is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "22",
          solution: String.raw`For $a \lt b \lt c$ with no two consecutive, $a \lt b - 1 \lt c - 2$ are any three numbers from $1$ to $8$, and the map reverses: $\binom83 = 56$ choices, out of $\binom{10}{3} = 120$. So the probability is $\tfrac{56}{120} = \tfrac{7}{15}$, and $m + n = 22$.` },
        { q: String.raw`In how many ways can $12$ be written as $a + b + c$ with positive integers $a \lt b \lt c$?`, answer: "7",
          solution: String.raw`List by $a$. With $a = 1$, $b + c = 11$ and $1 \lt b \lt c$: $b = 2, 3, 4, 5$. With $a = 2$: $b + c = 10$, $b = 3, 4$. With $a = 3$: $b + c = 9$, $b = 4$. With $a = 4$, $b + c = 8$ and $b \ge 5$ forces $c \le 3$: none. So $4 + 2 + 1 = 7$.` },
        { q: String.raw`Two fair dice are rolled. What is the probability that the product of the numbers is even?`, answer: "3/4",
          solution: String.raw`The product is odd only when both dice are odd, with probability $\tfrac12 \cdot \tfrac12 = \tfrac14$. So it is even with probability $\tfrac34$.` }
      ],
      problems: [
        "2023 AIME I, Problem 1",
        "2014 AIME I, Problem 2",
        "2016 AIME II, Problem 2",
        "2012 AIME I, Problem 3",
        "2021 AIME I, Problem 4",
        "2020 AIME I, Problem 5",
        "2019 AIME II, Problem 5"
      ]
    },
    "R10.5": {
      prereq: ["casework-method", "organized-listing", "double-counting", "recursive-counting"],
      cards: [],
      body: String.raw`This chapter added habits, not cards. [[casework-method|Casework]] is checked for gaps and overlaps, and a method is checked by asking how many times it builds one object. [[double-counting|Double counting]] equates two counts of one set.

Small cases, worked out by [[organized-listing|listing]], show the structure, give the first entries of a [[recursive-counting|recursion]], and test every formula, but a pattern is trusted only once it is explained.

A problem from anywhere in the book is sorted by a few questions: count or probability, different or identical, order or not, neighbors, "at least one", overlaps, a process.`,
      strategies: [
        String.raw`Check that every object is in exactly one case.`,
        String.raw`Take one finished object and ask in how many ways your method builds it.`,
        String.raw`Count one set two ways and set the counts equal.`,
        String.raw`Work out the smallest cases by hand before writing a formula, and test the formula on them.`,
        String.raw`Do not trust a pattern from small cases until it is explained.`,
        String.raw`For a probability, choose one model of the outcomes and keep it for both counts.`,
        String.raw`Reduce the fraction before giving $m + n$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many four-digit numbers have digits that strictly increase from left to right?`, answer: "126",
        solution: String.raw`The digits are four different nonzero digits (a $0$ could only lead, which is not allowed), and each choice of four gives one number. So $\binom94 = 126$.` },
      { q: String.raw`Four people are each born in one of $12$ months, independently and equally likely. The probability that at least two share a month is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "137",
        solution: String.raw`By the complement, all four months differ with probability $\tfrac{12 \cdot 11 \cdot 10 \cdot 9}{12^4} = \tfrac{11880}{20736} = \tfrac{55}{96}$. So at least two share with probability $\tfrac{41}{96}$, and $m + n = 137$.` },
      { q: String.raw`Six points on a circle are joined by all their chords, and no three chords meet inside. At how many points inside the circle do two chords cross?`, answer: "15",
        solution: String.raw`Each crossing is made by the two diagonals of a quadrilateral with vertices among the points, and each set of $4$ points gives exactly one: $\binom64 = 15$.` }
    ],
    problems: [
      "2016 AIME I, Problem 2",
      "2013 AIME I, Problem 2",
      "2010 AIME II, Problem 4",
      "2024 AIME II, Problem 3"
    ]
  },
  challenge: {
    problems: [
      "2001 AIME I, Problem 14",
      "2015 AIME II, Problem 12",
      "2018 AIME I, Problem 14",
      "2026 AIME I, Problem 15"
    ]
  }
};
