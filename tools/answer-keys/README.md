# Official answer letters for the non-MAA multiple-choice contests

`js/data/problems/answer-keys-more.js` (`window.MATH_EXTRA_KEYS`) is built by these scripts from each contest's posted
solutions (2026-11-22). The MAA papers and the AHSME come from LIVE instead (`tools/fetch-answer-keys.py`).

Run from the repository root; downloads and caches go to `$KEYS_WORK` (default `/tmp/answer-keys-work`):

```bash
mkdir -p /tmp/answer-keys-work/{cemc,umd,utah,col}
node tools/answer-keys/urls.cjs > /tmp/answer-keys-work/urls.json   # the file lists from js/app.js
python3 tools/answer-keys/cemc.py      # Pascal, Cayley, Fermat: "Answer: (X)", 25 per paper or the paper is reported
python3 tools/answer-keys/umd.py       # downloads the UMD solutions; umd2.py parses them
python3 tools/answer-keys/umd2.py      # "the answer is x"; a value alone is matched to the statement's choices
python3 tools/answer-keys/utcol.py     # downloads the Utah and Columbus solutions (its own parse is superseded)
python3 tools/answer-keys/utah2.py     # Utah's five formats, the 2014 key table and the 2013 key
python3 tools/answer-keys/col2.py      # Columbus State's formats and the 2007 key table
python3 tools/answer-keys/flag.py columbus columbus.json col '{y}C'   # keys whose solution text points elsewhere
python3 tools/answer-keys/build.py     # writes answer-keys-more.js, with the corrections listed in it
```

Notes:

- Two CEMC papers are entered by hand in the key file: 1999 Fermat (its solutions place one "ANSWER" away from
  question 5; every answer was matched to the statements) and 2005 Fermat (#25 was flawed and has no key).
- The official 2013 Utah results publish the same numbered answer key for both papers. Junior #24 accepts D, E, or both. Junior #26 accepts A, D, or both. Senior #12 accepts C, D, or both. Practice permits multiple selections throughout those papers and grades the exact submission. [Official results](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2013_Junior_Exam_and_Solutions.pdf)
- The 2012 Utah organizer withdrew Senior #4 after the printed problem asked for ten-digit numbers and #13 after every pizza-cutting choice proved possible. Practice records both withdrawals. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Junior #2, both A (150 m) and D (300 m) received credit for the two readings of when a train emerges. Senior #8 keeps the sole keyed choice B (100 m). The front-only reading gives 75 m and is absent from that paper’s choices. [Junior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC_2012_Junior_Exam_and_Solutions.pdf) · [Senior solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Senior #6, the printed degree-ten polynomial can have ten rational roots with real coefficients, so B follows from the question. The organizers also accepted A after discussing the eight possible Rational Root Theorem candidates for integer coefficients. For #23, the graph gives D because the speeds are equal and the area under car A’s graph is larger. The organizers also accepted A and C. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- In 2012 Utah Senior #28, E gives \(\binom{10}{5}(1/5)^5(4/5)^5\) for the organizer’s model of one correct letter on each of ten questions. Giving #6 two correct letters changes the probability to \(354816/9765625\) if #4 is still counted as a regular question. Omitting #4 gives \(46592/1953125\). Awarding everyone credit on #4 gives \(168448/1953125\). The solutions report that #4 was thrown out and give E as the key for #28. [Official solutions](https://www.weber.edu/wsuimages/statemathcontest/Exams/SMC2012_Senior_Exam_Solutions.pdf)
- The historical 2012 AMC 12B key lists D and E for #12. There are 380 sequences if both symbols must occur, and including the two constant sequences gives 382. Practice accepts either letter. [Archived key](https://artofproblemsolving.com/wiki/index.php/2012_AMC_12B_Answer_Key)
- `flag.py` is a coarse check (a choice's value appearing in the solution text); its flags were read by hand and the
  five strongest were all correct keys. The one official typo found, 2014 Columbus #1 (printed C, the solution's
  own count gives D), is corrected in `build.py` and noted in the key file.
- A question whose solution names no letter is left out and stays self-checked against the official solution.
