const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending"
        },

        dueDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);