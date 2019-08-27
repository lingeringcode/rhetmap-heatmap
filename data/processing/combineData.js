/**
 * Combine sets and output JSON file
 * - Need to .splice empty key-values
 *   being saved in JSON file.
 */

// Dependencies
var fs = require("fs");
var csv = require("d3-dsv").csv;

// Inputs
var data1213 = csv.parse(fs.readFileSync("data/original/1213-rhetmap.csv", "utf-8"));
var data1314 = csv.parse(fs.readFileSync("data/original/1314-rhetmap.csv", "utf-8"));
var data1415 = csv.parse(fs.readFileSync("data/original/1415-rhetmap.csv", "utf-8"));
var data1516 = csv.parse(fs.readFileSync("data/original/1516-rhetmap.csv", "utf-8"));
var data1617 = csv.parse(fs.readFileSync("data/original/1617-rhetmap.csv", "utf-8"));
var data1718 = csv.parse(fs.readFileSync("data/original/1718-rhetmap.csv", "utf-8"));
var data1819 = csv.parse(fs.readFileSync("data/original/1819-rhetmap.csv", "utf-8"));

// Outputs
var combinedPath = "data/combined-1213-1819.json";
// Global arrays
var allData = [data1213, data1314, data1415, data1516, data1617, data1718, data1819];
var myData = [];

// Combine all data sets
allData.forEach(function(eachYrData){
  var formattedData = addYear(eachYrData);
  myData.push(formattedData);
});
outputFile(myData);

// Format spreadsheet data
function addYear(data) {
  // Append year to each instance
  for (var d = 0; d <= data.length - 1; d++) {
    if (data === data1213) {
      data.forEach(function(itm){
        itm.year = "2012-2013";
      });
      return data;
    }
    else if (data === data1314) {
      data.forEach(function(itm){
        itm.year = "2013-2014";
      });
      return data;
    }
    else if (data === data1415) {
      data.forEach(function(itm){
        itm.year = "2014-2015";
      });
      return data;
    }
    else if (data === data1516) {
      data.forEach(function(itm){
        itm.year = "2015-2016";
      });
      return data;
    }
    else if (data === data1617) {
      data.forEach(function(itm){
        itm.year = "2016-2017";
      });
      return data;
    }
    else if (data === data1718) {
      data.forEach(function(itm){
        itm.year = "2017-2018";
      });
      return data;
    }
    else if (data === data1819) {
      data.forEach(function(itm){
        itm.year = "2018-2019";
      });
      return data;
    }
  }
}

// Output
function outputFile(combinedData) {
  var output = JSON.stringify(combinedData, null, 2);
  fs.writeFile(combinedPath, output, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("\nSup.\nThe file was saved.\n");
  });
}
