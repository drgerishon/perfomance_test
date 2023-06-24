// const fs = require('fs');
// const readline = require('readline');
// const JSONStream = require('JSONStream');

// const filePath = './books_dataset.json'; 

// const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
// const lineReader = readline.createInterface({ input: stream });

// // Create a JSONStream parser
// const parser = JSONStream.parse('*');

// // Handle each parsed JSON object
// parser.on('data', (data) => {
//   console.log(data); // Process each JSON object as needed
// });

// // Handle errors during parsing
// parser.on('error', (error) => {
//   console.error('An error occurred while parsing JSON:', error);
// });

// // Read the file line by line and pipe it to the JSONStream parser
// lineReader.on('line', (line) => {
//   parser.write(line);
// });

// // Handle the end of file and close the parser
// lineReader.on('close', () => {
//   parser.end();
// });

// // Handle any errors during file reading
// lineReader.on('error', (error) => {
//   console.error('An error occurred while reading the file:', error);
// });


// const fs = require('fs');
// const path = require('path');

// const jsonFilePath = path.json(__dirname, 'book-dataset.json');
// const jsonData = fs.readFileSync(jsonFilePath, 'utf8');

// const books = JSON.parse(jsonData);

// module.exports = books;
