const Fetch = async url => await fetch(url).then(response => response.json());
const description = document.getElementById("description");

Fetch("booksWithCovers.json").then(books => {

  const booksRead = books.filter(book => book["Exclusive Shelf"] === "read");
  const reading = books.filter(book => book["Exclusive Shelf"] === "currently-reading");
  const want = books.filter(book => book["Exclusive Shelf"] === "to-read");

  test = {
    "Book Id": 29771215,
    "Title": "Letters from a Stoic",
    "Author": "Seneca",
    "Author l-f": "Seneca, Seneca",
    "Additional Authors": "",
    "ISBN": "=\"0486811247",
    "ISBN13": "=\"9780486811246",
    "My Rating": 0,
    "Average Rating": 4.35,
    "Publisher": "Dover Publications",
    "Binding": "Paperback",
    "Number of Pages": 480,
    "Year Published": 2016,
    "Original Publication Year": 64,
    "Date Read": "",
    "Date Added": "2022/04/10",
    "Bookshelves": "",
    "Bookshelves with positions": "",
    "Exclusive Shelf": "read",
    "My Review": "",
    "Spoiler": "",
    "Private Notes": "Reading this books feels like I'm getting life advice from an old friend overseas. Seneca writes in a very conversational style that's easy to digest yet still brimming with Stoic wisdom.",
    "Read Count": 1,
    "Recommended For": "",
    "Recommended By": "",
    "Owned Copies": 0,
    "Original Purchase Date": "",
    "Original Purchase Location": "",
    "Condition": "",
    "Condition Description": "",
    "BCID": "",
    "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1460505686l/29771215.jpg"
}


  
  printBooks(booksRead);
  printBooks(reading);
  printBooks(want);

});

// --------------------------------------------------------------------------------------

function printBooks(bookList) {
  const header = document.createElement("h2");
  header.innerText = bookList[0]["Exclusive Shelf"];
  document.body.appendChild(header);

  const div = document.createElement("div");

  bookList.forEach(book => {
    if (!book.src) return;
    const bookInfo = `${book.Title} \n by ${book.Author}, ${book["Year Published"]}`;

    const details = document.createElement("details");
    const summary = document.createElement("summary");

    const img = document.createElement("img");
    img.src = `./images/${book.Title}.jpg`;
    img.alt = book.Title;

    const link = document.createElement("a");
    link.href = `https://www.goodreads.com/book/show/${book["Book Id"]}`;
    link.target = "_blank";
    link.title = book.Title;
    link.innerText = `More info about this book on Goodreads`
    // link.innerHTML = `<img src="./images/${book.Title}.jpg" alt="${book.Title}">`;

    const p = document.createElement("p");
    p.innerText = `${book.Title} \nby ${book.Author}`;

    const notes = document.createElement("p");
    notes.innerText = book["Private Notes"] ? `\n${book["Private Notes"]}` : "";
    
    summary.appendChild(img);
    details.appendChild(summary);
    details.appendChild(p);
    details.appendChild(link);
    details.appendChild(notes);
    div.appendChild(details);
    
  });
  document.body.appendChild(div);

}