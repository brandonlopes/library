const Fetch = async url => await fetch(url).then(response => response.json());
const description = document.getElementById("description");

Fetch("Goodreads.json").then(books => {

  const booksRead = books.filter(book => book["Exclusive Shelf"] === "read");
  const reading = books.filter(book => book["Exclusive Shelf"] === "currently-reading");
  const want = books.filter(book => book["Exclusive Shelf"] === "to-read");

  printBooks(booksRead);
  printBooks(reading);
  // printBooks(want);


  // hoverInfo();
});

// --------------------------------------------------------------------------------------

function printBooks(bookList) {
  const header = document.createElement("h2");
  header.innerText = bookList[0]["Exclusive Shelf"];
  document.body.appendChild(header);

  const div = document.createElement("div");
  const p = document.createElement("p");

  bookList.forEach(book => {
    if (!book.src) return;
    const bookInfo = `${book.Title} \n by ${book.Author}, ${book["Year Published"]}`;

    const link = document.createElement("a");
    link.href = `https://www.goodreads.com/book/show/${book["Book Id"]}`;
    link.target = "_blank";
    link.title = book.Title;
    link.innerHTML = `<img src="./images/${book.Title}.jpg" alt="${book.Title}">`;

    link.addEventListener("mouseover", function (){
      p.innerText = bookInfo;
    });
    
    div.appendChild(link);
    
  });
  document.body.appendChild(div);
  document.body.appendChild(p);

}

function hoverInfo() {
  const links = document.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    links[i].target = "_blank";
    links[i].addEventListener("mouseover", function () {
      description.innerText = links[i].title;
    })
  }
}