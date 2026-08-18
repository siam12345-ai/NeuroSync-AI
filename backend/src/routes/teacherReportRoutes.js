const express = require("express");

const {
    getTeacherReport
} = require("../controllers/teacherReportController");

const router = express.Router();

router.get("/", getTeacherReport);

module.exports = router;