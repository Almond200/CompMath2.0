# High-value-node audit 4: optimization, trig addition and circle powers

2026-11-10. Read all 110 distinct problems (120 entries) in Integer optimization (54), Trig addition (37) and Power of a point (19), plus the other Euler-line leaf problem as a control: 111 distinct / 121 entries. A triggered review of all four remaining Grouping into products problems adds five entries: **115 distinct / 126 entries total**. Original source art was not visually re-audited in this pass.

Corrected 53 distinct problems (57 entries), retaining every answer. Most integer extrema and chord/secant configurations are genuine; most geometry/recurrence trig-addition labels merely named a tool. Retire the method-shaped Grouping into products leaf after reading every remaining entry, filing the actual coefficient/log/real-optimization subjects and preserving its SFFT card at Factoring. Euler Distance now lives under Inradius, circumradius and exradii, rather than the Euler line. No card is deleted.

| Pool | Before distinct | After distinct |
|---|---:|---:|
| Optimization over the integers | 54 | 52 |
| Sum, difference and double-angle formulas | 37 | 10 |
| Power of a point | 19 | 18 |
| Grouping into products (triggered follow-up, after optimization cleanup) | 4 | retired |

## Correctness findings

- 1989 AIME #11: the old argument maximized mean minus mode and falsely claimed reflection preserved the sign. The replacement maximizes the requested mode minus mean, proves a global bound and attains floor 947.
- 2020 AIME I #10: a bound below the attained 407 reduces all cases to four prime squares, and excludes the larger ones. No unbounded search or general false claim that m must always exceed 2n is needed.
- 2022 AIME I #7: the numerator bound and all six possible large denominators now form a complete finite proof of 1/288.
- 2024 AMC 10A #7: bound the smaller negative magnitude by two and exhaust the remaining factor pairs, proving no positive sum below three exists.
- 2021 Spring AMC 12A #25: decreasing consecutive-exponent ratios prove the multiplicative optimum globally, including every larger prime and exponent.
- 2022 AIME II #14: the exact stamp-count formula follows from interval coverage and fixed-count dominance. The bounded computation below verifies the first three values of c. The missing interval-extension method is recorded as P69; no new card is created.
- 1985 AIME #9: monotonicity supplies uniqueness for the verified chord-radius solution.
- 2022 AIME I #15: all eight sine-sum branches are checked, with exactly two admissible triples, both giving 1/32.

Exact checks cover the mode bound, all digit partitions, signed factor pairs, prime-square cases and angle branches. Full repository gates, answer keys and tree/audit regressions pass. All eight repaired explanations render at 375px in light/dark with no JavaScript or KaTeX errors or horizontal page overflow. Independent bounded enumeration also agrees with the stamp-count formula for every pair in the checked range. The stamp check is reproducible with:

```python
def f(b, c):
    x = b - 1
    y = (c - 1) // b
    z = max(1, (1000 - x - b*y + c - 1) // c)
    return x + y + z
assert [c for c in range(11, 90)
        if any(f(b, c) == 97 for b in range(2, c))] == [11, 88, 89]
assert max(f(b, c) for c in range(12, 88) for b in range(2, c)) == 96
```

## Every reviewed entry

Detailed changes and both card-home dispositions are in [TREE-REPAIRS.md](TREE-REPAIRS.md).

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AMC 12A, Problem 15 | `alg.trig.identity.sum`, `alg.exp.log.rules` | Retain |
| 1984 AIME, Problem 4 | `alg.word.stats.mean`, `alg.ineq.optimize.integer` | Retain |
| 1984 AIME, Problem 13 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 1985 AIME, Problem 9 | `geo.circ.power.chord`, `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 1986 AIME, Problem 3 | `alg.trig.identity.sum` | Retain |
| 1988 AIME, Problem 7 | `alg.trig.identity.sum`, `geo.tri.area.base` | `geo.tri.trig.other` |
| 1989 AIME, Problem 11 | `alg.word.stats.data`, `alg.ineq.optimize.integer` | `alg.word.stats.median`, `alg.ineq.optimize.integer` |
| 1990 AIME, Problem 12 | `geo.poly.regular.diag`, `alg.trig.identity.sum` | `geo.poly.regular.diag` |
| 1994 AIME, Problem 12 | `nt.div.gcd.basic`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2000 AIME II, Problem 10 | `geo.circ.cyclic.tangential`, `alg.trig.identity.sum` | `geo.circ.cyclic.tangential` |
| 2001 AIME II, Problem 6 | `geo.circ.power.pop`, `geo.poly.quad.rect` | Retain |
| 2002 AIME I, Problem 13 | `geo.tri.cevian.median`, `geo.circ.power.pop` | Retain |
| 2003 AIME II, Problem 12 | `alg.word.ratio.percent`, `alg.ineq.optimize.integer` | Retain |
| 2004 AIME I, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2005 AIME I, Problem 15 | `geo.tri.radii.in`, `geo.circ.power.pop` | Retain |
| 2005 AIME II, Problem 12 | `geo.poly.quad.rect`, `alg.trig.identity.sum` | `geo.poly.quad.rect` |
| 2006 AIME I, Problem 8 | `geo.poly.quad.para`, `alg.trig.identity.sum` | `geo.poly.quad.para` |
| 2006 AIME I, Problem 15 | `alg.seq.sum.telescope`, `alg.ineq.optimize.integer` | `alg.eq.abs.eq`, `alg.ineq.optimize.integer` |
| 2007 AIME II, Problem 8 | `alg.ineq.optimize.integer`, `alg.poly.quad.vertex` | `alg.ineq.optimize.integer` |
| 2008 AIME I, Problem 8 | `alg.trig.eq.inverse`, `alg.trig.identity.sum` | `alg.trig.eq.inverse` |
| 2008 AIME I, Problem 12 | `alg.word.rates.motion`, `alg.ineq.optimize.integer` | Retain |
| 2009 AIME II, Problem 14 | `alg.seq.rec.nonlinear`, `alg.trig.identity.sum` | `alg.seq.rec.nonlinear` |
| 2010 AIME II, Problem 14 | `geo.circ.power.pop`, `geo.circ.inscribed.thm` | Retain |
| 2011 AIME I, Problem 14 | `geo.poly.regular.other`, `alg.trig.identity.sum` | `geo.poly.regular.other` |
| 2012 AIME II, Problem 9 | `alg.trig.identity.sum` | Retain |
| 2012 AIME II, Problem 15 | `geo.circ.power.pop`, `geo.tri.cevian.bisector` | Retain |
| 2013 AIME II, Problem 15 | `geo.tri.trig.cosines`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2015 AIME II, Problem 8 | `alg.eq.factor.sfft`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2016 AIME I, Problem 8 | `nt.digit.sum.condition`, `alg.ineq.optimize.integer` | Retain |
| 2019 AIME I, Problem 13 | `geo.circ.proj`, `geo.circ.power.pop`, `geo.tri.trig.cosines` | `geo.circ.proj`, `geo.circ.power.pop` |
| 2019 AIME I, Problem 15 | `geo.circ.tangent.mutual`, `geo.circ.power.pop` | Retain |
| 2019 AIME II, Problem 15 | `geo.tri.centers.ortho`, `geo.circ.power.pop` | Retain |
| 2020 AIME I, Problem 10 | `nt.div.prime.factor`, `alg.ineq.optimize.integer` | `nt.div.prime.powers`, `alg.ineq.optimize.integer` |
| 2020 AIME I, Problem 15 | `geo.tri.centers.ortho`, `geo.circ.power.pop` | Retain |
| 2021 Spring AMC 12A, Problem 25 | `nt.divisor.count.tau`, `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2022 AIME I, Problem 7 | `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2022 AIME I, Problem 11 | `geo.circ.power.pop`, `geo.poly.quad.para`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.poly.quad.para` |
| 2022 AIME I, Problem 15 | `alg.trig.identity.sum`, `alg.eq.system.cyclic` | `alg.eq.system.cyclic` |
| 2022 AIME II, Problem 14 | `alg.ineq.optimize.integer` | Retain filing; complete proof |
| 2023 AIME II, Problem 9 | `geo.circ.power.pop`, `geo.circ.tangent.common`, `geo.poly.quad.trap` | Retain |
| 2023 AIME II, Problem 12 | `geo.tri.cevian.median`, `geo.circ.power.pop`, `geo.poly.quad.para` | `geo.tri.cevian.median`, `geo.circ.power.pop` |
| 2023 AMC 12A, Problem 11 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2023 AMC 12A, Problem 25 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.trig.identity.sum` |
| 2024 AIME I, Problem 5 | `geo.circ.power.pop`, `geo.poly.quad.rect` | Retain |
| 2024 AIME I, Problem 7 | `alg.cx.polar.demoivre`, `alg.trig.identity.sum` | `alg.cx.polar.demoivre` |
| 2024 AIME I, Problem 10 | `geo.circ.power.pop`, `geo.circ.inscribed.chords`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.circ.inscribed.chords` |
| 2024 AIME II, Problem 10 | `geo.tri.centers.euler`, `geo.tri.centers.lemmas`, `geo.circ.power.pop` | `geo.tri.radii` |
| 2024 AMC 10A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 10A, Problem 7 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` |
| 2024 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 10B, Problem 6 | `nt.divisor.count.pairs`, `alg.ineq.optimize.integer` | `geo.poly.quad.rect`, `alg.ineq.optimize.integer` |
| 2024 AMC 10B, Problem 13 | `alg.eq.radical.simplify`, `alg.ineq.optimize.integer` | `alg.eq.radical.eq`, `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 12A, Problem 6 | `alg.ineq.optimize.integer`, `nt.divisor.count.pairs` | `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 10 | `alg.trig.identity.sum` | Retain |
| 2024 AMC 12A, Problem 18 | `geo.coord.transform.rotate`, `alg.trig.identity.sum` | `geo.coord.transform.rotate` |
| 2024 AMC 12B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2024 AMC 12B, Problem 19 | `geo.tri.area.sine`, `alg.trig.identity.sum` | `geo.coord.transform.rotate`, `geo.tri.special.equil` |
| 2024 AMC 12B, Problem 21 | `alg.trig.identity.sum`, `nt.dio.squares.triples` | `nt.dio.squares.triples` |
| 2025 AIME II, Problem 8 | `alg.word.everyday.money`, `alg.ineq.optimize.integer` | Retain |
| 2025 AIME II, Problem 14 | `geo.tri.special.equil`, `alg.trig.identity.sum` | `geo.tri.special.equil` |
| 1986 AJHSME, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 1987 AJHSME, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 1987 AJHSME, Problem 24 | `alg.ineq.optimize.integer`, `nt.dio.linear.solve` | Retain |
| 1990 AJHSME, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 1991 AJHSME, Problem 8 | `alg.ineq.optimize.integer` | Retain |
| 1991 AJHSME, Problem 19 | `alg.word.stats.mean`, `alg.ineq.optimize.integer` | Retain |
| 1992 AJHSME, Problem 3 | `alg.ineq.optimize.integer` | Retain |
| 1994 AJHSME, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 1996 AJHSME, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 1997 AJHSME, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 1999 AMC 8, Problem 15 | `cp.struct.words.digits`, `alg.ineq.optimize.integer` | Retain |
| 2000 AMC 8, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 2001 AMC 8, Problem 21 | `alg.word.stats.median`, `alg.ineq.optimize.integer` | Retain |
| 2005 AMC 8, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2006 AMC 8, Problem 22 | `alg.ineq.optimize.integer` | Retain |
| 2008 AMC 8, Problem 17 | `alg.ineq.optimize.integer`, `geo.poly.quad.rect` | Retain |
| 2012 AMC 8, Problem 16 | `alg.ineq.optimize.integer` | Retain |
| 2019 AMC 8, Problem 1 | `alg.ineq.optimize.integer` | Retain |
| 2020 AMC 8, Problem 8 | `alg.ineq.optimize.integer` | Retain |
| 2022 AMC 8, Problem 21 | `alg.ineq.optimize.integer` | `alg.word.ratio.percent` |
| 2002 AMC 10A, Problem 11 | `alg.ineq.optimize.integer` | Retain |
| 2002 AMC 12A, Problem 9 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12A, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12A, Problem 21 | `alg.seq.ap.infinite`, `alg.trig.identity.sum` | Retain |
| 2004 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12B, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2004 AMC 12B, Problem 24 | `alg.trig.identity.sum` | `geo.tri.special.isos`, `alg.trig.eq.solve` |
| 2005 AMC 12B, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 2005 AMC 12B, Problem 24 | `geo.coord.conic.parabola`, `alg.trig.identity.sum` | `geo.coord.conic.parabola` |
| 2006 AMC 10A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2006 AMC 12A, Problem 4 | `alg.ineq.optimize.integer` | Retain |
| 2007 AMC 12A, Problem 17 | `alg.trig.identity.sum` | Retain |
| 2007 AMC 10B, Problem 6 | `alg.ineq.optimize.integer` | Retain |
| 2007 AMC 12B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2008 AMC 10B, Problem 4 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |
| 2008 AMC 12B, Problem 3 | `alg.ineq.optimize.integer` | `alg.word.everyday.money` |
| 2009 AMC 12A, Problem 25 | `alg.trig.identity.sum`, `alg.seq.period.nth` | `alg.seq.period.nth` |
| 2010 AMC 12A, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2010 AMC 12B, Problem 14 | `alg.ineq.optimize.integer` | Retain |
| 2011 AMC 12B, Problem 7 | `alg.ineq.optimize.integer` | Retain |
| 2013 AMC 10A, Problem 23 | `geo.circ.power.pop` | Retain |
| 2013 AMC 12A, Problem 19 | `geo.circ.power.pop` | Retain |
| 2013 AMC 10B, Problem 5 | `alg.ineq.optimize.integer` | Retain |
| 2013 AMC 12B, Problem 20 | `geo.coord.conic.parabola`, `alg.trig.identity.sum` | Retain |
| 2014 AMC 12A, Problem 12 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 10A, Problem 24 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2016 AMC 12A, Problem 21 | `alg.trig.identity.sum` | `geo.circ.power.chord` |
| 2018 AMC 12A, Problem 2 | `alg.ineq.optimize.integer` | Retain |
| 2018 AMC 12A, Problem 9 | `alg.trig.identity.sum` | Retain |
| 2019 AMC 12B, Problem 25 | `geo.poly.quad.general`, `alg.trig.identity.sum` | `geo.poly.quad.general`, `geo.tri.cevian.median` |
| 2020 AMC 12B, Problem 7 | `geo.coord.line.slope`, `alg.trig.identity.sum` | `geo.coord.line.slope` |
| 2020 AMC 12B, Problem 10 | `geo.circ.power.pop` | Retain |
| 2020 AMC 12B, Problem 12 | `geo.circ.power.pop`, `geo.circ.power.chord` | Retain |
| 2022 AMC 12A, Problem 17 | `alg.trig.eq.solve`, `alg.trig.identity.sum` | `alg.trig.eq.solve` |
| 2022 AMC 12B, Problem 14 | `alg.trig.identity.sum`, `alg.poly.quad.roots` | `geo.coord.line.slope` |
| 2025 AMC 12B, Problem 16 | `alg.word.rates.clock`, `alg.trig.identity.sum` | `alg.word.rates.clock` |
| 2000 AMC 10, Problem 20 | `alg.ineq.optimize.integer` | Retain |
| 2000 AMC 12, Problem 12 | `alg.ineq.optimize.integer` | Retain |
| 2021 Fall AMC 12B, Problem 24 | `geo.circ.power.pop`, `geo.basic.sim.similar`, `geo.tri.trig.cosines` | `geo.circ.power.pop`, `geo.basic.sim.similar` |
| 2025 AIME II, Problem 5 | `geo.tri.centers.euler`, `geo.circ.inscribed.thm` | Retain |
| 1996 AIME, Problem 3 | `cp.binom.thm.coeff`, `alg.eq.factor.sfft` | `cp.binom.thm.coeff` |
| 2000 AIME I, Problem 9 | `alg.exp.log.eq`, `alg.eq.factor.sfft` | `alg.exp.log.eq` |
| 2002 AMC 10B, Problem 13 | `alg.eq.factor.sfft` | `alg.poly.construct.coeff` |
| 2021 Spring AMC 10A, Problem 9 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |
| 2021 Spring AMC 12A, Problem 7 | `alg.eq.factor.sfft` | `alg.ineq.optimize` |
