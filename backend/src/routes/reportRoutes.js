const express = require("express");

const router = express.Router();

const {

    getLearningReport

} = require("../controllers/reportController");

router.get(

    "/",

    getLearningReport

);

module.exports = router;