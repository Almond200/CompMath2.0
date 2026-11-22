# Official short-answer keys

`js/data/problems/answer-keys-short.js` contains answers from the organizers’ posted keys and solutions. The `sources` map records the solution URL for each paper. The paper ID is the problem slug without its final problem number. The import matches numbered questions in the source PDFs to the app’s slugs and checks against local statements. Plain numeric answers can be extracted from the labeled answer in a PDF. Stacked fractions, radicals, and questions with more than one answer need particular care because PDF text extraction can drop signs, fraction bars, and exponents.

Each entry contains an `answers` array of fully correct submissions. Its default format is a single real value. Use `format: "set"` for an unordered list of values, `"tuple"` for one ordered tuple, and `"tuple-set"` for an unordered list of ordered tuples. Put a complete list in one string, such as `["4, 6"]`. For a prompt asking for any one acceptable answer, use a separate array entry for each accepted alternative. Keep the multiple-choice imports in their own files.

Use plain math expressions in the keys. The answer field accepts features such as fractions, `sqrt(3)`, `cbrt(2)`, `pi`, powers and factorials. Separate entries with a comma and a space. Rational expressions are compared exactly. The checker uses a small numerical tolerance for real expressions involving radicals or pi when exact rational comparison is unavailable. Questions with an unverified key or an unsupported answer form stay available for self-check. Saved self-check sets keep their existing marks.

Run `node tests/short-answer-keys.cjs` to check local prompts, source coverage, and grading. With the app served locally, `tools/check-practice-actions.cjs` covers submission and review in Chromium.

## Pilot paper

In Practice → Practice a contest → Past contest, search for `2025 HMMT February Algebra and Number Theory`. All ten questions have keys. Question 7 lets you try equivalent expressions involving a radical. Question 10 lets you try listing both values in either order. The Math keypad is optional, and the preview shows how the app parsed your expression. This pilot is untimed and reports the number of correct answers.
