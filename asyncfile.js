const fs = require("fs");
console.log("Reading file...");
fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});
console.log("Program Finished");