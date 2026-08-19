# NeuroSync AI — AI Workflow Documentation

## 1. Overview

NeuroSync AI provides an AI-powered academic assistance workflow for university students.

The system receives a student's question through the dashboard, combines the question with relevant student learning context, sends the structured prompt to the configured AI provider, validates the generated response, and returns a safe response to the user.

The workflow is designed to support:

* Academic assistance
* Cognitive learning analysis
* Study recommendations
* Personalized responses
* Safe AI interaction
* AI error handling

---

## 2. AI Request Workflow

The NeuroSync AI request follows this sequence:

1. Student enters a question in the dashboard.
2. Frontend sends the request to the AI chat API.
3. Backend receives the student request.
4. Student context is prepared.
5. NeuroSync AI system instructions are combined with the student context and question.
6. The structured prompt is sent to the Gemini AI provider.
7. Gemini generates the AI response.
8. The backend validates the AI output.
9. If the response is valid, it is returned to the frontend.
10. If an AI/API failure occurs, the backend classifies the error and returns a safe user-facing message.

---

## 3. Input Layer

### User Input

The primary input is the student's natural-language question.

Example:

> Explain TCP and UDP in a simple table with 3 differences.

### Student Context

The AI workflow can also use available learning-related context, including:

* Student name
* Learning state
* Behavior pattern
* Weak topic
* AI recommendation
* Learning analytics

This context is used to personalize the AI response.

---

## 4. Prompt Construction

The NeuroSync AI prompt contains several logical sections.

### System Instructions

The system instructions define the AI identity and responsibilities.

The AI is instructed to act as:

* AI Academic Assistant
* Cognitive Learning Analyzer
* Study Recommendation Assistant

The system instructions also define professional, educational, friendly, concise, and safe response behavior.

### Student Profile

The prompt includes available student-learning context.

Example:

* Name: Siam
* Learning State: Normal
* Weak Topic: Networking
* AI Recommendation: No Recommendation

### Student Question

The student's actual question is inserted into the prompt.

### Response Rules

The prompt specifies response requirements such as:

* Use simple university-level language.
* Keep responses educational.
* Give practical study advice.
* Mention the weak topic when relevant.
* Encourage productive learning.
* Keep responses concise.
* Avoid harmful or unrelated content.

---

## 5. AI Provider Layer

The current AI provider is:

**Google Gemini**

The implemented provider uses:

**Gemini 2.5 Flash**

The provider receives the constructed NeuroSync AI prompt and attempts to generate an AI response.

---

## 6. AI Output Validation

After the provider returns a response, NeuroSync AI validates the generated output.

The system checks whether a usable text response was returned.

### Valid Response

If valid AI text is available:

```text
success: true
provider: Gemini
errorType: null
response: AI-generated response
```

The response is then returned to the application.

### Empty Response

If the AI provider returns an empty or invalid text response:

```text
errorType: EMPTY_RESPONSE
```

The system returns a safe fallback message instead of returning an invalid AI response to the user.

---

## 7. AI Error Handling

The AI workflow classifies important provider failures.

### Rate Limit / Quota

```text
errorType: RATE_LIMIT
```

User-facing response:

> NeuroSync AI is temporarily busy. Please try again shortly.

### Timeout

```text
errorType: TIMEOUT
```

User-facing response:

> The AI request timed out. Please try again.

### Network / Connection Error

```text
errorType: NETWORK_ERROR
```

User-facing response:

> NeuroSync AI is temporarily unavailable. Please check your connection and try again.

### Generic AI/API Error

```text
errorType: AI_SERVICE_ERROR
```

User-facing response:

> NeuroSync AI is temporarily unavailable. Please try again later.

---

## 8. Output Layer

For a successful request, the backend returns the AI-generated response together with the relevant analysis information used by the application.

The frontend displays the final AI response in the NeuroSync AI chat interface.

The response is therefore processed through:

```text
AI Provider
    ↓
Output Validation
    ↓
Error Classification (if required)
    ↓
Backend Response
    ↓
Frontend Chat Interface
```

---

## 9. Personalization Workflow

NeuroSync AI uses available student-learning information to make responses more relevant.

For example, when Networking is identified as a weak topic, the AI may mention Networking-related study advice when the student's question is related to that topic.

This creates a personalized learning interaction instead of a completely generic chatbot response.

---

## 10. Safety and Reliability

The AI workflow includes multiple reliability controls:

* Input validation
* Prompt response rules
* AI output validation
* Empty-response handling
* Rate-limit handling
* Timeout handling
* Network-error handling
* Generic AI/API-error handling
* Safe user-facing fallback messages

These controls prevent raw provider failures from being directly exposed to the student.

---

## 11. Overall Architecture

```text
Student
   ↓
React Dashboard
   ↓
AI Chat API
   ↓
Prompt Construction
   ↓
Gemini Provider
   ↓
AI Output
   ↓
Output Validation
   ↓
Error Classification
   ↓
Safe / Valid Response
   ↓
React Dashboard
```

---

## 12. Current Implementation Status

| Component                 | Status      |
| ------------------------- | ----------- |
| AI Chat Request           | Complete    |
| Gemini Integration        | Complete    |
| Prompt Engineering        | Complete    |
| Student Context           | Implemented |
| AI Output Validation      | Complete    |
| Empty Response Handling   | Complete    |
| Rate Limit Handling       | Complete    |
| Timeout Handling          | Complete    |
| Network Error Handling    | Complete    |
| Generic AI Error Handling | Complete    |
| AI Workflow Documentation | In Progress |

---

## 13. Design Principle

NeuroSync AI follows a controlled AI workflow rather than directly exposing the external AI provider to the user.

The system follows:

**Validate → Construct Context → Generate → Validate Output → Classify Errors → Return Safe Response**

This approach improves reliability, maintainability, personalization, and user experience.
