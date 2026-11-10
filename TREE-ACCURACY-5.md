# High-value-node audit 5: GCD/LCM and divisor counts

2026-11-10. Read all **93 distinct problems / 104 entries** filed under GCD and LCM of numbers (50 distinct) or The number of divisors (43 distinct). These pools were disjoint. Read each statement and strategy, including recognized twins as shared routes; original source art was not visually re-audited. This is a focused review, not a complete second mathematical audit of the corpus.

Correct **55 distinct problems / 63 entries** across the two batches. Most changes remove intermediate-tool labels or recover a missing subject/card. Complete four mathematical explanations and clarify one source age assumption (six raw explanation entries because the age problem has a twin). Every intended answer, credited statement, card, home and surviving tree id is preserved. No node is added or retired.

| Pool | Before distinct | After distinct |
|---|---:|---:|
| GCD and LCM of numbers | 50 | 25 |
| The number of divisors | 43 | 35 |

## Decisions and correctness

- Keep explicit gcd/lcm constraints and common-multiple archetypes. Fraction simplification, prices, proportional quantities, grid walks, track returns, cycles and modular reconstruction do not gain a second subject solely because their solution uses a gcd/lcm. Common-remainder systems use their existing congruence-system kind.
- Keep actual divisor counts, prescribed divisor counts and random divisor samples. A divisor-count formula used to finish an infinite series, harmonic-mean equation, exponential equation, base-digit condition or floor sum remains a card on that route rather than an extra subject.
- Keep actual factorial inputs under Factorials and divisibility rather than labeling the Legendre calculation as the subject. The factorial GCD comparison and the three power/probability divisor questions retain this stated structure. Count requested logarithmic divisor products under divisor products and log equations. Keep positive factorization tuples distinct from the number of divisors of one number.
- Add earned probability, power-divisor, age, divisor-product and congruence cards that were missing. The 2023 clock grid route uses existing Congruence Rules, whose cancellation rule supplies the additive coprimality criterion; no new card is needed.
- **1996 AIME #14:** count internal plane crossings, pair/triple coincidences and the initial cube explicitly. The old explanation counted boundary planes as crossings; the corrected derivation still gives 768.
- **2016 AMC 12B #24:** bound each exponent candidate by the other two factors being at least seven, then exhaust only five candidates. This closes the asserted unique exponent triple and the minimum 27720.
- **2026 AIME II #9:** prove the infinite tail is at most `799/2025`, below one, so it cannot carry into the reported integer digits. The remainder stays 669.
- **2019 AIME I #9:** bound the search by the attained sixth solution 361 and exhaust the prime-square/fourth-power neighbors, proving the six *least* solutions sum to 540.
- **2018 AMC 10B #19 / 12B #14:** the intended answer 11 uses ordinary human ages. The strategy now says so explicitly. With unrestricted integer ages, Chloe 257 and Joey 258 satisfy the same nine-birthday condition but give digit sum 10 at Joey's next qualifying birthday. The numerical statement alone does not establish uniqueness. Preserve the credited statement and intended key; do not present an age bound as a stated hypothesis.

Exact independent checks cover interior crossing-time unions, exponent combinations, the infinite-tail bound, all consecutive divisor-count pairs through 361, both age constructions, harmonic denominators through 22 and the floor predicate through 1000. Full gates, answer-key and tree/audit regressions pass. All six changed explanation entries render at 375px in both themes without JS/KaTeX errors or page overflow. [TREE-CAPACITY.md](TREE-CAPACITY.md) answers the separate branch-depth and practice-pool question; its counts include these corrections.

## Every reviewed entry

[TREE-REPAIRS.md](TREE-REPAIRS.md) records each change. “Retain” means its filing, card tags and explanation remain unchanged in this pass.

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AMC 10A, Problem 11 | `nt.div.gcd.basic` | Retain |
| 2026 AIME II, Problem 9 | `alg.seq.sum.other`, `nt.divisor.count.tau` | `alg.seq.sum.other`; proof completed |
| 2026 AIME I, Problem 6 | `alg.exp.log.eq`, `nt.divisor.count.tau` | Retain |
| 2026 AIME I, Problem 8 | `nt.divisor.count.tau`, `nt.mod.crt.split` | `nt.divisor.count.tau`, `nt.mod.basic.arith` |
| 1987 AIME, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 1988 AIME, Problem 5 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 1990 AIME, Problem 5 | `nt.divisor.count.tau` | Retain |
| 1990 AIME, Problem 10 | `alg.cx.unity.sums`, `nt.div.gcd.basic` | `alg.cx.unity.sums` |
| 1991 AIME, Problem 5 | `nt.div.prime.factor`, `nt.div.gcd.basic` | `nt.divisor.count.factor`, `nt.div.gcd.basic`; card tags corrected |
| 1995 AIME, Problem 6 | `nt.divisor.count.tau` | Retain |
| 1995 AIME, Problem 8 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules` |
| 1996 AIME, Problem 8 | `nt.dio.factor.sfft`, `nt.divisor.count.tau` | `nt.dio.factor.sfft` |
| 1996 AIME, Problem 14 | `geo.solid.prism.unit`, `nt.div.gcd.basic` | `geo.solid.prism.unit`; proof completed |
| 1998 AIME, Problem 1 | `nt.div.gcd.basic` | Retain |
| 1999 AIME, Problem 7 | `nt.divisor.count.tau`, `nt.mod.basic.arith` | Retain |
| 2000 AIME II, Problem 4 | `nt.divisor.count.tau` | Retain |
| 2004 AIME II, Problem 8 | `nt.divisor.count.factor`, `nt.divisor.count.tau` | `nt.divisor.count.tau` |
| 2005 AIME I, Problem 3 | `nt.divisor.count.tau` | Retain |
| 2005 AIME I, Problem 12 | `nt.divisor.count.tau`, `nt.seq.power.squares` | `nt.divisor.count.tau` |
| 2005 AIME II, Problem 4 | `nt.divisor.count.tau`, `cp.tech.pie.venn` | Retain |
| 2006 AIME II, Problem 13 | `nt.divisor.count.tau`, `alg.seq.ap.arith` | Retain |
| 2007 AIME I, Problem 4 | `alg.word.rates.motion.laps`, `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2007 AIME II, Problem 2 | `nt.divisor.count.tau`, `cp.tech.stars.identical` | `nt.dio.linear.count`, `nt.div.rules` |
| 2010 AIME I, Problem 1 | `nt.divisor.count.tau`, `cp.prob.dice.draw` | Retain filing; card tags corrected |
| 2011 AIME I, Problem 7 | `alg.poly.remainder.thm`, `nt.divisor.count.tau` | `nt.dio.bound.exp` |
| 2015 AIME II, Problem 1 | `alg.word.ratio.percent`, `nt.div.gcd.basic` | `alg.word.ratio.percent` |
| 2016 AIME II, Problem 11 | `nt.divisor.count.tau` | Retain |
| 2017 AIME I, Problem 2 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |
| 2019 AIME I, Problem 7 | `nt.div.gcd.basic`, `alg.exp.log.eq` | Retain |
| 2019 AIME I, Problem 9 | `nt.divisor.count.tau` | Retain filing; proof completed |
| 2019 AIME II, Problem 3 | `nt.divisor.count.tau`, `nt.prime.basic.test` | `nt.divisor.count.factor` |
| 2019 AIME II, Problem 9 | `nt.divisor.count.tau` | Retain |
| 2020 AIME I, Problem 9 | `nt.divisor.count.tau`, `cp.prob.basic.count` | Retain |
| 2020 AMC 10A, Problem 24 | `nt.mod.crt.system`, `nt.div.gcd.basic` | `nt.div.gcd.basic` |
| 2021 Spring AMC 12A, Problem 25 | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` | Retain |
| 2022 AMC 10A, Problem 7 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2023 AIME I, Problem 14 | `cp.struct.paths.walks`, `nt.div.gcd.basic` | `cp.struct.paths.walks`; card tags corrected |
| 2023 AIME II, Problem 5 | `nt.div.gcd.basic` | Retain |
| 2023 AIME II, Problem 10 | `cp.struct.tile.color`, `nt.divisor.count.tau` | Retain filing; card tags corrected |
| 2023 AMC 10A, Problem 14 | `cp.prob.cond.bayes`, `nt.divisor.count.tau` | Retain |
| 2023 AMC 10B, Problem 18 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 15 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.div.gcd.basic` |
| 2023 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2025 AIME II, Problem 7 | `cp.basic.comb.subsets`, `nt.div.gcd.basic` | `nt.div.gcd.basic`, `cp.prob.basic.count`; card tags corrected |
| 2025 AMC 10A, Problem 17 | `nt.div.gcd.basic`, `nt.mod.basic.arith` | `nt.mod.basic.arith` |
| 1987 AJHSME, Problem 9 | `nt.div.gcd.basic` | Retain |
| 1989 AJHSME, Problem 22 | `nt.div.gcd.basic`, `alg.seq.period.cycle` | `alg.seq.period.cycle` |
| 1993 AJHSME, Problem 2 | `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 1994 AJHSME, Problem 10 | `nt.divisor.count.tau` | Retain |
| 1997 AJHSME, Problem 11 | `nt.divisor.count.tau`, `alg.fn.op.eval` | Retain |
| 2003 AMC 8, Problem 19 | `nt.div.rules.count`, `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2004 AMC 8, Problem 19 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2009 AMC 8, Problem 11 | `nt.div.gcd.basic`, `alg.word.everyday.money` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 13 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2012 AMC 8, Problem 15 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2013 AMC 8, Problem 10 | `nt.div.gcd.basic` | Retain |
| 2015 AMC 8, Problem 22 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 8, Problem 20 | `nt.div.gcd.basic` | Retain |
| 2017 AMC 8, Problem 12 | `nt.div.gcd.basic` | `nt.mod.crt.system` |
| 2018 AMC 8, Problem 18 | `nt.divisor.count.tau` | Retain |
| 2019 AMC 8, Problem 23 | `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2020 AMC 8, Problem 17 | `nt.divisor.count.tau` | Retain |
| 2003 AMC 10A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count`; card tags corrected |
| 2003 AMC 12A, Problem 8 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `cp.prob.basic.count`; card tags corrected |
| 2003 AMC 12A, Problem 23 | `nt.divisor.count.tau`, `nt.prime.val.factorial` | Retain |
| 2005 AMC 10A, Problem 15 | `nt.divisor.count.tau` | `nt.divisor.count.tau`, `nt.prime.val.factorial`; card tags corrected |
| 2005 AMC 10A, Problem 22 | `nt.div.gcd.basic` | `nt.div.rules.count` |
| 2005 AMC 12B, Problem 21 | `nt.divisor.count.tau` | Retain |
| 2008 AMC 12B, Problem 23 | `nt.divisor.count.tau`, `alg.exp.log.rules` | `nt.divisor.count.sigma`, `alg.exp.log.eq`; card tags corrected |
| 2010 AMC 10B, Problem 8 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2010 AMC 12B, Problem 3 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2011 AMC 12B, Problem 5 | `nt.div.gcd.basic` | Retain |
| 2012 AMC 10A, Problem 17 | `alg.eq.factor.special`, `nt.div.gcd.basic` | `nt.dio.factor`; card tags corrected |
| 2013 AMC 10A, Problem 19 | `nt.digit.base.convert`, `nt.divisor.count.tau` | `nt.digit.base.arith` |
| 2016 AMC 10A, Problem 22 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 10A, Problem 25 | `nt.div.gcd.basic` | Retain |
| 2016 AMC 12A, Problem 18 | `nt.divisor.count.tau` | Retain |
| 2016 AMC 12A, Problem 22 | `nt.div.gcd.basic` | Retain |
| 2016 AMC 12B, Problem 24 | `nt.div.gcd.basic`, `cp.tech.pie.general` | `nt.div.gcd.basic`; proof completed |
| 2017 AMC 10A, Problem 16 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2017 AMC 12A, Problem 12 | `nt.div.gcd.basic` | `alg.word.rates.motion.laps` |
| 2017 AMC 10B, Problem 20 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count`; card tags corrected |
| 2017 AMC 12B, Problem 16 | `nt.divisor.count.tau`, `nt.prime.val.legendre` | `nt.divisor.count.tau`, `nt.prime.val.factorial`, `cp.prob.basic.count`; card tags corrected |
| 2018 AMC 10A, Problem 22 | `nt.div.gcd.basic` | Retain |
| 2018 AMC 10B, Problem 19 | `nt.divisor.count.tau`, `alg.word.everyday.age` | Retain filing; age assumption clarified; card tags corrected |
| 2018 AMC 10B, Problem 23 | `nt.div.gcd.basic` | Retain |
| 2018 AMC 12B, Problem 14 | `nt.divisor.count.tau`, `alg.word.everyday.age` | Retain filing; age assumption clarified; card tags corrected |
| 2019 AMC 10B, Problem 7 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2019 AMC 12B, Problem 5 | `nt.div.gcd.basic` | `alg.word.everyday.money` |
| 2020 AMC 10A, Problem 9 | `alg.word.ratio.prop`, `nt.div.gcd.basic` | `alg.word.ratio.prop` |
| 2020 AMC 10A, Problem 15 | `nt.divisor.count.tau`, `cp.prob.basic.count` | `nt.divisor.count.tau`, `cp.prob.basic.count`, `nt.prime.val.factorial`; card tags corrected |
| 2020 AMC 10A, Problem 22 | `alg.fn.floor.eq`, `nt.divisor.count.tau` | `alg.fn.floor.eq` |
| 2020 AMC 12A, Problem 21 | `nt.div.gcd.basic`, `nt.prime.val.legendre` | `nt.div.gcd.basic`, `nt.prime.val.factorial` |
| 2022 AMC 10A, Problem 19 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | Retain |
| 2022 AMC 12A, Problem 4 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2022 AMC 12A, Problem 23 | `nt.div.gcd.basic`, `nt.prime.val` | `nt.div.gcd.basic`, `alg.seq.sum.other` |
| 2001 AMC 10, Problem 8 | `nt.div.gcd.basic` | Retain |
| 2021 Fall AMC 10A, Problem 23 | `nt.divisor.count.tau`, `alg.fn.basic.iterate` | Retain |
| 2021 Fall AMC 10B, Problem 3 | `alg.eq.factor.squares`, `nt.div.gcd.basic` | `alg.word.compute.fraction` |
| 2021 Fall AMC 10B, Problem 6 | `nt.divisor.count.tau` | Retain |
| 2021 Fall AMC 12A, Problem 8 | `nt.div.gcd.basic`, `nt.div.prime.factor` | `nt.div.gcd.basic` |
| 2021 Fall AMC 12A, Problem 20 | `nt.divisor.count.tau`, `alg.fn.basic.iterate` | Retain |
| 2021 Fall AMC 12B, Problem 16 | `nt.div.gcd.basic` | Retain |
| 2021 Fall AMC 12B, Problem 25 | `nt.mod.basic.arith`, `nt.div.gcd.basic` | `nt.mod.basic.arith` |
