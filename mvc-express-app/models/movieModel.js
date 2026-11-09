import mongoose from "mongoose";

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

export default Movie;