// Learn, AMC Counting & Probability, chapter R2: probability from scratch (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R2"] = {
  lessons: {
    "R2.1": {
      prereq: ["constructive-counting", "complementary-counting"],
      cards: [],
      body: String.raw`Probability measures how likely something is, on a scale from $0$ (it never happens) to $1$ (it always happens). When every outcome of an experiment is equally likely, the probability of an event is a ratio of two counts: the number of outcomes in the event divided by the number of all outcomes. A fair die has six equally likely faces, three of which ($2$, $3$, $5$) are prime, so the probability of rolling a prime is $\tfrac36 = \tfrac12$.

So probability is counting, done twice. The hard part is choosing the outcomes so that they really are equally likely. When two coins are tossed, the outcomes "two heads", "one head" and "no heads" are not equally likely; the four outcomes $HH$, $HT$, $TH$, $TT$ are. Three of the four have at least one head, so the probability is $\tfrac34$, which is also $1$ minus the probability $\tfrac14$ of no heads.

The average result of an experiment, weighted by probability, is its expected value. A fair die shows $1$ to $6$ equally often, so its expected value is $\tfrac{1 + 2 + \cdots + 6}{6} = \tfrac72$, even though no face shows $3.5$.

The lessons take these ideas in turn: probability by counting (R2.2), several draws and independent events (R2.3), and expected value (R2.4). The Summary (R2.5) collects the strategies.`,
      exercises: [
        { q: String.raw`A fair die is rolled. What is the probability that it shows a prime number?`, answer: "1/2",
          solution: String.raw`The six faces are equally likely and $2$, $3$, $5$ are prime: $\tfrac36 = \tfrac12$.` },
        { q: String.raw`Two fair coins are tossed. What is the probability of at least one head?`, answer: "3/4",
          solution: String.raw`The equally likely outcomes are $HH$, $HT$, $TH$, $TT$, and all but $TT$ have a head: $\tfrac34$.` },
        { q: String.raw`What is the expected value of the number shown by a fair die?`, answer: "7/2",
          solution: String.raw`Each face has probability $\tfrac16$, so the expected value is $\tfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \tfrac{21}{6} = \tfrac72$.` }
      ],
      problems: [
        "1990 AJHSME, Problem 14",
        "1997 AJHSME, Problem 9",
        "1999 AMC 8, Problem 10"
      ]
    },
    "R2.2": {
      prereq: ["constructive-counting", "permutations-combinations", "complementary-counting"],
      cards: ["basic-probability", "symmetry-probability"],
      body: String.raw`With two dice, what is the probability that the sum is $7$, or that the product is even? If four people stand in a random line, what is the probability that $A$ stands somewhere to the left of both $B$ and $C$? The first questions are counts over $36$ outcomes; the last is quicker by symmetry than by any count.

[[basic-probability|Probability by counting]] needs a list of equally likely outcomes. Two dice give $6 \cdot 6 = 36$ ordered outcomes, $(1, 1)$ up to $(6, 6)$, all equally likely, which is why the dice must be treated as different even when they look alike: a sum of $3$ comes from $(1, 2)$ and $(2, 1)$, two outcomes, while a sum of $2$ comes only from $(1, 1)$. A sum of $7$ comes from six outcomes, $(1, 6)$ to $(6, 1)$, so it has probability $\tfrac{6}{36} = \tfrac16$. The product is odd only when both dice are odd, $3 \cdot 3 = 9$ outcomes, so it is even with probability $1 - \tfrac{9}{36} = \tfrac34$: the complement works for probabilities as it does for counts. Probabilities of events that cannot happen together add, and the probability of "$A$ or $B$" is $P(A) + P(B) - P(A \text{ and } B)$ when they can.

[[symmetry-probability|A symmetry argument]] replaces a count by the observation that several outcomes are equally likely. In a random line of $A$, $B$, $C$ and $D$, each of $A$, $B$, $C$ is equally likely to be the leftmost of the three, so $A$ is left of both others with probability $\tfrac13$, without listing the $24$ lines. With two dice, the first is larger than the second as often as the second is larger than the first; ties have probability $\tfrac16$, so the first is larger with probability $\tfrac12\left(1 - \tfrac16\right) = \tfrac{5}{12}$. If $2$ of $5$ people are chosen at random, each person is equally likely to be chosen, and $2$ of the $5$ places are filled, so a given person is chosen with probability $\tfrac25$.

List equally likely outcomes, treating identical-looking objects as different; use the complement for "at least one"; and when several outcomes play the same role, give them equal shares. The next lesson combines several draws.`,
      related: [
        { card: "geometric-probability", note: String.raw`probability as a ratio of lengths or areas when the outcomes are not countable (R6.4).` },
        { card: "conditional-probability", note: String.raw`probability given that something is already known (R6.2).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled. What is the probability that the sum is $7$?`, answer: "1/6",
          solution: String.raw`Of the $36$ equally likely ordered outcomes, $(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)$ give $7$: $\tfrac{6}{36} = \tfrac16$.` },
        { q: String.raw`Two fair dice are rolled. What is the probability that the product of the numbers is even?`, answer: "3/4",
          solution: String.raw`The product is odd only when both numbers are odd, $3 \cdot 3 = 9$ of the $36$ outcomes. So it is even with probability $1 - \tfrac{9}{36} = \tfrac34$.` },
        { q: String.raw`$A$, $B$, $C$ and $D$ stand in a random order in a line. What is the probability that $A$ is to the left of both $B$ and $C$?`, answer: "1/3",
          solution: String.raw`Among $A$, $B$, $C$, each is equally likely to be the leftmost of the three, whatever $D$ does, so the probability is $\tfrac13$. (Of the $24$ orders, $8$ have $A$ first among the three.)` },
        { q: String.raw`Two fair dice are rolled. What is the probability that the first shows a larger number than the second?`, answer: "5/12",
          solution: String.raw`The two dice tie with probability $\tfrac{6}{36} = \tfrac16$. Otherwise, by symmetry, each is equally likely to be the larger, so the probability is $\tfrac12 \cdot \tfrac56 = \tfrac{5}{12}$.` }
      ],
      problems: [
        "1992 AJHSME, Problem 23",
        "1987 AJHSME, Problem 25",
        "1995 AJHSME, Problem 20",
        "2007 AMC 8, Problem 21",
        "2025 AMC 10A, Problem 14"
      ]
    },
    "R2.3": {
      prereq: ["basic-probability", "complementary-counting"],
      cards: ["drawing-without-replacement", "independent-events"],
      body: String.raw`Many experiments happen in stages: draw a ball, then another; roll a die four times. A bag holds $3$ red and $2$ blue balls. What is the probability that two balls drawn one after the other are both red? What is the probability of at least one $6$ in four rolls of a die?

Two events are [[independent-events|independent]] when knowing that one happened does not change the probability of the other, and then the probability that both happen is the product of their probabilities. Coin tosses and dice rolls are independent of each other: the probability of three heads in three tosses and then a $6$ on a die is $\tfrac18 \cdot \tfrac16 = \tfrac{1}{48}$. Products of this kind are the multiplication principle again, with fractions in place of counts.

[[drawing-without-replacement|Drawing without replacement]], where a drawn ball is not put back, makes the stages depend on each other, and the second probability is taken from what is left. Both balls are red with probability $\tfrac35 \cdot \tfrac24 = \tfrac{3}{10}$: after a red ball is drawn, $2$ of the remaining $4$ are red. The same answer comes from counting pairs, $\binom32 / \binom52 = \tfrac{3}{10}$, and checking one method against the other is a good habit. If the first ball is put back before the second draw, the draws are independent and the answer is $\left(\tfrac35\right)^2 = \tfrac{9}{25}$.

The complement turns "at least once" into a product. A die fails to show a $6$ with probability $\tfrac56$ on each roll, independently, so it fails four times in a row with probability $\left(\tfrac56\right)^4 = \tfrac{625}{1296}$, and shows at least one $6$ with probability $1 - \tfrac{625}{1296} = \tfrac{671}{1296}$. Adding $\tfrac16$ four times would give $\tfrac23$, which counts the outcomes with two or more sixes several times.

Multiply along stages, using what is left after each draw; check by counting; and for "at least once", multiply the probabilities of failing and subtract from $1$. The next lesson finds the average outcome.`,
      related: [
        { card: "binomial-probability", note: String.raw`the probability of exactly $k$ successes in $n$ independent trials (R6.3).` },
        { card: "hypergeometric", note: String.raw`drawing several objects without replacement, counted by combinations (R6.2).` }
      ],
      exercises: [
        { q: String.raw`A bag holds $3$ red and $2$ blue balls. Two are drawn without replacement. What is the probability that both are red?`, answer: "3/10",
          solution: String.raw`The first is red with probability $\tfrac35$, and then $2$ of the remaining $4$ are red: $\tfrac35 \cdot \tfrac24 = \tfrac{3}{10}$. By counting, $\binom32 / \binom52 = \tfrac{3}{10}$.` },
        { q: String.raw`The same bag of $3$ red and $2$ blue balls is used, but the first ball is put back before the second is drawn. What is the probability that both are red?`, answer: "9/25",
          solution: String.raw`The draws are now independent, each red with probability $\tfrac35$: $\tfrac35 \cdot \tfrac35 = \tfrac{9}{25}$.` },
        { q: String.raw`A coin is tossed three times and then a die is rolled. What is the probability of three heads followed by a $6$?`, answer: "1/48",
          solution: String.raw`The four results are independent: $\tfrac12 \cdot \tfrac12 \cdot \tfrac12 \cdot \tfrac16 = \tfrac{1}{48}$.` },
        { q: String.raw`A fair die is rolled four times. What is the probability that at least one roll is a $6$?`, answer: "671/1296",
          solution: String.raw`No roll is a $6$ with probability $\left(\tfrac56\right)^4 = \tfrac{625}{1296}$, so at least one is with probability $1 - \tfrac{625}{1296} = \tfrac{671}{1296}$.` }
      ],
      problems: [
        "1989 AJHSME, Problem 25",
        "2000 AMC 8, Problem 21",
        "2005 AMC 10B, Problem 9",
        "2007 AMC 10A, Problem 16",
        "2024 AMC 10A, Problem 17"
      ]
    },
    "R2.4": {
      prereq: ["basic-probability", "independent-events"],
      cards: ["expected-value"],
      body: String.raw`A game pays you the square of the number you roll on a die. What is it worth on average? Two numbers are drawn from $\{1, 2, 3, 4\}$; what is the larger one on average? How many heads come up, on average, in five tosses of a coin?

[[expected-value|The expected value]] of a quantity is the sum of each possible value times its probability: the average over many repetitions. For the game, the values $1, 4, 9, 16, 25, 36$ each have probability $\tfrac16$, so the expected payout is $\tfrac{91}{6}$, about $15.17$. A fair price for the game is exactly its expected value. For the larger of two numbers drawn from $\{1, 2, 3, 4\}$, the $6$ equally likely pairs have larger numbers $2, 3, 4, 3, 4, 4$, so the expected value is $\tfrac{20}{6} = \tfrac{10}{3}$. The expected value need not be a possible value, and it is not the most likely one.

The most useful fact about expected values is that they add: the expected value of a sum is the sum of the expected values, whether or not the parts are independent. This is linearity of expectation. The expected sum of two dice is $\tfrac72 + \tfrac72 = 7$, without listing $36$ outcomes. The number of heads in five tosses is the sum of five quantities, each $1$ for a head and $0$ for a tail, and each has expected value $\tfrac12$, so the expected number of heads is $\tfrac52$. Splitting a count into small pieces like these, each easy to average, is the method that R6.5 develops.

Multiply each value by its probability and add; and when a quantity is a sum, add the expected values of its parts. The Summary follows.`,
      related: [
        { card: "indicator-variables", note: String.raw`writing a count as a sum of $0$-or-$1$ pieces and using linearity (R6.5).` },
        { card: "weighted-average", note: String.raw`expected value is a weighted average with probabilities as weights.` }
      ],
      exercises: [
        { q: String.raw`What is the expected value of the sum of two fair dice?`, answer: "7",
          solution: String.raw`Each die has expected value $\tfrac72$, and expected values add: $\tfrac72 + \tfrac72 = 7$.` },
        { q: String.raw`A game pays you $n^2$ dollars, where $n$ is the result of one roll of a fair die. What is the expected payout, in dollars?`, answer: "91/6",
          solution: String.raw`$\tfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \tfrac{91}{6}$.` },
        { q: String.raw`Two different numbers are chosen at random from $\{1, 2, 3, 4\}$. What is the expected value of the larger one?`, answer: "10/3",
          solution: String.raw`The $6$ pairs are equally likely, with larger numbers $2$ (for $\{1, 2\}$), $3, 3$ (for $\{1, 3\}, \{2, 3\}$) and $4, 4, 4$. The average is $\tfrac{2 + 3 + 3 + 4 + 4 + 4}{6} = \tfrac{20}{6} = \tfrac{10}{3}$.` },
        { q: String.raw`A fair coin is tossed $5$ times. What is the expected number of heads?`, answer: "5/2",
          solution: String.raw`Each toss gives $1$ head with probability $\tfrac12$ and $0$ otherwise, so it contributes $\tfrac12$ on average. By linearity, the five tosses give $5 \cdot \tfrac12 = \tfrac52$.` }
      ],
      problems: [
        "2006 AMC 10A, Problem 13",
        "2015 AMC 10B, Problem 18",
        "2021 Fall AMC 10B, Problem 16",
        "2007 AMC 10B, Problem 22"
      ]
    },
    "R2.5": {
      prereq: ["basic-probability", "symmetry-probability", "drawing-without-replacement", "independent-events", "expected-value"],
      cards: [],
      body: String.raw`[[basic-probability|A probability]] is a ratio of counts over equally likely outcomes, with identical-looking objects treated as different; the complement and the rule for "or" work as they do for counts. [[symmetry-probability|Symmetry]] gives equal shares to outcomes that play the same role.

[[independent-events|Independent events]] multiply. [[drawing-without-replacement|Drawing without replacement]] multiplies too, each probability taken from what is left. For "at least once", multiply the probabilities of failing.

[[expected-value|The expected value]] is the sum of values times probabilities, and the expected value of a sum is the sum of the expected values.`,
      strategies: [
        String.raw`Choose outcomes that are equally likely; label identical objects to make them so.`,
        String.raw`For "at least one", find the probability of none and subtract from $1$.`,
        String.raw`When several outcomes play the same role, they share the probability equally.`,
        String.raw`Multiply along stages, updating what is left after each draw without replacement.`,
        String.raw`Check a stage-by-stage product against a direct count.`,
        String.raw`To average a sum, add the averages of its parts.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A card is drawn from a standard deck of $52$. What is the probability that it is a heart or a king?`, answer: "4/13",
        solution: String.raw`There are $13$ hearts and $4$ kings, one of which is a heart: $13 + 4 - 1 = 16$ cards, so $\tfrac{16}{52} = \tfrac{4}{13}$.` },
      { q: String.raw`A family has $3$ children, each equally likely to be a boy or a girl, independently. What is the probability of exactly $2$ girls?`, answer: "3/8",
        solution: String.raw`Of the $8$ equally likely sequences, $GGB$, $GBG$, $BGG$ have exactly two girls: $\tfrac38$.` },
      { q: String.raw`A ticket wins $10$ dollars with probability $\tfrac{1}{20}$ and nothing otherwise. What is its expected value, in dollars?`, answer: "1/2",
        solution: String.raw`$10 \cdot \tfrac{1}{20} + 0 \cdot \tfrac{19}{20} = \tfrac12$.` },
      { q: String.raw`A drawer holds $4$ black and $4$ white socks. Two are drawn at random. What is the probability that they match?`, answer: "3/7",
        solution: String.raw`Whatever the first sock is, $3$ of the remaining $7$ match it: $\tfrac37$. By counting, $\tfrac{2\binom42}{\binom82} = \tfrac{12}{28} = \tfrac37$.` }
    ],
    problems: [
      "2006 AMC 8, Problem 17",
      "1997 AJHSME, Problem 20",
      "2021 Fall AMC 10A, Problem 9",
      "2023 AMC 10A, Problem 7"
    ]
  },
  challenge: {
    problems: [
      "2025 AMC 10A, Problem 16",
      "2006 AMC 12B, Problem 17",
      "2002 AMC 12A, Problem 16",
      "2012 AMC 12A, Problem 11"
    ]
  }
};
