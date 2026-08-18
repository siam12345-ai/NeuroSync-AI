const { buildPrompt } = require("../prompts/prompts");
const { askGemini } = require("../providers/geminiProvider");
const ChatHistory = require("../models/ChatHistory");
const AIAnalysis = require("../models/AIAnalysis");
const { analyzeBehaviorPattern } = require("../ai/behaviorAnalyzer")
const { generateRecommendation } = require("../ai/recommendationEngine");
const { detectWeakTopic } = require("../ai/weakTopicDetector");
const { calculateLearningAnalytics } = require("../ai/learningAnalytics");
const { analyzeLearningState } = require("../ai/cognitiveAnalyzer");


const generateAIResponse = async (
    userMessage,
    user = {},
    userId
) => {

    // Step 1 — Cognitive Analysis
    const cognitiveAnalysis = analyzeLearningState(userMessage);

    // Step 2 — Initial Values
    let history = [];
    let behaviorAnalysis = {
        behaviorType: "Unknown"
    };

    let weakTopicAnalysis = {
        weakTopic: "Not Detected"
    };

    let recommendations = [];

    // Step 3 — Load Previous Learning History
    history = await AIAnalysis
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);

    // Step 4 — AI Analysis
    if (history.length > 0) {

        behaviorAnalysis = analyzeBehaviorPattern(history);

        weakTopicAnalysis = detectWeakTopic(history);

    }

    // Step 5 — Recommendation
    recommendations = generateRecommendation(

        cognitiveAnalysis,

        behaviorAnalysis

    );

    // Step 6 — Build Personalized Prompt
    const prompt = buildPrompt(userMessage, {

        name: user.name || "Student",

        learningState: cognitiveAnalysis.learningState,

        behavior:

            behaviorAnalysis.behaviorType ||

            "Unknown",

        weakTopic:

            weakTopicAnalysis.weakTopic ||

            "Not Detected",

        recommendation:

            Array.isArray(recommendations)

                ? recommendations.join(", ")

                : recommendations

    });

    // Step 7 — Gemini
    const geminiResponse = await askGemini(prompt);

    // Step 8 — Save Chat
    if (geminiResponse.success) {

        await ChatHistory.create({

    userId,

    question: userMessage,

    answer: geminiResponse.response,

    provider: geminiResponse.provider

});

        await AIAnalysis.create({

            userId,

            learningState: cognitiveAnalysis.learningState,

            confidence: cognitiveAnalysis.confidence,

            category: cognitiveAnalysis.category,

            question: userMessage

        });

    }

    // Step 9 — Analytics
    const learningAnalytics = calculateLearningAnalytics(history);

    // Step 10 — Return
    return {

        success: geminiResponse.success,

        provider: geminiResponse.provider,

        prompt,

        cognitiveAnalysis,

        behaviorAnalysis,

        weakTopicAnalysis,

        learningAnalytics,

        recommendations,

        reply: geminiResponse.response

    };

};

module.exports = {

    generateAIResponse

};