// ═══════════════════════════════
//  SKILLFORGE — Dashboard Module
// ═══════════════════════════════
/* ════════════════════════
   DASHBOARD
════════════════════════ */
function dashboard() {
  checkStreak();
  const xp     = user.xp || 0;
  const streak = user.streak || 0;
  const topics = (user.completedTopics || []).length;
  const solved = (user.solvedProblems  || []).length;
  const tests  = user.testsTaken || 0;
  const scores = user.testScores || [];
  const avg    = scores.length ? Math.round(scores.reduce((a, s) => a + s.pct, 0) / scores.length) : 0;

  const kpis = [
    { l:'Day Streak',     v:streak, c:'#ea580c', s: streak === 0 ? 'Log in daily to build' : 'Keep going!' },
    { l:'Total XP',       v:xp,     c:'#0d9488', s: xp     === 0 ? 'Earn XP by learning'    : user.level     },
    { l:'Topics Done',    v:topics, c:'#2563eb', s: topics  === 0 ? 'Start a roadmap'        : 'Great progress!'},
    { l:'Problems Solved',v:solved, c:'#7c3aed', s: solved  === 0 ? 'Try your first problem' : 'Keep solving!'  },
  ];

  const badges = ALL_BADGES.map(b => ({ ...b, earned: (user.badges || []).includes(b.id) }));

  const actions = [
    { icon:'🗺️', name:'Browse Skill Roadmaps', desc:'10 structured learning paths', page:'roadmap', c:'#2563eb' },
    { icon:'🧩', name:'Solve a Problem',        desc:'10 problems from easy to hard', page:'problems',c:'#0d9488' },
    { icon:'📝', name:'Take a Mock Test',       desc:'Python, DSA, or Web Dev',       page:'tests',   c:'#7c3aed' },
    { icon:'❤️', name:"Log Today's Health",    desc:'Track sleep, water & exercise',  page:'health',  c:'#db2777' },
  ];

  contentEl.innerHTML = `
  <div class="page-head fu">
    <div>
      <div class="page-title">Good day, <em>${user.name.split(' ')[0]}</em> 👋</div>
      <div class="page-sub">${streak === 0 ? 'Start your learning journey. Everything begins at zero.' : `${streak}-day streak. Keep the momentum going.`}</div>
    </div>
    <button class="btn btn-ink" onclick="go('roadmap')">Start Learning →</button>
  </div>

  <div class="kpi-grid fu d1">
    ${kpis.map(k => `
      <div class="kpi">
        <div class="kpi-bar" style="background:${k.c}"></div>
        <div class="kpi-lbl">${k.l}</div>
        <div class="kpi-val" style="color:${k.c}">${k.v}</div>
        <div class="kpi-sub">${k.s}</div>
      </div>`).join('')}
  </div>

  <div class="dash-2 fu d2">
    <div class="card">
      <div class="sec-title">Quick Actions</div>
      ${actions.map(a => `
        <div class="action-item" onclick="go('${a.page}')"
          onmouseover="this.style.borderColor='${a.c}'" onmouseout="this.style.borderColor='var(--line)'">
          <span class="action-icon">${a.icon}</span>
          <div><div class="action-name">${a.name}</div><div class="action-desc">${a.desc}</div></div>
          <span style="margin-left:auto;color:var(--ink3);font-size:12px">→</span>
        </div>`).join('')}
    </div>
    <div class="card">
      <div class="sec-row">
        <div class="sec-title">Test Performance</div>
        ${tests > 0 ? `<span class="tag tag-teal">${tests} taken</span>` : ''}
      </div>
      ${tests === 0 ? `
        <div class="empty" style="padding:22px 0">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No tests yet</div>
          <div class="empty-sub">Take a mock test to see performance analytics here.</div>
          <button class="btn btn-teal" onclick="go('tests')">Take First Test →</button>
        </div>` : `
        <div style="font-family:var(--ff-d);font-size:42px;line-height:1;color:${avg>=80?'var(--easy)':avg>=60?'var(--medium)':'var(--red)'};margin-bottom:4px">${avg}%</div>
        <div style="font-size:13px;color:var(--ink3);margin-bottom:14px">Average across ${tests} test${tests>1?'s':''}</div>
        ${scores.slice(-4).reverse().map(s => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span style="font-family:var(--ff-m);font-size:10px;color:var(--ink3);width:55px;flex-shrink:0">${s.skill}</span>
            <div class="prog-track" style="flex:1;height:5px"><div class="prog-bar" style="width:${s.pct}%;background:${s.pct>=80?'var(--easy)':s.pct>=60?'var(--medium)':'var(--red)'}"></div></div>
            <span style="font-family:var(--ff-m);font-size:11px;color:var(--ink3);width:30px;text-align:right">${s.pct}%</span>
          </div>`).join('')}`}
    </div>
  </div>

  <div class="fu d3">
    <div class="sec-row">
      <div class="sec-title">Achievements</div>
      <span style="font-size:12px;color:var(--ink3)">${(user.badges||[]).length} / ${ALL_BADGES.length} earned</span>
    </div>
    <div class="badge-grid">
      ${badges.map(b => `
        <div class="badge-item ${b.earned ? 'earned' : ''}">
          <span class="badge-emoji" style="filter:${b.earned ? 'none' : 'grayscale(1) opacity(.3)'}">${b.emoji}</span>
          <div class="badge-name" style="color:${b.earned ? 'var(--ink)' : 'var(--ink3)'}">${b.name}</div>
          <div class="badge-desc">${b.earned ? '✓ Earned!' : b.desc}</div>
        </div>`).join('')}
    </div>
  </div>`;
}
