// Contests the app will add later, listed on the Practice page as greyed rows marked "Coming soon", so it
// is clear where the app is heading. They carry no problems and no count, and they are not part of the
// problem database, the random-problem picker, or the search suggestions. When a contest gets its
// problems, move it out of this list (its row then appears with the others, with the number of problems
// that have text). Short-answer and computation contests only for now: no proof-based competitions.
window.MATH_PLANNED_CONTESTS = [
  { name: "HMMT November",  host: "Harvard and MIT", note: "The easier of the two HMMT tournaments, with Theme, General, and Team rounds." },
  { name: "MATHCOUNTS",     host: "MATHCOUNTS Foundation", note: "School, chapter, state, and national rounds for middle school." },
  { name: "ARML",           host: "American Regions", note: "American Regions Math League: team, power, and relay rounds, plus the local contest." },
  { name: "CMIMC",          host: "Carnegie Mellon", note: "Carnegie Mellon Informatics and Mathematics Competition." },
  { name: "SMT",            host: "Stanford", note: "Stanford Math Tournament: subject rounds, a team round, and Discrete and Advanced tracks." },
  { name: "CHMMC",          host: "Caltech and Harvey Mudd", note: "Caltech Harvey Mudd Math Competition." },
  { name: "MMATHS",         host: "Yale", note: "Math Majors of America Tournament for High Schools." }
];
