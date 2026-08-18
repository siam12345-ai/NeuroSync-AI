const {
    generateReportService
} = require("../services/reportService");

const getTeacherReport = async (req, res) => {

    try {

        const userId = "guest";
        const teacherReport = await generateReportService(userId);

        

        res.json({

            success: true,

            teacherReport

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

    getTeacherReport

};