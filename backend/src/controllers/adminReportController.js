const {
    generateReportService
} = require("../services/reportService");

const getAdminReport = async (req, res) => {

    try {

        const userId = "guest";

        const adminReport = await generateReportService(userId);

        res.json({

            success: true,

            adminReport

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

    getAdminReport

};