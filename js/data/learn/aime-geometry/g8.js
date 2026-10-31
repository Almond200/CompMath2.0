// Learn, AIME Geometry, chapter G8: three-dimensional geometry (CONVENTIONS §14).
// Codes and titles come from the shelf (LEARN-OUTLINE.md); every number here was checked by computation.
// The lessons hold all the chapter's contest problems, so the chapter has no separate review.
window.MATH_LEARN = window.MATH_LEARN || {};
window.MATH_LEARN["G8"] = {
  lessons: {
    "G8.1": {
      prereq: ["pythagorean-theorem", "similar-figures-ratios"],
      cards: ["prism-pyramid-volumes", "cone-formulas", "sphere-formulas", "frustum-volume", "cube", "space-diagonal", "regular-tetrahedron", "regular-octahedron", "painted-cubes"],
      body: String.raw`Three-dimensional problems on the AMC and AIME mostly ask for volumes, surface areas and distances in familiar solids: boxes, pyramids, cones, spheres and the regular tetrahedron and octahedron. The formulas are few, and the work is in finding the right lengths, usually by a Pythagorean computation in a well-chosen plane.

The basic [[prism-pyramid-volumes|volumes]] are base times height for a prism or cylinder and one third of that for a pyramid or cone. A [[cone-formulas|cone]] with radius $r$, height $h$ and slant height $\ell = \sqrt{r^2 + h^2}$ has lateral area $\pi r\ell$; with $r = 3$ and $h = 4$ that is $15\pi$. Unrolled, its lateral surface is a sector of radius $\ell$ and arc $2\pi r$. A [[sphere-formulas|sphere]] of radius $r$ has volume $\tfrac43\pi r^3$ and area $4\pi r^2$; radius $3$ gives volume $36\pi$. A [[frustum-volume|frustum]] is a cone or pyramid with its top cut off, and its volume is the big solid minus the small one, or $\tfrac h3(A_1 + \sqrt{A_1A_2} + A_2)$ from the two base areas.

A [[cube|cube]] of edge $s$ has face diagonals $s\sqrt2$ and space diagonals $s\sqrt3$; the [[space-diagonal|space diagonal]] of an $a \times b \times c$ box is $\sqrt{a^2 + b^2 + c^2}$, so $3 \times 4 \times 12$ gives $13$. Problems often give the sum of the edges and the surface area and ask for the diagonal: $(a + b + c)^2 - 2(ab + bc + ca) = a^2 + b^2 + c^2$. A [[regular-tetrahedron|regular tetrahedron]] of edge $a$ has height $a\sqrt{\tfrac23}$ and volume $\tfrac{a^3}{6\sqrt2}$, which is $18\sqrt2$ for $a = 6$; it fits in a cube using four of the cube's vertices. A [[regular-octahedron|regular octahedron]] of edge $a$ is two square pyramids, volume $\tfrac{\sqrt2}{3}a^3$, and its vertices are the face centers of a cube.

[[painted-cubes|Painted cube]] problems count the unit cubes of an $n \times n \times n$ cube with $3$, $2$, $1$ or $0$ painted faces: $8$ corners, $12(n - 2)$ on edges, $6(n - 2)^2$ on faces and $(n - 2)^3$ inside.

Find the key length with a Pythagorean computation in a plane through the solid, then apply the formula. The next lesson slices solids with planes.`,
      related: [
        { card: "square-of-sum", note: String.raw`the identity that turns the edge sum and surface area of a box into its diagonal.` },
        { card: "similar-figures-ratios", note: String.raw`volumes of similar solids scale by the cube of the ratio (B5.1).` },
        { card: "unfold-the-surface", note: String.raw`unrolling a cone into a sector (G8.5).` }
      ],
      exercises: [
        { q: String.raw`Find the space diagonal of a $3 \times 4 \times 12$ box.`, answer: "13",
          solution: String.raw`$\sqrt{3^2 + 4^2 + 12^2} = \sqrt{169} = 13$.` },
        { q: String.raw`Find the volume of a regular tetrahedron with edge $6$.`, answer: "18sqrt(2)",
          solution: String.raw`The volume of a regular tetrahedron with edge $a$ is $\tfrac{a^3}{6\sqrt2}$, so here $\tfrac{216}{6\sqrt2} = \tfrac{36}{\sqrt2} = 18\sqrt2$.` },
        { q: String.raw`A cone has base radius $3$ and height $4$. Find its lateral surface area.`, answer: "15pi",
          solution: String.raw`The slant height is $\sqrt{9 + 16} = 5$, and the lateral area is $\pi r\ell = 15\pi$.` }
      ],
      problems: [
        "2007 AMC 12A, Problem 2",
        "2021 Spring AMC 12B, Problem 6",
        "2004 AMC 12A, Problem 9",
        "2020 AMC 12A, Problem 7",
        "2001 AMC 12, Problem 8",
        "2008 AMC 12A, Problem 8",
        "2017 AMC 12A, Problem 8",
        "2020 AMC 12B, Problem 9",
        "2005 AMC 12A, Problem 10",
        "2003 AMC 12B, Problem 13",
        "2023 AMC 12B, Problem 13",
        "2014 AMC 12B, Problem 14",
        "2017 AMC 12B, Problem 14",
        "2012 AMC 12B, Problem 15",
        "2015 AMC 12A, Problem 16",
        "2015 AMC 12B, Problem 16",
        "2008 AMC 12B, Problem 18",
        "2014 AMC 12B, Problem 19",
        "2005 AMC 12A, Problem 22",
        "2022 AMC 12A, Problem 12",
        "2005 AIME II, Problem 10",
        "2004 AIME I, Problem 11",
        "2024 AIME I, Problem 15"
      ]
    },
    "G8.2": {
      prereq: ["similar-figures-ratios", "prism-pyramid-volumes"],
      cards: ["cross-section-method", "plane-cross-section", "scale-one-level", "cavalieris-principle"],
      body: String.raw`Most three-dimensional problems become two-dimensional once the right plane is chosen. A sphere inside a cone becomes a circle inside a triangle; a cube cut by a plane becomes a polygon; a liquid in a tilted container becomes a region in a cross-section. The art is choosing the plane that contains all the important points.

[[cross-section-method|Slicing a solid through its axis]] is the first choice for anything with rotational symmetry: a cone, cylinder or sphere cut through its axis shows a triangle, rectangle or circle, and spheres tangent to the cone or to each other become circles tangent to the triangle's sides or to each other. A sphere inscribed in a cone of radius $r$ and height $h$ is the incircle of the triangle with base $2r$ and height $h$. For spheres resting on a plane and touching each other, the plane through their centers perpendicular to the base shows circles of the same radii resting on a line.

[[plane-cross-section|Cutting a solid with a plane]] in a general direction produces a polygon whose vertices lie on the solid's edges. A plane through three points of a cube crosses the faces in segments, and following the plane around the cube gives a triangle, quadrilateral, pentagon or hexagon; the plane perpendicular to a space diagonal through the center cuts a regular hexagon. Finding where the plane meets each edge is a linear computation in coordinates.

Cuts parallel to a base produce similar copies, so volumes scale by the cube of the ratio: a cone cut halfway up leaves a top cone with $\tfrac18$ of the volume, and the frustum below has $\tfrac78$. [[scale-one-level|Scaling one level]] of a repeating figure, such as nested spheres and cubes or a stack of shrinking pieces, gives a geometric series. [[cavalieris-principle|Cavalieri's principle]] says that two solids whose cross-sections at every height have equal areas have equal volumes, which proves the sphere and cone formulas and handles solids swept by a moving segment.

Choose a plane through the axis or through the key points, solve the plane figure, and use similarity for parallel cuts. The next lesson measures angles and distances between lines and planes.`,
      related: [
        { card: "inradius-area", note: String.raw`the radius of a sphere in a cone from the incircle of its cross-section (G2.4).` },
        { card: "tangent-circles", note: String.raw`spheres tangent to each other, seen as circles in a cross-section (G2.5).` },
        { card: "geometric-series", note: String.raw`adding the volumes of a repeated shrinking figure.` }
      ],
      exercises: [
        { q: String.raw`A cone is cut by a plane parallel to its base, halfway up its height. What fraction of the cone's volume lies below the cut?`, answer: "7/8",
          solution: String.raw`The top piece is a cone similar to the whole with ratio $\tfrac12$, so its volume is $\tfrac18$ of the whole. The part below is $\tfrac78$.` }
      ],
      problems: [
        "2011 AMC 12A, Problem 15",
        "2011 AMC 12B, Problem 18",
        "2005 AMC 12A, Problem 17",
        "2025 AMC 12B, Problem 12",
        "2025 AMC 12B, Problem 15",
        "2009 AMC 12A, Problem 22",
        "2012 AMC 12A, Problem 22",
        "2016 AMC 12B, Problem 23",
        "2025 AMC 12A, Problem 20",
        "2020 AIME I, Problem 6",
        "2026 AIME I, Problem 3",
        "2022 AIME II, Problem 3",
        "2020 AIME II, Problem 7",
        "2024 AIME II, Problem 8",
        "2023 AIME II, Problem 14"
      ]
    },
    "G8.3": {
      prereq: ["distance-3d", "law-of-cosines"],
      cards: ["dihedral-angle", "point-plane-distance", "skew-lines-distance", "projected-area-cosine"],
      body: String.raw`Angles and distances in space are measured by reducing them to triangles. The angle between two faces of a solid, the distance from a vertex to a face, the distance between two edges that do not meet, and the area of a shadow are each found by choosing the right perpendicular, or by a formula in coordinates.

A [[dihedral-angle|dihedral angle]] between two planes is measured in a plane perpendicular to their line of intersection: drop perpendiculars to the common edge from a point in each face, at the same foot, and the angle between them is the dihedral angle. For a regular tetrahedron the faces meet at an angle with cosine $\tfrac13$, from the triangle formed by an edge and the two heights of the adjacent faces. In coordinates, the dihedral angle is the angle between the normal vectors.

The [[point-plane-distance|distance from a point to a plane]] $ax + by + cz = d$ is $\tfrac{|ax_0 + by_0 + cz_0 - d|}{\sqrt{a^2 + b^2 + c^2}}$; from $(1, 2, 3)$ to $x + 2y + 2z = 1$ it is $\tfrac{10}{3}$. Without coordinates, the distance from a vertex to the opposite face of a tetrahedron is three times the volume divided by the face's area. The [[skew-lines-distance|distance between skew lines]] is the length of their common perpendicular, computed as a projection onto the cross product of their directions, or as the height of a parallelepiped built on them.

The area of a plane figure's [[projected-area-cosine|orthogonal projection]] onto another plane is its area times the cosine of the angle between the planes. This gives dihedral angles from areas, and areas of shadows and tilted cross-sections from flat ones; it also gives the de Gua relation for a corner with three right angles: the square of the slanted face's area is the sum of the squares of the other three.

Find the perpendicular that measures the angle or distance, or compute with normals in coordinates. The next lesson works in coordinates systematically.`,
      related: [
        { card: "point-line-distance", note: String.raw`the planar version of the point-plane distance (G4.2).` },
        { card: "vector-dot-product", note: String.raw`angles between normal vectors (G6.3).` },
        { card: "cross-product-area", note: String.raw`the normal vector of a plane through three points (G8.4).` }
      ],
      exercises: [
        { q: String.raw`Find the distance from the point $(1, 2, 3)$ to the plane $x + 2y + 2z = 1$.`, answer: "10/3",
          solution: String.raw`$\tfrac{|1 + 4 + 6 - 1|}{\sqrt{1 + 4 + 4}} = \tfrac{10}{3}$.` },
        { q: String.raw`Find the cosine of the dihedral angle between two faces of a regular tetrahedron.`, answer: "1/3",
          solution: String.raw`Take edge $2$. The heights of the two faces from the midpoint of their common edge have length $\sqrt3$, and they end at the two opposite vertices, which are $2$ apart. By the law of cosines, $4 = 3 + 3 - 6\cos\theta$, so $\cos\theta = \tfrac13$.` }
      ],
      problems: [
        "1984 AIME, Problem 9",
        "1992 AIME, Problem 7",
        "2016 AIME I, Problem 4",
        "1995 AIME, Problem 12",
        "2011 AIME I, Problem 13",
        "2006 AIME I, Problem 14",
        "1986 AIME, Problem 14",
        "2016 AIME II, Problem 14",
        "1998 AIME, Problem 11",
        "2015 AIME I, Problem 15"
      ]
    },
    "G8.4": {
      prereq: ["coordinate-bash", "vector-dot-product"],
      cards: ["distance-3d", "plane-intercept-form", "cross-product-area"],
      body: String.raw`Coordinates in space work like coordinates in the plane, with one more number. A box or a cube sits naturally on three axes, and with its vertices at simple points, distances, planes and areas become formulas. For solids without right angles, putting one face in a coordinate plane usually keeps the numbers manageable.

The [[distance-3d|distance]] between $(x_1, y_1, z_1)$ and $(x_2, y_2, z_2)$ is $\sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$, two Pythagorean steps in one: from $(1, 2, 3)$ to $(4, 6, 15)$ it is $13$. Spheres tangent to coordinate planes have centers $(r, r, r)$; spheres tangent to each other have centers at distance equal to the sum of the radii; and a sphere through given points has its center equidistant from them, which gives linear equations after subtraction.

A plane through the intercepts $(a, 0, 0)$, $(0, b, 0)$, $(0, 0, c)$ has the [[plane-intercept-form|intercept form]] $\tfrac xa + \tfrac yb + \tfrac zc = 1$; with intercepts $2$, $3$, $6$ it is $3x + 2y + z = 6$. A plane through three general points is found from its normal vector, the cross product of two edge vectors.

The [[cross-product-area|cross product]] $\vec u \times \vec v$ is perpendicular to both vectors and has length equal to the area of the parallelogram they span. So the triangle with vertices $(0, 0, 0)$, $(1, 2, 0)$, $(0, 1, 2)$ has area $\tfrac12|(4, -2, 1)| = \tfrac{\sqrt{21}}{2}$. The triple product $\vec u \cdot (\vec v \times \vec w)$ is the volume of the parallelepiped they span, and a tetrahedron has one sixth of it.

Put boxes on the axes, spheres at simple centers, and use cross products for areas and normals. The last lesson of the chapter studies solids inside solids.`,
      related: [
        { card: "point-plane-distance", note: String.raw`distances from points to planes once the plane's equation is known (G8.3).` },
        { card: "shoelace-formula", note: String.raw`the planar area formula that the cross product extends (G4.3).` },
        { card: "determinant-geometric", note: String.raw`the determinant as signed area or volume (G4.3).` }
      ],
      exercises: [
        { q: String.raw`Find the distance between $(1, 2, 3)$ and $(4, 6, 15)$.`, answer: "13",
          solution: String.raw`$\sqrt{3^2 + 4^2 + 12^2} = \sqrt{169} = 13$.` },
        { q: String.raw`Find the area of the triangle with vertices $(0, 0, 0)$, $(1, 2, 0)$ and $(0, 1, 2)$.`, answer: "sqrt(21)/2",
          solution: String.raw`$(1, 2, 0) \times (0, 1, 2) = (2 \cdot 2 - 0 \cdot 1, 0 \cdot 0 - 1 \cdot 2, 1 \cdot 1 - 2 \cdot 0) = (4, -2, 1)$, of length $\sqrt{21}$. The triangle is half the parallelogram: $\tfrac{\sqrt{21}}{2}$.` }
      ],
      problems: [
        "2013 AMC 12B, Problem 11",
        "2005 AMC 12B, Problem 16",
        "2014 AMC 12A, Problem 17",
        "2013 AMC 12A, Problem 18",
        "2019 AMC 12B, Problem 18",
        "2012 AMC 12B, Problem 19",
        "2004 AMC 12A, Problem 22",
        "1987 AIME, Problem 2",
        "2002 AIME II, Problem 2",
        "2013 AIME I, Problem 7",
        "2007 AIME I, Problem 13",
        "2001 AIME II, Problem 15",
        "2002 AIME I, Problem 15"
      ]
    },
    "G8.5": {
      prereq: ["prism-pyramid-volumes", "point-plane-distance"],
      cards: ["insphere-radius", "spheres-two-planes", "box-tetrahedron", "isosceles-tetrahedron", "equal-edge-tetrahedron", "unfold-the-surface", "cube-nets", "eulers-polyhedron-formula"],
      body: String.raw`The hardest three-dimensional problems put one solid inside another: a sphere inscribed in a tetrahedron, spheres wedged between two planes, a tetrahedron with equal opposite edges inside a box. Each has a standard device, and the surface of a solid, unfolded flat, turns paths on it into straight lines.

The [[insphere-radius|insphere]] of a polyhedron touches every face, and splitting the solid into pyramids from its center gives $V = \tfrac13rS$, where $S$ is the total surface area, the three-dimensional $K = rs$. A regular tetrahedron of edge $6$ has volume $18\sqrt2$ and surface area $36\sqrt3$, so $r = \tfrac{3 \cdot 18\sqrt2}{36\sqrt3} = \tfrac{\sqrt6}{2}$. [[spheres-two-planes|Spheres tangent to two planes]] have centers on the bisecting plane of the dihedral angle, at distance equal to the radius from each plane, which reduces them to circles in an angle in the perpendicular cross-section.

[[box-tetrahedron|Boxing a tetrahedron]] places it inside a rectangular box with its edges as face diagonals. An [[isosceles-tetrahedron|isosceles tetrahedron]], one whose [[equal-edge-tetrahedron|opposite edges are equal]] in pairs, always fits this way: with box edges $p$, $q$, $r$, its edges are $\sqrt{p^2 + q^2}$, $\sqrt{q^2 + r^2}$, $\sqrt{r^2 + p^2}$, and its volume is the box minus four corner pyramids, $\tfrac13pqr$. All four faces are congruent, and the circumcenter, incenter and centroid coincide at the box's center.

[[unfold-the-surface|Unfolding the surface]] turns a path on the surface into a segment in the plane: the shortest path on a box from one corner to the opposite is the diagonal of a rectangle made of two faces, $\sqrt5$ for a unit cube; a path around a cylinder or cone unrolls into a straight line on a rectangle or sector. [[cube-nets|Folding a net into a cube]] decides which squares become opposite faces: in a row of four squares, the first and third are opposite. [[eulers-polyhedron-formula|Euler's formula]] $V - E + F = 2$ relates the counts of any convex polyhedron: $12$ vertices and $30$ edges force $20$ faces, as for the icosahedron.

Use volume and surface area for inspheres, boxes for tetrahedra with equal opposite edges, nets for paths on surfaces, and Euler's formula for counts. The last chapter goes beyond the AIME syllabus.`,
      related: [
        { card: "inradius-area", note: String.raw`the planar formula $K = rs$ that $V = \tfrac13rS$ extends (G2.4).` },
        { card: "circle-in-angle", note: String.raw`the cross-section of a sphere tangent to two planes (G5.5).` },
        { card: "reflect-across-the-line", note: String.raw`straightening paths, the planar version of unfolding (G6.4).` }
      ],
      exercises: [
        { q: String.raw`Find the radius of the sphere inscribed in a regular tetrahedron with edge $6$.`, answer: "sqrt(6)/2",
          solution: String.raw`The volume is $18\sqrt2$ and the four faces have total area $4 \cdot \tfrac{\sqrt3}{4} \cdot 36 = 36\sqrt3$. From $V = \tfrac13rS$, $r = \tfrac{54\sqrt2}{36\sqrt3} = \tfrac{3\sqrt2}{2\sqrt3} = \tfrac{\sqrt6}{2}$.` },
        { q: String.raw`A convex polyhedron has $12$ vertices and $30$ edges. How many faces does it have?`, answer: "20",
          solution: String.raw`By Euler's formula $V - E + F = 2$, $F = 2 - 12 + 30 = 20$.` }
      ],
      problems: [
        "2008 AMC 12A, Problem 11",
        "2003 AMC 12A, Problem 13",
        "2001 AMC 12, Problem 15",
        "2008 AMC 12A, Problem 18",
        "2007 AMC 12B, Problem 19",
        "2023 AMC 12B, Problem 21",
        "2024 AMC 12A, Problem 24",
        "2004 AIME II, Problem 11",
        "2001 AIME I, Problem 12",
        "2004 AIME I, Problem 14",
        "1999 AIME, Problem 15",
        "2017 AIME II, Problem 15",
        "2021 AIME II, Problem 10",
        "2026 AIME I, Problem 12",
        "2026 AIME II, Problem 12",
        "2024 AIME I, Problem 14"
      ]
    }
  }
};
