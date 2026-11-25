// Contest reference normalization and archive URLs for the catalog build.
"use strict";

// A contest reference like "2007 AIME II, Problem 15" maps deterministically
// to its Art of Problem Solving wiki page, where the full solution lives.
// "1997 AIME, Problem 1"      -> .../1997_AIME_Problems/Problem_1
// "2021 Fall AMC 12B, Prob 23"-> .../2021_Fall_AMC_12B_Problems/Problem_23
// Where a problem links out to. The AoPS wiki has a page per problem for the MAA contests
// and only those; other tournaments publish their own archives, by round rather than by
// problem. So the family decides, and an entry may override with its own `url`.
const ARCHIVE_URL = {
  "HMMT February": "https://www.hmmt.org/www/archive/problems",
  "HMMT November": "https://www.hmmt.org/www/archive/problems",
  "HMMT": "https://www.hmmt.org/www/archive/problems",
  "ARML": "https://www.arml.com/ARML/arml_2019/page/index.php?page_type=public&page=4",
  "ARML Local": "https://www.arml.com/ARML/arml_2019/page/index.php?page_type=public&page=4",
  "SMT": "https://www.stanfordmathtournament.com/past-tests/problems",
  "Duke Math Meet": "https://math.duke.edu/duke-math-meet",
  "CHMMC": "https://www.caltechmathmeet.org/problems",
  "CMM": "https://www.caltechmathmeet.org/problems",
  "UMD HSMC": "https://mathcomp.math.umd.edu/past-contests/",
  "CMIMC": "https://github.com/howard36/cmimc-official/tree/master/public/assets/docs/past-tests",
  "Math Prize for Girls": "https://mathprize.atfoundation.org/resources",
  "MMATHS": "https://www.mmaths.org/archive",
  "Girls in Math at Yale": "https://www.mmaths.org/archive",
  "Lehigh": "https://www.lehigh.edu/~dmd1/oldcontests.html",
  "Utah State Math Contest": "https://weber.edu/statemathcontest/exams.html",
  "BMT": "https://berkeley.mt/archives/bmt/",
  "BmMT": "https://berkeley.mt/archives/bmmt/",
  "PUMaC Division A": "https://pumac.princeton.edu/archives",
  "PUMaC Division B": "https://pumac.princeton.edu/archives",
  "MATHCOUNTS Chapter": "https://www.mathcounts.org/pastcompetition",
  "MATHCOUNTS State": "https://www.mathcounts.org/pastcompetition",
  "MATHCOUNTS National": "https://www.mathcounts.org/pastcompetition",
  "MBMT Lower": "https://mbmt.mbhs.edu/archive",
  "MBMT Upper": "https://mbmt.mbhs.edu/archive",
  "Calgary Junior Math Contest": "https://science.ucalgary.ca/mathematics-statistics/engagement/educational-outreach/junior-math-contest/archive",
  "Columbus State Tournament": "https://www.columbusstate.edu/math/tournament/previous-math-contest.php",
  "Fermat Contest": "https://cemc.uwaterloo.ca/resources/past-contests",
  "Cayley Contest": "https://cemc.uwaterloo.ca/resources/past-contests",
  "Pascal Contest": "https://cemc.uwaterloo.ca/resources/past-contests",
  "UKMT SMC": "https://ukmt.org.uk/competition-papers",
  "UKMT IMC": "https://ukmt.org.uk/competition-papers",
  "UKMT JMC": "https://ukmt.org.uk/competition-papers"
};
// The button has to say where it goes: an HMMT link lands on a round's archive, not on a
// per-problem page, and calling that "AoPS" would be simply false.
function linkLabel(fam) { return ARCHIVE_URL[fam] ? "archive" : "AoPS"; }
// HMMT publishes each round as two PDFs, the paper and its solutions. A reference names the
// year, the tournament and the round, which is the whole address.
const HMMT_CODE = { "Advanced Topics": "adv", "General": "gen", "Theme": "thm", "Algebra": "alg", "Algebra and Combinatorics": "algcomb", "Algebra and Geometry": "alggeo", "Combinatorics and Geometry": "combgeo", "Algebra and Number Theory": "algnt", "Combinatorics": "comb", "Geometry": "geo" };
function hmmtPdf(ref, which) {
  const m = ref.match(/^(\d{4}) HMMT (February|November) (.+?),\s*Problem\s+\d+$/);
  return m && HMMT_CODE[m[3]] ? `https://hmmt-archive.s3.amazonaws.com/tournaments/${m[1]}/${m[2].slice(0, 3).toLowerCase()}/${HMMT_CODE[m[3]]}/${which}.pdf` : null;
}
// ARML publishes whole contests, not rounds: the 2009 to 2014 contests as one book, and
// 2016 to 2019 as one booklet a year. A link opens the booklet at the Individual round's
// problems or solutions (the PDF page, checked against the files on 2026-11-13).
const ARML_FILES = "https://www.arml.com/ARML/arml_2019/public_contest_files/";
const ARML_BOOK = "2009_2014_book/ARML_2009_2014.pdf";
const ARML_PAGES = {
  2009: [ARML_BOOK, 39, 41], 2010: [ARML_BOOK, 79, 81], 2011: [ARML_BOOK, 129, 131], 2012: [ARML_BOOK, 174, 176],
  2013: [ARML_BOOK, 219, 221], 2014: [ARML_BOOK, 255, 258],
  2016: ["2016_contest_file/2016_Contest_Final_Version.pdf", 18, 20], 2017: ["2017_contest_file/2017_Contest_Final_Version.pdf", 20, 22],
  2018: ["2018_contest_file/2018_Contest_Final_Version.pdf", 20, 22], 2019: ["2019_contest_file/2019_Contest_Final_Version.pdf", 19, 21]
};
// ARML Local's Individual round, 2009 to 2014, is in the same book.
const ARML_LOCAL_PAGES = { 2009: [302, 303], 2010: [323, 325], 2011: [343, 344], 2012: [362, 363], 2013: [383, 384], 2014: [399, 400] };
function armlPdf(ref, which) {
  const l = ref.match(/^(\d{4}) ARML Local Individual,\s*Problem\s+\d+$/), g = l && ARML_LOCAL_PAGES[l[1]];
  if (g) return `${ARML_FILES}${ARML_BOOK}#page=${which === "solutions" ? g[1] : g[0]}`;
  const m = ref.match(/^(\d{4}) ARML Individual,\s*Problem\s+\d+$/), f = m && ARML_PAGES[m[1]];
  return f ? `${ARML_FILES}${f[0]}#page=${which === "solutions" ? f[2] : f[1]}` : null;
}
// SMT publishes each subject test as two PDFs, like HMMT: /pdfs/smt<year>/<subject>-problems.pdf
// and -solutions.pdf. The Discrete test was Advanced from 2011 to 2014, and in 2021 two tests,
// Combinatorics and Number Theory, replaced it.
const SMT_CODE = { "General": "general", "Algebra": "algebra", "Advanced": "advanced", "Discrete": "discrete", "Combinatorics": "combo", "Number Theory": "nt", "Geometry": "geometry" };
function smtPdf(ref, which) {
  const m = ref.match(/^(\d{4}) SMT (.+?),\s*Problem\s+\d+$/);
  return m && SMT_CODE[m[2]] ? `https://www.stanfordmathtournament.com/pdfs/smt${m[1]}/${SMT_CODE[m[2]]}-${which}.pdf` : null;
}
// Duke Math Meet: each year's Individual round as Duke's math department posts it, with the
// official solutions or answer sheets where available.
const DMM_NEW = "https://math.duke.edu/sites/math.duke.edu/files/documents/", DMM_OLD = "https://sites.math.duke.edu/dumu/mathmeet/prob/";
const DMM_ARCHIVE = "https://dukemathmeet.org/";
const DMM_FILES = {
  2022: [DMM_NEW + "Individual%20Round.pdf", DMM_NEW + "Solution%20Booklet.pdf"],
  2021: [DMM_NEW + "DMM_2021_Individual_Round.pdf", DMM_NEW + "DMM_2021_Solutions_Updated.pdf"],
  2020: [DMM_NEW + "DMM_2020_Problems_And_Solutions.pdf", DMM_NEW + "DMM_2020_Problems_And_Solutions.pdf"],
  2019: [DMM_OLD + "DMM_2019_Individual_Round.pdf", DMM_OLD + "DMM_2019_Solutions.pdf"],
  2018: [DMM_OLD + "2018_Individual.pdf", DMM_ARCHIVE + "2018/indiv_sol.pdf"],
  2017: [DMM_OLD + "2017_Indiv.pdf", DMM_ARCHIVE + "2017/indiv_sol.pdf"],
  2016: [DMM_OLD + "2016_indiv.pdf", DMM_ARCHIVE + "2016/indiv_sol.pdf"],
  2015: [DMM_OLD + "2015_Individual.pdf", DMM_ARCHIVE + "2015/indiv_sol.pdf"],
  2014: [DMM_OLD + "2014_Individual.pdf", DMM_ARCHIVE + "2014/indiv_sol.pdf"],
  2013: [DMM_OLD + "2013_Individual.pdf", DMM_OLD + "2013_Individual.pdf"], 2012: [DMM_OLD + "2012_Individual.pdf", DMM_OLD + "2012_Individual.pdf"],
  2011: [DMM_OLD + "2011_Individual.pdf"], 2010: [DMM_OLD + "2010_Problems.pdf"],
  2009: [DMM_OLD + "2009_individual.pdf", DMM_OLD + "2009_answers.pdf"],
  2008: [DMM_OLD + "2008_individual.pdf", DMM_OLD + "2008_answers.pdf"],
  2007: [DMM_OLD + "2007_individual.pdf", DMM_OLD + "2007_answers.pdf"]
};
function dmmPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Duke Math Meet Individual,\s*Problem\s+\d+$/), f = m && DMM_FILES[m[1]];
  return f ? (which === "solutions" ? f[1] || null : f[0]) : null;
}  // CHMMC, the Caltech Harvey Mudd Math Competition, run since 2024 as the Caltech Math Meet: the
// Individual round and its solutions as the Caltech Math Meet archive posts them (owner, 2026-11-15).
// 2010 and 2012 had two sittings each, named by season.
const CHMMC_FILES = {
  "2026": ["006423_3b1888df47f145499354cebef416fbcb", "006423_70b0692ed8854f74a5d738c8621b727e"],
  "2025": ["006423_71b733a8366e47c4bdd51d740960d0a3", "006423_b0f218885a5445a382b1394779ce59da"],
  "2024": ["006423_252fd9f5089c44018f2573b19cdd81a6", "006423_af6be07cec6947d1ad839209001cc4b0"],
  "2022": ["006423_1d46be5fd88740ddbd5d9664f7fe8167", "006423_503c17bd16b2438d863d7aacde96f4c5"],
  "2021": ["006423_b54510281b29442da636c53d863ef26a", "006423_f9910d7abbe4409ba9138e2dd2e1b4e5"],
  "2020": ["006423_8a6df432c9e34aa7b9d9129202117b7e", "006423_ae611b7adea74d59a6336c4e79d4b1ce"],
  "2019": ["006423_a175f91b8a4a4a8bab31ca0a14792d08", "006423_51e4bf40e50b4aa5bd2a5fbc06da8009"],
  "2018": ["006423_3431d9482d174c0e9a1735fcc9382bb2", "006423_821f3b99aa334c5ba43d4df788b8359c"],
  "2017": ["006423_31fbf2c382a5447592d28c0fdcf4930a", "006423_9da7beed342545acb50cd3fd24c4bf16"],
  "2016": ["006423_fb063e3e46584d6385d1e514a0067079", "006423_82ca553bc7854892b76b181c9b336188"],
  "2015": ["006423_c81ee1cb9d604acaa66aa80c1fc9f9cb", "006423_c129634d052f4c138b7f094e8ae6bbfd"],
  "2014": ["006423_63a21695ca7b44ccaf0a20cea326a1f7", "006423_4e087105c60445aabc2913f6f5759508"],
  "2013": ["006423_f3c07b103e484bfaa5bd8860a763e333", "006423_9fb6b947158c439d8a80c083697a0d53"],
  "2012 Fall": ["006423_917e33ba3350422c847779b19c8b3be3", "006423_6d6ab3b10a9d4a4fa338828e160aad6d"],
  "2012 Spring": ["006423_624ec5ac1d7448fda7bbc9ace8654aae", "006423_bd8ee2297f7848e48e39ec6ec35f83df"],
  "2010 Fall": ["006423_04de822230a64a58a07acb3775ffe186", "006423_2a09e247a6484d5a818b8408144efc17"],
  "2010 Winter": ["006423_cc460047637644c9b29b8efaa41f7760", "006423_e114bd000eec4c11be31066bc3761c3e"]
};
function chmmcPdf(ref, which) {
  const m = ref.match(/^(\d{4}) CHMMC (?:(Winter|Spring|Fall) )?Individual,\s*Problem\s+\d+$/), f = m && CHMMC_FILES[m[1] + (m[2] ? " " + m[2] : "")];
  return f ? "https://www.caltechmathmeet.org/_files/ugd/" + f[which === "solutions" ? 1 : 0] + ".pdf" : null;
}

// University of Maryland High School Mathematics Competition, Part I (25 multiple-choice questions):
// the paper and its solutions as the competition's site posts them (upload folders differ by year).
const UMD_FILES_BASE = "https://mathcomp.math.umd.edu/files/";
const UMD_FILES = {
  2026: ["2026/10/PartI2026.pdf", "2026/10/PartI2026Solns.pdf"],
  2025: ["2025/10/PartI2025.pdf", "2025/10/PartI2025Solns.pdf"],
  2024: ["2024/11/PartI2024.pdf", "2024/11/PartI2024Solns.pdf"],
  2023: ["2023/10/PartI2023.pdf", "2023/10/PartI2023Solns.pdf"],
  2022: ["2022/11/PartI2022.pdf", "2022/11/PartI2022Solns.pdf"],
  2021: ["2021/10/PartI2021.pdf", "2021/10/PartI2021Solns.pdf"],
  2019: ["2021/08/PartI2019.pdf", "2021/08/PartI2019Solns.pdf"],
  2018: ["2021/08/PartI2018.pdf", "2021/08/PartI2018Solns.pdf"],
  2017: ["2021/08/PartI2017.pdf", "2021/08/PartI2017Solns.pdf"],
  2016: ["2021/08/PartI2016.pdf", "2021/08/PartI2016Solns.pdf"],
  2015: ["2021/08/PartI2015.pdf", "2021/08/PartI2015Solns.pdf"],
  2014: ["2021/08/PartI2014.pdf", "2021/08/PartI2014Solns.pdf"],
  2013: ["2021/08/PartI2013.pdf", "2021/08/PartI2013Solns.pdf"],
  2012: ["2021/08/PartI2012.pdf", "2021/08/PartI2012Solns.pdf"],
  2011: ["2021/08/PartI2011.pdf", "2021/08/PartI2011Solns.pdf"],
  2010: ["2021/08/PartI2010.pdf", "2021/08/PartI2010Solns.pdf"],
  2009: ["2021/08/PartI2009.pdf", "2021/08/PartI2009Solns.pdf"],
  2008: ["2021/08/PartI2008.pdf", "2021/08/PartI2008Solns.pdf"],
  2007: ["2021/08/PartI2007.pdf", "2021/08/PartI2007Solns.pdf"],
  2006: ["2021/08/PartI2006.pdf", "2021/08/PartI2006Solns.pdf"],
  2005: ["2021/09/PartI2005.pdf", "2021/09/PartI2005Solns.pdf"],
  2004: ["2021/09/PartI2004.pdf", "2021/09/PartI2004Solns.pdf"],
  2003: ["2021/12/2003p1.pdf", "2021/12/PartI2003Solns.pdf"],
  2002: ["2021/12/PartI2002.pdf", "2021/12/PartI2002Solns.pdf"],
  2001: ["2021/12/PartI2001.pdf", "2021/12/PartI2001Solns.pdf"],
  2000: ["2021/12/PartI2000.pdf", "2021/12/PartI2000Solns.pdf"],
  1999: ["2021/12/PartI1999.pdf", "2021/12/PartI1999Solns.pdf"],
  1998: ["2021/12/PartI1998.pdf", "2021/12/PartI1998Solns.pdf"],
  1997: ["2021/12/PartI1997.pdf"]
};
function umdPdf(ref, which) {
  const m = ref.match(/^(\d{4}) UMD HSMC Part I,\s*Problem\s+\d+$/), f = m && UMD_FILES[m[1]];
  const p = f && (which === "solutions" ? f[1] : f[0]);
  return p ? UMD_FILES_BASE + p : null;
}
// CMIMC's archive (once at cmimc.math.cmu.edu/archive/cmimc<year>/): one PDF per individual test and
// one for its solutions (suffix _S). The subjects were renamed in 2019 and split into two
// divisions in 2021; later years, whose files use another naming, are not filed yet.
const CMIMC_CODE = { "Algebra": "Algebra", "Combinatorics": "Combinatorics", "Computer Science": "ComputerScience", "Geometry": "Geometry", "Number Theory": "NumberTheory",
  "Algebra and Number Theory": "ANT", "Combinatorics and Computer Science": "CCS" };
// The archive left the CMIMC site in 2026 (its /archive pages return 404); the same papers stay
// in the site's own source repository, which GitHub shows in its PDF viewer.
const CMIMC_ARCHIVE = "https://github.com/howard36/cmimc-official/blob/master/public/assets/docs/past-tests/";
function cmimcPdf(ref, which) {
  const m = ref.match(/^(\d{4}) CMIMC (.+?),\s*Problem\s+\d+$/);
  if (!m) return null;
  const y = +m[1], d = m[2].match(/^(.+) Division ([12])$/);
  let stem;
  if (d) stem = { "Algebra and Number Theory": "AlgNT", "Combinatorics and Computer Science": "ComboCS", "Geometry": "Geo" }[d[1]] + "_D" + d[2];
  else stem = y >= 2019 && m[2] === "Geometry" ? "GEO" : CMIMC_CODE[m[2]];
  return stem ? `${CMIMC_ARCHIVE}${y}_${stem}${which === "solutions" ? "_S" : ""}.pdf` : null;
}
// Math Prize for Girls: the Advantage Testing Foundation posts each year's 20-question test and
// its solutions at mathprize.atfoundation.org/resources/past-tests/<year>/ (the 2009 files are
// capitalized; 2026's solutions are not posted yet). There was no contest in 2020.
function mathPrizePdf(ref, which) {
  const m = ref.match(/^(\d{4}) Math Prize for Girls,\s*Problem\s+\d+$/);
  if (!m || (which === "solutions" && m[1] === "2026")) return null;
  const y = m[1], stem = y === "2009" ? "MathPrize" : "mathprize";
  return `https://mathprize.atfoundation.org/resources/past-tests/${y}/${stem}${y}${which === "solutions" ? "solutions" : "problems"}.pdf`;
}
// MMATHS (Yale's Math Majors of America Tournament for High Schools): the archive at
// mmaths.org/archive serves each year's Individual test and its solutions (2021 and 2022: an
// answer key) from Yale Math Competitions' file store. 2014's test was overwritten, so its
// solutions, which restate the problems, stand in for the paper; 2017's files are lost.
const MMATHS_SOL = { "2021": "key", "2022": "key" };
function mmathsPdf(ref, which) {
  const m = ref.match(/^(\d{4}) MMATHS Individual,\s*Problem\s+\d+$/);
  if (!m) return null;
  const y = m[1], sol = `_individual_${MMATHS_SOL[y] || "solutions"}`;
  const f = which === "solutions" || y === "2014" ? sol : "_individual";
  return `https://yalemathcompetitions-files.s3.amazonaws.com/mmaths_${y}${f}.pdf`;
}
// Girls in Math at Yale, from the same archive and file store: the Individual round and its
// solutions (2020, 2024 on) or answer key (2019, 2021 to 2023); 2022's paper is "_individual_round".
function gimPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Girls in Math at Yale Individual,\s*Problem\s+\d+$/);
  if (!m) return null;
  const y = +m[1], f = which === "solutions" ? (y === 2020 || y >= 2024 ? "_individual_solutions" : "_individual_key") : (y === 2022 ? "_individual_round" : "_individual");
  return `https://yalemathcompetitions-files.s3.amazonaws.com/gim_${y}${f}.pdf`;
}
// The Lehigh University High School Math Contest: one file a year at www.lehigh.edu/~dmd1/,
// usually the exam and its solutions together; [paper, solutions] where they are separate.
const LEHIGH_FILES = { 2026: "hscontest26-2.pdf", 2025: "hstest25.pdf", 2024: "hstest24.pdf", 2022: "hstest22.pdf", 2021: "hstest21.pdf",
  2020: "hstest20.pdf", 2019: "scan19.pdf", 2018: "hstest18.pdf", 2017: "hstest17.pdf", 2016: "hstest16_3.pdf", 2015: ["hsjusttest15.pdf", "solns15.pdf"],
  2014: "hstest14numcorr.pdf", 2013: "hstest13l.pdf", 2012: "hstest12after.pdf", 2011: "hstest11.pdf", 2010: "hstest10.pdf", 2009: "hstest09v2.pdf",
  2008: "hstest08.pdf", 2007: "hstest07.pdf", 2006: "06.pdf", 2005: "hstest05.pdf", 2004: "test04.pdf", 2003: "test03.pdf", 2002: "test02.pdf",
  2001: "test97.pdf", 2000: ["2000mathcontestexam.html", "2000mathcontestsolutions.html"], 1999: ["1999exam.html", "solns99.pdf"] };
function lehighPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Lehigh Math Contest,\s*Problem\s+\d+$/), f = m && LEHIGH_FILES[m[1]];
  return f ? "https://www.lehigh.edu/~dmd1/" + (Array.isArray(f) ? f[which === "solutions" ? 1 : 0] : f) : null;
}
// The Utah State Math Contest (Weber State University): a Junior and a Senior exam each year,
// each with its solutions; [exam, solutions] by year and level, as the archive names them.
const UTAH_FILES = { 2009: { Junior: ["SMC2009_Junior_Exam.pdf", "SMC2009_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2009_Senior_Exam.pdf", "SMC2009_Senior_Exam_and_Solutions.pdf"] }, 2010: { Junior: ["SMC2010_Junior_Exam.pdf", "SMC2010_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2010_Senior_Exam.pdf", "SMC2010_Senior_Exam_and_Solutions.pdf"] }, 2011: { Junior: ["SMC2011_Junior_Exam.pdf", "SMC2011_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2011_Senior_Exam.pdf", "SMC2011_Senior_Exam_and_Solutions.pdf"] }, 2012: { Junior: ["SMC_2012_Junior_Exam.pdf", "SMC_2012_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2012_Senior_Exam.pdf", "SMC2012_Senior_Exam_Solutions.pdf"] }, 2013: { Junior: ["SMC_2013_Junior_Exam.pdf", "SMC_2013_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2013_Senior_Exam.pdf", "SMC_2013_Senior_Exam_Solutions.pdf"] }, 2014: { Junior: ["SMC_2014_Junior_Exam.pdf", "SMC_2014_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC_2014_Senior_Exam.pdf", "SMC_2014_Senior_Exam_Solutions.pdf"] }, 2015: { Junior: ["SMC_2015_Junior_Exam.pdf", "SMC2015_Junior_Exam_Solutions.pdf"], Senior: ["SMC2015_Senior_Exam.pdf", "SMC2015_Senior_Exam_Solutions.pdf"] }, 2016: { Junior: ["SMC2016_Junior_Exam.pdf", "SMC2016_Junior_Exam_Solutions.pdf"], Senior: ["SMC2016_Senior_Exam.pdf", "SMC2016_Senior_Exam_Solutions.pdf"] }, 2017: { Junior: ["SMC2017_Junior_Exam.pdf", "SMC2017_Junior_Exam_Solutions.pdf"], Senior: ["SMC2017_Senior_Exam.pdf", "SMC2017_Senior_Exam_Solutions.pdf"] }, 2018: { Junior: ["SMC2018_Junior_Exam.pdf", "SMC2018_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2018_Senior_Exam.pdf", "SMC2018_Senior_Exam_and_Solutions.pdf"] }, 2019: { Junior: ["SMC2019_Junior_Exam.pdf", "SMC2019_Junior_Exam_and_Solutions.pdf"], Senior: ["SMC2019_Senior_Exam(1).pdf", "SMC2019_Senior_Exam_and_Solutions(1).pdf"] }, 2020: { Junior: ["SMC2020_Junior_Exam.pdf", "SMC2020_Junior_Exam_Solutions.pdf"], Senior: ["SMC2020_Senior_Exam.pdf", "SMC2020_Senior_Exam_Solutions.pdf"] } };
function utahPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Utah State Math Contest (Junior|Senior),\s*Problem\s+\d+$/), f = m && UTAH_FILES[m[1]] && UTAH_FILES[m[1]][m[2]];
  return f ? "https://www.weber.edu/wsuimages/statemathcontest/Exams/" + f[which === "solutions" ? 1 : 0] : null;
}
// MATHCOUNTS (owner, 2026-11-14): Chapter, State and National, each a Sprint and a Target round.
// The foundation posts only the latest year's Chapter and State papers free and replaces them each
// year, so these links last until the next year's papers go up; the archive page stays.
const MC_FILES = { 2026: {
  Chapter: { Sprint: "2026%20COMPLETE%20Chapter%20Sprint%20-%20for%20website.pdf", Target: "2026%20COMPLETE%20Chapter%20Target%201-8%20-%20for%20website.pdf", solutions: "2026%20Chapter%20solutions%20FINAL%20HWL%20-%20for%20website.pdf" },
  State: { Sprint: "2026%20COMPLETE%20State%20Sprint%20%20-%20for%20website.pdf", Target: "2026%20COMPLETE%20State%20Target%201-8%20%20-%20for%20website.pdf", solutions: "2026%20State%20Solutions%20FINAL%20HWL%20-%20for%20website.pdf" } } };
// Earlier years, the National competition and the Team round (owner, 2026-11-15): the copies of the
// official papers and answer keys that the MATHCOUNTS archive at mathteamnyc.weebly.com keeps on
// Google Drive, by year, level and round ("answers" is the level's answer key).
const MC_DRIVE = {
  2025: { National: { Sprint: "16zTG746H6W4obqM1RZXfgUeWqJtYxtGd", Target: "1ExKUN4ueSkpyxNIkeVr36uyACAO5ivwf", Team: "1dEGigUjupbJ5ChtXSgsmLfdNWNqKEQED", answers: "1mLqsEmPLtgQicceS1IItmQ7Ss_ikYki-" }, Chapter: { Team: "1jZAKklYXp9Miuj21QN_aThCR4uyHczET", answers: "1mA5OIEUrgUHlXhw4G6AwcazcW6cDD_1Y" }, State: { Team: "1pI_8lSUQMHMjFKeu5WltFjcwwyVq_04L", answers: "1Ph_AMHcSKWWybRttwr2m1VgB4HufM7EW" } },
  2024: { National: { Sprint: "1yEUa8zdDMD79Hdg8hSAhguNGhsZZx2L4", Target: "10oe1fpl9ppO46YIa38t_np4wZSZvAaib", Team: "1gU869OX_tlmCptZfcgOxItxCVNyu577_", answers: "13pTadzeAJ4CFhAR51PnI8LAlGPASPFyt" }, Chapter: { Team: "1RrZW92D8RiBHAI9iCtVlVsplmLI05h9Z", answers: "1Ruy_yuGjXYwq99oxvTSjZ25MJUY_YcYn" }, State: { Team: "1SNm0VzAerngumnWDCSbDZ5gXvQjQFZXu", answers: "1SdDylwc6EezHbpLo8A6c7_wQP181_GQ4" } },
  2021: { National: { Sprint: "1kr9h1xd2RXiVgNSM1FNivtOQzt7tFZmx", Target: "13ca7axN-eXGjEevqZ82A8TujuSSUiAAS", Team: "1blsmNjH_2VlKI9ko-0foPyK7shxZei5r", answers: "1lQFzjTL68ohnl8e97skFcdScSohyYghN" } },
  2017: { National: { Sprint: "0BxY_uj2XLv-iWVFzSTl3dzBwc2M", Target: "0BxY_uj2XLv-iVjkwYWdySDNWTG8", Team: "0BxY_uj2XLv-iRTVlSEEyYVpUZkE", answers: "0BxY_uj2XLv-iVXRRaXBTaTNMX28" } },
  2016: { National: { Sprint: "1omt1O6Gzn-JnudEeI5nnaRqaS9qKbcdB", Target: "1J5DV0CzAJ_6owpqa1fCM9NOu2WviPO0N", Team: "1JDklk7Q2SCi7mEMrNsp24Q1ysCYI7N2d", answers: "1ZrR8Zce76SeNynoNcjJ-FzjWCXkcymFp" } },
  2015: { National: { Sprint: "1sM4MYtqovgMImJH_B0rI3BSxKgy3L7Jh", Target: "1KKaQZg-Iw3sj4I2dp8WmhnphSYft9JB4", Team: "11ihGUnce6ZPvZ0cVnlbhe4F2srM3LTan", answers: "1EXIDKVoye_P3Cnp-Dmb81MR5iSmHsFW7" } },
  2014: { National: { Sprint: "0BxY_uj2XLv-iRmlnNzBHckQtYzg", Target: "0BxY_uj2XLv-iVk1TaG83ZkpaeGs", Team: "0BxY_uj2XLv-idThvbzVjb2tWbWs", answers: "0BxY_uj2XLv-id1VmTHJpT3J6VWs" } },
  2013: { National: { Sprint: "0BxY_uj2XLv-iR01JRG5CU2d6UWs", Target: "0BxY_uj2XLv-ieDFDeDlaemlHUW8", Team: "0BxY_uj2XLv-iQ1NSZUpiajN5WjQ", answers: "0BxY_uj2XLv-iY2lRWEVCRzAtU1U" } },
  2012: { National: { Sprint: "1lLn6yCKldgrxUz6SMDPktawlNtN1Cloq", Target: "1W5-c0wpaLa-SeJydcl0lMsulVx6tUvxv", Team: "1leBW_cMgtAHzj0il-0ib2fnNyYKWjM9-", answers: "1aVRCZ38ZLhvrwfbZRZcSKYO_KLuozn4U" } },
  2011: { National: { Sprint: "0BxY_uj2XLv-iYlhPZlVhQl9GeXM", Target: "0BxY_uj2XLv-iUDZrOEhBTjhfNmM", Team: "0BxY_uj2XLv-iVGIycjFaOGFEOGc", answers: "0BxY_uj2XLv-iTWRRal8wWHVHWkE" } },
  2010: { National: { Sprint: "1kO-8F0JpM0c0LAi6MnRWEhURe8JPs-iq", Target: "10Nr1RICwNPydsStUqSfvLMg9bJsYqB2M", Team: "1ljmPNNfLRc6Z2Ozk3r2ZX-GNgJzkJovC", answers: "1bSU5bRLiSQ-gAWyXMy9KNeEXgBHt2wOl" } },
  2009: { National: { Sprint: "0BxY_uj2XLv-iNmVRZHptRWFKTlU", Target: "0BxY_uj2XLv-icS1oZVVNVnpoX0E", Team: "1oLhZktVC87w8xzzyqc3KqWWIn6f7nYj2", answers: "0BxY_uj2XLv-iQ2JZNHJoeVJyOGs" } },
  2008: { National: { Sprint: "0BxY_uj2XLv-iVFRuam1UUVBWTWs", Target: "0BxY_uj2XLv-iWUZGS2VjdEVZejA", Team: "0BxY_uj2XLv-iMGtwRWgxaVlyY1k", answers: "0BxY_uj2XLv-iZndCQnpiRDRHUFU" } },
  2007: { National: { Sprint: "0BxY_uj2XLv-iMVVZMGVDZml3TzA", Target: "0BxY_uj2XLv-ibV9ldV9xbVRlV28", Team: "0BxY_uj2XLv-iQzZuUnMzMzUzQlk", answers: "0BxY_uj2XLv-iTmlBMEJpZ3BQX1U" } },
  2006: { National: { Sprint: "0BxY_uj2XLv-ic1E3Mzl3SThVRkU", Target: "0BxY_uj2XLv-ic0haNjFXVTN3Vnc", Team: "0BxY_uj2XLv-iX2tNckZfS1N2OGM", answers: "0BxY_uj2XLv-ia0c1RjRyekxobEU" } },
  2005: { National: { Sprint: "0BxY_uj2XLv-iRGltOU0yS1l5WDQ", Target: "0BxY_uj2XLv-iMlNXR1Ywdnlnd2s", Team: "0BxY_uj2XLv-iaUtnbDRfV2hmUHc", answers: "0BxY_uj2XLv-iZXNGTGx6Z0J1NVk" } },
  2004: { National: { Sprint: "0BxY_uj2XLv-iTF9iR2VvY25wdms", Target: "0BxY_uj2XLv-ieXNDQ0M3dkh0T3M", Team: "0BxY_uj2XLv-icC1iRV9IQng2R3c", answers: "0BxY_uj2XLv-iNVc0a0JHczZ2UkU" } },
  2003: { National: { Sprint: "0BxY_uj2XLv-iRENNT25RUkFGbFk", Target: "0BxY_uj2XLv-iR2djV3hwYlpHQ0U", Team: "0BxY_uj2XLv-iNnphYW5wbGRYSEE", answers: "0BxY_uj2XLv-idkpzSjV3Ymk1T0E" } },
  2002: { National: { Sprint: "0BxY_uj2XLv-ieHFqdVBsLVF3Q3M", Target: "0BxY_uj2XLv-iUkVDMndMdjd0SjA", Team: "0BxY_uj2XLv-iak9FdDNhdU5NSGM", answers: "0BxY_uj2XLv-iOWQtcXJMRXdoUXc" } },
  2001: { National: { Sprint: "0BxY_uj2XLv-icXJUcldQcklyQzg", Target: "0BxY_uj2XLv-iRFBCd2tUNnE3SXc", Team: "0BxY_uj2XLv-iYk1vckZoVzYzTmM", answers: "0BxY_uj2XLv-ieW9oQlBqd1ZvYnc" } },
  2000: { National: { Sprint: "0BxY_uj2XLv-iX21ORno3dmNYVGc", Target: "0BxY_uj2XLv-iSTNZQmJjclpBSnM", Team: "0BxY_uj2XLv-iOU5jV3FGc3J5T00", answers: "0BxY_uj2XLv-iRFF2aTltazJWcTg" } },
};
function mathcountsPdf(ref, which) {
  const m = ref.match(/^(\d{4}) MATHCOUNTS (Chapter|State|National) (Sprint|Target|Team),\s*Problem\s+\d+$/);
  if (!m) return null;
  if (which === "solutions" && ref === "2012 MATHCOUNTS National Sprint, Problem 22") {
    return "https://www.mathcounts.org/sites/default/files/u5328/Errata%20for%20Competitions%202011%20through%202015.pdf";
  }
  const f = MC_FILES[m[1]] && MC_FILES[m[1]][m[2]];
  if (f && f[m[3]]) return "https://www.mathcounts.org/sites/default/files/" + f[which === "solutions" ? "solutions" : m[3]];
  const d = MC_DRIVE[m[1]] && MC_DRIVE[m[1]][m[2]], id = d && d[which === "solutions" ? "answers" : m[3]];
  return id ? "https://drive.google.com/file/d/" + id + "/view" : null;
}
// MBMT (Montgomery Blair Math Tournament): two divisions a year under new names each time, the
// archive listing the harder one second, except 2015, whose Fermat round repeats Euler's easier
// problems; [Lower, Upper] by year. 2015 has no solutions posted.
const MBMT_DIVS = { 2015: ["fermat", "euler"], 2016: ["euclid", "lobachevsky"], 2017: ["ramanujan", "pascal"], 2018: ["cantor", "gauss"], 2019: ["descartes", "leibniz"], 2022: ["dedekind", "zermelo"], 2023: ["bernoulli", "germain"], 2024: ["brahmagupta", "godel"], 2025: ["erdos", "weierstrass"], 2026: ["abel", "jacobi"] };
const MBMT_SUBJ = { "Algebra": "algebra", "Geometry": "geometry", "Counting": "counting", "Number Theory": "nt" };
function mbmtPdf(ref, which) {
  const m = ref.match(/^(\d{4}) MBMT (Lower|Upper) (Algebra|Geometry|Counting|Number Theory),\s*Problem\s+\d+$/), d = m && MBMT_DIVS[m[1]];
  if (!d || (which === "solutions" && m[1] === "2015")) return null;
  return `https://mbmt.mbhs.edu/archive/${m[1]}/${d[m[2] === "Upper" ? 1 : 0]}/${MBMT_SUBJ[m[3]]}/${which === "solutions" ? "solutions" : "problems"}.pdf`;
}
// The Calgary Junior Mathematics Contest (University of Calgary): Part A, the short-answer
// questions, only; [exam, solutions] by year as the archive names the English files.
const CALGARY_FILES = { 2004: ["exam04.pdf", "exam04solns.pdf"], 2005: ["exam05.pdf", "exam05-solns.pdf"], 2006: ["exam06.pdf", "exam06solns.pdf"], 2007: ["exam07.pdf", "exam07soln.pdf"], 2008: ["exam08.pdf", "exam08-solns.pdf"], 2009: ["exam09.pdf", "exam09-solns.pdf"], 2010: ["exam10.pdf", "exam10-solutions.pdf"], 2011: ["exam11.pdf", "exam11-sol.pdf"], 2012: ["examenglish-2012.pdf", "examenglish-2012solns.pdf"], 2013: ["jr-math-examenglish-2013.pdf", "jr-math-examenglish-2013_with_solutions.pdf"], 2014: ["jr_math_examenglish_2014.pdf", "jr_math_examenglish_2014_test_solutions.pdf"], 2015: ["jr-math-examenglish-2015-final.pdf", "jr-math-examenglish-2015-final_solutions.pdf"], 2016: ["english-exam-2016.pdf", "jr-math-examenglish-2016-april-15_solutions.pdf"], 2017: ["jr-math-2017-english.pdf", "jr-math-examenglish-2017-solutions.pdf"], 2018: ["jr-math-examenglish-2018.pdf", "Jr-Math-examenglish-2018-sol-v2.pdf"], 2019: ["Jr-Math-examenglish-2019-v2.pdf", "Jr-Math-examenglish-2019-sol-v2.pdf"], 2021: ["Jr-Math-examenglish-2021.pdf", "Jr-Math-examenglish-2021-sol-v4.pdf"], 2022: ["Jr-Math-examenglish-2022.pdf", "Jr-Math-examenglish-2022-sol.pdf"], 2023: ["Jr-Math-examenglish-2023-v4.pdf", "Jr-Math-examenglish-2023-sol-v5-points.pdf"], 2024: ["Jr-Math-examenglish-2024-v4.pdf", "Jr-Math-examenglish-2024-point_sol-v2.pdf"], 2025: ["Jr-Math-examenglish-2025.pdf", "Jr-Math-examenglish-2025-solutions.pdf"] };
function calgaryPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Calgary Junior Math Contest,\s*Problem\s+\d+$/), f = m && CALGARY_FILES[m[1]];
  return f ? "https://science.ucalgary.ca/sites/default/files/teams/7/Junior%20Math%20Contest/" + f[which === "solutions" ? 1 : 0] : null;
}
// The Columbus State Invitational Mathematics Tournament: the 50-question Individual test only
// (the ciphering round is left out); [test, solutions] by year as the department names them. 2021 posts
// one file, the problems with their solutions, so it serves as both.
const COLUMBUS_FILES = { 2002: ["02wexam.PDF", "solutionsPDF.pdf"], 2003: ["03WrittenFD.pdf", "03solutions.pdf"], 2004: ["04Writtenfd.pdf", "04solutions.pdf"], 2005: ["test-2005-final-version.pdf", "test-2005-final-version-solutions.pdf"], 2006: ["test-2006-final-version.pdf", "test-2006-final-version-solutions.pdf"], 2007: ["test_2007_final_version.pdf", "test_2007_final_version_with_answers_circled.pdf"], 2008: ["Test_2008.pdf", "Test_2008_Solutions.pdf"], 2009: ["2009individual.pdf", "Solutions2009individual.pdf"], 2010: ["Individual2010.pdf", "IndividualSolutions2010.pdf"], 2011: ["Math-Tournament-2011---Individual-Test.pdf", "Math-Tournament-2011---Individual-Test-Solutions.pdf"], 2012: ["MATH_TOURNAMENT_2012_INDIVIDUAL_TEST.pdf", "MATH-_TOURNAMENT_2012_INDIVIDUAL_TEST_SOLUTIONS.pdf"], 2013: ["Individual2013.pdf", "Solutions2013.pdf"], 2014: ["MathTournament2014IndividualTest.pdf", "MathTournament2014IndividualTestSolutions.pdf"], 2015: ["IndividualTest2015.pdf", "IndividualTest2015solutions.pdf"], 2016: ["Tournament_Test_without_solution.pdf", "Tournament_Test_with_solution.pdf"], 2017: ["Tournament_Fan2017withoutSolu.pdf", "Tournament_Fan2017withSolu.pdf"], 2018: ["MathTournament2018.pdf", "MathTournament2018Solutions.pdf"], 2019: ["2019-individual-exam.pdf", "2019-individual-solutions.pdf"], 2020: ["2020-individual-exam.pdf", "2020-individual-solutions.pdf"], 2021: ["2021-solution-march-2-indv.pdf", "2021-solution-march-2-indv.pdf"] };
function columbusPdf(ref, which) {
  const m = ref.match(/^(\d{4}) Columbus State Tournament,\s*Problem\s+(\d+)$/), base = "https://www.columbusstate.edu/math/_docs/tournament/";
  // 2022 is posted as three scanned test files of ten problems each, with no solutions.
  if (m && m[1] === "2022") return which === "solutions" ? null : base + "2022-tournament-test-" + Math.ceil(+m[2] / 10) + ".pdf";
  const f = m && COLUMBUS_FILES[m[1]], file = f && f[which === "solutions" ? 1 : 0];
  return file ? base + file : null; // no solutions are posted before 2002
}
// The CEMC Fermat (Grade 11), Cayley (Grade 10) and Pascal (Grade 9) Contests, University of Waterloo: 25 questions, the paper and its solutions
// at the CEMC's standard addresses.
function fermatPdf(ref, which) {
  const m = ref.match(/^(\d{4}) (Fermat|Cayley|Pascal) Contest,\s*Problem\s+\d+$/);
  if (!m) return null;
  const kind = which === "solutions" ? "Solution" : "Contest";
  // The 2024 Pascal solutions sit in the 2026 folder; every other year's files sit in their own year's folder.
  const folder = m[1] === "2024" && m[2] === "Pascal" && kind === "Solution" ? "2026" : m[1];
  return "https://cemc.uwaterloo.ca/sites/default/files/documents/" + folder + "/" + m[1] + m[2] + kind + ".pdf";
}
// The UKMT Senior Mathematical Challenge: 25 multiple-choice questions, the paper and its solutions as the
// UKMT posts them free (2013 and 2015 on; 2014 is not posted as a file, and 2013 has only the extended solutions).
// The upload folders do not follow the year, so the files are listed by year.
const UKMT_SMC_FILES = { 2013: ["2024/04/smc-2013-q.pdf", "2024/04/SMC-2013-sol-extended.pdf"], 2015: ["2023/08/SMC15_QP_A4.pdf", "2023/08/SMC-2015-sol-short.pdf"], 2016: ["2023/08/A4SMC_QP16.pdf", "2023/08/SMC-2016-sol-short.pdf"], 2017: ["2023/08/SMC-2017-paper.pdf", "2023/08/SMC-2017-sol-short.pdf"], 2018: ["2023/08/SMC2018_paper.pdf", "2023/08/SMC2018_sol_short.pdf"], 2019: ["2023/08/SMC_2019_Paper.pdf", "2023/08/SMC_2019_Solutions.pdf"], 2020: ["2023/08/SMC_2020qp.pdf", "2023/08/SMC_2020_Solutions.pdf"], 2021: ["2023/08/SMC_2021_paper.pdf", "2023/08/SMC-2021-Solutions.pdf"], 2022: ["2023/08/SMC-2022-Paper.pdf", "2023/08/SMC-2022-Solutions.pdf"], 2023: ["2023/10/SMC-2023-Paper.pdf", "2023/10/SMC-2023-Solutions.pdf"], 2024: ["2024/10/SMC-2024-Paper.pdf", "2024/10/SMC_2024_Solutions.pdf"], 2025: ["2025/10/SMC_2025_paper.pdf", "2025/10/SMC_2025_Solutions.pdf"], 2026: ["2026/07/SMC_2026_Paper-2.pdf", "2026/07/SMC_2026_Solutions.pdf"] };
// The Intermediate Mathematical Challenge the same way (2015 to 2026; 2014 is not posted as a file). An IMC
// is named by the year it is sat, in late January or early February.
const UKMT_IMC_FILES = { 2015: ["2023/08/imc-2015-q.pdf", "2023/08/imc-2015-s.pdf"], 2016: ["2023/08/imc-2016-q.pdf", "2023/08/imc-2016-s.pdf"], 2017: ["2023/08/imc-2017-q.pdf", "2023/08/imc-2017-s.pdf"], 2018: ["2023/08/imc-2018-q.pdf", "2023/08/imc-2018-s.pdf"], 2019: ["2023/08/imc-2019-q.pdf", "2023/08/imc-2019-s.pdf"], 2020: ["2023/08/IMC_2020_q.pdf", "2023/08/IMC_2020_s.pdf"], 2021: ["2023/08/IMC-2021-Paper.pdf", "2023/08/IMC-2021-Solutions.pdf"], 2022: ["2023/08/IMC-2022-Paper-1.pdf", "2023/08/IMC_2022_Solutions.pdf"], 2023: ["2023/08/IMC_2023_Paper-1.pdf", "2023/08/IMC-2023-Solutions-.pdf"], 2024: ["2024/02/IMC_2024-Paper.pdf", "2024/02/IMC-2024-Solutions.pdf"], 2025: ["2025/01/IMC-2025-Paper.pdf", "2025/01/IMC-2025-Solutions.pdf"], 2026: ["2026/01/IMC_Paper_2026.pdf", "2026/01/IMC_Solutions_2026.pdf"] };
// The Junior Mathematical Challenge, posted the same way (2015 on; 2014 is posted only as a web page).
const UKMT_JMC_FILES = { 2015: ["2023/08/jmc-2015-q.pdf", "2023/08/jmc-2015-s.pdf"], 2016: ["2023/08/jmc-2016-q.pdf", "2023/08/jmc-2016-s.pdf"], 2017: ["2023/08/jmc-2017-q.pdf", "2023/08/jmc-2017-s.pdf"], 2018: ["2023/08/jmc-2018-q.pdf", "2023/08/jmc-2018-s.pdf"], 2019: ["2023/08/jmc-2019-q.pdf", "2023/08/jmc-2019-s.pdf"], 2020: ["2023/08/JMC-2020-q.pdf", "2023/08/JMC-2020-s.pdf"], 2021: ["2023/08/JMC-2021-paper.pdf", "2023/08/JMC-2021-Solutions.pdf"], 2022: ["2023/08/JMC_2022_Paper.pdf", "2023/08/JMC_2022_Solutions_0.pdf"], 2023: ["2023/08/JMC-2023_Paper.pdf", "2023/08/JMC-2023-Solutions.pdf"], 2024: ["2024/04/JMC-2024-Question-Paper-4.pdf", "2024/04/JMC-2024-Solutions-1.pdf"], 2025: ["2025/05/JMC-2025-Paper.pdf", "2025/05/JMC-2025-Solutions.pdf"], 2026: ["2026/05/JMC_Paper_2026.pdf", "2026/05/JMC_Solutions_2026.pdf"] };
function ukmtPdf(ref, which) {
  const m = ref.match(/^(\d{4}) UKMT (SMC|IMC|JMC),\s*Problem\s+\d+$/), f = m && { SMC: UKMT_SMC_FILES, IMC: UKMT_IMC_FILES, JMC: UKMT_JMC_FILES }[m[2]][m[1]];
  return f ? "https://ukmt.org.uk/wp-content/uploads/" + f[which === "solutions" ? 1 : 0] : null;
}
// The official paper or solutions as a PDF, for the contests that publish them.
const officialPdf = (ref, which) => hmmtPdf(ref, which) || armlPdf(ref, which) || smtPdf(ref, which) || dmmPdf(ref, which) || chmmcPdf(ref, which) || umdPdf(ref, which) || cmimcPdf(ref, which) || mathPrizePdf(ref, which) || mmathsPdf(ref, which) || gimPdf(ref, which) || lehighPdf(ref, which) || utahPdf(ref, which) || mathcountsPdf(ref, which) || mbmtPdf(ref, which) || calgaryPdf(ref, which) || columbusPdf(ref, which) || fermatPdf(ref, which) || ukmtPdf(ref, which);
function aopsUrl(ref, fam) {
  if (fam && ARCHIVE_URL[fam]) return ARCHIVE_URL[fam];
  const m = ref.match(/^(.*),\s*Problem\s+(\d+)\s*$/);
  if (!m) return null;
  // Only the MAA families have per-problem wiki pages; building one for anything else
  // produces a URL that looks right and 404s.
  if (!/\b(AMC|AIME|AJHSME|AHSME)\b/i.test(m[1])) return null;
  // The wiki names the Spring 2021 papers "2021 AMC 10A", with no season; only the Fall ones carry one.
  const slug = m[1].trim().replace(/^(\d{4})\s+Spring\s+/i, "$1 ").replace(/\s+/g, "_") + "_Problems/Problem_" + m[2];
  return "https://artofproblemsolving.com/wiki/index.php/" + slug;
}

function problemSlug(ref) {
  return ref.toLowerCase().replace(/,?\s*problem\s+/, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
// Parse a ref into { year, cname (contest incl. A/B/I/II/season), fam (family), num }.
function parseRef(ref) {
  const m = ref.match(/^(\d{4})\s+(.*?),\s*Problem\s+(\d+)$/);
  if (!m) return { year: 0, cname: ref, fam: ref, num: 0 };
  const year = +m[1], cname = m[2].trim(), num = +m[3];
  const core = cname.replace(/^(Fall|Spring)\s+/i, "");
  let fam, fm;
  if (/AIME/i.test(core)) fam = "AIME";
  else if (/AJHSME/i.test(core)) fam = "AMC 8";           // the AMC 8's name until 1998
  else if (/AHSME/i.test(core)) fam = "AMC 12";           // the AMC 12's name until 1999 (owner, 2026-11-13)
  else if ((fm = core.match(/AMC\s*(8|10|12)/i))) fam = "AMC " + fm[1];
  else if (/Putnam/i.test(core)) fam = "Putnam";
  else if (/^ARML Local\b/i.test(core)) fam = "ARML Local";  // ARML's local contest, Individual round (owner, 2026-11-13)
  else if (/^ARML\b/i.test(core)) fam = "ARML";            // the Individual round only (owner, 2026-11-13)
  else if (/^SMT\b/i.test(core)) fam = "SMT";                        // the subject tests (owner, 2026-11-13); the round stays in cname
  else if (/^Duke Math Meet\b/i.test(core)) fam = "Duke Math Meet";
  else if (/^(?:CHMMC|CMM)\b/.test(core)) fam = core.match(/^(?:CHMMC|CMM)\b/)[0];
  else if (/^UMD HSMC\b/i.test(core)) fam = "UMD HSMC";              // Part I only (owner, 2026-11-13)
  else if (/^CMIMC\b/i.test(core)) fam = "CMIMC";                    // the individual subject tests (owner, 2026-11-13)
  else if (/^Math Prize for Girls\b/i.test(core)) fam = "Math Prize for Girls";  // the 20-question test (owner, 2026-11-13)
  else if (/^MMATHS\b/i.test(core)) fam = "MMATHS";                  // the Individual test (owner, 2026-11-13)
  else if (/^Girls in Math at Yale\b/i.test(core)) fam = "Girls in Math at Yale";  // the Individual round (owner, 2026-11-13)
  else if (/^Lehigh\b/i.test(core)) fam = "Lehigh";                  // the High School Math Contest (owner, 2026-11-13)
  else if (/^Utah State Math Contest\b/i.test(core)) fam = "Utah State Math Contest";  // Junior and Senior exams (owner, 2026-11-13)
  else if (/^MATHCOUNTS (Chapter|State|National)\b/.test(core)) fam = core.match(/^MATHCOUNTS (Chapter|State|National)/)[0];  // Sprint and Target rounds (owner, 2026-11-14)
  else if (/^Columbus State Tournament\b/.test(core)) fam = "Columbus State Tournament";  // the Individual test (2026-11-14)
  else if (/^(Fermat|Cayley|Pascal) Contest\b/.test(core)) fam = core.match(/^(Fermat|Cayley|Pascal) Contest/)[0];  // CEMC Grades 11, 10 and 9 (2026-11-14)
  else if (/^UKMT (SMC|IMC|JMC)\b/.test(core)) fam = core.match(/^UKMT (SMC|IMC|JMC)/)[0];  // the Senior, Intermediate and Junior Mathematical Challenges (2026-11-14)
  else if (/^Calgary Junior Math Contest\b/.test(core)) fam = "Calgary Junior Math Contest";  // Part A (2026-11-14)
  else if (/^MBMT (Lower|Upper)\b/.test(core)) fam = core.match(/^MBMT (Lower|Upper)/)[0];  // the four individual rounds (2026-11-14)
  // HMMT runs two tournaments a year of quite different difficulty, so they are separate
  // families rather than one pile. The round (Algebra, Combinatorics, Guts, Team) stays in
  // `cname`, which dbMainHtml already uses as the heading within a year.
  else if (/HMMT/i.test(core)) {
    const season = core.match(/\b(February|November)\b/i);
    fam = season ? "HMMT " + season[1][0].toUpperCase() + season[1].slice(1).toLowerCase() : "HMMT";
  }
  else if (/^BMT\b/.test(core)) fam = "BMT";
  else if (/^BmMT\b/.test(core)) fam = "BmMT";  // the Berkeley mini Math Tournament, Individual Round (owner, 2026-11-21)
  else if (/^PUMaC Division [AB]\b/.test(core)) fam = core.match(/^PUMaC Division [AB]/)[0];
  else fam = core.replace(/\s*[AB]$|\s*I{1,3}$/, "").trim() || core;
  return { year, cname, fam, num };
}
function famSlug(f) { return f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
// A paper within a year's page: "2025 AIME I" -> "aime-i", "2021 Fall AMC 10A" -> "fall-amc-10a".
// By prestige (owner, 2026-11-15): the AMC and AIME, then the national and university tournaments, then
// the other contests; a series (AMC, HMMT, PUMaC, ARML, MATHCOUNTS, UKMT, CEMC, MBMT) stays together, junior first.
const FAM_ORDER = ["AMC 8", "AMC 10", "AMC 12", "AIME", "HMMT February", "HMMT November", "PUMaC Division A", "PUMaC Division B", "CMIMC", "SMT", "BMT", "BmMT", "ARML", "ARML Local", "Math Prize for Girls", "CHMMC", "CMM", "Duke Math Meet", "MATHCOUNTS Chapter", "MATHCOUNTS State", "MATHCOUNTS National", "UKMT JMC", "UKMT IMC", "UKMT SMC", "Pascal Contest", "Cayley Contest", "Fermat Contest", "MMATHS", "Girls in Math at Yale", "UMD HSMC", "Lehigh", "MBMT Lower", "MBMT Upper", "Columbus State Tournament", "Utah State Math Contest", "Calgary Junior Math Contest", "Putnam", "HMMT"];

module.exports = { aopsUrl, officialPdf, linkLabel, parseRef, problemSlug, famSlug, FAM_ORDER,
  UMD_FILES_BASE, UMD_FILES, UTAH_FILES, COLUMBUS_FILES, UKMT_SMC_FILES, UKMT_IMC_FILES, UKMT_JMC_FILES };
