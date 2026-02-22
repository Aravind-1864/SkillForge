// ═══════════════════════════════
//  SKILLFORGE — Code Editor Module
// ═══════════════════════════════
/* ════════════════════════
   EDITOR
════════════════════════ */
let edLang = 'python', edOut = null, edRunning = false;

function editor() {
  const LANGS = { python:'Python', javascript:'JavaScript', java:'Java', html:'HTML', sql:'SQL' };
  contentEl.innerHTML = `
  <div class="page-head fu" style="margin-bottom:14px">
    <div>
      <div class="page-title">Code <em>Editor</em></div>
      <div class="page-sub">Write and run code in 5 languages. HTML renders live preview.</div>
    </div>
  </div>
  <div class="editor-shell fu d1">
    <div class="ep">
      <div class="ep-head">
        <span class="ep-lbl">editor</span>
        <div class="lang-tabs">
          ${Object.entries(LANGS).map(([l,n]) => `<button class="ltab ${edLang===l?'on':''}" onclick="edChangeLang('${l}')">${n}</button>`).join('')}
        </div>
      </div>
      <textarea class="code-area" id="edCode" spellcheck="false">${escHtml(CODE_TEMPLATES[edLang] || '')}</textarea>
      <div class="run-bar">
        <button class="run-btn" id="runBtn" onclick="edRun()">▶ Run</button>
        <span style="font-family:var(--ff-m);font-size:10px;color:var(--ink3)">${edLang==='html'?'→ Renders live preview':'→ Judge0 API in production'}</span>
      </div>
    </div>
    <div class="ep">
      <div class="ep-head">
        <span class="ep-lbl" id="outLbl">${edLang==='html'&&edOut?.type==='html'?'live preview':'output'}</span>
        ${edOut ? `<button class="btn btn-sm" onclick="edOut=null;editor()">Clear</button>` : ''}
      </div>
      <div id="outArea" style="flex:1;overflow:hidden;display:flex;flex-direction:column">
        ${renderOutput()}
      </div>
    </div>
  </div>`;
}

function renderOutput() {
  if (!edOut && !edRunning) return `<div class="output-area"><span style="color:#4a5568;font-style:italic">// Click ▶ Run to see output here</span></div>`;
  if (edRunning) return `<div class="output-area"><span style="color:#10b981">⟳ Executing…</span></div>`;
  if (edOut?.type === 'html') return `<iframe style="flex:1;border:none;width:100%;background:#fff" srcdoc="${escHtml(edOut.content)}" sandbox="allow-scripts"></iframe>`;
  return `<div class="output-area"><pre style="white-space:pre-wrap;word-break:break-word">${escHtml(edOut.content)}</pre></div>`;
}

function edChangeLang(l) {
  edLang = l; edOut = null;
  editor();
}

function edRun() {
  const code = C('edCode').value;
  edRunning = true; edOut = null;
  C('runBtn').disabled = true;
  C('runBtn').textContent = '⟳ Running…';
  C('outArea').innerHTML = `<div class="output-area"><span style="color:#10b981">⟳ Executing…</span></div>`;
  setTimeout(() => {
    edOut = simulateRun(code, edLang);
    edRunning = false;
    C('runBtn').disabled = false;
    C('runBtn').textContent = '▶ Run';
    C('outLbl').textContent = edLang === 'html' && edOut?.type === 'html' ? 'live preview' : 'output';
    if (edOut?.type === 'html') C('outArea').innerHTML = `<iframe style="flex:1;border:none;width:100%;background:#fff" srcdoc="${escHtml(edOut.content)}" sandbox="allow-scripts"></iframe>`;
    else C('outArea').innerHTML = `<div class="output-area"><pre style="white-space:pre-wrap;word-break:break-word">${escHtml(edOut.content)}</pre></div>`;
  }, 700);
}

