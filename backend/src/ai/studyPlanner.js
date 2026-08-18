const generateStudyPlan = (

    learningScore,

    focusScore,

    consistencyScore,

    weakTopic,

    behavior

) => {

    const studyPlan = [];

    // Morning

    studyPlan.push({

        time: "08:00 - 08:45",

        activity: `Study ${weakTopic.name || "Core Subjects"}`

    });

    // Adaptive Learning Score

    if (learningScore < 40) {

        studyPlan.push({

            time: "09:00 - 09:45",

            activity: "Revise previous lecture notes"

        });

    } else {

        studyPlan.push({

            time: "09:00 - 09:30",

            activity: "Practice advanced exercises"

        });

    }

    // Adaptive Focus

    if (focusScore < 50) {

        studyPlan.push({

            time: "11:00 - 11:25",

            activity: "Pomodoro Focus Session"

        });

    }

    // Adaptive Consistency

    if (consistencyScore < 50) {

        studyPlan.push({

            time: "14:00 - 14:30",

            activity: "Short revision session"

        });

    } else {

        studyPlan.push({

            time: "14:00 - 15:00",

            activity: "Complete coding assignment"

        });

    }

    // Behavior

    if (

        behavior &&

        behavior.dominantBehavior === "Poor Lifestyle"

    ) {

        studyPlan.push({

            time: "18:00 - 18:20",

            activity: "Walk, hydrate, and reduce screen distractions"

        });

    }

    // Night

    studyPlan.push({

        time: "21:00 - 21:20",

        activity: "Review today's progress and prepare tomorrow"

    });

    return studyPlan;

};

module.exports = {

    generateStudyPlan

};