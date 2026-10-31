// Learn, AMC to AIME Bridge, chapter B4: counting and probability fundamentals (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["B4"] = {
  lessons: {
    "B4.1": {
      prereq: [],
      cards: ["permutations-combinations"],
      body: String.raw`Counting starts with two rules and two formulas. If a choice is made in steps, the number of outcomes is the product of the numbers of options at each step; if the outcomes split into separate groups, the count is the sum of the group counts. From these come the counts of ordered and unordered selections, which appear inside almost every counting problem on the AMC.

The product rule counts sequences of choices: a license plate of three letters followed by three digits has $26^3 \cdot 10^3$ possibilities, and choosing a president, vice president and treasurer from $10$ people has $10 \cdot 9 \cdot 8 = 720$ outcomes, since each office removes one candidate. The sum rule adds disjoint cases: a code that is either two letters or three digits has $26^2 + 10^3$ possibilities.

[[permutations-combinations|Permutations and combinations]] name the two kinds of selection. An ordered selection of $k$ from $n$ distinct objects, a permutation, can be made in $\tfrac{n!}{(n - k)!}$ ways. An unordered selection, a combination, can be made in $\binom nk = \tfrac{n!}{k!(n - k)!}$ ways, because each unordered group of $k$ appears in $k!$ orders: a committee of $3$ from $10$ people can be chosen in $\tfrac{720}{6} = 120$ ways. The deciding question is whether rearranging the chosen objects gives a different outcome: offices, rankings and passwords are ordered; committees, hands of cards and sets of points are not.

Binomial coefficients also count paths and positions: the number of ways to place $k$ identical marks among $n$ spots is $\binom nk$, which is why lattice paths and binary strings with $k$ ones are counted the same way. Symmetry, $\binom nk = \binom n{n-k}$, says choosing who is in is the same as choosing who is out.

Decide whether order matters, count by the product rule, and divide by the orders that do not matter. The next lesson splits counts into cases and counts complements.`,
      related: [
        { card: "constructive-counting", note: String.raw`building objects step by step with the restricted choices first (C1.2).` },
        { card: "uniform-overcount", note: String.raw`dividing by a fixed overcount, the idea behind $\binom nk$ (C1.5).` },
        { card: "binomial-theorem", note: String.raw`binomial coefficients as coefficients of $(x + y)^n$ (C4.4).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a committee of $3$ be chosen from $10$ people?`, answer: "120",
          solution: String.raw`$\binom{10}{3} = \tfrac{10 \cdot 9 \cdot 8}{3!} = 120$.` },
        { q: String.raw`In how many ways can a president, a vice president and a treasurer be chosen from $10$ people, if no one holds two offices?`, answer: "720",
          solution: String.raw`The offices are different, so order matters: $10 \cdot 9 \cdot 8 = 720$.` }
      ],
      problems: [
        "2007 AMC 10B, Problem 8",
        "2017 AMC 10A, Problem 8",
        "2006 AMC 12B, Problem 7",
        "2006 AMC 12B, Problem 9",
        "2005 AMC 10B, Problem 18",
        "2019 AMC 10B, Problem 25",
        "2003 AMC 12A, Problem 20",
        "2005 AIME II, Problem 1"
      ]
    },
    "B4.2": {
      prereq: ["permutations-combinations"],
      cards: ["casework-method", "complementary-counting"],
      body: String.raw`Most counting problems are too irregular for a single formula, and the two standard responses are to split them into cases that are each easy, or to count what is not wanted and subtract. Choosing well between them, and avoiding the double counting that careless cases cause, is the main counting skill at the AMC level.

[[casework-method|Casework]] splits the objects by one feature into groups that do not overlap and together cover everything, counts each group, and adds. The ways to roll a sum of $7$ with two dice split by the first die: each value $1$ through $6$ allows exactly one second value, $6$ ways. Good cases are few, clearly separate, and each easy to count; the dividing feature is usually the one that most affects the rest, such as the largest number, the first digit, or how many of something there are.

[[complementary-counting|Counting the complement]] subtracts the unwanted outcomes from the total. Three-digit numbers with at least one digit $0$ are all $900$ three-digit numbers minus the $9^3 = 729$ with no $0$, which is $171$; counting them directly needs cases for one or two zeros. The complement is best when the wanted condition says "at least one" and its opposite says "none".

Overcounting is the usual error. When objects are counted by choosing pieces, the same object must not be reachable in two ways; when cases are added, they must not overlap. Checking the method on a small version of the problem, where every object can be listed, catches both errors.

Split into separate cases or subtract a simple complement, and check on a small case. The next lesson counts arrangements with repeated objects and adjacency conditions.`,
      related: [
        { card: "pie", note: String.raw`subtracting overlapping unwanted cases correctly (C3.1).` },
        { card: "organized-listing", note: String.raw`listing small cases in order to check a count (B2.4).` },
        { card: "constructive-counting", note: String.raw`counting by building, with cases where choices depend on earlier ones (C1.2).` }
      ],
      exercises: [
        { q: String.raw`How many three-digit numbers contain at least one digit $0$?`, answer: "171",
          solution: String.raw`There are $900$ three-digit numbers, and $9 \cdot 9 \cdot 9 = 729$ of them have no $0$ (each digit from $1$ to $9$). So $900 - 729 = 171$ contain a $0$.` }
      ],
      problems: [
        "2009 AMC 10A, Problem 2",
        "2012 AMC 10B, Problem 9",
        "2001 AMC 10, Problem 13",
        "2020 AMC 10B, Problem 17",
        "2016 AMC 12A, Problem 14",
        "2024 AMC 12B, Problem 17",
        "2021 Spring AMC 10A, Problem 25",
        "2018 AIME I, Problem 1",
        "2004 AIME I, Problem 6"
      ]
    },
    "B4.3": {
      prereq: ["permutations-combinations"],
      cards: ["multiset-permutations", "gap-method", "counting-blocks"],
      body: String.raw`Arrangements with repeated letters, objects that must stay together, and objects that must stay apart are the three standard twists on counting orders. Each has a one-line fix: divide by the orders of identical objects, glue the objects that stay together into a block, and place the objects that stay apart into gaps.

[[multiset-permutations|Arrangements with repeated objects]] number $\tfrac{n!}{n_1!\,n_2!\cdots}$ when there are $n_1$ copies of one kind, $n_2$ of another, and so on, because swapping identical copies does not change the arrangement. BANANA has $6$ letters with three A's and two N's, so $\tfrac{6!}{3!\,2!} = 60$ arrangements.

[[counting-blocks|Counting with blocks]] handles objects that must be together: glue them into one block, arrange the block with the other objects, then arrange the objects inside the block. Four boys and three girls in a row with the girls together: the block and the four boys are $5$ units, $5!$ orders, times $3!$ orders inside the block, $720$ in all. Conditions such as "these two are not together" are then counted by complement.

The [[gap-method|gap method]] handles objects that must be apart: arrange the other objects first, then choose gaps for the separated ones. With $m$ objects in a row there are $m + 1$ gaps, so placing $k$ separated objects can be done in $\binom{m + 1}{k}$ ways, times the orders of each group. This is also the way to count selections with no two adjacent.

Divide for identical objects, glue for objects that stay together, and use gaps for objects that stay apart. The last lesson of the chapter turns counts into probabilities.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`choosing positions with no two adjacent, the gap method's count (C2.4).` },
        { card: "circular-permutations", note: String.raw`arrangements around a circle (C2.3).` },
        { card: "stars-and-bars", note: String.raw`identical objects into groups, another arrangement of two symbols (C2.5).` }
      ],
      exercises: [
        { q: String.raw`How many different arrangements of the letters of BANANA are there?`, answer: "60",
          solution: String.raw`There are $6$ letters with three A's and two N's: $\tfrac{6!}{3!\,2!\,1!} = \tfrac{720}{12} = 60$.` },
        { q: String.raw`Four boys and three girls stand in a row with the three girls next to each other. How many orders are possible?`, answer: "720",
          solution: String.raw`Glue the girls into a block: the block and four boys make $5$ units, arranged in $5! = 120$ ways, and the girls can be ordered inside the block in $3! = 6$ ways. The total is $720$.` }
      ],
      problems: [
        "2020 AMC 10B, Problem 5",
        "2005 AMC 10A, Problem 9",
        "2019 AMC 10A, Problem 17",
        "2024 AMC 10A, Problem 20",
        "2008 AMC 10B, Problem 22",
        "2024 AMC 12B, Problem 25",
        "2008 AIME I, Problem 9"
      ]
    },
    "B4.4": {
      prereq: ["permutations-combinations"],
      cards: ["basic-probability", "independent-events", "conditional-probability"],
      body: String.raw`Probability at the AMC level is counting with a denominator: when outcomes are equally likely, the probability of an event is the number of favorable outcomes divided by the total. Two further ideas, independence and conditioning, handle repeated experiments and partial information.

The [[basic-probability|basic probability]] of an event is $\tfrac{\text{favorable outcomes}}{\text{total outcomes}}$ when all outcomes are equally likely. Two dice have $36$ equally likely ordered outcomes, and $6$ of them sum to $7$, so the probability is $\tfrac16$. The outcomes must really be equally likely: the eleven possible sums are not, but the $36$ ordered pairs are. Probabilities of disjoint events add, and the probability that an event fails is $1$ minus the probability that it happens.

Two events are [[independent-events|independent]] when one does not affect the other, and then the probability that both happen is the product. Three fair coins all show heads with probability $\left(\tfrac12\right)^3 = \tfrac18$. Separate rolls, flips and spins are independent; draws without replacement are not, because each draw changes what remains.

[[conditional-probability|Conditional probability]] updates for partial information: the probability of $A$ given $B$ is $\tfrac{P(A \text{ and } B)}{P(B)}$, the fraction of the outcomes in $B$ that are also in $A$. Given that a die shows an even number, the chance that it is $6$ is $\tfrac13$, since the outcomes $2$, $4$, $6$ remain. Multiplying conditional probabilities along a sequence of steps gives the probability of the whole sequence: two aces in two draws from a deck has probability $\tfrac{4}{52} \cdot \tfrac{3}{51}$.

Choose equally likely outcomes and count, multiply for independent steps, and restrict the sample space when information is given. The next chapter turns to geometry.`,
      related: [
        { card: "drawing-without-replacement", note: String.raw`counting draws without replacement (C6.1).` },
        { card: "bayes-theorem", note: String.raw`reversing a conditional probability (C6.2).` },
        { card: "geometric-probability", note: String.raw`probability with continuous random numbers, as a ratio of areas (C6.5).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled. What is the probability that the sum is $7$?`, answer: "1/6",
          solution: String.raw`Of the $36$ equally likely ordered outcomes, $(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)$ sum to $7$: $\tfrac{6}{36} = \tfrac16$.` },
        { q: String.raw`A fair die is rolled and shows an even number. What is the probability that it shows $6$?`, answer: "1/3",
          solution: String.raw`Given an even number, the equally likely outcomes are $2$, $4$, $6$, and one of them is $6$: probability $\tfrac13$.` }
      ],
      problems: [
        "2004 AMC 10A, Problem 5",
        "2012 AMC 10A, Problem 9",
        "2016 AMC 10A, Problem 12",
        "2024 AMC 10A, Problem 17",
        "2025 AMC 12A, Problem 13",
        "2009 AMC 12B, Problem 17",
        "2020 AMC 12B, Problem 20",
        "2021 AIME I, Problem 1",
        "2000 AIME II, Problem 3"
      ]
    }
  }
};
