const fs = require('fs');
const readline = require('readline');
const JSONStream = require('JSONStream');

const filePath = './books_dataset.json';

const outputFilePath = './sorted_books.json'; // Specify the path of the output file

const outputWriteStream = fs.createWriteStream(outputFilePath);

const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
const lineReader = readline.createInterface({ input: stream });

// Create a JSONStream parser
const parser = JSONStream.parse('*');

const books = [];
// Handle each parsed JSON object
parser.on('data', (data) => {
  books.push(data);
});

// Handle errors during parsing
parser.on('error', (error) => {
  console.error('An error occurred while parsing JSON:', error);
});

// Read the file line by line and pipe it to the JSONStream parser
lineReader.on('line', (line) => {
  parser.write(line);
});

// Handle the end of file and close the parser
lineReader.on('close', () => {
  parser.end();
});

// Handle any errors during file reading
lineReader.on('error', (error) => {
  console.error('An error occurred while reading the file:', error);
});

// Handle the end of parsing
parser.on('end', () => {
  // console.log(books); // run this to read json file on the console

  // Filters the books based on a specific genre
  const filterBooksByGenre = (books, genre) => {
    return books.filter(
      (book) => book.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  // Filter the books by a specific genre
  const filteredBooks = filterBooksByGenre(books, 'About Money');
  // console.log(filteredBooks);

  // Sorts the filtered books by the published date in descending order
  const sortBooksByPublishedDate = (filteredBooks) => {
    return filteredBooks.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );
  };

  const sortedBooks = sortBooksByPublishedDate(filteredBooks);
  // console.log(sortedBooks);

  // Write the sorted books to the output file
  sortedBooks.forEach((book) => {
    outputWriteStream.write(JSON.stringify(book) + '\n');
  });

  outputWriteStream.end();

  console.log('Sorted books have been written to', outputFilePath);
});
