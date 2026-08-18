const predictLearningTrend = (
    weeklyTrend = {},
    monthlyTrend = {},
    learningScore = 0,
    focusScore = 0,
    consistencyScore = 0
) => {

    const predictedLearningScore = Math.min(
        100,
        Math.round((learningScore + (monthlyTrend.monthlyAverageLearning || 0)) / 2)
    );

    const predictedFocusScore = Math.min(
        100,
        Math.round((focusScore + (weeklyTrend.weeklyAverageFocus || 0)) / 2)
    );

    const predictedConsistency = Math.min(
        100,
        Math.round(consistencyScore + ((weeklyTrend.weeklyGrowth || 0) / 2))
    );

    let trend = "Stable";

    if ((weeklyTrend.weeklyGrowth || 0) > 5)
        trend = "Improving";

    else if ((weeklyTrend.weeklyGrowth || 0) < -5)
        trend = "Declining";

    let confidence = "Medium";

    if (predictedLearningScore >= 85)
        confidence = "High";

    else if (predictedLearningScore <= 50)
        confidence = "Low";

    let riskLevel = "Low";

    if (
        predictedLearningScore < 60 ||
        predictedFocusScore < 60
    ) {
        riskLevel = "High";
    }
    else if (
        predictedLearningScore < 75
    ) {
        riskLevel = "Medium";
    }

    const expectedGrowth = Math.max(
        0,
        weeklyTrend.weeklyGrowth || 0
    );

    let suggestion =
        "Maintain your current study routine.";

    if (trend === "Improving")
        suggestion =
        "Continue your current learning strategy.";

    else if (trend === "Declining")
        suggestion =
        "Increase study consistency and focus sessions.";

    return {

        predictedLearningScore,

        predictedFocusScore,

        predictedConsistency,

        trend,

        confidence,

        riskLevel,

        expectedGrowth,

        suggestion

    };

};

module.exports = {

    predictLearningTrend

};