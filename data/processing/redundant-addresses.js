/**
 * Search for US City, State, Zip Code
 * for each job ad.
 */

// Dependencies
var fs = require("fs");
var csv = require("d3-dsv").csv;

// Inputs
var combinedData = JSON.parse(fs.readFileSync("data/combined-1213-1819.json", "utf-8"));

// Outputs
var titlesPath = "data/redundant-addresses-1819.json";

// Global arrays
var addressData = [];

// Parse out addresses from combinedData JSON
for (var d = 0; d <= combinedData.length - 1; d++) {
  for (var dd = 0; dd <= combinedData[d].length - 1; dd++) {
    // Write clean address
    var searchString = combinedData[d][dd].Address;
    var cleanAddress = addressRegExp(searchString);

    if (cleanAddress != undefined) {
      addressData.push({ address: cleanAddress });
    }
  }
}
outputFile(addressData);

/*
  REGEX for addresses: City, ST 00000
*/
function addressRegExp(string) {
  var re = /((([a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+)|(([a-zA-Z]+)\-([a-zA-Z]+)))\,{1}\s{1}\w{2}\s{1}\d{5})/mg;
  var result = string.match(re);
  if (result != null) {
    var isolateString = result[0];
    return isolateString;
  }
}

/*
  REGEX for City, ST
*/
function cityRegExp(cs) {
  var re = /((([a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+)|(([a-zA-Z]+)\-([a-zA-Z]+))))/mg;
  var result = cs.match(re);
  if (result != null) {
    var isolateString = result[0];
    return isolateString;
  }
}

// Output
// heatMapData: [ {location: new google.maps.LatLng(37.782, -122.443), weight: 2}, {...} ]
function outputFile(heatData) {
  var output = JSON.stringify(heatData, null, 0);
  fs.writeFile(titlesPath, output, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("\nSup.\nThe file was saved.\n");
  });
}
