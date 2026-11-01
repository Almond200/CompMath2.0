// Learn, AMC Counting & Probability, chapter R1: counting from scratch (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (nineteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R1"] = {
  lessons: {
    "R1.1": {
      prereq: [],
      cards: [],
      body: String.raw`Counting means finding how many objects of some kind there are, without missing any and without counting any twice. A short list can be written out in full; the point of this chapter is to count lists far too long to write, by organizing them.

The simplest count is a run of whole numbers. From $15$ to $83$ there are $83 - 15 + 1 = 69$ numbers, not $68$: subtracting counts the steps between the ends, and the numbers are one more than the steps.

When a choice is made in stages, the counts multiply. With $4$ shirts, $3$ pairs of pants and $2$ hats, each shirt goes with each pair of pants, which gives $4 \cdot 3 = 12$ pairings, and each pairing with each hat, so there are $4 \cdot 3 \cdot 2 = 24$ outfits.

Some counts are easier from the other side. A three-digit number with no digit $7$ has $8$ choices for its first digit (any of $1$ to $9$ except $7$) and $9$ for each of the others, so there are $8 \cdot 9 \cdot 9 = 648$ of them. Of the $900$ three-digit numbers, the other $900 - 648 = 252$ have at least one $7$, which is much harder to count directly.

The lessons take these ideas in turn: making a list and the fencepost (R1.2), the multiplication and addition principles (R1.3), permutations and combinations (R1.4), and casework and complements (R1.5). The Summary (R1.6) collects the strategies.`,
      exercises: [
        { q: String.raw`How many integers are there from $15$ to $83$, inclusive?`, answer: "69",
          solution: String.raw`$83 - 15 = 68$ counts the steps from $15$ to $83$; the numbers are one more than the steps, so there are $69$.` },
        { q: String.raw`Sam has $4$ shirts, $3$ pairs of pants and $2$ hats. An outfit is one of each. How many outfits are there?`, answer: "24",
          solution: String.raw`Each of the $4$ shirts goes with each of the $3$ pairs of pants, and each of those $12$ pairings with each of the $2$ hats: $4 \cdot 3 \cdot 2 = 24$.` },
        { q: String.raw`How many three-digit numbers have no digit equal to $7$?`, answer: "648",
          solution: String.raw`The first digit is one of $1$ to $9$ other than $7$, so $8$ choices; the second and third are any of $0$ to $9$ other than $7$, so $9$ each. That gives $8 \cdot 9 \cdot 9 = 648$.` }
      ],
      problems: [
        "2004 AMC 8, Problem 4",
        "2007 AMC 8, Problem 4",
        "2001 AMC 8, Problem 6"
      ]
    },
    "R1.2": {
      prereq: [],
      cards: ["organized-listing", "fencepost-counting"],
      body: String.raw`The most reliable way to count a small set is to list it, and the way to list without missing or repeating anything is to list in an order. In how many ways can $12$ be written as a sum of three positive whole numbers, if the order of the three does not matter? How many posts does a $100$-meter fence need, with a post every $4$ meters?

[[organized-listing|An organized list]] puts the objects in a fixed order, so that each one has exactly one place and a gap would show. For sums of three numbers in which order does not matter, write each sum with its parts in increasing order, $a \le b \le c$, and list by the smallest part. With $a = 1$, the other two add to $11$ with $1 \le b \le c$: $(1, 1, 10)$, $(1, 2, 9)$, $(1, 3, 8)$, $(1, 4, 7)$, $(1, 5, 6)$. With $a = 2$: $(2, 2, 8)$, $(2, 3, 7)$, $(2, 4, 6)$, $(2, 5, 5)$. With $a = 3$: $(3, 3, 6)$, $(3, 4, 5)$. With $a = 4$: $(4, 4, 4)$. The smallest part cannot be $5$, since then the sum would be at least $15$. So there are $5 + 4 + 2 + 1 = 12$ ways. The rule "smallest part first, then the next" is what makes the list complete: within each row the second part rises one at a time until it would pass the third.

[[fencepost-counting|The fencepost rule]] is the most common counting mistake turned into a rule. A run of whole numbers from $a$ to $b$ has $b - a + 1$ members, one more than the difference. A straight fence $100$ meters long with a post every $4$ meters has $\tfrac{100}{4} = 25$ gaps between posts, and so $26$ posts, one more than the gaps. Around a closed loop, such as a $400$-meter track with a post every $8$ meters, the last gap ends at the first post, so the posts and the gaps are equal: $50$ of each. The multiples of $7$ from $100$ to $500$ are $7 \cdot 15 = 105$ up to $7 \cdot 71 = 497$, so there are $71 - 15 + 1 = 57$ of them: count the multipliers, not the multiples.

List in an order that gives every object one place, and check the ends of every run: posts or gaps, inclusive or not. The next lesson counts lists too long to write.`,
      related: [
        { card: "floor-multiples", note: String.raw`counting the multiples of $k$ up to $n$ as $\lfloor \tfrac nk \rfloor$ (M1.5).` },
        { card: "partitions", note: String.raw`sums in which order does not matter, studied further in R4.2.` }
      ],
      exercises: [
        { q: String.raw`A straight fence is $100$ meters long, with a post at each end and a post every $4$ meters. How many posts are there?`, answer: "26",
          solution: String.raw`The posts split the fence into $\tfrac{100}{4} = 25$ gaps, and a straight fence has one more post than gaps: $26$.` },
        { q: String.raw`Posts are placed every $8$ meters around a circular track $400$ meters long. How many posts are there?`, answer: "50",
          solution: String.raw`There are $\tfrac{400}{8} = 50$ gaps, and on a closed loop the posts and the gaps are equal in number, so $50$ posts.` },
        { q: String.raw`In how many ways can $12$ be written as a sum of three positive integers, if the order of the three does not matter?`, answer: "12",
          solution: String.raw`List with $a \le b \le c$ by the smallest part: $a = 1$ gives $(1, 1, 10)$ through $(1, 5, 6)$, five sums; $a = 2$ gives $(2, 2, 8)$, $(2, 3, 7)$, $(2, 4, 6)$, $(2, 5, 5)$, four; $a = 3$ gives $(3, 3, 6)$, $(3, 4, 5)$, two; and $a = 4$ gives $(4, 4, 4)$. In all $12$.` },
        { q: String.raw`How many multiples of $7$ are there between $100$ and $500$?`, answer: "57",
          solution: String.raw`The smallest is $105 = 7 \cdot 15$ and the largest $497 = 7 \cdot 71$. The multipliers run from $15$ to $71$, so there are $71 - 15 + 1 = 57$.` }
      ],
      problems: [
        "2004 AMC 10B, Problem 1",
        "2022 AMC 8, Problem 3",
        "2024 AMC 8, Problem 8",
        "2013 AMC 8, Problem 22",
        "2018 AMC 8, Problem 25"
      ]
    },
    "R1.3": {
      prereq: ["organized-listing"],
      cards: ["constructive-counting", "counting-functions"],
      body: String.raw`Most counts are too large to list, but they can still be built one choice at a time. How many license plates have two letters followed by three digits? How many four-digit numbers have only odd digits? How many positive whole numbers below $1000$ read the same forwards and backwards?

[[constructive-counting|Constructive counting]] builds each object by a sequence of choices and multiplies the numbers of options. This is the multiplication principle: if the first choice can be made in $m$ ways and, whatever it was, the second in $n$ ways, the two together can be made in $mn$ ways. A plate with two letters and three digits has $26 \cdot 26 \cdot 10 \cdot 10 \cdot 10 = 676000$ possibilities. A four-digit number with only odd digits has $5$ choices for each digit, $5^4 = 625$ in all; here the first digit cannot be $0$ anyway, since $0$ is even. What matters is that the number of options at each step does not depend on the earlier choices. When it does, choose the most restricted position first: for a three-digit number with no $7$, the first digit (which also cannot be $0$) has $8$ options and the others $9$.

The addition principle is the partner rule: if the objects split into groups with no overlap, the total is the sum of the groups. A palindrome, a number that reads the same backwards, below $1000$ has one, two or three digits. One-digit palindromes are $1$ to $9$, so $9$. A two-digit palindrome is $aa$ with $a$ from $1$ to $9$, so $9$. A three-digit palindrome $aba$ has $9$ choices for $a$ and $10$ for $b$, so $90$. The total is $9 + 9 + 90 = 108$: multiply within a group, add across groups.

A special case of the multiplication principle counts [[counting-functions|functions]]: ways to give each member of one set one member of another. If each of $3$ students joins one of $4$ clubs, each student independently has $4$ choices, so there are $4^3 = 64$ ways. If no two students may join the same club, the choices shrink as they go: $4 \cdot 3 \cdot 2 = 24$ ways.

Build the object one choice at a time, choose the most restricted position first, multiply along a sequence of choices and add across separate groups. The next lesson counts orderings and selections.`,
      related: [
        { card: "casework-method", note: String.raw`splitting into groups when the options at one step depend on an earlier choice (R1.5).` },
        { card: "palindromes", note: String.raw`palindromes and their digit conditions (M2.3).` }
      ],
      exercises: [
        { q: String.raw`A license plate has two letters followed by three digits. How many plates are possible?`, answer: "676000",
          solution: String.raw`There are $26$ choices for each letter and $10$ for each digit: $26^2 \cdot 10^3 = 676 \cdot 1000 = 676000$.` },
        { q: String.raw`How many four-digit numbers have only odd digits?`, answer: "625",
          solution: String.raw`Each of the four digits is one of $1, 3, 5, 7, 9$, and the first digit is never $0$ since $0$ is even. So there are $5^4 = 625$.` },
        { q: String.raw`Each of $3$ students joins exactly one of $4$ clubs. In how many ways can this happen?`, answer: "64",
          solution: String.raw`Each student chooses independently from $4$ clubs, so there are $4 \cdot 4 \cdot 4 = 64$ ways. (If no two could share a club, there would be $4 \cdot 3 \cdot 2 = 24$.)` },
        { q: String.raw`How many positive integers less than $1000$ are palindromes?`, answer: "108",
          solution: String.raw`Split by the number of digits. One digit: $9$. Two digits $aa$: $9$. Three digits $aba$: $9 \cdot 10 = 90$. The groups do not overlap, so the total is $9 + 9 + 90 = 108$.` }
      ],
      problems: [
        "2002 AMC 8, Problem 19",
        "2017 AMC 8, Problem 15",
        "1999 AMC 8, Problem 15",
        "2020 AMC 10A, Problem 6",
        "2022 AMC 10A, Problem 9"
      ]
    },
    "R1.4": {
      prereq: ["constructive-counting"],
      cards: ["permutations-combinations", "committee-chair"],
      body: String.raw`Two kinds of count come up so often that they have their own names. In how many ways can a president, a vice-president and a secretary be chosen from $10$ people? In how many ways can a committee of $3$ be chosen from the same $10$? The first cares about which person gets which job; the second does not.

An ordered choice is a permutation. Choosing a president, then a vice-president, then a secretary gives $10 \cdot 9 \cdot 8 = 720$ ways, by the multiplication principle with one fewer person at each step. Arranging all $n$ objects in a row gives $n \cdot (n - 1) \cdots 2 \cdot 1$ ways, written $n!$ ("$n$ factorial"): $5$ books on a shelf can be ordered in $5! = 120$ ways. In general, [[permutations-combinations|an ordered choice of $k$ from $n$]] can be made in $P(n, k) = \tfrac{n!}{(n - k)!}$ ways.

An unordered choice is a combination. Each committee of $3$ can be put in order in $3! = 6$ ways, so the $720$ ordered choices count each committee $6$ times, and there are $\tfrac{720}{6} = 120$ committees. This number is written $\binom{10}{3}$ ("$10$ choose $3$"), and in general $\binom{n}{k} = \tfrac{n!}{k!\,(n - k)!}$. Choosing the $k$ who are in is the same as choosing the $n - k$ who are out, so $\binom{n}{k} = \binom{n}{n - k}$. A common use: a $12$-sided polygon has $\binom{12}{2} = 66$ segments joining two of its corners, of which $12$ are sides, so it has $54$ diagonals.

The question to ask every time is whether the order matters, that is, whether swapping two chosen objects gives a different outcome. If the jobs are different, it does; if the chosen form a group, it does not.

Some counts can be made in two orders, and the answers must agree. A committee of $4$ with a chair, chosen from $9$ people, can be made by choosing the committee and then its chair, $4 \cdot \binom94 = 4 \cdot 126 = 504$ ways, or the chair first and then the other three, $9 \cdot \binom83 = 9 \cdot 56 = 504$ ways. This is [[committee-chair|the committee–chair identity]], $k\binom nk = n\binom{n-1}{k-1}$, and counting one thing in two ways is a method in its own right.

Ask whether order matters; use $P(n, k)$ if it does and $\binom nk$ if it does not; and when a count can be built in two orders, use the easier one. The next lesson splits hard counts into cases.`,
      related: [
        { card: "multiset-permutations", note: String.raw`arranging objects some of which are alike, such as the letters of a word with repeats (R3.2).` },
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is counted, as the $3!$ above (R3.5).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a committee of $3$ be chosen from $10$ people?`, answer: "120",
          solution: String.raw`Order does not matter, so the count is $\binom{10}{3} = \tfrac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} = 120$.` },
        { q: String.raw`In how many ways can a president, a vice-president and a secretary be chosen from $10$ people, if no one holds two offices?`, answer: "720",
          solution: String.raw`The offices are different, so order matters: $10 \cdot 9 \cdot 8 = 720$.` },
        { q: String.raw`In how many ways can a committee of $4$, one of whom is its chair, be chosen from $9$ people?`, answer: "504",
          solution: String.raw`Choose the chair ($9$ ways), then the other three from the remaining $8$ ($\binom83 = 56$ ways): $9 \cdot 56 = 504$. Choosing the committee first gives the same, $4\binom94 = 4 \cdot 126 = 504$.` },
        { q: String.raw`How many diagonals does a polygon with $12$ sides have?`, answer: "54",
          solution: String.raw`Any two of the $12$ corners are joined by a segment, $\binom{12}{2} = 66$ in all, and $12$ of these are sides. The other $66 - 12 = 54$ are diagonals.` }
      ],
      problems: [
        "2015 AMC 8, Problem 4",
        "2001 AMC 8, Problem 14",
        "2015 AMC 8, Problem 10",
        "2014 AMC 8, Problem 16",
        "2024 AMC 10A, Problem 9"
      ]
    },
    "R1.5": {
      prereq: ["constructive-counting", "permutations-combinations"],
      cards: ["casework-method", "complementary-counting", "elimination-counting"],
      body: String.raw`When the options at one step depend on an earlier choice, a single product no longer works. How many two-digit numbers have digits that add to $9$ or $10$? How many three-digit numbers have at least one $7$? How many games are played in a tournament of $64$ players where every loser is out?

[[casework-method|Casework]] splits the objects into cases that do not overlap and that together cover everything, counts each case, and adds. The cases should be chosen so that each one is easy, often by the value of the most restrictive quantity. Two-digit numbers with digit sum $9$ are $18, 27, \ldots, 90$, nine of them, and with digit sum $10$ they are $19, 28, \ldots, 91$, nine more, so $18$ in all. The danger is overlap or a gap: before adding, check that no object fits two cases and that every object fits one.

[[complementary-counting|Counting the complement]] counts what is not wanted and subtracts from the total. "At least one" is the usual signal. The three-digit numbers with at least one $7$ fall into many cases (a $7$ first, second, third, or in several places), but those with no $7$ are a single product, $8 \cdot 9 \cdot 9 = 648$, so the answer is $900 - 648 = 252$. In the same way, the strings of $4$ letters with at least one repeated letter number $26^4 - 26 \cdot 25 \cdot 24 \cdot 23 = 456976 - 358800 = 98176$.

[[elimination-counting|Counting by what each step removes]] avoids the cases altogether. In a tournament where each game knocks out one player, $64$ players need $63$ games to leave one winner, whatever the bracket looks like: each game removes exactly one player and $63$ must be removed. When every step changes some quantity by the same amount, the number of steps is the total change divided by that amount.

Choose cases that do not overlap and cover everything; when the wanted objects are "at least one", count the others; and when every step removes the same amount, divide. The Summary follows.`,
      related: [
        { card: "inclusion-exclusion", note: String.raw`correcting for overlapping cases instead of avoiding them (R3.5).` },
        { card: "symmetry-probability", note: String.raw`the same complement idea for probabilities (R2.2).` }
      ],
      exercises: [
        { q: String.raw`How many three-digit numbers have at least one digit equal to $7$?`, answer: "252",
          solution: String.raw`There are $900$ three-digit numbers, of which $8 \cdot 9 \cdot 9 = 648$ have no $7$. So $900 - 648 = 252$ have at least one.` },
        { q: String.raw`In a tournament, each game is between two players and the loser is out. How many games are needed to find a winner among $64$ players?`, answer: "63",
          solution: String.raw`Each game removes exactly one player, and $63$ players must be removed, so $63$ games are played.` },
        { q: String.raw`How many two-digit numbers have digits that add to $9$ or to $10$?`, answer: "18",
          solution: String.raw`Digit sum $9$: $18, 27, 36, 45, 54, 63, 72, 81, 90$, nine numbers. Digit sum $10$: $19, 28, 37, 46, 55, 64, 73, 82, 91$, nine more. The cases do not overlap, so $18$.` },
        { q: String.raw`How many strings of $4$ letters, each from $A$ to $Z$, have at least one letter that appears more than once?`, answer: "98176",
          solution: String.raw`All strings: $26^4 = 456976$. Strings with four different letters: $26 \cdot 25 \cdot 24 \cdot 23 = 358800$. The rest have a repeat: $456976 - 358800 = 98176$.` }
      ],
      problems: [
        "2004 AMC 8, Problem 5",
        "2016 AMC 8, Problem 17",
        "2009 AMC 8, Problem 22",
        "2005 AMC 8, Problem 21",
        "2000 AMC 8, Problem 7",
        "2023 AMC 10A, Problem 9"
      ]
    },
    "R1.6": {
      prereq: ["organized-listing", "fencepost-counting", "constructive-counting", "counting-functions", "permutations-combinations", "committee-chair", "casework-method", "complementary-counting", "elimination-counting"],
      cards: [],
      body: String.raw`[[organized-listing|An organized list]] gives every object one place in a fixed order, so that a gap would show. [[fencepost-counting|The fencepost rule]]: from $a$ to $b$ there are $b - a + 1$ numbers, and a straight fence has one more post than gaps.

[[constructive-counting|Constructive counting]] builds an object by a sequence of choices and multiplies; separate groups are added. [[counting-functions|Each of $n$ objects given one of $k$ labels]] gives $k^n$ ways.

[[permutations-combinations|Ordered choices]] number $P(n, k) = \tfrac{n!}{(n-k)!}$ and unordered ones $\binom nk = \tfrac{n!}{k!(n-k)!}$. [[committee-chair|Counting a committee with a chair in two orders]] gives $k\binom nk = n\binom{n-1}{k-1}$.

[[casework-method|Casework]] splits into cases that do not overlap and cover everything. [[complementary-counting|The complement]] handles "at least one". [[elimination-counting|Counting what each step removes]] gives the number of steps directly.`,
      strategies: [
        String.raw`List in an order that gives every object exactly one place, such as smallest part first.`,
        String.raw`At the ends of a run, ask whether you are counting posts or gaps, and whether the ends are included.`,
        String.raw`Fill the most restricted position first.`,
        String.raw`Ask whether swapping two chosen objects gives a different outcome; if not, divide out the order.`,
        String.raw`Before adding cases, check that they do not overlap and that they cover everything.`,
        String.raw`When the question says "at least one", count the objects with none and subtract.`,
        String.raw`If every step changes a quantity by the same amount, count the steps by dividing the total change.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many orders can $5$ different books be placed on a shelf?`, answer: "120",
        solution: String.raw`$5$ choices for the first place, $4$ for the second, and so on: $5! = 120$.` },
      { q: String.raw`How many integers from $1$ to $100$ are divisible by neither $2$ nor $5$?`, answer: "40",
        solution: String.raw`The $50$ odd numbers include the odd multiples of $5$: $5, 15, \ldots, 95$, ten of them. So $50 - 10 = 40$.` },
      { q: String.raw`Each of $8$ people shakes hands once with each of the others. How many handshakes are there?`, answer: "28",
        solution: String.raw`Each handshake is an unordered pair of people: $\binom82 = 28$.` },
      { q: String.raw`How many subsets of $\{1, 2, 3, 4, 5, 6\}$ contain at least one of $1$ and $2$?`, answer: "48",
        solution: String.raw`There are $2^6 = 64$ subsets, and those containing neither $1$ nor $2$ are the $2^4 = 16$ subsets of $\{3, 4, 5, 6\}$. So $64 - 16 = 48$.` },
      { q: String.raw`How many three-digit numbers have digits that strictly increase from left to right?`, answer: "84",
        solution: String.raw`The digits are three different digits from $1$ to $9$ ($0$ cannot come first, and an increasing number cannot have $0$ later). Any three digits can be arranged in increasing order in exactly one way, so the count is $\binom93 = 84$.` }
    ],
    problems: [
      "2016 AMC 8, Problem 18",
      "2002 AMC 10B, Problem 9",
      "2024 AMC 10B, Problem 17",
      "2025 AMC 10A, Problem 12"
    ]
  },
  challenge: {
    problems: [
      "2017 AMC 10B, Problem 18",
      "2023 AMC 10A, Problem 20",
      "2023 AMC 12B, Problem 8",
      "2024 AMC 10B, Problem 20"
    ]
  }
};
