// ═══════════════════════════════
//  SKILLFORGE — Roadmaps (all 10 skills)
// ═══════════════════════════════
const ROADMAPS = {
  // 1 = Python (100s)
  1: {
    beginner:     [ {id:101,name:'Variables & Data Types',res:4}, {id:102,name:'Control Flow — if/else, loops',res:3}, {id:103,name:'Functions & Scope',res:5}, {id:104,name:'Lists, Tuples & Sets',res:4} ],
    intermediate: [ {id:105,name:'Dictionaries & HashMaps',res:4}, {id:106,name:'Object-Oriented Programming',res:5}, {id:107,name:'File Handling & Exceptions',res:4}, {id:108,name:'Modules, Packages & pip',res:3} ],
    advanced:     [ {id:109,name:'Decorators & Generators',res:4}, {id:110,name:'Async / Asyncio',res:4}, {id:111,name:'Design Patterns in Python',res:5}, {id:112,name:'Testing with pytest',res:3} ],
  },
  // 2 = JavaScript (200s)
  2: {
    beginner:     [ {id:201,name:'Variables — let, const, var',res:3}, {id:202,name:'Functions & Arrow Functions',res:4}, {id:203,name:'Arrays & Array Methods',res:5}, {id:204,name:'Objects & Destructuring',res:4} ],
    intermediate: [ {id:205,name:'DOM Manipulation',res:5}, {id:206,name:'Promises & Async/Await',res:5}, {id:207,name:'ES6+ Modern Syntax',res:4}, {id:208,name:'Modules & Import/Export',res:3} ],
    advanced:     [ {id:209,name:'Closures & Scope Chain',res:4}, {id:210,name:'Event Loop & Concurrency',res:4}, {id:211,name:'Design Patterns in JS',res:5}, {id:212,name:'Testing with Jest',res:4} ],
  },
  // 3 = Java (300s)
  3: {
    beginner:     [ {id:301,name:'Java Setup & Hello World',res:4}, {id:302,name:'Variables, Types & Operators',res:4}, {id:303,name:'Control Flow & Loops',res:3}, {id:304,name:'Methods & Scope',res:4} ],
    intermediate: [ {id:305,name:'Object-Oriented Programming',res:5}, {id:306,name:'Collections Framework',res:5}, {id:307,name:'Exception Handling',res:4}, {id:308,name:'Interfaces & Abstract Classes',res:4} ],
    advanced:     [ {id:309,name:'Multithreading & Concurrency',res:5}, {id:310,name:'Java Streams & Lambdas',res:5}, {id:311,name:'Design Patterns in Java',res:4}, {id:312,name:'JUnit Testing',res:3} ],
  },
  // 4 = MERN Stack (400s)
  4: {
    beginner:     [ {id:401,name:'MongoDB Basics & CRUD',res:4}, {id:402,name:'Express.js & REST APIs',res:4}, {id:403,name:'React Fundamentals',res:5}, {id:404,name:'Node.js Core Concepts',res:4} ],
    intermediate: [ {id:405,name:'Authentication — JWT & Sessions',res:5}, {id:406,name:'State Management — Redux',res:5}, {id:407,name:'React Router & Navigation',res:4}, {id:408,name:'Mongoose & Schemas',res:4} ],
    advanced:     [ {id:409,name:'Full-Stack CRUD App',res:5}, {id:410,name:'Deployment — Vercel & Render',res:4}, {id:411,name:'Testing MERN Applications',res:4}, {id:412,name:'WebSockets & Real-time',res:5} ],
  },
  // 5 = DevOps (500s)
  5: {
    beginner:     [ {id:501,name:'Linux Command Line',res:4}, {id:502,name:'Git & GitHub',res:5}, {id:503,name:'Docker Basics',res:4}, {id:504,name:'CI/CD Concepts',res:3} ],
    intermediate: [ {id:505,name:'Docker Compose',res:4}, {id:506,name:'GitHub Actions',res:4}, {id:507,name:'Kubernetes Basics',res:5}, {id:508,name:'Nginx & Reverse Proxy',res:4} ],
    advanced:     [ {id:509,name:'AWS Core Services',res:5}, {id:510,name:'Infrastructure as Code',res:4}, {id:511,name:'Monitoring & Logging',res:4}, {id:512,name:'Security & DevSecOps',res:4} ],
  },
  // 6 = Web Dev (600s)
  6: {
    beginner:     [ {id:601,name:'HTML Structure & Semantics',res:4}, {id:602,name:'CSS Fundamentals',res:4}, {id:603,name:'Flexbox & Grid',res:5}, {id:604,name:'Responsive Design',res:4} ],
    intermediate: [ {id:605,name:'CSS Animations & Transitions',res:4}, {id:606,name:'JavaScript for the Web',res:5}, {id:607,name:'Web Accessibility — WCAG',res:4}, {id:608,name:'CSS Preprocessors — SASS',res:3} ],
    advanced:     [ {id:609,name:'Performance Optimization',res:4}, {id:610,name:'Progressive Web Apps',res:4}, {id:611,name:'Web Components',res:4}, {id:612,name:'SEO & Core Web Vitals',res:4} ],
  },
  // 7 = DSA (700s)
  7: {
    beginner:     [ {id:701,name:'Arrays & String Manipulation',res:5}, {id:702,name:'Linked Lists',res:4}, {id:703,name:'Stacks & Queues',res:4}, {id:704,name:'Big-O Notation',res:4} ],
    intermediate: [ {id:705,name:'Binary Search & Two Pointers',res:5}, {id:706,name:'Sliding Window',res:4}, {id:707,name:'Trees & Binary Search Trees',res:5}, {id:708,name:'Hashing Techniques',res:4} ],
    advanced:     [ {id:709,name:'Graphs — BFS & DFS',res:5}, {id:710,name:'Dynamic Programming',res:6}, {id:711,name:'Greedy Algorithms',res:4}, {id:712,name:'Advanced Trees — Trie, Segment',res:4} ],
  },
  // 8 = Cybersecurity (800s)
  8: {
    beginner:     [ {id:801,name:'Networking Fundamentals',res:4}, {id:802,name:'Linux for Security',res:4}, {id:803,name:'CIA Triad & Security Concepts',res:3}, {id:804,name:'Cryptography Basics',res:4} ],
    intermediate: [ {id:805,name:'Web Application Security',res:5}, {id:806,name:'Penetration Testing Basics',res:5}, {id:807,name:'OWASP Top 10',res:4}, {id:808,name:'Network Scanning — Nmap',res:4} ],
    advanced:     [ {id:809,name:'Metasploit Framework',res:4}, {id:810,name:'CTF Challenges',res:5}, {id:811,name:'Malware Analysis',res:4}, {id:812,name:'SOC & Incident Response',res:4} ],
  },
  // 9 = React (900s — shifted from old DEFAULT to 900)
  9: {
    beginner:     [ {id:901,name:'React Setup & JSX',res:4}, {id:902,name:'Components & Props',res:5}, {id:903,name:'State & Events',res:4}, {id:904,name:'Lists, Keys & Conditionals',res:3} ],
    intermediate: [ {id:905,name:'useEffect & Lifecycle',res:5}, {id:906,name:'React Router v6',res:4}, {id:907,name:'Context API',res:4}, {id:908,name:'Custom Hooks',res:4} ],
    advanced:     [ {id:909,name:'Redux Toolkit',res:5}, {id:910,name:'Performance — useMemo, useCallback',res:4}, {id:911,name:'Testing with React Testing Library',res:4}, {id:912,name:'Next.js Basics',res:5} ],
  },
  // 10 = Node.js (1000s)
  10: {
    beginner:     [ {id:1001,name:'Node.js Setup & Modules',res:4}, {id:1002,name:'File System & Path',res:3}, {id:1003,name:'HTTP & Building a Server',res:4}, {id:1004,name:'npm & package.json',res:3} ],
    intermediate: [ {id:1005,name:'Express.js Framework',res:5}, {id:1006,name:'REST API Design',res:4}, {id:1007,name:'MongoDB with Mongoose',res:5}, {id:1008,name:'Authentication — JWT',res:4} ],
    advanced:     [ {id:1009,name:'Middleware & Error Handling',res:4}, {id:1010,name:'WebSockets with Socket.io',res:4}, {id:1011,name:'API Security & Rate Limiting',res:4}, {id:1012,name:'Deployment & PM2',res:4} ],
  },
};

// Safety fallback — all 10 skills have full roadmaps above
const DEFAULT_RM = {
  beginner:     [ {id:9901,name:'Introduction & Setup',res:3}, {id:9902,name:'Core Syntax & Fundamentals',res:4} ],
  intermediate: [ {id:9903,name:'Intermediate Patterns',res:3}, {id:9904,name:'Building Projects',res:4} ],
  advanced:     [ {id:9905,name:'Performance & Optimization',res:3}, {id:9906,name:'Interview Preparation',res:4} ],
};
