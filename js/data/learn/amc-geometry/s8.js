// Learn, AMC Geometry, chapter S8: solids (CONVENTIONS §14). Part: Core topics.
// Parallel sections, polyhedral faces and distances along surfaces.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S8"] = {
  lessons: {
    "S8.1": {
      prereq: ["pythagorean-theorem", "circle-basics", "triangle-area-standard"],
      cards: [],
      body: String.raw`A solid has three kinds of measurements. Its volume measures the space it fills. Its surface area measures the boundary, and distances measure the lengths of paths either through the solid or along that boundary. For a $3\times4\times5$ box, a horizontal slice has area $3\cdot4=12$. That same cross section persists through five units of height, giving volume $60$. To find the surface area we would instead add the areas of the six individual faces.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284 222" role="img" aria-label="A horizontal slice of the box has dimensions 3 and 4 throughout its height of 5." style="width:100%;max-width:284px;height:auto"><title>A horizontal slice of the box has dimensions 3 and 4 throughout its height of 5.</title><path d="M55 183L165 183L230 149L230 37L120 37L55 71Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M55 71L165 71L230 37" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M165 183L165 71" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M55 183L120 149L230 149" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M120 149L120 37" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M55 119.16L165 119.16L230 85.16L120 85.16Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/><text x="110" y="204" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="203" y="184" fill="currentColor" text-anchor="middle" font-size="17">4</text><text x="244" y="96" fill="currentColor" text-anchor="middle" font-size="17">5</text></svg>

Cuts reveal which dimensions matter. A slice through a box can contain its long diagonal, so we can find that length in a plane. Horizontal layers make a stack of cubes countable, and a net lays joined faces flat so a surface path can be measured in two dimensions. The cut or unfolding has to preserve the quantity being measured. For example, a straight line through a cube generally leaves its surface.`,
      exercises: [
        { q: String.raw`What is the volume of a box $3\times4\times5$?`, answer: "60",
          solution: String.raw`Put the $3\times4$ face at the bottom. Each horizontal layer one unit thick holds twelve unit cubes, and there are five layers. The box holds $12\cdot5=60$ unit cubes.` },
        { q: String.raw`What is the volume of a sphere of radius $3$?`, answer: "36pi",
          solution: String.raw`The ball fits in a cylinder of the same radius and height equal to its diameter. The hemisphere comparison in (S8.2) gives the sphere two thirds of that cylinder's volume. Thus its volume is $\frac23\cdot\pi\cdot3^2\cdot6=36\pi$.` },
        { q: String.raw`A $3\times3\times3$ cube is painted on the outside and cut into $27$ unit cubes. How many have exactly two painted faces?`, answer: "12",
          solution: String.raw`A cube with exactly two painted faces lies on an edge but away from that edge's ends. At either end it would meet a third outside face. Each of the twelve edges has one middle cube, giving twelve in all.` }
      ],
      problems: [
        "1987 AJHSME, Problem 7",
        "1992 AJHSME, Problem 16",
        "1999 AMC 8, Problem 8"
      ]
    },
    "S8.2": {
      prereq: ["triangle-area-standard", "circle-basics", "pythagorean-theorem", "similar-figures-ratios"],
      cards: ["prism-pyramid-volumes", "cone-formulas", "sphere-formulas", "cavalieris-principle"],
      body: String.raw`The cross section of a prism in a plane parallel to its base has the same area $B$ at every height. This also holds for a cylinder. The perpendicular distance $h$ between the base planes is the height. Two solids between the same pair of parallel planes have equal volumes if their cross sections at corresponding heights have equal areas. This is [[cavalieris-principle|Cavalieri's principle]]. Compare the prism or cylinder to a rectangular box with the same base area and height to get volume $Bh$. The comparison works even when the solid is slanted.

At distance $z$ from the apex of a pyramid, a section parallel to the base is a copy of the base with lengths scaled by $z/h$. Its area is $B(z/h)^2$. The same argument applies to a cone. To find the volume of [[prism-pyramid-volumes|a pyramid or cone]], compare with a square-based pyramid of base area $B$ and height $h$, which has the same slice areas. In S7 we divided a cube into three congruent square pyramids with a common apex (S7.6). Stretching the cube in the height direction gives a box, and the three pieces keep their equal volume fractions because the same stretch multiplies every volume by the same factor. The piece with the horizontal base still occupies one third of the box, so the volume is $Bh/3$. A square base of side six and a height of four give volume $48$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339 225" role="img" aria-label="Parallel slices are scaled copies of the pyramid base, with their lengths proportional to distance from the apex." style="width:100%;max-width:339px;height:auto"><title>Parallel slices are scaled copies of the pyramid base, with their lengths proportional to distance from the apex.</title><path d="M166 28L52 185L211 185L282 149L166 28" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M52 185L123 149L282 149" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M166 28L123 149" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M102.16 115.92L191.2 115.92L230.96 95.76L141.92 95.76Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/><path d="M166 28L167 167" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="166" cy="28" r="3" fill="currentColor" stroke="currentColor"/><circle cx="167" cy="167" r="2" fill="currentColor" stroke="currentColor"/><text x="178" y="23" fill="currentColor" text-anchor="start" font-size="17">apex</text><text x="243" y="84" fill="currentColor" text-anchor="start" font-size="17">section</text><text x="167" y="208" fill="currentColor" text-anchor="middle" font-size="17">base</text></svg>

The slant height $\ell$ of a right circular cone is the distance from its apex to a point on its base rim. The axial cross section gives $\ell=\sqrt{r^2+h^2}$. A cut along one such segment lets the side unroll without stretching into a sector of radius $\ell$. Its arc must fit the base circumference $2\pi r$, so its angle in radians is $2\pi r/\ell$. The fraction $r/\ell$ of a full disk of radius $\ell$ gives lateral area $\pi r\ell$. Add $\pi r^2$ if the base is included. For [[cone-formulas|a right cone]] of radius three and height four, the slant height is five and the closed surface area is $24\pi$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415 195" role="img" aria-label="A cone flattened along one slant line produces a sector with the same arc length as the base circumference." style="width:100%;max-width:415px;height:auto"><title>A cone flattened along one slant line produces a sector with the same arc length as the base circumference.</title><ellipse cx="101" cy="136" rx="54" ry="13" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M47 136L101 64L155 136" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M101 64L101 136L155 136" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><text x="141" y="108" fill="currentColor" text-anchor="middle" font-size="17">ℓ</text><text x="90" y="111" fill="currentColor" text-anchor="middle" font-size="17">h</text><text x="126" y="159" fill="currentColor" text-anchor="middle" font-size="17">r</text><path d="M296 64 L392.057 32.789 A101 101 0 1 1 199.943 32.789 Z" fill="currentColor" fill-opacity=".09" stroke="currentColor" stroke-width="1.5"/><text x="344" y="64" fill="currentColor" text-anchor="middle" font-size="17">ℓ</text><text x="296" y="147" fill="currentColor" text-anchor="middle" font-size="17">arc = 2πr</text></svg>

At height $z$ above the equator of a [[sphere-formulas|sphere]] of radius $r$, a horizontal slice is a disk of area $\pi(r^2-z^2)$. Compare the upper hemisphere with a cylinder of radius and height $r$ from which we remove a cone with apex at the bottom center. At height $z$ this cone has radius $z$, so the remaining annulus has the same area as the disk. The hemisphere's volume is therefore $\pi r^3-\pi r^3/3$, and the whole sphere has volume $4\pi r^3/3$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 215" role="img" aria-label="At height z the hemisphere disk and the cylinder minus cone annulus have equal area." style="width:100%;max-width:434px;height:auto"><title>At height z the hemisphere disk and the cylinder minus cone annulus have equal area.</title><path d="M36 147 A72 72 0 0 1 180 147" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="108" cy="147" rx="72" ry="14" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="108" cy="105" rx="58.5" ry="11" fill="currentColor" fill-opacity=".10" stroke="currentColor" stroke-width="1.4"/><path d="M235 147L235 75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M379 147L379 75" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="307" cy="147" rx="72" ry="14" fill="none" stroke="currentColor" stroke-width="1.4"/><ellipse cx="307" cy="75" rx="72" ry="14" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M235 75L307 147L379 75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><ellipse cx="307" cy="105" rx="72" ry="13" fill="currentColor" fill-opacity=".10" stroke="currentColor" stroke-width="1.4"/><ellipse cx="307" cy="105" rx="42" ry="8" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="105" y="193" fill="currentColor" text-anchor="middle" font-size="17">Disk</text><text x="304" y="193" fill="currentColor" text-anchor="middle" font-size="17">Annulus</text><text x="207" y="109" fill="currentColor" text-anchor="middle" font-size="17">z</text></svg>

The same comparison gives the volume of a cap, the part of a ball above a plane. For a cap of height $d\le r$, subtract the volume below $z=r-d$ from the hemisphere. That lower portion has the volume of a cylinder of radius $r$ and height $r-d$, less a cone of radius and height $r-d$. Simplifying gives cap volume $\pi d^2(r-d/3)$. A cap taller than a hemisphere is the ball less a cap of height $2r-d$, which gives the same formula for $r<d\le 2r$.

For surface area, divide a meridian semicircle into short arcs and rotate their chords about the vertical diameter. This makes a succession of narrow conical frusta. A chord spanning central angle $2\delta$ with midpoint at angular distance $\theta$ from the top has length $2r\sin\delta$. Its vertical drop is that length times $\sin\theta$, and the mean of the two endpoint radii is $r\sin\theta\cos\delta$. The lateral area of its frustum is $2\pi$ times that mean radius times the chord length, by subtracting two cone sectors, or by unrolling a cylinder if the endpoint radii agree. Thus the frustum area is $2\pi r\cos\delta$ times its vertical drop. In the limit, as the largest $\delta$ tends to zero, the areas approach the spherical belt area $2\pi r$ times the belt's height. The whole height $2r$ gives area $4\pi r^2$, and a cap of height $d$ has curved area $2\pi rd$.`,
      related: [
        { card: "frustum-volume", note: String.raw`a cone or pyramid with its top cut off (S11.2).` },
        { card: "similar-figures-ratios", note: String.raw`volumes of similar solids in the ratio $k^3$ (S3.2).` },
        { card: "steiner-neighborhood", note: String.raw`the points within a distance of a solid (S10.6).` }
      ],
      exercises: [
        { q: String.raw`A pyramid has a square base of side $6$ and perpendicular height $4$. What is its volume?`, answer: "48",
          solution: String.raw`The base area is $6^2=36$. The parallel sections shrink toward the apex, giving the pyramid one third the volume of a prism of the same base area and perpendicular height. Its volume is $\frac13\cdot36\cdot4=48$.` },
        { q: String.raw`A right circular cone has base radius $3$ and height $4$. What is its total surface area, base included?`, answer: "24pi",
          solution: String.raw`An axial right triangle gives slant height $\sqrt{3^2+4^2}=5$. The curved side unrolls into a sector of radius five with arc length $6\pi$. Its area is $\frac12\cdot5\cdot6\pi=15\pi$. Add the base area $9\pi$ to get $24\pi$.` },
        { q: String.raw`What is the surface area of a sphere of radius $2$?`, answer: "16pi",
          solution: String.raw`The spherical belt formula gives area $2\pi r$ times the vertical extent. The whole sphere extends $2r=4$ units from pole to pole, giving $2\pi\cdot2\cdot4=16\pi$.` },
        { q: String.raw`What is the volume of a cylinder of radius $2$ and perpendicular height $5$?`, answer: "20pi",
          solution: String.raw`Every parallel section has the same area $\pi\cdot2^2=4\pi$, so a rectangular box of base area $4\pi$ and height five has the same volume by Cavalieri's principle. This gives $20\pi$.` },
        { q: String.raw`A right circular cone of radius $3$ and height $3$ is removed from a cylinder of radius $3$ and height $3$. The cone's apex is at the center of the cylinder's bottom face and its base is the top face. What volume is left?`, answer: "18pi",
          solution: String.raw`The cylinder has volume $9\pi\cdot3=27\pi$. The cone has the same base area and perpendicular height, so its volume is $27\pi/3=9\pi$. Subtracting gives $18\pi$. Slice by slice the remainder also matches a hemisphere of radius three, since at height $z$ the cone removes a disk of radius $z$.` }
      ],
      problems: [
        "2006 AMC 8, Problem 21",
        "2008 AMC 8, Problem 21",
        "2019 AMC 8, Problem 9",
        "2007 AMC 10A, Problem 3",
        "2021 Fall AMC 10A, Problem 3",
        "2004 AMC 10A, Problem 11",
        "2017 AMC 10A, Problem 11",
        "2003 AMC 10B, Problem 17",
        "2001 AMC 10, Problem 17",
        "2012 AMC 10B, Problem 17",
        "2015 AMC 10B, Problem 17",
        "2020 AMC 10B, Problem 10",
        "2007 AMC 12B, Problem 19",
        "2025 AMC 12B, Problem 12"
      ]
    },
    "S8.3": {
      prereq: ["pythagorean-theorem", "geometric-series"],
      cards: ["cube", "space-diagonal", "painted-cubes", "cube-stack-views", "cube-nets", "scale-one-level"],
      body: String.raw`In a rectangular box with side lengths $a,b,c$, the diagonal of the base has length $\sqrt{a^2+b^2}$. One endpoint of the [[space-diagonal|space diagonal]] lies vertically above the far end of that base diagonal. The vertical edge is perpendicular to the base, so a second use of the Pythagorean theorem gives $\sqrt{a^2+b^2+c^2}$. For a $3\times4\times12$ box, the two successive hypotenuses are five and thirteen.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283 222" role="img" aria-label="The base diagonal and a perpendicular edge form the legs of a right triangle through the box." style="width:100%;max-width:283px;height:auto"><title>The base diagonal and a perpendicular edge form the legs of a right triangle through the box.</title><path d="M55 183L165 183L230 149L230 37L120 37L55 71Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M55 71L165 71L230 37" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M165 183L165 71" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M55 183L120 149L230 149" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M120 149L120 37" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M55 183L230 149L230 37Z" fill="currentColor" fill-opacity="0.11" stroke="currentColor" stroke-width="2"/><circle cx="55" cy="183" r="2" fill="currentColor" stroke="currentColor"/><circle cx="230" cy="149" r="2" fill="currentColor" stroke="currentColor"/><circle cx="230" cy="37" r="2" fill="currentColor" stroke="currentColor"/><text x="105" y="205" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="209" y="181" fill="currentColor" text-anchor="middle" font-size="17">4</text><text x="248" y="99" fill="currentColor" text-anchor="middle" font-size="17">12</text><text x="172" y="178" fill="currentColor" text-anchor="middle" font-size="17">5</text><text x="96" y="117" fill="currentColor" text-anchor="middle" font-size="17">13</text></svg>

A [[cube|cube]] of side $s$ has face diagonals $s\sqrt2$ and space diagonals $s\sqrt3$. Its center is the midpoint of each space diagonal, so the sphere through its vertices has radius $s\sqrt3/2$. The perpendicular distance from the center to any face is $s/2$, which is the radius of the sphere touching all six faces from inside.

For a [[painted-cubes|painted cube]] subdivided into an $n\times n\times n$ grid, with $n\ge2$, index each small cube by its three positions. Each coordinate at an extreme position contributes one painted face. Three extremes give eight corner cubes. Exactly two extremes give $12(n-2)$ edge cubes. Exactly one gives $6(n-2)^2$ face-interior cubes, and no extremes give $(n-2)^3$ buried cubes. The cases are disjoint and account for all $n^3$ cubes. A single undivided cube instead has all six faces painted.

For a separate model, stack unit cubes in vertical columns without gaps. In [[cube-stack-views|front and side views]], each visible silhouette height is a maximum rather than a sum. A cell belongs to one line of sight from each view. Its height is bounded by the smaller of those two required maxima. Filling every cell to its bound realizes both views as long as they have the same overall maximum. Indeed, each line of sight crosses a line from the other view with that overall maximum, so each has a cell that reaches its own required height.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 192" role="img" aria-label="The largest compatible stack has heights 3, 1, 2, 1, realizing row maxima 3 and 2 and column maxima 3 and 1." style="width:100%;max-width:342px;height:auto"><title>The largest compatible stack has heights 3, 1, 2, 1, realizing row maxima 3 and 2 and column maxima 3 and 1.</title><path d="M54 55L204 55L204 145L54 145Z" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/><path d="M129 55L129 145" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M54 100L204 100" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="91" y="84" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="166" y="84" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="91" y="129" fill="currentColor" text-anchor="middle" font-size="17">2</text><text x="166" y="129" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="247" y="84" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="247" y="129" fill="currentColor" text-anchor="middle" font-size="17">2</text><text x="91" y="169" fill="currentColor" text-anchor="middle" font-size="17">3</text><text x="166" y="169" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="248" y="35" fill="currentColor" text-anchor="middle" font-size="17">Row maxima</text><text x="261" y="169" fill="currentColor" text-anchor="middle" font-size="15">Column maxima</text></svg>

For the fewest cubes, the heights must attain every row and column maximum at least once. Suppose the two row maxima are three and two, and the two column maxima are three and one. The first column must contain heights three and two, since the other column can hold at most one. Then a single cube in either cell of the second column suffices. The minimum is six, whereas filling to all four bounds gives seven. If a top view is also specified, every marked cell needs at least one cube and an unmarked cell must be empty.

A [[cube-nets|cube net]] has six squares joined along edges and folds so that each becomes a different face. Three squares in a straight strip make two successive quarter turns around parallel edges, putting the two end squares on opposite faces. For other pairs, keep track of which direction each face points when folded. Start with one face pointing up. Across a shared edge the next outward normal turns through $90^\circ$, carrying the direction of that square's edges along with it. Opposite faces have opposite normals. For the net in the figure, the three pairs follow from straight strips. Other nets require following bends as well.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 222" role="img" aria-label="A cross-shaped net of a cube. Opposite pairs are A and C, B and D, and E and F." style="width:100%;max-width:338px;height:auto"><title>A cross-shaped net of a cube. Opposite pairs are A and C, B and D, and E and F.</title><path d="M32 86L86 86L86 140L32 140Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M86 86L140 86L140 140L86 140Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M140 86L194 86L194 140L140 140Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M194 86L248 86L248 140L194 140Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M86 32L140 32L140 86L86 86Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M86 140L140 140L140 194L86 194Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><text x="59" y="119" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="113" y="119" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="167" y="119" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="221" y="119" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="113" y="65" fill="currentColor" text-anchor="middle" font-size="17">E</text><text x="113" y="173" fill="currentColor" text-anchor="middle" font-size="17">F</text><text x="294" y="90" fill="currentColor" text-anchor="middle" font-size="17">A ↔ C</text><text x="294" y="115" fill="currentColor" text-anchor="middle" font-size="17">B ↔ D</text><text x="294" y="140" fill="currentColor" text-anchor="middle" font-size="17">E ↔ F</text></svg>

The staircase net has no straight strip of three squares. Starting at $A$ with normal pointing up, successive folds across the five shared edges take the normals through six different directions. Matching opposite normals gives $A$ with $D$, $B$ with $E$, and $C$ with $F$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319 204" role="img" aria-label="The staircase is a cube net with no straight strip of three squares. Its opposite pairs are A and D, B and E, and C and F." style="width:100%;max-width:319px;height:auto"><title>The staircase is a cube net with no straight strip of three squares. Its opposite pairs are A and D, B and E, and C and F.</title><path d="M31 131L77 131L77 177L31 177Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M77 131L123 131L123 177L77 177Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M77 85L123 85L123 131L77 131Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M123 85L169 85L169 131L123 131Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M123 39L169 39L169 85L123 85Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><path d="M169 39L215 39L215 85L169 85Z" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5"/><text x="54" y="160" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="100" y="160" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="100" y="114" fill="currentColor" text-anchor="middle" font-size="17">C</text><text x="146" y="114" fill="currentColor" text-anchor="middle" font-size="17">D</text><text x="146" y="68" fill="currentColor" text-anchor="middle" font-size="17">E</text><text x="192" y="68" fill="currentColor" text-anchor="middle" font-size="17">F</text><text x="269" y="82" fill="currentColor" text-anchor="middle" font-size="17">A ↔ D</text><text x="269" y="107" fill="currentColor" text-anchor="middle" font-size="17">B ↔ E</text><text x="269" y="132" fill="currentColor" text-anchor="middle" font-size="17">C ↔ F</text></svg>

When a construction repeats at a smaller scale, [[scale-one-level|find the change from one level to the next]]. A length factor $k$ multiplies areas by $k^2$ and volumes by $k^3$. If disjoint pieces start with area twelve and repeat at half the length scale, their areas are $12,3,3/4,\ldots$. The ratio is $1/4$, so their total area is $12/(1-1/4)=16$. The geometric sum applies to the measures of the separate pieces. To measure their union, their interiors must be disjoint.`,
      related: [
        { card: "distance-3d", note: String.raw`the space diagonal as a distance in coordinates (S11.3).` },
        { card: "joined-shapes-perimeter", note: String.raw`the surface lost when cubes are glued together (S1.4).` },
        { card: "nested-similar", note: String.raw`nested figures in the plane, scaled at every step (S3.3).` }
      ],
      exercises: [
        { q: String.raw`What is the length of the space diagonal of a cube of side $2$?`, answer: "2sqrt(3)",
          solution: String.raw`The face between one endpoint and the point directly below the other contains a diagonal of length $\sqrt{2^2+2^2}=2\sqrt2$. That segment and a perpendicular edge of length two are the legs of a second right triangle. Its hypotenuse is $\sqrt{8+4}=2\sqrt3$.` },
        { q: String.raw`What is the length of the space diagonal of a box $3\times4\times12$?`, answer: "13",
          solution: String.raw`The $3\times4$ base has diagonal five by the Pythagorean theorem. From the far end of that diagonal, the box rises twelve units perpendicular to the base. Applying the theorem again gives $\sqrt{5^2+12^2}=13$.` },
        { q: String.raw`A $4\times4\times4$ cube is painted on the outside and cut into $64$ unit cubes. How many have exactly one painted face?`, answer: "24",
          solution: String.raw`Such a cube must lie on the interior of a face, away from the edges. Removing the outside rows and columns of each face leaves a $2\times2$ square of positions. There are four qualifying cubes on each of six faces, or twenty-four altogether.` },
        { q: String.raw`A figure consists of pieces with disjoint interiors. The first has area $12$, and each later piece is a copy of the previous one with every length halved. What is the total area of the infinitely many pieces?`, answer: "16",
          solution: String.raw`Halving lengths multiplies areas by $(1/2)^2=1/4$. The first $n$ pieces have total area $12(1-4^{-n})/(1-1/4)$. As the omitted factor $4^{-n}$ tends to zero, the total tends to sixteen. The pieces have disjoint interiors, so their areas add.` }
      ],
      problems: [
        "1998 AJHSME, Problem 21",
        "1989 AJHSME, Problem 23",
        "2003 AMC 8, Problem 15",
        "2006 AMC 8, Problem 18",
        "2014 AMC 8, Problem 19",
        "2019 AMC 8, Problem 12",
        "2023 AMC 8, Problem 17",
        "2009 AMC 8, Problem 25",
        "2020 AMC 10B, Problem 2",
        "2003 AMC 10A, Problem 10",
        "2002 AMC 10A, Problem 18",
        "2005 AMC 10A, Problem 11",
        "2007 AMC 10A, Problem 21",
        "2010 AMC 10A, Problem 20"
      ]
    },
    "S8.4": {
      prereq: ["equilateral-triangle-facts", "prism-pyramid-volumes", "handshake-lemma"],
      cards: ["regular-octahedron", "dodecahedron-icosahedron", "eulers-polyhedron-formula"],
      body: String.raw`A convex polyhedron has flat polygonal faces. Every edge borders two faces, so summing the face side counts gives $2E$. The faces, edges and vertices satisfy [[eulers-polyhedron-formula|Euler's formula]] $V-E+F=2$. One way to see the formula is to project the boundary from an interior point onto a sphere. Convexity ensures that every ray reaches exactly one boundary point. Removing a point from the interior of one spherical face lets us draw the graph in the plane, with that face becoming the outer face.

For a connected drawing in the plane, remove an edge on a cycle. Connectivity survives because the rest of the cycle joins its endpoints, and two faces merge. This subtracts one from both $E$ and $F$, leaving $V-E+F$ unchanged. Continue until the graph is a tree, which has $V-1$ edges and just the outer face. Its value of $V-E+F$ is two, so the original polyhedron has the same value.

If there are twenty triangular faces then $2E=20\cdot3$, so $E=30$ and $V=12$. If there are twelve pentagons and twenty hexagons, as on a truncated icosahedron, then $2E=12\cdot5+20\cdot6=180$. With $F=32$, the vertex count is $60$. The double count uses a closed surface with two faces at each edge. Convexity guarantees the spherical topology used in the proof.

A [[regular-octahedron|regular octahedron]] of edge $s$ consists of two square pyramids joined at a square of side $s$. The perpendicular from each apex reaches the square's center, a distance $s/\sqrt2$ from each square vertex. Each slant edge has length $s$, so the perpendicular height is $\sqrt{s^2-s^2/2}=s/\sqrt2$. Together the pyramids have volume $2s^2(s/\sqrt2)/3=\sqrt2\,s^3/3$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 234" role="img" aria-label="The two square pyramids of the octahedron share the shaded middle square." style="width:100%;max-width:298px;height:auto"><title>The two square pyramids of the octahedron share the shaded middle square.</title><path d="M56 121L145 156L241 121L152 86Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/><path d="M149 17L56 121L149 212L241 121L149 17L145 156L149 212" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M149 17L152 86L149 212" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><text x="161" y="112" fill="currentColor" text-anchor="start" font-size="17">base</text></svg>

Placing the six vertices at the face centers of a cube exhibits the octahedron's symmetry. A plane halfway between opposite triangular faces meets six edges at their midpoints. The slice is a regular hexagon, with its sides half the octahedron edge length by the triangle midpoint theorem. The six angles are equal by the rotations and central symmetry preserving this slice.

The regular [[dodecahedron-icosahedron|dodecahedron and icosahedron]] illustrate another relationship. The dodecahedron has twelve pentagonal faces, so it has thirty edges and twenty vertices. The icosahedron has twenty triangular faces, so it has thirty edges and twelve vertices. They are duals: joining neighboring face centers on either solid gives the edge graph of the other. Each original face becomes a vertex, each edge corresponds to one connecting edge, and each original vertex corresponds to a face.`,
      related: [
        { card: "handshake-lemma", note: String.raw`the same double count of edges in a graph (R7.3).` },
        { card: "regular-tetrahedron", note: String.raw`the regular solid with four faces (S11.2).` },
        { card: "plane-cross-section", note: String.raw`the shape of a slice through a solid (S11.3).` }
      ],
      exercises: [
        { q: String.raw`A convex polyhedron has $20$ faces, all triangles. How many vertices does it have?`, answer: "12",
          solution: String.raw`The triangular faces together have sixty sides. Each edge is a side of two faces, so $E=30$. The surface is convex, so Euler's formula gives $V=2+30-20=12$.` },
        { q: String.raw`What is the volume of a regular octahedron with side $2$?`, answer: "8sqrt(2)/3",
          solution: String.raw`Cut along a square through four of the vertices. Its center is at distance half the diagonal, $\sqrt2$, from each square vertex. The apex of either of the two pyramids is at distance two from that square vertex, so the perpendicular height is $\sqrt{2^2-(\sqrt2)^2}=\sqrt2$. The two pieces together have volume $2\cdot\frac13\cdot4\cdot\sqrt2$.` },
        { q: String.raw`A convex polyhedron shaped like a soccer ball has $12$ pentagonal and $20$ hexagonal faces. How many vertices does it have?`, answer: "60",
          solution: String.raw`The faces contribute $12\cdot5+20\cdot6=180$ sides, with two uses of each edge. This gives ninety edges and thirty-two faces. Euler's formula then gives $V=2+90-32=60$.` }
      ],
      problems: [
        "2009 AMC 12A, Problem 22",
        "2012 AMC 12B, Problem 19"
      ]
    },
    "S8.5": {
      prereq: ["pythagorean-theorem", "cone-formulas", "inradius-area"],
      cards: ["unfold-the-surface", "cross-section-method"],
      body: String.raw`A path constrained to the surface of a polyhedron may bend at a shared edge in space. When we [[unfold-the-surface|unfold the crossed faces]] into a plane, the length of each piece of the path stays the same. For that sequence of faces the straight segment is shortest if it crosses the shared edges in the required order and stays in the unfolded faces. A different sequence can produce a different length.

For opposite corners of a box, three rectangular unfoldings suffice. If adjacent faces are unfolded so that two side lengths $a,b$ lie end to end, with the third length $c$ across the rectangle, the straight path has length $\sqrt{(a+b)^2+c^2}$. To see why no other surface path beats the best of the three unfoldings, put the corners at the origin and at the point with all three coordinates maximal. A surface path must pass from a face with a coordinate zero to one with a different coordinate maximal. At such a crossing, say $x=0$, $y=b$, $z=t$, the two parts of the path are at least their straight distances in space:
$$\sqrt{b^2+t^2}+\sqrt{a^2+(c-t)^2}\ \ge\ \sqrt{(a+b)^2+c^2}.$$
The inequality is the triangle inequality for the planar vectors $(b,t)$ and $(a,c-t)$. The bound is attained by unfolding the corresponding two faces. The three squared lengths all equal $a^2+b^2+c^2$ plus twice the product of the two dimensions laid end to end. Thus the shortest uses the two smallest dimensions for that pair. A unit cube gives $\sqrt5$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383 194" role="img" aria-label="An unfolded unit cube shows two squares side by side, with a straight path from the bottom left corner to the top right." style="width:100%;max-width:383px;height:auto"><title>An unfolded unit cube shows two squares side by side, with a straight path from the bottom left corner to the top right.</title><path d="M80 35L300 35L300 145L80 145Z" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/><path d="M190 35L190 145" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M80 145L300 35" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="80" cy="145" r="3" fill="currentColor" stroke="currentColor"/><circle cx="300" cy="35" r="3" fill="currentColor" stroke="currentColor"/><text x="61" y="161" fill="currentColor" text-anchor="middle" font-size="17">A</text><text x="319" y="31" fill="currentColor" text-anchor="middle" font-size="17">B</text><text x="134" y="170" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="244" y="170" fill="currentColor" text-anchor="middle" font-size="17">1</text><text x="323" y="96" fill="currentColor" text-anchor="middle" font-size="17">1</text></svg>

A cone's side unfolds into a sector, so the same straightening idea can apply there. Slant height six and base radius two give a sector of angle $120^\circ$. A chord gives a feasible path if it stays within the unfolded sector. If a route can cross the seam, choose a cut away from that route or lay adjacent copies of the sector together and compare the feasible segments.

For a [[cross-section-method|cross-section solution]], choose a plane that contains the lengths needed for the planar argument. An axial section of a right circular cone is an isosceles triangle, and an axial section of a cylinder is a rectangle. A plane through a ball's center cuts out a disk of the full radius. A ball touching the base and the curved surface of a right circular cone all around has its center on the axis, so an axial section makes its disk the incircle of the triangle. When the cone has base radius three and height four, the triangle has sides five, five and six. Its area is twelve and its semiperimeter is eight, giving inradius $12/8=3/2$.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 344 219" role="img" aria-label="A right cone cut through its axis gives a triangle with an inscribed circle tangent to the two sides and base." style="width:100%;max-width:344px;height:auto"><title>A right cone cut through its axis gives a triangle with an inscribed circle tangent to the two sides and base.</title><path d="M61 179L163 43L265 179Z" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-width="1.5"/><circle cx="163" cy="128" r="51" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M163 43L163 179" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="163" cy="128" r="2" fill="currentColor" stroke="currentColor"/><circle cx="163" cy="179" r="2" fill="currentColor" stroke="currentColor"/><text x="97" y="94" fill="currentColor" text-anchor="middle" font-size="17">5</text><text x="230" y="94" fill="currentColor" text-anchor="middle" font-size="17">5</text><text x="163" y="202" fill="currentColor" text-anchor="middle" font-size="17">6</text><text x="173" y="160" fill="currentColor" text-anchor="start" font-size="17">r</text></svg>`,
      related: [
        { card: "reflect-across-the-line", note: String.raw`straightening a path in the plane by reflecting (S7.5).` },
        { card: "plane-cross-section", note: String.raw`slices that are not through an axis (S11.3).` },
        { card: "circle-in-angle", note: String.raw`a circle touching two sides of an angle, as a ball in a cone does in the slice (S5.6).` }
      ],
      exercises: [
        { q: String.raw`An ant walks along the surface of a cube of side $1$ from a corner to the opposite corner. What is the length of the shortest such path?`, answer: "sqrt(5)",
          solution: String.raw`Unfold a face at the start and an adjacent face containing the finish into a $1\times2$ rectangle. Its diagonal stays inside the rectangle and gives length $\sqrt5$. The opposite-corner bound applies to any surface path: it must cross from a face containing the start to one containing the finish, and for unit dimensions each crossing gives the lower bound $\sqrt{(1+1)^2+1^2}=\sqrt5$.` },
        { q: String.raw`A right circular cone has slant height $6$ and base radius $2$. Its curved surface is cut along a slant line and laid flat. What is the angle of the resulting sector, in degrees?`, answer: "120",
          solution: String.raw`The radial edges of the flattened sector are slant lines of length six. The arc is the full base rim of length $4\pi$, one third of the circumference $12\pi$ of a circle of radius six. The central angle is one third of $360^\circ$, or $120^\circ$.` },
        { q: String.raw`A ball sits inside a right circular cone of base radius $3$ and height $4$, touching the base and the curved surface all around. What is its radius?`, answer: "3/2",
          solution: String.raw`An axial slice cuts the ball through its center and shows it tangent to all three sides of the cone's triangular section. The triangle has base six and two sides of length five, since $3^2+4^2=5^2$. Its area is twelve and its semiperimeter is eight. Dividing the area by the semiperimeter gives inradius $3/2$.` }
      ],
      problems: [
        "2004 AMC 10A, Problem 19",
        "2001 AMC 12, Problem 15",
        "2001 AMC 10, Problem 21",
        "2011 AMC 10B, Problem 22",
        "2011 AMC 12A, Problem 15",
        "2016 AMC 12B, Problem 23"
      ]
    },
    "S8.6": {
      prereq: ["prism-pyramid-volumes", "cone-formulas", "sphere-formulas", "cavalieris-principle", "cube", "space-diagonal", "painted-cubes", "cube-stack-views", "cube-nets", "scale-one-level", "regular-octahedron", "dodecahedron-icosahedron", "eulers-polyhedron-formula", "unfold-the-surface", "cross-section-method"],
      cards: [],
      body: String.raw`Horizontal cross sections explain why a [[prism-pyramid-volumes|prism or cylinder]] has volume $Bh$ and why a pyramid or cone has volume $Bh/3$. A pyramid's parallel slices are smaller copies of its base. In [[cavalieris-principle|a volume comparison]], match slice areas at each height. For a [[sphere-formulas|hemisphere]], compare disks to the annuli left after removing a cone from a cylinder. The sector of [[cone-formulas|an unrolled cone]] gives its lateral area.

A [[space-diagonal|space diagonal]] uses one right triangle in a face and one extending into the interior. In a [[cube|cube]], its midpoint is the common center of the inscribed and circumscribed spheres. Count [[painted-cubes|small painted cubes]] by the number of extreme coordinates. For [[cube-stack-views|silhouettes]], decide how to realize the required row and column maxima. A [[cube-nets|net]] can reveal opposite faces by following successive folds. In a [[scale-one-level|geometric series of pieces]], use the length, area or volume ratio that corresponds to the measure being summed.

Count the sides of the faces and divide by two for the edge count, then apply [[eulers-polyhedron-formula|Euler's formula]] to a convex polyhedron. For a [[regular-octahedron|regular octahedron]], a common square base gives a pair of pyramids. Duals such as the [[dodecahedron-icosahedron|dodecahedron and icosahedron]] exchange faces and vertices.

A valid [[unfold-the-surface|unfolding]] turns a surface path into a planar path of the same length. Compare the relevant valid unfoldings. A [[cross-section-method|cross section]] instead cuts through the solid to expose the perpendicular lengths and angles needed for calculation.`,
      strategies: [
        String.raw`Measure height perpendicular to the base. For a right cone, the height and radius determine the slant length.`,
        String.raw`Reduce a solid to a flat figure: a net, a slice, or a right triangle inside it.`,
        String.raw`Sort the small cubes of a big cube into corners, edges, faces and the inside.`,
        String.raw`Count edges by adding the sides of all faces and halving, then use $V - E + F = 2$.`,
        String.raw`For a shortest surface path, compare unfoldings whose straight segments cross the intended faces in order.`,
        String.raw`Choose a cross section that contains the centers, contacts and perpendiculars used in the calculation.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A cube has volume $64$. What is its surface area?`, answer: "96",
        solution: String.raw`If its edge is $s$, volume is $s^3$. The positive solution is $s=4$. Each square face has area $4^2=16$, and the six faces have total area ninety-six.` },
      { q: String.raw`A closed right circular cylinder has radius $3$ and height $4$. What is its total surface area?`, answer: "42pi",
        solution: String.raw`The curved side unwraps into a rectangle with width equal to the base circumference, $6\pi$, and height four. Its area is $24\pi$. The two disks each have area $9\pi$, giving $42\pi$ in all.` },
      { q: String.raw`A sphere has volume $288\pi$. What is its surface area?`, answer: "144pi",
        solution: String.raw`Setting $4\pi r^3/3=288\pi$ gives $r^3=216$. Since radius is positive, $r=6$. The surface area is $4\pi r^2=144\pi$.` },
      { q: String.raw`A pyramid has base area $75$ and perpendicular height $10$. A plane parallel to the base is $4$ units below the apex, measured perpendicularly. What is the cross-sectional area?`, answer: "12",
        solution: String.raw`Every length in the parallel section is $4/10$ of the corresponding base length by similarity from the apex. The area factor is its square, so the section has area $75(4/10)^2=12$.` },
      { q: String.raw`A spherical cap of height $3$ is cut from a ball of radius $2$. What is its volume?`, answer: "9pi",
        solution: String.raw`The whole height is four, so the complementary cap has height one. The smaller cap has volume $\pi\cdot1^2(2-1/3)=5\pi/3$. The whole ball has volume $32\pi/3$, so the cap of height three has volume $27\pi/3=9\pi$.` },
      { q: String.raw`A $3\times4\times5$ rectangular box is painted on all six faces, then cut into unit cubes. How many cubes have exactly two painted faces?`, answer: "24",
        solution: String.raw`Each such cube lies in the interior of one edge. There are four edges of length three, four of length four and four of length five. Each length $\ell$ contributes $\ell-2$ interior positions per edge, giving $4(1+2+3)=24$.` },
      { q: String.raw`A stack occupies a $2\times2$ base with row maxima $4,2$ and column maxima $4,3$. How many more cubes can the largest compatible stack contain than the smallest?`, answer: "2",
        solution: String.raw`Filling cells to the smaller of their two bounds gives row heights $(4,3)$ and $(2,2)$, with total eleven. The height four must be in the first row and first column. The height three must be in the first row and second column. At least one height two is still required in the second row. Placing it in either column and leaving the other cell empty attains the lower bound of nine, so the difference is two.` },
      { q: String.raw`A prism has two polygonal bases and $7$ rectangular side faces. How many vertices does the prism have?`, answer: "14",
        solution: String.raw`The seven side faces contribute $28$ sides. Each base has seven sides because each side face borders exactly one side of each base. Altogether the faces contribute $28+14=42$ sides, so there are twenty-one edges. The nine faces and Euler's formula give $V=2+21-9=14$ vertices.` },
      { q: String.raw`An ant walks along the surface of a $2\times3\times5$ box between opposite corners. What is the length of the shortest path?`, answer: "5sqrt(2)",
        solution: String.raw`The squared lengths of the three corner-to-corner unfoldings share the term $2^2+3^2+5^2$ and differ by twice the product of the joined dimensions. Use the two smallest dimensions, two and three. The attainable minimum is the diagonal of a $(2+3)\times5$ rectangle, of length $5\sqrt2$.` },
      { q: String.raw`A circle of radius $1$ is the axial cross section of a ball tangent to the base and side of a right cone. The cone's axial triangle has base $6$. What is the cone's height?`, answer: "9/4",
        solution: String.raw`Let the height be $h>0$, so the equal sides are $\sqrt{h^2+9}$. The triangle's area is $3h$, and its semiperimeter is $3+\sqrt{h^2+9}$. Since the inradius is one, $3h=3+\sqrt{h^2+9}$. Squaring $\sqrt{h^2+9}=3h-3$ gives $8h^2-18h=0$. The positive root is $9/4$, and it satisfies the original equation because $3h-3>0$ there.` }
    ],
    problems: [
      "2022 AMC 8, Problem 24",
      "2005 AMC 12A, Problem 17",
      "2008 AMC 10A, Problem 21",
      "2008 AMC 12A, Problem 11",
      "2021 Spring AMC 10B, Problem 10",
      "2008 AMC 12A, Problem 18",
      "2012 AMC 10B, Problem 23",
      "2019 AMC 12B, Problem 11"
    ]
  },
  challenge: {
    problems: [
      "2023 AMC 12B, Problem 21",
      "2025 AMC 12A, Problem 20",
      "2014 AMC 12B, Problem 14",
      "2017 AIME I, Problem 4",
      "2020 AIME I, Problem 6"
    ]
  }
};
