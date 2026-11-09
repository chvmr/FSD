import Todo from "../models/todoModel.js";

// Create Todo
const createTodo = async (req, res) => {
    try {
        const savedTodo = await Todo.create({
            todo: req.body.todo,
            userId: req.userId
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo: savedTodo
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create todo"
        });
    }
};

// Read all Todos
const readTodos = async (req, res) => {
    const { completed } = req.query;

    try {
        const filter = {
            userId: req.userId
        };

        if (completed !== undefined) {
            if (completed !== "true" && completed !== "false") {
                return res.status(400).json({
                    message: "Completed must be true or false"
                });
            }

            filter.completed = completed === "true";
        }

        const todos = await Todo.find(filter);

        res.status(200).json({
            message: "Todos retrieved successfully",
            todos
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve todos"
        });
    }
};

// Read Todo by ID
const readTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOne({
            _id: id,
            userId: req.userId
        });

        if (todo) {
            return res.status(200).json({
                message: "Todo retrieved successfully",
                todo
            });
        }

        res.status(404).json({
            message: "Todo not found"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve todo"
        });
    }
};

// Update Todo
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const updateData = {};

    if (req.body.todo !== undefined) {
        updateData.todo = req.body.todo;
    }

    if (req.body.completed !== undefined) {
        updateData.completed = req.body.completed;
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            message: "Provide todo or completed to update"
        });
    }

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            {
                _id: id,
                userId: req.userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (updatedTodo) {
            return res.status(200).json({
                message: "Todo updated successfully",
                todo: updatedTodo
            });
        }

        res.status(404).json({
            message: "Todo not found"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
};

// Delete Todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (deletedTodo) {
            return res.status(200).json({
                message: "Todo deleted successfully",
                todo: deletedTodo
            });
        }

        res.status(404).json({
            message: "Todo not found"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete todo"
        });
    }
};

export {
    createTodo,
    readTodos,
    readTodo,
    updateTodo,
    deleteTodo
};