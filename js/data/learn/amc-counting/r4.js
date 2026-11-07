// Learn, AMC Counting & Probability, chapter R4: distributions and binomial coefficients (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R4"] = {
  lessons: {
    "R4.1": {
      prereq: ["permutations-combinations", "gap-method"],
      cards: [],
      body: String.raw`A binomial coefficient $\binom nk$ counts the $k$-element subsets of an $n$-element set. The same number can count objects that look nothing like subsets, provided we can explain how choosing a subset determines exactly one object and how to recover the subset from that object. This chapter develops several such correspondences.

Suppose five identical candies are shared among three named children, with empty shares allowed. A sharing records three nonnegative integers whose sum is five. It does not record an order in which the candies were handed out. Write five stars and insert two bars: the numbers of stars before, between and after the bars are the three shares. For example, $\star\star\mid\,\mid\star\star\star$ represents $(2,0,3)$. Adjacent bars are essential because a share may be zero.

Every sharing produces one seven-symbol string, and every such string produces one sharing. Choosing the two bar positions therefore counts the sharings:

$$\binom72=21.$$

The binomial coefficients also organize algebra. In the product $(1+x)^5$, a term of degree two is produced by selecting $x$ from two factors and $1$ from the other three. There are $\binom52=10$ such selections, so the coefficient of $x^2$ is ten. The factors are distinguished by their positions even though their expressions are identical.

A third interpretation comes from grouping subsets by size. A six-element set has $2^6=64$ subsets, because each element is either included or excluded. The groups of sizes zero through six are disjoint and exhaustive, so

$$\binom60+\binom61+\cdots+\binom66=64.$$

Distributions lead to stars and bars, subset counts lead to Pascal's triangle, and choices from factors lead to the binomial theorem. Bijections explain why these different descriptions give the same counts. Throughout the chapter, the key question is what information determines one outcome, including whether order and labels matter.`,
      exercises: [
        { q: String.raw`In how many ways can $5$ identical candies be shared among $3$ children, if a child may get none?`, answer: "21",
          solution: String.raw`A sharing is an ordered triple of nonnegative occupancies summing to five. Encode it with five stars and two bars, allowing bars at the ends or beside one another for empty shares. Reading the groups reverses the encoding. Choosing the two bar positions among seven symbols gives $\binom72=21$.` },
        { q: String.raw`What is $\binom60 + \binom61 + \cdots + \binom66$?`, answer: "64",
          solution: String.raw`The term $\binom6k$ counts subsets of size $k$ of a fixed six-element set. These seven size classes partition all subsets. Each element is independently either present or absent, so there are $2^6=64$ subsets and the requested sum is $64$.` },
        { q: String.raw`What is the coefficient of $x^2$ when $(1 + x)^5$ is multiplied out?`, answer: "10",
          solution: String.raw`In multiplying five factors of $(1+x)$, an $x^2$ term chooses $x$ from exactly two factors and $1$ from the others. There is one contribution of coefficient one for each two-element subset of factor positions. Thus the coefficient is $\binom52=10$.` }
      ],
      problems: [
        "2004 AMC 8, Problem 17",
        "2022 AMC 10B, Problem 3",
        "2025 AMC 10B, Problem 3"
      ]
    },
    "R4.2": {
      prereq: ["permutations-combinations"],
      cards: ["stars-and-bars", "balls-boxes-table", "partitions"],
      body: String.raw`A distribution problem must specify what distinguishes its objects and its containers. Five identical balls in three named boxes are described by an ordered triple of occupancies. Five distinct balls in those boxes are described by the destination of each ball; equal occupancies can arise from many different placements. Stars and bars counts the first model.

Let $n\ge0$ be an integer and $k\ge1$ the number of labeled boxes. An occupancy vector satisfies

$$x_1+x_2+\cdots+x_k=n,\qquad x_i\ge0.$$

Write $x_1$ stars, a bar, $x_2$ stars, and so on, ending with $x_k$ stars. There are $n$ stars and $k-1$ bars. Empty groups are represented by adjacent bars or by a bar at an end. Reading the numbers of stars between successive bars recovers the vector, so this construction is reversible. The [[stars-and-bars|stars-and-bars count]] is therefore

$$\binom{n+k-1}{k-1}.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180" role="img" aria-labelledby="r42-title r42-desc" style="width:100%;max-width:520px;height:auto"><title id="r42-title">Bars separate labeled shares</title><desc id="r42-desc">Two stars, two adjacent bars, and three stars encode shares of two, zero, and three. The empty middle group still belongs to the second box.</desc><g fill="currentColor" text-anchor="middle"><text x="260" y="30" font-size="18">Five stars, two bars, three shares</text><text x="260" y="85" font-size="32">★ ★ | | ★ ★ ★</text><text x="260" y="123" font-size="19">(2, 0, 3)</text><text x="260" y="161" font-size="16">Adjacent bars encode an empty box.</text></g></svg>

Thus $x+y+z=10$ has $\binom{12}{2}=66$ nonnegative integer solutions. If each variable must be positive, set $y_i=x_i-1$. The new variables are nonnegative and sum to $n-k$, giving $\binom{n-1}{k-1}$ when $n\ge k$. When $n\lt k$, no positive solution exists. Equivalently, choose $k-1$ distinct gaps among the $n-1$ internal gaps between stars; distinct gaps keep every group nonempty. For three positive parts summing to ten, the count is $\binom92=36$.

More generally, if $x_i\ge a_i$ for specified nonnegative integers $a_i$, subtract the required minima. The remaining total is $N=n-\sum_i a_i$. There are no solutions when $N\lt0$; otherwise the count is $\binom{N+k-1}{k-1}$. Twelve balls in four labeled boxes with at least two per box leave four free balls, so there are $\binom73=35$ distributions. An upper bound is different: an unrestricted stars-and-bars count includes shares that are too large. Those must be removed, as developed in R8.2.

The [[balls-boxes-table|balls-in-boxes models]] separate these assumptions. With distinct balls and labeled boxes, every ball independently chooses a box, giving $k^n$ placements if emptiness is allowed. With identical balls and labeled boxes, stars and bars applies. If both balls and boxes are identical, permuting the occupancies changes nothing. The outcomes are [[partitions|integer partitions]] into at most $k$ positive parts, with zeros omitted.

For five identical balls in three identical boxes, list positive parts in nonincreasing order. With one part there is $5$; with two there are $4+1$ and $3+2$; with three there are $3+1+1$ and $2+2+1$. These five possibilities are exhaustive. Dividing the labeled-box count $\binom72=21$ by $3!$ would fail: $(5,0,0)$ has three distinct orders, whereas $(3,2,0)$ has six. Partition numbers have recurrences and generating functions, but no stars-and-bars expression that permits us to ignore these differing multiplicities.

For comparison, the unrestricted partitions of six are $6$; $5+1$, $4+2$, $3+3$; $4+1+1$, $3+2+1$, $2+2+2$; $3+1+1+1$, $2+2+1+1$; $2+1+1+1+1$; and $1+1+1+1+1+1$. Grouping by the number of parts gives $1+3+3+2+1+1=11$. Sorting parts makes the listing systematic and prevents counting the same partition in several orders.`,
      related: [
        { card: "stars-bars-upper-bound", note: String.raw`stars and bars with a maximum on each share, by inclusion-exclusion (R8.2).` },
        { card: "pie", note: String.raw`different balls in different boxes with none empty (R3.5).` }
      ],
      exercises: [
        { q: String.raw`How many ordered triples of positive integers $(x, y, z)$ satisfy $x + y + z = 10$?`, answer: "36",
          solution: String.raw`Subtract one from each variable to enforce positivity: $(x-1)+(y-1)+(z-1)=7$ with all three entries nonnegative. This is reversible by adding one back. Seven stars and two bars have nine positions, so the number is $\binom92=36$. Equivalently, two different internal gaps among ten stars separate three nonempty groups.` },
        { q: String.raw`How many ordered triples of nonnegative integers $(x, y, z)$ satisfy $x + y + z = 10$?`, answer: "66",
          solution: String.raw`Write $x$ stars, a bar, $y$ stars, a bar, then $z$ stars. This gives ten stars and two bars; adjacent bars and bars at an end allow zero entries. Each ordered triple corresponds to exactly one string. The bar positions can be chosen in $\binom{12}{2}=66$ ways.` },
        { q: String.raw`In how many ways can $12$ identical balls be put into $4$ different boxes with at least $2$ balls in each box?`, answer: "35",
          solution: String.raw`Reserve two balls for each labeled box, using eight balls. Subtracting these fixed amounts gives a reversible correspondence with four nonnegative occupancies summing to four. Encode those by four stars and three bars. Choosing the bar positions gives $\binom73=35$ distributions.` },
        { q: String.raw`In how many ways can $5$ identical balls be put into $3$ identical boxes, if a box may be empty?`, answer: "5",
          solution: String.raw`Because the boxes are identical, only their positive occupancies in nonincreasing order matter. With one nonempty box the partition is $5$; with two it is $4+1$ or $3+2$; with three it is $3+1+1$ or $2+2+1$. These cases exhaust the possible numbers of nonempty boxes and total five. Empty boxes supply the omitted zeros.` }
      ],
      problems: [
        "2019 AMC 8, Problem 25",
        "2001 AMC 10, Problem 19",
        "2003 AMC 10A, Problem 21",
        "2018 AMC 10A, Problem 11",
        "2013 AMC 10B, Problem 18",
        "2016 AMC 10A, Problem 20"
      ]
    },
    "R4.3": {
      prereq: ["permutations-combinations"],
      cards: ["pascals-identity", "binomial-row-sums", "hockey-stick"],
      body: String.raw`Place $\binom n0,\binom n1,\ldots,\binom nn$ in row $n$, starting with row zero. The end entries are one: the empty subset and the full set each have one choice. Every internal entry is the sum of two entries in the preceding row. This is [[pascals-identity|Pascal's identity]], and its explanation is a disjoint split of the subsets being counted.

Fix one element of an $n$-element set. A $k$-element subset either contains it or does not. In the first case choose $k-1$ other elements from the remaining $n-1$; in the second choose all $k$ there. For $n\ge1$ and $1\le k\le n-1$,

$$\binom nk=\binom{n-1}{k-1}+\binom{n-1}{k}.$$

The identity also covers the edges if binomial coefficients with lower index outside $0,\ldots,n-1$ are defined to be zero. For example, $\binom83+\binom84=\binom94=126$. Complementing a subset proves the symmetry $\binom nk=\binom n{n-k}$. For $1\le k\le n$, the factorial expression gives

$$\frac{\binom nk}{\binom n{k-1}}=\frac{n-k+1}{k}.$$

This ratio exceeds one before the middle, equals one between the two middle entries of an odd-numbered row, and is less than one afterwards. Thus the largest entries lie in the middle, rather than this being just a pattern observed in small rows.

The [[binomial-row-sums|sum of row $n$]] is $2^n$. Each subset appears exactly once when we group by its size, and independently including or excluding each element gives $2^n$ subsets. To compare even and odd sizes, assume $n\ge1$ and fix one element. Toggle its membership: add it if absent, remove it if present. This changes the size by one and applying it twice restores the original subset. Hence it pairs every even subset with exactly one odd subset.

Each parity class therefore has $2^{n-1}$ members, and the alternating row sum is zero:

$$\sum_{k=0}^n(-1)^k\binom nk=0\qquad(n\ge1).$$

For row ten, the even-indexed entries total $2^9=512$. Row zero is an exception: its only subset is empty, so its even sum is one and its odd sum is zero.

The [[hockey-stick|hockey-stick identity]] groups subsets by their largest element. Fix integers $0\le r\le n$ and choose $r+1$ elements from $\{1,\ldots,n+1\}$. If the largest is $m+1$, choose the other $r$ from the preceding $m$ elements. The possible values are $m=r,r+1,\ldots,n$, so

$$\sum_{m=r}^{n}\binom mr=\binom{n+1}{r+1}.$$

Every subset has exactly one largest element, which makes these cases disjoint and exhaustive. With $r=3$ and $n=10$, the diagonal sums to $\binom{11}{4}=330$. The $k$th triangular number is $k(k+1)/2=\binom{k+1}{2}$, so the first ten triangular numbers sum to $\binom{12}{3}=220$. The change of index matters: that sum ends at $\binom{11}{2}$, not $\binom{10}{2}$.`,
      related: [
        { card: "vandermonde", note: String.raw`a sum of products of binomial coefficients, by choosing from two groups (R8.3).` },
        { card: "committee-chair", note: String.raw`the identity $k\binom nk = n\binom{n-1}{k-1}$ (R1.4).` }
      ],
      exercises: [
        { q: String.raw`What is $\binom83 + \binom84$?`, answer: "126",
          solution: String.raw`Choose four elements from a nine-element set and fix one distinguished element. Subsets containing it choose three of the other eight; subsets omitting it choose four of the other eight. These disjoint cases give $\binom83+\binom84=\binom94=126$. Directly, the two summands are $56$ and $70$.` },
        { q: String.raw`What is $\binom33 + \binom43 + \binom53 + \cdots + \binom{10}{3}$?`, answer: "330",
          solution: String.raw`Choose four elements from $\{1,\ldots,11\}$ and classify them by their largest element, $m+1$. The other three come from the first $m$ elements, where $m=3,\ldots,10$. Thus the requested sum counts all four-element subsets and equals $\binom{11}{4}=330$.` },
        { q: String.raw`What is $\binom{10}{0} + \binom{10}{2} + \binom{10}{4} + \cdots + \binom{10}{10}$?`, answer: "512",
          solution: String.raw`The sum counts even-size subsets of a ten-element set, including the empty subset. Toggle membership of one fixed element. This is a reversible pairing with odd-size subsets, so the two classes are equal. Together they have $2^{10}$ members, and each therefore has $2^9=512$.` },
        { q: String.raw`What is the sum of the first ten triangular numbers, $1 + 3 + 6 + \cdots + 55$?`, answer: "220",
          solution: String.raw`The $k$th triangular number is $k(k+1)/2=\binom{k+1}{2}$. The ten terms run from $\binom22$ through $\binom{11}{2}$. The hockey-stick identity with lower index two makes their sum $\binom{12}{3}=220$. The upper endpoint is eleven because the tenth triangular number is $\binom{11}{2}=55$.` }
      ],
      problems: [
        "2017 AMC 10B, Problem 17",
        "2022 AMC 12A, Problem 19",
        "1992 AIME, Problem 4",
        "2000 AIME II, Problem 7"
      ]
    },
    "R4.4": {
      prereq: ["permutations-combinations", "pascals-identity"],
      cards: ["binomial-theorem"],
      body: String.raw`Multiplying a product means choosing one term from each factor and then collecting equal powers. In $(u+v)^n$, regard the $n$ factors as labeled by position. Choosing $v$ from exactly $k$ factors and $u$ from the others produces $u^{n-k}v^k$. There are $\binom nk$ choices of those factors. Summing over $k$ proves the [[binomial-theorem|binomial theorem]]:

$$(u+v)^n=\sum_{k=0}^{n}\binom nk u^{n-k}v^k.$$

Here $n$ is a nonnegative integer and $u,v$ are ordinary commuting numbers or expressions. For $n=0$ the product is the constant polynomial one. Negative or noninteger exponents do not have this finite expansion. At the endpoints, an exponent zero denotes an omitted factor; it does not require assigning a separate numerical meaning to $0^0$.

For a polynomial $(ax+b)^n$, the contribution to $x^j$ comes from choosing $ax$ in exactly $j$ factors:

$$[x^j](ax+b)^n=\binom nj a^j b^{n-j}\qquad(0\le j\le n).$$

The notation $[x^j]$ means the coefficient of $x^j$. Both the constants and their signs belong in the count. In $(2x+1)^5$, choosing three $2x$ terms gives $\binom53 2^3=80$ as the coefficient of $x^3$. In $(x-y)^6$, choosing four $-y$ terms gives $\binom64(-1)^4=15$ as the coefficient of $x^2y^4$. Choosing an odd number of negative terms would instead make the coefficient negative.

When powers occur inside the two terms, first solve for the desired exponent. For $x\ne0$,

$$\left(x+\frac1x\right)^6=\sum_{k=0}^6\binom6k x^{6-2k}.$$

A constant term requires $6-2k=0$, so $k=3$ and its coefficient is $\binom63=20$. A candidate index must be an integer between zero and $n$. For an odd power of $x+1/x$, the exponent $n-2k$ cannot be zero, so there is no constant term. The expression with negative powers is a Laurent polynomial; the coefficient reasoning still comes from the same finite multiplication.

If $P(x)=\sum_{j=0}^n c_jx^j$ is an ordinary polynomial, substituting $x=1$ gives $P(1)=\sum_j c_j$. This is the signed sum of coefficients, not the sum of their absolute values. For $P(x)=(3x-2)^5$, that sum is $(3-2)^5=1$. Substituting $x=-1$ instead gives the alternating sum. Adding or subtracting these two evaluations separates coefficients of even and odd degree, agreeing with the subset pairing in R4.3 when $P(x)=(1+x)^n$.

The expansion can also isolate a remainder without calculating an entire power. Since $11=1+10$,

$$11^5=1+5\cdot10+\binom52 10^2+\cdots+10^5.$$

Every term from the third onward is divisible by $100$. Thus $11^5\equiv51\pmod{100}$, so the last two digits are $51$; direct multiplication gives $161051$. Terms may be discarded here because they vanish modulo the specified modulus, not because they are small.`,
      related: [
        { card: "multinomial-theorem", note: String.raw`the same count for $(x_1 + \cdots + x_m)^n$ (R8.3).` },
        { card: "coefficient-extraction", note: String.raw`finding one coefficient of a product of several polynomials.` }
      ],
      exercises: [
        { q: String.raw`What is the coefficient of $x^3$ in $(2x + 1)^5$?`, answer: "80",
          solution: String.raw`Each $x^3$ term chooses $2x$ from three of the five factors and $1$ from the other two. There are $\binom53=10$ choices, each contributing $2^3x^3=8x^3$. Adding them gives coefficient $10\cdot8=80$. The binomial coefficient alone would omit the factors of two.` },
        { q: String.raw`What is the constant term of $\left(x + \tfrac1x\right)^6$?`, answer: "20",
          solution: String.raw`Choosing $1/x$ in $k$ factors and $x$ in the other $6-k$ produces $\binom6k x^{6-2k}$. The exponent is zero only when $k=3$, an allowed integer index. That term has coefficient $\binom63=20$, so the constant term is $20$. The expansion is considered for $x\ne0$.` },
        { q: String.raw`What is the sum of the coefficients of $(3x - 2)^5$?`, answer: "1",
          solution: String.raw`If $P(x)=\sum_j c_jx^j$, then $P(1)=\sum_j c_j$ because every power of one is one. For the given polynomial this is $(3-2)^5=1$. Negative coefficients retain their signs in this sum; no absolute values are taken.` },
        { q: String.raw`What number is formed by the last two digits of $11^5$?`, answer: "51",
          solution: String.raw`Expand around one: $(1+10)^5=1+5\cdot10+\binom52 10^2+\cdots+10^5$. Every term with at least two factors of ten is divisible by $100$, leaving remainder $1+50=51$. The last two digits are therefore $51$. Direct evaluation, $11^5=161051$, confirms the remainder.` }
      ],
      problems: [
        "2021 Fall AMC 12A, Problem 12",
        "2011 AMC 10B, Problem 23",
        "2025 AMC 10A, Problem 19",
        "2000 AIME I, Problem 3"
      ]
    },
    "R4.5": {
      prereq: ["permutations-combinations", "binomial-row-sums"],
      cards: ["bijection-method"],
      body: String.raw`A bijection between finite sets is a correspondence in which every object on either side has exactly one partner. To prove that a proposed map is a [[bijection-method|bijection]], describe its inverse. The map must always produce an allowed target, the inverse must always produce an allowed source, and each composition must return the starting object. These checks prove both that nothing is counted twice and that nothing is missed.

Consider four-digit numbers with digits strictly decreasing from left to right. Such a number has four distinct digits. Map the number to its set of digits. Conversely, take any four-element subset of $\{0,1,\ldots,9\}$ and write it in decreasing order. There is only one such order, and the first digit is nonzero because four distinct digits cannot all be zero. Recovering the digits undoes the construction, so the count is $\binom{10}{4}=210$.

The leading-zero check is part of the proof. For strictly increasing four-digit numbers, a subset containing zero would put zero first and fail to give a four-digit number. Those numbers instead correspond to four-element subsets of $\{1,\ldots,9\}$, giving $\binom94=126$. A similar-looking map can have a different valid target set.

Now take a convex octagon and assume no three diagonals meet at one interior point. Select four vertices in cyclic order. They form a convex quadrilateral whose two diagonals cross once inside. Conversely, two diagonals that cross inside cannot share an endpoint; their four endpoints recover the chosen subset. The no-three-diagonals assumption ensures that a crossing point determines just one pair of diagonals. Therefore the number of distinct crossing points is $\binom84=70$. Without that assumption the same subset argument counts crossing pairs, but several pairs can meet at one point, so it need not count distinct points.

A bijection can compare counts without first evaluating either. On subsets of $\{1,\ldots,8\}$, toggle membership of the element $1$. This map changes parity and is its own inverse. Even subsets and odd subsets are paired, so each class has $2^8/2=128$ members. This is the parity argument of R4.3 viewed explicitly as a correspondence.

Restrictions on gaps can also be removed by a reversible map. Suppose $1\le a\lt b\lt c\le12$, with $b-a\ge3$ and $c-b\ge3$. Set

$$(u,v,w)=(a,b-2,c-4).$$

Then $1\le u\lt v\lt w\le8$: subtracting two from the second entry and four from the third removes the two extra units required in each gap. Conversely, any increasing triple from $\{1,\ldots,8\}$ gives $(a,b,c)=(u,v+2,w+4)$. Its gaps are at least three, its first entry is at least one, and its last is at most twelve. The maps undo each other, giving $\binom83=56$ choices.

More generally, for $k\ge1$ chosen integers $1\le a_1\lt\cdots\lt a_k\le N$ with successive differences at least an integer $d\ge1$, set $b_i=a_i-(i-1)(d-1)$. This gives unrestricted increasing choices from $1$ through $N-(k-1)(d-1)$. The inverse adds the same offsets. When $N\ge1+(k-1)d$, the count is $\binom{N-(k-1)(d-1)}k$; otherwise there is no valid choice. The familiar non-adjacent-selection count is the case $d=2$.`,
      related: [
        { card: "non-adjacent-selection", note: String.raw`the shift that removes a gap condition, for gaps of at least $2$ (R3.3).` },
        { card: "grid-paths", note: String.raw`paths matched with strings of moves (R5.3).` }
      ],
      exercises: [
        { q: String.raw`How many four-digit numbers have digits that strictly decrease from left to right?`, answer: "210",
          solution: String.raw`Map a decreasing four-digit number to its four-element set of digits. Conversely, any four distinct digits from zero through nine have exactly one decreasing order. Its first digit is nonzero because the largest of four distinct nonnegative digits is positive. These operations undo each other, so the number is $\binom{10}{4}=210$.` },
        { q: String.raw`In a convex octagon no three diagonals meet at one point inside. At how many points inside the octagon do two diagonals cross?`, answer: "70",
          solution: String.raw`Four vertices in cyclic order form a convex quadrilateral, whose two diagonals cross inside. Conversely, an interior crossing of two diagonals recovers four distinct endpoints. The no-three-diagonals condition makes each crossing point belong to just one pair, so these maps give a bijection with four-element vertex subsets. The count is $\binom84=70$.` },
        { q: String.raw`How many subsets of $\{1, 2, \ldots, 8\}$ have an even number of elements?`, answer: "128",
          solution: String.raw`Toggle membership of $1$: add it if it is absent and remove it if it is present. This changes the size parity, and repeating the operation restores the subset. It therefore pairs even-size and odd-size subsets without omissions or repetitions. The $2^8$ subsets split equally, giving $2^7=128$ even-size subsets.` },
        { q: String.raw`How many ways are there to choose $a \lt b \lt c$ from $\{1, 2, \ldots, 12\}$ with $b - a \ge 3$ and $c - b \ge 3$?`, answer: "56",
          solution: String.raw`Set $(u,v,w)=(a,b-2,c-4)$. The gap conditions imply $1\le u\lt v\lt w\le8$. Conversely, any such triple maps to $(a,b,c)=(u,v+2,w+4)$, with both gaps at least three and $c\le12$. Both operations undo each other. Thus the answer is the number of three-element subsets of eight elements, $\binom83=56$.` }
      ],
      problems: [
        "2023 AMC 10B, Problem 16",
        "2021 Spring AMC 10A, Problem 15",
        "1992 AIME, Problem 2",
        "2010 AMC 10A, Problem 22",
        "2012 AMC 10B, Problem 22"
      ]
    },
    "R4.6": {
      prereq: ["stars-and-bars", "balls-boxes-table", "partitions", "pascals-identity", "binomial-row-sums", "hockey-stick", "binomial-theorem", "bijection-method"],
      cards: [],
      body: String.raw`A binomial coefficient counts subsets directly and many other objects through a reversible construction. For a distribution of identical objects among labeled boxes, [[stars-and-bars|stars and bars]] records occupancies as runs of stars separated by bars. With $n\ge0$ objects and $k\ge1$ boxes, empty shares give $\binom{n+k-1}{k-1}$. Positive shares require $n\ge k$ and give $\binom{n-1}{k-1}$; otherwise there are no solutions. Subtracting specified lower bounds reduces to the nonnegative case when the remaining total is nonnegative.

The [[balls-boxes-table|distribution model]] determines whether that count applies. Distinct balls have individual destinations. Identical boxes identify permutations of occupancies and lead to [[partitions|partitions]] for identical balls. Since different occupancy patterns can have different numbers of labeled versions, dividing by the factorial of the number of boxes is generally invalid.

[[pascals-identity|Pascal's identity]] splits subsets according to whether one fixed element is included. [[binomial-row-sums|Row sums]] count all subsets, giving $2^n$; toggling one fixed element pairs even and odd sizes when $n\ge1$. The [[hockey-stick|hockey-stick identity]] instead splits subsets by their largest element. Each identity follows from cases whose boundaries must match the summation indices.

The [[binomial-theorem|binomial theorem]] counts choices from factors of a finite product. Write the general term with its constants, signs and exponents before selecting the required power. Evaluating a polynomial at one adds its coefficients; evaluating at negative one gives their alternating sum. For modular arithmetic, discard terms only after proving divisibility by the modulus.

A [[bijection-method|bijection]] transfers a count to a simpler set. Its inverse verifies that every allowed object has one description. Leading zeros, coincident crossings, minimum gaps and empty shares are not peripheral details: they decide whether the proposed correspondence is valid.`,
      strategies: [
        String.raw`Hand out any required minimum first, then share the rest by stars and bars.`,
        String.raw`Ask whether the objects and the boxes are different; the four answers need four different counts.`,
        String.raw`Read a sum of binomial coefficients as a count, split by one object or by the largest element.`,
        String.raw`Write the general term of an expansion with all its constants before choosing $k$.`,
        String.raw`Set the variable to $1$ to add all the coefficients.`,
        String.raw`Find the choice that determines the object, and count those choices instead.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A shop sells $4$ kinds of donuts. In how many ways can a box of $10$ donuts be chosen?`, answer: "286",
        solution: String.raw`A box is determined by four nonnegative numbers of donuts, one for each kind, whose sum is ten. Donuts of the same kind are identical for this count; their order in the box is ignored. Ten stars and three bars encode these four counts reversibly. Choosing the bar positions gives $\binom{13}{3}=286$.` },
      { q: String.raw`What is the coefficient of $x^2y^4$ in $(x - y)^6$?`, answer: "15",
        solution: String.raw`To obtain $x^2y^4$, choose $-y$ from four factors and $x$ from the remaining two. The four factor positions can be chosen in $\binom64=15$ ways. Each contributes $x^2(-y)^4=x^2y^4$, since four is even. The coefficient is therefore $15$.` },
      { q: String.raw`How many ordered quadruples of nonnegative integers satisfy $a + b + c + d = 8$ with $a \ge 2$?`, answer: "84",
        solution: String.raw`Subtract the required minimum from the first coordinate: $a'=a-2$. This is a bijection with nonnegative solutions of $a'+b+c+d=6$, reversed by $a=a'+2$. Six stars and three bars give $\binom93=84$ solutions. No ordering of the four coordinates is identified; the quadruples remain ordered.` },
      { q: String.raw`What is $1 \cdot \binom61 + 2 \cdot \binom62 + \cdots + 6 \cdot \binom66$?`, answer: "192",
        solution: String.raw`A term $k\binom6k$ counts a committee of size $k$ together with one of its members designated chair. Summing over $k=1,\ldots,6$ counts every nonempty committee with a chair. Alternatively choose the chair first in six ways, then independently include or exclude each of the other five people. This gives $6\cdot2^5=192$, equal to the requested sum.` }
    ],
    problems: [
      "1988 AIME, Problem 1",
      "1998 AIME, Problem 7",
      "2000 AIME II, Problem 5",
      "1989 AIME, Problem 2"
    ]
  },
  challenge: {
    problems: [
      "2006 AMC 12A, Problem 23",
      "2023 AMC 12A, Problem 17",
      "2025 AMC 10A, Problem 24",
      "1991 AIME, Problem 3"
    ]
  }
};
