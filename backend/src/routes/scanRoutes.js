const express = require("express");
const ScanHistory = require("../models/ScanHistory");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Save Scan
router.post("/save", verifyToken, async (req, res) => {

    try {

        const { userEmail, result } = req.body;

        const scan = new ScanHistory({
            userEmail,
            result
        });

        await scan.save();

        res.json({
            message: "Scan Saved Successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Get Scan History (Protected)
router.get("/", verifyToken, async (req, res) => {

    try {

        const scans = await ScanHistory.find({

    userEmail: req.user.email

}).sort({

            createdAt: -1

        });

        res.json(scans);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;