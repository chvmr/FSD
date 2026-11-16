
import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1>My Server</h1>");
    res.write("<p>My first server</p>");
    res.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
