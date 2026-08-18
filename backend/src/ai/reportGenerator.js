const {
    generateReportSummary
} = require("./reportSummary");
const generateLearningReport = (

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior
    

) => {

    return {

        reportTitle: "AI Learning Report",

        summary: generateReportSummary(learningScore, focusScore, consistencyScore),

        overallPerformance:

            learningScore >= 80

                ? "Excellent"

                : learningScore >= 50

                ? "Good"

                : "Needs Improvement",

        strengths: [

            consistencyScore >= 70

                ? "Good learning consistency"

                : "Consistency needs improvement"

        ],

        weaknesses: [

            `Weak Topic: ${weakTopic.name}`,

            behavior.dominantBehavior

        ],

        recommendations: [

            "Follow today's personalized study plan.",

            "Review weak topics regularly.",

            "Maintain healthy study habits."

        ]

    };

};

module.exports = {

    generateLearningReport

};