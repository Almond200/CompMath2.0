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
  add("expected-fixed-points",
    { q: String.raw`A shuffled deck has cards numbered $1$ to $10$ in positions $1$ to $10$. What is the expected number of cards in their own position, and the expected number of pairs of cards that have swapped places with each other?`,
      s: String.raw`Each card is in its own position with probability $\tfrac1{10}$, so by linearity the first expectation is $10\cdot\tfrac1{10} = 1$. A given pair $\{i, j\}$ is swapped when card $i$ sits at $j$ and card $j$ at $i$, probability $\tfrac1{10}\cdot\tfrac19$, and there are $\binom{10}2 = 45$ pairs, so the second expectation is $\tfrac{45}{90} = \tfrac12$.` },
    { q: String.raw`What is the probability that a random arrangement of $6$ objects leaves exactly $2$ of them in place?`,
      s: String.raw`Choose the two fixed objects in $\binom62 = 15$ ways; the other four must be a derangement, $D_4 = 9$. So the probability is $\tfrac{15\cdot9}{6!} = \tfrac{135}{720} = \tfrac3{16}$.` }
  );
  add("tree-basics",
    { q: String.raw`A connected graph has $12$ vertices and $20$ edges. How many edges must be removed to leave a tree, and how many cycles does a connected graph with $12$ vertices and $11$ edges have?`,
      s: String.raw`A tree on $12$ vertices has $11$ edges, and removing an edge from a cycle keeps the graph connected, so $20 - 11 = 9$ edges must go. A connected graph with $12$ vertices and $11$ edges is already a tree, so it has no cycles.` },
    { q: String.raw`A forest (a graph with no cycles) has $20$ vertices and $3$ connected pieces. How many edges does it have?`,
      s: String.raw`Each piece is a tree, with one edge fewer than its vertices. Adding over the three pieces, the forest has $20 - 3 = 17$ edges.` }
  );
  add("planar-graph-bound",
    { q: String.raw`What is the largest number of edges in a simple planar graph on $10$ vertices? Can a planar graph on $6$ vertices have $14$ edges?`,
      s: String.raw`The bound gives $3\cdot10 - 6 = 24$, reached by any triangulation of $10$ points. On $6$ vertices the bound is $3\cdot6 - 6 = 12 \lt 14$, so no: $K_6$ with one edge removed is not planar.` },
    { q: String.raw`Show that a planar graph on $8$ vertices with no triangles has at most $12$ edges, and name one that has exactly $12$.`,
      s: String.raw`With no triangles every face is bounded by at least $4$ edges, so the bound is $2v - 4 = 12$. The graph of the cube's edges reaches it: $8$ vertices, $12$ edges, and every face a square.` }
  );
  add("halls-marriage",
    { q: String.raw`Four students choose projects: the first accepts $a$ or $b$, the second $b$ or $c$, the third $a$ or $c$, and the fourth any of $a$, $b$, $c$, $d$. Can each be given a different project? Check Hall's condition.`,
      s: String.raw`Any one or two of the first three students accept at least two projects, all three together accept $\{a, b, c\}$, and any set with the fourth student accepts at least $|S|$ projects since the fourth adds $d$. Hall's condition holds, so yes: for example $a$, $b$, $c$, $d$ in order.` },
    { q: String.raw`In a bipartite graph every vertex has the same degree $k \ge 1$. Prove that the graph has a perfect matching.`,
      s: String.raw`Both sides have the same size, since each side meets all $k$ times the side's size of edges. For a set $S$ on one side, its $k|S|$ edges all end in $N(S)$, which receives at most $k|N(S)|$ edges in all, so $|N(S)| \ge |S|$. Hall's condition holds, so one side can be matched completely, and with equal sides that is a perfect matching.` }
  );
  add("konigs-theorem",
    { q: String.raw`On a grid, the cells $(1, 1)$, $(1, 2)$, $(2, 1)$ and $(3, 3)$ are marked (row, column). Find the most marked cells with no two in a row or column, and the fewest rows and columns that cover every mark.`,
      s: String.raw`Rows and columns are the two sides of a bipartite graph whose edges are the marks. The marks $(1, 2)$, $(2, 1)$, $(3, 3)$ share no row or column, so the matching has size $3$, and rows $1$, $2$, $3$ cover every mark, so a cover of size $3$ exists. By Kőnig's Theorem both are optimal.` },
    { q: String.raw`A bipartite graph on $10$ vertices has a largest matching of $3$ edges. How large is its largest set of vertices with no edge between any two of them?`,
      s: String.raw`The complement of a vertex cover is an independent set and the other way round, so the largest independent set has $10 - \tau$ vertices. Kőnig's Theorem gives $\tau = \nu = 3$, so the answer is $7$.` }
  );
  add("triangle-type-by-sides",
    { q: String.raw`Classify the triangles with sides $7, 8, 11$ and $6, 7, 9$ as acute, right or obtuse.`,
      s: String.raw`Compare the square of the longest side with the sum of the other two squares. For $7, 8, 11$: $121 \gt 49 + 64 = 113$, so it is obtuse. For $6, 7, 9$: $81 \lt 36 + 49 = 85$, so it is acute.` },
    { q: String.raw`For which positive integers $x$ is the triangle with sides $x$, $x + 1$, $x + 2$ acute?`,
      s: String.raw`It is a triangle when $x + (x + 1) \gt x + 2$, that is $x \ge 2$. It is acute when $(x + 2)^2 \lt x^2 + (x + 1)^2$, which simplifies to $x^2 - 2x - 3 \gt 0$, $(x - 3)(x + 1) \gt 0$, so $x \gt 3$. So $x \ge 4$; $x = 3$ gives the right triangle $3, 4, 5$ and $x = 2$ the obtuse $2, 3, 4$.` }
  );
  add("incenter-area-split",
    { q: String.raw`In the right triangle with $BC = 5$, $CA = 12$, $AB = 13$, find the areas of $BIC$, $CIA$ and $AIB$, where $I$ is the incenter.`,
      s: String.raw`The area is $30$ and the perimeter $30$, so each piece is its side's share of $30$: $[BIC] = 5$, $[CIA] = 12$, $[AIB] = 13$. The inradius is $\tfrac{30}{15} = 2$, and indeed $\tfrac12\cdot5\cdot2 = 5$.` },
    { q: String.raw`A point $P$ inside triangle $ABC$ has $[PBC] : [PCA] : [PAB] = a : b : c$, the ratio of the opposite sides. Prove that $P$ is the incenter.`,
      s: String.raw`With $d_a$, $d_b$, $d_c$ the distances from $P$ to the sides, the areas are $\tfrac12ad_a$, $\tfrac12bd_b$, $\tfrac12cd_c$. Their being in the ratio $a : b : c$ forces $d_a = d_b = d_c$. The only interior point equally far from all three sides is the incenter.` }
  );
  add("incircle-excircle-touch",
    { q: String.raw`In triangle $ABC$ with $BC = 14$, $CA = 15$, $AB = 13$, find where the incircle and the $A$-excircle touch $BC$.`,
      s: String.raw`Here $s = 21$. The incircle touches $BC$ at $s - b = 6$ from $B$, and the $A$-excircle at $s - c = 8$ from $B$. The two points are $2 = |b - c|$ apart and symmetric about the midpoint of $BC$, which is $7$ from $B$.` },
    { q: String.raw`The incircle of triangle $ABC$ touches $BC$ at $D$ with $BD = 3$ and $DC = 5$. The $A$-excircle touches $BC$ at $E$. Find $BE$.`,
      s: String.raw`The two touch points are mirror images across the midpoint of $BC$, so $BE = DC = 5$.` }
  );
  add("incircle-excircle-homothety",
    { q: String.raw`Find the inradius and the $A$-exradius of the triangle with $BC = 5$, $CA = 4$, $AB = 3$.`,
      s: String.raw`Here $s = 6$, $s - a = 1$ and the area is $6$, so $r = \tfrac66 = 1$. The homothety at $A$ scales by $\tfrac s{s - a} = 6$, so $r_a = 6$. Check: $r_a = \tfrac{\text{area}}{s - a} = \tfrac61$.` },
    { q: String.raw`A triangle has semiperimeter $15$, inradius $2$ and $A$-exradius $5$. Find $BC$.`,
      s: String.raw`From $\tfrac r{r_a} = \tfrac{s - a}s$, $\tfrac25 = \tfrac{15 - a}{15}$, so $15 - a = 6$ and $a = 9$. Both radii give the same area, $rs = 30 = r_a(s - a) = 5\cdot6$.` }
  );
  add("triangle-half-angle-identities",
    { q: String.raw`For the $3$-$4$-$5$ triangle, find $\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2$ and $\cos\tfrac A2\cos\tfrac B2\cos\tfrac C2$.`,
      s: String.raw`The area is $6$ and $s = 6$, so $r = 1$, and the hypotenuse is a diameter, so $R = \tfrac52$. The products are $\tfrac r{4R} = \tfrac1{10}$ and $\tfrac s{4R} = \tfrac6{10} = \tfrac35$.` },
    { q: String.raw`A triangle has inradius $2$ and semiperimeter $12$. Find $\tan\tfrac A2\tan\tfrac B2\tan\tfrac C2$.`,
      s: String.raw`Divide the two identities: the product of the tangents is $\tfrac{r/4R}{s/4R} = \tfrac rs = \tfrac2{12} = \tfrac16$, whatever $R$ is. For the $6$-$8$-$10$ triangle, which fits, the factors are $\tan45^\circ = 1$, $\tfrac13$ and $\tfrac12$.` }
  );
  add("altitude-bisector-angle",
    { q: String.raw`Prove that the altitude and the angle bisector from $A$ are the same line exactly when $AB = AC$.`,
      s: String.raw`The angle between them is $\tfrac{|B - C|}2$, which is $0$ exactly when $\angle B = \angle C$, that is, when the sides opposite those angles, $AC$ and $AB$, are equal.` },
    { q: String.raw`In triangle $ABC$ the altitude and the bisector from $A$ meet at $10^\circ$, and $\angle B = 50^\circ$. Find $\angle C$.`,
      s: String.raw`The condition is $\tfrac{|B - C|}2 = 10^\circ$, so $C = 30^\circ$ or $C = 70^\circ$. Both give triangles, with $\angle A = 100^\circ$ or $60^\circ$.` }
  );
  add("cevas-theorem",
    { q: String.raw`Use Ceva's Theorem to show that the lines from the vertices of a triangle to the points where the incircle touches the opposite sides pass through one point.`,
      s: String.raw`Equal tangents give $AF = AE = s - a$, $BF = BD = s - b$ and $CD = CE = s - c$. Then $\tfrac{AF}{FB}\cdot\tfrac{BD}{DC}\cdot\tfrac{CE}{EA} = \tfrac{s - a}{s - b}\cdot\tfrac{s - b}{s - c}\cdot\tfrac{s - c}{s - a} = 1$, so by the converse the three lines meet (at the Gergonne point).` },
    { q: String.raw`Use Ceva's Theorem to show that the altitudes of an acute triangle pass through one point.`,
      s: String.raw`The feet split the sides as $AF = b\cos A$, $FB = a\cos B$, $BD = c\cos B$, $DC = b\cos C$, $CE = a\cos C$, $EA = c\cos A$. The product of the three ratios is $\tfrac{b\cos A\cdot c\cos B\cdot a\cos C}{a\cos B\cdot b\cos C\cdot c\cos A} = 1$, so the altitudes are concurrent.` }
  );
  add("perpendicularity-lemma",
    { q: String.raw`With $A = (0, 0)$, $B = (4, 2)$, $C = (1, 3)$ and $D = (3, -1)$, test with lengths alone whether $AB \perp CD$.`,
      s: String.raw`Here $AC^2 = 10$, $AD^2 = 10$, $BC^2 = 9 + 1 = 10$ and $BD^2 = 1 + 9 = 10$, so $AC^2 - AD^2 = 0 = BC^2 - BD^2$ and the lines are perpendicular. Check with slopes: $\tfrac12$ and $-2$.` },
    { q: String.raw`Prove that the diagonals of a kite are perpendicular.`,
      s: String.raw`In kite $ABCD$ with $AB = BC$ and $CD = DA$, the sums $AB^2 + CD^2$ and $BC^2 + DA^2$ are equal term by term. By the lemma the diagonals $AC$ and $BD$ are perpendicular.` }
  );
  add("contact-triangle",
    { q: String.raw`For the triangle with $BC = 14$, $CA = 15$, $AB = 13$, find the tangent lengths from each vertex and the area of the contact triangle.`,
      s: String.raw`With $s = 21$ the tangent lengths are $s - a = 7$ from $A$, $s - b = 6$ from $B$ and $s - c = 8$ from $C$. The area is $84$, so $r = 4$ and $R = \tfrac{13\cdot14\cdot15}{4\cdot84} = \tfrac{65}8$. The contact triangle has area $\tfrac r{2R}\cdot84 = \tfrac{16}{65}\cdot84 = \tfrac{1344}{65}$.` }
  );
  add("euler-line-ratio",
    { q: String.raw`A triangle has circumradius $5$ and $a^2 + b^2 + c^2 = 200$. How far is the orthocenter from the circumcenter, and the centroid from the circumcenter?`,
      s: String.raw`The formula gives $OH^2 = 9\cdot25 - 200 = 25$, so $OH = 5$, and the centroid is a third of the way along, $OG = \tfrac53$. The $6$-$8$-$10$ triangle fits: $H$ is the right-angle vertex and $O$ the midpoint of the hypotenuse, $5$ away.` },
    { q: String.raw`The points $A = (5, 0)$, $B = (0, 5)$, $C = (-3, 4)$ lie on the circle of radius $5$ about the origin. Find the orthocenter of triangle $ABC$.`,
      s: String.raw`With the circumcenter at the origin, $H = A + B + C = (2, 9)$. Check: $H - A = (-3, 9)$ is perpendicular to $C - B = (-3, -1)$, since $9 - 9 = 0$, and $H - B = (2, 4)$ is perpendicular to $C - A = (-8, 4)$.` }
  );
  add("euler-line-parallel-side",
    { q: String.raw`In triangle $ABC$ the Euler line is parallel to $BC$ and $\angle B = 45^\circ$. Find $\tan C$ and $\tan A$.`,
      s: String.raw`The condition $\tan B\tan C = 3$ with $\tan B = 1$ gives $\tan C = 3$. Then $\tan A = -\tan(B + C) = -\tfrac{1 + 3}{1 - 3} = 2$, so all three angles are acute, as the card says they must be.` },
    { q: String.raw`Show that $\tan B\tan C = 3$ is equivalent to $\cos A = 2\cos B\cos C$ in a triangle.`,
      s: String.raw`Since $A = 180^\circ - B - C$, $\cos A = -\cos(B + C) = \sin B\sin C - \cos B\cos C = \cos B\cos C\,(\tan B\tan C - 1)$. This equals $2\cos B\cos C$ exactly when $\tan B\tan C - 1 = 2$ (neither cosine can vanish, since $\tan B \tan C = 3$ needs both tangents defined, and $\cos A = 2\cos B\cos C$ fails at a right angle $B$ or $C$).` }
  );
  add("simson-line",
    { q: String.raw`The triangle $A(0, 0)$, $B(6, 0)$, $C(0, 8)$ has circumcircle $(x - 3)^2 + (y - 4)^2 = 25$, which passes through $P(-1, 7)$. Find the feet of the perpendiculars from $P$ to the three side lines and check that they are collinear.`,
      s: String.raw`On $AB$ ($y = 0$) the foot is $(-1, 0)$ and on $AC$ ($x = 0$) it is $(0, 7)$. On $BC$ ($4x + 3y = 24$), $P$ gives $4(-1) + 3\cdot7 - 24 = -7$, so the foot is $P + \tfrac7{25}(4, 3) = \left(\tfrac3{25}, \tfrac{196}{25}\right)$. The line through the first two is $y = 7(x + 1)$, and $7\left(\tfrac3{25} + 1\right) = \tfrac{196}{25}$, so all three are on it. It also passes through $\left(-\tfrac12, \tfrac72\right)$, the midpoint of $P$ and the orthocenter $H = A$.` }
  );
  add("symmedian-lemoine",
    { q: String.raw`Show that in a triangle with a right angle at $A$, the $A$-symmedian is the altitude from $A$.`,
      s: String.raw`The altitude from the right angle meets $BC$ at $D$ with $BD = \tfrac{c^2}a$ and $DC = \tfrac{b^2}a$ (each leg is the geometric mean of the hypotenuse and its own projection). So $BD : DC = c^2 : b^2$, the symmedian's ratio, and the two lines from $A$ meet $BC$ at the same point.` },
    { q: String.raw`In triangle $ABC$, $AB = 4$, $AC = 6$, $BC = 7$. Find the distances from $B$ to the points where the median, the angle bisector and the symmedian from $A$ meet $BC$.`,
      s: String.raw`The median splits $BC$ evenly, $3.5$ from $B$. The bisector splits it as $4 : 6$, so $7\cdot\tfrac4{10} = 2.8$. The symmedian splits it as $4^2 : 6^2 = 4 : 9$, so $7\cdot\tfrac4{13} = \tfrac{28}{13} \approx 2.15$. The bisector lies between the other two, as the reflection requires.` }
  );
  add("fermat-point",
    { q: String.raw`Find the least value of $XA + XB + XC$ for an equilateral triangle $ABC$ of side $6$.`,
      s: String.raw`Every angle is below $120^\circ$ and by symmetry the Fermat point is the center, which is $\tfrac6{\sqrt3} = 2\sqrt3$ from each vertex, so the least value is $6\sqrt3$. The construction agrees: the apex of the equilateral triangle erected outward on $BC$ is two heights, $6\sqrt3$, from $A$.` },
    { q: String.raw`In triangle $ABC$, $AB = 3$, $AC = 5$ and $\angle A = 130^\circ$. Find the least value of $XA + XB + XC$.`,
      s: String.raw`The angle at $A$ is at least $120^\circ$, so the minimizer is the vertex $A$ itself, and the least value is $AB + AC = 8$.` }
  );
  add("apollonius-circle",
    { q: String.raw`With $A = (-2, 0)$ and $B = (2, 0)$, find the locus of points $P$ with $PA = 2\,PB$.`,
      s: String.raw`The points dividing $AB$ in the ratio $2 : 1$ are $\left(\tfrac23, 0\right)$ inside and $(6, 0)$ outside, so the locus is the circle with that diameter: center $\left(\tfrac{10}3, 0\right)$, radius $\tfrac83$. Check: $(x + 2)^2 + y^2 = 4\left((x - 2)^2 + y^2\right)$ simplifies to $\left(x - \tfrac{10}3\right)^2 + y^2 = \tfrac{64}9$.` }
  );
  add("concyclicity-tests",
    { q: String.raw`Prove that an isosceles trapezoid (parallel sides $AB$ and $CD$, legs $AD = BC$) is cyclic.`,
      s: String.raw`The equal legs make the base angles equal, $\angle A = \angle B$. The parallel sides make $\angle B + \angle C = 180^\circ$, as co-interior angles. So $\angle A + \angle C = 180^\circ$, and opposite angles supplementary is the first test.` },
    { q: String.raw`In triangle $ABC$ the altitudes from $B$ and $C$ have feet $E$ on $AC$ and $F$ on $AB$. Prove that $B$, $C$, $E$, $F$ lie on one circle.`,
      s: String.raw`The segment $BC$ subtends a right angle at both $E$ and $F$, which lie on the same side of $BC$. Equal angles on one segment from the same side is the second test, so the four points are concyclic: the circle is the one with diameter $BC$.` }
  );
  add("brahmaguptas-formula",
    { q: String.raw`A cyclic quadrilateral has sides $7$, $15$, $20$, $24$ in order. Find its area, and check it against the circle's diameter.`,
      s: String.raw`Here $s = 33$, so the area is $\sqrt{26\cdot18\cdot13\cdot9} = \sqrt{54756} = 234$. Check: $7^2 + 24^2 = 15^2 + 20^2 = 25^2$, so the diagonal between the sides $7, 15$ and the sides $20, 24$ can be a diameter of length $25$, splitting the quadrilateral into right triangles of areas $84$ and $150$.` }
  );
  add("cyclic-perpendicular-diagonals",
    { q: String.raw`A quadrilateral with perpendicular diagonals is inscribed in a circle, and two opposite sides are $5$ and $12$. Find the radius and $b^2 + d^2$ for the other two sides.`,
      s: String.raw`Opposite sides give $4R^2 = 5^2 + 12^2 = 169$, so $R = \tfrac{13}2$, and the other pair also has $b^2 + d^2 = 169$.` },
    { q: String.raw`The perpendicular diagonals of a cyclic quadrilateral $ABCD$ meet at $P$ with $PA = 2$, $PC = 8$ and $PB = PD = 4$. Find the circumradius.`,
      s: String.raw`The lengths are consistent with a circle, since $PA\cdot PC = 16 = PB\cdot PD$. The right triangles at $P$ give $AB^2 = 4 + 16 = 20$ and $CD^2 = 64 + 16 = 80$, so $4R^2 = 100$ and $R = 5$.` }
  );
  add("incenter-coordinates",
    { q: String.raw`Find the incenter of the triangle $A(0, 0)$, $B(14, 0)$, $C(5, 12)$.`,
      s: String.raw`The sides are $a = BC = 15$, $b = CA = 13$ and $c = AB = 14$, with sum $42$. So $I = \tfrac{15(0, 0) + 13(14, 0) + 14(5, 12)}{42} = \tfrac{(252, 168)}{42} = (6, 4)$. The $y$-coordinate is the inradius $\tfrac{84}{21} = 4$, as it must be with $AB$ on the $x$-axis.` },
    { q: String.raw`For the same triangle, find the excenter opposite $A$.`,
      s: String.raw`Flip the sign of $a$: $\tfrac{-15(0, 0) + 13(14, 0) + 14(5, 12)}{-15 + 13 + 14} = \tfrac{(252, 168)}{12} = (21, 14)$. Its height above $AB$ is the exradius $\tfrac{84}{s - a} = \tfrac{84}6 = 14$.` }
  );
  add("section-formula",
    { q: String.raw`For the triangle $A(1, 2)$, $B(7, 4)$, $C(4, 9)$, find the point that divides the median from $A$ in the ratio $2 : 1$, and compare it with the centroid.`,
      s: String.raw`The median runs to the midpoint $M = \left(\tfrac{11}2, \tfrac{13}2\right)$ of $BC$. With $AP : PM = 2 : 1$, $P = \tfrac{2M + 1\cdot A}{3} = \tfrac{(11 + 1, 13 + 2)}3 = (4, 5)$, which is the centroid $\tfrac{A + B + C}3 = \left(\tfrac{12}3, \tfrac{15}3\right)$.` }
  );
  add("conic-classification",
    { q: String.raw`Classify the curves $4x^2 - 4xy + y^2 + 2x - 3 = 0$ and $2x^2 + xy + 3y^2 = 5$.`,
      s: String.raw`For the first, $B^2 - 4AC = 16 - 16 = 0$: a parabola (its quadratic part is $(2x - y)^2$). For the second, $1 - 24 \lt 0$: an ellipse, and a real one, since $\left(\sqrt{5/2}, 0\right)$ lies on it.` }
  );
  add("conic-tangent-lines",
    { q: String.raw`Find the tangent to $\frac{x^2}{16} + \frac{y^2}{9} = 1$ at $\left(\frac{16}5, \frac95\right)$, and check it with the slope condition.`,
      s: String.raw`The point is on the ellipse, since $\tfrac{16}{25} + \tfrac9{25} = 1$. The tangent is $\tfrac{x\cdot16/5}{16} + \tfrac{y\cdot9/5}9 = 1$, that is $x + y = 5$. In slope form $y = -x + 5$, and $k^2 = 25 = 16\cdot1 + 9 = a^2m^2 + b^2$, as it should.` },
    { q: String.raw`Find the lines of slope $1$ tangent to the hyperbola $\frac{x^2}9 - \frac{y^2}4 = 1$.`,
      s: String.raw`Substitute $y = x + k$: $4x^2 - 9(x + k)^2 = 36$, that is $5x^2 + 18kx + 9k^2 + 36 = 0$. Tangency means a double root: $(18k)^2 - 20(9k^2 + 36) = 144k^2 - 720 = 0$, so $k^2 = 5$ (the hyperbola's version $k^2 = a^2m^2 - b^2$). The tangents are $y = x \pm \sqrt5$.` }
  );
  add("conic-parametric",
    { q: String.raw`Find the largest area of a rectangle with sides parallel to the axes inscribed in $\frac{x^2}{16} + \frac{y^2}9 = 1$.`,
      s: String.raw`Put a corner at $(4\cos t, 3\sin t)$ with $0 \lt t \lt \tfrac\pi2$. The area is $(8\cos t)(6\sin t) = 24\sin2t$, largest at $t = \tfrac\pi4$: the area is $24$, with corner $\left(2\sqrt2, \tfrac{3\sqrt2}2\right)$.` },
    { q: String.raw`Find the point of the parabola $x^2 = 4y$ closest to $(0, 5)$.`,
      s: String.raw`Write the point as $(2t, t^2)$. The squared distance is $4t^2 + (t^2 - 5)^2 = t^4 - 6t^2 + 25 = (t^2 - 3)^2 + 16$, least at $t^2 = 3$. The closest points are $(\pm2\sqrt3, 3)$, at distance $4$.` }
  );
  add("cavalieris-principle",
    { q: String.raw`Use Cavalieri's Principle to find the volume of a hemisphere of radius $r$.`,
      s: String.raw`Compare it with a cylinder of radius $r$ and height $r$ from which a cone with its apex at the bottom center and base on top is removed. At height $h$ the hemisphere's slice is a disk of area $\pi(r^2 - h^2)$, and the other solid's slice is a ring of area $\pi r^2 - \pi h^2$. So the volumes agree: $\pi r^3 - \tfrac13\pi r^3 = \tfrac23\pi r^3$.` }
  );
  add("tetrahedron-centroid",
    { q: String.raw`For the tetrahedron $A(0, 0, 0)$, $B(6, 0, 0)$, $C(0, 6, 0)$, $D(0, 0, 6)$, check that the centroid lies three quarters of the way from $D$ to the centroid of face $ABC$, and at the midpoint of the bimedian joining the midpoints of $AB$ and $CD$.`,
      s: String.raw`The centroid is $G = \left(\tfrac32, \tfrac32, \tfrac32\right)$ and face $ABC$ has centroid $(2, 2, 0)$. Three quarters of the way from $D$: $(0, 0, 6) + \tfrac34(2, 2, -6) = \left(\tfrac32, \tfrac32, \tfrac32\right)$. The midpoints of $AB$ and $CD$ are $(3, 0, 0)$ and $(0, 3, 3)$, whose midpoint is $G$ again.` }
  );
  add("pascals-theorem",
    { q: String.raw`The points $A(5, 0)$, $B(3, 4)$, $C(0, 5)$, $D(-4, 3)$, $E(-5, 0)$, $F(0, -5)$ lie on $x^2 + y^2 = 25$. Find the three points where opposite sides of hexagon $ABCDEF$ meet, and check that they are collinear.`,
      s: String.raw`$AB$ is $2x + y = 10$ and $DE$ is $3x - y = -15$, meeting at $(-1, 12)$. $BC$ is $x + 3y = 15$ and $EF$ is $x + y = -5$, meeting at $(-15, 10)$. $CD$ is $x - 2y = -10$ and $FA$ is $x - y = 5$, meeting at $(20, 15)$. All three satisfy $x - 7y + 85 = 0$, the Pascal line.` },
    { q: String.raw`A hexagon $ABCDEF$ inscribed in a circle has $AB \parallel DE$ and $BC \parallel EF$. Prove that $CD \parallel FA$.`,
      s: String.raw`Parallel lines meet at a point at infinity, so two of Pascal's three points are at infinity, and the Pascal line through them is the line at infinity. The third point, $CD \cap FA$, lies on that line too, which means $CD$ and $FA$ are parallel.` }
  );
  add("pole-polar",
    { q: String.raw`Find the polar of $P = (5, 10)$ with respect to $x^2 + y^2 = 25$, and check that it is the chord of contact.`,
      s: String.raw`The polar of $(x_0, y_0)$ is $x_0x + y_0y = 25$, here $5x + 10y = 25$, or $x + 2y = 5$. It meets the circle where $(5 - 2y)^2 + y^2 = 25$, that is $y = 0$ or $y = 4$: at $(5, 0)$ and $(-3, 4)$. The tangents there, $x = 5$ and $-3x + 4y = 25$, both pass through $P$.` },
    { q: String.raw`With the same circle, $Q = (1, 2)$ lies on the polar of $P = (5, 10)$. Check La Hire's duality.`,
      s: String.raw`Indeed $1 + 2\cdot2 = 5$, so $Q$ is on $x + 2y = 5$. The polar of $Q$ is $x + 2y = 25$, and $5 + 20 = 25$, so $P$ lies on the polar of $Q$, as La Hire says.` }
  );
  add("harmonic-bundle",
    { q: String.raw`In triangle $ABC$, $AB = 6$, $AC = 3$ and $BC = 6$. The internal and external bisectors from $A$ meet line $BC$ at $D$ and $E$. Find them and show that $(B, C; D, E) = -1$.`,
      s: String.raw`Put $B = 0$ and $C = 6$ on the line. The internal bisector splits $BC$ as $6 : 3$, so $D = 4$; the external one divides it externally in the same ratio, $EB : EC = 2 : 1$, so $E = 12$. Then $\tfrac{BD}{DC} = \tfrac42 = 2 = \tfrac{BE}{EC} = \tfrac{12}6$, one internal and one external, so the bundle is harmonic. Check with the midpoint $M = 3$: $MD\cdot ME = 1\cdot9 = 9 = MB^2$.` }
  );
  add("largest-odd-divisor-sum",
    { q: String.raw`With $f(k)$ the largest odd divisor of $k$, find $f(1) + f(2) + \cdots + f(10)$ from the recurrence, and check it directly.`,
      s: String.raw`$S(10) = 5^2 + S(5)$, $S(5) = 3^2 + S(2)$ and $S(2) = 1^2 + S(1) = 2$, so $S(5) = 11$ and $S(10) = 36$. Directly: $1 + 1 + 3 + 1 + 5 + 3 + 7 + 1 + 9 + 5 = 36$.` },
    { q: String.raw`Find $f(1) + f(2) + \cdots + f(100)$.`,
      s: String.raw`Halve repeatedly: $S(100) = 2500 + S(50)$, $S(50) = 625 + S(25)$, $S(25) = 13^2 + S(12)$, $S(12) = 36 + S(6)$, $S(6) = 9 + S(3)$ and $S(3) = 2^2 + S(1) = 5$. Back up: $S(6) = 14$, $S(12) = 50$, $S(25) = 219$, $S(50) = 844$, $S(100) = 3344$.` }
  );
  add("multiplicative-functions",
    { q: String.raw`Compute $\varphi(360)$ and $d(360)$.`,
      s: String.raw`Split $360 = 2^3\cdot3^2\cdot5$ into coprime prime powers. Then $\varphi(360) = \varphi(8)\varphi(9)\varphi(5) = 4\cdot6\cdot4 = 96$ and $d(360) = 4\cdot3\cdot2 = 24$.` }
  );
  add("lcm-pair-counting",
    { q: String.raw`In how many ways can $360$ be written as $a\cdot b$, in order, with $a$ and $b$ coprime?`,
      s: String.raw`Coprime factors have $\operatorname{lcm}(a, b) = ab = 360$ and $\gcd(a, b) = 1$. For each prime of $360 = 2^3\cdot3^2\cdot5$ the larger exponent must be the full one and the smaller must be $0$, so the whole prime power goes to $a$ or to $b$: $2$ choices instead of $2e + 1$. That gives $2^3 = 8$ pairs.` }
  );
  add("carmichael-function",
    { q: String.raw`Find $\lambda(100)$, and conclude that $a^{20} \equiv 1 \pmod{100}$ for every $a$ coprime to $100$.`,
      s: String.raw`$\lambda(100) = \operatorname{lcm}(\lambda(4), \lambda(25)) = \operatorname{lcm}(2, 20) = 20$, half of $\varphi(100) = 40$. So every $a$ coprime to $100$ has $a^{20} \equiv 1$; for example $3^{20} = 3486784401$ ends in $01$.` },
    { q: String.raw`Find the smallest $m$ with $a^m \equiv 1 \pmod{240}$ for every $a$ coprime to $240$.`,
      s: String.raw`$240 = 16\cdot3\cdot5$, so $m = \lambda(240) = \operatorname{lcm}(\lambda(16), \lambda(3), \lambda(5)) = \operatorname{lcm}(4, 2, 4) = 4$, although $\varphi(240) = 64$. Check: $7^4 = 2401 = 10\cdot240 + 1$.` }
  );
  add("crt-solution-counting",
    { q: String.raw`Count the integers $x$ from $0$ to $90$ whose cube leaves remainder $1$ on division by $91$.`,
      s: String.raw`Split $91 = 7\cdot13$. Modulo $7$ the solutions are $1, 2, 4$, and modulo $13$ they are $1, 3, 9$, three each. So there are $3\cdot3 = 9$ solutions modulo $91$.` }
  );
  add("eulers-criterion",
    { q: String.raw`Is $2$ a quadratic residue modulo $17$?`,
      s: String.raw`Compute $2^{(17-1)/2} = 2^8 = 256 = 15\cdot17 + 1 \equiv 1$, so yes. Indeed $6^2 = 36 = 2\cdot17 + 2$.` },
    { q: String.raw`Show that $x^2 \equiv -1 \pmod{23}$ has no solution.`,
      s: String.raw`By Euler's Criterion, $(-1)^{(23-1)/2} = (-1)^{11} = -1$, so $-1$ is a non-residue modulo $23$. This is the case $p \equiv 3 \pmod 4$.` }
  );
  add("lte-lemma",
    { q: String.raw`Find the exponent of $3$ in $10^9 - 1$.`,
      s: String.raw`Here $3 \mid 10 - 1$ and $3 \nmid 10$, so $v_3(10^9 - 1) = v_3(9) + v_3(9) = 2 + 2 = 4$. Check: $999999999 = 81\cdot12345679$, and $12345679$ has digit sum $37$, not a multiple of $3$.` },
    { q: String.raw`Find the exponent of $5$ in $6^{25} - 1$, and of $7$ in $3^{21} + 4^{21}$.`,
      s: String.raw`For the first, $5 \mid 6 - 1$, so $v_5(6^{25} - 1) = v_5(5) + v_5(25) = 1 + 2 = 3$. For the second, $21$ is odd and $7 \mid 3 + 4$, so $v_7(3^{21} + 4^{21}) = v_7(7) + v_7(21) = 1 + 1 = 2$.` }
  );
  add("primes-6k",
    { q: String.raw`Find the greatest common divisor of all the numbers $p^2 - 1$ for primes $p \gt 3$.`,
      s: String.raw`Every such $p^2 - 1$ is a multiple of $24$. And $5^2 - 1 = 24$ itself is one of them, so the greatest common divisor is exactly $24$.` },
    { q: String.raw`Twin primes $p$ and $p + 2$ are both larger than $3$. Show that $12$ divides their sum.`,
      s: String.raw`Each is $\pm1$ modulo $6$, and they differ by $2$, so $p \equiv -1$ and $p + 2 \equiv 1$. Then $p + 1$ is a multiple of $6$ and the sum $2p + 2 = 2(p + 1)$ is a multiple of $12$. For example, $11 + 13 = 24$.` }
  );
  add("prime-divides-binomial",
    { q: String.raw`Show that $(a + b)^p - a^p - b^p$ is a multiple of $p$ for any integers $a$, $b$ and prime $p$, and check it with $p = 5$, $a = 1$, $b = 2$.`,
      s: String.raw`Expanding, the difference is $\sum_{k=1}^{p-1}\binom pka^kb^{p-k}$, and each $\binom pk$ with $0 \lt k \lt p$ is a multiple of $p$. Check: $3^5 - 1 - 32 = 210 = 5\cdot42$.` },
    { q: String.raw`Are all of $\binom{12}1, \ldots, \binom{12}{11}$ multiples of $12$? Compare with $\binom{11}k$.`,
      s: String.raw`No: $\binom{12}4 = 495$ is odd. The argument needs $p$ prime, so that no factor of $k!(p - k)!$ cancels it. For $11$ every $\binom{11}k$ with $1 \le k \le 10$ is a multiple of $11$, from $\binom{11}1 = 11$ to $\binom{11}5 = 462 = 11\cdot42$.` }
  );
  add("sum-of-two-squares",
    { q: String.raw`Which of $2025$, $2026$ and $2027$ are sums of two squares?`,
      s: String.raw`$2025 = 3^4\cdot5^2$ has the prime $3$ to an even power, so it is one: $27^2 + 36^2$ (and $45^2 + 0^2$). $2026 = 2\cdot1013$ with $1013 \equiv 1 \pmod 4$ prime, so it is one: $45^2 + 1^2$. $2027$ is a prime $\equiv 3 \pmod 4$, so it is not.` }
  );
  add("zeckendorf-theorem",
    { q: String.raw`List every way to write $10$ as a sum of distinct Fibonacci numbers ($1, 2, 3, 5, 8$), and pick out the Zeckendorf one.`,
      s: String.raw`With $8$ the rest is $2$, giving $8 + 2$. Without $8$, the rest $1 + 2 + 3 + 5 = 11$ must lose $1$, giving $5 + 3 + 2$. So there are two, and only $8 + 2$ avoids consecutive Fibonacci numbers ($5 + 3 + 2$ uses three in a row). It is also what the greedy rule gives.` }
  );
  add("fit-copies",
    { q: String.raw`A solid cylinder of radius $3$ is cut by a slanted plane, so that the remaining piece has height $4$ at the lowest point of its top edge and $6$ at the highest. Find its volume.`,
      s: String.raw`Turn a second copy upside down and set it on top, rotated half a turn: its height $6$ meets the first copy's $4$ and its $4$ meets the $6$, and the two pieces fill a cylinder of radius $3$ and height $10$. So the piece has volume $\tfrac12\cdot9\pi\cdot10 = 45\pi$, the cylinder of the average height $5$.` }
  );
  add("box-tetrahedron",
    { q: String.raw`A tetrahedron has three mutually perpendicular edges of lengths $3$, $4$, $5$ meeting at one vertex. Find its volume.`,
      s: String.raw`It is a corner cut off a $3\times4\times5$ box, so its volume is $\tfrac{3\cdot4\cdot5}6 = 10$.` },
    { q: String.raw`Find the volume of a regular tetrahedron with edge $3\sqrt2$ by boxing it.`,
      s: String.raw`Its edges are face diagonals of a cube of side $3$, with the four vertices at alternate corners. Removing the four corner tetrahedra, each $\tfrac{27}6$, leaves $27 - 18 = 9$, which is $\tfrac{pqr}3$. Check: $\tfrac{a^3}{6\sqrt2} = \tfrac{(3\sqrt2)^3}{6\sqrt2} = 9$.` }
  );
  add("scale-one-level",
    { q: String.raw`Join the midpoints of a square of side $4$ to form a new square, and repeat forever. Find the total area of all the squares.`,
      s: String.raw`Each new square has side $\tfrac1{\sqrt2}$ times the last, so area ratio $k^2 = \tfrac12$. The total is $\tfrac{16}{1 - 1/2} = 32$.` },
    { q: String.raw`A square of side $2$ has a circle inscribed in it, a square inscribed in that circle, and so on forever. Find the total perimeter of all the squares.`,
      s: String.raw`The circle has diameter $2$, and the square inside it has diagonal $2$, so side $\sqrt2$: each level scales lengths by $k = \tfrac1{\sqrt2}$. Perimeters use $k$, not $k^2$: the total is $\tfrac8{1 - 1/\sqrt2} = \tfrac{8\sqrt2}{\sqrt2 - 1} = 16 + 8\sqrt2$.` }
  );
  add("shared-leg-pythagoras",
    { q: String.raw`Find the altitude to the side of length $14$ in the triangle with sides $13$, $14$, $15$.`,
      s: String.raw`Let the altitude cut the side $14$ into $x$ (next to the side $13$) and $14 - x$. Then $13^2 - x^2 = 15^2 - (14 - x)^2$, so $169 = 29 + 28x$ and $x = 5$. The altitude is $\sqrt{169 - 25} = 12$.` },
    { q: String.raw`Find the altitude to the side of length $56$ in the triangle with sides $25$, $39$, $56$.`,
      s: String.raw`With pieces $x$ and $56 - x$, $25^2 - x^2 = 39^2 - (56 - x)^2$ gives $625 = -1615 + 112x$, so $x = 20$ and the altitude is $\sqrt{625 - 400} = 15$.` }
  );
  add("ravi-substitution",
    { q: String.raw`A triangle has incircle tangent lengths $1$, $2$, $3$. Find its sides and its area.`,
      s: String.raw`The sides are $2 + 3 = 5$, $3 + 1 = 4$ and $1 + 2 = 3$. Heron's Formula in tangent lengths is $\sqrt{xyz(x + y + z)} = \sqrt{1\cdot2\cdot3\cdot6} = 6$, the area of the $3$-$4$-$5$ right triangle.` },
    { q: String.raw`Prove that the sides of every triangle satisfy $abc \ge (a + b - c)(b + c - a)(c + a - b)$.`,
      s: String.raw`With $a = y + z$, $b = z + x$, $c = x + y$ the right side is $2z\cdot2x\cdot2y = 8xyz$, and the left is $(y + z)(z + x)(x + y)$. AM-GM gives $y + z \ge 2\sqrt{yz}$ and so on, and multiplying, the left side is at least $8xyz$. Equality holds for the equilateral triangle.` }
  );
  add("directed-lengths",
    { q: String.raw`On a number line $A = 2$, $B = 7$, $C = -3$. Find $\overline{AB}$, $\overline{BC}$, $\overline{AC}$ and the ratio $\tfrac{\overline{AC}}{\overline{CB}}$.`,
      s: String.raw`$\overline{AB} = 5$, $\overline{BC} = -10$ and $\overline{AC} = -5$, and indeed $5 + (-10) = -5$ although $C$ is not between $A$ and $B$. The ratio is $\tfrac{-5}{10} = -\tfrac12$, negative because $C$ lies outside the segment $AB$.` },
    { q: String.raw`A chord of $x^2 + y^2 = 25$ lies along the $x$-axis and passes through $P = (1, 0)$. Check that the directed product $\overline{PA}\cdot\overline{PB}$ equals $OP^2 - r^2$.`,
      s: String.raw`The chord meets the circle at $A = (-5, 0)$ and $B = (5, 0)$, so $\overline{PA}\cdot\overline{PB} = (-6)(4) = -24$, and $OP^2 - r^2 = 1 - 25 = -24$. The negative sign records that $P$ is inside the circle.` }
  );
  add("polar-form",
    { q: String.raw`Compute $(1 + i)^{12}$.`,
      s: String.raw`$1 + i = \sqrt2\,e^{i\pi/4}$, so $(1 + i)^{12} = (\sqrt2)^{12}e^{3\pi i} = 64\cdot(-1) = -64$.` },
    { q: String.raw`Find every complex $z$ with $z^3 = 8i$.`,
      s: String.raw`$8i = 8e^{i\pi/2}$, so $z = 2e^{i(\pi/6 + 2\pi k/3)}$ for $k = 0, 1, 2$: $2e^{i\pi/6} = \sqrt3 + i$, $2e^{5\pi i/6} = -\sqrt3 + i$ and $2e^{3\pi i/2} = -2i$.` }
  );
  add("take-logs-linearize",
    { q: String.raw`Positive reals satisfy $a^2b = 128$ and $ab^3 = 2048$. Find $a$ and $b$.`,
      s: String.raw`With $A = \log_2a$ and $B = \log_2b$ the equations are linear: $2A + B = 7$ and $A + 3B = 11$. Then $A = 2$ and $B = 3$, so $a = 4$ and $b = 8$. Check: $16\cdot8 = 128$ and $4\cdot512 = 2048$.` }
  );
  add("palindromic-polynomials",
    { q: String.raw`Solve $x^4 - 5x^3 + 8x^2 - 5x + 1 = 0$.`,
      s: String.raw`Divide by $x^2$ and set $y = x + \tfrac1x$: $(y^2 - 2) - 5y + 8 = y^2 - 5y + 6 = 0$, so $y = 2$ or $y = 3$. Then $x + \tfrac1x = 2$ gives the double root $x = 1$, and $x + \tfrac1x = 3$ gives $x = \tfrac{3 \pm \sqrt5}2$, a pair of reciprocals.` },
    { q: String.raw`The cubic $2x^3 + 3x^2 + 3x + 2$ has coefficients that read the same both ways. Which real number must be a root, and what else is there?`,
      s: String.raw`The degree is odd and the coefficients read the same backwards, so $x = -1$ is a root: $-2 + 3 - 3 + 2 = 0$. Dividing leaves $2x^2 + x + 2$, again palindromic, whose discriminant $1 - 16$ is negative. So $x = -1$ is the only real root.` }
  );
  add("sqrt-approximation",
    { q: String.raw`Estimate $\sqrt{50}$ to three decimal places by hand.`,
      s: String.raw`From $7^2 = 49$, $\sqrt{50} \approx 7 + \tfrac1{14} \approx 7.0714$. This overshoots: $7.0714^2 \approx 50.005$, so subtract about $\tfrac{0.005}{2\cdot7.07} \approx 0.0004$, giving $7.071$. (The true value is $7.07107$.)` },
    { q: String.raw`Which is larger, $\sqrt{101} - 10$ or $\tfrac1{20}$?`,
      s: String.raw`The estimate $\sqrt{101} \approx 10 + \tfrac1{20}$ is always an overestimate, since $\left(10 + \tfrac1{20}\right)^2 = 101 + \tfrac1{400}$. So $\sqrt{101} - 10 \lt \tfrac1{20}$.` }
  );
  add("products-over-roots",
    { q: String.raw`The fifth roots of unity other than $1$ are $\omega^k$ for $k = 1, 2, 3, 4$, with $\omega = e^{2\pi i/5}$. Multiply together the four numbers $1 - \omega^k$.`,
      s: String.raw`The four numbers $\omega^k$ are the roots of $P(x) = \tfrac{x^5 - 1}{x - 1} = x^4 + x^3 + x^2 + x + 1$, so the product is $P(1) = 5$.` },
    { q: String.raw`Without finding them, add up the reciprocals $\tfrac1{1 - r}$ over the three roots $r$ of $x^3 - 4x + 1$.`,
      s: String.raw`With $P(x) = x^3 - 4x + 1$ the sum is $\tfrac{P'(1)}{P(1)}$. Here $P'(x) = 3x^2 - 4$, so $P'(1) = -1$, and $P(1) = -2$, giving $\tfrac12$.` }
  );
  add("function-symmetry-equation",
    { q: String.raw`For every real $x$, the values of $f$ at $x$ and at $4 - x$ add to $6$. If $f(1) = 2$, what is $f(3)$, and about which point is the graph symmetric?`,
      s: String.raw`At $x = 1$ the equation reads $f(1) + f(3) = 6$, so $f(3) = 4$. The arguments always add to $4$ and the values to $6$, so the graph is symmetric about the point $(2, 3)$.` }
  );
  add("injectivity-surjectivity",
    { q: String.raw`A function $f : \mathbb R \to \mathbb R$ satisfies $f(f(x)) = x + 1$. Show that $f$ is injective and that $f(x + 1) = f(x) + 1$.`,
      s: String.raw`If $f(a) = f(b)$, applying $f$ gives $a + 1 = b + 1$, so $a = b$. For the second, compute $f(f(f(x)))$ two ways: as $f$ of $f(f(x)) = x + 1$ it is $f(x + 1)$, and as the identity applied at $f(x)$ it is $f(x) + 1$.` },
    { q: String.raw`Show that a function $f : \mathbb R \to \mathbb R$ with $f(f(x)) = 2x + 3$ is both injective and surjective.`,
      s: String.raw`Injective: $f(a) = f(b)$ gives $2a + 3 = 2b + 3$. Surjective: for any $y$, the number $x = \tfrac{y - 3}2$ has $f(f(x)) = y$, so $y$ is a value of $f$, at the point $f(x)$.` }
  );
  add("quadratic-root-location",
    { q: String.raw`For which $k$ does $x^2 - kx + 4 = 0$ have one root above $5$ and one below?`,
      s: String.raw`The parabola opens upward, so $5$ lies strictly between the roots exactly when $f(5) = 29 - 5k \lt 0$, that is $k \gt \tfrac{29}5$. No discriminant check is needed: a negative value already forces two real roots.` },
    { q: String.raw`For which $m$ do both roots of $x^2 - 2mx + m + 2 = 0$ lie strictly between $0$ and $3$?`,
      s: String.raw`Four conditions. The discriminant $4(m^2 - m - 2) \ge 0$ gives $m \le -1$ or $m \ge 2$. The vertex $m$ lies in $(0, 3)$. The ends are positive: $f(0) = m + 2 \gt 0$ and $f(3) = 11 - 5m \gt 0$, so $m \lt \tfrac{11}5$. Together, $2 \le m \lt \tfrac{11}5$.` }
  );
  add("numeral-as-polynomial",
    { q: String.raw`Show that $121_b$ is a perfect square in every base $b \ge 3$.`,
      s: String.raw`As a polynomial in the base, $121_b = b^2 + 2b + 1 = (b + 1)^2$, and $b \ge 3$ makes the digit $2$ legal.` },
    { q: String.raw`In which base does $132_b$ equal $56$?`,
      s: String.raw`$b^2 + 3b + 2 = 56$ gives $b^2 + 3b - 54 = (b + 9)(b - 6) = 0$, so $b = 6$, which allows the digit $3$. Check: $36 + 18 + 2 = 56$.` }
  );
  add("subtract-equal-remainders",
    { q: String.raw`Find the largest $d$ for which $437$, $563$ and $1067$ leave the same remainder on division by $d$, and find that remainder.`,
      s: String.raw`$d$ must divide the differences $126$ and $504$, so it divides $\gcd(126, 504) = 126$, and $d = 126$ works. The common remainder is $437 - 3\cdot126 = 59$.` }
  );
  add("reduce-divisibility-constant",
    { q: String.raw`For how many integers $n$, negative ones included, is $n - 3$ a divisor of $n^2 + 5$?`,
      s: String.raw`Modulo $n - 3$, $n \equiv 3$, so $n^2 + 5 \equiv 14$ and $n - 3$ must divide $14$: $n - 3 \in \{\pm1, \pm2, \pm7, \pm14\}$. That gives $8$ integers, $n = -11, -4, 1, 2, 4, 5, 10, 17$.` }
  );
  add("grid-path-fill",
    { q: String.raw`A walker heading from the origin to $(4, 4)$ by unit moves east or north must avoid the flooded corner $(2, 2)$. Count the routes.`,
      s: String.raw`Fill the grid with the blocked point set to $0$. Row by row from the bottom: $1,1,1,1,1$; $1,2,3,4,5$; $1,3,0,4,9$; $1,4,4,8,17$; $1,5,9,17,34$. So $34$ paths avoid it, which matches $\binom84 - \binom42^2 = 70 - 36$.` }
  );
  add("proving-both-directions",
    { q: String.raw`Prove that an integer $n$ is even if and only if $n^2$ is even.`,
      s: String.raw`If $n = 2k$, then $n^2 = 2(2k^2)$ is even. Conversely, suppose $n^2$ is even; if $n$ were odd, $n = 2k + 1$, then $n^2 = 2(2k^2 + 2k) + 1$ would be odd, so $n$ is even. The second direction is the one that needs an argument by contrapositive.` },
    { q: String.raw`Prove that for sets, $A \cap B = A$ if and only if $A \subseteq B$.`,
      s: String.raw`If $A \cap B = A$, every element of $A$ is in $A \cap B$, hence in $B$, so $A \subseteq B$. If $A \subseteq B$, then $A \cap B \subseteq A$ always, and every $x \in A$ is also in $B$, so $A \subseteq A \cap B$; the two inclusions give $A \cap B = A$.` }
  );
  add("induction",
    { q: String.raw`Prove that $1 + 3 + 5 + \cdots + (2n - 1) = n^2$ for every $n \ge 1$.`,
      s: String.raw`For $n = 1$ both sides are $1$. If the sum of the first $n$ odd numbers is $n^2$, adding the next one gives $n^2 + (2n + 1) = (n + 1)^2$, the statement for $n + 1$.` },
    { q: String.raw`Prove that $3$ divides $4^n - 1$ for every $n \ge 1$.`,
      s: String.raw`For $n = 1$, $4 - 1 = 3$. For the step, find the case $n$ inside the case $n + 1$: $4^{n+1} - 1 = 4(4^n - 1) + 3$, and both terms are multiples of $3$ when $4^n - 1$ is.` }
  );
  add("strong-induction",
    { q: String.raw`Prove that every integer $n \ge 2$ is a product of primes.`,
      s: String.raw`Assume it for every integer from $2$ to $n - 1$. If $n$ is prime, it is a product of one prime. Otherwise $n = ab$ with $2 \le a, b \le n - 1$, and both $a$ and $b$ are products of primes by hypothesis, so $n$ is too. The step reaches back to $a$ and $b$, which can be far below $n - 1$.` },
    { q: String.raw`The Fibonacci numbers have $F_1 = F_2 = 1$ and $F_n = F_{n-1} + F_{n-2}$. Prove that $F_n \lt 2^n$ for every $n \ge 1$.`,
      s: String.raw`The cases $n = 1$ and $n = 2$ hold: $1 \lt 2$ and $1 \lt 4$. For $n \ge 3$, assuming the claim for all smaller indices, $F_n = F_{n-1} + F_{n-2} \lt 2^{n-1} + 2^{n-2} \lt 2^{n-1} + 2^{n-1} = 2^n$. The step uses the two previous cases, so two starting cases are needed.` }
  );
  add("minimal-counterexample",
    { q: String.raw`Prove that $\sqrt2$ is irrational by taking the smallest possible denominator.`,
      s: String.raw`Suppose $\sqrt2 = \tfrac pq$ with $q$ the smallest positive denominator possible. From $1 \lt \sqrt2 \lt 2$, $q \lt p \lt 2q$. Then $\tfrac{2q - p}{p - q}$ also equals $\sqrt2$: cross-multiplying, $2q - p = \sqrt2(p - q)$ becomes $2q + \sqrt2q = p + \sqrt2p$, which holds since $p = \sqrt2q$. Its denominator $p - q$ is positive and smaller than $q$, contradicting the choice of $q$.` },
    { q: String.raw`Prove that every positive integer is a sum of distinct powers of $2$.`,
      s: String.raw`Suppose not, and let $n$ be the smallest positive integer that is not; $n \ne 1 = 2^0$. Take the largest $2^k \le n$. If $n = 2^k$ we are done, so $0 \lt n - 2^k \lt 2^k$, and $n - 2^k$, being smaller, is a sum of distinct powers of $2$, all below $2^k$. Adding $2^k$ writes $n$ the same way, a contradiction.` }
  );
  add("infinite-descent",
    { q: String.raw`Prove by descent that no positive integers satisfy $x^2 = 2y^2$, and say what this shows about $\sqrt2$.`,
      s: String.raw`The right side is even, so $x = 2a$, and then $4a^2 = 2y^2$ gives $y^2 = 2a^2$: the pair $(y, a)$ satisfies the same equation with $y \lt x$. A positive solution would start an endless decreasing chain $x \gt y \gt a \gt \cdots$, so there is none, and $\sqrt2 = \tfrac xy$ is impossible.` },
    { q: String.raw`Show by descent that the only integer triple with $x^3 + 2y^3 = 4z^3$ is $(0, 0, 0)$.`,
      s: String.raw`The equation forces $x$ even; with $x = 2a$ it becomes $4a^3 + y^3 = 2z^3$, which forces $y$ even; with $y = 2b$ it becomes $2a^3 + 4b^3 = z^3$, which forces $z$ even; with $z = 2c$ it becomes $a^3 + 2b^3 = 4c^3$. So halving all three gives another solution, and a nonzero solution could be halved forever, which no nonzero integer allows. Only $(0, 0, 0)$ remains.` }
  );
  add("proof-by-construction",
    { q: String.raw`Prove that there are $100$ consecutive positive integers, none of them prime.`,
      s: String.raw`Take $101! + 2, 101! + 3, \ldots, 101! + 101$. For $2 \le k \le 101$, $k$ divides both $101!$ and $k$, so it divides $101! + k$, which is larger than $k$ and so not prime.` },
    { q: String.raw`Prove that every odd number $2n + 1 \ge 3$ is a leg of a right triangle with integer sides.`,
      s: String.raw`Take the legs $2n + 1$ and $2n^2 + 2n$ and the hypotenuse $2n^2 + 2n + 1$. The hypotenuse and the second leg differ by $1$, so the difference of their squares is their sum, $4n^2 + 4n + 1 = (2n + 1)^2$. For $n = 1$ this is $3, 4, 5$ and for $n = 2$ it is $5, 12, 13$.` }
  );
  add("pigeonhole-argument",
    { q: String.raw`Prove that among any $5$ points in a square of side $1$, two are at most $\tfrac{\sqrt2}2$ apart.`,
      s: String.raw`Cut the square into four squares of side $\tfrac12$; these are the boxes. Two of the five points share a small square, and two points of a square of side $\tfrac12$ are at most its diagonal, $\tfrac{\sqrt2}2$, apart.` },
    { q: String.raw`Prove that among any $6$ numbers chosen from $1, 2, \ldots, 10$, two are coprime.`,
      s: String.raw`Use the five boxes $\{1, 2\}$, $\{3, 4\}$, $\{5, 6\}$, $\{7, 8\}$, $\{9, 10\}$. Two of the six numbers fall in one box, so they are consecutive integers, and consecutive integers are coprime.` }
  );
  add("equal-edge-tetrahedron",
    { q: String.raw`A tetrahedron has opposite edges equal in pairs, of lengths $\sqrt5$, $\sqrt{10}$ and $\sqrt{13}$. Find the box it sits in, its volume and its circumradius.`,
      s: String.raw`Solve $p^2 + q^2 = 5$, $q^2 + r^2 = 10$, $r^2 + p^2 = 13$: the three add to $2(p^2 + q^2 + r^2) = 28$, so $p^2 = 4$, $q^2 = 1$, $r^2 = 9$ and the box is $2\times1\times3$. The volume is $\tfrac{pqr}3 = 2$, and the circumsphere is the box's, with radius half the space diagonal, $\tfrac{\sqrt{14}}2$.` },
    { q: String.raw`Show that all four faces of a tetrahedron with opposite edges equal in pairs are congruent.`,
      s: String.raw`Each face uses three of the six edges, one from each opposite pair, since two edges of a face always meet and opposite edges never do. So every face has sides $a$, $b$, $c$, and the four faces are congruent by SSS.` }
  );
  add("nested-similar",
    { q: String.raw`An equilateral triangle of side $8$ is joined at its side midpoints to form a smaller triangle, and the process is repeated inside the new triangle forever. Find the total perimeter of all the triangles.`,
      s: String.raw`Each new triangle has half the side of the last, so perimeters scale by $k = \tfrac12$: $24 + 12 + 6 + \cdots = \tfrac{24}{1 - 1/2} = 48$.` },
    { q: String.raw`Inside a square of side $4$, a new square is drawn with its vertices on the sides, each a quarter of the way along its side, and the process repeats forever. Find the total area of all the squares.`,
      s: String.raw`The new side is the hypotenuse of a right triangle with legs $\tfrac14$ and $\tfrac34$ of the old side, so $k^2 = \tfrac1{16} + \tfrac9{16} = \tfrac58$. The total area is $\tfrac{16}{1 - 5/8} = \tfrac{128}3$.` }
  );
  add("point-in-equilateral",
    { q: String.raw`A point inside an equilateral triangle of side $6$ is $1$ and $2$ away from two of its sides. How far is it from the third side?`,
      s: String.raw`The three distances to the sides add to the height, $3\sqrt3$, so the third distance is $3\sqrt3 - 3 \approx 2.20$.` }
  );
  add("floor-sum-range",
    { q: String.raw`Compute $\lfloor\sqrt1\rfloor + \lfloor\sqrt2\rfloor + \cdots + \lfloor\sqrt{100}\rfloor$.`,
      s: String.raw`The floor equals $m$ on the block $m^2 \le k \lt (m + 1)^2$, which holds $2m + 1$ integers. So the sum is $\sum_{m=1}^{9}m(2m + 1) + 10 = 2\cdot285 + 45 + 10 = 625$, the last $10$ from $k = 100$ alone.` },
    { q: String.raw`Compute $\sum_{k=1}^{50}\left\lfloor\tfrac k3\right\rfloor$.`,
      s: String.raw`The terms are $0, 0$ and then each value $m$ three times, for $k = 3m, 3m + 1, 3m + 2$. Values $1$ to $15$ give $3(1 + \cdots + 15) = 360$, and $k = 48, 49, 50$ give $3\cdot16 = 48$, for a total of $408$.` }
  );
  add("log-system",
    { q: String.raw`Solve $\log_2x + \log_x2 = \tfrac52$.`,
      s: String.raw`With $t = \log_2x$, $\log_x2 = \tfrac1t$, so $t + \tfrac1t = \tfrac52$ and $2t^2 - 5t + 2 = 0$: $t = 2$ or $\tfrac12$. So $x = 4$ or $x = \sqrt2$.` },
    { q: String.raw`One number is twice another, and raising each to the power of the other gives the same result. Find the two numbers (both positive).`,
      s: String.raw`With $y = 2x$ the condition is $x^y = y^x$. Take logarithms: $y\ln x = x\ln y$, that is $2x\ln x = x\ln(2x)$. Dividing by $x$, $2\ln x = \ln2 + \ln x$, so $\ln x = \ln2$: $x = 2$ and $y = 4$. Check: $2^4 = 4^2$.` }
  );
  add("infinite-nest",
    { q: String.raw`Evaluate $\sqrt{20 + \sqrt{20 + \sqrt{20 + \cdots}}}$.`,
      s: String.raw`The value $x$ satisfies $x = \sqrt{20 + x}$, so $x^2 - x - 20 = 0$ and $x = 5$ or $-4$. A square root is not negative, so $x = 5$. (The nest converges: starting from $\sqrt{20} \approx 4.47$ the layers increase toward $5$.)` }
  );
  add("unknown-base",
    { q: String.raw`For which bases $b$ is $12_b \times 12_b = 144_b$ true?`,
      s: String.raw`As polynomials, $(b + 2)^2 = b^2 + 4b + 4$, which is $144_b$, so it holds in every base where the digit $4$ is allowed: every $b \ge 5$.` },
    { q: String.raw`Find the base $b$ in which $54_b + 45_b = 121_b$.`,
      s: String.raw`The left side is $(5b + 4) + (4b + 5) = 9b + 9$ and the right is $b^2 + 2b + 1$. So $b^2 - 7b - 8 = (b - 8)(b + 1) = 0$ and $b = 8$, which allows the digit $5$. Check: $44 + 37 = 81 = 121_8$.` }
  );
  add("poly-divisible-linear",
    { q: String.raw`Find all integers $n$ for which $\dfrac{n^3 + 1}{n - 1}$ is an integer.`,
      s: String.raw`Modulo $n - 1$, $n^3 + 1 \equiv 1 + 1 = 2$, so $n - 1$ divides $2$: $n - 1 = \pm1, \pm2$, giving $n = 2, 0, 3, -1$. The values are $9$, $-1$, $14$ and $0$.` },
    { q: String.raw`For how many positive integers $n$ does $n + 4$ divide $n^2 + 50$?`,
      s: String.raw`Replace $n$ by $-4$: $n^2 + 50 \equiv 66$, so $n + 4$ must be a divisor of $66$ that is at least $5$: $6, 11, 22, 33, 66$. That gives $5$ values, $n = 2, 7, 18, 29, 62$.` }
  );
  add("cauchy-functional-equations",
    { q: String.raw`A continuous $f : \mathbb R \to \mathbb R$ satisfies $f(x + y) = f(x) + f(y)$ and $f(3) = 12$. Find $f(7)$.`,
      s: String.raw`A continuous additive function is linear, $f(x) = cx$, and $3c = 12$ gives $c = 4$. So $f(7) = 28$.` },
    { q: String.raw`A continuous $f$ on the positive reals satisfies $f(xy) = f(x) + f(y)$ and $f(8) = 6$. Find $f(2)$ and $f\left(\tfrac14\right)$.`,
      s: String.raw`Such a function is a multiple of a logarithm, $f(x) = c\log_2x$, and $f(8) = 3c = 6$ gives $c = 2$. So $f(2) = 2$ and $f\left(\tfrac14\right) = 2\cdot(-2) = -4$.` }
  );
  add("descartes-rule-signs",
    { q: String.raw`Count the sign changes in $P(x) = x^4 + 2x^3 - x - 1$ and in $P(-x)$. What do they say about its positive and negative roots?`,
      s: String.raw`The signs $+, +, -, -$ change once, so there is exactly one positive root. For negative roots look at $P(-x) = x^4 - 2x^3 + x - 1$, with signs $+, -, +, -$: three changes, so $3$ or $1$ negative roots.` },
    { q: String.raw`Show that $x^3 + x + 1$ has no positive root and exactly one negative root.`,
      s: String.raw`The coefficients $+, +, +$ never change sign, so there is no positive root. $P(-x) = -x^3 - x + 1$ has signs $-, -, +$, one change, so exactly one negative root.` }
  );
  add("eisenstein-criterion",
    { q: String.raw`Which prime makes Eisenstein's criterion work for $x^5 - 6x + 3$, and what does that prove?`,
      s: String.raw`Take $p = 3$: it divides the lower coefficients $0, 0, 0, -6, 3$, it does not divide the leading $1$, and $9$ does not divide the constant $3$. So the polynomial cannot be written as a product of two rational polynomials of lower degree.` },
    { q: String.raw`No prime divides the constant term of $x^2 + 1$, so Eisenstein's criterion cannot start. Find a substitution that rescues it.`,
      s: String.raw`No prime divides the constant $1$, so substitute $x = y + 1$: $(y + 1)^2 + 1 = y^2 + 2y + 2$. With $p = 2$ Eisenstein applies, and a factorization of $x^2 + 1$ would give one of $y^2 + 2y + 2$.` }
  );
  add("chebyshev-polynomials",
    { q: String.raw`Find $T_3(x)$ from the recurrence, and use it to find $\cos3\theta$ when $\cos\theta = \tfrac13$.`,
      s: String.raw`With $T_0 = 1$, $T_1 = x$: $T_2 = 2x^2 - 1$ and $T_3 = 2x(2x^2 - 1) - x = 4x^3 - 3x$. So $\cos3\theta = \tfrac4{27} - 1 = -\tfrac{23}{27}$.` }
  );
  add("cayley-hamilton",
    { q: String.raw`Let $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. Check that $A^2 = 4A - 3I$, and use it to find $A^3$.`,
      s: String.raw`The trace is $4$ and the determinant $3$, so Cayley–Hamilton gives $A^2 = 4A - 3I = \begin{pmatrix} 5 & 4 \\ 4 & 5 \end{pmatrix}$, which is the direct square. Then $A^3 = 4A^2 - 3A = \begin{pmatrix} 14 & 13 \\ 13 & 14 \end{pmatrix}$.` },
    { q: String.raw`A $2\times2$ matrix has trace $5$ and determinant $6$. Express $A^{-1}$ in terms of $A$.`,
      s: String.raw`Cayley–Hamilton gives $A^2 - 5A + 6I = 0$, that is $A(5I - A) = 6I$. So $A^{-1} = \tfrac16(5I - A)$.` }
  );
  add("vandermonde-determinant",
    { q: String.raw`Evaluate $\det\begin{pmatrix} 1 & 1 & 1 \\ a & b & c \\ a^2 & b^2 & c^2 \end{pmatrix}$ for $a = 1$, $b = 2$, $c = 4$.`,
      s: String.raw`This is the Vandermonde determinant (transposed, which does not change it): $(b - a)(c - a)(c - b) = 1\cdot3\cdot2 = 6$.` },
    { q: String.raw`Show that for any numbers $y_1$, $y_2$, $y_3$ there is exactly one polynomial $c_0 + c_1x + c_2x^2$ with values $y_1, y_2, y_3$ at $x = 1, 2, 3$.`,
      s: String.raw`The conditions are a linear system in $c_0, c_1, c_2$ whose matrix has rows $(1, x_i, x_i^2)$, a Vandermonde matrix with determinant $(2 - 1)(3 - 1)(3 - 2) = 2 \ne 0$. A nonzero determinant means exactly one solution.` }
  );
  add("pairwise-sum-product",
    { q: String.raw`The roots of $t^3 - 3t^2 + 5t - 7$ are $x$, $y$, $z$. Find $(x + y)(y + z)(z + x)$.`,
      s: String.raw`By Vieta, $x + y + z = 3$, $xy + yz + zx = 5$ and $xyz = 7$, so the product is $3\cdot5 - 7 = 8$.` },
    { q: String.raw`Show that if $a + b + c = 0$, then $(a + b)(b + c)(c + a) = -abc$.`,
      s: String.raw`The identity gives $(a + b + c)(ab + bc + ca) - abc = 0 - abc$. Directly: $a + b = -c$ and so on, so the product is $(-c)(-a)(-b)$.` }
  );
  add("antisymmetric-factorization",
    { q: String.raw`Evaluate $a^2(b - c) + b^2(c - a) + c^2(a - b)$ at $a = 1$, $b = 2$, $c = 3$ with the factorization, and check directly.`,
      s: String.raw`The factored form gives $-(1 - 2)(2 - 3)(3 - 1) = -2$. Directly: $1\cdot(-1) + 4\cdot2 + 9\cdot(-1) = -2$.` },
    { q: String.raw`Write $a^3(b - c) + b^3(c - a) + c^3(a - b)$ as a product of four linear factors.`,
      s: String.raw`It vanishes when any two variables are equal, so $(a - b)(b - c)(c - a)$ divides it, leaving a symmetric factor of degree $1$, a multiple of $a + b + c$. Comparing the coefficient of $a^3b$ gives $-(a - b)(b - c)(c - a)(a + b + c)$. Check at $a, b, c = 0, 1, 2$: $0 + 1\cdot(2) + 8\cdot(-1) = -6 = -(-1)(-1)(2)(3)$.` }
  );
  add("factorial-telescoping",
    { q: String.raw`Show that $1\cdot1! + 2\cdot2! + \cdots + n\cdot n!$ is always one less than a factorial, and compute it for $n = 6$.`,
      s: String.raw`Write $k\cdot k! = (k + 1)! - k!$. The sum telescopes to $(n + 1)! - 1$, which for $n = 6$ is $7! - 1 = 5039$.` }
  );
  add("generalized-binomial-series",
    { q: String.raw`Find the coefficient of $x^3$ in $\dfrac1{(1 - x)^4}$.`,
      s: String.raw`The series gives $\binom{3 + 4 - 1}{4 - 1} = \binom63 = 20$. Counting check: it is the number of ways to write $3$ as an ordered sum of four nonnegative integers.` },
    { q: String.raw`Use the first three terms of $(1 + x)^{-1/2}$ to estimate $\tfrac1{\sqrt{1.1}}$.`,
      s: String.raw`$\binom{-1/2}1 = -\tfrac12$ and $\binom{-1/2}2 = \tfrac{(-1/2)(-3/2)}2 = \tfrac38$, so $(1 + x)^{-1/2} \approx 1 - \tfrac x2 + \tfrac{3x^2}8$. At $x = 0.1$ that is $1 - 0.05 + 0.00375 = 0.95375$; the true value is $0.95346$.` }
  );
  add("nesbitt-inequality",
    { q: String.raw`Prove Nesbitt's Inequality by adding $1$ to each fraction.`,
      s: String.raw`With $S = a + b + c$, each fraction plus $1$ is $\tfrac{S}{b + c}$ and so on, so the sum plus $3$ is $S\left(\tfrac1{b + c} + \tfrac1{c + a} + \tfrac1{a + b}\right)$. The three denominators add to $2S$, and AM-HM gives $\left(\sum(b + c)\right)\left(\sum\tfrac1{b + c}\right) \ge 9$, so the bracket is at least $\tfrac9{2S}$. The sum plus $3$ is at least $\tfrac92$, so the sum is at least $\tfrac32$.` },
    { q: String.raw`If $a$, $b$, $c$ are the sides of a triangle, show that $\dfrac a{b + c} + \dfrac b{c + a} + \dfrac c{a + b} \lt 2$.`,
      s: String.raw`The triangle inequality $a \lt b + c$ gives $a + b + c \lt 2(b + c)$, so $\tfrac a{b + c} \lt \tfrac{2a}{a + b + c}$, and likewise for the others. Adding, the sum is less than $\tfrac{2(a + b + c)}{a + b + c} = 2$. So for triangles the sum lies in $\left[\tfrac32, 2\right)$.` }
  );
  add("schurs-inequality",
    { q: String.raw`Find every equality case of Schur's Inequality with $t = 1$, and check one with two equal variables and the third zero.`,
      s: String.raw`Equality holds when $x = y = z$, or when two variables are equal and the third is $0$. At $(1, 1, 0)$: $1 + 1 + 0 + 0 = 2$ on the left and $1\cdot1\cdot2 + 0 + 0 = 2$ on the right.` },
    { q: String.raw`With $p = x + y + z$, $q = xy + yz + zx$ and $r = xyz$, show that the $t = 1$ case says $p^3 - 4pq + 9r \ge 0$.`,
      s: String.raw`The power sum is $x^3 + y^3 + z^3 = p^3 - 3pq + 3r$, and the right side is $xy(x + y) + yz(y + z) + zx(z + x) = pq - 3r$. So the inequality reads $p^3 - 3pq + 3r + 3r \ge pq - 3r$, that is $p^3 - 4pq + 9r \ge 0$.` }
  );
  add("muirheads-inequality",
    { q: String.raw`Prove that $2(x^3 + y^3 + z^3) \ge x^2y + x^2z + y^2x + y^2z + z^2x + z^2y$ for positive reals.`,
      s: String.raw`The exponent triple $(3, 0, 0)$ majorizes $(2, 1, 0)$: $3 \ge 2$, $3 + 0 \ge 2 + 1$, and the totals agree. The symmetric sum of $x^3$ over the six orderings is $2(x^3 + y^3 + z^3)$, and that of $x^2y$ is the six terms on the right, so Muirhead gives the inequality.` },
    { q: String.raw`For positive reals, which is larger: the symmetric sum of $x^3y$ or the symmetric sum of $x^2y^2$?`,
      s: String.raw`$(3, 1, 0)$ majorizes $(2, 2, 0)$, since $3 \ge 2$ and $3 + 1 \ge 2 + 2$, so the sum of $x^3y$ is at least the sum of $x^2y^2$. With two variables this is $x^3y + xy^3 \ge 2x^2y^2$, which is $xy(x - y)^2 \ge 0$.` }
  );
  add("holders-inequality",
    { q: String.raw`Positive reals satisfy $a + b = 2$. Use Hölder's Inequality to find the least value of $a^3 + b^3$.`,
      s: String.raw`Hölder with three factors gives $(a^3 + b^3)(1 + 1)(1 + 1) \ge (a + b)^3 = 8$, so $a^3 + b^3 \ge 2$, with equality at $a = b = 1$.` },
    { q: String.raw`Prove that $(x + y + z)^2\left(\tfrac1{x^2} + \tfrac1{y^2} + \tfrac1{z^2}\right) \ge 27$ for positive reals.`,
      s: String.raw`Apply the three-factor form with $a_i = b_i = x_i$ and $c_i = \tfrac1{x_i^2}$: each $\sqrt[3]{a_ib_ic_i} = 1$, so the product of the three sums is at least $(1 + 1 + 1)^3 = 27$. Equality holds at $x = y = z$.` }
  );
  add("weighted-am-gm",
    { q: String.raw`Show that $a^{1/3}b^{2/3} \le \tfrac{a + 2b}3$ for positive reals.`,
      s: String.raw`Weighted AM-GM with weights $\tfrac13$ and $\tfrac23$ gives $\tfrac13a + \tfrac23b \ge a^{1/3}b^{2/3}$, with equality at $a = b$.` },
    { q: String.raw`Find the least value of $x + \dfrac4{x^2}$ for $x \gt 0$.`,
      s: String.raw`Split $x$ into two halves so the product is constant: $\tfrac x2 + \tfrac x2 + \tfrac4{x^2} \ge 3\sqrt[3]{\tfrac x2\cdot\tfrac x2\cdot\tfrac4{x^2}} = 3$. Equality needs $\tfrac x2 = \tfrac4{x^2}$, that is $x = 2$, where the value is $2 + 1 = 3$.` }
  );
  add("log-swap-identity",
    { q: String.raw`Compute $3^{\log_9 16}$.`,
      s: String.raw`Swap: $3^{\log_916} = 16^{\log_93} = 16^{1/2} = 4$.` },
    { q: String.raw`Simplify $2^{\log_35} - 5^{\log_32}$.`,
      s: String.raw`The swap identity says the two terms are equal, so the difference is $0$.` }
  );
  add("even-power-sin-cos-sums",
    { q: String.raw`Find the largest and smallest values of $\sin^6\theta + \cos^6\theta$.`,
      s: String.raw`It equals $1 - \tfrac34\sin^22\theta$, and $\sin^22\theta$ runs from $0$ to $1$. So the largest value is $1$ (at $\theta = 0$) and the smallest is $\tfrac14$ (at $\theta = 45^\circ$).` },
    { q: String.raw`Find $\sin^415^\circ + \cos^415^\circ$.`,
      s: String.raw`With $\sin^230^\circ = \tfrac14$, the identity gives $1 - \tfrac12\cdot\tfrac14 = \tfrac78$.` }
  );
  add("triangle-angle-identities",
    { q: String.raw`Two angles of a triangle have cotangents $1$ and $2$. Use the cotangent identity to find the cotangent of the third angle, and say whether that angle is acute.`,
      s: String.raw`The identity $\cot A\cot B + \cot B\cot C + \cot C\cot A = 1$ gives $2 + 2\cot C + \cot C = 1$, so $\cot C = -\tfrac13$, and $C$ is obtuse ($C \approx 108.4^\circ$).` },
    { q: String.raw`Check $\sin2A + \sin2B + \sin2C = 4\sin A\sin B\sin C$ for the $30^\circ$-$60^\circ$-$90^\circ$ triangle.`,
      s: String.raw`The left side is $\sin60^\circ + \sin120^\circ + \sin180^\circ = \sqrt3$, and the right is $4\cdot\tfrac12\cdot\tfrac{\sqrt3}2\cdot1 = \sqrt3$.` }
  );
  add("triangle-square-identities",
    { q: String.raw`Use the first identity to show that a triangle with $C = 90^\circ$ has $\cos^2A + \cos^2B = 1$.`,
      s: String.raw`With $\cos C = 0$ both the term $\cos^2C$ and the product term vanish, leaving $\cos^2A + \cos^2B = 1$. This is $\cos^2A + \sin^2A = 1$, since $B = 90^\circ - A$.` },
    { q: String.raw`A triangle has $\cos A\cos B\cos C = \tfrac18$. Find $\cos^2A + \cos^2B + \cos^2C$.`,
      s: String.raw`The identity gives $1 - 2\cdot\tfrac18 = \tfrac34$. (The product $\tfrac18$ is its largest possible value, reached only by the equilateral triangle, where each cosine is $\tfrac12$.)` }
  );
  add("absolute-value-identities",
    { q: String.raw`Solve $\lvert3x - 12\rvert = 2\lvert x\rvert$.`,
      s: String.raw`Factor out the coefficient: $3\lvert x - 4\rvert = 2\lvert x\rvert$, so $x - 4 = \pm\tfrac23x$. The plus sign gives $x = 12$ and the minus sign $x = \tfrac{12}5$. Check: $\lvert24\rvert = 24$ and $\lvert7.2 - 12\rvert = 4.8 = 2\cdot2.4$.` }
  );
  add("counting-functions",
    { q: String.raw`How many functions are there from a $3$-element set to a $2$-element set, and how many of them take both values?`,
      s: String.raw`Each of the $3$ inputs has $2$ possible outputs, so there are $2^3 = 8$ functions. Only the two constant functions miss a value, so $8 - 2 = 6$ take both. (No function here is one-to-one, since $3 \gt 2$.)` }
  );
  add("subset-sum-facts",
    { q: String.raw`A subset of $\{1, 2, \ldots, 10\}$ is chosen uniformly at random, the empty set included. What is the expected sum of its elements?`,
      s: String.raw`The sums of all $2^{10}$ subsets add to $2^9\cdot55$, since each element lies in half the subsets. Dividing by $2^{10}$, the expected sum is $\tfrac{55}2 = 27.5$.` },
    { q: String.raw`How many subsets of $\{1, 2, \ldots, 10\}$ have an odd sum?`,
      s: String.raw`Adding or removing the element $1$ changes the parity of the sum, and it pairs the subsets up, one odd and one even in each pair. So exactly half, $2^9 = 512$, have an odd sum.` }
  );
  add("alternating-squared-binomials",
    { q: String.raw`Check the formula on $\sum_{k=0}^{4}(-1)^k\binom4k^2$.`,
      s: String.raw`The formula gives $(-1)^2\binom42 = 6$. Directly: $1 - 16 + 36 - 16 + 1 = 6$.` },
    { q: String.raw`Explain without computing why $\sum_{k=0}^{7}(-1)^k\binom7k^2 = 0$.`,
      s: String.raw`Pair the term $k$ with the term $7 - k$. The squares are equal, since $\binom7k = \binom7{7-k}$, and the signs are opposite, since $k$ and $7 - k$ have different parity. So the eight terms cancel in four pairs.` }
  );
  add("pascal-parity",
    { q: String.raw`For which $n$ is every entry of row $n$ odd? List those below $100$.`,
      s: String.raw`Row $n$ has $n + 1$ entries and $2^{s_2(n)}$ odd ones, and $2^{s_2(n)} = n + 1$ exactly when the binary digits of $n$ are all $1$, that is $n = 2^k - 1$. Below $100$: $n = 0, 1, 3, 7, 15, 31, 63$.` },
    { q: String.raw`Show that $\binom{64}k$ is even for every $k$ from $1$ to $63$.`,
      s: String.raw`$64 = 1000000_2$ has a single $1$, so only $2^1 = 2$ entries are odd: the two $1$s at the ends. Every $\binom{64}k$ with $0 \lt k \lt 64$ is even.` }
  );
  add("ballot-problem",
    { q: String.raw`Candidate $A$ receives $7$ votes and $B$ receives $4$, counted in random order. What is the probability that $A$ leads throughout?`,
      s: String.raw`The ballot formula gives $\tfrac{7 - 4}{7 + 4} = \tfrac3{11}$.` },
    { q: String.raw`In how many orders of $6$ votes for $A$ and $2$ for $B$ is $A$ strictly ahead after every vote?`,
      s: String.raw`There are $\binom82 = 28$ orders, and the fraction with $A$ always ahead is $\tfrac{6 - 2}{8} = \tfrac12$, so $14$ orders. (Listing them confirms it: the first two votes must go to $A$, and so on.)` }
  );
  add("moser-circle",
    { q: String.raw`The region counts for $1$ to $5$ points on a circle are $1, 2, 4, 8, 16$, which suggests powers of $2$. Using the formula, how many regions do $8$ points give, and how far off is the guess?`,
      s: String.raw`$R(8) = \binom84 + \binom82 + 1 = 70 + 28 + 1 = 99$, while the guess says $2^7 = 128$. The formula is a polynomial of degree $4$ in $n$, so it falls far behind any doubling.` }
  );
  add("combinatorial-nullstellensatz",
    { q: String.raw`A polynomial $f(x, y)$ of total degree $2$ has a nonzero coefficient of $xy$. Show that it is nonzero at some point of $\{0, 1\}\times\{0, 1\}$, and check this for $f = xy - x - y + 1$.`,
      s: String.raw`Take $t_1 = t_2 = 1$ and $S_1 = S_2 = \{0, 1\}$, each of size $2 \gt 1$. The degree is $t_1 + t_2$ and the coefficient of $x^1y^1$ is nonzero, so the Nullstellensatz gives a point where $f \ne 0$. Here $f = (x - 1)(y - 1)$ vanishes at three of the four points but is $1$ at $(0, 0)$.` },
    { q: String.raw`Prove the Cauchy–Davenport bound: for nonempty $A, B \subseteq \mathbb Z_p$ ($p$ prime), the sumset $A + B$ has at least $\min(p, |A| + |B| - 1)$ elements.`,
      s: String.raw`If $|A| + |B| \gt p$, every residue is a sum, by pigeonhole. Otherwise suppose $A + B$ lies inside a set $C$ of size $|A| + |B| - 2$, and let $f(x, y) = \prod_{c \in C}(x + y - c)$, of degree $|A| + |B| - 2$. Its coefficient of $x^{|A|-1}y^{|B|-1}$ is $\binom{|A| + |B| - 2}{|A| - 1}$, which is not a multiple of $p$ since $|A| + |B| - 2 \lt p$. The Nullstellensatz with $S_1 = A$, $S_2 = B$ gives $a \in A$, $b \in B$ with $f(a, b) \ne 0$, so $a + b \notin C$, a contradiction.` }
  );
  add("dilworths-theorem",
    { q: String.raw`The nine grid points $(i, j)$ with $i, j \in \{1, 2, 3\}$ are ordered by $(a, b) \le (c, d)$ when $a \le c$ and $b \le d$. Find a largest set of pairwise incomparable points and the fewest chains that cover the grid.`,
      s: String.raw`The anti-diagonal $(1, 3)$, $(2, 2)$, $(3, 1)$ is pairwise incomparable: each point is higher in one coordinate and lower in the other. The three rows $(i, 1) \le (i, 2) \le (i, 3)$ are chains covering the grid. Both numbers are $3$, as Dilworth's Theorem requires.` },
    { q: String.raw`A partially ordered set has $13$ elements and no chain of more than $3$. Show that it has an antichain of at least $5$ elements.`,
      s: String.raw`Sort the elements by the length of the longest chain ending at each: $1$, $2$ or $3$. Two elements with the same length are incomparable (otherwise the larger would have a longer chain), so this splits the set into $3$ antichains. One of them has at least $\lceil\tfrac{13}3\rceil = 5$ elements. This is the dual of Dilworth's Theorem.` }
  );
  add("sperners-theorem",
    { q: String.raw`For a $5$-element set the middle layer is not unique. Which layers give a largest antichain, and how large is it?`,
      s: String.raw`Sperner gives $\binom52 = 10$. Both the layer of $2$-element subsets and the layer of $3$-element subsets reach it, and these are the only two families of that size.` },
    { q: String.raw`Show that any $7$ subsets of $\{1, 2, 3, 4\}$ include two with one contained in the other.`,
      s: String.raw`An antichain of subsets of a $4$-element set has at most $\binom42 = 6$ members, so $7$ subsets cannot form one.` }
  );
  add("gamblers-ruin",
    { q: String.raw`A player with $4$ chips bets one chip at a time on a fair coin and stops at $0$ or $10$ chips. What is the probability of reaching $10$?`,
      s: String.raw`For a fair game $P_k = \tfrac kN$, so the probability is $\tfrac4{10} = \tfrac25$.` },
    { q: String.raw`A player with $1$ chip wins each round with probability $\tfrac13$ and stops at $0$ or $3$ chips. What is the probability of reaching $3$?`,
      s: String.raw`Here $\tfrac qp = 2$, so $P_1 = \tfrac{1 - 2}{1 - 2^3} = \tfrac17$. Check by first steps: $P_1 = \tfrac13P_2$ and $P_2 = \tfrac13 + \tfrac23P_1$, so $P_1 = \tfrac19 + \tfrac29P_1$, giving $\tfrac17$.` }
  );
  add("order-statistics",
    { q: String.raw`Three random points land independently and uniformly on $[0, 1]$. What is the chance that all three are in the left half, and what is the average position of the leftmost?`,
      s: String.raw`$P(\max \le \tfrac12) = \left(\tfrac12\right)^3 = \tfrac18$, and $E[\min] = \tfrac1{3 + 1} = \tfrac14$.` },
    { q: String.raw`Two points are chosen at random on a stick of length $1$. What is the expected distance between them?`,
      s: String.raw`The distance is the range of $n = 2$ uniform points, with expectation $\tfrac{n - 1}{n + 1} = \tfrac13$. Equivalently, the two points cut the stick into three pieces of expected length $\tfrac13$ each, and the distance is the middle piece.` }
  );
  add("erdos-szekeres",
    { q: String.raw`Five students of different heights stand in a line. Show that some three of them, in line order, are increasing or decreasing in height. Does it work with four students?`,
      s: String.raw`With $m = n = 2$, any $mn + 1 = 5$ distinct heights contain a monotone run of length $3$. Four is not enough: heights $2, 1, 4, 3$ have no increasing or decreasing triple.` },
    { q: String.raw`What is the shortest length of a sequence of distinct numbers that is sure to contain an increasing subsequence of length $6$ or a decreasing one of length $6$?`,
      s: String.raw`The theorem with $m = n = 5$ gives $26$. And $25$ is not enough: five decreasing blocks of five increasing numbers, such as $21\ldots25, 16\ldots20, \ldots, 1\ldots5$, have no monotone subsequence of length $6$.` }
  );
  add("turans-theorem",
    { q: String.raw`Ten players arrange some games, each between two of them, so that no three players have all played one another. At most how many games can there be?`,
      s: String.raw`No triangle means no $K_3$, so $r = 2$ and $e \le \left(1 - \tfrac12\right)\tfrac{100}2 = 25$. The complete bipartite graph $K_{5,5}$ has $25$ edges and no triangle.` },
    { q: String.raw`Must a graph with $9$ vertices and $28$ edges contain four mutually adjacent vertices?`,
      s: String.raw`With $r = 3$ the bound for avoiding $K_4$ is $\left(1 - \tfrac13\right)\tfrac{81}2 = 27$. Since $28 \gt 27$, yes.` }
  );
  add("trapezoid-consecutive-angles",
    { q: String.raw`An isosceles trapezoid has one angle of $70^\circ$. Find the other three.`,
      s: String.raw`The angle beside it along a leg is $180^\circ - 70^\circ = 110^\circ$, and the equal legs make the base angles equal in pairs: $70^\circ, 70^\circ, 110^\circ, 110^\circ$.` },
    { q: String.raw`In trapezoid $ABCD$ with $AB \parallel DC$, the bisectors of angles $A$ and $D$ meet at $P$. Find $\angle APD$.`,
      s: String.raw`Since $\angle A + \angle D = 180^\circ$, the halves add to $90^\circ$, and triangle $APD$ has $\angle APD = 180^\circ - 90^\circ = 90^\circ$.` }
  );
  add("parallel-by-angle-sum",
    { q: String.raw`A transversal makes co-interior angles of $(3x + 10)^\circ$ and $(5x - 6)^\circ$ with two lines. For which $x$ are the lines parallel?`,
      s: String.raw`They are parallel exactly when $(3x + 10) + (5x - 6) = 180$, that is $8x = 176$ and $x = 22$, giving angles $76^\circ$ and $104^\circ$.` },
    { q: String.raw`A quadrilateral $ABCD$ has $\angle A + \angle B = 180^\circ$ and $\angle B + \angle C = 180^\circ$. Prove that it is a parallelogram.`,
      s: String.raw`Along side $AB$, the angles at $A$ and $B$ are co-interior for the lines $AD$ and $BC$, so $AD \parallel BC$. Along side $BC$, the angles at $B$ and $C$ are co-interior for $AB$ and $CD$, so $AB \parallel CD$. Both pairs of opposite sides are parallel.` }
  );
  add("integer-triangles-perimeter",
    { q: String.raw`Use the formula to count the integer-sided triangles with perimeter $12$, and list them.`,
      s: String.raw`For even $n$ the count is the nearest integer to $\tfrac{144}{48} = 3$: the triangles $(2, 5, 5)$, $(3, 4, 5)$ and $(4, 4, 4)$.` },
    { q: String.raw`Use the odd-perimeter formula to count the triangles whose whole-number sides add to $25$, and confirm it by sorting them by longest side.`,
      s: String.raw`For odd $n$ the count is the nearest integer to $\tfrac{(25 + 3)^2}{48} = \tfrac{784}{48} \approx 16.3$, so $16$. A direct count by the longest side, from $9$ to $12$, gives $2 + 3 + 5 + 6 = 16$.` }
  );
  add("intercept-theorem",
    { q: String.raw`In triangle $ABC$, $D$ is on $AB$ with $AD = 3$, $DB = 5$, and $E$ on $AC$ with $AE = 4.5$ and $DE \parallel BC$. Find $EC$. Then decide whether $DE \parallel BC$ when $AD = 4$, $DB = 6$, $AE = 6$, $EC = 9$.`,
      s: String.raw`Parallel lines cut proportionally: $\tfrac{AE}{EC} = \tfrac35$, so $EC = 7.5$. In the second case $\tfrac46 = \tfrac69$, so by the converse $DE \parallel BC$.` }
  );
  add("cevian-ratio-sum",
    { q: String.raw`Check both cevian identities when $P$ is the centroid.`,
      s: String.raw`The medians are cut $2 : 1$ at the centroid, so each $\tfrac{PD}{AD} = \tfrac13$, and the three add to $1$. Each $\tfrac{AP}{AD} = \tfrac23$, and the three add to $2$.` }
  );
  add("regular-dodecagon",
    { q: String.raw`A regular dodecagon is inscribed in a circle of radius $1$. Find its area and compare it with the circle.`,
      s: String.raw`The area is $3R^2 = 3$, made of twelve triangles of area $\tfrac12\sin30^\circ = \tfrac14$. The circle's area is $\pi \approx 3.14$, so the dodecagon fills about $95.5\%$ of it.` },
    { q: String.raw`Working backwards: a regular $12$-gon covers $12$ square units. How long is each side, and how far are the vertices from the center?`,
      s: String.raw`From $3R^2 = 12$, $R = 2$. From $3(2 + \sqrt3)s^2 = 12$, $s^2 = \tfrac4{2 + \sqrt3} = 4(2 - \sqrt3) = 8 - 4\sqrt3$, so $s = \sqrt6 - \sqrt2$, since $(\sqrt6 - \sqrt2)^2 = 8 - 2\sqrt{12}$.` }
  );
  add("max-rectangle-in-triangle",
    { q: String.raw`A triangle has base $10$ and height $6$. Find the largest rectangle with one side on the base and its top corners on the other two sides.`,
      s: String.raw`At height $y$ the triangle is $10\left(1 - \tfrac y6\right)$ wide, so the area is $10y\left(1 - \tfrac y6\right)$, largest at $y = 3$: a $5 \times 3$ rectangle of area $15$, half the triangle's $30$.` },
    { q: String.raw`Prove that the largest rectangle with a side on the base of any triangle has half the triangle's height.`,
      s: String.raw`With base $b$ and height $h$, a rectangle of height $y$ has width $b\left(1 - \tfrac yh\right)$ by similar triangles, so its area is $\tfrac bh\,y(h - y)$. The product $y(h - y)$ is largest at $y = \tfrac h2$, where the area is $\tfrac{bh}4$, half of $[\triangle] = \tfrac{bh}2$.` }
  );
  add("conway-circle",
    { q: String.raw`For the $3$-$4$-$5$ triangle, where is the center of the Conway circle and what is its radius?`,
      s: String.raw`The six points are pairwise equally far from the incenter (each is a tangent length plus a full side away from a touch point), so the center is the incenter. With $r = 1$ and $s = 6$ the radius is $\sqrt{r^2 + s^2} = \sqrt{37}$.` },
    { q: String.raw`Find the radius of the Conway circle of an equilateral triangle with side $2$.`,
      s: String.raw`Here $s = 3$ and $r = \tfrac{\text{area}}s = \tfrac{\sqrt3}3$, so $\rho = \sqrt{\tfrac13 + 9} = \sqrt{\tfrac{28}3} = \tfrac{2\sqrt{21}}3$.` }
  );
  add("squares-on-triangle-flanks",
    { q: String.raw`On each side of the $13$-$14$-$15$ triangle stands a square, and between neighbouring squares lies a flank triangle. How big is each flank, and the whole outer hexagon?`,
      s: String.raw`Each flank triangle has the triangle's area, $84$. The hexagon is the triangle, the three squares and the three flanks: $169 + 196 + 225 + 4\cdot84 = 926$.` },
    { q: String.raw`Squares are erected outward on the sides of an equilateral triangle of side $1$. Find the third side of a flank triangle and the hexagon's area.`,
      s: String.raw`The third side is $2m_a = \sqrt{2 + 2 - 1} = \sqrt3$, as the flank has sides $1$, $1$ around an angle of $120^\circ$. The hexagon has area $3 + 4\cdot\tfrac{\sqrt3}4 = 3 + \sqrt3$.` }
  );
  add("triangle-sin2-sum-ratio",
    { q: String.raw`Check the ratio $\dfrac{\sin2A + \sin2B + \sin2C}{\sin A + \sin B + \sin C} = \dfrac{2r}R$ for the $6$-$8$-$10$ right triangle.`,
      s: String.raw`Here $r = 2$ and $R = 5$, so the ratio should be $\tfrac45$. Directly, with sines $0.6$, $0.8$, $1$: the numerator is $2(0.6)(0.8) + 2(0.8)(0.6) + 0 = 1.92$ and the denominator $2.4$, giving $0.8$.` },
    { q: String.raw`Show that the ratio equals $1$ for an equilateral triangle, and explain why it is less than $1$ for every other triangle.`,
      s: String.raw`For the equilateral triangle $\sin120^\circ = \sin60^\circ$, so numerator and denominator agree, and indeed $R = 2r$. Euler's inequality $R \ge 2r$, with equality only for the equilateral triangle, makes $\tfrac{2r}R \lt 1$ otherwise.` }
  );
  add("half-angle-tangent-identity",
    { q: String.raw`A right triangle has $\tan\tfrac A2 = \tfrac12$. Find $\tan\tfrac B2$.`,
      s: String.raw`The right angle gives $\tan\tfrac C2 = 1$. The identity becomes $\tfrac12t + t + \tfrac12 = 1$ with $t = \tan\tfrac B2$, so $t = \tfrac13$. Check: $A = 2\arctan\tfrac12 \approx 53.13^\circ$ and $B \approx 36.87^\circ$, whose half has tangent $\tfrac13$.` },
    { q: String.raw`For the $3$-$4$-$5$ triangle, compute the three half-angle tangents from $\tan\tfrac A2 = \tfrac r{s - a}$ and check the identity.`,
      s: String.raw`With $r = 1$ and $s = 6$, the values $s - a$ are $3$, $2$, $1$, so the tangents are $\tfrac13$, $\tfrac12$, $1$. Then $\tfrac13\cdot\tfrac12 + \tfrac12\cdot1 + 1\cdot\tfrac13 = \tfrac16 + \tfrac12 + \tfrac13 = 1$.` }
  );
  add("median-triangle-area",
    { q: String.raw`The median lengths of a triangle, $9$, $12$ and $15$, happen to form a right triangle. Deduce the original triangle's area.`,
      s: String.raw`The medians form a right triangle of area $\tfrac12\cdot9\cdot12 = 54$, so the triangle has area $\tfrac43\cdot54 = 72$.` },
    { q: String.raw`Check the formula on an equilateral triangle of side $2$.`,
      s: String.raw`Each median is $\sqrt3$, so the median triangle is equilateral with area $\tfrac{\sqrt3}4\cdot3 = \tfrac{3\sqrt3}4$. Then $\tfrac43\cdot\tfrac{3\sqrt3}4 = \sqrt3$, the area of the original triangle.` }
  );
  add("rouths-theorem",
    { q: String.raw`Each cevian of triangle $ABC$ cuts its side in the ratio $2 : 1$, going around the triangle the same way ($BD : DC = CE : EA = AF : FB = 2 : 1$). What fraction of the area is the small inner triangle?`,
      s: String.raw`With $x = y = z = 2$, Routh gives $\tfrac{(8 - 1)^2}{(4 + 2 + 1)^3} = \tfrac{49}{343} = \tfrac17$.` },
    { q: String.raw`What does Routh's Theorem give when every ratio is $3$, and when every ratio is $1$?`,
      s: String.raw`At $x = y = z = 3$: $\tfrac{(27 - 1)^2}{(9 + 3 + 1)^3} = \tfrac{676}{2197} = \tfrac4{13}$. At $x = y = z = 1$ the numerator $(1 - 1)^2$ is $0$: the cevians are the medians, which meet in a point, so the inner triangle has shrunk to nothing.` }
  );
  add("van-aubel-cevians",
    { q: String.raw`Check Van Aubel's Theorem at the centroid.`,
      s: String.raw`The medians cut the sides in half, so $\tfrac{AF}{FB} = \tfrac{AE}{EC} = 1$ and the theorem gives $\tfrac{AP}{PD} = 2$, the familiar $2 : 1$ split of a median.` },
    { q: String.raw`In the triangle with $BC = 14$, $CA = 15$, $AB = 13$, the cevians are the angle bisectors and $P$ is the incenter. Find $AP : PD$.`,
      s: String.raw`The bisector from $C$ gives $\tfrac{AF}{FB} = \tfrac{CA}{CB} = \tfrac{15}{14}$, and the one from $B$ gives $\tfrac{AE}{EC} = \tfrac{AB}{BC} = \tfrac{13}{14}$. So $\tfrac{AP}{PD} = \tfrac{15 + 13}{14} = 2$, which is $\tfrac{b + c}a$.` }
  );
  add("trig-ceva",
    { q: String.raw`Use Trigonometric Ceva to show that the three angle bisectors of a triangle meet in one point.`,
      s: String.raw`Each bisector splits its angle into equal halves, so every ratio $\tfrac{\sin\angle BAD}{\sin\angle DAC}$ is $\tfrac{\sin(A/2)}{\sin(A/2)} = 1$. The product is $1$, so by the converse the bisectors are concurrent.` },
    { q: String.raw`Use Trigonometric Ceva to show that the altitudes of an acute triangle meet in one point.`,
      s: String.raw`The altitude from $A$ makes $\angle BAD = 90^\circ - B$ and $\angle DAC = 90^\circ - C$, and likewise at the other vertices. The product is $\tfrac{\cos B}{\cos C}\cdot\tfrac{\cos C}{\cos A}\cdot\tfrac{\cos A}{\cos B} = 1$, so the altitudes are concurrent.` }
  );
  add("napoleons-theorem",
    { q: String.raw`Build an outward equilateral triangle on each side of the $3$-$4$-$5$ right triangle and join the three centers. How long is each side of the result?`,
      s: String.raw`The Napoleon triangle's side $t$ has $t^2 = \tfrac{a^2 + b^2 + c^2}6 + \tfrac2{\sqrt3}K = \tfrac{50}6 + \tfrac{12}{\sqrt3} = \tfrac{25}3 + 4\sqrt3$, so $t = \sqrt{\tfrac{25}3 + 4\sqrt3} \approx 3.91$. Coordinates with $A = (0, 0)$, $B = (3, 0)$, $C = (0, 4)$ give the same distance between each pair of centers.` },
    { q: String.raw`What is the Napoleon triangle of an equilateral triangle with side $3$?`,
      s: String.raw`The formula gives $t^2 = \tfrac{27}6 + \tfrac2{\sqrt3}\cdot\tfrac{9\sqrt3}4 = \tfrac92 + \tfrac92 = 9$, so it is equilateral with side $3$, congruent to the original (it is the original turned $180^\circ$ about its center).` }
  );
  add("iran-lemma",
    { q: String.raw`In the triangle with $BC = 14$, $CA = 15$, $AB = 13$, the incircle touches $CA$ at $E$ and $AB$ at $F$, and $BI$ meets $EF$ at $K$. Find $CK$ and check that $K$ lies on the midline parallel to $AB$.`,
      s: String.raw`Since $CK \perp BI$ and $BK$ is the bisector, $CK = BC\sin\tfrac B2$. Here $\cos B = \tfrac{196 + 169 - 225}{2\cdot14\cdot13} = \tfrac5{13}$, so $\sin\tfrac B2 = \sqrt{\tfrac{1 - 5/13}2} = \tfrac2{\sqrt{13}}$ and $CK = \tfrac{28}{\sqrt{13}}$. In coordinates $B = (0, 0)$, $C = (14, 0)$, $A = (5, 12)$, $K = \left(\tfrac{126}{13}, \tfrac{84}{13}\right)$, which is $(7, 0) + \tfrac7{13}(5, 12)$: on the line through the midpoint of $BC$ parallel to $AB$.` }
  );
  add("steiner-ratio-theorem",
    { q: String.raw`Use Steiner's Ratio Theorem to show that the symmedian from $A$ divides $BC$ in the ratio $AB^2 : AC^2$.`,
      s: String.raw`The median $AD$ and the symmedian $AE$ are isogonal, so $\tfrac{BD}{DC}\cdot\tfrac{BE}{EC} = \tfrac{AB^2}{AC^2}$. The median has $\tfrac{BD}{DC} = 1$, which leaves $\tfrac{BE}{EC} = \tfrac{AB^2}{AC^2}$.` }
  );
  add("isogonal-line-lemma",
    { q: String.raw`In the right triangle $A = (0, 0)$, $B = (4, 0)$, $C = (0, 4)$, take $X = (2, 1)$ and $Y = (1.5, 3)$, so that $AX$ and $AY$ make equal angles with $AB$ and $AC$. Find $P = BX \cap CY$ and $Q = BY \cap CX$, and check the lemma.`,
      s: String.raw`The rays $AX$ and $AY$ have directions $(2, 1)$ and $(1, 2)$, mirror images in the bisector $y = x$. Solving, $P = (12, -4)$ and $Q = \left(-\tfrac83, 8\right)$. Line $AP$ makes an angle with $\tan = \tfrac13$ below $AB$, and line $AQ$ makes an angle with $\tan = \tfrac13$ beyond $AC$ ($\tfrac{8/3}8 = \tfrac13$), so $AP$ and $AQ$ are isogonal, as the lemma says.` }
  );
  add("shooting-lemma",
    { q: String.raw`$M$ is the midpoint of arc $BC$ of a circle, with $MB = 5$. A line from $M$ meets chord $BC$ at $D$, with $MD = 3$, and the circle again at $T$. Find $MT$ and $DT$.`,
      s: String.raw`The lemma gives $MD\cdot MT = MB^2 = 25$, so $MT = \tfrac{25}3$ and $DT = \tfrac{25}3 - 3 = \tfrac{16}3$.` },
    { q: String.raw`Prove $MD\cdot MT = MB^2$ in the shooting lemma by similar triangles.`,
      s: String.raw`The arcs $MB$ and $MC$ are equal, so the inscribed angles on them are equal: $\angle MBD = \angle MBC = \angle MTB$. Triangles $MBD$ and $MTB$ also share the angle at $M$, so they are similar, and $\tfrac{MD}{MB} = \tfrac{MB}{MT}$.` }
  );
  add("carnots-perpendicularity-theorem",
    { q: String.raw`Use Carnot's theorem to show that the three perpendicular bisectors of a triangle meet in one point.`,
      s: String.raw`Take $D$, $E$, $F$ to be the midpoints, so $BD = DC$, $CE = EA$, $AF = FB$. Every difference $BD^2 - DC^2$ and so on is $0$, the sum is $0$, and the perpendiculars at the midpoints concur.` },
    { q: String.raw`Use Carnot's theorem to show that the altitudes of a triangle meet in one point.`,
      s: String.raw`With $D$ the foot of the altitude from $A$, the two right triangles on $AD$ give $BD^2 - DC^2 = AB^2 - AC^2 = c^2 - b^2$. Likewise $CE^2 - EA^2 = a^2 - c^2$ and $AF^2 - FB^2 = b^2 - a^2$. The sum is $0$, so the perpendiculars to the sides at the feet, which are the altitudes, concur.` }
  );
  add("excentral-triangle",
    { q: String.raw`Find the excentral triangle of an equilateral triangle of side $2$.`,
      s: String.raw`Here $R = \tfrac2{\sqrt3}$, so the excentral triangle has circumradius $2R = \tfrac4{\sqrt3}$ and sides $4R\cos30^\circ = 4$. It is the equilateral triangle of side $4$ with the original as its medial triangle, and its orthocenter is the incenter of the original.` }
  );
  add("isogonal-conjugate",
    { q: String.raw`Find the isogonal conjugate of the centroid $(1 : 1 : 1)$ and of the incenter $(a : b : c)$.`,
      s: String.raw`The centroid goes to $\left(\tfrac{a^2}1 : \tfrac{b^2}1 : \tfrac{c^2}1\right) = (a^2 : b^2 : c^2)$, the Lemoine point. The incenter goes to $\left(\tfrac{a^2}a : \tfrac{b^2}b : \tfrac{c^2}c\right) = (a : b : c)$, itself: the bisectors are their own reflections.` }
  );
  add("center-distance-formulas",
    { q: String.raw`For the right triangle with legs $6$ and $8$, find $OH$ and $OI$ from the formulas and check them in coordinates.`,
      s: String.raw`Here $R = 5$, $r = 2$ and $a^2 + b^2 + c^2 = 200$. So $OH^2 = 225 - 200 = 25$ and $OI^2 = 25 - 20 = 5$. With the right angle at $(0, 0)$ and legs on the axes to $(8, 0)$ and $(0, 6)$, $H = (0, 0)$, $O = (4, 3)$ and $I = (2, 2)$: $OH = 5$ and $OI = \sqrt5$.` },
    { q: String.raw`For the triangle with sides $13$, $14$, $15$, find $OI$ and $OH$.`,
      s: String.raw`With $R = \tfrac{65}8$ and $r = 4$, $OI^2 = R^2 - 2Rr = \tfrac{4225}{64} - 65 = \tfrac{65}{64}$, so $OI = \tfrac{\sqrt{65}}8$. And $OH^2 = 9R^2 - 590 = \tfrac{38025 - 37760}{64} = \tfrac{265}{64}$, so $OH = \tfrac{\sqrt{265}}8$.` }
  );
  add("lemoine-point",
    { q: String.raw`For the $3$-$4$-$5$ right triangle, find the barycentric coordinates of the Lemoine point and its distances to the three sides.`,
      s: String.raw`$K = (9 : 16 : 25)$. The distances are $ka$, $kb$, $kc$, and the three small triangles from $K$ fill the area: $\tfrac12k(a^2 + b^2 + c^2) = 6$, so $k = \tfrac{12}{50} = \tfrac6{25}$. The distances are $\tfrac{18}{25}$, $\tfrac{24}{25}$ and $\tfrac65$; the last is half the altitude $\tfrac{12}5$ to the hypotenuse, since in a right triangle $K$ is the midpoint of that altitude.` },
    { q: String.raw`For the isosceles $5$-$5$-$6$ triangle, the symmedian point sits at distances proportional to the sides. Compute them.`,
      s: String.raw`The area is $12$ and $a^2 + b^2 + c^2 = 36 + 25 + 25 = 86$, so $k = \tfrac{24}{86} = \tfrac{12}{43}$. The distance to the base is $\tfrac{72}{43}$ and to each leg $\tfrac{60}{43}$.` }
  );
  add("gergonne-nagel-points",
    { q: String.raw`For the triangle with $a = 5$, $b = 4$, $c = 3$, give the barycentric coordinates of the Gergonne and Nagel points.`,
      s: String.raw`With $s = 6$ the tangent lengths are $s - a = 1$, $s - b = 2$, $s - c = 3$. The Gergonne point is $\left(\tfrac1{s-a} : \tfrac1{s-b} : \tfrac1{s-c}\right) = \left(1 : \tfrac12 : \tfrac13\right) = (6 : 3 : 2)$, and the Nagel point is $(s - a : s - b : s - c) = (1 : 2 : 3)$.` },
    { q: String.raw`Show that the Nagel cevian from $A$ splits the perimeter in half: going from $A$ to its foot on $BC$ along either side of the triangle covers a distance $s$.`,
      s: String.raw`The $A$-excircle touches $BC$ at the point $s - c$ from $B$ and $s - b$ from $C$. So the path $A \to B \to$ foot has length $c + (s - c) = s$, and the path $A \to C \to$ foot has length $b + (s - b) = s$.` }
  );
  add("two-tangents-angle",
    { q: String.raw`Two tangents from $P$ to a circle meet at $40^\circ$. Find the two arcs between the points of tangency.`,
      s: String.raw`The central angle is $180^\circ - 40^\circ = 140^\circ$, so the near arc is $140^\circ$ and the far arc $220^\circ$. Check: $\tfrac{220 - 140}2 = 40$.` },
    { q: String.raw`From an outside point, the two tangent lines to a circle of radius $6$ cross at $60^\circ$. How far is the point from the center, and how long is each tangent segment?`,
      s: String.raw`$OP$ bisects the $60^\circ$ angle, so the right triangle $OAP$ has $\angle APO = 30^\circ$: $OP = 2\cdot6 = 12$ and $PA = 6\sqrt3$.` }
  );
  add("inversion-facts",
    { q: String.raw`Under inversion in the circle of radius $4$ about $O$, where does a point $8$ from $O$ go, and what is the image of the circle through $O$ with diameter $OD$, $OD = 4$?`,
      s: String.raw`The point goes to distance $\tfrac{16}8 = 2$ on the same ray. A circle through $O$ goes to a line perpendicular to its diameter $OD$, at distance $\tfrac{16}{OD} = 4$ from $O$. Here $D$ lies on the circle of inversion and stays fixed, so the image is the line through $D$ perpendicular to $OD$, tangent there to the original circle.` },
    { q: String.raw`Under inversion in the circle of radius $6$ about $O$, what is the image of a line $3$ from $O$?`,
      s: String.raw`A line not through $O$ goes to a circle through $O$. The foot of the perpendicular, $3$ from $O$, goes to distance $\tfrac{36}3 = 12$, the far end of a diameter, so the image is the circle through $O$ with diameter $12$ along that perpendicular.` }
  );
  add("power-of-a-point-linearity",
    { q: String.raw`Find the radical axis of $x^2 + y^2 = 4$ and $(x - 6)^2 + y^2 = 9$, and check the linearity formula at the origin.`,
      s: String.raw`Setting the powers equal, $x^2 + y^2 - 4 = x^2 - 12x + 36 + y^2 - 9$, gives $x = \tfrac{31}{12}$. At $P = (0, 0)$ the powers are $-4$ and $27$, a difference of $-31$, and $2\cdot O_1O_2\cdot d(P, \ell) = 2\cdot6\cdot\tfrac{31}{12} = 31$, the same size (the sign records the side of the axis).` }
  );
  add("common-chord-length",
    { q: String.raw`Two equal circles of radius $5$ overlap, with centers $6$ apart. How long is the segment joining their crossing points?`,
      s: String.raw`By symmetry the chord is halfway, $3$ from each center, so it is $2\sqrt{25 - 9} = 8$. The formula agrees: $d_1 = \tfrac{36 + 25 - 25}{12} = 3$.` },
    { q: String.raw`Circles of radii $13$ and $15$, whose centers are $14$ apart, cross at two points. How far apart are those points?`,
      s: String.raw`$d_1 = \tfrac{196 + 169 - 225}{28} = 5$, so the chord is $2\sqrt{169 - 25} = 24$. (The centers and an end of the chord form the $13$-$14$-$15$ triangle, whose altitude to $14$ is $12$.)` }
  );
  add("miquels-theorem",
    { q: String.raw`Take $D$, $E$, $F$ to be the midpoints of $BC$, $CA$, $AB$. Which point lies on all three Miquel circles?`,
      s: String.raw`The circumcenter $O$. The perpendicular bisectors through $E$ and $F$ give $\angle AFO = \angle AEO = 90^\circ$, so $A$, $E$, $F$, $O$ lie on the circle with diameter $AO$; likewise for the other two circles.` },
    { q: String.raw`Take $D$, $E$, $F$ to be the points where the incircle touches the sides. Which point lies on all three Miquel circles?`,
      s: String.raw`The incenter $I$. The radii to the touch points are perpendicular to the sides, so $\angle AEI = \angle AFI = 90^\circ$ and circle $AEF$ has diameter $AI$; likewise $BI$ and $CI$ are diameters of the others.` }
  );
  add("orthogonal-circles",
    { q: String.raw`A circle has center $(0, 0)$ and radius $5$. What radius must a circle centered at $(13, 0)$ have to cross it at right angles?`,
      s: String.raw`Orthogonality needs $O_1O_2^2 = r_1^2 + r_2^2$: $169 = 25 + r^2$, so $r = 12$. The radii to a crossing point are then perpendicular, the legs of the $5$-$12$-$13$ triangle.` },
    { q: String.raw`Are the circles $x^2 + y^2 = 1$ and $(x - 2)^2 + y^2 = 3$ orthogonal?`,
      s: String.raw`The centers are $2$ apart and $2^2 = 1 + 3$, so yes. Equivalently, the power of $(2, 0)$ with respect to the first circle is $4 - 1 = 3$, the square of the second radius.` }
  );
  add("monges-theorem",
    { q: String.raw`Check Monge numerically: three circles have centers $(0, 0)$, $(4, 0)$, $(0, 4)$ and radii $1$, $2$, $4$. Locate the three points where each pair's outer common tangents meet.`,
      s: String.raw`The external center for centers $O_i$, $O_j$ and radii $r_i$, $r_j$ is $\tfrac{r_jO_i - r_iO_j}{r_j - r_i}$. This gives $E_{12} = (-4, 0)$, $E_{13} = \tfrac{4(0, 0) - (0, 4)}3 = \left(0, -\tfrac43\right)$ and $E_{23} = \tfrac{4(4, 0) - 2(0, 4)}2 = (8, -4)$. All three lie on $x + 3y + 4 = 0$.` },
    { q: String.raw`Explain Monge's Theorem by thinking of the three circles as spheres resting on a table.`,
      s: String.raw`Replace each circle by a sphere with that circle as its equator, lying on the plane of the circles. For two spheres, the cone tangent to both has its apex at their external center of similitude, in the plane. A second plane rests on top of all three spheres, and it is tangent to each cone, so it contains all three apexes. The three points lie in two different planes, hence on the line where those planes meet.` }
  );
  add("ptolemy-second-theorem",
    { q: String.raw`A cyclic quadrilateral has $AB = 7$, $BC = 15$, $CD = 20$, $DA = 24$. Find both diagonals.`,
      s: String.raw`With $ac + bd = 140 + 360 = 500$, $ad + bc = 168 + 300 = 468$ and $ab + cd = 105 + 480 = 585$: $AC^2 = \tfrac{500\cdot468}{585} = 400$ and $BD^2 = \tfrac{500\cdot585}{468} = 625$. So $AC = 20$ and $BD = 25$, and $BD$ is a diameter, since $7^2 + 24^2 = 15^2 + 20^2 = 25^2$.` },
    { q: String.raw`Check the ratio $\tfrac pq = \tfrac{ad + bc}{ab + cd}$ for a rectangle with sides $3$ and $4$.`,
      s: String.raw`With $a = c = 3$ and $b = d = 4$ (or the other way), $ad + bc = 12 + 12$ and $ab + cd = 12 + 12$, so the diagonals are equal, as in every rectangle. The other formula gives $p^2 = \tfrac{(9 + 16)\cdot24}{24} = 25$, so $p = 5$.` }
  );
  add("angle-bisectors-of-lines",
    { q: String.raw`Find the bisectors of the angles between $3x + 4y = 0$ and $4x + 3y = 0$, and use the slope formula to bisect the angle between $y = 0$ and $y = \sqrt3x$.`,
      s: String.raw`Both normals have length $5$, so the bisectors are $3x + 4y = \pm(4x + 3y)$: $y = x$ and $y = -x$. For $m = \sqrt3$, $m' = \tfrac{\sqrt{1 + 3} - 1}{\sqrt3} = \tfrac1{\sqrt3}$, the line at $30^\circ$, half of $60^\circ$.` }
  );
  add("picks-theorem-general",
    { q: String.raw`Using only the points $(2m, 3n)$ as the lattice, a polygon with vertices there has $2$ of those points inside and $10$ on its edges. What is its area, and what polygon fits?`,
      s: String.raw`A fundamental cell has area $d = 6$, so the area is $6\left(2 + 5 - 1\right) = 36$. The rectangle of $3 \times 2$ cells, $[0, 6] \times [0, 6]$, fits: $10$ lattice points on its boundary, $2$ inside, area $36$.` },
    { q: String.raw`On the triangular lattice of unit equilateral triangles, find the area of a lattice triangle with no interior points and only its three vertices on the boundary.`,
      s: String.raw`The cell spanned by two unit vectors at $60^\circ$ has area $d = \tfrac{\sqrt3}2$, so the area is $\tfrac{\sqrt3}2\left(0 + \tfrac32 - 1\right) = \tfrac{\sqrt3}4$: a single unit triangle.` }
  );
  add("picks-with-holes",
    { q: String.raw`A $4\times4$ lattice square has a $1\times1$ lattice square removed from its middle. Check the formula on it.`,
      s: String.raw`The boundary has $16$ outer and $4$ inner points, $B = 20$. Of the $9$ points strictly inside the big square, $4$ are on the hole's edge, so $I = 5$. With $h = 1$, $A = 5 + 10 + 1 - 1 = 15$, which is $16 - 1$.` },
    { q: String.raw`A lattice polygon with $2$ holes has $10$ interior and $20$ boundary lattice points. Find its area.`,
      s: String.raw`$A = I + \tfrac B2 + h - 1 = 10 + 10 + 2 - 1 = 21$.` }
  );
  add("polar-coordinates",
    { q: String.raw`Write the point $(-1, \sqrt3)$ in polar coordinates.`,
      s: String.raw`$r = \sqrt{1 + 3} = 2$, and the point is in the second quadrant with $\tan\theta = -\sqrt3$, so $\theta = 120^\circ$: $(2, 120^\circ)$.` },
    { q: String.raw`Convert $r = \dfrac2{1 - \cos\theta}$ to rectangular coordinates and name the curve.`,
      s: String.raw`Clear the fraction: $r - r\cos\theta = 2$, that is $\sqrt{x^2 + y^2} = x + 2$. Squaring, $x^2 + y^2 = x^2 + 4x + 4$, so $y^2 = 4x + 4$: a parabola with vertex $(-1, 0)$ and focus at the origin.` }
  );
  add("conic-reflective-property",
    { q: String.raw`A ray travelling straight down, parallel to the axis of the parabola $y = \tfrac{x^2}4$, strikes it at $(2, 1)$. Where does the reflected ray go?`,
      s: String.raw`The parabola is $x^2 = 4y$ with focus $(0, 1)$. A ray parallel to the axis reflects through the focus, so it leaves $(2, 1)$ heading straight to $(0, 1)$, horizontally.` }
  );
  add("focal-radii",
    { q: String.raw`Find the distances from $P = \left(3, \tfrac{12}5\right)$ on $\frac{x^2}{25} + \frac{y^2}9 = 1$ to its two foci.`,
      s: String.raw`Here $a = 5$, $c = 4$, $e = \tfrac45$. The focal radii are $a \pm ex = 5 \pm \tfrac{12}5$: $\tfrac{37}5$ to $(-4, 0)$ and $\tfrac{13}5$ to $(4, 0)$. They add to $10 = 2a$.` },
    { q: String.raw`A point on the parabola $x^2 = 8y$ has $y = 6$. How far is it from the focus?`,
      s: String.raw`Here $4p = 8$, so $p = 2$ and the distance is $y + p = 8$. Check with $P = (4\sqrt3, 6)$ and focus $(0, 2)$: $\sqrt{48 + 16} = 8$.` }
  );
  add("parabolic-segment-area",
    { q: String.raw`The parabola $y = x^2$ and the horizontal line $y = 4$ enclose a cap. How big is it?`,
      s: String.raw`The curves meet at $x = \pm2$, so the area is $\tfrac{|a|(x_2 - x_1)^3}6 = \tfrac{64}6 = \tfrac{32}3$.` },
    { q: String.raw`Check Archimedes' ratio on the segment of $y = 4 - x^2$ above the $x$-axis, using the triangle with vertices $(-2, 0)$, $(2, 0)$, $(0, 4)$.`,
      s: String.raw`The triangle's apex is the point where the tangent is parallel to the chord, and its area is $\tfrac12\cdot4\cdot4 = 8$. Then $\tfrac43\cdot8 = \tfrac{32}3$, the same as $\tfrac{1\cdot4^3}6$.` }
  );
  add("gliding-principle",
    { q: String.raw`Triangle $A(0, 0)$, $B(2, 0)$, $C(0, 2)$ is turned $90^\circ$ about the origin to $A'(0, 0)$, $B'(0, 2)$, $C'(-2, 0)$. Show that the midpoints of $AA'$, $BB'$, $CC'$ form a triangle similar to $ABC$ with the same orientation.`,
      s: String.raw`The midpoints are $P = (0, 0)$, $Q = (1, 1)$, $R = (-1, 1)$. Then $PQ = PR = \sqrt2$ with a right angle at $P$, so $PQR$ is a right isosceles triangle like $ABC$, scaled by $\tfrac1{\sqrt2}$, and $P \to Q \to R$ runs counterclockwise like $A \to B \to C$.` }
  );
  add("iran-lemma",
    { q: String.raw`Prove the Iran Lemma's right angle: with $K$ on ray $BI$ beyond $I$ and on line $FE$ beyond $E$, show that $\angle BKC = 90^\circ$.`,
      s: String.raw`The angle $\angle BIC = 90^\circ + \tfrac A2$, so $\angle KIC = 90^\circ - \tfrac A2$. Triangle $AEF$ is isosceles ($AE = AF$), so $\angle AEF = 90^\circ - \tfrac A2$, and its vertical angle $\angle KEC$ is the same. So $I$ and $E$ see $KC$ at equal angles from the same side, and $K$, $C$, $I$, $E$ are concyclic. In that circle $\angle IEC = 90^\circ$ (radius to a tangent point), so $IC$ is a diameter and $\angle IKC = 90^\circ$.` }
  );
  add("isogonal-conjugate",
    { q: String.raw`Show that the isogonal conjugate of the orthocenter $(\tan A : \tan B : \tan C)$ is the circumcenter $(\sin2A : \sin2B : \sin2C)$.`,
      s: String.raw`The map sends it to $\left(\tfrac{a^2}{\tan A} : \tfrac{b^2}{\tan B} : \tfrac{c^2}{\tan C}\right)$. By the Law of Sines $a^2 \propto \sin^2A$, and $\tfrac{\sin^2A}{\tan A} = \sin A\cos A = \tfrac12\sin2A$. So the image is $(\sin2A : \sin2B : \sin2C)$, the circumcenter.` }
  );
  add("gliding-principle",
    { q: String.raw`Two squares with the same orientation are drawn anywhere in the plane, corresponding corners labelled alike. Joining corresponding corners and taking midpoints gives four points. Prove that they form a square or a single point.`,
      s: String.raw`Apply the gliding principle with ratio $\tfrac12$ to the directly similar triangles $ABC$ and $A'B'C'$: the midpoints $P$, $Q$, $R$ form a triangle directly similar to $ABC$, a right isosceles triangle with the right angle at $Q$. Doing the same for $ACD$ and $A'C'D'$ puts the fourth midpoint $S$ where it completes $PQRS$ to a square. If the scale factor is $0$, all four midpoints coincide.` }
  );
  add("regular-tetrahedron",
    { q: String.raw`A regular tetrahedron has surface area $16\sqrt3$. Find its edge, height and volume.`,
      s: String.raw`From $s^2\sqrt3 = 16\sqrt3$, $s = 4$. Then $h = \tfrac{4\sqrt6}3$ and $V = \tfrac{64\sqrt2}{12} = \tfrac{16\sqrt2}3$, which is also $\tfrac13\cdot4\sqrt3\cdot\tfrac{4\sqrt6}3$.` }
  );
  add("dodecahedron-icosahedron",
    { q: String.raw`Of the segments joining two of the $12$ vertices of an icosahedron, how many are neither edges nor lie in a face?`,
      s: String.raw`There are $\binom{12}2 = 66$ segments. The faces are triangles, so a segment in a face is an edge, and the $30$ edges are the only ones to remove: $66 - 30 = 36$ pass through the interior.` },
    { q: String.raw`Check Euler's formula for the dodecahedron and the icosahedron, and explain why they have the same number of edges.`,
      s: String.raw`$20 - 30 + 12 = 2$ and $12 - 30 + 20 = 2$. The two solids are dual: putting a vertex at the center of each face of one and joining neighbouring faces gives the other, so the dodecahedron's $20$ vertices match the icosahedron's $20$ faces and its $12$ faces the $12$ vertices, while each edge crosses exactly one edge of the dual.` }
  );
  add("pappus-centroid",
    { q: String.raw`A circle of radius $2$ whose center is $5$ from an axis is revolved about it. Find the volume and surface area of the torus.`,
      s: String.raw`The centroid travels $2\pi\cdot5$. The volume is $10\pi\cdot4\pi = 40\pi^2$ and the surface area $10\pi\cdot4\pi = 40\pi^2$ (the circumference is $4\pi$, the area $4\pi$ too).` },
    { q: String.raw`A $2 \times 3$ rectangle, with its side of length $3$ parallel to an axis and $1$ unit from it, is revolved about the axis. Find the volume with Pappus and check it.`,
      s: String.raw`The centroid is $1 + 1 = 2$ from the axis, so $V = 2\pi\cdot2\cdot6 = 24\pi$. Check: the solid is a tube of height $3$ with radii $1$ and $3$, volume $\pi(9 - 1)\cdot3 = 24\pi$.` }
  );
  add("vector-projection",
    { q: String.raw`Find the projection of $\vec u = (1, 2, 2)$ onto $\vec v = (2, -1, 2)$, and its length.`,
      s: String.raw`$\vec u\cdot\vec v = 2 - 2 + 4 = 4$ and $\vec v\cdot\vec v = 9$, so the projection is $\tfrac49(2, -1, 2) = \left(\tfrac89, -\tfrac49, \tfrac89\right)$, of length $\tfrac43$.` }
  );
  add("skew-lines-distance",
    { q: String.raw`Find the distance between the lines $t(1, 1, 0)$ and $(1, 0, 1) + s(0, 1, 1)$.`,
      s: String.raw`The cross product of the directions is $(1, 1, 0)\times(0, 1, 1) = (1, -1, 1)$, of length $\sqrt3$. The points $(0, 0, 0)$ and $(1, 0, 1)$ differ by $(1, 0, 1)$, whose dot product with it is $2$. So $d = \tfrac2{\sqrt3}$.` }
  );
  add("isoperimetric-facts",
    { q: String.raw`Find the largest area of a rectangle with perimeter $20$, and of a triangle with perimeter $12$.`,
      s: String.raw`The square wins among rectangles: $\tfrac{20^2}{16} = 25$. The equilateral triangle wins among triangles: $\tfrac{144}{12\sqrt3} = 4\sqrt3$, the area of the triangle with side $4$.` },
    { q: String.raw`A farmer has $100$ m of fence to enclose land along a straight river, which needs no fence. What is the largest area for a rectangle, and for any shape?`,
      s: String.raw`A rectangle with sides $x$, $y$, $x$ has $2x + y = 100$, and $x(100 - 2x)$ is largest at $x = 25$: $1250$ m$^2$. For any shape, reflect it in the river: a closed curve of length $200$ encloses at most $\tfrac{200^2}{4\pi}$, so the half has at most $\tfrac{5000}\pi \approx 1592$ m$^2$, reached by a semicircle.` }
  );
  add("harmonic-quadrilateral",
    { q: String.raw`Which rectangles inscribed in a circle are harmonic quadrilaterals?`,
      s: String.raw`A cyclic quadrilateral is harmonic when $AB\cdot CD = BC\cdot DA$. A rectangle with sides $a$ and $b$ has $AB\cdot CD = a^2$ and $BC\cdot DA = b^2$, so only the squares are harmonic.` }
  );
  add("gcd-power-minus-one",
    { q: String.raw`Compute $\gcd(3^{15} - 1, 3^{10} - 1)$.`,
      s: String.raw`$\gcd(15, 10) = 5$, so it is $3^5 - 1 = 242$.` },
    { q: String.raw`Show that $2^7 - 1$ and $2^5 - 1$ are coprime, and say when $2^m - 1$ and $2^n - 1$ are coprime in general.`,
      s: String.raw`The gcd is $2^{\gcd(7, 5)} - 1 = 2^1 - 1 = 1$ (indeed $127$ and $31$ are distinct primes). In general they are coprime exactly when $\gcd(m, n) = 1$, since only then is $2^{\gcd(m,n)} - 1 = 1$.` }
  );
  add("sigma-parity",
    { q: String.raw`Is $\sigma(50)$ odd?`,
      s: String.raw`$50 = 2\cdot5^2$ is twice a square, so yes: $\sigma(50) = 1 + 2 + 5 + 10 + 25 + 50 = 93$.` },
    { q: String.raw`Among the numbers $1$ through $50$, count those whose divisor sum is even.`,
      s: String.raw`$\sigma(n)$ is odd for the $7$ squares up to $49$ and for the $5$ numbers $2m^2$ up to $50$ ($2, 8, 18, 32, 50$), $12$ in all. So $50 - 12 = 38$ have $\sigma(n)$ even.` }
  );
  add("mobius-inversion",
    { q: String.raw`Find $\mu(1)$, $\mu(12)$ and $\mu(30)$.`,
      s: String.raw`$\mu(1) = 1$; $12 = 2^2\cdot3$ has a square factor, so $\mu(12) = 0$; $30 = 2\cdot3\cdot5$ has three distinct primes, so $\mu(30) = (-1)^3 = -1$.` },
    { q: String.raw`Since $\sum_{d \mid n}\varphi(d) = n$, Möbius inversion gives $\varphi(n) = \sum_{d \mid n}\mu(d)\tfrac nd$. Use it to compute $\varphi(12)$.`,
      s: String.raw`Only the squarefree divisors $1, 2, 3, 6$ count: $12 - 6 - 4 + 2 = 4$. Indeed $1, 5, 7, 11$ are the numbers up to $12$ coprime to it.` }
  );
  add("lagrange-roots-mod-p",
    { q: String.raw`Show that $x^2 \equiv 1 \pmod p$ has only the solutions $\pm1$ for a prime $p$, and compare with the modulus $8$.`,
      s: String.raw`A polynomial of degree $2$ has at most $2$ roots modulo a prime, and $1$ and $-1$ are roots, so there are no others. Modulo $8$ the four numbers $1, 3, 5, 7$ all square to $1$: the theorem needs a prime modulus.` },
    { q: String.raw`For a prime $p$, show that $x^{p-1} - 1 \equiv (x - 1)(x - 2)\cdots(x - (p - 1)) \pmod p$ as polynomials.`,
      s: String.raw`Both sides are monic of degree $p - 1$, so their difference has degree at most $p - 2$. By Fermat both sides vanish at $x = 1, \ldots, p - 1$, so the difference has $p - 1$ roots, more than its degree. By Lagrange it is the zero polynomial modulo $p$.` }
  );
  add("primitive-roots",
    { q: String.raw`Is $3$ a primitive root modulo $7$, and how many primitive roots does $7$ have?`,
      s: String.raw`The powers of $3$ are $3, 2, 6, 4, 5, 1$, so $3$ has order $6 = \varphi(7)$: yes. There are $\varphi(6) = 2$ primitive roots, $3$ and $5$.` },
    { q: String.raw`Show that there is no primitive root modulo $8$.`,
      s: String.raw`The units are $1, 3, 5, 7$, and each squares to $1$ modulo $8$, so every order is at most $2$, while a primitive root would need order $\varphi(8) = 4$. This is why $8$ is not on the list $1, 2, 4, p^k, 2p^k$.` }
  );
  add("freshmans-dream",
    { q: String.raw`Simplify $(x + 2)^7$ modulo $7$.`,
      s: String.raw`$(x + 2)^7 \equiv x^7 + 2^7 \pmod 7$, and $2^7 = 128 = 18\cdot7 + 2$, so $(x + 2)^7 \equiv x^7 + 2$.` }
  );
  add("quadratic-reciprocity",
    { q: String.raw`Is $5$ a square modulo $19$?`,
      s: String.raw`Since $5 \equiv 1 \pmod 4$, reciprocity gives $\left(\tfrac5{19}\right) = \left(\tfrac{19}5\right) = \left(\tfrac45\right) = 1$. Yes: $9^2 = 81 = 4\cdot19 + 5$.` },
    { q: String.raw`Is $2$ a square modulo $17$?`,
      s: String.raw`$\left(\tfrac2{17}\right) = (-1)^{(289 - 1)/8} = (-1)^{36} = 1$, so yes: $6^2 = 36 = 2\cdot17 + 2$.` }
  );
  add("bertrands-postulate",
    { q: String.raw`Show that $1 + \tfrac12 + \cdots + \tfrac1n$ is never an integer for $n \ge 2$, using Bertrand's Postulate.`,
      s: String.raw`Bertrand gives a prime $p$ with $\tfrac n2 \lt p \le n$, and $2p \gt n$, so $p$ divides exactly one of the denominators $1, \ldots, n$. Over the common denominator $n!$, every numerator except the one for $\tfrac1p$ contains the factor $p$, so the total numerator is not a multiple of $p$ while $n!$ is. So the sum is not an integer.` },
    { q: String.raw`Show that the $k$th prime satisfies $p_k \lt 2^k$ for $k \ge 2$.`,
      s: String.raw`For $k = 2$, $3 \lt 4$. If $p_k \lt 2^k$, Bertrand gives a prime between $p_k$ and $2p_k$, so $p_{k+1} \le 2p_k \lt 2^{k+1}$.` }
  );
  add("sum-of-three-squares",
    { q: String.raw`Is $60$ a sum of three squares?`,
      s: String.raw`$60 = 4\cdot15$ and $15 = 8 + 7$, so $60$ has the form $4^k(8m + 7)$ and is not a sum of three squares.` },
    { q: String.raw`Write $7$ as a sum of four squares, and explain why three cannot do it.`,
      s: String.raw`$7 = 4 + 1 + 1 + 1$. Squares are $0$, $1$ or $4$ modulo $8$, and no three of them add to $7$ modulo $8$, so three squares are not enough.` }
  );
  add("terminating-decimals",
    { q: String.raw`Does $\tfrac{21}{140}$ have a terminating decimal?`,
      s: String.raw`In lowest terms it is $\tfrac3{20}$, and $20 = 2^2\cdot5$, so yes: $0.15$. The factor $7$ of $140$ cancels, which is why the test uses lowest terms.` },
    { q: String.raw`How many digits follow the decimal point in $\tfrac1{800}$?`,
      s: String.raw`$800 = 2^5\cdot5^2$. Multiplying top and bottom by $5^3$ gives $\tfrac{125}{10^5}$, so $\tfrac1{800} = 0.00125$, with $\max(5, 2) = 5$ digits after the point.` }
  );
  add("cyclotomic-polynomials",
    { q: String.raw`Find $\Phi_6(x)$ and $\Phi_{12}(x)$.`,
      s: String.raw`$x^6 - 1 = \Phi_1\Phi_2\Phi_3\Phi_6 = (x - 1)(x + 1)(x^2 + x + 1)\Phi_6$, so $\Phi_6 = x^2 - x + 1$. Then $x^{12} - 1 = (x^6 - 1)(x^6 + 1)$, and $x^6 + 1 = \Phi_4\Phi_{12} = (x^2 + 1)\Phi_{12}$, so $\Phi_{12} = x^4 - x^2 + 1$.` },
    { q: String.raw`Factor $x^6 - 1$ completely over the rationals.`,
      s: String.raw`By the product over divisors of $6$: $(x - 1)(x + 1)(x^2 + x + 1)(x^2 - x + 1)$, the cyclotomic polynomials $\Phi_1$, $\Phi_2$, $\Phi_3$, $\Phi_6$.` }
  );
  add("gaussian-integers",
    { q: String.raw`Compute $(1 + 2i)(2 + i)$ and check that norms multiply.`,
      s: String.raw`The product is $2 + i + 4i + 2i^2 = 5i$, of norm $25$, and the factors have norms $5$ and $5$.` },
    { q: String.raw`Use $(2 + i)^2$ to write $25$ as a sum of two nonzero squares.`,
      s: String.raw`$(2 + i)^2 = 3 + 4i$, whose norm is $N(2 + i)^2 = 25$. So $25 = 3^2 + 4^2$.` }
  );
  add("inversion-properties",
    { q: String.raw`Under inversion about $O = (0, 0)$ with radius $2$, find the image of the circle with center $(5, 0)$ and radius $1$.`,
      s: String.raw`The circle does not pass through $O$, so its image is a circle, symmetric about the $x$-axis. Its points $(4, 0)$ and $(6, 0)$ go to $(1, 0)$ and $\left(\tfrac23, 0\right)$, the ends of a diameter of the image: center $\left(\tfrac56, 0\right)$, radius $\tfrac16$.` },
    { q: String.raw`Two circles pass through $O$ and are tangent to each other there. What happens to them under inversion about $O$?`,
      s: String.raw`Each circle through $O$ becomes a line. The circles meet only at $O$, which goes to infinity, so the two lines do not meet: they are parallel, both perpendicular to the common diameter direction at $O$.` }
  );
  add("sqrt-bc-inversion",
    { q: String.raw`In triangle $ABC$, $AB = 4$ and $AC = 9$. Under the $\sqrt{bc}$ inversion at $A$, where does the point $P$ of segment $AB$ with $AP = 2$ go?`,
      s: String.raw`The map multiplies distances from $A$ into $bc = 36$ and reflects in the bisector of angle $A$, which swaps the rays $AB$ and $AC$. So $P$ goes to the point of ray $AC$ at distance $\tfrac{36}2 = 18$ from $A$, twice as far as $C$.` },
    { q: String.raw`Check $AI\cdot AI_A = bc$ on the right triangle with legs $AB = 3$, $AC = 4$.`,
      s: String.raw`With the right angle at $A$, the centers lie on the bisector at $45^\circ$, so $AI = r\sqrt2$ and $AI_A = r_A\sqrt2$. Here $r = 1$ and $r_A = \tfrac{6}{s - a} = \tfrac61 = 6$, so $AI\cdot AI_A = 2\cdot6 = 12 = bc$.` }
  );
  add("barycentric-coordinates",
    { q: String.raw`With $A = (0, 0)$, $B = (6, 0)$, $C = (0, 6)$, find the point with barycentric coordinates $(1 : 2 : 3)$.`,
      s: String.raw`Normalize to $\left(\tfrac16, \tfrac26, \tfrac36\right)$ and average: $P = \tfrac16A + \tfrac13B + \tfrac12C = (2, 3)$.` },
    { q: String.raw`Give the barycentric coordinates of the point $D$ on $BC$ with $BD : DC = 2 : 3$.`,
      s: String.raw`A point on $BC$ has no weight at $A$, and the weights at $B$ and $C$ are in the inverse ratio of the distances: $D = (0 : 3 : 2)$, that is $D = \tfrac35B + \tfrac25C$.` }
  );
  add("trig-bash",
    { q: String.raw`An isosceles triangle has legs $1$ and apex angle $2\theta$. For which $\theta$ is its base equal to its height?`,
      s: String.raw`Everything in terms of $\theta$: the base is $2\sin\theta$ and the height to it is $\cos\theta$. Setting them equal gives $\tan\theta = \tfrac12$, so the apex angle is $2\arctan\tfrac12 \approx 53.1^\circ$.` },
    { q: String.raw`A ladder of length $10$ leans against a wall. The height of its top and the distance of its foot from the wall add to $14$. Find them.`,
      s: String.raw`With angle $\theta$ to the floor, $10\sin\theta + 10\cos\theta = 14$. Squaring, $1 + \sin2\theta = 1.96$, so $\sin2\theta = 0.96$, which gives $\sin\theta, \cos\theta = 0.8, 0.6$ in some order. The two lengths are $8$ and $6$.` }
  );
  add("affine-transformations",
    { q: String.raw`Show that the midpoints of the chords of slope $1$ of the ellipse $\frac{x^2}9 + \frac{y^2}4 = 1$ lie on one line through the center, and find it.`,
      s: String.raw`Put $x = 3u$, $y = 2v$: the ellipse becomes the unit circle and the chords get slope $\tfrac32$ in the $uv$-plane. Midpoints of parallel chords of a circle lie on the perpendicular diameter, $v = -\tfrac23u$, and the affine map keeps midpoints, so the line is $\tfrac y2 = -\tfrac23\cdot\tfrac x3$, that is $y = -\tfrac49x$. Check: the chord $y = x + k$ has midpoint $\left(-\tfrac{9k}{13}, \tfrac{4k}{13}\right)$.` },
    { q: String.raw`A hexagon is inscribed in the ellipse $\frac{x^2}{25} + \frac{y^2}9 = 1$ as the image of a regular hexagon inscribed in the unit circle. Find its area.`,
      s: String.raw`The map $(u, v) \mapsto (5u, 3v)$ multiplies areas by $15$, and the regular hexagon in the unit circle has area $\tfrac{3\sqrt3}2$. So the area is $\tfrac{45\sqrt3}2$.` }
  );
  add("directed-angles",
    { q: String.raw`Two circles meet at $P$ and $Q$. A line through $P$ meets them again at $A$ and $B$. Show with directed angles that $\angle(QA, QB)$ does not depend on the line.`,
      s: String.raw`On the first circle, $\angle(AQ, AP)$ is fixed, the directed angle subtending chord $QP$; on the second, so is $\angle(BQ, BP)$. Since $A$, $P$, $B$ are collinear, $AP$ and $BP$ are the same line, and in triangle $QAB$ the directed angle at $Q$ is $\angle(QA, QB) = \angle(AQ, AB) + \angle(AB, BQ)$, a sum of two fixed angles. Directed angles make this hold whichever side of $P$ the points fall.` },
    { q: String.raw`Let $H$ be the orthocenter of triangle $ABC$ and $H'$ its reflection in line $BC$. Show with directed angles that $H'$ lies on the circumcircle.`,
      s: String.raw`Reflection reverses directed angles, so $\angle(BH', CH') = -\angle(BH, CH) = \angle(CH, BH)$. The lines $BH$ and $CH$ are perpendicular to $AC$ and $AB$, so $\angle(CH, BH) = \angle(AB, AC)$. Hence $\angle(BH', CH') = \angle(BA, CA)$, and $A$, $B$, $C$, $H'$ are concyclic, with no case split for obtuse triangles.` }
  );
  add("phantom-point",
    { q: String.raw`Show that the bisector of angle $A$ and the external bisectors of angles $B$ and $C$ meet in one point.`,
      s: String.raw`Let $J$ be the point where the two external bisectors meet. A point on the external bisector at $B$ is equally far from lines $BA$ and $BC$, and likewise at $C$, so $J$ is equally far from all three side lines. It lies inside angle $A$, so it is on the internal bisector of $A$: the phantom $J$ is the excenter $I_A$.` },
    { q: String.raw`Point $P$ inside square $ABCD$ has $\angle PAB = \angle PBA = 15^\circ$. Prove that triangle $PCD$ is equilateral.`,
      s: String.raw`Build the phantom: let $P'$ be the point inside with $P'CD$ equilateral. Then $DA = DP'$ and $\angle ADP' = 90^\circ - 60^\circ = 30^\circ$, so triangle $ADP'$ is isosceles with base angles $75^\circ$, and $\angle P'AB = 90^\circ - 75^\circ = 15^\circ$; likewise $\angle P'BA = 15^\circ$. The two angles at $A$ and $B$ fix the point, so $P' = P$.` }
  );
  add("trig-series-complex",
    { q: String.raw`Show that $\cos72^\circ + \cos144^\circ + \cos216^\circ + \cos288^\circ = -1$.`,
      s: String.raw`The fifth roots of unity $e^{2\pi ik/5}$ add to $0$, so their real parts do too: $1 + \cos72^\circ + \cos144^\circ + \cos216^\circ + \cos288^\circ = 0$.` },
    { q: String.raw`Add up the infinite series whose $k$th term, from $k = 0$, is $\cos\tfrac{k\pi}3$ divided by $2^k$.`,
      s: String.raw`It is the real part of $\sum\left(\tfrac{e^{i\pi/3}}2\right)^k = \tfrac1{1 - e^{i\pi/3}/2}$. The denominator is $\tfrac34 - \tfrac{\sqrt3}4i$, of squared modulus $\tfrac34$, so the sum is $\tfrac43\left(\tfrac34 + \tfrac{\sqrt3}4i\right) = 1 + \tfrac i{\sqrt3}$, with real part $1$.` }
  );
  add("slope-to-a-point",
    { q: String.raw`If $x^2 + y^2 = 1$, find the range of $\dfrac{y + 1}{x - 2}$.`,
      s: String.raw`It is the slope from $(2, -1)$ to a point of the circle. The extreme slopes are the tangents: the line $y + 1 = m(x - 2)$ is $1$ from the origin when $(2m + 1)^2 = 1 + m^2$, that is $3m^2 + 4m = 0$. So the range is $-\tfrac43 \le \tfrac{y + 1}{x - 2} \le 0$.` },
    { q: String.raw`Find the range of $\dfrac{y}{x + 1}$ for points $(x, y)$ on the segment from $(0, 0)$ to $(1, 2)$.`,
      s: String.raw`It is the slope from $(-1, 0)$ to a point of the segment, which turns steadily from $0$ at $(0, 0)$ to $1$ at $(1, 2)$. So the range is $[0, 1]$.` }
  );
  add("cofactor-expansion",
    { q: String.raw`Which row or column turns the determinant of $\begin{pmatrix} 2 & 0 & 1 \\ 3 & 0 & 4 \\ 5 & 6 & 7 \end{pmatrix}$ into a one-term expansion? Use it.`,
      s: String.raw`Expand along the second column, whose only nonzero entry is $6$ in position $(3, 2)$, with sign $(-1)^{3+2} = -1$: $-6\begin{vmatrix} 2 & 1 \\ 3 & 4 \end{vmatrix} = -6\cdot5 = -30$.` },
    { q: String.raw`Let $D_n$ be the determinant of the $n\times n$ matrix with $2$ on the diagonal, $1$ just above and below it, and $0$ elsewhere. Find $D_5$.`,
      s: String.raw`Expanding along the first row gives $D_n = 2D_{n-1} - D_{n-2}$, with $D_1 = 2$ and $D_2 = 3$. So $D_n = n + 1$ and $D_5 = 6$.` }
  );
  add("lagrange-interpolation",
    { q: String.raw`A cubic (or lower) agrees with $2^k$ at the four integers $k = 0, 1, 2, 3$. What does it give at $k = 4$, compared with $16$?`,
      s: String.raw`Evaluate the Lagrange basis at $4$: $L_0(4) = -1$, $L_1(4) = 4$, $L_2(4) = -6$, $L_3(4) = 4$. Then $P(4) = -1 + 8 - 24 + 32 = 15$, one less than $2^4$.` },
    { q: String.raw`A quadratic has $P(1) = P(2) = 0$ and $P(3) = 4$. Find $P(0)$.`,
      s: String.raw`Only the third basis polynomial survives: $P(x) = 4\cdot\tfrac{(x - 1)(x - 2)}{(3 - 1)(3 - 2)} = 2(x - 1)(x - 2)$. So $P(0) = 4$.` }
  );
  add("forced-difference-of-squares",
    { q: String.raw`Show that $n^4 + 4$ is composite for every integer $n \ge 2$.`,
      s: String.raw`Add and subtract $4n^2$: $n^4 + 4 = (n^2 + 2)^2 - (2n)^2 = (n^2 - 2n + 2)(n^2 + 2n + 2)$. For $n \ge 2$ the smaller factor is $(n - 1)^2 + 1 \ge 2$, so both factors exceed $1$. For $n = 3$: $85 = 5\cdot17$.` },
    { q: String.raw`Factor $x^4 + 64$ over the integers.`,
      s: String.raw`Complete the square with $16x^2$: $x^4 + 64 = (x^2 + 8)^2 - (4x)^2 = (x^2 - 4x + 8)(x^2 + 4x + 8)$.` }
  );
  add("sos-method",
    { q: String.raw`Prove that $a^3 + b^3 + c^3 - 3abc \ge 0$ for nonnegative reals.`,
      s: String.raw`It equals $\tfrac12(a + b + c)\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$, an SOS form with $S_a = S_b = S_c = \tfrac{a + b + c}2 \ge 0$. Equality holds at $a = b = c$.` }
  );
  add("uvw-method",
    { q: String.raw`Three nonnegative numbers add to $3$. How large can their product be? Use the reduction to two equal numbers or one zero.`,
      s: String.raw`With $u = a + b + c$ and $v = ab + bc + ca$ held, $abc$ is linear in $w^3$, so the extremes occur with two variables equal or one zero. With $c = 0$ the product is $0$. With $b = c$, $a = 3 - 2b$ and $abc = b^2(3 - 2b)$, largest at $b = 1$, value $1$. So the maximum is $1$, at $a = b = c = 1$.` },
    { q: String.raw`For three nonnegative numbers adding to $3$, which values can the sum of their pairwise products take?`,
      s: String.raw`The largest value comes with all equal: $(a + b + c)^2 \ge 3(ab + bc + ca)$ gives $3$. The smallest is $0$, at $(3, 0, 0)$, since every term is nonnegative. So the range is $[0, 3]$.` }
  );
  add("weierstrass-substitution",
    { q: String.raw`Using the half-angle tangent, find every angle in $[0, 2\pi)$ at which sine and cosine add to exactly $1$, and say which angle the substitution can miss.`,
      s: String.raw`The equation becomes $\tfrac{2t + 1 - t^2}{1 + t^2} = 1$, that is $2t = 2t^2$, so $t = 0$ or $t = 1$: $\theta = 0$ or $\tfrac\pi2$. The substitution misses $\theta = \pi$, where $t$ is undefined, so check it separately: $0 - 1 \ne 1$.` },
    { q: String.raw`Find the smallest value of $\dfrac{2 - \cos\theta}{\sin\theta}$ for $0 \lt \theta \lt \pi$.`,
      s: String.raw`With $t = \tan\tfrac\theta2 \gt 0$ the expression is $\tfrac{2(1 + t^2) - (1 - t^2)}{2t} = \tfrac1{2t} + \tfrac{3t}2$, at least $2\sqrt{\tfrac34} = \sqrt3$ by AM-GM, with equality at $t = \tfrac1{\sqrt3}$, that is $\theta = \tfrac\pi3$.` }
  );
  add("normalization",
    { q: String.raw`Prove that $(a + b + c)\left(\tfrac1a + \tfrac1b + \tfrac1c\right) \ge 9$ for positive reals by normalizing.`,
      s: String.raw`Scaling $a, b, c$ by the same factor leaves the expression unchanged, so assume $a + b + c = 3$. Then $\tfrac1a + \tfrac1b + \tfrac1c \ge \tfrac9{a + b + c} = 3$ by AM-HM, and the product is at least $9$.` },
    { q: String.raw`Prove $(x + y + z)^3 \ge 27xyz$ for positive reals, assuming $xyz = 1$ first.`,
      s: String.raw`Both sides have degree $3$, so scaling all three variables scales both sides alike, and $xyz = 1$ may be assumed. Then AM-GM gives $x + y + z \ge 3$, so the left side is at least $27 = 27xyz$.` }
  );
  add("homogenization",
    { q: String.raw`Three positive numbers add to $1$. Show that their squares add to at least one third, by first making both sides the same degree.`,
      s: String.raw`Replace $\tfrac13$ by $\tfrac{(a + b + c)^2}3$ to match degrees. The inequality becomes $3(a^2 + b^2 + c^2) \ge (a + b + c)^2$, that is $a^2 + b^2 + c^2 \ge ab + bc + ca$, which holds for all reals.` },
    { q: String.raw`Two positive numbers have sum $2$. Homogenize to show that their cubes add to at least $2$.`,
      s: String.raw`Write $2 = \tfrac{(a + b)^3}4$. The inequality becomes $4(a^3 + b^3) \ge (a + b)^3$, which expands to $3(a + b)(a - b)^2 \ge 0$.` }
  );
  add("tangent-line-trick",
    { q: String.raw`Three positive numbers add to $3$. Comparing $\sqrt x$ with its tangent line at $x = 1$, show that their square roots add to at most $3$.`,
      s: String.raw`The tangent line of $\sqrt x$ at $x = 1$ is $\tfrac12 + \tfrac x2$, and since $\sqrt x$ is concave it lies below that line: $\sqrt x \le \tfrac{1 + x}2$ (equivalently $(\sqrt x - 1)^2 \ge 0$). Adding the three, $\sum\sqrt a \le \tfrac32 + \tfrac32 = 3$.` },
    { q: String.raw`Three positive numbers have sum $3$. Bound the sum of their squares from below with the tangent of $x^2$ at $1$.`,
      s: String.raw`At $x = 1$ the tangent to $x^2$ is $2x - 1$, and $x^2 \ge 2x - 1$ because $(x - 1)^2 \ge 0$. Adding, $\sum a^2 \ge 2\cdot3 - 3 = 3$.` }
  );
  add("squeeze-between-squares",
    { q: String.raw`Why can the product of two consecutive positive integers never be a perfect square?`,
      s: String.raw`The product is $n(n + 1) = n^2 + n$, and $n^2 \lt n^2 + n \lt n^2 + 2n + 1 = (n + 1)^2$. No square lies strictly between two consecutive squares.` },
    { q: String.raw`Find every positive integer $n$ for which $n^2 + 3n + 5$ is a perfect square.`,
      s: String.raw`For $n \ge 1$, $(n + 1)^2 \lt n^2 + 3n + 5 \lt (n + 3)^2$, so it must be $(n + 2)^2 = n^2 + 4n + 4$, which gives $n = 1$. Check: $1 + 3 + 5 = 9$.` }
  );
  add("extended-euclidean-algorithm",
    { q: String.raw`Find integers $x$, $y$ with $17x + 5y = 1$.`,
      s: String.raw`Divide: $17 = 3\cdot5 + 2$ and $5 = 2\cdot2 + 1$. Back-substitute: $1 = 5 - 2\cdot2 = 5 - 2(17 - 3\cdot5) = 7\cdot5 - 2\cdot17$. So $x = -2$, $y = 7$.` },
    { q: String.raw`Find the inverse of $11$ modulo $30$.`,
      s: String.raw`$30 = 2\cdot11 + 8$, $11 = 8 + 3$, $8 = 2\cdot3 + 2$, $3 = 2 + 1$. Working back, $1 = 3\cdot3 - 8 = 3\cdot11 - 4\cdot8 = 11\cdot11 - 4\cdot30$. So the inverse is $11$: indeed $121 = 4\cdot30 + 1$.` }
  );
  add("choose-modulus",
    { q: String.raw`Show that $x^2 + y^2 = 1003$ has no integer solutions.`,
      s: String.raw`Squares are $0$ or $1$ modulo $4$, so $x^2 + y^2$ is $0$, $1$ or $2$ modulo $4$, while $1003 \equiv 3$.` },
    { q: String.raw`Show that $y^2 = 3x^2 + 2$ has no integer solutions.`,
      s: String.raw`Modulo $3$ the right side is $2$, but squares are $0$ or $1$ modulo $3$.` }
  );
  add("pairing-to-bound",
    { q: String.raw`Choose numbers from $1$ to $20$ so that no two chosen ones sum to $21$. How many can be chosen at most?`,
      s: String.raw`The pairs $\{1, 20\}, \{2, 19\}, \ldots, \{10, 11\}$ cover the set, and the subset takes at most one from each, so at most $10$. The set $\{1, \ldots, 10\}$ reaches it.` },
    { q: String.raw`What is the largest subset of $\{1, 2, \ldots, 50\}$ containing no two consecutive integers?`,
      s: String.raw`Pair $\{1, 2\}, \{3, 4\}, \ldots, \{49, 50\}$: $25$ pairs, each giving at most one element, so at most $25$, and the odd numbers reach it.` }
  );
  add("strategy-stealing",
    { q: String.raw`Two players take turns placing identical coins flat on a round table, without overlapping; the player who cannot move loses. Who wins?`,
      s: String.raw`The first player. Put the first coin at the center, then answer every coin by its mirror image through the center. The mirror spot is always free, because the position stays symmetric and the only coin on its own mirror image is the central one. So the first player always has a move.` },
    { q: String.raw`In Chomp, players alternately bite a rectangular bar of at least two squares: a bite takes a square and every square above and to the right of it, and whoever takes the poisoned bottom-left square loses. Show that the first player has a winning strategy.`,
      s: String.raw`Suppose the second player could always win. Let the first player bite only the top-right square, and let the second player answer with the winning reply. That reply leaves a position the first player could have reached in one move from the start, since any bite also removes the top-right square. So the first player could have used it, and the second player's strategy cannot always win. The game cannot end in a draw, so the first player wins.` }
  );
  add("odd-part-chains",
    { q: String.raw`Show that any $11$ numbers chosen from $1, 2, \ldots, 20$ include two, one of which divides the other.`,
      s: String.raw`Write each number as $2^am$ with $m$ odd. The odd parts are among the $10$ numbers $1, 3, \ldots, 19$, so two of the $11$ share an odd part, and of two numbers $2^am$ and $2^bm$ the smaller divides the larger.` },
    { q: String.raw`Split $\{1, 2, \ldots, 30\}$ into chains by odd part. How many chains are there, and how long is the longest?`,
      s: String.raw`There is one chain for each odd number up to $29$, so $15$ chains. The longest is the chain of powers of $2$: $1, 2, 4, 8, 16$, of length $5$.` }
  );
  add("monovariant",
    { q: String.raw`A list of integers is rearranged by repeatedly swapping two neighbours that are out of order (the left one larger). Show that this must stop, and describe the final list.`,
      s: String.raw`Count the pairs of positions $i \lt j$ whose entries are out of order. A swap of out-of-order neighbours fixes that pair and changes no other, so the count drops by exactly $1$. It cannot drop forever, so the process stops, and it stops only when no neighbours are out of order: the list is sorted.` },
    { q: String.raw`Positive integers are on a board. A move takes two numbers $a \gt b$ and replaces $a$ by $a - b$. Show that the moves stop, and find the final numbers when the board starts with $12$ and $18$.`,
      s: String.raw`The total is a positive integer that drops by $b \ge 1$ each move, so the moves stop, and they stop when all numbers are equal. The gcd never changes, since $\gcd(a - b, b) = \gcd(a, b)$, so $12, 18$ ends at $6, 6$: $(12, 18) \to (12, 6) \to (6, 6)$.` }
  );
  add("probabilistic-method",
    { q: String.raw`Every two of $n$ people are either friends or strangers. Show that the relations can be chosen so that at most $\tfrac14\binom n3$ trios are all friends or all strangers.`,
      s: String.raw`Decide each pair at random, friends or strangers with probability $\tfrac12$. A given trio is all one kind with probability $\tfrac28 = \tfrac14$, so the expected number of such triangles is $\tfrac14\binom n3$. Some coloring does no worse than the average.` },
    { q: String.raw`Show that every graph with $m$ edges has a bipartite subgraph with at least $\tfrac m2$ edges.`,
      s: String.raw`Put each vertex into one of two parts at random. An edge crosses between the parts with probability $\tfrac12$, so on average $\tfrac m2$ edges cross. Some split has at least that many crossing edges, and those edges form a bipartite subgraph.` }
  );
  add("transfer-matrix-method",
    { q: String.raw`How many strings of $5$ letters from $\{A, B\}$ have no three equal letters in a row?`,
      s: String.raw`Track the length of the final run: $x_n$ strings end in a run of $1$ and $y_n$ in a run of $2$. Then $x_{n+1} = x_n + y_n$ (switch letters) and $y_{n+1} = x_n$ (repeat once), the matrix $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$. From $(x_1, y_1) = (2, 0)$: $(2, 2)$, $(4, 2)$, $(6, 4)$, $(10, 6)$, so $16$ strings.` }
  );
  add("proving-uniqueness",
    { q: String.raw`Prove that $x^3 + x = 10$ has exactly one real solution.`,
      s: String.raw`Existence: $x = 2$ works. Uniqueness: $x^3 + x$ is strictly increasing, since both terms are, so it takes the value $10$ at most once.` },
    { q: String.raw`An operation $*$ on a set has an identity $e$, with $e * a = a * e = a$ for every $a$. Prove that it has only one identity.`,
      s: String.raw`If $e'$ is another identity, then $e * e'$ equals $e'$ because $e$ is an identity, and equals $e$ because $e'$ is one. So $e = e'$.` }
  );
  add("forward-backward-induction",
    { q: String.raw`Assuming the two-term mean inequality $\tfrac{a + b}2 \ge \sqrt{ab}$, prove the four-term one.`,
      s: String.raw`Apply it twice: $\tfrac{a + b + c + d}4 = \tfrac12\left(\tfrac{a + b}2 + \tfrac{c + d}2\right) \ge \tfrac12\left(\sqrt{ab} + \sqrt{cd}\right) \ge \sqrt{\sqrt{ab}\sqrt{cd}} = \sqrt[4]{abcd}$. This is the forward step $P(2) \Rightarrow P(4)$.` },
    { q: String.raw`Deduce the three-term mean inequality from the four-term one.`,
      s: String.raw`Take the fourth number to be the mean $m = \tfrac{a + b + c}3$. The four-term case gives $\tfrac{a + b + c + m}4 = m \ge \sqrt[4]{abcm}$, so $m^4 \ge abcm$ and $m^3 \ge abc$. This is the backward step $P(4) \Rightarrow P(3)$.` }
  );
  add("strengthening-the-hypothesis",
    { q: String.raw`Prove that $1 + \tfrac1{\sqrt2} + \cdots + \tfrac1{\sqrt n} \lt 2\sqrt n$ by proving something stronger.`,
      s: String.raw`Prove $\sum_{k \le n}\tfrac1{\sqrt k} \le 2\sqrt n - 1$. For $n = 1$ both sides are $1$. The step needs $\tfrac1{\sqrt{n + 1}} \le 2\left(\sqrt{n + 1} - \sqrt n\right) = \tfrac2{\sqrt{n + 1} + \sqrt n}$, which holds since $\sqrt n \le \sqrt{n + 1}$. The plain bound $2\sqrt n$ would not carry through the step on its own.` },
    { q: String.raw`Prove that $\tfrac{1\cdot3\cdot5\cdots(2n - 1)}{2\cdot4\cdot6\cdots2n} \le \tfrac1{\sqrt{2n}}$ by proving the stronger bound $\tfrac1{\sqrt{3n + 1}}$.`,
      s: String.raw`At $n = 1$ the product is $\tfrac12 = \tfrac1{\sqrt4}$. Multiplying by the next factor $\tfrac{2n + 1}{2n + 2}$, the step needs $\tfrac{(2n + 1)^2}{(2n + 2)^2} \le \tfrac{3n + 1}{3n + 4}$, that is $12n^3 + 28n^2 + 19n + 4 \le 12n^3 + 28n^2 + 20n + 4$, true. Then $\tfrac1{\sqrt{3n + 1}} \le \tfrac1{\sqrt{2n}}$.` }
  );
  add("discrete-intermediate-value",
    { q: String.raw`A walk on the integers moves $\pm1$ at each step and goes from $0$ to $10$. Must it visit $7$?`,
      s: String.raw`Yes. Its position changes by $1$ at a time, so it cannot jump over any integer between where it starts and where it ends.` },
    { q: String.raw`A basketball player's season free-throw percentage starts below $80\%$ and ends above it. Prove that it was exactly $80\%$ at some moment.`,
      s: String.raw`Look at the first shot that takes the percentage from below $80\%$ to at least $80\%$; it must be a make. With $m$ makes in $n$ attempts before it, the integers satisfy $5m \lt 4n$, so $5m \le 4n - 1$, and $5(m + 1) \ge 4(n + 1)$, so $5m \ge 4n - 1$. Hence $5m = 4n - 1$, and after the shot $5(m + 1) = 4(n + 1)$: the percentage is exactly $80\%$.` }
  );
  add("ellipse-tangent-line",
    { q: String.raw`With $F_1 = (1, 2)$ and $F_2 = (5, 1)$, find the least value of $PF_1 + PF_2$ for $P$ on the $x$-axis, and the point where it is reached.`,
      s: String.raw`Reflect $F_1$ in the axis to $F_1' = (1, -2)$. Then $PF_1 + PF_2 = PF_1' + PF_2 \ge F_1'F_2 = \sqrt{16 + 9} = 5$, with equality where the segment $F_1'F_2$ crosses the axis: $y = -2 + \tfrac34(x - 1) = 0$ at $P = \left(\tfrac{11}3, 0\right)$. The ellipse with these foci and major axis $5$ touches the axis there.` }
  );
  add("angle-bisector-circumcircle",
    { q: String.raw`A triangle has a $60^\circ$ angle at $A$, opposite a side of length $6$. Its bisector from $A$, extended, meets the circumcircle at $D$. How far is $D$ from $B$, and from the incenter $I$?`,
      s: String.raw`$ABDC$ is cyclic, so $\angle BDC = 180^\circ - 60^\circ = 120^\circ$, and $DB = DC$. The isosceles triangle $BDC$ with apex $120^\circ$ and base $6$ has legs $\tfrac{6}{2\sin60^\circ} = 2\sqrt3$. So $DB = 2\sqrt3$, and $DI = DB = 2\sqrt3$ as well.` }
  );
  add("repeated-block-equation",
    { q: String.raw`Solve $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$.`,
      s: String.raw`With $u = x^2 + x$ it is $u^2 - 8u + 12 = 0$, so $u = 2$ or $u = 6$. Then $x^2 + x = 2$ gives $x = 1, -2$, and $x^2 + x = 6$ gives $x = 2, -3$.` },
    { q: String.raw`Solve $4^x - 6\cdot2^x + 8 = 0$.`,
      s: String.raw`The block is $u = 2^x$, with $4^x = u^2$: $u^2 - 6u + 8 = 0$ gives $u = 2$ or $4$, so $x = 1$ or $x = 2$.` }
  );
  add("drawing-without-replacement",
    { q: String.raw`A shuffled deck of $52$ cards is dealt one card at a time. What is the probability that the fifth card dealt is a heart?`,
      s: String.raw`By symmetry every position is equally likely to hold any given card, so the fifth card is a heart with probability $\tfrac{13}{52} = \tfrac14$, the same as the first.` },
    { q: String.raw`Two marbles are taken one after the other, not put back, from $5$ red and $3$ blue. Find the chance that both are red.`,
      s: String.raw`Multiply the shrinking fractions: $\tfrac58\cdot\tfrac47 = \tfrac{20}{56} = \tfrac5{14}$, which is also $\binom52\big/\binom82 = \tfrac{10}{28}$.` }
  );
  add("subset-avoiding-relation",
    { q: String.raw`What is the largest subset of $\{1, 2, \ldots, 15\}$ with no two elements differing by $3$?`,
      s: String.raw`The difference $3$ splits the set into three chains, $1, 4, 7, 10, 13$ and $2, 5, \ldots, 14$ and $3, 6, \ldots, 15$, each of length $5$. Within a chain no two neighbours may both be chosen, so at most $3$ per chain, $9$ in all, reached by the first, third and fifth of each chain.` },
    { q: String.raw`What is the largest subset of $\{1, 2, \ldots, 20\}$ in which no element is twice another?`,
      s: String.raw`Doubling links the chains $m, 2m, 4m, \ldots$ for odd $m$: $\{1, 2, 4, 8, 16\}$ allows $3$, $\{3, 6, 12\}$ and $\{5, 10, 20\}$ allow $2$ each, $\{7, 14\}$ and $\{9, 18\}$ allow $1$ each, and the five single chains $11, 13, 15, 17, 19$ allow $1$ each. The largest subset has $3 + 2 + 2 + 1 + 1 + 5 = 14$ elements.` }
  );
  add("harmonic-quadrilateral",
    { q: String.raw`The tangents to a circle at $B$ and $C$ meet at $X$, and the line through $X$ and a point $A$ of the circle meets it again at $D$. Prove that $AB\cdot CD = AC\cdot BD$.`,
      s: String.raw`The tangent-chord angle gives $\angle XBD = \angle XAB$, and the triangles $XBD$ and $XAB$ share the angle at $X$, so they are similar and $\tfrac{BD}{AB} = \tfrac{XB}{XA}$. In the same way $\tfrac{CD}{AC} = \tfrac{XC}{XA}$. The tangents are equal, $XB = XC$, so $\tfrac{BD}{AB} = \tfrac{CD}{AC}$, which is the claim.` }
  );
  add("integer-valued-polynomials",
    { q: String.raw`Show that $\tfrac{x(x - 1)}2$ takes integer values at every integer, although its coefficients are not integers.`,
      s: String.raw`It is $\binom x2$, a binomial basis polynomial with coefficient $1$. At a nonnegative integer it counts pairs, and at a negative integer $-m$ it is $\tfrac{m(m + 1)}2$, also an integer.` },
    { q: String.raw`Write $P(x) = 1^2 + 2^2 + \cdots + x^2 = \tfrac{x(x + 1)(2x + 1)}6$ in the binomial basis.`,
      s: String.raw`Take differences of $P(0), P(1), P(2), P(3) = 0, 1, 5, 14$: first differences $1, 4, 9$, second $3, 5$, third $2$. So $P(x) = \binom x1 + 3\binom x2 + 2\binom x3$, with integer coefficients as the theorem says. Check at $x = 3$: $3 + 9 + 2 = 14$.` }
  );
  add("cohn-irreducibility",
    { q: String.raw`Show that $x^4 + x^2 + 3x + 3$ is irreducible over the integers.`,
      s: String.raw`Its coefficients are the digits of $10133$, which is prime (no prime up to $100$ divides it). Cohn's criterion then says the polynomial cannot be factored.` },
    { q: String.raw`The digits of $10201$ give $x^4 + 2x^2 + 1$. Does Cohn's criterion say anything here?`,
      s: String.raw`No: $10201 = 101^2$ is not prime, and the criterion only runs one way. Here the polynomial does factor, as $(x^2 + 1)^2$, matching $10201 = 101\cdot101$.` }
  );
  add("gauss-lucas",
    { q: String.raw`A cubic has a simple root at $1$ and a double root at $3$. Where are the zeros of its derivative, and how do they sit relative to its roots?`,
      s: String.raw`With $P(z) = (z - 1)(z - 3)^2$, $P'(z) = (z - 3)^2 + 2(z - 1)(z - 3) = (z - 3)(3z - 5)$, with roots $3$ and $\tfrac53$. The roots of $P$ are $1$ and $3$, whose hull is the segment $[1, 3]$, and both lie on it.` },
    { q: String.raw`Use Gauss–Lucas to show that if all roots of a polynomial are real, so are all roots of its derivative.`,
      s: String.raw`The convex hull of real numbers is an interval of the real line, and the roots of $P'$ lie in that hull. So they are real.` }
  );
  add("mason-stothers",
    { q: String.raw`Check Mason–Stothers on $t^2 + (2t + 1) = (t + 1)^2$.`,
      s: String.raw`The three are coprime, and $abc = t^2(2t + 1)(t + 1)^2$ has the distinct roots $0$, $-\tfrac12$, $-1$, so $n_0 = 3$. The largest degree is $2 \le 3 - 1$, with equality: the bound is sharp.` }
  );
  add("brahmagupta-fibonacci",
    { q: String.raw`Since $5$ and $17$ are each a sum of two squares, so is their product $85$. Produce two different representations from the identity.`,
      s: String.raw`With $5 = 1^2 + 2^2$ and $17 = 1^2 + 4^2$: $(1\cdot1 - 2\cdot4)^2 + (1\cdot4 + 2\cdot1)^2 = 49 + 36$, and switching a sign, $(1\cdot1 + 2\cdot4)^2 + (1\cdot4 - 2\cdot1)^2 = 81 + 4$. So $85 = 7^2 + 6^2 = 9^2 + 2^2$.` }
  );
  add("lagranges-identity",
    { q: String.raw`Use Lagrange's Identity to prove the Cauchy–Schwarz inequality and find its equality case.`,
      s: String.raw`The right side is a sum of squares, so $\left(\sum a_i^2\right)\left(\sum b_i^2\right) \ge \left(\sum a_ib_i\right)^2$. Equality needs every $a_ib_j = a_jb_i$, that is, the vectors $a$ and $b$ proportional.` },
    { q: String.raw`Check the two-term case $(a^2 + b^2)(c^2 + d^2) - (ac + bd)^2 = (ad - bc)^2$ at $a, b, c, d = 1, 2, 3, 4$.`,
      s: String.raw`The left side is $5\cdot25 - 11^2 = 4$ and the right side is $(4 - 6)^2 = 4$.` }
  );
  add("abel-summation",
    { q: String.raw`With $H_k = 1 + \tfrac12 + \cdots + \tfrac1k$, find $H_1 + H_2 + \cdots + H_n$ by summation by parts.`,
      s: String.raw`Take $a_k = 1$, so $A_k = k$, and $b_k = H_k$. Then $\sum H_k = nH_n - \sum_{k=1}^{n-1}k\cdot\tfrac1{k + 1} = nH_n - (n - H_n) = (n + 1)H_n - n$. Check $n = 2$: $1 + \tfrac32 = \tfrac52 = 3\cdot\tfrac32 - 2$.` },
    { q: String.raw`Prove Abel's inequality: if $b_1 \ge b_2 \ge \cdots \ge b_n \ge 0$ and every partial sum satisfies $|A_k| \le M$, then $\left|\sum a_kb_k\right| \le Mb_1$.`,
      s: String.raw`Summation by parts gives $\sum a_kb_k = A_nb_n + \sum_{k=1}^{n-1}A_k(b_k - b_{k+1})$, where every weight $b_n$ and $b_k - b_{k+1}$ is nonnegative. So the absolute value is at most $M\left(b_n + \sum(b_k - b_{k+1})\right) = Mb_1$.` }
  );
  add("vornicu-schur",
    { q: String.raw`Show that Schur's inequality with $t = 1$ is the case $a = x$, $b = y$, $c = z$ of Vornicu–Schur.`,
      s: String.raw`With $x \ge y \ge z \ge 0$ the weights satisfy $a = x \ge y = b$, so the theorem applies, and the left side becomes $x(x - y)(x - z) + y(y - x)(y - z) + z(z - x)(z - y)$, Schur's expression.` },
    { q: String.raw`What does Vornicu–Schur give with $a = b = c = 1$?`,
      s: String.raw`$(x - y)(x - z) + (y - x)(y - z) + (z - x)(z - y) \ge 0$. Expanding, the left side is $x^2 + y^2 + z^2 - xy - yz - zx$, so this is the familiar $x^2 + y^2 + z^2 \ge xy + yz + zx$.` }
  );
  add("maclaurin-inequality",
    { q: String.raw`Nonnegative reals satisfy $a + b + c = 6$. Use Maclaurin's inequalities to bound $ab + bc + ca$ and $abc$.`,
      s: String.raw`Here $p_1 = 2$. From $p_1 \ge \sqrt{p_2}$, $p_2 = \tfrac{ab + bc + ca}3 \le 4$, so $ab + bc + ca \le 12$. From $p_1 \ge \sqrt[3]{p_3}$, $abc \le 8$. Both are reached at $a = b = c = 2$.` },
    { q: String.raw`Check Newton's inequality $p_2^2 \ge p_1p_3$ for the numbers $1, 2, 3$.`,
      s: String.raw`$e_1 = 6$, $e_2 = 11$, $e_3 = 6$, so $p_1 = 2$, $p_2 = \tfrac{11}3$, $p_3 = 6$. Then $p_2^2 = \tfrac{121}9 \approx 13.4 \ge 12 = p_1p_3$.` }
  );
  add("chebyshev-sum-inequality",
    { q: String.raw`Use Chebyshev's inequality to prove $(a + b + c)\left(\tfrac1a + \tfrac1b + \tfrac1c\right) \ge 9$ for positive reals.`,
      s: String.raw`Sort $a \le b \le c$; then $\tfrac1a \ge \tfrac1b \ge \tfrac1c$ is in the opposite order, so $3\sum a\cdot\tfrac1a \le \left(\sum a\right)\left(\sum\tfrac1a\right)$. The left side is $3\cdot3 = 9$.` },
    { q: String.raw`Prove $3(a^2 + b^2 + c^2) \ge (a + b + c)^2$ with Chebyshev's inequality.`,
      s: String.raw`Take both sequences to be $a, b, c$ in increasing order, which are similarly ordered: $3(a\cdot a + b\cdot b + c\cdot c) \ge (a + b + c)(a + b + c)$.` }
  );
  add("minkowski-inequality",
    { q: String.raw`Real numbers satisfy $a + b + c = 8$. Find the least value of $\sqrt{a^2 + 1} + \sqrt{b^2 + 4} + \sqrt{c^2 + 9}$.`,
      s: String.raw`These are the lengths of the vectors $(a, 1)$, $(b, 2)$, $(c, 3)$, and their sum is $(8, 6)$. Minkowski gives at least $\sqrt{64 + 36} = 10$, with equality when the vectors point the same way: $a : b : c = 1 : 2 : 3$, so $a = \tfrac43$, $b = \tfrac83$, $c = 4$.` },
    { q: String.raw`Real numbers satisfy $a + b = 6$. Find the least value of $\sqrt{a^2 + 1} + \sqrt{b^2 + 1}$.`,
      s: String.raw`With the vectors $(a, 1)$ and $(b, 1)$, whose sum is $(6, 2)$, the value is at least $\sqrt{36 + 4} = 2\sqrt{10}$, reached at $a = b = 3$.` }
  );
  add("karamata-inequality",
    { q: String.raw`Use majorization to show $5^4 + 1^4 \ge 3^4 + 3^4$.`,
      s: String.raw`$(5, 1)$ majorizes $(3, 3)$: $5 \ge 3$ and the totals agree. Since $x^4$ is convex, Karamata gives the inequality: $626 \ge 162$.` },
    { q: String.raw`Nonnegative reals satisfy $x + y + z = 6$. Find the largest value of $x^3 + y^3 + z^3$.`,
      s: String.raw`Every such triple, sorted, is majorized by $(6, 0, 0)$: its largest term is at most $6$, its two largest add to at most $6$, and the totals agree. With $f(t) = t^3$ convex on $t \ge 0$, Karamata gives $x^3 + y^3 + z^3 \le 216$, reached at $(6, 0, 0)$.` }
  );
  add("cosecant-cotangent-square-sums",
    { q: String.raw`Check the cosecant formula for $n = 6$ with known values.`,
      s: String.raw`The angles are $30^\circ, 60^\circ, 90^\circ, 120^\circ, 150^\circ$, with $\csc^2$ values $4, \tfrac43, 1, \tfrac43, 4$, adding to $\tfrac{35}3 = \tfrac{36 - 1}3$.` },
    { q: String.raw`Find $\displaystyle\sum_{k=1}^{6}\cot^2\frac{k\pi}7$.`,
      s: String.raw`With $n = 7$, the formula gives $\tfrac{6\cdot5}3 = 10$.` }
  );
  add("trig-telescoping-product",
    { q: String.raw`Compute $\cos\tfrac\pi7\cos\tfrac{2\pi}7\cos\tfrac{4\pi}7$.`,
      s: String.raw`With $\theta = \tfrac\pi7$ and $n = 3$, the product is $\tfrac{\sin(8\pi/7)}{8\sin(\pi/7)}$, and $\sin\tfrac{8\pi}7 = -\sin\tfrac\pi7$, so it equals $-\tfrac18$.` },
    { q: String.raw`Compute $\cos20^\circ\cos40^\circ\cos80^\circ$.`,
      s: String.raw`It is $\tfrac{\sin160^\circ}{8\sin20^\circ} = \tfrac18$, since $\sin160^\circ = \sin20^\circ$.` }
  );
  add("evenly-spaced-angle-products",
    { q: String.raw`Compute $\sin20^\circ\sin40^\circ\sin80^\circ$.`,
      s: String.raw`With $\theta = 20^\circ$, the triple is $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \tfrac14\sin60^\circ = \tfrac{\sqrt3}8$.` },
    { q: String.raw`Check $\prod_{k=1}^{n-1}\sin\tfrac{k\pi}n = \tfrac n{2^{n-1}}$ for $n = 6$.`,
      s: String.raw`$\sin30^\circ\sin60^\circ\sin90^\circ\sin120^\circ\sin150^\circ = \tfrac12\cdot\tfrac{\sqrt3}2\cdot1\cdot\tfrac{\sqrt3}2\cdot\tfrac12 = \tfrac3{16}$, and $\tfrac6{32} = \tfrac3{16}$.` }
  );
  add("cot-tan-telescoping",
    { q: String.raw`Show that $\tan20^\circ + 2\tan40^\circ + 4\cot80^\circ = \cot20^\circ$.`,
      s: String.raw`The sum formula with $\theta = 20^\circ$ and $n = 2$ gives $\tan20^\circ + 2\tan40^\circ = \cot20^\circ - 4\cot80^\circ$. Move the last term across.` },
    { q: String.raw`Check $\tan\theta = \cot\theta - 2\cot2\theta$ at $\theta = 22.5^\circ$.`,
      s: String.raw`$\tan22.5^\circ = \sqrt2 - 1$, $\cot22.5^\circ = \sqrt2 + 1$ and $\cot45^\circ = 1$, so the right side is $\sqrt2 + 1 - 2 = \sqrt2 - 1$.` }
  );
  add("hermite-identity",
    { q: String.raw`Compute $\displaystyle\sum_{k=0}^{99}\left\lfloor0.4567 + \tfrac k{100}\right\rfloor$.`,
      s: String.raw`By Hermite's Identity with $n = 100$, it is $\lfloor45.67\rfloor = 45$: the terms are $0$ until $k + 45.67 \ge 100$, that is from $k = 55$ on, giving $45$ ones.` },
    { q: String.raw`Check the case $n = 2$, $\lfloor x\rfloor + \left\lfloor x + \tfrac12\right\rfloor = \lfloor2x\rfloor$, at $x = 2.7$ and $x = 2.3$.`,
      s: String.raw`At $2.7$: $2 + 3 = 5 = \lfloor5.4\rfloor$. At $2.3$: $2 + 2 = 4 = \lfloor4.6\rfloor$.` }
  );
  add("ramanujan-nested-radical",
    { q: String.raw`Check the first layers of Ramanujan's $3 = \sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + 4\sqrt{\cdots}}}}$.`,
      s: String.raw`Each layer is $n = \sqrt{1 + (n - 1)(n + 1)}$: $3 = \sqrt{1 + 2\cdot4}$, $4 = \sqrt{1 + 3\cdot5}$, $5 = \sqrt{1 + 4\cdot6}$, and so on. Substituting each into the one before builds the nest.` }
  );
  add("weighted-binomial-sums",
    { q: String.raw`Evaluate $\sum_{k=0}^{5}k^2\binom5k$.`,
      s: String.raw`The formula gives $5\cdot6\cdot2^3 = 240$. Directly: $0 + 5 + 40 + 90 + 80 + 25 = 240$.` },
    { q: String.raw`A fair coin is flipped $10$ times and $X$ is the number of heads. Find $E[X^2]$.`,
      s: String.raw`$E[X^2] = \tfrac1{2^{10}}\sum k^2\binom{10}k = \tfrac{10\cdot11\cdot2^8}{2^{10}} = \tfrac{110}4 = 27.5$. (So the variance is $27.5 - 25 = 2.5$.)` }
  );
  add("exponential-generating-functions",
    { q: String.raw`The sequence $1, 1, 1, \ldots$ has EGF $e^x$. What sequence has EGF $e^{2x} = e^x\cdot e^x$, and what does the product rule say it counts?`,
      s: String.raw`$e^{2x} = \sum 2^n\tfrac{x^n}{n!}$, so the sequence is $2^n$. The product rule gives $c_n = \sum_k\binom nk\cdot1\cdot1$: split $n$ labeled objects into two labeled groups, which is $2^n$.` },
    { q: String.raw`Use EGFs to count the words of length $n \ge 1$ over $\{a, b\}$ with an even number of $a$'s.`,
      s: String.raw`The $a$'s contribute $\cosh x = \tfrac{e^x + e^{-x}}2$ (even sizes only) and the $b$'s contribute $e^x$, so the EGF is $\tfrac{e^{2x} + 1}2$. For $n \ge 1$ the coefficient of $\tfrac{x^n}{n!}$ is $\tfrac{2^n}2 = 2^{n-1}$.` }
  );
  add("necklace-formula",
    { q: String.raw`How many necklaces of $6$ beads in $2$ colors are there, up to rotation?`,
      s: String.raw`The divisors of $6$ give $\tfrac16\left(\varphi(1)2^6 + \varphi(2)2^3 + \varphi(3)2^2 + \varphi(6)2^1\right) = \tfrac{64 + 8 + 8 + 4}6 = 14$.` },
    { q: String.raw`How many necklaces of $5$ beads in $3$ colors are there, up to rotation, and why is the prime length easy?`,
      s: String.raw`With $n = 5$ prime only $d = 1$ and $d = 5$ appear: $\tfrac15\left(3^5 + 4\cdot3\right) = \tfrac{255}5 = 51$. Directly: the $3$ one-color strings are fixed by every rotation, and the other $240$ fall into orbits of exactly $5$, giving $3 + 48$.` }
  );
  add("pentagonal-number-theorem",
    { q: String.raw`Use the pentagonal recurrence to find $p(6)$ from $p(5) = 7$, $p(4) = 5$ and $p(1) = 1$.`,
      s: String.raw`The recurrence is $p(n) = p(n - 1) + p(n - 2) - p(n - 5) - p(n - 7) + \cdots$, with $p$ of a negative number equal to $0$. So $p(6) = 7 + 5 - 1 - 0 = 11$.` },
    { q: String.raw`Multiply out $(1 - x)(1 - x^2)\cdots(1 - x^8)$ up to $x^8$ and compare with the theorem.`,
      s: String.raw`The coefficients of $1, x, \ldots, x^8$ come out as $1, -1, -1, 0, 0, 1, 0, 1, 0$: the series $1 - x - x^2 + x^5 + x^7 - \cdots$, nonzero only at the pentagonal numbers $0, 1, 2, 5, 7$ (the next ones are $12$ and $15$).` }
  );
  add("polya-enumeration",
    { q: String.raw`The vertices of a square are colored with $3$ colors. How many colorings are there up to rotation?`,
      s: String.raw`The rotations by $0^\circ, 90^\circ, 180^\circ, 270^\circ$ have $4, 1, 2, 1$ cycles on the vertices, so the count is $\tfrac{3^4 + 3 + 3^2 + 3}4 = \tfrac{96}4 = 24$.` },
    { q: String.raw`With reflections allowed as well, how many $3$-colorings of the square's vertices are there?`,
      s: String.raw`The four reflections add two through opposite vertices, with $3$ cycles each, and two through opposite edge midpoints, with $2$ cycles each. The count is $\tfrac{96 + 27 + 27 + 9 + 9}8 = \tfrac{168}8 = 21$.` }
  );
  add("erdos-ko-rado",
    { q: String.raw`What is the largest family of $2$-element subsets of $\{1, \ldots, 6\}$ in which every two members share an element?`,
      s: String.raw`With $n = 6 \ge 2k = 4$, the bound is $\binom51 = 5$, reached by the star of all pairs containing $1$. The triangle $\{1, 2\}, \{1, 3\}, \{2, 3\}$ is intersecting too, but has only $3$ members.` },
    { q: String.raw`For $3$-element subsets of a $6$-element set, show that the Erdős–Ko–Rado bound is exactly half of all the subsets, and that many families reach it.`,
      s: String.raw`The bound is $\binom52 = 10$, half of $\binom63 = 20$. Here $n = 2k$, so the subsets fall into $10$ complementary pairs, and two complements never meet. Any choice of one set from each pair that stays intersecting reaches the bound; the star is one, but not the only one.` }
  );
  add("product-of-uniforms",
    { q: String.raw`For $x$ and $y$ independent and uniform on the unit interval, find the chance that $xy$ does not exceed one half.`,
      s: String.raw`$P(XY \le c) = c - c\ln c$ with $c = \tfrac12$ gives $\tfrac12 + \tfrac12\ln2 \approx 0.847$.` },
    { q: String.raw`For the same two numbers, what is the probability that the product is at least $\tfrac14$?`,
      s: String.raw`It is $1 - \left(\tfrac14 - \tfrac14\ln\tfrac14\right) = \tfrac34 - \tfrac{\ln4}4 = \tfrac34 - \tfrac{\ln2}2 \approx 0.403$.` }
  );
  add("variance-independence",
    { q: String.raw`Find the variance of a fair die roll $X$, and of $2X + 3$.`,
      s: String.raw`$E[X] = \tfrac72$ and $E[X^2] = \tfrac{91}6$, so $\operatorname{Var}(X) = \tfrac{91}6 - \tfrac{49}4 = \tfrac{35}{12}$. Shifting adds nothing and scaling by $2$ multiplies by $4$: $\operatorname{Var}(2X + 3) = \tfrac{35}3$.` },
    { q: String.raw`Find the variance of the number of heads in $10$ independent fair coin flips.`,
      s: String.raw`Each flip has variance $\tfrac12 - \tfrac14 = \tfrac14$, and for independent flips variances add, so the variance is $\tfrac{10}4 = 2.5$.` }
  );
  add("schurs-theorem",
    { q: String.raw`What length does the bound $\lfloor e\cdot k!\rfloor$ give for $3$ colors, and how does it compare with the truth?`,
      s: String.raw`$\lfloor6e\rfloor = \lfloor16.31\rfloor = 16$, so every $3$-coloring of $1, \ldots, 16$ has a one-color solution of $x + y = z$. The truth is smaller: $13$ numbers can be $3$-colored without one, but $14$ cannot.` }
  );
  add("cayleys-formula",
    { q: String.raw`Check Cayley's formula for $4$ labeled vertices by counting paths and stars.`,
      s: String.raw`A tree on $4$ vertices is a path or a star. Paths: $\tfrac{4!}2 = 12$ (orderings up to reversal). Stars: $4$ (choice of center). Total $16 = 4^2$.` },
    { q: String.raw`Among the $125$ labeled trees on the vertices $1$ to $5$, how many give vertex $1$ a single neighbour?`,
      s: String.raw`In the Prüfer code a vertex appears $(\text{degree} - 1)$ times, so leaves are the vertices that do not appear. Codes of length $3$ avoiding $1$ number $4^3 = 64$, out of $5^3 = 125$ trees.` }
  );
  add("matrix-tree-theorem",
    { q: String.raw`The $4$-cycle has $4$ spanning trees, one for each edge left out. Confirm this with a cofactor of its Laplacian.`,
      s: String.raw`Every vertex has degree $2$. Deleting the first row and column of $L = D - A$ leaves $\begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix}$ (vertices in cyclic order), with determinant $2\cdot3 - (-1)(-2) = 4$. Indeed, removing any one of the $4$ edges leaves a spanning path.` }
  );
  add("lgv-lemma",
    { q: String.raw`With unit right and up steps, count the pairs of non-intersecting paths $(0, 0) \to (1, 2)$ and $(1, 0) \to (2, 2)$.`,
      s: String.raw`The path counts are $M_{11} = \binom31 = 3$, $M_{12} = \binom42 = 6$ (to $(2, 2)$), $M_{21} = 1$ (from $(1, 0)$ to $(1, 2)$) and $M_{22} = \binom31 = 3$. The determinant is $3\cdot3 - 6\cdot1 = 3$, which a direct check confirms.` }
  );
  add("parallel-sided-hexagon",
    { q: String.raw`Check the formula on a regular hexagon of side $1$.`,
      s: String.raw`Extending alternate sides of a regular hexagon of side $1$ gives an equilateral triangle of side $3$: each side of the triangle is one hexagon side plus two corner triangles' sides. Then $\tfrac13 + \tfrac13 + \tfrac13 = 1 = \tfrac1s$.` },
    { q: String.raw`Three lines carrying alternate sides of a hexagon (all sides equal, opposite sides parallel) bound a $4$-$6$-$6$ triangle. How long is each side of the hexagon?`,
      s: String.raw`$\tfrac1s = \tfrac14 + \tfrac16 + \tfrac16 = \tfrac7{12}$, so $s = \tfrac{12}7$.` }
  );
  add("ngon-vertex-distance-product",
    { q: String.raw`A square is inscribed in a circle of radius $1$, and $P$ is the midpoint of one of the arcs between two vertices. Find the product of the distances from $P$ to the four vertices.`,
      s: String.raw`Here $\theta = 45^\circ$, so the product is $2\cdot1^4\cdot\left|\sin\tfrac{4\cdot45^\circ}2\right| = 2$. Directly: the distances are $2\sin22.5^\circ$ twice and $2\sin67.5^\circ$ twice, and $16\sin^222.5^\circ\cos^222.5^\circ = 4\sin^245^\circ = 2$.` },
    { q: String.raw`For a regular hexagon inscribed in a circle of radius $2$, where on the circle is the product of distances to the vertices largest, and what is it?`,
      s: String.raw`The product is $2\cdot2^6\left|\sin3\theta\right|$, largest when $\left|\sin3\theta\right| = 1$, that is $\theta = 30^\circ$: at the midpoints of the arcs between vertices. The maximum is $128$.` }
  );
  add("van-aubel",
    { q: String.raw`Check Van Aubel's Theorem on a square of side $2$.`,
      s: String.raw`The outward squares on the sides of a square have centers $1$ unit outside the midpoints of its sides. Opposite centers are $2 + 1 + 1 = 4$ apart, along the two perpendicular axes of the square, so the two segments are equal and perpendicular.` }
  );
  add("bretschneiders-formula",
    { q: String.raw`Show that Bretschneider's Formula becomes Brahmagupta's for a cyclic quadrilateral, and that the cyclic one has the largest area among quadrilaterals with the same sides.`,
      s: String.raw`Opposite angles of a cyclic quadrilateral add to $180^\circ$, so $\cos^2\tfrac{A + C}2 = \cos^290^\circ = 0$ and the formula is $\sqrt{(s - a)(s - b)(s - c)(s - d)}$. For fixed sides the subtracted term $abcd\cos^2\tfrac{A + C}2$ is never negative, so the area is largest exactly when it vanishes.` }
  );
  add("euler-quadrilateral",
    { q: String.raw`A parallelogram has sides $3$ and $5$ and one diagonal $6$. Find the other diagonal.`,
      s: String.raw`The diagonals of a parallelogram bisect each other, so $m = 0$ and $p^2 + q^2 = 2(9 + 25) = 68$. The other diagonal is $\sqrt{68 - 36} = \sqrt{32} = 4\sqrt2$.` },
    { q: String.raw`The quadrilateral $(0, 0)$, $(4, 0)$, $(5, 3)$, $(0, 2)$ is not a parallelogram. Check Euler's theorem on it and find how far apart the midpoints of its diagonals are.`,
      s: String.raw`The sides squared are $16$, $10$, $26$, $4$, adding to $56$, and the diagonals squared are $34$ and $20$. So $4m^2 = 56 - 54 = 2$ and $m = \tfrac{\sqrt2}2$. Directly, the midpoints are $\left(\tfrac52, \tfrac32\right)$ and $(2, 1)$, at distance $\sqrt{\tfrac14 + \tfrac14}$.` }
  );
  add("trig-area-circumradius",
    { q: String.raw`Find the area of an equilateral triangle with circumradius $2$, and check it.`,
      s: String.raw`$2\cdot4\cdot\left(\tfrac{\sqrt3}2\right)^3 = 3\sqrt3$. Check: the side is $2\sqrt3$, and $\tfrac{\sqrt3}4\cdot12 = 3\sqrt3$.` },
    { q: String.raw`A right triangle with circumradius $5$ has a $30^\circ$ angle. Find its area.`,
      s: String.raw`$2\cdot25\cdot\sin90^\circ\sin30^\circ\sin60^\circ = 50\cdot\tfrac12\cdot\tfrac{\sqrt3}2 = \tfrac{25\sqrt3}2$. Check: the hypotenuse is the diameter $10$, the legs are $5$ and $5\sqrt3$.` }
  );
  add("erdos-mordell",
    { q: String.raw`Check that the Erdős–Mordell inequality is an equality for the center of an equilateral triangle of side $2$.`,
      s: String.raw`The center is $\tfrac2{\sqrt3}$ from each vertex and $\tfrac1{\sqrt3}$ from each side. So $PA + PB + PC = 2\sqrt3$ and $2(d_a + d_b + d_c) = 2\sqrt3$.` }
  );
  add("law-of-tangents",
    { q: String.raw`A right triangle has its right angle at $C$ and legs $a = 7$, $b = 3$. Find $\tan\tfrac{A - B}2$.`,
      s: String.raw`Here $\tfrac{A + B}2 = 45^\circ$, so the Law of Tangents gives $\tan\tfrac{A - B}2 = \tfrac{7 - 3}{7 + 3}\tan45^\circ = 0.4$. Check: $A = \arctan\tfrac73 \approx 66.80^\circ$ and $B \approx 23.20^\circ$, and $\tan21.80^\circ \approx 0.4$.` }
  );
  add("weitzenbock-inequality",
    { q: String.raw`Check both inequalities on the $3$-$4$-$5$ triangle.`,
      s: String.raw`Here $a^2 + b^2 + c^2 = 50$ and $K = 6$. Weitzenböck: $50 \ge 24\sqrt3 \approx 41.6$. Hadwiger–Finsler adds $(3 - 4)^2 + (4 - 5)^2 + (5 - 3)^2 = 6$: $50 \ge 47.6$, a much closer bound.` },
    { q: String.raw`Show that both inequalities are equalities for an equilateral triangle.`,
      s: String.raw`With side $a$, $a^2 + b^2 + c^2 = 3a^2$ and $4\sqrt3K = 4\sqrt3\cdot\tfrac{\sqrt3}4a^2 = 3a^2$. The extra squared differences in Hadwiger–Finsler are all $0$.` }
  );
  add("humpty-queue-points",
    { q: String.raw`In the isosceles triangle $A(0, 2)$, $B(-1, 0)$, $C(1, 0)$, find the $A$-Humpty point and check $MX\cdot MA = MB^2$.`,
      s: String.raw`The median from $A$ is the altitude $x = 0$, so the orthocenter $H$ lies on it and its foot $X$ on the median is $H$ itself. The altitude from $B$ is perpendicular to $AC$, direction $(1, -2)$, so it is $(-1, 0) + t(2, 1)$, meeting $x = 0$ at $H = \left(0, \tfrac12\right)$. With $M = (0, 0)$, $MX\cdot MA = \tfrac12\cdot2 = 1 = MB^2$.` }
  );
  add("dumpty-point",
    { q: String.raw`In an isosceles triangle with $AB = AC$, where is the $A$-Dumpty point, and why does $DA^2 = DB\cdot DC$ hold there?`,
      s: String.raw`The symmedian from $A$ is the median, which is the axis of symmetry, so it meets the circumcircle again at the point $K$ diametrically opposite $A$. The midpoint of $AK$ is the circumcenter $O$. Then $DA = DB = DC = R$, and $R^2 = R\cdot R$.` }
  );
  add("pedal-triangle",
    { q: String.raw`What is the pedal triangle of the circumcenter, and what fraction of $[ABC]$ is its area?`,
      s: String.raw`The feet of the perpendiculars from $O$ are the midpoints of the sides, so it is the medial triangle. With $OP = 0$ the formula gives $\tfrac{R^2}{4R^2} = \tfrac14$, as expected.` },
    { q: String.raw`A triangle has circumradius $4$. For which distances $OP$ is the pedal triangle of $P$ one eighth of $[ABC]$?`,
      s: String.raw`Solve $\tfrac{|16 - OP^2|}{64} = \tfrac18$: $|16 - OP^2| = 8$, so $OP^2 = 8$ or $24$, that is $OP = 2\sqrt2$ (inside the circumcircle) or $OP = 2\sqrt6$ (outside).` }
  );
  add("isotomic-conjugate",
    { q: String.raw`Find the isotomic conjugate of the centroid.`,
      s: String.raw`The centroid is $(1 : 1 : 1)$, which goes to $\left(\tfrac11 : \tfrac11 : \tfrac11\right)$: itself. Its cevian feet are the midpoints, which reflection over the midpoints leaves in place.` },
    { q: String.raw`Show that the Gergonne and Nagel points are isotomic conjugates.`,
      s: String.raw`The Gergonne point is $\left(\tfrac1{s-a} : \tfrac1{s-b} : \tfrac1{s-c}\right)$, and inverting each coordinate gives $(s - a : s - b : s - c)$, the Nagel point. Geometrically, the incircle and excircle touch points on each side are mirror images across its midpoint.` }
  );
  add("carnots-theorem",
    { q: String.raw`Check Carnot's Theorem on an equilateral triangle of side $2\sqrt3$.`,
      s: String.raw`Here $R = 2$ and $r = 1$, and the circumcenter is the incenter, $1$ from each side. The sum of the distances is $3 = R + r$.` },
    { q: String.raw`Check Carnot's Theorem on the $6$-$8$-$10$ right triangle.`,
      s: String.raw`The circumcenter is the midpoint of the hypotenuse, so its distances are $0$ to the hypotenuse and half the other leg to each leg: $4$ and $3$. The sum is $7$, and $R + r = 5 + 2$.` }
  );
  add("steiner-line",
    { q: String.raw`Prove that the reflections of a point $P$ of the circumcircle in the three sides are collinear and lie on a line through the orthocenter.`,
      s: String.raw`Each reflection is the image of the foot of the perpendicular from $P$ under the homothety at $P$ with ratio $2$. The feet lie on the Simson line, so the reflections lie on its image, a line parallel to it. The Simson line passes through the midpoint of $PH$, and the homothety sends that midpoint to $H$.` }
  );
  add("anti-steiner-point",
    { q: String.raw`In a right triangle the orthocenter is the right-angle vertex $C$, so each leg is a line through $H$. With legs $CA = 3$ and $CB = 4$, which point of the circumcircle is the anti-Steiner point of the leg $CB$?`,
      s: String.raw`Place $C = (0, 0)$, $B = (4, 0)$, $A = (0, 3)$. The leg $CB$ is the $x$-axis, which passes through $H = C$. Its reflection in $BC$ is itself, its reflection in $CA$ (the $y$-axis) is itself, and its reflection in $AB$ passes through $B$, which lies on both lines. So the three reflections meet at $S = B$, a point of the circumcircle.` }
  );
  add("feuerbach-theorem",
    { q: String.raw`For the $3$-$4$-$5$ triangle, find the distance from the nine-point center to the incenter, and check it in coordinates.`,
      s: String.raw`With $R = \tfrac52$ and $r = 1$, $NI = \tfrac54 - 1 = \tfrac14$. Put the right angle at $(0, 0)$ with legs to $(4, 0)$ and $(0, 3)$: $I = (1, 1)$, $O = \left(2, \tfrac32\right)$, $H = (0, 0)$, so $N = \left(1, \tfrac34\right)$, and $NI = \tfrac14$.` }
  );
  add("leibniz-formula",
    { q: String.raw`Find the least value of $PA^2 + PB^2 + PC^2$ for an equilateral triangle of side $3$.`,
      s: String.raw`It is least at $P = G$, where it equals $\tfrac{a^2 + b^2 + c^2}3 = \tfrac{27}3 = 9$: each vertex is $\sqrt3$ from the center.` },
    { q: String.raw`Check the formula at $P = (0, 0)$ for $A = (0, 0)$, $B = (4, 0)$, $C = (2, 6)$.`,
      s: String.raw`Directly, $0 + 16 + 40 = 56$. With $G = (2, 2)$, $3PG^2 = 24$, and the sides squared are $16, 40, 40$, so $\tfrac{96}3 = 32$; again $56$.` }
  );
  add("orthocentric-system",
    { q: String.raw`In an orthocentric system $\{A, B, C, H\}$, prove that the four triangles have equal circumradii.`,
      s: String.raw`The reflection of $H$ in $BC$ lies on the circumcircle of $ABC$, so reflecting that circle in $BC$ gives a circle through $B$, $C$ and $H$: the circumcircle of $HBC$, with the same radius. The same holds for $HCA$ and $HAB$.` }
  );
  add("spieker-point",
    { q: String.raw`Locate the Spieker point of the $3$-$4$-$5$ triangle placed with its right angle at the origin, legs along the axes, and confirm that it bisects the segment from the incenter to the Nagel point.`,
      s: String.raw`Take $A = (0, 0)$, $B = (4, 0)$, $C = (0, 3)$. Here $a = BC = 5$, $b = 3$, $c = 4$, so $S = (7 : 9 : 8)$, that is $\tfrac{7A + 9B + 8C}{24} = \left(\tfrac32, 1\right)$. The incenter is $(1, 1)$ and the Nagel point $(s - a : s - b : s - c) = (1 : 3 : 2)$ is $(2, 1)$, whose midpoint with $I$ is $\left(\tfrac32, 1\right)$. The Spieker circle has radius $\tfrac r2 = \tfrac12$.` }
  );
  add("cardano-cubic",
    { q: String.raw`Write the real root of $t^3 - 6t - 9$ as a sum of two cube roots, then simplify it.`,
      s: String.raw`Here $p = -6$, $q = -9$, so $\tfrac{q^2}4 + \tfrac{p^3}{27} = \tfrac{81}4 - 8 = \tfrac{49}4$, with square root $\tfrac72$. Then $t = \sqrt[3]{\tfrac92 + \tfrac72} + \sqrt[3]{\tfrac92 - \tfrac72} = 2 + 1 = 3$. Check: $27 - 18 - 9 = 0$. The other two roots, from $t^2 + 3t + 3$, are not real.` },
    { q: String.raw`Use the discriminant to decide how many real roots $t^3 - 3t + 1$ has.`,
      s: String.raw`$\Delta = -4p^3 - 27q^2 = -4(-27) - 27 = 81 \gt 0$, so there are three distinct real roots (they are $2\cos40^\circ$, $2\cos80^\circ$, $2\cos160^\circ$).` }
  );
  add("popoviciu-inequality",
    { q: String.raw`Check Popoviciu's Inequality with $f(t) = t^2$ at $(x, y, z) = (0, 0, 6)$.`,
      s: String.raw`The left side is $0 + 0 + 36 + 3\cdot2^2 = 48$, and the right side is $2(0 + 3^2 + 3^2) = 36$. Indeed $48 \ge 36$.` }
  );
  add("stirling-first-kind",
    { q: String.raw`Expand $x(x+1)(x+2)(x+3)$ and read off how many arrangements of four labelled items split into two cycles.`,
      s: String.raw`Expand $x(x + 1)(x + 2)(x + 3) = x^4 + 6x^3 + 11x^2 + 6x$; the coefficient of $x^2$ is $\left[{4 \atop 2}\right] = 11$. Check: $8$ are a $3$-cycle with a fixed point and $3$ are two $2$-cycles.` },
    { q: String.raw`Why do the Stirling numbers of the first kind in row $n$ add to $n!$? Check $n = 4$.`,
      s: String.raw`Every permutation has some number of cycles, so summing over that number counts all $n!$ permutations; in the product, this is $x = 1$, giving $1\cdot2\cdots n$. For $n = 4$: $6 + 11 + 6 + 1 = 24$.` }
  );
  add("kruskal-katona",
    { q: String.raw`Ten $3$-element sets are chosen. What is the smallest possible number of $2$-element sets contained in at least one of them?`,
      s: String.raw`$10 = \binom53$, so Kruskal–Katona gives at least $\binom52 = 10$ pairs, reached by taking all $10$ triples from $5$ elements.` }
  );
  add("markovs-inequality",
    { q: String.raw`Incomes in a town average $50$ thousand dollars. At most what fraction of people earn $200$ thousand or more?`,
      s: String.raw`Incomes are nonnegative, so Markov gives at most $\tfrac{50}{200} = \tfrac14$.` },
    { q: String.raw`Bound the probability that a fair die shows at least $6$ with Markov's inequality, and compare with the truth.`,
      s: String.raw`Markov gives $\tfrac{3.5}6 \approx 0.58$, while the true value is $\tfrac16$. The bound only uses the mean, so it can be far from sharp.` }
  );
  add("coprime-probability",
    { q: String.raw`Count the coprime ordered pairs $(a, b)$ with $1 \le a, b \le 6$ and compare the fraction with $\tfrac6{\pi^2}$.`,
      s: String.raw`There are $23$ of the $36$ pairs, a fraction of about $0.639$, against $\tfrac6{\pi^2} \approx 0.608$. The limit only appears as the range grows.` }
  );
  add("probability-generating-functions",
    { q: String.raw`Use the PGF of the number of heads in $3$ fair flips to find $P(2\text{ heads})$ and the mean.`,
      s: String.raw`Each flip has PGF $\tfrac{1 + s}2$, so three have $\tfrac{(1 + s)^3}8 = \tfrac{1 + 3s + 3s^2 + s^3}8$. So $P(2) = \tfrac38$, and $G'(s) = \tfrac{3(1 + s)^2}8$ gives the mean $G'(1) = \tfrac32$.` },
    { q: String.raw`Find the variance of a fair die roll from its PGF.`,
      s: String.raw`$G''(1) = E[X(X - 1)] = \tfrac{0 + 2 + 6 + 12 + 20 + 30}6 = \tfrac{35}3$ and $G'(1) = \tfrac72$. So $\operatorname{Var} = \tfrac{35}3 + \tfrac72 - \tfrac{49}4 = \tfrac{35}{12}$.` }
  );
  add("mollweides-formula",
    { q: String.raw`Check both Mollweide formulas on an equilateral triangle.`,
      s: String.raw`With $a = b = c$ and all angles $60^\circ$: $\tfrac{a + b}c = 2$ and $\tfrac{\cos0}{\sin30^\circ} = 2$; $\tfrac{a - b}c = 0$ and $\tfrac{\sin0}{\cos30^\circ} = 0$.` }
  );
  add("morleys-theorem",
    { q: String.raw`An isosceles right triangle has hypotenuse $2$. How long is each side of its Morley triangle?`,
      s: String.raw`The circumradius is half the hypotenuse, $R = 1$, and the angles $45^\circ$, $45^\circ$, $90^\circ$ trisect to $15^\circ$, $15^\circ$, $30^\circ$. The side is $8\sin^2 15^\circ \sin 30^\circ = 4\sin^2 15^\circ = 2(1 - \cos 30^\circ) = 2 - \sqrt3 \approx 0.268$.` },
    { q: String.raw`In an equilateral triangle of side $6$, what is the ratio of the Morley triangle's side to the original side?`,
      s: String.raw`Here $R = \tfrac{6}{\sqrt3} = 2\sqrt3$ and every trisected angle is $20^\circ$, so the Morley side is $16\sqrt3\sin^3 20^\circ \approx 1.109$. Since $6 = 2R\sin 60^\circ$, the ratio is $\frac{8R\sin^3 20^\circ}{2R\sin 60^\circ} = \frac{8\sin^3 20^\circ}{\sqrt3} \approx 0.185$.` }
  );
  add("steiner-lehmus",
    { q: String.raw`For the triangle with $a = 7$, $b = 8$, $c = 5$, compute both bisector lengths $t_b$ and $t_c$ and say which side the shorter one goes to.`,
      s: String.raw`$t_b^2 = ac\left[1 - \left(\tfrac{b}{a + c}\right)^2\right] = 35 \cdot \tfrac59 = \tfrac{175}9$, so $t_b = \tfrac{5\sqrt7}{3} \approx 4.41$; $t_c^2 = ab\left[1 - \left(\tfrac{c}{a + b}\right)^2\right] = 56 \cdot \tfrac89 = \tfrac{448}9$, so $t_c = \tfrac{8\sqrt7}{3} \approx 7.06$. The shorter bisector, $t_b$, goes to the longer side $b = 8$.` },
    { q: String.raw`The bisectors from $B$ and $C$ both have length $\sqrt{10}$, and $BC = 3$. Find $AB$.`,
      s: String.raw`Equal bisectors force $b = c$. Then $t_c^2 = 3c\left[1 - \left(\tfrac{c}{3 + c}\right)^2\right] = \frac{9c(3 + 2c)}{(3 + c)^2} = 10$, so $8c^2 - 33c - 90 = 0$ and $c = \frac{33 + 63}{16} = 6$. So $AB = AC = 6$; check: $\frac{9 \cdot 6 \cdot 15}{81} = 10$.` }
  );
  add("cevian-nest",
    { q: String.raw`$D$, $E$, $F$ are the midpoints of the sides of triangle $ABC$, and $X$, $Y$, $Z$ are the midpoints of $EF$, $FD$, $DE$. Where do $AX$, $BY$, $CZ$ meet?`,
      s: String.raw`$DX$, $EY$, $FZ$ are the medians of $DEF$, so they concur and the theorem says $AX$, $BY$, $CZ$ do too. The midpoint of $EF$ lies on the median $AD$ of $ABC$ (the median bisects every segment parallel to $BC$), so $AX$ is that median, and the three lines meet at the centroid of $ABC$.` },
    { q: String.raw`$DEF$ is the medial triangle of $ABC$, with $D$, $E$, $F$ on $BC$, $CA$, $AB$. On its sides, $FX : XE = 3 : 1$ and $FY : YD = 2 : 1$. Where must $Z$ sit on $DE$ for $DX$, $EY$, $FZ$ to concur, and in what ratio does $CZ$ then cut $AB$?`,
      s: String.raw`Ceva in $DEF$: $\frac{EX}{XF} \cdot \frac{FY}{YD} \cdot \frac{DZ}{ZE} = \frac13 \cdot 2 \cdot \frac{DZ}{ZE} = 1$, so $DZ : ZE = 3 : 2$. The homothety at $C$ with factor $2$ sends $D \to B$ and $E \to A$, so $CZ$ meets $AB$ at $Z'$ with $BZ' : Z'A = 3 : 2$. The same homotheties give $BX' : X'C = 3 : 1$ and $AY' : Y'C = 2 : 1$, and Ceva in $ABC$ checks: $3 \cdot \frac12 \cdot \frac23 = 1$.` }
  );
  add("droz-farny",
    { q: String.raw`Triangle $A = (0, 3)$, $B = (-1, 0)$, $C = (3, 0)$ has orthocenter $H = (0, 1)$. Through $H$ draw the perpendicular lines $y = 1 + 2x$ and $y = 1 - \tfrac x2$. Find the midpoints of the three segments they cut on the side lines, and the line through them.`,
      s: String.raw`On $BC$ ($y = 0$) the lines cross at $x = -\tfrac12$ and $x = 2$: midpoint $\left(\tfrac34, 0\right)$. On $CA$ ($x + y = 3$) they cross at $\left(\tfrac23, \tfrac73\right)$ and $(4, -1)$: midpoint $\left(\tfrac73, \tfrac23\right)$. On $AB$ ($y = 3x + 3$) they cross at $(-2, -3)$ and $\left(-\tfrac47, \tfrac97\right)$: midpoint $\left(-\tfrac97, -\tfrac67\right)$. Both slopes from the first midpoint are $\tfrac8{19}$, so all three lie on $y = \tfrac8{19}\left(x - \tfrac34\right)$.` },
    { q: String.raw`Same triangle and $H = (0, 1)$, but now turn the right angle to the lines $y = 1 - 2x$ and $y = 1 + \tfrac x2$. Find the new Droz-Farny line.`,
      s: String.raw`On $BC$ the crossings are $x = \tfrac12$ and $x = -2$: midpoint $\left(-\tfrac34, 0\right)$. On $CA$ they are $(-2, 5)$ and $\left(\tfrac43, \tfrac53\right)$: midpoint $\left(-\tfrac13, \tfrac{10}3\right)$. On $AB$ they are $\left(-\tfrac25, \tfrac95\right)$ and $\left(-\tfrac45, \tfrac35\right)$: midpoint $\left(-\tfrac35, \tfrac65\right)$. All three satisfy $y = 8x + 6$, so the line has turned with the right angle.` }
  );
  add("lester-circle",
    { q: String.raw`Why does Lester's Theorem ask for a scalene triangle? Look at an equilateral triangle and an isosceles one.`,
      s: String.raw`In an equilateral triangle $O$, $N$ and the first Fermat point all coincide with the center, so there is no circle to speak of. In an isosceles triangle all four points lie on the axis of symmetry, and four collinear points lie on no circle. Only a scalene triangle gives four points in general position.` },
    { q: String.raw`The right triangle $A = (0, 0)$, $B = (4, 0)$, $C = (0, 3)$ has its Fermat points at about $(0.696, 0.751)$ and $(0.983, 3.228)$. Find $O$ and $N$, then check numerically that the circle through $O$, $N$ and the first Fermat point passes through the second.`,
      s: String.raw`The circumcenter is the midpoint of the hypotenuse, $O = (2, 1.5)$, and the orthocenter is the right-angle vertex $A$, so $N = (1, 0.75)$. The circle through $O$, $N$ and $(0.696, 0.751)$ has center about $(0.853, 1.988)$ and radius about $1.247$. The distance from that center to $(0.983, 3.228)$ is also about $1.247$, so the second Fermat point is on it.` }
  );
  add("archimedes-broken-chord",
    { q: String.raw`On a circle, $AB = 5$ and $BC = 11$. $M$ is the midpoint of arc $AC$ through $B$, and $F$ the foot from $M$ to $BC$. How far is $F$ from $B$?`,
      s: String.raw`$FC = \frac{AB + BC}{2} = 8$, so $BF = 11 - 8 = 3$: the foot sits half the difference $\frac{11 - 5}{2}$ from $B$.` },
    { q: String.raw`A broken chord $A \to B \to C$ has pieces $3$ and $7$ meeting at an angle of $120^\circ$. Drop a perpendicular from the arc midpoint (on $B$'s side) to the longer piece. How long is it?`,
      s: String.raw`$FC = 5$. Next $AC^2 = 9 + 49 + 21 = 79$. The angle $\angle AMC$ equals $\angle ABC = 120^\circ$, and $MA = MC$, so $AC = \sqrt3\,MC$ and $MC^2 = \frac{79}3$. Then $MF^2 = \frac{79}3 - 25 = \frac43$, so $MF = \frac{2\sqrt3}{3}$. Coordinates with $B$ at the origin and $C = (7, 0)$ confirm $F = (2, 0)$ and this height.` }
  );
  add("reims-theorem",
    { q: String.raw`Two radius-$5$ circles centred at the origin and at $(8, 0)$ share the points $P = (4, 3)$, $Q = (4, -3)$. Extend chord $AP$ of the left one, from $A = (-3, 4)$, and chord $BQ$, from $B = (-5, 0)$, until each hits the right one, at $C$ and $D$. Without solving for those points, give the gradient of $CD$.`,
      s: String.raw`Reim's Theorem makes $CD$ parallel to $AB$, whose slope is $\frac{4 - 0}{-3 + 5} = 2$. Check: $C = \left(\frac{317}{25}, \frac{44}{25}\right)$ and $D = \left(\frac{47}5, -\frac{24}5\right)$, and $\frac{44/25 + 120/25}{317/25 - 235/25} = \frac{164}{82} = 2$.` },
    { q: String.raw`Circles meet at $P$ and $Q$; $A, P, C$ and $B, Q, D$ are collinear with $A, B$ on the first circle and $C, D$ on the second, and $\angle PAB = 70^\circ$. Find $\angle PCD$ and deduce that $AB \parallel CD$.`,
      s: String.raw`In cyclic $ABQP$, $\angle PQB = 180^\circ - 70^\circ = 110^\circ$. In cyclic $PQDC$, $\angle PCD = 180^\circ - \angle PQD = \angle PQB = 110^\circ$. Then $\angle CAB + \angle ACD = 70^\circ + 110^\circ = 180^\circ$, co-interior angles on the transversal $AC$, so $AB \parallel CD$.` }
  );
  add("arbelos",
    { q: String.raw`An arbelos has $AC = 13$ and height $BD = 6$. Find its area, the two small radii, and the radius of the twin circles.`,
      s: String.raw`$BD^2 = 4ab = 36$ gives $ab = 9$, and $a + b = \tfrac{13}2$, so $a$ and $b$ are the roots of $x^2 - \tfrac{13}2x + 9$: $\tfrac92$ and $2$. The area is $\pi ab = 9\pi$ (the circle on $BD$: $\pi \cdot 3^2$), and the twins have radius $\frac{ab}{a + b} = \frac{18}{13}$.` },
    { q: String.raw`Small semicircles of radii $3$ and $2$ make an arbelos. Compare its curved boundary to the big arc.`,
      s: String.raw`The small arcs have lengths $3\pi$ and $2\pi$, and the big semicircle of radius $5$ has length $5\pi$. They agree, as they always do: $\pi a + \pi b = \pi(a + b)$. So the whole boundary is $10\pi$, twice the big arc.` }
  );
  add("sawayama-thebault",
    { q: String.raw`Triangle $A = (5, 12)$, $B = (0, 0)$, $C = (14, 0)$ has incenter $I = (6, 4)$ and altitude foot $D = (5, 0)$. A circle touches $DA$, $DC$ and the circumcircle internally. Use the lemma to find its radius.`,
      s: String.raw`The angle at $D$ is right, so the touch points are $E = (5, t)$ and $F = (5 + t, 0)$ with $t$ the radius. The chord $EF$ is $x + y = 5 + t$, and it must pass through $I$: $10 = 5 + t$, so $t = 5$. A numerical check of tangency to the circumcircle gives radius $5$ too.` },
    { q: String.raw`Same triangle, same $D = (5, 0)$, now the circle in the other region: touching $DA$, $DB$ and the circumcircle. Find its radius.`,
      s: String.raw`Now $E = (5, t)$ and $F = (5 - t, 0)$, and the chord $EF$ is $y = x - 5 + t$. Through $I = (6, 4)$: $4 = 1 + t$, so $t = 3$. Check with the tangent-length formula: $DF = \frac{a\cdot AD + b \cdot BD - c \cdot DC}{2s} = \frac{168 + 75 - 117}{42} = 3$.` }
  );
  add("mixtilinear-incircle",
    { q: String.raw`In the right triangle with $BC = 5$, $CA = 4$, $AB = 3$, find the radius of the $A$-mixtilinear incircle and the distance $AE$.`,
      s: String.raw`$s = 6$ and $r = 1$. Then $AE = \frac{bc}{s} = 2$ and $\rho = \frac{r\,bc}{s(s - a)} = \frac{12}{6} = 2$. Check: $\frac{r}{\cos^2 45^\circ} = 2$.` },
    { q: String.raw`In an equilateral triangle of side $6$, find $AE$ for the $A$-mixtilinear incircle and check that the incenter is the midpoint of $EF$.`,
      s: String.raw`$s = 9$, so $AE = AF = \frac{36}9 = 4$. The midpoint of $EF$ is $4\cos 30^\circ = 2\sqrt3$ from $A$ along the bisector, and $AI = \frac{r}{\sin 30^\circ} = 2\sqrt3$ with $r = \sqrt3$. They agree, so $I$ is the midpoint.` }
  );
  add("japanese-theorem",
    { q: String.raw`Take the square $A = (0, 0)$, $B = (2, 0)$, $C = (2, 2)$, $D = (0, 2)$. Find the four incenters of $ABC$, $BCD$, $CDA$, $DAB$ and the shape they make.`,
      s: String.raw`Each triangle is right isosceles with legs $2$, so $r = \frac{2 + 2 - 2\sqrt2}{2} = 2 - \sqrt2$, and each incenter sits $r$ from both legs: $(\sqrt2, 2 - \sqrt2)$, $(\sqrt2, \sqrt2)$, $(2 - \sqrt2, \sqrt2)$, $(2 - \sqrt2, 2 - \sqrt2)$. That is a square of side $2\sqrt2 - 2 \approx 0.83$, a rectangle as promised.` },
    { q: String.raw`Cyclic $ABCD$ has $AB = 25$, $BC = 39$, $CD = 52$, $DA = 60$, so $BD = 65$ and $AC = 56$. Compare the sum of the inradii on each side of $BD$ with the sum on each side of $AC$.`,
      s: String.raw`Across $BD$: triangles $25, 60, 65$ and $39, 52, 65$ are right, with inradii $\frac{25 + 60 - 65}2 = 10$ and $\frac{39 + 52 - 65}2 = 13$, total $23$. Across $AC$: triangle $25, 39, 56$ has area $420$ and $s = 60$, so $r = 7$; triangle $52, 60, 56$ has area $1344$ and $s = 84$, so $r = 16$; total $23$. The equal sums are the companion of the rectangle: they hold for every cyclic polygon and every triangulation.` }
  );
  add("poncelet-closure",
    { q: String.raw`The outer circle has radius $10$ and the inner circle's center is $6$ from its center. What inner radius makes bicentric triangles possible?`,
      s: String.raw`Euler's relation $d^2 = R^2 - 2Rr$ gives $36 = 100 - 20r$, so $r = \frac{16}5$. Then by Poncelet every point of the outer circle starts such a triangle.` },
    { q: String.raw`For bicentric quadrilaterals with $R = \tfrac72$ and $d = \tfrac12$, what must the inradius be? Check the square case $d = 0$ too.`,
      s: String.raw`$R - d = 3$ and $R + d = 4$, so Fuss's relation gives $\frac1{r^2} = \frac19 + \frac1{16} = \frac{25}{144}$ and $r = \frac{12}5$. With $d = 0$ it reads $\frac2{R^2} = \frac1{r^2}$, so $r = \frac{R}{\sqrt2}$, which is exactly the square's inradius.` }
  );
  add("cyclic-quad-radius",
    { q: String.raw`An isosceles trapezoid has bases $8$ and $2$ and legs $5$. Find its circumradius with the four-side formula, and check it with coordinates.`,
      s: String.raw`The height is $4$, so $K = \frac{8 + 2}2 \cdot 4 = 20$. With sides $2, 5, 8, 5$ in order the products are $10 + 40 = 50$, $16 + 25 = 41$, $10 + 40 = 50$, so $R = \frac{50\sqrt{41}}{80} = \frac{5\sqrt{41}}8$. Check: with vertices $(\pm4, 0)$, $(\pm1, 4)$, the center $(0, k)$ needs $16 + k^2 = 1 + (4 - k)^2$, so $k = \frac18$ and $R^2 = \frac{1025}{64}$, the same.` },
    { q: String.raw`What is $R$ for the cyclic quadrilateral with sides $7, 15, 20, 24$ in that order?`,
      s: String.raw`$7^2 + 24^2 = 15^2 + 20^2 = 625$, so the diagonal between them is $25$ and $K = 84 + 150 = 234$. The products are $105 + 480 = 585$, $140 + 360 = 500$, $168 + 300 = 468$, and $\sqrt{585 \cdot 500 \cdot 468} = 11700$, so $R = \frac{11700}{936} = \frac{25}2$, half the diameter $25$.` }
  );
  add("newtons-line",
    { q: String.raw`Quadrilateral $A = (0, 0)$, $B = (4, 0)$, $C = (3, 2)$, $D = (0, 4)$. Extend opposite sides to meet at $E = AB \cap CD$ and $F = BC \cap DA$, and find the line through the midpoints of $AC$, $BD$, $EF$.`,
      s: String.raw`Line $CD$ is $y = 4 - \tfrac23x$, which meets $y = 0$ at $E = (6, 0)$; line $BC$ is $y = -2(x - 4)$, which meets $x = 0$ at $F = (0, 8)$. The midpoints are $\left(\tfrac32, 1\right)$, $(2, 2)$ and $(3, 4)$, all on $y = 2x - 2$.` },
    { q: String.raw`The trapezoid $(0, 0)$, $(3, 0)$, $\left(\tfrac32, 2\right)$, $(0, 2)$ has an incircle centered at $(1, 1)$. Check that the center lies on the line through the diagonals' midpoints.`,
      s: String.raw`The slanted side $4x + 3y = 12$ is at distance $\frac{|4 + 3 - 12|}5 = 1$ from $(1, 1)$, so the circle of radius $1$ touches all four sides. The diagonal midpoints are $\left(\tfrac34, 1\right)$ and $\left(\tfrac32, 1\right)$, so the Newton line is $y = 1$, and it passes through $(1, 1)$.` }
  );
  add("picks-hexagonal-grid",
    { q: String.raw`On the triangular lattice of honeycomb cell centers, an equilateral triangle has side $2$ lattice steps. Count $B$ and $I$ and get its area in unit triangles.`,
      s: String.raw`Each side carries $3$ points, so $B = 6$, and there is no interior point, $I = 0$. Then $A = 2 \cdot 0 + 6 - 2 = 4$ unit triangles, matching the $4$ small triangles a side-$2$ triangle splits into.` },
    { q: String.raw`On the same lattice, a regular hexagon has side $2$. Find its area in unit triangles both by the formula and by cutting.`,
      s: String.raw`The boundary has $6 \cdot 2 = 12$ points, and the interior holds the center and the $6$ points around it, $I = 7$. So $A = 14 + 12 - 2 = 24$. Cutting from the center gives $6$ triangles of side $2$, each of $4$ unit triangles: $24$.` }
  );
  add("convex-position",
    { q: String.raw`How many points in general position guarantee a convex pentagon, and how many can avoid one?`,
      s: String.raw`$\mathrm{ES}(5) = 9$: any $9$ points with no three collinear contain $5$ in convex position, and there are sets of $8$ points with no convex pentagon among them.` },
    { q: String.raw`Evaluate the Erdős–Szekeres bound $\binom{2n - 4}{n - 2} + 1$ at $n = 4$ and $n = 5$. How far is each from the truth?`,
      s: String.raw`$n = 4$: $\binom42 + 1 = 7$, against the true $\mathrm{ES}(4) = 5$. $n = 5$: $\binom63 + 1 = 21$, against $\mathrm{ES}(5) = 9$. The bound always holds but grows like $4^n$, while the conjectured truth is $2^{n - 2} + 1$, which gives $5$ and $9$ here.` }
  );
  add("sylvester-gallai",
    { q: String.raw`Find a line through exactly two points of the $3 \times 3$ grid $\{0, 1, 2\}^2$.`,
      s: String.raw`The line through $(0, 0)$ and $(1, 2)$ has slope $2$; its next grid point would be $(2, 4)$, outside the grid, so it holds exactly two. (Rows, columns and the two long diagonals each hold three.)` },
    { q: String.raw`For the points $(0, 0)$, $(2, 0)$, $(4, 0)$, $(2, 1)$, find the point and connecting line (not through it) at the least distance, and say how many points that line holds.`,
      s: String.raw`The candidates are $1$ for $(2, 1)$ and $y = 0$, $2$ for $(0, 0)$ or $(4, 0)$ and $x = 2$, $\frac4{\sqrt5}$ for $(0, 0)$ and $x + 2y = 4$, and $\frac2{\sqrt5} \approx 0.89$ for $(2, 0)$ and either $x - 2y = 0$ or $x + 2y = 4$. The least is $\frac2{\sqrt5}$, and its line $x = 2y$ holds exactly $(0, 0)$ and $(2, 1)$: an ordinary line, as the proof predicts.` }
  );
  add("hellys-theorem",
    { q: String.raw`Three convex sets in the plane meet two at a time. Must all three share a point?`,
      s: String.raw`No. The three sides of a triangle are convex segments; each two share a vertex, but no point is on all three. In the plane, Helly needs every three to meet, not every two.` },
    { q: String.raw`Six intervals on a line overlap in every pair: $[0, 5]$, $[1, 6]$, $[2, 7]$, $[3, 8]$, $[4, 9]$, $[4.5, 10]$. Find a point in all of them.`,
      s: String.raw`On a line $d = 1$, so pairwise overlap is enough. The largest left end is $4.5$ and the smallest right end is $5$; every interval contains $[4.5, 5]$, for example the point $4.75$.` }
  );
  add("minkowski-lattice",
    { q: String.raw`Show that the bound $4$ cannot be lowered: give a symmetric convex region of area $4$ whose only lattice point is the origin.`,
      s: String.raw`The open square $|x| \lt 1$, $|y| \lt 1$ has area $4$, is convex and symmetric, and every other lattice point has a coordinate of absolute value at least $1$, so it lies outside.` },
    { q: String.raw`Is there an integer pair $(x, y) \ne (0, 0)$ with $x^2 + 3y^2 \lt 5$? Decide from the ellipse's size before searching.`,
      s: String.raw`Its semi-axes are $\sqrt5$ and $\sqrt{5/3}$, so its area is $\frac{5\pi}{\sqrt3} \approx 9.07 \gt 4$, and Minkowski says yes. For example $(1, 1)$: $1 + 3 = 4 \lt 5$.` }
  );
  add("descartes-sphere-theorem",
    { q: String.raw`Four unit balls touch each other. Find the radii of the small ball nestled among them and of the ball enclosing them.`,
      s: String.raw`$\sum k = 4$ and $\sum k^2 = 4$, so $k_5 = 2 \pm \frac{\sqrt3}{2}\sqrt{16 - 8} = 2 \pm \sqrt6$. The inner ball has $r = \frac1{2 + \sqrt6} = \frac{\sqrt6 - 2}2 \approx 0.225$, and $k = 2 - \sqrt6$ gives the enclosing ball with $r = \frac{\sqrt6 + 2}{2} \approx 2.225$. Check: the centers form a tetrahedron of edge $2$ with circumradius $\frac{\sqrt6}2$, and $\frac{\sqrt6}2 \pm 1$ are these radii.` },
    { q: String.raw`Two parallel planes $2$ apart sandwich two touching unit balls. What radius must a fifth ball have to touch both planes and both balls?`,
      s: String.raw`The planes count as curvature $0$, so $\sum k = 2$ and $\sum k^2 = 2$, and $k_5 = 1 \pm \frac{\sqrt3}2\sqrt{4 - 4} = 1$: radius $1$, in either of the two spots beside the pair. Check: balls at $(0, 0, 0)$ and $(2, 0, 0)$, and a third at $(1, \sqrt3, 0)$ is $2$ from both.` }
  );
  add("totient-divisor-sum",
    { q: String.raw`Check Gauss's totient sum for $n = 36$ by listing $\varphi(d)$ for every divisor.`,
      s: String.raw`The divisors $1, 2, 3, 4, 6, 9, 12, 18, 36$ have totients $1, 1, 2, 2, 2, 6, 4, 6, 12$, and $1 + 1 + 2 + 2 + 2 + 6 + 4 + 6 + 12 = 36$.` },
    { q: String.raw`Reduce each of $\frac1{30}, \frac2{30}, \ldots, \frac{30}{30}$ to lowest terms. How many end with denominator $10$, and why do the counts over all denominators add to $30$?`,
      s: String.raw`$\frac{k}{30}$ reduces to denominator $10$ exactly when it equals $\frac{j}{10}$ with $\gcd(j, 10) = 1$, so there are $\varphi(10) = 4$: $\frac3{30}, \frac9{30}, \frac{21}{30}, \frac{27}{30}$. Each fraction lands on exactly one denominator $d \mid 30$, with $\varphi(d)$ fractions there, so $\sum_{d \mid 30}\varphi(d) = 30$.` }
  );
  add("dirichlet-primes-progression",
    { q: String.raw`Are there infinitely many primes of the form $12k + 5$? Of the form $12k + 9$?`,
      s: String.raw`$\gcd(5, 12) = 1$, so Dirichlet gives infinitely many: $5, 17, 29, 41, \ldots$ But $\gcd(9, 12) = 3$ divides every $12k + 9$, and none of them equals $3$, so there are no primes of that form at all.` },
    { q: String.raw`Must some prime end in the digits $999$? Find the smallest.`,
      s: String.raw`Ending in $999$ means $p \equiv 999 \pmod{1000}$, and $\gcd(999, 1000) = 1$, so there are infinitely many. The candidates are $999 = 27 \cdot 37$, then $1999$, which is prime.` }
  );
  add("thues-lemma",
    { q: String.raw`$6^2 \equiv -1 \pmod{37}$. Apply Thue's Lemma with $a = 6$ to write $37$ as a sum of two squares.`,
      s: String.raw`We want $x \equiv 6y$ with $|x|, |y| \le 6$. Already $y = 1$, $x = 6$ works, and then $x^2 + y^2 \equiv (a^2 + 1)y^2 \equiv 0 \pmod{37}$ with $0 \lt x^2 + y^2 \le 72$, so $x^2 + y^2 = 37$: $37 = 36 + 1$.` },
    { q: String.raw`$9^2 = 81 \equiv -1 \pmod{41}$. Find small $x$, $y$ with $x \equiv 9y \pmod{41}$ and use them to write $41$ as a sum of two squares.`,
      s: String.raw`With $|x|, |y| \le 6$: $y = 1, 2, 3$ give $9, 18, 27 \equiv -14$, all too big, and $y = 4$ gives $36 \equiv -5$. So $x = -5$, $y = 4$, and $25 + 16 = 41$.` }
  );
  add("cauchy-davenport",
    { q: String.raw`Mod $11$, a set $A$ of size $3$ and a set $B$ of size $2$. What is the smallest $|A + B|$ can be, and when is it reached?`,
      s: String.raw`Cauchy–Davenport gives $|A + B| \ge \min(11, 3 + 2 - 1) = 4$. It is reached by progressions with the same difference: $A = \{0, 1, 2\}$, $B = \{0, 1\}$ give $A + B = \{0, 1, 2, 3\}$.` },
    { q: String.raw`The fourth powers mod $17$ are $\{0, 1, 4, 13, 16\}$. How many fourth powers does Cauchy–Davenport guarantee are enough to write every residue mod $17$ as their sum?`,
      s: String.raw`A sum of $k$ copies of a $5$-element set has at least $\min(17, 5k - (k - 1)) = \min(17, 4k + 1)$ elements, which reaches $17$ at $k = 4$. So four fourth powers always suffice mod $17$ (a direct check shows three already do).` }
  );
  add("erdos-ginzburg-ziv",
    { q: String.raw`Show that $2n - 1$ cannot be lowered to $2n - 2$, using $n = 4$.`,
      s: String.raw`Take $0, 0, 0, 1, 1, 1$. Any four of them include between $1$ and $3$ ones, so their sum is $1$, $2$ or $3$, never a multiple of $4$. In general, $n - 1$ zeros and $n - 1$ ones defeat every choice of $n$.` },
    { q: String.raw`Find four of $1, 3, 4, 6, 7, 9, 10$ whose sum is divisible by $4$.`,
      s: String.raw`Seven numbers is $2 \cdot 4 - 1$, so the theorem promises one. The residues mod $4$ are $1, 3, 0, 2, 3, 1, 2$; taking $1 + 3 + 2 + 2$ gives $1 + 3 + 6 + 10 = 20$.` }
  );
  add("wolstenholme",
    { q: String.raw`Check Wolstenholme's Theorem for $p = 7$ using $\binom{14}{7}$.`,
      s: String.raw`$\binom{14}7 = 3432 = 10 \cdot 343 + 2$, so $\binom{14}7 \equiv 2 \pmod{7^3}$.` },
    { q: String.raw`Why does the theorem start at $p = 5$? Compute $\binom{2p}{p} \bmod p^3$ for $p = 3$ and $p = 5$.`,
      s: String.raw`For $p = 3$, $\binom63 = 20$, which is $20 \not\equiv 2 \pmod{27}$. For $p = 5$, $\binom{10}5 = 252 = 2 \cdot 125 + 2 \equiv 2 \pmod{125}$. Small primes fail because the harmonic-sum step needs $p \ge 5$.` }
  );
  add("zsygmondy",
    { q: String.raw`$2^{10} - 1 = 1023 = 3 \cdot 11 \cdot 31$. Which of these primes is primitive?`,
      s: String.raw`$3$ divides $2^2 - 1$ and $31$ divides $2^5 - 1$, so they appeared earlier. The order of $2$ mod $11$ is $10$, so $11$ divides no earlier $2^k - 1$: it is the primitive prime divisor Zsigmondy promises.` },
    { q: String.raw`Show that $2^6 - 1$ has no primitive prime divisor, then find the primitive ones of $3^4 - 1$.`,
      s: String.raw`$63 = 3^2 \cdot 7$, with $3 \mid 2^2 - 1$ and $7 \mid 2^3 - 1$: this is the exception. $3^4 - 1 = 80 = 2^4 \cdot 5$; $2$ divides $3 - 1$, but $5$ divides none of $2, 8, 26$, so $5$ is primitive.` }
  );
  add("fermat-numbers",
    { q: String.raw`Show $641 \mid F_5 = 2^{32} + 1$ using $641 = 5 \cdot 2^7 + 1 = 5^4 + 2^4$.`,
      s: String.raw`Mod $641$, $5 \cdot 2^7 \equiv -1$, so $5^4 \cdot 2^{28} \equiv 1$. Also $5^4 \equiv -2^4$, so $-2^4 \cdot 2^{28} = -2^{32} \equiv 1$, i.e. $2^{32} + 1 \equiv 0$. Indeed $F_5 = 641 \cdot 6700417$.` },
    { q: String.raw`Use the product identity to show $F_2$ and $F_5$ share no factor.`,
      s: String.raw`$F_5 - 2 = F_0F_1F_2F_3F_4$, so a common divisor of $F_2$ and $F_5$ divides $F_5 - (F_5 - 2) = 2$. Fermat numbers are odd, so the divisor is $1$.` }
  );
  add("carmichael-numbers",
    { q: String.raw`Is $1105$ a Carmichael number?`,
      s: String.raw`$1105 = 5 \cdot 13 \cdot 17$ is squarefree, and $4$, $12$, $16$ all divide $1104 = 16 \cdot 69$ ($1104 = 12 \cdot 92$). By Korselt, yes.` },
    { q: String.raw`$341 = 11 \cdot 31$ satisfies $2^{340} \equiv 1 \pmod{341}$. Is it a Carmichael number?`,
      s: String.raw`It is a pseudoprime to base $2$: $2^{10} = 1024 = 3 \cdot 341 + 1$, so $2^{340} = (2^{10})^{34} \equiv 1$. But $31 - 1 = 30 \nmid 340$, so Korselt fails, and indeed $3^{340} \equiv 56 \pmod{341}$. Not Carmichael.` }
  );
  add("beatty-theorem",
    { q: String.raw`Take $\alpha = \varphi = \frac{1 + \sqrt5}2$. Find its partner and the first few terms of both sequences.`,
      s: String.raw`$\frac1\beta = 1 - \frac1\varphi = 1 - (\varphi - 1) = 2 - \varphi$, so $\beta = \frac{1}{2 - \varphi} = \varphi^2 = \varphi + 1$. The terms are $\lfloor n\varphi \rfloor = 1, 3, 4, 6, 8, 9, 11, 12, \ldots$ and $\lfloor n\varphi^2 \rfloor = 2, 5, 7, 10, 13, \ldots$, which fill in exactly the gaps.` },
    { q: String.raw`How many of $1, 2, \ldots, 100$ have the form $\lfloor n\sqrt2 \rfloor$?`,
      s: String.raw`$\lfloor n\sqrt2 \rfloor \le 100$ exactly when $n\sqrt2 \lt 101$, so $n \le \lfloor 101/\sqrt2 \rfloor = 71$. The partner $2 + \sqrt2$ gives $\lfloor 101/(2 + \sqrt2) \rfloor = 29$, and $71 + 29 = 100$, as the partition requires.` }
  );
  add("floor-sum-reciprocity",
    { q: String.raw`Find $\left\lfloor \frac3{11} \right\rfloor + \left\lfloor \frac6{11} \right\rfloor + \cdots + \left\lfloor \frac{30}{11} \right\rfloor$.`,
      s: String.raw`This is $\sum_{k=1}^{10}\left\lfloor \frac{3k}{11} \right\rfloor$ with $\gcd(3, 11) = 1$, so it equals $\frac{2 \cdot 10}2 = 10$. Directly: $0, 0, 0, 1, 1, 1, 1, 2, 2, 2$.` },
    { q: String.raw`Find $\sum_{k=1}^{4}\left\lfloor \frac{13k}{5} \right\rfloor$ two ways.`,
      s: String.raw`By reciprocity it is $\frac{(13 - 1)(5 - 1)}2 = 24$, the same as $\sum_{k=1}^{12}\left\lfloor \frac{5k}{13} \right\rfloor$. Directly, $2 + 5 + 7 + 10 = 24$.` }
  );
  add("cayley-menger",
    { q: String.raw`A corner of a unit cube is cut off: three edges of length $1$ meet at right angles, and the other three edges are $\sqrt2$. Check the volume with the determinant.`,
      s: String.raw`With $a = b = c = 1$ and $d = e = f = \sqrt2$, the matrix has $1$s in the first-vertex row and $2$s elsewhere off the diagonal, and its determinant is $8$. So $V^2 = \frac{8}{288} = \frac1{36}$ and $V = \frac16$, which is $\frac13 \cdot \frac12 \cdot 1$, the familiar corner volume.` },
    { q: String.raw`What does the determinant give for the four corners of a unit square, taken as a "flat tetrahedron"?`,
      s: String.raw`With $P_1P_2 = P_1P_4 = P_2P_3 = P_3P_4 = 1$ and diagonals $P_1P_3 = P_2P_4 = \sqrt2$, the determinant comes out $0$, so $V = 0$. A zero Cayley–Menger determinant is exactly the test for four points being coplanar.` }
  );
  add("pappus-hexagon",
    { q: String.raw`Put $A = (0, 0)$, $B = (1, 0)$, $C = (3, 0)$ on $y = 0$ and $D = (0, 2)$, $E = (1, 2)$, $F = (2, 2)$ on $y = 2$. Find the three crossing points and the line through them.`,
      s: String.raw`$AE \cap BD = \left(\tfrac12, 1\right)$, $AF \cap CD = \left(\tfrac65, \tfrac65\right)$ and $BF \cap CE = \left(\tfrac53, \tfrac43\right)$. Both slopes from the first are $\frac{1/5}{7/10} = \frac{1/3}{7/6} = \frac27$, so all three lie on $y = 1 + \frac27\left(x - \frac12\right)$. Parallel carrier lines are allowed: they meet at infinity.` },
    { q: String.raw`Repeat with $A = (1, 0)$, $B = (2, 0)$, $C = (4, 0)$ on the $x$-axis and $D = (1, 1)$, $E = (3, 3)$, $F = (4, 4)$ on $y = x$.`,
      s: String.raw`The crossings are $AE \cap BD = (1.4, 0.6)$, $AF \cap CD = (1.6, 0.8)$ and $BF \cap CE = (3.2, 2.4)$, and all three satisfy $y = x - 0.8$.` }
  );
  add("desargues-involution",
    { q: String.raw`Use the involution to prove the Butterfly Theorem: $M$ is the midpoint of chord $XY$, chords $AC$ and $BD$ pass through $M$, and $AD$, $BC$ meet $XY$ at $P$, $Q$. Show $MP = MQ$.`,
      s: String.raw`Put $M$ at $t = 0$. The degenerate conic $AC \cup BD$ meets the line twice at $M$, so $0$ is paired with itself, which forces $\gamma = 0$; the relation becomes $\frac1t + \frac1{t'} = $ constant. The circle gives the pair $X = -m$, $Y = m$, so the constant is $0$. Then $P = p$ pairs with $Q = -p$, so $MP = MQ$.` },
    { q: String.raw`Through a point $M$ of chord $XY$, with $MX = 2$ and $MY = 6$, draw chords $AC$ and $BD$; let $AD$ and $BC$ cross $XY$ at $P$ and $Q$. If $P$ is $3$ from $M$ toward $Y$, where is $Q$?`,
      s: String.raw`As in the butterfly case, $M = 0$ is paired with itself, so $\frac1t + \frac1{t'}$ is constant, and the pair $X = -2$, $Y = 6$ fixes it at $-\frac12 + \frac16 = -\frac13$. Then $\frac13 + \frac1q = -\frac13$ gives $q = -\frac32$: $Q$ is $\frac32$ from $M$ toward $X$.` }
  );
  add("mobius-transformations",
    { q: String.raw`Where does $f(z) = \frac{z - i}{z + i}$ send the real line and the upper half-plane?`,
      s: String.raw`For real $x$, $|x - i| = |x + i|$ (both are $\sqrt{x^2 + 1}$), so $|f(x)| = 1$: the real line goes to the unit circle, with $f(0) = -1$, $f(1) = -i$, $f(\infty) = 1$. Since $f(i) = 0$, the upper half-plane, the side holding $i$, goes to the inside of the disk.` },
    { q: String.raw`Find the fixed points of $f(z) = \frac{2z + 1}{z + 2}$ and show that it maps the unit circle to itself.`,
      s: String.raw`$f(z) = z$ means $2z + 1 = z^2 + 2z$, so $z = \pm1$. For $|z| = 1$, $|2z + 1|^2 = 4 + 4\operatorname{Re} z + 1$ and $|z + 2|^2 = 1 + 4\operatorname{Re} z + 4$ are equal, so $|f(z)| = 1$.` }
  );
  add("complete-quadrilateral-miquel",
    { q: String.raw`$A = (5, 0)$, $B = (3, 4)$, $C = (-4, 3)$, $D = (-3, -4)$ lie on $x^2 + y^2 = 25$, with $E = AB \cap CD = (-7, 24)$ and $F = AD \cap BC = (17, 6)$. Check that $(9, 12)$ lies on the circumcircles of all four triangles of the lines $AB$, $BC$, $CD$, $DA$.`,
      s: String.raw`The triangles are $BCE$, $ADE$, $ABF$ and $CDF$, one for each line left out. Computing each circumcircle, $(9, 12)$ lies on all four, so it is the Miquel point.` },
    { q: String.raw`In the same configuration, where does the Miquel point sit relative to line $EF$ and the center $O$?`,
      s: String.raw`Line $EF$ is $3x + 4y = 75$, and $3 \cdot 9 + 4 \cdot 12 = 75$, so $M = (9, 12)$ is on it. It is also the foot of the perpendicular from $O$: the foot is $\frac{75}{25}(3, 4) = (9, 12)$. For a cyclic quadrilateral, the Miquel point is always the foot from $O$ to $EF$.` }
  );
  add("brocards-theorem",
    { q: String.raw`A cyclic quadrilateral on $x^2 + y^2 = 25$ has diagonals meeting at $G = (1, 2)$. Which line holds the two crossing points $E$ and $F$ of opposite sides?`,
      s: String.raw`By Brocard, $EF$ is the polar of $G$: $1 \cdot x + 2 \cdot y = 25$. As a check, $OG$ has direction $(1, 2)$, the normal of that line, so $OG \perp EF$ as the theorem says.` },
    { q: String.raw`With $E = (-7, 24)$ and $F = (17, 6)$ outside the circle $x^2 + y^2 = 25$, compute $EF$ by the formula $EF^2 = EO^2 + FO^2 - 2R^2$ and compare with the distance formula.`,
      s: String.raw`$EO^2 = 49 + 576 = 625$ and $FO^2 = 289 + 36 = 325$, so $EF^2 = 625 + 325 - 50 = 900$ and $EF = 30$. Directly, $24^2 + 18^2 = 900$.` }
  );
  add("projective-transformations",
    { q: String.raw`Points at $t = 0, 1, 2, 3$ on a line are sent by $t \mapsto \frac1{t + 1}$. Compare the cross-ratio $(A, B; C, D) = \frac{(c - a)/(c - b)}{(d - a)/(d - b)}$ before and after.`,
      s: String.raw`Before: $\frac{2/1}{3/2} = \frac43$. After, the points are $1, \frac12, \frac13, \frac14$: $\frac{(-2/3)/(-1/6)}{(-3/4)/(-1/4)} = \frac{4}{3}$. The lengths changed, the cross-ratio did not.` },
    { q: String.raw`On a line, $A = 0$, $B = 6$, $C = 2$. Find $D$ with $(A, B; C, D) = -1$, and say what a projective map sending $D$ to infinity does to $C$.`,
      s: String.raw`$\frac{2/(2 - 6)}{d/(d - 6)} = -\frac12 \cdot \frac{d - 6}{d} = -1$ gives $d - 6 = 2d$, so $D = -6$. When $D$ goes to infinity the ratio reduces to $\frac{CA}{CB} = -1$, so $C$ lands on the midpoint of the images of $A$ and $B$.` }
  );
  add("derivative-extremum",
    { q: String.raw`Find the largest and smallest values of $f(x) = x^3 - 6x^2 + 9x + 1$ on $[0, 4]$.`,
      s: String.raw`$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$, so the candidates are $x = 0, 1, 3, 4$, with values $1, 5, 1, 5$. The maximum is $5$ (at $x = 1$ and $x = 4$) and the minimum is $1$ (at $x = 0$ and $x = 3$).` },
    { q: String.raw`A rectangular pen against a long wall uses $40$ m of fence for the other three sides. What is the largest area?`,
      s: String.raw`With the two sides off the wall of length $x$, the area is $A(x) = x(40 - 2x)$ for $0 \lt x \lt 20$. $A'(x) = 40 - 4x = 0$ at $x = 10$, and $A \to 0$ at both ends, so the maximum is $10 \cdot 20 = 200$ m$^2$.` }
  );
  add("matrix-power-diagonalizing",
    { q: String.raw`Raise the upper triangular $\begin{pmatrix}2&1\\0&3\end{pmatrix}$ to the fifth power through its eigenvectors. What sits above the diagonal?`,
      s: String.raw`The eigenvalues are $2$ and $3$, with eigenvectors $(1, 0)$ and $(1, 1)$. So $M^n = \begin{pmatrix}1&1\\0&1\end{pmatrix}\begin{pmatrix}2^n&0\\0&3^n\end{pmatrix}\begin{pmatrix}1&-1\\0&1\end{pmatrix} = \begin{pmatrix}2^n&3^n - 2^n\\0&3^n\end{pmatrix}$, and the entry is $243 - 32 = 211$.` },
    { q: String.raw`Diagonalize $\begin{pmatrix}1&1\\1&0\end{pmatrix}$ to get a formula for its $n$th power's top-right entry, and evaluate it at $n = 10$.`,
      s: String.raw`The eigenvalues are the roots $\varphi, \psi = \frac{1 \pm \sqrt5}2$ of $\lambda^2 = \lambda + 1$, and the top-right entry of the $n$th power is $\frac{\varphi^n - \psi^n}{\sqrt5} = F_n$ (Binet). At $n = 10$ it is $F_{10} = 55$.` }
  );
  add("dimension-arguments",
    { q: String.raw`Without expanding, why must $x^2$, $(x + 1)^2$, $(x + 2)^2$, $(x + 3)^2$ be linearly dependent? Find a relation.`,
      s: String.raw`They are four vectors in the space of polynomials of degree at most $2$, which has dimension $3$. A relation is the third difference: $(x + 3)^2 - 3(x + 2)^2 + 3(x + 1)^2 - x^2 = 0$ (the $x^2$, $x$ and constant terms give $1 - 3 + 3 - 1$, $6 - 12 + 6$, and $9 - 12 + 3$).` },
    { q: String.raw`Are $(1, 1, 0)$, $(0, 1, 1)$, $(1, 0, 1)$ independent? Answer over the reals and over $\mathbb F_2$.`,
      s: String.raw`Over the reals the determinant is $2 \ne 0$, so they are independent. Over $\mathbb F_2$ their sum is $(2, 2, 2) = 0$, so they are dependent. A dimension argument must say which field it works in.` }
  );
  add("vieta-jumping",
    { q: String.raw`$(a, b) = (30, 8)$ solves $a^2 + b^2 = k(ab + 1)$. Find $k$, then jump down until a coordinate is $0$. What does that show about $k$?`,
      s: String.raw`$900 + 64 = 964 = 4 \cdot 241$, so $k = 4$. The jump $a' = kb - a$ gives $(30, 8) \to (8, 2)$, since $32 - 30 = 2$, and then $(8, 2) \to (2, 0)$, since $8 - 8 = 0$. At $(2, 0)$ the equation reads $4 = k$, so $k = 2^2$ is a perfect square, as the classic result says.` },
    { q: String.raw`Starting from $(1, 1)$, jump upward to list four more solutions of $a^2 + b^2 + 1 = 3ab$.`,
      s: String.raw`Replacing the smaller entry $b$ of $(a, b)$ by $3a - b$ gives $(1, 1) \to (2, 1) \to (5, 2) \to (13, 5) \to (34, 13)$. Check: $169 + 25 + 1 = 195 = 3 \cdot 65$, and $1156 + 169 + 1 = 1326 = 3 \cdot 442$.` }
  );
  add("mason-stothers",
    { q: String.raw`Apply Mason–Stothers to the identity $a = t^3$, $b = 1$, $c = t^3 + 1$, so $a + b = c$. Is the bound tight?`,
      s: String.raw`The three are coprime. $abc = t^3(t^3 + 1)$ has the distinct roots $0$ and the three cube roots of $-1$, so $n_0 = 4$. The largest degree is $3 \le 4 - 1$: equality, so the bound cannot be improved.` }
  );
  add("resultant-discriminant",
    { q: String.raw`Find $\operatorname{Res}(x^2 - 5x + 6,\ x^2 - 1)$ from the roots. What does its value say?`,
      s: String.raw`The roots are $2, 3$ and $1, -1$, and both polynomials are monic, so the resultant is $(2 - 1)(2 + 1)(3 - 1)(3 + 1) = 1 \cdot 3 \cdot 2 \cdot 4 = 24$. It is nonzero, so the two polynomials share no root.` }
  );
  add("eigenvalues-characteristic",
    { q: String.raw`Find the eigenvalues and eigenvectors of $\begin{pmatrix}4&1\\2&3\end{pmatrix}$, and check them against the trace and the determinant.`,
      s: String.raw`$\det(A - \lambda I) = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 2)(\lambda - 5)$. For $\lambda = 5$, $(1, 1)$ works ($4 + 1 = 5$, $2 + 3 = 5$); for $\lambda = 2$, $(1, -2)$ works ($4 - 2 = 2$, $2 - 6 = -4$). The sum $7$ is the trace and the product $10$ is $\det A = 12 - 2$.` }
  );
  add("brahmagupta-fibonacci",
    { q: String.raw`From $5 = 1^2 + 2^2$ and $13 = 2^2 + 3^2$, find both representations of $65$ as a sum of two squares.`,
      s: String.raw`$(1 \cdot 2 - 2 \cdot 3)^2 + (1 \cdot 3 + 2 \cdot 2)^2 = 16 + 49 = 65$, and with the sign switched, $(1 \cdot 2 + 2 \cdot 3)^2 + (1 \cdot 3 - 2 \cdot 2)^2 = 64 + 1 = 65$. So $65 = 4^2 + 7^2 = 8^2 + 1^2$.` }
  );
  add("popoviciu-inequality",
    { q: String.raw`Test Popoviciu's Inequality for $f(t) = t^4$ at $0$, $1$, $2$.`,
      s: String.raw`The mean is $1$, so the left side is $0 + 1 + 16 + 3 \cdot 1 = 20$. The pairwise midpoints are $\tfrac12$, $\tfrac32$, $1$, so the right side is $2\left(\tfrac1{16} + \tfrac{81}{16} + 1\right) = \tfrac{49}4 = 12.25$. Indeed $20 \ge 12.25$.` }
  );
  add("kruskal-katona",
    { q: String.raw`Five triples are chosen. How few pairs can they cover? Write $5$ in the cascade form first.`,
      s: String.raw`$5 = \binom43 + \binom22$, so the shadow has at least $\binom42 + \binom21 = 6 + 2 = 8$ pairs. Reached by all four triples of $\{1, 2, 3, 4\}$ plus $\{1, 2, 5\}$, which adds only the pairs $15$ and $25$.` }
  );
  add("coprime-probability",
    { q: String.raw`The probability is $\prod_p \left(1 - \frac1{p^2}\right)$, since two integers are both divisible by $p$ with chance $\frac1{p^2}$. Multiply the factors for $p = 2, 3, 5$ and compare with $\frac6{\pi^2}$.`,
      s: String.raw`$\frac34 \cdot \frac89 \cdot \frac{24}{25} = \frac{576}{900} = 0.64$. The remaining primes pull it down to $\frac6{\pi^2} \approx 0.608$; the product over all primes is $\frac1{\zeta(2)}$.` }
  );
  add("schurs-theorem",
    { q: String.raw`Check that coloring $\{1, 4, 10, 13\}$ red, $\{2, 3, 11, 12\}$ blue and $\{5, 6, 7, 8, 9\}$ green leaves no color with $x + y = z$.`,
      s: String.raw`Red: the sums $2, 5, 8, 11, 14, 17, 20, 23, 26$ of two reds are never red. Blue: the sums $4, 5, 6, 13, 14, 15, 22, 23, 24$ are never blue. Green: every sum of two greens is at least $10$, beyond the green block. So $1, \ldots, 13$ can be $3$-colored, and $S(3) = 13$ is the true length.` }
  );
  add("van-aubel",
    { q: String.raw`Erect squares outward on the sides of $(0, 0)$, $(4, 0)$, $(4, 2)$, $(0, 3)$. Check Van Aubel with the centers.`,
      s: String.raw`The centers are $(2, -2)$, $(5, 1)$, $\left(\tfrac52, \tfrac92\right)$, $\left(-\tfrac32, \tfrac32\right)$, each the side's midpoint pushed out by half the side, turned $90^\circ$. The joins of opposite centers are $\left(\tfrac12, \tfrac{13}2\right)$ and $\left(-\tfrac{13}2, \tfrac12\right)$: the same length, and their dot product is $0$.` }
  );
  add("erdos-mordell",
    { q: String.raw`For $A = (0, 3)$, $B = (4, 0)$, $C = (0, 0)$, let $P$ be the centroid. How much slack does Erdős–Mordell leave?`,
      s: String.raw`$P = \left(\tfrac43, 1\right)$, with $PA = \tfrac{2\sqrt{13}}3$, $PB = \tfrac{\sqrt{73}}3$, $PC = \tfrac53$, total about $6.92$. Its distances to the sides are $1$, $\tfrac43$ and $\tfrac{|4 + 4 - 12|}5 = \tfrac45$, so $2(d_a + d_b + d_c) \approx 6.27$. The slack is about $0.65$.` }
  );
  add("law-of-tangents",
    { q: String.raw`Sides $a = 9$ and $b = 5$ meet at $C = 120^\circ$. Find $A$ and $B$ without finding $c$ first.`,
      s: String.raw`$\tfrac{A + B}2 = 30^\circ$, so $\tan\tfrac{A - B}2 = \tfrac{4}{14}\tan30^\circ = \tfrac{2}{7\sqrt3} \approx 0.165$, so $\tfrac{A - B}2 \approx 9.37^\circ$. Then $A \approx 39.37^\circ$ and $B \approx 20.63^\circ$. Check: $c = \sqrt{151}$ and the Law of Cosines gives the same $A$.` }
  );
  add("mollweides-formula",
    { q: String.raw`The triangle with $a = 8$, $b = 5$, $c = 7$ has $C = 60^\circ$. Use Mollweide to find $\cos\frac{A - B}2$ and $\sin\frac{A - B}2$, and check they fit together.`,
      s: String.raw`$\cos\frac{A - B}2 = \frac{a + b}c\sin30^\circ = \frac{13}{14}$ and $\sin\frac{A - B}2 = \frac{a - b}c\cos30^\circ = \frac{3\sqrt3}{14}$. Then $\frac{169 + 27}{196} = 1$, as it must.` }
  );
  add("isogonal-line-lemma",
    { q: String.raw`In $A = (0, 0)$, $B = (3, 0)$, $C = (0, 6)$, the points $X = (1, \tfrac12)$ and $Y = (1, 2)$. Check that they are isogonal from $A$, find $P = BX \cap CY$ and $Q = BY \cap CX$, and confirm $AP$, $AQ$ are isogonal too.`,
      s: String.raw`The bisector of the right angle at $A$ is $y = x$, and the directions $(2, 1)$ and $(1, 2)$ are mirror images in it, so $AX$, $AY$ are isogonal. Solving gives $P = \left(\tfrac75, \tfrac25\right)$ and $Q = \left(\tfrac23, \tfrac73\right)$, with directions $(7, 2)$ and $(2, 7)$: mirror images again.` }
  );
  add("humpty-queue-points",
    { q: String.raw`For $B = (0, 0)$, $C = (6, 0)$, $A = (1, 4)$, locate the $A$-Humpty point $X$ and confirm $MX \cdot MA = MB^2$.`,
      s: String.raw`The altitudes $x = 1$ and $y = \tfrac54x$ meet at $H = \left(1, \tfrac54\right)$. The median runs from $M = (3, 0)$ toward $A$ with direction $(-2, 4)$, and the foot from $H$ on it is $X = \left(\tfrac{21}{10}, \tfrac95\right)$. Then $MX = \sqrt{0.81 + 3.24} = \tfrac{9}{2\sqrt5}$ and $MA = 2\sqrt5$, so $MX \cdot MA = 9 = MB^2$.` }
  );
  add("dumpty-point",
    { q: String.raw`Where is the $A$-Dumpty point of a triangle with a right angle at $A$? Check $DA^2 = DB \cdot DC$ on the $3$-$4$-$5$ triangle.`,
      s: String.raw`With the right angle at $A$, the symmedian from $A$ is the altitude, and since $BC$ is a diameter the altitude meets the circle again at the reflection $K$ of $A$ in $BC$. So $D$, the midpoint of $AK$, is the foot of the altitude; the circle $BOC$ degenerates to the line $BC$, which holds it. For legs $3$, $4$: $DA = \tfrac{12}5$, $DB = \tfrac{16}5$, $DC = \tfrac95$, and $\tfrac{16}5 \cdot \tfrac95 = \tfrac{144}{25} = DA^2$.` }
  );
  add("steiner-line",
    { q: String.raw`On $x^2 + y^2 = 25$, take $A = (0, 5)$, $B = (-3, -4)$, $C = (4, -3)$ and $P = (-5, 0)$. Reflect $P$ in the three side lines and find the line they lie on.`,
      s: String.raw`$O$ is the origin, so $H = A + B + C = (1, -2)$. The reflections in $BC$, $CA$, $AB$ are $\left(-\tfrac{19}5, -\tfrac{42}5\right)$, $(7, 6)$ and $(1, -2)$, the last being $H$ itself. All three lie on $y + 2 = \tfrac43(x - 1)$, the Steiner line, which passes through $H$ as it must.` }
  );
  add("anti-steiner-point",
    { q: String.raw`Why is the anti-Steiner point of any line joining a vertex to the orthocenter simply that vertex? Test it on the vertical altitude of the triangle with corners $A = (0, 6)$, $B = (-3, 0)$, $C = (2, 0)$.`,
      s: String.raw`If $\ell$ passes through $A$, its reflections in $AB$ and $AC$ still pass through $A$, so they meet there, and $A$ is on the circumcircle. Here $H = (0, 1)$ and $\ell$ is $x = 0$; it is perpendicular to $BC$, so its reflection in $BC$ is itself, also through $A$. All three meet at $S = A$.` }
  );
  add("feuerbach-theorem",
    { q: String.raw`For sides $13$, $14$, $15$, the incircle sits inside the nine-point circle almost centered. Measure the gap $NI$, and also $NI_A$ for the excircle on the side $14$.`,
      s: String.raw`$K = 84$ and $s = 21$, so $R = \tfrac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \tfrac{65}8$, $r = 4$, and $r_A = \tfrac{84}{21 - 14} = 12$. Then $NI = \tfrac{65}{16} - 4 = \tfrac1{16}$ and $NI_A = \tfrac{65}{16} + 12 = \tfrac{257}{16}$. Coordinates with $B = (0, 0)$, $C = (14, 0)$, $A = (5, 12)$ give the same two distances.` }
  );
  add("orthocentric-system",
    { q: String.raw`For $A = (0, 6)$, $B = (-3, 0)$, $C = (2, 0)$, find $H$, then check that $A$ is the orthocenter of $HBC$ and that the circumcenter of $HBC$ is the reflection of $O$ in $BC$.`,
      s: String.raw`The altitudes $x = 0$ and $y = \tfrac{x + 3}3$ meet at $H = (0, 1)$. In $HBC$, the altitude from $H$ is $x = 0$ and the altitude from $B$, perpendicular to $HC$, is $y = 2(x + 3)$; they meet at $(0, 6) = A$. The circumcenter of $ABC$ is $O = \left(-\tfrac12, \tfrac52\right)$, and its reflection $\left(-\tfrac12, -\tfrac52\right)$ is $\sqrt{12.5}$ from $H$, $B$ and $C$ alike.` }
  );
  add("spieker-point",
    { q: String.raw`The Spieker point is the incenter of the medial triangle. Check this for $A = (0, 0)$, $B = (12, 0)$, $C = (0, 5)$.`,
      s: String.raw`With $a = 13$, $b = 5$, $c = 12$: $S = \frac{17A + 25B + 18C}{60} = \left(5, \tfrac32\right)$. The medial triangle $(6, 0)$, $\left(6, \tfrac52\right)$, $\left(0, \tfrac52\right)$ has its right angle at $\left(6, \tfrac52\right)$ and sides $6$, $\tfrac52$, $\tfrac{13}2$, so its inradius is $\frac{6 + 5/2 - 13/2}2 = 1 = \tfrac r2$ and its incenter is $\left(6 - 1, \tfrac52 - 1\right) = \left(5, \tfrac32\right)$.` }
  );
  add("perimeter-cleavers",
    { q: String.raw`In the triangle with $AB = 13$, $BC = 14$, $CA = 15$, the cleaver starts at the midpoint $M$ of $BC$. Which side does it end on, and where?`,
      s: String.raw`Half the perimeter is $21$. Going from $M$ through $C$ needs $7 + CX = 21$, so $CX = 14 \le 15$: the cleaver ends on $CA$ with $AX = 1$ (through $B$ it would need $14 \gt 13$). With $B = (0, 0)$, $C = (14, 0)$, $A = (5, 12)$, $X = (5.6, 11.2)$ and $MX$ has direction $(-1, 8)$, parallel to the bisector of angle $A$.` }
  );
  add("butterfly-theorem",
    { q: String.raw`On the radius-$5$ circle about the origin, $y = 3$ cuts a chord bisected at $(0, 3)$. Two more chords pass through that point: $(3, 4)$ to $\left(-\tfrac{24}5, \tfrac75\right)$, and the vertical diameter. Join $(3, 4)$ to $(0, -5)$ and $\left(-\tfrac{24}5, \tfrac75\right)$ to $(0, 5)$; at what $x$ do these joins reach height $3$?`,
      s: String.raw`$AD$ is $y = 3x - 5$, which reaches $y = 3$ at $x = \tfrac83$. The theorem then puts $BC$'s crossing at $x = -\tfrac83$; check: $BC$ is $y = 5 + \tfrac34x$, which is $3$ at $x = -\tfrac83$. So $MX = MY = \tfrac83$.` }
  );
  add("corner-circle-chain",
    { q: String.raw`Circles fill a right angle, each touching both sides and the one before. The first has radius $1$. Find the second.`,
      s: String.raw`The half-angle is $45^\circ$, so the ratio is $\frac{1 + \sin45^\circ}{1 - \sin45^\circ} = \frac{2 + \sqrt2}{2 - \sqrt2} = 3 + 2\sqrt2$, and the second radius is $3 + 2\sqrt2 \approx 5.83$. Check: the centers are $\sqrt2$ and $\sqrt2(3 + 2\sqrt2)$ from the corner, which differ by $2 + 2\sqrt2 = 1 + (3 + 2\sqrt2)$.` }
  );
  add("caseys-theorem",
    { q: String.raw`Shrink all four circles in Casey's Theorem to points on a circle. What does it become? Check it on a $3 \times 4$ rectangle.`,
      s: String.raw`Tangent lengths between point-circles are plain distances, so Casey becomes Ptolemy: $AB \cdot CD + AD \cdot BC = AC \cdot BD$. For the rectangle, $3 \cdot 3 + 4 \cdot 4 = 25 = 5 \cdot 5$.` }
  );
  add("ptolemy-equilateral",
    { q: String.raw`Equilateral $ABC$ has side $7$, and $P$ on arc $BC$ has $PB = 3$. Find $PC$ and $PA$.`,
      s: String.raw`The angle $BPC$ is $120^\circ$, so $49 = 9 + PC^2 + 3PC$, giving $PC^2 + 3PC - 40 = 0$ and $PC = 5$. Then $PA = PB + PC = 8$. Check with Ptolemy on $ABPC$: $PA \cdot 7 = 3 \cdot 7 + 5 \cdot 7$.` }
  );
  add("conic-perpendicular-radii",
    { q: String.raw`Can two points of the hyperbola $\frac{x^2}9 - \frac{y^2}4 = 1$ be seen from its center at a right angle?`,
      s: String.raw`It would need $\frac1{OA^2} + \frac1{OB^2} = \frac19 - \frac14 = -\frac5{36}$, which is negative, so no. The asymptotes make an angle less than $90^\circ$ around the $x$-axis, and every point of the curve lies inside it. Perpendicular radii exist on $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ only when $a \lt b$.` }
  );
})();
