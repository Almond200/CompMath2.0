# High-value-node audit: progressions, solids and transformations

2026-11-10. Read 77 distinct problems (88 contest entries): all 54 arithmetic-sequence cofilings, all 18 problems in Nets and the polyhedron/regular-solid leaf, and all five reflection/rotation cofilings. The 49 sole-label AP problems and the remaining transformation pools are outside this targeted pass.

Corrected 34 distinct problems (39 entries). Arithmetic-sequence filings fall from 103 to 89 distinct problems: actual progression constraints remain, while incidental arithmetic-series computations do not add a subject. All nine AP/GP cofilings remain valid. The nets pool remains 11; its folding cases are genuine. The polyhedron leaf now has 6 problems and is named Regular solids, faces, edges and vertices, preserving its stable id and three card homes. Four mixed-transform questions explicitly impose both operations; the two-reflection case keeps only the reflection kind.

Proof clarifications: the 1988 AIME grid now states its row/column convention consistently, verified against its source figure; the five-prime progression argument handles the prime 3 exception; the 90-subset sum argument constructs every intermediate sum; and the octahedron/cube ratio computes the face centroids explicitly. Exact calculations verify the unchanged answers. No new cards or nodes are introduced, and all 774 cards and 4,725 filings survive.

Full repository gates, answer keys and tree/audit regression checks pass. The grid source figure was inspected; this is not a fresh visual audit of all net/solid source art. TREE-REPAIRS.md gives batch rationale.

| Problem | Previous filing | Current filing / decision |
|---|---|---|
| 2026 AIME II, Problem 1 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 1985 AIME, Problem 15 | `geo.solid.poly.nets`, `geo.solid.prism.box` | `geo.solid.poly.nets` |
| 1987 AIME, Problem 11 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 1988 AIME, Problem 6 | `alg.seq.ap.arith`, `cp.struct.tile.fill` | Retain filing; clarify proof |
| 1988 AIME, Problem 10 | `geo.solid.poly.euler` | Retain |
| 1989 AIME, Problem 7 | `alg.seq.ap.arith`, `nt.seq.power.squares` | Retain |
| 1990 AIME, Problem 14 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 1991 AIME, Problem 2 | `geo.basic.sim.parallel`, `alg.seq.ap.arith` | `geo.basic.sim.parallel` |
| 1993 AIME, Problem 2 | `alg.eq.factor.squares`, `alg.seq.ap.arith` | `geo.basic.pyth.triples` |
| 1993 AIME, Problem 6 | `nt.mod.crt.system`, `alg.seq.ap.arith` | Retain |
| 1993 AIME, Problem 10 | `geo.solid.poly.euler` | Retain |
| 1999 AIME, Problem 1 | `nt.prime.basic.test`, `alg.seq.ap.arith` | Retain filing; clarify proof |
| 1999 AIME, Problem 15 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 2000 AIME I, Problem 10 | `alg.eq.linear.system`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2002 AIME I, Problem 15 | `geo.solid.coord.dist`, `geo.solid.poly.euler` | `geo.solid.coord.dist` |
| 2002 AIME II, Problem 4 | `geo.poly.regular.hex`, `alg.seq.ap.arith` | `geo.poly.regular.hex` |
| 2003 AIME I, Problem 2 | `geo.poly.composite.arcs`, `alg.seq.ap.arith` | `geo.poly.composite.arcs` |
| 2003 AIME I, Problem 8 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2003 AIME II, Problem 8 | `alg.poly.construct.interp`, `alg.seq.ap.arith` | `alg.seq.ap.arith` |
| 2004 AIME I, Problem 3 | `geo.solid.poly.euler`, `cp.basic.comb.choose` | `geo.solid.poly.euler` |
| 2004 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2005 AIME I, Problem 2 | `alg.seq.ap.arith`, `nt.divisor.count.tau` | `alg.seq.ap.arith` |
| 2005 AIME II, Problem 10 | `geo.solid.poly.euler`, `geo.basic.sim.figures` | `geo.solid.poly.euler` |
| 2006 AIME I, Problem 2 | `cp.basic.comb.subsets`, `alg.seq.ap.arith` | `cp.basic.comb.subsets` |
| 2006 AIME II, Problem 13 | `nt.divisor.count.tau`, `alg.seq.ap.arith` | Retain |
| 2008 AIME I, Problem 15 | `geo.solid.poly.nets`, `geo.basic.pyth.fold` | `geo.solid.poly.nets` |
| 2009 AIME II, Problem 4 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2011 AIME II, Problem 3 | `geo.basic.angle.polygon`, `alg.seq.ap.arith` | Retain |
| 2012 AIME II, Problem 5 | `geo.solid.round.pyramid`, `geo.solid.poly.nets` | Retain |
| 2013 AIME I, Problem 15 | `nt.mod.basic.arith`, `alg.seq.ap.arith` | Retain |
| 2015 AIME I, Problem 1 | `alg.word.compute.clever`, `alg.seq.ap.arith` | `alg.word.compute.clever` |
| 2016 AIME I, Problem 10 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 1 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AIME II, Problem 9 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 2020 AIME II, Problem 8 | `alg.eq.abs.eq`, `alg.seq.ap.arith`, `alg.fn.basic.iterate` | `alg.eq.abs.eq`, `alg.fn.basic.iterate` |
| 2021 AIME I, Problem 5 | `alg.seq.ap.arith`, `nt.div.rules.expr` | `alg.seq.ap.arith` |
| 2022 AIME I, Problem 6 | `cp.basic.comb.condition`, `alg.seq.ap.arith` | Retain |
| 2023 AMC 10A, Problem 15 | `geo.poly.composite.arcs`, `alg.seq.ap.arith` | Retain |
| 2023 AMC 10A, Problem 18 | `geo.solid.poly.euler`, `cp.graph.basic.degree` | Retain |
| 2023 AMC 10B, Problem 23 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2024 AMC 10A, Problem 21 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 10B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2024 AMC 12A, Problem 14 | `alg.seq.ap.arith`, `alg.eq.linear.system` | `alg.seq.ap.arith`, `cp.struct.tile.fill` |
| 2024 AMC 12B, Problem 5 | `alg.seq.ap.arith`, `alg.ineq.optimize.integer` | `alg.ineq.optimize.integer` |
| 2025 AMC 10A, Problem 5 | `alg.seq.period.nth`, `alg.seq.ap.arith` | `alg.seq.period.nth` |
| 2025 AMC 10A, Problem 11 | `alg.seq.ap.arith`, `alg.seq.ap.geom` | Retain |
| 1985 AJHSME, Problem 11 | `geo.solid.poly.nets` | Retain |
| 1986 AJHSME, Problem 21 | `geo.solid.poly.nets` | Retain |
| 1986 AJHSME, Problem 25 | `alg.seq.ap.arith`, `alg.word.stats.mean` | `alg.word.stats.mean` |
| 1989 AJHSME, Problem 20 | `geo.solid.poly.nets` | Retain |
| 1990 AJHSME, Problem 18 | `geo.solid.poly.euler` | Retain |
| 1991 AJHSME, Problem 17 | `cp.basic.comb.gaps`, `alg.seq.ap.arith` | Retain |
| 1992 AJHSME, Problem 20 | `geo.solid.poly.nets` | Retain |
| 1999 AMC 8, Problem 8 | `geo.solid.poly.nets` | Retain |
| 2004 AMC 10A, Problem 18 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 12A, Problem 14 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2004 AMC 10B, Problem 21 | `alg.seq.ap.arith`, `cp.tech.pie.venn` | Retain |
| 2006 AMC 10A, Problem 9 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2006 AMC 10A, Problem 19 | `alg.seq.ap.arith`, `geo.basic.angle.polygon` | Retain |
| 2006 AMC 12A, Problem 8 | `alg.seq.ap.arith`, `nt.divisor.count.pairs` | `alg.seq.ap.arith` |
| 2007 AMC 12A, Problem 16 | `cp.struct.words.digits`, `alg.seq.ap.arith` | Retain |
| 2007 AMC 10B, Problem 8 | `alg.seq.ap.arith`, `cp.struct.words.digits` | Retain |
| 2008 AMC 12A, Problem 16 | `alg.exp.log.rules`, `alg.seq.ap.arith` | Retain |
| 2010 AMC 12A, Problem 20 | `alg.seq.ap.arith`, `nt.div.gcd.basic` | `alg.seq.ap.arith` |
| 2010 AMC 10B, Problem 24 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2010 AMC 12B, Problem 19 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2016 AMC 10A, Problem 10 | `alg.seq.ap.arith`, `geo.poly.quad.rect` | Retain |
| 2016 AMC 10B, Problem 24 | `alg.seq.ap.arith`, `cp.struct.words.digits` | Retain |
| 2019 AMC 10B, Problem 4 | `geo.coord.line.slope`, `alg.seq.ap.arith` | Retain |
| 2020 AMC 10A, Problem 7 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 10A, Problem 23 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12A, Problem 5 | `cp.struct.tile.fill`, `alg.seq.ap.arith` | `cp.struct.tile.fill` |
| 2020 AMC 12A, Problem 20 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12A, Problem 25 | `alg.fn.floor.eq`, `alg.seq.ap.arith` | `alg.fn.floor.eq` |
| 2020 AMC 10B, Problem 23 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2020 AMC 12B, Problem 19 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2021 Spring AMC 10A, Problem 22 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2021 Spring AMC 10B, Problem 9 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2021 Spring AMC 12B, Problem 5 | `geo.coord.transform.rotate`, `geo.coord.transform.reflect` | Retain |
| 2022 AMC 10A, Problem 18 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | Retain |
| 2022 AMC 10A, Problem 20 | `alg.seq.ap.geom`, `alg.seq.ap.arith` | Retain |
| 2022 AMC 10A, Problem 21 | `geo.solid.poly.nets`, `geo.poly.regular.hex` | Retain |
| 2022 AMC 12A, Problem 18 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | Retain |
| 2022 AMC 10B, Problem 4 | `alg.seq.ap.arith`, `alg.word.units.convert` | `alg.seq.ap.arith` |
| 2022 AMC 12B, Problem 9 | `alg.seq.ap.arith`, `alg.exp.rules.eq` | Retain |
| 2025 AMC 10B, Problem 17 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2025 AMC 12B, Problem 14 | `alg.word.stats.mean`, `alg.seq.ap.arith` | `alg.word.stats.mean` |
| 2021 Fall AMC 10B, Problem 17 | `geo.coord.transform.reflect`, `geo.coord.transform.rotate` | `geo.coord.transform.reflect` |
