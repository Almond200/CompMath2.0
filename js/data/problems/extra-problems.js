// Additional, harder practice problems for the cards built/enriched this session.
// Each entry is appended (not overwritten) to window.MATH_PROBLEMS[id] as { q, s },
// so they render as extra numbered Examples beneath the lead example.
(function () {
  const P = window.MATH_PROBLEMS = window.MATH_PROBLEMS || {};
  const add = function (id) {
    const probs = Array.prototype.slice.call(arguments, 1);
    P[id] = (P[id] || []).concat(probs);
  };

  // ---------- Remainder & factor theorems (integer half, from the merge) ----------
  add("factor-remainder-theorem",
    { q: String.raw`Can a polynomial with integer coefficients satisfy $P(1) = 2$ and $P(3) = 5$?`,
      s: String.raw`No. For integer $a, b$ the factor theorem forces $(a-b) \mid P(a) - P(b)$, so $3 - 1 = 2$ would have to divide $P(3) - P(1) = 3$. It does not, so no such polynomial exists.` },
    { q: String.raw`$P$ has integer coefficients, $P(2) = 3$ and $P(7) = 8$. Find all possible values of $P(12)$ modulo $5$.`,
      s: String.raw`From $(7-2) \mid P(7)-P(2)$ we get $5 \mid 5$, consistent. For $P(12)$: $(12-2) \mid P(12)-3$ and $(12-7) \mid P(12)-8$, so $P(12) \equiv 3 \pmod{10}$ and $P(12) \equiv 8 \equiv 3 \pmod 5$. Hence $P(12) \equiv 3 \pmod 5$ always.` });

  // ---------- Kummer's theorem ----------
  add("kummers-theorem",
    { q: String.raw`For which $k$ does $\binom{2026}{k}$ end in the most zeros? Find the smallest such $k$.`,
      s: String.raw`The number of trailing zeros is $\min(v_2, v_5)$, and by Kummer's theorem each is the number of carries when $k$ and $2026 - k$ are added in that base. In base $5$, $2026 = 31101_5$ has five digits, and a carry out of the leading place would make the sum longer, so there are at most four carries and at most four zeros. Four carries need one out of each of the four lowest places: allowing for the carry coming in, the units digits of $k$ and $2026 - k$ must add to $6$, the fives digits to $4$, and the next two pairs to $5$ each. The smallest such $k$ are $1102_5 = 152$, then $153$, $154$ and $1112_5 = 157$. In binary the carries number $s_2(k) + s_2(2026 - k) - s_2(2026)$, which is $1$, $2$, $1$ and $4$ for these four. So the most zeros is $4$, and the smallest $k$ reaching it is $\mathbf{157}$.` }
  );

  // ---------- Linear recurrences (absorbed from the merged method card) ----------
  add("linear-recurrence",
    { q: String.raw`Solve $a_n = 4a_{n-1} - 4a_{n-2}$ with $a_0 = 1$, $a_1 = 6$.`,
      s: String.raw`The characteristic equation $x^2 - 4x + 4 = 0$ has the repeated root $x = 2$, so the general solution is $a_n = (A + Bn)2^n$. From $a_0 = A = 1$ and $a_1 = (1+B)\cdot 2 = 6$ we get $B = 2$, giving $a_n = (1 + 2n)2^n$. Check: $a_2 = 5\cdot4 = 20 = 4\cdot6 - 4\cdot1$ ✓ — the $n$ factor is what a repeated root always contributes.` },
    { q: String.raw`Solve the non-homogeneous recurrence $a_n = 3a_{n-1} + 2^n$ with $a_0 = 1$.`,
      s: String.raw`The homogeneous part gives $A\cdot3^n$. For the particular solution try $C\cdot2^n$: substituting gives $C2^n = 3C2^{n-1} + 2^n$, so $2C = 3C + 2$ and $C = -2$. Then $a_n = A3^n - 2^{n+1}$, and $a_0 = A - 2 = 1$ forces $A = 3$, so $a_n = 3^{n+1} - 2^{n+1}$. Check: $a_1 = 9 - 4 = 5 = 3\cdot1 + 2$ ✓.` });

  // ---------- Balls in boxes ----------
  add("balls-boxes-table",
    { q: String.raw`How many ways are there to put $15$ identical balls into $4$ distinct boxes with each box holding between $1$ and $6$?`,
      s: String.raw`Give each box its minimum $1$ (uses $4$), leaving $11$ balls into $4$ boxes each $\le 5$. Stars and bars: $\binom{14}{3}=364$; subtract a box $\ge 6$ (hand it $6$, distribute $5$): $4\binom{8}{3}=224$; two boxes $\ge 6$ needs $12>11$, impossible. Total $364-224=\mathbf{140}$.` },
    { q: String.raw`In how many ways can $6$ distinct books be given to $3$ distinct students with no student left empty?`,
      s: String.raw`Surjections: $3!\,S(6,3)=6\cdot 90=540$, or by inclusion–exclusion $3^6-3\cdot2^6+3\cdot1^6=729-192+3=\mathbf{540}$.` }
  );

  // ---------- Recurring-style methods ----------
  add("cryptarithms",
    { q: String.raw`Find digits $A,B,C$ with $\overline{AA}+\overline{BB}+\overline{CC}=\overline{ABC}$.`,
      s: String.raw`$11(A+B+C)=100A+10B+C \Rightarrow 89A=B+10C$. Since $B+10C\le 99$, we need $A=1$ and $B+10C=89$, so $C=8,\,B=9$. Check: $11+99+88=198=\overline{ABC}$.` }
  );
  add("periodic-sequences",
    { q: String.raw`Find the remainder of the $100$th Fibonacci number $F_{100}$ modulo $8$.`,
      s: String.raw`Fibonacci mod $8$ is periodic with Pisano period $12$: $0,1,1,2,3,5,0,5,5,2,7,1,\dots$. Since $100\equiv 4\pmod{12}$, $F_{100}\equiv F_4=\mathbf{3}\pmod 8$.` }
  );
  add("gap-method",
    { q: String.raw`In how many ways can $5$ identical red balls and $8$ identical blue balls be arranged in a row so that no two red balls are adjacent?`,
      s: String.raw`Lay down the $8$ blue balls first; they create $9$ gaps. Choose $5$ of the gaps for the reds: $\binom{9}{5}=\mathbf{126}$.` }
  );
  add("constructive-counting",
    { q: String.raw`How many integers from $1$ to $9999$ have strictly increasing digits (left to right)?`,
      s: String.raw`A strictly increasing number is determined by which digits it uses — any nonempty subset of $\{1,\dots,9\}$ (a $0$ could only lead, which is disallowed) written in order. With lengths $1$–$4$: $\binom91+\binom92+\binom93+\binom94=9+36+84+126=\mathbf{255}$.` },
    { q: String.raw`How many integers from $1$ to $999$ contain no digit $7$?`,
      s: String.raw`View each as a 3-digit string (leading zeros allowed) over the $9$ digits $\{0,\dots,9\}\setminus\{7\}$: $9^3 = 729$ strings, minus $000$, gives $\mathbf{728}$.` }
  );
  add("sos-method",
    { q: String.raw`Prove $2(a^3+b^3+c^3)\ge a^2b+ab^2+b^2c+bc^2+c^2a+ca^2$ for nonnegative reals.`,
      s: String.raw`The difference is $\sum_{\text{cyc}}\big(a^3+b^3-a^2b-ab^2\big)=\sum_{\text{cyc}}(a-b)^2(a+b)\ge 0$, since each $(a-b)^2(a+b)\ge 0$. Equality iff $a=b=c$.` }
  );
  add("smoothing-method",
    { q: String.raw`For nonnegative reals with $a+b+c=10$, find the maximum and minimum of $ab+bc+ca$.`,
      s: String.raw`Since $ab+bc+ca=\frac{(a+b+c)^2-(a^2+b^2+c^2)}{2}$, it is largest when $a^2+b^2+c^2$ is smallest — smoothing to $a=b=c=\tfrac{10}{3}$ gives $\frac{100-100/3}{2}=\frac{100}{3}$. Pushing to the boundary $a=10,\,b=c=0$ gives the minimum $\mathbf{0}$.` }
  );
  add("transfer-matrix-method",
    { q: String.raw`Count length-$n$ strings over $\{A,B,C\}$ with no two adjacent letters equal.`,
      s: String.raw`Transfer matrix $M=\begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}$ ($1$ where a letter may follow another). The total is $\mathbf 1^{\top}M^{\,n-1}\mathbf 1=3\cdot 2^{\,n-1}$: three choices for the first letter, two for each next.` }
  );

  // ---------- Derived triangles ----------
  add("orthic-triangle",
    { q: String.raw`Find the perimeter of the orthic triangle of the $13$-$14$-$15$ triangle.`,
      s: String.raw`Perimeter $=\frac{2[ABC]}{R}$. Here $[ABC]=84$ and $R=\frac{abc}{4[ABC]}=\frac{2730}{336}=\frac{65}{8}$, so the perimeter is $\frac{2\cdot84}{65/8}=\frac{1344}{65}\approx 20.7$.` }
  );
  add("medial-triangle",
    { q: String.raw`The medial triangle of the medial triangle of $\triangle ABC$ has area $3$. Find $[ABC]$.`,
      s: String.raw`Each medial step scales area by $\frac14$, so two steps give $\frac1{16}$; thus $[ABC]=16\cdot 3=\mathbf{48}$.` }
  );
  add("contact-triangle",
    { q: String.raw`Show the contact triangle of an equilateral triangle is its medial triangle, and give the area ratio.`,
      s: String.raw`For an equilateral triangle $r=\tfrac R2$, so $[\text{contact}]=\frac{r}{2R}[ABC]=\frac14[ABC]$ — and the incircle touches the sides at their midpoints, i.e. the contact triangle is the medial triangle.` }
  );
  add("excentral-triangle",
    { q: String.raw`A triangle has $R=8$ and $r=3$. Find its excentral triangle's circumradius and its area relative to $[ABC]$.`,
      s: String.raw`Circumradius $=2R=16$; area $=\frac{2R}{r}[ABC]=\frac{16}{3}[ABC]$.` }
  );
  add("pedal-triangle",
    { q: String.raw`A point $P$ lies at distance $OP=5$ from the circumcenter of a triangle with $R=8$ and area $48$. Find the area of the pedal triangle of $P$.`,
      s: String.raw`$[\text{pedal}]=\frac{|R^2-OP^2|}{4R^2}[ABC]=\frac{|64-25|}{256}\cdot 48=\frac{39}{256}\cdot 48=\frac{117}{16}\approx 7.31$.` }
  );
  add("same-base-area-ratio",
    { q: String.raw`In quadrilateral $ABCD$ the diagonals meet at $P$ with $[APB]=10$, $[BPC]=15$, $[APD]=8$. Find $[CPD]$.`,
      s: String.raw`Triangles sharing diagonal $BD$ give $\frac{AP}{PC}=\frac{[APB]}{[CPB]}=\frac{[APD]}{[CPD]}$, so $\frac{10}{15}=\frac{8}{[CPD]}\Rightarrow[CPD]=\mathbf{12}$ (equivalently $[APB]\cdot[CPD]=[BPC]\cdot[APD]$).` }
  );
  add("perp-to-angle-bisector",
    { q: String.raw`In $\triangle ABC$ with $AB=13$, $AC=15$, let $P$ be the foot of the perpendicular from $B$ to the bisector of $\angle A$ and $M$ the midpoint of $BC$. Find $PM$.`,
      s: String.raw`Reflect $B$ over the bisector to $B'\in AC$ with $AB'=13$; then $B'C=15-13=2$. Since $PM$ is a midline of $\triangle BB'C$, $PM=\frac{B'C}{2}=\mathbf{1}$.` }
  );

  // ---------- Projective geometry ----------
  add("brianchon-theorem",
    { q: String.raw`A hexagon $ABCDEF$ is circumscribed about a circle, and diagonals $AD$ and $BE$ meet at $P$. Must $CF$ pass through $P$?`,
      s: String.raw`Yes. Brianchon's theorem says the three main diagonals of a hexagon circumscribed about a conic concur, so $CF$ passes through $P=AD\cap BE$.` }
  );
  add("desargues-theorem",
    { q: String.raw`Triangles $ABC$ and $A'B'C'$ are perspective from a point. $AB\cap A'B'=X$ and $BC\cap B'C'=Y$. Where must $CA\cap C'A'$ lie?`,
      s: String.raw`On line $XY$: by Desargues, perspective-from-a-point forces perspective-from-a-line, so the three side-intersections are collinear on the axis $XY$.` }
  );
  add("cross-ratio",
    { q: String.raw`Four concurrent lines through $O$ are cut by one transversal in points with cross-ratio $-1$. A second transversal meets them at $P,Q,R,S$. Find $(P,Q;R,S)$.`,
      s: String.raw`$-1$. Projection from $O$ (a perspectivity) preserves the cross-ratio, so every transversal of the pencil gives the same value.` }
  );
  add("harmonic-bundle",
    { q: String.raw`On a line, $A=0$, $B=12$, $C=8$. Find the point $D$ with $(A,B;C,D)=-1$.`,
      s: String.raw`$C$ divides $AB$ internally in ratio $AC:CB=8:4=2:1$, so the harmonic conjugate $D$ divides $AB$ externally in $2:1$: $D=24$. (Check the signed cross-ratio: $\frac{AC}{BC}\big/\frac{AD}{BD}=\frac{8}{-4}\big/\frac{24}{12}=-1$.)` }
  );

  // ---------- Number theory ----------
  add("jacobi-symbol",
    { q: String.raw`Is $30$ a quadratic residue modulo the prime $53$?`,
      s: String.raw`$\left(\frac{30}{53}\right)=\left(\frac{2}{53}\right)\left(\frac{3}{53}\right)\left(\frac{5}{53}\right)$. Since $53\equiv 5\pmod 8$, $\left(\frac{2}{53}\right)=-1$; reciprocity gives $\left(\frac{3}{53}\right)=\left(\frac{53}{3}\right)=\left(\frac{2}{3}\right)=-1$ and $\left(\frac{5}{53}\right)=\left(\frac{53}{5}\right)=\left(\frac{3}{5}\right)=-1$. Product $=-1$, so $30$ is a non-residue.` }
  );
  add("gauss-lemma-qr",
    { q: String.raw`Use Gauss's lemma to compute $\left(\frac{3}{11}\right)$.`,
      s: String.raw`The residues of $3\cdot1,\dots,3\cdot5$ are $3,6,9,1,4\pmod{11}$; those exceeding $\tfrac{11}{2}$ are $6,9$, so $\mu=2$ and $\left(\frac{3}{11}\right)=(-1)^2=+1$ (indeed $5^2\equiv 3$).` }
  );
  add("dirichlet-convolution",
    { q: String.raw`Starting from $\sum_{d\mid n}\varphi(d)=n$, use Möbius inversion to recover a formula for $\varphi$.`,
      s: String.raw`The identity is $\mathrm{id}=\varphi*\mathbf 1$, so $\varphi=\mathrm{id}*\mu$: $\varphi(n)=\sum_{d\mid n}\mu(d)\,\frac{n}{d}=n\prod_{p\mid n}\Big(1-\frac1p\Big)$.` }
  );
  add("chevalley-warning",
    { q: String.raw`Show that a system of homogeneous polynomials over $\mathbb{F}_p$ in $n$ variables with total degree sum $< n$ has a nonzero common root.`,
      s: String.raw`Homogeneous polynomials vanish at $\mathbf 0$, so it is one common root. Chevalley–Warning makes the number of common roots $\equiv 0\pmod p$, hence at least $p\ge 2$; beyond $\mathbf 0$ there is another — a nonzero solution.` }
  );

  // ---------- Algebra ----------
  add("chebyshev-polynomials",
    { q: String.raw`Solve $8x^4-8x^2+1=\tfrac12$ on $[-1,1]$.`,
      s: String.raw`The left side is $T_4(x)=\cos 4\theta$ with $x=\cos\theta$. $\cos4\theta=\tfrac12$ gives $4\theta\in\{\tfrac{\pi}{3},\tfrac{5\pi}{3},\tfrac{7\pi}{3},\tfrac{11\pi}{3}\}$, so $x=\cos15^\circ,\cos75^\circ,\cos105^\circ,\cos165^\circ$ — four roots.` }
  );
  add("resultant-discriminant",
    { q: String.raw`For which real $k$ does $x^3-3x+k$ have a repeated root?`,
      s: String.raw`The cubic discriminant of $x^3+px+q$ is $-4p^3-27q^2$. With $p=-3,\,q=k$: $108-27k^2=0\Rightarrow k=\pm 2$. (At $k=2$, $x^3-3x+2=(x-1)^2(x+2)$.)` }
  );
  add("ramanujan-nested-radical",
    { q: String.raw`Evaluate $\sqrt{2+\sqrt{2+\sqrt{2+\cdots}}}$ and $\sqrt{2-\sqrt{2-\sqrt{2-\cdots}}}$.`,
      s: String.raw`Let $x$ be the first: $x^2=2+x\Rightarrow x=2$. Let $y$ be the second: $y^2=2-y\Rightarrow y=1$. (These match $\sqrt{2+2\cos\theta}=2\cos\tfrac\theta2$ at $\theta=0$ and $\theta=\tfrac{2\pi}{3}$.)` }
  );
  add("exponential-generating-functions",
    { q: String.raw`Use EGFs to get a formula for the Bell numbers $B_n$ (partitions of $[n]$ into any number of nonempty blocks).`,
      s: String.raw`One nonempty block has EGF $e^x-1$; a set of blocks (the exponential formula) has EGF $\exp(e^x-1)$. Hence $\sum_n B_n\frac{x^n}{n!}=e^{e^x-1}$, so $B_n=n!\,[x^n]\,e^{e^x-1}$.` }
  );

  // ---------- Advanced counting ----------
  add("lgv-lemma",
    { q: String.raw`With unit right/up steps, count pairs of non-intersecting lattice paths $a_1=(0,0)\!\to\!b_1=(2,1)$ and $a_2=(0,1)\!\to\!b_2=(2,2)$.`,
      s: String.raw`Single-path counts $M_{ij}=\#(a_i\to b_j)$: $M=\begin{pmatrix}3&6\\1&3\end{pmatrix}$. The number of non-intersecting pairs is $\det M=9-6=\mathbf{3}$.` }
  );
  add("matrix-tree-theorem",
    { q: String.raw`How many spanning trees does the cycle graph $C_5$ have?`,
      s: String.raw`Deleting any single edge of the cycle leaves a spanning tree, so there are $\mathbf{5}$. (Matrix–Tree agrees: any $C_n$ has exactly $n$ spanning trees.)` }
  );
  add("zeckendorf-theorem",
    { q: String.raw`Find the Zeckendorf representation of $2024$.`,
      s: String.raw`Greedily subtract the largest Fibonacci $\le$ the remainder: $2024=1597+377+34+13+3$ ($F_{16}+F_{13}+F_{8}+F_{6}+F_{3}$) — no two consecutive.` }
  );
  add("moser-circle",
    { q: String.raw`Six points on a circle are joined by all chords (no three meeting inside). How many interior intersection points and chord pieces are there, and how do they give the $31$ regions?`,
      s: String.raw`Interior crossings: $\binom64=15$. The $\binom62=15$ chords are cut into $15+2\cdot15=45$ pieces. With the $6$ boundary arcs, Euler's $V-E+F=2$ ($V=6+15=21$, $E=45+6=51$) gives $F=32$ — the $31$ interior regions plus the outer face.` }
  );

  // ---------- Cool facts ----------
  add("freshmans-dream",
    { q: String.raw`Prove $\binom{p}{k}\equiv 0\pmod p$ for $0\lt k\lt p$ (prime $p$), and deduce $(1+x)^p\equiv 1+x^p\pmod p$.`,
      s: String.raw`$\binom pk=\frac{p!}{k!\,(p-k)!}$ carries a factor of $p$ in the numerator that nothing in $k!\,(p-k)!$ (all factors $\lt p$) cancels, so $p\mid\binom pk$. Every middle term of $(1+x)^p=\sum\binom pk x^k$ then vanishes mod $p$, leaving $1+x^p$.` }
  );
  add("power-minus-self",
    { q: String.raw`Show $n^7\equiv n\pmod{42}$ for every integer $n$.`,
      s: String.raw`$42=2\cdot3\cdot7$, and for each prime $p\in\{2,3,7\}$ the value $p-1\in\{1,2,6\}$ divides $6=7-1$, so Fermat gives $n^7\equiv n\pmod p$. Combining the three via CRT yields $n^7\equiv n\pmod{42}$.` }
  );
  add("consecutive-product-factorial",
    { q: String.raw`Prove $\dfrac{(2n)!}{2^n\,n!}$ is an odd integer for every $n\ge 1$.`,
      s: String.raw`$\frac{(2n)!}{2^n n!}=\frac{(2n)!}{2\cdot4\cdots(2n)}=1\cdot3\cdot5\cdots(2n-1)$, the product of the first $n$ odd numbers — an integer, and odd since every factor is odd.` }
  );
  add("base10-curiosities",
    { q: String.raw`Compute $142857^2$ and split the result into its last six digits plus the rest. What happens?`,
      s: String.raw`$142857^2=20408122449$. Splitting: $122449+20408=142857$ — the cyclic number reappears (a "cast-out" quirk of numbers built from $\tfrac{10^k-1}{q}$).` }
  );
  add("trig-substitution",
    { q: String.raw`Let $x_0=\cos 12^\circ$ and $x_{n+1}=2x_n^2-1$. Express $x_3$ as a single cosine.`,
      s: String.raw`The map $x\mapsto 2x^2-1$ is $\cos\theta\mapsto\cos 2\theta$, so $x_n=\cos(2^n\cdot 12^\circ)$. Hence $x_3=\cos(8\cdot 12^\circ)=\cos 96^\circ$.` },
    { q: String.raw`Positive reals satisfy $a+b+c=abc$. Show that $a,b,c$ are the tangents of the angles of a triangle.`,
      s: String.raw`Set $a=\tan A,\ b=\tan B,\ c=\tan C$ with $A,B,C\in(0,\tfrac\pi2)$. The identity $\tan A+\tan B+\tan C=\tan A\tan B\tan C$ holds precisely when $A+B+C=\pi$, which the hypothesis $a+b+c=abc$ forces — so $A,B,C$ are the angles of a triangle.` }
  );
  // ---------- Step F (2026-10-24): two practice problems on every card ----------
  add("determinant-basics",
    { q: String.raw`Let $A = \begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix}$. Find $\det(A^3)$ and $\det(2A)$ without multiplying any matrices.`,
      s: String.raw`$\det A = 2\cdot4 - 1\cdot3 = 5$. The product rule gives $\det(A^3) = (\det A)^3 = 125$. Doubling $A$ doubles each of its two rows, and each row scales the determinant once, so $\det(2A) = 2^2\cdot5 = 20$.` }
  );
  add("anticomplementary-triangle",
    { q: String.raw`Triangle $ABC$ has area $7$, circumcenter $O = (1, 2)$ and orthocenter $H = (4, -2)$. Find the area, the circumcenter and the orthocenter of its anticomplementary triangle.`,
      s: String.raw`The area is $4\cdot7 = 28$. The circumcenter of the anticomplementary triangle is $H = (4, -2)$, and its orthocenter is the reflection of $H$ over $O$: $2O - H = (2 - 4, 4 + 2) = (-2, 6)$.` }
  );
  add("nine-point-circle",
    { q: String.raw`Find the center and radius of the nine-point circle of the triangle with vertices $A(0, 0)$, $B(6, 0)$, $C(0, 8)$, and check that it passes through the foot of the altitude from $A$.`,
      s: String.raw`The right angle at $A$ puts the circumcenter at the midpoint of the hypotenuse, $O = (3, 4)$, with $R = 5$, and the orthocenter at $H = A = (0, 0)$. So the center is the midpoint of $OH$, $\left(\tfrac32, 2\right)$, and the radius is $\tfrac52$. The foot of the altitude from $A$ to $BC$ ($4x + 3y = 24$) is $\left(\tfrac{96}{25}, \tfrac{72}{25}\right)$, whose distance from the center satisfies $\left(\tfrac{96}{25} - \tfrac32\right)^2 + \left(\tfrac{72}{25} - 2\right)^2 = \tfrac{117^2 + 44^2}{50^2} = \tfrac{15625}{2500} = \tfrac{25}4$, as it should.` }
  );
  add("hyperbola-properties",
    { q: String.raw`A point $P$ on $\frac{x^2}{9} - \frac{y^2}{16} = 1$ is $10$ from the focus $(5, 0)$. How far can it be from the other focus?`,
      s: String.raw`Here $a = 3$, so the distances to the two foci differ by $2a = 6$: the other distance is $4$ or $16$. Both happen. On the right branch the nearer focus is $(5, 0)$ and $P = (7.8, \pm9.6)$ gives $10$ and $16$; on the left branch $(5, 0)$ is the farther focus and $P = (-4.2, \pm\sqrt{15.36})$ gives $10$ and $4$.` }
  );
  add("axis-stretch-area",
    { q: String.raw`Find the area of the part of the ellipse $\dfrac{x^2}{9} + \dfrac{y^2}{4} \le 1$ that lies above the $x$-axis and below the line $y = \tfrac{2}{\sqrt3}x$.`,
      s: String.raw`Write $x = 3u$ and $y = 2v$, which turns the ellipse into the unit disk and multiplies every area by $\tfrac16$. The line becomes $2v = \tfrac2{\sqrt3}\cdot3u$, that is $v = \sqrt3u$, the ray at $60^\circ$. So the region is the image of a $60^\circ$ sector of the unit disk, area $\tfrac\pi6$, and its own area is $6\cdot\tfrac\pi6 = \pi$.` },
    { q: String.raw`$P$ moves on the ellipse $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$. Find the largest area of the triangle with vertices $(3, 0)$, $(0, 2)$ and $P$.`,
      s: String.raw`Shrink by $3$ along $x$ and by $2$ along $y$: the ellipse becomes the unit circle, the fixed vertices become $(1, 0)$ and $(0, 1)$, and every area is divided by $6$, so the largest triangle is the image of the largest one in the circle. That chord has length $\sqrt2$ and lies $\tfrac1{\sqrt2}$ from the center, so the farthest point of the circle is $1 + \tfrac1{\sqrt2}$ from it and the largest area there is $\tfrac12\sqrt2\left(1 + \tfrac1{\sqrt2}\right) = \tfrac{\sqrt2 + 1}2$. Back on the ellipse the largest area is $6\cdot\tfrac{\sqrt2+1}2 = 3\sqrt2 + 3$, at $P = \left(-\tfrac3{\sqrt2}, -\sqrt2\right)$.` }
  );
  add("area-method",
    { q: String.raw`Triangle $ABC$ has area $60$. The point $D$ on $BC$ has $BD : DC = 2 : 3$, and $E$ is the midpoint of $AD$. Find $[ABE]$ and $[BEC]$.`,
      s: String.raw`With apex $A$ and bases on $BC$, $[ABD] = \tfrac25\cdot60 = 24$ and $[ADC] = 36$. In triangle $ABD$ the point $E$ halves the base $AD$ seen from $B$, so $[ABE] = [BED] = 12$; likewise $[CED] = 18$. Then $[BEC] = [BED] + [CED] = 30$.` },
    { q: String.raw`$P$ is a point inside triangle $ABC$, and line $AP$ meets $BC$ at $D$ with $AP : PD = 3 : 1$. Find $\dfrac{[PBC]}{[ABC]}$.`,
      s: String.raw`Triangles $PBC$ and $ABC$ share the base $BC$, so their areas are in the ratio of their heights above $BC$. Those heights are proportional to $PD$ and $AD$ along the same line through $D$, so the ratio is $\tfrac{PD}{AD} = \tfrac14$.` }
  );
  add("polynomial-division",
    { q: String.raw`Divide $x^4 - 3x^3 + 2x - 5$ by $x^2 + x - 1$.`,
      s: String.raw`Leading terms first: $x^4 \div x^2 = x^2$, and subtracting $x^2(x^2 + x - 1)$ leaves $-4x^3 + x^2 + 2x - 5$. Next $-4x$, leaving $5x^2 - 2x - 5$, and then $5$, leaving $-7x$. So the quotient is $x^2 - 4x + 5$ and the remainder is $-7x$. Check: $(x^2 + x - 1)(x^2 - 4x + 5) - 7x = x^4 - 3x^3 + 9x - 5 - 7x$.` },
    { q: String.raw`Use synthetic division to divide $2x^3 - 5x^2 + 4x - 7$ by $x - 3$.`,
      s: String.raw`Multiply by $3$ and add along the coefficients $2, -5, 4, -7$: bring down $2$; $-5 + 6 = 1$; $4 + 3 = 7$; $-7 + 21 = 14$. So the quotient is $2x^2 + x + 7$ and the remainder is $14$, which is $P(3) = 54 - 45 + 12 - 7$.` }
  );
  add("gcd-substitution",
    { q: String.raw`Find all pairs of positive integers $(a, b)$ with $a + b = 150$ and $\operatorname{lcm}(a, b) = 4\gcd(a, b)$.`,
      s: String.raw`Write $a = dx$, $b = dy$ with $d = \gcd(a, b)$ and $\gcd(x, y) = 1$. Then $\operatorname{lcm}(a, b) = dxy$, so $xy = 4$, and coprimality leaves $(x, y) = (1, 4)$ or $(4, 1)$. The sum is $d(x + y) = 5d = 150$, so $d = 30$ and the pairs are $(30, 120)$ and $(120, 30)$.` }
  );
  add("direct-proof",
    { q: String.raw`Prove that if $a$ and $b$ are odd, then $a^2 + b^2$ is even but not divisible by $4$.`,
      s: String.raw`Write $a = 2m + 1$ and $b = 2n + 1$. Then $a^2 + b^2 = 4m^2 + 4m + 1 + 4n^2 + 4n + 1 = 4(m^2 + m + n^2 + n) + 2$, which leaves remainder $2$ on division by $4$: even, and not a multiple of $4$.` },
    { q: String.raw`Prove that a two-digit number plus the number with its digits reversed is always a multiple of $11$.`,
      s: String.raw`With tens digit $a$ and units digit $b$ the numbers are $10a + b$ and $10b + a$, and their sum is $11a + 11b = 11(a + b)$. For example, $47 + 74 = 121 = 11\cdot11$.` }
  );
  add("proof-by-contradiction",
    { q: String.raw`Prove that $\sqrt3$ is irrational.`,
      s: String.raw`Suppose $\sqrt3 = \tfrac pq$ in lowest terms. Then $p^2 = 3q^2$, so $3 \mid p^2$, and since $3$ is prime, $3 \mid p$. Writing $p = 3r$ gives $9r^2 = 3q^2$, so $q^2 = 3r^2$ and $3 \mid q$ as well. Then $\tfrac pq$ was not in lowest terms, a contradiction.` },
    { q: String.raw`Prove that $\log_2 3$ is irrational.`,
      s: String.raw`Suppose $\log_2 3 = \tfrac pq$ with positive integers $p, q$ (it is positive, since $3 \gt 1$). Then $2^{p/q} = 3$, so $2^p = 3^q$. The left side is even and the right side is odd, which is impossible.` }
  );
  add("proof-by-cases",
    { q: String.raw`Prove that no integer of the form $4k + 3$ is a sum of two squares.`,
      s: String.raw`Split on parity: an even square is $(2m)^2 = 4m^2 \equiv 0$ and an odd square is $(2m + 1)^2 = 4(m^2 + m) + 1 \equiv 1 \pmod 4$. So a sum of two squares is $0 + 0$, $0 + 1$ or $1 + 1$ modulo $4$, that is $0$, $1$ or $2$, and never $3$.` },
    { q: String.raw`Prove the triangle inequality $\lvert x + y\rvert \le \lvert x\rvert + \lvert y\rvert$ for real numbers.`,
      s: String.raw`If $x + y \ge 0$, then $\lvert x + y\rvert = x + y \le \lvert x\rvert + \lvert y\rvert$, since each number is at most its absolute value. If $x + y \lt 0$, then $\lvert x + y\rvert = -x - y \le \lvert x\rvert + \lvert y\rvert$, since each of $-x$ and $-y$ is at most its absolute value. One of the two cases always holds.` }
  );
  add("fundamental-theorem-symmetric",
    { q: String.raw`The roots of $t^3 - 3t + 1$ are $x$, $y$, $z$. Find $x^4 + y^4 + z^4$ without solving the cubic.`,
      s: String.raw`Vieta gives $e_1 = 0$, $e_2 = -3$, $e_3 = -1$. Then $x^2 + y^2 + z^2 = e_1^2 - 2e_2 = 6$, and $x^2y^2 + y^2z^2 + z^2x^2 = e_2^2 - 2e_1e_3 = 9$. So $x^4 + y^4 + z^4 = 6^2 - 2\cdot9 = 18$.` },
    { q: String.raw`The roots of $t^3 - 2t^2 + 3t - 5$ are $x$, $y$, $z$. Find $x^2 + y^2 + z^2$ and $\tfrac1x + \tfrac1y + \tfrac1z$.`,
      s: String.raw`By Vieta, $e_1 = 2$, $e_2 = 3$, $e_3 = 5$. Both quantities are symmetric, so they are polynomials (or a quotient) in these: $x^2 + y^2 + z^2 = e_1^2 - 2e_2 = 4 - 6 = -2$, and $\tfrac1x + \tfrac1y + \tfrac1z = \tfrac{e_2}{e_3} = \tfrac35$. The negative sum of squares shows that two of the roots are not real.` }
  );
  add("lagrange-interpolation-formula",
    { q: String.raw`Without computing its coefficients, evaluate $Q(0)$ for the cubic $Q$ with $Q(1) = 1$, $Q(2) = 2$, $Q(3) = 3$, $Q(4) = 5$.`,
      s: String.raw`Evaluate each Lagrange basis polynomial at $0$: $L_1(0) = \tfrac{(-2)(-3)(-4)}{(-1)(-2)(-3)} = 4$, $L_2(0) = \tfrac{(-1)(-3)(-4)}{(1)(-1)(-2)} = -6$, $L_3(0) = \tfrac{(-1)(-2)(-4)}{(2)(1)(-1)} = 4$ and $L_4(0) = \tfrac{(-1)(-2)(-3)}{(3)(2)(1)} = -1$. So $Q(0) = 1\cdot4 + 2\cdot(-6) + 3\cdot4 + 5\cdot(-1) = -1$.` },
    { q: String.raw`A polynomial of degree at most $4$ equals $1$ at each of $x = 0, 1, 2, 3, 4$. What is it?`,
      s: String.raw`The constant polynomial $1$ passes through all five points and has degree at most $4$, and through five points with distinct $x$-coordinates there is only one such polynomial. So it is the constant $1$; no basis polynomials need computing.` }
  );
  add("quadratic-forms",
    { q: String.raw`Write $y = x^2 - 6x + 5$ in vertex form and in factored form, and read off its vertex, roots and $y$-intercept.`,
      s: String.raw`Completing the square, $y = (x - 3)^2 - 4$, so the vertex is $(3, -4)$. Factoring, $y = (x - 1)(x - 5)$, so the roots are $1$ and $5$, symmetric about $x = 3$. The standard form shows the $y$-intercept $5$.` },
    { q: String.raw`A quadratic vanishes at $1$ and $7$ and takes the value $16$ at $3$. Find its largest value.`,
      s: String.raw`In factored form $y = a(x - 1)(x - 7)$, and $(3, 16)$ gives $a\cdot2\cdot(-4) = 16$, so $a = -2$. The vertex is midway between the roots, at $x = 4$, where $y = -2\cdot3\cdot(-3) = 18$. Since $a \lt 0$ the parabola opens downward, so the largest value is $18$, at the vertex $(4, 18)$.` }
  );
  add("inverse-function-properties",
    { q: String.raw`Let $f(x) = \dfrac{2x + 1}{x - 3}$. Find $f^{-1}(x)$ and $f^{-1}(5)$.`,
      s: String.raw`Solve $y = \tfrac{2x + 1}{x - 3}$ for $x$: $xy - 3y = 2x + 1$, so $x(y - 2) = 3y + 1$ and $f^{-1}(x) = \tfrac{3x + 1}{x - 2}$. Then $f^{-1}(5) = \tfrac{16}3$. Check: $f\left(\tfrac{16}3\right) = \tfrac{35/3}{7/3} = 5$.` }
  );
  add("matrix-multiplication",
    { q: String.raw`Three towns are joined by a road between every two of them. How many walks of length $4$ start and end at the first town?`,
      s: String.raw`The adjacency matrix is $A = \begin{pmatrix} 0 & 1 & 1 \\ 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}$, and $A^2 = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{pmatrix}$. The top-left entry of $A^4 = (A^2)^2$ is row $1$ of $A^2$ against column $1$: $2\cdot2 + 1\cdot1 + 1\cdot1 = 6$ walks.` },
    { q: String.raw`Compute $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^6$.`,
      s: String.raw`Square three times over: $A^2 = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$, $A^3 = A^2A = \begin{pmatrix} 3 & 2 \\ 2 & 1 \end{pmatrix}$, and $A^6 = (A^3)^2 = \begin{pmatrix} 13 & 8 \\ 8 & 5 \end{pmatrix}$. The entries are Fibonacci numbers, $\begin{pmatrix} F_7 & F_6 \\ F_6 & F_5 \end{pmatrix}$.` }
  );
  add("cramers-rule",
    { q: String.raw`Solve $3x + 4y = 10$, $5x - 2y = 8$ by Cramer's rule.`,
      s: String.raw`The coefficient determinant is $3\cdot(-2) - 4\cdot5 = -26$. Replacing the first column by $(10, 8)$ gives $10\cdot(-2) - 4\cdot8 = -52$, so $x = 2$; replacing the second gives $3\cdot8 - 10\cdot5 = -26$, so $y = 1$.` },
    { q: String.raw`For which $k$ does the system $kx + y = 1$, $x + ky = 1$ have exactly one solution, and what is $x$ then?`,
      s: String.raw`The determinant is $k^2 - 1$, so there is exactly one solution for $k \ne \pm1$, and then $x = \tfrac{1\cdot k - 1\cdot1}{k^2 - 1} = \tfrac1{k + 1}$. At $k = 1$ both equations are $x + y = 1$, infinitely many solutions; at $k = -1$ they are $-x + y = 1$ and $x - y = 1$, none.` }
  );
  add("matrix-inverse",
    { q: String.raw`Find the inverse of $\begin{pmatrix} 4 & 7 \\ 2 & 6 \end{pmatrix}$.`,
      s: String.raw`The determinant is $24 - 14 = 10$, so the inverse is $\tfrac1{10}\begin{pmatrix} 6 & -7 \\ -2 & 4 \end{pmatrix}$. Check the top-left entry of the product: $\tfrac{4\cdot6 + 7\cdot(-2)}{10} = 1$.` },
    { q: String.raw`Find the inverse of $\begin{pmatrix} 1 & 2 & 0 \\ 0 & 1 & 3 \\ 0 & 0 & 1 \end{pmatrix}$.`,
      s: String.raw`The determinant is $1$, so the inverse is the adjugate. Its cofactors give $\begin{pmatrix} 1 & -2 & 6 \\ 0 & 1 & -3 \\ 0 & 0 & 1 \end{pmatrix}$. Check: row $1$ of the matrix against column $3$ of this is $1\cdot6 + 2\cdot(-3) + 0 = 0$, and the diagonal entries of the product are $1$.` }
  );
  add("an-minus-bn",
    { q: String.raw`Find the prime factorization of $2^{15} + 1$.`,
      s: String.raw`The exponent $15$ is odd, so $a^3 + b^3$ with $a = 2^5$ and $b = 1$ gives $2^{15} + 1 = (2^5 + 1)(2^{10} - 2^5 + 1) = 33\cdot993$. Then $993 = 3\cdot331$, and $331$ is prime (no prime up to $18$ divides it). So $2^{15} + 1 = 3^2\cdot11\cdot331$.` }
  );
  add("sos-identity",
    { q: String.raw`Find all real $(x, y, z)$ with $x^2 + y^2 + z^2 = xy + yz + zx$ and $x + y + z = 12$.`,
      s: String.raw`The first equation says $\tfrac12\left[(x - y)^2 + (y - z)^2 + (z - x)^2\right] = 0$, and a sum of squares of reals vanishes only when each square does, so $x = y = z$. Then $x + y + z = 12$ gives $(4, 4, 4)$, the only solution.` },
    { q: String.raw`Real numbers satisfy $x - z = 6$. Find the least possible value of $x^2 + y^2 + z^2 - xy - yz - zx$.`,
      s: String.raw`Let $a = x - y$ and $b = y - z$, so $a + b = 6$. The expression is $\tfrac12\left(a^2 + b^2 + 36\right)$, and with $a + b$ fixed, $a^2 + b^2$ is least when $a = b = 3$. The least value is $\tfrac12(9 + 9 + 36) = 27$, at $y$ midway between $x$ and $z$.` }
  );
  add("useful-factorizations",
    { q: String.raw`Show that $n^4 + n^2 + 1$ is composite for every integer $n \ge 2$.`,
      s: String.raw`The first identity with $a = n$, $b = 1$ gives $n^4 + n^2 + 1 = (n^2 + n + 1)(n^2 - n + 1)$. For $n \ge 2$ the smaller factor is $n^2 - n + 1 = n(n - 1) + 1 \ge 3$, so both factors exceed $1$. For example, $n = 2$ gives $21 = 7\cdot3$.` },
    { q: String.raw`Compute $(2 + 3 + 5)^3 - 2^3 - 3^3 - 5^3$ by factoring.`,
      s: String.raw`The second identity gives $3(2 + 3)(3 + 5)(5 + 2) = 3\cdot5\cdot8\cdot7 = 840$. Check: $1000 - 8 - 27 - 125 = 840$.` }
  );
  add("bernoulli-inequality",
    { q: String.raw`Show that $\left(1 - \tfrac1{2n}\right)^n \ge \tfrac12$ for every positive integer $n$.`,
      s: String.raw`Here $x = -\tfrac1{2n} \ge -1$ and the exponent is $n \ge 1$, so Bernoulli's Inequality gives $\left(1 - \tfrac1{2n}\right)^n \ge 1 - n\cdot\tfrac1{2n} = \tfrac12$.` },
    { q: String.raw`Which is larger, $1.1^{20}$ or $3$?`,
      s: String.raw`Bernoulli's Inequality gives $(1 + 0.1)^{20} \ge 1 + 20\cdot0.1 = 3$, with equality only at $x = 0$, so $1.1^{20}$ is larger. (It is about $6.73$.)` }
  );
  add("jensens-inequality",
    { q: String.raw`Positive reals satisfy $a + b + c = 1$. Find the least value of $\tfrac1a + \tfrac1b + \tfrac1c$.`,
      s: String.raw`The function $f(x) = \tfrac1x$ has $f''(x) = \tfrac2{x^3} \gt 0$, so it is convex for $x \gt 0$. Jensen gives $\tfrac13\left(\tfrac1a + \tfrac1b + \tfrac1c\right) \ge f\left(\tfrac{a + b + c}3\right) = 3$, so the sum is at least $9$, with equality at $a = b = c = \tfrac13$.` },
    { q: String.raw`Use Jensen's Inequality on $\ln x$ to prove that positive reals with $a + b + c = 3$ have $abc \le 1$.`,
      s: String.raw`The logarithm has second derivative $-\tfrac1{x^2} \lt 0$, so it is concave and Jensen reverses: $\tfrac{\ln a + \ln b + \ln c}3 \le \ln\tfrac{a + b + c}3 = \ln1 = 0$. So $\ln(abc) \le 0$ and $abc \le 1$, with equality at $a = b = c = 1$. This is AM-GM for three numbers.` }
  );
  add("power-mean-inequality",
    { q: String.raw`Positive reals satisfy $a + b + c = 6$. Find the least value of $a^2 + b^2 + c^2$.`,
      s: String.raw`With exponents $1 \lt 2$, $M_1 \le M_2$: $2 = \tfrac{a + b + c}3 \le \sqrt{\tfrac{a^2 + b^2 + c^2}3}$, so $a^2 + b^2 + c^2 \ge 12$, with equality at $a = b = c = 2$.` },
    { q: String.raw`Positive reals satisfy $a^2 + b^2 = 8$. Find the largest value of $a + b$ and the least value of $\tfrac1a + \tfrac1b$.`,
      s: String.raw`Here $M_2 = \sqrt{\tfrac82} = 2$. From $M_1 \le M_2$, $\tfrac{a + b}2 \le 2$, so $a + b \le 4$. From $M_{-1} \le M_2$, $\tfrac2{1/a + 1/b} \le 2$, so $\tfrac1a + \tfrac1b \ge 1$. Both bounds are reached at $a = b = 2$.` }
  );
  add("common-angle-values",
    { q: String.raw`Evaluate $\cos300^\circ + \sin210^\circ\cdot\tan135^\circ$.`,
      s: String.raw`The reference angles are $60^\circ$, $30^\circ$ and $45^\circ$. Cosine is positive in the fourth quadrant, so $\cos300^\circ = \tfrac12$; sine is negative in the third, so $\sin210^\circ = -\tfrac12$; tangent is negative in the second, so $\tan135^\circ = -1$. The value is $\tfrac12 + \left(-\tfrac12\right)(-1) = 1$.` }
  );
  add("special-trig-values",
    { q: String.raw`Find $\tan15^\circ + \tan75^\circ$ and $\tan15^\circ\cdot\tan75^\circ$.`,
      s: String.raw`With $\tan15^\circ = 2 - \sqrt3$ and $\tan75^\circ = 2 + \sqrt3$, the sum is $4$ and the product is $4 - 3 = 1$. The product had to be $1$: $75^\circ = 90^\circ - 15^\circ$, so $\tan75^\circ = \tfrac1{\tan15^\circ}$.` }
  );
  add("arctan-telescoping",
    { q: String.raw`Find $\displaystyle\sum_{n=1}^{\infty}\arctan\frac1{n^2 + n + 1}$.`,
      s: String.raw`Since $n^2 + n + 1 = 1 + n(n + 1)$, each term is $\arctan(n + 1) - \arctan n$. The partial sums telescope to $\arctan(N + 1) - \arctan1$, which tends to $\tfrac\pi2 - \tfrac\pi4 = \tfrac\pi4$.` }
  );
  add("proportion-properties",
    { q: String.raw`If $\tfrac ab = \tfrac34$, find $\tfrac{a + b}{a - b}$.`,
      s: String.raw`Componendo and dividendo together turn $\tfrac ab = \tfrac34$ into $\tfrac{a + b}{a - b} = \tfrac{3 + 4}{3 - 4} = -7$. Check with $a = 3$, $b = 4$: $\tfrac7{-1}$.` },
    { q: String.raw`Nonzero reals satisfy $\dfrac{x}{y + z} = \dfrac{y}{z + x} = \dfrac{z}{x + y} = k$. Find every possible value of $k$.`,
      s: String.raw`If $x + y + z \ne 0$, addendo gives $k = \tfrac{x + y + z}{2(x + y + z)} = \tfrac12$, as with $x = y = z$. Addendo cannot be used when $x + y + z = 0$, and then $y + z = -x$, so each ratio is $-1$, as with $(x, y, z) = (1, 1, -2)$. So $k = \tfrac12$ or $k = -1$.` }
  );
  add("rectangles-in-grid",
    { q: String.raw`How many of the rectangles in a $4 \times 4$ grid of unit squares are not squares?`,
      s: String.raw`There are $\binom52\binom52 = 100$ rectangles and $1^2 + 2^2 + 3^2 + 4^2 = 30$ squares, so $70$ are not squares.` }
  );
  add("nested-subset-pairs",
    { q: String.raw`A club of $6$ people elects a committee of $4$, and the committee then names a working group from its own members (possibly nobody, possibly all four). How many outcomes are there?`,
      s: String.raw`This is the $k = 4$ term of the sum: choose the committee in $\binom64 = 15$ ways, then the working group as any of its $2^4 = 16$ subsets, for $240$ outcomes.` },
    { q: String.raw`Evaluate $\displaystyle\sum_{k=0}^{7}\binom7k2^k$ by a counting argument.`,
      s: String.raw`The sum counts pairs $A \subseteq B$ inside a $7$-element set by the size $k$ of $B$. Counting by element instead, each element is in $A$, in $B$ only, or in neither, so the sum is $3^7 = 2187$.` }
  );
  add("squared-binomial-sum",
    { q: String.raw`Evaluate $\binom50^2 + \binom51^2 + \cdots + \binom55^2$.`,
      s: String.raw`The identity gives $\binom{10}5 = 252$. Directly: $1 + 25 + 100 + 100 + 25 + 1 = 252$.` },
    { q: String.raw`How many subsets of $\{1, 2, \ldots, 12\}$ contain as many numbers from $1$ to $6$ as from $7$ to $12$?`,
      s: String.raw`Taking $k$ from each half can be done in $\binom6k^2$ ways, so the count is $\sum_{k=0}^{6}\binom6k^2 = \binom{12}6 = 924$.` }
  );
  add("committee-chair",
    { q: String.raw`A subset of $\{1, 2, \ldots, 10\}$ is chosen uniformly at random. What is its expected size?`,
      s: String.raw`The expected size is $\tfrac1{2^{10}}\sum_k k\binom{10}k = \tfrac{10\cdot2^9}{2^{10}} = 5$, as symmetry between a subset and its complement also shows.` }
  );
  add("stirling-bell",
    { q: String.raw`In how many ways can $5$ different books be split into $3$ nonempty piles, if the piles are not labeled?`,
      s: String.raw`This is $S(5, 3)$. From $S(4, 3) = 6$ and $S(4, 2) = 7$, the recurrence gives $S(5, 3) = 3\cdot6 + 7 = 25$.` },
    { q: String.raw`In how many ways can $4$ people be divided into nonempty unlabeled groups, any number of groups allowed?`,
      s: String.raw`This is the Bell number $B_4 = S(4, 1) + S(4, 2) + S(4, 3) + S(4, 4) = 1 + 7 + 6 + 1 = 15$.` }
  );
  add("tail-sum-expectation",
    { q: String.raw`A fair die is rolled until a $6$ appears. Use the tail-sum formula to find the expected number of rolls.`,
      s: String.raw`At least $k$ rolls are needed exactly when the first $k - 1$ rolls all miss, so $P(X \ge k) = \left(\tfrac56\right)^{k-1}$. Then $E[X] = \sum_{k\ge1}\left(\tfrac56\right)^{k-1} = \tfrac1{1 - 5/6} = 6$.` }
  );
  add("total-expectation",
    { q: String.raw`A fair die is rolled. If it shows an even number, that many fair coins are flipped; otherwise one coin is flipped. What is the expected number of heads?`,
      s: String.raw`Condition on the parity. Given an even roll, the number of coins is $2$, $4$ or $6$, averaging $4$, so the expected heads is $2$; given an odd roll it is $\tfrac12$. So $E = \tfrac12\cdot2 + \tfrac12\cdot\tfrac12 = \tfrac54$.` },
    { q: String.raw`A fair die is rolled to get $N$, and then $N$ more dice are rolled and added. What is the expected total?`,
      s: String.raw`The number $N$ is independent of the later rolls, so Wald's identity gives $E[\text{total}] = E[N]\cdot E[X] = \tfrac72\cdot\tfrac72 = \tfrac{49}4$.` }
  );
})();
