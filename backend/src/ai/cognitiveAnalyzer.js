const analyzeLearningState = (message) => {

    const text = message.toLowerCase();

    let learningState = "Normal";
    let confidence = "Medium";
    let category = "General Learning";

    if (
        text.includes("focus") ||
        text.includes("concentrate")
    ) {

        learningState = "Low Focus";
        category = "Attention";

    }

    else if (
        text.includes("stress") ||
        text.includes("anxiety")
    ) {

        learningState = "High Stress";
        category = "Mental State";

    }

    else if (
        text.includes("memory") ||
        text.includes("forget")
    ) {

        learningState = "Weak Memory";
        category = "Memory";

    }

    else if (
        text.includes("sleep") ||
        text.includes("tired")
    ) {

        learningState = "Poor Rest";
        category = "Lifestyle";

    }

    return {

        learningState,

        confidence,

        category

    };

};

module.exports = {

    analyzeLearningState

};