const fs = require('fs');
const { parse } = require('csv-parse/sync');
 
function readCsvData(filePath) {
  const content = fs.readFileSync(filePath); // đọc file CSV
  const records = parse(content, {
    columns: true,            // map theo header (NAME, PASSWORD)
    skip_empty_lines: true
  });
  return records;
}
 
module.exports = { readCsvData };
// const { expect } = require("playwright/test");

// module.exports = Common;

// class Common {
//     constructor(page) {
//         this.page = page;
//     }

// }
