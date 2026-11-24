# Verified answer letters for the non-MAA multiple-choice contests

`js/data/problems/answer-keys-more.js` (`window.MATH_EXTRA_KEYS`) is built by these scripts from each contest's posted
solutions (2026-11-22). The MAA papers and the AHSME come from LIVE instead (`tools/fetch-answer-keys.py`).

Run from the repository root; downloads and caches go to `$KEYS_WORK` (default `/tmp/answer-keys-work`):

```bash
mkdir -p /tmp/answer-keys-work/{cemc,umd,utah,col,ukmt}
node tools/answer-keys/urls.cjs > /tmp/answer-keys-work/urls.json   # the file lists from js/app.js
python3 tools/answer-keys/cemc.py      # Pascal, Cayley, Fermat: "Answer: (X)", 25 per paper or the paper is reported
python3 tools/answer-keys/umd.py       # downloads the UMD solutions; umd2.py parses them
python3 tools/answer-keys/umd2.py      # "the answer is x"; a value alone is matched to the statement's choices
python3 tools/answer-keys/utcol.py     # downloads the Utah and Columbus solutions (its own parse is superseded)
python3 tools/answer-keys/utah2.py     # Utah's five formats, the 2014 key table and the 2013 key
python3 tools/answer-keys/col2.py      # Columbus State's formats and the 2007 key table
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
- `flag.py` is a coarse check (a choice's value appearing in the solution text); its flags were read by hand and the
  five strongest were all correct keys. The one official typo found, 2014 Columbus #1 (printed C, the solution's
  own count gives D), is corrected in `build.py` and noted in the key file.
- A question whose solution names no letter is left out and stays self-checked against the official solution.

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
