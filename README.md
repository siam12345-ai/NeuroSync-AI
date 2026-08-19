# NeuroSync AI

## An Intelligent Cognitive Learning and Human Behavior Analysis System

NeuroSync AI is an AI-powered web-based platform designed to analyze cognitive learning patterns, human behavior, productivity, and learning consistency.

The system provides personalized learning assistance, AI-powered recommendations, behavioral analysis, progress tracking, analytical reports, task management, and AI-assisted academic support.

---

# Project Information

**Course:** CSE 4104 - Software Development III  
**Course Type:** AI-Based Software Project Development  
**Section:** 7D  
**Team:** CSE4104-7D-T01  
**Project:** NeuroSync AI  

| Role              | Name                 |
| ----------------- | -------------------- |
| **Team Leader**   | Abu Bakar Siam       |
| **Team Member 1** | Md. Nasiruddin Shael |
| **Team Member 2** | Sefa Sultana         |
| **Team Member 3** | Zeba Sabiha Promi    |


**Project Title:**  
NeuroSync AI: An Intelligent Cognitive Learning and Human Behavior Analysis System

---

# Project Objectives

The major objectives of NeuroSync AI are:

- Analyze cognitive learning performance
- Analyze learning and behavioral patterns
- Generate AI-powered recommendations
- Provide personalized learning assistance
- Monitor learning progress
- Provide AI chatbot support
- Manage study tasks
- Analyze focus and consistency
- Detect weak learning topics
- Generate analytical reports

---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- REST API

## Database

- MongoDB
- Mongoose

## AI

- Gemini API
- Backend AI services
- AI analysis and recommendation workflows

## Authentication

- JWT-based authentication
- Protected backend routes
- Password hashing

---

# Main Features

The current Week 09 implementation includes:

- User Registration
- User Login
- Authentication
- Dashboard
- Cognitive Analysis / Brain Scan
- Behavior Assessment
- AI Chatbot
- AI Recommendation
- Task and Study Management
- Focus and Consistency Tracking
- Weak Topic Detection
- Performance Analytics
- Scan History
- Reports
- Profile Management
- MongoDB Data Persistence
- Error Handling
- Responsive UI
- Frontend-Backend Integration
- AI Integration

---

# Database

The current MongoDB implementation contains application data collections including:

- Users
- ScanHistory
- Tasks
- ChatHistory

The system supports storing and retrieving application data through backend APIs.

---

# API Structure

Major backend route groups include:

```text
/api/auth
/api/scan
/api/ai
/api/tasks
/api/analytics
/api/report
/api/teacher-report
/api/admin-report

Protected routes use authentication middleware where required.

Project Architecture
The project follows a frontend-backend-database-AI architecture.

User
  |
  v
React Frontend
  |
  v
Express / Node.js Backend
  |
  +-------------------+
  |                   |
  v                   v
MongoDB            AI Services
  |                   |
  +---------+---------+
            |
            v
       Result / Response
            |
            v
       Frontend Display

Project Structure

NeuroSync-AI/
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── ...
│
├── backend/
│   └── src/
│       ├── ai/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       └── ...
│
├── database/
├── diagrams/
├── documentation/
│
├── AI_Integration_Report.md
├── AI_WORKFLOW.md
├── .gitignore
└── README.md

Running the Project
Backend
Open a terminal inside the backend directory:

cd backend
npm install
npm run dev

The backend runs on the configured local development port.

Frontend
Open another terminal:

cd frontend
npm install
npm run dev

The frontend can then be accessed through the Vite development server URL displayed in the terminal.

Environment Variables
Sensitive credentials should be stored using environment variables.

Example:

GEMINI_API_KEY=your_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

Do not upload real API keys, passwords, database credentials, or .env files to GitHub.

Week 09 Feature Completion Status
Completed Features
The following major features have been implemented and verified during the Week 09 audit:

Authentication

Registration and Login

Dashboard

Cognitive Analysis / Brain Scan

Behavior Assessment

AI Chatbot

AI Recommendation

Task and Study Management

Focus and Consistency Tracking

Weak Topic Detection / General Learning Analysis

Performance Analytics

Scan History

Reports

Profile Management

Error Handling

Responsive UI

MongoDB Data Persistence

Frontend-Backend Integration

AI Integration

Remaining Features
The following features were included in the original project scope but are not implemented in the current Week 09 build.

Teacher Module
Status: Not Implemented

Planned functionality:

Teacher Dashboard

Student Monitoring

Student Report Viewing

AI Output Monitoring

Admin Module
Status: Not Implemented

Planned functionality:

User Management

Administrative Analytics

System Settings

Administrative Controls

Smart Notification System
Status: Not Implemented

The Smart Notification System was included in the original proposal but has not been implemented in the current Week 09 build.

These incomplete features are intentionally documented as remaining features and are not represented as completed functionality.

Feature Completion Checklist
Feature	Week 09 Status
Authentication	Completed
Registration and Login	Completed
Dashboard	Completed
Cognitive Analysis	Completed
Behavior Assessment	Completed
AI Chatbot	Completed
AI Recommendation	Completed
Task & Study Management	Completed
Focus & Consistency	Completed
Weak Topic Detection	Completed
Performance Analytics	Completed
Scan History	Completed
Reports	Completed
Profile Management	Completed
Error Handling	Completed
Responsive UI	Completed
MongoDB Persistence	Completed
Frontend-Backend Integration	Completed
AI Integration	Completed
Teacher Module	Not Implemented
Admin Module	Not Implemented
Smart Notifications	Not Implemented
Frontend-Backend Integration
The major frontend and backend components communicate through REST API endpoints.

Verified areas include:

Authentication requests

Dashboard workflow

Scan processing

Scan history retrieval

AI requests

Task management

Analytics

Reports

User-specific data retrieval

Error handling

The implemented workflows use backend APIs rather than relying exclusively on frontend-only static data.

AI Integration
The AI system is integrated into the application workflow through the backend.

Major AI-related functionality includes:

AI Chatbot

AI Recommendation

Learning-related Analysis

Weak Topic Detection

Behavioral Analysis Support

AI credentials are intended to be stored through environment variables rather than hardcoded into source code.

Authentication
The authentication workflow has been reviewed for:

Registration

Login

Logout

Password handling

Authentication/session state

Protected routes

Unauthorized access handling

Invalid login handling

Authentication is implemented through the backend authentication system and protected API routes.

Major User Workflow
The current system supports major end-to-end workflows such as:

Registration
     ↓
Login
     ↓
Dashboard
     ↓
Select Feature
     ↓
Submit / Request Data
     ↓
Backend Processing
     ↓
Database / AI Processing
     ↓
Result Display
The exact workflow varies depending on the selected feature.

Error Handling
The application has been reviewed for common error conditions including:

Invalid information

Missing required information

API failures

Unauthorized access

Empty states

Failed requests

The system aims to provide understandable user-facing feedback instead of allowing technical errors to crash the application.

UI/UX and Responsive Design
The interface has been reviewed for:

Navigation

Page layout

Button behavior

Loading states

Empty states

Error messages

Success feedback

Responsive layouts

Mobile usability

The current build provides a responsive interface for the implemented modules.

Major Problems and Solutions
Scan History API Issue
During the Week 09 audit, the frontend initially requested scan history using a user-email URL.

The backend scan history route was designed to retrieve the authenticated user's history through the protected scan endpoint.

The History.jsx workflow was corrected to use the protected scan-history endpoint.

The Scan History feature was subsequently verified as completed.

Git Repository Documentation Issue
The project root previously contained an incorrectly structured README.md directory.

The incorrect directory was removed and a proper root-level README.md file was created.

GitHub Update
The Scan History correction was committed using the meaningful commit message:

Fix scan history retrieval workflow
The changes were successfully pushed to the main branch.

Changes From Original Plan
The original SRS and proposal included:

Teacher Module

Admin Module

Smart Notification System

These features are not implemented in the current Week 09 build.

They have therefore been documented as remaining features instead of being represented as completed functionality.

The current implementation focuses on completing the major student-facing workflows, AI integration, database persistence, analytics, reporting, authentication, and core usability.

Current Development Status
NeuroSync AI has progressed from separate frontend, backend, database, and AI modules toward an integrated working application.

The current Week 09 build demonstrates:

Frontend-backend communication

Authentication

Database persistence

AI integration

Cognitive analysis

Behavioral assessment

Learning recommendations

Task management

Focus and consistency tracking

Weak topic detection

Analytics

Reports

Scan history

Error handling

Responsive interface

Teacher, administrator, and smart notification modules remain planned for subsequent development.

Documentation
Additional project documentation includes:

AI_Integration_Report.md

AI_WORKFLOW.md

Project documentation inside the documentation/ directory

System diagrams inside the diagrams/ directory

GitHub Repository
NeuroSync AI GitHub Repository:

https://github.com/siam12345-ai/NeuroSync-AI

Branch: main

Week 09 Milestone
This repository represents the Week 09 development milestone of NeuroSync AI.

The milestone focuses on:

Feature completion

Frontend-backend integration

Database integration

AI integration

Authentication

Major user workflows

UI/UX improvement

Error handling

Project scope review

Mid-project review preparation

Conclusion
The Week 09 milestone establishes a functional integrated foundation for NeuroSync AI.

The major implemented student-facing workflows have been connected across frontend, backend, database, and AI components.

The project currently demonstrates meaningful AI integration, database persistence, authentication, learning analysis, behavioral assessment, recommendations, task management, analytics, reporting, scan history, and responsive UI.

Remaining Teacher, Admin, and Smart Notification modules have been explicitly documented as incomplete and planned for subsequent development.

Week 09 Submission Checklist
The Week 09 submission includes:

Week 09 Progress and Integration Report PDF

Updated GitHub Repository Link

Feature Completion Checklist

Current System Screenshots

Optional:

Live Demo Link

Short Project Demonstration Video
