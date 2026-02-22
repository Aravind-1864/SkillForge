// ═══════════════════════════════
//  SKILLFORGE — Problems (10 coding problems)
// ═══════════════════════════════
const PROBLEMS = [
  { id:1,  title:'Two Sum',                  diff:'easy',   tags:['arrays','hashmap'],
    desc:'Given an array of integers and a target, return indices of the two numbers that add up to target.',
    examples:[{input:'nums=[2,7,11,15], target=9',out:'[0,1]',why:'2+7=9'}],
    solution:`def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2,7,11,15], 9))  # [0, 1]\nprint(two_sum([3,2,4], 6))      # [1, 2]`,
    explain:'HashMap stores number→index. Check if (target−num) exists each step. Single O(n) pass.',time:'O(n)',space:'O(n)' },

  { id:2,  title:'Valid Parentheses',        diff:'easy',   tags:['stack','string'],
    desc:"Given a string with brackets, determine if it's valid (correctly opened and closed in order).",
    examples:[{input:'s="()"',out:'True'},{input:'s="(]"',out:'False'}],
    solution:`def is_valid(s):\n    stack = []\n    pairs = {')':'(', '}':'{', ']':'['}\n    for ch in s:\n        if ch in pairs:\n            top = stack.pop() if stack else '#'\n            if pairs[ch] != top: return False\n        else:\n            stack.append(ch)\n    return not stack\n\nprint(is_valid("()[]{}"))  # True\nprint(is_valid("([)]"))    # False`,
    explain:'Push opening brackets. For each closing, pop and verify match. Empty stack = valid.',time:'O(n)',space:'O(n)' },

  { id:3,  title:'Longest Substring No Repeat',diff:'medium',tags:['sliding window','hashmap'],
    desc:'Find the length of the longest substring without repeating characters.',
    examples:[{input:'s="abcabcbb"',out:'3',why:'"abc" has length 3'}],
    solution:`def length_of_longest(s):\n    char_map = {}\n    left = max_len = 0\n    for right, ch in enumerate(s):\n        if ch in char_map and char_map[ch] >= left:\n            left = char_map[ch] + 1\n        char_map[ch] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len\n\nprint(length_of_longest("abcabcbb"))  # 3`,
    explain:'Sliding window. Expand right, shrink left when duplicate found. Track max window.',time:'O(n)',space:'O(n)' },

  { id:4,  title:'Maximum Subarray',         diff:'medium', tags:['dp','arrays'],
    desc:"Find the subarray with the largest sum. (Kadane's Algorithm)",
    examples:[{input:'nums=[-2,1,-3,4,-1,2,1,-5,4]',out:'6',why:'[4,-1,2,1]=6'}],
    solution:`def max_subarray(nums):\n    max_sum = current = nums[0]\n    for num in nums[1:]:\n        current = max(num, current + num)\n        max_sum = max(max_sum, current)\n    return max_sum\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6`,
    explain:"Kadane's: at each step extend current subarray or start fresh. O(n) time O(1) space.",time:'O(n)',space:'O(1)' },

  { id:5,  title:'Climbing Stairs',          diff:'easy',   tags:['dp','fibonacci'],
    desc:'You can climb 1 or 2 steps. How many distinct ways to reach the top of n stairs?',
    examples:[{input:'n=3',out:'3',why:'1+1+1, 1+2, 2+1'}],
    solution:`def climb_stairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n+1):\n        a, b = b, a+b\n    return b\n\nfor i in range(1, 8):\n    print(f"n={i}: {climb_stairs(i)} ways")`,
    explain:'Fibonacci pattern. Ways(n)=Ways(n-1)+Ways(n-2). Two rolling vars.',time:'O(n)',space:'O(1)' },

  { id:6,  title:'Binary Search',            diff:'easy',   tags:['binary search'],
    desc:'Given a sorted array and a target, return its index. Return -1 if not found. Must be O(log n).',
    examples:[{input:'nums=[-1,0,3,5,9,12], target=9',out:'4'}],
    solution:`def search(nums, target):\n    left, right = 0, len(nums)-1\n    while left <= right:\n        mid = (left+right)//2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid+1\n        else: right = mid-1\n    return -1\n\nprint(search([-1,0,3,5,9,12], 9))  # 4`,
    explain:'Halve search space each step by comparing midpoint to target.',time:'O(log n)',space:'O(1)' },

  { id:7,  title:'Reverse Linked List',      diff:'easy',   tags:['linked list'],
    desc:'Reverse a singly linked list and return the reversed head.',
    examples:[{input:'[1,2,3,4,5]',out:'[5,4,3,2,1]'}],
    solution:`def reverse_list(head):\n    prev = None\n    while head:\n        nxt = head.next\n        head.next = prev\n        prev = head\n        head = nxt\n    return prev\n\n# Demo\nprint([1,2,3,4,5][::-1])  # [5,4,3,2,1]`,
    explain:'Three pointers: prev, curr, next. Reverse direction each step.',time:'O(n)',space:'O(1)' },

  { id:8,  title:'Number of Islands',        diff:'medium', tags:['graphs','dfs'],
    desc:"Count islands in an m×n grid of '1's (land) and '0's (water) using DFS.",
    examples:[{input:'3×4 grid, 2 land groups',out:'2'}],
    solution:`def num_islands(grid):\n    if not grid: return 0\n    count = 0\n    def dfs(r, c):\n        if r<0 or r>=len(grid) or c<0 or c>=len(grid[0]): return\n        if grid[r][c] != '1': return\n        grid[r][c] = '0'\n        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]: dfs(r+dr, c+dc)\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c]=='1': dfs(r,c); count+=1\n    return count`,
    explain:'DFS flood-fill from each unvisited land. Mark visited as 0.',time:'O(m×n)',space:'O(m×n)' },

  { id:9,  title:'Word Break',               diff:'hard',   tags:['dp','string'],
    desc:'Return true if string s can be fully segmented into words from wordDict.',
    examples:[{input:'s="leetcode", dict=["leet","code"]',out:'True'}],
    solution:`def word_break(s, wordDict):\n    word_set = set(wordDict)\n    dp = [False]*(len(s)+1)\n    dp[0] = True\n    for i in range(1, len(s)+1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True; break\n    return dp[len(s)]\n\nprint(word_break("leetcode",["leet","code"]))  # True`,
    explain:'DP: dp[i]=can first i chars be broken. Try all splits.',time:'O(n²)',space:'O(n)' },

  { id:10, title:'LRU Cache',                diff:'hard',   tags:['design','hashmap'],
    desc:'Design an LRU Cache with O(1) get() and put() operations.',
    examples:[{input:'capacity=2, put(1,1), put(2,2), get(1)=1, put(3,3), get(2)=-1',out:'Correct'}],
    solution:`from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n\nlru = LRUCache(2)\nlru.put(1,1); lru.put(2,2)\nprint(lru.get(1))  # 1`,
    explain:'OrderedDict maintains order. move_to_end=recently used. popitem(last=False)=evict oldest.',time:'O(1)',space:'O(n)' },
];

/* ── TEST BANKS ── */
