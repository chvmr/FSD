
const fs = require("fs");
console.log("Reading file...");
const data = fs.readFileSync("sample.txt", "utf8");
console.log(data);
console.log("Program Finished");