const { generateAIResponse } = require("../services/aiService");
const ChatHistory = require("../models/ChatHistory");

const aiChat = async (req, res) => {

    try {

        const { message, user } = req.body;

        // Validate AI chat message
        if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
        success: false,
        message: "Message must be a non-empty string."
    });
}

        // Authenticated user identity from JWT
        const userId = req.user.id;

        const aiResponse = await generateAIResponse(
            message,
            user,
            userId
        );

        res.status(200).json(aiResponse);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getChatHistory = async (req, res) => {

    try {

        const userId = req.user.id;

        const history = await ChatHistory.find({
            userId
        })
        .sort({ createdAt: -1 })
        .limit(50);

        res.status(200).json({

            success: true,

            total: history.length,

            history

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    aiChat,
    getChatHistory

};