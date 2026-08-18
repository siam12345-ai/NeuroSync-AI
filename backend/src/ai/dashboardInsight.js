const generateDashboardInsight = (

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

) => {

    let summary = [];

    let priority = "Low";

    if (learningScore < 50) {

        summary.push(

            "Learning performance needs improvement."

        );

    }

    if (focusScore < 50) {

        summary.push(

            "Focus level is currently low."

        );

    }

    if (consistencyScore < 60) {

        summary.push(

            "Study consistency is decreasing."

        );

    }

    if (

        weakTopic &&

        weakTopic.name !== "None"

    ) {

        summary.push(

            `Weak topic detected: ${weakTopic.name}.`

        );

    }

    if (

        behavior &&

        behavior.riskLevel === "High"

    ) {

        priority = "High";

    }

    else if (

        behavior &&

        behavior.riskLevel === "Medium"

    ) {

        priority = "Medium";

    }

    if (summary.length === 0) {

        summary.push(

            "Excellent progress. Keep learning consistently."

        );

    }

    return {

        title: "AI Insight",

        summary: summary.join(" "),

        priority

    };

};

module.exports = {

    generateDashboardInsight

};