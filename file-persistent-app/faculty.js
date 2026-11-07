// Program: Persistence using JSON file

import express from "express";
import fs from "fs";

const app = express();

// Middleware to read JSON data from request body
app.use(express.json());

// Function to read faculty data from JSON file
const readData = () => {
    const data = fs.readFileSync("./data/faculty.json", "utf-8");
    return JSON.parse(data);
};

// Function to write faculty data into JSON file
const writeData = (data) => {
    fs.writeFileSync(
        "./data/faculty.json",
        JSON.stringify(data, null, 2)
    );
};


// ----------------------------------------------------
// POST - Create a new faculty
// URL: http://localhost:4000/faculty
// ----------------------------------------------------

app.post("/api/v1/faculty", (req, res) => {

    const allFaculty = readData();

    const newFaculty = {
        id: allFaculty.length > 0
            ? Math.max(...allFaculty.map(f => f.id)) + 1
            : 1,
        ...req.body
    };

    allFaculty.push(newFaculty);

    writeData(allFaculty);

    res.status(201).json({
        message: "Faculty created successfully",
        data: newFaculty
    });
});


// ----------------------------------------------------
// GET - Read all faculty
// URL: http://localhost:4000/faculty
// ----------------------------------------------------

app.get("/api/v1/faculty", (req, res) => {

    const dept = req.query.dept;

    let faculty = readData();

    if (dept) {
        faculty = faculty.filter(f => f.dept === dept);
    }

    res.status(200).json({
        message: "Faculty fetched successfully",
        data: faculty
    });
});


// ----------------------------------------------------
// GET - Read faculty by ID
// URL: http://localhost:4000/faculty/:id
// ----------------------------------------------------

app.get("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const facultyMember = readData()
        .find(f => f.id === facultyId);

    if (facultyMember) {

        res.status(200).json({
            message: "Faculty details fetched successfully",
            data: facultyMember
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });

    }
});


// ----------------------------------------------------
// PUT - Update faculty by ID
// URL: http://localhost:4000/faculty/:id
// ----------------------------------------------------

app.put("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        f => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const updatedFaculty = {
            ...allFaculty[facultyIndex],
            ...req.body
        };

        allFaculty[facultyIndex] = updatedFaculty;

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty updated successfully",
            data: updatedFaculty
        });

    } else {
        res.status(404).json({
            message: "Faculty not found"
        });

    }
});


// ----------------------------------------------------
// DELETE - Delete faculty by ID
// URL: http://localhost:4000/faculty/:id
// ----------------------------------------------------

app.delete("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        f => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const deletedFaculty =
            allFaculty.splice(facultyIndex, 1)[0];

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty deleted successfully",
            data: deletedFaculty
        });

    } else {

        res.status(404).json({
            message: "Faculty not found"
        });

    }
});


// ----------------------------------------------------
// Start the Server
// ----------------------------------------------------

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});