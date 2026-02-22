// ═══════════════════════════════
//  SKILLFORGE — Health Module
// ═══════════════════════════════
/* ════════════════════════
   HEALTH
════════════════════════ */
let hForm = { sleep:7, water:1500, meals:3, exercise:20, mood:'good', notes:'' };
let hSaved = false;

function health() {
  const logs  = user.healthLogs || [];
  const score = calcHealthScore(hForm);
  const sc    = score >= 75 ? 'var(--easy)' : score >= 50 ? 'var(--medium)' : 'var(--red)';
  const ins   = getHealthInsights(hForm);
  const today = new Date().toISOString().split('T')[0];
  const MOODS = [{v:'great',e:'😄'},{v:'good',e:'😊'},{v:'okay',e:'😐'},{v:'tired',e:'😴'},{v:'stressed',e:'😩'}];
  const mini  = [
    { l:'Sleep',    v:`${hForm.sleep}h`,    pct:Math.min(hForm.sleep/9*100,100),          c:'#2563eb' },
    { l:'Water',    v:`${hForm.water}ml`,   pct:Math.min(hForm.water/2500*100,100),        c:'#0d9488' },
    { l:'Meals',    v:`${hForm.meals}`,     pct:hForm.meals/3*100,                         c:'#ea580c' },
    { l:'Exercise', v:`${hForm.exercise}m`, pct:Math.min(hForm.exercise/60*100,100),       c:'#7c3aed' },
  ];
  const FIELDS = [
    {k:'sleep',l:'Sleep',u:'hrs',min:0,max:12,s:.5},{k:'water',l:'Water',u:'ml',min:0,max:4000,s:250},
    {k:'meals',l:'Meals',u:'meals',min:0,max:6,s:1},{k:'exercise',l:'Exercise',u:'min',min:0,max:120,s:5},
  ];

  contentEl.innerHTML = `
  <div class="page-head fu">
    <div>
      <div class="page-title">Health <em>Tracker</em></div>
      <div class="page-sub">Physical health directly impacts learning. Sleep and hydration improve memory retention.</div>
    </div>
  </div>
  <div class="mini-bars fu d1">
    ${mini.map(m => `
      <div class="mini-col">
        <div class="mini-lbl">${m.l}</div>
        <div class="mini-track"><div class="mini-fill" style="height:${m.pct}%;background:${m.c}"></div></div>
        <div class="mini-val" style="color:${m.c}">${m.v}</div>
      </div>`).join('')}
  </div>
  <div class="health-2 fu d2">
    <div class="card">
      <div class="sec-row"><div class="sec-title">Log Today — ${today}</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        ${FIELDS.map(f => `
          <div>
            <label class="hi-lbl">${f.l}</label>
            <div class="hi-row">
              <button class="hi-step" onclick="hStep('${f.k}',-${f.s},${f.min},${f.max})">−</button>
              <input class="hi-num" type="number" value="${hForm[f.k]}" min="${f.min}" max="${f.max}" step="${f.s}" oninput="hForm['${f.k}']=parseFloat(this.value)||0;hRefresh()"/>
              <button class="hi-step" onclick="hStep('${f.k}',${f.s},${f.min},${f.max})">+</button>
              <span class="hi-unit">${f.u}</span>
            </div>
          </div>`).join('')}
      </div>
      <label class="hi-lbl">Mood</label>
      <div class="mood-row">
        ${MOODS.map(m => `<button class="mood-btn ${hForm.mood===m.v?'sel':''}" onclick="hForm.mood='${m.v}';health()">${m.e} ${m.v}</button>`).join('')}
      </div>
      <div style="margin-bottom:14px">
        <label class="hi-lbl">Notes (optional)</label>
        <textarea style="width:100%;padding:9px 12px;background:var(--bg3);border:1.5px solid var(--line);border-radius:var(--r);color:var(--ink);font-size:13px;outline:none;resize:none;height:50px;line-height:1.5;font-family:var(--ff-b)" placeholder="How are you feeling?" oninput="hForm.notes=this.value">${hForm.notes}</textarea>
      </div>
      ${hSaved ? `<div class="ok-box">✓ Health log saved for today! +5 XP earned.</div>` :
        `<button class="btn btn-ink" style="width:100%;justify-content:center;padding:12px" onclick="hSave()">Save Today's Log</button>`}
    </div>
    <div>
      <div class="card" style="text-align:center;margin-bottom:14px">
        <div style="font-family:var(--ff-d);font-size:56px;line-height:1;color:${sc}">${score}</div>
        <div style="font-family:var(--ff-m);font-size:11px;color:var(--ink3);text-transform:uppercase;letter-spacing:1.5px">Health Score / 100</div>
        ${logs.length > 0 ? `<div style="margin-top:8px;font-family:var(--ff-m);font-size:11px;color:var(--ink3)">7-day avg: <strong style="color:var(--ink)">${Math.round(logs.slice(0,7).reduce((a,l)=>a+l.score,0)/Math.min(logs.length,7))}</strong></div>` : ''}
      </div>
      <div>
        ${ins.map(i => `<div class="insight ins-${i.t}">${i.m}</div>`).join('')}
      </div>
    </div>
  </div>
  <div class="fu d3">
    <div class="sec-row">
      <div class="sec-title">Recent Logs</div>
      ${logs.length > 0 ? `<span class="tag tag-teal">${logs.length} entries</span>` : ''}
    </div>
    ${logs.length === 0 ? `
      <div class="empty">
        <div class="empty-icon">📋</div>
        <div class="empty-title">No logs yet</div>
        <div class="empty-sub">Save today's log above to start your health history.</div>
      </div>` :
      logs.slice(0,7).map(l => {
        const MOODS2 = [{v:'great',e:'😄'},{v:'good',e:'😊'},{v:'okay',e:'😐'},{v:'tired',e:'😴'},{v:'stressed',e:'😩'}];
        return `
        <div class="hlog-row">
          <span class="hlog-date">${l.date}</span>
          <div class="hlog-stats">
            <span>💤 <strong>${l.sleep}h</strong></span>
            <span>💧 <strong>${l.water}ml</strong></span>
            <span>🍽 <strong>${l.meals}</strong></span>
            <span>🏃 <strong>${l.exercise}m</strong></span>
            <span>${MOODS2.find(m=>m.v===l.mood)?.e||'😊'}</span>
          </div>
          <span style="font-family:var(--ff-m);font-size:12px;font-weight:700;color:${l.score>=75?'var(--easy)':l.score>=50?'var(--medium)':'var(--red)'}">${l.score}/100</span>
        </div>`;
      }).join('')}
  </div>`;
}

function hStep(k, delta, min, max) {
  hForm[k] = Math.min(max, Math.max(min, hForm[k] + delta));
  health();
}

function hRefresh() {
  const score = calcHealthScore(hForm);
  const sc    = score >= 75 ? 'var(--easy)' : score >= 50 ? 'var(--medium)' : 'var(--red)';
  // Update mini bars & score without full re-render
  health();
}

function hSave() {
  const today = new Date().toISOString().split('T')[0];
  const score = calcHealthScore(hForm);
  const hl    = [ { ...hForm, score, date:today }, ...(user.healthLogs||[]).filter(l=>l.date!==today) ].slice(0,60);
  const badges = [...(user.badges||[])];
  if (hl.length >= 7 && !badges.includes('health_7')) badges.push('health_7');
  patch({ healthLogs: hl, badges });
  addXP(5);
  hSaved = true;
  setTimeout(() => { hSaved = false; }, 3000);
  health();
}

