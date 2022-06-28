import json
import requests

covers = open("bookCovers.json", "r+")
goodReads = json.load(open("Goodreads.json", "r"))

def downloadImageFromUrl(url, filename): 
    img = requests.get(url).content
    open(filename, "wb").write(img)

booksWithCovers = [book for book in goodReads if "src" in book]
for book in booksWithCovers: 
    downloadImageFromUrl(book["src"], f"{book['Title']}.jpg")

# downloadImageFromUrl(book["src"], f"{book["Title"]}.jpg")
# images = [downloadImageFromUrl(book.src, f"{book.Title}.jpg") for book in goodReads]