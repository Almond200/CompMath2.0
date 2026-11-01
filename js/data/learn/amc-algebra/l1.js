// Learn, AMC Algebra, chapter L1: expressions and exponents (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L1"] = {
  lessons: {
    "L1.1": {
      prereq: [],
      cards: [],
      body: String.raw`This chapter is about the language of algebra: letters that stand for numbers, the expressions built from them, and the rules for rewriting an expression without changing its value. Everything later in the book is written in this language.

A variable is a letter, such as $x$, that stands for a number we do not know yet or that can change. An expression combines numbers and variables with operations, such as $3x^2 - 2x + 1$; when $x = -2$ its value is $3 \cdot 4 + 4 + 1 = 17$. An equation says that two expressions have the same value, and translating a sentence into an equation is the first step of most word problems.

Exponents are repeated multiplication: $2^3 = 2 \cdot 2 \cdot 2$. Multiplying powers of the same base adds the exponents, so $2^3 \cdot 2^4 = 2^7$, and dividing subtracts them, so $\tfrac{2^7}{2^5} = 2^2 = 4$. A square root undoes squaring only up to sign: $\sqrt{x^2} = |x|$, so $\sqrt{(-2)^2} = \sqrt{4} = 2$, not $-2$. Roots follow the same rules once they are written as fractional exponents.

Expanding writes a product as a sum, and factoring writes a sum as a product. A few patterns appear constantly: $(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)(a + b) = a^2 - b^2$. They let us compute $101^2 - 99^2$ as $(101 - 99)(101 + 99) = 400$ without squaring anything.

Last, ratios compare two quantities, a proportion says that two ratios are equal, and a percent is a ratio out of $100$. A change by a percent is a multiplication: raising a price by $20\%$ multiplies it by $1.2$.

The lessons take these ideas in turn: variables, expressions and translating words (L1.2), exponents and radicals (L1.3), expanding and factoring (L1.4), and ratios, proportions and percents (L1.5). The Summary (L1.6) collects the strategies.`,
      exercises: [
        { q: String.raw`Find the value of $3x^2 - 2x + 1$ when $x = -2$.`, answer: "17",
          solution: String.raw`Replace $x$ by $-2$, keeping the brackets: $3(-2)^2 - 2(-2) + 1 = 3 \cdot 4 + 4 + 1 = 17$. The square of $-2$ is $4$, not $-4$.` },
        { q: String.raw`Find $\dfrac{2^3 \cdot 2^4}{2^5}$.`, answer: "4",
          solution: String.raw`Multiplying powers of $2$ adds the exponents and dividing subtracts them: $2^{3 + 4 - 5} = 2^2 = 4$. Directly: $\tfrac{8 \cdot 16}{32} = 4$.` },
        { q: String.raw`Find $(x + 3)^2 - (x - 3)^2$ when $x = 5$.`, answer: "60",
          solution: String.raw`Expand both squares: $(x^2 + 6x + 9) - (x^2 - 6x + 9) = 12x$, which is $60$ at $x = 5$. Directly: $8^2 - 2^2 = 64 - 4 = 60$.` }
      ],
      problems: [
        "1993 AJHSME, Problem 7",
        "1985 AJHSME, Problem 6",
        "2007 AMC 8, Problem 19"
      ]
    },
    "L1.2": {
      prereq: [],
      cards: [],
      body: String.raw`A word problem describes numbers in sentences, and solving it starts with writing those sentences as expressions and equations. The sum of three consecutive integers is $72$; what is the largest? Ann is $4$ years older than twice Bo's age, and their ages add to $34$; how old is Ann? Each becomes one short equation once the unknown numbers have names, and the work after that is routine.

A variable is a letter that stands for a number. Choose it for the quantity the problem asks about, or for the one that makes the others easy to write: for three consecutive integers, calling the middle one $n$ makes them $n - 1$, $n$ and $n + 1$, and their sum is $3n$. An expression is any combination of numbers and variables with operations, such as $2n + 3$, read "two times $n$, plus $3$".

Operations are done in a fixed order: brackets first, then powers, then multiplication and division from left to right, then addition and subtraction from left to right. So $2 + 3 \times 4 - 6 \div 2 = 2 + 12 - 3 = 11$, not $(5 \times 4 - 6) \div 2$. Terms with the same variable part, such as $6x$ and $-2x$, are like terms and can be combined; a bracket multiplied by a number is expanded term by term, so $3(2x - 1) - 2(x - 4) = 6x - 3 - 2x + 8 = 4x + 5$. Note the sign: $-2 \cdot (-4) = +8$.

Translating follows the words in order. "Three more than twice a number" is $2n + 3$; "the number is $17$" is $= 17$. "Is" becomes an equals sign, "of" usually means times, "more than" adds and "less than" subtracts from the quantity named after it, so "$5$ less than $x$" is $x - 5$. For Ann and Bo, $a = 2b + 4$ and $a + b = 34$; substituting, $3b + 4 = 34$, so $b = 10$ and $a = 24$.

Always check the answer in the original words, not in your equation: if Bo is $10$, twice his age plus $4$ is $24$, and $24 + 10 = 34$. The next lesson turns to exponents and radicals.`,
      related: [
        { card: "transforming-equations", note: String.raw`solving the equations a translation produces, and checking the answer (L2.2).` },
        { card: "linear-elimination", note: String.raw`two unknowns from two sentences, solved by elimination (L2.3).` }
      ],
      exercises: [
        { q: String.raw`Simplify $3(2x - 1) - 2(x - 4)$, then find its value at $x = 2$.`, answer: "13",
          solution: String.raw`Expand each bracket: $6x - 3 - 2x + 8$. Combine like terms: $4x + 5$. At $x = 2$ this is $13$.` },
        { q: String.raw`Find $2 + 3 \times 4 - 6 \div 2$.`, answer: "11",
          solution: String.raw`Multiplication and division come first: $3 \times 4 = 12$ and $6 \div 2 = 3$. Then $2 + 12 - 3 = 11$.` },
        { q: String.raw`The sum of three consecutive integers is $72$. What is the largest of them?`, answer: "25",
          solution: String.raw`Call the middle one $n$; the three are $n - 1$, $n$, $n + 1$, with sum $3n = 72$. So $n = 24$ and the largest is $25$. Check: $23 + 24 + 25 = 72$.` },
        { q: String.raw`Ann is $4$ years older than twice Bo's age, and their ages add to $34$. How old is Ann?`, answer: "24",
          solution: String.raw`With Bo's age $b$, Ann's is $2b + 4$, and $(2b + 4) + b = 34$, so $3b = 30$ and $b = 10$. Ann is $24$. Check: twice $10$ plus $4$ is $24$, and $24 + 10 = 34$.` }
      ],
      problems: []
    },
    "L1.3": {
      prereq: [],
      cards: ["exponent-laws", "rationalizing"],
      body: String.raw`Very large and very small numbers, repeated factors, and roots all become manageable once they are written with exponents. Which is largest, $10^8$, $5^{12}$ or $2^{24}$? How many digits does $4^5 \cdot 5^{10}$ have? What is $\tfrac{2}{\sqrt5 - \sqrt3}$ without a root in the bottom? Each question is answered by a few rules for exponents and roots, applied in the right order.

An exponent counts repeated multiplication: $a^n$ is $a$ multiplied by itself $n$ times, so $2^3 = 8$. From that definition come [[exponent-laws|the exponent laws]]. Multiplying powers of one base adds the exponents, $2^3 \cdot 2^4 = 2^7$, because $3$ factors and $4$ factors make $7$; dividing subtracts them; and a power of a power multiplies them, $(2^3)^4 = 2^{12}$. To keep these rules true, $a^0 = 1$, $a^{-n} = \tfrac{1}{a^n}$, and $a^{1/n}$ is the $n$th root of $a$, so $8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 4$. The laws need a common base, so the first step is usually to rewrite every number as a power of the same small base: $4^5 \cdot 5^{10} = 2^{10} \cdot 5^{10} = 10^{10}$, which has $11$ digits.

To compare powers with different bases, give them a common exponent instead: $10^8 = 100^4$, $5^{12} = 125^4$ and $2^{24} = 64^4$, so $2^{24} \lt 10^8 \lt 5^{12}$.

Square roots follow the same rules as the exponent $\tfrac12$: $\sqrt{ab} = \sqrt a\sqrt b$, so $\sqrt{72} = \sqrt{36}\sqrt2 = 6\sqrt2$, by pulling out the largest square factor. But $\sqrt{a + b}$ is not $\sqrt a + \sqrt b$: $\sqrt{9 + 16} = 5$, not $7$. A fraction with a root in its denominator is usually rewritten without one, which is called [[rationalizing|rationalizing the denominator]]: multiply the top and bottom by the root, or, for a sum or difference of roots, by its conjugate, so that a difference of squares clears the roots. For example $\tfrac{2}{\sqrt5 - \sqrt3} \cdot \tfrac{\sqrt5 + \sqrt3}{\sqrt5 + \sqrt3} = \tfrac{2(\sqrt5 + \sqrt3)}{5 - 3} = \sqrt5 + \sqrt3$.

Reach for these rules whenever a problem has powers with related bases, a comparison of large numbers, a count of digits, or a root in a denominator. The next lesson expands and factors expressions.`,
      related: [
        { card: "difference-of-squares", note: String.raw`the identity that makes the conjugate clear the roots (L1.4).` },
        { card: "log-rules", note: String.raw`the same laws read backwards, for solving for an exponent (L9.2).` }
      ],
      exercises: [
        { q: String.raw`Find $8^{2/3}$.`, answer: "4",
          solution: String.raw`The exponent $\tfrac23$ means the cube root, squared: $\sqrt[3]{8} = 2$, and $2^2 = 4$.` },
        { q: String.raw`Write $\sqrt{72}$ in the form $a\sqrt b$ with $b$ as small as possible.`, answer: "6sqrt(2)",
          solution: String.raw`The largest square factor of $72$ is $36$: $\sqrt{72} = \sqrt{36 \cdot 2} = 6\sqrt2$.` },
        { q: String.raw`Rationalize the denominator of $\dfrac{2}{\sqrt5 - \sqrt3}$.`, answer: "sqrt(5) + sqrt(3)",
          solution: String.raw`Multiply the top and bottom by the conjugate $\sqrt5 + \sqrt3$. The bottom becomes $(\sqrt5)^2 - (\sqrt3)^2 = 2$, so the fraction is $\tfrac{2(\sqrt5 + \sqrt3)}{2} = \sqrt5 + \sqrt3$.` }
      ],
      problems: [
        "2010 AMC 8, Problem 24",
        "2011 AMC 8, Problem 15",
        "2002 AMC 10A, Problem 1",
        "2023 AMC 8, Problem 22"
      ]
    },
    "L1.4": {
      prereq: ["exponent-laws"],
      cards: ["square-of-sum", "difference-of-squares", "completing-the-square"],
      body: String.raw`Many computations that look long are short once an expression is rewritten in a better form. What is $101^2 - 99^2$? If $a + b = 7$ and $ab = 12$, what is $a^2 + b^2$? What is the smallest value of $x^2 - 8x + 20$? Each is one line with the right identity: expanding turns a product into a sum, factoring turns a sum into a product, and completing the square turns a quadratic into a square plus a number.

To expand a product of sums, multiply every term of one by every term of the other and add: $(x + 2)(x + 5) = x^2 + 5x + 2x + 10 = x^2 + 7x + 10$. Two products occur so often that they are worth knowing by heart. [[square-of-sum|The square of a sum]] is $(a + b)^2 = a^2 + 2ab + b^2$; it computes $99^2 = (100 - 1)^2 = 10000 - 200 + 1 = 9801$, and read the other way it gives $a^2 + b^2 = (a + b)^2 - 2ab$, so $a + b = 7$ and $ab = 12$ give $a^2 + b^2 = 49 - 24 = 25$. [[difference-of-squares|The difference of squares]] is $a^2 - b^2 = (a - b)(a + b)$; it computes $51 \cdot 49 = 50^2 - 1 = 2499$ and $101^2 - 99^2 = 2 \cdot 200 = 400$.

Factoring is the reverse of expanding: it writes an expression as a product, which is what is needed to solve an equation or to cancel a fraction. Look first for a common factor, as in $3^{4012} - 3^{4008} = 3^{4008}(3^4 - 1)$, then for a difference of squares, then for a quadratic that splits: $x^2 + 7x + 10 = (x + 2)(x + 5)$, found by two numbers with sum $7$ and product $10$.

[[completing-the-square|Completing the square]] rewrites $x^2 + bx + c$ as $\left(x + \tfrac b2\right)^2 + c - \tfrac{b^2}{4}$. For $x^2 - 8x + 20$ it gives $(x - 4)^2 + 4$; a square is never negative, so the smallest value is $4$, at $x = 4$. The same move solves quadratic equations and finds the center of a circle from its equation.

Before computing a product or a difference of large numbers, ask whether it is a square of a sum or a difference of squares, and before solving, factor. The next lesson turns to ratios and percents.`,
      related: [
        { card: "quadratic-formula", note: String.raw`completing the square in general gives the formula for the roots (L3.2).` },
        { card: "sfft", note: String.raw`factoring $xy + ax + by$ by adding a constant, the same idea for two variables.` },
        { card: "trivial-inequality", note: String.raw`a square is never negative, which turns a completed square into a smallest value (L8.2).` }
      ],
      exercises: [
        { q: String.raw`Find $101^2 - 99^2$.`, answer: "400",
          solution: String.raw`By the difference of squares, $101^2 - 99^2 = (101 - 99)(101 + 99) = 2 \cdot 200 = 400$.` },
        { q: String.raw`If $a + b = 7$ and $ab = 12$, find $a^2 + b^2$.`, answer: "25",
          solution: String.raw`Square the sum: $a^2 + 2ab + b^2 = 49$, so $a^2 + b^2 = 49 - 24 = 25$. (The numbers are $3$ and $4$.)` },
        { q: String.raw`Find the smallest value of $x^2 - 8x + 20$.`, answer: "4",
          solution: String.raw`Complete the square: $x^2 - 8x + 20 = (x - 4)^2 + 4$. The square is at least $0$, and is $0$ at $x = 4$, so the smallest value is $4$.` }
      ],
      problems: [
        "2016 AMC 8, Problem 15",
        "2008 AMC 10A, Problem 7",
        "2018 AMC 10A, Problem 10",
        "2024 AMC 10B, Problem 9"
      ]
    },
    "L1.5": {
      prereq: [],
      cards: ["setting-up-proportions", "proportion-properties", "percent-change"],
      body: String.raw`Ratios, proportions and percents describe how quantities compare and how they change. If boys and girls are in the ratio $3 : 5$ in a class of $40$, how many girls are there? A price rises $20\%$ and then falls $20\%$; is it back where it started? After a $25\%$ discount a shirt costs $\$60$; what did it cost before? Each question is one multiplication or one equation, once the comparison is written as a fraction.

A ratio $a : b$ compares two quantities by division, $\tfrac ab$. A ratio $3 : 5$ means the quantities are $3k$ and $5k$ for some number $k$, so a class of $40$ in the ratio $3 : 5$ has $3k + 5k = 8k = 40$, $k = 5$, and $25$ girls. Writing the parts as multiples of one unknown is the most reliable way to use a ratio.

A proportion says two ratios are equal, $\tfrac ab = \tfrac cd$, and [[setting-up-proportions|setting one up]] is the way to scale a quantity: if $500$ sheets make a stack $5$ cm tall, a stack $7.5$ cm tall has $500 \cdot \tfrac{7.5}{5} = 750$ sheets. Keep the units in the same places on both sides, and convert units by multiplying by fractions equal to $1$, such as $\tfrac{100 \text{ cm}}{1 \text{ m}}$, so that the units cancel. [[proportion-properties|A proportion can be rearranged]]: $\tfrac ab = \tfrac cd$ gives $ad = bc$ and $\tfrac{a + b}{b} = \tfrac{c + d}{d}$.

A percent is a ratio out of $100$, and a [[percent-change|percent change]] is a multiplication. Raising by $p\%$ multiplies by $1 + \tfrac{p}{100}$, lowering by $p\%$ multiplies by $1 - \tfrac{p}{100}$, and successive changes multiply: up $20\%$ then down $20\%$ is $1.2 \cdot 0.8 = 0.96$, a net loss of $4\%$, not a return to the start. To undo a change, divide by its factor: a price after $25\%$ off is $0.75$ of the original, so a sale price of $\$60$ means an original of $\tfrac{60}{0.75} = \$80$. A percent of a percent is a product as well, and a percent is always of something, so ask "percent of what" before computing.

Use these tools whenever a problem compares quantities, scales a recipe or a map, converts units, or changes a price or a population by percents. The Summary (L1.6) collects the chapter's strategies, and the next chapter solves equations.`,
      related: [
        { card: "weighted-average", note: String.raw`averages of groups in a given ratio (L2.5).` },
        { card: "similar-figures-ratios", note: String.raw`ratios of lengths, areas and volumes of similar figures.` }
      ],
      exercises: [
        { q: String.raw`A price rises $20\%$ and then falls $20\%$. By what percent is the final price lower than the original?`, answer: "4",
          solution: String.raw`The changes multiply: $1.2 \cdot 0.8 = 0.96$. The final price is $96\%$ of the original, $4\%$ lower.` },
        { q: String.raw`Boys and girls in a class are in the ratio $3 : 5$, and there are $40$ students. How many are girls?`, answer: "25",
          solution: String.raw`The class is $3k$ boys and $5k$ girls, so $8k = 40$ and $k = 5$. There are $25$ girls.` },
        { q: String.raw`After a $25\%$ discount, a shirt costs $\$60$. What was the original price?`, answer: "80",
          solution: String.raw`The sale price is $75\%$ of the original, so the original is $\tfrac{60}{0.75} = 80$ dollars. (Taking $25\%$ off $60$ and adding it back gives $75$, which is wrong: the $25\%$ is of the original.)` }
      ],
      problems: [
        "1988 AJHSME, Problem 22",
        "2019 AMC 8, Problem 22",
        "2022 AMC 10A, Problem 4",
        "2023 AMC 10B, Problem 2"
      ]
    },
    "L1.6": {
      prereq: ["exponent-laws", "rationalizing", "square-of-sum", "difference-of-squares", "completing-the-square", "setting-up-proportions", "percent-change"],
      cards: [],
      body: String.raw`An expression is rewritten without changing its value by following the order of operations, combining like terms and expanding brackets with their signs; a word problem starts by naming the unknown well and translating the sentences in order.

[[exponent-laws|The exponent laws]] work on a common base: multiplying adds exponents, dividing subtracts, and a power of a power multiplies; $a^0 = 1$, $a^{-n} = \tfrac{1}{a^n}$, and $a^{1/n}$ is a root. Powers with different bases are compared with a common exponent. A root is simplified by pulling out square factors, and [[rationalizing|a root in a denominator]] is cleared with the conjugate.

[[square-of-sum|The square of a sum]], [[difference-of-squares|the difference of squares]] and [[completing-the-square|completing the square]] turn long computations into short ones, give $a^2 + b^2$ from $a + b$ and $ab$, and find the smallest value of a quadratic.

[[setting-up-proportions|A proportion]] scales one quantity to another, a ratio $a : b$ is written as $ak$ and $bk$, and [[percent-change|a percent change]] is a multiplication: successive changes multiply, and a change is undone by dividing by its factor.`,
      strategies: [
        String.raw`Name the unknown that makes the others easy to write, and translate the sentence word by word.`,
        String.raw`Check an answer in the original words, not only in your equation.`,
        String.raw`Rewrite every power with the same small base before using the exponent laws.`,
        String.raw`To compare powers with different bases, give them a common exponent.`,
        String.raw`Before multiplying large numbers, look for a square of a sum or a difference of squares.`,
        String.raw`Use $a^2 + b^2 = (a + b)^2 - 2ab$ when the sum and product are known.`,
        String.raw`Write a ratio $a : b$ as $ak$ and $bk$, and solve for $k$.`,
        String.raw`Turn every percent change into a multiplication; multiply successive changes, and divide to undo one.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`Find $\dfrac{2^{10} \cdot 4^5}{8^6}$.`, answer: "4",
        solution: String.raw`Write everything in base $2$: $4^5 = 2^{10}$ and $8^6 = 2^{18}$. The value is $2^{10 + 10 - 18} = 2^2 = 4$.` },
      { q: String.raw`Simplify $\sqrt{50} + \sqrt{18}$.`, answer: "8sqrt(2)",
        solution: String.raw`Pull out square factors: $\sqrt{50} = 5\sqrt2$ and $\sqrt{18} = 3\sqrt2$. The sum is $8\sqrt2$.` },
      { q: String.raw`Find $103^2 - 9$.`, answer: "10600",
        solution: String.raw`It is a difference of squares: $103^2 - 3^2 = (103 - 3)(103 + 3) = 100 \cdot 106 = 10600$.` },
      { q: String.raw`If $x - \tfrac1x = 3$, find $x^2 + \tfrac1{x^2}$.`, answer: "11",
        solution: String.raw`Square: $\left(x - \tfrac1x\right)^2 = x^2 - 2 + \tfrac{1}{x^2} = 9$, so $x^2 + \tfrac{1}{x^2} = 11$.` },
      { q: String.raw`On a map with scale $1 : 50000$, two towns are $4$ cm apart. How many kilometers apart are they?`, answer: "2",
        solution: String.raw`The real distance is $4 \cdot 50000 = 200000$ cm. There are $100000$ cm in a kilometer, so the distance is $2$ km.` },
      { q: String.raw`A town's population grows by $10\%$ in each of two years. By what percent does it grow over the two years?`, answer: "21",
        solution: String.raw`The yearly factors multiply: $1.1 \cdot 1.1 = 1.21$, a growth of $21\%$, more than $20\%$ because the second year's growth is on a larger population.` },
      { q: String.raw`Find $(3 + \sqrt2)(3 - \sqrt2)$.`, answer: "7",
        solution: String.raw`By the difference of squares, $3^2 - (\sqrt2)^2 = 9 - 2 = 7$.` }
    ],
    problems: [
      "1985 AJHSME, Problem 21",
      "2006 AMC 10B, Problem 2",
      "2023 AMC 10B, Problem 9"
    ]
  },
  challenge: {
    problems: [
      "2022 AMC 10A, Problem 11",
      "2024 AMC 10A, Problem 15",
      "2023 AMC 10B, Problem 17",
      "2023 AMC 10B, Problem 14"
    ]
  }
};
