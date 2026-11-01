// Learn, AMC Geometry, chapter S8: solids (CONVENTIONS §14). Part: Core topics.
// The second plan's book, written fresh (twentieth chat). Every number here was checked by computation.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["S8"] = {
  lessons: {
    "S8.1": {
      prereq: ["pythagorean-theorem", "circle-basics", "triangle-area-standard"],
      cards: [],
      body: String.raw`Solid geometry measures volume and surface area, and finds lengths inside a solid. Almost every method reduces a solid to flat figures: a volume is a base area times a height, a surface is a net of flat faces, a length inside a solid lies in a well-chosen flat slice, and a count of small cubes is a count of positions.

A box $3 \times 4 \times 5$ has volume $60$, the base area $12$ times the height $5$. A sphere of radius $3$ has volume $\tfrac43\pi \cdot 27 = 36\pi$. And a $3 \times 3 \times 3$ cube painted on the outside and cut into $27$ unit cubes has $12$ small cubes with exactly two painted faces, one in the middle of each of the cube's $12$ edges.

The lessons take these ideas in turn: volume and surface area (S8.2), cubes (S8.3), polyhedra (S8.4), and unfolding and cross sections (S8.5). The Summary (S8.6) collects the strategies.`,
      exercises: [
        { q: String.raw`What is the volume of a box $3 \times 4 \times 5$?`, answer: "60",
          solution: String.raw`The base $3 \times 4$ has area $12$, and the height is $5$: $12 \cdot 5 = 60$.` },
        { q: String.raw`What is the volume of a sphere of radius $3$?`, answer: "36pi",
          solution: String.raw`$V = \tfrac43\pi r^3 = \tfrac43\pi \cdot 27 = 36\pi$.` },
        { q: String.raw`A $3 \times 3 \times 3$ cube is painted on the outside and cut into $27$ unit cubes. How many of them have exactly two painted faces?`, answer: "12",
          solution: String.raw`A small cube has two painted faces when it lies on an edge of the big cube but not at a corner. Each of the $12$ edges has $3 - 2 = 1$ such cube: $12$.` }
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
      body: String.raw`What is the volume of a pyramid with a square base of side $6$ and height $4$? What is the surface area of a cone of radius $3$ and height $4$? Of a sphere of radius $2$? Why is a hemisphere's volume what it is? A short list of formulas covers the solids of the AMC, and they fit together.

[[prism-pyramid-volumes|Prisms and pyramids]] have simple volumes. A prism or cylinder, the same cross section all the way up, has volume base times height, $Bh$: a cylinder of radius $2$ and height $5$ has $20\pi$. A pyramid or cone, tapering to a point, has a third of that, $\tfrac13 Bh$: the square pyramid has $\tfrac13 \cdot 36 \cdot 4 = 48$. The height is always measured at a right angle to the base, so a slanted edge is not a height; it is usually found by a right triangle through the apex.

[[cone-formulas|A cone's surface]] unrolls into a sector of a circle whose radius is the slant height $\ell = \sqrt{r^2 + h^2}$, so its curved area is $\pi r\ell$. For $r = 3$, $h = 4$, $\ell = 5$, the curved area is $15\pi$ and with the base the total is $24\pi$. The sector's angle is $\tfrac{2\pi r}{\ell}$, since its arc wraps around the base.

[[sphere-formulas|A sphere]] of radius $r$ has surface area $4\pi r^2$, four times a great circle, and volume $\tfrac43\pi r^3$: radius $2$ gives area $16\pi$. A cap of height $h$ has volume $\tfrac{\pi h^2(3r - h)}{3}$ and curved area $2\pi rh$. [[cavalieris-principle|Cavalieri's principle]] says that two solids whose slices at every height have equal areas have equal volumes. A hemisphere of radius $r$ and a cylinder of radius $r$ and height $r$ with a cone removed from it have slices of areas $\pi(r^2 - h^2)$ and $\pi r^2 - \pi h^2$ at height $h$, so the hemisphere is the cylinder less the cone: for $r = 3$, $27\pi - 9\pi = 18\pi$, which is $\tfrac23\pi \cdot 27$. A slanted stack of coins has the same volume as a straight one, for the same reason.

Find the true height before using $Bh$ or $\tfrac13Bh$, unroll a cone into a sector, and compare slices when a solid is unfamiliar. The next lesson studies cubes and boxes.`,
      related: [
        { card: "frustum-volume", note: String.raw`a cone or pyramid with its top cut off (S11.2).` },
        { card: "similar-figures-ratios", note: String.raw`volumes of similar solids in the ratio $k^3$ (S3.2).` },
        { card: "steiner-neighborhood", note: String.raw`the points within a distance of a solid (S10.6).` }
      ],
      exercises: [
        { q: String.raw`A pyramid has a square base of side $6$ and height $4$. What is its volume?`, answer: "48",
          solution: String.raw`$V = \tfrac13 Bh = \tfrac13 \cdot 36 \cdot 4 = 48$.` },
        { q: String.raw`A cone has base radius $3$ and height $4$. What is its total surface area, base included?`, answer: "24pi",
          solution: String.raw`The slant height is $\sqrt{9 + 16} = 5$. The curved area is $\pi r\ell = 15\pi$ and the base is $9\pi$: in all $24\pi$.` },
        { q: String.raw`What is the surface area of a sphere of radius $2$?`, answer: "16pi",
          solution: String.raw`$4\pi r^2 = 16\pi$.` },
        { q: String.raw`What is the volume of a cylinder of radius $2$ and height $5$?`, answer: "20pi",
          solution: String.raw`$V = \pi r^2 h = 4\pi \cdot 5 = 20\pi$.` },
        { q: String.raw`A cone of radius $3$ and height $3$ is removed from a cylinder of radius $3$ and height $3$, with the cone's point at the center of the cylinder's bottom face. What is the volume left?`, answer: "18pi",
          solution: String.raw`The cylinder has $27\pi$ and the cone $\tfrac13 \cdot 9\pi \cdot 3 = 9\pi$, leaving $18\pi$. At height $h$ the slice left is a ring of area $9\pi - \pi h^2$, the same as a hemisphere's slice, so this is also the volume of a hemisphere of radius $3$, $\tfrac23\pi \cdot 27 = 18\pi$.` }
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
      body: String.raw`How long is the diagonal through a cube of side $2$? Through a box $3 \times 4 \times 12$? A $4 \times 4 \times 4$ cube is painted and cut up: how many small cubes have one painted face? A stack of cubes is seen from the front and the side: how many cubes can it hold? Cubes and boxes come with their own counts and lengths.

[[cube|A cube]] of side $s$ has face diagonals $s\sqrt2$ and a space diagonal $s\sqrt3$, $2\sqrt3$ for $s = 2$; the sphere through its corners has radius $\tfrac{s\sqrt3}{2}$ and the sphere touching its faces radius $\tfrac s2$. [[space-diagonal|A box's space diagonal]] is the Pythagorean theorem twice: the face diagonal $\sqrt{\ell^2 + w^2}$ and the height make a right triangle, so $d = \sqrt{\ell^2 + w^2 + h^2}$, which is $\sqrt{9 + 16 + 144} = 13$ for $3 \times 4 \times 12$.

[[painted-cubes|A painted cube]] of side $n$ cut into unit cubes sorts them by position: $8$ corners with three painted faces, $12(n - 2)$ edge cubes with two, $6(n - 2)^2$ face cubes with one, and $(n - 2)^3$ hidden cubes with none. For $n = 4$: $24$ with one face and $8$ with none. [[cube-stack-views|Views of a stack]] give the tallest column in each row and column: the front view shows the largest height in each column of the base, the side view in each row. The most cubes the views allow puts on each square the smaller of its row's and column's maximum, and the fewest uses each maximum as few times as possible.

[[cube-nets|A net]] is a cube unfolded into six squares joined along edges. Two squares with exactly one square between them in a straight row are opposite faces when folded, and of the eleven nets every one has three pairs of opposite faces found this way. [[scale-one-level|A repeating figure]], in which each level is a copy of the last scaled by $k$, has a total that is a geometric series: areas $A_1, k^2A_1, \ldots$ add to $\tfrac{A_1}{1 - k^2}$, so a figure of area $12$ that repeats at half the size totals $16$.

Use the Pythagorean theorem twice for a diagonal, sort painted cubes by corner, edge, face and interior, read the tallest columns from the views, and find opposite faces in a net by the straight rows. The next lesson turns to other polyhedra.`,
      related: [
        { card: "distance-3d", note: String.raw`the space diagonal as a distance in coordinates (S11.3).` },
        { card: "joined-shapes-perimeter", note: String.raw`the surface lost when cubes are glued together (S1.4).` },
        { card: "nested-similar", note: String.raw`nested figures in the plane, scaled at every step (S3.3).` }
      ],
      exercises: [
        { q: String.raw`What is the length of the diagonal through a cube of side $2$, from a corner to the opposite corner?`, answer: "2sqrt(3)",
          solution: String.raw`The face diagonal is $2\sqrt2$, and it and an edge of $2$ make a right triangle with the space diagonal: $\sqrt{8 + 4} = 2\sqrt3$.` },
        { q: String.raw`What is the length of the space diagonal of a box $3 \times 4 \times 12$?`, answer: "13",
          solution: String.raw`$\sqrt{3^2 + 4^2 + 12^2} = \sqrt{169} = 13$.` },
        { q: String.raw`A $4 \times 4 \times 4$ cube is painted on the outside and cut into $64$ unit cubes. How many of them have exactly one painted face?`, answer: "24",
          solution: String.raw`A small cube with one painted face is in the middle part of a face: each face has $(4 - 2)^2 = 4$ of them, and there are $6$ faces, so $24$.` },
        { q: String.raw`A figure is made of pieces: the first has area $12$, and each later piece is a copy of the one before with all lengths halved, continuing forever. What is the total area?`, answer: "16",
          solution: String.raw`Halving lengths quarters areas, so the areas are $12, 3, \tfrac34, \ldots$, a geometric series with ratio $\tfrac14$: $\tfrac{12}{1 - 1/4} = 16$.` }
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
      body: String.raw`A polyhedron has $20$ triangular faces: how many corners does it have? What is the volume of a regular octahedron of side $2$? A soccer ball has $12$ pentagons and $20$ hexagons: how many edges and corners? Polyhedra are counted by their faces, edges and corners, and measured by cutting them into pyramids.

[[eulers-polyhedron-formula|Euler's formula]] says that a convex polyhedron with $V$ corners, $E$ edges and $F$ faces has $V - E + F = 2$. It pairs with a double count of edges: adding the sides of all the faces counts each edge twice. For $20$ triangular faces, $2E = 60$, so $E = 30$ and $V = 2 + 30 - 20 = 12$. For the soccer ball, $2E = 12 \cdot 5 + 20 \cdot 6 = 180$, so $E = 90$ and $V = 2 + 90 - 32 = 60$. Counting the corners by how many faces meet at each gives a third equation when needed.

[[regular-octahedron|The regular octahedron]] is two square pyramids glued at their bases, with eight equilateral faces. With side $s$, the square in the middle has diagonal $s\sqrt2$, so each pyramid has height $\tfrac{s\sqrt2}{2}$ and the octahedron has volume $2 \cdot \tfrac13 s^2 \cdot \tfrac{s\sqrt2}{2} = \tfrac{\sqrt2}{3}s^3$, which is $\tfrac{8\sqrt2}{3}$ for $s = 2$. Its corners are the centers of a cube's faces, and its cross sections parallel to a face include a regular hexagon.

[[dodecahedron-icosahedron|The dodecahedron and the icosahedron]] are the other two large regular solids: the dodecahedron has $12$ pentagonal faces, $30$ edges and $20$ corners, and the icosahedron $20$ triangular faces, $30$ edges and $12$ corners. Each one's corners match the other's faces, and both satisfy Euler's formula, $20 - 30 + 12 = 2$.

Count edges by adding the sides of the faces, then use $V - E + F = 2$; cut a polyhedron into pyramids to measure it. The next lesson unfolds and slices solids.`,
      related: [
        { card: "handshake-lemma", note: String.raw`the same double count of edges in a graph (R7.3).` },
        { card: "regular-tetrahedron", note: String.raw`the regular solid with four faces (S11.2).` },
        { card: "plane-cross-section", note: String.raw`the shape of a slice through a solid (S11.3).` }
      ],
      exercises: [
        { q: String.raw`A convex polyhedron has $20$ faces, all triangles. How many corners does it have?`, answer: "12",
          solution: String.raw`The faces have $60$ sides, and each edge is a side of two faces, so $E = 30$. By Euler's formula, $V = 2 + E - F = 2 + 30 - 20 = 12$.` },
        { q: String.raw`What is the volume of a regular octahedron with side $2$?`, answer: "8sqrt(2)/3",
          solution: String.raw`It is two square pyramids on a common square of side $2$, whose diagonal is $2\sqrt2$. Each pyramid's apex is above the center of the square at distance $\sqrt{4 - 2} = \sqrt2$, so each has volume $\tfrac13 \cdot 4 \cdot \sqrt2$. In all $\tfrac{8\sqrt2}{3}$.` },
        { q: String.raw`A soccer ball is a polyhedron with $12$ pentagonal and $20$ hexagonal faces. How many corners does it have?`, answer: "60",
          solution: String.raw`The faces have $60 + 120 = 180$ sides, so $E = 90$. With $F = 32$, Euler's formula gives $V = 2 + 90 - 32 = 60$.` }
      ],
      problems: [
        "2009 AMC 12A, Problem 22",
        "2012 AMC 12B, Problem 19"
      ]
    },
    "S8.5": {
      prereq: ["pythagorean-theorem", "cone-formulas", "inradius-area"],
      cards: ["unfold-the-surface", "cross-section-method"],
      body: String.raw`An ant walks on the surface of a cube of side $1$ from one corner to the opposite corner: how short can its path be? A cone of slant height $6$ and radius $2$ is cut along a slant and flattened: what shape is it? A ball sits inside a cone, touching it all around: how big is the ball? Two moves reduce a solid to a flat figure.

[[unfold-the-surface|Unfolding a surface]] finds shortest paths on it. A path along the faces of a solid becomes a path in the net, and the shortest one is a straight segment there. For the cube, unfold two faces into a $1 \times 2$ rectangle: the path is its diagonal, $\sqrt{1 + 4} = \sqrt5$. On a box $a \le b \le c$ from a corner to the opposite corner, the shortest path is $\sqrt{(a + b)^2 + c^2}$, and different unfoldings must be compared when the start and end are not corners. A cone unfolds into a sector of radius $\ell$ and angle $\tfrac{2\pi r}{\ell}$: $120^\circ$ for $\ell = 6$ and $r = 2$; a path around a cone is a chord of that sector.

[[cross-section-method|Slicing a solid]] through its axis of symmetry turns it into a flat figure with the same key lengths: a sphere becomes a circle, a cone a triangle, a cylinder a rectangle. A ball inside a cone of radius $3$ and height $4$, touching its side all around and its base, appears in the slice through the axis as the circle inscribed in a triangle with sides $5$, $5$, $6$. That triangle has area $12$ and semiperimeter $8$, so the ball has radius $\tfrac32$. Choose the slice that contains every center and point of contact the problem mentions.

Unfold a surface into a net and draw a straight line for a shortest path, and slice a round solid through its axis to make a flat problem. The Summary follows.`,
      related: [
        { card: "reflect-across-the-line", note: String.raw`straightening a path in the plane by reflecting (S7.5).` },
        { card: "plane-cross-section", note: String.raw`slices that are not through an axis (S11.3).` },
        { card: "circle-in-angle", note: String.raw`a circle touching two sides of an angle, as a ball in a cone does in the slice (S5.6).` }
      ],
      exercises: [
        { q: String.raw`An ant walks along the surface of a cube of side $1$ from a corner to the opposite corner. What is the length of the shortest such path?`, answer: "sqrt(5)",
          solution: String.raw`Unfold two adjacent faces into a $1 \times 2$ rectangle with the two corners at opposite ends. The shortest path is the rectangle's diagonal, $\sqrt{1^2 + 2^2} = \sqrt5$.` },
        { q: String.raw`A cone has slant height $6$ and base radius $2$. Its curved surface is cut along a slant line and laid flat. What is the angle of the resulting sector, in degrees?`, answer: "120",
          solution: String.raw`The sector has radius $6$ and arc length equal to the base's circumference, $4\pi$. A full circle of radius $6$ has circumference $12\pi$, so the sector is a third of it: $120^\circ$.` },
        { q: String.raw`A ball sits inside a cone of base radius $3$ and height $4$, touching the base and the curved surface all around. What is its radius?`, answer: "3/2",
          solution: String.raw`The slice through the axis is a triangle with base $6$ and two sides $\sqrt{9 + 16} = 5$, and the ball's slice is its inscribed circle. The triangle has area $\tfrac12 \cdot 6 \cdot 4 = 12$ and semiperimeter $8$, so $r = \tfrac{12}{8} = \tfrac32$.` }
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
      body: String.raw`[[prism-pyramid-volumes|A prism]] has volume $Bh$ and a pyramid $\tfrac13Bh$; [[cone-formulas|a cone]] unrolls into a sector; [[sphere-formulas|a sphere]] has area $4\pi r^2$ and volume $\tfrac43\pi r^3$; and [[cavalieris-principle|equal slices]] give equal volumes.

[[cube|A cube]] and [[space-diagonal|a box]] have diagonals by the Pythagorean theorem twice; [[painted-cubes|painted cubes]] sort by position; [[cube-stack-views|views]] give the tallest columns; [[cube-nets|a net]] shows opposite faces in its straight rows; and [[scale-one-level|a repeating figure]] sums as a geometric series.

[[eulers-polyhedron-formula|Euler's formula]], $V - E + F = 2$, with the face count of edges, counts [[regular-octahedron|the octahedron]], [[dodecahedron-icosahedron|the dodecahedron and the icosahedron]] and any other polyhedron.

[[unfold-the-surface|Unfolding]] straightens a path on a surface, and [[cross-section-method|slicing through an axis]] makes a round solid flat.`,
      strategies: [
        String.raw`Measure a height at a right angle to the base; find it with a right triangle through the apex.`,
        String.raw`Reduce a solid to a flat figure: a net, a slice, or a right triangle inside it.`,
        String.raw`Sort the small cubes of a big cube into corners, edges, faces and the inside.`,
        String.raw`Count edges by adding the sides of all faces and halving, then use $V - E + F = 2$.`,
        String.raw`For a shortest path on a surface, unfold it and draw a straight line, comparing unfoldings.`,
        String.raw`Slice a sphere, cone or cylinder through its axis.`
      ]
    }
  },
  reviewProblems: {
    exercises: [
      { q: String.raw`A cube has volume $64$. What is its surface area?`, answer: "96",
        solution: String.raw`Its side is $4$, so each face has area $16$ and the six faces $96$.` },
      { q: String.raw`A closed cylinder has radius $3$ and height $4$. What is its total surface area?`, answer: "42pi",
        solution: String.raw`Two circles of area $9\pi$ and a curved side that unrolls into a $6\pi \times 4$ rectangle: $18\pi + 24\pi = 42\pi$.` },
      { q: String.raw`A sphere has volume $288\pi$. What is its surface area?`, answer: "144pi",
        solution: String.raw`$\tfrac43\pi r^3 = 288\pi$ gives $r^3 = 216$, so $r = 6$, and the area is $4\pi \cdot 36 = 144\pi$.` }
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
