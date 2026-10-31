// Learn, AMC Algebra, chapter L6: sequences and series (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L6"] = {
  lessons: {
    "L6.1": {
      prereq: ["square-of-sum"],
      cards: [],
      body: String.raw`This chapter studies sequences, lists of numbers given by a rule, and series, their sums. Its tools are the formulas for arithmetic and geometric sequences, the sums of powers, sequences defined step by step and the periods they fall into, and sums that collapse when each term is written as a difference.

An arithmetic sequence adds the same number each time: $3, 7, 11, \ldots$ adds $4$, so its $20$th term is $3 + 19 \cdot 4 = 79$. Its sum is the number of terms times the average of the first and last. A geometric sequence multiplies by the same number each time: $1, 2, 4, \ldots$ doubles, and $1 + 2 + 4 + \cdots + 2^9 = 2^{10} - 1 = 1023$, because adding $1$ doubles the sum step by step.

Some sequences are defined by a rule that gives each term from the ones before it, a recursion. Often the terms repeat after a while, and finding the period turns the $1000$th term into an early one.

Last, a sum telescopes when each term is a difference of consecutive values of something, so that almost everything cancels: $\tfrac{1}{k(k + 1)} = \tfrac1k - \tfrac{1}{k + 1}$, so $\sum_{k=1}^{9} \tfrac{1}{k(k + 1)} = 1 - \tfrac1{10} = \tfrac{9}{10}$.

The lessons take these ideas in turn: arithmetic sequences and triangular numbers (L6.2), geometric sequences and power sums (L6.3), recursive and periodic sequences (L6.4), and telescoping and clever sums (L6.5). The Summary (L6.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the $20$th term of $3, 7, 11, 15, \ldots$`, answer: "79",
          solution: String.raw`Each term adds $4$, and the $20$th term is $19$ steps after the first: $3 + 19 \cdot 4 = 79$.` },
        { q: String.raw`Find $1 + 2 + 4 + \cdots + 2^9$.`, answer: "1023",
          solution: String.raw`A geometric sum with ratio $2$: $\tfrac{2^{10} - 1}{2 - 1} = 1023$.` },
        { q: String.raw`Find $\dfrac{1}{1 \cdot 2} + \dfrac{1}{2 \cdot 3} + \cdots + \dfrac{1}{9 \cdot 10}$.`, answer: "9/10",
          solution: String.raw`Each term is $\tfrac1k - \tfrac{1}{k + 1}$, so the sum telescopes to $1 - \tfrac1{10} = \tfrac{9}{10}$.` }
      ],
      problems: [
        "2002 AMC 10B, Problem 19",
        "2003 AMC 10B, Problem 8",
        "2008 AMC 10A, Problem 5"
      ]
    },
    "L6.2": {
      prereq: [],
      cards: ["arithmetic-series", "triangular-numbers"],
      body: String.raw`Many problems contain a list of numbers that rise by a fixed step: seats in rows that grow by $3$, chimes that increase by one each hour, the odd numbers. What is the $20$th term? How many terms are there from $5$ to $302$ in steps of $3$? What is their sum? An arithmetic sequence answers all of these with two formulas.

An arithmetic sequence has a first term $a$ and a common difference $d$, and its $n$th term is $a + (n - 1)d$: $n - 1$ steps after the first. Two terms fix the sequence: if $a_5 = 17$ and $a_{12} = 45$, the $7$ steps between them add $28$, so $d = 4$, $a_1 = 1$ and $a_{20} = 77$. The number of terms from $5$ to $302$ in steps of $3$ is $\tfrac{302 - 5}{3} + 1 = 100$: the number of steps plus one, the same count as fenceposts.

[[arithmetic-series|The sum of an arithmetic sequence]] is the number of terms times the average of the first and last, $\tfrac{n(a_1 + a_n)}{2}$, because pairing the first with the last, the second with the second-to-last, and so on, gives equal pairs. The first $50$ odd numbers add to $50 \cdot \tfrac{1 + 99}{2} = 2500 = 50^2$. The middle term of an arithmetic sequence is the average of its neighbors, and three numbers are in arithmetic order exactly when $2b = a + c$.

[[triangular-numbers|The triangular numbers]] $T_n = 1 + 2 + \cdots + n = \tfrac{n(n + 1)}{2}$ count dots in a triangle and handshakes among $n + 1$ people; $T_{100} = 5050$. They appear whenever a quantity grows by $1$ each step, and so in counting rows, chimes and pairs.

Use the term formula to find positions and counts, and the pairing formula for sums. The next lesson turns to sequences that multiply.`,
      related: [
        { card: "fencepost-counting", note: String.raw`the number of terms is the number of steps plus one.` },
        { card: "handshakes-diagonals", note: String.raw`$\binom n2$, a triangular number, counts the pairs among $n$ people.` }
      ],
      exercises: [
        { q: String.raw`Find the sum of the first $50$ odd numbers.`, answer: "2500",
          solution: String.raw`There are $50$ terms from $1$ to $99$, with average $\tfrac{1 + 99}{2} = 50$, so the sum is $50 \cdot 50 = 2500$.` },
        { q: String.raw`An arithmetic sequence has $a_5 = 17$ and $a_{12} = 45$. Find $a_{20}$.`, answer: "77",
          solution: String.raw`Seven steps add $45 - 17 = 28$, so $d = 4$. Then $a_{20} = a_{12} + 8 \cdot 4 = 77$.` },
        { q: String.raw`How many terms does the sequence $5, 8, 11, \ldots, 302$ have?`, answer: "100",
          solution: String.raw`The steps of $3$ cover $302 - 5 = 297$, which is $99$ steps, so there are $99 + 1 = 100$ terms.` }
      ],
      problems: [
        "2024 AMC 10B, Problem 5",
        "2025 AMC 10A, Problem 5",
        "2002 AMC 12B, Problem 9",
        "2023 AMC 10A, Problem 15"
      ]
    },
    "L6.3": {
      prereq: ["exponent-laws"],
      cards: ["geometric-series", "power-sums"],
      body: String.raw`When each term is a fixed multiple of the one before, as in a population that doubles or a square repeatedly halved, the list is a geometric sequence. What is $2 + 6 + 18 + \cdots + 2 \cdot 3^6$? What does $1 - \tfrac13 + \tfrac19 - \cdots$ add to? And what is $1^2 + 2^2 + \cdots + 10^2$? The first two are geometric sums; the third is a power sum, with its own formula.

A geometric sequence has first term $a$ and ratio $r$, and its $n$th term is $ar^{n-1}$. Three numbers $a, b, c$ are in geometric order exactly when $b^2 = ac$, so the middle term is the geometric mean of its neighbors. [[geometric-series|The geometric sum]] is $a + ar + \cdots + ar^{n-1} = a\tfrac{r^n - 1}{r - 1}$, found by multiplying the sum by $r$ and subtracting: almost every term cancels. So $2 + 6 + \cdots + 2 \cdot 3^6 = 2 \cdot \tfrac{3^7 - 1}{2} = 2186$. When $|r| \lt 1$ the terms shrink to $0$ and the infinite sum is $\tfrac{a}{1 - r}$: $1 - \tfrac13 + \tfrac19 - \cdots = \tfrac{1}{1 + 1/3} = \tfrac34$. Repeating decimals and repeated shading in figures are infinite geometric sums.

[[power-sums|The sums of powers]] have closed forms: $1 + 2 + \cdots + n = \tfrac{n(n + 1)}{2}$, $1^2 + 2^2 + \cdots + n^2 = \tfrac{n(n + 1)(2n + 1)}{6}$, and $1^3 + 2^3 + \cdots + n^3 = \left(\tfrac{n(n + 1)}{2}\right)^2$. For $n = 10$ the squares add to $\tfrac{10 \cdot 11 \cdot 21}{6} = 385$. Sums of even or odd powers only are found by subtracting or factoring out: $2^3 + 4^3 + \cdots + 18^3 = 8(1^3 + \cdots + 9^3)$.

Multiply and subtract for any geometric sum, use $\tfrac{a}{1 - r}$ when it goes on forever, and use the power-sum formulas, adjusted for even or odd terms. The next lesson turns to sequences given by a rule.`,
      related: [
        { card: "repeating-decimals", note: String.raw`a repeating decimal is an infinite geometric sum.` },
        { card: "arithmetico-geometric", note: String.raw`sums of a linear times a geometric term, by the same multiply-and-subtract (L11.4).` }
      ],
      exercises: [
        { q: String.raw`Find $2 + 6 + 18 + \cdots + 2 \cdot 3^6$.`, answer: "2186",
          solution: String.raw`A geometric sum with $a = 2$, $r = 3$ and $7$ terms: $2 \cdot \tfrac{3^7 - 1}{3 - 1} = 3^7 - 1 = 2186$.` },
        { q: String.raw`Find $1 - \tfrac13 + \tfrac19 - \tfrac1{27} + \cdots$.`, answer: "3/4",
          solution: String.raw`An infinite geometric sum with $a = 1$ and $r = -\tfrac13$: $\tfrac{1}{1 + 1/3} = \tfrac34$.` },
        { q: String.raw`Find $1^2 + 2^2 + \cdots + 10^2$.`, answer: "385",
          solution: String.raw`By the formula, $\tfrac{10 \cdot 11 \cdot 21}{6} = 385$.` }
      ],
      problems: [
        "2024 AMC 10A, Problem 19",
        "2025 AMC 10A, Problem 13",
        "2023 AMC 12A, Problem 12",
        "2025 AMC 10A, Problem 11"
      ]
    },
    "L6.4": {
      prereq: ["arithmetic-series", "geometric-series"],
      cards: ["first-order-recurrence", "periodic-sequences"],
      body: String.raw`Some sequences are defined by a rule that makes each term from the previous ones: double the last term and subtract $1$; divide the last term by the one before it; subtract the last term from the one before. Such a rule is a recursion, and the questions are about a far term, such as the $100$th. Two things usually happen: the rule has a simple closed form, or the terms repeat.

[[first-order-recurrence|A first-order recursion]] gives each term from the one before: $a_{n+1} = 2a_n - 1$ with $a_1 = 3$. Compute a few terms, $3, 5, 9, 17, 33$, and look for the pattern: each is a power of $2$ plus $1$, $a_n = 2^n + 1$, so $a_{10} = 1025$. The general method shifts the sequence so that the rule becomes pure multiplication: $a_{n+1} - 1 = 2(a_n - 1)$, so $a_n - 1$ is geometric. A rule that adds a growing amount, $a_{n+1} = a_n + 2n$, is summed instead: $a_n = a_1 + 2(1 + 2 + \cdots + (n - 1))$.

[[periodic-sequences|A periodic sequence]] repeats after a fixed number of steps. If each term depends on the previous two through a rule with finitely many possible values, or through a rule that undoes itself, the terms must cycle. With $a_1 = 1$, $a_2 = 2$ and $a_n = \tfrac{a_{n-1}}{a_{n-2}}$, the terms run $1, 2, 2, 1, \tfrac12, \tfrac12, 1, 2, \ldots$, with period $6$, so $a_{100} = a_4 = 1$ because $100 \equiv 4 \pmod 6$. The sum over a whole period is often simple, and a long sum is the number of full periods times that sum plus the leftover terms.

Compute the first several terms by hand; look for a closed form or a repeat; then reduce the far index by the period or substitute into the formula. The next lesson collapses sums.`,
      related: [
        { card: "linear-recurrence", note: String.raw`recursions that use the two previous terms, solved by their characteristic equation (L11.3).` },
        { card: "cycle-hunting", note: String.raw`finding the period of remainders of powers, the same idea in number theory.` }
      ],
      exercises: [
        { q: String.raw`A sequence has $a_1 = 3$ and $a_{n+1} = 2a_n - 1$. Find $a_{10}$.`, answer: "1025",
          solution: String.raw`The terms $3, 5, 9, 17, \ldots$ are $2^n + 1$; indeed $a_{n+1} - 1 = 2(a_n - 1)$, so $a_n - 1 = 2^{n-1} \cdot 2 = 2^n$. Then $a_{10} = 1025$.` },
        { q: String.raw`A sequence has $a_1 = 1$, $a_2 = 2$ and $a_n = \dfrac{a_{n-1}}{a_{n-2}}$. Find $a_{100}$.`, answer: "1",
          solution: String.raw`The terms are $1, 2, 2, 1, \tfrac12, \tfrac12, 1, 2, \ldots$, repeating with period $6$. Since $100 = 6 \cdot 16 + 4$, $a_{100} = a_4 = 1$.` },
        { q: String.raw`A sequence has $a_1 = 5$, $a_2 = 8$ and $a_n = a_{n-1} - a_{n-2}$. Find the sum of its first $100$ terms.`, answer: "11",
          solution: String.raw`The terms are $5, 8, 3, -5, -8, -3$ and then repeat, so every block of $6$ adds to $0$. The first $96$ terms add to $0$, and the last four are $5 + 8 + 3 - 5 = 11$.` }
      ],
      problems: [
        "2005 AMC 10B, Problem 11",
        "2006 AMC 10B, Problem 18",
        "2011 AMC 10A, Problem 17",
        "2004 AMC 12A, Problem 17",
        "2024 AMC 10A, Problem 10"
      ]
    },
    "L6.5": {
      prereq: ["difference-of-squares", "arithmetic-series"],
      cards: ["telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      body: String.raw`Some long sums and products shrink to a few terms once each term is written the right way. $\left(1 + \tfrac11\right)\left(1 + \tfrac12\right)\cdots\left(1 + \tfrac1{99}\right)$ is $100$; $\sum_{k=1}^{24} \tfrac{1}{\sqrt k + \sqrt{k + 1}}$ is $4$; $1 \cdot 1! + 2 \cdot 2! + \cdots + 8 \cdot 8!$ is $9! - 1$; and $1 - 2 + 3 - 4 + \cdots + 99$ is $50$. In each, neighboring terms cancel or pair off.

A sum [[telescoping|telescopes]] when each term is a difference $f(k) - f(k + 1)$: adding them, every middle value cancels and only $f(\text{first}) - f(\text{last} + 1)$ remains. A product telescopes when each factor is a ratio $\tfrac{g(k + 1)}{g(k)}$: $1 + \tfrac1k = \tfrac{k + 1}{k}$, so the product is $\tfrac21 \cdot \tfrac32 \cdots \tfrac{100}{99} = 100$. Rationalizing can create the difference: $\tfrac{1}{\sqrt k + \sqrt{k + 1}} = \sqrt{k + 1} - \sqrt k$, so the sum is $\sqrt{25} - \sqrt1 = 4$.

[[partial-fractions|Partial fractions]] split a fraction with a factored denominator into simpler fractions, which often telescope: $\tfrac{1}{(2k - 1)(2k + 1)} = \tfrac12\left(\tfrac{1}{2k - 1} - \tfrac{1}{2k + 1}\right)$. [[factorial-telescoping|Factorials]] telescope through $k \cdot k! = (k + 1)! - k!$, so $\sum_{k=1}^{8} k \cdot k! = 9! - 1 = 362879$, and through $\tfrac{k}{(k + 1)!} = \tfrac{1}{k!} - \tfrac{1}{(k + 1)!}$.

[[alternating-sum-grouping|An alternating sum]] is grouped in pairs: $1 - 2 + 3 - 4 + \cdots + 99$ has $49$ pairs $(1 - 2), (3 - 4), \ldots, (97 - 98)$, each $-1$, plus the last term $99$, so it is $50$. An alternating sum of squares pairs into differences of squares: $100^2 - 99^2 = 199$, and so on.

When a sum or product is long, write one term as a difference or a ratio, look for cancellation, and pair alternating terms. The Summary (L6.6) collects the chapter's strategies.`,
      related: [
        { card: "change-of-base", note: String.raw`products of logarithms telescope after a change of base (L9.2).` },
        { card: "trig-telescoping-product", note: String.raw`trigonometric products that telescope (L12.3).` }
      ],
      exercises: [
        { q: String.raw`Find $\left(1 + \tfrac11\right)\left(1 + \tfrac12\right)\left(1 + \tfrac13\right)\cdots\left(1 + \tfrac1{99}\right)$.`, answer: "100",
          solution: String.raw`Each factor is $\tfrac{k + 1}{k}$, so the product is $\tfrac21 \cdot \tfrac32 \cdots \tfrac{100}{99} = 100$.` },
        { q: String.raw`Find $\sum_{k=1}^{24} \dfrac{1}{\sqrt k + \sqrt{k + 1}}$.`, answer: "4",
          solution: String.raw`Rationalize: $\tfrac{1}{\sqrt k + \sqrt{k + 1}} = \sqrt{k + 1} - \sqrt k$. The sum telescopes to $\sqrt{25} - \sqrt1 = 4$.` },
        { q: String.raw`Find $1 \cdot 1! + 2 \cdot 2! + \cdots + 8 \cdot 8!$.`, answer: "362879",
          solution: String.raw`Since $k \cdot k! = (k + 1)! - k!$, the sum telescopes to $9! - 1! = 362880 - 1 = 362879$.` },
        { q: String.raw`Find $1 - 2 + 3 - 4 + \cdots - 98 + 99$.`, answer: "50",
          solution: String.raw`Pair $(1 - 2) + (3 - 4) + \cdots + (97 - 98)$: $49$ pairs of $-1$, then add $99$. The total is $-49 + 99 = 50$.` }
      ],
      problems: [
        "2005 AMC 12B, Problem 13",
        "2021 Spring AMC 10A, Problem 10",
        "2022 AMC 10B, Problem 9",
        "2010 AMC 12A, Problem 19"
      ]
    },
    "L6.6": {
      prereq: ["arithmetic-series", "triangular-numbers", "geometric-series", "power-sums", "first-order-recurrence", "periodic-sequences", "telescoping", "partial-fractions", "factorial-telescoping", "alternating-sum-grouping"],
      cards: [],
      body: String.raw`An arithmetic sequence has $n$th term $a + (n - 1)d$, and [[arithmetic-series|its sum]] is the number of terms times the average of the first and last; [[triangular-numbers|the triangular numbers]] $\tfrac{n(n + 1)}{2}$ are the simplest case.

A geometric sequence has $n$th term $ar^{n-1}$, and [[geometric-series|its sum]] is found by multiplying by $r$ and subtracting; it is $\tfrac{a}{1 - r}$ when infinite with $|r| \lt 1$. [[power-sums|The sums of squares and cubes]] have closed forms.

[[first-order-recurrence|A recursion]] is computed for a few terms, then given a closed form, often by shifting it into a geometric sequence, or found to be [[periodic-sequences|periodic]], in which case a far index is reduced by the period.

[[telescoping|Telescoping]] writes terms as differences or ratios so that the middle cancels; [[partial-fractions|partial fractions]] and [[factorial-telescoping|factorial identities]] produce the differences, and [[alternating-sum-grouping|alternating sums]] are grouped in pairs.`,
      strategies: [
        String.raw`For a count of terms, divide the span by the step and add one.`,
        String.raw`For an arithmetic sum, multiply the number of terms by the average of the first and last.`,
        String.raw`For a geometric sum, multiply by the ratio and subtract.`,
        String.raw`For a recursion, compute the first several terms by hand and look for a formula or a repeat.`,
        String.raw`Reduce a far index modulo the period, and add whole periods at once.`,
        String.raw`Write a term as a difference or a factor as a ratio, and look for cancellation.`,
        String.raw`Group an alternating sum into pairs.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`An arithmetic sequence has $31$ terms, first term $7$ and last term $97$. Find its sum.`, answer: "1612",
        solution: String.raw`The sum is $31 \cdot \tfrac{7 + 97}{2} = 31 \cdot 52 = 1612$.` },
      { q: String.raw`A geometric sequence has $a_2 = 6$ and $a_5 = 162$. Find $a_7$.`, answer: "1458",
        solution: String.raw`Three steps multiply by $\tfrac{162}{6} = 27$, so $r = 3$. Then $a_7 = a_5 \cdot 9 = 1458$.` },
      { q: String.raw`An infinite geometric series with ratio $\tfrac13$ has sum $12$. Find its first term.`, answer: "8",
        solution: String.raw`From $\tfrac{a}{1 - 1/3} = 12$, $a = 12 \cdot \tfrac23 = 8$.` },
      { q: String.raw`Find $1^3 + 2^3 + \cdots + 20^3$.`, answer: "44100",
        solution: String.raw`The sum of the first $n$ cubes is $\left(\tfrac{n(n + 1)}{2}\right)^2 = 210^2 = 44100$.` },
      { q: String.raw`Find $\sum_{k=1}^{50} \dfrac{1}{(2k - 1)(2k + 1)}$.`, answer: "50/101",
        solution: String.raw`By partial fractions each term is $\tfrac12\left(\tfrac{1}{2k - 1} - \tfrac{1}{2k + 1}\right)$, so the sum telescopes to $\tfrac12\left(1 - \tfrac{1}{101}\right) = \tfrac{50}{101}$.` },
      { q: String.raw`Find $100^2 - 99^2 + 98^2 - 97^2 + \cdots + 2^2 - 1^2$.`, answer: "5050",
        solution: String.raw`Pair the terms: $(100^2 - 99^2) + (98^2 - 97^2) + \cdots = (100 + 99) + (98 + 97) + \cdots + (2 + 1)$, which is $1 + 2 + \cdots + 100 = 5050$.` },
      { q: String.raw`A sequence has $a_1 = 1$ and $a_{n+1} = a_n + 2n$. Find $a_{20}$.`, answer: "381",
        solution: String.raw`Adding the steps, $a_{20} = 1 + 2(1 + 2 + \cdots + 19) = 1 + 2 \cdot 190 = 381$.` }
    ],
    problems: [
      "2004 AMC 10B, Problem 19",
      "2002 AMC 10B, Problem 23"
    ]
  },
  challenge: {
    problems: [
      "2024 AMC 12A, Problem 14",
      "2023 AMC 12A, Problem 20",
      "2024 AMC 12A, Problem 21",
      "2025 AMC 12A, Problem 21"
    ]
  }
};
