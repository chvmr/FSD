import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

mongoose
.connect(mongoUri, { dbName })
.then(() => {
console.log("Connected to MongoDB");
})
.catch((err) => {
console.log("Problem while connecting to MongoDB", err);
});

const movieSchema = new mongoose.Schema({
title: {
type: String,
required: true
},
director: String,
category: {
type: String,
required: true
},
year: {
type: Number,
required: true
}
});

const Movie = mongoose.model("Movie", movieSchema);

const app = express();

app.use(express.json());

// Create Movie
app.post("/api/v1/movies", (req, res) => {
const newMovie = req.body;

Movie.create(newMovie)
.then((result) => {
res.status(200).json({
message: "Movie created successfully",
data: result
});
})
.catch((err) => {
res.status(500).json({
message: "Movie creation failed"
});
});
});

// Read all Movies
app.get("/api/v1/movies", (req, res) => {
const { category } = req.query;
const query = category ? { category } : {};

Movie.find(query)
.then((result) => {
res.status(200).json({
message: "Movie fetched successfully",
data: result
});
})
.catch((err) => {
res.status(500).json({
message: "Movie fetching failed"
});
});
});

// Read Movie by ID
app.get("/api/v1/movies/:id", (req, res) => {
const { id } = req.params;

Movie.findById(id)
.then((result) => {
if (result) {
res.status(200).json({
message: "Movie details fetched successfully",
data: result
});
} else {
res.status(404).json({
message: "Movie not found"
});
}
})
.catch((err) => {
res.status(500).json({
message: "Movie fetching failed"
});
});
});

// Update Movie by ID
app.put("/api/v1/movies/:id", (req, res) => {
const { id } = req.params;
const updateMovie = req.body;

Movie.findByIdAndUpdate(id, updateMovie, {
new: true
})
.then((result) => {
if (result) {
res.status(200).json({
message: "Movie details updated successfully",
data: result
});
} else {
res.status(404).json({
message: "Movie not found"
});
}
})
.catch((err) => {
res.status(500).json({
message: "Movie update failed"
});
});
});

// Delete Movie by ID
app.delete("/api/v1/movies/:id", (req, res) => {
const { id } = req.params;

Movie.findByIdAndDelete(id)
.then((result) => {
if (result) {
res.status(200).json({
message: "Movie details deleted successfully",
data: result
});
} else {
res.status(404).json({
message: "Movie not found"
});
}
})
.catch((err) => {
res.status(500).json({
message: "Movie deletion failed"
});
});
});

app.listen(port, () => {
console.log(`Server is running on port http://localhost:${port}`);
});