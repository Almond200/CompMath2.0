# Official short-answer keys

`js/data/problems/answer-keys-short.js` contains answers from the organizers’ posted keys and solutions. The `sources` map records the solution URL for each paper. The paper ID is the problem slug without its final problem number. The import matches numbered questions in the source PDFs to the app’s slugs and checks against local statements. Plain numeric answers can be extracted from the labeled answer in a PDF. Stacked fractions, radicals, and questions with more than one answer need particular care because PDF text extraction can drop signs, fraction bars, and exponents.

Each entry contains an `answers` array of fully correct submissions. Its default format is a single real value. Use `format: "set"` for an unordered list of values, `"tuple"` for one ordered tuple, and `"tuple-set"` for an unordered list of ordered tuples. Put a complete list in one string, such as `["4, 6"]`. For a prompt asking for any one acceptable answer, use a separate array entry for each accepted alternative. Keep the multiple-choice imports in their own files.

Use plain math expressions in the keys. The answer field accepts features such as fractions, `sqrt(3)`, `cbrt(2)`, `pi`, powers and factorials. Separate entries with a comma. Spaces are optional. Rational expressions are compared exactly. The checker uses a small numerical tolerance for real expressions involving radicals or pi when exact rational comparison is unavailable. Questions with an unverified key or an unsupported answer form stay available for self-check. Saved self-check sets keep their existing marks.

Set `external: true` when the problem is read from the original paper and the app has a verified key. Practice links to the paper and grades the response from the key.

If a key and its solution disagree, first match the question to the original sitting. Check the PDF, any organizer correction, and an independent calculation before changing the accepted value. Record the published and corrected answers with the source. Log unusually large exact values along with the relevant limits of the grader so their support can be decided from the actual problem.

### Source discrepancies

- **2025 CMM Individual #10** grades **6**. The organizers’ published solution says they accepted 7 at the event. Two of the listed cuts produce the same rectangle because `2024 × 44 = 45 × 46`, and another case reproduces the original rectangle. [CMM solutions](https://www.caltechmathmeet.org/_files/ugd/006423_b0f218885a5445a382b1394779ce59da.pdf)
- **2018 Lehigh #1** grades **20**. The printed answer heading is correct. The final sentence in the worked solution gives 400, which is the square of the requested leg length. The original question asks for the length, and `sqrt(29² − 21²) = 20`. [Lehigh problem and solution](https://www.lehigh.edu/~dmd1/hstest18.pdf)

### Coverage added in this batch

- ARML and ARML Local Individual now grade 159 of 160 questions from the published tables and worked solutions. The key for 2017 ARML Individual #7 is `-20-24i`. It stays on self-check while the checker only supports real-valued expressions.
- CMM Individual is keyed for all 39 questions in 2024–2026. CHMMC remains the displayed name on historical papers. Both eras keep their stable problem IDs.
- The first Math Prize for Girls and Lehigh passes add 170 and 143 keys, respectively. Further entries still need work, including positional math that PDF text extraction does not preserve.

Run `node tests/short-answer-keys.cjs` to check local prompts, source coverage, and grading. With the app served locally, `tools/check-practice-actions.cjs` covers submission and review in Chromium.

## Pilot paper

In Practice → Practice a contest → Past contest, search for `2025 HMMT February Algebra and Number Theory`. All ten questions have keys. Question 7 lets you try equivalent expressions involving a radical. Question 10 lets you try listing both values in either order. The Math keypad is optional, and the preview shows how the app parsed your expression. This pilot is untimed and reports the number of correct answers.
