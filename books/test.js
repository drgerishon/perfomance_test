const fs = require('fs');
const readline = require('readline');
const JSONStream = require('JSONStream');

const filePath = './books_dataset.json';
const outputFilePath = './sorted_books.json'; 

const outputWriteStream = fs.createWriteStream(outputFilePath);

const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
const lineReader = readline.createInterface({ input: stream });
const parser = JSONStream.parse('*');

let books = [];

parser.on('data', (data) => {
  books.push(data);
});

parser.on('error', (error) => {
  console.error('Parsing JSON encountered an error:', error);
});

lineReader.on('line', (line) => {
  parser.write(line);
});

lineReader.on('close', () => {
  parser.end();
});

lineReader.on('error', (error) => {
  console.error('Error occurred while reading the file:', error);
});

parser.on('end', () => {
  console.log(books); // run this to read json file on the console

    // Filters the books based on a specific genre
  const filterBooksByGenre = (books, genre) => {
    return books.filter(
      (book) => book.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  // Filter the books by a specific genre
  let filteredBooks = filterBooksByGenre(books, 'About Money');
  console.log(filteredBooks);

    // Sorts the filtered books by the published date in descending order
  const sortBooksByPublishedDate = (filteredBooks) => {
    return filteredBooks.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );
  };

  let sortedBooks = sortBooksByPublishedDate(filteredBooks);
  console.log(sortedBooks);

  // Write the sorted books to the output file

  sortedBooks.forEach((book) => {
    outputWriteStream.write(JSON.stringify(book) + '\n');
  });

  outputWriteStream.end();

  console.log('Sorted books successfully written to', outputFilePath);
});
