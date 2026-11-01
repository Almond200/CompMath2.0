// Learn, AMC Counting & Probability, chapter R9: advanced probability (CONVENTIONS §14). Part: Advanced topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R9"] = {
  lessons: {
    "R9.1": {
      prereq: ["conditional-probability", "expected-value", "geometric-probability"],
      cards: [],
      body: String.raw`The harder AMC problems ask three further kinds of probability question: the chance of a cause once its effect is seen, the chance or the expected time for a process that moves at random among a few states, and probabilities about real numbers whose boundaries are curves.

One of two coins is fair and the other has two heads. A coin is picked at random and tossed, and it shows heads. Heads happens with probability $\tfrac12 \cdot 1 = \tfrac12$ by the two-headed coin and $\tfrac12 \cdot \tfrac12 = \tfrac14$ by the fair one, so given heads, the coin is two-headed with probability $\tfrac{1/2}{1/2 + 1/4} = \tfrac23$. A die is rolled until a six appears: since each roll is a six with probability $\tfrac16$, the expected number of rolls is $6$. And a token on the points $0, 1, 2, 3$ starts at $1$ and steps left or right with equal chances until it reaches $0$ or $3$: from $1$ it reaches $3$ first with probability $\tfrac13$, since the chance rises evenly from $0$ at the point $0$ to $1$ at the point $3$.

The lessons take these ideas in turn: Bayes' theorem (R9.2), states and waiting times (R9.3), and continuous probability (R9.4). The Summary (R9.5) collects the strategies.`,
      exercises: [
        { q: String.raw`One of two coins is fair and the other has heads on both sides. A coin is chosen at random and tossed, and it lands heads. What is the probability that it is the two-headed coin?`, answer: "2/3",
          solution: String.raw`Heads comes from the two-headed coin with probability $\tfrac12 \cdot 1 = \tfrac12$, and from the fair coin with probability $\tfrac12 \cdot \tfrac12 = \tfrac14$. Given heads, the two-headed coin has probability $\tfrac{1/2}{3/4} = \tfrac23$.` },
        { q: String.raw`A fair die is rolled until a six appears. What is the expected number of rolls?`, answer: "6",
          solution: String.raw`Let $E$ be the expected number. One roll is always made, and with probability $\tfrac56$ the wait starts over: $E = 1 + \tfrac56 E$, so $E = 6$.` },
        { q: String.raw`A token starts at $1$ on the points $0, 1, 2, 3$ of a line and moves one step left or right with equal probability until it reaches $0$ or $3$. What is the probability that it reaches $3$?`, answer: "1/3",
          solution: String.raw`Let $p_k$ be the chance from $k$, with $p_0 = 0$ and $p_3 = 1$. Then $p_1 = \tfrac12 p_0 + \tfrac12 p_2 = \tfrac12 p_2$ and $p_2 = \tfrac12 p_1 + \tfrac12$. Substituting, $p_2 = \tfrac14 p_2 + \tfrac12$, so $p_2 = \tfrac23$ and $p_1 = \tfrac13$.` }
      ],
      problems: [
        "2022 AMC 8, Problem 25",
        "2017 AMC 10A, Problem 18"
      ]
    },
    "R9.2": {
      prereq: ["conditional-probability"],
      cards: ["bayes-theorem"],
      body: String.raw`A disease affects $1\%$ of a population. A test detects it $90\%$ of the time, but also comes back positive for $10\%$ of healthy people. Someone tests positive: how likely is it that they have the disease? An urn is chosen at random and a red ball is drawn from it: which urn was it? These questions run a conditional probability backward, from the effect to its cause.

[[bayes-theorem|Bayes' theorem]] reverses a condition: $P(A \mid B) = \tfrac{P(B \mid A)\,P(A)}{P(B)}$, where the total chance of the evidence, $P(B)$, adds up every way it can happen. In practice it is a tree. The first branches are the causes, with their chances; the second are the evidence, with its chance under each cause; multiply along each branch that ends in the evidence, and the answer is the share of the branch with the cause asked about. For the test, the positive branches are sick and positive, $0.01 \cdot 0.9 = 0.009$, and healthy and positive, $0.99 \cdot 0.1 = 0.099$, so a positive result means the disease with probability $\tfrac{0.009}{0.108} = \tfrac{1}{12}$.

The answer is small because the cause is rare: the base rate, $1\%$, is small next to the rate of false positives, and most positive results come from the many healthy people. Ignoring the base rate and answering $90\%$ is the usual mistake. When the causes are equally likely, the base rates cancel, and the answer is the share of the evidence's chances: if urn $A$ has $3$ red balls and $1$ blue and urn $B$ has $1$ red and $3$ blue, a red ball came from $A$ with probability $\tfrac{3/4}{3/4 + 1/4} = \tfrac34$.

Draw the tree with the causes first, multiply along the branches that end in what was seen, and take the share of the branch asked about. The next lesson follows a process through its states.`,
      related: [
        { card: "conditional-probability", note: String.raw`the forward direction, from a cause to the chance of its effect (R6.2).` },
        { card: "complementary-counting", note: String.raw`the chance of a negative result as one minus the chance of a positive one.` }
      ],
      exercises: [
        { q: String.raw`A disease affects $1\%$ of a population. A test is positive for $90\%$ of those with the disease and for $10\%$ of those without it. A person tests positive. What is the probability that the person has the disease?`, answer: "1/12",
          solution: String.raw`Positive and sick: $0.01 \cdot 0.9 = 0.009$. Positive and healthy: $0.99 \cdot 0.1 = 0.099$. So $P(\text{sick} \mid \text{positive}) = \tfrac{0.009}{0.009 + 0.099} = \tfrac{9}{108} = \tfrac{1}{12}$.` },
        { q: String.raw`Urn $A$ holds $3$ red balls and $1$ blue ball; urn $B$ holds $1$ red and $3$ blue. An urn is chosen at random and a ball is drawn from it, and it is red. What is the probability that the urn was $A$?`, answer: "3/4",
          solution: String.raw`Red from $A$: $\tfrac12 \cdot \tfrac34 = \tfrac38$. Red from $B$: $\tfrac12 \cdot \tfrac14 = \tfrac18$. So $P(A \mid \text{red}) = \tfrac{3/8}{3/8 + 1/8} = \tfrac34$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 18"
      ]
    },
    "R9.3": {
      prereq: ["conditional-probability", "expected-value", "geometric-series", "recursive-counting"],
      cards: ["states-recursion-prob", "geometric-distribution"],
      body: String.raw`A gambler with $\$2$ bets $\$1$ at a time on fair coin tosses until reaching $\$5$ or nothing: what is the chance of reaching $\$5$? How many tosses, on average, until two heads in a row? How many rolls of a die, on average, until every face has appeared? Each question follows a process that moves at random, with no memory of how it reached where it is.

[[states-recursion-prob|First-step analysis]] gives each state a value and writes one equation for it by looking one step ahead. The process forgets its past, so the chance of winning from a state is the average, over the possible next steps, of the chance of winning from where each step leads: $P_s = p_1 P_{s_1} + p_2 P_{s_2} + \cdots$, with $P = 1$ at a winning end and $P = 0$ at a losing one. For an expected number of steps the equation adds the step just taken: $E_s = 1 + p_1 E_{s_1} + p_2 E_{s_2} + \cdots$, with $E = 0$ at the end. For the gambler, $P_k = \tfrac12 P_{k-1} + \tfrac12 P_{k+1}$ says that the values rise evenly, so $P_k = \tfrac k5$ and the chance from $\$2$ is $\tfrac25$.

The skill is choosing the states. For two heads in a row, the states are "no head just tossed" and "one head just tossed": $E_0 = 1 + \tfrac12 E_1 + \tfrac12 E_0$ and $E_1 = 1 + \tfrac12 \cdot 0 + \tfrac12 E_0$, which give $E_0 = 6$. Symmetry shrinks the list: in a walk on a square grid, points that a rotation of the board exchanges have the same value, so they are one state. And when the question is about a fixed number of steps, not about the end, build the probabilities of the states row by row, one row per step.

[[geometric-distribution|A waiting time]] is the simplest case, one state. A trial that succeeds with probability $p$, repeated until it does, takes $\tfrac1p$ trials on average, since $E = 1 + (1 - p)E$. A wait for several things is a chain of such waits: to see every face of a die, the second new face takes $\tfrac65$ rolls on average once the first is seen, the third $\tfrac64$, and so on, so the whole wait averages $6\left(1 + \tfrac12 + \cdots + \tfrac16\right) = \tfrac{147}{10}$ rolls.

Choose the states, merge those that symmetry makes equal, write one equation per state by its first step, and solve; split a long wait into waits for one success each. The next lesson measures probability with curves.`,
      related: [
        { card: "turn-based-games", note: String.raw`a game of chance in turns, a process with two states (R8.4).` },
        { card: "recursive-counting", note: String.raw`the same one-step-back reasoning for counts (R5.2).` },
        { card: "wlog-symmetry", note: String.raw`merging states that a symmetry exchanges (R7.6).` }
      ],
      exercises: [
        { q: String.raw`A gambler has $\$2$ and bets $\$1$ on each toss of a fair coin, winning or losing $\$1$, until the total is $\$5$ or $\$0$. What is the probability of reaching $\$5$?`, answer: "2/5",
          solution: String.raw`Let $P_k$ be the chance from $\$k$, with $P_0 = 0$, $P_5 = 1$. Each $P_k = \tfrac12(P_{k-1} + P_{k+1})$, so the differences $P_{k+1} - P_k$ are all equal, and $P_k = \tfrac k5$. So $P_2 = \tfrac25$.` },
        { q: String.raw`A fair coin is tossed until two heads appear in a row. What is the expected number of tosses?`, answer: "6",
          solution: String.raw`Let $E_0$ be the expected number from the start or after a tail, and $E_1$ after a head. Then $E_0 = 1 + \tfrac12 E_1 + \tfrac12 E_0$ and $E_1 = 1 + \tfrac12 E_0$. The first gives $E_0 = 2 + E_1$; substituting, $E_1 = 1 + 1 + \tfrac12 E_1$, so $E_1 = 4$ and $E_0 = 6$.` },
        { q: String.raw`A fair die is rolled until every one of the six faces has appeared. What is the expected number of rolls?`, answer: "147/10",
          solution: String.raw`Once $k$ faces have appeared, each roll shows a new one with probability $\tfrac{6 - k}{6}$, so the next new face takes $\tfrac{6}{6 - k}$ rolls on average. Adding for $k = 0$ to $5$: $6\left(1 + \tfrac12 + \tfrac13 + \tfrac14 + \tfrac15 + \tfrac16\right) = 6 \cdot \tfrac{49}{20} = \tfrac{147}{10}$.` },
        { q: String.raw`A fair coin is tossed until either $HH$ or $TH$ appears as two consecutive tosses. What is the probability that $HH$ appears first?`, answer: "1/4",
          solution: String.raw`If the first toss is a tail, the first head after it completes $TH$. If the first is a head and the second a tail, the same happens. So $HH$ comes first only if the first two tosses are both heads: probability $\tfrac14$.` }
      ],
      problems: [
        "2016 AMC 12B, Problem 19",
        "2025 AMC 12B, Problem 18",
        "2019 AMC 10B, Problem 22",
        "2014 AMC 10B, Problem 25",
        "2020 AMC 10A, Problem 13",
        "2019 AMC 12B, Problem 16",
        "2021 Spring AMC 10A, Problem 23",
        "2017 AMC 12A, Problem 22"
      ]
    },
    "R9.4": {
      prereq: ["geometric-probability", "log-rules"],
      cards: ["product-of-uniforms"],
      body: String.raw`Two numbers are chosen at random between $0$ and $1$. What is the chance that their product is at most $\tfrac14$? That their product is at least $\tfrac12$? As in R6.4 the answer is an area in the unit square, but the boundary is now a hyperbola, and a logarithm appears.

[[product-of-uniforms|The product of two uniform numbers]] is at most $c$, for $0 \lt c \le 1$, with probability $c - c \ln c$. The region $xy \le c$ in the unit square is everything on the near side of the curve $y = \tfrac cx$. For $x \le c$ the curve is above the square, so the whole strip of width $c$ counts, area $c$. For $x$ from $c$ to $1$ the region runs up to the curve, and the area under $y = \tfrac cx$ there is $c(\ln 1 - \ln c) = c \ln \tfrac1c$. So $P(XY \le \tfrac14) = \tfrac14 + \tfrac14 \ln 4 = \tfrac{1 + 2\ln 2}{4}$, about $0.60$, and $P(XY \ge \tfrac12) = 1 - \left(\tfrac12 + \tfrac12 \ln 2\right) = \tfrac{1 - \ln 2}{2}$, about $0.15$.

The same area appears whenever a random product is compared with a constant: two random points on two sides of a triangle cut off a triangle whose area is the product of two uniform fractions times the whole, so a question about that area is this question. The AMC asks for such answers as an interval or a decimal, since $\ln 2$ is not a fraction.

Draw the curve in the unit square, take the full strip where the curve is out of the square, and integrate $\tfrac cx$ for the rest. The Summary follows.`,
      related: [
        { card: "geometric-probability", note: String.raw`probability as area when the boundaries are lines (R6.4).` },
        { card: "shared-angle-area-ratio", note: String.raw`the area of a triangle cut off by points on two sides, as a product of fractions.` }
      ],
      exercises: [
        { q: String.raw`Numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $xy \le \tfrac14$? Give the exact value.`,
          solution: String.raw`For $x \le \tfrac14$, every $y$ works: area $\tfrac14$. For $\tfrac14 \le x \le 1$, $y \le \tfrac{1}{4x}$: area $\int_{1/4}^{1} \tfrac{1}{4x}\,dx = \tfrac14 \ln 4$. So the probability is $\tfrac14 + \tfrac14 \ln 4 = \tfrac{1 + 2\ln 2}{4} \approx 0.597$.` },
        { q: String.raw`Numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $xy \ge \tfrac12$? Give the exact value.`,
          solution: String.raw`By the formula with $c = \tfrac12$, $P(xy \le \tfrac12) = \tfrac12 - \tfrac12 \ln \tfrac12 = \tfrac12 + \tfrac12 \ln 2$. So $P(xy \ge \tfrac12) = \tfrac12 - \tfrac12 \ln 2 = \tfrac{1 - \ln 2}{2} \approx 0.153$.` }
      ],
      problems: [
        "2024 AMC 12A, Problem 20"
      ]
    },
    "R9.5": {
      prereq: ["bayes-theorem", "states-recursion-prob", "geometric-distribution", "product-of-uniforms"],
      cards: [],
      body: String.raw`[[bayes-theorem|Bayes' theorem]] finds the chance of a cause from its effect: multiply along the branches that end in the evidence and take a share.

[[states-recursion-prob|First-step analysis]] writes one equation per state, for a probability or an expected time, by averaging over the next step. [[geometric-distribution|A waiting time]] for a success of probability $p$ averages $\tfrac1p$ trials, and a wait for several things is a chain of such waits.

[[product-of-uniforms|The product of two uniform numbers]] is at most $c$ with probability $c - c\ln c$, an area under a hyperbola.`,
      strategies: [
        String.raw`For the chance of a cause, put the causes first in the tree and weigh the base rates.`,
        String.raw`Choose the states, merge the ones a symmetry exchanges, and write one equation per state.`,
        String.raw`For an expected time, add $1$ for the step just taken.`,
        String.raw`For a fixed number of steps, build the states' probabilities row by row.`,
        String.raw`Split a long wait into waits for one success each.`,
        String.raw`When a boundary is a curve, integrate the part of the region the curve cuts off.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A bag holds two coins: one fair, and one that lands heads with probability $\tfrac34$. A coin is drawn at random and tossed twice, landing heads both times. What is the probability that it is the fair coin?`, answer: "4/13",
        solution: String.raw`Two heads from the fair coin: $\tfrac12 \cdot \tfrac14 = \tfrac18$. From the other: $\tfrac12 \cdot \tfrac{9}{16} = \tfrac{9}{32}$. So the fair coin has probability $\tfrac{4/32}{4/32 + 9/32} = \tfrac{4}{13}$.` },
      { q: String.raw`A fair coin is tossed until it lands heads. What is the expected number of tosses?`, answer: "2",
        solution: String.raw`Each toss succeeds with probability $\tfrac12$, so the wait averages $\tfrac{1}{1/2} = 2$; or $E = 1 + \tfrac12 E$.` },
      { q: String.raw`A token starts at $1$ on the points $0, 1, 2, 3, 4$. At each step it moves right with probability $\tfrac23$ and left with probability $\tfrac13$, stopping at $0$ or $4$. What is the probability that it reaches $4$?`, answer: "8/15",
        solution: String.raw`Let $P_k$ be the chance from $k$, $P_0 = 0$, $P_4 = 1$, and $P_k = \tfrac13 P_{k-1} + \tfrac23 P_{k+1}$. Then $P_{k+1} - P_k = \tfrac12(P_k - P_{k-1})$, so the gaps are $d, \tfrac d2, \tfrac d4, \tfrac d8$, adding to $\tfrac{15}{8}d = 1$. So $d = \tfrac{8}{15}$, and $P_1 = d = \tfrac{8}{15}$.` }
    ],
    problems: [
      "2021 Fall AMC 12B, Problem 17",
      "2025 AMC 10B, Problem 24",
      "2019 AIME II, Problem 2",
      "2019 AIME I, Problem 5"
    ]
  },
  challenge: {
    problems: [
      "2014 AIME II, Problem 6",
      "2009 AIME II, Problem 8",
      "1995 AIME, Problem 15",
      "2016 AIME I, Problem 13"
    ]
  }
};
