import "../App.css";
import {

ResponsiveContainer,

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

CartesianGrid

} from "recharts";
import { useState, useEffect } from "react";
import API from "../services/api";


function Analytics(){
    const [dashboardData, setDashboardData] = useState(null);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");
 const analyticsData =
dashboardData?.weeklyTrend?.weeklyChart || [];
console.log(dashboardData?.weeklyTrend?.weeklyChart);
console.log("Weekly Trend:", dashboardData?.weeklyTrend);
console.log("Weekly Chart:", dashboardData?.weeklyTrend?.weeklyChart);
console.table(dashboardData?.weeklyTrend?.weeklyChart);
const monthlyChartData =
dashboardData?.monthlyTrend?.monthlyChart || [];

useEffect(() => {

    const fetchAnalytics = async () => {

        try {

            const { data } = await API.get("/analytics/dashboard");

            if (data.success) {

                setDashboardData(data.dashboard);

            }

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Failed to load analytics."

            );

        }

        finally {

            setLoading(false);

        }

    };

    fetchAnalytics();

}, []);
if (loading) {

    return (

        <div className="dashboard">

            <h2>Loading Analytics...</h2>

        </div>

    );

}

if (error) {

    return (

        <div className="dashboard">

            <h2>{error}</h2>

        </div>

    );

}

return(
    

<div className="dashboard">

<div className="analytics-header">

<h1>📊 NeuroSync Analytics</h1>

<p>

AI-powered Learning Intelligence Dashboard

</p>

</div>


{/* ================= KPI SECTION ================= */}

<div className="analytics-kpi-grid">

<div className="analytics-card">

<h3>🎯 Focus Score</h3>

<h2>{dashboardData?.focusScore || 0}%</h2>

<p>Excellent Focus</p>

</div>

<div className="analytics-card">

<h3>🧠 Cognitive Score</h3>

<h2>{dashboardData?.learningScore || 0}%</h2>

<p>Learning Stable</p>

</div>

<div className="analytics-card">

<h3>📚 Study Sessions</h3>

<h2>{dashboardData?.totalAnalysis || 0}</h2>

<p>This Week</p>

</div>

<div className="analytics-card">

<h3>⚡ AI Accuracy</h3>

<h2>{dashboardData?.behavior?.predictionAccuracy || 98}%</h2>

<p>Prediction Quality</p>

</div>

</div>


{/* ================= CHART PLACEHOLDER ================= */}

<div className="analytics-section">

<h2>

📈 Learning Performance

</h2>

<div className="analytics-chart">
    {
analyticsData.length === 0 ?

(

<div>

No Analytics Data Available

</div>

)

:

(

<ResponsiveContainer
width="100%"
height={320}
>

<LineChart
data={analyticsData}
>

<CartesianGrid
strokeDasharray="3 3"
stroke="#334155"
/>

<XAxis
dataKey="day"
stroke="#94a3b8"
/>

<YAxis
stroke="#94a3b8"
/>

<Tooltip />

<Line

type="monotone"

dataKey="focus"

stroke="#22d3ee"

strokeWidth={3}

dot={{ r:5 }}

name="Focus"

 />

<Line

type="monotone"

dataKey="learning"

stroke="#8b5cf6"

strokeWidth={3}

dot={{ r:5 }}

name="Learning"

 />

</LineChart>

</ResponsiveContainer>

)

}

</div>

</div>


{/* ================= WEEKLY SUMMARY ================= */}

<div className="analytics-section">

<h2>

📅 Weekly Summary

</h2>

<div className="analytics-summary">

<p>

Average Focus :

<strong>
{dashboardData?.weeklyTrend?.weeklyAverageFocus ?? 0}%
</strong>

</p>
<p>

Learning Growth :

<strong>
{dashboardData?.weeklyTrend?.weeklyGrowth ?? 0}%
</strong>

</p>

<p>


Weak Topic :

<strong>{dashboardData?.weakTopic?.name || "None"}</strong>

</p>
<p>

Recommendation :

<strong>
{dashboardData?.weeklyTrend?.weeklyProgress || "No Recommendation"}
</strong>

</p>
<p>
Monthly Focus :
<strong>
{dashboardData?.monthlyTrend?.monthlyAverageFocus ?? 0}%
</strong>
</p>

<p>
Monthly Learning :
<strong>
{dashboardData?.monthlyTrend?.monthlyAverageLearning ?? 0}%
</strong>
</p>

<p>
Monthly Growth :
<strong>
{dashboardData?.monthlyTrend?.monthlyGrowth ?? 0}%
</strong>
</p>

<p>
Monthly Status :
<strong>
{dashboardData?.monthlyTrend?.monthlyProgress || "No Data"}
</strong>
</p>

</div>

</div>
{/* ================= MONTHLY SUMMARY ================= */}

<div className="analytics-section">

<h2>

📆 Monthly Summary

</h2>

<div className="analytics-summary">

<p>

Monthly Average Focus :

<strong>

{dashboardData?.monthlyTrend?.monthlyAverageFocus ?? 0}%

</strong>

</p>

<p>

Monthly Average Learning :

<strong>

{dashboardData?.monthlyTrend?.monthlyAverageLearning ?? 0}%

</strong>

</p>

<p>

Monthly Growth :

<strong>

{dashboardData?.monthlyTrend?.monthlyGrowth ?? 0}%

</strong>

</p>

<p>

Monthly Status :

<strong>

{dashboardData?.monthlyTrend?.monthlyProgress || "No Data"}

</strong>

</p>


</div>


</div>



{/* ================= AI INSIGHTS ================= */}

<div className="analytics-section">

<h2>

🤖 AI Insights

</h2>

<div className="analytics-ai-box">

<h3>
🤖 {dashboardData?.insight?.title}
</h3>

<p>

{dashboardData?.insight?.summary}

</p>

<div className="priority-badge">

Priority :

<span>

{dashboardData?.insight?.priority}

</span>

</div>

</div>

</div>
{/* ================= AI PREDICTION ================= */}

<div className="analytics-section">

<h2>

🔮 AI Prediction

</h2>

<div className="analytics-ai-box">

<h3
className={
dashboardData?.prediction?.trend === "Improving"
? "trend-green"
: dashboardData?.prediction?.trend === "Declining"
? "trend-red"
: "trend-blue"
}
>

{dashboardData?.prediction?.trend || "No Prediction"}

</h3>

<p>

{dashboardData?.prediction?.suggestion || "Prediction unavailable."}

</p>

<div className="priority-badge">

Confidence :

<span>

{dashboardData?.prediction?.confidence || "Unknown"}

</span>

</div>

<p>

Expected Growth :

<strong>

{dashboardData?.prediction?.expectedGrowth ?? 0}%

</strong>

</p>

<p>

Risk Level :

<strong
className={
dashboardData?.prediction?.riskLevel === "Low"
? "risk-green"
: dashboardData?.prediction?.riskLevel === "Medium"
? "risk-yellow"
: "risk-red"
}
>

{dashboardData?.prediction?.riskLevel || "Unknown"}

</strong>

</p>

</div>

</div>

</div>

);

}


export default Analytics;