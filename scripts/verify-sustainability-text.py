"""Check that an article's text is verbatim from its source (ignores punctuation, case and spacing).

Usage: python -I scripts/verify-sustainability-text.py <slug> <source.txt>
Get source.txt from a PDF with: pdftotext -enc UTF-8 "file.pdf" source.txt
"""
import json
import re
import sys

slug, source = sys.argv[1:3]


def norm(s):
    return re.sub(r"[^0-9a-z]+", " ", s.lower()).strip()


src = norm(open(source, encoding="utf8").read())
article = next(a for a in json.load(open("src/data/sustainability.json", encoding="utf8"))["articles"] if a["slug"] == slug)

def block_text(b):
    """Yield every text string inside a rich block (labels and table headers excluded)."""
    if b["type"] == "p":
        yield b["text"]
    elif b["type"] == "list":
        yield from b["items"]
    elif b["type"] == "terms":
        for t in b["items"]:
            yield from (t["term"], t["text"])
    elif b["type"] == "table":
        for row in b["rows"]:
            yield from (c if isinstance(c, str) else c["text"] for c in row)
    elif b["type"] == "group":
        yield b["heading"]
        for inner in b["blocks"]:
            yield from block_text(inner)


items = list(article["intro"]) + ([article["closing"]] if article.get("closing") else [])
for s in article["sections"]:
    items += [s["heading"], *s.get("paragraphs", []), *s.get("bullets", [])]
    for b in s.get("blocks", []):
        items += block_text(b)
items = [t for t in items if t.strip()]

bad = [t for t in items if norm(t) not in src]
for t in bad:
    print("NOT IN SOURCE:", t[:120])
print(f"{len(items) - len(bad)}/{len(items)} blocks match")
sys.exit(1 if bad else 0)
