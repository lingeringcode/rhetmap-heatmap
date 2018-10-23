/*
  apikey.js - Stores your Google API key without
  sharing it in a public repo.

  Rename it as apikey.js, and be sure that the
  file is marked within the .gitignore file.
*/
function getKey() {
  var GOOGLE_API_KEY = "PUT YOUR API KEY HERE";
  return GOOGLE_API_KEY;
}
// Export
module.exports = {
  getKey: getKey
};
