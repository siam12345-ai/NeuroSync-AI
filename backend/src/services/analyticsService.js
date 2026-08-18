const AIAnalysis = require("../models/AIAnalysis");
const ChatHistory = require("../models/ChatHistory");
const {

    calculateLearningScore,

    calculateFocusScore,

    calculateConsistencyScore,

    detectWeakTopic,

    calculateWeeklyTrend,

    calculateMonthlyTrend

} = require("../analytics/analyticsEngine");

const {
    analyzeBehaviorPattern
} = require("../ai/behaviorAnalyzer");

const {
    generateDashboardInsight
} = require("../ai/dashboardInsight");

const {
    generateDashboardRecommendation
} = require("../ai/dashboardRecommendation");

const {
    generateStudyPlan
} = require("../ai/studyPlanner");

const {
    generateLearningReport
} = require("../ai/reportGenerator");
const {
    predictLearningTrend
} = require("../ai/trendPrediction");

const getDashboardAnalytics = async (userId = "guest") => {

    // ==========================
    // Fetch AI Analysis History
    // ==========================

    const history = await AIAnalysis
        .find({ userId })
        .sort({ createdAt: -1 });

        // ==========================
// Weekly Analytics Chart
// ==========================

const chartData = [];

const last7 = history.slice(0, 7).reverse();

last7.forEach((item, index) => {

    chartData.push({

        day: `Day ${index + 1}`,

        focus:
            item.learningState === "Focused"
                ? 100
                : item.learningState === "Normal"
                ? 75
                : item.learningState === "Distracted"
                ? 40
                : 20,

        learning:
            item.confidence === "High"
                ? 100
                : item.confidence === "Medium"
                ? 70
                : 40

    });

});

    // ==========================
    // Fetch Chat History
    // ==========================

    const chats = await ChatHistory
        .find({ userId })
        .sort({ createdAt: -1 });

    // ==========================
    // Analytics Engine
    // ==========================

    const behavior = analyzeBehaviorPattern(history);

const learningScore = calculateLearningScore(history);

const focusScore = calculateFocusScore(history);

const consistencyScore = calculateConsistencyScore(history);

const weakTopic = detectWeakTopic(history);

const insight = generateDashboardInsight(

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

);

const adaptiveRecommendation = generateDashboardRecommendation(

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

);
const studyPlan = generateStudyPlan(

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

);

const learningReport = generateLearningReport(

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

);
const weeklyTrend = calculateWeeklyTrend(history);
const monthlyTrend = calculateMonthlyTrend(history);
const prediction = predictLearningTrend(

    weeklyTrend,

    monthlyTrend,

    learningScore,

    focusScore,

    consistencyScore

);


return {

    totalChats: chats.length,

    totalAnalysis: history.length,

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior,

    insight,

    adaptiveRecommendation,

    studyPlan,

    learningReport,

    latestAnalysis: history[0] || null,

    chartData,
    
    weeklyTrend,

    monthlyTrend,
    
    prediction


};
};

module.exports = {

    getDashboardAnalytics

};