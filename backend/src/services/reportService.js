const AIAnalysis = require("../models/AIAnalysis");

const {
    analyzeBehaviorPattern
} = require("../ai/behaviorAnalyzer");

const {
    generateLearningReport
} = require("../ai/reportGenerator");

const generateReportService = async (userId) => {

    const analyses = await AIAnalysis
        .find({ userId })
        .sort({ createdAt: -1 });

    const behavior = analyzeBehaviorPattern(analyses);

    let learningScore = 0;
    let focusScore = 0;
    let consistencyScore = 0;

    const topicCounter = {};

    analyses.forEach(item => {

        topicCounter[item.category] =
            (topicCounter[item.category] || 0) + 1;

    });

    let weakTopic = {

        name: "None",

        count: 0

    };

    Object.entries(topicCounter).forEach(([topic, count]) => {

        if (count > weakTopic.count) {

            weakTopic = {

                name: topic,

                count

            };

        }

    });

    if (analyses.length) {

        const high = analyses.filter(
            x => x.confidence === "High"
        ).length;

        learningScore = Math.round(
            (high / analyses.length) * 100
        );

        const focused = analyses.filter(
            x => x.learningState === "Focused"
        ).length;

        focusScore = Math.round(
            (focused / analyses.length) * 100
        );

        const consistent = analyses.filter(
            x =>
                x.learningState === "Focused" ||
                x.learningState === "Normal"
        ).length;

        consistencyScore = Math.round(
            (consistent / analyses.length) * 100
        );

    }

    const report = generateLearningReport(

        learningScore,

        focusScore,

        consistencyScore,

        weakTopic,

        behavior

    );

    return report;

};

module.exports = {

    generateReportService

};