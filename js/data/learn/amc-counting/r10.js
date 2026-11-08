// Learn, AMC Counting & Probability, chapter R10: from the AMC to the AIME (CONVENTIONS §14). Part: Toward the AIME.
// Capstone: complete case splits, multiplicities, boundary-state proofs and mixed probability models. No new cards.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R10"] = {
  lessons: {
    "R10.1": {
      prereq: ["permutations-combinations", "casework-method", "basic-probability"],
      cards: [],
      body: String.raw`A mixed problem can hide a familiar structure behind an unfamiliar description. The first task is to define the objects or outcomes precisely enough that a count or probability has an unambiguous meaning. The final task is to check that the quantity calculated is the one requested: a count, a reduced fraction, a sum of its numerator and denominator, or a remainder can be different outputs of the same calculation.

Suppose a deck contains $n\ge3$ distinct cards, and the number of three-card hands is twice the number of two-card hands. Hands are unordered subsets, so the equation is $\binom n3=2\binom n2$. Since $\binom n2$ is positive in this domain, divide to get $(n-2)/3=2$, hence $n=8$. Substitution checks both counts: $56=2\cdot28$. The domain justifies the cancellation; without a size restriction, a deck of one card would make both original counts zero.

For two different cards chosen uniformly from one through nine, an even sum requires two odd or two even values. There are $\binom52+\binom42=16$ favorable pairs out of $\binom92=36$. The probability is $4/9$, but a question asking for the numerator plus denominator in lowest terms requires thirteen. Giving fifty-two from the unreduced fraction would answer a different question.

Geometry can alter what a selection represents. Six distinct points on a circle give a triangle for every three-element subset, since a line meets the circle in at most two points. The count is $\binom63=20$. If points were on the sides of a triangle instead, collinear triples would have to be removed. The binomial coefficient counts subsets first; the conditions decide whether those subsets are valid objects.

The chapter brings these checks together: exhaustive cases, multiplicities of constructions, double counting, small-case tests and recognition of mixed models. It introduces no additional reference cards. Existing methods must be connected to the actual objects, and their assumptions checked before a formula is used.`,
      exercises: [
        { q: String.raw`A deck has $n\ge3$ different cards. The number of $3$-card hands is twice the number of $2$-card hands. Find $n$.`, answer: "8",
          solution: String.raw`The unordered hand counts give $\binom n3=2\binom n2$. The assumption $n\ge3$ makes $\binom n2>0$, so cancellation is legitimate. Their ratio is $(n-2)/3$, giving $n=8$. Substitution verifies $\binom83=56$ and $2\binom82=2\cdot28=56$. If smaller decks had been allowed, zero counts would have required separate treatment before division.` },
        { q: String.raw`Two different cards are drawn uniformly at random from cards numbered $1$ to $9$. The probability that their sum is even is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "13",
          solution: String.raw`Uniform selection without replacement makes the $\binom92=36$ unordered pairs equally likely. An even sum comes from two of the five odd values or two of the four even values, giving $\binom52+\binom42=10+6=16$ favorable pairs. The reduced probability is $16/36=4/9$. The requested output is therefore $m+n=4+9=13$, rather than the sum from the unreduced fraction.` },
        { q: String.raw`How many triangles have all three vertices among $6$ distinct points on a circle?`, answer: "20",
          solution: String.raw`A straight line meets a circle in at most two distinct points, so no three of the six points are collinear. Every three-element subset therefore gives a nondegenerate triangle, and its vertices recover the subset uniquely. There are $\binom63=20$ triangles; ordering their vertices would add unnecessary multiplicity.` }
      ],
      problems: [
        "2005 AIME II, Problem 1",
        "2017 AIME I, Problem 1",
        "2015 AIME I, Problem 2"
      ]
    },
    "R10.2": {
      prereq: ["casework-method", "organized-listing", "double-counting", "complementary-counting"],
      cards: [],
      body: String.raw`A case split supports addition only when each object belongs to exactly one case. For positive integers below one thousand with at most two distinct digits, length gives disjoint cases. All nine one-digit and ninety two-digit numbers qualify. Among the nine hundred three-digit numbers, $9\cdot9\cdot8=648$ have three distinct digits: nine choices for a nonzero first digit, nine different second digits including zero, and eight third digits different from both. The [[complementary-counting|complement]] therefore leaves $900-648=252$ three-digit numbers, for total $9+90+252=351$.

An independent split checks the three-digit count. Repdigits contribute nine. A pair of distinct nonzero digits can be chosen in $\binom92=36$ ways, and gives $2^3-2=6$ strings using both digits. A pair $\{0,d\}$ has nine choices of $d$, must lead with $d$, and gives $2^2-1=3$ strings using zero at least once. Thus $9+36\cdot6+9\cdot3=252$ again. Here the digit pair is recovered uniquely from a finished number using exactly two digits, so the cases do not count it twice.

A construction can instead count histories rather than finished objects. For a five-card hand with exactly two pairs, choosing a first pair rank and then a second orders ranks that the hand itself does not order. Every valid hand has exactly two such rank orders. Avoid that duplicate description by choosing the pair ranks together: $\binom{13}{2}=78$ ways. Each rank chooses two of four suits, giving $\binom42^2=36$ possibilities. The fifth card has any of the eleven other ranks and four suits, giving forty-four choices. The product is $78\cdot36\cdot44=123552$.

To justify dividing an overcount, take an arbitrary finished object and count all the histories producing it. The multiplicity must be the same for every object. Inspecting one example can reveal a problem, but does not establish uniformity. If multiplicities vary, a single division is generally invalid.

For example, build a nonempty subset of $\{A,B,C\}$ by choosing a distinguished member and then any subset of the other two elements. There are $3\cdot4=12$ histories, but only seven finished subsets. A singleton has one history, a pair two, and the triple three. Dividing twelve by three would incorrectly give four. Keeping the distinguished member as part of the object gives a legitimate different count, $1\binom31+2\binom32+3\binom33=12$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 285" role="img" aria-label="Unequal multiplicities of subset constructions" style="width:100%;max-width:520px;height:auto"><title>Unequal multiplicities of subset constructions</title><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="25">A distinguished member gives unequal multiplicities.</text><text x="85" y="75">Subset size</text><text x="260" y="75">Finished subsets</text><text x="435" y="75">Histories</text><text x="85" y="120">1</text><text x="260" y="120">3</text><text x="435" y="120">3</text><text x="85" y="165">2</text><text x="260" y="165">3</text><text x="435" y="165">6</text><text x="85" y="210">3</text><text x="260" y="210">1</text><text x="435" y="210">3</text><text x="260" y="260">Seven subsets, twelve histories; unequal multiplicities.</text></g></svg>

[[double-counting|Double counting]] deliberately gives two descriptions of one set. If each of twelve students joins exactly three clubs, and every club has four members, count incidences $(\text{student},\text{club})$ with membership. By students there are $12\cdot3=36$; by clubs there are $4c$. Therefore $c=9$. This determines the count assuming such a membership arrangement exists; the degree totals alone are not a general existence theorem for arbitrary membership restrictions.

Intersections require another distinction between objects and descriptions. For $n$ nonparallel lines, unordered pairs of lines number $\binom n2$. A point where $r$ lines concur accounts for $\binom r2$ of those pairs, not one. Counting intersection points directly and counting line pairs are equal only when every meeting involves two lines. Defining the counted incidences first prevents losing the multiplicity at a multiple intersection.

[[casework-method|Casework]] and [[organized-listing|organized lists]] are strongest when the split has a clear inverse: the completed object tells us which case and which choices produced it. If cases overlap, use a proved correction such as inclusion-exclusion; if the descriptions have variable multiplicity, change the objects or split them into classes where the multiplicity is known.`,
      related: [
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is built (R3.5).` },
        { card: "pie", note: String.raw`correcting cases that overlap (R3.5).` },
        { card: "handshake-lemma", note: String.raw`a double count of the ends of edges (R7.3).` }
      ],
      exercises: [
        { q: String.raw`How many positive integers less than $1000$ have at most two different digits?`, answer: "351",
          solution: String.raw`Split by length. All nine one-digit and ninety two-digit numbers qualify. There are nine hundred three-digit numbers. Those with three distinct digits have nine choices for the nonzero first digit, nine for a different second digit, and eight for a third different from both, giving $648$. Thus $252$ three-digit numbers qualify, and the total is $9+90+252=351$. Length cases are disjoint, so this addition has neither overlap nor a missing case.` },
        { q: String.raw`How many five-card hands from a standard deck have exactly two pairs (two cards of one rank, two of another, and a fifth card of a third rank)?`, answer: "123552",
          solution: String.raw`A completed hand determines its two pair ranks as an unordered set, so choose them in $\binom{13}{2}=78$ ways. For each pair choose two of four suits, giving $\binom42^2=36$ choices. The remaining card has any of eleven other ranks and four suits, giving forty-four choices. These data reconstruct exactly one hand, so the product is $78\cdot36\cdot44=123552$. Ordering the pair ranks instead would describe every hand twice.` },
        { q: String.raw`Each of $12$ students belongs to exactly $3$ clubs, and each club has exactly $4$ members. How many clubs are there?`, answer: "9",
          solution: String.raw`Count the incidence set of memberships, each a pair consisting of a student and a club that student joins. Counting by students gives $12\cdot3=36$ incidences. Counting by clubs gives four incidences per club, so $4c=36$ and $c=9$. The equality uses the same incidence set in both counts; it is not a count of pairs of students or of overlaps between clubs.` }
      ],
      problems: [
        "2001 AIME II, Problem 1",
        "2003 AIME I, Problem 3",
        "2004 AIME II, Problem 4",
        "2012 AIME II, Problem 3",
        "2023 AIME I, Problem 3",
        "2009 AIME II, Problem 6"
      ]
    },
    "R10.3": {
      prereq: ["recursive-counting", "organized-listing"],
      cards: [],
      body: String.raw`Small instances can reject a formula, expose missing states, or supply initial values. They cannot establish a general formula by agreement alone. A useful test compares the proposed model against a separately generated list, including empty objects, the smallest feasible size and the first sizes at which restrictions overlap.

Join every pair of $n$ distinct points on a circle by a straight chord, with no three chords concurrent inside the disk. For one through five points the region counts are $1,2,4,8,16$. To derive the general count, insert chords one at a time. A chord with $r$ distinct interior crossings is cut into $r+1$ segments, and each segment splits one existing region, so it adds $r+1$ regions.

There are $\binom n2$ chords, and every pair crossing is counted once when the later chord is inserted. A crossing corresponds to four circle vertices: their convex quadrilateral has exactly one crossing pair of diagonals. The no-three-concurrent assumption makes distinct crossing pairs distinct points for this count. Thus the total is

$$1+\binom n2+\binom n4.$$

This counts the entire disk, including regions between polygon edges and circle arcs. At six points it gives $1+15+15=31$, disproving the powers-of-two extrapolation. If three chords meet at one point, a newly added chord sees one intersection point there rather than two; counting crossing pairs would then overstate the number of new segments.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 295" role="img" aria-label="The six-point chord pattern does not double" style="width:100%;max-width:520px;height:auto"><title>The six-point chord pattern does not double</title><circle cx="260" cy="128" r="85" stroke="currentColor" fill="none" stroke-width="1.2"/><g stroke="currentColor" stroke-width=".9" opacity=".6"><path d="M252.592 43.323L329.628 79.246"/><path d="M252.592 43.323L343.709 142.760"/><path d="M252.592 43.323L289.072 207.874"/><path d="M252.592 43.323L205.363 193.114"/><path d="M252.592 43.323L175.323 120.592"/><path d="M329.628 79.246L343.709 142.760"/><path d="M329.628 79.246L289.072 207.874"/><path d="M329.628 79.246L205.363 193.114"/><path d="M329.628 79.246L175.323 120.592"/><path d="M343.709 142.760L289.072 207.874"/><path d="M343.709 142.760L205.363 193.114"/><path d="M343.709 142.760L175.323 120.592"/><path d="M289.072 207.874L205.363 193.114"/><path d="M289.072 207.874L175.323 120.592"/><path d="M205.363 193.114L175.323 120.592"/></g><g fill="currentColor" font-size="16" text-anchor="middle"><text x="251.110" y="31.388">1</text><text x="343.554" y="74.495">2</text><text x="360.450" y="150.712">3</text><text x="294.886" y="228.849">4</text><text x="194.436" y="211.137">5</text><text x="158.388" y="124.110">6</text><text x="260" y="268">Six generic circle points give 31 disk regions, not 32.</text></g></svg>

A recurrence needs the same kind of structural justification. Let $t_n$ count domino tilings of a $3\times n$ rectangle. Odd widths give zero by area parity; $t_0=1$ counts the empty tiling. Let $g_n$ count a $3\times n$ rectangle with its upper-right corner cell removed. Reflection gives the same count when the lower-right corner is missing. Directly, $t_2=3$, $g_1=1$ and $g_2=0$.

Inspect a full rectangle's last column. If it has a vertical domino, the third cell uses a horizontal domino and leaves a rectangle of width $n-1$ missing a corner; there are two reflected cases. If there is no vertical domino, all three cells end in horizontal dominoes and leave a full rectangle of width $n-2$. Appending those end pieces reverses each construction, establishing bijections. Thus for $n\ge2$,

$$t_n=t_{n-2}+2g_{n-1}.$$

For the corner-missing board with $n\ge3$, the two cells in its last column are either covered together vertically, leaving a full width-$n-1$ board, or both covered horizontally. In the latter case the upper cell in the preceding column is forced into another horizontal domino, leaving the same corner-missing shape of width $n-2$. Hence $g_n=t_{n-1}+g_{n-2}$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" role="img" aria-label="Reversible endings of a corner-missing three-row board" style="width:100%;max-width:520px;height:auto"><title>Reversible endings of a corner-missing three-row board</title><g stroke="currentColor" stroke-width="1.1"><rect x="45" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="73" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="101" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="129" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="45" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="73" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="101" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="129" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="157" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="45" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="73" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="101" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="129" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="157" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="330" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="358" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="386" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="414" y="65" width="28" height="28" fill="none" opacity=".35"/><rect x="330" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="358" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="386" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="414" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="442" y="93" width="28" height="28" fill="none" opacity=".35"/><rect x="330" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="358" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="386" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="414" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="442" y="121" width="28" height="28" fill="none" opacity=".35"/><rect x="157" y="93" width="28" height="56" fill="currentColor" fill-opacity=".18"/><rect x="414" y="93" width="56" height="28" fill="currentColor" fill-opacity=".18"/><rect x="414" y="121" width="56" height="28" fill="currentColor" fill-opacity=".1"/><rect x="386" y="65" width="56" height="28" fill="currentColor" fill-opacity=".18"/></g><g fill="currentColor" text-anchor="middle" font-size="16"><text x="115" y="25">Vertical ending</text><text x="400" y="25">Forced horizontal ending</text><text x="171" y="85">×</text><text x="456" y="85">×</text><text x="115" y="190">Leaves a full width-four board</text><text x="400" y="190">Leaves a width-three notch</text><text x="260" y="235">For a width-five notch: g₅ = t₄ + g₃ = 11 + 4 = 15.</text></g></svg>

For even $n\ge4$, substitute the latter equation into the former to get $t_n=3t_{n-2}+2g_{n-3}$. The earlier full-board equation gives $2g_{n-3}=t_{n-2}-t_{n-4}$, so

$$t_n=4t_{n-2}-t_{n-4}.$$

Now $t_4=4\cdot3-1=11$ and $t_6=4\cdot11-3=41$ follow from a decomposition, not a fit to two data points. The auxiliary shape carries the boundary information missing from a single total. This is the [[recursive-counting|recurrence method]] even though eliminating the auxiliary count introduces a subtraction.

For binary strings avoiding $111$, a simpler end decomposition suffices. At length $n\ge3$, classify valid strings by the number of trailing ones: zero, one or two. They end in $0$, $01$ or $011$, after any valid string of the remaining length. Appending these endings is safe because each starts with zero. With $a_0=1,a_1=2,a_2=4$, the recurrence $a_n=a_{n-1}+a_{n-2}+a_{n-3}$ gives $a_{10}=504$. Initial values and the recurrence's valid range prevent the short all-ones strings from being lost.

When a small-case test fails, the failure can identify the missing condition: a leading zero, an empty construction, a forbidden overlap, a boundary state or a nonuniform multiplicity. After a repair, the test is useful evidence, but the general justification still comes from the reversible construction or a complete argument.`,
      related: [
        { card: "tiling-a-board", note: String.raw`tilings counted by how they end (R5.2).` },
        { card: "bijection-method", note: String.raw`the reason behind a count, as a matching (R4.5).` },
        { card: "restricted-sequences", note: String.raw`strings with a forbidden pattern, counted by states.` }
      ],
      exercises: [
        { q: String.raw`Six points on a circle are joined by all $15$ chords, and no three chords meet at one point inside. Into how many regions do the chords cut the disk?`, answer: "31",
          solution: String.raw`Insert the fifteen chords one at a time. A new chord crossing $r$ previous chords at distinct interior points has $r+1$ segments and adds $r+1$ disk regions. Each crossing pair corresponds to four of the six circle vertices, so there are $\binom64=15$ crossings, counted once at insertion of the later chord. Starting with one disk region gives $1+15+15=31$. The no-three-concurrent assumption is needed to identify crossing pairs with distinct cut points.` },
        { q: String.raw`How many strings of $10$ digits, each $0$ or $1$, have no three $1$'s in a row?`, answer: "504",
          solution: String.raw`For length $n\ge3$, a valid string has zero, one or two trailing ones, so its ending is $0$, $01$ or $011$. Removing that ending leaves an arbitrary valid shorter string; appending it is safe across the join because it begins with zero. Thus $a_n=a_{n-1}+a_{n-2}+a_{n-3}$. Listing the short cases gives $a_0=1,a_1=2,a_2=4$. The next eight values are $7,13,24,44,81,149,274,504$, so $a_{10}=504$.` },
        { q: String.raw`A $3 \times n$ board can be tiled by dominoes in $3$ ways when $n = 2$ and in $11$ ways when $n = 4$, and the counts satisfy $t_n = 4t_{n-2} - t_{n-4}$, with $t_0 = 1$. How many tilings does a $3 \times 6$ board have?`, answer: "41",
          solution: String.raw`The given recurrence applies at even widths at least four. Its initial check is $t_4=4t_2-t_0=4\cdot3-1=11$. Then $t_6=4t_4-t_2=4\cdot11-3=41$. The lesson derives this recurrence with an auxiliary corner-missing state; the initial numerical agreement alone would not prove it for later widths.` }
      ],
      problems: [
        "2007 AIME II, Problem 6",
        "2007 AIME I, Problem 6",
        "2008 AIME I, Problem 11",
        "2015 AIME II, Problem 10"
      ]
    },
    "R10.4": {
      prereq: ["permutations-combinations", "non-adjacent-selection", "partitions", "basic-probability", "complementary-counting"],
      cards: [],
      body: String.raw`Choosing a method starts with the outcome model. A probability is a ratio of counts only when its elementary outcomes are equally likely. An unordered subset may be an efficient model for uniform selection without replacement; an ordered history may be necessary for a process whose probabilities change with earlier choices. Changing descriptions is valid only after accounting for their multiplicities or weights.

For three distinct numbers chosen uniformly from one through ten, write the sorted values as $a\lt b\lt c$ with each gap at least two. The [[non-adjacent-selection|non-adjacent-selection shift]] maps them to $a\lt b-1\lt c-2$ in $\{1,\ldots,8\}$. Conversely, adding zero, one and two to an increasing triple from that set restores valid gaps. Thus there are $\binom83=56$ favorable subsets among $\binom{10}{3}=120$, giving probability $7/15$. The inverse verifies both completeness and uniqueness.

Strict inequalities can also control a small [[partitions|partition count]]. For $a+b+c=12$ with $1\le a\lt b\lt c$, the minimum possible total for fixed $a$ is $a+(a+1)+(a+2)=3a+3$, so $a\le3$. With $a=1$, the allowed $b$ values are two through five; with $a=2$, they are three and four; with $a=3$, only four. The total is seven. The upper bound on $a$ proves the list exhaustive instead of stopping it by guesswork.

Restrictions often combine. For four independent fair four-sided dice totaling twelve, each face value lies from one to four. Shift each down by one, leaving four nonnegative coordinates totaling eight, each capped at three. The unrestricted count is $\binom{11}{3}=165$. A specified coordinate at least four leaves four units, giving $\binom73=35$ violations; two specified violations leave zero, giving one. Three are impossible. Inclusion-exclusion yields $165-4\cdot35+\binom42=31$ favorable ordered outcomes. Dividing by $4^4=256$ gives $31/256$, and the reduced numerator-plus-denominator answer is $287$.

The [[complementary-counting|complement]] can simplify a probability without a long case split. For two independent fair dice, the product is odd exactly when both faces are odd. That event has probability $(1/2)^2=1/4$, so the even-product probability is $3/4$. If the dice were biased, the odd-face probabilities would have to be computed from their weights; the favorable count alone would not determine the result.

Equivalence classes need particular care in probabilities. Color each vertex of a square black or white independently with equal chances, then describe the coloring only up to rotation. The six rotation classes are not equally likely: an adjacent pair of black vertices has four labeled versions, while an opposite pair has two. Exactly two black vertices therefore has probability $6/16=3/8$, not two favorable classes divided by six classes. Burnside counts classes, while the original random experiment assigns weights to their labeled members.

A process may combine a recurrence with a complement. For a shared sequence of four independent fair tosses, ask whether $HH$ appears by the fourth toss. Avoiding it is the binary-string restriction of R5. Its counts from lengths zero through four are $1,2,3,5,8$, so the probability of seeing it is $1-8/16=1/2$. The expected waiting time of six from R9 is a different quantity and does not answer this fixed-horizon question.

These examples link recognition to proof: identify which choices define one object, transform restrictions reversibly, charge overlaps correctly and retain the experiment's weights. A second count or an independently generated small case can catch a mistake, but the final argument must explain why the model accounts for all allowed outcomes.`,
      related: [
        { card: "balls-boxes-table", note: String.raw`the four cases of different or identical objects and boxes (R4.2).` },
        { card: "inclusion-exclusion", note: String.raw`conditions that overlap (R3.5).` },
        { card: "states-recursion-prob", note: String.raw`probabilities of a process with states (R9.3).` }
      ],
      exercises: [
        { q: String.raw`Three different numbers are chosen uniformly at random from $1$ to $10$. The probability that no two of them are consecutive is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "22",
          solution: String.raw`Sort the chosen numbers as $a\lt b\lt c$. The nonconsecutive restriction gives gaps at least two. Subtract zero, one and two to obtain any increasing triple from one through eight; adding the same offsets reverses the map and restores the bounds. There are $\binom83=56$ favorable subsets among $\binom{10}{3}=120$ equally likely subsets. Reduce $56/120$ to $7/15$, then return the requested sum $7+15=22$.` },
        { q: String.raw`In how many ways can $12$ be written as $a + b + c$ with positive integers $a \lt b \lt c$?`, answer: "7",
          solution: String.raw`For fixed smallest part $a$, the total is at least $a+(a+1)+(a+2)=3a+3$, so $a\le3$. If $a=1$, the choices of $b$ are two, three, four and five, with $c=11-b$; if $a=2$, they are three and four, with $c=10-b$; if $a=3$, only four works, with $c=5$. These disjoint cases give $4+2+1=7$. The bound on $a$ proves the list exhaustive.` },
        { q: String.raw`Two fair dice are rolled independently. What is the probability that the product of the numbers is even?`, answer: "3/4",
          solution: String.raw`A product of integers is odd exactly when every factor is odd. Each fair die is odd with probability $1/2$, and the rolls are independent, so the odd-product probability is $1/4$. Its complement is therefore $3/4$. Alternatively, of the thirty-six equally likely ordered face pairs, nine have two odd faces and the other twenty-seven have even product.` }
      ],
      problems: [
        "2023 AIME I, Problem 1",
        "2014 AIME I, Problem 2",
        "2016 AIME II, Problem 2",
        "2012 AIME I, Problem 3",
        "2021 AIME I, Problem 4",
        "2020 AIME I, Problem 5",
        "2019 AIME II, Problem 5"
      ]
    },
    "R10.5": {
      prereq: ["casework-method", "organized-listing", "double-counting", "recursive-counting"],
      cards: [],
      body: String.raw`A finished solution specifies the objects or elementary outcomes, checks the hypotheses of its counting or probability model, and ends with the requested quantity. A ratio of combination counts can be simplified only when the canceled factor is nonzero. A numerator-plus-denominator answer uses a reduced fraction.

[[casework-method|Cases]] must be exhaustive and disjoint for direct addition. Construction histories need a multiplicity check: a common multiplicity permits division, while a varying multiplicity requires a different correction or description. [[double-counting|Double counting]] counts one precisely defined incidence set in two ways; a multiple intersection may represent several pairs even when it is one geometric point.

[[organized-listing|Small cases]] test boundaries and suggest useful states, but a pattern is not a proof. The chord-region example breaks the powers-of-two pattern at six points. The three-row tiling recurrence is established using a corner-missing boundary state, not guessed from the first two nonzero values. [[recursive-counting|Recurrences]] need valid ranges and justified initial values.

In mixed problems, a shift, a partition bound, inclusion-exclusion, symmetry, a weighted probability or a state recurrence may work together. Uniform labeled outcomes need not induce uniform symmetry classes, and a fixed-time event is different from an expected wait. Checking those distinctions is part of the mathematical argument, not merely a final numerical test.`,
      strategies: [
        String.raw`Check that every object is in exactly one case.`,
        String.raw`Count the histories producing an arbitrary finished object; divide only after proving their multiplicity is uniform.`,
        String.raw`Count one set two ways and set the counts equal.`,
        String.raw`Work out the smallest cases by hand before writing a formula, and test the formula on them.`,
        String.raw`Do not trust a pattern from small cases until it is explained.`,
        String.raw`For a probability, choose one model of the outcomes and keep it for both counts.`,
        String.raw`Reduce the fraction before giving $m + n$.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many four-digit numbers have digits that strictly increase from left to right?`, answer: "126",
        solution: String.raw`Strict increase forces four distinct digits. Zero cannot occur because it would be first, producing a number with fewer than four digits. Conversely, every four-element subset of one through nine has exactly one increasing order and gives a valid four-digit number. The reversible correspondence gives $\binom94=126$.` },
      { q: String.raw`Four people are each born in one of $12$ months, independently and equally likely. The probability that at least two share a month is $\tfrac mn$ in lowest terms. Find $m + n$.`, answer: "137",
        solution: String.raw`The four independent month choices give $12^4$ equally likely assignments to the four labeled people. Those with no shared month have $12\cdot11\cdot10\cdot9$ choices, so their probability is $11880/20736=55/96$. The requested event is the complement, $41/96$. This fraction is reduced, giving $m+n=41+96=137$. The uniform-month model is part of the question, not an assumption about actual calendar birth rates.` },
      { q: String.raw`Six points on a circle are joined by all their chords, and no three chords meet inside. At how many points inside the circle do two chords cross?`, answer: "15",
        solution: String.raw`Two chords crossing inside the circle have four distinct endpoints. Conversely, every four-element subset of the six circle points gives a convex quadrilateral whose two diagonals cross once inside. No three chords meeting inside ensures that a crossing point identifies a unique chord pair. Hence the crossing points correspond bijectively to four-element subsets, giving $\binom64=15$.` },
      { q: String.raw`Choose a distinguished member of $\{A,B,C\}$ uniformly, then independently include or exclude each other member with probability $1/2$. What is the probability the resulting subset is $\{A,B,C\}$?`, answer: "1/4",
        solution: String.raw`The three choices of distinguished member and four choices for the others give twelve equally likely histories. Exactly three histories produce the full subset, one for each distinguished member, so its probability is $3/12=1/4$. Equivalently, after any first choice both remaining elements must be included, of probability $(1/2)^2$. The seven possible nonempty subsets are not equally likely.` },
      { q: String.raw`Four independent fair four-sided dice have faces numbered $1,2,3,4$. The probability that their total is $12$ is $m/n$ in lowest terms. Find $m+n$.`, answer: "287",
        solution: String.raw`Subtract one from each die to leave total eight and cap three on each of four variables. Unrestricted solutions number $\binom{11}{3}=165$. A specified coordinate at least four leaves $\binom73=35$ solutions; two specified violations leave one, and three are impossible. Inclusion-exclusion gives $165-4\cdot35+6=31$. Of $4^4=256$ equally likely outcomes, the probability is $31/256$, already reduced, giving $31+256=287$.` },
      { q: String.raw`Each vertex of a square is colored black or white independently with probability $1/2$. Colorings related by rotation are described as the same class. What is the probability that the observed class has exactly two black vertices?`, answer: "3/8",
        solution: String.raw`The random experiment samples sixteen equally likely labeled colorings. Exactly two black vertices occurs in $\binom42=6$ of them, giving $6/16=3/8$. The six rotation classes are not equiprobable: the adjacent-two class contains four labeled colorings and the opposite-two class two. Counting two favorable classes out of six would use the wrong probability model.` },
      { q: String.raw`A fair coin is tossed independently four times. What is the probability that $HH$ occurs at least once among consecutive tosses?`, answer: "1/2",
        solution: String.raw`Count the complement, strings avoiding adjacent heads. Their counts satisfy $a_n=a_{n-1}+a_{n-2}$ with $a_0=1,a_1=2$, since an ending is a tail or a tail-head block for lengths at least two. Thus $a_2=3,a_3=5,a_4=8$. The sixteen sequences are equally likely, so the requested probability is $1-8/16=1/2$. Overlapping head pairs cannot be added as disjoint events.` },
      { q: String.raw`How many domino tilings does a $3\times8$ rectangle have?`, answer: "153",
        solution: String.raw`The auxiliary corner-missing-state proof gives $t_n=4t_{n-2}-t_{n-4}$ for even $n\ge4$, with $t_0=1,t_2=3$. Hence $t_4=11,t_6=41$, and $t_8=4\cdot41-11=153$. Odd widths have no tilings by area parity; the recurrence is used only in its established range.` },
      { q: String.raw`Twelve distinct lines are pairwise nonparallel. Exactly one point has three lines through it, and every other intersection has exactly two. How many points have exactly two lines through them, and how many distinct intersection points are there altogether? Give the answers in that order.`, answer: "63,64",
        solution: String.raw`The $\binom{12}{2}=66$ unordered line pairs each meet once. The triple point accounts for $\binom32=3$ of those pairs, leaving sixty-three ordinary double points. Adding the triple point once gives sixty-four distinct intersection points. Subtracting only one from the line-pair count would confuse geometric points with the pairs they represent.` }
    ],
    problems: [
      "2016 AIME I, Problem 2",
      "2013 AIME I, Problem 2",
      "2010 AIME II, Problem 4",
      "2024 AIME II, Problem 3"
    ]
  },
  challenge: {
    problems: [
      "2001 AIME I, Problem 14",
      "2015 AIME II, Problem 12",
      "2018 AIME I, Problem 14",
      "2026 AIME I, Problem 15"
    ]
  }
};
