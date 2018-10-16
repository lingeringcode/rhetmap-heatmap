/**
 * Geocode addresses for mapping work
 * Very rough attempt, need to develop better
 * async promise to geocde the input addresses,
 * then write the new output data file.

 * Dan Levy offered the following method:
 * https://github.com/justsml/guides/blob/master/mapping/google-geocoder/google-geocoder-example.js

  // From my feedback & code here: https://krzysztofzuraw.com/blog/2017/callbacks-promises-in-js-for-newbies.html
  const geocoder = new google.maps.Geocoder();
  // Most JS API's let you use Bluebird.promisify[All]
  // Unfortunately Google's APIs are a little dumb when it comes to promises and Node callbacks.
  const geocodeAddress = (address) => new Promise((resolve, reject) => geocoder
  .geocode({ address }, (results, status) => status === 'OK'
   ? resolve({
     lat: results[0].geometry.location.lat(),
     lng: results[0].geometry.location.lng(),
   }) : reject(new Error('Cannot find address'))
  }));

 * Also need to verify New York counts, due to geocoding
 * certain zipcodes.
*/

// Dependencies
var path = require("path");
var fs = require("fs");
var csv = require("d3-dsv").csv;
var NodeGeocoder = require('node-geocoder');
const util = require('util');


var GOOGLE_API_KEY = "ADD KEY HERE";
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: GOOGLE_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

// Inputs
var input = JSON.parse(fs.readFileSync(path.join(__dirname, "../weights-addresses.json"), "utf-8"));
var testOutput = JSON.parse(fs.readFileSync(path.join(__dirname, "../testGeoCodes.json"), "utf-8"));

// Outputs
var outputPath = path.join(__dirname, "../geocoded-fixed.json");

var placeholderLatLon = [];
var geocodes = [];
var gcArray = [];
var newData = [];

testGeocode();

/*
  { formattedAddress: 'Mt Berry, GA 30149, USA',
      latitude: 34.29039,
      longitude: -85.1802699,
      extra:
       { googlePlaceId: 'ChIJP8WDZYSkiogRxY1NGvMs6OQ',
         confidence: 0.5,
         premise: null,
         subpremise: null,
         neighborhood: 'Mount Berry',
         establishment: null },
      administrativeLevels:
       { level2long: 'Floyd County',
         level2short: 'Floyd County',
         level1long: 'Georgia',
         level1short: 'GA' },
      zipcode: '30149',
      city: 'Rome',
      country: 'United States',
      countryCode: 'US',
      provider: 'google' }
  { formattedAddress: 'Klamath Falls, OR, USA',
      latitude: 42.224867,
      longitude: -121.7816704,
      extra:
       { googlePlaceId: 'ChIJ4w7yaFnUyFQRJpe5KPV_jfQ',
         confidence: 0.5,
         premise: null,
         subpremise: null,
         neighborhood: 'Klamath Falls',
         establishment: null },
      administrativeLevels:
       { level2long: 'Klamath County',
         level2short: 'Klamath County',
         level1long: 'Oregon',
         level1short: 'OR' },
      city: 'Klamath Falls',
      country: 'United States',
      countryCode: 'US',
      provider: 'google' }
*/
function testGeocode() {
  for (var g = 0; g <= testOutput.length-1; g++) {
    var pos = "new google.maps.LatLng(" + testOutput[g].latitude + ", "+ testOutput[g].longitude + ")";
    var newAddress = testOutput[g].city + ", " + testOutput[g].administrativeLevels.level1short;
    gcArray.push([newAddress, pos]);
  }
  stitchBack(gcArray);
}
// var promise = new Promise(function(resolve, reject) {
//   var promisedGeoCodes = geocode();
//   resolve(gcArray);
//   reject("Failure");
// });
//
// promise.then(function(gca) {
//   for (var sb = 0; sb <= input.length-1; sb++) {
//     var match = findMatchingAddress(gca[sb]);
//     if (match[0] == true) {
//       var mi = match[1];
//       console.log(util.inspect("[" + gca[sb][1] + "," + match[1] + "," + match[2] + "]",{ maxArrayLength: null }));
//       input[mi].location = gca[sb][1];
//       newData.push(input[mi]);
//     }
//     else if (match[0] == false) {
//       console.log(util.inspect("[" + gca[sb][1] + "," + match[1] + "," + match[2] + "]",{ maxArrayLength: null }));
//     }
//   }
//   outputFile(newData);
// });

// function geocode() {
//   for (var g = 0; g <= input.length-1; g++) {
//     geocoder.geocode(input[g].address)
//       .then(function(res) {
//         console.log(res);
//         var pos = "new google.maps.LatLng(" + res[0].latitude + ", "+ res[0].longitude + ")";
//         var newAddress = res[0].city + ", " + res[0].administrativeLevels.level1short + " " + res[0].zipcode;
//         gcArray.push([newAddress, pos]);
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }
// }

function stitchBack(gca) {
  var counter = 0;
  for (var sb = 0; sb <= input.length-1; sb++) {
    var match = findMatchingAddress(gca[sb]);
    if (match[0] == true) {
      var mi = match[1];
      // console.log(util.inspect("[" + input[sb].address + "," + match[1] + "," + match[2] + "]",{ maxArrayLength: null }));
      input[mi].location = gca[sb][1];
      newData.push(input[mi]);
    }
    else if (match[0] == false) {
      counter++;
      console.log(util.inspect("[" + input[sb].address + "," + match[1] + "," + match[2] + "]",{ maxArrayLength: null }));
      console.log("\n" + counter + "\n");
    }
  }
  outputFile(newData);
}

/*
  Matches up the address from the original input
  to the newly geocoded result.
*/
function findMatchingAddress(a) {
  var c = 0;
  var orig, testOriginal, check, index;

  for (c; c <= input.length-1; c++) {
    // console.log(input[c].address + " :: " + a[0]);
    orig = input[c].address;
    testOriginal = addressRegExp(orig);
    // console.log(orig + " :: " + a[0]);
    var newGeo = a[0];

    if (testOriginal == newGeo) {
      check = true;
      // console.log(c);
      index = c;
      return [check, index, testOriginal];
    }
  }
  check = false;
  index = c;
  return [check, index, testOriginal];
}

/*
  REGEX for addresses: City, ST
*/
function addressRegExp(s) {
  var re = /((([a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+)|([a-zA-Z]+\s[a-zA-Z]+\s[a-zA-Z]+)|(([a-zA-Z]+)\-([a-zA-Z]+)))\,{1}\s{1}\w{2})/;
  var result = s.match(re);
  if (result != null) {
    var isolateString = result[0];
    return isolateString;
  }
}

// Output
// heatMapData: [ {location: new google.maps.LatLng(37.782, -122.443), weight: 2}, {...} ]
function outputFile(o) {
  var output = JSON.stringify(o, null, 0);
  fs.writeFile(outputPath, output, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("\nSup!" + outputPath + "\nThe file was saved.\n");
  });
}
