// ═══════════════════════════════
//  SKILLFORGE — Tests (banks + configs)
// ═══════════════════════════════
const TEST_BANKS = {
  python: [
    { q:'Time complexity of Python dictionary key access?', opts:['O(log n)','O(n)','O(1) average','O(n²)'], ans:2, exp:'Hash maps provide O(1) average lookup via direct hash computation.' },
    { q:'What does "self" refer to inside a Python class method?', opts:['The class','The parent class','The current instance','A static variable'], ans:2, exp:'"self" refers to the specific object instance that called the method.' },
    { q:'Output of: print(type([]) == list)?', opts:['False','True','TypeError','None'], ans:1, exp:'type([]) returns <class list>, which equals the list built-in. Result: True.' },
    { q:'Which keyword catches exceptions in Python?', opts:['catch','handle','except','error'], ans:2, exp:'Python uses try/except. Java/JS use try/catch — common confusion.' },
    { q:'What does [x**2 for x in range(5)] produce?', opts:['[1,4,9,16,25]','[0,1,4,9,16]','[0,1,2,3,4]','SyntaxError'], ans:1, exp:'range(5)=0,1,2,3,4. Squaring: 0,1,4,9,16. Starts at 0.' },
    { q:'Which method removes AND returns the last list element?', opts:['.remove()','.delete()','.pop()','.discard()'], ans:2, exp:'.pop() removes and returns the last item.' },
    { q:'What is a Python generator?', opts:['A list factory','A function using yield','A class decorator','A special import'], ans:1, exp:'Generators use yield to produce values lazily, saving memory.' },
  ],
  dsa: [
    { q:'Time complexity of binary search?', opts:['O(n)','O(n log n)','O(log n)','O(1)'], ans:2, exp:'Binary search halves the search space each step. log₂(n) max steps.' },
    { q:'Which data structure uses LIFO order?', opts:['Queue','Stack','Deque','Min-Heap'], ans:1, exp:'Stack = Last In First Out.' },
    { q:'Worst-case time complexity of QuickSort?', opts:['O(n log n)','O(n)','O(n²)','O(log n)'], ans:2, exp:'Worst case O(n²) when pivot always picks smallest/largest.' },
    { q:'Which tree traversal visits Left → Root → Right?', opts:['Pre-order','Post-order','In-order','Level-order'], ans:2, exp:'In-order: Left→Root→Right. Produces sorted output on a BST.' },
    { q:'Space complexity of DFS on a graph with V vertices?', opts:['O(1)','O(V)','O(V²)','O(E)'], ans:1, exp:'DFS call stack depth is at most O(V).' },
    { q:'Shortest path in unweighted graph — which algorithm?', opts:['DFS','BFS','Dijkstra','Bellman-Ford'], ans:1, exp:'BFS explores level by level. First reach = shortest path.' },
    { q:'What is a hash collision?', opts:['Two keys → same bucket','Empty table','Deletion failure','Stack overflow'], ans:0, exp:'Collision: two different keys produce same hash index.' },
  ],
  webdev: [
    { q:'CSS box model from inside to outside?', opts:['margin→border→padding→content','content→padding→border→margin','width→height→border','display→position→float'], ans:1, exp:'Box model: content→padding→border→margin.' },
    { q:'Difference between == and === in JavaScript?', opts:['No difference','=== also checks type','== is faster','=== only for numbers'], ans:1, exp:'== coerces types. === checks value AND type. Always prefer ===.' },
    { q:'What does async/await do in JavaScript?', opts:['Runs in separate thread','Syntactic sugar over Promises','Replaces all callbacks','Blocks main thread'], ans:1, exp:'async/await is cleaner syntax on Promises.' },
    { q:'Which HTTP method is safe AND idempotent?', opts:['POST','PUT','DELETE','GET'], ans:3, exp:'GET is safe (read-only) and idempotent.' },
    { q:'Purpose of <meta name="viewport">?', opts:['Set page title','Control rendering on mobile','Define CSS vars','Load stylesheets'], ans:1, exp:'Controls how browser scales pages on mobile.' },
  ],
};

const TEST_CONFIGS = [
  { id:'python', name:'Python Mastery',   emoji:'🐍', desc:'Variables, OOP, generators, exceptions', count:7 },
  { id:'dsa',    name:'DSA Fundamentals', emoji:'🧩', desc:'Arrays, trees, graphs, complexity',        count:7 },
  { id:'webdev', name:'Web Dev',          emoji:'🌐', desc:'HTML, CSS, JavaScript, HTTP, browser',     count:5 },
];

/* ── CODE TEMPLATES ── */
const CODE_TEMPLATES = {
  python: `# SkillForge — Python Editor
