// Learn, AIME Counting & Probability, chapter C6: probability through counting (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["C6"] = {
  lessons: {
    "C6.1": {
      prereq: ["basic-probability"],
      cards: [],
      body: String.raw`This chapter finds probabilities by counting. Its tools are the sample space of equally likely outcomes, conditioning, independence, complements and inclusion-exclusion, and, when the outcomes form a continuum, lengths and areas in place of counts.

When every outcome of an experiment is equally likely, the probability of an event is the number of outcomes in it divided by the number of outcomes in all. The whole difficulty is in choosing the outcomes so that they really are equally likely, and in counting the event and the total in the same way: both ordered, or both unordered. Two cards drawn from a deck are both hearts with probability $\binom{13}{2} \big/ \binom{52}{2} = \tfrac{1}{17}$, or, drawing in order, $\tfrac{13}{52} \cdot \tfrac{12}{51} = \tfrac{1}{17}$.

A conditional probability is the probability of an event once something is known to have happened. The known event becomes the new sample space, and the probability is the part of it where the event also happens. Two events are independent when knowing one does not change the probability of the other, and then the probability that both happen is the product. Draws with replacement are independent; draws without replacement are not.

The counting tools of the earlier chapters carry over. The probability that something happens at least once is $1$ minus the probability that it never happens, and the probability of a union of overlapping events is found by inclusion-exclusion.

When a point is chosen uniformly from an interval or a region, the probability of an event is its length or area divided by the whole, and the work is to draw the region.

The lessons take these ideas in turn: the sample space (C6.2), conditional probability (C6.3), independence and sampling without replacement (C6.4), complements and inclusion-exclusion (C6.5), and probability in arrangements and regions (C6.6). The Summary (C6.7) collects the strategies.`,
      exercises: [
        { q: String.raw`A family has two children, each equally likely to be a boy or a girl, independently. Given that at least one is a girl, what is the probability that both are girls?`, answer: "1/3",
          solution: String.raw`The four equally likely outcomes, oldest first, are BB, BG, GB, GG. Knowing that at least one is a girl removes BB, leaving three equally likely outcomes, of which one is GG. The probability is $\tfrac13$.` },
        { q: String.raw`A fair die is rolled four times. What is the probability that at least one roll shows a $6$?`, answer: "671/1296",
          solution: String.raw`The complement is that no roll shows a $6$. The rolls are independent, so this has probability $\left(\tfrac56\right)^4 = \tfrac{625}{1296}$. The answer is $1 - \tfrac{625}{1296} = \tfrac{671}{1296}$.` },
        { q: String.raw`A point $(x, y)$ is chosen uniformly at random in the unit square $0 \le x, y \le 1$. What is the probability that $x + y \lt \tfrac12$?`, answer: "1/8",
          solution: String.raw`The points with $x + y \lt \tfrac12$ form a right triangle with legs $\tfrac12$ in the corner at the origin. Its area is $\tfrac12 \cdot \tfrac12 \cdot \tfrac12 = \tfrac18$, and the square has area $1$, so the probability is $\tfrac18$.` }
      ],
      problems: [
        "2019 AIME I, Problem 2",
        "2010 AIME II, Problem 4",
        "2001 AIME I, Problem 10"
      ]
    },
    "C6.2": {
      prereq: ["basic-probability", "permutations-combinations"],
      cards: ["drawing-without-replacement"],
      body: String.raw`Most contest probability is counting with a denominator. When every outcome of an experiment is equally likely, the probability of an event is the number of outcomes in it divided by the total, and the work is in describing the outcomes so that they really are equally likely and so that both counts are easy. Drawing cards from a deck, rolling dice, choosing a random divisor, or placing trees in a random row all start this way.

The first decision is the sample space. Outcomes must be equally likely, so the sums of two dice are not a good sample space (a sum of $7$ is six times as likely as a sum of $2$), but the $36$ ordered pairs are. A good choice also makes the event easy to count. Order may be included or ignored, but the same choice must be made in the numerator and the denominator: two hearts from a deck have probability $\tfrac{13 \cdot 12}{52 \cdot 51}$ counting ordered draws, or $\tfrac{\binom{13}{2}}{\binom{52}{2}}$ counting unordered pairs, and both equal $\tfrac1{17}$. Often only part of the outcome matters, and the rest can be ignored: if trees of three kinds are planted in a random row and the question is only about where the birches are, the sample space can be the positions of the birches, all $\binom{12}{5}$ of them equally likely.

[[drawing-without-replacement|Drawing without replacement]] is the most common setting. From $5$ red and $4$ blue balls, drawing $3$ at random gives exactly $2$ red with probability $\tfrac{\binom52\binom41}{\binom93} = \tfrac{40}{84} = \tfrac{10}{21}$: choose which red and which blue balls, out of all choices of $3$. The same answer comes from multiplying conditional probabilities along one order of draws and multiplying by the number of orders. Drawing one at a time and drawing all at once give the same probabilities, which is often the key to a clean count: the color of the fifth ball drawn has the same distribution as the color of the first.

Probabilities over number-theoretic objects work the same way. A random divisor of $10^{99}$ is $2^a5^b$ with $a$ and $b$ independent and uniform from $0$ to $99$, so questions about divisibility become questions about the exponents. A random arrangement of a multiset is uniform over the distinct arrangements only if the objects are treated as indistinguishable consistently.

Choose equally likely outcomes, ignore what does not matter, and count numerator and denominator the same way. The next lesson updates probabilities when partial information is known.`,
      related: [
        { card: "hypergeometric", note: String.raw`the general formula for the number of special objects in a draw (C6.4).` },
        { card: "symmetry-probability", note: String.raw`why the fifth draw has the same distribution as the first (C4.4).` },
        { card: "number-of-divisors", note: String.raw`counting the divisors in a random-divisor sample space.` }
      ],
      exercises: [
        { q: String.raw`Two cards are drawn without replacement from a standard $52$-card deck. What is the probability that both are hearts?`, answer: "1/17",
          solution: String.raw`Unordered pairs: $\tfrac{\binom{13}{2}}{\binom{52}{2}} = \tfrac{78}{1326} = \tfrac{1}{17}$. Ordered draws give the same, $\tfrac{13}{52} \cdot \tfrac{12}{51} = \tfrac{1}{17}$.` },
        { q: String.raw`A bag holds $5$ red and $4$ blue balls. Three are drawn at random without replacement. What is the probability that exactly two are red?`, answer: "10/21",
          solution: String.raw`Choose $2$ of the $5$ red and $1$ of the $4$ blue, out of all choices of $3$ of the $9$: $\tfrac{\binom52\binom41}{\binom93} = \tfrac{10 \cdot 4}{84} = \tfrac{10}{21}$.` }
      ],
      problems: [
        "2015 AMC 12B, Problem 6",
        "2020 AMC 12B, Problem 16",
        "2016 AMC 12A, Problem 13",
        "1988 AIME, Problem 5",
        "2004 AIME II, Problem 2",
        "2013 AIME I, Problem 6",
        "1984 AIME, Problem 11",
        "1999 AIME, Problem 10",
        "2022 AIME I, Problem 9"
      ]
    },
    "C6.3": {
      prereq: ["basic-probability", "conditional-probability"],
      cards: ["bayes-theorem"],
      body: String.raw`Many probability questions give partial information and ask for a probability in light of it: given that at least one child is a boy, what is the chance both are? Given that a test is positive, what is the chance of the disease? Given that a die showed two sixes, what is the chance it was the biased one? The answer is a conditional probability, and the main danger is an intuitive answer that ignores how the information was obtained.

The [[conditional-probability|conditional probability]] of $A$ given $B$ is $P(A \mid B) = \tfrac{P(A \cap B)}{P(B)}$: restrict the sample space to $B$ and ask what fraction of it is in $A$. With equally likely outcomes it is a ratio of counts. A family with two children, each a boy or girl with probability $\tfrac12$, has outcomes $BB$, $BG$, $GB$, $GG$; given at least one boy, three outcomes remain, and both are boys in one of them, so the probability is $\tfrac13$, not $\tfrac12$. The multiplication rule $P(A \cap B) = P(B)P(A \mid B)$ runs the definition forward, and it is how a sequence of draws or a tournament is computed: multiply the probabilities of each step given what came before. The law of total probability adds over cases: $P(A) = \sum_i P(B_i)P(A \mid B_i)$ for disjoint cases $B_i$ that cover everything.

[[bayes-theorem|Bayes' theorem]] reverses a conditional probability: $P(B \mid A) = \tfrac{P(A \mid B)P(B)}{P(A)}$, where the denominator comes from total probability. A disease affects $1\%$ of people, and a test is $99\%$ accurate on both the sick and the healthy. Among $10000$ people, $100$ are sick and $99$ of them test positive, while $9900$ are healthy and $99$ of them test positive too. So a positive test means disease with probability $\tfrac{99}{198} = \tfrac12$. Working with a population of a convenient size, such as $100$ students or $10000$ people, makes Bayes' theorem a count and avoids most errors.

When conditions are stated as percentages of different groups, translate each into a count of a common population before combining. When a process has stages, draw the tree of cases and multiply along branches.

Restrict the sample space to what is known, use a population of convenient size for reversed conditions, and multiply along the stages of a process. The next lesson treats independent trials and repeated experiments.`,
      related: [
        { card: "independent-events", note: String.raw`events whose conditional probabilities equal their plain ones (C6.4).` },
        { card: "total-expectation", note: String.raw`the same splitting into cases for expected values (C7.4).` },
        { card: "casework-method", note: String.raw`the law of total probability is casework with weights.` }
      ],
      exercises: [
        { q: String.raw`A family has two children, each a boy or a girl with probability $\tfrac12$ independently. Given that at least one is a boy, what is the probability that both are boys?`, answer: "1/3",
          solution: String.raw`The equally likely outcomes are $BB$, $BG$, $GB$, $GG$. Knowing at least one boy removes $GG$, leaving three outcomes, of which one is $BB$. The probability is $\tfrac13$.` },
        { q: String.raw`A disease affects $1\%$ of a population. A test is positive for $99\%$ of sick people and negative for $99\%$ of healthy people. Given a positive test, what is the probability of the disease?`, answer: "1/2",
          solution: String.raw`Out of $10000$ people, $100$ are sick and $99$ of them test positive; $9900$ are healthy and $1\%$ of them, $99$, test positive. Of the $198$ positives, $99$ are sick, so the probability is $\tfrac{99}{198} = \tfrac12$.` }
      ],
      problems: [
        "2011 AMC 12A, Problem 5",
        "2017 AMC 12B, Problem 10",
        "2010 AMC 12A, Problem 16",
        "2005 AIME II, Problem 2",
        "2015 AIME II, Problem 2",
        "2016 AIME II, Problem 2",
        "2014 AIME II, Problem 6",
        "2024 AIME I, Problem 4",
        "2010 AIME II, Problem 13",
        "2017 AIME II, Problem 9"
      ]
    },
    "C6.4": {
      prereq: ["conditional-probability", "independent-events"],
      cards: ["hypergeometric", "binomial-probability"],
      body: String.raw`Repeated experiments are the second great source of probability problems: flipping a coin several times, rolling a weighted die, playing a series of games. When the trials do not influence each other, probabilities multiply, and the number of successes follows the binomial distribution. When the trials are draws without replacement, they do influence each other, and the counts follow the hypergeometric distribution instead.

Two events are [[independent-events|independent]] when $P(A \cap B) = P(A)P(B)$, equivalently when knowing one does not change the chance of the other. Separate rolls, flips and spins are independent by assumption; draws without replacement are not. For independent events, the probability that all happen is the product, and the probability that at least one happens is $1$ minus the product of the failures. Independence must come from the setup, not from a feeling: two events defined by the same roll are usually dependent.

The [[binomial-probability|binomial probability]] of exactly $k$ successes in $n$ independent trials, each a success with probability $p$, is $\binom nk p^k(1 - p)^{n - k}$: choose which trials succeed, and multiply. Exactly $3$ heads in $5$ fair flips has probability $\tfrac{10}{32} = \tfrac{5}{16}$, and exactly $2$ successes in $4$ trials with $p = \tfrac13$ has probability $6 \cdot \tfrac19 \cdot \tfrac49 = \tfrac{8}{27}$. Problems often state that two of these probabilities are equal, or in a given ratio, and ask for $p$; the binomial coefficients and common powers cancel, leaving a linear equation in $\tfrac{p}{1 - p}$.

The [[hypergeometric|hypergeometric distribution]] is the version without replacement: from $N$ objects of which $K$ are special, a random draw of $n$ contains exactly $k$ special ones with probability $\tfrac{\binom Kk\binom{N - K}{n - k}}{\binom Nn}$. A lottery ticket of $4$ numbers from $10$, and a draw of $4$ from the same $10$, share exactly $k$ numbers with probability $\tfrac{\binom4k\binom6{4 - k}}{\binom{10}4}$. For large $N$ the two distributions are close, but contest problems use exact counts.

Weighted dice combine the ideas: each face has its own probability, and rolls are independent, so the probability of a sum is a sum of products over the pairs of faces that make it. When a die is altered, write the face probabilities with unknowns and use the conditions to solve for them.

Multiply for independent trials, use the binomial formula for counts of successes, and switch to hypergeometric counts when drawing without replacement. The next lesson brings complements and inclusion-exclusion to probability.`,
      related: [
        { card: "drawing-without-replacement", note: String.raw`the counting setup behind the hypergeometric formula (C6.2).` },
        { card: "binomial-theorem", note: String.raw`the binomial probabilities add to $(p + (1 - p))^n = 1$ (C4.5).` },
        { card: "generating-function-method", note: String.raw`the distribution of a sum of independent counts as a product of polynomials (C9.2).` }
      ],
      exercises: [
        { q: String.raw`A fair coin is flipped $5$ times. What is the probability of exactly $3$ heads?`, answer: "5/16",
          solution: String.raw`Choose which $3$ flips are heads, $\binom53 = 10$ ways, each sequence having probability $\tfrac1{32}$: $\tfrac{10}{32} = \tfrac{5}{16}$.` },
        { q: String.raw`A trial succeeds with probability $\tfrac13$. In $4$ independent trials, what is the probability of exactly $2$ successes?`, answer: "8/27",
          solution: String.raw`$\binom42\left(\tfrac13\right)^2\left(\tfrac23\right)^2 = 6 \cdot \tfrac19 \cdot \tfrac49 = \tfrac{24}{81} = \tfrac{8}{27}$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 12",
        "2006 AMC 12B, Problem 17",
        "2017 AMC 12B, Problem 17",
        "2010 AMC 12A, Problem 15",
        "2015 AMC 12B, Problem 17",
        "2014 AIME I, Problem 2",
        "2016 AIME I, Problem 2",
        "1989 AIME, Problem 5",
        "2009 AIME I, Problem 3",
        "2006 AIME II, Problem 5",
        "2006 AIME II, Problem 10",
        "2010 AIME I, Problem 4"
      ]
    },
    "C6.5": {
      prereq: ["complementary-counting", "pie", "independent-events"],
      cards: [],
      body: String.raw`The counting tools of the third chapter carry over to probability unchanged. The chance of at least one six in four rolls is $1$ minus the chance of none; the chance that some team is undefeated or winless is found by inclusion-exclusion over the teams; the chance that a product of dice is divisible by $4$ is $1$ minus the chances of too few factors of $2$. Because probabilities of independent events multiply, the complement of "at least one" is usually a single product, which makes the complement even more attractive than in counting.

The complement rule $P(\text{not } A) = 1 - P(A)$ turns "at least one" into "none". With independent trials, "none" is a product: at least one six in four rolls has probability $1 - \left(\tfrac56\right)^4 = \tfrac{671}{1296}$. When the event is "at least $k$", the complement is "fewer than $k$", a short sum of binomial probabilities: a product of six dice has at least two factors of $2$ unless all dice are odd or exactly one is $2$ or $6$ and the rest odd.

Inclusion-exclusion handles unions of overlapping events: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$, and so on for more events. It is the tool for "some pair matches", "some team is undefeated", or "some box is uniform", when the intersections have simple probabilities. Often the events are mutually exclusive in part, which shortens the formula: at most one team can be undefeated, so the undefeated events for different teams do not overlap, and only the overlap between "undefeated" and "winless" remains.

Symmetry combines well with complements: if a comparison is symmetric, $P(X \gt Y) = \tfrac12(1 - P(X = Y))$, so only the tie needs to be computed. In a series of games, the chance of more wins than losses equals the chance of more losses than wins, so it is half of $1$ minus the chance of a tie.

Before computing a probability directly, ask whether its complement is a single product, whether it is a union with simple intersections, and whether symmetry reduces it to a tie. The last lesson of the chapter turns to continuous probability.`,
      related: [
        { card: "complementary-counting", note: String.raw`the same idea for counts (C1.3).` },
        { card: "pie", note: String.raw`inclusion-exclusion for counts, with the same alternating signs (C3.2).` },
        { card: "symmetry-probability", note: String.raw`reducing a comparison to the probability of a tie (C4.4).` }
      ],
      exercises: [
        { q: String.raw`A fair die is rolled $4$ times. What is the probability of at least one $6$?`, answer: "671/1296",
          solution: String.raw`The complement, no $6$ in four independent rolls, has probability $\left(\tfrac56\right)^4 = \tfrac{625}{1296}$. So the answer is $1 - \tfrac{625}{1296} = \tfrac{671}{1296}$.` }
      ],
      problems: [
        "2002 AMC 12B, Problem 16",
        "2012 AMC 12B, Problem 13",
        "2022 AMC 12B, Problem 12",
        "2021 Fall AMC 12B, Problem 11",
        "2002 AIME I, Problem 1",
        "2015 AIME I, Problem 5",
        "1991 AIME, Problem 13",
        "2001 AIME II, Problem 11"
      ]
    },
    "C6.6": {
      prereq: ["basic-probability"],
      cards: ["geometric-probability"],
      body: String.raw`When the random quantities are real numbers chosen uniformly from intervals, probability becomes a ratio of lengths, areas or volumes. Two people arrive at random times within an hour and stay a fixed time; a point is chosen in a square and must be closer to the center than to the edges; three numbers are chosen and must form a triangle. Each becomes a picture, and the answer is the area of a region divided by the area of the whole.

In [[geometric-probability|geometric probability]], a pair of independent uniform numbers $(x, y)$ is a uniform point in a rectangle, so the probability of a condition on $x$ and $y$ is the area of the region where it holds over the area of the rectangle. Two numbers uniform on $[0, 1]$ are within $\tfrac13$ of each other on the band $|x - y| \le \tfrac13$, whose complement is two right triangles with legs $\tfrac23$, so the probability is $1 - \left(\tfrac23\right)^2 = \tfrac59$. The meeting problem (two arrivals in an hour, each staying $m$ minutes) is the same band in a $60 \times 60$ square. A point uniform in the square $[0, 2]^2$ lies within $1$ of the origin with probability $\tfrac{\pi/4}{4} = \tfrac{\pi}{16}$, a quarter disk over the square.

The method is always the same: name the random variables, draw the region of all outcomes, draw the region where the event holds, and compute areas. The hard part is the drawing. Conditions such as "closer to $B$ than to $A$" are half-planes bounded by perpendicular bisectors; "the triangle is obtuse" or "the angle is obtuse" are regions inside circles; conditions on floors or on the largest of several variables split the square into cells, each handled separately. Symmetry often reduces the work: for three uniform numbers, by symmetry each is the largest with probability $\tfrac13$, so it is enough to compute with a named maximum.

With three variables the region is in a cube and the probability is a volume. The triangle condition for three uniform numbers removes three corner pyramids, and similar pictures handle random points on a circle (as arcs) or in a disk (as areas in polar coordinates).

Turn uniform random numbers into a point in a region, draw the event, and divide areas. The Summary (C6.7) collects the chapter's strategies, and the problems after it mix counting and geometric probability.`,
      related: [
        { card: "perpendicular-bisector-locus", note: String.raw`the boundary of "closer to one point than another".` },
        { card: "thales-theorem", note: String.raw`a right angle at $P$ means $P$ is on a circle, the boundary for obtuse-angle conditions.` },
        { card: "order-statistics", note: String.raw`the distribution of the largest or smallest of several uniform numbers (C9.4).` }
      ],
      exercises: [
        { q: String.raw`Two numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $|x - y| \le \tfrac13$?`, answer: "5/9",
          solution: String.raw`The pair is a uniform point in the unit square. The event fails in two corner triangles, $y \gt x + \tfrac13$ and $x \gt y + \tfrac13$, each with legs $\tfrac23$ and area $\tfrac29$. So the probability is $1 - \tfrac49 = \tfrac59$.` },
        { q: String.raw`A point is chosen uniformly in the square with vertices $(0, 0)$, $(2, 0)$, $(2, 2)$, $(0, 2)$. What is the probability that it is within distance $1$ of the origin?`, answer: "pi/16",
          solution: String.raw`The points within $1$ of the origin inside the square form a quarter disk of radius $1$, area $\tfrac\pi4$. The square has area $4$, so the probability is $\tfrac{\pi}{16}$.` }
      ],
      problems: [
        "2017 AMC 12A, Problem 10",
        "2007 AMC 12B, Problem 13",
        "2003 AMC 12A, Problem 16",
        "2001 AMC 12, Problem 17",
        "2008 AMC 12B, Problem 21",
        "2004 AMC 12A, Problem 20",
        "1998 AIME, Problem 9",
        "2010 AIME II, Problem 2",
        "2020 AIME II, Problem 2",
        "2017 AIME II, Problem 3",
        "2016 AMC 12A, Problem 23",
        "2025 AMC 12A, Problem 22",
        "2004 AIME I, Problem 10",
        "2023 AIME II, Problem 6"
      ]
    },
    "C6.7": {
      prereq: ["basic-probability", "drawing-without-replacement", "conditional-probability", "bayes-theorem", "independent-events", "hypergeometric", "binomial-probability", "geometric-probability"],
      cards: [],
      body: String.raw`[[basic-probability|With equally likely outcomes]], a probability is a count divided by a count, and both counts must be made the same way, ordered or unordered. [[drawing-without-replacement|Drawing without replacement]] can be counted as a set or step by step, and the step-by-step product is often quicker.

[[conditional-probability|A conditional probability]] restricts the sample space to what is known. [[bayes-theorem|Bayes' theorem]] reverses a condition: the probability of a cause given the result is the part of the result that comes from that cause, divided by the whole result.

[[independent-events|Independent events]] multiply. A fixed number of independent trials with the same chance of success gives the [[binomial-probability|binomial probabilities]], and drawing without replacement from two kinds of object gives the [[hypergeometric|hypergeometric ones]].

"At least once" is $1$ minus "never", and a union of overlapping events is found by inclusion-exclusion, with probabilities in place of counts.

[[geometric-probability|In a continuous setting]], the probability is a ratio of lengths, areas or volumes, and each condition on the random numbers becomes a line or curve that cuts the region.`,
      strategies: [
        String.raw`Write down the sample space and check that its outcomes are equally likely before dividing.`,
        String.raw`Count the event and the total the same way: both ordered or both unordered.`,
        String.raw`For draws without replacement, multiply the chances step by step, or count sets; use whichever has fewer cases.`,
        String.raw`For a conditional probability, shrink the sample space to what is known, then count inside it.`,
        String.raw`To reverse a condition, use Bayes' theorem: split the observed event by its causes and take the share of the cause asked about.`,
        String.raw`For "at least once", compute "never" and subtract from $1$.`,
        String.raw`For $k$ successes in $n$ independent trials, choose which trials succeed and multiply.`,
        String.raw`With two or more continuous random numbers, draw the region of all outcomes and shade the event.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A bag holds $4$ red and $6$ blue marbles. Three are drawn without replacement. What is the probability that exactly two are red?`, answer: "3/10",
        solution: String.raw`Count unordered sets of three marbles: $\binom{10}{3} = 120$ in all. Two red and one blue can be chosen in $\binom42\binom61 = 6 \cdot 6 = 36$ ways. The probability is $\tfrac{36}{120} = \tfrac{3}{10}$.` },
      { q: String.raw`A disease affects $1\%$ of a population. A test is positive for $90\%$ of the people who have the disease and for $9\%$ of the people who do not. A person tests positive. What is the probability that the person has the disease?`, answer: "10/109",
        solution: String.raw`A positive result comes from a sick person with probability $0.01 \cdot 0.9 = 0.009$ and from a healthy person with probability $0.99 \cdot 0.09 = 0.0891$. The share from sick people is $\tfrac{0.009}{0.009 + 0.0891} = \tfrac{90}{981} = \tfrac{10}{109}$, about $9\%$.` },
      { q: String.raw`A fair coin is tossed six times. What is the probability of at least four heads?`, answer: "11/32",
        solution: String.raw`Each of the $2^6 = 64$ sequences is equally likely. Exactly $k$ heads happen in $\binom6k$ of them, so at least four heads happen in $\binom64 + \binom65 + \binom66 = 15 + 6 + 1 = 22$. The probability is $\tfrac{22}{64} = \tfrac{11}{32}$.` },
      { q: String.raw`Five letters are put into their five envelopes at random, one in each. What is the probability that no letter is in its own envelope?`, answer: "11/30",
        solution: String.raw`Let $E_i$ be the event that letter $i$ is in its own envelope. A given set of $k$ letters is in place with probability $\tfrac{(5 - k)!}{5!}$, so by inclusion-exclusion the probability that some letter is in place is $\binom51\tfrac{1}{5} - \binom52\tfrac{1}{20} + \binom53\tfrac{1}{60} - \binom54\tfrac{1}{120} + \binom55\tfrac{1}{120} = 1 - \tfrac12 + \tfrac16 - \tfrac1{24} + \tfrac1{120} = \tfrac{19}{30}$. The answer is $1 - \tfrac{19}{30} = \tfrac{11}{30}$, which is $\tfrac{D_5}{5!} = \tfrac{44}{120}$.` },
      { q: String.raw`Two numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that they differ by less than $\tfrac13$?`, answer: "5/9",
        solution: String.raw`The outcomes fill the unit square. The event $|x - y| \ge \tfrac13$ is two right triangles in opposite corners, each with legs $\tfrac23$, of total area $2 \cdot \tfrac12 \cdot \left(\tfrac23\right)^2 = \tfrac49$. The probability that they differ by less than $\tfrac13$ is $1 - \tfrac49 = \tfrac59$.` }
    ],
    problems: [
      "2005 AIME I, Problem 9",
      "2025 AIME I, Problem 7"
    ]
  },
  challenge: {
    problems: [
      "2011 AIME I, Problem 10",
      "2020 AIME I, Problem 9",
      "2017 AIME I, Problem 6",
      "2001 AIME I, Problem 15"
    ]
  }
};
