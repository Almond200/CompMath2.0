import json, re
K = (__import__('os').environ.get('KEYS_WORK', '/tmp/answer-keys-work') + '/')
cemc = json.load(open(K + 'cemc/keys.json'))
umd = json.load(open(K + 'umd/keys.json'))
utah = json.load(open(K + 'utah.json'))
col = json.load(open(K + 'columbus.json'))
fixes = {
    '2014-columbus-state-tournament-1': ('D', 'The official solutions print "Answer: C" but show 2014 = 2 x 19 x 53 has 8 divisors, choice (D).'),
}
answers, notes = {}, {}
for d in (cemc, umd, utah, col):
    for s, a in d.items():
        if re.fullmatch(r'[A-F]', a): answers[s] = a   # letters only; integer answers wait for short-answer grading
for s, (a, why) in fixes.items():
    answers[s] = a; notes[s] = why
sources = {
    'cemc': 'the CEMC solutions, cemc.uwaterloo.ca (Pascal, Cayley and Fermat, 1998 to 2025)',
    'umd': 'the UMD HSMC Part I solutions, mathcomp.math.umd.edu',
    'utah': 'the Utah State Math Contest solutions and keys, weber.edu/statemathcontest',
    'columbus': 'the Columbus State tournament solutions, columbusstate.edu/math/tournament',
}
body = json.dumps({'answers': dict(sorted(answers.items())), 'notes': notes, 'sources': sources}, indent=1, ensure_ascii=False)
head = ('// Official answer letters for multiple-choice contests outside the MAA (owner, 2026-11-22), read from each\n'
        '// contest\'s posted solutions by tools in the session scratchpad: the CEMC\'s "Answer: (X)" lines, UMD\'s "the answer\n'
        '// is x", Utah\'s keys and "Correct answer" lines, Columbus State\'s "Answer: X". A question whose solution states no\n'
        '// letter, or two, is left out and stays self-checked against the official solution. `notes` records a corrected key.\n'
        '// Separate from answer-keys.js (generated from LIVE) because the two load in no fixed order.\n')
open('/home/user/CompMath2.0/js/data/problems/answer-keys-more.js', 'w').write(head + 'window.MATH_EXTRA_KEYS = ' + body + ';\n')
from collections import Counter
print(len(answers), Counter(re.sub(r'^\d{4}-|-\d+$', '', s).split('-')[0] for s in answers))
