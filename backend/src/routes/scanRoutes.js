const express = require("express");
const ScanHistory = require("../models/ScanHistory");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Save Scan
router.post("/save", verifyToken, async (req, res) => {
    try {
        const {
            result,
            focusScore,
            activityState,
            interactionCount,
            sessionDuration,
            dataSource
        } = req.body;
        console.log("SCAN PAYLOAD RECEIVED:", {
    result,
    focusScore,
    activityState,
    interactionCount,
    sessionDuration,
    dataSource
});

if (
    focusScore === undefined ||
    activityState === undefined ||
    interactionCount === undefined ||
    sessionDuration === undefined
) {
    return res.status(400).json({
        success: false,
        message: "Incomplete scan data. Please start a new scan."
    });
}

        const scan = new ScanHistory({
            userEmail: req.user.email,
            result,
            focusScore,
            activityState,
            interactionCount,
            sessionDuration,
            dataSource
        });

        await scan.save();

        res.status(201).json({
            success: true,
            message: "Scan saved successfully.",
            scan
        });

    } catch (error) {
        console.error("Save Scan Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get Scan History
router.get("/", verifyToken, async (req, res) => {
    try {
        const scans = await ScanHistory
            .find({
                userEmail: req.user.email
            })
            .sort({
                createdAt: -1
            });

        res.json(scans);

    } catch (error) {
        console.error("Get Scan History Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;