import json
from pathlib import Path
import requests

goodReads = json.load(open("Goodreads.json", "r"))

def downloadImageFromUrl(url, filename): 
    img = requests.get(url).content
    Path("images", filename).write_bytes(img)

booksWithCovers = [book for book in goodReads if "src" in book]

for book in booksWithCovers: 
    downloadImageFromUrl(book["src"], f"{book['Title']}.jpg")