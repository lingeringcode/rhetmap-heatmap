# Writing Studies and Dataviz

This repo contains the working heatmap of job market data.

## Data Sources &amp; Processing

The following describes the process to generate the Heatmap data from the original spreadsheet data sources:

1. Each spreadsheet was downloaded as a CSV file, then manually processed to have the same data fields in the same order: <code>Institution, Position, Address, URL</code>.
2. <code>/data/combined.json</code>: Created with <code>/data/processing/combinedData.js</code>. Combined list of jobs from 2012-17 market years. Note: Manually checked listings marked as 2 or more jobs and created copies in accordance with that number.
3. <code>/data/weights-addresses-1819.json</code>: Created with <code>/data/processing/addresses.js</code>.
4. <code>/data/addresses.csv</code>: Created with <code>/data/processing/csv-writer.js</code>.
5. Geocoded CSV file: Created with <code>csvgeocode</code> via the command line.
  - TODO: I need to revise the geocoding process, so it will be automate the process to also output the creation of the complete data set necessary for the visualization.

### Original file sources

- [2012-13](https://docs.google.com/spreadsheet/ccc?key=0ArC_9Y5QNqypdG1yaXJlSlFFRlJvYmRaQTZMaGszbGc#gid=0).
- [2013-14](https://docs.google.com/spreadsheet/pub?key=0ArC_9Y5QNqypdE1fSWlvblpvbGhvdy1lZmpZaEtNRmc&output=html).
- [2014-15](https://docs.google.com/spreadsheets/d/13dJRmhUj-ZK4nvFUFnOmgZKJge7eHSLvFajt0x4l8Ow).
- [2015-16](https://docs.google.com/spreadsheets/d/1XB2eyzSQG-Tf4iMBICYGF_7cRnXoZKhfTA0uB5txUVc/pubhtml).
- [2016-17](https://docs.google.com/spreadsheets/d/1HGi4cdPG0nsSLvRcoP2yUVbGogGC6GRGmjb9P62sczI/pubhtml).
- [2017-18](https://docs.google.com/spreadsheets/d/1H2sGyNrcKo0pD2NVihZsAxOShGz02CQzzB-4Ord7vJc/).
- [2018-19](https://docs.google.com/spreadsheets/d/1fR3GKtoa-oev9sixLaCG9S8Y4PAwpEC6fM_-eOv4Bog).
