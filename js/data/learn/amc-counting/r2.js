// Learn, AMC Counting & Probability, chapter R2: probability and expected value (CONVENTIONS §14; the AMC track).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R2"] = {
  lessons: {
    "R2.1": {
      prereq: ["permutations-combinations"],
      cards: ["basic-probability", "drawing-without-replacement", "symmetry-probability"],
      body: String.raw`On the AMC 10, probability is almost always counting: the number of favorable outcomes over the number of equally likely outcomes. The work is in choosing outcomes that really are equally likely and counting both sets the same way.

The [[basic-probability|basic probability]] of an event is $\tfrac{\text{favorable}}{\text{total}}$. Two dice give $36$ equally likely ordered pairs; the product is even unless both are odd ($9$ pairs), so the probability is $\tfrac{27}{36} = \tfrac34$. Often the complement is easier, as here.

[[drawing-without-replacement|Drawing without replacement]] is counted with combinations: three cards from a deck are all hearts with probability $\tfrac{\binom{13}3}{\binom{52}3} = \tfrac{11}{850}$. Ordered draws give the same answer if the numerator is ordered too.

[[symmetry-probability|Symmetry]] gives probabilities without counting. Among one red, one blue and three white balls drawn in random order, red comes before blue with probability $\tfrac12$, since swapping the two colors maps one case onto the other; the white balls do not matter. The second card drawn has the same chance of being an ace as the first.

Choose equally likely outcomes, count numerator and denominator alike, and look for a symmetry. The next lesson treats independence and conditioning.`,
      related: [
        { card: "complementary-counting", note: String.raw`counting the outcomes that fail (R1.2).` },
        { card: "conditional-probability", note: String.raw`probabilities given partial information (R2.2).` },
        { card: "geometric-probability", note: String.raw`probability as a ratio of lengths or areas (R2.3).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled. What is the probability that the product of the numbers is even?`, answer: "3/4",
          solution: String.raw`The product is odd only when both are odd, probability $\tfrac12 \cdot \tfrac12 = \tfrac14$. So the answer is $\tfrac34$.` },
        { q: String.raw`Three cards are drawn from a standard deck. What is the probability that all three are hearts?`, answer: "11/850",
          solution: String.raw`$\tfrac{\binom{13}{3}}{\binom{52}{3}} = \tfrac{286}{22100} = \tfrac{11}{850}$.` }
      ],
      problems: [
        "2004 AMC 10A, Problem 5",
        "2021 Fall AMC 10A, Problem 9",
        "2015 AMC 12B, Problem 6",
        "2015 AMC 10B, Problem 16",
        "2020 AMC 10B, Problem 18",
        "2021 Fall AMC 10B, Problem 20",
        "2002 AMC 10A, Problem 24",
        "2008 AMC 12A, Problem 21"
      ]
    },
    "R2.2": {
      prereq: ["basic-probability"],
      cards: ["independent-events", "conditional-probability", "hypergeometric", "binomial-probability"],
      body: String.raw`Repeated experiments and partial information are the next layer. Independent events multiply; conditioning restricts the outcomes to those consistent with what is known.

[[independent-events|Independent events]] do not affect each other, and the probability that both happen is the product: separate coin flips and die rolls are independent. The [[binomial-probability|binomial probability]] of exactly $k$ successes in $n$ independent trials with success probability $p$ is $\binom nk p^k(1 - p)^{n - k}$: exactly $2$ heads in $4$ fair flips has probability $\tfrac{6}{16} = \tfrac38$.

[[conditional-probability|Conditional probability]] counts only the outcomes where the condition holds. Given that two dice sum to $8$, the outcomes are $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$, and both dice are even in three of them, so the probability is $\tfrac35$. Multiplying conditional probabilities along a sequence of steps gives the probability of the whole sequence.

The [[hypergeometric|hypergeometric]] count handles draws without replacement: from $N$ objects with $K$ special ones, a draw of $n$ has exactly $k$ special with probability $\tfrac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}$.

Multiply for independent steps, restrict for conditions, and use binomial or hypergeometric counts for repeated trials. The next lesson moves to continuous probability.`,
      related: [
        { card: "bayes-theorem", note: String.raw`reversing a conditional probability (R3.4).` },
        { card: "binomial-theorem", note: String.raw`the binomial coefficients in the binomial probability (R1.4).` },
        { card: "drawing-without-replacement", note: String.raw`the counts behind hypergeometric probabilities (R2.1).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled and their sum is $8$. What is the probability that both show even numbers?`, answer: "3/5",
          solution: String.raw`The equally likely outcomes with sum $8$ are $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$; three have both numbers even. So $\tfrac35$.` },
        { q: String.raw`A fair coin is flipped $4$ times. What is the probability of exactly $2$ heads?`, answer: "3/8",
          solution: String.raw`$\binom42\left(\tfrac12\right)^4 = \tfrac{6}{16} = \tfrac38$.` }
      ],
      problems: [
        "2011 AMC 10A, Problem 8",
        "2017 AMC 10B, Problem 11",
        "2023 AMC 10A, Problem 14",
        "2014 AMC 10B, Problem 16",
        "2005 AMC 10A, Problem 18",
        "2025 AMC 10B, Problem 22",
        "2017 AMC 12B, Problem 17"
      ]
    },
    "R2.3": {
      prereq: ["basic-probability", "triangle-area-standard"],
      cards: ["geometric-probability"],
      body: String.raw`When a number is chosen at random from an interval, or a point from a region, probability becomes a ratio of lengths or areas. Two random numbers make a random point in a square, and the event is a region in that square.

In [[geometric-probability|geometric probability]], draw the space of outcomes and shade the event. Two numbers chosen uniformly from $[0, 1]$ have sum less than $\tfrac12$ in the triangle below the line $x + y = \tfrac12$, of area $\tfrac18$, so that is the probability. A point chosen in a square of side $2$ is within $1$ of the center inside the inscribed circle, with probability $\tfrac{\pi}{4}$. Conditions like "within $d$ of each other" are bands $|x - y| \le d$ around the diagonal, and "closer to $A$ than to $B$" is a half-plane cut by the perpendicular bisector.

Problems about arrival times, broken sticks and random points on segments all fit this picture. The hard part is drawing the region correctly; the area is usually a polygon or a piece of a circle.

Turn random numbers into a point, draw the event, and divide areas. The next lesson treats expected value.`,
      related: [
        { card: "perpendicular-bisector-locus", note: String.raw`regions of points closer to one point than another (S2.2).` },
        { card: "circular-segment", note: String.raw`areas of pieces of disks (S2.1).` },
        { card: "order-statistics", note: String.raw`the largest and smallest of several random numbers (R3.6).` }
      ],
      exercises: [
        { q: String.raw`Two numbers are chosen independently and uniformly from $[0, 1]$. What is the probability that their sum is less than $\tfrac12$?`, answer: "1/8",
          solution: String.raw`The event is the triangle with vertices $(0, 0)$, $(\tfrac12, 0)$, $(0, \tfrac12)$ in the unit square, of area $\tfrac18$.` },
        { q: String.raw`A point is chosen uniformly in a square of side $2$. What is the probability that it is within distance $1$ of the center?`, answer: "pi/4",
          solution: String.raw`The points within $1$ of the center form the inscribed disk of area $\pi$, and the square has area $4$: $\tfrac{\pi}{4}$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 12",
        "2020 AMC 10A, Problem 16",
        "2011 AMC 10A, Problem 20",
        "2009 AMC 10B, Problem 23",
        "2010 AMC 12B, Problem 18",
        "2015 AMC 10A, Problem 25",
        "2003 AMC 12B, Problem 21",
        "2022 AMC 12B, Problem 22"
      ]
    },
    "R2.4": {
      prereq: ["basic-probability"],
      cards: ["expected-value"],
      body: String.raw`The expected value is the long-run average of a random quantity, and the AMC asks for it in games, counts and processes. It has one property that makes it easy: expectations add, even for dependent quantities.

The [[expected-value|expected value]] of a quantity that takes values $x_i$ with probabilities $p_i$ is $\sum x_ip_i$. A fair die averages $\tfrac{1 + 2 + \cdots + 6}{6} = \tfrac72$, and a game that wins $\$10$ with probability $\tfrac14$ and loses $\$2$ otherwise has expected value $\tfrac{10}{4} - \tfrac{2 \cdot 3}{4} = 1$ dollar. Linearity of expectation says $E[X + Y] = E[X] + E[Y]$ always, so two dice average $7$ and ten fair flips average $5$ heads.

For an expected count, write the count as a sum of indicators, one for each place the event could happen, each with expected value equal to its probability, and add the probabilities. This handles counts such as the expected number of matched pairs or of fixed points without finding their distribution.

Write the quantity as a sum, find each part's expectation, and add. The last lesson of the chapter collects logic puzzles.`,
      related: [
        { card: "indicator-variables", note: String.raw`expected counts as sums of probabilities (R3.4).` },
        { card: "weighted-average", note: String.raw`an expected value is a weighted average (L2.5).` },
        { card: "states-recursion-prob", note: String.raw`expected waiting times by states (R3.5).` }
      ],
      exercises: [
        { q: String.raw`A game pays $\$10$ with probability $\tfrac14$ and costs $\$2$ otherwise. What is the expected gain, in dollars?`, answer: "1",
          solution: String.raw`$\tfrac14 \cdot 10 + \tfrac34 \cdot (-2) = \tfrac{10 - 6}{4} = 1$.` },
        { q: String.raw`What is the expected value of the sum of two fair dice?`, answer: "7",
          solution: String.raw`Each die averages $\tfrac72$, and expectations add: $7$.` }
      ],
      problems: [
        "2006 AMC 10A, Problem 13",
        "2025 AMC 10A, Problem 16",
        "2021 Fall AMC 10B, Problem 16",
        "2015 AMC 10B, Problem 18",
        "2007 AMC 10B, Problem 22",
        "2012 AMC 12A, Problem 23"
      ]
    },
    "R2.5": {
      prereq: ["casework-method"],
      cards: ["truth-tellers-logic", "magic-squares"],
      body: String.raw`A few AMC problems are logic puzzles: people who always lie or always tell the truth, rankings from clues, or grids whose rows and columns must add to the same sum. They need no formulas, only careful cases.

In [[truth-tellers-logic|truth-teller puzzles]], assume something about one speaker and follow the consequences until a contradiction or a consistent assignment appears. If A says "B is a liar" and B says "we are both truth-tellers", then B cannot be truthful (that would make A truthful, and A calls B a liar), so B lies and A tells the truth: exactly one truth-teller. When statements count how many are true, case on that number.

In [[magic-squares|magic squares]], every row, column and diagonal has the same sum. The rows together hold every entry once, so the magic sum is the total divided by the number of rows: for $2, 3, \ldots, 10$ in a $3 \times 3$ square the total is $54$ and the magic sum $18$. The center of a $3 \times 3$ magic square is one third of the magic sum, here $6$, since the middle row, middle column and two diagonals count the center four times and everything else once.

Assume, follow, and check; and count totals before filling grids. The next chapter adds the counting and probability of the AMC 12.`,
      related: [
        { card: "casework-method", note: String.raw`splitting a puzzle into cases (R1.2).` },
        { card: "organized-listing", note: String.raw`listing possibilities in order .` },
        { card: "averages-to-totals", note: String.raw`totals behind magic sums (L2.5).` }
      ],
      exercises: [
        { q: String.raw`The numbers $2, 3, \ldots, 10$ fill a $3 \times 3$ magic square. What is the center number?`, answer: "6",
          solution: String.raw`The total is $54$, so each line sums to $18$. The middle row, middle column and both diagonals add to $72$ and count the center four times and every other cell once: $3c + 54 = 72$, so $c = 6$.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 5",
        "2018 AMC 10A, Problem 5",
        "2015 AMC 10B, Problem 6",
        "2011 AMC 10B, Problem 8",
        "2025 AMC 12A, Problem 4",
        "2020 AMC 12A, Problem 5",
        "2022 AMC 12A, Problem 9",
        "2000 AMC 10, Problem 21"
      ]
    }
  }
};
