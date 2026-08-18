const express = require("express");

const router = express.Router();

const {
    dashboardAnalytics
} = require("../controllers/analyticsController");

const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/dashboard",
    verifyToken,
    dashboardAnalytics
);

module.exports = router;