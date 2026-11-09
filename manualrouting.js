// manual-routing.js

import http from 'http';

const server = http.createServer((req, res) => {

    // Create student
    // POST http://localhost:4000/students
    if (req.method === 'POST' && req.url === '/students') {

        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student Created</h1>");
        res.end();

    }

    // Get all students
    // GET http://localhost:4000/students
    else if (req.method === 'GET' && req.url === '/students') {

        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Students List</h1>");
        res.end();

    }

    // To get particular student info
    // req.url = '/students/1'
    else if (
        req.method === 'GET' &&
        req.url.startsWith('/students/')
    ) {

        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student Details</h1>");
        res.end();

    }
//Update student
    else if (
        req.method === 'PUT' &&
        req.url.startsWith('/students/')
    ) {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Updated details</h1>");
        res.end();

    }
    // Delete student
    else if (
        req.method === 'DELETE' &&
        req.url.startsWith('/students/')
    ) {

        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>Student deleted</h1>");
        res.end();

    }
    else{
        res.writeHead(404, { "content-type": "text/html" });
        res.write("<h1>404 Not Found</h1>");
        res.end();
    }
});

server.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});