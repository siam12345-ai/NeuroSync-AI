const {
    generateReportService
} = require("../services/reportService");

const getLearningReport = async (req, res) => {

    try {

        

        const userId = "guest";

        const report = await generateReportService(userId);


        res.json({

            success: true,

            report

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

    getLearningReport

};