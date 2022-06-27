import json
import requests

covers = open("bookCovers.json", "r+")
goodReads = json.load(open("Goodreads.json", "r"))

def downloadImageFromUrl(url, filename): 
    img = requests.get(url).content
    open(filename, "wb").write(img)

for book in goodReads:

    print(book["src"])

# images = [downloadImageFromUrl(book.src, f"{book.Title}.jpg") for book in goodReads]