const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
            index: true
        },

        result: {
            type: String,
            required: true
        },

        focusScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        activityState: {
            type: String,
            default: "Unknown"
        },

        interactionCount: {
            type: Number,
            min: 0,
            default: 0
        },

        sessionDuration: {
            type: Number,
            min: 0,
            default: 0
        },

        dataSource: {
            type: String,
            default: "Behavioral Interaction Signals"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ScanHistory", scanHistorySchema);