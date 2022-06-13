var fs = require('fs'),
    http = require('http'),
    https = require('https');

var Stream = require('stream').Transform;

var downloadImageFromURL = (url, filename) => {
    var client = http;
    // if (url.toString().indexOf("https") === 0) client = https;

    client.request(url, response => {
        var data = new Stream();

        response.on('data', chunk => {
            data.push(chunk);
        });

        response.on('end', () => {
            console.log(`downloading ${filename}`);
            fs.writeFileSync(`./images/${filename}`, data.read());
        });

    }).end();

};

// bookCovers.forEach(book => downloadImageFromURL(book.src, `${book.Title}.jpg`));

const books = JSON.parse(fs.readFileSync("Goodreads.json"));
const bookcovers = JSON.parse(fs.readFileSync("bookCovers.json"));

for (let i = 0; i < books.length; i++) {
  for (let j = 0; j < bookcovers.length; j++) {
    if(books[i].Title === bookcovers[j].Title)
    books[i].src = bookcovers[j].src;    
  }
}

console.log(books);

fs.writeFileSync("Goodreads.json", JSON.stringify(books));
