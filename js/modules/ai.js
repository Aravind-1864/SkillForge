// ═══════════════════════════════
//  SKILLFORGE — AI Module
// ═══════════════════════════════
/* ════════════════════════
   AI
════════════════════════ */
function ai() {
  const recs    = getRecommendations(user);
  const solved  = (user.solvedProblems||[]).length;
  const topics  = (user.completedTopics||[]).length;
  const streak  = user.streak || 0;
  const scores  = user.testScores || [];
  const avg     = scores.length ? Math.round(scores.reduce((a,s)=>a+s.pct,0)/scores.length) : 0;

  contentEl.innerHTML = `
  <div class="page-head fu">
    <div>
      <div class="page-title">AI <em>Recommendations</em></div>
      <div class="page-sub">Personalised suggestions based on your real progress, performance and health data.</div>
    </div>
    <span style="display:inline-flex;align-items:center;gap:5px;background:rgba(13,148,136,.08);border:1px solid rgba(13,148,136,.2);border-radius:6px;padding:4px 12px;font-family:var(--ff-m);font-size:10px;color:var(--teal)">🤖 AI Engine Active</span>
  </div>
  <div class="ai-shell fu d1">
    <div>
      ${recs.map(r => `
        <div class="ai-rec">
          <div class="ai-rec-bar" style="background:${r.ac}"></div>
          <div class="ai-rec-tag"><span style="font-size:15px">${r.icon}</span>${r.label}<span class="tag" style="margin-left:auto;background:${r.ac}18;color:${r.ac}">${r.type}</span></div>
          <div class="ai-rec-title">${r.title}</div>
          <div class="ai-rec-desc">${r.desc}</div>
          <button class="btn btn-sm" onclick="go('${r.page}')">${r.type==='problems'?'Go to Problems':r.type==='roadmap'?'Open Roadmaps':r.type==='tests'?'Take a Test':'Get Started'} →</button>
        </div>`).join('')}
    </div>
    <div>
      <div class="card" style="margin-bottom:14px">
        <div class="sec-title" style="margin-bottom:14px">Your Profile</div>
        ${[
          {l:'Problems Solved',v:solved,tot:10,c:'var(--purple)',pct:Math.min(solved/10*100,100)},
          {l:'Topics Done',v:topics,tot:30,c:'var(--teal)',pct:Math.min(topics/30*100,100)},
          {l:'Day Streak',v:streak,tot:30,c:'var(--orange)',pct:Math.min(streak/30*100,100)},
          {l:'Test Avg',v:`${avg}%`,tot:null,c:avg>=80?'var(--easy)':avg>=60?'var(--medium)':'var(--red)',pct:avg},
        ].map(s => `
          <div class="profile-row">
            <div class="profile-lbl">
              <span style="color:var(--ink2)">${s.l}</span>
              <span style="font-family:var(--ff-m);color:${s.c};font-weight:600">${s.v}${s.tot?` / ${s.tot}`:''}</span>
            </div>
            <div class="prog-track" style="height:4px"><div class="prog-bar" style="width:${s.pct}%;background:${s.c}"></div></div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="sec-title" style="margin-bottom:10px">How AI Works</div>
        ${[
          {icon:'📊',t:'Collect',d:'Tracks XP, problems, topics, tests, health'},
          {icon:'⚙️',t:'Rule Engine',d:'Conditions: no problems → suggest first; low test score → easier material'},
          {icon:'🤖',t:'ML (Phase 3)',d:'KNN on user feature vectors → recommend what others like you learned next'},
        ].map((h,i) => `
          <div style="display:flex;gap:9px;padding:10px 0;border-bottom:${i<2?'1px solid var(--line)':'none'}">
            <span style="font-size:18px">${h.icon}</span>
            <div><div style="font-size:12px;font-weight:600;margin-bottom:2px">${h.t}</div><div style="font-size:11px;color:var(--ink3);line-height:1.5">${h.d}</div></div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

