// array-crud.js

const students = [
    { id: 1, name: "Ravi", age: 20 },
    { id: 2, name: "Vani", age: 24 }
];

// Create a new student
const newStudent = { id: 3, name: "Anil", age: 22 };
students.push(newStudent);

// Insert at beginning
students.unshift({ id: 4, name: "Kiran", age: 21 });

// Read all students
console.log("All Students:", students);

// Read a student by ID
const studentReadID = 2;

const student = students.find(
    (stud) => stud.id === studentReadID
);

if (student) {
    console.log(`Student with ID ${studentReadID}:`, student);
} else {
    console.log(`Student with ID ${studentReadID}: not found`);
}
// Update a student by ID
const studentUpdateId = 3;

const updateStudent = {
    id: 3,
    name: "Kumar",
    age: 26
};

const studentUpdateIndex = students.findIndex(
    (stu) => stu.id === studentUpdateId
);

if (studentUpdateIndex !== -1) {
    students[studentUpdateIndex] = {
        ...students[studentUpdateIndex],
        ...updateStudent
    };
} else {
    console.log(`Student with ID ${studentUpdateId}: not found`);
}

console.log("Updated Student:", students[studentUpdateIndex]);


// Delete a student by ID
const studentDeleteId = 2;

const studentDeleteIndex = students.findIndex(
    (stu) => stu.id === studentDeleteId
);

if (studentDeleteIndex !== -1) {
    const deletedStudent = students.splice(
        studentDeleteIndex,
        1
    );

    console.log("Student deleted:", deletedStudent[0]);
} else {
    console.log(`Student with ID ${studentDeleteId}: not found`);
}

console.log("Students after CRUD:", students);
