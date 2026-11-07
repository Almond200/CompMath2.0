// Learn, AMC Algebra, chapter L2: equations and word problems (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L2"] = {
  lessons: {
    "L2.1": {
      prereq: [],
      cards: [],
      body: String.raw`An equation records a condition that a quantity must satisfy. Solving it means identifying every allowed value that satisfies that condition. A word problem adds another responsibility: we must decide which quantities to name and why the stated information leads to the equation. A correct calculation cannot repair an incorrect model.

Suppose a delivery costs a fixed fee of $7$ dollars plus $3$ dollars for each package. If the bill is $25$ dollars, calling the number of packages $n$ gives $7+3n=25$. The fee accounts for $7$ dollars of the bill, leaving $18$ dollars for packages; dividing by $3$ gives $n=6$. The algebra follows the same reasoning: subtract the fixed part, then divide by the cost of one unit. Checking $7+3\cdot6=25$ verifies the bill, and the whole-number answer is meaningful as a package count.

More complicated situations still depend on identifying what is being counted. When two kinds of objects have different costs, we track both their number and their value. When a rate changes during a trip, we track the time and distance of each stage. When an average changes, we track the total and the number of items. These are different contexts for the same habit: preserve the quantities that the information actually controls.

This chapter first develops equation-solving steps and explains when a step can introduce or lose a solution. It then uses systems to combine conditions, rates to accumulate amounts over time, and averages to compare totals. The final lesson brings those ideas together in models whose answers must also satisfy conditions such as being nonnegative or integral. Each solution ends by returning to the original situation.`,
      exercises: [
        { q: String.raw`Solve $3x - 7 = 11$.`, answer: "6",
          solution: String.raw`Add $7$ to both sides: $3x = 18$. Divide by $3$: $x = 6$. Check: $18 - 7 = 11$.` },
        { q: String.raw`If $x + y = 10$ and $x - y = 4$, find $x$.`, answer: "7",
          solution: String.raw`Adding the equations eliminates $y$: $2x = 14$, so $x = 7$ (and $y = 3$).` },
        { q: String.raw`Four numbers have average $15$. A fifth number, $25$, is added. What is the new average?`, answer: "17",
          solution: String.raw`The four numbers add to $4 \cdot 15 = 60$. With $25$ the total is $85$, and the average of five numbers is $\tfrac{85}{5} = 17$.` }
      ],
      problems: [
        "1992 AJHSME, Problem 18",
        "1985 AJHSME, Problem 17",
        "1990 AJHSME, Problem 24"
      ]
    },
    "L2.2": {
      prereq: [],
      cards: ["transforming-equations"],
      body: String.raw`An equation is a statement that may be true for some inputs and false for others. In $5(x-2)=3x+4$, substituting $x=7$ makes both sides $25$; substituting $x=0$ makes them $-10$ and $4$. Solving the equation means describing exactly the inputs that make the two sides equal. A sequence of algebraic steps is useful only when we know how its solutions relate to those of the original statement.

Expand the parentheses to obtain $5x-10=3x+4$. Subtracting $3x$ from both sides gives $2x-10=4$, and adding $10$ gives $2x=14$. Dividing by the nonzero number $2$ leaves $x=7$. Every step can be undone, so a value satisfies one line exactly when it satisfies the next. This is the basic principle behind [[transforming-equations|transforming equations]]: reversible operations preserve the whole solution set.

Reversibility matters more than the instruction to do the same operation to both sides. Squaring both sides certainly preserves an equality, but equal squares do not guarantee equal original numbers. For $\sqrt{2x+3}=x$, the left side is defined only when $2x+3\ge0$, and its nonnegativity also requires $x\ge0$ in any solution. Squaring gives

$$2x+3=x^2,\qquad (x-3)(x+1)=0.$$

The candidates are $3$ and $-1$. Substitution in the original equation keeps $3$ and rejects $-1$: $\sqrt1=1$, not $-1$. The squared equation allowed the two original sides to be opposites. Recording $x\ge0$ before squaring would have exposed that candidate immediately, but checking the original equation remains a reliable final check.

A denominator creates a different restriction. In $(x^2-4)/(x-2)=5$, we must keep $x\ne2$ throughout the work. For allowed inputs, factoring and canceling gives $x+2=5$, hence $x=3$, which passes the restriction and the original equation. The simplified expression $x+2$ has a value at $2$, but that does not fill the hole in the domain of the original fraction. An algebraically simpler expression may be defined on a larger set than the expression it replaces.

Dividing by an unknown expression can instead discard a solution. In $x(x-1)=2x$, dividing by $x$ produces $x-1=2$ and finds $x=3$, but silently assumes $x\ne0$. The missing value $x=0$ also satisfies the original equation. Moving everything to one side and factoring gives $x(x-3)=0$, which keeps both possibilities. Alternatively, separate the cases $x=0$ and $x\ne0$ before dividing. Checking found answers cannot recover a lost answer, so this case split must happen during the reasoning.

Finally, an equation need not have exactly one solution. The equation $2(x+1)=2x+2$ is true for every real $x$, while $2(x+1)=2x+3$ reduces to $2=3$ and has none. When the variable cancels, interpret the remaining statement rather than trying to force a value for it. The next lesson applies the same idea to several conditions at once.`,
      related: [
        { card: "quadratic-formula", note: String.raw`the equations that squaring often produces (L3.2).` },
        { card: "denesting-radicals", note: String.raw`harder radical equations, where the same check is needed (L10.5).` }
      ],
      exercises: [
        { q: String.raw`Solve $5(x - 2) = 3x + 4$.`, answer: "7",
          solution: String.raw`Expand: $5x - 10 = 3x + 4$. Subtract $3x$ and add $10$: $2x = 14$, so $x = 7$. Check: $5 \cdot 5 = 25 = 21 + 4$.` },
        { q: String.raw`Solve $\sqrt{2x + 3} = x$.`, answer: "3",
          solution: String.raw`Squaring gives $2x + 3 = x^2$, so $x^2 - 2x - 3 = (x - 3)(x + 1) = 0$ and $x = 3$ or $x = -1$. Check: $\sqrt9 = 3$ works, but $\sqrt1 = 1 \ne -1$, so the only solution is $x = 3$.` },
        { q: String.raw`Solve $\dfrac{x^2 - 4}{x - 2} = 5$.`, answer: "3",
          solution: String.raw`For $x \ne 2$, the left side is $\tfrac{(x - 2)(x + 2)}{x - 2} = x + 2$, so $x + 2 = 5$ and $x = 3$, which is allowed. Check: $\tfrac{9 - 4}{1} = 5$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 12",
        "2013 AMC 12A, Problem 8"
      ]
    },
    "L2.3": {
      prereq: ["transforming-equations"],
      cards: ["linear-elimination", "add-all-equations", "assume-all-one-kind"],
      body: String.raw`A system asks for values that satisfy several equations simultaneously. Each equation limits the possibilities, and a solution must survive every limit. The goal is to combine the information without forgetting an original condition. A convenient combination often determines exactly the quantity the problem asks for, even when the individual unknowns are not yet known.

For $2x+3y=12$ and $x-y=1$, the second equation says $x=y+1$. Substituting this expression into the first gives $2(y+1)+3y=12$, hence $y=2$ and $x=3$. Substitution works because the replacement is a quantity already known to equal $x$. The resulting pair must satisfy both equations: $6+6=12$ and $3-2=1$.

We can also make the $y$ terms cancel. Multiplying the second equation by $3$ gives $3x-3y=3$; adding it to the first gives $5x=15$. This is [[linear-elimination|elimination]]. We keep one original equation alongside the new one, so the operation is reversible: subtracting three times the retained equation recovers the one we replaced. Using only the equation $5x=15$ would discard the information about $y$.

A linear equation has variables appearing as constant multiples added together, such as $2x+3y=12$. Terms such as $xy$ or $x^2$ make an equation nonlinear. For two unknowns, two genuinely different linear conditions can determine a unique pair, but simply counting equations is insufficient. The equations $x+y=5$ and $2x+2y=10$ express the same condition and allow infinitely many pairs. Changing the second right side to $11$ makes the conditions contradictory. Elimination distinguishes these cases by producing an identity or a contradiction.

Sometimes the desired combination is visible before any elimination. From $a+b=8$, $b+c=10$ and $a+c=12$, [[add-all-equations|adding the equations]] counts each unknown twice. Thus $2(a+b+c)=30$ and the total is $15$. Subtracting the equation that omits $b$ gives $b=15-12=3$; similarly $a=5$ and $c=7$. The useful feature is the repeated count of each unknown, rather than symmetry as a reason to add equations without examining them.

An everyday counting argument can perform the same elimination. If $20$ animals are chickens or cows and have $56$ legs, let $c$ be the number of cows. There are $20-c$ chickens, so the leg count is $4c+2(20-c)=56$. Expanding gives $40+2c=56$. In words, [[assume-all-one-kind|assume all animals are chickens]]: that accounts for $40$ legs, and each replacement by a cow supplies two of the missing $16$ legs. The resulting eight cows are the same answer found by the equation.

The baseline must distinguish the two kinds. If both kinds contribute the same amount, replacing one by the other changes nothing, so a total amount cannot determine their separate counts. Otherwise, compare the required difference with the change caused by one replacement. Check that the answer is a whole number between zero and the total count. This connection between equations and accumulated amounts will reappear in rate problems.`,
      related: [
        { card: "symmetric-polynomial-strategies", note: String.raw`systems in $x + y$ and $xy$, solved through the sum and product (L3.3).` },
        { card: "coins-and-prices", note: String.raw`systems with whole-number answers, such as coin and stamp problems.` }
      ],
      exercises: [
        { q: String.raw`If $2x + 3y = 12$ and $x - y = 1$, find $x + y$.`, answer: "5",
          solution: String.raw`Add three times the second equation to the first: $5x = 15$, so $x = 3$, and then $y = x - 1 = 2$. So $x + y = 5$.` },
        { q: String.raw`If $a + b = 8$, $b + c = 10$ and $a + c = 12$, find $b$.`, answer: "3",
          solution: String.raw`Adding all three: $2(a + b + c) = 30$, so $a + b + c = 15$. Subtract $a + c = 12$: $b = 3$.` },
        { q: String.raw`A farm has $20$ animals, all chickens or cows, with $56$ legs in all. How many cows are there?`, answer: "8",
          solution: String.raw`If all $20$ were chickens there would be $40$ legs. Each cow in place of a chicken adds $2$ legs, and $56 - 40 = 16$ legs are missing, so there are $8$ cows (and $12$ chickens: $32 + 24 = 56$).` }
      ],
      problems: [
        "1996 AJHSME, Problem 23",
        "1985 AJHSME, Problem 24",
        "2022 AMC 10A, Problem 3",
        "2023 AMC 10A, Problem 2"
      ]
    },
    "L2.4": {
      prereq: ["linear-elimination"],
      cards: ["work-rates", "time-per-leg", "average-speed", "relative-motion", "several-rates"],
      body: String.raw`A rate describes how an amount changes during one unit of time. Traveling at $30$ miles per hour means covering $30$ miles in each hour when that speed stays constant. Filling one tank in three hours means filling one third of the tank per hour when the flow is steady. Naming the amount and the time unit prevents apparently similar numbers from being combined in the wrong way.

For a constant rate, the amount accumulated is the rate multiplied by the elapsed time. Two pipes that fill the same tank separately in $3$ hours and $6$ hours contribute $t/3$ and $t/6$ tanks during $t$ hours. If they operate simultaneously at unchanged rates with no loss of water, their combined contribution is $t/2$ tanks. Setting that equal to one tank gives $t=2$. Thus [[work-rates|work rates add]] because the amounts produced during the same interval add. The completion times do not add: each is the time for a whole job done separately.

A drain can be represented by a negative contribution. A pipe filling one third of a tank per hour and a drain removing one sixth per hour have net rate one sixth, so an empty tank fills in six hours under this model. The units and signs express what the devices do. A zero net rate cannot fill an empty tank; a negative one cannot fill it either. Before taking the reciprocal of a computed rate, check that the direction of change can achieve the requested goal.

When speeds change one after another, the stages share no common elapsed interval. Instead, use [[time-per-leg|time for each leg]] and add those times. A car going $60$ miles at $30$ mph spends two hours outbound, then one hour returning the same distance at $60$ mph. The total is $120$ miles in three hours, so its [[average-speed|average speed]] is $40$ mph.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 205" role="img" aria-labelledby="l24-time-title l24-time-desc" style="width:100%;max-width:480px;height:auto"><title id="l24-time-title">Equal distances can take unequal times</title><desc id="l24-time-desc">The sixty-mile outbound leg at thirty miles per hour takes two hours. The sixty-mile return at sixty miles per hour takes one hour. The bars measure time, not distance.</desc><g fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"><rect x="90" y="25" width="240" height="32"/><rect x="90" y="105" width="120" height="32"/></g><g fill="currentColor" font-size="15"><text x="10" y="47">30 mph</text><text x="10" y="127">60 mph</text><text x="210" y="47" text-anchor="middle">2 hours</text><text x="150" y="127" text-anchor="middle">1 hour</text><text x="90" y="80">Outbound: 60 miles</text><text x="90" y="160">Return: 60 miles</text><text x="90" y="191">Total: 120 miles in 3 hours</text></g></svg>

The longer time at the slower speed explains why averaging $30$ and $60$ gives the wrong answer. The arithmetic mean of speeds is appropriate for equal time intervals, not for equal distances. Over two equal-distance legs of length $d$ at positive speeds $u,v$, the actual average is

$$\frac{2d}{d/u+d/v}=\frac{2uv}{u+v}.$$

The distance cancels because doubling the whole trip doubles both distance and time. In any other trip, return to total distance divided by total elapsed time rather than forcing this special formula to fit. Include a stop if its time is part of the journey being averaged.

For two moving objects, [[relative-motion|relative motion]] tracks their separation. Trains $300$ miles apart, approaching at $70$ and $80$ mph, reduce the gap by $150$ miles each hour and meet after two hours. If the faster train instead follows the slower in the same direction, a gap shrinks at their speed difference. The sign comes from how each position changes the gap, not from a rule that every mention of two speeds means addition.

For [[several-rates|a process with several stages]], start a new row whenever a speed, flow or set of workers changes. Record the duration, rate and amount for that stage; then add the amounts or times required by the condition. This method also handles a worker joining late: only the shared part of the job uses the combined rate. The next lesson uses the same totals to explain weighted averages.`,
      related: [
        { card: "weighted-average", note: String.raw`an average speed is a weighted average of the speeds, weighted by time (L2.5).` },
        { card: "setting-up-proportions", note: String.raw`converting units, such as minutes to hours, by fractions equal to $1$ (L1.5).` }
      ],
      exercises: [
        { q: String.raw`One pipe fills a tank in $3$ hours and another in $6$ hours. How many hours do they take together?`, answer: "2",
          solution: String.raw`Their rates are $\tfrac13$ and $\tfrac16$ of the tank per hour, which add to $\tfrac12$. So together they take $2$ hours.` },
        { q: String.raw`A car drives $60$ miles at $30$ mph and returns the same $60$ miles at $60$ mph. What is its average speed for the round trip, in mph?`, answer: "40",
          solution: String.raw`The legs take $2$ hours and $1$ hour. The total distance is $120$ miles in $3$ hours, an average of $40$ mph.` },
        { q: String.raw`Two trains $300$ miles apart travel toward each other at $70$ and $80$ mph. After how many hours do they meet?`, answer: "2",
          solution: String.raw`The gap closes at $70 + 80 = 150$ miles per hour, so it closes in $\tfrac{300}{150} = 2$ hours.` }
      ],
      problems: [
        "1985 AJHSME, Problem 13",
        "1995 AJHSME, Problem 11",
        "2023 AMC 10A, Problem 1",
        "2024 AMC 10A, Problem 8"
      ]
    },
    "L2.5": {
      prereq: ["linear-elimination"],
      cards: ["averages-to-totals", "weighted-average", "mean-median-mode", "averages-before-after"],
      body: String.raw`A mean describes a total shared equally among a specified number of items. Five scores with mean $12$ have the same total as five scores all equal to $12$, even if their actual values differ. The mean conceals individual details but preserves this total. Recovering that total lets us use the information without inventing the missing scores.

If one of those five scores is removed and the remaining four have mean $11$, the original total is $5\cdot12=60$ and the new total is $4\cdot11=44$. The removed score must be $16$. We do not need any of the other four scores. [[averages-to-totals|Turning averages into totals]] works because counts and totals record exactly what changes when entries are added, removed or replaced. In a [[averages-before-after|before-and-after average]] problem, write both totals before comparing them.

Combining groups requires the same bookkeeping. A class of $20$ students with mean $80$ contributes $1600$ score-points; a class of $30$ with mean $90$ contributes $2700$. Their combined mean is $4300/50=86$. Averaging the two means to get $85$ would give each class the same influence despite their different numbers of students. A [[weighted-average|weighted average]] counts each group in proportion to its size.

We can also understand $86$ as a balance point. Relative to $86$, each member of the first class contributes a deficit of $6$ points on average, totaling $120$; each member of the second contributes an excess of $4$, also totaling $120$. The deficits and excesses balance, putting the combined mean closer to the larger class's mean.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 150" role="img" aria-labelledby="l25-mean-title l25-mean-desc" style="width:100%;max-width:480px;height:auto"><title id="l25-mean-title">The combined mean balances the score deficits and excesses</title><desc id="l25-mean-desc">Twenty students averaging eighty have a combined deficit of one hundred twenty points relative to eighty-six. Thirty students averaging ninety have an equal excess of one hundred twenty points. The mean eighty-six is six units from eighty and four units from ninety.</desc><g stroke="currentColor" stroke-width="1.5" fill="none"><path d="M50 70H350M50 63V77M230 60V80M350 63V77"/></g><g fill="currentColor"><circle cx="230" cy="70" r="4"/><g font-size="15" text-anchor="middle"><text x="50" y="30">20 students</text><text x="350" y="30">30 students</text><text x="140" y="55">6 points</text><text x="290" y="55">4 points</text><text x="50" y="101">80</text><text x="230" y="101">86: mean</text><text x="350" y="101">90</text><text x="210" y="135">20 × 6 = 30 × 4</text></g></g></svg>

With positive group sizes, the combined mean lies between the group means. This is a useful check before calculating. The correct weights depend on what is being totaled: numbers of students for scores, compatible amounts for concentrations, and elapsed times for speeds. In the preceding lesson, the two-hour leg at $30$ mph and the one-hour leg at $60$ mph give $(2\cdot30+1\cdot60)/3=40$ mph. Weighting by the equal distances instead would repeat the original mistake.

The [[mean-median-mode|median]] answers a different question: where is the middle of the ordered list? Sorting $3,9,1,7,5,8$ gives $1,3,5,7,8,9$. With six entries there are two central positions, so the conventional median is the mean of their values, $(5+7)/2=6$. No entry need equal the median. The mode is any most frequent value, and the range is largest minus smallest. These summaries retain different features of the same data.

Changing the last $9$ to $90$ raises the mean but leaves the two central entries unchanged, so the median stays $6$. This is why an outlier can affect the mean more strongly. It is the order and the central positions that protect the median in this example; changing an entry enough to cross those positions could change it. First identify which statistic the question gives or requests, then use the total for a mean and the ordered positions for a median.`,
      related: [
        { card: "average-speed", note: String.raw`an average speed is total distance over total time, a weighted average (L2.4).` },
        { card: "expected-value", note: String.raw`the average outcome of a random experiment, a weighted average by probabilities.` }
      ],
      exercises: [
        { q: String.raw`Five numbers have average $12$. After one is removed, the other four have average $11$. Which number was removed?`, answer: "16",
          solution: String.raw`The five add to $60$ and the four add to $44$, so the removed number is $60 - 44 = 16$.` },
        { q: String.raw`A class of $20$ students averages $80$ on a test, and a class of $30$ averages $90$. What is the average of all $50$?`, answer: "86",
          solution: String.raw`The totals are $1600$ and $2700$, so the overall average is $\tfrac{4300}{50} = 86$.` },
        { q: String.raw`Find the median of $3, 9, 1, 7, 5, 8$.`, answer: "6",
          solution: String.raw`Sorted: $1, 3, 5, 7, 8, 9$. With six values the median is the average of the third and fourth, $\tfrac{5 + 7}{2} = 6$.` }
      ],
      problems: [
        "1987 AJHSME, Problem 16",
        "2023 AMC 10B, Problem 1",
        "2023 AMC 10A, Problem 10",
        "2025 AMC 10A, Problem 2"
      ]
    },
    "L2.6": {
      prereq: ["linear-elimination"],
      cards: ["age-problems", "scoring-rules", "break-even-plans", "round-up-whole-items"],
      body: String.raw`The final step in modeling is deciding which algebraic answers are possible in the situation. Ages move forward together, counts must be whole numbers, capacities impose inequalities, and a comparison of plans asks which expression is smaller on a range. Those restrictions are part of the model from the beginning, rather than repairs made after solving an equation.

In [[age-problems|an age problem]], attach every age to a time. If a son is $s$ and his father is $3s$ now, then ten years later they are $s+10$ and $3s+10$. Saying that the father will then be twice the son's age gives $3s+10=2(s+10)$, so $s=10$. The ratio changes from $3$ to $2$ while the age difference stays $20$. Writing $3(s+10)$ for the father's future age would assume that today's ratio remains fixed and would add thirty years to his age instead of ten.

A [[scoring-rules|scoring rule]] attaches an amount to each kind of response. For a $25$-question test with all questions answered, $c$ correct answers leave $25-c$ wrong answers. With four points gained for each correct response and one lost for each wrong response, the score is $4c-(25-c)=5c-25$. A score of $70$ gives $c=19$, verified by $76-6=70$. A score of $71$ would give $c=19.2$, showing that it is impossible under these rules. Rounding that value would change the score, so an integral restriction here is a test of feasibility, not an invitation to round.

If blank answers are allowed, the equation changes. With $w$ wrong and $b$ blank, we must record $c+w+b=25$ and apply the stated points for each category. We can no longer substitute $25-c$ for the wrong count unless $b=0$. The algebra must retain any choice the problem permits.

A price comparison asks for a relation between two expressions. With plans costing $20+5h$ and $10h$ dollars for $h\ge0$ hours, the difference, first minus second, is $20-5h$. It is zero at $h=4$, positive below four, and negative above four. This explains both the [[break-even-plans|break-even point]] and which plan is cheaper on each side. If hours are billed in whole started units, the price model must first be adjusted to that rule; a continuous linear expression would no longer describe every charge.

Capacity questions are inequalities. If each car can carry at most six of the $100$ people, the number of cars $n$ must satisfy $6n\ge100$, with $n$ a nonnegative integer. Sixteen cars hold only $96$ people, while seventeen hold $102$. Thus [[round-up-whole-items|rounding up to whole items]] gives the smallest feasible count, $17$. By contrast, asking how many full six-person groups can be made from $100$ people calls for rounding down: sixteen full groups with four people left over.

These examples share a method rather than a collection of formulas. Name a quantity with its unit and time, express the condition as an equation or inequality, solve it, and check its meaning. Distinguish a forbidden fractional count from a minimum whole-item capacity, and distinguish equality of two plans from the inequality that makes one preferable.`,
      related: [
        { card: "coins-and-prices", note: String.raw`whole-number solutions to price and coin equations.` },
        { card: "transforming-equations", note: String.raw`solving the equations these stories produce (L2.2).` }
      ],
      exercises: [
        { q: String.raw`A father is three times as old as his son. In ten years he will be twice as old as his son. How old is the son now?`, answer: "10",
          solution: String.raw`Now: son $s$, father $3s$. In ten years: $3s + 10 = 2(s + 10)$, so $s = 10$. Check: $30 + 10 = 40 = 2 \cdot 20$.` },
        { q: String.raw`A $25$-question test gives $4$ points for a right answer and takes $1$ point for a wrong one. A student answered every question and scored $70$. How many were right?`, answer: "19",
          solution: String.raw`With $c$ right, $4c - (25 - c) = 70$, so $5c = 95$ and $c = 19$. Check: $76 - 6 = 70$.` },
        { q: String.raw`One plan costs $\$20$ plus $\$5$ per hour, another $\$10$ per hour. After how many hours do they cost the same?`, answer: "4",
          solution: String.raw`Set $20 + 5h = 10h$: $h = 4$, when both cost $\$40$.` },
        { q: String.raw`How many cars, each carrying at most $6$ people, are needed for $100$ people?`, answer: "17",
          solution: String.raw`Since $\tfrac{100}{6} \approx 16.7$, $16$ cars hold only $96$ people, so $17$ cars are needed.` }
      ],
      problems: [
        "1995 AJHSME, Problem 2",
        "1990 AJHSME, Problem 13",
        "1987 AJHSME, Problem 24",
        "2001 AMC 8, Problem 22"
      ]
    },
    "L2.7": {
      prereq: ["transforming-equations", "linear-elimination", "add-all-equations", "assume-all-one-kind", "work-rates", "average-speed", "relative-motion", "averages-to-totals", "weighted-average", "round-up-whole-items"],
      cards: [],
      body: String.raw`An equation is a condition on allowed values. [[transforming-equations|Reversible transformations]] preserve exactly those values; squaring may introduce extra candidates, and division by a variable expression may lose a zero case. Record restrictions before manipulating, and check proposed answers in the original statement. A check can reject an extraneous answer, but it cannot discover a solution discarded during division.

A system combines several conditions. [[linear-elimination|Elimination]] and substitution preserve their joint information when the retained equations allow the step to be reversed. Repeated counts suggest [[add-all-equations|adding equations]]; a common baseline suggests [[assume-all-one-kind|assuming all objects are of one kind]]. An identity after elimination signals redundant information, while a contradiction signals incompatible conditions.

Rates and averages both become clearer through totals. [[work-rates|Simultaneous work]] adds amounts over a common interval; changing stages require their own times and amounts. [[average-speed|Average speed]] is the distance total divided by the elapsed-time total, and [[relative-motion|relative speed]] measures change in a separation. [[averages-to-totals|Recovering a total from a mean]] also explains [[weighted-average|group weights]] and before-and-after changes.

The story determines the final restrictions. Age differences persist while ratios may change. A score may rule out a fractional count entirely. A [[round-up-whole-items|minimum capacity]] requires the smallest whole number that satisfies an inequality, while a number of full groups may require rounding down. The review problems ask you to choose these representations without being told which lesson to use. The next chapter studies quadratic equations, where two distinct solutions can arise naturally.`,
      strategies: [
        String.raw`Do the same thing to both sides, and check every answer in the original equation.`,
        String.raw`After squaring or clearing a denominator, test each candidate against the domain.`,
        String.raw`For a system, look for an addition or subtraction that cancels an unknown; if the equations are symmetric, add them all.`,
        String.raw`For two kinds of objects, assume all are of one kind and count the difference.`,
        String.raw`Write every rate as an amount per unit of time; add rates of work, and find average speed from total distance and total time.`,
        String.raw`Turn every average into a total.`,
        String.raw`In age problems, write all ages at one time in terms of one unknown.`,
        String.raw`When the answer must be a whole number, round in the direction the story requires and check the count.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Solve $\dfrac x3 + \dfrac x4 = 14$.`, answer: "24",
        solution: String.raw`Multiply both sides by $12$: $4x + 3x = 168$, so $7x = 168$ and $x = 24$. Check: $8 + 6 = 14$.` },
      { q: String.raw`If $x + y = 5$, $y + z = 7$ and $x + z = 8$, find $z$.`, answer: "5",
        solution: String.raw`Adding all three: $2(x + y + z) = 20$, so $x + y + z = 10$. Subtract $x + y = 5$: $z = 5$.` },
      { q: String.raw`A cyclist rides $4$ miles uphill at $12$ mph and $4$ miles back down at $24$ mph. What is the average speed, in mph?`, answer: "16",
        solution: String.raw`The legs take $\tfrac{4}{12} = \tfrac13$ hour and $\tfrac{4}{24} = \tfrac16$ hour, together $\tfrac12$ hour for $8$ miles. The average speed is $16$ mph.` },
      { q: String.raw`Ann can paint a fence in $4$ days and Bo in $12$ days. How many days do they take together?`, answer: "3",
        solution: String.raw`Their rates add: $\tfrac14 + \tfrac1{12} = \tfrac{4}{12} = \tfrac13$ of the fence per day, so together they take $3$ days.` },
      { q: String.raw`Ten numbers average $20$. One of them is changed from $15$ to $35$. What is the new average?`, answer: "22",
        solution: String.raw`The total was $200$ and rises by $20$ to $220$, so the new average is $22$.` },
      { q: String.raw`Twenty coins, all nickels or dimes, are worth $\$1.40$. How many are dimes?`, answer: "8",
        solution: String.raw`If all were nickels they would be worth $100$ cents. Each dime in place of a nickel adds $5$ cents, and $140 - 100 = 40$ cents are missing, so there are $8$ dimes.` },
      { q: String.raw`In five years Ann will be twice as old as she was seven years ago. How old is she now?`, answer: "19",
        solution: String.raw`With Ann's age $a$: $a + 5 = 2(a - 7)$, so $a + 5 = 2a - 14$ and $a = 19$. Check: $24 = 2 \cdot 12$.` }
    ],
    problems: [
      "2025 AMC 10A, Problem 1",
      "1999 AMC 8, Problem 17",
      "2023 AMC 10B, Problem 5"
    ]
  },
  challenge: {
    problems: [
      "2002 AMC 10A, Problem 16",
      "2004 AMC 10A, Problem 17",
      "2002 AMC 12B, Problem 19",
      "2023 AMC 12B, Problem 18"
    ]
  }
};
