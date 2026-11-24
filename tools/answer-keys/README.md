# Verified answer letters for the non-MAA multiple-choice contests

`js/data/problems/answer-keys-more.js` (`window.MATH_EXTRA_KEYS`) combines organizer keys, worked answers matched to choices, and the independent solutions documented here. The MAA papers and the AHSME come from LIVE (`tools/fetch-answer-keys.py`), with separately documented exceptions.

When a question accepts multiple individual choices, Practice gives full credit for any nonempty selection made up of those choices.

Run from the repository root; downloads and caches go to `$KEYS_WORK` (default `/tmp/answer-keys-work`):

```bash
mkdir -p /tmp/answer-keys-work/{cemc,umd,utah,col,ukmt}
node tools/answer-keys/urls.cjs > /tmp/answer-keys-work/urls.json   # the file lists from js/app.js
python3 tools/answer-keys/cemc.py      # Pascal, Cayley, Fermat: "Answer: (X)", 25 per paper or the paper is reported
python3 tools/answer-keys/umd.py       # downloads the UMD solutions; umd2.py parses them
python3 tools/answer-keys/umd2.py      # "the answer is x"; a value alone is matched to the statement's choices
python3 tools/answer-keys/utcol.py     # downloads the Utah and Columbus solutions (its own parse is superseded)
python3 tools/answer-keys/utah2.py     # Utah's five formats, the 2014 key table and the 2013 key
python3 tools/answer-keys/col2.py      # imports Columbus State's explicitly printed answer letters
python3 tools/answer-keys/flag.py columbus columbus.json col '{y}C'   # keys whose solution text points elsewhere
python3 tools/answer-keys/ukmt.py      # reads the cached numbered official UKMT solution PDFs
python3 tools/answer-keys/build.py     # writes answer-keys-more.js, with the corrections listed in it
```

For the UKMT import, save each solution PDF in the ukmt subdirectory of KEYS_WORK as <paper>-solutions.pdf, for example 2015-ukmt-imc-solutions.pdf. Use the extended PDF when the short PDF is unavailable. The parser also reads the cover of 2026-ukmt-smc-paper.pdf to verify the date, which is absent from its solution leaflet. It checks the contest and the 25 ordered answers and writes letter choices and typed values to separate files. The generated multiple-choice registry uses the letter file. [Official UKMT archive](https://ukmt.org.uk/competitions/)

Notes:

- The 1999 Fermat solutions place one answer label away from question 5. Its keys were matched to the statements by hand.
- The displayed 2005 Fermat #25 includes the CEMC's correction requiring positive \(p\), so Practice grades B (57). For positive \(p\) the slope equation is quadratic and has one root when \((p-q)^2=12q\), giving \(q=3k^2\) and 57 possibilities. The original wording allowed all integers \(p\), which gives 10,000 possibilities. [Corrected paper](https://cemc.uwaterloo.ca/sites/default/files/documents/2005/2005FermatContest.pdf) · [Official solutions](https://cemc.uwaterloo.ca/sites/default/files/documents/2005/2005FermatSolution.pdf)
- The revised 2021 Pascal #25 displays choice E (22). The original choices omitted 22. The retained sum times 16 implies that \(n-4\) is a multiple of 16, and the average bounds force \(n=180\). Enumerating distinct \(p,q,r,s>100\) with sum 527 and a consecutive triple confirms 22 possible values of \(s\). [Corrected paper](https://cemc.uwaterloo.ca/sites/default/files/documents/2021/2021PascalContest.html) · [Official solutions](https://cemc.uwaterloo.ca/sites/default/files/documents/2021/2021PascalSolution.pdf)
- The 2009 Columbus #17 import restores the five choices. Modulo 1,000, \(3^{100}\equiv1\), so \(3^{98}\equiv9^{-1}\equiv889\), choice E. [Official paper](https://www.columbusstate.edu/math/_docs/tournament/2009individual.pdf)
- The official 2013 Utah results publish the same numbered answer key for both papers. Junior #24 accepts D, E, or both. Junior #26 accepts A, D, or both. Senior #12 accepts C, D, or both. Practice permits multiple selections throughout those papers and grades the exact submission. [Official results](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2013_Junior_Exam_and_Solutions.pdf)
- The 2012 Utah organizer withdrew Senior #4 after the printed problem asked for ten-digit numbers and #13 after every pizza-cutting choice proved possible. Practice records both withdrawals. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Junior #2, both A (150 m) and D (300 m) received credit for the two readings of when a train emerges. Senior #8 keeps the sole keyed choice B (100 m). The front-only reading gives 75 m and is absent from that paper’s choices. [Junior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2012_Junior_Exam_and_Solutions.pdf) · [Senior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Senior #6, the printed degree-ten polynomial can have ten rational roots with real coefficients, so B follows from the question. The organizers also accepted A after discussing the eight possible Rational Root Theorem candidates for integer coefficients. For #23, the graph gives D because the speeds are equal and the area under car A’s graph is larger. The organizers also accepted A and C. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Senior #28, E gives \(\binom{10}{5}(1/5)^5(4/5)^5\) for the organizer’s model of one correct letter on each of ten questions. Giving #6 two correct letters changes the probability to \(354816/9765625\) if #4 is still counted as a regular question. Omitting #4 gives \(46592/1953125\). Awarding everyone credit on #4 gives \(168448/1953125\). The solutions report that #4 was thrown out and give E as the key for #28. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- The 2014 Utah answer table misprints #30 as #20 for both tests. The earlier #20 entries are B. Junior #30 is D because uniform independent arrival times differ by at most 12 minutes on \(1-(108/120)^2=19\%\) of the sample space. Senior #30 is C because \(81\%-76\%=5\%\). [Official answer table](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2014_Junior_Exam_and_Solutions.pdf)
- The 2016 Utah tetromino questions (Junior #12 and Senior #11) count 10 pieces when their checkerboard colors are retained. The seven shapes up to translation and rotation yield two colorings each for T and the two reflected L shapes, and one each for the line, square, and two reflected zigzags. In Junior #13 the official B assumes strict differences at the school-size boundary. Ties can leave one or both averages unchanged, so Practice also credits E. [Junior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2016_Junior_Exam_Solutions.pdf) · [Senior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2016_Senior_Exam_Solutions.pdf)
- The 2019 Utah packets give 40 explicitly numbered choices for each paper. Junior #27 and Senior #30 use the organizer's independence assumption for the candy colors, giving E and \(7/16\). The wording permits dependent colors. The review explains the assumption. [Junior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2019_Junior_Exam_and_Solutions.pdf) · [Senior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2019_Senior_Exam_and_Solutions(1).pdf)
- The UKMT keys cover all 29 indexed papers. The 2026 Senior paper has 22 letter answers and three typed answers. Its paper and numbered solutions confirm that split. Primary PDFs were checked from archived copies when the organizer's direct download returned a browser challenge. Secondary data agreed with 672 letters. The 2013 Senior key comes from the archived official extended solutions. The 2015 Intermediate official leaflet supersedes a secondary table with placeholder A's. [2013 Senior solutions](https://ukmt.org.uk/wp-content/uploads/2024/04/SMC-2013-sol-extended.pdf) · [2015 Intermediate solutions](https://ukmt.org.uk/wp-content/uploads/2023/08/imc-2015-s.pdf) · [2026 Senior solutions](https://ukmt.org.uk/wp-content/uploads/2026/07/SMC_2026_Solutions.pdf)
- The 1998 Maryland solution packet swaps #3 and #7 and sequences the worked solutions to displayed #11–14 as #14, #11, #12, #13. The importer uses the order on the question paper. For #16, counting three-digit strings with leading zeros gives 271 instead of the printed 250. Both are in choice D's interval. For #25 the worked value is exactly \(2\sqrt6/3\), choice E. [Official paper](https://mathcomp.math.umd.edu/files/2021/12/PartI1998.pdf) · [Official solutions](https://mathcomp.math.umd.edu/files/2021/12/PartI1998Solns.pdf)
- The 2011 Maryland #18 and 2018 Maryland #7 organizers awarded full credit after the correct answers, 78 and 21, were omitted from the choices. Practice records both as void. [2011 solutions](https://mathcomp.math.umd.edu/files/2021/08/PartI2011Solns.pdf) · [2018 solutions](https://mathcomp.math.umd.edu/files/2021/08/PartI2018Solns.pdf)
- The historical 2012 AMC 12B key lists D and E for #12. There are 380 sequences if both symbols must occur, and including the two constant sequences gives 382. Practice accepts either letter. [Archived key](https://artofproblemsolving.com/wiki/index.php/2012_AMC_12B_Answer_Key)
- For a future 2008 Utah import, Junior #20 and Senior #16 print the same coin problem. The available organizer solution scans mark C (85%). Even with uniform selection from the purse, the counts permit 40 or 45 pennies, giving 80% or 90%. Thus E (insufficient information) follows from the wording. Verify the reported historical acceptance of both C and E against a separate results sheet before describing it as official. [Junior scan, PDF page 13](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2008_Junior_Exam_Solutions.pdf#page=13) · [Senior scan, PDF page 11](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2008_Senior_Exam_Solutions.pdf#page=11)
- The Columbus imports read the rendered 2003 solution pages, the boxed choices for 2007 and 2015, the letter at the start of each 2009 solution, and the yellow highlights for 2012. The 2006 solution values were matched to the choices for #1–50. #51–54 were independently solved. The few boxes that overlapped another label or were absent were checked against the question and worked solution. [2003 solutions](https://www.columbusstate.edu/math/_docs/tournament/03solutions.pdf) · [2006 solutions](https://www.columbusstate.edu/math/_docs/tournament/test-2006-final-version-solutions.pdf) · [2007 marked paper](https://www.columbusstate.edu/math/_docs/tournament/test_2007_final_version_with_answers_circled.pdf) · [2009 solutions](https://www.columbusstate.edu/math/_docs/tournament/Solutions2009individual.pdf) · [2012 solutions](https://www.columbusstate.edu/math/_docs/tournament/MATH-_TOURNAMENT_2012_INDIVIDUAL_TEST_SOLUTIONS.pdf) · [2015 solutions](https://www.columbusstate.edu/math/_docs/tournament/IndividualTest2015solutions.pdf)
- In **2006 Columbus #51**, setting \(t=\log_2(2x)\) gives \((t+1)(t+2)=0\), so the product is \(1/32\), choice C. **#52** differentiates to \(\cos x/|\cos x|\) where defined, choice C. In **#53**, applying the row transformation multiplies the determinant by \(\det(J-I)=2\), giving 12, choice C. The face centers in **#54** are the original vertices scaled by \(-1/3\) about the centroid, so the volume ratio is 27, choice A. [Official paper](https://www.columbusstate.edu/math/_docs/tournament/test-2006-final-version.pdf)
- **2002 Columbus #43** keys E (2). The organizer derives \(a=-2\), so the root sum is 2. Its printed C is the choice for −2. [Paper](https://www.columbusstate.edu/math/_docs/tournament/02wexam.PDF) · [Solutions](https://www.columbusstate.edu/math/_docs/tournament/solutionsPDF.pdf)
- **2003 Columbus #15** keys E (13). The organizers also identify \(m=-2\) and \(m=3\), both absent from the choices. **#26** restores the source's exponent in \(ac^2+b^2=2003\). The consecutive integers are 11, 12, and 13, which give B (5). [Paper](https://www.columbusstate.edu/math/_docs/tournament/03WrittenFD.pdf) · [Solutions](https://www.columbusstate.edu/math/_docs/tournament/03solutions.pdf)
- **2014 Columbus #1** keys D (8), from the divisors of \(2014=2\cdot19\cdot53\). The worked count is 8 and the official letter says C. [Official solutions](https://www.columbusstate.edu/math/_docs/tournament/MathTournament2014IndividualTestSolutions.pdf)
- **2015 Columbus #31** is void in Practice. The exact lengths imply \(BD/AD=3\), while the exact angles require \(BD/AD=\sin(100^\circ)/\sin(20^\circ)\approx2.879\). **#36** follows the diagram's midpoint construction and the displayed list of 2,015 triangles. Their perimeter sum is B, \(3(2^{2015}-1)/2^{2014}\). The solution sums 2,016 triangles. **#49** keys B. The published box spans part of the next column. The budget and floor-space conditions both allow equality. [Paper](https://www.columbusstate.edu/math/_docs/tournament/IndividualTest2015.pdf) · [Solutions](https://www.columbusstate.edu/math/_docs/tournament/IndividualTest2015solutions.pdf)
- **2019 Columbus #21** keys A. The administered paper allows \(b=1\) and the solution packet changes the restriction to \(b>1\). The expression increases with \(b/a\), so the first version gives \((a,b)=(2018,1)\) and the units digit of 2,021. [Paper](https://www.columbusstate.edu/math/_docs/tournament/2019-individual-exam.pdf) · [Solutions](https://www.columbusstate.edu/math/_docs/tournament/2019-individual-solutions.pdf)
- The 2014 Utah answer diagrams were checked when the choices appeared only in figures. The Venn-diagram option figure for Junior #3 and Senior #2 has a new crop with the full A label. [Official paper](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2014_Junior_Exam.pdf)

### Independently solved 1997 Maryland Part I

The organizer archive lists the question paper. The keys below were derived from that paper and checked against its choices. Practice credits both readings of #25. [Official paper](https://mathcomp.math.umd.edu/files/2021/12/PartI1997.pdf) · [Organizer archive](https://mathcomp.math.umd.edu/past-contests/)

| # | Choice | Calculation |
| --- | --- | --- |
| 1 | C | \(3^{22}=9^{11}>8^{11}=2^{33}\), greater than each other option. |
| 2 | E | Compare \(100/13,128/14,100/15\) after removing the shared factor \(\pi\). |
| 3 | A | The longer-to-shorter ratio \(r\) obeys \(r=2/r\). |
| 4 | E | The first two terms coincide, and \(50^{\log 2}=2\cdot5^{\log 2}\). |
| 5 | C | The lines form a triangle of base 9 on the \(y\)-axis and horizontal height 3. |
| 6 | D | The contributions differ by 5¢ per rooster and \(\$8.80\) in total, giving 176. |
| 7 | D | \(b\) is a perfect cube. The cubes are 1, 8, 27, and 64. |
| 8 | C | Equal distances give the harmonic mean of 7 and 5 hours, or 350 minutes. |
| 9 | B | The four rotations fix 36, 0, 4, and 0 pairs of red cells. Their average is 10. |
| 10 | B | The wheel rolls through \(1000/\pi\) revolutions, about 318. |
| 11 | D | The mean of the three vertices is \((432,305)\). |
| 12 | B | Three choices for the first lamp and two for each of the next six give 192. |
| 13 | B | The rates sum to \(1/20+1/24+1/30=1/8\). |
| 14 | D | Enumerating the 15 pairs leaves B and D as the only pair with four one-hit reports and one zero-hit report. |
| 15 | B | The successive cuts add at most 1, 2, 3, and 4 pieces, each achievable. |
| 16 | C | The dates are \(30+k\) days apart and \(2k\le31\), so \(k=5,12\). |
| 17 | B | Pages 1–99 use 189 digits. The remaining 2,133 digits number 711 pages. |
| 18 | C | With \(t=\cos x\), the equation becomes \((t+1)(4t^2-2t-1)=0\); all three roots lie in \([-1,1]\). |
| 19 | A | Each projection halves the corresponding distance from Y, so the area scales by \(1/4\) per step. |
| 20 | E | Coefficient comparison gives \((a,b,c)=(-1,-1,1)\), hence \(P(2)=9\). |
| 21 | A | A relative speed of 150 m in 3 s is 180 km/h, leaving 100 km/h for the other train. |
| 22 | D | Working backward leaves 120 pages before day 3, 200 before day 2, and 270 in total. |
| 23 | C | Each count is a difference of integer square roots of consecutive powers of 10; the ratio is about \(\sqrt{10}\). |
| 24 | E | After division by \(X^2\), \(t=X+1/X\) obeys \((t-1)(t-3)=0\). The larger real root comes from \(t=3\). |
| 25 | C or D | The counts can be shifted by \((4,-5)\). With zero allowed, the maximum unique total is 31, from \((3,4)\). Requiring both species gives 40, from \((4,5)\). |

### Independently solved 2022 Columbus tests

The organizer archive links three packets of ten questions. These keys were derived against the printed choices. Enumeration cross-checks covered the relatively prime integers, grasshopper steps, sequence, Diophantine pairs, and smallest common denominator. [Test 1](https://www.columbusstate.edu/math/_docs/tournament/2022-tournament-test-1.pdf) · [Test 2](https://www.columbusstate.edu/math/_docs/tournament/2022-tournament-test-2.pdf) · [Test 3](https://www.columbusstate.edu/math/_docs/tournament/2022-tournament-test-3.pdf)

| # | Choice | Calculation |
| --- | --- | --- |
| 1 | E | Pappus's theorem gives volume \(2\pi\int_0^1(2x-2x^2)^2/(2\sqrt2)\,dx=\pi\sqrt2/15\). |
| 2 | D | There are 672 coprime residues. Pairing \(k\) with \(2022-k\) gives \(N=336\) and digit sum 12. |
| 3 | C | For \(A=(0,4),B=(-3,0),C=(3,0)\), projecting \(F=A+t(B-A)\) onto the next three sides fixes \(t=7/43\). Then \(FA=35/43\). |
| 4 | B | The positive lengths are 7 and 25. Similar trapezoids give \((25^2-x^2)/(x^2-7^2)=7\), so \(x=11\). |
| 5 | C | \(\log f(x)=((1-x)\log(1-x)+(1+x)\log(1+x))/2\) has quadratic term \(x^2/2\). |
| 6 | E | Expand using \(\sin^2x+\cos^2x=1\) to get \(2(1-\sin x)(1-\cos x)\). |
| 7 | C | At \(r=1/\sqrt2\), the interiors of the corner-overlap events are disjoint, giving \(P=1/2\). Substitution and irrationality of \(\pi\) give \(m=3,n=2\). |
| 8 | A | Each step raises \(x+y\) by at most 7. The bound 578 is achieved with 291 steps \((3,4)\), 286 steps \((4,3)\), and one \((5,0)\). |
| 9 | B | With \(B=(0,0),C=(20,0)\), one gets \(A=(5/8,5\sqrt{63}/8)\). The inner center lies \(9/25\) of the way from A to the outer center. Its projection D gives \(AD=6\). |
| 10 | B | The power ratio tends uniformly to 1 on \([0,1/2]\). The remaining integral is \(\int_0^{1/2}(1-\log(1-x))dx=1-(\log 2)/2\). |
| 11 | B | Repeatedly choosing the smallest unused coprime integer gives \(x_{212}=221\). |
| 12 | D | The labeled 5-cycle has \(4^5-4=1020\) proper colorings from a five-color palette. |
| 13 | F | Set \(u=BM,v=DN\). The angle gives \(u+v+uv=1\). Then \(MN^2=(u+v)^2\), so \(uv=1/6\). |
| 14 | E | The two nonfixed roots form a two-cycle. This gives \(b=-1,c=-4/9\) and \(3\sqrt{b^2-4c}=5\). |
| 15 | F | The sum of the three seventh roots has real part \(-1/2\), modulus squared 2, and positive imaginary part. Thus \(m+n=-1+7=6\). |
| 16 | B | Complementary divisor ranks give 41 divisors, so the even number is \(2^{40}\), with residue 2 modulo 7. |
| 17 | A | The cubic factorization on the plane gives \(x^2+y^2+z^2=109\). The center \((6,6,6)\) has squared norm 108, giving radius 1. |
| 18 | F | Fix the angle \(\theta\) of the first ray in \([-\pi,\pi]\). Intersection has angular range \(\pi-|\theta|\), and intersection inside the disk has half that range. Conditional on the intersection named in the question, the probability is \(1/2\). |
| 19 | F | Checking multiples of 2021 in order gives the first with substring 2022 at \(N=382\), producing 772022. |
| 20 | A | Write \(s=x+y+z\). Then \(x^2+y^2+z^2=s^2/2\), so \(|z-x|\le|s|\), while \(z-x=-2022s\). Thus \(s=0\). |
| 21 | B | Set \(b_n=e^{a_n}\). The increments \(b_n(e^{1/b_n}-1)\) are at least 1 and tend to 1. Their averages give the limit 1. |
| 22 | C | Differentiation gives \((3f'-f^2)^2=0\). Since \(1/f(0)=674\), integration gives \(1/f(3)=673\). |
| 23 | D | Testing \(405\le a\le808\) in \(b=2022a/(5a-2022)\) gives \(a=405,408,674\). |
| 24 | F | The interval at \(m=2021\) forces \(n\ge4045\). At 4045, \(k=2m+1\) lies strictly between the required bounds for every \(m\). |
| 25 | A | The ratio density is \(1/2\) below 1 and \(1/(2t^2)\) above 1. Integrating the odd rounding bands gives \((\pi-1)/4\). |
| 26 | B | \((f^2+(f')^2)'=-2(x^3-x^2+x)(f')^2\). The energy is maximal at 0, where \(f=2\). |
| 27 | C | The shoelace centroid formula gives \(x_G=31/24\). |
| 28 | Void | By the triangle inequality the perimeter is at least \(2AC\ge2\cdot1389=2778\). Choose \(C=(339,0)\) and let B approach \((339,339)\) along \(y=x\) to approach 2778. Equality requires a degenerate triangle. The reflected straight line that gives 2,022 misses \(y=x\), and none of the choices is the infimum. |
| 29 | E | The circumcenter \((1/2,1/2,1)\) gives \(R^2=3/2\). Surface area 4 and volume \(1/3\) give \(r=1/4\). |
| 30 | B | The six bricks supported by the bottom brick balance with their center of mass above its edge. The second brick overhangs it by \(1/6\). |

### Final multiple-choice coverage

Of the 10,936 indexed multiple-choice problems, 10,929 have verified automatic grades and seven are void. The voids are 2025 AMC 12A #25, 2011 Maryland #18, 2018 Maryland #7, 2012 Utah Senior #4 and #13, 2015 Columbus #31, and 2022 Columbus #28. The short-response audit and its 23 documented self-checks are recorded in [short-answers.md](short-answers.md).
