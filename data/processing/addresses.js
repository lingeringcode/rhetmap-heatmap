/**
 * Search for US City, State, Zip Code
 * for each job ad.
 */

// Dependencies
var fs = require("fs");
var csv = require("d3-dsv").csv;

// Inputs
var combinedData = JSON.parse(fs.readFileSync("data/combined.json", "utf-8"));

// Outputs
var titlesPath = "data/weights-addresses.json";

// Global arrays
var addressData = [];

// Parse out addresses from combinedData JSON
for (var d = 0; d <= combinedData.length - 1; d++) {
  for (var dd = 0; dd <= combinedData[d].length - 1; dd++) {
    // Write clean address
    var searchString = combinedData[d][dd].Address;
    var cleanAddress = addressRegExp(searchString);

    // Write first entry
    if (addressData.length == 0) {
      var addressItem = {
        address: cleanAddress,
        weight: 1
      };
      addressData.push(addressItem);
    }
    // If more than 0, write more
    else if (addressData.length > 0 && cleanAddress != undefined) {
      var ca = checkIfAddressExists(cleanAddress);

      if (ca[0] == true) {
        addressData[ca[1]].weight += 1;
      }
      if (ca[0] == false) {
        var ai = {
          address: cleanAddress,
          weight: 1
        };
        addressData.push(ai);
      }
    }
  }
}
outputFile(addressData);

/*
  Check if address exists or not
*/
function checkIfAddressExists(a) {
  for (var c = 0; c <= addressData.length-1; c++) {
    var check, index, ci;
    var justCityStateOrig = cityRegExp(addressData[c].address);
    var justCityStateNew = cityRegExp(a);

    if (justCityStateOrig == justCityStateNew) {
      check = true;
      index = c;
      ci = [check, index];
      return ci;
    }
  }
  return [false, null];
}

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
