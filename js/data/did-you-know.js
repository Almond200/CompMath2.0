// Did you know? facts written for the home page panel (2026-10-30). The panel also draws the first
// Useful observation of each card on the curiosity lists; these are extra, each an instance that no
// card states (checked against the cards and write-ups), each tied to the card it comes from, and
// every number checked by computation. `card` is the card the "From ..." link opens.
window.MATH_DYK = [
  { card: "trailing-zeros", fact: String.raw`$1000!$ ends in exactly $249$ zeros: $200 + 40 + 8 + 1$ factors of $5$, from the multiples of $5$, $25$, $125$ and $625$.` },
  { card: "derangements", fact: String.raw`Shuffle $10$ letters into their $10$ envelopes at random, and the chance that none lands in its own envelope is $\frac{1334961}{3628800} = 0.367879\ldots$, which matches $\frac1e$ to six decimal places.` },
  { card: "wilsons-theorem", fact: String.raw`$10! + 1 = 3628801 = 11 \cdot 329891$. That is no accident: $(p-1)! + 1$ is a multiple of $p$ for every prime $p$, and for no other number above $1$.` },
  { card: "pell-equation", fact: String.raw`$577^2 - 2 \cdot 408^2 = 1$, so $\frac{577}{408} = 1.4142156\ldots$ agrees with $\sqrt2 = 1.4142135\ldots$ to five decimal places. Each solution of $x^2 - 2y^2 = 1$ gives a better fraction for $\sqrt2$ than the last.` },
  { card: "power-sums", fact: String.raw`$1^3 + 2^3 + \cdots + 20^3 = 44100 = 210^2$, the square of $1 + 2 + \cdots + 20$. The sum of the first $n$ cubes is always the square of the sum of the first $n$ numbers.` },
  { card: "geometric-series", fact: String.raw`$0.\overline{9}$ is exactly $1$: it is the geometric series $\frac9{10} + \frac9{100} + \cdots$, whose sum is $\frac{9/10}{1 - 1/10} = 1$.` },
  { card: "lte", fact: String.raw`$3^{1024} - 1$ is divisible by $2^{12}$ but not by $2^{13}$, and lifting the exponent says so in one line: $1 + 2 + 10 - 1 = 12$, from $3 - 1$, $3 + 1$ and $1024 = 2^{10}$.` },
  { card: "fermats-little-theorem", fact: String.raw`Every prime other than $2$ and $5$ divides some number written only with nines: $p$ divides $99\ldots9$ with $p - 1$ nines, since that number is $10^{p-1} - 1$. So $7 \mid 999999$ and $13 \mid 999999999999$.` },
  { card: "digit-count", fact: String.raw`$3^{100}$ has $48$ digits, and no multiplication is needed to see it: $100 \log_{10} 3 = 47.71\ldots$, and a number has one more digit than the whole part of its logarithm.` },
  { card: "binomial-theorem", fact: String.raw`$11^4 = 14641$ spells out the row $1, 4, 6, 4, 1$ of Pascal's triangle, since $11^4 = (10 + 1)^4$. The pattern breaks at $11^5 = 161051$, where the middle entries $10$ carry into the next digit.` }
];
