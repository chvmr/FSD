import express from "express";
import authenticate from "../middleware/authenticate.js";

import {
    createTodo,
    readTodos,
    readTodo,
    updateTodo,
    deleteTodo
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", authenticate, createTodo);
router.get("/", authenticate, readTodos);
router.get("/:id", authenticate, readTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;