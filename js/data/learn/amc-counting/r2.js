// Learn, AMC Counting & Probability, chapter R2: probability from scratch (CONVENTIONS §14). Part: Foundations.
// Content revision: connected explanations, explicit counting/probability models, and checked solutions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R2"] = {
  lessons: {
    "R2.1": {
      prereq: ["constructive-counting", "complementary-counting"],
      cards: [],
      body: String.raw`A probability model describes possible outcomes of an experiment and assigns them probabilities whose total is one. An event is a collection of outcomes, such as rolling a prime number. An impossible event has probability zero, and an event containing every possible outcome has probability one.

In a finite model with equally likely outcomes, each outcome has probability one divided by the total number of outcomes. The probability of an event is then its number of outcomes divided by that total. A fair six-sided die has six equally likely faces, and the prime faces are two, three, and five, so the probability of a prime is $3/6=1/2$.

The choice of outcomes matters. For two independent fair coin tosses, the four ordered results are $HH,HT,TH,TT$, each with probability one quarter. The descriptions two heads, one head, and no heads are not equally likely, because one head occurs in two of the four ordered results. Three results have at least one head, giving probability three quarters.

This can also be found from the complementary event. Either at least one head occurs or no head occurs, with no overlap. Since $TT$ has probability one quarter, the required probability is $1-1/4=3/4$.

Fairness specifies the probabilities for one toss or roll; independence specifies how different trials relate. The coin and die experiments in this chapter use independent trials unless a rule such as drawing without replacement links the stages. Fair individual results alone would not establish that their ordered combinations are equally likely.

A numerical quantity associated with the outcome has an expected value, its probability-weighted mean. For a fair die this is $(1+2+3+4+5+6)/6=7/2$. The mean need not be an outcome that can occur: there is no face labelled three and a half. The chapter develops probability by counting, the treatment of several stages, and the calculation of these weighted means.`,
      exercises: [
        { q: String.raw`A fair die is rolled. What is the probability that it shows a prime number?`, answer: "1/2",
          solution: String.raw`The equally likely faces are one through six. Exactly two, three, and five are prime, so there are three favorable outcomes among six. The probability is $3/6=1/2$. The number one is not prime.` },
        { q: String.raw`Two fair coins are tossed independently. What is the probability of at least one head?`, answer: "3/4",
          solution: String.raw`Independence and fairness give the four ordered outcomes $HH,HT,TH,TT$ probability one quarter each. Three contain a head, so the probability is three quarters. Equivalently, no head means $TT$, with probability one quarter, and its complement has probability $1-1/4=3/4$.` },
        { q: String.raw`What is the expected value of the number shown by a fair die?`, answer: "7/2",
          solution: String.raw`Let $X$ be the face value. Each of its six possible values has probability one sixth, so $E(X)=(1+2+3+4+5+6)/6=21/6=7/2$. Expectation is the weighted mean and need not itself be a possible face value.` }
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
      body: String.raw`A sample space is a collection of elementary outcomes specifying the experiment completely. An event is a subset of that space. [[basic-probability|Probability by counting]] uses a finite sample space in which all elementary outcomes have the same probability. Counting event descriptions without checking their probabilities can give the wrong denominator.

For two independent fair dice, label them first and second. Their sample space consists of thirty-six ordered pairs $(i,j)$ with $1\le i,j\le6$, each with probability $1/36$. The labels record which result came from which die; they do not alter the experiment. A sum of three has two outcomes, $(1,2),(2,1)$, while a sum of two has only $(1,1)$. Thus sums cannot be treated as equally likely elementary outcomes.

The grid gives one cell to each ordered pair. The six highlighted cells have sum seven, so their probability is $6/36=1/6$. Repeated sums in different cells are different elementary outcomes.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 335" role="img" aria-labelledby="r22-dice-title r22-dice-desc" style="width:100%;max-width:520px;height:auto"><title id="r22-dice-title">Six of thirty-six ordered dice outcomes have sum seven</title><desc id="r22-dice-desc">Rows represent the first die and columns the second. Each cell displays the sum. The cells one six, two five, three four, four three, five two, and six one are highlighted.</desc><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="25">Ordered outcomes of two fair independent dice</text><text x="300" y="53">Second die</text><text transform="translate(55 175) rotate(-90)">First die</text><text x="175" y="78">1</text><text x="125" y="111">1</text><text x="225" y="78">2</text><text x="125" y="141">2</text><text x="275" y="78">3</text><text x="125" y="171">3</text><text x="325" y="78">4</text><text x="125" y="201">4</text><text x="375" y="78">5</text><text x="125" y="231">5</text><text x="425" y="78">6</text><text x="125" y="261">6</text></g><rect x="150" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="175" y="111" fill="currentColor" font-size="16" text-anchor="middle">2</text><rect x="200" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="225" y="111" fill="currentColor" font-size="16" text-anchor="middle">3</text><rect x="250" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="275" y="111" fill="currentColor" font-size="16" text-anchor="middle">4</text><rect x="300" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="325" y="111" fill="currentColor" font-size="16" text-anchor="middle">5</text><rect x="350" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="375" y="111" fill="currentColor" font-size="16" text-anchor="middle">6</text><rect x="400" y="90" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="425" y="111" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="150" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="175" y="141" fill="currentColor" font-size="16" text-anchor="middle">3</text><rect x="200" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="225" y="141" fill="currentColor" font-size="16" text-anchor="middle">4</text><rect x="250" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="275" y="141" fill="currentColor" font-size="16" text-anchor="middle">5</text><rect x="300" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="325" y="141" fill="currentColor" font-size="16" text-anchor="middle">6</text><rect x="350" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="375" y="141" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="400" y="120" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="425" y="141" fill="currentColor" font-size="16" text-anchor="middle">8</text><rect x="150" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="175" y="171" fill="currentColor" font-size="16" text-anchor="middle">4</text><rect x="200" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="225" y="171" fill="currentColor" font-size="16" text-anchor="middle">5</text><rect x="250" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="275" y="171" fill="currentColor" font-size="16" text-anchor="middle">6</text><rect x="300" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="325" y="171" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="350" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="375" y="171" fill="currentColor" font-size="16" text-anchor="middle">8</text><rect x="400" y="150" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="425" y="171" fill="currentColor" font-size="16" text-anchor="middle">9</text><rect x="150" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="175" y="201" fill="currentColor" font-size="16" text-anchor="middle">5</text><rect x="200" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="225" y="201" fill="currentColor" font-size="16" text-anchor="middle">6</text><rect x="250" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="275" y="201" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="300" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="325" y="201" fill="currentColor" font-size="16" text-anchor="middle">8</text><rect x="350" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="375" y="201" fill="currentColor" font-size="16" text-anchor="middle">9</text><rect x="400" y="180" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="425" y="201" fill="currentColor" font-size="16" text-anchor="middle">10</text><rect x="150" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="175" y="231" fill="currentColor" font-size="16" text-anchor="middle">6</text><rect x="200" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="225" y="231" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="250" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="275" y="231" fill="currentColor" font-size="16" text-anchor="middle">8</text><rect x="300" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="325" y="231" fill="currentColor" font-size="16" text-anchor="middle">9</text><rect x="350" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="375" y="231" fill="currentColor" font-size="16" text-anchor="middle">10</text><rect x="400" y="210" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="425" y="231" fill="currentColor" font-size="16" text-anchor="middle">11</text><rect x="150" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.23" stroke="currentColor" stroke-width="0.6"/><text x="175" y="261" fill="currentColor" font-size="16" text-anchor="middle">7</text><rect x="200" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="225" y="261" fill="currentColor" font-size="16" text-anchor="middle">8</text><rect x="250" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="275" y="261" fill="currentColor" font-size="16" text-anchor="middle">9</text><rect x="300" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="325" y="261" fill="currentColor" font-size="16" text-anchor="middle">10</text><rect x="350" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="375" y="261" fill="currentColor" font-size="16" text-anchor="middle">11</text><rect x="400" y="240" width="50" height="30" fill="currentColor" fill-opacity="0.035" stroke="currentColor" stroke-width="0.6"/><text x="425" y="261" fill="currentColor" font-size="16" text-anchor="middle">12</text><text x="260" y="310" fill="currentColor" font-size="17" text-anchor="middle">Sum 7: six cells out of thirty-six → 1/6</text></svg>

A complement can simplify the favorable count. A product of die results is odd exactly when both are odd. There are $3\cdot3=9$ such cells, so an even product has probability $1-9/36=3/4$.

For events $A,B$, their intersection $A\cap B$ means both occur, and their union $A\cup B$ means at least one occurs. Adding their probabilities counts the intersection twice, so

$$P(A\cup B)=P(A)+P(B)-P(A\cap B).$$

If the events are disjoint, the intersection is empty and its probability is zero. An inclusive or includes outcomes where both events occur. For example, a heart or a king in a uniformly shuffled standard deck includes the king of hearts, which is counted once rather than twice.

[[symmetry-probability|A probability symmetry]] is a way to match outcomes without changing their probabilities. If four distinct people $A,B,C,D$ stand in a uniformly random line, renaming $A,B,C$ exchanges the events that each is leftmost among those three. These three events are disjoint and cover every line, so each has probability one third. The position of $D$ does not disturb the matching.

For two independent dice with the same distribution, swapping their labels matches the event that the first is larger with the event that the second is larger. For fair dice, ties occupy six of the thirty-six cells, with probability one sixth. The two strict comparisons split the remaining probability equally, giving $(1-1/6)/2=5/12$ each. Ignoring the ties would incorrectly give one half.

Symmetry needs a probability-preserving correspondence, not just similar wording. Labelling objects does not make a biased draw uniform, and giving different names to unequal-probability outcomes does not justify a ratio of counts. With nonuniform elementary probabilities, the probability of an event is the sum of its members' probabilities instead.`,
      related: [
        { card: "geometric-probability", note: String.raw`probability as a ratio of lengths or areas when the outcomes are not countable (R6.4).` },
        { card: "conditional-probability", note: String.raw`probability given that something is already known (R6.2).` }
      ],
      exercises: [
        { q: String.raw`Two fair dice are rolled independently. What is the probability that the sum is $7$?`, answer: "1/6",
          solution: String.raw`The two independent fair dice give thirty-six equally likely ordered pairs. The pairs $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ have sum seven, with no other possibilities. Their total probability is $6/36=1/6$. The two orders of a pair with different entries are separate outcomes.` },
        { q: String.raw`Two fair dice are rolled independently. What is the probability that the product of the numbers is even?`, answer: "3/4",
          solution: String.raw`A product is odd precisely when both factors are odd. Each die has three odd faces, giving nine of the thirty-six equally likely ordered outcomes. The product is even in the complementary twenty-seven outcomes, so its probability is $1-9/36=27/36=3/4$.` },
        { q: String.raw`$A$, $B$, $C$ and $D$ stand in a uniformly random order in a line. What is the probability that $A$ is to the left of both $B$ and $C$?`, answer: "1/3",
          solution: String.raw`In a uniformly random line, renaming $A,B,C$ preserves probabilities and exchanges which one is leftmost among those three. Exactly one of them is leftmost in every line, so the three disjoint events have equal probabilities summing to one. Thus the probability for $A$ is one third. The fourth person's position is unrestricted; eight of the twenty-four full orders satisfy the event.` },
        { q: String.raw`Two fair dice are rolled independently. What is the probability that the first shows a larger number than the second?`, answer: "5/12",
          solution: String.raw`There are six ties among thirty-six equally likely ordered outcomes, giving tie probability one sixth. Swapping the die labels pairs each strict first-larger outcome with a strict second-larger outcome of equal probability. Thus the remaining five sixths split in half, and the required probability is $(5/6)/2=5/12$.` }
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
      body: String.raw`A multistage experiment can be represented by complete histories of its stages. The probability of a history is found by multiplying the chance of each next result given the results already recorded. If the stages are independent, these conditional chances equal the original chances; otherwise they must be updated.

For an event $A$ with positive probability, the notation $P(B\mid A)$ means the probability that $B$ occurs when $A$ is known to have occurred. Within a finite equally likely sample space, it counts outcomes in $A\cap B$ relative to outcomes in $A$. Therefore

$$P(A\cap B)=P(A)P(B\mid A).$$

The factors need not be equal to the separate probabilities of $A$ and $B$. The events are [[independent-events|independent]] exactly when $P(A\cap B)=P(A)P(B)$, or, when $P(A)\gt0$, when learning $A$ leaves the probability of $B$ unchanged. Disjoint positive-probability events are not independent: if one occurs, the other cannot.

For a fair coin tossed independently three times followed by an independent fair die, the history of three heads and then six has probability $(1/2)^3(1/6)=1/48$. With several stages, multiplying the original single-stage probabilities requires independence from the preceding history, not merely fair results at each stage.

For [[drawing-without-replacement|uniform draws without replacement]], the remaining objects determine the next probability. A bag contains three red and two blue balls. If the first is red, two of the four remaining balls are red, so the probability of two reds is $(3/5)(2/4)=3/10$.

The tree shows all four color histories, with updated probabilities along each branch. Leaf probabilities are products along their histories; probabilities of disjoint leaf histories add.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 335" role="img" aria-labelledby="r23-draws-title r23-draws-desc" style="width:100%;max-width:520px;height:auto"><title id="r23-draws-title">Two draws without replacement update the second probability</title><desc id="r23-draws-desc">The first draw is red with probability three fifths and blue with probability two fifths. After red, the next red and blue probabilities are two fourths each. After blue, the next red probability is three fourths and blue one fourth. The leaf probabilities for RR, RB, BR, BB are three tenths, three tenths, three tenths, and one tenth.</desc><g fill="none" stroke="currentColor" stroke-width="1.3"><path d="M90 160L200 85M90 175L200 235M230 80L330 45M230 95L330 125M230 225L330 205M230 240L330 275"/></g><g fill="currentColor" font-size="17"><text x="260" y="24" text-anchor="middle">3 red and 2 blue; no replacement</text><text x="35" y="169">Start</text><text x="140" y="108">3/5</text><text x="140" y="228">2/5</text><text x="215" y="90">R</text><text x="215" y="235">B</text><text x="270" y="47">2/4</text><text x="270" y="131">2/4</text><text x="270" y="196">3/4</text><text x="270" y="280">1/4</text><text x="350" y="52">RR</text><text x="350" y="132">RB</text><text x="350" y="212">BR</text><text x="350" y="282">BB</text><text x="445" y="52">3/10</text><text x="445" y="132">3/10</text><text x="445" y="212">3/10</text><text x="445" y="282">1/10</text><text x="260" y="322" text-anchor="middle">The four leaf probabilities sum to 1.</text></g></svg>

A direct count confirms the red-red branch. Label the five balls individually. There are $5\cdot4=20$ equally likely ordered draws and $3\cdot2=6$ favorable ones, giving $6/20=3/10$. Forgetting draw order also works because every two-ball subset corresponds to exactly two ordered draws, so all ten subsets are equally likely; three are all red.

If the first ball is replaced and the next draw is made uniformly and independently from the restored bag, the chance of red stays three fifths. Two reds then have probability $(3/5)^2=9/25$. Replacement restores the contents; the random drawing mechanism supplies the independence assumption.

For at least one success, the complementary history may be simpler. With four independent fair die rolls, no roll is six with probability $(5/6)^4=625/1296$. Thus at least one six has probability $1-625/1296=671/1296$. Adding four copies of $1/6$ would count histories with several sixes multiple times.

A probability tree uses products along branches and sums across disjoint complete histories. Those two operations have different justifications: conditional probabilities describe how a path continues, while mutually exclusive histories describe alternatives. Keeping those roles separate prevents independence from being confused with disjointness.`,
      related: [
        { card: "binomial-probability", note: String.raw`the probability of exactly $k$ successes in $n$ independent trials (R6.3).` },
        { card: "hypergeometric", note: String.raw`drawing several objects without replacement, counted by combinations (R6.2).` }
      ],
      exercises: [
        { q: String.raw`A bag holds $3$ red and $2$ blue balls. Two are drawn uniformly without replacement. What is the probability that both are red?`, answer: "3/10",
          solution: String.raw`The first draw is red with probability three fifths. Given that result, two of the four remaining balls are red, so the conditional probability for the second red is two fourths. The product is $(3/5)(2/4)=3/10$. A count gives the same result: six favorable ordered red draws out of twenty ordered draws in all.` },
        { q: String.raw`The same bag of $3$ red and $2$ blue balls is used, but the first ball is put back before a second independent uniform draw. What is the probability that both are red?`, answer: "9/25",
          solution: String.raw`Replacement restores the bag to three red and two blue balls. Under the stated independent uniform redraw, each red has probability three fifths regardless of the first result. Therefore the probability of two reds is $(3/5)(3/5)=9/25$. This differs from the no-replacement result because the second draw's distribution is unchanged.` },
        { q: String.raw`A fair coin is tossed independently three times, and an independent fair die is then rolled. What is the probability of three heads followed by a $6$?`, answer: "1/48",
          solution: String.raw`The three independent fair tosses give probability $(1/2)^3=1/8$ for three heads. The independent fair die shows six with probability one sixth. Multiplication along this complete history gives $(1/8)(1/6)=1/48$. Both fairness and independence are used.` },
        { q: String.raw`A fair die is rolled independently four times. What is the probability that at least one roll is a $6$?`, answer: "671/1296",
          solution: String.raw`The complementary event has no six on any roll. Each independent fair roll avoids six with probability five sixths, so four consecutive failures have probability $(5/6)^4=625/1296$. Subtracting from one gives $671/1296$ for at least one six. Histories with several sixes are included exactly once by this complement.` }
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
      body: String.raw`A random variable is a numerical quantity determined by the outcome of an experiment. Its [[expected-value|expected value]] is its probability-weighted mean. If the possible values are $x_1,\ldots,x_r$ with probabilities $p_1,\ldots,p_r$, then

$$E(X)=x_1p_1+\cdots+x_rp_r.$$

The probabilities sum to one. Equal-probability values can be averaged directly, but unequal probabilities require their weights. For a fair die the mean is $E(X)=21/6=7/2$, even though that value is not printed on a face. Expectation describes a weighted balance of outcomes, not a promise about one trial.

If a game pays the square of the die result, the payout variable is $X^2$, with expected value $(1+4+9+16+25+36)/6=91/6$. This is not $E(X)^2=(7/2)^2=49/4$: squaring the mean and averaging the squares are different operations.

If entering the game costs $c$ dollars and $X$ denotes its gross payout, the net gain is $X-c$. A price $c=E(X)$ gives zero expected net gain, which is the mathematical meaning of a fair price in this model. Gross payout and net gain must not be confused, especially when losses or entry fees are involved.

A nonuniform distribution can arise from uniform choices. Choose a two-element subset of $\{1,2,3,4\}$ uniformly and let $M$ be its larger element. The six equally likely subsets give maximum two once, three twice, and four three times. Therefore

$$E(M)=2\cdot\frac16+3\cdot\frac26+4\cdot\frac36=\frac{10}{3}.$$

The bars show these probabilities. Four is the most likely maximum, while the weighted mean lies between three and four. Averaging just the three distinct possible maxima equally would instead give three, which ignores their different frequencies.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 325" role="img" aria-labelledby="r24-mean-title r24-mean-desc" style="width:100%;max-width:520px;height:auto"><title id="r24-mean-title">The maximum of two distinct draws has unequal probabilities</title><desc id="r24-mean-desc">For a uniform pair chosen from one through four, the larger value is two with probability one sixth, three with two sixths, and four with three sixths. A dashed vertical line marks their weighted mean ten thirds, between three and four.</desc><g fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1"><rect x="105" y="180" width="50" height="50"/><rect x="235" y="130" width="50" height="100"/><rect x="365" y="80" width="50" height="150"/></g><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M65 230H455"/><path d="M303.333333 65V240" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="24">Larger of a uniform two-element subset of {1, 2, 3, 4}</text><text x="303.333333" y="53">Mean = 10/3</text><text x="130" y="171">1/6</text><text x="260" y="121">2/6</text><text x="390" y="71">3/6</text><text x="130" y="257">2</text><text x="260" y="257">3</text><text x="390" y="257">4</text><text x="260" y="307">E(M) = (2 + 6 + 12)/6 = 10/3</text></g></svg>

Expected values add even when the random variables are dependent. To prove this in a finite model, assign each elementary outcome $\omega$ probability $p_\omega$. Then

$$E(X+Y)=\sum_\omega p_\omega\bigl(X(\omega)+Y(\omega)\bigr)=E(X)+E(Y).$$

This is linearity of expectation. The calculation uses the actual joint outcomes, so no assumption that $X,Y$ are independent enters. For example, two uniform draws without replacement from $\{1,2,3,4\}$ have dependent results, but each draw has mean $5/2$, so their sum has mean five.

A count can be split into zero-or-one variables. For five independent fair coin tosses, let $I_j$ equal one if toss $j$ is heads and zero otherwise. Each has expectation one half, and the number of heads is $I_1+\cdots+I_5$, with mean $5/2$. Independence explains the toss model, but additivity of the expectations itself does not require it. The same idea applies to counts of dependent events once their individual probabilities are known.`,
      related: [
        { card: "indicator-variables", note: String.raw`writing a count as a sum of $0$-or-$1$ pieces and using linearity (R6.5).` },
        { card: "weighted-average", note: String.raw`expected value is a weighted average with probabilities as weights.` }
      ],
      exercises: [
        { q: String.raw`What is the expected value of the sum of two fair dice?`, answer: "7",
          solution: String.raw`Each fair die has expected value $7/2$. The sum therefore has expectation $7/2+7/2=7$ by linearity. This calculation needs the fair distribution of each die, but independence is not needed for the additivity of their expected values.` },
        { q: String.raw`A game pays you $n^2$ dollars, where $n$ is the result of one roll of a fair die. What is the expected payout, in dollars?`, answer: "91/6",
          solution: String.raw`The six gross payouts are $1,4,9,16,25,36$, each with probability one sixth. Thus the expected payout is $(1+4+9+16+25+36)/6=91/6$ dollars. This averages the squared outcomes; it is not the square of the mean die result.` },
        { q: String.raw`A two-element subset is chosen uniformly at random from $\{1, 2, 3, 4\}$. What is the expected value of the larger one?`, answer: "10/3",
          solution: String.raw`The six two-element subsets are equally likely. Their larger values are two once, three twice, and four three times. Hence the weighted mean is $(2\cdot1+3\cdot2+4\cdot3)/6=20/6=10/3$. Using equal weights for only the three different possible maxima would ignore how many pairs yield each one.` },
        { q: String.raw`A fair coin is tossed $5$ times. What is the expected number of heads?`, answer: "5/2",
          solution: String.raw`For each toss, define $I_j$ to be one for heads and zero for tails. Fairness gives $E(I_j)=1\cdot(1/2)+0\cdot(1/2)=1/2$. The head count is the sum of five such variables, so its expectation is $5/2$ by linearity. The addition of expectations would remain valid even if dependence between tosses were specified.` }
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
      body: String.raw`Probability by counting requires equally likely elementary outcomes. A finer labelled description can make the possible histories explicit, but labels alone do not prove equal likelihood. An event may contain many elementary outcomes, so named summaries such as a die sum or a number of heads need not be uniform.

Complements and disjoint cases organize probabilities as they organize counts. A symmetry can replace a count when a probability-preserving matching exchanges the events being compared. Ties and other excluded outcomes must be removed before the remaining probability is split equally.

For several stages, multiply conditional probabilities along a complete history. Independent stages permit the original probabilities to be reused. Without replacement, update the remaining counts; with replacement, confirm that the restored experiment uses independent draws. Add probabilities only across disjoint histories or account for their overlap.

Expectation is a probability-weighted mean of a specified numerical quantity. Gross payout, net gain, the most likely value, and the mean are different quantities. Linearity makes the expectation of a sum equal to the sum of expectations even when the parts are dependent. A correct model establishes the probabilities first, then uses counting and averaging within that model.`,
      strategies: [
        String.raw`Choose elementary outcomes whose probabilities the experiment justifies; labelling outcomes does not by itself make them equally likely.`,
        String.raw`For "at least one", find the probability of none and subtract from $1$.`,
        String.raw`Use symmetry only when the matching preserves probabilities, and remove ties before splitting the remaining probability.`,
        String.raw`Multiply conditional probabilities along a history; reuse original probabilities only when independence justifies it.`,
        String.raw`Check a stage-by-stage product against a direct count.`,
        String.raw`To average a sum, add the expectations of its parts; independence is not required for this step.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A card is drawn uniformly at random from a standard deck of $52$. What is the probability that it is a heart or a king?`, answer: "4/13",
        solution: String.raw`A standard deck contains thirteen hearts and four kings. Their overlap is the one king of hearts, so the union contains $13+4-1=16$ cards. A uniform draw therefore gives probability $16/52=4/13$. The overlap must be subtracted because that card was counted in both groups.` },
      { q: String.raw`A family has $3$ children, each equally likely to be a boy or a girl, independently. What is the probability of exactly $2$ girls?`, answer: "3/8",
        solution: String.raw`Under the stated independent equal-probability model, the eight ordered boy/girl sequences are equally likely. Exactly three, $GGB,GBG,BGG$, have two girls. Therefore the event has probability $3/8$. Birth order is part of the elementary outcome even though the event specifies only the count.` },
      { q: String.raw`A ticket wins $10$ dollars with probability $\tfrac{1}{20}$ and nothing otherwise. What is its expected value, in dollars?`, answer: "1/2",
        solution: String.raw`Let $X$ be the payout. It equals ten with probability one twentieth and zero with probability nineteen twentieths. Thus $E(X)=10(1/20)+0(19/20)=1/2$ dollar. This is the expected payout before any ticket price, since no entry cost is given.` },
      { q: String.raw`A drawer holds $4$ black and $4$ white socks. Two are drawn at random. What is the probability that they match?`, answer: "3/7",
        solution: String.raw`Whatever color the first sock has, three of the seven remaining socks match it, so the probability of a match is three sevenths. Equivalently, uniform unordered pairs give $\binom82=28$ pairs in all, of which $\binom42+\binom42=12$ match, yielding $12/28=3/7$. The two count descriptions give the same probability.` }
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
