# 🚀 SkillForge — AI-Powered Skill Learning Platform

SkillForge is a modular web platform designed to help students master tech skills through structured learning roadmaps, coding practice, mock tests, and AI-driven recommendations — all inside a single lightweight web app.

Built using pure HTML, CSS, and JavaScript, SkillForge runs entirely in the browser with no backend required.

---

## ✨ Features

✅ Structured Skill Roadmaps  
Follow Beginner → Intermediate → Advanced paths across multiple technologies.

✅ Built-in Code Editor  
Practice coding directly in the browser across multiple languages.

✅ Practice Problems  
Solve curated interview-style problems with solutions and XP rewards.

✅ Mock Tests  
Timed quizzes with instant scoring and feedback.

✅ Health Tracker  
Track habits like sleep, water, and exercise to improve learning performance.

✅ AI Recommendations  
Rule-based engine that suggests what to learn next based on progress.

## Folder Structure

```
skillforge/
│
├── pages/                      ← HTML pages (open these in browser)
│   ├── index.html              ← Landing page (start here)
│   ├── auth.html               ← Login / Sign Up
│   └── app.html                ← Full platform (loads all JS + CSS)
│
├── css/                        ← Stylesheets
│   ├── styles.css              ← Global design system (tokens, fonts, base)
│   └── app.css                 ← App shell + all module styles
│
└── js/
    ├── data/                   ← Pure data — no UI logic
    │   ├── storage.js          ← localStorage helper (LS.get / LS.set)
    │   ├── skills.js           ← 10 skills list (name, emoji, color)
    │   ├── roadmaps.js         ← All 10 roadmaps (topics per skill) + DEFAULT_RM
    │   ├── resources.js        ← Learning resources for every topic (700+ links)
    │   ├── problems.js         ← 10 coding problems (desc, examples, solutions)
    │   ├── tests.js            ← TEST_BANKS + TEST_CONFIGS (3 quiz sets)
    │   ├── templates.js        ← Starter code templates (Python/JS/Java/HTML/SQL)
    │   ├── badges.js           ← 9 achievement badges
    │   └── helpers.js          ← calcHealthScore, getHealthInsights,
    │                              simulateRun, getRecommendations
    │
    └── modules/                ← UI modules — one file per page/feature
        ├── core.js             ← Init, user state, sidebar, router, XP, streak, BOOT
        ├── dashboard.js        ← Dashboard page (KPIs, actions, badges)
        ├── roadmap.js          ← Skill roadmaps + topic detail + resources
        ├── editor.js           ← Code editor (5 languages, run simulation)
        ├── problems.js         ← Practice problems (list, solution, submit)
        ├── tests.js            ← Mock tests (quiz, timer, score, result)
        ├── health.js           ← Health tracker (log, score, history)
        └── ai.js               ← AI recommendations (rule-based engine)
```

`index.html` → `auth.html` → `app.html`
