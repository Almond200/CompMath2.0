// Learn, AMC Counting & Probability, chapter R1: counting from scratch (CONVENTIONS §14). Part: Foundations.
// Content revision: connected explanations, explicit counting/probability models, and checked solutions.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["R1"] = {
  lessons: {
    "R1.1": {
      prereq: [],
      cards: [],
      body: String.raw`A counting problem specifies a collection of objects and asks how many different members it contains. The word different depends on the problem. A group of three students is unchanged when their names are read in another order, but assigning those students three different offices creates different outcomes when their jobs are exchanged.

A complete count includes every allowed object exactly once. Small collections can be listed directly. Larger ones need an organization that makes missing or repeated objects impossible: a fixed order, a sequence of choices, or a division into separate cases.

Even a short run of integers illustrates the need to identify what is being counted. From fifteen to eighty-three, inclusive, there are sixty-eight steps of size one but sixty-nine integers. The first integer is present before any step is taken, giving $83-15+1=69$ members.

A staged choice can count many objects without writing them out. With four shirts, three pairs of pants, and two hats, an outfit consisting of one of each is specified by three choices. Every shirt permits the same three pants choices and every resulting pair permits the same two hats, giving $4\cdot3\cdot2=24$ outfits. This assumes that all the stated combinations are allowed and that different item choices make different outfits.

Sometimes excluding unwanted objects is easier than building the wanted ones. Among the nine hundred three-digit integers, those with no digit seven have eight choices for the first digit and nine for each later digit: $8\cdot9\cdot9=648$. The remaining $900-648=252$ integers contain at least one seven. The two groups are disjoint and together cover every three-digit integer.

The chapter develops listing, staged choices, ordered and unordered selections, cases, and complements. Each method needs a reason that its descriptions match the objects being counted. That correspondence, rather than the length of the calculation, is what makes a count complete.`,
      exercises: [
        { q: String.raw`How many integers are there from $15$ to $83$, inclusive?`, answer: "69",
          solution: String.raw`Starting at fifteen, sixty-eight steps of size one reach eighty-three. The starting integer must also be counted, so the inclusive run contains $83-15+1=69$ integers. Equivalently, subtract the fourteen positive integers below fifteen from the first eighty-three positive integers.` },
        { q: String.raw`Sam has $4$ shirts, $3$ pairs of pants and $2$ hats. An outfit is one of each. How many outfits are there?`, answer: "24",
          solution: String.raw`Choose a shirt in four ways. Each chosen shirt can be paired with any of the three pants, giving twelve shirt-pants pairs. Each pair allows either hat, so the number of complete outfits is $4\cdot3\cdot2=24$. Each outfit determines exactly these three choices.` },
        { q: String.raw`How many three-digit numbers have no digit equal to $7$?`, answer: "648",
          solution: String.raw`The first digit is one of the eight members of $\{1,2,3,4,5,6,8,9\}$. Each remaining digit may be any decimal digit except seven, giving nine choices in each position, including zero. These three choices determine one integer, so the count is $8\cdot9\cdot9=648$.` }
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
      body: String.raw`An [[organized-listing|organized list]] assigns each allowed object one position in a systematic order. The ordering should also explain where the list begins and ends. Otherwise a list can look plausible while omitting a final case or counting an object in two forms.

For sums of three positive integers in which order does not matter, write the terms as $a\le b\le c$. Sorting gives one representative of every unordered sum, including sums with equal terms. If $a+b+c=12$, then $3a\le12$, so the possible smallest terms are $a=1,2,3,4$.

For fixed $a$, substitute $c=12-a-b$. The order conditions become

$$a\le b\le\left\lfloor\frac{12-a}{2}\right\rfloor.$$

At $a=1$, the possible $b$ values are one through five, giving $(1,1,10)$ through $(1,5,6)$. At $a=2$, the four possibilities are $(2,2,8),(2,3,7),(2,4,6),(2,5,5)$. At $a=3$ there are $(3,3,6),(3,4,5)$, and at $a=4$ there is $(4,4,4)$. Thus there are $5+4+2+1=12$ sums.

The bound on $a$ proves that no later row is needed. The interval for $b$ proves that each row is complete, and $c$ is then forced. Sorting would be inappropriate if the problem counted ordered triples: for example, $(1,2,9)$ and $(2,1,9)$ would then be different objects.

Endpoints require similar care. For integers $a\le b$, the run $a,a+1,\ldots,b$ has $b-a$ steps and $b-a+1$ terms. This is [[fencepost-counting|the fencepost principle]]. A straight fence with a post at each end has one more post than gaps, while on a closed loop each post begins one gap and the numbers are equal.

The diagram compares four gaps in an open line and in a closed loop. Closing the last gap identifies the two endpoints instead of creating another post.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 270" role="img" aria-labelledby="r12-posts-title r12-posts-desc" style="width:100%;max-width:520px;height:auto"><title id="r12-posts-title">Four gaps need five posts on a line but four on a loop</title><desc id="r12-posts-desc">An open line has five marked posts joined by four gaps. A closed loop has four marked posts and four gaps, since the last gap returns to the first post.</desc><g fill="none" stroke="currentColor" stroke-width="2"><path d="M35 115H235"/><path d="M380 55L445 115L380 175L315 115Z"/></g><g fill="currentColor"><circle cx="35" cy="115" r="5"/><circle cx="85" cy="115" r="5"/><circle cx="135" cy="115" r="5"/><circle cx="185" cy="115" r="5"/><circle cx="235" cy="115" r="5"/><circle cx="380" cy="55" r="5"/><circle cx="445" cy="115" r="5"/><circle cx="380" cy="175" r="5"/><circle cx="315" cy="115" r="5"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="135" y="28">Open line</text><text x="380" y="28">Closed loop</text><text x="135" y="75">4 gaps</text><text x="380" y="122">4 gaps</text><text x="135" y="215">5 posts</text><text x="380" y="215">4 posts</text><text x="260" y="253">Count the gaps before counting the posts.</text></g></svg>

A one-hundred-meter fence with every gap exactly four meters long has twenty-five gaps and twenty-six posts. A four-hundred-meter closed track with every gap eight meters long has fifty gaps and fifty posts. These divisions are integers. If an open fence's length is not a multiple of the required spacing, equal gaps of exactly that length cannot also put a post at both endpoints; a rule allowing a shorter final gap would be a different condition.

A spaced numerical list can be counted by its indices. The multiples of seven from one hundred through five hundred are $7k$ with $15\le k\le71$, since $7\cdot15=105$ and $7\cdot71=497$. Each index gives one multiple, so the count is $71-15+1=57$. The difference between the endpoint values is not itself the number of terms.`,
      related: [
        { card: "floor-multiples", note: String.raw`counting the multiples of $k$ up to $n$ as $\lfloor \tfrac nk \rfloor$ (M1.5).` },
        { card: "partitions", note: String.raw`sums in which order does not matter, studied further in R4.2.` }
      ],
      exercises: [
        { q: String.raw`A straight fence is $100$ meters long, with a post at each end and a post every $4$ meters. How many posts are there?`, answer: "26",
          solution: String.raw`The one-hundred-meter length divides into $100/4=25$ gaps of four meters. An open fence with posts at both ends has one more post than gaps: twenty-six. The post positions are $0,4,8,\ldots,100$, whose indices run from zero through twenty-five.` },
        { q: String.raw`Posts are placed every $8$ meters around a circular track $400$ meters long. How many posts are there?`, answer: "50",
          solution: String.raw`The full circuit has $400/8=50$ gaps. On a loop, each post starts exactly one gap, including the gap that returns to the initial post. Hence there are fifty posts. Listing positions from zero through three hundred ninety-two in steps of eight counts the initial post once; the position four hundred is that same post.` },
        { q: String.raw`In how many ways can $12$ be written as a sum of three positive integers, if the order of the three does not matter?`, answer: "12",
          solution: String.raw`Sort the three parts as $a\le b\le c$. Since $3a\le12$, the smallest part is one through four. For fixed $a$, choose $b$ in the integer interval $a\le b\le\lfloor(12-a)/2\rfloor$, and $c=12-a-b$ is forced. These rows have five, four, two, and one possibilities, respectively, for a total of twelve. The sorted representative makes the cases disjoint, including when parts are equal.` },
        { q: String.raw`How many multiples of $7$ are there between $100$ and $500$?`, answer: "57",
          solution: String.raw`Writing each multiple as $7k$, the inequalities $100\le7k\le500$ give $15\le k\le71$. The endpoint multiples are $105$ and $497$. There are $71-15+1=57$ integer indices, and each index specifies one multiple. Since neither endpoint is itself divisible by seven, an inclusive or strict interpretation of the two endpoints gives the same count here.` }
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
      body: String.raw`A staged construction counts objects by the histories of choices that produce them. It works when every allowed object has exactly one such history. This is [[constructive-counting|constructive counting]]: choose what to record, count the permitted choices, and verify that completing the choices specifies one object without duplication.

If there are $m$ first choices and every first choice permits $n$ second choices, then each of the $m$ groups contains $n$ complete histories. Their total is $mn$. Repeating this argument gives the multiplication principle for any finite sequence of stages with fixed numbers of choices at each stage.

The actual options may depend on earlier choices; their number must remain constant for a single product to apply. Choosing two different students from four for two different offices gives four choices and then three, even though the identity of the unavailable student varies. This count is $4\cdot3=12$.

When the number of continuations varies, count each branch and add. In the diagram, an initial letter $A$ allows labels one or two, while $B$ allows one, two, or three. There are five complete objects, not six. The repeated labels at the ends are different objects because the initial letter is part of the record.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" role="img" aria-labelledby="r13-tree-title r13-tree-desc" style="width:100%;max-width:520px;height:auto"><title id="r13-tree-title">Unequal branch lengths are added</title><desc id="r13-tree-desc">A first choice A has completions A1 and A2. A first choice B has completions B1, B2, and B3. The complete count is two plus three, or five.</desc><g fill="none" stroke="currentColor" stroke-width="1.3"><path d="M80 140L200 75M80 140L200 205M230 75L360 45M230 75L360 105M230 205L360 160M230 205H360M230 205L360 250"/></g><g fill="currentColor" font-size="17"><text x="25" y="146">Start</text><text x="210" y="81">A</text><text x="210" y="211">B</text><text x="375" y="51">A1</text><text x="375" y="111">A2</text><text x="375" y="166">B1</text><text x="375" y="211">B2</text><text x="375" y="256">B3</text><text x="260" y="24" text-anchor="middle">2 completions + 3 completions = 5</text></g></svg>

For license plates with two letters from a twenty-six-letter alphabet followed by three decimal digits, assume repetition is allowed and leading zeros in the digit block are allowed. Every sequence describes one plate, so the count is $26^2\cdot10^3=676000$. Restrictions on repeated letters or the initial digit would change the available choices.

A four-digit integer using only odd digits has five choices in each position, giving $5^4=625$. No separate leading-zero exclusion is needed because zero is not one of the allowed digits. In contrast, for arbitrary four-digit integers the first position has nine choices and later positions have ten.

The addition principle counts a collection split into disjoint groups: every object belongs to exactly one group, so the group sizes add. Positive palindromes below one thousand split by their number of digits. There are nine one-digit palindromes, nine two-digit palindromes $aa$, and $9\cdot10=90$ three-digit palindromes $aba$. Thus the total is $9+9+90=108$. A palindrome here is written in its usual numeral form, without leading zeros.

Assigning each member of one set a member of another is [[counting-functions|counting functions]]. For $n$ distinct inputs and $k\ge1$ distinct output labels, each input has $k$ unrestricted choices, giving $k^n$ functions. Outputs may be repeated and some labels may be unused. In particular, assigning each of three students exactly one of four clubs gives $4^3=64$ assignments, even when several join the same club.

If no two students may share a club, the count becomes $4\cdot3\cdot2=24$. If every club must have a student, neither product solves the problem as stated; in this example that requirement is impossible with only three students. The restrictions on assignments are as important as the sizes of the two sets.`,
      related: [
        { card: "casework-method", note: String.raw`splitting into groups when the options at one step depend on an earlier choice (R1.5).` },
        { card: "palindromes", note: String.raw`palindromes and their digit conditions (M2.3).` }
      ],
      exercises: [
        { q: String.raw`A license plate has two letters, each from a $26$-letter alphabet, followed by three decimal digits. Repetition and a leading zero in the digit block are allowed. How many plates are possible?`, answer: "676000",
          solution: String.raw`Under the stated repetition and digit-block rules, each letter position has twenty-six choices and each digit position has ten. The positions are recorded separately, so there is one construction history for each plate. The multiplication principle gives $26^2\cdot10^3=676\cdot1000=676000$.` },
        { q: String.raw`How many four-digit numbers have only odd digits?`, answer: "625",
          solution: String.raw`Each digit is one of $1,3,5,7,9$. There are five choices independently at each position, and all are nonzero, so every resulting string is a four-digit integer. Thus the count is $5^4=625$. Repetitions such as the same digit in several positions are allowed.` },
        { q: String.raw`Each of $3$ students joins exactly one of $4$ clubs. In how many ways can this happen?`, answer: "64",
          solution: String.raw`The students are distinct and each must be assigned exactly one of the four labelled clubs. Each of the three assignments has four unrestricted choices, giving $4^3=64$. The same club may be chosen by several students and a club may be unused, so no choices are removed after an earlier assignment.` },
        { q: String.raw`How many positive integers less than $1000$ are palindromes?`, answer: "108",
          solution: String.raw`Split into disjoint cases by digit length. Each of the nine positive one-digit integers is a palindrome. A two-digit palindrome is $aa$ with nine choices for nonzero $a$. A three-digit palindrome is $aba$ with nine choices for $a$ and ten for $b$, giving ninety. These cases cover exactly the positive integers below one thousand, so the total is $9+9+90=108$.` }
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
      body: String.raw`Selecting distinct objects for different roles gives an ordered selection, called a permutation. Selecting only the group gives an unordered selection, called a combination. The distinction concerns the final object: exchanging a president and secretary changes the assignment, while exchanging two names in a list of committee members does not change the committee.

For $n$ distinct objects and an integer $k$ with $0\le k\le n$, an ordered selection without replacement has $n$ choices in the first position, $n-1$ in the next, and so on. Hence [[permutations-combinations|the permutation count]] is

$$P(n,k)=n(n-1)\cdots(n-k+1)=\frac{n!}{(n-k)!}.$$

The notation $n!$ means the product of the positive integers through $n$, with $0!=1$. The empty selection, when $k=0$, has exactly one possible history. Arranging every object is the case $k=n$, giving $n!$ orders. Thus five different books have $5!=120$ shelf orders, and three different offices assigned among ten people have $10\cdot9\cdot8=720$ outcomes.

To count groups of $k$, first count the ordered selections. Each chosen group produces exactly $k!$ different orders because its members are distinct. Dividing by this uniform number of descriptions gives

$$\binom nk=\frac{n!}{k!(n-k)!}.$$

For three members from ten people, each committee is described by six ordered selections, so the count is $720/6=120$. The diagram shows one such group and its six histories. Dividing by six is valid because every group has the same six histories.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 275" role="img" aria-labelledby="r14-orders-title r14-orders-desc" style="width:100%;max-width:520px;height:auto"><title id="r14-orders-title">Six orders describe one three-member group</title><desc id="r14-orders-desc">ABC, ACB, BAC, BCA, CAB, and CBA all describe the same unordered group A B C. Each group of three distinct members has exactly six such orders.</desc><g fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"><path d="M180 55L330 142"/><path d="M180 90L330 142"/><path d="M180 125L330 142"/><path d="M180 160L330 142"/><path d="M180 195L330 142"/><path d="M180 230L330 142"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="120" y="25">Ordered choices</text><text x="405" y="100">One group</text><text x="120" y="61">ABC</text><text x="120" y="96">ACB</text><text x="120" y="131">BAC</text><text x="120" y="166">BCA</text><text x="120" y="201">CAB</text><text x="120" y="236">CBA</text><text x="405" y="148">{A, B, C}</text><text x="405" y="192">3! = 6 histories</text><text x="260" y="265">An unordered choice forgets the ordering.</text></g></svg>

If repeated objects are allowed, or a construction describes some objects more times than others, the same division is not automatically valid. The factor being divided out must be established from the correspondence. For a group with distinct members, choosing those included also specifies those excluded, so $\binom nk=\binom n{n-k}$.

A geometric count can use the same idea. Any two of twelve distinct polygon vertices specify one vertex pair, giving $\binom{12}{2}=66$ pairs. Twelve pairs are adjacent vertices, producing sides; the other fifty-four produce diagonals. This counts diagonals by their endpoint pairs, even if several drawn diagonals pass through one intersection point.

A committee with one distinguished chair can be built in two orders. For nine people and a four-member committee, choose the group and then its chair: $\binom94\cdot4=126\cdot4=504$. Alternatively, choose the chair first and then the other three members: $9\binom83=9\cdot56=504$.

The two procedures describe the same objects once each, proving [[committee-chair|the committee-chair identity]]

$$k\binom nk=n\binom{n-1}{k-1}\qquad(1\le k\le n).$$

One procedure may be easier than the other, but neither changes whether the remaining committee members are ordered. Distinguished roles and ordinary group membership must be recorded separately.`,
      related: [
        { card: "multiset-permutations", note: String.raw`arranging objects some of which are alike, such as the letters of a word with repeats (R3.2).` },
        { card: "uniform-overcount", note: String.raw`dividing by the number of times each object is counted, as the $3!$ above (R3.5).` }
      ],
      exercises: [
        { q: String.raw`In how many ways can a committee of $3$ be chosen from $10$ people?`, answer: "120",
          solution: String.raw`An ordered selection of three different people has $10\cdot9\cdot8=720$ descriptions. Each committee is described by exactly $3!=6$ orders of its three members. Dividing this uniform overcount gives $720/6=120$ committees. No member can be chosen twice.` },
        { q: String.raw`In how many ways can a president, a vice-president and a secretary be chosen from $10$ people, if no one holds two offices?`, answer: "720",
          solution: String.raw`Choose the president in ten ways, the vice-president among the nine remaining people, and the secretary among the eight then remaining. Each complete history specifies a different assignment to the three distinct offices. Thus there are $10\cdot9\cdot8=720$ assignments; no division by $3!$ is appropriate because the offices remain different.` },
        { q: String.raw`In how many ways can a committee of $4$, one of whom is its chair, be chosen from $9$ people?`, answer: "504",
          solution: String.raw`Choose the chair first in nine ways. Choose the other three members as an unordered subset of the remaining eight, in $\binom83=56$ ways. This gives $9\cdot56=504$ outcomes. As a check, choosing the four-member group first and then its chair gives $\binom94\cdot4=126\cdot4=504$, with both procedures recording the same committee and distinguished chair.` },
        { q: String.raw`How many diagonals does a polygon with $12$ sides have?`, answer: "54",
          solution: String.raw`Each unordered pair of twelve vertices specifies one endpoint pair, giving $\binom{12}{2}=12\cdot11/2=66$ pairs. Twelve pairs are consecutive vertices and form polygon sides. Removing them leaves $66-12=54$ diagonals. Intersections among the drawn diagonals do not identify their different endpoint pairs.` }
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
      body: String.raw`A case split partitions a collection into groups that are disjoint and together include every permitted object. In [[casework-method|casework]], each group is counted separately and the counts are added. A useful split makes the number of continuations uniform within each case, even when a single product would not count the whole collection.

Two-digit numbers with digit sum nine have the form $10a+b$, where $1\le a\le9$ and $b=9-a$. All nine values of $a$ give an allowed units digit. For digit sum ten, $b=10-a$ also gives nine possibilities. These two cases are disjoint because a number has only one digit sum, so the total is eighteen.

An overlapping description needs more care. To count three-digit numbers containing seven, adding the counts for a seven in the first, second, and third positions repeats numbers with several sevens. Instead, classify by the position of the first seven. There are $100$ with the first digit seven, $8\cdot10=80$ with the first seven in the second position, and $8\cdot9=72$ with the first seven in the third. These disjoint cases give $100+80+72=252$.

[[complementary-counting|Counting the complement]] reaches the same answer by changing which group is counted. In a finite collection of size $N$, if $u$ objects are unwanted, then $N-u$ are wanted. The ambient collection must be specified: here it is the nine hundred integers from one hundred through nine hundred ninety-nine, without leading zeros.

A number in this collection with no seven has eight first-digit choices and nine choices for each later digit. Therefore the wanted count is $900-8\cdot9\cdot9=900-648=252$. This subtraction excludes all unwanted objects once, including those with other repeated digits, without needing a separate classification of how many sevens occur.

For four-letter strings from a twenty-six-letter alphabet, repetitions are allowed in the total $26^4=456976$. Its complement, strings with no repeated letter, has $26\cdot25\cdot24\cdot23=358800$ members. Thus $98176$ strings have a letter appearing at least twice. This counts strings, not sets of letters, so changing a position can change the object.

A process may be counted by a quantity that changes at every step. In [[elimination-counting|counting eliminations]], a game removes one active participant from a single-elimination tournament. Starting with sixty-four and ending with one requires sixty-three removals, hence sixty-three games. The bracket and any byes affect when games occur, not the number of eliminations required.

More generally, if each step decreases a quantity by exactly $d\gt0$ and the process goes from $Q_0$ to $Q_f$, then $t$ steps satisfy $Q_f=Q_0-dt$, giving $t=(Q_0-Q_f)/d$. This assumes that the process really reaches that endpoint and that every counted step has the stated effect. A tournament with replays, drawn games, or returning eliminated players would require a different accounting.`,
      related: [
        { card: "inclusion-exclusion", note: String.raw`correcting for overlapping cases instead of avoiding them (R3.5).` },
        { card: "symmetry-probability", note: String.raw`the same complement idea for probabilities (R2.2).` }
      ],
      exercises: [
        { q: String.raw`How many three-digit numbers have at least one digit equal to $7$?`, answer: "252",
          solution: String.raw`The ambient set has nine hundred three-digit integers. Those without seven have eight choices for the nonzero first digit and nine choices for each later digit, so there are $8\cdot9\cdot9=648$. Subtracting the complementary group leaves $900-648=252$. Every three-digit integer belongs to exactly one of these two groups.` },
        { q: String.raw`In a tournament, each game is between two players and the loser is out. How many games are needed to find a winner among $64$ players?`, answer: "63",
          solution: String.raw`Exactly one active player is eliminated by each game. To leave one winner from sixty-four entrants, sixty-three players must be eliminated. Therefore sixty-three games are needed, regardless of how the bracket is arranged. The count assumes the stated elimination rule and no returning eliminated player.` },
        { q: String.raw`How many two-digit numbers have digits that add to $9$ or to $10$?`, answer: "18",
          solution: String.raw`For digit sum nine, the tens digit can be any integer one through nine, and the units digit is then $9-a$, always allowed. For digit sum ten, the same nine tens-digit choices give units digit $10-a$, also allowed. A number cannot have both sums, so the two nine-member cases add to eighteen.` },
        { q: String.raw`How many strings of $4$ letters, each from $A$ to $Z$, have at least one letter that appears more than once?`, answer: "98176",
          solution: String.raw`There are $26^4=456976$ total four-letter strings, with repetition allowed. The complement consists of strings with all four letters different, which have $26\cdot25\cdot24\cdot23=358800$ choices. Thus $456976-358800=98176$ strings have at least one repeat. The subtraction avoids overlapping cases for repeats in several positions.` }
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
      body: String.raw`A count starts by deciding what constitutes one object. Sorting can choose a unique representative of an unordered sum, while a sequence of decisions can specify a labelled arrangement or assignment. The construction is complete only when every permitted object appears and none has more than its intended number of descriptions.

The multiplication principle counts staged constructions with a fixed number of continuations at each stage. The available objects may change with earlier choices while the number of options remains fixed. When branch sizes differ, add the counts of disjoint branches. An inclusive numerical run counts one more term than steps; an open line and a closed loop have different endpoint accounting.

Permutations count ordered selections of distinct objects without replacement. Combinations forget the order by dividing by the common number of orderings of each selected group. The uniformity of that overcount is the justification for the division. A committee with a chair illustrates how two constructions can describe the same collection in different orders.

Casework must cover every object exactly once. A complement instead counts an unwanted group within a clearly specified total. For a process, counting a fixed change per step can determine the number of steps directly. Every method rests on a precise correspondence between the description being counted and the final objects.`,
      strategies: [
        String.raw`List in an order that gives every object exactly one place, such as smallest part first.`,
        String.raw`At the ends of a run, ask whether you are counting posts or gaps, and whether the ends are included.`,
        String.raw`Fill the most restricted position first.`,
        String.raw`Decide whether order matters; divide out extra descriptions only after proving that every object has the same number of them.`,
        String.raw`Before adding cases, check that they do not overlap and that they cover everything.`,
        String.raw`When the question says "at least one", count the objects with none and subtract.`,
        String.raw`If every step changes a quantity by the same amount, count the steps by dividing the total change.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`In how many orders can $5$ different books be placed on a shelf?`, answer: "120",
        solution: String.raw`The five different books can fill the first through fifth shelf positions in $5,4,3,2,1$ ways. Their product is $5!=120$. Each final ordering uniquely determines those position choices, and swapping two different books changes the order.` },
      { q: String.raw`How many integers from $1$ to $100$ are divisible by neither $2$ nor $5$?`, answer: "40",
        solution: String.raw`First keep the fifty odd integers from one through ninety-nine, thereby excluding multiples of two. The odd multiples of five among them are $5,15,\ldots,95$, a run of ten integers. Removing those leaves $50-10=40$ integers divisible by neither two nor five. This removes each unwanted odd multiple once.` },
      { q: String.raw`Each of $8$ people shakes hands once with each of the others. How many handshakes are there?`, answer: "28",
        solution: String.raw`An ordered pair of different people has $8\cdot7=56$ possibilities. Each handshake appears twice, once from each participant's perspective, and no handshake has only one such description. Hence the number of handshakes is $56/2=28$, equivalently $\binom82$.` },
      { q: String.raw`How many subsets of $\{1, 2, 3, 4, 5, 6\}$ contain at least one of $1$ and $2$?`, answer: "48",
        solution: String.raw`Each of the six elements is either included or excluded, giving $2^6=64$ subsets. Those containing neither one nor two are precisely the $2^4=16$ subsets of the other four elements. The requested complement therefore has $64-16=48$ members, including subsets containing both one and two.` },
      { q: String.raw`How many three-digit numbers have digits that strictly increase from left to right?`, answer: "84",
        solution: String.raw`The digits must be distinct. Zero cannot occur: if it were included, strict increase would put it first, which would not form a three-digit integer. Choose any three digits from one through nine, then put them in their unique increasing order. The resulting correspondence gives $\binom93=9\cdot8\cdot7/(3\cdot2)=84$ integers.` }
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
