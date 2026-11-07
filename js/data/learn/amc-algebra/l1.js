// Learn, AMC Algebra, chapter L1: expressions and exponents (CONVENTIONS §14). Part: Foundations.
// The second plan's book, written fresh (eighteenth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["L1"] = {
  lessons: {
    "L1.1": {
      prereq: [],
      cards: [],
      body: String.raw`Algebra lets us reason about a quantity before we know its value. Instead of repeating a calculation for each possible number, we give that number a name and describe how the calculation works. An expression records a calculation; an equation records a condition that the unknown number must satisfy. Keeping those roles separate is the first habit this book develops.

Suppose a rectangular garden is $3$ meters longer than it is wide. Calling the width $x$ makes the length $x+3$. We have not found either length, but we have already expressed the relationship between them. The perimeter is then $2x+2(x+3)$. Expanding and collecting terms gives $4x+6$. These are two forms of the same expression: one follows the four sides of the garden, while the other shows how the perimeter changes when the width increases.

If the perimeter is $30$ meters, we gain an equation, $4x+6=30$, and hence $x=6$. The garden is $6$ by $9$ meters. Checking $6+9+6+9=30$ returns the algebra to the situation it describes. Without the perimeter condition, there would be no single width to find.

Throughout this chapter, rewriting means preserving a value while changing its form. Powers compress repeated multiplication. Expanding reveals the terms in a product; factoring gathers them back together. Ratios express a relationship that stays the same when both quantities are scaled. Each form makes a different feature easier to see.

The next lesson develops the language of expressions and equations. We then study powers and roots, use area to understand expansion and factoring, and finish by comparing quantities through ratios and percentages. The aim is to choose and justify a representation, rather than memorize a different formula for each story.`,
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
      body: String.raw`An algebraic model begins with a choice: which quantity should have a name? A useful choice makes the other quantities easy to express and keeps the relationship in the problem visible. Naming every number separately often creates unnecessary equations. Naming only the requested answer can also be awkward when several other quantities depend on something simpler.

Consider three consecutive integers with sum $72$. We could call the first $n$ and write $n+(n+1)+(n+2)=72$. Calling the middle integer $m$ instead gives $(m-1)+m+(m+1)=72$. The extra $1$ and the missing $1$ cancel, leaving $3m=72$. Thus the numbers are $23,24,25$. Both choices work, but the middle one exposes the symmetry. Choosing a variable is part of solving the problem, not merely a label attached before the real work.

An expression such as $2b+4$ describes a quantity. It does not by itself give a value for $b$. If Bo is $b$ years old and Ann is four years older than twice Bo's age, Ann's age is $2b+4$. Their combined age is therefore $(2b+4)+b$. Only when we are told that their ages total $34$ can we write

$$ (2b+4)+b=34. $$

The two occurrences of $b$ refer to the same age, so $2b+b=3b$. Subtracting $4$ from both sides gives $3b=30$, and dividing both sides by $3$ gives $b=10$. Ann is $24$. The check uses the original information: twice $10$ plus $4$ is $24$, and the two ages add to $34$. A check made only in a mistranslated equation could miss the translation error.

The order of operations determines what an expression says. In $2b+4$, multiplication happens before addition; in $2(b+4)$, the parentheses make addition happen first. The first expression doubles the age and adds four years; the second adds four years before doubling. At $b=10$ they give $24$ and $28$, so they cannot describe the same relationship. Parentheses record meaning, not just a preferred way to arrange symbols.

Rewriting an expression must preserve that meaning. In $3(2x-1)-2(x-4)$, multiplication distributes to every term in each parenthesis. The second multiplier is $-2$, so its contribution is $-2x+8$. Combining the terms gives $4x+5$. We may combine $6x$ and $-2x$ because both count copies of the same $x$; we may not combine $4x$ and $5$ into $9x$. Substitution at $x=2$ gives $13$ in both the original and simplified forms, a useful check on the signs.

Before solving a word problem, say what the variable measures, write the other quantities in terms of it, and explain why the equation expresses the condition in the words. After solving, check both the original condition and any restrictions, such as an age being positive or a count being an integer. The next lesson extends this same attention to meaning to powers and roots.`,
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
      body: String.raw`A power is a way to keep track of repeated factors. Reading $2^5$ as five factors of $2$, rather than as an unfamiliar large number, makes its behavior predictable. The important question is often which factors can be combined or canceled, not what the power equals in decimal notation.

For example, $2^3\cdot2^4$ contains three factors of $2$ followed by four more, so it contains seven altogether. In $2^7/2^5$, five factors cancel, leaving two. Likewise $(2^3)^4$ consists of four groups of three factors. This counting explains the addition, subtraction and multiplication of exponents in [[exponent-laws|the exponent laws]]. The operations on the exponents differ because the arrangements of factors differ.

The counting interpretation initially applies to positive integer exponents. Extending the division rule consistently tells us what zero and negative exponents must mean. For $a\ne0$, dividing $a^3$ by itself gives $1$, so $a^0=1$. Dividing $a^2$ by $a^5$ leaves $1/a^3$, so $a^{-3}=1/a^3$. A negative exponent moves a factor across the fraction bar; it does not make the value negative. The nonzero condition matters because division by zero is undefined.

Often the bases must be rewritten before a rule becomes useful. In $4^5\cdot5^{10}$, the bases initially differ. But $4^5=(2^2)^5=2^{10}$, so we have ten factors of $2$ paired with ten factors of $5$. Each pair makes $10$:

$$4^5\cdot5^{10}=2^{10}\cdot5^{10}=10^{10}.$$

This is $1$ followed by ten zeros, hence eleven digits. Expanding either original power would hide the pairing. To compare powers, a common exponent can serve the same purpose: $10^8=100^4$, $5^{12}=125^4$ and $2^{24}=64^4$. Since taking the fourth power preserves order among positive numbers, their order follows from $64\lt100\lt125$.

Roots reverse powers, but the choice of root must be stated. The symbol $\sqrt a$ means the nonnegative square root of $a$, for real $a\ge0$. Consequently $\sqrt{x^2}=|x|$: squaring loses the sign, and the square-root symbol does not restore it. For nonnegative $a,b$, the number $\sqrt a\sqrt b$ is nonnegative and has square $ab$, which proves $\sqrt{ab}=\sqrt a\sqrt b$. This justifies extracting square factors, as in $\sqrt{72}=6\sqrt2$. There is no corresponding rule for sums: squaring $\sqrt9+\sqrt{16}=7$ produces a cross term, whereas $9+16=25$ has square root $5$.

For a positive base, fractional powers extend the same rules: $8^{1/3}$ is the cube root of $8$, and $8^{2/3}=(\sqrt[3]8)^2=4$. When negative bases enter, do not apply fractional-power rules without checking which real roots exist. An even root of a negative number has no real value.

A denominator involving roots is another opportunity to expose factors. Multiplying a fraction by a form of $1$ preserves its value. To rewrite $2/(\sqrt5-\sqrt3)$, choose $(\sqrt5+\sqrt3)/(\sqrt5+\sqrt3)$: the opposite signs make the middle terms cancel, leaving denominator $5-3=2$. The result is $\sqrt5+\sqrt3$. This is [[rationalizing|rationalizing the denominator]], and the reason for the choice is more useful than the instruction to multiply by a conjugate alone. The next lesson develops the product identities behind that cancellation.`,
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
      body: String.raw`An expression can be correct in several forms while revealing different information. A product shows factors, a sum shows contributions, and a square plus a constant can show a minimum. Learning to move between these forms lets us decide what to calculate instead of expanding everything automatically.

Begin with a rectangle of sides $x+2$ and $x+5$, where $x>0$ so that the pieces can be interpreted as lengths. Cut one side into $x$ and $2$, and the other into $x$ and $5$. The four smaller rectangles have areas $x^2$, $5x$, $2x$ and $10$. They exactly fill the original rectangle:

$$(x+2)(x+5)=x^2+5x+2x+10=x^2+7x+10.$$

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 255" role="img" aria-labelledby="l14-area-title l14-area-desc" style="width:100%;max-width:430px;height:auto"><title id="l14-area-title">Expansion as four rectangular areas</title><desc id="l14-area-desc">A rectangle of width x plus 5 and height x plus 2 splits into pieces with areas x squared, 5x, 2x and 10. The drawing uses x equal to 4 for its proportions.</desc><g fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"><rect x="45" y="40" width="120" height="120"/><rect x="165" y="40" width="150" height="120" fill-opacity="0.14"/><rect x="45" y="160" width="120" height="60" fill-opacity="0.14"/><rect x="165" y="160" width="150" height="60" fill-opacity="0.22"/></g><g fill="currentColor" font-size="17" text-anchor="middle"><text x="105" y="26">x</text><text x="240" y="26">5</text><text x="25" y="105">x</text><text x="25" y="195">2</text><text x="105" y="105">x²</text><text x="240" y="105">5x</text><text x="105" y="195">2x</text><text x="240" y="195">10</text></g></svg>

The picture explains why every term of one parenthesis multiplies every term of the other. After the distributive law has established the identity, the algebraic statement also holds for zero and negative $x$, even though the picture's positive-length interpretation no longer applies. A geometric explanation can suggest an identity without restricting the final identity to the pictured case.

When the two side lengths are both $a+b$, the two rectangular cross pieces have the same area $ab$. This is why [[square-of-sum|squaring a sum]] produces a middle contribution $2ab$. Omitting it leaves two pieces of the square uncounted. Reading the identity in reverse also lets us find information about two numbers without finding the numbers separately. If $a+b=7$ and $ab=12$, then

$$a^2+b^2=(a+b)^2-2ab=49-24=25.$$

The sum and product already determine the requested expression. Solving for $a$ and $b$ first would add work without giving information we need.

Changing one sign causes cancellation instead of reinforcement. Expanding $(a-b)(a+b)$ gives $a^2+ab-ab-b^2$, so the cross terms disappear. This is the [[difference-of-squares|difference of squares]] identity. The expression $101^2-99^2$ advertises two nearby squares. Factoring makes their closeness useful: $(101-99)(101+99)=2\cdot200=400$. Conversely, $51\cdot49=(50+1)(50-1)=2500-1=2499$. The choice of direction comes from the shape of the given expression and the goal.

Factoring more generally asks us to reconstruct the multiplication that produced a sum. In $x^2+7x+10$, we seek two numbers whose sum supplies $7x$ and whose product supplies $10$. The pair $2,5$ gives the rectangle above. Before trying such pairs, look for a common factor: $3^{4012}-3^{4008}=3^{4008}(3^4-1)$. Removing it first simplifies everything left to recognize. A factor may cancel from a fraction only when it multiplies the entire numerator and denominator and is nonzero; a term in a sum cannot simply be canceled.

A quadratic need not split into convenient integer factors. To understand $x^2-8x+20$, instead ask which square has the same quadratic and linear terms. Expanding $(x-4)^2$ gives $x^2-8x+16$. Our expression has four more units, so

$$x^2-8x+20=(x-4)^2+4.$$

Now its smallest value is visible. A real square is nonnegative, and this square can equal zero at $x=4$, so the minimum is exactly $4$. Both parts matter: a lower bound alone is not a minimum until some allowed input attains it. This reasoning is [[completing-the-square|completing the square]]. Later it will locate a parabola's vertex and help solve quadratic equations.

Before rewriting, identify what you want the new form to reveal: a numerical cancellation, a product that can vanish, or a nonnegative square. Then verify the rewrite by expanding back. The next lesson uses a different representation, equal-sized ratio units, to organize comparisons.`,
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
      body: String.raw`A ratio fixes a comparison without fixing a size. If a class has boys and girls in the ratio $3:5$, we know that every three boy-units accompany five girl-units. We do not yet know how large a unit is. The same ratio could describe $3$ and $5$, $6$ and $10$, or $15$ and $25$.

Calling the size of a unit $k$ makes the quantities $3k$ and $5k$. If the class has $40$ students, its eight units total $40$, so each unit is $5$ students. The girls occupy five units, hence number $25$. The denominator for their share of the class is $3+5=8$, not $3$: the ratio of girls to boys is $5/3$, while the fraction of the class who are girls is $5/8$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 110" role="img" aria-labelledby="l15-ratio-title l15-ratio-desc" style="width:100%;max-width:430px;height:auto"><title id="l15-ratio-title">Three to five means eight equal units altogether</title><desc id="l15-ratio-desc">Eight equal cells represent forty students. Three cells represent fifteen boys and five cells represent twenty-five girls. Each cell is five students.</desc><g stroke="currentColor" stroke-width="1.5" fill="currentColor"><rect x="10" y="15" width="40" height="35" fill-opacity="0.08"/><rect x="50" y="15" width="40" height="35" fill-opacity="0.08"/><rect x="90" y="15" width="40" height="35" fill-opacity="0.08"/><rect x="130" y="15" width="40" height="35" fill-opacity="0.22"/><rect x="170" y="15" width="40" height="35" fill-opacity="0.22"/><rect x="210" y="15" width="40" height="35" fill-opacity="0.22"/><rect x="250" y="15" width="40" height="35" fill-opacity="0.22"/><rect x="290" y="15" width="40" height="35" fill-opacity="0.22"/></g><g fill="currentColor" font-size="15" text-anchor="middle"><text x="70" y="75">3 units: boys</text><text x="230" y="75">5 units: girls</text><text x="170" y="101">8 units = 40 students</text></g></svg>

A proportion records the same scaling idea as an equality of ratios. Suppose $500$ identical sheets form a stack $5$ cm high, with no gaps or compression changes. A $7.5$ cm stack is $7.5/5=1.5$ times as tall, so it contains $1.5\cdot500=750$ sheets. [[setting-up-proportions|Setting up a proportion]] formalizes the assumption that both quantities scale by the same factor. That assumption must come from the situation: the area of a square does not scale in direct proportion to its side length.

Units help check a proportion. Sheets divided by centimeters must equal sheets divided by centimeters; one side cannot instead be centimeters per sheet. Once the corresponding quantities are correctly placed, [[proportion-properties|rearranging a proportion]] is just multiplication of equal quantities by the same nonzero denominators. Thus $a/b=c/d$ gives $ad=bc$ when $b,d\ne0$. Cross multiplication is a consequence of a model already set up, not a way to decide which quantities belong together.

Percentages are ratios whose reference quantity is treated as $100$. A $20\%$ increase in a price of $P$ adds $0.2P$, leaving $1.2P$. A later $20\%$ decrease is measured from that new price, so it leaves $0.8(1.2P)=0.96P$. The final price is $4\%$ below the original. The changes do not cancel because their reference quantities differ. This multiplicative interpretation of [[percent-change|percent change]] keeps the reference amount visible.

Reversing a percentage change means undoing multiplication. After a $25\%$ discount, the sale price is $0.75P$. If it is $60$ dollars, then $P=60/0.75=80$ dollars. Adding $25\%$ of $60$ would give $75$, but that computes a quarter of the sale price, whereas the discount was a quarter of the original. Checking $0.75\cdot80=60$ verifies both the arithmetic and the choice of reference.

When quantities are compared, state what the denominator measures. When they scale, say why the same factor applies to both. When a percentage changes, identify the amount it is a percentage of before computing. These habits connect the chapter: a good expression preserves the relationship in the words, and a useful rewrite makes that relationship easier to reason about.`,
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
