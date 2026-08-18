const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    aiChat,
    getChatHistory
} = require("../controllers/aiController");

router.post("/chat", verifyToken, aiChat);

router.get("/history", verifyToken, getChatHistory);

module.exports = router;