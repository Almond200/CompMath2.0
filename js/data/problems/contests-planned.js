// Contests the app will add later, listed on the Practice page as greyed rows marked "Coming soon", so it
// is clear where the app is heading. They carry no problems and no count, and they are not part of the
// problem database, the random-problem picker, or the search suggestions. When a contest gets its
// problems, move it out of this list (its row then appears with the others, with the number of problems
// that have text). Short-answer and computation contests only for now: no proof-based competitions.
window.MATH_PLANNED_CONTESTS = [
  { name: "MATHCOUNTS National", host: "MATHCOUNTS Foundation", note: "The national Sprint and Target rounds; the foundation sells them rather than posting them free." },
  { name: "Caltech Math Meet", host: "Caltech", note: "Formerly the Caltech Harvey Mudd Math Competition (CHMMC); no official archive of its rounds was found." }
];
