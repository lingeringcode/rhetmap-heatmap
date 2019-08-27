// Dependencies
var path = require("path");
var fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Inputs
var input = JSON.parse(fs.readFileSync(path.join(__dirname, "../redundant-addresses-1819.json"), "utf-8"));
// console.log(input);
// Outputs
var outputPath = path.join(__dirname, "../redundant-addresses-1819.csv");

// Output
const csvWriter = createCsvWriter({
  path: outputPath,
  header: [
    {id: 'address', title: 'Address'},
  ]
});

csvWriter
  .writeRecords(input)
  .then(()=> console.log('The CSV file was written successfully'));
