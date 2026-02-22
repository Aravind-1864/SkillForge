// ═══════════════════════════════
//  SKILLFORGE — Problems Module
// ═══════════════════════════════
/* ════════════════════════
   PROBLEMS
════════════════════════ */
let probSel = PROBLEMS[0], probFilter = 'all', probShowSol = false, probCode = '';

function problems() {
  const solved = new Set(user.solvedProblems || []);
  const list   = probFilter === 'all' ? PROBLEMS : PROBLEMS.filter(p => p.diff === probFilter);

  contentEl.innerHTML = `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px" class="fu">
    <div>
      <div class="page-title" style="font-size:26px">Practice <em>Problems</em></div>
      <div class="page-sub">10 real interview problems. Write code, view solutions, earn XP.</div>
    </div>
    <div style="display:flex;gap:6px">
      ${['all','easy','medium','hard'].map(d => `
        <button onclick="probFilter='${d}';problems()" style="padding:6px 13px;border-radius:20px;border:1.5px solid ${probFilter===d?'transparent':'var(--line)'};background:${probFilter===d?(d==='all'?'var(--ink)':d==='easy'?'var(--easy)':d==='medium'?'var(--medium)':'var(--red)'):'transparent'};color:${probFilter===d?'#fff':'var(--ink2)'};cursor:pointer;font-size:11px;font-family:var(--ff-m);font-weight:600;transition:all .15s;text-transform:capitalize">${d}</button>`).join('')}
    </div>
  </div>
  <div class="prob-shell fu d1">
    <div class="prob-list">
      ${list.map(p => `
        <div class="prob-card ${probSel?.id===p.id?'sel':''}" onclick="probSel=PROBLEMS.find(x=>x.id===${p.id});probShowSol=false;probCode='';problems()">
          <div class="prob-num">#${String(p.id).padStart(3,'0')}</div>
          <div class="prob-title">${p.title}${solved.has(p.id)?'<span style="margin-left:7px;font-size:10px;color:var(--easy);font-family:var(--ff-m)">✓</span>':''}</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap">
            <span class="tag tag-${p.diff}">${p.diff}</span>
            ${p.tags.slice(0,2).map(t=>`<span style="font-size:10px;color:var(--ink3);font-family:var(--ff-m)">#${t}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    ${probSel ? `
    <div class="prob-detail">
      <div class="prob-desc-wrap">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <h2 style="font-family:var(--ff-d);font-size:20px;font-weight:400">${probSel.title}</h2>
          <span class="tag tag-${probSel.diff}">${probSel.diff}</span>
          <span style="font-family:var(--ff-m);font-size:10px;color:var(--ink3);margin-left:auto">⏱${probSel.time} · 💾${probSel.space}</span>
        </div>
        <p style="font-size:14px;color:var(--ink2);line-height:1.7;margin-bottom:12px">${probSel.desc}</p>
        ${probSel.examples.map((ex,i) => `
          <div class="prob-ex">
            <div class="ex-lbl">Example ${i+1}</div>
            <div>Input: <strong>${ex.input}</strong></div>
            <div>Output: <strong style="color:var(--easy)">${ex.out}</strong></div>
            ${ex.why ? `<div style="color:var(--ink3);margin-top:2px">// ${ex.why}</div>` : ''}
          </div>`).join('')}
        <div style="font-size:11px;color:var(--ink3);font-family:var(--ff-m)">Tags: ${probSel.tags.map(t=>`#${t}`).join(', ')}</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div class="code-top">
          <span style="font-family:var(--ff-m);font-size:10px;color:var(--ink3);text-transform:uppercase;letter-spacing:1.5px">${probShowSol?'Optimized Solution':'Your Solution'}</span>
          <div style="display:flex;gap:7px">
            <button class="btn btn-sm" style="${probShowSol?'border-color:var(--teal);color:var(--teal)':'background:var(--teal);color:#fff;border:none'}" onclick="probShowSol=!probShowSol;problems()">${probShowSol?'← My Code':'💡 Solution'}</button>
            ${!probShowSol ? `<button class="btn btn-sm" style="background:var(--ink);color:#fff;border:none" onclick="submitProblem()">${solved.has(probSel.id)?'✓ Solved':'Submit ✓'}</button>` : ''}
          </div>
        </div>
        <textarea class="code-area" id="probCode" style="flex:1" ${probShowSol?'readonly':''} placeholder="# Write your Python solution here\n\ndef solution():\n    pass">${probShowSol ? escHtml(probSel.solution) : escHtml(probCode)}</textarea>
        ${probShowSol ? `<div class="sol-explain"><strong style="color:var(--teal)">💡 Approach: </strong>${probSel.explain}</div>` : ''}
      </div>
    </div>` : ''}
  </div>`;

  // Persist code on change
  const ta = C('probCode');
  if (ta && !probShowSol) ta.addEventListener('input', e => { probCode = e.target.value; });
}

function submitProblem() {
  const solved = user.solvedProblems || [];
  if (solved.includes(probSel.id)) return alert('Already solved!');
  const xpMap = { easy:20, medium:50, hard:100 };
  const earned = xpMap[probSel.diff] || 20;
  const updated = [...solved, probSel.id];
  const badges  = [...(user.badges || [])];
  if (updated.length >= 1  && !badges.includes('first_solve'))  badges.push('first_solve');
  if (updated.length >= 10 && !badges.includes('problems_10')) badges.push('problems_10');
  patch({ solvedProblems: updated, badges });
  addXP(earned);
  alert(`✅ Accepted! +${earned} XP earned for "${probSel.title}"`);
  problems();
}

