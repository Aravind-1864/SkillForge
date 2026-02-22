// ═══════════════════════════════
//  SKILLFORGE — Code Templates (5 languages)
// ═══════════════════════════════
const CODE_TEMPLATES = {
  python: `# SkillForge — Python Editor
def fibonacci(n):
    a, b, result = 0, 1, []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

seq = fibonacci(10)
print("Fibonacci:", seq)
print("10th term:", seq[-1])

squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,

  javascript: `// SkillForge — JavaScript Editor
const fibonacci = (n) => {
  const seq = [0, 1]
  for (let i = 2; i < n; i++)
    seq.push(seq[i-1] + seq[i-2])
  return seq.slice(0, n)
}

console.log("Fibonacci:", fibonacci(10))
const nums = [3,1,4,1,5,9,2,6]
console.log("Sorted:", [...nums].sort((a,b)=>a-b))
console.log("Sum:", nums.reduce((a,n)=>a+n,0))`,

  java: `// SkillForge — Java Editor
import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println("SkillForge Java Editor");
        int[] nums = {2, 7, 11, 15};
        System.out.println("Array: " + Arrays.toString(nums));
        List<String> skills = Arrays.asList("Python","Java","DSA","React");
        skills.stream()
              .filter(s -> s.length() > 3)
              .forEach(s -> System.out.println("Skill: " + s));
    }
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family:sans-serif; background:#f0f4f8; display:flex;
           align-items:center; justify-content:center; min-height:100vh; margin:0; }
    .card { background:#fff; border-radius:16px; padding:36px;
            text-align:center; box-shadow:0 4px 20px rgba(0,0,0,.1); }
    h1 { color:#0d9488; margin-bottom:10px; }
    p  { color:#666; margin-bottom:22px; }
    button { background:#0d9488; color:#fff; border:none;
             padding:12px 28px; border-radius:10px; font-size:15px; cursor:pointer; }
    #count { font-size:52px; font-weight:700; color:#0d9488; margin:14px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Live HTML Preview ⚡</h1>
    <p>Edit this code — preview updates instantly!</p>
    <div id="count">0</div>
    <button onclick="document.getElementById('count').textContent++">Click +1</button>
  </div>
</body>
</html>`,

  sql: `-- SkillForge — SQL Editor
-- Practice SQL queries here

SELECT * FROM users;

SELECT name, xp
FROM users
ORDER BY xp DESC;

SELECT
  COUNT(*) as total_users,
  AVG(xp) as avg_xp,
  MAX(streak) as top_streak
FROM users;`,
};
