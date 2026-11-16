
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Reading file...");

    fs.readFile("sample.txt", "utf8", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/plain" });

        if (err) {
            res.end("Error reading file: " + err.message);
            return;
        }

        res.end(data + "\nProgram Finished");
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
