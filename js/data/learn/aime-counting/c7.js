// Learn, AIME Counting & Probability, chapter C7: expected value and random processes (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C7"] = {
  lessons: {
    "C7.1": {
      prereq: ["basic-probability"],
      cards: ["expected-value", "indicator-variables"],
      body: String.raw`The expected value of a random quantity is its long-run average, and contest problems ask for it in situations where the distribution is complicated: the expected number of adjacent boy-girl pairs in a random row, the expected number of regions cut by random chords, the expected number of coins showing heads after several rounds of flipping. The key fact is that expectation adds, even when the parts are dependent, so a complicated count splits into many simple pieces.

The [[expected-value|expected value]] of a quantity $X$ that takes values $x_i$ with probabilities $p_i$ is $E[X] = \sum_i x_ip_i$. For the sum of two dice it is $7$, which can be computed from the $36$ outcomes, but linearity gives it at once: $E[X + Y] = E[X] + E[Y] = 3.5 + 3.5$. Linearity of expectation, $E[X + Y] = E[X] + E[Y]$, holds for any two quantities, independent or not, and that is what makes it powerful. It also gives $E[cX] = cE[X]$, so the expected number of heads in $10$ flips of a coin with heads probability $0.3$ is $10 \cdot 0.3 = 3$.

[[indicator-variables|Indicator variables]] apply linearity to counts. To find the expected number of times something happens, write the count as a sum of indicators, one for each place it could happen, each equal to $1$ if it happens there and $0$ otherwise. The expectation of an indicator is the probability of its event, so the expected count is the sum of the probabilities. In a random row of $5$ boys and $5$ girls, each of the $9$ adjacent pairs is mixed with probability $2 \cdot \tfrac{5}{10} \cdot \tfrac59 = \tfrac59$, so the expected number of mixed pairs is $9 \cdot \tfrac59 = 5$, even though the events for neighboring pairs are dependent. The expected number of regions made by random chords is $1$ plus the expected number of chords plus the expected number of crossings, and each crossing is an indicator for a pair of chords.

The method needs only the probability of each single event, never the joint distribution. Its limit is that it gives the average, not the probability of a particular value; for that, or for the expectation of a product or a square, more work is needed. When a problem asks for an expected count, the first move should almost always be to write the count as a sum of indicators.

Use linearity to split an expected value into parts and indicators to turn a count into a sum of probabilities. The next lesson extends the method to fixed points, ranks and tails.`,
      related: [
        { card: "expected-fixed-points", note: String.raw`the classic indicator computation for permutations (C7.2).` },
        { card: "plane-regions", note: String.raw`regions cut by lines or chords counted by crossings, the structure behind expected-region problems.` },
        { card: "binomial-probability", note: String.raw`the full distribution of a count of independent successes, whose mean is $np$ (C6.3).` }
      ],
      exercises: [
        { q: String.raw`Five boys and five girls stand in a random row. What is the expected number of adjacent pairs consisting of one boy and one girl?`, answer: "5",
          solution: String.raw`Each of the $9$ adjacent pairs is mixed with probability $\tfrac{5}{10} \cdot \tfrac59 + \tfrac{5}{10} \cdot \tfrac59 = \tfrac59$. By linearity the expected number is $9 \cdot \tfrac59 = 5$.` },
        { q: String.raw`A coin with heads probability $0.3$ is flipped $10$ times. What is the expected number of heads?`, answer: "3",
          solution: String.raw`Write the number of heads as a sum of $10$ indicators, one per flip, each with expectation $0.3$. By linearity the expected number is $10 \cdot 0.3 = 3$.` }
      ],
      problems: [
        "2015 AMC 10B, Problem 18",
        "2007 AMC 10B, Problem 22",
        "2021 Fall AMC 12B, Problem 23",
        "2012 AMC 12A, Problem 23",
        "2025 AIME I, Problem 13"
      ]
    },
    "C7.2": {
      prereq: ["indicator-variables"],
      cards: ["expected-fixed-points", "tail-sum-expectation"],
      body: String.raw`Two refinements of the indicator method appear again and again. The first counts how many things a random permutation leaves in place, or how many records it has, or how many cycles: each is a sum of indicators with a simple probability. The second computes the expected value of a maximum, a minimum or a waiting time by adding the probabilities that it is at least each value, which is often easier than finding the distribution.

The expected number of fixed points of a random permutation of $n$ objects is $1$, whatever $n$ is: each object is fixed with probability $\tfrac1n$, and there are $n$ indicators. This is the basic case of [[expected-fixed-points|expected fixed points]], and the same argument gives the expected number of objects that end where they started after random swaps, or of people who get their own hat. A related exact formula counts permutations with exactly $k$ fixed points as $\binom nk D_{n-k}$, using derangements. Records (positions larger than all before them) are similar: position $i$ is a record with probability $\tfrac1i$, so the expected number of records is $1 + \tfrac12 + \cdots + \tfrac1n$.

The [[tail-sum-expectation|tail-sum formula]] says that for a quantity $X$ taking nonnegative integer values, $E[X] = \sum_{k \ge 1}P(X \ge k)$, because $X$ is the number of $k \ge 1$ with $X \ge k$, a sum of indicators. It is the natural tool for a maximum or a minimum, where "at least $k$" or "at most $k$" is a product of independent conditions. The larger of two dice is at least $k$ unless both are below $k$, so $P(\max \ge k) = 1 - \left(\tfrac{k - 1}{6}\right)^2$ and $E[\max] = 6 - \tfrac{0 + 1 + 4 + 9 + 16 + 25}{36} = \tfrac{161}{36}$. For the smallest value among the rows of a random placement of rooks, the tail $P(X \ge i)$ is a count of permutations that avoid a region, which is a product.

Both refinements reduce an expected value to probabilities of simple events. When the quantity is a count, use indicators; when it is a maximum, a minimum or a waiting time, use tails.

The next lesson splits an expectation into cases and sets up equations for processes.`,
      related: [
        { card: "derangements", note: String.raw`the exact count of permutations with no fixed point (C3.2).` },
        { card: "order-statistics", note: String.raw`the expected maximum or minimum of uniform real numbers (C9.3).` },
        { card: "geometric-distribution", note: String.raw`a waiting time whose tails are powers, so its expectation is a geometric series (C7.4).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled. What is the expected value of the larger number shown?`, answer: "161/36",
          solution: String.raw`By the tail-sum formula $E[\max] = \sum_{k=1}^{6}P(\max \ge k)$, and $P(\max \ge k) = 1 - \left(\tfrac{k - 1}{6}\right)^2$. So $E[\max] = 6 - \tfrac{0 + 1 + 4 + 9 + 16 + 25}{36} = 6 - \tfrac{55}{36} = \tfrac{161}{36}$.` },
        { q: String.raw`Ten people put their hats in a pile and each takes one at random. What is the expected number of people who get their own hat?`, answer: "1",
          solution: String.raw`Each person gets their own hat with probability $\tfrac1{10}$. By linearity, the expected number is $10 \cdot \tfrac1{10} = 1$.` }
      ],
      problems: [
        "2025 AMC 10A, Problem 16",
        "2021 Fall AMC 10B, Problem 16",
        "2016 AIME II, Problem 13"
      ]
    },
    "C7.3": {
      prereq: ["conditional-probability", "expected-value", "states-recursion-prob"],
      cards: ["total-expectation"],
      body: String.raw`A random process that forgets its past, where the future depends only on the current position, is analyzed one step at a time. A frog on lily pads, a bug walking on a cube, a coin game that ends after two heads in a row: the probability of eventually reaching a goal, or the expected number of steps to get there, satisfies an equation in terms of the same quantity from the neighboring positions. Solving these equations is first-step analysis.

The [[total-expectation|law of total expectation]] splits an expected value into cases: if the cases $A_i$ cover everything without overlap, $E[X] = \sum_i P(A_i)E[X \mid A_i]$. Flip a coin; on heads roll one die, on tails roll two and add. The expected result is $\tfrac12 \cdot 3.5 + \tfrac12 \cdot 7 = \tfrac{21}{4}$. The same splitting holds for probabilities, and for both it is casework with weights.

[[states-recursion-prob|First-step analysis]], met for probabilities of winning in C5.7, applies the splitting to the first step of a process. Name a quantity for each state: $p_s$ for the probability of winning from state $s$, or $E_s$ for the expected number of steps to finish. Conditioning on the first step gives a linear equation for each state, such as $E_s = 1 + \sum_t P(s \to t)E_t$, with boundary values at the end states. For the number of flips until two heads in a row, the states are "no head just now" and "one head just now": $E_0 = 1 + \tfrac12E_1 + \tfrac12E_0$ and $E_1 = 1 + \tfrac12 \cdot 0 + \tfrac12E_0$, which give $E_1 = 4$ and $E_0 = 6$.

Choosing the states is the important step. They should record exactly what affects the future and nothing more: the distance between two frogs rather than both positions, the number of pairs left in a bag rather than which pairs, the face of a cube rather than the exact square. Symmetry collapses states: on a $3 \times 3$ grid, the four corners behave alike, as do the four edge midpoints. With few states the equations are solved by substitution; with a chain of states, such as lily pads numbered $0$ to $10$, the equations form a recursion that can be solved from one end.

Set up one unknown per state, write one equation per state by conditioning on the first step, and solve. The last lesson of the chapter studies waiting times and games.`,
      related: [
        { card: "recursive-counting", note: String.raw`the counting version of the same one-step recursion (C5.2).` },
        { card: "first-order-recurrence", note: String.raw`solving a chain of state equations as a recurrence (A3.1).` },
        { card: "wlog-symmetry", note: String.raw`merging states that behave alike (A8.1).` }
      ],
      exercises: [
        { q: String.raw`A fair coin is flipped until two heads in a row appear. What is the expected number of flips?`, answer: "6",
          solution: String.raw`Let $E_0$ be the expected number of further flips when the last flip was not a head (or at the start) and $E_1$ when it was. Then $E_0 = 1 + \tfrac12E_1 + \tfrac12E_0$ and $E_1 = 1 + \tfrac12E_0$. The first gives $E_0 = 2 + E_1$, and substituting, $E_1 = 1 + 1 + \tfrac12E_1$, so $E_1 = 4$ and $E_0 = 6$.` },
        { q: String.raw`A fair coin is flipped. On heads one fair die is rolled; on tails two fair dice are rolled and added. What is the expected result?`, answer: "21/4",
          solution: String.raw`By the law of total expectation, $\tfrac12 \cdot 3.5 + \tfrac12 \cdot 7 = \tfrac74 + \tfrac72 = \tfrac{21}{4}$.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 22",
        "2020 AMC 12A, Problem 11",
        "2019 AMC 12B, Problem 16",
        "2021 Fall AMC 12B, Problem 17",
        "2017 AMC 12A, Problem 22",
        "2019 AMC 12B, Problem 19",
        "2021 Spring AMC 12A, Problem 23",
        "1985 AIME, Problem 12",
        "2019 AIME II, Problem 2",
        "2019 AIME I, Problem 5",
        "1994 AIME, Problem 9",
        "2021 AIME II, Problem 8"
      ]
    },
    "C7.4": {
      prereq: ["states-recursion-prob", "geometric-series"],
      cards: ["geometric-distribution", "gamblers-ruin", "turn-based-games"],
      body: String.raw`Many processes end at a random time: rolling until a six, playing until one player is ruined, alternating turns until someone succeeds. The number of steps, and who wins, follow a few standard patterns. Recognizing them saves setting up equations from scratch, and when the pattern does not fit exactly, the same first-step analysis still works.

The number of independent trials up to and including the first success, each succeeding with probability $p$, has the [[geometric-distribution|geometric distribution]]: it equals $k$ with probability $(1 - p)^{k-1}p$, and its expected value is $\tfrac1p$. So a fair die takes $6$ rolls on average to show a six. The tails are powers, $P(X \gt k) = (1 - p)^k$, which makes questions such as "two players need the same number of rolls" a geometric series: $\sum_k \left((1 - p)^{k-1}p\right)^2$.

In a [[turn-based-games|turn-based game]], players alternate and each succeeds on a turn with a fixed probability; the first to succeed wins. If A goes first and both succeed with probability $p$ per turn, A wins on the first turn, or both miss and the game restarts: $P(A) = p + (1 - p)^2P(A)$, so $P(A) = \tfrac{p}{1 - (1 - p)^2}$. With a die and $p = \tfrac16$ that is $\tfrac{1/6}{11/36} = \tfrac{6}{11}$. The restart equation is the quickest route whenever the game returns to its starting state.

The [[gamblers-ruin|gambler's ruin]] is a walk on $0, 1, \ldots, N$ that moves up or down by $1$ each step until it hits an end. For a fair walk started at $k$, the probability of reaching $N$ before $0$ is $\tfrac kN$, and the expected number of steps is $k(N - k)$: from $3$ with $N = 10$ these are $\tfrac{3}{10}$ and $21$. For a biased walk with up-probability $p$ and $r = \tfrac{1 - p}{p}$, the probability of reaching $N$ is $\tfrac{1 - r^k}{1 - r^N}$. These formulas come from first-step analysis, and many random walk problems reduce to them after identifying the right one-dimensional quantity.

Processes with optimal choices, such as guessing the color of the next card, combine expectation with backward induction: the value of a state is the best of the choices, each computed by first-step analysis. The table of values is filled from the end, as for games.

Recognize the geometric waiting time, the restart equation for turn-based games, and the ruin formulas, and fall back on first-step analysis when the process is different. The chapter review mixes expected values with the processes of this chapter.`,
      related: [
        { card: "backward-induction", note: String.raw`labeling positions from the end, for processes with choices (C5.4).` },
        { card: "geometric-series", note: String.raw`the sums behind waiting-time probabilities.` },
        { card: "tail-sum-expectation", note: String.raw`the expected waiting time as a sum of tails (C7.2).` }
      ],
      exercises: [
        { q: String.raw`Players A and B take turns rolling a fair die, A first; the first to roll a $6$ wins. What is the probability that A wins?`, answer: "6/11",
          solution: String.raw`A wins on the first roll with probability $\tfrac16$; otherwise both miss, with probability $\tfrac{25}{36}$, and the game restarts. So $P = \tfrac16 + \tfrac{25}{36}P$, giving $P = \tfrac{1/6}{11/36} = \tfrac{6}{11}$.` },
        { q: String.raw`A fair random walk on $0, 1, \ldots, 10$ starts at $3$ and stops at $0$ or $10$. What is the expected number of steps?`, answer: "21",
          solution: String.raw`For a fair walk the expected time from $k$ satisfies $E_k = 1 + \tfrac12(E_{k-1} + E_{k+1})$ with $E_0 = E_{10} = 0$, whose solution is $E_k = k(10 - k)$. From $3$ it is $3 \cdot 7 = 21$.` }
      ],
      problems: [
        "2015 AMC 12B, Problem 9",
        "2016 AMC 12B, Problem 19",
        "2025 AMC 12B, Problem 18",
        "2025 AMC 12B, Problem 20",
        "1993 AIME, Problem 11",
        "2009 AIME II, Problem 8",
        "2016 AIME I, Problem 13",
        "2023 AIME I, Problem 6",
        "2021 AIME I, Problem 12",
        "1995 AIME, Problem 15"
      ]
    }
  },
  review: [
    "2006 AMC 10A, Problem 13",
    "1987 AIME, Problem 13",
    "1991 AIME, Problem 10",
    "2003 AIME II, Problem 13",
    "2015 AIME II, Problem 5"
  ]
};
