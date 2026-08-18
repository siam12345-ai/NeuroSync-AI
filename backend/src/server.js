require("dotenv").config();
const scanRoutes = require("./routes/scanRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const teacherReportRoutes = require("./routes/teacherReportRoutes");
const adminReportRoutes = require("./routes/adminReportRoutes");
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/mongodb");

const app = express();
const taskRoutes = require("./routes/taskRoutes");


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
connectDB();



app.use("/api/auth", authRoutes);

app.use("/api/scan", scanRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/teacher-report", teacherReportRoutes);
app.use("/api/admin-report", adminReportRoutes);



// Test Route
app.get("/", (req, res) => {

    res.send("NeuroSync Backend Running 🚀");

});



// API Test Route
app.get("/api/test", (req, res) => {

    res.json({

        message:"API Working Successfully",

        status:true

    });

});



// Server Start
app.listen(process.env.PORT,()=>{

    console.log(`Server Running On Port ${process.env.PORT}`);

});