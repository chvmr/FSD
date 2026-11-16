
import { URL } from "url";
import http from "http";

const server = http.createServer((req, res) => {
    const u = new URL(
        'https://www.example.com:8080/' +
        'products/list?category=books' +
        '&sort=asc#section2'
    );

    res.writeHead(200, { "Content-Type": "text/html" });

    let output = `
        Protocol: ${u.protocol}<br>
        Hostname: ${u.hostname}<br>
        Port: ${u.port}<br>
        Pathname: ${u.pathname}<br>
        Hash: ${u.hash}<br>
    `;

    u.searchParams.forEach((v, k) => {
        output += `${k} = ${v}<br>`;
    });

    res.end(output);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
