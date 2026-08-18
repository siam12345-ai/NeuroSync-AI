const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema(

    {

        userId: {

            type: String,

            default: "guest"

        },

        question: {

            type: String,

            required: true

        },

        answer: {

            type: String,

            required: true

        },

        provider: {

            type: String,

            default: "Gemini"

        },

        createdAt: {

            type: Date,

            default: Date.now

        }

    }

);

module.exports = mongoose.model(
    "ChatHistory",
    chatHistorySchema
);