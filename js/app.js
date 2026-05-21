/* ============================================================
   SERVICEDESK — APP.JS
   Enterprise Ticket System (Asana-Inspired)
   Completely self-contained — no external dependencies.
   ============================================================ */
'use strict';

// ─── SVG ICONS ──────────────────────────────────────────────
var ICONS = {
  plus: '<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  more: '<svg viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  desc: '<svg viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',
  dash: '<svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
  ticket: '<svg viewBox="0 0 24 24"><path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.81-2.77-2-3.46V6h16v2.54z"/></svg>',
  board: '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
  theme: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
  comment: '<svg viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',
  time: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>',
  label: '<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.37.86.59 1.41.59.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>',
  activity: '<svg viewBox="0 0 24 24"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6 0h4v2h-4zm0-6h4v5h-4zM6 7h5v5H6z"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>',
  keyboard: '<svg viewBox="0 0 24 24"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 5H5v-2h2v2zm11 0H9v-2h9v2zm0-3h-2v-2h2v2zm0-3h-2V8h2v2zm-3 0h-2V8h2v2z"/></svg>',
  checkSquare: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
  metrics: '<svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/></svg>'
};

// ─── BRAND LOGO SVGs — MOTTION BRAND BOOK ───────────────────
// Símbolo: M em laranja sobre fundo transparente (viewBox 48x32)
var LOGO_SVG = '<svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L4 6L24 26L44 6L44 28" stroke="#FF8C3A" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="26" r="2" fill="#FF8C3A" opacity="0.35"/></svg>';
var LOGO_42  = '<svg width="42" height="28" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L4 6L24 26L44 6L44 28" stroke="#FF8C3A" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="26" r="2" fill="#FF8C3A" opacity="0.35"/></svg>';
var LOGO_30  = '<svg width="30" height="20" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L4 6L24 26L44 6L44 28" stroke="#FF8C3A" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="26" r="2" fill="#FF8C3A" opacity="0.35"/></svg>';
var LOGO_32  = '<svg width="32" height="21" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L4 6L24 26L44 6L44 28" stroke="#FF8C3A" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="26" r="2" fill="#FF8C3A" opacity="0.35"/></svg>';

// Wordmark HTML com "tt" em laranja (usar em sidebar e login)
var WORDMARK = '<span style="font-size:15px;font-weight:300;color:#E8DDD0;letter-spacing:-0.3px;line-height:1">Mo<strong style="font-weight:700;color:#FF8C3A">tt</strong>ion <span style="font-weight:600">Desk</span></span>';
var WORDMARK_LG = '<span style="font-size:22px;font-weight:300;color:#E8DDD0;letter-spacing:-0.5px;line-height:1">Mo<strong style="font-weight:700;color:#FF8C3A">tt</strong>ion <span style="font-weight:600">Desk</span></span>';

// ─── LABEL COLORS ───────────────────────────────────────────
var LABEL_COLORS = ['#EF4444','#F97316','#EAB308','#22C55E','#14B8A6','#3B82F6','#6366F1','#A855F7','#EC4899','#6B7280'];

// ─── DEPARTMENTS (defaults — overridden by admin settings) ──
var _DEPTS_DEFAULT = [
  { id: 'ti', name: 'TI', icon: '💻', color: '#3B82F6' },
  { id: 'rh', name: 'RH', icon: '👥', color: '#A855F7' },
  { id: 'financeiro', name: 'Financeiro', icon: '💰', color: '#22C55E' },
  { id: 'marketing', name: 'Marketing', icon: '📢', color: '#F97316' },
  { id: 'operacoes', name: 'Operações', icon: '⚙️', color: '#14B8A6' },
  { id: 'juridico', name: 'Jurídico', icon: '⚖️', color: '#6366F1' },
  { id: 'comercial', name: 'Comercial', icon: '🤝', color: '#EC4899' },
  { id: 'administrativo', name: 'Administrativo', icon: '🏢', color: '#6B7280' },
];
function getDepts() { return (Store && Store.data && Store.data.settings && Store.data.settings.departments) ? Store.data.settings.departments : _DEPTS_DEFAULT; }
function getCats()  { return (Store && Store.data && Store.data.settings && Store.data.settings.categories)  ? Store.data.settings.categories  : _CATS_DEFAULT; }
function getSlaH()  { return (Store && Store.data && Store.data.settings && Store.data.settings.slaHours)   ? Store.data.settings.slaHours    : _SLA_DEFAULT; }

// ─── QUALITY METRICS (defaults — overridden by admin settings) ─
var _QUALITY_DEFAULT = {
  greenThreshold:  80,
  yellowThreshold: 55,
  ncCategories:    ['Incidente', 'Manutenção'],
  targetSla:       90,
  targetResol:     85,
};
function getQualitySettings() {
  var s = Store && Store.data && Store.data.settings && Store.data.settings.quality;
  if (!s) return _QUALITY_DEFAULT;
  return {
    greenThreshold:  s.greenThreshold  !== undefined ? s.greenThreshold  : _QUALITY_DEFAULT.greenThreshold,
    yellowThreshold: s.yellowThreshold !== undefined ? s.yellowThreshold : _QUALITY_DEFAULT.yellowThreshold,
    ncCategories:    Array.isArray(s.ncCategories)   ? s.ncCategories    : _QUALITY_DEFAULT.ncCategories,
    targetSla:       s.targetSla       !== undefined ? s.targetSla       : _QUALITY_DEFAULT.targetSla,
    targetResol:     s.targetResol     !== undefined ? s.targetResol     : _QUALITY_DEFAULT.targetResol,
  };
}

var BG_COLORS = [
  { id: 'blue', color: '#3B82F6' }, { id: 'indigo', color: '#6366F1' },
  { id: 'purple', color: '#A855F7' }, { id: 'pink', color: '#EC4899' },
  { id: 'green', color: '#22C55E' }, { id: 'teal', color: '#14B8A6' },
  { id: 'orange', color: '#F97316' }, { id: 'red', color: '#EF4444' },
  { id: 'grey', color: '#6B7280' },
];

var PRIORITIES = [
  { id: 'low', name: 'Baixa', color: '#22C55E' },
  { id: 'medium', name: 'Média', color: '#EAB308' },
  { id: 'high', name: 'Alta', color: '#F97316' },
  { id: 'urgent', name: 'Urgente', color: '#EF4444' },
];

var _CATS_DEFAULT = ['Suporte', 'Manutenção', 'Solicitação', 'Incidente', 'Melhoria', 'Acesso', 'Outro', 'Reunião'];
var _SLA_DEFAULT  = { urgent: 4, high: 8, medium: 24, low: 72 };
var RECURRENCE = [
  { id: 'none', name: 'Não se repete' },
  { id: 'daily', name: 'Diariamente' },
  { id: 'weekly', name: 'Semanalmente' },
  { id: 'monthly', name: 'Mensalmente' }
];
var DEFAULT_LISTS = ['Aberto', 'Em Andamento', 'Em Revisão', 'Concluído'];

// ─── CONTEXT MENU ───────────────────────────────────────────
function showContextMenu(x, y, boardId, listId, cardId) {
  var oldMenu = document.getElementById('ctx-menu');
  if (oldMenu) oldMenu.remove();

  var menu = document.createElement('div');
  menu.id = 'ctx-menu';
  menu.className = 'ctx-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  
  menu.innerHTML = 
    '<div class="ctx-item" id="ctx-open">' + ICONS.dash + ' Abrir Ticket</div>' +
    '<div class="ctx-item" id="ctx-done" style="color:var(--brand)">' + ICONS.check + ' Marcar como Concluído</div>' +
    '<hr style="margin:4px 0;border:none;border-top:1px solid var(--border)">' +
    '<div class="ctx-item" id="ctx-del" style="color:var(--red)">' + ICONS.trash + ' Excluir Ticket</div>';
    
  document.body.appendChild(menu);
  
  var rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth) menu.style.left = (window.innerWidth - rect.width - 10) + 'px';
  if (rect.bottom > window.innerHeight) menu.style.top = (window.innerHeight - rect.height - 10) + 'px';
  
  document.getElementById('ctx-open').onclick = function () { 
    menu.remove(); 
    if (App.view === 'mytasks' && App.boardId !== boardId) goBoard(boardId);
    setTimeout(function() { openModal(listId, cardId); }, 50);
  };
  
  document.getElementById('ctx-done').onclick = function () { 
    menu.remove(); 
    var b = Store.board(boardId);
    if (!b) return;
    var doneList = b.lists.find(function(l) { return l.name.toLowerCase() === 'concluído' || l.name.toLowerCase() === 'done'; });
    if (doneList && doneList.id !== listId) {
      var l = b.lists.find(function(x){return x.id===listId;});
      var idx = l.cards.findIndex(function(x){return x.id===cardId;});
      if(idx>=0) {
        Store.moveCard(b.id, listId, doneList.id, idx, doneList.cards.length);
        if (App.view === 'board') renderBoard();
        else if (App.view === 'mytasks') renderMyTasks();
        else renderDashboard();
      }
    } else if (doneList && doneList.id === listId) {
      // Already done
    } else {
      alert('Nenhuma coluna "Concluído" encontrada neste quadro.');
    }
  };
  
  document.getElementById('ctx-del').onclick = function () {
    menu.remove();
    softDeleteCard(boardId, listId, cardId, function () {
      if (App.view === 'board') renderBoard();
      else if (App.view === 'mytasks') renderMyTasks();
      else renderDashboard();
    });
  };
  
  setTimeout(function() {
    var closeMenu = function(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
        document.removeEventListener('contextmenu', closeMenu);
      }
    };
    document.addEventListener('click', closeMenu);
    document.addEventListener('contextmenu', closeMenu);
  }, 10);
}

// ─── UTILITIES ──────────────────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function esc(s) { if (!s) return ''; var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function _debounce(fn, delay) { var t; return function () { var a = arguments, ctx = this; clearTimeout(t); t = setTimeout(function () { fn.apply(ctx, a); }, delay); }; }

// ─── EMPTY STATE ─────────────────────────────────────────────
var _ES_ICONS = {
  board:   '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>',
  ticket:  '<svg viewBox="0 0 24 24"><path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/></svg>',
  check:   '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  filter:  '<svg viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>',
  search:  '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
};
function emptyState(icon, title, subtitle, btnHtml) {
  return '<div class="empty-state-block">' +
    '<div class="empty-state-icon">' + (_ES_ICONS[icon] || _ES_ICONS.ticket) + '</div>' +
    '<div class="empty-state-title">' + esc(title) + '</div>' +
    '<div class="empty-state-sub">' + esc(subtitle) + '</div>' +
    (btnHtml ? '<div class="empty-state-cta">' + btnHtml + '</div>' : '') +
    '</div>';
}

// ─── SEGURANÇA: HASH LEGADO (somente para migração) ─────────
function _legacyHash(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return h.toString(36); }

// ─── SEGURANÇA: PBKDF2 + SHA-256 ────────────────────────────
function _generateSalt() {
  var arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}
async function _hashPassword(password, salt) {
  var enc = new TextEncoder();
  var key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
  var bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(salt), iterations: 120000 },
    key, 256
  );
  return Array.from(new Uint8Array(bits)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}
async function _verifyPassword(password, salt, storedHash) {
  return (await _hashPassword(password, salt)) === storedHash;
}

// ─── SEGURANÇA: SESSÃO (sessionStorage — não persiste no localStorage) ──
var _SESS_KEY = 'sd_sess';
var _LA_KEY   = 'sd_la';
var _MAX_ATTEMPTS = 5;
var _LOCKOUT_MS   = 5 * 60 * 1000;

function _createSession(uid, isAdmin) {
  try { sessionStorage.setItem(_SESS_KEY, JSON.stringify({ uid: uid, adm: !!isAdmin, tok: _generateSalt() })); } catch (e) {}
}
function _getSession() {
  try { var r = sessionStorage.getItem(_SESS_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; }
}
function _clearSession() {
  try { sessionStorage.removeItem(_SESS_KEY); } catch (e) {}
}
function _getLoginState(email) {
  try { var d = JSON.parse(sessionStorage.getItem(_LA_KEY) || '{}'); return d[email] || { count: 0, until: 0 }; } catch (e) { return { count: 0, until: 0 }; }
}
function _recordFailedLogin(email) {
  try {
    var d = JSON.parse(sessionStorage.getItem(_LA_KEY) || '{}');
    if (!d[email]) d[email] = { count: 0, until: 0 };
    d[email].count++;
    if (d[email].count >= _MAX_ATTEMPTS) { d[email].until = Date.now() + _LOCKOUT_MS; d[email].count = 0; }
    sessionStorage.setItem(_LA_KEY, JSON.stringify(d));
  } catch (e) {}
}
function _clearLoginState(email) {
  try { var d = JSON.parse(sessionStorage.getItem(_LA_KEY) || '{}'); delete d[email]; sessionStorage.setItem(_LA_KEY, JSON.stringify(d)); } catch (e) {}
}
function initials(n) { return (n || 'U').split(' ').slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
function avatarBg(n) { n = n || 'U'; var cs = ['#3B82F6', '#A855F7', '#22C55E', '#F97316', '#EF4444', '#14B8A6', '#EC4899', '#6366F1']; var h = 0; for (var i = 0; i < n.length; i++) h = ((h << 5) - h) + n.charCodeAt(i); return cs[Math.abs(h) % cs.length]; }
function dept(id) { var ds = getDepts(); return ds.find(function (d) { return d.id === id; }) || ds[0]; }
function pri(id) { return PRIORITIES.find(function (p) { return p.id === id; }) || PRIORITIES[1]; }
function safeBg(b) { if (!b) return '#3B82F6'; return b.color || b; }

function hexAlpha(hex, a) {
  hex = (hex || '#3B82F6').replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  var r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), bv = parseInt(hex.slice(4,6),16);
  return 'rgba('+r+','+g+','+bv+','+a+')';
}

var BG_STYLES = [
  { id: 'tint',     label: 'Tinta' },
  { id: 'gradient', label: 'Gradiente' },
  { id: 'mesh',     label: 'Malha' },
  { id: 'dark',     label: 'Escuro' },
  { id: 'solid',    label: 'Sólido' },
];

function getBoardBg(b) {
  var c = safeBg(b.background);
  var style = b.bgStyle || 'tint';
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var base = isDark ? '#07070f' : '#eef0f6';
  if (style === 'dark')     return { bg: base, size: '' };
  if (style === 'tint')     return { bg: 'linear-gradient(160deg,'+hexAlpha(c,isDark?0.14:0.2)+' 0%,'+base+' 65%)', size: '' };
  if (style === 'gradient') return { bg: 'linear-gradient(135deg,'+hexAlpha(c,isDark?0.32:0.45)+' 0%,'+hexAlpha(c,isDark?0.06:0.08)+' 100%)', size: '' };
  if (style === 'mesh')     return { bg: 'radial-gradient(circle,'+hexAlpha(c,isDark?0.2:0.25)+' 1px,transparent 1px),'+base, size: '28px 28px' };
  if (style === 'solid')    return { bg: c, size: '' };
  return { bg: base, size: '' };
}

function fmtRel(ts) {
  var diff = Date.now() - ts;
  var m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return m + 'min atrás';
  var h = Math.floor(m / 60);
  if (h < 24) return h + 'h atrás';
  var d = Math.floor(h / 24);
  if (d < 7) return d + 'd atrás';
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
// Parse YYYY-MM-DD as local midnight (avoids UTC-offset date shift)
function parseDate(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
function formatTrackedTime(ms) {
  var totalMin = Math.floor((ms || 0) / 60000);
  var h = Math.floor(totalMin / 60);
  var m = totalMin % 60;
  return h + 'h ' + String(m).padStart(2, '0') + 'm';
}

// ─── SLA HELPERS ────────────────────────────────────────────

/** Formata duração em ms → "2h 30min" ou "45min" */
function _fmtDuration(ms) {
  var absMs = Math.abs(ms);
  var h = Math.floor(absMs / 3600000);
  var m = Math.floor((absMs % 3600000) / 60000);
  if (h > 0 && m > 0) return h + 'h ' + m + 'min';
  if (h > 0)          return h + 'h';
  return Math.max(1, m) + 'min';
}

function getSlaProgress(card, isDone) {
  var isWaiting = !isDone && !!card.waitingSince;

  // ── Caminho 1: usa sla_prazo do backend (campo ISO string) ──
  if (card.sla_prazo) {
    var prazoMs   = new Date(card.sla_prazo).getTime();
    var createdMs = card.createdAt || Date.now();
    var totalMs   = Math.max(prazoMs - createdMs, 1);
    var elapsed   = Math.max(0, Date.now() - createdMs);
    var remMs     = prazoMs - Date.now();
    var rawPct    = Math.round((elapsed / totalMs) * 100);
    var pct       = Math.min(rawPct, 100);
    var color     = pct < 60 ? 'var(--green)' : pct < 85 ? '#EAB308' : 'var(--red)';
    var expired   = remMs <= 0 && !isDone && !isWaiting;

    // Derive slaStatus from live calculation (ignores pre-computed field)
    var slaStatus = card.slaStatus ||
      (isDone || isWaiting ? 'none' : expired ? 'danger' : pct >= 85 ? 'danger' : pct >= 60 ? 'warning' : 'ok');

    var label = isDone    ? 'Concluído' :
      isWaiting           ? 'SLA pausado' :
      expired             ? 'Vencido há ' + _fmtDuration(remMs) :
      remMs < 3600000     ? _fmtDuration(remMs) + ' restante' :
                            _fmtDuration(remMs) + ' restantes';

    return { pct: pct, rawPct: rawPct, color: isWaiting ? '#6B7280' : color,
             label: label, expired: expired, slaStatus: slaStatus };
  }

  // ── Caminho 2: cálculo local (sem sla_prazo do backend) ─────
  var hours    = getSlaH()[card.priority] || 24;
  var limitMs  = hours * 3600000;
  var waitedMs = (card.waitingTotal || 0) + (card.waitingSince && !isDone ? Date.now() - card.waitingSince : 0);
  var elapsedL = isDone && card.completedAt
    ? Math.max(0, (card.completedAt - (card.createdAt || card.completedAt)) - waitedMs)
    : Math.max(0, Date.now() - (card.createdAt || Date.now()) - waitedMs);
  var rawPctL  = Math.round((elapsedL / limitMs) * 100);
  var pctL     = Math.min(rawPctL, 100);
  var colorL   = pctL < 60 ? 'var(--green)' : pctL < 85 ? '#EAB308' : 'var(--red)';
  var remL     = limitMs - elapsedL;
  var expiredL = remL <= 0 && !isDone && !isWaiting;
  var slaStatusL = isDone || isWaiting ? 'none' : expiredL ? 'danger' : pctL >= 85 ? 'danger' : pctL >= 60 ? 'warning' : 'ok';

  var labelL = isDone      ? 'Concluído' :
    isWaiting              ? 'SLA pausado' :
    expiredL               ? 'Vencido há ' + _fmtDuration(remL) :
    remL < 3600000         ? _fmtDuration(remL) + ' restante' :
                             _fmtDuration(remL) + ' restantes';

  return { pct: pctL, rawPct: rawPctL, color: isWaiting ? '#6B7280' : colorL,
           label: labelL, expired: expiredL, slaStatus: slaStatusL };
}

function renderSlaBar(card, isDone) {
  var s       = getSlaProgress(card, isDone);
  var cls     = 'sla-bar-label sla-' + (s.slaStatus || 'none');
  var inlineC = '';   // cor já vem via classe CSS; limpa inline para evitar conflito
  return '<div class="card-sla">' +
    '<div class="sla-bar-wrap">' +
    '<div class="sla-bar-track"><div class="sla-bar-fill" style="width:' + s.pct + '%;background:' + s.color + '"></div></div>' +
    '<span class="' + cls + '">' + s.label + '</span>' +
    '</div></div>';
}

// ─── MARKDOWN RENDERER ──────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return '';
  var lines = text.split('\n');
  var html = '';
  var inUl = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^### /.test(line)) { if (inUl) { html += '</ul>'; inUl = false; } html += '<div class="md-h3">' + esc(line.slice(4)) + '</div>'; continue; }
    if (/^## /.test(line)) { if (inUl) { html += '</ul>'; inUl = false; } html += '<div class="md-h2">' + esc(line.slice(3)) + '</div>'; continue; }
    if (/^# /.test(line)) { if (inUl) { html += '</ul>'; inUl = false; } html += '<div class="md-h1">' + esc(line.slice(2)) + '</div>'; continue; }
    if (/^---/.test(line)) { if (inUl) { html += '</ul>'; inUl = false; } html += '<hr class="md-hr">'; continue; }
    if (/^```/.test(line)) {
      if (inUl) { html += '</ul>'; inUl = false; }
      var code = '';
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { code += (code ? '\n' : '') + lines[i]; i++; }
      html += '<pre class="md-pre"><code class="md-code">' + esc(code) + '</code></pre>';
      continue;
    }
    if (/^[-*] /.test(line)) {
      if (!inUl) { html += '<ul class="md-ul">'; inUl = true; }
      html += '<li>' + inlineMarkdown(line.slice(2)) + '</li>';
      continue;
    }
    if (inUl) { html += '</ul>'; inUl = false; }
    if (line.trim() === '') { html += '<br>'; continue; }
    html += '<p style="margin:4px 0">' + inlineMarkdown(line) + '</p>';
  }
  if (inUl) html += '</ul>';
  return '<div class="md-content">' + html + '</div>';
}

function inlineMarkdown(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="md-code">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noopener">$1</a>');
}

// ─── AI TRIAGE ──────────────────────────────────────────────
var AiTriage = {
  suggest: function (title, description) {
    var text = (title + ' ' + (description || '')).toLowerCase();
    var priority = 'medium', category = 'Solicitação', reason = 'Ticket padrão.';
    if (/urgente|crítico|fora do ar|caiu|crash|incêndio|prod/i.test(text)) {
      priority = 'urgent'; category = 'Incidente'; reason = 'Palavras críticas detectadas — serviço pode estar indisponível.';
    } else if (/erro|falha|bug|quebrado|não funciona|lento/i.test(text)) {
      priority = 'high'; category = 'Incidente'; reason = 'Possível falha ou erro de sistema detectado.';
    } else if (/acesso|senha|login|permissão|bloqueado/i.test(text)) {
      priority = 'high'; category = 'Acesso'; reason = 'Solicitação de acesso ou credenciais detectada.';
    } else if (/instalar|instalação|configurar|setup|novo/i.test(text)) {
      priority = 'low'; category = 'Solicitação'; reason = 'Solicitação de instalação ou configuração.';
    } else if (/melhoria|melhora|sugestão|otimizar/i.test(text)) {
      priority = 'low'; category = 'Melhoria'; reason = 'Sugestão de melhoria identificada.';
    } else if (/reunião|agenda|horário|agendar/i.test(text)) {
      priority = 'low'; category = 'Reunião'; reason = 'Solicitação de reunião ou agendamento.';
    } else if (/manutenção|revisão|preventiva/i.test(text)) {
      priority = 'medium'; category = 'Manutenção'; reason = 'Tarefa de manutenção identificada.';
    }
    return { priority: priority, category: category, reason: reason };
  },

  showToast: function (suggestion, onApply, onDismiss) {
    var old = document.getElementById('ai-triage-toast');
    if (old) old.remove();
    var p = pri(suggestion.priority);
    var toast = document.createElement('div');
    toast.className = 'ai-triage-toast';
    toast.id = 'ai-triage-toast';
    toast.innerHTML =
      '<div class="ai-triage-header"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:#fff"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/></svg><span>Sugestão de Triagem IA</span></div>' +
      '<div class="ai-triage-body">' +
      '<div class="ai-triage-row"><span class="ai-triage-row-label">Prioridade</span><span class="ai-triage-row-value" style="color:' + p.color + '">' + p.name + '</span></div>' +
      '<div class="ai-triage-row"><span class="ai-triage-row-label">Categoria</span><span class="ai-triage-row-value">' + esc(suggestion.category) + '</span></div>' +
      '<div class="ai-triage-reason">' + esc(suggestion.reason) + '</div>' +
      '</div>' +
      '<div class="ai-triage-actions">' +
      '<button class="btn-secondary" id="ai-dismiss" style="font-size:12px;height:32px">Ignorar</button>' +
      '<button class="btn-primary" id="ai-apply" style="font-size:12px;height:32px">Aplicar</button>' +
      '</div>';
    document.body.appendChild(toast);
    document.getElementById('ai-apply').onclick = function () { toast.remove(); onApply(suggestion); };
    document.getElementById('ai-dismiss').onclick = function () { toast.remove(); if (onDismiss) onDismiss(); };
    setTimeout(function () { if (toast.parentNode) toast.remove(); }, 12000);
  }
};

// ─── COMMAND PALETTE ────────────────────────────────────────
function showCommandPalette() {
  if (document.getElementById('cmd-palette')) return;
  var overlay = document.createElement('div');
  overlay.className = 'cmd-palette';
  overlay.id = 'cmd-palette';

  overlay.innerHTML =
    '<div class="cmd-box">' +
    '<div class="cmd-input-wrap">' +
    '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>' +
    '<input class="cmd-input" id="cmd-input" placeholder="Pesquisar quadros, tickets, ações…" autocomplete="off">' +
    '</div>' +
    '<div class="cmd-results" id="cmd-results"></div>' +
    '<div class="cmd-footer"><kbd>↑↓</kbd> navegar &nbsp; <kbd>Enter</kbd> abrir &nbsp; <kbd>Esc</kbd> fechar</div>' +
    '</div>';

  document.body.appendChild(overlay);

  var input = document.getElementById('cmd-input');
  var results = document.getElementById('cmd-results');

  function renderCmdResults(q) {
    var html = '';
    if (!q) {
      html += '<div class="cmd-section-label">Navegação Rápida</div>';
      var navItems = [
        { icon: ICONS.dash, name: 'Ir para Início', sub: 'D', action: function () { App.view = 'dashboard'; App.boardId = null; overlay.remove(); renderApp(); } },
        { icon: ICONS.check, name: 'Minhas Tarefas', sub: 'T', action: function () { App.view = 'mytasks'; App.boardId = null; overlay.remove(); renderApp(); } },
        { icon: ICONS.calendar, name: 'Calendário', sub: 'C', action: function () { App.view = 'calendar'; App.boardId = null; overlay.remove(); renderApp(); } },
        { icon: ICONS.metrics, name: 'Métricas de Qualidade', sub: 'Q', action: function () { App.view = 'metrics'; App.boardId = null; overlay.remove(); renderApp(); } },
        { icon: ICONS.keyboard, name: 'Atalhos de Teclado', sub: '?', action: function () { overlay.remove(); showShortcutsModal(); } },
        { icon: ICONS.board, name: 'Novo Quadro', sub: '', action: function () { overlay.remove(); showCreateBoard(); } },
      ];
      for (var ni = 0; ni < navItems.length; ni++) {
        var item = navItems[ni];
        html += '<div class="cmd-item" data-ci="' + ni + '">' +
          '<div class="cmd-item-icon">' + item.icon + '</div>' +
          '<span class="cmd-item-name">' + esc(item.name) + '</span>' +
          (item.sub ? '<span class="cmd-kbd">' + item.sub + '</span>' : '') +
          '</div>';
      }
      // Board quick-create actions
      var boards = Store.data.boards || [];
      if (boards.length) {
        html += '<div class="cmd-section-label">Criar Ticket</div>';
      }
      var allItems = navItems.slice();
      for (var bi = 0; bi < boards.length; bi++) {
        (function (board) {
          allItems.push({
            icon: ICONS.plus,
            name: 'Criar ticket em "' + board.name + '"',
            sub: '',
            action: function () {
              overlay.remove();
              goBoard(board.id);
              setTimeout(function () {
                if (board.lists && board.lists.length) showAddCardForm(board.id, board.lists[0].id);
              }, 150);
            }
          });
        })(boards[bi]);
        html += '<div class="cmd-item" data-ci="' + allItems.length + '">' +
          '<div class="cmd-item-icon">' + ICONS.plus + '</div>' +
          '<span class="cmd-item-name">Criar ticket em &ldquo;' + esc(boards[bi].name) + '&rdquo;</span>' +
          '</div>';
      }
      results.innerHTML = html;
      results.querySelectorAll('.cmd-item').forEach(function (el, idx) {
        el.onclick = function () { allItems[idx].action(); };
      });
      return;
    }

    var res = Store.search(q);
    if (res.length === 0) {
      results.innerHTML = '<div class="cmd-empty">Nenhum resultado para "' + esc(q) + '"</div>';
      return;
    }
    html += '<div class="cmd-section-label">Resultados</div>';
    for (var ri = 0; ri < res.length; ri++) {
      var r = res[ri];
      html += '<div class="cmd-item" data-ri="' + ri + '">' +
        '<div class="cmd-item-icon">' + (r.type === 'board' ? ICONS.board : ICONS.ticket) + '</div>' +
        '<span class="cmd-item-name">' + esc(r.title) + '</span>' +
        '<span class="cmd-item-sub">' + esc(r.subtitle) + '</span>' +
        '</div>';
    }
    results.innerHTML = html;
    results.querySelectorAll('.cmd-item').forEach(function (el, idx) {
      el.onclick = function () {
        overlay.remove();
        var r = res[idx];
        if (r.type === 'board') goBoard(r.id);
        else { goBoard(r.boardId); setTimeout(function () { openModal(r.listId, r.id); }, 100); }
      };
    });
  }

  renderCmdResults('');
  setTimeout(function () { input.focus(); }, 50);

  input.oninput = function () { renderCmdResults(input.value.trim()); };
  overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
  input.onkeydown = function (e) {
    if (e.key === 'Escape') { overlay.remove(); e.stopPropagation(); }
    if (e.key === 'Enter') {
      var first = results.querySelector('.cmd-item');
      if (first) first.click();
    }
  };
}

// ─── TOAST NOTIFICATIONS ────────────────────────────────────
function showToast(msg, type, actionLabel, actionFn, duration) {
  type = type || 'info';
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  if (actionLabel && actionFn) {
    t.innerHTML = '<span>' + esc(msg) + '</span><button class="toast-action-btn">' + esc(actionLabel) + '</button>';
    t.querySelector('.toast-action-btn').onclick = function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 300);
      actionFn();
    };
  } else {
    t.textContent = msg;
  }
  document.body.appendChild(t);
  setTimeout(function () { t.classList.add('show'); }, 10);
  var hideMs = duration || ((actionLabel && actionFn) ? 5000 : 3000);
  var hideTimer = setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, hideMs);
  t._hideTimer = hideTimer;
  return t;
}

// ─── SOFT DELETE WITH UNDO ──────────────────────────────────
function softDeleteCard(boardId, listId, cardId, afterRefresh) {
  var found = Store.findCard(cardId);
  if (!found) return;
  var c = found.card;
  var title = c.title;
  var ticketNum = c.ticketNumber;

  // Remove from UI immediately (optimistic)
  var cardEl = document.querySelector('.ticket-card[data-cid="' + cardId + '"]');
  if (cardEl) cardEl.classList.add('leaving');

  // Stash a copy
  var stash = JSON.parse(JSON.stringify(c));
  var stashListId = found.listId;
  var stashBoardId = found.boardId;
  var committed = false;

  var commitTimer = setTimeout(function () {
    committed = true;
    Store.deleteCard(stashBoardId, stashListId, cardId);
    if (afterRefresh) afterRefresh();
  }, 300);

  // Show delete toast with undo
  var restored = false;
  setTimeout(function () {
    showToast('Ticket #' + String(ticketNum).padStart(3, '0') + ' excluído', 'error', '↩ Desfazer', function () {
      if (committed) {
        // Restore: add back with original data
        var b2 = Store.board(stashBoardId);
        if (b2) {
          var l2 = b2.lists.find(function (x) { return x.id === stashListId; });
          if (l2) { l2.cards.push(stash); Store.save(); }
        }
      } else {
        clearTimeout(commitTimer);
      }
      restored = true;
      if (afterRefresh) afterRefresh();
      showToast('Ação desfeita.', 'info');
    });
  }, 350);
}

// ─── DATA STORE (localStorage) ──────────────────────────────
var SKEY = 'servicedesk_data';

var Store = {
  data: { users: [], boards: [], ticketCounter: 0, currentUserId: null },

  // Cache de Store.stats() — invalidado em save() e por TTL (Date.now usado em "overdue")
  _statsCache: null,
  _statsCacheAt: 0,
  _statsCacheTTL: 30000, // 30s — segura contra "overdue" ficar parado no tempo
  invalidateStatsCache: function () { this._statsCache = null; this._statsCacheAt = 0; },

  load: function () {
    // Invalida cache de stats — load() pode ser disparado por sync entre abas
    this.invalidateStatsCache();
    try {
      var s = localStorage.getItem(SKEY);
      if (s) this.data = JSON.parse(s);
    } catch (e) { /* ignore */ }
    if (!Array.isArray(this.data.users)) this.data.users = [];
    // Remove senhas em texto puro de registros antigos (proteção retroativa)
    this.data.users.forEach(function (u) { delete u._rawPw; });
    if (!Array.isArray(this.data.boards)) this.data.boards = [];
    if (!Array.isArray(this.data.docs)) this.data.docs = [];
    // Migrate legacy inline-base64 attachments in docs → IDB
    this.data.docs.forEach(function (doc) {
      if (Array.isArray(doc.attachments) && doc.attachments.some(function (a) { return !!a.data; })) {
        AttachmentIDB.migrate(doc.attachments, function () { Store.save(); });
      }
    });
    if (!this.data.ticketCounter) this.data.ticketCounter = 0;
    if (!this.data.settings) this.data.settings = {};
    if (!this.data.settings.companyName) this.data.settings.companyName = 'Mottion Desk';
    // Seed admin tratado de forma assíncrona em ensureAdminAsync() (PBKDF2 requer async)
    // Migrate old boards
    for (var i = 0; i < this.data.boards.length; i++) {
      var b = this.data.boards[i];
      if (!Array.isArray(b.lists)) b.lists = [];
      if (!b.viewMode) b.viewMode = 'board';
      if (!Array.isArray(b.labels)) b.labels = [];
      if (!b.bgStyle) b.bgStyle = 'tint';
      for (var j = 0; j < b.lists.length; j++) {
        if (!Array.isArray(b.lists[j].cards)) b.lists[j].cards = [];
        for (var k = 0; k < b.lists[j].cards.length; k++) {
          var _c = b.lists[j].cards[k];
          if (!Array.isArray(_c.comments)) _c.comments = [];
          if (!Array.isArray(_c.attachments)) _c.attachments = [];
          if (_c.estimate === undefined) _c.estimate = '';
          if (!Array.isArray(_c.labels)) _c.labels = [];
          if (!Array.isArray(_c.checklist)) _c.checklist = [];
          if (!Array.isArray(_c.activity)) _c.activity = [];
          // Migrate legacy inline-base64 attachments → IDB
          if (_c.attachments.some(function (a) { return !!a.data; })) {
            AttachmentIDB.migrate(_c.attachments, function () { Store.save(); });
          }
        }
      }
    }
  },
  save: function () {
    this.invalidateStatsCache();
    clearTimeout(this._saveTimer);
    var self = this;
    this._saveTimer = setTimeout(function () {
      // Trim activity logs para no máximo 20 entradas por card (reduz tamanho do payload)
      for (var bi = 0; bi < self.data.boards.length; bi++) {
        var brd = self.data.boards[bi];
        for (var li = 0; li < brd.lists.length; li++) {
          for (var ci = 0; ci < brd.lists[li].cards.length; ci++) {
            var _c = brd.lists[li].cards[ci];
            if (Array.isArray(_c.activity) && _c.activity.length > 20) _c.activity = _c.activity.slice(0, 20);
          }
        }
      }
      var payload = JSON.stringify(self.data);
      try {
        localStorage.setItem(SKEY, payload);
      } catch (e) {
        // Cota excedida — alert de emergência
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          showToast('⚠️ Armazenamento local cheio! Exporte seus dados e limpe o histórico.', 'error');
        }
        return;
      }
      // Aviso preventivo quando > 70% da cota estimada (5 MB)
      if (payload.length > 3670016 && !self._quotaWarnedAt) {
        self._quotaWarnedAt = Date.now();
        showToast('Atenção: armazenamento local acima de 70%. Considere exportar dados antigos.', 'error');
      } else if (payload.length <= 3670016) {
        self._quotaWarnedAt = null;
      }
      if (window._broadcastChannel) window._broadcastChannel.postMessage('sync');
    }, 100);
  },

  // Auth
  register: async function (name, email, pw, deptId, role) {
    var emailLc = email.toLowerCase();
    if (this.data.users.find(function (u) { return u.email.toLowerCase() === emailLc; })) return null;
    var isFirst = this.data.users.length === 0;
    var salt   = _generateSalt();
    var pwHash = await _hashPassword(pw, salt);
    var u = { id: uid(), name: name, email: email, pwHash: pwHash, pwHashSalt: salt, department: deptId, role: role || 'Colaborador', isAdmin: isFirst, createdAt: Date.now() };
    this.data.users.push(u);
    this.data.currentUserId = u.id;
    _createSession(u.id, u.isAdmin);
    this.save();
    return u;
  },
  login: async function (email, pw) {
    var emailLc = email.toLowerCase();
    // Verificar bloqueio por tentativas excessivas
    var ls = _getLoginState(emailLc);
    if (ls.until > Date.now()) return { locked: true, until: ls.until };

    var u = this.data.users.find(function (x) { return x.email.toLowerCase() === emailLc; });
    if (!u) { _recordFailedLogin(emailLc); return null; }

    var valid = false;
    if (u.pwHashSalt) {
      // Formato PBKDF2 (novo)
      valid = await _verifyPassword(pw, u.pwHashSalt, u.pwHash);
    } else {
      // Formato legado (djb2) — valida e migra automaticamente
      valid = (u.pwHash === _legacyHash(pw));
      if (valid) {
        var salt = _generateSalt();
        u.pwHashSalt = salt;
        u.pwHash = await _hashPassword(pw, salt);
        this.save();
      }
    }

    if (!valid) { _recordFailedLogin(emailLc); return null; }

    _clearLoginState(emailLc);
    this.data.currentUserId = u.id;
    _createSession(u.id, u.isAdmin);
    this.save();
    return u;
  },
  logout: function () { this.data.currentUserId = null; _clearSession(); this.save(); },
  ensureAdminAsync: async function () {
    var hasAdmin = this.data.users.some(function (u) { return u.isAdmin; });
    if (hasAdmin) return;
    var existing = this.data.users.find(function (u) { return u.email === 'admin@mottion.com'; });
    if (existing) {
      existing.isAdmin = true;
    } else {
      var salt   = _generateSalt();
      var pwHash = await _hashPassword('admin@123', salt);
      this.data.users.unshift({ id: 'master-admin-001', name: 'Admin Master', email: 'admin@mottion.com', pwHash: pwHash, pwHashSalt: salt, department: 'ti', role: 'Administrador', isAdmin: true, createdAt: Date.now() });
    }
    localStorage.setItem(SKEY, JSON.stringify(this.data));
  },
  me: function () { var id = this.data.currentUserId; return this.data.users.find(function (u) { return u.id === id; }) || null; },
  user: function (id) { return this.data.users.find(function (u) { return u.id === id; }) || null; },
  allUsers: function () { return this.data.users; },

  // Boards
  boards: function () { return this.data.boards; },
  board: function (id) { return this.data.boards.find(function (b) { return b.id === id; }); },
  createBoard: function (name, deptId, bgId) {
    var bg = BG_COLORS.find(function (c) { return c.id === bgId; }) || BG_COLORS[0];
    var b = { id: uid(), name: name, departmentId: deptId, background: bg, bgStyle: 'tint', viewMode: 'board', lists: DEFAULT_LISTS.map(function (n) { return { id: uid(), name: n, cards: [] }; }), createdAt: Date.now() };
    this.data.boards.push(b);
    this.save();
    return b;
  },
  deleteBoard: function (id) {
    var b = this.board(id);
    if (b) {
      var ids = [];
      for (var i = 0; i < b.lists.length; i++)
        for (var j = 0; j < b.lists[i].cards.length; j++) {
          var atts = b.lists[i].cards[j].attachments || [];
          for (var k = 0; k < atts.length; k++) ids.push(atts[k].id);
        }
      if (ids.length) AttachmentIDB.deleteMany(ids);
    }
    this.data.boards = this.data.boards.filter(function (b) { return b.id !== id; });
    this.save();
  },

  // Lists
  addList: function (boardId, name) {
    var b = this.board(boardId); if (!b) return;
    var l = { id: uid(), name: name, cards: [] };
    b.lists.push(l); this.save(); return l;
  },
  renameList: function (boardId, listId, name) {
    var b = this.board(boardId); if (!b) return;
    var l = b.lists.find(function (x) { return x.id === listId; });
    if (l) { l.name = name; this.save(); }
  },
  deleteList: function (boardId, listId) {
    var b = this.board(boardId); if (!b) return;
    b.lists = b.lists.filter(function (x) { return x.id !== listId; });
    this.save();
  },

  // Docs
  docs: function () { return this.data.docs || []; },
  addDoc: function (title, content, category) {
    if (!this.data.docs) this.data.docs = [];
    var d = { id: uid(), title: title, content: content, category: category || 'Geral', authorId: this.me().id, attachments: [], createdAt: Date.now(), updatedAt: Date.now() };
    this.data.docs.push(d);
    this.save();
    return d;
  },
  updateDoc: function (id, title, content, category) {
    var d = this.data.docs.find(function (x) { return x.id === id; });
    if (d) { d.title = title; d.content = content; d.category = category; d.updatedAt = Date.now(); this.save(); }
  },
  deleteDoc: function (id) {
    var doc = this.data.docs.find(function (x) { return x.id === id; });
    if (doc && Array.isArray(doc.attachments) && doc.attachments.length > 0) {
      AttachmentIDB.deleteMany(doc.attachments.map(function (a) { return a.id; }));
    }
    this.data.docs = this.data.docs.filter(function (x) { return x.id !== id; });
    this.save();
  },

  // Cards (Tickets)
  nextTicket: function () { this.data.ticketCounter = (this.data.ticketCounter || 0) + 1; this.save(); return this.data.ticketCounter; },
  addCard: function (boardId, listId, title) {
    var b = this.board(boardId); if (!b) return null;
    var l = b.lists.find(function (x) { return x.id === listId; }); if (!l) return null;
    var me = this.me();
    var c = {
      id: uid(), ticketNumber: this.nextTicket(), title: title, description: '',
      priority: 'medium', category: 'Solicitação', recurrence: 'none', dueDate: '', estimate: '',
      requesterId: me ? me.id : null, requesterDept: me ? me.department : null,
      targetDept: b.departmentId || null, assigneeId: null,
      labels: [], checklist: [], comments: [], attachments: [],
      createdAt: Date.now(), updatedAt: Date.now()
    };
    l.cards.push(c); this.save(); return c;
  },
  cloneCard: function (boardId, listId, cardId) {
    var b = this.board(boardId); if (!b) return null;
    var l = b.lists.find(function (x) { return x.id === listId; }); if (!l) return null;
    var src = l.cards.find(function (x) { return x.id === cardId; }); if (!src) return null;
    var clone = JSON.parse(JSON.stringify(src));
    clone.id = uid();
    clone.ticketNumber = this.nextTicket();
    clone.title = src.title + ' (Cópia)';
    clone.createdAt = Date.now();
    clone.updatedAt = Date.now();
    clone.comments = [];
    clone.activity = [];
    clone.checklist = clone.checklist.map(function (item) { return Object.assign({}, item, { id: uid(), done: false }); });
    clone.attachments = [];
    clone.csat = null;
    clone.waitingSince = undefined;
    clone.waitingTotal = 0;
    clone.completedAt = undefined;
    clone.linkedTickets = [];
    var idx = l.cards.findIndex(function (x) { return x.id === cardId; });
    l.cards.splice(idx + 1, 0, clone);
    this.audit('clone_ticket', '#' + src.ticketNumber + ' → #' + clone.ticketNumber);
    this.save();
    return clone;
  },
  card: function (boardId, listId, cardId) {
    var b = this.board(boardId); if (!b) return null;
    var l = b.lists.find(function (x) { return x.id === listId; }); if (!l) return null;
    return l.cards.find(function (x) { return x.id === cardId; }) || null;
  },
  findCard: function (cardId) {
    for (var i = 0; i < this.data.boards.length; i++) {
      var b = this.data.boards[i];
      for (var j = 0; j < b.lists.length; j++) {
        var l = b.lists[j];
        var c = l.cards.find(function (x) { return x.id === cardId; });
        if (c) return { boardId: b.id, listId: l.id, card: c };
      }
    }
    return null;
  },
  updateCard: function (boardId, listId, cardId, updates) {
    var c = this.card(boardId, listId, cardId);
    if (c) { Object.assign(c, updates, { updatedAt: Date.now() }); this.save(); }
  },
  deleteCard: function (boardId, listId, cardId) {
    var b = this.board(boardId); if (!b) return;
    var l = b.lists.find(function (x) { return x.id === listId; }); if (!l) return;
    var card = l.cards.find(function (x) { return x.id === cardId; });
    if (card && Array.isArray(card.attachments) && card.attachments.length > 0) {
      AttachmentIDB.deleteMany(card.attachments.map(function (a) { return a.id; }));
    }
    l.cards = l.cards.filter(function (x) { return x.id !== cardId; });
    this.save();
  },
  moveCard: function (boardId, fromListId, toListId, fromIdx, toIdx) {
    var b = this.board(boardId); if (!b) return;
    var fl = b.lists.find(function (x) { return x.id === fromListId; });
    var tl = b.lists.find(function (x) { return x.id === toListId; });
    if (!fl || !tl) return;
    var moved = fl.cards.splice(fromIdx, 1)[0];
    if (!moved) return;
    if (b.lists[b.lists.length - 1].id === toListId) {
      moved.completedAt = Date.now();
    } else {
      delete moved.completedAt;
    }
    tl.cards.splice(toIdx, 0, moved);
    this.save();
  },
  addComment: function (boardId, listId, cardId, text) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    if (!c.comments) c.comments = [];
    var me = this.me();
    c.comments.push({ id: uid(), authorId: me ? me.id : null, text: text, createdAt: Date.now() });
    this.save();
  },
  deleteComment: function (boardId, listId, cardId, commentId) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    if (!c.comments) return;
    c.comments = c.comments.filter(function(cm) { return cm.id !== commentId; });
    this.save();
  },

  // Stats — com cache (invalidado em save() e por TTL)
  stats: function () {
    var me = this.me();
    var meId = me ? me.id : null;
    var now = Date.now();

    // Cache hit: mesmo usuário e dentro do TTL
    if (
      this._statsCache &&
      this._statsCache._meId === meId &&
      (now - this._statsCacheAt) < this._statsCacheTTL
    ) {
      return this._statsCache;
    }

    var open = 0, progress = 0, done = 0, overdue = 0, myTickets = [];
    for (var i = 0; i < this.data.boards.length; i++) {
      var b = this.data.boards[i];
      for (var j = 0; j < b.lists.length; j++) {
        var l = b.lists[j];
        var isLast = j === b.lists.length - 1;
        for (var k = 0; k < l.cards.length; k++) {
          var c = l.cards[k];
          if (isLast) done++;
          else if (j === 0) open++;
          else progress++;
          if (c.dueDate && parseDate(c.dueDate).getTime() < now && !isLast) overdue++;
          if (me && (c.assigneeId === me.id || c.requesterId === me.id)) {
            myTickets.push({ card: c, listName: l.name, boardId: b.id, listId: l.id, boardName: b.name, isDone: isLast });
          }
        }
      }
    }
    myTickets.sort(function (a, b) { return b.card.createdAt - a.card.createdAt; });

    var result = { open: open, progress: progress, done: done, overdue: overdue, myTickets: myTickets, _meId: meId };
    this._statsCache = result;
    this._statsCacheAt = now;
    return result;
  },

  // Global search
  search: function (q) {
    q = (q || '').toLowerCase().trim();
    if (!q || q.length < 2) return [];
    var results = [];
    for (var i = 0; i < this.data.boards.length; i++) {
      var b = this.data.boards[i];
      if ((b.name || '').toLowerCase().indexOf(q) >= 0) {
        results.push({ type: 'board', title: b.name, id: b.id, subtitle: dept(b.departmentId).name });
      }
      for (var j = 0; j < b.lists.length; j++) {
        var l = b.lists[j];
        for (var k = 0; k < l.cards.length; k++) {
          var c = l.cards[k];
          if ((c.title || '').toLowerCase().indexOf(q) >= 0 || String(c.ticketNumber).indexOf(q) >= 0) {
            results.push({ type: 'card', title: '#' + String(c.ticketNumber).padStart(3, '0') + ' — ' + c.title, id: c.id, boardId: b.id, listId: l.id, subtitle: b.name });
          }
        }
      }
    }
    return results.slice(0, 12);
  },

  // Board Labels
  addBoardLabel: function (boardId, name, color) {
    var b = this.board(boardId); if (!b) return null;
    var lbl = { id: uid(), name: name, color: color };
    b.labels.push(lbl); this.save(); return lbl;
  },
  deleteBoardLabel: function (boardId, labelId) {
    var b = this.board(boardId); if (!b) return;
    b.labels = b.labels.filter(function (l) { return l.id !== labelId; });
    for (var i = 0; i < b.lists.length; i++)
      for (var j = 0; j < b.lists[i].cards.length; j++) {
        var c = b.lists[i].cards[j];
        if (Array.isArray(c.labels)) c.labels = c.labels.filter(function (id) { return id !== labelId; });
      }
    this.save();
  },
  toggleCardLabel: function (boardId, listId, cardId, labelId) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    if (!Array.isArray(c.labels)) c.labels = [];
    var idx = c.labels.indexOf(labelId);
    if (idx >= 0) c.labels.splice(idx, 1); else c.labels.push(labelId);
    this.save();
  },

  // Checklist
  addChecklistItem: function (boardId, listId, cardId, text) {
    var c = this.card(boardId, listId, cardId); if (!c) return null;
    if (!Array.isArray(c.checklist)) c.checklist = [];
    var item = { id: uid(), text: text, done: false, createdAt: Date.now() };
    c.checklist.push(item); this.save(); return item;
  },
  toggleChecklist: function (boardId, listId, cardId, itemId) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    var item = (c.checklist || []).find(function (x) { return x.id === itemId; });
    if (item) { item.done = !item.done; this.save(); }
  },
  deleteChecklistItem: function (boardId, listId, cardId, itemId) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    c.checklist = (c.checklist || []).filter(function (x) { return x.id !== itemId; });
    this.save();
  },

  // Activity log
  addActivity: function (boardId, listId, cardId, action, detail) {
    var c = this.card(boardId, listId, cardId); if (!c) return;
    if (!Array.isArray(c.activity)) c.activity = [];
    var me = this.me();
    c.activity.unshift({ id: uid(), action: action, detail: detail || '', userId: me ? me.id : null, createdAt: Date.now() });
    if (c.activity.length > 50) c.activity = c.activity.slice(0, 50);
    this.save();
  },

  // Audit Log (admin actions)
  audit: function (action, detail) {
    if (!this.data.auditLog) this.data.auditLog = [];
    var me = this.me();
    this.data.auditLog.unshift({ id: uid(), action: action, detail: detail || '', userId: me ? me.id : null, at: Date.now() });
    if (this.data.auditLog.length > 500) this.data.auditLog = this.data.auditLog.slice(0, 500);
    this.save();
  },

  // SLA Pause / Resume
  pauseSla: function (boardId, listId, cardId) {
    var c = this.card(boardId, listId, cardId);
    if (!c || c.waitingSince) return;
    c.waitingSince = Date.now();
    c.updatedAt = Date.now();
    this.addActivity(boardId, listId, cardId, 'pausou o SLA', 'Aguardando resposta');
    this.save();
  },
  resumeSla: function (boardId, listId, cardId) {
    var c = this.card(boardId, listId, cardId);
    if (!c || !c.waitingSince) return;
    c.waitingTotal = (c.waitingTotal || 0) + (Date.now() - c.waitingSince);
    delete c.waitingSince;
    c.updatedAt = Date.now();
    this.addActivity(boardId, listId, cardId, 'retomou o SLA', '');
    this.save();
  },

  // CSV Export
  exportCSV: function () {
    var rows = [['#', 'Título', 'Quadro', 'Status', 'Prioridade', 'Categoria', 'Responsável', 'Vencimento', 'Criado em']];
    for (var i = 0; i < this.data.boards.length; i++) {
      var b = this.data.boards[i];
      for (var j = 0; j < b.lists.length; j++) {
        var l = b.lists[j];
        for (var k = 0; k < l.cards.length; k++) {
          var c = l.cards[k];
          var asgn = c.assigneeId ? (this.user(c.assigneeId) || {}).name || '' : '';
          rows.push([
            '#' + String(c.ticketNumber).padStart(3, '0'),
            '"' + (c.title || '').replace(/"/g, '""') + '"',
            '"' + (b.name || '').replace(/"/g, '""') + '"',
            '"' + (l.name || '').replace(/"/g, '""') + '"',
            c.priority || '',
            c.category || '',
            '"' + asgn.replace(/"/g, '""') + '"',
            c.dueDate || '',
            c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-BR') : ''
          ]);
        }
      }
    }
    var csv = rows.map(function (r) { return r.join(','); }).join('\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'tickets_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  },

  exportQualityCSV: function (period) {
    var now = Date.now();
    var since = period === '30' ? now - 30 * 86400000 : period === '90' ? now - 90 * 86400000 : period === '365' ? now - 365 * 86400000 : 0;
    var rows = [['#', 'Título', 'Quadro', 'Status', 'Prioridade', 'Categoria', 'Setor', 'Responsável', 'CSAT', 'SLA Cumprido', 'Tempo Resolução (h)', 'Criado em', 'Concluído em']];
    var bs = this.boards();
    for (var i = 0; i < bs.length; i++) {
      var b = bs[i];
      var deptName = dept(b.departmentId).name;
      for (var j = 0; j < b.lists.length; j++) {
        var l = b.lists[j];
        var isLast = j === b.lists.length - 1;
        for (var k = 0; k < l.cards.length; k++) {
          var c = l.cards[k];
          if ((c.createdAt || 0) < since) continue;
          var asgn = c.assigneeId ? (this.user(c.assigneeId) || {}).name || '' : '';
          var slaH2 = getSlaH()[c.priority] || 24;
          var waitedMs = (c.waitingTotal || 0);
          var elapsedMs = isLast && c.completedAt ? Math.max(0, (c.completedAt - (c.createdAt || c.completedAt)) - waitedMs) : null;
          var slaMet = isLast && elapsedMs !== null ? (elapsedMs <= slaH2 * 3600000 ? 'Sim' : 'Não') : '';
          var resolH = elapsedMs !== null ? (elapsedMs / 3600000).toFixed(2) : '';
          var csatRating = c.csat ? c.csat.rating : '';
          rows.push([
            '#' + String(c.ticketNumber).padStart(3, '0'),
            '"' + (c.title || '').replace(/"/g, '""') + '"',
            '"' + (b.name || '').replace(/"/g, '""') + '"',
            '"' + (l.name || '').replace(/"/g, '""') + '"',
            c.priority || '', c.category || '',
            '"' + deptName.replace(/"/g, '""') + '"',
            '"' + asgn.replace(/"/g, '""') + '"',
            csatRating, slaMet, resolH,
            c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-BR') : '',
            c.completedAt ? new Date(c.completedAt).toLocaleDateString('pt-BR') : ''
          ]);
        }
      }
    }
    var csv = rows.map(function (r) { return r.join(','); }).join('\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'metricas_qualidade_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  },

  // ─── ADMIN METHODS ────────────────────────────────────────
  isAdmin: function (userId) {
    if (userId) {
      // Verificação de outro usuário — apenas lê a flag do dado
      var tu = this.user(userId);
      return tu && tu.isAdmin === true;
    }
    // Verificação do usuário atual — exige sessão válida no sessionStorage
    var me = this.me();
    if (!me || !me.isAdmin) return false;
    var sess = _getSession();
    return sess !== null && sess.uid === me.id && sess.adm === true;
  },
  updateUser: async function (userId, updates) {
    var u = this.user(userId);
    if (!u) return;
    if (updates.name !== undefined)       u.name = updates.name;
    if (updates.email !== undefined)      u.email = updates.email;
    if (updates.role !== undefined)       u.role = updates.role;
    if (updates.department !== undefined) u.department = updates.department;
    if (updates.isAdmin !== undefined)    u.isAdmin = updates.isAdmin;
    if (updates.newPw) {
      var salt   = _generateSalt();
      u.pwHashSalt = salt;
      u.pwHash   = await _hashPassword(updates.newPw, salt);
    }
    this.save();
  },
  deleteUser: function (userId) {
    if (userId === this.data.currentUserId) return false;
    this.data.users = this.data.users.filter(function (u) { return u.id !== userId; });
    this.save();
    return true;
  },
  addUser: async function (name, email, pw, deptId, role, isAdmin) {
    var emailLc = email.toLowerCase();
    if (this.data.users.find(function (u) { return u.email.toLowerCase() === emailLc; })) return null;
    var salt   = _generateSalt();
    var pwHash = await _hashPassword(pw, salt);
    var u = { id: uid(), name: name, email: email, pwHash: pwHash, pwHashSalt: salt, department: deptId, role: role || 'Colaborador', isAdmin: !!isAdmin, phone: '', notes: '', createdAt: Date.now() };
    this.data.users.push(u);
    this.save();
    return u;
  },
  saveSetting: function (key, value) {
    if (!this.data.settings) this.data.settings = {};
    this.data.settings[key] = value;
    this.save();
  },
  getSetting: function (key, fallback) {
    if (!this.data.settings) return fallback;
    return this.data.settings[key] !== undefined ? this.data.settings[key] : fallback;
  }
};

// ─── MULTI-TAB SYNC ─────────────────────────────────────────
if (typeof BroadcastChannel !== 'undefined') {
  window._broadcastChannel = new BroadcastChannel('mottion_desk_sync');
  window._broadcastChannel.onmessage = function () {
    Store.load();
    var badge = document.createElement('div');
    badge.className = 'sync-badge';
    badge.textContent = 'Dados sincronizados de outra aba';
    document.body.appendChild(badge);
    setTimeout(function () { badge.remove(); }, 2500);
    if (Store.me()) {
      if (App.view === 'board') renderBoard();
      else if (App.view === 'dashboard') renderDashboard();
      else if (App.view === 'mytasks') renderMyTasks();
    }
  };
}

// ─── ATTACHMENT MANAGER (ANEXOS) ────────────────────────────
// ─── INDEXED DB — BLOB STORAGE ──────────────────────────────
// Stores raw dataURL strings keyed by attachment id.
// Falls back gracefully to in-memory if IDB is unavailable.
var AttachmentIDB = (function () {
  var DB_NAME    = 'mottion_attachments';
  var STORE_NAME = 'blobs';
  var DB_VERSION = 1;
  var _db        = null;       // IDBDatabase once opened
  var _queue     = [];         // callbacks waiting for open
  var _failed    = false;      // true when IDB is unavailable
  var _memCache  = {};         // in-memory fallback / fast read cache

  function _open(cb) {
    if (_failed)        { cb(null); return; }
    if (_db)            { cb(_db);  return; }
    _queue.push(cb);
    if (_queue.length > 1) return; // already opening

    try {
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        e.target.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
      };
      req.onsuccess = function (e) {
        _db = e.target.result;
        var q = _queue.splice(0);
        for (var i = 0; i < q.length; i++) q[i](_db);
      };
      req.onerror = function () {
        _failed = true;
        var q = _queue.splice(0);
        for (var i = 0; i < q.length; i++) q[i](null);
      };
    } catch (ex) {
      _failed = true;
      var q = _queue.splice(0);
      for (var i = 0; i < q.length; i++) q[i](null);
    }
  }

  return {
    // Store one dataURL
    put: function (id, dataURL, cb) {
      _memCache[id] = dataURL;
      _open(function (db) {
        if (!db) { cb && cb(); return; }
        var tx  = db.transaction(STORE_NAME, 'readwrite');
        var req = tx.objectStore(STORE_NAME).put({ id: id, data: dataURL });
        req.onsuccess = function () { cb && cb(); };
        req.onerror   = function () { cb && cb(); };
      });
    },

    // Retrieve one dataURL → cb(dataURL | null)
    get: function (id, cb) {
      if (_memCache[id]) { cb(_memCache[id]); return; }
      _open(function (db) {
        if (!db) { cb(null); return; }
        var req = db.transaction(STORE_NAME, 'readonly')
                    .objectStore(STORE_NAME).get(id);
        req.onsuccess = function () {
          var val = req.result ? req.result.data : null;
          if (val) _memCache[id] = val;
          cb(val);
        };
        req.onerror = function () { cb(null); };
      });
    },

    // Retrieve many ids at once → cb({ id: dataURL, … })
    getMany: function (ids, cb) {
      if (!ids || ids.length === 0) { cb({}); return; }
      var result   = {};
      var missing  = [];
      for (var i = 0; i < ids.length; i++) {
        if (_memCache[ids[i]]) result[ids[i]] = _memCache[ids[i]];
        else missing.push(ids[i]);
      }
      if (missing.length === 0) { cb(result); return; }
      _open(function (db) {
        if (!db) { cb(result); return; }
        var store   = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME);
        var pending = missing.length;
        missing.forEach(function (id) {
          var req = store.get(id);
          req.onsuccess = function () {
            if (req.result) { result[id] = req.result.data; _memCache[id] = req.result.data; }
            if (--pending === 0) cb(result);
          };
          req.onerror = function () { if (--pending === 0) cb(result); };
        });
      });
    },

    // Delete one blob
    delete: function (id) {
      delete _memCache[id];
      _open(function (db) {
        if (!db) return;
        db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(id);
      });
    },

    // Delete multiple blobs (e.g. when a ticket is deleted)
    deleteMany: function (ids) {
      if (!ids || ids.length === 0) return;
      ids.forEach(function (id) { delete _memCache[id]; });
      _open(function (db) {
        if (!db) return;
        var tx = db.transaction(STORE_NAME, 'readwrite');
        var st = tx.objectStore(STORE_NAME);
        ids.forEach(function (id) { st.delete(id); });
      });
    },

    // One-time migration: move any base64 blob still embedded in a stub array
    // into IDB, then strip the .data field from each stub.
    // stubs  = array of attachment objects (mutated in place)
    // cb     = called when done (no args)
    migrate: function (stubs, cb) {
      if (!stubs || stubs.length === 0) { cb && cb(); return; }
      var toWrite = stubs.filter(function (a) { return !!a.data; });
      if (toWrite.length === 0) { cb && cb(); return; }
      var done = 0;
      toWrite.forEach(function (a) {
        AttachmentIDB.put(a.id, a.data, function () {
          delete a.data; // strip from localStorage payload
          if (++done === toWrite.length) cb && cb();
        });
      });
    }
  };
})();

// ─── ATTACHMENT MANAGER ──────────────────────────────────────
// Attachment stubs stored in localStorage: { id, name, type, size }
// Blobs (dataURL) live exclusively in IndexedDB.
var AttachmentManager = {

  // Read a File, write blob to IDB, return stub via callback
  processFile: function (file, callback) {
    var MAX = 50 * 1024 * 1024; // 50 MB — practical IDB limit
    if (file.size > MAX) {
      showToast('Arquivo muito grande (máx. 50 MB).', 'error');
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataURL = e.target.result;
      var stub    = { id: uid(), name: file.name, type: file.type, size: file.size };
      AttachmentIDB.put(stub.id, dataURL, function () {
        callback(stub);
      });
    };
    reader.readAsDataURL(file);
  },

  // Render attachment thumbnails, loading blobs from IDB as needed.
  // attachments = array of stubs (no .data)
  render: function (containerId, attachments, onRemove) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (attachments.length === 0) {
      container.innerHTML = '';
      return;
    }

    // Show loading placeholders immediately so layout doesn't jump
    var placeholderHtml = '';
    for (var pi = 0; pi < attachments.length; pi++) {
      placeholderHtml += '<div class="attach-item attach-loading" data-id="' + attachments[pi].id + '" style="cursor:pointer">' +
        '<div class="attach-placeholder"></div>' +
        '<div class="attach-item-del" data-id="' + attachments[pi].id + '">✕</div></div>';
    }
    container.innerHTML = placeholderHtml;

    // Bind delete handlers on placeholders immediately (feels responsive)
    container.querySelectorAll('.attach-item-del').forEach(function (btn) {
      btn.onclick = function (e) {
        e.stopPropagation();
        onRemove(btn.dataset.id);
      };
    });

    // Fetch all blobs from IDB in one batch request
    var ids = attachments.map(function (a) { return a.id; });
    AttachmentIDB.getMany(ids, function (blobMap) {
      // Re-check container is still mounted
      if (!document.getElementById(containerId)) return;

      for (var i = 0; i < attachments.length; i++) {
        var a      = attachments[i];
        var dataURL = blobMap[a.id] || null;
        var item   = container.querySelector('.attach-item[data-id="' + a.id + '"]');
        if (!item) continue;

        var isImg     = a.type && a.type.startsWith('image/');
        var shortName = a.name.length > 14 ? a.name.slice(0, 12) + '\u2026' : a.name;

        var preview;
        if (dataURL) {
          preview = isImg
            ? '<img src="' + dataURL + '" title="' + esc(a.name) + '">'
            : '<div class="attach-file-icon" title="' + esc(a.name) + '">📄<div class="attach-fname">' + esc(shortName) + '</div></div>';
        } else {
          // Blob not found (IDB cleared?) — show file icon with warning
          preview = '<div class="attach-file-icon" title="' + esc(a.name) + ' (indisponível)">⚠️<div class="attach-fname">' + esc(shortName) + '</div></div>';
        }

        item.classList.remove('attach-loading');
        // Replace inner content while keeping the delete button
        var delBtn = item.querySelector('.attach-item-del').outerHTML;
        item.innerHTML = preview + delBtn;

        // Re-bind click on the refreshed item (delete is inside the new innerHTML)
        item.querySelector('.attach-item-del').onclick = (function (id) {
          return function (e) { e.stopPropagation(); onRemove(id); };
        })(a.id);

        item.onclick = (function (stub, url) {
          return function (e) {
            if (e.target.closest('.attach-item-del')) return;
            if (url) AttachmentManager._showViewer(stub, url);
          };
        })(a, dataURL);
      }
    });
  },

  // Open full-screen viewer — receives stub + already-resolved dataURL
  _showViewer: function (a, dataURL) {
    var isImg   = a.type && a.type.startsWith('image/');
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:zoom-out';
    var inner = isImg
      ? '<img src="' + dataURL + '" style="max-width:90vw;max-height:78vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,0.6);cursor:default">'
      : '<div style="font-size:72px;margin-bottom:12px">📄</div><div style="color:#fff;font-size:15px;margin-bottom:20px;max-width:400px;text-align:center;word-break:break-all">' + esc(a.name) + '</div>';
    overlay.innerHTML = inner +
      '<div style="margin-top:18px;display:flex;gap:10px" onclick="event.stopPropagation()">' +
      '<a href="' + dataURL + '" download="' + esc(a.name) + '" style="background:#6c5ce7;color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">⬇ Baixar</a>' +
      '</div>' +
      '<button onclick="this.closest(\'[data-view]\').remove()" style="position:absolute;top:16px;right:20px;background:none;border:none;color:#fff;font-size:26px;cursor:pointer;line-height:1;padding:4px">✕</button>';
    overlay.dataset.view = '1';
    overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
  },

  // Public view() — loads blob on-demand then opens viewer.
  // Works for stubs that may still have .data (legacy) or need IDB fetch.
  view: function (a) {
    if (a.data) { this._showViewer(a, a.data); return; }
    AttachmentIDB.get(a.id, function (dataURL) {
      if (dataURL) AttachmentManager._showViewer(a, dataURL);
      else showToast('Arquivo não encontrado no armazenamento local.', 'error');
    });
  },

  bind: function (zoneId, containerId, targetArray, saveCallback) {
    var zone = document.getElementById(zoneId);
    if (!zone) return;

    var fileInput    = document.createElement('input');
    fileInput.type   = 'file';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    zone.appendChild(fileInput);

    var removeHandler = function (idToRemove) {
      var idx = targetArray.findIndex(function (x) { return x.id === idToRemove; });
      if (idx >= 0) {
        AttachmentIDB.delete(targetArray[idx].id);
        targetArray.splice(idx, 1);
        saveCallback();
        AttachmentManager.render(containerId, targetArray, removeHandler);
      }
    };

    var handleFiles = function (files) {
      Array.from(files).forEach(function (f) {
        AttachmentManager.processFile(f, function (stub) {
          targetArray.push(stub);
          saveCallback();
          AttachmentManager.render(containerId, targetArray, removeHandler);
        });
      });
    };

    AttachmentManager.render(containerId, targetArray, removeHandler);

    zone.onclick        = function ()  { fileInput.click(); };
    fileInput.onchange  = function (e) { handleFiles(e.target.files); fileInput.value = ''; };
    zone.ondragover     = function (e) { e.preventDefault(); zone.classList.add('dragover'); };
    zone.ondragleave    = function (e) { e.preventDefault(); zone.classList.remove('dragover'); };
    zone.ondrop         = function (e) { e.preventDefault(); zone.classList.remove('dragover'); handleFiles(e.dataTransfer.files); };

    document.onpaste = function (e) {
      var items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') handleFiles([items[i].getAsFile()]);
      }
    };
  },

  unbindGlobalPaste: function () {
    document.onpaste = null;
  }
};

// ─── APP STATE ──────────────────────────────────────────────
var App = {
  view: 'auth',       // 'auth' | 'dashboard' | 'mytasks' | 'board' | 'calendar' | 'admin'
  authMode: 'login',  // 'login' | 'register'
  boardId: null,
  calView: 'month',   // 'month' | 'week' | 'agenda'
  calBoard: '',
  calAssignee: '',
  docSort: 'newest',  // 'newest' | 'oldest' | 'alpha'
  docView: 'grid',    // 'grid' | 'list'
  docSearch: '',
  docRecentlyViewed: [],
  dragData: null,
  activeDocCat: 'Todas',
  activeDocId: null,
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  boardFilter: { search: '', priority: '', assignee: '' },
  dashFilter: { kpi: '', priority: '', status: '', assignee: '', search: '' },
  adminTab: 'users',
  qualityPeriod: '90',
  bulkMode: false,
  bulkSelected: [],
  userSearch: '',
  userFilterDept: '',
  userFilterRole: '',
  userSort: 'name',
  selectedUsers: []
};

var $app = document.getElementById('app');

// ─── BOOTSTRAP — theme ──────────────────────────────────────
(function _bootstrapTheme() {
  var saved = localStorage.getItem('md-theme') || localStorage.getItem('servicedesk_theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // default: dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// ─── GUARD: Autenticação via API Backend ─────────────────────
// Se api.js estiver carregado e não houver JWT, exibe a tela de login
// do backend antes de qualquer inicialização do Store.
// O login salva o token e recarrega a página, retomando o fluxo normal.
var _apiLoginShown = false;
if (typeof Auth !== 'undefined' && typeof renderAPILogin !== 'undefined') {
  if (!Auth.isLoggedIn()) {
    _apiLoginShown = true;
    renderAPILogin();
  }
}

if (!_apiLoginShown) {

Store.load();

// ─── PONTE API → STORE ───────────────────────────────────────
// Quando o usuário autenticou via API (JWT presente), injeta-o no
// Store local para que Store.me() funcione e a tela antiga de login
// nunca seja exibida. Cria o usuário no Store se ainda não existir.
(function _bridgeAPIUser() {
  if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) return;
  var apiUser = Auth.getUser();
  if (!apiUser || !apiUser.email) return;

  var emailLc = apiUser.email.toLowerCase();

  // Procura usuário já existente no Store (por e-mail)
  var storeUser = Store.data.users.find(function (u) {
    return (u.email || '').toLowerCase() === emailLc;
  });

  // Se não existe, cria uma entrada sintética no Store
  if (!storeUser) {
    storeUser = {
      id:          'api_' + apiUser.id,
      name:        apiUser.nome || apiUser.name || apiUser.email,
      email:       apiUser.email,
      isAdmin:     apiUser.perfil === 'admin',
      role:        apiUser.perfil === 'admin'  ? 'Administrador'
                 : apiUser.perfil === 'agente' ? 'Agente'
                 :                               'Colaborador',
      department:  apiUser.setor_id ? String(apiUser.setor_id) : '',
      phone:       '',
      notes:       'Conta sincronizada via API.',
      pwHash:      '__api_auth__',
      pwHashSalt:  '__api_auth__',
      createdAt:   Date.now(),
    };
    Store.data.users.push(storeUser);
    Store.save();
  }

  // Abre a sessão local para o usuário encontrado/criado
  Store.data.currentUserId = storeUser.id;
  _createSession(storeUser.id, storeUser.isAdmin);
})();
// ─────────────────────────────────────────────────────────────

// ─── PATCHES Store ↔ API (fire-and-forget) ───────────────────
// Interceptam addCard / updateCard / deleteCard / moveCard para
// espelhar cada operação local no backend, sem bloquear a UI.
// Só atuam se Auth.isLoggedIn() e o card possuir _backendId.
(function _installStorePatches() {
  if (typeof API === 'undefined' || typeof Auth === 'undefined') return;

  // ── addCard ─────────────────────────────────────────────────
  var _origAdd = Store.addCard.bind(Store);
  Store.addCard = function (boardId, listId, title) {
    var card = _origAdd(boardId, listId, title);
    if (card && Auth.isLoggedIn()) {
      // Usa setTimeout(0) para capturar propriedades definidas logo após o retorno
      setTimeout(function () {
        var board    = Store.board(boardId);
        var list     = board ? board.lists.find(function (l) { return l.id === listId; }) : null;
        var listName = list ? list.name : 'Aberto';
        API.tickets.criar(_mapCardToApi(card, listName)).then(function (res) {
          if (res && res.success && res.data && res.data.id) {
            card._backendId = res.data.id;
            // Atualiza id para o padrão 'bk_' para consistência com syncTickets
            card.id = 'bk_' + res.data.id;
            Store.save();
          }
        }).catch(function (e) {
          console.warn('[API] addCard →', e.message);
        });
      }, 0);
    }
    return card;
  };

  // ── updateCard ───────────────────────────────────────────────
  var _origUpdate = Store.updateCard.bind(Store);
  Store.updateCard = function (boardId, listId, cardId, updates) {
    _origUpdate(boardId, listId, cardId, updates);
    if (!Auth.isLoggedIn()) return;
    var card = Store.card(boardId, listId, cardId);
    if (!card || !card._backendId) return;
    var board    = Store.board(boardId);
    var list     = board ? board.lists.find(function (l) { return l.id === listId; }) : null;
    var listName = list ? list.name : 'Aberto';
    API.tickets.atualizar(card._backendId, _mapCardToApi(card, listName))
      .catch(function (e) { console.warn('[API] updateCard →', e.message); });
  };

  // ── deleteCard ───────────────────────────────────────────────
  var _origDelete = Store.deleteCard.bind(Store);
  Store.deleteCard = function (boardId, listId, cardId) {
    // Captura _backendId ANTES de remover
    var card      = Store.card(boardId, listId, cardId);
    var backendId = card ? card._backendId : null;
    _origDelete(boardId, listId, cardId);
    if (backendId && Auth.isLoggedIn()) {
      API.tickets.excluir(backendId)
        .catch(function (e) { console.warn('[API] deleteCard →', e.message); });
    }
  };

  // ── moveCard (mudança de status por drag ou seleção de lista) ─
  var _origMove = Store.moveCard.bind(Store);
  Store.moveCard = function (boardId, fromListId, toListId, fromIdx, toIdx) {
    _origMove(boardId, fromListId, toListId, fromIdx, toIdx);
    if (!Auth.isLoggedIn() || fromListId === toListId) return;
    // Card já está na nova lista após o move original
    var board   = Store.board(boardId);
    var newList = board ? board.lists.find(function (l) { return l.id === toListId; }) : null;
    if (!newList) return;
    var card = newList.cards[toIdx] || newList.cards[newList.cards.length - 1];
    if (!card || !card._backendId) return;
    API.tickets.atualizar(card._backendId, _mapCardToApi(card, newList.name))
      .catch(function (e) { console.warn('[API] moveCard →', e.message); });
  };

})();
// ─────────────────────────────────────────────────────────────

Store.ensureAdminAsync().then(function () {
  if (Store.me()) {
    // Sessão não está em sessionStorage (ex: refresh) — forçar novo login
    if (!_getSession()) {
      Store.data.currentUserId = null;
      App.view = 'auth';
      renderAuth();
    } else {
      App.view = 'dashboard';
      renderApp();
      // Sincroniza tickets do backend em background após render inicial
      if (typeof syncTickets !== 'undefined') syncTickets();
    }
  } else {
    App.view = 'auth';
    renderAuth();
  }
});

// ─── GLOBAL CLICK HANDLER (closes overlays) ─────────────────
document.addEventListener('click', function (e) {
  if (!e.target.closest('#header-search')) {
    var sr = document.getElementById('search-results');
    if (sr) sr.classList.remove('visible');
  }
  if (!e.target.closest('#btn-notif') && !e.target.closest('#notif-panel')) {
    var np = document.getElementById('notif-panel');
    if (np) np.classList.remove('visible');
  }
  if (!e.target.closest('#header-avatar') && !e.target.closest('#user-menu')) {
    var um = document.getElementById('user-menu');
    if (um) um.classList.remove('visible');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var cmd = document.getElementById('cmd-palette');
    if (cmd) { cmd.remove(); return; }
    var mo = document.getElementById('modal-overlay');
    if (mo) { saveAndCloseModal(); return; }
    var po = document.getElementById('popup-overlay');
    if (po) { po.remove(); return; }
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    showCommandPalette();
    return;
  }
  if (e.target.matches('input,textarea,select')) return;
  if (e.key === '?') { showShortcutsModal(); return; }
  if (e.key === 'd' || e.key === 'D') { App.view = 'dashboard'; App.boardId = null; renderApp(); return; }
  if (e.key === 't' || e.key === 'T') { App.view = 'mytasks'; App.boardId = null; renderApp(); return; }
  if (e.key === 'c' || e.key === 'C') { App.view = 'calendar'; App.boardId = null; renderApp(); return; }
  if (e.key === 'q' || e.key === 'Q') { App.view = 'metrics'; App.boardId = null; renderApp(); return; }
  if ((e.key === 'n' || e.key === 'N') && App.view === 'board' && App.boardId) {
    var firstAddBtn = document.querySelector('.add-card-btn');
    if (firstAddBtn) firstAddBtn.click();
  }
});

} // end if (!_apiLoginShown) — guarda de autenticação da API

// ============================================================
// AUTH
// ============================================================
function renderAuth() {
  App.view = 'auth';
  if (App.authMode === 'login') {
    $app.innerHTML =
      '<div class="auth-wrapper"><div class="auth-card">' +
      '<div class="auth-logo">' + LOGO_42 + '<div class="auth-logo-text">' + WORDMARK_LG + '</div></div>' +
      '<p class="auth-subtitle">Sistema de Tickets de Serviço Interno</p>' +
      '<div class="auth-error" id="auth-error"></div>' +
      '<form class="auth-form" id="auth-form">' +
      '<div class="form-group"><label>Email</label><input class="form-input" type="email" id="f-email" required></div>' +
      '<div class="form-group"><label>Senha</label><input class="form-input" type="password" id="f-pw" required></div>' +
      '<button class="auth-btn" type="submit">Entrar</button>' +
      '</form>' +
      '<div class="auth-toggle">Não tem conta? <a id="go-register">Cadastre-se</a></div>' +
      '</div></div>';

    // Live countdown when email field loses focus and account is locked
    var _lockCountdown = null;
    document.getElementById('f-email').onblur = function () {
      var emailVal = this.value.trim().toLowerCase();
      if (!emailVal) return;
      var ls = _getLoginState(emailVal);
      if (ls.until <= Date.now()) return;
      var btn = document.querySelector('#auth-form button[type=submit]');
      function _updateLockUI() {
        var rem = ls.until - Date.now();
        if (rem <= 0) {
          clearInterval(_lockCountdown);
          _lockCountdown = null;
          if (btn) { btn.disabled = false; btn.textContent = 'Entrar'; }
          var errEl = document.getElementById('auth-error');
          if (errEl) errEl.classList.remove('show');
          return;
        }
        var s = Math.ceil(rem / 1000);
        var m = Math.floor(s / 60);
        var ss = s % 60;
        var label = m > 0 ? m + 'min ' + String(ss).padStart(2, '0') + 's' : ss + 's';
        authErr('Conta bloqueada. Tente em ' + label + '.');
        if (btn) { btn.disabled = true; btn.textContent = 'Aguarde ' + label; }
      }
      _updateLockUI();
      _lockCountdown = setInterval(_updateLockUI, 1000);
    };

    document.getElementById('auth-form').onsubmit = async function (e) {
      e.preventDefault();
      var emailVal = document.getElementById('f-email').value.trim();
      var pwVal    = document.getElementById('f-pw').value;
      var btn      = this.querySelector('button[type=submit]');

      // Verificar bloqueio antes de chamar Store.login
      var ls = _getLoginState(emailVal.toLowerCase());
      if (ls.until > Date.now()) {
        var rem = ls.until - Date.now();
        var s = Math.ceil(rem / 1000);
        var m = Math.floor(s / 60);
        var label = m > 0 ? m + 'min ' + String(s % 60).padStart(2, '0') + 's' : s + 's';
        authErr('Conta bloqueada. Tente em ' + label + '.');
        return;
      }

      btn.disabled = true; btn.textContent = 'Verificando...';
      var result = await Store.login(emailVal, pwVal);
      btn.disabled = false; btn.textContent = 'Entrar';

      if (result && result.locked) {
        authErr('Conta bloqueada por ' + _MAX_ATTEMPTS + ' tentativas. Tente em 5 minutos.');
      } else if (result) {
        App.view = 'dashboard'; renderApp();
      } else {
        var rem = _MAX_ATTEMPTS - (_getLoginState(emailVal.toLowerCase()).count);
        authErr('Email ou senha incorretos.' + (rem <= 2 ? ' (' + rem + ' tentativa(s) restante(s))' : ''));
      }
    };
    document.getElementById('go-register').onclick = function () { App.authMode = 'register'; renderAuth(); };

  } else {
    var opts = getDepts().map(function (d) { return '<option value="' + d.id + '">' + d.icon + ' ' + d.name + '</option>'; }).join('');
    $app.innerHTML =
      '<div class="auth-wrapper"><div class="auth-card">' +
      '<div class="auth-logo">' + LOGO_42 + '<div class="auth-logo-text">' + WORDMARK_LG + '</div></div>' +
      '<p class="auth-subtitle">Crie sua conta para começar</p>' +
      '<div class="auth-error" id="auth-error"></div>' +
      '<form class="auth-form" id="auth-form">' +
      '<div class="form-group"><label>Nome completo</label><input class="form-input" type="text" id="f-name" required></div>' +
      '<div class="form-group"><label>Email corporativo</label><input class="form-input" type="email" id="f-email" required></div>' +
      '<div class="form-row">' +
      '<div class="form-group"><label>Setor</label><select class="form-select" id="f-dept" required>' + opts + '</select></div>' +
      '<div class="form-group"><label>Cargo</label><input class="form-input" type="text" id="f-role" required></div>' +
      '</div>' +
      '<div class="form-group"><label>Senha</label><input class="form-input" type="password" id="f-pw" minlength="8" required placeholder="Mínimo 8 caracteres"></div>' +
      '<button class="auth-btn" type="submit">Criar Conta</button>' +
      '</form>' +
      '<div class="auth-toggle">Já tem conta? <a id="go-login">Faça login</a></div>' +
      '</div></div>';

    document.getElementById('auth-form').onsubmit = async function (e) {
      e.preventDefault();
      var pw = document.getElementById('f-pw').value;
      if (pw.length < 8) { authErr('Senha mínima: 8 caracteres.'); return; }
      var btn = this.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Criando conta...';
      var u = await Store.register(
        document.getElementById('f-name').value.trim(),
        document.getElementById('f-email').value.trim(),
        pw,
        document.getElementById('f-dept').value,
        document.getElementById('f-role').value.trim()
      );
      btn.disabled = false; btn.textContent = 'Criar Conta';
      if (u) { App.view = 'dashboard'; renderApp(); }
      else authErr('Email já cadastrado.');
    };
    document.getElementById('go-login').onclick = function () { App.authMode = 'login'; renderAuth(); };
  }
}

function authErr(msg) {
  var el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

// ============================================================
// MAIN APP SHELL (Header + Sidebar + Content)
// ============================================================
function renderApp() {
  var me = Store.me();
  if (!me) { renderAuth(); return; }

  var st = Store.stats();
  var pending = st.open + st.overdue;

  $app.innerHTML =
    '<div class="app-shell">' +
    '<header class="header">' +
    '<button class="hamburger-btn" id="btn-sidebar-toggle" aria-label="Abrir menu" title="Menu">' +
    '<span></span><span></span><span></span>' +
    '</button>' +
    '<div class="header-logo" id="logo-home">' + LOGO_30 + WORDMARK + '</div>' +
    '<div class="header-spacer"></div>' +
    '<div class="header-search" id="header-search">' +
    '<input type="text" id="search-input" placeholder="Pesquisar tickets ou quadros…" autocomplete="off">' +
    '<svg class="header-search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>' +
    '<div class="search-results" id="search-results"></div>' +
    '</div>' +
    '<div class="header-actions">' +
    '<button class="header-icon-btn" id="btn-cmd" data-tooltip="Painel de Comandos (Ctrl+K)" aria-label="Painel de Comandos">' + ICONS.search + '</button>' +
    '<button class="header-icon-btn" id="btn-theme" data-tooltip="Alternar tema" aria-label="Alternar tema">' + ICONS.theme + '</button>' +
    '<button class="header-icon-btn" id="btn-notif" data-tooltip="Notificações" aria-label="Notificações">' +
    ICONS.bell +
    (pending > 0 ? '<span class="notif-badge">' + pending + '</span>' : '') +
    '</button>' +
    '<div class="header-avatar" id="header-avatar">' +
    '<div class="avatar" style="background:' + avatarBg(me.name) + '">' + initials(me.name) + '</div>' +
    '</div>' +
    '</div>' +
    '</header>' +
    '<div class="app-body">' +
    '<aside class="sidebar">' +
    '<div class="sidebar-logo" id="sidebar-logo-home">' +
      LOGO_32 +
      '<div>' + WORDMARK + '</div>' +
    '</div>' +
    '<div class="sidebar-section"><div class="sidebar-nav">' +
    '<a class="sidebar-link' + (App.view === 'dashboard' ? ' active' : '') + '" id="nav-dash">' + ICONS.dash + ' Início</a>' +
    '<a class="sidebar-link' + (App.view === 'mytasks' ? ' active' : '') + '" id="nav-tasks">' + ICONS.check + ' Minhas Tarefas</a>' +
    '<a class="sidebar-link' + (App.view === 'calendar' ? ' active' : '') + '" id="nav-cal">' + ICONS.calendar + ' Calendário</a>' +
    '<a class="sidebar-link' + (App.view === 'docs' ? ' active' : '') + '" id="nav-docs">' + ICONS.desc + ' Base de Conhecimento</a>' +
    '<a class="sidebar-link' + (App.view === 'metrics' ? ' active' : '') + '" id="nav-metrics">' + ICONS.metrics + ' Métricas</a>' +
    (Store.isAdmin() ? '<a class="sidebar-link sidebar-admin-link' + (App.view === 'admin' ? ' active' : '') + '" id="nav-admin">' + ICONS.users + ' Administração</a>' : '') +
    '</div></div>' +
    '<div class="sidebar-section">' +
    '<div class="sidebar-section-title">Quadros <div class="sidebar-add" id="sidebar-add-board" data-tooltip="Criar quadro" aria-label="Criar quadro">' + ICONS.plus + '</div></div>' +
    '<div class="sidebar-nav" id="sidebar-boards"></div>' +
    '</div>' +
    '</aside>' +
    '<main class="main-content" id="main-content"></main>' +
    '</div>' +
    '<div class="notif-panel" id="notif-panel"><div class="notif-panel-header">Caixa de Entrada</div><div class="notif-panel-body" id="notif-body"></div></div>' +
    '<div class="user-menu" id="user-menu"></div>' +
    '<div class="sidebar-overlay" id="sidebar-overlay"></div>' +
    '</div>';

  fillSidebarBoards();

  // Hamburger sidebar toggle
  document.getElementById('btn-sidebar-toggle').onclick = function () {
    document.body.classList.toggle('sidebar-open');
  };
  document.getElementById('sidebar-overlay').onclick = function () {
    document.body.classList.remove('sidebar-open');
  };

  // Update document title
  var _viewTitles = { dashboard: 'Início', mytasks: 'Minhas Tarefas', calendar: 'Calendário', docs: 'Documentação', metrics: 'Métricas', admin: 'Administração', board: '' };
  document.title = (_viewTitles[App.view] ? _viewTitles[App.view] + ' — ' : '') + 'Mottion Desk';

  document.getElementById('logo-home').onclick = function () { App.view = 'dashboard'; App.boardId = null; renderApp(); };
  document.getElementById('nav-dash').onclick = function () { App.view = 'dashboard'; App.boardId = null; renderApp(); };
  document.getElementById('nav-tasks').onclick = function () { App.view = 'mytasks'; App.boardId = null; renderApp(); };
  document.getElementById('nav-cal').onclick = function () { App.view = 'calendar'; App.boardId = null; renderApp(); };
  document.getElementById('nav-docs').onclick = function () { App.view = 'docs'; App.boardId = null; renderApp(); };
  document.getElementById('nav-metrics').onclick = function () { App.view = 'metrics'; App.boardId = null; renderApp(); };
  var navAdmin = document.getElementById('nav-admin');
  if (navAdmin) navAdmin.onclick = function () { App.view = 'admin'; App.boardId = null; renderApp(); };
  document.getElementById('sidebar-add-board').onclick = function () { showCreateBoard(); };
  var sidebarLogo = document.getElementById('sidebar-logo-home');
  if (sidebarLogo) sidebarLogo.onclick = function () { App.view = 'dashboard'; App.boardId = null; renderApp(); };

  var btnCmd = document.getElementById('btn-cmd');
  if (btnCmd) btnCmd.onclick = function () { showCommandPalette(); };

  var btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.onclick = function () {
      var html = document.documentElement;
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('md-theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('md-theme', 'light');
      }
    };
  }

  document.getElementById('search-input').oninput = _debounce(function (e) {
    var q = e.target.value;
    var box = document.getElementById('search-results');
    if (q.length < 2) { box.classList.remove('visible'); return; }
    var res = Store.search(q);
    if (res.length === 0) {
      box.innerHTML = '<div class="search-empty">Nenhum resultado encontrado.</div>';
    } else {
      var html = '<div class="search-results-title">Resultados</div>';
      for (var i = 0; i < res.length; i++) {
        var r = res[i];
        var isBoard = r.type === 'board';
        html += '<div class="search-item" data-type="' + r.type + '" data-id="' + r.id + '"' +
          (isBoard ? '' : ' data-bid="' + r.boardId + '" data-lid="' + r.listId + '"') + '>' +
          '<div class="search-item-icon">' + (isBoard ? ICONS.board : ICONS.ticket) + '</div>' +
          '<div class="search-item-text"><div class="search-item-title">' + esc(r.title) + '</div><div class="search-item-sub">' + esc(r.subtitle) + '</div></div></div>';
      }
      box.innerHTML = html;
    }
    box.classList.add('visible');

    box.onclick = function (ev) {
      var item = ev.target.closest('.search-item');
      if (!item) return;
      box.classList.remove('visible');
      document.getElementById('search-input').value = '';
      if (item.dataset.type === 'board') {
        goBoard(item.dataset.id);
      } else {
        goBoard(item.dataset.bid);
        setTimeout(function () { openModal(item.dataset.lid, item.dataset.id); }, 100);
      }
    };
  }, 200);

  document.getElementById('btn-notif').onclick = function (e) {
    e.stopPropagation();
    var panel = document.getElementById('notif-panel');
    var um = document.getElementById('user-menu');
    um.classList.remove('visible');
    if (panel.classList.contains('visible')) { panel.classList.remove('visible'); return; }
    fillNotifications();
    panel.classList.add('visible');
  };

  document.getElementById('header-avatar').onclick = function (e) {
    e.stopPropagation();
    var um = document.getElementById('user-menu');
    var np = document.getElementById('notif-panel');
    np.classList.remove('visible');
    if (um.classList.contains('visible')) { um.classList.remove('visible'); return; }
    fillUserMenu();
    um.classList.add('visible');
  };

  // Animate view transition
  var mc = document.getElementById('main-content');
  if (mc) mc.classList.add('view-fade-in');

  _startDueDateReminder();

  // Scroll: metrics precisa de overflow-y:auto; demais views usam overflow:hidden
  var _mc = document.getElementById('main-content');
  if (_mc) _mc.style.overflowY = (App.view === 'metrics') ? 'auto' : '';

  if (App.view === 'board' && App.boardId) renderBoard();
  else if (App.view === 'mytasks') renderMyTasks();
  else if (App.view === 'calendar') renderCalendar();
  else if (App.view === 'docs') renderDocs();
  else if (App.view === 'metrics') renderQuality();
  else if (App.view === 'admin' && Store.isAdmin()) renderAdmin();
  else renderDashboard();
}

// ─── DUE DATE REMINDER ──────────────────────────────────────
var _dueDateReminderInterval = null;
var _SD_NOTIF_KEY = 'sd_notif_shown';

function _getNotifiedSet() {
  try { return JSON.parse(sessionStorage.getItem(_SD_NOTIF_KEY) || '[]'); } catch (e) { return []; }
}
function _markNotified(cardId) {
  try {
    var s = _getNotifiedSet();
    if (s.indexOf(cardId) < 0) { s.push(cardId); sessionStorage.setItem(_SD_NOTIF_KEY, JSON.stringify(s)); }
  } catch (e) {}
}

function _checkDueDates() {
  var notified = _getNotifiedSet();
  var now = Date.now();
  var twoHours = 2 * 3600 * 1000;
  var boards = Store.data.boards || [];
  boards.forEach(function (b) {
    var lastListId = b.lists.length ? b.lists[b.lists.length - 1].id : null;
    b.lists.forEach(function (l) {
      var isDone = l.id === lastListId;
      if (isDone) return;
      l.cards.forEach(function (c) {
        if (!c.dueDate || notified.indexOf(c.id) >= 0) return;
        var due = parseDate(c.dueDate).getTime() + 86400000; // end of due day
        var msToDue = due - now;
        if (msToDue > 0 && msToDue <= twoHours) {
          _markNotified(c.id);
          var h = Math.floor(msToDue / 3600000);
          var m = Math.floor((msToDue % 3600000) / 60000);
          var label = h > 0 ? h + 'h ' + m + 'min' : m + 'min';
          showToast('⏰ Vence em ' + label + ': #' + c.ticketNumber + ' ' + c.title, 'warning', null, null, 8000);
        } else if (msToDue <= 0) {
          _markNotified(c.id);
          showToast('🚨 Atrasado: #' + c.ticketNumber + ' ' + c.title, 'error', null, null, 8000);
        }
      });
    });
  });
}

function _startDueDateReminder() {
  if (_dueDateReminderInterval) clearInterval(_dueDateReminderInterval);
  _checkDueDates();
  _dueDateReminderInterval = setInterval(_checkDueDates, 60000);
}

// ─── SIDEBAR BOARDS ─────────────────────────────────────────
function fillSidebarBoards() {
  var el = document.getElementById('sidebar-boards');
  if (!el) return;
  var bs = Store.boards();
  var html = '';
  for (var i = 0; i < bs.length; i++) {
    var b = bs[i];
    var active = App.view === 'board' && App.boardId === b.id ? ' active' : '';
    html += '<a class="sidebar-link' + active + '" data-bid="' + b.id + '">' +
      '<span class="dot" style="background:' + safeBg(b.background) + '"></span>' +
      '<span class="label">' + esc(b.name) + '</span></a>';
  }
  el.innerHTML = html;
  el.onclick = function (e) {
    var link = e.target.closest('.sidebar-link');
    if (link && link.dataset.bid) goBoard(link.dataset.bid);
  };
}

// ─── NOTIFICATIONS ──────────────────────────────────────────
function fillNotifications() {
  var body = document.getElementById('notif-body');
  if (!body) return;
  var st = Store.stats();
  var items = st.myTickets.filter(function (t) { return !t.isDone; });
  items.sort(function (a, b) {
    var oa = a.card.dueDate && new Date(a.card.dueDate) < new Date() ? 1 : 0;
    var ob = b.card.dueDate && new Date(b.card.dueDate) < new Date() ? 1 : 0;
    return ob - oa || b.card.createdAt - a.card.createdAt;
  });
  items = items.slice(0, 10);

  if (items.length === 0) {
    body.innerHTML = '<div class="notif-empty">' + ICONS.bell + '<br>Sem notificações pendentes.</div>';
    return;
  }
  var html = '';
  for (var i = 0; i < items.length; i++) {
    var t = items[i];
    var isOver = t.card.dueDate && parseDate(t.card.dueDate) < new Date();
    html += '<div class="notif-row ' + (isOver ? 'urgent' : 'info') + '" data-bid="' + t.boardId + '" data-lid="' + t.listId + '" data-cid="' + t.card.id + '">' +
      '<div class="notif-row-icon ' + (isOver ? 'red' : 'blue') + '">' + (isOver ? ICONS.calendar : ICONS.ticket) + '</div>' +
      '<div class="notif-row-body"><div class="notif-row-text"><strong>#' + String(t.card.ticketNumber).padStart(3, '0') + '</strong> ' + esc(t.card.title) + '</div>' +
      '<div class="notif-row-time">' + esc(t.boardName) + ' · ' + (isOver ? '<span style="color:var(--red);font-weight:600">Atrasado</span>' : t.listName) + '</div></div></div>';
  }
  body.innerHTML = html;
  body.onclick = function (e) {
    var row = e.target.closest('.notif-row');
    if (!row) return;
    document.getElementById('notif-panel').classList.remove('visible');
    goBoard(row.dataset.bid);
    setTimeout(function () { openModal(row.dataset.lid, row.dataset.cid); }, 100);
  };
}

// ─── USER MENU ──────────────────────────────────────────────
function fillUserMenu() {
  var el = document.getElementById('user-menu');
  if (!el) return;
  var me = Store.me();
  if (!me) return;
  var d = dept(me.department);

  el.innerHTML =
    '<div class="user-menu-header">' +
    '<div class="user-menu-name" style="margin-bottom:8px">' + esc(me.name) + '</div>' +
    '<div class="user-menu-email"><strong>Usuário:</strong> ' + esc(me.email) + '</div>' +
    '<div class="user-menu-dept" style="background:' + d.color + '">' + d.icon + ' ' + d.name + '</div>' +
    '</div>' +
    '<div class="user-menu-item" id="um-profile">' + ICONS.user + ' Editar Perfil</div>' +
    '<div class="user-menu-item" id="um-export">' + ICONS.desc + ' Exportar CSV</div>' +
    '<div class="user-menu-item danger" id="um-logout">' + ICONS.logout + ' Sair</div>';

  document.getElementById('um-profile').onclick = function () {
    el.classList.remove('visible');
    showProfileModal();
  };

  document.getElementById('um-export').onclick = function () {
    el.classList.remove('visible');
    Store.exportCSV();
    showToast('Exportação iniciada!', 'success');
  };

  document.getElementById('um-logout').onclick = function () {
    Store.logout();
    App.view = 'auth';
    App.authMode = 'login';
    renderAuth();
  };
}

// ============================================================
// DOCUMENTAÇÃO TI (BASE DE CONHECIMENTO)
// ============================================================
var _kbCategories = ['Sistemas', 'Redes', 'Hardware', 'Procedimentos', 'Geral'];

// ─── MARKDOWN RENDERER ──────────────────────────────────────
function _renderMarkdown(raw) {
  if (!raw) return '';
  var lines = raw.split('\n');
  var out = [];
  var inCode = false, codeLines = [], inUl = false, inOl = false;

  function flushList() {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  }

  function inlineFormat(s) {
    // Escape HTML first
    s = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    // Code spans (before bold/italic so `` ` `` wins)
    s = s.replace(/`([^`]+)`/g, '<code class="md-code-inline">$1</code>');
    // Bold + italic
    s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
    s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
    s = s.replace(/_(.+?)_/g, '<em>$1</em>');
    // Links
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="md-link">$1</a>');
    // Strikethrough
    s = s.replace(/~~(.+?)~~/g, '<del>$1</del>');
    return s;
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Fenced code block toggle
    if (/^```/.test(line)) {
      if (inCode) {
        out.push('<pre class="md-pre"><code>' + codeLines.map(function(l){ return l.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }).join('\n') + '</code></pre>');
        codeLines = []; inCode = false;
      } else {
        flushList(); inCode = true;
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      flushList(); out.push('<hr class="md-hr">'); continue;
    }

    // Headings
    var hm = line.match(/^(#{1,4})\s+(.+)$/);
    if (hm) {
      flushList();
      var lvl = hm[1].length;
      var htxt = inlineFormat(hm[2]);
      var hid = 'doc-h-' + hm[2].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g,'').substring(0, 40);
      out.push('<h' + lvl + ' class="md-h' + lvl + '" id="' + hid + '">' + htxt + '</h' + lvl + '>');
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      flushList();
      out.push('<blockquote class="md-blockquote">' + inlineFormat(line.replace(/^>\s?/, '')) + '</blockquote>');
      continue;
    }

    // Unordered list
    var ulm = line.match(/^[\-\*\+]\s+(.+)$/);
    if (ulm) {
      if (!inUl) { if (inOl) { out.push('</ol>'); inOl = false; } out.push('<ul class="md-ul">'); inUl = true; }
      out.push('<li>' + inlineFormat(ulm[1]) + '</li>');
      continue;
    }

    // Ordered list
    var olm = line.match(/^\d+\.\s+(.+)$/);
    if (olm) {
      if (!inOl) { if (inUl) { out.push('</ul>'); inUl = false; } out.push('<ol class="md-ol">'); inOl = true; }
      out.push('<li>' + inlineFormat(olm[1]) + '</li>');
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      out.push('<div class="md-spacer"></div>');
      continue;
    }

    // Paragraph
    flushList();
    out.push('<p class="md-p">' + inlineFormat(line) + '</p>');
  }
  flushList();
  return out.join('');
}

// Extract TOC headings from markdown
function _extractTOC(raw) {
  var toc = [];
  var lines = raw.split('\n');
  var inCode = false;
  lines.forEach(function(line) {
    if (/^```/.test(line)) { inCode = !inCode; return; }
    if (inCode) return;
    var hm = line.match(/^(#{1,4})\s+(.+)$/);
    if (hm) {
      toc.push({
        level: hm[1].length,
        text: hm[2],
        id: 'doc-h-' + hm[2].toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'').substring(0,40)
      });
    }
  });
  return toc;
}

// Estimate reading time (200 wpm)
function _readTime(content) {
  if (!content) return 1;
  var words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Highlight search term in text
function _highlightSearch(text, q) {
  if (!q) return esc(text);
  var escaped = esc(text);
  var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi');
  return escaped.replace(re, '<mark class="doc-highlight">$1</mark>');
}

// Track recently viewed
function _docMarkViewed(id) {
  if (!App.docRecentlyViewed) App.docRecentlyViewed = [];
  App.docRecentlyViewed = App.docRecentlyViewed.filter(function(i){ return i !== id; });
  App.docRecentlyViewed.unshift(id);
  if (App.docRecentlyViewed.length > 6) App.docRecentlyViewed.pop();
}

// ─── CATEGORY ICONS ──────────────────────────────────────────
var _kbCatIcons = { 'Sistemas': '💻', 'Redes': '🌐', 'Hardware': '🖥️', 'Procedimentos': '📋', 'Geral': '📁' };
function _catIcon(c) { return _kbCatIcons[c] || '📄'; }

// ─── DOCS RENDER (KB) ────────────────────────────────────────
function renderDocs() {
  var main = document.getElementById('main-content');
  if (!main) return;

  var canEdit = Store.isAdmin() || (Store.me() && Store.me().role === 'agent');
  // Check perfil from API user
  var apiUser = (typeof Auth !== 'undefined') ? Auth.getUser() : null;
  if (apiUser && (apiUser.perfil === 'admin' || apiUser.perfil === 'agente')) canEdit = true;

  main.innerHTML =
    '<div style="padding:0 32px 48px">' +
    '<div class="view-header" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-bottom:4px;">' +
    '<div style="width:24px;height:24px;flex-shrink:0">' + ICONS.desc + '</div>' +
    '<span class="view-title" style="margin:0">Base de Conhecimento</span>' +
    (canEdit ? '<button class="btn-primary" id="kb-new-btn" style="margin-left:auto;height:34px;padding:0 16px;font-size:13px">+ Novo Artigo</button>' : '') +
    '</div>' +

    '<div style="display:flex;gap:10px;margin:18px 0 20px;flex-wrap:wrap;align-items:center;">' +
    '<div style="position:relative;flex:1;min-width:200px;max-width:380px;">' +
    '<input id="kb-search" type="text" placeholder="🔍  Buscar artigos..." style="width:100%;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--text);padding:0 12px;font-size:13px;box-sizing:border-box;">' +
    '</div>' +
    '<select id="kb-cat-filter" style="height:36px;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--text);padding:0 10px;font-size:13px;">' +
    '<option value="">Todas as categorias</option>' +
    '<option value="Acesso">Acesso</option>' +
    '<option value="Hardware">Hardware</option>' +
    '<option value="Solicitação">Solicitação</option>' +
    '<option value="Software">Software</option>' +
    '<option value="Rede">Rede</option>' +
    '<option value="Outro">Outro</option>' +
    '</select>' +
    '</div>' +

    '<div id="kb-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">' +
    // skeleton
    [1,2,3].map(function() {
      return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;height:130px;background:linear-gradient(90deg,var(--border) 25%,var(--surface) 50%,var(--border) 75%);background-size:200% 100%;animation:q-shimmer 1.5s infinite;"></div>';
    }).join('') +
    '</div>' +
    '</div>';

  // Wire up new article button
  var newBtn = document.getElementById('kb-new-btn');
  if (newBtn) newBtn.onclick = function() { _kbOpenForm(null); };

  // Fetch articles
  _kbLoad({ busca: '', categoria: '' });

  // Search debounce
  var _kbTimer = null;
  var searchEl = document.getElementById('kb-search');
  var catEl    = document.getElementById('kb-cat-filter');
  function _kbFilter() {
    clearTimeout(_kbTimer);
    _kbTimer = setTimeout(function() {
      _kbLoad({ busca: searchEl ? searchEl.value : '', categoria: catEl ? catEl.value : '' });
    }, 300);
  }
  if (searchEl) searchEl.oninput = _kbFilter;
  if (catEl)    catEl.onchange   = _kbFilter;
}

// ── KB: load and render article grid ───────────────────────
function _kbLoad(params) {
  var grid = document.getElementById('kb-grid');
  if (!grid) return;

  var apiUser = (typeof Auth !== 'undefined') ? Auth.getUser() : null;
  var canEdit = apiUser && (apiUser.perfil === 'admin' || apiUser.perfil === 'agente');

  if (typeof API === 'undefined' || !Auth.isLoggedIn()) {
    grid.innerHTML = '<p style="color:var(--text-light);grid-column:1/-1;padding:40px 0;text-align:center">API indisponível.</p>';
    return;
  }

  API.kb.listar(params).then(function(r) {
    var grid2 = document.getElementById('kb-grid');
    if (!grid2) return;
    if (!r || !r.success || !r.data.length) {
      grid2.innerHTML = '<p style="color:var(--text-light);grid-column:1/-1;padding:40px 0;text-align:center">Nenhum artigo encontrado.</p>';
      return;
    }
    grid2.innerHTML = r.data.map(function(a) {
      return _kbCard(a, canEdit);
    }).join('');

    // wire up cards
    r.data.forEach(function(a) {
      var card = document.getElementById('kb-card-' + a.id);
      if (!card) return;
      card.querySelector('.kb-card-body').onclick = function() { _kbOpenArticle(a.id); };
      var editBtn = card.querySelector('.kb-edit-btn');
      if (editBtn) editBtn.onclick = function(e) { e.stopPropagation(); _kbOpenForm(a); };
      var delBtn = card.querySelector('.kb-del-btn');
      if (delBtn) delBtn.onclick = function(e) {
        e.stopPropagation();
        if (!confirm('Remover artigo "' + a.titulo + '"?')) return;
        API.kb.excluir(a.id).then(function() {
          showToast('Artigo removido.', 'success');
          var el = document.getElementById('kb-card-' + a.id);
          if (el) el.remove();
        });
      };
    });
  }).catch(function() {
    var grid2 = document.getElementById('kb-grid');
    if (grid2) grid2.innerHTML = '<p style="color:var(--red);grid-column:1/-1;padding:40px 0;text-align:center">Erro ao carregar artigos.</p>';
  });
}

// ── KB: single article card HTML ───────────────────────────
function _kbCard(a, canEdit) {
  var catColors = { 'Acesso':'#3B82F6','Hardware':'#F97316','Solicitação':'#8B5CF6','Software':'#22C55E','Rede':'#EAB308','Outro':'#6B7280' };
  var catCol = catColors[a.categoria] || '#6B7280';
  var tags = (a.tags || '').split(',').filter(Boolean).slice(0, 4);
  var tagsHtml = tags.map(function(t) {
    return '<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600;background:var(--border);color:var(--text-secondary);margin:2px 2px 0 0;">' + esc(t.trim()) + '</span>';
  }).join('');

  return '<div id="kb-card-' + a.id + '" style="background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow 0.2s;" onmouseover="this.style.boxShadow=\'0 4px 16px rgba(0,0,0,0.15)\'" onmouseout="this.style.boxShadow=\'\'">' +
    '<div class="kb-card-body" style="padding:18px 18px 14px;flex:1;cursor:pointer;">' +
    '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;">' +
    '<span style="flex:1;font-size:14px;font-weight:600;color:var(--text);line-height:1.35;">' + esc(a.titulo) + '</span>' +
    (a.categoria ? '<span style="flex-shrink:0;padding:2px 10px;border-radius:20px;font-size:10px;font-weight:700;background:' + catCol + '22;color:' + catCol + ';border:1px solid ' + catCol + '44;">' + esc(a.categoria) + '</span>' : '') +
    '</div>' +
    '<div style="margin-bottom:10px;">' + tagsHtml + '</div>' +
    '<div style="font-size:12px;color:var(--text-light);display:flex;align-items:center;gap:12px;">' +
    '<span>👁 ' + (a.visualizacoes || 0) + ' visualizações</span>' +
    '<span>' + (a.autor_nome ? '✍ ' + esc(a.autor_nome) : '') + '</span>' +
    '</div>' +
    '</div>' +
    (canEdit ?
      '<div style="display:flex;gap:6px;padding:10px 18px;border-top:1px solid var(--border);background:var(--bg);">' +
      '<button class="kb-edit-btn btn-secondary" style="flex:1;height:28px;font-size:12px;padding:0 8px;">✏ Editar</button>' +
      '<button class="kb-del-btn" style="height:28px;width:32px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--red);cursor:pointer;font-size:14px;">🗑</button>' +
      '</div>'
    : '') +
    '</div>';
}

// ── KB: open article modal ─────────────────────────────────
function _kbOpenArticle(id) {
  // Show loading modal
  _kbShowModal(
    '<div style="text-align:center;padding:60px 0;color:var(--text-light)">Carregando…</div>',
    'Artigo'
  );

  API.kb.buscar(id).then(function(r) {
    if (!r || !r.success) return;
    var a = r.data;
    var catColors = { 'Acesso':'#3B82F6','Hardware':'#F97316','Solicitação':'#8B5CF6','Software':'#22C55E','Rede':'#EAB308','Outro':'#6B7280' };
    var catCol = catColors[a.categoria] || '#6B7280';
    var tags = (a.tags || '').split(',').filter(Boolean);

    var header =
      '<div style="margin-bottom:16px;">' +
      (a.categoria ? '<span style="padding:2px 12px;border-radius:20px;font-size:11px;font-weight:700;background:' + catCol + '22;color:' + catCol + ';border:1px solid ' + catCol + '44;">' + esc(a.categoria) + '</span>' : '') +
      '<span style="margin-left:12px;font-size:12px;color:var(--text-light)">👁 ' + (a.visualizacoes || 0) + ' · ✍ ' + esc(a.autor_nome || '—') + '</span>' +
      '</div>' +
      '<div style="margin-bottom:16px;">' + tags.map(function(t) {
        return '<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600;background:var(--border);color:var(--text-secondary);margin:2px 2px 0 0;">' + esc(t.trim()) + '</span>';
      }).join('') + '</div>';

    var body = header + '<div style="border-top:1px solid var(--border);padding-top:16px;">' + _kbRenderMarkdown(a.conteudo) + '</div>';
    _kbShowModal(body, a.titulo);
  });
}

// ── KB: simple markdown renderer ───────────────────────────
function _kbRenderMarkdown(md) {
  if (!md) return '';
  var html = md
    // escape HTML first (then we'll add back our own tags)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // headings
    .replace(/^### (.+)$/gm, '<h4 style="font-size:14px;font-weight:700;margin:16px 0 6px;color:var(--text)">$1</h4>')
    .replace(/^## (.+)$/gm,  '<h3 style="font-size:16px;font-weight:700;margin:18px 0 8px;color:var(--text)">$1</h3>')
    .replace(/^# (.+)$/gm,   '<h2 style="font-size:20px;font-weight:800;margin:0 0 16px;color:var(--text)">$1</h2>')
    // bold + italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/_(.+?)_/g,       '<em>$1</em>')
    // inline code
    .replace(/`(.+?)`/g, '<code style="background:var(--border);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:12px;">$1</code>')
    // unordered list items
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;">$1</li>')
    // ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;">$1</li>')
    // wrap consecutive <li> in <ul>
    .replace(/(<li[^>]*>.*?<\/li>\n?)+/g, function(m) { return '<ul style="padding-left:20px;margin:10px 0;">' + m + '</ul>'; })
    // paragraphs (double newline)
    .replace(/\n\n/g, '</p><p style="margin:10px 0;line-height:1.6;">')
    // single newlines
    .replace(/\n/g, '<br>');
  return '<p style="margin:10px 0;line-height:1.6;color:var(--text);">' + html + '</p>';
}

// ── KB: modal shell ────────────────────────────────────────
function _kbShowModal(bodyHtml, title) {
  var existing = document.getElementById('kb-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'kb-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:4000;display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML =
    '<div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;width:100%;max-width:720px;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.4);">' +
    '<div style="display:flex;align-items:center;gap:12px;padding:20px 24px;border-bottom:1px solid var(--border);flex-shrink:0;">' +
    '<span style="flex:1;font-size:17px;font-weight:700;color:var(--text);">' + esc(title) + '</span>' +
    '<button id="kb-modal-close" style="width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--text);cursor:pointer;font-size:18px;line-height:1;">×</button>' +
    '</div>' +
    '<div id="kb-modal-body" style="flex:1;overflow-y:auto;padding:24px;">' + bodyHtml + '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
  document.getElementById('kb-modal-close').onclick = function() { overlay.remove(); };
}

// ── KB: create/edit form modal ─────────────────────────────
function _kbOpenForm(article) {
  var isEdit = !!article;
  var catOptions = ['Acesso','Hardware','Solicitação','Software','Rede','Outro'].map(function(c) {
    return '<option value="' + c + '"' + (article && article.categoria === c ? ' selected' : '') + '>' + c + '</option>';
  }).join('');

  _kbShowModal(
    '<div style="display:flex;flex-direction:column;gap:14px;">' +
    '<div>' +
    '<label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:5px;">Título *</label>' +
    '<input id="kb-f-titulo" type="text" value="' + esc(article ? article.titulo : '') + '" placeholder="Título do artigo" style="width:100%;height:38px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);padding:0 12px;font-size:13px;box-sizing:border-box;">' +
    '</div>' +
    '<div style="display:flex;gap:12px;">' +
    '<div style="flex:1;">' +
    '<label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:5px;">Categoria</label>' +
    '<select id="kb-f-cat" style="width:100%;height:38px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);padding:0 10px;font-size:13px;">' +
    '<option value="">Sem categoria</option>' + catOptions +
    '</select>' +
    '</div>' +
    '<div style="flex:1;">' +
    '<label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:5px;">Tags <span style="font-weight:400">(separadas por vírgula)</span></label>' +
    '<input id="kb-f-tags" type="text" value="' + esc(article ? article.tags || '' : '') + '" placeholder="ex: senha, acesso, login" style="width:100%;height:38px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);padding:0 12px;font-size:13px;box-sizing:border-box;">' +
    '</div>' +
    '</div>' +
    '<div>' +
    '<label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:5px;">Conteúdo * <span style="font-weight:400;color:var(--text-light)">(suporta # Título, **negrito**, - lista)</span></label>' +
    '<textarea id="kb-f-conteudo" rows="14" placeholder="Escreva o artigo aqui..." style="width:100%;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);padding:10px 12px;font-size:13px;font-family:monospace;resize:vertical;box-sizing:border-box;line-height:1.5;">' + esc(article ? article.conteudo : '') + '</textarea>' +
    '</div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end;padding-top:4px;">' +
    '<button id="kb-f-preview" class="btn-secondary" style="height:36px;padding:0 16px;font-size:13px;">👁 Pré-visualizar</button>' +
    '<button id="kb-f-save" class="btn-primary" style="height:36px;padding:0 20px;font-size:13px;">' + (isEdit ? '💾 Salvar alterações' : '✚ Publicar artigo') + '</button>' +
    '</div>' +
    '</div>',
    isEdit ? 'Editar artigo' : 'Novo artigo'
  );

  document.getElementById('kb-f-preview').onclick = function() {
    var md = document.getElementById('kb-f-conteudo').value;
    var titulo = document.getElementById('kb-f-titulo').value || 'Pré-visualização';
    _kbShowModal(_kbRenderMarkdown(md), titulo);
  };

  document.getElementById('kb-f-save').onclick = function() {
    var titulo    = (document.getElementById('kb-f-titulo').value || '').trim();
    var conteudo  = (document.getElementById('kb-f-conteudo').value || '').trim();
    var categoria = document.getElementById('kb-f-cat').value;
    var tags      = document.getElementById('kb-f-tags').value;

    if (!titulo)   { showToast('Informe o título.', 'error');   return; }
    if (!conteudo) { showToast('Informe o conteúdo.', 'error'); return; }

    var btn = document.getElementById('kb-f-save');
    btn.disabled = true;
    btn.textContent = 'Salvando…';

    var payload = { titulo: titulo, conteudo: conteudo, categoria: categoria, tags: tags };
    var p = isEdit ? API.kb.atualizar(article.id, payload) : API.kb.criar(payload);

    p.then(function(r) {
      if (!r || !r.success) { showToast('Erro ao salvar.', 'error'); btn.disabled = false; btn.textContent = 'Salvar'; return; }
      showToast(isEdit ? 'Artigo atualizado!' : 'Artigo publicado!', 'success');
      document.getElementById('kb-modal-overlay').remove();
      renderDocs(); // refresh
    }).catch(function() {
      showToast('Erro ao salvar.', 'error');
      btn.disabled = false; btn.textContent = 'Salvar';
    });
  };
}

// ─── LEGACY DOCS STUBS (kept so outside references don't crash) ──
function _renderDocGridView(docs, q) { return ''; }
function _renderDocReaderView(doc, allDocs) { return ''; }
function _bindDocsEvents(allDocs) {}
function renderDocGridView(docs, customTitle) { return ''; }
function renderDocReaderView(doc) { return ''; }
function bindGridEvents() {}
function bindReaderEvents() {}

// ── Legacy: keep previously viewed doc state variables alive ─
if (typeof App !== 'undefined') {
  if (!App.activeDocId)  App.activeDocId  = null;
  if (!App.docSearch)    App.docSearch    = '';
  if (!App.activeDocCat) App.activeDocCat = 'Todas';
  if (!App.docSort)      App.docSort      = 'newest';
  if (!App.docView)      App.docView      = 'grid';
}


// (old _renderDocGridView removed — superseded by KB backend implementation)
function _renderDocGridView_REMOVED(docs, q) {
  var sort = App.docSort || 'newest';
  var sorted = docs.slice();
  if (sort === 'newest') sorted.sort(function(a,b){ return b.updatedAt - a.updatedAt; });
  else if (sort === 'oldest') sorted.sort(function(a,b){ return a.updatedAt - b.updatedAt; });
  else sorted.sort(function(a,b){ return (a.title||'').localeCompare(b.title||''); });

  // Pinned first (only in "Todas" without search)
  if (!q && App.activeDocCat === 'Todas') {
    sorted.sort(function(a,b){ return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0); });
  }

  var titleLabel = q ? 'Resultados para "' + q + '"' : (App.activeDocCat === 'Todas' ? 'Todos os Artigos' : _catIcon(App.activeDocCat) + ' ' + App.activeDocCat);
  var isGrid = App.docView !== 'list';

  var html =
    '<div class="docs-grid-header">' +
    '<div>' +
    '<div class="docs-grid-title">' + titleLabel + '</div>' +
    '<div class="docs-grid-sub">' + sorted.length + ' artigo' + (sorted.length !== 1 ? 's' : '') + '</div>' +
    '</div>' +
    '<div class="docs-grid-controls">' +
    // Sort
    '<select class="filter-select docs-sort-sel" id="doc-sort-sel" style="height:32px;font-size:12px">' +
    '<option value="newest"' + (sort==='newest'?' selected':'') + '>Mais recentes</option>' +
    '<option value="oldest"' + (sort==='oldest'?' selected':'') + '>Mais antigos</option>' +
    '<option value="alpha"' + (sort==='alpha'?' selected':'') + '>A → Z</option>' +
    '</select>' +
    // View toggle
    '<div class="docs-view-toggle">' +
    '<button class="docs-view-btn' + (isGrid?' docs-view-btn-active':'') + '" data-docview="grid" title="Grade">⊞</button>' +
    '<button class="docs-view-btn' + (!isGrid?' docs-view-btn-active':'') + '" data-docview="list" title="Lista">☰</button>' +
    '</div>' +
    '<button class="btn-primary" id="btn-new-doc" style="height:32px;padding:0 14px;font-size:12px">' + ICONS.plus + ' Novo</button>' +
    '</div>' +
    '</div>';

  if (sorted.length === 0) {
    html += '<div class="docs-empty-state">' +
      '<div class="docs-empty-icon">' + (q ? '🔍' : '📚') + '</div>' +
      '<div class="docs-empty-title">' + (q ? 'Nenhum resultado para "' + esc(q) + '"' : 'Nenhum artigo ainda') + '</div>' +
      '<div class="docs-empty-sub">' + (q ? 'Tente outros termos de busca' : 'Crie o primeiro artigo para documentar este assunto.') + '</div>' +
      (!q ? '<button class="btn-primary" id="btn-new-doc-empty" style="margin-top:16px">' + ICONS.plus + ' Criar primeiro artigo</button>' : '') +
      '</div>';
    return html;
  }

  html += '<div class="' + (isGrid ? 'docs-grid' : 'docs-list') + '">';
  sorted.forEach(function(doc) {
    var au = Store.user(doc.authorId);
    var rt = _readTime(doc.content);
    // Strip markdown for excerpt
    var rawExcerpt = (doc.content || '').replace(/#+\s/g,'').replace(/\*\*/g,'').replace(/\*/g,'').replace(/`/g,'').replace(/\n/g,' ').trim();
    var excerpt = rawExcerpt.length > 160 ? rawExcerpt.substring(0,160) + '…' : rawExcerpt;
    if (q) excerpt = _highlightSearch(rawExcerpt.substring(0,160) + (rawExcerpt.length>160?'…':''), q);
    else excerpt = esc(excerpt);
    var titleHtml = q ? _highlightSearch(doc.title, q) : esc(doc.title);
    var updDate = new Date(doc.updatedAt).toLocaleDateString('pt-BR', {day:'2-digit',month:'short',year:'numeric'});

    if (isGrid) {
      html +=
        '<div class="doc-card" data-docid="' + doc.id + '">' +
        (doc.pinned ? '<span class="doc-pin-badge" title="Artigo fixado">📌</span>' : '') +
        '<div class="doc-card-top">' +
        '<span class="doc-cat-badge">' + _catIcon(doc.category) + ' ' + esc(doc.category) + '</span>' +
        '<span class="doc-read-time">' + rt + ' min</span>' +
        '</div>' +
        '<div class="doc-card-title">' + titleHtml + '</div>' +
        '<div class="doc-card-excerpt">' + excerpt + '</div>' +
        '<div class="doc-card-footer">' +
        '<div class="doc-card-author">' +
        '<div class="avatar avatar-xs" style="background:' + avatarBg(au?au.name:'') + '">' + initials(au?au.name:'') + '</div>' +
        '<span>' + esc(au?au.name:'?') + '</span>' +
        '</div>' +
        '<span class="doc-card-date">' + updDate + '</span>' +
        '</div>' +
        '</div>';
    } else {
      html +=
        '<div class="doc-list-row" data-docid="' + doc.id + '">' +
        (doc.pinned ? '<span style="font-size:12px;margin-right:4px">📌</span>' : '') +
        '<span class="doc-list-icon">' + _catIcon(doc.category) + '</span>' +
        '<div class="doc-list-body">' +
        '<div class="doc-list-title">' + titleHtml + '</div>' +
        '<div class="doc-list-meta">' + esc(doc.category) + ' · ' + esc(au?au.name:'?') + ' · ' + updDate + ' · ' + rt + ' min</div>' +
        '</div>' +
        '<div class="doc-list-excerpt">' + excerpt + '</div>' +
        '</div>';
    }
  });
  html += '</div>';
  return html;
}

function _renderDocReaderView_REMOVED(doc, allDocs) {
  var au = Store.user(doc.authorId);
  var authorName = au ? au.name : 'Desconhecido';
  var rt = _readTime(doc.content);
  var toc = _extractTOC(doc.content);
  var renderedContent = _renderMarkdown(doc.content);

  // TOC HTML
  var tocHtml = '';
  if (toc.length >= 2) {
    tocHtml = '<nav class="doc-toc"><div class="doc-toc-title">Nesta página</div><ul class="doc-toc-list">';
    toc.forEach(function(h) {
      tocHtml += '<li class="doc-toc-item doc-toc-level-' + h.level + '"><a class="doc-toc-link" href="#' + h.id + '">' + esc(h.text) + '</a></li>';
    });
    tocHtml += '</ul></nav>';
  }

  // Related articles (same category, different doc)
  var related = allDocs.filter(function(d){ return d.id !== doc.id && d.category === doc.category; }).slice(0,4);
  var relatedHtml = '';
  if (related.length) {
    relatedHtml = '<div class="doc-related"><div class="doc-related-title">📖 Artigos relacionados</div><div class="doc-related-grid">';
    related.forEach(function(rd) {
      var rau = Store.user(rd.authorId);
      relatedHtml += '<div class="doc-related-card" data-docid="' + rd.id + '">' +
        '<div class="doc-related-card-title">' + esc(rd.title) + '</div>' +
        '<div class="doc-related-card-meta">' + _catIcon(rd.category) + ' · ' + esc(rau?rau.name:'?') + ' · ' + _readTime(rd.content) + ' min</div>' +
        '</div>';
    });
    relatedHtml += '</div></div>';
  }

  // Attachments
  var attachmentsHtml = '';
  if (doc.attachments && doc.attachments.length > 0) {
    var attPlaceholders = doc.attachments.map(function(a) {
      return '<div class="attach-item attach-loading" data-id="' + a.id + '"><div class="attach-placeholder"></div></div>';
    }).join('');
    attachmentsHtml = '<div class="doc-attachments-section"><div class="doc-attachments-title">📎 Anexos</div>' +
      '<div class="attach-list" id="doc-reader-attach-list">' + attPlaceholders + '</div></div>';
  }

  var iconBack = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';

  return (
    '<div class="doc-reader-bar">' +
    '<button class="doc-reader-back" id="btn-back-docs">' + iconBack + ' Voltar</button>' +
    '<nav class="doc-breadcrumb">' +
    '<span class="doc-bc-cat">' + _catIcon(doc.category) + ' ' + esc(doc.category) + '</span>' +
    '<span class="doc-bc-sep">›</span>' +
    '<span class="doc-bc-title">' + esc(doc.title.length > 40 ? doc.title.substring(0,40)+'…' : doc.title) + '</span>' +
    '</nav>' +
    '<div class="doc-reader-actions">' +
    '<button class="btn-icon doc-action-btn" id="doc-btn-pin" title="' + (doc.pinned?'Desafixar':'Fixar') + ' artigo">' + (doc.pinned ? '📌' : '📍') + '</button>' +
    '<button class="btn-icon doc-action-btn" id="doc-btn-copy" title="Copiar link">🔗</button>' +
    '<button class="btn-icon doc-action-btn" id="doc-btn-print" title="Imprimir">🖨️</button>' +
    '<button class="btn-icon doc-action-btn" id="doc-btn-duplicate" title="Duplicar artigo">⎘</button>' +
    '<button class="btn-secondary" id="doc-btn-edit" data-docid="' + doc.id + '">' + ICONS.edit + ' Editar</button>' +
    '</div>' +
    '</div>' +

    '<div class="doc-reader-scroll">' +
    '<div class="doc-reader-layout">' +

    // Main article
    '<article class="doc-reader-content">' +
    '<div class="doc-article-meta-top">' +
    '<span class="doc-cat-badge">' + _catIcon(doc.category) + ' ' + esc(doc.category) + '</span>' +
    '<span class="doc-read-time-badge">⏱ ' + rt + ' min de leitura</span>' +
    (doc.pinned ? '<span class="doc-pinned-badge">📌 Fixado</span>' : '') +
    '</div>' +
    '<h1 class="doc-article-title">' + esc(doc.title) + '</h1>' +
    '<div class="doc-article-byline">' +
    '<div class="avatar" style="background:' + avatarBg(authorName) + ';width:32px;height:32px;font-size:12px;flex-shrink:0">' + initials(authorName) + '</div>' +
    '<div class="doc-article-byline-text">' +
    '<span>Por <strong>' + esc(authorName) + '</strong></span>' +
    '<span>Atualizado em ' + new Date(doc.updatedAt).toLocaleDateString('pt-BR', {day:'2-digit',month:'long',year:'numeric'}) + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="doc-article-body">' + renderedContent + '</div>' +
    attachmentsHtml +
    relatedHtml +
    '</article>' +

    // Aside TOC
    (tocHtml ? '<aside class="doc-reader-aside">' + tocHtml + '</aside>' : '') +

    '</div></div>'
  );
}

function _bindDocsEvents_REMOVED(allDocs) {
  var main = document.getElementById('main-content');

  // Sidebar category links
  var catList = document.getElementById('doc-cat-list');
  if (catList) {
    catList.querySelectorAll('.docs-cat-link').forEach(function(el) {
      el.onclick = function() {
        App.activeDocCat = el.dataset.cat;
        App.activeDocId = null;
        App.docSearch = '';
        renderDocs();
      };
    });
    catList.querySelectorAll('.docs-pinned-link[data-docid]').forEach(function(el) {
      el.onclick = function() {
        App.activeDocId = el.dataset.docid;
        renderDocs();
      };
    });
  }

  // Sidebar new button
  var sideNew = document.getElementById('btn-new-doc-side');
  if (sideNew) sideNew.onclick = function() { showDocModal(); };

  // Search
  var searchInp = document.getElementById('doc-search');
  if (searchInp) {
    searchInp.oninput = _debounce(function() {
      App.docSearch = searchInp.value;
      App.activeDocId = null;
      renderDocs();
    }, 220);
    searchInp.onkeydown = function(e) { if (e.key === 'Escape') { App.docSearch = ''; renderDocs(); } };
  }
  var searchClear = document.getElementById('doc-search-clear');
  if (searchClear) searchClear.onclick = function() { App.docSearch = ''; renderDocs(); };

  // Grid controls
  var sortSel = document.getElementById('doc-sort-sel');
  if (sortSel) sortSel.onchange = function() { App.docSort = this.value; renderDocs(); };

  main.querySelectorAll('[data-docview]').forEach(function(btn) {
    btn.onclick = function() { App.docView = btn.dataset.docview; renderDocs(); };
  });

  // New doc buttons
  var btnNew = document.getElementById('btn-new-doc');
  if (btnNew) btnNew.onclick = function() { showDocModal(); };
  var btnNewEmpty = document.getElementById('btn-new-doc-empty');
  if (btnNewEmpty) btnNewEmpty.onclick = function() { showDocModal(); };

  // Doc card / list row click
  main.querySelectorAll('.doc-card[data-docid], .doc-list-row[data-docid]').forEach(function(el) {
    el.onclick = function() { App.activeDocId = el.dataset.docid; renderDocs(); };
  });

  // Related card click
  main.querySelectorAll('.doc-related-card[data-docid]').forEach(function(el) {
    el.onclick = function() { App.activeDocId = el.dataset.docid; renderDocs(); };
  });

  // Reader toolbar
  var btnBack = document.getElementById('btn-back-docs');
  if (btnBack) btnBack.onclick = function() { App.activeDocId = null; renderDocs(); };

  var btnEdit = document.getElementById('doc-btn-edit');
  if (btnEdit) btnEdit.onclick = function() { showDocModal(this.dataset.docid); };

  var btnPin = document.getElementById('doc-btn-pin');
  if (btnPin) btnPin.onclick = function() {
    var d = Store.docs().find(function(x){ return x.id === App.activeDocId; });
    if (d) { d.pinned = !d.pinned; Store.save(); renderDocs(); }
  };

  var btnCopy = document.getElementById('doc-btn-copy');
  if (btnCopy) btnCopy.onclick = function() {
    var pseudoUrl = window.location.origin + window.location.pathname + '#doc=' + App.activeDocId;
    if (navigator.clipboard) { navigator.clipboard.writeText(pseudoUrl); }
    showToast('Link copiado para a área de transferência', 'success');
  };

  var btnPrint = document.getElementById('doc-btn-print');
  if (btnPrint) btnPrint.onclick = function() { window.print(); };

  var btnDup = document.getElementById('doc-btn-duplicate');
  if (btnDup) btnDup.onclick = function() {
    var orig = Store.docs().find(function(x){ return x.id === App.activeDocId; });
    if (!orig) return;
    var dup = Store.addDoc(orig.title + ' (Cópia)', orig.content, orig.category);
    dup.attachments = [];
    Store.save();
    showToast('Artigo duplicado com sucesso', 'success');
    App.activeDocId = dup.id;
    renderDocs();
  };

  // TOC smooth scroll
  main.querySelectorAll('.doc-toc-link').forEach(function(a) {
    a.onclick = function(e) {
      e.preventDefault();
      var target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });

  // Hydrate attachment placeholders from IDB
  var listEl = document.getElementById('doc-reader-attach-list');
  if (listEl) {
    var docR = Store.docs().find(function(d){ return d.id === App.activeDocId; });
    if (docR && docR.attachments && docR.attachments.length > 0) {
      var ids = docR.attachments.map(function(a){ return a.id; });
      AttachmentIDB.getMany(ids, function(blobMap) {
        if (!document.getElementById('doc-reader-attach-list')) return;
        docR.attachments.forEach(function(a) {
          var item = listEl.querySelector('[data-id="' + a.id + '"]');
          if (!item) return;
          var dataURL = blobMap[a.id] || null;
          var isImg = a.type && a.type.startsWith('image/');
          var preview = dataURL
            ? (isImg ? '<img src="' + dataURL + '" title="' + esc(a.name) + '">'
                     : '<div class="attach-file-icon" title="' + esc(a.name) + '">📄</div>')
            : '<div class="attach-file-icon" title="' + esc(a.name) + ' (indisponível)">⚠️</div>';
          item.classList.remove('attach-loading');
          item.innerHTML = preview;
          if (dataURL) {
            item.style.cursor = 'pointer';
            item.onclick = (function(stub, url) {
              return function() { AttachmentManager._showViewer(stub, url); };
            })(a, dataURL);
          }
        });
      });
    }
  }
}

// Legacy stubs superseded above

function showDocModal(docId) {
  var doc = docId ? Store.docs().find(function (d) { return d.id === docId; }) : null;
  var isEdit = !!doc;
  var tempAttachments = doc && doc.attachments ? doc.attachments.slice() : [];

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';

  var catOpts = _kbCategories.map(function (c) {
    return '<option value="' + c + '"' + (doc && doc.category === c ? ' selected' : '') + '>' + _catIcon(c) + ' ' + c + '</option>';
  }).join('');

  overlay.innerHTML =
    '<div class="modal-box doc-editor-box">' +
    '<div class="doc-editor-header">' +
    '<h2 class="doc-editor-title">' + (isEdit ? '✏️ Editar Artigo' : '📝 Novo Artigo') + '</h2>' +
    '<div class="doc-editor-tabs">' +
    '<button class="doc-editor-tab doc-editor-tab-active" id="doc-tab-write">Escrever</button>' +
    '<button class="doc-editor-tab" id="doc-tab-preview">Preview</button>' +
    '</div>' +
    '<button class="modal-close" id="doc-close">' + ICONS.close + '</button>' +
    '</div>' +

    '<div class="doc-editor-meta">' +
    '<input type="text" id="doc-title" class="doc-editor-title-input" value="' + esc(doc ? doc.title : '') + '" placeholder="Título do artigo…">' +
    '<select class="field-select doc-editor-cat" id="doc-cat">' + catOpts + '</select>' +
    '</div>' +

    '<div class="doc-editor-body">' +
    // Write tab
    '<div id="doc-write-pane" class="doc-editor-pane">' +
    '<div class="doc-editor-toolbar">' +
    '<button class="doc-tb-btn" data-md="**" title="Negrito"><strong>B</strong></button>' +
    '<button class="doc-tb-btn" data-md="*" title="Itálico"><em>I</em></button>' +
    '<button class="doc-tb-btn" data-md="## " data-prefix title="Título H2">H2</button>' +
    '<button class="doc-tb-btn" data-md="### " data-prefix title="Título H3">H3</button>' +
    '<button class="doc-tb-btn" data-md="`" title="Código Inline"><code>&#96;&#96;</code></button>' +
    '<button class="doc-tb-btn" data-md="```\n" data-block title="Bloco de código">```</button>' +
    '<button class="doc-tb-btn" data-md="- " data-prefix title="Lista">• Lista</button>' +
    '<button class="doc-tb-btn" data-md="> " data-prefix title="Citação">❝</button>' +
    '<button class="doc-tb-btn" data-md="---" data-prefix title="Separador">—</button>' +
    '<span class="doc-tb-sep"></span>' +
    '<span class="doc-word-count" id="doc-word-count">0 palavras · 1 min</span>' +
    '</div>' +
    '<textarea id="doc-content" class="doc-editor-textarea" placeholder="Escreva o conteúdo em Markdown…\n\n## Seção\nParagrafo normal\n\n- Item 1\n- Item 2\n\n```\ncódigo\n```">' + esc(doc ? doc.content : '') + '</textarea>' +
    '</div>' +
    // Preview tab
    '<div id="doc-preview-pane" class="doc-editor-pane doc-editor-pane-hidden">' +
    '<div class="doc-preview-render doc-article-body" id="doc-preview-content"></div>' +
    '</div>' +
    '</div>' +

    '<div class="doc-editor-attach">' +
    '<div class="field-label" style="margin-bottom:6px">📎 Anexos</div>' +
    '<div class="attach-zone" id="doc-attach-zone">Clique, solte arquivos ou cole (Ctrl+V)</div>' +
    '<div class="attach-list" id="doc-attach-list"></div>' +
    '</div>' +

    '<div class="doc-editor-footer">' +
    '<div>' + (isEdit ? '<button class="btn-secondary btn-danger" id="doc-delete">' + ICONS.trash + ' Excluir</button>' : '') + '</div>' +
    '<div style="display:flex;gap:10px">' +
    '<button class="btn-secondary" id="doc-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="doc-save">💾 Salvar Artigo</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  AttachmentManager.bind('doc-attach-zone', 'doc-attach-list', tempAttachments, function(){});

  // Word count updater
  var docContent = document.getElementById('doc-content');
  var wc = document.getElementById('doc-word-count');
  function updateWordCount() {
    var words = (docContent.value.trim().match(/\S+/g) || []).length;
    var mins = Math.max(1, Math.ceil(words / 200));
    if (wc) wc.textContent = words + ' palavras · ' + mins + ' min';
  }
  updateWordCount();
  docContent.oninput = updateWordCount;

  // Toolbar buttons
  overlay.querySelectorAll('.doc-tb-btn').forEach(function(btn) {
    btn.onclick = function() {
      var md = btn.dataset.md;
      var isPrefix = btn.hasAttribute('data-prefix');
      var isBlock = btn.hasAttribute('data-block');
      var ta = docContent;
      var start = ta.selectionStart, end = ta.selectionEnd;
      var sel = ta.value.substring(start, end);
      var replacement;
      if (isPrefix) {
        replacement = md + (sel || 'texto');
      } else if (isBlock) {
        replacement = '```\n' + (sel || 'código') + '\n```';
      } else {
        replacement = md + (sel || 'texto') + md;
      }
      ta.value = ta.value.substring(0, start) + replacement + ta.value.substring(end);
      ta.focus();
      ta.setSelectionRange(start + md.length, start + md.length + (sel || 'texto').length);
      updateWordCount();
    };
  });

  // Tab switching
  var writePane = document.getElementById('doc-write-pane');
  var previewPane = document.getElementById('doc-preview-pane');
  var tabWrite = document.getElementById('doc-tab-write');
  var tabPreview = document.getElementById('doc-tab-preview');
  tabWrite.onclick = function() {
    writePane.classList.remove('doc-editor-pane-hidden');
    previewPane.classList.add('doc-editor-pane-hidden');
    tabWrite.classList.add('doc-editor-tab-active');
    tabPreview.classList.remove('doc-editor-tab-active');
  };
  tabPreview.onclick = function() {
    document.getElementById('doc-preview-content').innerHTML = _renderMarkdown(docContent.value);
    previewPane.classList.remove('doc-editor-pane-hidden');
    writePane.classList.add('doc-editor-pane-hidden');
    tabPreview.classList.add('doc-editor-tab-active');
    tabWrite.classList.remove('doc-editor-tab-active');
  };

  var closeDocsModal = function() { AttachmentManager.unbindGlobalPaste(); overlay.remove(); };
  document.getElementById('doc-close').onclick = closeDocsModal;
  document.getElementById('doc-cancel').onclick = closeDocsModal;
  overlay.onclick = function(e) { if (e.target === overlay) closeDocsModal(); };

  var delBtn = document.getElementById('doc-delete');
  if (delBtn) {
    delBtn.onclick = function() {
      if (confirm('Excluir este artigo permanentemente?')) {
        Store.deleteDoc(doc.id);
        closeDocsModal();
        App.activeDocId = null;
        renderDocs();
      }
    };
  }

  document.getElementById('doc-save').onclick = function() {
    var title = document.getElementById('doc-title').value.trim();
    var content = docContent.value.trim();
    var cat = document.getElementById('doc-cat').value;
    if (!title) { showToast('Informe o título do artigo', 'error'); document.getElementById('doc-title').focus(); return; }
    if (!content) { showToast('O conteúdo não pode estar vazio', 'error'); docContent.focus(); return; }

    var savedDoc;
    if (isEdit) {
      Store.updateDoc(doc.id, title, content, cat);
      savedDoc = doc;
      savedDoc.attachments = tempAttachments;
      Store.save();
    } else {
      savedDoc = Store.addDoc(title, content, cat);
      savedDoc.attachments = tempAttachments; 
      Store.save();
      App.activeDocCat = cat;
    }
    
    closeDocsModal();
    App.activeDocId = savedDoc.id;
    renderDocs();
  };
}

// ─── SHARED RICH-ROW HELPERS ────────────────────────────────
function refreshCurrent() {
  if (App.view === 'board') renderBoard();
  else if (App.view === 'mytasks') renderMyTasks();
  else renderDashboard();
}

function richTicketCell(card) {
  var req = card.requesterId ? Store.user(card.requesterId) : null;
  return '<div><span style="font-size:11px;color:var(--text-light)">#' + String(card.ticketNumber).padStart(3, '0') + '</span> <strong>' + esc(card.title) + '</strong></div>' +
    (req ? '<div style="font-size:11px;color:var(--text-light);margin-top:2px">👤 ' + esc(req.name) + '</div>' : '') +
    (card.category ? '<span class="dash-cat-tag">' + esc(card.category) + '</span>' : '');
}

function richDateCell(card, isDone) {
  if (!card.dueDate) return '—';
  var now = new Date();
  var dueFmt = parseDate(card.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  if (isDone) {
    if (card.completedAt) {
      var cd = new Date(card.completedAt);
      var cStr = cd.getFullYear() + '-' + String(cd.getMonth() + 1).padStart(2, '0') + '-' + String(cd.getDate()).padStart(2, '0');
      return cStr > card.dueDate
        ? '<span style="color:#f97316;font-weight:600">' + dueFmt + ' ⚠</span>'
        : '<span style="color:var(--green);font-weight:600">' + dueFmt + ' ✓</span>';
    }
    return '<span style="color:var(--green);font-weight:600">' + dueFmt + ' ✓</span>';
  }
  var over = parseDate(card.dueDate) < now;
  var soon = !over && parseDate(card.dueDate) <= new Date(now.getTime() + 2 * 86400000);
  if (over)  return '<span style="color:var(--red);font-weight:600">'    + dueFmt + ' ⚠</span>';
  if (soon)  return '<span style="color:#f97316;font-weight:600">'        + dueFmt + '</span>';
  return dueFmt;
}

function richAsgnCell(card) {
  var u = card.assigneeId ? Store.user(card.assigneeId) : null;
  return u
    ? '<div class="avatar avatar-sm" style="background:' + avatarBg(u.name) + '" title="' + esc(u.name) + '">' + initials(u.name) + '</div>'
    : '<span style="color:var(--text-light);font-size:12px">—</span>';
}

function richActionBtn(bid, lid, cid) {
  return '<button class="dash-action-btn" data-bid="' + bid + '" data-lid="' + lid + '" data-cid="' + cid + '">⋯</button>';
}

// ============================================================
// ADMIN PANEL
// ============================================================
function renderAdmin() {
  var main = document.getElementById('main-content');
  if (!main) return;
  if (!Store.isAdmin()) { renderDashboard(); return; }

  var tabs = [
    { id: 'users',     label: 'Usuários',          icon: ICONS.users },
    { id: 'depts',     label: 'Setores',            icon: ICONS.flag },
    { id: 'cats',      label: 'Categorias',         icon: ICONS.label },
    { id: 'sla',       label: 'Prioridades & SLA',  icon: ICONS.time },
    { id: 'quality',   label: 'Métricas',           icon: ICONS.metrics },
    { id: 'templates', label: 'Templates',          icon: ICONS.desc },
    { id: 'boards',    label: 'Quadros',            icon: ICONS.board },
    { id: 'audit',     label: 'Auditoria',          icon: ICONS.activity },
    { id: 'system',    label: 'Sistema',            icon: ICONS.settings },
  ];

  var tabBar = tabs.map(function (t) {
    return '<button class="admin-tab' + (App.adminTab === t.id ? ' active' : '') + '" data-tab="' + t.id + '">' +
      '<span style="width:16px;height:16px;display:inline-block">' + t.icon + '</span> ' + t.label + '</button>';
  }).join('');

  main.innerHTML =
    '<div class="admin-page">' +
    '<div class="admin-header">' +
    '<div style="display:flex;align-items:center;gap:12px">' +
    '<div style="width:36px;height:36px">' + ICONS.shield + '</div>' +
    '<div><h2 style="margin:0;font-size:20px">Painel de Administração</h2>' +
    '<p style="margin:2px 0 0;font-size:13px;color:var(--text-secondary)">' + esc(Store.getSetting('companyName', 'Mottion Desk')) + '</p></div>' +
    '</div>' +
    '</div>' +
    '<div class="admin-tabs" id="admin-tabs">' + tabBar + '</div>' +
    '<div class="admin-content" id="admin-content"></div>' +
    '</div>';

  main.querySelectorAll('.admin-tab').forEach(function (btn) {
    btn.onclick = function () {
      App.adminTab = btn.dataset.tab;
      renderAdmin();
    };
  });

  renderAdminTab(App.adminTab);
}

function renderAdminTab(tab) {
  var el = document.getElementById('admin-content');
  if (!el) return;
  if (tab === 'users')      renderAdminUsers(el);
  else if (tab === 'depts')      renderAdminDepts(el);
  else if (tab === 'cats')       renderAdminCats(el);
  else if (tab === 'sla')        renderAdminSla(el);
  else if (tab === 'quality')    renderAdminQuality(el);
  else if (tab === 'templates')  renderAdminTemplates(el);
  else if (tab === 'boards')     renderAdminBoards(el);
  else if (tab === 'audit')      renderAdminAudit(el);
  else if (tab === 'system')  renderAdminSystem(el);
}

// ─── TAB: USUÁRIOS ──────────────────────────────────────────
function renderAdminUsers(el) {
  var allUsers = Store.allUsers();
  var me = Store.me();
  var depts = getDepts();

  // ── filter state ──
  var q = (App.userSearch || '').toLowerCase().trim();
  var fDept = App.userFilterDept || '';
  var fRole = App.userFilterRole || '';
  var sortBy = App.userSort || 'name';

  var filtered = allUsers.filter(function (u) {
    if (q && (u.name || '').toLowerCase().indexOf(q) < 0 && (u.email || '').toLowerCase().indexOf(q) < 0 && (u.role || '').toLowerCase().indexOf(q) < 0) return false;
    if (fDept && u.department !== fDept) return false;
    if (fRole === 'admin' && !u.isAdmin) return false;
    if (fRole === 'user' && u.isAdmin) return false;
    return true;
  });

  filtered.sort(function (a, b) {
    if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
    if (sortBy === 'oldest') return (a.createdAt || 0) - (b.createdAt || 0);
    if (sortBy === 'dept')   return (a.department || '').localeCompare(b.department || '');
    return (a.name || '').localeCompare(b.name || '');
  });

  // ── kpi counters ──
  var adminCount = allUsers.filter(function (u) { return u.isAdmin; }).length;
  var deptSet = {};
  allUsers.forEach(function (u) { if (u.department) deptSet[u.department] = 1; });
  var deptCount = Object.keys(deptSet).length;

  // open tickets per user
  var ticketMap = {};
  Store.boards().forEach(function (b) {
    b.lists.forEach(function (l) {
      var isDone = /conclu|done|encerr/i.test(l.name);
      l.cards.forEach(function (c) {
        if (!isDone && c.assigneeId) ticketMap[c.assigneeId] = (ticketMap[c.assigneeId] || 0) + 1;
      });
    });
  });

  // ── dept opts ──
  var deptFilterOpts = '<option value="">Todos os setores</option>' +
    depts.map(function (d) { return '<option value="' + d.id + '"' + (fDept === d.id ? ' selected' : '') + '>' + d.icon + ' ' + d.name + '</option>'; }).join('');

  // ── kpi bar ──
  var kpiBar =
    '<div class="usr-kpi-bar">' +
    '<div class="usr-kpi-card"><div class="usr-kpi-value">' + allUsers.length + '</div><div class="usr-kpi-label">Total de usuários</div></div>' +
    '<div class="usr-kpi-card"><div class="usr-kpi-value" style="color:var(--brand)">' + adminCount + '</div><div class="usr-kpi-label">Administradores</div></div>' +
    '<div class="usr-kpi-card"><div class="usr-kpi-value">' + (allUsers.length - adminCount) + '</div><div class="usr-kpi-label">Colaboradores</div></div>' +
    '<div class="usr-kpi-card"><div class="usr-kpi-value">' + deptCount + '</div><div class="usr-kpi-label">Setores ativos</div></div>' +
    '</div>';

  // ── toolbar ──
  var toolbar =
    '<div class="usr-toolbar">' +
    '<div class="usr-search-wrap">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
    '<input type="text" id="usr-search" class="usr-search-input" placeholder="Buscar por nome, e-mail ou cargo…" value="' + esc(App.userSearch || '') + '">' +
    (q ? '<button id="usr-search-clear" class="usr-search-clear">✕</button>' : '') +
    '</div>' +
    '<select id="usr-filter-dept" class="filter-select" style="height:36px;font-size:12px;min-width:150px">' + deptFilterOpts + '</select>' +
    '<select id="usr-filter-role" class="filter-select" style="height:36px;font-size:12px;min-width:120px">' +
    '<option value=""' + (!fRole ? ' selected' : '') + '>Todos os perfis</option>' +
    '<option value="admin"' + (fRole === 'admin' ? ' selected' : '') + '>🛡 Admins</option>' +
    '<option value="user"' + (fRole === 'user' ? ' selected' : '') + '>👤 Colaboradores</option>' +
    '</select>' +
    '<select id="usr-sort" class="filter-select" style="height:36px;font-size:12px;min-width:130px">' +
    '<option value="name"' + (sortBy === 'name' ? ' selected' : '') + '>A → Z</option>' +
    '<option value="newest"' + (sortBy === 'newest' ? ' selected' : '') + '>Mais recentes</option>' +
    '<option value="oldest"' + (sortBy === 'oldest' ? ' selected' : '') + '>Mais antigos</option>' +
    '<option value="dept"' + (sortBy === 'dept' ? ' selected' : '') + '>Setor</option>' +
    '</select>' +
    '<div style="margin-left:auto">' +
    '<button class="btn-primary" id="btn-add-user" style="height:36px;padding:0 16px;font-size:13px;white-space:nowrap">+ Novo Usuário</button>' +
    '</div>' +
    '</div>';

  // ── bulk bar ──
  var sel = App.selectedUsers || [];
  var bulkBar = sel.length > 0
    ? '<div class="usr-bulk-bar">' +
      '<span class="usr-bulk-count">' + sel.length + ' usuário' + (sel.length > 1 ? 's' : '') + ' selecionado' + (sel.length > 1 ? 's' : '') + '</span>' +
      '<button class="btn-secondary usr-bulk-btn" id="usr-bulk-deselect">✕ Desmarcar</button>' +
      '<button class="btn-secondary usr-bulk-btn" id="usr-bulk-del" style="color:var(--red)">🗑 Excluir selecionados</button>' +
      '</div>'
    : '';

  // ── table rows ──
  var rows = filtered.length === 0
    ? '<tr><td colspan="7"><div class="usr-empty"><span style="font-size:32px;opacity:.4">👥</span><div>Nenhum usuário encontrado</div></div></td></tr>'
    : filtered.map(function (u) {
        var d = dept(u.department);
        var isSelf = u.id === me.id;
        var tickets = ticketMap[u.id] || 0;
        var createdFmt = u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
        var isSelected = sel.indexOf(u.id) >= 0;
        return '<tr class="usr-row' + (isSelected ? ' usr-row-selected' : '') + '" data-uid="' + u.id + '">' +
          '<td class="usr-td-check"><input type="checkbox" class="usr-checkbox" data-uid="' + u.id + '"' + (isSelected ? ' checked' : '') + (isSelf ? ' disabled title="Você não pode se selecionar"' : '') + '></td>' +
          '<td>' +
          '<div class="usr-identity">' +
          '<div class="avatar" style="background:' + avatarBg(u.name) + ';width:36px;height:36px;font-size:13px;flex-shrink:0">' + initials(u.name) + '</div>' +
          '<div class="usr-identity-text">' +
          '<div class="usr-name">' + esc(u.name) + (isSelf ? ' <span class="usr-you-tag">você</span>' : '') + '</div>' +
          '<div class="usr-email">' + esc(u.email) + '</div>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '<td><span class="usr-dept-badge" style="background:' + d.color + '22;color:' + d.color + ';border:1px solid ' + d.color + '44">' + d.icon + ' ' + d.name + '</span></td>' +
          '<td><span class="usr-role-label">' + esc(u.role || '—') + '</span></td>' +
          '<td>' +
          (u.isAdmin
            ? '<span class="usr-profile-badge usr-profile-admin">🛡 Admin</span>'
            : '<span class="usr-profile-badge usr-profile-user">👤 Colaborador</span>') +
          '</td>' +
          '<td class="usr-td-tickets">' +
          (tickets > 0 ? '<span class="usr-ticket-count">' + tickets + '</span>' : '<span style="color:var(--text-light);font-size:12px">—</span>') +
          '</td>' +
          '<td class="usr-td-date">' + createdFmt + '</td>' +
          '<td class="usr-td-actions">' +
          '<button class="usr-action-btn admin-edit-user" data-uid="' + u.id + '" title="Editar usuário">✏️</button>' +
          (!isSelf ? '<button class="usr-action-btn admin-del-user" data-uid="' + u.id + '" title="Excluir usuário">🗑</button>' : '') +
          '</td>' +
          '</tr>';
      }).join('');

  el.innerHTML =
    '<div class="usr-module">' +
    kpiBar +
    toolbar +
    bulkBar +
    '<div class="usr-table-wrap">' +
    '<table class="admin-table usr-table">' +
    '<thead><tr>' +
    '<th class="usr-td-check"><input type="checkbox" id="usr-check-all" title="Selecionar todos"></th>' +
    '<th>Usuário</th>' +
    '<th>Setor</th>' +
    '<th>Cargo</th>' +
    '<th>Perfil</th>' +
    '<th class="usr-td-tickets" title="Tickets abertos atribuídos">#</th>' +
    '<th class="usr-td-date">Criado em</th>' +
    '<th class="usr-td-actions">Ações</th>' +
    '</tr></thead>' +
    '<tbody>' + rows + '</tbody>' +
    '</table>' +
    '</div>' +
    '<div class="usr-footer">Exibindo ' + filtered.length + ' de ' + allUsers.length + ' usuário' + (allUsers.length !== 1 ? 's' : '') + '</div>' +
    '</div>';

  // ── events ──
  var searchInp = el.querySelector('#usr-search');
  if (searchInp) {
    searchInp.oninput = _debounce(function () { App.userSearch = searchInp.value; renderAdminUsers(el); }, 220);
    searchInp.onkeydown = function (e) { if (e.key === 'Escape') { App.userSearch = ''; renderAdminUsers(el); } };
  }
  var searchClear = el.querySelector('#usr-search-clear');
  if (searchClear) searchClear.onclick = function () { App.userSearch = ''; renderAdminUsers(el); };

  var deptSel = el.querySelector('#usr-filter-dept');
  if (deptSel) deptSel.onchange = function () { App.userFilterDept = this.value; renderAdminUsers(el); };

  var roleSel = el.querySelector('#usr-filter-role');
  if (roleSel) roleSel.onchange = function () { App.userFilterRole = this.value; renderAdminUsers(el); };

  var sortSel = el.querySelector('#usr-sort');
  if (sortSel) sortSel.onchange = function () { App.userSort = this.value; renderAdminUsers(el); };

  var btnAdd = el.querySelector('#btn-add-user');
  if (btnAdd) btnAdd.onclick = function () { showAddUserModal(el); };

  // checkboxes
  var checkAll = el.querySelector('#usr-check-all');
  if (checkAll) {
    checkAll.onchange = function () {
      if (this.checked) {
        App.selectedUsers = filtered.filter(function (u) { return u.id !== me.id; }).map(function (u) { return u.id; });
      } else {
        App.selectedUsers = [];
      }
      renderAdminUsers(el);
    };
  }
  el.querySelectorAll('.usr-checkbox').forEach(function (cb) {
    cb.onchange = function () {
      var uid = cb.dataset.uid;
      if (cb.checked) {
        if (App.selectedUsers.indexOf(uid) < 0) App.selectedUsers.push(uid);
      } else {
        App.selectedUsers = App.selectedUsers.filter(function (id) { return id !== uid; });
      }
      renderAdminUsers(el);
    };
  });

  // bulk actions
  var btnDesel = el.querySelector('#usr-bulk-deselect');
  if (btnDesel) btnDesel.onclick = function () { App.selectedUsers = []; renderAdminUsers(el); };

  var btnBulkDel = el.querySelector('#usr-bulk-del');
  if (btnBulkDel) btnBulkDel.onclick = function () {
    var toDelete = (App.selectedUsers || []).filter(function (id) { return id !== me.id; });
    if (!toDelete.length) return;
    if (!confirm('Excluir ' + toDelete.length + ' usuário(s) selecionado(s)? Esta ação não pode ser desfeita.')) return;
    toDelete.forEach(function (id) {
      var u = Store.user(id);
      if (u) Store.audit('excluiu usuário', u.name);
      Store.deleteUser(id);
    });
    App.selectedUsers = [];
    showToast(toDelete.length + ' usuário(s) excluído(s).', 'success');
    renderAdminUsers(el);
  };

  el.querySelectorAll('.admin-edit-user').forEach(function (btn) {
    btn.onclick = function (e) { e.stopPropagation(); showEditUserModal(btn.dataset.uid, el); };
  });
  el.querySelectorAll('.admin-del-user').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var u = Store.user(btn.dataset.uid);
      if (!u) return;
      if (confirm('Excluir usuário "' + u.name + '"? Esta ação não pode ser desfeita.')) {
        Store.audit('excluiu usuário', u.name);
        Store.deleteUser(btn.dataset.uid);
        showToast('Usuário excluído.', 'success');
        renderAdminUsers(el);
      }
    };
  });
}

// ─── MODAL: NOVO USUÁRIO ─────────────────────────────────────
function showAddUserModal(el) {
  var old = document.getElementById('popup-overlay');
  if (old) old.remove();

  var deptOpts = getDepts().map(function (d) {
    return '<option value="' + d.id + '">' + d.icon + ' ' + d.name + '</option>';
  }).join('');

  var popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.id = 'popup-overlay';
  popup.innerHTML =
    '<div class="popup-box usr-modal-box">' +
    '<div class="usr-modal-header">' +
    '<div class="usr-modal-avatar" id="au-avatar-preview" style="background:#3B82F6">AU</div>' +
    '<div><h3 class="usr-modal-title">Novo Usuário</h3><p class="usr-modal-sub">Preencha os dados para criar a conta</p></div>' +
    '</div>' +
    '<div class="usr-modal-body">' +
    '<div class="usr-modal-section-title">Informações pessoais</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Nome completo *</label><input class="form-input" id="au-name" placeholder="João Silva" autocomplete="off"></div>' +
    '<div class="form-group"><label class="field-label">E-mail *</label><input class="form-input" type="email" id="au-email" placeholder="joao@empresa.com" autocomplete="off"></div>' +
    '</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Telefone</label><input class="form-input" id="au-phone" placeholder="(11) 99999-9999"></div>' +
    '<div class="form-group"><label class="field-label">Cargo *</label><input class="form-input" id="au-role" placeholder="Analista de TI"></div>' +
    '</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Setor *</label><select class="form-select" id="au-dept">' + deptOpts + '</select></div>' +
    '<div class="form-group"><label class="field-label">Senha *</label>' +
    '<div style="position:relative">' +
    '<input class="form-input" type="password" id="au-pw" autocomplete="new-password" placeholder="Mínimo 8 caracteres" style="padding-right:38px">' +
    '<button type="button" id="au-pw-toggle" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-secondary)" title="Mostrar senha">👁</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="usr-modal-section-title" style="margin-top:16px">Observações</div>' +
    '<textarea class="form-input" id="au-notes" rows="2" placeholder="Informações adicionais sobre o usuário…" style="resize:vertical;min-height:60px"></textarea>' +
    '<div class="usr-modal-section-title" style="margin-top:16px">Permissões</div>' +
    '<div class="usr-permission-row">' +
    '<div>' +
    '<div class="usr-permission-title">Perfil Administrador</div>' +
    '<div class="usr-permission-desc">Acesso completo ao painel de administração e configurações do sistema</div>' +
    '</div>' +
    '<label class="toggle-switch"><input type="checkbox" id="au-admin"><span class="toggle-slider"></span></label>' +
    '</div>' +
    '</div>' +
    '<div class="usr-modal-footer">' +
    '<button class="btn-secondary" id="au-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="au-save">Criar Usuário</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(popup);

  // Live avatar preview
  var nameInp = popup.querySelector('#au-name');
  var avatarPrev = popup.querySelector('#au-avatar-preview');
  nameInp.oninput = function () {
    avatarPrev.textContent = initials(nameInp.value) || 'AU';
    avatarPrev.style.background = nameInp.value ? avatarBg(nameInp.value) : '#3B82F6';
  };

  // Password toggle
  popup.querySelector('#au-pw-toggle').onclick = function () {
    var pwInp = popup.querySelector('#au-pw');
    var showing = pwInp.type === 'text';
    pwInp.type = showing ? 'password' : 'text';
    this.textContent = showing ? '👁' : '🙈';
  };

  popup.querySelector('#au-cancel').onclick = function () { popup.remove(); };
  popup.onclick = function (e) { if (e.target === popup) popup.remove(); };

  popup.querySelector('#au-save').onclick = async function () {
    var name  = (popup.querySelector('#au-name').value || '').trim();
    var email = (popup.querySelector('#au-email').value || '').trim();
    var pw    = (popup.querySelector('#au-pw').value || '');
    var role  = (popup.querySelector('#au-role').value || '').trim() || 'Colaborador';
    var deptId = popup.querySelector('#au-dept').value;
    var isAdmin = popup.querySelector('#au-admin').checked;

    if (!name)  { showToast('Informe o nome completo.', 'error'); popup.querySelector('#au-name').focus(); return; }
    if (!email) { showToast('Informe o e-mail.', 'error'); popup.querySelector('#au-email').focus(); return; }
    if (pw.length < 8) { showToast('Senha mínima: 8 caracteres.', 'error'); popup.querySelector('#au-pw').focus(); return; }

    var saveBtn = popup.querySelector('#au-save');
    saveBtn.disabled = true; saveBtn.textContent = 'Criando…';

    var created = await Store.addUser(name, email, pw, deptId, role, isAdmin);
    if (!created) {
      showToast('E-mail já cadastrado no sistema.', 'error');
      saveBtn.disabled = false; saveBtn.textContent = 'Criar Usuário';
      return;
    }
    // save extra fields
    created.phone = (popup.querySelector('#au-phone').value || '').trim();
    created.notes = (popup.querySelector('#au-notes').value || '').trim();
    Store.save();
    Store.audit('criou usuário', name);
    popup.remove();
    showToast('Usuário "' + name + '" criado com sucesso!', 'success');
    App.selectedUsers = [];
    if (el) renderAdminUsers(el);
  };
}

// ─── MODAL: EDITAR USUÁRIO ───────────────────────────────────
function showEditUserModal(userId, elRef) {
  var u = Store.user(userId);
  if (!u) return;
  var me = Store.me();
  var isSelf = u.id === me.id;

  var old = document.getElementById('popup-overlay');
  if (old) old.remove();

  var deptOpts = getDepts().map(function (d) {
    return '<option value="' + d.id + '"' + (d.id === u.department ? ' selected' : '') + '>' + d.icon + ' ' + d.name + '</option>';
  }).join('');

  // open tickets for this user
  var openTickets = 0;
  Store.boards().forEach(function (b) {
    b.lists.forEach(function (l) {
      if (!/conclu|done|encerr/i.test(l.name)) {
        l.cards.forEach(function (c) { if (c.assigneeId === u.id) openTickets++; });
      }
    });
  });

  var popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.id = 'popup-overlay';
  popup.innerHTML =
    '<div class="popup-box usr-modal-box">' +
    '<div class="usr-modal-header">' +
    '<div class="usr-modal-avatar" id="eu-avatar-preview" style="background:' + avatarBg(u.name) + '">' + initials(u.name) + '</div>' +
    '<div style="flex:1;min-width:0">' +
    '<h3 class="usr-modal-title">Editar Usuário</h3>' +
    '<p class="usr-modal-sub">' + esc(u.email) + ' · ' +
    (openTickets > 0 ? '<span style="color:var(--brand);font-weight:600">' + openTickets + ' ticket' + (openTickets > 1 ? 's' : '') + ' aberto' + (openTickets > 1 ? 's' : '') + '</span>' : 'Nenhum ticket aberto') +
    '</p>' +
    '</div>' +
    '<div class="usr-modal-header-badges">' +
    (u.isAdmin ? '<span class="usr-profile-badge usr-profile-admin">🛡 Admin</span>' : '<span class="usr-profile-badge usr-profile-user">👤 Colaborador</span>') +
    (isSelf ? '<span class="usr-you-tag" style="font-size:11px;padding:2px 8px">você</span>' : '') +
    '</div>' +
    '</div>' +
    '<div class="usr-modal-body">' +
    '<div class="usr-modal-section-title">Informações pessoais</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Nome completo</label><input class="form-input" id="eu-name" value="' + esc(u.name) + '"></div>' +
    '<div class="form-group"><label class="field-label">E-mail</label><input class="form-input" type="email" id="eu-email" value="' + esc(u.email) + '"></div>' +
    '</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Telefone</label><input class="form-input" id="eu-phone" value="' + esc(u.phone || '') + '" placeholder="(11) 99999-9999"></div>' +
    '<div class="form-group"><label class="field-label">Cargo</label><input class="form-input" id="eu-role" value="' + esc(u.role || '') + '"></div>' +
    '</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label class="field-label">Setor</label><select class="form-select" id="eu-dept">' + deptOpts + '</select></div>' +
    '<div class="form-group"><label class="field-label">Nova senha <span style="font-size:11px;font-weight:400;color:var(--text-light)">(deixe vazio para não alterar)</span></label>' +
    '<div style="position:relative">' +
    '<input class="form-input" type="password" id="eu-pw" autocomplete="new-password" placeholder="••••••••" style="padding-right:38px">' +
    '<button type="button" id="eu-pw-toggle" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-secondary)" title="Mostrar senha">👁</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="usr-modal-section-title" style="margin-top:16px">Observações</div>' +
    '<textarea class="form-input" id="eu-notes" rows="2" placeholder="Informações adicionais…" style="resize:vertical;min-height:60px">' + esc(u.notes || '') + '</textarea>' +
    (!isSelf ?
      '<div class="usr-modal-section-title" style="margin-top:16px">Permissões</div>' +
      '<div class="usr-permission-row">' +
      '<div>' +
      '<div class="usr-permission-title">Perfil Administrador</div>' +
      '<div class="usr-permission-desc">Acesso completo ao painel de administração e configurações do sistema</div>' +
      '</div>' +
      '<label class="toggle-switch"><input type="checkbox" id="eu-admin"' + (u.isAdmin ? ' checked' : '') + '><span class="toggle-slider"></span></label>' +
      '</div>'
    : '') +
    '</div>' +
    '<div class="usr-modal-footer">' +
    (!isSelf ? '<button class="btn-secondary" id="eu-delete" style="color:var(--red)">🗑 Excluir</button>' : '<div></div>') +
    '<div style="display:flex;gap:8px">' +
    '<button class="btn-secondary" id="eu-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="eu-save">💾 Salvar</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  document.body.appendChild(popup);

  // Live avatar preview on name change
  var nameInp = popup.querySelector('#eu-name');
  var avatarPrev = popup.querySelector('#eu-avatar-preview');
  nameInp.oninput = function () {
    avatarPrev.textContent = initials(nameInp.value) || '?';
    avatarPrev.style.background = avatarBg(nameInp.value);
  };

  // Password toggle
  popup.querySelector('#eu-pw-toggle').onclick = function () {
    var pwInp = popup.querySelector('#eu-pw');
    var showing = pwInp.type === 'text';
    pwInp.type = showing ? 'password' : 'text';
    this.textContent = showing ? '👁' : '🙈';
  };

  popup.querySelector('#eu-cancel').onclick = function () { popup.remove(); };
  popup.onclick = function (e) { if (e.target === popup) popup.remove(); };

  var delBtn = popup.querySelector('#eu-delete');
  if (delBtn) {
    delBtn.onclick = function () {
      if (confirm('Excluir "' + u.name + '"? Esta ação não pode ser desfeita.')) {
        Store.audit('excluiu usuário', u.name);
        Store.deleteUser(u.id);
        showToast('Usuário excluído.', 'success');
        popup.remove();
        var el = document.getElementById('admin-content');
        if (el) renderAdminUsers(el);
      }
    };
  }

  popup.querySelector('#eu-save').onclick = async function () {
    var pw = popup.querySelector('#eu-pw').value;
    if (pw && pw.length < 8) { showToast('Senha mínima: 8 caracteres.', 'error'); return; }
    var saveBtn = popup.querySelector('#eu-save');
    saveBtn.disabled = true; saveBtn.textContent = 'Salvando…';

    var updates = {
      name:       (popup.querySelector('#eu-name').value || '').trim() || u.name,
      email:      (popup.querySelector('#eu-email').value || '').trim() || u.email,
      role:       (popup.querySelector('#eu-role').value || '').trim(),
      department: popup.querySelector('#eu-dept').value,
    };
    if (pw) updates.newPw = pw;
    var adminChk = popup.querySelector('#eu-admin');
    if (adminChk) updates.isAdmin = adminChk.checked;

    await Store.updateUser(userId, updates);

    // extra fields
    var freshUser = Store.user(userId);
    if (freshUser) {
      freshUser.phone = (popup.querySelector('#eu-phone').value || '').trim();
      freshUser.notes = (popup.querySelector('#eu-notes').value || '').trim();
      Store.save();
    }

    Store.audit('editou usuário', updates.name || '');
    popup.remove();
    showToast('Usuário atualizado!', 'success');
    var el = elRef || document.getElementById('admin-content');
    if (el) renderAdminUsers(el);
  };
}

// ─── TAB: SETORES ───────────────────────────────────────────
function renderAdminDepts(el) {
  var depts = getDepts();

  var rows = depts.map(function (d, idx) {
    return '<tr>' +
      '<td><span style="font-size:22px">' + d.icon + '</span></td>' +
      '<td><strong style="font-size:14px">' + esc(d.name) + '</strong></td>' +
      '<td><div style="display:flex;align-items:center;gap:8px"><div style="width:16px;height:16px;border-radius:50%;background:' + d.color + '"></div><code style="font-size:12px">' + d.color + '</code></div></td>' +
      '<td><span class="badge" style="background:' + d.color + '">' + d.icon + ' ' + d.name + '</span></td>' +
      '<td style="white-space:nowrap">' +
      '<button class="btn-secondary admin-edit-dept" data-idx="' + idx + '" style="padding:0 10px;height:28px;font-size:12px;margin-right:4px">' + ICONS.edit + ' Editar</button>' +
      '<button class="btn-secondary admin-del-dept" data-idx="' + idx + '" style="padding:0 10px;height:28px;font-size:12px;color:var(--red)">' + ICONS.trash + '</button>' +
      '</td>' +
      '</tr>';
  }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head">' +
    '<h3>Setores (' + depts.length + ')</h3>' +
    '<button class="btn-primary" id="admin-add-dept" style="height:34px;padding:0 16px">' + ICONS.plus + ' Novo Setor</button>' +
    '</div>' +
    '<table class="admin-table"><thead><tr><th style="width:48px">Ícone</th><th>Nome</th><th>Cor</th><th>Preview</th><th style="width:140px">Ações</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '</div>';

  document.getElementById('admin-add-dept').onclick = function () { showDeptModal(null); };

  el.querySelectorAll('.admin-edit-dept').forEach(function (btn) {
    btn.onclick = function () { showDeptModal(parseInt(btn.dataset.idx)); };
  });
  el.querySelectorAll('.admin-del-dept').forEach(function (btn) {
    btn.onclick = function () {
      var idx = parseInt(btn.dataset.idx);
      var ds = getDepts();
      if (ds.length <= 1) { showToast('Deve haver ao menos 1 setor.', 'error'); return; }
      if (confirm('Excluir setor "' + ds[idx].name + '"?')) {
        ds.splice(idx, 1);
        Store.saveSetting('departments', ds);
        showToast('Setor excluído.', 'success');
        renderAdmin();
      }
    };
  });
}

function showDeptModal(idx) {
  var depts = getDepts();
  var isEdit = idx !== null;
  var d = isEdit ? depts[idx] : { id: '', name: '', icon: '🏢', color: '#6B7280' };

  var old = document.getElementById('popup-overlay');
  if (old) old.remove();

  var popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.id = 'popup-overlay';
  popup.innerHTML =
    '<div class="popup-box" style="max-width:380px">' +
    '<h3 style="margin:0 0 20px">' + (isEdit ? 'Editar Setor' : 'Novo Setor') + '</h3>' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Ícone (emoji)</label><input class="form-input" id="dp-icon" value="' + esc(d.icon) + '" style="font-size:20px;text-align:center;width:60px"></div>' +
    '<div class="form-group"><label>Nome</label><input class="form-input" id="dp-name" value="' + esc(d.name) + '"></div>' +
    '</div>' +
    '<div class="form-row">' +
    (!isEdit ? '<div class="form-group"><label>ID <span style="font-size:11px;color:var(--text-light)">(sem espaços)</span></label><input class="form-input" id="dp-id" value="' + esc(d.id) + '" placeholder="ex: rh2"></div>' : '') +
    '<div class="form-group"><label>Cor</label><input type="color" class="form-input" id="dp-color" value="' + d.color + '" style="padding:4px;height:40px;cursor:pointer"></div>' +
    '</div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">' +
    '<button class="btn-secondary" id="dp-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="dp-save">Salvar</button>' +
    '</div></div>';

  document.body.appendChild(popup);
  document.getElementById('dp-cancel').onclick = function () { popup.remove(); };
  popup.onclick = function (e) { if (e.target === popup) popup.remove(); };
  setTimeout(function () { document.getElementById('dp-name').focus(); }, 50);

  document.getElementById('dp-save').onclick = function () {
    var name = document.getElementById('dp-name').value.trim();
    var icon = document.getElementById('dp-icon').value.trim() || '🏢';
    var color = document.getElementById('dp-color').value;
    if (!name) { showToast('Nome obrigatório.', 'error'); return; }
    var ds = getDepts().slice();
    if (isEdit) {
      ds[idx] = { id: d.id, name: name, icon: icon, color: color };
    } else {
      var newId = (document.getElementById('dp-id') ? document.getElementById('dp-id').value.trim() : '') || name.toLowerCase().replace(/\s+/g, '_');
      if (ds.find(function(x){ return x.id === newId; })) { showToast('ID já existe. Use outro ID.', 'error'); return; }
      ds.push({ id: newId, name: name, icon: icon, color: color });
    }
    Store.saveSetting('departments', ds);
    popup.remove();
    showToast(isEdit ? 'Setor atualizado!' : 'Setor criado!', 'success');
    renderAdmin();
  };
}

// ─── TAB: CATEGORIAS ────────────────────────────────────────
function renderAdminCats(el) {
  var cats = getCats();

  var items = cats.map(function (cat, idx) {
    return '<div class="admin-cat-item">' +
      '<span class="admin-cat-name">' + esc(cat) + '</span>' +
      '<button class="btn-icon admin-del-cat" data-idx="' + idx + '" style="color:var(--red);width:28px;height:28px">' + ICONS.trash + '</button>' +
      '</div>';
  }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head">' +
    '<h3>Categorias de Ticket (' + cats.length + ')</h3>' +
    '</div>' +
    '<div class="admin-cats-grid">' + items + '</div>' +
    '<div style="display:flex;gap:8px;margin-top:16px">' +
    '<input class="form-input" id="admin-new-cat" placeholder="Nova categoria…" style="flex:1">' +
    '<button class="btn-primary" id="admin-add-cat" style="height:40px;padding:0 16px">' + ICONS.plus + ' Adicionar</button>' +
    '</div>' +
    '</div>';

  el.querySelectorAll('.admin-del-cat').forEach(function (btn) {
    btn.onclick = function () {
      var cs = getCats().slice();
      if (cs.length <= 1) { showToast('Deve haver ao menos 1 categoria.', 'error'); return; }
      cs.splice(parseInt(btn.dataset.idx), 1);
      Store.saveSetting('categories', cs);
      renderAdmin();
    };
  });

  document.getElementById('admin-add-cat').onclick = function () {
    var inp = document.getElementById('admin-new-cat');
    var val = inp.value.trim();
    if (!val) return;
    var cs = getCats().slice();
    if (cs.indexOf(val) >= 0) { showToast('Categoria já existe.', 'error'); return; }
    cs.push(val);
    Store.saveSetting('categories', cs);
    showToast('Categoria adicionada!', 'success');
    renderAdmin();
  };
  document.getElementById('admin-new-cat').onkeydown = function (e) {
    if (e.key === 'Enter') document.getElementById('admin-add-cat').click();
  };
}

// ─── TAB: PRIORIDADES & SLA ─────────────────────────────────
function renderAdminSla(el) {
  var priorities = [
    { id: 'urgent', name: 'Urgente', color: '#EF4444' },
    { id: 'high',   name: 'Alta',    color: '#F97316' },
    { id: 'medium', name: 'Média',   color: '#EAB308' },
    { id: 'low',    name: 'Baixa',   color: '#22C55E' },
  ];
  var sla = getSlaH();

  var rows = priorities.map(function (p) {
    return '<tr>' +
      '<td><span class="badge" style="background:' + p.color + '">' + p.name + '</span></td>' +
      '<td>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
      '<input type="number" class="form-input sla-input" data-pid="' + p.id + '" value="' + (sla[p.id] || 24) + '" min="1" max="8760" style="width:80px;text-align:center">' +
      '<span style="font-size:13px;color:var(--text-secondary)">horas</span>' +
      '<span style="font-size:12px;color:var(--text-light)">≈ ' + formatSlaFriendly(sla[p.id] || 24) + '</span>' +
      '</div>' +
      '</td>' +
      '</tr>';
  }).join('');

  // Build WIP limits section per board/column
  var bs2 = Store.boards();
  var wipLimits2 = Store.getSetting('wipLimits', {});
  var wipRowsHtml = '';
  bs2.forEach(function (b) {
    b.lists.forEach(function (lst, li2) {
      if (li2 === b.lists.length - 1) return; // skip done column
      var wk = b.id + '_' + lst.id;
      wipRowsHtml += '<tr>' +
        '<td>' + esc(b.name) + '</td>' +
        '<td>' + esc(lst.name) + '</td>' +
        '<td><input type="number" class="form-input wip-input" data-wk="' + wk + '" value="' + (wipLimits2[wk] || '') + '" min="1" max="100" placeholder="Sem limite" style="width:100px;text-align:center"></td>' +
        '</tr>';
    });
  });

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head"><h3>Prioridades & SLA</h3></div>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 16px">Defina o tempo de SLA (Service Level Agreement) para cada nível de prioridade.</p>' +
    '<table class="admin-table" style="max-width:480px"><thead><tr><th>Prioridade</th><th>Prazo de SLA</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '<div style="margin-top:16px;display:flex;gap:8px">' +
    '<button class="btn-primary" id="admin-save-sla" style="height:36px;padding:0 20px">Salvar Configurações de SLA</button>' +
    '</div>' +
    '</div>' +

    '<div class="admin-section" style="margin-top:24px">' +
    '<div class="admin-section-head"><h3>Limites WIP (Work In Progress)</h3></div>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 16px">Defina quantos tickets cada coluna pode ter simultaneamente. Colunas acima do limite ficam marcadas em vermelho. Deixe em branco para sem limite.</p>' +
    (wipRowsHtml ? '<table class="admin-table" style="max-width:560px"><thead><tr><th>Quadro</th><th>Coluna</th><th>Limite</th></tr></thead><tbody>' + wipRowsHtml + '</tbody></table>' : '<p style="color:var(--text-light);font-size:13px">Nenhum quadro criado ainda.</p>') +
    (wipRowsHtml ? '<div style="margin-top:12px"><button class="btn-primary" id="admin-save-wip" style="height:36px;padding:0 20px">Salvar Limites WIP</button></div>' : '') +
    '</div>';

  document.getElementById('admin-save-sla').onclick = function () {
    var newSla = {};
    el.querySelectorAll('.sla-input').forEach(function (inp) {
      newSla[inp.dataset.pid] = Math.max(1, parseInt(inp.value) || 24);
    });
    Store.saveSetting('slaHours', newSla);
    Store.audit('atualizou SLA', '');
    showToast('SLA atualizado!', 'success');
    renderAdmin();
  };

  var wipSaveBtn = document.getElementById('admin-save-wip');
  if (wipSaveBtn) {
    wipSaveBtn.onclick = function () {
      var newWip = {};
      el.querySelectorAll('.wip-input').forEach(function (inp) {
        var v = parseInt(inp.value);
        if (v > 0) newWip[inp.dataset.wk] = v;
      });
      Store.saveSetting('wipLimits', newWip);
      Store.audit('atualizou limites WIP', '');
      showToast('Limites WIP salvos!', 'success');
    };
  }
}

function formatSlaFriendly(h) {
  if (h < 24) return h + 'h';
  var d = Math.floor(h / 24);
  var r = h % 24;
  return d + 'd' + (r ? ' ' + r + 'h' : '');
}

// ─── TAB: MÉTRICAS DE QUALIDADE ────────────────────────────
function renderAdminQuality(el) {
  var cfg = getQualitySettings();
  var cats = getCats();

  var catCheckboxes = cats.map(function (c) {
    var checked = cfg.ncCategories.indexOf(c) !== -1 ? ' checked' : '';
    return '<label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;padding:4px 0">' +
      '<input type="checkbox" class="aq-nc-cat" value="' + esc(c) + '"' + checked + ' style="width:16px;height:16px;cursor:pointer">' +
      esc(c) + '</label>';
  }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head"><h3>Parâmetros de Métricas de Qualidade</h3>' +
    '<p style="margin:4px 0 0;font-size:13px;color:var(--text-secondary)">Defina os limiares de cor dos indicadores e as categorias que contam como Não-Conformidade (NC).</p>' +
    '</div>' +

    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:8px">' +

    // — Limiares de cor —
    '<div class="admin-section" style="margin:0;padding:20px;border:1px solid var(--border);border-radius:10px">' +
    '<h4 style="margin:0 0 16px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px">' +
    '<span style="width:18px;height:18px;display:inline-block">' + ICONS.metrics + '</span> Limiares de Cor dos Gauges</h4>' +

    '<div class="form-row" style="margin-bottom:16px">' +
    '<div class="form-group">' +
    '<label style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:var(--green);display:inline-block"></span> Verde acima de (%)</label>' +
    '<input class="form-input" type="number" id="aq-green" min="0" max="100" value="' + cfg.greenThreshold + '" style="max-width:140px">' +
    '</div>' +
    '<div class="form-group">' +
    '<label style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:#EAB308;display:inline-block"></span> Amarelo acima de (%)</label>' +
    '<input class="form-input" type="number" id="aq-yellow" min="0" max="100" value="' + cfg.yellowThreshold + '" style="max-width:140px">' +
    '</div>' +
    '</div>' +

    '<p style="font-size:12px;color:var(--text-light);margin:0 0 16px">Abaixo do amarelo = vermelho (crítico).</p>' +

    '<h4 style="margin:0 0 16px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px">' +
    '<span style="width:18px;height:18px;display:inline-block;flex-shrink:0">' + ICONS.flag + '</span> Metas de Referência</h4>' +

    '<div class="form-row">' +
    '<div class="form-group">' +
    '<label>Meta de SLA (%)</label>' +
    '<input class="form-input" type="number" id="aq-tsla" min="0" max="100" value="' + cfg.targetSla + '" style="max-width:140px">' +
    '</div>' +
    '<div class="form-group">' +
    '<label>Meta de Resolução (%)</label>' +
    '<input class="form-input" type="number" id="aq-tresol" min="0" max="100" value="' + cfg.targetResol + '" style="max-width:140px">' +
    '</div>' +
    '</div>' +
    '</div>' +

    // — Categorias NC —
    '<div class="admin-section" style="margin:0;padding:20px;border:1px solid var(--border);border-radius:10px">' +
    '<h4 style="margin:0 0 4px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px">' +
    '<span style="width:18px;height:18px;display:inline-block">' + ICONS.shield + '</span> Categorias de Não-Conformidade (NC)</h4>' +
    '<p style="font-size:12px;color:var(--text-secondary);margin:0 0 14px">Tickets nessas categorias alimentam o indicador <em>Encerramento NC</em> (ISO 9001 · 10.2).</p>' +
    '<div id="aq-nc-list">' + catCheckboxes + '</div>' +
    '</div>' +

    '</div>' + // grid

    '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">' +
    '<button class="btn-secondary" id="aq-reset">Restaurar Padrão</button>' +
    '<button class="btn-primary" id="aq-save">Salvar</button>' +
    '</div>' +
    '</div>';

  function readForm() {
    var green  = parseInt(document.getElementById('aq-green').value,  10);
    var yellow = parseInt(document.getElementById('aq-yellow').value, 10);
    var tsla   = parseInt(document.getElementById('aq-tsla').value,   10);
    var tresol = parseInt(document.getElementById('aq-tresol').value, 10);
    var ncCats = [];
    el.querySelectorAll('.aq-nc-cat:checked').forEach(function (cb) { ncCats.push(cb.value); });
    return { green: green, yellow: yellow, tsla: tsla, tresol: tresol, ncCats: ncCats };
  }

  document.getElementById('aq-save').onclick = function () {
    var v = readForm();
    if (isNaN(v.green) || isNaN(v.yellow) || v.green < 0 || v.green > 100 || v.yellow < 0 || v.yellow > 100) {
      showToast('Limiares devem estar entre 0 e 100.', 'error'); return;
    }
    if (v.yellow >= v.green) {
      showToast('O limiar amarelo deve ser menor que o verde.', 'error'); return;
    }
    Store.saveSetting('quality', {
      greenThreshold:  v.green,
      yellowThreshold: v.yellow,
      ncCategories:    v.ncCats,
      targetSla:       isNaN(v.tsla)   ? _QUALITY_DEFAULT.targetSla   : v.tsla,
      targetResol:     isNaN(v.tresol) ? _QUALITY_DEFAULT.targetResol : v.tresol,
    });
    showToast('Configurações de métricas salvas!', 'success');
  };

  document.getElementById('aq-reset').onclick = function () {
    if (!confirm('Restaurar os valores padrão das métricas?')) return;
    Store.saveSetting('quality', null);
    renderAdminQuality(el);
    showToast('Configurações restauradas.', 'success');
  };
}

// ─── TAB: TEMPLATES ─────────────────────────────────────────
function renderAdminTemplates(el) {
  var templates = Store.getSetting('templates', []);
  var cats = getCats();
  var catOpts = cats.map(function (c) { return '<option value="' + c + '">' + c + '</option>'; }).join('');
  var priOpts2 = PRIORITIES.map(function (p2) { return '<option value="' + p2.id + '">' + p2.name + '</option>'; }).join('');
  var rowsHtml = templates.length === 0
    ? '<tr><td colspan="4" style="text-align:center;color:var(--text-light);padding:20px">Nenhum template criado.</td></tr>'
    : templates.map(function (t) {
      return '<tr>' +
        '<td><strong>' + esc(t.name) + '</strong></td>' +
        '<td>' + esc(t.title) + '</td>' +
        '<td>' + esc(t.category || '') + ' / ' + esc(pri(t.priority || 'medium').name) + '</td>' +
        '<td><button class="btn-icon tmpl-del-btn" data-tid="' + t.id + '" style="color:var(--red)">' + ICONS.trash + '</button></td>' +
        '</tr>';
    }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head"><h3>Templates de Ticket</h3></div>' +
    '<div class="admin-sys-group">' +
    '<h4>Novo Template</h4>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
    '<div class="form-group"><label>Nome do Template</label><input class="form-input" id="tmpl-name" placeholder="Ex: Suporte VPN" style="margin-top:4px"></div>' +
    '<div class="form-group"><label>Título padrão</label><input class="form-input" id="tmpl-title" placeholder="Ex: Sem acesso à VPN" style="margin-top:4px"></div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
    '<div class="form-group"><label>Categoria</label><select class="form-select" id="tmpl-cat" style="margin-top:4px">' + catOpts + '</select></div>' +
    '<div class="form-group"><label>Prioridade</label><select class="form-select" id="tmpl-pri" style="margin-top:4px">' + priOpts2 + '</select></div>' +
    '</div>' +
    '<div class="form-group" style="margin-bottom:10px"><label>Descrição padrão</label><textarea class="form-input" id="tmpl-desc" rows="3" placeholder="Descreva o contexto padrão…" style="margin-top:4px;resize:vertical"></textarea></div>' +
    '<button class="btn-primary" id="tmpl-create" style="height:36px;padding:0 16px">Criar Template</button>' +
    '</div>' +
    '<div class="admin-sys-group">' +
    '<h4>Templates Existentes</h4>' +
    '<table class="admin-table"><thead><tr><th>Nome</th><th>Título padrão</th><th>Categoria / Prioridade</th><th style="width:40px"></th></tr></thead><tbody>' + rowsHtml + '</tbody></table>' +
    '</div>' +
    '</div>';

  document.getElementById('tmpl-create').onclick = function () {
    var name = document.getElementById('tmpl-name').value.trim();
    var title = document.getElementById('tmpl-title').value.trim();
    if (!name || !title) { showToast('Nome e título são obrigatórios.', 'error'); return; }
    var newTemplates = Store.getSetting('templates', []).slice();
    newTemplates.push({ id: uid(), name: name, title: title, category: document.getElementById('tmpl-cat').value, priority: document.getElementById('tmpl-pri').value, description: document.getElementById('tmpl-desc').value });
    Store.saveSetting('templates', newTemplates);
    Store.audit('criou template', name);
    showToast('Template criado!', 'success');
    renderAdminTemplates(el);
  };

  el.querySelectorAll('.tmpl-del-btn').forEach(function (btn) {
    btn.onclick = function () {
      var tid = btn.dataset.tid;
      var existing = Store.getSetting('templates', []);
      var tmpl = existing.find(function (t) { return t.id === tid; });
      if (tmpl && confirm('Excluir template "' + tmpl.name + '"?')) {
        Store.saveSetting('templates', existing.filter(function (t) { return t.id !== tid; }));
        Store.audit('excluiu template', tmpl.name);
        renderAdminTemplates(el);
      }
    };
  });
}

// ─── TAB: AUDITORIA ─────────────────────────────────────────
function renderAdminAudit(el) {
  var logs = (Store.data.auditLog || []).slice(0, 200);
  var rowsHtml = logs.length === 0
    ? '<tr><td colspan="4" style="text-align:center;color:var(--text-light);padding:20px">Nenhuma ação registrada ainda.</td></tr>'
    : logs.map(function (entry) {
      var u = entry.userId ? Store.user(entry.userId) : null;
      return '<tr>' +
        '<td style="white-space:nowrap;font-size:11px;color:var(--text-light)">' + new Date(entry.at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</td>' +
        '<td><div class="avatar avatar-sm" style="background:' + avatarBg(u ? u.name : '') + '" title="' + esc(u ? u.name : '') + '">' + initials(u ? u.name : '') + '</div></td>' +
        '<td>' + esc(entry.action) + '</td>' +
        '<td style="color:var(--text-secondary);font-size:12px">' + esc(entry.detail) + '</td>' +
        '</tr>';
    }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head" style="display:flex;justify-content:space-between;align-items:center">' +
    '<h3>Trilha de Auditoria</h3>' +
    '<button class="btn-secondary" id="audit-export" style="height:34px;padding:0 14px">' + ICONS.desc + ' Exportar CSV</button>' +
    '</div>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 16px">Registro das últimas 200 ações administrativas. Suporta auditoria ISO 9001 seção 9.1.</p>' +
    '<table class="admin-table"><thead><tr><th>Data/Hora</th><th style="width:40px">Usuário</th><th>Ação</th><th>Detalhe</th></tr></thead><tbody>' + rowsHtml + '</tbody></table>' +
    '</div>';

  document.getElementById('audit-export').onclick = function () {
    var logs2 = Store.data.auditLog || [];
    var rows = [['Data/Hora', 'Usuário', 'Ação', 'Detalhe']];
    logs2.forEach(function (e) {
      var u = e.userId ? Store.user(e.userId) : null;
      rows.push([new Date(e.at).toLocaleString('pt-BR'), '"' + ((u ? u.name : 'Sistema') || '').replace(/"/g, '""') + '"', '"' + (e.action || '').replace(/"/g, '""') + '"', '"' + (e.detail || '').replace(/"/g, '""') + '"']);
    });
    var csv = rows.map(function (r) { return r.join(','); }).join('\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'auditoria_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click(); URL.revokeObjectURL(url);
  };
}

// ─── TAB: QUADROS ───────────────────────────────────────────
function renderAdminBoards(el) {
  var boards = Store.boards();
  var rows = boards.map(function (b) {
    var d = dept(b.departmentId);
    var totalCards = b.lists.reduce(function (sum, l) { return sum + l.cards.length; }, 0);
    var doneCards = b.lists.length > 0 ? b.lists[b.lists.length - 1].cards.length : 0;
    var c = safeBg(b.background);
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:10px">' +
      '<div style="width:12px;height:32px;border-radius:4px;background:' + c + ';flex-shrink:0"></div>' +
      '<div><div style="font-weight:600;font-size:14px">' + esc(b.name) + '</div>' +
      '<div style="font-size:12px;color:var(--text-secondary)">' + b.lists.length + ' colunas</div></div>' +
      '</div></td>' +
      '<td><span class="badge" style="background:' + d.color + '">' + d.icon + ' ' + d.name + '</span></td>' +
      '<td style="text-align:center"><strong>' + totalCards + '</strong><span style="font-size:11px;color:var(--text-light)"> tickets</span></td>' +
      '<td style="text-align:center"><strong style="color:var(--green)">' + doneCards + '</strong><span style="font-size:11px;color:var(--text-light)"> concluídos</span></td>' +
      '<td style="white-space:nowrap">' +
      '<button class="btn-secondary admin-goto-board" data-bid="' + b.id + '" style="padding:0 10px;height:28px;font-size:12px;margin-right:4px">' + ICONS.board + ' Abrir</button>' +
      '<button class="btn-secondary admin-del-board" data-bid="' + b.id + '" style="padding:0 10px;height:28px;font-size:12px;color:var(--red)">' + ICONS.trash + '</button>' +
      '</td>' +
      '</tr>';
  }).join('');

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head">' +
    '<h3>Todos os Quadros (' + boards.length + ')</h3>' +
    '<button class="btn-primary" id="admin-new-board" style="height:34px;padding:0 16px">' + ICONS.plus + ' Novo Quadro</button>' +
    '</div>' +
    (boards.length === 0 ? emptyState('board', 'Nenhum quadro ainda', 'Crie o primeiro quadro para começar a gerenciar tickets.', '<button class="btn-primary" id="admin-new-board-es" style="height:36px;padding:0 18px">+ Criar Quadro</button>') :
      '<table class="admin-table"><thead><tr><th>Quadro</th><th>Setor</th><th style="text-align:center">Tickets</th><th style="text-align:center">Concluídos</th><th style="width:140px">Ações</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>') +
    '</div>';

  document.getElementById('admin-new-board').onclick = function () { showCreateBoard(); };
  var adminNewBoardEs = document.getElementById('admin-new-board-es');
  if (adminNewBoardEs) adminNewBoardEs.onclick = function () { showCreateBoard(); };

  el.querySelectorAll('.admin-goto-board').forEach(function (btn) {
    btn.onclick = function () { goBoard(btn.dataset.bid); };
  });
  el.querySelectorAll('.admin-del-board').forEach(function (btn) {
    btn.onclick = function () {
      var b = Store.board(btn.dataset.bid);
      if (!b) return;
      if (confirm('Excluir quadro "' + b.name + '" e todos os seus tickets? Esta ação não pode ser desfeita.')) {
        Store.deleteBoard(btn.dataset.bid);
        showToast('Quadro excluído.', 'success');
        renderAdmin();
      }
    };
  });
}

// ─── TAB: SISTEMA ───────────────────────────────────────────
function renderAdminSystem(el) {
  var s = Store.data.settings;
  var totalUsers = Store.allUsers().length;
  var totalBoards = Store.boards().length;
  var totalTickets = Store.data.ticketCounter || 0;

  el.innerHTML =
    '<div class="admin-section">' +
    '<div class="admin-section-head"><h3>Configurações do Sistema</h3></div>' +

    '<div class="admin-sys-group">' +
    '<h4>Identidade</h4>' +
    '<div class="form-group" style="max-width:360px"><label>Nome da Empresa</label>' +
    '<div style="display:flex;gap:8px;margin-top:6px">' +
    '<input class="form-input" id="sys-company" value="' + esc(s.companyName || 'Mottion Desk') + '" style="flex:1">' +
    '<button class="btn-primary" id="sys-save-company" style="height:40px;padding:0 14px">Salvar</button>' +
    '</div></div>' +
    '</div>' +

    '<div class="admin-sys-group">' +
    '<h4>Estatísticas Gerais</h4>' +
    '<div class="admin-stats-row">' +
    '<div class="admin-stat-card"><div class="admin-stat-num">' + totalUsers + '</div><div class="admin-stat-label">Usuários</div></div>' +
    '<div class="admin-stat-card"><div class="admin-stat-num">' + totalBoards + '</div><div class="admin-stat-label">Quadros</div></div>' +
    '<div class="admin-stat-card"><div class="admin-stat-num">' + totalTickets + '</div><div class="admin-stat-label">Tickets criados</div></div>' +
    '</div>' +
    '</div>' +

    '<div class="admin-sys-group">' +
    '<h4>Exportação</h4>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 12px">Exporte todos os tickets para CSV para uso em planilhas.</p>' +
    '<button class="btn-secondary" id="sys-export" style="height:36px;padding:0 16px">' + ICONS.desc + ' Exportar todos os tickets (CSV)</button>' +
    '</div>' +

    '<div class="admin-sys-group" style="border-color:rgba(239,68,68,0.3)">' +
    '<h4 style="color:var(--red)">Zona de Perigo</h4>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 12px">Estas ações são irreversíveis. Use com extremo cuidado.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    '<button class="btn-secondary" id="sys-reset-counter" style="height:36px;padding:0 16px;color:var(--red);border-color:var(--red)">' + ICONS.time + ' Resetar Contador de Tickets</button>' +
    '<button class="btn-secondary" id="sys-clear-data" style="height:36px;padding:0 16px;color:var(--red);border-color:var(--red)">' + ICONS.trash + ' Limpar Todos os Dados</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  document.getElementById('sys-save-company').onclick = function () {
    var name = document.getElementById('sys-company').value.trim();
    if (!name) return;
    Store.saveSetting('companyName', name);
    showToast('Nome da empresa salvo!', 'success');
    renderApp();
  };

  document.getElementById('sys-export').onclick = function () {
    Store.exportCSV();
    showToast('Exportação iniciada!', 'success');
  };

  document.getElementById('sys-reset-counter').onclick = function () {
    if (confirm('Resetar o contador de tickets para 0? Os tickets existentes manterão seus números.')) {
      Store.data.ticketCounter = 0;
      Store.save();
      showToast('Contador resetado.', 'success');
      renderAdmin();
    }
  };

  document.getElementById('sys-clear-data').onclick = function () {
    var confirmText = prompt('Esta ação APAGA TODOS OS DADOS (usuários, quadros e tickets). Digite "APAGAR TUDO" para confirmar:');
    if (confirmText === 'APAGAR TUDO') {
      localStorage.clear();
      location.reload();
    } else if (confirmText !== null) {
      showToast('Confirmação incorreta. Nada foi excluído.', 'error');
    }
  };
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  var main = document.getElementById('main-content');
  if (!main) return;
  var me = Store.me();
  var st = Store.stats();
  var bs = Store.boards();
  var now = new Date();
  var hour = now.getHours();
  var greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  var df = App.dashFilter;

  // First-run onboarding
  if (bs.length === 0) {
    main.innerHTML =
      '<div class="view-header"><div class="view-title">' + greeting + ', ' + esc((me.name || 'Usuário').split(' ')[0]) + '</div></div>' +
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;text-align:center;gap:12px">' +
      '<div style="margin-bottom:8px">' + LOGO_42 + '</div>' +
      '<div style="font-size:22px;font-weight:700;color:var(--text)">Bem-vindo ao Mottion Desk!</div>' +
      '<div style="font-size:14px;color:var(--text-secondary);max-width:400px;line-height:1.6">Comece criando seu primeiro quadro para organizar e gerenciar tickets entre setores. É rápido e fácil.</div>' +
      '<div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;justify-content:center">' +
      '<button class="btn-primary" id="onboard-create-board" style="font-size:14px;padding:10px 24px">' + ICONS.plus + ' Criar primeiro quadro</button>' +
      '<button class="btn-secondary" id="onboard-cmd" style="font-size:14px;padding:10px 20px">' + ICONS.search + ' Explorar comandos</button>' +
      '</div>' +
      '<div style="margin-top:32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:600px;width:100%">' +
      '<div style="background:var(--s2);border:1px solid var(--bd2);border-radius:var(--r-md);padding:16px;text-align:left">' +
      '<div style="margin-bottom:6px;color:var(--brand);width:20px;height:20px">' + ICONS.board + '</div>' +
      '<div style="font-weight:600;font-size:13px;margin-bottom:4px">Quadros Kanban</div>' +
      '<div style="font-size:12px;color:var(--text-secondary)">Visualize o fluxo de trabalho em colunas arrastar-e-soltar</div>' +
      '</div>' +
      '<div style="background:var(--s2);border:1px solid var(--bd2);border-radius:var(--r-md);padding:16px;text-align:left">' +
      '<div style="margin-bottom:6px;color:var(--brand);width:20px;height:20px">' + ICONS.time + '</div>' +
      '<div style="font-weight:600;font-size:13px;margin-bottom:4px">SLA Automático</div>' +
      '<div style="font-size:12px;color:var(--text-secondary)">Prazos por prioridade com alertas de escalação automática</div>' +
      '</div>' +
      '<div style="background:var(--s2);border:1px solid var(--bd2);border-radius:var(--r-md);padding:16px;text-align:left">' +
      '<div style="margin-bottom:6px;color:var(--brand);width:20px;height:20px">' + ICONS.metrics + '</div>' +
      '<div style="font-weight:600;font-size:13px;margin-bottom:4px">Relatórios</div>' +
      '<div style="font-size:12px;color:var(--text-secondary)">Métricas de CSAT, SLA e exportação CSV em tempo real</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    var obc = document.getElementById('onboard-create-board');
    if (obc) obc.onclick = function () { showCreateBoard(); };
    var obcmd = document.getElementById('onboard-cmd');
    if (obcmd) obcmd.onclick = function () { showCommandPalette(); };
    return;
  }

  // ── Enhanced board tiles with per-board stats ───────────────
  var tiles = '';
  for (var i = 0; i < bs.length; i++) {
    var b = bs[i];
    var d = dept(b.departmentId);
    var bOpen = 0, bProg = 0, bDone = 0, bOverdue = 0, bTotal = 0;
    var bHasUrgent = false;
    for (var j = 0; j < b.lists.length; j++) {
      var isFirst = j === 0, isLast2 = j === b.lists.length - 1;
      for (var k = 0; k < b.lists[j].cards.length; k++) {
        var tc = b.lists[j].cards[k];
        bTotal++;
        if (isFirst) bOpen++;
        else if (isLast2) bDone++;
        else bProg++;
        if (tc.dueDate && parseDate(tc.dueDate).getTime() < now.getTime() && !isLast2) bOverdue++;
        if ((tc.priority === 'urgent' || tc.priority === 'high') && !isLast2) bHasUrgent = true;
      }
    }
    var bDonePct = bTotal > 0 ? Math.round((bDone / bTotal) * 100) : 0;
    var urgentDot = (bOverdue > 0)
      ? '<span class="board-card-urgency-dot" title="' + bOverdue + ' atrasado(s)">!</span>'
      : (bHasUrgent ? '<span class="board-card-urgency-dot board-card-urgency-high" title="Alta prioridade">▲</span>' : '');
    tiles +=
      '<div class="board-card board-card-enhanced" data-bid="' + b.id + '">' +
      '<div class="board-card-color-bar" style="background:' + safeBg(b.background) + '"></div>' +
      '<div class="board-card-body">' +
      '<div class="board-card-top">' +
      '<div class="board-card-title">' + esc(b.name) + urgentDot + '</div>' +
      '<div class="board-card-dept">' + d.icon + ' ' + esc(d.name) + '</div>' +
      '</div>' +
      '<div class="board-card-stats">' +
      '<span class="bcs-open" title="Abertos">' + bOpen + ' abertos</span>' +
      '<span class="bcs-prog" title="Em andamento">' + bProg + ' em andamento</span>' +
      '<span class="bcs-done" title="Concluídos">' + bDone + ' concluídos</span>' +
      '</div>' +
      '<div class="board-card-progress-wrap">' +
      '<div class="board-card-progress-bar" style="width:' + bDonePct + '%"></div>' +
      '</div>' +
      '<div class="board-card-footer">' +
      '<span style="font-size:10px;color:var(--text-secondary)">' + bTotal + ' total · ' + bDonePct + '% concluído</span>' +
      (bOverdue > 0 ? '<span class="board-card-overdue-tag">' + bOverdue + ' atrasado' + (bOverdue > 1 ? 's' : '') + '</span>' : '') +
      '</div>' +
      '</div></div>';
  }

  // Collect ALL tickets with status context
  var allTickets = [];
  var statusSet = {};
  for (var bi = 0; bi < bs.length; bi++) {
    var brd = bs[bi];
    for (var li = 0; li < brd.lists.length; li++) {
      var lst = brd.lists[li];
      var isOpen = li === 0;
      var isDone = li === brd.lists.length - 1;
      statusSet[lst.name] = true;
      for (var ci = 0; ci < lst.cards.length; ci++) {
        allTickets.push({
          card: lst.cards[ci], boardId: brd.id, listId: lst.id,
          boardName: brd.name, listName: lst.name,
          isOpen: isOpen, isDone: isDone, isProgress: !isOpen && !isDone
        });
      }
    }
  }
  allTickets.sort(function (a, b2) { return b2.card.createdAt - a.card.createdAt; });

  // ── Compute extra KPI stats ──────────────────────────────────
  var csatTotal = 0, csatCount = 0, slaOk = 0, slaTotal = 0;
  for (var si = 0; si < bs.length; si++) {
    for (var sj = 0; sj < bs[si].lists.length; sj++) {
      var sLast = sj === bs[si].lists.length - 1;
      for (var sk = 0; sk < bs[si].lists[sj].cards.length; sk++) {
        var sc = bs[si].lists[sj].cards[sk];
        if (sc.csat && sc.csat.rating) { csatTotal += sc.csat.rating; csatCount++; }
        if (!sLast) {
          var slaH2 = getSlaH()[sc.priority] || 24;
          var elapsed = sc.createdAt ? (now.getTime() - sc.createdAt) : 0;
          slaTotal++;
          if (elapsed <= slaH2 * 3600000) slaOk++;
        }
      }
    }
  }
  var csatAvg = csatCount > 0 ? (csatTotal / csatCount).toFixed(1) : '—';
  var slaPct = slaTotal > 0 ? Math.round((slaOk / slaTotal) * 100) : 100;

  // ── Apply filters (now includes text search) ─────────────────
  var dfSearch = (df.search || '').toLowerCase().trim();
  var filtered = allTickets.filter(function (rt) {
    if (df.kpi === 'open'     && !rt.isOpen) return false;
    if (df.kpi === 'progress' && !rt.isProgress) return false;
    if (df.kpi === 'done'     && !rt.isDone) return false;
    if (df.kpi === 'overdue'  && !(rt.card.dueDate && parseDate(rt.card.dueDate) < now && !rt.isDone)) return false;
    if (df.priority && rt.card.priority !== df.priority) return false;
    if (df.status   && rt.listName !== df.status) return false;
    if (df.assignee && rt.card.assigneeId !== df.assignee) return false;
    if (dfSearch) {
      var hay = (rt.card.title || '').toLowerCase() + ' #' + rt.card.ticketNumber + ' ' + (rt.card.description || '').toLowerCase() + ' ' + rt.listName.toLowerCase();
      if (hay.indexOf(dfSearch) < 0) return false;
    }
    return true;
  });
  var displayed = filtered.slice(0, 30);

  // ── Overdue alert (dismissable) ─────────────────────────────
  var overdueAlert = st.overdue > 0
    ? '<div class="dash-overdue-alert" id="dash-overdue-alert">' +
      '<div style="display:flex;align-items:center;gap:8px;flex:1">' + ICONS.flag +
      ' <strong>' + st.overdue + ' ticket(s) atrasado(s)</strong>' +
      ' <a id="go-overdue" style="margin-left:4px">→ Ver todos</a></div>' +
      '<button id="dash-alert-dismiss" style="background:none;border:none;cursor:pointer;color:inherit;font-size:16px;line-height:1;padding:0 4px;opacity:0.7">✕</button>' +
      '</div>'
    : '';

  // ── KPI helpers ───────────────────────────────────────────────
  var kpic = function (k) { return df.kpi === k ? ' kpi-active' : ''; };
  var hasFilter = df.kpi || df.priority || df.status || df.assignee || df.search;

  // ── Filter dropdowns ──────────────────────────────────────────
  var priOpts = '<option value="">Prioridade</option>' + PRIORITIES.map(function (p2) {
    return '<option value="' + p2.id + '"' + (df.priority === p2.id ? ' selected' : '') + '>' + p2.name + '</option>';
  }).join('');
  var statusOpts = '<option value="">Status</option>' + Object.keys(statusSet).map(function (s) {
    return '<option value="' + esc(s) + '"' + (df.status === s ? ' selected' : '') + '>' + esc(s) + '</option>';
  }).join('');
  var assigneeOpts = '<option value="">Responsável</option>' + Store.allUsers().map(function (u) {
    return '<option value="' + u.id + '"' + (df.assignee === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>';
  }).join('');

  // ── Build ticket table rows ───────────────────────────────────
  var recentHtml = '';
  for (var ri = 0; ri < displayed.length; ri++) {
    var rt = displayed[ri];
    var rp = pri(rt.card.priority);
    var asgn = rt.card.assigneeId ? Store.user(rt.card.assigneeId) : null;
    var req  = rt.card.requesterId ? Store.user(rt.card.requesterId) : null;
    var isOverdue = rt.card.dueDate && parseDate(rt.card.dueDate) < now && !rt.isDone;
    var isDueSoon = !isOverdue && rt.card.dueDate && !rt.isDone &&
      parseDate(rt.card.dueDate) <= new Date(now.getTime() + 2 * 86400000);

    var dateCell = '—';
    if (rt.card.dueDate) {
      var dueFmt = parseDate(rt.card.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      if (rt.isDone) {
        var tsC = rt.card.completedAt || Date.now();
        var cdC = new Date(tsC);
        var cStr = cdC.getFullYear() + '-' + String(cdC.getMonth() + 1).padStart(2, '0') + '-' + String(cdC.getDate()).padStart(2, '0');
        var late = cStr > rt.card.dueDate;
        dateCell = '<span style="color:' + (late ? '#f97316' : 'var(--green)') + ';font-weight:600">' + dueFmt + (late ? ' ⚠' : ' ✓') + '</span>';
      } else if (isOverdue) {
        dateCell = '<span style="color:var(--red);font-weight:600">' + dueFmt + ' ⚠</span>';
      } else if (isDueSoon) {
        dateCell = '<span style="color:#f97316;font-weight:600">' + dueFmt + '</span>';
      } else {
        dateCell = dueFmt;
      }
    }

    var statusColor = rt.isDone ? 'var(--green)' : rt.isOpen ? 'var(--brand)' : '#f97316';
    var ticketCell =
      '<div class="dt-ticket-main"><span class="dt-ticket-num">#' + String(rt.card.ticketNumber).padStart(3, '0') + '</span> <span class="dt-ticket-title">' + esc(rt.card.title) + '</span></div>' +
      '<div class="dt-ticket-sub">' +
      (req ? '<span>👤 ' + esc(req.name) + '</span>' : '') +
      (rt.card.category ? '<span class="dash-cat-tag">' + esc(rt.card.category) + '</span>' : '') +
      '<span class="dt-board-name">' + esc(rt.boardName) + '</span>' +
      '</div>';

    var asgnCell = asgn
      ? '<div class="avatar avatar-sm" style="background:' + avatarBg(asgn.name) + '" title="' + esc(asgn.name) + '">' + initials(asgn.name) + '</div>'
      : '<span style="color:var(--text-light);font-size:12px">—</span>';

    recentHtml +=
      '<tr data-bid="' + rt.boardId + '" data-lid="' + rt.listId + '" data-cid="' + rt.card.id + '" class="dash-recent-row' + (isOverdue ? ' row-overdue' : '') + '">' +
      '<td class="td-name">' + ticketCell + '</td>' +
      '<td><span class="badge" style="background:' + statusColor + ';white-space:nowrap">' + esc(rt.listName) + '</span></td>' +
      '<td><span class="badge" style="background:' + rp.color + '">' + rp.name + '</span></td>' +
      '<td>' + asgnCell + '</td>' +
      '<td style="white-space:nowrap;font-size:12px">' + dateCell + '</td>' +
      '<td class="td-actions"><button class="dash-action-btn" data-bid="' + rt.boardId + '" data-lid="' + rt.listId + '" data-cid="' + rt.card.id + '">⋯</button></td>' +
      '</tr>';
  }
  if (displayed.length === 0) {
    recentHtml = '<tr><td colspan="6"><div class="dash-empty-state"><div class="dash-empty-icon">🔍</div><div class="dash-empty-msg">Nenhum ticket encontrado</div>' +
      (hasFilter ? '<div class="dash-empty-sub">Ajuste ou <a id="empty-clear-filter">limpe os filtros</a></div>' : '<div class="dash-empty-sub">Crie um ticket em qualquer quadro para começar</div>') +
      '</div></td></tr>';
  }

  // ── "My Tickets" sidebar items ────────────────────────────────
  var myOpen = st.myTickets.filter(function (mt) { return !mt.isDone; });
  var myTicketsHtml = '';
  if (myOpen.length === 0) {
    myTicketsHtml = '<div class="dash-side-empty">Sem tickets atribuídos a você 🎉</div>';
  } else {
    var mySlice = myOpen.slice(0, 8);
    for (var mi = 0; mi < mySlice.length; mi++) {
      var mt = mySlice[mi];
      var mp = pri(mt.card.priority);
      var mtOverdue = mt.card.dueDate && parseDate(mt.card.dueDate) < now;
      myTicketsHtml +=
        '<div class="dash-my-ticket" data-bid="' + mt.boardId + '" data-lid="' + mt.listId + '" data-cid="' + mt.card.id + '">' +
        '<span class="dash-my-dot" style="background:' + mp.color + '" title="' + mp.name + '"></span>' +
        '<div class="dash-my-body">' +
        '<div class="dash-my-title">' +
        '<span class="dash-my-num">#' + String(mt.card.ticketNumber).padStart(3,'0') + '</span>' +
        '<span class="dash-my-name">' + esc(mt.card.title) + '</span>' +
        '</div>' +
        '<div class="dash-my-meta">' + esc(mt.listName) +
        (mt.card.dueDate ? ' · <span style="color:' + (mtOverdue ? 'var(--red)' : 'var(--text-secondary)') + '">' +
          parseDate(mt.card.dueDate).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}) + (mtOverdue?' ⚠':'') + '</span>' : '') +
        '</div>' +
        '</div>' +
        '</div>';
    }
    if (myOpen.length > 8) {
      myTicketsHtml += '<div class="dash-side-more" id="side-goto-mytasks">+' + (myOpen.length - 8) + ' outros → Minhas Tarefas</div>';
    }
  }

  // ── Recent Activity sidebar ───────────────────────────────────
  var recentActivity = [];
  for (var abi = 0; abi < bs.length; abi++) {
    for (var alj = 0; alj < bs[abi].lists.length; alj++) {
      for (var alk = 0; alk < bs[abi].lists[alj].cards.length; alk++) {
        var ac = bs[abi].lists[alj].cards[alk];
        var acts = ac.activity || [];
        for (var ali = acts.length - 1; ali >= 0 && recentActivity.length < 30; ali--) {
          recentActivity.push({
            act: acts[ali], card: ac,
            boardId: bs[abi].id, listId: bs[abi].lists[alj].id
          });
        }
      }
    }
  }
  recentActivity.sort(function (x, y) { return y.act.createdAt - x.act.createdAt; });
  var actHtml = '';
  var actSlice = recentActivity.slice(0, 8);
  if (actSlice.length === 0) {
    actHtml = '<div class="dash-side-empty">Nenhuma atividade recente</div>';
  } else {
    for (var ai2 = 0; ai2 < actSlice.length; ai2++) {
      var ar = actSlice[ai2];
      var arUser = Store.user(ar.act.userId);
      actHtml +=
        '<div class="dash-act-row" data-bid="' + ar.boardId + '" data-lid="' + ar.listId + '" data-cid="' + ar.card.id + '">' +
        '<div class="avatar" style="background:' + avatarBg(arUser ? arUser.name : '') + ';width:22px;height:22px;font-size:8px;flex-shrink:0">' + initials(arUser ? arUser.name : '') + '</div>' +
        '<div class="dash-act-body">' +
        '<span class="dash-act-who">' + esc(arUser ? arUser.name.split(' ')[0] : 'Sistema') + '</span>' +
        ' <span class="dash-act-action">' + esc(ar.act.action) + '</span>' +
        ' <span class="dash-act-ticket">#' + String(ar.card.ticketNumber).padStart(3,'0') + '</span>' +
        '<div class="dash-act-time">' + fmtRel(ar.act.createdAt) + '</div>' +
        '</div></div>';
    }
  }

  // ── Render ────────────────────────────────────────────────────
  var dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  main.innerHTML =
    // Header
    '<div class="view-header dash-header">' +
    '<div>' +
    '<div class="view-title">' + greeting + ', ' + esc((me.name || 'Usuário').split(' ')[0]) + '!</div>' +
    '<div class="dash-date">' + dateStr + '</div>' +
    '</div>' +
    '<div class="dash-header-actions">' +
    '<button class="btn-secondary dash-shortcut-btn" id="dash-goto-tasks">' + ICONS.check + ' Minhas Tarefas</button>' +
    '<button class="btn-primary dash-shortcut-btn" id="dash-quick-create">' + ICONS.plus + ' Novo Ticket</button>' +
    '</div>' +
    '</div>' +
    '<div class="dashboard-scroll">' +
    overdueAlert +

    // KPI Row — 6 cards
    '<div class="stats-row">' +
    '<div class="stat-card kpi-card' + kpic('open') + '" id="kpi-open">' +
    '<div><div class="stat-val">' + st.open + '</div><div class="stat-label">Abertos</div></div></div>' +

    '<div class="stat-card kpi-card' + kpic('progress') + '" id="kpi-progress">' +
    '<div><div class="stat-val">' + st.progress + '</div><div class="stat-label">Em Andamento</div></div></div>' +

    '<div class="stat-card kpi-card' + kpic('done') + '" id="kpi-done">' +
    '<div><div class="stat-val">' + st.done + '</div><div class="stat-label">Concluídos</div></div></div>' +

    '<div class="stat-card kpi-card' + kpic('overdue') + '" id="kpi-overdue">' +
    '<div><div class="stat-val' + (st.overdue > 0 ? ' kpi-val-red' : '') + '">' + st.overdue + '</div><div class="stat-label">Atrasados</div></div></div>' +

    '<div class="stat-card kpi-card kpi-static">' +
    '<div><div class="stat-val kpi-val-csat">' + csatAvg + (csatCount > 0 ? '<span class="kpi-val-sub">/5</span>' : '') + '</div><div class="stat-label">CSAT Médio</div></div></div>' +

    '<div class="stat-card kpi-card kpi-static">' +
    '<div><div class="stat-val' + (slaPct < 70 ? ' kpi-val-red' : slaPct < 90 ? ' kpi-val-warn' : '') + '">' + slaPct + '<span class="kpi-val-sub">%</span></div><div class="stat-label">SLA no Prazo</div></div></div>' +
    '</div>' +

    // Two-column layout: main + sidebar
    '<div class="dash-two-col">' +

    // Left: boards + tickets
    '<div class="dash-main-col">' +
    // Boards grid
    '<div class="dash-section-heading">Quadros</div>' +
    '<div class="boards-grid">' + tiles +
    '<div class="board-card-new board-card-new-enhanced" id="dash-new-board">' + ICONS.plus + '<span>Novo<br>Quadro</span></div>' +
    '</div>' +

    // Tickets
    '<div class="dash-section-heading" style="margin-top:28px">Todos os Tickets' +
    (hasFilter ? ' <span class="dash-result-count">(' + filtered.length + ' resultado' + (filtered.length !== 1 ? 's' : '') + ')</span>' : '') +
    '</div>' +
    // Filter bar with search
    '<div class="dash-filter-bar">' +
    '<div class="dash-search-wrap">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
    '<input type="text" class="dash-search-input" id="df-search" placeholder="Buscar por título, #número…" value="' + esc(df.search || '') + '">' +
    '</div>' +
    '<select class="filter-select" id="df-pri">' + priOpts + '</select>' +
    '<select class="filter-select" id="df-status">' + statusOpts + '</select>' +
    '<select class="filter-select" id="df-assignee">' + assigneeOpts + '</select>' +
    (hasFilter ? '<button class="btn-secondary" id="df-clear" style="height:34px;padding:0 12px;font-size:12px;white-space:nowrap">✕ Limpar</button>' : '') +
    '</div>' +
    '<table class="data-table dash-tickets-table"><thead><tr>' +
    '<th>Ticket</th><th>Status</th><th>Prioridade</th><th>Responsável</th><th>Vencimento</th><th style="width:36px"></th>' +
    '</tr></thead><tbody>' + recentHtml + '</tbody></table>' +
    (filtered.length > 30 ? '<div class="dash-show-more">Exibindo 30 de ' + filtered.length + ' tickets</div>' : '') +
    '</div>' + // end dash-main-col

    // Right: sidebar
    '<div class="dash-side-col">' +

    // My Tickets
    '<div class="dash-side-panel">' +
    '<div class="dash-side-panel-title">' +
    '<span>✅ Meus Tickets</span>' +
    (myOpen.length > 0 ? '<span class="dash-side-badge">' + myOpen.length + '</span>' : '') +
    '</div>' +
    myTicketsHtml +
    '</div>' +

    // Activity feed
    '<div class="dash-side-panel">' +
    '<div class="dash-side-panel-title">⚡ Atividade Recente</div>' +
    actHtml +
    '</div>' +

    '</div>' + // end dash-side-col
    '</div>' + // end dash-two-col
    '</div>'; // end dashboard-scroll

  // ── Event handlers ────────────────────────────────────────────

  // KPI filter toggles
  ['open', 'progress', 'done', 'overdue'].forEach(function (k) {
    var el = document.getElementById('kpi-' + k);
    if (el) el.onclick = function () {
      App.dashFilter.kpi = App.dashFilter.kpi === k ? '' : k;
      renderDashboard();
    };
  });

  // Filter bar
  var dfSearch = document.getElementById('df-search');
  if (dfSearch) {
    dfSearch.oninput = _debounce(function () {
      App.dashFilter.search = dfSearch.value;
      renderDashboard();
    }, 250);
  }
  var dfPri = document.getElementById('df-pri');
  if (dfPri) dfPri.onchange = function () { App.dashFilter.priority = this.value; renderDashboard(); };
  var dfSt = document.getElementById('df-status');
  if (dfSt) dfSt.onchange = function () { App.dashFilter.status = this.value; renderDashboard(); };
  var dfAss = document.getElementById('df-assignee');
  if (dfAss) dfAss.onchange = function () { App.dashFilter.assignee = this.value; renderDashboard(); };
  var dfClear = document.getElementById('df-clear');
  if (dfClear) dfClear.onclick = function () { App.dashFilter = { kpi: '', priority: '', status: '', assignee: '', search: '' }; renderDashboard(); };

  // Empty state filter clear
  var emptyClear = document.getElementById('empty-clear-filter');
  if (emptyClear) emptyClear.onclick = function () { App.dashFilter = { kpi: '', priority: '', status: '', assignee: '', search: '' }; renderDashboard(); };

  // Board tiles
  main.querySelectorAll('.board-card[data-bid]').forEach(function (el) {
    el.onclick = function () { goBoard(el.dataset.bid); };
  });

  // Row click → open modal
  main.querySelectorAll('.dash-recent-row').forEach(function (tr) {
    tr.onclick = function (e) {
      if (e.target.closest('.dash-action-btn')) return;
      goBoard(tr.dataset.bid);
      setTimeout(function () { openModal(tr.dataset.lid, tr.dataset.cid); }, 100);
    };
  });

  // Quick action buttons
  main.querySelectorAll('.dash-action-btn').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      showQuickMenu(e, btn.dataset.bid, btn.dataset.lid, btn.dataset.cid);
    };
  });

  // "My Tickets" sidebar click
  main.querySelectorAll('.dash-my-ticket').forEach(function (el) {
    el.onclick = function () {
      goBoard(el.dataset.bid);
      setTimeout(function () { openModal(el.dataset.lid, el.dataset.cid); }, 100);
    };
  });

  // Activity feed click
  main.querySelectorAll('.dash-act-row').forEach(function (el) {
    el.onclick = function () {
      goBoard(el.dataset.bid);
      setTimeout(function () { openModal(el.dataset.lid, el.dataset.cid); }, 100);
    };
  });

  // Overdue alert links
  var goOver = document.getElementById('go-overdue');
  if (goOver) goOver.onclick = function () { App.view = 'mytasks'; App.boardId = null; renderApp(); };
  var alertDismiss = document.getElementById('dash-alert-dismiss');
  if (alertDismiss) alertDismiss.onclick = function () {
    var alertEl = document.getElementById('dash-overdue-alert');
    if (alertEl) { alertEl.style.opacity = '0'; alertEl.style.transition = 'opacity 0.3s'; setTimeout(function () { alertEl.remove(); }, 300); }
  };

  // Header buttons
  var qc = document.getElementById('dash-quick-create');
  if (qc) qc.onclick = function () {
    if (bs.length === 0) { showCreateBoard(); return; }
    // Open first board and show add-card form on first list
    var firstBoard = bs[0];
    goBoard(firstBoard.id);
    setTimeout(function () {
      var firstListId = firstBoard.lists[0] && firstBoard.lists[0].id;
      if (firstListId) showAddCardForm(firstListId);
    }, 150);
  };
  var gotoTasks = document.getElementById('dash-goto-tasks');
  if (gotoTasks) gotoTasks.onclick = function () { App.view = 'mytasks'; App.boardId = null; renderApp(); };
  var sideGoto = document.getElementById('side-goto-mytasks');
  if (sideGoto) sideGoto.onclick = function () { App.view = 'mytasks'; App.boardId = null; renderApp(); };
  var nb = document.getElementById('dash-new-board');
  if (nb) nb.onclick = function () { showCreateBoard(); };
}

// ─── UNIVERSAL QUICK-ACTION MENU ────────────────────────────
function showQuickMenu(e, boardId, listId, cardId) {
  document.querySelectorAll('.ctx-menu').forEach(function (m) { m.remove(); });
  var b = Store.board(boardId);
  if (!b) return;
  var l = b.lists.find(function (x) { return x.id === listId; });
  var card = l ? l.cards.find(function (x) { return x.id === cardId; }) : null;
  if (!card) return;
  var me = Store.me();
  var isMine = card.assigneeId === (me ? me.id : null);

  var moveItems = b.lists.map(function (lst) {
    var active = lst.id === listId;
    return '<div class="ctx-item' + (active ? ' ctx-item-cur' : '') + '" data-move="' + lst.id + '">' +
      (active ? '<span style="color:var(--brand)">✓</span> ' : '') + esc(lst.name) + '</div>';
  }).join('');

  var menu = document.createElement('div');
  menu.className = 'ctx-menu';
  menu.innerHTML =
    '<div class="ctx-item" id="qm-open">' + ICONS.dash + ' Abrir ticket</div>' +
    '<div class="ctx-item" id="qm-assign">' + (isMine ? '✓ Meu ticket' : '👤 Assumir ticket') + '</div>' +
    '<div class="ctx-item" id="qm-clone">' + ICONS.desc + ' Clonar ticket</div>' +
    '<div style="padding:6px 10px 2px;font-size:10px;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:0.6px">Mover para</div>' +
    moveItems +
    '<hr style="margin:4px 0;border:none;border-top:1px solid var(--border)">' +
    '<div class="ctx-item" id="qm-del" style="color:var(--red)">' + ICONS.trash + ' Excluir</div>';
  document.body.appendChild(menu);

  var btnRect = e.target.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (btnRect.bottom + 4) + 'px';
  menu.style.left = 'auto';
  menu.style.right = (window.innerWidth - btnRect.right) + 'px';
  var mRect = menu.getBoundingClientRect();
  if (mRect.bottom > window.innerHeight - 8) menu.style.top = (btnRect.top - mRect.height - 4) + 'px';

  menu.querySelector('#qm-open').onclick = function () {
    menu.remove();
    goBoard(boardId);
    setTimeout(function () { openModal(listId, cardId); }, 100);
  };
  menu.querySelector('#qm-assign').onclick = function () {
    menu.remove();
    if (!me) return;
    Store.updateCard(boardId, listId, cardId, { assigneeId: isMine ? null : me.id });
    refreshCurrent();
  };
  menu.querySelector('#qm-clone').onclick = function () {
    menu.remove();
    var clone = Store.cloneCard(boardId, listId, cardId);
    if (clone) {
      refreshCurrent();
      showToast('Ticket clonado: #' + clone.ticketNumber, 'success');
    }
  };
  menu.querySelectorAll('[data-move]').forEach(function (item) {
    item.onclick = function () {
      menu.remove();
      var toListId = item.dataset.move;
      if (toListId === listId) return;
      var fromList = b.lists.find(function (x) { return x.id === listId; });
      var toList   = b.lists.find(function (x) { return x.id === toListId; });
      if (!fromList || !toList) return;
      var fromIdx = fromList.cards.findIndex(function (x) { return x.id === cardId; });
      if (fromIdx >= 0) {
        Store.addActivity(boardId, listId, cardId, 'moveu para', toList.name);
        Store.moveCard(boardId, listId, toListId, fromIdx, toList.cards.length);
        refreshCurrent();
      }
    };
  });
  menu.querySelector('#qm-del').onclick = function () {
    menu.remove();
    if (confirm('Excluir este ticket permanentemente?')) {
      Store.deleteCard(boardId, listId, cardId);
      refreshCurrent();
    }
  };

  setTimeout(function () {
    var close = function (ev) {
      if (!menu.contains(ev.target)) { menu.remove(); document.removeEventListener('click', close); document.removeEventListener('keydown', keyNav); }
    };
    // Keyboard navigation in context menu
    var keyNav = function (ev) {
      var items = Array.from(menu.querySelectorAll('.ctx-item:not([style*="display:none"])'));
      if (!items.length) return;
      var focused = document.activeElement;
      var curIdx  = items.indexOf(focused);
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        var next = curIdx < items.length - 1 ? curIdx + 1 : 0;
        items[next].focus();
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        var prev = curIdx > 0 ? curIdx - 1 : items.length - 1;
        items[prev].focus();
      } else if (ev.key === 'Enter' && curIdx >= 0) {
        ev.preventDefault();
        items[curIdx].click();
      } else if (ev.key === 'Escape') {
        menu.remove();
        document.removeEventListener('click', close);
        document.removeEventListener('keydown', keyNav);
      }
    };
    // Make items focusable
    menu.querySelectorAll('.ctx-item').forEach(function (it) { it.setAttribute('tabindex', '0'); });
    // Focus first item
    var firstItem = menu.querySelector('.ctx-item');
    if (firstItem) firstItem.focus();
    document.addEventListener('click', close);
    document.addEventListener('keydown', keyNav);
  }, 10);
}

// ============================================================
// MY TASKS
// ============================================================
function renderMyTasks() {
  var main = document.getElementById('main-content');
  if (!main) return;
  var st = Store.stats();
  var active = st.myTickets.filter(function (t) { return !t.isDone; });
  var done   = st.myTickets.filter(function (t) { return t.isDone; });

  var todayStr = new Date().toDateString();
  var weekLater = new Date(); weekLater.setDate(weekLater.getDate() + 7);

  function classify(t) {
    if (!t.card.dueDate) return 'nodate';
    var due = parseDate(t.card.dueDate);
    if (due < new Date()) return 'overdue';
    if (due.toDateString() === todayStr) return 'today';
    if (due <= weekLater) return 'week';
    return 'later';
  }

  var groups = { overdue: [], today: [], week: [], later: [], nodate: [] };
  var groupLabels = { overdue: '🔴 Atrasados', today: '🟡 Hoje', week: '🔵 Esta Semana', later: '⚪ Mais Tarde', nodate: '— Sem Data' };
  active.forEach(function (t) { groups[classify(t)].push(t); });

  var TH = '<thead><tr><th>Ticket</th><th>Status</th><th>Prioridade</th><th>Responsável</th><th>Vencimento</th><th>Quadro</th><th style="width:36px"></th></tr></thead>';

  function rows(arr, isDoneSection) {
    var h = '';
    for (var i = 0; i < arr.length; i++) {
      var t = arr[i];
      var p = pri(t.card.priority);
      var statusColor = isDoneSection ? 'var(--green)' : 'var(--brand)';
      h += '<tr data-bid="' + t.boardId + '" data-lid="' + t.listId + '" data-cid="' + t.card.id + '" class="dash-recent-row">' +
        '<td class="td-name">' + richTicketCell(t.card) + '</td>' +
        '<td><span class="badge" style="background:' + statusColor + ';white-space:nowrap">' + esc(t.listName) + '</span></td>' +
        '<td><span class="badge" style="background:' + p.color + '">' + p.name + '</span></td>' +
        '<td>' + richAsgnCell(t.card) + '</td>' +
        '<td style="white-space:nowrap;font-size:12px">' + richDateCell(t.card, isDoneSection) + '</td>' +
        '<td style="color:var(--text-secondary);font-size:12px">' + esc(t.boardName) + '</td>' +
        '<td class="td-actions">' + richActionBtn(t.boardId, t.listId, t.card.id) + '</td>' +
        '</tr>';
    }
    return h;
  }

  var groupHtml = '';
  var order = ['overdue', 'today', 'week', 'later', 'nodate'];
  for (var gi = 0; gi < order.length; gi++) {
    var key = order[gi];
    var arr = groups[key];
    if (arr.length === 0) continue;
    groupHtml +=
      '<div class="section-heading" style="margin-top:20px">' + groupLabels[key] + ' (' + arr.length + ')</div>' +
      '<table class="data-table" style="margin-bottom:8px">' + TH + '<tbody>' + rows(arr, false) + '</tbody></table>';
  }

  main.innerHTML =
    '<div class="view-header"><div class="view-title">Minhas Tarefas</div><div class="view-subtitle">Tickets atribuídos a você em todos os quadros.</div></div>' +
    '<div class="tasks-scroll">' +
    (active.length > 0 ? groupHtml : emptyState('check', 'Tudo em dia!', 'Nenhum ticket pendente atribuído a você.', '')) +
    (done.length > 0
      ? '<div class="section-heading" style="margin-top:32px;opacity:0.7">Concluídas (' + done.length + ')</div>' +
        '<table class="data-table" style="opacity:0.65;margin-bottom:32px">' + TH + '<tbody>' + rows(done, true) + '</tbody></table>'
      : '') +
    '</div>';

  main.querySelectorAll('.dash-recent-row').forEach(function (tr) {
    tr.onclick = function (e) {
      if (e.target.closest('.dash-action-btn')) return;
      goBoard(tr.dataset.bid);
      setTimeout(function () { openModal(tr.dataset.lid, tr.dataset.cid); }, 100);
    };
    tr.oncontextmenu = function (e) {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, tr.dataset.bid, tr.dataset.lid, tr.dataset.cid);
    };
  });
  main.querySelectorAll('.dash-action-btn').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      showQuickMenu(e, btn.dataset.bid, btn.dataset.lid, btn.dataset.cid);
    };
  });
}

// ============================================================
// CALENDAR VIEW
// ============================================================
// ─── CALENDAR HELPERS ───────────────────────────────────────
var _CAL_MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var _CAL_DAYS   = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
var _CAL_DAYS_FULL = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

// Build full event set filtered by board/assignee
function _calEvents() {
  var bs = Store.boards();
  var bFilter = App.calBoard;
  var aFilter = App.calAssignee;
  var events = [];
  for (var bi = 0; bi < bs.length; bi++) {
    var b = bs[bi];
    if (bFilter && b.id !== bFilter) continue;
    for (var li = 0; li < b.lists.length; li++) {
      var l = b.lists[li];
      var isDone = li === b.lists.length - 1;
      for (var ci = 0; ci < l.cards.length; ci++) {
        var c = l.cards[ci];
        if (aFilter && c.assigneeId !== aFilter) continue;
        if (!c.dueDate) continue;
        events.push({
          card: c, boardId: b.id, listId: l.id,
          boardName: b.name, isDone: isDone,
          dueDate: c.dueDate, due: parseDate(c.dueDate)
        });
      }
    }
  }
  return events;
}

// Make date key YYYY-MM-DD from Date
function _dateKey(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// Group events by date key
function _groupByDay(events) {
  var map = {};
  events.forEach(function (ev) {
    var k = ev.dueDate;
    if (!map[k]) map[k] = [];
    map[k].push(ev);
  });
  return map;
}

// Build one event chip HTML
function _calChip(ev, today, compact) {
  var p = pri(ev.card.priority);
  var isOverdue = !ev.isDone && ev.due < today;
  var asgn = ev.card.assigneeId ? Store.user(ev.card.assigneeId) : null;
  var cls = 'cal-card-chip' + (isOverdue ? ' cal-chip-overdue' : '') + (ev.isDone ? ' cal-chip-done' : '');
  var num = '#' + String(ev.card.ticketNumber).padStart(3,'0');
  var title = ev.card.title || '';
  var maxLen = compact ? 16 : 24;
  var label = title.length > maxLen ? title.substring(0, maxLen) + '…' : title;
  return '<div class="' + cls + '" data-bid="' + ev.boardId + '" data-lid="' + ev.listId + '" data-cid="' + ev.card.id + '" ' +
    'title="' + esc(title) + ' · ' + esc(ev.boardName) + '" style="border-left:3px solid ' + p.color + '">' +
    '<span class="cal-chip-num">' + num + '</span>' +
    '<span class="cal-chip-title">' + esc(label) + '</span>' +
    (asgn && !compact ? '<span class="cal-chip-avatar" style="background:' + avatarBg(asgn.name) + '">' + initials(asgn.name) + '</span>' : '') +
    '</div>';
}

// ─── CALENDAR RENDER ─────────────────────────────────────────
function renderCalendar() {
  var main = document.getElementById('main-content');
  if (!main) return;

  var today = new Date();
  today.setHours(0,0,0,0);
  var year = App.calYear, month = App.calMonth;
  var view = App.calView || 'month';

  var bs = Store.boards();
  var allUsers = Store.allUsers();

  // Filter selects HTML
  var boardOpts = '<option value="">Todos os quadros</option>' + bs.map(function (b2) {
    return '<option value="' + b2.id + '"' + (App.calBoard === b2.id ? ' selected' : '') + '>' + esc(b2.name) + '</option>';
  }).join('');
  var userOpts = '<option value="">Todos os responsáveis</option>' + allUsers.map(function (u) {
    return '<option value="' + u.id + '"' + (App.calAssignee === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>';
  }).join('');

  // View label for title bar
  var navLabel = '';
  if (view === 'month') {
    navLabel = _CAL_MONTHS[month] + ' ' + year;
  } else if (view === 'week') {
    var weekStart = _weekStart(year, month, App.calWeekDay || 1);
    var weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
    navLabel = weekStart.getDate() + ' ' + _CAL_MONTHS[weekStart.getMonth()].substring(0,3) +
      ' – ' + weekEnd.getDate() + ' ' + _CAL_MONTHS[weekEnd.getMonth()].substring(0,3) + ' ' + weekEnd.getFullYear();
  } else {
    navLabel = 'Próximos eventos';
  }

  // Month summary badge
  var allEventsThisMonth = _calEvents().filter(function (ev) {
    return ev.due.getFullYear() === year && ev.due.getMonth() === month;
  });
  var overdueCount = allEventsThisMonth.filter(function (ev) { return !ev.isDone && ev.due < today; }).length;
  var summaryHtml = allEventsThisMonth.length > 0
    ? '<span class="cal-summary-badge">' + allEventsThisMonth.length + ' ticket' + (allEventsThisMonth.length !== 1 ? 's' : '') + ' este mês' +
      (overdueCount > 0 ? ' · <span style="color:var(--red)">' + overdueCount + ' atrasado' + (overdueCount > 1 ? 's' : '') + '</span>' : '') +
      '</span>'
    : '';

  // Header HTML
  var headerHtml =
    '<div class="view-header cal-view-header">' +
    '<div class="cal-header-top">' +
    '<div class="view-title">Calendário</div>' +
    '<div class="cal-header-right">' +
    // View switcher
    '<div class="cal-view-switcher">' +
    '<button class="cal-view-btn' + (view==='month'?' cal-view-btn-active':'') + '" data-calview="month">Mês</button>' +
    '<button class="cal-view-btn' + (view==='week'?' cal-view-btn-active':'') + '" data-calview="week">Semana</button>' +
    '<button class="cal-view-btn' + (view==='agenda'?' cal-view-btn-active':'') + '" data-calview="agenda">Agenda</button>' +
    '</div>' +
    // Filters
    '<select class="filter-select cal-filter-select" id="cal-f-board">' + boardOpts + '</select>' +
    '<select class="filter-select cal-filter-select" id="cal-f-assignee">' + userOpts + '</select>' +
    '</div>' +
    '</div>' +
    // Navigation row
    '<div class="cal-nav-row">' +
    '<div class="cal-nav-controls">' +
    '<button class="btn-icon" id="cal-prev" title="Anterior">' + ICONS.arrowLeft + '</button>' +
    '<button class="btn-secondary cal-today-btn" id="cal-today">Hoje</button>' +
    '<button class="btn-icon" id="cal-next" title="Próximo">' + ICONS.arrowRight + '</button>' +
    '<span class="cal-nav-label">' + navLabel + '</span>' +
    '</div>' +
    summaryHtml +
    '</div>' +
    '</div>';

  main.innerHTML = headerHtml + '<div id="cal-body" class="cal-body"></div>';

  // Render the selected view
  if (view === 'month') _renderCalMonth(year, month, today);
  else if (view === 'week') _renderCalWeek(year, month, today);
  else _renderCalAgenda(today);

  // ── Event handlers ─────────────────────────────────────────
  // View switcher
  main.querySelectorAll('[data-calview]').forEach(function (btn) {
    btn.onclick = function () { App.calView = btn.dataset.calview; renderCalendar(); };
  });

  // Filters
  var cfBoard = document.getElementById('cal-f-board');
  if (cfBoard) cfBoard.onchange = function () { App.calBoard = this.value; renderCalendar(); };
  var cfAsgn = document.getElementById('cal-f-assignee');
  if (cfAsgn) cfAsgn.onchange = function () { App.calAssignee = this.value; renderCalendar(); };

  // Navigation
  document.getElementById('cal-prev').onclick = function () { _calNavPrev(); };
  document.getElementById('cal-next').onclick = function () { _calNavNext(); };
  document.getElementById('cal-today').onclick = function () {
    var t = new Date();
    App.calYear = t.getFullYear(); App.calMonth = t.getMonth();
    App.calWeekDay = 1; renderCalendar();
  };

  // Keyboard nav
  var _calKeyHandler = function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') { _calNavPrev(); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { _calNavNext(); e.preventDefault(); }
  };
  document.addEventListener('keydown', _calKeyHandler);
  // Clean up when leaving view
  main._calKeyHandler = _calKeyHandler;

  // Chip click → open modal
  _bindCalChips(main);
}

function _calNavPrev() {
  var v = App.calView || 'month';
  if (v === 'month') {
    App.calMonth--; if (App.calMonth < 0) { App.calMonth = 11; App.calYear--; }
  } else if (v === 'week') {
    var ws = _weekStart(App.calYear, App.calMonth, App.calWeekDay || 1);
    ws.setDate(ws.getDate() - 7);
    App.calYear = ws.getFullYear(); App.calMonth = ws.getMonth(); App.calWeekDay = ws.getDate();
  }
  renderCalendar();
}
function _calNavNext() {
  var v = App.calView || 'month';
  if (v === 'month') {
    App.calMonth++; if (App.calMonth > 11) { App.calMonth = 0; App.calYear++; }
  } else if (v === 'week') {
    var ws = _weekStart(App.calYear, App.calMonth, App.calWeekDay || 1);
    ws.setDate(ws.getDate() + 7);
    App.calYear = ws.getFullYear(); App.calMonth = ws.getMonth(); App.calWeekDay = ws.getDate();
  }
  renderCalendar();
}

// Return the Sunday that starts the week containing (year, month, day)
function _weekStart(year, month, day) {
  var d = new Date(year, month, day || 1);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function _bindCalChips(container) {
  container.querySelectorAll('.cal-card-chip').forEach(function (chip) {
    chip.onclick = function (e) {
      e.stopPropagation();
      goBoard(chip.dataset.bid);
      setTimeout(function () { openModal(chip.dataset.lid, chip.dataset.cid); }, 100);
    };
  });
  // "Add ticket" from a calendar day
  container.querySelectorAll('.cal-day-add').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      var dateStr = btn.dataset.date;
      var b = Store.boards();
      if (!b.length) { showToast('Crie um quadro primeiro', 'info'); return; }
      // Navigate to first board and pre-fill due date
      var firstBoard = b[0];
      goBoard(firstBoard.id);
      setTimeout(function () {
        var firstListId = firstBoard.lists[0] && firstBoard.lists[0].id;
        if (firstListId) showAddCardForm(firstListId, dateStr);
      }, 150);
    };
  });
}

// ── MONTH VIEW ───────────────────────────────────────────────
function _renderCalMonth(year, month, today) {
  var body = document.getElementById('cal-body');
  if (!body) return;

  var events = _calEvents();
  var dayMap = _groupByDay(events);

  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var prevMonthDays = new Date(year, month, 0).getDate();

  var html = '<div class="cal-scroll"><div class="cal-grid">';

  // Day name headers
  for (var dn = 0; dn < 7; dn++) {
    html += '<div class="cal-day-name">' + _CAL_DAYS[dn] + '</div>';
  }

  // Prev-month filler days
  for (var pb = 0; pb < firstDay; pb++) {
    var prevDay = prevMonthDays - firstDay + pb + 1;
    var prevMo = month - 1 < 0 ? 11 : month - 1;
    var prevYr = month - 1 < 0 ? year - 1 : year;
    var prevKey = prevYr + '-' + String(prevMo+1).padStart(2,'0') + '-' + String(prevDay).padStart(2,'0');
    var prevEvs = dayMap[prevKey] || [];
    html += '<div class="cal-cell cal-cell-other">' +
      '<div class="cal-cell-num">' + prevDay + '</div>' +
      (prevEvs.length ? '<div class="cal-cell-other-dot" title="' + prevEvs.length + ' ticket(s)">●</div>' : '') +
      '</div>';
  }

  // Current month days
  for (var d = 1; d <= daysInMonth; d++) {
    var key = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    var dayEvs = (dayMap[key] || []).slice();
    dayEvs.sort(function (a, b2) {
      // Sort: overdue first, then by priority
      var aOver = !a.isDone && a.due < today;
      var bOver = !b2.isDone && b2.due < today;
      if (aOver && !bOver) return -1;
      if (!aOver && bOver) return 1;
      var priOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return (priOrder[a.card.priority] || 2) - (priOrder[b2.card.priority] || 2);
    });

    var cellDate = new Date(year, month, d);
    var isToday2 = _dateKey(cellDate) === _dateKey(today);
    var isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
    var hasDue = dayEvs.length > 0;
    var hasOverdue = dayEvs.some(function (ev) { return !ev.isDone && ev.due < today; });

    var cls = 'cal-cell' +
      (isToday2 ? ' cal-today' : '') +
      (isWeekend ? ' cal-weekend' : '') +
      (hasDue ? ' cal-has-events' : '') +
      (hasOverdue ? ' cal-has-overdue' : '');

    var chips = '';
    var maxShow = 3;
    for (var k2 = 0; k2 < Math.min(dayEvs.length, maxShow); k2++) {
      chips += _calChip(dayEvs[k2], today, true);
    }
    if (dayEvs.length > maxShow) {
      chips += '<button class="cal-card-more" data-date="' + key + '">+' + (dayEvs.length - maxShow) + ' mais</button>';
    }

    html += '<div class="' + cls + '" data-date="' + key + '">' +
      '<div class="cal-cell-header">' +
      '<div class="cal-cell-num' + (isToday2 ? ' cal-today-num' : '') + '">' + d + '</div>' +
      '<button class="cal-day-add" data-date="' + key + '" title="Adicionar ticket neste dia">+</button>' +
      '</div>' +
      chips +
      '</div>';
  }

  // Next-month filler days
  var totalCells = firstDay + daysInMonth;
  var nextCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (var na = 0; na < nextCells; na++) {
    var nextMo = month + 1 > 11 ? 0 : month + 1;
    var nextYr = month + 1 > 11 ? year + 1 : year;
    var nextKey2 = nextYr + '-' + String(nextMo+1).padStart(2,'0') + '-' + String(na+1).padStart(2,'0');
    var nextEvs = dayMap[nextKey2] || [];
    html += '<div class="cal-cell cal-cell-other">' +
      '<div class="cal-cell-num">' + (na + 1) + '</div>' +
      (nextEvs.length ? '<div class="cal-cell-other-dot">●</div>' : '') +
      '</div>';
  }

  html += '</div></div>';
  body.innerHTML = html;

  // "X mais" expander → show day popover
  body.querySelectorAll('.cal-card-more[data-date]').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      _showDayPopover(btn.dataset.date, dayMap[btn.dataset.date] || [], today, btn);
    };
  });

  // Click on cell → mini popover if has events
  body.querySelectorAll('.cal-cell[data-date]').forEach(function (cell) {
    cell.onclick = function (e) {
      if (e.target.closest('.cal-card-chip') || e.target.closest('.cal-day-add') || e.target.closest('.cal-card-more')) return;
    };
  });
}

// Day popover (appears above/below "X mais" button)
function _showDayPopover(dateStr, evs, today, anchor) {
  document.querySelectorAll('.cal-day-popover').forEach(function (p) { p.remove(); });
  var parts = dateStr.split('-');
  var d = parseInt(parts[2],10), mo = parseInt(parts[1],10)-1, yr = parseInt(parts[0],10);
  var label = _CAL_DAYS_FULL[new Date(yr,mo,d).getDay()] + ', ' + d + ' de ' + _CAL_MONTHS[mo];

  var pop = document.createElement('div');
  pop.className = 'cal-day-popover';
  pop.innerHTML =
    '<div class="cal-day-popover-header"><span>' + label + '</span><button class="cdp-close">✕</button></div>' +
    evs.map(function (ev) { return _calChip(ev, today, false); }).join('');
  document.body.appendChild(pop);

  // Position near anchor
  var rect = anchor.getBoundingClientRect();
  var popH = Math.min(evs.length * 36 + 40, 320);
  var top = rect.bottom + 8;
  if (top + popH > window.innerHeight - 16) top = rect.top - popH - 8;
  pop.style.top = (top + window.scrollY) + 'px';
  pop.style.left = Math.min(rect.left, window.innerWidth - 240) + 'px';

  pop.querySelector('.cdp-close').onclick = function () { pop.remove(); };
  pop.querySelectorAll('.cal-card-chip').forEach(function (chip) {
    chip.onclick = function () {
      pop.remove();
      goBoard(chip.dataset.bid);
      setTimeout(function () { openModal(chip.dataset.lid, chip.dataset.cid); }, 100);
    };
  });
  var closeOutside = function (e) { if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', closeOutside); } };
  setTimeout(function () { document.addEventListener('click', closeOutside); }, 0);
}

// ── WEEK VIEW ────────────────────────────────────────────────
function _renderCalWeek(year, month, today) {
  var body = document.getElementById('cal-body');
  if (!body) return;

  var ws = _weekStart(year, month, App.calWeekDay || today.getDate());
  App.calWeekDay = ws.getDate();
  App.calMonth = ws.getMonth();
  App.calYear = ws.getFullYear();

  var events = _calEvents();
  var dayMap = _groupByDay(events);

  var html = '<div class="cal-week-grid">';
  // Column headers
  html += '<div class="cal-week-header-row">';
  for (var di = 0; di < 7; di++) {
    var colDate = new Date(ws); colDate.setDate(ws.getDate() + di);
    var isToday2 = _dateKey(colDate) === _dateKey(today);
    var isWeekend = colDate.getDay() === 0 || colDate.getDay() === 6;
    html +=
      '<div class="cal-week-col-header' + (isToday2 ? ' cal-week-today-header' : '') + (isWeekend ? ' cal-week-weekend-header' : '') + '">' +
      '<div class="cal-week-day-name">' + _CAL_DAYS[colDate.getDay()] + '</div>' +
      '<div class="cal-week-day-num' + (isToday2 ? ' cal-today-num' : '') + '">' + colDate.getDate() + '</div>' +
      '<div class="cal-week-month">' + _CAL_MONTHS[colDate.getMonth()].substring(0,3) + '</div>' +
      '</div>';
  }
  html += '</div>';

  // Column bodies
  html += '<div class="cal-week-body-row">';
  for (var di2 = 0; di2 < 7; di2++) {
    var colDate2 = new Date(ws); colDate2.setDate(ws.getDate() + di2);
    var key = _dateKey(colDate2);
    var dayEvs = (dayMap[key] || []).slice();
    dayEvs.sort(function (a, b2) {
      var aOver = !a.isDone && a.due < today;
      var bOver = !b2.isDone && b2.due < today;
      if (aOver && !bOver) return -1;
      if (!aOver && bOver) return 1;
      return 0;
    });
    var isToday3 = _dateKey(colDate2) === _dateKey(today);
    var isWeekend2 = colDate2.getDay() === 0 || colDate2.getDay() === 6;
    html +=
      '<div class="cal-week-col' + (isToday3 ? ' cal-week-today-col' : '') + (isWeekend2 ? ' cal-week-weekend-col' : '') + '" data-date="' + key + '">' +
      dayEvs.map(function (ev) { return _calChip(ev, today, false); }).join('') +
      (dayEvs.length === 0 ? '<div class="cal-week-col-empty"></div>' : '') +
      '<button class="cal-day-add" data-date="' + key + '" title="Adicionar ticket">+</button>' +
      '</div>';
  }
  html += '</div></div>';
  body.innerHTML = html;
  _bindCalChips(body);
}

// ── AGENDA VIEW ──────────────────────────────────────────────
function _renderCalAgenda(today) {
  var body = document.getElementById('cal-body');
  if (!body) return;

  var events = _calEvents();
  events.sort(function (a, b2) { return a.due - b2.due; });

  var now = today.getTime();
  var oneDay = 86400000;

  // Classify into buckets
  var buckets = [
    { key: 'overdue', label: '⚠ Atrasados', cls: 'agenda-bucket-overdue', evs: [] },
    { key: 'today',   label: '📅 Hoje',       cls: 'agenda-bucket-today', evs: [] },
    { key: 'week',    label: '📆 Esta Semana',  cls: 'agenda-bucket-week', evs: [] },
    { key: 'month',   label: '🗓 Este Mês',    cls: 'agenda-bucket-month', evs: [] },
    { key: 'later',   label: '🔮 Mais Tarde',  cls: 'agenda-bucket-later', evs: [] },
    { key: 'done',    label: '✅ Concluídos',  cls: 'agenda-bucket-done', evs: [] }
  ];

  var endOfToday = new Date(today); endOfToday.setHours(23,59,59,999);
  var endOfWeek = new Date(today); endOfWeek.setDate(today.getDate() + 7);
  var endOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

  events.forEach(function (ev) {
    if (ev.isDone) { buckets[5].evs.push(ev); return; }
    var t = ev.due.getTime();
    if (t < now) buckets[0].evs.push(ev);
    else if (t <= endOfToday.getTime()) buckets[1].evs.push(ev);
    else if (t <= endOfWeek.getTime()) buckets[2].evs.push(ev);
    else if (t <= endOfMonth.getTime()) buckets[3].evs.push(ev);
    else buckets[4].evs.push(ev);
  });

  var html = '<div class="cal-agenda">';

  var hasAny = false;
  buckets.forEach(function (bucket) {
    if (bucket.evs.length === 0) return;
    hasAny = true;
    html += '<div class="agenda-bucket ' + bucket.cls + '">';
    html += '<div class="agenda-bucket-label">' + bucket.label +
      ' <span class="agenda-bucket-count">' + bucket.evs.length + '</span></div>';

    bucket.evs.forEach(function (ev) {
      var p = pri(ev.card.priority);
      var asgn = ev.card.assigneeId ? Store.user(ev.card.assigneeId) : null;
      var req  = ev.card.requesterId ? Store.user(ev.card.requesterId) : null;
      var isOverdue = !ev.isDone && ev.due < today;
      var dueFmt = ev.due.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
      html +=
        '<div class="agenda-row cal-card-chip" data-bid="' + ev.boardId + '" data-lid="' + ev.listId + '" data-cid="' + ev.card.id + '">' +
        '<span class="agenda-pri-dot" style="background:' + p.color + '" title="' + p.name + '"></span>' +
        '<div class="agenda-row-main">' +
        '<div class="agenda-row-title">' +
        '<span class="agenda-ticket-num">#' + String(ev.card.ticketNumber).padStart(3,'0') + '</span>' +
        '<span class="agenda-ticket-title' + (ev.isDone ? ' agenda-done-title' : '') + '">' + esc(ev.card.title) + '</span>' +
        (ev.card.category ? '<span class="dash-cat-tag">' + esc(ev.card.category) + '</span>' : '') +
        '</div>' +
        '<div class="agenda-row-meta">' +
        '<span class="agenda-board-name">' + esc(ev.boardName) + '</span>' +
        (req ? ' · <span>👤 ' + esc(req.name) + '</span>' : '') +
        ' · <span class="agenda-pri-label" style="color:' + p.color + '">' + p.name + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="agenda-row-right">' +
        (asgn ? '<div class="avatar avatar-sm" style="background:' + avatarBg(asgn.name) + '" title="' + esc(asgn.name) + '">' + initials(asgn.name) + '</div>' : '') +
        '<span class="agenda-due-date' + (isOverdue ? ' agenda-overdue-date' : '') + '">' + dueFmt + '</span>' +
        '</div>' +
        '</div>';
    });
    html += '</div>';
  });

  if (!hasAny) {
    html += '<div class="cal-agenda-empty">' +
      '<div style="font-size:48px;margin-bottom:12px">🗓</div>' +
      '<div style="font-size:16px;font-weight:600;color:var(--text);margin-bottom:6px">Nenhum ticket com prazo definido</div>' +
      '<div style="font-size:13px;color:var(--text-secondary)">Adicione datas de vencimento aos tickets para vê-los aqui</div>' +
      '</div>';
  }
  html += '</div>';
  body.innerHTML = html;
  _bindCalChips(body);
}

// ============================================================
// BOARD VIEW
// ============================================================
function goBoard(id) {
  App.view = 'board';
  App.boardId = id;
  App.kanbanPages = {};
  App.bulkMode = false;
  App.bulkSelected = [];
  var b = Store.board(id);
  if (b) document.title = b.name + ' — Mottion Desk';
  renderApp();
}

function renderBoard() {
  var b = Store.board(App.boardId);
  var main = document.getElementById('main-content');
  if (!b || !main) return;
  var isList = b.viewMode === 'list';
  var f = App.boardFilter;

  var userOpts = '<option value="">Todos</option>' + Store.allUsers().map(function (u) {
    return '<option value="' + u.id + '"' + (f.assignee === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>';
  }).join('');
  var priOpts = '<option value="">Todas</option>' + PRIORITIES.map(function (p2) {
    return '<option value="' + p2.id + '"' + (f.priority === p2.id ? ' selected' : '') + '>' + p2.name + '</option>';
  }).join('');
  var catOpts = '<option value="">Categorias</option>' + getCats().map(function (cat) {
    return '<option value="' + esc(cat) + '"' + (f.category === cat ? ' selected' : '') + '>' + esc(cat) + '</option>';
  }).join('');
  var hasFilter = f.search || f.priority || f.assignee || f.category;

  main.innerHTML =
    '<div class="view-header">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
    '<div><div class="view-title">' + esc(b.name) + '</div>' +
    '<div class="view-subtitle">' + dept(b.departmentId).icon + ' ' + dept(b.departmentId).name + '</div></div>' +
    '<div style="display:flex;gap:8px;align-items:center">' +
    '<button class="btn-secondary" id="btn-customize-board" style="display:inline-flex;align-items:center;gap:6px"><svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg> Personalizar</button>' +
    '<button class="btn-secondary btn-danger" id="del-board">' + ICONS.trash + ' Excluir Quadro</button>' +
    '</div>' +
    '</div>' +
    '<div class="view-tabs">' +
    '<div class="view-tab' + (isList ? '' : ' active') + '" id="tab-board">' + ICONS.board + ' Quadro</div>' +
    '<div class="view-tab' + (isList ? ' active' : '') + '" id="tab-list">' + ICONS.list + ' Lista</div>' +
    '</div>' +
    '<div class="filter-bar">' +
    '<div class="filter-search-wrap">' + ICONS.search + '<input class="filter-input" id="f-search" type="text" placeholder="Filtrar tickets…" value="' + esc(f.search) + '"></div>' +
    '<select class="filter-select" id="f-pri">' + priOpts + '</select>' +
    '<select class="filter-select" id="f-cat">' + catOpts + '</select>' +
    '<select class="filter-select" id="f-assignee">' + userOpts + '</select>' +
    (hasFilter ? '<button class="btn-secondary" id="f-clear" style="padding:0 12px;height:34px">✕ Limpar</button>' : '') +
    '</div>' +
    '</div>' +
    '<div id="board-body"></div>';

  document.getElementById('tab-board').onclick = function () { b.viewMode = 'board'; Store.save(); renderBoard(); };
  document.getElementById('tab-list').onclick = function () { b.viewMode = 'list'; Store.save(); renderBoard(); };
  document.getElementById('btn-customize-board').onclick = function (e) { e.stopPropagation(); showBoardCustomizer(b); };
  document.getElementById('del-board').onclick = function () {
    if (confirm('Excluir o quadro "' + b.name + '"?')) { Store.deleteBoard(b.id); App.view = 'dashboard'; App.boardId = null; renderApp(); }
  };
  var _resetPagesAndRender = function () { App.kanbanPages = {}; if (isList) renderBoardList(b); else renderBoardKanban(b); };
  var _renderCards = _debounce(function () { App.kanbanPages = {}; if (isList) renderBoardList(b); else renderBoardKanban(b); }, 280);
  document.getElementById('f-search').oninput = function () { f.search = this.value; _renderCards(); };
  document.getElementById('f-pri').onchange = function () { f.priority = this.value; _resetPagesAndRender(); };
  document.getElementById('f-cat').onchange = function () { f.category = this.value; _resetPagesAndRender(); };
  document.getElementById('f-assignee').onchange = function () { f.assignee = this.value; _resetPagesAndRender(); };
  var clearBtn = document.getElementById('f-clear');
  if (clearBtn) clearBtn.onclick = function () { App.boardFilter = { search: '', priority: '', category: '', assignee: '' }; renderBoard(); };

  if (isList) renderBoardList(b);
  else renderBoardKanban(b);
}

// ─── KANBAN VIEW ────────────────────────────────────────────
function applyFilter(cards) {
  var f = App.boardFilter;
  var q = (f.search || '').toLowerCase().trim();
  return cards.filter(function (c) {
    if (q && (c.title || '').toLowerCase().indexOf(q) < 0 &&
        String(c.ticketNumber).indexOf(q) < 0 &&
        (c.description || '').toLowerCase().indexOf(q) < 0) return false;
    if (f.priority && c.priority !== f.priority) return false;
    if (f.category && c.category !== f.category) return false;
    if (f.assignee && c.assigneeId !== f.assignee) return false;
    return true;
  });
}

function renderBoardKanban(b) {
  var body = document.getElementById('board-body');
  if (!body) return;
  var _bg = getBoardBg(b);
  var _bgStyle = 'background:' + _bg.bg + (_bg.size ? ';background-size:' + _bg.size : '');

  // Bulk action toolbar
  var bulkBarHtml = App.bulkMode
    ? '<div class="bulk-toolbar" id="bulk-toolbar">' +
      '<span class="bulk-count" id="bulk-count">' + App.bulkSelected.length + ' selecionado(s)</span>' +
      '<button class="btn-secondary bulk-action-btn" id="bulk-done">✓ Concluir</button>' +
      '<button class="btn-secondary bulk-action-btn" id="bulk-delete" style="color:var(--red);border-color:var(--red)">🗑 Excluir</button>' +
      '<button class="btn-secondary" id="bulk-cancel">Cancelar</button>' +
      '</div>'
    : '<div class="bulk-bar-placeholder">' +
      '<button class="btn-secondary" id="bulk-toggle" style="margin-left:auto;height:30px;padding:0 12px;font-size:12px">☑ Seleção múltipla</button>' +
      '</div>';

  var html = bulkBarHtml + '<div class="kanban-scroll" style="' + _bgStyle + '">';

  var wipLimits = Store.getSetting('wipLimits', {});
  for (var i = 0; i < b.lists.length; i++) {
    var l = b.lists[i];
    var isDone = i === b.lists.length - 1;
    var filtered = applyFilter(l.cards);
    var wipKey = b.id + '_' + l.id;
    var wipLimit = wipLimits[wipKey] ? parseInt(wipLimits[wipKey]) : 0;
    var wipOver = wipLimit > 0 && l.cards.length > wipLimit;
    var wipAt = wipLimit > 0 && l.cards.length === wipLimit;
    var wipBadge = wipLimit > 0
      ? '<span class="wip-badge' + (wipOver ? ' wip-over' : wipAt ? ' wip-at' : '') + '" title="Limite WIP: ' + wipLimit + '">' +
        l.cards.length + '/' + wipLimit + '</span>'
      : '<span class="kanban-col-count">' + filtered.length + '</span>';
    if (!App.collapsedCols) App.collapsedCols = {};
    var isCollapsed = !!App.collapsedCols[l.id];
    var chevronIcon = '<svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:currentColor;transition:transform 0.2s;transform:rotate(' + (isCollapsed ? '-90' : '0') + 'deg)"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>';
    html += '<div class="kanban-col' + (wipOver ? ' wip-exceeded' : '') + (isCollapsed ? ' col-collapsed' : '') + '" data-lid="' + l.id + '" data-idx="' + i + '">' +
      '<div class="kanban-col-header">' +
      '<button class="btn-icon col-collapse-btn" data-collapse-lid="' + l.id + '" title="' + (isCollapsed ? 'Expandir' : 'Recolher') + '" style="flex-shrink:0">' + chevronIcon + '</button>' +
      '<input class="kanban-col-title" value="' + esc(l.name) + '" data-lid="' + l.id + '" spellcheck="false">' +
      wipBadge +
      '<button class="btn-icon" data-del-list="' + l.id + '">' + ICONS.close + '</button>' +
      '</div>';

    if (!isCollapsed) {
      html += '<div class="kanban-col-cards" data-lid="' + l.id + '">';
      var pageSize = App.kanbanPageSize || 20;
      var pageKey  = App.boardId + '_' + l.id;
      var pageLimit = (App.kanbanPages && App.kanbanPages[pageKey]) ? App.kanbanPages[pageKey] * pageSize : pageSize;
      var visible  = filtered.slice(0, pageLimit);
      var hidden   = filtered.length - visible.length;

      if (visible.length === 0) {
        var emptyMsg = (App.boardFilter.search || App.boardFilter.priority || App.boardFilter.category || App.boardFilter.assignee)
          ? '<div class="col-empty-state">Nenhum ticket corresponde ao filtro</div>'
          : '<div class="col-empty-state col-empty-drop">Arraste tickets aqui</div>';
        html += emptyMsg;
      } else {
        for (var j = 0; j < visible.length; j++) {
          html += renderCardHTML(visible[j], l.id, j, isDone, b);
        }
      }
      if (hidden > 0) {
        html += '<div class="kanban-load-more-bar">' +
          '<button class="kanban-load-more" data-lid="' + l.id + '" data-total="' + filtered.length + '">' +
          ICONS.plus + ' +' + hidden + ' oculto' + (hidden !== 1 ? 's' : '') + '</button>' +
          '<button class="kanban-show-all" data-lid="' + l.id + '" data-total="' + filtered.length + '">Ver tudo</button>' +
          '</div>';
      }
      html += '</div>' +
        '<div class="kanban-col-footer" id="footer-' + l.id + '">' +
        '<button class="add-card-btn" data-add-card="' + l.id + '">' + ICONS.plus + ' Adicionar ticket</button>' +
        '</div>';
    }
    html += '</div>';
  }

  html += '<div class="add-col-placeholder" id="add-col-ph">' +
    '<button class="add-col-btn" id="add-col-btn">' + ICONS.plus + ' Adicionar coluna</button></div>';
  html += '</div>';
  body.innerHTML = html;

  // Bulk mode controls
  var bulkToggleBtn = document.getElementById('bulk-toggle');
  if (bulkToggleBtn) {
    bulkToggleBtn.onclick = function () { App.bulkMode = true; App.bulkSelected = []; renderBoardKanban(Store.board(App.boardId)); };
  }
  var bulkCancelBtn = document.getElementById('bulk-cancel');
  if (bulkCancelBtn) {
    bulkCancelBtn.onclick = function () { App.bulkMode = false; App.bulkSelected = []; renderBoardKanban(Store.board(App.boardId)); };
  }
  var bulkDoneBtn = document.getElementById('bulk-done');
  if (bulkDoneBtn) {
    bulkDoneBtn.onclick = function () {
      if (!App.bulkSelected.length) return;
      var brd = Store.board(App.boardId);
      if (!brd) return;
      var lastList = brd.lists[brd.lists.length - 1];
      App.bulkSelected.forEach(function (cid) {
        for (var i = 0; i < brd.lists.length - 1; i++) {
          var li = brd.lists[i];
          var idx = li.cards.findIndex(function (x) { return x.id === cid; });
          if (idx >= 0) { Store.moveCard(brd.id, li.id, lastList.id, idx, lastList.cards.length); break; }
        }
      });
      App.bulkMode = false; App.bulkSelected = [];
      showToast(App.bulkSelected.length + ' ticket(s) concluído(s)!', 'success');
      renderBoard();
    };
  }
  var bulkDeleteBtn = document.getElementById('bulk-delete');
  if (bulkDeleteBtn) {
    bulkDeleteBtn.onclick = function () {
      if (!App.bulkSelected.length) return;
      if (!confirm('Excluir ' + App.bulkSelected.length + ' ticket(s)?')) return;
      var brd = Store.board(App.boardId);
      if (!brd) return;
      App.bulkSelected.forEach(function (cid) {
        for (var i = 0; i < brd.lists.length; i++) {
          var li = brd.lists[i];
          var idx = li.cards.findIndex(function (x) { return x.id === cid; });
          if (idx >= 0) { Store.deleteCard(brd.id, li.id, cid); break; }
        }
      });
      App.bulkMode = false; App.bulkSelected = [];
      renderBoard();
    };
  }

  body.onclick = function (e) {
    // Bulk checkbox
    var cb = e.target.closest('.bulk-checkbox');
    if (cb) {
      var cid = cb.dataset.cid;
      var idx2 = App.bulkSelected.indexOf(cid);
      if (cb.checked && idx2 < 0) App.bulkSelected.push(cid);
      else if (!cb.checked && idx2 >= 0) App.bulkSelected.splice(idx2, 1);
      var countEl = document.getElementById('bulk-count');
      if (countEl) countEl.textContent = App.bulkSelected.length + ' selecionado(s)';
      return;
    }
    var dl = e.target.closest('[data-del-list]');
    if (dl) { if (confirm('Excluir coluna?')) { Store.deleteList(App.boardId, dl.dataset.delList); renderBoard(); } return; }
    // Colapso de coluna
    var ccBtn = e.target.closest('[data-collapse-lid]');
    if (ccBtn) {
      if (!App.collapsedCols) App.collapsedCols = {};
      var clid = ccBtn.dataset.collapseLid;
      App.collapsedCols[clid] = !App.collapsedCols[clid];
      renderBoardKanban(Store.board(App.boardId));
      return;
    }
    var ac = e.target.closest('[data-add-card]');
    if (ac) { showAddCardForm(ac.dataset.addCard); return; }
    // Botão "mostrar mais" da paginação por coluna
    var lm = e.target.closest('.kanban-load-more');
    if (lm) {
      if (!App.kanbanPages) App.kanbanPages = {};
      var pk = App.boardId + '_' + lm.dataset.lid;
      App.kanbanPages[pk] = (App.kanbanPages[pk] || 1) + 1;
      renderBoardKanban(Store.board(App.boardId));
      return;
    }
    // Botão "ver tudo" da paginação por coluna
    var sa = e.target.closest('.kanban-show-all');
    if (sa) {
      if (!App.kanbanPages) App.kanbanPages = {};
      var pks = App.boardId + '_' + sa.dataset.lid;
      var total = parseInt(sa.dataset.total, 10) || 0;
      var ps = App.kanbanPageSize || 20;
      App.kanbanPages[pks] = Math.ceil(total / ps);
      renderBoardKanban(Store.board(App.boardId));
      return;
    }
    // Hover action strip buttons
    var ha = e.target.closest('.card-hover-btn');
    if (ha) {
      e.stopPropagation();
      var haBrd = Store.board(App.boardId);
      if (!haBrd) return;
      var haCid = ha.dataset.cid;
      var haLid = ha.dataset.lid;
      var haAction = ha.dataset.ha;
      if (haAction === 'done') {
        var haLast = haBrd.lists[haBrd.lists.length - 1];
        var haSrc  = haBrd.lists.find(function (l) { return l.id === haLid; });
        if (!haSrc || haSrc.id === haLast.id) return;
        var haIdx = haSrc.cards.findIndex(function (x) { return x.id === haCid; });
        if (haIdx >= 0) {
          var haCard = haSrc.cards[haIdx];
          if (!haCard.completedAt) haCard.completedAt = Date.now();
          Store.addActivity(App.boardId, haLid, haCid, 'concluiu', '');
          Store.moveCard(App.boardId, haLid, haLast.id, haIdx, haLast.cards.length);
          _maybeTriggerCsat(App.boardId, haLast.id, haCid);
          renderBoard();
        }
      } else if (haAction === 'assign') {
        var haMe = Store.me();
        if (!haMe) return;
        var haFound = Store.findCard(haCid);
        if (!haFound) return;
        var haC2 = haFound.card;
        Store.updateCard(App.boardId, haLid, haCid, { assigneeId: haC2.assigneeId === haMe.id ? null : haMe.id });
        renderBoardKanban(haBrd);
      } else if (haAction === 'open') {
        openModal(haLid, haCid);
      }
      return;
    }
    // Botão de conclusão rápida (legado, mantido para compatibilidade)
    var qd = e.target.closest('.card-quick-done-btn');
    if (qd) {
      e.stopPropagation();
      var brd = Store.board(App.boardId);
      if (!brd || brd.lists.length < 1) return;
      var lastList = brd.lists[brd.lists.length - 1];
      var srcList  = brd.lists.find(function (l) { return l.id === qd.dataset.lid; });
      if (!srcList || srcList.id === lastList.id) return;
      var card = srcList.cards.find(function (x) { return x.id === qd.dataset.cid; });
      if (!card) return;
      if (!card.completedAt) card.completedAt = Date.now();
      srcList.cards = srcList.cards.filter(function (x) { return x.id !== card.id; });
      lastList.cards.push(card);
      if (!Array.isArray(card.activity)) card.activity = [];
      var me = Store.me();
      card.activity.unshift({ id: uid(), action: 'move', detail: 'Movido para ' + lastList.name + ' (conclusão rápida)', userId: me ? me.id : null, createdAt: Date.now() });
      Store.save();
      renderBoard();
      showToast('Ticket #' + String(card.ticketNumber).padStart(3, '0') + ' concluído!', 'success');
      _maybeTriggerCsat(App.boardId, lastList.id, card.id);
      return;
    }
    var cc = e.target.closest('.ticket-card');
    if (cc && !App.bulkMode) { openModal(cc.dataset.lid, cc.dataset.cid); return; }
  };

  body.onmousedown = function (e) {
    if (e.button === 2) {
      var cc = e.target.closest('.ticket-card');
      if (cc) {
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e.clientX, e.clientY, App.boardId, cc.dataset.lid, cc.dataset.cid);
      }
    }
  };
  body.oncontextmenu = function (e) {
    if (e.target.closest('.ticket-card')) e.preventDefault();
  };

  body.querySelectorAll('.kanban-col-title').forEach(function (inp) {
    inp.onblur = function () {
      if (inp.value.trim()) Store.renameList(App.boardId, inp.dataset.lid, inp.value.trim());
    };
  });

  document.getElementById('add-col-btn').onclick = function () { showAddColForm(); };

  bindDragDrop();
}

// ─── BOARD CUSTOMIZER ───────────────────────────────────────
function showBoardCustomizer(b) {
  var old = document.getElementById('board-customizer');
  if (old) { old.remove(); return; }

  var btn = document.getElementById('btn-customize-board');
  if (!btn) return;
  var rect = btn.getBoundingClientRect();

  var c = safeBg(b.background);
  var curStyle = b.bgStyle || 'tint';
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  var darkBase = '#07070f';
  var lightBase = '#eef0f6';

  var previewBg = function(styleId, color) {
    if (styleId === 'dark')     return 'background:' + (isDark ? darkBase : lightBase);
    if (styleId === 'tint')     return 'background:linear-gradient(160deg,'+hexAlpha(color,0.5)+' 0%,'+(isDark?darkBase:lightBase)+' 80%)';
    if (styleId === 'gradient') return 'background:linear-gradient(135deg,'+hexAlpha(color,0.8)+' 0%,'+hexAlpha(color,0.15)+' 100%)';
    if (styleId === 'mesh')     return 'background-image:radial-gradient(circle,'+hexAlpha(color,0.55)+' 1.5px,transparent 1.5px);background-size:8px 8px;background-color:'+(isDark?darkBase:lightBase);
    if (styleId === 'solid')    return 'background:' + color;
    return '';
  };

  var presetsHtml = BG_STYLES.map(function(s) {
    return '<div class="bg-preset' + (curStyle === s.id ? ' active' : '') + '" data-bgs="' + s.id + '">' +
      '<div class="bg-preset-thumb" style="' + previewBg(s.id, c) + '"></div>' +
      '<div class="bg-preset-label">' + s.label + '</div>' +
    '</div>';
  }).join('');

  var colorSwatches = BG_COLORS.map(function(bg) {
    var isCur = safeBg(b.background) === bg.color;
    return '<div class="color-swatch' + (isCur ? ' picked' : '') + '" data-bgc="' + bg.id + '" style="background:' + bg.color + '" title="' + bg.id + '"></div>';
  }).join('');

  var panel = document.createElement('div');
  panel.id = 'board-customizer';
  panel.className = 'board-customizer';
  panel.style.top = (rect.bottom + 8) + 'px';
  panel.style.right = (window.innerWidth - rect.right) + 'px';

  panel.innerHTML =
    '<div class="board-customizer-title">Personalizar Quadro' +
    '<button class="btn-icon" id="bc-close" style="width:22px;height:22px">' + ICONS.close + '</button></div>' +
    '<div class="board-customizer-section">Estilo do Fundo</div>' +
    '<div class="bg-presets">' + presetsHtml + '</div>' +
    '<div class="board-customizer-section">Cor do Quadro</div>' +
    '<div class="color-grid">' + colorSwatches + '</div>';

  document.body.appendChild(panel);

  document.getElementById('bc-close').onclick = function() { panel.remove(); };

  panel.querySelectorAll('[data-bgs]').forEach(function(el) {
    el.onclick = function() {
      b.bgStyle = el.dataset.bgs;
      Store.save();
      panel.remove();
      renderBoardKanban(b);
    };
  });

  panel.querySelectorAll('[data-bgc]').forEach(function(sw) {
    sw.onclick = function() {
      var bg = BG_COLORS.find(function(x) { return x.id === sw.dataset.bgc; });
      if (bg) {
        b.background = bg;
        Store.save();
        panel.remove();
        renderBoard();
      }
    };
  });

  setTimeout(function() {
    var close = function(e) {
      if (!panel.contains(e.target) && e.target.id !== 'btn-customize-board') {
        panel.remove();
        document.removeEventListener('click', close);
      }
    };
    document.addEventListener('click', close);
  }, 10);
}

function renderCardHTML(c, listId, idx, isDone, board) {
  var p = pri(c.priority);
  var b = board || Store.board(App.boardId);

  // Label chips
  var labelsHtml = '';
  if (b && Array.isArray(b.labels) && Array.isArray(c.labels) && c.labels.length > 0) {
    labelsHtml = '<div class="card-labels">';
    for (var li = 0; li < c.labels.length; li++) {
      var lbl = b.labels.find(function (x) { return x.id === c.labels[li]; });
      if (lbl) labelsHtml += '<span class="card-label-chip" style="background:' + lbl.color + '" title="' + esc(lbl.name) + '"></span>';
    }
    labelsHtml += '</div>';
  }

  // Checklist progress
  var checklistHtml = '';
  if (Array.isArray(c.checklist) && c.checklist.length > 0) {
    var doneCount = c.checklist.filter(function (x) { return x.done; }).length;
    var pct = Math.round((doneCount / c.checklist.length) * 100);
    var allDone = doneCount === c.checklist.length;
    checklistHtml = '<div class="card-checklist-progress">' +
      '<div class="card-cl-bar"><div class="card-cl-bar-fill" style="width:' + pct + '%;background:' + (allDone ? 'var(--green)' : 'var(--brand)') + '"></div></div>' +
      '<span class="card-cl-label" style="' + (allDone ? 'color:var(--green)' : '') + '">' + doneCount + '/' + c.checklist.length + '</span>' +
      '</div>';
  }

  var tags = '';
  if (c.description) tags += '<span class="card-tag">' + ICONS.desc + '</span>';
  if (c.attachments && c.attachments.length > 0) tags += '<span class="card-tag">📎 ' + c.attachments.length + '</span>';
  if (c.dueDate) {
    var dueMs = parseDate(c.dueDate).getTime();
    var nowMs  = Date.now();
    var over = dueMs < nowMs;
    var soon = !over && !isDone && (dueMs - nowMs) < 86400000; // < 24h
    var dateClass = '';
    if (isDone) {
      if (c.completedAt) {
        var cd = new Date(c.completedAt);
        var completedStr = cd.getFullYear() + '-' + String(cd.getMonth() + 1).padStart(2, '0') + '-' + String(cd.getDate()).padStart(2, '0');
        dateClass = completedStr > c.dueDate ? ' date-late' : ' date-done';
      } else {
        dateClass = ' date-done';
      }
    } else {
      dateClass = over ? ' overdue' : (soon ? ' due-soon' : '');
    }
    var dueTip = soon ? ' title="Vence em menos de 24h!"' : '';
    tags += '<span class="card-tag' + dateClass + '"' + dueTip + '>' + ICONS.calendar + ' ' + parseDate(c.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) + '</span>';
  }
  if (c.comments && c.comments.length > 0) tags += '<span class="card-tag">' + ICONS.comment + ' ' + c.comments.length + '</span>';
  var asgn = '';
  if (c.assigneeId) {
    var u = Store.user(c.assigneeId);
    if (u) asgn = '<div class="card-assignee"><div class="avatar avatar-sm" style="background:' + avatarBg(u.name) + '" title="' + esc(u.name) + '">' + initials(u.name) + '</div></div>';
  }
  var delay = Math.min(idx * 0.03, 0.15).toFixed(2);
  var slaP = getSlaProgress(c, isDone);
  var isEscalated = !isDone && !c.waitingSince && slaP.rawPct > 150;
  var isWaiting = !isDone && !!c.waitingSince;
  var classes = 'ticket-card' + (isDone ? ' done-card' : '') + (isEscalated ? ' escalated-card' : '');
  var catBadge = (!isDone && c.category) ? '<div class="card-category-badge">' + esc(c.category) + '</div>' : '';
  var bulkCb = App.bulkMode && !isDone ? '<label class="bulk-checkbox-wrap" onclick="event.stopPropagation()"><input type="checkbox" class="bulk-checkbox" data-cid="' + c.id + '"' + (App.bulkSelected.indexOf(c.id) >= 0 ? ' checked' : '') + '></label>' : '';
  var statusBadges = (isWaiting ? '<span class="card-status-badge waiting-badge">⏸ Aguardando</span>' : '') +
                     (isEscalated ? '<span class="card-status-badge escal-badge">⚡ Escalado</span>' : '') +
                     (c.csat ? '<span class="card-status-badge csat-badge" title="CSAT: ' + c.csat.rating + '/5">★ ' + c.csat.rating + '</span>' : '');
  // Priority pill in card header
  var priPill = !isDone
    ? '<span class="card-pri-pill" style="background:' + p.color + '22;color:' + p.color + ';border-color:' + p.color + '44">' + p.name + '</span>'
    : '<span class="card-pri-pill card-pri-done">Concluído</span>';
  // Hover quick-action strip (positioned absolutely, top-right corner)
  var me = Store.me();
  var isMine = me && c.assigneeId === me.id;
  var hoverStrip = !isDone && !App.bulkMode
    ? '<div class="card-hover-actions">' +
      '<button class="card-hover-btn" data-ha="open" data-cid="' + c.id + '" data-lid="' + listId + '" title="Abrir">' + ICONS.dash + '</button>' +
      '<button class="card-hover-btn' + (isMine ? ' card-hover-btn-active' : '') + '" data-ha="assign" data-cid="' + c.id + '" data-lid="' + listId + '" title="' + (isMine ? 'Remover atribuição' : 'Assumir') + '"><svg viewBox="0 0 24 24" style="width:12px;height:12px;fill:currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></button>' +
      '<button class="card-hover-btn card-hover-btn-done" data-ha="done" data-cid="' + c.id + '" data-lid="' + listId + '" title="Concluir">' + ICONS.check + '</button>' +
      '</div>'
    : '';
  return '<div class="' + classes + '" data-cid="' + c.id + '" data-lid="' + listId + '" data-idx="' + idx + '" draggable="' + (App.bulkMode ? 'false' : 'true') + '" style="animation-delay:' + delay + 's;border-left:4px solid ' + (isDone ? 'var(--border)' : p.color) + '">' +
    bulkCb +
    labelsHtml +
    '<div class="card-header-row">' +
    '<span class="card-number">#' + String(c.ticketNumber).padStart(3, '0') + '</span>' +
    priPill +
    catBadge +
    (isDone ? '<span style="color:var(--green);display:inline-flex;width:14px;height:14px;margin-left:auto">' + ICONS.check + '</span>' : '') +
    '</div>' +
    statusBadges +
    '<div class="card-title">' + esc(c.title) + '</div>' +
    checklistHtml +
    renderSlaBar(c, isDone) +
    (tags || asgn ? '<div class="card-footer">' + tags + asgn + '</div>' : '') +
    hoverStrip +
    '</div>';
}

// ─── LIST VIEW ──────────────────────────────────────────────
function renderBoardList(b) {
  var body = document.getElementById('board-body');
  if (!body) return;

  var TH = '<thead><tr><th>Ticket</th><th>Prioridade</th><th>Responsável</th><th>Vencimento</th><th style="width:36px"></th></tr></thead>';
  var html = '<div class="tasks-scroll">';
  var anyVisible = false;

  for (var i = 0; i < b.lists.length; i++) {
    var l = b.lists[i];
    var isDone = i === b.lists.length - 1;
    var filtered = applyFilter(l.cards);
    if (filtered.length === 0) continue;
    anyVisible = true;

    html += '<div class="section-heading" style="margin-top:16px;font-size:14px;color:var(--text-secondary)">' + esc(l.name) + ' · ' + filtered.length + '</div>' +
      '<table class="data-table" style="margin-bottom:24px' + (isDone ? ';opacity:0.8' : '') + '">' + TH + '<tbody>';

    for (var j = 0; j < filtered.length; j++) {
      var c = filtered[j];
      var p = pri(c.priority);
      html += '<tr data-lid="' + l.id + '" data-cid="' + c.id + '" class="dash-recent-row">' +
        '<td class="td-name">' + richTicketCell(c) + '</td>' +
        '<td><span class="badge" style="background:' + p.color + '">' + p.name + '</span></td>' +
        '<td>' + richAsgnCell(c) + '</td>' +
        '<td style="white-space:nowrap;font-size:12px">' + richDateCell(c, isDone) + '</td>' +
        '<td class="td-actions">' + richActionBtn(App.boardId, l.id, c.id) + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';
  }

  if (!anyVisible) html += emptyState('filter', 'Nenhum resultado', 'Tente limpar os filtros ou ajuste os critérios de busca.', '');
  html += '</div>';
  body.innerHTML = html;

  body.querySelectorAll('.dash-recent-row').forEach(function (tr) {
    tr.onclick = function (e) {
      if (e.target.closest('.dash-action-btn')) return;
      openModal(tr.dataset.lid, tr.dataset.cid);
    };
    tr.oncontextmenu = function (e) {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY, App.boardId, tr.dataset.lid, tr.dataset.cid);
    };
  });
  body.querySelectorAll('.dash-action-btn').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      showQuickMenu(e, App.boardId, btn.dataset.lid, btn.dataset.cid);
    };
  });
}

// ─── INLINE ADD FORMS ───────────────────────────────────────
function showAddCardForm(listId, preFillDueDate) {
  var footer = document.getElementById('footer-' + listId);
  if (!footer) return;
  var templates = Store.getSetting('templates', []);
  var tmplHtml = templates.length > 0
    ? '<select id="new-card-tmpl" class="filter-select" style="margin-bottom:6px;width:100%;font-size:12px"><option value="">📋 Usar template…</option>' +
      templates.map(function (t) { return '<option value="' + t.id + '">' + esc(t.name) + '</option>'; }).join('') + '</select>'
    : '';
  // Priority picker — dot buttons (JS-driven, no :has selector)
  var _ncPri = 'medium';
  var priPickerHtml = '<div class="inline-pri-pick" id="nc-pri-wrap">' +
    PRIORITIES.map(function (p2) {
      return '<button type="button" class="inline-pri-dot-btn' + (p2.id === 'medium' ? ' nc-pri-sel' : '') + '" ' +
        'data-pri="' + p2.id + '" title="' + p2.name + '" ' +
        'style="--pri-c:' + p2.color + '">' +
        '<span class="inline-pri-dot-circle" style="background:' + p2.color + '"></span>' +
        '<span class="inline-pri-dot-label">' + p2.name + '</span>' +
        '</button>';
    }).join('') +
    '</div>';

  footer.innerHTML =
    '<div class="inline-form nc-form">' +
    tmplHtml +
    '<div style="position:relative;">' +
    '<input type="text" id="new-card-ta" class="nc-title-input" placeholder="Título do ticket…" autocomplete="off" style="padding-right:130px;">' +
    '<button id="nc-ia-btn" type="button" title="Triagem automática com IA" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);height:26px;padding:0 10px;font-size:11px;font-weight:600;border-radius:6px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;cursor:pointer;display:flex;align-items:center;gap:4px;white-space:nowrap;">✦ Triagem IA</button>' +
    '</div>' +
    '<div id="nc-ia-card" style="display:none;"></div>' +
    '<div class="inline-form-meta">' +
    priPickerHtml +
    '<input type="date" id="new-card-due" class="inline-due-input" title="Vencimento"' + (preFillDueDate ? ' value="' + preFillDueDate + '"' : '') + '>' +
    '</div>' +
    '<div class="inline-form-actions">' +
    '<button class="btn-primary" id="new-card-ok">Adicionar</button>' +
    '<button class="btn-icon" id="new-card-cancel" title="Cancelar">' + ICONS.close + '</button>' +
    '</div>' +
    '</div>';

  var ta = document.getElementById('new-card-ta');
  ta.focus();

  // ── IA Triage button ────────────────────────────────────
  var _iaResult = null; // stores last IA suggestion
  document.getElementById('nc-ia-btn').onclick = function () {
    var titulo = ta.value.trim();
    if (!titulo) { ta.focus(); ta.classList.add('nc-input-error'); setTimeout(function () { ta.classList.remove('nc-input-error'); }, 800); return; }
    if (typeof API === 'undefined' || !Auth.isLoggedIn()) { showToast('API indisponível.', 'error'); return; }

    var btn = document.getElementById('nc-ia-btn');
    var card = document.getElementById('nc-ia-card');
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;width:10px;height:10px;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;margin-right:4px;"></span> Analisando…';
    card.style.display = 'none';

    API.ia.triar(titulo, '').then(function (r) {
      btn.disabled = false;
      btn.innerHTML = '✦ Triagem IA';
      if (!r || !r.success) { showToast('Erro na triagem IA.', 'error'); return; }
      _iaResult = r.data;

      // Map prioridade backend → frontend priority id
      var priMap = { baixa: 'low', media: 'medium', alta: 'high', critica: 'urgent' };
      var priId  = priMap[_iaResult.prioridade] || 'medium';

      // Busca artigos KB relacionados em paralelo
      var kwBusca = (_iaResult.palavras_chave || []).join(' ') || titulo;
      var kbPromise = (typeof API.kb !== 'undefined')
        ? API.kb.listar({ busca: kwBusca }).catch(function () { return null; })
        : Promise.resolve(null);

      kbPromise.then(function (kbRes) {
        var kbArtigos = (kbRes && kbRes.success && kbRes.data) ? kbRes.data.slice(0, 3) : [];
        var card2 = document.getElementById('nc-ia-card');
        if (!card2) return;

        var catColors = { 'Suporte':'#3B82F6','Manutenção':'#F97316','Solicitação':'#8B5CF6','Incidente':'#EF4444','Melhoria':'#22C55E','Acesso':'#EAB308','Outro':'#6B7280' };
        var priColors = { low:'#22C55E', medium:'#EAB308', high:'#F97316', urgent:'#EF4444' };
        var priLabels = { low:'Baixa', medium:'Média', high:'Alta', urgent:'Crítica' };
        var catCol = catColors[_iaResult.categoria] || '#6B7280';
        var priCol = priColors[priId] || '#EAB308';

        var kbHtml = '';
        if (kbArtigos.length) {
          kbHtml = '<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);">' +
            '<div style="font-size:10px;font-weight:600;color:var(--text-light);margin-bottom:4px;">📚 ARTIGOS RELACIONADOS</div>' +
            kbArtigos.map(function (a) {
              return '<div style="font-size:12px;color:var(--brand);cursor:pointer;padding:2px 0;text-decoration:underline;text-underline-offset:2px;" onclick="_kbOpenArticle(' + a.id + ')">' + esc(a.titulo) + '</div>';
            }).join('') +
            '</div>';
        }

        card2.style.display = 'block';
        card2.innerHTML =
          '<div style="margin:8px 0 4px;background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.08));border:1px solid rgba(139,92,246,0.25);border-radius:10px;padding:12px 14px;">' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">' +
          '<span style="font-size:12px;font-weight:700;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">✦ Sugestão da IA</span>' +
          '</div>' +
          '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px;font-style:italic;">"' + esc(_iaResult.resumo) + '"</div>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">' +
          '<span style="padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;background:' + catCol + '22;color:' + catCol + ';border:1px solid ' + catCol + '44;">' + esc(_iaResult.categoria) + '</span>' +
          '<span style="padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;background:' + priCol + '22;color:' + priCol + ';border:1px solid ' + priCol + '44;">⬆ ' + priLabels[priId] + '</span>' +
          '</div>' +
          kbHtml +
          '<div style="display:flex;gap:6px;margin-top:10px;">' +
          '<button id="nc-ia-accept" type="button" style="flex:1;height:28px;border-radius:6px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:12px;font-weight:600;cursor:pointer;">✓ Aplicar sugestões</button>' +
          '<button id="nc-ia-dismiss" type="button" style="height:28px;width:32px;border-radius:6px;border:1px solid var(--border);background:transparent;color:var(--text-light);cursor:pointer;font-size:14px;">×</button>' +
          '</div>' +
          '</div>';

        document.getElementById('nc-ia-accept').onclick = function () {
          // Apply priority
          _ncPri = priId;
          footer.querySelectorAll('.inline-pri-dot-btn').forEach(function (b2) {
            b2.classList.toggle('nc-pri-sel', b2.dataset.pri === priId);
          });
          // Show badge on priority picker
          var wrap = document.getElementById('nc-pri-wrap');
          if (wrap && !wrap.querySelector('.ia-badge')) {
            var badge = document.createElement('span');
            badge.className = 'ia-badge';
            badge.style.cssText = 'font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;margin-left:4px;';
            badge.textContent = 'IA';
            wrap.appendChild(badge);
          }
          card2.style.display = 'none';
          showToast('Prioridade "' + priLabels[priId] + '" e categoria "' + _iaResult.categoria + '" aplicadas!', 'success');
        };
        document.getElementById('nc-ia-dismiss').onclick = function () { card2.style.display = 'none'; };
      });
    }).catch(function () {
      btn.disabled = false;
      btn.innerHTML = '✦ Triagem IA';
      showToast('Erro ao conectar à IA.', 'error');
    });
  };
  // ── end IA Triage ───────────────────────────────────────

  // ── KB suggestion dropdown ──────────────────────────────
  var _kbSugTimer = null;
  ta.oninput = function() {
    clearTimeout(_kbSugTimer);
    var words = (ta.value || '').trim().split(/\s+/).filter(Boolean);
    var drop = document.getElementById('kb-suggest-drop');
    if (drop) drop.remove();
    if (words.length < 3 || typeof API === 'undefined' || !Auth.isLoggedIn()) return;
    _kbSugTimer = setTimeout(function() {
      API.kb.listar({ busca: words.join(' ') }).then(function(r) {
        var existingDrop = document.getElementById('kb-suggest-drop');
        if (existingDrop) existingDrop.remove();
        if (!r || !r.success || !r.data.length) return;
        var items = r.data.slice(0, 3);
        var dropEl = document.createElement('div');
        dropEl.id = 'kb-suggest-drop';
        dropEl.style.cssText = 'position:absolute;z-index:200;background:var(--surface);border:1px solid var(--border);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.2);overflow:hidden;margin-top:4px;min-width:280px;';
        dropEl.innerHTML =
          '<div style="padding:6px 12px;font-size:11px;font-weight:600;color:var(--text-light);border-bottom:1px solid var(--border);">📚 Artigos relacionados</div>' +
          items.map(function(a) {
            return '<div class="kb-sug-row" data-kbid="' + a.id + '" style="padding:8px 12px;cursor:pointer;font-size:13px;color:var(--text);border-bottom:1px solid var(--border);transition:background 0.15s;" onmouseover="this.style.background=\'var(--border)\'" onmouseout="this.style.background=\'\'">' +
              esc(a.titulo) + (a.categoria ? '<span style="margin-left:8px;font-size:10px;color:var(--text-light);">' + esc(a.categoria) + '</span>' : '') +
              '</div>';
          }).join('');
        var taParent = ta.parentNode;
        if (taParent) {
          taParent.style.position = 'relative';
          taParent.appendChild(dropEl);
        }
        dropEl.querySelectorAll('.kb-sug-row').forEach(function(row) {
          row.onclick = function() {
            var kbId = parseInt(row.dataset.kbid, 10);
            if (kbId) _kbOpenArticle(kbId);
          };
        });
      }).catch(function() {});
    }, 350);
  };

  // Remove suggestion dropdown on Escape or blur
  ta.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var drop = document.getElementById('kb-suggest-drop');
      if (drop) drop.remove();
    }
  });
  ta.addEventListener('blur', function() {
    setTimeout(function() {
      var drop = document.getElementById('kb-suggest-drop');
      if (drop) drop.remove();
    }, 200);
  });
  // ── end KB suggestion ───────────────────────────────────

  // JS-driven priority selection
  footer.querySelectorAll('.inline-pri-dot-btn').forEach(function (btn) {
    btn.onclick = function (e) {
      e.stopPropagation();
      footer.querySelectorAll('.inline-pri-dot-btn').forEach(function (b2) { b2.classList.remove('nc-pri-sel'); });
      btn.classList.add('nc-pri-sel');
      _ncPri = btn.dataset.pri;
    };
  });

  var tmplSel = document.getElementById('new-card-tmpl');
  if (tmplSel) {
    tmplSel.onchange = function () {
      var tmpl = templates.find(function (t) { return t.id === tmplSel.value; });
      if (tmpl) {
        ta.value = tmpl.title || '';
        if (tmpl.priority) {
          _ncPri = tmpl.priority;
          footer.querySelectorAll('.inline-pri-dot-btn').forEach(function (b2) {
            b2.classList.toggle('nc-pri-sel', b2.dataset.pri === tmpl.priority);
          });
        }
        ta.focus();
      }
    };
  }

  document.getElementById('new-card-ok').onclick = function () {
    var title = ta.value.trim();
    if (!title) { ta.focus(); ta.classList.add('nc-input-error'); setTimeout(function () { ta.classList.remove('nc-input-error'); }, 800); return; }
    var card = Store.addCard(App.boardId, listId, title);
    if (card) {
      card.priority = _ncPri;
      var dueVal = document.getElementById('new-card-due').value;
      if (dueVal) card.dueDate = dueVal;
      if (tmplSel && tmplSel.value) {
        var tmpl = templates.find(function (t) { return t.id === tmplSel.value; });
        if (tmpl) {
          if (tmpl.description) card.description = tmpl.description;
          if (tmpl.category)    card.category    = tmpl.category;
        }
      }
      Store.save();
    }
    renderBoard();
  };
  document.getElementById('new-card-cancel').onclick = function () { renderBoard(); };
  ta.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('new-card-ok').click(); } if (e.key === 'Escape') renderBoard(); };
}

function showAddColForm() {
  var ph = document.getElementById('add-col-ph');
  if (!ph) return;
  ph.innerHTML =
    '<div class="col-add-form">' +
    '<div class="inline-form">' +
    '<input type="text" id="new-col-in" placeholder="Nome da coluna...">' +
    '<div class="inline-form-actions">' +
    '<button class="btn-primary" id="new-col-ok">Adicionar</button>' +
    '<button class="btn-icon" id="new-col-cancel">' + ICONS.close + '</button>' +
    '</div>' +
    '</div>' +
    '</div>';
  var inp = document.getElementById('new-col-in');
  inp.focus();
  document.getElementById('new-col-ok').onclick = function () {
    if (inp.value.trim()) { Store.addList(App.boardId, inp.value.trim()); renderBoard(); }
  };
  document.getElementById('new-col-cancel').onclick = function () { renderBoard(); };
  inp.onkeydown = function (e) { if (e.key === 'Enter') document.getElementById('new-col-ok').click(); };
}

// ─── DRAG & DROP ────────────────────────────────────────────
function bindDragDrop() {
  var container = document.querySelector('.kanban-scroll');
  if (!container) return;

  container.querySelectorAll('.ticket-card').forEach(function (card) {
    card.ondragstart = function (e) {
      App.dragData = { id: card.dataset.cid, list: card.dataset.lid, idx: parseInt(card.dataset.idx) };
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.dataset.cid);
      e.stopPropagation();
    };
    card.ondragend = function () {
      card.classList.remove('dragging');
      App.dragData = null;
      container.querySelectorAll('.kanban-col-cards').forEach(function (z) { z.classList.remove('drag-over'); });
    };
  });

  container.querySelectorAll('.kanban-col-cards').forEach(function (zone) {
    zone.ondragover = function (e) {
      if (App.dragData) { e.preventDefault(); zone.classList.add('drag-over'); }
    };
    zone.ondragleave = function (e) {
      if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    };
    zone.ondrop = function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!App.dragData) return;
      var fromList = App.dragData.list;
      var fromIdx = App.dragData.idx;
      var toList = zone.dataset.lid;
      var toIdx = 0;
      var cards = zone.querySelectorAll('.ticket-card:not(.dragging)');
      for (var i = 0; i < cards.length; i++) {
        if (e.clientY > cards[i].getBoundingClientRect().top + cards[i].offsetHeight / 2) toIdx = i + 1;
      }
      if (fromList === toList && fromIdx < toIdx) toIdx--;
      Store.moveCard(App.boardId, fromList, toList, fromIdx, toIdx);
      renderBoard();
    };
  });

  // Touch drag support
  var _touchCard = null, _touchClone = null, _touchData = null;
  container.querySelectorAll('.ticket-card').forEach(function (card) {
    card.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      var t = e.touches[0];
      _touchData = { id: card.dataset.cid, list: card.dataset.lid, idx: parseInt(card.dataset.idx) };
      _touchCard = card;
      card.classList.add('touch-dragging');
      _touchClone = card.cloneNode(true);
      _touchClone.style.cssText = 'position:fixed;z-index:9999;opacity:0.85;pointer-events:none;width:' + card.offsetWidth + 'px;top:' + (t.clientY - card.offsetHeight/2) + 'px;left:' + t.clientX + 'px;transform:rotate(2deg)';
      document.body.appendChild(_touchClone);
    }, { passive: true });

    card.addEventListener('touchmove', function (e) {
      if (!_touchData || !_touchClone) return;
      e.preventDefault();
      var t = e.touches[0];
      _touchClone.style.top = (t.clientY - _touchCard.offsetHeight/2) + 'px';
      _touchClone.style.left = (t.clientX - _touchCard.offsetWidth/2) + 'px';
      container.querySelectorAll('.kanban-col-cards').forEach(function (z) { z.classList.remove('touch-drag-over'); });
      var el = document.elementFromPoint(t.clientX, t.clientY);
      var zone = el ? el.closest('.kanban-col-cards') : null;
      if (zone) zone.classList.add('touch-drag-over');
    }, { passive: false });

    card.addEventListener('touchend', function (e) {
      if (!_touchData) return;
      if (_touchClone) _touchClone.remove();
      if (_touchCard) _touchCard.classList.remove('touch-dragging');
      container.querySelectorAll('.kanban-col-cards').forEach(function (z) { z.classList.remove('touch-drag-over'); });
      var t = e.changedTouches[0];
      var el = document.elementFromPoint(t.clientX, t.clientY);
      var zone = el ? el.closest('.kanban-col-cards') : null;
      if (zone) {
        var toList = zone.dataset.lid;
        var toIdx = 0;
        var cards = zone.querySelectorAll('.ticket-card');
        for (var i = 0; i < cards.length; i++) {
          if (t.clientY > cards[i].getBoundingClientRect().top + cards[i].offsetHeight/2) toIdx = i + 1;
        }
        var fromList = _touchData.list, fromIdx = _touchData.idx;
        if (fromList === toList && fromIdx < toIdx) toIdx--;
        Store.moveCard(App.boardId, fromList, toList, fromIdx, toIdx);
        renderBoard();
      }
      _touchCard = null; _touchClone = null; _touchData = null;
    });
  });
}

// ============================================================
// CREATE BOARD POPUP
// ============================================================
function showCreateBoard() {
  var overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'popup-overlay';

  var selectedBg = 'blue';
  var swatches = BG_COLORS.map(function (bg) {
    return '<div class="color-swatch' + (bg.id === 'blue' ? ' picked' : '') + '" data-bg="' + bg.id + '" style="background:' + bg.color + '"></div>';
  }).join('');
  var deptOpts = getDepts().map(function (d) {
    return '<option value="' + d.id + '">' + d.icon + ' ' + d.name + '</option>';
  }).join('');

  overlay.innerHTML =
    '<div class="popup-box">' +
    '<h3>Criar Novo Quadro</h3>' +
    '<div class="field-block"><div class="field-label">Cor</div><div class="color-grid">' + swatches + '</div></div>' +
    '<div class="field-block"><div class="field-label">Nome do Quadro</div><input class="form-input" type="text" id="cb-name" style="width:100%;margin-top:4px"></div>' +
    '<div class="field-block"><div class="field-label">Setor</div><select class="form-select" id="cb-dept" style="width:100%;margin-top:4px">' + deptOpts + '</select></div>' +
    '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">' +
    '<button class="btn-secondary" id="cb-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="cb-create">Criar Quadro</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  setTimeout(function () { document.getElementById('cb-name').focus(); }, 50);

  overlay.querySelectorAll('.color-swatch').forEach(function (sw) {
    sw.onclick = function () {
      overlay.querySelectorAll('.color-swatch').forEach(function (s) { s.classList.remove('picked'); });
      sw.classList.add('picked');
      selectedBg = sw.dataset.bg;
    };
  });
  document.getElementById('cb-cancel').onclick = function () { overlay.remove(); };
  document.getElementById('cb-create').onclick = function () {
    var name = document.getElementById('cb-name').value.trim();
    if (!name) return;
    var board = Store.createBoard(name, document.getElementById('cb-dept').value, selectedBg);
    overlay.remove();
    goBoard(board.id);
  };
  overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
}

// ============================================================
// TICKET MODAL
// ============================================================
var _modalCtx = null; // { boardId, listId, cardId }

function openModal(listId, cardId) {
  var found = Store.findCard(cardId);
  if (!found) return;
  _modalCtx = { boardId: found.boardId, listId: found.listId, cardId: cardId };
  var c = found.card;
  if (!c.attachments) c.attachments = [];

  var p = pri(c.priority);
  var req = Store.user(c.requesterId);
  var b = Store.board(found.boardId);
  var l = b ? b.lists.find(function (x) { return x.id === found.listId; }) : null;
  var me = Store.me();

  var userOpts = '<option value="">Não atribuído</option>' + Store.allUsers().map(function (u) { return '<option value="' + u.id + '"' + (c.assigneeId === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>'; }).join('');
  var priOpts = PRIORITIES.map(function (p2) { return '<option value="' + p2.id + '"' + (c.priority === p2.id ? ' selected' : '') + '>' + p2.name + '</option>'; }).join('');
  var catOpts = getCats().map(function (cat) { return '<option value="' + cat + '"' + (c.category === cat ? ' selected' : '') + '>' + cat + '</option>'; }).join('');
  var recOpts = RECURRENCE.map(function (r) { return '<option value="' + r.id + '"' + (c.recurrence === r.id ? ' selected' : '') + '>' + r.name + '</option>'; }).join('');
  var listOpts = b ? b.lists.map(function (lst) { return '<option value="' + lst.id + '"' + (lst.id === found.listId ? ' selected' : '') + '>' + esc(lst.name) + '</option>'; }).join('') : '';

  var comments = c.comments || [];
  var commentsHTML = '';
  for (var i = 0; i < comments.length; i++) {
    var cm = comments[i];
    var au = Store.user(cm.authorId);
    var isMyComment = me && au && me.id === au.id;
    var delBtnHTML = isMyComment ? '<button class="btn-icon delete-comment-btn" data-cmid="' + cm.id + '" style="width:20px;height:20px;color:var(--red);opacity:0.6">' + ICONS.trash + '</button>' : '';
    commentsHTML += '<div class="comment-bubble">' +
      '<div class="avatar" style="background:' + avatarBg(au ? au.name : '') + ';width:32px;height:32px;font-size:12px">' + initials(au ? au.name : '') + '</div>' +
      '<div class="comment-bubble-content"><div class="comment-bubble-header">' +
      '<span class="comment-author">' + esc(au ? au.name : 'Usuário') + '</span>' +
      '<div style="display:flex;align-items:center;gap:6px"><span class="comment-time">' + new Date(cm.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '</span>' + delBtnHTML + '</div>' +
      '</div><div class="comment-text">' + esc(cm.text) + '</div></div></div>';
  }

  // Labels section HTML
  var boardLabels = b ? (b.labels || []) : [];
  var cardLabelIds = c.labels || [];
  var labelsChipsHtml = '';
  for (var li = 0; li < boardLabels.length; li++) {
    var lbl = boardLabels[li];
    var isActive = cardLabelIds.indexOf(lbl.id) >= 0;
    labelsChipsHtml += '<span class="label-chip' + (isActive ? ' active' : '') + '" data-lid="' + lbl.id + '" style="background:' + lbl.color + ';opacity:' + (isActive ? '1' : '0.35') + '">' + esc(lbl.name) + '</span>';
  }

  // Checklist HTML
  var checklist = c.checklist || [];
  var clDone = checklist.filter(function (x) { return x.done; }).length;
  var clPct = checklist.length > 0 ? Math.round((clDone / checklist.length) * 100) : 0;
  var clProgressHtml = checklist.length > 0
    ? '<div class="modal-cl-progress"><span class="modal-cl-pct">' + clPct + '%</span><div class="modal-cl-bar"><div class="modal-cl-bar-fill" style="width:' + clPct + '%;background:' + (clPct === 100 ? 'var(--green)' : 'var(--brand)') + '"></div></div></div>'
    : '';
  var clItemsHtml = '';
  for (var ci2 = 0; ci2 < checklist.length; ci2++) {
    var item = checklist[ci2];
    clItemsHtml += '<div class="cl-item" data-iid="' + item.id + '">' +
      '<label class="cl-checkbox"><input type="checkbox" class="cl-check" data-iid="' + item.id + '"' + (item.done ? ' checked' : '') + '>' +
      '<span class="cl-item-text' + (item.done ? ' done' : '') + '">' + esc(item.text) + '</span></label>' +
      '<button class="cl-del-btn" data-iid="' + item.id + '">' + ICONS.trash + '</button></div>';
  }

  // Activity HTML
  var activity = c.activity || [];
  var actHtml = '';
  for (var ai = 0; ai < activity.length; ai++) {
    var act = activity[ai];
    var actUser = Store.user(act.userId);
    actHtml += '<div class="activity-row">' +
      '<div class="activity-avatar"><div class="avatar" style="background:' + avatarBg(actUser ? actUser.name : '') + ';width:26px;height:26px;font-size:10px">' + initials(actUser ? actUser.name : '') + '</div></div>' +
      '<div class="activity-body"><span class="activity-who">' + esc(actUser ? actUser.name : 'Sistema') + '</span> ' + esc(act.action) +
      (act.detail ? ' <span class="activity-detail">' + esc(act.detail) + '</span>' : '') +
      '<div class="activity-time">' + fmtRel(act.createdAt) + '</div></div></div>';
  }

  var createdDate = c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

  // Linked tickets HTML
  var linkedTickets = Array.isArray(c.linkedTickets) ? c.linkedTickets : [];
  var linkedTypeName = { 'related': 'Relacionado', 'blocks': 'Bloqueia', 'blocked-by': 'Bloqueado por', 'duplicate': 'Duplicata' };
  var linkedHtml = linkedTickets.length === 0 ? '<span style="font-size:12px;color:var(--text-light)">Nenhum ticket vinculado.</span>' : '';
  for (var lti = 0; lti < linkedTickets.length; lti++) {
    var lnk = linkedTickets[lti];
    var lnkFound = Store.findCard(lnk.ticketId);
    var lnkCard = lnkFound ? lnkFound.card : null;
    if (!lnkCard) continue;
    linkedHtml += '<div class="linked-ticket-row" data-ltid="' + lnk.ticketId + '">' +
      '<span class="linked-type-badge">' + (linkedTypeName[lnk.type] || lnk.type) + '</span>' +
      '<span class="linked-ticket-num">#' + String(lnkCard.ticketNumber).padStart(3, '0') + '</span> ' +
      '<span class="linked-ticket-title">' + esc(lnkCard.title) + '</span>' +
      '<button class="btn-icon linked-unlink-btn" data-ltid="' + lnk.ticketId + '" style="margin-left:auto;color:var(--red);width:20px;height:20px" title="Desvincular">' + ICONS.close + '</button>' +
      '</div>';
  }

  // CSAT HTML for side panel
  var isDoneCard = l && b && b.lists[b.lists.length - 1].id === l.id;
  var csatHtml = '';
  if (isDoneCard) {
    if (c.csat) {
      csatHtml = '<div class="modal-side-section"><div class="modal-side-section-title">Satisfação (CSAT)</div>' +
        '<div class="csat-display">' +
        [1,2,3,4,5].map(function(n){ return '<span class="csat-star-display' + (n <= c.csat.rating ? ' filled' : '') + '">★</span>'; }).join('') +
        ' <span style="font-size:12px;color:var(--text-secondary)">' + c.csat.rating + '/5</span>' +
        (c.csat.comment ? '<div style="font-size:12px;color:var(--text-secondary);margin-top:4px;font-style:italic">"' + esc(c.csat.comment) + '"</div>' : '') +
        '</div></div>';
    } else {
      csatHtml = '<div class="modal-side-section"><div class="modal-side-section-title">Satisfação (CSAT)</div>' +
        '<div style="font-size:12px;color:var(--text-light)">Sem avaliação do solicitante.</div>' +
        '<button class="btn-secondary" id="m-csat-now" style="margin-top:8px;width:100%;font-size:12px;height:30px">★ Avaliar agora</button>' +
        '</div>';
    }
  }

  // Pre-computed SLA side panel HTML
  var _sla = getSlaProgress(c, isDoneCard);
  var _slaColor = _sla.expired ? 'var(--red)' : (c.waitingSince ? '#6B7280' : 'var(--text-secondary)');
  var _pauseLbl = c.waitingSince ? '▶ Retomar SLA' : '⏸ Pausar SLA';
  var slaSideHtml = '<div style="font-size:12px;color:' + _slaColor + ';margin-bottom:4px">' + _sla.label + '</div>' +
    '<div class="sla-modal-bar"><div class="sla-modal-fill" style="width:' + _sla.pct + '%;background:' + _sla.color + '"></div></div>' +
    (isDoneCard ? '' : '<button class="btn-secondary" id="m-sla-toggle" style="margin-top:6px;width:100%;font-size:11px;height:26px">' + _pauseLbl + '</button>');

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML =
    '<div class="modal-box">' +

    '<div class="modal-banner" style="background:' + p.color + '">' +
    '<div class="modal-banner-left">' +
    '<span class="modal-banner-id">TICKET #' + String(c.ticketNumber).padStart(3, '0') + '</span>' +
    (b ? '<span class="modal-banner-board">' + esc(b.name) + '</span>' : '') +
    '</div>' +
    '<div class="modal-banner-right">' +
    '<span class="m-save-indicator" id="m-save-indicator"></span>' +
    '<span class="modal-banner-status">' + esc(l ? l.name : '') + '</span>' +
    '</div>' +
    '<button class="modal-close" id="modal-close">' + ICONS.close + '</button>' +
    '</div>' +

    '<div class="modal-body">' +
    '<div class="modal-main">' +
    '<input type="text" class="modal-title-input" id="m-title" value="' + esc(c.title) + '">' +
    '<div class="modal-info-row">' +
    '<div class="avatar" style="background:' + avatarBg(req ? req.name : '') + ';width:22px;height:22px;font-size:9px;flex-shrink:0">' + initials(req ? req.name : '') + '</div>' +
    'Criado por <strong style="margin:0 4px">' + esc(req ? req.name : 'Usuário') + '</strong>' +
    (createdDate ? ' · <span style="color:var(--text-light)">' + createdDate + '</span>' : '') +
    '</div>' +

    '<div class="modal-section"><div class="modal-section-title" style="display:flex;justify-content:space-between;align-items:center">' + ICONS.desc + ' Descrição' +
    '<div style="display:flex;gap:6px">' +
    '<button class="btn-secondary" id="m-desc-preview-toggle" style="padding:0 10px;height:28px;font-size:12px" title="Pré-visualizar descrição">👁 Preview</button>' +
    '<button class="btn-secondary" id="m-ai-triage" style="padding:0 10px;height:28px;font-size:12px">✨ Triagem IA</button>' +
    '</div></div>' +
    '<textarea class="modal-textarea" id="m-desc" placeholder="Descreva os detalhes da solicitação...">' + esc(c.description) + '</textarea>' +
    '<div class="m-desc-preview-panel" id="m-desc-preview" style="display:none"></div>' +
    '</div>' +

    '<div class="modal-section">' +
    '<div class="modal-section-title" style="display:flex;justify-content:space-between;align-items:center">' +
    ICONS.label + ' Etiquetas' +
    '<button class="btn-secondary" id="m-manage-labels" style="padding:0 10px;height:28px;font-size:12px">' + ICONS.plus + ' Gerenciar</button></div>' +
    '<div class="label-chips-row" id="m-label-chips">' +
    (labelsChipsHtml || '<span style="font-size:12px;color:var(--text-light)">Nenhuma etiqueta no quadro ainda</span>') +
    '</div></div>' +

    '<div class="modal-section">' +
    '<div class="modal-section-title">' + ICONS.checkSquare + ' Checklist' +
    (checklist.length > 0 ? ' <span class="badge-count">' + clDone + '/' + checklist.length + '</span>' : '') + '</div>' +
    clProgressHtml +
    '<div id="m-checklist-items">' + clItemsHtml + '</div>' +
    '<div class="cl-add-row"><input class="cl-add-input" id="m-cl-input" placeholder="Adicionar item…"><button class="btn-primary" id="m-cl-add" style="padding:0 12px;height:34px">Adicionar</button></div>' +
    '</div>' +

    '<div class="modal-section">' +
    '<div class="modal-section-title">📎 Anexos' + (c.attachments.length > 0 ? ' <span class="badge-count">' + c.attachments.length + '</span>' : '') + '</div>' +
    '<div class="attach-zone" id="ticket-attach-zone">Clique, solte arquivos aqui ou cole (CTRL+V)</div>' +
    '<div class="attach-list" id="ticket-attach-list"></div>' +
    '</div>' +

    '<div class="modal-section"><div class="modal-section-title">' + ICONS.comment + ' Comentários' + (comments.length > 0 ? ' <span class="badge-count">' + comments.length + '</span>' : '') + '</div>' +
    '<div class="comments-list" id="m-comments">' + commentsHTML + '</div>' +
    '<div class="comment-input-row">' +
    '<div class="avatar" style="background:' + avatarBg(me ? me.name : '') + '">' + initials(me ? me.name : '') + '</div>' +
    '<div class="comment-input-box"><textarea id="m-new-comment" placeholder="Escreva um comentário… (Ctrl+Enter para enviar)"></textarea>' +
    '<div class="comment-send"><button class="btn-primary" id="m-send-comment">' + ICONS.send + ' Enviar</button></div>' +
    '</div></div></div>' +

    '<div class="modal-section">' +
    '<div class="modal-section-title" style="display:flex;justify-content:space-between;align-items:center">🔗 Tickets Relacionados' +
    '<button class="btn-secondary" id="m-link-add" style="padding:0 10px;height:28px;font-size:12px">' + ICONS.plus + ' Vincular</button></div>' +
    '<div id="m-linked-list">' + linkedHtml + '</div>' +
    '</div>' +

    (activity.length > 0 ?
      '<div class="modal-section"><div class="modal-section-title">' + ICONS.activity + ' Atividade</div>' +
      '<div class="activity-list" id="m-activity">' + actHtml + '</div></div>'
      : '') +
    '</div>' +

    '<div class="modal-side">' +
    '<div class="modal-side-section"><div class="modal-side-section-title">Propriedades</div>' +
    '<div class="field-block"><div class="field-label">Status</div><select class="field-select" id="m-list">' + listOpts + '</select></div>' +
    '<div class="field-block"><div class="field-label">Responsável</div><select class="field-select" id="m-assignee">' + userOpts + '</select></div>' +
    '<div class="field-block"><div class="field-label">Categoria</div><select class="field-select" id="m-cat">' + catOpts + '</select></div>' +
    '<div class="field-block"><div class="field-label">Prioridade</div>' +
    '<div class="field-priority-row"><span class="priority-dot" id="m-pri-dot" style="background:' + p.color + '"></span>' +
    '<select class="field-select" id="m-pri" style="flex:1">' + priOpts + '</select></div></div>' +
    '</div>' +

    '<div class="modal-side-section"><div class="modal-side-section-title">SLA & Prazo</div>' +
    '<div class="field-block"><div class="field-label">SLA</div>' + slaSideHtml + '</div>' +
    '<div class="field-block"><div class="field-label">Vencimento</div><input type="date" class="field-date" id="m-due" value="' + (c.dueDate || '') + '"></div>' +
    '</div>' +

    '<div class="modal-side-section"><div class="modal-side-section-title">Tempo</div>' +
    // Estimate vs tracked visual comparison
    (function () {
      var estH = parseFloat(c.estimate) || 0;
      var trackedH = Math.round(((c.trackedMs || 0) / 3600000) * 10) / 10;
      var estPct = estH > 0 ? Math.min(Math.round((trackedH / estH) * 100), 100) : 0;
      var overBudget = estH > 0 && trackedH > estH;
      var timeBarHtml = estH > 0
        ? '<div class="time-budget-bar"><div class="time-budget-fill" style="width:' + estPct + '%;background:' + (overBudget ? 'var(--red)' : 'var(--green)') + '"></div></div>' +
          '<div class="time-budget-label">' + trackedH + 'h gasto de ' + estH + 'h estimado' + (overBudget ? ' <span style="color:var(--red)">⚠ +' + Math.round((trackedH - estH) * 10) / 10 + 'h</span>' : '') + '</div>'
        : '';
      return '<div class="field-block"><div class="field-label">Estimativa (h)</div><input type="number" class="field-date" id="m-est" value="' + (c.estimate || '') + '" placeholder="Ex: 2" min="0" step="0.5"></div>' +
        '<div class="field-block"><div class="field-label">Tempo Gasto</div>' +
        '<div class="time-tracker-row"><div class="time-tracker-display" id="m-time-display">' + (c.trackedMs ? formatTrackedTime(c.trackedMs) : '0h 00m') + '</div>' +
        '<div style="display:flex;gap:4px">' +
        '<button class="btn-secondary" id="m-timer-start" style="flex:1;font-size:11px;height:28px;padding:0">▶</button>' +
        '<button class="btn-secondary" id="m-timer-stop" style="flex:1;font-size:11px;height:28px;padding:0" disabled>⏹</button>' +
        '</div></div>' +
        timeBarHtml + '</div>';
    })() +
    '<div class="field-block"><div class="field-label">Recorrência</div><select class="field-select" id="m-rec">' + recOpts + '</select></div>' +
    '</div>' +

    csatHtml +

    (req ? '<div class="modal-side-section"><div class="modal-side-section-title">Solicitante</div>' +
    '<div class="requester-info"><div class="avatar" style="background:' + avatarBg(req.name) + ';width:32px;height:32px;font-size:13px;flex-shrink:0">' + initials(req.name) + '</div>' +
    '<div><div style="font-size:13px;font-weight:600;color:var(--text)">' + esc(req.name) + '</div>' +
    (createdDate ? '<div style="font-size:11px;color:var(--text-light)">' + createdDate + '</div>' : '') +
    '</div></div></div>' : '') +

    '<hr class="modal-divider">' +
    '<div style="display:flex;gap:8px">' +
    '<button class="btn-secondary" id="m-clone" style="flex:1;justify-content:center">' + ICONS.desc + ' Clonar</button>' +
    '<button class="btn-secondary btn-danger" id="m-delete" style="flex:1;justify-content:center">' + ICONS.trash + ' Excluir</button>' +
    '</div>' +
    '</div>' +
    '</div></div>';

  document.body.appendChild(overlay);

  AttachmentManager.bind('ticket-attach-zone', 'ticket-attach-list', c.attachments, function () {
    Store.save();
  });

  // Label chip toggles
  document.getElementById('m-label-chips').onclick = function (e) {
    var chip = e.target.closest('.label-chip');
    if (!chip) return;
    Store.toggleCardLabel(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, chip.dataset.lid);
    refreshModal();
  };
  document.getElementById('m-manage-labels').onclick = function () { showAddLabelPopup(); };

  // SLA Pause / Resume
  var slaTgl = document.getElementById('m-sla-toggle');
  if (slaTgl) {
    slaTgl.onclick = function () {
      var card2 = Store.card(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId);
      if (!card2) return;
      if (card2.waitingSince) { Store.resumeSla(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId); showToast('SLA retomado!', 'success'); }
      else { Store.pauseSla(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId); showToast('SLA pausado.', 'info'); }
      refreshModal();
    };
  }

  // CSAT "Avaliar agora"
  var csatNowBtn = document.getElementById('m-csat-now');
  if (csatNowBtn) {
    csatNowBtn.onclick = function () { showCsatModal(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId); };
  }

  // Linked tickets
  document.getElementById('m-link-add').onclick = function () { showLinkTicketModal(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId); };
  var linkedList = document.getElementById('m-linked-list');
  if (linkedList) {
    linkedList.onclick = function (e) {
      var unlinkBtn = e.target.closest('.linked-unlink-btn');
      if (!unlinkBtn) return;
      var ltid = unlinkBtn.dataset.ltid;
      var card3 = Store.card(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId);
      if (!card3) return;
      card3.linkedTickets = (card3.linkedTickets || []).filter(function (x) { return x.ticketId !== ltid; });
      Store.save();
      refreshModal();
    };
    linkedList.querySelectorAll('.linked-ticket-row').forEach(function (row) {
      row.style.cursor = 'pointer';
      row.onclick = function (e) {
        if (e.target.closest('.linked-unlink-btn')) return;
        saveAndCloseModal(true);
        var lf = Store.findCard(row.dataset.ltid);
        if (lf) openModal(lf.listId, lf.card.id);
      };
    });
  }

  // AI Triage
  document.getElementById('m-ai-triage').onclick = function () {
    var title = document.getElementById('m-title').value;
    var desc = document.getElementById('m-desc').value;
    var suggestion = AiTriage.suggest(title, desc);
    AiTriage.showToast(suggestion, function (s) {
      document.getElementById('m-pri').value = s.priority;
      var selPri = PRIORITIES.find(function (px) { return px.id === s.priority; });
      var dot = document.getElementById('m-pri-dot');
      if (dot && selPri) dot.style.background = selPri.color;
      document.getElementById('m-cat').value = s.category;
      showToast('Triagem aplicada!', 'success');
    });
  };

  // Time Tracker
  var _timerInterval = null;
  var _timerStart = null;
  var _timerAccum = c.trackedMs || 0;
  var timerDisplay = document.getElementById('m-time-display');
  var startBtn = document.getElementById('m-timer-start');
  var stopBtn = document.getElementById('m-timer-stop');

  if (startBtn) {
    startBtn.onclick = function () {
      _timerStart = Date.now();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      _timerInterval = setInterval(function () {
        var elapsed = _timerAccum + (Date.now() - _timerStart);
        if (timerDisplay) timerDisplay.textContent = formatTrackedTime(elapsed);
      }, 1000);
    };
  }
  if (stopBtn) {
    stopBtn.onclick = function () {
      if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
      if (_timerStart) {
        _timerAccum += Date.now() - _timerStart;
        _timerStart = null;
      }
      startBtn.disabled = false;
      stopBtn.disabled = true;
      Store.updateCard(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, { trackedMs: _timerAccum });
      if (timerDisplay) timerDisplay.textContent = formatTrackedTime(_timerAccum);
    };
  }

  overlay.addEventListener('remove-cleanup', function () {
    if (_timerInterval) {
      clearInterval(_timerInterval);
      if (_timerStart) _timerAccum += Date.now() - _timerStart;
      Store.updateCard(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, { trackedMs: _timerAccum });
    }
  });

  // Checklist handlers
  document.getElementById('m-cl-add').onclick = function () {
    var inp = document.getElementById('m-cl-input');
    if (!inp.value.trim()) return;
    Store.addChecklistItem(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, inp.value.trim());
    Store.addActivity(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, 'adicionou item ao checklist', '"' + inp.value.trim() + '"');
    refreshModal();
  };
  document.getElementById('m-cl-input').onkeydown = function (e) {
    if (e.key === 'Enter') document.getElementById('m-cl-add').click();
  };
  document.getElementById('m-checklist-items').onclick = function (e) {
    var delBtn = e.target.closest('.cl-del-btn');
    if (delBtn) {
      Store.deleteChecklistItem(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, delBtn.dataset.iid);
      refreshModal();
      return;
    }
    var chk = e.target.closest('.cl-check');
    if (chk) {
      Store.toggleChecklist(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, chk.dataset.iid);
      refreshModal();
    }
  };

  // ── Autosave: debounced save on title/description change ──
  var _modalDirty = false;
  var _modalAutoSave = _debounce(function () {
    var titleEl = document.getElementById('m-title');
    var descEl  = document.getElementById('m-desc');
    if (!titleEl || !descEl || !_modalCtx) return;
    Store.updateCard(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, {
      title: titleEl.value.trim() || c.title,
      description: descEl.value
    });
    _modalDirty = false;
    var ind = document.getElementById('m-save-indicator');
    if (ind) { ind.textContent = '✓ Salvo'; ind.className = 'm-save-indicator saved'; setTimeout(function () { if (ind) ind.textContent = ''; }, 2000); }
  }, 800);

  function _markDirty() {
    _modalDirty = true;
    var ind = document.getElementById('m-save-indicator');
    if (ind) { ind.textContent = 'Editando…'; ind.className = 'm-save-indicator editing'; }
    _modalAutoSave();
  }
  var titleInp = document.getElementById('m-title');
  var descTa   = document.getElementById('m-desc');
  if (titleInp) titleInp.oninput = _markDirty;
  if (descTa)   descTa.oninput   = _markDirty;

  // ── Description preview toggle ──
  var descPreviewToggle = document.getElementById('m-desc-preview-toggle');
  var descPreviewPanel  = document.getElementById('m-desc-preview');
  var _descPreviewOpen  = false;
  if (descPreviewToggle && descPreviewPanel && descTa) {
    descPreviewToggle.onclick = function () {
      _descPreviewOpen = !_descPreviewOpen;
      if (_descPreviewOpen) {
        var raw = descTa.value;
        // Simple markdown-like renderer: bold, italic, code, bullets, links
        var rendered = esc(raw)
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`(.+?)`/g, '<code style="background:var(--bg);padding:1px 4px;border-radius:3px;font-family:monospace;font-size:12px">$1</code>')
          .replace(/^- (.+)$/gm, '<li>$1</li>')
          .replace(/(<li>.*<\/li>)/s, '<ul style="margin:4px 0 4px 18px">$1</ul>')
          .replace(/\n/g, '<br>');
        descPreviewPanel.innerHTML = '<div class="m-desc-preview-content">' + rendered + '</div>';
        descPreviewPanel.style.display = '';
        descTa.style.display = 'none';
        descPreviewToggle.textContent = '✏ Editar';
      } else {
        descPreviewPanel.style.display = 'none';
        descTa.style.display = '';
        descPreviewToggle.textContent = '👁 Preview';
      }
    };
  }

  document.getElementById('modal-close').onclick = function () { saveAndCloseModal(); };
  overlay.onclick = function (e) { if (e.target === overlay) saveAndCloseModal(); };

  document.getElementById('m-pri').onchange = function () {
    var selPri = PRIORITIES.find(function (px) { return px.id === document.getElementById('m-pri').value; });
    var dot = document.getElementById('m-pri-dot');
    if (dot && selPri) dot.style.background = selPri.color;
  };

  window._modalEscHandler = function (e) {
    if (e.key === 'Escape') { saveAndCloseModal(); return; }
    if (e.key === 'Tab') {
      var mo = document.getElementById('modal-overlay');
      if (!mo) return;
      var focusable = Array.from(mo.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  };
  document.addEventListener('keydown', window._modalEscHandler);

  document.querySelectorAll('.delete-comment-btn').forEach(function (btn) {
    btn.onclick = function () {
      if (confirm('Tem certeza que deseja excluir este comentário?')) {
        Store.deleteComment(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, btn.dataset.cmid);
        var ov = document.getElementById('modal-overlay');
        if (ov) ov.remove();
        openModal(_modalCtx.listId, _modalCtx.cardId);
      }
    };
  });

  document.getElementById('m-clone').onclick = function () {
    var ctx = { boardId: _modalCtx.boardId, listId: _modalCtx.listId, cardId: _modalCtx.cardId };
    saveAndCloseModal(true);
    var clone = Store.cloneCard(ctx.boardId, ctx.listId, ctx.cardId);
    if (clone) {
      refreshCurrent();
      showToast('Ticket clonado: #' + clone.ticketNumber, 'success');
    }
  };

  document.getElementById('m-delete').onclick = function () {
    var ctx = { boardId: _modalCtx.boardId, listId: _modalCtx.listId, cardId: _modalCtx.cardId };
    saveAndCloseModal(true);
    softDeleteCard(ctx.boardId, ctx.listId, ctx.cardId, function () {
      if (App.view === 'board') renderBoard();
      else if (App.view === 'mytasks') renderMyTasks();
      else renderDashboard();
    });
  };

  document.getElementById('m-send-comment').onclick = function () {
    var ta = document.getElementById('m-new-comment');
    if (!ta.value.trim()) return;
    Store.addComment(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId, ta.value.trim());
    saveAndCloseModal(true);
    openModal(_modalCtx.listId, _modalCtx.cardId);
  };

  document.getElementById('m-new-comment').onkeydown = function (e) {
    if (e.ctrlKey && e.key === 'Enter') document.getElementById('m-send-comment').click();
  };
}

function refreshModal() {
  if (!_modalCtx) return;
  var ctx = { boardId: _modalCtx.boardId, listId: _modalCtx.listId, cardId: _modalCtx.cardId };
  var ov = document.getElementById('modal-overlay');
  if (ov) { AttachmentManager.unbindGlobalPaste(); ov.remove(); }
  _modalCtx = null;
  openModal(ctx.listId, ctx.cardId);
}

function showAddLabelPopup() {
  var b = Store.board(_modalCtx ? _modalCtx.boardId : App.boardId);
  if (!b) return;
  var old = document.getElementById('label-popup');
  if (old) old.remove();

  var popup = document.createElement('div');
  popup.id = 'label-popup';
  popup.className = 'label-popup';

  var existingHtml = '';
  var labels = b.labels || [];
  for (var i = 0; i < labels.length; i++) {
    var lbl = labels[i];
    existingHtml += '<div class="label-popup-row">' +
      '<span class="label-chip active" style="background:' + lbl.color + ';flex:1">' + esc(lbl.name) + '</span>' +
      '<button class="btn-icon label-del-btn" data-lid="' + lbl.id + '" style="color:var(--red);width:24px;height:24px">' + ICONS.trash + '</button>' +
      '</div>';
  }

  var swatches = LABEL_COLORS.map(function (col) {
    return '<div class="color-swatch" data-col="' + col + '" style="background:' + col + ';width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent"></div>';
  }).join('');

  popup.innerHTML =
    '<div class="label-popup-header">Etiquetas do Quadro <button class="btn-icon" id="lp-close" style="margin-left:auto">' + ICONS.close + '</button></div>' +
    (existingHtml ? '<div class="label-popup-existing">' + existingHtml + '</div>' : '') +
    '<div style="font-size:12px;font-weight:600;color:var(--text-secondary);margin:8px 0 4px">Nova etiqueta</div>' +
    '<input class="form-input" id="lp-name" placeholder="Nome da etiqueta…" style="margin-bottom:8px">' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px" id="lp-swatches">' + swatches + '</div>' +
    '<button class="btn-primary" id="lp-create" style="width:100%">Criar Etiqueta</button>';

  document.body.appendChild(popup);

  var selColor = LABEL_COLORS[0];
  popup.querySelector('[data-col="' + selColor + '"]').style.border = '2px solid var(--text)';

  document.getElementById('lp-swatches').onclick = function (e) {
    var sw = e.target.closest('[data-col]');
    if (!sw) return;
    selColor = sw.dataset.col;
    popup.querySelectorAll('[data-col]').forEach(function (s) { s.style.border = '2px solid transparent'; });
    sw.style.border = '2px solid var(--text)';
  };
  document.getElementById('lp-close').onclick = function () { popup.remove(); };
  document.getElementById('lp-create').onclick = function () {
    var name = document.getElementById('lp-name').value.trim();
    if (!name) return;
    Store.addBoardLabel(_modalCtx ? _modalCtx.boardId : App.boardId, name, selColor);
    popup.remove();
    if (_modalCtx) refreshModal(); else renderBoard();
    showToast('Etiqueta criada!', 'success');
  };
  popup.querySelectorAll('.label-del-btn').forEach(function (btn) {
    btn.onclick = function () {
      Store.deleteBoardLabel(_modalCtx ? _modalCtx.boardId : App.boardId, btn.dataset.lid);
      popup.remove();
      if (_modalCtx) refreshModal(); else renderBoard();
    };
  });

  setTimeout(function () {
    var close = function (e) { if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('click', close); } };
    document.addEventListener('click', close);
  }, 10);
}

function saveAndCloseModal(skipSave) {
  if (typeof AttachmentManager !== 'undefined') AttachmentManager.unbindGlobalPaste();
  if (window._modalEscHandler) {
    document.removeEventListener('keydown', window._modalEscHandler);
    window._modalEscHandler = null;
  }

  if (_modalCtx && !skipSave) {
    var title = document.getElementById('m-title');
    var desc = document.getElementById('m-desc');
    var assignee = document.getElementById('m-assignee');
    var due = document.getElementById('m-due');
    var est = document.getElementById('m-est');
    var priSel = document.getElementById('m-pri');
    var cat = document.getElementById('m-cat');
    var rec = document.getElementById('m-rec');
    var listSel = document.getElementById('m-list');

    // Capture old state for activity logging
    var oldCard = Store.card(_modalCtx.boardId, _modalCtx.listId, _modalCtx.cardId);
    var oldTitle = oldCard ? oldCard.title : '';
    var oldAssignee = oldCard ? (oldCard.assigneeId || '') : '';
    var oldPriority = oldCard ? oldCard.priority : '';
    var oldDueDate = oldCard ? (oldCard.dueDate || '') : '';
    var bid = _modalCtx.boardId, lid = _modalCtx.listId, cid = _modalCtx.cardId;

    if (title && desc) {
      Store.updateCard(bid, lid, cid, {
        title: title.value.trim() || 'Sem título',
        description: desc.value,
        assigneeId: assignee ? (assignee.value || null) : null,
        dueDate: due ? due.value : '',
        estimate: est ? est.value : '',
        priority: priSel ? priSel.value : 'medium',
        category: cat ? cat.value : 'Solicitação',
        recurrence: rec ? rec.value : 'none'
      });

      // Log changes
      var newTitle = title.value.trim() || 'Sem título';
      if (newTitle !== oldTitle) Store.addActivity(bid, lid, cid, 'alterou o título', '"' + newTitle + '"');
      var newAssignee = assignee ? (assignee.value || '') : '';
      if (newAssignee !== oldAssignee) {
        var newUser = newAssignee ? Store.user(newAssignee) : null;
        Store.addActivity(bid, lid, cid, 'alterou o responsável', newUser ? 'para ' + newUser.name : 'removido');
      }
      if (priSel && priSel.value !== oldPriority) {
        var newPri = pri(priSel.value);
        Store.addActivity(bid, lid, cid, 'alterou a prioridade', 'para ' + newPri.name);
      }
      var newDue = due ? due.value : '';
      if (newDue !== oldDueDate) Store.addActivity(bid, lid, cid, 'alterou o vencimento', newDue || 'removido');
    }

    if (listSel && listSel.value && listSel.value !== lid) {
      var brd = Store.board(bid);
      if (brd) {
        var fromL = brd.lists.find(function (x) { return x.id === lid; });
        var toL = brd.lists.find(function (x) { return x.id === listSel.value; });
        if (fromL && toL) {
          var fromIdx = fromL.cards.findIndex(function (x) { return x.id === cid; });
          if (fromIdx >= 0) {
            Store.addActivity(bid, lid, cid, 'moveu para', toL.name);
            Store.moveCard(bid, lid, listSel.value, fromIdx, toL.cards.length);
            // Trigger CSAT if moved to last list
            if (brd.lists[brd.lists.length - 1].id === listSel.value) {
              var movedCard = toL.cards.find(function (x) { return x.id === cid; }) || Store.findCard(cid);
              if (movedCard && !movedCard.csat) _maybeTriggerCsat(bid, listSel.value, cid);
            }
          }
        }
      }
    }

    _modalCtx = null;
  }
  var ov = document.getElementById('modal-overlay');
  if (ov) ov.remove();
  if (App.view === 'board' && App.boardId) renderBoard();
  else if (App.view === 'mytasks') renderMyTasks();
  fillSidebarBoards();
}

// ─── CSAT MODAL ─────────────────────────────────────────────
function _maybeTriggerCsat(boardId, toListId, cardId) {
  var b = Store.board(boardId);
  if (!b || !b.lists.length) return;
  if (b.lists[b.lists.length - 1].id !== toListId) return;
  var found = Store.findCard(cardId);
  if (!found || (found.card && found.card.csat)) return;
  setTimeout(function () { showCsatModal(boardId, toListId, cardId); }, 800);
}

function showCsatModal(boardId, listId, cardId) {
  var found = Store.findCard(cardId);
  if (!found) return;
  var c = found.card;
  if (c.csat) return; // Already rated

  var old = document.getElementById('csat-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'csat-overlay';
  overlay.className = 'popup-overlay';
  overlay.innerHTML =
    '<div class="popup-box" style="width:380px;text-align:center">' +
    '<div style="font-size:32px;margin-bottom:8px">⭐</div>' +
    '<h3 style="margin:0 0 6px">Como foi o atendimento?</h3>' +
    '<p style="font-size:13px;color:var(--text-secondary);margin:0 0 16px">Ticket #' + String(c.ticketNumber).padStart(3, '0') + ' — ' + esc(c.title) + '</p>' +
    '<div class="csat-stars" id="csat-stars">' +
    [1,2,3,4,5].map(function(n){ return '<span class="csat-star" data-r="' + n + '">★</span>'; }).join('') +
    '</div>' +
    '<textarea class="form-input" id="csat-comment" placeholder="Comentário opcional…" rows="2" style="margin:12px 0;resize:none"></textarea>' +
    '<div style="display:flex;gap:8px;justify-content:center">' +
    '<button class="btn-secondary" id="csat-skip">Pular</button>' +
    '<button class="btn-primary" id="csat-submit" disabled>Enviar avaliação</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  var selected = 0;
  var stars = overlay.querySelectorAll('.csat-star');
  var submitBtn = document.getElementById('csat-submit');

  function setStars(r) {
    selected = r;
    stars.forEach(function (s, i) { s.classList.toggle('filled', i < r); });
    submitBtn.disabled = r === 0;
  }

  stars.forEach(function (s) {
    s.onmouseenter = function () { stars.forEach(function (x, i) { x.classList.toggle('hover', i < parseInt(s.dataset.r)); }); };
    s.onmouseleave = function () { stars.forEach(function (x) { x.classList.remove('hover'); }); };
    s.onclick = function () { setStars(parseInt(s.dataset.r)); };
  });

  document.getElementById('csat-skip').onclick = function () { overlay.remove(); };

  submitBtn.onclick = function () {
    if (!selected) return;
    var card3 = Store.findCard(cardId);
    if (card3) {
      card3.card.csat = { rating: selected, comment: document.getElementById('csat-comment').value.trim(), at: Date.now() };
      Store.save();
    }
    overlay.remove();
    showToast('Avaliação enviada! Obrigado. ★ ' + selected + '/5', 'success');
  };
}

// ─── LINK TICKET MODAL ──────────────────────────────────────
function showLinkTicketModal(boardId, listId, cardId) {
  var old = document.getElementById('link-ticket-overlay');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'link-ticket-overlay';
  overlay.className = 'popup-overlay';

  var linkTypes = [
    { id: 'related',    name: 'Relacionado' },
    { id: 'blocks',     name: 'Bloqueia' },
    { id: 'blocked-by', name: 'Bloqueado por' },
    { id: 'duplicate',  name: 'Duplicata de' },
  ];
  var typeOpts = linkTypes.map(function (t) { return '<option value="' + t.id + '">' + t.name + '</option>'; }).join('');

  overlay.innerHTML =
    '<div class="popup-box" style="width:400px">' +
    '<h3>Vincular Ticket</h3>' +
    '<div class="form-group" style="margin-bottom:12px"><label>Tipo de vínculo</label><select class="form-select" id="lnk-type" style="margin-top:4px">' + typeOpts + '</select></div>' +
    '<div class="form-group" style="margin-bottom:16px"><label>Número do ticket (ex: 42)</label><input class="form-input" id="lnk-num" type="number" min="1" placeholder="123" style="margin-top:4px"></div>' +
    '<div style="display:flex;gap:8px;justify-content:flex-end">' +
    '<button class="btn-secondary" id="lnk-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="lnk-confirm">Vincular</button>' +
    '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  document.getElementById('lnk-num').focus();

  document.getElementById('lnk-cancel').onclick = function () { overlay.remove(); };
  document.getElementById('lnk-confirm').onclick = function () {
    var num = parseInt(document.getElementById('lnk-num').value);
    if (!num) { showToast('Informe um número de ticket válido.', 'error'); return; }
    // Find target ticket by number
    var target = null;
    for (var bi = 0; bi < Store.data.boards.length; bi++) {
      for (var li2 = 0; li2 < Store.data.boards[bi].lists.length; li2++) {
        var fc = Store.data.boards[bi].lists[li2].cards.find(function (x) { return x.ticketNumber === num; });
        if (fc) { target = fc; break; }
      }
      if (target) break;
    }
    if (!target) { showToast('Ticket #' + num + ' não encontrado.', 'error'); return; }
    if (target.id === cardId) { showToast('Não é possível vincular um ticket a si mesmo.', 'error'); return; }
    var card4 = Store.findCard(cardId);
    if (!card4) return;
    var c4 = card4.card;
    if (!Array.isArray(c4.linkedTickets)) c4.linkedTickets = [];
    if (c4.linkedTickets.some(function (x) { return x.ticketId === target.id; })) { showToast('Já vinculado.', 'info'); overlay.remove(); return; }
    c4.linkedTickets.push({ ticketId: target.id, type: document.getElementById('lnk-type').value });
    Store.save();
    overlay.remove();
    showToast('Ticket vinculado!', 'success');
    refreshModal();
  };
}

// ─── PROFILE MODAL ──────────────────────────────────────────
function showProfileModal() {
  var me = Store.me();
  if (!me) return;
  var popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.id = 'popup-overlay';
  var opts = getDepts().map(function (d) { return '<option value="' + d.id + '"' + (d.id === me.department ? ' selected' : '') + '>' + d.icon + ' ' + d.name + '</option>'; }).join('');

  popup.innerHTML =
    '<div class="popup-box" style="width:400px">' +
    '<h3>Editar Perfil</h3>' +
    '<div style="display:flex;justify-content:center;margin-bottom:20px">' +
    '<div class="avatar" style="width:64px;height:64px;font-size:24px;background:' + avatarBg(me.name) + '">' + initials(me.name) + '</div></div>' +
    '<div class="form-group" style="margin-bottom:12px"><label>Nome</label><input type="text" class="form-input" id="prof-name" value="' + esc(me.name) + '"></div>' +
    '<div class="form-group" style="margin-bottom:12px"><label>Email</label><input type="email" class="form-input" id="prof-email" value="' + esc(me.email) + '"></div>' +
    '<div class="form-group" style="margin-bottom:16px"><label>Nova Senha (deixe em branco para não alterar)</label><input type="password" class="form-input" id="prof-pw" placeholder="••••••••" autocomplete="new-password"></div>' +
    '<div class="form-group" style="margin-bottom:16px"><label>Setor</label><select class="form-select" id="prof-dept">' + opts + '</select></div>' +
    '<div style="display:flex;gap:10px;justify-content:flex-end">' +
    '<button class="btn-secondary" id="prof-cancel">Cancelar</button>' +
    '<button class="btn-primary" id="prof-save">Salvar</button>' +
    '</div></div>';

  document.body.appendChild(popup);

  document.getElementById('prof-cancel').onclick = function () { popup.remove(); };
  document.getElementById('prof-save').onclick = async function () {
    var newPw = document.getElementById('prof-pw').value;
    if (newPw && newPw.length < 8) { showToast('Senha mínima: 8 caracteres.', 'error'); return; }
    var btn = document.getElementById('prof-save');
    btn.disabled = true; btn.textContent = 'Salvando...';
    me.name = document.getElementById('prof-name').value.trim() || me.name;
    me.email = document.getElementById('prof-email').value.trim() || me.email;
    me.department = document.getElementById('prof-dept').value;
    if (newPw) {
      var salt = _generateSalt();
      me.pwHashSalt = salt;
      me.pwHash = await _hashPassword(newPw, salt);
    }
    Store.save();
    popup.remove();
    renderApp();
    showToast('Perfil atualizado!', 'success');
  };
}

// ─── SHORTCUTS MODAL ────────────────────────────────────────
function showShortcutsModal() {
  if (document.getElementById('popup-overlay')) return;
  var popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.id = 'popup-overlay';
  popup.innerHTML =
    '<div class="popup-box" style="max-width:420px">' +
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">' +
    '<div style="width:32px;height:32px">' + ICONS.keyboard + '</div>' +
    '<h3 style="margin:0">Atalhos de Teclado</h3>' +
    '</div>' +
    '<div class="shortcuts-grid">' +
    '<div class="shortcut-row"><kbd>Ctrl + K</kbd><span>Abrir Painel de Comandos</span></div>' +
    '<div class="shortcut-row"><kbd>?</kbd><span>Mostrar atalhos</span></div>' +
    '<div class="shortcut-row"><kbd>Esc</kbd><span>Fechar modal/popup</span></div>' +
    '<div class="shortcut-row"><kbd>D</kbd><span>Ir para Início</span></div>' +
    '<div class="shortcut-row"><kbd>T</kbd><span>Minhas Tarefas</span></div>' +
    '<div class="shortcut-row"><kbd>C</kbd><span>Calendário</span></div>' +
    '<div class="shortcut-row"><kbd>Q</kbd><span>Métricas de Qualidade</span></div>' +
    '<div class="shortcut-row"><kbd>N</kbd><span>Novo ticket (no quadro)</span></div>' +
    '<div class="shortcut-row"><kbd>Ctrl + Enter</kbd><span>Enviar comentário</span></div>' +
    '<div class="shortcut-row"><kbd>Enter</kbd><span>Confirmar formulário inline</span></div>' +
    '</div>' +
    '<div style="margin-top:16px;display:flex;justify-content:flex-end">' +
    '<button class="btn-primary" id="sc-close">Fechar</button></div>' +
    '</div>';
  document.body.appendChild(popup);
  document.getElementById('sc-close').onclick = function () { popup.remove(); };
  popup.onclick = function (e) { if (e.target === popup) popup.remove(); };
}

// ============================================================
// QUALITY METRICS — ISO 9001 INDICATORS
// ============================================================
function renderQuality() {
  var main = document.getElementById('main-content');
  if (!main) return;

  // ── Clear any existing auto-refresh timer ──────────────────
  if (App._qualityRefreshTimer) {
    clearInterval(App._qualityRefreshTimer);
    App._qualityRefreshTimer = null;
  }

  var period = App.qualityPeriod || '90';
  var now = Date.now();
  var since = period === '30'  ? now - 30  * 86400000
            : period === '90'  ? now - 90  * 86400000
            : period === '365' ? now - 365 * 86400000
            : 0;

  var bs   = Store.boards();
  var slaH = getSlaH();
  var qCfg = getQualitySettings();
  var mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  // ── Aggregate ──────────────────────────────────────────────
  var allCards = [], doneCards = [], activeCards = [], overdueCards = [];
  var catMap = {}, deptMap = {}, priMap = {}, monthMap = {}, analystMap = {};
  var slaCompliant = 0, slaTested = 0, totalResMs = 0, resCount = 0;

  for (var bi = 0; bi < bs.length; bi++) {
    var brd = bs[bi];
    var deptName = dept(brd.departmentId).name;

    for (var li = 0; li < brd.lists.length; li++) {
      var lst    = brd.lists[li];
      var isLast = li === brd.lists.length - 1;

      for (var ci = 0; ci < lst.cards.length; ci++) {
        var c   = lst.cards[ci];
        var cAt = c.createdAt || 0;
        if (cAt < since) continue;

        allCards.push(c);

        var cat = c.category || 'Outro';
        catMap[cat]      = (catMap[cat]      || 0) + 1;
        deptMap[deptName] = (deptMap[deptName] || 0) + 1;
        var pn = pri(c.priority).name;
        priMap[pn] = (priMap[pn] || 0) + 1;

        var dt = new Date(cAt);
        var mk = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0');
        if (!monthMap[mk]) monthMap[mk] = { label: mNames[dt.getMonth()] + '/' + String(dt.getFullYear()).slice(2), created: 0, done: 0 };
        monthMap[mk].created++;

        if (isLast) {
          doneCards.push(c);
          if (c.completedAt) {
            var cd = new Date(c.completedAt);
            var cmk = cd.getFullYear() + '-' + String(cd.getMonth() + 1).padStart(2, '0');
            if (!monthMap[cmk]) monthMap[cmk] = { label: mNames[cd.getMonth()] + '/' + String(cd.getFullYear()).slice(2), created: 0, done: 0 };
            monthMap[cmk].done++;
          }
          var limit   = (slaH[c.priority] || 24) * 3600000;
          var elapsed = (c.completedAt || now) - cAt;
          slaTested++;
          if (elapsed <= limit) slaCompliant++;
          if (c.completedAt) { totalResMs += c.completedAt - cAt; resCount++; }
          if (c.assigneeId) {
            if (!analystMap[c.assigneeId]) analystMap[c.assigneeId] = { resolved: 0, totalMs: 0 };
            analystMap[c.assigneeId].resolved++;
            if (c.completedAt) analystMap[c.assigneeId].totalMs += c.completedAt - cAt;
          }
        } else {
          activeCards.push(c);
          if (c.dueDate && parseDate(c.dueDate).getTime() < now) overdueCards.push(c);
        }
      }
    }
  }

  var total       = allCards.length;
  var slaRate     = slaTested   > 0 ? Math.round(slaCompliant / slaTested              * 100) : 100;
  var resolRate   = total       > 0 ? Math.round(doneCards.length / total              * 100) : 0;
  var overdueRate = activeCards.length > 0 ? Math.round(overdueCards.length / activeCards.length * 100) : 0;
  var mttrH       = resCount    > 0 ? totalResMs / resCount / 3600000 : 0;
  var mttrLabel   = mttrH === 0 ? '—' : mttrH < 1 ? Math.round(mttrH * 60) + 'min' : mttrH < 24 ? mttrH.toFixed(1) + 'h' : (mttrH / 24).toFixed(1) + 'd';

  var ncCats     = qCfg.ncCategories;
  var ncTotal    = allCards.filter(function (x) { return ncCats.indexOf(x.category) !== -1; }).length;
  var ncResolved = doneCards.filter(function (x) { return ncCats.indexOf(x.category) !== -1; }).length;

  // CSAT aggregate
  var csatCards = doneCards.filter(function (x) { return x.csat && x.csat.rating; });
  var csatAvg = csatCards.length > 0 ? (csatCards.reduce(function (s, x) { return s + x.csat.rating; }, 0) / csatCards.length) : 0;
  var csatPct = Math.round(csatAvg / 5 * 100);
  var csatLabel = csatCards.length === 0 ? '—' : csatAvg.toFixed(1) + '/5 (' + csatCards.length + ' avaliações)';
  var ncRate     = ncTotal > 0 ? Math.round(ncResolved / ncTotal * 100) : 100;

  // ── Helpers ────────────────────────────────────────────────
  function gaugeColor(pct) {
    return pct >= qCfg.greenThreshold ? 'var(--green)' : pct >= qCfg.yellowThreshold ? '#EAB308' : 'var(--red)';
  }

  function svgGauge(pct, color) {
    var r = 38, cx = 44, cy = 44, circ = 2 * Math.PI * r;
    var dash = circ * Math.min(pct, 100) / 100;
    return '<svg width="88" height="88" viewBox="0 0 88 88">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--border)" stroke-width="9"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="9" stroke-linecap="round"' +
      ' stroke-dasharray="' + dash.toFixed(2) + ' ' + circ.toFixed(2) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>' +
      '</svg>';
  }

  function hBarChart(map, colorFn) {
    var entries = Object.keys(map).map(function (k) { return { label: k, count: map[k] }; });
    entries.sort(function (a, b2) { return b2.count - a.count; });
    if (!entries.length) return '<p style="color:var(--text-light);font-size:13px;padding:12px 0">Sem dados no período.</p>';
    var maxVal = entries[0].count || 1;
    return entries.map(function (e) {
      var pct = Math.round(e.count / maxVal * 100);
      var col = colorFn ? colorFn(e.label) : 'var(--brand)';
      return '<div class="q-hbar-row">' +
        '<span class="q-hbar-label" title="' + esc(e.label) + '">' + esc(e.label) + '</span>' +
        '<div class="q-hbar-track"><div class="q-hbar-fill" style="width:' + pct + '%;background:' + col + '"></div></div>' +
        '<span class="q-hbar-val">' + e.count + '</span>' +
        '</div>';
    }).join('');
  }

  // ── Monthly trend SVG ──────────────────────────────────────
  var sortedMonths = Object.keys(monthMap).sort().slice(-6).map(function (k) {
    return { key: k, label: monthMap[k].label, created: monthMap[k].created, done: monthMap[k].done };
  });

  function trendChart() {
    if (!sortedMonths.length) return '<p style="color:var(--text-light);font-size:13px;padding:24px 0;text-align:center">Sem dados no período.</p>';
    var W = 460, H = 120, pt = 10, pr = 10, pb = 28, pl = 30;
    var cW = W - pl - pr, cH = H - pt - pb;
    var maxV = Math.max.apply(null, sortedMonths.map(function (m) { return Math.max(m.created, m.done, 1); }));
    var n = sortedMonths.length, gap = cW / n;
    var barW = Math.min(24, Math.max(5, Math.floor(gap / 3)));
    var bars = '', labels = '', yAxis = '';

    for (var g = 0; g <= 4; g++) {
      var yy = pt + cH - Math.round(g / 4 * cH);
      var vv = Math.round(g / 4 * maxV);
      yAxis += '<line x1="' + pl + '" y1="' + yy + '" x2="' + (W - pr) + '" y2="' + yy + '" stroke="var(--border)" stroke-width="1"/>';
      yAxis += '<text x="' + (pl - 4) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="9" fill="var(--text-light)">' + vv + '</text>';
    }
    for (var i = 0; i < n; i++) {
      var m   = sortedMonths[i];
      var bx  = pl + i * gap + gap / 2;
      var crH = Math.max(2, Math.round(m.created / maxV * cH));
      var dnH = Math.max(2, Math.round(m.done    / maxV * cH));
      bars += '<rect x="' + (bx - barW - 1) + '" y="' + (pt + cH - crH) + '" width="' + barW + '" height="' + crH + '" fill="var(--brand)" rx="2" opacity="0.55" title="Criados: ' + m.created + '"/>';
      bars += '<rect x="' + (bx + 1)         + '" y="' + (pt + cH - dnH) + '" width="' + barW + '" height="' + dnH + '" fill="var(--green)" rx="2" opacity="0.75" title="Resolvidos: ' + m.done + '"/>';
      labels += '<text x="' + bx + '" y="' + (H - 5) + '" text-anchor="middle" font-size="9" fill="var(--text-secondary)">' + esc(m.label) + '</text>';
    }
    // Técnica padding-bottom mantém aspect ratio sem distorcer texto
    var aspectPct = (H / W * 100).toFixed(2);
    return '<div style="position:relative;width:100%;padding-bottom:' + aspectPct + '%;overflow:hidden;">' +
      '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' +
      yAxis + bars + labels +
      '<line x1="' + pl + '" y1="' + pt + '" x2="' + pl + '" y2="' + (pt + cH) + '" stroke="var(--border)" stroke-width="1"/>' +
      '</svg></div>';
  }

  // ── Analyst table ──────────────────────────────────────────
  var analystRows = Object.keys(analystMap).map(function (uid2) {
    var u = Store.user(uid2);
    if (!u) return null;
    var am  = analystMap[uid2];
    var aH  = am.resolved > 0 && am.totalMs > 0 ? am.totalMs / am.resolved / 3600000 : 0;
    var aLb = aH === 0 ? '—' : aH < 24 ? aH.toFixed(1) + 'h' : (aH / 24).toFixed(1) + 'd';
    return { user: u, resolved: am.resolved, avgLabel: aLb };
  }).filter(Boolean).sort(function (a, b2) { return b2.resolved - a.resolved; });

  var analystHtml = analystRows.length === 0
    ? '<tr><td colspan="4" style="text-align:center;color:var(--text-light);padding:20px">Sem dados no período.</td></tr>'
    : analystRows.slice(0, 8).map(function (ar, idx) {
        return '<tr>' +
          '<td style="font-size:13px;color:var(--text-light)">' + (idx + 1) + '</td>' +
          '<td><div style="display:flex;align-items:center;gap:8px">' +
          '<div class="avatar" style="background:' + avatarBg(ar.user.name) + ';width:28px;height:28px;font-size:11px;flex-shrink:0">' + initials(ar.user.name) + '</div>' +
          '<span style="font-size:13px;font-weight:500">' + esc(ar.user.name) + '</span></div></td>' +
          '<td style="font-size:13px;font-weight:700;color:var(--green)">' + ar.resolved + '</td>' +
          '<td style="font-size:13px;color:var(--text-secondary)">' + ar.avgLabel + '</td>' +
          '</tr>';
      }).join('');

  var priColorMap = { 'Baixa': '#22C55E', 'Média': '#EAB308', 'Alta': '#F97316', 'Urgente': '#EF4444' };

  var periodOpts = [
    { v: '30',  l: 'Últimos 30 dias' },
    { v: '90',  l: 'Últimos 90 dias' },
    { v: '365', l: 'Este ano' },
    { v: 'all', l: 'Todo o período' },
  ].map(function (o) {
    return '<option value="' + o.v + '"' + (period === o.v ? ' selected' : '') + '>' + o.l + '</option>';
  }).join('');

  var slaColor     = gaugeColor(slaRate);
  var resolColor   = gaugeColor(resolRate);
  var overdueColor = gaugeColor(100 - overdueRate);
  var ncColor      = gaugeColor(ncRate);

  // ── Render ─────────────────────────────────────────────────
  main.innerHTML =
    '<div class="quality-page">' +

    '<div class="view-header quality-header">' +
    '<div style="display:flex;align-items:center;gap:12px;flex:1">' +
    '<div style="width:26px;height:26px;flex-shrink:0">' + ICONS.metrics + '</div>' +
    '<span class="view-title" style="margin:0">Métricas de Qualidade</span>' +
    '<span class="quality-iso-badge">ISO 9001</span>' +
    '</div>' +
    '<select class="filter-select" id="q-period" style="height:34px">' + periodOpts + '</select>' +
    '<button class="btn-secondary" id="q-export-csv" style="height:34px;padding:0 14px;font-size:13px">' + ICONS.desc + ' CSV</button>' +
    '<button class="btn-secondary" id="q-print" style="height:34px;padding:0 14px;font-size:13px">🖨 Imprimir</button>' +
    '</div>' +

    '<div class="quality-section-ref">' +
    ICONS.shield + ' Seção 9.1 — Monitoramento, Medição, Análise e Avaliação &nbsp;|&nbsp; ' +
    '<span title="Limite inferior para verde">Verde ≥ ' + qCfg.greenThreshold + '%</span> &nbsp;' +
    '<span title="Limite inferior para amarelo" style="color:#EAB308">Amarelo ≥ ' + qCfg.yellowThreshold + '%</span> &nbsp;' +
    '<span title="Meta SLA configurada" style="color:var(--text-secondary)">Meta SLA: ' + qCfg.targetSla + '%</span> &nbsp;' +
    '<span title="Meta de resolução configurada" style="color:var(--text-secondary)">Meta Resolução: ' + qCfg.targetResol + '%</span>' +
    '</div>' +

    // ── Real-time API section (skeleton, updated async) ─────
    '<div id="q-api-section">' + _buildApiSkeleton() + '</div>' +

    // ── KPI Gauges ──────────────────────────────────────────
    '<div class="quality-kpis">' +

    '<div class="quality-kpi-card">' +
    '<div class="qkpi-gauge">' + svgGauge(slaRate, slaColor) + '<div class="qkpi-gauge-label" style="color:' + slaColor + '">' + slaRate + '%</div></div>' +
    '<div class="qkpi-info"><div class="qkpi-name">Conformidade SLA</div>' +
    '<div class="qkpi-sub">' + slaCompliant + ' de ' + slaTested + ' dentro do prazo</div>' +
    '<div class="qkpi-ref">ISO 9001 · 9.1.1</div></div>' +
    '</div>' +

    '<div class="quality-kpi-card">' +
    '<div class="qkpi-gauge">' + svgGauge(resolRate, resolColor) + '<div class="qkpi-gauge-label" style="color:' + resolColor + '">' + resolRate + '%</div></div>' +
    '<div class="qkpi-info"><div class="qkpi-name">Taxa de Resolução</div>' +
    '<div class="qkpi-sub">' + doneCards.length + ' de ' + total + ' resolvidos</div>' +
    '<div class="qkpi-ref">ISO 9001 · 9.1.2</div></div>' +
    '</div>' +

    '<div class="quality-kpi-card">' +
    '<div class="qkpi-gauge">' + svgGauge(100 - overdueRate, overdueColor) + '<div class="qkpi-gauge-label" style="color:' + overdueColor + '">' + overdueRate + '%</div></div>' +
    '<div class="qkpi-info"><div class="qkpi-name">Taxa de Atraso</div>' +
    '<div class="qkpi-sub">' + overdueCards.length + ' ticket(s) fora do prazo</div>' +
    '<div class="qkpi-ref">ISO 9001 · 9.1.1</div></div>' +
    '</div>' +

    '<div class="quality-kpi-card">' +
    '<div class="qkpi-gauge">' + svgGauge(ncRate, ncColor) + '<div class="qkpi-gauge-label" style="color:' + ncColor + '">' + ncRate + '%</div></div>' +
    '<div class="qkpi-info"><div class="qkpi-name">Encerramento NC</div>' +
    '<div class="qkpi-sub">' + ncResolved + ' de ' + ncTotal + ' não-conformidades</div>' +
    '<div class="qkpi-ref">ISO 9001 · 10.2</div></div>' +
    '</div>' +

    '<div class="quality-kpi-card quality-kpi-card--stat">' +
    '<div class="qkpi-stat-val">' + mttrLabel + '</div>' +
    '<div class="qkpi-stat-name">Tempo Médio de Resolução</div>' +
    '<div class="qkpi-ref">MTTR · ISO 9.1.1</div>' +
    '</div>' +

    '<div class="quality-kpi-card quality-kpi-card--stat">' +
    '<div class="qkpi-stat-val">' + total + '</div>' +
    '<div class="qkpi-stat-name">Total de Tickets<br>no Período</div>' +
    '<div class="qkpi-ref">Volume</div>' +
    '</div>' +

    '<div class="quality-kpi-card quality-kpi-card--stat">' +
    '<div class="qkpi-stat-val" style="color:' + (csatCards.length === 0 ? 'var(--text-light)' : csatAvg >= 4 ? 'var(--green)' : csatAvg >= 3 ? '#EAB308' : 'var(--red)') + '">' + (csatCards.length === 0 ? '—' : '★ ' + csatAvg.toFixed(1)) + '</div>' +
    '<div class="qkpi-stat-name">CSAT Médio<br>' + (csatCards.length === 0 ? 'Sem avaliações' : csatCards.length + ' avaliações') + '</div>' +
    '<div class="qkpi-ref">ISO 9001 · 9.1.2</div>' +
    '</div>' +

    '</div>' + // .quality-kpis

    // ── Charts row 1: Trend + Category ─────────────────────
    '<div class="quality-charts-row quality-charts-row--2col">' +

    '<div class="quality-chart-card">' +
    '<div class="qchart-title">' + ICONS.activity + ' Tendência de Volume (últimos 6 meses)</div>' +
    '<div class="qchart-legend">' +
    '<span class="qchart-dot" style="background:var(--brand)"></span> Criados &nbsp;&nbsp;' +
    '<span class="qchart-dot" style="background:var(--green)"></span> Resolvidos' +
    '</div>' +
    '<div class="qchart-body">' + trendChart() + '</div>' +
    '</div>' +

    '<div class="quality-chart-card">' +
    '<div class="qchart-title">' + ICONS.label + ' Por Categoria</div>' +
    '<div class="qchart-body">' + hBarChart(catMap, null) + '</div>' +
    '</div>' +

    '</div>' + // row 1

    // ── Charts row 2: Priority + Dept + Analysts ────────────
    '<div class="quality-charts-row quality-charts-row--3col">' +

    '<div class="quality-chart-card">' +
    '<div class="qchart-title">' + ICONS.flag + ' Por Prioridade</div>' +
    '<div class="qchart-body">' + hBarChart(priMap, function (l) { return priColorMap[l] || 'var(--brand)'; }) + '</div>' +
    '</div>' +

    '<div class="quality-chart-card">' +
    '<div class="qchart-title">' + ICONS.users + ' Por Setor</div>' +
    '<div class="qchart-body">' + hBarChart(deptMap, null) + '</div>' +
    '</div>' +

    '<div class="quality-chart-card">' +
    '<div class="qchart-title">' + ICONS.user + ' Performance por Analista</div>' +
    '<div class="qchart-body" style="padding:0">' +
    '<table class="admin-table" style="margin:0"><thead><tr>' +
    '<th style="width:28px">#</th><th>Analista</th><th>Resolvidos</th><th>MTTR</th>' +
    '</tr></thead><tbody>' + analystHtml + '</tbody></table>' +
    '</div>' +
    '</div>' +

    '</div>' + // row 2

    // ── ISO 9001 reference note ─────────────────────────────
    '<div class="quality-iso-note">' +
    '<div style="width:20px;height:20px;flex-shrink:0;margin-top:1px">' + ICONS.shield + '</div>' +
    '<div><strong>Auditoria ISO 9001:2015</strong> — Estes indicadores suportam os requisitos das seções ' +
    '<strong>8.2</strong> (Comunicação com o cliente), <strong>9.1</strong> (Monitoramento e medição), ' +
    '<strong>9.1.2</strong> (Satisfação do cliente) e <strong>10.2</strong> (Não conformidade e ação corretiva). ' +
    'Utilize o filtro de período para gerar evidências de auditorias internas e externas.' +
    '</div>' +
    '</div>' +

    '</div>'; // .quality-page

  document.getElementById('q-period').onchange = function () {
    App.qualityPeriod = this.value;
    renderQuality();
  };
  document.getElementById('q-export-csv').onclick = function () {
    Store.exportQualityCSV(App.qualityPeriod);
    showToast('Relatório CSV exportado!', 'success');
  };
  document.getElementById('q-print').onclick = function () {
    window.print();
  };

  // ── Kick off real-time API fetch ───────────────────────────
  var _rtStoreData = {
    total:       total,
    activeCards: activeCards,
    doneCards:   doneCards,
    mttrH:       mttrH,
    slaRate:     slaRate,
  };
  _fetchAndRenderApiMetrics({ storeData: _rtStoreData });

  // ── Auto-refresh every 60 s ────────────────────────────────
  App._qualityRefreshTimer = setInterval(function () {
    if (!document.getElementById('q-api-section')) {
      clearInterval(App._qualityRefreshTimer);
      App._qualityRefreshTimer = null;
      return;
    }
    _fetchAndRenderApiMetrics({ storeData: _rtStoreData, silent: true });
  }, 60000);
}

// ============================================================
// REAL-TIME API METRICS HELPERS
// ============================================================

// ── Loading skeleton ────────────────────────────────────────
function _buildApiSkeleton() {
  var skBase = 'border-radius:8px;background:var(--border,#2a2a2a);animation:q-shimmer 1.5s infinite linear;background-size:200% 100%;';
  return '<div class="q-realtime-section">' +
    '<div class="q-realtime-header" style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
    '<span style="font-size:13px;font-weight:600;color:var(--text-light)">⏳ Carregando métricas em tempo real…</span>' +
    '</div>' +
    '<div style="display:flex;gap:12px;">' +
    '<div style="flex:1;height:80px;' + skBase + '"></div>' +
    '<div style="flex:1;height:80px;' + skBase + '"></div>' +
    '<div style="flex:1;height:80px;' + skBase + '"></div>' +
    '<div style="flex:3;height:80px;' + skBase + '"></div>' +
    '</div>' +
    '</div>';
}

// ── Fetch + render orchestrator ─────────────────────────────
function _fetchAndRenderApiMetrics(opts) {
  opts = opts || {};
  var el = document.getElementById('q-api-section');
  if (!el) return;

  if (!opts.silent) {
    el.innerHTML = _buildApiSkeleton();
  }

  var storeData = opts.storeData || null;

  // No API / not logged in → fallback immediately
  if (typeof API === 'undefined' || typeof Auth === 'undefined' || !Auth.isLoggedIn()) {
    el.innerHTML = _buildApiMetricsFallback(storeData);
    var btnF = document.getElementById('q-rt-refresh');
    if (btnF) btnF.onclick = function () { _fetchAndRenderApiMetrics({ storeData: storeData }); };
    return;
  }

  var metricasResult = null;
  var slaResult      = null;
  var errored        = false;
  var done           = 0;

  function onDone() {
    done++;
    if (done < 2) return;
    var el2 = document.getElementById('q-api-section');
    if (!el2) return;
    if (errored || !metricasResult) {
      el2.innerHTML = _buildApiMetricsFallback(storeData);
    } else {
      el2.innerHTML = _buildApiMetricsHtml(metricasResult, slaResult);
    }
    var btn = document.getElementById('q-rt-refresh');
    if (btn) btn.onclick = function () { _fetchAndRenderApiMetrics({ storeData: storeData }); };
  }

  API.dashboard.metricas()
    .then(function (r) {
      if (r && r.success) metricasResult = r.data;
      else errored = true;
      onDone();
    })
    .catch(function () { errored = true; onDone(); });

  API.dashboard.sla()
    .then(function (r) {
      if (r && r.success) slaResult = r.data;
      onDone();
    })
    .catch(function () { onDone(); });
}

// ── Build full real-time HTML from API data ─────────────────
function _buildApiMetricsHtml(m, slaData) {
  // Field names match the updated dashboardController response
  var totais    = m.totais || {};
  var abertos   = (totais.aberto || 0) + (totais.aguardando || 0);
  var emAnd     = totais.em_andamento || 0;
  var resolHoje = m.resolvidosHoje || 0;
  var mttrH2    = m.tempoMedioResolucao || 0;
  var mttrLb    = mttrH2 === 0 ? '—'
                : mttrH2 < 1  ? Math.round(mttrH2 * 60) + 'min'
                : mttrH2 < 24 ? mttrH2.toFixed(1) + 'h'
                : (mttrH2 / 24).toFixed(1) + 'd';

  var ts = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // ── 7-day bar chart ──────────────────────────────────────
  var vol7      = m.volume_7dias || [];
  var chartHtml = _build7dayChart(vol7);

  // ── Agent ranking ────────────────────────────────────────
  var ranking  = m.ranking_agentes || [];
  var rankHtml = '';
  if (!ranking.length) {
    rankHtml = '<p style="color:var(--text-light);font-size:13px;padding:12px 0">Sem dados disponíveis.</p>';
  } else {
    rankHtml = ranking.slice(0, 5).map(function (ag, i) {
      var agMttr = ag.tempo_medio_horas ? Number(ag.tempo_medio_horas).toFixed(1) + 'h' : '—';
      return '<div class="q-rank-row">' +
        '<span class="q-rank-pos">' + (i + 1) + '</span>' +
        '<span class="q-rank-name">' + esc(ag.nome || ag.agente || '—') + '</span>' +
        '<span class="q-rank-val">' + (ag.resolvidos || 0) + '</span>' +
        '<span class="q-rank-mttr">' + agMttr + '</span>' +
        '</div>';
    }).join('');
  }

  // ── SLA semaphore ─────────────────────────────────────────
  var priOrder  = ['critica', 'alta', 'media', 'baixa'];
  var priLabels = { critica: 'Crítica', alta: 'Alta', media: 'Média', baixa: 'Baixa' };
  var slaRows   = '';
  if (slaData && slaData.length) {
    slaRows = priOrder.map(function (p) {
      var row = null;
      for (var si = 0; si < slaData.length; si++) { if (slaData[si].prioridade === p) { row = slaData[si]; break; } }
      if (!row) return '';
      var pct = Math.round(row.sla_rate || 0);
      var dotCls = pct >= 80 ? 'q-sla-dot--ok' : pct >= 50 ? 'q-sla-dot--warn' : 'q-sla-dot--danger';
      var col    = pct >= 80 ? '#22C55E'        : pct >= 50 ? '#EAB308'          : '#EF4444';
      return '<div class="q-sla-row">' +
        '<span class="q-sla-dot ' + dotCls + '"></span>' +
        '<span class="q-sla-pri">' + priLabels[p] + '</span>' +
        '<div class="q-sla-bar-track"><div class="q-sla-bar-fill" style="width:' + pct + '%;background:' + col + '"></div></div>' +
        '<span class="q-sla-pct" style="color:' + col + '">' + pct + '%</span>' +
        '<span class="q-sla-sub">(' + (row.conformes || 0) + '/' + (row.total || 0) + ')</span>' +
        '</div>';
    }).join('');
  } else {
    slaRows = '<p style="color:var(--text-light);font-size:13px;padding:12px 0">Sem dados de SLA.</p>';
  }

  return '<div class="q-realtime-section">' +
    '<div class="q-realtime-header">' +
    '<span class="q-realtime-badge"><span class="q-rt-dot q-rt-dot--ok"></span> Tempo Real</span>' +
    '<span class="q-realtime-ts">Atualizado às ' + ts + '</span>' +
    '<button class="btn-secondary" id="q-rt-refresh" style="height:28px;padding:0 10px;font-size:12px">↻ Atualizar</button>' +
    '</div>' +

    // KPI row — inline flex para garantir layout independente de cache CSS
    '<div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">' +
    _rtKpiCard('📋', abertos,   '#3B82F6', 'Abertos') +
    _rtKpiCard('⚙️',  emAnd,    '#F97316', 'Em Andamento') +
    _rtKpiCard('✅', resolHoje, '#22C55E', 'Resolvidos Hoje') +
    _rtKpiCard('⏱',  mttrLb,   'var(--text-secondary,#888)', 'MTTR') +
    '</div>' +

    // Charts row — inline flex
    '<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">' +

    '<div class="quality-chart-card" style="flex:2;min-width:260px;">' +
    '<div class="qchart-title">' + ICONS.activity + ' Volume — Últimos 7 dias</div>' +
    '<div class="qchart-legend">' +
    '<span class="qchart-dot" style="background:var(--brand)"></span> Criados &nbsp;&nbsp;' +
    '<span class="qchart-dot" style="background:var(--green)"></span> Resolvidos' +
    '</div>' +
    chartHtml +
    '</div>' +

    '<div class="quality-chart-card" style="flex:1.5;min-width:200px;">' +
    '<div class="qchart-title">' + ICONS.user + ' Ranking Agentes</div>' +
    '<div style="padding:0">' +
    '<div style="display:flex;gap:8px;padding:0 4px 8px;font-size:11px;font-weight:600;color:var(--text-light);border-bottom:1px solid var(--border);margin-bottom:6px;">' +
    '<span style="width:20px">#</span><span style="flex:1">Agente</span>' +
    '<span style="width:54px;text-align:center">Resol.</span>' +
    '<span style="width:42px;text-align:right">MTTR</span>' +
    '</div>' +
    rankHtml +
    '</div>' +
    '</div>' +

    '<div class="quality-chart-card" style="flex:1.2;min-width:180px;">' +
    '<div class="qchart-title">' + ICONS.shield + ' SLA por Prioridade</div>' +
    '<div>' + slaRows + '</div>' +
    '</div>' +

    '</div>' + // charts row
    '</div>';  // .q-realtime-section
}

// ── KPI card helper ─────────────────────────────────────────
function _rtKpiCard(icon, val, color, label) {
  return '<div style="flex:1;min-width:110px;background:var(--s2,#1A1714);border:1px solid var(--bd1,#1A1714);border-radius:10px;padding:14px 16px;text-align:center;">' +
    '<div style="font-size:26px;font-weight:300;line-height:1.1;margin-bottom:4px;color:' + color + '">' + val + '</div>' +
    '<div style="font-size:10px;color:var(--t3,#5A5048);text-transform:uppercase;letter-spacing:0.8px;">' + label + '</div>' +
    '</div>';
}

// ── 7-day SVG bar chart ─────────────────────────────────────
function _build7dayChart(vol7) {
  if (!vol7 || !vol7.length) {
    return '<p style="color:var(--text-light);font-size:13px;padding:24px 0;text-align:center">Sem dados nos últimos 7 dias.</p>';
  }
  var W = 420, H = 100, pt = 8, pr = 8, pb = 24, pl = 28;
  var cW = W - pl - pr, cH = H - pt - pb;
  var maxV = 1;
  for (var di = 0; di < vol7.length; di++) {
    var dv = vol7[di];
    if ((dv.total || 0) > maxV) maxV = dv.total;
    if ((dv.resolvidos || 0) > maxV) maxV = dv.resolvidos;
  }
  var n = vol7.length, gap = cW / n;
  var barW = Math.min(24, Math.max(4, Math.floor(gap / 3)));
  var bars = '', labels = '', yAxis = '';
  for (var g = 0; g <= 3; g++) {
    var yy = pt + cH - Math.round(g / 3 * cH);
    var vv = Math.round(g / 3 * maxV);
    yAxis += '<line x1="' + pl + '" y1="' + yy + '" x2="' + (W - pr) + '" y2="' + yy + '" stroke="var(--border)" stroke-width="1"/>';
    yAxis += '<text x="' + (pl - 4) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="9" fill="var(--text-light)">' + vv + '</text>';
  }
  for (var i = 0; i < n; i++) {
    var d7  = vol7[i];
    var bx  = pl + i * gap + gap / 2;
    var crH = Math.max(2, Math.round((d7.total || 0) / maxV * cH));
    var dnH = Math.max(2, Math.round((d7.resolvidos || 0) / maxV * cH));
    bars += '<rect x="' + (bx - barW - 1) + '" y="' + (pt + cH - crH) + '" width="' + barW + '" height="' + crH + '" fill="var(--brand)" rx="2" opacity="0.55"/>';
    bars += '<rect x="' + (bx + 1) + '" y="' + (pt + cH - dnH) + '" width="' + barW + '" height="' + dnH + '" fill="var(--green)" rx="2" opacity="0.75"/>';
    var dayLabel = d7.data ? d7.data.slice(5) : ('D' + (i + 1));
    labels += '<text x="' + bx + '" y="' + (H - 4) + '" text-anchor="middle" font-size="9" fill="var(--text-secondary)">' + dayLabel + '</text>';
  }
  // Técnica padding-bottom: mantém aspect ratio sem distorcer texto
  var aspectPct7 = (H / W * 100).toFixed(2);
  return '<div style="position:relative;width:100%;padding-bottom:' + aspectPct7 + '%;overflow:hidden;">' +
    '<svg style="position:absolute;top:0;left:0;width:100%;height:100%;" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' +
    yAxis + bars + labels +
    '<line x1="' + pl + '" y1="' + pt + '" x2="' + pl + '" y2="' + (pt + cH) + '" stroke="var(--border)" stroke-width="1"/>' +
    '</svg></div>';
}

// ── Fallback: render from Store data when API is unavailable ─
function _buildApiMetricsFallback(storeData) {
  var s = storeData || {};
  var abertos = (s.activeCards || []).length;
  var now2    = new Date();
  var resolHoje = (s.doneCards || []).filter(function (c) {
    if (!c.completedAt) return false;
    var d = new Date(c.completedAt);
    return d.getFullYear() === now2.getFullYear() && d.getMonth() === now2.getMonth() && d.getDate() === now2.getDate();
  }).length;
  var mttrH3  = s.mttrH || 0;
  var mttrLb2 = mttrH3 === 0 ? '—'
              : mttrH3 < 1  ? Math.round(mttrH3 * 60) + 'min'
              : mttrH3 < 24 ? mttrH3.toFixed(1) + 'h'
              : (mttrH3 / 24).toFixed(1) + 'd';
  var slaRate2 = s.slaRate || 0;
  var slaCol  = slaRate2 >= 80 ? '#22C55E' : slaRate2 >= 50 ? '#EAB308' : '#EF4444';

  return '<div class="q-realtime-section" style="border-color:#EAB308;">' +
    '<div class="q-realtime-header">' +
    '<span class="q-realtime-badge">' +
    '<span class="q-rt-dot" style="background:#EAB308;display:inline-block;width:8px;height:8px;border-radius:50%"></span> Dados locais (API indisponível)' +
    '</span>' +
    '<button class="btn-secondary" id="q-rt-refresh" style="height:28px;padding:0 10px;font-size:12px">↻ Tentar novamente</button>' +
    '</div>' +
    '<div style="display:flex;gap:12px;flex-wrap:wrap;">' +
    _rtKpiCard('📋', abertos,       '#3B82F6', 'Abertos') +
    _rtKpiCard('✅', resolHoje,     '#22C55E', 'Resolvidos Hoje') +
    _rtKpiCard('⏱',  mttrLb2,      'var(--text-secondary,#888)', 'MTTR') +
    _rtKpiCard('🎯', slaRate2 + '%', slaCol,  'SLA') +
    '</div>' +
    '</div>';
}