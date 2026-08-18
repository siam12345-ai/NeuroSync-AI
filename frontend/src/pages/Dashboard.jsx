import jsPDF from "jspdf";
import "../App.css";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";


import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
Area,
AreaChart
} from "recharts";

import API from "../services/api";


function Dashboard(){
    const [currentTime, setCurrentTime] = useState(new Date());


const navigate = useNavigate();


const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {

    const fetchDashboard = async () => {

        try {

            setDashboardLoading(true);

            const { data } = await API.get("/analytics/dashboard");

            if (data.success) {
              console.log(data.dashboard);

                setDashboardData(data.dashboard);

            }

        }

        catch (error) {

            setDashboardError(

                error.response?.data?.message ||

                "Failed to load dashboard."

            );

        }

        finally {

            setDashboardLoading(false);

        }

    };

    fetchDashboard();

}, []);
useEffect(() => {

if(!user){

navigate("/");

}

}, [user, navigate]);



const [scanning,setScanning]=useState(false);

const [result,setResult]=useState("");

const [progress,setProgress]=useState(0);

const [history,setHistory]=useState([]);

const [liveWave,setLiveWave]=useState(8);

const [focusScore, setFocusScore] = useState(0);
const [interactionCount, setInteractionCount] = useState(0);
const [lastActivity, setLastActivity] = useState(Date.now());

const [brainState,setBrainState]=useState("Calm");

const [pulse,setPulse]=useState(false);
const [darkMode,setDarkMode]=useState(true);
const [userCount,setUserCount]=useState(0);

const [scanCount,setScanCount]=useState(0);

const [focusCount,setFocusCount]=useState(0);

const [accuracyCount,setAccuracyCount]=useState(0);
const [successMessage,setSuccessMessage]=useState("");
const [errorMessage,setErrorMessage]=useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [message, setMessage] = useState("");
const [chatMessage, setChatMessage] = useState("");

const [chatReply, setChatReply] = useState("");
const [chatHistory, setChatHistory] = useState([]);

const [chatLoading, setChatLoading] = useState(false);

const [chatError, setChatError] = useState("");
const [dashboardData, setDashboardData] = useState(null);
const [dashboardLoading, setDashboardLoading] = useState(true);
const [dashboardError, setDashboardError] = useState("");

// TODO: Replace dashboardConfig with backend dashboardData  
const dashboardConfig = {
  notificationCount: 3,
  aiAccuracy: 98,
  totalUsers: 1,
  focusTarget: 85,
scanTarget: 100,
  aiInsight:
    "Your learning consistency is improving. Keep your focus above 80% today.",
};




const brainData = [
  {
    time: "Now",
    activity: focusScore
  }
];
useEffect(() => {

  const handleActivity = () => {
    setInteractionCount((prev) => prev + 1);
    setLastActivity(Date.now());
  };

  window.addEventListener("mousemove", handleActivity);
  window.addEventListener("keydown", handleActivity);

  return () => {
    window.removeEventListener("mousemove", handleActivity);
    window.removeEventListener("keydown", handleActivity);
  };

}, []);

    useEffect(()=>{

let user=0;

let scan=0;

let focus=0;

let accuracy=0;

const timer=setInterval(()=>{

if(user<1){

user++;

setUserCount(user);

}

if(scan<history.length){

scan++;

setScanCount(scan);

}

if(focus<focusScore){

focus++;

setFocusCount(focus);

}

if(accuracy<98){

accuracy++;

setAccuracyCount(accuracy);

}

if(

user>=1 &&

scan>=history.length &&

focus>=focusScore &&

accuracy>=98

){

clearInterval(timer);

}

},20);

return()=>clearInterval(timer);
},[history,focusScore]);
useEffect(()=>{

const timer=setInterval(()=>{

setCurrentTime(new Date());

},1000);

return()=>clearInterval(timer);

},[]);








useEffect(() => {

  const loadHistory = async () => {

    try {

      const res = await API.get("/scan");

      setHistory(res.data);

    }catch(error){

console.log(error);

setError("Unable to load scan history.");

} finally {

      setLoading(false);

    }

  };

  loadHistory();


}, []);
useEffect(() => {

    const loadChatHistory = async () => {

        try {

            const { data } = await API.get("/ai/history");

            if (data.success) {

                const formattedHistory = [];

                data.history
                    .slice()
                    .reverse()
                    .forEach((item) => {

                        formattedHistory.push({
                            sender: "user",
                            message: item.question
                        });

                        formattedHistory.push({
                            sender: "ai",
                            message: item.answer
                        });

                    });

                setChatHistory(formattedHistory);

            }

        } catch (error) {

            console.log(
                "Chat History Error:",
                error.response?.data || error.message
            );

            setChatError(
                "Unable to load previous AI conversations."
            );

        }

    };

    loadChatHistory();

}, []);






useEffect(() => {

  const timer = setInterval(() => {

    const idleSeconds = (Date.now() - lastActivity) / 1000;

    let score = 50;

    if (interactionCount >= 10) {
      score += 15;
    }

    if (interactionCount >= 25) {
      score += 10;
    }

    if (idleSeconds < 5) {
      score += 10;
    }

    if (idleSeconds > 30) {
      score -= 15;
    }

    if (idleSeconds > 60) {
      score -= 10;
    }

    score = Math.max(0, Math.min(100, score));

    setFocusScore(score);

    if (score >= 75) {
      setBrainState("High Activity ⚡");
    } else if (score >= 50) {
      setBrainState("Moderate Activity 😊");
    } else {
      setBrainState("Low Activity 😴");
    }

    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, 300);

  }, 1000);

  return () => clearInterval(timer);

}, [interactionCount, lastActivity]);






const downloadReport=()=>{


const doc=new jsPDF();



doc.text(
"NeuroSync AI Brain Report",
20,
20
);


doc.text(
`User: ${user.name}`,
20,
40
);


doc.text(
`Email: ${user.email}`,
20,
50
);


const reportAnalysis = result || history[0]?.result || "No scan analysis available.";

doc.text(
`Analysis: ${reportAnalysis}`,
20,
70
);



doc.save("NeuroSync_Report.pdf");


};









const logout = () => {

const confirmLogout = window.confirm(

"Are you sure you want to logout?"

);

if(!confirmLogout){

return;

}

localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/");

};
const comingSoon = (feature) => {

setMessage(`${feature} is coming soon 🚀`);

setTimeout(() => {

setMessage("");

},2500);

};
const getGreeting = () => {

if(currentTime.getHours() < 12){

return "☀ Good Morning";

}

if(currentTime.getHours() < 18){

return "🌤 Good Afternoon";

}

return "🌙 Good Evening";

};
const formatDate = (date) => {

return new Date(date).toLocaleString();

};








const startScan=()=>{


if(scanning)return;


setScanning(true);

setResult("");

setProgress(0);



let value=0;


const interval=setInterval(async()=>{


value+=10;


setProgress(value);



if(value>=100){



clearInterval(interval);


setScanning(false);



const scanResult = `Cognitive Activity Analysis Complete ✅
Focus Score: ${focusScore}%
Activity State: ${brainState}
Data Source: Behavioral Interaction Signals`;



setResult(scanResult);
setSuccessMessage("✅ Brain Scan Completed Successfully");




await API.post("/scan/save",{

userEmail:user.email,

result:scanResult

});



setHistory([

{
result:scanResult,
createdAt:new Date()
},

...history

]);
setTimeout(()=>{

setSuccessMessage("");

},3000);


}



},300);



};
const loadChatHistory = async () => {
    try {
        const { data } = await API.get("/ai/history");

        if (data.success) {
            setChatHistory(
                data.history.flatMap((item) => [
                    {
                        sender: "user",
                        message: item.question
                    },
                    {
                        sender: "ai",
                        message: item.answer
                    }
                ])
            );
        }

    } catch (error) {
        console.error(
            "Chat History Load Error:",
            error.response?.data || error.message
        );
    }
};
const handleSend = async () => {

    if (!chatMessage.trim()) return;

    try {
        setChatReply("");

        setChatLoading(true);

        setChatError("");

        setChatReply("");

        const { data } = await API.post("/ai/chat", {

    message: chatMessage,

    user: {

        name: user?.name,

        email: user?.email

    }

});

        if (data.success) {

    setChatReply(data.reply);

    setChatHistory((prev) => [

        ...prev,

        {

            sender: "user",

            message: chatMessage

        },

        {

            sender: "ai",

            message: data.reply

        }

    ]);

} else {

            setChatError("AI failed to respond.");

        }

    }

    catch (error) {

        setChatError(

            error.response?.data?.message ||

            "Unable to connect with NeuroSync AI."

        );

    }

    finally {

        setChatLoading(false);

        setChatMessage("");

    }

};






if(loading){

return(

<div className="loading-screen">

<h2>🧠 Loading NeuroSync AI...</h2>

</div>

);

}

return(
  
    
   
    

<div className="dashboard">


<span className="bg-dot" style={{left:"8%",top:"80%"}}></span>

<span className="bg-dot" style={{left:"22%",top:"60%"}}></span>

<span className="bg-dot" style={{left:"40%",top:"92%"}}></span>

<span className="bg-dot" style={{left:"58%",top:"70%"}}></span>

<span className="bg-dot" style={{left:"72%",top:"88%"}}></span>

<span className="bg-dot" style={{left:"86%",top:"76%"}}></span>


<div className="dashboard-header">

<h1>
🧠 NeuroSync AI Dashboard
</h1>

<div className="dashboard-actions">

  <div className="notification">
      🔔
    <span className="notification-badge">
      {dashboardConfig.notificationCount}
    </span>
  </div>

  <div
    className={`theme-toggle ${darkMode ? "dark" : "light"}`}
    onClick={() => setDarkMode(!darkMode)}
  >
    <span>
      {darkMode ? "🌙" : "☀️"}
    </span>
  </div>

</div>

<h2>
Welcome Back, {user?.name} 👋
</h2>
<h3>

{getGreeting()}, {user?.name}

</h3>

<p>

{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}

</p>

<p>
AI-Powered Cognitive Learning & Brain Analysis Platform
</p>

</div>




<div className="welcome-banner">

<div>

<h2>
🚀 Today's AI Insight
</h2>

<p>
  {dashboardData?.insight?.summary || "Loading AI Insight..."}
</p>

</div>

<button>

Start Learning →

</button>

</div>
<div className="learning-report-card">

<h2>📄 AI Learning Report</h2>

<h3>
{dashboardData?.learningReport?.reportTitle || "Loading Report..."}
</h3>

<p>
{dashboardData?.learningReport?.summary || "Generating AI Report..."}
</p>

<div className="report-status">

<strong>Overall Performance:</strong>

<span>
{dashboardData?.learningReport?.overallPerformance || "--"}
</span>

</div>

<div className="report-section">

<h4>✅ Strengths</h4>

<ul>

{dashboardData?.learningReport?.strengths?.map((item,index)=>(

<li key={index}>{item}</li>

))}

</ul>

</div>

<div className="report-section">

<h4>⚠ Weaknesses</h4>

<ul>

{dashboardData?.learningReport?.weaknesses?.map((item,index)=>(

<li key={index}>{item}</li>

))}

</ul>

</div>


<div className="report-section">

<h4>💡 AI Recommendations</h4>

<ul>

{dashboardData?.learningReport?.recommendations?.map((item,index)=>(

<li key={index}>{item}</li>

))}

</ul>

</div>

</div>
<div className="ai-dashboard-grid">

    {/* Study Planner */}
    
    <div className="study-plan-card">

  <div className="study-plan-header">

    <h2>📅 Personalized Study Planner</h2>

    <span>AI Generated</span>

  </div>

  <p className="study-plan-subtitle">
    Your adaptive study schedule generated from today's learning analysis.
  </p>

  <div className="study-plan-list">

    {dashboardData?.studyPlan?.length ? (

      dashboardData.studyPlan.map((plan, index) => (

        <div className="study-item" key={index}>

          <div className="study-time">

            {plan.time}

          </div>

          <div className="study-activity">

            {plan.activity}

          </div>

        </div>

      ))

    ) : (

      <p>Loading Study Planner...</p>

    )}

  </div>

</div>

    {/* Recommendation */}
    
    <div className="recommendation-card">

  <div className="recommendation-header">

    <h2>💡 AI Recommendations</h2>

    <span>Adaptive AI</span>

  </div>

  <p className="recommendation-subtitle">
    Personalized recommendations based on your latest learning analytics.
  </p>

  <div className="recommendation-list">

    {dashboardData?.adaptiveRecommendation?.length ? (

      dashboardData.adaptiveRecommendation.map((item, index) => (

        <div
          className="recommendation-item"
          key={index}
        >

          <span>✅</span>

          <p>{item}</p>

        </div>

      ))

    ) : (

      <p>Loading AI Recommendations...</p>

    )}

  </div>

</div>

    {/* Weak Topic */}
    
    <div className="weak-topic-card">

  <div className="weak-topic-header">

    <h2>🎯 Weak Topic Analysis</h2>

    <span>AI Detection</span>

  </div>

  <p className="weak-topic-subtitle">

    Based on your recent learning analytics.

  </p>

  <div className="weak-topic-body">

    <h3>

      {dashboardData?.weakTopic?.name || "Loading..."}

    </h3>

    <p>

      Detected

      <strong>

        {" "}

        {dashboardData?.weakTopic?.count ?? "--"}

      </strong>

      {" "}times during recent analysis.

    </p>

  </div>

</div>

    {/* Behavior */}
    
    <div className="behavior-card">

  <div className="behavior-header">

    <h2>🧠 Behavior Analysis</h2>

    <span>AI Behavior Engine</span>

  </div>

  <p className="behavior-subtitle">

    AI behavioral pattern detected from your learning activities.

  </p>

  <div className="behavior-body">

    <div className="behavior-item">

      <strong>Dominant Behavior</strong>

      <p>

        {dashboardData?.behavior?.dominantBehavior || "Loading..."}

      </p>

    </div>

    <div className="behavior-item">

      <strong>Risk Level</strong>

      <p>

        {dashboardData?.behavior?.riskLevel || "--"}

      </p>

    </div>

  </div>

</div>

</div>




<div className="profile-card">

<h2>
👤 User Profile
</h2>

<p>
Name: {user?.name}
</p>
<p>Email: {user?.email}</p>

<p>
Total Scan: {history.length}
</p>

<button onClick={downloadReport}>
📄 Download AI Report
</button>

</div>




<div className="cards">

<div className="dash-card">

<h3>👥 Total Users</h3>

<h2>{userCount}</h2>

<p>Registered User</p>

</div>

<div className="dash-card">

<h3>🧠 Brain Scans</h3>

<h2>{dashboardData?.totalAnalysis ?? scanCount}</h2>

<p>Total Completed</p>

</div>

<div className="dash-card">

<h3>🎯 Focus Score</h3>

<h2>{dashboardData?.focusScore ?? focusCount}%</h2>

<p>Current Cognitive Activity</p> 

</div>

<div className="dash-card">

<h3>🤖 AI Accuracy</h3>

<h2>
{dashboardData?.learningScore ?? accuracyCount}%
</h2>

<p>Prediction Confidence</p>

</div>

</div>







<div className={
pulse?
"wave-panel pulse":
"wave-panel"
}>


<h2>
📈 Cognitive Activity Visualization
</h2>

<h3>🎯 Current Focus Score: {focusScore}%</h3>

<h3>🧠 Activity State: {brainState}</h3>

<ResponsiveContainer width="100%" height={250}>

<AreaChart data={brainData}>

<defs>

<linearGradient id="waveColor" x1="0" y1="0" x2="0" y2="1">

<stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>

<stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>

</linearGradient>

</defs>

<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>

<XAxis dataKey="time"/>

<YAxis/>

<Tooltip
contentStyle={{
background:"#111827",
border:"1px solid #22d3ee",
borderRadius:"10px"
}}
formatter={(value)=>[`${value}%`,"Focus Score"]}
/>

<Area
type="monotone"
dataKey="activity"
stroke="#22d3ee"
fill="url(#waveColor)"
strokeWidth={3}
/>

</AreaChart>

</ResponsiveContainer>

</div>








<div className="ai-panel">
  {
successMessage && (

<div className="success-message">

{successMessage}

</div>

)
}


<h2>
🤖 AI Brain Analysis
</h2>
<div className="ai-status">

{scanning ? "🟢 AI Processing..." : "🟣 AI Ready"}

</div>


<div className="ai-result">

<h3>

{

scanning

?

`🔄 Scanning... ${progress}%`

:

result || "🤖 Ready For Brain Scan"

}

</h3>

</div>
{
scanning && (

<div className="progress-container">

<div
className="progress-bar"
style={{ width: `${progress}%` }}
></div>

</div>

)
}



<button onClick={startScan}>


{

scanning?

"Analyzing..."

:

"Start Brain Scan"

}



</button>



</div>









<div className="history-panel">


<h2>
📜 Scan History
</h2>
{loading && <p>⏳ Loading scan history...</p>}

{error && <p className="error-message">{error}</p>}



{

history.length===0?

<p>
No Scan History
</p>


:

history.map((item,index)=>(


<div className="history-card" key={index}>

<div className="history-top">

<span
className={`history-status ${
item.result.includes("Complete")
? "completed"
: "processing"
}`}
>

{
item.result.includes("Complete")

? "✅ Completed"

: "🟡 Processing"

}

</span>

<span className="history-date">

📅 {formatDate(item.createdAt)}

</span>

</div>

<p className="history-result">

{item.result}

</p>

</div>


))


}



</div>




<div className="future-panel">

<h2>🚀 Future AI Features</h2>

{
message && (

<div className="success-message">

{message}

</div>

)
}
{/* =========================
      NeuroSync AI Chatbot
========================= */}

<div className="chatbot-panel">

    <div className="chatbot-header">

        <div className="chatbot-avatar">
            🧠
        </div>

        <div>

            <h2>NeuroSync AI Assistant</h2>

            <p>Your Intelligent Learning Companion</p>

        </div>

        <span className="chatbot-status">
            ● Online
        </span>

    </div>


    
      <div className="chatbot-body">

{

chatHistory.length === 0 ?

(

<div className="bot-message">

👋 Hello {user?.name || "Student"}!

<br/><br/>

I'm NeuroSync AI.

<br/><br/>

Ask me anything about your studies.

</div>

)

:

chatHistory.map((chat,index)=>(

<div

key={index}

className={

chat.sender==="user"

?

"user-message"

:

"bot-message"

}

>

{

chat.sender==="user"

?

"👤 "

:

"🧠 "

}

{chat.message}

</div>

))

}
{

chatLoading && (

<div className="typing-message">

🧠 NeuroSync AI is typing

<span className="typing-dots">

<span>.</span>

<span>.</span>

<span>.</span>

</span>

</div>

)

}

</div>


    <div className="chatbot-input">

       <input
type="text"
placeholder="Ask NeuroSync AI anything..."
value={chatMessage}
onChange={(e)=>setChatMessage(e.target.value)}
onKeyDown={(e)=>{

    if(e.key==="Enter"){

        handleSend();

    }

}}
/>

        <button

onClick={handleSend}
disabled={chatLoading}
>

{

chatLoading ?

"Thinking..."

:

"Send →"

}

</button>

    </div>

</div>
<div className="future-grid">

<div
className="future-card"
onClick={()=>comingSoon("🤖 AI Chatbot")}
>

🤖 AI Chatbot

<p>Coming Soon</p>

</div>

<div
className="future-card"
onClick={()=>comingSoon("👨‍🏫 Teacher Panel")}
>

👨‍🏫 Teacher Panel

<p>Coming Soon</p>

</div>

<div
className="future-card"
onClick={()=>comingSoon("👨‍💼 Admin Panel")}
>

👨‍💼 Admin Panel

<p>Coming Soon</p>

</div>

<div
className="future-card"
onClick={()=>comingSoon("🧠 OpenAI Integration")}
>

🧠 OpenAI

<p>Coming Soon</p>

</div>

<div
className="future-card"
onClick={()=>comingSoon("✨ Gemini AI")}
>

✨ Gemini AI

<p>Coming Soon</p>

</div>

<div
className="future-card"
onClick={()=>comingSoon("🐍 Python AI Engine")}
>

🐍 Python AI

<p>Coming Soon</p>

</div>

</div>

</div>

<button
className="logout"
onClick={logout}
>

Logout

</button>





</div>



);


}



export default Dashboard;