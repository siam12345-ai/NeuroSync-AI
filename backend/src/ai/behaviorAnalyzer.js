const analyzeBehaviorPattern = (history) => {

    let focusCount = 0;
    let stressCount = 0;
    let memoryCount = 0;
    let lifestyleCount = 0;

    history.forEach(item => {

        switch (item.category) {

            case "Attention":
                focusCount++;
                break;

            case "Mental State":
                stressCount++;
                break;

            case "Memory":
                memoryCount++;
                break;

            case "Lifestyle":
                lifestyleCount++;
                break;

        }

    });

    let dominantBehavior = "Healthy Learning";

    let riskLevel = "Low";

    if (focusCount >= 3) {

        dominantBehavior = "Focus Problem";
        riskLevel = "Medium";

    }

    if (stressCount >= 3) {

        dominantBehavior = "Stress Pattern";
        riskLevel = "High";

    }

    if (memoryCount >= 3) {

        dominantBehavior = "Memory Difficulty";
        riskLevel = "Medium";

    }

    if (lifestyleCount >= 3) {

        dominantBehavior = "Poor Lifestyle";
        riskLevel = "Medium";

    }

    return {

        dominantBehavior,

        riskLevel,

        statistics: {

            focusCount,

            stressCount,

            memoryCount,

            lifestyleCount

        }

    };

};

module.exports = {

    analyzeBehaviorPattern

};