<!-- nav --> [Curriculum](../README.md) · Solution-level audit of the 2026 AIME papers

# Solution-level audit and teaching pilots

Fifth-pass evidence and student-facing model units. The audit covers both 2026 AIME papers and preserves the four original mini-units. The eight curricular refinements in the audit ledger have been incorporated into the numbered chapters above; the ledger is retained for traceability. No extra numbered concept lessons or live repository edits are implied.

Use the route audit to choose prerequisites and exercise roles; use the pilots to evaluate actual prose, exploration, mathematical transitions and fading of support. The source cohort is complete but not a representative archive-wide solution review.

## 1 \| What the next validation gate measures

Source basis: the integrated specification, the generated CompMath catalog and the 2026 statement/strategy files. The two AIME papers are a complete recent cohort, selected before classifying their content. This reduces cherry-picking within the cohort, but it is not a representative random sample of the full archive.

| **Gate**                                       | **Meaning**                                                                                                                                                                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| R — route checked                              | Read statement and stored strategy; reconstructed the key reasoning and checked the answer. The route is a candidate for a human textbook solution, not an official answer-key certification. |
| E — elementary replacement                     | Stored strategy relies on calculus; a no-calculus replacement is supplied and its numerical answer checked.                                                                                   |
| N — numerical check only for final enumeration | A finite independent computation agrees, but an adequate hand-count or recursive completeness proof is not yet written. Do not publish the stored strategy as a complete student solution.    |

Each audit entry gives the answer, route, exact concept references and proposed teaching role. “Home” means where a problem is useful as a transfer or worked exploration, not necessarily the earliest level at which its facts are introduced. A route can have prerequisites from more than one subject. Concept IDs are taken from the integrated specification, not the app’s current lesson IDs.

#### Instructional evidence and decisions

The IES What Works Clearinghouse guides on mathematical problem solving and organizing instruction recommend multiple approaches, visual representations, reflection, and alternating worked examples with independent problems. The former is directed at grades 4–8, so these are design principles rather than direct evidence about AIME performance. Apply them without requiring a rigid template for every lesson. \[4–5\]

For CompMath, use a worked example to answer a genuine question. Then give a nearby problem without the final step, a contrasting problem in which the method fails, and a delayed problem without a technique label. The reference cards should appear as optional summaries after the idea is established. Avoid requiring learners to open another page simply to understand the argument.

#### Preliminary findings

The complete cohort reveals recurring demands that cut across topic labels: choosing quantities rather than solving for everything, switching to an exponent or coordinate representation, counting the same object in reverse, and proving an extremum is attainable. Two stored solutions (II \#6 and II \#8) use derivatives. Three advanced enumerations (I \#15, II \#14–15) need more complete explanatory justification or a hand-verifiable counting presentation.

## 2 \| 2026 AIME I · Problems 1–5

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME I \#1 \| 277 · R

**Prerequisites** A1.3.2, A1.3.6; A1.2.

**Route check** Gap closure: if the first speed is p, the second catches after p/2 hours and the third after (p+2)/7 hours; their starting times differ by one hour. Solving gives p=18/5 and distance 252/25.

**Teaching placement** A1.3 or A3.10 transfer: use a common arrival time and draw a timeline before solving. Do not give “relative motion” as a hint at first.

### AIME I \#2 \| 62 · R

**Prerequisites** N1.5.2, N1.5.4; C1.3.3, C2.1.

**Route check** Odd digit sum forces an odd-length palindrome. Its central digit is 1,3,5,7,9, leaving half-sums 6,5,4,3,2. Positive compositions of h have 2^(h−1) choices; no part exceeds 9. Sum 32+16+8+4+2.

**Teaching placement** C2.1 exploration after compositions; distinguish ordered positive parts from partitions.

### AIME I \#3 \| 79 · R

**Prerequisites** G1.4; G2.14.4–5, G2.14.7.

**Route check** Vertical cross-section through both centers. The small center has height 42 and radial distance at most √(158²−42²)=√23200. The admissible disk has area ratio 29/50.

**Teaching placement** G2.14 worked example; prove every smaller radial displacement also fits.

### AIME I \#4 \| 70 · R

**Prerequisites** N1.8.2, N1.2.6; C1.3.4.

**Route check** Add 1 to obtain (a+1)(b+1). Among integers 2–101, the only failures are primes and prime squares: 26+4. Thus 100−30=70.

**Teaching placement** N2.8 transfer: distinct factors matter; 16=2·8 works, whereas 49=7² does not.

### AIME I \#5 \| 65 · R

**Prerequisites** G2.12.2, G2.12.4; G2.7.5; A2.20.

**Route check** Choose complex coordinates B=0, A=1, u=cos θ+i sin θ. A′=u, B′=u−1, so AB′²=\|u−2\|²=5−4cos θ=16/9. Thus cos θ=29/36.

**Teaching placement** G3.4: compare the coordinate approach with a reflected-point construction and LOC. Require an explanation of why inverse rotations about different centers are not identity.

## 2 \| 2026 AIME I · Problems 6–10

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME I \#6 \| 441 · R

**Prerequisites** A2.4.3, A1.5.3–4; N1.2.2, N1.4.1.

**Route check** Put x=2026^u. Raising the original equation to power 20 yields u²−20u−20log₍₂₀₂₆₎26=0. Roots real and opposite in sign; sum 20. Product in x equals 2026²⁰=(2·1013)²⁰. Divisors: 21².

**Teaching placement** A3.1/A3.10: solve for the requested product without solving for the two individual roots. Check primality of 1013.

### AIME I \#7 \| 396 · R

**Prerequisites** A2.1; C2.3.6, C1.2.

**Route check** Onto on a finite set means permutation. Allowed cycle lengths divide 6. Eight cycle types contribute 1,15,45,15,40,40,120,120. Sum 396 (also checked over all 720 permutations).

**Teaching placement** C2.3 capstone: first derive n!/(∏ ℓ^m m!), then pose a cycle-order constraint without naming cycle types.

### AIME I \#8 \| 244 · R

**Prerequisites** N1.4.1, N2.1.3, N3.1.1; C1.2.

**Route check** 17017=7·11·13·17. For exponents a,b,c,d in 0–17, residues mod 3 and 4 impose b+d odd, a+b even. Count 162·9·18=26244; reduce mod 1000.

**Teaching placement** N3.1 transfer: count exponent tuples satisfying coupled congruences. Independently enumerated all 18⁴ tuples.

### AIME I \#9 \| 29 · R

**Prerequisites** C1.5.3; C3.5.1, C3.9.1, C3.9.5.

**Route check** Reverse six die rolls: sticker i remains visible iff its face is absent from later rolls. Every even i must introduce a new face in reverse. State = number of different faces. Conditioning count 14400; favorable with five distinct faces 6480. Probability 9/20.

**Teaching placement** C3.9: require students to discover the reverse representation, then explain state sufficiency. Checked all 6⁶ sequences.

### AIME I \#10 \| 156 · R

**Prerequisites** G2.7.4, G2.12.2; G2.13.4, G3.6.1.

**Route check** Place B=(0,0), C=(14,0), A=(5,12), center (7,33/8). Side condition selects clockwise rotation with cos=4/5, sin=3/5. Rotate points, apply shoelace to indicated order; area 1557/10.

**Teaching placement** G3.4 or G3.6: discriminate the two rotations and verify vertex order before using oriented area.

## 2 \| 2026 AIME I · Problems 11–15

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME I \#11 \| 896 · R

**Prerequisites** C2.3.2, C2.4.6; C3.8.5.

**Route check** Express each absolute difference as the number of integer thresholds separating its endpoints. For top k entries, cut ≤4k and ≤3k+18; k=31 cannot have 111 or 112 edges, k=32≤112. Complement symmetry yields upper bound 3896, attained by checkerboard and degree-ordered labels.

**Teaching placement** C3.8 advanced worked exploration: explicitly derive threshold identities and prove attainable bound, not just “use coloring.” See pilot D.

### AIME I \#12 \| 161 · R

**Prerequisites** G2.6.3, G2.8.1; G2.14.1, G3.9.3.

**Route check** Centers of spheres tangent to both planes on prescribed sides belong to a plane of equal signed distances. A=(0,0), B=(6,0), C=(0,4), reflected centroid D=(42/13,124/39). Height plane z=1+x/6+y/2; r=122/39.

**Teaching placement** G3.9: derive affine height interpolation; explain same-side condition and why centers are coplanar.

### AIME I \#13 \| 39 · R

**Prerequisites** C1.4.2, C3.6.1, C3.6.4; N2.5.6.

**Route check** Fold coefficients of (1+x)^10000 by exponents modulo 502, simultaneously reduce mod 503. In this quotient x^503=x and (1+x)^503=1+x. Repeated replacement reduces exponent to 462. Exactly 39 indices 463–501 have zero coefficient mod 503.

**Teaching placement** C3.6 + N2.5 bridge: teach cyclic polynomial reduction before roots-of-unity filters. No division by 1+x is required. Verified directly by modular binomial sums.

### AIME I \#14 \| 681 · R

**Prerequisites** G2.1, G2.7.5, G2.13.2; G3.5.5, G3.7.1.

**Route check** For equiangular pentagon unit directions turn 72°. Closure ∑aᵢuᵢ=0. Let J,K be adjacent and nonadjacent side-product sums. Diagonal-square total yields J cos72°=92; squared closure yields K cos36°=246. Perimeter²=308+2(J+K)=676√5.

**Teaching placement** G3.7: introduce closure as a vector invariant; use squared norm and LOS/LOC values only after students decide what to eliminate.

### AIME I \#15 \| 83 · N

**Prerequisites** C2.5.1, C3.5.1–2; C3.8.5.

**Route check** Stored route uses a minimal-loop rectangle recurrence. Exact cover of a 10×10 board independently gives 83 partitions into five loops. A full argument that corner loops must have the claimed spanning structure is not supplied in the stored strategy.

**Teaching placement** C3.5 challenge; require a structural lemma and proof of exhaustive, disjoint decomposition before publishing a noncomputational solution.

## 2 \| 2026 AIME II · Problems 1–5

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME II \#1 \| 178 · R

**Prerequisites** A1.9.1; N1.3.1–2.

**Route check** Positive common difference d divides 20 and 30, hence d∈{1,2,5,10}. Tenth terms sum 4·4+9·18=178.

**Teaching placement** A1.9 mixed practice after gcd; show necessity and sufficiency of the divisor condition.

### AIME II \#2 \| 243 · R

**Prerequisites** C1.8, C2.3.1, C2.5.3.

**Route check** Each square contributes one of three rightward crossings (upper edge, lower edge, diagonal). Given the entry and chosen crossing, any vertical step is forced. Final vertical is also forced. N=3¹⁰; √N=243.

**Teaching placement** C2.3: compare local bijection with a two-state recurrence. Explain why reusing an edge would violate the model.

### AIME II \#3 \| 503 · R

**Prerequisites** G1.4, G1.5.5; N1.7.3.

**Route check** A line parallel to AE through the reflex vertex decomposes the pentagon into a 20x rectangle and two right isosceles triangles (legs 14 and 6). Area=20x+116 and AB=x+14. Divisibility by 16 gives x≡3 mod4, 1≤x≤2011; count 503.

**Teaching placement** G2.1 or N2.11 cross-subject transfer: introduce a coordinate parameter from a construction, then count valid values.

### AIME II \#4 \| 279 · R

**Prerequisites** N1.5.1, N1.5.4; C1.3.4.

**Route check** A multi-digit numeral evaluated in any base smaller than 10 strictly decreases. Hence it must contain a 9 to keep base 10. Among 000–999, 1000−729=271 contain 9. Add one-digit 1–8.

**Teaching placement** N1.5 mixed practice: leading zeros for counting are not leading digits in the numeral; a one-digit 1 is valid in base 2.

### AIME II \#5 \| 190 · R

**Prerequisites** C3.9.2; N1.8.1, N1.8.5.

**Route check** Equal hypergeometric probabilities give C(r,4)C(b,3)=C(r,5)C(b,2). Cancel successive binomial ratios; 3r−5b=2. Solutions r=4+5k, b=2+3k, k≥2. Five totals 22,30,38,46,54.

**Teaching placement** C3.9: turn probability equality into an integer parameter problem rather than expand factorials.

## 2 \| 2026 AIME II · Problems 6–10

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME II \#6 \| 50 · E

**Prerequisites** G2.9.1, G2.9.5; G3.6.2, G2.13.2.

**Route check** Parabola y=t²/2−2 with t=x−4. Its tangent at t has slope t, established by a double-root line intersection. Radius vector (t,t²/2−41) is perpendicular to (1,t): t(t²/2−40)=0. Radii 41 and 9; sum 50.

**Teaching placement** G2.9 extension then G3.6 transfer. Replace derivative-based stored route with algebraic tangent construction; all radii positive.

### AIME II \#7 \| 754 · R

**Prerequisites** C1.5.3–4; C2.9.3, C3.10.4.

**Route check** After first three rolls without Carol, Alice/Bob splits are 2–1 or 3–0 with probabilities 6/27 and 2/27. Remaining named-player wins before Carol have probabilities 1/2 or 1/4 by ignoring other rolls. Total 7/54; 100m+n=754.

**Teaching placement** C3.10: use a first-step equation as a cross-check; explicitly justify ignoring irrelevant outcomes.

### AIME II \#8 \| 245 · E

**Prerequisites** G2.7.3, G2.8.1; A2.16–17, N1.3.4.

**Route check** Normalize AC=2. Let w=AI=√(1+r²), 1\<w\<√2. Ratio equation (2−w²)(1+w)=12/125; w=7/5. On the interval the expression equals 2+2w−w²−w³ and decreases: for v\>u\>1, difference=(v−u)\[2−(v+u)−(v²+vu+u²)\]\<0. Normalized AB=49; sides 49t,2t,7t/5 force least t=5.

**Teaching placement** G3.5: replace derivative uniqueness with factorization and order; explain integer scaling with gcd.

### AIME II \#9 \| 669 · R

**Prerequisites** A1.9.5, A3.7.3–4; N1.4.1.

**Route check** Expand 1/(10^a−1)=∑₍b≥1₎10^(−ab). Group nonnegative terms by n=ab to get τ(n). Tail after scaling by 10¹⁰⁰ is \<1 (bound τ(n)≤n after n=102); last places from τ(98)=6, τ(99)=6, τ(100)=9.

**Teaching placement** A3.7: distinguish summation reindexing from digit concatenation; prove no tail carry. Explicitly teach finite approximations before rearrangement.

### AIME II \#10 \| 340 · R

**Prerequisites** G2.8.2, G2.2; N1.2.2, N1.8.5.

**Route check** BD:CD=8:9, hence 8y,9y with y integer. Power gives BE=8y²/25, CF=9y²/25. Integrality forces 5\|y; y=5t. AE and AF positive requires t≤4. t=4 gives valid triangle (BC=340) and intersections inside segments.

**Teaching placement** G3.3: combine geometric invariant with prime exponent constraints; confirm configuration exists for maximizing t.

## 2 \| 2026 AIME II · Problems 11–15

Answer values are checked solution results; R/E/N are defined in the validation-gate section above. Source: CompMath statement and strategy files \[1–3\].

### AIME II \#11 \| 132 · R

**Prerequisites** A2.13.1–2, A2.20; A3.3.6, C1.2.

**Route check** Eight signed sums symmetric under negation; exactly seven distinct implies a zero sum. Choose α+β+γ=0. Vieta on squares yields e₂=−n/12 and n−11=e₂², so n=12 or 132. At 132, roots 4,−2±i produce exactly seven distinct sums.

**Teaching placement** A3.3: use symmetry of a set of possible outputs to infer a collision, then verify existence; not just solve Vieta identities.

### AIME II \#12 \| 223 · R

**Prerequisites** G2.14.1–3, G3.9.3.

**Route check** Vertices (±5,0,0),(0,±9,12). Symmetry puts both centers on z-axis. Circumcenter z=25/3. Incenter equal face distances 3t/5=(60−5t)/13 gives t=75/16. Difference 175/48.

**Teaching placement** G3.9: coordinate placement using opposite edges; justify symmetry and choose interior distances.

### AIME II \#13 \| 107 · R

**Prerequisites** C3.8.2, C3.1.7; N1.2.2, C2.4.6.

**Route check** Separate blocks at gaps ≥3. Within a block allowed neighbor choices switch from left to right at most once; a block of x elements has ≤x+1 cousins. Product of block counts is 4040. Splitting composite factors reduces ∑(f−1); prime factors 101,5,2,2,2 give 107. Gap-two blocks spaced far apart attain it.

**Teaching placement** C3.8: separate independent components, prove local injection, establish lower bound and construction.

### AIME II \#14 \| 157 · N

**Prerequisites** A2.9.7, N1.1; C3.5.1, C3.5.5.

**Route check** Signed total zero and ordinary sum 12 imply subtracted parts sum to 6. Parity of the running value equals prefix parity, so classify even parts following odd prefix. Exhaustive composition enumeration gives 29,78,50 for {6},{2,4},{2,2,2}.

**Teaching placement** C3.5: require a state recurrence (remaining total, running parity, subtract-total) and a small hand-computable table. Stored route omits how its case counts were obtained.

### AIME II \#15 \| 393 · N

**Prerequisites** N1.7.1, C3.1.2, C3.5.6; C3.8.4.

**Route check** Reduce digits to residues 1,−1,0. Seven index triples form a Fano plane. Enumerating all 3⁷ assignments and grouping by zero count gives 0,84,168,42,56,42,0,1; sum 393.

**Teaching placement** C3.11: structural casework and cyclic symmetry. Do not require a separate projective geometry chapter. Need a complete hand enumeration or verified compact counting table before publication.

## 3 \| Exact checks and unresolved reasoning

These calculations independently validate outcomes from selected routes; they do not replace an explanatory proof. The largest risks are in exhaustive case counts and the mathematical justification of recurrences. The following procedures were executed in Python using exact integers or rational arithmetic.

| **Check**             | **Independent procedure and result**                                                                                                                                                            |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| I \#4, \#7, \#8       | Enumerate distinct positive factors with bounded product (70), all 720 permutations (396), and all 18⁴ divisor exponent tuples (26244).                                                         |
| I \#9, \#10           | Enumerate all 6⁶ rolls; 14400 conditioning and 6480 favorable. Exact rational rotation and shoelace give 1557/10.                                                                               |
| I \#11, \#13          | Construct checkerboard labels and calculate adjacent differences = 3896; independently sum the threshold bound. Direct modular binomial sums give 39 zero residues.                             |
| I \#15                | Enumerate rectangle-boundary masks meeting both diagonals twice; exact-cover recursion gives 83.                                                                                                |
| II \#2–5, \#7, \#9–10 | Independent two-state path count, bounded congruence and base enumeration, hypergeometric equality search, rational probability recursion, divisor-digit sum, integer feasibility checks agree. |
| II \#14–15            | Enumerate all compositions of 12 and all 3⁷ residue assignments; counts 157 and 393 agree.                                                                                                      |

#### Exact cover for I \#15

Every rectangular loop intersects either main cell diagonal at most twice. Five disjoint loops covering all ten cells on each diagonal must intersect both diagonals exactly twice. Generate all axis-aligned rectangles of height and width at least 2 and retain boundary masks meeting both conditions (1025 candidates). For a partial partition, choose the first uncovered cell in row-major order; the loop containing it must have that cell as its top-left corner. Try every eligible nonoverlapping loop with that corner. Stop after five loops and accept only full coverage. Each partition is counted exactly once by its unique first uncovered cell. The resulting count is 83. This is a complete computational verification, not a hand solution of the contest problem.

#### State model for II \#14

Define F(t,p,s) as the number of ordered compositions with prefix sum t, prefix parity p and total subtracted amount s. Start at (0,0,0). For each next positive part a≤12−t, increment s by a precisely when p=1 and a is even; otherwise preserve s. Update t to t+a and parity to (p+a) mod 2. The answer is F(12,0,6)=157. A textbook should develop the reduced table rather than merely announce the case totals.

## 4 \| Curriculum patches, not new catalog entries

The eight refinements below are integrated into their existing concept homes in this edition. This table preserves their rationale, learning progression, and independent transfer tasks for traceability. No unprovided Think Academy lesson is reconstructed.

| **Existing home**      | **Refinement**                                                                                                            | **Evidence / acceptance task**                                                       |
|------------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| A1.3.2, .6             | Relative motion as gap closure; timelines for staggered starts; compare one equation in gaps vs distance systems.         | I \#1: set up the equation without knowing the speed or distance.                    |
| A2.13.1–2; A3.3.6      | Requested symmetric quantity; transformed roots; count signed outputs and prove collisions/existence.                     | I \#6, II \#11: do not compute roots when a symmetric expression suffices.           |
| G2.9.5; G3.6.2         | Algebraic tangent lines to parabolas, normal vectors and tangency at symmetric points.                                    | II \#6: derive tangent slope via discriminant, not calculus.                         |
| G2.12.4; G3.4.4        | Composition of rotations about different centers; translation and vector closure.                                         | I \#5, \#10: recover angle/translation and choose valid orientation.                 |
| G2.14.1–3; G3.9.3      | Signed distances, angle-bisector planes, affine interpolation of heights; opposite-edge symmetry.                         | I \#12, II \#12: construct 3D coordinates and verify equal face distances.           |
| N2.1.3; N3.1.1; N3.4.1 | Prime-exponent state constraints; CRT and parity coupling; contrast nonunit residue cases.                                | I \#8: count rather than list divisors.                                              |
| C3.6.4; N2.5.6         | Cyclic polynomial reduction modulo xᵐ−1, coefficient arithmetic mod p, no invalid cancellation.                           | I \#13: derive the reduction for a small modulus, then use it with a large exponent. |
| C3.5.1–5; C3.8.5       | Prove completeness of decomposition; threshold cuts; reverse-time state models; exact enumeration as a verification tool. | I \#9, \#11, \#15; II \#14–15: justify state or cut choice, not just arithmetic.     |

Additional cross-links: C2.3.6 ↔ A2.1/A2.8 for permutations and iteration; A3.7.3 ↔ N1.4.1 for divisor sums; C3.9.2 ↔ N1.8.1 for probability constraints. These should be brief prerequisite bridges, not required reading of whole other books.

## 7 \| Sources and reproducibility

The numbered curriculum in this consolidated edition retains the Integrated Teaching Edition (November 2026) chapter and concept IDs: 136 chapters, 791 sections. The fifth-pass companion is integrated here as in-place editorial refinements, the detailed solution audit, and independently authored teaching pilots.

**\[1\] CompMath archive metadata.** https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/problem-catalog.js — catalog blob 0df84b05eedbcd895dc76eb6eb638718d9d82962, as retrieved on 27 November 2026.

**\[2\] CompMath 2026 statements.** https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/statements/2026.js — blob 0de22a7cf990080891c4fdd7185b815770c71125. The repository attributes AMC/AIME statements to the MAA via LIVE under CC BY-NC-SA 4.0. This document links and paraphrases routes, rather than reproducing the full contest statements.

**\[3\] CompMath 2020s stored strategies.** https://github.com/Almond200/CompMath2.0/blob/main/js/data/problems/solutions/2020.js — blob e722573ea51beaf7d49dd6bb745244c5374b55b5. The 30 numbered entries from both 2026 AIME papers were read. Calculations and proposed editorial roles are independent of the original route wording.

**\[4\] What Works Clearinghouse.** Improving Mathematical Problem Solving in Grades 4 Through 8 (2012). https://ies.ed.gov/ncee/wwc/PracticeGuide/16/Published — research-based recommendations about representations, strategic approaches, articulation and monitoring.

**\[5\] What Works Clearinghouse.** Organizing Instruction and Study to Improve Student Learning (2007). https://ies.ed.gov/ncee/wwc/PracticeGuide/1 — recommendations on spacing, interleaving worked examples and problem-solving exercises, and student self-assessment.

Problem IDs can be looked up in the app’s archive (e.g., 2026-aime-i-11). The source cohort contains 15 problems per paper. Numeric checks used exact integer arithmetic, rational arithmetic and exhaustive finite enumeration where appropriate. The route and concept mapping is editorial; the difficulty labels and student-readiness claims have not been validated against learner performance. For future larger audits, retain problem slug, source blob, route ID, prerequisite IDs, teaching role, status and review note.
