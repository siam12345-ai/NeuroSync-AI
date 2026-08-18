const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// CREATE TASK
// ===============================

router.post("/", verifyToken, async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            dueDate
        } = req.body;

        if (!title || !title.trim()) {

            return res.status(400).json({
                message: "Task title is required."
            });

        }

        const task = new Task({

            userEmail: req.user.email,

            title: title.trim(),

            description: description || "",

            priority: priority || "Medium",

            dueDate: dueDate || null

        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully.",
            task
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ===============================
// GET USER TASKS
// ===============================

router.get("/", verifyToken, async (req, res) => {

    try {

        const tasks = await Task.find({

            userEmail: req.user.email

        }).sort({

            createdAt: -1

        });

        res.json(tasks);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ===============================
// UPDATE TASK STATUS
// ===============================

router.put("/:id", verifyToken, async (req, res) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            userEmail: req.user.email

        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found."
            });

        }

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        if (title !== undefined) {
            task.title = title.trim();
        }

        if (description !== undefined) {
            task.description = description;
        }

        if (priority !== undefined) {
            task.priority = priority;
        }

        if (status !== undefined) {
            task.status = status;
        }

        if (dueDate !== undefined) {
            task.dueDate = dueDate || null;
        }

        await task.save();

        res.json({
            message: "Task updated successfully.",
            task
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ===============================
// DELETE TASK
// ===============================

router.delete("/:id", verifyToken, async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({

            _id: req.params.id,

            userEmail: req.user.email

        });

        if (!task) {

            return res.status(404).json({
                message: "Task not found."
            });

        }

        res.json({
            message: "Task deleted successfully."
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;