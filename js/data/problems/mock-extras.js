// Author-restated prompts for mock use; mathematical data from the official HMMT February 2019 Geometry paper.
// Original paper: https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/problems.pdf
// Answer values checked against the official solutions (no solution text imported):
// https://hmmt-archive.s3.amazonaws.com/tournaments/2019/feb/geo/solutions.pdf
// HMMT material is separately attributed; the MAA statement license does not apply to these restatements.
window.MATH_MOCK_EXTRAS = {
  '2019-hmmt-february-geometry-1': {
    statement:String.raw`Find the least real number $d$ such that every nondegenerate quadrilateral has at least two interior angles strictly less than $d$ degrees.`, answers:['120'] },
  '2019-hmmt-february-geometry-2': {
    statement:String.raw`In rectangle $ABCD$, take $E$ on $AB$ and $F$ on $CD$ so that $AF$ and $CE$ are perpendicular to $BD$. Segments $BF$ and $DE$ divide the rectangle into three equal-area pieces. If $EF=1$, determine $BD$.`, answers:['sqrt(3)'] },
  '2019-hmmt-february-geometry-3': {
    statement:String.raw`Fix a segment $AB$ of length $2$. Let $S$ consist of all points $P$ for which some $X$ on $AB$ satisfies $AX=2PX$. Determine the area of $S$.`, answers:['sqrt(3)+2pi/3'] },
  '2019-hmmt-february-geometry-4': {
    statement:String.raw`A convex hexagon $ABCDEF$ has parallelograms $ACDF$ and $ABDE$, each of area $168$. Let $G=AC\cap BD$. If $[AGB]-[CGB]=10$, find the smallest possible area of $ABCDEF$.`, answers:['196'] },
  '2019-hmmt-february-geometry-5': {
    statement:String.raw`Triangle $ABC$ satisfies $AB=AC$ and is inscribed in a circle of radius $1$ with center $O$. Reflect $C$ across $AB$ to obtain $D$. Given $OD=\sqrt3$, find a possible area of $ABC$.`, answers:['(sqrt(2)+1)/2','(sqrt(2)-1)/2'] },
  '2019-hmmt-february-geometry-6': {
    statement:String.raw`Six unit disks have pairwise disjoint interiors, and their cyclic neighbors are tangent: $C_1$ touches $C_2$, through $C_6$ touching $C_1$. For each such configuration, take the radius of its smallest enclosing circle. If the least and greatest possible radii are $r$ and $R$, determine $R-r$.`, answers:['sqrt(3)-1'] },
  '2019-hmmt-february-geometry-7': {
    statement:String.raw`Let $AB=13$, $BC=14$, $CA=15$ and let $H$ be the orthocenter of $ABC$. Find the nonzero radius of the circle tangent to the three circumcircles of $AHB$, $BHC$ and $CHA$.`, answers:['65/4'] },
  '2019-hmmt-february-geometry-8': {
    statement:String.raw`In triangle $ABC$, $AB\lt AC$, $BC=1$ and the perimeter is $6$. The midpoint of the segment joining the orthocenter $H$ to the circumcenter $O$ lies on $BC$. Find the triangle's area.`, answers:['6/7'] },
  '2019-hmmt-february-geometry-9': {
    statement:String.raw`In a rectangular box $ABCDEFGH$, with $ABCD$ and $EFGH$ corresponding opposite faces, $AB=AD=6$ and $AE=49$. A plane through $A$ meets $BF$, $FG$, $GH$ and $HD$ at $P$, $Q$, $R$ and $S$. If $AP=AS$ and $PQ=QR=RS$, find the area of $APQRS$.`, answers:['141sqrt(11)/2'] },
  '2019-hmmt-february-geometry-10': {
    statement:String.raw`Start with $AB=13$, $BC=14$, $CA=15$. Erect outward squares $ABB_1A_2$, $BCC_1B_2$ and $CAA_1C_2$. Outside hexagon $A_1A_2B_1B_2C_1C_2$, erect squares $A_1A_2A_3A_4$, $B_1B_2B_3B_4$ and $C_1C_2C_3C_4$. Outside the resulting hexagon $A_4A_3B_4B_3C_4C_3$, erect squares $A_3B_4B_5A_6$, $B_3C_4C_5B_6$ and $C_3A_4A_5C_6$. Determine the area of $A_5A_6B_5B_6C_5C_6$.`, answers:['19444'] }
};
