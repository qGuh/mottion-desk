/* ============================================================
   MOTTION DESK — API.JS
   Camada de integração com o backend (localhost:3001).
   Carregado ANTES do app.js — não depende de nenhum outro módulo.
   ============================================================ */
'use strict';

// ─── Configuração ────────────────────────────────────────────
var BASE_URL = 'http://localhost:3001/api';

// ─── Storage keys ────────────────────────────────────────────
var _TOKEN_KEY = 'md_token';
var _USER_KEY  = 'md_user';

// ─── Auth helpers ────────────────────────────────────────────
var Auth = {
  getToken:  function () { return localStorage.getItem(_TOKEN_KEY) || null; },
  setToken:  function (t) { localStorage.setItem(_TOKEN_KEY, t); },
  getUser:   function () {
    try { return JSON.parse(localStorage.getItem(_USER_KEY)); } catch (e) { return null; }
  },
  setUser:   function (u) { localStorage.setItem(_USER_KEY, JSON.stringify(u)); },
  isLoggedIn: function () { return !!Auth.getToken(); },
  logout:    function () {
    localStorage.removeItem(_TOKEN_KEY);
    localStorage.removeItem(_USER_KEY);
    window.location.reload();
  },
};

// ─── Fetch wrapper ───────────────────────────────────────────
/**
 * api(method, endpoint, body?)
 * Retorna { success, data, message } ou lança erro.
 * Em 401 faz logout automático.
 */
function api(method, endpoint, body) {
  var headers = { 'Content-Type': 'application/json' };
  var token   = Auth.getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;

  var opts = { method: method, headers: headers };
  if (body !== undefined) opts.body = JSON.stringify(body);

  return fetch(BASE_URL + endpoint, opts).then(function (res) {
    if (res.status === 401) {
      Auth.logout();
      return;
    }
    return res.json().then(function (data) {
      if (!res.ok) {
        var err = new Error(data.message || 'Erro na requisição');
        err.status = res.status;
        err.data   = data;
        throw err;
      }
      return data;
    });
  });
}

// ─── API Object ──────────────────────────────────────────────
var API = {

  // ── Auth ───────────────────────────────────────────────────
  auth: {
    login: function (email, senha) {
      return api('POST', '/auth/login', { email: email, senha: senha });
    },
    me: function () {
      return api('GET', '/auth/me');
    },
    alterarSenha: function (senha_atual, nova_senha) {
      return api('PUT', '/auth/senha', { senha_atual: senha_atual, nova_senha: nova_senha });
    },
  },

  // ── Tickets ────────────────────────────────────────────────
  tickets: {
    listar: function (filtros) {
      var qs = '';
      if (filtros && typeof filtros === 'object') {
        var pairs = [];
        Object.keys(filtros).forEach(function (k) {
          if (filtros[k] !== undefined && filtros[k] !== '') {
            pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(filtros[k]));
          }
        });
        if (pairs.length) qs = '?' + pairs.join('&');
      }
      return api('GET', '/tickets' + qs);
    },
    buscar: function (id) {
      return api('GET', '/tickets/' + id);
    },
    criar: function (dados) {
      return api('POST', '/tickets', dados);
    },
    atualizar: function (id, dados) {
      return api('PUT', '/tickets/' + id, dados);
    },
    excluir: function (id) {
      return api('DELETE', '/tickets/' + id);
    },
    comentar: function (id, conteudo, interno) {
      return api('POST', '/tickets/' + id + '/comentarios', {
        conteudo: conteudo,
        interno:  !!interno,
      });
    },
  },

  // ── Dashboard ──────────────────────────────────────────────
  dashboard: {
    metricas: function () {
      return api('GET', '/dashboard/metricas');
    },
    sla: function (setor_id, periodo) {
      var qs = [];
      if (setor_id) qs.push('setor_id=' + setor_id);
      if (periodo)  qs.push('periodo='  + periodo);
      return api('GET', '/dashboard/sla' + (qs.length ? '?' + qs.join('&') : ''));
    },
  },

  // ── Setores ────────────────────────────────────────────────
  setores: {
    listar: function () {
      return api('GET', '/setores');
    },
    buscar: function (id) {
      return api('GET', '/setores/' + id);
    },
    criar: function (dados) {
      return api('POST', '/setores', dados);
    },
    atualizar: function (id, dados) {
      return api('PUT', '/setores/' + id, dados);
    },
    excluir: function (id) {
      return api('DELETE', '/setores/' + id);
    },
    listarSLA: function (id) {
      return api('GET', '/setores/' + id + '/sla');
    },
    atualizarSLA: function (id, configuracoes) {
      return api('PUT', '/setores/' + id + '/sla', { configuracoes: configuracoes });
    },
  },

  // ── Inteligência Artificial ────────────────────────────────
  ia: {
    triar: function(titulo, descricao) {
      return api('POST', '/ia/triar', { titulo: titulo, descricao: descricao || '' });
    },
  },

  // ── Base de Conhecimento ───────────────────────────────────
  kb: {
    listar:    function(params) {
      var qs = [];
      if (params && params.busca)     qs.push('busca='     + encodeURIComponent(params.busca));
      if (params && params.categoria) qs.push('categoria=' + encodeURIComponent(params.categoria));
      return api('GET', '/kb' + (qs.length ? '?' + qs.join('&') : ''));
    },
    buscar:    function(id)   { return api('GET',    '/kb/' + id); },
    criar:     function(data) { return api('POST',   '/kb', data); },
    atualizar: function(id, data) { return api('PUT', '/kb/' + id, data); },
    excluir:   function(id)   { return api('DELETE', '/kb/' + id); },
  },

  // ── Usuários ───────────────────────────────────────────────
  usuarios: {
    listar: function (filtros) {
      var qs = '';
      if (filtros && typeof filtros === 'object') {
        var pairs = [];
        Object.keys(filtros).forEach(function (k) {
          if (filtros[k] !== undefined && filtros[k] !== '') {
            pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(filtros[k]));
          }
        });
        if (pairs.length) qs = '?' + pairs.join('&');
      }
      return api('GET', '/usuarios' + qs);
    },
    buscar: function (id) {
      return api('GET', '/usuarios/' + id);
    },
    criar: function (dados) {
      return api('POST', '/usuarios', dados);
    },
    atualizar: function (id, dados) {
      return api('PUT', '/usuarios/' + id, dados);
    },
    toggleAtivo: function (id) {
      return api('PATCH', '/usuarios/' + id + '/ativo');
    },
    redefinirSenha: function (id, nova_senha) {
      return api('PUT', '/usuarios/' + id + '/senha', { nova_senha: nova_senha });
    },
  },
};

// ─── Tela de Login ───────────────────────────────────────────
/**
 * Renderiza a tela de login da API no elemento #app.
 * Chamada apenas quando Auth.isLoggedIn() === false.
 */
function renderAPILogin() {
  var app = document.getElementById('app');
  if (!app) return;

  // Injeta CSS mínimo para o login — usa as custom properties do tema
  if (!document.getElementById('_api-login-css')) {
    var style = document.createElement('style');
    style.id  = '_api-login-css';
    style.textContent = [
      '.api-login-root{display:flex;align-items:center;justify-content:center;min-height:100vh;',
      'background:var(--bg,#0f0f13);font-family:inherit;}',

      '.api-login-card{width:100%;max-width:400px;background:var(--surface,#1a1a24);',
      'border:1px solid var(--border,rgba(255,255,255,.08));border-radius:16px;',
      'padding:40px 36px;box-shadow:0 24px 64px rgba(0,0,0,.5);}',

      '.api-login-logo{display:flex;align-items:center;gap:12px;margin-bottom:32px;}',
      '.api-login-brand{font-size:1.25rem;font-weight:700;color:var(--text,#f0f0f5);letter-spacing:-.3px;}',
      '.api-login-brand span{color:var(--brand,#6c5ce7);}',

      '.api-login-title{font-size:1.5rem;font-weight:700;color:var(--text,#f0f0f5);margin:0 0 4px;}',
      '.api-login-sub{font-size:.875rem;color:var(--text-secondary,rgba(240,240,245,.5));margin:0 0 28px;}',

      '.api-login-field{margin-bottom:16px;}',
      '.api-login-label{display:block;font-size:.75rem;font-weight:600;letter-spacing:.5px;',
      'text-transform:uppercase;color:var(--text-secondary,rgba(240,240,245,.5));margin-bottom:6px;}',
      '.api-login-input{width:100%;box-sizing:border-box;background:var(--bg,#0f0f13);',
      'border:1.5px solid var(--border,rgba(255,255,255,.08));border-radius:8px;',
      'padding:10px 14px;font-size:.9375rem;color:var(--text,#f0f0f5);outline:none;transition:border-color .2s;}',
      '.api-login-input:focus{border-color:var(--brand,#6c5ce7);}',
      '.api-login-input::placeholder{color:var(--text-secondary,rgba(240,240,245,.35));}',

      '.api-login-pw-wrap{position:relative;}',
      '.api-login-pw-wrap .api-login-input{padding-right:44px;}',
      '.api-login-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);',
      'background:none;border:none;cursor:pointer;color:var(--text-secondary,rgba(240,240,245,.5));',
      'display:flex;align-items:center;padding:0;}',
      '.api-login-eye:hover{color:var(--text,#f0f0f5);}',

      '.api-login-error{font-size:.8125rem;color:#ef4444;margin-bottom:12px;display:none;',
      'background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);',
      'border-radius:6px;padding:8px 12px;}',

      '.api-login-btn{width:100%;padding:12px;background:var(--brand,#6c5ce7);color:#fff;',
      'border:none;border-radius:8px;font-size:.9375rem;font-weight:600;cursor:pointer;',
      'margin-top:4px;transition:opacity .2s,transform .1s;}',
      '.api-login-btn:hover:not(:disabled){opacity:.88;}',
      '.api-login-btn:active:not(:disabled){transform:scale(.98);}',
      '.api-login-btn:disabled{opacity:.5;cursor:not-allowed;}',

      '.api-login-hint{font-size:.75rem;color:var(--text-secondary,rgba(240,240,245,.4));',
      'text-align:center;margin-top:20px;}',
      '.api-login-hint code{font-family:monospace;color:var(--brand,#6c5ce7);}',

      '@keyframes api-spin{to{transform:rotate(360deg)}}',
      '.api-login-spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.3);',
      'border-top-color:#fff;border-radius:50%;animation:api-spin .7s linear infinite;',
      'vertical-align:middle;margin-right:8px;}',
    ].join('');
    document.head.appendChild(style);
  }

  var eyeOpen  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>';
  var eyeClose = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zm10 10c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16.5c-.65.32-1.37.5-2.14.5z"/></svg>';

  var logoSVG = '<svg width="34" height="34" viewBox="0 0 34 34" fill="none"><defs><linearGradient id="alg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#6c5ce7"/><stop offset="100%" stop-color="#00cec9"/></linearGradient></defs><rect width="34" height="34" rx="10" fill="url(#alg)"/><path d="M7 26L7 11L17 21L27 11L27 26" stroke="white" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  app.innerHTML = [
    '<div class="api-login-root">',
    '  <div class="api-login-card">',

    '    <div class="api-login-logo">',
    '      ' + logoSVG,
    '      <span class="api-login-brand">Mottion <span>Desk</span></span>',
    '    </div>',

    '    <h1 class="api-login-title">Bem-vindo de volta</h1>',
    '    <p class="api-login-sub">Entre com suas credenciais para continuar.</p>',

    '    <div id="_api-err" class="api-login-error"></div>',

    '    <div class="api-login-field">',
    '      <label class="api-login-label" for="_api-email">E-mail</label>',
    '      <input id="_api-email" class="api-login-input" type="email"',
    '             placeholder="seu@email.com" autocomplete="email" />',
    '    </div>',

    '    <div class="api-login-field">',
    '      <label class="api-login-label" for="_api-pw">Senha</label>',
    '      <div class="api-login-pw-wrap">',
    '        <input id="_api-pw" class="api-login-input" type="password"',
    '               placeholder="••••••••" autocomplete="current-password" />',
    '        <button id="_api-eye" class="api-login-eye" type="button" aria-label="Mostrar senha">',
    '          ' + eyeOpen,
    '        </button>',
    '      </div>',
    '    </div>',

    '    <button id="_api-btn" class="api-login-btn" type="button">Entrar</button>',

    '    <p class="api-login-hint">',
    '      Admin padrão: <code>admin@mottion.com</code> / <code>Admin@123</code>',
    '    </p>',
    '  </div>',
    '</div>',
  ].join('\n');

  // ── Referências ─────────────────────────────────────────────
  var emailInput = document.getElementById('_api-email');
  var pwInput    = document.getElementById('_api-pw');
  var eyeBtn     = document.getElementById('_api-eye');
  var loginBtn   = document.getElementById('_api-btn');
  var errBox     = document.getElementById('_api-err');

  // ── Toggle senha ────────────────────────────────────────────
  var pwVisible = false;
  eyeBtn.addEventListener('click', function () {
    pwVisible = !pwVisible;
    pwInput.type    = pwVisible ? 'text' : 'password';
    eyeBtn.innerHTML = pwVisible ? eyeClose : eyeOpen;
  });

  // ── Função de login ─────────────────────────────────────────
  function showError(msg) {
    errBox.textContent  = msg;
    errBox.style.display = 'block';
  }
  function hideError() {
    errBox.style.display = 'none';
    errBox.textContent   = '';
  }

  function doLogin() {
    var email = (emailInput.value || '').trim();
    var senha = (pwInput.value || '');

    hideError();

    if (!email || !senha) {
      showError('Informe e-mail e senha.');
      return;
    }

    // Estado carregando
    loginBtn.disabled     = true;
    loginBtn.innerHTML    = '<span class="api-login-spinner"></span>Entrando…';

    API.auth.login(email, senha).then(function (res) {
      if (res && res.success && res.data && res.data.token) {
        Auth.setToken(res.data.token);
        Auth.setUser(res.data.usuario);
        window.location.reload();
      } else {
        showError((res && res.message) || 'Credenciais inválidas.');
        loginBtn.disabled  = false;
        loginBtn.innerHTML = 'Entrar';
      }
    }).catch(function (err) {
      showError(err.message || 'Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      loginBtn.disabled  = false;
      loginBtn.innerHTML = 'Entrar';
    });
  }

  // ── Eventos ─────────────────────────────────────────────────
  loginBtn.addEventListener('click', doLogin);
  pwInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') doLogin();
  });
  emailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') pwInput.focus();
  });

  // Foco inicial
  setTimeout(function () { emailInput.focus(); }, 80);
}

// ─── Mapeamentos Store ↔ Backend ─────────────────────────────

// Lista do Store → status do backend
var _STATUS_TO_API = {
  'Aberto':       'aberto',
  'Em Andamento': 'em_andamento',
  'Em Revisão':   'aguardando',
  'Concluído':    'resolvido',
  'Fechado':      'fechado',
};

// Status do backend → lista do Store
var _STATUS_FROM_API = {
  'aberto':       'Aberto',
  'em_andamento': 'Em Andamento',
  'aguardando':   'Em Revisão',
  'resolvido':    'Concluído',
  'fechado':      'Concluído',
};

// Prioridade Store → backend
var _PRI_TO_API = {
  'low':    'baixa',
  'medium': 'media',
  'high':   'alta',
  'urgent': 'critica',
};

// Prioridade backend → Store
var _PRI_FROM_API = {
  'baixa':  'low',
  'media':  'medium',
  'alta':   'high',
  'critica':'urgent',
};

/**
 * Converte um ticket do backend para o formato de card do Store.
 */
function _mapApiToCard(t) {
  // ── Cálculo de slaStatus ──────────────────────────────────
  var slaPrazoStr = t.sla_prazo || null;
  var slaStatus   = 'none';

  if (slaPrazoStr) {
    var prazoMs   = new Date(slaPrazoStr).getTime();
    var createdMs = t.created_at ? new Date(t.created_at).getTime() : Date.now();
    var totalMs   = prazoMs - createdMs;          // janela total de SLA
    var remMs     = prazoMs - Date.now();         // tempo restante

    if (remMs <= 0) {
      slaStatus = 'danger';                       // vencido
    } else if (totalMs > 0 && remMs / totalMs < 0.5) {
      slaStatus = 'warning';                      // menos de 50% do tempo restante
    } else {
      slaStatus = 'ok';
    }
  }
  // ─────────────────────────────────────────────────────────

  return {
    id:          'bk_' + t.id,
    _backendId:  t.id,
    ticketNumber: 0,
    title:       t.titulo        || '',
    description: t.descricao     || '',
    priority:    _PRI_FROM_API[t.prioridade] || 'medium',
    category:    t.categoria     || 'Solicitação',
    targetDept:  t.setor_id      ? String(t.setor_id) : null,
    assigneeId:  null,
    requesterId: null,
    labels:      [],
    checklist:   [],
    comments:    [],
    attachments: [],
    createdAt:   t.created_at    ? new Date(t.created_at).getTime() : Date.now(),
    updatedAt:   t.updated_at    ? new Date(t.updated_at).getTime() : Date.now(),
    sla_prazo:   slaPrazoStr,    // ISO string preservada para uso no getSlaProgress
    slaStatus:   slaStatus,
    dueDate:     slaPrazoStr     ? slaPrazoStr.split('T')[0] : '',
    estimate:    '',
    recurrence:  'none',
  };
}

/**
 * Converte um card do Store + nome da lista para o formato de ticket do backend.
 */
function _mapCardToApi(card, listName) {
  return {
    titulo:     card.title       || 'Sem título',
    descricao:  card.description || '',
    status:     _STATUS_TO_API[listName] || 'aberto',
    prioridade: _PRI_TO_API[card.priority] || 'media',
    categoria:  card.category    || 'Solicitação',
    setor_id:   card.targetDept  ? (Number(card.targetDept) || null) : null,
  };
}

/**
 * syncTickets()
 * Busca todos os tickets do backend e sincroniza com o Store local.
 * - Cards com _backendId já existente são atualizados no lugar (+ movidos de lista se o status mudou).
 * - Tickets novos (sem card correspondente) são inseridos no board principal.
 * Depois salva o Store e re-renderiza a view atual.
 */
function syncTickets() {
  if (!Auth.isLoggedIn()) return Promise.resolve();

  return API.tickets.listar({ limit: 500 }).then(function (res) {
    if (!res || !res.success) return;
    var tickets = (res.data && res.data.tickets) ? res.data.tickets : [];
    if (!tickets.length) return;

    var boards = window.Store && Store.data && Store.data.boards;
    if (!boards || !boards.length) return;

    // Board principal = primeiro board disponível
    var mainBoard = boards[0];

    tickets.forEach(function (t) {
      var targetListName = _STATUS_FROM_API[t.status] || 'Aberto';
      var mapped         = _mapApiToCard(t);

      // Procura card existente com esse _backendId em qualquer board/list
      var found = null;
      boards.forEach(function (board) {
        board.lists.forEach(function (list) {
          list.cards.forEach(function (card) {
            if (card._backendId === t.id) {
              found = { board: board, list: list, card: card };
            }
          });
        });
      });

      if (found) {
        // Atualiza campos do card (mantém campos locais como checklist, labels)
        Object.assign(found.card, {
          title:       mapped.title,
          description: mapped.description,
          priority:    mapped.priority,
          category:    mapped.category,
          targetDept:  mapped.targetDept,
          dueDate:     mapped.dueDate,
          updatedAt:   mapped.updatedAt,
        });

        // Move para a lista correta se o status mudou
        if (found.list.name !== targetListName) {
          var targetList = found.board.lists.find(function (l) {
            return l.name === targetListName;
          });
          if (targetList) {
            found.list.cards = found.list.cards.filter(function (c) {
              return c.id !== found.card.id;
            });
            targetList.cards.push(found.card);
          }
        }

      } else {
        // Insere ticket novo no board principal, na lista de status correspondente
        var destList = mainBoard.lists.find(function (l) {
          return l.name === targetListName;
        }) || mainBoard.lists[0];

        if (destList) {
          destList.cards.push(mapped);
        }
      }
    });

    Store.save();

    // Re-renderiza a view atual sem recarregar a página
    if (window.App && window.renderApp && App.view && App.view !== 'auth') {
      renderApp();
    }

  }).catch(function (err) {
    console.warn('[syncTickets] Falha na sincronização:', err.message);
  });
}

// Exposição global
window.Auth         = Auth;
window.API          = API;
window.syncTickets  = syncTickets;
window._mapCardToApi = _mapCardToApi;
