# New cards requested 2026-10-10: proposed tier and importance (for approval)

Evidence is the number of LIVE problem statements in the app that mention the idea (a rough count by text search; the problem database's strategies were counted too), and the importance of the neighbors in the same subsection. Importance is judged inside the card's own subsection, as for every card.

| # | Card | Kind, subject | Neighbors (tier, importance) | Evidence | Proposed tier | Proposed importance | Why |
|---|---|---|---|---|---|---|---|
| N1 | Vector Bashing | Method, Geometry (bash methods) | Coordinate Bashing (AMC, HIGH), Complex Number Bashing (AIME Early, MED), Trig Bashing (AIME Early, LOW) | Few statements say "vector" outright (1), but dot and cross products sit inside many coordinate solutions | AIME Early | LOW | Set to LOW by Stanley (2026-10-10): the direct evidence is thin, and it sits beside Trig Bashing (LOW), below Complex Number Bashing (MED). |
| N2 | Distance Between Parallel Lines | Formula, Geometry (coordinate) | Point-to-Line Distance (AMC, HIGH), Distance Between Skew Lines (AIME Late, LOW) | 2 statements | AMC | LOWER (as you said) | One point-line distance; used rarely and easy to re-derive. |
| N3 | Writing a Function's Symmetry as an Equation | Method, Algebra (functions) | no direct neighbor; Functional Substitution (pattern) | 6 statements mention symmetry or periodicity in a function; more when the equation form is hidden ($f(x+3) = f(1-x)$) | AIME Early | MED | Recurs on the AMC 12 and AIME in function-equation problems, and one step (read the symmetry off the equation) unlocks the problem. |
| N4 | Odd and Even Functions | Formula, Algebra (functions) | none | 5 statements | AMC | MED | Short, basic, and used as a step in many function problems; the parity table is a real time-saver. |
| N5 | Properties of Inverse Functions | Formula, Algebra (functions) | none | 0 statements by the text search (the inverse is usually implicit: "solve for $x$ in terms of $y$"), 1 database strategy | AMC | MED | Basic and frequently needed (graph reflection, $f(a) = b \iff f^{-1}(b) = a$, composition), though rarely the whole problem. LOW if evidence must be strict. |
| N6 | Tangent Lines to a Circle from a Point (Distance Method) | Method, Geometry (coordinate) | Tangent Lines to Conics (AMC, MED), Equation of a Circle (AMC, MED), Exactly One Common Solution (pattern, AMC, HIGH) | circle-and-tangent appears in ~35 statements, many solved this way | AMC | LOW | A frequent coordinate setup with a clean two-step method; kept distinct from the pattern "Exactly One Common Solution" and not linked to it. |
| N7 | Minimizing $\frac{y-a}{x-b}$ as a Slope | Method, Algebra and Geometry | none | ~9 statements ask for a largest or smallest ratio or slope of this form | AMC | LOW | A recognizable disguise (a ratio of differences is a slope), and the geometric reading replaces calculus or casework. |

Each card is written after you approve this table (change any value you like). N3 to N5 will link to each other once each, and N1, N6, and N7 follow the method anatomy.

**Approved by Stanley 2026-10-10:** N1, N6, N7 are LOW; N2 LOWER; N3, N4, N5 MED as proposed.
