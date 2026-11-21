#!/usr/bin/env python3
"""Draft LaTeX statements and figure crops from a contest PDF.

usage: extract.py PDF PAGES OUTJSON FIGDIR FIGPREFIX [--nums 1-10]
PAGES: e.g. "1-2" (1-based, inclusive) or "all".
Writes {num: {"s": draft, "figs": [files]}}; figures are PNG crops of each problem's drawings/images.
"""
import sys, re, json, os, unicodedata, warnings
warnings.filterwarnings("ignore")
import pymupdf as fitz

pdf, pages, out, figdir, figprefix = sys.argv[1:6]
opts = sys.argv[6:]
startpat = re.compile(r"^\s*(\d{1,2})\s*[.)]\s*")
doc = fitz.open(pdf)
if pages == "all": pr = range(len(doc))
else:
    a, b = pages.split("-") if "-" in pages else (pages, pages)
    pr = range(int(a) - 1, int(b))

SYM = {"−": "-", "–": "-", "⋅": "\\cdot ", "·": "\\cdot ", "×": "\\times ", "≤": "\\le ", "≥": "\\ge ", "≠": "\\ne ",
       "∠": "\\angle ", "△": "\\triangle ", "∆": "\\triangle ", "π": "\\pi ", "𝜋": "\\pi ", "θ": "\\theta ", "𝜃": "\\theta ",
       "α": "\\alpha ", "β": "\\beta ", "γ": "\\gamma ", "𝛼": "\\alpha ", "𝛽": "\\beta ", "𝛾": "\\gamma ", "ω": "\\omega ", "𝜔": "\\omega ",
       "Ω": "\\Omega ", "∞": "\\infty ", "√": "\\sqrt ", "∑": "\\sum ", "∏": "\\prod ", "⌊": "\\lfloor ", "⌋": "\\rfloor ",
       "⌈": "\\lceil ", "⌉": "\\rceil ", "∈": "\\in ", "∉": "\\notin ", "⊆": "\\subseteq ", "⊂": "\\subset ", "∪": "\\cup ", "∩": "\\cap ",
       "→": "\\to ", "≡": "\\equiv ", "±": "\\pm ", "°": "^\\circ ", "∘": "\\circ ", "…": "\\ldots ", "⋯": "\\cdots ", "·": "\\cdot ",
       "⟂": "\\perp ", "⊥": "\\perp ", "∥": "\\parallel ", "≈": "\\approx ", "÷": "\\div ", "ϕ": "\\phi ", "𝜙": "\\phi ", "φ": "\\varphi ",
       "λ": "\\lambda ", "𝜆": "\\lambda ", "μ": "\\mu ", "𝜇": "\\mu ", "σ": "\\sigma ", "𝜎": "\\sigma ", "τ": "\\tau ", "𝜏": "\\tau ",
       "δ": "\\delta ", "Δ": "\\Delta ", "𝛿": "\\delta ", "ε": "\\varepsilon ", "𝜀": "\\varepsilon ", "ρ": "\\rho ", "𝜌": "\\rho ",
       "ℤ": "\\mathbb{Z}", "ℝ": "\\mathbb{R}", "ℕ": "\\mathbb{N}", "ℚ": "\\mathbb{Q}", "ℂ": "\\mathbb{C}", "∣": "\\mid ", "⌢": "\\frown ",
       "‖": "\\|", "∗": "*", "′": "'", "″": "''", "⃗": "", "ˆ": "", "∀": "\\forall ", "∃": "\\exists ", "□": "\\square ", "⋆": "\\star ",
       "≅": "\\cong ", "∼": "\\sim ", "⊕": "\\oplus ", "⊗": "\\otimes ", "≺": "\\prec ", "⇒": "\\Rightarrow ", "⟹": "\\implies ",
       "ﬀ": "ff", "ﬁ": "fi", "ﬂ": "fl", "ﬃ": "ffi", "ﬄ": "ffl"}
TEXTFIX = {"ﬀ": "ff", "ﬁ": "fi", "ﬂ": "fl", "ﬃ": "ffi", "ﬄ": "ffl", "’": "'", "‘": "'", "“": '"', "”": '"', "−": "-"}
MATHFONT = re.compile(r"Math|CMMI|CMSY|CMEX|MSBM|MSAM|Symbol|Cambria Math|STIX|rsfs|EUFM|MathJax|LMMath|Asana|Euler|CMBSY|txsy|txmi|pxmi|rtxmi|eufm|wasy", re.I)

def ismath_font(f): return bool(MATHFONT.search(f))
def tomath(t):
    o = []
    for ch in t:
        if ch in SYM: o.append(SYM[ch]); continue
        n = unicodedata.normalize("NFKC", ch)
        o.append(n)
    return "".join(o)
def totext(t):
    for a, b in TEXTFIX.items(): t = t.replace(a, b)
    return t

def clean_math(m):
    m = re.sub(r"\s+", " ", m).strip()
    m = re.sub(r"\\(\w+) (?=[^a-zA-Z])", r"\\\1", m)
    return m

# ---- collect lines across pages with page/position
items = []  # (page, y0, y1, x0, kind, payload)
for pi in pr:
    pg = doc[pi]
    H = pg.rect.height
    d = pg.get_text("dict")
    # figures: images and drawing clusters
    rects = []
    for im in pg.get_image_info():
        r = fitz.Rect(im["bbox"])
        if r.width > 15 and r.height > 15: rects.append(r)
    for dr in pg.get_drawings():
        r = dr["rect"]
        if r.height < 1.6 and r.width < 120: continue  # fraction bar / underline
        if r.width > pg.rect.width * 0.8 and r.height < 3: continue  # rule
        if r.width < 0.5 and r.height < 0.5: continue
        if r.width > pg.rect.width * 0.6 and r.height > pg.rect.height * 0.5: continue  # page background
        rects.append(fitz.Rect(r))
    # cluster
    clusters = []
    for r in rects:
        r = fitz.Rect(r) + (-6, -6, 6, 6)
        merged = True
        while merged:
            merged = False
            for c in clusters:
                if c.intersects(r):
                    clusters.remove(c); r = r | c; merged = True; break
        clusters.append(r)
    clusters = [c + (6, 6, -6, -6) for c in clusters]
    clusters = [c for c in clusters if c.width > 25 and c.height > 25 and c.y0 > 40 and c.y1 < H - 20]
    lines = []
    for b in d["blocks"]:
        for l in b.get("lines", []):
            sp = [s for s in l["spans"] if s["text"].strip() != "" or s["text"] == " "]
            if not sp: continue
            lb = fitz.Rect(l["bbox"])
            lines.append((lb, sp))
    # figure labels: text spans inside a cluster are part of the figure
    keep = []
    for lb, sp in lines:
        inside = [c for c in clusters if fitz.Rect(c + (-2, -2, 2, 2)).contains(fitz.Rect(lb))]
        if inside: continue
        sp2 = [s for s in sp if not any(fitz.Rect(c + (-1, -1, 1, 1)).contains(fitz.Rect(s["bbox"])) for c in clusters)]
        if sp2: keep.append((lb, sp2))
    # merge lines with overlapping y into rows
    keep.sort(key=lambda t: (round(t[0].y0), t[0].x0))
    rows = []
    for lb, sp in keep:
        mid = (lb.y0 + lb.y1) / 2
        for r in rows:
            if abs(r["mid"] - mid) < 4.5 or (r["box"].y0 - 1 <= mid <= r["box"].y1 + 1 and lb.height < r["box"].height):
                r["spans"] += sp; r["box"] |= lb; break
        else:
            rows.append({"mid": mid, "box": fitz.Rect(lb), "spans": list(sp)})
    for r in rows:
        r["spans"].sort(key=lambda s: s["bbox"][0])
        items.append((pi, r["box"].y0, r["box"].y1, r["box"].x0, "row", r))
    for c in clusters:
        # a figure floats beside its problem: file it under the problem whose text holds its middle
        items.append((pi, (c.y0 + c.y1) / 2, c.y1, c.x0, "fig", c))
items.sort(key=lambda t: (t[0], t[1], t[3]))

# body size
sizes = {}
for it in items:
    if it[4] == "row":
        for s in it[5]["spans"]: sizes[round(s["size"])] = sizes.get(round(s["size"]), 0) + len(s["text"])
body = max(sizes, key=sizes.get) if sizes else 11
xs = sorted(it[3] for it in items if it[4] == "row")
left = xs[len(xs) // 10] if xs else 72

def row_text(r):
    spans = r["spans"]
    # baseline of row: the most common origin y among body-size spans
    bl = [s["origin"][1] for s in spans if s["size"] >= body * 0.9]
    base = sorted(bl)[len(bl) // 2] if bl else spans[0]["origin"][1]
    out, mathbuf, script = [], [], None
    def flush():
        if mathbuf:
            out.append("$" + clean_math("".join(mathbuf)) + "$"); mathbuf.clear()
    prev_end = None
    for s in spans:
        t = s["text"]
        small = s["size"] < body * 0.85
        dy = s["origin"][1] - base
        lvl = "^" if small and dy < -1 else "_" if small and dy > 0.8 else None
        m = ismath_font(s["font"]) or lvl is not None or any(unicodedata.category(c) == "Ll" and ord(c) > 0x1D400 for c in t) \
            or any(ord(c) >= 0x1D400 for c in t)
        if prev_end is not None and s["bbox"][0] - prev_end > 1.5 and not t.startswith(" "):
            (mathbuf if mathbuf else out).append(" ")
        prev_end = s["bbox"][2]
        if m:
            mt = tomath(t)
            if lvl:
                if script and script[0] == lvl:
                    script[1].append(mt)
                else:
                    if script: mathbuf.append(script[0] + "{" + "".join(script[1]).strip() + "}")
                    script = [lvl, [mt]]
                continue
            if script:
                mathbuf.append(script[0] + "{" + "".join(script[1]).strip() + "}"); script = None
            mathbuf.append(mt)
        else:
            if script:
                mathbuf.append(script[0] + "{" + "".join(script[1]).strip() + "}"); script = None
            # a lone space/punctuation between math stays in math
            if mathbuf and re.fullmatch(r"[\s(),=+\-]*", t) and t.strip() in ("", "(", ")", "=", "+", "-", ","):
                if t.strip() in (",",):
                    flush(); out.append(totext(t))
                else:
                    mathbuf.append(t)
                continue
            flush(); out.append(totext(t))
    if script: mathbuf.append(script[0] + "{" + "".join(script[1]).strip() + "}")
    flush()
    txt = "".join(out)
    txt = re.sub(r"\$\s*\$", "", txt)
    return re.sub(r"[ \t]+", " ", txt).strip()

header = set()
for pi, y0, y1, x0, kind, p in items:
    if kind != "row": continue
    raw = "".join(s["text"] for s in p["spans"]).strip()
    if startpat.match(raw): break
    header.add(re.sub(r"\s+", "", raw))
stop = False
probs, cur = {}, None
figcount = {}
for pi, y0, y1, x0, kind, p in items:
    if kind == "row":
        t = row_text(p)
        raw = "".join(s["text"] for s in p["spans"])
        key = re.sub(r"\s+", "", raw)
        if key in header or re.fullmatch(r"(Page)?\d+(of\d+)?", key) or key.startswith("Copyright"): continue
        if re.match(r"\s*(TB|Tiebreaker|Estimation)\b", raw): stop = True
        if stop: continue
        m = startpat.match(raw)
        if m and x0 < left + 25 and int(m.group(1)) == (cur + 1 if cur else int(m.group(1))) and (cur is None or int(m.group(1)) == cur + 1):
            cur = int(m.group(1)); probs[cur] = {"lines": [], "figs": []}
            t = startpat.sub("", t, count=1)
        if cur is None: continue
        indent = x0 - left
        probs[cur]["lines"].append((t, indent, p["box"].width))
    else:
        if cur is None: continue
        n = figcount.get(cur, 0) + 1; figcount[cur] = n
        os.makedirs(figdir, exist_ok=True)
        fn = f"{figprefix}-{cur}" + (f"-{n}" if n > 1 else "") + ".png"
        pix = doc[pi].get_pixmap(clip=fitz.Rect(p) + (-4, -4, 4, 4), matrix=fitz.Matrix(3, 3))
        pix.save(os.path.join(figdir, fn))
        probs[cur]["lines"].append((f"@@FIG{n}@@", 0, 0))
        probs[cur]["figs"].append(fn)

res = {}
for n, pr_ in probs.items():
    s = ""
    for t, ind, w in pr_["lines"]:
        if t.startswith("@@FIG"):
            s = s.rstrip() + "\n\n" + t + "\n\n"; continue
        disp = ind > 60 and t.startswith("$") and t.endswith("$") and t.count("$") == 2
        if disp:
            s = s.rstrip() + "\n$$" + t[1:-1] + "$$\n"
        else:
            if s and not s.endswith("\n"):
                s = s[:-1] if s.endswith("-") and re.search(r"[a-z]-$", s) else s + " "
            s += t
    s = re.sub(r"\$\s*\$", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s).strip()
    res[n] = {"s": s, "figs": pr_["figs"]}
json.dump(res, open(out, "w"), indent=1, ensure_ascii=False)
print(pdf.split("/")[-1], "problems:", sorted(res), "figs:", sum(len(v["figs"]) for v in res.values()))
