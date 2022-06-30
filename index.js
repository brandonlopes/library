const Fetch = async url => await fetch(url).then(response => response.json());
const description = document.getElementById("description");

Fetch("booksWithCovers.json").then(books => {

  const booksRead = books.filter(book => book["Exclusive Shelf"] === "read");
  const reading = books.filter(book => book["Exclusive Shelf"] === "currently-reading");
  const want = books.filter(book => book["Exclusive Shelf"] === "to-read");

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
    
    summary.appendChild(img);
    details.appendChild(summary);
    details.appendChild(p);
    details.appendChild(link);
    div.appendChild(details);
    
  });
  document.body.appendChild(div);

}