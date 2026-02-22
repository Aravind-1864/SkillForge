// ═══════════════════════════════
//  SKILLFORGE — Helper Functions
// ═══════════════════════════════
function calcHealthScore({ sleep, water, meals, exercise }) {
  let s = 0;
  if (sleep >= 7 && sleep <= 9) s += 30; else if (sleep >= 6) s += 15;
  if (water >= 2000) s += 25; else if (water >= 1500) s += 15;
  if (meals >= 3) s += 20; else if (meals >= 2) s += 10;
  if (exercise >= 30) s += 25; else if (exercise >= 15) s += 12;
  return Math.min(s, 100);
}

function getHealthInsights({ sleep, water, meals, exercise }) {
  const ins = [];
  if (sleep < 6) ins.push({ t:'bad',  m:'⚠ Critical: <6h sleep severely impairs memory consolidation.' });
  else if (sleep < 7) ins.push({ t:'warn', m:'⚡ Sleep slightly low. Aim for 7–8h for best learning.' });
  else ins.push({ t:'good', m:'✓ Great sleep! Brain consolidates learning during deep sleep.' });
  if (water < 1500) ins.push({ t:'bad',  m:'💧 Very low hydration. Even 2% dehydration drops focus 10–15%.' });
  else if (water < 2000) ins.push({ t:'warn', m:'💧 Hydration below ideal. Try to reach 2000 ml.' });
  else ins.push({ t:'good', m:'✓ Well hydrated! Proper hydration improves working memory.' });
  if (exercise < 15) ins.push({ t:'warn', m:'🏃 20 min exercise releases BDNF — directly improves learning.' });
  else ins.push({ t:'good', m:'✓ Exercise done! Physical activity strengthens long-term memory.' });
  return ins;
}

function simulateRun(code, lang) {
  if (lang === 'html') return { type: 'html', content: code };
  if (lang === 'sql')  return { type: 'text', content: '-- SQL simulation\n\nid | name   | xp | streak\n---|--------|----|---------\n 1 | You    |  0 |   0\n\n-- Connect a real DB for live queries.' };
  const out = [];
  code.split('\n').forEach(line => {
    const re = lang === 'javascript' ? /^\s*console\.log\((.+)\)\s*$/
             : lang === 'java'       ? /^\s*System\.out\.println\((.+)\)\s*$/
             :                         /^\s*print\((.+)\)\s*$/;
    const m = line.match(re);
    if (m) {
      let v = m[1].replace(/f["'](.+?)["']/g, (_, s) => s.replace(/\{[^}]+\}/g, '…'))
                  .replace(/["'`]/g, '').replace(/\$\{[^}]+\}/g, '…').substring(0, 80);
      out.push(v);
    }
  });
  if (!out.length) return { type:'text', content:'✓ Code executed.\n\n(Add print() / console.log() to see output)\n\n💡 Production: Judge0 API runs real code.\n   judge0-ce.p.rapidapi.com  language_id: Python=71, JS=63, Java=62' };
  return { type:'text', content:'Output\n──────────────────────\n' + out.map(l => '  ' + l).join('\n') + '\n──────────────────────\n\n💡 Simulated. Judge0 API used in production.' };
}

function getRecommendations(user) {
  const recs = [];
  const solved = user.solvedProblems?.length || 0;
  const topics = user.completedTopics?.length || 0;
  const streak = user.streak || 0;
  const tests  = user.testsTaken || 0;
  const scores = user.testScores || [];
  const avg    = scores.length ? Math.round(scores.reduce((a, s) => a + s.pct, 0) / scores.length) : 0;

  if (solved === 0) recs.push({ ac:'#ea580c', icon:'🎯', label:'Get Started', type:'problems', title:'Solve your first coding problem', desc:"You haven't solved any problems yet. Start with Two Sum — a classic that every developer knows.", page:'problems' });
  if (topics === 0) recs.push({ ac:'#2563eb', icon:'🗺️', label:'Begin Learning', type:'roadmap', title:'Pick a skill roadmap and start', desc:'Choose Python or DSA and begin your structured learning journey from beginner to advanced.', page:'roadmap' });
  if (tests  === 0) recs.push({ ac:'#7c3aed', icon:'📝', label:'Test Yourself', type:'tests', title:'Take your first mock test', desc:'Mock tests reveal your gaps. Try Python Basics — 7 questions, takes 5 minutes.', page:'tests' });
  if (streak < 3)   recs.push({ ac:'#d97706', icon:'🔥', label:'Build Habit',   type:'streak', title:'Log in daily to build your streak', desc:'Consistency beats intensity. Even 20 minutes a day compounds massively over months.', page:'dashboard' });
  if (streak >= 7)  recs.push({ ac:'#059669', icon:'🏆', label:'Milestone!',    type:'challenge', title:`${streak}-day streak — try a Hard problem!`, desc:'Your consistency is excellent. Challenge yourself with Word Break or LRU Cache.', page:'problems' });
  if (scores.length > 0 && avg < 60) recs.push({ ac:'#dc2626', icon:'📊', label:'Improve',type:'improve',title:'Focus on Easy problems to build foundation',desc:`Test average is ${avg}%. Master Easy problems first — they cover 60% of interview questions.`,page:'problems' });
  if (!recs.length) recs.push({ ac:'#0d9488', icon:'✨', label:'On Track', type:'general', title:'Great momentum — keep pushing!', desc:"You're building real skills. Try a new skill or attempt a harder problem category.", page:'problems' });
  return recs;
}
