# AI React Component Generator

An AI-powered React application that dynamically generates React UI components from natural language prompts using the Google Gemini API. The application processes user input, generates JSX code through Gemini, sanitizes the response, and renders the generated component in real time.

## Live Demo

* **Application:** https://component-rendering-pick4xk8j-prem-sagars-projects-9fba3752.vercel.app/

---

## Overview

This project leverages Large Language Models (LLMs) to automate frontend component generation. Users provide a textual description of a UI, and the system converts that description into executable React component code.

The generated code is processed, validated, and rendered dynamically within the application, enabling rapid UI prototyping and experimentation.

---

## Architecture

```text

User Prompt
     │
     ▼
React Frontend
     │
     ▼
Google Gemini API
     │
     ▼
Generated JSX Response
     │
     ▼
Code Sanitization Layer
     │
     ▼
Dynamic Component Rendering
```

---

## Features

* Natural language to React component generation
* Google Gemini API integration
* Dynamic JSX rendering
* Code sanitization and processing
* Error handling for invalid AI responses
* Loading state management
* Responsive user interface
* Modern React Hooks implementation

---

## Tech Stack

### Frontend

* React 19
* Vite
* JavaScript (ES6+)
* CSS3

### AI Integration

* Google Gemini API
* Prompt Engineering

### Development Tools

* Git
* GitHub
* npm

---

## Project Structure

```bash
src/
│
├── components/
│   ├── GeneratedComponent/
│   ├── PromptInput/
│   └── Preview/
│
├── helper/
│   ├── generateContent.js
│   └── purifyCode.js
│
├── assets/
│
├── App.jsx
├── main.jsx
└── App.css
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

### Start Development Server

```bash
npm run dev
```


## Environment Variables

| Variable            | Description           |
| ------------------- | --------------------- |
| VITE_GOOGLE_API_KEY | Google Gemini API Key |

---

## API Workflow

1. User submits a UI description.
2. Application constructs a prompt.
3. Prompt is sent to Gemini API.
4. Gemini returns React JSX code.
5. Generated code is sanitized.
6. Component is rendered dynamically.
7. Errors are captured and displayed to the user.

---

## Example Prompt

```text
Create a modern dashboard with:
- Sidebar navigation
- Statistics cards
- User activity table
- Responsive design
```

---

## Challenges Solved

* Dynamic rendering of AI-generated React code
* Parsing and sanitizing Gemini responses
* Preventing invalid JSX execution
* Managing asynchronous API requests
* Handling API failures and malformed outputs

