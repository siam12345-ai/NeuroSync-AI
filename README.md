# NeuroSync AI

## An Intelligent Cognitive Learning and Human Behavior Analysis System

NeuroSync AI is an AI-powered web-based platform designed to analyze cognitive learning patterns, human behavior, productivity, and learning consistency.

The system provides personalized learning assistance, AI-powered recommendations, behavioral analysis, progress tracking, analytical reports, task management, AI-assisted academic support, and behavioral cognitive activity estimation based on user interaction signals.

---

# Project Information

**Course:** CSE 4104 - Software Development III
**Course Type:** AI-Based Software Project Development
**Section:** 7D
**Team:** CSE4104-7D-T01
**Project:** NeuroSync AI

## Project Title

**NeuroSync AI: An Intelligent Cognitive Learning and Human Behavior Analysis System**

---

# 👥 Team Members & Responsibilities

| Member                | Role                                                      | Main Responsibility                                                                                                                                                                                                                             

| **Abu Bakar Siam**    | **Team Leader & Full-Stack/AI Lead & Database Developer** | Project planning & coordination, GitHub management, system architecture, AI integration, MongoDB database design &                                                                                                  management, authentication, data persistence, frontend-backend integration, testing, debugging, and final system integration |

| **Sefa Sultana**      | **Frontend Developer & UI/UX Designer**                   | React frontend development, UI/UX design, dashboard/pages, reusable components, responsive interface, navigation, and user                                                                                          experience  

| **Nasir Shael**       | **Frontend-Backend Integration Developer**                | Frontend-backend coordination, API integration, authentication flow, data flow, integration testing, and frontend-backend                                                                                           debugging                                                                                                             
| **Jeba Sabiha Promi** | **Backend Developer**                                     | Node.js/Express API development, routes, controllers, backend logic, server-side functionality, API testing, and backend                                                                                            debugging                                                                                                              

---

# Project Objectives

The major objectives of NeuroSync AI are:

* Analyze cognitive learning performance
* Analyze learning and behavioral patterns
* Generate AI-powered recommendations
* Provide personalized learning assistance
* Monitor learning progress
* Provide AI chatbot support
* Manage study tasks
* Analyze focus and consistency
* Detect weak learning topics
* Generate analytical reports
* Provide behavioral cognitive activity estimation from user interaction signals
* Integrate frontend, backend, database, and AI services into a unified system

---

# Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* CSS

## Backend

* Node.js
* Express.js
* REST API

## Database

* MongoDB
* Mongoose

## AI

* Gemini API
* Backend AI services
* AI analysis and recommendation workflows

## Authentication

* JWT-based authentication
* Protected backend routes
* Password hashing

---

# Main Features

The current Week 10 integrated build includes the following implemented student-facing features:

* User Registration
* User Login
* Authentication
* Dashboard
* Cognitive Analysis / Brain Scan
* Behavioral Cognitive Activity Monitoring
* AI Chatbot
* AI Recommendation
* Task and Study Management
* Focus and Consistency Tracking
* Weak Topic Detection
* Performance Analytics
* Scan History
* Reports
* Profile Management
* MongoDB Data Persistence
* Error Handling
* Responsive UI
* Frontend-Backend Integration
* AI Integration

---

# Cognitive Activity / Brain Scan

The Brain Scan feature is implemented as a **Non-EEG Behavioral Cognitive Activity Estimation** system.

It does **not** directly measure EEG signals or actual brainwave frequencies.

Instead, the system analyzes behavioral interaction signals generated during user interaction with the application.

## Input Sources

* Mouse activity
* Keyboard activity
* Interaction count
* Active/idle interaction behavior
* Session duration

## Analysis Type

**Non-EEG Behavioral Cognitive Activity Estimation**

## Data Source

**Behavioral Interaction Signals**

The collected interaction signals are processed to estimate an application-level cognitive activity state and focus score.

The feature is intended as a software-based behavioral estimation mechanism rather than a medical, neurological, or direct brainwave measurement system.

---

# Database

The current MongoDB implementation contains application data collections including:

* Users
* ScanHistory
* Tasks
* ChatHistory

The system supports storing and retrieving application data through protected backend APIs.

## Scan History Data

The ScanHistory model stores information including:

* User email
* Analysis result
* Focus score
* Activity state
* Interaction count
* Session duration
* Data source
* Creation/update timestamps

The scan history workflow uses authenticated user information rather than relying on a user-provided email in the request URL.

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
```

Protected routes use authentication middleware where required.

The application communicates between the frontend and backend through REST APIs.

---

# Project Architecture

The project follows a frontend-backend-database-AI architecture.

```text
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
```

---

# Project Structure

```text
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
```

---

# Running the Project

## Backend

Open a terminal inside the backend directory:

```bash
cd backend
npm install
npm run dev
```

The backend runs on the configured local development port.

## Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend can then be accessed through the Vite development server URL displayed in the terminal.

---

# Environment Variables

Sensitive credentials should be stored using environment variables.

Example:

```env
GEMINI_API_KEY=your_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

Do not upload real API keys, passwords, database credentials, or `.env` files to GitHub.

---

# Week 09 → Week 10 Development Progress

The Week 09 milestone focused primarily on feature completion and integration of the major student-facing modules.

The Week 10 milestone focuses on:

* Software testing
* Bug identification
* Bug fixing
* Retesting
* Regression testing
* API validation
* Authentication/security validation
* Frontend-backend integration verification
* Cognitive activity scan validation
* Scan history verification
* Responsive UI verification
* Final quality assurance
* Final project integration

The current repository represents the integrated Week 10 build after the identified QA issues were addressed and retested.

---

# Feature Completion Status

| Feature                                  | Week 10 Status  |
| ---------------------------------------- | --------------- |
| Authentication                           | Completed       |
| Registration and Login                   | Completed       |
| Dashboard                                | Completed       |
| Cognitive Analysis                       | Completed       |
| Behavioral Cognitive Activity Monitoring | Completed       |
| AI Chatbot                               | Completed       |
| AI Recommendation                        | Completed       |
| Task & Study Management                  | Completed       |
| Focus & Consistency Tracking             | Completed       |
| Weak Topic Detection                     | Completed       |
| Performance Analytics                    | Completed       |
| Scan History                             | Completed       |
| Reports                                  | Completed       |
| Profile Management                       | Completed       |
| Error Handling                           | Completed       |
| Responsive UI                            | Completed       |
| MongoDB Persistence                      | Completed       |
| Frontend-Backend Integration             | Completed       |
| AI Integration                           | Completed       |
| Software Testing                         | Completed       |
| Bug Fixing                               | Completed       |
| Regression Testing                       | Completed       |
| QA Retesting                             | Completed       |
| Teacher Module                           | Not Implemented |
| Admin Module                             | Not Implemented |
| Smart Notifications                      | Not Implemented |

---

# Software Testing & Quality Assurance

The Week 10 build was reviewed through functional testing, API testing, AI validation, responsive UI testing, security-related testing, regression testing, bug retesting, and integration verification.

## QA Summary

| QA Metric           |     Result |
| ------------------- | ---------: |
| Confirmed Bugs      |          3 |
| Bugs Fixed          |          3 |
| Bugs Retested       |          3 |
| Retest Passed       |          3 |
| Open Confirmed Bugs |          0 |
| API Tests           | 10/10 PASS |
| AI Tests            | 10/10 PASS |
| Responsive Tests    |   3/3 PASS |
| Security Tests      |   6/6 PASS |
| Regression Tests    |   8/8 PASS |
| Overall QA Status   |   **PASS** |

---

# Identified Bugs and Fixes

## BUG-01 — Empty AI Message Handling

### Problem

Submitting an empty AI message previously caused an HTTP 500 server error.

### Fix

Backend validation was added to ensure that the AI message is a non-empty string.

Invalid input is now rejected with an HTTP 400 response instead of causing a server error.

### Retest

**Status: PASS**

---

## BUG-02 — Non-String AI Message Handling

### Problem

A non-string AI message could previously cause an HTTP 500 server error.

### Fix

The backend now validates the message type before processing the request.

Only a valid non-empty string is accepted.

### Retest

**Status: PASS**

---

## BUG-03 — Brain Scan Interaction Tracking

### Problem

Mouse and keyboard interactions were previously recorded incorrectly because of stale frontend state during the scan process.

### Fix

Live interaction counters were implemented using persistent references so that the scan calculation receives the current interaction values.

### Retest

**Status: PASS**

The Brain Scan workflow was verified using actual mouse and keyboard interaction activity during testing.

---

# Scan History Validation

The Scan History workflow was reviewed and corrected during development.

The frontend and backend now use the authenticated user's identity to retrieve the appropriate scan history.

The protected scan-history workflow was verified after the correction.

Separate scans initiated from different Brain Scan entry points can each create their own history record because each represents a separate scan execution.

---

# Frontend-Backend Integration

The major frontend and backend components communicate through REST API endpoints.

Verified areas include:

* Authentication requests
* Dashboard workflow
* Cognitive activity scan processing
* Scan history saving
* Scan history retrieval
* AI requests
* Task management
* Analytics
* Reports
* User-specific data retrieval
* Error handling

The implemented workflows use backend APIs rather than relying exclusively on frontend-only static data.

---

# AI Integration

The AI system is integrated into the application workflow through backend services.

Major AI-related functionality includes:

* AI Chatbot
* AI Recommendation
* Learning-related Analysis
* Weak Topic Detection
* Behavioral Analysis Support
* Personalized learning assistance

AI credentials are intended to be stored through environment variables rather than hardcoded into source code.

---

# Authentication

The authentication workflow has been reviewed for:

* Registration
* Login
* Logout
* Password handling
* Authentication/session state
* Protected routes
* Unauthorized access handling
* Invalid login handling

Authentication is implemented through the backend authentication system and protected API routes.

---

# Major User Workflow

The current system supports major end-to-end workflows such as:

```text
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
```

The exact workflow varies depending on the selected feature.

For the behavioral cognitive activity workflow:

```text
User Interaction
      ↓
Mouse / Keyboard Signals
      ↓
Interaction Tracking
      ↓
Cognitive Activity Estimation
      ↓
Focus / Activity Analysis
      ↓
Scan Result
      ↓
MongoDB Scan History
```

---

# Error Handling

The application has been reviewed for common error conditions including:

* Invalid information
* Missing required information
* API failures
* Unauthorized access
* Empty states
* Failed requests
* Invalid AI input
* Invalid data types

The system aims to provide understandable user-facing feedback instead of allowing technical errors to crash the application.

---

# UI/UX and Responsive Design

The interface has been reviewed for:

* Navigation
* Page layout
* Button behavior
* Loading states
* Empty states
* Error messages
* Success feedback
* Responsive layouts
* Mobile usability

The current build provides a responsive interface for the implemented modules.

---

# Changes From Week 09 to Week 10

The Week 10 development cycle primarily focused on testing, debugging, quality assurance, and final integration rather than introducing large new modules.

Major improvements include:

* AI input validation
* Improved error handling for invalid AI requests
* Brain Scan interaction tracking correction
* Behavioral cognitive activity estimation workflow verification
* Scan History workflow verification
* Protected scan history retrieval
* Backend/frontend integration validation
* API testing
* AI testing
* Regression testing
* Security-related testing
* Responsive UI testing
* Final QA retesting
* Documentation update

---

# Remaining Features

The following features were included in the original project scope but are not implemented in the current Week 10 build.

## Teacher Module

**Status: Not Implemented**

Planned functionality:

* Teacher Dashboard
* Student Monitoring
* Student Report Viewing
* AI Output Monitoring

## Admin Module

**Status: Not Implemented**

Planned functionality:

* User Management
* Administrative Analytics
* System Settings
* Administrative Controls

## Smart Notification System

**Status: Not Implemented**

The Smart Notification System was included in the original proposal but has not been implemented in the current Week 10 build.

These incomplete features are intentionally documented as remaining features and are not represented as completed functionality.

---

# Major Problems and Solutions

## Scan History API Issue

During the development audit, the frontend initially requested scan history using a user-email URL.

The backend scan history route was designed to retrieve the authenticated user's history through the protected scan endpoint.

The History workflow was corrected to use the protected scan-history endpoint.

The Scan History feature was subsequently verified as completed.

---

## AI Input Validation Issues

During QA testing, invalid AI input could previously cause HTTP 500 server errors.

The backend AI controller was updated to validate:

* Message type
* Empty message content
* Whitespace-only input

Invalid input now returns an appropriate HTTP 400 response.

---

## Brain Scan Interaction Tracking Issue

During QA testing, mouse and keyboard activity could be recorded incorrectly because of stale React state.

The scan workflow was updated to use live interaction counters so that actual interaction values are available when calculating the final scan result.

The corrected workflow was retested successfully.

---

# Testing Scope

The Week 10 QA process covered the following areas:

### Functional Testing

* Authentication
* Dashboard
* Brain Scan
* Scan History
* AI Chatbot
* AI Recommendation
* Task Management
* Study Management
* Analytics
* Reports
* Profile Management

### API Testing

* Authentication APIs
* Scan APIs
* AI APIs
* Task APIs
* Analytics APIs
* Report APIs

### AI Testing

* AI request validation
* AI response workflow
* Empty input handling
* Invalid input type handling
* AI recommendation workflow

### Security Testing

* Protected routes
* Authentication validation
* Unauthorized access handling
* Password handling
* JWT-based access control
* User-specific data access

### Responsive Testing

* Desktop layout
* Tablet layout
* Mobile layout

### Regression Testing

Previously implemented features were retested after bug fixes to verify that existing functionality remained operational.

---

# QA Documentation

The project QA documentation includes:

* Test Case Document
* Bug Report Document
* QA Report

The QA documentation records the tested functionality, identified bugs, fixes, retesting results, regression testing, and overall quality status.

---

# Current Development Status

NeuroSync AI has progressed from separate frontend, backend, database, and AI modules toward an integrated working application.

The current Week 10 build demonstrates:

* Frontend-backend communication
* Authentication
* Database persistence
* AI integration
* Cognitive activity analysis
* Behavioral assessment
* Behavioral interaction monitoring
* Learning recommendations
* Task management
* Focus and consistency tracking
* Weak topic detection
* Analytics
* Reports
* Scan history
* Error handling
* Responsive interface
* Software testing
* Bug fixing
* Regression testing
* Final QA validation

Teacher, administrator, and smart notification modules remain planned for subsequent development.

---

# Documentation

Additional project documentation includes:

* `AI_Integration_Report.md`
* `AI_WORKFLOW.md`
* Project documentation inside the `documentation/` directory
* System diagrams inside the `diagrams/` directory
* Test Case Document
* Bug Report Document
* QA Report

---

# Git Repository

**NeuroSync AI GitHub Repository:**

https://github.com/siam12345-ai/NeuroSync-AI

**Branch:** `main`

The repository contains the integrated project source code, documentation, configuration files, and project resources.

---

# Week 10 Final Milestone

The Week 10 milestone focuses on:

* Feature integration
* Frontend-backend integration
* Database integration
* AI integration
* Authentication
* Behavioral cognitive activity estimation
* Major user workflows
* Error handling
* Bug fixing
* API validation
* Regression testing
* Security testing
* Responsive UI validation
* Quality assurance
* Final system verification
* Project documentation

---

# Conclusion

The Week 10 milestone establishes a tested and integrated foundation for NeuroSync AI.

The major implemented student-facing workflows have been connected across the frontend, backend, database, and AI components.

The project currently demonstrates:

* AI-assisted learning support
* AI chatbot functionality
* Learning analysis
* Behavioral assessment
* Behavioral cognitive activity estimation
* Personalized recommendations
* Task and study management
* Focus and consistency tracking
* Weak topic detection
* Performance analytics
* Reporting
* Scan history
* Authentication
* MongoDB persistence
* REST API communication
* Error handling
* Responsive UI
* Software testing
* Bug fixing
* Regression testing
* Final QA validation

The Brain Scan functionality is explicitly implemented as a **Non-EEG Behavioral Cognitive Activity Estimation** system using behavioral interaction signals such as mouse and keyboard activity. It should not be interpreted as direct EEG or medical brainwave measurement.

Teacher, Admin, and Smart Notification modules have been explicitly documented as incomplete and planned for subsequent development.

---

# Week 10 Submission Checklist

The Week 10 submission includes:

* Week 10 Testing & QA / Final QA Report PDF
* Test Case Document
* Bug Report Document
* Updated GitHub Repository
* Updated README.md
* Feature Completion Status
* Current System Screenshots
* QA Testing Evidence

## Optional

* Live Demo Link
* Short Project Demonstration Video

---

# Final Project Status

**NeuroSync AI — Week 10**

**Development Status:** Integrated Build
**Testing Status:** Completed
**Bug Fixing Status:** Completed
**Regression Testing:** Passed
**QA Status:** **PASS**
**Open Confirmed Bugs:** **0**

---

**NeuroSync AI**
*An Intelligent Cognitive Learning and Human Behavior Analysis System*
