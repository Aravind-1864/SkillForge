// ═══════════════════════════════
//  SKILLFORGE — Core: Init, User, Sidebar, Router, XP, Streak
// ═══════════════════════════════

/* ── INIT ── */
let user = LS.get('sf_session');
if (!user) { window.location.href = '../pages/auth.html'; }

function saveUser() {
  const users = LS.get('sf_users', []);
  LS.set('sf_users', users.map(u => u.id === user.id ? user : u));
  LS.set('sf_session', user);
}
function patch(obj) { user = { ...user, ...obj }; saveUser(); renderSidebar(); }

/* ── UTIL ── */
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function C(id) { return document.getElementById(id); }
const contentEl = document.getElementById('content');

/* ── SIDEBAR ── */
function renderSidebar() {
  const init = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'SF';
  const xp   = user.xp || 0;
  const pct  = Math.min((xp % 500) / 500 * 100, 100);
  C('sbUser').innerHTML = `
    <div class="user-row">
      <div class="user-av">${init}</div>
      <div style="flex:1;min-width:0">
        <div class="user-name">${user.name}</div>
        <div class="user-level">${user.level} · ${xp} XP</div>
      </div>
      <button class="logout-btn" onclick="logout()" title="Logout">⏻</button>
    </div>
    <div class="xp-wrap">
      <div class="xp-labels"><span>Level Progress</span><span>${xp % 500}/500 XP</span></div>
      <div class="xp-track"><div class="xp-fill" style="width:${pct}%"></div></div>
      ${user.streak > 0 ? `<div class="streak-chip">🔥 ${user.streak}-day streak</div>` : ''}
    </div>`;
}

function logout() {
  LS.set('sf_session', null);
  window.location.href = '../pages/auth.html';
}

/* ── ROUTER ── */
let currentPage = 'dashboard';
function go(page) {
  currentPage = page;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('on'));
  const nb = C('nb-' + page);
  if (nb) nb.classList.add('on');
  document.title = 'SkillForge — ' + page.charAt(0).toUpperCase() + page.slice(1);
  const pages = { dashboard, roadmap, editor, problems, tests, health, ai };
  if (pages[page]) pages[page]();
}

/* ── XP / STREAK / BADGES ── */
function addXP(amount) {
  const newXP = (user.xp || 0) + amount;
  const level = newXP >= 2000 ? 'Advanced' : newXP >= 500 ? 'Intermediate' : 'Beginner';
  patch({ xp: newXP, level });
}

function checkStreak() {
  const today     = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (user.lastActiveDate === today) return;
  const newStreak = user.lastActiveDate === yesterday ? (user.streak || 0) + 1 : 1;
  const badges = [...(user.badges || [])];
  if (newStreak >= 7  && !badges.includes('streak_7'))  badges.push('streak_7');
  if (newStreak >= 30 && !badges.includes('streak_30')) badges.push('streak_30');
  patch({ streak: newStreak, lastActiveDate: today, badges });
}

function awardBadge(id) {
  const badges = [...(user.badges || [])];
  if (!badges.includes(id)) { badges.push(id); patch({ badges }); }
}

/* ── BOOT ── */
renderSidebar();
go('dashboard');
