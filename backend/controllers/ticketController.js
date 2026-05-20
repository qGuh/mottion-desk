const pool = require('../config/database');

// ─── HELPERS ──────────────────────────────────────────────────

/** Gera número único de ticket: TK-AAAA-NNNNN */
async function gerarNumeroTicket() {
  const ano = new Date().getFullYear();
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS total FROM tickets WHERE YEAR(created_at) = ?', [ano]
  );
  const seq = String(rows[0].total + 1).padStart(5, '0');
  return `TK-${ano}-${seq}`;
}

/** Calcula prazo SLA com base na prioridade */
async function calcularSLA(prioridade, setor_id) {
  const [rows] = await pool.query(
    `SELECT tempo_horas FROM sla_config
     WHERE prioridade = ? AND (setor_id = ? OR setor_id IS NULL) AND ativo = 1
     ORDER BY setor_id DESC LIMIT 1`,
    [prioridade, setor_id || null]
  );
  if (!rows.length) return null;
  const prazo = new Date();
  prazo.setHours(prazo.getHours() + rows[0].tempo_horas);
  return prazo;
}

/** Registra uma linha no histórico do ticket */
async function registrarHistorico(conn, ticket_id, usuario_id, campo, anterior, novo) {
  await conn.query(
    `INSERT INTO historico_tickets (ticket_id, usuario_id, campo_alterado, valor_anterior, valor_novo)
     VALUES (?, ?, ?, ?, ?)`,
    [ticket_id, usuario_id, campo, anterior ?? null, novo ?? null]
  );
}

// ─── LISTAR TICKETS ───────────────────────────────────────────
const listar = async (req, res, next) => {
  try {
    const {
      status, prioridade, setor_id, agente_id,
      solicitante_id, busca, page = 1, limit = 20,
      order = 'created_at', dir = 'DESC',
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const params = [];
    const conditions = [];

    // Solicitantes só veem seus próprios tickets
    if (req.usuario.perfil === 'solicitante') {
      conditions.push('t.solicitante_id = ?');
      params.push(req.usuario.id);
    } else {
      if (solicitante_id) { conditions.push('t.solicitante_id = ?'); params.push(solicitante_id); }
      if (agente_id)      { conditions.push('t.agente_id = ?');      params.push(agente_id); }
    }

    if (status)     { conditions.push('t.status = ?');     params.push(status); }
    if (prioridade) { conditions.push('t.prioridade = ?'); params.push(prioridade); }
    if (setor_id)   { conditions.push('t.setor_id = ?');   params.push(setor_id); }
    if (busca) {
      conditions.push('(t.titulo LIKE ? OR t.numero LIKE ? OR t.descricao LIKE ?)');
      const like = `%${busca}%`;
      params.push(like, like, like);
    }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
    const allowedOrder = ['created_at','updated_at','prioridade','status','numero'];
    const orderCol = allowedOrder.includes(order) ? order : 'created_at';
    const orderDir = dir === 'ASC' ? 'ASC' : 'DESC';

    const sql = `
      SELECT
        t.id, t.numero, t.titulo, t.status, t.prioridade, t.categoria,
        t.sla_prazo, t.sla_violado, t.created_at, t.updated_at, t.resolvido_at,
        s.nome      AS setor_nome,
        sol.nome    AS solicitante_nome,
        sol.email   AS solicitante_email,
        ag.nome     AS agente_nome,
        (SELECT COUNT(*) FROM comentarios c WHERE c.ticket_id = t.id AND c.interno = 0) AS comentarios
      FROM tickets t
      LEFT JOIN setores  s   ON t.setor_id       = s.id
      LEFT JOIN usuarios sol ON t.solicitante_id = sol.id
      LEFT JOIN usuarios ag  ON t.agente_id      = ag.id
      ${where}
      ORDER BY t.${orderCol} ${orderDir}
      LIMIT ? OFFSET ?
    `;

    const countSql = `SELECT COUNT(*) AS total FROM tickets t ${where}`;

    const [tickets] = await pool.query(sql,      [...params, Number(limit), offset]);
    const [countRes]= await pool.query(countSql, params);

    return res.json({
      success: true,
      data: tickets,
      pagination: {
        total: countRes[0].total,
        page:  Number(page),
        limit: Number(limit),
        pages: Math.ceil(countRes[0].total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── BUSCAR TICKET POR ID ─────────────────────────────────────
const buscarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [tickets] = await pool.query(
      `SELECT
         t.*, s.nome AS setor_nome,
         sol.nome AS solicitante_nome, sol.email AS solicitante_email,
         ag.nome  AS agente_nome,  ag.email  AS agente_email
       FROM tickets t
       LEFT JOIN setores  s   ON t.setor_id       = s.id
       LEFT JOIN usuarios sol ON t.solicitante_id = sol.id
       LEFT JOIN usuarios ag  ON t.agente_id      = ag.id
       WHERE t.id = ?`,
      [id]
    );

    if (!tickets.length) {
      return res.status(404).json({ success: false, message: 'Ticket não encontrado.' });
    }

    const ticket = tickets[0];

    // Restrição: solicitante só vê seu próprio ticket
    if (req.usuario.perfil === 'solicitante' && ticket.solicitante_id !== req.usuario.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    // Busca comentários (solicitante não vê internos)
    const internoFilter = req.usuario.perfil === 'solicitante' ? 'AND c.interno = 0' : '';
    const [comentarios] = await pool.query(
      `SELECT c.*, u.nome AS autor_nome, u.perfil AS autor_perfil
       FROM comentarios c
       LEFT JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.ticket_id = ? ${internoFilter}
       ORDER BY c.created_at ASC`,
      [id]
    );

    // Busca histórico
    const [historico] = await pool.query(
      `SELECT h.*, u.nome AS usuario_nome
       FROM historico_tickets h
       LEFT JOIN usuarios u ON h.usuario_id = u.id
       WHERE h.ticket_id = ?
       ORDER BY h.created_at ASC`,
      [id]
    );

    // Busca anexos
    const [anexos] = await pool.query(
      'SELECT id, nome_original, tipo_mime, tamanho, created_at FROM anexos WHERE ticket_id = ?',
      [id]
    );

    return res.json({
      success: true,
      data: { ...ticket, comentarios, historico, anexos },
    });
  } catch (err) {
    next(err);
  }
};

// ─── CRIAR TICKET ─────────────────────────────────────────────
const criar = async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    const { titulo, descricao, prioridade = 'media', categoria, setor_id } = req.body;

    if (!titulo?.trim()) {
      return res.status(400).json({ success: false, message: 'Título é obrigatório.' });
    }

    // descricao e setor_id são opcionais
    const descricaoFinal = descricao ? String(descricao).trim() : '';
    const setorFinal     = setor_id  ? Number(setor_id) || null : null;

    const numero    = await gerarNumeroTicket();
    const sla_prazo = await calcularSLA(prioridade, setorFinal);

    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO tickets (numero, titulo, descricao, prioridade, categoria, setor_id, solicitante_id, sla_prazo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [numero, titulo.trim(), descricaoFinal, prioridade, categoria || null, setorFinal, req.usuario.id, sla_prazo]
    );

    const ticketId = result.insertId;

    await registrarHistorico(conn, ticketId, req.usuario.id, 'status', null, 'aberto');

    await conn.commit();

    // Busca o ticket criado com os joins
    const [rows] = await pool.query(
      `SELECT t.*, s.nome AS setor_nome, sol.nome AS solicitante_nome
       FROM tickets t
       LEFT JOIN setores  s   ON t.setor_id       = s.id
       LEFT JOIN usuarios sol ON t.solicitante_id = sol.id
       WHERE t.id = ?`,
      [ticketId]
    );

    const ticket = rows[0];

    // Emite evento Socket.io (injetado no req pelo server.js)
    if (req.io) {
      req.io.to('agentes').emit('ticket:criado', ticket);
    }

    return res.status(201).json({
      success: true,
      message: `Ticket ${numero} criado com sucesso.`,
      data: ticket,
    });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

// ─── ATUALIZAR TICKET ─────────────────────────────────────────
const atualizar = async (req, res, next) => {
  const conn = await pool.getConnection();
  try {
    const { id } = req.params;
    const { status, prioridade, agente_id, titulo, categoria, setor_id } = req.body;

    // Busca o ticket atual
    const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Ticket não encontrado.' });
    }

    const atual = rows[0];

    // Solicitante não pode atualizar campos de gestão
    if (req.usuario.perfil === 'solicitante' && atual.solicitante_id !== req.usuario.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    await conn.beginTransaction();

    const updates = {};
    const historicos = [];

    // Campos permitidos por perfil
    const isAgente = ['admin', 'agente'].includes(req.usuario.perfil);

    if (titulo !== undefined && titulo.trim()) {
      updates.titulo = titulo.trim();
    }

    if (isAgente) {
      if (status !== undefined && status !== atual.status) {
        updates.status = status;
        historicos.push(['status', atual.status, status]);

        if (status === 'resolvido' && !atual.resolvido_at) {
          updates.resolvido_at = new Date();
        }
        if (status === 'fechado' && !atual.fechado_at) {
          updates.fechado_at = new Date();
        }
      }

      if (prioridade !== undefined && prioridade !== atual.prioridade) {
        updates.prioridade = prioridade;
        historicos.push(['prioridade', atual.prioridade, prioridade]);
        // Recalcula SLA
        const novoPrazo = await calcularSLA(prioridade, atual.setor_id);
        if (novoPrazo) updates.sla_prazo = novoPrazo;
      }

      if (agente_id !== undefined) {
        const agenteAnterior = atual.agente_id ? String(atual.agente_id) : null;
        updates.agente_id = agente_id || null;
        historicos.push(['agente_id', agenteAnterior, agente_id ? String(agente_id) : null]);
      }

      if (categoria !== undefined) updates.categoria = categoria;
      if (setor_id  !== undefined) updates.setor_id  = setor_id || null;
    }

    if (!Object.keys(updates).length) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: 'Nenhum campo para atualizar.' });
    }

    // Verifica violação SLA
    if (atual.sla_prazo && new Date() > new Date(atual.sla_prazo) && status !== 'resolvido' && status !== 'fechado') {
      updates.sla_violado = 1;
    }

    const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    await conn.query(`UPDATE tickets SET ${setClauses} WHERE id = ?`, [...Object.values(updates), id]);

    for (const [campo, anterior, novo] of historicos) {
      await registrarHistorico(conn, id, req.usuario.id, campo, anterior, novo);
    }

    await conn.commit();

    // Busca ticket atualizado
    const [updated] = await pool.query(
      `SELECT t.*, s.nome AS setor_nome, sol.nome AS solicitante_nome, ag.nome AS agente_nome
       FROM tickets t
       LEFT JOIN setores  s   ON t.setor_id       = s.id
       LEFT JOIN usuarios sol ON t.solicitante_id = sol.id
       LEFT JOIN usuarios ag  ON t.agente_id      = ag.id
       WHERE t.id = ?`,
      [id]
    );

    const ticket = updated[0];

    // Socket.io — notifica agente responsável e solicitante
    if (req.io) {
      if (ticket.agente_id) {
        req.io.to(`user:${ticket.agente_id}`).emit('ticket:atualizado', ticket);
      }
      req.io.to(`user:${ticket.solicitante_id}`).emit('ticket:atualizado', ticket);
      req.io.to('agentes').emit('ticket:atualizado', ticket);
    }

    return res.json({ success: true, message: 'Ticket atualizado.', data: ticket });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

// ─── EXCLUIR TICKET ───────────────────────────────────────────
const excluir = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id, numero FROM tickets WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Ticket não encontrado.' });
    }
    await pool.query('DELETE FROM tickets WHERE id = ?', [id]);
    return res.json({ success: true, message: `Ticket ${rows[0].numero} excluído.` });
  } catch (err) {
    next(err);
  }
};

// ─── COMENTÁRIOS ──────────────────────────────────────────────
const adicionarComentario = async (req, res, next) => {
  try {
    const { id: ticket_id } = req.params;
    const { conteudo, interno = false } = req.body;

    if (!conteudo?.trim()) {
      return res.status(400).json({ success: false, message: 'Conteúdo do comentário é obrigatório.' });
    }

    // Notas internas só para agentes/admin
    const isInterno = interno && ['admin', 'agente'].includes(req.usuario.perfil);

    // Verifica se o ticket existe
    const [tRows] = await pool.query('SELECT id, solicitante_id, agente_id FROM tickets WHERE id = ?', [ticket_id]);
    if (!tRows.length) {
      return res.status(404).json({ success: false, message: 'Ticket não encontrado.' });
    }

    const ticket = tRows[0];

    // Solicitante só comenta em seus próprios tickets
    if (req.usuario.perfil === 'solicitante' && ticket.solicitante_id !== req.usuario.id) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    const [result] = await pool.query(
      'INSERT INTO comentarios (ticket_id, usuario_id, conteudo, interno) VALUES (?, ?, ?, ?)',
      [ticket_id, req.usuario.id, conteudo.trim(), isInterno ? 1 : 0]
    );

    const [rows] = await pool.query(
      `SELECT c.*, u.nome AS autor_nome, u.perfil AS autor_perfil
       FROM comentarios c LEFT JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.id = ?`,
      [result.insertId]
    );

    const comentario = rows[0];

    // Atualiza updated_at do ticket
    await pool.query('UPDATE tickets SET updated_at = NOW() WHERE id = ?', [ticket_id]);

    // Socket.io
    if (req.io) {
      const evento = { ticket_id: Number(ticket_id), comentario };
      if (!isInterno) {
        req.io.to(`user:${ticket.solicitante_id}`).emit('ticket:comentario', evento);
      }
      if (ticket.agente_id) {
        req.io.to(`user:${ticket.agente_id}`).emit('ticket:comentario', evento);
      }
      req.io.to('agentes').emit('ticket:comentario', evento);
    }

    return res.status(201).json({ success: true, message: 'Comentário adicionado.', data: comentario });
  } catch (err) {
    next(err);
  }
};

// ─── UPLOAD DE ANEXO ──────────────────────────────────────────
const uploadAnexo = async (req, res, next) => {
  try {
    const { id: ticket_id } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado.' });
    }

    const [result] = await pool.query(
      `INSERT INTO anexos (ticket_id, usuario_id, nome_arquivo, nome_original, caminho, tipo_mime, tamanho)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        ticket_id,
        req.usuario.id,
        req.file.filename,
        req.file.originalname,
        req.file.path,
        req.file.mimetype,
        req.file.size,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Arquivo anexado com sucesso.',
      data: { id: result.insertId, nome_original: req.file.originalname, tamanho: req.file.size },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, excluir, adicionarComentario, uploadAnexo };
