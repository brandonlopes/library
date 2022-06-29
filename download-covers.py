import json
from pathlib import Path
import requests

goodReads = json.loads(Path("Goodreads.json").read_text())
images = Path("images")
Path.mkdir(images, exist_ok=True)

booksWithCovers = [book for book in goodReads if "src" in book]
Path("booksWithCovers.json").write_text(json.dumps(booksWithCovers, indent=4))

def downloadImageFromUrl(url, filename): 
    img = requests.get(url).content
    Path(images, filename).write_bytes(img)

for book in booksWithCovers: 
    downloadImageFromUrl(book["src"], f"{book['Title']}.jpg")