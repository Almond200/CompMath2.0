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
- Utah 2013 Junior #24 and #26 and Senior #12 accepted two letters at the contest, so they are left self-checked.
- `flag.py` is a coarse check (a choice's value appearing in the solution text); its flags were read by hand and the
  five strongest were all correct keys. The one official typo found, 2014 Columbus #1 (printed C, the solution's
  own count gives D), is corrected in `build.py` and noted in the key file.
- A question whose solution names no letter is left out and stays self-checked against the official solution.
