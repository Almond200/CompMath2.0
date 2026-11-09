# Accessibility review

Owner-requested verification and fixes, 2026-11-08. This reviews the friend's reported findings against the current app; it is not a claim of a complete WCAG audit.

| Finding | Verification | Resolution |
|---|---|---|
| Sidebar anchors without destinations | Confirmed: 97 real generated sidebar anchors had no `href`. | Real subject/topic/group URLs, native modifier-click behavior, and Enter navigation. Display-only preview rows use spans. |
| Faint-text contrast | Confirmed on the four shared background surfaces: 2.97–3.45:1 in light mode and 3.19–4.11:1 in dark mode. | Light `--text-faint` is `#5f6b82` (minimum 4.62:1); dark is `#8b98b6` (minimum 4.93:1). Copy/add-list controls no longer reduce this contrast with resting opacity. |
| Global search label | It had a placeholder but no explicit accessible label. | Added `aria-label="Search the reference"`. |
| Keyboard focus indicators | Native/specific indicators existed, but many custom controls suppressed outlines or only changed a border. | Shared visible two-pixel blue outline with a three-pixel offset for keyboard focus. At the owner's follow-up request, search inputs retain their existing single blue focus border instead of a second outer ring. Pointer-only focus does not acquire the ring. Edge-to-edge tiles, recent chips, suggestion rows and sidebar subject buttons/sublinks use an inward offset so clipping containers do not cut the ring off. |
| Custom radio keyboard behavior | Confirmed: button-based groups lacked the standard arrow-key/roving-focus behavior. | Shared arrow wrapping and Home/End, one Tab stop per group, disabled choices skipped, focus preserved when Settings redraws. Read-only submitted answers are not interactive Tab stops. |
| Skip link | No skip link existed. A main landmark already existed, so this was not an absence of every bypass mechanism. | First keyboard link now skips directly to main content without changing the app route. It is hidden until focused. |
| Reduced motion | Only sidebar transitions were covered; explicit smooth scrolling and wheel gliding remained. | App-wide reduced CSS motion, preference-aware explicit scrolling and instant wheel movement; live preference changes also stop a running wheel glide. |
| Small icon targets | Some dense card actions were smaller than 24px. A blanket 40–44px requirement for every control would overstate the issue: size/spacing and inline-link exceptions matter. | Dense card controls now have at least 24px targets. Card/list/About controls use 40px targets on coarse pointers, retaining glyph sizes. Adequately sized controls are preserved; the About circle itself remains 16px. |
| Contest paper tabs | Confirmed: click selection existed without arrow keys, roving focus or complete tab/panel naming. | Named tablist, linked tab/panel ids, Left/Right and Home/End, selected-tab focus and the existing responsive panel display. |
| Browser page titles | Confirmed: routes kept one static title. | Route-specific card, problem, book, practice/results and contest titles; selecting a paper updates its title too. |
| Unnamed Page Tools groups | Confirmed in the Page Tools appearance controls. | Text size and Theme have explicit group names. |
| Focus after route changes | Focus could remain on a removed element or an old navigation control. | Router navigation focuses the new content heading, with main as a fallback, without disrupting saved scroll restoration. Initial load does not steal focus. |

Adding real sidebar links also required keeping collapsed sections and the closed mobile drawer out of keyboard navigation. They now use `inert`; subject buttons expose expansion/control relationships. Opening the drawer moves focus inside it, Tab stays among its controls, and Escape closes it and returns focus to the menu button. Nested dialogs retain their existing focus handling.

The owner's screenshot follow-up confirmed that outward rings were clipped by recent-item rows, home tiles and sidebar subject/topic controls. Those boundary controls now draw the same two-pixel ring inside. Recent chips remain one row and scroll horizontally instead of hiding wrapped keyboard stops; long labels truncate visually while retaining their full accessible text. Index/Glossary search jumps focus the exact reference paragraph. Reduced-motion readers get a temporary static highlight rather than an animation that disappears immediately.

The review also found that browsing-card names needed ordinary links for keyboard access. They now link to their card pages with inherited styling; whole-card pointer behavior remains available. Star controls expose their label and pressed state.

Results overview keeps the owner's blue-highlight preference. The visible changes are contrast, keyboard rings and the focus-only skip link, plus room for small targets; the page structure is retained.

## Implementation and validation

`js/accessibility.js` provides shared choice-group behavior, skip navigation and motion helpers. The app owns real URLs, route titles, sidebar availability and page focus. All new smooth scrolling should use `AppAccessibility.scrollBehavior()`.

Run against a served checkout with Playwright available:

```sh
CHROME=/path/to/chromium COMPMATH_URL=http://localhost:8765 node tools/check-accessibility.cjs
```

`UI_ARTIFACT_DIR` optionally captures screenshots. The browser check covers light/dark, desktop/touch, contrast, skip navigation, focus rings, real sidebar URLs and modifier clicks, radio persistence and read-only answers, Settings redraws, Page Tools names, contest tabs, page titles/focus, reduced motion, target sizes, recent-row focus visibility, home-tile rings and list-editor move/Undo. Repository gates, the five regression suites, generated notes/shelf and asset-version checks remain required.

The completed pass passed 28 browser scenarios at 1280/375px in light/dark, including actual modifier-click navigation, browser Back focus, typing without focus theft, persisted keyboard answers, locked review, coarse targets and list-editor move/Undo. Screenshots were inspected. All repository gates, five regression suites, notes/shelf and diff checks passed.

The screenshot follow-up initially passed 32 accessibility scenarios at the same widths/themes, including fully visible last-item focus in both recent rows and inward home-tile rings. A boundary scan of visible controls on Home, Learn, Practice, Settings, a reference subject, a contest year and a textbook lesson found no further clipped rings at 1280/375px. The separate `tools/check-book-search.cjs` checks Index/Glossary jumps and reference highlight behavior in both themes and widths. These checks cover the affected flows; they do not certify every app state or assistive technology.

The owner then requested the original single-border search appearance. Search inputs retain their blue focus border with no extra outer ring or shadow. Browse by Tag initially focuses its heading, so the search field does not select itself or summon a phone keyboard; Tab still reaches search, Escape returns to the opener, and `/` still focuses main search explicitly. The browser check covers these behaviors and the same search styling in Practice, Settings and the list editor (36 scenarios), with textbook search covered separately. Sidebar subject buttons and first/last topic links are checked against every clipping ancestor, so a partial blue line is not treated as a complete focus indicator.

The Methods sidebar follow-up also passed 84 checks: the subject button and all six topic links, at all three text sizes in both themes and widths. Complete outlines were checked inside their clipping ancestors, and screenshots of subject/topic focus were inspected. All five Node suites, repository gates and generated notes/shelf/tree checks passed for the final batch.
