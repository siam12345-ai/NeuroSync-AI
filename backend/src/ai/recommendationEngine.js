const generateRecommendation = (cognitiveAnalysis, behaviorAnalysis) => {

    let recommendations = [];

    if (cognitiveAnalysis.learningState === "Low Focus") {

        recommendations.push(
            "Use the Pomodoro Technique (25 min study + 5 min break)."
        );

        recommendations.push(
            "Turn off mobile notifications while studying."
        );

    }

    if (cognitiveAnalysis.learningState === "High Stress") {

        recommendations.push(
            "Practice deep breathing for 5 minutes."
        );

        recommendations.push(
            "Reduce study session length and take regular breaks."
        );

    }

    if (cognitiveAnalysis.learningState === "Weak Memory") {

        recommendations.push(
            "Use active recall and spaced repetition."
        );

        recommendations.push(
            "Review notes within 24 hours."
        );

    }

    if (cognitiveAnalysis.learningState === "Poor Rest") {

        recommendations.push(
            "Sleep at least 7–8 hours before studying."
        );

        recommendations.push(
            "Avoid studying continuously for long periods."
        );

    }

    if (behaviorAnalysis.riskLevel === "High") {

        recommendations.push(
            "Schedule a balanced daily study routine."
        );

    }

    return recommendations;

};

module.exports = {

    generateRecommendation

};