const calculateLearningScore = (analyses = []) => {

    if (!analyses.length) return 0;

    let total = 0;

    analyses.forEach(item => {

        switch (item.confidence) {

            case "High":
                total += 100;
                break;

            case "Medium":
                total += 70;
                break;

            default:
                total += 40;
        }

    });

    return Math.round(total / analyses.length);

};

const calculateFocusScore = (analyses = []) => {

    if (!analyses.length) return 0;

    let total = 0;

    analyses.forEach(item => {

        switch (item.learningState) {

            case "Focused":
                total += 100;
                break;

            case "Normal":
                total += 75;
                break;

            case "Distracted":
                total += 40;
                break;

            case "Overloaded":
                total += 20;
                break;

            default:
                total += 50;

        }

    });

    return Math.round(total / analyses.length);

};

const calculateConsistencyScore = (analyses = []) => {

    if (!analyses.length) return 0;

    const goodSessions = analyses.filter(item =>
        item.learningState === "Focused" ||
        item.learningState === "Normal"
    ).length;

    return Math.round(
        (goodSessions / analyses.length) * 100
    );

};

const detectWeakTopic = (analyses = []) => {

    if (!analyses.length)
        return { name: "General Learning", count: 0 };

    const topics = {};

    analyses.forEach(item => {

        const topic = item.category || "General Learning";

        topics[topic] = (topics[topic] || 0) + 1;

    });

    let weakest = {
        name: "General Learning",
        count: 0
    };

    Object.entries(topics).forEach(([topic, count]) => {

        if (count > weakest.count) {

            weakest = {
                name: topic,
                count
            };

        }

    });

    return weakest;

};
const calculateWeeklyTrend = (analyses = []) => {

    if (!analyses.length) {

        return {

            weeklyAverageFocus: 0,

            weeklyAverageLearning: 0,

            weeklyGrowth: 0,

            weeklyProgress: "No Data",

            weeklyChart: []

        };

    }

    // Latest 7 records

    const weeklyData = analyses.slice(0, 7).reverse();

    const weeklyChart = weeklyData.map((item, index) => ({

        day: `Day ${index + 1}`,

        focus:
            item.learningState === "Focused" ? 100 :
            item.learningState === "Normal" ? 75 :
            item.learningState === "Distracted" ? 40 :
            item.learningState === "Overloaded" ? 20 : 50,

        learning:
            item.confidence === "High" ? 100 :
            item.confidence === "Medium" ? 70 : 40

    }));

    const weeklyAverageFocus = Math.round(

        weeklyChart.reduce((sum, item) => sum + item.focus, 0)

        / weeklyChart.length

    );

    const weeklyAverageLearning = Math.round(

        weeklyChart.reduce((sum, item) => sum + item.learning, 0)

        / weeklyChart.length

    );

    let weeklyGrowth = 0;

    if (weeklyChart.length >= 2) {

        weeklyGrowth =

            weeklyChart[weeklyChart.length - 1].learning -

            weeklyChart[0].learning;

    }

    let weeklyProgress = "Needs Improvement";

    if (weeklyAverageLearning >= 90)

        weeklyProgress = "Excellent";

    else if (weeklyAverageLearning >= 75)

        weeklyProgress = "Good";

    else if (weeklyAverageLearning >= 60)

        weeklyProgress = "Average";

    return {

        weeklyAverageFocus,

        weeklyAverageLearning,

        weeklyGrowth,

        weeklyProgress,

        weeklyChart

    };

};
const calculateMonthlyTrend = (analyses = []) => {

    if (!analyses.length) {

        return {

            monthlyAverageFocus: 0,
            monthlyAverageLearning: 0,
            monthlyGrowth: 0,
            monthlyProgress: "No Data",
            monthlyChart: []

        };

    }

    const monthlyData = analyses.slice(0, 30).reverse();

    const monthlyChart = monthlyData.map((item, index) => ({

        day: `D${index + 1}`,

        focus:
            item.learningState === "Focused" ? 100 :
            item.learningState === "Normal" ? 75 :
            item.learningState === "Distracted" ? 40 : 20,

        learning:
            item.confidence === "High" ? 100 :
            item.confidence === "Medium" ? 70 : 40

    }));

    const monthlyAverageFocus = Math.round(

        monthlyChart.reduce((sum, item) => sum + item.focus, 0)
        / monthlyChart.length

    );

    const monthlyAverageLearning = Math.round(

        monthlyChart.reduce((sum, item) => sum + item.learning, 0)
        / monthlyChart.length

    );

    let monthlyGrowth = 0;

    if (monthlyChart.length >= 2) {

        monthlyGrowth =
            monthlyChart[monthlyChart.length - 1].learning -
            monthlyChart[0].learning;

    }

    let monthlyProgress = "Needs Improvement";

    if (monthlyAverageLearning >= 90)

        monthlyProgress = "Excellent";

    else if (monthlyAverageLearning >= 75)

        monthlyProgress = "Good";

    else if (monthlyAverageLearning >= 60)

        monthlyProgress = "Average";

    return {

        monthlyAverageFocus,
        monthlyAverageLearning,
        monthlyGrowth,
        monthlyProgress,
        monthlyChart

    };

};

module.exports = {

    calculateLearningScore,

    calculateFocusScore,

    calculateConsistencyScore,

    detectWeakTopic,

    calculateWeeklyTrend,
    
    calculateMonthlyTrend

};