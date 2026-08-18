const express = require("express");

const {
    getAdminReport
} = require("../controllers/adminReportController");

const router = express.Router();

router.get("/", getAdminReport);

module.exports = router;