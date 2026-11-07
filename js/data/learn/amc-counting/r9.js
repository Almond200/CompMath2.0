// Learn, AMC Counting & Probability, chapter R9: advanced probability (CONVENTIONS §14). Part: Advanced topics.
// Bayesian evidence, complete states, finite waits and uniform product distributions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R9"] = {
  lessons: {
    "R9.1": {
      prereq: ["conditional-probability", "expected-value", "geometric-probability"],
      cards: [],
      body: String.raw`Information and time change probability models in different ways. Observing evidence changes the relative weights of possible causes. Following a process through time changes its state. A successful calculation must say what was observed, what state is recorded, and whether the question concerns a fixed time, an eventual outcome or an expected wait.

Suppose a coin is chosen uniformly from a fair coin and a two-headed coin, and the chosen coin shows heads. The joint probabilities of “two-headed and heads” and “fair and heads” are $1/2$ and $1/4$. The evidence has total probability $3/4$, so the two-headed coin's share of that evidence is $(1/2)/(3/4)=2/3$. The selection rule and the information are both part of the experiment.

For independent rolls of a fair die until the first six, each failure returns to the same probabilistic situation. The number of rolls has a geometric waiting-time distribution and mean six, including the successful roll. Waiting for two consecutive heads is different: a head changes how close the process is to its target. Recording only “not finished” would erase information relevant to the next step.

A fair nearest-neighbor walk on $0,1,2,3$, stopped at either endpoint, gives another state system. Let $p_i$ be the chance of reaching three first from $i$. The endpoints have values $p_0=0,p_3=1$, while $p_1=p_2/2$ and $p_2=(p_1+1)/2$. Solving gives $p_1=1/3$. A probability equation averages next-state probabilities; an expected-time equation also charges for the step taken.

Finally, real-valued experiments may require measuring a curved region rather than solving a finite state system. Independent uniform factors give a uniform point in a square, and their product is bounded by a hyperbola. The chapter develops these models, their proofs and their limits, keeping the required assumptions visible.`,
      exercises: [
        { q: String.raw`One of two coins is fair and the other has heads on both sides. A coin is chosen uniformly at random and tossed, and it lands heads. What is the probability that it is the two-headed coin?`, answer: "2/3",
          solution: String.raw`The selected coin is fixed for this toss, and each coin has prior probability $1/2$. The joint event of the two-headed coin and a head has probability $(1/2)\cdot1=1/2$. The joint event of the fair coin and a head has probability $(1/2)(1/2)=1/4$. These disjoint events exhaust the observed head, so Bayes' theorem gives $(1/2)/(1/2+1/4)=2/3$.` },
        { q: String.raw`A fair die is rolled independently until a six appears. What is the expected number of rolls?`, answer: "6",
          solution: String.raw`Let $T$ count rolls including the first six. Independence gives $P(T>j)=(5/6)^j$ for $j\ge0$. The tail sum is a convergent geometric series, so $E[T]=\sum_{j\ge0}(5/6)^j=6$. This also justifies solving the finite first-step equation $E=1+(5/6)E$.` },
        { q: String.raw`A token starts at $1$ on the points $0, 1, 2, 3$ of a line and at each step moves left or right with equal probability conditional on its current position, stopping when it reaches $0$ or $3$. What is the probability that it reaches $3$?`, answer: "1/3",
          solution: String.raw`Use $p_0=0,p_3=1$ for the absorbing outcomes. At the two interior points, $p_1=p_2/2$ and $p_2=(p_1+1)/2$. Substituting the first into the second gives $p_2=p_2/4+1/2$, hence $p_2=2/3,p_1=1/3$. Absorption occurs with probability one: from either interior point a suitable sequence of at most two steps reaches an endpoint with a positive probability uniformly bounded away from zero. Thus these equations determine the desired eventual probability.` }
      ],
      problems: [
        "2022 AMC 8, Problem 25",
        "2017 AMC 10A, Problem 18"
      ]
    },
    "R9.2": {
      prereq: ["conditional-probability"],
      cards: ["bayes-theorem"],
      body: String.raw`Suppose $A_1,\ldots,A_m$ are mutually exclusive and exhaustive hypotheses with positive prior probabilities. An observed event $B$ has positive total probability. The intersection $A_i\cap B$ can be written in either conditional direction, so $P(A_i)P(B\mid A_i)=P(B)P(A_i\mid B)$. Substituting the total probability of $B$ proves [[bayes-theorem|Bayes' theorem]]:

$$P(A_i\mid B)=\frac{P(A_i)P(B\mid A_i)}{\sum_j P(A_j)P(B\mid A_j)}.$$

The prior is the probability of a hypothesis before this observation; the likelihood is the probability of the observation under that hypothesis; the posterior is the updated probability. The denominator is common to every hypothesis. Zero-prior hypotheses can simply be omitted from this partition calculation, and zero-probability evidence does not permit the displayed conditioning ratio.

If a disease affects one percent of the sampled population, a test positive in ninety percent of diseased people and ten percent of healthy people gives joint probabilities $0.01\cdot0.9=0.009$ and $0.99\cdot0.1=0.099$. Thus

$$P(\text{disease}\mid+) =\frac{0.009}{0.009+0.099}=\frac1{12}.$$

For a frequency interpretation, among ten thousand uniformly sampled people the expected counts are one hundred diseased and ninety-nine hundred healthy, with ninety true positives and nine hundred ninety false positives. These are expected frequencies rather than guaranteed counts in a random sample. They explain why a positive result can have a small posterior even when the true-positive rate is high.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 255" role="img" aria-label="Bayes update among positive test results" style="width:100%;max-width:520px;height:auto"><title>Bayes update among positive test results</title><g stroke="currentColor" stroke-width="1.2"><rect x="80" y="75" width="360" height="55" fill="currentColor" fill-opacity=".1"/><rect x="80" y="75" width="30" height="55" fill="currentColor" fill-opacity=".6"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="27">Among 10,000 people: 1,080 expected positive tests</text><text x="95" y="158">90</text><text x="275" y="158">990</text><text x="260" y="199">90 diseased positives; 990 healthy positives</text><text x="260" y="232">The diseased share is 90/1,080 = 1/12.</text></g></svg>

A likelihood is not a posterior: $P(+\mid\text{disease})=0.9$ answers a different question from $P(\text{disease}\mid+)$. The base rate matters because the healthy group is much larger. The same bookkeeping applies to hypotheses that are not causal explanations, such as which urn was chosen.

If two urns are chosen with equal prior probabilities, and their red-ball probabilities are $3/4$ and $1/4$, the red evidence weights them in ratio $3:1$, giving posterior $3/4$ for the first. With unequal priors, the likelihoods alone no longer determine that ratio. More generally, when the relevant factors are positive,

$$\frac{P(A_1\mid B)}{P(A_2\mid B)}=\frac{P(A_1)}{P(A_2)}\frac{P(B\mid A_1)}{P(B\mid A_2)}.$$

Thus prior odds are multiplied by the likelihood ratio. A very likely observation under both hypotheses may give little discrimination; the ratio of those likelihoods is what changes the odds.

For repeated evidence, multiply likelihoods only under the stated conditional-independence model. If one fixed coin is selected uniformly from a fair coin and a coin with head probability $3/4$, and its tosses are independent conditional on that selected coin, two heads have likelihoods $1/4$ and $9/16$. Their unnormalized prior weights are $1/8$ and $9/32$, giving fair-coin posterior $4/13$. The same coin remains selected throughout; choosing a fresh coin on each toss would be a different experiment.

The next head probability after those two heads is the posterior-weighted mixture $(4/13)(1/2)+(9/13)(3/4)=35/52$. Conditional independence given the coin does not make the mixture tosses independent without that condition: observing heads changes our belief about which coin remains in use. The distinction is also essential when applying several test results to a shared unknown condition.`,
      related: [
        { card: "conditional-probability", note: String.raw`the forward direction, from a cause to the chance of its effect (R6.2).` },
        { card: "complementary-counting", note: String.raw`the chance of a negative result as one minus the chance of a positive one.` }
      ],
      exercises: [
        { q: String.raw`A disease affects $1\%$ of a population. A test is positive for $90\%$ of those with the disease and for $10\%$ of those without it. A person is sampled uniformly from this population and tests positive. What is the probability that the person has the disease?`, answer: "1/12",
          solution: String.raw`The person is sampled from the population whose disease prevalence is one percent. The disease-positive intersection has probability $(1/100)(9/10)=9/1000$; the healthy-positive intersection has probability $(99/100)(1/10)=99/1000$. Their sum is the total positive probability. The disease posterior is therefore $9/(9+99)=1/12$. The given ninety percent is a likelihood conditional on disease, not the posterior after a positive result.` },
        { q: String.raw`Urn $A$ holds $3$ red balls and $1$ blue ball; urn $B$ holds $1$ red and $3$ blue. An urn is chosen uniformly at random and a ball is drawn uniformly from it, and it is red. What is the probability that the urn was $A$?`, answer: "3/4",
          solution: String.raw`The urns have equal prior probabilities. A red draw jointly with urn $A$ has probability $(1/2)(3/4)=3/8$; red jointly with urn $B$ has probability $(1/2)(1/4)=1/8$. The draw is uniform within the selected urn. Normalizing over the red evidence gives $P(A\mid\text{red})=(3/8)/(3/8+1/8)=3/4$.` }
      ],
      problems: [
        "2012 AMC 10B, Problem 18"
      ]
    },
    "R9.3": {
      prereq: ["conditional-probability", "expected-value", "geometric-series", "recursive-counting"],
      cards: ["states-recursion-prob", "geometric-distribution"],
      body: String.raw`A state is a record sufficient to determine the distribution of the next step. The physical position may be enough for a random walk, but a pattern-waiting problem needs a suitable part of its recent history. The process need not have lacked memory originally; choosing a richer state can incorporate that memory. A finite record is useful only if it preserves the information that affects future transitions.

For [[states-recursion-prob|first-step analysis]], let $p_{st}$ be the next-state probability from $s$ to $t$. If $h_s$ is the probability of eventually hitting a designated successful end before a failed end, conditioning on the first step gives

$$h_s=\sum_t p_{st}h_t.$$

At a successful end put $h=1$, and at a failed end $h=0$. For an expected remaining number of steps to an end, use $E=0$ at every end and

$$E_s=1+\sum_t p_{st}E_t.$$

The added one counts the next transition, not an extra step after arrival. Self-loops must be retained with their probabilities. To count another accumulated quantity, replace one by its expected immediate cost.

Before treating the expected-time equations as finite algebra, justify stopping and finite expectation. In a finite state system, suppose every reachable nonterminal state has a positive-probability path to an end. Choose one such path from each state. Finitely many paths give a common length bound $L$ and a positive lower bound $\delta$ on their probabilities. From any surviving state, the chance of stopping within the next $L$ steps is at least $\delta$.

Consequently the chance of surviving $j$ such blocks is at most $(1-\delta)^j$, which tends to zero, and the expected number of steps is at most $L\sum_{j\ge0}(1-\delta)^j=L/\delta$. This establishes both eventual stopping with probability one and finite expectation. Finitely many states alone would not suffice: a reachable closed loop with no exit can prevent stopping. Without the appropriate stopping conditions, linear equations can be underdetermined for hitting probabilities or fail to have a finite expected-time solution.

For a gambler on the integers zero through five, with independent fair $+1,-1$ bets and stopping at either endpoint, a bounded sequence of losses can reach zero from every interior state, so the condition holds. The probability equations give $h_k=(h_{k-1}+h_{k+1})/2$. Hence consecutive differences are equal. With $h_0=0,h_5=1$, the solution is $h_k=k/5$, so a start at two succeeds with probability $2/5$.

The expected-time equations for a fair walk on zero through $N$ are $E_k=1+(E_{k-1}+E_{k+1})/2$, with endpoint values zero. The quadratic $E_k=k(N-k)$ satisfies both the recurrence and the boundaries. Thus the same start at two with $N=5$ has mean duration six bets. For a biased walk with right-step probability $p\in(0,1)$, the probability recurrence instead gives

$$h_{k+1}-h_k=\frac{1-p}{p}(h_k-h_{k-1}).$$

For $p=2/3$ and endpoints zero and four, the four successive increments are $d,d/2,d/4,d/8$. They sum to one, giving $d=8/15$ and $h_1=8/15$. Assuming a linear probability profile would be incorrect in this biased example.

To wait for $HH$ in independent fair tosses, record state zero at the start or after a tail, state one when the latest toss is a head but no $HH$ has occurred, and an absorbing success state. From state one, a tail returns to zero, not to another one-head state. First-step analysis gives

$$E_0=1+\frac12E_0+\frac12E_1,\qquad E_1=1+\frac12E_0.$$

Solving yields $E_1=4,E_0=6$. Every two-toss block has probability $1/4$ of being $HH$, so a geometric-block bound justifies finite expectation before solving. For a coin of head probability $p\in(0,1]$, the same equations give $E_0=(1+p)/p^2$. Success probabilities of overlapping pairs cannot simply be treated as independent repeated trials.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 275" role="img" aria-label="States for waiting for consecutive heads" style="width:100%;max-width:520px;height:auto"><title>States for waiting for consecutive heads</title><defs><marker id="r93-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor"/></marker></defs><g stroke="currentColor" fill="none" stroke-width="1.3" marker-end="url(#r93-arrow)"><path d="M115 100H220"/><path d="M300 100H405"/><path d="M230 145Q175 235 105 145"/><path d="M75 90C5 20 165 20 110 85"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="170" y="80">H: 1/2</text><text x="350" y="80">H: 1/2</text><text x="175" y="225">T: 1/2</text><text x="85" y="29">T: 1/2</text><text x="85" y="123">No H suffix</text><text x="260" y="123">One H</text><text x="450" y="123">HH: stop</text><text x="260" y="250">A tail discards partial progress toward HH.</text></g></svg>

A race between patterns must specify whether the sequences are shared. On one shared fair sequence, $HH$ beats $TH$ only if the first two tosses are heads. Once a tail has appeared, the next head completes $TH$ before $HH$ can form, so the success probability is $1/4$. On two separate independent fair sequences, one for each pattern, the model is different and ties can occur in the same round.

For that separate-sequence race, let $x_{ab}$ be the probability that the $HH$ player finishes strictly earlier, where $a$ records whether that player just tossed a head and $b$ whether the $TH$ player just tossed a tail. Both progress values are zero initially. In each round the four outcome pairs have probability $1/4$. Ties count as failures for a strictly-earlier question. The first-step equations are

$$x_{00}=\frac{x_{00}+x_{01}+x_{10}+x_{11}}4,\qquad x_{01}=\frac{x_{01}+x_{11}}4,$$
$$x_{10}=\frac12+\frac{x_{00}+x_{01}}4,\qquad x_{11}=\frac14+\frac{x_{01}}4.$$

For example, from state eleven only the outcome head for the first player and tail for the second gives an immediate strict win; head-head completes both patterns and does not count. Solving the last equation and then the second gives $x_{01}=1/11,x_{11}=3/11$. The other two give $x_{10}=73/121$ and $x_{00}=39/121$. The difference from $1/4$ comes from the different experiment, not a choice of solution method.

A [[geometric-distribution|geometric waiting time]] counts trials through the first success in independent trials of common success probability $0\lt p\le1$. Its distribution is $P(T=k)=(1-p)^{k-1}p$ for $k\ge1$, and its tail is $P(T>j)=(1-p)^j$. For a positive integer-valued count, $T=\sum_{j\ge0}1_{\{T>j\}}$, so summing these nonnegative contributions gives $E[T]=\sum_{j\ge0}P(T>j)=1/p$. Equivalently the first-step equation is $E=1+(1-p)E$. Failures before success count $T-1$ and have mean $(1-p)/p$. If $p=0$, the wait never finishes and has infinite mean.

For the $r$th success, with positive integer $r$, split the wait into $r$ fresh first-success stages. Their means add to $r/p$, and the mean number of failures is $r(1-p)/p$. The $r$th success occurs on trial $k\ge r$ exactly when trial $k$ succeeds and the first $k-1$ trials have $r-1$ successes, giving $\binom{k-1}{r-1}p^r(1-p)^{k-r}$. This is different from waiting for $r$ consecutive successes, which loses partial progress on failures.

Coupon collection similarly uses stages. With $n$ equally likely types on independent draws, after $k$ distinct types the chance of a new one is $(n-k)/n$. The stage mean is $n/(n-k)$. Adding for $k=0,\ldots,n-1$ gives $n\sum_{j=1}^n1/j$. For a die this is $6(49/20)=147/10$ rolls. Linearity adds the stage expectations even though the stage lengths have different distributions; independence between stage lengths is not needed for this addition. Unequal type probabilities change the stages and do not use this uniform-type formula.

A fixed-horizon question uses forward probabilities instead of eventual-time equations. For a cricket hopping uniformly to one of three other leaves among four, combine the starting leaf into state $S$ and all other leaves into state $O$. From $S$ the next state is $O$ with probability one; from any $O$, it is $S$ with probability $1/3$ and $O$ with probability $2/3$. Thus $p_{n+1}=(1-p_n)/3$, with $p_0=1$, giving return probabilities $0,1/3,2/9,7/27$ after one through four hops. Each probability row still totals one.

Merging states by symmetry is valid only when the transition probabilities and the goal or cost are preserved. The three nonstarting leaves have the same probabilities of moving into each group, justifying their merge. A reflection of a line that swaps the success and failure endpoints does not identify equal success probabilities: in the three-interval fair walk, the reflected states one and two have probabilities $1/3$ and $2/3$. When transitions or targets differ, keep enough separate states to retain that difference.`,
      related: [
        { card: "turn-based-games", note: String.raw`a game of chance in turns, a process with two states (R8.4).` },
        { card: "recursive-counting", note: String.raw`the same one-step-back reasoning for counts (R5.2).` },
        { card: "wlog-symmetry", note: String.raw`merging states that a symmetry exchanges (R7.6).` }
      ],
      exercises: [
        { q: String.raw`A gambler has $\$2$ and bets $\$1$ on each independent toss of a fair coin, winning or losing $\$1$, until the total is $\$5$ or $\$0$. What is the probability of reaching $\$5$?`, answer: "2/5",
          solution: String.raw`Let $p_k$ be the chance of hitting five before zero from capital $k$. Boundary values are zero and one, and fairness gives $2p_k=p_{k-1}+p_{k+1}$. Thus $p_{k+1}-p_k=p_k-p_{k-1}$, so all five increments are equal and sum to one. Each is $1/5$, giving $p_2=2/5$. The finite walk has a uniformly positive chance of reaching an endpoint within five steps from every interior state, ensuring absorption.` },
        { q: String.raw`A fair coin is tossed independently until two heads appear in a row. What is the expected number of tosses?`, answer: "6",
          solution: String.raw`Record state zero at the start or after a tail, state one after a head without completed $HH$, and a terminal state after success. The expected further tosses satisfy $E_0=1+(E_0+E_1)/2$ and $E_1=1+E_0/2$. The first gives $E_0=2+E_1$; substitution gives $E_1=2+E_1/2$, hence $E_1=4,E_0=6$. The mean is finite because each disjoint pair of tosses is $HH$ with probability $1/4$, supplying a geometric bound on the stopping time. Overlapping adjacent pairs are not independent trials.` },
        { q: String.raw`A fair die is rolled independently until every one of the six faces has appeared. What is the expected number of rolls?`, answer: "147/10",
          solution: String.raw`After $k$ distinct faces have appeared, the chance that the next roll shows a new face is $(6-k)/6$. The wait for that next new face has mean $6/(6-k)$. Add these stage means for $k=0,\ldots,5$, including the first roll: $6(1+1/2+1/3+1/4+1/5+1/6)=6(49/20)=147/10$. The probabilities change from stage to stage; the total is not one geometric wait with a fixed success probability.` },
        { q: String.raw`A fair coin is tossed independently until either $HH$ or $TH$ appears as two consecutive tosses. What is the probability that $HH$ appears first?`, answer: "1/4",
          solution: String.raw`If the first two tosses are $HH$, that pattern wins immediately. Otherwise a tail appears before any $HH$. The first subsequent head completes $TH$; a later $HH$ cannot win first. An independent fair sequence eventually has a head after a tail with probability one. Thus $HH$ wins exactly on the first-two-heads event, of probability $1/4$. Both patterns are watched on the same sequence, not on two independent sequences.` }
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
      body: String.raw`Let $X,Y$ be independent uniform random variables on $[0,1]$. The pair is uniform in the unit square. The event $XY\le c$ for $0\lt c\le1$ is the part below the hyperbola $y=c/x$. For $0\le x\le c$, every allowed $y$ works; for $c\lt x\le1$, the allowed height is $c/x$. The [[product-of-uniforms|product distribution]] is therefore an area calculation, not a uniform distribution of the product itself.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 375" role="img" aria-label="Uniform product region with threshold one quarter" style="width:100%;max-width:520px;height:auto"><title>Uniform product region with threshold one quarter</title><g stroke="currentColor" stroke-width="1.2"><rect x="120" y="55" width="240" height="240" fill="none"/><polygon points="120.000,295.000 360.000,295.000 360.000,235.000 357.600,234.394 355.200,233.776 352.800,233.144 350.400,232.500 348.000,231.842 345.600,231.170 343.200,230.484 340.800,229.783 338.400,229.066 336.000,228.333 333.600,227.584 331.200,226.818 328.800,226.034 326.400,225.233 324.000,224.412 321.600,223.571 319.200,222.711 316.800,221.829 314.400,220.926 312.000,220.000 309.600,219.051 307.200,218.077 304.800,217.078 302.400,216.053 300.000,215.000 297.600,213.919 295.200,212.808 292.800,211.667 290.400,210.493 288.000,209.286 285.600,208.043 283.200,206.765 280.800,205.448 278.400,204.091 276.000,202.692 273.600,201.250 271.200,199.762 268.800,198.226 266.400,196.639 264.000,195.000 261.600,193.305 259.200,191.552 256.800,189.737 254.400,187.857 252.000,185.909 249.600,183.889 247.200,181.792 244.800,179.615 242.400,177.353 240.000,175.000 237.600,172.551 235.200,170.000 232.800,167.340 230.400,164.565 228.000,161.667 225.600,158.636 223.200,155.465 220.800,152.143 218.400,148.659 216.000,145.000 213.600,141.154 211.200,137.105 208.800,132.838 206.400,128.333 204.000,123.571 201.600,118.529 199.200,113.182 196.800,107.500 194.400,101.452 192.000,95.000 189.600,88.103 187.200,80.714 184.800,72.778 182.400,64.231 180.000,55.000 120.000,55.000" fill="currentColor" fill-opacity=".13" stroke="none"/><polyline points="180.000,55.000 182.400,64.231 184.800,72.778 187.200,80.714 189.600,88.103 192.000,95.000 194.400,101.452 196.800,107.500 199.200,113.182 201.600,118.529 204.000,123.571 206.400,128.333 208.800,132.838 211.200,137.105 213.600,141.154 216.000,145.000 218.400,148.659 220.800,152.143 223.200,155.465 225.600,158.636 228.000,161.667 230.400,164.565 232.800,167.340 235.200,170.000 237.600,172.551 240.000,175.000 242.400,177.353 244.800,179.615 247.200,181.792 249.600,183.889 252.000,185.909 254.400,187.857 256.800,189.737 259.200,191.552 261.600,193.305 264.000,195.000 266.400,196.639 268.800,198.226 271.200,199.762 273.600,201.250 276.000,202.692 278.400,204.091 280.800,205.448 283.200,206.765 285.600,208.043 288.000,209.286 290.400,210.493 292.800,211.667 295.200,212.808 297.600,213.919 300.000,215.000 302.400,216.053 304.800,217.078 307.200,218.077 309.600,219.051 312.000,220.000 314.400,220.926 316.800,221.829 319.200,222.711 321.600,223.571 324.000,224.412 326.400,225.233 328.800,226.034 331.200,226.818 333.600,227.584 336.000,228.333 338.400,229.066 340.800,229.783 343.200,230.484 345.600,231.170 348.000,231.842 350.400,232.500 352.800,233.144 355.200,233.776 357.600,234.394 360.000,235.000" fill="none" stroke-width="2"/><path d="M180 55V295" stroke-dasharray="4 4" opacity=".6"/></g><g fill="currentColor" text-anchor="middle" font-size="17"><text x="260" y="27">xy ≤ 1/4 in the unit square</text><text x="150" y="180">All y</text><text x="260" y="266">xy ≤ 1/4</text><text x="120" y="320">0</text><text x="180" y="320">1/4</text><text x="360" y="320">1</text><text x="260" y="353">A full strip plus the area below y = 1/(4x).</text></g></svg>

Using integral notation for the area under a curve, the full strip has area $c$ and the rest gives

$$F(c)=P(XY\le c)=c+\int_c^1\frac{c}{x}\,dx=c-c\ln c.$$

Here $\ln$ is the natural logarithm. The area identity $\int_a^b dx/x=\ln(b/a)$ is its integral characterization. One way to see the logarithmic behavior without starting from a memorized antiderivative is to define $L(t)$ as the signed area under $1/x$ from one to $t$. Rescaling the interval from $a$ to $ab$ by $x=au$ leaves this area equal to $L(b)$, so $L(ab)=L(a)+L(b)$. This continuous logarithm, normalized by $L(e)=1$, is $\ln t$. Thus the logarithm measures the curved portion of this probability region.

For $c=1/4$ the answer is $(1+2\ln2)/4\approx0.596574$. For $c=1/2$, it is $(1+\ln2)/2\approx0.846574$, so $P(XY\ge1/2)=(1-\ln2)/2\approx0.153426$. The equality curve has area zero, so strict or weak inequalities give the same probabilities here.

The endpoints need their own interpretation. Products are nonnegative and at most one, so $F(c)=0$ for $c\le0$ and $F(c)=1$ for $c\ge1$. At zero the axes have zero area. There is no numerical substitution of $\ln0$ into the formula. For small positive $c$, the event is contained in the union of the strips $X\le\sqrt c$ and $Y\le\sqrt c$, since otherwise the product would exceed $c$. Hence $F(c)\le2\sqrt c$, also confirming that the probability tends to zero.

Differentiating on $0<t<1$ gives the product's density $f(t)=-\ln t$. A density value is not the probability of an exact point: individual product values still have probability zero. Probabilities over intervals are integrals of the density, or differences $F(b)-F(a)$. For fixed $X=x$, averaging the independent $Y$ gives a conditional mean product $x/2$. Averaging over $X$ then gives $E[XY]=E[X]/2=1/4$, without first deriving the product's full distribution.

For independent uniform choices on $[0,a]$ and $[0,b]$, where $a,b>0$, divide the variables by their interval lengths. If $0<k<ab$, the threshold becomes $c=k/(ab)$ and

$$P(XY\le k)=\frac{k}{ab}\left(1-\ln\frac{k}{ab}\right).$$

For thresholds outside that range use the endpoint probabilities. Independence cannot be replaced by uniform marginal distributions alone: if $Y=X$ is the same uniform number, then $P(XY\le c)=P(X\le\sqrt c)=\sqrt c$, which is a different model.

For three independent unit-uniform factors, condition on the third value $Z=z$. When $z\le c$ the event $XYZ\le c$ is certain; otherwise the two-factor threshold is $c/z$. Integrating these conditional probabilities for $0<c\le1$ gives

$$P(XYZ\le c)=c+\int_c^1\frac cz\left(1-\ln\frac cz\right)dz=c\left(1-\ln c+\frac{(\ln c)^2}{2}\right).$$

To evaluate the integral, separate $1-\ln c+\ln z$, use $\int dz/z=\ln z$ and $\int(\ln z)dz/z=(\ln z)^2/2$, and evaluate at $c,1$. This extension illustrates conditioning on one variable to reuse an already derived distribution.

The same product appears in areas. In any nondegenerate triangle $ABC$, choose $P$ uniformly along $AB$ and independently $Q$ along $AC$. The fractions $X=AP/AB$ and $Y=AQ/AC$ are independent unit-uniform numbers. Using the shared angle at $A$,

$$\frac{[APQ]}{[ABC]}=\frac{AP\cdot AQ\sin A/2}{AB\cdot AC\sin A/2}=XY.$$

Thus the probability that the smaller triangle's area is below half the original area is about $0.846574$, between $3/4$ and $7/8$. Equilateral shape is not needed for this ratio. A different point-selection rule, or dependence between the two positions, would require a different distribution.`,
      related: [
        { card: "geometric-probability", note: String.raw`probability as area when the boundaries are lines (R6.4).` },
        { card: "shared-angle-area-ratio", note: String.raw`the area of a triangle cut off by points on two sides, as a product of fractions.` }
      ],
      exercises: [
        { q: String.raw`Numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $xy \le \tfrac14$? Give the exact value.`,
          solution: String.raw`Independence and uniformity make $(x,y)$ a uniform point of the unit square. When $0\le x\le1/4$, every $y$ works, contributing area $1/4$. For $1/4<x\le1$, the allowed height is $1/(4x)$, giving area $\int_{1/4}^1 dx/(4x)=(\ln4)/4$. The sum is $(1+\ln4)/4=(1+2\ln2)/4\approx0.596574$. The logarithm is natural; its appearance comes from the hyperbolic area.` },
        { q: String.raw`Numbers $x$ and $y$ are chosen independently and uniformly from $[0, 1]$. What is the probability that $xy \ge \tfrac12$? Give the exact value.`,
          solution: String.raw`The product CDF at $1/2$ is $F(1/2)=1/2-(1/2)\ln(1/2)=(1+\ln2)/2$. The product equals $1/2$ with probability zero, since the corresponding curve has zero area. Hence the probability of a product at least $1/2$ is the complement $1-F(1/2)=(1-\ln2)/2\approx0.153426$. Strict and weak inequalities agree for this continuous model.` }
      ],
      problems: [
        "2024 AMC 12A, Problem 20"
      ]
    },
    "R9.5": {
      prereq: ["bayes-theorem", "states-recursion-prob", "geometric-distribution", "product-of-uniforms"],
      cards: [],
      body: String.raw`[[bayes-theorem|Bayes' theorem]] updates hypotheses by prior probability times likelihood, normalized by the total probability of the observed event. The hypotheses form an exhaustive partition and the evidence must have positive probability. Repeated observations require their joint likelihood under each hypothesis; multiplying likelihoods needs conditional independence, not an unexamined assumption about the mixture.

[[states-recursion-prob|State analysis]] records enough history to determine the next-step probabilities. Eventual-outcome equations average boundary values; expected-time equations also add the immediate cost. Check stopping and finite expectation before treating their solutions as finite waits. Fixed-time questions instead propagate a probability distribution forward. Symmetry merges states only when it preserves the transition rule and the particular goal or cost.

[[geometric-distribution|Geometric waits]] use independent trials with a fixed positive success probability and count the successful trial. Failures alone subtract one. Waiting for a fixed number of successes adds fresh stages; consecutive patterns need suffix states. Uniform coupon collection adds stages whose success probabilities change with the number of collected types.

[[product-of-uniforms|Independent uniform products]] are areas below a hyperbola, giving $c-c\ln c$ for $0<c\le1$. The threshold's range, the joint sampling model and the natural-logarithm convention matter. Rescaling handles other positive interval lengths; conditioning extends to three factors; the shared-angle area formula turns two independently chosen side positions into the same product model.`,
      strategies: [
        String.raw`For the chance of a cause, put the causes first in the tree and weigh the base rates.`,
        String.raw`Choose sufficient states and merge only when the transitions and goal are preserved; write the appropriate boundary equations.`,
        String.raw`Justify finite expectation, then add one for the next step in an expected-time equation.`,
        String.raw`For a fixed number of steps, build the states' probabilities row by row.`,
        String.raw`Split a long wait into waits for one success each.`,
        String.raw`When a boundary is a curve, integrate the part of the region the curve cuts off.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A bag holds two coins: one fair, and one that lands heads with probability $\tfrac34$. A coin is drawn uniformly at random, retained, and tossed twice independently conditional on that coin, landing heads both times. What is the probability that it is the fair coin?`, answer: "4/13",
        solution: String.raw`The coin is selected once and retained. Conditional on each coin, the two tosses are independent, so the likelihoods of two heads are $1/4$ for the fair coin and $9/16$ for the other. Multiplying by the equal priors gives $1/8=4/32$ and $9/32$. The posterior fair-coin share is $4/(4+9)=4/13$. Unconditional independence of the mixture tosses is not assumed.` },
      { q: String.raw`A fair coin is tossed independently until it lands heads. What is the expected number of tosses?`, answer: "2",
        solution: String.raw`The first-head time includes the successful toss. Independent fair tosses give tail probabilities $P(T>j)=(1/2)^j$, whose sum is two. Equivalently $E=1+(1/2)E$ after a failure resets the experiment, giving $E=2$. Counting failures alone would instead have mean one.` },
      { q: String.raw`A token starts at $1$ on the points $0, 1, 2, 3, 4$. At each step it moves right with probability $\tfrac23$ and left with probability $\tfrac13$, stopping at $0$ or $4$. What is the probability that it reaches $4$?`, answer: "8/15",
        solution: String.raw`Let $p_k$ be the probability of reaching four before zero, with $p_0=0,p_4=1$. First-step analysis gives $p_k=p_{k-1}/3+2p_{k+1}/3$, so the successive increments decrease by a factor of two. They are $d,d/2,d/4,d/8$ and sum to one, hence $(15/8)d=1$. Since $p_1-p_0=d$, the answer is $8/15$. Positive paths to endpoints from every state ensure absorption; the fair-walk linear profile is not valid for these unequal step probabilities.` },
      { q: String.raw`One coin is selected uniformly from a fair coin and a coin with head probability $3/4$. Tosses are independent conditional on the selected coin, which is retained. Given two heads, what is the probability the next toss is heads?`, answer: "35/52",
        solution: String.raw`The two-head likelihoods are $1/4$ and $9/16$, so with equal priors the posterior coin probabilities are $4/13$ fair and $9/13$ biased. The next-head probability is their posterior mixture, $(4/13)(1/2)+(9/13)(3/4)=35/52$. It is not the initial mixture mean $5/8$, because the evidence favors the more head-prone coin.` },
      { q: String.raw`Independent trials each succeed with probability $1/4$. What are the expected number of trials through the third success and the expected number of failures before it? Give the two means in that order.`, answer: "12,9",
        solution: String.raw`Split the wait into three fresh geometric stages, each including its concluding success and having mean four. The expected total is $3\cdot4=12$ trials. Exactly three of those trials are successes, so subtracting gives nine expected failures. This is a wait for three successes in total, not three consecutive successes.` },
      { q: String.raw`A cricket starts on one of four leaves and at each hop chooses uniformly among the other three. What is the probability it is at the starting leaf after three hops, and what is the expected number of hops to reach the starting leaf from another leaf? Give the answers in that order.`, answer: "2/9,3",
        solution: String.raw`Writing $p_n$ for the return probability after $n$ hops, $p_{n+1}=(1-p_n)/3$ with $p_0=1$ gives $p_1=0,p_2=1/3,p_3=2/9$. From any other leaf the next-hop return chance is $1/3$, and after a failure the cricket is still in that same aggregate state. The expected remaining time satisfies $E=1+(2/3)E$, hence $E=3$. The first quantity is fixed-time occupancy, the second an eventual hitting time.` },
      { q: String.raw`A bug starts at a vertex of a cube. On each step it chooses uniformly among its three neighboring vertices, independently of earlier choices conditional on its current vertex. What is the expected number of steps to first reach the opposite vertex?`, answer: "10",
        solution: String.raw`Use distance from the target as the state. With $E_0=0$, the equations are $E_1=1+(2/3)E_2$, $E_2=1+(2/3)E_1+(1/3)E_3$, and $E_3=1+E_2$. The latter two imply $E_2=2+E_1$. Substituting into the first gives $E_1=7$, then $E_2=9,E_3=10$. Every vertex has a path of at most three steps to the target with probability at least $1/27$, ensuring finite expectation. The distance groups preserve transitions and the target.` },
      { q: String.raw`Independent uniform numbers $X,Y$ are chosen from $[0,1]$. What is the probability that $1/4<XY<1/2$?`, answer: "1/4",
        solution: String.raw`Subtract product CDF values. They are $F(1/2)=(1+\ln2)/2$ and $F(1/4)=(1+2\ln2)/4$. Their difference is $1/4$, because the logarithmic terms cancel. The strict boundaries have zero probability, so no endpoint mass needs to be added or removed.` },
      { q: String.raw`Choose $X$ uniformly on $[0,2]$ and, independently, $Y$ uniformly on $[0,3]$. Find the exact probability that $XY\le3$.`,
        solution: String.raw`The variables $U=X/2$ and $V=Y/3$ are independent unit-uniform variables, and $XY=6UV$. Thus $XY\le3$ is $UV\le1/2$. The probability is $F(1/2)=(1+\ln2)/2$, approximately $0.846574$. Using threshold three directly in the unit-square formula would skip the required rescaling.` }
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
