import http from 'http';

const students = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // GET ALL STUDENTS
    if (method === 'GET' && url === '/students') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    }

    // CREATE STUDENT
    else if (method === 'POST' && url === '/students') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newStudent = JSON.parse(body);

            students.push(newStudent);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student created successfully',
                data: newStudent
            }));
        });
    }

    
    else if (method === 'GET' && url === '/students/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'All students fetched successfully',
            data: students
        }));
    }

    // GET STUDENT BY ID
    else if (method === 'GET' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);

        const student = students.find(s => s.id === studentId);

        if (student) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student details fetched successfully',
                data: student
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student not found'
            }));
        }
    }

    // UPDATE STUDENT
    else if (method === 'PUT' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);

        const studentIndex = students.findIndex(
            s => s.id === studentId
        );

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            if (studentIndex !== -1) {
                const updatedData = JSON.parse(body);

                const updatedStudent = {
                    ...students[studentIndex],
                    ...updatedData
                };

                students[studentIndex] = updatedStudent;

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Student updated successfully',
                    data: updatedStudent
                }));
            } else {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Student not found'
                }));
            }
        });
    }

    // DELETE STUDENT
    else if (method === 'DELETE' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);

        const studentIndex = students.findIndex(
            s => s.id === studentId
        );

        if (studentIndex !== -1) {
            const deletedStudent = students.splice(studentIndex, 1)[0];

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Student deleted successfully',
                data: deletedStudent
            }));
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: 'Student not found'
            }));
        }
    }

    // INVALID ROUTE
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Route not found'
        }));
    }
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});