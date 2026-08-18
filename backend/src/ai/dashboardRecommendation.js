const generateDashboardRecommendation = (

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

) => {

    const recommendations = [];

    if (learningScore < 50) {

        recommendations.push(

            "Spend more time reviewing your learning materials."

        );

    }

    if (focusScore < 50) {

        recommendations.push(

            "Use the Pomodoro Technique (25 minutes study + 5 minutes break)."

        );

    }

    if (consistencyScore < 60) {

        recommendations.push(

            "Maintain a fixed daily study schedule."

        );

    }

    if (

        weakTopic &&

        weakTopic.name !== "None"

    ) {

        recommendations.push(

            `Revise ${weakTopic.name} regularly.`

        );

    }

    if (

        behavior &&

        behavior.dominantBehavior === "Poor Lifestyle"

    ) {

        recommendations.push(

            "Reduce distractions and improve your daily lifestyle."

        );

    }

    if (recommendations.length === 0) {

        recommendations.push(

            "Excellent progress. Keep maintaining your current study habits."

        );

    }

    return recommendations;

};

module.exports = {

    generateDashboardRecommendation

};