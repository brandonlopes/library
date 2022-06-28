import json
import requests
import os

if (not os.path.isdir("pics")): os.mkdir("pics")

covers = open("bookCovers.json", "r+")
goodReads = json.load(open("Goodreads.json", "r"))
booksWithCovers = [book for book in goodReads if "src" in book]

def downloadImageFromUrl(url, filename): 
    img = requests.get(url).content
    open(f"pics/{filename}", "wb").write(img)

for book in booksWithCovers: 
    downloadImageFromUrl(book["src"], f"{book['Title']}.jpg")