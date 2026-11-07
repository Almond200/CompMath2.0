// Learn, AMC Counting & Probability, chapter R3: arrangements (CONVENTIONS §14). Part: Core topics.
// Repeated-object counts, reversible constructions, symmetry assumptions, and overlapping restrictions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R3"] = {
  lessons: {
    "R3.1": {
      prereq: ["permutations-combinations", "complementary-counting"],
      cards: [],
      body: String.raw`An arrangement records which object occupies each position. Before counting it, we must decide which differences matter. In a word, exchanging two copies of the same letter changes nothing. At an unmarked round table, moving everyone one seat clockwise changes nothing. In a row of assigned seats, the same move usually does change the arrangement. These are different counting models even when they use the same physical objects.

One way to count is to introduce extra distinctions temporarily and then forget them. Label the two $O$s of $BOOK$. The four labeled letters have $4!=24$ orders. Every visible word comes from exactly two of those orders, obtained by exchanging the labels of its $O$s, so there are $24/2=12$ words. Division works because the number of descriptions is the same for every word.

For five distinct people at a round table, assume rotations are equivalent but reflections are different. Numbering the chairs gives $5!=120$ seatings. Each circular order appears in exactly five numbered-chair seatings, one for each possible chair of a chosen person. Thus the count is $120/5=24$. If some people were indistinguishable, we would have to check the number of descriptions again; symmetry alone would not justify dividing by five.

Restrictions create a second issue: simple cases may overlap. Among the integers from $1$ through $30$, the fifteen multiples of two and ten multiples of three include the five multiples of six twice. Subtracting that extra copy gives $15+10-5=20$ integers divisible by two or three. Unlike the previous examples, this is not a uniform overcount corrected by one divisor: most integers in the union were counted once, and only the intersection was counted twice.

The chapter develops these distinctions through repeated letters, adjacent and separated objects, circular orders, forbidden positions, and overlapping conditions. Each construction must explain both how an arrangement is produced and how many descriptions produce it. That check connects the counting tools of R1 to the more constrained arrangements here.`,
      exercises: [
        { q: String.raw`How many different arrangements are there of the letters of $BOOK$?`, answer: "12",
          solution: String.raw`Label the two $O$s temporarily. The four distinct labeled letters have $4!=24$ orders. Each visible word has exactly two labeled versions, one for each assignment of the $O$ labels to its two $O$ positions. Erasing the labels therefore gives $24/2=12$ words.` },
        { q: String.raw`In how many ways can $5$ distinct people sit around a round table, if two seatings that differ by a rotation are the same?`, answer: "24",
          solution: String.raw`The five people are distinct. Anchor one person and read the other four clockwise from that person. Every circular seating determines exactly one such list, and every list determines a seating, so the count is $4!=24$. Reflected orders remain different; only rotations are identified.` },
        { q: String.raw`How many integers from $1$ to $30$ are divisible by $2$ or by $3$?`, answer: "20",
          solution: String.raw`There are fifteen multiples of two and ten multiples of three in the stated inclusive interval. An integer belongs to both lists exactly when it is a multiple of six, and there are five such integers. Subtracting the extra copy of the intersection gives $15+10-5=20$.` }
      ],
      problems: [
        "2012 AMC 8, Problem 10",
        "2018 AMC 10A, Problem 4",
        "1991 AJHSME, Problem 9"
      ]
    },
    "R3.2": {
      prereq: ["permutations-combinations"],
      cards: ["multiset-permutations"],
      body: String.raw`Objects of the same kind can occupy different positions without being distinguishable from one another. An arrangement of a multiset records the kind at each position, together with the prescribed number of copies of every kind. The word $BOOK$, for example, contains one $B$, two $O$s and one $K$; exchanging its two $O$s leaves the word unchanged.

To count [[multiset-permutations|arrangements with repeated objects]], first give every copy its own label. For $n$ objects this gives $n!$ labeled orders. Suppose the kinds have multiplicities $n_1,n_2,\ldots,n_r$, where the $n_i$ are nonnegative integers with sum $n$. In any fixed visible arrangement, the labels of kind $i$ can be assigned to its positions in $n_i!$ ways. These assignments are independent across kinds. Every visible arrangement therefore has exactly $n_1!n_2!\cdots n_r!$ labeled descriptions, giving

$$\frac{n!}{n_1!n_2!\cdots n_r!}.$$

The diagram shows the two descriptions of one word. The same two-to-one correspondence holds for every arrangement of $BOOK$, not just the displayed word.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" role="img" aria-labelledby="r32-labels-title r32-labels-desc" style="width:100%;max-width:520px;height:auto"><title id="r32-labels-title">Erasing labels gives a uniform overcount</title><desc id="r32-labels-desc">The labeled orders B O1 O2 K and B O2 O1 K both become BOOK when the O labels are erased. Every visible word has exactly two labeled descriptions.</desc><g fill="currentColor" font-size="21" text-anchor="middle"><text x="125" y="60">B O₁ O₂ K</text><text x="125" y="130">B O₂ O₁ K</text><text x="400" y="96">BOOK</text></g><g stroke="currentColor" fill="none" stroke-width="1.2"><path d="M215 55L325 84M215 125L325 96"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="23">Two labeled descriptions of one word</text><text x="260" y="181">Erase the labels; keep the letter positions.</text></g></svg>

For $MISSISSIPPI$, the multiplicities are one $M$, four $I$s, four $S$s, and two $P$s, totaling eleven letters. Each word has $4!\cdot4!\cdot2!=1152$ labeled descriptions. The count is therefore $11!/1152=34650$.

Choosing positions gives another proof. Choose the four $I$ positions in $\binom{11}{4}=330$ ways, the four $S$ positions among the remaining seven in $\binom74=35$ ways, and the two $P$ positions among the remaining three in $\binom32=3$ ways. The last position must contain $M$. Each sequence of choices produces exactly one word, and every word determines those choices, so the product is $330\cdot35\cdot3=34650$. This proof often adapts more directly to restrictions on particular letters.

An arrangement of digits need not be a number of the intended length. The digits $0,0,1,2$ have $4!/2!=12$ distinct strings. A string beginning with zero has that first position fixed, leaving the three distinct digits $0,1,2$ in $3!=6$ orders. Thus six strings are four-digit numbers. The first zero is not chosen in two ways: the zeros are still indistinguishable, and only the remaining positions are being counted.

The factorial quotient counts all orders of a fixed collection with the specified indistinguishabilities. A leading-digit condition, a forbidden adjacency, or a choice of how many copies to use requires an additional argument. In particular, if the multiplicities vary, first separate the possible multiplicity patterns and then count each one.`,
      related: [
        { card: "multinomial-theorem", note: String.raw`the same numbers $\tfrac{n!}{n_1! \cdots n_k!}$ as coefficients of $(x_1 + \cdots + x_k)^n$ (R8.3).` },
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is counted, the idea behind the formula (R3.5).` }
      ],
      exercises: [
        { q: String.raw`How many different arrangements are there of the letters of $MISSISSIPPI$?`, answer: "34650",
          solution: String.raw`There are eleven positions. Choose four for the $I$s, four of the remaining seven for the $S$s, and two of the remaining three for the $P$s; the last holds $M$. Every word determines these position sets uniquely. The count is $\binom{11}{4}\binom74\binom32=330\cdot35\cdot3=34650$, also equal to $11!/(4!4!2!)$.` },
        { q: String.raw`How many five-digit numbers use each of the digits $1, 1, 2, 2, 3$ exactly once?`, answer: "30",
          solution: String.raw`All digits are nonzero, so every distinct string has five digits. Labeling the two ones and two twos gives $5!$ orders, but each visible string has $2!\cdot2!$ labeled descriptions. Division gives $5!/(2!2!)=30$. There is no additional factor for the single three.` },
        { q: String.raw`How many four-digit numbers use each of the digits $0, 0, 1, 2$ exactly once?`, answer: "6",
          solution: String.raw`The leading digit must be one or two. After fixing either choice, the remaining positions hold two zeros and the other nonzero digit, with $3!/2!=3$ orders. The two leading-digit cases are disjoint, so there are $2\cdot3=6$ four-digit numbers. This also agrees with subtracting the six zero-leading strings from all twelve distinct strings.` }
      ],
      problems: [
        "2004 AMC 8, Problem 2",
        "2009 AMC 8, Problem 16",
        "2020 AMC 10B, Problem 5",
        "2019 AMC 10A, Problem 17",
        "2014 AMC 12A, Problem 13"
      ]
    },
    "R3.3": {
      prereq: ["permutations-combinations", "constructive-counting"],
      cards: ["gap-method", "counting-blocks", "non-adjacent-selection"],
      body: String.raw`Adjacency restrictions can often be expressed by building a row in a different order. An exact construction must allow us to recover its choices from the completed row. Throughout the seating examples, all four boys and all three girls are distinct people; a requirement involving their groups does not make the people within a group indistinguishable.

If the three girls must stand together, treat their consecutive positions as one [[counting-blocks|block]]. There are five units to arrange: four individual boys and the girls' block. They have $5!$ orders, and the girls have $3!$ internal orders. Every valid row has one identifiable girls' block, so contracting it recovers exactly one unit order and one internal order. Hence the number of rows is $5!\cdot3!=720$.

For no two girls adjacent, arrange the boys first. Their order leaves five [[gap-method|gaps]], including the two ends. Put the girls in three different gaps, at most one per gap. Choosing the gaps gives $\binom53$ choices, and assigning the three distinct girls to those gaps gives $3!$ choices. Including the boys' $4!$ orders gives $4!\binom53 3!=1440$ rows. Removing the girls from a completed row recovers the boys' order and the occupied gaps, so there is no duplication.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 210" role="img" aria-labelledby="r33-gaps-title r33-gaps-desc" style="width:100%;max-width:520px;height:auto"><title id="r33-gaps-title">Four boys leave five gaps for separated girls</title><desc id="r33-gaps-desc">Four boys in a fixed order leave five gaps, including both ends. Three selected gaps each receive one girl. The displayed occupied gaps give the group pattern G B B G B B G.</desc><g fill="currentColor" font-size="21" text-anchor="middle"><text x="260" y="25" font-size="17">Choose three different gaps, then assign the girls.</text><text x="100" y="90">B</text><text x="200" y="90">B</text><text x="300" y="90">B</text><text x="400" y="90">B</text><text x="50" y="90">G</text><text x="250" y="90">G</text><text x="450" y="90">G</text></g><g fill="none" stroke="currentColor" stroke-width="1.1"><path d="M32 104H68M132 104H168M232 104H268M332 104H368M432 104H468"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="260" y="145">The two end gaps count too.</text><text x="260" y="185">4! boy orders × 10 gap choices × 3! girl orders</text></g></svg>

Placing the boys first is convenient, but placing the girls first is possible too. Choose their order in $3!$ ways and the boys' order in $4!$ ways. Split the boys into the four gaps before, between, and after the girls, requiring at least one boy in each of the two interior gaps. After those two boys are reserved, the other two either go in the same gap, four choices, or in two different gaps, $\binom42=6$ choices. Thus there are ten possible distributions. This again gives $3!\cdot4!\cdot10=1440$. The important requirement is a complete, reversible construction, not a mandatory order of placement.

For [[non-adjacent-selection|a non-adjacent selection]], the positions themselves are distinct, while the marks indicating selected positions are alike. Choose three positions from $1,\ldots,10$. A pattern has three selected marks and seven unselected marks. Write the seven unselected marks first; their eight gaps can receive at most one selected mark each. Choosing three gaps gives $\binom83=56$ patterns. Once a pattern is built, reading its ten positions from left to right recovers the selected numbers. No factorial for the selected marks belongs in this count.

More generally, write a non-adjacent $k$-element selection as $x_1<x_2<\cdots<x_k$, where $x_{i+1}\ge x_i+2$. Set $y_i=x_i-(i-1)$. Then

$$1\le y_1<y_2<\cdots<y_k\le n-k+1.$$

Conversely, any such increasing sequence of $y_i$ gives a valid selection by $x_i=y_i+(i-1)$. Thus the count is $\binom{n-k+1}{k}$ when $0\le k\le\lceil n/2\rceil$; larger $k$ are impossible because $k$ marks need at least $k-1$ separating positions. The empty selection has one pattern. For a binary string of length eight with exactly three non-adjacent ones, the formula gives $\binom63=20$.

These formulas describe a line. On a circle, the first and last positions are adjacent too. For three non-adjacent vertices of a labeled octagon, split according to vertex $1$. If it is absent, choose three non-adjacent vertices from the seven-vertex line $2,\ldots,8$, giving $\binom53=10$. If it is present, vertices $2$ and $8$ are forbidden, and choose two non-adjacent vertices from the five-vertex line $3,\ldots,7$, giving $\binom42=6$. There are sixteen selections. Treating the octagon as an unrestricted line would include selections containing both endpoints.`,
      related: [
        { card: "stars-and-bars", note: String.raw`the same gaps, when several objects may share a gap (R4.2).` },
        { card: "recursive-counting", note: String.raw`strings with no two adjacent $1$s and no fixed number of $1$s, counted by a recursion (R5.2).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $4$ distinct boys and $3$ distinct girls stand in a row so that no two girls are next to each other?`, answer: "1440",
          solution: String.raw`First order the four distinct boys in $4!$ ways. The five gaps around them include both ends. Choose three different gaps in $\binom53=10$ ways, and assign the three distinct girls to them in $3!=6$ ways. Removing the girls recovers all of these choices uniquely, so the count is $24\cdot10\cdot6=1440$.` },
        { q: String.raw`In how many ways can $4$ distinct boys and $3$ distinct girls stand in a row so that the three girls are together?`, answer: "720",
          solution: String.raw`Contract the consecutive girls into one block. This leaves five distinguishable units, with $5!=120$ orders; each has $3!=6$ internal orders of the girls. Every valid row has exactly one such contraction, so multiplying gives $120\cdot6=720$.` },
        { q: String.raw`In how many ways can $3$ numbers be chosen from $1, 2, \ldots, 10$ so that no two chosen numbers are consecutive?`, answer: "56",
          solution: String.raw`Write the chosen numbers as $x_1<x_2<x_3$ with consecutive differences at least two. The transformed numbers $x_1,x_2-1,x_3-2$ are any three distinct increasing numbers from one through eight. The inverse transformation adds zero, one, and two, so this is a bijection. There are $\binom83=56$ selections.` },
        { q: String.raw`How many strings of $8$ binary digits have exactly three $1$s, with no two $1$s next to each other?`, answer: "20",
          solution: String.raw`The five zeros form a row with six gaps, including its ends. Put the three identical ones in three different gaps. Every valid binary string is obtained once, because deleting its ones recovers the zeros and the occupied gaps. The count is $\binom63=20$; multiplying by $3!$ would incorrectly distinguish the ones.` }
      ],
      problems: [
        "2018 AMC 8, Problem 23",
        "2012 AMC 12B, Problem 12",
        "2015 AMC 12A, Problem 17",
        "2024 AMC 10A, Problem 20"
      ]
    },
    "R3.4": {
      prereq: ["permutations-combinations"],
      cards: ["circular-permutations", "derangements"],
      body: String.raw`A [[circular-permutations|circular arrangement]] identifies rows that differ only by a rotation. We assume first that all $n$ objects are distinct and that reflections count as different. Choose one object, $A$, as an anchor. Starting at $A$ and reading clockwise lists the other $n-1$ objects in a unique order, giving $(n-1)!$ circular arrangements for $n\ge1$. Equivalently, every circular order has exactly $n$ descriptions in numbered seats, so $n!/n=(n-1)!$.

Six distinct people therefore have $5!=120$ circular seatings. If they instead occupy six numbered chairs, rotations change who occupies which chair and the count is $6!$. The physical shape of the table does not decide whether rotations are equivalent; the problem's definition does.

A bracelet also identifies an order with its reflection. For $n\ge3$ distinct beads, reversing the anchored clockwise list gives a different list: its first and last beads are distinct. Reflection therefore pairs circular orders without leaving one unpaired, and the bracelet count is $(n-1)!/2$. Six different beads give $120/2=60$ bracelets. For one or two beads the reflected order is already the same, so that division is not valid.

Repeated colors can also invalidate division by the number of rotations. Four labeled positions containing $A,A,B,B$ have six strings. Four rotations of $AABB$ are different, but $ABAB$ has only two different rotations. These give two circular color arrangements, although $6/4$ is not two.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 225" role="img" aria-labelledby="r34-rotations-title r34-rotations-desc" style="width:100%;max-width:520px;height:auto"><title id="r34-rotations-title">Repeated colors can give unequal rotation classes</title><desc id="r34-rotations-desc">One circular arrangement is described by AABB, ABBA, BBAA, and BAAB. The other is described by ABAB and BABA. The six strings split into classes of four and two, not equally sized classes.</desc><g fill="currentColor" text-anchor="middle"><text x="260" y="25" font-size="17">Six strings form two circular arrangements.</text><text x="260" y="70" font-size="21">AABB   ABBA   BBAA   BAAB</text><text x="260" y="102" font-size="17">Four different rotations</text><text x="260" y="153" font-size="21">ABAB   BABA</text><text x="260" y="185" font-size="17">Two different rotations</text><text x="260" y="216" font-size="17">Dividing all six strings by 4 fails.</text></g></svg>

An anchor can still simplify restrictions among distinct people. With eight people and $A$ beside $B$, fix $A$, choose which of its two neighboring positions contains $B$, and arrange the other six people. This gives $2\cdot6!=1440$ circular seatings. The two choices are disjoint because $B$ occupies only one seat.

A different restriction compares each object's destination with its own label. A [[derangements|derangement]] of $n$ distinct objects is a permutation in which none occupies its own position. For letters and addressed envelopes, every letter must go into another letter's envelope, with one letter per envelope. Write the number as $D_n$. There is one empty arrangement, so $D_0=1$; one object cannot move elsewhere, so $D_1=0$.

For $n\ge2$, letter $1$ has $n-1$ possible destination envelopes $j\ne1$. Fix one such $j$. If letter $j$ goes into envelope $1$, these two letters exchange places and the other $n-2$ letters must form a derangement, giving $D_{n-2}$ choices.

If letter $j$ does not go into envelope $1$, remove letter $1$ and its destination envelope $j$, and rename envelope $1$ as envelope $j$. The remaining letters form a derangement on $n-1$ labels: letter $j$ is not in the renamed envelope, and every other letter is still forbidden its original envelope. Conversely, from any such derangement, rename envelope $j$ back to $1$ and add letter $1$ in a new envelope $j$. This recovers exactly the second case, giving $D_{n-1}$ choices. Hence

$$D_n=(n-1)(D_{n-1}+D_{n-2})\qquad(n\ge2).$$

Starting from $D_0=1,D_1=0$ gives $D_2=1,D_3=2,D_4=9,D_5=44$. For instance, the two derangements of three objects are the position lists $231$ and $312$.

To have exactly $k$ objects in their own positions, first choose those objects in $\binom nk$ ways. The remaining $n-k$ must be deranged; otherwise additional positions would be correct. The count is $\binom nkD_{n-k}$ for $0\le k\le n$. Five letters with exactly one correct destination give $5D_4=45$. Choosing that one letter and freely permuting the rest would also include arrangements with more correct letters, so the derangement condition is essential.`,
      related: [
        { card: "burnsides-lemma", note: String.raw`counting arrangements up to rotation when some rotations fix an arrangement, as with colorings (R8.2).` },
        { card: "expected-fixed-points", note: String.raw`on average a random arrangement has exactly one object in its own place.` }
      ],
      exercises: [
        { q: String.raw`In how many ways can $6$ distinct people sit around a round table, if seatings that differ by a rotation are the same?`, answer: "120",
          solution: String.raw`Anchor one of the six distinct people. Each seating up to rotation is specified by the clockwise order of the other five, giving $5!=120$. Rotating a seating does not produce another order in this anchored representation, while reflecting it generally does and is still counted separately.` },
        { q: String.raw`How many different bracelets can be made from $6$ different beads, if a bracelet may be rotated or turned over?`, answer: "60",
          solution: String.raw`Anchor one bead to remove rotations, leaving $5!=120$ clockwise lists. Reversing a list turns the bracelet over. With six distinct beads, a list differs from its reverse, so the 120 lists split into pairs, each representing one bracelet. Thus there are $120/2=60$.` },
        { q: String.raw`In how many ways can $4$ letters be put into their $4$ addressed envelopes, one per envelope, so that no letter is in its own envelope?`, answer: "9",
          solution: String.raw`Let $A_i$ be the permutations with letter $i$ correct. There are $4!=24$ unrestricted placements. Each of four specified correct letters leaves $3!=6$ placements; each pair leaves $2!=2$; each triple leaves one; and all four correct give one. Inclusion–exclusion gives $24-4\cdot6+6\cdot2-4\cdot1+1=9$. Intersections include placements with additional correct letters, which is why the alternating corrections are needed.` },
        { q: String.raw`In how many ways can $5$ letters be put into their $5$ envelopes, one per envelope, so that exactly one letter is in its own envelope?`, answer: "45",
          solution: String.raw`Choose which letter is correct in five ways. The remaining four letters must all be incorrect, giving $D_4=9$ derangements. The fixed letter is uniquely determined by a valid placement, so these five cases are disjoint. The count is $5\cdot9=45$, rather than $5\cdot4!$, which would allow more correct letters.` }
      ],
      problems: [
        "2014 AMC 12B, Problem 18",
        "2018 AMC 10B, Problem 18",
        "2025 AMC 10B, Problem 11"
      ]
    },
    "R3.5": {
      prereq: ["permutations-combinations", "complementary-counting", "casework-method"],
      cards: ["inclusion-exclusion", "pie", "uniform-overcount", "double-counting"],
      body: String.raw`An arrangement can violate several restrictions at once. Counting separately the arrangements that violate each restriction then counts some arrangements repeatedly. [[inclusion-exclusion|Inclusion–exclusion]] corrects this overlap by considering intersections: an intersection is the set of objects satisfying all the named conditions simultaneously.

For finite sets $A,B$, an object in their intersection contributes twice to $|A|+|B|$, while any other object in their union contributes once. Subtracting the intersection therefore gives $|A\cup B|=|A|+|B|-|A\cap B|$. For three sets, the corresponding formula is

$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.$$

An object in just one set contributes one. An object in exactly two contributes $2-1=1$. An object in all three contributes $3-3+1=1$. This checks every possible membership pattern and explains the added triple intersection.

Among the integers from $1$ through $100$, let the sets consist of multiples of two, three, and five. Their sizes are $50,33,20$. Pairwise intersections are multiples of $6,10,15$, with sizes $16,10,6$, and the triple intersection consists of the three multiples of thirty. Thus $50+33+20-16-10-6+3=74$ integers belong to at least one set. For other divisors, an intersection uses their least common multiple, which need not equal their product.

For more than three sets, continue with alternating signs: add singles, subtract pairwise intersections, add triple intersections, and so on. An object belonging to exactly $t\ge1$ sets then contributes

$$\binom t1-\binom t2+\cdots+(-1)^{t+1}\binom tt=1,$$

as follows by expanding $(1-1)^t=0$ and moving its constant term to the other side. Objects in none of the sets contribute zero. The formula needs no assumption that intersections of the same size have equal counts; when they do, binomial coefficients let us group those terms.

[[pie|Counting with inclusion–exclusion]] often starts from all arrangements and removes the union of bad events. Put five distinct balls into three distinct boxes, with no capacity limit. Each ball independently has three possible destinations in the counting construction, giving $3^5=243$ assignments. Define $A_i$ to mean box $i$ is empty. For a specified empty box, the balls have two destinations, giving $2^5=32$ assignments. For a specified pair of empty boxes, all balls must use the remaining box, giving one assignment. All three boxes cannot be empty because there are five balls. Therefore the count with none empty is

$$3^5-\binom31 2^5+\binom32 1^5=243-96+3=150.$$

The boxes must be distinct for this construction, and different balls are assigned individually. If identical balls or unlabelled boxes are intended, the assignment model changes. No probabilistic independence is needed for this counting argument.

Derangements give another application. Let $A_i$ mean object $i$ is in its own position. Fixing a specified set of $j$ objects leaves $(n-j)!$ permutations of the others. There are $\binom nj$ such sets, so excluding every fixed position gives

$$D_n=\sum_{j=0}^{n}(-1)^j\binom nj(n-j)!=n!\sum_{j=0}^{n}\frac{(-1)^j}{j!}.$$

For four objects this is $24-4\cdot6+6\cdot2-4\cdot1+1=9$, agreeing with the recurrence in R3.4. This is an alternating sum because an arrangement with several fixed positions belongs to several bad events.

A [[uniform-overcount|uniform overcount]] has a different correction: division works when every target object has exactly the same number of descriptions. To count edges of a solid with twelve pentagonal faces, count face-edge incidences, pairs consisting of a face and one of its boundary edges. There are $12\cdot5=60$ incidences. Under the stated assumption that each edge belongs to exactly two faces, every edge is counted twice, giving thirty edges.

This is also [[double-counting|double counting]]: count one precisely defined collection in two ways and equate the results. If twenty students each belong to three clubs, there are sixty pairs consisting of a student and a club they belong to. If every club has exactly six members and all members are among those twenty students, $c$ clubs give $6c$ pairs. Thus $6c=60$ and $c=10$. We count memberships rather than students because a student may appear in several clubs.

Inclusion–exclusion handles varying overlap by examining which conditions hold. Uniform division handles an equal number of descriptions per object, and double counting expresses both descriptions as counts of the same collection. Identifying that collection is what makes each correction valid.`,
      related: [
        { card: "derangements", note: String.raw`inclusion-exclusion over the objects left in their own place (R3.4).` },
        { card: "handshake-lemma", note: String.raw`double counting the ends of the edges of a graph (R7.3).` }
      ],
      exercises: [
        { q: String.raw`How many integers from $1$ to $100$ are divisible by at least one of $2$, $3$ and $5$?`, answer: "74",
          solution: String.raw`Take the union of the three sets of multiples. They have sizes $50,33,20$; their pairwise intersections, the multiples of $6,10,15$, have sizes $16,10,6$; and their triple intersection has three multiples of thirty. Every integer in exactly one, two, or three sets contributes respectively $1$, $2-1$, or $3-3+1$. The total is $50+33+20-16-10-6+3=74$.` },
        { q: String.raw`In how many ways can $5$ different balls be put into $3$ different boxes so that no box is empty?`, answer: "150",
          solution: String.raw`Each of the five distinct balls has three possible boxes, giving $3^5=243$ assignments. Exclude assignments with some box empty. A specified empty box leaves $2^5=32$ assignments, and a specified pair of empty boxes leaves one. All three cannot be empty. Inclusion–exclusion therefore gives $243-3\cdot32+3\cdot1=150$ assignments with every box occupied.` },
        { q: String.raw`A solid has $12$ faces, each a pentagon, and each edge lies on exactly two faces. How many edges does it have?`, answer: "30",
          solution: String.raw`Count face-edge incidences. Every pentagonal face contributes five, so there are $12\cdot5=60$ incidences. By the question's assumption, every edge appears in exactly two of them. If there are $E$ edges, $2E=60$, hence $E=30$. The common incidence count, not a drawing of the solid, determines the result.` },
        { q: String.raw`Each of $20$ students belongs to exactly $3$ clubs, and each club has exactly $6$ members, all from those $20$ students. How many clubs are there?`, answer: "10",
          solution: String.raw`Count pairs consisting of a student and a club that student belongs to. By students, there are $20\cdot3=60$ pairs. If there are $c$ clubs, each containing six of these students, there are $6c$ pairs by clubs. Equating these counts gives $6c=60$, hence $c=10$. Overlapping club memberships are separate pairs and cause no duplication within this collection.` }
      ],
      problems: [
        "1991 AJHSME, Problem 23",
        "2005 AMC 10B, Problem 13",
        "2004 AMC 10A, Problem 13",
        "2023 AMC 10A, Problem 6",
        "2005 AMC 12A, Problem 18",
        "2025 AMC 10B, Problem 16"
      ]
    },
    "R3.6": {
      prereq: ["multiset-permutations", "gap-method", "counting-blocks", "non-adjacent-selection", "circular-permutations", "derangements", "inclusion-exclusion", "pie", "uniform-overcount", "double-counting"],
      cards: [],
      body: String.raw`The arrangements in this chapter depend on two choices: what makes two outcomes different, and which outcomes are permitted. Both must be fixed before applying a count. A row of distinct objects, a word with repeated letters, and a circle considered up to rotation are different objects, even if each can be drawn as letters in positions.

For [[multiset-permutations|repeated objects]], temporarily labeling all copies gives an equal number of descriptions of each visible order. Dividing by those label permutations works because that number is constant. Choosing the positions of each kind gives a second construction of the same orders and can incorporate additional restrictions such as a nonzero leading digit.

[[counting-blocks|Blocks]] and [[gap-method|gaps]] replace a constrained arrangement by simpler choices that can be recovered from it. A block has both a position among the other units and an internal order. Separated objects use distinct gaps, including the ends of a line. For [[non-adjacent-selection|non-adjacent selections]], the selected marks are indistinguishable; compressing the required separators gives $\binom{n-k+1}{k}$ in the feasible range. A circle adds an endpoint adjacency and needs its own check.

For [[circular-permutations|distinct objects around a circle]], anchoring one object removes rotations, giving $(n-1)!$. Reflection can be divided out only when it pairs different circular orders; distinct bracelets with at least three beads have this property. Repeated colors can have different numbers of rotated descriptions, so an automatic division by the number of positions is unsafe. A [[derangements|derangement]] instead forbids every object's own position; exactly $k$ fixed objects are counted by choosing them and deranging the remainder.

[[inclusion-exclusion|Inclusion–exclusion]] corrects overlapping sets by tracking their intersections, and [[pie|its complement form]] excludes every bad event. The alternating signs make each permitted object contribute once and each forbidden object contribute zero. [[uniform-overcount|Uniform division]] and [[double-counting|double counting]] also track contributions, but through a constant number of descriptions or two counts of one collection. Across these methods, checking how often each final object is represented supplies the justification for the arithmetic.`,
      strategies: [
        String.raw`Treat alike objects as different, then divide by the number of ways to shuffle them.`,
        String.raw`Glue together what must be together; place the unrestricted objects first and choose gaps for the rest.`,
        String.raw`For distinct objects around a circle, anchor one object; check separately whether reflections are identified.`,
        String.raw`For "none of these bad things", subtract the bad cases by inclusion-exclusion.`,
        String.raw`If the inclusion-exclusion terms are hard to compute, redefine the sets.`,
        String.raw`If every object is counted the same number of times, divide by that number.`,
        String.raw`Count a set of pairs two ways and set the counts equal.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`How many different arrangements are there of the letters of $LETTER$?`, answer: "180",
        solution: String.raw`The six letters include two $E$s, two $T$s, and the distinct single letters $L$ and $R$. Each visible arrangement has exactly $2!2!$ labeled descriptions, from permuting the labels of equal letters. Thus the count is $6!/(2!2!)=720/4=180$.` },
      { q: String.raw`How many integers from $1$ to $60$ are divisible by neither $3$ nor $4$?`, answer: "30",
        solution: String.raw`The twenty multiples of three and fifteen multiples of four overlap in the five multiples of twelve. Their union therefore has $20+15-5=30$ integers. The interval contains sixty integers altogether, so the complementary set divisible by neither has $60-30=30$.` },
      { q: String.raw`In how many ways can $8$ distinct people sit around a round table so that $A$ and $B$ sit next to each other, if rotations are the same?`, answer: "1440",
        solution: String.raw`Fix $A$ as an anchor. Person $B$ can occupy either of the two neighboring positions, and the other six distinct people fill the remaining six clockwise positions in $6!$ ways. Every valid seating gives exactly one choice of $B$'s side and one order of the rest. Hence there are $2\cdot6!=1440$ seatings up to rotation, with reflections still different.` },
      { q: String.raw`How many arrangements of $1, 2, 3, 4, 5$ leave no number in its own position?`, answer: "44",
        solution: String.raw`This asks for $D_5$. A specified set of $j$ fixed positions leaves $(5-j)!$ permutations, and there are $\binom5j$ such sets. Excluding every fixed position gives $120-5\cdot24+10\cdot6-10\cdot2+5\cdot1-1=44$. The recurrence independently gives $D_5=4(D_4+D_3)=4(9+2)=44$.` }
    ],
    problems: [
      "1985 AJHSME, Problem 15",
      "2007 AMC 10A, Problem 11",
      "2005 AMC 10A, Problem 17",
      "2009 AMC 10B, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2008 AMC 10B, Problem 22",
      "2010 AMC 10B, Problem 22",
      "2021 Spring AMC 10B, Problem 22",
      "2006 AMC 12A, Problem 25"
    ]
  }
};
