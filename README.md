# SkillForge — File Structure

## How to Run
Open `pages/index.html` in your browser. No server needed.

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

## Script Load Order (in app.html)
1. `data/storage.js` — must be first (LS used everywhere)
2. `data/skills.js`
3. `data/roadmaps.js`
4. `data/resources.js`
5. `data/problems.js`
6. `data/tests.js`
7. `data/templates.js`
8. `data/badges.js`
9. `data/helpers.js`
10. `modules/dashboard.js`
11. `modules/roadmap.js`
12. `modules/editor.js`
13. `modules/problems.js`
14. `modules/tests.js`
15. `modules/health.js`
16. `modules/ai.js`
17. `modules/core.js` — must be LAST (calls renderSidebar + go('dashboard'))

## User Flow
`index.html` → `auth.html` → `app.html`
