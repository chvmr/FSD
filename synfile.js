
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Reading file...");

    const data = fs.readFileSync("sample.txt", "utf8");

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(data + "\nProgram Finished");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
