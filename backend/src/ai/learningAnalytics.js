const calculateLearningAnalytics = (history = []) => {

    const totalQuestions = history.length;

    let learningScore = 0;

    let focusScore = 0;

    let consistencyScore = 0;

    if (totalQuestions === 0) {

        return {

            learningScore: 0,

            focusScore: 0,

            consistencyScore: 0,

            totalQuestions: 0

        };

    }

    learningScore = Math.min(totalQuestions * 10, 100);

    focusScore = Math.min(totalQuestions * 8, 100);

    consistencyScore = Math.min(totalQuestions * 6, 100);

    return {

        learningScore,

        focusScore,

        consistencyScore,

        totalQuestions

    };

};

module.exports = {

    calculateLearningAnalytics

};