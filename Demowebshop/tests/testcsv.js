const { readCSV } = require('./utils/csvHelper');
 
(async () => {
  try {
    const records = readCSV('data/loginData.csv');
    console.log("CSV data:", records);
  } catch (err) {
    console.error("Error reading CSV:", err);
  }
})();