// ═══════════════════════════════
//  SKILLFORGE — Tests Module
// ═══════════════════════════════
/* ════════════════════════
   TESTS
════════════════════════ */
let testPhase = 'select', testActive = null, testQs = [], testQi = 0, testAnswers = {}, testRevealed = false, testTimer = 100, testTimerInt = null;

function tests() {
  if (testPhase === 'select') renderTestSelect();
  else if (testPhase === 'quiz') renderTestQuiz();
  else renderTestResult();
}

function renderTestSelect() {
  contentEl.innerHTML = `
  <div class="page-head fu">
    <div>
      <div class="page-title">Mock <em>Tests</em></div>
      <div class="page-sub">Timed quizzes with instant scoring, explanations & XP rewards.</div>
    </div>
  </div>
  <div class="test-cards fu d1">
    ${TEST_CONFIGS.map(cfg => `
      <div class="test-card">
        <span class="test-emoji">${cfg.emoji}</span>
        <div class="test-name">${cfg.name}</div>
        <div class="test-desc">${cfg.desc}</div>
        <div class="test-meta">${cfg.count} questions · timed</div>
        <div class="diff-btns">
          <button class="diff-btn" style="background:rgba(13,148,136,.1);color:var(--easy)" onclick="startTest('${cfg.id}','Easy')">Easy</button>
          <button class="diff-btn" style="background:rgba(217,119,6,.1);color:var(--medium)" onclick="startTest('${cfg.id}','Medium')">Medium</button>
          <button class="diff-btn" style="background:rgba(220,38,38,.1);color:var(--red)" onclick="startTest('${cfg.id}','Hard')">Hard</button>
        </div>
      </div>`).join('')}
  </div>
  <div class="card fu d2">
    <div class="sec-title" style="margin-bottom:12px">How It Works</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
      ${['Pick skill & difficulty','Timer per question','Explanation after each answer','XP + score at the end'].map((s,i) => `
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="width:22px;height:22px;border-radius:50%;background:var(--bg3);border:1.5px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${i+1}</div>
          <div style="font-size:13px;color:var(--ink2);line-height:1.5">${s}</div>
        </div>`).join('')}
    </div>
  </div>`;
}

function startTest(cfgId, diff) {
  const cfg = TEST_CONFIGS.find(c => c.id === cfgId);
  const pool = TEST_BANKS[cfgId] || TEST_BANKS.python;
  testActive   = { ...cfg, diff };
  testQs       = pool.slice(0, cfg.count);
  testQi       = 0;
  testAnswers  = {};
  testRevealed = false;
  testPhase    = 'quiz';
  startQTimer();
  tests();
}

function startQTimer() {
  clearInterval(testTimerInt);
  testTimer = 100;
  testTimerInt = setInterval(() => {
    testTimer--;
    const bar = C('timerBar');
    if (bar) bar.style.width = testTimer + '%';
    if (testTimer <= 0) { clearInterval(testTimerInt); testRevealed = true; renderTestQuiz(); }
  }, 400);
}

function renderTestQuiz() {
  const q       = testQs[testQi];
  const selAns  = testAnswers[testQi];
  const letters = ['A','B','C','D'];

  contentEl.innerHTML = `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px" class="fu">
    <div>
      <div class="page-title" style="font-size:22px">${testActive.emoji} ${testActive.name}</div>
      <div style="font-family:var(--ff-m);font-size:11px;color:var(--ink3);margin-top:2px">Q${testQi+1}/${testQs.length} · ${testActive.diff}</div>
    </div>
    <button class="btn" onclick="clearInterval(testTimerInt);testPhase='select';tests()">✕ Exit</button>
  </div>
  <div style="max-width:640px">
    <div class="timer-track"><div class="timer-bar" id="timerBar" style="width:${testTimer}%"></div></div>
    <div style="font-family:var(--ff-m);font-size:10px;color:var(--ink3);margin-bottom:8px;text-transform:uppercase;letter-spacing:1.5px">Question ${testQi+1} of ${testQs.length}</div>
    <div class="q-text">${q.q}</div>
    <div class="opts">
      ${q.opts.map((o, i) => {
        let cls = '';
        if (testRevealed) { if (i === q.ans) cls = 'correct'; else if (i === selAns) cls = 'wrong'; }
        else if (i === selAns) cls = 'sel';
        return `<button class="opt ${cls}" onclick="pickAnswer(${i})" ${testRevealed?'disabled':''}><span class="opt-letter">${letters[i]}</span>${o}</button>`;
      }).join('')}
    </div>
    ${testRevealed ? `<div class="q-explain"><strong style="color:var(--teal)">Explanation: </strong>${q.exp}</div>` : ''}
    <div style="display:flex;gap:10px">
      ${!testRevealed && selAns === undefined ? `<button class="btn" onclick="testRevealed=true;renderTestQuiz()">Skip →</button>` : ''}
      ${testRevealed ? `<button class="next-btn" onclick="nextTestQ()">${testQi < testQs.length-1 ? 'Next →' : 'See Results →'}</button>` : ''}
    </div>
  </div>`;
}

function pickAnswer(i) {
  if (testRevealed) return;
  testAnswers[testQi] = i;
  testRevealed = true;
  clearInterval(testTimerInt);
  renderTestQuiz();
}

function nextTestQ() {
  testRevealed = false;
  if (testQi < testQs.length - 1) {
    testQi++;
    startQTimer();
    renderTestQuiz();
  } else {
    const score  = testQs.filter((q, i) => testAnswers[i] === q.ans).length;
    const pct    = Math.round(score / testQs.length * 100);
    const xpEarned = score * 15 + (pct >= 80 ? 100 : pct >= 60 ? 50 : 0);
    const newScores = [...(user.testScores || []), { score, total:testQs.length, pct, skill:testActive.id, date:new Date().toISOString() }];
    const badges  = [...(user.badges || [])];
    if (!badges.includes('first_test')) badges.push('first_test');
    const perfectTests = (user.perfectTests || 0) + (pct >= 90 ? 1 : 0);
    if (perfectTests >= 1 && !badges.includes('perfect_90')) badges.push('perfect_90');
    patch({ testsTaken:(user.testsTaken||0)+1, testScores:newScores, badges, perfectTests });
    addXP(xpEarned);
    testPhase = 'result';
    tests();
  }
}

function renderTestResult() {
  const score = testQs.filter((q, i) => testAnswers[i] === q.ans).length;
  const pct   = Math.round(score / testQs.length * 100);
  const xp    = score * 15 + (pct >= 80 ? 100 : pct >= 60 ? 50 : 0);
  const grade = pct >= 90 ? 'Outstanding' : pct >= 75 ? 'Great Job' : pct >= 60 ? 'Good Work' : 'Keep Practicing';

  contentEl.innerHTML = `
  <div class="score-wrap fu">
    <div class="score-ring" style="background:conic-gradient(var(--teal) ${pct}%, var(--bg3) 0%)">
      <div class="score-inner"></div>
      <div class="score-num">${pct}%</div>
    </div>
    <div style="font-family:var(--ff-d);font-size:28px;margin-bottom:6px"><em style="font-style:italic;color:var(--teal)">${grade}!</em></div>
    <div style="font-size:14px;color:var(--ink2);margin-bottom:4px">${score}/${testQs.length} correct on ${testActive.name}</div>
    <div style="font-family:var(--ff-m);font-size:12px;color:var(--teal);margin-bottom:20px">+${xp} XP earned</div>
    <div class="score-stats">
      ${[{l:'Correct',v:score,c:'var(--easy)'},{l:'Wrong',v:testQs.length-score,c:'var(--red)'},{l:'XP Earned',v:`+${xp}`,c:'var(--teal)'}].map(s =>
        `<div class="score-stat"><div class="score-val" style="color:${s.c}">${s.v}</div><div class="score-label">${s.l}</div></div>`).join('')}
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn" style="flex:1;justify-content:center;padding:12px" onclick="startTest(testActive.id,testActive.diff)">⟳ Retry</button>
      <button class="next-btn" style="flex:1;padding:12px" onclick="testPhase='select';tests()">← All Tests</button>
    </div>
  </div>`;
}

