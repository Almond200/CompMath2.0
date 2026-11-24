import json, re
from pathlib import Path
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
cemc = json.load(open(K + 'cemc/keys.json'))
umd = json.load(open(K + 'umd/keys.json'))
utah = json.load(open(K + 'utah.json'))
col = json.load(open(K + 'columbus.json'))
ukmt = json.load(open(K + 'ukmt/keys.json'))
# These papers need manual alignment or independent solutions. See the audit notes.
umd_reviewed_papers = {
    1997: 'CEAECDD CBBDBBDBC BCAEADCEC',
    1998: 'DBABBCAADCECADCDBBDEDBBDE',
}
umd_reviewed_choices = {
    1999: {16: 'E', 17: 'C', 21: 'D', 23: 'D', 25: 'C'},
    2010: {21: 'D'},
    2011: {22: 'B'},
    2012: {7: 'E'},
    2013: {21: 'C'},
    2014: {11: 'C'},
    2015: {17: 'C', 20: 'A', 24: 'D'},
    2016: {4: 'C'},
    2025: {15: 'E', 16: 'A'},
}
for year, letters in umd_reviewed_papers.items():
    letters = letters.replace(' ', '')
    if not re.fullmatch(r'[A-E]{25}', letters):
        raise ValueError(f'Incomplete reviewed Maryland paper: {year}')
    umd_reviewed_choices[year] = dict(enumerate(letters, 1))
for year, choices in umd_reviewed_choices.items():
    for number, letter in choices.items():
        umd[f'{year}-umd-hsmc-part-i-{number}'] = letter
# Read choices in paper order from the official marked or worked PDFs. The 2022
# paper was solved independently. A dash marks a void question.
columbus_reviewed_papers = {
    2003: (50, 'EDDCBDCEABDADBEDCDDDEEACEBABECADACCDBBBADEEDAEDADE'),
    2006: (54, 'DEBBDABCACCADADAAEEACDBABEDDCDCAABAACBDAACAEDCCDCDCCCA'),
    2007: (50, 'EADDEAABCCEAEDBBDBCBCAADACACBDBEBDCCACCCEDDACBBDED'),
    2009: (50, 'DABCDAACCEAABEBEEABBBDCBECEDEBCCCBDDDDAEBEAADDEABD'),
    2012: (50, 'CDDCCDEBCBDABADCCCCECDADEECBECACCBAECDAAAACCEDEDAB'),
    2015: (50, 'BCBEBABEDDADDEEBACDCAEDACBBACD-BBCDBAAEABBDCABDCBA'),
    2022: (30, 'EDCBCECABBBDFEFBAFFABCDFABC-EB'),
}
for year, (count, letters) in columbus_reviewed_papers.items():
    if len(letters) != count or not re.fullmatch(r'[A-F-]+', letters):
        raise ValueError(f'Incomplete reviewed Columbus paper: {year}')
    for number, letter in enumerate(letters, 1):
        if letter != '-':
            col[f'{year}-columbus-state-tournament-{number}'] = letter
columbus_reviewed_choices = {
    2002: {
        3: 'E', 4: 'E', 8: 'E', 12: 'B', 13: 'A', 16: 'A', 19: 'B', 23: 'E',
        25: 'E', 27: 'B', 29: 'A', 30: 'C', 31: 'A', 33: 'D', 34: 'A', 35: 'B',
        36: 'B', 37: 'E', 38: 'C', 39: 'E', 40: 'C', 41: 'E', 42: 'B', 43: 'E',
        44: 'C', 45: 'B', 46: 'D', 47: 'C', 48: 'C', 49: 'E', 50: 'D',
    },
    2004: {2: 'A', 5: 'B', 10: 'E', 11: 'A', 16: 'A', 20: 'E', 24: 'E', 26: 'B', 31: 'B'},
    2011: {13: 'E'},
    2013: {19: 'A'},
    2016: {24: 'C'},
    2019: {
        1: 'D', 3: 'C', 4: 'B', 5: 'D', 8: 'E', 10: 'C', 16: 'D', 19: 'C',
        21: 'A', 25: 'A', 26: 'C', 28: 'D', 42: 'D', 45: 'E', 48: 'D',
    },
    2021: {4: 'A', 6: 'E', 7: 'A', 10: 'B', 13: 'E', 23: 'A', 24: 'B', 28: 'B', 30: 'C'},
}
for year, choices in columbus_reviewed_choices.items():
    for number, letter in choices.items():
        col[f'{year}-columbus-state-tournament-{number}'] = letter
fixes = {
    '1997-umd-hsmc-part-i-25': ('C', 'If one species may be absent, the largest unique total is 31 extremities from three elephants and four hippopotamuses. If the herd must contain both species, the largest unique total is 40 from four elephants and five hippopotamuses. Practice accepts C or D.'),
    '1998-umd-hsmc-part-i-16': ('D', 'The official solution says 250. In fact, 1,000 − 9³ = 271 numbers have at least one 7. Both counts fall in the interval given by D.'),
    '2002-columbus-state-tournament-43': ('E', 'The official reasoning gives a = −2. The sum of the real roots is −a = 2, which is choice E. The solution prints C, which is the letter for −2.'),
    '2003-columbus-state-tournament-15': ('E', 'Choice E gives m = 13, for which the equation has no solution. The values −2 and 3 also eliminate the only candidate through a zero denominator. They are absent from the choices.'),
    '2003-columbus-state-tournament-26': ('B', 'The original paper has ac² + b² = 2003. The consecutive integers are 11, 12, and 13, so 2a + 4b − 5c = 5.'),
    '2005-fermat-contest-25': ('B', 'Practice shows the CEMC’s corrected question, which requires p to be positive. It has 57 valid values of q. The original wording allowed any integer p and had 10,000 valid values.'),
    '2009-columbus-state-tournament-17': ('E', 'The restored answer choices include 889. The last three digits of 3^98 are 889.'),
    '2012-utah-state-math-contest-junior-2': ('D', 'The organizers also accepted A. The train is 150 m if its front emerges at 20 seconds, and 300 m if its rear emerges then.'),
    '2012-utah-state-math-contest-senior-6': ('B', 'The printed polynomial can have ten rational roots, choice B. The organizers also credited A after discussing the eight candidates supplied by the Rational Root Theorem under an integer-coefficient assumption.'),
    '2012-utah-state-math-contest-senior-8': ('B', 'Choice B uses the time when the whole train emerges. If it refers to the front of the train, its length is 75 m, which is absent from the choices.'),
    '2012-utah-state-math-contest-senior-23': ('D', 'At time C the speeds match, and the area under Car A’s speed graph is greater, so D follows from the graph. The organizers also credited A and C.'),
    '2012-utah-state-math-contest-senior-28': ('E', 'The official calculation assumes that all ten questions have exactly one correct letter. The organizers accepted two answers on #6 and withdrew #4, so the probability under that scoring policy differs.'),
    '2014-columbus-state-tournament-1': ('D', 'The official solutions print "Answer: C" but show 2014 = 2 x 19 x 53 has 8 divisors, choice (D).'),
    '2014-utah-state-math-contest-junior-20': ('B', 'The official table labels its last entry #20 a second time. The actual #20 gives 1/4 using the same summation convention as the prompt.'),
    '2014-utah-state-math-contest-junior-30': ('D', 'The official table labels #30 as #20. Of the two-hour arrival square, 19% lies within 12 minutes of the diagonal.'),
    '2014-utah-state-math-contest-senior-20': ('B', 'The official table labels its last entry #20 a second time. In the actual #20, choosing n from −a introduces the factor (−1)^n.'),
    '2014-utah-state-math-contest-senior-30': ('C', 'The official table labels #30 as #20. Subtracting the 76% who meet both conditions from the 81% who have never missed work gives 5%.'),
    '2015-columbus-state-tournament-36': ('B', 'Practice makes the midpoint construction and the stated total of 2,015 triangles explicit. The official solution follows the diagram for the scale factor but sums 2,016 terms, giving C for that different count.'),
    '2015-columbus-state-tournament-49': ('B', 'Both the $140 budget and 72-square-foot space allowance may be used in full. Only B uses the correct storage coefficients and both inclusive inequalities.'),
    '2016-utah-state-math-contest-junior-12': ('A', 'The official answer counts 10 checkered pieces, including their colors. Ignoring the colors gives seven shapes when only rotations and translations are allowed.'),
    '2016-utah-state-math-contest-junior-13': ('B', 'Both averages rise when the departing school is strictly smaller than the 5A average and strictly larger than the 4A average. Ties can leave an average unchanged, so E also earns credit.'),
    '2016-utah-state-math-contest-senior-11': ('A', 'The official answer counts 10 checkered pieces, including their colors. Ignoring the colors gives seven shapes when only rotations and translations are allowed.'),
    '2019-utah-state-math-contest-junior-27': ('E', 'The official key assumes the two colors are independent, giving 7/16. The prompt gives equal color probabilities and leaves dependence unspecified.'),
    '2019-utah-state-math-contest-senior-30': ('E', 'The official key assumes the two colors are independent, giving 7/16. The prompt gives equal color probabilities and leaves dependence unspecified.'),
    '2019-columbus-state-tournament-21': ('A', 'The contest paper allows b = 1, as Practice does. The expression is minimized at a = 2018 and b = 1, giving units digit 1. The solution packet uses b > 1 and gives 4 under that different condition.'),
    '2021-pascal-contest-25': ('E', 'The CEMC’s original choices omitted the correct value, 22. Practice shows the corrected choices with 22 as E.'),
    '2022-columbus-state-tournament-18': ('F', 'The prompt defines an intersection X, so the key conditions on the rays meeting. They meet with probability 1/4 and meet within 1 of O with probability 1/8, giving a conditional probability of 1/2.'),
}
choice_answers = {
    '1997-umd-hsmc-part-i-25': ['C', 'D'],
    '2012-utah-state-math-contest-junior-2': ['A', 'D'],
    '2012-utah-state-math-contest-senior-6': ['A', 'B'],
    '2012-utah-state-math-contest-senior-23': ['A', 'C', 'D'],
    '2013-utah-state-math-contest-junior-24': ['D', 'E', 'DE'],
    '2013-utah-state-math-contest-junior-26': ['A', 'D', 'AD'],
    '2013-utah-state-math-contest-senior-12': ['C', 'D', 'CD'],
    '2016-utah-state-math-contest-junior-13': ['B', 'E'],
}
multiple_choice_papers = ['2013-utah-state-math-contest-junior', '2013-utah-state-math-contest-senior']
voided = {
    '2011-umd-hsmc-part-i-18': 'Organizer ruling. Everyone received full credit because the choices omit the correct count of 78 reachable final boards.',
    '2018-umd-hsmc-part-i-7': 'Organizer ruling. Everyone received full credit because the choices omit the correct count of 21 straight-line clock-hand alignments.',
    '2022-columbus-state-tournament-28': 'Practice ruling. None of the choices is correct. The perimeter can approach 2,778, and every nondegenerate triangle has a larger perimeter.',
    '2012-utah-state-math-contest-senior-4': 'Organizer ruling. The organizers withdrew the question because it asked for ten-digit numbers where the intended question used fifteen digits.',
    '2012-utah-state-math-contest-senior-13': 'Organizer ruling. The organizers withdrew the question because all five listed numbers of pieces are possible. The intended question asked for the maximum.',
    '2015-columbus-state-tournament-31': 'Practice ruling. The printed angles and lengths are incompatible. The angles give BD/AD ≈ 2.879 and the lengths give BD/AD = 3.',
}
answers, notes = {}, {}
for d in (cemc, umd, utah, col, ukmt):
    for s, a in d.items():
        if re.fullmatch(r'[A-F]', a): answers[s] = a   # letters only; integer answers wait for short-answer grading
for s in voided:
    answers.pop(s, None)
for s, (a, why) in fixes.items():
    answers[s] = a; notes[s] = why
sources = {
    'cemc': 'the CEMC solutions, cemc.uwaterloo.ca (Pascal, Cayley and Fermat, 1998 to 2025)',
    'umd': 'the UMD HSMC Part I solutions and independent solutions for the 1997 paper, mathcomp.math.umd.edu',
    'utah': 'the Utah State Math Contest solutions and keys, weber.edu/statemathcontest',
    'columbus': 'the Columbus State tournament solutions and independent solutions, columbusstate.edu/math/tournament',
    'ukmt': 'the UK Mathematics Trust solution PDFs for all indexed Junior, Intermediate, and Senior Mathematical Challenges',
}
body = json.dumps({'answers': dict(sorted(answers.items())), 'choiceAnswers': choice_answers,
                   'multipleChoicePapers': multiple_choice_papers, 'voided': voided, 'notes': notes,
                   'sources': sources}, indent=1, ensure_ascii=False)
head = ('// Verified answer letters for multiple-choice contests outside the MAA, built by tools/answer-keys/\n'
        '// (see its README for official sources and independent solutions). `choiceAnswers` records complete accepted\n'
        '// submissions for questions with multiple accepted choices. `voided` records withdrawals and `notes` records corrections.\n'
        '// Separate from answer-keys.js (generated from LIVE) because the two load in no fixed order.\n')
output = Path(__file__).resolve().parents[2] / 'js/data/problems/answer-keys-more.js'
output.write_text(head + 'window.MATH_EXTRA_KEYS = ' + body + ';\n')
from collections import Counter
print(len(answers), Counter(re.sub(r'^\d{4}-|-\d+$', '', s).split('-')[0] for s in answers))
