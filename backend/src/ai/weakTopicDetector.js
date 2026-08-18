const detectWeakTopic = (history) => {

    const topics = {

        "Object Oriented Programming": 0,

        "Data Structure": 0,

        "Algorithm": 0,

        "Database": 0,

        "Networking": 0,

        "Operating System": 0,

        "Artificial Intelligence": 0

    };

    history.forEach(item => {

        const question = item.question.toLowerCase();

        if (question.includes("oop") || question.includes("object")) {

            topics["Object Oriented Programming"]++;

        }

        if (question.includes("stack") ||
            question.includes("queue") ||
            question.includes("tree")) {

            topics["Data Structure"]++;

        }

        if (question.includes("algorithm") ||
            question.includes("binary search")) {

            topics["Algorithm"]++;

        }

        if (question.includes("sql") ||
            question.includes("database")) {

            topics["Database"]++;

        }

        if (question.includes("ip") ||
            question.includes("network")) {

            topics["Networking"]++;

        }

        if (question.includes("process") ||
            question.includes("thread")) {

            topics["Operating System"]++;

        }

        if (question.includes("ai") ||
            question.includes("artificial intelligence")) {

            topics["Artificial Intelligence"]++;

        }

    });

    let weakTopic = "General";

    let highest = 0;

    for (const topic in topics) {

        if (topics[topic] > highest) {

            highest = topics[topic];

            weakTopic = topic;

        }

    }

    return {

        weakTopic,

        totalQuestions: highest,

        topicStatistics: topics

    };

};

module.exports = {

    detectWeakTopic

};