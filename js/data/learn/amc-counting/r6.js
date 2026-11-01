// Learn, AMC Counting & Probability, chapter R6: probability for the AMC 10 (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R6"] = {
  lessons: {
    "R6.1": {
      prereq: ["basic-probability", "independent-events", "expected-value"],
      cards: [],
      body: String.raw`Chapter R2 measured a probability as a ratio of equally likely outcomes. This chapter goes further: a probability once something is known, the chances in a run of repeated trials, a probability measured by length or area when the choice is a real number, and an expected count found without its distribution.

Two dice are rolled and their sum is $8$. Knowing the sum leaves only the outcomes $(2, 6)$, $(3, 5)$, $(4, 4)$, $(5, 3)$ and $(6, 2)$, still equally likely, and $2$ of these $5$ show a $3$, so the probability of a $3$ is now $\tfrac25$. A coin is tossed $3$ times: each of the $8$ sequences has probability $\tfrac18$, and $3$ of them have exactly $2$ heads, so the chance of exactly $2$ heads is $\tfrac38$. A real number is chosen at random from $0$ to $2$: there are infinitely many outcomes, but equal lengths are equally likely, so the chance that it exceeds $1.5$ is the length $0.5$ out of $2$, that is, $\tfrac14$.

The lessons take these ideas in turn: conditional probability (R6.2), repeated trials (R6.3), probability as length and area (R6.4), and linearity of expectation (R6.5). The Summary (R6.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Two fair dice are rolled, and their sum is $8$. What is the probability that one of them shows a $3$?`, answer: "2/5",
          solution: String.raw`The outcomes with sum $8$ are $(2, 6)$, $(3, 5)$, $(4, 4)$, $(5, 3)$, $(6, 2)$, each equally likely. Two of the five contain a $3$, so the probability is $\tfrac25$.` },
        { q: String.raw`A fair coin is tossed $3$ times. What is the probability of exactly $2$ heads?`, answer: "3/8",
          solution: String.raw`The $8$ sequences are equally likely, and the ones with exactly two heads are $HHT$, $HTH$, $THH$. So the probability is $\tfrac38$.` },
        { q: String.raw`A real number is chosen uniformly at random from the interval $[0, 2]$. What is the probability that it is greater than $1.5$?`, answer: "1/4",
          solution: String.raw`Equal lengths are equally likely, so the probability is the length of $(1.5, 2]$ over the length of $[0, 2]$: $\tfrac{0.5}{2} = \tfrac14$.` }
      ],
      problems: [
        "1996 AJHSME, Problem 25",
        "2019 AMC 8, Problem 15",
        "2002 AMC 8, Problem 21"
      ]
    },
    "R6.2": {
      prereq: ["basic-probability", "independent-events", "permutations-combinations"],
      cards: ["conditional-probability", "hypergeometric"],
      body: String.raw`A family has two children, and at least one is a boy: what is the chance that both are boys? Two cards are drawn from a deck without replacement: what is the chance that both are aces? A box holds $5$ red and $7$ blue balls, and $4$ are drawn: what is the chance that exactly $2$ are red? Each question asks for a probability once something is known, or for a chain of draws in which each draw depends on the ones before.

[[conditional-probability|Conditional probability]] measures an event inside what is known. Knowing that $B$ happened rules out every outcome outside $B$, and $P(A \mid B) = \tfrac{P(A \cap B)}{P(B)}$ is the share of $B$ in which $A$ also happens. With equally likely outcomes this is a count inside $B$. For two children the equally likely outcomes are $BB$, $BG$, $GB$ and $GG$; "at least one boy" leaves three, and only one is $BB$, so the answer is $\tfrac13$, not $\tfrac12$. The common mistake is to condition on the wrong event: "the older child is a boy" leaves $BB$ and $BG$, and then the answer is $\tfrac12$. Read the condition exactly as stated, and list the outcomes it leaves.

Turned around, the formula is $P(A \cap B) = P(B)\,P(A \mid B)$, and it multiplies along a chain of dependent steps. Two aces in two draws: the first is an ace with probability $\tfrac{4}{52}$, and given that, the second is an ace with probability $\tfrac{3}{51}$, so the chance is $\tfrac{4}{52} \cdot \tfrac{3}{51} = \tfrac{1}{221}$. When an outcome can come about in several ways, as a tree with branches, multiply along each branch and add the branches. If $70\%$ of students ride the bus and $20\%$ of them are late, while $5\%$ of the others are late, then a student is late with probability $0.7 \cdot 0.2 + 0.3 \cdot 0.05 = 0.155$.

[[hypergeometric|The hypergeometric count]] does a whole draw at once. Drawing $n$ of $N$ objects without replacement, of which $K$ are special, the chance of exactly $k$ special ones is $\binom Kk \binom{N-K}{n-k} \big/ \binom Nn$: choose which special ones and which others, over all choices of $n$. For the box of balls, $\binom52\binom72 \big/ \binom{12}{4} = \tfrac{10 \cdot 21}{495} = \tfrac{14}{33}$. Multiplying draw by draw gives the same answer, once the orders of the colors are counted.

Condition by restricting to the outcomes that are known, multiply along a chain of draws, add the branches of a tree, and count a whole draw at once when only the number of special objects matters. The next lesson repeats one trial many times.`,
      related: [
        { card: "bayes-theorem", note: String.raw`turning the condition around, from the effect back to the cause (R9.2).` },
        { card: "drawing-without-replacement", note: String.raw`draws in which each one changes the next (R2.3).` },
        { card: "complementary-counting", note: String.raw`the chance of "at least one" by the chance of none.` }
      ],
      exercises: [
        { q: String.raw`A family has two children, each equally likely to be a boy or a girl, and at least one of them is a boy. What is the probability that both are boys?`, answer: "1/3",
          solution: String.raw`The equally likely outcomes are $BB$, $BG$, $GB$, $GG$. Knowing there is a boy leaves $BB$, $BG$, $GB$, and one of these three is $BB$. So the probability is $\tfrac13$.` },
        { q: String.raw`Two cards are drawn from a standard deck of $52$ without replacement. What is the probability that both are aces?`, answer: "1/221",
          solution: String.raw`The first is an ace with probability $\tfrac{4}{52}$; given that, $3$ aces remain among $51$ cards. So the probability is $\tfrac{4}{52} \cdot \tfrac{3}{51} = \tfrac{12}{2652} = \tfrac{1}{221}$.` },
        { q: String.raw`A box holds $5$ red and $7$ blue balls, and $4$ balls are drawn at random without replacement. What is the probability that exactly $2$ of them are red?`, answer: "14/33",
          solution: String.raw`All $\binom{12}{4} = 495$ draws of $4$ are equally likely. Those with exactly $2$ red choose the red pair in $\binom52 = 10$ ways and the blue pair in $\binom72 = 21$ ways. So the probability is $\tfrac{210}{495} = \tfrac{14}{33}$.` },
        { q: String.raw`Of the students at a school, $70\%$ ride the bus. Of those who ride, $20\%$ are late; of those who do not, $5\%$ are late. What fraction of all students are late?`, answer: "31/200",
          solution: String.raw`Multiply along each branch and add: $0.7 \cdot 0.2 + 0.3 \cdot 0.05 = 0.14 + 0.015 = 0.155 = \tfrac{31}{200}$.` }
      ],
      problems: [
        "2011 AMC 10A, Problem 8",
        "2009 AMC 10A, Problem 18",
        "2017 AMC 10B, Problem 11",
        "2005 AMC 10A, Problem 18",
        "2020 AMC 10B, Problem 11",
        "2011 AMC 10A, Problem 21",
        "2023 AMC 10A, Problem 14"
      ]
    },
    "R6.3": {
      prereq: ["independent-events", "permutations-combinations"],
      cards: ["binomial-probability"],
      body: String.raw`A die is rolled $5$ times: what is the chance of exactly two sixes? A coin that lands heads with probability $\tfrac23$ is tossed $4$ times: what is the chance of at least three heads? Each question repeats one trial a fixed number of times, independently, and asks how many times it succeeds.

[[binomial-probability|The binomial probability]] of exactly $k$ successes in $n$ independent trials, each succeeding with probability $p$, is $\binom nk p^k (1 - p)^{n - k}$. Any one sequence with $k$ successes has probability $p^k(1 - p)^{n - k}$, since the trials are independent, and there are $\binom nk$ such sequences, one for each choice of the trials that succeed. Two sixes in $5$ rolls: $\binom52 \left(\tfrac16\right)^2 \left(\tfrac56\right)^3 = \tfrac{1250}{7776} = \tfrac{625}{3888}$. Forgetting the factor $\binom nk$, which counts the orders, is the usual mistake.

"At least" and "at most" add several terms. At least three heads with $p = \tfrac23$ in $4$ tosses is exactly three or exactly four: $4 \cdot \left(\tfrac23\right)^3 \cdot \tfrac13 + \left(\tfrac23\right)^4 = \tfrac{32}{81} + \tfrac{16}{81} = \tfrac{16}{27}$. When the terms are many, the complement is shorter: at least one six in $4$ rolls has probability $1 - \left(\tfrac56\right)^4$. With a fair coin every sequence has probability $\tfrac{1}{2^n}$, and the probability is just a count: exactly $5$ heads in $10$ tosses is $\tfrac{\binom{10}{5}}{2^{10}} = \tfrac{252}{1024} = \tfrac{63}{256}$. And when $p$ is the unknown, setting two binomial probabilities equal gives an equation for it.

Check that the trials are independent and alike, count the sequences with $\binom nk$, and add or complement for "at least". The next lesson measures probability by length and area.`,
      related: [
        { card: "expected-value", note: String.raw`the expected number of successes, $np$ (R2.4).` },
        { card: "symmetry-probability", note: String.raw`a fair coin's symmetry, which pairs $k$ heads with $k$ tails (R2.2).` },
        { card: "complementary-counting", note: String.raw`"at least one" as one minus "none".` }
      ],
      exercises: [
        { q: String.raw`A fair die is rolled $5$ times. What is the probability of exactly two sixes?`, answer: "625/3888",
          solution: String.raw`Choose the two rolls that are sixes, $\binom52 = 10$ ways; each such sequence has probability $\left(\tfrac16\right)^2\left(\tfrac56\right)^3 = \tfrac{125}{7776}$. So the probability is $\tfrac{1250}{7776} = \tfrac{625}{3888}$.` },
        { q: String.raw`A coin lands heads with probability $\tfrac23$. It is tossed $4$ times. What is the probability of at least $3$ heads?`, answer: "16/27",
          solution: String.raw`Exactly $3$ heads: $\binom43 \left(\tfrac23\right)^3 \tfrac13 = \tfrac{32}{81}$. Exactly $4$: $\left(\tfrac23\right)^4 = \tfrac{16}{81}$. Together $\tfrac{48}{81} = \tfrac{16}{27}$.` },
        { q: String.raw`A fair coin is tossed $10$ times. What is the probability of exactly $5$ heads?`, answer: "63/256",
          solution: String.raw`Each of the $2^{10} = 1024$ sequences is equally likely, and $\binom{10}{5} = 252$ of them have five heads. So the probability is $\tfrac{252}{1024} = \tfrac{63}{256}$.` }
      ],
      problems: [
        "2014 AMC 8, Problem 18",
        "2008 AMC 10B, Problem 17",
        "2017 AMC 10B, Problem 9",
        "2004 AMC 10A, Problem 10",
        "2014 AMC 10B, Problem 16",
        "2015 AMC 12B, Problem 17",
        "2021 Fall AMC 10B, Problem 14"
      ]
    },
    "R6.4": {
      prereq: ["basic-probability", "independent-events"],
      cards: ["geometric-probability"],
      body: String.raw`Two numbers are chosen at random between $0$ and $1$: what is the chance that their sum is less than $\tfrac12$? Two friends each arrive at a random time within an hour and wait $15$ minutes for the other: what is the chance that they meet? A stick is broken at two random points: what is the chance that the three pieces form a triangle? The outcomes are real numbers, too many to count, but they can be measured.

[[geometric-probability|Geometric probability]] replaces counting with measuring. A number chosen uniformly from an interval lands in any piece with probability equal to the piece's share of the length. Two numbers chosen independently are one point chosen uniformly from a square, so a probability about them is the share of the square's area where the condition holds. The sum $x + y \lt \tfrac12$ is the corner triangle below the line $x + y = \tfrac12$, of area $\tfrac12 \cdot \tfrac12 \cdot \tfrac12 = \tfrac18$ in the unit square, so the chance is $\tfrac18$.

The method is always the same: name the variables, draw their region (a segment, a square, a rectangle, a cube), turn each condition into a line or curve that cuts the region, and measure the part where all the conditions hold. For the two friends, the arrival times $x$ and $y$ in minutes fill a $60 \times 60$ square, and they meet when $|x - y| \le 15$, the band along the diagonal. The two corner triangles outside it are legs of $45$, so the band has area $3600 - 45^2 = 1575$, and the chance is $\tfrac{1575}{3600} = \tfrac{7}{16}$. For the stick of length $1$ broken at $x \lt y$, the pieces $x$, $y - x$ and $1 - y$ form a triangle when each is less than $\tfrac12$, which cuts the triangle $0 \lt x \lt y \lt 1$ down to a middle triangle of one quarter its area: the chance is $\tfrac14$. Often the complement, the corners, is easier to measure than the region itself.

Curves bring in circles: a point in a square of side $2$ is within $1$ of the center with probability $\tfrac{\pi}{4}$, the disk's share of the square. The probability need not be a fraction of integers.

Draw the region of the variables, turn each condition into a boundary, and measure the share; subtract the corners when that is simpler. The next lesson finds an expected count without its distribution.`,
      related: [
        { card: "product-of-uniforms", note: String.raw`the product of two random numbers, where the boundary is a curve (R9.4).` },
        { card: "symmetry-probability", note: String.raw`regions that are equal by symmetry, such as $x \lt y$ and $y \lt x$ (R2.2).` },
        { card: "triangle-inequality", note: String.raw`the condition on three lengths in the broken stick.` }
      ],
      exercises: [
        { q: String.raw`Two numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $x + y \lt \tfrac12$?`, answer: "1/8",
          solution: String.raw`The point $(x, y)$ is uniform in the unit square, and $x + y \lt \tfrac12$ is the triangle with legs $\tfrac12$ at the corner. Its area is $\tfrac12 \cdot \tfrac12 \cdot \tfrac12 = \tfrac18$, out of $1$.` },
        { q: String.raw`Two friends each arrive at a random time between $1{:}00$ and $2{:}00$, independently, and each waits $15$ minutes for the other before leaving. What is the probability that they meet?`, answer: "7/16",
          solution: String.raw`Let $x$ and $y$ be the arrival minutes, a point uniform in a $60 \times 60$ square. They meet when $|x - y| \le 15$. The two triangles where $|x - y| \gt 15$ have legs $45$ and together area $45^2 = 2025$. So the probability is $1 - \tfrac{2025}{3600} = 1 - \tfrac{9}{16} = \tfrac{7}{16}$.` },
        { q: String.raw`A stick of length $1$ is broken at two points chosen independently and uniformly along it. What is the probability that the three pieces form a triangle?`, answer: "1/4",
          solution: String.raw`Call the break points $x \lt y$, uniform in the triangle $0 \lt x \lt y \lt 1$ of area $\tfrac12$. The pieces $x$, $y - x$, $1 - y$ form a triangle when each is less than $\tfrac12$: $x \lt \tfrac12$, $y \gt \tfrac12$, $y - x \lt \tfrac12$. That is the triangle with vertices $(0, \tfrac12)$, $(\tfrac12, \tfrac12)$, $(\tfrac12, 1)$, of area $\tfrac18$. So the probability is $\tfrac{1/8}{1/2} = \tfrac14$.` },
        { q: String.raw`A point is chosen uniformly at random inside a square of side $2$. What is the probability that it lies within distance $1$ of the center?`, answer: "pi/4",
          solution: String.raw`The points within $1$ of the center form a disk of radius $1$, which fits inside the square. Its area is $\pi$, out of $4$, so the probability is $\tfrac{\pi}{4}$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 12",
        "2011 AMC 10B, Problem 13",
        "2017 AMC 10A, Problem 15",
        "2007 AMC 12B, Problem 13",
        "2002 AMC 12B, Problem 18",
        "2004 AMC 12A, Problem 20",
        "2003 AMC 12A, Problem 16",
        "2009 AMC 10B, Problem 23"
      ]
    },
    "R6.5": {
      prereq: ["expected-value", "basic-probability"],
      cards: ["indicator-variables"],
      body: String.raw`Ten letters are put into their ten envelopes at random: how many, on average, land in the right envelope? A coin is tossed $10$ times: how many times, on average, do two heads appear side by side? The number of matches has a complicated distribution, but its average is simple.

[[indicator-variables|Indicator variables]] split a count into yes-or-no pieces. Write the count $X$ as $X_1 + X_2 + \cdots + X_n$, where $X_i$ is $1$ if the $i$th event happens and $0$ if not. The expected value of a sum is the sum of the expected values, even when the pieces depend on each other, and the expected value of a piece is the probability of its event. So $E[X] = P(A_1) + \cdots + P(A_n)$. Each letter lands in its own envelope with probability $\tfrac{1}{10}$, so the expected number of matches is $10 \cdot \tfrac{1}{10} = 1$, though the matches are far from independent.

The skill is choosing the pieces. For two heads side by side, there are $9$ adjacent pairs of tosses, each both heads with probability $\tfrac14$, so the average is $\tfrac94$. For the number of different values shown by $3$ dice, the pieces are the six faces: a face appears with probability $1 - \left(\tfrac56\right)^3 = \tfrac{91}{216}$, so the average is $6 \cdot \tfrac{91}{216} = \tfrac{91}{36}$. Counting the values directly would need cases for one, two or three different values.

Split the count into events, find the probability of one event, use symmetry to see that the others are the same, and add. The Summary follows.`,
      related: [
        { card: "expected-value", note: String.raw`the average as a sum of values times probabilities (R2.4).` },
        { card: "derangements", note: String.raw`the full distribution of matches, of which the average is one number (R3.4).` },
        { card: "double-counting", note: String.raw`the same sum read two ways, by events or by outcomes (R3.5).` }
      ],
      exercises: [
        { q: String.raw`Ten letters are put into ten addressed envelopes at random, one letter in each. What is the expected number of letters in the right envelope?`, answer: "1",
          solution: String.raw`Let $X_i = 1$ if letter $i$ is in its own envelope. Each letter is equally likely to be in any of the $10$ envelopes, so $E[X_i] = \tfrac{1}{10}$, and $E[X] = 10 \cdot \tfrac{1}{10} = 1$.` },
        { q: String.raw`A fair coin is tossed $10$ times. What is the expected number of places where two heads appear in consecutive tosses?`, answer: "9/4",
          solution: String.raw`There are $9$ pairs of consecutive tosses, and each pair is two heads with probability $\tfrac14$. By linearity the expected number is $9 \cdot \tfrac14 = \tfrac94$.` },
        { q: String.raw`Three fair dice are rolled. What is the expected number of different values that appear?`, answer: "91/36",
          solution: String.raw`Let $X_v = 1$ if the value $v$ appears, for $v = 1, \ldots, 6$. A value is missing from all three dice with probability $\left(\tfrac56\right)^3 = \tfrac{125}{216}$, so it appears with probability $\tfrac{91}{216}$. Then $E[X] = 6 \cdot \tfrac{91}{216} = \tfrac{91}{36}$.` }
      ],
      problems: [
        "2021 Fall AMC 12B, Problem 23"
      ]
    },
    "R6.6": {
      prereq: ["conditional-probability", "hypergeometric", "binomial-probability", "geometric-probability", "indicator-variables"],
      cards: [],
      body: String.raw`[[conditional-probability|Conditional probability]] measures an event inside what is known, and multiplies along a chain of dependent draws. [[hypergeometric|The hypergeometric count]] finds the chance of exactly $k$ special objects in a draw without replacement.

[[binomial-probability|The binomial probability]] counts the sequences with $k$ successes, $\binom nk$, times the chance of each, $p^k(1-p)^{n-k}$.

[[geometric-probability|Geometric probability]] measures the share of a region in which a condition holds. [[indicator-variables|Indicator variables]] find an expected count as a sum of probabilities, with no need for independence.`,
      strategies: [
        String.raw`Read the condition exactly as stated, and list the outcomes it leaves.`,
        String.raw`Multiply along each branch of a tree of draws, then add the branches.`,
        String.raw`For "at least one", subtract the chance of none.`,
        String.raw`In repeated trials, count the orders with $\binom nk$.`,
        String.raw`For random real numbers, draw their region and measure the part where the condition holds.`,
        String.raw`For an expected count, split it into events and add their probabilities.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A fair die is rolled $4$ times. What is the probability that at least one roll is a six?`, answer: "671/1296",
        solution: String.raw`No six appears with probability $\left(\tfrac56\right)^4 = \tfrac{625}{1296}$, so at least one appears with probability $1 - \tfrac{625}{1296} = \tfrac{671}{1296}$.` },
      { q: String.raw`Two fair dice are rolled, and at least one shows a six. What is the probability that both do?`, answer: "1/11",
        solution: String.raw`Of the $36$ outcomes, $36 - 25 = 11$ contain a six, and only $(6, 6)$ has two. So the probability is $\tfrac{1}{11}$.` },
      { q: String.raw`Four couples sit in a row of $8$ chairs in random order. What is the expected number of couples sitting next to each other?`, answer: "1",
        solution: String.raw`A given couple sits together in $7 \cdot 2 \cdot 6!$ of the $8!$ orders (a pair of adjacent seats, an order within it, the rest), with probability $\tfrac{14}{56} = \tfrac14$. By linearity the expected number is $4 \cdot \tfrac14 = 1$.` },
      { q: String.raw`A number $x$ is chosen uniformly from $[0, 3]$ and, independently, $y$ from $[0, 2]$. What is the probability that $x \lt y$?`, answer: "1/3",
        solution: String.raw`The point $(x, y)$ is uniform in a $3 \times 2$ rectangle of area $6$. The part with $x \lt y$ is the triangle with vertices $(0, 0)$, $(0, 2)$, $(2, 2)$, of area $2$. So the probability is $\tfrac26 = \tfrac13$.` }
    ],
    problems: [
      "2021 Fall AMC 10A, Problem 13",
      "2010 AMC 10A, Problem 18",
      "2021 Spring AMC 10B, Problem 18",
      "2010 AMC 12A, Problem 15",
      "2008 AMC 12B, Problem 21"
    ]
  },
  challenge: {
    problems: [
      "2021 Fall AMC 10B, Problem 20",
      "2012 AMC 10A, Problem 25",
      "2003 AMC 12B, Problem 25",
      "2025 AIME I, Problem 13"
    ]
  }
};
