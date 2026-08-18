const generateReportSummary = (

    learningScore,

    focusScore,

    consistencyScore

) => {

    let summary = "";

    if (learningScore >= 80) {

        summary += "Excellent learning performance. ";

    } else if (learningScore >= 50) {

        summary += "Learning performance is satisfactory. ";

    } else {

        summary += "Learning performance needs improvement. ";

    }

    if (focusScore >= 70) {

        summary += "Focus level is good. ";

    } else {

        summary += "Focus level should be improved. ";

    }

    if (consistencyScore >= 70) {

        summary += "Study consistency is strong.";

    } else {

        summary += "Try maintaining a more regular study schedule.";

    }

    return summary;

};

module.exports = {

    generateReportSummary

};