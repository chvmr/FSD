import {
    createMovie,
    readMovies,
    readMovieById,
    updateMovieById,
    deleteMovieById
} from "../controllers/movieController.js";

import express from "express";

const router = express.Router();

router.post("/", createMovie);
router.get("/", readMovies);
router.get("/:id", readMovieById);
router.put("/:id", updateMovieById);
router.delete("/:id", deleteMovieById);

export default router;