// Learn, AMC Algebra, chapter L2: equations and word problems (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L2"] = {
  lessons: {
    "L2.1": {
      prereq: [],
      cards: [],
      body: String.raw`This chapter solves equations and the word problems that lead to them. Its tools are the rules for solving one equation and checking the answer, the methods for systems of several equations, and the standard ways to turn rates, averages and other stories into equations.

To solve an equation is to find the values of the unknown that make it true. Doing the same operation to both sides keeps it true, so $3x - 7 = 11$ becomes $3x = 18$ and then $x = 6$. Some operations, such as squaring both sides or multiplying by an expression that can be $0$, can add false solutions, which is why every answer is checked in the original equation.

When there are two unknowns, two equations are needed. Adding or subtracting the equations eliminates one unknown: from $x + y = 10$ and $x - y = 4$, adding gives $2x = 14$, so $x = 7$ and $y = 3$.

Many word problems follow a few patterns. Distance is rate times time, and rates of work add when people work together. An average times the number of items is the total, so the average of four numbers being $15$ means they add to $60$, and adding $25$ makes the average $\tfrac{85}{5} = 17$. Ages, scores and prices are translated in the same way.

The lessons take these ideas in turn: solving and checking one equation (L2.2), systems of linear equations (L2.3), rates and work (L2.4), averages (L2.5), and setting up a story (L2.6). The Summary (L2.7) collects the strategies.`,
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
      body: String.raw`Solving an equation means finding every number that makes it true, and nothing else. For $5(x - 2) = 3x + 4$ the steps are routine. But for $\sqrt{2x + 3} = x$ or $\tfrac{x^2 - 4}{x - 2} = 5$, the natural steps can add a value that does not work or hide one that is not allowed, and the answer is wrong unless it is checked.

[[transforming-equations|Transforming an equation]] means doing the same thing to both sides. Adding or subtracting the same number, and multiplying or dividing by the same nonzero number, give an equation with exactly the same solutions. So $5(x - 2) = 3x + 4$ becomes $5x - 10 = 3x + 4$, then $2x = 14$, then $x = 7$; each step can be undone, so nothing is gained or lost. Collect the unknown on one side and the numbers on the other, and expand brackets first.

Two operations are not reversible. Squaring both sides can add solutions, because a negative number and its opposite have the same square: from $\sqrt{2x + 3} = x$, squaring gives $x^2 - 2x - 3 = 0$, so $x = 3$ or $x = -1$, but $\sqrt{1} = 1 \ne -1$, so only $x = 3$ solves the original. Multiplying by an expression that can be $0$, or cancelling one, can do the same: $\tfrac{x^2 - 4}{x - 2} = 5$ simplifies to $x + 2 = 5$, so $x = 3$, but if the simplified equation had given $x = 2$, that value would be excluded, because the original fraction is undefined there. Dividing both sides by an expression that can be $0$ loses solutions instead.

So keep track of the domain, the values the unknown may take: no division by $0$, no square root of a negative number. Every candidate is checked in the original equation, not in a later line, since a later line may have gained a solution.

Use these steps on every equation in the book, and check whenever you have squared, multiplied by an expression, or divided by one. The next lesson solves several equations together.`,
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
      body: String.raw`Many problems give several facts about several unknowns at once. Two numbers have sum $8$ and difference $2$; three friends' weights in pairs are given; twenty animals, chickens and cows, have $56$ legs. Each fact is an equation, and the unknowns are found by combining the equations so that all but one unknown cancel.

A system of linear equations is a set of equations in which each unknown appears only to the first power, such as $2x + 3y = 12$ and $x - y = 1$. [[linear-elimination|Elimination]] multiplies the equations by numbers and adds them so that one unknown cancels: three times the second equation is $3x - 3y = 3$, and adding it to the first gives $5x = 15$, so $x = 3$ and then $y = 2$. Substitution does the same in another order: solve one equation for one unknown, $x = y + 1$, and put that into the other. In general $n$ unknowns need $n$ independent equations.

When the equations are symmetric, [[add-all-equations|adding all of them]] is often fastest. From $a + b = 8$, $b + c = 10$ and $a + c = 12$, adding gives $2(a + b + c) = 30$, so $a + b + c = 15$; subtracting each original equation then gives each unknown, $b = 15 - 12 = 3$. The same trick works when each equation leaves out one unknown.

For problems with two kinds of objects, [[assume-all-one-kind|assume they are all of one kind]] and count the shortfall. If all $20$ animals were chickens they would have $40$ legs, $16$ fewer than $56$; each cow adds $2$ legs, so there are $8$ cows. This is elimination done in words, and it is often quicker than writing the system.

Write each fact as an equation, count the unknowns and the equations, and look for an addition or subtraction that cancels before you substitute. The next lesson applies systems to rates.`,
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
      body: String.raw`Rate problems ask how far, how fast, how long, or how much work gets done. A pipe fills a tank in $3$ hours and another in $6$; how long do they take together? A car drives $60$ miles at $30$ mph and returns at $60$ mph; what is its average speed? Two trains $300$ miles apart approach at $70$ and $80$ mph; when do they meet? One relation, amount equals rate times time, answers all of them.

A rate is an amount per unit of time: $30$ miles per hour, or one tank per $3$ hours, that is $\tfrac13$ of a tank per hour. Distance equals speed times time, and work equals rate times time. When several people or machines work at the same time, [[work-rates|their rates add]]: the two pipes fill $\tfrac13 + \tfrac16 = \tfrac12$ of the tank per hour, so together they take $2$ hours. Write each rate as a fraction of the job per unit of time, add, and invert.

When a trip has several legs at different speeds, find [[time-per-leg|the time for each leg]], distance divided by speed, and add. [[average-speed|Average speed]] is total distance over total time, not the average of the speeds: the round trip of $120$ miles takes $2 + 1 = 3$ hours, so the average speed is $40$ mph, not $45$.

[[relative-motion|Relative motion]] puts the observer on one of the moving objects. Two objects approaching each other close the gap at the sum of their speeds, so the trains meet after $\tfrac{300}{70 + 80} = 2$ hours; objects moving the same way close at the difference. When [[several-rates|several rates]] change during a problem, such as workers who join later or a car that changes speed, make a table with one row per stage and add the amounts.

Write every rate with its units, as an amount per hour or per minute, and add times or amounts, never speeds, unless two objects move toward each other. The next lesson turns to averages.`,
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
      body: String.raw`Averages appear in test scores, mixtures and data sets. Five numbers average $12$, and after one is removed the other four average $11$; which was removed? A class of $20$ averages $80$ and a class of $30$ averages $90$; what is the overall average? What is the median of $3, 9, 1, 7, 5, 8$? The key in each is to turn the average back into a total.

The mean, or average, of a list is its total divided by the number of items. So [[averages-to-totals|the total is the average times the count]], and statements about averages become statements about totals, which can be added and subtracted. Five numbers averaging $12$ add to $60$; four averaging $11$ add to $44$; the removed number is $60 - 44 = 16$. This is the standard move whenever items are added to or removed from a list, the [[averages-before-after|before-and-after average]] problem.

When groups of different sizes are combined, the overall mean is not the average of the group means but [[weighted-average|a weighted average]]: each group's mean counts in proportion to its size. The two classes have totals $1600$ and $2700$, so the overall mean is $\tfrac{4300}{50} = 86$, closer to $90$ because that class is larger. Mixtures, such as solutions of different concentrations, work the same way.

[[mean-median-mode|The median]] is the middle value when the list is sorted, or the average of the two middle values when the list has an even number of items: sorted, the list above is $1, 3, 5, 7, 8, 9$, with median $\tfrac{5 + 7}{2} = 6$. The mode is the most frequent value, and the range is the largest minus the smallest. Changing the largest value changes the mean but not the median.

Whenever an average appears, write the total; for groups, weight by size; for a median, sort first. The next lesson sets up other kinds of stories.`,
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
      body: String.raw`Some stories recur so often that they have a standard setup. A father is three times his son's age and in ten years will be twice it; how old is the son? A test gives $4$ points for a right answer and takes $1$ away for a wrong one; how many were right? Two phone plans charge differently; when do they cost the same? How many cars carrying $6$ people are needed for $100$ people? Each is one or two equations, plus a detail that is easy to miss.

In [[age-problems|age problems]], everyone ages at the same rate, so write every age at one time in terms of one unknown and shift all of them together: with the son $s$ and the father $3s$ now, in ten years they are $s + 10$ and $3s + 10$, and $3s + 10 = 2(s + 10)$ gives $s = 10$.

[[scoring-rules|Scoring problems]] give points per answer: with $c$ right answers out of $25$, all answered, the score is $4c - (25 - c) = 5c - 25$, so a score of $70$ means $c = 19$. The answers must be whole numbers and the counts must fit the total, which often decides between possibilities.

[[break-even-plans|Break-even problems]] compare two costs that grow differently: a plan costing $20 + 5h$ and one costing $10h$ are equal when $20 + 5h = 10h$, at $h = 4$; below that the second is cheaper, above it the first.

Last, when a quantity must be a whole number, [[round-up-whole-items|round in the direction the story needs]]: $100$ people in cars of $6$ need $\lceil 100/6 \rceil = 17$ cars, since $16$ cars hold only $96$ people. Postage charged per started ounce and boxes that must be full are rounded the same way.

Set up the story with one unknown, write the condition, and finish by checking that the answer is a whole number in the right range. The Summary (L2.7) collects the chapter's strategies.`,
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
      body: String.raw`[[transforming-equations|An equation is solved]] by doing the same thing to both sides; squaring, or multiplying by an expression that can be $0$, can add solutions, so every answer is checked in the original equation and against the domain.

A system is solved by [[linear-elimination|elimination]] or substitution, by [[add-all-equations|adding all the equations]] when they are symmetric, or, for two kinds of objects, by [[assume-all-one-kind|assuming they are all of one kind]].

Amount is rate times time. [[work-rates|Work rates add]], [[average-speed|average speed]] is total distance over total time, and [[relative-motion|approaching objects]] close the gap at the sum of their speeds.

[[averages-to-totals|An average times the count is the total]], combined groups give [[weighted-average|a weighted average]], and the median is found after sorting. Ages shift together, scores and prices give equations whose answers must be whole numbers, and quantities of whole items are [[round-up-whole-items|rounded the way the story needs]].`,
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
