// ═══════════════════════════════
//  SKILLFORGE — Roadmap Module
// ═══════════════════════════════
/* ════════════════════════
   ROADMAP
════════════════════════ */
let rmSel = null, rmOpen = null;

function roadmap() {
  if (rmSel) { rmDetail(); return; }
  const done = new Set(user.completedTopics || []);
  const PHASES = [
    { key:'beginner',     label:'Beginner',     bg:'rgba(13,148,136,.08)',  c:'#0d9488', border:'rgba(13,148,136,.2)' },
    { key:'intermediate', label:'Intermediate', bg:'rgba(217,119,6,.08)',   c:'#d97706', border:'rgba(217,119,6,.2)'  },
    { key:'advanced',     label:'Advanced',     bg:'rgba(220,38,38,.08)',   c:'#dc2626', border:'rgba(220,38,38,.2)'  },
  ];

  contentEl.innerHTML = `
  <div class="page-head fu">
    <div>
      <div class="page-title">Skill <em>Roadmaps</em></div>
      <div class="page-sub">10 structured paths from beginner to interview-ready.</div>
    </div>
  </div>
  <div class="skill-grid fu d1">
    ${SKILLS.map(s => {
      const rm = ROADMAPS[s.id] || DEFAULT_RM;
      const all = Object.values(rm).flat();
      const dc  = all.filter(t => done.has(t.id)).length;
      const pct = Math.round(dc / all.length * 100);
      return `
        <div class="skill-card fu" style="color:${s.color}" onclick="rmSel=SKILLS.find(x=>x.id===${s.id});roadmap()">
          <span class="skill-emoji">${s.emoji}</span>
          <div class="skill-name">${s.name}</div>
          <div class="skill-desc">${s.desc}</div>
          <div class="skill-foot"><span>${s.topics} topics</span><span style="color:${s.color};font-weight:600">${pct}%</span></div>
          <div class="prog-track" style="height:4px"><div class="prog-bar" style="width:${pct}%;background:${s.color}"></div></div>
        </div>`;
    }).join('')}
  </div>`;
}

function rmDetail() {
  const s    = rmSel;
  const rm   = ROADMAPS[s.id] || DEFAULT_RM;
  const done = new Set(user.completedTopics || []);
  const all  = Object.values(rm).flat();
  const dc   = all.filter(t => done.has(t.id)).length;
  const pct  = Math.round(dc / all.length * 100);
  const PHASES = [
    { key:'beginner',     label:'Beginner',     bg:'rgba(13,148,136,.08)',  c:'#0d9488', border:'rgba(13,148,136,.2)' },
    { key:'intermediate', label:'Intermediate', bg:'rgba(217,119,6,.08)',   c:'#d97706', border:'rgba(217,119,6,.2)'  },
    { key:'advanced',     label:'Advanced',     bg:'rgba(220,38,38,.08)',   c:'#dc2626', border:'rgba(220,38,38,.2)'  },
  ];

  contentEl.innerHTML = `
  <div style="margin-bottom:18px" class="fu">
    <button class="btn" onclick="rmSel=null;rmOpen=null;roadmap()">← All Skills</button>
  </div>
  <div class="rm-hero fu d1">
    <span style="font-size:44px">${s.emoji}</span>
    <div style="flex:1">
      <div style="font-family:var(--ff-d);font-size:24px;margin-bottom:4px">${s.name} Roadmap</div>
      <div style="font-size:14px;color:var(--ink2);margin-bottom:10px">${s.desc}</div>
      <div style="display:flex;gap:20px;font-family:var(--ff-m);font-size:11px;color:var(--ink3)">
        <span>Total: <strong style="color:var(--ink)">${all.length}</strong></span>
        <span>Done: <strong style="color:${s.color}">${dc}</strong></span>
        <span>Progress: <strong style="color:${s.color}">${pct}%</strong></span>
      </div>
    </div>
    <div style="width:120px"><div class="prog-track" style="height:5px"><div class="prog-bar" style="width:${pct}%;background:${s.color}"></div></div></div>
  </div>
  ${PHASES.map(ph => `
    <div style="margin-bottom:18px" class="fu d2">
      <div class="phase-head">
        <span class="phase-pill" style="background:${ph.bg};color:${ph.c};border:1px solid ${ph.border}">${ph.label}</span>
        <div class="ph-line"></div>
      </div>
      ${(rm[ph.key] || []).map(t => {
        const isDone = done.has(t.id);
        const isOpen = rmOpen === t.id;
        const res    = RESOURCES[t.id];
        return `
          <div>
            <div class="topic-row ${isDone ? 'done' : ''}" onclick="rmOpen=${isOpen ? 'null' : t.id};rmDetail()">
              <div class="topic-check" onclick="event.stopPropagation();completeTopic(${t.id})">${isDone ? '✓' : ''}</div>
              <span class="topic-name">${t.name}</span>
              <span style="font-family:var(--ff-m);font-size:10px;color:var(--ink3);margin-right:8px">${t.res} res.</span>
              <span style="color:var(--ink3);font-size:11px;transition:transform .2s;display:inline-block;transform:${isOpen?'rotate(90deg)':'none'}">▶</span>
            </div>
            ${isOpen ? `<div class="res-drop">
              ${res ? res.map(r => `
                <a class="res-link" href="${r.url}" target="_blank" rel="noopener">
                  <span>${r.icon}</span>
                  <span style="flex:1">${r.title}</span>
                  <span class="tag res-type rt-${r.type}">${r.type}</span>
                </a>`).join('') : '<p style="font-size:13px;color:var(--ink3)">Check official documentation for this topic.</p>'}
            </div>` : ''}
          </div>`;
      }).join('')}
    </div>`).join('')}`;
}

function completeTopic(id) {
  const ct = user.completedTopics || [];
  if (ct.includes(id)) return;
  const updated = [...ct, id];
  const badges  = [...(user.badges || [])];
  if (updated.length >= 1  && !badges.includes('first_topic')) badges.push('first_topic');
  if (updated.length >= 10 && !badges.includes('topics_10'))   badges.push('topics_10');
  patch({ completedTopics: updated, badges });
  addXP(10);
  rmDetail();
}

