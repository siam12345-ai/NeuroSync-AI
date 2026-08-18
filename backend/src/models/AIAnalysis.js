const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema({

    userId: {

        type: String,

        default: "guest"

    },

    learningState: {

        type: String,

        required: true

    },

    confidence: {

        type: String,

        required: true

    },

    category: {

        type: String,

        required: true

    },

    question: {

        type: String,

        required: true

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);