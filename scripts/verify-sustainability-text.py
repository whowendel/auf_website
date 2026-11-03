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

items = list(article["intro"]) + ([article["closing"]] if article.get("closing") else [])
for s in article["sections"]:
    items += [s["heading"], *s["paragraphs"], *s.get("bullets", [])]

bad = [t for t in items if norm(t) not in src]
for t in bad:
    print("NOT IN SOURCE:", t[:120])
print(f"{len(items) - len(bad)}/{len(items)} blocks match")
sys.exit(1 if bad else 0)
