// Learn, AMC Counting & Probability, chapter R6: probability tools (CONVENTIONS §14). Part: Core topics.
// Conditioning models, independent trials, uniform regions and indicator proofs.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R6"] = {
  lessons: {
    "R6.1": {
      prereq: ["basic-probability", "independent-events", "expected-value"],
      cards: [],
      body: String.raw`A probability calculation begins with a model: what is selected, how it is selected, and what information is available. Chapter R2 used equally likely finite outcomes and expected values. Here we extend those ideas to restricted sample spaces, repeated trials, continuous choices and expected counts built from smaller events.

Suppose two independent fair dice are rolled and we are told only that their sum is eight. Of the original thirty-six equally likely ordered outcomes, just five remain:

$$(2,6),\ (3,5),\ (4,4),\ (5,3),\ (6,2).$$

They have the same original probability, so conditioning on membership in this five-element set leaves them equally likely. Two contain a three. The probability of at least one three is therefore $2/5$ under the condition. This is different from counting a three among all thirty-six outcomes: the information changes the denominator.

For three independent tosses of a fair coin, the eight head-tail sequences are equally likely. Exactly two heads occur in $HHT$, $HTH$ and $THH$, giving probability $3/8$. If the coin is biased, those eight sequences need not have equal probabilities. Independence still lets us multiply the probabilities of their individual toss results, and we then add the probabilities of the favorable sequences.

A uniform real number on $[0,2]$ has infinitely many possible values. Counting individual points cannot give a finite denominator, but interval lengths determine probabilities. The interval $(1.5,2]$ has length $0.5$, compared with total length two, so its probability is $1/4$. The word uniform is essential: a different distribution on the same interval can give a different answer.

Finally, an average count can often be found without listing all its possible values. A count of matches, neighboring heads or distinct die faces can be decomposed into indicators, each recording whether one specified event occurs. Linearity of expectation adds their individual probabilities, even when those events overlap or depend on one another. The chapter develops each model and the conditions under which it applies.`,
      exercises: [
        { q: String.raw`Two fair dice are rolled independently, and their sum is $8$. What is the probability that one of them shows a $3$?`, answer: "2/5",
          solution: String.raw`The independent fair dice give thirty-six equally likely ordered outcomes before the information is supplied. The sum condition leaves $(2,6),(3,5),(4,4),(5,3),(6,2)$, still equally likely after renormalization. Exactly two, $(3,5)$ and $(5,3)$, contain a three. Thus the conditional probability is $2/5$.` },
        { q: String.raw`A fair coin is tossed independently $3$ times. What is the probability of exactly $2$ heads?`, answer: "3/8",
          solution: String.raw`Independence and fairness make each of the eight head-tail sequences have probability $(1/2)^3=1/8$. Exactly two heads occurs in the three disjoint sequences $HHT$, $HTH$ and $THH$. Their probabilities add to $3/8$.` },
        { q: String.raw`A real number is chosen uniformly at random from the interval $[0, 2]$. What is the probability that it is greater than $1.5$?`, answer: "1/4",
          solution: String.raw`Uniformity means probabilities are proportional to lengths. The favorable set $(1.5,2]$ has length $0.5$, while the sampling interval has length two. The ratio is $0.5/2=1/4$. Including the endpoint $1.5$ would not change this probability because a single point has zero length.` }
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
      body: String.raw`Conditioning restricts attention to outcomes consistent with information. Let $A$ be the event of interest and let $B$ be the event known to occur, with $P(B)\gt0$. The probability mass remaining is $P(B)$; the part also belonging to $A$ is $P(A\cap B)$. Renormalizing gives [[conditional-probability|conditional probability]]:

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}.$$

The condition $P(B)\gt0$ matters: this ratio does not define conditioning on an event of probability zero. In a finite equally likely sample space, it becomes a ratio of counts within $B$. If the original outcomes have unequal weights, restricting to $B$ preserves their relative weights rather than making them uniform.

For a two-child model, assume each child independently has probability one half of being a boy and one half of being a girl, and distinguish older from younger. The four outcomes $BB,BG,GB,GG$ then have equal probabilities. Knowing only that at least one child is a boy leaves three, of which one is $BB$. Thus the conditional probability of two boys is $1/3$. Knowing that the older child is a boy instead leaves $BB,BG$, giving $1/2$.

These are different conditioning events. A report obtained by choosing a child at random and announcing that child's sex is also a different experiment: a $BB$ family has two ways to produce a boy report, while a $BG$ family has only one. The information-gathering rule must therefore be specified; the conclusion $1/3$ above uses the event “at least one boy,” not a randomly sampled report.

Rearranging the definition gives $P(A\cap B)=P(B)P(A\mid B)$. This multiplication rule does not assume independence. When two cards are drawn uniformly without replacement, the first is an ace with probability $4/52$. Given that success, three aces remain among fifty-one cards. Hence

$$P(\text{two aces})=\frac4{52}\cdot\frac3{51}=\frac1{221}.$$

For several stages, multiply along a specified history, using probabilities conditional on that history. Add across histories only when they are disjoint. Suppose $70\%$ of students ride the bus; $20\%$ of riders and $5\%$ of nonriders are late. Rider and nonrider form a disjoint, exhaustive split. The tree shows the probabilities of the four resulting events.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 305" role="img" aria-labelledby="r62-title r62-desc" style="width:100%;max-width:520px;height:auto"><title id="r62-title">Conditional probability tree</title><desc id="r62-desc">Bus and nonbus probabilities lead to conditional late and on-time branches. Late leaf probabilities are 0.14 and 0.015.</desc><g stroke="currentColor" fill="none" opacity=".6"><path d="M60 130L205 75M60 130L205 205M220 75L345 45M220 75L345 105M220 205L345 175M220 205L345 235"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="23">Multiply along a branch; add the late leaves.</text><text x="52" y="157">Student</text><text x="190" y="60">Bus: 0.7</text><text x="190" y="230">No bus: 0.3</text><text x="418" y="49">Late: 0.2 → 0.14</text><text x="418" y="109">On time: 0.8 → 0.56</text><text x="418" y="179">Late: 0.05 → 0.015</text><text x="418" y="239">On time: 0.95 → 0.285</text><text x="260" y="283">P(late) = 0.14 + 0.015 = 0.155</text></g></svg>

The late events have total probability $0.7\cdot0.2+0.3\cdot0.05=0.155=31/200$. The other two leaves are on time, and all four leaf probabilities sum to one. More generally, for a partition into events $B_i$ of positive probability,

$$P(A)=\sum_i P(B_i)P(A\mid B_i).$$

Sampling without replacement can also be counted without recording draw order. Suppose $N$ distinct objects include $K$ designated special objects, and an $n$-element subset is chosen uniformly, with $0\le n\le N$ and $0\le K\le N$. Exactly $k$ special objects requires choosing $k$ from the special group and $n-k$ from the others. The [[hypergeometric|hypergeometric probability]] is

$$\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.$$

A feasible integer $k$ satisfies $\max(0,n-(N-K))\le k\le\min(n,K)$; outside that range the probability is zero. Uniform sequential draws without replacement give this same model because every subset has exactly $n!$ orders, each with the same probability.

For five red and seven blue balls, four draws contain exactly two red in $\binom52\binom72=210$ of the $\binom{12}{4}=495$ subsets, giving $14/33$. Sequentially, one specified color pattern with two red and two blue has probability $(5\cdot4\cdot7\cdot6)/(12\cdot11\cdot10\cdot9)=7/99$. There are $\binom42=6$ such patterns, whose disjoint probabilities sum to $14/33$. The fixed color counts give equal pattern probabilities here even though the individual draws are dependent.`,
      related: [
        { card: "bayes-theorem", note: String.raw`turning the condition around, from the effect back to the cause (R9.2).` },
        { card: "drawing-without-replacement", note: String.raw`draws in which each one changes the next (R2.3).` },
        { card: "complementary-counting", note: String.raw`the chance of "at least one" by the chance of none.` }
      ],
      exercises: [
        { q: String.raw`In a model where a family has two children whose sexes are independent, each equally likely to be a boy or a girl, and at least one of them is a boy. What is the probability that both are boys?`, answer: "1/3",
          solution: String.raw`Distinguish the children by age. Independence and equal boy/girl probabilities give four equally likely outcomes $BB,BG,GB,GG$. The specified condition is the event that at least one is a boy, so remove $GG$. The remaining three outcomes retain equal weights, and only $BB$ has two boys. Thus the answer is $1/3$. This uses the stated conditioning event, rather than a rule that samples a child to produce a report.` },
        { q: String.raw`Two cards are drawn uniformly at random from a standard deck of $52$ without replacement. What is the probability that both are aces?`, answer: "1/221",
          solution: String.raw`With uniform draws without replacement, the first card is an ace with probability $4/52$. Conditional on that event, three aces remain among fifty-one cards, so the second is an ace with probability $3/51$. Multiplying the conditional chain gives $(4/52)(3/51)=12/2652=1/221$. As a check, counting unordered pairs gives $\binom42/\binom{52}{2}=6/1326=1/221$.` },
        { q: String.raw`A box holds $5$ red and $7$ blue balls, and $4$ balls are drawn at random without replacement. What is the probability that exactly $2$ of them are red?`, answer: "14/33",
          solution: String.raw`A uniform four-ball sample is one of $\binom{12}{4}=495$ equally likely subsets. To have exactly two red balls, choose two of the five red and two of the seven blue, giving $\binom52\binom72=10\cdot21=210$ favorable subsets. Each subset is counted once by its two color groups. The probability is $210/495=14/33$.` },
        { q: String.raw`Of the students at a school, $70\%$ ride the bus. Of those who ride, $20\%$ are late; of those who do not, $5\%$ are late. What fraction of all students are late?`, answer: "31/200",
          solution: String.raw`Riders and nonriders partition the student body. Late riders make up $(7/10)(1/5)=7/50$ of all students. Late nonriders make up $(3/10)(1/20)=3/200$. These events are disjoint, so their proportions add: $7/50+3/200=31/200$. No independence between lateness and riding the bus is assumed.` }
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
      body: String.raw`A binomial model counts successes in a fixed number of trials. Each trial has two designated outcomes, success or failure. The trials must be mutually independent, and each must have the same success probability $p$. The physical experiment can have more than two results: a die roll is a success when it is six and a failure otherwise.

Let $X$ be the number of successes in $n$ trials, where $n$ is a nonnegative integer. For $0\le k\le n$, choose the $k$ success positions. There are $\binom nk$ choices. For $0\lt p\lt1$, each particular sequence has probability $p^k(1-p)^{n-k}$ by independence. Distinct sequences are disjoint events, giving [[binomial-probability|the binomial probability]]

$$P(X=k)=\binom nk p^k(1-p)^{n-k}.$$

At $p=0$ there are always zero successes; at $p=1$ there are always $n$. With zero trials the count is zero with probability one. These boundary cases can be handled directly. Summing the displayed probabilities over $k$ gives $(p+(1-p))^n=1$, so they account for every possible count.

For five independent fair die rolls, a specified pattern with two sixes and three nonsixes has probability $(1/6)^2(5/6)^3=125/7776$. There are $\binom52=10$ patterns, so exactly two sixes has probability $1250/7776=625/3888$. The nonsix factors account for all five possible nonsix faces; they must not be treated as just one equally likely die result.

“At least” and “at most” refer to unions of disjoint count events. With head probability $2/3$ in four independent tosses, at least three heads means three or four. The two probabilities are

$$\binom43\left(\frac23\right)^3\frac13=\frac{32}{81},\qquad \left(\frac23\right)^4=\frac{16}{81}.$$

Their sum is $16/27$. If many success counts are allowed, the complement can be shorter: at least one six in four independent rolls has probability $1-(5/6)^4=671/1296$. Exactly five heads in ten independent fair tosses has probability $\binom{10}{5}/2^{10}=252/1024=63/256$.

The assumptions distinguish this model from nearby ones. Draws without replacement generally change the success probability and are not independent, so a fixed-sample count uses the hypergeometric model. Independent trials with different success probabilities do not give the displayed binomial formula either: sequences with the same number of successes may have different weights. Fairness of individual tosses alone also does not establish independence. The full experiment, not just one trial's marginal probability, determines the model.`,
      related: [
        { card: "expected-value", note: String.raw`the expected number of successes, $np$ (R2.4).` },
        { card: "symmetry-probability", note: String.raw`a fair coin's symmetry, which pairs $k$ heads with $k$ tails (R2.2).` },
        { card: "complementary-counting", note: String.raw`"at least one" as one minus "none".` }
      ],
      exercises: [
        { q: String.raw`A fair die is rolled independently $5$ times. What is the probability of exactly two sixes?`, answer: "625/3888",
          solution: String.raw`Choose the two success positions among five rolls in $\binom52=10$ ways. For each pattern, independence gives probability $(1/6)^2(5/6)^3=125/7776$, since each of the other three rolls may be any nonsix. The ten pattern events are disjoint. Their total probability is $1250/7776=625/3888$.` },
        { q: String.raw`A coin lands heads with probability $\tfrac23$. It is tossed independently $4$ times. What is the probability of at least $3$ heads?`, answer: "16/27",
          solution: String.raw`Independence and a common head probability $2/3$ permit the binomial model. Exactly three heads has probability $\binom43(2/3)^3(1/3)=32/81$, while all four heads has probability $(2/3)^4=16/81$. These are disjoint and exhaust the event of at least three heads. Adding gives $48/81=16/27$.` },
        { q: String.raw`A fair coin is tossed independently $10$ times. What is the probability of exactly $5$ heads?`, answer: "63/256",
          solution: String.raw`The ten independent fair tosses give $2^{10}=1024$ equally likely sequences. A sequence with five heads is fixed by its five head positions, so there are $\binom{10}{5}=252$ favorable sequences. The probability is $252/1024=63/256$.` }
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
      body: String.raw`A continuous probability problem specifies a distribution over real-valued outcomes. For a uniform point in a region of positive finite area, a subregion has probability equal to its area divided by the total area. For a uniform number on an interval, use lengths instead. These are the assumptions behind [[geometric-probability|geometric probability]]; merely saying that an outcome is real-valued does not make an area ratio valid.

If $x$ and $y$ are independent and each uniform on $[0,1]$, then $(x,y)$ is uniform in the unit square. Independence and the two uniform marginal distributions make a small rectangle's probability the product of its side lengths. The event $x+y\lt1/2$ is a corner triangle with legs $1/2$, so its area and probability are $(1/2)(1/2)(1/2)=1/8$.

The variables must describe the actual experiment. Two independent arrival times, each uniform over a sixty-minute interval, give a uniform point in a $60\times60$ square. If each friend waits fifteen minutes after arriving, they meet exactly when $|x-y|\le15$. The favorable band is the square minus two corner triangles, each of leg length forty-five.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-labelledby="r64-meeting-title r64-meeting-desc" style="width:100%;max-width:520px;height:auto"><title id="r64-meeting-title">Meeting band in the arrival-time square</title><desc id="r64-meeting-desc">Independent uniform arrival minutes fill the square. A diagonal band has absolute time difference at most fifteen minutes.</desc><g stroke="currentColor" stroke-width="1.2"><rect x="140" y="48" width="240" height="240" fill="none"/><path d="M140 228L320 48H380V108L200 288H140Z" fill="currentColor" fill-opacity=".13"/><path d="M140 228L320 48M200 288L380 108" fill="none" stroke-dasharray="4 4"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="25">Meet when arrival times differ by at most 15 minutes</text><text x="260" y="321">Arrival x: 0 to 60 minutes</text><text x="260" y="348">Two excluded triangles have legs of 45 minutes.</text><text x="260" y="181">Meet</text><text x="180" y="86">Miss</text><text x="340" y="260">Miss</text></g><text x="105" y="168" fill="currentColor" font-size="16" text-anchor="middle" transform="rotate(-90 105 168)">Arrival y: 0 to 60 minutes</text></svg>

The excluded area is $2(45^2/2)=2025$, leaving $3600-2025=1575$. Thus the meeting probability is $1575/3600=7/16$. In general, with a common interval of length $T\gt0$ and wait $0\le w\le T$, the same reasoning gives $1-(T-w)^2/T^2$. A wait at least $T$ guarantees a meeting.

For a unit stick, specify two independent uniform break points $U,V$. Except on the zero-probability diagonal $U=V$, sorting them gives $x=\min(U,V)$ and $y=\max(U,V)$. The two halves of the unit square fold onto $0\lt x\lt y\lt1$: every ordered pair has two equally weighted preimages. The sorted pair is therefore uniform on this triangle, whose area is $1/2$; its coordinates are no longer independent.

The pieces are $x$, $y-x$ and $1-y$. Three positive lengths summing to one form a nondegenerate triangle exactly when each is less than half: the longest must be less than the sum of the others. Here the three inequalities become

$$x\lt\frac12,\qquad y\gt\frac12,\qquad y-x\lt\frac12.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 370" role="img" aria-labelledby="r64-stick-title r64-stick-desc" style="width:100%;max-width:520px;height:auto"><title id="r64-stick-title">Triangle-forming broken-stick outcomes</title><desc id="r64-stick-desc">The sorted sampling triangle has vertices zero zero, zero one and one one. Its favorable triangle has vertices zero one half, one half one half and one half one.</desc><g stroke="currentColor" stroke-width="1.2"><path d="M140 288V48H380Z" fill="none"/><path d="M140 168H260V48Z" fill="currentColor" fill-opacity=".15"/><path d="M140 168H380M260 288V48" fill="none" opacity=".35" stroke-dasharray="4 4"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="260" y="25">Sorted break points: 0 &lt; x &lt; y &lt; 1</text><text x="260" y="321">First break x: 0 to 1</text><text x="260" y="348">Shaded area 1/8; sampling triangle area 1/2.</text><text x="220" y="139">Valid</text></g><text x="105" y="168" fill="currentColor" font-size="16" text-anchor="middle" transform="rotate(-90 105 168)">Second break y: 0 to 1</text></svg>

They cut out the triangle with vertices $(0,1/2)$, $(1/2,1/2)$ and $(1/2,1)$, of area $1/8$. The probability is $(1/8)/(1/2)=1/4$. Sorting the break points does not make the three piece lengths independent or uniformly distributed on a cube. Choosing one break and then breaking a selected remaining piece would define another sampling procedure and would need its own distribution.

Curved boundaries are handled in the same way when their areas are known. A point uniform in a square of side two lies within distance one of its center exactly when it lies in the inscribed unit disk. The disk area is $\pi$ and the square area is four, giving probability $\pi/4$.

Under these uniform area models, a line or circle boundary has area zero. Including or excluding it therefore does not change the probability, although it still matters when translating the event precisely. For a nonuniform distribution one must use the probability weights assigned by that distribution; equal geometric areas need not have equal probabilities.`,
      related: [
        { card: "product-of-uniforms", note: String.raw`the product of two random numbers, where the boundary is a curve (R9.4).` },
        { card: "symmetry-probability", note: String.raw`regions that are equal by symmetry, such as $x \lt y$ and $y \lt x$ (R2.2).` },
        { card: "triangle-inequality", note: String.raw`the condition on three lengths in the broken stick.` }
      ],
      exercises: [
        { q: String.raw`Two numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $x + y \lt \tfrac12$?`, answer: "1/8",
          solution: String.raw`Independence and uniformity make $(x,y)$ uniform in the unit square of area one. Within it, $x+y\lt1/2$ is the corner triangle below the line joining $(1/2,0)$ and $(0,1/2)$. Its legs both have length $1/2$, so its area is $(1/2)(1/2)(1/2)=1/8$. Dividing by the sampling area leaves probability $1/8$.` },
        { q: String.raw`Two friends each arrive at a uniformly random time between $1{:}00$ and $2{:}00$, independently, and each waits $15$ minutes for the other before leaving. What is the probability that they meet?`, answer: "7/16",
          solution: String.raw`Measure both arrival times in minutes after one o'clock. Their independent uniform distributions give a uniform point in a square of area $60^2=3600$. A meeting occurs when $|x-y|\le15$. Outside this band lie two triangles, each with legs $60-15=45$, of combined area $45^2=2025$. Thus the meeting probability is $(3600-2025)/3600=1575/3600=7/16$. Boundary equality has area zero.` },
        { q: String.raw`A stick of length $1$ is broken at two points chosen independently and uniformly along it. What is the probability that the three pieces form a triangle?`, answer: "1/4",
          solution: String.raw`Sort the two independent uniform break points as $x\lt y$. Each sorted pair has two equally weighted preimages in the unit square, so the sorted pair is uniform on the triangle $0\lt x\lt y\lt1$ of area $1/2$. The three pieces are $x$, $y-x$ and $1-y$. They form a triangle exactly when each is less than $1/2$, giving $x\lt1/2$, $y\gt1/2$ and $y-x\lt1/2$. The favorable triangle has vertices $(0,1/2),(1/2,1/2),(1/2,1)$ and area $1/8$. Hence the probability is $(1/8)/(1/2)=1/4$. The boundaries, which include degenerate pieces or triangles, have area zero.` },
        { q: String.raw`A point is chosen uniformly at random inside a square of side $2$. What is the probability that it lies within distance $1$ of the center?`, answer: "pi/4",
          solution: String.raw`Center the square at the origin. It extends one unit in each coordinate direction from the center, so the entire disk of radius one fits inside it. Points at distance at most one form that disk, of area $\pi$. The sampling square has area four, and its distribution is uniform, so the probability is $\pi/4$. The circle boundary has zero area.` }
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
      body: String.raw`An indicator records whether one event happens. For an event $A_i$, define $I_i$ to equal one on $A_i$ and zero otherwise. Its expected value is

$$E[I_i]=1\cdot P(A_i)+0\cdot P(A_i^c)=P(A_i).$$

If a count $X$ is the sum of finitely many such indicators, then [[indicator-variables|the indicator method]] gives $E[X]=\sum_i P(A_i)$. To see why independence is unnecessary, write the expectation as a finite sum over outcomes $\omega$. Interchanging the order of these finite sums gives

$$E[X]=\sum_\omega\left(\sum_i I_i(\omega)\right)P(\omega)=\sum_i\sum_\omega I_i(\omega)P(\omega)=\sum_i P(A_i).$$

The events may overlap, and no factorization of their joint probabilities is used. Independence can still be needed to calculate a particular $P(A_i)$; it is not needed to add the expectations.

For a uniformly random assignment of ten letters to ten addressed envelopes, let $I_i$ record that letter $i$ reaches its own envelope. Each of the ten envelopes is equally likely for that letter, so $P(A_i)=1/10$. The expected number of correct letters is $10(1/10)=1$. The indicators are dependent: knowing nine matches forces the tenth. Yet each assignment's number of matches is exactly the sum of these ten zero-or-one records, which is all linearity requires.

For ten independent fair coin tosses, let $I_i$ record that tosses $i$ and $i+1$ are both heads, for $i=1,\ldots,9$. There are nine possible starting positions, each with probability $1/4$. Thus the expected number of adjacent $HH$ pairs is $9/4$. Overlaps are counted separately: $HHH$ contributes two pairs. For neighboring indicators, the joint probability is $P(HHH)=1/8$, whereas $(1/4)(1/4)=1/16$, so the indicators themselves are not independent.

For three independent fair dice, choose one indicator for each face value $v\in\{1,\ldots,6\}$, rather than one for each die. The value $v$ appears if it is not missing from all three rolls. Therefore

$$P(A_v)=1-\left(\frac56\right)^3=\frac{91}{216},\qquad E[X]=6\cdot\frac{91}{216}=\frac{91}{36}.$$

Every distinct value contributes one regardless of how many dice show it, so the indicator sum equals the desired count exactly. An expected value need not be a possible observed count: $91/36$ is an average, while an actual roll has one, two or three distinct values. The choice of events should be justified by this equality of counts before their probabilities are added.`,
      related: [
        { card: "expected-value", note: String.raw`the average as a sum of values times probabilities (R2.4).` },
        { card: "derangements", note: String.raw`the full distribution of matches, of which the average is one number (R3.4).` },
        { card: "double-counting", note: String.raw`the same sum read two ways, by events or by outcomes (R3.5).` }
      ],
      exercises: [
        { q: String.raw`Ten letters are put into ten addressed envelopes in a uniformly random assignment, one letter in each. What is the expected number of letters in the right envelope?`, answer: "1",
          solution: String.raw`For each letter $i$, let $I_i$ be one if it is correctly addressed and zero otherwise. A uniformly random assignment makes each envelope equally likely for that letter, so $E[I_i]=1/10$. The number of correct letters is exactly $I_1+\cdots+I_{10}$. By linearity, its expected value is $10(1/10)=1$, without assuming independence of the matching events.` },
        { q: String.raw`A fair coin is tossed independently $10$ times. What is the expected number of places where two heads appear in consecutive tosses?`, answer: "9/4",
          solution: String.raw`For each starting position $i=1,\ldots,9$, record an indicator for tosses $i$ and $i+1$ both being heads. Independence of those two tosses gives probability $1/4$. Summing the nine indicators counts every adjacent $HH$ pair, including overlapping pairs in a longer run. Linearity therefore gives expectation $9/4$. The indicators need not be independent of one another.` },
        { q: String.raw`Three fair dice are rolled independently. What is the expected number of different values that appear?`, answer: "91/36",
          solution: String.raw`For each value $v=1,\ldots,6$, record whether at least one die shows $v$. Independence of the three rolls makes the probability of missing that value $(5/6)^3=125/216$, so its appearance probability is $91/216$. The sum of these six indicators counts distinct values exactly once each. Its expectation is $6(91/216)=91/36$.` }
      ],
      problems: [
        "2021 Fall AMC 12B, Problem 23"
      ]
    },
    "R6.6": {
      prereq: ["conditional-probability", "hypergeometric", "binomial-probability", "geometric-probability", "indicator-variables"],
      cards: [],
      body: String.raw`[[conditional-probability|Conditioning]] restricts to a specified positive-probability event and renormalizes its probability mass. Equal original weights remain equal after restriction, but unequal weights do not become uniform. The information rule matters: “at least one child is a boy” and a randomly selected child's report are different experiments. Multiply conditional probabilities along a history and add disjoint histories from an exhaustive partition.

[[hypergeometric|Sampling uniformly without replacement]] gives $\binom Kk\binom{N-K}{n-k}/\binom Nn$ for $k$ special objects in an $n$-element sample from $N$, of which $K$ are special. Check that the requested counts are feasible. [[binomial-probability|A binomial model]] instead uses a fixed number of independent trials with the same success probability. Its factor $\binom nk$ counts success positions; the probability of a specified pattern supplies the remaining factors.

[[geometric-probability|Length and area ratios]] require uniform sampling in the stated variables. Translate the event into inequalities, identify the favorable region, and compare measures. Sorting two break points changes their domain from a square to a triangle and creates dependence, even though the joint distribution on the triangle is uniform. A zero-area boundary does not affect these uniform area probabilities.

[[indicator-variables|Indicators]] express a count as a finite sum of event records. Their expected values add without independence, provided that their sum is exactly the count requested. Independence may be needed inside the probability of a single event, such as a particular pair of coin tosses both being heads. Overlapping events are allowed when each is meant to contribute separately.`,
      strategies: [
        String.raw`Read the condition exactly as stated, and list the outcomes it leaves.`,
        String.raw`Multiply along each branch of a tree of draws, then add the branches.`,
        String.raw`For "at least one", subtract the chance of none.`,
        String.raw`For independent trials with a common success probability, count the orders with $\binom nk$.`,
        String.raw`For uniform real-valued choices, draw the sampling region and measure the favorable part; justify any change of variables.`,
        String.raw`For an expected count, split it into events and add their probabilities.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A fair die is rolled independently $4$ times. What is the probability that at least one roll is a six?`, answer: "671/1296",
        solution: String.raw`The complement is that all four rolls are nonsixes. Each has nonsix probability $5/6$, and independence gives complement probability $(5/6)^4=625/1296$. Subtracting from one yields $671/1296$. This avoids adding the four separate binomial cases for one through four sixes.` },
      { q: String.raw`Two fair dice are rolled independently, and at least one shows a six. What is the probability that both do?`, answer: "1/11",
        solution: String.raw`The independent fair dice give thirty-six equally likely ordered outcomes. The condition excludes the twenty-five outcomes with both faces in $\{1,\ldots,5\}$, leaving eleven equally likely outcomes containing at least one six. Only $(6,6)$ contains two sixes. Thus the conditional probability is $1/11$.` },
      { q: String.raw`Four couples sit in a row of $8$ chairs in uniformly random order. What is the expected number of couples sitting next to each other?`, answer: "1",
        solution: String.raw`For each of the four couples, use an indicator for its two members occupying adjacent chairs. For a fixed couple there are seven possible adjacent chair pairs, two orders for the couple and $6!$ orders of the other people. Its probability is $7\cdot2\cdot6!/8!=1/4$. Each couple contributes exactly one indicator, so linearity gives $4(1/4)=1$. Dependence between different couples' seating events does not affect this sum.` },
      { q: String.raw`A number $x$ is chosen uniformly from $[0, 3]$ and, independently, $y$ from $[0, 2]$. What is the probability that $x \lt y$?`, answer: "1/3",
        solution: String.raw`Independence and the uniform interval distributions make $(x,y)$ uniform in the rectangle $0\le x\le3$, $0\le y\le2$, of area six. The favorable set $x\lt y$ is the triangle bounded by $x=0$, $y=2$ and $y=x$, with vertices $(0,0),(0,2),(2,2)$. Its area is $(1/2)(2)(2)=2$, so the probability is $2/6=1/3$.` }
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
