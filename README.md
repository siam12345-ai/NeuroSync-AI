# NeuroSync AI

## An Intelligent Cognitive Learning and Human Behavior Analysis System    

---

## 👥 Team Information

### Team Name
**CSE4104-7D-T01**

### Team Members
* **Team Leader:** Abu Bakar Siam
* Jeba Sabiha Promi
* Md Nasiruddin Shael
* Sefa Sultana

---

## 📌 Project Description
NeuroSync AI is an AI-powered educational productivity and cognitive learning assistant system designed to improve student performance through intelligent behavioral analysis and adaptive learning support.

### Problem Statement
Modern students often struggle with concentration, productivity, study consistency, and time management. Existing educational systems mainly provide static learning resources but fail to intelligently analyze learning behavior and productivity patterns. NeuroSync AI aims to solve these problems using Artificial Intelligence by providing personalized learning recommendations, productivity analysis, and adaptive academic assistance.

---

## 🚀 Proposed Features
- AI Chatbot Assistant
- Smart Study Planner
- Productivity Dashboard
- Focus Monitoring System
- AI Recommendation System
- Task Management
- Performance Analytics
- Smart Notifications
- Cognitive Performance Tracking

---

## 💻 Technology Stack

### Frontend
- React.js / Next.js
- Tailwind CSS

### Backend & AI
- Node.js / Express.js
- Python AI Modules
- OpenAI & Gemini API / Hugging Face

### Database
- MongoDB / PostgreSQL

---

## 📂 Repository Structure
```text
NeuroSync-AI/
├── frontend/           # React.js/Next.js User Interface
├── backend/            # Node.js API & Business Logic
├── database/           # Database scripts and schemas
├── documentation/      # SRS, API Docs, and Project Reports
├── design/             # UI/UX, ERD, and Architecture Diagrams
└── README.md           # Project Documentation
```

---

## ⚙️ Project Setup Instructions

### Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org) (v18 or higher)
- [MongoDB](https://mongodb.com) or [PostgreSQL](https://postgresql.org)
- [Python](https://python.org) (v3.10+ for AI modules)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js/React development server:
   ```bash
   npm run dev
   ```

---

## 📅 Development Planning & Roadmap

### Phase 1: Requirements & System Design (Current)
- [x] Finalize system architecture and repository structure.
- [x] Prepare UI/UX wireframes and database ERD models.
- [x] Set up baseline repository and basic documentation.

### Phase 2: Core Backend & Database Implementation
- [ ] Database configuration (MongoDB/PostgreSQL connections).
- [ ] Authentication system (JWT-based user signup/login).
- [ ] API implementation for Task Management and Smart Planner.

### Phase 3: Frontend Integration & AI Modules
- [ ] Build responsive UI layouts using Tailwind CSS.
- [ ] Connect frontend components with Backend REST APIs.
- [ ] Integrate Python AI modules, OpenAI/Gemini APIs for chatbot and recommendations.

### Phase 4: Testing & Deployment
- [ ] Unit testing for APIs and frontend validation.
- [ ] Focus Monitoring system and dashboard optimizations.
- [ ] Deploy frontend on Vercel and backend on Render/AWS.
