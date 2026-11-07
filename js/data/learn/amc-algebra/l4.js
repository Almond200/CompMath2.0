// Learn, AMC Algebra, chapter L4: functions, graphs, absolute values and floors (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L4"] = {
  lessons: {
    "L4.1": {
      prereq: ["transforming-equations"],
      cards: [],
      body: String.raw`A function describes how an output depends on an input. Its formula is one description of that dependence; a table and a graph are others. Moving between them lets us see features that a formula alone can hide, such as repeated outputs, a boundary where a rule changes, or a value that is never reached.

For $f(x)=2x+1$, the input $3$ produces $7$. If we use that output as a new input, the result is $f(7)=15$. This is composition: the second application acts on the result of the first, not on the original input again. The graph records both calculations as points, $(3,7)$ and $(7,15)$, each connecting an input with its output.

A function may use more than one formula while still giving exactly one output for every allowed input. Absolute value returns a distance, so it keeps nonnegative inputs and reverses the sign of negative ones. The floor returns the greatest integer not exceeding its input, so it is constant across an interval and jumps at the next integer. Their graphs look different because they retain different information about the input.

Solving the equation $f(x)=c$ asks which inputs give one specified output. An inverse, when it exists, reverses that assignment. A graph shows the same question through the intersections with the horizontal line of height $c$.

The chapter develops these connections in order. We begin with rules, composition, inverses and symmetry; learn to interpret axes and slopes; then use distance to understand absolute values. Solution counting brings the algebra and graphs together. Finally, floors and ceilings introduce rules whose endpoint conventions are essential to finding the correct intervals.`,
      exercises: [
        { q: String.raw`If $f(x) = 2x + 1$, find $f(f(3))$.`, answer: "15",
          solution: String.raw`Work from the inside: $f(3) = 7$, then $f(7) = 15$.` },
        { q: String.raw`Find $|-7| - |3 - 10|$.`, answer: "0",
          solution: String.raw`Both are distances from $0$: $|-7| = 7$ and $|3 - 10| = |-7| = 7$. The difference is $0$.` },
        { q: String.raw`Find $\lfloor 3.7 \rfloor + \lfloor -3.7 \rfloor$.`, answer: "-1",
          solution: String.raw`$\lfloor 3.7 \rfloor = 3$, and the greatest integer at most $-3.7$ is $-4$. The sum is $-1$.` }
      ],
      problems: [
        "2003 AMC 10A, Problem 6",
        "2022 AMC 10A, Problem 6",
        "2003 AMC 10B, Problem 7"
      ]
    },
    "L4.2": {
      prereq: ["transforming-equations"],
      cards: ["defined-operation", "inverse-function-properties", "odd-even-functions"],
      body: String.raw`A function must specify both a rule and which inputs are allowed. The notation $f(x)$ means the output assigned to $x$, not a product of $f$ and $x$. Different inputs may have the same output, but one input cannot be assigned two different outputs. For $f(x)=1/(x-2)$, the input $2$ is excluded because the rule would require division by zero. That exclusion is part of the function, not merely an exception encountered during a calculation.

Composition uses the output of one rule as the input of another. If $g(x)=x^2$ and $f(x)=3x-4$, then $f(g(2))=f(4)=8$, while $g(f(2))=g(2)=4$. The order matters because the operations are performed on different intermediate values. We must also check that the intermediate output belongs to the domain of the outer function. If an inner rule produces $2$, the function $1/(x-2)$ cannot be applied to it.

A [[defined-operation|newly defined operation]] follows the same principle with two inputs. If $a\star b=2a-b$, the symbols mean exactly this rule. Thus $(3\star4)\star5=2\star5=-1$, while $3\star(4\star5)=3\star3=3$. The different answers show why parentheses cannot be moved casually. Likewise, $3\star4=2$ and $4\star3=5$, so swapping the inputs changes the result. Familiar notation does not transfer the properties of addition or multiplication to a newly defined operation.

To reverse a function, we ask which input produced a given output. For $f(x)=(x+1)/(x-2)$, finding $f^{-1}(3)$ means solving $(x+1)/(x-2)=3$. This gives $x+1=3x-6$, so $x=7/2$, which is allowed and produces $3$. [[inverse-function-properties|An inverse function]] records these reversed assignments. Its superscript $-1$ does not mean the reciprocal $1/f(x)$.

Reversal gives a function only when each output in the original range came from one input. The rule $x^2$ on all real numbers fails this test: output $4$ came from both $2$ and $-2$. Restricting the domain to $x\ge0$ removes that ambiguity, and the inverse on nonnegative outputs is $\sqrt{x}$. Reflecting the graph in $y=x$ swaps the input and output coordinates, which explains both the picture of an inverse and the need for uniqueness.

Symmetry relates inputs without reversing the whole function. On a domain symmetric about zero, an even function satisfies $f(-x)=f(x)$, so its graph is mirrored across the vertical axis. An odd function satisfies $f(-x)=-f(x)$, so a half-turn about the origin preserves its graph. The powers $x^2$ and $x^3$ give examples, but [[odd-even-functions|odd and even symmetry]] concern the rule on its whole domain, not the parity of a single input or output.

If $f$ is odd and $g(x)=f(x)+3$, then $g(x)+g(-x)=6$: the opposite values of $f$ cancel and the two constant terms remain. With $g(2)=8$, this gives $g(-2)=-2$. The shifted function $g$ is generally not odd; its useful symmetry is now around the height $3$. Before calculating individual values, inspect what a rule, its domain, or a stated symmetry already tells you.`,
      related: [
        { card: "functional-substitution", note: String.raw`equations that a function must satisfy for all inputs (L11.2).` },
        { card: "fx-pairing", note: String.raw`pairing $f(x)$ with $f(c - x)$ to sum many values (L11.2).` }
      ],
      exercises: [
        { q: String.raw`Let $a \star b = 2a - b$. Find $(3 \star 4) \star 5$.`, answer: "-1",
          solution: String.raw`Inside first: $3 \star 4 = 6 - 4 = 2$. Then $2 \star 5 = 4 - 5 = -1$.` },
        { q: String.raw`Let $f(x) = \dfrac{x + 1}{x - 2}$. Find $f^{-1}(3)$.`, answer: "7/2",
          solution: String.raw`Solve $f(x) = 3$: $x + 1 = 3(x - 2)$, so $2x = 7$ and $x = \tfrac72$. Check: $\tfrac{9/2}{3/2} = 3$.` },
        { q: String.raw`A function $f$ is odd, and $g(x) = f(x) + 3$. If $g(2) = 8$, find $g(-2)$.`, answer: "-2",
          solution: String.raw`From $g(2) = 8$, $f(2) = 5$, so $f(-2) = -5$ and $g(-2) = -5 + 3 = -2$.` }
      ],
      problems: [
        "2004 AMC 12B, Problem 13",
        "2003 AMC 12B, Problem 20",
        "2003 AMC 10B, Problem 13",
        "2011 AMC 10B, Problem 15",
        "2023 AMC 12B, Problem 12"
      ]
    },
    "L4.3": {
      prereq: [],
      cards: ["reading-graphs", "slope-to-a-point"],
      body: String.raw`A graph records how quantities vary together. Its horizontal and vertical coordinates must be read with their units and scales. The same rising segment could describe a traveler moving away, a price increasing with quantity, or a running total of points. Interpreting the axes comes before interpreting the slope.

Start by locating the scale marks and the starting value. An axis need not begin at zero, and one grid square need not represent one unit. Then decide whether each plotted height is an amount or a change. If daily changes are $3,-1,4$ and the initial score is $10$, the successive scores are $13,12,16$. Averaging the three changes would describe a different quantity from averaging those scores. [[reading-graphs|Reading a graph]] includes reconstructing the quantity requested when the picture records something else.

A straight segment encodes a constant rate of change. Between $(1,2)$ and $(4,11)$, the horizontal change is $3$ and the vertical change is $9$, giving slope $9/3=3$. Reversing the order of both points changes both signs, leaving the ratio unchanged. A vertical line has zero horizontal change, so this ratio is undefined; it is not a line with slope zero. A horizontal line, whose vertical change is zero, does have slope zero.

The units of a slope are vertical units divided by horizontal units. On a graph of cumulative distance against time, $60$ miles accumulated over $1.5$ hours gives average speed $40$ mph. A straight segment indicates constant speed during that interval, while a flat segment records no additional distance. Cumulative distance cannot decrease. On a position-time graph, however, a negative slope can represent movement back toward the starting point. Distance traveled and signed position are different quantities, even when both axes are labeled in miles.

A line between two points on a curved graph gives an average rate over that interval. It does not assert that the same rate held throughout. In particular, the slope from the origin to a point means output divided by input only when that origin represents the intended baseline. A cost graph with a fixed initial fee can have an average cost per unit different from its rate of increase for each extra unit.

For packages of different sizes, the average price per ounce at a point $(x,y)$ is $y/x$, where $x>0$ is the number of ounces and $y$ is the package price. This is the [[slope-to-a-point|slope from the origin]]. The packages $(4,6)$, $(5,9)$ and $(8,10)$ have unit prices $3/2$, $9/5$ and $5/4$ dollars per ounce. The last is cheapest even though its total price is largest. A lower plotted height alone would answer the wrong question.

Slope comparisons by eye are useful when the quantities use the same axes and scale. Changing a graph's aspect ratio changes the visible steepness, and comparing separate charts without checking their scales can reverse an impression. Translate what you need into a coordinate difference or a ratio first; then use the picture to organize the comparison.`,
      related: [
        { card: "line-forms", note: String.raw`the equation of a line from its slope and a point.` },
        { card: "average-speed", note: String.raw`total distance over total time, the slope from the start to the end of a trip (L2.4).` }
      ],
      exercises: [
        { q: String.raw`Find the slope of the line through $(1, 2)$ and $(4, 11)$.`, answer: "3",
          solution: String.raw`The rise is $11 - 2 = 9$ and the run is $4 - 1 = 3$, so the slope is $3$.` },
        { q: String.raw`A distance-time graph shows a cyclist $60$ miles from the start after $1.5$ hours, moving at a steady speed from the start. What is the speed, in mph?`, answer: "40",
          solution: String.raw`The speed is the slope: $\tfrac{60}{1.5} = 40$ miles per hour.` },
        { q: String.raw`Three packages cost $\$6$ for $4$ ounces, $\$9$ for $5$ ounces and $\$10$ for $8$ ounces. Which is the cheapest per ounce, by its cost per ounce in dollars?`, answer: "5/4",
          solution: String.raw`The costs per ounce, the slopes from the origin, are $\tfrac64 = 1.5$, $\tfrac95 = 1.8$ and $\tfrac{10}{8} = 1.25$. The third is cheapest, at $\tfrac54$ dollars per ounce.` }
      ],
      problems: [
        "2022 AMC 8, Problem 15",
        "2020 AMC 8, Problem 11",
        "2024 AMC 10A, Problem 12"
      ]
    },
    "L4.4": {
      prereq: ["transforming-equations"],
      cards: ["absolute-value-rules", "abs-value-relations", "absolute-value-identities", "sign-chart", "abs-value-graphing"],
      body: String.raw`Absolute value measures distance from zero. The expression $|x-a|$ therefore measures the distance between the variable point $x$ and the fixed point $a$ on the number line. This interpretation gives equations and inequalities a geometric meaning before any cases are written.

For example, $|x-1|\lt3$ asks for points less than three units from $1$. They lie strictly between $-2$ and $4$, so the allowed integers are $-1,0,1,2,3$. Replacing the strict inequality by $\le$ would include both endpoints. The related equation $|x-1|=3$ asks only for the two endpoints. A negative requested distance would have no solution.

Algebraically, [[absolute-value-rules|absolute value]] keeps a nonnegative quantity and negates a negative one. Thus $|2x-3|=7$ means $2x-3=7$ or $2x-3=-7$, giving $x=5$ and $x=-2$. The two cases are possible signs of the expression inside the bars, rather than permission to attach unrelated signs to every term. In particular, $|a+b|$ cannot usually be replaced by $|a|+|b|$.

Consider adding movements on the number line. If $a$ and $b$ have the same sign, their lengths add in one direction. If their signs differ, part of one movement cancels the other. This explains $|a+b|\le|a|+|b|$, with equality precisely when $a,b$ have the same sign or one is zero. Such [[absolute-value-identities|absolute-value identities]] encode when distances add without cancellation. They also explain $\sqrt{a^2}=|a|$: squaring removes the sign, and the principal square root returns a nonnegative length.

For several absolute values, split the number line where their insides vanish. In $|x-1|+|x+1|$, the transition points are $-1$ and $1$. Between them, the two distances add to the fixed separation $2$; to the right both contribute in the positive direction, giving $2x$; to the left they give $-2x$. The [[abs-value-graphing|graph]] is a horizontal segment joined to two rising arms. Every branch follows directly from the signs on its interval.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" role="img" aria-labelledby="l44-distance-title l44-distance-desc" style="width:100%;max-width:500px;height:auto"><title id="l44-distance-title">A sum of distances has a flat minimum</title><desc id="l44-distance-desc">The graph y equals absolute x minus one plus absolute x plus one. It is flat at two between minus one and one. A horizontal line at height three intersects the outer arms at minus one point five and one point five.</desc><g stroke="currentColor" fill="none"><path d="M40 260H440M240 280V35" opacity="0.5"/><path d="M60 68 L180 196 L300 196 L420 68" stroke-width="2.5"/><path d="M40 164H440" stroke-dasharray="5 5" opacity="0.65"/></g><g fill="currentColor"><circle cx="150" cy="164" r="4"/><circle cx="330" cy="164" r="4"/><g font-size="15" text-anchor="middle"><text x="240" y="22">y = |x − 1| + |x + 1|</text><text x="400" y="154">y = 3</text><text x="150" y="188">−1.5</text><text x="330" y="188">1.5</text><text x="180" y="283">−1</text><text x="300" y="283">1</text><text x="228" y="202">2</text><text x="452" y="265">x</text><text x="225" y="45">y</text></g></g></svg>

An equation such as $|x-1|+|x+1|=3$ consequently has solutions $x=3/2$ and $x=-3/2$, one on each outer branch. Setting the sum equal to $2$ instead gives every point of the whole interval $[-1,1]$, so an equation need not have a finite list of solutions. When solving a branch algebraically, always retain its interval condition; a branch formula can otherwise produce an answer outside the region where it is valid.

Signs also organize products. A [[sign-chart|sign chart]] for $(x-1)(x-3)(x+2)$ splits at $-2,1,3$. Far to the right all factors are positive. Moving left across each simple root changes exactly one factor's sign, so the negative intervals are $x\lt-2$ and $1\lt x\lt3$. At a repeated factor such as $(x-1)^2$, the sign does not change across its zero: two sign changes cancel. Check the multiplicities rather than automatically alternating at every marked point.

In two dimensions, [[abs-value-relations|an absolute-value relation]] can be built from its first-quadrant part. The condition $|x|+|y|\le3$ becomes $x+y\le3$ there. Reflecting that triangle into the other quadrants gives the square with vertices $(3,0),(0,3),(-3,0),(0,-3)$. Reflection supplies the complete region because changing either coordinate's sign leaves the original condition unchanged. The next lesson uses graphs to count solutions while keeping these branch and boundary conditions explicit.`,
      related: [
        { card: "median-minimizes-abs", note: String.raw`a sum of distances on the number line is smallest at a median (L8.4).` },
        { card: "piecewise-graph-counting", note: String.raw`counting solutions where piecewise graphs cross (L4.5).` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the solutions of $|2x - 3| = 7$.`, answer: "3",
          solution: String.raw`Either $2x - 3 = 7$, so $x = 5$, or $2x - 3 = -7$, so $x = -2$. The sum is $3$.` },
        { q: String.raw`How many integers satisfy $|x - 1| \lt 3$?`, answer: "5",
          solution: String.raw`The condition says $x$ is less than $3$ from $1$: $-2 \lt x \lt 4$. The integers are $-1, 0, 1, 2, 3$, five of them.` },
        { q: String.raw`For how many integers $x$ from $-5$ to $5$ is $(x - 1)(x - 3)(x + 2) \lt 0$?`, answer: "4",
          solution: String.raw`The factors change sign at $-2$, $1$, $3$. Testing one point in each interval, the product is negative for $x \lt -2$ and for $1 \lt x \lt 3$. The integers are $-5, -4, -3$ and $2$: four.` },
        { q: String.raw`Find the area enclosed by $y = |x|$ and $y = 4$.`, answer: "16",
          solution: String.raw`The V meets the line at $(\pm 4, 4)$, enclosing a triangle with base $8$ and height $4$: area $16$.` }
      ],
      problems: [
        "2023 AMC 12A, Problem 10",
        "2011 AMC 10B, Problem 19",
        "2023 AMC 10B, Problem 12",
        "2023 AMC 10B, Problem 13",
        "2011 AMC 12A, Problem 18"
      ]
    },
    "L4.5": {
      prereq: ["abs-value-graphing", "reading-graphs"],
      cards: ["piecewise-graph-counting"],
      body: String.raw`The equation $f(x)=g(x)$ asks for inputs where the two rules have equal outputs. Each such input gives an intersection of their graphs. An intersection may cross, touch, or belong to a shared interval, so counting only visible crossings can miss solutions. A sketch organizes the possibilities; an exact count requires a reason that no other intersection is hidden between sampled points or beyond the drawn window.

For $|x|=x^2-2$, the graph suggests two symmetric intersections. To establish the count, let $t=|x|\ge0$. Since $x^2=t^2$, the equation becomes $t^2-t-2=0$, or $(t-2)(t+1)=0$. The condition $t\ge0$ rejects $-1$, leaving $t=2$ and hence $x=\pm2$. The symmetry reduced the problem, and the algebra proves that there are no other solutions.

The distance sum from the preceding lesson illustrates why endpoints and flat pieces matter. For $|x-1|+|x+1|=c$, the left side has minimum $2$, attained throughout $[-1,1]$. Therefore $c\lt2$ gives no solution, $c=2$ gives an entire interval, and $c\gt2$ gives one solution on each outer branch. The branch ranges establish these three cases of [[piecewise-graph-counting|solution counting]].

A harder example is $x^2=2^x$. For negative $x$, the left side strictly decreases as $x$ moves toward zero, while the right side strictly increases. At $x=-1$ the left side is greater, and at zero it is smaller. Continuity gives one intersection between these inputs, and the opposite monotonicity prevents another negative intersection. Zero itself is not a solution.

For positive $x$, taking the positive square root gives the equivalent equation $x=2^{x/2}$. The exponential is strictly convex: over equal horizontal steps its successive rises increase, because the outputs multiply by the same factor greater than one. Subtracting the straight line $y=x$ preserves this strict convexity. A strictly convex function cannot have three zeroes: at the middle one its value would have to be strictly below the chord joining the outer two zeroes. Since $x=2$ and $x=4$ are both solutions, they are the only positive ones. Together with the negative solution, this establishes a total of three. Comparing a few plotted values alone would not establish that total.

For a composition, work backward through the outputs. Suppose the graph is $f(x)=|x|$ and we ask for $f(f(x))=2$. First solve $f(y)=2$, giving candidate intermediate outputs $y=2$ and $y=-2$. Then ask which can actually be produced by the inner function: $|x|$ can equal $2$ at $x=\pm2$, but it can never equal $-2$. There are two solutions, not four. In general, count preimages of each admissible intermediate output, rather than multiplying the number of branches automatically.

When counting graph intersections, identify the domain, the breakpoints, and the output range on each branch. Treat touching points and endpoints explicitly. Then use monotonicity, exact branch formulas, symmetry, or another justified bound to rule out missing intersections. A picture is most useful when it reveals which of those arguments to make.`,
      related: [
        { card: "vertex-form", note: String.raw`where a parabola lies relative to a line (L3.4).` },
        { card: "inverse-function-properties", note: String.raw`solving $f(x) = y$ for each needed $y$ (L4.2).` }
      ],
      exercises: [
        { q: String.raw`How many real solutions does $|x| = x^2 - 2$ have?`, answer: "2",
          solution: String.raw`With $t = |x| \ge 0$, $t^2 - t - 2 = (t - 2)(t + 1) = 0$, so $t = 2$ and $x = \pm 2$. On a graph, the V meets the parabola twice.` },
        { q: String.raw`How many real solutions does $x^2 = 2^x$ have?`, answer: "3",
          solution: String.raw`For $x\lt0$, $x^2$ strictly decreases as $x$ increases while $2^x$ strictly increases. The difference is positive at $-1$ and negative at $0$, so continuity and monotonicity give exactly one negative solution. For $x\gt0$, the equation is equivalent to $2^{x/2}-x=0$. This function is strictly convex, so it has at most two zeroes: a third would lie strictly below the chord joining the outer two. Its known zeroes are $2$ and $4$, so these are the only positive solutions. Zero is not a solution. The total is three.` },
        { q: String.raw`How many real solutions does $|x - 1| + |x + 1| = 3$ have?`, answer: "2",
          solution: String.raw`The left side is $2$ for $-1 \le x \le 1$, $2x$ for $x \gt 1$ and $-2x$ for $x \lt -1$. It equals $3$ at $x = \tfrac32$ and $x = -\tfrac32$: two solutions.` }
      ],
      problems: [
        "2002 AMC 12A, Problem 19",
        "2020 AMC 12A, Problem 9",
        "2021 Spring AMC 12B, Problem 13",
        "2012 AMC 12A, Problem 25"
      ]
    },
    "L4.6": {
      prereq: [],
      cards: ["floor-basics", "name-the-floor", "group-equal-floors", "floor-equation", "floor-sum-range"],
      body: String.raw`The floor function replaces a real input by the integer at the left end of its unit interval. Precisely, $\lfloor x\rfloor=n$ means that $n$ is an integer and $n\le x\lt n+1$. The left endpoint is included and the right is excluded, so every real number belongs to exactly one such interval. This convention controls equations and counts involving floors.

For positive inputs, floor resembles dropping the decimal part, but that description fails for negative inputs. The number $-2.5$ lies between $-3$ and $-2$, so its floor is $-3$. The [[floor-basics|ceiling]] is instead the least integer greater than or equal to the input, so $\lceil-2.5\rceil=-2$. The fractional part, defined by $\{x\}=x-\lfloor x\rfloor$, is always in $[0,1)$; even for $x=-2.5$ it is $0.5$, not $-0.5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 310" role="img" aria-labelledby="l46-floor-title l46-floor-desc" style="width:100%;max-width:500px;height:auto"><title id="l46-floor-title">Floor steps include the left endpoint and exclude the right</title><desc id="l46-floor-desc">The floor function is constant at n on the interval from n inclusive to n plus one exclusive. Filled endpoints give the value at each integer; hollow endpoints are excluded. In particular the floor of minus one half is minus one.</desc><path d="M48 185H465M220 290V35" stroke="currentColor" opacity="0.4" fill="none"/><path d="M80 275H150" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="80" cy="275" r="4" fill="currentColor"/><circle cx="150" cy="275" r="5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><path d="M150 230H220" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="150" cy="230" r="4" fill="currentColor"/><circle cx="220" cy="230" r="5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><path d="M220 185H290" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="220" cy="185" r="4" fill="currentColor"/><circle cx="290" cy="185" r="5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><path d="M290 140H360" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="290" cy="140" r="4" fill="currentColor"/><circle cx="360" cy="140" r="5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><path d="M360 95H430" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="360" cy="95" r="4" fill="currentColor"/><circle cx="430" cy="95" r="5" fill="var(--bg)" stroke="currentColor" stroke-width="1.5"/><circle cx="430" cy="50" r="4" fill="currentColor"/><g fill="currentColor" font-size="15" text-anchor="middle"><text x="260" y="22">y = floor(x)</text><text x="80" y="209">-2</text><text x="150" y="209">-1</text><text x="290" y="209">1</text><text x="360" y="209">2</text><text x="430" y="209">3</text><text x="201" y="280">−2</text><text x="201" y="145">1</text><text x="201" y="100">2</text><text x="476" y="190">x</text><text x="205" y="45">y</text></g></svg>

The graph stays at height $n$ from $n$ through inputs just below $n+1$, then jumps. At the integer itself the new step supplies the value. The filled and hollow endpoints in the diagram distinguish actual graph points from limiting positions. Treating both endpoints as included would give two different outputs at one input.

To use this interval information in algebra, [[name-the-floor|name the floor]]. In $\lfloor x\rfloor+x=8.5$, let $n=\lfloor x\rfloor$. The equation gives $x=8.5-n$, and the floor condition becomes $n\le8.5-n\lt n+1$. Thus $7.5\lt2n\le8.5$, or $3.75\lt n\le4.25$. The only integer possibility is $n=4$, giving $x=4.5$. This method finds the integer first and then verifies the interval, instead of treating the floor as an ordinary variable with no restrictions. The same structure applies to more complicated [[floor-equation|floor equations]].

Counting can often be done directly from the defining inequalities. The condition $\lfloor\sqrt{x}\rfloor=4$ means $4\le\sqrt{x}\lt5$, hence $16\le x\lt25$. Its integer inputs are $16$ through $24$, nine values. The square root requires $x\ge0$, which these inequalities already ensure. For positive integers $n,k$, the multiples of $k$ from $1$ through $n$ number $\lfloor n/k\rfloor$ because their positive integer multipliers are precisely the integers at most $n/k$.

A long floor sum can often be shortened by [[group-equal-floors|grouping equal values]]. In the sum of $\lfloor k/3\rfloor$ for $k=1$ through $30$, the value $m$ occurs at $k=3m,3m+1,3m+2$. Complete three-term groups occur for $m=1$ through $9$. The initial two terms have value zero, and the final term has value $10$. Thus the sum is $3(1+\cdots+9)+10=145$. Accounting separately for those incomplete end groups prevents an off-by-one error.

To find the [[floor-sum-range|range of a floor expression]], watch its jump points and the intervals between them. For example, if $x$ is an integer, $\lfloor x\rfloor+\lfloor-x\rfloor=0$. Otherwise write $x=n+f$ with $0\lt f\lt1$. Then $-x=-n-1+(1-f)$, so the sum of floors is $n+(-n-1)=-1$. A property that holds between jump points need not hold at the jumps themselves. Keep the endpoint convention visible throughout the reasoning.`,
      related: [
        { card: "legendres-formula", note: String.raw`a sum of floors that counts the factors of a prime in $n!$.` },
        { card: "round-up-whole-items", note: String.raw`ceilings in word problems, such as the number of boxes needed (L2.6).` }
      ],
      exercises: [
        { q: String.raw`Solve $\lfloor x \rfloor + x = 8.5$.`, answer: "4.5",
          solution: String.raw`Write $x = n + f$ with $n = \lfloor x \rfloor$ and $0 \le f \lt 1$. Then $2n + f = 8.5$, so $f = 0.5$ and $n = 4$: $x = 4.5$. Check: $4 + 4.5 = 8.5$.` },
        { q: String.raw`Find $\sum_{k=1}^{30} \left\lfloor \dfrac k3 \right\rfloor$.`, answer: "145",
          solution: String.raw`The floor is $m$ for the three values $k = 3m, 3m + 1, 3m + 2$ when $1 \le m \le 9$, it is $0$ for $k = 1, 2$, and $10$ for $k = 30$. The sum is $3(1 + \cdots + 9) + 10 = 135 + 10 = 145$.` },
        { q: String.raw`How many integers $x$ have $\lfloor \sqrt x \rfloor = 4$?`, answer: "9",
          solution: String.raw`We need $4 \le \sqrt x \lt 5$, that is, $16 \le x \lt 25$: the integers $16$ to $24$, nine of them.` }
      ],
      problems: [
        "2019 AMC 10B, Problem 9",
        "2011 AMC 12A, Problem 19",
        "2025 AMC 10B, Problem 18",
        "2021 Fall AMC 10A, Problem 16",
        "2002 AMC 10A, Problem 22"
      ]
    },
    "L4.7": {
      prereq: ["defined-operation", "inverse-function-properties", "odd-even-functions", "reading-graphs", "slope-to-a-point", "absolute-value-rules", "sign-chart", "abs-value-graphing", "piecewise-graph-counting", "name-the-floor", "group-equal-floors"],
      cards: [],
      body: String.raw`A function connects each allowed input to one output. [[defined-operation|A defined operation]] must be read from its rule, with the order of inputs and parentheses preserved. [[inverse-function-properties|An inverse]] reverses input-output pairs only when those pairs give unique reversed outputs on the chosen domains. [[odd-even-functions|Symmetry]] instead relates inputs such as $x$ and $-x$, often eliminating calculations through cancellation.

A graph expresses the same dependence in coordinates. [[reading-graphs|Read its axes, units and scale]] before interpreting a segment. A slope between two points measures an average change per horizontal unit, while [[slope-to-a-point|a slope from the origin]] expresses a ratio to that baseline. Position, cumulative distance, totals and changes can have different interpretations even when their curves look similar.

[[absolute-value-rules|Absolute value]] makes distance calculations into branch calculations. Breakpoints determine the valid formulas, a [[sign-chart|sign chart]] tracks changes of sign, and [[abs-value-graphing|graphs of absolute values]] show corners, flat intervals and symmetry. [[piecewise-graph-counting|Counting solutions]] then requires tracking all intersections, including tangencies, endpoints and shared intervals, with a reason that no others occur.

[[name-the-floor|Naming a floor]] retains its defining integer and interval conditions. The half-open interval convention controls negative inputs and exact boundaries, while [[group-equal-floors|grouping equal floor values]] turns many long sums into counts of constant blocks. The review problems combine these viewpoints: choose a description that preserves the domain and makes the needed feature visible before beginning a calculation.`,
      strategies: [
        String.raw`Apply a defined operation exactly as written, innermost first, and do not assume it is commutative.`,
        String.raw`For a value of an inverse, solve $f(x) = y$.`,
        String.raw`Look for an odd part of a function that cancels in $f(x) + f(-x)$.`,
        String.raw`Read a graph's axes and units first; turn every rate into a slope.`,
        String.raw`Split absolute values at the points where their insides vanish, and keep only the solutions in each piece.`,
        String.raw`For where a product is positive or negative, make a sign chart.`,
        String.raw`To count solutions, locate graph intersections, including touches and shared intervals, then justify that none are missing.`,
        String.raw`For a floor, set $n = \lfloor x \rfloor$ with $n \le x \lt n + 1$, and solve for the integer $n$ first.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Let $f(x) = 3x - 4$ and $g(x) = x^2$. Find $f(g(2)) - g(f(2))$.`, answer: "4",
        solution: String.raw`$f(g(2)) = f(4) = 8$ and $g(f(2)) = g(2) = 4$. The difference is $4$.` },
      { q: String.raw`Find the sum of the solutions of $|x + 2| + |x - 4| = 10$.`, answer: "2",
        solution: String.raw`Between $-2$ and $4$ the left side is $6$. For $x \gt 4$ it is $2x - 2 = 10$, so $x = 6$; for $x \lt -2$ it is $-2x + 2 = 10$, so $x = -4$. The sum is $2$.` },
      { q: String.raw`Find $\lfloor 2.5 \rfloor \cdot \lfloor -2.5 \rfloor$.`, answer: "-6",
        solution: String.raw`$\lfloor 2.5 \rfloor = 2$ and $\lfloor -2.5 \rfloor = -3$, so the product is $-6$.` },
      { q: String.raw`For how many nonnegative integers $n$ is $\lfloor \tfrac n2 \rfloor = \lfloor \tfrac n3 \rfloor$?`, answer: "3",
        solution: String.raw`Since $\lfloor \tfrac n2 \rfloor \ge \tfrac{n - 1}{2}$ and $\lfloor \tfrac n3 \rfloor \le \tfrac n3$, the difference of the floors is at least $\tfrac{n - 1}{2} - \tfrac n3 = \tfrac{n - 3}{6}$, which is positive for $n \gt 3$. So only $n = 0, 1, 2, 3$ can work; checking them, $n = 0, 1, 3$ do and $n = 2$ does not ($1 \ne 0$). There are $3$.` },
      { q: String.raw`Let $f(x) = x^3 + 1$. Find $f^{-1}(28)$.`, answer: "3",
        solution: String.raw`Solve $x^3 + 1 = 28$: $x^3 = 27$, so $x = 3$.` },
      { q: String.raw`Find the area of the region $|x| + |y| \le 2$.`, answer: "8",
        solution: String.raw`It is a square with corners $(\pm 2, 0)$ and $(0, \pm 2)$, whose diagonals have length $4$. Its area is $\tfrac{4 \cdot 4}{2} = 8$.` },
      { q: String.raw`An even function $f$ has $f(x) = x^2 - 4x$ for $x \ge 0$. Find $f(-3)$.`, answer: "-3",
        solution: String.raw`Since $f$ is even, $f(-3) = f(3) = 9 - 12 = -3$.` }
    ],
    problems: [
      "2022 AMC 12A, Problem 5",
      "2016 AMC 10B, Problem 14"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 10B, Problem 22",
      "2003 AMC 12B, Problem 24",
      "2010 AMC 12A, Problem 24",
      "2025 AMC 12A, Problem 25"
    ]
  }
};
