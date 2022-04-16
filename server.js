var fs = require('fs'),
    http = require('http'),
    https = require('https');

var Stream = require('stream').Transform;

const bookCovers = [
    {
      "Title": "Meditations",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383681793l/1168191._SX98_.jpg"
    },
    {
      "Title": "Man's Search for Meaning",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535419394l/4069._SX98_.jpg"
    },
    {
      "Title": "Tao Te Ching",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1311705500l/2001800._SX98_.jpg"
    },
    {
      "Title": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SX98_.jpg"
    },
    {
      "Title": "",
      "src": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460505686i/29771215.jpg"
    },
    {
      "Title": "The Art of War",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630683326l/10534._SX98_.jpg"
    },
    {
      "Title": "How to Win Friends and Influence People",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442726934l/4865._SX98_.jpg"
    },
    {
      "Title": "When: The Scientific Secrets of Perfect Timing",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1502223427l/35412097._SX98_.jpg"
    },
    {
      "Title": "1984",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327144697l/3744438._SX98_.jpg"
    },
    {
      "Title": "12 Rules for Life: An Antidote to Chaos",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1512705866l/30257963._SX98_.jpg"
    },
    {
      "Title": "Why We Sleep: Unlocking the Power of Sleep and Dreams",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556604137l/34466963._SX98_.jpg"
    },
    {
      "Title": "Digital Minimalism: Choosing a Focused Life in a Noisy World",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1549433350l/40672036._SX98_.jpg"
    },
    {
      "Title": "The Power of Now: A Guide to Spiritual Enlightenment",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925535l/6708._SX98_.jpg"
    },
    {
      "Title": "The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1418767178l/22318578._SX98_.jpg"
    },
    {
      "Title": "Discourses, Fragments, Handbook",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1373585681l/18189134.jpg"
    },
    {
      "Title": "Letters from a Stoic",
      "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1460505686l/29771215.jpg"
    },
    {
      "Title": "Walden & Civil Disobedience",
      "src": "https://www.gutenberg.org/files/205/205-h/images/cover.jpg"
    }
  
  ];

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
